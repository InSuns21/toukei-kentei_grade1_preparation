import fs from 'node:fs';

const p101Path = 'textbook/volumes/01_probability/P1_01_事象と確率/index.md';
const p102Path = 'textbook/volumes/01_probability/P1_02_条件付き確率_独立_bayesの定理/index.md';

function replaceOnce(text, needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S12 needle not found: ${label}`);
  return text.replace(needle, () => replacement);
}

let p101 = fs.readFileSync(p101Path, 'utf8');

if (!p101.includes('definition-example-start: def-p1-01-sample-space')) {
  const needle = `<!-- formal-statement-end -->\n\nこの例では\n\n$$\n\\Omega=\\{1,2,3,4,5,6\\}\n$$\n\nです。`;
  const replacement = `<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-01-sample-space -->\n**定義の確認**  \n公平な六面体さいころを1回投げる試行では、起こり得る結果全体は $\\Omega=\\{1,2,3,4,5,6\\}$ です。偶数事象 $\\{2,4,6\\}$ は標本空間そのものではなく、その部分集合です。\n<!-- definition-example-end -->\n\nこの例では\n\n$$\n\\Omega=\\{1,2,3,4,5,6\\}\n$$\n\nです。`;
  p101 = replaceOnce(p101, needle, replacement, 'sample-space-example');
}

if (!p101.includes('thm-p1-01-inclusion-exclusion')) {
  const needle = `三重共通部分は最初に3回足され、二重共通部分を3個引く操作でさらに3回引かれるので、その時点で0回です。最後に1回足し戻して、最終的に1回数えます。`;
  const replacement = `三重共通部分は最初に3回足され、二重共通部分を3個引く操作でさらに3回引かれるので、その時点で0回です。最後に1回足し戻して、最終的に1回数えます。\n\n<a id="thm-p1-01-inclusion-exclusion"></a>\n\n<!-- formal-statement-start -->\n> **定理（包除原理：二事象・三事象）**  \n> 任意の事象 $A,B,C$ に対して\n> $$\n> P(A\\cup B)=P(A)+P(B)-P(A\\cap B),\n> $$\n> $$\n> \\begin{aligned}\n> P(A\\cup B\\cup C)\n> &=P(A)+P(B)+P(C)\\\\\n> &\\quad-P(A\\cap B)-P(B\\cap C)-P(C\\cap A)\\\\\n> &\\quad+P(A\\cap B\\cap C).\n> \\end{aligned}\n> $$\n> すなわち、重複して数えた共通部分を交互に引き戻し・足し戻す。\n<!-- formal-statement-end -->`;
  p101 = replaceOnce(p101, needle, replacement, 'inclusion-exclusion-theorem');
}

if (!p101.includes('definition-example-start: def-p1-01-event-limsup-liminf')) {
  const needle = `<!-- formal-statement-end -->\n\n上極限事象に標本点 $\\omega$ が属するとは`;
  const replacement = `<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-01-event-limsup-liminf -->\n**定義の確認**  \n$\\Omega=\\{1,2\\}$ とし、奇数 $n$ では $A_n=\\{1\\}$、偶数 $n$ では $A_n=\\{1,2\\}$ とします。1は十分後も常に属するので $1\\in\\liminf A_n$、2は偶数番目に無限回だけ属するので $2\\in\\limsup A_n$ ですが $2\\notin\\liminf A_n$ です。したがって $\\liminf A_n=\\{1\\}$、$\\limsup A_n=\\{1,2\\}$ です。\n<!-- definition-example-end -->\n\n上極限事象に標本点 $\\omega$ が属するとは`;
  p101 = replaceOnce(p101, needle, replacement, 'limsup-liminf-example');
}

fs.writeFileSync(p101Path, p101);

let p102 = fs.readFileSync(p102Path, 'utf8');

if (!p102.includes('def-p1-02-conditional-probability')) {
  const needle = `一般に、事象 $B$ が起きたと分かった後では、標本空間を $B$ の内部に絞って事象 $A$ の割合を計り直します。$P(B)>0$ のとき\n\n$$\n\\boxed{\nP(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\n}\n$$\n\nと定義します。縦線の右側が条件です。`;
  const replacement = `一般に、事象 $B$ が起きたと分かった後では、標本空間を $B$ の内部に絞って事象 $A$ の割合を計り直します。\n\n<a id="def-p1-02-conditional-probability"></a>\n\n<!-- formal-statement-start -->\n> **定義（条件付き確率）**  \n> $P(B)>0$ のとき、事象 $B$ が起きたという条件のもとで事象 $A$ が起きる確率を\n> $$\n> P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\n> $$\n> と定め、$A$ の **$B$ のもとでの条件付き確率** という。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-02-conditional-probability -->\n**定義の確認**  \n公平な六面体さいころで $A=\\{4,5,6\\}$、$B=\\{2,4,6\\}$ とすると、$P(B)=1/2$、$P(A\\cap B)=1/3$ なので $P(A\\mid B)=(1/3)/(1/2)=2/3$ です。条件を $B$ に絞った3通り $\\{2,4,6\\}$ のうち2通りが $A$ に入ることとも一致します。\n<!-- definition-example-end -->\n\n縦線の右側が条件です。`;
  p102 = replaceOnce(p102, needle, replacement, 'conditional-probability-definition');
}

if (!p102.includes('def-p1-02-independence')) {
  const needle = `二事象 $A,B$ が独立であるとは\n\n$$\n\\boxed{\nP(A\\cap B)=P(A)P(B)\n}\n$$\n\nが成り立つことです。`;
  const replacement = `<a id="def-p1-02-independence"></a>\n\n<!-- formal-statement-start -->\n> **定義（統計的独立）**  \n> 二事象 $A,B$ が\n> $$\n> P(A\\cap B)=P(A)P(B)\n> $$\n> を満たすとき、$A,B$ は **独立（統計的独立）** であるという。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-02-independence -->\n**定義の確認**  \n公平な硬貨を2回投げ、$A=$「1回目が表」、$B=$「2回目が表」とします。$P(A)=P(B)=1/2$、$P(A\\cap B)=1/4=P(A)P(B)$ なので $A,B$ は独立です。\n<!-- definition-example-end -->`;
  p102 = replaceOnce(p102, needle, replacement, 'independence-definition');
}

if (!p102.includes('def-p1-02-conditional-independence')) {
  const needle = `また $P(C)>0$ のとき、$C$ を条件とした下で\n\n$$\nP(A\\cap B\\mid C)=P(A\\mid C)P(B\\mid C)\n$$\n\nが成り立つことを**条件付き独立**といい、\n\n$$\n\\boxed{A\\perp B\\mid C}\n$$\n\nと書きます。`;
  const replacement = `また、条件を固定した後の独立性も区別します。\n\n<a id="def-p1-02-conditional-independence"></a>\n\n<!-- formal-statement-start -->\n> **定義（条件付き独立）**  \n> $P(C)>0$ のとき\n> $$\n> P(A\\cap B\\mid C)=P(A\\mid C)P(B\\mid C)\n> $$\n> が成り立つとき、$A,B$ は **$C$ のもとで条件付き独立** であるといい、$A\\perp B\\mid C$ と書く。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-02-conditional-independence -->\n**定義の確認**  \n$C$ のもとで4通りの結果 $(0,0),(0,1),(1,0),(1,1)$ が等確率で起こり、$A=$「第1成分が1」、$B=$「第2成分が1」とします。このとき $P(A\\mid C)=P(B\\mid C)=1/2$、$P(A\\cap B\\mid C)=1/4$ なので $A\\perp B\\mid C$ です。\n<!-- definition-example-end -->`;
  p102 = replaceOnce(p102, needle, replacement, 'conditional-independence-definition');
}

if (!p102.includes('definition-example-start: def-p1-02-pairwise-mutual-independence')) {
  const needle = `<!-- formal-statement-end -->\n\n三事象では、三つの二重積の式だけでなく`;
  const replacement = `<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p1-02-pairwise-mutual-independence -->\n**定義の確認**  \n公平な硬貨を2回投げ、$A=$「1回目が表」、$B=$「2回目が表」、$C=$「2回の結果が同じ」とします。各事象の確率は $1/2$ で、どの2事象の共通部分も確率 $1/4$ なので対独立です。しかし $A\\cap B\\cap C$ は「表・表」だけで確率 $1/4$ であり、$P(A)P(B)P(C)=1/8$ とは一致しません。したがって相互独立ではありません。\n<!-- definition-example-end -->\n\n三事象では、三つの二重積の式だけでなく`;
  p102 = replaceOnce(p102, needle, replacement, 'pairwise-mutual-example');
}

if (!p102.includes('thm-p1-02-bayes')) {
  const needle = `したがって\n\n$$\n\\boxed{\nP(H_j\\mid B)\n=\n\\frac{P(B\\mid H_j)P(H_j)}\n{\\sum_{i=1}^mP(B\\mid H_i)P(H_i)}\n}\n$$\n\nです。`;
  const replacement = `したがって次を得ます。\n\n<a id="thm-p1-02-bayes"></a>\n\n<!-- formal-statement-start -->\n> **定理（ベイズの定理）**  \n> $H_1,\\ldots,H_m$ が標本空間の分割で各 $P(H_i)>0$、さらに $P(B)>0$ とする。このとき各 $j$ について\n> $$\n> P(H_j\\mid B)\n> =\n> \\frac{P(B\\mid H_j)P(H_j)}\n> {\\sum_{i=1}^mP(B\\mid H_i)P(H_i)}.\n> $$\n> 分母は全確率公式で得られる $P(B)$ である。\n<!-- formal-statement-end -->`;
  p102 = replaceOnce(p102, needle, replacement, 'bayes-theorem');
}

fs.writeFileSync(p102Path, p102);
