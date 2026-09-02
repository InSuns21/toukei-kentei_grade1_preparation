import fs from 'node:fs';

const path = 'textbook/f0-dream-theater-proof-audit.md';
let text = fs.readFileSync(path, 'utf8');

const ids = [
  'TODO-P1-B-01',
  'TODO-P1-B-02',
  'TODO-P1-C-01',
  'TODO-P1-C-02',
  'TODO-P1-C-03',
  'TODO-P1-C-04',
  'TODO-P1-C-05',
  'TODO-P1-D-01',
  'TODO-P1-D-02'
];

for (const id of ids) {
  const from = `### ${id}`;
  const to = `### DONE-${id.replace('TODO-', '')} ✅`;
  if (!text.includes(from)) throw new Error(`missing ${id}`);
  text = text.replace(from, to);
}

text = text.replace(
  '## Batch 1：距離・compact・complete\n\nB → C → D を先に閉じる。\n\nこれにより後続のWeierstrass、射影、スペクトル定理の床を固める。',
  '## Batch 1：距離・compact・complete ✅\n\nB → C → D の主要命題を証明し、定義・具体例・A/B中心の演習まで補強済み。Cのみ統合問題としてLevel Cを1問置いた。\n\n- B: Level A 2問 / B 3問 / C 0問\n- C: Level A 2問 / B 3問 / C 1問\n- D: Level A 2問 / B 3問 / C 0問\n\nこれにより後続のWeierstrass、射影、スペクトル定理の床を固めた。'
);

fs.writeFileSync(path, text);
