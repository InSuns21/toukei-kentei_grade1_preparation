// FCG8 real Chromium regression: the *editable* WebGL2 scene must actually move.
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
assert.ok(chrome,'Chrome/Chromium required for FCG8 visual regression');
const mime=p=>p.endsWith('.html')?'text/html; charset=utf-8':
  p.endsWith('.css')?'text/css; charset=utf-8':
  /\.(?:mjs|js)$/.test(p)?'text/javascript; charset=utf-8':'text/plain; charset=utf-8';
const server=createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const target=path.resolve(root,'.'+pathname);
    if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const body=await readFile(target);
    res.writeHead(200,{'content-type':mime(target),'cache-control':'no-store'}).end(body);
  }catch(error){res.writeHead(404).end(String(error.message));}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG8';
const profile=await mkdtemp(join(tmpdir(),'fcg8-browser-'));
const browser=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage',
  '--no-first-run','--disable-extensions','--enable-unsafe-swiftshader',
  '--use-gl=angle','--use-angle=swiftshader','--remote-allow-origins=*',
  '--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws;
try {
  let port;
  for(let k=0;k<300;k++){
    if(browser.exitCode!==null)throw Error('Chromium exited '+browser.exitCode);
    try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(port,'Chromium CDP port missing');
  let page;
  for(let k=0;k<100;k++){
    const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
    page=pages.find(x=>x.type==='page');if(page)break;
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(page,'Chromium page missing');
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok,fail)=>{
    ws.addEventListener('open',ok,{once:true});
    ws.addEventListener('error',fail,{once:true});
  });
  let requestId=0;const pending=new Map(),exceptions=[];
  ws.addEventListener('message',event=>{
    const m=JSON.parse(event.data);
    if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params);
    const task=pending.get(m.id);
    if(task){pending.delete(m.id);m.error?task.reject(Error(m.error.message)):task.resolve(m.result);}
  });
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++requestId;pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  const evaluate=async expression=>{
    const result=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails)throw Error('Chromium JS: '+JSON.stringify(result.exceptionDetails));
    return result.result?.value;
  };
  const waitFor=async(expression,limit=25000)=>{
    const deadline=Date.now()+limit;
    while(Date.now()<deadline){
      if(await evaluate(expression))return;
      await new Promise(ok=>setTimeout(ok,100));
    }
    throw Error('FCG8 wait expired: '+expression+'; '+JSON.stringify(
      await evaluate('({status:document.querySelector("#status")?.textContent,logs:document.querySelector("#diagnostics")?.textContent?.slice(-400)})'))+
      ' exceptions='+JSON.stringify(exceptions.slice(-2)));
  };
  const action=label=>evaluate('([...document.querySelectorAll("#lab-actions button")].find(x=>x.textContent.trim()==='+JSON.stringify(label)+')).click()');
  const step=()=>evaluate('Number(document.querySelector("#lab-actions output")?.textContent?.match(/物理step (\\d+)/)?.[1]||NaN)');
  await cdp('Runtime.enable');await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1200,height:850,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.deepEqual(await evaluate('([Number(document.querySelector("#width").value),Number(document.querySelector("#height").value)])'),[1536,512]);
  assert.ok(await evaluate('document.querySelector(".visual-observation-grid canvas")?.width>=320'));
  await evaluate('document.querySelector(".visual-observation [data-action=play]").click()'); // observer can be paused independently
  await evaluate('document.getElementById("run").click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")');
  const initial=await evaluate('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)),iframe:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(initial.rows.length,13);
  assert.ok(initial.rows.every(r=>r[4]==='OK'),JSON.stringify(initial.rows));
  assert.equal(initial.iframe,'allow-scripts');
  const scene8levelset=await evaluate('({grid:document.querySelector("#scene-info .scene-info-list > div:first-child dd")?.textContent,color:document.querySelector("#scene-info .scene-info-list > div:nth-child(3) dd")?.textContent,clock:document.querySelector("#scene-info .scene-info-list > div:nth-child(4) dd")?.textContent,mode:document.querySelector("#scene-info .scene-info-list > div:nth-child(5) dd")?.textContent,source:document.querySelector("#scene-info .scene-info-list > div:last-child dd")?.textContent})');
  assert.match(scene8levelset.grid,/48×48.*Float64.*R8/);
  assert.match(scene8levelset.color,/再初期化6反復.*64粒子.*0.014 m/);
  assert.match(scene8levelset.clock,/物理step 8、t=0.32 s/);
  assert.match(scene8levelset.mode,/R8.*双線形補間.*初期GPU照合後/);
  assert.match(scene8levelset.source,/levelset.js.*levelset.frag/);

  const position=await evaluate('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.left+window.scrollX,y:r.top+window.scrollY,width:r.width,height:r.height}})()');
  assert.ok(position.width>600&&position.height>100,JSON.stringify(position));
  const clip={...position,scale:1};
  const first=(await cdp('Page.captureScreenshot',{format:'png',clip,captureBeyondViewport:true})).data;
  assert.equal(await step(),8);
  await action('再生');
  await waitFor('Number(document.querySelector("#lab-actions output")?.textContent?.match(/物理step (\\d+)/)?.[1]||0)>15');
  await action('一時停止');
  const now=await step();
  assert.ok(now>15&&now<=96,'editable physical state must progress: '+now);
  const after=(await cdp('Page.captureScreenshot',{format:'png',clip,captureBeyondViewport:true})).data;
  assert.notEqual(first,after,'the same sandbox GPU canvas must visibly change under Play');
  await action('step 0へ戻す');
  await waitFor('document.querySelector("#lab-actions output")?.textContent.includes("物理step 0/96")');
  await action('1ステップ');
  await waitFor('document.querySelector("#lab-actions output")?.textContent.includes("物理step 1/96")');
  assert.equal(await evaluate('document.querySelectorAll("#canvas-slot iframe").length'),1,
    'step and reset must retain a single live sandbox');
  // R3: edit the same learner Level Set JS via the shared G2 controls.
  // The actual GPU textures, independent CPU fields and 13 pixel probes must agree.
  await evaluate('document.getElementById("tab-conditions").click()');
  for(const [id,value,pattern] of [
    ['grid','96','const N=96,h=1/N'],
    ['shear','1','shear=1,radius=0.18'],
    ['redistance','0','const redistanceIterations=0,redistanceCFL']
  ]){
    await evaluate('(()=>{const slider=document.getElementById("parameter-'+id+'");slider.value="'+value+'";slider.dispatchEvent(new Event("input",{bubbles:true}));slider.dispatchEvent(new Event("change",{bubbles:true}));})()');
    await waitFor('document.querySelector("#status")?.textContent.includes("FCG8 編集した格子・せん断・再初期化の独立CPU初期画素検算に合格") && document.querySelectorAll("#results-table tbody tr").length===13',45000);
    const result=await evaluate('({source:document.getElementById("js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)),description:document.querySelector("#scene-info").textContent,summary:document.getElementById("fcg8-cpu-prediction").textContent})');
    assert.ok(result.source.includes(pattern),'editable source literal '+pattern);
    assert.ok(result.rows.every(row=>row[4]==='OK'),JSON.stringify({id,value,rows:result.rows}));
    assert.match(result.description,/96×96.*R8/);
    assert.match(result.summary,/N=96/);
    console.log('FCG8 actual edited '+id+'='+value+', CPU/GPU 13 readback pixels: PASS');
  }
  assert.match(await evaluate('document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")'),/allow-scripts/);
  const highGrid=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:760,deviceScaleFactor:1,mobile:true});
  const narrow=await evaluate('({contentWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth,canvasWidth:document.querySelector("#canvas-slot iframe")?.getBoundingClientRect().width,controls:[...document.querySelectorAll(".lab-parameter-row input")].map(e=>e.getBoundingClientRect().width)})');
  assert.ok(narrow.canvasWidth>50 && narrow.canvasWidth<=360,JSON.stringify(narrow));
  assert.ok(narrow.contentWidth<=narrow.windowWidth+2,JSON.stringify(narrow));
  const narrowImage=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  assert.notEqual(highGrid.data,narrowImage.data);
  console.log('FCG8 actual edited grids, CPU/GPU, playback and Chromium 360px screenshot/layout: PASS');
} finally {
  try{ws?.close();}catch{}
  browser.kill('SIGTERM');
  await new Promise(resolve=>{
    if(browser.exitCode!==null)return resolve();
    const timer=setTimeout(()=>{browser.kill('SIGKILL');resolve();},3000);
    browser.once('exit',()=>{clearTimeout(timer);resolve();});
  });
  server.close();
  try{await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:100});}
  catch(error){console.warn('FCG8 browser profile cleanup: '+error.message);}
}
