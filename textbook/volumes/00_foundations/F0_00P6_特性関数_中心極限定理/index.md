# F0-00P6 特性関数・Lévy連続性定理

特性関数

$$
\varphi_X(t)=E[e^{itX}]
$$

は全ての確率分布について存在し、独立和を積へ変えます。さらに特性関数は分布を一意に決め、特性関数の各点収束から分布収束を導けます。

この章では後者を「そういう定理」として置かず、Gaussian smoothingを使って証明します。

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
>
> $$
> \boxed{
> \varphi_X(t):=E[e^{itX}]
> }
> \qquad(t\in\mathbb R)
> $$
>
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
>
> $$
> \varphi_X(0)=1,
> \qquad
> |\varphi_X(t)|\le1,
> $$
>
> 特性関数 $\varphi_X$ は $\mathbb R$ 上で連続です。また定数 $a,b$ に対し
>
> $$
> \varphi_{aX+b}(t)=e^{itb}\varphi_X(at).
> $$
>
> さらに $X,Y$ が独立なら
>
> $$
> \boxed{
> \varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)
> }
> $$
>
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

かつ絶対値は常に1なので、優収束定理から

$$
\varphi_X(t_n)\to\varphi_X(t).
$$

従って連続です。

アフィン変換については

$$
E[e^{it(aX+b)}]
=e^{itb}E[e^{i(at)X}].
$$

独立な $X,Y$ については

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
>
> $$
> \boxed{F_n(x)\to F(x)}
> $$
>
> が成り立つとき、$X_n$ は $X$ へ分布収束するといい
>
> $$
> X_n\xrightarrow{d}X
> \quad\text{または}\quad
> X_n\Rightarrow X
> $$
>
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
>
> 1. $X_n\Rightarrow X$。
> 2. 任意の有界Lipschitz関数 $h:\mathbb R\to\mathbb R$ に対して
>
> $$
> \boxed{E[h(X_n)]\to E[h(X)]}
> $$
>
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

に分けます。各区間 $(x_{j-1},x_j]$ で一点 $\xi_j$ を選び、step関数

$$
s(x)=h(\xi_j)
\qquad(x\in(x_{j-1},x_j])
$$

とします。区間内では

$$
|h(x)-s(x)|\le L\delta.
$$

さらに

$$
P(x_{j-1}<X_n\le x_j)
=F_n(x_j)-F_n(x_{j-1})
$$

は対応する $X$ の区間確率へ収束するので

$$
E[s(X_n)1_{\{|X_n|\le R\}}]
\to
E[s(X)1_{\{|X|\le R\}}].
$$

従って

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

<a id="lem-f0-00p6-gaussian-fourier"></a>

## 5. Gaussian Fourier identity

$\varepsilon>0$ に対して

$$
g_\varepsilon(x)
:=\frac1{\sqrt{2\pi}\varepsilon}
\exp\left(-\frac{x^2}{2\varepsilon^2}\right)
$$

とします。

<!-- formal-statement-start -->
> **補題（Gaussian Fourier identity）**  
> 任意の $x\in\mathbb R$ と $\varepsilon>0$ について
>
> $$
> \boxed{
> g_\varepsilon(x)
> =\frac1{2\pi}
> \int_{\mathbb R}
> e^{-itx}e^{-\varepsilon^2t^2/2}\,dt
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：積分を $x$ で微分して一次ODEを解く

$$
I_\varepsilon(x)
:=\int_{\mathbb R}
 e^{-\varepsilon^2t^2/2}e^{-itx}\,dt
$$

と置きます。$|t|e^{-\varepsilon^2t^2/2}$ は可積分なので積分記号下で微分でき

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

これを代入して部分積分すると、Gaussian因子により境界項は0なので

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

従ってODEの解は

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
>
> $$
> X^{(\varepsilon)}:=X+\varepsilon Z
> $$
>
> と置くと、$X^{(\varepsilon)}$ は連続密度
>
> $$
> \boxed{
> f_\varepsilon(x)
> =\frac1{2\pi}
> \int_{\mathbb R}
> e^{-itx}\varphi_X(t)e^{-\varepsilon^2t^2/2}\,dt
> }
> $$
>
> を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Gaussian kernelを条件付きで平均し、Fubiniで順序交換する

$X=y$ を固定すれば $X+\varepsilon Z$ の条件付き密度は $g_\varepsilon(x-y)$ です。従って無条件密度は

$$
f_\varepsilon(x)
=E[g_\varepsilon(x-X)].
$$

[Gaussian Fourier identity](#lem-f0-00p6-gaussian-fourier)を代入すると

$$
g_\varepsilon(x-X)
=\frac1{2\pi}
\int_{\mathbb R}
 e^{-itx}e^{itX}e^{-\varepsilon^2t^2/2}\,dt.
$$

絶対値は $e^{-\varepsilon^2t^2/2}$ 以下で可積分なのでFubiniを適用でき、

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

Gaussian factorが可積分なので右辺は $x$ の連続関数です。
<!-- proof-end -->

---

<a id="thm-f0-00p6-uniqueness"></a>

## 7. 特性関数の一意性

<!-- formal-statement-start -->
> **定理（特性関数の一意性）**  
> 実確率変数 $X,Y$ が
>
> $$
> \varphi_X(t)=\varphi_Y(t)
> \qquad(\forall t\in\mathbb R)
> $$
>
> を満たすなら
>
> $$
> \boxed{X\stackrel d=Y}
> $$
>
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

特性関数が等しいので

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

$\varepsilon\downarrow0$ で $P(|\varepsilon Z|>\delta)\to0$、さらに $\delta\downarrow0$ とすればCDFの連続性から

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

CDFの不連続点は高々可算個です。実際、jumpが $1/m$ 以上の点は高々 $m$ 個であり、全不連続点はその可算和に含まれます。従って両CDFの共通連続点は稠密です。CDFの右連続性を使えば稠密集合上の一致から全ての $x$ で一致し、$X\stackrel d=Y$ を得ます。
<!-- proof-end -->

これで「特性関数を計算して既知分布のものと一致したから、その分布である」という操作が論理的に正当化されました。

---

<a id="thm-f0-00p6-second-order-expansion"></a>

## 8. 有限二次モーメントなら0近傍で二次展開できる

<!-- formal-statement-start -->
> **定理（特性関数の二次展開）**  
> $E[X^2]<\infty$ なら $t\to0$ で
>
> $$
> \boxed{
> \varphi_X(t)
> =1+itE[X]-\frac{t^2}{2}E[X^2]+o(t^2)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Taylor remainderを $X^2$ で支配してDCTを使う

$$
r(u):=e^{iu}-1-iu+\frac{u^2}{2}
$$

と置きます。通常のTaylor展開から

$$
\frac{r(u)}{u^2}\to0
\qquad(u\to0).
$$

またある定数 $C$ が存在して全ての $u\in\mathbb R$ で

$$
|r(u)|\le C u^2
$$

とできます。$|u|\le1$ ではTaylor remainder、$|u|>1$ では

$$
|r(u)|
\le2+|u|+\frac{u^2}{2}
\le\frac72u^2
$$

とすれば十分です。

従って

$$
\frac{r(tX)}{t^2}
=X^2\frac{r(tX)}{(tX)^2}
\to0
\qquad\text{a.s.}
$$

で、絶対値は $CX^2$ に支配されます。$E[X^2]<\infty$ なので優収束定理から

$$
E[r(tX)]=o(t^2).
$$

一方

$$
e^{itX}
=1+itX-\frac{t^2X^2}{2}+r(tX).
$$

期待値を取れば主張が従います。
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
>
> $$
> f_n(x)\to f(x)
> \quad\text{a.e.}
> $$
>
> なら
>
> $$
> \boxed{
> \int|f_n-f|\to0
> }
> $$
>
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

$\min(f_n,f)\to f$ a.e. で、$0\le\min(f_n,f)\le f$ です。優収束定理から

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
>
> $$
> \boxed{
> X_n\Rightarrow X
> \iff
> \varphi_n(t)\to\varphi(t)
> \quad(\forall t\in\mathbb R)
> }
> $$
>
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

を仮定します。標準正規 $Z$ を独立に取り、固定した $\varepsilon>0$ に対して

$$
X_n^{(\varepsilon)}:=X_n+\varepsilon Z,
\qquad
X^{(\varepsilon)}:=X+\varepsilon Z
$$

を考えます。

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

$|\varphi_n(t)|\le1$ なのでintegrandは可積分関数 $e^{-\varepsilon^2t^2/2}$ に支配されます。優収束定理より各 $x$ で

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

$h$ を有界Lipschitzとし、Lipschitz定数を $L$ とします。同じ $Z$ を使えば

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

> より一般のLévy連続性定理では、点wise極限 $\varphi$ が0で連続であることだけから「$\varphi$ 自身がある確率分布の特性関数である」ことまで結論します。この存在部分にはtightnessを伴う議論が必要です。この教材でCLTに使うのは、極限 $e^{-t^2/2}$ が既に標準正規分布の特性関数だと分かっている上の版です。

---

## 11. iid中心極限定理への接続

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
=\left\{\varphi_Y\left(\frac t{\sqrt n}\right)\right\}^n
\to e^{-t^2/2}.
$$

右辺は標準正規分布の特性関数なので、[Lévy連続性定理](#thm-f0-00p6-levy-continuity)により

$$
Z_n\Rightarrow N(0,1).
$$

詳細なCLTの流れは [F0-00P6A](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) でまとめます。

---

## 12. 演習

### F0-00P6-A01 Bernoulliの特性関数

- Level: A
- 目安時間: 8分

$X\sim\operatorname{Bernoulli}(p)$ の特性関数を求めよ。

<!-- solution-start -->
#### 詳細解答
$X=0,1$ をそれぞれ確率 $1-p,p$ で取るので $E[e^{itX}]=(1-p)+pe^{it}$。

#### 本番答案
$\varphi_X(t)=1-p+pe^{it}$。

#### 採点基準（20点）
- 定義: 6点
- 2点の期待値: 10点
- 結論: 4点
<!-- solution-end -->

### F0-00P6-A02 独立和の特性関数

- Level: A
- 目安時間: 8分

独立な $X,Y$ に対し $\varphi_{X+Y}=\varphi_X\varphi_Y$ を示せ。

<!-- solution-start -->
#### 詳細解答
$e^{it(X+Y)}=e^{itX}e^{itY}$ と独立性による期待値の積への分解を使う。

#### 本番答案
$\varphi_{X+Y}(t)=E[e^{itX}e^{itY}]=E[e^{itX}]E[e^{itY}]=\varphi_X(t)\varphi_Y(t)$。

#### 採点基準（20点）
- 指数の積: 6点
- 独立性: 8点
- 結論: 6点
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
正規分布の特性関数は $\exp(i\mu t-\sigma^2t^2/2)$。独立和なので積を取り、$\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$。特性関数の一意性から対応する正規分布。

#### 本番答案
$\varphi_{X+Y}(t)=\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$ より $X+Y\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$。

#### 採点基準（20点）
- 正規特性関数: 5点
- 独立積: 6点
- パラメータ整理: 5点
- 一意性: 4点
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
$r(u)/u^2\to0$ かつ $|r(u)|\le Cu^2$ を示す。すると $r(tX)/t^2=X^2r(tX)/(tX)^2\to0$ a.s. で絶対値は $CX^2$ に支配される。DCTから期待値が0へ行く。

#### 本番答案
$|r(tX)|/t^2\le CX^2\in L^1$ かつ $r(tX)/t^2\to0$ a.s. よりDCT。

#### 採点基準（20点）
- remainder比: 5点
- 支配: 7点
- DCT: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00P6-B03 Gaussian smoothingでLévyを説明する

- Level: B
- 目安時間: 20分

$\varphi_n(t)\to\varphi_X(t)$ とする。固定した $\varepsilon>0$ に対して $X_n+\varepsilon Z$ の密度が $X+\varepsilon Z$ の密度へ $L^1$ 収束する理由と、$\varepsilon\downarrow0$ で元の分布収束が得られる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
Gaussian factorを掛けた逆Fourier積分では $e^{-\varepsilon^2t^2/2}$ が可積分支配関数になるためDCTで密度が点wise収束する。両者は密度なのでSchefféからL1収束。bounded Lipschitz hについてnoise追加の誤差は $L\varepsilon E|Z|$ 以下でnに一様。固定εでn→∞、次にε→0としてEh(X_n)→Eh(X)。BL特徴付けから分布収束。

#### 本番答案
Gaussian smoothing後はDCT + Schefféで密度がL1収束。元の変数との差はBL関数に対して $O(\varepsilon)$ なので、$n\to\infty$ 後に $\varepsilon\to0$。

#### 採点基準（20点）
- Gaussian支配: 5点
- Scheffé: 5点
- noise除去: 6点
- BL判定: 4点
<!-- solution-end -->

---

## 章末チェック

- 特性関数を定義し、全ての分布で存在する理由を説明できる。
- 独立和で特性関数が積になることを証明できる。
- 分布収束をCDFの連続点で定義できる。
- bounded Lipschitz期待値による分布収束の特徴付けを証明できる。
- Gaussian Fourier identityとGaussian smoothing密度公式を証明できる。
- 特性関数の一意性をGaussian smoothingから証明できる。
- 有限二次モーメントから特性関数の二次展開をDCTで証明できる。
- Schefféの補題を証明できる。
- Lévy連続性定理のCLTに必要な版をGaussian smoothingから証明できる。

次は [F0-00P6A 独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) で、この章の二次展開とLévy連続性定理を実際に組み合わせます。
