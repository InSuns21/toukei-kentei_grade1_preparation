// Run the actual browser Worker module inside a Node worker_thread. The same
// addEventListener/postMessage entrypoint is used; only the global bridge differs.
import { parentPort } from "node:worker_threads";

globalThis.self = {
  addEventListener(type, fn) {
    if (type === "message") parentPort.on("message", (data) => fn({ data }));
  },
  postMessage(data) { parentPort.postMessage(data); },
};
await import("../pages/simulation/simulation-worker-host.mjs");
