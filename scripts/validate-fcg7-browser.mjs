// FCG7 real Chromium regression: the *editable* WebGL2 scene must actually move.
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
assert.ok(chrome,'Chrome/Chromium required for FCG7 visual regression');
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
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html?lesson=FCG7';
const profile=await mkdtemp(join(tmpdir(),'fcg7-browser-'));
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
    throw Error('FCG7 wait expired: '+expression+'; '+JSON.stringify(
      await evaluate('({status:document.querySelector("#status")?.textContent,logs:document.querySelector("#diagnostics")?.textContent?.slice(-400)})'))+
      ' exceptions='+JSON.stringify(exceptions.slice(-2)));
  };
  await cdp('Runtime.enable');await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  await evaluate('document.getElementById("run").click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("独立画素検算に合格")');
  assert.ok(await evaluate('document.querySelector("#panel-result #fcg-output-parameters #lab-parameters") && document.querySelectorAll("#lab-parameters").length===1 && document.getElementById("parameter-flip-mix").getBoundingClientRect().width>40'));
  await evaluate('document.getElementById("fcg7-reset").click()');
  await waitFor('document.querySelector("#lab-actions output")?.textContent.includes("step 0/24")');
  await evaluate('document.getElementById("fcg7-step").click()');
  await waitFor('document.querySelector("#lab-actions output")?.textContent.includes("step 1/24")');
  await evaluate('(()=>{const e=document.getElementById("parameter-flip-mix");e.value="0";e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await waitFor('document.querySelector("#status")?.textContent.includes("編集コードを実行しました") && document.getElementById("js-source").value.includes("const flipMix=0;")');
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")'),'allow-scripts');
  await evaluate('document.getElementById("tab-conditions").click()');
  assert.ok(await evaluate('document.querySelector("#panel-conditions #lab-parameters") && document.getElementById("parameter-flip-mix").value==="0"'));
  await evaluate('document.getElementById("tab-result").click()');
  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:760,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluate('(()=>{const d=document.getElementById("fcg-output-parameters").getBoundingClientRect(),g=document.getElementById("canvas-slot").getBoundingClientRect();return d.top>=g.bottom-2&&d.width<=innerWidth&&document.getElementById("parameter-flip-mix").getBoundingClientRect().width>40})()'));
  console.log('FCG7 actual sandbox, playback steps, source-linked output dock and narrow layout: PASS');
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
  catch(error){console.warn('FCG7 browser profile cleanup: '+error.message);}
}
