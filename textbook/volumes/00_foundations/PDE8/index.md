# PDE8 非斉次熱・波動方程式と時間方向の重ね合わせ

<!-- definition-example-audit: strict -->

PDE3 と PDE4 では主に斉次方程式を解きました。しかし現実のモデルでは、内部発熱・外力・電荷・入力のような source term が入ります。

ODE3 の [非斉次線形系の定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)では

$$
\text{自由発展}
+
\text{過去の各時刻に加わった入力の自由発展}
$$

という形が現れました。PDE でも「各時刻の入力を、その後の自由発展で運んでから足し合わせる」という同じ考えを使います。

<a id="def-pde8-duhamel-principle"></a>
<!-- formal-statement-start -->
> **定義（Duhamel 原理）**  
> 線形発展方程式で、時刻 $s$ に加わる入力を残り時間 $t-s$ だけ自由発展させ、その寄与を $0\le s\le t$ で積分して非斉次解を構成する考え方を、本章では Duhamel 原理と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde8-duhamel-principle -->
### 直接例：微分だけの方程式

$u'(t)=f(t)$, $u(0)=0$ なら自由発展は値をそのまま保つので、Duhamel 原理は

$$
u(t)=\int_0^t f(s)\,ds
$$

を与えます。微分すれば $u'=f$、$t=0$ で $u=0$ を直接確認できます。
<!-- definition-example-end -->

本章では抽象半群を前提にせず、PDE3 の [熱核](../PDE3/index.md#def-pde3-heat-kernel) と PDE4 の [d'Alembert 公式](../PDE4/index.md#thm-pde4-dalembert)から直接導きます。

## 1. 熱核を時間発展作用として書く

<a id="def-pde8-heat-propagator"></a>
<!-- formal-statement-start -->
> **定義（熱核による自由発展）**  
> 一次元熱方程式 $u_t=\kappa u_{xx}$, $\kappa>0$ に対し

$$
G_t(x)
=
\frac1{\sqrt{4\pi\kappa t}}
\exp\left(-\frac{x^2}{4\kappa t}\right),
\qquad t>0
$$

> とし、

$$
(S(t)f)(x)
:=
\int_{\mathbb R}G_t(x-y)f(y)\,dy
$$

> と定める。本章では $S(t)$ を熱核による自由発展と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde8-heat-propagator -->
### 具体例：定数はそのまま

$\int_{\mathbb R}G_t=1$ なので

$$
S(t)1=1.
$$

自由発展は「時刻 $t$ の間に熱が拡散した結果」を表します。
<!-- definition-example-end -->

Gaussian の畳み込みから

$$
S(t)S(s)=S(t+s)
$$

が成り立ちますが、本章では抽象的な半群論へ一般化しません。

## 2. 非斉次熱方程式

<a id="thm-pde8-heat-duhamel"></a>
<!-- formal-statement-start -->
> **定理（非斉次熱方程式の Duhamel 公式）**  
> $u_0$ と $f(t,x)$ が、以下の微分・積分交換を正当化できる十分滑らかさと減衰を持つとする。

$$
u_t-\kappa u_{xx}=f,
\qquad
u(0,x)=u_0(x)
$$

> の解は

$$
u(t)
=
S(t)u_0
+
\int_0^t S(t-s)f(s)\,ds
$$

> で与えられる。
<!-- formal-statement-end -->

### 何を足しているのか

時刻 $s$ の短時間 $ds$ に source が $f(s)ds$ だけ温度を加えたとします。その寄与は残り時間 $t-s$ だけ自由に拡散し、

$$
S(t-s)f(s)ds
$$

となります。$s=0$ から $t$ まで全部足したものが Duhamel 項です。

### 証明の見取り図

初期データ項は PDE3 です。積分項を $v$ と置き、上端微分から $f(t)$ が一つ出ることと、内部微分が $\kappa\partial_{xx}$ に変わることを確認します。

<!-- proof-start -->
### 証明

$$
v(t,x)
=
\int_0^t(S(t-s)f(s))(x)\,ds
$$

と置きます。積分上端を含む微分公式により

$$
v_t(t,x)
=
f(t,x)
+
\int_0^t
\partial_t(S(t-s)f(s))(x)\,ds.
$$

熱核は自由熱方程式を満たすので

$$
\partial_tS(t-s)f(s)
=
\kappa\partial_{xx}S(t-s)f(s).
$$

よって

$$
v_t=f+\kappa v_{xx}.
$$

また積分区間の長さが0になるため $v(0,x)=0$。一方 $S(t)u_0$ は斉次熱方程式を満たし初期値 $u_0$ を持つので、和が主張の初期条件を満たします。
<!-- proof-end -->

## 3. 一瞬だけ入る source は熱核そのものを作る

時刻 $s=s_0$ に空間分布 $g(x)$ を瞬間的に加えると、その後の応答は

$$
S(t-s_0)g
$$

です。Duhamel 公式は、この瞬間入力ごとの寄与を時間方向に重ね合わせています。点へ集中する入力を厳密化する理論は GPDE1 へ送ります。

## 4. 非斉次一次元波動方程式

<a id="thm-pde8-wave-duhamel"></a>
<!-- formal-statement-start -->
> **定理（非斉次一次元波動方程式の Duhamel 公式）**  
> 十分滑らかな $F$ に対し、零初期データ

$$
u_{tt}-c^2u_{xx}=F(t,x),
\qquad
u(0,x)=u_t(0,x)=0
$$

> を満たす解は

$$
u(t,x)
=
\frac1{2c}
\int_0^t
\int_{x-c(t-s)}^{x+c(t-s)}
F(s,y)\,dy\,ds
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $s$ の source $F(s,\cdot)ds$ を「その時刻で速度を少し加える入力」と見ます。PDE4 の d'Alembert 公式で、初期変位0・初速度 $g$ の自由波は

$$
\frac1{2c}\int_{x-ct}^{x+ct}g(y)dy
$$

です。残り時間 $t-s$ を使い、全ての $s$ を積分します。

<!-- proof-start -->
### 証明

固定した $s$ に対し

$$
w_s(\tau,x)
=
\frac1{2c}
\int_{x-c\tau}^{x+c\tau}F(s,y)dy
$$

は $\tau>0$ で斉次波動方程式を満たし、

$$
w_s(0,x)=0,
\qquad
\partial_\tau w_s(0,x)=F(s,x).
$$

そこで

$$
u(t,x)=\int_0^t w_s(t-s,x)ds
$$

と置きます。一回微分すると上端 $w_t(0,x)=0$ なので境界項は消えます。二回微分すると

$$
u_{tt}
=
F(t,x)
+
\int_0^t
\partial_{\tau\tau}w_s(t-s,x)ds.
$$

各 $w_s$ は斉次波動方程式を満たすため

$$
\partial_{\tau\tau}w_s=c^2\partial_{xx}w_s.
$$

よって $u_{tt}=F+c^2u_{xx}$。積分区間から $u(0)=u_t(0)=0$ も従います。
<!-- proof-end -->

一般初期データでは PDE4 の自由解をこの零初期データ解へ足します。

## 5. 半線形熱方程式への入口

$$
u_t-\kappa u_{xx}=N(u)
$$

では形式的に

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)N(u(s))ds.
$$

右辺にも未知関数 $u$ が現れるので、ODE1 の逐次近似と同じ発想を使います。

<a id="prop-pde8-semilinear-picard"></a>
<!-- formal-statement-start -->
> **命題（半線形熱方程式の Duhamel 反復評価）**  
> $N:\mathbb R\to\mathbb R$ が Lipschitz 定数 $L$ を持つとする。反復列

$$
u_{n+1}(t)
=
S(t)u_0
+
\int_0^tS(t-s)N(u_n(s))ds
$$

> を考える。熱核の全質量が1であることから

$$
\sup_x|u_{n+1}(t,x)-u_n(t,x)|
\le
L\int_0^t
\sup_x|u_n(s,x)-u_{n-1}(s,x)|ds.
$$

> 従って短時間ではこの逐次近似が一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差を取ると

$$
u_{n+1}-u_n
=
\int_0^t
S(t-s)
\{N(u_n)-N(u_{n-1})\}ds.
$$

$G_{t-s}\ge0$ と $\int G_{t-s}=1$ から

$$
\|S(t-s)h\|_\infty\le\|h\|_\infty.
$$

さらに $N$ の 仮定した一様差評価を使えば主張の積分評価を得ます。反復すると

$$
\|u_{n+1}-u_n\|_{[0,T],\infty}
\le
\frac{(LT)^n}{n!}C
$$

という階乗型評価が得られ、級数 $\sum (LT)^n/n!$ の収束から一様 Cauchy 性が従います。極限が積分方程式を満たすことは一様収束と 非線形項の連続性から極限を通して確認できます。
<!-- proof-end -->

ここでは積分方程式の構成までを古典論の bridge とします。一般半群上の積分方程式としての解概念は Encore III 後続 Track A、弱解は GPDE10 の正本を使います。

## 演習

### Level A

#### PDE8-A01 定数 source
- Level: A

$u_t-\kappa u_{xx}=1$, $u(0,x)=0$ の Duhamel 解を求めよ。

<!-- solution-start -->
##### 詳細解答
$S(t-s)1=1$ なので
$$
u(t,x)=\int_0^t1ds=t.
$$
直接代入して $u_t=1,u_{xx}=0$ も確認できます。
<!-- solution-end -->

#### PDE8-A02 時間だけの source
- Level: A

$f(t,x)=e^{-t}$, $u_0=0$ の熱方程式を解け。

<!-- solution-start -->
##### 詳細解答
空間定数は自由発展で不変なので
$$
u(t)=\int_0^te^{-s}ds=1-e^{-t}.
$$
<!-- solution-end -->

#### PDE8-A03 波動への一定入力
- Level: A

$u_{tt}-c^2u_{xx}=1$、零初期データの解を求めよ。

<!-- solution-start -->
##### 詳細解答
公式へ入れると内側積分の長さは $2c(t-s)$ なので
$$
u=\frac1{2c}\int_0^t2c(t-s)ds=\frac{t^2}{2}.
$$
<!-- solution-end -->

#### PDE8-A04 自由発展との重ね合わせ
- Level: A

非零初期データと source が同時にある線形方程式で、なぜ解を二つに分けられるか説明せよ。

<!-- solution-start -->
##### 詳細解答
線形性により、初期データだけを持つ斉次解と、零初期データで source だけを持つ解の和は、両方のデータを持つ方程式を満たします。
<!-- solution-end -->

### Level B

#### PDE8-B01 単一 Fourier mode source
- Level: B

$0<x<\pi$ の零 Dirichlet 熱方程式
$$
u_t-u_{xx}=e^{-t}\sin x,
\qquad u(0,x)=0
$$
を単一モードで解け。

<!-- solution-start -->
##### 詳細解答
$u=a(t)\sin x$ と置くと $a'+a=e^{-t}$, $a(0)=0$。積分因子 $e^t$ から $(e^ta)'=1$、従って $a=te^{-t}$。これはモード版 Duhamel そのものです。
<!-- solution-end -->

#### PDE8-B02 波動の依存領域
- Level: B

[非斉次一次元波動方程式の Duhamel 公式](#thm-pde8-wave-duhamel)から、点 $(t,x)$ の source 依存領域を記述せよ。

<!-- solution-start -->
##### 詳細解答
積分は $0\le s\le t$ と $|y-x|\le c(t-s)$ の範囲だけを使います。従って後方特性領域だけが $(t,x)$ に影響します。
<!-- solution-end -->

#### PDE8-B03 Picard 差評価
- Level: B

命題の反復評価を二回繰り返し、$\|u_2-u_1\|$ と $\|u_3-u_2\|$ に現れる $T$ の次数を確認せよ。

<!-- solution-start -->
##### 詳細解答
$D_n(t)=\sup_x|u_n-u_{n-1}|$ とする。$D_{n+1}(t)\le L\int_0^tD_n(s)ds$。$D_1\le C$ なら $D_2\le LCt$、さらに $D_3\le L^2Ct^2/2$。積分を繰り返すことで階乗が現れます。
<!-- solution-end -->

### Level C

#### PDE8-C01 ODE と PDE の入力応答を統合する
- Level: C

有限区間の固有関数 $\phi_n$ が $-\phi_n''=\lambda_n\phi_n$ を満たすとする。
$$
u_t+Au=f,
\qquad
u(0)=u_0
$$
を有限個の固有モードに展開し、各係数について [非斉次線形系の定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)を使い Duhamel 形を導け。

<!-- solution-start -->
##### 詳細解答
$u=\sum a_n(t)\phi_n$, $f=\sum f_n(t)\phi_n$ と置くと
$$
a_n'+\lambda_na_n=f_n.
$$
[非斉次線形系の定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)より
$$
a_n(t)=e^{-\lambda_nt}a_n(0)+\int_0^te^{-\lambda_n(t-s)}f_n(s)ds.
$$
全モードを戻すと、自由発展と source の自由発展の時間積分という Duhamel 構造が得られます。
<!-- solution-end -->

## 6. 章末チェック

- Duhamel 原理を「過去の入力の自由発展」と説明できる。
- 熱核から非斉次熱方程式の公式を証明できる。
- d'Alembert から非斉次波動方程式の公式を証明できる。
- 半線形問題の逐次近似評価を導ける。
