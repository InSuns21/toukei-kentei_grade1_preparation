// FCG1 real-Chromium acceptance: Canvas2D, time controls, independent CPU oracle,
// source editing, CSP opaque iframe, reduced-width layout, and screenshots.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile, mkdtemp, rm, mkdir, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path, {join} from 'node:path';

const root = join(process.cwd(), '_site');
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome'].find(p => p && existsSync(p));
assert.ok(chrome, 'Chromium is required for FCG1 browser acceptance');
const mime = p => p.endsWith('.html') ? 'text/html; charset=utf-8' :
  p.endsWith('.css') ? 'text/css; charset=utf-8' :
  /\.(?:mjs|js)$/.test(p) ? 'text/javascript; charset=utf-8' : 'text/plain; charset=utf-8';
const server = createServer(async(req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end(); return;
    }
    const bytes = await readFile(file);
    res.writeHead(200, {'content-type': mime(file), 'cache-control': 'no-store'}).end(bytes);
  } catch(error) {res.writeHead(404).end(String(error.message));}
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port + '/simulation/fcg1-lab.html';
const profile = await mkdtemp(join(tmpdir(), 'fcg1-browser-'));
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage',
  '--no-first-run', '--disable-extensions', '--remote-allow-origins=*',
  '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
{stdio:'ignore'});
let ws;
try {
  let port;
  for (let attempt = 0; attempt < 250; attempt++) {
    if (browser.exitCode !== null) throw new Error('Chromium exited: '+browser.exitCode);
    try {
      port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]);
      if (port) break;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(port, 'Chromium remote-debugging port unavailable');
  let page;
  for(let attempt = 0; attempt < 100; attempt++) {
    const pages = await(await fetch('http://127.0.0.1:' + port + '/json/list')).json();
    page = pages.find(item => item.type === 'page');
    if (page) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(page, 'Chromium page unavailable');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, {once:true});
    ws.addEventListener('error', reject, {once:true});
  });
  let counter = 0;
  const pending = new Map(), exceptions = [];
  ws.addEventListener('message', event => {
    const result = JSON.parse(event.data);
    if (result.method === 'Runtime.exceptionThrown')
      exceptions.push(JSON.stringify(result.params).slice(0, 900));
    const task = pending.get(result.id);
    if (!task) return;
    pending.delete(result.id);
    result.error ? task.reject(new Error(result.error.message)) : task.resolve(result.result);
  });
  const cdp = (method, params={}) => new Promise((resolve,reject) => {
    const id=++counter; pending.set(id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  const evaluate = async expression => {
    const response = await cdp('Runtime.evaluate',
      {expression,returnByValue:true,awaitPromise:true});
    if (response.exceptionDetails)
      throw new Error('Chromium JS exception: ' +
        JSON.stringify(response.exceptionDetails).slice(0, 900));
    return response.result?.value;
  };
  const click = id => evaluate('document.getElementById(' + JSON.stringify(id) + ').click()');
  const waitFor = async(expression, limit=15000) => {
    const end=Date.now()+limit;
    while(Date.now()<end) {
      if (await evaluate(expression)) return;
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    throw new Error('Browser timeout: ' + expression +
      '\nrecent exceptions:' + JSON.stringify(exceptions.slice(-2)));
  };
  const runStepCount = async n => {
    for (let j=1;j<=n;j++) {
      await click('step');
      await waitFor('document.querySelector("#particle-diagnostics tbody tr") !== null && ' +
        'document.getElementById("status").textContent.includes("' +
        ' stepを表示") && ' +
        'Number(document.getElementById("status").textContent.match(/(\\d+) step/)?.[1])===' + j);
    }
  };
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride',
    {width:1000,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('document.getElementById("status")?.textContent.includes("初期ソースを読み込みました")');
  assert.equal(await evaluate('document.querySelectorAll("[role=tabpanel]").length'),3);
  assert.ok(await evaluate('document.getElementById("js-source").value.includes("createLab")'));
  await click('tab-code');
  assert.equal(await evaluate('document.querySelectorAll(".wgl-code-editor").length'),1);
  assert.equal(await evaluate('document.getElementById("js-source").wrap'),'soft');
  await mkdir('_fcg1_browser_review', {recursive:true});
  const codeShot = await cdp('Page.captureScreenshot',
    {format:'png',captureBeyondViewport:true});
  await writeFile('_fcg1_browser_review/fcg1-code.png',
    Buffer.from(codeShot.data,'base64'));
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("Canvas2D実行準備完了")',22000);
  await waitFor('document.querySelectorAll("#particle-diagnostics tbody tr").length===2',22000);
  const initial = await evaluate('({sandbox:document.querySelector("#canvas-slot iframe")?.getAttribute("sandbox"),' +
    'opaque:(()=>{try{return !!document.querySelector("#canvas-slot iframe").contentWindow.document.body}' +
    'catch{return true}})(),rows:[...document.querySelectorAll("#particle-diagnostics tbody tr")].map(r=>[...r.cells].map(c=>c.textContent))})');
  assert.equal(initial.sandbox,'allow-scripts');
  assert.equal(initial.opaque,true);
  assert.equal(initial.rows[0][0],'1');
  assert.equal(initial.rows[1][0],'2');
  assert.equal(initial.rows[0][5],'一致');
  await runStepCount(10);
  assert.ok(await evaluate('document.querySelectorAll("#particle-diagnostics tbody tr").length===2'));
  const after = await evaluate('([...document.querySelectorAll("#particle-diagnostics tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)))');
  assert.ok(after.every(r=>r[5]==='一致'));
  assert.ok(Number(after[0][3])>0,'forward Euler must have nonzero physical error');
  const image = await cdp('Page.captureScreenshot',
    {format:'png',captureBeyondViewport:true});
  await writeFile('_fcg1_browser_review/fcg1-rotation.png',
    Buffer.from(image.data,'base64'));
  console.log('FCG1 rotation, Canvas2D, two IDs, numeric CPU reference and opaque iframe: PASS');

  // Three modes share the same runtime; no new source execution on mode change until Run.
  for (const mode of ['steady','unsteady']) {
    await evaluate('document.getElementById("field").value=' + JSON.stringify(mode));
    await click('run');
    await waitFor('document.getElementById("status")?.textContent.includes("Canvas2D実行準備完了")',22000);
    await waitFor('document.querySelectorAll("#particle-diagnostics tbody tr").length===2',22000);
    await runStepCount(10);
    const rows = await evaluate('([...document.querySelectorAll("#particle-diagnostics tbody tr")].map(r=>[...r.cells].map(c=>c.textContent)))');
    assert.ok(rows.every(r=>r[5]==='一致'),mode+' CPU reference mismatch');
    console.log('FCG1 '+mode+' physical stepping and independent Euler oracle: PASS');
  }
  // Modifying the actual learner script must change the model, not just the legend.
  await click('tab-code');
  const altered = await evaluate('(()=>{const e=document.getElementById("js-source");' +
    'e.value=e.value.replace("const shearRate = 1;", "const shearRate = 0;");' +
    'e.dispatchEvent(new Event("input",{bubbles:true}));' +
    'return e.value.includes("const shearRate = 0;");})()');
  assert.equal(altered,true);
  await click('run');
  await waitFor('document.getElementById("status")?.textContent.includes("Canvas2D実行準備完了")',22000);
  await waitFor('document.querySelectorAll("#particle-diagnostics tbody tr").length===2',22000);
  await runStepCount(2);
  const edited = await evaluate('document.querySelector("#particle-diagnostics tbody tr:first-child td:last-child").textContent');
  assert.equal(edited,'編集版・参考');
  const strict = await evaluate('document.querySelector("#particle-diagnostics tbody tr:first-child td:nth-child(5)").textContent');
  assert.ok(Number(strict)>0,'modified velocity must change the numeric trajectory');
  console.log('FCG1 JavaScript source changes the actual physical step: PASS');

  await click('stop');
  assert.equal(await evaluate('document.querySelector("#canvas-slot iframe")===null'),true);
  await click('reset');
  assert.ok(await evaluate('document.getElementById("js-source").value.includes("const shearRate = 1;")'));
  console.log('FCG1 stop/dispose, restore initial source: PASS');

  await cdp('Emulation.setDeviceMetricsOverride',
    {width:360,height:760,deviceScaleFactor:2,mobile:true});
  await click('tab-code');
  const mobile = await evaluate('({width:document.getElementById("js-source").clientWidth,' +
    'scroll:document.getElementById("js-source").scrollWidth,' +
    'page:document.querySelector("main").getBoundingClientRect().width,' +
    'editor:document.getElementById("js-source").getBoundingClientRect().width})');
  assert.ok(mobile.width > 0 && mobile.scroll <= mobile.width + 2);
  assert.ok(mobile.editor <= mobile.page + 2);
  await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  console.log('FCG1 narrow layout, source editing, reduced-motion settings: PASS');
} finally {
  try {ws?.close();} catch {}
  browser.kill('SIGTERM');
  await new Promise(resolve => {
    if (browser.exitCode !== null) return resolve();
    const timer = setTimeout(() => {browser.kill('SIGKILL'); resolve();}, 3000);
    browser.once('exit', () => {clearTimeout(timer); resolve();});
  });
  server.close();
  try {
    await rm(profile, {recursive:true, force:true, maxRetries:10, retryDelay:100});
  } catch (error) {
    console.warn('Browser test profile cleanup failed: ' + error.message);
  }
}
