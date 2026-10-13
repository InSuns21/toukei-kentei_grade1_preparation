import { DEFAULT_LIMITS, matchesPendingResponse } from "./protocol.mjs";

// Browser Worker client: strictly one in-flight message, bounded deadline,
// explicit generation rollover on reset/cancel, and terminal dispose.
export class SimulationClient {
  constructor(engineId, experimentId, options = {}) {
    this.engineId = engineId;
    this.experimentId = experimentId;
    this.sessionId = "sim-" + Math.random().toString(36).slice(2);
    this.generation = 0;
    this.sequence = 0;
    this.state = "idle";
    this.lastResult = null;
    this.onUpdate = options.onUpdate ?? (() => {});
    this.workerFactory = options.workerFactory ??
      (() => new Worker(new URL("./simulation-worker-host.mjs", import.meta.url), { type: "module" }));
    this.timeoutMs = options.timeoutMs ?? 10000;
    this.worker = null;
    this.pending = null;
  }

  ensureWorker() {
    if (this.worker) return;
    const worker = this.workerFactory();
    worker.addEventListener("message", (event) => {
      const pending = this.pending;
      if (!pending || !matchesPendingResponse(event.data, pending.request)) return;
      const payload = event.data;
      if (payload.type === "progress") return;
      clearTimeout(pending.timer);
      this.pending = null;
      if (payload.type === "error") {
        this.state = "error";
        pending.reject(new Error(payload.errorCode + ": " + payload.message));
      } else {
        pending.resolve(payload);
      }
    });
    worker.addEventListener("error", (event) => {
      this.stopWorker(new Error("Worker error: " + (event.message || "unknown")));
    });
    this.worker = worker;
  }

  send(type, extra = {}) {
    if (this.pending) return Promise.reject(new Error("Worker is busy"));
    this.ensureWorker();
    const request = {
      protocolVersion: 1, type,
      sessionId: this.sessionId, requestId: "q" + (++this.sequence),
      generation: this.generation, engineId: this.engineId,
      experimentId: this.experimentId, ...extra,
    };
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.stopWorker(new Error("Worker deadline exceeded; worker terminated"));
      }, this.timeoutMs);
      this.pending = { request, resolve, reject, timer };
      try { this.worker.postMessage(request); }
      catch (error) { this.stopWorker(error); }
    });
  }

  stopWorker(error = null) {
    const pending = this.pending;
    this.pending = null;
    if (pending) {
      clearTimeout(pending.timer);
      pending.reject(error ?? new Error("Experiment superseded"));
    }
    if (this.worker) this.worker.terminate();
    this.worker = null;
    this.state = error ? "error" : "idle";
    if (error) this.onUpdate({ state: this.state, error: error.message });
  }

  async initialize(params, seed = 0) {
    if (this.state === "disposed") throw new Error("Client disposed");
    if (this.worker) this.stopWorker();
    this.generation++;
    this.state = "initializing";
    const result = await this.send("initialize", { params, seed });
    this.state = "ready"; this.lastResult = result;
    this.onUpdate({ state: this.state, result });
    return result;
  }

  async computeOnce(params, seed = 0) {
    if (this.state === "disposed") throw new Error("Client disposed");
    if (this.worker) this.stopWorker();
    this.generation++;
    this.state = "running";
    const result = await this.send("computeOnce", { params, seed });
    this.state = "ready"; this.lastResult = result;
    this.onUpdate({ state: this.state, result });
    return result;
  }

  async runBatch(steps) {
    if (this.state !== "ready") throw new Error("Experiment is not ready");
    if (!Number.isSafeInteger(steps) || steps < 1 ||
        steps > DEFAULT_LIMITS.maxBatchSteps) throw new RangeError("Invalid batch steps");
    this.state = "running";
    const result = await this.send("runBatch", { steps });
    this.state = "ready"; this.lastResult = result;
    this.onUpdate({ state: this.state, result });
    return result;
  }

  async pause() {
    if (this.state === "running" && this.pending) {
      throw new Error("Wait until the current batch boundary to pause");
    }
    if (this.state !== "ready") throw new Error("Experiment is not ready");
    const result = await this.send("pause");
    this.state = "paused"; this.onUpdate({ state: this.state });
    return result;
  }

  async resume() {
    if (this.state !== "paused") throw new Error("Experiment is not paused");
    const result = await this.send("resume");
    this.state = "ready"; this.onUpdate({ state: this.state });
    return result;
  }

  reset(params, seed = 0) { return this.initialize(params, seed); }

  cancel() {
    if (this.state === "disposed") return;
    this.generation++;
    this.stopWorker(new Error("Experiment cancelled"));
    this.state = "idle"; this.lastResult = null;
    this.onUpdate({ state: this.state });
  }

  dispose() {
    if (this.state === "disposed") return;
    this.generation++;
    this.stopWorker(new Error("Experiment disposed"));
    this.state = "disposed"; this.lastResult = null;
    this.onUpdate({ state: this.state });
  }
}
