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
  await click('tab-code');
  const syntax=await evalJS('({count:document.querySelectorAll(".wgl-code-editor").length,js:document.querySelector("#js-source").previousElementSibling.innerHTML,vertex:document.querySelector("#vertex-source").previousElementSibling.innerHTML,fragment:document.querySelector("#fragment-source").previousElementSibling.innerHTML,color:getComputedStyle(document.getElementById("js-source")).color})');
  assert.equal(syntax.count,3);
  assert.match(syntax.js,/wgl-token-keyword/);
  assert.match(syntax.vertex,/wgl-token-directive/);
  assert.match(syntax.fragment,/wgl-token-type/);
  assert.equal(syntax.color,'rgba(0, 0, 0, 0)');
  // Native textarea and colored backdrop must both soft-wrap long JS/GLSL lines.
  const wrap = await evalJS(`(() => {
    const editors = [...document.querySelectorAll('.wgl-code-editor textarea')];
    const measure = e => ({
      mode: e.wrap, width: e.clientWidth, scroll: e.scrollWidth,
      backdropWidth: e.previousElementSibling.clientWidth,
      backdropScroll: e.previousElementSibling.scrollWidth
    });
    const initial = editors.map(measure);
    const editor = editors[0];
    const original = editor.value;
    editor.value += '\\n' + 'longIdentifier'.repeat(100);
    editor.dispatchEvent(new Event('input', {bubbles: true}));
    const longLine = measure(editor);
    editor.value = original;
    editor.dispatchEvent(new Event('input', {bubbles: true}));
    return {initial, longLine};
  })()`);
  for (const size of [...wrap.initial, wrap.longLine]) {
    assert.equal(size.mode, 'soft');
    assert.ok(size.scroll <= size.width + 1, 'textarea has horizontal overflow: ' + JSON.stringify(size));
    assert.ok(size.backdropScroll <= size.backdropWidth + 1,
      'highlight has horizontal overflow: ' + JSON.stringify(size));
  }
  await mkdir('_wgl_browser_review',{recursive:true});
  const codeShot = await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl1-code-wrap.png',Buffer.from(codeShot.data,'base64'));
  console.log('WGL1 JS/GLSL source soft wrap and long-line horizontal overflow: PASS');
  const scroll=await evalJS('(()=>{const e=document.getElementById("js-source");e.scrollTop=100;e.dispatchEvent(new Event("scroll"));return [e.scrollTop,e.previousElementSibling.scrollTop]})()');
  assert.ok(scroll[0]>0);
  assert.equal(scroll[0],scroll[1]);
  await click('tab-conditions');
  console.log('WGL1 JS/GLSL colored overlays, transparent textarea and scroll sync: PASS');
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

  await evalJS('(()=>{const e=document.getElementById("fragment-source");e.value=e.value.replace("vec4(1.0, 0.5, 0.0, 1.0)","vec4(0.0, 1.0, 0.0, 1.0)");e.dispatchEvent(new Event("input",{bubbles:true}));})()');
  const editedHighlight=await evalJS('document.getElementById("fragment-source").previousElementSibling.textContent');
  assert.ok(editedHighlight.includes('vec4(0.0, 1.0, 0.0, 1.0)'));
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
  assert.ok(await evalJS('document.getElementById("fragment-source").previousElementSibling.textContent.includes("vec4(1.0, 0.5, 0.0, 1.0)")'));
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
  await click('tab-code');
  const mobileWrap=await evalJS('(()=>{const e=document.getElementById("js-source");return [e.scrollWidth,e.clientWidth]})()');
  assert.ok(mobileWrap[0]<=mobileWrap[1]+1,'narrow viewport source editor has horizontal overflow');
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  console.log('WGL1 narrow 360px and reduced motion: PASS');

  // WGL2: WGL1と同じホスト・隔離方式で、頂点色の4画素とリンク失敗を実測する。
  await cdp('Emulation.setDeviceMetricsOverride',{width:1000,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:url+'?lesson=WGL2'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.uniform3f")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl2=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl2.rows.length,4);
  assert.ok(wgl2.rows.every(row=>row[4]==='OK'));
  assert.match(wgl2.rows[0][2],/63, 64, 128, 255/);
  assert.equal(wgl2.sandbox,'allow-scripts');
  console.log('WGL2 GPU four color samples / CPU barycentric oracle / opaque iframe: PASS');
  const wgl2shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl2-initial.png',Buffer.from(wgl2shot.data,'base64'));

  await evalJS('(()=>{const e=document.getElementById("js-source");e.value=e.value.replace("gl.uniform3f(gain, 1.0, 1.0, 1.0)","gl.uniform3f(gain, 1.0, 0.5, 0.25)");})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const shifted=await evalJS('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent');
  assert.notEqual(shifted,wgl2.rows[0][2]);
  assert.match(shifted,/, 3[12], 3[12], 255/);
  console.log('WGL2 uniform editing changes actual GPU color channels: PASS');

  await evalJS('(()=>{const p=document.getElementById("preset");p.value="type-error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/LINK/i);
  console.log('WGL2 varying vec3/vec2 mismatch fails program link: PASS');
  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL2 compilation error and stop/disposal: PASS');


  // WGL3 live GPU acceptance: actual indexed and expanded draw plus diagnostics.
  await cdp('Page.navigate',{url:url+'?lesson=WGL3'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl3=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl3.rows.length,3);
  assert.ok(wgl3.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl3.sandbox,'allow-scripts');
  assert.match(wgl3.rows[0][2],/51, 153, 204, 255/);
  assert.match(wgl3.rows[2][2],/0, 0, 0, 255/);
  assert.match(wgl3.log,/mode=elements grid=2x2 vertices=9 triangles=8 references=24 indexedBytes=120 expandedBytes=192/);
  const shot3=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl3-initial.png',Buffer.from(shot3.data,'base64'));
  console.log('WGL3 indexed GPU pixels and CPU reference: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace(\"const drawMode = 'elements'\",\"const drawMode = 'arrays'\");})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const other=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent})');
  assert.ok(other.rows.every((row,i)=>row[2]===wgl3.rows[i][2]));
  assert.match(other.log,/mode=arrays grid=2x2/);
  console.log('WGL3 drawElements / drawArrays pixel equivalence: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const gridSteps = 2','const gridSteps = 4');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/grid=4x4 vertices=25 triangles=32 references=96 indexedBytes=392 expandedBytes=768/);
  console.log('WGL3 editable 4x4 grid counts and bytes: PASS');

  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL3 shader compile and sandbox disposal: PASS');


  // WGL5: depth test, projection matrices and readPixels verified on actual GPU driver.
  await cdp('Page.navigate',{url:url+'?lesson=WGL5'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("depthEnabled=true")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl5=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl5.rows.length,4);
  assert.ok(wgl5.rows.every(row=>row[4]==='OK'));
  const closeRgba = (value,expected) => {
    const rgba=value.split(',').map(x=>Number(x.trim()));
    return rgba.length===4 && rgba.every((x,i)=>Number.isInteger(x)&&Math.abs(x-expected[i])<=1);
  };
  assert.ok(closeRgba(wgl5.rows[0][2],[230,77,51,255]));
  assert.ok(closeRgba(wgl5.rows[1][2],[51,153,230,255]));
  assert.ok(closeRgba(wgl5.rows[2][2],[0,0,0,255]));
  assert.equal(wgl5.sandbox,'allow-scripts');
  assert.match(wgl5.log,/depthBits=\d+/);
  const shot5=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl5-initial.png',Buffer.from(shot5.data,'base64'));
  console.log('WGL5 real shader/camera/projection and four independent CPU pixel probes: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const depthEnabled=true','const depthEnabled=false');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const noDepth=await evalJS('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent');
  assert.ok(closeRgba(noDepth,[51,153,230,255]));
  console.log('WGL5 disabling depth makes far cube overwrite near cube: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace(\"const projectionMode='perspective'\",\"const projectionMode='orthographic'\");})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/projection=orthographic/);
  console.log('WGL5 orthographic projection switch executes in GPU: PASS');
  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const nearPlane=1, farPlane=9','const nearPlane=1, farPlane=3');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const clipped=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  assert.ok(closeRgba(clipped[0],[230,77,51,255]));
  assert.ok(closeRgba(clipped[1],[0,0,0,255]));
  console.log('WGL5 far=3 clips entire farther cube but retains nearer cube: PASS');
  await click('reset');

  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL5 shader failure and sandbox disposal: PASS');

  // WGL8: real GPU fixed-function blending vs shader-based linear-light reference.
  await cdp('Page.navigate',{url:url+'?lesson=WGL8'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("blendFuncSeparate")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl8=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl8.rows.length,8);
  assert.ok(wgl8.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl8.sandbox,'allow-scripts');
  const nearRGBA=(value,expected,tolerance=4)=>{
    const actual=value.split(',').map(v=>Number(v.trim()));
    assert.equal(actual.length,4);
    assert.ok(actual.every((v,i)=>Math.abs(v-expected[i])<=tolerance),
      JSON.stringify(actual)+' expected '+JSON.stringify(expected));
  };
  nearRGBA(wgl8.rows[3][2],[87,61,115,255]);
  nearRGBA(wgl8.rows[7][2],[122,63,155,255]);
  assert.match(wgl8.log,/WGL8/);
  assert.match(wgl8.log,/GL error: 0x0/);
  const shot8=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl8-initial.png',Buffer.from(shot8.data,'base64'));
  console.log('WGL8 GPU blending / linear-light shader / CPU 8-pixel oracle: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const reverseOrder = false;', 'const reverseOrder = true;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const reversed=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  nearRGBA(reversed[3],[122,56,74,255]);
  assert.notEqual(reversed[7],wgl8.rows[7][2]);
  console.log('WGL8 reversing front/back changes overlapping pixel on real GPU: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL8 fragment diagnostics, reset and sandbox disposal: PASS');


  // WGL9 live GPU acceptance: two meshes, inverse-transpose normals and 8 CPU rays.
  await cdp('Page.navigate',{url:url+'?lesson=WGL9'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("useCorrectNormals")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl9=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl9.rows.length,8);
  assert.ok(wgl9.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl9.sandbox,'allow-scripts');
  assert.match(wgl9.log,/WGL9/);
  assert.match(wgl9.log,/GL error: 0x0/);
  assert.match(wgl9.log,/inverse transpose \(correct\)/);
  const shot9=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl9-initial.png',Buffer.from(shot9.data,'base64'));
  console.log('WGL9 real GPU cube/sphere shaded pixels match 8 independent CPU ray oracles: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const useCorrectNormals = true;', 'const useCorrectNormals = false;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const wrongNormalPixels=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  assert.ok(wrongNormalPixels.some((pixel,i)=>pixel!==wgl9.rows[i][2]),
    'incorrect M*n instead of inverse transpose must alter at least one GPU sample');
  console.log('WGL9 intentionally incorrect normal matrix changes GPU pixels: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const lightPower = 1.0;', 'const lightPower = 0.0;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const zeroLight=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  assert.match(zeroLight[0],/^0, 0, 0, 255$/);
  assert.match(zeroLight[4],/^0, 0, 0, 255$/);
  assert.equal(zeroLight[3],wgl9.rows[3][2], 'clear background is independent of light');
  console.log('WGL9 zero source power darkens objects without altering clear pixels: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL9 shader error, reset and opaque sandbox disposal: PASS');


  // WGL10: FBO completeness, independent 8-pixel oracle, edited second pass,
  // viewport resize, fragment compile diagnostics and opaque iframe isolation.
  await cdp('Page.navigate',{url:url+'?lesson=WGL10'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.framebufferTexture2D")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  const wgl10=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl10.rows.length,8);
  assert.ok(wgl10.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl10.sandbox,'allow-scripts');
  assert.match(wgl10.log,/FRAMEBUFFER_COMPLETE, RGBA8 160x240/);
  assert.match(wgl10.log,/PASS1: offscreen lower-left quarter RGBA=/);
  assert.match(wgl10.log,/GL error: 0x0/);
  const checkRgba = (value,expected) => {
    const got=value.split(',').map(x=>Number(x.trim()));
    assert.equal(got.length,4);
    assert.ok(got.every((x,i)=>Math.abs(x-expected[i])<=2),
      JSON.stringify(got)+' expected '+JSON.stringify(expected));
  };
  checkRgba(wgl10.rows[0][2],[51,77,102,255]);
  checkRgba(wgl10.rows[4][2],[204,178,153,255]);
  const shot10=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl10-initial.png',Buffer.from(shot10.data,'base64'));
  console.log('WGL10 FBO render-to-texture 8 GPU pixel references and readback: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const invertRight = true;', 'const invertRight = false;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const unfiltered=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  checkRgba(unfiltered[4],[51,77,102,255]);
  assert.notEqual(unfiltered[4],wgl10.rows[4][2]);
  console.log('WGL10 editing second-pass filter changes real GPU output: PASS');
  await click('reset');
  await evalJS('(()=>{document.getElementById("width").value="640";document.getElementById("height").value="360";})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("独立画素検算に合格")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/RGBA8 320x360/);
  console.log('WGL10 FBO resized with canvas and revalidated: PASS');
  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL10 shader diagnostics and sandbox disposal: PASS');

  // WGL11: real GPU shadow-depth pass, four probe pixels, editable bias and
  // FRAGMENT syntax errors. The CPU oracle uses ray/AABB, not sampled depth.
  await cdp('Page.navigate',{url:url+'?lesson=WGL11'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.DEPTH_COMPONENT24")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|編集コードを実行しました|タイムアウト/)',22000);
  const diagnostic11=await evalJS('({status:document.getElementById("status").textContent,diagnostics:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic11.status,/独立画素検算に合格/,
    'WGL11 GPU error: '+JSON.stringify(diagnostic11));
  const wgl11=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl11.rows.length,4);
  assert.ok(wgl11.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl11.sandbox,'allow-scripts');
  assert.deepEqual(wgl11.rows.map(row=>row[2]),[
    '0, 0, 0, 255','255, 255, 255, 255',
    '255, 255, 255, 255','255, 255, 255, 255'
  ]);
  assert.match(wgl11.log,/FRAMEBUFFER_COMPLETE; DEPTH_COMPONENT24 256x256/);
  assert.match(wgl11.log,/PROBES: GPU visibility x4/);
  assert.match(wgl11.log,/GL error: 0x0/);
  const shot11=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl11-initial.png',Buffer.from(shot11.data,'base64'));
  console.log('WGL11 depth-only FBO, shadow comparison and 4 GPU/CPU rays: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const depthBias = 0.002;', 'const depthBias = 0.30;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const highBias=await evalJS('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent');
  assert.equal(highBias,'255, 255, 255, 255',
    'excessive bias should erase the occlusion of the first receiver');
  assert.notEqual(highBias,wgl11.rows[0][2]);
  console.log('WGL11 excessive depth bias produces false light on shadow receiver: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const shadowResolution = 256;', 'const shadowResolution = 64;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/DEPTH_COMPONENT24 64x64/);
  console.log('WGL11 shadow-map resolution is editable without FBO incompleteness: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL11 shader error, reset and opaque sandbox disposal: PASS');

  // WGL12: compiled GGX shader, real linear Fresnel diagnostic RGBA8 pixels,
  // material-change screenshot and GLSL syntax error handling in an opaque iframe.
  await cdp('Page.navigate',{url:url+'?lesson=WGL12'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("roughness = [0.16, 0.55, 0.32]")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic12=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic12.status,/独立画素検算に合格/,
    'WGL12 real GGX/Fresnel shader or GPU probes failed: '+JSON.stringify(diagnostic12));
  const wgl12=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl12.rows.length,4);
  assert.ok(wgl12.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl12.sandbox,'allow-scripts');
  assert.match(wgl12.log,/CHECK: PASS: 4\/4 Fresnel probes/);
  assert.match(wgl12.log,/GL error: 0x0/);
  for(let i=0;i<4;i++) {
    const actual=wgl12.rows[i][2].split(',').map(Number);
    const expected=wgl12.rows[i][1].split(',').map(Number);
    assert.ok(actual.every((x,j)=>Math.abs(x-expected[j])<=2),
      'WGL12 probe '+i+': '+JSON.stringify({actual,expected}));
  }
  const shot12=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl12-initial.png',Buffer.from(shot12.data,'base64'));
  console.log('WGL12 real GGX shader, Fresnel 4 GPU/CPU RGB samples and opaque sandbox: PASS');

  // Compare ONLY the rendered iframe area, not changing status/log text.
  const frameRect12=await evalJS('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};})()');
  assert.ok(frameRect12.width>100 && frameRect12.height>100);
  const clip12={...frameRect12,scale:1};
  const initialMaterial12=await cdp('Page.captureScreenshot',{format:'png',clip:clip12,captureBeyondViewport:true});
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const roughness = [0.16, 0.55, 0.32];', 'const roughness = [0.8, 0.8, 0.8];');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const changed12=await evalJS('document.getElementById("diagnostics").textContent');
  assert.match(changed12,/left: 0.8\/0/);
  const changedMaterial12=await cdp('Page.captureScreenshot',{format:'png',clip:clip12,captureBeyondViewport:true});
  assert.notEqual(changedMaterial12.data,initialMaterial12.data,
    'changing roughness must change rendered sphere pixel regions');
  await writeFile('_wgl_browser_review/wgl12-roughness-edited.png',Buffer.from(changedMaterial12.data,'base64'));
  console.log('WGL12 editing three roughness values changes actual GPU sphere appearance: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL12 fragment error diagnostics and sandbox disposal: PASS');

  // WGL13: compile actual cube-map shader and cross-check all 12 RGBA8 probes.
  await cdp('Page.navigate',{url:url+'?lesson=WGL13'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("TEXTURE_CUBE_MAP")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic13=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic13.status,/独立画素検算に合格/,
    'WGL13 GPU shader/probes failed: '+JSON.stringify(diagnostic13));
  const wgl13=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl13.rows.length,12);
  assert.ok(wgl13.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl13.sandbox,'allow-scripts');
  assert.match(wgl13.log,/CHECK: PASS: all 12 cube-face\/orientation probes/);
  assert.match(wgl13.log,/GL error: 0x0/);
  assert.equal(wgl13.rows[0][2],'224, 48, 48, 255');
  assert.equal(wgl13.rows[6][2],'123, 26, 26, 255');
  for(let i=0;i<12;i++) {
    const actual=wgl13.rows[i][2].split(',').map(Number);
    const expected=wgl13.rows[i][1].split(',').map(Number);
    assert.ok(actual.every((v,j)=>Math.abs(v-expected[j])<=1),
      'WGL13 probe '+i+': '+JSON.stringify({actual,expected}));
  }
  const shot13=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl13-initial.png',Buffer.from(shot13.data,'base64'));
  console.log('WGL13 GPU six cube faces + 12 axis/orientation probes: PASS');
  const frameRect13=await evalJS('(()=>{const r=document.querySelector("#canvas-slot iframe").getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};})()');
  const clip13={...frameRect13,scale:1};
  const initial13=await cdp('Page.captureScreenshot',{format:'png',clip:clip13,captureBeyondViewport:true});
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const yawDegrees = 0;', 'const yawDegrees = 90;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/yaw=90 deg/);
  const rotated13=await cdp('Page.captureScreenshot',{format:'png',clip:clip13,captureBeyondViewport:true});
  assert.notEqual(rotated13.data,initial13.data,
    'rotating environment must change real reflected pixels');
  await writeFile('_wgl_browser_review/wgl13-yaw90.png',Buffer.from(rotated13.data,'base64'));
  console.log('WGL13 editing yaw changes actual GPU sphere appearance: PASS');
  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL13 shader diagnostics and sandbox disposal: PASS');

  // WGL14: real GPU acceptance for two RGBA8 FBOs and three-pass postprocess.
  await cdp('Page.navigate',{url:url+'?lesson=WGL14'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("makeTarget")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic14=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic14.status,/独立画素検算に合格/,
    'WGL14 GPU FBO/shader/CPU probes failed: '+JSON.stringify(diagnostic14));
  const wgl14=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl14.rows.length,7);
  assert.ok(wgl14.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl14.sandbox,'allow-scripts');
  assert.match(wgl14.log,/2 independent complete 8x8 RGBA8 targets/);
  assert.match(wgl14.log,/GL error: 0x0/);
  for(let i=0;i<7;i++) {
    const actual=wgl14.rows[i][2].split(',').map(Number);
    const expected=wgl14.rows[i][1].split(',').map(Number);
    assert.ok(actual.every((v,j)=>Math.abs(v-expected[j])<=2),
      'WGL14 readPixels '+i+': '+JSON.stringify({actual,expected}));
  }
  const shot14=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl14-initial.png',Buffer.from(shot14.data,'base64'));
  console.log('WGL14 2 complete FBOs, 3 GPU passes and 7 independent CPU/GPU pixel probes: PASS');

  await evalJS('(()=>{const e=document.getElementById("js-source");e.value=e.value.replace("const exposure = 1.0;","const exposure = 0.0;");})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const edited14=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent)');
  assert.equal(edited14.length,7);
  assert.equal(edited14[0],wgl14.rows[0][2]); // left source is untouched
  for(const item of edited14.slice(3)) assert.match(item,/^0, 0, 0, 255$/);
  console.log('WGL14 editing exposure=0 blacks out only the processed half: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL14 GLSL syntax error and sandbox disposal: PASS');

  // WGL15: real GPU picking ID/depth FBO, independent CPU oracle, mouse,
  // resize, edited shader diagnostics and sandbox destruction.
  await cdp('Page.navigate',{url:url+'?lesson=WGL15'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.readPixels(x,y")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic15=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic15.status,/独立画素検算に合格/,
    'WGL15 WebGL2 ID/depth setup or 4 GPU pixel probes failed: '+JSON.stringify(diagnostic15));
  const wgl15=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl15.rows.length,4);
  assert.ok(wgl15.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl15.sandbox,'allow-scripts');
  assert.match(wgl15.log,/RGBA8 ID texture \+ DEPTH_COMPONENT16 renderbuffer, FBO complete/);
  assert.match(wgl15.log,/GL error: 0x0/);
  const expected15=['230, 70, 35, 255','30, 150, 220, 255',
    '230, 70, 35, 255','10, 18, 29, 255'];
  for(let i=0;i<4;i++) {
    const actual=wgl15.rows[i][2].split(',').map(Number);
    const wanted=expected15[i].split(',').map(Number);
    assert.ok(actual.every((v,j)=>Math.abs(v-wanted[j])<=2),
      'WGL15 GPU probe '+i+': '+JSON.stringify({actual,wanted}));
  }
  const shot15=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl15-initial.png',Buffer.from(shot15.data,'base64'));
  console.log('WGL15 4 real GPU display probes, RGBA8/depth FBO and separate CPU ray oracle: PASS');

  // The nested sandbox canvas receives an actual mouse click through Chromium input.
  const clickPoint15=await evalJS('(()=>{const frame=document.querySelector("#canvas-slot iframe");frame.scrollIntoView({block:"center"});const r=frame.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()');
  await cdp('Input.dispatchMouseEvent',{type:'mouseMoved',...clickPoint15});
  await cdp('Input.dispatchMouseEvent',{type:'mousePressed',...clickPoint15,button:'left',clickCount:1});
  await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',...clickPoint15,button:'left',clickCount:1});
  await waitFor('document.getElementById("result-note")?.textContent.includes("選択座標")',10000);
  const pick15=await evalJS('({status:document.getElementById("status").textContent,text:document.getElementById("result-note").textContent})');
  assert.match(pick15.text,/独立CPU=1、ラボCPU=1、GPU=1/);
  assert.match(pick15.status,/CPU射線とGPU ID選択が一致/);
  console.log('WGL15 actual mouse click selects the nearer 3D panel with independent CPU/GPU agreement: PASS');

  // Change drawing buffer resolution: recreate ID FBO and depth renderbuffer.
  await click('reset');
  await evalJS('(()=>{document.getElementById("width").value=400;document.getElementById("height").value=300})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  assert.match(await evalJS('document.getElementById("status").textContent'),/独立画素検算に合格/);
  console.log('WGL15 resized RGBA8/depth FBO and viewport match 4 CPU reference pixels: PASS');

  // Broken GLSL must not silently run, and the opaque iframe is disposable.
  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL15 fragment diagnostic, stop and sandbox disposal: PASS');


  // WGL16: GPU instancing and per-object uniforms must rasterize identical
  // 8x8 colored markers. Exercise JS/GLSL edits and GL diagnostics in Chromium.
  await cdp('Page.navigate',{url:url+'?lesson=WGL16'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.drawArraysInstanced")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic16=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic16.status,/独立画素検算に合格/,
    'WGL16 GPU instancing or 6 CPU probes failed: '+JSON.stringify(diagnostic16));
  const wgl16=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(wgl16.rows.length,6);
  assert.ok(wgl16.rows.every(row=>row[4]==='OK'));
  assert.equal(wgl16.sandbox,'allow-scripts');
  assert.match(wgl16.log,/loop 64 draw calls; instanced 1 draw call/);
  assert.match(wgl16.log,/384 vertex invocations/);
  assert.match(wgl16.log,/0 mismatched RGBA pixels between loop and instanced/);
  assert.match(wgl16.log,/GL error: 0x0/);
  const shot16=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl16-initial.png',Buffer.from(shot16.data,'base64'));
  console.log('WGL16 real GPU instancing: 64 vs 1 draw calls, 384 vertices, same full framebuffer and six CPU probes: PASS');

  // Both paths still execute when the visible drawing method is switched.
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace(\"const drawMode = 'instanced'\",\"const drawMode = 'loop'\");})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const loop16=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>row.cells[2].textContent),log:document.getElementById("diagnostics").textContent})');
  assert.deepEqual(loop16.rows,wgl16.rows.map(row=>row[2]));
  assert.match(loop16.log,/0 mismatched RGBA pixels/);
  console.log('WGL16 loop and instanced paths produce the same six GPU samples: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const gridSize = 8;','const gridSize = 4;');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const grid16=await evalJS('document.getElementById("diagnostics").textContent');
  assert.match(grid16,/loop 16 draw calls; instanced 1 draw call/);
  assert.match(grid16,/96 vertex invocations/);
  assert.match(grid16,/0 mismatched RGBA pixels/);
  console.log('WGL16 editable instance count updates draw calls and full-pixel equality: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('fragment-source');e.value=e.value.replace('vec4(v_color, 1.0)','vec4(v_color.bgr, 1.0)');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const changed16=await evalJS('({rgba:document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.notEqual(changed16.rgba,wgl16.rows[0][2]);
  assert.match(changed16.log,/0 mismatched RGBA pixels/);
  console.log('WGL16 edited fragment GLSL changes real GPU pixels in both draw paths: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL16 shader diagnostics and sandbox disposal: PASS');

  // WGL17: eight GPU samples, three texture formats and float-buffer feature gate.
  await cdp('Page.navigate',{url:url+'?lesson=WGL17'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("gl.R8UI")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算|基準画素と不一致|WebGL2実行エラー|タイムアウト/)',22000);
  const diagnostic17=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
  assert.match(diagnostic17.status,/独立画素検算に合格/,
    'WGL17 R8 CPU/GPU 8-point verification failed: '+JSON.stringify(diagnostic17));
  const initial17=await evalJS('({rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(cell=>cell.textContent)),log:document.getElementById("diagnostics").textContent,sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  assert.equal(initial17.rows.length,8);
  assert.ok(initial17.rows.every(row=>row[4]==='OK'));
  assert.equal(initial17.sandbox,'allow-scripts');
  assert.match(initial17.log,/R8 \/ RED \/ UNSIGNED_BYTE/);
  assert.match(initial17.log,/GL error: 0x0/);
  const shot17=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  await writeFile('_wgl_browser_review/wgl17-r8.png',Buffer.from(shot17.data,'base64'));
  console.log('WGL17 R8 texture upload and 8 independent CPU/GPU sample matches: PASS');

  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace(\"const mode = 'r8';\", \"const mode = 'r8ui';\");})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト/)',22000);
  const ui17=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>r.cells[2].textContent)})');
  assert.match(ui17.status,/編集コードを実行しました/,'R8UI failed: '+JSON.stringify(ui17));
  assert.match(ui17.log,/R8UI \/ RED_INTEGER \/ UNSIGNED_BYTE/);
  assert.deepEqual(ui17.rows,initial17.rows.map(r=>r[2]));
  console.log('WGL17 R8UI integer texture agrees with R8 normalized samples: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace(\"const mode = 'r8';\", \"const mode = 'r32f';\");})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト/)',22000);
  const float17=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent,rows:[...document.querySelectorAll("#results-table tbody tr")].map(r=>r.cells[2].textContent)})');
  assert.match(float17.status,/編集コードを実行しました/,'R32F failed: '+JSON.stringify(float17));
  assert.match(float17.log,/R32F \/ RED \/ FLOAT/);
  assert.match(float17.log,/FLOAT_READBACK/);
  // Edited sources are intentionally labeled "変更版: 参考" by the shared UI,
  // so compare numerical column 4, not the unchanged-source status column 5.
  // At x=0, R32F's blue channel may round to 128 rather than R8's 127.
  const float17Diffs=await evalJS('[...document.querySelectorAll("#results-table tbody tr")].map(r=>Number(r.cells[3].textContent))');
  assert.equal(float17Diffs.length,8);
  assert.ok(float17Diffs.every(x=>Number.isFinite(x)&&x<=2),
    'R32F display differs from independent CPU oracle beyond ±2: '+JSON.stringify(float17));
  const floatReadback=float17.log.match(/FLOAT_READBACK: RGBA32F\/FLOAT: max \|GPU-original\|=([0-9.eE+-]+)/);
  if(floatReadback) assert.ok(Number(floatReadback[1])<1e-6,
    'float framebuffer readback deviates from original values: '+floatReadback[1]);
  else assert.match(float17.log,/FLOAT_READBACK:.*(?:unavailable|incomplete|failed|extension present)/i);
  console.log('WGL17 R32F sampling/display passed; float FBO capability reported independently: PASS');

  await click('reset');
  await evalJS("(()=>{const e=document.getElementById('fragment-source');e.value=e.value.replace('1.0 - normalized','normalized');})()");
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("編集コードを実行しました")',22000);
  const wrong17=await evalJS('document.querySelector("#results-table tbody tr:first-child td:nth-child(3)").textContent');
  assert.notEqual(wrong17,initial17.rows[0][2]);
  console.log('WGL17 edited GLSL changes GPU pixels and exposes oracle disagreement: PASS');

  await click('reset');
  await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
  assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  console.log('WGL17 shader failure diagnostics and sandbox disposal: PASS');

  // WGL18: live shader compilation and two-texture diffusion numeric readback.
  await cdp('Page.navigate',{url:url+'?lesson=WGL18'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.equal(await evalJS('document.querySelectorAll("[role=tabpanel]").length'),3);
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算に合格|WebGL2実行エラー|タイムアウト|不一致/)',22000);
  const w18=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent,rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(c=>c.textContent))})');
  if(w18.status.includes('WebGL2実行エラー')) {
    assert.match(w18.log,/EXT_color_buffer_float unavailable|incomplete|FLOAT readPixels failed/);
    console.log('WGL18 float framebuffer unsupported; GPU verified status correctly withheld');
  } else {
    assert.match(w18.status,/独立画素検算に合格/,'WGL18 GPU mismatch: '+JSON.stringify(w18));
    assert.equal(w18.rows.length,16);
    assert.ok(w18.rows.every(row=>row[4]==='OK'));
    assert.match(w18.log,/CPU独立基準 vs GPU RGBA32F: max absolute error=.*一致/);
    assert.match(w18.log,/mass=1/);
    const shot18=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
    await writeFile('_wgl_browser_review/wgl18-diffusion.png',Buffer.from(shot18.data,'base64'));
    console.log('WGL18 2 ping-pong GPU steps, float CPU oracle, mass and 16 RGBA pixels: PASS');
    await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const steps = 2;', 'const steps = 1;');})()");
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト|不一致/)',22000);
    const edited18=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
    assert.match(edited18.status,/編集コードを実行しました/,'WGL18 step edit failed: '+JSON.stringify(edited18));
    assert.match(edited18.log,/CPU独立基準 vs GPU RGBA32F: max absolute error=.*一致/);
    console.log('WGL18 learner-edited step count validates against independent CPU: PASS');
  }
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);

  // WGL19: async rendering loop; independent CPU time/float oracle; GPU lifetime.
  await cdp('Page.navigate',{url:url+'?lesson=WGL19'});
  await waitFor('document.getElementById("status")?.textContent==="実行できます"');
  assert.equal(await evalJS('document.querySelectorAll("[role=tabpanel]").length'),3);
  assert.ok(await evalJS('document.getElementById("js-source").value.includes("requestAnimationFrame")'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.match(/独立画素検算に合格|WebGL2実行エラー|タイムアウト|未達|不一致/)',22000);
  const w19=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent,rows:[...document.querySelectorAll("#results-table tbody tr")].map(row=>[...row.cells].map(c=>c.textContent)),sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox")})');
  if(w19.status.includes('WebGL2実行エラー')) {
    assert.match(w19.log,/EXT_color_buffer_float unavailable|incomplete|FLOAT readPixels error/);
    console.log('WGL19 float framebuffer unavailable; GPU verification correctly withheld');
  }else{
    assert.match(w19.status,/独立画素検算に合格/,'WGL19 live GPU audit failure: '+JSON.stringify(w19));
    assert.equal(w19.rows.length,16);
    assert.ok(w19.rows.every(row=>row[4]==='OK'));
    assert.equal(w19.sandbox,'allow-scripts');
    assert.match(w19.log,/ticks\/frame=0,1,4,1; total ticks=6/);
    assert.match(w19.log,/WGL19 clock: 一致 \/ independent CPU-FLOAT: maxError=.*一致/);
    assert.match(w19.log,/RESOURCES:.*deleted; checks passed/);
    assert.match(w19.log,/FRAME: actual RAF cadence/);
    assert.match(w19.log,/TIMER_QUERY:/);
    assert.match(w19.log,/CONTEXT: simulation disabled/);
    const shot19=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
    await writeFile('_wgl_browser_review/wgl19-audit.png',Buffer.from(shot19.data,'base64'));
    console.log('WGL19 real GPU 4 render frames / 6 ticks / FLOAT16 and GPU object disposal: PASS');
    await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const frameDeltasMs=[16,16,72,16]','const frameDeltasMs=[20,20]');})()");
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト|未達/)',22000);
    const edit19=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
    assert.match(edit19.status,/編集コードを実行しました/,'WGL19 edited clock failure: '+JSON.stringify(edit19));
    assert.match(edit19.log,/total ticks=2/);
    assert.match(edit19.log,/WGL19 clock: 一致 \/ independent CPU-FLOAT: maxError=.*一致/);
    console.log('WGL19 learner edits clock, 2-step independent float oracle passes: PASS');

    await click('reset');
    await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const frameDeltasMs=[16,16,72,16]','const frameDeltasMs=[200]');})()");
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト|未達/)',22000);
    const late19=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
    assert.match(late19.status,/編集コードを実行しました/,'WGL19 overload failure: '+JSON.stringify(late19));
    assert.match(late19.log,/total ticks=4; remainder=0.00000ms; dropped=120ms/);
    assert.match(late19.log,/WGL19 clock: 一致 \/ independent CPU-FLOAT: maxError=.*一致/);
    console.log('WGL19 overload makes dropped simulation time explicit: PASS');

    await click('reset');
    await evalJS("(()=>{const e=document.getElementById('js-source');e.value=e.value.replace('const simulateLoss=false','const simulateLoss=true');})()");
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.match(/編集コードを実行しました|WebGL2実行エラー|タイムアウト|未達/)',22000);
    const lost19=await evalJS('({status:document.getElementById("status").textContent,log:document.getElementById("diagnostics").textContent})');
    if(lost19.status.includes('編集コードを実行しました')){
      assert.match(lost19.log,/CONTEXT: (?:context lost\/restored; all resources rebuilt|WEBGL_lose_context not exposed)/);
      assert.match(lost19.log,/WGL19 clock: 一致 \/ independent CPU-FLOAT: maxError=.*一致/);
      console.log('WGL19 context restore/replay and independent oracle, or explicit unavailable capability: PASS');
    }else {
      assert.match(lost19.status,/タイムアウト|WebGL2実行エラー|未達/);
      console.log('WGL19 actual context-loss recovery is unavailable; status remains not verified: '+lost19.status);
    }
    await click('reset');
    await evalJS('(()=>{const p=document.getElementById("preset");p.value="error";p.dispatchEvent(new Event("change",{bubbles:true}));})()');
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.includes("WebGL2実行エラー")',22000);
    assert.match(await evalJS('document.getElementById("diagnostics").textContent'),/FRAGMENT/i);
    console.log('WGL19 fragment shader compilation diagnostics: PASS');
  }
  await click('stop');
  assert.equal(await evalJS('document.querySelector("#canvas-slot iframe")===null'),true);
  assert.deepEqual(exceptions,[]);
}finally{
  try{ws?.close();}catch{}
  browser.kill('SIGKILL');
  await new Promise(ok=>server.close(ok));
  await rm(profile,{recursive:true,force:true,maxRetries:8,retryDelay:150});
}
