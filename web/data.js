const PATHS = {
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
 radar:'<circle cx="12" cy="12" r="9"/><path d="M12 3v3m9 6h-3m-6 9v-3M3 12h3m6 0 6-6"/><circle cx="12" cy="12" r="4"/>',
 shield:'<path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z"/><path d="m8.8 12 2.2 2.3 4.4-4.6"/>',
 bell:'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 20a2 2 0 0 0 4 0"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/>',
 person:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/>',
 route:'<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M8 6h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7"/>',
 case:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12q9 5 18 0M10 14h4"/>',
 layers:'<path d="m12 3 10 5-10 5L2 8zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
 chart:'<path d="M3 3v18h18m-14-4v-5m5 5V7m5 10v-8"/>',
 file:'<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h6"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2.8"/><path d="M10 5h4m-3 14h2"/>',
 pulse:'<path d="M2 12h5l3-8 5 16 3-8h4"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/>',
 map:'<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2zM9 3v15m6-12v15"/>',
 alert:'<path d="m10.4 4.7-8 14a1.4 1.4 0 0 0 1.2 2h16.8a1.4 1.4 0 0 0 1.2-2l-8-14a1.8 1.8 0 0 0-3.2 0Z"/><path d="M12 9v5m0 3h.01"/>',
 sos:'<path d="M6 18v-6a6 6 0 0 1 12 0v6M4 21h16M12 1v2M3 5l2 2m16-2-2 2M1 12h2m18 0h2M10 10a3 3 0 0 0-1 2"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 4h2m3 0h2"/>',
 chev:'<path d="m9 5 7 7-7 7"/>',down:'<path d="m6 9 6 6 6-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
 target:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 1v4m0 14v4M1 12h4m14 0h4"/>',
 check:'<path d="m4 12 5 5L20 6"/>',close:'<path d="m5 5 14 14m0-14L5 19"/>',
 headset:'<path d="M3 14v-3a9 9 0 0 1 18 0v5a3 3 0 0 1-3 3h-3"/><rect x="3" y="11" width="4" height="6" rx="1.5"/><rect x="17" y="11" width="4" height="6" rx="1.5"/><path d="M11 20h4"/>',
 car:'<path d="m5 10 2-5h10l2 5m-15 0h16v8H4zM6 18v2m12-2v2M7 14h2m6 0h2"/>',
 cap:'<path d="m2 8 10-5 10 5-10 5zM6 11v5q6 5 12 0v-5m4-3v7"/>',
 globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
 search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
 signal:'<path d="M4 19v-3m5 3v-7m5 7V8m5 11V4"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
 flag:'<path d="M5 21V3c4-3 8 3 14 0v10c-6 3-10-3-14 0"/>',wifi:'<path d="M2 8q10-8 20 0M5 12q7-6 14 0m-11 4q4-4 8 0"/><circle cx="12" cy="20" r=".6"/>',
 heart:'<path d="M12 20 3.8 12a5.4 5.4 0 0 1 8.2-7 5.4 5.4 0 0 1 8.2 7z"/>',
 send:'<path d="m3 11 18-8-7 18-3-8-8-2zM11 13l10-10"/>',wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h18m0 4h-6v4h6"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1"/>',support:'<circle cx="12" cy="12" r="9"/><path d="M10 9a2 2 0 1 1 3 2c-1 1-1 2-1 3m0 3h.01"/>',
 monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
 layers2:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-11 0v11"/>'
};
const ic=(key,size=20)=>'<svg class="ic" aria-hidden="true" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+(PATHS[key]||PATHS.shield)+'</svg>';
const services=[
 ['vip','Traslado seguro VIP','Protección','car','Traslados de aeropuerto y viajes ejecutivos con conductor dedicado.',1900],
 ['close','Protección ejecutiva','Protección','shield','Acompañamiento personal para directivos, visitantes y eventos.',0],
 ['train','Taller de prevención','Formación','cap','Sesión para equipos de trabajo sobre prevención y gestión de riesgos.',8500],
 ['expat','Briefing para expatriados','Prevención','globe','Orientación personal de llegada y asesoría para instalarse en México.',1500],
 ['dispatch','Centro de reacción 24/7','Monitoreo','headset','Asistencia, recepción de alertas y coordinación con el centro.',0],
 ['monitor','Monitoreo GPS, alarmas y CCTV','Monitoreo','radar','Seguimiento de personas y activos, y supervisión de dispositivos.',0],
 ['intel','Inteligencia de seguridad','Prevención','pulse','Reportes regionales, alertas periódicas y análisis de tendencias.',0],
 ['hr','Estudio de personal','Prevención','people','Evaluaciones laborales y socioeconómicas para recursos humanos.',0],
 ['risk','Auditoría y gestión de crisis','Consultoría','case','Diagnóstico, evaluación de riesgos y asesoría en instalaciones.',0],
 ['log','Seguridad logística','Protección','route','Acompañamiento de mercancías, evaluación de rutas y prevención de pérdidas.',0],
 ['driving','Capacitación para conductores','Formación','car','Formación profesional en conducción preventiva para personal de empresas.',0],
 ['civil','Protección civil y crisis','Formación','cap','Capacitación en prevención, protección civil y preparación de equipos.',0],
 ['advice','Consultoría de seguridad','Consultoría','file','Asesoría a la medida para operaciones, proyectos y gestión de riesgos.',0]
].map(([id,name,group,icon,desc,price])=>({id,name,group,icon,desc,price}));
const plans=[{id:'personal',name:'Personal',price:490,qty:1,desc:'Para una persona',items:['Botón SOS y recepción de alertas','Trayectos con seguimiento voluntario','Acceso al catálogo de servicios']},{id:'familia',name:'Familia',price:1490,qty:4,desc:'Hasta 4 personas',items:['Cobertura para cuatro integrantes','Seguimiento individual de trayectos','Solicitudes de servicio familiares']},{id:'empresa',name:'Empresa',price:3900,qty:10,desc:'Hasta 10 colaboradores',items:['Cobertura para diez colaboradores','Coordinación de servicios corporativos','Historial de atención del equipo']}];
const users=['Andrea Salas','Daniel Ortega','Mariana López','Carlos Méndez','Lucía Herrera','Miguel Torres','Elena Navarro','Pablo Vega','Ana Beltrán','Diego Ríos','Valeria Luna','Tomás Nieto','Laura Vidal','Mateo Vela','Irene Pardo','Sofía Ruiz','Luis Mora','Julia Soto','Bruno Paz','Marta Gil','Nora León','Eva Rey','César Lara','Alma Solís'];
const areas=['Polanco','Juárez','Roma Norte','Condesa','Anzures','Cuauhtémoc','San Miguel Chapultepec','San Rafael'];
const demoUser=0;
const operators=['Valeria Cruz','Marco Vidal','Ana Robles'];
const kinds={sos:{name:'Botón de pánico',badge:'SOS',icon:'sos',color:'red'},route:{name:'Desvío de ruta',badge:'Ruta',icon:'route',color:'amber'},check:{name:'Check-in pendiente',badge:'Check-in',icon:'clock',color:'blue'}};
const spots=[[29,34],[68,46],[72,73],[47,80],[40,28],[62,21],[19,76],[82,16],[15,51],[55,54],[88,54],[32,65],[45,13],[85,83],[61,89],[10,25],[51,36],[76,35],[36,87],[17,90],[92,34],[12,68],[50,64],[71,12]];
const stages=['Nueva','Cotizada','Confirmada'];
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:Number.isInteger(n)?0:2}).format(n);
const now=()=>Date.now();
function initial(){
 const t=now(), mins=n=>t-n*60000;
 return {version:1,plan:'personal',tracking:true,trip:false,alerts:[
 {id:'AL-1048',person:1,kind:'sos',status:'Nueva',operator:'',time:mins(2),zone:'Juárez'},
 {id:'AL-1047',person:4,kind:'route',status:'En atención',operator:operators[1],time:mins(8),zone:'Anzures'},
 {id:'AL-1046',person:2,kind:'check',status:'Nueva',operator:'',time:mins(14),zone:'Roma Norte'}],
 requests:[['vip',2,'Nueva',0],['close',5,'Nueva',0],['train',3,'Cotizada',8500],['expat',8,'Nueva',0],['vip',6,'Confirmada',1900]].map(([service,person,status,total],i)=>({id:'SV-'+(128-i),service,person,status,total,deposit:50,paid:status==='Confirmada'?950:0,when:new Date(t+(i+1)*86400000).toISOString().slice(0,10),qty:i===2?8:1,place:areas[i],note:'',time:mins(24+i*15)})),
 missions:[['vip',7,'Roma Norte','Marco Vidal'],['close',3,'Polanco','Ana Robles'],['log',10,'Cuauhtémoc','Marco Vidal'],['vip',12,'Condesa','Valeria Cruz']].map(([service,person,place,operator],i)=>({id:'OP-0'+(91-i),service,person,place,operator,status:'En curso'})),
 log:[['sos','Botón de pánico activado',1,'Juárez',2,'AL-1048'],['shield','Trayecto finalizado',0,'Polanco',5,''],['route','Desvío de ruta detectado',4,'Anzures',8,'AL-1047'],['car','Traslado VIP en curso',7,'Roma Norte',12,'OP-091'],['clock','Check-in pendiente',2,'Roma Norte',14,'AL-1046']].map(([icon,name,person,zone,m,id])=>({icon,name,person,zone,time:mins(m),id})),next:1049};
}
const key='movisafe-control-v1';
function loadState(){try{const s=JSON.parse(localStorage.getItem(key));if(s?.version===1&&Array.isArray(s.alerts)&&Array.isArray(s.requests))return s;}catch{}return initial();}
let state=loadState();
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{}}
function record(icon,name,person,zone,id=''){state.log.unshift({icon,name,person,zone,id,time:now()});}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials=s=>s.split(' ').map(v=>v[0]).slice(0,2).join('');
const getService=id=>services.find(x=>x.id===id);
const getPlan=()=>plans.find(x=>x.id===state.plan);
const openAlerts=()=>state.alerts.filter(x=>x.status!=='Resuelta');
const localTime=t=>new Intl.DateTimeFormat('es-MX',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Mexico_City'}).format(t);
const dateShort=t=>new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'short',year:'numeric',timeZone:'America/Mexico_City'}).format(t);
const since=t=>{const m=Math.max(0,Math.floor((now()-t)/60000));return m===0?'Ahora':m<60?'Hace '+m+' min':m<1440?'Hace '+Math.floor(m/60)+' h':dateShort(t);};
const level=s=>s==='Nueva'?'blue':s==='Cotizada'?'amber':s==='Confirmada'||s==='Resuelta'||s==='Finalizado'?'mint':'blue';
const counts=()=>({persons:users.length-(state.tracking?0:1),alerts:openAlerts().length,missions:state.missions.filter(x=>x.status==='En curso').length,req:state.requests.filter(x=>x.status==='Nueva').length});
