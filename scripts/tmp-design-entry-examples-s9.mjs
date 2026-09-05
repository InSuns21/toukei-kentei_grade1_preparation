import fs from 'node:fs';

const path = 'textbook/volumes/05_engineering/E3_01_実験計画_直交表_交絡/index.md';
let text = fs.readFileSync(path, 'utf8');

function insertAfter(anchorEnd, block, id) {
  if (text.includes(`definition-example-start: ${id}`)) return;
  if (!text.includes(anchorEnd)) throw new Error(`S9 example anchor not found: ${id}`);
  text = text.replace(anchorEnd, () => `${anchorEnd}\n\n${block}`);
}

insertAfter(
  `<!-- formal-statement-end -->\n\nこの例では植物の成長量です。確率変数として記述するときは $Y$ を使います。`,
  `<!-- definition-example-start: def-e3-01-response -->\n**定義の確認**  \n薬剤量を変えて植物の成長を調べる例では、実験後に測る植物の成長量が応答です。薬剤量は応答ではなく、応答へ影響させる側の因子です。\n<!-- definition-example-end -->`,
  'def-e3-01-response'
);

insertAfter(
  `<!-- formal-statement-end -->\n\nこの例では薬剤量が因子で、「0 mg、10 mg、20 mg」の3水準です。`,
  `<!-- definition-example-start: def-e3-01-factor-level -->\n**定義の確認**  \n薬剤量を 0 mg、10 mg、20 mg に設定するなら、因子は「薬剤量」、水準はその3つの設定値です。因子と水準を逆にしないことがポイントです。\n<!-- definition-example-end -->`,
  'def-e3-01-factor-level'
);

insertAfter(
  `<!-- formal-statement-end -->\n\n薬剤量だけなら3水準がそのまま3処理です。薬剤量3水準と温度2水準を同時に変えるなら、完全要因実験では $3\\times2=6$ 通りの処理があります。`,
  `<!-- definition-example-start: def-e3-01-treatment -->\n**定義の確認**  \n薬剤量3水準と温度2水準を同時に操作する完全要因実験では、処理は「薬剤量×温度」の6通りの組合せです。因子が2個でも、処理は各因子を別々に数えるのではなく実際に与える組合せで数えます。\n<!-- definition-example-end -->`,
  'def-e3-01-treatment'
);

insertAfter(
  `<!-- formal-statement-end -->\n\nこの例では鉢です。`,
  `<!-- definition-example-start: def-e3-01-experimental-unit -->\n**定義の確認**  \n薬剤量を鉢ごとに独立に割り付けるなら実験単位は鉢です。同じ鉢から葉を5枚測っても、薬剤を葉ごとに独立に割り付けていないので実験単位が5個へ増えるわけではありません。\n<!-- definition-example-end -->`,
  'def-e3-01-experimental-unit'
);

insertAfter(
  `<!-- formal-statement-end -->\n\n日、ロット、圃場の位置、担当者などが典型です。測定できるならモデルへ入れ、実験前に扱えるならブロック化などで設計へ組み込みます。`,
  `<!-- definition-example-start: def-e3-01-nuisance-factor -->\n**定義の確認**  \n薬剤効果を調べたいが実験日によって成長条件も変わるなら、「実験日」は応答へ影響し得る一方で主目的ではないため外乱因子です。日差が大きいと予想されるならブロック化の候補になります。\n<!-- definition-example-end -->`,
  'def-e3-01-nuisance-factor'
);

fs.writeFileSync(path, text);
