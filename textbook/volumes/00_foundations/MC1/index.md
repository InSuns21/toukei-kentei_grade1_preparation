# MC1 Monte Carlo 法と統計的誤差

<!-- definition-example-audit: strict -->

数値積分では、これまで NA5 で「決めた節点に関数値を置き、重み付き和を作る」方法を学びました。

Monte Carlo 法は発想を変えます。積分を期待値と読み替え、**ランダムに選んだ点での関数値の標本平均**を使います。

最も基本的な形は

$$
I
=
\int_{[0,1]^d} f(x)\,dx
=
E[f(U)],
\qquad
U\sim\operatorname{Unif}([0,1]^d)
$$

です。独立な一様乱数

$$
U_1,\ldots,U_N
$$

を使えば

$$
\widehat I_N
=
\frac1N\sum_{i=1}^N f(U_i)
$$

で $I$ を近似できます。

式そのものは短いですが、数値的方法として使うには次の問いに答える必要があります。

- 本当に $I$ へ近づくのか。
- 平均的な誤差の大きさはどれくらいか。
- 実際の計算では誤差をどう見積もるのか。
- 必要な標本数をどう決めるのか。
- 連続問題を離散化してから Monte Carlo を使う場合、どの誤差が混ざるのか。

本章では、一致性を [有限分散版強大数則](../F0_00P5_大数の強法則/index.md#thm-f0-00p5-finite-variance-slln) へ、標本分散の一致性を [独立同分布・有限平均版の強大数則](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-iid-integrable-slln) へ、統計的誤差を [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) へ直接つなぎます。

$$
\boxed{
\text{積分}
\to
\text{期待値}
\to
\text{標本平均}
\to
\text{大数の法則で一致性}
\to
\text{中心極限定理で統計的誤差}
}
$$

> **この章の停止線**
>
> 本章では独立同分布標本が既に得られていると仮定します。疑似乱数生成器、seed、逆関数法、棄却法、並列 stream は MC2 で扱います。反対変量・制御変量・層化・重点サンプリングは MC3、複数解像度を組み合わせる方法は MC4 へ送ります。

---

## 0. 積分を期待値として読む

まず単位区間から始めます。

$U\sim\operatorname{Unif}(0,1)$ なら、その確率密度関数は $0<x<1$ で $1$ です。従って可積分関数 $f$ に対し

$$
E[f(U)]
=
\int_0^1 f(x)\,dx.
$$

$d$ 次元でも、$U$ を $[0,1]^d$ 上の一様分布とすれば

$$
E[f(U)]
=
\int_{[0,1]^d}f(x)\,dx.
$$

したがって積分値を求める問題は、確率変数

$$
Y=f(U)
$$

の平均

$$
E[Y]
$$

を求める問題へ変わります。

### 最小例：$\int_0^1x^2dx$

$$
f(x)=x^2
$$

とします。

直接積分すれば

$$
I
=
\int_0^1x^2\,dx
=
\frac13.
$$

一方、$U\sim\operatorname{Unif}(0,1)$ とすれば

$$
E[U^2]
=
\frac13.
$$

従って独立な $U_1,\ldots,U_N$ に対して

$$
\frac1N\sum_{i=1}^N U_i^2
$$

を計算すれば、これは $\frac13$ の Monte Carlo 近似になります。

ここで大事なのは、**積分公式を新しく発明したのではなく、積分を標本平均の問題へ移した**という点です。

---

## 1. Monte Carlo 推定量

<a id="def-mc1-monte-carlo-estimator"></a>

<!-- formal-statement-start -->
### 定義（Monte Carlo 推定量）

$Y$ を $E|Y|<\infty$ を満たす実数値確率変数とし、

$$
I:=E[Y]
$$

とする。

$Y_1,\ldots,Y_N$ を $Y$ と同じ分布に従う独立同分布標本とするとき、

$$
\boxed{
\widehat I_N
:=
\frac1N\sum_{i=1}^NY_i
}
$$

を $I$ の Monte Carlo 推定量と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc1-monte-carlo-estimator -->
**定義の確認**

$Y=U^2$、$U\sim\operatorname{Unif}(0,1)$ とします。

たとえば4個の標本が

$$
U_1=0.2,\qquad
U_2=0.5,\qquad
U_3=0.8,\qquad
U_4=1.0
$$

だったとします。

このとき

$$
Y_1=0.04,\quad
Y_2=0.25,\quad
Y_3=0.64,\quad
Y_4=1
$$

なので

$$
\widehat I_4
=
\frac{0.04+0.25+0.64+1}{4}
=
0.4825.
$$

真値 $1/3$ とはかなりずれています。しかしこれは定義の失敗ではありません。標本数が有限なので、標本平均には確率的な揺らぎが残っています。

本章で評価するのは、まさにこの揺らぎです。
<!-- definition-example-end -->

---

## 2. 不偏性・分散・二乗平均平方根誤差

標本平均の基本計算を、数値誤差の言葉として読み直します。

<a id="prop-mc1-unbiased-variance-rmse"></a>

<!-- formal-statement-start -->
### 命題（Monte Carlo 推定量の不偏性・分散・二乗平均平方根誤差）

$Y_1,\ldots,Y_N$ を独立同分布とし、

$$
E[Y_i]=I,
\qquad
\operatorname{Var}(Y_i)=\sigma^2<\infty
$$

とする。

Monte Carlo 推定量

$$
\widehat I_N
=
\frac1N\sum_{i=1}^NY_i
$$

について

$$
\boxed{
E[\widehat I_N]=I
}
$$

および

$$
\boxed{
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}
}
$$

が成り立つ。

さらに不偏性から

$$
\boxed{
\operatorname{RMSE}(\widehat I_N)
:=
\sqrt{E[(\widehat I_N-I)^2]}
=
\frac{\sigma}{\sqrt N}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

不偏性には期待値の線形性だけを使います。

分散では独立性が重要です。独立性により共分散項が消えるので、和の分散が各分散の和になります。

<!-- proof-start -->
### 証明

期待値について

$$
\begin{aligned}
E[\widehat I_N]
&=
E\left[
\frac1N
\sum_{i=1}^NY_i
\right]
\\
&=
\frac1N
\sum_{i=1}^NE[Y_i]
\\
&=
\frac1N
\sum_{i=1}^NI
\\
&=
I.
\end{aligned}
$$

従って $\widehat I_N$ は不偏です。

次に分散を計算します。$Y_i$ は独立なので $i\ne j$ なら

$$
\operatorname{Cov}(Y_i,Y_j)=0.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widehat I_N)
&=
\operatorname{Var}\left(
\frac1N\sum_{i=1}^NY_i
\right)
\\
&=
\frac1{N^2}
\operatorname{Var}\left(
\sum_{i=1}^NY_i
\right)
\\
&=
\frac1{N^2}
\sum_{i=1}^N\operatorname{Var}(Y_i)
\\
&=
\frac1{N^2}
N\sigma^2
\\
&=
\frac{\sigma^2}{N}.
\end{aligned}
$$

最後に不偏性より

$$
E[\widehat I_N-I]=0.
$$

従って

$$
E[(\widehat I_N-I)^2]
=
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}.
$$

平方根を取れば

$$
\operatorname{RMSE}(\widehat I_N)
=
\frac{\sigma}{\sqrt N}.
$$
<!-- proof-end -->

### 誤差を半分にするには標本数4倍

$N$ 点の二乗平均平方根誤差は

$$
\frac{\sigma}{\sqrt N}.
$$

これを半分にするには

$$
\frac{\sigma}{\sqrt{N_{\mathrm{new}}}}
=
\frac12
\frac{\sigma}{\sqrt N}
$$

が必要です。

従って

$$
\sqrt{N_{\mathrm{new}}}
=
2\sqrt N,
$$

すなわち

$$
\boxed{
N_{\mathrm{new}}=4N
}
$$

です。

この $N^{-1/2}$ が単純 Monte Carlo 法の基本的な計算量則です。

---

## 3. 大数則は「計算を増やせば真値へ行く」を保証する

有限標本で誤差が揺らぐだけでは、数値算法として十分ではありません。

標本数を増やしたとき、同じ標本列に沿って真値へ収束することが欲しくなります。

<a id="thm-mc1-strong-law"></a>

<!-- formal-statement-start -->
### 定理（Monte Carlo 推定量の強一致性）

$Y_1,Y_2,\ldots$ を独立同分布とし、

$$
E[Y_1]=I,
\qquad
\operatorname{Var}(Y_1)<\infty
$$

とする。

このとき

$$
\boxed{
\widehat I_N
=
\frac1N\sum_{i=1}^NY_i
\to I
\qquad
\text{a.s.}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

これは新しい確率定理ではありません。

$Y_i$ をそのまま [有限分散版強大数則](../F0_00P5_大数の強法則/index.md#thm-f0-00p5-finite-variance-slln) に入れます。

<!-- proof-start -->
### 証明

仮定より $Y_1,Y_2,\ldots$ は独立同分布で

$$
E[Y_1]=I,
\qquad
\operatorname{Var}(Y_1)<\infty.
$$

従って [有限分散版強大数則](../F0_00P5_大数の強法則/index.md#thm-f0-00p5-finite-variance-slln) を適用でき、

$$
\frac1N\sum_{i=1}^NY_i
\to E[Y_1]
=
I
\qquad
\text{a.s.}
$$

を得ます。
<!-- proof-end -->

ここで強大数則の仮定を局所的に確認したことが重要です。

- 独立同分布である。
- 平均が有限である。
- 本章ではさらに有限分散を仮定している。

従って Monte Carlo 法の「一致性」は、標本平均に対する強大数則の数値積分としての読み替えです。

---

## 4. 中心極限定理は「どれくらい揺れるか」を与える

大数則は

$$
\widehat I_N\to I
$$

を教えます。

しかし、それだけでは

$$
|\widehat I_N-I|
$$

がどれくらいの大きさかは分かりません。

そこで [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) を使います。

<a id="thm-mc1-clt"></a>

<!-- formal-statement-start -->
### 定理（Monte Carlo 中心極限定理）

$Y_1,Y_2,\ldots$ を独立同分布とし、

$$
E[Y_1]=I,
\qquad
0<\sigma^2=\operatorname{Var}(Y_1)<\infty
$$

とする。

このとき

$$
\boxed{
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\Rightarrow
N(0,1)
}
$$

が成り立つ。

同値に、

$$
\sqrt N(\widehat I_N-I)
\Rightarrow
N(0,\sigma^2)
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

これも [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) の直接適用です。

<!-- proof-start -->
### 証明

$S_N:=Y_1+\cdots+Y_N$ と置きます。

すると

$$
\widehat I_N-I
=
\frac{S_N-NI}{N}.
$$

従って

$$
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
=
\frac{S_N-NI}{\sigma\sqrt N}.
$$

右辺は [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) の標準化和そのものです。

よって

$$
\frac{S_N-NI}{\sigma\sqrt N}
\Rightarrow
N(0,1).
$$
<!-- proof-end -->

### 大数の法則と中心極限定理の役割は違う

大数則は

$$
\widehat I_N\to I
$$

という収束そのものを保証します。

中心極限定理は

$$
\widehat I_N-I
\approx
\frac{\sigma}{\sqrt N}Z,
\qquad
Z\sim N(0,1)
$$

という**誤差の尺度と形**を与えます。

したがって

$$
\boxed{
\text{大数の法則 = 正しさの極限}
\qquad
\text{中心極限定理 = 誤差の統計的尺度}
}
$$

と役割を分けて理解します。

---

## 5. 実際には $\sigma$ を知らない

理論上の標準偏差は

$$
\sigma
=
\sqrt{\operatorname{Var}(Y_1)}
$$

です。

しかし数値積分で $I$ を知らないのと同じく、普通は $\sigma$ も事前には分かりません。

そこで同じ標本から分散を推定します。

$$
\overline Y_N
=
\widehat I_N
$$

とし、

$$
S_N^2
=
\frac1{N-1}
\sum_{i=1}^N
(Y_i-\overline Y_N)^2
$$

を不偏標本分散とします。

<a id="def-mc1-standard-error"></a>

<!-- formal-statement-start -->
### 定義（Monte Carlo 標準誤差）

$N\ge2$ とする。

Monte Carlo 推定量

$$
\widehat I_N
=
\overline Y_N
$$

に対し、

$$
S_N^2
=
\frac1{N-1}
\sum_{i=1}^N
(Y_i-\overline Y_N)^2
$$

を標本分散とする。

$$
\boxed{
\widehat{\operatorname{SE}}(\widehat I_N)
:=
\frac{S_N}{\sqrt N}
}
$$

を Monte Carlo 標準誤差と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mc1-standard-error -->
**定義の確認**

標本が

$$
Y_1=0,\qquad
Y_2=1,\qquad
Y_3=2,\qquad
Y_4=1
$$

だったとします。

標本平均は

$$
\overline Y_4
=
1.
$$

偏差平方和は

$$
(0-1)^2+(1-1)^2+(2-1)^2+(1-1)^2
=
2.
$$

従って

$$
S_4^2
=
\frac2{4-1}
=
\frac23,
$$

$$
S_4
=
\sqrt{\frac23}.
$$

Monte Carlo 標準誤差は

$$
\widehat{\operatorname{SE}}(\widehat I_4)
=
\frac{S_4}{2}
=
\sqrt{\frac16}.
$$

「標本値のばらつき」$S_N$ と「標本平均のばらつき」$S_N/\sqrt N$ を混同しないことが重要です。
<!-- definition-example-end -->

---

## 6. 標本分散は本当に $\sigma^2$ へ近づく

標準誤差として $S_N/\sqrt N$ を使うには、$S_N$ が $\sigma$ へ近づくことを確認する必要があります。

<a id="thm-mc1-standard-error-limit"></a>

<!-- formal-statement-start -->
### 定理（標本分散と標準誤差推定の一致性）

$Y_1,Y_2,\ldots$ を独立同分布とし、

$$
E[Y_1]=I,
\qquad
0<\sigma^2=\operatorname{Var}(Y_1)<\infty
$$

とする。

不偏標本分散を

$$
S_N^2
=
\frac1{N-1}
\sum_{i=1}^N(Y_i-\overline Y_N)^2
$$

とすると

$$
\boxed{
S_N^2\to\sigma^2
\qquad
\text{a.s.}
}
$$

が成り立つ。

従って

$$
S_N\to\sigma
\qquad
\text{a.s.}
$$

であり、

$$
\frac{S_N/\sqrt N}{\sigma/\sqrt N}
=
\frac{S_N}{\sigma}
\to1
\qquad
\text{a.s.}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

標本分散を

$$
\frac1N\sum Y_i^2-\overline Y_N^2
$$

へ書き換えます。

有限分散なら $E[Y_1^2]<\infty$ なので、$Y_i$ だけでなく $Y_i^2$ にも大数則を適用できます。

<!-- proof-start -->
### 証明

恒等式

$$
\sum_{i=1}^N
(Y_i-\overline Y_N)^2
=
\sum_{i=1}^NY_i^2
-
N\overline Y_N^2
$$

より

$$
S_N^2
=
\frac{N}{N-1}
\left[
\frac1N\sum_{i=1}^NY_i^2
-
\overline Y_N^2
\right].
$$

まず $Y_i$ に [有限分散版強大数則](../F0_00P5_大数の強法則/index.md#thm-f0-00p5-finite-variance-slln) を適用して

$$
\overline Y_N\to I
\qquad
\text{a.s.}
$$

を得ます。

次に $Y_i^2$ を考えます。

$$
E[Y_1^2]
=
\sigma^2+I^2
<
\infty.
$$

$Y_i^2$ は独立同分布で有限平均を持ちます。[独立同分布・有限平均版の強大数則](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-iid-integrable-slln) を適用できるため、

$$
\frac1N\sum_{i=1}^NY_i^2
\to
E[Y_1^2]
=
\sigma^2+I^2
\qquad
\text{a.s.}
$$

です。

従って

$$
\frac1N\sum_{i=1}^NY_i^2-\overline Y_N^2
\to
(\sigma^2+I^2)-I^2
=
\sigma^2
\qquad
\text{a.s.}
$$

です。

さらに

$$
\frac{N}{N-1}\to1
$$

なので

$$
S_N^2\to\sigma^2
\qquad
\text{a.s.}
$$

を得ます。

$\sigma>0$ なので平方根の連続性から

$$
S_N\to\sigma
\qquad
\text{a.s.}
$$

です。
<!-- proof-end -->

### prerequisite の補足

上の証明では $Y_i^2$ へ有限平均版強大数則を使います。そのため本章は P5A を direct prerequisite に含めています。

有限分散

$$
E[Y_1^2]<\infty
$$

により $Y_i^2$ が可積分になることを局所的に確認したうえで、P5A の canonical result を適用しています。

---

## 7. 中心極限定理から近似信頼区間を作る

まず $\sigma$ が既知だとします。

$z_{1-\alpha/2}$ を標準正規分布の $1-\alpha/2$ 分位点とします。

たとえば $\alpha=0.05$ なら

$$
z_{0.975}\approx1.96.
$$

<a id="cor-mc1-known-sigma-ci"></a>

<!-- formal-statement-start -->
### 系（既知分散での漸近信頼区間）

Monte Carlo 中心極限定理の仮定の下で、$0<\alpha<1$ とする。

$$
C_N
=
\left[
\widehat I_N
-
z_{1-\alpha/2}\frac{\sigma}{\sqrt N},
\,
\widehat I_N
+
z_{1-\alpha/2}\frac{\sigma}{\sqrt N}
\right]
$$

とおく。

このとき

$$
\boxed{
P(I\in C_N)
\to
1-\alpha
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$I\in C_N$ は

$$
\left|
\widehat I_N-I
\right|
\le
z_{1-\alpha/2}
\frac{\sigma}{\sqrt N}
$$

と同値です。

さらに

$$
\left|
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\right|
\le
z_{1-\alpha/2}
$$

と同値です。

[Monte Carlo 中心極限定理](#thm-mc1-clt) から

$$
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\Rightarrow
Z,
\qquad
Z\sim N(0,1).
$$

標準正規分布は連続分布なので、区間端点 $\pm z_{1-\alpha/2}$ に確率質量を持ちません。

従って

$$
P(I\in C_N)
\to
P(
|Z|\le z_{1-\alpha/2}
)
=
1-\alpha.
$$
<!-- proof-end -->

### 実務では $S_N$ を代入する

$\sigma$ は通常未知なので

$$
\boxed{
\widehat I_N
\pm
z_{1-\alpha/2}
\frac{S_N}{\sqrt N}
}
$$

を使います。

この代入でも漸近被覆率が変わらないことを、本章で使う形に限って確認しておきます。

$$
Z_N
:=
\frac{\sqrt N(\widehat I_N-I)}{\sigma},
\qquad
R_N
:=
\frac{S_N}{\sigma}
$$

と置きます。前節から

$$
R_N\to1
\qquad
\text{a.s.},
$$

従って任意の $0<\delta<1$ について

$$
P(
1-\delta\le R_N\le1+\delta
)
\to1
$$

です。

$z:=z_{1-\alpha/2}$ とし、

$$
E_N(\delta)
=
\{
1-\delta\le R_N\le1+\delta
\}
$$

と置きます。$E_N(\delta)$ 上では

$$
z(1-\delta)
\le
zR_N
\le
z(1+\delta)
$$

なので

$$
\{|Z_N|\le z(1-\delta)\}
\cap E_N(\delta)
\subset
\{|Z_N|\le zR_N\}
\subset
\{|Z_N|\le z(1+\delta)\}
\cup E_N(\delta)^c.
$$

従って

$$
\begin{aligned}
P(|Z_N|\le z(1-\delta))
-
P(E_N(\delta)^c)
&\le
P(|Z_N|\le zR_N)
\\
&\le
P(|Z_N|\le z(1+\delta))
+
P(E_N(\delta)^c).
\end{aligned}
$$

[Monte Carlo 中心極限定理](#thm-mc1-clt) から $Z_N\Rightarrow Z\sim N(0,1)$ であり、標準正規分布は連続です。また $P(E_N(\delta)^c)\to0$ です。

まず $N\to\infty$ とし、その後 $\delta\downarrow0$ とすれば

$$
P(|Z_N|\le zR_N)
\to
P(|Z|\le z)
=
1-\alpha.
$$

ところが

$$
|Z_N|\le zR_N
$$

は

$$
\left|
\widehat I_N-I
\right|
\le
z\frac{S_N}{\sqrt N}
$$

と同値です。従って

$$
\boxed{
P\left(
I\in
\left[
\widehat I_N-z_{1-\alpha/2}\frac{S_N}{\sqrt N},
\,
\widehat I_N+z_{1-\alpha/2}\frac{S_N}{\sqrt N}
\right]
\right)
\to
1-\alpha
}
$$

まで確認できました。

ただしここで重要なのは、

$$
\boxed{
\text{これは有限標本で厳密な区間ではなく、中心極限定理に基づく漸近近似}
}
$$

という点です。

$N$ が小さい、分布が極端に歪んでいる、裾が重い、といった場合には正規近似が遅いことがあります。

---

## 8. 目標精度から標本数を逆算する

近似区間の半幅を

$$
h_N
=
z_{1-\alpha/2}
\frac{\sigma}{\sqrt N}
$$

とします。

目標半幅を $\varepsilon>0$ として

$$
h_N\le\varepsilon
$$

を要求すると

$$
z_{1-\alpha/2}
\frac{\sigma}{\sqrt N}
\le
\varepsilon.
$$

従って

$$
\boxed{
N
\ge
\left(
\frac{z_{1-\alpha/2}\sigma}{\varepsilon}
\right)^2
}
$$

です。

つまり精度要求 $\varepsilon$ を半分にすると、必要標本数は約4倍になります。

実際には $\sigma$ が未知なので、

1. 小規模な予備計算で $S_N$ を見積もる。
2. その値から必要標本数を再設計する。
3. 最終計算で推定値と Monte Carlo 標準誤差を報告する。

という流れになります。

乱数生成・再現性の設計は MC2 で扱います。

---

## 9. 円周率推定は Bernoulli 平均である

$(U,V)$ を $[0,1]^2$ 上の一様分布とし、

$$
Y
=
\boldsymbol 1_{\{U^2+V^2\le1\}}
$$

とします。

第1象限の四分円の面積は $\pi/4$ なので

$$
P(U^2+V^2\le1)
=
\frac\pi4.
$$

従って

$$
E[Y]
=
\frac\pi4.
$$

$Y$ は Bernoulli 変数なので

$$
\operatorname{Var}(Y)
=
\frac\pi4
\left(
1-\frac\pi4
\right).
$$

独立標本 $Y_1,\ldots,Y_N$ に対し

$$
\widehat\pi_N
=
4\overline Y_N
$$

と置けば

$$
E[\widehat\pi_N]
=
\pi.
$$

また

$$
\operatorname{Var}(\widehat\pi_N)
=
16
\frac1N
\frac\pi4
\left(
1-\frac\pi4
\right).
$$

教育例としては「面積＝確率」が見えやすい一方、$\pi$ を高精度計算する方法として効率が良いわけではありません。

---

## 10. 次元に直接依存しない $N^{-1/2}$ と、その注意

$d$ 次元単位立方体上で

$$
I_d
=
\int_{[0,1]^d}f(x)\,dx
$$

を考え、

$$
U\sim\operatorname{Unif}([0,1]^d)
$$

とすれば

$$
I_d=E[f(U)].
$$

有限分散

$$
\sigma_d^2
=
\operatorname{Var}(f(U))
<
\infty
$$

なら

$$
\operatorname{RMSE}
=
\frac{\sigma_d}{\sqrt N}.
$$

ここで指数 $-1/2$ 自体には $d$ が直接現れません。

これは各軸を $m$ 分割する直積格子で点数が

$$
m^d
$$

になることと対照的です。

ただし、

$$
\boxed{
N^{-1/2}\text{ に }d\text{ が書かれていない}
\neq
\text{高次元問題が自動的に簡単}
}
$$

です。

$\sigma_d^2$ は $d$ と関数構造に強く依存し得ます。また1標本あたりの関数評価コストも次元とともに増えることがあります。

従って「Monte Carlo は次元の呪いを完全に消す」と言うのは強すぎます。

---

## 11. どの仮定が壊れると何が壊れるか

### 11.1 独立性を失う

分散計算では

$$
\operatorname{Var}
\left(
\sum_iY_i
\right)
=
\sum_i\operatorname{Var}(Y_i)
$$

を使いました。

独立性がなければ一般には

$$
\operatorname{Var}
\left(
\sum_iY_i
\right)
=
\sum_i\operatorname{Var}(Y_i)
+
2\sum_{i<j}\operatorname{Cov}(Y_i,Y_j)
$$

です。

従って

$$
\sigma^2/N
$$

という標準誤差公式を機械的に使えません。

### 11.2 分散が無限

$E|Y|<\infty$ でも

$$
\operatorname{Var}(Y)=\infty
$$

なら、大数則による平均収束が成立する場合はあります。

しかし本章の

$$
\frac{\sigma}{\sqrt N}
$$

という二乗平均平方根誤差も、有限分散の中心極限定理も使えません。

「標本平均が収束する」と「通常の $N^{-1/2}$ 正規誤差評価が使える」は別の主張です。

### 11.3 標本が独立同分布でない

相関を持つ標本列では、厳密な独立同分布条件をそのまま仮定できない場合があります。

その場合は別の依存構造の極限定理や有効標本サイズが必要です。

本章ではそこへ進まず、独立同分布 Monte Carlo の基準線を固定します。

---

## 12. 標本誤差と離散化バイアスを分ける

Monte Carlo を連続モデルの離散近似と組み合わせると、期待値を取りたい対象そのものを厳密には計算できないことがあります。

真の量を $Q$ とし、離散化して計算できる近似を $Q_h$ とします。

求めたいのは

$$
I=E[Q]
$$

ですが、実際には独立な $Q_h^{(1)},\ldots,Q_h^{(N)}$ を使って

$$
\widehat I_{h,N}
=
\frac1N\sum_{i=1}^NQ_h^{(i)}
$$

を計算するとします。

このとき

$$
\widehat I_{h,N}-I
=
\left(
\widehat I_{h,N}-E[Q_h]
\right)
+
\left(
E[Q_h]-E[Q]
\right).
$$

第1項が標本誤差、第2項が離散化バイアスです。

<a id="prop-mc1-bias-variance-decomposition"></a>

<!-- formal-statement-start -->
### 命題（バイアスと標本誤差の二乗平均誤差分解）

$Q_h^{(1)},\ldots,Q_h^{(N)}$ を独立同分布とし、

$$
E[(Q_h^{(1)})^2]<\infty
$$

とする。

$$
\widehat I_{h,N}
=
\frac1N\sum_{i=1}^NQ_h^{(i)},
\qquad
I=E[Q]
$$

と置く。

$$
b_h
:=
E[Q_h]-E[Q],
\qquad
\sigma_h^2
:=
\operatorname{Var}(Q_h)
$$

とすれば

$$
\boxed{
E[
(\widehat I_{h,N}-I)^2
]
=
b_h^2
+
\frac{\sigma_h^2}{N}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

推定誤差を「平均0の標本誤差」と「定数のバイアス」に分けます。

交差項は、標本誤差の期待値が0なので消えます。

<!-- proof-start -->
### 証明

$$
A
:=
\widehat I_{h,N}-E[Q_h]
$$

と置きます。

すると

$$
E[A]=0
$$

であり、

$$
\widehat I_{h,N}-I
=
A+b_h.
$$

従って

$$
\begin{aligned}
E[(\widehat I_{h,N}-I)^2]
&=
E[(A+b_h)^2]
\\
&=
E[A^2]
+
2b_hE[A]
+
b_h^2
\\
&=
E[A^2]
+
b_h^2.
\end{aligned}
$$

$A$ は $Q_h$ の標本平均からその期待値を引いたものなので

$$
E[A^2]
=
\operatorname{Var}(\widehat I_{h,N})
=
\frac{\sigma_h^2}{N}.
$$

従って

$$
E[(\widehat I_{h,N}-I)^2]
=
b_h^2
+
\frac{\sigma_h^2}{N}.
$$
<!-- proof-end -->

この分解は MC4 で非常に重要になります。

標本数 $N$ だけ増やしても

$$
\frac{\sigma_h^2}{N}
$$

は減りますが

$$
b_h^2
$$

は減りません。

逆に $h$ だけ細かくしても、1標本あたりの計算費用が増える一方で標本誤差は残ります。

したがって確率数値計算では

$$
\boxed{
\text{離散化精度}
\quad\text{と}\quad
\text{標本数}
}
$$

を別々に設計する必要があります。

---

## 13. 本章の論理を一本につなぐ

Monte Carlo 法の基準線は次のように整理できます。

$$
I=E[Y]
$$

を求めたいとします。

独立同分布標本から

$$
\widehat I_N
=
\frac1N\sum_{i=1}^NY_i
$$

を作ると、

$$
E[\widehat I_N]=I
$$

で不偏です。

有限分散なら

$$
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N},
$$

従って

$$
\operatorname{RMSE}
=
\frac{\sigma}{\sqrt N}.
$$

強大数則から

$$
\widehat I_N\to I
\qquad
\text{a.s.}
$$

であり、[独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\Rightarrow N(0,1).
$$

未知の $\sigma$ は標本分散 $S_N^2$ から推定し、

$$
\widehat{\operatorname{SE}}
=
\frac{S_N}{\sqrt N}
$$

を報告します。

連続対象を離散近似してから標本化する場合には

$$
\boxed{
\operatorname{MSE}
=
\text{離散化バイアス}^2
+
\text{標本分散項}
}
$$

へ分かれます。

この構造を基準にすると、後続の役割も明確です。

- MC2：独立標本を実際にどう生成するか。
- MC3：同じ計算予算で $\sigma^2$ をどう下げるか。
- MC4：バイアス・分散・1標本コストを複数解像度でどう釣り合わせるか。

---

# 演習

## Level A

### A1. $\int_0^1x^2dx$ の分散と二乗平均平方根誤差

- Level: A
- ID: MC1-A1

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
Y=U^2.
$$

(1)

$$
I=E[Y]
$$

を求めよ。

(2)

$$
\sigma^2=\operatorname{Var}(Y)
$$

を求めよ。

(3) $N=100$ の Monte Carlo 推定量の二乗平均平方根誤差を求めよ。

<!-- solution-start -->
### 詳細解答

(1)

$$
I
=
E[U^2]
=
\int_0^1x^2\,dx
=
\boxed{\frac13}.
$$

(2) 分散には二次モーメントが必要です。

$$
E[Y^2]
=
E[U^4]
=
\int_0^1x^4\,dx
=
\frac15.
$$

従って

$$
\begin{aligned}
\sigma^2
&=
E[Y^2]-E[Y]^2
\\
&=
\frac15-\frac19
\\
&=
\frac{9-5}{45}
\\
&=
\boxed{\frac4{45}}.
\end{aligned}
$$

従って

$$
\sigma
=
\frac2{\sqrt{45}}.
$$

(3) $N=100$ なので

$$
\operatorname{RMSE}
=
\frac{\sigma}{\sqrt N}
=
\frac{2/\sqrt{45}}{10}
=
\boxed{
\frac1{5\sqrt{45}}
}.
$$

約

$$
0.0298
$$

です。
<!-- solution-end -->

### A2. 円周率 Monte Carlo の分散

- Level: A
- ID: MC1-A2

$(U,V)$ を $[0,1]^2$ 上の一様分布とし、

$$
Y
=
\boldsymbol 1_{\{U^2+V^2\le1\}}
$$

とする。

$$
p=P(Y=1)=\frac\pi4
$$

を用いて

(1) $E[Y]$ と $\operatorname{Var}(Y)$ を求めよ。

(2)

$$
\widehat\pi_N=4\overline Y_N
$$

の分散を求めよ。

<!-- solution-start -->
### 詳細解答

$Y$ は Bernoulli$(p)$ です。

従って

$$
E[Y]=p=\boxed{\frac\pi4}.
$$

また Bernoulli 変数の分散は

$$
p(1-p)
$$

なので

$$
\operatorname{Var}(Y)
=
\boxed{
\frac\pi4
\left(
1-\frac\pi4
\right)
}.
$$

(2)

$$
\operatorname{Var}(\overline Y_N)
=
\frac{p(1-p)}{N}.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(\widehat\pi_N)
&=
16\operatorname{Var}(\overline Y_N)
\\
&=
\boxed{
\frac{16}{N}
\frac\pi4
\left(
1-\frac\pi4
\right)
}.
\end{aligned}
$$
<!-- solution-end -->

### A3. 誤差半減に必要な標本数

- Level: A
- ID: MC1-A3

ある Monte Carlo 推定量で、$N=2.5\times10^4$ のとき理論二乗平均平方根誤差が $0.02$ だった。

同じ被積分関数・同じ標本分布のまま、二乗平均平方根誤差を

(1) $0.01$

(2) $0.005$

まで下げるには、標本数をそれぞれいくつにすればよいか。

<!-- solution-start -->
### 詳細解答

Monte Carlo の二乗平均平方根誤差は

$$
\operatorname{RMSE}
=
\frac{\sigma}{\sqrt N}
$$

です。

(1) $0.02$ から $0.01$ へ半減させるので、標本数は4倍必要です。

$$
N_{\mathrm{new}}
=
4\times2.5\times10^4
=
\boxed{1.0\times10^5}.
$$

(2) $0.02$ から $0.005$ へは4分の1です。

誤差を4分の1にするには標本数を

$$
4^2=16
$$

倍にします。

従って

$$
N_{\mathrm{new}}
=
16\times2.5\times10^4
=
\boxed{4.0\times10^5}.
$$
<!-- solution-end -->

### A4. 標本分散と Monte Carlo 標準誤差

- Level: A
- ID: MC1-A4

標本

$$
0,\ 1,\ 2,\ 1
$$

から Monte Carlo 推定量を作った。

(1) 標本平均を求めよ。

(2) 不偏標本分散 $S_4^2$ を求めよ。

(3) Monte Carlo 標準誤差 $S_4/\sqrt4$ を求めよ。

<!-- solution-start -->
### 詳細解答

(1)

$$
\overline Y_4
=
\frac{0+1+2+1}{4}
=
\boxed{1}.
$$

(2) 偏差は

$$
-1,\ 0,\ 1,\ 0
$$

なので偏差平方和は

$$
1+0+1+0=2.
$$

不偏標本分散は

$$
S_4^2
=
\frac2{4-1}
=
\boxed{\frac23}.
$$

従って

$$
S_4
=
\sqrt{\frac23}.
$$

(3)

$$
\widehat{\operatorname{SE}}
=
\frac{S_4}{\sqrt4}
=
\frac12\sqrt{\frac23}
=
\boxed{
\sqrt{\frac16}
}.
$$
<!-- solution-end -->

## Level B

### B1. 不偏性・分散・RMSE を一から導く

- Level: B
- ID: MC1-B1

$Y_1,\ldots,Y_N$ を独立同分布とし、

$$
E[Y_i]=I,
\qquad
\operatorname{Var}(Y_i)=\sigma^2<\infty.
$$

$$
\widehat I_N
=
\frac1N\sum_{i=1}^NY_i
$$

について次を示せ。

(1) $E[\widehat I_N]=I$。

(2) $\operatorname{Var}(\widehat I_N)=\sigma^2/N$。

(3) $\operatorname{RMSE}(\widehat I_N)=\sigma/\sqrt N$。

(4) $N$ を $9N$ にすると RMSE は何倍になるか。

<!-- solution-start -->
### 詳細解答

(1) 期待値の線形性から

$$
E[\widehat I_N]
=
\frac1N
\sum_{i=1}^NE[Y_i]
=
\frac1N
NI
=
\boxed I.
$$

(2) 独立性から共分散項が消えるので

$$
\begin{aligned}
\operatorname{Var}(\widehat I_N)
&=
\frac1{N^2}
\operatorname{Var}
\left(
\sum_{i=1}^NY_i
\right)
\\
&=
\frac1{N^2}
\sum_{i=1}^N\sigma^2
\\
&=
\boxed{
\frac{\sigma^2}{N}
}.
\end{aligned}
$$

(3) (1) より不偏なので

$$
E[(\widehat I_N-I)^2]
=
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}.
$$

従って

$$
\operatorname{RMSE}
=
\boxed{
\frac{\sigma}{\sqrt N}
}.
$$

(4)

$$
\operatorname{RMSE}_{9N}
=
\frac{\sigma}{\sqrt{9N}}
=
\frac13
\frac{\sigma}{\sqrt N}.
$$

従って

$$
\boxed{\frac13\text{倍}}
$$

です。
<!-- solution-end -->

### B2. 標本分散の一致性を再構成する

- Level: B
- ID: MC1-B2

$Y_1,Y_2,\ldots$ を独立同分布とし、

$$
E[Y_1]=I,
\qquad
\operatorname{Var}(Y_1)=\sigma^2<\infty.
$$

$$
S_N^2
=
\frac1{N-1}
\sum_{i=1}^N(Y_i-\overline Y_N)^2
$$

とする。

(1)

$$
S_N^2
=
\frac{N}{N-1}
\left(
\frac1N\sum_{i=1}^NY_i^2-\overline Y_N^2
\right)
$$

を示せ。

(2) 大数則を使って $S_N^2\to\sigma^2$ a.s. を示せ。

<!-- solution-start -->
### 詳細解答

(1)

$$
\begin{aligned}
\sum_{i=1}^N(Y_i-\overline Y_N)^2
&=
\sum_{i=1}^N
\left(
Y_i^2
-2Y_i\overline Y_N
+\overline Y_N^2
\right)
\\
&=
\sum_{i=1}^NY_i^2
-
2\overline Y_N
\sum_{i=1}^NY_i
+
N\overline Y_N^2.
\end{aligned}
$$

ここで

$$
\sum_{i=1}^NY_i
=
N\overline Y_N
$$

なので

$$
\sum_{i=1}^N(Y_i-\overline Y_N)^2
=
\sum_{i=1}^NY_i^2
-
N\overline Y_N^2.
$$

従って

$$
\begin{aligned}
S_N^2
&=
\frac1{N-1}
\left(
\sum_{i=1}^NY_i^2
-
N\overline Y_N^2
\right)
\\
&=
\boxed{
\frac{N}{N-1}
\left(
\frac1N\sum_{i=1}^NY_i^2
-
\overline Y_N^2
\right)
}.
\end{aligned}
$$

(2) 有限分散より

$$
E[Y_1^2]<\infty.
$$

大数則から

$$
\overline Y_N\to I
\qquad
\text{a.s.}
$$

かつ

$$
\frac1N\sum_{i=1}^NY_i^2
\to
E[Y_1^2]
\qquad
\text{a.s.}
$$

です。

従って

$$
\frac1N\sum_{i=1}^NY_i^2
-
\overline Y_N^2
\to
E[Y_1^2]-I^2
=
\sigma^2
$$

a.s. です。

さらに

$$
\frac{N}{N-1}\to1
$$

なので

$$
\boxed{
S_N^2\to\sigma^2
\qquad
\text{a.s.}
}.
$$
<!-- solution-end -->

### B3. 近似95%区間と標本数設計

- Level: B
- ID: MC1-B3

ある Monte Carlo 計算で

$$
N=10000,
\qquad
\widehat I_N=0.502,
\qquad
S_N=0.29
$$

を得た。

$z_{0.975}=1.96$ とする。

(1) Monte Carlo 標準誤差を求めよ。

(2) 正規近似による95%区間を求めよ。

(3) $S_N\approx0.29$ が今後も代表的だと仮定し、95%区間の半幅を $0.002$ 以下にするための標本数の目安を求めよ。

<!-- solution-start -->
### 詳細解答

(1)

$$
\widehat{\operatorname{SE}}
=
\frac{S_N}{\sqrt N}
=
\frac{0.29}{100}
=
\boxed{0.0029}.
$$

(2) 半幅は

$$
1.96\times0.0029
=
0.005684.
$$

従って近似95%区間は

$$
0.502\pm0.005684.
$$

すなわち

$$
\boxed{
[0.496316,\ 0.507684]
}
$$

です。

これは中心極限定理に基づく近似区間であり、有限標本で厳密に95%被覆するという主張ではありません。

(3)

$$
1.96\frac{0.29}{\sqrt N}
\le0.002
$$

を解きます。

$$
\sqrt N
\ge
\frac{1.96\cdot0.29}{0.002}
=
284.2.
$$

従って

$$
N
\ge
284.2^2
=
80769.64.
$$

整数標本数として

$$
\boxed{
N\ge80770
}
$$

が目安です。
<!-- solution-end -->

## Level C

### C1. 積分・中心極限定理・標本数・バイアスを一つにつなぐ

- Level: C
- ID: MC1-C1

$U\sim\operatorname{Unif}(0,1)$ とし、

$$
Y=e^U.
$$

$$
I
=
\int_0^1e^x\,dx
$$

を Monte Carlo 法で推定する。

(1) $I$ を求めよ。

(2) $E[Y^2]$ と $\sigma^2=\operatorname{Var}(Y)$ を求めよ。

(3) 独立標本 $Y_1,\ldots,Y_N$ による

$$
\widehat I_N
=
\frac1N\sum_{i=1}^NY_i
$$

について、不偏性と分散を求めよ。

(4) [独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\Rightarrow N(0,1)
$$

を説明し、$\sigma$ が既知として近似95%区間を書け。

(5) 近似95%区間の半幅を $0.01$ 以下にするための標本数条件を、$\sigma$ を用いて表せ。

(6) 今度は $Y$ 自体を厳密に計算できず、近似量 $Y_h$ を使うとする。

$$
E[Y_h]-E[Y]
=
Ch
$$

かつ

$$
\operatorname{Var}(Y_h)=\sigma_h^2
$$

とする。

独立な $Y_h^{(1)},\ldots,Y_h^{(N)}$ に対する推定量

$$
\widehat I_{h,N}
=
\frac1N\sum_{i=1}^NY_h^{(i)}
$$

の二乗平均誤差を求め、$N\to\infty$ だけでは真の $I$ へ二乗平均誤差が0にならない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

#### (1) 真の積分

$$
I
=
\int_0^1e^x\,dx
=
[e^x]_0^1
=
\boxed{e-1}.
$$

#### (2) 二次モーメントと分散

$$
Y^2=e^{2U}
$$

なので

$$
E[Y^2]
=
\int_0^1e^{2x}\,dx
=
\left[
\frac12e^{2x}
\right]_0^1
=
\boxed{
\frac{e^2-1}{2}
}.
$$

従って

$$
\begin{aligned}
\sigma^2
&=
E[Y^2]-E[Y]^2
\\
&=
\frac{e^2-1}{2}
-
(e-1)^2.
\end{aligned}
$$

整理すると

$$
\begin{aligned}
\sigma^2
&=
\frac{e^2-1}{2}
-
(e^2-2e+1)
\\
&=
\frac{-e^2+4e-3}{2}.
\end{aligned}
$$

従って

$$
\boxed{
\sigma^2
=
\frac{-e^2+4e-3}{2}
}.
$$

#### (3) 不偏性と分散

標本は独立同分布で

$$
E[Y_i]=I,
\qquad
\operatorname{Var}(Y_i)=\sigma^2.
$$

従って

$$
\boxed{
E[\widehat I_N]=I=e-1
}
$$

であり、

$$
\boxed{
\operatorname{Var}(\widehat I_N)
=
\frac{\sigma^2}{N}
=
\frac{-e^2+4e-3}{2N}
}.
$$

#### (4) 中心極限定理と近似95%区間

$0<\sigma^2<\infty$ で、$Y_i$ は独立同分布です。

従って独立同分布中心極限定理を適用でき、

$$
\boxed{
\frac{\sqrt N(\widehat I_N-I)}{\sigma}
\Rightarrow N(0,1)
}
$$

です。

$z_{0.975}=1.96$ を使うと、$\sigma$ 既知の近似95%区間は

$$
\boxed{
\widehat I_N
\pm
1.96\frac{\sigma}{\sqrt N}
}
$$

です。

#### (5) 標本数条件

半幅が $0.01$ 以下なので

$$
1.96\frac{\sigma}{\sqrt N}
\le0.01.
$$

従って

$$
\sqrt N
\ge
\frac{1.96\sigma}{0.01}.
$$

両辺を二乗して

$$
\boxed{
N
\ge
\left(
\frac{1.96\sigma}{0.01}
\right)^2
}.
$$

#### (6) 離散化バイアスを含む場合

仮定より

$$
b_h
=
E[Y_h]-E[Y]
=
Ch.
$$

また標本平均の分散は

$$
\frac{\sigma_h^2}{N}.
$$

従ってバイアス・分散分解から

$$
\boxed{
E[
(\widehat I_{h,N}-I)^2
]
=
C^2h^2
+
\frac{\sigma_h^2}{N}
}.
$$

$h$ を固定したまま $N\to\infty$ とすると

$$
\frac{\sigma_h^2}{N}\to0
$$

ですが

$$
C^2h^2
$$

は残ります。

従って

$$
\boxed{
N\to\infty\text{ だけでは離散化バイアスは消えない}
}
$$

ことが分かります。

真の $I$ への二乗平均誤差を0へ送るには、標本数を増やすだけでなく $h\to0$ も必要です。
<!-- solution-end -->

---

## 章末チェック

- 積分を期待値として書き、Monte Carlo 推定量を構成できる。
- 不偏性、分散 $\sigma^2/N$、二乗平均平方根誤差 $\sigma/\sqrt N$ を導ける。
- 大数則を強一致性として、中心極限定理を統計的誤差評価として使い分けられる。
- 標本分散から Monte Carlo 標準誤差を計算できる。
- 正規近似による区間が漸近的な被覆主張であることを説明できる。
- 目標精度から必要標本数を逆算できる。
- $N^{-1/2}$ 率に次元が直接現れないことと、分散・1標本コストは次元依存し得ることを区別できる。
- 標本誤差と離散化バイアスを分け、二乗平均誤差を $b_h^2+\sigma_h^2/N$ に分解できる。
