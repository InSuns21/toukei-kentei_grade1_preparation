import fs from 'node:fs';

const p101Path = 'textbook/volumes/01_probability/P1_01_事象と確率/index.md';
const p102Path = 'textbook/volumes/01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md';

function replaceExact(text, bad, good, label) {
  if (text.includes(good)) return text;
  if (!text.includes(bad)) throw new Error(`S12 repair target not found: ${label}`);
  return text.replace(bad, () => good);
}

let p101 = fs.readFileSync(p101Path, 'utf8');

p101 = replaceExact(
  p101,
  `<!-- formal-statement-start -->\n> **定理（包除原理：二事象・三事象）**  \n> 任意の事象 $A,B,C$ に対して\n> $$\n> P(A\\cup B)=P(A)+P(B)-P(A\\cap B),\n> $$\n> $$\n> \\begin{aligned}\n> P(A\\cup B\\cup C)\n> &=P(A)+P(B)+P(C)\\\\\n> &\\quad-P(A\\cap B)-P(B\\cap C)-P(C\\cap A)\\\\\n> &\\quad+P(A\\cap B\\cap C).\n> \\end{aligned}\n> $$\n> すなわち、重複して数えた共通部分を交互に引き戻し・足し戻す。\n<!-- formal-statement-end -->`,
  `<!-- formal-statement-start -->\n> **定理（包除原理：二事象・三事象）**  \n> 任意の事象 $A,B,C$ に対して次が成り立つ。\n\n$$\nP(A\\cup B)=P(A)+P(B)-P(A\\cap B).\n$$\n\n$$\n\\begin{aligned}\nP(A\\cup B\\cup C)\n&=P(A)+P(B)+P(C)\\\\\n&\\quad-P(A\\cap B)-P(B\\cap C)-P(C\\cap A)\\\\\n&\\quad+P(A\\cap B\\cap C).\n\\end{aligned}\n$$\n\n> すなわち、重複して数えた共通部分を交互に引き戻し・足し戻す。\n<!-- formal-statement-end -->`,
  'inclusion-exclusion-display-math',
);

fs.writeFileSync(p101Path, p101);

let p102 = fs.readFileSync(p102Path, 'utf8');

p102 = replaceExact(
  p102,
  `<!-- formal-statement-start -->\n> **定義（条件付き確率）**  \n> $P(B)>0$ のとき、事象 $B$ が起きたという条件のもとで事象 $A$ が起きる確率を\n> $$\n> P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\n> $$\n> と定め、$A$ の **$B$ のもとでの条件付き確率** という。\n<!-- formal-statement-end -->`,
  `<!-- formal-statement-start -->\n> **定義（条件付き確率）**  \n> $P(B)>0$ のとき、$P(A\\mid B)=P(A\\cap B)/P(B)$ と定め、これを事象 $A$ の **$B$ のもとでの条件付き確率** という。\n<!-- formal-statement-end -->`,
  'conditional-probability-inline',
);

p102 = replaceExact(
  p102,
  `<!-- formal-statement-start -->\n> **定義（統計的独立）**  \n> 二事象 $A,B$ が\n> $$\n> P(A\\cap B)=P(A)P(B)\n> $$\n> を満たすとき、$A,B$ は **独立（統計的独立）** であるという。\n<!-- formal-statement-end -->`,
  `<!-- formal-statement-start -->\n> **定義（統計的独立）**  \n> 二事象 $A,B$ が $P(A\\cap B)=P(A)P(B)$ を満たすとき、$A,B$ は **独立（統計的独立）** であるという。\n<!-- formal-statement-end -->`,
  'independence-inline',
);

p102 = replaceExact(
  p102,
  `<!-- formal-statement-start -->\n> **定義（条件付き独立）**  \n> $P(C)>0$ のとき\n> $$\n> P(A\\cap B\\mid C)=P(A\\mid C)P(B\\mid C)\n> $$\n> が成り立つとき、$A,B$ は **$C$ のもとで条件付き独立** であるといい、$A\\perp B\\mid C$ と書く。\n<!-- formal-statement-end -->`,
  `<!-- formal-statement-start -->\n> **定義（条件付き独立）**  \n> $P(C)>0$ のとき $P(A\\cap B\\mid C)=P(A\\mid C)P(B\\mid C)$ が成り立つとき、$A,B$ は **$C$ のもとで条件付き独立** であるといい、$A\\perp B\\mid C$ と書く。\n<!-- formal-statement-end -->`,
  'conditional-independence-inline',
);

p102 = replaceExact(
  p102,
  `<!-- formal-statement-start -->\n> **定理（ベイズの定理）**  \n> $H_1,\\ldots,H_m$ が標本空間の分割で各 $P(H_i)>0$、さらに $P(B)>0$ とする。このとき各 $j$ について\n> $$\n> P(H_j\\mid B)\n> =\n> \\frac{P(B\\mid H_j)P(H_j)}\n> {\\sum_{i=1}^mP(B\\mid H_i)P(H_i)}.\n> $$\n> 分母は全確率公式で得られる $P(B)$ である。\n<!-- formal-statement-end -->`,
  `<!-- formal-statement-start -->\n> **定理（ベイズの定理）**  \n> $H_1,\\ldots,H_m$ が標本空間の分割で各 $P(H_i)>0$、さらに $P(B)>0$ とする。このとき各 $j$ について\n\n$$\nP(H_j\\mid B)\n=\n\\frac{P(B\\mid H_j)P(H_j)}\n{\\sum_{i=1}^mP(B\\mid H_i)P(H_i)}.\n$$\n\n> 分母は全確率公式で得られる $P(B)$ である。\n<!-- formal-statement-end -->`,
  'bayes-display-math',
);

p102 = p102.replace(
  '<!-- definition-example-end -->確率変数についても同様に $X\\perp Y\\mid Z$ と書きます。',
  '<!-- definition-example-end -->\n\n確率変数についても同様に $X\\perp Y\\mid Z$ と書きます。',
);

fs.writeFileSync(p102Path, p102);
