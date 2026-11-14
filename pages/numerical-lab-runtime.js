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
    const params = [];

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
      match = line.match(/^\s*#\s*lab-param:\s*(.+?)\s*$/i);
      if (match) {
        const parts = match[1].split("|").map((part) => part.trim());
        if (parts.length !== 6 || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(parts[0]) ||
          !parts[1] || params.some((param) => param.name === parts[0])) {
          throw new Error("Invalid numerical experiment parameter: " + match[1]);
        }
        const values = parts.slice(2).map(Number);
        if (!values.every(Number.isFinite) || values[3] <= 0 ||
          values[1] > values[0] || values[0] > values[2] ||
          params.length >= 8) {
          throw new Error("Invalid numerical experiment range: " + match[1]);
        }
        params.push({ name: parts[0], label: parts[1],
          defaultValue: values[0], min: values[1], max: values[2], step: values[3] });
        continue;
      }
      body.push(line);
    }

    const code = body.join("\n").replace(/^\n+|\n+$/g, "");
    const id = metadata.id || ("anonymous-" + index);
    const requestedTimeout = Number(metadata.timeoutMs) || DEFAULT_TIMEOUT_MS;
    const timeoutMs = Math.max(250, Math.min(requestedTimeout, MAX_TIMEOUT_MS));
    if (metadata.mode === "experiment" && !params.length) {
      throw new Error("Numerical experiment must define at least one # lab-param:");
    }
    if (params.length && metadata.mode !== "experiment") {
      throw new Error("lab-param is only supported by # lab-mode: experiment");
    }

    return {
      id,
      title: metadata.title || id,
      timeoutMs,
      mode: metadata.mode || "free",
      code,
      params,
      sourceHash: fnv1a(metadata.mode === "experiment" ? raw : code),
    };
  }

  function isSafePythonFile(path) {
    return typeof path === "string" && path.startsWith("textbook/") &&
      path.endsWith(".py") && !path.split("/").some((part) => !part || part === "." || part === "..") &&
      !/[?#\\]/.test(path);
  }

  // A file lab refers to the *published original* .py, never a Markdown copy.
  function parseFileLab(raw, index) {
    const metadata = {};
    const dependencies = [];
    const presets = [];
    for (const line of String(raw || "").trim().split("\n")) {
      const match = line.trim().match(/^#\s*([a-z-]+):\s*(.*?)\s*$/);
      if (!match) throw new Error("Python file lab contains an unsupported line: " + line);
      const [, name, value] = match;
      if (name === "lab-id") metadata.id = value;
      else if (name === "lab-title") metadata.title = value;
      else if (name === "lab-file") metadata.file = value;
      else if (name === "lab-dependency") dependencies.push(value);
      else if (name === "timeout-ms") metadata.timeoutMs = Number(value);
      else if (name === "lab-preset") {
        const separator = value.indexOf("|");
        if (separator < 1) throw new Error("Python file lab preset needs a name and arguments");
        presets.push({ name: value.slice(0, separator).trim(), args: value.slice(separator + 1).trim() });
      } else throw new Error("Unknown Python file lab metadata: " + name);
    }
    if (!isSafePythonFile(metadata.file) || dependencies.some((file) => !isSafePythonFile(file)) ||
      !presets.length || !metadata.id || !metadata.title ||
      !(metadata.timeoutMs >= 250 && metadata.timeoutMs <= MAX_TIMEOUT_MS)) {
      throw new Error("Invalid Python file lab metadata: " + (metadata.id || index));
    }
    return {
      id: metadata.id,
      title: metadata.title,
      file: metadata.file,
      files: [metadata.file, ...dependencies],
      presets,
      timeoutMs: metadata.timeoutMs,
      mode: "file",
      code: presets[0].args,
      sourceHash: fnv1a(raw),
    };
  }

  // Shell-like quoting for *arguments only*. No shell or subprocess is involved.
  function parseArguments(source) {
    const result = [];
    let token = "";
    let started = false;
    let quote = null;
    let escaping = false;
    for (const char of String(source || "")) {
      if (escaping) {
        token += char;
        escaping = false;
        continue;
      }
      if (char === "\\" && quote !== "'") {
        escaping = true;
        started = true;
      } else if (quote) {
        if (char === quote) quote = null;
        else token += char;
      } else if (char === '"' || char === "'") {
        quote = char;
        started = true;
      } else if (/\s/.test(char)) {
        if (started) result.push(token);
        token = "";
        started = false;
      } else {
        token += char;
        started = true;
      }
    }
    if (quote || escaping) throw new Error("引数の引用符またはエスケープが閉じられていません。");
    if (started) result.push(token);
    if (result.length > 40 || result.some((arg) => arg.length > 500)) {
      throw new Error("引数が長すぎます。");
    }
    return result;
  }

  function fileUrl(path) {
    if (!isSafePythonFile(path)) throw new Error("Invalid Python file path");
    return new URL(path, scriptBase);
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

  function appendPointPlot(container, title, source, edges = []) {
    if (!Array.isArray(source) || source.length < 2 || source.length > 500) return;
    const points = source.map((point) => Array.isArray(point) ? point : [point]);
    if (!points.every((point) => point.length >= 1 && point.length <= 2 &&
      point.every((coordinate) => typeof coordinate === "number" && Number.isFinite(coordinate)))) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const make = (tag, attributes = {}) => {
      const element = document.createElementNS(svgNS, tag);
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
      return element;
    };
    const width = 430;
    const height = 270;
    const xs = points.map((point) => point[0]);
    const ys = points.map((point) => point[1] ?? 0);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const spanX = Math.max(maxX - minX, 1e-9);
    const spanY = Math.max(maxY - minY, 1e-9);
    const scale = Math.min(350 / spanX, 205 / spanY);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const positions = points.map((point) => [
      width / 2 + (point[0] - cx) * scale,
      height / 2 - ((point[1] ?? 0) - cy) * scale,
    ]);

    const figure = document.createElement("figure");
    figure.className = "numerical-file-plot";
    const caption = document.createElement("figcaption");
    caption.textContent = title;
    const svg = make("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": title });
    svg.appendChild(make("title")).textContent = title;
    svg.appendChild(make("rect", { x: 0, y: 0, width, height, fill: "#f8fafc" }));
    for (const edge of edges.slice(0, 1500)) {
      const i = Array.isArray(edge) ? edge[0] : edge?.i;
      const j = Array.isArray(edge) ? edge[1] : edge?.j;
      if (!Number.isInteger(i) || !Number.isInteger(j) || !positions[i - 1] || !positions[j - 1]) continue;
      svg.appendChild(make("line", {
        x1: positions[i - 1][0], y1: positions[i - 1][1],
        x2: positions[j - 1][0], y2: positions[j - 1][1],
        stroke: "#94a3b8", "stroke-width": 1.5,
      }));
    }
    positions.forEach(([x, y]) => {
      svg.appendChild(make("circle", { cx: x, cy: y, r: 4, fill: "#2563eb", stroke: "#1e3a8a", "stroke-width": 0.8 }));
    });
    figure.append(caption, svg);
    container.appendChild(figure);
  }

  // Generic scalar-series contract for reproducible experiments (e.g. MFL14).
  // Keep numeric data in stdout JSON; this SVG is only a supplementary view.
  function appendSeriesPlot(container, specification) {
    if (!specification || typeof specification.title !== "string" ||
      !Array.isArray(specification.series) || !specification.series.length ||
      specification.series.length > 5) return;

    const series = specification.series.map((entry) => ({
      name: String(entry?.name || "系列"),
      points: entry?.points,
    }));
    if (!series.every((entry) => Array.isArray(entry.points) &&
      entry.points.length >= 2 && entry.points.length <= 500 &&
      entry.points.every((point) => Array.isArray(point) && point.length === 2 &&
        point.every((number) => typeof number === "number" && Number.isFinite(number))))) return;

    const allPoints = series.flatMap((entry) => entry.points);
    const xs = allPoints.map((point) => point[0]);
    const ys = allPoints.map((point) => point[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const spanX = Math.max(maxX - minX, 1e-12);
    const spanY = Math.max(maxY - minY, 1e-12);
    const width = 520;
    const height = 350;
    const left = 75;
    const top = 25;
    const plotWidth = 425;
    const plotHeight = 216;
    const svgNS = "http://www.w3.org/2000/svg";
    const make = (name, attributes = {}) => {
      const node = document.createElementNS(svgNS, name);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
      return node;
    };
    const xPosition = (x) => left + (x - minX) / spanX * plotWidth;
    const yPosition = (y) => top + (maxY - y) / spanY * plotHeight;
    const format = (value) => Number(value.toPrecision(4)).toString();

    const figure = document.createElement("figure");
    figure.className = "numerical-file-plot numerical-file-series";
    const caption = document.createElement("figcaption");
    caption.textContent = specification.title;
    const svg = make("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": specification.title });
    svg.appendChild(make("title")).textContent = specification.title;
    svg.appendChild(make("rect", { width, height, fill: "#f8fafc" }));
    svg.appendChild(make("rect", { x: left, y: top, width: plotWidth, height: plotHeight,
      fill: "#ffffff", stroke: "#64748b", "stroke-width": 1 }));

    for (let tick = 0; tick <= 4; tick += 1) {
      const positionX = left + plotWidth * tick / 4;
      const positionY = top + plotHeight * tick / 4;
      svg.appendChild(make("line", { x1: positionX, x2: positionX, y1: top, y2: top + plotHeight,
        stroke: "#e2e8f0" }));
      svg.appendChild(make("line", { x1: left, x2: left + plotWidth, y1: positionY, y2: positionY,
        stroke: "#e2e8f0" }));
      svg.appendChild(make("text", { x: positionX, y: 260, "text-anchor": "middle", "font-size": 11,
        fill: "#334155" })).textContent = format(minX + spanX * tick / 4);
      svg.appendChild(make("text", { x: left - 9, y: positionY + 4, "text-anchor": "end",
        "font-size": 11, fill: "#334155" })).textContent = format(maxY - spanY * tick / 4);
    }

    const colors = ["#1d4ed8", "#be123c", "#047857", "#7c3aed", "#a16207"];
    const dashes = ["none", "7,4", "2,4", "9,3,2,3", "4,4"];
    series.forEach((entry, index) => {
      const coordinates = entry.points.map(([x, y]) => `${xPosition(x)},${yPosition(y)}`).join(" ");
      svg.appendChild(make("polyline", { points: coordinates, fill: "none", stroke: colors[index],
        "stroke-width": 2.3, "stroke-dasharray": dashes[index] }));
      entry.points.forEach(([x, y]) => {
        svg.appendChild(make("circle", { cx: xPosition(x), cy: yPosition(y), r: 3.3,
          fill: "#ffffff", stroke: colors[index], "stroke-width": 2 }));
      });
      const legendX = left + (index % 3) * 145;
      const legendY = 313 + Math.floor(index / 3) * 19;
      svg.appendChild(make("line", { x1: legendX, x2: legendX + 16, y1: legendY - 4, y2: legendY - 4,
        stroke: colors[index], "stroke-width": 2.3, "stroke-dasharray": dashes[index] }));
      svg.appendChild(make("text", { x: legendX + 21, y: legendY, "font-size": 10,
        fill: "#1e293b" })).textContent = entry.name.slice(0, 18);
    });
    svg.appendChild(make("text", { x: left + plotWidth / 2, y: 280,
      "text-anchor": "middle", "font-size": 11, fill: "#334155" })).textContent =
      String(specification.x_label || "").slice(0, 24);
    const yLabel = make("text", { x: 17, y: top + plotHeight / 2, transform: `rotate(-90 17 ${top + plotHeight / 2})`,
      "text-anchor": "middle", "font-size": 11, fill: "#334155" });
    yLabel.textContent = String(specification.y_label || "").slice(0, 28);
    svg.appendChild(yLabel);
    figure.append(caption, svg);
    container.appendChild(figure);
  }

  function setFileVisuals(panel, outputText) {
    const container = panel.querySelector(".numerical-lab-figures");
    if (!container) return;
    let result;
    try {
      result = JSON.parse(outputText);
    } catch (_error) {
      return; // Plain-text numerical scripts remain useful without a forced chart.
    }
    if (!result || Array.isArray(result) || typeof result !== "object") return;
    if (result.points) {
      if (result.radius_graph?.edges) {
        appendPointPlot(container, "半径グラフ", result.points, result.radius_graph.edges);
        appendPointPlot(container, "union kNN", result.points, result.union_knn?.edges);
        appendPointPlot(container, "mutual kNN", result.points, result.mutual_knn?.edges);
      } else {
        appendPointPlot(container, "入力点群と近傍辺", result.points, result.edges);
      }
    }
    if (result.coordinates) appendPointPlot(container, "復元座標", result.coordinates);
    if (result.mds?.coordinates) appendPointPlot(container, "Isomap 埋め込み", result.mds.coordinates);
    if (result.embedding_1d) appendPointPlot(container, "LLE 1次元埋め込み", result.embedding_1d);
    if (Array.isArray(result.plots)) result.plots.slice(0, 4).forEach((entry) => appendSeriesPlot(container, entry));
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
    if (job.lab.mode === "file") setFileVisuals(job.panel, result.stdout || "");
    saveProgress(job.lab, job.code, completed);
    resetCurrentJob();
  }

  function launchJob(panel, lab, code, tests, prepareMessage, progressCode = code) {
    if (currentJob) {
      setStatus(panel, "別のラボを実行中です", "busy");
      return;
    }
    saveProgress(lab, progressCode, false);
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
      code: progressCode,
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

    Promise.all([serviceWorkerReady, prepareMessage()]).then(([, extra]) => {
      if (!currentJob || currentJob.jobId !== jobId) return;
      try {
        ensureWorker().postMessage({
          type: "run",
          jobId,
          code,
          tests,
          ...extra,
        });
      } catch (error) {
        finishWithInfrastructureError(error && error.stack ? error.stack : String(error));
      }
    }).catch((error) => {
      if (currentJob && currentJob.jobId === jobId) {
        finishWithInfrastructureError(error && error.stack ? error.stack : String(error));
      }
    });
  }

  function runLab(panel, lab, tests) {
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
    launchJob(panel, lab, code, tests, () => ({}));
  }

  function runFileLab(panel, lab, argumentText) {
    let args;
    try {
      args = parseArguments(argumentText);
    } catch (error) {
      setStatus(panel, "引数エラー", "error");
      setOutput(panel, error.message, true);
      return;
    }
    launchJob(panel, lab, argumentText, "", async () => {
      const files = await Promise.all(lab.files.map(async (path) => {
        const response = await fetch(fileUrl(path), { credentials: "same-origin" });
        if (!response.ok) throw new Error(path + " を取得できません (HTTP " + response.status + ")");
        return { path, content: await response.text() };
      }));
      return { mode: "file", script: lab.file, files, args };
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

  function buildExperimentPanel(pre, lab, tests) {
    const panel = document.createElement("section");
    panel.className = "numerical-lab numerical-experiment-lab";
    panel.dataset.labId = lab.id;

    const header = document.createElement("div");
    header.className = "numerical-lab-header";
    const title = document.createElement("strong");
    title.textContent = lab.title;
    const status = document.createElement("span");
    status.className = "numerical-lab-status";
    const saved = loadProgress(lab);
    status.textContent = saved?.completed ? "実行済み" : "未実行";
    header.append(title, status);

    let stored = {};
    try {
      stored = saved && typeof saved.code === "string" ? JSON.parse(saved.code) : {};
    } catch (_error) {
      stored = {};
    }
    const settings = document.createElement("div");
    settings.className = "numerical-file-settings";
    const inputs = new Map();
    for (const param of lab.params) {
      const label = document.createElement("label");
      label.textContent = param.label;
      const input = document.createElement("input");
      input.type = "number";
      input.min = String(param.min);
      input.max = String(param.max);
      input.step = String(param.step);
      const previous = Number(stored[param.name]);
      input.value = String(stored[param.name] !== undefined &&
        Number.isFinite(previous) && previous >= param.min && previous <= param.max
        ? previous : param.defaultValue);
      input.setAttribute("aria-label", param.label);
      label.appendChild(input);
      settings.appendChild(label);
      inputs.set(param.name, input);
    }
    for (const input of inputs.values()) {
      input.addEventListener("input", () => {
        const values = {};
        let valid = true;
        for (const param of lab.params) {
          const field = inputs.get(param.name);
          const value = Number(field.value);
          if (!field.value.trim() || !field.checkValidity() ||
            !Number.isFinite(value) || value < param.min || value > param.max) {
            valid = false;
            break;
          }
          values[param.name] = value;
        }
        if (valid) saveProgress(lab, JSON.stringify(values), false);
        setStatus(panel, "条件を変更・未実行", "");
        setOutput(panel, "条件を変更しました。再実行して結果を確認してください。", false);
        setFigures(panel, []);
      });
    }

    const controls = document.createElement("div");
    controls.className = "numerical-lab-controls";
    const run = document.createElement("button");
    run.type = "button";
    run.className = "numerical-lab-run";
    run.textContent = "条件を指定して実行";
    run.addEventListener("click", () => {
      const values = {};
      for (const param of lab.params) {
        const input = inputs.get(param.name);
        const number = Number(input.value);
        if (!input.value.trim() || !input.checkValidity() || !Number.isFinite(number) ||
          number < param.min || number > param.max) {
          setStatus(panel, "条件エラー", "error");
          setOutput(panel, param.label + " は " + param.min + " ～ " +
            param.max + " の範囲で指定してください。", true);
          return;
        }
        values[param.name] = number;
      }
      const assignment = lab.params.map((param) =>
        param.name + " = " + String(values[param.name])).join("\n");
      launchJob(panel, lab, assignment + "\n" + lab.code,
        tests, () => ({}), JSON.stringify(values));
    });

    const stop = document.createElement("button");
    stop.type = "button";
    stop.className = "numerical-lab-stop";
    stop.textContent = "停止";
    stop.addEventListener("click", () => stopLab(panel));

    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "numerical-lab-reset";
    reset.textContent = "初期条件に戻す";
    reset.addEventListener("click", () => {
      if (currentJob?.panel === panel) stopLab(panel);
      for (const param of lab.params) {
        inputs.get(param.name).value = String(param.defaultValue);
      }
      clearProgress(lab);
      setStatus(panel, "未実行", "");
      setOutput(panel, "条件を指定して実行してください。", false);
      setFigures(panel, []);
    });

    const timeout = document.createElement("span");
    timeout.className = "numerical-lab-timeout";
    timeout.textContent = "実行上限 " + lab.timeoutMs + " ms";
    controls.append(run, stop, reset, timeout);

    const output = document.createElement("pre");
    output.className = "numerical-lab-output";
    output.setAttribute("aria-live", "polite");
    output.textContent = "条件を指定して実行してください。";
    const figures = document.createElement("div");
    figures.className = "numerical-lab-figures";

    const source = document.createElement("details");
    source.className = "numerical-experiment-source";
    const summary = document.createElement("summary");
    summary.textContent = "計算に使用する Python コード（参照用）";
    const sourcePre = document.createElement("pre");
    sourcePre.className = "numerical-lab-solution-code";
    const sourceCode = document.createElement("code");
    sourceCode.innerHTML = highlightPython(lab.code) + "\n";
    sourcePre.appendChild(sourceCode);
    source.append(summary, sourcePre);

    panel.append(header, settings, controls, output, figures, source);
    pre.replaceWith(panel);
  }

  function buildFilePanel(pre, lab) {
    const panel = document.createElement("section");
    panel.className = "numerical-lab numerical-file-lab";
    panel.dataset.labId = lab.id;

    const header = document.createElement("div");
    header.className = "numerical-lab-header";
    const title = document.createElement("strong");
    title.textContent = lab.title;
    const status = document.createElement("span");
    status.className = "numerical-lab-status";
    status.textContent = "未実行";
    header.append(title, status);

    const settings = document.createElement("div");
    settings.className = "numerical-file-settings";
    const presetLabel = document.createElement("label");
    presetLabel.textContent = "実験条件のプリセット";
    const preset = document.createElement("select");
    preset.setAttribute("aria-label", lab.title + " のプリセット");
    lab.presets.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = item.name;
      preset.appendChild(option);
    });
    presetLabel.appendChild(preset);

    const argsLabel = document.createElement("label");
    argsLabel.textContent = "Python の引数（変更可能）";
    const argsInput = document.createElement("input");
    argsInput.type = "text";
    argsInput.className = "numerical-file-args";
    argsInput.setAttribute("aria-label", lab.title + " のコマンドライン引数");
    const saved = loadProgress(lab);
    argsInput.value = saved && typeof saved.code === "string" ? saved.code : lab.code;
    argsLabel.appendChild(argsInput);
    settings.append(presetLabel, argsLabel);
    preset.addEventListener("change", () => {
      argsInput.value = lab.presets[Number(preset.value)].args;
      setStatus(panel, "未実行", "");
    });

    const controls = document.createElement("div");
    controls.className = "numerical-lab-controls";
    const runButton = document.createElement("button");
    runButton.type = "button";
    runButton.className = "numerical-lab-run";
    runButton.textContent = "このページで実行";
    runButton.addEventListener("click", () => runFileLab(panel, lab, argsInput.value));

    const stopButton = document.createElement("button");
    stopButton.type = "button";
    stopButton.className = "numerical-lab-stop";
    stopButton.textContent = "停止";
    stopButton.addEventListener("click", () => stopLab(panel));

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "numerical-lab-reset";
    resetButton.textContent = "初期条件に戻す";
    resetButton.addEventListener("click", () => {
      if (currentJob && currentJob.panel === panel) stopLab(panel);
      preset.value = "0";
      argsInput.value = lab.code;
      clearProgress(lab);
      setStatus(panel, "未実行", "");
      setOutput(panel, "", false);
      setFigures(panel, []);
    });

    const sourceLink = document.createElement("a");
    sourceLink.href = fileUrl(lab.file).href;
    sourceLink.textContent = "Python ソースを見る";
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.className = "numerical-file-source";

    const timeout = document.createElement("span");
    timeout.className = "numerical-lab-timeout";
    timeout.textContent = "実行上限 " + lab.timeoutMs + " ms";
    controls.append(runButton, stopButton, resetButton, sourceLink, timeout);

    const output = document.createElement("pre");
    output.className = "numerical-lab-output";
    output.setAttribute("aria-live", "polite");
    output.textContent = "プリセットを選んで実行してください。Python はブラウザ内で動作します。";
    const figures = document.createElement("div");
    figures.className = "numerical-lab-figures";

    panel.append(header, settings, controls, output, figures);
    pre.replaceWith(panel);
  }

  function mountLabs(container) {
    if (!container) return;
    const blocks = [...container.querySelectorAll("pre")];
    let labIndex = 0;

    for (const pre of blocks) {
      if (!pre.isConnected) continue;
      const language = languageOfPre(pre);
      if (language !== "python-lab" && language !== "python-file-lab") continue;

      const codeNode = pre.querySelector("code");
      if (!codeNode) continue;

      if (language === "python-file-lab") {
        try {
          buildFilePanel(pre, parseFileLab(codeNode.textContent, ++labIndex));
        } catch (error) {
          console.error("Python file lab could not be initialized:", error);
        }
        continue;
      }

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

      if (lab.mode === "experiment") {
        if (solution) throw new Error("experiment mode does not use python-solution");
        buildExperimentPanel(pre, lab, tests);
      } else {
        buildPanel(pre, lab, tests, solution);
      }
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
