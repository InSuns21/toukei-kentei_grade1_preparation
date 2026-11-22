// Real Chromium WebGL2 acceptance: FCG6 actual edited 48x48 MAC solver.
// Initial nine GPU pixels must agree with independent graph-CG CPU oracle.
// Real Chromium/WebGL2 acceptance for FCG6 physics-grid rendering and sandbox.
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
assert.ok(chrome,'Chrome/Chromium required for FCG6 GPU validation');
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
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG6';
const profile=await mkdtemp(join(tmpdir(),'fcg6-browser-'));
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

  for(const width of [1280,360]){
    await cdp('Emulation.setDeviceMetricsOverride',
      {width,height:900,deviceScaleFactor:1,mobile:width===360});
    if(width===1280){
      await cdp('Page.navigate',{url});
      await waitFor('document.querySelector("#status")?.textContent==="実行できます"');
      assert.equal(await evaluate('document.querySelectorAll("[role=tabpanel]").length'),3);
      assert.ok((await evaluate('document.querySelector("#js-source").value')).includes('const N=48,h=1/N'));
      assert.ok((await evaluate('document.querySelector("#fragment-source").value')).includes('textureSize(u_solid,0)'));
    }
    await click('run');
    await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")',90000);
    const result=await evaluate('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(x=>x.textContent)),log:document.querySelector("#diagnostics").textContent,frame:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox"),info:document.querySelector("#scene-info")?.textContent||document.querySelector(".scene-info")?.textContent||"",pageWidth:document.querySelector("main")?.getBoundingClientRect().width})');
    assert.equal(result.rows.length,9,'FCG6 actual WebGL2 readback count');
    assert.ok(result.rows.every(r=>r[4]==='OK'),JSON.stringify(result.rows));
    assert.equal(result.frame,'allow-scripts');
    assert.match(result.log,/MODEL.*N=48/);
    assert.match(result.log,/POISSON/);
    assert.match(result.log,/FLUX/);
    assert.ok(result.pageWidth<=width+8,'mobile main content overflow: '+result.pageWidth);
    // Never mistake GPU pixel prediction for actual animation acceptance.
    console.log('FCG6 '+width+'px: 48x48 edited solver, real GPU nine pixels, Neumann logs and opaque sandbox: PASS');
    if(width===1280){
      // Change the actual learner JS through the shared G2 controls. There must
      // be no second display-only shape or motion model.
      await evaluate(`(() => {
        const edits=[['shape','rectangle'],['centerY','0.55'],
          ['wallAmplitude','0.12'],['wallFrequency','2.2']];
        for(const [name,value] of edits){
          const control=document.getElementById('parameter-'+name);
          if(!control||control.disabled)throw Error('FCG6 control unavailable: '+name);
          control.value=value;
          control.dispatchEvent(new Event('input',{bubbles:true}));
        }
        document.getElementById('parameter-wallFrequency')
          .dispatchEvent(new Event('change',{bubbles:true}));
      })()`);
      await waitFor('document.querySelector("#status")?.textContent.includes("FCG6 編集した形状・壁運動の独立CPU画素検算に合格")',90000);
      const changed=await evaluate('({js:document.querySelector("#js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(x=>x.textContent)),log:document.querySelector("#diagnostics").textContent,summary:document.querySelector("#numeric-note").textContent})');
      assert.match(changed.js,/shape='rectangle',centerY=0.55/);
      assert.match(changed.js,/wallAmplitude=0.12,wallFrequency=2.2/);
      assert.ok(changed.rows.length===9&&changed.rows.every(r=>r[4]==='OK'),
        'source-linked GPU and rectangle independent CPU pixels');
      assert.match(changed.log,/staircase rectangle mask/);
      assert.match(changed.summary,/独立CPU/);
      // Unsupported source expressions may still run, but should disable the
      // corresponding GUI rather than replace an arbitrary learner expression.
      await evaluate(`(() => {
        const source=document.getElementById('js-source');
        source.value=source.value.replace("shape='rectangle'","shape=['rectangle'][0]");
        source.dispatchEvent(new Event('input',{bubbles:true}));
      })()`);
      assert.equal(await evaluate('document.getElementById("parameter-shape").disabled'),true);
      await click('reset');
      await waitFor('document.querySelector("#js-source")?.value.includes("shape=\\'circle\\'")');
      assert.equal(await evaluate('document.getElementById("parameter-shape").disabled'),false);
      console.log('FCG6 1280px: edited shape/wall controls, GPU/independent CPU, invalid-source guard and reset: PASS');
    }
  }

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
  catch(error){console.warn('FCG6 profile cleanup: '+error.message);}
}

