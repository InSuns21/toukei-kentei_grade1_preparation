# GPDE9：楕円型正則性 — 弱解から二階微分を回収する

<!-- definition-example-audit: strict -->

<a id="def-gpde9-difference-quotient"></a>

<!-- formal-statement-start -->
> **定義（difference quotient）**  
> $u$ を $x$ と $x+he_k$ で定義された関数、$h\ne0$ とする。第 $k$ 方向の前進 difference quotient を
>
$$
\boxed{
D_h^k u(x)
:=
\frac{u(x+he_k)-u(x)}{h}
}
$$
>
> と定める。
<!-- formal-statement-end -->

GPDE8 では、二階線形楕円型 PDE を弱形式へ落とし、

$$
\text{uniform ellipticity}
+\text{boundedness}
+\text{coercivity}
\Longrightarrow
u\in H_0^1(\Omega)
$$

という存在・一意性・安定性を得ました。

しかし元の方程式には二階微分が書かれています。弱解として存在するだけなら

$$
u\in H^1
$$

で十分でしたが、データや係数がもう少し滑らかなとき、

$$
\boxed{
\text{弱解 }u\in H^1
\quad\Longrightarrow\quad
u\in H^2_{\mathrm{loc}}
}
$$

まで正則性を回復できる場合があります。

本章の主役は **difference quotient（差分商）** です。

以下、ほとんど至る所（almost everywhere; a.e.）を a.e. と略記します。

微分 $\partial_k u$ がまだ一階しか分からない段階で、二階微分を直接書く代わりに

$$
D_h^k u(x)
=
\frac{u(x+he_k)-u(x)}{h}
$$

を使います。

流れは

$$
\boxed{
\text{cutoff}
\to
\text{difference quotient}
\to
\text{energy estimate}
\to
\text{一様 }L^2\text{ bound}
\to
\text{弱微分の存在}
}
$$

です。

特に Poisson 方程式

$$
-\Delta u=f
$$

について、$f\in L^2_{\mathrm{loc}}$ なら弱解が

$$
u\in H^2_{\mathrm{loc}}
$$

へ上がることを、差分商法で証明します。

一方で、

- 係数が jump する
- 境界に reentrant corner がある

といった場合には $H^2$ 正則性が壊れ得ます。

したがって本章の核心は、

$$
\boxed{
\text{存在に必要な仮定}
\neq
\text{正則性に必要な仮定}
}
$$

という点にあります。

---

## 1. interior regularity と boundary regularity を分ける

まず記号を固定します。

開集合 $U,V\subset\Omega$ に対し

$$
U\Subset V
$$

とは、$\overline U$ が $V$ の compact subset であることを表します。

したがって

$$
\operatorname{dist}(U,\partial V)>0.
$$

この正の距離があるため、小さな $h$ に対して

$$
x\in U
\Longrightarrow
x\pm he_k\in V
$$

を保証できます。

本章の主定理は **interior $H^2$ regularity** です。

つまり

$$
U\Subset V\Subset\Omega
$$

を固定し、境界 $\partial\Omega$ から離れた $U$ 上で $H^2$ regularity を示します。

これは global $H^2(\Omega)$ regularity とは別問題です。

境界まで $H^2$ を伸ばすには

- 境界の滑らかさ
- 境界条件
- 係数の境界近傍での正則性

が追加で必要です。

この区別を最後まで保ちます。

---

## 2. difference quotient を微分の代理にする

$e_k$ を第 $k$ 座標方向の単位ベクトルとします。



<!-- definition-example-start: def-gpde9-difference-quotient -->
### 最小例：$u(x)=x^2$

一変数で $u(x)=x^2$ なら

$$
D_hu(x)
=
\frac{(x+h)^2-x^2}{h}
=
2x+h.
$$

従って

$$
D_hu(x)\to2x=u'(x)
\qquad
(h\to0).
$$

difference quotient は「微分できると仮定して微分する」のではなく、平行移動だけで作れる量です。
<!-- definition-example-end -->

Sobolev 関数でも平行移動は意味を持つため、二階微分の存在をまだ知らない段階で

$$
D_h^k(\partial_j u)
$$

を調べることができます。

---

## 3. $H^1$ 関数の difference quotient は一階微分で抑えられる

まず smooth function について基本評価を作ります。

$U\Subset V$ とし、

$$
|h|<\operatorname{dist}(U,\partial V)
$$

とします。

滑らかな $u$ なら

$$
\begin{aligned}
D_h^k u(x)
&=
\frac1h
\int_0^h
\partial_k u(x+te_k)\,dt
\\
&=
\int_0^1
\partial_k u(x+the_k)\,dt.
\end{aligned}
$$

したがって

$$
|D_h^k u(x)|^2
\le
\int_0^1
|\partial_k u(x+the_k)|^2\,dt.
$$

積分して

$$
\|D_h^k u\|_{L^2(U)}
\le
\|\partial_k u\|_{L^2(V)}
$$

を得ます。

<a id="lem-gpde9-dq-bound"></a>

<!-- formal-statement-start -->
> **補題（H1 difference quotient estimate）**  
> $U\Subset V\subset\mathbb R^d$ とし、$u\in H^1(V)$ とする。十分小さい $|h|>0$ に対して
>
$$
\boxed{
\|D_h^k u\|_{L^2(U)}
\le
\|\partial_k u\|_{L^2(V)}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $u\in C^\infty(V)$ の場合は上の計算で示されました。

一般の $u\in H^1(V)$ を取ります。

$U\Subset W\Subset V$ を選び、$|h|$ を十分小さくして

$$
x\in U,\ 0\le t\le1
\Longrightarrow
x+the_k\in W
$$

とします。

GPDE3 の局所 mollification により、$u_\varepsilon\in C^\infty(W)$ で

$$
u_\varepsilon\to u
\quad\text{in }H^1(W)
$$

となる列を取れます。

smooth case から

$$
\|D_h^k u_\varepsilon\|_{L^2(U)}
\le
\|\partial_k u_\varepsilon\|_{L^2(W)}
$$

です。

固定した $h\ne0$ に対して平行移動は $L^2$ 連続なので

$$
D_h^k u_\varepsilon
\to
D_h^k u
\quad\text{in }L^2(U).
$$

また

$$
\partial_k u_\varepsilon
\to
\partial_k u
\quad\text{in }L^2(W).
$$

極限を取れば

$$
\|D_h^k u\|_{L^2(U)}
\le
\|\partial_k u\|_{L^2(W)}
\le
\|\partial_k u\|_{L^2(V)}.
$$

従って主張が得られます。
<!-- proof-end -->

この補題は後で

$$
\|D_h^k u\|_2
$$

を $h$ に依らず抑えるために使います。

---

## 4. difference quotient 版の部分積分

通常の部分積分では

$$
\int
(\partial_k u)v
=
-
\int
u(\partial_k v)
$$

でした。

difference quotient にも完全に対応する恒等式があります。

<a id="lem-gpde9-discrete-ibp"></a>

<!-- formal-statement-start -->
> **補題（difference quotient の部分積分）**  
> $u,v\in L^2(\mathbb R^d)$ とし、少なくとも一方が compact support を持つとする。$h\ne0$ に対して
>
$$
\boxed{
\int_{\mathbb R^d}
(D_h^k u)v\,dx
=
-
\int_{\mathbb R^d}
u(D_{-h}^k v)\,dx
}
$$
>
> が成り立つ。局所領域では、必要な平行移動が領域内部に収まる場合に同じ恒等式を使える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から

$$
\int
(D_h^k u)v
=
\frac1h
\int
\bigl(u(x+he_k)-u(x)\bigr)v(x)\,dx.
$$

第一項で

$$
y=x+he_k
$$

と変数変換すると

$$
\int
u(x+he_k)v(x)\,dx
=
\int
u(y)v(y-he_k)\,dy.
$$

従って

$$
\begin{aligned}
\int
(D_h^k u)v
&=
\frac1h
\int
u(y)
\bigl(v(y-he_k)-v(y)\bigr)\,dy
\\
&=
-
\int
u(y)
\frac{v(y)-v(y-he_k)}{h}\,dy
\\
&=
-
\int
u(D_{-h}^k v).
\end{aligned}
$$

これで示されました。
<!-- proof-end -->

この恒等式により、微分を test function 側へ移すのと同様に、difference quotient も反対向きの difference quotient として移せます。

---

## 5. difference quotient の一様 bound から弱微分を作る

次が正則性証明の出口です。

<a id="lem-gpde9-dq-criterion"></a>

<!-- formal-statement-start -->
> **補題（difference quotient criterion）**  
> $U\Subset V\subset\mathbb R^d$、$u\in L^2(V)$ とする。ある $M<\infty$、$h_0>0$ が存在して
>
$$
\|D_h^k u\|_{L^2(U)}
\le M
\qquad
(0<|h|<h_0)
$$
>
> が成り立つとする。
>
> このとき任意の $U'\Subset U$ に対して
>
$$
\partial_k u\in L^2(U')
$$
>
> であり、
>
$$
\boxed{
\|\partial_k u\|_{L^2(U')}
\le M
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$h_n\to0$ を取り、

$$
D_{h_n}^k u
$$

を $L^2(U)$ の有界列として扱います。

GPDE5 の [完備内積空間の有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を使って弱収束部分列を取り、その弱極限が distributional derivative $\partial_k u$ であることを [difference quotient の部分積分](#lem-gpde9-discrete-ibp)から確認します。

<!-- proof-start -->
### 証明

任意の列 $h_n\to0$ を

$$
0<|h_n|<h_0
$$

となるように取ります。

仮定から

$$
\|D_{h_n}^k u\|_{L^2(U)}
\le M.
$$

$L^2(U)$ は完備な内積空間なので、[完備内積空間の有界列から弱収束部分列](../GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)により部分列を取り直して、ある $g\in L^2(U)$ に対し

$$
D_{h_n}^k u
\rightharpoonup
g
\quad\text{weakly in }L^2(U)
$$

とできます。

$\varphi\in C_c^\infty(U')$ を取ります。

$n$ が十分大きければ $\varphi(\cdot-he_k)$ の support も $U$ に入ります。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)から

$$
\int_U
(D_{h_n}^k u)\varphi\,dx
=
-
\int_U
u(D_{-h_n}^k\varphi)\,dx.
$$

左辺は弱収束により

$$
\int_U g\varphi\,dx
$$

へ収束します。

一方、$\varphi$ は smooth なので

$$
D_{-h_n}^k\varphi
\to
\partial_k\varphi
$$

が一様収束し、特に $L^2$ 収束します。

したがって右辺は

$$
-
\int_U
u\,\partial_k\varphi\,dx
$$

へ収束します。

よって

$$
\int_U
g\varphi\,dx
=
-
\int_U
u\,\partial_k\varphi\,dx.
$$

これは $g$ が $u$ の第 $k$ 弱微分であることを意味します。

従って

$$
\partial_k u=g
\quad\text{a.e. on }U'.
$$

さらに [Hilbert norm の弱収束時の norm 評価](../GPDE6/index.md#lem-gpde6-weak-lsc)から

$$
\|\partial_k u\|_{L^2(U')}
\le
\|g\|_{L^2(U)}
\le
M.
$$

従って主張が得られます。
<!-- proof-end -->

この補題により、正則性証明の目標は

$$
\boxed{
\|D_h^k(\partial_j u)\|_{L^2(U)}
\le C
\quad\text{uniformly in }h
}
$$

を作ることへ変わります。

---

## 6. cutoff を掛ける理由

内部正則性では

$$
U\Subset V\Subset\Omega
$$

を固定します。

$\eta\in C_c^\infty(V)$ を

$$
0\le\eta\le1,
\qquad
\eta=1
\quad\text{on }U
$$

となるように取ります。

cutoff の役割は二つです。

1. test function の support を $V$ の内部に閉じ込める。
2. $U$ 上では $\eta=1$ なので、得られた weighted estimate をそのまま $U$ 上の estimate に戻す。

代償として

$$
\nabla\eta
$$

を含む誤差項が出ます。

したがって elliptic regularity では繰り返し

$$
\text{主項}
\quad\text{vs.}\quad
\nabla\eta\text{ を含む誤差項}
$$

という形の energy estimate が現れます。

---

## 7. Caccioppoli 型 estimate：まず一階 energy を局所化する

$u\in H^1(V)$ が

$$
-\Delta u=f
\quad\text{in }V
$$

の弱解であるとは、

$$
\int_V
\nabla u\cdot\nabla\varphi\,dx
=
\int_V
f\varphi\,dx
\qquad
(\forall \varphi\in H_0^1(V))
$$

を満たすことです。

$\eta\in C_c^\infty(V)$ に対して

$$
\varphi=\eta^2u
$$

を test します。

smooth multiplier の積の弱微分則から

$$
\nabla(\eta^2u)
=
\eta^2\nabla u
+
2\eta u\nabla\eta.
$$

よって

$$
\int_V
\eta^2|\nabla u|^2
+
2\int_V
\eta u\nabla u\cdot\nabla\eta
=
\int_V
f\eta^2u.
$$

<a id="prop-gpde9-caccioppoli-poisson"></a>

<!-- formal-statement-start -->
> **命題（Poisson 方程式の Caccioppoli 型 estimate）**  
> $u\in H^1(V)$、$f\in L^2(V)$ が
>
$$
-\Delta u=f
\quad\text{weakly in }V
$$
>
> を満たすとする。任意の $\eta\in C_c^\infty(V)$、$0\le\eta\le1$ に対して
>
$$
\boxed{
\int_V
\eta^2|\nabla u|^2
\le
4\int_V
|\nabla\eta|^2u^2
+
\int_V
\eta^2(f^2+u^2)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

弱形式へ $\varphi=\eta^2u$ を入れると

$$
\int
\eta^2|\nabla u|^2
=
-
2\int
\eta u\nabla u\cdot\nabla\eta
+
\int
f\eta^2u.
$$

第一項は

$$
\begin{aligned}
2|\eta u\nabla u\cdot\nabla\eta|
&\le
2\eta|u||\nabla u||\nabla\eta|
\\
&\le
\frac12\eta^2|\nabla u|^2
+
2u^2|\nabla\eta|^2.
\end{aligned}
$$

第二項は

$$
|f\eta^2u|
\le
\frac12\eta^2f^2
+
\frac12\eta^2u^2.
$$

従って

$$
\begin{aligned}
\int
\eta^2|\nabla u|^2
&\le
\frac12
\int
\eta^2|\nabla u|^2
+
2\int
u^2|\nabla\eta|^2
\\
&\qquad
+
\frac12
\int
\eta^2(f^2+u^2).
\end{aligned}
$$

左辺の半分を移項して 2 倍すれば

$$
\int
\eta^2|\nabla u|^2
\le
4\int
u^2|\nabla\eta|^2
+
\int
\eta^2(f^2+u^2).
$$

これで示されました。
<!-- proof-end -->

特に $U\Subset V$ に対し cutoff を

$$
\eta=1\text{ on }U,
\qquad
|\nabla\eta|
\le
C_{U,V}
$$

と取れば

$$
\boxed{
\|\nabla u\|_{L^2(U)}
\le
C_{U,V}
\left(
\|u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right)
}
$$

が得られます。

これが二階 estimate の下地です。

---

## 8. Poisson 方程式の内部 $H^2$ regularity

いよいよ

$$
-\Delta u=f
$$

の弱解から二階弱微分を作ります。

$U\Subset V\Subset\Omega$ を固定し、

$$
\eta\in C_c^\infty(V),
\qquad
\eta=1\text{ on }U
$$

とします。

第 $k$ 方向の difference quotient を

$$
w_h=D_h^k u
$$

と置きます。

固定した $h\ne0$ では、平行移動により $w_h\in H^1$ です。

test function として

$$
\boxed{
\varphi
=
-
D_{-h}^k(\eta^2 w_h)
}
$$

を使います。

この選び方が核心です。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)により、左辺の $\nabla u$ へ $D_h^k$ を移すと

$$
D_h^k\nabla u
=
\nabla D_h^k u
=
\nabla w_h
$$

が現れます。

つまり二階微分の近似が energy の主項になります。

<a id="thm-gpde9-poisson-interior-h2"></a>

<!-- formal-statement-start -->
> **定理（Poisson 方程式の interior H2 regularity）**  
> $\Omega\subset\mathbb R^d$ を開集合とし、
>
$$
u\in H^1_{\mathrm{loc}}(\Omega),
\qquad
f\in L^2_{\mathrm{loc}}(\Omega)
$$
>
> が
>
$$
-\Delta u=f
\quad\text{in }\mathcal D'(\Omega)
$$
>
> を満たすとする。
>
> このとき
>
$$
\boxed{
u\in H^2_{\mathrm{loc}}(\Omega)
}
$$
>
> である。
>
> さらに任意の
>
$$
U\Subset V\Subset\Omega
$$
>
> に対し、$U,V,d$ のみに依存する定数 $C$ が存在して
>
$$
\boxed{
\|u\|_{H^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

1. cutoff $\eta$ を取る。
2. $w_h=D_h^k u$ と置く。
3. $-D_{-h}^k(\eta^2w_h)$ を test する。
4. 左辺から $\eta^2|\nabla w_h|^2$ を得る。
5. 右辺は difference quotient estimate で $\nabla(\eta^2w_h)$ に戻す。
6. [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で $\|\eta\nabla w_h\|_2$ を吸収する。
7. $\|w_h\|_2$ は一階微分 $\|\partial_k u\|_2$ で一様に抑える。
8. [difference quotient criterion](#lem-gpde9-dq-criterion) で $\partial_k\partial_j u\in L^2$ を得る。
9. Caccioppoli estimate で $\|\nabla u\|_2$ を $\|u\|_2+\|f\|_2$ に戻す。

<!-- proof-start -->
### 証明

$U\Subset W\Subset V$ を取り、

$$
\eta\in C_c^\infty(W),
\qquad
0\le\eta\le1,
\qquad
\eta=1\text{ on }U
$$

とします。

$|h|$ を十分小さくして、$\operatorname{supp}\eta$ とその $\pm he_k$ 平行移動がすべて $V$ に入るようにします。

$$
w_h=D_h^k u
$$

と置きます。

まず distributional equation は $C_c^\infty(V)$ 上で

$
\int_V \nabla u\cdot\nabla\psi\,dx
=
\int_V f\psi\,dx
$

を意味します。

左辺は Cauchy--Schwarz により

$
\left|
\int_V \nabla u\cdot\nabla\psi
\right|
\le
\|\nabla u\|_{L^2(V)}
\|\nabla\psi\|_{L^2(V)},
$

右辺も

$
\left|
\int_V f\psi
\right|
\le
\|f\|_{L^2(V)}
\|\psi\|_{L^2(V)}
$

と評価できます。$H_0^1(V)$ は $C_c^\infty(V)$ の $H^1$-closure なので、この等式は密度と両辺の連続性により $H_0^1(V)$ の test function へ一意に拡張されます。

さらに $|h|$ を上で選んだ範囲に取れば $\eta^2w_h$ と必要な平行移動の support は $V$ 内にあり、

$
\varphi
=
-
D_{-h}^k(\eta^2w_h)
\in H_0^1(V)
$

です。したがってこの $\varphi$ を test できます。

弱形式は

$$
\int_V
\nabla u\cdot
\nabla\bigl(-D_{-h}^k(\eta^2w_h)\bigr)\,dx
=
\int_V
f\bigl(-D_{-h}^k(\eta^2w_h)\bigr)\,dx.
$$

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)を左辺へ使うと

$$
\int_V
D_h^k(\nabla u)
\cdot
\nabla(\eta^2w_h)\,dx
=
-
\int_V
fD_{-h}^k(\eta^2w_h)\,dx.
$$

しかも

$$
D_h^k(\nabla u)
=
\nabla(D_h^k u)
=
\nabla w_h.
$$

従って

$$
\int_V
\nabla w_h\cdot\nabla(\eta^2w_h)\,dx
=
-
\int_V
fD_{-h}^k(\eta^2w_h)\,dx.
$$

左辺を展開すると

$$
\int_V
\eta^2|\nabla w_h|^2\,dx
+
2\int_V
\eta w_h\nabla w_h\cdot\nabla\eta\,dx.
$$

ここで

$$
X
=
\|\eta\nabla w_h\|_{L^2(V)},
\qquad
Y
=
\|w_h\nabla\eta\|_{L^2(V)},
\qquad
F
=
\|f\|_{L^2(V)}
$$

と置きます。

cutoff の cross term は

$$
\left|
2\int
\eta w_h\nabla w_h\cdot\nabla\eta
\right|
\le
2XY.
$$

右辺について、difference quotient estimate を $\eta^2w_h$ に適用すると

$$
\|D_{-h}^k(\eta^2w_h)\|_2
\le
\|\partial_k(\eta^2w_h)\|_2.
$$

積の弱微分則から

$$
\partial_k(\eta^2w_h)
=
\eta^2\partial_kw_h
+
2\eta(\partial_k\eta)w_h.
$$

従って

$$
\|D_{-h}^k(\eta^2w_h)\|_2
\le
X+2Y.
$$

ゆえに

$$
X^2
\le
2XY
+
F(X+2Y).
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を使うと

$$
2XY
\le
\frac14X^2+4Y^2,
$$

$$
FX
\le
\frac14X^2+F^2,
$$

$$
2FY
\le
F^2+Y^2.
$$

したがって

$$
X^2
\le
\frac12X^2
+
5Y^2
+
2F^2.
$$

よって

$$
\boxed{
X^2
\le
10Y^2+4F^2
}.
$$

一方

$$
Y
\le
\|\nabla\eta\|_\infty
\|w_h\|_{L^2(W)}.
$$

第3節の difference quotient estimate から

$$
\|w_h\|_{L^2(W)}
=
\|D_h^ku\|_{L^2(W)}
\le
\|\partial_ku\|_{L^2(V)}.
$$

従って $h$ に依らない定数 $C$ により

$$
\|\eta\nabla w_h\|_{L^2(V)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|\nabla u\|_{L^2(V)}
\right).
$$

$\eta=1$ on $U$ なので

$$
\|D_h^k(\partial_j u)\|_{L^2(U)}
=
\|\partial_jw_h\|_{L^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|\nabla u\|_{L^2(V)}
\right)
$$

がすべての $j,k$ について成り立ちます。

右辺は $h$ に依りません。

[difference quotient criterion](#lem-gpde9-dq-criterion) を $\partial_j u$ へ適用すると

$$
\partial_k\partial_j u
\in
L^2(U)
$$

を得ます。

従って

$$
u\in H^2(U).
$$

しかも

$$
\|D^2u\|_{L^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|\nabla u\|_{L^2(V)}
\right).
$$

最後に $U\Subset W\Subset V$ として Caccioppoli estimate を $W$ に適用すれば

$$
\|\nabla u\|_{L^2(W)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right).
$$

これを上式へ代入し、$L^2$ 項と一階項も合わせれば

$$
\|u\|_{H^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right).
$$

$U\Subset\Omega$ は任意だったので

$$
u\in H^2_{\mathrm{loc}}(\Omega).
$$

証明完了です。
<!-- proof-end -->

ここで重要なのは、$f$ を difference quotient していないことです。

右辺

$$
\int
fD_{-h}^k(\eta^2w_h)
$$

をそのまま $L^2$-$L^2$ で評価し、difference quotient を test function 側の一階微分で抑えています。

したがって

$$
f\in L^2
$$

だけで二階正則性を得られます。

---

## 9. 一般の divergence form：係数の regularity が追加で必要になる

次に

$$
-\operatorname{div}(A(x)\nabla u)
=
f
$$

を考えます。

GPDE8 では

$$
A\in L^\infty,
\qquad
A\text{ uniformly elliptic}
$$

で弱解の存在まで進めました。

しかし difference quotient を掛けると

$$
D_h^k(A\nabla u)
$$

が現れます。

積を差分すると

$$
\boxed{
D_h^k(A\nabla u)(x)
=
A(x+he_k)D_h^k\nabla u(x)
+
(D_h^kA(x))\nabla u(x)
}
$$

です。

第一項は ellipticity により二階差分を支えます。

問題は第二項です。

$$
D_h^kA
$$

を $h$ に依らず抑えるには、係数 $A$ に追加 regularity が必要です。

本章では最も見通しのよい十分条件として、$A$ が局所 Lipschitz である場合を扱います。

<a id="prop-gpde9-variable-caccioppoli"></a>

<!-- formal-statement-start -->
> **命題（一般係数の Caccioppoli 型 estimate）**  
> $V\Subset\Omega$ とし、$A$ が
>
$$
|A(x)\xi|
\le
\Lambda|\xi|,
\qquad
\xi^{\mathsf T}A(x)\xi
\ge
\lambda|\xi|^2
$$
>
> を満たすとする。
>
> $u\in H^1(V)$、$f\in L^2(V)$ が
>
$$
-\operatorname{div}(A\nabla u)=f
$$
>
> の弱解なら、任意の $\eta\in C_c^\infty(V)$、$0\le\eta\le1$ に対し
>
$$
\boxed{
\int
\eta^2|\nabla u|^2
\le
C(\lambda,\Lambda)
\left[
\int
|\nabla\eta|^2u^2
+
\int
\eta^2(f^2+u^2)
\right]
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varphi=\eta^2u$ を test すると

$$
\int
A\nabla u\cdot
(\eta^2\nabla u+2\eta u\nabla\eta)
=
\int
f\eta^2u.
$$

一様楕円性から

$$
\int
\eta^2A\nabla u\cdot\nabla u
\ge
\lambda
\int
\eta^2|\nabla u|^2.
$$

cross term は

$$
\left|
2\int
\eta uA\nabla u\cdot\nabla\eta
\right|
\le
2\Lambda
\int
\eta|u||\nabla u||\nabla\eta|.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)により、任意の $\varepsilon>0$ に対して

$$
2\Lambda\eta|u||\nabla u||\nabla\eta|
\le
\varepsilon\eta^2|\nabla u|^2
+
C_{\varepsilon,\Lambda}
u^2|\nabla\eta|^2.
$$

$\varepsilon=\lambda/2$ と取れば主項へ吸収できます。

また

$$
|f\eta^2u|
\le
\frac12\eta^2f^2
+
\frac12\eta^2u^2.
$$

以上を合わせると

$$
\frac{\lambda}{2}
\int
\eta^2|\nabla u|^2
\le
C(\lambda,\Lambda)
\int
|\nabla\eta|^2u^2
+
\frac12
\int
\eta^2(f^2+u^2).
$$

定数をまとめれば主張が得られます。
<!-- proof-end -->

<a id="thm-gpde9-lipschitz-coefficient-h2"></a>

<!-- formal-statement-start -->
> **定理（局所 Lipschitz 係数の interior H2 regularity）**  
> $\Omega\subset\mathbb R^d$ を開集合とする。
>
> $A:\Omega\to\mathbb R^{d\times d}$ とする。任意の $V\Subset\Omega$ に対し、ある定数
>
$
0<\lambda_V\le \Lambda_V<\infty,
\qquad
L_V<\infty
$
>
> が存在し、$V$ 上の代表元について任意の $x,y\in V$、$\xi\in\mathbb R^d$ に対して
>
$
|A(x)\xi|
\le
\Lambda_V|\xi|,
\qquad
\xi^{\mathsf T}A(x)\xi
\ge
\lambda_V|\xi|^2,
$
>
$
|A(x)-A(y)|
\le
L_V|x-y|
$
>
> が成り立つとする。
>
> $u\in H^1_{\mathrm{loc}}(\Omega)$、$f\in L^2_{\mathrm{loc}}(\Omega)$ が
>
$$
-\operatorname{div}(A\nabla u)=f
\quad\text{weakly in }\Omega
$$
>
> を満たすとする。
>
> このとき
>
$$
\boxed{
u\in H^2_{\mathrm{loc}}(\Omega)
}.
$$
>
> さらに $U\Subset V\Subset\Omega$ に対し
>
$$
\boxed{
\|u\|_{H^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right)
}
$$
>
> が成り立つ。定数 $C$ は $U,V,d,\lambda_V,\Lambda_V,L_V$ に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

Poisson の証明と同じ test function

$$
-D_{-h}^k(\eta^2D_h^ku)
$$

を使います。

違いは

$$
D_h^k(A\nabla u)
=
A(\cdot+he_k)\nabla w_h
+
(D_h^kA)\nabla u
$$

という余分な項だけです。

係数 $A$ の局所 Lipschitz 性から

$$
\|D_h^kA\|_\infty
\le
L
$$

が $h$ に依らず成り立つため、その項は lower-order error として [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で吸収できます。

<!-- proof-start -->
### 証明

この証明では固定した $V\Subset\Omega$ 上の定数を

$
\lambda:=\lambda_V,
\qquad
\Lambda:=\Lambda_V,
\qquad
L:=L_V
$

と略記します。

$U\Subset W\Subset V$ を取り、

$$
\eta\in C_c^\infty(W),
\qquad
\eta=1\text{ on }U
$$

とします。

$$
w_h=D_h^ku
$$

と置き、Poisson の場合と同じく

$$
\varphi
=
-
D_{-h}^k(\eta^2w_h)
$$

を test します。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)から

$$
\int
D_h^k(A\nabla u)
\cdot
\nabla(\eta^2w_h)
=
-
\int
fD_{-h}^k(\eta^2w_h).
$$

積の difference quotient を展開すると

$$
D_h^k(A\nabla u)
=
A_h\nabla w_h
+
(D_h^kA)\nabla u,
$$

ただし

$$
A_h(x)=A(x+he_k).
$$

したがって

$$
\int
A_h\nabla w_h\cdot\nabla(\eta^2w_h)
+
\int
(D_h^kA)\nabla u\cdot\nabla(\eta^2w_h)
=
-
\int
fD_{-h}^k(\eta^2w_h).
$$

第一項を展開すると

$$
\int
\eta^2
A_h\nabla w_h\cdot\nabla w_h
+
2\int
\eta w_h
A_h\nabla w_h\cdot\nabla\eta.
$$

一様楕円性から

$$
\int
\eta^2
A_h\nabla w_h\cdot\nabla w_h
\ge
\lambda
\|\eta\nabla w_h\|_2^2.
$$

$X=\|\eta\nabla w_h\|_2$、$Y=\|w_h\nabla\eta\|_2$ と置くと cutoff error は

$$
\le
2\Lambda XY.
$$

$A$ の Lipschitz 定数を $L$ とすれば

$$
|D_h^kA(x)|
\le L
$$

なので係数差分項は

$$
\begin{aligned}
\left|
\int
(D_h^kA)\nabla u\cdot\nabla(\eta^2w_h)
\right|
&\le
L\|\nabla u\|_{L^2(W)}
\|\nabla(\eta^2w_h)\|_{L^2(W)}
\\
&\le
L\|\nabla u\|_{L^2(W)}
(X+2Y).
\end{aligned}
$$

右辺には Cauchy--Schwarz を使い、

$
\left|
\int
fD_{-h}^k(\eta^2w_h)
\right|
\le
\|f\|_2
\|D_{-h}^k(\eta^2w_h)\|_2.
$

さらに [H1 difference quotient estimate](#lem-gpde9-dq-bound) と積の弱微分則から

$
\begin{aligned}
\|D_{-h}^k(\eta^2w_h)\|_2
&\le
\|\partial_k(\eta^2w_h)\|_2
\\
&\le
\|\eta^2\partial_kw_h\|_2
+
2\|\eta(\partial_k\eta)w_h\|_2
\\
&\le
X+2Y.
\end{aligned}
$

したがって

$
\left|
\int
fD_{-h}^k(\eta^2w_h)
\right|
\le
\|f\|_2(X+2Y).
$

従って

$$
\lambda X^2
\le
2\Lambda XY
+
\bigl(
L\|\nabla u\|_2+\|f\|_2
\bigr)(X+2Y).
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で $X$ を含む項を左辺へ吸収すると

$$
X^2
\le
C
\left(
Y^2
+
\|\nabla u\|_{L^2(W)}^2
+
\|f\|_{L^2(V)}^2
\right),
$$

ここで $C$ は $\lambda,\Lambda,L$ に依存します。

さらに

$$
Y
\le
\|\nabla\eta\|_\infty
\|D_h^ku\|_{L^2(W)}
\le
C
\|\partial_ku\|_{L^2(V)}.
$$

従って

$$
\|\eta\nabla D_h^ku\|_2
\le
C
\left(
\|\nabla u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right)
$$

を $h$ に一様に得ます。

Poisson の場合と同じく [difference quotient criterion](#lem-gpde9-dq-criterion) を各 $\partial_ju$ に適用して

$$
D^2u\in L^2(U)
$$

を得ます。

最後に一般係数版 Caccioppoli estimate を使って

$$
\|\nabla u\|_{L^2(W)}
\le
C
\left(
\|u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right)
$$

とすれば

$$
\|u\|_{H^2(U)}
\le
C
\left(
\|u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right).
$$

$U\Subset\Omega$ は任意なので

$$
u\in H^2_{\mathrm{loc}}(\Omega).
$$

証明完了です。
<!-- proof-end -->

---

## 10. 反例：なぜ $L^\infty$ 係数だけでは $H^2$ に上がらないのか

GPDE8 の存在定理では $A\in L^\infty$ で十分でした。

しかし正則性では足りません。

一次元で

$$
\Omega=(-1,1)
$$

とし、

$$
a(x)
=
\begin{cases}
1,&x<0,\\
2,&x>0
\end{cases}
$$

とします。

これは

$$
1\le a(x)\le2
$$

なので一様楕円的です。

次に

$$
u(x)
=
\begin{cases}
x,&x\le0,\\
x/2,&x\ge0
\end{cases}
$$

と置きます。

すると

$$
u'(x)
=
\begin{cases}
1,&x<0,\\
1/2,&x>0
\end{cases}
$$

なので

$$
a(x)u'(x)=1
\quad\text{a.e.}
$$

です。

従って distribution の意味で

$$
-(a u')'=0.
$$

しかし $u'$ は $x=0$ で jump しています。

distributional second derivative は

$$
u''
=
-\frac12\delta_0
$$

を含むため

$$
u''\notin L^2(-1,1).
$$

したがって

$$
\boxed{
u\in H^1(-1,1)
\quad\text{だが}\quad
u\notin H^2(-1,1)
}
$$

です。

つまり

$$
\text{uniform ellipticity}+L^\infty\text{ coefficients}
$$

は弱解の存在には十分でも、$H^2$ regularity には十分ではありません。

---

## 11. 境界反例：interior $H^2$ があっても boundary $H^2$ は自動ではない

境界の角でも regularity は壊れます。

角度

$$
\omega>\pi
$$

の sector

$$
S_\omega
=
\{
(r,\theta):
0<r<1,\ 0<\theta<\omega
\}
$$

を考えます。

$$
\alpha
=
\frac{\pi}{\omega}
\in(0,1)
$$

とし、

$$
u(r,\theta)
=
r^\alpha\sin(\alpha\theta)
$$

と置きます。

これは sector の内部で harmonic です。

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

へ代入すると

$$
\Delta u=0.
$$

また二本の ray 上では

$$
u=0.
$$

原点近くで

$$
|\nabla u|
\asymp
r^{\alpha-1}
$$

なので

$$
\int_0^\varepsilon
r^{2\alpha-2}r\,dr
=
\int_0^\varepsilon
r^{2\alpha-1}\,dr
<\infty
$$

です。

従って $u\in H^1$ near the corner です。

一方

$$
|D^2u|
\asymp
r^{\alpha-2}
$$

なので

$$
\int_0^\varepsilon
r^{2\alpha-4}r\,dr
=
\int_0^\varepsilon
r^{2\alpha-3}\,dr.
$$

収束には

$$
2\alpha-3>-1
\iff
\alpha>1
$$

が必要ですが、$\alpha<1$ です。

従って

$$
u\notin H^2
$$

near the reentrant corner です。

これは本章の interior theorem と矛盾しません。

原点は domain の interior ではなく boundary point だからです。

さらに、interior difference quotient 法の証明機構そのものが角で壊れます。本章の主証明では

$
U\Subset V
$

を取り、cutoff の support とその $\pm he_k$ 平行移動がすべて $V$ の内部に残るように $h$ を選びました。ところが boundary point を含む近傍では、任意方向の平行移動が領域外へ出る可能性があり、この interior 用 test function をそのまま使えません。

滑らかな境界なら局所座標で境界を平坦化し、接線方向の difference quotient と方程式から法線方向の二階微分を回収する、という別の機構を使えます。しかし reentrant corner では頂点近傍を一枚の滑らかな graph として平坦化できません。したがって、ここで失われているのは単なる「境界からの距離」だけでなく、**boundary regularity を支える局所座標機構**です。

$
\boxed{
\text{interior regularity}
\text{ と }
\text{boundary regularity}
\text{ は別問題}
}
$

です。

### boundary regularity の正側はどこまで言えるか

失敗例だけで終わらせず、正側の標準形も位置付けます。

Poisson の零 Dirichlet 問題では、例えば $\Omega$ が bounded $C^{1,1}$ domain で

$
f\in L^2(\Omega),
\qquad
u\in H_0^1(\Omega),
\qquad
-\Delta u=f
$

を弱く満たすなら、標準的な global elliptic regularity theorem により

$
u\in H^2(\Omega)
$

が得られます。さらに

$
\|u\|_{H^2(\Omega)}
\le
C\|f\|_{L^2(\Omega)}
$

という global estimate が成立します。

ただし、この global theorem の完全証明には boundary flattening、局所座標変換、境界近傍での tangential difference quotient、法線方向の回収を組み合わせる必要があります。本章の中心技法である **interior difference quotient 法だけでは閉じない**ため、ここでは intentional black box とします。

本章で確定する境界は次です。

- interior $H^2$: 本章で完全証明する。
- reentrant corner での failure: 本章で直接検証する。
- $C^{1,1}$ boundary での global $H^2$: 標準結果として位置付けるが、証明は boundary regularity の後続拡張へ送る。

---

## 12. regularity の bootstrap と classical solution への戻り道

Poisson 方程式では

$
-\Delta u=f
$

です。

本章で完全証明したのは

$
f\in L^2_{\mathrm{loc}}
\Longrightarrow
u\in H^2_{\mathrm{loc}}
$

までです。ここで重要なのは、**$H^2$ になっただけでは一般次元で直ちに classical solution とは言えない**ことです。

さらに $f$ がより滑らかなら、difference quotient を高階微分へ反復する higher-order regularity により

$
f\in H^m_{\mathrm{loc}}
\Longrightarrow
u\in H^{m+2}_{\mathrm{loc}}
$

へ進めます。この反復の完全証明は multi-index bookkeeping を伴い、本章の主目的を越えるため intentional black box とします。追加前提は $f$ の高階 Sobolev regularity であり、証明機構は本章で行った差分商 estimate の反復です。

では、どの段階で classical solution に戻れるのでしょうか。

十分条件として、整数 $m$ が

$
m>\frac d2
$

を満たし、

$
f\in H^m_{\mathrm{loc}}(\Omega)
$

とします。higher-order regularity により

$
u\in H^{m+2}_{\mathrm{loc}}(\Omega)
$

まで上がったと仮定します。

このとき higher-order Sobolev embedding

$
H^m_{\mathrm{loc}}
\hookrightarrow
C^0_{\mathrm{loc}},
\qquad
H^{m+2}_{\mathrm{loc}}
\hookrightarrow
C^2_{\mathrm{loc}}
$

を使えば

$
f\in C^0_{\mathrm{loc}},
\qquad
u\in C^2_{\mathrm{loc}}
$

です。distribution の意味で

$
-\Delta u=f
$

だった等式の両辺は連続関数になったので、等式は各点で成り立ちます。したがって $u$ は classical solution です。

ここで使った higher-order Sobolev embedding は GPDE5 で扱った一次の embedding より先の一般形であり、本系列ではまだ完全証明を正本化していません。そのため、この段落は **weak solution から classical solution へ戻るために何が追加で必要かを示す bridge** であり、GPDE9 の証明依存にはしません。

流れをまとめると

$
\boxed{
\text{weak solution}
\to
H^2_{\mathrm{loc}}
\to
\text{higher Sobolev regularity}
\to
C^2_{\mathrm{loc}}
\to
\text{classical solution}
}
$

です。

ここで身につけるべき核は

$
\boxed{
\text{PDE を difference quotient した近似 energy estimate}
\Longrightarrow
\text{一段高い Sobolev regularity}
}
$

です。

この技法は後続の nonlinear PDE や時間発展 PDE でも形を変えて現れます。

---

## 13. どの仮定がどこで必要だったか

| 仮定・道具 | 使う場所 | 役割 |
|---|---|---|
| $u\in H^1$ | difference quotient | $D_hu$ を一階微分で一様評価する |
| $f\in L^2$ | Poisson $H^2$ estimate | 右辺を $L^2$-$L^2$ で評価する |
| $U\Subset V$ | cutoff / translation | 平行移動を境界に当てない |
| cutoff $\eta$ | local energy | test function を内部へ閉じ込める |
| uniform ellipticity | variable coefficient case | $\|\eta\nabla D_hu\|_2^2$ を下から支える |
| $A$ bounded | cutoff error | $A\nabla w\cdot\nabla\eta$ を評価する |
| $A$ locally Lipschitz | coefficient difference | $D_hA$ を $h$ に一様に抑える |
| difference quotient criterion | 最後の極限 | 一様差分 bound を弱微分の存在へ変える |
| 境界 regularity | global $H^2$ | interior theorem だけでは境界での特異性を除けない |

特に

$$
A\in L^\infty
$$

は weak formulation には十分でも、

$$
D_hA
$$

を制御できません。

この差が

$$
\text{existence theory}
\quad\text{と}\quad
\text{regularity theory}
$$

の仮定の差として現れます。

---

## 14. GPDE10 への橋：space regularity から time evolution へ

GPDE6--GPDE9 では

$$
\text{弱形式}
\to
\text{存在}
\to
\text{一意性}
\to
\text{正則性}
$$

という elliptic PDE の基本線を閉じました。

次の GPDE10 では時間変数を導入し、

$$
H_0^1(\Omega)
\subset
L^2(\Omega)
\subset
H^{-1}(\Omega)
$$

という Gelfand triple の上で

- Galerkin approximation
- energy estimate
- weak compactness
- limit passage

を使って evolution PDE の weak solution を構成します。

楕円型では difference quotient が「空間方向の追加 regularity」を回収しました。

時間発展問題では energy estimate が

$$
u,\quad
u_t
$$

を異なる関数空間で同時に制御する役割を担います。

---

## 15. 演習

### Level A

<a id="ex-gpde9-a01"></a>
#### GPDE9-A01 difference quotient の極限
- Level: A

一変数で

$$
u(x)=x^3
$$

とする。

1. $D_hu(x)$ を計算せよ。
2. $h\to0$ で $u'(x)$ へ収束することを確認せよ。
3. $D_hu-u'$ の大きさが $O(|h|)$ であることを示せ。

<!-- solution-start -->
**詳細解答**

定義から

$$
\begin{aligned}
D_hu(x)
&=
\frac{(x+h)^3-x^3}{h}
\\
&=
\frac{3x^2h+3xh^2+h^3}{h}
\\
&=
3x^2+3xh+h^2.
\end{aligned}
$$

一方

$$
u'(x)=3x^2.
$$

従って

$$
D_hu(x)-u'(x)
=
3xh+h^2
=
h(3x+h).
$$

したがって固定した bounded interval 上では

$$
|D_hu-u'|
\le
C|h|
$$

となり、

$$
D_hu\to u'
$$

が一様に成り立ちます。
<!-- solution-end -->

<a id="ex-gpde9-a02"></a>
#### GPDE9-A02 difference quotient の部分積分
- Level: A

$u,v\in C_c^\infty(\mathbb R^d)$ とする。

$$
\int
(D_h^ku)v
=
-
\int
u(D_{-h}^kv)
$$

を変数変換だけで証明せよ。

<!-- solution-start -->
**詳細解答**

$$
\begin{aligned}
\int
(D_h^ku)v
&=
\frac1h
\int
\bigl(u(x+he_k)-u(x)\bigr)v(x)\,dx
\\
&=
\frac1h
\left[
\int
u(x+he_k)v(x)\,dx
-
\int
u(x)v(x)\,dx
\right].
\end{aligned}
$$

最初の積分で $y=x+he_k$ と置くと

$$
\int
u(x+he_k)v(x)\,dx
=
\int
u(y)v(y-he_k)\,dy.
$$

従って

$$
\begin{aligned}
\int
(D_h^ku)v
&=
\frac1h
\int
u(y)
\bigl(v(y-he_k)-v(y)\bigr)\,dy
\\
&=
-
\int
u(y)
\frac{v(y)-v(y-he_k)}{h}\,dy
\\
&=
-
\int
u(D_{-h}^kv).
\end{aligned}
$$

これで示されました。
<!-- solution-end -->

<a id="ex-gpde9-a03"></a>
#### GPDE9-A03 Laplace 方程式の Caccioppoli estimate
- Level: A

$u\in H^1(V)$ が

$$
-\Delta u=0
$$

を弱く満たすとする。

$\eta\in C_c^\infty(V)$ に対し

$$
\int
\eta^2|\nabla u|^2
\le
4\int
u^2|\nabla\eta|^2
+
\int
\eta^2u^2
$$

を示せ。

さらに右辺の最後の $\int\eta^2u^2$ は、より鋭く見積もれば省けることを説明せよ。

<!-- solution-start -->
**詳細解答**

$\varphi=\eta^2u$ を test すると

$$
\int
\nabla u\cdot\nabla(\eta^2u)=0.
$$

積の微分から

$$
\nabla(\eta^2u)
=
\eta^2\nabla u
+
2\eta u\nabla\eta.
$$

従って

$$
\int
\eta^2|\nabla u|^2
=
-
2\int
\eta u\nabla u\cdot\nabla\eta.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)より

$$
2\eta|u||\nabla u||\nabla\eta|
\le
\frac12\eta^2|\nabla u|^2
+
2u^2|\nabla\eta|^2.
$$

したがって

$$
\int
\eta^2|\nabla u|^2
\le
\frac12
\int
\eta^2|\nabla u|^2
+
2\int
u^2|\nabla\eta|^2.
$$

移項して

$$
\int
\eta^2|\nabla u|^2
\le
4\int
u^2|\nabla\eta|^2.
$$

これは問題文の不等式より強い評価です。

一般の $f\ne0$ の Caccioppoli estimate では

$$
\int f\eta^2u
$$

を評価するため $\eta^2u^2$ 項が現れましたが、harmonic case ではその項自体がないため省けます。
<!-- solution-end -->

<a id="ex-gpde9-a04"></a>
#### GPDE9-A04 jump coefficient が $H^2$ を壊す
- Level: A

$$
a(x)
=
\begin{cases}
1,&x<0,\\
2,&x>0
\end{cases},
\qquad
u(x)
=
\begin{cases}
x,&x\le0,\\
x/2,&x\ge0
\end{cases}
$$

を $(-1,1)$ 上で考える。

1. $u\in H^1(-1,1)$ を確認せよ。
2. $a(x)u'(x)=1$ a.e. を示せ。
3. $-(au')'=0$ が distribution の意味で成り立つことを示せ。
4. $u\notin H^2(-1,1)$ を示せ。

<!-- solution-start -->
**詳細解答**

$u$ は $x=0$ で連続で、区分的に affine です。

弱微分は

$$
u'(x)
=
\begin{cases}
1,&x<0,\\
1/2,&x>0.
\end{cases}
$$

これは $L^2(-1,1)$ に属するので

$$
u\in H^1(-1,1).
$$

次に

$$
a(x)u'(x)
=
\begin{cases}
1\cdot1,&x<0,\\
2\cdot(1/2),&x>0
\end{cases}
=
1
$$

です。

したがって任意の $\varphi\in C_c^\infty(-1,1)$ に対し

$$
\langle -(au')',\varphi\rangle
=
\int_{-1}^1
au'\varphi'\,dx
=
\int_{-1}^1
\varphi'\,dx
=
0.
$$

よって

$$
-(au')'=0
$$

が distribution の意味で成り立ちます。

一方 $u'$ は 0 で

$$
1
\longrightarrow
\frac12
$$

と jump します。

jump の distribution derivative は jump size を係数とする Dirac delta なので

$$
u''
=
-\frac12\delta_0.
$$

$\delta_0\notin L^2$ だから

$$
u''\notin L^2(-1,1).
$$

従って

$$
u\notin H^2(-1,1).
$$

一様楕円性だけでは $H^2$ regularity を保証できないことが分かります。
<!-- solution-end -->

### Level B

<a id="ex-gpde9-b01"></a>
#### GPDE9-B01 difference quotient criterion
- Level: B

$U\Subset V$、$u\in L^2(V)$ とする。

ある $M>0$ に対し

$$
\|D_h^ku\|_{L^2(U)}
\le M
$$

が十分小さい $h\ne0$ で成り立つとする。

$U'\Subset U$ 上で

$$
\partial_ku\in L^2(U')
$$

を、弱コンパクト性と test function を用いて証明せよ。

<!-- solution-start -->
**詳細解答**

$h_n\to0$ を取ります。

$$
\|D_{h_n}^ku\|_{L^2(U)}
\le M
$$

なので、$L^2(U)$ の弱コンパクト性から部分列を取り

$$
D_{h_n}^ku
\rightharpoonup g
\quad\text{in }L^2(U)
$$

とできます。

$\varphi\in C_c^\infty(U')$ を取ります。

十分大きい $n$ では $\varphi(\cdot-he_k)$ の support は $U$ に入ります。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)から

$$
\int
(D_{h_n}^ku)\varphi
=
-
\int
uD_{-h_n}^k\varphi.
$$

左辺は

$$
\to
\int g\varphi.
$$

右辺では smoothness から

$$
D_{-h_n}^k\varphi
\to
\partial_k\varphi
\quad\text{in }L^2,
$$

したがって

$$
-\int
uD_{-h_n}^k\varphi
\to
-\int
u\partial_k\varphi.
$$

従って

$$
\int
g\varphi
=
-
\int
u\partial_k\varphi.
$$

これは

$$
g=\partial_ku
$$

が $U'$ 上の弱微分であることを示します。

さらに [Hilbert norm の弱収束時の norm 評価](../GPDE6/index.md#lem-gpde6-weak-lsc)から

$$
\|\partial_ku\|_{L^2(U')}
\le M.
$$

よって主張が得られます。
<!-- solution-end -->

<a id="ex-gpde9-b02"></a>
#### GPDE9-B02 Poisson の二階 difference quotient estimate
- Level: B

$u\in H^1(V)$、$f\in L^2(V)$ が

$$
-\Delta u=f
$$

を弱く満たすとする。

$U\Subset V$、$\eta\in C_c^\infty(V)$、$\eta=1$ on $U$ とする。

$$
w_h=D_h^ku
$$

と置き、

$$
\varphi=-D_{-h}^k(\eta^2w_h)
$$

を test して

$$
\|\eta\nabla w_h\|_2
\le
C
\left(
\|f\|_2+\|\nabla u\|_2
\right)
$$

を $h$ に一様に示せ。

<!-- solution-start -->
**詳細解答**

弱形式へ

$$
\varphi=-D_{-h}^k(\eta^2w_h)
$$

を入れます。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)から

$$
\int
\nabla w_h\cdot\nabla(\eta^2w_h)
=
-
\int
fD_{-h}^k(\eta^2w_h).
$$

左辺は

$$
\int
\eta^2|\nabla w_h|^2
+
2\int
\eta w_h\nabla w_h\cdot\nabla\eta.
$$

$$
X=\|\eta\nabla w_h\|_2,
\qquad
Y=\|w_h\nabla\eta\|_2,
\qquad
F=\|f\|_2
$$

と置くと

$$
X^2
\le
2XY
+
F
\|D_{-h}^k(\eta^2w_h)\|_2.
$$

difference quotient estimate より

$$
\|D_{-h}^k(\eta^2w_h)\|_2
\le
\|\partial_k(\eta^2w_h)\|_2
\le
X+2Y.
$$

よって

$$
X^2
\le
2XY+F(X+2Y).
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
X^2
\le
\frac12X^2
+
5Y^2
+
2F^2.
$$

従って

$$
X^2
\le
10Y^2+4F^2.
$$

さらに

$$
Y
\le
\|\nabla\eta\|_\infty
\|D_h^ku\|_2
\le
\|\nabla\eta\|_\infty
\|\partial_ku\|_2.
$$

したがって

$$
\|\eta\nabla w_h\|_2
\le
C
\left(
\|f\|_2
+
\|\nabla u\|_2
\right),
$$

しかも $C$ は $h$ に依存しません。

これが二階弱微分を作る一様 estimate です。
<!-- solution-end -->

<a id="ex-gpde9-b03"></a>
#### GPDE9-B03 variable coefficient の積の difference quotient
- Level: B

行列係数 $A$ と vector field $q$ に対して

$$
D_h^k(Aq)(x)
=
A(x+he_k)D_h^kq(x)
+
(D_h^kA(x))q(x)
$$

を示せ。

さらに $A$ が Lipschitz 定数 $L$ を持つなら

$$
|D_h^kA(x)|
\le L
$$

を示し、なぜこの評価が $H^2$ regularity に必要か説明せよ。

<!-- solution-start -->
**詳細解答**

定義から

$$
D_h^k(Aq)(x)
=
\frac{
A(x+he_k)q(x+he_k)-A(x)q(x)
}{h}.
$$

分子へ

$$
A(x+he_k)q(x)
$$

を足して引くと

$$
\begin{aligned}
& A(x+he_k)
\bigl(q(x+he_k)-q(x)\bigr)
\\
&\qquad+
\bigl(A(x+he_k)-A(x)\bigr)q(x).
\end{aligned}
$$

従って

$$
D_h^k(Aq)(x)
=
A(x+he_k)D_h^kq(x)
+
(D_h^kA(x))q(x).
$$

次に $A$ が Lipschitz なら

$$
|A(x+he_k)-A(x)|
\le
L|h|.
$$

よって

$$
|D_h^kA(x)|
=
\frac{|A(x+he_k)-A(x)|}{|h|}
\le L.
$$

この bound は $h$ に依存しません。

elliptic equation を difference quotient すると

$$
(D_h^kA)\nabla u
$$

という誤差項が現れます。

これを $L^2$ energy estimate の中で一様に抑えるため、

$$
\|D_h^kA\|_\infty
\le C
$$

が必要です。

$A\in L^\infty$ だけではこの量は $h\to0$ で発散し得るため、GPDE8 の存在仮定だけでは $H^2$ regularity を導けません。
<!-- solution-end -->

### Level C

<a id="ex-gpde9-c01"></a>
#### GPDE9-C01 局所 Lipschitz 係数の interior $H^2$
- Level: C

$U\Subset V\Subset\Omega$ とする。

$A$ は $V$ 上で

$$
|A(x)\xi|\le\Lambda|\xi|,
\qquad
\xi^{\mathsf T}A(x)\xi
\ge
\lambda|\xi|^2
$$

を満たし、Lipschitz 定数 $L$ を持つとする。

$u\in H^1(V)$、$f\in L^2(V)$ が

$$
-\operatorname{div}(A\nabla u)=f
$$

を弱く満たすとする。

difference quotient 法により

$$
u\in H^2(U)
$$

を示し、

$$
\|u\|_{H^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right)
$$

を導け。

<!-- solution-start -->
**詳細解答**

$U\Subset W\Subset V$ を取り、

$$
\eta\in C_c^\infty(W),
\qquad
\eta=1\text{ on }U
$$

とします。

$$
w_h=D_h^ku
$$

と置き

$$
\varphi
=
-
D_{-h}^k(\eta^2w_h)
$$

を弱形式へ入れます。

[difference quotient の部分積分](#lem-gpde9-discrete-ibp)により

$$
\int
D_h^k(A\nabla u)
\cdot
\nabla(\eta^2w_h)
=
-
\int
fD_{-h}^k(\eta^2w_h).
$$

積の差分公式から

$$
D_h^k(A\nabla u)
=
A_h\nabla w_h
+
(D_h^kA)\nabla u,
$$

ただし $A_h(x)=A(x+he_k)$ です。

よって

$$
\begin{aligned}
&\int
A_h\nabla w_h\cdot
\nabla(\eta^2w_h)
\\
&\qquad+
\int
(D_h^kA)\nabla u\cdot
\nabla(\eta^2w_h)
=
-
\int
fD_{-h}^k(\eta^2w_h).
\end{aligned}
$$

$$
X=\|\eta\nabla w_h\|_2,
\qquad
Y=\|w_h\nabla\eta\|_2
$$

と置きます。

一様楕円性により主項は

$$
\int
\eta^2A_h\nabla w_h\cdot\nabla w_h
\ge
\lambda X^2.
$$

cutoff error は

$$
\left|
2\int
\eta w_hA_h\nabla w_h\cdot\nabla\eta
\right|
\le
2\Lambda XY.
$$

係数 $A$ の局所 Lipschitz 性から

$$
\|D_h^kA\|_\infty\le L
$$

なので

$$
\left|
\int
(D_h^kA)\nabla u\cdot\nabla(\eta^2w_h)
\right|
\le
L\|\nabla u\|_2(X+2Y).
$$

右辺も

$$
\left|
\int
fD_{-h}^k(\eta^2w_h)
\right|
\le
\|f\|_2(X+2Y).
$$

従って

$$
\lambda X^2
\le
2\Lambda XY
+
\bigl(
L\|\nabla u\|_2+\|f\|_2
\bigr)(X+2Y).
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で $X$ を含む項を左辺へ吸収すると

$$
X^2
\le
C
\left(
Y^2
+
\|\nabla u\|_2^2
+
\|f\|_2^2
\right).
$$

一方

$$
Y
\le
\|\nabla\eta\|_\infty
\|D_h^ku\|_2
\le
C
\|\partial_ku\|_{L^2(V)}.
$$

したがって

$$
\|\eta\nabla D_h^ku\|_2
\le
C
\left(
\|\nabla u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right)
$$

が $h$ に一様に成り立ちます。

$\eta=1$ on $U$ なので、すべての $j,k$ に対し

$$
\|D_h^k(\partial_ju)\|_{L^2(U)}
\le
C
\left(
\|\nabla u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right).
$$

[difference quotient criterion](#lem-gpde9-dq-criterion) により

$$
\partial_k\partial_ju\in L^2(U).
$$

従って

$$
u\in H^2(U).
$$

最後に一般係数版 Caccioppoli estimate から

$$
\|\nabla u\|_{L^2(W)}
\le
C
\left(
\|u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right)
$$

なので

$$
\|D^2u\|_{L^2(U)}
\le
C
\left(
\|u\|_{L^2(V)}
+
\|f\|_{L^2(V)}
\right).
$$

$L^2$ 項・一階項も合わせて

$$
\boxed{
\|u\|_{H^2(U)}
\le
C
\left(
\|f\|_{L^2(V)}
+
\|u\|_{L^2(V)}
\right)
}
$$

を得ます。

定数 $C$ は $U,V,d,\lambda,\Lambda,L$ に依存しますが $u,f,h$ には依存しません。
<!-- solution-end -->

---

## 16. この章のまとめ

GPDE8 では

$$
\text{ellipticity}
\to
\text{coercivity}
\to
\text{weak existence}
$$

を扱いました。

GPDE9 では、その弱解へ difference quotient を入れて

$$
\text{weak solution}
\to
\text{difference quotient energy estimate}
\to
\text{uniform }L^2\text{ bound}
\to
\text{higher weak derivative}
$$

という regularity mechanism を作りました。

Poisson 方程式では

$$
\boxed{
f\in L^2_{\mathrm{loc}}
\Longrightarrow
u\in H^2_{\mathrm{loc}}
}
$$

が成り立ちます。

一般 divergence form では、さらに係数の difference quotient を抑える必要があり、本章では局所 Lipschitz 係数の下で

$$
\boxed{
-\operatorname{div}(A\nabla u)=f
\Longrightarrow
u\in H^2_{\mathrm{loc}}
}
$$

を示しました。

同時に

- jump coefficient
- reentrant corner

という二つの例から、regularity は自動ではないことも確認しました。

これで Encore III の elliptic branch は

$$
\boxed{
\text{weak formulation}
\to
\text{Lax--Milgram}
\to
\text{linear elliptic PDE}
\to
\text{elliptic regularity}
}
$$

まで閉じました。

次は GPDE10 で Galerkin・energy method・weak compactness を使い、時間発展 PDE の弱解構成へ進みます。
