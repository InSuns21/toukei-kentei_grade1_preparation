// FCG14 real Chromium regression: the *editable* WebGL2 scene must actually move.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path,{join} from 'node:path';

const root=join(process.cwd(),'_site');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium',
  '/usr/bin/chromium-browser','/opt/google/chrome/chrome'].find(p=>p&&existsSync(p));
assert.ok(chrome,'Chrome/Chromium required for FCG14 visual regression');
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
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG14';
const profile=await mkdtemp(join(tmpdir(),'fcg14-browser-'));
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
    throw Error('FCG14 wait expired: '+expression+'; '+JSON.stringify(
      await evaluate('({status:document.querySelector("#status")?.textContent,logs:document.querySelector("#diagnostics")?.textContent?.slice(-400)})'))+
      ' exceptions='+JSON.stringify(exceptions.slice(-2)));
  };
  await cdp('Runtime.enable');await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.deepEqual(await evaluate('([Number(document.querySelector("#width").value),Number(document.querySelector("#height").value)])'),[960,480]);
  const result=()=>evaluate('({source:document.getElementById("js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)),logs:document.querySelector("#diagnostics").textContent,scene:document.querySelector("#scene-info").textContent,iframe:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  const check=async()=>{
    const s=await result();
    assert.ok(s.rows.length>=2&&s.rows.every(r=>r[4]==='OK'),JSON.stringify(s.rows));
    assert.equal(s.iframe,'allow-scripts');
    assert.match(s.logs,/TIME.*t=1 s, N=/);
    return s;
  };
  const capture=async(name)=>{
    const position=await evaluate('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.x+window.scrollX,y:r.y+window.scrollY,width:r.width,height:r.height}})()');
    assert.ok(position.width>50&&position.height>50,JSON.stringify(position));
    const data=(await cdp('Page.captureScreenshot',{format:'png',clip:{...position,scale:1},captureBeyondViewport:true})).data;
    await mkdir('_wgl_browser_review',{recursive:true});
    await writeFile(join('_wgl_browser_review','fcg14-'+name+'.png'),Buffer.from(data,'base64'));
    return data;
  };
  await evaluate('document.getElementById("run").click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")');
  const initial=await check();
  assert.ok(await evaluate('document.querySelector("#panel-result #fcg-output-parameters #lab-parameters") && document.querySelectorAll("#lab-parameters").length===1 && document.getElementById("parameter-buoyancy").getBoundingClientRect().width>40'));
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="false"');
  assert.ok(initial.rows.length>=4);
  assert.match(initial.scene,/1 m四方/);
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)===1');
  assert.match(await evaluate('document.getElementById("fcg14-live-state").textContent'),/煙収支誤差.*熱収支誤差/);
  const first=await capture('coupled');
  await evaluate('document.getElementById("fcg14-step").click()');
  await waitFor('Math.abs(Number(document.getElementById("fcg14-live-state").dataset.time)-1.025)<1e-9');
  assert.notEqual(first,await capture('step'));
  await evaluate('document.getElementById("fcg14-play").click()');
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)>=1.1');
  await evaluate('document.getElementById("fcg14-pause").click()');
  await waitFor('document.getElementById("fcg14-live-state").textContent.includes("停止中")');
  const paused=await evaluate('document.getElementById("fcg14-live-state").dataset.time');
  await new Promise(ok=>setTimeout(ok,350));
  assert.equal(await evaluate('document.getElementById("fcg14-live-state").dataset.time'),paused);
  await evaluate('document.getElementById("fcg14-play").click()');
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)>=4-1e-9',90000);
  const late=await capture('coupled-4s');
  assert.notEqual(first,late);
  await evaluate('document.getElementById("fcg14-reset").click()');
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)===0');
  assert.notEqual(first,await capture('reset'));
  const control=async(id,value,pattern)=>{
    assert.ok(await evaluate('document.querySelector("#panel-result #fcg-output-parameters #lab-parameters") && !document.getElementById("panel-result").hidden'));
    await evaluate('(()=>{const input=document.getElementById("parameter-'+id+'");input.value='+JSON.stringify(value)+';input.dispatchEvent(new Event("input",{bubbles:true}));input.dispatchEvent(new Event("change",{bubbles:true}));})()');
    await waitFor('document.querySelector("#status")?.textContent.includes("FCG14 煙・温度の独立画素検算に合格")');
    const s=await check();assert.match(s.source,pattern);return s;
  };
  await control('buoyancy','0',/const buoyancy=0;/);
  const noBuoyancy=await capture('no-buoyancy');
  await evaluate('document.getElementById("fcg14-play").click()');
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)>=4-1e-9',90000);
  assert.notEqual(late,await capture('no-buoyancy-4s'));
  await control('heatSource','0',/const heatSource=0;/);
  assert.notEqual(noBuoyancy,await capture('cold-smoke'));
  await control('smokeSource','0',/const smokeSource=0;/);
  assert.notEqual(noBuoyancy,await capture('no-smoke'));
  await control('N','32',/const N=32;/);
  await control('heatSource','3',/const heatSource=3;/);
  await control('buoyancy','0.03',/const buoyancy=0.03;/);
  await control('smokeSource','1',/const smokeSource=1;/);
  // Normal motion: explicit Run starts the same smoke solver; changing a
  // source-linked parameter during playback rebuilds and resumes it.
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await evaluate('document.getElementById("run").click()');
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="true" && Number(document.getElementById("fcg14-live-state").dataset.time)>1');
  await control('buoyancy','0.04',/const buoyancy=0.04;/);
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="true" && Number(document.getElementById("fcg14-live-state").dataset.time)>1');
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="false"');
  await evaluate('document.getElementById("fcg14-play").click()');
  await waitFor('Number(document.getElementById("fcg14-live-state").dataset.time)>=4-1e-9',90000);
  await evaluate('document.getElementById("fcg14-play").click()');
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="true" && Number(document.getElementById("fcg14-live-state").dataset.time)<1');
  await evaluate('document.getElementById("fcg14-pause").click()');
  await waitFor('document.getElementById("fcg14-live-state").dataset.playing==="false"');
  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:760,deviceScaleFactor:1,mobile:true});
  const narrow=await evaluate('({contentWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth,canvasWidth:document.querySelector("#canvas-slot iframe")?.getBoundingClientRect().width})');
  assert.ok(narrow.canvasWidth>50&&narrow.canvasWidth<=360,JSON.stringify(narrow));
  assert.ok(narrow.contentWidth<=narrow.windowWidth+2,JSON.stringify(narrow));
  assert.ok(await evaluate('(()=>{const d=document.getElementById("fcg-output-parameters").getBoundingClientRect(),g=document.getElementById("canvas-slot").getBoundingClientRect();return d.top>=g.bottom-2&&d.width<=innerWidth&&document.getElementById("parameter-buoyancy").getBoundingClientRect().width>40})()'));
  await capture('mobile');
  console.log('FCG14 actual Chromium editable smoke, buoyancy, sources, playback, GPU readback and narrow layout: PASS');
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
  catch(error){console.warn('FCG14 browser profile cleanup: '+error.message);}
}
