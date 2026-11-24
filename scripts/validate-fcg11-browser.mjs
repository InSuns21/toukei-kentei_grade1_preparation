// FCG11 real Chromium regression: the *editable* WebGL2 scene must actually move.
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
assert.ok(chrome,'Chrome/Chromium required for FCG11 visual regression');
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
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG11';
const profile=await mkdtemp(join(tmpdir(),'fcg11-browser-'));
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
    throw Error('FCG11 wait expired: '+expression+'; '+JSON.stringify(
      await evaluate('({status:document.querySelector("#status")?.textContent,logs:document.querySelector("#diagnostics")?.textContent?.slice(-400)})'))+
      ' exceptions='+JSON.stringify(exceptions.slice(-2)));
  };
  await cdp('Runtime.enable');await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.deepEqual(await evaluate('([Number(document.querySelector("#width").value),Number(document.querySelector("#height").value)])'),[960,360]);
  const result=()=>evaluate('({source:document.getElementById("js-source").value,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)),logs:document.querySelector("#diagnostics").textContent,scene:document.querySelector("#scene-info").textContent,iframe:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  const check=async()=>{
    const s=await result();
    assert.ok(s.rows.length>=2&&s.rows.every(r=>r[4]==='OK'),JSON.stringify(s.rows));
    assert.equal(s.iframe,'allow-scripts');
    assert.match(s.logs,/PARTICLES.*t=/);
    return s;
  };
  const capture=async(name)=>{
    const position=await evaluate('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.x+window.scrollX,y:r.y+window.scrollY,width:r.width,height:r.height}})()');
    assert.ok(position.width>50&&position.height>50,JSON.stringify(position));
    const data=(await cdp('Page.captureScreenshot',{format:'png',clip:{...position,scale:1},captureBeyondViewport:true})).data;
    await mkdir('_wgl_browser_review',{recursive:true});
    await writeFile(join('_wgl_browser_review','fcg11-'+name+'.png'),Buffer.from(data,'base64'));
    return data;
  };
  await evaluate('document.getElementById("run").click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")');
  const initial=await check();
  assert.equal(initial.rows.length,5);
  assert.match(initial.scene,/解析水面/);
  const first=await capture('mixed-wave');
  // Playback must reuse the actual sandbox and visibly change GPU pixels.
  await evaluate('document.getElementById("fcg-time-reset").click()');
  await waitFor('document.getElementById("fcg-time-state").dataset.value==="0"');
  const zero=await capture('playback-zero');
  await evaluate('document.getElementById("fcg-time-step").click()');
  await waitFor('Number(document.getElementById("fcg-time-state").dataset.value)===0.05');
  await evaluate('document.getElementById("fcg-time-play").click()');
  await waitFor('Number(document.getElementById("fcg-time-state").dataset.value)>=0.35');
  await evaluate('document.getElementById("fcg-time-pause").click()');
  await waitFor('document.getElementById("fcg-time-state").dataset.playing==="false"');
  const paused=await evaluate('document.getElementById("fcg-time-state").dataset.value');
  assert.notEqual(zero,await capture('playback-paused'));
  await new Promise(ok=>setTimeout(ok,300));
  assert.equal(await evaluate('document.getElementById("fcg-time-state").dataset.value'),paused);
  await evaluate('document.getElementById("fcg-time-reset").click()');
  await waitFor('document.getElementById("fcg-time-state").dataset.value==="0"');
  assert.equal(zero,await capture('playback-reset'));
  const control=async(id,value,pattern)=>{
    await evaluate('document.getElementById("tab-conditions").click()');
    await evaluate('(()=>{const input=document.getElementById("parameter-'+id+'");input.value='+JSON.stringify(value)+';input.dispatchEvent(new Event("input",{bubbles:true}));input.dispatchEvent(new Event("change",{bubbles:true}));})()');
    await waitFor('document.querySelector("#status")?.textContent.includes("FCG11 変更粒子条件の独立画素検算に合格")');
    const s=await check();assert.match(s.source,pattern);return s;
  };
  await control('time','0.6',/const time=0.6;/);
  assert.notEqual(first,await capture('falling'));
  await control('time','0.4',/const time=0.4;/);
  const before=await capture('before-threshold');
  const none=await control('curvatureThreshold','3',/const curvatureThreshold=3;/);
  assert.match(none.logs,/spray=0; foam=0; bubbles=0/);
  assert.notEqual(before,await capture('no-emission'));
  await control('curvatureThreshold','0.8',/const curvatureThreshold=0.8;/);
  await control('radius','0.1',/const radius=0.1;/);
  assert.notEqual(before,await capture('larger-particles'));
  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:760,deviceScaleFactor:1,mobile:true});
  const narrow=await evaluate('({contentWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth,canvasWidth:document.querySelector("#canvas-slot iframe")?.getBoundingClientRect().width})');
  assert.ok(narrow.canvasWidth>50&&narrow.canvasWidth<=360,JSON.stringify(narrow));
  assert.ok(narrow.contentWidth<=narrow.windowWidth+2,JSON.stringify(narrow));
  await capture('mobile');
  console.log('FCG11 actual Chromium editable secondary particles, threshold, GPU readback and narrow layout: PASS');
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
  catch(error){console.warn('FCG11 browser profile cleanup: '+error.message);}
}
