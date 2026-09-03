import fs from 'node:fs';

const path = 'textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md';
let s = fs.readFileSync(path, 'utf8');
const matches = s.match(/^\$$/gm) ?? [];
if (matches.length !== 13) {
  throw new Error(`expected 13 corrupted standalone $ delimiters, got ${matches.length}`);
}
s = s.replace(/^\$$/gm, () => '$$');
fs.writeFileSync(path, s);
console.log('Repaired 13 display-math delimiters.');
