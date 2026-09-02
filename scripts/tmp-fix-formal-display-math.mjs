import fs from 'node:fs';

for (const file of [
  'textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md',
  'textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md',
]) {
  let s = fs.readFileSync(file, 'utf8');
  const before = (s.match(/^\$$/gm) || []).length;
  s = s.replace(/^\$$/gm, '$$$$');
  const after = (s.match(/^\$$/gm) || []).length;
  if (before === 0) throw new Error(`no broken display delimiters found in ${file}`);
  if (after !== 0) throw new Error(`broken display delimiters remain in ${file}`);
  fs.writeFileSync(file, s);
  console.log(`${file}: fixed ${before} standalone display delimiter(s)`);
}
