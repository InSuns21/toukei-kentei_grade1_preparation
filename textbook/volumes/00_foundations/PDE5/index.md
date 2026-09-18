# PDE5 Laplace・Poisson 方程式：平均値性質・最大原理・境界値問題

PDE3 では放物型の代表として熱方程式、PDE4 では双曲型の代表として波動方程式を調べました。本章では、時間発展を持たず、境界から内部の平衡状態を決める **楕円型** の代表へ進みます。代表方程式の名前と符号規約は最初の定義で固定します。

この章の中心問いは次の三つです。

- この楕円型方程式の解は、なぜ「中心の値が周囲の平均で決まる」のか。
- その平均値性質から、なぜ最大原理と Dirichlet 問題の一意性が出るのか。
- 長方形では Fourier 正弦級数、円板では境界積分核が、境界データを内部へどう運ぶのか。

直接の前提は [PDE4 波動方程式](../PDE4/index.md) です。PDE4 までで導入した PDE の型、境界値問題、Fourier 級数、変数分離、Sturm--Liouville の基本結果を再利用します。

> **証明境界**  
> 本章は二次元の古典解を中心に、平均値性質、最大原理、Dirichlet 一意性、長方形の変数分離、単位円板の境界積分表示を複素解析なしで閉じます。Green の第一・第二恒等式、基本解、Green 関数は PDE6 へ送ります。弱微分、Sobolev 空間、Lax--Milgram、一般楕円型方程式の弱解は Encore III の正本で扱い、本章へ逆輸入しません。

---

## 1. 平衡を表す方程式と、源を持つ方程式

二変数関数 $u=u(x,y)$ に対し、Laplacian を

$$
\Delta u:=u_{xx}+u_{yy}
$$

と書きます。

<a id="def-pde5-laplace-poisson"></a>
<!-- formal-statement-start -->
> **定義（Laplace 方程式と Poisson 方程式）**  
> 領域 $\Omega\subset\mathbb R^2$ 上で

$$
\Delta u=0
$$

> を **Laplace 方程式**という。本章では符号を固定して

$$
-\Delta u=f
$$

> を **Poisson 方程式**という。$f$ は領域内部の源・外力に対応する。
<!-- formal-statement-end -->

PDE2 の二階主要部で見れば、Laplace 方程式は

$$
A=1,\qquad B=0,\qquad C=1
$$

なので

$$
B^2-AC=-1<0.
$$

従って楕円型です。熱方程式や波動方程式と違って、ここには時間変数がありません。初期値から未来を進めるのではなく、**境界値と内部の源から領域全体の状態を決める**問題になります。

<!-- definition-example-start: def-pde5-laplace-poisson -->
**定義の確認**

まず

$$
u(x,y)=x^2-y^2
$$

とすると

$$
u_{xx}=2,\qquad u_{yy}=-2,
$$

したがって

$$
\Delta u=0.
$$

一方、単位円板上で

$$
v(x,y)=\frac{1-x^2-y^2}{4}
$$

とすると

$$
v_{xx}=v_{yy}=-\frac12,
$$

なので

$$
-\Delta v=1.
$$

前者は Laplace 方程式、後者は右辺 $f\equiv1$ の Poisson 方程式を直接満たします。
<!-- definition-example-end -->

---

## 2. Laplace 方程式の解に名前を付ける

<a id="def-pde5-harmonic"></a>
<!-- formal-statement-start -->
> **定義（Laplace 方程式の解としての調和関数）**  
> 開集合 $\Omega\subset\mathbb R^2$ 上の $u\in C^2(\Omega)$ が

$$
\Delta u=0
$$

> を全ての点で満たすとき、$u$ を $\Omega$ 上の **調和関数**という。
<!-- formal-statement-end -->

この対象は [CA6 の調和関数](../CA6/index.md#def-ca6-harmonic-function) と同じものです。ただし本章では CA6 の平均値性質や複素解析の結果を証明に使わず、Laplacian の極座標表示から独立に導きます。

<!-- definition-example-start: def-pde5-harmonic -->
**定義の確認**

$$
u(x,y)=3x-2y+5
$$

では二階微分が全て 0 なので

$$
\Delta u=0.
$$

また先ほどの $x^2-y^2$ も調和関数です。調和関数は線形関数に限られず、曲率を持っていても $x$ 方向と $y$ 方向の二階変化が打ち消し合えばよいことが分かります。
<!-- definition-example-end -->

熱方程式

$$
u_t=\kappa\Delta u
$$

で時間に依らない定常解を考えると $u_t=0$ なので $\Delta u=0$ になります。Laplace 方程式は、拡散が十分進んだ後の平衡状態としても現れます。

---

## 3. 境界で何を指定するか：Dirichlet と Neumann

<a id="def-pde5-boundary-problems"></a>
<!-- formal-statement-start -->
> **定義（Dirichlet 問題と Neumann 問題）**  
> 境界 $\partial\Omega$ を持つ領域で、内部の方程式

$$
-\Delta u=f
$$

> とともに境界値

$$
u=g\qquad\text{on }\partial\Omega
$$

> を指定する問題を **Dirichlet 問題**という。  
> 一方、外向き単位法線を $n$ とし、

$$
\frac{\partial u}{\partial n}
=
\nabla u\cdot n
=
g
\qquad\text{on }\partial\Omega
$$

> を指定する問題を **Neumann 問題**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde5-boundary-problems -->
**定義の確認**

長方形 $0<x<L,\ 0<y<H$ で $u(x,y)=x$ とします。これは $\Delta u=0$ を満たします。

Dirichlet データは各辺で

$$
u(0,y)=0,\qquad u(L,y)=L,\qquad u(x,0)=u(x,H)=x.
$$

一方、左右辺の外向き法線はそれぞれ $(-1,0)$、$(1,0)$ なので

$$
\frac{\partial u}{\partial n}=-1\quad(x=0),
\qquad
\frac{\partial u}{\partial n}=1\quad(x=L),
$$

上下辺では $\partial u/\partial n=0$ です。同じ調和関数でも、Dirichlet は「高さ」、Neumann は「境界を横切る勾配」を指定しています。
<!-- definition-example-end -->

ここで重要な違いがあります。Laplace 方程式の Neumann 問題では、$u$ が解なら任意の定数 $C$ に対して $u+C$ も解です。法線微分は定数を加えても変わらないため、Neumann 問題では一般に「定数を除いて一意」という形になります。

---

## 4. 極座標で Laplacian を読む

平均値性質を複素解析なしで証明するため、円の中心 $(a,b)$ のまわりで

$$
x=a+r\cos\theta,\qquad
y=b+r\sin\theta
$$

と置き、

$$
v(r,\theta)
=
u(a+r\cos\theta,\ b+r\sin\theta)
$$

と書きます。

まず一階微分は

$$
v_r
=
u_x\cos\theta+u_y\sin\theta,
$$

$$
v_\theta
=
-r u_x\sin\theta+r u_y\cos\theta
$$

です。さらに $r$ で微分すると

$$
v_{rr}
=
u_{xx}\cos^2\theta
+
2u_{xy}\sin\theta\cos\theta
+
u_{yy}\sin^2\theta.
$$

一方、$\theta$ で二回微分すると

$$
v_{\theta\theta}
=
-r u_x\cos\theta
-r u_y\sin\theta
+
r^2u_{xx}\sin^2\theta
-2r^2u_{xy}\sin\theta\cos\theta
+r^2u_{yy}\cos^2\theta.
$$

ここで

$$
\frac1r v_r
=
\frac1r
\{u_x\cos\theta+u_y\sin\theta\}
$$

を加えると、$v_{\theta\theta}/r^2$ に含まれる一階微分項がちょうど打ち消されます。また $u_{xy}$ の項も $v_{rr}$ と $v_{\theta\theta}/r^2$ の間で打ち消し合います。残るのは

$$
u_{xx}(\cos^2\theta+\sin^2\theta)
+
u_{yy}(\sin^2\theta+\cos^2\theta)
=
u_{xx}+u_{yy}.
$$

従って $r>0$ で

$$
\boxed{
\Delta u
=
v_{rr}
+\frac1r v_r
+\frac1{r^2}v_{\theta\theta}
}
$$

です。

この式の意味は、Laplacian が「半径方向の曲がり」と「円周方向の曲がり」の総和を測っているということです。

円周平均を

$$
M(r)
:=
\frac1{2\pi}
\int_0^{2\pi}
v(r,\theta)\,d\theta
$$

と置きます。$u$ が調和なら

$$
v_{rr}+\frac1r v_r+\frac1{r^2}v_{\theta\theta}=0.
$$

両辺を $\theta$ で積分すると、周期性から

$$
\int_0^{2\pi}v_{\theta\theta}\,d\theta
=
v_\theta(r,2\pi)-v_\theta(r,0)
=
0.
$$

従って

$$
M''(r)+\frac1rM'(r)=0,
$$

すなわち

$$
(rM'(r))'=0
$$

となります。これが平均値性質の核心です。

---

## 5. 調和関数の値は円周平均に等しい

<a id="thm-pde5-circle-mean-value"></a>
<!-- formal-statement-start -->
> **定理（円周平均値性質）**  
> $u\in C^2(\Omega)$ を調和関数とし、閉円板

$$
\overline{B_R(a,b)}
\subset\Omega
$$

> とする。このとき任意の $0<r\le R$ について

$$
\boxed{
u(a,b)
=
\frac1{2\pi}
\int_0^{2\pi}
u(a+r\cos\theta,\ b+r\sin\theta)\,d\theta
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

前節で円周平均 $M(r)$ が

$$
(rM'(r))'=0
$$

を満たすことを得ました。従って $rM'(r)$ は定数です。中心 $r=0$ で特異な振る舞いが起きないことから、その定数は 0 であり、$M(r)$ は半径に依らないことが分かります。

<!-- proof-start -->
### 証明

前節の計算から

$$
(rM'(r))'=0
$$

なので、ある定数 $C$ が存在して

$$
rM'(r)=C
$$

です。

一方 $u\in C^2$ なので $\nabla u$ は中心近くで有界です。連鎖律から

$$
v_r
=
u_x\cos\theta+u_y\sin\theta
$$

であり、したがって $M'(r)$ も $r\downarrow0$ で有界です。よって

$$
\lim_{r\downarrow0}rM'(r)=0.
$$

従って $C=0$ で

$$
M'(r)=0
$$

です。つまり $M(r)$ は $0<r\le R$ で一定です。

さらに $u$ の連続性から

$$
\lim_{r\downarrow0}M(r)=u(a,b).
$$

したがって全ての $0<r\le R$ で

$$
M(r)=u(a,b).
$$
<!-- proof-end -->

この定理は「調和関数の一点の値は、その点だけの局所情報ではなく、任意に小さい円周上の値の平均で固定される」と言っています。内部で勝手に尖った山を作る自由が強く制限されています。

---

## 6. 円板全体で平均しても同じ値になる

<a id="cor-pde5-disk-mean-value"></a>
<!-- formal-statement-start -->
> **系（円板平均値性質）**  
> [円周平均値性質](#thm-pde5-circle-mean-value)と同じ仮定の下で

$$
\boxed{
u(a,b)
=
\frac1{\pi R^2}
\iint_{B_R(a,b)}u(x,y)\,dx\,dy
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

中心 $(a,b)$ の極座標を使うと面積要素は

$$
dx\,dy=r\,dr\,d\theta
$$

です。従って

$$
\iint_{B_R(a,b)}u\,dx\,dy
=
\int_0^R
\int_0^{2\pi}
u(a+r\cos\theta,b+r\sin\theta)
\,r\,d\theta\,dr.
$$

円周平均値性質から内側の積分は

$$
\int_0^{2\pi}u(\cdots)\,d\theta
=
2\pi u(a,b).
$$

よって

$$
\iint_{B_R(a,b)}u\,dx\,dy
=
2\pi u(a,b)\int_0^Rr\,dr
=
\pi R^2u(a,b).
$$

両辺を $\pi R^2$ で割れば主張を得ます。
<!-- proof-end -->

---

## 7. 平均値性質から強最大原理が出る

調和関数が内部で最大値を取ったとします。中心値が円周平均に等しいのに、円周上の値が全て中心値以下なら、平均が中心値と一致するためには円周上の値が全て中心値でなければなりません。この観察を領域全体へ広げます。

<a id="thm-pde5-maximum-principle"></a>
<!-- formal-statement-start -->
> **定理（強最大原理）**  
> $\Omega\subset\mathbb R^2$ を連結な領域とし、$u\in C^2(\Omega)$ を調和関数とする。$u$ がある内部点 $x_0\in\Omega$ で領域内最大値を取るなら、$u$ は $\Omega$ 上で定数である。  
> 同様に、内部点で領域内最小値を取るなら $u$ は定数である。
<!-- formal-statement-end -->

### 証明の見取り図

最大値を $M$ とし、

$$
S=\{x\in\Omega:u(x)=M\}
$$

を考えます。連続性から $S$ は閉じています。平均値性質を使うと、$S$ の各点の周囲の小円板も全て値 $M$ になるため $S$ は開いてもいます。連結な領域の空でない開閉集合は全体しかありません。

<!-- proof-start -->
### 証明

内部点 $x_0$ で

$$
u(x_0)=M:=\max_\Omega u
$$

とします。

$$
S=\{x\in\Omega:u(x)=M\}
$$

と置きます。$x_0\in S$ なので $S\neq\varnothing$ です。$u$ は連続なので $S=u^{-1}(\{M\})$ は $\Omega$ で閉じています。

次に $x\in S$ を任意に取ります。$x$ は内部点なので、ある $r_0>0$ が存在して

$$
\overline{B_{r_0}(x)}\subset\Omega.
$$

任意の $0<r<r_0$ について円周平均値性質から

$$
M=u(x)
=
\frac1{2\pi}\int_0^{2\pi}u(x+r e_\theta)\,d\theta.
$$

しかし全ての点で $u\le M$ です。連続関数 $M-u$ は円周上で非負で、その積分が 0 なので円周上で恒等的に 0 です。従って任意の $0<r<r_0$ に対して円周上の全点が $S$ に属します。

半径 $r$ を動かせば

$$
B_{r_0}(x)\subset S.
$$

よって $S$ は $\Omega$ で開いています。

$\Omega$ は連結で、$S$ は空でない開閉集合なので

$$
S=\Omega.
$$

従って $u\equiv M$ です。

最小値については $-u$ も調和関数であることを使えば同じです。
<!-- proof-end -->

$\Omega$ が有界で $u\in C(\overline\Omega)\cap C^2(\Omega)$ なら、閉包上の最大値・最小値は存在します。非定数なら内部では取れないため

$$
\max_{\overline\Omega}u
=
\max_{\partial\Omega}u,
\qquad
\min_{\overline\Omega}u
=
\min_{\partial\Omega}u.
$$

これが境界値問題の一意性を支える機構になります。

---

## 8. Dirichlet 問題は最大原理で一意になる

<a id="cor-pde5-dirichlet-uniqueness"></a>
<!-- formal-statement-start -->
> **系（Dirichlet 問題の一意性）**  
> $\Omega\subset\mathbb R^2$ を有界連結領域とする。$u,v\in C(\overline\Omega)\cap C^2(\Omega)$ が同じ Poisson 方程式

$$
-\Delta u=f,\qquad -\Delta v=f
$$

> と同じ Dirichlet 境界条件

$$
u=v=g
\qquad\text{on }\partial\Omega
$$

> を満たすなら

$$
u=v
\qquad\text{on }\overline\Omega
$$

> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

差

$$
w=u-v
$$

を取ると

$$
-\Delta w
=
(-\Delta u)-(-\Delta v)
=
f-f
=
0.
$$

従って $w$ は調和関数です。また境界上で

$$
w=0.
$$

最大原理から

$$
\max_{\overline\Omega}w
=
\max_{\partial\Omega}w
=
0.
$$

同様に $-w$ も調和関数なので

$$
\max_{\overline\Omega}(-w)=0,
$$

すなわち

$$
\min_{\overline\Omega}w=0.
$$

従って全ての点で

$$
0\le w\le0,
$$

よって $w=0$、すなわち $u=v$ です。
<!-- proof-end -->

ここで存在は示していません。**最大原理は「解があれば一つしかない」を非常に強く与える**一方、一般領域で解を構成する存在論は別の仕事です。本章では長方形と円板という二つの標準領域で構成を実行します。

---

## 9. Poisson 方程式は「特解 + 調和補正」に分けられる

Poisson 方程式

$$
-\Delta u=f
$$

に対して、特解 $u_p$ を一つ見つけたとします。すると任意の解 $u$ との差

$$
h=u-u_p
$$

は

$$
-\Delta h
=
f-f
=
0
$$

を満たすので調和関数です。

従って

$$
\boxed{
u=u_p+h
}
$$

と分解できます。境界条件は $h$ の境界値として吸収されます。

### 例：単位円板で一定の源

$$
-\Delta u=1,
\qquad
u=0\quad\text{on }x^2+y^2=1
$$

を考えます。

$$
u_p(x,y)=\frac{1-x^2-y^2}{4}
$$

は

$$
-\Delta u_p=1
$$

かつ境界で $u_p=0$ なので、そのまま解です。Dirichlet 一意性から、古典解が存在するならこれ以外にはありません。

---

## 10. 長方形では一方向が三角関数、もう一方向が双曲線関数になる

長方形

$$
0<x<L,\qquad 0<y<H
$$

で Laplace 方程式

$$
u_{xx}+u_{yy}=0
$$

を考えます。三辺を 0 にし、上辺だけ

$$
u(x,H)=f(x)
$$

とします。

積の形

$$
u(x,y)=X(x)Y(y)
$$

を仮定すると

$$
X''Y+XY''=0.
$$

非零の範囲で割り、

$$
\frac{X''}{X}
=
-\frac{Y''}{Y}
=
-\lambda
$$

と置けば

$$
X''+\lambda X=0,
$$

$$
Y''-\lambda Y=0.
$$

左右辺の境界条件

$$
X(0)=X(L)=0
$$

から [ODE7 の Dirichlet 固有値問題](../ODE7/index.md#def-ode7-eigenpair) と同じく

$$
\lambda_n
=
\left(\frac{n\pi}{L}\right)^2,
\qquad
X_n(x)
=
\sin\left(\frac{n\pi x}{L}\right).
$$

下辺 $y=0$ で 0 にするには

$$
Y_n(y)
=
\sinh\left(\frac{n\pi y}{L}\right)
$$

が自然です。

<a id="prop-pde5-rectangle-finite-mode"></a>
<!-- formal-statement-start -->
> **命題（長方形の有限正弦モード解）**  
> $k_n=n\pi/L$ とする。有限正弦多項式

$$
f_N(x)
=
\sum_{n=1}^N b_n\sin(k_nx)
$$

> を上辺データとすると

$$
\boxed{
u_N(x,y)
=
\sum_{n=1}^N
b_n
\frac{\sinh(k_ny)}{\sinh(k_nH)}
\sin(k_nx)
}
$$

> は

$$
\Delta u_N=0
$$

> を長方形内部で満たし、三辺 $x=0,\ x=L,\ y=0$ で 0、上辺 $y=H$ で $f_N$ に一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限和なので各項を調べれば十分です。第 $n$ 項を

$$
u_n(x,y)
=
b_n
\frac{\sinh(k_ny)}{\sinh(k_nH)}
\sin(k_nx)
$$

とします。

$$
(u_n)_{xx}
=
-k_n^2u_n,
$$

一方

$$
\frac{d^2}{dy^2}\sinh(k_ny)
=
k_n^2\sinh(k_ny)
$$

なので

$$
(u_n)_{yy}
=
k_n^2u_n.
$$

従って

$$
\Delta u_n=0.
$$

また

$$
\sin(k_n\cdot0)=\sin(k_nL)=0,
$$

$$
\sinh(k_n\cdot0)=0,
$$

なので三辺で 0 です。上辺では

$$
\frac{\sinh(k_nH)}{\sinh(k_nH)}=1
$$

だから

$$
u_N(x,H)
=
\sum_{n=1}^N b_n\sin(k_nx)
=
f_N(x).
$$

線形性から有限和 $u_N$ も全ての条件を満たします。
<!-- proof-end -->

一般の滑らかな $f$ では、その Fourier 正弦係数

$$
b_n
=
\frac2L
\int_0^L
f(x)\sin\left(\frac{n\pi x}{L}\right)\,dx
$$

を使い、同じ式を無限和へ伸ばします。例えば $f\in C^4([0,L])$ で

$$
f(0)=f(L)=f''(0)=f''(L)=0
$$

なら、PDE4 と同じ四回部分積分から

$$
b_n=O(n^{-4})
$$

です。二階微分で $n^2$ が掛かっても $O(n^{-2})$ が残るため、必要な導関数級数は一様収束し、項別微分を正当化できます。上辺では [FOU2 の Dirichlet の点ごとの極限定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)から $f$ に戻ります。

ここで熱・波動との違いが見えます。同じ正弦固有関数を使っても、Laplace 方程式では「時間発展」ではなく、**一つの境界から内部へ向かう減衰係数**が

$$
\frac{\sinh(k_ny)}{\sinh(k_nH)}
$$

として現れます。

---

## 11. 円板では半径方向に $r^n$ が現れる

単位円板

$$
D=\{(r,\theta):0\le r<1\}
$$

で Laplace 方程式を考えます。極座標で

$$
u_{rr}
+\frac1r u_r
+\frac1{r^2}u_{\theta\theta}
=
0.
$$

積の形

$$
u(r,\theta)=R(r)\Theta(\theta)
$$

を代入すると

$$
r^2\frac{R''}{R}
+
r\frac{R'}{R}
=
-\frac{\Theta''}{\Theta}
=
\lambda.
$$

$2\pi$ 周期性から $\lambda=n^2$ が現れ、

$$
\Theta(\theta)=\cos n\theta,\ \sin n\theta.
$$

半径側は Euler 型方程式

$$
r^2R''+rR'-n^2R=0
$$

で、$n\ge1$ なら

$$
R(r)=Ar^n+Br^{-n}.
$$

中心 $r=0$ で有限な古典解を求めるので $r^{-n}$ は捨てます。$n=0$ では定数モードを採用します。

したがって境界の Fourier モード

$$
\cos n\theta,\qquad \sin n\theta
$$

は内部で

$$
r^n\cos n\theta,\qquad r^n\sin n\theta
$$

へ延長されます。

---

## 12. 全モードを一つの核にまとめる

<a id="def-pde5-poisson-kernel"></a>
<!-- formal-statement-start -->
> **定義（円板境界値問題の Poisson kernel）**  
> $0\le r<1$、$\phi\in\mathbb R$ に対して

$$
\boxed{
P_r(\phi)
=
\frac{1-r^2}{1-2r\cos\phi+r^2}
}
$$

> を単位円板の **Poisson kernel** という。
<!-- formal-statement-end -->

これは [CA6 の Poisson kernel](../CA6/index.md#def-ca6-poisson-kernel) と同じ核です。ただし本章では複素解析の表示公式を前提にせず、Fourier モードを半径方向へ延長した総和として導きます。

分母は

$$
1-2r\cos\phi+r^2
=
(1-r)^2+2r(1-\cos\phi)>0
$$

なので

$$
P_r(\phi)>0.
$$

また有限等比級数の極限を使うだけで

$$
\boxed{
P_r(\phi)
=
1+2\sum_{n=1}^{\infty}r^n\cos(n\phi)
}
$$

が得られます。$r\le\rho<1$ では右辺は絶対一様収束します。

<!-- definition-example-start: def-pde5-poisson-kernel -->
**定義の確認**

$r=0$ では

$$
P_0(\phi)=1.
$$

また Fourier 展開の定数項が 1 なので

$$
\frac1{2\pi}
\int_{-\pi}^{\pi}P_r(\phi)\,d\phi
=
1.
$$

つまり $P_r/(2\pi)$ は非負で全質量 1 の重みです。$r\uparrow1$ では $\phi=0$ 付近へ重みが集中し、境界値をその角度の近くから読み取る近似恒等核になります。
<!-- definition-example-end -->

---

## 13. Poisson 積分が円板の Dirichlet 問題を解く

<a id="thm-pde5-poisson-integral"></a>
<!-- formal-statement-start -->
> **定理（単位円板の Poisson 積分）**  
> $g:\mathbb R\to\mathbb R$ を連続な $2\pi$ 周期関数とする。$0\le r<1$ に対して

$$
\boxed{
u(r,\theta)
=
\frac1{2\pi}
\int_{-\pi}^{\pi}
P_r(\theta-\varphi)g(\varphi)\,d\varphi
}
$$

> と定める。このとき $u$ は単位円板内部で調和し、閉円板へ連続に延長でき、

$$
u(1,\theta)=g(\theta)
$$

> を満たす。従ってこれは連続境界データ $g$ に対する単位円板 Dirichlet 問題の一意な解である。
<!-- formal-statement-end -->

### 証明の見取り図

証明は三段です。

1. Poisson kernel の Fourier 展開から、$u$ は各境界 Fourier モードを $r^n$ 倍して内部へ運ぶ。
2. $r<1$ のコンパクトな範囲では微分後の級数も一様収束するので、各モードの調和性から $\Delta u=0$。
3. $P_r/(2\pi)$ は質量 1 で $\phi=0$ 付近へ集中するため、$r\uparrow1$ で $u(r,\theta)\to g(\theta)$ が一様に成り立つ。

<!-- proof-start -->
### 証明

$g$ の実 Fourier 係数を

$$
a_n
=
\frac1\pi\int_{-\pi}^{\pi}g(\varphi)\cos(n\varphi)\,d\varphi,
$$

$$
b_n
=
\frac1\pi\int_{-\pi}^{\pi}g(\varphi)\sin(n\varphi)\,d\varphi
$$

とします。

Poisson kernel の展開

$$
P_r(\theta-\varphi)
=
1
+
2\sum_{n=1}^{\infty}
r^n\cos(n(\theta-\varphi))
$$

は固定した $\rho<1$ に対して $0\le r\le\rho$ で絶対一様収束します。従って積分と和を交換でき、加法定理から

$$
u(r,\theta)
=
\frac{a_0}{2}
+
\sum_{n=1}^{\infty}
r^n
\{a_n\cos(n\theta)+b_n\sin(n\theta)\}.
$$

連続な $g$ は有界なので係数 $a_n,b_n$ も一様に有界です。ここで

$$
H_n^c(x,y):=r^n\cos(n\theta),
\qquad
H_n^s(x,y):=r^n\sin(n\theta)
$$

と置きます。三角関数の加法定理から

$$
H_{n+1}^c=xH_n^c-yH_n^s,
\qquad
H_{n+1}^s=yH_n^c+xH_n^s.
$$

$H_0^c=1$、$H_1^c=x$、$H_1^s=y$ から帰納的に、これらは $(x,y)$ の多項式です。$r>0$ では極座標表示を直接微分して

$$
\partial_x H_n^c=nH_{n-1}^c,
\qquad
\partial_y H_n^c=-nH_{n-1}^s,
$$

$$
\partial_x H_n^s=nH_{n-1}^s,
\qquad
\partial_y H_n^s=nH_{n-1}^c
$$

を得ます。両辺は多項式なので、この恒等式は原点にも連続的に延長されます。従って二階偏微分の絶対値は、$x^2+y^2\le\rho^2$ 上で定数倍の

$$
n(n-1)\rho^{n-2}
$$

以下です。

したがって任意の $\rho<1$ について

$$
\sum_{n=2}^{\infty}
n(n-1)\rho^{n-2}<\infty
$$

より、$u$ の級数は Cartesian 座標で二階まで項別微分できます。

さらに $r>0$ では極座標 Laplacian へ代入して

$$
\Delta H_n^c=\Delta H_n^s=0
$$

です。左辺は多項式なので原点でも 0 です。よって各モードは円板全体で調和し、項別微分した級数について

$$
\Delta u=0
$$

が成り立ちます。

次に境界収束を示します。周期性を使い変数をずらすと

$$
u(r,\theta)-g(\theta)
=
\frac1{2\pi}
\int_{-\pi}^{\pi}
P_r(\psi)
\{g(\theta-\psi)-g(\theta)\}\,d\psi.
$$

$g$ はコンパクトな円周上で一様連続です。任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して

$$
|\psi|<\delta
\quad\Longrightarrow\quad
|g(\theta-\psi)-g(\theta)|<\varepsilon
$$

が全ての $\theta$ で成り立ちます。

積分を $|\psi|<\delta$ と $|\psi|\ge\delta$ に分けます。近い部分では、Poisson kernel の全質量が $2\pi$ なので寄与は高々 $\varepsilon$ です。

遠い部分では $|\psi|\ge\delta$ なら

$$
1-2r\cos\psi+r^2
=
(1-r)^2+2r(1-\cos\psi)
$$

が $r\uparrow1$ の近くで正の下限を持ちます。一方、分子 $1-r^2\to0$ なので

$$
\sup_{|\psi|\ge\delta}P_r(\psi)\to0.
$$

$g$ の有界性から遠い部分の積分は一様に 0 へ収束します。従って

$$
\sup_\theta|u(r,\theta)-g(\theta)|
\to0
\qquad(r\uparrow1).
$$

よって $u$ は境界へ連続に延長され、境界値は $g$ です。

最後に [Dirichlet 問題の一意性](#cor-pde5-dirichlet-uniqueness)から、この Poisson 積分以外の古典解は存在しません。
<!-- proof-end -->

---

## 14. 単一 Fourier モードなら Poisson kernel は一瞬で読める

境界データ

$$
g(\theta)=\cos(m\theta)
$$

を考えます。Fourier 係数は $a_m=1$ 以外 0 なので、Poisson 積分は

$$
\boxed{
u(r,\theta)=r^m\cos(m\theta)
}
$$

です。

同様に

$$
g(\theta)=\sin(m\theta)
$$

なら

$$
u(r,\theta)=r^m\sin(m\theta).
$$

高周波ほど $r^m$ によって内部へ入ると急速に小さくなります。円板の中心では $r=0$ なので、全ての非定数 Fourier モードが消え、

$$
u(0)
=
\frac1{2\pi}
\int_{-\pi}^{\pi}g(\theta)\,d\theta.
$$

これは平均値性質そのものです。

---

## 15. Neumann 問題には「定数不定性」以外にも整合条件がある

一般領域の発散定理は PDE6 で扱います。ここでは長方形だけを、微積分学の基本定理で直接計算します。

調和関数 $u\in C^2([0,L]\times[0,H])$ に対し、四辺の外向き法線微分を積分すると

$$
\int_{\partial\Omega}\frac{\partial u}{\partial n}\,ds
=
\int_0^H
\{u_x(L,y)-u_x(0,y)\}\,dy
+
\int_0^L
\{u_y(x,H)-u_y(x,0)\}\,dx.
$$

各差を基本定理で内部積分へ戻すと

$$
\int_{\partial\Omega}\frac{\partial u}{\partial n}\,ds
=
\int_0^H\int_0^Lu_{xx}\,dx\,dy
+
\int_0^L\int_0^Hu_{yy}\,dy\,dx.
$$

従って

$$
\boxed{
\int_{\partial\Omega}\frac{\partial u}{\partial n}\,ds
=
\iint_\Omega\Delta u\,dx\,dy
}
$$

です。Laplace 方程式なら右辺は 0 なので、Neumann データ $g$ は少なくとも

$$
\boxed{
\int_{\partial\Omega}g\,ds=0
}
$$

を満たさなければなりません。

Poisson 方程式 $-\Delta u=f$ なら

$$
\int_{\partial\Omega}g\,ds
=
-\iint_\Omega f\,dx\,dy.
$$

この整合条件と定数不定性は、Dirichlet 問題との本質的な違いです。

---

## 16. 熱・波動・Laplace を同じ固有モードで見比べる

同じ空間固有値

$$
\lambda_n
$$

が現れても、その後の役割は方程式の型で変わります。

| 方程式 | モード方程式 | モードの挙動 |
|---|---|---|
| 熱 $u_t=\kappa\Delta u$ | $T_n'+\kappa\lambda_nT_n=0$ | $e^{-\kappa\lambda_nt}$ で減衰 |
| 波動 $u_{tt}=c^2\Delta u$ | $T_n''+c^2\lambda_nT_n=0$ | $\cos(c\sqrt{\lambda_n}t),\sin(c\sqrt{\lambda_n}t)$ で振動 |
| Laplace $\Delta u=0$ | 一方の座標で $Y_n''-\lambda_nY_n=0$ | 境界間を指数・双曲線型に補間 |

Fourier 級数や Sturm--Liouville が「解法の小技」ではなく、**空間微分作用素を固有モードに分解する共通言語**であることが見えてきます。PDE7 ではこの見方を三系列の統合として整理します。

---

# 演習

## PDE5-A01 Laplace と Poisson を直接判定する

- Level: A
- 目安時間: 10分

次の関数について $\Delta u$ を計算し、調和関数か、Poisson 方程式 $-\Delta u=f$ のどの $f$ に対応するか答えよ。

1. $u(x,y)=x^2-y^2+3xy$
2. $v(x,y)=x^2+y^2$

<!-- solution-start -->
### 詳細解答

1. まず

$$
u_{xx}=2,\qquad u_{yy}=-2.
$$

従って

$$
\Delta u=2-2=0.
$$

$3xy$ は $x$、$y$ のどちらについても二階微分すると 0 なので結論を変えません。よって $u$ は調和関数です。

2. 次に

$$
v_{xx}=2,\qquad v_{yy}=2,
$$

なので

$$
\Delta v=4.
$$

本章の Poisson 方程式は

$$
-\Delta v=f
$$

という符号規約なので

$$
f=-4.
$$

したがって $v$ は調和関数ではなく、右辺 $f\equiv-4$ の Poisson 方程式の解です。
<!-- solution-end -->

## PDE5-A02 平均値性質を多項式で確認する

- Level: A
- 目安時間: 12分

調和関数

$$
u(x,y)=x^2-y^2
$$

について、原点中心・半径 $R$ の円周平均を直接計算し、$u(0,0)$ に等しいことを確認せよ。

<!-- solution-start -->
### 詳細解答

円周上では

$$
x=R\cos\theta,\qquad y=R\sin\theta.
$$

従って

$$
u(R\cos\theta,R\sin\theta)
=
R^2(\cos^2\theta-\sin^2\theta)
=
R^2\cos2\theta.
$$

円周平均は

$$
\frac1{2\pi}
\int_0^{2\pi}R^2\cos2\theta\,d\theta
=
0.
$$

一方

$$
u(0,0)=0.
$$

よって円周平均値性質がこの具体例で直接確認できました。
<!-- solution-end -->

## PDE5-A03 最大原理から零境界の解を決める

- Level: A
- 目安時間: 8分

有界連結領域 $\Omega$ 上で $u\in C(\overline\Omega)\cap C^2(\Omega)$ が

$$
\Delta u=0,
\qquad
u=0\quad\text{on }\partial\Omega
$$

を満たすとする。$u\equiv0$ を示せ。

<!-- solution-start -->
### 詳細解答

最大原理から

$$
\max_{\overline\Omega}u
=
\max_{\partial\Omega}u
=
0.
$$

従って

$$
u\le0
$$

です。

$-u$ も調和関数で、境界上で 0 です。同じ最大原理を $-u$ に使うと

$$
-u\le0,
$$

すなわち

$$
u\ge0.
$$

よって

$$
u=0
$$

が領域全体で成り立ちます。
<!-- solution-end -->

## PDE5-A04 長方形の単一境界モード

- Level: A
- 目安時間: 12分

長方形 $0<x<L,\ 0<y<H$ で、三辺 $x=0,\ x=L,\ y=0$ では 0、上辺では

$$
u(x,H)=\sin\left(\frac{m\pi x}{L}\right)
$$

とする。Laplace 方程式を満たす解を求めよ。

<!-- solution-start -->
### 詳細解答

上辺データは一つの正弦モードだけなので、[長方形の有限正弦モード解](#prop-pde5-rectangle-finite-mode)で $b_m=1$、他の係数を 0 とすればよいです。

$$
k_m=\frac{m\pi}{L}
$$

と置くと

$$
\boxed{
u(x,y)
=
\frac{\sinh(k_my)}{\sinh(k_mH)}
\sin(k_mx)
}
$$

です。

確認すると

$$
u_{xx}=-k_m^2u,
\qquad
u_{yy}=k_m^2u,
$$

なので

$$
\Delta u=0.
$$

また $x=0,L$ では sine が 0、$y=0$ では $\sinh0=0$、$y=H$ では双曲線関数の比が 1 になるため、全ての境界条件を満たします。
<!-- solution-end -->

## PDE5-B01 長方形 Neumann 問題の整合条件

- Level: B
- 目安時間: 18分

長方形 $\Omega=(0,L)\times(0,H)$ で

$$
\Delta u=0
$$

を満たす $C^2$ 解が存在し、境界上で

$$
\frac{\partial u}{\partial n}=g
$$

とする。

1. $\int_{\partial\Omega}g\,ds=0$ が必要であることを、発散定理を使わず示せ。
2. $g\equiv1$ では解が存在し得ないことを説明せよ。
3. 解 $u$ が一つ存在すれば $u+C$ も解であることを示せ。

<!-- solution-start -->
### 詳細解答

1. 四辺の法線微分を足します。

$$
\int_{\partial\Omega}g\,ds
=
\int_0^H\{u_x(L,y)-u_x(0,y)\}\,dy
+
\int_0^L\{u_y(x,H)-u_y(x,0)\}\,dx.
$$

微積分学の基本定理から

$$
u_x(L,y)-u_x(0,y)
=
\int_0^L u_{xx}(x,y)\,dx,
$$

$$
u_y(x,H)-u_y(x,0)
=
\int_0^H u_{yy}(x,y)\,dy.
$$

従って

$$
\int_{\partial\Omega}g\,ds
=
\iint_\Omega
(u_{xx}+u_{yy})\,dx\,dy
=
\iint_\Omega\Delta u\,dx\,dy
=
0.
$$

2. $g\equiv1$ なら

$$
\int_{\partial\Omega}g\,ds
=
|\partial\Omega|
=
2(L+H)>0.
$$

必要条件 0 に反するため、古典解は存在しません。

3. 定数 $C$ に対して

$$
\Delta(u+C)=\Delta u=0,
$$

また

$$
\frac{\partial(u+C)}{\partial n}
=
\frac{\partial u}{\partial n}
=
g.
$$

従って $u+C$ も同じ Neumann 問題の解です。これが定数不定性です。
<!-- solution-end -->

## PDE5-B02 Poisson kernel で一つの Fourier モードを延長する

- Level: B
- 目安時間: 15分

単位円板の境界データを

$$
g(\theta)=2+3\cos(2\theta)-4\sin(3\theta)
$$

とする。Poisson 積分による調和延長 $u(r,\theta)$ を求め、中心値 $u(0)$ も求めよ。

<!-- solution-start -->
### 詳細解答

Poisson 積分では

$$
\cos(n\theta)\longmapsto r^n\cos(n\theta),
$$

$$
\sin(n\theta)\longmapsto r^n\sin(n\theta)
$$

と各 Fourier モードが独立に延長されます。従って

$$
\boxed{
u(r,\theta)
=
2
+
3r^2\cos(2\theta)
-
4r^3\sin(3\theta)
}
$$

です。

中心 $r=0$ では全ての非定数モードが消えるので

$$
\boxed{u(0)=2}.
$$

これは境界平均

$$
\frac1{2\pi}\int_{-\pi}^{\pi}g(\theta)\,d\theta=2
$$

とも一致し、中心での平均値性質を確認しています。
<!-- solution-end -->

## PDE5-B03 一定源の Poisson 問題を調和補正へ分解する

- Level: B
- 目安時間: 18分

単位円板で

$$
-\Delta u=1,
$$

境界上で

$$
u(1,\theta)=\cos\theta
$$

とする。解を求め、一意性も説明せよ。

<!-- solution-start -->
### 詳細解答

まず一定源に対する特解として

$$
u_p(r,\theta)=\frac{1-r^2}{4}
$$

を取ります。実際

$$
-\Delta u_p=1
$$

で、境界 $r=1$ では $u_p=0$ です。

残り

$$
h=u-u_p
$$

は

$$
\Delta h=0
$$

を満たし、境界条件は

$$
h(1,\theta)=\cos\theta.
$$

境界の $\cos\theta$ モードの調和延長は

$$
h(r,\theta)=r\cos\theta.
$$

従って

$$
\boxed{
u(r,\theta)
=
\frac{1-r^2}{4}
+
r\cos\theta
}
$$

です。

二つの解 $u_1,u_2$ があれば差 $w=u_1-u_2$ は

$$
\Delta w=0,
\qquad
w=0\quad\text{on }\partial D.
$$

[Dirichlet 問題の一意性](#cor-pde5-dirichlet-uniqueness)から $w=0$ なので、この解は一意です。
<!-- solution-end -->

## PDE5-C01 境界の高周波は内部でどれだけ消えるか

- Level: C
- 目安時間: 30分

単位円板で連続境界データ

$$
g_N(\theta)=\cos(N\theta)
$$

を与え、対応する Dirichlet 解を $u_N$ とする。

1. $u_N(r,\theta)$ を求めよ。
2. 固定した $0<\rho<1$ に対し

$$
\sup_{0\le r\le\rho,\ \theta}|u_N(r,\theta)|
$$

を求め、$N\to\infty$ での極限を示せ。
3. 境界では $\|g_N\|_\infty=1$ が全く小さくならないのに、内部コンパクト集合では解が 0 へ一様収束する理由を、Poisson kernel と最大原理の役割を区別して説明せよ。

<!-- solution-start -->
### 詳細解答

1. 境界データは単一 Fourier モードです。Poisson 積分により

$$
\boxed{
u_N(r,\theta)
=
r^N\cos(N\theta)
}
$$

です。

直接確認しても、極座標 Laplacian に対し

$$
\Delta(r^N\cos N\theta)=0
$$

で、$r=1$ では $\cos(N\theta)$ に一致します。Dirichlet 一意性によりこれが解です。

2. $0\le r\le\rho$ では

$$
|u_N(r,\theta)|
=
r^N|\cos(N\theta)|
\le
\rho^N.
$$

一方、$r=\rho$、$\theta=0$ なら等号が成り立つので

$$
\boxed{
\sup_{0\le r\le\rho,\ \theta}|u_N(r,\theta)|
=
\rho^N
}.
$$

$0<\rho<1$ なので

$$
\rho^N\to0.
$$

従って任意の閉部分円板 $r\le\rho<1$ で

$$
u_N\to0
$$

が一様に成り立ちます。

3. 最大原理だけなら

$$
|u_N|\le1
$$

という境界から内部への上界は得られますが、$\rho^N$ という高周波依存の減衰率までは与えません。

一方 Poisson kernel / Fourier モード表示は

$$
\cos(N\theta)
\longmapsto
r^N\cos(N\theta)
$$

と、高周波 $N$ が内部へ入るほど $r^N$ で強く減衰することを明示します。

したがって役割は

$$
\text{最大原理}
\Rightarrow
\text{境界値からの一様な振幅制御},
$$

$$
\text{Poisson kernel}
\Rightarrow
\text{各周波数が内部へどう伝わるかの定量表示}
$$

と分かれます。

この違いは、楕円型方程式で境界の細かな振動が内部ほど滑らかに見える理由の最も単純な例です。
<!-- solution-end -->

---

## 17. 章末チェック

- Laplace 方程式と Poisson 方程式の符号規約を区別して書ける。
- 調和関数を具体的な二階微分で検証できる。
- Dirichlet 問題と Neumann 問題のデータの違いを説明できる。
- 極座標 Laplacian から円周平均値性質を導ける。
- 平均値性質から強最大原理を証明できる。
- 最大原理から Poisson 方程式の Dirichlet 一意性を証明できる。
- 長方形で変数分離し、正弦モードと双曲線関数を組み合わせられる。
- 単位円板の Poisson kernel を Fourier モードの総和として説明できる。
- Poisson 積分が連続境界データへ戻る理由を近似恒等核として説明できる。
- Neumann 問題の定数不定性と、長方形での積分整合条件を導ける。
- 熱・波動・Laplace の各モードが、減衰・振動・境界補間という異なる役割を持つことを比較できる。

次は PDE6 で Green の恒等式、Laplace 作用素の基本解、Green 関数へ進みます。本章の最大原理と境界値問題の一意性が、そこで得る表現公式を「解そのもの」として確定する土台になります。
