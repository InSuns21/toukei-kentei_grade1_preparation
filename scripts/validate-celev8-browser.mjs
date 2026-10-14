// Browser acceptance for CELEV8: actual Pyodide worker, Newton and variational.
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createServer} from "node:http";
import {readFile,mkdtemp,rm} from "node:fs/promises";
import {existsSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
const root=path.join(process.cwd(),"_site");
const chrome=[process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/chromium",
  "/usr/bin/chromium-browser","/opt/google/chrome/chrome"].find(x=>x&&existsSync(x));
if(!chrome) throw new Error("Chromium required");
const server=createServer(async(req,res)=>{
 try {
  const name=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const filename=path.resolve(root,"."+name);
  if(!filename.startsWith(root+path.sep))throw new Error("outside site");
  const data=await readFile(filename);
  const mime=/\.html$/.test(name)?"text/html":/\.m?js$/.test(name)?"text/javascript":
    /\.css$/.test(name)?"text/css":"text/plain";
  res.writeHead(200,{"content-type":mime});res.end(data);
 }catch(e){res.writeHead(404);res.end(String(e.message));}
});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
const url="http://127.0.0.1:"+server.address().port+"/simulation/celev8.html";
const profile=await mkdtemp(path.join(tmpdir(),"celev8-browser-"));
const browser=spawn(chrome,["--headless=new","--no-sandbox","--disable-gpu",
 "--disable-dev-shm-usage","--remote-allow-origins=*","--remote-debugging-port=0",
 "--user-data-dir="+profile,url],{stdio:"ignore"});
let ws=null;
try {
 let port=0;
 for(let i=0;i<150;i++){
  try{port=Number((await readFile(path.join(profile,"DevToolsActivePort"),"utf8")).split("\n")[0]);if(port)break;}catch{}
  await new Promise(r=>setTimeout(r,100));
 }
 assert.ok(port,"no DevTools port");
 let tab;
 for(let i=0;i<150;i++){
  const tabs=await(await fetch("http://127.0.0.1:"+port+"/json/list")).json();
  tab=tabs.find(x=>x.type==="page"&&x.url.startsWith(url));
  if(tab)break;
  await new Promise(r=>setTimeout(r,100));
 }
 assert.ok(tab,"no CELEV8 tab");
 ws=new WebSocket(tab.webSocketDebuggerUrl);
 await new Promise((ok,err)=>{ws.addEventListener("open",ok,{once:true});ws.addEventListener("error",err,{once:true});});
 let seq=0;const pending=new Map(),errors=[];
 ws.addEventListener("message",ev=>{
  const x=JSON.parse(ev.data);
  if(x.method==="Runtime.exceptionThrown")errors.push(JSON.stringify(x.params).slice(0,400));
  const p=pending.get(x.id);if(!p)return;pending.delete(x.id);
  if(x.error)p.reject(new Error(x.error.message));else p.resolve(x.result);
 });
 const cmd=(method,params={})=>new Promise((resolve,reject)=>{
  const id=++seq;pending.set(id,{resolve,reject});
  ws.send(JSON.stringify({id,method,params}));
 });
 const evalJS=async expression=>{
  const x=await cmd("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
  if(x.exceptionDetails)throw new Error(JSON.stringify(x.exceptionDetails));
  return x.result?.value;
 };
 const poll=async(expression,limit=120000)=>{
  const until=Date.now()+limit;
  while(Date.now()<until){
   if(await evalJS(expression))return;
   const status=await evalJS('document.querySelector("#status")?.textContent||""');
   if(/ENGINE_ERROR|COLLISION|Worker error|runtime failed|kernel unavailable|Error/i.test(status))
    throw new Error("CELEV8 worker: "+status);
   await new Promise(r=>setTimeout(r,500));
  }
  throw new Error("CELEV8 timeout: "+expression+" / "+await evalJS('document.querySelector("#status")?.textContent'));
 };
 const value=name=>'Number([...document.querySelectorAll("#diagnostics tr")].find(x=>x.cells[0]?.textContent==="'+name+'")?.cells[1]?.textContent)';
 await cmd("Runtime.enable");await cmd("Page.enable");
 // The button can exist before the deferred module binds its click handler.
 // The document becomes "complete" only after module evaluation, so a click
 // here tests the real Pyodide worker instead of silently doing nothing.
 await poll('document.readyState === "complete" && Boolean(document.querySelector("#init"))',30000);
 await evalJS('document.querySelector("#orbit").value="two-body";document.querySelector("#init").click()');
 await poll('document.querySelector("#status")?.textContent.includes("Python積分完了")');
 assert.ok(Math.abs(await evalJS(value("energy"))+0.5)<1e-9);
 await evalJS('document.querySelector("#batch").click()');
 await poll(value("累積計算ステップ/反復")+'===100',30000);
 await evalJS('document.querySelector("#mass").value="1.2";document.querySelector("#init").click()');
 await poll('Math.abs('+value("energy")+'+0.72)<0.00001',30000);
 await evalJS('document.querySelector("#mode").value="variational";document.querySelector("#mode").dispatchEvent(new Event("change"));document.querySelector("#N").value="24";document.querySelector("#init").click()');
 await poll('document.querySelector("#status")?.textContent.includes("Python変分探索完了")');
 const before=await evalJS(value("action"));
 assert.ok(Number.isFinite(before)&&before>0);
 await evalJS('document.querySelector("#batch").click()');
 await poll(value("累積計算ステップ/反復")+'===10',30000);
 const after=await evalJS(value("action"));
 assert.ok(after<=before+1e-8,"action increased: "+before+" -> "+after);
 assert.ok(Number.isFinite(await evalJS(value("newtonResidual"))));
 await evalJS('document.querySelector("#verify").click()');
 await poll('document.querySelector("#status")?.textContent.includes("変分候補の初期位置")',30000);
 assert.equal(await evalJS('document.querySelector("#orbit").value'),"candidate");
 await evalJS('document.querySelector("#batch").click()');
 await poll(value("累積計算ステップ/反復")+'===100',30000);
 assert.ok(Number.isFinite(await evalJS(value("closurePosition"))));
 assert.equal(errors.length,0,errors.join("; "));
 console.log(JSON.stringify({test:"celev8-python-real-browser",status:"PASS",
  initialEnergy:-0.5,massUpdateEnergy:-0.72,actionBefore:before,actionAfter:after,
  separateCandidateNewtonVerification:true}));
}finally{
 if(ws)ws.close();browser.kill("SIGKILL");server.close();
 await rm(profile,{recursive:true,force:true,maxRetries:20,retryDelay:150});
}
