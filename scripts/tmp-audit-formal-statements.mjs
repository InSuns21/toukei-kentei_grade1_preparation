import fs from 'node:fs';
import path from 'node:path';

const roots = ['textbook/volumes', 'applied-rikou-80', 'statistical-mathematics']
  .map((p) => path.resolve(p))
  .filter((p) => fs.existsSync(p));

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const files = roots.flatMap(walk);
const labelRe = /^\s*(>\s*)?\*\*(定義|定理|命題|補題|系|公理|原理)(?:[（(：:].*)?\*\*/u;
const headingRe = /^#{2,6}\s+(.+)$/u;
const quoted = [];
const bare = [];
const formalHeadings = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const m = labelRe.exec(line);
    if (m) (m[1] ? quoted : bare).push(`${rel}:${i + 1}: ${line.trim()}`);
    const hm = headingRe.exec(line);
    if (hm && /(?:定義|定理|命題|補題|公理|原理)/u.test(hm[1])) {
      formalHeadings.push(`${rel}:${i + 1}: ${line.trim()}`);
    }
  }
}

console.log(`FILES=${files.length}`);
console.log(`QUOTED_LABELS=${quoted.length}`);
console.log(`BARE_LABELS=${bare.length}`);
console.log(`FORMALISH_HEADINGS=${formalHeadings.length}`);
console.log('\n=== BARE LABELS ===');
for (const line of bare) console.log(line);
console.log('\n=== FORMALISH HEADINGS ===');
for (const line of formalHeadings) console.log(line);
