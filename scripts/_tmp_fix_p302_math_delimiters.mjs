import fs from 'node:fs';

const path = 'textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md';
let source = fs.readFileSync(path, 'utf8');
const pattern = /^(\s*)\$(\s*)$/gm;
const matches = [...source.matchAll(pattern)];
if (matches.length === 0) {
  throw new Error('no standalone single-dollar delimiters found');
}
source = source.replace(pattern, (_match, indent) => `${indent}$$`);
const remaining = [...source.matchAll(pattern)].length;
if (remaining !== 0) throw new Error(`standalone single-dollar delimiters remain: ${remaining}`);
fs.writeFileSync(path, source);
console.log(`Repaired ${matches.length} standalone single-dollar delimiters in P3-02.`);
