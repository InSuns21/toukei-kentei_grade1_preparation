// Real Chromium/CDP acceptance for all 15 ORI SVG films.
// No Playwright dependency, no remote requests, no simulated DOM.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir,mkdtemp,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';

const root=resolve(process.cwd(),'_site');
const screenshots=resolve(process.cwd(),'_ori_svg_render_review');
const chromium=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium',
  '/usr/bin/chromium-browser','/opt/google/chrome/chrome'].find(x=>x&&existsSync(x));
assert.ok(chromium,'Chromium required for ORI browser acceptance');
const films=[
 ['01','ORI1'],['02','ORI2'],['03','ORI3'],['04','ORI5'],['05','ORI7'],
 ['06','ORI8'],['07','ORI10'],['08','ORI14'],['09','ORI15'],['10','ORI17'],
 ['11','ORI20'],['12','ORI22'],['13','ORI24'],['14','ORI25'],['15','ORI28']
];
const mime=name=>name.endsWith('.html')?'text/html; charset=utf-8':
 /\.(?:mjs|js)$/.test(name)?'text/javascript; charset=utf-8':
 name.endsWith('.css')?'text/css; charset=utf-8':
 name.endsWith('.svg')?'image/svg+xml':
 name.endsWith('.json')?'application/json':'text/plain';
const server=createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  const name=decodeURIComponent(url.pathname);
  const target=resolve(root,'.'+name);
  if(!target.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  const bytes=await readFile(target);
  res.writeHead(200,{'content-type':mime(name),'cache-control':'no-store'});
  res.end(bytes);
 }catch(e){res.writeHead(404);res.end(String(e.message));}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port;
const urlOf=(id,chapter)=>origin+'/textbook/volumes/dream_thater/%E5%B9%BE%E4%BD%95%E7%B3%BB/ORI/'+chapter+'/assets/ori-v'+id+'-player.html';
const profile=await mkdtemp(join(tmpdir(),'ori-cd-browser-'));
const browser=spawn(chromium,['--headless=new','--no-sandbox','--disable-gpu',
 '--disable-dev-shm-usage','--no-first-run','--disable-extensions',
 '--remote-allow-origins=*','--remote-debugging-port=0',
 '--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws;const passed=[];
try {
 await mkdir(screenshots,{recursive:true});
 let port=0;
 for(let i=0;i<300;i++){
  if(browser.exitCode!==null)throw Error('Chromium exited before CDP init');
  try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}
  await new Promise(ok=>setTimeout(ok,100));
 }
 assert.ok(port,'DevTools did not start');
 let tab;
 for(let i=0;i<100;i++){
  const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  tab=pages.find(p=>p.type==='page');
  if(tab)break;
  await new Promise(ok=>setTimeout(ok,100));
 }
 assert.ok(tab,'No Chromium target');
 ws=new WebSocket(tab.webSocketDebuggerUrl);
 await new Promise((ok,fail)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',fail,{once:true});});
 const pending=new Map(),runtimeErrors=[];let seq=0;
 ws.addEventListener('message',event=>{
  const msg=JSON.parse(event.data);
  if(msg.method==='Runtime.exceptionThrown')runtimeErrors.push(JSON.stringify(msg.params).slice(0,800));
  const p=pending.get(msg.id);if(!p)return;pending.delete(msg.id);
  if(msg.error)p.fail(Error(msg.error.message));else p.ok(msg.result);
 });
 const cdp=(method,params={})=>new Promise((ok,fail)=>{
  const id=++seq;pending.set(id,{ok,fail});ws.send(JSON.stringify({id,method,params}));
 });
 const js=async expr=>{
  const v=await cdp('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});
  if(v.exceptionDetails)throw Error('Browser JS exception: '+JSON.stringify(v.exceptionDetails).slice(0,900));
  return v.result?.value;
 };
 async function poll(expr,limit=25000){
  const end=Date.now()+limit;let lastErr='';
  while(Date.now()<end){
   try{if(await js(expr))return;}catch(e){lastErr=String(e);}
   await new Promise(ok=>setTimeout(ok,100));
  }
  throw Error('Timeout '+expr+' '+lastErr+' '+JSON.stringify(runtimeErrors.slice(-2)));
 }
 const selector="[data-player=\"time\"]";
 const seek=async t=>{
  await js('(()=>{const s=document.querySelector('+JSON.stringify(selector)+');s.value='+t+';s.dispatchEvent(new Event("input",{bubbles:true}));})()');
  const observed=Number(await js('document.querySelector('+JSON.stringify(selector)+').value'));
  assert.ok(Math.abs(observed-t)<.002,'seek mismatch '+t+' vs '+observed);
 };
 const click=async action=>js('document.querySelector("[data-player=\\"'+action+'\\"]").click()');
 const at=async()=>Number(await js('document.querySelector('+JSON.stringify(selector)+').value'));
 const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
 const capture=async(id,name)=>{
  const r=await js('(()=>{const s=document.querySelector("#ori-b-stage, #stage, #folded"); if(!s)return null;const r=s.getBoundingClientRect();return {x:Math.max(0,r.left+scrollX),y:Math.max(0,r.top+scrollY),width:r.width,height:r.height};})()');
  assert.ok(r&&r.width>150&&r.height>130,'visible SVG missing '+id);
  const image=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:r.x,y:r.y,width:r.width,height:r.height,scale:1}});
  const bytes=Buffer.from(image.data,'base64');
  assert.ok(bytes.length>1200,'blank screenshot '+id);
  await writeFile(join(screenshots,'ori-v'+id+'-'+name+'.png'),bytes);
  return digest(bytes);
 };
 const load=async url=>{
  runtimeErrors.length=0;
  await cdp('Page.navigate',{url});
  await poll('document.readyState==="complete"&&Boolean(document.querySelector("[data-player=\\"time\\"]"))&&!document.querySelector("[data-player=\\"status\\"]").textContent.includes("準備")',30000);
  assert.deepEqual(runtimeErrors,[],'page scripts must not throw: '+url);
  const s=await js('({status:document.querySelector("[data-player=\\"status\\"]").textContent,svg:document.querySelectorAll("svg").length,missing:[...document.querySelectorAll("[data-player]")].filter(e=>e.disabled).length})');
  assert.ok(s.svg>0&&s.status.length>10,'mathematical readout is nonempty');
 };
 const media=async reduce=>cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduce?'reduce':'no-preference'}]});
 const width=async(w=1080,h=880,dpr=1)=>cdp('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:dpr,mobile:w<500});
 await cdp('Runtime.enable');await cdp('Page.enable');await cdp('Network.enable');
 await width();
 await media(false);
 // The first direct visit installs the same worker as Docsify. It must not
 // initiate any animation before the user presses Play.
 await load(urlOf(...films[0]));
 await poll('Boolean(navigator.serviceWorker?.controller)',45000);
 for(const [id,chapter] of films){
  const url=urlOf(id,chapter);
  await load(url);
  assert.ok((await js('document.querySelector("[data-player=\\"play\\"]").textContent')).includes('再生'),
   'no autoplay '+id);
  assert.ok(await js('document.querySelector("[data-player=\\"announcement\\"]")?.getAttribute("aria-live")==="polite"'),'live region '+id);
  assert.equal(await at(),0,'normal-motion first frame '+id);
  const isB=id!=='01'&&id!=='08';
  if(isB){
   const residuals=await js('[...document.querySelectorAll("#invariants tr")].slice(1).map(r=>Number(r.cells[1].textContent))');
   assert.ok(residuals.length>0&&residuals.every(x=>Number.isFinite(x)&&Math.abs(x)<1e-6),'model diagnostics '+id);
  }
  const frame0=await capture(id,'00');
  await seek(.5);const frameMid=await capture(id,'50');
  const liveBefore=await js('document.querySelector("[data-player=\\"announcement\\"]").textContent');
  assert.ok(liveBefore.length>10,'announcement after seeking '+id);
  await click('next');assert.ok(Math.abs(await at()-.75)<.002,'next step '+id);
  await click('previous');assert.ok(Math.abs(await at()-.5)<.002,'previous step '+id);
  const replay=await capture(id,'50-rewind');
  assert.equal(replay,frameMid,'same-state screenshot mismatch after rewind '+id);
  await seek(1);const frame1=await capture(id,'100');
  assert.ok(frame0&&frameMid&&frame1,'keyframes '+id);
  // Some films visualize a discrete predicate (e.g. V09), with unchanged
  // figures between time positions. Their mode selector is tested separately.
  // V05 at h=+3 and h=-3 has no visible intersection in either endpoint;
  // its central frame must instead differ, since h=0 yields two candidates.
  if(id==='05')assert.notEqual(frame0,frameMid,'O5 two-root middle differs from no-root frame');
  else if(id!=='09')assert.notEqual(frame0,frame1,'SVG did not change between endpoints '+id);
  await click('reset');assert.equal(await at(),0,'reset '+id);
  const speed=await js('(()=>{const e=document.querySelector("[data-player=\\"speed\\"]");e.value="2";e.dispatchEvent(new Event("change"));return e.value;})()');
  assert.equal(speed,'2');
  await click('play');
  await poll('Number(document.querySelector("[data-player=\\"time\\"]").value)>.002',4500);
  await click('play');const paused=await at();
  await new Promise(ok=>setTimeout(ok,130));
  assert.ok(Math.abs(await at()-paused)<.002,'pause must freeze time '+id);
  // Real keyboard event, not direct DOM input: Home and ArrowRight.
  await js('document.querySelector("[data-player=\\"time\\"]").focus()');
  const key=async(name,code,n)=>{await cdp('Input.dispatchKeyEvent',{type:'rawKeyDown',key:name,code,windowsVirtualKeyCode:n});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:name,code,windowsVirtualKeyCode:n});};
  await key('Home','Home',36);assert.ok((await at())<.002,'Home key '+id);
  await key('ArrowRight','ArrowRight',39);assert.ok((await at())>0,'ArrowRight '+id);
  await key('End','End',35);assert.ok(Math.abs(await at()-1)<.002,'End key '+id);
  // Compare all additional mathematical modes; changes must update visuals
  // and the spoken text without stale previous-mode data.
  const variants=await js('(()=>{const s=document.querySelector("#case");return s?[...s.options].map(o=>o.value):[];})()');
  if(variants.length>1){
   await seek(.5);
   const a=await capture(id,'mode-first');
   await js('(()=>{const e=document.querySelector("#case");e.selectedIndex=1;e.dispatchEvent(new Event("change"));})()');
   const b=await capture(id,'mode-second');
   assert.notEqual(a,b,'mode change must affect SVG '+id);
   const liveAfter=await js('document.querySelector("[data-player=\\"announcement\\"]").textContent');
   assert.ok(liveAfter.length>10,'mode must update accessible announcement');
  }
  await width(360,800,1);
  const narrow=await js('(()=>{const p=document.querySelector("#ori-b-stage, #stage, #folded"),r=p.getBoundingClientRect();return {documentWidth:document.documentElement.scrollWidth,viewport:innerWidth,svgWidth:r.width,containerWidth:p.parentElement.clientWidth,figureScroll:p.parentElement.scrollWidth>p.parentElement.clientWidth+2};})()');
  assert.ok(narrow.documentWidth<=narrow.viewport+2,'horizontal page overflow at 360px '+id+' '+JSON.stringify(narrow));
  if(id!=='08')assert.ok(narrow.svgWidth>550&&narrow.figureScroll,'text should be legible with figure scroll '+id+' '+JSON.stringify(narrow));
  await capture(id,'mobile360');
  await cdp('Emulation.setPageScaleFactor',{pageScaleFactor:2});
  const zoom=await js('({scale:visualViewport.scale,bodyWidth:document.documentElement.scrollWidth,viewport:innerWidth})');
  assert.ok(zoom.scale>=1.9,'200% zoom not applied '+id);
  assert.ok(zoom.bodyWidth<=zoom.viewport+2,'body overflows 200% zoom '+id);
  await cdp('Emulation.setPageScaleFactor',{pageScaleFactor:1});
  await width();
  await media(true);
  await load(url);
  assert.equal(await at(),1,'prefers-reduced-motion should show poster state '+id);
  assert.ok((await js('document.querySelector("[data-player=\\"play\\"]").textContent')).includes('再生'),'reduced motion autoplay '+id);
  await media(false);
  passed.push('ORI-V'+id);
  console.log('ORI-V'+id+': browser controls, 360px, 200%, SVG keyframes, reduced motion PASS');
 }
 // Every asset was loaded once while the Service Worker controlled the page.
 // Disabling the HTTP browser cache isolates the actual SW cache fallback.
 await cdp('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
 for(const [id,chapter] of films){
  await load(urlOf(id,chapter));
  assert.ok(await js('Boolean(navigator.serviceWorker.controller)'),'offline worker must control '+id);
  await seek(.5);
  assert.ok((await js('document.querySelector("[data-player=\\"status\\"]").textContent')).length>10,'offline model '+id);
 }
 await cdp('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:0,uploadThroughput:0});
 assert.deepEqual(runtimeErrors,[],'no unhandled runtime exception in offline revisit');
 await writeFile(join(screenshots,'README.txt'),passed.join('\n')+'\n15 online and offline browser navigations; screenshots are generated from real Chromium.\n');
 console.log(JSON.stringify({result:'PASS',films:passed,offline:passed.length,checks:['replay','pause','rewind','speed','keyframes','mobile360','zoom200','accessibilityDOM','reducedMotion','offlineRevisit'],artifact:screenshots}));
}finally{
 if(ws)ws.close();browser.kill('SIGKILL');server.close();
 await rm(profile,{recursive:true,force:true,maxRetries:20,retryDelay:150});
}
