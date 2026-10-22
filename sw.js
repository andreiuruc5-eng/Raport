const C='rapoarte-v3';
const PRE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
const net=fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{})}return r});
const t=new Promise(res=>setTimeout(res,4000,null));
e.respondWith(Promise.race([net.catch(()=>null),t]).then(r=>r||caches.match(e.request,{ignoreSearch:true}).then(m=>m||(e.request.mode==='navigate'?caches.match('./index.html'):null)||net)))});
