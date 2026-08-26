import fs from 'node:fs';

const path = 'textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md';
let source = fs.readFileSync(path, 'utf8');
const before = (source.match(/^\$$/gm) ?? []).length;
if (before !== 22) {
  throw new Error(`expected 22 standalone single-dollar delimiters, found ${before}`);
}
source = source.replace(/^\$$/gm, '$$$$');
const after = (source.match(/^\$$/gm) ?? []).length;
if (after !== 0) throw new Error(`standalone single-dollar delimiters remain: ${after}`);
fs.writeFileSync(path, source);
console.log('Repaired 11 display-math blocks in P3-02.');
