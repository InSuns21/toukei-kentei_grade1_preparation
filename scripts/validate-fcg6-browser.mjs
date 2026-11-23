// Real Chromium WebGL2 acceptance: FCG6 actual edited 48x48 MAC solver.
// Initial nine GPU pixels must agree with independent graph-CG CPU oracle.
// Real Chromium/WebGL2 acceptance for FCG6 physics-grid rendering and sandbox.
// Tests actual shader compilation, texture upload, GPU readPixels and editable sources.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
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
  // Fix the 8-step observation so screenshot differences are caused by the
  // edited real computation grid, not elapsed animation frames.
  await cdp('Emulation.setEmulatedMedia',{
    features:[{name:'prefers-reduced-motion',value:'reduce'}]
  });
  const captureGPU=async()=>{
    const clip=await evaluate(`(() => {
      const frame=document.querySelector('#canvas-slot iframe');
      if(!frame)throw Error('missing opaque WebGL2 iframe');
      const r=frame.getBoundingClientRect();
      return {x:Math.floor(r.left+window.scrollX+2),
        y:Math.floor(r.top+window.scrollY+2),
        width:Math.floor(r.width-4),height:Math.floor(Math.min(r.height-15,(r.width-4)/3))};
    })()`);
    assert.ok(clip.width>=80&&clip.height>=20,'WebGL2 clip dimensions');
    const shot=await cdp('Page.captureScreenshot',{
      format:'png',captureBeyondViewport:true,clip:{...clip,scale:1}
    });
    const bytes=Buffer.from(shot.data,'base64');
    assert.ok(bytes.length>1000,'non-empty real GPU screenshot');
    return createHash('sha256').update(bytes).digest('hex');
  };

  let initialGPU;
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
    const box=await evaluate('(() => {const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height};})()');
    assert.ok(box.width>80&&box.height>20,'real result iframe is visible');
    assert.ok(box.left>=-2&&box.right<=width+8,'GPU canvas horizontal overflow: '+JSON.stringify(box));
    if(width===1280)initialGPU=await captureGPU();
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
      await waitFor('document.getElementById("parameter-shape")?.value==="circle"');
      assert.equal(await evaluate('document.getElementById("parameter-shape").disabled'),false);
      // The three grids are now learner-facing controls, not a test-only source
      // substitution. Each one must rerun the same solid.js/WebGL2 pipeline.
      for(const n of [32,64,48]){
        await evaluate(`(() => {
          const slider=document.getElementById('parameter-grid');
          if(!slider||slider.disabled)throw Error('grid control unavailable');
          slider.value=${n};
          slider.dispatchEvent(new Event('input',{bubbles:true}));
          slider.dispatchEvent(new Event('change',{bubbles:true}));
        })()`);
        await waitFor('document.querySelector("#status")?.textContent.includes("FCG6 編集した形状・壁運動の独立CPU画素検算に合格") || (document.querySelector("#status")?.textContent.includes("初期ソースの独立画素検算に合格") && document.getElementById("parameter-grid")?.value==="48")',90000);
        const state=await evaluate('({js:document.querySelector("#js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(x=>x.textContent)),scene:document.querySelector("#scene-info").textContent,log:document.querySelector("#diagnostics").textContent,grid:document.getElementById("parameter-grid").value})');
        assert.match(state.js,new RegExp('const N='+n+',h=1/N'));
        assert.equal(state.grid,String(n));
        assert.equal(state.rows.length,9,'independent GPU samples for N='+n);
        assert.ok(state.rows.every(r=>r[4]==='OK'),'actual N='+n+' GPU versus graph CG');
        assert.match(state.log,new RegExp('MODEL.*N='+n));
        assert.ok(state.scene.includes(n+'×'+n),'actual grid legend N='+n);
        const hash=await captureGPU();
        if(n!==48)assert.notEqual(hash,initialGPU,'grid must change real GPU image N='+n);
        console.log('FCG6 R2 real GPU N='+n+' grid, independent graph-CG pixels and deterministic screenshot SHA256='+hash);
      }
      // Unknown learner expressions remain runnable but must not be accepted
      // as a verified source-linked grid nor be overwritten by the GUI.
      await evaluate(`(() => {
        const src=document.getElementById('js-source');
        src.value=src.value.replace('const N=48,h=1/N','const N=32+0,h=1/N');
        src.dispatchEvent(new Event('input',{bubbles:true}));
      })()`);
      assert.equal(await evaluate('document.getElementById("parameter-grid").disabled'),true);
      await click('reset');
      await waitFor('document.getElementById("parameter-grid")?.value==="48"');
      assert.equal(await evaluate('document.getElementById("parameter-grid").disabled'),false);

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

