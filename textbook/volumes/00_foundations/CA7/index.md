# CA7 標準複素解析 VII：正則関数列・正規族・Riemann 写像定理

> **標準複素解析コア VII**。CA1--CA6 では、一つの正則関数を微分・積分・展開し、その零点・極・解析接続・調和性を調べてきた。本章では視点を「関数の列・関数の族」へ移す。核心は、正則性が Cauchy 積分公式によって非常に強く拘束されるため、局所有界性だけから部分列収束を引き出せることである。このコンパクト性を Montel の定理として確立し、Hurwitz の定理で零点と単射性を極限へ移し、最後に Riemann 写像定理を極値問題として証明する。

<!-- definition-example-audit: strict -->

## 0. この章で閉じる論理鎖

本章で既知として使う主な結果は次である。

- [CA2 の単連結領域の Cauchy の定理](../CA2/index.md#thm-ca2-cauchy-simply-connected)
- [CA3 の Cauchy 積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)
- [CA3 の Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives)
- [CA3 の Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)
- [CA3 の最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)
- [CA3 の零点孤立性・恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)
- [CA4 の Rouché の定理](../CA4/index.md#thm-ca4-rouche)
- [CA6 の円板の標準自己同型](../CA6/index.md#lem-ca6-standard-disk-automorphism)
- [CA6 の Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)
- [CA6 の円板自己同型の分類](../CA6/index.md#cor-ca6-disk-automorphism-classification)
- [TOP5 の距離空間におけるコンパクト性と点列コンパクト性](../TOP5/index.md#thm-top5-metric-sequential)

一方、一般の Arzelà--Ascoli の定理、一様化定理、Riemann 面、Runge の近似定理は使わない。特に Montel の定理は一般関数解析のコンパクト性定理を黒箱にせず、複素解析で必要な有限近似点集合と対角化を本文で証明する。

本章の主線は

~~~text
局所一様収束
  ↓ Cauchy積分公式
極限の正則性・導関数列の収束
  ↓ Cauchy評価
局所有界族の族共通連続性評価
  ↓ 有限近似点集合 + 対角化
Montelの定理
  ↓ Rouché
Hurwitzの定理
  ↓
単射性を極限へ移す
  ↓ 極値問題 + Schwarzの補題
Riemann写像定理
~~~

である。

---

## 1. 一様収束では強すぎ、各点収束では弱すぎる

正則関数列を極限へ送るとき、領域全体での一様収束を要求すると強すぎる。典型例は

$$
f_n(z)=z^n,\qquad z\in\mathbb D
$$

である。各 $0<r<1$ に対して

$$
\sup_{|z|\le r}|z|^n=r^n\longrightarrow0
$$

だが、

$$
\sup_{z\in\mathbb D}|z|^n=1
$$

なので単位円板全体では一様収束しない。複素解析で自然なのは「境界から正の距離を持つ任意のコンパクト集合上で一様」という収束である。

<a id="def-ca7-locally-uniform-convergence"></a>
<!-- formal-statement-start -->
### 定義（局所一様収束）

$\Omega\subset\mathbb C$ を領域とし、関数列 $f_n:\Omega\to\mathbb C$ と関数 $f:\Omega\to\mathbb C$ を取る。任意のコンパクト集合 $K\subset\Omega$ に対して

$$
\sup_{z\in K}|f_n(z)-f(z)|\longrightarrow0
\qquad(n\to\infty)
$$

が成り立つとき、$f_n$ は $f$ に **局所一様収束**するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca7-locally-uniform-convergence -->
**定義の確認**：$f_n(z)=z^n$ は $\mathbb D$ 上で0へ局所一様収束する。実際、コンパクト集合 $K\subset\mathbb D$ に対して連続関数 $|z|$ は最大値 $r$ を取り、$K$ が境界円周を含まないので $r<1$ である。従って

$$
\sup_{z\in K}|f_n(z)|\le r^n\to0.
$$

一方、$\mathbb D$ 全体での一様収束は上で見た通り失敗する。「各コンパクト集合」という条件が境界付近だけを切り離している。
<!-- definition-example-end -->

各点収束だけでは弱すぎる。実変数関数では連続関数列の各点極限が不連続になることさえある。正則関数でも、極限へ正則性を渡すには Cauchy 積分を極限と交換できるだけの一様性が必要である。

<a id="thm-ca7-holomorphic-locally-uniform-limit"></a>
<!-- formal-statement-start -->
### 定理（正則関数列の局所一様極限）

$\Omega\subset\mathbb C$ を領域とし、各 $n$ について $f_n$ を $\Omega$ 上正則とする。$f_n$ が関数 $f:\Omega\to\mathbb C$ へ局所一様収束するなら、$f$ は $\Omega$ 上正則である。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $a\in\Omega$ のまわりに閉円板を二重に取る。外側の円周上では $f_n\to f$ が一様なので、[Cauchy 積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)の積分をそのまま極限へ送れる。すると $f$ 自身が Cauchy 積分表示を持ち、その右辺を差商で微分できる。

<!-- proof-start -->
### 証明

$a\in\Omega$ を任意に取る。$\Omega$ は開集合なので、ある $R>0$ を選んで

$$
\overline{D(a,R)}\subset\Omega
$$

とできる。$0<r<R$ を固定する。

各 $n$ と $|z-a|\le r$ に対し [Cauchy 積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)から

$$
f_n(z)
=
\frac{1}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f_n(\zeta)}{\zeta-z}\,d\zeta.
$$

円周 $|\zeta-a|=R$ はコンパクトなので、局所一様収束から

$$
\varepsilon_n
=
\sup_{|\zeta-a|=R}|f_n(\zeta)-f(\zeta)|
\longrightarrow0.
$$

また $|z-a|\le r$、$|\zeta-a|=R$ なら

$$
|\zeta-z|\ge R-r.
$$

従って

$$
\left|
\frac{1}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f_n(\zeta)-f(\zeta)}{\zeta-z}\,d\zeta
\right|
\le
\frac{R}{R-r}\,\varepsilon_n
\longrightarrow0
$$

であり、この収束は $|z-a|\le r$ に関して一様である。一方 $f_n(z)\to f(z)$ だから

$$
f(z)
=
\frac{1}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f(\zeta)}{\zeta-z}\,d\zeta
\qquad(|z-a|\le r)
$$

を得る。

右辺の核 $(\zeta-z)^{-1}$ は $|z-a|<R$ で $z$ に関して正則であり、$z$ を $|z-a|\le r$ に制限すれば分母は $R-r$ 以上離れている。[Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives)の証明と同じ差商評価により右辺は $z$ で微分できる。従って $f$ は $D(a,r)$ 上正則である。

$a$ は任意だったから $f$ は $\Omega$ 上正則である。$\square$
<!-- proof-end -->

重要なのは、「正則関数の極限だから正則」ではなく、**局所一様収束によって境界円周上の Cauchy 積分を極限と交換できた**ことである。

<a id="cor-ca7-derivative-local-uniform-convergence"></a>
<!-- formal-statement-start -->
### 系（導関数列の局所一様収束）

$\Omega\subset\mathbb C$ を領域とし、各 $f_n$ を $\Omega$ 上正則とする。$f_n\to f$ が $\Omega$ 上局所一様なら、任意の整数 $k\ge0$ に対して

$$
f_n^{(k)}\longrightarrow f^{(k)}
$$

も $\Omega$ 上局所一様に収束する。
<!-- formal-statement-end -->

### 証明の核心

コンパクト集合 $K\subset\Omega$ の各点を少し大きい円で囲み、有限個に減らすこともできるが、局所円板での評価を直接書けば機構が見える。$|z-a|\le r<R$ なら [Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives)から

$$
f_n^{(k)}(z)-f^{(k)}(z)
=
\frac{k!}{2\pi i}
\int_{|\zeta-a|=R}
\frac{f_n(\zeta)-f(\zeta)}
{(\zeta-z)^{k+1}}\,d\zeta,
$$

従って

$$
\sup_{|z-a|\le r}
|f_n^{(k)}(z)-f^{(k)}(z)|
\le
\frac{k!R}{(R-r)^{k+1}}
\sup_{|\zeta-a|=R}|f_n(\zeta)-f(\zeta)|.
$$

右辺は0へ行く。任意のコンパクト $K$ はこのような内側円板の有限個で覆えるので、$K$ 上でも一様収束する。$\square$

### 何が強いのか

実変数の $C^1$ 関数列では、関数自身が一様収束しても導関数が収束するとは限らない。正則関数では Cauchy 積分公式が「関数値」と「全階導関数」を同じ境界データに結び付けるため、局所一様収束だけで全階導関数まで制御される。

---

## 2. 正規収束する正則関数級数

<a id="def-ca7-normal-convergence"></a>
<!-- formal-statement-start -->
### 定義（正規収束）

$\Omega\subset\mathbb C$ を領域とし、関数列 $g_n:\Omega\to\mathbb C$ を取る。関数級数

$$
\sum_{n=1}^{\infty}g_n(z)
$$

が $\Omega$ 上 **正規収束**するとは、任意のコンパクト集合 $K\subset\Omega$ に対して

$$
\sum_{n=1}^{\infty}
\sup_{z\in K}|g_n(z)|
<\infty
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca7-normal-convergence -->
**定義の確認**：単位円板で

$$
\sum_{n=0}^{\infty}z^n
$$

を考える。コンパクト集合 $K\subset\mathbb D$ に対し

$$
r=\max_{z\in K}|z|<1
$$

なので

$$
\sum_{n=0}^{\infty}\sup_{z\in K}|z^n|
\le
\sum_{n=0}^{\infty}r^n
=
\frac1{1-r}<\infty.
$$

従って幾何級数は $\mathbb D$ 上正規収束する。
<!-- definition-example-end -->

<a id="cor-ca7-normal-series-termwise-differentiation"></a>
<!-- formal-statement-start -->
### 系（正規収束する正則関数級数と微分の交換）

$\Omega\subset\mathbb C$ を領域とし、各 $g_n$ を $\Omega$ 上正則とする。級数 $\sum_{n=1}^{\infty}g_n$ が $\Omega$ 上正規収束し、その和を $g$ とする。このとき $g$ は $\Omega$ 上正則であり、任意の整数 $k\ge1$ について

$$
g^{(k)}(z)
=
\lim_{N\to\infty}
\sum_{n=1}^{N}g_n^{(k)}(z)
$$

が成り立つ。右辺の有限和列は $g^{(k)}$ へ局所一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意のコンパクト $K\subset\Omega$ に対し

$$
\sum_{n=1}^{\infty}
\sup_K|g_n|<\infty
$$

だから、Cauchy 条件により有限和列

$$
S_N=\sum_{n=1}^{N}g_n
$$

は $K$ 上一様 Cauchy、従って一様収束する。つまり $S_N\to g$ は局所一様収束である。

各 $S_N$ は有限和なので正則である。[正則関数列の局所一様極限](#thm-ca7-holomorphic-locally-uniform-limit)から $g$ は正則である。さらに [導関数列の局所一様収束](#cor-ca7-derivative-local-uniform-convergence)を $S_N$ に適用すると

$$
S_N^{(k)}
=
\sum_{n=1}^{N}g_n^{(k)}
\longrightarrow
g^{(k)}
$$

が局所一様に成り立つ。$\square$
<!-- proof-end -->

ここでは「微分した級数も正規収束する」とまでは主張していない。必要なのは、元の級数の正規収束から有限和列が局所一様収束し、正則関数列の極限定理によって**導関数の有限和列**も局所一様収束する、という順序である。

---

## 3. 関数族：局所有界性から部分列を取り出す

<a id="def-ca7-locally-bounded-family"></a>
<!-- formal-statement-start -->
### 定義（局所有界な正則関数族）

$\Omega\subset\mathbb C$ を領域とし、$\mathcal F$ を $\Omega$ 上の正則関数の族とする。$\mathcal F$ が **局所有界**であるとは、任意の $a\in\Omega$ に対し、ある $r>0$ と $M<\infty$ が存在して

$$
D(a,r)\subset\Omega,
\qquad
|f(z)|\le M
$$

が全ての $z\in D(a,r)$ と全ての $f\in\mathcal F$ について成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca7-locally-bounded-family -->
**定義の確認**：円板自己写像全体

$$
\mathcal F
=
\{f:\mathbb D\to\mathbb D\mid f\text{ は正則}\}
$$

では全ての $f\in\mathcal F$ について $|f(z)|<1$ だから、任意の点で同じ上界 $M=1$ を使える。従って $\mathcal F$ は局所有界である。
<!-- definition-example-end -->

<a id="def-ca7-normal-family"></a>
<!-- formal-statement-start -->
### 定義（正規族）

$\Omega\subset\mathbb C$ を領域とし、$\mathcal F$ を $\Omega$ 上の正則関数の族とする。本章では、$\mathcal F$ から任意に取った列 $(f_n)$ が、ある $\Omega$ 上正則な関数 $f$ へ局所一様収束する部分列 $(f_{n_j})$ を持つとき、$\mathcal F$ を **正規族**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca7-normal-family -->
**定義の確認**：有限個の正則関数からなる族は正規族である。実際、任意の列では少なくとも一つの関数が無限回現れるので、その定数部分列を取れば局所一様収束する。Montel の定理は、この有限性を「局所有界性」へ大幅に弱めても部分列が取れることを示す。
<!-- definition-example-end -->

### 局所有界性はコンパクト集合上の一様有界性を与える

コンパクト集合 $K\subset\Omega$ を取る。各 $a\in K$ について局所有界性から近傍 $U_a$ と上界 $M_a$ がある。$\{U_a\}_{a\in K}$ は $K$ の開被覆なのでコンパクト性から有限部分被覆

$$
K\subset U_{a_1}\cup\cdots\cup U_{a_m}
$$

を選べる。従って

$$
M_K=\max(M_{a_1},\ldots,M_{a_m})
$$

と置けば

$$
|f(z)|\le M_K
\qquad
(z\in K,\ f\in\mathcal F)
$$

である。局所情報を有限個へ圧縮したこの一段が、後の Cauchy 評価を族全体で一様にする。

<a id="lem-ca7-cauchy-equicontinuity"></a>
<!-- formal-statement-start -->
### 補題（Cauchy 評価による族共通連続性評価）

$\Omega\subset\mathbb C$ を領域、$\mathcal F$ を $\Omega$ 上局所有界な正則関数族とする。任意のコンパクト集合 $K\subset\Omega$ と $\varepsilon>0$ に対し、ある $\delta>0$ が存在して、全ての $f\in\mathcal F$ と全ての $z,w\in K$ について

$$
|z-w|<\delta
\quad\Longrightarrow\quad
|f(z)-f(w)|<\varepsilon
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各点のまわりで、少し大きい円板上の関数値を一様に抑える。すると [Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)が導関数を族全体で一様に抑える。最後にコンパクト性で有限個の円板へ減らし、共通の $\delta$ を選ぶ。

<!-- proof-start -->
### 証明

各 $a\in K$ について、局所有界性と $\Omega$ の開性から $r_a>0$ と $M_a<\infty$ を選び、

$$
\overline{D(a,2r_a)}\subset\Omega,
\qquad
|f(z)|\le M_a
$$

を $z\in D(a,2r_a)$、$f\in\mathcal F$ で成り立たせる。

$z\in D(a,r_a)$ なら $\overline{D(z,r_a)}\subset D(a,2r_a)$ だから、[Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)により

$$
|f'(z)|\le\frac{M_a}{r_a}
\qquad
(f\in\mathcal F).
$$

$\{D(a,r_a/2)\}_{a\in K}$ は $K$ を覆うので、有限個

$$
D(a_1,r_1/2),\ldots,D(a_m,r_m/2)
$$

で $K$ を覆える。ここで $r_j=r_{a_j}$、$M_j=M_{a_j}$ と書く。

有限開被覆なので、十分小さい $\delta_0>0$ を選べば、$z,w\in K$ かつ $|z-w|<\delta_0$ の二点は同じ $D(a_j,r_j)$ に入るようにできる。これはコンパクト距離空間の有限被覆に対する Lebesgue 数の議論であり、[TOP5 の距離空間におけるコンパクト性](../TOP5/index.md#thm-top5-metric-sequential)で用いた有限化と同じ機構である。

同じ円板 $D(a_j,r_j)$ に入った $z,w$ を結ぶ線分もこの凸な円板に含まれるので、

$$
f(w)-f(z)
=
\int_0^1
f'(z+t(w-z))(w-z)\,dt.
$$

従って

$$
|f(w)-f(z)|
\le
\frac{M_j}{r_j}|w-z|.
$$

そこで

$$
L=\max_{1\le j\le m}\frac{M_j}{r_j}
$$

とし、

$$
\delta=\min\left(\delta_0,\frac{\varepsilon}{L+1}\right)
$$

と取れば、全ての $f\in\mathcal F$ について $|f(w)-f(z)|<\varepsilon$ が得られる。$\square$
<!-- proof-end -->

<a id="lem-ca7-compact-subsequence-extraction"></a>
<!-- formal-statement-start -->
### 補題（コンパクト集合上の部分列抽出）

$K\subset\mathbb C$ をコンパクト集合とし、$(f_n)$ を $K$ 上の連続関数列とする。次の二条件を仮定する。

1. ある $M<\infty$ が存在して、全ての $n$ と $z\in K$ について $|f_n(z)|\le M$。
2. 任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して、全ての $n$ と $z,w\in K$ について
   $$
   |z-w|<\delta
   \Longrightarrow
   |f_n(z)-f_n(w)|<\varepsilon.
   $$

このとき $(f_n)$ は $K$ 上一様収束する部分列を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

一般の Arzelà--Ascoli の定理は使わない。コンパクト性から各精度 $1/m$ の有限近似点集合を取り、その合併を可算稠密集合にする。各稠密点で Bolzano--Weierstrass を順に適用して対角部分列を作り、最後に族共通連続性評価で「稠密点での収束」を「全点での一様 Cauchy 性」へ持ち上げる。

<!-- proof-start -->
### 証明

各 $m\ge1$ について、コンパクト性から有限集合 $E_m\subset K$ を選び、

$$
K\subset\bigcup_{x\in E_m}D(x,1/m)
$$

とできる。可算集合

$$
E=\bigcup_{m=1}^{\infty}E_m
=
\{x_1,x_2,\ldots\}
$$

は $K$ で稠密である。

数列 $(f_n(x_1))$ は閉円板 $\{|w|\le M\}$ に入る。この閉円板はコンパクトなので収束部分列を持つ。その部分列からさらに $x_2$ で収束する部分列を取り、同様に繰り返す。

第 $j$ 段階の部分列の第 $j$ 項を取る対角列を $(g_j)$ とする。すると固定した $x_\ell\in E$ について、十分後の $(g_j(x_\ell))$ は第 $\ell$ 段階以後の部分列に含まれるため収束する。

あとは $K$ 上一様 Cauchy であることを示す。$\varepsilon>0$ を取る。条件2から、全ての $n$ に共通な $\delta>0$ を選んで

$$
|z-w|<\delta
\Longrightarrow
|f_n(z)-f_n(w)|<\frac{\varepsilon}{3}
$$

とできる。$E$ は稠密なので各 $z\in K$ に対して $|z-x_\ell|<\delta$ となる $x_\ell\in E$ がある。

ただし $\ell$ を $z$ ごとに無限に動かしたままでは一様性が出ない。そこでコンパクト性をもう一度使い、有限個の点

$$
x_{\ell_1},\ldots,x_{\ell_N}\in E
$$

で $K$ を $\delta$ 球により覆う。各 $q=1,\ldots,N$ で $(g_j(x_{\ell_q}))$ は Cauchy だから、有限個を同時に満たす $J$ を選んで

$$
j,k\ge J
\Longrightarrow
|g_j(x_{\ell_q})-g_k(x_{\ell_q})|
<
\frac{\varepsilon}{3}
$$

を全ての $q$ について成り立たせる。

任意の $z\in K$ に対して $|z-x_{\ell_q}|<\delta$ となる $q$ を選べば

$$
\begin{aligned}
|g_j(z)-g_k(z)|
&\le
|g_j(z)-g_j(x_{\ell_q})|\\
&\quad+
|g_j(x_{\ell_q})-g_k(x_{\ell_q})|\\
&\quad+
|g_k(x_{\ell_q})-g_k(z)|\\
&<\varepsilon.
\end{aligned}
$$

従って $(g_j)$ は $K$ 上一様 Cauchy である。$\mathbb C$ は完備だから各点で極限が存在し、この Cauchy 評価がその収束を $K$ 上一様にする。$\square$
<!-- proof-end -->

---

## 4. Montel の定理

<a id="thm-ca7-montel"></a>
<!-- formal-statement-start -->
### 定理（Montel の定理）

$\Omega\subset\mathbb C$ を領域とし、$\mathcal F$ を $\Omega$ 上局所有界な正則関数族とする。このとき $\mathcal F$ は正規族である。すなわち、任意の列 $(f_n)\subset\mathcal F$ は、ある $\Omega$ 上正則な関数 $f$ へ局所一様収束する部分列を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

一つのコンパクト集合上では、局所有界性と [Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)から前二補題により一様収束部分列が取れる。しかし領域には無限個のコンパクト集合がある。そこで

$$
K_1\subset K_2\subset\cdots,
\qquad
\bigcup_mK_m=\Omega
$$

となる具体的なコンパクト exhaustion を作り、$K_1,K_2,\ldots$ の順に部分列を取り直して対角列を選ぶ。

<!-- proof-start -->
### 証明

$\Omega=\mathbb C$ の場合は $\mathbb C\setminus\Omega=\varnothing$ なので距離条件を省く。一般の場合、$m\ge1$ に対し

$$
K_m
=
\left\{
z\in\Omega:
|z|\le m,\ 
\operatorname{dist}(z,\mathbb C\setminus\Omega)\ge\frac1m
\right\}
$$

と置く。

各 $K_m$ は有界であり、$\mathbb C$ の閉集合

$$
\{|z|\le m\}
\cap
\left\{
z:
\operatorname{dist}(z,\mathbb C\setminus\Omega)\ge\frac1m
\right\}
$$

として閉でもあるからコンパクトである。また

$$
K_m\subset K_{m+1}.
$$

任意の $z\in\Omega$ は補集合から正の距離を持つ小円板を持ち、$|z|<\infty$ だから、十分大きい $m$ について $z\in K_m$ となる。従って

$$
\bigcup_{m=1}^{\infty}K_m=\Omega.
$$

さらに任意のコンパクト $K\subset\Omega$ について、$|z|$ は $K$ 上有界であり、$K$ と閉集合 $\mathbb C\setminus\Omega$ の距離は正なので、十分大きい $m$ で $K\subset K_m$ となる。

さて任意の列 $(f_n)\subset\mathcal F$ を取る。局所有界性とコンパクト性から各 $K_m$ 上で $(f_n)$ は一様有界であり、[Cauchy 評価による族共通連続性評価](#lem-ca7-cauchy-equicontinuity)も成り立つ。

[コンパクト集合上の部分列抽出](#lem-ca7-compact-subsequence-extraction)を $K_1$ に適用して、$K_1$ 上一様収束する部分列を取る。その部分列から $K_2$ 上一様収束する部分列を取り、以下同様にする。

第 $m$ 段階の部分列を

$$
f_{n^{(m)}_1},
f_{n^{(m)}_2},\ldots
$$

と書き、第 $m$ 段階の $m$ 番目を選ぶ対角列 $(g_m)$ を取る。固定した $K_N$ では、$m\ge N$ の $g_m$ は第 $N$ 段階の部分列に含まれる。従って $(g_m)$ は $K_N$ 上一様収束する。

各 $K_N$ 上の極限は重なりで一致するので、一つの関数 $f:\Omega\to\mathbb C$ を定める。任意のコンパクト $K\subset\Omega$ はある $K_N$ に含まれるから $g_m\to f$ は $K$ 上一様、すなわち局所一様である。

最後に各 $g_m$ は正則なので、[正則関数列の局所一様極限](#thm-ca7-holomorphic-locally-uniform-limit)から $f$ は正則である。従って $\mathcal F$ は正規族である。$\square$
<!-- proof-end -->

### 例：円板自己写像族

$\mathbb D$ から $\mathbb D$ への正則写像全体は $|f|<1$ で一様に抑えられるから局所有界であり、[Montel の定理](#thm-ca7-montel)により正規族である。

ここで「各点 $z$ で値列 $(f_n(z))$ が有界だから、点ごとに部分列を取る」だけでは足りない。非可算個の全点で同じ部分列を使う必要がある。有限近似点集合と対角化は、その量化順序を正しくそろえるための装置である。

---

## 5. Hurwitz の定理：零点は突然消えない

局所一様収束は関数値だけでなく零点の構造もかなり保存する。ただし極限が恒等的に0になる場合だけは別である。例えば

$$
f_n(z)=\frac1n
$$

は零点を持たないが、0へ局所一様収束する。

<a id="thm-ca7-hurwitz"></a>
<!-- formal-statement-start -->
### 定理（Hurwitz の定理）

$\Omega\subset\mathbb C$ を領域とし、各 $f_n$ を $\Omega$ 上正則とする。$f_n\to f$ が $\Omega$ 上局所一様で、$f$ は恒等的に0ではないとする。

$a\in\Omega$ が $f$ の位数 $m\ge1$ の零点なら、十分小さい $r>0$ を取ることで、十分大きい全ての $n$ について $f_n$ は $D(a,r)$ 内に重複度込みでちょうど $m$ 個の零点を持つ。

特に、全ての $f_n$ が $\Omega$ 上零点を持たないなら、$f$ は零点を持たないか、恒等的に0である。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ の零点は恒等的0でない限り孤立する。従って $a$ のまわりに小円を取り、境界上では $f$ が0にならないようにできる。境界はコンパクトなので $|f|$ は正の最小値を持つ。局所一様収束で $|f_n-f|<|f|$ を境界上一様に実現し、[Rouché の定理](../CA4/index.md#thm-ca4-rouche)へ渡す。

<!-- proof-start -->
### 証明

$f$ は恒等的に0ではないので、[零点孤立性・恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)から $a$ は孤立零点である。従って、ある $r>0$ を選んで

$$
\overline{D(a,r)}\subset\Omega
$$

かつ $a$ 以外に $f$ の零点を含まず、円周 $|\zeta-a|=r$ 上で $f(\zeta)\ne0$ とできる。

円周はコンパクトなので

$$
\eta
=
\min_{|\zeta-a|=r}|f(\zeta)|
>0.
$$

局所一様収束から、十分大きい $n$ について

$$
\sup_{|\zeta-a|=r}|f_n(\zeta)-f(\zeta)|
<\eta
$$

である。従って円周上で

$$
|f_n-f|<|f|.
$$

[Rouché の定理](../CA4/index.md#thm-ca4-rouche)を $f$ と $f_n-f$ に適用すると、$f_n$ と $f$ は $D(a,r)$ 内に同じ個数の零点を重複度込みで持つ。$f$ は $a$ に位数 $m$ の零点を持ち、他には零点がないので、その個数は $m$ である。

最後の主張は背理法で従う。$f$ が恒等的0でなく零点 $a$ を持つなら、上で十分大きい $f_n$ は $a$ の近くに零点を持つ。これは全ての $f_n$ が零点を持たないという仮定に反する。$\square$
<!-- proof-end -->

### 直接例

$$
f_n(z)=z+\frac1n
$$

は $\mathbb C$ 上で $f(z)=z$ へ局所一様収束する。$f$ の0での零点は単純であり、$f_n$ の零点 $-1/n$ は実際に0へ近づく。

<a id="cor-ca7-injective-limit"></a>
<!-- formal-statement-start -->
### 系（単射正則関数列の非定数極限）

$\Omega\subset\mathbb C$ を領域とし、各 $f_n:\Omega\to\mathbb C$ を単射正則写像とする。$f_n\to f$ が $\Omega$ 上局所一様なら、$f$ は定数関数であるか、単射正則写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[正則関数列の局所一様極限](#thm-ca7-holomorphic-locally-uniform-limit)から $f$ は正則である。$f$ が非定数と仮定し、異なる $z_1,z_2\in\Omega$ で

$$
f(z_1)=f(z_2)
$$

となると仮定する。

関数

$$
g_n(z)=f_n(z)-f_n(z_1)
$$

は正則で、$f_n$ の単射性から零点を $z_1$ にしか持たない。また

$$
g_n\longrightarrow
g(z)=f(z)-f(z_1)
$$

は局所一様である。$f$ は非定数だから $g\not\equiv0$。しかし仮定から $g(z_2)=0$ である。

$z_2$ のまわりに $z_1$ を含まない小円板を取って [Hurwitz の定理](#thm-ca7-hurwitz)を適用すると、十分大きい $n$ で $g_n$ はその小円板内に零点を持たなければならない。これは $g_n$ の唯一の零点が $z_1$ であることに反する。

従って $f$ は単射である。$\square$
<!-- proof-end -->

この系が Riemann 写像定理で重要なのは、Montel で取った極限が「正則である」だけでは足りず、極値問題の候補であり続けるために**単射性まで保存する必要がある**からである。

---

## 6. 単連結領域では零点を持たない正則関数の平方根を取れる

Riemann 写像定理の標準証明では平方根を二回使う。一回目は候補族が空でないことを示すため、二回目は極値写像が円板全体を覆うことを示すためである。

<a id="lem-ca7-holomorphic-square-root"></a>
<!-- formal-statement-start -->
### 補題（零点を持たない正則関数の正則平方根）

$\Omega\subset\mathbb C$ を単連結領域とし、$h$ を $\Omega$ 上正則で零点を持たない関数とする。このとき $\Omega$ 上正則な関数 $q$ が存在して

$$
q(z)^2=h(z)
\qquad(z\in\Omega)
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$h'/h$ は $\Omega$ 上正則である。単連結性を使うのはここ一箇所であり、[単連結領域の Cauchy の定理](../CA2/index.md#thm-ca2-cauchy-simply-connected)により $h'/h$ の原始関数を取る。その指数関数の半分を使えば平方根ができる。

<!-- proof-start -->
### 証明

$h$ は零点を持たないので

$$
\frac{h'}h
$$

は $\Omega$ 上正則である。[単連結領域の Cauchy の定理](../CA2/index.md#thm-ca2-cauchy-simply-connected)と [経路独立性・原始関数の同値](../CA2/index.md#thm-ca2-path-independence-primitive)から、ある正則関数 $G$ が存在して

$$
G'=\frac{h'}h
$$

を満たす。

$$
H=he^{-G}
$$

と置くと

$$
H'
=
e^{-G}(h'-hG')
=
e^{-G}\left(h'-h\frac{h'}h\right)
=0.
$$

$\Omega$ は連結なので $H$ は定数 $c$ である。$h$ は零点を持たず $e^{-G}$ も0にならないから $c\ne0$。

複素数 $c$ の平方根 $d$ を一つ選び $d^2=c$ とする。

$$
q(z)=d\,e^{G(z)/2}
$$

と置けば $q$ は正則で、

$$
q(z)^2
=
c\,e^{G(z)}
=
h(z).
$$

これで求める平方根が得られた。$\square$
<!-- proof-end -->

**直接例**：$h(z)=e^z$ を $\mathbb C$ 上で取れば $q(z)=e^{z/2}$ である。一般の非零正則関数ではこのような式が最初から見えないが、$h'/h$ を積分することで同じ構造を作れる。

---

## 7. Riemann 写像定理の極値問題を準備する

$\mathbb D=\{w\in\mathbb C:|w|<1\}$ とする。$\Omega\subsetneq\mathbb C$ を空でない単連結領域、$a\in\Omega$ を固定する。

候補族を

$$
\mathcal S_a
=
\left\{
f:\Omega\to\mathbb D:
f\text{ は単射正則},\
f(a)=0,\
f'(a)>0
\right\}
$$

とする。最後の $f'(a)>0$ は「複素数 $f'(a)$ が正の実数」という意味であり、単位複素数を掛ける自由度を固定している。

まず、この族が空ではないことを証明しなければ極値問題を始められない。

<a id="lem-ca7-riemann-class-nonempty"></a>
<!-- formal-statement-start -->
### 補題（Riemann 写像候補族の非空性）

$\Omega\subsetneq\mathbb C$ を空でない単連結領域、$a\in\Omega$ とする。このとき、単射正則写像 $f:\Omega\to\mathbb D$ で

$$
f(a)=0,
\qquad
f'(a)>0
$$

を満たすものが存在する。従って $\mathcal S_a\ne\varnothing$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Omega$ が真部分領域なので $\alpha\notin\Omega$ を一つ取れる。$z-\alpha$ は零点を持たず、前補題で正則平方根 $g$ を取れる。平方根の二つの値 $g$ と $-g$ の像は交わらない。そのため $g(\Omega)$ はある円板を丸ごと避け、その円板を反転で無限遠側へ送ると有界な単射正則写像が得られる。

<!-- proof-start -->
### 証明

$\Omega\ne\mathbb C$ だから $\alpha\in\mathbb C\setminus\Omega$ を取る。

$$
h(z)=z-\alpha
$$

は $\Omega$ 上正則で零点を持たない。[正則平方根の補題](#lem-ca7-holomorphic-square-root)から、正則関数 $g$ が存在して

$$
g(z)^2=z-\alpha
$$

を満たす。

$g$ は単射である。実際

$$
g(z_1)=g(z_2)
$$

なら平方して $z_1-\alpha=z_2-\alpha$、従って $z_1=z_2$。

さらに

$$
g(\Omega)\cap(-g(\Omega))=\varnothing.
$$

もし $g(z_1)=-g(z_2)$ なら平方して $z_1=z_2$、そこから $g(z_1)=-g(z_1)$、すなわち $g(z_1)=0$ となるが、これは $z_1-\alpha=0$ と矛盾する。

$\beta=g(a)$ と置く。$\beta\ne0$ である。$-g(\Omega)$ は開集合で $-\beta\in-g(\Omega)$ だから、ある $\rho>0$ が存在して

$$
D(-\beta,\rho)\subset -g(\Omega).
$$

二つの像は交わらないので

$$
D(-\beta,\rho)\cap g(\Omega)=\varnothing.
$$

従って全ての $z\in\Omega$ について

$$
|g(z)+\beta|\ge\rho.
$$

そこで

$$
H(z)=\frac{\rho}{2(g(z)+\beta)}
$$

と置くと

$$
|H(z)|\le\frac12<1.
$$

$g(z)+\beta$ は0にならず、$g$ は単射なので $H$ も単射正則である。

$b=H(a)\in\mathbb D$ と置き、[円板の標準自己同型](../CA6/index.md#lem-ca6-standard-disk-automorphism)

$$
\phi_b(w)=\frac{w-b}{1-\overline b\,w}
$$

を合成する。

$$
F=\phi_b\circ H
$$

は単射正則写像 $\Omega\to\mathbb D$ で $F(a)=0$。

また $g^2=z-\alpha$ を微分すると

$$
2gg'=1,
$$

よって $g'(a)\ne0$。従って $H'(a)\ne0$、さらに $\phi_b'(b)\ne0$ なので $F'(a)\ne0$。

最後に $|F'(a)|/F'(a)$ の逆向きの単位複素数を掛け、ある $\lambda$、$|\lambda|=1$ を選んで

$$
f=\lambda F,
\qquad
f'(a)=|F'(a)|>0
$$

とすれば $f\in\mathcal S_a$ である。$\square$
<!-- proof-end -->

### 極値は有限である

$f\in\mathcal S_a$ なら $|f|<1$。$\overline{D(a,r)}\subset\Omega$ となる $r>0$ を取ると [Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)から

$$
0<f'(a)\le\frac1r.
$$

従って

$$
M=\sup_{f\in\mathcal S_a}f'(a)
$$

は正かつ有限である。

---

## 8. Riemann 写像定理

<a id="thm-ca7-riemann-mapping"></a>
<!-- formal-statement-start -->
### 定理（Riemann 写像定理）

$\Omega\subset\mathbb C$ を空でない単連結領域とし、$\Omega\ne\mathbb C$ とする。このとき $\Omega$ と単位円板 $\mathbb D$ の間に双正則写像が存在する。

さらに $a\in\Omega$ を固定すれば、

$$
f(a)=0,
\qquad
f'(a)>0
$$

を満たす双正則写像 $f:\Omega\to\mathbb D$ はただ一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

存在証明は二段階である。

1. $\mathcal S_a$ で $f'(a)$ を最大化する列を取る。全ての関数は $|f|<1$ で抑えられるため [Montel の定理](#thm-ca7-montel)で局所一様収束部分列を取り、導関数の収束と [Hurwitz の定理](#thm-ca7-hurwitz)から極値写像 $f$ を得る。
2. $f(\Omega)$ が $\mathbb D$ 全体でないと仮定し、抜けた点 $b$ を0へ移して正則平方根を取る。平方根は原点での微分を増やす変形を作り、極値性に矛盾する。

「単連結だから円板へ写せる」を一行で済ませるのではなく、単連結性が平方根の存在に、局所有界性が Montel に、局所一様収束が Hurwitz に、円板幾何が微分改善に使われる。

<!-- proof-start -->
### 証明

$a\in\Omega$ を固定し、前節の $\mathcal S_a$ と

$$
M=\sup_{f\in\mathcal S_a}f'(a)
$$

を考える。[候補族の非空性](#lem-ca7-riemann-class-nonempty)から $M>0$、[Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)から $M<\infty$ である。

#### 1. 極値写像を得る

$M$ の定義から、$f_n\in\mathcal S_a$ を

$$
f_n'(a)\longrightarrow M
$$

となるように選べる。

全ての $f_n$ は $\Omega$ 上で

$$
|f_n(z)|<1
$$

を満たすので、族 $\mathcal S_a$ は局所有界である。[Montel の定理](#thm-ca7-montel)により部分列を取り直し、

$$
f_n\longrightarrow f
$$

が $\Omega$ 上局所一様となるようにできる。

[正則関数列の局所一様極限](#thm-ca7-holomorphic-locally-uniform-limit)から $f$ は正則、[導関数列の局所一様収束](#cor-ca7-derivative-local-uniform-convergence)から

$$
f'(a)=\lim_{n\to\infty}f_n'(a)=M>0.
$$

また $f_n(a)=0$ だから $f(a)=0$。

各点で $|f(z)|\le1$ である。もしある $z_0\in\Omega$ で $|f(z_0)|=1$ なら、[最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)から $f$ は定数になる。しかし $f'(a)=M>0$ だから矛盾する。従って

$$
f(\Omega)\subset\mathbb D.
$$

さらに各 $f_n$ は単射で、$f$ は非定数だから [単射正則関数列の非定数極限](#cor-ca7-injective-limit)により $f$ は単射である。よって $f\in\mathcal S_a$ で

$$
f'(a)=M.
$$

極値は実際に達成された。

#### 2. 極値写像が全射でなければ微分を改善できる

反対に

$$
f(\Omega)\ne\mathbb D
$$

と仮定する。点

$$
b\in\mathbb D\setminus f(\Omega)
$$

を取る。$f(a)=0$ なので $b\ne0$ である。

[円板の標準自己同型](../CA6/index.md#lem-ca6-standard-disk-automorphism)

$$
\phi_b(w)=\frac{w-b}{1-\overline b\,w}
$$

を使い

$$
h=\phi_b\circ f
$$

と置く。$f(\Omega)\subset\mathbb D$、$\phi_b(\mathbb D)=\mathbb D$ なので

$$
h:\Omega\to\mathbb D.
$$

また $\phi_b(w)=0$ は $w=b$ と同値だが $b\notin f(\Omega)$ だから、$h$ は零点を持たない。

$\Omega$ は単連結なので [正則平方根の補題](#lem-ca7-holomorphic-square-root)から正則関数 $q$ が存在して

$$
q^2=h.
$$

$|h|<1$ なので

$$
|q|^2=|h|<1,
$$

従って $q:\Omega\to\mathbb D$。

$q$ は単射である。実際 $q(z_1)=q(z_2)$ なら平方して $h(z_1)=h(z_2)$。$\phi_b$ と $f$ はともに単射なので $z_1=z_2$。

$c=q(a)$ と置く。$f(a)=0$ だから

$$
c^2
=
h(a)
=
\phi_b(0)
=
-b.
$$

従って

$$
|c|=\sqrt{|b|}.
$$

さらに

$$
\psi=\phi_c\circ q
$$

と置けば、$\psi:\Omega\to\mathbb D$ は単射正則で

$$
\psi(a)=0.
$$

$\psi'(a)$ の大きさを計算する。まず

$$
\phi_b'(w)
=
\frac{1-|b|^2}{(1-\overline b\,w)^2},
$$

だから

$$
\phi_b'(0)=1-|b|^2.
$$

$q^2=\phi_b\circ f$ を $a$ で微分すると

$$
2c\,q'(a)
=
(1-|b|^2)f'(a).
$$

よって

$$
|q'(a)|
=
\frac{1-|b|^2}{2\sqrt{|b|}}\,M.
$$

一方

$$
|\phi_c'(c)|
=
\frac1{1-|c|^2}
=
\frac1{1-|b|}.
$$

従って

$$
|\psi'(a)|
=
\frac{1+|b|}{2\sqrt{|b|}}\,M.
$$

$0<|b|<1$ なので

$$
(1+|b|)^2-4|b|
=
(1-|b|)^2>0,
$$

従って

$$
\frac{1+|b|}{2\sqrt{|b|}}>1.
$$

したがって

$$
|\psi'(a)|>M.
$$

単位複素数を掛けて導関数を正の実数に向ければ、$\psi$ から $\mathcal S_a$ の元 $\widetilde\psi$ を作れて

$$
\widetilde\psi'(a)=|\psi'(a)|>M.
$$

これは $M$ が $\mathcal S_a$ 上の上限であることに矛盾する。

従って $f(\Omega)=\mathbb D$。$f$ は全単射正則写像である。

#### 3. 逆写像も正則

まず単射正則写像 $f$ の導関数は消えないことを、この章までの道具だけで示す。反対に $f'(z_0)=0$ とする。

$$
g(z)=f(z)-f(z_0)
$$

と置く。$f$ は単射だから非定数であり、[零点孤立性・恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)から $z_0$ は $g$ の孤立零点である。$f'(z_0)=0$ なのでその位数を $m$ とすれば $m\ge2$。

十分小さい $r>0$ を選び、

$$
\overline{D(z_0,r)}\subset\Omega
$$

かつ $g$ がこの閉円板内で $z_0$ 以外に零点を持たないようにする。境界上では

$$
\eta
=
\min_{|z-z_0|=r}|g(z)|
>0.
$$

$|w|<\eta$ を満たす任意の $w\in\mathbb C$ に対して、境界上で

$$
|w|<|g(z)|.
$$

従って [Rouché の定理](../CA4/index.md#thm-ca4-rouche)から $g-w$ は $D(z_0,r)$ 内に重複度込みで $m$ 個の零点を持つ。

一方 $f$ は単射なので方程式 $g(z)=w$ は高々一つの解しか持たない。従って存在する唯一の解は重複度 $m\ge2$ を持ち、その点で

$$
f'(z)=g'(z)=0.
$$

特に開集合

$$
U
=
\{z\in D(z_0,r):|g(z)|<\eta\}
$$

の全ての点で $f'(z)=0$ である。$z_0$ を含む $U$ の連結成分上で [導関数0なら定数](../CA1/index.md#lem-ca1-zero-derivative-constant)を使うと $f$ は定数となり、単射性に反する。よって

$$
f'(z)\ne0
\qquad(z\in\Omega).
$$

次に $f$ は非定数正則関数だから [開写像定理](../CA3/index.md#thm-ca3-open-mapping)により開写像である。全単射な開写像の逆写像は連続なので $f^{-1}:\mathbb D\to\Omega$ は連続である。

$w_0=f(z_0)$ とし、$w\to w_0$ のとき $z=f^{-1}(w)$ と置く。逆写像の連続性から $z\to z_0$ であり、

$$
\frac{f^{-1}(w)-f^{-1}(w_0)}{w-w_0}
=
\frac{z-z_0}{f(z)-f(z_0)}
\longrightarrow
\frac1{f'(z_0)}.
$$

従って $f^{-1}$ は各 $w_0\in\mathbb D$ で複素微分可能、すなわち正則である。よって $f$ は双正則である。$\square$
<!-- proof-end -->

### 具体例1：上半平面

上半平面

$$
\mathbb H=\{z:\operatorname{Im}z>0\}
$$

では [Riemann 写像定理](#thm-ca7-riemann-mapping)を使うまでもなく、CA6 で計算した

$$
C(z)=\frac{z-i}{z+i}
$$

が $\mathbb H\to\mathbb D$ の双正則写像である。

### 具体例2：帯領域

$$
S=\{z:0<\operatorname{Im}z<\pi\}
$$

を考える。指数関数 $w=e^z$ は $S$ を $\mathbb H$ へ写す。$z_1,z_2\in S$ で $e^{z_1}=e^{z_2}$ なら

$$
z_1-z_2=2\pi i k
$$

だが虚部差は絶対値が $\pi$ 未満なので $k=0$、従って $z_1=z_2$。よって $e^z$ は $S\to\mathbb H$ の双正則写像であり、

$$
z
\longmapsto
\frac{e^z-i}{e^z+i}
$$

が $S\to\mathbb D$ の具体的 Riemann 写像を与える。

### なぜ $\Omega=\mathbb C$ を除くのか

$\mathbb C$ と $\mathbb D$ が双正則だと仮定すると、その逆写像 $\mathbb D\to\mathbb C$ ではなく、写像 $F:\mathbb C\to\mathbb D$ 自体が有界整関数になる。[Liouville の定理](../CA3/index.md#thm-ca3-liouville)から $F$ は定数で、全単射になれない。従って「真部分領域」は本質的な仮定である。

<a id="cor-ca7-normalized-riemann-uniqueness"></a>
<!-- formal-statement-start -->
### 系（正規化 Riemann 写像の一意性）

$\Omega\subsetneq\mathbb C$ を空でない単連結領域、$a\in\Omega$ とする。$f,g:\Omega\to\mathbb D$ が双正則写像で

$$
f(a)=g(a)=0,
\qquad
f'(a)>0,\quad g'(a)>0
$$

を満たすなら

$$
f=g
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
H=g\circ f^{-1}:\mathbb D\to\mathbb D
$$

は円板自己同型で $H(0)=0$。[Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)を $H$ と $H^{-1}$ に適用するか、[円板自己同型の分類](../CA6/index.md#cor-ca6-disk-automorphism-classification)を使うと

$$
H(w)=e^{i\theta}w
$$

となる。

一方、連鎖律から

$$
H'(0)=\frac{g'(a)}{f'(a)}.
$$

右辺は正の実数で、左辺は $e^{i\theta}$ かつ絶対値1だから

$$
H'(0)=1.
$$

従って $H$ は恒等写像で $g=f$。$\square$
<!-- proof-end -->

基点 $a$ だけを固定して導関数の偏角を固定しなければ、$e^{i\theta}f$ という単位複素数を掛ける自由度が残る。正規化条件は存在のためではなく**一意性のため**に働く。

---

## 9. Morera の定理と Schwarz の鏡像原理

Riemann 写像定理とは別に、局所一様極限の考え方は「境界を越えて正則性を貼る」問題にも現れる。鏡像原理の正則性判定に使う最小限の Morera の定理をここで証明する。

<a id="lem-ca7-morera"></a>
<!-- formal-statement-start -->
### 補題（Morera の定理）

$\Omega\subset\mathbb C$ を領域とし、$F:\Omega\to\mathbb C$ を連続関数とする。閉三角形 $T$ が $\Omega$ に含まれるたびに、その正向き境界 $\partial T$ について

$$
\int_{\partial T}F(z)\,dz=0
$$

が成り立つなら、$F$ は $\Omega$ 上正則である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a\in\Omega$ を任意に取る。ある $R>0$ を選んで

$$
D(a,R)\subset\Omega
$$

とする。円板は凸である。

$a$ を基点として

$$
G(z)=\int_{[a,z]}F(\zeta)\,d\zeta
$$

と定める。ここで $[a,z]$ は $a$ から $z$ への線分である。

$z,w\in D(a,R)$ に対し、三角形 $(a,z,w)$ は円板内にある。仮定からその境界積分は0なので

$$
G(w)-G(z)
=
\int_{[z,w]}F(\zeta)\,d\zeta.
$$

$w=z+h$ とし、線分を $\zeta=z+th$、$0\le t\le1$ と媒介すると

$$
\frac{G(z+h)-G(z)}h
=
\int_0^1F(z+th)\,dt.
$$

$F$ は連続だから $h\to0$ で右辺は $F(z)$ へ収束する。従って

$$
G'(z)=F(z).
$$

$G$ は正則であり、正則関数の導関数も [Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives)により正則だから $F=G'$ は $D(a,R)$ 上正則である。

$a$ は任意なので $F$ は $\Omega$ 上正則である。$\square$
<!-- proof-end -->

<a id="thm-ca7-schwarz-reflection"></a>
<!-- formal-statement-start -->
### 定理（Schwarz の鏡像原理）

$\Omega\subset\mathbb C$ を複素共役について対称な領域、すなわち

$$
z\in\Omega
\Longrightarrow
\overline z\in\Omega
$$

を満たす領域とする。

$$
\Omega^+=\{z\in\Omega:\operatorname{Im}z>0\},
\qquad
I=\Omega\cap\mathbb R
$$

と置く。$f$ が $\Omega^+$ 上正則で $\Omega^+\cup I$ 上連続、かつ

$$
f(x)\in\mathbb R
\qquad(x\in I)
$$

を満たすとする。このとき

$$
F(z)=
\begin{cases}
f(z), & \operatorname{Im}z\ge0,\\
\overline{f(\overline z)}, & \operatorname{Im}z<0
\end{cases}
$$

で定めた $F$ は $\Omega$ 上正則であり、$f$ の鏡像延長を与える。
<!-- formal-statement-end -->

### 証明の見取り図

下半平面側では共役を二回使うため正則性が保たれる。実軸上では $f(x)$ が実数であることにより上側と下側の値が一致して連続になる。残る問題は実軸をまたぐ点での正則性であり、三角形を上半分・下半分へ切り、境界積分が0であることを示して [Morera の定理](#lem-ca7-morera)を使う。

<!-- proof-start -->
### 証明

まず $\operatorname{Im}z<0$ で

$$
F(z)=\overline{f(\overline z)}
$$

は正則である。実際 $z_0$ を下半平面側に取り、$h\to0$ とすると

$$
\frac{F(z_0+h)-F(z_0)}h
=
\overline{
\frac{
f(\overline{z_0}+\overline h)-f(\overline{z_0})
}{
\overline h
}
}
\longrightarrow
\overline{f'(\overline{z_0})}.
$$

従って導関数が存在する。

次に $x\in I$ では $f(x)\in\mathbb R$ だから

$$
\overline{f(x)}=f(x).
$$

$f$ の上半側からの連続性と共役の連続性により、$F$ は実軸をまたいでも連続である。

[Morera の定理](#lem-ca7-morera)を適用するため、閉三角形 $T\subset\Omega$ を取る。$T$ が実軸の片側だけにあれば、$F$ はその近傍で正則だから [Cauchy--Goursat](../CA2/index.md#thm-ca2-goursat-triangle)により

$$
\int_{\partial T}F(z)\,dz=0.
$$

$T$ が実軸を横切る場合、$T$ を上側部分と下側部分へ切る。上側部分について、実軸から高さ $\varepsilon>0$ だけ離れた多角形へ切り詰めると、その閉包の近傍で $f$ は正則なので、三角形分割と [Cauchy--Goursat](../CA2/index.md#thm-ca2-goursat-triangle)から境界積分は0である。$\varepsilon\downarrow0$ とすると、$F$ の連続性により境界積分は実軸を含む上側部分の境界積分へ収束する。従って上側部分でも境界積分は0である。

下側部分も同様である。二つの境界積分を加えると、共有する実軸上の線分は逆向きに一度ずつ現れて相殺する。従って元の三角形について

$$
\int_{\partial T}F(z)\,dz=0.
$$

全ての閉三角形で成り立つので [Morera の定理](#lem-ca7-morera)から $F$ は $\Omega$ 上正則である。$\square$
<!-- proof-end -->

### 例：上半円板からの延長

上半円板で正則な $f$ が直径 $(-1,1)$ 上で実数値を取るなら、下半円板側を

$$
F(z)=\overline{f(\overline z)}
$$

で定めて単位円板全体へ正則に延長できる。境界値が実数でない場合には上側と下側の値が実軸上で一致せず、まず連続性が壊れる。鏡像原理で「実数値」という仮定が必要なのはこの貼り合わせのためである。

---

## 10. 演習

### Level A

<a id="ex-ca7-a01"></a>
#### CA7-A01 $z^n$ はどこで一様収束するか
- Level: A

$f_n(z)=z^n$ を単位円板 $\mathbb D$ 上で考える。

1. $f_n\to0$ が $\mathbb D$ 上局所一様であることを示せ。
2. $\mathbb D$ 全体では0へ一様収束しないことを示せ。
3. 閉単位円板 $\overline{\mathbb D}$ 上でも0へ一様収束しないことを示せ。

<!-- solution-start -->
**解答**：

1. コンパクト集合 $K\subset\mathbb D$ を任意に取る。連続関数 $|z|$ は $K$ 上最大値
   $$
   r=\max_{z\in K}|z|
   $$
   を持つ。$K\subset\mathbb D$ だから $r<1$。従って
   $$
   \sup_{z\in K}|f_n(z)|
   \le r^n\longrightarrow0.
   $$
   よって局所一様収束する。

2. $\mathbb D$ では各 $n$ について
   $$
   \sup_{|z|<1}|z|^n=1.
   $$
   最大値1は内部では達成しないが、$|z|$ を1へ近づければ任意に1へ近づく。従って上限は0へ行かず、一様収束しない。

3. $\overline{\mathbb D}$ では $z=1$ で
   $$
   f_n(1)=1
   $$
   だから、各点収束すら0にはならない。

局所一様収束は「各コンパクト集合が境界から正の距離を持つ」ことを使っている。
<!-- solution-end -->

<a id="ex-ca7-a02"></a>
#### CA7-A02 Cauchy 積分から導関数列を評価する
- Level: A

$\overline{D(0,2)}\subset\Omega$ とし、$f_n,f$ は $\Omega$ 上正則で

$$
\sup_{|z|=2}|f_n(z)-f(z)|\le\varepsilon_n,
\qquad
\varepsilon_n\to0
$$

とする。$|z|\le1$ に対して

$$
|f_n'(z)-f'(z)|
\le
2\varepsilon_n
$$

を示せ。

<!-- solution-start -->
**解答**：[Cauchy 高階導関数公式](../CA3/index.md#thm-ca3-cauchy-derivatives)を半径2の円へ適用すると

$$
f_n'(z)-f'(z)
=
\frac1{2\pi i}
\int_{|\zeta|=2}
\frac{f_n(\zeta)-f(\zeta)}
{(\zeta-z)^2}\,d\zeta.
$$

$|\zeta|=2$、$|z|\le1$ なら

$$
|\zeta-z|\ge2-1=1.
$$

円周長は $4\pi$ なので

$$
\begin{aligned}
|f_n'(z)-f'(z)|
&\le
\frac1{2\pi}
(4\pi)
\frac{\varepsilon_n}{1^2}\\
&=2\varepsilon_n.
\end{aligned}
$$

右辺は $z$ に依存しないから、$|z|\le1$ 上で導関数列は一様収束する。
<!-- solution-end -->

<a id="ex-ca7-a03"></a>
#### CA7-A03 幾何級数の正規収束と微分
- Level: A

単位円板で

$$
\sum_{n=0}^{\infty}z^n
$$

が正規収束することを定義から示し、微分と無限和を交換して

$$
\sum_{n=1}^{\infty}n z^{n-1}
=
\frac1{(1-z)^2}
$$

を導け。

<!-- solution-start -->
**解答**：コンパクト集合 $K\subset\mathbb D$ に対し

$$
r=\max_{z\in K}|z|<1.
$$

従って

$$
\sum_{n=0}^{\infty}
\sup_{z\in K}|z^n|
\le
\sum_{n=0}^{\infty}r^n
=
\frac1{1-r}<\infty.
$$

よって [正規収束の定義](#def-ca7-normal-convergence)を満たす。

有限和列の極限は幾何級数から

$$
\sum_{n=0}^{\infty}z^n
=
\frac1{1-z}.
$$

[正規収束する正則関数級数と微分の交換](#cor-ca7-normal-series-termwise-differentiation)を適用すると

$$
\sum_{n=1}^{\infty}n z^{n-1}
=
\left(\frac1{1-z}\right)'
=
\frac1{(1-z)^2}.
$$

微分と無限和の交換を許しているのは単なる各点収束ではなく、正規収束から得られる局所一様収束である。
<!-- solution-end -->

<a id="ex-ca7-a04"></a>
#### CA7-A04 正規化 Riemann 写像の一意性
- Level: A

$\Omega\subsetneq\mathbb C$ を単連結領域、$a\in\Omega$ とする。$f,g:\Omega\to\mathbb D$ が双正則で

$$
f(a)=g(a)=0,
\qquad
f'(a)>0,\quad g'(a)>0
$$

を満たすとする。[Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)を使って $f=g$ を示せ。

<!-- solution-start -->
**解答**：

$$
H=g\circ f^{-1}
$$

と置く。$H$ は円板自己同型で $H(0)=0$。

[Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)から

$$
|H(w)|\le|w|.
$$

$H^{-1}$ も原点を固定する円板自己同型だから

$$
|H^{-1}(u)|\le|u|.
$$

$u=H(w)$ と置けば

$$
|w|\le|H(w)|.
$$

従って $|H(w)|=|w|$。[Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)の等号条件から

$$
H(w)=e^{i\theta}w.
$$

連鎖律により

$$
e^{i\theta}
=
H'(0)
=
\frac{g'(a)}{f'(a)}.
$$

右辺は正の実数、左辺の絶対値は1なので $e^{i\theta}=1$。従って $H$ は恒等写像で

$$
\boxed{f=g}.
$$
<!-- solution-end -->

### Level B

<a id="ex-ca7-b01"></a>
#### CA7-B01 円板自己写像列から部分列を取る
- Level: B

各 $n$ について $f_n:\mathbb D\to\mathbb D$ を正則とする。

1. $(f_n)$ が局所一様収束部分列を持つことを示せ。
2. その部分列を $(f_{n_j})$、極限を $f$ とするとき、$f_{n_j}'\to f'$ も局所一様であることを示せ。
3. 極限 $f$ が $\mathbb D$ に値を取るか、単位円周上の定数関数であることを示せ。

<!-- solution-start -->
**解答**：

1. 全ての $n,z$ について
   $$
   |f_n(z)|<1.
   $$
   従って族 $\{f_n:n\ge1\}$ は局所有界である。[Montel の定理](#thm-ca7-montel)から局所一様収束部分列 $(f_{n_j})$ が存在する。

2. [導関数列の局所一様収束](#cor-ca7-derivative-local-uniform-convergence)をその部分列へ適用すれば
   $$
   f_{n_j}'\to f'
   $$
   が局所一様に成り立つ。

3. 各点 $z$ で極限を取ると $|f(z)|\le1$。もしある $z_0$ で $|f(z_0)|=1$ なら、$|f|\le1$ の最大値を内部で達成するので [最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)から $f$ は定数である。その定数の絶対値は1。そうでなければ全点で $|f(z)|<1$、すなわち $f(\mathbb D)\subset\mathbb D$ である。

Montel の定理だけでは「極限も円板内」とは言わず、境界値に張り付く定数極限の可能性を最大値原理で分離する必要がある。
<!-- solution-end -->

<a id="ex-ca7-b02"></a>
#### CA7-B02 零点を持たない関数列の極限
- Level: B

$\Omega$ を領域とし、$f_n$ を $\Omega$ 上正則で零点を持たない関数とする。$f_n\to f$ が局所一様なら

$$
f\equiv0
$$

または $f$ も $\Omega$ 上零点を持たないことを示せ。また

$$
f_n(z)=z+\frac1n
$$

がこの主張の「零点を持たない」という仮定を満たさないことを確認し、極限 $z$ の零点がどこから来るか説明せよ。

<!-- solution-start -->
**解答**：前半は [Hurwitz の定理](#thm-ca7-hurwitz)の特別な場合である。

$f\not\equiv0$ と仮定する。もし $f(a)=0$ なら、[Hurwitz の定理](#thm-ca7-hurwitz)により $a$ の十分小さい近傍で、十分大きい $n$ の $f_n$ が零点を持つ。これは各 $f_n$ が零点を持たないという仮定に反する。従って $f$ は零点を持たない。

後半では

$$
f_n(z)=z+\frac1n
$$

は

$$
z=-\frac1n
$$

に単純零点を持つので、前半の仮定を満たさない。極限は $f(z)=z$ で、その零点0は

$$
-\frac1n\longrightarrow0
$$

と近づいてきた零点の極限である。Hurwitz の定理はまさにこの「零点が局所的に近傍ごとに追える」ことを一般に保証する。
<!-- solution-end -->

<a id="ex-ca7-b03"></a>
#### CA7-B03 Schwarz の鏡像原理で多項式を復元する
- Level: B

上半円板

$$
D^+=\{z:|z|<1,\ \operatorname{Im}z>0\}
$$

上で

$$
f(z)=z^2+1
$$

を考える。

1. $(-1,1)$ 上の境界値が実数であることを確認せよ。
2. [Schwarz の鏡像原理](#thm-ca7-schwarz-reflection)による下半円板側の延長が
   $$
   F(z)=z^2+1
   $$
   そのものになることを直接計算せよ。
3. 境界値が $f(x)=x^2+i$ だったと仮定して同じ貼り合わせをすると、なぜ実軸上で連続性が壊れるか説明せよ。

<!-- solution-start -->
**解答**：

1. 実数 $x\in(-1,1)$ に対し
   $$
   f(x)=x^2+1\in\mathbb R.
   $$

2. $\operatorname{Im}z<0$ では鏡像延長は
   $$
   \overline{f(\overline z)}
   =
   \overline{(\overline z)^2+1}
   =
   z^2+1.
   $$
   従って上半円板・実軸・下半円板の全てで同じ多項式になり、単位円板全体へ正則に延長される。

3. もし上側境界値が $x^2+i$ なら、下側からの鏡像値は
   $$
   \overline{x^2+i}=x^2-i.
   $$
   上側極限と下側極限が一致しないため、貼り合わせた関数は実軸上で連続ですらない。[Morera の定理](#lem-ca7-morera)を使う前提が失われる。これが「境界値が実数」という仮定の役割である。
<!-- solution-end -->

### Level C

<a id="ex-ca7-c01"></a>
#### CA7-C01 Riemann 写像定理の極値証明を再構成する
- Level: C

$\Omega\subsetneq\mathbb C$ を空でない単連結領域、$a\in\Omega$ とする。

$$
\mathcal S_a
=
\left\{
f:\Omega\to\mathbb D:
f\text{ は単射正則},\
f(a)=0,\
f'(a)>0
\right\}
$$

と置く。次を順に示し、$\Omega$ が $\mathbb D$ と双正則であることを導け。

1. $\mathcal S_a\ne\varnothing$。
2. $M=\sup_{f\in\mathcal S_a}f'(a)$ は $0<M<\infty$。
3. $f_n'(a)\to M$ となる $f_n\in\mathcal S_a$ から、$f'(a)=M$ となる $f\in\mathcal S_a$ を得られる。
4. $f(\Omega)\ne\mathbb D$ と仮定し、$b\in\mathbb D\setminus f(\Omega)$ を取る。$\phi_b\circ f$ の正則平方根を使って $\mathcal S_a$ の別の元 $\widetilde f$ を作り、
   $$
   \widetilde f'(a)>M
   $$
   を導いて矛盾せよ。

<!-- solution-start -->
**解答**：

**1. 候補族の非空性。**

$\alpha\notin\Omega$ を一つ取る。$z-\alpha$ は零点を持たないので [正則平方根の補題](#lem-ca7-holomorphic-square-root)により

$$
g(z)^2=z-\alpha
$$

となる正則関数 $g$ がある。

$g$ は単射であり、さらに $g(\Omega)\cap(-g(\Omega))=\varnothing$。$\beta=g(a)$ とすると $-\beta\in-g(\Omega)$ だから、ある $\rho>0$ で

$$
D(-\beta,\rho)\subset-g(\Omega).
$$

従って

$$
H(z)=\frac{\rho}{2(g(z)+\beta)}
$$

は単射正則で $|H|\le1/2$。$H(a)$ を0へ送る円板自己同型を合成し、最後に単位複素数を掛けて導関数を正の実数へ向ければ $\mathcal S_a$ の元を得る。

**2. 上限の有限性。**

1から $M>0$。また $\overline{D(a,r)}\subset\Omega$ となる $r>0$ を選ぶ。任意の $f\in\mathcal S_a$ は $|f|<1$ だから [Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)で

$$
f'(a)=|f'(a)|\le\frac1r.
$$

従って $M\le1/r<\infty$。

**3. 極値写像の存在。**

$f_n'(a)\to M$ となる $f_n\in\mathcal S_a$ を取る。$|f_n|<1$ なので局所有界であり、[Montel の定理](#thm-ca7-montel)により部分列を取って

$$
f_n\to f
$$

を局所一様にできる。

[導関数列の局所一様収束](#cor-ca7-derivative-local-uniform-convergence)から

$$
f'(a)=M>0.
$$

従って $f$ は非定数。各点で $|f|\le1$ だが、もし内部で $|f|=1$ なら [最大値原理](../CA3/index.md#thm-ca3-maximum-modulus)で定数になってしまう。よって $f(\Omega)\subset\mathbb D$。

さらに [単射正則関数列の非定数極限](#cor-ca7-injective-limit)により $f$ は単射。従って $f\in\mathcal S_a$ で $f'(a)=M$。

**4. 全射性。**

$f(\Omega)\ne\mathbb D$ と仮定し

$$
b\in\mathbb D\setminus f(\Omega)
$$

を取る。$b\ne0$。

$$
h=\phi_b\circ f,
\qquad
\phi_b(w)=\frac{w-b}{1-\overline b\,w}
$$

と置けば $h:\Omega\to\mathbb D$ は零点を持たない。正則平方根 $q$ を取り

$$
q^2=h.
$$

すると $|q|<1$ かつ $q$ は単射。$c=q(a)$ とすれば

$$
c^2=-b,
\qquad
|c|=\sqrt{|b|}.
$$

$$
\psi=\phi_c\circ q
$$

は単射正則で $\psi(a)=0$。

微分を計算する。

$$
\phi_b'(0)=1-|b|^2,
$$

また $q^2=\phi_b\circ f$ から

$$
2c\,q'(a)=(1-|b|^2)M,
$$

従って

$$
|q'(a)|
=
\frac{1-|b|^2}{2\sqrt{|b|}}M.
$$

さらに

$$
|\phi_c'(c)|
=
\frac1{1-|c|^2}
=
\frac1{1-|b|}.
$$

従って

$$
|\psi'(a)|
=
\frac{1+|b|}{2\sqrt{|b|}}M.
$$

$0<|b|<1$ なので

$$
\frac{1+|b|}{2\sqrt{|b|}}>1.
$$

単位複素数を掛けて $\psi'(a)$ を正の実数へ向ければ $\widetilde f\in\mathcal S_a$ で

$$
\widetilde f'(a)
=
|\psi'(a)|
>M.
$$

これは $M$ の定義に矛盾する。従って $f(\Omega)=\mathbb D$。

$f$ は全単射正則であり、単射正則写像の導関数は消えないから局所逆関数定理により $f^{-1}$ も正則である。従って $\Omega$ と $\mathbb D$ は双正則である。

この証明で各道具の役割は分離されている。単連結性は正則平方根を作り、[Cauchy 評価](../CA3/index.md#thm-ca3-cauchy-estimate)は極値の有限性を与え、[Montel の定理](#thm-ca7-montel)は極値列から極限を取り、[Hurwitz の定理](#thm-ca7-hurwitz)は単射性を極限へ移し、平方根と円板自己同型が極値を改善して全射性を強制する。
<!-- solution-end -->

---

## 11. 章末チェック

- 局所一様収束を「各点収束より少し強い」とだけ説明せず、Cauchy 積分公式を極限と交換できる条件として使った。
- 正則関数列の局所一様極限が正則であることを Cauchy 積分表示から証明し、同じ境界評価で全階導関数の局所一様収束まで導いた。
- 正規収束は任意のコンパクト集合上の上限級数で定義し、幾何級数で条件を直接確認した。
- Montel の定理では一般 Arzelà--Ascoli の定理を黒箱にせず、Cauchy 評価、有限近似点集合、稠密点上の対角抽出、コンパクト exhaustion を順に証明した。
- Hurwitz の定理では極限が恒等的0になる例外を明示し、Rouché の定理が零点重複度を保存する機構を示した。
- 単射正則関数列の極限では、定数極限だけを例外として分離し、Hurwitz を差関数へ適用して単射性を保存した。
- Riemann 写像候補族の非空性では、単連結性から $z-\alpha$ の正則平方根を作り、平方根像とその符号反転像が交わらないことから有界単射写像を具体的に構成した。
- Riemann 写像定理では Montel による極値達成と、抜けた点に対する平方根変形による微分改善を両方計算し、全射性まで閉じた。
- 正規化条件 $f(a)=0$, $f'(a)>0$ が単位複素数を掛ける自由度を除き、一意性を与えることを [Schwarz の補題](../CA6/index.md#thm-ca6-schwarz-lemma)から示した。
- Schwarz の鏡像原理では実数境界値が連続な貼り合わせを保証し、Morera の定理で実軸を越えた正則性を確認した。
- Riemann 面・一様化定理・Runge 近似・Picard の定理は使用していない。これらは後続章または将来の拡張へ送る。
