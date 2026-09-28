import fs from 'node:fs';
import path from 'node:path';

const pagesMode = process.argv.includes('--pages');
const ROOTS = pagesMode
  ? ['_site/textbook/volumes', '_site/applied-rikou-80', '_site/statistical-mathematics']
  : ['textbook/volumes', 'applied-rikou-80', 'statistical-mathematics'];
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const LABEL = '(?:定義|定理|命題|補題|系|公理|原理)';
const STABLE_PREFIX = '(?:def|thm|prop|lem|cor|axiom|principle|ref)';
const labelRe = new RegExp(`^\\s*(?:>\\s*)?\\*\\*${LABEL}(?:[（(：:].*)?\\*\\*`, 'u');
const formalHeadingRe = new RegExp(`^#{2,6}\\s+(?:\\d+(?:\\.\\d+)*(?:[.)．])?\\s*)?${LABEL}(?:[（(：:]|$)`, 'u');
const stableAnchorRe = new RegExp(`^\\s*<a\\s+id=["'](${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*)["']\\s*><\\/a>\\s*$`, 'iu');

const inlineMathRe = /(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)/gu;

function visualMathLength(tex) {
  return tex
    .replace(/\\(?:left|right|bigl|bigr|Bigl|Bigr|displaystyle|textstyle)/gu, '')
    .replace(/\\(?:mathbb|mathrm|mathbf|mathsf|operatorname|text|cal|mathcal)/gu, '')
    .replace(/\\[A-Za-z]+/gu, 'x')
    .replace(/\\/gu, '')
    .replace(/[{}]/gu, '')
    .replace(/\s+/gu, '')
    .length;
}

function relationMathLength(tex) {
  const hasMainRelation = /(?:=|\\(?:le|ge|neq|iff|Longleftrightarrow|Rightarrow|implies)\b|\\to\s*(?:0|\\infty)\b|\\xrightarrow)/u.test(tex);
  return hasMainRelation ? visualMathLength(tex) : 0;
}

function estimatedDisplayWidth(line) {
  const withMathWidths = line.replace(inlineMathRe, (_full, tex) => 'x'.repeat(visualMathLength(tex)));
  const plain = withMathWidths.replace(/[*_>`#]/gu, '');
  let width = 0;
  for (const char of plain) {
    if (/\s/u.test(char)) width += 0.5;
    else width += char.codePointAt(0) > 0x7f ? 2 : 1;
  }
  return width;
}

function denseInlineMathReason(line, panelHasDisplayMath) {
  const maths = [...line.matchAll(inlineMathRe)].map((match) => match[1].trim());
  if (maths.length === 0) return null;

  const relationLengths = maths.map(relationMathLength);
  const maxRelationLength = Math.max(...relationLengths);
  const displayWidth = estimatedDisplayWidth(line);

  // A visibly long equality/inequality/limit should normally stand on its own.
  // Keep the threshold conservative so short type declarations and notation
  // do not become display math merely because their TeX source is verbose.
  if (maxRelationLength >= 30 && displayWidth >= 80) {
    return `long inline relation/formula (estimated display length ${maxRelationLength})`;
  }

  // When the panel has no display equation at all, a long prose line carrying
  // many math fragments is a strong signal that the main condition/result was
  // packed inline. If the panel already has display math, this usually describes
  // harmless hypotheses surrounding a properly displayed main formula.
  if (!panelHasDisplayMath && displayWidth >= 120 && maths.length >= 5 && maxRelationLength >= 10) {
    return `math-heavy formal statement line without display math (estimated display width ${displayWidth.toFixed(1)}, ${maths.length} inline fragments)`;
  }
  return null;
}

function selfTestDenseInlineMath() {
  const bad = '> $f\\in C([0,1])$ に対し $B_nf(x)=\\sum_{k=0}^n f(k/n)\\binom nk x^k(1-x)^{n-k}$ を定義する。';
  const good = '> 真関数 $f:\\mathbb R^n\\to(-\\infty,+\\infty]$ が凸であるとは、任意の $x,y\\in\\mathbb R^n$ に対して';
  if (!denseInlineMathReason(bad, false)) {
    throw new Error('formal statement math lint self-test failed: long inline defining equation was not detected');
  }
  if (denseInlineMathReason(good, true)) {
    throw new Error('formal statement math lint self-test failed: short type/hypothesis notation was falsely detected');
  }
}

selfTestDenseInlineMath();

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const errors = [];
let panelCount = 0;
let pageCount = 0;
let labelCount = 0;
let anchoredPanelCount = 0;
let stableAnchorCount = 0;

for (const root of ROOTS.map((p) => path.resolve(p))) {
  for (const file of walk(root)) {
    const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

    if (!pagesMode) {
      let panelStart = -1;
      for (let k = 0; k < lines.length; k += 1) {
        const trimmed = lines[k].trim();
        if (trimmed === START) {
          panelStart = k;
          continue;
        }
        if (trimmed !== END || panelStart < 0) continue;

        const panelLines = lines.slice(panelStart + 1, k);
        const panelHasDisplayMath = panelLines.some((panelLine) => panelLine.trim() === '$$');
        for (let offset = 0; offset < panelLines.length; offset += 1) {
          const panelLine = panelLines[offset];
          if (panelLine.trim() === '$$') continue;
          const reason = denseInlineMathReason(panelLine, panelHasDisplayMath);
          if (reason) {
            const sourceLineNo = panelStart + offset + 2;
            errors.push(`${rel}:${sourceLineNo}: ${reason} inside a formal statement; keep short notation inline, but move the main equation or condition to an unquoted $$...$$ display block`);
          }
        }
        panelStart = -1;
      }
    }    let depth = 0;
    let proofDepth = 0;
    let fence = null;
    let declarationsInPanel = 0;
    let filePanels = 0;
    const seenAnchors = new Set();

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const t = line.trim();
      const lineNo = i + 1;

      if (fence) {
        if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence = null;
        continue;
      }
      const openFence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (openFence) {
        fence = { char: openFence[1][0], length: openFence[1].length };
        continue;
      }

      const anchorMatch = stableAnchorRe.exec(line);
      if (anchorMatch) {
        const id = anchorMatch[1];
        stableAnchorCount += 1;
        if (seenAnchors.has(id)) errors.push(`${rel}:${lineNo}: duplicate stable formal anchor #${id}`);
        seenAnchors.add(id);
      }

      if (t === '<!-- proof-start -->') {
        if (depth > 0) {
          errors.push(`${rel}:${lineNo}: folded proof must not start inside a formal statement panel; close formal-statement-end first`);
        }
        proofDepth += 1;
      }
      if (t === '<!-- proof-end -->') proofDepth = Math.max(0, proofDepth - 1);

      if (t === START) {
        if (depth > 0) errors.push(`${rel}:${lineNo}: nested formal statement panel is not allowed`);
        if (proofDepth > 0) errors.push(`${rel}:${lineNo}: formal statement panel must not start inside a folded proof`);

        const nearbyAnchors = [];
        for (let j = Math.max(0, i - 8); j < i; j += 1) {
          const m = stableAnchorRe.exec(lines[j]);
          if (m) nearbyAnchors.push({ id: m[1], line: j + 1 });
        }
        if (nearbyAnchors.length === 0) {
          errors.push(`${rel}:${lineNo}: formal statement must have an explicit stable def-/thm-/prop-/lem-/cor-/axiom-/principle-/ref- anchor immediately before it`);
        } else {
          anchoredPanelCount += 1;
        }

        depth += 1;
        declarationsInPanel = 0;
        panelCount += 1;
        filePanels += 1;
        continue;
      }

      if (t === END) {
        if (depth === 0) {
          errors.push(`${rel}:${lineNo}: unmatched formal-statement-end marker`);
        } else if (declarationsInPanel !== 1) {
          errors.push(`${rel}:${lineNo}: formal statement panel must contain exactly one formal declaration; found ${declarationsInPanel}`);
        }
        depth = Math.max(0, depth - 1);
        declarationsInPanel = 0;
        continue;
      }


      const isLabel = labelRe.test(line);
      const isHeading = formalHeadingRe.test(line);
      if (isLabel || isHeading) {
        labelCount += 1;
        if (depth === 0) {
          errors.push(`${rel}:${lineNo}: formal ${isHeading ? 'heading' : 'label'} is outside the standard blue-line panel markers`);
        } else {
          declarationsInPanel += 1;
        }
      }
    }

    if (depth !== 0) errors.push(`${rel}: unmatched formal-statement-start marker at end of file`);
    if (filePanels > 0) pageCount += 1;
  }
}

if (panelCount !== labelCount) {
  errors.push(`formal statement count mismatch: ${panelCount} panel(s) for ${labelCount} detected declaration(s)`);
}
if (panelCount !== anchoredPanelCount) {
  errors.push(`formal statement anchor mismatch: ${anchoredPanelCount}/${panelCount} panel(s) have a nearby stable anchor`);
}

const runtimeRoot = pagesMode ? path.resolve('_site') : path.resolve('pages');
const indexPath = path.join(runtimeRoot, 'index.html');
const rendererPath = path.join(runtimeRoot, 'math-renderer.js');

if (!fs.existsSync(indexPath)) {
  errors.push(`${path.relative(process.cwd(), indexPath)}: missing Pages index; formal statement styling cannot be verified`);
} else {
  const html = fs.readFileSync(indexPath, 'utf8');
  const styleChecks = [
    [/--formal-statement-rule:\s*#2f6f9f\b/i, 'standard blue rule token (--formal-statement-rule: #2f6f9f)'],
    [/\.formal-statement\s*\{[^}]*border-left:\s*[4-6]px\s+solid\s+var\(--formal-statement-rule\)/is, '4–6px formal statement left rule'],
    [/\.formal-statement\s*>\s*blockquote\s*\{[^}]*border-left:\s*0/is, 'blockquote double-rule suppression'],
  ];
  for (const [pattern, label] of styleChecks) {
    if (!pattern.test(html)) errors.push(`${path.relative(process.cwd(), indexPath)}: missing ${label}`);
  }
}

if (!fs.existsSync(rendererPath)) {
  errors.push(`${path.relative(process.cwd(), rendererPath)}: missing Pages renderer; formal statement wrapping cannot be verified`);
} else {
  const js = fs.readFileSync(rendererPath, 'utf8');
  const required = [
    ['wrapFormalStatementBlocks', 'formal statement wrapper transform'],
    [START, 'formal-statement-start marker'],
    [END, 'formal-statement-end marker'],
    ['<div class="formal-statement">$1</div>', 'formal statement wrapper output'],
    ['hook.afterEach', 'post-Markdown wrapping hook'],
  ];
  for (const [needle, label] of required) {
    if (!js.includes(needle)) errors.push(`${path.relative(process.cwd(), rendererPath)}: missing ${label} (${needle})`);
  }
}

if (errors.length) {
  console.error(`Formal statement panel validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Formal statement panel validation passed${pagesMode ? ' for generated Pages' : ''}: ${panelCount} panel(s), ${anchoredPanelCount} anchored panel(s), ${stableAnchorCount} stable anchor(s), ${labelCount} declaration(s), ${pageCount} page(s), standard blue rule verified.`);
