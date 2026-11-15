// Live browser acceptance: WebGL2 shader compile, GPU pixel readback,
// editable GLSL, diagnostics, opaque iframe, stop and resize.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile,mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path,{join} from 'node:path';

const root=join(process.cwd(),'_site');
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium',
  '/usr/bin/chromium-browser','/opt/google/chrome/chrome'].find(x=>x&&existsSync(x));
assert.ok(chrome,'Chromium/Chrome required for WGL1 acceptance');
const mime=p=>p.endsWith('.html')?'text/html; charset=utf-8':
  p.endsWith('.css')?'text/css; charset=utf-8': /\.(?:mjs|js)$/.test(p)?
  'text/javascript; charset=utf-8':'text/plain; charset=utf-8';
const server=createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const file=path.resolve(root,'.'+pathname);
    if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const data=await readFile(file);
    res.writeHead(200,{'content-type':mime(file),'cache-control':'no-store'}).end(data);
  }catch(err){res.writeHead(404).end(String(err.message));}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const url='http://127.0.0.1:'+server.address().port+'/simulation/wgl-lab.html';
const profile=await mkdtemp(join(tmpdir(),'wgl-lab-browser-'));
const browser=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage',
  '--no-first-run','--disable-extensions','--enable-unsafe-swiftshader',
  '--use-gl=angle','--use-angle=swiftshader','--remote-allow-origins=*',
  '--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let ws;
try{
  let port;
  for(let attempt=0;attempt<300;attempt++){
    if(browser.exitCode!==null)throw Error('Chromium exited with '+browser.exitCode);
    try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(port,'No CDP port');
  let page;
  for(let attempt=0;attempt<100;attempt++){
    const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
    page=pages.find(item=>item.type==='page');
    if(page)break;
    await new Promise(ok=>setTimeout(ok,100));
  }
  assert.ok(page,'No browser page');
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok,fail)=>{
    ws.addEventListener('open',ok,{once:true});
    ws.addEventListener('error',fail,{once:true});
  });
  let counter=0;
  const pending=new Map(), exceptions=[];
  ws.addEventListener('message',event=>{
    const response=JSON.parse(event.data);
    if(response.method==='Runtime.exceptionThrown')
      exceptions.push(JSON.stringify(response.params).slice(0,800));
    const task=pending.get(response.id);if(!task)return;
    pending.delete(response.id);
    response.error?task.reject(Error(response.error.message)):task.resolve(response.result);
  });
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++counter;pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  const evalJS=async expression=>{
    const response=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(response.exceptionDetails)throw Error('Chromium JS exception: '+JSON.stringify(response.exceptionDetails).slice(0,1000));
    return response.result?.value;
  };
  const waitFor=async(expression,limit=15000)=>{
    const end=Date.now()+limit;
    while(Date.now()<end){
      if(await evalJS(expression))return;
      await new Promise(ok=>setTimeout(ok,100));
    }
    throw Error('Browser timed out: '+expression+' exceptions='+JSON.stringify(exceptions.slice(-2)));
  };
  const click=id=>evalJS('document.getElementById('+JSON.stringify(id)+').click()');
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1000,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.equal(await evalJS('document.querySelectorAll("[role=tabpanel]").length'),3);
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.drawArrays")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const first=await evalJS('({result:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox"),opaque:(()=>{try{return !!document.querySelector("#canvas-slot iframe").contentWindow.document.body}catch{return true}})()})');
  assert.equal(first.sandbox,'allow-scripts');
  assert.equal(first.opaque,true,'child frame must have opaque origin');
  assert.equal(first.result.length,2);
  assert.ok(first.result.every(row=>row[4]==='OK'));
  assert.match(first.result[0][2],/255, 12[78], 0, 255/);
  assert.match(first.result[1][2],/0, 0, 0, 255/);
  assert.match(first.log,/DRAW/);
  assert.match(first.log,/GL error: 0x0/);
  console.log('WGL1 GPU draw, shader compile, readPixels, CPU reference and opaque iframe: PASS');
  await mkdir('_wgl_browser_review',{recursive:true});
  const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl1-initial.png',Buffer.from(shot.data,'base64'));

  await evalJS('(()=>{const e=document.getElementById("fragment-source");e.value=e.value.replace("vec4(1.0, 0.5, 0.0, 1.0)","vec4(0.0, 1.0, 0.0, 1.0)");})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const recolor=await evalJS('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent');
  assert.match(recolor,/0, 255, 0, 255/);
  console.log('WGL1 GLSL editing changes actual GPU pixels: PASS');

  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  console.log('WGL1 invalid GLSL stage error: PASS');
  await click('reset');
  await evalJS('(()=>{document.getElementById("width").value="640";document.getElementById("height").value="360";})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  assert.match(await evalJS('document.querySelector("#results-table tbody tr:first-child td").textContent'),/320, 180/);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL1 resize and stop/disposal: PASS');

  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:2,mobile:true});
  const mobile=await evalJS('({editorWidth:document.getElementById("js-source").getBoundingClientRect().width,pageWidth:document.querySelector("main").getBoundingClientRect().width,tabs:[...document.querySelectorAll("[role=tab]")].length})');
  assert.equal(mobile.tabs,3);
  assert.ok(mobile.editorWidth<=mobile.pageWidth+1);
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  console.log('WGL1 narrow 360px and reduced motion: PASS');
  assert.deepEqual(exceptions,[]);
}finally{
  try{ws?.close();}catch{}
  browser.kill('SIGKILL');
  await new Promise(ok=>server.close(ok));
  await rm(profile,{recursive:true,force:true});
}
