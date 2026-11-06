// Real Chromium WebGL2 smoke for the GEOD globe. The test blocks external tiles:
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
  await cdp('Network.setBlockedURLs', { urls: [
    '*tile.openstreetmap.org/*', '*cyberjapandata.gsi.go.jp/xyz/std/*',
  ] });
  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 1600, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await cdp('Page.navigate', { url });
  await waitFor('document.querySelector("#geod-status")?.textContent.includes("計算済み")');
  assert.deepEqual(exceptions, [], 'GEOD browser runtime exception');
  const workspaceLayout = async (lab, primary) => evalJS(`(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect();
    const controls = rect('#lab-${lab}');
    const output = rect('.geod-output-panel');
    const visual = rect('${primary}');
    const globe = rect('#globe');
    return { lab: document.querySelector('#geod-workspace').dataset.currentLab,
      appWidth: rect('.geod-app').width, viewport: window.innerWidth,
      controls: { right: controls.right, top: controls.top, bottom: controls.bottom },
      output: { left: output.left, top: output.top, bottom: output.bottom },
      visual: { left: visual.left, top: visual.top, width: visual.width },
      globe: { left: globe.left, right: globe.right, top: globe.top, width: globe.width },
    };
  })()`);
  const assertSideBySide = layout => {
    assert.ok(layout.appWidth / layout.viewport >= .95,
      'GEOD must use available desktop width: ' + JSON.stringify(layout));
    assert.ok(layout.controls.right < layout.output.left &&
      Math.abs(layout.controls.top - layout.output.top) <= 2,
    'controls and visual output must form simultaneous desktop columns: ' + JSON.stringify(layout));
  };
  const initialLayout = await workspaceLayout('A', '#a-section-map');
  assert.equal(initialLayout.lab, 'A');
  assertSideBySide(initialLayout);
  assert.ok(initialLayout.visual.left >= initialLayout.globe.right,
    'A globe and meridian section should share the right column on wide screens: ' + JSON.stringify(initialLayout));
  assert.ok(Math.abs(initialLayout.visual.top - initialLayout.globe.top) <= 3,
    'A globe canvas and meridian SVG must align at the top: ' + JSON.stringify(initialLayout));
  const toggle = await evalJS(`(() => {
    const label = document.querySelector('.world-toggle');
    const box = label.querySelector('input[type="checkbox"]');
    return { direction: getComputedStyle(label).flexDirection,
      checkY: box.getBoundingClientRect().y, labelY: label.getBoundingClientRect().y,
      checkHeight: box.getBoundingClientRect().height, labelHeight: label.getBoundingClientRect().height };
  })()`);
  assert.equal(toggle.direction, 'row', 'Map checkbox and label text must share one line');
  assert.ok(toggle.checkHeight < 24 && Math.abs(toggle.checkY + toggle.checkHeight/2 - toggle.labelY - toggle.labelHeight/2) < 3,
    'Map checkbox must be inline and vertically aligned: ' + JSON.stringify(toggle));
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
  await evalJS('document.querySelector("#b-antipodal-example").click()');
  assert.equal(await evalJS('document.querySelector("#b-lat1").value'), '-30');
  assert.equal(await evalJS('document.querySelector("#b-lon2").value'), '179.8');
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'false');
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("19,989.832827")'));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("Vincenty")'));
  await evalJS(`(() => {
    for (const [id, value] of Object.entries({
      'b-lat1': '0', 'b-lon1': '0', 'b-lat2': '0', 'b-lon2': '180'
    })) document.querySelector('#' + id).value = value;
    document.querySelector('#b-lon2').dispatchEvent(new Event('input'));
  })()`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'false',
    'exact antipodes must retain a shortest ellipsoidal solution and globe trace');
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("20,003.931458")'));
  await evalJS(`document.querySelector('[data-lab="C"]').click()`);
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  assert.equal(await evalJS('document.querySelector("#geod-globe-panel").hidden'), true);
  assert.ok(await evalJS('document.querySelectorAll("#c-map circle").length >= 4'));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("共分散")'));
  const cBefore = await evalJS('document.querySelector("#geod-results").textContent');
  const cLayout = await evalJS(`(() => {
    const rect = selector => {
      const box = document.querySelector(selector).getBoundingClientRect();
      return { left: box.left, right: box.right, top: box.top,
        bottom: box.bottom, width: box.width };
    };
    return { controls: rect('#lab-C'), output: rect('.geod-output-panel'),
      visual: rect('#c-map'), width: window.innerWidth };
  })()`);
  assert.ok(cLayout.controls.right < cLayout.output.left &&
    Math.abs(cLayout.controls.top - cLayout.output.top) <= 2,
    'C must show observation controls and adjustment plot side by side: ' + JSON.stringify(cLayout));
  assert.ok(cLayout.visual.width <= 861, 'C diagram should be readable without widescreen stretching');
  await evalJS(`document.querySelector('#c-bias').value='2';
    document.querySelector('#c-bias').dispatchEvent(new Event('input'))`);
  assert.notEqual(await evalJS('document.querySelector("#geod-results").textContent'), cBefore);
  await evalJS(`document.querySelector('#c-sigma-a').value='0';
    document.querySelector('#c-sigma-a').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'true');
  assert.equal(await evalJS('document.querySelector("#c-map").childElementCount'), 0);
  await evalJS(`document.querySelector('#c-sigma-a').value='0.05';
    document.querySelector('#c-sigma-a').dispatchEvent(new Event('input'))`);
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  // GNSS is a second C mode: four-dimensional geometry with no 3D globe.
  await evalJS(`document.querySelector('#c-mode').value='gnss';
    document.querySelector('#c-mode').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#c-map-panel").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#c-gnss-panel").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#c-gnss-controls").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#c-survey-controls").hidden'), true);
  assert.ok(await evalJS('document.querySelectorAll("#c-gnss-map circle").length >= 9'));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("GDOP")'));
  const gnssBefore = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(7) td:last-child").textContent');
  const gnssLayout = await evalJS(`(() => {
    const controls = document.querySelector('#lab-C').getBoundingClientRect();
    const output = document.querySelector('.geod-output-panel').getBoundingClientRect();
    const sky = document.querySelector('#c-gnss-map').getBoundingClientRect();
    return { controlsRight: controls.right, controlsTop: controls.top,
      outputLeft: output.left, outputTop: output.top, skyWidth: sky.width };
  })()`);
  assert.ok(gnssLayout.controlsRight < gnssLayout.outputLeft &&
    Math.abs(gnssLayout.controlsTop - gnssLayout.outputTop) <= 2 &&
    gnssLayout.skyWidth <= 861, 'GNSS should be side by side, with a bounded plot: ' +
    JSON.stringify(gnssLayout));
  await evalJS(`document.querySelector('#c-gnss-layout').value='cluster';
    document.querySelector('#c-gnss-layout').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#c-gnss-azimuth").value'), '15');
  const gnssCluster = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(7) td:last-child").textContent');
  assert.notEqual(gnssCluster, gnssBefore, 'clustered satellites must change DOP');
  await evalJS(`document.querySelector('#c-gnss-clock').value='-75';
    document.querySelector('#c-gnss-clock').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-results tbody tr:nth-child(7) td:last-child").textContent'),
    gnssCluster, 'clock bias alone must not change DOP');
  const clockRow = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(4) td").textContent');
  assert.ok(clockRow.trim().startsWith('-') && clockRow.includes('ns'),
    'negative synthetic receiver clock shift must be recovered: ' + clockRow);
  await evalJS(`document.querySelector('#c-gnss-count').value='3';
    document.querySelector('#c-gnss-count').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'true');
  assert.equal(await evalJS('document.querySelector("#c-gnss-map").childElementCount'), 0);
  await evalJS(`document.querySelector('#c-gnss-count').value='6';
    document.querySelector('#c-gnss-count').dispatchEvent(new Event('input'))`);
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  const noErrorPosition = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(2) td").textContent');
  await evalJS(`document.querySelector('#c-gnss-stage').value='all';
    document.querySelector('#c-gnss-stage').dispatchEvent(new Event('input'))`);
  const rawErrorPosition = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(2) td").textContent');
  assert.notEqual(rawErrorPosition, noErrorPosition,
    'satellite-specific clock and atmospheric terms must bias the raw position');
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("衛星別：時計")'));
  await evalJS(`document.querySelector('#c-gnss-correction').value='ideal';
    document.querySelector('#c-gnss-correction').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-results tbody tr:nth-child(2) td").textContent'),
    noErrorPosition, 'ideal subtraction of invented terms should recover the baseline');

  const dopBeforeRotate = await evalJS('document.querySelector("#geod-results tbody tr:nth-child(7) td").textContent');
  await evalJS(`document.querySelector('#c-gnss-view').value='space';
    document.querySelector('#c-gnss-view').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#c-gnss-space-panel").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#c-gnss-panel").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#c-gnss-gl-wrap").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#c-gnss-space-map").hidden'), true);
  const renderInfo = await evalJS(`(() => {
    const c = document.querySelector('#c-gnss-space-canvas');
    const gl = c.getContext('webgl2');
    const pixel = new Uint8Array(4);
    gl.readPixels(Math.floor(c.width * 0.5), Math.floor(c.height * (1 - 270 / 470)),
      1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    window.__geodGnss3dFrame = c.toDataURL();
    window.__geodGnss3dLabels = document.querySelector('#c-gnss-space-labels').toDataURL();
    return { width: c.width, height: c.height, pixel: [...pixel], error: gl.getError(),
      selection: getComputedStyle(c).userSelect,
      labelLength: window.__geodGnss3dLabels.length };
  })()`);
  assert.ok(renderInfo.width >= 200 && renderInfo.height >= 140 &&
    renderInfo.error === 0 && renderInfo.selection === 'none' &&
    renderInfo.labelLength > 1500 && renderInfo.pixel[3] === 255 &&
    Math.min(...renderInfo.pixel.slice(0, 3)) < 200,
  'shaded 3D WebGL pixels, canvas labels and non-selectable interaction: ' + JSON.stringify(renderInfo));
  await evalJS(`document.querySelector('#c-gnss-view-azimuth').value='145';
    document.querySelector('#c-gnss-view-azimuth').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('window.__geodGnss3dFrame !== document.querySelector("#c-gnss-space-canvas").toDataURL()'),
    true, 'camera control must change rendered WebGL geometry');
  assert.equal(await evalJS('window.__geodGnss3dLabels !== document.querySelector("#c-gnss-space-labels").toDataURL()'),
    true, 'satellite labels rotate with the 3D scene');
  assert.equal(await evalJS('document.querySelector("#geod-results tbody tr:nth-child(7) td").textContent'),
    dopBeforeRotate, 'rotating the view must leave DOP unchanged');
  const perspectiveLayout = await evalJS(`(() => {
    const map = document.querySelector('#c-gnss-gl-wrap').getBoundingClientRect();
    return { width: map.width, height: map.height };
  })()`);
  assert.ok(perspectiveLayout.width > 200 && perspectiveLayout.width <= 861,
    '3D schematic should occupy a readable, bounded desktop area: ' +
    JSON.stringify(perspectiveLayout));
  await evalJS(`document.querySelector('#c-gnss-view').value='sky';
    document.querySelector('#c-gnss-view').dispatchEvent(new Event('input'))`);
  // Gravity/height comparison: 2D section stays usable with its own kernel.
  await evalJS(`document.querySelector('#c-mode').value='height';
    document.querySelector('#c-mode').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#c-height-panel").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#c-survey-controls").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#c-gnss-controls").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#c-gnss-panel").hidden'), true);
  assert.equal(await evalJS('document.querySelector("#geod-globe-panel").hidden'), true);
  assert.ok(await evalJS('document.querySelectorAll("#c-height-map line").length >= 22'));
  const heightRow = () => evalJS('document.querySelector("#geod-results tbody tr:nth-child(4) td").textContent');
  assert.match(await heightRow(), /88\.200/);
  const heightBefore = await heightRow();
  const hLayout = await workspaceLayout('C', '#c-height-map');
  assertSideBySide(hLayout);
  assert.ok(hLayout.visual.width > 200 && hLayout.visual.width <= 861);
  const selectStyle = await evalJS(`(() => ({
    svg:getComputedStyle(document.querySelector('#c-height-map')).userSelect,
    labels:getComputedStyle(document.querySelector('#c-height-map text')).userSelect
  }))()`);
  assert.deepEqual(selectStyle, { svg: 'none', labels: 'none' },
    'height section SVG and labels should not select text');
  await evalJS(`document.querySelector('#c-height-na').value='-12';
    document.querySelector('#c-height-na').dispatchEvent(new Event('input'))`);
  assert.notEqual(await heightRow(), heightBefore, 'negative N changes H');
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("ΔH = Δh − ΔN")'));
  await evalJS(`document.querySelector('#c-height-ga').value='0';
    document.querySelector('#c-height-ga').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'true');
  assert.equal(await evalJS('document.querySelector("#c-height-map").childElementCount'), 0);
  await evalJS(`document.querySelector('#c-height-ga').value='9.8';
    document.querySelector('#c-height-ga').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'false');
  await evalJS(`document.querySelector('[data-lab="D"]').click();
    document.querySelector('#d-city').value='new-york';
    document.querySelector('#d-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#d-lon0").value'), '-74.006');
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  await evalJS(`document.querySelector('#d-copy-to-inverse').click()`);
  assert.ok(await evalJS(`document.querySelector('#d-inverse-e').value.length > 0 &&
    document.querySelector('#d-inverse-n').value.length > 0`));
  assert.ok(await evalJS(`document.querySelector('#geod-results').textContent.includes('往復残差')`));
  await evalJS(`document.querySelector('#d-inverse-e').value='999999999';
    document.querySelector('#d-inverse-e').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'true');
  await evalJS(`document.querySelector('#d-inverse-e').value='';
    document.querySelector('#d-inverse-n').value='';
    document.querySelector('#d-inverse-e').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#geod-status").dataset.error'), 'false');
  const dLayout = await workspaceLayout('D', '#map');
  assertSideBySide(dLayout);
  assert.equal(dLayout.lab, 'D');
  assert.ok(dLayout.visual.top < dLayout.globe.top && dLayout.visual.width > dLayout.globe.width,
    'D must prioritize the projected map and keep the globe secondary: ' + JSON.stringify(dLayout));
  assert.ok(dLayout.visual.width <= 861,
    'D local map should not stretch over a full widescreen: ' + JSON.stringify(dLayout));
  assert.equal(await evalJS('document.querySelector("#globe").width'), 1200);
  await evalJS(`document.querySelector('[data-lab="E"]').click();
    document.querySelector('#e-city').value='paris';
    document.querySelector('#e-city').dispatchEvent(new Event('change'))`);
  assert.equal(await evalJS('document.querySelector("#e-lat").value'), '48.8566');
  assert.ok(await evalJS(`document.querySelectorAll('#e-left-map path').length >= 20 &&
    document.querySelectorAll('#e-right-map path').length >= 20`));
  assert.ok(await evalJS('document.querySelector("#geod-status").textContent.includes("計算済み")'));
  assert.ok(await evalJS(`document.querySelector('#geod-results').textContent.includes('正積緯度 β') &&
    document.querySelector('#geod-results').textContent.includes('地上1 km²')`));
  const eLayout = await workspaceLayout('E', '#e-left-map');
  assertSideBySide(eLayout);
  assert.ok(eLayout.visual.top < eLayout.globe.top,
    'E comparison maps should precede the supporting globe: ' + JSON.stringify(eLayout));
  await evalJS(`document.querySelector('#e-right').value='mollweide';
    document.querySelector('#e-right').dispatchEvent(new Event('input'))`);
  assert.ok(await evalJS('document.querySelector("#e-right-title").textContent.includes("Mollweide")'));
  await evalJS(`document.querySelector('#show-world').checked=true;
    document.querySelector('#show-world').dispatchEvent(new Event('change'));
    document.querySelector('[data-lab="F"]').click()`);
  assert.equal(await evalJS('document.querySelector("#globe-zoom").value'), '4');
  assert.equal(await evalJS('document.querySelector("#globe-zoom").max'), '12');
  assert.equal(await evalJS('document.querySelector("#gsi-credit").hidden'), false);
  const japanZoom = await evalJS(`(() => {
    document.querySelector('#globe-zoom').value='12';
    document.querySelector('#globe-zoom').dispatchEvent(new Event('input'));
    const gl = document.querySelector('#globe').getContext('webgl2');
    return { text:document.querySelector('#globe-zoom-v').textContent,
      status:document.querySelector('#tile-status').textContent, error:gl.getError() };
  })()`);
  assert.equal(japanZoom.text, '1200%');
  assert.match(japanZoom.status, /地理院標準地図.*XYZズーム6/);
  assert.equal(japanZoom.error, 0, JSON.stringify(japanZoom));
  assert.equal(await evalJS('document.querySelector("#f-zone option").value'), '1');
  assert.equal(await evalJS('document.querySelectorAll("#f-zone option").length'), 19);
  assert.equal(await evalJS('document.querySelector("#globe-point-zone-wrap").hidden'), false);
  assert.equal(await evalJS('document.querySelector("#f-map-panel").hidden'), false);
  assert.ok(await evalJS('document.querySelectorAll("#f-map path").length >= 14'));
  const fLayout = await workspaceLayout('F', '#f-map');
  assertSideBySide(fLayout);
  assert.ok(fLayout.visual.top < fLayout.globe.top && fLayout.visual.width > fLayout.globe.width,
    'F Japanese plane coordinate plot should precede supporting globe: ' + JSON.stringify(fLayout));
  assert.ok(fLayout.visual.width <= 861,
    'F regional map should not stretch over a full widescreen: ' + JSON.stringify(fLayout));
  assert.ok(await evalJS('document.querySelector("#geod-results").textContent.includes("EPSG:6677")'));
  assert.ok(await evalJS(`document.querySelector('#geod-results').textContent.includes('法定適用区域の自動照合') &&
    document.querySelector('#geod-results').textContent.includes('中央子午線から±3°以内')`));
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
    const controls = document.querySelector('#lab-F').getBoundingClientRect();
    const output = document.querySelector('.geod-output-panel').getBoundingClientRect();
    return { globe: globe.width, controlsBottom: controls.bottom, outputTop: output.top };
  })()`);
  assert.ok(mobileLayout.outputTop >= mobileLayout.controlsBottom,
    'GEOD mobile workspace must stack parameters above figures: ' + JSON.stringify(mobileLayout));
  assert.ok(mobileLayout.globe > 0 && mobileLayout.globe < 360,
    'mobile globe should fit the viewport: ' + JSON.stringify(mobileLayout));
  await evalJS(`document.querySelector('[data-lab="C"]').click();
    document.querySelector('#c-mode').value='survey';
    document.querySelector('#c-mode').dispatchEvent(new Event('input'))`);
  assert.equal(await evalJS('document.querySelector("#c-map-panel").hidden'), false);
  const cMobile = await evalJS(`(() => {
    const controls = document.querySelector('#lab-C').getBoundingClientRect();
    const output = document.querySelector('.geod-output-panel').getBoundingClientRect();
    const diagram = document.querySelector('#c-map').getBoundingClientRect();
    return { controlsBottom: controls.bottom, outputTop: output.top,
      width: diagram.width, overflow: document.documentElement.scrollWidth - window.innerWidth };
  })()`);
  assert.ok(cMobile.outputTop >= cMobile.controlsBottom && cMobile.width < 360 &&
    cMobile.overflow <= 1, 'C mobile survey panel should stack without overflow: ' + JSON.stringify(cMobile));
  await evalJS(`document.querySelector('#c-mode').value='gnss';
    document.querySelector('#c-mode').dispatchEvent(new Event('input'))`);
  const gnssMobile = await evalJS(`(() => {
    const controls = document.querySelector('#lab-C').getBoundingClientRect();
    const output = document.querySelector('.geod-output-panel').getBoundingClientRect();
    const sky = document.querySelector('#c-gnss-map').getBoundingClientRect();
    return { controlsBottom: controls.bottom, outputTop: output.top,
      width: sky.width, overflow: document.documentElement.scrollWidth - window.innerWidth };
  })()`);
  assert.ok(gnssMobile.outputTop >= gnssMobile.controlsBottom && gnssMobile.width < 360 &&
    gnssMobile.overflow <= 1, 'C mobile GNSS sky view must stack: ' + JSON.stringify(gnssMobile));
  await evalJS(`document.querySelector('#c-gnss-view').value='space';
    document.querySelector('#c-gnss-view').dispatchEvent(new Event('input'))`);
  const gnss3dMobile = await evalJS(`(() => {
    const sky3d = document.querySelector('#c-gnss-gl-wrap').getBoundingClientRect();
    const camera = document.querySelector('#c-gnss-camera-controls').getBoundingClientRect();
    return { width: sky3d.width, cameraWidth: camera.width,
      overflow: document.documentElement.scrollWidth - window.innerWidth };
  })()`);
  assert.ok(gnss3dMobile.width < 360 && gnss3dMobile.cameraWidth < 360 &&
    gnss3dMobile.overflow <= 1, '3D sky/rotation controls should fit 360px: ' +
    JSON.stringify(gnss3dMobile));
  await evalJS(`document.querySelector('#c-mode').value='height';
    document.querySelector('#c-mode').dispatchEvent(new Event('input'))`);
  const heightMobile = await evalJS(`(() => {
    const controls = document.querySelector('#lab-C').getBoundingClientRect();
    const output = document.querySelector('.geod-output-panel').getBoundingClientRect();
    const section = document.querySelector('#c-height-map').getBoundingClientRect();
    return { controlsBottom: controls.bottom, outputTop: output.top,
      width: section.width, overflow: document.documentElement.scrollWidth - window.innerWidth };
  })()`);
  assert.ok(heightMobile.outputTop >= heightMobile.controlsBottom &&
    heightMobile.width > 0 && heightMobile.width < 360 && heightMobile.overflow <= 1,
    'gravity/height section should stack at 360px: ' + JSON.stringify(heightMobile));
  console.log('GEOD WebGL2: shading, desktop two-column workspace, projection-first maps, Japan detail zoom, 360px: PASS');
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

