# ODE4 標準常微分方程式 IV：非線形系・位相平面・線形化

ODE3 では $x'=Ax$ を行列指数で解き、固有値から位相図と安定性を読みました。本章では

$$
\boxed{x'=F(x)}
$$

という非線形自律系へ進みます。一般には解を閉じた式で書けないため、**平衡点 → 位相平面 → Jacobian 線形化 → 必要なら保存量や直接評価**という順で調べます。

前提は ODE3 の[定係数線形系の安定性判定](../ODE3/index.md#thm-ode3-spectral-stability)と、F0-02C3 の[Fréchet 微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative)です。

> 本章の警告：**Jacobian を計算したことと、元の非線形系の挙動を証明したことは同じではありません。** とくに実部0の固有値がある非双曲型では、高次項を捨てると安定性を決める情報まで失うことがあります。

---

## 1. 非線形自律系と平衡点

<a id="def-ode4-nonlinear-autonomous-system"></a>
<!-- formal-statement-start -->
> **定義（非線形自律系・平衡点）**  
> $U\subset\mathbb R^d$ を開集合、$F:U\to\mathbb R^d$ を連続写像とする。

$$
x'(t)=F(x(t))
$$

> を自律系という。$F$ が線形写像に限られないとき一般に非線形自律系と呼ぶ。$x_*\in U$ が

$$
F(x_*)=0
$$

> を満たすとき $x_*$ を平衡点という。このとき $x(t)\equiv x_*$ は定数解である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-nonlinear-autonomous-system -->
### 例：定義から平衡点を求める

**定義の確認**

$$
\begin{cases}
x'=x-x^3,\\
y'=-y
\end{cases}
$$

では $F(x,y)=(x-x^3,-y)$ なので、$F(x,y)=0$ は

$$
x(1-x^2)=0,\qquad y=0.
$$

したがって

$$
\boxed{(0,0),\ (1,0),\ (-1,0)}
$$

が平衡点です。例えば $F(1,0)=0$ なので $(x(t),y(t))\equiv(1,0)$ は実際に解です。
<!-- definition-example-end -->

$F$ が $C^1$ なら、有限次元では ODE1 の Picard 反復をそのままベクトル値へ拡張できます。ここは後続理論を暗黙に使わず、必要な対応を確認しておきます。

初期点 $x_0\in U$ のまわりに閉球 $\overline B(x_0,r)\subset U$ を取ります。$DF$ は連続なので、この閉球上である $L>0$ に対し

$$
\|DF(x)\|\le L
$$

とできます。$y,z\in\overline B(x_0,r)$ を取り、線分が球内に入るよう十分小さい球を選んでおけば、

$$
\phi(\theta):=F\bigl(z+\theta(y-z)\bigr)
\qquad(0\le\theta\le1)
$$

に一変数の微積分学の基本定理を成分ごとに適用できます。連鎖律から

$$
\phi'(\theta)
=
DF\bigl(z+\theta(y-z)\bigr)(y-z)
$$

なので

$$
\begin{aligned}
\|F(y)-F(z)\|
&=
\left\|
\int_0^1
DF\bigl(z+\theta(y-z)\bigr)(y-z)\,d\theta
\right\|\\
&\le
L\|y-z\|.
\end{aligned}
$$

したがって $F$ はこの球上で Lipschitz です。

次に連続ベクトル値関数の空間で

$$
(Tu)(t)
=
x_0+\int_0^t F(u(s))\,ds
$$

と置きます。ODE1 の証明で絶対値を Euclid ノルムへ置き換えると

$$
\|Tu-Tv\|_\infty
\le
Lh\|u-v\|_\infty
$$

となります。$h$ を十分小さくして $Lh<1$ とすれば、ODE1 と同じ Picard 反復の Cauchy 評価がそのまま働き、局所解の存在・一意性を得ます。

したがって本章では、$C^1$ ベクトル場について局所解と一意性を使ってよい状態になりました。一意性があるため、同じ時刻に同じ状態へ来た二つの解が、その後別々に進むことはありません。

---

## 2. 軌道・位相平面・nullcline

二次元系

$$
\begin{cases}
x'=f(x,y),\\
y'=g(x,y)
\end{cases}
$$

では、状態 $(x(t),y(t))$ が平面内をどう動くかを見ます。

<a id="def-ode4-phase-plane-nullcline"></a>
<!-- formal-statement-start -->
> **定義（軌道・位相平面・nullcline）**  
> 一つの解 $(x(t),y(t))$ が状態平面に描く集合を軌道といい、軌道と流れの向きを平面上で調べる見方を位相平面という。
>
> - $f(x,y)=0$ の集合を $x$-nullcline という。その上では $x'=0$ である。
> - $g(x,y)=0$ の集合を $y$-nullcline という。その上では $y'=0$ である。
>
> 両 nullcline の交点は $f=g=0$ なので平衡点である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-phase-plane-nullcline -->
### 例：nullcline と符号を読む

**定義の確認**

$$
x'=x(1-x),\qquad y'=-y
$$

の $x$-nullcline は $x=0,1$、$y$-nullcline は $y=0$ です。よって平衡点は $(0,0),(1,0)$。

さらに

- $x<0$ では $x'<0$、$0<x<1$ では $x'>0$、$x>1$ では $x'<0$、
- $y>0$ では $y'<0$、$y<0$ では $y'>0$

です。したがって $y$ は上下から $0$ へ向かい、$0<x$ では $x$ は $1$ へ向かいます。
<!-- definition-example-end -->

nullcline は「ある成分の速度が0になる場所」であり、一般には軌道そのものではありません。例えば $x$-nullcline 上でも $y'\ne0$ なら状態は鉛直方向へ横切ります。

---

## 3. 平衡点まわりの線形化

非線形系では一般に解を閉じた式で書けません。しかし平衡点のごく近くでは、「平衡点から少しずれたとき、最初にどちら向きへどれだけ動くか」だけなら一次近似で捉えられます。

そこで平衡点そのものを原点へ移すため

$$
u=x-x_*
$$

と置きます。$x_*$ は定数なので $u'=x'$ であり、元の方程式 $x'=F(x)$ は

$$
u'=F(x_*+u)
$$

になります。ここへ Fréchet 微分による一次近似を適用し、非線形系を「線形部分 + それより小さい剰余」に分けるのが線形化です。

<a id="def-ode4-linearization"></a>
<!-- formal-statement-start -->
> **定義（線形化・線形化行列）**  
> $F$ が平衡点 $x_*$ で Fréchet 微分可能とする。

$$
A=DF(x_*)
$$

> を線形化行列といい、

$$
u'=Au
$$

> を $x_*$ まわりの線形化という。有限次元の標準座標では $A$ は Jacobian

$$
J_F(x_*)=\left(\frac{\partial F_i}{\partial x_j}(x_*)\right)_{i,j}
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-linearization -->
### 例：三つの平衡点で線形化する

**定義の確認**

$F(x,y)=(x-x^3,-y)$ なら

$$
J_F(x,y)=
\begin{pmatrix}
1-3x^2&0\\0&-1
\end{pmatrix}.
$$

したがって

$$
J_F(0,0)=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
J_F(\pm1,0)=\begin{pmatrix}-2&0\\0&-1\end{pmatrix}.
$$

原点の線形化は saddle 型、$(\pm1,0)$ の線形化は sink 型です。
<!-- definition-example-end -->

<a id="thm-ode4-linearization-remainder"></a>
<!-- formal-statement-start -->
> **定理（Fréchet 微分による平衡点まわりの線形化）**  
> $F$ が平衡点 $x_*$ で Fréchet 微分可能、$A=DF(x_*)$ とする。このとき $u=x-x_*$ に対して

$$
u'=Au+r(u),
$$

> と書け、

$$
\boxed{\frac{\|r(u)\|}{\|u\|}\to0\qquad(u\to0)}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Fréchet 微分の定義より

$$
F(x_*+u)=F(x_*)+DF(x_*)u+r(u),
\qquad
\frac{\|r(u)\|}{\|u\|}\to0.
$$

平衡点条件 $F(x_*)=0$ と $A=DF(x_*)$ を代入すれば

$$
F(x_*+u)=Au+r(u).
$$

また $u'=x'=F(x_*+u)$ なので主張を得ます。$\square$
<!-- proof-end -->

$r(u)=o(\|u\|)$ が「十分近くでは高次の非線形部分が一次項より小さい」の正確な意味です。

---

## 4. 双曲型と非双曲型

線形化 $u'=Au$ の固有値の実部がすべて0から離れていれば、指数的な増大・減衰が一次項にすでに現れます。一方、実部0の固有値があると一次項だけでは増減を決められず、捨てた高次項が結論を左右し得ます。この境界を区別するために双曲型という言葉を導入します。

<a id="def-ode4-hyperbolic-equilibrium"></a>
<!-- formal-statement-start -->
> **定義（双曲型・非双曲型平衡点）**  
> $C^1$ 自律系 $x'=F(x)$ の平衡点 $x_*$ と $A=DF(x_*)$ を考える。$A$ のどの固有値も実部0を持たないとき $x_*$ を双曲型平衡点という。実部0の固有値が少なくとも一つあるとき非双曲型平衡点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-hyperbolic-equilibrium -->
### 例：双曲型と非双曲型

**定義の確認**

$x'=x-x^3$, $y'=-y$ の原点では固有値は $1,-1$ であり双曲型です。

一方

$$
x'=y,\qquad y'=-x-x^3
$$

の原点では

$$
A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

で固有値は $\pm i$。実部0なので非双曲型です。
<!-- definition-example-end -->

二次元では $\tau=\operatorname{tr}A$, $\Delta=\det A$ とすれば

$$
\lambda^2-\tau\lambda+\Delta=0.
$$

したがって ODE3 の分類から、例えば $\Delta<0$ なら saddle 型、$\Delta>0,\tau<0$ なら node または spiral の安定型を素早く判定できます。ただし、ここで読めるのはまず**線形化の型**です。

---

## 5. Hurwitz 線形化による局所指数安定性

全固有値の実部が負の行列を Hurwitz 行列と呼びます。ODE3 から、この場合はある $C\ge1$, $\gamma>0$ が存在して

$$
\|e^{tA}v\|\le Ce^{-\gamma t}\|v\|
$$

と指数減衰します。この減衰は十分小さい $o(\|u\|)$ 剰余を押さえ込めます。

<a id="thm-ode4-hurwitz-local-stability"></a>
<!-- formal-statement-start -->
> **定理（Hurwitz 線形化による局所指数安定性）**  
> $U\subset\mathbb R^d$ を開集合、$F:U\to\mathbb R^d$ を $C^1$、$x_*\in U$ を平衡点とする。$A=DF(x_*)$ の全固有値が $\operatorname{Re}\lambda<0$ を満たすとする。このとき、ある $\delta>0$, $K\ge1$, $\beta>0$ が存在し、$\|x(0)-x_*\|<\delta$ なら解は全ての $t\ge0$ で存在して

$$
\boxed{\|x(t)-x_*\|\le Ke^{-\beta t}\|x(0)-x_*\|}
$$

> を満たす。したがって $x_*$ は局所指数安定であり、特に漸近安定である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ODE3 の[定係数線形系の安定性判定](../ODE3/index.md#thm-ode3-spectral-stability)より

$$
\|e^{tA}v\|\le Ce^{-\gamma t}\|v\|
\qquad(t\ge0)
$$

となる $C\ge1$, $\gamma>0$ が取れます。

前節より $u=x-x_*$ は

$$
u'=Au+r(u),\qquad r(u)=o(\|u\|)
$$

を満たします。$0<\eta<\gamma/(2C)$ を固定します。$r(u)=o(\|u\|)$ なので、ある $\rho_1>0$ が存在して

$$
\|u\|\le\rho_1\Longrightarrow \|r(u)\|\le\eta\|u\|
$$

です。また $U$ は開集合で $x_*\in U$ だから、ある $\rho_2>0$ について

$$
x_*+\overline B_{\rho_2}(0)\subset U
$$

とできます。以後

$$
\rho:=\min\{\rho_1,\rho_2\}
$$

と取ります。これで $\|u\|\le\rho$ の範囲では、剰余評価が使えるだけでなく $x=x_*+u$ も確実に $U$ 内にあります。

解がこの球内にある間、方程式

$$
u'=Au+r(u)
$$

を ODE3 の[定数変化公式](../ODE3/index.md#thm-ode3-variation-of-constants)へ入れます。そこで初期時刻を $0$、初期値を $u_0$、外力を

$$
f(s):=r(u(s))
$$

と読むと

$$
u(t)=e^{tA}u_0+\int_0^te^{(t-s)A}r(u(s))\,ds.
$$

よって

$$
\|u(t)\|
\le Ce^{-\gamma t}\|u_0\|
+C\eta\int_0^te^{-\gamma(t-s)}\|u(s)\|\,ds.
$$

$z(t)=e^{\gamma t}\|u(t)\|$ と置くと

$$
z(t)\le C\|u_0\|+C\eta\int_0^tz(s)\,ds.
$$

ここで非負連続関数 $z$ が $z(t)\le a+b\int_0^tz(s)ds$ を満たすなら、

$$
w(t)=a+b\int_0^tz(s)ds
$$

と置いて $z\le w$, $w'=bz\le bw$。従って $(e^{-bt}w)'\le0$ から $w(t)\le ae^{bt}$、したがって $z(t)\le ae^{bt}$ です。これを上式へ使えば

$$
\|u(t)\|
\le C e^{-(\gamma-C\eta)t}\|u_0\|
\le C e^{-\gamma t/2}\|u_0\|.
$$

この評価が全時刻で使えることを確認します。$\delta=\rho/(2C)$ とし $\|u_0\|<\delta$ とします。もし最初に $\|u(T)\|=\rho$ となる有限の退出時刻 $T$ があれば、$0\le t\le T$ で上の評価が使えて

$$
\|u(T)\|\le C e^{-\gamma T/2}\|u_0\|<C\delta=\rho/2,
$$

となり矛盾です。

さらに有限時刻 $T$ で最大解が途切れることもありません。上の評価から $\|u(t)\|<\rho/2$ なので

$$
x(t)\in x_*+\overline B_{\rho/2}(0)\subset U
$$

に留まります。このコンパクト集合上で連続関数 $F$ は有界なので、ある $M>0$ に対して $\|F(x)\|\le M$ です。したがって $\|x'(t)\|=\|F(x(t))\|\le M$ とでき、

$$
\|x(t)-x(s)\|\le M|t-s|.
$$

ゆえに $t\uparrow T$ で $x(t)$ は Cauchy となり極限 $x_T\in U$ を持ちます。$F$ は $C^1$ なので $x_T$ の近傍で局所 Lipschitz。ODE1 の Picard--Lindelöf 定理を $x_T$ から再適用すれば $T$ を越えて解を延長でき、最大性に反します。

したがって全ての $t\ge0$ で

$$
\|x(t)-x_*\|\le C e^{-\gamma t/2}\|x(0)-x_*\|.
$$

$K=C$, $\beta=\gamma/2$ とすればよい。$\square$
<!-- proof-end -->

先の三次系では $(\pm1,0)$ の線形化固有値は $-2,-1$。よってこの二点は元の非線形系について局所指数安定です。

原点は固有値 $1,-1$ ですが、本章では「正の実部の固有値があれば一般に不安定」という Hartman--Grobman 型の一般論は証明しません。この具体例では $0<x<1$ なら $x'=x(1-x^2)>0$ なので、原点から右へ離れる解が直接見つかり、不安定性を確認できます。

---

## 6. 保存量

Hurwitz 線形化が使えない非双曲型では、別の情報が必要です。とくに振動系では、解そのものを求めなくても「運動中ずっと変わらない量」が見つかれば、軌道がどの領域から出られないかを直接読み取れます。その役割を担うのが保存量です。

<a id="def-ode4-first-integral"></a>
<!-- formal-statement-start -->
> **定義（保存量・第一積分）**  
> 自律系 $x'=F(x)$ に対し、$C^1$ 関数 $H:U\to\mathbb R$ が保存量であるとは、任意の解 $x(t)$ について

$$
H(x(t))=\text{constant}
$$

> がその存在区間上で成り立つことをいう。保存量を第一積分ともいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode4-first-integral -->
### 例：非線形振動子のエネルギー

**定義の確認**

$$
x'=y,\qquad y'=-x-x^3
$$

に対して

$$
H(x,y)=\frac12y^2+\frac12x^2+\frac14x^4
$$

と置くと、軌道上で

$$
\frac d{dt}H
=yy'+xx'+x^3x'
=y(-x-x^3)+xy+x^3y=0.
$$

したがって $H$ は保存量で、軌道は $H(x,y)=H(x_0,y_0)$ から外へ出ません。
<!-- definition-example-end -->

<a id="thm-ode4-first-integral-criterion"></a>
<!-- formal-statement-start -->
> **定理（保存量の微分判定）**  
> $F:U\to\mathbb R^d$ と $H:U\to\mathbb R$ を $C^1$ とする。全ての $x\in U$ で

$$
\boxed{\nabla H(x)\cdot F(x)=0}
$$

> なら、$H$ は $x'=F(x)$ の保存量である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

解 $x(t)$ に F0-02C3 の[Fréchet 連鎖律](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-frechet-composition)を適用すると

$$
\frac d{dt}H(x(t))
=DH(x(t))[x'(t)]
=\nabla H(x(t))\cdot F(x(t))=0.
$$

従って $H(x(t))$ は一定です。$\square$
<!-- proof-end -->

上の非線形振動子では

$$
H(x,y)\ge\frac12(x^2+y^2).
$$

一方 $\|(x,y)\|\le1$ なら $x^4\le x^2$ なので

$$
H(x,y)\le\frac34(x^2+y^2).
$$

保存量が初期値の小ささを全時刻へ運ぶため、原点は Lyapunov 安定です。一方 Jacobian の固有値は $\pm i$ であり、前節の Hurwitz 定理は使えません。

---

## 7. 非双曲型では線形化だけで判定できない

<a id="prop-ode4-nonhyperbolic-warning"></a>
<!-- formal-statement-start -->
> **命題（非双曲型では線形化だけでは判定不能）**

$$
x'=-x^3,
\qquad
x'=x^3
$$

> はともに原点を平衡点に持ち、原点での線形化は同じ $u'=0$ である。しかし前者の原点は漸近安定、後者の原点は不安定である。したがって実部0の固有値を持つ場合、Jacobian だけでは一般に安定性を決定できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f_-(x)=-x^3$, $f_+(x)=x^3$ はどちらも $f_-'(0)=f_+'(0)=0$ なので、線形化は $u'=0$ です。

$x'=-x^3$ では $x_0\ne0$ に対し

$$
\frac{dx}{x^3}=-dt
$$

と書いて両辺を積分すると

$$
-\frac1{2x(t)^2}=-t-\frac1{2x_0^2},
$$

したがって

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1+2x_0^2t}}}.
$$

よって $|x(t)|\le|x_0|$ かつ $x(t)\to0$。原点は漸近安定です。

一方 $x'=x^3$ では

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1-2x_0^2t}}},
$$

で、非零初期値から絶対値が増大し、有限時刻 $1/(2x_0^2)$ へ近づくと絶対値が無限大へ増大します。したがって原点は不安定です。

違いを決めたのは、線形化で捨てられた三次項の符号でした。つまり非双曲型で壊れる機構は「一次項が高次項を支配する」という比較そのものです。$\square$
<!-- proof-end -->

ODE3 の純虚数固有値が center を与えたのは線形系だったからです。非線形系では純虚数固有値だけから center と結論してはいけません。

---

## 8. 位相平面を読む順序

二次元非線形系では、次の順が安全です。

```text
1. f=0, g=0 を解いて平衡点を列挙
2. nullcline と各領域の f,g の符号を見る
3. 各平衡点で J_F を計算
4. ODE3 の固有値分類で線形化を読む
5. 全 Re λ<0 なら本章の Hurwitz 定理で非線形系へ結論を移す
6. 実部0があれば線形化による判定を停止し、保存量・直接解・高次項の符号を見る
```

判定停止は失敗ではありません。線形化が保持していない情報を別の道具で補うべき場所を認識した、ということです。

---

## 9. この先に何が必要になるか

ここまでで、Fréchet 微分から

$$
u'=Au+o(\|u\|)
$$

を作り、Hurwitz な線形化から局所指数安定性を証明し、非双曲型では保存量や高次項を直接調べる必要があることまで分かりました。

双曲型平衡点については、さらに Hartman--Grobman の定理によって非線形系と線形化の局所的な位相構造を結び付けられます。ただし、その証明には安定・不安定方向の分解や追加の固定点構成が必要なので、本章では定理としても使用しません。

中心多様体、安定多様体の一般論、Poincaré--Bendixson の定理、Hopf 分岐、一般の分岐理論は、この基礎を使う後続の力学系の章で扱います。

---

## 10. 演習

### Level A

<a id="ex-ode4-a01"></a>
#### ODE4-A01 平衡点と Jacobian
- Level: A

$$
x'=x(1-x),\qquad y'=-2y
$$

の平衡点を全て求め、それぞれで Jacobian と固有値を計算し、Hurwitz 定理を適用できる平衡点を答えよ。

<!-- solution-start -->
**詳細解答**

$F=(x(1-x),-2y)$ と置く。$F=0$ より $x=0,1$, $y=0$ なので

$$
\boxed{(0,0),(1,0)}.
$$

$$
J_F(x,y)=\begin{pmatrix}1-2x&0\\0&-2\end{pmatrix}.
$$

原点では固有値 $1,-2$ で Hurwitz ではない。$(1,0)$ では固有値 $-1,-2$ なので全て実部が負である。右辺は多項式で $C^1$ だから本章の定理を適用でき、

$$
\boxed{(1,0)\text{ は局所指数安定}}
$$

である。
<!-- solution-end -->

<a id="ex-ode4-a02"></a>
#### ODE4-A02 nullcline と符号表
- Level: A

$$
x'=x(1-y),\qquad y'=y(x-1)
$$

について、両 nullcline、平衡点、第一象限を $x=1,y=1$ で分けた四領域の $(x',y')$ の符号を求めよ。

<!-- solution-start -->
**詳細解答**

$x'=0$ は $x=0$ または $y=1$、$y'=0$ は $y=0$ または $x=1$。したがって平衡点は

$$
\boxed{(0,0),(1,1)}.
$$

第一象限では $x,y>0$ なので、$x'$ の符号は $1-y$、$y'$ の符号は $x-1$ で決まる。

| 領域 | $x'$ | $y'$ | 向き |
|---|---:|---:|---|
| $x<1,y<1$ | $+$ | $-$ | 右下 |
| $x>1,y<1$ | $+$ | $+$ | 右上 |
| $x>1,y>1$ | $-$ | $+$ | 左上 |
| $x<1,y>1$ | $-$ | $-$ | 左下 |

この表は流れの向きを与えるが、これだけで軌道が閉じるとは証明していない点に注意する。
<!-- solution-end -->

<a id="ex-ode4-a03"></a>
#### ODE4-A03 線形化剰余
- Level: A

$$
F(x,y)=(-x+x^2+xy,-2y+y^2)
$$

について、原点で $A=DF(0,0)$ と $r(u)=F(u)-Au$ を求め、$r(u)=o(\|u\|)$ を直接示せ。

<!-- solution-start -->
**詳細解答**

$F(0,0)=0$。Jacobian は

$$
J_F(x,y)=\begin{pmatrix}-1+2x+y&x\\0&-2+2y\end{pmatrix},
$$

だから

$$
A=\begin{pmatrix}-1&0\\0&-2\end{pmatrix},\qquad
r(x,y)=(x^2+xy,y^2).
$$

$\rho=\sqrt{x^2+y^2}$ とすると $|x|,|y|\le\rho$ なので

$$
|x^2+xy|\le2\rho^2,\qquad |y^2|\le\rho^2.
$$

ゆえに

$$
\|r(x,y)\|_2\le\sqrt5\,\rho^2,
$$

したがって

$$
0\le\frac{\|r(u)\|_2}{\|u\|_2}\le\sqrt5\,\rho\to0.
$$

よって $r(u)=o(\|u\|)$。
<!-- solution-end -->

<a id="ex-ode4-a04"></a>
#### ODE4-A04 保存量の検証
- Level: A

$$
x'=y,\qquad y'=-x-x^3
$$

について

$$
H(x,y)=\frac12y^2+\frac12x^2+\frac14x^4
$$

が保存量であることを $\nabla H\cdot F$ から示し、初期値で $H=c$ なら軌道がどこに拘束されるか答えよ。

<!-- solution-start -->
**詳細解答**

$$
\nabla H=(x+x^3,y),\qquad F=(y,-x-x^3).
$$

従って

$$
\nabla H\cdot F=(x+x^3)y+y(-x-x^3)=0.
$$

[保存量の微分判定](#thm-ode4-first-integral-criterion)より $H$ は一定。したがって

$$
\boxed{\frac12y(t)^2+\frac12x(t)^2+\frac14x(t)^4=c}
$$

であり、軌道はこの等値集合から外れない。
<!-- solution-end -->

### Level B

<a id="ex-ode4-b01"></a>
#### ODE4-B01 Hurwitz 条件を非線形系へ適用する
- Level: B

$$
x'=-x+x^2,\qquad y'=-2y+xy
$$

の原点の局所安定性を判定し、本章の定理の仮定を順に確認せよ。

<!-- solution-start -->
**詳細解答**

$F=(-x+x^2,-2y+xy)$ は多項式なので $C^1$、かつ $F(0,0)=0$。Jacobian は

$$
J_F(x,y)=\begin{pmatrix}-1+2x&0\\y&-2+x\end{pmatrix}
$$

だから

$$
J_F(0,0)=\begin{pmatrix}-1&0\\0&-2\end{pmatrix}.
$$

固有値は $-1,-2$ で全て実部が負。つまり「$C^1$」「平衡点」「Jacobian が Hurwitz」という三仮定を全て満たす。従ってある $\delta,K,\beta>0$ が存在し、十分小さい初期値に対して

$$
\|(x(t),y(t))\|\le Ke^{-\beta t}\|(x_0,y_0)\|.
$$

よって

$$
\boxed{(0,0)\text{ は局所指数安定}}
$$

である。
<!-- solution-end -->

<a id="ex-ode4-b02"></a>
#### ODE4-B02 同じ線形化、逆の安定性
- Level: B

$$
\text{(I)}\ x'=-2x^3,
\qquad
\text{(II)}\ x'=2x^3
$$

について、原点での線形化、初期値 $x(0)=x_0\ne0$ の解、原点の安定性を求め、何が線形化で失われたか説明せよ。

<!-- solution-start -->
**詳細解答**

$f_1'(0)=f_2'(0)=0$ なので両者の線形化は $u'=0$。

(I) は

$$
\frac{dx}{x^3}=-2dt
$$

を積分して

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1+4x_0^2t}}}.
$$

従って $|x(t)|\le|x_0|$ かつ $x(t)\to0$ で、原点は漸近安定。

(II) では

$$
\frac{dx}{x^3}=2\,dt
$$

なので、$0$ から $t$ まで積分すると

$$
-\frac1{2x(t)^2}+\frac1{2x_0^2}=2t.
$$

両辺を整理して

$$
\frac1{x(t)^2}=\frac1{x_0^2}-4t.
$$

初期値と同じ符号の枝を取れば

$$
\boxed{x(t)=\frac{x_0}{\sqrt{1-4x_0^2t}}}.
$$

非零初期値から絶対値が増えるので原点は不安定。線形化は両者で同じだが、最初に非零になる三次項の符号が逆である。したがって非双曲型では高次項を捨てると安定性を決める情報まで失う。
<!-- solution-end -->

<a id="ex-ode4-b03"></a>
#### ODE4-B03 非線形振り子と保存量
- Level: B

$$
x'=y,\qquad y'=-\sin x
$$

について、(1) 平衡点、(2) $H(x,y)=\frac12y^2+1-\cos x$ が保存量であること、(3) 原点の線形化、(4) 原点の Lyapunov 安定性を示せ。

<!-- solution-start -->
**詳細解答**

平衡点は $y=0$, $\sin x=0$ より

$$
\boxed{(k\pi,0)\quad(k\in\mathbb Z)}.
$$

$$
\nabla H=(\sin x,y),\qquad F=(y,-\sin x)
$$

なので $\nabla H\cdot F=0$。従って $H$ は保存量。

Jacobian は

$$
J_F(x,y)=\begin{pmatrix}0&1\\-\cos x&0\end{pmatrix},
$$

原点では

$$
A=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
$$

固有値は $\pm i$。したがって Hurwitz 定理の仮定を満たさず、線形化だけでは本章の安定性定理を使えない。

そこで保存量を使います。$|x|\le1$ とし、関数

$$
f(z)=\cos z
$$

へ $0$ を展開点とする1次の Taylor の定理を適用します。評価点は $z=x$ です。$f(0)=1$、$f'(0)=0$、$f''(z)=-\cos z$ なので、0 と $x$ の間のある $\xi$ が存在して

$$
\cos x
=
1+0\cdot x-\frac12\cos\xi\,x^2.
$$

従って

$$
1-\cos x=\frac12\cos\xi\,x^2.
$$

$|\xi|\le1$ だから

$$
\frac{\cos1}{2}x^2\le1-\cos x\le\frac12x^2.
$$

従って原点近傍では正定数 $c_1,c_2$ が存在して

$$
c_1(x^2+y^2)\le H(x,y)\le c_2(x^2+y^2).
$$

任意の十分小さい $\varepsilon>0$ に対し初期値を小さくして $H(x_0,y_0)<c_1\varepsilon^2$ とすれば、保存性から全時刻で

$$
c_1(x(t)^2+y(t)^2)\le H(x_0,y_0)<c_1\varepsilon^2.
$$

よって $\sqrt{x(t)^2+y(t)^2}<\varepsilon$。したがって原点は Lyapunov 安定である。
<!-- solution-end -->

### Level C

<a id="ex-ode4-c01"></a>
#### ODE4-C01 平衡点・nullcline・線形化を統合する
- Level: C

$$
x'=x-x^3,\qquad y'=-y+x^2
$$

について、(1) 平衡点、(2) nullcline、(3) 各平衡点の Jacobian と固有値、(4) Hurwitz 定理で判定できる平衡点、(5) 原点の不安定性を直接示し、各道具の役割を整理せよ。

<!-- solution-start -->
**詳細解答**

平衡点では

$$
x(1-x^2)=0,\qquad y=x^2.
$$

従って

$$
\boxed{(0,0),(1,1),(-1,1)}.
$$

$x$-nullcline は $x=0,\pm1$、$y$-nullcline は $y=x^2$。

Jacobian は

$$
J_F(x,y)=\begin{pmatrix}1-3x^2&0\\2x&-1\end{pmatrix}.
$$

原点では固有値 $1,-1$。$(\pm1,1)$ では固有値 $-2,-1$。後二点は Hurwitz なので、本章の定理から

$$
\boxed{(1,1),(-1,1)\text{ は局所指数安定}}
$$

である。

原点は第一式だけで直接調べられる。$0<x\le1/2$ では

$$
x'=x(1-x^2)\ge\frac34x.
$$

したがって $x(t)$ が $1/2$ に達するまで

$$
\frac{x'}x\ge\frac34
$$

を積分して

$$
x(t)\ge x_0e^{3t/4}.
$$

任意に小さい $x_0>0$ から始めても、固定した小近傍を有限時間で出る。よって

$$
\boxed{(0,0)\text{ は Lyapunov 不安定}}
$$

である。

役割は、nullcline が平衡点位置と成分速度の符号境界を示し、線形化＋Hurwitz 定理が $(\pm1,1)$ の非線形局所安定性を与え、原点では系固有の直接評価が不安定性を証明した、という分担である。
<!-- solution-end -->

---

## 11. まとめ

- 平衡点は $F(x_*)=0$ で求める。
- 二次元では nullcline と符号から位相平面を読む。
- Fréchet 微分可能なら
  $$
  F(x_*+u)=DF(x_*)u+o(\|u\|).
  $$
- $DF(x_*)$ が Hurwitz なら、線形部の指数減衰が非線形剰余を支配し、平衡点は局所指数安定である。
- 保存量は $\nabla H\cdot F=0$ から検証できる。
- 非双曲型では線形化だけでは判定できない。$x'=-x^3$ と $x'=x^3$ は同じ線形化なのに安定性が逆である。
- Hartman--Grobman、中心多様体、一般分岐理論は後続の力学系の話題として区別した。

次の ODE5 では Laplace 変換と初期値問題へ進みます。