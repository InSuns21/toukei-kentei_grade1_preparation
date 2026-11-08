# MFL13 Kernel積分作用素のbias

<!-- definition-example-audit: strict -->

## 1. グラフを作る前に、連続平均のずれを測る

[MFL12の円周差分](../MFL12/index.md#prop-mfl12-consistency)では、等間隔格子を細かくしたときの作用素誤差を計算した。実際の点群では点が不規則で、核の重みを使って近い点を平均する。この平均には、**標本を有限個しか取らないための偶然の誤差**と、**無限個の点が使えても核幅が正であるために残る系統的なずれ**がある。

後者が本章の **bias（偏り）** である。まず確率変動を除いた連続積分を正確に計算し、有限標本のvariance（分散）は次章で分けて扱う。

半径 $R$ の円周で関数 $f(\theta)=\cos\theta$ を局所平均すれば、山の頂上では少し低くなるはずだ。どれだけ低くなるのかは、核幅だけでなく、円周上の距離を使うか、平面内の直線距離を使うかにも依存する。

以下、$M$ は滑らかな $d$ 次元コンパクトRiemann多様体で、**境界がない**とする。連結性は必要としない。$d_g(x,y)$ は[MFL12で用いた計量](../MFL12/index.md#prop-mfl12-circle)から定まる測地距離、$dV_g$ は体積測度、符号は $\Delta_g=\operatorname{div}_g\nabla_g$（定数で0、非正のスペクトル）とする。正規座標には[GEO14の指数写像・正規座標](../../../幾何系/GEO/GEO14/index.md#def-geo14-normal-coordinates)を用いる。

## 2. 核幅を長さの二乗で表す

核幅 $\varepsilon>0$ の単位は長さの**二乗**である。$d_g(x,y)\sim\sqrt{\varepsilon}$ の点を主に平均するように、Gaussian核の指数を $-d_g(x,y)^2/(4\varepsilon)$ と決める。この選択によってEuclid空間では二階微分の前の係数が1になる。

<a id="def-mfl13-kernel"></a>

<!-- formal-statement-start -->
> **定義（内在Gaussian核と連続kernel平均）**  
> 境界のない滑らかなコンパクトRiemann多様体 $(M,g)$ の次元を $d$ とし、$\varepsilon>0$ とする。$x,y\in M$ に対し
>
$$
k_\varepsilon(x,y)=(4\pi\varepsilon)^{-d/2}
\exp\!\left(-\frac{d_g(x,y)^2}{4\varepsilon}\right)
$$
>
> を内在Gaussian核という。連続関数 $u$ の核積分作用素を
>
$$
G_\varepsilon u(x)=\int_M k_\varepsilon(x,y)u(y)\,dV_g(y)
$$
>
> とする。$p\ge0$、$\int_Mp\,dV_g=1$ の密度で観測するなら
>
$$
T_\varepsilon^p f(x)=G_\varepsilon(pf)(x),\qquad
P_\varepsilon^pf(x)=\frac{T_\varepsilon^pf(x)}{T_\varepsilon^p1(x)}
$$
>
> とする。後者は $p>0$ なら分母が正で定義できる。
<!-- formal-statement-end -->

**何を平均しているか。** $T_\varepsilon^pf(x)=\mathbb E[k_\varepsilon(x,X)f(X)]$ は一つのランダム標本 $X$ の**期待値**である。有限個の観測点 $X_1,\ldots,X_n$ の平均 $n^{-1}\sum_i k_\varepsilon(x,X_i)f(X_i)$ は別の対象である。$P_\varepsilon^p$ は重みの総和で割り、$P_\varepsilon^p1=1$ を正確に満たす。$G_\varepsilon1=1$ は曲がった多様体では一般に成立しない。

<!-- definition-example-start: def-mfl13-kernel -->
**直接例（円周上の定数）。** **定義の確認**：半径 $R>0$ の円周 $S_R^1$ はコンパクトで境界がなく、次元は1である。弧長 $s$ を測地距離の符号付き表示として $-\pi R\le s\le\pi R$ を取る。体積測度は $ds$ なので、$p=1/(2\pi R)>0$ は $\int p\,ds=1$ を満たし、

$$
G_\varepsilon1(x)=\frac1{\sqrt{4\pi\varepsilon}}
\int_{-\pi R}^{\pi R}e^{-s^2/(4\varepsilon)}ds>0,\quad
T_\varepsilon^p1(x)=\frac{G_\varepsilon1(x)}{2\pi R}>0.
$$

したがって定義の分母は確かに非零で、$P_\varepsilon^p1=1$ である。円周の弧長が $d_g$ へ入ること、密度の測度が $dV_g=ds$ であることをそれぞれ確認できた。
<!-- definition-example-end -->

**尺度の補助例。** 平坦な直線 $\mathbb R$ での同じ式を、積分可能なGaussian重みと $u(t)=t^2$ に適用してみる。$s=t-x$ と置き、二次モーメントを使えば

$$
(4\pi\varepsilon)^{-1/2}\int_{\mathbb R}e^{-s^2/(4\varepsilon)}
(x+s)^2\,ds=x^2+2\varepsilon.
$$

一次の $s$ は奇関数なので消える。biasは $2\varepsilon$ で、$u''(x)=2$ と一致する。直線はコンパクトでないが、ここでは核の定数と尺度を検算している。

## 3. 対称性で一次が消え、二階微分が残る

正規座標での局所積分をEuclid空間のGaussian平均へ戻す。そのための**モーメント**とは、Gaussian重み付きで $z_i$ や $z_iz_j$ を積分した数値のことである。

<a id="lem-mfl13-moments"></a>

<!-- formal-statement-start -->
> **補題（Gaussianの偶奇モーメント）**  
> $d\ge1$、$\varepsilon>0$、$z=(z_1,\ldots,z_d)\in\mathbb R^d$ とし、
>
$$
h_\varepsilon(z)=(4\pi\varepsilon)^{-d/2}e^{-|z|^2/(4\varepsilon)}
$$
>
> と置く。$1\le i,j\le d$ に対し
>
$$
\int_{\mathbb R^d}h_\varepsilon(z)\,dz=1,\quad
\int z_i h_\varepsilon(z)\,dz=0,\quad
\int z_i z_j h_\varepsilon(z)\,dz=2\varepsilon\delta_{ij}.
$$
>
> さらに $m=3,4$ に対し $C_{d,m}<\infty$ が存在して
>
$$
\int_{\mathbb R^d}|z|^m h_\varepsilon(z)\,dz=C_{d,m}\varepsilon^{m/2}.
$$
>
> 奇関数の積分が零である性質は、原点対称な球内にも成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各座標は分離される。一次は反転で消え、二次は一変数のGaussian積分を部分積分すればよい。三次・四次の絶対モーメントは $\sqrt\varepsilon$ 倍の変数変換で評価する。

<!-- proof-start -->
### 証明

一変数の正規化 $I=\int_{\mathbb R}e^{-t^2/(4\varepsilon)}dt=\sqrt{4\pi\varepsilon}$ を用いると、$d$ 次元の零次積分は $I^d/I^d=1$。$t\,e^{-t^2/(4\varepsilon)}$ は奇関数なので一次は0。$i\ne j$ の二次積分も、$z_i$ について奇関数なので0である。

対角成分では $\frac d{dt}e^{-t^2/(4\varepsilon)}=-t(2\varepsilon)^{-1}e^{-t^2/(4\varepsilon)}$ だから、境界項 $t e^{-t^2/(4\varepsilon)}\to0$ を使って

$$
\int_{\mathbb R}t^2e^{-t^2/(4\varepsilon)}dt
=-2\varepsilon\int_{\mathbb R}t\frac d{dt}e^{-t^2/(4\varepsilon)}dt
=2\varepsilon I.
$$

他の $d-1$ 座標を積分し、$I^d$ で割れば $2\varepsilon$。最後に $z=2\sqrt\varepsilon\,w$ とすると

$$
\int |z|^m h_\varepsilon(z)\,dz
=2^m\varepsilon^{m/2}\pi^{-d/2}\int_{\mathbb R^d}|w|^m e^{-|w|^2}\,dw.
$$

右の積分はGaussianの指数減衰で有限である。原点対称な球での零性も $z\mapsto-z$ で従う。$\square$
<!-- proof-end -->

二階Taylorの $\tfrac12\partial_{ij}u\,z_iz_j$ を積分すれば $\tfrac12\cdot2\varepsilon\sum_i\partial_{ii}u=\varepsilon\Delta u$ となる。ここから曲率を考えないと、一般の多様体では係数を一つ落とす。

## 4. 曲率は体積密度の二次項に現れる

[GEO14の正規座標](../../../幾何系/GEO/GEO14/index.md#thm-geo14-normal-coordinate-properties)では基点 $x$ で計量が単位行列、一次微分が0になる。しかし周辺の体積までEuclid空間と同じではない。[GEO16のRicci曲率・スカラー曲率](../../../幾何系/GEO/GEO16/index.md#def-geo16-ricci-scalar)が、その最初のずれを表す。

固定した $x$ の接空間に正規直交基底 $e_1,\ldots,e_d$ を選び、$z^i$ をその基底の成分とする。すなわち $z=\sum_{i=1}^d z^i e_i$、$y=\exp_x(z)$ である。以下、同じ上下の添字を反復するときは $i,j=1,\ldots,d$ について和を取る（例えば $z^i e_i=\sum_i z^i e_i$）。体積要素を $dV_g(y)=J_x(z)\,dz^1\cdots dz^d$ と表すと、$J_x$ は指数写像による体積の拡大率である。

**座標表示から体積の判定へ。** 指数写像の微分 $d(\exp_x)_z:T_xM\to T_yM$ は接ベクトルを移す線形写像である。その基底表示を $A_x(z)$ とし、引き戻した計量の行列を $g_{ij}(z)=g_y(d\exp_x(e_i),d\exp_x(e_j))$ と書く。$T_yM$ 側に正規直交基底を選べば $(g_{ij})=A_x^{\mathsf T}A_x$ なので、

$$
J_x(z)=\sqrt{\det(g_{ij}(z))}=|\det A_x(z)|.
$$

したがってJacobi場から $d\exp_x$ の行列を求め、その行列式を展開すれば、体積密度の定義を判定できる。原点では $d(\exp_x)_0$ が恒等写像なので $J_x(0)=1$ である。

<a id="lem-mfl13-volume"></a>

<!-- formal-statement-start -->
> **補題（正規座標における体積密度の二次展開）**  
> 境界のない滑らかなコンパクト $d$ 次元Riemann多様体 $(M,g)$ の各点 $x$ で、十分小さい一様な半径 $\rho>0$ の正規座標球を取る。$z\in B_\rho(0)\subset T_xM$ について
>
$$
J_x(z)=1-\frac16\sum_{i,j=1}^d
\operatorname{Ric}_x(e_i,e_j)z^iz^j+R_x(z),
\qquad |R_x(z)|\le C|z|^3.
$$
>
> 定数 $C$ と $\rho$ は $x$ に依らず選べる。$d=1$ ではRicci曲率は0なので二次項も0である。
<!-- formal-statement-end -->

### 証明の見取り図

指数写像の微分を測地線の小さな変分で調べる。接線に垂直なベクトルの広がりはJacobi方程式で三次まで展開でき、広がりの行列式の二次係数がRicci曲率の跡になる。正曲率では測地球の体積がEuclid空間より小さくなる符号が重要である。

<!-- proof-start -->
### 証明

$z=tv$、$t\ge0$、$|v|=1$ とし、$\gamma(s)=\exp_x(sv)$ を考える。

この方向について正規直交基底を $e_1=v$、$e_a\perp v$（$a=2,\ldots,d$）と取り直し、$e_a$ を $\gamma$ に沿って平行移動して $E_a(s)$ と書く。体積を表す行列式もRicci曲率の跡も、この正規直交基底の取り方に依存しない。

測地線の初速度をわずかに変える変分の微分 $Y_a(s)$ は、[GEO16のRiemann曲率作用素](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)で変分の二つの微分順序を交換すると

$$
D_s^2Y_a+R(Y_a,\dot\gamma)\dot\gamma=0,\quad
Y_a(0)=0,\quad D_sY_a(0)=e_a
$$

を満たす。ここで $D_s$ は測地線に沿う共変微分を意味する。具体的には初速度を $v+\lambda e_a$ と変える測地線変分を取る。

$$
F(s,\lambda)=\exp_x(s(v+\lambda e_a)),\qquad
Y=\partial_\lambda F,\quad V=\partial_sF.
$$

$s$ は測地線上の位置、$\lambda$ は初速度を変える変数であり、先ほどの $t=|z|$ と区別する。$D_s=\nabla_V$、$D_\lambda=\nabla_Y$ はそれぞれ他方の変数を固定した共変微分である。

測地線性から $D_sV=0$、捩率0から $D_sY=D_\lambda V$ なので、[Riemann曲率作用素の定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)を使うと

$$
D_s^2Y=D_sD_\lambda V=D_\lambda D_sV+R(V,Y)V=-R(Y,V)V
$$

となる。$D_s^2Y_a(0)=0$、さらに $s$ で微分すると $D_s^3Y_a(0)=-R(e_a,v)v$ なので、平行移動した基底で

$$
Y_a(t)=tE_a(t)-\frac{t^3}{6}R(E_a(t),\dot\gamma(t))\dot\gamma(t)+O(t^4).
$$

接空間の点 $tv$ を $e_a$ 方向へ動かす指数写像の微分は $Y_a(t)/t$ であり、放射方向の微分は長さ1の $\dot\gamma(t)$。したがって、平行な正規直交基底で表した $d\exp_x|_{tv}$ の行列は、垂直成分において

$$
I-\frac{t^2}{6}\bigl(\langle R(e_a,v)v,e_b\rangle\bigr)_{a,b=2}^d+O(t^3).
$$

前述の $J_x=|\det A_x|$ を適用する。$A_x(0)=I$ で行列式は原点近くで正なので絶対値を外せる。$B_{ba}=-\langle R(e_a,v)v,e_b\rangle/6$ と置けば、行列式の多重線形性より

$$
\det(I+t^2B+O(t^3))=1+t^2\sum_{a=2}^d B_{aa}+O(t^3).
$$

したがって、[Ricci曲率の正規直交基底での定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-ricci-scalar)を $e_1=v$ として使うと

$$
J_x(tv)=1-\frac{t^2}{6}
\sum_{a=2}^d\langle R(e_a,v)v,e_a\rangle+O(t^3)
=1-\frac{t^2}{6}\operatorname{Ric}_x(v,v)+O(t^3).
$$

$t^2\operatorname{Ric}(v,v)=\operatorname{Ric}_{ij}z^iz^j$ と書き直す。滑らかさとコンパクト性から、正規座標の半径・Taylor剰余の上界を有限個の近傍で共通に選べる。$d=1$ では垂直成分が存在せず、Ricciの和は空和で0。$\square$
<!-- proof-end -->

**球面での直接確認。** 半径 $R$ の球面では、$x$ からの測地距離を $r=R\varphi$ とすると[MFL12の球面の面積要素](../MFL12/index.md#prop-mfl12-sphere)から

$$
dV_g=R\sin(r/R)\,dr\,d\theta,\qquad
dz^1dz^2=r\,dr\,d\theta.
$$

ゆえに $J_x(z)=R\sin(r/R)/r=1-r^2/(6R^2)+O(r^4)$。

半径 $R$ の球面は断面曲率 $1/R^2$ なので、[定断面曲率空間の Ricci 曲率とスカラー曲率](../../../幾何系/GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)（次元 $d=2$）より $\operatorname{Ric}=R^{-2}g$。したがって $-\operatorname{Ric}_{ij}z^iz^j/6=-r^2/(6R^2)$。抽象式の符号と係数を手で検証できる。

## 5. kernel積分のbiasを一つずつ集める

関数 $u$ を正規座標へ引き戻し、$u(\exp_x z)$ を2次Taylor展開する。正規座標の原点では[Laplace–Beltrami作用素の座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)が $\Delta_gu(x)=\sum_i\partial_{ii}u(0)$ へ簡約される。体積補正と関数の二階微分が同じ $\varepsilon$ 次で寄与する。

<a id="thm-mfl13-bias"></a>

<!-- formal-statement-start -->
> **定理（内在kernel積分作用素のbias展開）**  
> $(M,g)$ は滑らかな境界なしコンパクト $d$ 次元Riemann多様体、$u\in C^3(M)$ は実数値関数とする。[定義した内在Gaussian核](#def-mfl13-kernel)について、$\varepsilon\downarrow0$ で各 $x\in M$ に一様に
>
$$
\boxed{G_\varepsilon u(x)=u(x)+\varepsilon
\left(\Delta_gu(x)-\frac13\operatorname{Scal}(x)u(x)\right)
+O(\varepsilon^{3/2}).}
$$
>
> 特に $p\in C^3(M)$ が正で $\int_Mp\,dV_g=1$、$f\in C^3(M)$ なら
>
$$
T_\varepsilon^pf(x)=p(x)f(x)+\varepsilon
\left[\Delta_g(pf)(x)-\frac13\operatorname{Scal}(x)p(x)f(x)\right]
+O(\varepsilon^{3/2}).
$$
>
> $O$ の定数は固定した $(M,g),u$（後者では $p,f$）に依存するが、$x$ と十分小さい $\varepsilon$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

半径 $\rho$ の正規座標球の外は指数減衰で無視できる。内部では $u$ の2次Taylor式と[体積密度の二次式](#lem-mfl13-volume)を掛け、[Gaussianの二次モーメント](#lem-mfl13-moments)を使う。三次絶対モーメントが剰余の $\varepsilon^{3/2}$ を作る。

<!-- proof-start -->
### 証明

一様な正規座標半径 $\rho>0$ を十分小さく固定する。$M\setminus B_\rho(x)$ では $d_g(x,y)\ge\rho$。$M$ の体積と $u$ の上界が有限だから、外側の積分の絶対値は

$$
\le(4\pi\varepsilon)^{-d/2}\operatorname{Vol}(M)\|u\|_\infty
e^{-\rho^2/(4\varepsilon)}=O(e^{-\rho^2/(8\varepsilon)}).
$$

最後の上界は、$\varepsilon^{-d/2}e^{-\rho^2/(8\varepsilon)}$ が小さい $\varepsilon$ で有界なことから従う。

正規座標内では[正規座標での距離公式](../../../幾何系/GEO/GEO14/index.md#cor-geo14-normal-distance)により $d_g(x,\exp_xz)=|z|$。$u_x(z)=u(\exp_xz)$ と置く。

基点 $x$ を固定し、正規座標 $z$ の成分について偏微分した値を

$$
u_i(x)=\frac{\partial u_x}{\partial z^i}(0),\qquad
u_{ij}(x)=\frac{\partial^2u_x}{\partial z^i\partial z^j}(0)
$$

と定める。第4節で宣言した反復添字の和の規約を使い、Taylorの定理を展開点 $0$、次数 $2$ に用いると

$$
u_x(z)=u(x)+u_i(x)z^i+\frac12u_{ij}(x)z^iz^j+O(|z|^3).
$$

$u\in C^3$ とコンパクト性により三次剰余は一様である。[体積密度の展開](#lem-mfl13-volume)を掛けると

$$
u_x(z)J_x(z)=u+u_iz^i+
\left(\frac12u_{ij}-\frac16u\,\operatorname{Ric}_{ij}\right)z^iz^j
+O(|z|^3).
$$

ここで $u,u_i,u_{ij},\operatorname{Ric}_{ij}$ は基点 $x$ で評価した量。積の三次以上には $u_i z^i\cdot\operatorname{Ric}_{jk}z^jz^k$ も含まれ、一様な $O(|z|^3)$ でまとめられる。球 $|z|<\rho$ は対称なので一次の積分は0。球外へGaussianモーメントを延長する誤差は指数的に小さい。[Gaussianの偶奇モーメント](#lem-mfl13-moments)より

$$
\begin{aligned}
G_\varepsilon u(x)
&=u+\varepsilon\sum_i u_{ii}
-\frac{\varepsilon}{3}u\sum_i\operatorname{Ric}_{ii}
+O(\varepsilon^{3/2})\\
&=u+\varepsilon\left(\Delta_gu-\frac13\operatorname{Scal}\,u\right)
+O(\varepsilon^{3/2}).
\end{aligned}
$$

[正規座標の基点での基本性質](../../../幾何系/GEO/GEO14/index.md#thm-geo14-normal-coordinate-properties)により、原点では $g^{ij}=\delta^{ij}$、Christoffel係数が0である。[Laplace–Beltramiの座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)から二階偏微分の跡は $\Delta_g u$、[スカラー曲率の定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-ricci-scalar)からRicci成分の跡は $\operatorname{Scal}$ となる。最後に $u=pf$ は $C^3$ であり、同じ計算を適用する。$\square$
<!-- proof-end -->

三つの寄与を整理しておこう。

- 関数の曲がり：$\varepsilon\Delta_g u$。
- 体積の曲がり：$-\varepsilon\operatorname{Scal}u/3$。
- $u=pf$ としたときの標本密度の変化：$\Delta_g(pf)$ に含まれる。

例えば半径 $R$ の球面では[定断面曲率空間の Ricci 曲率とスカラー曲率](../../../幾何系/GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)から $\operatorname{Scal}=2/R^2$ なので

$$
G_\varepsilon1=1-\frac{2\varepsilon}{3R^2}+O(\varepsilon^{3/2}).
$$

$\Delta_g1=0$ でも $G_\varepsilon1$ は一般に1でない。**距離Gaussianを積分しただけでは定数を保つ作用素にならない**ことが分かる。

## 6. 正規化しても非一様密度は残る

実際に使いやすいのは、各点で重みの総和で割る $P_\varepsilon^p$ である。この操作で定数関数のずれは消える。ただし密度の勾配まで消えるわけではない。

<a id="prop-mfl13-row"></a>

<!-- formal-statement-start -->
> **命題（行正規化の一次bias）**  
> $(M,g)$ を滑らかな境界なしコンパクト $d$ 次元Riemann多様体とし、$p\in C^3(M)$ は $\int_M p\,dV_g=1$ と $p(x)\ge p_{\min}>0$ を満たす密度、$f\in C^3(M)$ とする。[内在Gaussian核の行正規化](#def-mfl13-kernel)について、十分小さい $\varepsilon>0$ に対して $T_\varepsilon^p1(x)>0$ であり、各 $x$ に一様に
>
$$
\boxed{P_\varepsilon^pf(x)
=f(x)+\varepsilon\left(\Delta_gf(x)
+2\langle\nabla_g\log p(x),\nabla_gf(x)\rangle_g\right)
+O(\varepsilon^{3/2}).}
$$
>
> したがって $(P_\varepsilon^pf-f)/\varepsilon$ は右辺の括弧へ一様に近づく。$P_\varepsilon^p1=1$ は各 $\varepsilon$ で厳密に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[核平均の展開](#thm-mfl13-bias)を分子へ $u=pf$、分母へ $u=p$ として適用する。分数を一次まで展開すると曲率項が相殺する一方、積の微分から $2\nabla p\cdot\nabla f$ が残る。

<!-- proof-start -->
### 証明

$A=\Delta_g(pf)-\operatorname{Scal}\,pf/3$、$B=\Delta_gp-\operatorname{Scal}\,p/3$ とおくと

$$
T_\varepsilon^pf=pf+\varepsilon A+O(\varepsilon^{3/2}),\quad
T_\varepsilon^p1=p+\varepsilon B+O(\varepsilon^{3/2}).
$$

$p\ge p_{\min}$ と $B$ の有界性により、後者は十分小さい $\varepsilon$ で $p_{\min}/2$ 以上。$(p+\delta)^{-1}=p^{-1}-\delta p^{-2}+O(\delta^2)$ に $\delta=\varepsilon B+O(\varepsilon^{3/2})$ を代入すると

$$
P_\varepsilon^pf=f+\varepsilon\left(\frac Ap-\frac{fB}{p}\right)
+O(\varepsilon^{3/2}).
$$

曲率項は $(-\operatorname{Scal}pf/3)/p-f(-\operatorname{Scal}p/3)/p=0$。座標で積の二階微分を展開し、[Riemannian 発散の座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)を適用すると

$$
\Delta_g(pf)=p\Delta_gf+f\Delta_gp
+2\langle\nabla_gp,\nabla_gf\rangle_g.
$$

したがって $A/p-fB/p=\Delta_gf+2p^{-1}\langle\nabla_gp,\nabla_gf\rangle_g$。$p>0$ から $\nabla_g\log p=p^{-1}\nabla_gp$ であり結論を得る。$f=1$ については積分の定義から分子と分母が一致する。$\square$
<!-- proof-end -->

**円周の非一様密度。** 半径 $R>0$ の円周で $p(\theta)=(1+a\cos\theta)/(2\pi R)$、$|a|<1$、$f(\theta)=\cos\theta$ とする。$p>0$ で $\int p\,dV_g=1$。[$\Delta_g=R^{-2}\partial_{\theta\theta}$](../MFL12/index.md#prop-mfl12-circle)、$\langle\nabla u,\nabla v\rangle_g=R^{-2}u_\theta v_\theta$ を使う。ここで下添字 $\theta$ は角度 $\theta$ での微分（$u_\theta=du/d\theta$）、$\partial_{\theta\theta}$ は同じ角度に関する二階微分を意味する。したがって、$\theta=\pi/2$ では

$$
\Delta_gf=0,\quad
(\log p)_\theta=-a,\quad f_\theta=-1,\quad
\frac{P_\varepsilon^pf-f}{\varepsilon}\longrightarrow\frac{2a}{R^2}.
$$

一様密度 $a=0$ ならこの位置の一次biasは0だが、$a\ne0$ では密度が大きい側へ平均が傾く。密度補正を一般化するのはMFL15である。

## 7. 点群で使う直線距離では係数が変わる

内在核は測地距離を知っている理想模型である。観測点で普通に計算できるのは、周囲のEuclid空間で測る直線距離（chord）である。円周上の弧長 $s=R\theta$ とchordの二乗は、近い点で一致するのは二次までである。

<a id="prop-mfl13-chord"></a>

<!-- formal-statement-start -->
> **命題（埋め込み円周の距離によるbiasの差）**  
> 半径 $R>0$ の円周 $S_R^1\subset\mathbb R^2$ 上の固定点 $x$ を取り、$dV_g$ を弧長測度とする。内在距離を用いた $G_\varepsilon$ と、同じ正規化係数 $(4\pi\varepsilon)^{-1/2}$ のまま距離を $|x-y|_{\mathbb R^2}$ へ置き換えた $\widetilde G_\varepsilon$ について
>
$$
G_\varepsilon1(x)=1+O(e^{-c/\varepsilon}),\qquad
\widetilde G_\varepsilon1(x)=1+\frac{\varepsilon}{4R^2}+O(\varepsilon^2)
$$
>
> が成り立つ（$c>0$ は $R$ のみに依存）。これは一般の埋め込み多様体で曲率係数が内在核と同じであることを意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

弧長 $s\in[-\pi R,\pi R]$ では内在核は一次元Gaussianの切断積分。chordの二乗 $4R^2\sin^2(s/(2R))$ を四次まで展開すると、指数で $s^4/\varepsilon$ の補正が残る。Gaussian四次モーメントが係数を決める。

<!-- proof-start -->
### 証明

円周の弧長の差を $s$ とすると $d_g(x,y)=|s|$（最短弧の範囲）なので

$$
G_\varepsilon1(x)=\int_{-\pi R}^{\pi R}
\frac{e^{-s^2/(4\varepsilon)}}{\sqrt{4\pi\varepsilon}}\,ds
=1+O(e^{-c/\varepsilon}).
$$

最後の誤差は $|s|\ge\pi R$ のGaussian尾部で評価する。一方chordは

$$
4R^2\sin^2\frac{s}{2R}
=s^2-\frac{s^4}{12R^2}+O(s^6/R^4).
$$

したがってGaussianが効く $|s|=O(\sqrt\varepsilon)$ で

$$
\exp\!\left(-\frac{|x-y|^2}{4\varepsilon}\right)
=e^{-s^2/(4\varepsilon)}
\left[1+\frac{s^4}{48R^2\varepsilon}
+O\!\left(\frac{s^6}{\varepsilon}+\frac{s^8}{\varepsilon^2}\right)\right].
$$

これは局所の展開であり、例えば $|s|\le\varepsilon^{2/5}$ とその外に分けると、外側は指数的に小さく、内部の剰余はGaussianの六次・八次モーメントにより積分後 $O(\varepsilon^2)$ となる。一次元Gaussianの四次モーメントは二次モーメントをもう一度部分積分して $12\varepsilon^2$。よって

$$
\widetilde G_\varepsilon1
=1+\frac{12\varepsilon^2}{48R^2\varepsilon}+O(\varepsilon^2)
=1+\frac{\varepsilon}{4R^2}+O(\varepsilon^2).
$$

$d=1$ では内在Ricci曲率が0なのに、埋め込みの曲がりによって四次の距離誤差がbiasへ寄与している。$\square$
<!-- proof-end -->

同じ円でも **内在的な曲率（1次元Ricciは0）** と **平面内での曲がり（半径 $R$）** は違う。この区別はkernelから連続作用素を推定するときの基本になる。

## 8. 数値実験：係数を確かめる

同じフォルダの [kernel_bias_lab.py](kernel_bias_lab.py) はPython標準ライブラリだけを使い、円周で内在・chord核の定数関数の平均と、非一様密度での行正規化を台形公式で計算する。

次のプリセットは同じ Python コードをブラウザ内で実行する。計算点数・半径・密度振幅は引数欄で変更できる。数値積分の解像度を上げると計算時間も増える。

```python-file-lab
# lab-id: MFL13-KERNEL-BIAS-FILE
# lab-title: Kernel bias・内在核とchord核
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL13/kernel_bias_lab.py
# timeout-ms: 60000
# lab-preset: 標準・16384点 | --radius 2 --points 16384 --amplitude 0.3
# lab-preset: 軽量・4096点 | --radius 2 --points 4096 --amplitude 0.3
# lab-preset: 密度一様・4096点 | --radius 2 --points 4096 --amplitude 0
```

ローカル実行とテストは次で確認できる。

~~~bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL13/kernel_bias_lab.py
python3 -m unittest discover -s textbook/volumes/dream_thater/応用系/MFL/MFL13 -p 'test_*.py'
~~~

内在核の定数誤差は指数的に小さく、chord核の $(\widetilde G_\varepsilon1-1)/\varepsilon$ は $1/(4R^2)$ に近づく。密度のある円周では $(P_\varepsilon^pf-f)/\varepsilon$ が $2a/R^2$ に近づく。これらは**連続積分の数値近似**であり、ランダム点群の保証やスペクトル収束の実証ではない。

## 9. 演習

<a id="ex-mfl13-a01"></a>

### MFL13-A01 Gaussianの尺度

- Level: A
- 問題: 一次元密度 $h_\varepsilon(s)=(4\pi\varepsilon)^{-1/2}e^{-s^2/(4\varepsilon)}$ に対し、$\int h_\varepsilon=1$、$\int s\,h_\varepsilon=0$、$\int s^2h_\varepsilon=2\varepsilon$ を示し、$u(t)=3t^2+t+1$ のGaussian平均を厳密に計算せよ。

<!-- solution-start -->
**詳細解答**。[Gaussianモーメント](#lem-mfl13-moments)の一次元の場合を再計算する。$s=2\sqrt\varepsilon\,w$ で零次は $\pi^{-1/2}\int e^{-w^2}dw=1$。一次は奇関数で0。二次は

$$
\int s^2h_\varepsilon ds=4\varepsilon\pi^{-1/2}
\int w^2e^{-w^2}dw
=4\varepsilon\pi^{-1/2}\frac{\sqrt\pi}{2}=2\varepsilon,
$$

最後の積分は $w^2e^{-w^2}=-\tfrac12 w(e^{-w^2})'$ を部分積分した。$u(x+s)=3x^2+6xs+3s^2+x+s+1$ の各項を積分し、奇数次を消すと $G_\varepsilon u(x)=3x^2+x+1+6\varepsilon$。
<!-- solution-end -->

<a id="ex-mfl13-a02"></a>

### MFL13-A02 正規化の分母

- Level: A
- 問題: コンパクト境界なし多様体上で $p>0$ とし、[核の定義](#def-mfl13-kernel)により $P_\varepsilon^p1=1$ を示せ。また、密度が一様でも $G_\varepsilon1=1$ とは限らない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$T_\varepsilon^p1(x)=\int k_\varepsilon(x,y)p(y)dV_g(y)>0$。$P_\varepsilon^p1=T_\varepsilon^p1/T_\varepsilon^p1=1$。一方、$G_\varepsilon1$ の積分測度は体積測度で、[内在kernel積分作用素のbias展開](#thm-mfl13-bias)より $1-\varepsilon\operatorname{Scal}(x)/3+O(\varepsilon^{3/2})$ となる。例えば半径 $R$ の球面では $\operatorname{Scal}=2/R^2>0$ なので、十分小さい $\varepsilon$ に対し1とは等しくない。
<!-- solution-end -->

<a id="ex-mfl13-a03"></a>

### MFL13-A03 球面の体積歪み

- Level: A
- 問題: 半径 $R$ の球面の極座標で、基点からの距離 $r=R\varphi$ として $J(r)=R\sin(r/R)/r$ を計算せよ。$r=0$ の値と二次係数を求めよ。

<!-- solution-start -->
**詳細解答**。[球面の体積要素](../MFL12/index.md#prop-mfl12-sphere)で $dV_g=R^2\sin\varphi\,d\varphi d\theta=R\sin(r/R)\,dr d\theta$。接平面の極座標面積 $r\,dr d\theta$ で割ると $J(r)=R\sin(r/R)/r$。$\sin t=t-t^3/6+O(t^5)$ を $t=r/R$ に代入すれば

$$
J(r)=\frac{r-r^3/(6R^2)+O(r^5/R^4)}r
=1-\frac{r^2}{6R^2}+O(r^4/R^4).
$$

よって $J(0)=1$（連続延長）、二次係数は $-1/(6R^2)$ である。
<!-- solution-end -->

<a id="ex-mfl13-a04"></a>

### MFL13-A04 正規化後の密度drift

- Level: A
- 問題: 半径 $R$ の円周で $p(\theta)=(1+a\cos\theta)/(2\pi R)$（$|a|<1$）、$f(\theta)=\cos\theta$ とする。$\theta=\pi/2$ における $\Delta_g f$ と $2\langle\nabla\log p,\nabla f\rangle$ を別々に計算せよ。

<!-- solution-start -->
**詳細解答**。[円周の計量とLaplace–Beltrami作用素](../MFL12/index.md#prop-mfl12-circle)を使い、$\theta$ で微分すると

$$
\Delta_gf=-\frac{\cos\theta}{R^2},
\qquad
p_\theta=-\frac{a\sin\theta}{2\pi R},
\qquad
(\log p)_\theta=\frac{p_\theta}{p}
=-\frac{a\sin\theta}{1+a\cos\theta}.
$$

したがって $\theta=\pi/2$ では $\Delta_g f=0$、$(\log p)_\theta=-a$、$f_\theta=-\sin\theta=-1$。計量 $g_{\theta\theta}=R^2$ の逆成分は $g^{\theta\theta}=R^{-2}$ なので

$$
2\langle\nabla_g\log p,\nabla_gf\rangle_g
=\frac{2}{R^2}(-a)(-1)=\frac{2a}{R^2}.
$$

$|a|<1$ より $1+a\cos\theta>0$ で、対数と除算も定義される。
<!-- solution-end -->

<a id="ex-mfl13-b01"></a>

### MFL13-B01 bias展開の係数

- Level: B
- 問題: $u\in C^3(M)$ の正規座標Taylor式 $u_x(z)=u+u_i z^i+\tfrac12u_{ij}z^iz^j+O(|z|^3)$ と $J=1-\operatorname{Ric}_{ij}z^iz^j/6+O(|z|^3)$ を掛け、Gaussian平均の $\varepsilon$ 係数を求めよ。なぜ剰余が $O(\varepsilon^{3/2})$ となるか、球外の寄与とともに述べよ。

<!-- solution-start -->
**詳細解答**。定数項 $u$、一次 $u_iz^i$、二次 $\frac12u_{ij}z^iz^j-\frac16u\operatorname{Ric}_{ij}z^iz^j$ が残り、残りは、一次と二次の積が三次以上なので $O(|z|^3)$。対称球では一次の積分が0。[モーメント補題](#lem-mfl13-moments)で $z^iz^j$ は $2\varepsilon\delta_{ij}$ を生む。したがって係数は $\sum_i u_{ii}-u\sum_i\operatorname{Ric}_{ii}/3=\Delta_gu-\operatorname{Scal}u/3$。三次絶対モーメントは $C\varepsilon^{3/2}$、固定半径 $\rho$ の外側は $O(\varepsilon^{-d/2}e^{-\rho^2/(4\varepsilon)})$ で任意のべきより小さい。これが[定理](#thm-mfl13-bias)の誤差の根拠である。
<!-- solution-end -->

<a id="ex-mfl13-b02"></a>

### MFL13-B02 分子と分母からdriftを作る

- Level: B
- 問題: $p>0$、$p,f\in C^3(M)$ とする。$G_\varepsilon(pf)/G_\varepsilon p$ の一次展開を自力で導出し、$f\equiv1$ の場合に係数が0であることを確かめよ。

<!-- solution-start -->
**詳細解答**。[kernel bias定理](#thm-mfl13-bias)を $pf$、$p$ の順に適用する。基点 $x$ の値で

$$
A=\Delta_g(pf)-\frac13\operatorname{Scal}\,pf,
\qquad B=\Delta_gp-\frac13\operatorname{Scal}\,p
$$

と置く。$p>0$ とコンパクト性により分母は十分小さい $\varepsilon$ で一様に正であり、逆数展開から

$$
\frac{pf+\varepsilon A+O(\varepsilon^{3/2})}
{p+\varepsilon B+O(\varepsilon^{3/2})}
=f+\varepsilon(A-fB)/p+O(\varepsilon^{3/2}).
$$

曲率を含む二項は相殺する。[Laplace–Beltramiの座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)で $\Delta(pf)=p\Delta f+f\Delta p+2\langle\nabla p,\nabla f\rangle$ を確認すると、係数は $\Delta f+2\langle\nabla\log p,\nabla f\rangle$。$f=1$ なら $\Delta1=0$、$\nabla1=0$ で0、比も正確に1である。
<!-- solution-end -->

<a id="ex-mfl13-b03"></a>

### MFL13-B03 球面で定数関数を積分する

- Level: B
- 問題: 半径 $R$ の球面で測地距離を用い、$G_\varepsilon1(x)=\frac{1}{4\pi\varepsilon}\int_0^\pi e^{-R^2\varphi^2/(4\varepsilon)}2\pi R^2\sin\varphi\,d\varphi$ を出発点として、$1-2\varepsilon/(3R^2)+O(\varepsilon^2)$ を直接導け。

<!-- solution-start -->
**詳細解答**。$r=R\varphi$ に変換すると

$$
G_\varepsilon1=\frac{1}{2\varepsilon}
\int_0^{\pi R}e^{-r^2/(4\varepsilon)}R\sin(r/R)\,dr.
$$

$R\sin(r/R)=r-r^3/(6R^2)+O(r^5/R^4)$。上限を無限大へ延長する誤差は指数的に小さい。$v=r^2/(4\varepsilon)$ で

$$
\int_0^\infty re^{-r^2/(4\varepsilon)}dr=2\varepsilon,\quad
\int_0^\infty r^3e^{-r^2/(4\varepsilon)}dr
=8\varepsilon^2\int_0^\infty ve^{-v}dv=8\varepsilon^2.
$$

$r^5$ の積分は $O(\varepsilon^3)$ なので、$1/(2\varepsilon)$ を掛ければ

$$
G_\varepsilon1=1-\frac{1}{2\varepsilon}\frac{8\varepsilon^2}{6R^2}
+O(\varepsilon^2)=1-\frac{2\varepsilon}{3R^2}+O(\varepsilon^2).
$$

これは[体積密度の曲率補正](#lem-mfl13-volume)の直接検算である。
<!-- solution-end -->

<a id="ex-mfl13-b04"></a>

### MFL13-B04 弧長とchordの四次差

- Level: B
- 問題: 半径 $R$ の円周で弧長差 $s$ に対応するchordの二乗を四次まで展開し、同じ一次元Gaussianの規格化で積分した定数関数のbiasを求めよ。内在距離との相違を説明せよ。

<!-- solution-start -->
**詳細解答**。$|x-y|=2R|\sin(s/(2R))|$ なので

$$
|x-y|^2=4R^2\left[\frac{s^2}{4R^2}-\frac{s^4}{48R^4}+O(s^6/R^6)\right]
=s^2-\frac{s^4}{12R^2}+O(s^6/R^4).
$$

指数に入れると $-s^2/(4\varepsilon)+s^4/(48R^2\varepsilon)+O(s^6/\varepsilon)$。Gaussianの $\int s^4h_\varepsilon ds=12\varepsilon^2$ は部分積分で得られる。従って増分は $(12\varepsilon^2)/(48R^2\varepsilon)=\varepsilon/(4R^2)$。残りの項は六次・八次モーメントから $O(\varepsilon^2)$、遠い弧は指数減衰する。内在弧長では切断Gaussianの尾部しか差がなく、$G_\varepsilon1=1+O(e^{-c/\varepsilon})$。正曲率の球面での内在補正と同じものと解釈してはならない。
<!-- solution-end -->

<a id="ex-mfl13-c01"></a>

### MFL13-C01 球面で内在核とambient核を比べる

- Level: C
- 問題: 半径 $R>0$ の球面 $S_R^2\subset\mathbb R^3$ の固定点 $x$ で、$k_\varepsilon$ の距離をambientの $|x-y|$ に置き換えた $\widetilde G_\varepsilon$ を考える（規格化は $(4\pi\varepsilon)^{-1}$ のまま）。次を示せ。

  1. 極角 $\varphi$ で $|x-y|^2=2R^2(1-\cos\varphi)$。
  2. 厳密な積分値 $\widetilde G_\varepsilon1(x)=1-e^{-R^2/\varepsilon}$。
  3. 内在核の定数のbiasとの違いと、いずれからも有限点群の固有値収束が直ちに従わない理由。

<!-- solution-start -->
**詳細解答**。（1）$x$ を北極 $(0,0,R)$ として、球面の点を $(R\sin\varphi\cos\theta,R\sin\varphi\sin\theta,R\cos\varphi)$ と置く。[球面の計量](../MFL12/index.md#prop-mfl12-sphere)から内積 $x\cdot y=R^2\cos\varphi$。よって $|x-y|^2=|x|^2+|y|^2-2x\cdot y=2R^2(1-\cos\varphi)$。

（2）同じ[体積要素](../MFL12/index.md#prop-mfl12-sphere)で $\theta$ を積分し、$t=\cos\varphi$、$dt=-\sin\varphi\,d\varphi$ と変数変換すると

$$
\begin{aligned}
\widetilde G_\varepsilon1(x)
&=\frac{2\pi R^2}{4\pi\varepsilon}
\int_0^\pi e^{-R^2(1-\cos\varphi)/(2\varepsilon)}
\sin\varphi\,d\varphi\\
&=\frac{R^2}{2\varepsilon}\int_{-1}^1
e^{-R^2(1-t)/(2\varepsilon)}\,dt\\
&=\frac{R^2}{2\varepsilon}
\left[\frac{2\varepsilon}{R^2}e^{-R^2(1-t)/(2\varepsilon)}
\right]_{t=-1}^{t=1}
=1-e^{-R^2/\varepsilon}.
\end{aligned}
$$

（3）[B03](#ex-mfl13-b03)では測地距離の核が $1-2\varepsilon/(3R^2)+O(\varepsilon^2)$ だった。ambient核は一次の係数が0で、差は $2\varepsilon/(3R^2)+O(\varepsilon^2)$。同じ球面でも距離の選択でbiasが異なる。ここでは固定 $x$ における**連続積分**しか評価していない。有限標本には確率誤差、分母の非零性、$n$ と $\varepsilon$ の同時極限が必要であり、固有値・固有空間についてはさらに作用素ノルムやスペクトルの隔たり等の別の議論が必要である。
<!-- solution-end -->

## 10. 次に確率誤差を調べる

本章で証明したのは、固定した滑らかな $f,p$ と小さい $\varepsilon$ に対する連続作用素のbiasである。実際の点群では $G_\varepsilon(pf)$ は観測できず、その標本平均を使うため、varianceと確率的な集中が加わる。MFL14ではtest点と標本点そのものの違いも含めて評価し、MFL15で非一様密度のdriftを補正する条件を求める。
