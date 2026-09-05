import fs from 'node:fs';

const simplePath = 'textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/index.md';
const multiplePath = 'textbook/volumes/04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md';

function replaceOnce(text, needle, replacement, label) {
  if (!text.includes(needle)) {
    throw new Error(`S7 needle not found: ${label}`);
  }
  return text.replace(needle, () => replacement);
}

let simple = fs.readFileSync(simplePath, 'utf8');

if (!simple.includes('def-l1-01-simple-linear-regression')) {
  const needle = String.raw`## 1. まず「直線＋ばらつき」として考える

説明変数 $x$ を温度、応答 $Y$ を材料強度とします。`;
  const replacement = String.raw`## 1. まず「直線＋ばらつき」として考える

<a id="def-l1-01-simple-linear-regression"></a>

<!-- formal-statement-start -->
> **定義（線形単回帰）**  
> 1個の説明変数 $x$ と応答 $Y$ について、条件付き平均が
> $E[Y\mid x]=\beta_0+\beta_1x$
> の形で表される回帰モデルを **線形単回帰** という。ここで $\beta_0$ は切片、$\beta_1$ は傾きである。誤差を $\varepsilon=Y-E[Y\mid x]$ と置けば $E[\varepsilon\mid x]=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-01-simple-linear-regression -->
**定義の確認**  
例えば $E[Y\mid x]=5-0.8x$ は、1個の説明変数 $x$ に対して条件付き平均が切片5、傾き $-0.8$ の直線なので線形単回帰です。等分散性や正規性は、この直線という平均構造とは別に推測のため追加する仮定です。
<!-- definition-example-end -->

説明変数 $x$ を温度、応答 $Y$ を材料強度とします。`;
  simple = replaceOnce(simple, needle, replacement, 'simple-regression-definition');
}

if (!simple.includes('prop-l1-01-sum-of-squares')) {
  const needle = String.raw`$$
SSE=\sum(y_i-\hat y_i)^2
$$
です。

<a id="def-l1-01-coefficient-of-determination"></a>`;
  const replacement = String.raw`$$
SSE=\sum(y_i-\hat y_i)^2
$$
です。

<a id="prop-l1-01-sum-of-squares"></a>

<!-- formal-statement-start -->
> **命題（単回帰の平方和分解）**  
> 切片を含む最小二乗単回帰で、標本平均を $\bar y$、当てはめ値を $\hat y_i$、残差を $e_i=y_i-\hat y_i$ とする。
> $SST=\sum_{i=1}^n(y_i-\bar y)^2$、$SSR=\sum_{i=1}^n(\hat y_i-\bar y)^2$、$SSE=\sum_{i=1}^n e_i^2$ と置くと、
> $SST=SSR+SSE$
> が成り立つ。
<!-- formal-statement-end -->

<a id="def-l1-01-coefficient-of-determination"></a>`;
  simple = replaceOnce(simple, needle, replacement, 'sum-of-squares-proposition');
}

if (!simple.includes('def-l1-01-regression-anova')) {
  const needle = String.raw`T=\frac{\hat\beta_1-\beta_1}{s/\sqrt{S_{xx}}}
\sim t_{n-2}.
$$

## 5. 平均応答と新しい観測値は分散が違う`;
  const replacement = String.raw`T=\frac{\hat\beta_1-\beta_1}{s/\sqrt{S_{xx}}}
\sim t_{n-2}.
$$

## 4A. 回帰の分散分析：平方和分解をF検定へつなぐ

<a id="def-l1-01-regression-anova"></a>

<!-- formal-statement-start -->
> **定義（回帰の分散分析）**  
> 切片を含む線形回帰で、全平方和 $SST$ を回帰平方和 $SSR$ と残差平方和 $SSE$ に分解し、それぞれの自由度で割った平均平方を比較して回帰効果を検定する手続きを **回帰の分散分析** という。線形単回帰では自由度が回帰1、残差 $n-2$、全体 $n-1$ に分かれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-01-regression-anova -->
**定義の確認**  
$n=12$、$SSR=72$、$SSE=36$ なら、回帰・残差・全体の自由度はそれぞれ $1,10,11$ です。したがって回帰平均平方は $72/1=72$、残差平均平方は $36/10=3.6$ となり、両者の比を使って回帰効果を評価します。
<!-- definition-example-end -->

単回帰の分散分析表は次の形です。

| 変動源 | 平方和 | 自由度 | 平均平方 |
|---|---:|---:|---:|
| 回帰 | $SSR$ | $1$ | $MSR=SSR$ |
| 残差 | $SSE$ | $n-2$ | $MSE=SSE/(n-2)$ |
| 全体 | $SST$ | $n-1$ | — |

<a id="prop-l1-01-regression-anova-f"></a>

<!-- formal-statement-start -->
> **命題（単回帰の分散分析におけるF統計量）**  
> 固定された $x_1,\ldots,x_n$ がすべて同一ではなく、
> $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$、$\varepsilon_1,\ldots,\varepsilon_n\overset{\mathrm{ind}}{\sim}N(0,\sigma^2)$
> とする。当てはめ値を $\hat Y_i$ とし、$SSR=\sum(\hat Y_i-\bar Y)^2$、$SSE=\sum(Y_i-\hat Y_i)^2$ と置く。
> 帰無仮説 $H_0:\beta_1=0$ のもとで
> $F=\dfrac{SSR/1}{SSE/(n-2)}\sim F_{1,n-2}$
> であり、同じ仮説に対する傾きのt統計量 $T$ について $F=T^2$ が成り立つ。
<!-- formal-statement-end -->

なぜF分布になるかを、前節で得た二つの分布から確認します。$H_0:\beta_1=0$ のもとで

$$
\hat\beta_1\sim N\left(0,\frac{\sigma^2}{S_{xx}}\right)
$$

であり、単回帰では $SSR=\hat\beta_1^2S_{xx}$ なので

$$
\frac{SSR}{\sigma^2}
=\left(\frac{\hat\beta_1}{\sigma/\sqrt{S_{xx}}}\right)^2
\sim\chi_1^2.
$$

一方、前節で

$$
\frac{SSE}{\sigma^2}\sim\chi^2_{n-2}
$$

かつ $\hat\beta_1$ と $SSE$ が独立であることを得ています。したがって

$$
F
=\frac{SSR/1}{SSE/(n-2)}
\sim F_{1,n-2}.
$$

さらに $s^2=MSE=SSE/(n-2)$ だから、$H_0:\beta_1=0$ に対するt統計量は

$$
T=\frac{\hat\beta_1}{s/\sqrt{S_{xx}}}
$$

であり、

$$
T^2
=\frac{\hat\beta_1^2S_{xx}}{s^2}
=\frac{SSR}{SSE/(n-2)}
=F.
$$

つまり単回帰では、傾きが0かを調べるt検定と回帰の分散分析によるF検定は同じ情報を別の形で見ています。これは次章の [一般線形仮説のF検定](../L1_02_重回帰_線形モデルの行列表現/index.md#prop-l1-02-general-linear-f) で、制約が1本の場合の特殊例として統一されます。

## 5. 平均応答と新しい観測値は分散が違う`;
  simple = replaceOnce(simple, needle, replacement, 'regression-anova-section');
}

fs.writeFileSync(simplePath, simple);

let multiple = fs.readFileSync(multiplePath, 'utf8');

if (!multiple.includes('def-l1-02-multiple-linear-regression')) {
  const needle = String.raw`## 1. まず3本の回帰式を1本の行列式へまとめる

応答 $Y_i$ を二つの説明変数 $x_{i1},x_{i2}$ で説明すると`;
  const replacement = String.raw`## 1. まず3本の回帰式を1本の行列式へまとめる

<a id="def-l1-02-multiple-linear-regression"></a>

<!-- formal-statement-start -->
> **定義（線形重回帰）**  
> 複数の説明変数 $x_1,\ldots,x_{p-1}$ と応答 $Y$ について、条件付き平均が
> $E[Y\mid x_1,\ldots,x_{p-1}]=\beta_0+\sum_{j=1}^{p-1}\beta_jx_j$
> の形で表される回帰モデルを **線形重回帰** という。$n$ 個の観測をまとめると $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ と表せる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-02-multiple-linear-regression -->
**定義の確認**  
例えば $E[Y\mid x_1,x_2]=4+2x_1-0.5x_2$ は、二つの説明変数の線形結合で条件付き平均を表しているので線形重回帰です。係数 $(4,2,-0.5)$ を1本のベクトルにまとめることで行列表現へ移れます。
<!-- definition-example-end -->

応答 $Y_i$ を二つの説明変数 $x_{i1},x_{i2}$ で説明すると`;
  multiple = replaceOnce(multiple, needle, replacement, 'multiple-regression-definition');
}

if (!multiple.includes('prop-l1-02-general-linear-f')) {
  const needle = String.raw`## 9. 一般線形仮説のF検定

正規線形モデルを仮定します。制約なしモデルの残差平方和を $SSE_F$、制約付きモデルを $SSE_R$ とします。`;
  const replacement = String.raw`## 9. 一般線形仮説のF検定

<a id="prop-l1-02-general-linear-f"></a>

<!-- formal-statement-start -->
> **命題（一般線形仮説のF検定）**  
> 正規線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で、$\boldsymbol X\in\mathbb R^{n\times p}$ は列フルランク、$\boldsymbol\varepsilon\sim N_n(\boldsymbol0,\sigma^2\boldsymbol I_n)$ とする。
> $\boldsymbol R\in\mathbb R^{q\times p}$ は行フルランクで、帰無仮説を $H_0:\boldsymbol R\boldsymbol\beta=\boldsymbol r$ とする。制約なしモデルの残差平方和を $SSE_F$、この制約の下での残差平方和を $SSE_R$ とすると、
> $F=\dfrac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}\sim F_{q,n-p}$
> が $H_0$ のもとで成り立つ。
<!-- formal-statement-end -->

制約なしモデルの残差平方和を $SSE_F$、制約付きモデルを $SSE_R$ とします。`;
  multiple = replaceOnce(multiple, needle, replacement, 'general-linear-f-proposition');
}

fs.writeFileSync(multiplePath, multiple);
