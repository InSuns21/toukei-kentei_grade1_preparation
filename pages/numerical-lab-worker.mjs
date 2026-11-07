import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

const PYODIDE_VERSION = "314.0.7";
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;
const FILE_LAB_ROOT = "/home/pyodide/toukei-file-labs";

function safePythonPath(path) {
  return typeof path === "string" && path.startsWith("textbook/") &&
    path.endsWith(".py") && !path.split("/").some((part) => !part || part === "." || part === "..") &&
    !/[?#\\]/.test(path);
}

const PYTHON_RUNNER = String.raw`
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
`;


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
  let code = String(message.code || "");
  const tests = String(message.tests || "");

  post("runtime-loading", { jobId, version: PYODIDE_VERSION });

  const pyodide = await ensurePyodide();
  if (message.mode === "file") {
    const files = message.files;
    const script = String(message.script || "");
    const args = message.args;
    if (!safePythonPath(script) || !Array.isArray(files) || !files.length ||
      files.length > 16 || !files.some((file) => file.path === script) ||
      !Array.isArray(args) || args.length > 40 ||
      args.some((arg) => typeof arg !== "string" || arg.length > 500)) {
      throw new Error("Invalid Python file lab configuration");
    }
    for (const file of files) {
      if (!safePythonPath(file.path) || typeof file.content !== "string" ||
        file.content.length > 400000) {
        throw new Error("Invalid Python file lab source");
      }
      const destination = `${FILE_LAB_ROOT}/${file.path}`;
      pyodide.FS.mkdirTree(destination.slice(0, destination.lastIndexOf("/")));
      pyodide.FS.writeFile(destination, file.content);
    }
    const scriptPath = `${FILE_LAB_ROOT}/${script}`;
    code = `import runpy, sys\n` +
      `_toukei_original_argv = sys.argv[:]\n` +
      `_toukei_original_path = sys.path[:]\n` +
      `try:\n    sys.argv = ${JSON.stringify([scriptPath, ...args])}\n` +
      `    runpy.run_path(${JSON.stringify(scriptPath)}, run_name="__main__")\n` +
      `finally:\n    sys.argv = _toukei_original_argv\n    sys.path[:] = _toukei_original_path`;
  }
  await pyodide.loadPackagesFromImports(`${code}\n${tests}`);

  post("run-started", { jobId, version: PYODIDE_VERSION });

  pyodide.globals.set("__toukei_user_code", code);
  pyodide.globals.set("__toukei_test_code", tests);

  const resultJson = await pyodide.runPythonAsync(PYTHON_RUNNER);

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
