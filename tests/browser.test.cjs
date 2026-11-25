const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { readFile, mkdir } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');
const { firefox } = require('playwright');

let browser, server, baseURL;
const key = 'movisafe-control-v1';
const errors = [];
const artifacts = resolve('test-results');
const root = resolve(process.env.TEST_DIRECTORY || 'dist');
const state = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const waitState = (page, predicate) => page.waitForFunction(
  ({ key, predicate }) => new Function('s', `return (${predicate})(s)`)(JSON.parse(localStorage.getItem(key))),
  { key, predicate: predicate.toString() }
);
const route = async (page, hash) => {
  await page.goto(`${baseURL}/#${hash}`);
  await page.locator('.shell').waitFor();
};
const click = (page, act, id) => page.locator(`[data-act="${act}"]${id ? `[data-id="${id}"]` : ''}`).filter({ visible: true }).first().click();
async function context(t, viewport = { width: 1440, height: 1000 }) {
  const ctx = await browser.newContext({ viewport, locale: 'es-MX', timezoneId: 'America/Mexico_City' });
  ctx.on('page', page => {
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
  });
  t.after(() => ctx.close());
  return ctx;
}
before(async () => {
  await mkdir(artifacts, { recursive: true });
  if (process.env.BASE_URL) baseURL = process.env.BASE_URL.replace(/\/$/, '');
  else {
    server = createServer(async (req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
      if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
      try {
        const body = await readFile(path);
        const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };
        res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' }).end(body);
      } catch { res.writeHead(404).end(); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    baseURL = `http://127.0.0.1:${server.address().port}`;
  }
  browser = await firefox.launch();
});
after(async () => {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  assert.deepEqual(errors, [], 'No JavaScript errors or failed HTTP resources');
});

for (const width of [1440, 390, 430]) {
  test(`Spanish UI, assets and routes without overflow at ${width}px`, async t => {
    const ctx = await context(t, { width, height: width === 1440 ? 1000 : 844 });
    const page = await ctx.newPage();
    for (const hash of ['control', 'alertas', 'personas', 'operaciones', 'servicios', 'solicitudes', 'ingresos', 'actividad', 'app', 'app/servicios', 'app/pedidos', 'app/plan']) {
      await route(page, hash);
      assert.equal(await page.locator('html').getAttribute('lang'), 'es-MX');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, hash);
      assert.equal(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0)), true, hash);
      if (hash === 'control' || hash === 'app') await page.screenshot({ path: `${artifacts}/${hash}-${width}.png`, fullPage: true });
    }
    assert.equal(await page.locator('.clientbody .plan').count(), 3);
  });
}

test('SOS long press creates one alert; central assignment and resolution sync across tabs', async t => {
  const ctx = await context(t, { width: 390, height: 844 });
  const app = await ctx.newPage();
  const central = await ctx.newPage();
  await route(app, 'app');
  await route(central, 'alertas');
  await app.bringToFront();
  const sos = app.locator('#sos');
  const box = await sos.boundingBox();
  await app.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await app.mouse.down();
  await waitState(app, s => s.alerts.some(a => a.person === 0));
  await app.mouse.up();
  assert.equal(await app.locator('dialog[open]').count(), 0);
  const alerts = (await state(app)).alerts.filter(a => a.person === 0);
  assert.equal(alerts.length, 1);
  const id = alerts[0].id;
  await click(app, 'myalert');
  assert.match(await app.locator('#modal').innerText(), /Mi alerta/);
  await app.keyboard.press('Escape');
  assert.equal((await state(app)).alerts.filter(a => a.person === 0).length, 1);
  await central.bringToFront();
  await click(central, 'alert', id);
  await central.getByLabel('Asignar operador').selectOption('Ana Robles');
  await central.getByRole('button', { name: 'Tomar alerta', exact: true }).click();
  await waitState(app, s => s.alerts.some(a => a.person === 0 && a.status === 'En atención'));
  assert.match(await app.locator('.soszone').innerText(), /En atención por Ana Robles/);
  await click(central, 'alert', id);
  await central.getByLabel('Nota de cierre').fill('Cliente localizado y atención concluida.');
  await central.getByRole('button', { name: 'Resolver alerta', exact: true }).click();
  await waitState(app, s => s.alerts.some(a => a.person === 0 && a.status === 'Resuelta'));
  assert.match(await app.locator('.clientbody').innerText(), /Última alerta resuelta/);
  await app.reload();
  assert.equal((await state(app)).alerts.find(a => a.id === id).operator, 'Ana Robles');
});

test('Simple SOS click and keyboard activation require confirmation; interrupted hold does not send', async t => {
  const ctx = await context(t);
  const page = await ctx.newPage();
  await route(page, 'app');
  await page.locator('#sos').click();
  assert.equal(await page.locator('#modal:modal').count(), 1);
  assert.equal((await state(page)).alerts.filter(a => a.person === 0).length, 0);
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await page.locator('#sos').focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Activar SOS demo', exact: true }).click();
  assert.equal((await state(page)).alerts.filter(a => a.person === 0).length, 1);
  await route(page, 'control');
  await click(page, 'help');
  await click(page, 'resetask');
  await click(page, 'reset');
  await route(page, 'app');
  const box = await page.locator('#sos').boundingBox();
  await page.mouse.move(box.x + 40, box.y + 40);
  await page.mouse.down();
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.waitForTimeout(2100);
  assert.equal((await state(page)).alerts.filter(a => a.person === 0).length, 0);
});

test('Service → quote → simulated deposit → exactly one mission → completed service', async t => {
  const ctx = await context(t, { width: 430, height: 932 });
  const app = await ctx.newPage();
  const central = await ctx.newPage();
  await central.setViewportSize({ width: 1440, height: 1000 });
  await route(app, 'app/servicios');
  await route(central, 'solicitudes');
  await click(app, 'service', 'vip');
  await app.getByLabel('Personas', { exact: true }).fill('2');
  const place = 'Polanco <img src=x onerror="window.injected=true">';
  await app.getByLabel('Zona del servicio').fill(place);
  await app.getByLabel('Detalles (opcional)').fill('Traslado de prueba <script>window.injected=true</script>');
  await app.getByRole('button', { name: 'Solicitar cotización', exact: true }).click();
  await app.waitForURL('**/#app/pedidos');
  const request = (await state(app)).requests.find(r => r.person === 0);
  assert.equal(request.status, 'Nueva');
  assert.equal(request.qty, 2);
  await click(central, 'request', request.id);
  assert.match(await central.locator('#modal').innerText(), /Polanco <img/);
  assert.equal(await central.locator('#modal img').count(), 0);
  assert.equal(await central.evaluate(() => window.injected), undefined);
  await central.getByLabel('Precio total (MXN)').fill('0');
  await central.getByRole('button', { name: 'Enviar cotización demo' }).click();
  assert.equal((await state(central)).requests.find(r => r.id === request.id).status, 'Nueva');
  await central.getByLabel('Precio total (MXN)').fill('2345.67');
  await central.getByLabel('Anticipo (%)').fill('35');
  await central.getByRole('button', { name: 'Enviar cotización demo' }).click();
  await waitState(app, s => s.requests.some(r => r.person === 0 && r.status === 'Cotizada'));
  await click(app, 'request', request.id);
  assert.match(await app.locator('#modal').innerText(), /820\.98/);
  await click(app, 'accept', request.id);
  await app.getByRole('button', { name: 'Confirmar simulación', exact: true }).dblclick();
  await waitState(central, s => s.requests.some(r => r.person === 0 && r.status === 'Confirmada'));
  const paid = await state(app);
  assert.equal(paid.requests.find(r => r.id === request.id).paid, 820.98);
  assert.equal(paid.missions.filter(m => m.ref === request.id).length, 1);
  const mission = paid.missions.find(m => m.ref === request.id);
  await app.reload();
  await click(app, 'request', request.id);
  assert.equal(await app.locator('[data-act="accept"]').count(), 0);
  assert.equal((await state(app)).missions.filter(m => m.ref === request.id).length, 1);
  await route(central, 'operaciones');
  await click(central, 'mission', mission.id);
  await central.getByLabel('Responsable de la misión').selectOption('Marco Vidal');
  await central.getByRole('button', { name: 'Iniciar servicio', exact: true }).click();
  assert.equal((await state(central)).missions.find(m => m.id === mission.id).status, 'En curso');
  await click(central, 'mission', mission.id);
  await click(central, 'finishmission', mission.id);
  await waitState(app, s => s.missions.some(m => m.person === 0 && m.status === 'Finalizado'));
});

test('Subscription updates monthly revenue and persists without accumulating extra accounts', async t => {
  const ctx = await context(t);
  const app = await ctx.newPage();
  const central = await ctx.newPage();
  await route(app, 'app/plan');
  await route(central, 'ingresos');
  const values = () => central.locator('.mini-stat .value').allTextContents();
  assert.deepEqual(await values(), ['$11,780', '13', '$950']);
  for (const [id, revenue] of [['familia', '$12,780'], ['empresa', '$15,190'], ['personal', '$11,780']]) {
    await click(app, 'chooseplan', id);
    await click(app, 'plan-commit', id);
    await central.waitForFunction(expected => document.querySelector('.mini-stat .value')?.textContent === expected, revenue);
    assert.deepEqual(await values(), [revenue, '13', '$950']);
    await app.reload();
    assert.equal((await state(app)).plan, id);
  }
});

test('Location pause ends the trip, removes the marker and requires consent to resume', async t => {
  const ctx = await context(t);
  const app = await ctx.newPage();
  const central = await ctx.newPage();
  await route(app, 'app');
  await route(central, 'control');
  await click(app, 'trip');
  await click(app, 'tracking');
  await click(app, 'pause-confirm');
  await waitState(central, s => !s.tracking && !s.trip);
  assert.equal(await central.locator('[data-person="0"]').count(), 0);
  await click(app, 'trip');
  assert.equal((await state(app)).tracking, false);
  await click(app, 'consenttrip');
  await waitState(central, s => s.tracking && s.trip);
  assert.equal(await central.locator('[data-person="0"]').count(), 1);
});

test('Modal keyboard navigation excludes background controls, Escape closes, and reset restores demo data', async t => {
  const ctx = await context(t);
  const page = await ctx.newPage();
  await route(page, 'app/servicios');
  await click(page, 'service', 'vip');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    // Firefox may give focus to browser chrome between tab cycles (activeElement is body).
    assert.equal(await page.evaluate(() => document.activeElement === document.body || document.querySelector('#modal').contains(document.activeElement)), true);
  }
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#modal:modal').count(), 0);
  await route(page, 'app/plan');
  await click(page, 'chooseplan', 'familia');
  await click(page, 'plan-commit', 'familia');
  await route(page, 'control');
  await click(page, 'help');
  await click(page, 'resetask');
  await click(page, 'reset');
  const restored = await state(page);
  assert.equal(restored.plan, 'personal');
  assert.equal(restored.alerts.length, 3);
  assert.equal(restored.requests.length, 5);
  assert.equal(restored.missions.length, 4);
});

test('Standalone demo loads with all assets offline and runs the SOS confirmation', async t => {
  const ctx = await context(t);
  const page = await ctx.newPage();
  await page.goto(`${baseURL}/Movisafe_Control_Demo.html#app`);
  await ctx.setOffline(true);
  await page.route('**/*', route => route.abort());
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0 && img.src.startsWith('data:'))), true);
  await page.locator('#sos').click();
  await click(page, 'triggersos');
  assert.equal((await state(page)).alerts.filter(a => a.person === 0).length, 1);
  await page.locator('.bottomnav [data-nav="app/servicios"]').click();
  assert.equal(await page.locator('.phone-product').count(), 13);
});
