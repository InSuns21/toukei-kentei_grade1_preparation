import fs from 'node:fs';

const paths = [
  'textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md',
  'textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md',
  'textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md'
];

for (const path of paths) {
  let text = fs.readFileSync(path, 'utf8');
  const before = (text.match(/^\$$/gm) || []).length;
  text = text.replace(/^\$$/gm, '$$$$');
  const after = (text.match(/^\$$/gm) || []).length;
  fs.writeFileSync(path, text);
  console.log(`${path}: standalone single-dollar delimiters ${before} -> ${after}`);
}

// trigger
