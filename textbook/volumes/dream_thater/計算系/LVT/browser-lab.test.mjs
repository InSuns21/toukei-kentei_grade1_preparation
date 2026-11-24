// Real Chromium verifies launcher behavior; the fixed Lean CLI checks the exact handed-off source.
import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
import {createServer} from 'node:http';
import {readFile, mkdtemp, rm, mkdir, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path, {join} from 'node:path';

import {lessons,combine,leanWebURL} from './browser-lab.mjs';
const lvtRoot = 'textbook/volumes/dream_thater/計算系/LVT';
const root = path.resolve(process.cwd());
const manifest = await readFile(join(root,'textbook/dream-theater-series/LVT.yaml'),'utf8');
const completed = [...manifest.matchAll(/^  - id: ([A-Z0-9-]+)\r?\n    path: [^\r\n]+\r?\n    status: completed\r?$/gm)].map(m=>m[1]);
assert.deepEqual(Object.keys(lessons),completed,'Register every completed LVT chapter in the browser lab');
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome'].find(p => p && existsSync(p));
assert.ok(chrome, 'Chromium is required for LVT browser acceptance');
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
const url = 'http://127.0.0.1:' + server.address().port + '/' + encodeURI(lvtRoot + '/browser-lab.html') + '?chapter=LVT1-02';
const profile = await mkdtemp(join(tmpdir(), 'lvt-browser-'));
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
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Page.navigate',{url});
  const value = id => evaluate('document.getElementById('+JSON.stringify(id)+').value');
  const select = (id,v) => evaluate('(()=>{const e=document.getElementById('+JSON.stringify(id)+');e.value='+JSON.stringify(v)+';e.dispatchEvent(new Event("change"));})()');
  const ready = () => waitFor('document.getElementById("run")?.getAttribute("aria-disabled")==="false"');
  const href = () => evaluate('document.getElementById("run").href');
  await ready();
  assert.equal(await value('chapter'),'LVT1-02');
  for (const [id, lesson] of Object.entries(lessons)) {
    await select('chapter',id);
    for (let i=0;i<lesson.modes.length;i++) {
      await select('mode',String(i));
      await ready();
      const entry=lesson.modes[i];
      const base=join(root,lvtRoot,id,'lab');
      const original=combine(lesson.module,await readFile(join(base,lesson.sourcePath ?? lesson.module+'.lean'),'utf8'),await readFile(join(base,entry[0]),'utf8'),entry[3]);
      assert.equal(await value('source'),original);
      assert.equal(await href(),leanWebURL(original));
      assert.equal(decodeURIComponent(new URL(await href()).hash.slice(6)),original);
      assert.ok((await evaluate('document.getElementById("commands").textContent')).includes(id+'/lab'));
      assert.ok((await evaluate('document.getElementById("back").href')).endsWith('/'+id+'/index'));
      const temp=join(profile,'Experiment.lean');
      await writeFile(temp,original);
      const result=spawnSync('lean',[temp],{cwd:base,encoding:'utf8',timeout:60000});
      assert.ifError(result.error);
      if(entry[0]==='Failure.lean') {
        assert.notEqual(result.status,0,id+' intentional failure accepted');
        const pattern=(id==='LVT1-01'||id==='LVT4-01'||id==='LVT4-02')?/did not evaluate to `true`/i:id==='LVT1-04'?/terminat/i:id==='LVT1-05'?/decide|false/i:id==='LVT3-08'?/Tactic `rfl` failed:[\s\S]*badLoop #\[2\][\s\S]*is not definitionally equal[\s\S]*#\[2\]\.sum/:/type mismatch/i;
        assert.match(result.stdout+result.stderr,pattern);
      } else {
        assert.equal(result.status,0,id+' '+entry[0]+'\n'+result.stdout+result.stderr);
      }
      console.log(id+' '+entry[0]+': source handoff and pinned Lean checked');
    }
  }
  await select('chapter','LVT1-02');await ready();
  const initial=await value('source');
  const edited=initial+'\n#eval 40 + 2\n';
  await evaluate('(()=>{const e=document.getElementById("source");e.value='+JSON.stringify(edited)+';e.dispatchEvent(new Event("input"));})()');
  assert.equal(await href(),leanWebURL(edited));
  await click('reset');
  assert.equal(await value('source'),initial);
  assert.equal(await href(),leanWebURL(initial));
  await cdp('Emulation.setDeviceMetricsOverride',{width:360,height:760,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 2'));
  assert.equal(exceptions.length,0,JSON.stringify(exceptions));
  console.log('LVT browser selection, editable source handoff, reset, mobile layout: PASS');
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
    console.warn('LVT browser test profile cleanup failed: ' + error.message);
  }
}
