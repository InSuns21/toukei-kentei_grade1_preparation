# MICA1 局所Fourier変換と滑らかさ

これまでの[Fourier変換](../../FOU/FOU3/index.md#def-fou3-fourier-transform)は、関数を周波数ごとに分解して微分や畳み込みを調べる道具でした。[超関数](../../GPDE/GPDE1/index.md#def-gpde1-distribution)では、Dirac のデルタのように通常の関数では表せない対象まで微分できます。しかし、デルタが原点でだけ特異であることを、周波数の計算からどう読み取ればよいのでしょうか。

大域Fourier変換だけでは、離れた場所にある特異性が混ざります。そこで、注目点の周囲だけを滑らかな関数で切り出してから変換します。**コンパクト支持の超関数が滑らかであることと、そのFourier変換が任意の多項式より速く減衰すること**を、両方向に証明するのがこの講義の中心です。次の講義では、この減衰を「どの周波数方向か」に分解します。

舞台は $n\ge1$ の $\mathbb R^n$ とし、点を $x=(x_1,\ldots,x_n)$、周波数を $\xi=(\xi_1,\ldots,\xi_n)$ と書きます。$\mathcal D(\mathbb R^n)=C_c^\infty(\mathbb R^n)$ は滑らかでコンパクトな台を持つ試験関数の空間、$\mathcal D'(\mathbb R^n)$ は超関数の空間です。超関数 $u$ の試験関数 $\varphi$ への作用を $\langle u,\varphi\rangle$ と書きます。

Fourier変換の符号・正規化は

$$
\widehat f(\xi)=\int_{\mathbb R^n}e^{-ix\cdot\xi}f(x)\,dx,\qquad
f(x)=\frac1{(2\pi)^n}\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

と固定します。逆変換式は両辺の積分が意味を持つ場合の公式です。特に $\partial_{x_j}$ は周波数側で $i\xi_j$ に対応します。多次元の公式は、[一変数の反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)を各座標に適用し、絶対収束を確認して積分順序を交換するものです。

## 1. 点の近くだけを切り出す

デルタ超関数 $\delta_0$ は、試験関数に原点での値を返します。原点から離れた領域では何も検出しません。この違いを周波数側へ運ぶには、注目する場所で $1$、離れた場所で $0$ になる滑らかな「窓」が必要です。

点 $x_0$ の近くで $1$ となる $\chi\in C_c^\infty(\mathbb R^n)$ のような滑らかな窓を使います。例えば $x_0$ を含む小球の上で $1$、一回り大きい球の外で $0$ になる滑らかな関数を選べます。この窓の**台**はコンパクトですが、$\chi=1$ の範囲を全空間と混同してはいけません。

超関数に滑らかな関数を掛けるときは、試験関数側へ移すという意味で定めます。$\chi u$ にはコンパクトな台があるので、指数関数そのものがコンパクト支持でなくても、その近くに追加のcutoffを挿入してFourier変換を定義できます。

<a id="def-mica1-local-fourier"></a>

<!-- formal-statement-start -->
> **定義（超関数の局所化と局所Fourier変換）**  
> $u\in\mathcal D'(\mathbb R^n)$、$\chi\in C_c^\infty(\mathbb R^n)$ とする。局所化 $\chi u$ を、任意の $\varphi\in C_c^\infty(\mathbb R^n)$ に対し

$$
\langle\chi u,\varphi\rangle:=\langle u,\chi\varphi\rangle
$$

> で定める。$\rho\in C_c^\infty(\mathbb R^n)$ を $\operatorname{supp}\chi$ の近傍で $1$ となるよう選ぶ。このとき $\chi u$ のFourier変換を

$$
\widehat{\chi u}(\xi):=\langle u,\chi(x)e^{-ix\cdot\xi}\rangle
=\langle\chi u,\rho(x)e^{-ix\cdot\xi}\rangle
$$

> と定める。後者の値は $\rho$ の選択によらない。$\chi=1$ が $x_0$ の近傍で成り立つとき、この $\chi$ を $x_0$ のcutoff関数といい、この変換は $x_0$ の近くの情報だけを取り出す。
<!-- formal-statement-end -->

$\chi(x)e^{-ix\cdot\xi}$ は各 $\xi$ で試験関数なので、右辺は最初から定義されています。また $\rho$ と別の $\rho'$ の差は $\chi u$ の台の近くで零であるため、二つの作用の差は零になります。**$u$ 自体にはコンパクトな台を仮定していない**点が重要です。

<!-- definition-example-start: def-mica1-local-fourier -->
### 直接例：デルタを原点と別の点で切り出す

**定義の確認**。[$\delta_0$ の定義](../../GPDE/GPDE1/index.md#def-gpde1-dirac)に従い、$\langle\delta_0,\varphi\rangle=\varphi(0)$ です。従って

$$
\langle\chi\delta_0,\varphi\rangle
=\chi(0)\varphi(0),\qquad
\widehat{\chi\delta_0}(\xi)=\chi(0).
$$

原点の近くで $\chi=1$ なら全周波数で値が $1$ です。逆に $a\ne0$ の近傍だけを台とするcutoffなら $\chi(0)=0$ となり、$\chi\delta_0=0$、Fourier変換も恒等的に零です。局所化の定義、台、指数関数への作用をそれぞれ確認しました。
<!-- definition-example-end -->

### コンパクト支持の超関数で指数関数を扱える理由

[超関数の局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)は、コンパクト集合 $K$ 上の試験関数について、ある整数 $m\ge0$ と定数 $C$ で

$$
|\langle u,\varphi\rangle|
\le C\max_{|\alpha|\le m}\sup_{x\in K}|\partial_x^\alpha\varphi(x)|
$$

と評価できることを保証します。$\alpha=(\alpha_1,\ldots,\alpha_n)$ は[多重指数](../../GPDE/GPDE2/index.md#def-gpde2-multi-index)、$|\alpha|=\alpha_1+\cdots+\alpha_n$ です。$\chi$ のような固定cutoffを掛けると、この評価の対象はいつも同じコンパクト集合へ収まります。

<a id="prop-mica1-polynomial-growth"></a>

<!-- formal-statement-start -->
> **命題（コンパクト支持超関数のFourier変換の多項式増大）**  
> $T\in\mathcal D'(\mathbb R^n)$ の台がコンパクトであるとする。$\rho\in C_c^\infty(\mathbb R^n)$ は $\operatorname{supp}T$ の近傍で $1$ とし、

$$
\widehat T(\xi)=\langle T,\rho(x)e^{-ix\cdot\xi}\rangle
$$

> と置く。この関数は $\xi$ について $C^\infty$ であり、各多重指数 $\beta$ に対して、ある $C_\beta>0$ と整数 $m_\beta\ge0$ が存在し

$$
|\partial_\xi^\beta\widehat T(\xi)|
\le C_\beta(1+|\xi|)^{m_\beta}
\qquad(\xi\in\mathbb R^n)
$$

> を満たす。
<!-- formal-statement-end -->

指数関数を $x$ で微分すると $\xi$ の因子が一つ出ます。したがって有限階の超関数が周波数に関して多項式より激しく増大することはありません。ただし**多項式増大と急減少はまったく別の条件**です。

### 証明の見取り図

固定した $\rho$ の台で[超関数の局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)を使います。周波数微分は $x$ の多項式を掛けるだけなので、同じ評価を再利用できます。

<!-- proof-start -->
### 証明

$T$ の台を含むコンパクト集合 $K$ を $\rho$ の台として取り、[$T$ の局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)の次数を $m$ とします。$\xi$ の小さな増分 $h$ に対する変化を $h$ で割り、試験関数の $x$ 微分まで取ると、その式は $K$ 上の各 $C^m$ 半ノルムで収束します。例えば第 $j$ 成分に関しては

$$
\frac{e^{-ix\cdot(\xi+he_j)}-e^{-ix\cdot\xi}}{h}
\longrightarrow -ix_je^{-ix\cdot\xi}.
$$

$K$ 上では $x_j$ が有界であり、任意の $x$ 微分後も同じ収束が一様なので、[局所有限階評価](../../GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)により $\langle T,\cdot\rangle$ と極限を交換できます。繰り返して

$$
\partial_\xi^\beta\widehat T(\xi)
=\langle T,\rho(x)(-ix)^\beta e^{-ix\cdot\xi}\rangle
$$

を得ます。$x$ で $\alpha$ 回微分するとLeibniz則による有限和となり、各項は $\rho(x)(-ix)^\beta$ の $x$ 微分と $( -i\xi)^{\alpha-\gamma}$ の積です。前者は $K$ 上で有界、後者は次数 $|\alpha-\gamma|$ の多項式です。ゆえに

$$
\sup_{x\in K}
|\partial_x^\alpha\{\rho(x)(-ix)^\beta e^{-ix\cdot\xi}\}|
\le C_{\alpha,\beta}(1+|\xi|)^{|\alpha|}
$$

が成立します。$|\alpha|\le m$ の有限個について最大を取れば、$m_\beta=m$ として主張を得ます。$\square$
<!-- proof-end -->

特に $\widehat{\delta_0}=1$ はこの命題を満たしますが、周波数が大きくなっても減衰しません。

## 2. 微分は周波数側で何になるか

滑らかな関数の[Fourier変換と微分の公式](../../FOU/FOU3/index.md#thm-fou3-derivative-rule)は部分積分で得られました。超関数では古典微分を求められないことがありますが、[超関数微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)が既に部分積分の符号を吸収しています。

<a id="prop-mica1-fourier-derivative"></a>

<!-- formal-statement-start -->
> **命題（超関数微分のFourier表示）**  
> $\mathbb R^n$ 上のコンパクト支持超関数 $T$ と $j\in\{1,\ldots,n\}$ に対し、

$$
\widehat{\partial_{x_j}T}(\xi)=i\xi_j\widehat T(\xi).
$$

> 一般に多重指数 $\alpha$ について $\widehat{\partial_x^\alpha T}(\xi)=(i\xi)^\alpha\widehat T(\xi)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数を微分すると $-i\xi_j$ が出ます。超関数微分の定義でさらにマイナスが一つ付くため、最終結果は $+i\xi_j$ です。

<!-- proof-start -->
### 証明

$\rho\in C_c^\infty$ を $\operatorname{supp}T$ の近傍で $1$ とします。微分した超関数の台も $\operatorname{supp}T$ に含まれるので同じcutoffが使えます。[超関数微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を試験関数 $\rho e^{-ix\cdot\xi}$ へ適用すると

$$
\begin{aligned}
\widehat{\partial_{x_j}T}(\xi)
&=-\langle T,\partial_{x_j}(\rho e^{-ix\cdot\xi})\rangle\\
&=-\langle T,(\partial_{x_j}\rho)e^{-ix\cdot\xi}\rangle
 +i\xi_j\langle T,\rho e^{-ix\cdot\xi}\rangle.
\end{aligned}
$$

$\partial_{x_j}\rho$ は $T$ の台の近くで零なので第一項は零です。残るのが $i\xi_j\widehat T$ であり、一階公式を $|\alpha|$ 回繰り返せば一般形を得ます。$\square$
<!-- proof-end -->

**手計算**。$\langle\partial_x\delta_0,\varphi\rangle=-\varphi'(0)$ なので

$$
\widehat{\partial_x\delta_0}(\xi)
=\langle\partial_x\delta_0,\rho e^{-ix\xi}\rangle
=-\{\rho'(0)-i\xi\rho(0)\}=i\xi
$$

です。$\rho=1$ を原点近くで仮定したので $\rho'(0)=0$ でした。[微分のFourier表示](#prop-mica1-fourier-derivative)でも $\widehat{\delta_0}=1$ を代入して同じ答えになります。

## 3. 「どの多項式より速く減衰するか」

たとえば $\widehat{\chi\delta_0}=1$ は有界ですが、ゼロへ向かいません。一方、滑らかな関数をコンパクトに切り出すと、何回でも部分積分でき、どの次数の周波数因子も分母へ移せます。有限回の減衰ではなく、**任意の回数**を要求することが滑らかさの検出に効きます。

<a id="def-mica1-rapid-decay"></a>

<!-- formal-statement-start -->
> **定義（Fourier変換の急減少）**  
> 関数 $F:\mathbb R^n\to\mathbb C$ が急減少するとは、すべての整数 $N\ge0$ に対して定数 $C_N<\infty$ が存在し、すべての $\xi\in\mathbb R^n$ で

$$
|F(\xi)|\le C_N(1+|\xi|)^{-N}
$$

> が成立することをいう。この定義では $F$ 自身の減衰だけを要求し、そのすべての導関数にも同じ条件を課すより強い性質とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica1-rapid-decay -->
### 直接例：指数減衰と有限次数の冪減衰

**定義の確認**。$F(\xi)=e^{-|\xi|^2}$ とすると、$r\ge0$ で $(1+r)^Ne^{-r^2}$ は連続で、$r\to\infty$ では零へ向かいます。従って各 $N$ についてその上限を $C_N$ に取れ、全条件を満たします。

反対に $G(\xi)=(1+|\xi|^2)^{-2}$ は、$|\xi|=r\to\infty$ で $(1+r)^5|G(\xi)|\sim r$ となります。$N=5$ の上限が存在せず、$G$ は急減少ではありません。「零に収束する」と「急減少する」は異なります。
<!-- definition-example-end -->

<a id="thm-mica1-smooth-rapid"></a>

<!-- formal-statement-start -->
> **定理（コンパクト支持超関数のFourier急減少と滑らかさの同値）**  
> $T\in\mathcal D'(\mathbb R^n)$ の台がコンパクトであるとする。このとき、次の二条件は同値である。
>
> 1. $T$ はある $f\in C_c^\infty(\mathbb R^n)$ が定める正則超関数 $T_f$ に等しい。
> 2. $\widehat T$ は全方向で急減少する。すなわち、任意の整数 $N\ge0$ について $|\widehat T(\xi)|\le C_N(1+|\xi|)^{-N}$ となる定数 $C_N$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな関数からの向きは積分を何回でも部分積分します。逆向きは急減少を利用して逆Fourier積分を**各階微分できる関数**として作り、それが元の超関数と一致することを試験関数への作用で確かめます。後者では単に「反転定理より」とせず、分布の作用と積分の交換条件まで確認します。

<!-- proof-start -->
### 証明

**(1) から (2)。** $T=T_f$、$f\in C_c^\infty$ とします。$\Delta=\sum_{j=1}^n\partial_{x_j}^2$ をLaplacianとします。$f$ と全導関数がコンパクト支持なので、部分積分の境界項は零です。二回の微分を周波数側へ移すと

$$
\widehat{-\Delta f}(\xi)=|\xi|^2\widehat f(\xi).
$$

従って任意の整数 $k\ge0$ について

$$
(1+|\xi|^2)^k\widehat f(\xi)
=\widehat{(1-\Delta)^kf}(\xi).
$$

右辺は通常の絶対収束積分で、その絶対値は $\|(1-\Delta)^kf\|_{L^1}$ 以下です。$1+r^2\ge(1+r)^2/2$ を使えば

$$
|\widehat f(\xi)|
\le 2^k\|(1-\Delta)^kf\|_{L^1}(1+|\xi|)^{-2k}.
$$

任意の $N$ に対して $2k\ge N$ となる $k$ を選べるので急減少します。

**(2) から (1)。** $\widehat T$ が急減少するとき、逆Fourier積分

$$
f(x):=\frac1{(2\pi)^n}
\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat T(\xi)\,d\xi
$$

を考えます。任意の多重指数 $\alpha$ に対して $N>n+|\alpha|$ を選べば

$$
|\xi^\alpha\widehat T(\xi)|
\le C_N(1+|\xi|)^{|\alpha|-N}
$$

であり、右辺は $\mathbb R^n$ 上可積分です。従って積分を微分して

$$
\partial_x^\alpha f(x)
=\frac1{(2\pi)^n}\int_{\mathbb R^n}
(i\xi)^\alpha e^{ix\cdot\xi}\widehat T(\xi)\,d\xi
$$

とでき、各導関数は絶対収束積分の優収束定理によって連続です。よって $f\in C^\infty$ です。

残るのは、**構成した $f$ と $T$ が分布として一致すること**です。$\varphi\in C_c^\infty(\mathbb R^n)$ を任意に取り、$\widehat\varphi$ の急減少（既に証明した (1) から (2)）を使います。逆変換を各座標に適用して

$$
\varphi(x)=\frac1{(2\pi)^n}
\int_{\mathbb R^n}e^{ix\cdot\xi}\widehat\varphi(\xi)\,d\xi
$$

を得ます。一変数の[Fourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)は $\varphi$ と $\widehat\varphi$ が可積分かつ $\varphi$ が連続なので使え、$n$ 変数への反復では急減少によってFubiniの定理が使えます。

ここで $\rho=1$ が $\operatorname{supp}T$ の近くで成り立つコンパクト支持cutoffを選びます。$\langle T,\varphi\rangle=\langle T,\rho\varphi\rangle$ です。逆変換を $\rho$ 倍してから作用させると、[$T$ の有限階評価](#prop-mica1-polynomial-growth)により積分の打切りを外すことができます。実際、$x$ 微分を $m$ 回まで取った積分の絶対値は $\int(1+|\xi|)^m|\widehat\varphi(\xi)|\,d\xi<\infty$ により支配されます。従って

$$
\begin{aligned}
\langle T,\varphi\rangle
&=\frac1{(2\pi)^n}\int\widehat\varphi(\xi)
\langle T,\rho e^{ix\cdot\xi}\rangle\,d\xi\\
&=\frac1{(2\pi)^n}\int
\widehat\varphi(\xi)\widehat T(-\xi)\,d\xi.
\end{aligned}
$$

一方、$f$ の定義と絶対収束する二重積分を交換すると

$$
\begin{aligned}
\langle T_f,\varphi\rangle
&=\int f(x)\varphi(x)\,dx\\
&=\frac1{(2\pi)^n}\int\widehat T(\eta)
\left(\int e^{ix\cdot\eta}\varphi(x)\,dx\right)d\eta\\
&=\frac1{(2\pi)^n}\int\widehat T(\eta)\widehat\varphi(-\eta)\,d\eta.
\end{aligned}
$$

前式で $\eta=-\xi$ と変数を替えれば一致します。よって $T=T_f$ です。$T$ の台はコンパクトで、連続関数 $f$ がその外で零の分布を定めるなら $f$ は各点で零です（非零の点があれば小近傍の試験関数で検出できる）。従って $f$ 自身もコンパクト支持です。$\square$
<!-- proof-end -->

この定理は**全方向**の急減少を仮定しています。一つの方向だけ速く減衰しても、すべての導関数を復元できるわけではありません。その違いを次の MICA2 で扱います。

## 4. 滑らかさは一つの点の近くで判定できる

例えば $u=\delta_0$ は、原点を含むcutoffではFourier変換が $1$ でしたが、原点から離れた点を囲むcutoffでは零でした。これを点ごとの判定へ一般化します。

「あるcutoffが使える」という存在条件が大切です。任意のcutoffが特異点を含んでいるわけではありません。またcutoffの台がコンパクトというだけでは、どの点の情報を保持したかは決まりません。

<a id="def-mica1-local-criterion"></a>

<!-- formal-statement-start -->
> **定義（点での局所Fourier滑らかさ判定）**  
> $u\in\mathcal D'(\mathbb R^n)$ と $x_0\in\mathbb R^n$ に対し、$x_0$ のある開近傍で $\chi=1$ となる $\chi\in C_c^\infty(\mathbb R^n)$ が存在して $\widehat{\chi u}$ が全方向で急減少するとき、$u$ は $x_0$ で局所Fourier判定を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica1-local-criterion -->
### 直接例：同じデルタでも基点によって答えが変わる

**定義の確認**。$u=\delta_0$、$x_0=a\ne0$ とし、$a$ の周りの小球に台を持ち、その内側で $1$ となる $\chi$ を選びます。$\chi(0)=0$ なので $\widehat{\chi u}=0$ であり、任意の $N$ に $C_N=0$ を選べます。ゆえに $a$ では局所Fourier判定が成立します。

$x_0=0$ では、そこで $1$ となるどのcutoffに対しても $\widehat{\chi\delta_0}=1$ です。$N=1$ の急減少条件は満たせません。したがって原点では局所Fourier判定が成立しません。
<!-- definition-example-end -->

<a id="thm-mica1-local-smooth"></a>

<!-- formal-statement-start -->
> **定理（局所Fourier判定と点近傍での滑らかさの同値）**  
> $u\in\mathcal D'(\mathbb R^n)$、$x_0\in\mathbb R^n$ とする。次は同値である。
>
> 1. ある開近傍 $U$ と $f\in C^\infty(U)$ が存在し、$u$ と $T_f$ は $U$ に台を持つすべての試験関数への作用が等しい。
> 2. $u$ は $x_0$ で[局所Fourier判定](#def-mica1-local-criterion)を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな近傍があるなら、その中に台が収まるcutoffを置きます。反対向きではcutoff後の超関数を[急減少と滑らかさの同値](#thm-mica1-smooth-rapid)で関数に戻し、cutoffが $1$ である近傍へ制限します。

<!-- proof-start -->
### 証明

**(1) から (2)。** $U$ 上で $u=T_f$、$f\in C^\infty(U)$ とします。$x_0$ を含む開球の閉包が $U$ に収まるよう選び、その球に台を持ち $x_0$ の近傍で $1$ となる $\chi\in C_c^\infty$ を取ります。$\chi f$ を $U$ 外では零として延長すると $C_c^\infty(\mathbb R^n)$ に属します。任意の試験関数 $\varphi$ に対し

$$
\langle\chi u,\varphi\rangle
=\langle u,\chi\varphi\rangle
=\int_U f(x)\chi(x)\varphi(x)\,dx.
$$

従って $\chi u=T_{\chi f}$ です。[コンパクト支持超関数のFourier急減少と滑らかさの同値](#thm-mica1-smooth-rapid)から $\widehat{\chi u}$ は急減少します。

**(2) から (1)。** $\chi=1$ が $x_0$ を含む開近傍 $V$ で成立し、$\widehat{\chi u}$ が急減少するとします。$\chi u$ はコンパクト支持なので[同じ定理](#thm-mica1-smooth-rapid)によって $\chi u=T_g$、$g\in C_c^\infty(\mathbb R^n)$ です。$\operatorname{supp}\varphi\subset V$ の試験関数では $\chi\varphi=\varphi$ なので

$$
\langle u,\varphi\rangle
=\langle u,\chi\varphi\rangle
=\langle\chi u,\varphi\rangle
=\int_V g(x)\varphi(x)\,dx.
$$

従って $u$ は $V$ 上で滑らかな関数 $g$ と一致します。$\square$
<!-- proof-end -->

この定理から、注目点を囲む **一つの適切なcutoff** で急減少が分かれば十分です。また滑らかな近傍を得た後は、その内部に台を持つ別のcutoffについても急減少が従います。cutoffの形そのものではなく、どの近傍に限定したかが判定を決めます。

### 具体例：跳躍と尖点は減衰次数で違いが見える

一変数で $H(x)$ を $x>0$ で $1$、$x<0$ で $0$ とする関数とします。$\chi\in C_c^\infty(\mathbb R)$ を原点近くで $1$ とします。[Heavisideの超関数微分](../../GPDE/GPDE2/index.md#prop-gpde2-heaviside)と積の微分則を使うと

$$
(\chi H)'=\chi' H+\delta_0.
$$

$\chi'=0$ は原点近くで成立するので、$\chi'H\in C_c^\infty$ です。[微分のFourier表示](#prop-mica1-fourier-derivative)から

$$
i\xi\,\widehat{\chi H}(\xi)
=1+\widehat{\chi'H}(\xi).
$$

後者のFourier変換は[滑らかなコンパクト支持関数の急減少](#thm-mica1-smooth-rapid)を満たします。ゆえに $|\xi|\to\infty$ で

$$
\widehat{\chi H}(\xi)=\frac{1+o(1)}{i\xi}.
$$

もし $\widehat{\chi H}$ が急減少なら $|\xi\widehat{\chi H}(\xi)|\to0$ のはずですが、実際には右辺の絶対値は $1$ に近づきます。跳躍は消えていません。

一方 $v(x)=|x|$ は連続でも原点で微分可能ではありません。[跳躍を持つ関数の超関数微分公式](../../GPDE/GPDE2/index.md#prop-gpde2-jump-formula)を一次・二次と使うと $v'=\operatorname{sgn}(x)$、$v''=2\delta_0$ です。積の微分則を二回適用して

$$
(\chi v)''
=\chi''v+2\chi'\operatorname{sgn}(x)+2\delta_0.
$$

最初の二項は原点近くで零で、原点以外では滑らかなので $C_c^\infty$ です。従って

$$
(i\xi)^2\widehat{\chi |x|}(\xi)=2+o(1),\qquad
\widehat{\chi |x|}(\xi)=-\frac{2+o(1)}{\xi^2}.
$$

尖点は跳躍より速く減衰しますが、どちらも任意次数の減衰ではありません。この講義では「全方向かどうか」までを扱いました。次は周波数空間の**錐状の一部分**に限った評価を導入します。

## 5. 演習

### 演習 MICA1-A1：デルタとcutoff

- Level: A
- 目安時間: 8分

$a\in\mathbb R$、$u=\delta_a$、$\chi\in C_c^\infty(\mathbb R)$ とする。$\widehat{\chi u}$ を求め、(i) $\chi=1$ が $a$ 付近で成立する場合、(ii) $\chi$ の台が $a$ を含まない場合について急減少か判定せよ。

<!-- solution-start -->
#### 詳細解答

$\langle\delta_a,\varphi\rangle=\varphi(a)$ を局所化の定義に代入すると

$$
\langle\chi\delta_a,\varphi\rangle=\chi(a)\varphi(a),\qquad
\widehat{\chi\delta_a}(\xi)=\chi(a)e^{-ia\xi}.
$$

(i) では $\chi(a)=1$、従って絶対値は常に $1$ です。$N=1$ でも $(1+|\xi|)|\widehat{\chi u}|$ は非有界で、急減少ではありません。(ii) では $\chi(a)=0$、変換は恒等的に零で、すべての $N$ に対し $C_N=0$ が使えます。
<!-- solution-end -->

### 演習 MICA1-A2：滑らかな局所化の減衰

- Level: A
- 目安時間: 10分

$f(x)=e^{-x^2}$、$\chi\in C_c^\infty(\mathbb R)$ とし $h=\chi f$ とする。$h$ の台と滑らかさを確認し、部分積分により $|\widehat h(\xi)|\le C(1+|\xi|^2)^{-1}$ を示せ。

<!-- solution-start -->
#### 詳細解答

$f$ と $\chi$ は $C^\infty$ なので積も $C^\infty$、$\operatorname{supp}h\subset\operatorname{supp}\chi$ なのでコンパクト支持です。二階導関数 $h''$ も連続・コンパクト支持で $L^1$ に属します。境界項は零なので

$$
\widehat{h''}(\xi)=\int e^{-ix\xi}h''(x)\,dx
=(i\xi)^2\widehat h(\xi)=-\xi^2\widehat h(\xi).
$$

従って $(1+\xi^2)\widehat h=\widehat{h-h''}$ となります。絶対値を積分の中へ入れて評価すると

$$
|\widehat h(\xi)|
\le \frac{\|h-h''\|_{L^1}}{1+\xi^2}.
$$

$C=\|h-h''\|_{L^1}$ を取ればよいです。同じ手順を $(1-\partial_x^2)^k$ に繰り返せるため、実際には任意次数の減衰が得られます。
<!-- solution-end -->

### 演習 MICA1-A3：デルタの二階微分

- Level: A
- 目安時間: 8分

$T=\partial_x^2\delta_0$（$\mathbb R$ 上の超関数）について、試験関数への作用を出発点に $\widehat T(\xi)$ を求めよ。微分のFourier表示とも照合せよ。

<!-- solution-start -->
#### 詳細解答

[超関数微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を二回用いると、試験関数 $\varphi$ に対して

$$
\langle\partial_x^2\delta_0,\varphi\rangle
=(-1)^2\varphi''(0)=\varphi''(0).
$$

$\rho=1$ が原点近くで成立するcutoffを使えば、その近くで $\rho e^{-ix\xi}=e^{-ix\xi}$ なので

$$
\widehat T(\xi)=\left.\frac{d^2}{dx^2}e^{-ix\xi}\right|_{x=0}
=(-i\xi)^2=-\xi^2.
$$

一方[微分のFourier表示](#prop-mica1-fourier-derivative)に $\widehat{\delta_0}=1$ を代入しても $(i\xi)^2=-\xi^2$ です。符号は二回微分によって正に戻る分布の定義と、$(i\xi)^2$ の負号を別々に追いました。
<!-- solution-end -->

### 演習 MICA1-A4：跳躍の一次減衰

- Level: A
- 目安時間: 12分

$H(x)=\boldsymbol 1_{(0,\infty)}(x)$、$\chi\in C_c^\infty(\mathbb R)$ は原点の近傍で $1$ とする。$h=\chi H$ について $(i\xi)\widehat h(\xi)=1+\widehat{\chi'H}(\xi)$ を示し、$\widehat h$ が急減少でない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$H'=\delta_0$ を[Heavisideの超関数微分](../../GPDE/GPDE2/index.md#prop-gpde2-heaviside)から用います。積の定義を試験関数に適用してLeibniz則を確認すると

$$
h'=\chi'H+\chi H'=\chi'H+\chi(0)\delta_0=\chi'H+\delta_0.
$$

$\chi'=0$ が原点近くで成り立つので $\chi'H$ は滑らかなコンパクト支持関数です。[微分のFourier表示](#prop-mica1-fourier-derivative)を適用し

$$
i\xi\widehat h=\widehat{h'}=\widehat{\chi'H}+\widehat{\delta_0}
=\widehat{\chi'H}+1
$$

を得ます。[急減少と滑らかさの同値](#thm-mica1-smooth-rapid)から $\widehat{\chi'H}(\xi)\to0$。従って $|i\xi\widehat h|\to1$ です。もし $\widehat h$ が急減少なら $N=2$ の評価により $|\xi\widehat h|\le C_2|\xi|(1+|\xi|)^{-2}\to0$ となり矛盾します。
<!-- solution-end -->

### 演習 MICA1-B1：有限階評価から多項式増大へ

- Level: B
- 目安時間: 16分

$T\in\mathcal D'(\mathbb R)$ はコンパクト支持で、台の周りのcutoff $\rho$ と $m\ge0$、$C>0$ が存在し、任意の台が $\operatorname{supp}\rho$ に含まれる試験関数 $\varphi$ について $|\langle T,\varphi\rangle|\le C\max_{0\le j\le m}\|\varphi^{(j)}\|_\infty$ が成り立つとする。$\widehat T$ と $\partial_\xi\widehat T$ が高々 $m$ 次の多項式増大であることを示せ。

<!-- solution-start -->
#### 詳細解答

定義式に $\varphi(x)=\rho(x)e^{-ix\xi}$ を代入します。Leibniz則より

$$
\partial_x^j(\rho e^{-ix\xi})
=e^{-ix\xi}\sum_{k=0}^j\binom jk\rho^{(k)}(-i\xi)^{j-k}.
$$

$\rho$ の各導関数は有界であり、$j\le m$ の有限和は $C_j(1+|\xi|)^j$ 以下です。従って $|\widehat T(\xi)|\le C'(1+|\xi|)^m$ となります。次に

$$
\partial_\xi\widehat T(\xi)
=\langle T,-ix\rho(x)e^{-ix\xi}\rangle
$$

です。$x\rho(x)$ も $C_c^\infty$ なので、同じLeibniz評価を $\rho$ から $-ix\rho$ へ置き換えると $|\partial_\xi\widehat T|\le C''(1+|\xi|)^m$ です。周波数微分は空間変数 $x$ の乗算であり、$\xi$ の微分次数を多項式次数へ加える必要はありません。
<!-- solution-end -->

### 演習 MICA1-B2：二つのcutoff

- Level: B
- 目安時間: 18分

$u\in\mathcal D'(\mathbb R^n)$、$x_0\in\mathbb R^n$ とする。$\chi_1\in C_c^\infty$ が $x_0$ 近傍 $U$ で $1$、$\widehat{\chi_1u}$ が急減少とする。$\chi_2\in C_c^\infty$ は $\operatorname{supp}\chi_2\subset U$ とする。$\widehat{\chi_2u}$ も急減少することを示し、「任意のcutoffならよい」と言える範囲を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\chi_2$ の台では $\chi_1=1$ なので、試験関数 $\varphi$ について

$$
\langle\chi_2u,\varphi\rangle
=\langle u,\chi_2\varphi\rangle
=\langle\chi_1u,\chi_2\varphi\rangle.
$$

従って $\chi_2u=\chi_2(\chi_1u)$ です。仮定と[急減少と滑らかさの同値](#thm-mica1-smooth-rapid)から $\chi_1u=T_f$、$f\in C_c^\infty$ となります。$\chi_2u=T_{\chi_2f}$ で $\chi_2f\in C_c^\infty$ です。再び[同じ定理](#thm-mica1-smooth-rapid)を適用し、そのFourier変換の急減少を得ます。

これは **$\chi_2$ の台が $\chi_1=1$ の範囲へ収まる場合**の主張です。$U$ の外の別の特異点まで含むcutoffに対しては同じ結論を保証しません。
<!-- solution-end -->

### 演習 MICA1-B3：連続な尖点の周波数

- Level: B
- 目安時間: 20分

$v(x)=|x|$、$\chi\in C_c^\infty(\mathbb R)$ は原点近くで $1$ とする。$w=\chi v$ の二階超関数微分を求め、$|\xi|^2\widehat w(\xi)\to-2$ を示せ。なぜ $v$ は原点の近傍で滑らかでないと結論できるか。

<!-- solution-start -->
#### 詳細解答

$v'=\operatorname{sgn}(x)$ は $x\ne0$ で古典微分と一致し、$\operatorname{sgn}$ は $0$ で $-1$ から $1$ へ跳躍するので、[跳躍を持つ関数の超関数微分](../../GPDE/GPDE2/index.md#prop-gpde2-jump-formula)により $v''=2\delta_0$ です。Leibniz則を二回使うと

$$
w''=\chi''|x|+2\chi'\operatorname{sgn}(x)+2\chi(0)\delta_0.
$$

$\chi(0)=1$ です。$\chi'$ と $\chi''$ は原点近くで零であり、その外では $|x|$ と $\operatorname{sgn}(x)$ は滑らかです。ゆえに $q:=\chi''|x|+2\chi'\operatorname{sgn}(x)\in C_c^\infty$ です。[微分のFourier表示](#prop-mica1-fourier-derivative)を使うと

$$
-\xi^2\widehat w(\xi)=\widehat q(\xi)+2.
$$

$\widehat q(\xi)\to0$ なので $|\xi|^2\widehat w(\xi)\to-2$ です。もし $\widehat w$ が急減少なら $N=3$ により $\xi^2\widehat w\to0$ となり矛盾します。よって[局所判定定理](#thm-mica1-local-smooth)により原点では滑らかではありません。
<!-- solution-end -->

### 演習 MICA1-B4：逆Fourier積分の微分

- Level: B
- 目安時間: 20分

$F:\mathbb R^n\to\mathbb C$ は連続で、任意の整数 $N\ge0$ に対し $|F(\xi)|\le C_N(1+|\xi|)^{-N}$ を満たすとする。$f(x)=(2\pi)^{-n}\int e^{ix\cdot\xi}F(\xi)\,d\xi$ が $C^\infty$ であり、各導関数が有界であることを示せ。$N$ の選び方を明示せよ。

<!-- solution-start -->
#### 詳細解答

まず $N>n$ なら $(1+|\xi|)^{-N}$ は $\mathbb R^n$ 上可積分です。球座標で半径 $r\ge1$ の積分を評価すると $\int_1^\infty r^{n-1-N}\,dr<\infty$ だからです。よって $f$ は絶対収束積分として定義されます。

任意の多重指数 $\alpha$ を固定し、$N>n+|\alpha|$ とします。このとき

$$
|(i\xi)^\alpha F(\xi)|
\le C_N(1+|\xi|)^{|\alpha|-N}
$$

は可積分です。微分差分商を $|\xi_j|$ 倍の可積分関数で支配できるため優収束定理を反復適用でき、

$$
\partial_x^\alpha f(x)
=\frac1{(2\pi)^n}\int(i\xi)^\alpha e^{ix\cdot\xi}F(\xi)\,d\xi.
$$

積分内の指数因子の絶対値は $1$ なので、この導関数は $x$ に依らず

$$
\|\partial_x^\alpha f\|_\infty
\le (2\pi)^{-n} C_N
\int_{\mathbb R^n}(1+|\xi|)^{|\alpha|-N}\,d\xi<\infty.
$$

$x$ を変化させたときの連続性も同じ可積分関数による優収束から従います。$\alpha$ を任意に取れるため $f\in C^\infty$ です。
<!-- solution-end -->

### 演習 MICA1-C1：複数の点での特異性を切り分ける

- Level: C
- 目安時間: 30分

$a<b$ を実数とし、$u(x)=H(x-a)-2H(x-b)+e^{-x^2}$ を $\mathbb R$ 上の正則超関数とする。$H$ は $x>0$ で $1$、$x<0$ で $0$ となる関数とする。以下を示せ。

1. $x_0\notin\{a,b\}$ なら、$x_0$ 近傍で $1$ となるcutoff $\chi$ を選んで $\widehat{\chi u}$ を急減少にできる。
2. $a$ の十分小さい近傍に台を持ち $\chi=1$ が $a$ 近くで成り立つとき、$i\xi\widehat{\chi u}(\xi)=e^{-ia\xi}+R_a(\xi)$ で $R_a$ が急減少することを示せ。$b$ でも対応する式を求めよ。
3. $u$ が滑らかでない点をすべて決定し、(1) と (2) を局所判定定理に照らして説明せよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $x_0$ と $\{a,b\}$ の距離は正です。$\chi$ の台を $a,b$ を含まない十分小さな閉区間に収め、$x_0$ の近傍で $1$ にします。その区間上では各 $H(x-a),H(x-b)$ は定数関数なので、$\chi u$ は滑らかでコンパクト支持です。[急減少定理](#thm-mica1-smooth-rapid)より $\widehat{\chi u}$ は急減少します。

**(2)** $\operatorname{supp}\chi$ を $b$ と交わらない $a$ の小近傍に取ります。この近傍では $H(x-b)=0$ なので

$$
\chi u=\chi H(x-a)+\chi e^{-x^2}.
$$

超関数微分の積の公式と[$H'=\delta$](../../GPDE/GPDE2/index.md#prop-gpde2-heaviside)を組み合わせると

$$
(\chi u)'=\chi'H(x-a)+\delta_a+(\chi e^{-x^2})'.
$$

最初の項は $\chi'=0$ が $a$ の近傍で成り立つため滑らかなコンパクト支持関数であり、最後もそうです。両者の和を $q_a\in C_c^\infty$ とすると

$$
i\xi\widehat{\chi u}(\xi)
=\widehat{\delta_a}(\xi)+\widehat{q_a}(\xi)
=e^{-ia\xi}+\widehat{q_a}(\xi).
$$

$R_a=\widehat{q_a}$ は急減少です。$b$ でも同じように $a$ を避けるcutoffを選ぶと、$\chi u=-2\chi H(x-b)+\chi e^{-x^2}$ なので

$$
i\xi\widehat{\chi u}(\xi)
=-2e^{-ib\xi}+R_b(\xi),
$$

ただし $R_b$ は急減少です。

**(3)** $a$ では右辺の絶対値が $1$ に、$b$ では $2$ に近づきます。したがってどちらも $|\xi\widehat{\chi u}|\to0$ にはなりません。もし、より大きな別のcutoffで急減少できたと仮定すれば、[局所判定定理](#thm-mica1-local-smooth)によりその点の近傍で $u$ が滑らかになります。その場合は (2) の小cutoffでも急減少するはずですが、いま計算した漸近式に反します。よって、滑らかでない点の集合は正確に

$$
\{a,b\}
$$

です。(1) の減衰は位置を局所化したことで成立し、二つの跳躍をまとめた大域Fourier変換から推測したわけではありません。
<!-- solution-end -->

## 6. 何を得たか

今回得たのは「位置 $x_0$ の近くの滑らかさを、局所化した超関数の**全周波数方向での急減少**から判定する」方法です。デルタは減衰せず、跳躍は概ね一階、尖点は概ね二階の逆冪で減衰しました。

ただし、分布が同じ点で特定の方向だけ特異になることは、この判定だけでは表現できません。次の MICA2 では非零周波数ベクトルの周りの開いた錐を使い、MICA3 でその情報を波面集合へまとめます。
