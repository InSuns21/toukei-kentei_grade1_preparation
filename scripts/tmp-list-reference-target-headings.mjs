import fs from 'node:fs';
import path from 'node:path';

const targets = [
  'F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影',
  'F0_00D2B_単調収束_Fatou_優収束',
  'F0_00P5_大数の強法則',
  'F0_00P5A_truncation_Kronecker_一般SLLN',
  'F0_00P6_特性関数_中心極限定理',
  'F0_00P6A_iid_中心極限定理',
  'F0_00A3_半順序_Zorn_極大延長',
  'F0_02C1A_Hilbert射影定理_直交分解',
  'F0_02B_分離超平面定理_Farkas_SVM',
  'F0_02A_KKT条件の導出_接錐_polar_Farkas',
  'F0_02_制約付き最適化_双対_KKT',
  'F0_00D_Cauchy列_完備性_無限次元',
  'F0_00D4_Lebesgue測度_Borel集合_拡張定理',
];
const root = 'textbook/volumes/00_foundations';
for (const t of targets) {
  const p = path.join(root, t, 'index.md');
  console.log(`\n=== ${t} ===`);
  if (!fs.existsSync(p)) { console.log('MISSING'); continue; }
  fs.readFileSync(p, 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (/^#{1,4}\s/.test(line)) console.log(`${i + 1}: ${line}`);
  });
}
