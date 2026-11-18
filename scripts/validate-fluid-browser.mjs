// Real Chromium acceptance of the published FLUID Python source and Pyodide worker.
// Run after "npm run validate:pages" builds _site. No browser mocks.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,writeFile,rm,mkdir,mkdtemp} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';

const root=path.resolve('_site');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium',
  '/usr/bin/chromium-browser','/opt/google/chrome/chrome'].find(p=>p&&existsSync(p));
assert.ok(chrome,'Real Chromium is required for FLUID browser acceptance');
const mime=p=>p.endsWith('.html')?'text/html; charset=utf-8':
  /\.(mjs|js)$/.test(p)?'text/javascript; charset=utf-8':
  p.endsWith('.css')?'text/css; charset=utf-8':
  p.endsWith('.svg')?'image/svg+xml':'text/plain; charset=utf-8';
const server=createServer(async(req,res)=>{
  try{
    const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(root,'.'+name);
    if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const data=await readFile(file);
    res.writeHead(200,{'content-type':mime(name),'cache-control':'no-store'}).end(data);
  }catch(e){res.writeHead(404).end(String(e.message));}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port;
const profile=await mkdtemp(path.join(tmpdir(),'fluid-closeout-'));
const browser=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage',
  '--no-first-run','--disable-extensions','--remote-allow-origins=*',
  '--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws;
try{
  let port;
  for(let i=0;i<300;i++){
    if(browser.exitCode!==null)throw Error('Chromium exited: '+browser.exitCode);
    try{port=Number((await readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(port,'CDP port unavailable');
  let target;
  for(let i=0;i<100;i++){
    const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
    target=tabs.find(t=>t.type==='page');
    if(target)break;
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(target,'browser page target unavailable');
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok,fail)=>{ws.addEventListener('open',ok,{once:true});ws.addEventListener('error',fail,{once:true});});
  const pending=new Map(),exceptions=[];let seq=0;
  ws.addEventListener('message',e=>{
    const msg=JSON.parse(e.data);
    if(msg.method==='Runtime.exceptionThrown')exceptions.push(JSON.stringify(msg.params).slice(0,500));
    const job=pending.get(msg.id);if(!job)return;pending.delete(msg.id);
    msg.error?job.fail(Error(msg.error.message)):job.ok(msg.result);
  });
  const cdp=(method,params={})=>new Promise((ok,fail)=>{
    const id=++seq;pending.set(id,{ok,fail});ws.send(JSON.stringify({id,method,params}));
  });
  const js=async expr=>{
    const v=await cdp('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});
    if(v.exceptionDetails)throw Error('Browser JS error: '+JSON.stringify(v.exceptionDetails).slice(0,1000));
    return v.result?.value;
  };
  const poll=async (expr,timeout=150000)=>{
    const end=Date.now()+timeout;
    while(Date.now()<end){
      let result=await js(expr);
      if(result)return result;
      await new Promise(ok=>setTimeout(ok,250));
    }
    throw Error('Browser timeout: '+expr+' exceptions '+JSON.stringify(exceptions.slice(-3)));
  };
  await cdp('Runtime.enable');await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1120,height:900,deviceScaleFactor:1,mobile:false});
  async function visit(n){
    exceptions.length=0;
    const route='#/textbook/volumes/dream_thater/物理系/FLUID/FLUID'+n+'/index';
    await cdp('Page.navigate',{url:origin+'/index.html'+encodeURI(route)});
    await poll('Boolean(document.querySelector(".numerical-file-lab[data-lab-id^=FLUID'+n+'-]"))',60000);
    const stat=await js('({labs:document.querySelectorAll(".numerical-file-lab").length,tabs:[...document.querySelector(".numerical-file-lab").querySelectorAll("[role=tab]")].map(e=>e.textContent),fallback:document.querySelector(".markdown-section").textContent.length})');
    assert.ok(stat.labs>=1,'missing FLUID'+n+' browser file lab');
    assert.deepEqual(stat.tabs,['実験条件','Python ソース','実行結果']);
    assert.ok(stat.fallback>200,'FLUID'+n+' missing independent static explanation');
    console.log('PASS FLUID'+n+' mounted, 3 tabs, static mathematical explanation');
  }
  async function run(args,timeout=180000){
    const selector='.numerical-file-lab';
    await js('(()=>{const p=document.querySelector('+JSON.stringify(selector)+');p.querySelector(".numerical-file-args").value='+JSON.stringify(args)+';p.querySelector(".numerical-lab-run").click();})()');
    const reply=await poll('(()=>{const p=document.querySelector('+JSON.stringify(selector)+');const s=p?.querySelector(".numerical-lab-status");if(!s)return null;const result={status:s.textContent,kind:s.dataset.kind,output:p.querySelector(".numerical-lab-output").textContent,plots:p.querySelectorAll(".numerical-file-plot svg").length};return s.dataset.kind==="success"||s.dataset.kind==="error"?result:null})()',timeout);
    assert.equal(reply.kind,'success','Python worker failure: '+reply.status+' '+reply.output.slice(-1800));
    assert.ok(reply.output.length>10,'empty browser Python result');
    return reply;
  }
  // All four representative models use the real source path and shared Pyodide worker.
  await visit(16);
  const laminar=await run('--case pipe --n 512 --plot');
  assert.ok(laminar.output.includes('integral')||laminar.output.includes('quadrature')||laminar.output.includes('Q '));
  await visit(22);
  await run('--step 0.05 --eta-max 12');
  await visit(47);
  await run('--grid 12 --dt 0.01 --time 1 --re 20 --plot');
  await visit(48);
  const panel='.numerical-file-lab';
  await js('document.querySelector('+JSON.stringify(panel)+').querySelector("[data-tab=source]").click()');
  await poll('document.querySelector('+JSON.stringify(panel)+').querySelector(".numerical-lab-solution-code").textContent.includes("def star_state")',30000);
  const source=await js('document.querySelector('+JSON.stringify(panel)+').querySelector(".numerical-lab-solution-code").textContent');
  assert.ok(source.includes('def godunov_flux'),'actual source viewer must show published Python');
  const self=await run('--self-test');
  assert.ok(self.output.includes('"self_test": "passed"'),'actual Pyodide test result');
  const plot=await run('--grid 80 --time 0.15 --cfl 0.45 --plot');
  assert.equal(plot.plots,3,'browser renderer must show density/velocity/pressure SVGs');
  assert.ok(plot.output.includes('"global_balance_residual_rho_m_E"'));
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:780,deviceScaleFactor:1,mobile:true});
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const mobile=await js('({plotCount:document.querySelectorAll(".numerical-file-plot svg").length,labels:[...document.querySelectorAll(".numerical-file-plot svg")].map(e=>e.getAttribute("aria-label")),buttons:[...document.querySelectorAll(".numerical-file-lab [role=tab]")].map(e=>e.textContent),staticFallback:document.querySelector(".markdown-section").textContent.includes("0.76282")})');
  assert.equal(mobile.plotCount,3);
  assert.ok(mobile.labels.every(x=>x&&x.length>5));
  assert.deepEqual(mobile.buttons,['実験条件','Python ソース','実行結果']);
  assert.ok(mobile.staticFallback,'Sod position static fallback missing');
  await mkdir('_fluid_closeout_review',{recursive:true});
  const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  await writeFile('_fluid_closeout_review/fluid48-mobile.png',Buffer.from(shot.data,'base64'));
  assert.equal(exceptions.length,0,'main-thread browser exceptions');
  console.log(JSON.stringify({browser:'real Chromium + real Pyodide',fluent:['FLUID16','FLUID22','FLUID47','FLUID48'],shockSelfTest:'passed',plotCount:3,mobile:true,noWebGLStaticFallback:true}));
}finally{
  if(ws){try{ws.close();}catch{}}
  browser.kill('SIGKILL');
  server.close();
  await rm(profile,{recursive:true,force:true});
}
