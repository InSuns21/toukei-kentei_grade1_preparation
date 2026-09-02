import fs from 'node:fs';
import path from 'node:path';

const pagesMode = process.argv.includes('--pages');
const ROOTS = pagesMode
  ? ['_site/textbook/volumes', '_site/applied-rikou-80', '_site/statistical-mathematics']
  : ['textbook/volumes', 'applied-rikou-80', 'statistical-mathematics'];
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const LABEL = '(?:定義|定理|命題|補題|系|公理|原理)';
const labelRe = new RegExp(`^\\s*(?:>\\s*)?\\*\\*${LABEL}(?:[（(：:].*)?\\*\\*`, 'u');
const formalHeadingRe = new RegExp(`^#{2,6}\\s+(?:\\d+(?:\\.\\d+)*(?:[.)．])?\\s*)?${LABEL}(?:[（(：:]|$)`, 'u');

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

for (const root of ROOTS.map((p) => path.resolve(p))) {
  for (const file of walk(root)) {
    const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let depth = 0;
    let proofDepth = 0;
    let fence = null;
    let declarationsInPanel = 0;
    let filePanels = 0;

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

console.log(`Formal statement panel validation passed${pagesMode ? ' for generated Pages' : ''}: ${panelCount} panel(s), ${labelCount} declaration(s), ${pageCount} page(s), standard blue rule verified.`);
