import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');

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
  return title.replace(/[`*_]/g, '').replace(/<[^>]+>/g, '').trim();
}

function proofHeading(line) {
  const m = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return null;
  const title = normalizeTitle(m[2]);
  const substantive = /^(?:完全)?証明(?:\s*(?:[（(].*[）)]|[:：].*))?$/u.test(title)
    || /^proof(?:\s*(?:[（(].*[）)]|[:：].*))?$/iu.test(title);
  if (!substantive) return null;
  return { level: m[1].length, title };
}

function headingLevel(line) {
  const m = /^(#{1,6})\s+/.exec(line);
  return m ? m[1].length : null;
}

function proofLabel(line) {
  const plain = line.replace(/^\s*>\s?/, '').trim();
  return /^\*\*(?:完全)?証明\*\*$/u.test(plain)
    || /^\*\*proof\*\*$/iu.test(plain)
    || /^\*\*(?:完全)?証明[:：]\*\*$/u.test(plain)
    || /^\*\*proof[:：]\*\*$/iu.test(plain)
    || /^(?:完全)?証明[:：]$/u.test(plain)
    || /^proof[:：]$/iu.test(plain);
}

function theoremBlockStart(line) {
  return /^\s*>\s*\*\*(?:定義|定理|命題|補題|系|注意|反例)(?:[（(：:].*)?\*\*/u.test(line);
}

function qedLine(line) {
  return /\\(?:square|blacksquare)\b|(?:^|\s)(?:QED|q\.e\.d\.)\s*$/iu.test(line);
}

let changedFiles = 0;
let insertedBlocks = 0;
const unresolvedLabels = [];

for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  const hadFinalNewline = original.endsWith('\n');
  // Rebuild all proof markers from the semantic headings so a previous mechanical
  // migration cannot leave theorem statements or follow-up commentary hidden.
  const lines = original
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '<!-- proof-start -->' && line.trim() !== '<!-- proof-end -->');
  const out = [];
  let i = 0;
  let solutionDepth = 0;
  let changed = original.includes('<!-- proof-start -->') || original.includes('<!-- proof-end -->');

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '<!-- solution-start -->') {
      solutionDepth += 1;
      out.push(line);
      i += 1;
      continue;
    }
    if (trimmed === '<!-- solution-end -->') {
      solutionDepth = Math.max(0, solutionDepth - 1);
      out.push(line);
      i += 1;
      continue;
    }

    const match = proofHeading(line);
    if (match && solutionDepth === 0) {
      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const candidate = lines[j];
        const candidateTrimmed = candidate.trim();

        if (candidateTrimmed === '<!-- solution-start -->') break;
        const nextProof = proofHeading(candidate);
        if (nextProof) break;
        const level = headingLevel(candidate);
        if (level !== null && level <= match.level) break;
        if (theoremBlockStart(candidate)) break;
        if (/^\s*---+\s*$/.test(candidate)) break;

        if (qedLine(candidate)) {
          j += 1;
          break;
        }
      }

      out.push('<!-- proof-start -->');
      for (let k = i; k < j; k += 1) out.push(lines[k]);
      out.push('<!-- proof-end -->');
      insertedBlocks += 1;
      changed = true;
      i = j;
      continue;
    }

    if (solutionDepth === 0 && proofLabel(line)) {
      unresolvedLabels.push(`${path.relative(process.cwd(), file).replaceAll(path.sep, '/')}:${i + 1}: ${line.trim()}`);
    }

    out.push(line);
    i += 1;
  }

  if (changed) {
    let next = out.join('\n');
    if (hadFinalNewline && !next.endsWith('\n')) next += '\n';
    if (next !== original) {
      fs.writeFileSync(file, next);
      changedFiles += 1;
    }
  }
}

console.log(`Rebuilt ${insertedBlocks} proof block(s) across ${changedFiles} changed file(s).`);
if (unresolvedLabels.length) {
  console.error('Standalone proof labels require manual migration:');
  for (const item of unresolvedLabels) console.error(`- ${item}`);
  process.exitCode = 2;
}
