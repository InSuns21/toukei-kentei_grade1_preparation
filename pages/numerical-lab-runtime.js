(function (root) {
  "use strict";

  const STORAGE_PREFIX = "toukei-numlab-progress-v1:";
  const DEFAULT_TIMEOUT_MS = 8000;
  const MAX_TIMEOUT_MS = 60000;
  const BOOT_TIMEOUT_MS = 120000;
  const currentScript = document.currentScript;
  const scriptBase = currentScript && currentScript.src
    ? new URL(".", currentScript.src)
    : new URL("./", window.location.href);
  const workerUrl = new URL("numerical-lab-worker.mjs", scriptBase);

  let worker = null;
  let currentJob = null;
  let jobSequence = 0;

  function languageOfPre(pre) {
    if (!pre) return "";
    const dataLang = pre.getAttribute("data-lang");
    if (dataLang) return dataLang.toLowerCase();
    const code = pre.querySelector("code");
    if (!code) return "";
    const match = [...code.classList].find((name) => name.startsWith("lang-"));
    return match ? match.slice(5).toLowerCase() : "";
  }

  function fnv1a(text) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function parseSource(raw, index) {
    const lines = String(raw || "").replace(/\r\n/g, "\n").split("\n");
    const metadata = {};
    const body = [];

    for (const line of lines) {
      let match = line.match(/^\s*#\s*lab-id:\s*(.+?)\s*$/i);
      if (match) {
        metadata.id = match[1].trim();
        continue;
      }
      match = line.match(/^\s*#\s*timeout-ms:\s*(\d+)\s*$/i);
      if (match) {
        metadata.timeoutMs = Number(match[1]);
        continue;
      }
      match = line.match(/^\s*#\s*lab-title:\s*(.+?)\s*$/i);
      if (match) {
        metadata.title = match[1].trim();
        continue;
      }
      body.push(line);
    }

    const code = body.join("\n").replace(/^\n+|\n+$/g, "");
    const id = metadata.id || ("anonymous-" + index);
    const requestedTimeout = Number(metadata.timeoutMs) || DEFAULT_TIMEOUT_MS;
    const timeoutMs = Math.max(250, Math.min(requestedTimeout, MAX_TIMEOUT_MS));

    return {
      id,
      title: metadata.title || id,
      timeoutMs,
      code,
      sourceHash: fnv1a(code),
    };
  }

  function storageKey(id) {
    return STORAGE_PREFIX + id;
  }

  function loadProgress(lab) {
    try {
      const raw = localStorage.getItem(storageKey(lab.id));
      if (!raw) return null;
      const value = JSON.parse(raw);
      if (!value || value.sourceHash !== lab.sourceHash) return null;
      return value;
    } catch (error) {
      console.warn("Numerical lab progress could not be read:", error);
      return null;
    }
  }

  function saveProgress(lab, code, completed) {
    try {
      localStorage.setItem(storageKey(lab.id), JSON.stringify({
        schemaVersion: 1,
        sourceHash: lab.sourceHash,
        code,
        completed: Boolean(completed),
        completedAt: completed ? new Date().toISOString() : null,
      }));
    } catch (error) {
      console.warn("Numerical lab progress could not be saved:", error);
    }
  }

  function clearProgress(lab) {
    try {
      localStorage.removeItem(storageKey(lab.id));
    } catch (error) {
      console.warn("Numerical lab progress could not be cleared:", error);
    }
  }

  function createWorker() {
    const instance = new Worker(workerUrl.href, { type: "module" });
    instance.addEventListener("message", handleWorkerMessage);
    instance.addEventListener("error", function (event) {
      if (!currentJob) return;
      finishWithInfrastructureError(
        "Python 実行環境を開始できませんでした。オンライン時に一度実行してランタイムを保存してください。\n" +
        (event.message || "Worker error")
      );
    });
    return instance;
  }

  function ensureWorker() {
    if (!worker) worker = createWorker();
    return worker;
  }

  function terminateWorker() {
    if (worker) worker.terminate();
    worker = null;
  }

  function setAllRunButtonsDisabled(disabled) {
    document.querySelectorAll(".numerical-lab-run").forEach((button) => {
      button.disabled = disabled;
    });
  }

  function setStatus(panel, text, kind) {
    const status = panel.querySelector(".numerical-lab-status");
    if (!status) return;
    status.textContent = text;
    status.dataset.kind = kind || "";
  }

  function setOutput(panel, text, isError) {
    const output = panel.querySelector(".numerical-lab-output");
    if (!output) return;
    output.textContent = text || "";
    output.classList.toggle("is-error", Boolean(isError));
  }

  function setFigures(panel, figures) {
    const container = panel.querySelector(".numerical-lab-figures");
    if (!container) return;
    container.replaceChildren();
    (figures || []).forEach((src, index) => {
      const image = document.createElement("img");
      image.src = src;
      image.alt = "Python 実行結果の図 " + (index + 1);
      image.loading = "lazy";
      container.appendChild(image);
    });
  }

  function clearTimers(job) {
    if (!job) return;
    if (job.bootTimer) clearTimeout(job.bootTimer);
    if (job.runTimer) clearTimeout(job.runTimer);
  }

  function resetCurrentJob() {
    clearTimers(currentJob);
    currentJob = null;
    setAllRunButtonsDisabled(false);
  }

  function finishWithInfrastructureError(message) {
    const job = currentJob;
    if (!job) return;
    setStatus(job.panel, "実行環境エラー", "error");
    setOutput(job.panel, message, true);
    setFigures(job.panel, []);
    terminateWorker();
    resetCurrentJob();
  }

  function handleWorkerMessage(event) {
    const data = event.data || {};
    if (!currentJob || data.jobId !== currentJob.jobId) return;
    const job = currentJob;

    if (data.type === "runtime-loading") {
      setStatus(job.panel, "Python / パッケージを準備中…", "busy");
      return;
    }

    if (data.type === "run-started") {
      if (job.bootTimer) clearTimeout(job.bootTimer);
      job.bootTimer = null;
      job.runTimer = setTimeout(() => {
        setStatus(job.panel, "時間制限で停止", "error");
        setOutput(
          job.panel,
          "実行時間が " + job.lab.timeoutMs + " ms を超えたため Worker を破棄しました。",
          true
        );
        setFigures(job.panel, []);
        terminateWorker();
        resetCurrentJob();
      }, job.lab.timeoutMs);
      setStatus(job.panel, "実行中…", "busy");
      return;
    }

    if (data.type === "runtime-error") {
      finishWithInfrastructureError(data.message || "Python 実行環境でエラーが発生しました。");
      return;
    }

    if (data.type !== "run-result") return;

    clearTimers(job);
    const result = data.result || {};
    const userError = result.userError || "";
    const testError = result.testError || "";
    const outputParts = [];

    if (result.stdout) outputParts.push(result.stdout.replace(/\s+$/, ""));
    if (result.stderr) outputParts.push(result.stderr.replace(/\s+$/, ""));

    if (userError) {
      outputParts.push(userError.replace(/\s+$/, ""));
      setStatus(job.panel, "実行エラー", "error");
      setOutput(job.panel, outputParts.filter(Boolean).join("\n"), true);
      setFigures(job.panel, []);
      saveProgress(job.lab, job.code, false);
      resetCurrentJob();
      return;
    }

    if (result.testPassed === false) {
      outputParts.push(testError.replace(/\s+$/, ""));
      setStatus(job.panel, "テスト不合格", "error");
      setOutput(job.panel, outputParts.filter(Boolean).join("\n"), true);
      setFigures(job.panel, result.figures || []);
      saveProgress(job.lab, job.code, false);
      resetCurrentJob();
      return;
    }

    const completed = result.testPassed === true || !job.tests.trim();
    setStatus(job.panel, completed ? "完了" : "実行完了", "success");
    setOutput(job.panel, outputParts.filter(Boolean).join("\n") || "（標準出力なし）", false);
    setFigures(job.panel, result.figures || []);
    saveProgress(job.lab, job.code, completed);
    resetCurrentJob();
  }

  function runLab(panel, lab, tests) {
    if (currentJob) {
      setStatus(panel, "別のラボを実行中です", "busy");
      return;
    }

    const textarea = panel.querySelector(".numerical-lab-editor");
    const code = textarea ? textarea.value : lab.code;
    saveProgress(lab, code, false);
    setOutput(panel, "", false);
    setFigures(panel, []);
    setStatus(panel, "実行環境を確認中…", "busy");
    setAllRunButtonsDisabled(true);

    const jobId = lab.id + ":" + (++jobSequence);
    currentJob = {
      jobId,
      panel,
      lab,
      tests,
      code,
      bootTimer: setTimeout(() => {
        finishWithInfrastructureError(
          "Python 実行環境の準備が " + BOOT_TIMEOUT_MS / 1000 +
          " 秒以内に完了しませんでした。接続状態を確認してください。"
        );
      }, BOOT_TIMEOUT_MS),
      runTimer: null,
    };

    const serviceWorkerReady = "serviceWorker" in navigator
      ? navigator.serviceWorker.ready.catch(() => null)
      : Promise.resolve(null);

    serviceWorkerReady.then(() => {
      if (!currentJob || currentJob.jobId !== jobId) return;
      try {
        ensureWorker().postMessage({
          type: "run",
          jobId,
          code,
          tests,
        });
      } catch (error) {
        finishWithInfrastructureError(error && error.stack ? error.stack : String(error));
      }
    });
  }

  function stopLab(panel) {
    if (!currentJob || currentJob.panel !== panel) {
      setStatus(panel, "実行中ではありません", "");
      return;
    }

    setStatus(panel, "手動停止", "error");
    setOutput(panel, "Worker を破棄して実行を停止しました。", true);
    setFigures(panel, []);
    terminateWorker();
    resetCurrentJob();
  }

  function buildPanel(pre, lab, tests) {
    const panel = document.createElement("section");
    panel.className = "numerical-lab";
    panel.dataset.labId = lab.id;

    const saved = loadProgress(lab);
    const initialCode = saved && typeof saved.code === "string" ? saved.code : lab.code;

    const header = document.createElement("div");
    header.className = "numerical-lab-header";

    const title = document.createElement("strong");
    title.textContent = lab.title;

    const status = document.createElement("span");
    status.className = "numerical-lab-status";
    if (saved && saved.completed) {
      status.textContent = "完了済み";
      status.dataset.kind = "success";
    } else {
      status.textContent = "未実行";
    }

    header.append(title, status);

    const editor = document.createElement("textarea");
    editor.className = "numerical-lab-editor";
    editor.value = initialCode;
    editor.spellcheck = false;
    editor.setAttribute("aria-label", lab.title + " の Python コード");

    const controls = document.createElement("div");
    controls.className = "numerical-lab-controls";

    const runButton = document.createElement("button");
    runButton.type = "button";
    runButton.className = "numerical-lab-run";
    runButton.textContent = "実行";
    runButton.addEventListener("click", () => runLab(panel, lab, tests));

    const stopButton = document.createElement("button");
    stopButton.type = "button";
    stopButton.className = "numerical-lab-stop";
    stopButton.textContent = "停止";
    stopButton.addEventListener("click", () => stopLab(panel));

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "numerical-lab-reset";
    resetButton.textContent = "初期コードへ戻す";
    resetButton.addEventListener("click", () => {
      if (currentJob && currentJob.panel === panel) stopLab(panel);
      editor.value = lab.code;
      clearProgress(lab);
      setStatus(panel, "未実行", "");
      setOutput(panel, "", false);
      setFigures(panel, []);
    });

    const timeout = document.createElement("span");
    timeout.className = "numerical-lab-timeout";
    timeout.textContent = "実行上限 " + lab.timeoutMs + " ms";

    controls.append(runButton, stopButton, resetButton, timeout);

    const output = document.createElement("pre");
    output.className = "numerical-lab-output";
    output.setAttribute("aria-live", "polite");

    const figures = document.createElement("div");
    figures.className = "numerical-lab-figures";

    panel.append(header, editor, controls, output, figures);
    pre.replaceWith(panel);
  }

  function mountLabs(container) {
    if (!container) return;
    const blocks = [...container.querySelectorAll("pre")];
    let labIndex = 0;

    for (const pre of blocks) {
      if (languageOfPre(pre) !== "python-lab") continue;

      const codeNode = pre.querySelector("code");
      if (!codeNode) continue;

      labIndex += 1;
      const lab = parseSource(codeNode.textContent, labIndex);
      let tests = "";
      const next = pre.nextElementSibling;

      if (next && next.tagName === "PRE" && languageOfPre(next) === "python-test") {
        const testCode = next.querySelector("code");
        tests = testCode ? testCode.textContent : "";
        next.remove();
      }

      buildPanel(pre, lab, tests);
    }
  }

  function docsifyPlugin(hook) {
    hook.doneEach(function () {
      mountLabs(document.querySelector(".markdown-section"));
    });
  }

  root.ToukeiNumericalLab = {
    docsifyPlugin,
    mountLabs,
    terminateWorker,
  };
})(typeof window !== "undefined" ? window : globalThis);
