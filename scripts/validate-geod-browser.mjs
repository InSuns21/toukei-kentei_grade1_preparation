// Real Chromium WebGL2 smoke for the GEOD globe. The test blocks OSM traffic:
// CI must never fetch/prefetch external tiles merely to assert our rendering.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path, { join } from 'node:path';

const root = join(process.cwd(), '_site');
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome'].find(value => value && existsSync(value));
if (!chrome) throw new Error('Chromium/Chrome is required for GEOD WebGL2 smoke');
const mime = name => name.endsWith('.html') ? 'text/html' :
  name.endsWith('.css') ? 'text/css' : name.endsWith('.mjs') ? 'text/javascript' :
  name.endsWith('.json') ? 'application/json' : 'text/plain';
const server = createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = path.resolve(root, '.' + name);
    if (!target.startsWith(root + path.sep)) {
      res.writeHead(403).end(); return;
    }
    const data = await readFile(target);
    res.writeHead(200, { 'content-type': mime(name), 'cache-control': 'no-store' });
    res.end(data);
  } catch (error) {
    res.writeHead(404).end(String(error.message));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port + '/simulation/geod.html';
const profile = await mkdtemp(join(tmpdir(), 'dt-geod-browser-'));
const browser = spawn(chrome, ['--headless=new', '--no-sandbox',
  '--disable-dev-shm-usage', '--no-first-run', '--disable-extensions',
  '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader',
  '--remote-allow-origins=*', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
let ws;
try {
  let port;
  for (let i = 0; i < 300; i++) {
    if (browser.exitCode !== null) throw new Error('Chromium exited: ' + browser.exitCode);
    try {
      port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]);
      if (port) break;
    } catch { /* Still initializing */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(port, 'Chromium DevTools startup timed out');
  let page;
  for (let i = 0; i < 100; i++) {
    const tabs = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
    page = tabs.find(t => t.type === 'page');
    if (page) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(page, 'No Chrome page target');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  const pending = new Map(), exceptions = [];
  let nextId = 0;
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') {
      exceptions.push(JSON.stringify(message.params).slice(0, 500));
    }
    const task = pending.get(message.id);
    if (!task) return;
    pending.delete(message.id);
    if (message.error) task.reject(new Error(message.error.message));
    else task.resolve(message.result);
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evalJS = async expression => {
    const answer = await cdp('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (answer.exceptionDetails) throw new Error(JSON.stringify(answer.exceptionDetails));
    return answer.result?.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 240; i++) {
      if (await evalJS(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Browser GEOD condition timed out: ' + expression);
  };
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Network.enable');
  await cdp('Network.setBlockedURLs', { urls: ['*tile.openstreetmap.org/*'] });
  await cdp('Page.navigate', { url });
  await waitFor('document.querySelector("#geod-status")?.textContent.includes("計算済み")');
  assert.deepEqual(exceptions, [], 'GEOD browser runtime exception');
  const webgl = await evalJS(`(() => {
    const canvas = document.querySelector('#globe');
    const gl = canvas.getContext('webgl2');
    if (!gl) return { supported: false, fallback: document.querySelector('#gl-fallback').textContent };
    // WebGL defaults to preserveDrawingBuffer=false. Trigger a fresh
    // synchronous draw and read *before* browser compositing discards it.
    document.querySelector('#a-lon').dispatchEvent(new Event('input'));
    const pixels = [];
    for (const x of [360, 480, 600, 720, 840]) {
      const rgba = new Uint8Array(4);
      gl.readPixels(x, 380, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
      pixels.push([...rgba]);
    }
    return { supported: true, hidden: canvas.hidden, error: gl.getError(), pixels };
  })()`);
  assert.equal(webgl.supported, true, JSON.stringify(webgl));
  assert.equal(webgl.hidden, false);
  assert.equal(webgl.error, 0, 'WebGL should have no error after rendering');
  assert.ok(webgl.pixels.every(pixel => pixel[3] === 255), 'opaque shaded surface');
  assert.ok(new Set(webgl.pixels.map(pixel => pixel.slice(0, 3).join(','))).size > 1,
    'surface colour should vary spatially (Lambert shading): ' + JSON.stringify(webgl));
  await evalJS(`document.querySelector('#show-world').checked=false;
    document.querySelector('#show-world').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#osm-credit").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#a-section").hidden'), false);
  assert.ok(await evalJS('document.querySelector("#a-section-map").textContent.includes("O")'));
  const zoomPixels = await evalJS(`(() => {
    const gl = document.querySelector('#globe').getContext('webgl2');
    const read = () => { const p = new Uint8Array(4);
      gl.readPixels(280, 380, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, p); return [...p]; };
    document.querySelector('#zoom-reset').click();
    const before = read();
    document.querySelector('#globe-zoom').value='1.6';
    document.querySelector('#globe-zoom').dispatchEvent(new Event('input'));
    return { before, after: read(), text: document.querySelector('#globe-zoom-v').textContent };
  })()`);
  assert.equal(zoomPixels.text, '160%');
  assert.notDeepEqual(zoomPixels.before.slice(0, 3), zoomPixels.after.slice(0, 3),
    'actual globe footprint should change when zooming: ' + JSON.stringify(zoomPixels));
  await evalJS(`document.querySelector('#globe').dispatchEvent(new WheelEvent('wheel',
    {deltaY:100, bubbles:true, cancelable:true}))`);
  assert.equal(await evalJS('document.querySelector("#globe-zoom").value'), '1.5');
  await evalJS('document.querySelector("#zoom-reset").click()');
  await evalJS(`document.querySelector('#a-city').value='sao-paulo';
    document.querySelector('#a-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#a-lat").value'), '-23.5505');
  assert.equal(await evalJS('document.querySelector("#globe-point-lat").value'), '-23.5505');
  await evalJS(`document.querySelector('#globe-point-city').value='paris';
    document.querySelector('#globe-point-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#a-lon").value'), '2.3522');
  await evalJS(`document.querySelector('#globe-point-lon').value='15.5';
    document.querySelector('#globe-point-lon').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#a-lon").value'), '15.5');
  await evalJS(`document.querySelector('[data-lab="B"]').click();
    document.querySelector('#globe-point-role').value='end';
    document.querySelector('#globe-point-role').dispatchEvent(new Event('change'));
    document.querySelector('#globe-point-city').value='london';
    document.querySelector('#globe-point-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#b-lat2").value'), '51.5074');
  assert.equal(await evalJS('document.querySelector("#b-lat1").value'), '35.681236');
  await evalJS(`document.querySelector('[data-lab="D"]').click();
    document.querySelector('#d-city').value='new-york';
    document.querySelector('#d-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#d-lon0").value'), '-74.006');
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  const desktopLayout = await evalJS(`(() => {
    const g = document.querySelector('#globe').getBoundingClientRect();
    const panel = document.querySelector('.viz-grid').getBoundingClientRect();
    return { globe: g.width, region: panel.width, intrinsicWidth: document.querySelector('#globe').width };
  })()`);
  assert.equal(desktopLayout.intrinsicWidth, 1200);
  assert.ok(desktopLayout.globe / desktopLayout.region >= .98,
    '3D globe must occupy the full plot width: ' + JSON.stringify(desktopLayout));
  await evalJS(`document.querySelector('[data-lab="E"]').click();
    document.querySelector('#e-city').value='paris';
    document.querySelector('#e-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#e-lat").value'), '48.8566');
  assert.ok(await evalJS(`document.querySelectorAll('#e-left-map path').length >= 20 &&
    document.querySelectorAll('#e-right-map path').length >= 20`));
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  await evalJS(`document.querySelector('#e-right').value='mollweide';
    document.querySelector('#e-right').dispatchEvent(new Event('input'))`);
  assert.ok(await evalJS('document.querySelector("#e-right-title").textContent.includes("Mollweide")'));
  await evalJS(`document.querySelector('[data-lab="F"]').click()`);
  assert.equal(await evalJS('document.querySelector("#f-zone option").value'), '1');
  assert.equal(await evalJS('document.querySelectorAll("#f-zone option").length'), 19);
  assert.equal(await evalJS('document.querySelector("#globe-point-zone-wrap").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#f-map-panel").hidden'), false);
  assert.ok(await evalJS('document.querySelectorAll("#f-map path").length >= 14'));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("EPSG:6677")'));
  assert.equal(await evalJS('document.querySelector("#globe-point-lat").value'), '35.681236');
  await evalJS(`document.querySelector('#f-zone').value='8';
    document.querySelector('#f-zone').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#globe-point-zone").value'), '8');
  assert.ok(await evalJS('document.querySelector("#f-map-title").textContent.includes("VIII")'));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("EPSG:6676")'));
  await evalJS(`document.querySelector('#f-zone').value='9';
    document.querySelector('#f-zone').dispatchEvent(new Event('input'));
    document.querySelector('#globe-point-lat').value='36';
    document.querySelector('#globe-point-lat').dispatchEvent(new Event('change'));
    document.querySelector('#globe-point-lon').value=String(139 + 50/60);
    document.querySelector('#globe-point-lon').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#f-lat").value'), '36');
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("0.000 m")'));
  await evalJS(`document.querySelector('#f-datum').value='grs80-only';
    document.querySelector('#f-datum').dispatchEvent(new Event('input'))`);
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("datum・EPSG未指定")'));
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 360, height: 760, deviceScaleFactor: 1, mobile: true,
  });
  const overflow = await evalJS('document.documentElement.scrollWidth - window.innerWidth');
  assert.ok(overflow <= 1, 'GEOD horizontal overflow at 360px: ' + overflow);
  const mobileLayout = await evalJS(`(() => {
    const globe = document.querySelector('#globe').getBoundingClientRect();
    const region = document.querySelector('.viz-grid').getBoundingClientRect();
    return { globe: globe.width, region: region.width };
  })()`);
  assert.ok(mobileLayout.globe / mobileLayout.region >= .98,
    '3D globe must remain full-width at 360px: ' + JSON.stringify(mobileLayout));
  console.log('GEOD WebGL2: shading, globe-adjacent coordinates, full-width, global/Japan projection, zoom, 360px: PASS');
} finally {
  ws?.close();
  if (browser.exitCode === null && browser.signalCode === null) {
    const exited = new Promise(resolve => browser.once('exit', resolve));
    browser.kill();
    await Promise.race([exited, new Promise(resolve => setTimeout(resolve, 3000))]);
  }
  server.close();
  await rm(profile, { recursive: true, force: true, maxRetries: 6, retryDelay: 250 });
}
