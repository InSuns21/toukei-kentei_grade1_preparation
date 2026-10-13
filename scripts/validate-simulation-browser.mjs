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
const server = createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
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
  assert.equal(exceptions.length, 0, "Browser script exceptions: " + exceptions.join("; "));
  console.log("Simulation Chromium smoke: CELEV, parameter reset, ML seed, reload: PASS");
} finally {
  if (ws) ws.close();
  browser.kill("SIGKILL");
  server.close();
  await rm(profile, { recursive: true, force: true });
}
