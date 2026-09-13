# ODE1 標準常微分方程式 I：一階常微分方程式・初期値問題

微分方程式では、未知数は数ではなく関数です。しかも「式を満たす関数を一つ見つける」だけでは終わりません。

- どの解法を選べばよいか。
- 初期条件を与えたとき、本当に解は存在するか。
- 存在するなら一つに決まるか。
- 公式変形の途中で解を落としていないか。

この章では一階常微分方程式の標準的な解法を整理したあと、最後の二つの問いを Picard--Lindelöf の局所存在・一意性定理まで証明して閉じます。

前提として [RA3 微分法](../RA3/index.md)、[RA4 Riemann/Darboux積分・微積分学の基本定理](../RA4/index.md)、[RA5 一様収束](../RA5/index.md) を使います。旧 Encore II の [F0-00H1](../F0_00H1_常微分方程式_線形系_行列指数/index.md) にあった ODE の入口を引き継ぎますが、この章では PDE の準備だけでなく、一階 ODE 自体を独立した標準コアとして扱います。

---

## 1. 何を「微分方程式を解く」と呼ぶのか

<a id="def-ode1-ode"></a>
<!-- formal-statement-start -->
> **定義（常微分方程式・階数）**  
> 独立変数を $t$、未知関数を $y(t)$ とする。未知関数とその導関数の関係

$$
F\bigl(t,y,y',\ldots,y^{(m)}\bigr)=0
$$

> を **常微分方程式**（ordinary differential equation, ODE）という。式に現れる最高階導関数が $y^{(m)}$ であるとき、その方程式を $m$ 階という。
<!-- formal-statement-end -->

一階方程式を

$$
y'=f(t,y)
$$

と書けるとき、右辺 $f$ が時刻 $t$ と現在値 $y$ から「その点での傾き」を指定している、と読むことができます。

<a id="def-ode1-linear-autonomous"></a>
<!-- formal-statement-start -->
> **定義（線形・非線形、自律・非自律）**  
> 一階 ODE が

$$
y'(t)+p(t)y(t)=q(t)
$$

> の形に書けるとき一階線形 ODE という。これ以外の $y$ への非線形な依存を持つものを非線形 ODE という。また

$$
y'=f(y)
$$

> のように右辺が $t$ を陽に含まない方程式を自律方程式といい、右辺が $t$ にも依存するものを非自律方程式という。
<!-- formal-statement-end -->

<a id="def-ode1-ivp-bvp"></a>
<!-- formal-statement-start -->
> **定義（初期値問題・境界値問題）**  
> ODE と、一つの時刻 $t_0$ における値

$$
y(t_0)=y_0
$$

> を同時に満たす解を求める問題を初期値問題という。これに対し、例えば区間 $[a,b]$ の異なる端点で

$$
y(a)=\alpha,\qquad y(b)=\beta
$$

> のような条件を課す問題を境界値問題という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode1-ode, def-ode1-linear-autonomous, def-ode1-ivp-bvp -->
### 定義の確認：三つの方程式を分類する

1. $y'=2y$ は一階・線形・自律方程式です。$p(t)=-2$, $q(t)=0$ とすれば $y'-2y=0$ の形です。
2. $y'=t+y^2$ は一階・非線形・非自律方程式です。$y^2$ があるので線形ではなく、右辺に $t$ があるので自律でもありません。
3. $y''+y=0$ は二階 ODE です。$y(0)=0$, $y'(0)=1$ を課せば初期値問題、$y(0)=0$, $y(\pi)=0$ を課せば境界値問題です。

分類名は飾りではありません。線形なら積分因子、高階線形なら特性方程式、自律なら phase line というように、構造が解法を選ぶ手掛かりになります。
<!-- definition-example-end -->

---

## 2. 解曲線と方向場

一階 ODE

$$
y'=f(t,y)
$$

で、点 $(t,y)$ を通る解曲線の接線の傾きは $f(t,y)$ です。したがって平面上の各点に傾き $f(t,y)$ の短い線分を描けば、解をまだ求めていなくても解曲線が進む方向を読めます。これが方向場です。

例えば

$$
y'=-y
$$

では、$y>0$ なら傾きは負、$y<0$ なら傾きは正、$y=0$ なら傾きは0です。したがって解曲線は両側から $y=0$ へ向かいます。実際の解 $y(t)=Ce^{-t}$ と整合しています。

この見方は後の phase line と存在・一意性にも重要です。一意性が成り立つ領域では、同じ点を通る二本の異なる解曲線は存在できません。

---

## 3. 変数分離形：割る前に平衡解を見る

<a id="def-ode1-separable"></a>
<!-- formal-statement-start -->
> **定義（変数分離形）**  
> 一階 ODE が

$$
y'=g(t)h(y)
$$

> の形に書けるとき、変数分離形という。
<!-- formal-statement-end -->

$h(y)\ne0$ である解の区間では

$$
\frac{y'}{h(y)}=g(t)
$$

と書けるので、$H'(y)=1/h(y)$ を満たす原始関数 $H$ を取れば連鎖律から

$$
\frac{d}{dt}H(y(t))=g(t).
$$

したがって

$$
H(y(t))=\int g(t)\,dt+C
$$

を得ます。

ただし、ここには重要な落とし穴があります。**$h(y)$ で割る前に $h(c)=0$ となる定数 $c$ を調べる必要があります。** そのとき

$$
y(t)\equiv c
$$

は元の方程式を満たす平衡解ですが、$h(y)$ で割った式からは消えます。

<!-- definition-example-start: def-ode1-separable -->
### 例：ロジスティック方程式

$r>0$, $K>0$ として

$$
y'=r y\left(1-\frac{y}{K}\right)
$$

を考えます。まず

$$
y=0,\qquad y=K
$$

では右辺が0なので、二つの平衡解があります。

$0<y<K$ の解については $y(K-y)\ne0$ なので

$$
\frac{dy}{y(1-y/K)}=r\,dt.
$$

左辺を

$$
\frac1{y(1-y/K)}
=\frac{K}{y(K-y)}
=\frac1y+\frac1{K-y}
$$

と部分分数分解すると

$$
\log y-\log(K-y)=rt+C.
$$

したがって

$$
\frac{y}{K-y}=Ae^{rt}
$$

となり、$A>0$ のとき

$$
\boxed{y(t)=\frac{K}{1+A^{-1}e^{-rt}}}.
$$

ここで $y=0,K$ は途中で割ったため、この式とは別に回収しなければなりません。これが「変数分離で解を落とす」典型です。
<!-- definition-example-end -->

---

## 4. 一階線形 ODE：積分因子は積の微分を作る

<a id="def-ode1-first-linear"></a>
<!-- formal-statement-start -->
> **定義（一階線形 ODE）**  
> 区間 $I$ 上の既知関数 $p,q$ に対して

$$
y'(t)+p(t)y(t)=q(t)
$$

> と書ける ODE を一階線形 ODE という。
<!-- formal-statement-end -->

積分因子を暗記公式として置くのではなく、何を作りたいかから導きます。左辺を

$$
(\mu y)'=\mu y'+\mu' y
$$

にしたいので

$$
\mu'=p\mu
$$

を満たせばよい。そこで基準点 $t_0\in I$ を固定して

$$
\mu(t)=\exp\left(\int_{t_0}^t p(s)\,ds\right)
$$

と置けば、微積分学の基本定理と連鎖律から

$$
\mu'(t)=p(t)\mu(t)
$$

です。

<a id="thm-ode1-linear-ivp"></a>
<!-- formal-statement-start -->
> **定理（一階線形初期値問題の解）**  
> 区間 $I$ 上で $p,q$ が連続、$t_0\in I$ とする。初期値問題

$$
y'+p(t)y=q(t),\qquad y(t_0)=y_0
$$

> は $I$ 上でただ一つの解を持ち、

$$
\boxed{
 y(t)=\mu(t)^{-1}
 \left(
 y_0+\int_{t_0}^t\mu(s)q(s)\,ds
 \right),
\qquad
\mu(t)=\exp\left(\int_{t_0}^tp(s)\,ds\right)
}
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$\mu$ を掛ける目的は、方程式全体を $(\mu y)'=\mu q$ という一つの積の微分に変えることです。そこまで変形できれば、初期時刻から $t$ まで積分して $y$ を直接取り出せます。同じ変形は任意の解に対して成立するので、一意性も同時に出ます。

<!-- proof-start -->
### 証明

$\mu(t)>0$ であり、上で確認した通り $\mu'=p\mu$ です。方程式に $\mu$ を掛けると

$$
\mu y'+\mu p y=\mu q.
$$

$\mu'=p\mu$ だから左辺は

$$
\mu y'+\mu' y=(\mu y)'.
$$

したがって

$$
(\mu y)'=\mu q.
$$

$t_0$ から $t$ まで積分し、[微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を使うと

$$
\mu(t)y(t)-\mu(t_0)y(t_0)
=\int_{t_0}^t\mu(s)q(s)\,ds.
$$

定義から $\mu(t_0)=1$、初期条件から $y(t_0)=y_0$ なので

$$
\mu(t)y(t)
=y_0+\int_{t_0}^t\mu(s)q(s)\,ds.
$$

$\mu(t)>0$ で割れば表示式を得ます。逆にこの表示式を微分すれば元の方程式を満たし、$t=t_0$ を代入すれば初期条件を満たすので存在が確認できます。

また任意の解は上の積分操作によって同じ表示式に到達するため、二つの解が存在しても同じ関数でなければなりません。よって一意です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ode1-first-linear -->
### 例：$y'+2y=e^{-t}$, $y(0)=0$

$p(t)=2$ なので

$$
\mu(t)=e^{2t}.
$$

方程式に掛けると

$$
(e^{2t}y)'=e^t.
$$

0から $t$ まで積分して

$$
e^{2t}y(t)-y(0)=e^t-1.
$$

$y(0)=0$ より

$$
\boxed{y(t)=e^{-t}-e^{-2t}}.
$$

積分因子は「式を覚えて代入する係数」ではなく、積の微分を意図的に作る係数です。
<!-- definition-example-end -->

---

## 5. 完全微分方程式：解曲線を等高線として読む

<a id="def-ode1-exact"></a>
<!-- formal-statement-start -->
> **定義（完全微分方程式）**  
> $M,N$ を $t,y$ の関数とする。方程式

$$
M(t,y)+N(t,y)y'=0
$$

> について、ある $C^1$ 級関数 $\Phi(t,y)$ が存在して

$$
\Phi_t=M,\qquad \Phi_y=N
$$

> を満たすとき、この方程式を完全微分方程式という。
<!-- formal-statement-end -->

解 $y(t)$ に沿って連鎖律を使うと

$$
\frac{d}{dt}\Phi(t,y(t))
=\Phi_t+\Phi_y y'
=M+Ny'=0.
$$

したがって解曲線は

$$
\Phi(t,y)=C
$$

という等高線に沿います。

<a id="thm-ode1-exact-criterion"></a>
<!-- formal-statement-start -->
> **定理（長方形上の完全性判定）**  
> 長方形 $R=[a,b]\times[c,d]$ を含む開集合上で $M,N$ が $C^1$ 級であり、$R$ 上で

$$
\frac{\partial M}{\partial y}
=
\frac{\partial N}{\partial t}
$$

> を満たすとする。このとき $R$ 上に $\Phi_t=M$, $\Phi_y=N$ を満たす $C^1$ 級関数 $\Phi$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

基準点 $(t_*,y_*)\in R$ を一つ固定し、まず横に進んでから縦に進む経路に沿って $M,N$ を積分して $\Phi$ を作ります。交差偏微分の一致は、その構成を $t$ で微分したとき余計な項をちょうど $M(t,y)-M(t,y_*)$ に変えるために使います。

<!-- proof-start -->
### 証明

$(t_*,y_*)\in R$ を固定し

$$
\Phi(t,y)
=
\int_{t_*}^{t}M(s,y_*)\,ds
+
\int_{y_*}^{y}N(t,u)\,du
$$

と定めます。まず第2項だけが $y$ に依存するので、微積分学の基本定理から

$$
\Phi_y(t,y)=N(t,y).
$$

次に $t$ で微分します。$N$ は $C^1$ 級なので積分内微分ができ、仮定 $N_t=M_y$ を使って

$$
\begin{aligned}
\Phi_t(t,y)
&=M(t,y_*)+\int_{y_*}^{y}N_t(t,u)\,du\\
&=M(t,y_*)+\int_{y_*}^{y}M_y(t,u)\,du\\
&=M(t,y_*)+M(t,y)-M(t,y_*)\\
&=M(t,y).
\end{aligned}
$$

よって $\Phi_t=M$, $\Phi_y=N$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ode1-exact -->
### 例：$(2ty+1)+(t^2+2y)y'=0$

$$
M(t,y)=2ty+1,
\qquad
N(t,y)=t^2+2y
$$

と置くと

$$
M_y=2t=N_t.
$$

したがって完全です。$\Phi_t=M$ を $t$ で積分すると

$$
\Phi(t,y)=t^2y+t+C(y).
$$

$y$ で微分して

$$
\Phi_y=t^2+C'(y)=N=t^2+2y
$$

だから $C'(y)=2y$、従って $C(y)=y^2$ と取れます。よって解曲線は

$$
\boxed{t^2y+t+y^2=C}
$$

です。
<!-- definition-example-end -->

---

## 6. Bernoulli 方程式：非線形でも線形へ戻せる場合

<a id="def-ode1-bernoulli"></a>
<!-- formal-statement-start -->
> **定義（Bernoulli 方程式）**  
> $\alpha\ne0,1$ とし、

$$
y'+p(t)y=q(t)y^\alpha
$$

> の形をした一階 ODE を Bernoulli 方程式という。
<!-- formal-statement-end -->

$y>0$ である区間に限って

$$
z=y^{1-\alpha}
$$

と置きます。すると

$$
z'=(1-\alpha)y^{-\alpha}y'.
$$

元の方程式を $y^\alpha$ で割ると

$$
y^{-\alpha}y'+p(t)y^{1-\alpha}=q(t).
$$

したがって

$$
\frac{z'}{1-\alpha}+p(t)z=q(t),
$$

すなわち

$$
\boxed{z'+(1-\alpha)p(t)z=(1-\alpha)q(t)}
$$

という一階線形 ODE に変わります。

<!-- definition-example-start: def-ode1-bernoulli -->
### 例：$y'-y=-y^2$

正の解を考え、$z=y^{-1}$ と置きます。ここでは $\alpha=2$ なので

$$
z'+(-1)(-1)z=(-1)(-1),
$$

すなわち

$$
z'+z=1.
$$

積分因子 $e^t$ を使えば

$$
(e^tz)'=e^t,
$$

よって

$$
z=1+Ce^{-t}.
$$

したがって

$$
\boxed{y(t)=\frac1{1+Ce^{-t}}}.
$$

なお元の方程式には $y\equiv0$ も解として存在します。$z=1/y$ と置いた時点でこの解を除外しているので、最後に別途回収します。
<!-- definition-example-end -->

---

## 7. 自律方程式と phase line

<a id="def-ode1-equilibrium"></a>
<!-- formal-statement-start -->
> **定義（平衡解）**  
> 自律方程式

$$
y'=f(y)
$$

> に対し $f(c)=0$ となる定数 $c$ があるとき、定数関数 $y(t)\equiv c$ を平衡解という。
<!-- formal-statement-end -->

実数直線上に平衡点を置き、その間で $f(y)$ の符号を調べる図を phase line と呼びます。$f(y)>0$ なら時間が進むと $y$ は増加し、$f(y)<0$ なら減少します。

<!-- definition-example-start: def-ode1-equilibrium -->
### 例：ロジスティック方程式の phase line

$$
y'=r y\left(1-\frac{y}{K}\right),\qquad r,K>0
$$

では平衡点は $0,K$ です。

- $y<0$ では $y<0$, $1-y/K>0$ なので $y'<0$。
- $0<y<K$ では両因子が正なので $y'>0$。
- $y>K$ では $y>0$, $1-y/K<0$ なので $y'<0$。

したがって $K$ の両側では矢印が $K$ へ向かい、$0$ の両側では矢印が $0$ から離れます。公式解を先に求めなくても、長時間の挙動を符号だけから読めます。
<!-- definition-example-end -->

---

## 8. 初期値問題を積分方程式へ直す

局所存在・一意性の証明では、微分方程式をそのまま反復するのではなく積分方程式へ変えます。

<a id="prop-ode1-integral-equation"></a>
<!-- formal-statement-start -->
> **命題（初期値問題と積分方程式の同値性）**  
> $f$ が解曲線の近傍で連続であるとする。$C^1$ 級関数 $y$ が

$$
y'=f(t,y),\qquad y(t_0)=y_0
$$

> を満たすことと、

$$
\boxed{y(t)=y_0+\int_{t_0}^{t}f(s,y(s))\,ds}
$$

> を満たすことは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

微分方程式を満たすなら、$t_0$ から $t$ まで積分して

$$
y(t)-y(t_0)
=\int_{t_0}^{t}y'(s)\,ds
=\int_{t_0}^{t}f(s,y(s))\,ds.
$$

初期条件 $y(t_0)=y_0$ を使えば積分方程式を得ます。

逆に積分方程式を満たすとします。$f$ と $y$ が連続なので $s\mapsto f(s,y(s))$ は連続です。[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) により両辺を $t$ で微分でき、

$$
y'(t)=f(t,y(t))
$$

を得ます。また $t=t_0$ では積分が0なので $y(t_0)=y_0$ です。$\square$
<!-- proof-end -->

この形にすると、「関数 $y$ を右辺へ入れて新しい関数を作る」という反復が可能になります。

---

## 9. Lipschitz 条件は「二つの解が離れる速さ」を抑える

<a id="def-ode1-lipschitz-y"></a>
<!-- formal-statement-start -->
> **定義（$y$ に関する Lipschitz 条件）**  
> 集合 $R\subset\mathbb R^2$ 上の関数 $f(t,y)$ が $y$ に関して Lipschitz 連続であるとは、ある定数 $L\ge0$ が存在し、$(t,y_1),(t,y_2)\in R$ となるすべての $t,y_1,y_2$ に対して

$$
|f(t,y_1)-f(t,y_2)|\le L|y_1-y_2|
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode1-lipschitz-y -->
### 定義の確認：$t+y^2$ は有界な帯では Lipschitz

$|y|\le B$ とします。同じ $t$ に対して

$$
\begin{aligned}
|(t+y_1^2)-(t+y_2^2)|
&=|y_1-y_2|\,|y_1+y_2|\\
&\le2B|y_1-y_2|.
\end{aligned}
$$

したがって $f(t,y)=t+y^2$ は $|y|\le B$ 上で $y$ に関して Lipschitz で、$L=2B$ と取れます。

一方

$$
f(y)=3|y|^{2/3}
$$

は0の近くで Lipschitz ではありません。$y>0$ に対して

$$
\frac{|f(y)-f(0)|}{|y-0|}
=3y^{-1/3}\to\infty
\qquad(y\downarrow0)
$$

だから、どんな有限の $L$ でも0の十分近くでは Lipschitz 評価が破れます。
<!-- definition-example-end -->

ここで重要なのは、$t$ 方向ではなく **未知関数の値 $y$ の違いに対して**右辺がどれだけ変わるかを抑えていることです。これが積分作用素を縮小させ、一意性を生みます。

---

## 10. Picard--Lindelöf の局所存在・一意性

<a id="thm-ode1-picard-lindelof"></a>
<!-- formal-statement-start -->
> **定理（Picard--Lindelöf の局所存在・一意性）**  
> $a,b>0$ とし、

$$
R=[t_0-a,t_0+a]\times[y_0-b,y_0+b]
$$

> とする。$f:R\to\mathbb R$ は連続で、ある $M\ge0$ と $L\ge0$ に対して

$$
|f(t,y)|\le M,
$$

$$
|f(t,y_1)-f(t,y_2)|\le L|y_1-y_2|
$$

> が $R$ 上で成り立つとする。正数 $h$ を

$$
h\le a,\qquad Mh\le b,\qquad Lh<1
$$

> となるように取る。このとき区間 $I=[t_0-h,t_0+h]$ 上で初期値問題

$$
y'=f(t,y),\qquad y(t_0)=y_0
$$

> は、グラフが $R$ に含まれる $C^1$ 級解をただ一つ持つ。
<!-- formal-statement-end -->

### 証明の見取り図

積分方程式

$$
y(t)=y_0+\int_{t_0}^t f(s,y(s))\,ds
$$

の右辺を、関数 $y$ を別の関数へ送る作用 $T$ と見ます。

- $Mh\le b$ は、$T$ を一度作用させても長方形 $R$ の外へ出ないために使います。
- $Lh<1$ は、二つの関数の距離を $T$ が必ず縮めるために使います。
- 反復列が一様 Cauchy になると、RA5 の一様収束論から連続な極限関数が得られます。
- 極限が $T$ の不動点であることから解の存在を、一つの不動点しか持てないことから一意性を得ます。

「固定点定理を使う」と一行で済ませず、この四段を実際に確認します。

<!-- proof-start -->
### 証明

$I=[t_0-h,t_0+h]$ とし、$I$ 上の連続関数で

$$
\|u-y_0\|_\infty
:=\sup_{t\in I}|u(t)-y_0|
\le b
$$

を満たすもの全体を $\mathcal B$ とします。$u\in\mathcal B$ なら $(t,u(t))\in R$ です。

$u\in\mathcal B$ に対して

$$
(Tu)(t)
=y_0+\int_{t_0}^{t}f(s,u(s))\,ds
$$

と定めます。被積分関数は連続なので $Tu$ も連続です。また

$$
\begin{aligned}
|(Tu)(t)-y_0|
&\le\left|\int_{t_0}^{t}f(s,u(s))\,ds\right|\\
&\le M|t-t_0|\\
&\le Mh\\
&\le b.
\end{aligned}
$$

よって $T$ は $\mathcal B$ を $\mathcal B$ 自身へ送ります。ここで $Mh\le b$ を使いました。

次に $u,v\in\mathcal B$ とします。$y$ に関する Lipschitz 条件から

$$
\begin{aligned}
|(Tu)(t)-(Tv)(t)|
&\le\int_{t_0}^{t}|f(s,u(s))-f(s,v(s))|\,|ds|\\
&\le L|t-t_0|\,\|u-v\|_\infty\\
&\le Lh\,\|u-v\|_\infty.
\end{aligned}
$$

したがって $q=Lh<1$ と置けば

$$
\|Tu-Tv\|_\infty\le q\|u-v\|_\infty.
$$

ここで $Lh<1$ が「縮む」ことを保証しています。

初期関数を $u_0(t)\equiv y_0$ とし、Picard 反復

$$
u_{n+1}=Tu_n
$$

を定めます。$T\mathcal B\subset\mathcal B$ なので、すべての $u_n$ は $\mathcal B$ に属します。縮小評価を繰り返すと

$$
\|u_{n+1}-u_n\|_\infty
\le q^n\|u_1-u_0\|_\infty.
$$

$m>n$ に対して三角不等式を使えば

$$
\begin{aligned}
\|u_m-u_n\|_\infty
&\le\sum_{k=n}^{m-1}\|u_{k+1}-u_k\|_\infty\\
&\le\|u_1-u_0\|_\infty\sum_{k=n}^{m-1}q^k\\
&\le\frac{q^n}{1-q}\|u_1-u_0\|_\infty.
\end{aligned}
$$

$q<1$ なので右辺は $n\to\infty$ で0へ行きます。従って $(u_n)$ は [一様 Cauchy 条件](../RA5/index.md#def-ra5-uniform-cauchy) を満たし、ある関数 $u$ へ一様収束します。さらに各 $u_n$ は連続なので [一様極限の連続性](../RA5/index.md#thm-ra5-continuity) により $u$ も連続です。一様極限を取っても $|u(t)-y_0|\le b$ なので $u\in\mathcal B$ です。

縮小評価から

$$
\|Tu_n-Tu\|_\infty
\le q\|u_n-u\|_\infty\to0.
$$

一方 $Tu_n=u_{n+1}\to u$ です。同じ一様極限を持つので

$$
Tu=u.
$$

すなわち

$$
u(t)=y_0+\int_{t_0}^{t}f(s,u(s))\,ds.
$$

[初期値問題と積分方程式の同値性](#prop-ode1-integral-equation) により、$u$ は初期値問題の $C^1$ 級解です。これで存在が示されました。

最後に一意性を示します。$u,v\in\mathcal B$ がともに解なら、ともに $T$ の不動点なので

$$
\|u-v\|_\infty
=\|Tu-Tv\|_\infty
\le q\|u-v\|_\infty.
$$

$q<1$ だから

$$
(1-q)\|u-v\|_\infty\le0.
$$

ノルムは非負なので $\|u-v\|_\infty=0$、従って $u=v$ です。$\square$
<!-- proof-end -->

この証明では、連続性だけでなく **$y$ 方向の Lipschitz 評価**が二回働いています。第一に Picard 反復を縮め、第二に二つの不動点を同一にします。一意性の機構はここです。

---

## 11. 連続でも一意とは限らない

Picard--Lindelöf の Lipschitz 仮定を落としたとき、何が壊れるかを直接見ます。

<a id="ex-ode1-nonunique"></a>
### 反例：待ってから動き出す解

初期値問題

$$
y'=3|y|^{2/3},\qquad y(0)=0
$$

を考えます。右辺 $3|y|^{2/3}$ は $y=0$ でも連続です。

任意の $c\ge0$ に対して

$$
y_c(t)=
\begin{cases}
0,&t\le c,\\
(t-c)^3,&t\ge c
\end{cases}
$$

と置きます。$t<c$ では $y_c'=0$ で右辺も0です。$t>c$ では

$$
y_c'(t)=3(t-c)^2
$$

かつ

$$
3|y_c(t)|^{2/3}
=3|(t-c)^3|^{2/3}
=3(t-c)^2.
$$

$t=c$ でも左右の導関数はともに0なので $y_c$ は $C^1$ 級で方程式を満たします。また $c\ge0$ なら $y_c(0)=0$ です。

従って $c=0,1,2,\ldots$ だけを取っても同じ初期条件を満たす異なる解が無数にあります。

壊れた仮定は $y$ に関する Lipschitz 性です。Section 9 で見た通り

$$
\frac{|3|y|^{2/3}-0|}{|y-0|}=3|y|^{-1/3}
$$

は $y\to0$ で発散します。そのため Picard--Lindelöf の証明で必要だった

$$
\|Tu-Tv\|_\infty\le q\|u-v\|_\infty,\qquad q<1
$$

という一様な縮小評価を作れません。**「連続なのに一意でない」だけでなく、一意性を生んでいた証明機構そのものが失われています。**

---

## 12. 解法をどう選ぶか

一階 ODE を見たときは、公式名を総当たりするより構造を順に確認します。

```text
右辺が g(t)h(y) に分かれるか
  └─ yes → 変数分離。ただし h(y)=0 の平衡解を先に回収

一階線形 y'+p(t)y=q(t) か
  └─ yes → 積分因子で積の微分を作る

M(t,y)+N(t,y)y'=0 で M_y=N_t か
  └─ yes → potential Φ を作り Φ=C

Bernoulli y'+py=qy^α か
  └─ yes → z=y^(1-α) で線形化

自律 y'=f(y) か
  └─ yes → 平衡点と符号を phase line で先に読む
```

どの初等解法にも当てはまらなくても、局所存在・一意性は別問題です。右辺が連続で $y$ に関して局所 Lipschitz なら、明示解が書けなくても Picard--Lindelöf が局所解を保証します。

後続では ODE2 で高階線形方程式、ODE3 で線形連立系と行列指数、ODE4 で非線形系の位相平面と線形化へ進みます。

---

## 13. 演習

### Level A

<a id="ex-ode1-a01"></a>
#### ODE1-A01 方程式の分類
- Level: A

次の方程式を階数、線形/非線形、自律/非自律の観点から分類せよ。また (a) に $y(0)=1$ を付けた問題と、(c) に $y(0)=y(1)=0$ を付けた問題が初期値問題・境界値問題のどちらか答えよ。

(a) $y'+ty=1$  
(b) $y'=y(1-y)$  
(c) $y''+t y=0$

<!-- solution-start -->
**解答**：

(a) 最高階導関数は $y'$ なので一階です。

$$
y'+p(t)y=q(t)
$$

と比較すると $p(t)=t$, $q(t)=1$ なので線形です。係数に $t$ が陽に現れるので非自律です。$y(0)=1$ は一つの時刻で値を指定しているため初期値問題です。

(b) 最高階導関数は $y'$ なので一階です。右辺に $y^2$ が現れるため線形ではありません。一方、右辺は $t$ を陽に含まず $f(y)=y(1-y)$ だけなので自律方程式です。

(c) 最高階導関数は $y''$ なので二階です。$y$ とその導関数について一次なので線形で、係数 $t$ が現れるので非自律です。$y(0)=0$ と $y(1)=0$ は異なる二点で条件を課すため境界値問題です。
<!-- solution-end -->

<a id="ex-ode1-a02"></a>
#### ODE1-A02 変数分離と平衡解
- Level: A

初期値問題

$$
y'=y(1-y),\qquad y(0)=\frac12
$$

を変数分離で解け。また元の微分方程式が持つ平衡解をすべて求め、変数分離の途中でそれらが消える箇所を説明せよ。

<!-- solution-start -->
**解答**：右辺が0になる値を先に調べると

$$
y(1-y)=0
$$

より $y=0,1$ です。従って

$$
y(t)\equiv0,\qquad y(t)\equiv1
$$

が平衡解です。

今回の初期値は $1/2$ なので、その解については少なくとも初期時刻の近くで $y\ne0,1$ として変数分離を進めます。

$$
\frac{dy}{y(1-y)}=dt.
$$

部分分数分解すると

$$
\frac1{y(1-y)}=\frac1y+\frac1{1-y}.
$$

したがって

$$
\int\left(\frac1y+\frac1{1-y}\right)dy=t+C.
$$

第2項では $d(1-y)=-dy$ なので

$$
\log|y|-\log|1-y|=t+C.
$$

$0<y<1$ の枝では

$$
\frac{y}{1-y}=Ae^t.
$$

$t=0$, $y=1/2$ を代入すると $A=1$ です。よって

$$
\boxed{y(t)=\frac{e^t}{1+e^t}=\frac1{1+e^{-t}}}.
$$

平衡解が途中で消えるのは、$y(1-y)$ で割って

$$
\frac{dy}{y(1-y)}=dt
$$

とした箇所です。$y=0,1$ ではこの割り算ができないため、先に別解として回収する必要があります。
<!-- solution-end -->

<a id="ex-ode1-a03"></a>
#### ODE1-A03 積分因子
- Level: A

初期値問題

$$
y'+2y=e^{-t},\qquad y(0)=0
$$

を、積分因子を「積の微分を作る」という手順から導いて解け。

<!-- solution-start -->
**解答**：左辺を $(\mu y)'$ にしたいので

$$
(\mu y)'=\mu y'+\mu' y
$$

と比較し、$\mu'=2\mu$ を要求します。$\mu(0)=1$ となるように取ると

$$
\mu(t)=e^{2t}.
$$

元の方程式に掛けると

$$
e^{2t}y'+2e^{2t}y=e^t.
$$

左辺は積の微分なので

$$
(e^{2t}y)'=e^t.
$$

0から $t$ まで積分すると

$$
e^{2t}y(t)-y(0)=e^t-1.
$$

$y(0)=0$ を使って

$$
\boxed{y(t)=e^{-t}-e^{-2t}}.
$$

最後に $t=0$ を代入すると0、微分して $y'+2y=e^{-t}$ となるため初期値問題を確かに満たします。
<!-- solution-end -->

<a id="ex-ode1-a04"></a>
#### ODE1-A04 完全微分方程式
- Level: A

$$
(2ty+1)+(t^2+2y)y'=0,
\qquad y(0)=1
$$

を解け。完全性の判定、potential $\Phi$ の構成、初期条件による定数決定まで示せ。

<!-- solution-start -->
**解答**：

$$
M(t,y)=2ty+1,
\qquad
N(t,y)=t^2+2y
$$

と置きます。偏微分すると

$$
M_y=2t,
\qquad
N_t=2t.
$$

従って $M_y=N_t$ で完全です。

$\Phi_t=M$ を $t$ で積分すると

$$
\Phi(t,y)=t^2y+t+C(y).
$$

これを $y$ で微分して

$$
\Phi_y=t^2+C'(y).
$$

$\Phi_y=N=t^2+2y$ でなければならないので

$$
C'(y)=2y,
\qquad
C(y)=y^2+C_0.
$$

定数 $C_0$ は等高線の定数へ吸収できるため、$\Phi=t^2y+t+y^2$ と取れます。解曲線は

$$
t^2y+t+y^2=C.
$$

初期条件 $(t,y)=(0,1)$ を代入すると

$$
C=1.
$$

したがって陰関数表示で

$$
\boxed{t^2y+t+y^2=1}
$$

が初期条件を通る解曲線です。
<!-- solution-end -->

### Level B

<a id="ex-ode1-b01"></a>
#### ODE1-B01 Bernoulli 方程式と失われる解
- Level: B

$$
y'-y=-y^2,
\qquad y(0)=\frac12
$$

を Bernoulli 変換で解け。また変換 $z=1/y$ によって失われる解を示せ。

<!-- solution-start -->
**解答**：方程式は

$$
y'+(-1)y=(-1)y^2
$$

なので Bernoulli 方程式で $\alpha=2$ です。初期値 $1/2>0$ を通る非零解を考え

$$
z=y^{1-2}=\frac1y
$$

と置きます。微分すると

$$
z'=-y^{-2}y'.
$$

元の方程式を $y^2$ で割ると

$$
\frac{y'}{y^2}-\frac1y=-1.
$$

$y'/y^2=-z'$、$1/y=z$ を代入して

$$
-z'-z=-1,
$$

すなわち

$$
z'+z=1.
$$

積分因子は $e^t$ なので

$$
(e^tz)'=e^t.
$$

積分して

$$
z=1+Ce^{-t}.
$$

初期条件 $y(0)=1/2$ から $z(0)=2$、従って $C=1$ です。よって

$$
z=1+e^{-t},
\qquad
\boxed{y(t)=\frac1{1+e^{-t}}}.
$$

一方、元の方程式へ $y\equiv0$ を代入すると左辺も右辺も0なので、これは別の解です。しかし $z=1/y$ は $y=0$ で定義できません。したがって変換の時点で $y\equiv0$ を失っており、最後に別解として回収する必要があります。
<!-- solution-end -->

<a id="ex-ode1-b02"></a>
#### ODE1-B02 phase line から挙動を読む
- Level: B

自律方程式

$$
y'=y(y-1)(2-y)
$$

について、平衡点をすべて求め、各区間で $y'$ の符号を調べて phase line を作れ。各平衡点へ左右から解が近づくか離れるかを判定せよ。

<!-- solution-start -->
**解答**：平衡点は右辺が0になる

$$
\boxed{y=0,1,2}
$$

です。

各区間で三因子の符号を調べます。

- $y<0$：$y<0$, $y-1<0$, $2-y>0$ なので $y'>0$。
- $0<y<1$：$y>0$, $y-1<0$, $2-y>0$ なので $y'<0$。
- $1<y<2$：三因子がすべて正なので $y'>0$。
- $y>2$：$y>0$, $y-1>0$, $2-y<0$ なので $y'<0$。

従って矢印は

```text
      →       ←       →       ←
--- 0 ----- 1 ----- 2 ---
```

となります。$y=0$ には左右から矢印が向かうので近傍の解は0へ近づきます。$y=1$ では左右の矢印が1から離れるので離れていきます。$y=2$ には左右から矢印が向かうので近傍の解は2へ近づきます。

ここでは明示解を求めず、右辺の符号だけで局所的な時間発展を読んでいます。
<!-- solution-end -->

<a id="ex-ode1-b03"></a>
#### ODE1-B03 Lipschitz 条件を直接確認する
- Level: B

長方形

$$
R=[-1,1]\times[-2,2]
$$

上で

$$
f(t,y)=t+y^2
$$

を考える。

1. $f$ が $y$ に関して Lipschitz であり、$L=4$ と取れることを示せ。
2. 初期値問題 $y'=t+y^2$, $y(0)=0$ に Picard--Lindelöf を適用するため、$M=5$ と取れることを示せ。
3. $h=1/5$ とすれば定理の三条件 $h\le a$, $Mh\le b$, $Lh<1$ が満たされることを確認せよ。

<!-- solution-start -->
**解答**：

1. 同じ $t$ に対して

$$
\begin{aligned}
|f(t,y_1)-f(t,y_2)|
&=|y_1^2-y_2^2|\\
&=|y_1-y_2|\,|y_1+y_2|.
\end{aligned}
$$

$|y_1|,|y_2|\le2$ なので

$$
|y_1+y_2|\le|y_1|+|y_2|\le4.
$$

従って

$$
|f(t,y_1)-f(t,y_2)|\le4|y_1-y_2|,
$$

よって $L=4$ と取れます。

2. $|t|\le1$, $|y|\le2$ だから

$$
|f(t,y)|=|t+y^2|
\le|t|+y^2
\le1+4=5.
$$

従って $M=5$ と取れます。

3. この長方形では $a=1$, $b=2$ です。$h=1/5$ とすると

$$
h=\frac15\le1=a,
$$

$$
Mh=5\cdot\frac15=1\le2=b,
$$

$$
Lh=4\cdot\frac15=\frac45<1.
$$

三条件がすべて成り立つので、[Picard--Lindelöf の定理](#thm-ode1-picard-lindelof) により少なくとも $[-1/5,1/5]$ 上で初期値問題はただ一つの解を持ちます。明示解を求めなくても局所存在・一意性が保証される点が重要です。
<!-- solution-end -->

### Level C

<a id="ex-ode1-c01"></a>
#### ODE1-C01 Picard 反復を手で追う
- Level: C

初期値問題

$$
y'=1+y,\qquad y(0)=0
$$

を考える。区間 $I=[-1/2,1/2]$ 上で積分作用素

$$
(Tu)(t)=\int_0^t\{1+u(s)\}\,ds
$$

を用いる。

1. $\mathcal B=\{u\in C(I):\|u\|_\infty\le1\}$ に対し $T\mathcal B\subset\mathcal B$ を示せ。
2. $T$ が縮小率 $q=1/2$ の縮小写像であることを示せ。
3. $u_0=0$, $u_{n+1}=Tu_n$ として $u_1,u_2,u_3$ を求めよ。
4. 一般に

$$
u_n(t)=\sum_{k=1}^{n}\frac{t^k}{k!}
$$

となることを示し、その一様極限が初期値問題の解であることを確認せよ。

<!-- solution-start -->
**解答**：

1. $u\in\mathcal B$ なら $|u(s)|\le1$ なので $|1+u(s)|\le2$ です。$|t|\le1/2$ に対して

$$
|(Tu)(t)|
\le\int_{\min(0,t)}^{\max(0,t)}|1+u(s)|\,ds
\le2|t|
\le1.
$$

従って $\|Tu\|_\infty\le1$ で、$T\mathcal B\subset\mathcal B$ です。

2. $u,v\in\mathcal B$ に対して

$$
\begin{aligned}
|(Tu)(t)-(Tv)(t)|
&=\left|\int_0^t\{u(s)-v(s)\}\,ds\right|\\
&\le |t|\,\|u-v\|_\infty\\
&\le\frac12\|u-v\|_\infty.
\end{aligned}
$$

$t$ について上限を取ると

$$
\|Tu-Tv\|_\infty
\le\frac12\|u-v\|_\infty.
$$

よって縮小率 $q=1/2<1$ です。

3. $u_0(t)=0$ から

$$
u_1(t)=\int_0^t1\,ds=t.
$$

次に

$$
\begin{aligned}
u_2(t)
&=\int_0^t(1+s)\,ds\\
&=t+\frac{t^2}{2}.
\end{aligned}
$$

さらに

$$
\begin{aligned}
u_3(t)
&=\int_0^t\left(1+s+\frac{s^2}{2}\right)ds\\
&=t+\frac{t^2}{2}+\frac{t^3}{6}.
\end{aligned}
$$

4. 帰納法で示します。$n=1$ では $u_1=t$ なので成立します。$u_n(t)=\sum_{k=1}^n t^k/k!$ と仮定すると

$$
\begin{aligned}
u_{n+1}(t)
&=\int_0^t\left(1+\sum_{k=1}^n\frac{s^k}{k!}\right)ds\\
&=t+\sum_{k=1}^n\frac{t^{k+1}}{(k+1)!}\\
&=\sum_{k=1}^{n+1}\frac{t^k}{k!}.
\end{aligned}
$$

従って全ての $n$ で成立します。

指数級数は $I$ 上で一様収束し、

$$
\lim_{n\to\infty}u_n(t)
=\sum_{k=1}^{\infty}\frac{t^k}{k!}
=e^t-1.
$$

実際

$$
y(t)=e^t-1
$$

なら

$$
y'(t)=e^t=1+y(t),
\qquad
y(0)=0.
$$

したがって

$$
\boxed{y(t)=e^t-1}
$$

が解です。さらに Section 10 の縮小評価から、この区間では Picard 反復の極限となる不動点は一つしかないので、この解は一意です。
<!-- solution-end -->

---

## 14. 章末チェック

- ODE の階数、線形/非線形、自律/非自律、初期値問題/境界値問題を具体例で分類できる。
- 変数分離で割る因子が0になる平衡解を先に回収できる。
- 一階線形 ODE の積分因子を $(\mu y)'$ を作る条件から導ける。
- 完全微分方程式で $M_y=N_t$ を確認し、potential を構成できる。
- Bernoulli 方程式を変数変換で一階線形 ODE に直せる。
- 自律方程式の平衡点と phase line から増減方向を読める。
- 初期値問題と積分方程式の同値性を説明できる。
- $y$ に関する Lipschitz 条件を具体的な長方形上で検証できる。
- Picard--Lindelöf の証明で $Mh\le b$ と $Lh<1$ がそれぞれ何を保証するか説明できる。
- Lipschitz 性を失うと縮小評価が壊れ、一意性が失われ得ることを標準反例で説明できる。
