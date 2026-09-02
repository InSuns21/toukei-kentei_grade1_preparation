import fs from 'node:fs';

const c2Path = 'textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md';
const d2bPath = 'textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md';
const c1Path = 'textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md';

function replaceOnce(path, from, to, label) {
  const src = fs.readFileSync(path, 'utf8');
  if (src.includes(to)) {
    console.log(`${label}: already fixed`);
    return false;
  }
  if (!src.includes(from)) throw new Error(`${label}: target text not found`);
  fs.writeFileSync(path, src.replace(from, to));
  console.log(`${label}: fixed`);
  return true;
}

const c2 = fs.readFileSync(c2Path, 'utf8');
if (!c2.includes('<!-- proof-start -->\n### 証明\n\n近似最小列')) {
  const start = '近似最小列 $x_n\\in C$ を';
  const end = 'つまり最近点が存在します。';
  const startIndex = c2.indexOf(start);
  const endIndex = c2.indexOf(end, startIndex);
  if (startIndex < 0 || endIndex < 0) throw new Error('C2 nearest-point proof boundaries not found');
  const endAfter = endIndex + end.length;
  const proofBody = c2.slice(startIndex, endAfter);
  const wrapped = `<!-- proof-start -->\n### 証明\n\n${proofBody}\n<!-- proof-end -->`;
  fs.writeFileSync(c2Path, c2.slice(0, startIndex) + wrapped + c2.slice(endAfter));
  console.log('C2 nearest-point existence proof: folded');
} else {
  console.log('C2 nearest-point existence proof: already folded');
}

replaceOnce(
  d2bPath,
  '\\mu(A_k\\cap E_n)cap E_n)\\uparrow\\mu(A_k),',
  '\\mu(A_k\\cap E_n)\\uparrow\\mu(A_k),',
  'D2B MCT TeX typo'
);

replaceOnce(
  c1Path,
  '### 7.1 例：有限個の点の凸包はコンパクト',
  '### 5.1 例：有限個の点の凸包はコンパクト',
  'C1 subsection numbering'
);
