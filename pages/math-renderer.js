(function (root) {
  'use strict';

  const DISPLAY_CLASS = 'toukei-math-display';
  const INLINE_CLASS = 'toukei-math-inline';

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

  function docsifyPlugin(hook) {
    hook.beforeEach(function (markdown) {
      return protectMath(markdown);
    });

    hook.doneEach(function () {
      const container = document.querySelector('.markdown-section');
      if (!container) return;
      container.querySelectorAll('.toukei-math[data-tex]').forEach(renderPlaceholder);
    });
  }

  root.ToukeiMathRenderer = {
    protectMath,
    docsifyPlugin,
  };
})(typeof window !== 'undefined' ? window : globalThis);
