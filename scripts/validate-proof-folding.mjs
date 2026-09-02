import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const PAGES_INDEX = path.resolve('pages/index.html');
const MATH_RENDERER = path.resolve('pages/math-renderer.js');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function normalizeTitle(title) {
  return title
    .replace(/[`*_]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function isProofHeading(line) {
  const m = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return false;
  const title = normalizeTitle(m[2]);
  return /^(?:完全)?証明(?:\s*(?:[（(].*[）)]|[:：].*))?$/u.test(title)
    || /^proof(?:\s*(?:[（(].*[）)]|[:：].*))?$/iu.test(title);
}

function isProofLabel(line) {
  const plain = line.replace(/^\s*>\s?/, '').trim();
  return /^\*\*(?:完全)?証明\*\*$/u.test(plain)
    || /^\*\*proof\*\*$/iu.test(plain)
    || /^\*\*(?:完全)?証明[:：]\*\*$/u.test(plain)
    || /^\*\*proof[:：]\*\*$/iu.test(plain)
    || /^(?:完全)?証明[:：]$/u.test(plain)
    || /^proof[:：]$/iu.test(plain);
}

const errors = [];
let proofBlockCount = 0;
let proofPageCount = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let proofDepth = 0;
  let solutionDepth = 0;
  let fileProofBlocks = 0;
  let blockHasProofLabel = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineNo = i + 1;

    if (line.includes('<details') && /proof/i.test(line)) {
      errors.push(`${rel}:${lineNo}: proof folding HTML must not be handwritten in Markdown; use proof-start/proof-end markers`);
    }

    if (line.trim() === '<!-- solution-start -->') {
      solutionDepth += 1;
      continue;
    }
    if (line.trim() === '<!-- solution-end -->') {
      solutionDepth -= 1;
      if (solutionDepth < 0) {
        errors.push(`${rel}:${lineNo}: unmatched solution-end marker`);
        solutionDepth = 0;
      }
      continue;
    }

    if (line.trim() === '<!-- proof-start -->') {
      if (proofDepth > 0) {
        errors.push(`${rel}:${lineNo}: nested proof-start marker is not allowed`);
      }
      if (solutionDepth > 0) {
        errors.push(`${rel}:${lineNo}: proof block inside solution block is redundant; the solution is already collapsible`);
      }
      proofDepth += 1;
      fileProofBlocks += 1;
      proofBlockCount += 1;
      blockHasProofLabel = false;
      continue;
    }

    if (line.trim() === '<!-- proof-end -->') {
      if (proofDepth === 0) {
        errors.push(`${rel}:${lineNo}: unmatched proof-end marker`);
      } else if (!blockHasProofLabel) {
        errors.push(`${rel}:${lineNo}: proof block does not contain an explicit 証明/Proof heading or label`);
      }
      proofDepth = Math.max(0, proofDepth - 1);
      blockHasProofLabel = false;
      continue;
    }

    const proofLike = isProofHeading(line) || isProofLabel(line);
    if (proofLike && proofDepth > 0) blockHasProofLabel = true;

    if (proofLike && proofDepth === 0 && solutionDepth === 0) {
      errors.push(`${rel}:${lineNo}: visible proof section found outside a collapsible proof block`);
    }
  }

  if (proofDepth !== 0) errors.push(`${rel}: unmatched proof-start marker at end of file`);
  if (solutionDepth !== 0) errors.push(`${rel}: unmatched solution marker at end of file`);
  if (fileProofBlocks > 0) proofPageCount += 1;
}

if (!fs.existsSync(PAGES_INDEX)) {
  errors.push('pages/index.html: missing Pages runtime; proof folding cannot be verified');
} else {
  const html = fs.readFileSync(PAGES_INDEX, 'utf8');
  if (!html.includes('window.ToukeiMathRenderer.docsifyPlugin')) {
    errors.push('pages/index.html: ToukeiMathRenderer.docsifyPlugin is not registered in Docsify');
  }
  if (!html.includes('.solution-details')) {
    errors.push('pages/index.html: shared details styling (.solution-details) is missing');
  }
}

if (!fs.existsSync(MATH_RENDERER)) {
  errors.push('pages/math-renderer.js: missing proof folding runtime');
} else {
  const js = fs.readFileSync(MATH_RENDERER, 'utf8');
  const required = [
    ['foldProofBlocks', 'proof folding transform'],
    ['<!-- proof-start -->', 'proof-start replacement marker'],
    ['<!-- proof-end -->', 'proof-end replacement marker'],
    ['proof-details', 'proof details class'],
    ['証明を表示', 'proof summary label'],
    ['hook.afterEach', 'post-Markdown proof folding hook']
  ];
  for (const [needle, label] of required) {
    if (!js.includes(needle)) errors.push(`pages/math-renderer.js: missing ${label} (${needle})`);
  }
}

if (errors.length) {
  console.error(`Proof folding validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Proof folding validation passed: ${proofBlockCount} proof block(s) across ${proofPageCount} textbook page(s).`);
