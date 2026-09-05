import fs from 'node:fs';

const path = 'textbook/volumes/04_linear_models/L1_03_分散分析/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S8 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-l1-03-one-way-anova')) {
  const needle = String.raw`## 1. 一元配置：複数の平均を一度に比べる

群 $i=1,\ldots,a$、群 $i$ の観測 $j=1,\ldots,n_i$ を $Y_{ij}$ とします。群ごとの母平均を $\mu_i$ として
$$
Y_{ij}=\mu_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\text{独立}}{\sim}N(0,\sigma^2)
$$
とします。帰無仮説は`;
  const replacement = String.raw`## 1. 一元配置：複数の平均を一度に比べる

<a id="def-l1-03-one-way-anova"></a>

<!-- formal-statement-start -->
> **定義（一元配置分散分析）**  
> 一つのカテゴリ因子が $a$ 個の水準を持ち、水準 $i$ の観測を $Y_{ij}$ とする。各群の条件付き平均を $E[Y_{ij}\mid i]=\mu_i$ とし、群内に共通の誤差分散 $\sigma^2$ を仮定して、群間変動と群内変動を比較することで
> $H_0:\mu_1=\cdots=\mu_a$
> を検討する方法を **一元配置分散分析** という。有限標本で通常のF分布を厳密に用いるときは、誤差の独立な正規性も仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-03-one-way-anova -->
**定義の確認**  
冒頭の肥料A・B・Cの例は、因子が「肥料」の一つだけで3水準を持ち、各水準内に反復観測があります。したがって3群の母平均が等しいかを、群間平方和と群内平方和の比で調べる一元配置分散分析の設定です。
<!-- definition-example-end -->

群 $i=1,\ldots,a$、群 $i$ の観測 $j=1,\ldots,n_i$ を $Y_{ij}$ とします。群ごとの母平均を $\mu_i$ として
$$
Y_{ij}=\mu_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\text{独立}}{\sim}N(0,\sigma^2)
$$
とします。帰無仮説は`;
  replaceOnce(needle, replacement, 'one-way-definition');
}

if (!text.includes('prop-l1-03-one-way-f')) {
  const needle = String.raw`## 3. なぜF比を見るのか

帰無仮説が正しく、全群の母平均が同じなら、群間平方和も群内平方和も本質的には同じ誤差分散 $\sigma^2$ を反映します。`;
  const replacement = String.raw`## 3. なぜF比を見るのか

<a id="prop-l1-03-one-way-f"></a>

<!-- formal-statement-start -->
> **命題（一元配置分散分析のF統計量）**  
> 群 $i=1,\ldots,a$ に $n_i$ 個の観測があり、$N=\sum_i n_i$ とする。
> $Y_{ij}=\mu_i+\varepsilon_{ij}$、$\varepsilon_{ij}\overset{\mathrm{ind}}{\sim}N(0,\sigma^2)$ とし、
> $SSA=\sum_i n_i(\bar Y_{i\cdot}-\bar Y_{\cdot\cdot})^2$、
> $SSE=\sum_{i,j}(Y_{ij}-\bar Y_{i\cdot})^2$ と置く。
> 帰無仮説 $H_0:\mu_1=\cdots=\mu_a$ のもとで $SSA/\sigma^2\sim\chi^2_{a-1}$、$SSE/\sigma^2\sim\chi^2_{N-a}$ で両者は独立であり、
> $F=\dfrac{SSA/(a-1)}{SSE/(N-a)}\sim F_{a-1,N-a}$
> が成り立つ。
<!-- formal-statement-end -->

帰無仮説が正しく、全群の母平均が同じなら、群間平方和も群内平方和も本質的には同じ誤差分散 $\sigma^2$ を反映します。`;
  replaceOnce(needle, replacement, 'one-way-f-proposition');
}

if (!text.includes('def-l1-03-two-way-anova')) {
  const needle = String.raw`### 5.4 ここで一般式に戻る

因子Aが $a$ 水準、因子Bが $b$ 水準、各組合せを $r$ 回反復する均衡二元配置では
$$
Y_{ijk}
=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk},
$$
$$
\varepsilon_{ijk}\overset{\text{独立}}{\sim}N(0,\sigma^2).
$$

- $\alpha_i$: Aの主効果。`;
  const replacement = String.raw`### 5.4 ここで一般式に戻る

<a id="def-l1-03-two-way-anova"></a>

<!-- formal-statement-start -->
> **定義（二元配置分散分析）**  
> 二つのカテゴリ因子A, Bを同時に扱い、Aの主効果、Bの主効果、AとBの交互作用、および誤差へ変動を分けて評価する方法を **二元配置分散分析** という。因子Aが $a$ 水準、因子Bが $b$ 水準、各セルに $r$ 回の反復がある均衡固定効果モデルでは
> $Y_{ijk}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk}$
> と書く。効果を一意にするため、
> $\sum_i\alpha_i=0$、$\sum_j\beta_j=0$、$\sum_i(\alpha\beta)_{ij}=0$（各 $j$）、$\sum_j(\alpha\beta)_{ij}=0$（各 $i$）
> を課す。通常の有限標本F検定では $\varepsilon_{ijk}\overset{\mathrm{ind}}{\sim}N(0,\sigma^2)$ を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-03-two-way-anova -->
**定義の確認**  
本文の $2\times2$ 例では全体平均が13.5、A効果が $(-2.5,2.5)$、B効果が $(-3.5,3.5)$、交互作用が $(+1.5,-1.5,-1.5,+1.5)$ です。各主効果の和は0で、交互作用も各行・各列で和が0です。例えば $A_1B_1$ のセル平均は $13.5-2.5-3.5+1.5=9$ と復元できます。
<!-- definition-example-end -->

因子Aが $a$ 水準、因子Bが $b$ 水準、各組合せを $r$ 回反復する均衡二元配置では
$$
Y_{ijk}
=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk},
$$
$$
\varepsilon_{ijk}\overset{\text{独立}}{\sim}N(0,\sigma^2).
$$

上の識別制約のもとで、$\mu$ は全体平均、$\alpha_i$ と $\beta_j$ は各因子の主効果、$(\alpha\beta)_{ij}$ は加法的な主効果だけでは説明できないセル固有のずれを表します。

- $\alpha_i$: Aの主効果。`;
  replaceOnce(needle, replacement, 'two-way-definition');
}

if (!text.includes('prop-l1-03-two-way-decomposition')) {
  const needle = String.raw`自由度は
$$
abr-1
=(a-1)+(b-1)+(a-1)(b-1)+ab(r-1).
$$

### 5.5 反復をなくすと何が壊れるか`;
  const replacement = String.raw`自由度は
$$
abr-1
=(a-1)+(b-1)+(a-1)(b-1)+ab(r-1).
$$

<a id="prop-l1-03-two-way-decomposition"></a>

<!-- formal-statement-start -->
> **命題（均衡二元配置の平方和と自由度の分解）**  
> 各セルに $r$ 回の反復がある $a\times b$ 均衡二元配置で、上の固定効果モデルと識別制約を用いる。このとき
> $SST=SSA+SSB+SSAB+SSE$
> であり、対応する自由度は
> $abr-1=(a-1)+(b-1)+(a-1)(b-1)+ab(r-1)$
> と分解される。独立な正規誤差を仮定すれば、各帰無仮説 $H_{0A}:\alpha_i=0\ (\forall i)$、$H_{0B}:\beta_j=0\ (\forall j)$、$H_{0AB}:(\alpha\beta)_{ij}=0\ (\forall i,j)$ のもとで、それぞれ
> $F_A=MSA/MSE$、$F_B=MSB/MSE$、$F_{AB}=MSAB/MSE$
> は対応する分子自由度 $a-1,b-1,(a-1)(b-1)$ と分母自由度 $ab(r-1)$ のF分布に従う。
<!-- formal-statement-end -->

### 5.5 反復をなくすと何が壊れるか`;
  replaceOnce(needle, replacement, 'two-way-decomposition-proposition');
}

fs.writeFileSync(path, text);
