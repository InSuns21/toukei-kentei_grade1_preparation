# PDE8 非斉次熱・波動方程式と時間方向の重ね合わせ

<!-- definition-example-audit: strict -->

PDE3 と PDE4 では主に斉次方程式を解きました。しかし現実のモデルでは、内部発熱・外力・電荷・入力のような非斉次項が入ります。

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
**定義の確認**：以下で定義の条件を直接確認します。

### 直接例：微分だけの方程式

$u'(t)=f(t)$, $u(0)=0$ なら自由発展は値をそのまま保つので、Duhamel 原理は

$$
u(t)=\int_0^t f(s)\,ds
$$

を与えます。微分すれば $u'=f$、$t=0$ で $u=0$ を直接確認できます。
<!-- definition-example-end -->

本章では時間発展作用の抽象的な一般論には進まず、PDE3 の [熱核](../PDE3/index.md#def-pde3-heat-kernel) と PDE4 の [d'Alembert 公式](../PDE4/index.md#thm-pde4-dalembert)から直接導きます。

## 1. 熱核を時間発展作用として書く

PDE3 では初期値 $f$ から時刻 $t$ の解を作るたびに、熱核との畳み込みを
数式で書いていました。非斉次問題ではこの操作を時刻 $s$ ごとに何度も使うため、そのままでは式が読みにくくなります。そこで「初期分布を時間 $t$ だけ自由に拡散させる操作」自体に $S(t)$ という記号を付けます。新しい解法を導入するのではなく、既習の熱核畳み込みを再利用しやすい形にまとめるものです。

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
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：定数はそのまま

$\int_{\mathbb R}G_t=1$ なので

$$
S(t)1=1.
$$

自由発展は「時刻 $t$ の間に熱が拡散した結果」を表します。
<!-- definition-example-end -->

$t=0$ では初期値をそのまま返す作用として

$$
S(0)f:=f
$$

と約束します。PDE3 の熱核の初期値再現性により、十分よい $f$ について $S(t)f\to f$ $(t\downarrow0)$ です。また Gaussian の畳み込みから

$$
S(t)S(s)=S(t+s)
$$

が成り立ちますが、本章では抽象的な半群論へ一般化しません。

## 2. 非斉次熱方程式

初期値だけなら $S(t)u_0$ で解けます。しかし非斉次項 $f(t,x)$ は時刻ごとに新しい熱を加えるので、初期時刻の一回の自由発展だけでは表せません。時刻 $s$ に加わった $f(s)$ を残り時間 $t-s$ だけ $S(t-s)$ で運び、それを全ての過去時刻について足すと何が起こるかを確認します。

<a id="thm-pde8-heat-duhamel"></a>
<!-- formal-statement-start -->
> **定理（非斉次熱方程式の Duhamel 公式）**  
> $T>0$ を固定する。$u_0,u_0',u_0''$ は $\mathbb R$ 上で有界連続とし、$f$ と $f_{xx}$ は $[0,T]\times\mathbb R$ 上で有界連続とする。

$$
u_t-\kappa u_{xx}=f,
\qquad
u(0,x)=u_0(x)
$$

> に対し、

$$
u(t)
=
S(t)u_0
+
\int_0^t S(t-s)f(s)\,ds
$$

> は $0\le t\le T$ の古典解を与える。
<!-- formal-statement-end -->

### 何を足しているのか

時刻 $s$ の短時間 $ds$ に非斉次項が $f(s)ds$ だけ温度を加えたとします。その寄与は残り時間 $t-s$ だけ自由に拡散し、

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

と置きます。まず $x$ 微分を確認します。$r>0$ に対し変数 $z=x-y$ を使えば

$$
(S(r)g)(x)
=
\int_{\mathbb R}G_r(z)g(x-z)\,dz.
$$

$g''$ が有界連続なら優収束により

$$
\partial_{xx}S(r)g
=
S(r)g''
$$

です。従って

$$
v_{xx}(t,x)
=
\int_0^t
(S(t-s)f_{xx}(s))(x)\,ds.
$$

次に時間微分を正当化します。$g,g''$ が有界連続なら、熱核が熱方程式を満たすことと上の空間微分交換から

$$
\frac d{dr}S(r)g
=
\kappa S(r)g'',
\qquad r>0.
$$

さらに熱核の初期値再現性から $S(r)g''\to g''$ $(r\downarrow0)$ なので、この式は右微分の意味で $r=0$ まで連続に延びます。

したがって $h>0$ に対し

$$
S(t+h-s)f(s)-S(t-s)f(s)
=
\kappa
\int_{t-s}^{t+h-s}
S(r)f_{xx}(s)\,dr.
$$

これを差商へ入れると

$$
\begin{aligned}
\frac{v(t+h)-v(t)}h
&=
\frac{\kappa}{h}
\int_0^t
\int_{t-s}^{t+h-s}
S(r)f_{xx}(s)\,dr\,ds\\
&\qquad
+
\frac1h
\int_t^{t+h}
S(t+h-s)f(s)\,ds.
\end{aligned}
$$

第一項の integrand は

$$
\|S(r)f_{xx}(s)\|_\infty
\le
\|f_{xx}\|_\infty
$$

で一様に抑えられます。各固定 $s<t$ では内側の平均が

$$
S(t-s)f_{xx}(s)
$$

へ収束するので、優収束により第一項は

$$
\kappa
\int_0^t
S(t-s)f_{xx}(s)\,ds
=
\kappa v_{xx}(t)
$$

へ収束します。

第二項では $s=t+h-r$ と置けば

$$
\frac1h
\int_0^h
S(r)f(t+h-r)\,dr.
$$

これが $f(t)$ へ近づく理由も分けて確認します。固定した $x$ で

$$
(S(r)f(t+h-r))(x)
=
\int_{\mathbb R}
G_r(z)f(t+h-r,x-z)\,dz
$$

です。$h\downarrow0$ では $0\le r\le h$ なので、時刻 $t+h-r$ は一様に $t$ へ近づきます。また $G_r$ の質量は $r\downarrow0$ で $z=0$ の近くへ集中します。

任意の $\varepsilon>0$ を固定します。$(t,x)$ における $f$ の連続性から、十分小さい $\delta>0$ と $h_0>0$ を選べば

$$
|t'-t|<h_0,
\qquad
|z|<\delta
$$

のとき

$$
|f(t',x-z)-f(t,x)|<\varepsilon
$$

です。$M:=\|f\|_\infty$ と置くと、$0<h<h_0$、$0\le r\le h$ について

$$
\begin{aligned}
&
|(S(r)f(t+h-r))(x)-f(t,x)|\\
&\le
\int_{|z|<\delta}
G_r(z)\varepsilon\,dz
+
\int_{|z|\ge\delta}
G_r(z)\,2M\,dz\\
&\le
\varepsilon
+
2M
\int_{|z|\ge\delta}G_r(z)\,dz.
\end{aligned}
$$

熱核の質量集中性より

$$
\sup_{0<r\le h}
\int_{|z|\ge\delta}G_r(z)\,dz
\longrightarrow0
\qquad(h\downarrow0).
$$

したがって上の収束は $0\le r\le h$ で一様であり、その $r$ 平均も

$$
\frac1h
\int_0^h
S(r)f(t+h-r)\,dr
\longrightarrow
f(t)
$$

となります。従って

$$
v_t
=
f+\kappa v_{xx}.
$$

初期データ項 $S(t)u_0$ についても同じ計算で

$$
\partial_tS(t)u_0
=
\kappa\partial_{xx}S(t)u_0
$$

が成り立ち、$t\downarrow0$ で $S(t)u_0\to u_0$ です。また $v(0,x)=0$ なので

$$
u(t)
=
S(t)u_0+v(t)
$$

は

$$
u_t-\kappa u_{xx}=f,
\qquad
u(0)=u_0
$$

を満たします。
<!-- proof-end -->

## 3. 一瞬だけ入る非斉次項は熱核そのものを作る

時刻 $s=s_0$ に空間分布 $g(x)$ を瞬間的に加えると、その後の応答は

$$
S(t-s_0)g
$$

です。Duhamel 公式は、この瞬間入力ごとの寄与を時間方向に重ね合わせています。一点へ集中した入力は通常の関数だけでは表せないため、その厳密な一般化は後の発展章で扱います。

## 4. 非斉次一次元波動方程式

波動方程式でも考え方は同じですが、入力の入り方が熱方程式とは異なります。時刻 $s$ に外力 $F(s,\cdot)$ が加わると、それは「その時刻で初速度を少し増やす」効果を持ち、その後は d'Alembert の自由波として左右へ伝わります。この一回分の応答を残り時間 $t-s$ で書き、過去の $s$ を積分します。

<a id="thm-pde8-wave-duhamel"></a>
<!-- formal-statement-start -->
> **定理（非斉次一次元波動方程式の Duhamel 公式）**  
> $T>0$ を固定し、$F$ と $F_x$ が $[0,T]\times\mathbb R$ 上で連続であるとする。零初期データ

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

時刻 $s$ の非斉次項 $F(s,\cdot)ds$ を「その時刻で速度を少し加える入力」と見ます。PDE4 の d'Alembert 公式で、初期変位0・初速度 $g$ の自由波は

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

と置きます。一回微分すると、Leibniz 則の上端項は

$$
w_{s=t}(0,x)=0
$$

なので消え、

$$
u_t(t,x)
=
\int_0^t
\partial_\tau w_s(t-s,x)\,ds
$$

となります。もう一度微分すると、今度の上端項は

$$
\partial_\tau w_{s=t}(0,x)=F(t,x)
$$

なので

$$
u_{tt}
=
F(t,x)
+
\int_0^t
\partial_{\tau\tau}w_s(t-s,x)\,ds.
$$

各 $w_s$ は斉次波動方程式を満たすため

$$
\partial_{\tau\tau}w_s=c^2\partial_{xx}w_s.
$$

よって $u_{tt}=F+c^2u_{xx}$。積分区間から $u(0)=u_t(0)=0$ も従います。
<!-- proof-end -->

一般初期データでは PDE4 の自由解をこの零初期データ解へ足します。

## 5. 半線形熱方程式への入口

次に、入力が外から与えられる関数 $f(t,x)$ ではなく、未知関数自身から

$$
u_t-\kappa u_{xx}=N(u)
$$

として生じる場合を考えます。線形 Duhamel 公式で $f(s)$ の位置へ $N(u(s))$ を入れると、求めるべき $u$ は積分方程式

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)N(u(s))\,ds
$$

を満たすはずです。

ただし、これは右辺にも未知関数 $u$ があるので、そのまま「公式」として計算できません。ODE1 の逐次近似と同じように、まず既知の近似 $u^{(n)}$ を右辺へ入れて次の近似 $u^{(n+1)}$ を作り、その差が本当に小さくなるかを調べます。

<a id="prop-pde8-semilinear-picard"></a>
<!-- formal-statement-start -->
> **命題（半線形熱方程式の Duhamel 反復評価）**  
> $u_0:\mathbb R\to\mathbb R$ を有界一様連続関数、$N:\mathbb R\to\mathbb R$ を大域 Lipschitz 関数とし、その Lipschitz 定数を $L$ とする。任意の $T>0$ を固定し、

$$
u^{(0)}(t)=S(t)u_0,
$$

$$
u^{(n+1)}(t)
=
S(t)u_0
+
\int_0^tS(t-s)N(u^{(n)}(s))\,ds
\qquad (n\ge0)
$$

> と定める。このとき

$$
d_n(t)
:=
\sup_{0\le r\le t}
\|u^{(n)}(r)-u^{(n-1)}(r)\|_\infty
\qquad(n\ge1)
$$

> は

$$
d_{n+1}(t)
\le
L\int_0^t d_n(s)\,ds
$$

> を満たす。特に $C_T:=d_1(T)$ とすれば

$$
d_n(T)
\le
C_T
\frac{(LT)^{n-1}}{(n-1)!},
\qquad n\ge1.
$$

> 従って $(u^{(n)})$ は $[0,T]\times\mathbb R$ 上で一様 Cauchy となり、Duhamel 積分方程式の一意な有界連続解へ一様収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界一様連続な $u_0$ に対しては、熱核が近似恒等作用素になることから

$$
\|S(t)u_0-u_0\|_\infty\to0
\qquad(t\downarrow0)
$$

です。従って $u^{(0)}(t)=S(t)u_0$ は $t=0$ でも上の極限を満たします。

また $G_{t-s}\ge0$ と

$$
\int_{\mathbb R}G_{t-s}(y)\,dy=1
$$

から、任意の有界関数 $h$ に対し

$$
\|S(t-s)h\|_\infty
\le
\|h\|_\infty
$$

です。

反復式の差を取ると

$$
u^{(n+1)}(t)-u^{(n)}(t)
=
\int_0^t
S(t-s)
\{N(u^{(n)}(s))-N(u^{(n-1)}(s))\}\,ds.
$$

従って Lipschitz 性から

$$
\begin{aligned}
\|u^{(n+1)}(t)-u^{(n)}(t)\|_\infty
&\le
\int_0^t
\|N(u^{(n)}(s))-N(u^{(n-1)}(s))\|_\infty\,ds\\
&\le
L\int_0^t
\|u^{(n)}(s)-u^{(n-1)}(s)\|_\infty\,ds\\
&\le
L\int_0^t d_n(s)\,ds.
\end{aligned}
$$

左辺の $0\le r\le t$ における上限を取れば

$$
d_{n+1}(t)
\le
L\int_0^t d_n(s)\,ds.
$$

$C_T=d_1(T)$ とします。$d_1(t)\le C_T$ なので、帰納法で

$$
d_n(t)
\le
C_T\frac{L^{n-1}t^{n-1}}{(n-1)!}
$$

を得ます。実際、これが $n$ で成り立つなら

$$
d_{n+1}(t)
\le
LC_T\int_0^t
\frac{L^{n-1}s^{n-1}}{(n-1)!}\,ds
=
C_T\frac{L^nt^n}{n!}.
$$

従って

$$
\sum_{n=1}^{\infty}d_n(T)
\le
C_T
\sum_{m=0}^{\infty}\frac{(LT)^m}{m!}
=
C_Te^{LT}
<\infty.
$$

よって $(u^{(n)})$ は一様 Cauchy です。その一様極限を $u$ とします。$N$ は Lipschitz なので

$$
N(u^{(n)})\to N(u)
$$

も一様であり、時間積分の極限を通して

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)N(u(s))\,ds
$$

を得ます。

最後に $u,v$ が同じ初期値を持つ二つの有界連続積分解なら

$$
\|u(t)-v(t)\|_\infty
\le
L\int_0^t
\|u(s)-v(s)\|_\infty\,ds.
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)を $a=0$ で適用すると差は0です。従って積分解は一意です。
<!-- proof-end -->

ここで示したのは、熱核を用いる積分方程式の構成と一意性までです。より抽象的な時間発展作用へ一般化する方法や、古典微分を仮定しない解概念との関係は、後の発展章で扱います。

## 演習

### Level A

#### PDE8-A01 定数非斉次項
- Level: A

$u_t-\kappa u_{xx}=1$, $u(0,x)=0$ の Duhamel 解を求めよ。

<!-- solution-start -->
##### 詳細解答

初期値は0なので、[非斉次熱方程式の Duhamel 公式](#thm-pde8-heat-duhamel)では自由発展項 $S(t)u_0$ は消えます。非斉次項は空間定数 $f(s,x)=1$ です。

熱核は全質量1なので

$$
(S(t-s)1)(x)
=
\int_{\mathbb R}G_{t-s}(x-y)\,dy
=
1.
$$

従って

$$
u(t,x)
=
\int_0^t(S(t-s)1)(x)\,ds
=
\int_0^t1\,ds
=
\boxed{t}.
$$

最後に方程式へ戻して確認します。

$$
u_t=1,
\qquad
u_{xx}=0,
$$

したがって

$$
u_t-\kappa u_{xx}=1.
$$

また $u(0,x)=0$ なので、初期条件も満たします。
<!-- solution-end -->

#### PDE8-A02 時間だけの非斉次項
- Level: A

$f(t,x)=e^{-t}$, $u_0=0$ の熱方程式を解け。

<!-- solution-start -->
##### 詳細解答

非斉次項は

$$
f(s,x)=e^{-s}
$$

で、$x$ に依存しません。熱核の全質量が1なので、任意の $r\ge0$ について

$$
S(r)f(s,\cdot)
=
e^{-s}S(r)1
=
e^{-s}.
$$

初期値 $u_0=0$ を Duhamel 公式へ代入すると

$$
\begin{aligned}
u(t,x)
&=
\int_0^t
S(t-s)f(s)\,ds\\
&=
\int_0^te^{-s}\,ds\\
&=
\boxed{1-e^{-t}}.
\end{aligned}
$$

この解は空間に依存しないため $u_{xx}=0$ です。また

$$
u_t=e^{-t},
$$

よって

$$
u_t-\kappa u_{xx}=e^{-t}=f(t,x).
$$

$t=0$ では $u=0$ となり、初期条件も確認できます。
<!-- solution-end -->

#### PDE8-A03 波動への一定入力
- Level: A

$u_{tt}-c^2u_{xx}=1$、零初期データの解を求めよ。

<!-- solution-start -->
##### 詳細解答

[非斉次一次元波動方程式の Duhamel 公式](#thm-pde8-wave-duhamel)へ $F(s,y)=1$ を代入します。

$$
u(t,x)
=
\frac1{2c}
\int_0^t
\int_{x-c(t-s)}^{x+c(t-s)}
1\,dy\,ds.
$$

固定した $s$ で内側の積分区間の長さは

$$
{x+c(t-s)}-{x-c(t-s)}
=
2c(t-s)
$$

なので

$$
\begin{aligned}
u(t,x)
&=
\frac1{2c}
\int_0^t2c(t-s)\,ds\\
&=
\int_0^t(t-s)\,ds\\
&=
\left[ts-\frac{s^2}{2}\right]_0^t\\
&=
\boxed{\frac{t^2}{2}}.
\end{aligned}
$$

検算すると

$$
u_{tt}=1,
\qquad
u_{xx}=0,
$$

したがって $u_{tt}-c^2u_{xx}=1$ です。また $u(0,x)=0$、$u_t(0,x)=0$ も満たします。
<!-- solution-end -->

#### PDE8-A04 自由発展との重ね合わせ
- Level: A

非零初期データと非斉次項が同時にある線形方程式で、なぜ解を二つに分けられるか説明せよ。

<!-- solution-start -->
##### 詳細解答

線形作用素を $L$ と書き、

$$
Lu=f,
\qquad
u(0)=u_0
$$

という問題を考えます。

まず $u_{\mathrm{free}}$ を

$$
Lu_{\mathrm{free}}=0,
\qquad
u_{\mathrm{free}}(0)=u_0
$$

を満たす自由発展とします。次に $u_{\mathrm{forced}}$ を

$$
Lu_{\mathrm{forced}}=f,
\qquad
u_{\mathrm{forced}}(0)=0
$$

を満たす非斉次応答とします。

線形性から

$$
L(u_{\mathrm{free}}+u_{\mathrm{forced}})
=
Lu_{\mathrm{free}}
+
Lu_{\mathrm{forced}}
=
0+f
=
f.
$$

初期値も

$$
(u_{\mathrm{free}}+u_{\mathrm{forced}})(0)
=
u_0+0
=
u_0
$$

です。

従って

$$
\boxed{
u
=
u_{\mathrm{free}}
+
u_{\mathrm{forced}}
}
$$

と分けてよいことが分かります。Duhamel 項は、このうち零初期データの $u_{\mathrm{forced}}$ を構成する部分です。
<!-- solution-end -->

### Level B

#### PDE8-B01 単一 Fourier モード 非斉次項
- Level: B

$0<x<\pi$ の零 Dirichlet 熱方程式
$$
u_t-u_{xx}=e^{-t}\sin x,
\qquad u(0,x)=0
$$
を単一モードで解け。

<!-- solution-start -->
##### 詳細解答

右辺が $\sin x$ だけを含むので、同じ空間モード

$$
u(t,x)=a(t)\sin x
$$

を仮定します。すると

$$
u_t=a'(t)\sin x,
\qquad
u_{xx}=-a(t)\sin x.
$$

方程式へ代入すると

$$
{a'(t)+a(t)}\sin x
=
e^{-t}\sin x.
$$

$0<x<\pi$ で $\sin x$ は恒等的に0ではないので、係数を比較して

$$
a'+a=e^{-t}.
$$

初期条件 $u(0,x)=0$ から

$$
a(0)=0.
$$

積分因子 $e^t$ を掛けると

$$
e^ta'+e^ta
=
(e^ta)'
=
1.
$$

$0$ から $t$ まで積分して

$$
e^ta(t)-a(0)
=
t.
$$

従って

$$
a(t)=te^{-t}.
$$

よって

$$
\boxed{
u(t,x)=te^{-t}\sin x
}.
$$

これは係数 ODE に対する Duhamel 公式

$$
a(t)
=
\int_0^t
e^{-(t-s)}e^{-s}\,ds
=
te^{-t}
$$

とも一致します。
<!-- solution-end -->

#### PDE8-B02 波動の依存領域
- Level: B

[非斉次一次元波動方程式の Duhamel 公式](#thm-pde8-wave-duhamel)から、点 $(t,x)$ の非斉次項依存領域を記述せよ。

<!-- solution-start -->
##### 詳細解答

Duhamel 公式は

$$
u(t,x)
=
\frac1{2c}
\int_0^t
\int_{x-c(t-s)}^{x+c(t-s)}
F(s,y)\,dy\,ds.
$$

です。したがって、固定した過去時刻 $s$ で参照する空間点 $y$ は

$$
x-c(t-s)
\le
y
\le
x+c(t-s),
$$

すなわち

$$
|y-x|
\le
c(t-s)
$$

を満たす点だけです。

よって $(t,x)$ に影響できる非斉次項の時空間領域は

$$
\boxed{
0\le s\le t,
\qquad
|y-x|\le c(t-s)
}
$$

です。これは頂点を $(t,x)$ とし、過去へ向かって傾き $\pm c$ で広がる後方特性領域です。

この領域の外で $F$ を変更しても積分値は変わらないため、$u(t,x)$ には影響しません。
<!-- solution-end -->

#### PDE8-B03 Picard 差評価
- Level: B

[半線形熱方程式の Duhamel 反復評価](#prop-pde8-semilinear-picard)で $d_1(T)\le C$ とする。$d_2(T)$ と $d_3(T)$ を実際に積分して評価し、階乗が現れる最初の二段を確認せよ。

<!-- solution-start -->
##### 詳細解答
まず

$$
d_2(t)
\le
L\int_0^td_1(s)\,ds
\le
LCt.
$$

次にこの評価をもう一度使うと

$$
d_3(t)
\le
L\int_0^td_2(s)\,ds
\le
L\int_0^tLCs\,ds
=
\frac{L^2Ct^2}{2}.
$$

従って $t=T$ で

$$
d_2(T)\le LCT,
\qquad
d_3(T)\le \frac{L^2CT^2}{2!}.
$$

積分を一段増やすたびに $t^n/n!$ が現れ、これが反復差の総和を指数級数で抑えられる理由です。
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

有限個の固有モードだけを使い、

$$
u(t)
=
\sum_{n=1}^N a_n(t)\phi_n,
\qquad
f(t)
=
\sum_{n=1}^N f_n(t)\phi_n
$$

と置きます。固有値方程式

$$
A\phi_n=\lambda_n\phi_n
$$

から

$$
Au
=
\sum_{n=1}^N
\lambda_na_n(t)\phi_n.
$$

また有限和なので時間微分は項別に行えて

$$
u_t
=
\sum_{n=1}^N
a_n'(t)\phi_n.
$$

したがって

$$
u_t+Au-f
=
\sum_{n=1}^N
{a_n'+\lambda_na_n-f_n}\phi_n.
$$

固有関数が一次独立なので、各 $n$ について

$$
a_n'+\lambda_na_n=f_n
$$

です。

この一変数非斉次線形方程式へ [非斉次線形系の定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)を、係数 $-\lambda_n$、入力 $f_n(t)$ として適用すると

$$
a_n(t)
=
e^{-\lambda_nt}a_n(0)
+
\int_0^t
e^{-\lambda_n(t-s)}f_n(s)\,ds.
$$

全モードを戻せば

$$
\begin{aligned}
u(t)
&=
\sum_{n=1}^N
e^{-\lambda_nt}a_n(0)\phi_n\\
&\quad+
\int_0^t
\sum_{n=1}^N
e^{-\lambda_n(t-s)}f_n(s)\phi_n
\,ds.
\end{aligned}
$$

第一項は初期値の自由発展、積分内の和は「時刻 $s$ の入力を残り時間 $t-s$ だけ自由発展させたもの」です。従って有限モードでも

$$
\boxed{
\text{自由発展}
+
\text{過去の入力の自由発展を時間積分}
}
$$

という Duhamel 構造がそのまま得られます。
<!-- solution-end -->

## 6. 章末チェック

- Duhamel 原理を「過去の入力の自由発展」と説明できる。
- 熱核から非斉次熱方程式の公式を証明できる。
- d'Alembert から非斉次波動方程式の公式を証明できる。
- 半線形問題の逐次近似評価を導ける。
