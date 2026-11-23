// Real Chromium/WebGL2 acceptance for FCG5 physics-grid rendering and sandbox.
// Tests actual shader compilation, texture upload, GPU readPixels and editable sources.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path,{join} from 'node:path';

const root=join(process.cwd(),'_site');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium',
  '/usr/bin/chromium-browser','/opt/google/chrome/chrome'].find(p=>p&&existsSync(p));
assert.ok(chrome,'Chrome/Chromium required for FCG5 GPU validation');
const mime=p=>p.endsWith('.html')?'text/html; charset=utf-8':
  p.endsWith('.css')?'text/css; charset=utf-8':/\.(?:mjs|js)$/.test(p)?
  'text/javascript; charset=utf-8':'text/plain; charset=utf-8';
const server=createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const target=path.resolve(root,'.'+pathname);
    if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const bytes=await readFile(target);
    res.writeHead(200,{'content-type':mime(target),'cache-control':'no-store'}).end(bytes);
  }catch(error){res.writeHead(404).end(String(error.message));}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG5';
const profile=await mkdtemp(join(tmpdir(),'fcg5-browser-'));
const browser=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage',
  '--no-first-run','--disable-extensions','--enable-unsafe-swiftshader',
  '--use-gl=angle','--use-angle=swiftshader','--remote-allow-origins=*',
  '--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws;
try {
  let port;
  for(let k=0;k<300;k++){
    if(browser.exitCode!==null)throw Error('Chromium exited '+browser.exitCode);
    try {port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(port,'Chromium CDP port missing');
  let page;
  for(let k=0;k<100;k++){
    const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
    page=pages.find(x=>x.type==='page');
    if(page)break;
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(page,'Chromium page missing');
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok,fail)=>{
    ws.addEventListener('open',ok,{once:true});
    ws.addEventListener('error',fail,{once:true});
  });
  let requestId=0;
  const pending=new Map(),exceptions=[];
  ws.addEventListener('message',event=>{
    const msg=JSON.parse(event.data);
    if(msg.method==='Runtime.exceptionThrown')exceptions.push(msg.params);
    const job=pending.get(msg.id);
    if(job){pending.delete(msg.id);msg.error?job.reject(Error(msg.error.message)):job.resolve(msg.result);}
  });
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++requestId;pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  const evaluate=async expression=>{
    const response=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(response.exceptionDetails)throw Error('Chromium JS: '+JSON.stringify(response.exceptionDetails));
    return response.result?.value;
  };
  const waitFor=async (expression,limit=20000)=>{
    const end=Date.now()+limit;
    while(Date.now()<end){
      if(await evaluate(expression))return;
      await new Promise(ok=>setTimeout(ok,100));
    }
    const state=await evaluate('({status:document.querySelector("#status")?.textContent,live:document.querySelector("#fcg5-live-state")?.textContent,hidden:document.hidden,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,events:window.__fcg5Events?.slice(-12),diagnostics:document.querySelector("#diagnostics")?.textContent?.slice(-800)})');
    throw Error('Timed out: '+expression+' last state='+JSON.stringify(state)+' exceptions '+JSON.stringify(exceptions.slice(-2)));
  };
  const click=id=>evaluate('document.getElementById('+JSON.stringify(id)+').click()');
  await cdp('Runtime.enable');await cdp('Page.enable');

  await cdp('Emulation.setDeviceMetricsOverride',
    {width:1000,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.querySelector("#status")?.textContent==="実行できます"');
  assert.equal(await evaluate('document.querySelectorAll("[role=tabpanel]").length'),3);
  assert.match(await evaluate('document.querySelector("#js-source").value'),/texImage2D/);
  assert.match(await evaluate('document.querySelector("#fragment-source").value'),/texelFetch/);
  // The initial task must lead to the actual sandboxed learner source.
  // A second independent 80x80 fluid canvas must not be mounted.
  assert.equal(await evaluate('document.querySelectorAll(".visual-smoke canvas").length'),0);
  assert.match(await evaluate('document.querySelector(".visual-guide")?.textContent || document.querySelector("#panel-conditions")?.textContent'),/48×48/);
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")===null'),true);
  // Diagnose session-scoped progress delivery independently of GPU rendering.
  await evaluate('window.__fcg5Events=[];window.addEventListener("message",e=>{if(e.data?.type?.startsWith("fcg5"))window.__fcg5Events.push({type:e.data.type,step:e.data.step,playing:e.data.playing,requestId:e.data.requestId});})');
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  const initial=await evaluate('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(x=>x.textContent)),log:document.querySelector("#diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox"),opaque:(()=>{try{return !!document.querySelector("#canvas-slot iframe").contentWindow.document.body}catch{return true}})()})');
  assert.equal(initial.rows.length,9);
  assert.ok(initial.rows.every(r=>r[4]==='OK'),JSON.stringify(initial.rows));
  assert.match(initial.log,/POISSON/);
  assert.match(initial.log,/DIVERGENCE/);
  assert.match(initial.log,/DYE/);
  assert.match(initial.log,/IDENTITY/);
  assert.match(initial.log,/BOUNDARY/);
  assert.match(await evaluate('document.querySelector("#fcg5-cpu-prediction").textContent'),/Poisson residual=/);
  assert.equal(initial.sandbox,'allow-scripts');
  assert.equal(initial.opaque,true);
  console.log('FCG5 actual GPU texture, nine readPixels, independent CPU and opaque sandbox: PASS');
  // The only running observation is the source-linked learner JS sandbox.
  // Crop to its actual GPU canvas, not an independent reference simulation.
  await evaluate('document.querySelector("#canvas-slot iframe").scrollIntoView({block:"center"})');
  await new Promise(ok=>setTimeout(ok,180));
  const linkedBox=await evaluate('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};})()');
  assert.ok(linkedBox.width>200&&linkedBox.height>100,JSON.stringify(linkedBox));
  const linkedCrop={...linkedBox,scale:1};
  const linkedFirst=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  await new Promise(ok=>setTimeout(ok,950));
  const linkedSecond=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  assert.notEqual(linkedFirst.data,linkedSecond.data,'real 48x48 solver should change GPU dye frames over time');
  console.log('FCG5 editable 48x48 MAC solver animates actual GPU dye frames: PASS');
  // Capture can change motion preference or leave the learner solver paused.
  // Inspect its authenticated *actual* progress before forcing reduce below.
  await waitFor('document.querySelector("#fcg5-live-state")?.textContent.match(/(?:再生中|一時停止中)/)',25000);
  const focusPoint=await evaluate('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+Math.min(64,r.height/4)};})()');
  await cdp('Input.dispatchMouseEvent',{type:'mousePressed',x:focusPoint.x,y:focusPoint.y,button:'left',buttons:1,clickCount:1});
  await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',x:focusPoint.x,y:focusPoint.y,button:'left',buttons:0,clickCount:1});
  if(await evaluate('document.querySelector("#fcg5-live-state").textContent.includes("一時停止中")')){
    // Use the learner-facing authenticated GPU button; the solver stays the same.
    await click('fcg5-live-toggle');
  }
  await waitFor('document.querySelector("#fcg5-live-state")?.textContent.includes("再生中")',25000);
  // Focus the real sandbox canvas before freezing screenshots, so an outline
  // change alone cannot be mistaken for a resumed physical animation.
  // G4: switching reduced motion at runtime pauses the very same editable
  // solver. Removing the preference alone must not resume physical steps.
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await waitFor('document.querySelector("#fcg5-live-state")?.textContent.includes("一時停止中")',25000);
  // Motion is emitted from the sandbox after the initial readPixels report;
  // verify the actual image, not the initial-only diagnostic snapshot.
  await new Promise(ok=>setTimeout(ok,350));
  const frozenStep=await evaluate('document.querySelector("#fcg5-live-state").textContent');
  const frozenFirst=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  await new Promise(ok=>setTimeout(ok,550));
  const frozenSecond=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  assert.equal(await evaluate('document.querySelector("#fcg5-live-state").textContent'),
    frozenStep,'live physics steps must remain frozen under reduced motion');
  assert.equal(frozenSecond.data,frozenFirst.data,'real solver GPU dye must stop when OS reduces motion');
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await new Promise(ok=>setTimeout(ok,450));
  const stillFrozen=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  assert.equal(stillFrozen.data,frozenFirst.data,'removing reduced motion must not auto-resume real solver');
  assert.equal(await evaluate('document.querySelector("#fcg5-live-state").textContent'),
    frozenStep,'removing preference must not advance physical steps');
  // No auto-resume: the same real solver is resumed by its visible GPU toggle.
  await click('fcg5-live-toggle');
  await waitFor('document.querySelector("#fcg5-live-state")?.textContent.includes("再生中")',25000);
  await waitFor('document.querySelector("#fcg5-live-state")?.textContent.match(/step (\\d+)/)?.[1] !== '+JSON.stringify(frozenStep.match(/step (\d+)/)?.[1]),10000);
  const resumed=await cdp('Page.captureScreenshot',{format:'png',clip:linkedCrop,captureBeyondViewport:true});
  assert.notEqual(resumed.data,frozenFirst.data,'Space must resume the same GPU fluid solver');
  console.log('FCG5 single solver reduced-motion change, no auto-resume and authenticated live button: PASS');



  await evaluate('([...document.querySelectorAll("main button")].find(b=>b.textContent==="1ステップ")).click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格") && document.querySelector("#fcg5-cpu-prediction")?.textContent.includes("steps=9")',25000);
  assert.equal(await evaluate('document.querySelectorAll("#results-table tbody tr").length'),9);
  console.log('FCG5 physical step 9 and GPU readback: PASS');

  await click('tab-code');
  const modified=await evaluate('(()=>{const e=document.querySelector("#fragment-source");e.value=e.value.replace("outColor=vec4(q,0.15,1.0-q,1.0);","outColor=vec4(0.0,q,0.0,1.0);");e.dispatchEvent(new Event("input",{bubbles:true}));return e.value.includes("vec4(0.0,q,0.0,1.0)")})()');
  assert.ok(modified,'shader edit not applied');
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("編集コードを実行しました")',25000);
  const shader=await evaluate('document.querySelector("#results-table tbody tr:first-child td:nth-child(5)")?.textContent');
  assert.equal(shader,'変更版: 参考');
  assert.match(await evaluate('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent'),/^0, /);
  await evaluate('document.querySelector("#preset").value="error";document.querySelector("#preset").dispatchEvent(new Event("change"))');
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("WebGL2実行エラー")',25000);
  assert.match(await evaluate('document.querySelector("#diagnostics").textContent'),/FRAGMENT/);
  await click('reset');await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  console.log('FCG5 editable GLSL, shader compile error, reset and recovery: PASS');

  // G2: GUI parameters, the animation and the independent CPU oracle all
  // target the same editable N×N MAC source.
  await click('tab-conditions');
  const gui=await evaluate('(()=>{const g=document.querySelector("#parameter-grid"),n=document.querySelector("#parameter-nu"),f=document.querySelector("#parameter-force");return {grid:g?.value,nu:n?.value,force:f?.value,gridDisabled:g?.disabled,nuDisabled:n?.disabled,forceDisabled:f?.disabled,labels:[...document.querySelectorAll("#lab-parameters .lab-parameter-row small")].map(x=>x.textContent)}})()');
  assert.equal(gui.grid,'48');assert.equal(gui.nu,'0.002');assert.equal(gui.force,'0.08');
  assert.equal(await evaluate('document.querySelector("#parameter-brush-radius")?.value'),'0.085');
  assert.equal(await evaluate('document.querySelector("#parameter-brush-strength")?.value'),'0.48');
  assert.equal(await evaluate('document.querySelector("#parameter-brush-radius")?.disabled'),false);
  assert.equal(await evaluate('document.querySelector("#parameter-brush-strength")?.disabled'),false);
  assert.equal(gui.gridDisabled,false);assert.equal(gui.nuDisabled,false);assert.equal(gui.forceDisabled,false);
  assert.ok(gui.labels.some(t=>t.includes('セル/辺')&&t.includes('fluid.js')));
  assert.ok(gui.labels.some(t=>t.includes('m²/s')&&t.includes('fluid.js')));
  assert.ok(gui.labels.some(t=>t.includes('m²/s²')&&t.includes('forceAmplitude')));
  await evaluate('(()=>{const e=document.querySelector("#parameter-grid");e.value="24";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格")',25000);
  assert.match(await evaluate('document.querySelector("#js-source").value'),/const N=24,h=1\/N/);
  await evaluate('(()=>{const e=document.querySelector("#parameter-nu");e.value="0.0025";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格") && document.querySelector("#js-source")?.value.includes("nu=0.0025")',25000);
  await evaluate('(()=>{const e=document.querySelector("#parameter-force");e.value="0.02";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格") && document.querySelector("#js-source")?.value.includes("nu=0.0025,forceAmplitude=0.02")',25000);
  const edited=await evaluate('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>r.cells[4]?.textContent),note:document.querySelector("#numeric-note")?.textContent,summary:document.querySelector("#numeric-summary")?.textContent})');
  assert.equal(edited.rows.length,9);
  assert.ok(edited.rows.every(x=>x==='OK'),JSON.stringify(edited));
  assert.match(edited.note,/独立CPUの24×24格子/);
  assert.match(edited.summary,/変更条件の独立CPU初期画素 9\/9/);
  // GUI edits one source; the independent initial CPU/GPU oracle is pre-injection.
  await evaluate('(()=>{const e=document.querySelector("#parameter-brush-radius");e.value="0.05";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格") && document.querySelector("#js-source")?.value.includes("dyeBrushRadius=0.05,dyeBrushStrength=0.48")',25000);
  await evaluate('(()=>{const e=document.querySelector("#parameter-brush-strength");e.value="0.6";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格") && document.querySelector("#js-source")?.value.includes("dyeBrushRadius=0.05,dyeBrushStrength=0.6")',25000);
  assert.match(await evaluate('document.querySelector("#numeric-note")?.textContent'),/染料ブラシ半径=0[.]05 m、入力強度=0[.]6/);
  await click('save');
  await cdp('Page.reload',{ignoreCache:true});
  await waitFor('document.querySelector("#status")?.textContent==="実行できます"',25000);
  assert.equal(await evaluate('document.querySelectorAll(".visual-smoke canvas").length'),0,
    'reload must not restore the independent fluid observation');
  assert.match(await evaluate('document.querySelector("#js-source").value'),/nu=0\.0025,forceAmplitude=0\.02/);
  assert.equal(await evaluate('document.querySelector("#parameter-grid").value'),'24');
  assert.equal(await evaluate('document.querySelector("#parameter-nu").value'),'0.0025');
  assert.equal(await evaluate('document.querySelector("#parameter-force").value'),'0.02');
  assert.equal(await evaluate('document.querySelector("#parameter-brush-radius").value'),'0.05');
  assert.equal(await evaluate('document.querySelector("#parameter-brush-strength").value'),'0.6');
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")===null'),true,
    'saved code must not run automatically after reload');
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("FCG5 編集した条件の独立CPU初期画素検算に合格")',25000);
  await click('tab-code');
  await evaluate('(()=>{const e=document.querySelector("#js-source");e.value=e.value.replace("nu=0.0025","nu=0.001+0.0015");e.dispatchEvent(new Event("input",{bubbles:true}))})()');
  assert.equal(await evaluate('document.querySelector("#parameter-nu").disabled'),true);
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("編集コードを実行しました（基準との差を比較）")',25000);
  assert.equal(await evaluate('document.querySelector("#results-table tbody tr:first-child td:nth-child(5)")?.textContent'),'変更版: 参考');
  await click('reset');await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  console.log('FCG5 R1 grid/viscosity/force/dye brush GUI, independent CPU initial pixels, save/reload and expression safety: PASS');


  await cdp('Emulation.setDeviceMetricsOverride',
    {width:360,height:760,deviceScaleFactor:2,mobile:true});
  await click('tab-code');
  const narrow=await evaluate('({page:document.querySelector("main").getBoundingClientRect().width,editor:document.querySelector("#js-source").getBoundingClientRect().width,scroll:document.querySelector("#js-source").scrollWidth,client:document.querySelector("#js-source").clientWidth})');
  assert.ok(narrow.client>0&&narrow.scroll<=narrow.client+2,JSON.stringify(narrow));
  assert.ok(narrow.editor<=narrow.page+2,JSON.stringify(narrow));
  console.log('FCG5 360px editable editor: PASS');

  // FCG8: square field views must move through rAF while retaining the exact
  // CPU-vs-GPU baseline in the original source-editing laboratory.
  await cdp('Emulation.setDeviceMetricsOverride',
    {width:1000,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:url.replace('lesson=FCG5','lesson=FCG8')});
  await waitFor('document.querySelector("#status")?.textContent==="実行できます"');
  const f8=await evaluate('(()=>{const cs=[...document.querySelectorAll(".visual-observation-grid canvas")];return {count:cs.length,rects:cs.map(c=>{const r=c.getBoundingClientRect();return [r.width,r.height]}),clock:document.querySelector(".visual-clock")?.textContent}})()');
  assert.equal(f8.count,3);
  assert.ok(f8.rects.every(([w,h])=>w>160&&Math.abs(w-h)<2),JSON.stringify(f8));
  // FCG8 advances a CPU-derived three-canvas field on each rAF. Its first
  // rendered frames can take longer than a fixed wall-clock sleep on CI GPUs.
  // Poll the *actual physical clock*, rather than assuming 330 ms is enough.
  await waitFor('document.querySelector(".visual-clock")?.textContent!=='+JSON.stringify(f8.clock),25000);
  const f8clock=await evaluate('document.querySelector(".visual-clock").textContent');
  assert.notEqual(f8clock,f8.clock,'FCG8 should animate physical interpolation with rAF');
  await evaluate('document.querySelector(".visual-observation [data-action=play]").click()');
  await evaluate('(()=>{const s=document.querySelector(".visual-observation [data-action=seek]");s.value="500";s.dispatchEvent(new Event("input",{bubbles:true}));})()');
  assert.match(await evaluate('document.querySelector(".visual-clock").textContent'),/1\.92 s/);
  assert.match(await evaluate('document.querySelector(".visual-stats").textContent'),/解析的面積/);
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  console.log('FCG8 rAF smooth Level Set, correct-aspect triple view and reference GPU validation: PASS');
} finally {
  try {ws?.close();}catch{}
  browser.kill('SIGTERM');
  await new Promise(resolve=>{
    if(browser.exitCode!==null)return resolve();
    const timer=setTimeout(()=>{browser.kill('SIGKILL');resolve();},3000);
    browser.once('exit',()=>{clearTimeout(timer);resolve();});
  });
  server.close();
  try{await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:100});}
  catch(error){console.warn('FCG5 profile cleanup: '+error.message);}
}
