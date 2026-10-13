// Real Chromium smoke test for the assembled Pages simulation.
// Uses the built-in Node WebSocket/CDP APIs; no Playwright dependency.
// Run after npm run validate:pages has produced _site/.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { join } from "node:path";

const root = join(process.cwd(), "_site");
const chrome = [
  process.env.CHROME_BIN, "/usr/bin/google-chrome", "/usr/bin/chromium",
  "/usr/bin/chromium-browser", "/opt/google/chrome/chrome",
].find((candidate) => candidate && existsSync(candidate));
if (!chrome) throw new Error("Chromium/Chrome is required for browser smoke tests");

const mime = (name) => name.endsWith(".html") ? "text/html" :
  name.endsWith(".css") ? "text/css" :
  /\.(?:mjs|js)$/.test(name) ? "text/javascript" :
  name.endsWith(".json") ? "application/json" : "text/plain";
let acceptanceRevision = "first";
const server = createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (name === "/simulation/acceptance-cache.txt") {
      res.writeHead(200, { "content-type": "text/plain", "cache-control": "no-store" });
      res.end(acceptanceRevision); return;
    }
    const target = path.resolve(root, "." + name);
    if (!target.startsWith(root + path.sep)) {
      res.writeHead(403); res.end(); return;
    }
    const data = await readFile(target);
    res.writeHead(200, { "content-type": mime(name), "cache-control": "no-store" });
    res.end(data);
  } catch (error) {
    res.writeHead(404); res.end(String(error.message));
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = "http://127.0.0.1:" + server.address().port + "/simulation/index.html";
const profile = await mkdtemp(join(tmpdir(), "dt-simulation-"));
const browser = spawn(chrome, [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
  "--no-first-run", "--disable-extensions", "--remote-allow-origins=*",
  "--remote-debugging-port=0", "--user-data-dir=" + profile, address,
], { stdio: "ignore" });
let ws = null;
try {
  let port = null;
  for (let i = 0; i < 100; i++) {
    try {
      port = Number((await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0]);
      if (port) break;
    } catch { /* Chrome has not initialized yet */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(port, "Chrome did not start DevTools");
  let target = null;
  for (let i = 0; i < 100; i++) {
    const pages = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
    target = pages.find((page) => page.type === "page" && page.url.startsWith(address));
    if (target) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(target, "Simulation page not found in Chromium");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  const exceptions = [];
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") {
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
  const evaluate = async (expression) => {
    const reply = await cdp("Runtime.evaluate", {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (reply.exceptionDetails) throw new Error(JSON.stringify(reply.exceptionDetails));
    return reply.result?.value;
  };
  const waitFor = async (expression) => {
    for (let i = 0; i < 120; i++) {
      const value = await evaluate(expression);
      if (value) return value;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Browser condition timed out: " + expression);
  };
  await cdp("Runtime.enable");
  await cdp("Page.enable");
  await waitFor('document.querySelector("#diagnostics td")?.textContent === "stepIndex"');
  const energy = 'Number([...document.querySelectorAll("#diagnostics tr")].find(x => x.cells[0]?.textContent === "energy")?.cells[1]?.textContent)';
  assert.ok(Math.abs(await evaluate(energy) + 0.5) < 1e-14);
  await evaluate('document.querySelector("#run").click()');
  await waitFor('document.querySelector("#diagnostics")?.textContent.includes("100")');
  await evaluate('document.querySelector("#separation").value="2";document.querySelector("#reset").click()');
  await waitFor('Math.abs(' + energy + ' + 0.25) < 1e-12');
  await evaluate('document.querySelector("#experiment").value="ml";document.querySelector("#experiment").dispatchEvent(new Event("change"))');
  await waitFor('document.querySelector("#diagnostics")?.textContent.includes("populationRisk")');
  const risk = 'Number([...document.querySelectorAll("#diagnostics tr")].find(x => x.cells[0]?.textContent === "populationRisk")?.cells[1]?.textContent)';
  assert.equal(await evaluate(risk), 0.2);
  const before = await evaluate('document.querySelector("#diagnostics")?.textContent');
  await evaluate('document.querySelector("#sample").click()');
  await waitFor('document.querySelector("#status")?.textContent.includes("抽出完了")');
  assert.equal(await evaluate(risk), 0.2);
  assert.equal(await evaluate('document.querySelector("#diagnostics")?.textContent'), before);
  await cdp("Page.reload", { ignoreCache: false });
  await waitFor('document.querySelector("#status")?.textContent.includes("計算完了")');

  // The standalone page must install and control the root-scoped Service
  // Worker itself. A prior visit to the main Docsify shell is not assumed.
  await waitFor('Boolean(navigator.serviceWorker?.controller)');
  const shellCached = await waitFor(`(async () => {
    const keys = await caches.keys();
    const cacheName = keys.find((key) => key.startsWith("toukei-grade1-runtime-"));
    if (!cacheName) return false;
    const cache = await caches.open(cacheName);
    const names = [
      "simulation/index.html",
      "simulation/simulation-worker-host.mjs",
      "simulation/engines/celev/two-body.mjs",
      "simulation/engines/ml/four-cell.mjs",
    ];
    for (const relative of names) {
      if (!await cache.match(new URL("/" + relative, location.origin))) return false;
    }
    return true;
  })()`);
  assert.ok(shellCached, "Service Worker shell is not cached after direct entry");
  const asset = 'new URL("./acceptance-cache.txt", location.href).href';
  const fetchRevision = 'fetch(' + asset + ').then((r) => r.text())';
  assert.equal(await evaluate(fetchRevision), "first");
  acceptanceRevision = "updated";
  assert.equal(await evaluate(fetchRevision), "updated",
    "online network-first must refresh cached same-origin assets");
  await cdp("Network.enable");
  await cdp("Network.emulateNetworkConditions", {
    offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0,
  });
  assert.equal(await evaluate(fetchRevision), "updated",
    "offline fetch must read the last successfully refreshed cached version");
  await cdp("Page.reload", { ignoreCache: true });
  await waitFor('document.querySelector("#diagnostics td")?.textContent === "stepIndex"');
  assert.ok(Math.abs(await evaluate(energy) + 0.5) < 1e-14,
    "offline reload must restart a real computation via the cached module Worker");
  await evaluate('document.querySelector("#step").click()');
  const stepNumber = 'Number([...document.querySelectorAll("#diagnostics tr")].find(x => x.cells[0]?.textContent === "stepIndex")?.cells[1]?.textContent)';
  await waitFor(stepNumber + ' === 1');
  const offlineMiss = await evaluate('fetch("./not-pre-cached.txt").then(()=>false,()=>true)');
  assert.equal(offlineMiss, true, "uncached offline resources must not appear successful");
  await cdp("Network.emulateNetworkConditions", {
    offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
  });

  // Real Worker calculation all the way to the resource limit, without
  // allocating 100,000 DOM rows. Values are computed, not a recorded movie.
  const longStarted = Date.now();
  const long = await evaluate(`(async () => {
    const { SimulationClient } = await import("./simulation-runtime.mjs");
    const client = new SimulationClient("celev-two-body-verlet-v1",
      "celev-two-body-circular-v1", { timeoutMs: 15000 });
    try {
      await client.initialize({ mass: 1, separation: 1,
        gravitationalConstant: 1, dt: 0.01 }, 123);
      let last;
      for (let i = 0; i < 100; i++) last = await client.runBatch(1000);
      if (last.stepIndex !== 100000) return { error: "incorrect step count" };
      try {
        await client.runBatch(1);
        return { error: "resource limit missing" };
      } catch (err) {
        return { stepIndex: last.stepIndex,
          limit: String(err).includes("RESOURCE_LIMIT"),
          energyFinite: Number.isFinite(last.diagnostics.energy) };
      }
    } finally {
      client.dispose();
    }
  })()`);
  assert.equal(long?.stepIndex, 100000, JSON.stringify(long));
  assert.equal(long.limit, true, "step 100001 must be rejected");
  assert.equal(long.energyFinite, true, "long-run diagnostics must remain finite");
  const longMs = Date.now() - longStarted;
  assert.ok(longMs < 30000, "long run exceeded CI budget: " + longMs);

  // Exercise pause, resume, cancel and reinitialize through actual buttons.
  await evaluate('document.querySelector("#play").click()');
  await waitFor(stepNumber + ' >= 501');
  await evaluate('document.querySelector("#pause").click()');
  await waitFor('document.querySelector("#status").textContent.includes("一時停止") || document.querySelector("#status").textContent.includes("停止しました")');
  const pausedAt = await evaluate(stepNumber);
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.equal(await evaluate(stepNumber), pausedAt, "paused simulation still advances");
  await evaluate('document.querySelector("#resume").click()');
  await waitFor(stepNumber + ' >= ' + (pausedAt + 100));
  await evaluate('document.querySelector("#cancel").click()');
  await waitFor('document.querySelector("#status").textContent.includes("Workerを終了")');
  await evaluate('document.querySelector("#reset").click()');
  await waitFor(stepNumber + ' === 0');
  assert.equal(await evaluate('document.querySelector("#status").dataset.error'), "false");

  // Four-fold CPU throttle and narrow screen are an *emulation*, not a real
  // low-power handset benchmark. Record latency, reject unresponsive controls.
  await cdp("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp("Emulation.setDeviceMetricsOverride", {
    width: 360, height: 760, deviceScaleFactor: 1, mobile: true,
  });
  const lowStart = Date.now();
  await evaluate('document.querySelector("#run").click()');
  await waitFor(stepNumber + ' === 100');
  const throttledMs = Date.now() - lowStart;
  assert.ok(throttledMs < 15000, "throttled UI unresponsive: " + throttledMs);
  const overflow = await evaluate('document.documentElement.scrollWidth - window.innerWidth');
  assert.ok(overflow <= 1, "360px viewport has horizontal overflow: " + overflow);

  // Label binding, live status, independent numeric table and keyboard action.
  const accessibility = await evaluate(`(() => ({
    unlabeled: [...document.querySelectorAll("input,select")].filter((el) =>
      !el.labels?.length).map((el) => el.id),
    headings: [...document.querySelectorAll("h1,h2")].map((el) => el.tagName),
    status: document.querySelector("#status").getAttribute("aria-live"),
    plot: document.querySelector("#plot").getAttribute("aria-describedby"),
    table: !!document.querySelector("#diagnostics table"),
    meaning: document.querySelector("#legend").textContent.includes("実線") &&
      document.querySelector("#legend").textContent.includes("破線"),
  }))()`);
  assert.deepEqual(accessibility.unlabeled, [], "form inputs need accessible names");
  assert.equal(accessibility.headings[0], "H1");
  assert.equal(accessibility.status, "polite");
  assert.ok(accessibility.plot.includes("legend"));
  assert.ok(accessibility.table && accessibility.meaning);
  // Hardware-keyboard activation is tested in desktop emulation. Chromium
  // mobile input emulation can route Enter through a virtual IME instead.
  await cdp("Emulation.setCPUThrottlingRate", { rate: 1 });
  await cdp("Emulation.clearDeviceMetricsOverride");
  await evaluate('document.querySelector("#step").focus()');
  assert.equal(await evaluate('document.activeElement.id'), "step");
  await cdp("Input.dispatchKeyEvent", {
    type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13,
  });
  await cdp("Input.dispatchKeyEvent", {
    type: "char", text: "\r", key: "Enter", windowsVirtualKeyCode: 13,
  });
  await cdp("Input.dispatchKeyEvent", {
    type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13,
  });
  try {
    await waitFor(stepNumber + ' === 101');
  } catch (error) {
    throw new Error(error.message + "; keyboard state: " +
      JSON.stringify(await evaluate('({step: ' + stepNumber +
        ', focused: document.activeElement.id, status: document.querySelector("#status").textContent})')));
  }

  console.log(JSON.stringify({
    test: "simulation-phase1-acceptance", status: "PASS",
    cachedShell: shellCached, cacheNetworkRefresh: "first→updated→offline updated",
    offlineRevisit: true, longRunSteps: long.stepIndex, limitRejected: long.limit,
    longRunMs: longMs, emulatedCpuSlowdown: "4x",
    emulatedViewport: "360x760", throttledStep100Ms: throttledMs,
    maxHorizontalOverflowPx: overflow, keyboardStep: true,
    accessibilityLabels: "all associated",
    note: "CPU throttling is not evidence of physical device performance",
  }));

  assert.equal(exceptions.length, 0, "Browser script exceptions: " + exceptions.join("; "));
  console.log("Simulation Chromium smoke: CELEV, parameter reset, ML seed, reload: PASS");
} finally {
  if (ws) ws.close();
  browser.kill("SIGKILL");
  server.close();
  // Chromium may still be flushing its profile after SIGKILL; retry ENOTEMPTY races.
  await rm(profile, { recursive: true, force: true, maxRetries: 20, retryDelay: 150 });
}
