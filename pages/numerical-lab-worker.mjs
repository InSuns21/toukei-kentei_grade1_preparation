import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const PYODIDE_VERSION = "314.0.7";
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function ensurePyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide({ indexURL: PYODIDE_BASE_URL });
  }
  return pyodidePromise;
}

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function runJob(message) {
  const jobId = String(message.jobId || "");
  const code = String(message.code || "");
  const tests = String(message.tests || "");

  post("runtime-loading", { jobId, version: PYODIDE_VERSION });

  const pyodide = await ensurePyodide();
  await pyodide.loadPackagesFromImports(`${code}\n${tests}`);

  post("run-started", { jobId, version: PYODIDE_VERSION });

  pyodide.globals.set("__toukei_user_code", code);
  pyodide.globals.set("__toukei_test_code", tests);

  const resultJson = await pyodide.runPythonAsync(`
import base64
import contextlib
import io
import json
import sys
import traceback

_toukei_stdout = io.StringIO()
_toukei_stderr = io.StringIO()
_toukei_user_error = ""
_toukei_test_error = ""
_toukei_test_passed = None
_toukei_figures = []
_toukei_ns = {"__name__": "__main__"}

try:
    with contextlib.redirect_stdout(_toukei_stdout), contextlib.redirect_stderr(_toukei_stderr):
        exec(compile(__toukei_user_code, "<numerical-lab>", "exec"), _toukei_ns, _toukei_ns)
except BaseException:
    _toukei_user_error = traceback.format_exc()

if not _toukei_user_error and __toukei_test_code.strip():
    try:
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            exec(compile(__toukei_test_code, "<numerical-lab-test>", "exec"), _toukei_ns, _toukei_ns)
        _toukei_test_passed = True
    except BaseException:
        _toukei_test_passed = False
        _toukei_test_error = traceback.format_exc()

if not _toukei_user_error and "matplotlib.pyplot" in sys.modules:
    try:
        import matplotlib.pyplot as _toukei_plt
        for _toukei_num in _toukei_plt.get_fignums():
            _toukei_fig = _toukei_plt.figure(_toukei_num)
            _toukei_buffer = io.BytesIO()
            _toukei_fig.savefig(_toukei_buffer, format="png", bbox_inches="tight", dpi=120)
            _toukei_figures.append(
                "data:image/png;base64," +
                base64.b64encode(_toukei_buffer.getvalue()).decode("ascii")
            )
        _toukei_plt.close("all")
    except BaseException:
        _toukei_stderr.write("\n[figure capture failed]\n")
        _toukei_stderr.write(traceback.format_exc())

json.dumps({
    "stdout": _toukei_stdout.getvalue(),
    "stderr": _toukei_stderr.getvalue(),
    "userError": _toukei_user_error,
    "testPassed": _toukei_test_passed,
    "testError": _toukei_test_error,
    "figures": _toukei_figures,
})
`);

  post("run-result", {
    jobId,
    version: PYODIDE_VERSION,
    result: JSON.parse(resultJson),
  });
}

self.addEventListener("message", (event) => {
  const message = event.data || {};
  if (message.type !== "run") return;

  runJob(message).catch((error) => {
    post("runtime-error", {
      jobId: String(message.jobId || ""),
      message: error && error.stack ? error.stack : String(error),
      version: PYODIDE_VERSION,
    });
  });
});
