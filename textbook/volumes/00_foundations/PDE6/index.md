# PDE6 Greenの恒等式・基本解・Green関数

PDE5 では、Laplace・Poisson 方程式を平均値性質、最大原理、変数分離、Poisson kernel から調べました。本章では同じ楕円型方程式を、**領域内部の微分を境界積分へ移す**という別の視点から見直します。

中心となる流れは

$$
\text{発散定理}
\Longrightarrow
\text{Green の恒等式}
\Longrightarrow
\text{基本解}
\Longrightarrow
\text{Green 関数}
\Longrightarrow
\text{表現公式}
$$

です。

本章では PDE5 と同じく二次元の古典解を主対象にします。多重積分・反復積分・変数変換は [RA7](../RA7/index.md) の正本を使います。弱微分、超関数としての $-\Delta\Phi=\delta_0$、Sobolev 空間は Encore III へ送り、ここでは逆輸入しません。

本章で使う領域は、長方形・円板・円孔を有限個あけた領域など、境界が有限本の $C^1$ 曲線弧からなり、有限分割によって $x$-simple / $y$-simple な部分領域へ落とせるものとします。この範囲なら、発散定理を一変数の微積分学の基本定理と反復積分から直接証明できます。

この章の中心問いは次の四つです。

1. なぜ $\Delta$ を含む体積積分が境界上の法線微分へ変わるのか。
2. 原点に集中した「単位源」を、古典解の範囲でどう表現するのか。
3. 境界条件を満たすよう基本解を補正すると、なぜ Green 関数になるのか。
4. PDE5 の Poisson kernel は Green 関数からどう再発見できるのか。

---

## 1. 境界を横切る方向を固定する

<a id="def-pde6-normal-derivative"></a>
<!-- formal-statement-start -->
> **定義（外向き単位法線と法線微分）**  
> $\Omega\subset\mathbb R^2$ を境界が区分的に $C^1$ な有界領域とする。境界の滑らかな点 $y\in\partial\Omega$ で、領域の外側を向く長さ1のベクトルを外向き単位法線 $n(y)$ と書く。  
> $u$ が境界近くで $C^1$ 級なら、その外向き法線微分を

$$
\frac{\partial u}{\partial n}(y)
=
\nabla u(y)\cdot n(y)
$$

> と定義する。
<!-- formal-statement-end -->

法線微分は「境界に沿って」ではなく「境界を横切って」関数がどれだけ変化するかを測ります。Neumann 問題で指定していた量が、ここで積分公式の自然な境界項として現れます。

<!-- definition-example-start: def-pde6-normal-derivative -->
**定義の確認**

単位円板

$$
D=\{(x,y):x^2+y^2<1\}
$$

の境界点 $\xi=(\cos\theta,\sin\theta)$ では

$$
n(\xi)=\xi
$$

です。$u(x,y)=x^2+y^2$ なら

$$
\nabla u=(2x,2y),
$$

したがって境界上で

$$
\frac{\partial u}{\partial n}
=
(2\cos\theta,2\sin\theta)\cdot(\cos\theta,\sin\theta)
=
2.
$$

円の外向き方向へ半径を増やすと $r^2$ は速度 $2r$ で増え、$r=1$ では 2 になるという幾何とも一致します。
<!-- definition-example-end -->

---

## 2. まず長方形で「内部の発散 = 境界flux」を見る

ベクトル場

$$
F=(P,Q)
$$

の発散を

$$
\operatorname{div}F
=
P_x+Q_y
$$

とします。

長方形

$$
R=[a,b]\times[c,d]
$$

で $P,Q\in C^1(R)$ とすると、[RA7 の反復積分](../RA7/index.md)と一変数の微積分学の基本定理から

$$
\begin{aligned}
\iint_R P_x\,dA
&=
\int_c^d
\left(
P(b,y)-P(a,y)
\right)\,dy,\\
\iint_R Q_y\,dA
&=
\int_a^b
\left(
Q(x,d)-Q(x,c)
\right)\,dx.
\end{aligned}
$$

右辺はちょうど四辺から外へ出る flux の和です。

左辺 $x=a$ では $n=(-1,0)$、右辺 $x=b$ では $n=(1,0)$、下辺 $y=c$ では $n=(0,-1)$、上辺 $y=d$ では $n=(0,1)$ なので

$$
\iint_R \operatorname{div}F\,dA
=
\int_{\partial R}F\cdot n\,ds.
$$

一般の曲線境界でも本質は同じです。違うのは、境界をグラフに分けて法線と弧長を同時に処理する点だけです。

---

## 3. 平面版発散定理

<a id="thm-pde6-divergence"></a>
<!-- formal-statement-start -->
> **定理（平面版発散定理）**  
> $\Omega\subset\mathbb R^2$ を有界連結領域とし、$\partial\Omega$ は有限本の $C^1$ 曲線弧からなるとする。さらに、有限本の補助線分で分割すれば、各部分領域を $x$-simple および $y$-simple な領域として扱えるとする。  
> $F=(P,Q)\in C^1(\overline\Omega;\mathbb R^2)$ なら

$$
\boxed{
\iint_\Omega
\operatorname{div}F\,dA
=
\int_{\partial\Omega}
F\cdot n\,ds
}
$$

> が成り立つ。右辺では各滑らかな境界弧上の外向き単位法線を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

$P_x$ と $Q_y$ を別々に積分します。$P_x$ には $y$ を固定して左右端を読む $x$-simple 分割を、$Q_y$ には $x$ を固定して上下端を読む $y$-simple 分割を使います。各部分領域の人工的な内部境界は、隣り合う領域から見ると法線が反対向きなので相殺します。

<!-- proof-start -->
### 証明

まず $x$-simple な一つの部分領域

$$
E=
\{(x,y):c<y<d,\ \alpha(y)<x<\beta(y)\}
$$

を考えます。ここで $\alpha,\beta$ は区分的に $C^1$ とします。

反復積分と一変数の微積分学の基本定理から

$$
\iint_E P_x\,dA
=
\int_c^d
\left[
P(\beta(y),y)-P(\alpha(y),y)
\right]\,dy.
$$

右側境界

$$
\gamma_R(y)=(\beta(y),y)
$$

では、外向き法線と弧長の積は

$$
n\,ds
=
(1,-\beta'(y))\,dy.
$$

したがって $P$ が寄与する flux は

$$
\int_{\gamma_R}P\,n_x\,ds
=
\int_c^d P(\beta(y),y)\,dy.
$$

左側境界

$$
\gamma_L(y)=(\alpha(y),y)
$$

では

$$
n\,ds
=
(-1,\alpha'(y))\,dy,
$$

ゆえに

$$
\int_{\gamma_L}P\,n_x\,ds
=
-\int_c^d P(\alpha(y),y)\,dy.
$$

従って

$$
\iint_E P_x\,dA
=
\int_{\partial E}P\,n_x\,ds.
$$

水平な補助境界では $n_x=0$ なので、この等式に余分な項は出ません。

同様の計算を、$y$-simple な部分領域

$$
E'=
\{(x,y):a<x<b,\ \gamma(x)<y<\delta(x)\}
$$

に対して行うと

$$
\iint_{E'}Q_y\,dA
=
\int_{\partial E'}Q\,n_y\,ds
$$

を得ます。ここでは一変数の基本定理を $y$ 方向へ使っており、下側境界の $n_y$ が負、上側境界の $n_y$ が正になることが符号を決めます。

$\Omega$ を有限個のこの種の部分領域へ分割して和を取ります。人工的に挿入した内部境界では、隣接する二領域の外向き法線が互いに逆なので

$$
F\cdot n + F\cdot(-n)=0
$$

となり、境界積分は相殺します。残るのは元の $\partial\Omega$ だけです。

最後に

$$
\operatorname{div}F=P_x+Q_y
$$

を用いて二つの等式を足せば

$$
\iint_\Omega\operatorname{div}F\,dA
=
\int_{\partial\Omega}
(Pn_x+Qn_y)\,ds
=
\int_{\partial\Omega}F\cdot n\,ds.
$$

これで示されました。
<!-- proof-end -->

この証明で使った解析的入力は、反復積分と一変数の微積分学の基本定理です。曲線境界では「法線ベクトル × 弧長」の組がグラフ微分を吸収するため、最終式には境界の傾きが露出しません。

---

## 4. Green の第一恒等式

$u,v$ を二回微分可能とします。積の微分から

$$
\operatorname{div}(u\nabla v)
=
\nabla u\cdot\nabla v
+
u\Delta v
$$

です。発散定理をこのベクトル場へ適用します。

<a id="thm-pde6-green-first"></a>
<!-- formal-statement-start -->
> **定理（Green の第一恒等式）**  
> $\Omega$ を前節の発散定理を適用できる有界連結領域とし、$u,v\in C^2(\Omega)\cap C^1(\overline\Omega)$ とする。このとき

$$
\boxed{
\iint_\Omega
\left(
\nabla u\cdot\nabla v
+
u\Delta v
\right)\,dA
=
\int_{\partial\Omega}
u\frac{\partial v}{\partial n}\,ds
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ベクトル場

$$
F=u\nabla v
$$

を取ります。$u,v$ の正則性から $F$ は領域内で $C^1$ であり、

$$
\operatorname{div}F
=
\nabla u\cdot\nabla v
+
u\Delta v.
$$

一方、境界上では

$$
F\cdot n
=
u\nabla v\cdot n
=
u\frac{\partial v}{\partial n}.
$$

したがって[平面版発散定理](#thm-pde6-divergence)を適用すると

$$
\iint_\Omega
\left(
\nabla u\cdot\nabla v
+
u\Delta v
\right)\,dA
=
\int_{\partial\Omega}
u\frac{\partial v}{\partial n}\,ds.
$$
<!-- proof-end -->

第一恒等式は「二階微分を一つ境界へ追い出す」公式です。後の弱形式ではさらに重要になりますが、本章ではまず古典解の一意性に使います。

---

## 5. 最大原理とは別の Dirichlet 一意性

<a id="cor-pde6-dirichlet-energy"></a>
<!-- formal-statement-start -->
> **系（Green の第一恒等式による Dirichlet 一意性）**  
> $\Omega$ を前節の仮定を満たす連結領域とする。$u_1,u_2\in C^2(\Omega)\cap C^1(\overline\Omega)$ が

$$
\Delta u_1=\Delta u_2=0
\quad\text{in }\Omega,
$$

$$
u_1=u_2
\quad\text{on }\partial\Omega
$$

> を満たすなら、$u_1=u_2$ が $\Omega$ 全体で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差

$$
w=u_1-u_2
$$

を取ると

$$
\Delta w=0
\quad\text{in }\Omega,
\qquad
w=0
\quad\text{on }\partial\Omega.
$$

Green の第一恒等式で $u=v=w$ とすると

$$
\iint_\Omega
\left(
|\nabla w|^2+w\Delta w
\right)\,dA
=
\int_{\partial\Omega}
w\frac{\partial w}{\partial n}\,ds.
$$

右辺は $w=0$ により 0、内部の $w\Delta w$ も $\Delta w=0$ により 0 です。従って

$$
\iint_\Omega|\nabla w|^2\,dA=0.
$$

$|\nabla w|^2$ は連続かつ非負なので、もし一点で正ならその近傍でも正となり積分が正になってしまいます。よって

$$
\nabla w=0
$$

が領域全体で成り立ちます。

$\Omega$ は連結なので $w$ は定数です。境界上で $w=0$ だからその定数は 0、従って $u_1=u_2$ です。
<!-- proof-end -->

PDE5 では[強最大原理](../PDE5/index.md#thm-pde5-maximum-principle)から同じ一意性を得ました。本節では

$$
\text{境界値0}
\Longrightarrow
\text{エネルギー }\int|\nabla w|^2=0
\Longrightarrow
w\equiv0
$$

という別の機構で同じ結論へ到達しています。

---

## 6. Green の第二恒等式

第一恒等式を $(u,v)$ と $(v,u)$ の二通りで書くと

$$
\iint_\Omega
\left(
\nabla u\cdot\nabla v+u\Delta v
\right)dA
=
\int_{\partial\Omega}u\partial_n v\,ds,
$$

$$
\iint_\Omega
\left(
\nabla v\cdot\nabla u+v\Delta u
\right)dA
=
\int_{\partial\Omega}v\partial_n u\,ds.
$$

内積項は同じなので差を取れば消えます。

<a id="thm-pde6-green-second"></a>
<!-- formal-statement-start -->
> **定理（Green の第二恒等式）**  
> $\Omega$、$u$、$v$ が Green の第一恒等式と同じ仮定を満たすなら

$$
\boxed{
\iint_\Omega
\left(
u\Delta v-v\Delta u
\right)\,dA
=
\int_{\partial\Omega}
\left(
u\frac{\partial v}{\partial n}
-
v\frac{\partial u}{\partial n}
\right)\,ds
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Green の第一恒等式](#thm-pde6-green-first)を $(u,v)$ に適用して

$$
\iint_\Omega
\left(
\nabla u\cdot\nabla v+u\Delta v
\right)\,dA
=
\int_{\partial\Omega}
u\frac{\partial v}{\partial n}\,ds.
$$

次に $(v,u)$ に適用して

$$
\iint_\Omega
\left(
\nabla v\cdot\nabla u+v\Delta u
\right)\,dA
=
\int_{\partial\Omega}
v\frac{\partial u}{\partial n}\,ds.
$$

二式を引きます。実内積の対称性から

$$
\nabla u\cdot\nabla v
=
\nabla v\cdot\nabla u
$$

なので勾配項は完全に消え、

$$
\iint_\Omega
(u\Delta v-v\Delta u)\,dA
=
\int_{\partial\Omega}
(u\partial_n v-v\partial_n u)\,ds.
$$
<!-- proof-end -->

第二恒等式は二つの関数の Laplacian を交換する公式です。ここへ「一点にだけ特異性を持つ関数」を入れると、その一点の値が境界積分と内部積分から取り出せます。

---

## 7. Neumann 問題の整合条件と定数不定性

PDE5 では長方形だけで Neumann 整合条件を直接計算しました。発散定理があれば領域一般へ一行で拡張できます。

<a id="cor-pde6-neumann"></a>
<!-- formal-statement-start -->
> **系（Neumann 問題の整合条件と定数を除く一意性）**  
> $\Omega$ を前節までの仮定を満たす連結領域とし、

$$
-\Delta u=f
\quad\text{in }\Omega,
\qquad
\frac{\partial u}{\partial n}=g
\quad\text{on }\partial\Omega
$$

> を満たす古典解 $u$ が存在するとする。このとき必要条件として

$$
\boxed{
\iint_\Omega f\,dA
+
\int_{\partial\Omega}g\,ds
=
0
}
$$

> が成り立つ。  
> また、同じ $f,g$ に対する二つの古典解が存在すれば、その差は定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $-\Delta u=f$ を積分すると

$$
\iint_\Omega f\,dA
=
-\iint_\Omega\Delta u\,dA.
$$

発散定理を $F=\nabla u$ に適用すれば

$$
\iint_\Omega\Delta u\,dA
=
\int_{\partial\Omega}
\nabla u\cdot n\,ds
=
\int_{\partial\Omega}
\frac{\partial u}{\partial n}\,ds
=
\int_{\partial\Omega}g\,ds.
$$

従って

$$
\iint_\Omega f\,dA
+
\int_{\partial\Omega}g\,ds
=
0.
$$

次に $u_1,u_2$ が同じ $f,g$ を持つ解とします。差

$$
w=u_1-u_2
$$

は

$$
\Delta w=0,
\qquad
\frac{\partial w}{\partial n}=0
$$

を満たします。

Green の第一恒等式で $u=v=w$ とすると

$$
\iint_\Omega|\nabla w|^2\,dA
=
\int_{\partial\Omega}
w\frac{\partial w}{\partial n}\,ds
-
\iint_\Omega w\Delta w\,dA
=
0.
$$

したがって $\nabla w=0$ で、連結性から $w$ は定数です。
<!-- proof-end -->

符号に注意してください。本章と PDE5 は Poisson 方程式を

$$
-\Delta u=f
$$

と書くので、Neumann データ $g=\partial_nu$ との整合条件は

$$
\int_\Omega f+\int_{\partial\Omega}g=0
$$

です。

---

## 8. 一点に集中した源を古典解の範囲で表す

Poisson 方程式の右辺が通常の関数ではなく「一点に集中した単位源」なら何が起こるでしょうか。

Encore III では Dirac のデルタを超関数として定義し

$$
-\Delta\Phi=\delta_0
$$

と書けるようにします。しかし本章では、その記法をまだ前提にしません。

代わりに、原点以外では調和的であり、原点を囲む円を通して総量1の flux が出入りすることを条件にします。

<a id="def-pde6-fundamental-solution"></a>
<!-- formal-statement-start -->
> **定義（二次元 $-\Delta$ の基本解）**  
> $\Phi\in C^2(\mathbb R^2\setminus\{0\})$ が二次元の $-\Delta$ の基本解であるとは、
>
> 1. 原点以外で

$$
\Delta\Phi=0
$$

> を満たし、
>
> 2. 任意の $r>0$ について、円 $\partial B_r(0)$ の外向き単位法線に対し

$$
-\int_{\partial B_r(0)}
\frac{\partial\Phi}{\partial n}\,ds
=
1
$$

> を満たすことをいう。
<!-- formal-statement-end -->

この第2条件が「原点を囲むと単位の源を検出する」という古典的な代用品です。

<!-- definition-example-start: def-pde6-fundamental-solution -->
**定義の確認**

$$
\boxed{
\Phi(z)
=
-\frac1{2\pi}\log|z|
}
$$

と置きます。$r=|z|$ とすれば

$$
\Phi(r)
=
-\frac1{2\pi}\log r,
$$

$$
\Phi'(r)
=
-\frac1{2\pi r},
\qquad
\Phi''(r)
=
\frac1{2\pi r^2}.
$$

二次元の動径関数の Laplacian は

$$
\Delta\Phi
=
\Phi''(r)+\frac1r\Phi'(r)
$$

なので、$r>0$ で

$$
\Delta\Phi
=
\frac1{2\pi r^2}
-
\frac1{2\pi r^2}
=
0.
$$

また $\partial B_r(0)$ では外向き法線が半径方向なので

$$
\frac{\partial\Phi}{\partial n}
=
-\frac1{2\pi r}.
$$

弧長要素は $ds=r\,d\theta$ だから

$$
-\int_{\partial B_r}
\frac{\partial\Phi}{\partial n}\,ds
=
-\int_0^{2\pi}
\left(-\frac1{2\pi r}\right)r\,d\theta
=
1.
$$

従ってこの対数関数は定義の二条件を実際に満たします。
<!-- definition-example-end -->

二次元で対数が現れるのは偶然ではありません。動径調和関数の方程式

$$
\phi''(r)+\frac1r\phi'(r)=0
$$

は

$$
(r\phi'(r))'=0
$$

なので

$$
\phi'(r)=\frac Cr,
\qquad
\phi(r)=C\log r+D
$$

となります。単位 flux 条件が $C=-1/(2\pi)$ を選びます。

---

## 9. 基本解を一点 $x$ へ移す

固定した $x\in\Omega$ に対し

$$
\Phi_x(y)
=
\Phi(x-y)
=
-\frac1{2\pi}\log|x-y|
$$

と置きます。

$y\ne x$ では $\Phi_x$ は調和関数です。特異点は $y=x$ にあります。

Green の第二恒等式へそのまま入れることはできません。$y=x$ で $C^2$ でないからです。そこで半径 $\varepsilon$ の小円板をくり抜いた

$$
\Omega_\varepsilon
=
\Omega\setminus\overline{B_\varepsilon(x)}
$$

上で恒等式を使い、最後に $\varepsilon\downarrow0$ とします。

ここが本章の核心計算です。

---

## 10. 基本解による Green 表現公式

<a id="thm-pde6-green-representation"></a>
<!-- formal-statement-start -->
> **定理（基本解による Green 表現公式）**  
> $\Omega$ を本章の発散定理を適用できる有界領域とし、$x\in\Omega$ とする。$u\in C^2(\Omega)\cap C^1(\overline\Omega)$ が

$$
-\Delta u=f
$$

> を満たし、$f$ は連続とする。  
> 二次元基本解

$$
\Phi(x-y)
=
-\frac1{2\pi}\log|x-y|
$$

> を用いると

$$
\boxed{
u(x)
=
\iint_\Omega
\Phi(x-y)f(y)\,dA_y
+
\int_{\partial\Omega}
\left[
\Phi(x-y)\frac{\partial u}{\partial n_y}(y)
-
u(y)\frac{\partial\Phi(x-y)}{\partial n_y}
\right]ds_y
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\Omega_\varepsilon=\Omega\setminus\overline{B_\varepsilon(x)}$ 上で $v(y)=\Phi(x-y)$ として Green の第二恒等式を使います。外側境界 $\partial\Omega$ に加え、小円 $\partial B_\varepsilon(x)$ が新しい境界として現れます。

重要なのは、小円に対する $\Omega_\varepsilon$ の外向き法線は **穴の中心 $x$ の方を向く**ことです。その向きが

$$
\int_{\partial B_\varepsilon(x)}
u\,\partial_n\Phi\,ds
\longrightarrow
u(x)
$$

を作ります。

<!-- proof-start -->
### 証明

$x\in\Omega$ なので、十分小さい $\varepsilon>0$ では

$$
\overline{B_\varepsilon(x)}
\subset\Omega.
$$

$\Omega_\varepsilon$ 上では $\Phi_x(y)=\Phi(x-y)$ は $C^2$ で

$$
\Delta_y\Phi_x=0.
$$

[Green の第二恒等式](#thm-pde6-green-second)を $u$ と $\Phi_x$ に適用すると

$$
\iint_{\Omega_\varepsilon}
\left(
u\Delta\Phi_x
-
\Phi_x\Delta u
\right)dA
=
\int_{\partial\Omega_\varepsilon}
\left(
u\partial_n\Phi_x
-
\Phi_x\partial_nu
\right)ds.
$$

$\Delta\Phi_x=0$、$\Delta u=-f$ なので左辺は

$$
\iint_{\Omega_\varepsilon}
\Phi_x f\,dA.
$$

境界は外側の $\partial\Omega$ と内側の $\partial B_\varepsilon(x)$ に分かれます。従って

$$
\iint_{\Omega_\varepsilon}\Phi_x f\,dA
=
I_{\partial\Omega}
+
I_\varepsilon,
$$

ここで

$$
I_{\partial\Omega}
=
\int_{\partial\Omega}
\left(
u\partial_n\Phi_x
-
\Phi_x\partial_nu
\right)ds
$$

です。

小円では $y=x+\varepsilon e_r$ と書きます。$\Omega_\varepsilon$ の外向き法線は穴の中へ向くので

$$
n=-e_r.
$$

$\Phi_x=-(1/2\pi)\log\varepsilon$ であり、中心から外へ向く $e_r$ 方向の微分は

$$
\partial_{e_r}\Phi_x
=
-\frac1{2\pi\varepsilon}.
$$

したがって穴側の法線では

$$
\partial_n\Phi_x
=
\frac1{2\pi\varepsilon}.
$$

弧長 $ds=\varepsilon\,d\theta$ を使うと

$$
\int_{\partial B_\varepsilon(x)}
u\,\partial_n\Phi_x\,ds
=
\frac1{2\pi}
\int_0^{2\pi}
u(x+\varepsilon e_r(\theta))\,d\theta.
$$

$u$ の連続性により、$\varepsilon\downarrow0$ で一様に $u(x+\varepsilon e_r(\theta))\to u(x)$ だから

$$
\int_{\partial B_\varepsilon(x)}
u\,\partial_n\Phi_x\,ds
\longrightarrow
u(x).
$$

一方 $\nabla u$ は $x$ の近くで有界です。ある $M>0$ が存在して

$$
|\partial_nu|\le M
$$

とできます。従って

$$
\left|
\int_{\partial B_\varepsilon(x)}
\Phi_x\partial_nu\,ds
\right|
\le
\frac{|\log\varepsilon|}{2\pi}
M(2\pi\varepsilon)
=
M\varepsilon|\log\varepsilon|
\longrightarrow0.
$$

よって

$$
I_\varepsilon\longrightarrow u(x).
$$

また $\Phi_x f$ は対数特異性しか持たず、極座標で

$$
\int_0^\varepsilon r|\log r|\,dr
\longrightarrow0
$$

なので

$$
\iint_{\Omega_\varepsilon}\Phi_x f\,dA
\longrightarrow
\iint_\Omega\Phi_x f\,dA.
$$

極限を取ると

$$
\iint_\Omega\Phi_x f\,dA
=
I_{\partial\Omega}+u(x).
$$

従って

$$
u(x)
=
\iint_\Omega\Phi_x f\,dA
-
I_{\partial\Omega}.
$$

$I_{\partial\Omega}$ の符号を展開すれば

$$
u(x)
=
\iint_\Omega
\Phi(x-y)f(y)\,dA_y
+
\int_{\partial\Omega}
\left[
\Phi(x-y)\partial_nu
-
u\,\partial_n\Phi(x-y)
\right]ds_y.
$$
<!-- proof-end -->

この公式は、解 $u$ の一点値が

- 内部の源 $f$
- 境界上の値 $u$
- 境界上の法線微分 $\partial_nu$

で決まることを示します。

ただし Dirichlet 問題では $u$ は境界で既知でも $\partial_nu$ は未知です。そこで「未知の法線微分の係数を境界上で0にする」補正を基本解へ施します。それが Green 関数です。

---

## 11. 境界条件を基本解へ埋め込む

<a id="def-pde6-green-function"></a>
<!-- formal-statement-start -->
> **定義（Dirichlet Green 関数）**  
> $\Omega\subset\mathbb R^2$ を有界領域とし、二次元基本解を $\Phi$ とする。  
> $G:\Omega\times\Omega\to\mathbb R$ が Dirichlet Green 関数であるとは、各固定 $x\in\Omega$ に対し $y\mapsto G(x,y)$ が
>
> 1. $y\ne x$ で調和的、
> 2. $y=x$ の近くで

$$
G(x,y)-\Phi(x-y)
$$

> が調和的に延長でき、
> 3. 境界上で

$$
G(x,y)=0
\qquad
(y\in\partial\Omega)
$$

> を満たすことをいう。
<!-- formal-statement-end -->

つまり

$$
G(x,y)
=
\Phi(x-y)
-
H_x(y)
$$

と書き、$H_x$ を $y$ について調和関数に選んで、境界で基本解の値をちょうど打ち消します。

<!-- definition-example-start: def-pde6-green-function -->
**定義の確認**

単位円板 $D$ の中心 $x=0$ では

$$
G(0,y)
=
-\frac1{2\pi}\log|y|
$$

そのものが Green 関数です。

実際、$y\ne0$ では調和的で、基本解との差は 0 です。さらに $|y|=1$ では

$$
G(0,y)
=
-\frac1{2\pi}\log1
=
0.
$$

中心では境界補正が不要です。
<!-- definition-example-end -->

---

## 12. 単位円板の Green 関数を明示する

単位円板

$$
D=\{y\in\mathbb R^2:|y|<1\}
$$

を考えます。

固定した $x\in D$ に対し

$$
A_x(y)
=
1-2x\cdot y+|x|^2|y|^2
$$

と置きます。

<a id="prop-pde6-disk-green"></a>
<!-- formal-statement-start -->
> **命題（単位円板の Dirichlet Green 関数）**  
> $x,y\in D$、$x\ne y$ に対し

$$
\boxed{
G_D(x,y)
=
\frac1{4\pi}
\log
\frac{
1-2x\cdot y+|x|^2|y|^2
}{
|x-y|^2
}
}
$$

> と定める。この $G_D$ は単位円板の Dirichlet Green 関数である。$x=0$ では

$$
G_D(0,y)
=
-\frac1{2\pi}\log|y|
$$

> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
\Phi(x-y)
=
-\frac1{2\pi}\log|x-y|
=
-\frac1{4\pi}\log|x-y|^2.
$$

従って

$$
G_D(x,y)
=
\Phi(x-y)
+
\frac1{4\pi}\log A_x(y).
$$

$x=0$ なら $A_0(y)=1$ なので補正項は 0 です。

以下 $x\ne0$ とします。反転点

$$
x^*
=
\frac{x}{|x|^2}
$$

を置くと $|x^*|>1$ なので、$x^*$ は閉単位円板の外にあります。

直接計算すると

$$
|x|^2|y-x^*|^2
=
|x|^2|y|^2
-
2x\cdot y
+
1
=
A_x(y).
$$

従って

$$
\log A_x(y)
=
2\log|x|
+
2\log|y-x^*|.
$$

$x^*$ は円板の外にあるので、$y\mapsto\log|y-x^*|$ は $D$ 全体で調和的です。実際、中心を $x^*$ に移した極座標では

$$
\frac{d^2}{dr^2}\log r
+
\frac1r\frac d{dr}\log r
=
-\frac1{r^2}
+
\frac1{r^2}
=
0.
$$

したがって補正項

$$
\frac1{4\pi}\log A_x(y)
$$

は $D$ で調和的です。よって $G_D-\Phi(x-\cdot)$ は調和的で、基本解と同じ特異性を持ちます。

最後に $|y|=1$ では

$$
A_x(y)
=
1-2x\cdot y+|x|^2
=
|x-y|^2.
$$

したがって

$$
G_D(x,y)
=
\frac1{4\pi}\log1
=
0.
$$

三条件が全て確認できたので、$G_D$ は Dirichlet Green 関数です。
<!-- proof-end -->

この明示式は「特異点 $x$ の外側に鏡像点 $x^*$ を置いて境界値を打ち消す」という像法の形になっています。

---

## 13. Green 関数なら Dirichlet データだけで表せる

基本解の表現公式で問題だったのは

$$
\Phi(x-y)\partial_nu
$$

という未知の Neumann データでした。

Green 関数では境界上で

$$
G(x,y)=0
$$

なので、この項が消えます。

<a id="thm-pde6-green-poisson"></a>
<!-- formal-statement-start -->
> **定理（Dirichlet Green 関数による Poisson 表現）**  
> $\Omega$ に Dirichlet Green 関数 $G$ が存在するとする。$u\in C^2(\Omega)\cap C^1(\overline\Omega)$ が

$$
-\Delta u=f
\quad\text{in }\Omega,
\qquad
u=g
\quad\text{on }\partial\Omega
$$

> を満たすなら、各 $x\in\Omega$ で

$$
\boxed{
u(x)
=
\iint_\Omega
G(x,y)f(y)\,dA_y
-
\int_{\partial\Omega}
g(y)
\frac{\partial G}{\partial n_y}(x,y)\,ds_y
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[基本解による Green 表現公式](#thm-pde6-green-representation)の証明と同じく、$x$ のまわりの小円を除いた領域へ Green の第二恒等式を適用します。

$G(x,\cdot)$ は $x$ 以外で調和的であり、$x$ の近くでは

$$
G(x,y)
=
\Phi(x-y)
+
h_x(y)
$$

と書けます。ここで $h_x$ は $x$ 近くで調和的かつ $C^1$ です。

小円上の特異寄与は $\Phi$ の部分だけが残り、$h_x$ の境界積分は円周長 $O(\varepsilon)$ に対して被積分関数が有界なので 0 へ収束します。従って基本解の場合と同じ極限から

$$
u(x)
=
\iint_\Omega
G(x,y)f(y)\,dA_y
+
\int_{\partial\Omega}
\left[
G(x,y)\partial_nu(y)
-
u(y)\partial_{n_y}G(x,y)
\right]ds_y.
$$

Dirichlet Green 関数は境界上で

$$
G(x,y)=0
$$

なので、未知の $\partial_nu$ を掛ける第一境界項は消えます。

さらに $u=g$ on $\partial\Omega$ だから

$$
u(x)
=
\iint_\Omega
G(x,y)f(y)\,dA_y
-
\int_{\partial\Omega}
g(y)\partial_{n_y}G(x,y)\,ds_y.
$$
<!-- proof-end -->

これで Dirichlet 問題の既知データ

$$
f,\qquad g
$$

だけから $u(x)$ が表されました。

---

## 14. Green 関数から Poisson kernel を定義する

<a id="def-pde6-poisson-kernel"></a>
<!-- formal-statement-start -->
> **定義（Green 関数から得る Poisson kernel）**  
> Dirichlet Green 関数 $G$ が存在する領域 $\Omega$ で、$x\in\Omega$、$y\in\partial\Omega$ に対し

$$
\boxed{
P_\Omega(x,y)
=
-
\frac{\partial G}{\partial n_y}(x,y)
}
$$

> と定める。この境界核を Green 関数から得る Poisson kernel と呼ぶ。
<!-- formal-statement-end -->

この定義なら、調和関数 $u$、すなわち $f=0$ の Dirichlet 問題は

$$
u(x)
=
\int_{\partial\Omega}
P_\Omega(x,y)g(y)\,ds_y
$$

と書けます。

<!-- definition-example-start: def-pde6-poisson-kernel -->
**定義の確認**

単位円板の中心 $x=0$ では

$$
G_D(0,y)
=
-\frac1{2\pi}\log|y|.
$$

境界 $|y|=1$ の外向き方向は半径方向なので

$$
\frac{\partial G_D}{\partial n_y}(0,y)
=
-\frac1{2\pi}.
$$

従って

$$
P_D(0,y)
=
\frac1{2\pi}.
$$

境界全体の弧長は $2\pi$ なので

$$
\int_{\partial D}P_D(0,y)\,ds_y
=
1.
$$

中心値が境界値の単純平均になる PDE5 の平均値性質と一致します。
<!-- definition-example-end -->

---

## 15. 単位円板では PDE5 の Poisson kernel がそのまま戻る

<a id="prop-pde6-disk-poisson"></a>
<!-- formal-statement-start -->
> **命題（単位円板の Poisson kernel）**  
> $D=\{y:|y|<1\}$ とし、$x\in D$、$\xi\in\partial D$ とする。このとき単位円板の Green 関数から得る Poisson kernel は

$$
\boxed{
P_D(x,\xi)
=
\frac{1-|x|^2}
{2\pi|x-\xi|^2}
}
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した境界点 $\xi$ に向かう半径上で

$$
y=r\xi,
\qquad
0<r\le1
$$

と置きます。$|\xi|=1$ です。

単位円板 Green 関数の分子・分母を

$$
A(r)
=
1-2r\,x\cdot\xi+r^2|x|^2,
$$

$$
B(r)
=
|x-r\xi|^2
=
|x|^2-2r\,x\cdot\xi+r^2
$$

と書けば

$$
G_D(x,r\xi)
=
\frac1{4\pi}
\left(
\log A(r)-\log B(r)
\right).
$$

境界での外向き法線微分は $r$ 微分を $r=1$ で評価したものです。

まず

$$
A'(r)
=
-2x\cdot\xi+2r|x|^2,
$$

$$
B'(r)
=
-2x\cdot\xi+2r.
$$

$r=1$ では

$$
A(1)=B(1)=|x-\xi|^2.
$$

したがって

$$
\begin{aligned}
\frac{\partial G_D}{\partial n_y}(x,\xi)
&=
\frac1{4\pi}
\left[
\frac{A'(1)}{A(1)}
-
\frac{B'(1)}{B(1)}
\right]\\
&=
\frac1{4\pi}
\frac{
2|x|^2-2
}{
|x-\xi|^2
}\\
&=
-\frac{1-|x|^2}
{2\pi|x-\xi|^2}.
\end{aligned}
$$

定義により

$$
P_D(x,\xi)
=
-
\partial_{n_y}G_D(x,\xi),
$$

よって

$$
P_D(x,\xi)
=
\frac{1-|x|^2}
{2\pi|x-\xi|^2}.
$$
<!-- proof-end -->

ここで

$$
x=r(\cos\theta,\sin\theta),
\qquad
\xi=(\cos\phi,\sin\phi)
$$

と書けば

$$
|x-\xi|^2
=
1-2r\cos(\theta-\phi)+r^2.
$$

従って

$$
P_D(x,\xi)
=
\frac1{2\pi}
\frac{1-r^2}
{1-2r\cos(\theta-\phi)+r^2}.
$$

これは [PDE5 で Fourier 級数から導いた Poisson kernel](../PDE5/index.md#def-pde5-poisson-kernel) と完全に一致します。

同じ核へ

$$
\text{Fourier モードの総和}
$$

から到達しても、

$$
\text{Green 関数の境界法線微分}
$$

から到達してもよいわけです。

---

## 16. 一意性・表現・境界条件が一つの構造へまとまる

PDE5 までの楕円型理論を Green の視点で整理すると、次のようになります。

### Dirichlet 一意性

$$
w|_{\partial\Omega}=0,
\qquad
\Delta w=0
$$

に第一恒等式を使うと

$$
\int_\Omega|\nabla w|^2=0.
$$

### Neumann 整合条件

$$
-\Delta u=f,
\qquad
\partial_nu=g
$$

を積分すると

$$
\int_\Omega f+\int_{\partial\Omega}g=0.
$$

### 表現公式

基本解の特異性を Green の第二恒等式へ入れると

$$
u(x)
=
\text{内部源の積分}
+
\text{境界積分}.
$$

### Dirichlet Green 関数

境界上で $G=0$ とすることで、未知の $\partial_nu$ が消え

$$
u(x)
=
\int_\Omega Gf
+
\int_{\partial\Omega}P_\Omega g.
$$

となります。

ここでは「解をどう計算するか」と「なぜ一意か」が別々の技法ではありません。どちらも発散定理で微分を境界へ移す構造から生じています。

---

# 演習

## PDE6-A01 長方形で発散定理を直接確認する

- Level: A
- 目安時間: 12分

単位正方形

$$
R=[0,1]\times[0,1]
$$

とベクトル場

$$
F(x,y)=(x^2,xy)
$$

について、

1. $\iint_R\operatorname{div}F\,dA$
2. $\int_{\partial R}F\cdot n\,ds$

を別々に計算し、一致を確認せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\operatorname{div}F
=
\frac{\partial}{\partial x}(x^2)
+
\frac{\partial}{\partial y}(xy)
=
2x+x
=
3x.
$$

従って

$$
\iint_R\operatorname{div}F\,dA
=
\int_0^1\int_0^1 3x\,dy\,dx
=
\int_0^1 3x\,dx
=
\frac32.
$$

次に四辺を調べます。

左辺 $x=0$ では

$$
n=(-1,0),
\qquad
F=(0,0),
$$

なので寄与は 0 です。

右辺 $x=1$ では

$$
n=(1,0),
\qquad
F=(1,y),
$$

だから

$$
F\cdot n=1.
$$

従って寄与は

$$
\int_0^1 1\,dy=1.
$$

下辺 $y=0$ では

$$
n=(0,-1),
\qquad
F=(x^2,0),
$$

なので寄与は 0 です。

上辺 $y=1$ では

$$
n=(0,1),
\qquad
F=(x^2,x),
$$

だから

$$
F\cdot n=x.
$$

寄与は

$$
\int_0^1x\,dx=\frac12.
$$

全境界を足すと

$$
1+\frac12
=
\frac32.
$$

従って

$$
\iint_R\operatorname{div}F\,dA
=
\int_{\partial R}F\cdot n\,ds
=
\frac32
$$

が直接確認できました。
<!-- solution-end -->

## PDE6-A02 Green の第一恒等式を単位正方形で確認する

- Level: A
- 目安時間: 15分

単位正方形 $R=[0,1]^2$ で

$$
u(x,y)=x,
\qquad
v(x,y)=x^2+y^2
$$

とする。

Green の第一恒等式

$$
\iint_R
(\nabla u\cdot\nabla v+u\Delta v)\,dA
=
\int_{\partial R}u\partial_nv\,ds
$$

の左右を直接計算せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\nabla u=(1,0),
$$

$$
\nabla v=(2x,2y),
$$

なので

$$
\nabla u\cdot\nabla v=2x.
$$

また

$$
\Delta v
=
v_{xx}+v_{yy}
=
2+2
=
4.
$$

従って左辺の被積分関数は

$$
2x+4x=6x.
$$

よって

$$
\iint_R6x\,dA
=
\int_0^1\int_0^16x\,dy\,dx
=
\int_0^16x\,dx
=
3.
$$

次に境界項を計算します。

左辺 $x=0$ では $u=0$ なので寄与は0です。

右辺 $x=1$ では $n=(1,0)$ だから

$$
\partial_nv
=
\nabla v\cdot n
=
2.
$$

また $u=1$ なので寄与は

$$
\int_0^1 2\,dy=2.
$$

下辺 $y=0$ では $n=(0,-1)$ ですが $\nabla v=(2x,0)$ なので $\partial_nv=0$ です。

上辺 $y=1$ では $n=(0,1)$ だから

$$
\partial_nv=2.
$$

ここで $u=x$ なので寄与は

$$
\int_0^1 2x\,dx=1.
$$

合計は

$$
2+1=3.
$$

従って左右は確かに一致します。
<!-- solution-end -->

## PDE6-A03 二次元基本解を自力で再構成する

- Level: A
- 目安時間: 15分

動径関数 $\Phi(r)$ が $r>0$ で調和的であるとする。

1. 方程式

$$
\Phi''+\frac1r\Phi'=0
$$

から $\Phi(r)=A\log r+B$ を導け。
2. 条件

$$
-\int_{\partial B_r}\partial_n\Phi\,ds=1
$$

から $A$ を決定せよ。

<!-- solution-start -->
### 詳細解答

1. 方程式に $r$ を掛けると

$$
r\Phi''+\Phi'=0.
$$

左辺は積の微分で

$$
(r\Phi')'
$$

なので

$$
(r\Phi')'=0.
$$

従ってある定数 $A$ が存在して

$$
r\Phi'=A.
$$

つまり

$$
\Phi'=\frac Ar.
$$

積分すると

$$
\Phi(r)=A\log r+B.
$$

2. 円 $\partial B_r$ では外向き法線は半径方向だから

$$
\partial_n\Phi
=
\Phi'(r)
=
\frac Ar.
$$

また $ds=r\,d\theta$ なので

$$
\int_{\partial B_r}\partial_n\Phi\,ds
=
\int_0^{2\pi}\frac Ar\,r\,d\theta
=
2\pi A.
$$

単位 flux 条件から

$$
-2\pi A=1,
$$

従って

$$
A=-\frac1{2\pi}.
$$

加法定数 $B$ は Laplacian と flux を変えません。標準的に $B=0$ を選べば

$$
\Phi(r)
=
-\frac1{2\pi}\log r
$$

です。
<!-- solution-end -->

## PDE6-A04 Neumann 整合条件から境界値を決める

- Level: A
- 目安時間: 12分

単位円板 $D$ で

$$
-\Delta u=1
$$

とし、境界で一定の Neumann データ

$$
\partial_nu=c
$$

を課す。

1. 整合条件から $c$ を求めよ。
2. 実際にその $c$ を持つ一つの解を構成せよ。

<!-- solution-start -->
### 詳細解答

1. 本章の符号規約では整合条件は

$$
\iint_D f\,dA
+
\int_{\partial D}g\,ds
=
0.
$$

ここで $f=1$、$g=c$ です。

単位円板の面積は $\pi$、境界長は $2\pi$ なので

$$
\pi+2\pi c=0.
$$

従って

$$
c=-\frac12.
$$

2. 動径二次関数

$$
u(x,y)
=
-\frac{x^2+y^2}{4}
$$

を試します。

$$
\Delta(x^2+y^2)=4
$$

だから

$$
-\Delta u
=
-\left(-\frac14\right)4
=
1.
$$

また境界 $r=1$ で

$$
\partial_nu
=
\frac{\partial}{\partial r}
\left(-\frac{r^2}{4}\right)_{r=1}
=
-\frac12.
$$

したがって要求された Neumann データを満たします。

なお $u+C$ も全て同じ問題の解です。これは Neumann 問題の定数不定性です。
<!-- solution-end -->

## PDE6-B01 Green の第一恒等式だけで Dirichlet 一意性を証明する

- Level: B
- 目安時間: 18分

$\Omega$ を本章の仮定を満たす連結領域とし、

$$
\Delta u=0
\quad\text{in }\Omega,
\qquad
u=0
\quad\text{on }\partial\Omega
$$

とする。

最大原理を使わず、Green の第一恒等式だけから $u\equiv0$ を証明せよ。

<!-- solution-start -->
### 詳細解答

Green の第一恒等式で $u=v$ と置くと

$$
\iint_\Omega
\left(
|\nabla u|^2+u\Delta u
\right)\,dA
=
\int_{\partial\Omega}
u\partial_nu\,ds.
$$

仮定から

$$
\Delta u=0
$$

なので内部の第2項は0です。

また境界上で

$$
u=0
$$

だから右辺も0です。

従って

$$
\iint_\Omega|\nabla u|^2\,dA=0.
$$

$|\nabla u|^2$ は連続な非負関数です。もしある点 $x_0$ で

$$
|\nabla u(x_0)|^2>0
$$

なら、連続性により $x_0$ の小近傍で正の下界を持ち、積分は正になります。これは矛盾です。

したがって

$$
\nabla u=0
$$

が $\Omega$ 全体で成り立ちます。

連結領域上で勾配が0なら $u$ は定数です。境界値が0なのでその定数も0です。

従って

$$
u\equiv0.
$$

この証明では最大原理ではなく、Dirichlet エネルギー

$$
\int_\Omega|\nabla u|^2
$$

が0になることが一意性の機構です。
<!-- solution-end -->

## PDE6-B02 中心で Green 表現公式を直接検算する

- Level: B
- 目安時間: 20分

単位円板 $D$ で

$$
u(y)=1-|y|^2
$$

とする。

1. $-\Delta u=4$ と $u|_{\partial D}=0$ を確認せよ。
2. 中心用 Green 関数

$$
G_D(0,y)
=
-\frac1{2\pi}\log|y|
$$

を使い、

$$
u(0)
=
\iint_D G_D(0,y)\,4\,dA_y
$$

を直接計算して確認せよ。

<!-- solution-start -->
### 詳細解答

1. $y=(y_1,y_2)$ と書くと

$$
u=1-y_1^2-y_2^2.
$$

従って

$$
u_{y_1y_1}=-2,
\qquad
u_{y_2y_2}=-2.
$$

よって

$$
\Delta u=-4,
$$

したがって

$$
-\Delta u=4.
$$

また $|y|=1$ では

$$
u=1-1=0.
$$

2. 極座標 $y=(r\cos\theta,r\sin\theta)$、$dA=r\,dr\,d\theta$ を使います。

$$
\begin{aligned}
\iint_D G_D(0,y)\,4\,dA
&=
4
\int_0^{2\pi}
\int_0^1
\left(
-\frac1{2\pi}\log r
\right)
r\,dr\,d\theta\\
&=
-4
\int_0^1 r\log r\,dr.
\end{aligned}
$$

部分積分または直接積分から

$$
\int r\log r\,dr
=
\frac{r^2}{2}\log r
-
\frac{r^2}{4}.
$$

$r\downarrow0$ で $r^2\log r\to0$ なので

$$
\int_0^1r\log r\,dr
=
-\frac14.
$$

従って

$$
-4\left(-\frac14\right)=1.
$$

一方

$$
u(0)=1.
$$

よって Green 表現公式を中心で直接確認できました。
<!-- solution-end -->

## PDE6-B03 円板 Green 関数から Poisson kernel を導く

- Level: B
- 目安時間: 22分

単位円板で

$$
G_D(x,y)
=
\frac1{4\pi}
\log
\frac{
1-2x\cdot y+|x|^2|y|^2
}{
|x-y|^2
}
$$

とする。境界点 $\xi\in\partial D$ で

$$
-\partial_{n_\xi}G_D(x,\xi)
=
\frac{1-|x|^2}{2\pi|x-\xi|^2}
$$

を途中式を省略せず導け。

<!-- solution-start -->
### 詳細解答

境界の外向き法線は半径方向なので

$$
y=r\xi,
\qquad
r\uparrow1
$$

として $r$ で微分します。

分子を

$$
A(r)
=
1-2r\,x\cdot\xi+r^2|x|^2,
$$

分母を

$$
B(r)
=
|x-r\xi|^2
=
|x|^2-2r\,x\cdot\xi+r^2
$$

と置きます。

すると

$$
G_D(x,r\xi)
=
\frac1{4\pi}
\left(
\log A(r)-\log B(r)
\right).
$$

微分すると

$$
A'(r)
=
-2x\cdot\xi+2r|x|^2,
$$

$$
B'(r)
=
-2x\cdot\xi+2r.
$$

したがって

$$
\frac d{dr}G_D(x,r\xi)
=
\frac1{4\pi}
\left(
\frac{A'(r)}{A(r)}
-
\frac{B'(r)}{B(r)}
\right).
$$

$r=1$ では $|\xi|=1$ だから

$$
A(1)
=
1-2x\cdot\xi+|x|^2
=
|x-\xi|^2,
$$

$$
B(1)
=
|x|^2-2x\cdot\xi+1
=
|x-\xi|^2.
$$

従って

$$
\begin{aligned}
\partial_{n_\xi}G_D(x,\xi)
&=
\frac1{4\pi}
\frac{
(-2x\cdot\xi+2|x|^2)
-
(-2x\cdot\xi+2)
}{
|x-\xi|^2
}\\
&=
\frac{|x|^2-1}
{2\pi|x-\xi|^2}.
\end{aligned}
$$

ゆえに

$$
-\partial_{n_\xi}G_D(x,\xi)
=
\frac{1-|x|^2}
{2\pi|x-\xi|^2}.
$$

これが単位円板の Poisson kernel です。
<!-- solution-end -->

## PDE6-C01 内部源と境界データを同時に持つ円板問題

- Level: C
- 目安時間: 35分

単位円板

$$
D=\{(r,\theta):0\le r<1\}
$$

で

$$
-\Delta u=4
$$

を満たし、境界で

$$
u(1,\theta)=\cos2\theta
$$

とする。

1. 内部源 $4$ を受け持ち、境界値0を持つ特解 $u_p$ を構成せよ。
2. 境界データ $\cos2\theta$ を受け持つ調和補正 $h$ を構成せよ。
3. $u=u_p+h$ が問題を満たすことを直接確認せよ。
4. Green の第一恒等式による Dirichlet 一意性を使って、この解が唯一であることを示せ。
5. Green 関数表示の二つの項が、それぞれ $u_p$ と $h$ に対応することを説明せよ。

<!-- solution-start -->
### 詳細解答

1. $r^2=x^2+y^2$ に対し

$$
\Delta r^2=4
$$

です。

従って

$$
u_p(r)
=
1-r^2
$$

と置けば

$$
\Delta u_p=-4,
$$

よって

$$
-\Delta u_p=4.
$$

また $r=1$ で

$$
u_p(1)=0.
$$

したがって内部源を受け持ち、境界では0になる特解です。

2. PDE5 で扱った円板の Fourier モードから

$$
h(r,\theta)
=
r^2\cos2\theta
$$

は調和関数です。

実際、極座標 Laplacian

$$
\Delta
=
\partial_{rr}
+
\frac1r\partial_r
+
\frac1{r^2}\partial_{\theta\theta}
$$

を使うと

$$
h_r=2r\cos2\theta,
$$

$$
h_{rr}=2\cos2\theta,
$$

$$
h_{\theta\theta}
=
-4r^2\cos2\theta.
$$

従って

$$
\Delta h
=
2\cos2\theta
+
2\cos2\theta
-
4\cos2\theta
=
0.
$$

また境界で

$$
h(1,\theta)=\cos2\theta.
$$

3. 従って

$$
\boxed{
u(r,\theta)
=
1-r^2+r^2\cos2\theta
}
$$

と置けば

$$
-\Delta u
=
-\Delta u_p-\Delta h
=
4-0
=
4.
$$

境界 $r=1$ では

$$
u(1,\theta)
=
1-1+\cos2\theta
=
\cos2\theta.
$$

よって PDE と境界条件の両方を満たします。

4. $u_1,u_2$ が二つの解なら差

$$
w=u_1-u_2
$$

は

$$
\Delta w=0
$$

かつ

$$
w|_{\partial D}=0
$$

を満たします。

Green の第一恒等式から

$$
\iint_D|\nabla w|^2\,dA=0.
$$

従って $\nabla w=0$、連結性から $w$ は定数です。境界で0なので

$$
w=0.
$$

したがって解は唯一です。

5. Dirichlet Green 関数による表現は

$$
u(x)
=
\iint_DG_D(x,y)\,4\,dA_y
+
\int_{\partial D}
P_D(x,\xi)\cos2\phi\,ds_\xi.
$$

第一項は境界値0で内部源 $4$ を受け持つ解です。一意性から、それは先ほど構成した

$$
u_p(x)=1-|x|^2
$$

に等しくなります。

第二項は内部で調和的で、境界データ $\cos2\theta$ を受け持つ Poisson 積分です。PDE5 の単一 Fourier モードの結果から

$$
h(r,\theta)=r^2\cos2\theta.
$$

従って Green 表現の「内部源の項 + 境界データの項」は

$$
(1-r^2)+(r^2\cos2\theta)
$$

となり、直接構成した解と一致します。

この問題では

$$
\text{Poisson 方程式の特解 + 調和補正}
$$

という PDE5 の見方と

$$
\text{Green 関数の内部積分 + Poisson 境界積分}
$$

という PDE6 の見方が同じ分解を表しています。
<!-- solution-end -->

---

## 17. 章末チェック

- 外向き単位法線と法線微分を円・長方形で計算できる。
- 発散定理を反復積分と一変数の微積分学の基本定理から追える。
- Green の第一恒等式を $\operatorname{div}(u\nabla v)$ から導ける。
- Green の第二恒等式を第一恒等式の差として導ける。
- Dirichlet 一意性を最大原理ではなくエネルギーから証明できる。
- Neumann 問題の整合条件の符号を $-\Delta u=f$ の規約から導ける。
- 二次元基本解 $-(2\pi)^{-1}\log|x|$ の調和性と単位 flux を確認できる。
- Green 表現公式で小円の法線向きと $u(x)$ の出現を説明できる。
- Dirichlet Green 関数が「基本解 - 調和補正」であることを説明できる。
- 単位円板の Green 関数を境界条件まで検証できる。
- $-\partial_{n_y}G$ から Poisson kernel を導ける。
- PDE5 の Fourier 由来の Poisson kernel と PDE6 の Green 関数由来の核が一致することを示せる。

次の PDE7 では、Fourier 法・固有関数法・Green 表現を同じ線形作用素の解法として整理します。
