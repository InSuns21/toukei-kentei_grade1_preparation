import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanRoots = [
  path.join(root, 'textbook'),
  path.join(root, 'statistical-mathematics'),
  path.join(root, 'applied-rikou-80'),
];

const markdownFiles = [];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  }
}

function unquoteDisplayMath(source) {
  const lines = source.split(/\r?\n/);
  let inQuotedDisplay = false;

  return lines.map((line) => {
    if (!inQuotedDisplay && /^\s*>\s*\$\$\s*$/.test(line)) {
      inQuotedDisplay = true;
      return line.replace(/^(\s*)>\s?/, '$1');
    }

    if (inQuotedDisplay) {
      const isClosing = /^\s*>\s*\$\$\s*$/.test(line);
      const rewritten = line.replace(/^(\s*)>\s?/, '$1');
      if (isClosing) inQuotedDisplay = false;
      return rewritten;
    }

    return line;
  }).join('\n');
}

function moveVsComparisonToProse(source) {
  const pattern = /\$\$\s*\\boxed\{\\bar Y_1-\\bar Y_2\}\\quad\\text\{vs\}\\quad\\boxed\{\\bar Y_1\},\\boxed\{\\bar Y_2\}\s*\$\$/g;
  return source.replace(
    pattern,
    '**比較**：差 $\\bar Y_1-\\bar Y_2$ と、個別の平均 $\\bar Y_1,\\bar Y_2$'
  );
}

function normalizeVsInMath(source) {
  return source.replace(/\\text\s*\{\s*vs\s*\}/gi, '\\mathrm{vs}');
}

for (const dir of scanRoots) await walk(dir);

let changed = 0;
for (const file of markdownFiles) {
  const original = await readFile(file, 'utf8');
  let updated = unquoteDisplayMath(original);
  updated = moveVsComparisonToProse(updated);
  updated = normalizeVsInMath(updated);

  if (file.endsWith(path.join('F0_00E2_Cauchy_Schwarz_Bessel_Parseval', 'index.md'))) {
    updated = updated.replace('この係数表示はPCA、Fourier展開、正規直交展開の原型です。', 'この係数表示は主成分分析、Fourier展開、正規直交展開の原型です。');
  }

  if (updated !== original) {
    await writeFile(file, updated, 'utf8');
    changed += 1;
  }
}

const residual = [];
for (const file of markdownFiles) {
  const source = await readFile(file, 'utf8');
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/^\s*>\s*\$\$\s*$/.test(line)) {
      residual.push(`${path.relative(root, file)}:${index + 1}: quoted display math remains`);
    }
    if (/\\text\s*\{\s*vs\s*\}/i.test(line)) {
      residual.push(`${path.relative(root, file)}:${index + 1}: \\text{vs} remains`);
    }
  });
}

if (residual.length) {
  console.error('Automatic prose/math rendering repair left unresolved patterns:');
  for (const item of residual) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log(`Rewrote prose/math rendering patterns in ${changed} Markdown files.`);
}
