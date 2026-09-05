import fs from 'node:fs';

const path = 'textbook/volumes/05_engineering/E3_01_実験計画_直交表_交絡/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S10 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-e3-01-confounding-factor')) {
  const needle = `これが**交絡**です。\n\n> 交絡とは「効果が何となく似ている」ことではなく、**設計行列上で同じ方向を使っているため識別不能になること**です。`;
  const replacement = `これが**交絡**です。\n\n> 交絡とは「効果が何となく似ている」ことではなく、**設計行列上で同じ方向を使っているため識別不能になること**です。\n\n<a id="def-e3-01-confounding-factor"></a>\n\n<!-- formal-statement-start -->\n> **定義（交絡因子）**  \n> 主目的ではない因子の変動が、比較したい処理・因子の割付と系統的に重なり、その効果をデータから分離できなくするとき、その因子を **交絡因子** という。設計行列では、交絡因子に対応する方向が対象効果の方向と一致または線形従属になる場合が典型である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-confounding-factor -->\n**定義の確認**  \nA=-1をすべてDay 1、A=+1をすべてDay 2で実施すると、日とAの効果を分離できません。この設計では「実験日」がAに対する交絡因子です。単に日差が存在するだけなら外乱因子ですが、Aの割付と重なったことで交絡因子になります。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'confounding-factor-definition');
}

if (!text.includes('def-e3-01-blocking')) {
  const needle = `### 2.3 局所管理：既知の大きなばらつきを先に分ける\n\n同質と考えられる実験単位をまとまりに分け、そのまとまりの内部で処理比較を行います。これが局所管理であり、その代表が**ブロック化**です。`;
  const replacement = `### 2.3 局所管理：既知の大きなばらつきを先に分ける\n\n<a id="def-e3-01-blocking"></a>\n\n<!-- formal-statement-start -->\n> **定義（ブロック化）**  \n> 既知または予想される大きな外乱について実験単位を比較的同質な群へ分け、各群の内部で処理比較を行う設計操作を **ブロック化** という。目的はブロック間変動を処理比較の誤差から分離し、処理効果の推定精度を高めることである。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-blocking -->\n**定義の確認**  \n4処理を4日間に実施し日差が大きいと予想されるなら、各日を1ブロックとして各日内で4処理を比較します。日差をブロック効果へ分けることで、処理比較の誤差へ日差を混ぜにくくします。\n<!-- definition-example-end -->\n\n同質と考えられる実験単位をまとまりに分け、そのまとまりの内部で処理比較を行います。これが局所管理であり、その代表が**ブロック化**です。`;
  replaceOnce(needle, replacement, 'blocking-definition');
}

if (!text.includes('def-e3-01-randomized-block')) {
  const needle = `## 5. 乱塊法：ブロック差を誤差から分ける\n\n処理数を $a$、ブロック数を $b$ とし、各ブロック内で全処理を1回ずつ実施します。`;
  const replacement = `## 5. 乱塊法：ブロック差を誤差から分ける\n\n<a id="def-e3-01-randomized-block"></a>\n\n<!-- formal-statement-start -->\n> **定義（乱塊法）**  \n> 実験単位をブロックへ分け、各ブロック内に全ての処理を1回ずつ配置し、そのブロック内で処理を無作為に割り付ける設計を **乱塊法（無作為化完全ブロック計画）** という。処理差とブロック差を加法的に分けて評価するのが基本である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-randomized-block -->\n**定義の確認**  \n4処理を4日で比較するとき、各日をブロックとして毎日4処理を1回ずつ実施し、その日の中で実施順を無作為化する設計は乱塊法です。各ブロックに一部の処理しか入らない設計とは区別します。\n<!-- definition-example-end -->\n\n処理数を $a$、ブロック数を $b$ とし、各ブロック内で全処理を1回ずつ実施します。`;
  replaceOnce(needle, replacement, 'randomized-block-definition');
}

if (!text.includes('def-e3-01-orthogonal-array')) {
  const needle = `## 8. 直交表：少ない実験で独立な比較を作る\n\n直交表は、各因子列が釣り合い、異なる列どうしの比較が直交するように作られた割付表です。2水準の場合、$-1,+1$ 符号を用いると直交性を内積0で確認できます。`;
  const replacement = `## 8. 直交表：少ない実験で独立な比較を作る\n\n<a id="def-e3-01-orthogonal-array"></a>\n\n<!-- formal-statement-start -->\n> **定義（直交表）**  \n> 実験条件を行、因子を割り付ける列として並べた表のうち、各列の水準が釣り合い、任意の2列を取り出したとき水準の組合せが等しい回数だけ現れるように構成された表を **直交表** という。この性質により、対応する列の効果を互いに直交した比較として推定できる。2水準の $-1,+1$ 符号化では、異なる列の内積が0になる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-orthogonal-array -->\n**定義の確認**  \n$L_4$ の各列には $-1,+1$ が2回ずつ現れ、どの2列でも $(--),(-+),(+-),(++)$ が1回ずつ現れます。したがって各列は釣り合い、列対は直交しています。\n<!-- definition-example-end -->\n\n直交表は、各因子列が釣り合い、異なる列どうしの比較が直交するように作られた割付表です。2水準の場合、$-1,+1$ 符号を用いると直交性を内積0で確認できます。`;
  replaceOnce(needle, replacement, 'orthogonal-array-definition');
}

if (!text.includes('def-e3-01-fractional-factorial')) {
  const needle = `## 9. 一部実施要因計画：実験回数と識別可能性を交換する\n\n因子が増えると $2^k$ の実験数は急増します。4因子なら16条件、7因子なら128条件です。全てを実施せず、規則的に一部だけを選ぶのが一部実施要因計画です。`;
  const replacement = `## 9. 一部実施要因計画：実験回数と識別可能性を交換する\n\n<a id="def-e3-01-fractional-factorial"></a>\n\n<!-- formal-statement-start -->\n> **定義（一部実施要因計画）**  \n> 完全要因計画の全処理組合せを実施せず、生成関係などの規則に従って一部の組合せだけを選ぶ要因計画を **一部実施要因計画** という。実験回数を削減する代わりに、同じ設計列を共有する複数の効果が別名関係となり、それらをデータだけから分離できなくなる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-fractional-factorial -->\n**定義の確認**  \n$2^3$ 完全要因計画8条件から $C=AB$ を満たす4条件だけを選ぶと $2^{3-1}$ 半分実施です。このとき $C\\equiv AB$、$A\\equiv BC$ などとなり、実験回数を半減した代償として主効果と2因子交互作用を分離できません。\n<!-- definition-example-end -->\n\n因子が増えると $2^k$ の実験数は急増します。4因子なら16条件、7因子なら128条件です。全てを実施せず、規則的に一部だけを選ぶのが一部実施要因計画です。`;
  replaceOnce(needle, replacement, 'fractional-factorial-definition');
}

if (!text.includes('def-e3-01-confounding-method')) {
  const needle = `## 10. 交絡法：ブロック効果と高次交互作用を意図的に重ねる\n\n$2^3$ 完全要因実験8条件を、設備上の理由で4条件ずつ2ブロックに分けるとします。`;
  const replacement = `## 10. 交絡法：ブロック効果と高次交互作用を意図的に重ねる\n\n<a id="def-e3-01-confounding-method"></a>\n\n<!-- formal-statement-start -->\n> **定義（交絡法）**  \n> 要因計画を複数ブロックへ分割するとき、重要度が低いと事前に判断した処理効果をブロック効果と意図的に交絡させ、重要な主効果や低次交互作用をブロック差から分離できるようにする方法を **交絡法** という。交絡を消す方法ではなく、避けられない識別不能をどの効果へ割り当てるかを設計する方法である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-confounding-method -->\n**定義の確認**  \n$2^3$ 完全要因計画を2ブロックへ分けるとき、$ABC=-1$ と $ABC=+1$ でブロックを分ければ $Block\\equiv ABC$ となります。ABCは推定できなくなりますが、A,B,C主効果はブロック列と直交したままなので守れます。\n<!-- definition-example-end -->\n\n$2^3$ 完全要因実験8条件を、設備上の理由で4条件ずつ2ブロックに分けるとします。`;
  replaceOnce(needle, replacement, 'confounding-method-definition');
}

fs.writeFileSync(path, text);
