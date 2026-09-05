import fs from 'node:fs';

const path = 'textbook/volumes/05_engineering/E3_01_実験計画_直交表_交絡/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S9 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-e3-01-fixed-effect')) {
  const needle = `### 4.1 固定効果\n\n工場に現存する特定3台 A,B,C の平均を比較したいなら、その3台自体が推測対象です。`;
  const replacement = `### 4.1 固定効果\n\n<a id="def-e3-01-fixed-effect"></a>\n\n<!-- formal-statement-start -->\n> **定義（固定効果）**  \n> 因子のうち、観測した特定の水準そのものが推測対象であり、各水準の効果を未知だが確率変数ではない母数として扱うものを **固定効果** という。推測の主眼は、選んだ水準間の平均差や対比である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-fixed-effect -->\n**定義の確認**  \n工場に現存する特定3台 A,B,C の性能差そのものを比較したいなら、その3台は固定効果です。別の機械一般へ無作為に一般化することではなく、AとBの平均差などが推測対象になります。\n<!-- definition-example-end -->\n\n工場に現存する特定3台 A,B,C の平均を比較したいなら、その3台自体が推測対象です。`;
  replaceOnce(needle, replacement, 'fixed-effect-definition');
}

if (!text.includes('def-e3-01-random-effect')) {
  const needle = `### 4.2 変量効果\n\n多数存在する同型機から5台を無作為に選び、「機械ごとの差がどれくらい大きいか」を知りたいなら、`;
  const replacement = `### 4.2 変量効果\n\n<a id="def-e3-01-random-effect"></a>\n\n<!-- formal-statement-start -->\n> **定義（変量効果）**  \n> 因子水準を、より大きな水準集団から抽出されたものとみなし、水準ごとの効果を平均0・分散 $\\sigma_A^2$ などを持つ確率変数として扱うものを **変量効果** という。推測の主眼は、観測した個々の水準差よりも、水準集団におけるばらつきを表す分散成分である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-random-effect -->\n**定義の確認**  \n多数存在する同型機から5台を無作為に選び、機械一般の個体差がどれくらい大きいかを知りたいなら「機械」は変量効果です。5台それぞれの優劣より、母集団での機械間分散 $\\sigma_A^2$ が主要な推測対象になります。\n<!-- definition-example-end -->\n\n多数存在する同型機から5台を無作為に選び、「機械ごとの差がどれくらい大きいか」を知りたいなら、`;
  replaceOnce(needle, replacement, 'random-effect-definition');
}

if (!text.includes('prop-e3-01-random-effect-ems')) {
  const needle = `### 4.3 期待平均平方を導く\n\n各水準に同じ反復数 $r$ があるとします。`;
  const replacement = `### 4.3 期待平均平方を導く\n\n<a id="prop-e3-01-random-effect-ems"></a>\n\n<!-- formal-statement-start -->\n> **命題（一元変量効果モデルの期待平均平方）**  \n> $i=1,\\ldots,a$ の各水準に同じ反復数 $r$ があり、\n> $Y_{ij}=\\mu+A_i+\\varepsilon_{ij}$、$A_i\\overset{\\mathrm{ind}}{\\sim}N(0,\\sigma_A^2)$、$\\varepsilon_{ij}\\overset{\\mathrm{ind}}{\\sim}N(0,\\sigma^2)$ とし、$A_i$ と全ての誤差は独立とする。\n> 一元配置の因子平均平方を $MS_A$、群内誤差平均平方を $MS_E$ とすると、\n> $E[MS_A]=\\sigma^2+r\\sigma_A^2$、$E[MS_E]=\\sigma^2$\n> が成り立つ。したがってモーメント法では $\\hat\\sigma_A^2=(MS_A-MS_E)/r$ を得る。\n<!-- formal-statement-end -->\n\n各水準に同じ反復数 $r$ があるとします。`;
  replaceOnce(needle, replacement, 'random-effect-ems-proposition');
}

if (!text.includes('def-e3-01-mixed-effect')) {
  const needle = `### 4.4 混合効果\n\n同じモデル内に固定効果と変量効果が共存すれば混合効果モデルです。`;
  const replacement = `### 4.4 混合効果\n\n<a id="def-e3-01-mixed-effect"></a>\n\n<!-- formal-statement-start -->\n> **定義（混合効果）**  \n> 一つの統計モデルの中に固定効果と変量効果の両方を含めるとき、そのモデルを **混合効果モデル** という。固定効果では特定水準の平均差などを、変量効果では水準集団の分散成分などを同時に扱う。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e3-01-mixed-effect -->\n**定義の確認**  \n薬剤3種類は比較したい特定水準なので固定効果、実験日10日は多数の日から生じる日間変動として変量効果、と置くモデルは混合効果モデルです。同じ「因子」でも推測対象によって役割が異なります。\n<!-- definition-example-end -->\n\n同じモデル内に固定効果と変量効果が共存すれば混合効果モデルです。`;
  replaceOnce(needle, replacement, 'mixed-effect-definition');
}

fs.writeFileSync(path, text);
