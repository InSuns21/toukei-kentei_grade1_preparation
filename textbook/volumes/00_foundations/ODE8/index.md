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

とします。$D$ は開なので $\overline{B(x_*,r)}\subset D$ となる $r>0$ を取れます。$F$ はこの近傍で局所 Lipschitz であり、Picard--Lindelöf の構成から、初期点が $x_*$ に十分近ければ共通の正の時間幅 $h$ だけ解けます。

十分大きい $n$ では $x(t_n)$ はその近傍にあり、かつ $\beta-t_n<h$ です。時刻 $t_n$ から新しい局所解を開始すると $\beta$ を越えます。一意性により元の解と重なる区間で一致するため、最大性に矛盾します。
<!-- proof-end -->

## 3. Grönwall の不等式

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

積分方程式の差と Lipschitz 条件から

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

任意の有限時間区間で軌道は有界です。最大存在区間の右端が有限なら、閉球に留まる時刻列が得られて延長判定に反します。負時間側も時間反転で同じです。
<!-- proof-end -->

## 6. 自律系を流れとして見る

<a id="def-ode8-flow"></a>
<!-- formal-statement-start -->
> **定義（流れ）**  
> 自律系 $x'=F(x)$ の解が時刻 $t$ まで存在するとき

$$
\Phi_t(x_0):=x(t;x_0)
$$

> と書く。全ての $t\in\mathbb R$ と $x_0$ で定義される場合を大域流れという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode8-flow -->
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

初期値問題の一意性から $y=z$ です。$\Phi_0$ は初期値をそのまま返します。
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

$x'=x\cos t+\sin t$ が任意の初期値について全時間存在することを明示解なしで示せ。

<!-- solution-start -->
##### 詳細解答
$|x\cos t+\sin t|\le|x|+1$ なので線形成長条件を満たします。大域存在系を適用できます。
<!-- solution-end -->

#### ODE8-B03 延長不能
- Level: B

$F:\mathbb R^d\to\mathbb R^d$ が局所 Lipschitz で最大解の右端 $\beta<\infty$ とする。解が有界なら矛盾することを説明せよ。

<!-- solution-start -->
##### 詳細解答
有界軌道は有限次元ではある閉球に入ります。時刻列 $t_n\uparrow\beta$ から収束部分列を取り、極限点で局所解を再開すれば $\beta$ を越えて延長できます。最大性に反します。
<!-- solution-end -->

### Level C

#### ODE8-C01 最大解から流れまで
- Level: C

局所 Lipschitz 自律系について、最大解の一意性、流れの合成則、線形成長なら大域流れになることを一続きに示せ。

<!-- solution-start -->
##### 詳細解答
局所一意性により局所解は重なる区間で一致し、貼り合わせで最大解が一意になります。$\Phi_t(\Phi_s(x))$ と $\Phi_{t+s}(x)$ は同じ初期値を持つ同じ自律系の解なので一致します。線形成長なら Grönwall で任意の有限時間区間上の軌道が有界となり、延長判定から有限端点を持てません。
<!-- solution-end -->

## 7. 章末チェック

- 最大解と最大存在区間を説明できる。
- 延長不能をコンパクト離脱として説明できる。
- Grönwall を証明し連続依存へ使える。
- 線形成長から大域存在を導ける。
- 一意性から流れの合成則を導ける。
