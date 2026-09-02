(function (root) {
  'use strict';

  const DISPLAY_CLASS = 'toukei-math-display';
  const INLINE_CLASS = 'toukei-math-inline';
  const scriptBase = typeof document !== 'undefined' && document.currentScript?.src
    ? new URL('.', document.currentScript.src)
    : null;
  const localKatexScript = scriptBase ? new URL('vendor/katex/katex.min.js', scriptBase).href : null;
  const localKatexStylesheet = scriptBase ? new URL('vendor/katex/katex.min.css', scriptBase).href : null;
  let katexLoadPromise = null;

  function reportConnectivityToServiceWorker() {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    const payload = { type: 'SET_CONNECTIVITY', online: navigator.onLine };
    const controller = navigator.serviceWorker.controller;
    if (controller) {
      controller.postMessage(payload);
      return;
    }

    navigator.serviceWorker.ready
      .then((registration) => {
        const worker = registration.active || registration.waiting;
        if (worker) worker.postMessage(payload);
      })
      .catch(() => {});
  }

  // This script is loaded before deferred Docsify. On an already-controlled
  // offline page, report airplane/offline state before Docsify starts fetching
  // Markdown so the Service Worker can serve cached content immediately.
  reportConnectivityToServiceWorker();
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', reportConnectivityToServiceWorker);
  }
  if (root && typeof root.addEventListener === 'function') {
    root.addEventListener('online', reportConnectivityToServiceWorker);
    root.addEventListener('offline', reportConnectivityToServiceWorker);
  }

  function isEscaped(text, index) {
    let slashCount = 0;
    for (let i = index - 1; i >= 0 && text[i] === '\\'; i -= 1) slashCount += 1;
    return slashCount % 2 === 1;
  }

  function findClosing(text, delimiter, start, stopAtNewline) {
    for (let i = start; i <= text.length - delimiter.length; i += 1) {
      if (stopAtNewline && text[i] === '\n') return -1;
      if (text.startsWith(delimiter, i) && !isEscaped(text, i)) return i;
    }
    return -1;
  }

  function placeholder(tex, display) {
    const kind = display ? DISPLAY_CLASS : INLINE_CLASS;
    return `<span class="toukei-math ${kind}" data-tex="${encodeURIComponent(tex.trim())}"></span>`;
  }

  function protectMathOutsideFences(text) {
    let output = '';
    let i = 0;

    while (i < text.length) {
      // Leave inline code untouched. Fenced code blocks are handled by protectMath().
      if (text[i] === '`') {
        let runLength = 1;
        while (text[i + runLength] === '`') runLength += 1;
        const codeFence = '`'.repeat(runLength);
        const close = text.indexOf(codeFence, i + runLength);
        if (close === -1) {
          output += text.slice(i);
          break;
        }
        output += text.slice(i, close + runLength);
        i = close + runLength;
        continue;
      }

      if (text.startsWith('$$', i) && !isEscaped(text, i)) {
        const close = findClosing(text, '$$', i + 2, false);
        if (close !== -1 && close > i + 2) {
          output += placeholder(text.slice(i + 2, close), true);
          i = close + 2;
          continue;
        }
        output += '$$';
        i += 2;
        continue;
      }

      if (text[i] === '$' && !isEscaped(text, i)) {
        const close = findClosing(text, '$', i + 1, true);
        if (close !== -1 && close > i + 1) {
          output += placeholder(text.slice(i + 1, close), false);
          i = close + 1;
          continue;
        }
      }

      if (text.startsWith('\\[', i) && !isEscaped(text, i)) {
        const close = text.indexOf('\\]', i + 2);
        if (close !== -1 && close > i + 2) {
          output += placeholder(text.slice(i + 2, close), true);
          i = close + 2;
          continue;
        }
      }

      if (text.startsWith('\\(', i) && !isEscaped(text, i)) {
        const close = text.indexOf('\\)', i + 2);
        if (close !== -1 && close > i + 2) {
          output += placeholder(text.slice(i + 2, close), false);
          i = close + 2;
          continue;
        }
      }

      output += text[i];
      i += 1;
    }

    return output;
  }

  function protectMath(markdown) {
    const lines = markdown.match(/[^\n]*\n|[^\n]+$/g) || [];
    let output = '';
    let outsideBuffer = '';
    let fence = null;

    function flushOutside() {
      if (!outsideBuffer) return;
      output += protectMathOutsideFences(outsideBuffer);
      outsideBuffer = '';
    }

    for (const line of lines) {
      if (fence) {
        output += line;
        const closePattern = new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`);
        if (closePattern.test(line.replace(/\n$/, ''))) fence = null;
        continue;
      }

      const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (open) {
        flushOutside();
        output += line;
        fence = { char: open[1][0], length: open[1].length };
        continue;
      }

      outsideBuffer += line;
    }

    flushOutside();
    return output;
  }

  function foldProofBlocks(html) {
    return html.replace(
      /<!-- proof-start -->([\s\S]*?)<!-- proof-end -->/g,
      '<details class="solution-details proof-details"><summary>証明を表示</summary><div class="proof-body">$1</div></details>'
    );
  }

  function katexStylesheetLoaded() {
    if (typeof document === 'undefined') return true;
    return [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter((link) => /katex(?:\.min)?\.css/i.test(link.href || ''))
      .some((link) => Boolean(link.sheet));
  }

  function ensureLocalKatexStylesheet() {
    if (typeof document === 'undefined' || !localKatexStylesheet || katexStylesheetLoaded()) return;
    if (document.querySelector('link[data-toukei-local-katex]')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = localKatexStylesheet;
    link.dataset.toukeiLocalKatex = 'true';
    document.head.appendChild(link);
  }

  function ensureKatexRuntime() {
    ensureLocalKatexStylesheet();
    if (root.katex) return Promise.resolve(root.katex);
    if (katexLoadPromise) return katexLoadPromise;
    if (typeof document === 'undefined' || !localKatexScript) {
      return Promise.reject(new Error('KaTeX runtime is unavailable'));
    }

    katexLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-toukei-local-katex]');
      if (existing) {
        existing.addEventListener('load', () => root.katex ? resolve(root.katex) : reject(new Error('KaTeX fallback loaded without runtime')), { once: true });
        existing.addEventListener('error', () => reject(new Error('KaTeX fallback failed to load')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = localKatexScript;
      script.dataset.toukeiLocalKatex = 'true';
      script.onload = () => root.katex ? resolve(root.katex) : reject(new Error('KaTeX fallback loaded without runtime'));
      script.onerror = () => reject(new Error('KaTeX fallback failed to load'));
      document.head.appendChild(script);
    });

    return katexLoadPromise;
  }

  function renderPlaceholder(node) {
    if (!node || !root.katex) return;
    const encoded = node.getAttribute('data-tex');
    if (encoded === null) return;

    try {
      root.katex.render(decodeURIComponent(encoded), node, {
        throwOnError: false,
        displayMode: node.classList.contains(DISPLAY_CLASS),
      });
      node.removeAttribute('data-tex');
    } catch (error) {
      console.error('KaTeX rendering failed', error);
    }
  }

  function revealRawTex(node) {
    if (!node) return;
    const encoded = node.getAttribute('data-tex');
    if (encoded === null) return;
    const tex = decodeURIComponent(encoded);
    node.textContent = node.classList.contains(DISPLAY_CLASS) ? `$$${tex}$$` : `$${tex}$`;
  }

  function renderMath(container) {
    if (!container) return;
    const nodes = [...container.querySelectorAll('.toukei-math[data-tex]')];
    if (!nodes.length) return;

    ensureKatexRuntime()
      .then(() => nodes.forEach(renderPlaceholder))
      .catch((error) => {
        console.error('KaTeX runtime unavailable; showing raw TeX instead', error);
        nodes.forEach(revealRawTex);
      });
  }

  function docsifyPlugin(hook) {
    hook.beforeEach(function (markdown) {
      return protectMath(markdown);
    });

    hook.afterEach(function (html) {
      return foldProofBlocks(html);
    });

    hook.doneEach(function () {
      renderMath(document.querySelector('.markdown-section'));
    });
  }

  root.ToukeiMathRenderer = {
    protectMath,
    foldProofBlocks,
    docsifyPlugin,
  };
})(typeof window !== 'undefined' ? window : globalThis);
