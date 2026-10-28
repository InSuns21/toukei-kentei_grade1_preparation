// Browser acceptance for the eight ML I/II labs added at plan completion.
// Run after npm run validate:pages. No remote packages or external APIs used.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mlLabSpecs, runMlLab } from '../pages/simulation/ml-completion-models.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../_site');
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome', '/usr/bin/chromium',
  '/usr/bin/chromium-browser', '/opt/google/chrome/chrome'].find(item => item && existsSync(item));
if (!chrome) throw new Error('Chromium/Chrome is required for ML lab browser acceptance');
const mime = name => name.endsWith('.html') ? 'text/html' :
  name.endsWith('.js') || name.endsWith('.mjs') ? 'text/javascript' :
  name.endsWith('.json') ? 'application/json' : 'text/plain';
const server = createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = path.resolve(root, '.' + name);
    if (!target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    const data = await readFile(target);
    res.writeHead(200, { 'content-type': mime(name), 'cache-control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const address = id => origin + '/simulation/ml-completion.html?chapter=' + id;
const profile = await mkdtemp(path.join(tmpdir(), 'ml-completion-chrome-'));
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu',
  '--disable-dev-shm-usage', '--no-first-run', '--disable-extensions',
  '--remote-allow-origins=*', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, address('ML1-08')], { stdio: 'ignore' });
let ws;
try {
  let port;
  for (let i = 0; i < 250; i++) {
    if (browser.exitCode !== null) throw new Error('Chromium exited during startup');
    try {
      port = Number((await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]);
      if (port) break;
    } catch { /* waiting for Chrome */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(port, 'Chrome did not start within 25 seconds');
  const list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
  const target = list.find(item => item.type === 'page');
  assert.ok(target, 'no CDP page');
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  const pending = new Map(), exceptions = [];
  let next = 0;
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params);
    const task = pending.get(message.id);
    if (!task) return;
    pending.delete(message.id);
    if (message.error) task.reject(new Error(message.error.message));
    else task.resolve(message.result);
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++next; pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const reply = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (reply.exceptionDetails) throw new Error(JSON.stringify(reply.exceptionDetails));
    return reply.result?.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 240; i++) {
      try { const ready = await evaluate(expression); if (ready) return ready; }
      catch { /* page navigation temporarily detaches execution context */ }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Browser wait timed out: ' + expression);
  };
  await cdp('Runtime.enable'); await cdp('Page.enable'); await cdp('Network.enable');
  const changes = {
    'ML1-08': ['separation', 'overlap'], 'ML1-12': ['leakage', 'leaked'],
    'ML1-13': ['prevalence', '0.55'], 'ML1-19': ['rank', '2'],
    'ML1-20': ['initial', 'poor'], 'ML1-21': ['missing', 'mnar'],
    'ML2-09': ['family', 'full'], 'ML2-20': ['weight1', '0'],
  };
  for (const id of Object.keys(mlLabSpecs)) {
    await cdp('Page.navigate', { url: address(id) });
    await waitFor(`window.mlLabLastResult?.chapter === '${id}' && document.querySelectorAll('.metric').length > 0`);
    assert.equal(await evaluate('document.querySelectorAll("canvas").length'),
      runMlLab(id).charts.length, id + ' charts');
    const shown = await evaluate('document.querySelector(".metric strong").textContent');
    const expected = runMlLab(id).metrics[0].value;
    assert.ok(Math.abs(Number(shown) - expected) < 1e-4 ||
      Math.abs(Number(shown) - expected) / Math.max(1, Math.abs(expected)) < 1e-5,
      id + ' visible number differs from headless numerical kernel');
    const pixels = await evaluate(`(() => {
      const canvas = document.querySelector('canvas'), c = canvas.getContext('2d');
      const data = c.getImageData(0,0,canvas.width,canvas.height).data;
      let nonWhite = 0;
      for(let i=0;i<data.length;i+=4) if(data[i]<230||data[i+1]<230||data[i+2]<230) nonWhite++;
      return nonWhite;
    })()`);
    assert.ok(pixels > 200, id + ' chart must render computed data');
    const [field, value] = changes[id];
    await evaluate(`document.getElementById('${field}').value=${JSON.stringify(value)};
      document.getElementById('${field}').dispatchEvent(new Event('change'))`);
    await waitFor(`window.mlLabLastResult?.config?.${field} === ${JSON.stringify(
      mlLabSpecs[id].inputs[field].options ? value : Number(value))}`);
    const actualMetrics = await evaluate('window.mlLabLastResult.metrics.map(m => m.value)');
    const expectedMetrics = runMlLab(id,
      { [field]: mlLabSpecs[id].inputs[field].options ? value : Number(value) }).metrics.map(m => m.value);
    assert.equal(actualMetrics.length, expectedMetrics.length);
    actualMetrics.forEach((v, i) => assert.ok(v === expectedMetrics[i] ||
      (v !== null && expectedMetrics[i] !== null &&
        Math.abs(v - expectedMetrics[i]) <= 1e-10 * Math.max(1, Math.abs(expectedMetrics[i]))),
    id + ' metric index ' + i + ' differs from the Node kernel'));
    if (mlLabSpecs[id].mode === 'steps') {
      await evaluate('document.getElementById("steps").value="0";document.getElementById("calculate").click()');
      await waitFor('window.mlLabLastResult?.config?.steps === 0');
      await evaluate('document.getElementById("step").click()');
      await waitFor('window.mlLabLastResult?.config?.steps === 1');
      await evaluate('document.getElementById("play").click()');
      await waitFor('window.mlLabLastResult?.config?.steps >= 2');
      await evaluate('document.getElementById("pause").click()');
      const stopped = await evaluate('window.mlLabLastResult.config.steps');
      await new Promise(resolve => setTimeout(resolve, 800));
      assert.equal(await evaluate('window.mlLabLastResult.config.steps'), stopped, id + ' pause');
    }
    await evaluate('document.getElementById("reset").click()');
    await waitFor(`window.mlLabLastResult?.chapter === '${id}' && window.mlLabLastResult?.config?.${field} === ${
      JSON.stringify(mlLabSpecs[id].inputs[field].value)}`);
    // Check a small viewport for horizontal overflow; all controls remain keyboard-focusable.
    await cdp('Emulation.setDeviceMetricsOverride', { width: 375, height: 810, deviceScaleFactor: 1, mobile: true });
    assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 3'),
      id + ' mobile viewport has horizontal overflow');
    await cdp('Emulation.clearDeviceMetricsOverride');
    console.log(id + ': compute, parameter change, headless numerical comparison, chart, controls, mobile PASS');
  }
  await cdp('Page.navigate', { url: address('ML1-08') });
  await waitFor('window.mlLabLastResult?.chapter === "ML1-08"');
  await waitFor('navigator.serviceWorker?.ready.then(() => true)');
  const registration = await evaluate('navigator.serviceWorker.getRegistration().then(r => Boolean(r?.active))');
  assert.ok(registration, 'standalone lab must register Service Worker');
  await cdp('Page.reload', { ignoreCache: false });
  await waitFor('window.mlLabLastResult?.chapter === "ML1-08" && Boolean(navigator.serviceWorker?.controller)');
  // A revisited lab must still compute from cached assets with network disabled.
  await cdp('Network.emulateNetworkConditions', {
    offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0,
  });
  await cdp('Page.reload', { ignoreCache: false });
  await waitFor('window.mlLabLastResult?.chapter === "ML1-08"');
  await evaluate('document.getElementById("steps").value="0";document.getElementById("step").click()');
  await waitFor('window.mlLabLastResult?.config?.steps === 1');
  await cdp('Network.emulateNetworkConditions', {
    offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
  });
  assert.equal(exceptions.length, 0, 'browser uncaught JavaScript exceptions');
  console.log('ML completion browser: all 8 labs + replay/pause/reset + mobile + SW offline revisit PASS');
} finally {
  ws?.close();
  server.close();
  // Chromium may still be writing profile files after the final CDP call.
  // Wait for the browser process to exit before removing its profile; otherwise
  // fs.rm can race a freshly-created Default/ file and fail with ENOTEMPTY.
  const exited = browser.exitCode !== null || browser.signalCode !== null
    ? Promise.resolve() : new Promise(resolve => browser.once('exit', resolve));
  browser.kill('SIGTERM');
  await Promise.race([exited, new Promise(resolve => setTimeout(resolve, 4000))]);
  if (browser.exitCode === null && browser.signalCode === null) {
    browser.kill('SIGKILL');
    await Promise.race([exited, new Promise(resolve => setTimeout(resolve, 4000))]);
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    try { await rm(profile, { recursive: true, force: true }); break; }
    catch (error) {
      if (error.code !== 'ENOTEMPTY' || attempt === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
}
