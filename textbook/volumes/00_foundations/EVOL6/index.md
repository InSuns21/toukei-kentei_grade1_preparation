# EVOL6 半線形発展方程式・局所解・continuation criterion

<!-- definition-example-audit: strict -->

EVOL4 では、線形外力つきの抽象 Cauchy 問題を

$$
u'(t)=Au(t)+f(t)
$$

から

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)f(s)\,ds
$$

へ落としました。EVOL5 では、analytic semigroup を使うと正の時刻で smoothing が起きることも見ました。

ここまでの外力 $f(t)$ は、時刻が決まれば既に与えられていました。本章では外力自身が未知関数に依存する

$$
u'(t)=Au(t)+F(u(t)),
\qquad
u(0)=u_0
$$

を考えます。

すると Duhamel 公式は解の表示式ではなく、

$$
u
\longmapsto
\Phi(u)
$$

という **不動点問題** に変わります。

本章の流れは

$$
\boxed{
\text{線形半群}
\to
\text{非線形 Duhamel 写像}
\to
\text{局所不動点}
\to
\text{再出発}
\to
\text{最大存在時間}
\to
\text{continuation / blow-up alternative}
}
$$

です。

ただし無限次元では一つ注意があります。各点の近くで Lipschitz というだけでは、ノルム有界な初期値すべてに共通する再出発時間が自動的に出るとは限りません。有限次元で「有界集合はだいたいコンパクト」と考えていた感覚を、そのまま Banach 空間へ持ち込まないことが重要です。

---

## 1. 強連続半群は有限時間区間では作用素ノルムも有界

$X$ を Banach 空間、$A:D(A)\subset X\to X$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素とします。

固定した $\tau>0$ に対して、各 $x\in X$ では

$$
t\longmapsto T(t)x
$$

が $[0,\tau]$ 上連続です。したがって

$$
\sup_{0\le t\le\tau}\|T(t)x\|<\infty.
$$

つまり作用素族

$$
\{T(t):0\le t\le\tau\}
$$

は各入力ごとに有界です。[一様有界性原理](../FA1/index.md#thm-fa1-uniform-boundedness)を適用すると

$$
M_\tau
:=
\sup_{0\le t\le\tau}\|T(t)\|
<
\infty
$$

を得ます。

この $M_\tau$ が、非線形 Duhamel 項を評価するときの基本定数です。

---

## 2. 半線形方程式を mild formulation へ落とす

線形方程式

$$
u'=Au+f
$$

では EVOL4 の Duhamel 公式が使えました。半線形方程式では単に

$$
f(t)=F(u(t))
$$

と置きます。

<a id="def-evol6-semilinear-mild"></a>
<!-- formal-statement-start -->
### 定義（半線形発展方程式の mild 解）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素、$F:X\to X$、$u_0\in X$、$\tau>0$ とする。

関数

$$
u\in C([0,\tau];X)
$$

が、すべての $0\le t\le\tau$ について

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)F(u(s))\,ds
$$

を満たすとき、$u$ を半線形発展方程式

$$
u'=Au+F(u),
\qquad
u(0)=u_0
$$

の **mild 解**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol6-semilinear-mild -->
### **定義の確認**：$X=\mathbb R$, $A=0$, $F(u)=u^2$

このとき

$$
T(t)=I
$$

なので mild 方程式は

$$
u(t)
=
u_0+\int_0^t u(s)^2\,ds
$$

です。

右辺が微分可能なら微分して

$$
u'(t)=u(t)^2
$$

へ戻ります。逆に古典解を積分すれば同じ mild 式が得られます。

この最小例では半群部分は何もしませんが、「非線形微分方程式を積分方程式の不動点として扱う」という本章の骨格がそのまま見えています。
<!-- definition-example-end -->

mild 解を探すとは、

$$
(\Phi u)(t)
=
T(t)u_0
+
\int_0^tT(t-s)F(u(s))\,ds
$$

で定まる **非線形 Duhamel 写像** $\Phi$ の不動点

$$
\Phi u=u
$$

を探すことです。

---

## 3. 局所 Lipschitz と bounded-ball Lipschitz を分ける

局所不動点では、非線形項の差を一次で抑えます。

<a id="def-evol6-local-lipschitz"></a>
<!-- formal-statement-start -->
### 定義（局所 Lipschitz 非線形項）

$X$ を Banach 空間、$F:X\to X$ とする。

任意の $x\in X$ に対して、ある $r_x>0$ と $L_x\ge0$ が存在し、

$$
\|y-x\|<r_x,
\qquad
\|z-x\|<r_x
$$

なら

$$
\|F(y)-F(z)\|
\le
L_x\|y-z\|
$$

が成り立つとき、$F$ は **局所 Lipschitz** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol6-local-lipschitz -->
### **定義の確認**：実数上の二次非線形項

$X=\mathbb R$ とし、

$$
F(x)=x^2
$$

を考えます。任意の $x_0\in\mathbb R$ を固定し、

$$
|y-x_0|<1,
\qquad
|z-x_0|<1
$$

とします。このとき

$$
|y|,|z|
\le
|x_0|+1.
$$

したがって

$$
\begin{aligned}
|F(y)-F(z)|
&=
|y^2-z^2|\\
&=
|y+z|\,|y-z|\\
&\le
2(|x_0|+1)|y-z|.
\end{aligned}
$$

よって $x_0$ の半径1の近傍では

$$
L_{x_0}=2(|x_0|+1)
$$

を Lipschitz 定数として取れます。$x_0$ は任意なので $F(x)=x^2$ は局所 Lipschitz です。
<!-- definition-example-end -->

局所存在だけならこの条件で十分です。しかし continuation では「ノルムが $R$ 以下のどの点から再出発しても、同じ長さだけ解ける」ことが欲しくなります。

そこで本章では次の強い条件も分けて使います。

<a id="def-evol6-bounded-ball-lipschitz"></a>
<!-- formal-statement-start -->
### 定義（bounded-ball Lipschitz 非線形項）

$X$ を Banach 空間、$F:X\to X$ とする。

任意の $R>0$ に対して定数 $L_R\ge0$ が存在し、

$$
\|x\|\le R,
\qquad
\|y\|\le R
$$

なら

$$
\|F(x)-F(y)\|
\le
L_R\|x-y\|
$$

が成り立つとき、$F$ は **bounded-ball Lipschitz** であるという。
<!-- formal-statement-end -->

bounded-ball Lipschitz なら局所 Lipschitz です。さらに

$$
\|F(x)\|
\le
\|F(0)\|+L_RR
\qquad
(\|x\|\le R)
$$

なので、各有界球上で $F$ 自身も一様有界です。

<!-- definition-example-start: def-evol6-bounded-ball-lipschitz -->
### **定義の確認**：$F(x)=\|x\|x$

任意の Banach 空間 $X$ で

$$
F(x)=\|x\|x
$$

とします。$\|x\|,\|y\|\le R$ なら

$$
\begin{aligned}
\|F(x)-F(y)\|
&=
\|\|x\|x-\|y\|y\|\\
&\le
\|x\|\,\|x-y\|
+
|\|x\|-\|y\||\,\|y\|\\
&\le
R\|x-y\|+R\|x-y\|\\
&=
2R\|x-y\|.
\end{aligned}
$$

最後から二行目では逆三角不等式

$$
|\|x\|-\|y\||
\le
\|x-y\|
$$

を使いました。

したがって $F$ は bounded-ball Lipschitz で、半径 $R$ の球では

$$
L_R=2R
$$

と取れます。
<!-- definition-example-end -->

有限次元では、局所 Lipschitz 条件からコンパクト集合上の一様な制御を作りやすい一方、無限次元では閉有界球が一般にコンパクトではありません。そのため blow-up alternative を「ノルムだけ」で述べたいときは、bounded-ball Lipschitz のような一様性を明示しておくのが安全です。

---

## 4. 非線形 Duhamel 写像を閉球へ閉じ込める

局所存在の核心は、「十分小さい $T$」を記号で済ませないことです。

初期値 $u_0$ を固定します。局所 Lipschitz 性から $u_0$ に対する半径 $r_{u_0}>0$ と定数 $L\ge0$ が得られます。そこで例えば

$$
0<r<r_{u_0}
$$

を一つ固定します。このとき閉球

$$
\overline B(u_0,r)
=
\{x\in X:\|x-u_0\|\le r\}
$$

の任意の2点は $u_0$ の Lipschitz 近傍に入るので、

$$
\|F(x)-F(y)\|
\le
L\|x-y\|
$$

が成り立つよう $r>0$ を選びます。

すると同じ球上で

$$
\|F(x)\|
\le
\|F(u_0)\|+Lr
=:K
$$

です。

強連続性から

$$
T(t)u_0\to u_0
\qquad
(t\downarrow0)
$$

なので、十分小さい $T_1>0$ に対して

$$
\sup_{0\le t\le T_1}
\|T(t)u_0-u_0\|
\le
\frac r2
$$

とできます。

また

$$
M
=
\sup_{0\le t\le T_1}\|T(t)\|
<
\infty
$$

です。

関数空間

$$
Y_T
=
\left\{
u\in C([0,T];X):
\sup_{0\le t\le T}\|u(t)-u_0\|\le r
\right\}
$$

を一様ノルムで考えます。これは Banach 空間 $C([0,T];X)$ の閉集合なので完備です。

$u\in Y_T$ に対して

$$
\begin{aligned}
\|(\Phi u)(t)-u_0\|
&\le
\|T(t)u_0-u_0\|
+
\int_0^t
\|T(t-s)\|\,
\|F(u(s))\|\,ds\\
&\le
\frac r2
+
MTK.
\end{aligned}
$$

したがって

$$
MTK\le\frac r2
$$

なら $\Phi(Y_T)\subset Y_T$ です。

さらに $u,v\in Y_T$ なら

$$
\begin{aligned}
\|\Phi u-\Phi v\|_\infty
&\le
\sup_{0\le t\le T}
\int_0^t
\|T(t-s)\|
\|F(u(s))-F(v(s))\|\,ds\\
&\le
MLT\|u-v\|_\infty.
\end{aligned}
$$

よって

$$
MLT<1
$$

なら $\Phi$ は縮小写像です。

---

<a id="thm-evol6-local-wellposedness"></a>
<!-- formal-statement-start -->
### 定理（半線形発展方程式の局所存在一意性）

$X$ を Banach 空間、$A$ を強連続半群 $(T(t))_{t\ge0}$ の生成作用素、$F:X\to X$ を局所 Lipschitz とする。

このとき任意の $u_0\in X$ に対して、ある $T>0$ が存在し、

$$
u\in C([0,T];X)
$$

である mild 解が一意に存在する。
<!-- formal-statement-end -->

### 証明の見取り図

前節の $Y_T$ 上で

$$
\Phi u
=
T(\cdot)u_0
+
\int_0^{\cdot}
T(\cdot-s)F(u(s))\,ds
$$

を考えます。

時間幅を

$$
T
\le
T_1,
\qquad
MTK\le\frac r2,
\qquad
MLT\le\frac12
$$

となるように選べば、$\Phi$ は完備距離空間 $Y_T$ を自分自身へ写す縮小写像になります。

<!-- proof-start -->
### 証明

前節の記号を用います。

具体的に

$$
T
=
\min\left\{
T_1,
\frac{r}{2M(K+1)},
\frac{1}{2M(L+1)}
\right\}
$$

と取れば $T>0$ であり、

$$
MTK
\le
\frac r2,
$$

かつ

$$
MLT
\le
\frac12
<
1
$$

です。

したがって $\Phi:Y_T\to Y_T$ であり、

$$
\|\Phi u-\Phi v\|_\infty
\le
\frac12\|u-v\|_\infty.
$$

任意の $u^{(0)}\in Y_T$ から

$$
u^{(n+1)}
=
\Phi u^{(n)}
$$

と反復します。すると

$$
\|u^{(n+1)}-u^{(n)}\|_\infty
\le
2^{-n}
\|u^{(1)}-u^{(0)}\|_\infty.
$$

$m>n$ なら三角不等式から

$$
\begin{aligned}
\|u^{(m)}-u^{(n)}\|_\infty
&\le
\sum_{k=n}^{m-1}
\|u^{(k+1)}-u^{(k)}\|_\infty\\
&\le
\sum_{k=n}^{\infty}
2^{-k}
\|u^{(1)}-u^{(0)}\|_\infty\\
&=
2^{1-n}
\|u^{(1)}-u^{(0)}\|_\infty.
\end{aligned}
$$

従って $(u^{(n)})$ は Cauchy 列です。$Y_T$ は完備なので、ある $u\in Y_T$ へ一様収束します。

$\Phi$ は Lipschitz 連続なので

$$
u^{(n+1)}
=
\Phi u^{(n)}
\longrightarrow
\Phi u.
$$

一方 $u^{(n+1)}\to u$ ですから

$$
u=\Phi u.
$$

従って $u$ は mild 解です。

一意性について、同じ初期値を持つ二つの mild 解 $u,v$ を取ります。連続性から、十分小さい共通時間区間では両方とも $\overline B(u_0,r)$ に入ります。その区間では

$$
\|u-v\|_\infty
=
\|\Phi u-\Phi v\|_\infty
\le
\frac12\|u-v\|_\infty,
$$

よって $u=v$ です。

もし共通存在区間の途中まで一致しているなら、その一致時刻を新しい初期時刻として同じ局所議論を繰り返せます。従って共通存在区間全体で一意です。$\square$
<!-- proof-end -->

ここで重要なのは、存在時間 $T$ が

- 半群の有限時間作用素ノルム上界 $M$、
- $F$ の局所 Lipschitz 定数 $L$、
- $F$ の局所有界性 $K$、
- 初期値の近くに取った半径 $r$

から決まることです。

---

## 5. mild 解は途中時刻から再出発できる

最大存在時間を考える前に、再出発の式を作ります。

<a id="prop-evol6-restart"></a>
<!-- formal-statement-start -->
### 命題（mild 解の再出発公式）

$u$ を $[0,T]$ 上の mild 解とし、$0\le t_0\le t\le T$ とする。

このとき

$$
u(t)
=
T(t-t_0)u(t_0)
+
\int_{t_0}^t
T(t-s)F(u(s))\,ds
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $t_0$ の Duhamel 式へ $T(t-t_0)$ を作用させ、半群則で $T(t-t_0)T(t_0)=T(t)$ とします。積分も同じ半群則で $[0,t_0]$ 部分へ変換すると、時刻 $t$ の Duhamel 式との差がちょうど $[t_0,t]$ の積分として残ります。

<!-- proof-start -->
### 証明

時刻 $t_0$ では

$$
u(t_0)
=
T(t_0)u_0
+
\int_0^{t_0}
T(t_0-s)F(u(s))\,ds.
$$

両辺へ $T(t-t_0)$ を作用させると

$$
\begin{aligned}
T(t-t_0)u(t_0)
&=
T(t-t_0)T(t_0)u_0\\
&\quad+
\int_0^{t_0}
T(t-t_0)T(t_0-s)F(u(s))\,ds.
\end{aligned}
$$

半群則から

$$
T(t-t_0)T(t_0)
=
T(t),
$$

また

$$
T(t-t_0)T(t_0-s)
=
T(t-s).
$$

したがって

$$
T(t-t_0)u(t_0)
=
T(t)u_0
+
\int_0^{t_0}
T(t-s)F(u(s))\,ds.
$$

一方、時刻 $t$ の mild 式は

$$
u(t)
=
T(t)u_0
+
\int_0^t
T(t-s)F(u(s))\,ds.
$$

積分を

$$
\int_0^t
=
\int_0^{t_0}
+
\int_{t_0}^t
$$

と分け、上の式を代入すると

$$
u(t)
=
T(t-t_0)u(t_0)
+
\int_{t_0}^t
T(t-s)F(u(s))\,ds.
$$

これが再出発公式です。$\square$
<!-- proof-end -->

この式により、$u(t_0)$ を新しい初期値として局所存在定理をもう一度適用できます。一意性があるので、新しく作った局所解は元の解と重なる部分で一致します。

---

## 6. 初期値を少し変えたとき解も少しだけ変わる

局所存在一意性の「well-posed」のうち、残るのは初期値連続依存です。

<a id="prop-evol6-continuous-dependence"></a>
<!-- formal-statement-start -->
### 命題（有界領域での初期値連続依存）

$u,v$ を同じ半群 $(T(t))$ と非線形項 $F$ に対する mild 解とし、$[0,T]$ 上で

$$
\|u(t)\|\le R,
\qquad
\|v(t)\|\le R
$$

とする。

$F$ が半径 $R$ の球上で Lipschitz 定数 $L_R$ を持ち、

$$
M_T
=
\sup_{0\le t\le T}\|T(t)\|
$$

とすれば、

$$
\|u(t)-v(t)\|
\le
M_T
\exp(M_TL_Rt)
\|u(0)-v(0)\|
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの mild 式を引くと

$$
u(t)-v(t)
=
T(t)(u(0)-v(0))
+
\int_0^t
T(t-s)
\{F(u(s))-F(v(s))\}\,ds.
$$

従って

$$
\begin{aligned}
\|u(t)-v(t)\|
&\le
M_T\|u(0)-v(0)\|\\
&\quad+
M_TL_R
\int_0^t
\|u(s)-v(s)\|\,ds.
\end{aligned}
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)を

$$
a=M_T\|u(0)-v(0)\|,
\qquad
b=M_TL_R
$$

として適用すると

$$
\|u(t)-v(t)\|
\le
M_Te^{M_TL_Rt}
\|u(0)-v(0)\|.
$$

従って初期値差が小さければ、共通の有界存在区間では解の差も小さく保たれます。$\square$
<!-- proof-end -->

---

## 7. 局所解を貼り合わせて最大存在時間を定める

局所一意性があるので、同じ初期値から作った局所解は重なる区間で一致します。したがって、それらを貼り合わせて最大の存在区間を作れます。

<a id="def-evol6-maximal-time"></a>
<!-- formal-statement-start -->
### 定義（最大存在時間）

初期値 $u_0\in X$ に対する一意な mild 解が存在する最大区間を

$$
[0,T_{\max})
$$

と書く。

右端

$$
T_{\max}\in(0,\infty]
$$

を **最大存在時間**という。
<!-- formal-statement-end -->

この最大区間が実際に作れることも確認しておきます。初期値 $u_0$ から mild 解が存在する時間幅全体を集め、その右端の上限を $T_{\max}$ とします。二つの局所解は共通部分で一意性により一致するので、各時刻 $t<T_{\max}$ では「どの局所解の値を採用するか」に依存せず $u(t)$ を定められます。こうして局所解を貼り合わせると $[0,T_{\max})$ 上の mild 解が得られます。

もしこの解が $T_{\max}$ を越えて延長できれば、$T_{\max}$ が存在時間幅の上限だったことに反します。したがって、この貼り合わせで得た解は最大です。

<!-- definition-example-start: def-evol6-maximal-time -->
### **定義の確認**：$u'=u^2$

$X=\mathbb R$、$A=0$、$F(u)=u^2$、$u_0=a>0$ とします。

変数分離から

$$
u(t)
=
\frac{a}{1-at}.
$$

従って

$$
T_{\max}
=
\frac1a.
$$

さらに

$$
u(t)\to\infty
\qquad
(t\uparrow T_{\max}).
$$

局所解は何度でも再出発できますが、ノルムが無限大へ向かうため有限時刻を越えて連続な $X$ 値解としては延長できません。
<!-- definition-example-end -->

最大存在時間を定義しただけでは、「有限時刻で止まるなら何が壊れるのか」はまだ分かりません。次節が continuation criterion です。

---

## 8. 有界なら再出発できる：blow-up alternative

ここでは $F$ に bounded-ball Lipschitz 性を仮定します。

重要なのは、ノルムが $R$ 以下の **どの初期値からでも同じ長さだけ**局所解を作れることです。

$T_{\max}<\infty$ と仮定し、

$$
M
=
\sup_{0\le t\le 1}\|T(t)\|
$$

とします。これは有限です。

初期値 $y$ が

$$
\|y\|\le R
$$

を満たすとします。時間幅 $\delta\le1$ 上で、線形軌道

$$
t\longmapsto T(t)y
$$

のまわりの閉球

$$
Z_{y,\delta}
=
\left\{
v\in C([0,\delta];X):
\sup_{0\le t\le\delta}
\|v(t)-T(t)y\|\le1
\right\}
$$

を考えます。

$v\in Z_{y,\delta}$ なら

$$
\|v(t)\|
\le
MR+1.
$$

そこで

$$
S=MR+1
$$

と置き、半径 $S$ の球上で

$$
\|F(x)-F(z)\|
\le
L_S\|x-z\|,
$$

$$
\|F(x)\|
\le
K_S
:=
\|F(0)\|+L_SS
$$

とします。

Duhamel 写像

$$
(\Psi_yv)(t)
=
T(t)y
+
\int_0^tT(t-s)F(v(s))\,ds
$$

について

$$
\|\Psi_yv-T(\cdot)y\|_\infty
\le
M\delta K_S.
$$

また

$$
\|\Psi_yv-\Psi_yw\|_\infty
\le
M\delta L_S
\|v-w\|_\infty.
$$

したがって

$$
\delta
\le
\min\left\{
1,
\frac1{2M(K_S+1)},
\frac1{2M(L_S+1)}
\right\}
$$

と取れば、$\Psi_y$ は $Z_{y,\delta}$ を保ち、縮小率は $1/2$ 以下です。

この $\delta$ は $y$ 自身ではなく、上界 $R$ だけで決まっています。

<a id="thm-evol6-blowup-alternative"></a>
<!-- formal-statement-start -->
### 定理（半線形発展方程式の blow-up alternative）

$X$ を Banach 空間、$A$ を強連続半群の生成作用素、$F:X\to X$ を bounded-ball Lipschitz とする。

初期値 $u_0\in X$ に対する最大 mild 解を

$$
u:[0,T_{\max})\to X
$$

とする。

もし

$$
T_{\max}<\infty
$$

なら

$$
\lim_{t\uparrow T_{\max}}
\|u(t)\|
=
\infty
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

有限最大時刻なのにノルムが有界だと仮定します。その上界を $R$ とすれば、上で作った $\delta(R)>0$ は任意の再出発時刻で共通です。

$T_{\max}$ の直前から長さ $\delta(R)$ だけ再出発すれば $T_{\max}$ を越えてしまい、最大性に矛盾します。

<!-- proof-start -->
### 証明

まず

$$
\sup_{0\le t<T_{\max}}\|u(t)\|
<\infty
$$

と仮定して矛盾を導きます。ある $R>0$ が存在して

$$
\|u(t)\|\le R
\qquad
(0\le t<T_{\max})
$$

です。

前節の一様局所存在時間を $\delta=\delta(R)>0$ とします。

$$
t_0
>
T_{\max}-\frac{\delta}{2}
$$

となる $t_0<T_{\max}$ を取ります。

再出発公式により、$u(t_0)$ を初期値とする問題を時刻 $t_0$ から考えられます。しかも

$$
\|u(t_0)\|\le R
$$

なので、少なくとも長さ $\delta$ の局所 mild 解が存在します。

新しい解を $w$ と書けば

$$
w(0)=u(t_0).
$$

時間を平行移動して

$$
\widetilde u(t)
=
w(t-t_0)
$$

とすれば、$\widetilde u$ は $[t_0,t_0+\delta]$ 上の解です。

元の $u$ と $\widetilde u$ は時刻 $t_0$ で同じ値を持つので、局所一意性から重なる区間で一致します。したがって両者を貼り合わせて

$$
[0,t_0+\delta]
$$

まで解を延長できます。

ところが

$$
t_0+\delta
>
T_{\max}+\frac{\delta}{2}
>
T_{\max}.
$$

これは $T_{\max}$ の最大性に矛盾します。

従って

$$
\sup_{0\le t<T_{\max}}\|u(t)\|
=
\infty.
$$

さらに極限そのものが $\infty$ であることを示します。

もし

$$
\|u(t)\|\to\infty
$$

でないなら、ある $R_0>0$ と $t_n\uparrow T_{\max}$ が存在して

$$
\|u(t_n)\|\le R_0
$$

となります。

しかし $R_0$ に対する一様局所存在時間 $\delta(R_0)>0$ を使い、十分大きい $n$ で

$$
t_n>T_{\max}-\frac{\delta(R_0)}2
$$

とすれば、先ほどと同じ再出発で $T_{\max}$ を越えて延長できます。再び矛盾です。

従って

$$
\boxed{
\lim_{t\uparrow T_{\max}}\|u(t)\|=\infty
}.
$$

$\square$
<!-- proof-end -->

この証明で bounded-ball Lipschitz 性を使った場所は明確です。

$$
\|u(t_0)\|\le R
$$

という情報から、時刻 $t_0$ に依存しない Lipschitz 定数 $L_S$ と局所時間 $\delta(R)$ を作る箇所です。

---

## 9. 大域存在には追加の a priori 評価が要る

局所不動点は短時間しか保証しません。大域存在へ進むには、有限時刻までノルムが発散しないことを別途示す必要があります。

最も単純な十分条件は線形成長です。

<a id="cor-evol6-linear-growth-global"></a>
<!-- formal-statement-start -->
### 系（半線形発展方程式の線形成長条件による大域存在）

blow-up alternative の仮定に加えて、定数 $a,b\ge0$ が存在し、

$$
\|F(x)\|
\le
a+b\|x\|
\qquad
(x\in X)
$$

が成り立つとする。

このとき任意の初期値 $u_0\in X$ に対して

$$
T_{\max}=\infty
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に

$$
T_{\max}<\infty
$$

と仮定します。

有限区間上の半群有界性から

$$
M
=
\sup_{0\le t\le T_{\max}}
\|T(t)\|
<
\infty.
$$

mild 式と線形成長条件より、$0\le t<T_{\max}$ で

$$
\begin{aligned}
\|u(t)\|
&\le
M\|u_0\|
+
M\int_0^t
\{a+b\|u(s)\|\}\,ds\\
&=
M\|u_0\|
+
Ma t
+
Mb\int_0^t\|u(s)\|\,ds.
\end{aligned}
$$

$t<T_{\max}$ なので

$$
M\|u_0\|+Ma t
\le
M\|u_0\|+MaT_{\max}
=:C.
$$

従って

$$
\|u(t)\|
\le
C
+
Mb\int_0^t\|u(s)\|\,ds.
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から

$$
\|u(t)\|
\le
C e^{Mbt}.
$$

よって

$$
\sup_{0\le t<T_{\max}}\|u(t)\|
\le
C e^{MbT_{\max}}
<
\infty.
$$

しかし blow-up alternative は有限最大時刻ならノルムが無限大へ発散すると言っています。矛盾です。

従って

$$
T_{\max}=\infty.
$$

$\square$
<!-- proof-end -->

ここで見える構造は重要です。

$$
\text{局所存在}
+
\text{有限時間 a priori bound}
\Longrightarrow
\text{大域存在}.
$$

逆に言えば、局所不動点を何度作れても、制御量が有限時間で無限大へ向かう可能性を排除しない限り大域存在は出ません。

---

## 10. analytic smoothing があると単純な $F:X\to X$ を越えられる

本章の局所存在定理は最も透明な形として

$$
F:X\to X
$$

を仮定しました。

しかし PDE では非線形項が同じ空間へ戻らないことがあります。たとえばある空間 $Y$ で

$$
F:X\to Y
$$

しか分からなくても、analytic semigroup が

$$
T(t):Y\to X
$$

を正の時刻で改善し、

$$
\|T(t)\|_{Y\to X}
\le
Ct^{-\alpha}
$$

を満たすなら、Duhamel 項は

$$
\left\|
\int_0^t
T(t-s)F(u(s))\,ds
\right\|_X
\le
C
\int_0^t
(t-s)^{-\alpha}
\|F(u(s))\|_Y\,ds
$$

と評価できます。

$0\le\alpha<1$ なら

$$
\int_0^t(t-s)^{-\alpha}\,ds
=
\frac{t^{1-\alpha}}{1-\alpha}
$$

なので、短時間因子

$$
t^{1-\alpha}
$$

が得られます。

これが EVOL5 の smoothing と非線形局所理論が接続する場所です。

ただし、この一般化には

- どの $X,Y$ を選ぶか、
- $F:X\to Y$ の非線形評価をどう作るか、
- 時間特異性 $\alpha$ が積分可能か

という追加情報が必要です。本章の $F:X\to X$ の定理だけで、すべての PDE が自動的に解けるわけではありません。

---

## 11. 半線形熱方程式では抽象骨格がそのまま見える

[NPDE6](../NPDE6/index.md) の

$$
u_t
=
\Delta u+u^p
$$

では、線形部分は heat semigroup

$$
S(t)=e^{t\Delta}
$$

です。

mild 式は

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)u(s)^p\,ds.
$$

これは本章の

$$
T(t)=S(t),
\qquad
F(u)=u^p
$$

という具体化です。

NPDE6 では $BUC$ と $L^\infty$ 収縮性を使い、値を半径 $R$ の範囲へ閉じ込めて

$$
|a^p-b^p|
\le
pR^{p-1}|a-b|
$$

を使いました。

つまり

$$
\text{熱半群}
\to
\text{Duhamel}
\to
\text{局所 Lipschitz}
\to
\text{縮小写像}
\to
\text{再出発}
\to
L^\infty\text{ blow-up alternative}
$$

という流れは、本章の抽象理論の具体例です。

一方、Fujita 指数、比較原理、熱核の正値性、Gaussian barrier は熱方程式固有の情報です。本章の一般半群論からは出ません。

---

## 12. Navier--Stokes では同じ骨格に PDE 固有評価が刺さる

Navier--Stokes を作用素記法で書くと概念的には

$$
u_t+Au+B(u,u)=f
$$

です。

形式的には

$$
u(t)
=
e^{-tA}u_0
-
\int_0^t
e^{-(t-s)A}B(u(s),u(s))\,ds
+
\int_0^t
e^{-(t-s)A}f(s)\,ds
$$

となり、

$$
\text{linear semigroup}
+
\text{quadratic nonlinearity}
$$

という骨格は同じです。

しかし [NS5](../NS5/index.md) では、三次元局所強解を閉じるために

$$
|b(u,u,Au)|
\le
C\|\nabla u\|_2^{3/2}\|Au\|_2^{3/2}
$$

のような Navier--Stokes 固有の補間評価を使いました。

つまり本章から持ち込めるのは

$$
\text{局所構成}
\to
\text{最大時間}
\to
\text{再出発}
\to
\text{continuation criterion}
$$

という論理骨格です。

どのノルムで非線形項を閉じるか、どの量が発散すれば延長不能になるかは PDE 固有です。一般半群論だけで三次元 Navier--Stokes の正則性問題が消えるわけではありません。

---

## 13. この章で分かったこと

半線形発展方程式

$$
u'=Au+F(u)
$$

では、線形生成作用素 $A$ の仕事と非線形項 $F$ の仕事を分けて考えられます。

- $A$ は強連続半群 $T(t)$ を通じて線形時間発展を担う。
- $F$ は nonlinear Duhamel map に入る。
- 局所 Lipschitz 性と短い時間幅から縮小写像を作れる。
- 半群則により途中時刻から再出発できる。
- 局所解を一意性で貼り合わせると最大存在時間が定まる。
- bounded-ball Lipschitz 性があれば、ノルム有界な状態から共通時間だけ再出発できる。
- したがって有限最大時刻ならノルムは発散する。
- 線形成長などの a priori 評価で有限時間ノルム上界を作れれば大域存在が従う。
- analytic smoothing を使えば $F:X\to X$ より広い設定へ進めるが、追加の空間間評価が必要になる。
- NPDE6 や NS5 では、この抽象骨格に PDE 固有の比較原理・補間評価・臨界評価が加わる。

これで EVOL1 から始めた

$$
\text{非有界作用素}
\to
C_0\text{ 半群}
\to
\text{生成定理}
\to
\text{Duhamel}
\to
\text{smoothing}
\to
\text{半線形局所理論}
$$

が一続きになります。

---

# 演習

## Level A

<a id="ex-evol6-a01"></a>
### EVOL6-A01 mild 式へ直す
- Level: A

$X=\mathbb R$、$A=-2I$、$F(u)=u^2$ とする。

1. 線形半群 $T(t)$ を求めよ。
2. 初期値 $u(0)=a$ に対する mild 式を書け。
3. $F$ を0へ置き換えたときの解を求めよ。

<!-- solution-start -->
#### 詳細解答

$A=-2I$ なので

$$
T(t)=e^{tA}=e^{-2t}I.
$$

従って半線形方程式

$$
u'=-2u+u^2
$$

の mild 式は

$$
\boxed{
u(t)
=
e^{-2t}a
+
\int_0^t
e^{-2(t-s)}u(s)^2\,ds
}.
$$

$F=0$ なら積分項は消えるので

$$
\boxed{
u(t)=e^{-2t}a
}.
$$

この問題では、線形減衰を $T(t)$ が、非線形反応を Duhamel 積分が担当しています。
<!-- solution-end -->

<a id="ex-evol6-a02"></a>
### EVOL6-A02 bounded-ball Lipschitz 定数
- Level: A

任意の Banach 空間 $X$ で

$$
F(x)=\|x\|x
$$

とする。$\|x\|,\|y\|\le R$ のとき

$$
\|F(x)-F(y)\|
\le
2R\|x-y\|
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

差を

$$
F(x)-F(y)
=
\|x\|(x-y)
+
(\|x\|-\|y\|)y
$$

と分けます。

三角不等式から

$$
\begin{aligned}
\|F(x)-F(y)\|
&\le
\|x\|\,\|x-y\|
+
|\|x\|-\|y\||\,\|y\|.
\end{aligned}
$$

逆三角不等式

$$
|\|x\|-\|y\||
\le
\|x-y\|
$$

と

$$
\|x\|,\|y\|\le R
$$

を使うと

$$
\begin{aligned}
\|F(x)-F(y)\|
&\le
R\|x-y\|+R\|x-y\|\\
&=
\boxed{2R\|x-y\|}.
\end{aligned}
$$

従って半径 $R$ の球上で $L_R=2R$ と取れます。
<!-- solution-end -->

<a id="ex-evol6-a03"></a>
### EVOL6-A03 閉球不変性の時間条件
- Level: A

局所存在証明の記号を用い、

$$
\sup_{0\le t\le T_1}\|T(t)u_0-u_0\|
\le
\frac r2,
$$

$$
M=\sup_{0\le t\le T_1}\|T(t)\|,
\qquad
\|F(x)\|\le K
$$

が $\overline B(u_0,r)$ 上で成り立つとする。

Duhamel 写像が $Y_T$ を保つための十分条件を導け。

<!-- solution-start -->
#### 詳細解答

$u\in Y_T$ なら全ての $s\in[0,T]$ で

$$
u(s)\in\overline B(u_0,r),
$$

したがって

$$
\|F(u(s))\|\le K.
$$

よって

$$
\begin{aligned}
\|(\Phi u)(t)-u_0\|
&\le
\|T(t)u_0-u_0\|
+
\int_0^t
\|T(t-s)\|\|F(u(s))\|\,ds\\
&\le
\frac r2+MTK.
\end{aligned}
$$

これが $r$ 以下ならよいので

$$
\frac r2+MTK\le r.
$$

従って十分条件は

$$
\boxed{
MTK\le\frac r2
}
$$

です。
<!-- solution-end -->

<a id="ex-evol6-a04"></a>
### EVOL6-A04 再出発公式
- Level: A

$mild$ 解が

$$
u(t)
=
T(t)u_0
+
\int_0^tT(t-s)F(u(s))\,ds
$$

を満たすとする。$0<t_0<t$ に対し

$$
u(t)
=
T(t-t_0)u(t_0)
+
\int_{t_0}^tT(t-s)F(u(s))\,ds
$$

を導け。

<!-- solution-start -->
#### 詳細解答

まず時刻 $t_0$ で

$$
u(t_0)
=
T(t_0)u_0
+
\int_0^{t_0}T(t_0-s)F(u(s))\,ds.
$$

両辺へ $T(t-t_0)$ を作用させます。

$$
\begin{aligned}
T(t-t_0)u(t_0)
&=
T(t)u_0\\
&\quad+
\int_0^{t_0}
T(t-s)F(u(s))\,ds.
\end{aligned}
$$

ここで半群則を二回使いました。

時刻 $t$ の mild 式は

$$
u(t)
=
T(t)u_0
+
\int_0^{t_0}T(t-s)F(u(s))\,ds
+
\int_{t_0}^tT(t-s)F(u(s))\,ds.
$$

最初の二項を先ほどの式で置き換えると

$$
\boxed{
u(t)
=
T(t-t_0)u(t_0)
+
\int_{t_0}^tT(t-s)F(u(s))\,ds
}.
$$
<!-- solution-end -->

<a id="ex-evol6-a05"></a>
### EVOL6-A05 最大存在時間の最小例
- Level: A

$$
u'=u^2,
\qquad
u(0)=a>0
$$

を解き、最大存在時間と blow-up rate を求めよ。

<!-- solution-start -->
#### 詳細解答

$u>0$ の間は

$$
u^{-2}du=dt.
$$

$0$ から $t$ まで積分すると

$$
-\frac1{u(t)}+\frac1a=t.
$$

従って

$$
\frac1{u(t)}
=
\frac1a-t
=
\frac{1-at}{a}.
$$

よって

$$
\boxed{
u(t)=\frac{a}{1-at}
}.
$$

分母が0になる時刻は

$$
\boxed{
T_{\max}=\frac1a
}.
$$

また

$$
1-at=a(T_{\max}-t)
$$

なので

$$
u(t)
=
\frac1{T_{\max}-t}.
$$

従って

$$
\boxed{
u(t)\sim(T_{\max}-t)^{-1}
}
$$

です。
<!-- solution-end -->

## Level B

<a id="ex-evol6-b01"></a>
### EVOL6-B01 局所不動点の時間幅を具体化する
- Level: B

局所存在証明で

$$
r=2,
\qquad
M=3,
\qquad
K=5,
\qquad
L=4,
\qquad
T_1=1
$$

とする。

1. 閉球不変性を保証する $T$ の上界を求めよ。
2. 縮小率を $1/2$ 以下にする $T$ の上界を求めよ。
3. 両方を満たす具体的な $T$ を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

閉球不変性には

$$
MTK\le\frac r2
$$

が必要です。

数値を代入すると

$$
3\cdot T\cdot5
\le
1,
$$

したがって

$$
T\le\frac1{15}.
$$

次に縮小率は

$$
MLT.
$$

これを $1/2$ 以下にするには

$$
3\cdot4\cdot T
\le
\frac12.
$$

従って

$$
T\le\frac1{24}.
$$

また $T\le T_1=1$ も必要です。

よって例えば

$$
\boxed{
T=\frac1{24}
}
$$

と取れば三条件を満たします。

実際、

$$
MTK
=
3\cdot\frac1{24}\cdot5
=
\frac58
<
1
=
\frac r2,
$$

また

$$
MLT
=
3\cdot4\cdot\frac1{24}
=
\frac12.
$$
<!-- solution-end -->

<a id="ex-evol6-b02"></a>
### EVOL6-B02 初期値連続依存を導く
- Level: B

$u,v$ が $[0,T]$ 上で

$$
\|u(t)\|,\|v(t)\|\le R
$$

を満たす mild 解とする。

$$
M_T=\sup_{0\le t\le T}\|T(t)\|,
$$

かつ半径 $R$ の球上で $F$ の Lipschitz 定数を $L_R$ とする。

初期値差から

$$
\|u(t)-v(t)\|
\le
M_Te^{M_TL_Rt}
\|u(0)-v(0)\|
$$

を導け。

<!-- solution-start -->
#### 詳細解答

二つの mild 式を引きます。

$$
u(t)-v(t)
=
T(t)(u(0)-v(0))
+
\int_0^t
T(t-s)\{F(u(s))-F(v(s))\}\,ds.
$$

ノルムを取ると

$$
\begin{aligned}
\|u(t)-v(t)\|
&\le
M_T\|u(0)-v(0)\|\\
&\quad+
M_T
\int_0^t
\|F(u(s))-F(v(s))\|\,ds.
\end{aligned}
$$

両解は半径 $R$ の球に入るので

$$
\|F(u(s))-F(v(s))\|
\le
L_R\|u(s)-v(s)\|.
$$

従って

$$
\|u(t)-v(t)\|
\le
M_T\|u(0)-v(0)\|
+
M_TL_R\int_0^t\|u(s)-v(s)\|\,ds.
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)を適用すると

$$
\boxed{
\|u(t)-v(t)\|
\le
M_Te^{M_TL_Rt}
\|u(0)-v(0)\|
}.
$$
<!-- solution-end -->

<a id="ex-evol6-b03"></a>
### EVOL6-B03 一様再出発時間から blow-up alternative を閉じる
- Level: B

$F$ は bounded-ball Lipschitz とし、最大 mild 解 $u$ の最大存在時間が

$$
T_{\max}<\infty
$$

であるとする。

ある $R>0$ と列 $t_n\uparrow T_{\max}$ が存在し、

$$
\|u(t_n)\|\le R
$$

と仮定する。

半径 $R$ 以下の任意の初期値から少なくとも長さ $\delta(R)>0$ の局所解が存在するとして矛盾を導け。

<!-- solution-start -->
#### 詳細解答

$t_n\uparrow T_{\max}$ なので、十分大きい $n$ では

$$
t_n
>
T_{\max}-\frac{\delta(R)}2.
$$

この $n$ を固定します。

時刻 $t_n$ で

$$
\|u(t_n)\|\le R
$$

ですから、$u(t_n)$ を新しい初期値として少なくとも長さ $\delta(R)$ の局所解を作れます。

再出発公式と局所一意性により、この新しい解は元の $u$ と重なる区間で一致します。したがって元の解を

$$
[0,t_n+\delta(R)]
$$

まで延長できます。

しかし

$$
t_n+\delta(R)
>
T_{\max}+\frac{\delta(R)}2
>
T_{\max}.
$$

これは $T_{\max}$ が最大存在時間であることに矛盾します。

従って $T_{\max}$ へ近づく列でノルムが同じ $R$ 以下に戻ることはできません。

任意の $R>0$ について同じ議論ができるので

$$
\boxed{
\|u(t)\|\to\infty
\qquad
(t\uparrow T_{\max})
}
$$

です。
<!-- solution-end -->

<a id="ex-evol6-b04"></a>
### EVOL6-B04 線形成長から大域存在を導く
- Level: B

$F$ が

$$
\|F(x)\|
\le
a+b\|x\|
$$

を満たし、blow-up alternative が使えるとする。

$T_{\max}<\infty$ と仮定して矛盾を導け。

<!-- solution-start -->
#### 詳細解答

有限区間上の半群有界性から

$$
M
=
\sup_{0\le t\le T_{\max}}\|T(t)\|
<
\infty.
$$

mild 式より

$$
\begin{aligned}
\|u(t)\|
&\le
M\|u_0\|
+
M\int_0^t
\|F(u(s))\|\,ds\\
&\le
M\|u_0\|
+
Ma t
+
Mb\int_0^t\|u(s)\|\,ds.
\end{aligned}
$$

$t<T_{\max}$ なので

$$
M\|u_0\|+Ma t
\le
C
:=
M\|u_0\|+MaT_{\max}.
$$

従って

$$
\|u(t)\|
\le
C
+
Mb\int_0^t\|u(s)\|\,ds.
$$

[Grönwall の不等式](../ODE8/index.md#lem-ode8-gronwall)から

$$
\|u(t)\|
\le
Ce^{Mbt}.
$$

よって

$$
\sup_{0\le t<T_{\max}}\|u(t)\|
\le
Ce^{MbT_{\max}}
<
\infty.
$$

しかし blow-up alternative は

$$
T_{\max}<\infty
\Longrightarrow
\|u(t)\|\to\infty
$$

を主張します。矛盾です。

従って

$$
\boxed{
T_{\max}=\infty
}.
$$
<!-- solution-end -->

## Level C

<a id="ex-evol6-c01"></a>
### EVOL6-C01 半線形熱方程式と Navier--Stokes を同じ骨格で読む
- Level: C

次の二つの mild formulation を考える。

半線形熱方程式：

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)u(s)^p\,ds.
$$

Navier--Stokes 型：

$$
u(t)
=
e^{-tA}u_0
-
\int_0^t
e^{-(t-s)A}B(u(s),u(s))\,ds.
$$

さらに次の評価が与えられているとする。

熱方程式では、半径 $R$ の範囲で

$$
\|u^p-v^p\|
\le
L_R\|u-v\|.
$$

Navier--Stokes 型では、適切な空間 $X,Y$ に対して

$$
\|B(u,u)-B(v,v)\|_Y
\le
C_R\|u-v\|_X
$$

かつ

$$
\|e^{-tA}\|_{Y\to X}
\le
Ct^{-\alpha},
\qquad
0\le\alpha<1
$$

が成り立つ。

1. 両方について「線形半群」「非線形項」「Duhamel 写像」を対応させよ。
2. 熱方程式側で短時間因子 $T$ が出る理由を説明せよ。
3. Navier--Stokes 型で短時間因子 $T^{1-\alpha}$ が出ることを示せ。
4. この比較から、抽象半群論だけでは PDE の局所理論が完成しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず対応を整理します。

半線形熱方程式では

$$
T(t)=S(t),
\qquad
F(u)=u^p.
$$

従って Duhamel 写像は

$$
(\Phi u)(t)
=
S(t)u_0
+
\int_0^t
S(t-s)u(s)^p\,ds.
$$

Navier--Stokes 型では

$$
T(t)=e^{-tA},
\qquad
F(u)=-B(u,u).
$$

形式的な Duhamel 写像は

$$
(\Psi u)(t)
=
e^{-tA}u_0
-
\int_0^t
e^{-(t-s)A}B(u(s),u(s))\,ds.
$$

次に熱方程式側を見ます。半群が $X$ 上で有限時間有界で

$$
\|S(t)\|_{X\to X}\le M
$$

なら

$$
\begin{aligned}
\|\Phi u-\Phi v\|_{C_TX}
&\le
M
\sup_{0\le t\le T}
\int_0^t
\|u(s)^p-v(s)^p\|\,ds\\
&\le
ML_R
\sup_{0\le t\le T}
\int_0^t
\|u(s)-v(s)\|\,ds\\
&\le
ML_RT
\|u-v\|_{C_TX}.
\end{aligned}
$$

従って短時間因子は

$$
\boxed{T}
$$

です。

Navier--Stokes 型では非線形項が $Y$ に入り、半群 smoothing で $Y$ から $X$ へ戻すとします。

差を取ると

$$
\begin{aligned}
\|\Psi u(t)-\Psi v(t)\|_X
&\le
\int_0^t
\|e^{-(t-s)A}\|_{Y\to X}\\
&\qquad\cdot
\|B(u(s),u(s))-B(v(s),v(s))\|_Y\,ds\\
&\le
CC_R
\int_0^t
(t-s)^{-\alpha}
\|u(s)-v(s)\|_X\,ds.
\end{aligned}
$$

一様ノルムを外へ出すと

$$
\|\Psi u-\Psi v\|_{C_TX}
\le
CC_R
\left(
\sup_{0\le t\le T}
\int_0^t
(t-s)^{-\alpha}\,ds
\right)
\|u-v\|_{C_TX}.
$$

$0\le\alpha<1$ なので

$$
\int_0^t
(t-s)^{-\alpha}\,ds
=
\frac{t^{1-\alpha}}{1-\alpha}
\le
\frac{T^{1-\alpha}}{1-\alpha}.
$$

従って

$$
\boxed{
\|\Psi u-\Psi v\|_{C_TX}
\le
\frac{CC_R}{1-\alpha}
T^{1-\alpha}
\|u-v\|_{C_TX}
}.
$$

十分小さい $T$ なら縮小率を1未満にできます。

最後に、この比較が示すのは「不動点という論理骨格」は共通でも、その不動点を閉じる評価は PDE ごとに異なるということです。

熱方程式では

$$
u^p:X\to X
$$

を直接 Lipschitz 評価できる場合があります。

一方 Navier--Stokes 型では

$$
B(u,u)
$$

が同じ空間 $X$ にそのまま入らず、別空間 $Y$ でしか評価できないことがあります。そのとき

$$
e^{-tA}:Y\to X
$$

の smoothing と時間特異性の積分可能性

$$
\alpha<1
$$

が必要です。

したがって一般半群論だけで必要な

$$
C_R,
\qquad
\alpha,
\qquad
X,
\qquad
Y
$$

は決まりません。これらは PDE 固有の Sobolev 評価、双線形評価、smoothing estimate から供給されます。

共通化できるのは

$$
\boxed{
\text{Duhamel}
\to
\text{局所不動点}
\to
\text{再出発}
\to
\text{最大時間}
\to
\text{continuation}
}
$$

という論理構造であり、PDE 固有の解析そのものではありません。
<!-- solution-end -->
