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


  const PYTHON_KEYWORDS = new Set(
    "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" ")
  );
  const PYTHON_BUILTINS = new Set(
    "abs all any bool dict enumerate filter float int len list map max min next object open print range reversed round set sorted str sum super tuple type zip".split(" ")
  );

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlightedSpan(kind, text) {
    return '<span class="python-token python-token-' + kind + '">' +
      escapeHtml(text) +
      "</span>";
  }

  function highlightPython(source) {
    const text = String(source || "");
    let html = "";
    let index = 0;

    while (index < text.length) {
      const char = text[index];

      if (char === "#") {
        let end = text.indexOf("\n", index);
        if (end < 0) end = text.length;
        html += highlightedSpan("comment", text.slice(index, end));
        index = end;
        continue;
      }

      if (char === "'" || char === '"') {
        const quote = char;
        const triple = text.slice(index, index + 3) === quote.repeat(3);
        const delimiter = triple ? quote.repeat(3) : quote;
        let end = index + delimiter.length;
        let escaped = false;

        while (end < text.length) {
          if (!triple && !escaped && text[end] === quote) {
            end += 1;
            break;
          }
          if (triple && text.slice(end, end + 3) === delimiter) {
            end += 3;
            break;
          }

          if (!triple && text[end] === "\\" && !escaped) {
            escaped = true;
          } else {
            escaped = false;
          }
          end += 1;
        }

        html += highlightedSpan("string", text.slice(index, end));
        index = end;
        continue;
      }

      const numberMatch = text.slice(index).match(
        /^(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?j?)/
      );
      if (numberMatch) {
        html += highlightedSpan("number", numberMatch[0]);
        index += numberMatch[0].length;
        continue;
      }

      const identifierMatch = text.slice(index).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (identifierMatch) {
        const identifier = identifierMatch[0];
        const after = text.slice(index + identifier.length);
        let kind = "";

        if (identifier === "___") {
          kind = "placeholder";
        } else if (PYTHON_KEYWORDS.has(identifier)) {
          kind = "keyword";
        } else if (PYTHON_BUILTINS.has(identifier)) {
          kind = "builtin";
        } else if (/^\s*\(/.test(after)) {
          kind = "function";
        }

        html += kind ? highlightedSpan(kind, identifier) : escapeHtml(identifier);
        index += identifier.length;
        continue;
      }

      html += escapeHtml(char);
      index += 1;
    }

    return html;
  }

  function createHighlightedEditor(initialCode, label) {
    const wrapper = document.createElement("div");
    wrapper.className = "numerical-lab-code-editor";

    const highlight = document.createElement("pre");
    highlight.className = "numerical-lab-code-highlight";
    highlight.setAttribute("aria-hidden", "true");

    const highlightCode = document.createElement("code");
    highlight.appendChild(highlightCode);

    const editor = document.createElement("textarea");
    editor.className = "numerical-lab-editor";
    editor.value = initialCode;
    editor.spellcheck = false;
    editor.wrap = "off";
    editor.setAttribute("aria-label", label);

    function refresh() {
      highlightCode.innerHTML = highlightPython(editor.value) + "\n";
    }

    editor.addEventListener("input", refresh);
    editor.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();

      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.setRangeText("    ", start, end, "end");
      refresh();
    });
    editor.addEventListener("scroll", function () {
      highlight.scrollTop = editor.scrollTop;
      highlight.scrollLeft = editor.scrollLeft;
    });

    refresh();
    wrapper.append(highlight, editor);

    return { wrapper, editor, refresh };
  }

  function activateLabTab(panel, name) {
    const buttons = panel.querySelectorAll(".numerical-lab-tab");
    const panes = panel.querySelectorAll(".numerical-lab-tab-panel");
    if (!buttons.length || !panes.length) return;

    buttons.forEach((button) => {
      const active = button.dataset.tab === name;
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });

    panes.forEach((pane) => {
      pane.hidden = pane.dataset.tabPanel !== name;
    });
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
      match = line.match(/^\s*#\s*lab-mode:\s*(.+?)\s*$/i);
      if (match) {
        metadata.mode = match[1].trim().toLowerCase();
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
      mode: metadata.mode || "free",
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
    activateLabTab(job.panel, "result");
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
        activateLabTab(job.panel, "result");
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
      activateLabTab(job.panel, "result");
      setOutput(job.panel, outputParts.filter(Boolean).join("\n"), true);
      setFigures(job.panel, []);
      saveProgress(job.lab, job.code, false);
      resetCurrentJob();
      return;
    }

    if (result.testPassed === false) {
      outputParts.push(testError.replace(/\s+$/, ""));
      setStatus(job.panel, "テスト不合格", "error");
      activateLabTab(job.panel, "result");
      setOutput(job.panel, outputParts.filter(Boolean).join("\n"), true);
      setFigures(job.panel, result.figures || []);
      saveProgress(job.lab, job.code, false);
      resetCurrentJob();
      return;
    }

    const completed = result.testPassed === true || !job.tests.trim();
    setStatus(job.panel, completed ? "完了" : "実行完了", "success");
    activateLabTab(job.panel, "result");
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

    if (lab.mode === "exercise" && /___/.test(code)) {
      saveProgress(lab, code, false);
      setStatus(panel, "穴埋め未完了", "error");
      setOutput(panel, "穴埋め記号 ___ が残っています。すべて埋めてから実行してください。", true);
      setFigures(panel, []);
      activateLabTab(panel, "result");
      return;
    }

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

  function buildPanel(pre, lab, tests, solution) {
    const panel = document.createElement("section");
    panel.className = "numerical-lab";
    panel.dataset.labId = lab.id;

    const hasSolution = Boolean(solution && solution.trim());
    if (hasSolution) panel.classList.add("is-exercise");

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

    const editorParts = createHighlightedEditor(
      initialCode,
      lab.title + " の Python コード"
    );
    const editor = editorParts.editor;

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
      editorParts.refresh();
      clearProgress(lab);
      setStatus(panel, "未実行", "");
      setOutput(panel, "", false);
      setFigures(panel, []);
      if (hasSolution) activateLabTab(panel, "editor");
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

    panel.appendChild(header);

    if (!hasSolution) {
      panel.append(editorParts.wrapper, controls, output, figures);
      pre.replaceWith(panel);
      return;
    }

    const tabs = document.createElement("div");
    tabs.className = "numerical-lab-tabs";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", lab.title + " の演習タブ");

    const tabSpecs = [
      ["editor", "穴埋め"],
      ["solution", "模範解答"],
      ["result", "実行結果"],
    ];

    for (const [name, label] of tabSpecs) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "numerical-lab-tab";
      button.dataset.tab = name;
      button.setAttribute("role", "tab");
      button.textContent = label;
      button.addEventListener("click", () => activateLabTab(panel, name));
      tabs.appendChild(button);
    }

    const editorPane = document.createElement("div");
    editorPane.className = "numerical-lab-tab-panel";
    editorPane.dataset.tabPanel = "editor";
    editorPane.setAttribute("role", "tabpanel");
    editorPane.append(editorParts.wrapper, controls);

    const solutionPane = document.createElement("div");
    solutionPane.className = "numerical-lab-tab-panel numerical-lab-solution";
    solutionPane.dataset.tabPanel = "solution";
    solutionPane.setAttribute("role", "tabpanel");

    const solutionCode = document.createElement("pre");
    solutionCode.className = "numerical-lab-solution-code";
    const solutionCodeInner = document.createElement("code");
    solutionCodeInner.innerHTML = highlightPython(solution.trim()) + "\n";
    solutionCode.appendChild(solutionCodeInner);

    const solutionControls = document.createElement("div");
    solutionControls.className = "numerical-lab-solution-controls";

    const applySolutionButton = document.createElement("button");
    applySolutionButton.type = "button";
    applySolutionButton.textContent = "模範解答を穴埋め欄へ反映";
    applySolutionButton.addEventListener("click", () => {
      editor.value = solution.trim();
      editorParts.refresh();
      saveProgress(lab, editor.value, false);
      setStatus(panel, "模範解答を反映", "");
      activateLabTab(panel, "editor");
      editor.focus();
    });

    solutionControls.appendChild(applySolutionButton);
    solutionPane.append(solutionCode, solutionControls);

    const resultPane = document.createElement("div");
    resultPane.className = "numerical-lab-tab-panel";
    resultPane.dataset.tabPanel = "result";
    resultPane.setAttribute("role", "tabpanel");
    resultPane.append(output, figures);

    panel.append(tabs, editorPane, solutionPane, resultPane);
    pre.replaceWith(panel);
    activateLabTab(panel, "editor");
  }

  function mountLabs(container) {
    if (!container) return;
    const blocks = [...container.querySelectorAll("pre")];
    let labIndex = 0;

    for (const pre of blocks) {
      if (!pre.isConnected || languageOfPre(pre) !== "python-lab") continue;

      const codeNode = pre.querySelector("code");
      if (!codeNode) continue;

      labIndex += 1;
      const lab = parseSource(codeNode.textContent, labIndex);
      let solution = "";
      let tests = "";
      let next = pre.nextElementSibling;

      if (next && next.tagName === "PRE" && languageOfPre(next) === "python-solution") {
        const solutionCode = next.querySelector("code");
        solution = solutionCode ? solutionCode.textContent : "";
        const solutionBlock = next;
        next = next.nextElementSibling;
        solutionBlock.remove();
      }

      if (next && next.tagName === "PRE" && languageOfPre(next) === "python-test") {
        const testCode = next.querySelector("code");
        tests = testCode ? testCode.textContent : "";
        next.remove();
      }

      buildPanel(pre, lab, tests, solution);
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
