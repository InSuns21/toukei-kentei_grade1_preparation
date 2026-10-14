// CELEV8: persistent Pyodide Newton/variational engine.
// The version-1 envelope follows the shared simulation protocol. Math lives
// exclusively in the Python kernel; JavaScript only hosts and transports.
import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";
import { validateEnvelope, assertJsonSnapshot, DEFAULT_LIMITS } from "./protocol.mjs";

const KERNEL_URL = new URL("./engines/celev/celev_kernel.py", import.meta.url);
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
export const engineId = "celev-python-nbody-v1";
export const experimentId = "celev-variational-orbits-v1";
let pyodidePromise = null;
let generation = -1, session = "", mode = "idle", totalSteps = 0, currentMode = "";
let busy = false;

const PYTHON_RUNNER = String.raw`
import json
import celev_kernel as ce
_req = json.loads(__celev_request_json)
_type = _req["type"]
if _type == "initialize":
    _p = _req["params"]
    if _p["mode"] == "physics":
        _state = ce.initialize(kind=_p["orbit"], dt=_p["dt"],
            mass_scale=_p["massScale"], velocity_scale=_p["velocityScale"],
            gravitational_constant=_p["G"])
        _diag = ce.diagnostics(_state)
        _diag["energyDrift"] = 0.0
        _diag["closurePosition"] = 0.0
        _diag["closureVelocity"] = 0.0
        _output = {"snapshot": {"positions": _state["positions"],
                    "velocities": _state["velocities"],
                    "stepIndex": 0, "physicalTime": 0.0,
                    "referencePeriod": _state["referencePeriod"]},
                   "diagnostics": _diag, "observations": []}
    else:
        _period = _p["period"]
        _path = ce.initial_path(N=_p["N"], amplitude_x=_p["ampX"],
                                amplitude_y=_p["ampY"], phase=_p["phase"])
        _output = {"snapshot": {"positions": _path[0], "curve": [f[0] for f in _path],
                    "stepIndex": 0, "physicalTime": None},
                   "diagnostics": {"action": ce.action(_path, _period),
                    "minimumDistance": min(ce.minimum_distance(f) for f in _path),
                    "constraintViolation": ce.max_constraint_violation(_path),
                    "newtonResidual": ce.discrete_newton_residual(_path, _period)},
                   "observations": []}
elif _type == "runBatch":
    if _req["mode"] == "physics":
        _result = ce.integrate_batch(_state, _req["steps"])
        _state = _result["state"]
        _output = {"snapshot": {
            "positions": _state["positions"], "velocities": _state["velocities"],
            "stepIndex": _state["stepIndex"],
            "physicalTime": _state["physicalTime"],
            "referencePeriod": _state["referencePeriod"]},
            "diagnostics": _result["diagnostics"],
            "observations": _result["observations"]}
    else:
        _result = ce.optimize_batch(_path, _period, _req["steps"])
        _path = _result["path"]
        _output = {"snapshot": {"positions": _path[0],
            "curve": [f[0] for f in _path], "stepIndex": _req["totalSteps"],
            "physicalTime": None},
            "diagnostics": {k: v for k,v in _result.items() if k not in ("path", "history")},
            "observations": _result["history"]}
else:
    raise ValueError("unsupported kernel request")
__celev_result_json = json.dumps(_output, allow_nan=False)
`;

function identity(req) {
  return { protocolVersion: 1, sessionId: req.sessionId, requestId: req.requestId,
    generation: req.generation, engineId: req.engineId, experimentId: req.experimentId };
}
function send(req, type, extras = {}) {
  const response = { ...identity(req), type, ...extras };
  assertJsonSnapshot(response);
  self.postMessage(response);
}
function error(req, cause) {
  const message = String(cause?.message || cause).slice(0, 300);
  const safeReq = {
    sessionId: /^[\w.:-]{1,128}$/.test(req?.sessionId) ? req.sessionId : "invalid",
    requestId: /^[\w.:-]{1,128}$/.test(req?.requestId) ? req.requestId : "invalid",
    engineId: /^[\w.:-]{1,128}$/.test(req?.engineId) ? req.engineId : "invalid",
    experimentId: /^[\w.:-]{1,128}$/.test(req?.experimentId) ? req.experimentId : "invalid",
    generation: Number.isSafeInteger(req?.generation) && req.generation >= 0 ? req.generation : 0,
  };
  send(safeReq, "error", { errorCode: /collision/i.test(message) ? "COLLISION" :
    /resource|steps|batch/i.test(message) ? "RESOURCE_LIMIT" : "ENGINE_ERROR",
    message, retryable: false });
}
function checkParams(p) {
  if (!p || !["physics", "variational"].includes(p.mode)) throw new RangeError("invalid mode");
  if (p.mode === "physics") {
    if (!["two-body", "triangle", "figure-eight"].includes(p.orbit)) throw new RangeError("orbit");
    for (const name of ["dt", "G", "massScale", "velocityScale"]) {
      if (!Number.isFinite(p[name]) || p[name] <= 0) throw new RangeError(name);
    }
    if (p.dt > 0.05 || p.G > 10 || p.massScale > 10 || p.velocityScale > 4) {
      throw new RangeError("parameter exceeds safety bound");
    }
  } else {
    if (!Number.isSafeInteger(p.N) || p.N < 12 || p.N > 120 || p.N % 6) throw new RangeError("N");
    for (const name of ["period", "ampX", "ampY", "phase"]) {
      if (!Number.isFinite(p[name])) throw new RangeError(name);
    }
    if (p.period < 1 || p.period > 20 ||
        Math.abs(p.ampX) < 0.1 || Math.abs(p.ampX) > 3 ||
        Math.abs(p.ampY) < 0.1 || Math.abs(p.ampY) > 3 ||
        Math.abs(p.phase) > Math.PI) throw new RangeError("variational parameter out of range");
  }
}
async function ensurePython() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const runtime = await loadPyodide({ indexURL: PYODIDE_URL });
      const response = await fetch(KERNEL_URL, { cache: "no-cache" });
      if (!response.ok) throw new Error("Python kernel unavailable (check online/cache)");
      runtime.FS.writeFile("/home/pyodide/celev_kernel.py", await response.text());
      runtime.runPython("import celev_kernel");
      return runtime;
    })();
  }
  return pyodidePromise;
}
async function kernel(req) {
  const pyodide = await ensurePython();
  pyodide.globals.set("__celev_request_json", JSON.stringify(req));
  await pyodide.runPythonAsync(PYTHON_RUNNER);
  const value = pyodide.globals.get("__celev_result_json");
  const result = JSON.parse(value);
  assertJsonSnapshot(result);
  return result;
}
async function dispatch(req) {
  if (busy) { error(req, new Error("Worker busy: wait for batch boundary")); return; }
  busy = true;
  try {
    const valid = validateEnvelope(req);
    if (!valid.ok) throw new Error(valid.errors.join("; "));
    if (req.engineId !== engineId || req.experimentId !== experimentId) {
      throw new Error("wrong engine");
    }
    if (req.type === "initialize") {
      if (req.generation <= generation) throw new Error("stale generation");
      checkParams(req.params);
      const payload = await kernel({ type: "initialize", params: req.params });
      generation = req.generation; session = req.sessionId;
      currentMode = req.params.mode; totalSteps = 0; mode = "ready";
      send(req, "ready", payload);
    } else {
      if (req.generation !== generation || req.sessionId !== session) {
        throw new Error("stale generation/session");
      }
      if (["runBatch", "singleStep"].includes(req.type)) {
        if (mode !== "ready") throw new Error("not ready");
        const steps = req.type === "singleStep" ? 1 : req.steps;
        if (steps > (currentMode === "variational" ? 30 : DEFAULT_LIMITS.maxBatchSteps) ||
            totalSteps + steps > DEFAULT_LIMITS.maxTotalSteps) throw new Error("resource limit");
        const payload = await kernel({ type: "runBatch", mode: currentMode,
          steps, totalSteps: totalSteps + steps });
        totalSteps += steps;
        send(req, "result", payload);
      } else if (req.type === "pause" && mode === "ready") {
        mode = "paused"; send(req, "paused");
      } else if (req.type === "resume" && mode === "paused") {
        mode = "ready"; send(req, "running");
      } else if (req.type === "dispose") {
        mode = "disposed"; send(req, "disposed"); self.close();
      } else {
        throw new Error("unsupported transition");
      }
    }
  } catch (cause) {
    if (req?.type === "initialize") {
      // A cold-load network failure may be transient; new client terminates
      // this Worker before trying again.
      mode = "error";
    }
    error(req, cause);
  } finally { busy = false; }
}
self.addEventListener("message", (event) => { void dispatch(event.data); });
