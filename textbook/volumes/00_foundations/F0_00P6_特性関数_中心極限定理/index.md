# F0-00P6 特性関数・Lévy連続性定理

特性関数

$$
\varphi_X(t)=E[e^{itX}]
$$

は全ての確率分布について存在し、独立和を積へ変えます。さらに特性関数は分布を一意に決め、特性関数の各点収束から分布収束を導けます。

この章では後者を「そういう定理」として置かず、Gaussian smoothingを使って証明します。

> **章名について**  
> このページのURLには過去互換のため「特性関数_中心極限定理」という旧slugが残っていますが、本章の正本タイトルは **「特性関数・Lévy連続性定理」** です。中心極限定理そのものの証明は次章 [F0-00P6A 独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) で行います。本章は、その証明で使う特性関数の一意性・二次展開・Lévy連続性定理を閉じる章です。

```text
characteristic function
  ↓
Gaussian Fourier identity
  ↓
Gaussian convolutionで滑らかな密度を作る
  ↓
特性関数の一意性
  ↓
Scheffe + Gaussian smoothing
  ↓
bounded Lipschitz test functions
  ↓
Lévy continuity theorem
  ↓
iid CLTの最後の一手
```

---

## 1. 特性関数

<a id="def-f0-00p6-characteristic-function"></a>

<!-- formal-statement-start -->
> **定義（特性関数）**  
> 実確率変数 $X$ の特性関数を

$$
\boxed{
\varphi_X(t):=E[e^{itX}]
}
\qquad(t\in\mathbb R)
$$

> と定義します。
<!-- formal-statement-end -->

### 1.1 例：Bernoulli分布

$X\sim\operatorname{Bernoulli}(p)$ とします。

<!-- definition-example-start: def-f0-00p6-characteristic-function -->
**定義の確認**  
$X$ は0と1だけを取るので、定義へ直接代入して

$$
\varphi_X(t)
=(1-p)e^{it\cdot0}+pe^{it\cdot1}
=1-p+pe^{it}.
$$

特性関数は複素数値ですが、期待値自体は常に存在します。
<!-- definition-example-end -->

実際

$$
|e^{itX}|=1
$$

なので

$$
|\varphi_X(t)|\le1.
$$

moment generating functionと違い、重いtailを持つ分布でも発散しません。

---

<a id="prop-f0-00p6-basic-properties"></a>

## 2. 特性関数の基本性質

<!-- formal-statement-start -->
> **命題（特性関数の基本性質）**  
> 任意の実確率変数 $X$ について

$$
\varphi_X(0)=1,
\qquad
|\varphi_X(t)|\le1,
$$

> 特性関数 $\varphi_X$ は $\mathbb R$ 上で連続です。また定数 $a,b$ に対し

$$
\varphi_{aX+b}(t)=e^{itb}\varphi_X(at).
$$

> さらに $X,Y$ が独立なら

$$
\boxed{
\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：絶対値1と独立性を使う

最初の二式は定義と $|e^{itX}|=1$ から従います。

$t_n\to t$ とすると

$$
e^{it_nX}\to e^{itX}
\qquad\text{a.s.}
$$

かつ絶対値は常に1なので、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\varphi_X(t_n)\to\varphi_X(t).
$$

従って連続です。

アフィン変換については

$$
\begin{aligned}
\varphi_{aX+b}(t)
&=E[e^{it(aX+b)}]\\
&=e^{itb}E[e^{i(at)X}]\\
&=e^{itb}\varphi_X(at).
\end{aligned}
$$

独立な $X,Y$ については、$e^{itX}$ と $e^{itY}$ も独立なので

$$
\begin{aligned}
\varphi_{X+Y}(t)
&=E[e^{itX}e^{itY}]\\
&=E[e^{itX}]E[e^{itY}]\\
&=\varphi_X(t)\varphi_Y(t).
\end{aligned}
$$
<!-- proof-end -->

独立和が積へ変わることが、中心極限定理で特性関数を使う最大の理由です。

---

## 3. 分布収束

<a id="def-f0-00p6-distribution-convergence"></a>

<!-- formal-statement-start -->
> **定義（分布収束）**  
> $X_n,X$ の分布関数をそれぞれ $F_n,F$ とします。$F$ の全ての連続点 $x$ で

$$
\boxed{F_n(x)\to F(x)}
$$

> が成り立つとき、$X_n$ は $X$ へ分布収束するといい

$$
X_n\xrightarrow{d}X
\quad\text{または}\quad
X_n\Rightarrow X
$$

> と書きます。
<!-- formal-statement-end -->

### 3.1 例：定数 $1/n$ は0へ分布収束する

$X_n\equiv1/n$, $X\equiv0$ とします。

<!-- definition-example-start: def-f0-00p6-distribution-convergence -->
**定義の確認**  
$X$ の分布関数は $x<0$ で0、$x\ge0$ で1であり、唯一の不連続点は0です。$x<0$ なら十分大きい $n$ で $F_n(x)=0=F(x)$、$x>0$ なら十分大きい $n$ で $1/n\le x$ なので $F_n(x)=1=F(x)$ です。従って全ての連続点で収束し、$X_n\Rightarrow0$ です。
<!-- definition-example-end -->

---

<a id="thm-f0-00p6-bl-characterization"></a>

## 4. bounded Lipschitz関数で分布収束を判定できる

<!-- formal-statement-start -->
> **定理（bounded Lipschitz testによる分布収束の特徴付け）**  
> 実確率変数列 $X_n$ と $X$ について、次は同値です。

> 1. $X_n\Rightarrow X$。
> 2. 任意の有界Lipschitz関数 $h:\mathbb R\to\mathbb R$ に対して

$$
\boxed{E[h(X_n)]\to E[h(X)]}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：CDFからstep近似し、逆向きはLipschitz cutoffで挟む

#### Step 1：分布収束ならbounded Lipschitz期待値が収束する

$h$ を有界Lipschitzとし

$$
\|h\|_\infty\le M,
\qquad
|h(x)-h(y)|\le L|x-y|
$$

とします。$\eta>0$ を固定します。

分布関数 $F$ の不連続点は高々可算個なので、$R>0$ を十分大きく、かつ $\pm R$ が $F$ の連続点になるよう選んで

$$
P(|X|\ge R)<\eta
$$

とできます。

分布収束から

$$
F_n(-R)\to F(-R),
\qquad
F_n(R)\to F(R),
$$

なので、十分大きい $n$ では

$$
P(|X_n|>R)
\le F_n(-R)+1-F_n(R)
<2\eta.
$$

区間 $[-R,R]$ を、全ての端点が $F$ の連続点で、meshが $\delta$ 以下となる有限分割

$$
-R=x_0<x_1<\cdots<x_m=R
$$

に分けます。各区間 $(x_{j-1},x_j]$ で一点 $\xi_j$ を選び、$[-R,R]$ の外では0とするstep関数

$$
s(x)=
\begin{cases}
h(\xi_j),&x\in(x_{j-1},x_j],\\
0,&|x|>R
\end{cases}
$$

を取ります。区間内では

$$
|h(x)-s(x)|\le L\delta.
$$

さらに

$$
P(x_{j-1}<X_n\le x_j)
=F_n(x_j)-F_n(x_{j-1})
$$

は対応する $X$ の区間確率へ収束するので、有限和を取って

$$
E[s(X_n)]
\to
E[s(X)].
$$

従ってtailの寄与と区間内近似誤差を分ければ

$$
\limsup_{n\to\infty}
|E[h(X_n)]-E[h(X)]|
\le 2L\delta+6M\eta.
$$

先に $\delta\downarrow0$、次に $\eta\downarrow0$ とすれば期待値収束を得ます。

#### Step 2：bounded Lipschitz期待値収束ならCDFが連続点で収束する

$F$ の連続点 $x$ を固定し、$\delta>0$ とします。Lipschitz関数

$$
h^-_\delta(y)=
\begin{cases}
1,&y\le x-\delta,\\
(x-y)/\delta,&x-\delta<y<x,\\
0,&y\ge x,
\end{cases}
$$

および

$$
h^+_\delta(y)=
\begin{cases}
1,&y\le x,\\
(x+\delta-y)/\delta,&x<y<x+\delta,\\
0,&y\ge x+\delta
\end{cases}
$$

を取ります。すると

$$
h^-_\delta
\le1_{(-\infty,x]}
\le h^+_\delta.
$$

仮定から両端の期待値は $X_n$ から $X$ へ収束するので

$$
F(x-\delta)
\le
\liminf_nF_n(x)
\le
\limsup_nF_n(x)
\le
F(x+\delta).
$$

$x$ は連続点なので $\delta\downarrow0$ とすれば

$$
F_n(x)\to F(x).
$$

従って $X_n\Rightarrow X$ です。
<!-- proof-end -->

この定理を使うと、後のGaussian smoothingではCDFを直接扱わず、bounded Lipschitz期待値だけを制御すれば十分になります。

---

## 5. Gaussian Fourier identity

$\varepsilon>0$ に対して

$$
g_\varepsilon(x)
:=\frac1{\sqrt{2\pi}\varepsilon}
\exp\left(-\frac{x^2}{2\varepsilon^2}\right)
$$

とします。

<a id="lem-f0-00p6-gaussian-fourier"></a>

<!-- formal-statement-start -->
> **補題（Gaussian Fourier identity）**  
> 任意の $x\in\mathbb R$ と $\varepsilon>0$ について

$$
\boxed{
g_\varepsilon(x)
=\frac1{2\pi}
\int_{\mathbb R}
e^{-itx}e^{-\varepsilon^2t^2/2}\,dt
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：積分記号下微分をDCTで確認して一次ODEを解く

$$
I_\varepsilon(x)
:=\int_{\mathbb R}
 e^{-\varepsilon^2t^2/2}e^{-itx}\,dt
$$

と置きます。$h\ne0$ に対して

$$
\frac{e^{-it(x+h)}-e^{-itx}}{h}
=e^{-itx}\frac{e^{-ith}-1}{h}.
$$

実数 $u$ について $|e^{iu}-1|\le |u|$ なので

$$
\left|
\frac{e^{-it(x+h)}-e^{-itx}}{h}
\right|
\le |t|.
$$

従って差商にGaussian因子を掛けた絶対値は

$$
|t|e^{-\varepsilon^2t^2/2}
$$

で支配されます。この関数は可積分で、差商は各 $t$ について $-it e^{-itx}$ へ収束するため、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により積分と極限を交換でき、

$$
I_\varepsilon'(x)
=-i\int_{\mathbb R}
 t e^{-\varepsilon^2t^2/2}e^{-itx}\,dt.
$$

一方

$$
t e^{-\varepsilon^2t^2/2}
=-\frac1{\varepsilon^2}
\frac{d}{dt}e^{-\varepsilon^2t^2/2}.
$$

これを代入し、まず有限区間 $[-R,R]$ で部分積分します。境界項の絶対値は

$$
e^{-\varepsilon^2R^2/2}
$$

以下なので $R\to\infty$ で0へ収束します。したがって

$$
I_\varepsilon'(x)
=-\frac{x}{\varepsilon^2}I_\varepsilon(x).
$$

またGaussian積分から

$$
I_\varepsilon(0)
=\int_{\mathbb R}e^{-\varepsilon^2t^2/2}dt
=\frac{\sqrt{2\pi}}{\varepsilon}.
$$

従って一次ODEの解は

$$
I_\varepsilon(x)
=\frac{\sqrt{2\pi}}{\varepsilon}
 e^{-x^2/(2\varepsilon^2)}.
$$

両辺を $2\pi$ で割れば主張を得ます。
<!-- proof-end -->

特に標準正規 $Z\sim N(0,1)$ の特性関数は

$$
\boxed{
\varphi_Z(t)=e^{-t^2/2}
}
$$

です。

---

<a id="lem-f0-00p6-gaussian-smoothing-density"></a>

## 6. Gaussianを足すと密度が特性関数から復元できる

<!-- formal-statement-start -->
> **補題（Gaussian smoothingの密度公式）**  
> $X$ を任意の実確率変数、$Z\sim N(0,1)$ を $X$ と独立とします。$\varepsilon>0$ に対して

$$
X^{(\varepsilon)}:=X+\varepsilon Z
$$

> と置くと、$X^{(\varepsilon)}$ は連続密度

$$
\boxed{
f_\varepsilon(x)
=\frac1{2\pi}
\int_{\mathbb R}
e^{-itx}\varphi_X(t)e^{-\varepsilon^2t^2/2}\,dt
}
$$

> を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Gaussian kernelをTonelliで平均し、FubiniでFourier積分と期待値を交換する

まず「$X=y$ と条件付ける」という略記を使わず、密度公式を直接確認します。任意のBorel集合 $A\subset\mathbb R$ について、独立性と $\varepsilon Z$ の密度 $g_\varepsilon$ から

$$
\begin{aligned}
P(X+\varepsilon Z\in A)
&=E\left[
\int_{\mathbb R}
1_A(X+z)g_\varepsilon(z)\,dz
\right].
\end{aligned}
$$

被積分関数は非負なので [Tonelliの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md) を適用でき、変数変換 $x=X+z$ を行うと

$$
\begin{aligned}
P(X+\varepsilon Z\in A)
&=E\left[
\int_A g_\varepsilon(x-X)\,dx
\right]\\
&=\int_A E[g_\varepsilon(x-X)]\,dx.
\end{aligned}
$$

従って

$$
f_\varepsilon(x):=E[g_\varepsilon(x-X)]
$$

が $X+\varepsilon Z$ の密度です。ここまででは $X$ が離散分布か連続分布かを一切仮定していません。

次に [Gaussian Fourier identity](#lem-f0-00p6-gaussian-fourier) を代入すると

$$
g_\varepsilon(x-X)
=\frac1{2\pi}
\int_{\mathbb R}
 e^{-itx}e^{itX}e^{-\varepsilon^2t^2/2}\,dt.
$$

絶対値は $e^{-\varepsilon^2t^2/2}$ であり、これは $t$ について可積分です。したがって [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md) により期待値と積分を交換でき、

$$
\begin{aligned}
f_\varepsilon(x)
&=\frac1{2\pi}
\int_{\mathbb R}
 e^{-itx}E[e^{itX}]e^{-\varepsilon^2t^2/2}\,dt\\
&=\frac1{2\pi}
\int_{\mathbb R}
 e^{-itx}\varphi_X(t)e^{-\varepsilon^2t^2/2}\,dt.
\end{aligned}
$$

最後に $x_n\to x$ とすると integrand は各 $t$ で収束し、絶対値は同じ可積分関数 $e^{-\varepsilon^2t^2/2}$ に支配されます。DCTにより $f_\varepsilon(x_n)\to f_\varepsilon(x)$ なので、密度は連続です。
<!-- proof-end -->

---

<a id="thm-f0-00p6-uniqueness"></a>

## 7. 特性関数の一意性

<!-- formal-statement-start -->
> **定理（特性関数の一意性）**  
> 実確率変数 $X,Y$ が

$$
\varphi_X(t)=\varphi_Y(t)
\qquad(\forall t\in\mathbb R)
$$

> を満たすなら

$$
\boxed{X\stackrel d=Y}
$$

> です。すなわち特性関数は分布を一意に決めます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：同じGaussian noiseを足した分布を一致させ、noiseを0へ戻す

標準正規 $Z$ を独立に取り、$\varepsilon>0$ を固定します。[Gaussian smoothingの密度公式](#lem-f0-00p6-gaussian-smoothing-density)より

$$
f_{X,\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi_X(t)e^{-\varepsilon^2t^2/2}dt,
$$

$$
f_{Y,\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi_Y(t)e^{-\varepsilon^2t^2/2}dt.
$$

特性関数が等しいので密度も等しく、

$$
X+\varepsilon Z
\stackrel d=
Y+\varepsilon Z
\qquad(\forall\varepsilon>0).
$$

$F_X,F_Y$ を分布関数とします。$x$ を両方のCDFの連続点とします。任意の $\delta>0$ について

$$
P(X\le x-\delta)-P(|\varepsilon Z|>\delta)
\le
P(X+\varepsilon Z\le x)
$$

かつ

$$
P(X+\varepsilon Z\le x)
\le
P(X\le x+\delta)+P(|\varepsilon Z|>\delta).
$$

$\varepsilon\downarrow0$ で $P(|\varepsilon Z|>\delta)\to0$、さらに $\delta\downarrow0$ とすれば $x$ におけるCDFの連続性から

$$
P(X+\varepsilon Z\le x)\to F_X(x).
$$

同様に

$$
P(Y+\varepsilon Z\le x)\to F_Y(x).
$$

左辺は各 $\varepsilon$ で等しいので、両方の連続点 $x$ で

$$
F_X(x)=F_Y(x).
$$

CDFの不連続点は高々可算個です。実際、jumpが $1/m$ 以上の点は高々 $m$ 個であり、全不連続点はその可算和に含まれます。従って両CDFの共通連続点は稠密です。任意の $x$ に対し共通連続点列 $x_k\downarrow x$ を取れば、CDFの右連続性から

$$
F_X(x)=\lim_kF_X(x_k)=\lim_kF_Y(x_k)=F_Y(x).
$$

したがって全ての $x$ でCDFが一致し、$X\stackrel d=Y$ を得ます。
<!-- proof-end -->

これで「特性関数を計算して既知分布のものと一致したから、その分布である」という操作が論理的に正当化されました。

---

<a id="thm-f0-00p6-second-order-expansion"></a>

## 8. 有限二次モーメントなら0近傍で二次展開できる

<!-- formal-statement-start -->
> **定理（特性関数の二次展開）**  
> $E[X^2]<\infty$ なら $t\to0$ で

$$
\boxed{
\varphi_X(t)
=1+itE[X]-\frac{t^2}{2}E[X^2]+o(t^2)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：剰余を積分表示して $X^2$ で支配する

実数 $u$ に対して微積分の基本定理を二回使うと

$$
e^{iu}-1-iu
=-u^2\int_0^1(1-s)e^{isu}\,ds.
$$

したがって

$$
r(u):=e^{iu}-1-iu+\frac{u^2}{2}
$$

と置けば

$$
\frac{r(u)}{u^2}
=
\frac12-\int_0^1(1-s)e^{isu}\,ds
\qquad(u\ne0).
$$

$u\to0$ では被積分関数 $e^{isu}$ が1へ収束し、絶対値は1なので、区間 $[0,1]$ 上のDCTから

$$
\frac{r(u)}{u^2}\to
\frac12-\int_0^1(1-s)\,ds
=0.
$$

また全ての $u$ について

$$
|r(u)|
\le
u^2\left(
\frac12+\int_0^1(1-s)\,ds
\right)
=u^2.
$$

ここで

$$
q(u):=
\begin{cases}
r(u)/u^2,&u\ne0,\\
0,&u=0
\end{cases}
$$

と定義すれば $q(u)\to0$ as $u\to0$ かつ $|q(u)|\le1$ です。従って

$$
\frac{r(tX)}{t^2}
=X^2q(tX)
\to0
\qquad\text{a.s.}
$$

で、絶対値は $X^2$ に支配されます。仮定 $E[X^2]<\infty$ がここで初めて使われ、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\frac{E[r(tX)]}{t^2}\to0,
$$

すなわち

$$
E[r(tX)]=o(t^2).
$$

一方

$$
e^{itX}
=1+itX-\frac{t^2X^2}{2}+r(tX).
$$

期待値を取れば

$$
\varphi_X(t)
=1+itE[X]-\frac{t^2}{2}E[X^2]+o(t^2)
$$

を得ます。
<!-- proof-end -->

特に $E[X]=0$, $E[X^2]=1$ なら

$$
\varphi_X(t)=1-\frac{t^2}{2}+o(t^2),
$$

となり、[iid中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)の局所展開が完全に正当化されます。

---

<a id="lem-f0-00p6-scheffe"></a>

## 9. Schefféの補題

<!-- formal-statement-start -->
> **補題（Scheffé）**  
> $f_n,f$ が同じ測度に関する確率密度で

$$
f_n(x)\to f(x)
\quad\text{a.e.}
$$

> なら

$$
\boxed{
\int|f_n-f|\to0
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：minを使って共通部分の質量を1へ送る

$f_n,f\ge0$ かつ積分が1なので

$$
|f_n-f|=f_n+f-2\min(f_n,f).
$$

従って

$$
\int|f_n-f|
=2-2\int\min(f_n,f).
$$

$\min(f_n,f)\to f$ a.e. で、$0\le\min(f_n,f)\le f$ です。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\int\min(f_n,f)\to\int f=1.
$$

よって $\int|f_n-f|\to0$ です。
<!-- proof-end -->

---

<a id="thm-levy-continuity"></a>
<a id="thm-f0-00p6-levy-continuity"></a>

## 10. Lévy連続性定理

<!-- formal-statement-start -->
> **定理（Lévy連続性定理：極限分布が既知の版）**  
> 実確率変数列 $X_n$ と実確率変数 $X$ の特性関数を $\varphi_n,\varphi$ とします。このとき

$$
\boxed{
X_n\Rightarrow X
\iff
\varphi_n(t)\to\varphi(t)
\quad(\forall t\in\mathbb R)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：難しい向きはGaussian smoothingで密度へ落とす

#### Step 1：分布収束なら特性関数は各点収束する

$X_n\Rightarrow X$ とします。[bounded Lipschitz testによる特徴付け](#thm-f0-00p6-bl-characterization)から、任意の有界Lipschitz実関数 $h$ で期待値が収束します。

固定した $t$ について $\cos(tx)$ と $\sin(tx)$ はともに有界Lipschitzなので

$$
E[\cos(tX_n)]\to E[\cos(tX)],
$$

$$
E[\sin(tX_n)]\to E[\sin(tX)].
$$

実部と虚部を合わせて

$$
\varphi_n(t)\to\varphi(t).
$$

#### Step 2：特性関数の各点収束を仮定し、Gaussianを足す

今度は

$$
\varphi_n(t)\to\varphi(t)
\qquad(\forall t)
$$

を仮定します。標準正規 $Z$ を各 $X_n$ および $X$ と独立に取ったときの分布だけを考え、固定した $\varepsilon>0$ に対して

$$
X_n^{(\varepsilon)}:=X_n+\varepsilon Z,
\qquad
X^{(\varepsilon)}:=X+\varepsilon Z
$$

と書きます。

[Gaussian smoothingの密度公式](#lem-f0-00p6-gaussian-smoothing-density)から密度は

$$
f_{n,\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi_n(t)e^{-\varepsilon^2t^2/2}dt,
$$

$$
f_{\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi(t)e^{-\varepsilon^2t^2/2}dt.
$$

$|\varphi_n(t)|\le1$ なのでintegrandは可積分関数 $e^{-\varepsilon^2t^2/2}$ に支配されます。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)より各 $x$ で

$$
f_{n,\varepsilon}(x)\to f_\varepsilon(x).
$$

両者は確率密度なので [Schefféの補題](#lem-f0-00p6-scheffe)から

$$
\boxed{
\int_{\mathbb R}|f_{n,\varepsilon}-f_\varepsilon|dx\to0
}
$$

を得ます。

#### Step 3：固定したGaussian smoothing後はbounded testの期待値まで収束する

有界関数 $h$ に対し

$$
\begin{aligned}
&|E[h(X_n^{(\varepsilon)})]-E[h(X^{(\varepsilon)})]|\\
&\qquad\le
\|h\|_\infty
\int|f_{n,\varepsilon}-f_\varepsilon|dx
\to0.
\end{aligned}
$$

#### Step 4：Gaussian noiseを一様に外す

$h$ を有界Lipschitzとし、Lipschitz定数を $L$ とします。各変数と独立な標準正規を同じ記号 $Z$ で表せば

$$
|h(X_n+\varepsilon Z)-h(X_n)|
\le L\varepsilon|Z|.
$$

従って全ての $n$ について一様に

$$
|E[h(X_n+\varepsilon Z)]-E[h(X_n)]|
\le L\varepsilon E|Z|.
$$

同様に

$$
|E[h(X+\varepsilon Z)]-E[h(X)]|
\le L\varepsilon E|Z|.
$$

三角不等式から、固定した $\varepsilon$ で $n\to\infty$ とすると

$$
\limsup_{n\to\infty}
|E[h(X_n)]-E[h(X)]|
\le2L\varepsilon E|Z|.
$$

最後に $\varepsilon\downarrow0$ として

$$
E[h(X_n)]\to E[h(X)]
$$

を得ます。これは全ての有界Lipschitz $h$ で成り立つので、[bounded Lipschitz testによる特徴付け](#thm-f0-00p6-bl-characterization)から

$$
X_n\Rightarrow X.
$$
<!-- proof-end -->

この証明では一般のtightness定理やHelly選択定理を黒箱にせず、**Gaussianを足してFourier変換を絶対可積分にする**ことで問題を密度の $L^1$ 収束へ落としています。

> より一般のLévy連続性定理では、各点極限 $\varphi$ が0で連続であることだけから「$\varphi$ 自身がある確率分布の特性関数である」ことまで結論します。この存在部分にはtightnessを伴う議論が必要です。この教材でCLTに使うのは、極限 $e^{-t^2/2}$ が既に標準正規分布の特性関数だと分かっている上の版です。章末C01では、0での連続性を失うと質量が無限遠へ逃げ得ることを具体例で確認します。

---

## 11. iid中心極限定理への接続

ここは次章の証明の**見取り図**です。中心極限定理自体の証明は [F0-00P6A](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) で閉じます。

$Y_1,Y_2,\ldots$ が独立同分布で

$$
E[Y_i]=0,
\qquad
E[Y_i^2]=1
$$

とします。[二次展開](#thm-f0-00p6-second-order-expansion)から

$$
\varphi_Y(u)
=1-\frac{u^2}{2}+o(u^2).
$$

標準化和

$$
Z_n=\frac1{\sqrt n}\sum_{j=1}^nY_j
$$

の特性関数は独立性から

$$
\varphi_{Z_n}(t)
=\left\{\varphi_Y\left(\frac t{\sqrt n}\right)\right\}^n.
$$

ここへ $u=t/\sqrt n$ を代入すると括弧内は

$$
1-\frac{t^2}{2n}+o\left(\frac1n\right)
$$

です。従って次章でこの $n$ 乗の極限を丁寧に評価すると

$$
\varphi_{Z_n}(t)\to e^{-t^2/2}.
$$

右辺は標準正規分布の特性関数なので、最後に [Lévy連続性定理](#thm-f0-00p6-levy-continuity) を適用して

$$
Z_n\Rightarrow N(0,1)
$$

を得る、というのが全体像です。

---

## 12. 演習

### F0-00P6-A01 Bernoulliの特性関数

- Level: A
- 目安時間: 8分

$X\sim\operatorname{Bernoulli}(p)$ の特性関数を求めよ。

<!-- solution-start -->
#### 詳細解答

特性関数の定義は

$$
\varphi_X(t)=E[e^{itX}]
$$

です。Bernoulli変数は

$$
P(X=0)=1-p,
\qquad
P(X=1)=p
$$

なので、離散型期待値の定義へ直接代入して

$$
\begin{aligned}
\varphi_X(t)
&=e^{it\cdot0}P(X=0)+e^{it\cdot1}P(X=1)\\
&=(1-p)+pe^{it}.
\end{aligned}
$$

したがって

$$
\boxed{\varphi_X(t)=1-p+pe^{it}}.
$$

確認として $t=0$ を代入すると $\varphi_X(0)=1$ となり、特性関数の基本性質とも一致します。
<!-- solution-end -->

### F0-00P6-A02 独立和の特性関数

- Level: A
- 目安時間: 8分

独立な $X,Y$ に対し $\varphi_{X+Y}=\varphi_X\varphi_Y$ を示せ。

<!-- solution-start -->
#### 詳細解答

固定した $t\in\mathbb R$ について

$$
e^{it(X+Y)}=e^{itX}e^{itY}.
$$

$X,Y$ が独立なら、それぞれの可測関数 $e^{itX},e^{itY}$ も独立です。また絶対値は1なので期待値は必ず存在します。したがって

$$
\begin{aligned}
\varphi_{X+Y}(t)
&=E[e^{it(X+Y)}]\\
&=E[e^{itX}e^{itY}]\\
&=E[e^{itX}]E[e^{itY}]\\
&=\varphi_X(t)\varphi_Y(t).
\end{aligned}
$$

よって全ての $t$ で

$$
\boxed{\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)}.
$$

独立性を使ったのは、3行目の「積の期待値を期待値の積へ分ける」ところです。
<!-- solution-end -->

### F0-00P6-A03 アフィン変換の特性関数

- Level: A
- 目安時間: 10分

実数 $a,b$ と実確率変数 $X$ に対し

$$
\varphi_{aX+b}(t)=e^{itb}\varphi_X(at)
$$

を定義から示せ。また $X\sim N(0,1)$ のとき、この公式から $aX+b$ の特性関数を求めよ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
\begin{aligned}
\varphi_{aX+b}(t)
&=E[e^{it(aX+b)}]\\
&=E[e^{itb}e^{i(at)X}]\\
&=e^{itb}E[e^{i(at)X}]\\
&=e^{itb}\varphi_X(at).
\end{aligned}
$$

標準正規分布では

$$
\varphi_X(s)=e^{-s^2/2}
$$

なので $s=at$ と置いて

$$
\varphi_X(at)=e^{-a^2t^2/2}.
$$

従って

$$
\boxed{
\varphi_{aX+b}(t)
=\exp\left(ibt-\frac{a^2t^2}{2}\right)
}.
$$

特に $a=\sigma>0$, $b=\mu$ とすれば、これは $N(\mu,\sigma^2)$ の特性関数です。
<!-- solution-end -->

### F0-00P6-A04 Rademacher和の特性関数

- Level: A
- 目安時間: 12分

独立な確率変数 $X_1,\ldots,X_n$ が

$$
P(X_j=1)=P(X_j=-1)=\frac12
$$

を満たすとする。$S_n=X_1+\cdots+X_n$ の特性関数を求めよ。

<!-- solution-start -->
#### 詳細解答

まず1個の $X_j$ について定義から

$$
\begin{aligned}
\varphi_{X_j}(t)
&=\frac12e^{it}+\frac12e^{-it}\\
&=\cos t.
\end{aligned}
$$

$X_1,\ldots,X_n$ は独立なので、独立和の公式を繰り返し使って

$$
\begin{aligned}
\varphi_{S_n}(t)
&=\prod_{j=1}^n\varphi_{X_j}(t)\\
&=(\cos t)^n.
\end{aligned}
$$

従って

$$
\boxed{\varphi_{S_n}(t)=(\cos t)^n}.
$$

この問題では「各変数の特性関数を直接計算する」段階と、「独立性で和を積へ変える」段階を分けるのが要点です。
<!-- solution-end -->

### F0-00P6-B01 正規分布の和を同定する

- Level: B
- 目安時間: 15分

独立な

$$
X\sim N(\mu_1,\sigma_1^2),
\qquad
Y\sim N(\mu_2,\sigma_2^2)
$$

について $X+Y$ の分布を特性関数から求めよ。

<!-- solution-start -->
#### 詳細解答

標準正規 $Z$ の特性関数は $e^{-t^2/2}$ です。$N(\mu,\sigma^2)$ 変数は $\mu+\sigma Z$ と同分布なので、アフィン変換の公式から

$$
\varphi_{N(\mu,\sigma^2)}(t)
=\exp\left(i\mu t-\frac{\sigma^2t^2}{2}\right).
$$

従って

$$
\varphi_X(t)
=\exp\left(i\mu_1t-\frac{\sigma_1^2t^2}{2}\right),
$$

$$
\varphi_Y(t)
=\exp\left(i\mu_2t-\frac{\sigma_2^2t^2}{2}\right).
$$

独立性から

$$
\begin{aligned}
\varphi_{X+Y}(t)
&=\varphi_X(t)\varphi_Y(t)\\
&=\exp\left(
 i(\mu_1+\mu_2)t
 -\frac{(\sigma_1^2+\sigma_2^2)t^2}{2}
\right).
\end{aligned}
$$

右辺は $N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$ の特性関数です。[特性関数の一意性](#thm-f0-00p6-uniqueness)により、特性関数が一致すれば分布も一致するので

$$
\boxed{
X+Y\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)
}.
$$
<!-- solution-end -->

### F0-00P6-B02 二次展開をDCTで正当化する

- Level: B
- 目安時間: 18分

$E[X^2]<\infty$ とする。$r(u)=e^{iu}-1-iu+u^2/2$ を用いて

$$
E[r(tX)]=o(t^2)
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

本文と同じく

$$
e^{iu}-1-iu
=-u^2\int_0^1(1-s)e^{isu}\,ds
$$

を使います。従って $u\ne0$ では

$$
\frac{r(u)}{u^2}
=
\frac12-\int_0^1(1-s)e^{isu}\,ds.
$$

$u\to0$ のとき $e^{isu}\to1$ で、絶対値は1です。よって $[0,1]$ 上のDCTから

$$
\frac{r(u)}{u^2}\to
\frac12-\int_0^1(1-s)\,ds
=0.
$$

また

$$
\left|\frac{r(u)}{u^2}\right|
\le
\frac12+\int_0^1(1-s)\,ds
=1.
$$

$u=0$ では比を0と定義して

$$
q(u):=
\begin{cases}
r(u)/u^2,&u\ne0,\\
0,&u=0
\end{cases}
$$

と置きます。すると $q(tX)\to0$ a.s. かつ $|q(tX)|\le1$ なので

$$
\frac{r(tX)}{t^2}=X^2q(tX)\to0
\qquad\text{a.s.}
$$

であり、

$$
\left|\frac{r(tX)}{t^2}\right|
\le X^2.
$$

仮定 $E[X^2]<\infty$ により $X^2$ は可積分です。従ってDCTから

$$
E\left[\frac{r(tX)}{t^2}\right]\to0.
$$

すなわち

$$
\boxed{E[r(tX)]=o(t^2)}.
$$

仮定 $E[X^2]<\infty$ は、最後にDCTの支配関数 $X^2$ を可積分にするために使われています。
<!-- solution-end -->

### F0-00P6-B03 Gaussian smoothingでLévyを説明する

- Level: B
- 目安時間: 20分

$\varphi_n(t)\to\varphi_X(t)$ とする。固定した $\varepsilon>0$ に対して $X_n+\varepsilon Z$ の密度が $X+\varepsilon Z$ の密度へ $L^1$ 収束する理由と、$\varepsilon\downarrow0$ で元の分布収束が得られる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

固定した $\varepsilon>0$ について、Gaussian smoothingの密度公式から

$$
f_{n,\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi_n(t)e^{-\varepsilon^2t^2/2}\,dt,
$$

$$
f_{\varepsilon}(x)
=\frac1{2\pi}
\int e^{-itx}\varphi_X(t)e^{-\varepsilon^2t^2/2}\,dt.
$$

各 $t$ で $\varphi_n(t)\to\varphi_X(t)$ です。また特性関数の絶対値は1以下なので

$$
|e^{-itx}\varphi_n(t)e^{-\varepsilon^2t^2/2}|
\le e^{-\varepsilon^2t^2/2}.
$$

右辺は $t$ について可積分です。従ってDCTを適用でき、各 $x$ で

$$
f_{n,\varepsilon}(x)\to f_\varepsilon(x).
$$

両者は確率密度なのでSchefféの補題から

$$
\int|f_{n,\varepsilon}-f_\varepsilon|\,dx\to0.
$$

よって任意の有界関数 $h$ について

$$
|E[h(X_n+\varepsilon Z)]-E[h(X+\varepsilon Z)]|
\le
\|h\|_\infty
\int|f_{n,\varepsilon}-f_\varepsilon|\,dx
\to0.
$$

次に $h$ をLipschitz定数 $L$ の有界Lipschitz関数とします。すると

$$
|h(X_n+\varepsilon Z)-h(X_n)|
\le L\varepsilon|Z|,
$$

ゆえに

$$
|E[h(X_n+\varepsilon Z)]-E[h(X_n)]|
\le L\varepsilon E|Z|.
$$

この評価は $n$ に依存しません。同様の評価が $X$ にも成り立つため、三角不等式を使って固定 $\varepsilon$ で $n\to\infty$ とすると

$$
\limsup_n|E[h(X_n)]-E[h(X)]|
\le2L\varepsilon E|Z|.
$$

最後に $\varepsilon\downarrow0$ として右辺を0へ送れば

$$
E[h(X_n)]\to E[h(X)].
$$

全ての有界Lipschitz $h$ でこれが成り立つので、本文の特徴付け定理から

$$
\boxed{X_n\Rightarrow X}.
$$

順序は **固定した $\varepsilon$ で $n\to\infty$、その後 $\varepsilon\downarrow0$** です。Gaussian noise除去誤差が $n$ に一様だから、この順序で極限を閉じられます。
<!-- solution-end -->

### F0-00P6-C01 0で不連続な点wise極限と「質量の逃亡」

- Level: C
- 目安時間: 25分

$X_n\sim N(0,n)$ とする。

1. 特性関数 $\varphi_n(t)$ を求め、その各点極限 $\varphi(t)$ を求めよ。
2. $\varphi$ が $t=0$ で不連続であることを示せ。
3. 任意の $M>0$ に対して $P(|X_n|\le M)\to0$ を示し、$X_n$ がどの実確率変数にも分布収束しないことを説明せよ。
4. この例が、一般のLévy連続性定理で「極限関数が0で連続」という条件が必要な理由をどう表しているか説明せよ。

<!-- solution-start -->
#### 詳細解答

$X_n\sim N(0,n)$ なので、正規分布の特性関数から

$$
\varphi_n(t)
=\exp\left(-\frac{nt^2}{2}\right).
$$

$t=0$ では全ての $n$ について $\varphi_n(0)=1$ です。一方、$t\ne0$ を固定すると $nt^2/2\to\infty$ なので

$$
\varphi_n(t)\to0.
$$

従って各点極限は

$$
\varphi(t)=
\begin{cases}
1,&t=0,\\
0,&t\ne0.
\end{cases}
$$

です。明らかに

$$
\lim_{t\to0,\ t\ne0}\varphi(t)=0\ne1=\varphi(0),
$$

したがって $\varphi$ は0で不連続です。

次に標準正規 $Z\sim N(0,1)$ を用いれば

$$
X_n\stackrel d=\sqrt n\,Z.
$$

従って任意の固定 $M>0$ に対し

$$
P(|X_n|\le M)
=P\left(|Z|\le\frac{M}{\sqrt n}\right).
$$

$M/\sqrt n\downarrow0$ で、標準正規分布は0に原子を持たないので

$$
P\left(|Z|\le\frac{M}{\sqrt n}\right)\to P(Z=0)=0.
$$

つまり、どれだけ大きな有限区間 $[-M,M]$ を固定しても、そこに残る確率質量は最終的に0へ行きます。質量が $\pm\infty$ 側へ逃げているわけです。

もしある実確率変数 $X$ へ $X_n\Rightarrow X$ なら、本章のLévy連続性定理の「分布収束なら特性関数が各点収束する」向きから

$$
\varphi_n(t)\to\varphi_X(t)
$$

となります。ところが特性関数 $\varphi_X$ は必ず0で連続であり $\varphi_X(0)=1$ です。上で得た不連続な極限関数とは一致できないため、そのような $X$ は存在しません。

この例が示す壊れた機構は、単に「極限関数が変な形」というだけではありません。0での連続性を失うと、分布列の確率質量を有限範囲に留めるtightnessが失われ、部分列の極限分布を作れなくなり得ます。一般のLévy連続性定理で0での連続性が要求されるのは、この**質量の逃亡を排除する役割**を持つためです。
<!-- solution-end -->

---

## 章末チェック

- 特性関数を定義し、全ての分布で存在する理由を説明できる。
- 独立和で特性関数が積になることを証明できる。
- 分布収束をCDFの連続点で定義できる。
- bounded Lipschitz期待値による分布収束の特徴付けを証明できる。
- Gaussian Fourier identityで積分記号下微分と境界項消失を正当化できる。
- Gaussian smoothing密度公式を、確率0事象への条件付けに頼らずTonelli/Fubiniから証明できる。
- 特性関数の一意性をGaussian smoothingから証明できる。
- 有限二次モーメントから特性関数の二次展開をDCTで証明できる。
- Schefféの補題を証明できる。
- Lévy連続性定理のCLTに必要な版をGaussian smoothingから証明できる。
- 一般版で0における連続性が必要な理由を、質量の逃亡と結び付けて説明できる。

次は [F0-00P6A 独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) で、この章の二次展開とLévy連続性定理を実際に組み合わせます。
