import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const mime = { svg: 'image/svg+xml', webp: 'image/webp', woff2: 'font/woff2' };
const assets = {};
for (const filename of (await readdir('web/assets')).sort()) {
  const type = mime[filename.split('.').pop()];
  if (!type) throw new Error(`Unsupported asset: ${filename}`);
  assets[`assets/${filename}`] = `data:${type};base64,${(await readFile(`web/assets/${filename}`)).toString('base64')}`;
}
let css = await readFile('web/styles.css', 'utf8');
let app = await readFile('web/app.js', 'utf8');
// Substitute the final rendered markup so dynamic service photos work offline too.
app = app.replace('outlet.innerHTML=', 'outlet.innerHTML=inlineAssets(')
  .replace(/(<div class="footer">[^\n]+?<\/div><\/main><\/div><\/div>`);/, '$1);');
if (!app.includes('outlet.innerHTML=inlineAssets(')) throw new Error('Missing render entry point');
for (const [path, url] of Object.entries(assets)) css = css.replaceAll(path, url);
const inline = `const DEMO_ASSETS=${JSON.stringify(assets)};\nconst inlineAssets=html=>html.replace(/assets\\/[a-zA-Z0-9_.-]+/g,path=>DEMO_ASSETS[path]||path);\n`;
let html = await readFile('web/index.html', 'utf8');
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="data.js"></script>', `<script>${await readFile('web/data.js', 'utf8')}</script>`)
  .replace('<script src="app.js"></script>', `<script>${inline}${app}</script>`);
await writeFile('Movisafe_Control_Demo.html', html);
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('web', 'dist', { recursive: true });
await cp('Movisafe_Control_Demo.html', 'dist/Movisafe_Control_Demo.html');
console.log('Static site built in dist/; standalone demo regenerated.');
