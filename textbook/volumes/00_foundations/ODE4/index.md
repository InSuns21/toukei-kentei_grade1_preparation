# ODE4 標準常微分方程式 IV：非線形系・位相平面・線形化

ODE3 では $x'=Ax$ を完全に解き、固有値・Jordan 構造から位相図と安定性を読めるようにしました。本章では右辺を一般の非線形写像へ広げ、

$$
\boxed{x'=F(x)}
$$

を扱います。

非線形系では普通、解を初等関数で書き切ることはできません。代わりに次の三つを組み合わせます。

```text
平衡点を探す
  ↓
位相平面・nullcline で流れの向きを読む
  ↓
平衡点の近くでは Jacobian で線形化する
  ↓
線形部が十分強く減衰するなら非線形剰余を押さえ込む

別ルート：保存量 H があれば H=constant に軌道を閉じ込める
```

本章の重要な境界は、**「Jacobian を計算した」ことと「非線形系の挙動を証明した」ことは同じではない**という点です。特に固有値の実部が0に触れる非双曲型平衡点では、高次項を捨てると結論そのものが消えることがあります。

前提として、ODE3 の[定係数線形系の安定性判定](../ODE3/index.md#thm-ode3-spectral-stability)と、F0-02C3 の[Fréchet 微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative)を使います。

---

## 1. 非線形自律系と平衡点

<a id="def-ode4-nonlinear-autonomous-system"></a>
<!-- formal-statement-start -->
> **定義（非線形自律系・平衡点）**  
> $U\subset\mathbb R^d$ を開集合、$F:U\to\mathbb R^d$ を連続写像とする。
>
> $$
> x'(t)=F(x(t))
> $$
>
> の形の常微分方程式を **自律系** という。$F$ が線形写像に限られないとき、一般に **非線形自律系** と呼ぶ。点 $x_*\in U$ が
>
> $$
> F(x_*)=0
> $$
>
> を満たすとき、$x_*$ を **平衡点** という。このとき $x(t)\equiv x_*$ は定数解である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-nonlinear-autonomous-system -->
### 例：三次非線形系の平衡点を定義から確認する

$$
\begin{cases}
x'=x-x^3,\\
y'=-y
\end{cases}
$$

とします。右辺を

$$
F(x,y)=(x-x^3,-y)
$$

と置くと、平衡点は $F(x,y)=(0,0)$ を満たす点です。従って

$$
x(1-x^2)=0,\qquad y=0
$$

より

$$
\boxed{(0,0),\ (1,0),\ (-1,0)}
$$

の三点です。実際、例えば $(1,0)$ では $F(1,0)=(0,0)$ なので、$x(t)\equiv1$, $y(t)\equiv0$ は解です。
<!-- definition-example-end -->

### なぜ自律系では平衡点が中心になるのか

時刻 $t$ が右辺に陽に現れないので、状態 $x$ が同じなら速度 $F(x)$ も同じです。従って状態空間の各点へ矢印 $F(x)$ を置くと、解はその矢印に接しながら進みます。平衡点は矢印が0になる点です。

$F$ が $C^1$ なら局所的に Lipschitz なので、ODE1 の [Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)が使えます。一意性があると、異なる解軌道が同じ時刻・同じ点で交差してその後別れることはできません。

---

## 2. 軌道・位相平面・nullcline

二次元系

$$
\begin{cases}
x'=f(x,y),\\
y'=g(x,y)
\end{cases}
$$

では、時間関数 $x(t),y(t)$ を直接描く代わりに、状態 $(x(t),y(t))$ が平面内をどう動くかを読みます。

<a id="def-ode4-phase-plane-nullcline"></a>
<!-- formal-statement-start -->
> **定義（軌道・位相平面・nullcline）**  
> 二次元自律系の一つの解 $(x(t),y(t))$ が状態平面に描く集合を **軌道** といい、軌道と流れの向きを状態平面上で調べる見方を **位相平面**（phase plane）という。
>
> - $f(x,y)=0$ を満たす点の集合を $x$-nullcline という。その上では $x'=0$ なのでベクトル場は鉛直方向を向く。
> - $g(x,y)=0$ を満たす点の集合を $y$-nullcline という。その上では $y'=0$ なのでベクトル場は水平方向を向く。
>
> 両 nullcline の交点では $f=g=0$ なので平衡点である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-phase-plane-nullcline -->
### 例：nullcline を実際に使う

$$
\begin{cases}
x'=x(1-x),\\
y'=-y
\end{cases}
$$

を考えます。

$x$-nullcline は

$$
x(1-x)=0
$$

より $x=0,1$、$y$-nullcline は $y=0$ です。従って平衡点は

$$
(0,0),\qquad (1,0)
$$

です。

さらに符号を読むと、

- $x<0$ では $x'<0$、
- $0<x<1$ では $x'>0$、
- $x>1$ では $x'<0$、
- $y>0$ では $y'<0$、$y<0$ では $y'>0$

です。したがって $y$ は上下どちらからも $0$ へ向かい、$0<x$ の範囲では $x$ は $1$ へ向かいます。一方、原点の左側では $x$ がさらに負へ進むので、$(0,0)$ と $(1,0)$ の局所挙動は異なります。
<!-- definition-example-end -->

### nullcline が教えること・教えないこと

nullcline は「ある成分の速度が0になる場所」と「その周囲での符号」を教えます。しかし軌道そのものではありません。例えば $x$-nullcline 上でも一般には $y'\ne0$ なので、その曲線に沿って進むとは限りません。ここを取り違えると位相図を誤読します。

---

## 3. 平衡点の近くを Jacobian で線形化する

平衡点 $x_*$ の近くで

$$
u=x-x_*
$$

と変位を取ります。$x_*' =0$ なので

$$
u'=F(x_*+u).
$$

平衡点条件 $F(x_*)=0$ と Fréchet 微分を組み合わせれば、一次項だけを取り出せます。

<a id="def-ode4-linearization"></a>
<!-- formal-statement-start -->
> **定義（線形化・線形化行列）**  
> $F:U\subset\mathbb R^d\to\mathbb R^d$ が平衡点 $x_*$ で Fréchet 微分可能であるとする。$A=DF(x_*)$ を $x_*$ における **線形化行列** といい、変位 $u=x-x_*$ に対する線形系
>
> $$
> u'=Au
> $$
>
> を元の非線形系の $x_*$ まわりの **線形化** という。標準座標では $A$ は Jacobian 行列
>
> $$
> A=J_F(x_*)=\left(\frac{\partial F_i}{\partial x_j}(x_*)\right)_{i,j}
> $$
>
> で表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-linearization -->
### 例：三次系を三つの平衡点で線形化する

先ほどの

$$
F(x,y)=(x-x^3,-y)
$$

では

$$
J_F(x,y)=
\begin{pmatrix}
1-3x^2&0\\
0&-1
\end{pmatrix}.
$$

従って

$$
J_F(0,0)=
\begin{pmatrix}1&0\\0&-1\end{pmatrix},
$$

一方

$$
J_F(\pm1,0)=
\begin{pmatrix}-2&0\\0&-1\end{pmatrix}.
$$

原点の線形化は saddle、$(\pm1,0)$ の線形化は指数安定な sink です。後で、後者の「線形部が指数減衰する」という情報は非線形系へ本当に移せることを証明します。
<!-- definition-example-end -->

<a id="thm-ode4-linearization-remainder"></a>
<!-- formal-statement-start -->
> **定理（Fréchet 微分による平衡点まわりの線形化）**  
> $F:U\subset\mathbb R^d\to\mathbb R^d$ が平衡点 $x_*\in U$ で Fréchet 微分可能で、$A=DF(x_*)$ とする。このとき $u=x-x_*$ に対して
>
> $$
> u'=Au+r(u),
> $$
>
> と書け、剰余 $r$ は
>
> $$
> \boxed{\frac{\|r(u)\|}{\|u\|}\to0\qquad(u\to0)}
> $$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Fréchet 微分の定義から

$$
F(x_*+u)=F(x_*)+DF(x_*)u+r(u),
\qquad
\frac{\|r(u)\|}{\|u\|}\to0.
$$

$x_*$ は平衡点なので $F(x_*)=0$、また $A=DF(x_*)$ です。従って

$$
F(x_*+u)=Au+r(u).
$$

$x=x_*+u$ と $x_*'=0$ から $u'=x'=F(x_*+u)$ なので

$$
\boxed{u'=Au+r(u)}.
$$

ここで $r(u)=o(\|u\|)$ という条件が「非線形項は一次項より小さい」の正確な意味です。$\square$
<!-- proof-end -->

---

## 4. 双曲型と非双曲型：固有値が実部0に触れるか

<a id="def-ode4-hyperbolic-equilibrium"></a>
<!-- formal-statement-start -->
> **定義（双曲型・非双曲型平衡点）**  
> $C^1$ 自律系 $x'=F(x)$ の平衡点 $x_*$ を考え、$A=DF(x_*)$ とする。$A$ のどの固有値も実部0を持たないとき $x_*$ を **双曲型平衡点** という。実部0の固有値が少なくとも一つあるとき **非双曲型平衡点** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-hyperbolic-equilibrium -->
### 例：同じ章の二つの型

三次系 $x'=x-x^3$, $y'=-y$ の原点では固有値は $1,-1$ です。どちらも実部0ではないので原点は双曲型です。

一方、後で扱う

$$
x'=y,\qquad y'=-x-x^3
$$

の原点では

$$
A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

で固有値は $\pm i$。実部0なので非双曲型です。
<!-- definition-example-end -->

### 二次元での実務的な読み方

二次元では $A=DF(x_*)$ の trace と determinant を

$$
\tau=\operatorname{tr}A,\qquad \Delta=\det A
$$

とすれば特性方程式は

$$
\lambda^2-\tau\lambda+\Delta=0
$$

です。ODE3 の線形位相図を使えば、例えば

- $\Delta<0$：実固有値の符号が反対で線形化は saddle、
- $\Delta>0$, $\tau<0$, $\tau^2-4\Delta\ge0$：安定 node 型、
- $\Delta>0$, $\tau<0$, $\tau^2-4\Delta<0$：安定 spiral 型

などを素早く読めます。

ただしこれはまず **線形化の型** を読んでいるだけです。非線形系の結論へ移すには定理が必要です。次節では、最も重要で証明も閉じられる「全固有値の実部が負」の場合を扱います。

---

## 5. Hurwitz 線形化なら局所指数安定

全固有値の実部が負の行列を Hurwitz 行列と呼びます。ODE3 から、その行列指数は

$$
\|e^{tA}v\|\le Ce^{-\gamma t}\|v\|
$$

と指数減衰します。非線形剰余が $o(\|u\|)$ なら、平衡点の十分近くではこの減衰が剰余を上回ります。

<a id="thm-ode4-hurwitz-local-stability"></a>
<!-- formal-statement-start -->
> **定理（Hurwitz 線形化による局所指数安定性）**  
> $U\subset\mathbb R^d$ を開集合、$F:U\to\mathbb R^d$ を $C^1$、$x_*\in U$ を平衡点とする。$A=DF(x_*)$ の全固有値が
>
> $$
> \operatorname{Re}\lambda<0
> $$
>
> を満たすとする。このとき、ある $\delta>0$, $K\ge1$, $\beta>0$ が存在し、$\|x(0)-x_*\|<\delta$ なら対応する解は全ての $t\ge0$ で存在して
>
> $$
> \boxed{\|x(t)-x_*\|\le Ke^{-\beta t}\|x(0)-x_*\|}
> $$
>
> を満たす。従って $x_*$ は局所指数安定、特に漸近安定である。
<!-- formal-statement-end -->

### 証明の見取り図

変位 $u=x-x_*$ は

$$
u'=Au+r(u),\qquad r(u)=o(\|u\|)
$$

を満たします。ODE3 の定数変化公式で

$$
u(t)=e^{tA}u_0+\int_0^te^{(t-s)A}r(u(s))\,ds.
$$

線形部は $Ce^{-\gamma t}$ で減衰し、十分小さい球内では $\|r(u)\|\le\eta\|u\|$ とできます。積分不等式を解けば、$\eta$ を十分小さく取ったとき指数減衰が残ります。最後に「その球から出ない」ことを退出時刻で確認します。

<!-- proof-start -->
### 証明

[定係数線形系の安定性判定](../ODE3/index.md#thm-ode3-spectral-stability)より、ある $C\ge1$, $\gamma>0$ が存在して

$$
\|e^{tA}v\|\le Ce^{-\gamma t}\|v\|
\qquad(t\ge0)
$$

となります。

一方、[平衡点まわりの線形化](#thm-ode4-linearization-remainder)より

$$
u'=Au+r(u),
\qquad
\frac{\|r(u)\|}{\|u\|}\to0.
$$

そこで

$$
0<\eta<\frac{\gamma}{2C}
$$

を固定します。$r(u)=o(\|u\|)$ だから、ある $\rho>0$ を十分小さく取れば閉球 $\overline B_\rho(0)$ が $U-x_*$ に含まれ、

$$
\|u\|\le\rho
\Longrightarrow
\|r(u)\|\le\eta\|u\|
$$

とできます。

解がこの球内にある時間について、[定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)を $r(u(t))$ という連続な強制項へ適用すると

$$
u(t)=e^{tA}u_0+
\int_0^te^{(t-s)A}r(u(s))\,ds.
$$

従って

$$
\|u(t)\|
\le
Ce^{-\gamma t}\|u_0\|
+C\eta\int_0^te^{-\gamma(t-s)}\|u(s)\|\,ds.
$$

両辺へ $e^{\gamma t}$ を掛け、

$$
z(t):=e^{\gamma t}\|u(t)\|
$$

と置くと

$$
z(t)\le C\|u_0\|+C\eta\int_0^tz(s)\,ds.
$$

ここで必要な積分不等式をその場で示します。一般に非負連続関数 $z$ が

$$
z(t)\le a+b\int_0^tz(s)\,ds
$$

を満たすとき

$$
w(t):=a+b\int_0^tz(s)\,ds
$$

と置けば $z\le w$ かつ

$$
w'(t)=bz(t)\le bw(t).
$$

従って

$$
\frac{d}{dt}\{e^{-bt}w(t)\}\le0,
$$

なので $w(t)\le ae^{bt}$、したがって $z(t)\le ae^{bt}$ です。これを $a=C\|u_0\|$, $b=C\eta$ に使うと

$$
z(t)\le C\|u_0\|e^{C\eta t}.
$$

よって

$$
\|u(t)\|
\le
C e^{-(\gamma-C\eta)t}\|u_0\|
\le
C e^{-\gamma t/2}\|u_0\|.
$$

残る問題は、この評価を使う前提だった「解が $\rho$ 球内にある」が本当に全時刻で続くかです。

$$
\|u_0\|<\delta:=\frac{\rho}{2C}
$$

とします。もし最初に $\|u(t)\|=\rho$ となる退出時刻 $T$ があれば、$0\le t\le T$ では上の評価が使え、特に

$$
\|u(T)\|
\le C e^{-\gamma T/2}\|u_0\|
<C\delta=\frac\rho2,
$$

となって $\|u(T)\|=\rho$ に矛盾します。従って有限の退出時刻はありません。

さらに有限時刻 $T$ で解の存在区間だけが終わることもありません。実際、解は $\overline B_{\rho/2}(0)$ に留まり、$F$ はその周囲のコンパクト集合上で有界です。$\|x'(t)\|=\|F(x(t))\|\le M$ とできるので

$$
\|x(t)-x(s)\|\le M|t-s|.
$$

従って $t\uparrow T$ で $x(t)$ は Cauchy となり極限 $x_T$ を持ちます。$x_T$ は依然として $U$ の内部にあり、$C^1$ 性から局所 Lipschitz なので、ODE1 の Picard--Lindelöf 定理を $x_T$ から再適用して $T$ を越えて解を延長できます。これは最大存在区間の終端という仮定に矛盾します。

以上より全ての $t\ge0$ で

$$
\|x(t)-x_*\|
\le
C e^{-\gamma t/2}\|x(0)-x_*\|
$$

が成り立ちます。$K=C$, $\beta=\gamma/2$ とすれば主張を得ます。$\square$
<!-- proof-end -->

### 例：三次系の二つの sink は本当に安定

$$
x'=x-x^3,\qquad y'=-y
$$

の $(\pm1,0)$ では Jacobian の固有値は $-2,-1$ です。従って定理により、両平衡点は元の **非線形系そのものについて** 局所指数安定です。

これは「Jacobian の固有値が負だからたぶん安定」という経験則ではなく、剰余 $r(u)=o(\|u\|)$ が指数減衰へ吸収されることを証明した結果です。

### 原点の saddle はどう確認するか

原点では線形化固有値が $1,-1$ です。本章では正の実部を持つ固有値から一般の非線形不安定性を導く完全な双曲型線形化定理までは証明しません。ただしこの具体例では第一式が $y$ と独立なので直接判定できます。

$0<x_0<1$ なら

$$
x'=x(1-x^2)>0
$$

で $x$ は増加し、原点の任意の小近傍から外へ進みます。従って原点は不安定です。

---

## 6. 保存量：解けなくても軌道を level set に閉じ込める

線形化が境界に来る場合や、軌道全体の形を知りたい場合、別の強力な道具が保存量です。

<a id="def-ode4-first-integral"></a>
<!-- formal-statement-start -->
> **定義（保存量・第一積分）**  
> 自律系 $x'=F(x)$ に対し、$C^1$ 関数 $H:U\to\mathbb R$ が **保存量**（第一積分）であるとは、任意の解 $x(t)$ について、その存在区間上で
>
> $$
> H(x(t))=\text{constant}
> $$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-first-integral -->
### 例：非線形振動子のエネルギー

$$
x'=y,\qquad y'=-x-x^3
$$

に対し

$$
H(x,y)=\frac12y^2+\frac12x^2+\frac14x^4
$$

と置きます。軌道に沿って直接微分すると

$$
\begin{aligned}
\frac d{dt}H(x(t),y(t))
&=yy'+xx'+x^3x'\\
&=y(-x-x^3)+xy+x^3y\\
&=0.
\end{aligned}
$$

従って $H$ は保存量です。初期値 $(x_0,y_0)$ から出た軌道は

$$
H(x,y)=H(x_0,y_0)
$$

という level set から外へ出ません。
<!-- definition-example-end -->

<a id="thm-ode4-first-integral-criterion"></a>
<!-- formal-statement-start -->
> **定理（保存量の微分判定）**  
> $F:U\to\mathbb R^d$ と $H:U\to\mathbb R$ を $C^1$ とする。全ての $x\in U$ で
>
> $$
> \boxed{\nabla H(x)\cdot F(x)=0}
> $$
>
> が成り立つなら、$H$ は自律系 $x'=F(x)$ の保存量である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

解 $x(t)$ に対し、[Fréchet 連鎖律](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-chain-rule)から

$$
\frac d{dt}H(x(t))
=DH(x(t))[x'(t)].
$$

有限次元のスカラー値関数では $DH(x)[v]=\nabla H(x)\cdot v$ なので、$x'=F(x)$ を代入して

$$
\frac d{dt}H(x(t))
=\nabla H(x(t))\cdot F(x(t))=0.
$$

従って $H(x(t))$ は各連結な時間区間で一定です。$\square$
<!-- proof-end -->

### 保存量から原点の安定性まで読む

上の非線形振動子では

$$
H(x,y)\ge\frac12(x^2+y^2).
$$

一方、$\|(x,y)\|\le1$ なら $x^4\le x^2$ なので

$$
H(x,y)
\le\frac12y^2+\frac34x^2
\le\frac34(x^2+y^2).
$$

したがって十分小さい初期値なら保存される $H$ も小さく、全時刻で

$$
x(t)^2+y(t)^2\le2H(x_0,y_0)
$$

です。原点は Lyapunov 安定です。

ところが Jacobian は

$$
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

で固有値は $\pm i$。実部0なので前節の Hurwitz 定理は使えません。ここでは高次項と保存量を捨てずに見ることで結論が得られました。

---

## 7. 非双曲型では線形化だけで判定できない

線形化の限界を最も短く示すのは一次元です。

<a id="prop-ode4-nonhyperbolic-warning"></a>
<!-- formal-statement-start -->
> **命題（非双曲型では線形化だけでは判定不能）**  
> 次の二つの自律方程式
>
> $$
> x'=-x^3,
> \qquad
> x'=x^3
> $$
>
> はともに原点を平衡点に持ち、原点での線形化は同じ $u'=0$ である。しかし前者の原点は漸近安定、後者の原点は不安定である。従って、線形化行列に実部0の固有値がある場合、Jacobian だけから一般に安定性を決定することはできない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
f_-(x)=-x^3,\qquad f_+(x)=x^3
$$

はいずれも

$$
f_-'(0)=f_+'(0)=0
$$

なので、原点での線形化はどちらも $u'=0$ です。

$x'=-x^3$ について $x_0\ne0$ とし、変数分離すると

$$
\frac{dx}{x^3}=-dt.
$$

積分して

$$
-\frac1{2x(t)^2}=-t-\frac1{2x_0^2},
$$

従って

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1+2x_0^2t}}}.
$$

符号は初期値と同じで、

$$
|x(t)|\le|x_0|,
\qquad
x(t)\to0.
$$

よって原点は Lyapunov 安定かつ吸引的、従って漸近安定です。

一方 $x'=x^3$ では

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1-2x_0^2t}}}
$$

で、$x_0\ne0$ なら $t=1/(2x_0^2)$ に近づくにつれて絶対値が増大します。任意に小さい $x_0$ から出発しても固定した小近傍の外へ出るため、原点は Lyapunov 不安定です。

両者の違いは一次項ではなく三次項の符号にあります。線形化ではまさにその項を捨てたため、判定機構も一緒に失われました。$\square$
<!-- proof-end -->

### 「実部0なら center」ではない

ODE3 の純虚数固有値が center を与えたのは **線形系** だからです。非線形系で純虚数固有値を得ても、非線形項によって内向き spiral、外向き spiral、閉軌道などが起こり得ます。本章では一般の中心多様体・正規形・Hopf 分岐までは扱いません。これらは ODE5 以降の標準コアではなく、力学系の発展理論に属します。

---

## 8. 位相平面を読む実践フロー

二次元非線形自律系を見たら、次の順に調べると情報が混線しにくくなります。

```text
(1) f(x,y)=0, g(x,y)=0 を解いて平衡点を列挙
       ↓
(2) nullcline と各領域での f,g の符号を見る
       ↓
(3) 各平衡点で J_F を計算
       ↓
(4) 固有値を ODE3 の線形分類で読む
       ↓
(5) 全 Re λ < 0 なら本章の定理で局所指数安定
       ↓
(6) 実部0があるなら判定停止
       ├─ 保存量があるか
       ├─ 方程式を直接解けるか
       └─ 高次項の符号・比較が使えるか
```

「判定停止」は失敗ではありません。線形化が保持していない情報を、別の道具で補うべき場所を正しく認識したということです。

---

## 9. 一般の双曲型線形化定理との境界

双曲型平衡点については、より強い **Hartman--Grobman 定理** があり、適切な仮定の下で平衡点近傍の非線形フローと線形化フローが位相的に共役になります。これにより sink / source / saddle の局所的な位相構造を一般に移せます。

ただし、その証明は本章で準備した指数評価より一段重く、固定点構成と安定・不安定方向の分解を要します。本章では定理を証明済みの道具として使いません。ここで閉じるのは次です。

- Fréchet 微分から線形化剰余 $o(\|u\|)$ を得ること。
- Hurwitz 線形化なら局所指数安定であることを本文内で証明すること。
- 保存量で非双曲型の具体例を解析すること。
- 非双曲型では Jacobian だけでは不十分であることを反例で確認すること。

中心多様体、安定多様体の一般論、Poincaré--Bendixson、Hopf 分岐、一般の分岐理論はこの標準コアの停止線の外です。

---

## 10. 演習

### Level A

<a id="ex-ode4-a01"></a>
#### ODE4-A01 平衡点と Jacobian
- Level: A

$$
\begin{cases}
x'=x(1-x),\\
y'=-2y
\end{cases}
$$

について、平衡点を全て求め、それぞれで Jacobian と固有値を計算せよ。Hurwitz 線形化定理を適用できる平衡点を答えよ。

<!-- solution-start -->
**詳細解答**

右辺を

$$
F(x,y)=(x(1-x),-2y)
$$

と置きます。平衡点では

$$
x(1-x)=0,\qquad -2y=0
$$

なので

$$
\boxed{(0,0),\ (1,0)}
$$

です。

Jacobian は

$$
J_F(x,y)=
\begin{pmatrix}
1-2x&0\\
0&-2
\end{pmatrix}.
$$

原点では

$$
J_F(0,0)=\begin{pmatrix}1&0\\0&-2\end{pmatrix}
$$

で固有値は $1,-2$。正の固有値を持つため Hurwitz ではありません。

$(1,0)$ では

$$
J_F(1,0)=\begin{pmatrix}-1&0\\0&-2\end{pmatrix}
$$

で固有値は $-1,-2$。全て実部が負なので Hurwitz です。従って[Hurwitz 線形化による局所指数安定性](#thm-ode4-hurwitz-local-stability)から

$$
\boxed{(1,0)\text{ は局所指数安定}}
$$

です。
<!-- solution-end -->

<a id="ex-ode4-a02"></a>
#### ODE4-A02 nullcline と流れの向き
- Level: A

$$
\begin{cases}
x'=x(1-y),\\
y'=y(x-1)
\end{cases}
$$

を考える。

1. $x$-nullcline と $y$-nullcline を求めよ。
2. 平衡点を全て求めよ。
3. 第一象限で直線 $x=1$, $y=1$ によって分かれる四領域について、$x'$ と $y'$ の符号を求めよ。

<!-- solution-start -->
**詳細解答**

1. $x'=0$ は

$$
x(1-y)=0
$$

なので

$$
\boxed{x=0\ \text{または}\ y=1}.
$$

$y'=0$ は

$$
y(x-1)=0
$$

なので

$$
\boxed{y=0\ \text{または}\ x=1}.
$$

2. 両方を同時に満たす点は

$$
\boxed{(0,0),\ (1,1)}
$$

です。

3. 第一象限では $x,y>0$ なので、$x'$ の符号は $1-y$、$y'$ の符号は $x-1$ だけで決まります。

| 領域 | $x'$ | $y'$ | 向き |
|---|---:|---:|---|
| $x<1,y<1$ | $+$ | $-$ | 右下 |
| $x>1,y<1$ | $+$ | $+$ | 右上 |
| $x>1,y>1$ | $-$ | $+$ | 左上 |
| $x<1,y>1$ | $-$ | $-$ | 左下 |

従って $(1,1)$ の周囲では四象限を順に回る向きが見えます。ただし、この符号表だけで軌道が閉じることまでは証明していません。
<!-- solution-end -->

<a id="ex-ode4-a03"></a>
#### ODE4-A03 線形化剰余を計算する
- Level: A

$$
F(x,y)=(-x+x^2+xy,-2y+y^2)
$$

とする。原点が平衡点であることを確認し、$A=DF(0,0)$ と $r(u)=F(u)-Au$ を求め、$r(u)=o(\|u\|)$ を直接示せ。

<!-- solution-start -->
**詳細解答**

まず

$$
F(0,0)=(0,0)
$$

なので原点は平衡点です。

Jacobian は

$$
J_F(x,y)=
\begin{pmatrix}
-1+2x+y&x\\
0&-2+2y
\end{pmatrix}
$$

だから

$$
A=J_F(0,0)=
\begin{pmatrix}-1&0\\0&-2\end{pmatrix}.
$$

$u=(x,y)$ と書けば

$$
Au=(-x,-2y),
$$

従って

$$
r(u)=F(u)-Au=(x^2+xy,y^2).
$$

$\rho=\sqrt{x^2+y^2}=\|u\|_2$ とすると $|x|,|y|\le\rho$ なので

$$
|x^2+xy|\le |x|^2+|x||y|\le2\rho^2,
\qquad
|y^2|\le\rho^2.
$$

よって

$$
\|r(u)\|_2
\le\sqrt{(2\rho^2)^2+(\rho^2)^2}
=\sqrt5\,\rho^2.
$$

従って $u\ne0$ で

$$
\frac{\|r(u)\|_2}{\|u\|_2}
\le\sqrt5\,\rho\to0.
$$

したがって

$$
\boxed{r(u)=o(\|u\|)}.
$$
<!-- solution-end -->

<a id="ex-ode4-a04"></a>
#### ODE4-A04 保存量を直接検証する
- Level: A

$$
x'=y,\qquad y'=-x-x^3
$$

について

$$
H(x,y)=\frac12y^2+\frac12x^2+\frac14x^4
$$

が保存量であることを、$\nabla H\cdot F$ を計算して示せ。また $H(x_0,y_0)=c$ なら軌道がどこに拘束されるか答えよ。

<!-- solution-start -->
**詳細解答**

$$
\nabla H(x,y)=(x+x^3,y),
\qquad
F(x,y)=(y,-x-x^3).
$$

従って

$$
\begin{aligned}
\nabla H\cdot F
&=(x+x^3)y+y(-x-x^3)\\
&=0.
\end{aligned}
$$

[保存量の微分判定](#thm-ode4-first-integral-criterion)により $H$ は保存量です。従って初期値で $H(x_0,y_0)=c$ なら全ての存在時刻で

$$
\boxed{H(x(t),y(t))=c}
$$

であり、軌道は level set

$$
\boxed{\frac12y^2+\frac12x^2+\frac14x^4=c}
$$

から外へ出ません。
<!-- solution-end -->

### Level B

<a id="ex-ode4-b01"></a>
#### ODE4-B01 Hurwitz 線形化を非線形系へ適用する
- Level: B

$$
\begin{cases}
x'=-x+x^2,\\
y'=-2y+xy
\end{cases}
$$

について原点の局所安定性を判定せよ。また、線形化だけを計算して終わらず、本章のどの仮定が満たされているかを順に確認せよ。

<!-- solution-start -->
**詳細解答**

右辺を

$$
F(x,y)=(-x+x^2,-2y+xy)
$$

と置きます。多項式写像なので $F$ は $C^1$ です。また

$$
F(0,0)=(0,0)
$$

なので原点は平衡点です。

Jacobian は

$$
J_F(x,y)=
\begin{pmatrix}
-1+2x&0\\
y&-2+x
\end{pmatrix},
$$

従って

$$
A=J_F(0,0)=
\begin{pmatrix}-1&0\\0&-2\end{pmatrix}.
$$

固有値は $-1,-2$ で、どちらも実部が負です。よって $A$ は Hurwitz 行列です。

確認した仮定は

1. $F$ が $C^1$、
2. 原点が平衡点、
3. 線形化行列 $DF(0,0)$ の全固有値の実部が負、

の三点です。従って[Hurwitz 線形化による局所指数安定性](#thm-ode4-hurwitz-local-stability)を適用でき、ある $\delta,K,\beta>0$ が存在して $\|(x_0,y_0)\|<\delta$ なら

$$
\|(x(t),y(t))\|
\le Ke^{-\beta t}\|(x_0,y_0)\|.
$$

したがって

$$
\boxed{(0,0)\text{ は局所指数安定、特に漸近安定}}
$$

です。
<!-- solution-end -->

<a id="ex-ode4-b02"></a>
#### ODE4-B02 同じ線形化、逆の安定性
- Level: B

次の二つを比較する。

$$
\text{(I)}\quad x'=-2x^3,
\qquad
\text{(II)}\quad x'=2x^3.
$$

1. 原点での線形化を求めよ。
2. 両方を初期値 $x(0)=x_0\ne0$ で解け。
3. 原点の安定性をそれぞれ判定し、「線形化で判定不能」の意味を説明せよ。

<!-- solution-start -->
**詳細解答**

1. $f_1(x)=-2x^3$, $f_2(x)=2x^3$ とすると

$$
f_1'(0)=f_2'(0)=0.
$$

従って両方の線形化は

$$
\boxed{u'=0}
$$

で同一です。

2. (I) では

$$
\frac{dx}{x^3}=-2dt.
$$

積分して

$$
-\frac1{2x^2}=-2t-\frac1{2x_0^2}
$$

なので

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1+4x_0^2t}}}.
$$

(II) では同様に

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1-4x_0^2t}}}.
$$

3. (I) では $|x(t)|\le|x_0|$ かつ $x(t)\to0$ なので原点は漸近安定です。(II) では任意に小さい非零初期値からでも $|x(t)|$ が増大し、有限時間で分母が0へ近づくので原点は不安定です。

線形化 $u'=0$ は両者を区別できません。失われた情報は最初に非零となる三次項の符号です。従って

$$
\boxed{\text{非双曲型では高次項を捨てた線形化だけでは一般に判定できない}}
$$

という意味が具体的に確認できました。
<!-- solution-end -->

<a id="ex-ode4-b03"></a>
#### ODE4-B03 非線形振り子を保存量で調べる
- Level: B

$$
x'=y,\qquad y'=-\sin x
$$

を考える。

1. 平衡点を求めよ。
2. $H(x,y)=\frac12y^2+1-\cos x$ が保存量であることを示せ。
3. 原点で線形化し、なぜ Hurwitz 線形化定理では判定できないか説明せよ。
4. $|x|\le1$ の範囲で $1-\cos x$ が $x^2$ と同程度の大きさであることを使い、原点が Lyapunov 安定であることを示せ。

<!-- solution-start -->
**詳細解答**

1. 平衡点では

$$
y=0,\qquad \sin x=0.
$$

従って

$$
\boxed{(k\pi,0)\quad(k\in\mathbb Z)}.
$$

2. 

$$
\nabla H(x,y)=(\sin x,y),
\qquad
F(x,y)=(y,-\sin x)
$$

だから

$$
\nabla H\cdot F
=\sin x\,y-y\sin x=0.
$$

よって $H$ は保存量です。

3. Jacobian は

$$
J_F(x,y)=
\begin{pmatrix}
0&1\\
-\cos x&0
\end{pmatrix}.
$$

原点では

$$
A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

で固有値は $\pm i$。実部0なので Hurwitz ではなく、[Hurwitz 線形化定理](#thm-ode4-hurwitz-local-stability)の仮定を満たしません。

4. $|x|\le1$ では Taylor の積分表示または平均値評価から、ある正定数 $c$ が存在して

$$
1-\cos x\ge c x^2
$$

とできます。例えば $\cos \xi\ge\cos1>0$ を用いれば

$$
1-\cos x
=\int_0^x\sin s\,ds
\ge \frac{\cos1}{2}x^2
$$

という評価を得られます（$x<0$ でも対称性で同じ）。また $1-\cos x\le x^2/2$ です。

従って原点近傍では

$$
c_1(x^2+y^2)\le H(x,y)\le c_2(x^2+y^2)
$$

となる正定数 $c_1,c_2$ が取れます。$H$ は保存されるので、任意の $\varepsilon>0$ を十分小さく固定し、初期値を十分小さくして

$$
H(x_0,y_0)<c_1\varepsilon^2
$$

とすれば、全時刻で

$$
c_1(x(t)^2+y(t)^2)\le H(x(t),y(t))=H(x_0,y_0)<c_1\varepsilon^2.
$$

よって

$$
\sqrt{x(t)^2+y(t)^2}<\varepsilon.
$$

したがって原点は Lyapunov 安定です。
<!-- solution-end -->

### Level C

<a id="ex-ode4-c01"></a>
#### ODE4-C01 三つの平衡点を位相平面と線形化で統合判定する
- Level: C

$$
\begin{cases}
x'=x-x^3,\\
y'=-y+x^2
\end{cases}
$$

を考える。

1. 平衡点を全て求めよ。
2. $x$-nullcline と $y$-nullcline を求めよ。
3. 各平衡点で Jacobian と固有値を求めよ。
4. Hurwitz 線形化定理を使える平衡点について、元の非線形系の局所安定性を結論せよ。
5. 原点については $x$ 方程式が独立であることを使い、線形化の一般定理に頼らず不安定性を直接示せ。
6. この問題で nullcline、線形化、直接解析がそれぞれ何を担当したか整理せよ。

<!-- solution-start -->
**詳細解答**

1. 平衡点では

$$
x-x^3=x(1-x^2)=0,
\qquad
-y+x^2=0.
$$

第一式から $x=0,\pm1$、第二式から $y=x^2$ なので

$$
\boxed{(0,0),\ (1,1),\ (-1,1)}.
$$

2. $x$-nullcline は

$$
\boxed{x=0,\ x=1,\ x=-1},
$$

$y$-nullcline は

$$
\boxed{y=x^2}
$$

です。交点が上で求めた三平衡点になっています。

3. Jacobian は

$$
J_F(x,y)=
\begin{pmatrix}
1-3x^2&0\\
2x&-1
\end{pmatrix}.
$$

三角行列なので固有値は対角成分です。

原点では

$$
J_F(0,0)=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
$$

従って固有値は

$$
\boxed{1,-1}.
$$

$(1,1)$ では

$$
J_F(1,1)=\begin{pmatrix}-2&0\\2&-1\end{pmatrix},
$$

$(-1,1)$ では

$$
J_F(-1,1)=\begin{pmatrix}-2&0\\-2&-1\end{pmatrix}.
$$

いずれも固有値は

$$
\boxed{-2,-1}.
$$

4. $(\pm1,1)$ では全固有値の実部が負なので Hurwitz です。右辺は多項式で $C^1$。従って[Hurwitz 線形化による局所指数安定性](#thm-ode4-hurwitz-local-stability)から

$$
\boxed{(1,1),\ (-1,1)\text{ は局所指数安定}}
$$

です。

5. 原点では第一方程式

$$
x'=x(1-x^2)
$$

が $y$ に依存しません。$0<x_0<1$ なら、$0<x<1$ にいる限り

$$
x'>0.
$$

さらに例えば $0<x\le1/2$ なら

$$
1-x^2\ge\frac34,
$$

従って

$$
x'\ge\frac34x.
$$

$x(t)$ が $1/2$ に達するまで

$$
\frac{x'}x\ge\frac34
$$

なので積分して

$$
x(t)\ge x_0e^{3t/4}.
$$

任意に小さい $x_0>0$ でも有限時間後に、例えば固定半径 $1/4$ の近傍から外へ出ます。従って

$$
\boxed{(0,0)\text{ は Lyapunov 不安定}}
$$

です。

6. 役割分担は次の通りです。

- **nullcline**：平衡点の位置と、各成分の速度が符号を変える境界を可視化した。
- **線形化**：$(\pm1,1)$ の Jacobian が Hurwitz であることを計算し、本章の定理によって非線形系の局所指数安定性へ移した。
- **直接解析**：原点について、第一成分が独立というこの系固有の構造を使い、不安定性を線形化の未証明な一般則へ頼らず証明した。

この三つを混同せず使い分けることが、非線形位相平面解析の基本です。
<!-- solution-end -->

---

## 11. まとめ

- 非線形自律系 $x'=F(x)$ の平衡点は $F(x_*)=0$ で求める。
- 二次元では nullcline とベクトル場の符号から位相平面の流れを読む。
- 平衡点近傍では

$$
F(x_*+u)=DF(x_*)u+r(u),\qquad r(u)=o(\|u\|)
$$

と線形化できる。
- $DF(x_*)$ が Hurwitz なら、ODE3 の指数減衰が非線形剰余を支配し、平衡点は局所指数安定になる。
- 保存量 $H$ は $\nabla H\cdot F=0$ から検証でき、軌道を level set に拘束する。
- 非双曲型では線形化だけでは判定できない。$x'=-x^3$ と $x'=x^3$ は同じ線形化を持つのに安定性が逆である。
- Hartman--Grobman、中心多様体、一般分岐理論は本章の停止線の外に置いた。

次の ODE5 では Laplace 変換へ進み、線形初期値問題を時間領域から変換領域へ移して解く方法を整備します。
