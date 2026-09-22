# ODE8 最大解・Grönwall・連続依存・流れ

<!-- definition-example-audit: strict -->

ODE1 の [Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof) は「短い時間なら解ける」ことを保証しました。この章では局所解を、最大解・延長判定・連続依存・流れへ伸ばします。

$$
\text{局所存在・一意性}
\to
\text{最大解}
\to
\text{延長判定}
\to
\text{Grönwall}
\to
\text{連続依存}
\to
\text{流れ}
$$

## 1. 最大解

<a id="def-ode8-maximal-solution"></a>
<!-- formal-statement-start -->
> **定義（最大解・最大存在区間）**  
> 開集合 $D\subset\mathbb R^d$ 上の自律系 $x'=F(x)$ と初期値 $x(t_0)=x_0\in D$ を考える。解 $x:I\to D$ が最大解であるとは、同じ初期値を持つ解として真に大きい区間へ延長できないことをいう。このとき $I$ を最大存在区間という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode8-maximal-solution -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：$x'=x^2$ は有限時間で終わる

$x(0)=1$ なら $x(t)=1/(1-t)$ です。最大存在区間は $(-\infty,1)$ で、右辺は滑らかでも解が有限時間で無限大へ逃げるため延長できません。
<!-- definition-example-end -->

局所一意性があるので、同じ初期値から出る局所解は重なる区間で一致します。全てを貼り合わせれば一意な最大解が得られます。

## 2. 延長できないならコンパクト集合から逃げる

<a id="thm-ode8-continuation"></a>
<!-- formal-statement-start -->
> **定理（最大解の延長判定）**  
> $D\subset\mathbb R^d$ を開集合、$F:D\to\mathbb R^d$ を局所 Lipschitz とする。最大解 $x:(\alpha,\beta)\to D$ の右端が $\beta<\infty$ とする。このとき任意のコンパクト集合 $K\subset D$ に対し、$\beta$ に十分近い時刻では $x(t)\notin K$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

軌道がコンパクト集合へ何度も戻るなら、$t_n\uparrow\beta$ に沿って $x(t_n)$ の収束部分列を取れます。その極限点から Picard--Lindelöf を再開すれば $\beta$ の先へ延長できます。

<!-- proof-start -->
### 証明

結論が偽なら、あるコンパクト集合 $K\subset D$ と $t_n\uparrow\beta$ があり $x(t_n)\in K$ です。部分列を取り

$$
x(t_n)\to x_*\in K
$$

とします。

$D$ は開で、$F$ は $x_*$ の近くで局所 Lipschitz です。したがって、ある $r>0$ と $L,M>0$ を取って

$$
\overline{B(x_*,2r)}\subset D,
$$

かつ $\overline{B(x_*,2r)}$ 上で

$$
\|F(\xi)-F(\eta)\|\le L\|\xi-\eta\|,
\qquad
\|F(\xi)\|\le M
$$

とできます。初期点 $\xi_0\in B(x_*,r)$ から出る積分方程式

$$
\xi(t)=\xi_0+\int_0^tF(\xi(s))\,ds
$$

を考えると、$|t|\le h$ で $Mh\le r$ となるように $h>0$ を選べば、Picard 反復は $\overline{B(x_*,2r)}$ から外へ出ません。さらに必要なら $h$ を小さくして $Lh<1$ とすれば、[Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof) の縮小写像論法が **全ての** $\xi_0\in B(x_*,r)$ に同じ時間幅 $[-h,h]$ で適用できます。

十分大きい $n$ では

$$
x(t_n)\in B(x_*,r),
\qquad
0<\beta-t_n<h.
$$

そこで時刻 $t_n$、初期値 $x(t_n)$ から上の局所解を開始すると、少なくとも $t_n+h>\beta$ まで解が存在します。一意性により、この新しい解は $(\alpha,\beta)$ との重なりで元の解 $x$ と一致します。したがって $x$ を $\beta$ の先へ延長でき、最大性に矛盾します。
<!-- proof-end -->

## 3. 積分評価を指数評価へ変える

<a id="lem-ode8-gronwall"></a>
<!-- formal-statement-start -->
> **補題（Grönwall の不等式）**  
> 連続関数 $u:[0,T]\to[0,\infty)$ が

$$
u(t)\le a+b\int_0^t u(s)\,ds
$$

> を満たし、$a,b\ge0$ とする。このとき $u(t)\le ae^{bt}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

右辺を $v(t)$ と置けば $u\le v$ と $v'\le bv$ が同時に得られます。

<!-- proof-start -->
### 証明

$$
v(t)=a+b\int_0^t u(s)\,ds
$$

と置きます。すると $u\le v$ かつ $v'=bu\le bv$ です。従って

$$
\frac d{dt}(e^{-bt}v(t))
=e^{-bt}(v'-bv)\le0.
$$

よって $v(t)\le ae^{bt}$、さらに $u(t)\le v(t)$ です。
<!-- proof-end -->

## 4. 初期値への連続依存

<a id="thm-ode8-continuous-dependence"></a>
<!-- formal-statement-start -->
> **定理（初期値に関する連続依存）**  
> $F$ がある領域で Lipschitz 定数 $L$ を持ち、二つの解 $x,y$ が時刻 $0$ から $T$ までその領域に留まるとする。このとき

$$
\|x(t)-y(t)\|
\le e^{Lt}\|x(0)-y(0)\|,
\qquad 0\le t\le T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積分方程式の差と仮定した差の評価から

$$
\|x(t)-y(t)\|
\le
\|x(0)-y(0)\|
+
L\int_0^t\|x(s)-y(s)\|\,ds.
$$

Grönwall の不等式を適用します。
<!-- proof-end -->

## 5. 線形成長なら大域存在する

<a id="cor-ode8-global-linear-growth"></a>
<!-- formal-statement-start -->
> **系（線形成長条件による大域存在）**  
> $F:\mathbb R^d\to\mathbb R^d$ を局所 Lipschitz とし、

$$
\|F(x)\|\le A+B\|x\|
$$

> を全ての $x$ で満たすとする。このとき任意の初期値から出る最大解は全実数時間で存在する。
<!-- formal-statement-end -->

### 証明の見取り図

有限時間区間上で $\|x(t)\|$ を Grönwall で抑えます。有界なら延長判定から有限端点を持てません。

<!-- proof-start -->
### 証明

$0\le t\le T$ では

$$
\|x(t)\|
\le
\|x_0\|+AT+B\int_0^t\|x(s)\|\,ds.
$$

よって

$$
\|x(t)\|
\le
(\|x_0\|+AT)e^{BT}.
$$

任意の有限時間区間で軌道は有界です。最大存在区間の右端が有限なら、$\beta$ に近い軌道もある閉球

$$
K=\{x:\|x\|\le R\}\subset\mathbb R^d
$$

に留まるので、[最大解の延長判定](#thm-ode8-continuation)に反します。

左端については $y(s)=x(-s)$ と置きます。すると

$$
y'=-F(y),
$$

であり、$-F$ も同じ線形成長評価

$$
\|-F(y)\|\le A+B\|y\|
$$

を満たします。右端についての議論を $y$ に適用すれば、元の解 $x$ の左端も有限ではあり得ません。従って最大存在区間は $\mathbb R$ です。
<!-- proof-end -->

## 6. 自律系を流れとして見る

<a id="def-ode8-flow"></a>
<!-- formal-statement-start -->
> **定義（自律系の流れ）**  
> 自律系 $x'=F(x)$ の解が時刻 $t$ まで存在するとき

$$
\Phi_t(x_0):=x(t;x_0)
$$

> と書く。全ての $t\in\mathbb R$ と $x_0$ で定義される場合を大域流れという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode8-flow -->
**定義の確認**：以下で定義の条件を直接確認します。

$x'=-x$ では $\Phi_t(x)=e^{-t}x$ です。
<!-- definition-example-end -->

<a id="prop-ode8-flow-law"></a>
<!-- formal-statement-start -->
> **命題（流れの合成則）**  
> 一意性が成り立つ自律系では、両辺が定義される限り

$$
\Phi_0=\operatorname{id},
\qquad
\Phi_{t+s}=\Phi_t\circ\Phi_s
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y(t)=\Phi_t(\Phi_s(x_0))$ と $z(t)=\Phi_{t+s}(x_0)$ は同じ自律系を満たし、

$$
y(0)=\Phi_s(x_0)=z(0).
$$

同じ初期データから出る解の一意性から $y=z$ です。$\Phi_0$ は初期値をそのまま返します。
<!-- proof-end -->

<a id="lem-ode8-flow-variational"></a>
<!-- formal-statement-start -->
> **補題（流れの初期値微分と変分方程式）**  
> $F:\mathbb R^d\to\mathbb R^d$ を $C^1$ 級とし、自律系
>
> $$
> x'=F(x)
> $$
>
> の流れを $\Phi_t(x_0)$ と書く。ある $T>0$ と初期点 $x_0$ の近傍で $0\le t\le T$ の解が共通に存在するとする。このとき流れ
>
> $$
> (t,x)\longmapsto\Phi_t(x)
> $$
>
> は $(t,x_0)$ の近くで $C^1$ 級である。初期値微分
>
> $$
> X(t):=D_x\Phi_t(x_0)
> $$
>
> は
>
> $$
> X'(t)=DF(\Phi_t(x_0))X(t),
> \qquad
> X(0)=I
> $$
>
> を満たし、時間微分は
>
> $$
> \partial_t\Phi_t(x)=F(\Phi_t(x))
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

初期値を $x_0+h$ だけずらした二本の解の差を、まず Grönwall で $O(\|h\|)$ に抑えます。その差が通る線分上で $DF$ を平均すると、差は「係数行列が少しずれた線形方程式」を満たします。$DF$ の一様連続性によりその係数行列が変分方程式の係数へ一様収束し、もう一度 Grönwall を使うと一次近似の誤差が $o(\|h\|)$ になります。

<!-- proof-start -->
### 証明

基準軌道を

$$
x(t)=\Phi_t(x_0)
$$

とします。有限時間軌道

$$
\Gamma_T=\{x(t):0\le t\le T\}
$$

はコンパクトなので

$$
M:=\max_{0\le t\le T}\|x(t)\|<\infty.
$$

ある $\rho>0$ を固定し、凸な閉球

$$
K=\{y:\|y\|\le M+\rho\}
$$

を取ります。$F\in C^1$ かつ $K$ はコンパクトなので

$$
L:=\sup_{y\in K}\|DF(y)\|<\infty.
$$

$h$ を十分小さく取り、

$$
x_h(t)=\Phi_t(x_0+h),
\qquad
y_h(t)=x_h(t)-x(t)
$$

と置きます。積分方程式の差から

$$
y_h(t)
=
h+
\int_0^t
\{F(x_h(s))-F(x(s))\}\,ds.
$$

まず $x_h$ が $K$ から出ないことを確認します。$x_h$ の $K$ からの最初の退出時刻を $\tau\le T$ と仮定します。$0\le t\le\tau$ では $x(t),x_h(t)\in K$ で、$K$ は凸なので両点を結ぶ線分も $K$ に含まれます。従って平均値の積分形を使えて

$$
F(x_h)-F(x)
=
A_h(t)y_h,
$$

ただし

$$
A_h(t)
=
\int_0^1
DF\bigl(x(t)+\theta y_h(t)\bigr)\,d\theta.
$$

よって $0\le t\le\tau$ で

$$
y_h(t)
=
h+
\int_0^tA_h(s)y_h(s)\,ds.
$$

$\|A_h\|\le L$ なので [Grönwall の不等式](#lem-ode8-gronwall)から

$$
\|y_h(t)\|
\le
e^{Lt}\|h\|.
$$

ここで

$$
e^{LT}\|h\|<\rho
$$

となるように $h$ を取っておけば、$t=\tau$ でも

$$
\|x_h(\tau)\|
\le
\|x(\tau)\|+\|y_h(\tau)\|
<
M+\rho.
$$

これは $K$ の境界へ初めて到達したという定義に反します。従って退出時刻は存在せず、$x_h(t)\in K$ が $0\le t\le T$ 全体で成り立ちます。

したがって

$$
\sup_{0\le t\le T}\|y_h(t)\|
\le
e^{LT}\|h\|
\to0
\qquad(h\to0).
$$

$DF$ はコンパクト集合 $K$ 上で一様連続だから

$$
A_h(t)
\to
A(t):=DF(x(t))
$$

が $0\le t\le T$ で一様に成り立ちます。

次に行列方程式

$$
X'(t)=A(t)X(t),
\qquad
X(0)=I
$$

の解 $X(t)$ を取ります。$X(t)h$ は

$$
X(t)h
=
h+
\int_0^tA(s)X(s)h\,ds
$$

を満たします。差

$$
r_h(t)
=
y_h(t)-X(t)h
$$

を取ると

$$
r_h(t)
=
\int_0^tA_h(s)r_h(s)\,ds
+
\int_0^t
\{A_h(s)-A(s)\}X(s)h\,ds.
$$

$M_T:=\sup_{0\le s\le T}\|X(s)\|<\infty$ とすると

$$
\|r_h(t)\|
\le
L\int_0^t\|r_h(s)\|\,ds
+
T M_T
\sup_{0\le s\le T}\|A_h(s)-A(s)\|
\,\|h\|.
$$

再び Grönwall を使えば

$$
\sup_{0\le t\le T}
\frac{\|r_h(t)\|}{\|h\|}
\le
T M_T e^{LT}
\sup_{0\le s\le T}\|A_h(s)-A(s)\|
\to0.
$$

従って

$$
\Phi_t(x_0+h)
=
\Phi_t(x_0)+X(t)h+o(\|h\|)
$$

であり、

$$
D_x\Phi_t(x_0)=X(t).
$$

$X$ の定義から変分方程式と $X(0)=I$ も成り立ちます。

最後に微分の連続性を確認します。初期値 $x_0^{(n)}\to x_0$ を取り、対応する軌道を

$$
x_n(t)=\Phi_t(x_0^{(n)}),
\qquad
x(t)=\Phi_t(x_0)
$$

とします。上の first-exit 評価と Grönwall により

$$
\sup_{0\le t\le T}\|x_n(t)-x(t)\|\to0.
$$

対応する変分方程式の基本行列を $X_n,X$ とすると

$$
X_n(t)-X(t)
=
\int_0^t
DF(x_n(s))(X_n(s)-X(s))\,ds
$$

$$
\qquad
+
\int_0^t
\{DF(x_n(s))-DF(x(s))\}X(s)\,ds.
$$

全ての軌道を含む共通コンパクト集合上で $DF$ は一様連続であり、$X_n$ も Grönwall により一様有界です。従ってもう一度 Grönwall を適用すると

$$
\sup_{0\le t\le T}\|X_n(t)-X(t)\|\to0.
$$

よって $D_x\Phi_t(x)$ は $(t,x)$ に連続です。一方、積分方程式を時間微分すれば

$$
\partial_t\Phi_t(x)=F(\Phi_t(x)),
$$

右辺は連続です。従って $(t,x)\mapsto\Phi_t(x)$ は局所 $C^1$ 級です。
<!-- proof-end -->

## 演習

### Level A

#### ODE8-A01 最大存在区間
- Level: A

$x'=x^2$, $x(0)=1$ を解き最大存在区間を求めよ。

<!-- solution-start -->
##### 詳細解答
変数分離から $-1/x=t+C$。初期条件より $x(t)=1/(1-t)$。$t=1$ で値が無限大へ増大するので最大存在区間は $(-\infty,1)$ です。
<!-- solution-end -->

#### ODE8-A02 Grönwall
- Level: A

$u(t)\le2+3\int_0^t u(s)ds$ から上界を求めよ。

<!-- solution-start -->
##### 詳細解答
補題に $a=2,b=3$ を代入して $u(t)\le2e^{3t}$ です。
<!-- solution-end -->

#### ODE8-A03 線形成長
- Level: A

$F(x)=\sin x+x/2$ に対し $|F(x)|\le A+B|x|$ となる定数を一組与えよ。

<!-- solution-start -->
##### 詳細解答
$|\sin x|\le1$ から $|F(x)|\le1+|x|/2$。$A=1,B=1/2$ でよいです。
<!-- solution-end -->

#### ODE8-A04 流れ
- Level: A

$x'=-x$ の流れを求め、合成則を直接確認せよ。

<!-- solution-start -->
##### 詳細解答
$\Phi_t(x_0)=e^{-t}x_0$。従って $\Phi_t(\Phi_s(x_0))=e^{-(t+s)}x_0=\Phi_{t+s}(x_0)$ です。
<!-- solution-end -->

### Level B

#### ODE8-B01 初期値差
- Level: B

$F$ が Lipschitz 定数 $L$ を持つとき、二解の差を評価せよ。

<!-- solution-start -->
##### 詳細解答
積分方程式の差から $d(t)\le d(0)+L\int_0^td(s)ds$。Grönwall より $d(t)\le e^{Lt}d(0)$ です。
<!-- solution-end -->

#### ODE8-B02 大域存在
- Level: B

自律方程式

$$
x'=x\sin x
$$

が任意の初期値について全時間存在することを、明示解を求めずに示せ。

<!-- solution-start -->
##### 詳細解答
右辺 $F(x)=x\sin x$ は $C^1$ 級なので局所 Lipschitz です。また

$$
|F(x)|
=
|x\sin x|
\le |x|
$$

より、[線形成長条件による大域存在](#cor-ode8-global-linear-growth)を $A=0$, $B=1$ で適用できます。従ってどの初期値から出る最大解も最大存在区間が $\mathbb R$ となり、有限時間 blow-up は起こりません。
<!-- solution-end -->

#### ODE8-B03 延長不能
- Level: B

$F:\mathbb R^d\to\mathbb R^d$ が局所 Lipschitz で最大解の右端 $\beta<\infty$ とする。解が有界なら矛盾することを説明せよ。

<!-- solution-start -->
##### 詳細解答
有界軌道は有限次元ではある閉球に入ります。時刻列 $t_n\uparrow\beta$ から収束部分列を取り、極限点で局所解を再開すれば $\beta$ を越えて延長できます。最大性に反します。
<!-- solution-end -->

### Level C

#### ODE8-C01 最大解から微分可能な流れまで
- Level: C

$F\in C^1(\mathbb R^d;\mathbb R^d)$ が線形成長条件を満たすとする。次を一続きに示せ。

1. 任意の初期値から大域解が存在する。
2. 一意性から $\Phi_{t+s}=\Phi_t\circ\Phi_s$ が成り立つ。
3. 初期値微分
   $$
   X(t)=D_x\Phi_t(x_0)
   $$
   が存在し、
   $$
   X'(t)=DF(\Phi_t(x_0))X(t),
   \qquad
   X(0)=I
   $$
   を満たす。

<!-- solution-start -->
##### 詳細解答

線形成長条件から [線形成長条件による大域存在](#cor-ode8-global-linear-growth)を適用でき、任意の初期値から出る最大解は全実数時間で存在します。従って

$$
\Phi_t(x_0)
$$

は全ての $t\in\mathbb R$ で定義されます。

次に

$$
y(\tau)=\Phi_\tau(\Phi_s(x_0)),
\qquad
z(\tau)=\Phi_{\tau+s}(x_0)
$$

と置くと、どちらも同じ自律系を満たし、

$$
y(0)=\Phi_s(x_0)=z(0).
$$

一意性から $y(\tau)=z(\tau)$、従って

$$
\Phi_{t+s}(x_0)
=
\Phi_t(\Phi_s(x_0))
$$

です。

最後に $F\in C^1$ なので [流れの初期値微分と変分方程式](#lem-ode8-flow-variational)を適用できます。初期値を $x_0+h$ にずらした解との差は Grönwall により $O(\|h\|)$ で、その差分方程式の係数は

$$
A_h(t)
=
\int_0^1
DF\bigl(\Phi_t(x_0)+\theta(\Phi_t(x_0+h)-\Phi_t(x_0))\bigr)
\,d\theta
$$

です。$h\to0$ で

$$
A_h(t)\to DF(\Phi_t(x_0))
$$

が有限時間区間上一様に成り立つため、一次近似の誤差をもう一度 Grönwall で抑えると

$$
\Phi_t(x_0+h)
=
\Phi_t(x_0)+X(t)h+o(\|h\|)
$$

を得ます。ここで $X$ は

$$
X'(t)
=
DF(\Phi_t(x_0))X(t),
\qquad
X(0)=I
$$

の解です。
<!-- solution-end -->

## 7. 章末チェック

- 最大解と最大存在区間を説明できる。
- 延長不能をコンパクト離脱として説明できる。
- Grönwall を証明し連続依存へ使える。
- 線形成長から大域存在を導ける。
- 一意性から流れの合成則を導ける。
- $C^1$ ベクトル場で流れを初期値微分し、変分方程式を導ける。
