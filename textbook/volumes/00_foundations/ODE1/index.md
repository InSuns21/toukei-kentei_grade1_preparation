# ODE1 標準常微分方程式 I：一階常微分方程式・初期値問題

微分方程式では、未知数は数ではなく関数です。しかも「式を満たす関数を一つ見つける」だけでは終わりません。

- どの解法を選べばよいか。
- 初期条件を与えたとき、本当に解は存在するか。
- 存在するなら一つに決まるか。
- 公式変形の途中で解を落としていないか。

この章では一階常微分方程式の標準的な解法を整理したあと、最後の二つの問いを Picard--Lindelöf の局所存在・一意性定理まで証明して閉じます。

前提として [RA3 微分法](../RA3/index.md)、RA4 の [微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1)・[II](../RA4/index.md#thm-ra4-ftc2)、[RA5 一様収束](../RA5/index.md) を使います。旧 Encore II の [F0-00H1](../F0_00H1_常微分方程式_線形系_行列指数/index.md) にあった ODE の入口を引き継ぎますが、この章では PDE の準備だけでなく、一階 ODE 自体を独立した標準コアとして扱います。

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

と書けるとき、右辺 $f$ が時刻 $t$ と現在値 $y$ から「その点での傾き」を指定している、と読めます。

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
**定義の確認**

### 三つの方程式を分類する

1. $y'=2y$ は一階・線形・自律方程式です。$p(t)=-2$, $q(t)=0$ とすれば $y'-2y=0$ の形です。
2. $y'=t+y^2$ は一階・非線形・非自律方程式です。$y^2$ があるので線形ではなく、右辺に $t$ があるので自律でもありません。
3. $y''+y=0$ は二階 ODE です。$y(0)=0$, $y'(0)=1$ を課せば初期値問題、$y(0)=0$, $y(\pi)=0$ を課せば境界値問題です。

分類名は飾りではありません。線形なら積分因子、高階線形なら特性方程式、自律なら phase line というように、構造が解法を選ぶ手掛かりになります。
<!-- definition-example-end -->

---

## 2. 解曲線と方向場

<a id="def-ode1-direction-field"></a>
<!-- formal-statement-start -->
> **定義（方向場）**  
> 一階 ODE $y'=f(t,y)$ に対し、平面上の各点 $(t,y)$ に傾き $f(t,y)$ をもつ短い線分を対応させた図を方向場という。解曲線 $t\mapsto(t,y(t))$ の接線は、その曲線上の各点で方向場の線分と同じ傾きを持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode1-direction-field -->
**定義の確認**

### $y'=-y$ の方向場を読む

$y>0$ なら傾きは負、$y<0$ なら傾きは正、$y=0$ なら傾きは0です。したがって解曲線は両側から $y=0$ へ向かいます。実際の解 $y(t)=Ce^{-t}$ と整合しています。

この見方は存在・一意性にも関係します。一意性が成り立つ領域では、同じ点を通る二本の異なる解曲線は存在できません。
<!-- definition-example-end -->

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

と書けます。$H'(y)=1/h(y)$ を満たす原始関数 $H$ を取れば連鎖律から

$$
\frac{d}{dt}H(y(t))=g(t),
$$

したがって

$$
H(y(t))=\int g(t)\,dt+C
$$

を得ます。

ただし **$h(y)$ で割る前に $h(c)=0$ となる定数 $c$ を調べる必要があります。** そのとき $y(t)\equiv c$ は元の方程式を満たす平衡解ですが、$h(y)$ で割った式からは消えます。

<!-- definition-example-start: def-ode1-separable -->
**定義の確認**

### ロジスティック方程式

$r>0$, $K>0$ として

$$
y'=r y\left(1-\frac{y}{K}\right)
$$

を考えます。まず $y=0,K$ では右辺が0なので、二つの平衡解があります。

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

よって

$$
\frac{y}{K-y}=Ae^{rt},
\qquad
\boxed{y(t)=\frac{K}{1+A^{-1}e^{-rt}}}
$$

です。$y=0,K$ は途中で割ったため、この表示とは別に回収しなければなりません。
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

にしたいので $\mu'=p\mu$ を要求します。基準点 $t_0\in I$ を固定して

$$
\mu(t)=\exp\left(\int_{t_0}^t p(s)\,ds\right)
$$

と置けば、RA4 の [微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) と連鎖律から

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
\quad
\mu(t)=\exp\left(\int_{t_0}^tp(s)\,ds\right)
}
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$\mu$ を掛ける目的は、方程式全体を $(\mu y)'=\mu q$ という一つの積の微分に変えることです。そこまで変形できれば初期時刻から積分して $y$ を取り出せます。同じ変形が任意の解に対して成立するので、一意性も同時に出ます。

<!-- proof-start -->
### 証明

$\mu(t)>0$ で $\mu'=p\mu$ です。方程式に $\mu$ を掛けると

$$
\mu y'+\mu p y=\mu q,
$$

左辺は

$$
\mu y'+\mu' y=(\mu y)'
$$

なので

$$
(\mu y)'=\mu q.
$$

$t_0$ から $t$ まで積分し、[微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を使うと

$$
\mu(t)y(t)-\mu(t_0)y(t_0)
=\int_{t_0}^t\mu(s)q(s)\,ds.
$$

$\mu(t_0)=1$, $y(t_0)=y_0$ だから表示式を得ます。逆に表示式を微分すれば元の方程式を満たし、$t=t_0$ を代入すれば初期条件を満たします。また任意の解は同じ積分操作で同じ表示式へ到達するので一意です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ode1-first-linear -->
**定義の確認**

### $y'+2y=e^{-t}$, $y(0)=0$

$p(t)=2$ なので $\mu(t)=e^{2t}$。方程式に掛けると

$$
(e^{2t}y)'=e^t.
$$

0から $t$ まで積分して

$$
e^{2t}y(t)=e^t-1,
$$

したがって

$$
\boxed{y(t)=e^{-t}-e^{-2t}}.
$$

積分因子は「暗記して代入する係数」ではなく、積の微分を意図的に作る係数です。
<!-- definition-example-end -->

---

## 5. 完全微分方程式：解曲線を等高線として読む

<a id="def-ode1-exact"></a>
<!-- formal-statement-start -->
> **定義（完全微分方程式）**  
> 方程式

$$
M(t,y)+N(t,y)y'=0
$$

> について、ある $C^1$ 級関数 $\Phi(t,y)$ が存在して

$$
\Phi_t=M,\qquad \Phi_y=N
$$

> を満たすとき、完全微分方程式という。
<!-- formal-statement-end -->

解 $y(t)$ に沿って連鎖律を使うと

$$
\frac{d}{dt}\Phi(t,y(t))
=\Phi_t+\Phi_y y'=M+Ny'=0,
$$

したがって解曲線は $\Phi(t,y)=C$ という等高線に沿います。

<a id="thm-ode1-exact-criterion"></a>
<!-- formal-statement-start -->
> **定理（長方形上の完全性判定）**  
> 長方形 $R=[a,b]\times[c,d]$ を含む開集合上で $M,N$ が $C^1$ 級であり、$R$ 上で

$$
\frac{\partial M}{\partial y}=\frac{\partial N}{\partial t}
$$

> を満たすとする。このとき $R$ 上に $\Phi_t=M$, $\Phi_y=N$ を満たす $C^1$ 級関数 $\Phi$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

基準点 $(t_*,y_*)$ から横・縦に積分して potential を作ります。交差偏微分の一致は、$t$ 微分で生じる積分項を $M(t,y)-M(t,y_*)$ に変えるために使います。

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

と定めます。第2項だけが $y$ に依存するので微積分学の基本定理から

$$
\Phi_y(t,y)=N(t,y).
$$

次に $t$ で微分します。$N$ は $C^1$ 級なので、その偏導関数 $N_t$ は長方形上で連続です。このとき積分区間が固定されたパラメータ積分は積分内微分でき、仮定 $N_t=M_y$ を使うと

$$
\begin{aligned}
\Phi_t(t,y)
&=M(t,y_*)+\int_{y_*}^{y}N_t(t,u)\,du\\
&=M(t,y_*)+\int_{y_*}^{y}M_y(t,u)\,du\\
&=M(t,y_*)+M(t,y)-M(t,y_*)\\
&=M(t,y).
\end{aligned}
$$

最後の積分評価は $u\mapsto M(t,u)$ に対する微積分学の基本定理です。よって $\Phi_t=M$, $\Phi_y=N$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-ode1-exact -->
**定義の確認**

### $(2ty+1)+(t^2+2y)y'=0$

$$
M(t,y)=2ty+1,
\qquad
N(t,y)=t^2+2y
$$

と置くと $M_y=2t=N_t$ なので完全です。$\Phi_t=M$ を $t$ で積分すると

$$
\Phi(t,y)=t^2y+t+C(y).
$$

$\Phi_y=N$ より

$$
t^2+C'(y)=t^2+2y,
$$

従って $C(y)=y^2$ と取れます。よって解曲線は

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

$y>0$ である区間に限って $z=y^{1-\alpha}$ と置くと

$$
z'=(1-\alpha)y^{-\alpha}y'.
$$

元の方程式を $y^\alpha$ で割り、$z$ を代入すれば

$$
\boxed{z'+(1-\alpha)p(t)z=(1-\alpha)q(t)}
$$

という一階線形 ODE に変わります。

<!-- definition-example-start: def-ode1-bernoulli -->
**定義の確認**

### $y'-y=-y^2$

非零解について $z=y^{-1}$ と置くと

$$
z'+z=1.
$$

積分因子 $e^t$ を使えば

$$
(e^tz)'=e^t,
\qquad
z=1+Ce^{-t},
$$

したがって

$$
\boxed{y(t)=\frac1{1+Ce^{-t}}}.
$$

元の方程式には $y\equiv0$ も解として存在します。$z=1/y$ と置いた時点でこの解を除外したため、最後に別途回収します。
<!-- definition-example-end -->

---

## 7. 自律方程式・平衡解・phase line

<a id="def-ode1-equilibrium"></a>
<!-- formal-statement-start -->
> **定義（平衡解と phase line）**  
> 自律方程式 $y'=f(y)$ に対し $f(c)=0$ となる定数 $c$ があるとき、$y(t)\equiv c$ を平衡解という。実数直線上に平衡点を置き、その間で $f(y)$ の符号に応じて解の増減方向を矢印で示した図を phase line という。
<!-- formal-statement-end -->

$f(y)>0$ なら時間が進むと $y$ は増加し、$f(y)<0$ なら減少します。

<!-- definition-example-start: def-ode1-equilibrium -->
**定義の確認**

### ロジスティック方程式の phase line

$$
y'=r y\left(1-\frac{y}{K}\right),\qquad r,K>0
$$

では平衡点は $0,K$ です。

- $y<0$ では $y'<0$。
- $0<y<K$ では $y'>0$。
- $y>K$ では $y'<0$。

したがって $K$ の両側では矢印が $K$ へ向かい、$0$ の両側では矢印が $0$ から離れます。公式解を先に求めなくても、符号だけから局所的な挙動を読めます。
<!-- definition-example-end -->

---

## 8. 初期値問題を積分方程式へ直す

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
y(t)-y(t_0)=\int_{t_0}^{t}y'(s)\,ds
=\int_{t_0}^{t}f(s,y(s))\,ds.
$$

初期条件 $y(t_0)=y_0$ を使えば積分方程式を得ます。

逆に積分方程式を満たすとします。$f$ と $y$ が連続なので $s\mapsto f(s,y(s))$ は連続です。[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) により両辺を $t$ で微分でき、$y'(t)=f(t,y(t))$ を得ます。また $t=t_0$ では積分が0なので $y(t_0)=y_0$ です。$\square$
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
**定義の確認**

### $t+y^2$ は有界な帯では Lipschitz

$|y|\le B$ なら

$$
\begin{aligned}
|(t+y_1^2)-(t+y_2^2)|
&=|y_1-y_2|\,|y_1+y_2|\\
&\le2B|y_1-y_2|.
\end{aligned}
$$

したがって $f(t,y)=t+y^2$ は $|y|\le B$ 上で $L=2B$ と取れます。

一方 $f(y)=3|y|^{2/3}$ は0の近くで Lipschitz ではありません。$y>0$ に対して

$$
\frac{|f(y)-f(0)|}{|y-0|}=3y^{-1/3}\to\infty
\qquad(y\downarrow0)
$$

だからです。
<!-- definition-example-end -->

重要なのは **未知関数の値 $y$ の違いに対して**右辺の違いを抑えていることです。これが積分作用素を縮小させ、一意性を生みます。

---

## 10. Picard--Lindelöf の局所存在・一意性

<a id="thm-ode1-picard-lindelof"></a>
<!-- formal-statement-start -->
> **定理（Picard--Lindelöf の局所存在・一意性）**  
> $a,b>0$ とし、

$$
R=[t_0-a,t_0+a]\times[y_0-b,y_0+b]
$$

> とする。$f:R\to\mathbb R$ は連続で、ある $M\ge0$, $L\ge0$ に対して

$$
|f(t,y)|\le M,
\qquad
|f(t,y_1)-f(t,y_2)|\le L|y_1-y_2|
$$

> が $R$ 上で成り立つとする。正数 $h$ を

$$
h\le a,\qquad Mh\le b,\qquad Lh<1
$$

> となるように取る。このとき $I=[t_0-h,t_0+h]$ 上で初期値問題

$$
y'=f(t,y),\qquad y(t_0)=y_0
$$

> は、グラフが $R$ に含まれる $C^1$ 級解をただ一つ持つ。
<!-- formal-statement-end -->

### 証明の見取り図

積分方程式の右辺を作用素 $T$ と見ます。

- $Mh\le b$：$T$ を作用させても長方形 $R$ の外へ出ない。
- $Lh<1$：二つの関数の距離を $T$ が必ず縮める。
- 反復列を一様 Cauchy にし、RA5 で連続な極限関数を得る。
- 極限が $T$ の不動点であることから存在、不動点が一つしかないことから一意性を得る。

「固定点定理を使う」と一行で済ませず、この四段を確認します。

<!-- proof-start -->
### 証明

$I=[t_0-h,t_0+h]$ とし、$I$ 上の連続関数で

$$
\|u-y_0\|_\infty:=\sup_{t\in I}|u(t)-y_0|\le b
$$

を満たすもの全体を $\mathcal B$ とします。$u\in\mathcal B$ なら $(t,u(t))\in R$ です。

$u\in\mathcal B$ に対して

$$
(Tu)(t)=y_0+\int_{t_0}^{t}f(s,u(s))\,ds
$$

と定めます。被積分関数は連続なので $Tu$ も連続です。また

$$
|(Tu)(t)-y_0|
\le M|t-t_0|
\le Mh
\le b.
$$

よって $T\mathcal B\subset\mathcal B$ です。ここで $Mh\le b$ を使いました。

次に $u,v\in\mathcal B$ とします。Lipschitz 条件から

$$
\begin{aligned}
|(Tu)(t)-(Tv)(t)|
&\le L|t-t_0|\,\|u-v\|_\infty\\
&\le Lh\,\|u-v\|_\infty.
\end{aligned}
$$

$q=Lh<1$ と置けば

$$
\|Tu-Tv\|_\infty\le q\|u-v\|_\infty.
$$

初期関数を $u_0(t)\equiv y_0$ とし、Picard 反復 $u_{n+1}=Tu_n$ を定めます。$T\mathcal B\subset\mathcal B$ なので全ての $u_n$ は $\mathcal B$ に属します。縮小評価を繰り返すと

$$
\|u_{n+1}-u_n\|_\infty
\le q^n\|u_1-u_0\|_\infty.
$$

$m>n$ なら

$$
\begin{aligned}
\|u_m-u_n\|_\infty
&\le\sum_{k=n}^{m-1}\|u_{k+1}-u_k\|_\infty\\
&\le\frac{q^n}{1-q}\|u_1-u_0\|_\infty.
\end{aligned}
$$

$q<1$ なので右辺は $n\to\infty$ で0へ行きます。従って $(u_n)$ は [一様 Cauchy 条件](../RA5/index.md#def-ra5-uniform-cauchy) を満たし、ある関数 $u$ へ一様収束します。各 $u_n$ は連続なので [一様極限の連続性](../RA5/index.md#thm-ra5-continuity) により $u$ も連続です。一様極限を取っても $|u(t)-y_0|\le b$ なので $u\in\mathcal B$ です。

さらに

$$
\|Tu_n-Tu\|_\infty\le q\|u_n-u\|_\infty\to0.
$$

一方 $Tu_n=u_{n+1}\to u$ だから $Tu=u$ です。すなわち

$$
u(t)=y_0+\int_{t_0}^{t}f(s,u(s))\,ds.
$$

[初期値問題と積分方程式の同値性](#prop-ode1-integral-equation) により $u$ は初期値問題の $C^1$ 級解です。これで存在が示されました。

最後に $u,v\in\mathcal B$ がともに解なら、ともに $T$ の不動点なので

$$
\|u-v\|_\infty
=\|Tu-Tv\|_\infty
\le q\|u-v\|_\infty.
$$

$q<1$ より $(1-q)\|u-v\|_\infty\le0$。ノルムは非負なので $\|u-v\|_\infty=0$、従って $u=v$ です。$\square$
<!-- proof-end -->

この証明では、Lipschitz 評価が Picard 反復を縮める箇所と、二つの不動点を同一にする箇所の二度働いています。一意性の機構はここです。

---

## 11. 連続でも一意とは限らない

<a id="ex-ode1-nonunique"></a>
### 反例：待ってから動き出す解

初期値問題

$$
y'=3|y|^{2/3},\qquad y(0)=0
$$

を考えます。右辺は連続です。任意の $c\ge0$ に対して

$$
y_c(t)=
\begin{cases}
0,&t\le c,\\
(t-c)^3,&t\ge c
\end{cases}
$$

と置きます。$t<c$ では $y_c'=0$ で右辺も0、$t>c$ では

$$
y_c'(t)=3(t-c)^2
=3|(t-c)^3|^{2/3}=3|y_c(t)|^{2/3}.
$$

$t=c$ でも左右の導関数は0なので $y_c$ は $C^1$ 級です。また $c\ge0$ なら $y_c(0)=0$。従って同じ初期条件を満たす異なる解が無数にあります。

失った仮定は $y$ に関する Lipschitz 性です。

$$
\frac{|3|y|^{2/3}-0|}{|y-0|}=3|y|^{-1/3}\to\infty
$$

だから、どんな有限の $L$ でも0近傍で Lipschitz 評価が破れます。そのため Picard--Lindelöf の証明で必要だった

$$
\|Tu-Tv\|_\infty\le q\|u-v\|_\infty,
\qquad q<1
$$

という一様な縮小評価を作れません。結論が偽なだけでなく、一意性を生んでいた証明機構そのものが失われています。

---

## 12. 解法をどう選ぶか

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

次を階数、線形/非線形、自律/非自律の観点から分類せよ。また (a) に $y(0)=1$ を付けた問題と、(c) に $y(0)=y(1)=0$ を付けた問題が初期値問題・境界値問題のどちらか答えよ。

(a) $y'+ty=1$  
(b) $y'=y(1-y)$  
(c) $y''+t y=0$

<!-- solution-start -->
**解答**：

(a) 一階です。$p(t)=t$, $q(t)=1$ として $y'+p(t)y=q(t)$ の形なので線形、係数に $t$ が陽に現れるので非自律です。$y(0)=1$ は一つの時刻で値を指定するので初期値問題です。

(b) 一階です。右辺に $y^2$ があるので非線形、右辺が $t$ を含まないので自律です。

(c) 二階です。$y,y',y''$ について一次なので線形、係数 $t$ があるので非自律です。$y(0)=0$, $y(1)=0$ は異なる二点で条件を課すので境界値問題です。
<!-- solution-end -->

<a id="ex-ode1-a02"></a>
#### ODE1-A02 変数分離と平衡解
- Level: A

$$
y'=y(1-y),\qquad y(0)=\frac12
$$

を変数分離で解け。また平衡解を全て求め、変数分離の途中でそれらが消える箇所を説明せよ。

<!-- solution-start -->
**解答**：右辺が0になる $y=0,1$ は平衡解です。非平衡解について

$$
\frac{dy}{y(1-y)}=dt,
\qquad
\frac1{y(1-y)}=\frac1y+\frac1{1-y}.
$$

したがって

$$
\log|y|-\log|1-y|=t+C.
$$

初期値は $0<y<1$ にあるので

$$
\frac{y}{1-y}=Ae^t.
$$

$t=0$, $y=1/2$ から $A=1$。よって

$$
\boxed{y(t)=\frac1{1+e^{-t}}}.
$$

平衡解 $y=0,1$ が消れるのは $y(1-y)$ で割った箇所です。したがって割る前に別解として確認する必要があります。
<!-- solution-end -->

<a id="ex-ode1-a03"></a>
#### ODE1-A03 積分因子
- Level: A

$$
y'+2y=e^{-t},\qquad y(0)=0
$$

を、積分因子を「積の微分を作る」という手順から導いて解け。

<!-- solution-start -->
**解答**：$(\mu y)'=\mu y'+\mu'y$ と比較し $\mu'=2\mu$ を要求します。$\mu(0)=1$ として $\mu=e^{2t}$。すると

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

$t=0$ を代入すると初期条件を満たし、微分して元の ODE に戻ることも確認できます。
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
**解答**：$M=2ty+1$, $N=t^2+2y$ と置くと

$$
M_y=2t=N_t
$$

なので完全です。$\Phi_t=M$ を $t$ で積分すると

$$
\Phi=t^2y+t+C(y).
$$

$\Phi_y=N$ より $C'(y)=2y$、従って $C(y)=y^2$ と取れます。よって

$$
t^2y+t+y^2=C.
$$

$(t,y)=(0,1)$ を代入すると $C=1$ なので

$$
\boxed{t^2y+t+y^2=1}.
$$
<!-- solution-end -->

### Level B

<a id="ex-ode1-b01"></a>
#### ODE1-B01 Bernoulli 方程式と失われる解
- Level: B

$$
y'-y=-y^2,
\qquad y(0)=\frac12
$$

を Bernoulli 変換で解け。また $z=1/y$ によって失われる解を示せ。

<!-- solution-start -->
**解答**：非零解について $z=1/y$ と置くと $z'=-y^{-2}y'$ です。元の式を $y^2$ で割ると

$$
\frac{y'}{y^2}-\frac1y=-1,
$$

従って

$$
z'+z=1.
$$

積分因子 $e^t$ により

$$
(e^tz)'=e^t,
\qquad
z=1+Ce^{-t}.
$$

初期条件から $z(0)=2$ なので $C=1$。よって

$$
\boxed{y(t)=\frac1{1+e^{-t}}}.
$$

一方 $y\equiv0$ は元の方程式を満たしますが、$z=1/y$ はそこで定義できません。したがって変換時に失った解として別途回収します。
<!-- solution-end -->

<a id="ex-ode1-b02"></a>
#### ODE1-B02 phase line から挙動を読む
- Level: B

$$
y'=y(y-1)(2-y)
$$

について平衡点を求め、各区間で $y'$ の符号を調べて phase line を作れ。各平衡点へ左右から解が近づくか離れるかを判定せよ。

<!-- solution-start -->
**解答**：平衡点は $y=0,1,2$ です。符号は

- $y<0$：$y'>0$。
- $0<y<1$：$y'<0$。
- $1<y<2$：$y'>0$。
- $y>2$：$y'<0$。

よって

```text
      →       ←       →       ←
--- 0 ----- 1 ----- 2 ---
```

となります。$0$ と $2$ には左右から矢印が向かい、$1$ では左右の矢印が離れます。明示解を求めず、右辺の符号だけで局所的な時間発展を読んでいます。
<!-- solution-end -->

<a id="ex-ode1-b03"></a>
#### ODE1-B03 Lipschitz 条件を直接確認する
- Level: B

長方形

$$
R=[-1,1]\times[-2,2]
$$

上で $f(t,y)=t+y^2$ とする。

1. $y$ に関する Lipschitz 定数として $L=4$ を取れることを示せ。
2. $|f|\le M$ に $M=5$ を取れることを示せ。
3. $h=1/5$ で Picard--Lindelöf の三条件を確認せよ。

<!-- solution-start -->
**解答**：

1. $|y_1|,|y_2|\le2$ なら

$$
|f(t,y_1)-f(t,y_2)|
=|y_1-y_2|\,|y_1+y_2|
\le4|y_1-y_2|.
$$

従って $L=4$ です。

2. $|t|\le1$, $|y|\le2$ より

$$
|t+y^2|\le1+4=5,
$$

従って $M=5$ です。

3. $a=1$, $b=2$, $h=1/5$ なので

$$
h=\frac15\le1,
\qquad
Mh=1\le2,
\qquad
Lh=\frac45<1.
$$

よって定理により少なくとも $[-1/5,1/5]$ 上で初期値問題 $y'=t+y^2$, $y(0)=0$ はただ一つの解を持ちます。
<!-- solution-end -->

### Level C

<a id="ex-ode1-c01"></a>
#### ODE1-C01 Picard 反復を手で追う
- Level: C

初期値問題

$$
y'=1+y,\qquad y(0)=0
$$

を考え、$I=[-1/2,1/2]$ 上で

$$
(Tu)(t)=\int_0^t\{1+u(s)\}\,ds
$$

と置く。

1. $\mathcal B=\{u\in C(I):\|u\|_\infty\le1\}$ に対し $T\mathcal B\subset\mathcal B$ を示せ。
2. $T$ が縮小率 $q=1/2$ の縮小写像であることを示せ。
3. $u_0=0$, $u_{n+1}=Tu_n$ として $u_1,u_2,u_3$ を求めよ。
4. 一般に $u_n(t)=\sum_{k=1}^{n}t^k/k!$ となることを示し、その極限が初期値問題の解であることを確認せよ。

<!-- solution-start -->
**解答**：

1. $u\in\mathcal B$ なら $|1+u(s)|\le2$ なので、$|t|\le1/2$ に対して

$$
|(Tu)(t)|\le2|t|\le1.
$$

従って $T\mathcal B\subset\mathcal B$ です。

2. $u,v\in\mathcal B$ なら

$$
\begin{aligned}
|(Tu)(t)-(Tv)(t)|
&\le |t|\,\|u-v\|_\infty\\
&\le\frac12\|u-v\|_\infty.
\end{aligned}
$$

上限を取って

$$
\|Tu-Tv\|_\infty\le\frac12\|u-v\|_\infty.
$$

3. 逐次積分すると

$$
u_1=t,
$$

$$
u_2=t+\frac{t^2}{2},
$$

$$
u_3=t+\frac{t^2}{2}+\frac{t^3}{6}.
$$

4. $u_n=\sum_{k=1}^n t^k/k!$ と仮定すると

$$
\begin{aligned}
u_{n+1}(t)
&=\int_0^t\left(1+\sum_{k=1}^n\frac{s^k}{k!}\right)ds\\
&=t+\sum_{k=1}^n\frac{t^{k+1}}{(k+1)!}\\
&=\sum_{k=1}^{n+1}\frac{t^k}{k!},
\end{aligned}
$$

よって帰納法で成立します。指数級数は $I$ 上で一様収束し、

$$
\lim_{n\to\infty}u_n(t)=e^t-1.
$$

実際 $y=e^t-1$ なら

$$
y'=e^t=1+y,
\qquad
y(0)=0.
$$

従って

$$
\boxed{y(t)=e^t-1}.
$$

さらに Section 10 の縮小評価から不動点は一つしかないので、この解は一意です。
<!-- solution-end -->

---

## 14. 章末チェック

- ODE の階数、線形/非線形、自律/非自律、初期値問題/境界値問題を具体例で分類できる。
- 方向場から解曲線の局所的な向きを読める。
- 変数分離で割る因子が0になる平衡解を先に回収できる。
- 一階線形 ODE の積分因子を $(\mu y)'$ を作る条件から導ける。
- 完全微分方程式で $M_y=N_t$ を確認し、potential を構成できる。
- Bernoulli 方程式を変数変換で一階線形 ODE に直せる。
- 自律方程式の平衡点と phase line から増減方向を読める。
- 初期値問題と積分方程式の同値性を説明できる。
- $y$ に関する Lipschitz 条件を具体的な長方形上で検証できる。
- Picard--Lindelöf の証明で $Mh\le b$ と $Lh<1$ がそれぞれ何を保証するか説明できる。
- Lipschitz 性を失うと縮小評価が壊れ、一意性が失われ得ることを標準反例で説明できる。
