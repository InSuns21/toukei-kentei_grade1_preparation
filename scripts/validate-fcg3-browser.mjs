// Real Chromium/WebGL2 acceptance for FCG3 physics-grid rendering and sandbox.
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
assert.ok(chrome,'Chrome/Chromium required for FCG3 GPU validation');
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
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG3';
const profile=await mkdtemp(join(tmpdir(),'fcg3-browser-'));
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
    const state=await evaluate('({status:document.querySelector("#status")?.textContent,diagnostics:document.querySelector("#diagnostics")?.textContent?.slice(-800)})');
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
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  const initial=await evaluate('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(x=>x.textContent)),log:document.querySelector("#diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox"),opaque:(()=>{try{return !!document.querySelector("#canvas-slot iframe").contentWindow.document.body}catch{return true}})()})');
  assert.equal(initial.rows.length,6);
  assert.ok(initial.rows.every(r=>r[4]==='OK'),JSON.stringify(initial.rows));
  assert.match(initial.log,/MASS/);
  assert.match(initial.log,/ERROR/);
  assert.match(initial.log,/R8/);
  assert.match(await evaluate('document.querySelector("#fcg3-cpu-prediction").textContent'),/mass=/);
  assert.equal(initial.sandbox,'allow-scripts');
  assert.equal(initial.opaque,true);
  const dyeFrame0=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await new Promise(ok=>setTimeout(ok,700));
  const dyeFrameNext=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  assert.notEqual(dyeFrame0.data,dyeFrameNext.data,'FCG3 actual semi-Lagrangian dye should animate');
  console.log('FCG3 source-linked physical steps alter real Chromium display frames: PASS');
  console.log('FCG3 actual GPU texture, six readPixels, independent CPU and opaque sandbox: PASS');

  await evaluate('([...document.querySelectorAll("main button")].find(b=>b.textContent==="1step")).click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格") && document.querySelector("#fcg3-cpu-prediction")?.textContent.includes("step 2")',25000);
  assert.equal(await evaluate('document.querySelectorAll("#results-table tbody tr").length'),6);
  console.log('FCG3 physical time step and GPU readback: PASS');

  // R3: each GUI grid setting rewrites the actual edited JS, and its R8 GPU
  // samples must match a separately recomputed CPU grid at the same step/time.
  await click('tab-conditions');
  assert.equal(await evaluate('document.getElementById("parameter-grid").value'),'32');
  const gridReadbacks=[];
  for(const N of [64,96,32]){
    await evaluate('(()=>{const e=document.getElementById("parameter-grid");e.value='+JSON.stringify(N)+';e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));})()');
    await waitFor('document.getElementById("fcg3-cpu-prediction")?.textContent.includes("'+N+'×'+N+'") && document.querySelector("#status")?.textContent.includes("独立") && document.querySelectorAll("#results-table tbody tr").length===6',25000);
    const actual=await evaluate('({source:document.getElementById("js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)),info:document.querySelector("#scene-info").textContent,status:document.querySelector("#status").textContent})');
    assert.match(actual.source,new RegExp('const N='+N+', dt=1/32'));
    assert.match(actual.info,new RegExp(N+'×'+N));
    assert.ok(actual.rows.every(row=>row[4]==='OK'),JSON.stringify({N,rows:actual.rows}));
    assert.match(actual.status,/独立.+画素検算に合格/);
    gridReadbacks.push(actual.rows.map(row=>row[2]).join('|'));
    console.log('FCG3 real '+N+'×'+N+' edited grid, independent CPU/R8 GPU 6 pixels: PASS');
  }
  assert.notEqual(gridReadbacks[0],gridReadbacks[1],
    'N64 and N96 readbacks must represent different physical grid samples');

  await click('tab-code');
  const modified=await evaluate('(()=>{const e=document.querySelector("#fragment-source");e.value=e.value.replace("if(left)outColor=vec4(q,0.15,1.0-q,1.0);","if(left)outColor=vec4(0.0,q,0.0,1.0);");e.dispatchEvent(new Event("input",{bubbles:true}));return e.value.includes("vec4(0.0,q,0.0,1.0)")})()');
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
  console.log('FCG3 editable GLSL, shader compile error, reset and recovery: PASS');

  // G4: the GUI edits the *same* JS that the shader runner executes. A saved
  // edit must be restored as source only, without executing any persisted JS.
  assert.equal(await evaluate('document.getElementById("parameter-radius")?.value'),'0.14');
  assert.equal(await evaluate('document.getElementById("parameter-radius")?.disabled'),false);
  await evaluate('(()=>{const e=document.getElementById("parameter-radius");e.value="0.24";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));})()');
  assert.equal(await evaluate('document.getElementById("js-source").value.includes("radius=0.24;")'),true);
  await waitFor('document.getElementById("status")?.textContent.includes("FCG3 編集格子・染料半径の独立CPU初期画素検算に合格")',25000);
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")'),'allow-scripts');
  assert.match(await evaluate('document.getElementById("numeric-summary").textContent'),/変更格子の独立CPU初期画素/);
  await click('save');
  assert.match(await evaluate('document.getElementById("save-status").textContent'),/保存しました/);
  await cdp('Page.navigate',{url});
  await waitFor('document.querySelector("#status")?.textContent==="実行できます"');
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")===null'),true);
  assert.equal(await evaluate('document.getElementById("parameter-radius").value'),'0.24');
  assert.equal(await evaluate('document.getElementById("js-source").value.includes("radius=0.24;")'),true);
  await evaluate('(()=>{const e=document.getElementById("js-source");e.value=e.value.replace("radius=0.24;","radius=1/5;");e.dispatchEvent(new Event("input",{bubbles:true}));})()');
  assert.equal(await evaluate('document.getElementById("parameter-radius").disabled'),true);
  assert.equal(await evaluate('document.getElementById("js-source").value.includes("radius=1/5;")'),true);
  await click('reset');
  assert.equal(await evaluate('document.getElementById("parameter-radius").value'),'0.14');
  assert.equal(await evaluate('document.getElementById("parameter-radius").disabled'),false);
  await click('run');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',25000);
  assert.equal(await evaluate('document.querySelectorAll("#results-table tbody tr").length'),6);
  console.log('G4 FCG3 GUI→GPU→save→safe restore→nonliteral protection→reset→GPU oracle: PASS');

  await cdp('Emulation.setDeviceMetricsOverride',
    {width:360,height:760,deviceScaleFactor:2,mobile:true});
  await click('tab-code');
  const narrow=await evaluate('({page:document.querySelector("main").getBoundingClientRect().width,editor:document.querySelector("#js-source").getBoundingClientRect().width,scroll:document.querySelector("#js-source").scrollWidth,client:document.querySelector("#js-source").clientWidth})');
  assert.ok(narrow.client>0&&narrow.scroll<=narrow.client+2,JSON.stringify(narrow));
  assert.ok(narrow.editor<=narrow.page+2,JSON.stringify(narrow));
  await click('tab-result');
  const mobileResult=await evaluate(`(() => {
    const frame=document.querySelector('#canvas-slot iframe');
    const canvas=frame?.getBoundingClientRect();
    const main=document.querySelector('main').getBoundingClientRect();
    const scene=document.querySelector('#scene-info').getBoundingClientRect();
    return {viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,
      mainWidth:main.width,canvasWidth:canvas?.width??0,sceneWidth:scene.width,
      sandbox:frame?.getAttribute('sandbox'),
      numericCollapsed:!document.querySelector('#numeric-details').open};
  })()`);
  assert.ok(mobileResult.canvasWidth>200&&mobileResult.canvasWidth<=mobileResult.mainWidth+2,
    JSON.stringify(mobileResult));
  assert.ok(mobileResult.sceneWidth<=mobileResult.mainWidth+2,JSON.stringify(mobileResult));
  assert.ok(mobileResult.documentWidth<=mobileResult.viewport+2,JSON.stringify(mobileResult));
  assert.equal(mobileResult.sandbox,'allow-scripts');
  assert.equal(mobileResult.numericCollapsed,true);
  console.log('FCG3 360px live GPU canvas, legend and collapsed diagnostics: PASS');
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
  catch(error){console.warn('FCG3 profile cleanup: '+error.message);}
}
