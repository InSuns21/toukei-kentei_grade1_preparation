import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
let files = 0;
let linesFixed = 0;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md') out.push(full);
  }
  return out;
}

for (const file of walk(ROOT)) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let depth = 0;
  let changed = false;
  for (let i = 0; i < lines.length; i += 1) {
    const t = lines[i].trim();
    if (t === START) { depth += 1; continue; }
    if (t === END) { depth = Math.max(0, depth - 1); continue; }
    if (depth > 0 && lines[i] === '$') {
      lines[i] = '$$';
      linesFixed += 1;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, lines.join('\n'));
    files += 1;
  }
}

console.log(`Repaired ${linesFixed} display-math delimiter line(s) in ${files} file(s).`);
