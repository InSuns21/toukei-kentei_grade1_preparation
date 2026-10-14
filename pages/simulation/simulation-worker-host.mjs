import { validateEnvelope, assertJsonSnapshot, DEFAULT_LIMITS } from "./protocol.mjs";
import * as celev from "./engines/celev/two-body.mjs";
import * as burrau from "./engines/celev/burrau.mjs";
import * as gallery from "./engines/celev/orbit-gallery.mjs";
import * as ml from "./engines/ml/four-cell.mjs";

const adapters = new Map([[celev.engineId, celev], [burrau.engineId, burrau], [gallery.engineId, gallery], [ml.engineId, ml]]);
const identity = (req) => ({
  protocolVersion: 1, sessionId: req.sessionId, requestId: req.requestId,
  generation: req.generation, engineId: req.engineId, experimentId: req.experimentId,
});

// A pure dispatcher shared by the real Worker and Node integration tests.
export function createSimulationHost(post) {
  let generation = -1, mode = "idle", adapter = null, state = null;
  let session = "", engine = "", experiment = "", stepsDone = 0;
  function emit(req, type, extra = {}) {
    const msg = { ...identity(req), type, ...extra };
    assertJsonSnapshot(msg);
    post(msg);
  }
  function error(req, code, message) {
    const safe = {};
    for (const key of ["sessionId", "requestId", "engineId", "experimentId"]) {
      safe[key] = typeof req?.[key] === "string" &&
        /^[A-Za-z0-9_.:-]{1,128}$/.test(req[key]) ? req[key] : "invalid";
    }
    emit({ ...safe, generation: Number.isSafeInteger(req?.generation) &&
      req.generation >= 0 ? req.generation : 0 }, "error", {
      errorCode: code, message: String(message).slice(0, 300), retryable: false,
    });
  }
  function checkSession(req) {
    if (req.generation !== generation || req.sessionId !== session ||
        req.engineId !== engine || req.experimentId !== experiment) {
      throw new Error("STALE_SESSION");
    }
  }
  function start(req) {
    if (req.generation <= generation) throw new Error("STALE_GENERATION");
    const nextAdapter = adapters.get(req.engineId);
    if (!nextAdapter || req.experimentId !== nextAdapter.experimentId) {
      throw new Error("UNKNOWN_ENGINE");
    }
    const errors = nextAdapter.validateParameters(req.params);
    if (errors.length) throw new RangeError(errors.join("; "));
    const initial = nextAdapter.initialize?.(req.params, req.seed) ?? null;
    const snapshot = initial ? nextAdapter.snapshot(initial.state) : null;
    assertJsonSnapshot({ snapshot, diagnostics: initial?.diagnostics ?? {} });
    adapter = nextAdapter;
    state = initial?.state ?? null;
    generation = req.generation; session = req.sessionId;
    engine = req.engineId; experiment = req.experimentId;
    stepsDone = 0; mode = "ready";
    emit(req, "ready", { snapshot, diagnostics: initial?.diagnostics ?? {} });
  }
  function dispatch(req) {
    const valid = validateEnvelope(req);
    if (!valid.ok) { error(req, "INVALID_REQUEST", valid.errors.join("; ")); return; }
    if (mode === "disposed") { error(req, "DISPOSED", "Worker is disposed"); return; }
    try {
      if (["initialize", "reset", "updateParameters"].includes(req.type)) {
        start(req); return;
      }
      if (req.type === "computeOnce") {
        if (req.generation <= generation) throw new Error("STALE_GENERATION");
        const one = adapters.get(req.engineId);
        if (!one?.computeOnce || req.experimentId !== one.experimentId) {
          throw new Error("UNSUPPORTED_OPERATION");
        }
        const output = one.computeOnce(req.params, req.seed);
        assertJsonSnapshot(output);
        generation = req.generation; session = req.sessionId;
        engine = req.engineId; experiment = req.experimentId;
        adapter = one; state = null; stepsDone = 0; mode = "ready";
        emit(req, "result", { ...output, stepIndex: null }); return;
      }
      checkSession(req);
      if (["runBatch", "singleStep"].includes(req.type)) {
        if (mode !== "ready" || !adapter?.stepBatch || !state) {
          throw new Error("NOT_READY");
        }
        const n = req.type === "singleStep" ? 1 : req.steps;
        if (n > DEFAULT_LIMITS.maxBatchSteps ||
            stepsDone + n > DEFAULT_LIMITS.maxTotalSteps) {
          throw new RangeError("RESOURCE_LIMIT: too many steps");
        }
        const next = adapter.stepBatch(state, n, DEFAULT_LIMITS);
        const snapshot = adapter.snapshot(next.state);
        assertJsonSnapshot({ snapshot, observations: next.observations,
          diagnostics: next.diagnostics });
        if (next.observations.length > DEFAULT_LIMITS.maxObservations) {
          throw new RangeError("RESOURCE_LIMIT: too many observations");
        }
        // Commit only after every validation succeeds.
        state = next.state; stepsDone += n;
        emit(req, "result", { snapshot, observations: next.observations,
          diagnostics: next.diagnostics, stepIndex: snapshot.stepIndex });
        return;
      }
      if (req.type === "pause") {
        if (mode !== "ready") throw new Error("NOT_READY");
        mode = "paused"; emit(req, "paused");
      } else if (req.type === "resume") {
        if (mode !== "paused") throw new Error("NOT_PAUSED");
        mode = "ready"; emit(req, "running");
      } else if (req.type === "cancel") {
        if (!["ready", "paused"].includes(mode)) throw new Error("NOT_READY");
        mode = "ready"; emit(req, "cancelled");
      } else if (req.type === "dispose") {
        mode = "disposed"; state = null; adapter = null; emit(req, "disposed");
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : String(cause);
      const code = message.startsWith("NEAR_ENCOUNTER") || message.startsWith("ENERGY_DRIFT") ? "NUMERICAL_UNRESOLVED" :
        message.startsWith("STALE_") ? "STALE" :
        message.startsWith("RESOURCE_LIMIT") ? "RESOURCE_LIMIT" :
        cause instanceof RangeError ? "INVALID_PARAMETERS" : "ENGINE_ERROR";
      error(req, code, message);
    }
  }
  return { dispatch, status: () => mode, generation: () => generation };
}

if (typeof self !== "undefined" && typeof self.addEventListener === "function") {
  const host = createSimulationHost((response) => self.postMessage(response));
  self.addEventListener("message", (event) => host.dispatch(event.data));
}
