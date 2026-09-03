import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const resultPhraseRe = /\*\*([^*]{1,100}(?:定理|不等式|等式|恒等式))\*\*\s*(?:です|である|と呼びます|といいます)/u;
const headingRe = /^#{2,6}\s+(.+(?:定理|不等式|等式|恒等式))\s*$/u;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && e.name === 'index.md') out.push(full);
  }
  return out;
}

const found = [];
for (const file of walk(ROOT)) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === START) { depth++; continue; }
    if (t === END) { depth = Math.max(0, depth - 1); continue; }
    if (depth > 0) continue;
    const phrase = resultPhraseRe.exec(lines[i]);
    if (phrase) found.push(`${rel}:${i + 1}\tPHRASE\t${phrase[1]}\t${t}`);
    const h = headingRe.exec(lines[i]);
    if (h) found.push(`${rel}:${i + 1}\tHEADING\t${h[1]}\t${t}`);
  }
}

console.log(`named theorem-like candidates: ${found.length}`);
for (const x of found) console.log(x);
