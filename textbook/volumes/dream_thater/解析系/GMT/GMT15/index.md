# GMT15 密度と近似接平面

<!-- definition-example-audit: strict -->

[GMT13の接平面](../GMT13/index.md#def-gmt13-tangent-plane)は、可算整流可能集合を双Lipschitz片で表し、パラメータ写像の微分像として定めました。しかし、最初からパラメータ表示を知らない集合に対し、**小球の中の点が本当に一つの平面へ集中しているか**を調べたいとき、この定義だけでは幾何が見えません。

[GMT1の上・下密度](../GMT1/index.md#def-gmt1-upper-lower-density)は、小球内の質量が半径の何乗で減るかを測ります。本講義では、その「量」と「向き」を結びます。局所有限な面積を持つ可算整流可能集合では、ほとんどすべての点で小球内の面積が平面の面積に近付き、平面から一定角度以上外れた部分の面積は無視できることを証明します。

以下、整数 $1\le m\le d$ とし、$B(x,r)$ は $\mathbb R^d$ の開球です。$\mathcal H^m$ は [MT8の直径によるHausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)、$\mathcal L^m$ は Lebesgue測度です。[GMT10の平面上の比例定数](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を

$$
c_m=\mathcal H^m([0,1]^m),\qquad
\mathcal H^m\llcorner V=c_m\mathcal L^m_V
$$

とします。ここで $V$ は原点を通る $m$ 次元平面、$\mathcal L^m_V$ は等長座標で移した Lebesgue測度、$\omega_m=\mathcal L^m(B_{\mathbb R^m}(0,1))$ です。従って平面の半径 $r$ の球は

$$
\mathcal H^m(V\cap B(0,r))=c_m\omega_m r^m.
$$

$\mathcal H^m$ を無言で $\mathcal L^m$ と同一視せず、以下ではこの係数を最後まで残します。$m=1$ では $c_1=1,\ \omega_1=2$ です。

## 1. 半径の縮小から見える「面積の厚さ」

例えば長い直線上で中心を動かさず球の半径を半分にすると、球内の長さも半分になります。平面の一部分でも同様に、$m$ 次元の量はおおむね $r^m$ に比例します。ただし、二本の線が交差する点では二枚分を数えます。

集合 $E\subset\mathbb R^d$ が Borel で、各有界球 $B(0,R)$ に対し $\mathcal H^m(E\cap B(0,R))<\infty$ とします。これを **局所有限な $m$ 次元面積**という条件として用い、$\mu=\mathcal H^m\llcorner E$ と書きます。こうすれば $\mu$ は局所有限な正Radon測度となり、[GMT1の球測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)を使えます。

既習の $\underline\Theta^m(\mu,x)$、$\overline\Theta^m(\mu,x)$ は球質量を $(2r)^m$ で割ります。一方、実際の $m$ 平面と比較するため、分母を $c_m\omega_mr^m$ とする相対密度も併記します。後者で「1」は、局所的に一枚の平面と同じ量があることを表します。

<a id="def-gmt15-plane-density"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff面積の平面基準密度）**
> $1\le m\le d$、$E\subset\mathbb R^d$ を Borel集合、$\mu=\mathcal H^m\llcorner E$ とする。$x\in\mathbb R^d$ における平面基準の下密度と上密度を

$$
\underline D^m(E,x)=\liminf_{r\downarrow0}
\frac{\mu(B(x,r))}{c_m\omega_mr^m},
\qquad
\overline D^m(E,x)=\limsup_{r\downarrow0}
\frac{\mu(B(x,r))}{c_m\omega_mr^m}
$$

> とする。両者が一致するとき $D^m(E,x)$ と書く。$\Theta^m$ が存在する場合との関係は

$$
D^m(E,x)=\frac{2^m}{c_m\omega_m}\Theta^m(\mu,x)
$$

> である。値は $[0,\infty]$ に属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt15-plane-density -->
### 直接例：一枚の直線と交差する二本の直線

$m=1,d=2$ とし、$E_1=\mathbb R\times\{0\}$、$E_2=E_1\cup(\{0\}\times\mathbb R)$ とします。どちらも Borel で、各有界球との交差の長さは有限です。$0$ を中心とした半径 $r$ の球内には、$E_1$ の場合は長さ $2r$、$E_2$ の場合は交差点の重複を除いて長さ $4r$ があります。従って

$$
D^1(E_1,0)=\frac{2r}{2r}=1,\qquad
D^1(E_2,0)=\frac{4r}{2r}=2.
$$

分母は直線一本の長さであって平面全体の面積ではありません。交点では「何枚の直線が通るか」が値に現れます。なお、$E_2$ の原点は $\mathcal H^1$-零の例外点です。
<!-- definition-example-end -->

一般のRadon測度 $\nu$ を用いた $\Theta^m(\nu,x)$ と、特に $\mathcal H^m\llcorner E$ の値は異なる問いです。例えば $\nu=3\mathcal H^1\llcorner E_1$ では $m=1$ の密度は3であり、整流可能性から任意の測度の密度が1になるとはいえません。

## 2. 近似接平面は「円錐の外に面積が残らない」こと

接線に近い点だけを集める領域を角度で記述します。$V\subset\mathbb R^d$ が原点を通る $m$ 次元線形部分空間、$x\in\mathbb R^d$、$0<\varepsilon<1$ とします。$y-x$ の $V$ に直交する成分の長さは $\operatorname{dist}(y-x,V)$ です。従って

$$
X(x,V,\varepsilon)
=\{x\}\cup\{y\ne x:
\operatorname{dist}(y-x,V)<\varepsilon|y-x|\}
$$

は、$x+V$ を中心とする両側の開いた円錐状領域です。$\varepsilon$ が小さいほど細くなります。「外側に残る面積」を比べるには、分母と同じ $r^m$ で割ります。

<a id="def-gmt15-approximate-tangent"></a>

<!-- formal-statement-start -->
> **定義（面積測度による近似接m平面）**
> $E\subset\mathbb R^d$ は Borel集合、$\mu=\mathcal H^m\llcorner E$ は局所有限とする。$x\in E$ で $0<\underline D^m(E,x)\le\overline D^m(E,x)<\infty$ が成立すると仮定する。$m$ 次元線形部分空間 $V$ が $x$ における **近似接$m$平面**であるとは、すべての $0<\varepsilon<1$ に対し

$$
\lim_{r\downarrow0}
\frac{\mu(B(x,r)\setminus X(x,V,\varepsilon))}{r^m}=0
$$

> となることをいう。実際のアフィン平面は $x+V$ である。分母を $\mu(B(x,r))$ に置き換えても、この上下密度の仮定の下では同値である。
<!-- formal-statement-end -->

ここで正で有限な上下密度は、分母の交換を許す条件です。実際、十分小さい $r$ では定数 $a,b>0$ が存在して

$$
ar^m\le\mu(B(x,r))\le br^m
$$

となり、どちらの比の極限が0かは一致します。点が円錐の外に存在してもよく、**その部分の $m$ 次元面積が $r^m$ より速く消える**ことを求めています。

<!-- definition-example-start: def-gmt15-approximate-tangent -->
### 直接例：放物線の原点

$P=\{(t,t^2):|t|\le1\}$、$x=(0,0)$、$V=\mathbb R\times\{0\}$ とします。[GMT12のグラフ整流可能性](../GMT12/index.md#prop-gmt12-c1-graphs)により $P$ は可算1整流可能です。[GMT11の曲線の面積公式](../GMT11/index.md#thm-gmt11-area-formula)で $\phi(t)=(t,t^2)$ の速度を計算すると

$$
|\phi'(t)|=\sqrt{1+4t^2}.
$$

$P\cap B(0,r)$ のパラメータ範囲は $|t|<\rho_r$、$\rho_r^2+\rho_r^4=r^2$ で、$\rho_r/r\to1$ です。従って

$$
\frac{\mathcal H^1(P\cap B(0,r))}{2r}
=\frac1{2r}\int_{-\rho_r}^{\rho_r}
\sqrt{1+4t^2}\,dt\longrightarrow1.
$$

一方、$t\ne0$ なら

$$
\frac{\operatorname{dist}(\phi(t),V)}{|\phi(t)|}
=\frac{t^2}{\sqrt{t^2+t^4}}
=\frac{|t|}{\sqrt{1+t^2}}\le|t|.
$$

与えた $\varepsilon$ に対し $r<\varepsilon$ なら、$P\cap B(0,r)$ の点は全て $X(0,V,\varepsilon)$ に入ります。従って円錐外の測度は実際に0です。局所有限性、正で有限な密度、全ての $\varepsilon$ での円錐条件を個別に確認しました。
<!-- definition-example-end -->

## 3. 一枚の双Lipschitz片を拡大して平面と比較する

まず、他の曲面が重ならない一枚だけを考えます。[GMT13の双Lipschitz分割](../GMT13/index.md#lem-gmt13-bilipschitz-pieces)を用いれば、可算整流可能集合の面積の大部分はこの形になります。以下の補題が本講義の計算の核心です。

<a id="lem-gmt15-chart-blowup"></a>

<!-- formal-statement-start -->
> **補題（双Lipschitz片の小球面積と円錐）**
> $A\subset\mathbb R^m$ を Borel集合、$\phi:A\to\mathbb R^d$ を双Lipschitz写像とし、全空間へのLipschitz拡張を持つとする。$a\in A$ が $A$ のLebesgue密度1の点で、拡張が $a$ で微分可能、$D\phi(a)$ がrank $m$、さらに $J_mD\phi$ のLebesgue点であるとする。$x=\phi(a)$、$V=\operatorname{im}D\phi(a)$、$M=\phi(A)$ とすると

$$
\lim_{r\downarrow0}\frac{\mathcal H^m(M\cap B(x,r))}{r^m}
=c_m\omega_m.
$$

> また任意の $0<\varepsilon<1$ に対し、十分小さい $r$ では $M\cap B(x,r)\subset X(x,V,\varepsilon)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

パラメータ点 $a$ の周りを $r$ 倍に拡大すると、$\phi(a+ru)$ は一次式 $\phi(a)+rD\phi(a)u$ に近付きます。球の逆像は楕円体へ近付き、その体積とJacobianの積で小球の面積を計算します。円錐条件は、一次近似の誤差が入力増分に比べて小さいことから得ます。

<!-- proof-start -->
### 証明

$T=D\phi(a)$ とおきます。双Lipschitz性の下側の定数を $\lambda>0$ とすると、$u,v\in A$ で

$$
\lambda|u-v|\le|\phi(u)-\phi(v)|
$$

です。密度1点で差分方向を任意に近付けられること（[GMT13の密度1点の議論](../GMT13/index.md#def-gmt13-tangent-plane)）と $a$ での微分可能性から $|Th|\ge\lambda|h|$ が全ての $h$ で成立します。従って $T$ は単射です。

$r>0$ に対し、球のパラメータ逆像を拡大した集合を

$$
D_r=\left\{u:a+ru\in A,\ 
\left|\frac{\phi(a+ru)-\phi(a)}r\right|<1\right\}
$$

とします。上の下側Lipschitz評価により $D_r\subset B(0,\lambda^{-1})$ です。$T$ は単射なので、楕円体 $D=\{u:|Tu|<1\}$ の境界 $\{|Tu|=1\}$ はLebesgue零集合です。

微分可能性から、任意の固定した $R$ に対し

$$
\sup_{|u|\le R}
\left|\frac{\phi(a+ru)-\phi(a)}r-Tu\right|\longrightarrow0
$$

です。$A$ の密度1から $\mathcal L^m(B(0,R)\setminus(A-a)/r)\to0$ も成立します。よって $D_r$ の指示関数は $D$ の指示関数へ、固定有界球上で $L^1$ 収束します。

[GMT11の単射片の重み付き面積公式](../GMT11/index.md#cor-gmt11-weighted-area)を $M\cap B(x,r)$ に適用し、$b=a+ru$ と変数を替えると

$$
\frac{\mathcal H^m(M\cap B(x,r))}{r^m}
=c_m\int_{D_r}J_mD\phi(a+ru)\,du.
$$

$a$ は $J_mD\phi$ のLebesgue点なので、各固定 $R$ について

$$
\int_{B(0,R)}
|J_mD\phi(a+ru)-J_mT|\,du
=\frac1{r^m}\int_{B(a,Rr)}
|J_mD\phi(b)-J_mT|\,db\longrightarrow0.
$$

従って右辺は $c_mJ_mT\,\mathcal L^m(D)$ に収束します。$T$ の値域 $V$ に正規直交基底を選び、$T=UQ$（$U$ は等長、$Q$ は可逆な $m\times m$ 行列）と書くと、[GMT10の線形面積倍率](../GMT10/index.md#thm-gmt10-linear-area)から

$$
J_mT=|\det Q|,\quad
\mathcal L^m(D)=\mathcal L^m(Q^{-1}B(0,1))
=\frac{\omega_m}{|\det Q|}.
$$

積は $\omega_m$ なので最初の極限を得ます。

最後に $y=\phi(b)$、$b\to a$ では一次近似より

$$
\operatorname{dist}(y-x,V)
\le|\phi(b)-\phi(a)-T(b-a)|=o(|b-a|).
$$

双Lipschitz性で $|b-a|\le\lambda^{-1}|y-x|$ だから、左辺は $o(|y-x|)$ です。十分近くの $y\in M$ は $\operatorname{dist}(y-x,V)<\varepsilon|y-x|$ を満たし、円錐包含が従います。$\square$
<!-- proof-end -->

この補題の「密度1の点」「JacobianのLebesgue点」「微分可能点」は、[HA1の密度定理](../../HA/HA1/index.md#cor-ha1-density)、[HA1のLebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)、[GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)により、パラメータ集合のほとんどすべての点を占めます。双Lipschitz写像は零集合を零集合へ送るため、像上でも例外の $\mathcal H^m$ 測度は0です。

## 4. 可算枚が重なっても、ほとんど至る所では一枚になる

一枚の片について小球内の量と向きを求めました。可算枚の和集合では、近くに他の片が無数にあるかもしれません。ここで効くのは、**点ごとの面積測度の微分**です。局所有限性を仮定する理由もここにあります。

<a id="thm-gmt15-rectifiable-density-tangent"></a>

<!-- formal-statement-start -->
> **定理（局所有限な可算整流可能集合の密度と近似接平面）**
> $1\le m\le d$ とし、$E\subset\mathbb R^d$ は Borelな可算 $m$-整流可能集合で、

$$
\mathcal H^m(E\cap B(0,R))<\infty
\qquad (R>0)
$$

> を満たすとする。$\mu=\mathcal H^m\llcorner E$ とおく。このとき $\mu$-ほとんどすべての $x\in E$ に対し、[GMT13の接平面](../GMT13/index.md#def-gmt13-tangent-plane) $T_xE$ は [近似接平面](#def-gmt15-approximate-tangent)でもあり、

$$
\boxed{\displaystyle
\lim_{r\downarrow0}
\frac{\mathcal H^m(E\cap B(x,r))}{c_m\omega_mr^m}=1
}
$$

> となる。従って [GMT1の密度](../GMT1/index.md#def-gmt1-upper-lower-density)は

$$
\underline\Theta^m(\mu,x)=\overline\Theta^m(\mu,x)
=\frac{c_m\omega_m}{2^m}
$$

> に一致する。これらは「全ての $x\in E$」ではなく $\mathcal H^m$-ほとんどすべての点についての結論である。
<!-- formal-statement-end -->

### 証明の見取り図

[GMT13の双Lipschitz分割](../GMT13/index.md#lem-gmt13-bilipschitz-pieces)で $E$ を互いに素な片 $E_i$ に分けます。各 $E_i$ の典型点では前節の補題で面積・円錐を計算できます。残りの $E\setminus E_i$ は [GMT1のRadon測度の微分](../GMT1/index.md#thm-gmt1-measure-differentiation)により、その点の小球内では面積の割合が0になります。両者を合わせます。

<!-- proof-start -->
### 証明

[GMT13の分割補題](../GMT13/index.md#lem-gmt13-bilipschitz-pieces)から、互いに素なBorel片 $E_i=\phi_i(A_i)$ と $\mu$-零集合 $N$ があり、

$$
E=N\ \cup\ \bigcup_{i=1}^{\infty}E_i
$$

と測度零の違いを除いて書けます。各 $A_i$ で [HA1のLebesgue密度定理](../../HA/HA1/index.md#cor-ha1-density)と [GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)、$J_mD\phi_i$ に対する [Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)を使います。例外は $\mathcal L^m$-零で、[GMT11の零集合の像の測度](../GMT11/index.md#lem-gmt11-lipschitz-null-image)によりその像は $\mathcal H^m$-零です。

さらに局所有限な $\mu$ に対し、[GMT1の球測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)を $h=\boldsymbol1_{E_i}$ に適用します。$\mu$-ほとんどすべての $x\in E_i$ で

$$
\frac{\mu(B(x,r)\cap E_i)}{\mu(B(x,r))}
\longrightarrow\boldsymbol1_{E_i}(x)=1.
$$

分母は十分小さい球で正です。$\mu_i=\mu\llcorner E_i$ とおけば、前節の [双Lipschitz片の補題](#lem-gmt15-chart-blowup)から

$$
\frac{\mu_i(B(x,r))}{r^m}\longrightarrow c_m\omega_m>0.
$$

両式を割り合わせると

$$
\frac{\mu(B(x,r))}{r^m}
=\frac{\mu_i(B(x,r))/r^m}
{\mu_i(B(x,r))/\mu(B(x,r))}
\longrightarrow c_m\omega_m.
$$

これが平面基準密度1、また $(2r)^m$ で割った密度 $c_m\omega_m/2^m$ の主張です。

円錐の外側について、$V=\operatorname{im}D\phi_i(a)$ とします。補題により十分小さい $r$ では $E_i\cap B(x,r)\subset X(x,V,\varepsilon)$ です。従って

$$
\begin{aligned}
0&\le\mu(B(x,r)\setminus X(x,V,\varepsilon))\\
&\le\mu(B(x,r)\setminus E_i)\\
&=\mu(B(x,r))-\mu_i(B(x,r))
=o(\mu(B(x,r)))=o(r^m).
\end{aligned}
$$

ここで最後の等式は上で証明した有限正の面積密度を使いました。任意の $\varepsilon$ で成立するため $V$ は近似接平面です。[GMT13のパラメータ表示からの独立性補題](../GMT13/index.md#lem-gmt13-chart-independence)により、この $V$ は同章の $T_xE$ と $\mu$ に関してほとんどすべての点で一致します。可算個の片の例外の和は零なので定理が従います。$\square$
<!-- proof-end -->

### 円錐の向きが一意になる理由

定理の典型点では、$V$ 以外の $m$ 平面 $W$ を近似接平面として選ぶことはできません。実際 $V\ne W$ なら $V$ 内に $W$ から正の角度だけ離れた方向の小球片があります。その片に対応する $D\phi_i(a)$ の逆像は正のLebesgue測度を持ち、[前節の面積積分](#lem-gmt15-chart-blowup)と同じ変数変換で、その領域に $\ge cr^m$（$c>0$）の $E_i$ の面積があると分かります。十分小さい $r$ で一次近似誤差を角度の半分以下にすれば、この領域は $W$ の細い円錐の外側に残ります。従って $W$ は円錐外測度 $o(r^m)$ を満たせません。

この「正の面積を持つ方向を取り除けない」という理由が、接方向の**一意性**の幾何的な中身です。全ての点での一意性を言っているわけではありません。

## 5. なぜ仮定と例外点を明示するのか

### 密度1だけでは接平面を決められない

$C=\{(t,|t|):|t|\le1\}$ を考えます。原点から半径 $r<1$ の球内には、角度90度で出会う二本の半直線がそれぞれ長さ $r$ だけ含まれます。よって

$$
\mathcal H^1(C\cap B(0,r))=2r,\qquad D^1(C,0)=1.
$$

しかし任意の直線 $V$ に対し、二本の半直線のうち少なくとも一本は $V$ と45度以上の角度をなします。$\varepsilon=1/2$ に固定すると、円錐外に長さ $r$ 以上が残るので

$$
\frac{\mathcal H^1(C\cap B(0,r)\setminus X(0,V,1/2))}{r}\ge1.
$$

どの $V$ も原点で近似接線にはなりません。失われたのは「ほとんどすべての点」という量化です。原点1点は $\mathcal H^1$-零で、上の定理と矛盾しません。

### 可算整流可能でも、局所有限性がないことがある

$$
F=\bigcup_{q\in\mathbb Q\cap(0,1)}([0,1]\times\{q\})
$$

は可算個の線分の和集合なので [GMT12の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)から可算1整流可能です。一方、$x\in(0,1)^2$ の任意の小球には相異なる有理数高さの水平線分が無数に通り、それぞれ正の長さを持ちます。例えば中心付近の高さが $r/2$ 未満の各線分との交差長は $\sqrt3r$ 以上です。従って

$$
\mathcal H^1(F\cap B(x,r))=+\infty
$$

となります。ここでは $\mathcal H^1\llcorner F$ は局所有限でなく、[測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)で「他の片の寄与は小さい」とする操作ができません。これは接平面が各線分にあるという個別の事実と、**集合全体**の面積密度を区別すべき例です。

### 重み付き測度の密度は重みを読む

$E$ が定理の仮定を満たし、$g:E\to[0,\infty)$ が局所 $\mathcal H^m$-可積分なら、$\nu=g\,\mathcal H^m\llcorner E$ は局所有限です。[GMT1の球平均微分](../GMT1/index.md#thm-gmt1-function-differentiation)で $\mu$ に関してほとんどすべての $x$ について

$$
\frac{\nu(B(x,r))}{\mu(B(x,r))}\longrightarrow g(x).
$$

従って密度定理と掛け合わせて

$$
\lim_{r\downarrow0}
\frac{\nu(B(x,r))}{c_m\omega_mr^m}=g(x).
$$

この式では値が1になるとは限りません。$g(x)=0$ の点も許され、球内の**面積自体の密度**と、そこへ載せた任意の測度の密度を混同しないための確認です。

## 6. 演習：密度・円錐・例外を自分で検算する

### GMT15-A01 線分の内点と端点
- Level: A
- 目安時間: 12分

$E=[0,3]\times\{0\}\subset\mathbb R^2$、$m=1$ とする。$x=(1,0)$ と $x=(0,0)$ における $\underline D^1,\overline D^1$ を求め、それぞれ水平線 $V$ が [近似接線](#def-gmt15-approximate-tangent)となるか判定せよ。

<!-- solution-start -->
#### 詳細解答

内点では $0<r<1$ に対して $E\cap B(x,r)$ は長さ $2r$ の線分です。端点では $0<r<3$ に対して長さ $r$ です。$c_1\omega_1=2$ より

$$
\underline D^1(E,(1,0))=\overline D^1(E,(1,0))=1,\quad
\underline D^1(E,(0,0))=\overline D^1(E,(0,0))=\tfrac12.
$$

いずれの点でも $y-x\in V$ なので $\operatorname{dist}(y-x,V)=0$ です。任意の $\varepsilon>0$ と $r>0$ で $E\cap B(x,r)\setminus X(x,V,\varepsilon)$ は空集合となり、円錐外測度は0です。端点も近似接線を持ちますが、密度1ではありません。定理は端点での密度1まで主張していないことを確認できます。
<!-- solution-end -->

### GMT15-A02 平行な二本の線
- Level: A
- 目安時間: 12分

$E=(\mathbb R\times\{0\})\cup(\mathbb R\times\{2\})$ とする。$x=(0,0)$ における $D^1$ と近似接線を求めよ。$r<2$ の場合を使うこと。

<!-- solution-start -->
#### 詳細解答

$0<r<2$ なら $B(x,r)$ は高さ2の線と交わらず、$E\cap B(x,r)$ は長さ $2r$ の水平線分です。従って $D^1(E,x)=2r/(2r)=1$ です。$V=\mathbb R\times\{0\}$ について球内の全点で $\operatorname{dist}(y-x,V)=0$ なので、円錐外測度は0です。遠くに別の成分があることは局所極限に影響しません。
<!-- solution-end -->

### GMT15-A03 曲線の座標と接方向
- Level: A
- 目安時間: 15分

$P=\{(t,t^2):|t|\le1\}$ とする。$\phi(t)=(t,t^2)$ の微分とrankを求め、$t=1/2$ における接方向 $V$ を示せ。また $t=0$ の円錐条件を直接確かめよ。

<!-- solution-start -->
#### 詳細解答

$D\phi(t)v=v(1,2t)$ だから全ての $t$ でrank1です。第一座標の射影が逆写像を与え、$|s-t|\le|\phi(s)-\phi(t)|$、区間上で $|\phi(s)-\phi(t)|\le\sqrt5|s-t|$ なので双Lipschitzです。$t=1/2$ はパラメータ区間の密度1点であり、[GMT13の接平面の定義](../GMT13/index.md#def-gmt13-tangent-plane)から

$$
V=\operatorname{im}D\phi(1/2)=\operatorname{span}(1,1).
$$

$t=0$ では $V_0=\operatorname{span}(1,0)$ です。$\operatorname{dist}(\phi(t),V_0)=t^2$、$|\phi(t)|=|t|\sqrt{1+t^2}$ なので比は $|t|/\sqrt{1+t^2}\le|t|$ です。$|t|<r<\varepsilon$ なら比は $\varepsilon$ 未満です。従って十分小さい球内の全曲線点は円錐内に入り、円錐外測度は0です。
<!-- solution-end -->

### GMT15-A04 測度の重み
- Level: A
- 目安時間: 12分

$E=\mathbb R\times\{0\}$、$\nu=5\mathcal H^1\llcorner E$ とする。$x=(1,0)$ における $\Theta^1(\nu,x)$ と、$\nu(B(x,r))/(c_1\omega_1r)$ の極限を計算し、$D^1(E,x)$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$\nu(B(x,r))=5\cdot2r=10r$ です。[GMT1の密度定義](../GMT1/index.md#def-gmt1-upper-lower-density)の分母は $2r$ なので $\Theta^1(\nu,x)=5$ です。平面基準でも $c_1\omega_1r=2r$ なので極限は5です。一方 $\mathcal H^1\llcorner E$ 自体なら球質量は $2r$ で、$D^1(E,x)=1$ です。集合の密度と重み付き測度の密度の違いは係数5に現れます。
<!-- solution-end -->

### GMT15-A05 二本の線分の交点
- Level: A
- 目安時間: 15分

$E=([-1,1]\times\{0\})\cup(\{0\}\times[-1,1])$ とする。原点での $D^1$ を計算し、$V$ が水平線の場合、$\varepsilon=1/2$ での円錐外測度を求めよ。

<!-- solution-start -->
#### 詳細解答

$0<r<1$ なら各線分の球内の長さは $2r$、交点は零測度なので合計は $4r$ です。よって $D^1(E,0)=4r/(2r)=2$ です。水平線を $V$ としたとき、垂直線上の非零点は $\operatorname{dist}(y,V)/|y|=1$ で $\varepsilon=1/2$ の円錐外、水平線上の点は円錐内です。従って円錐外の長さは $2r$ で

$$
\frac{\mathcal H^1(E\cap B(0,r)\setminus X(0,V,1/2))}{r}=2.
$$

0には収束しないので $V$ は原点の近似接線ではありません。交点を除く線分上の点では他方の線分が十分小さい球に入らず、定理どおり接線が存在します。
<!-- solution-end -->

### GMT15-B01 楕円体の体積とJacobian
- Level: B
- 目安時間: 25分

線形単射 $T:\mathbb R^2\to\mathbb R^3$ を $T(u,v)=(2u,v,0)$ とし、$M=T(\mathbb R^2)$ とする。$D=\{(u,v):|T(u,v)|<1\}$ のLebesgue面積、$J_2T$、$\mathcal H^2(M\cap B(0,r))$ を $c_2,\omega_2$ で表せ。

<!-- solution-start -->
#### 詳細解答

$T$ の列は $(2,0,0)^{\mathsf T}$ と $(0,1,0)^{\mathsf T}$ なので

$$
T^{\mathsf T}T=\begin{pmatrix}4&0\\0&1\end{pmatrix},
\qquad J_2T=\sqrt{\det(T^{\mathsf T}T)}=2.
$$

$D=\{(u,v):4u^2+v^2<1\}$ です。$w=2u$ と置けば $du\,dv=\tfrac12dw\,dv$ なので、$\mathcal L^2(D)=\omega_2/2$ です。[GMT10の線形面積公式](../GMT10/index.md#thm-gmt10-linear-area)を半径 $r$ の楕円体 $rD$ に用いると

$$
\mathcal H^2(M\cap B(0,r))
=c_2J_2T\,\mathcal L^2(rD)
=c_2\cdot2\cdot r^2\frac{\omega_2}{2}
=c_2\omega_2r^2.
$$

伸長2倍と逆像の体積1/2が相殺するのが [小球面積補題](#lem-gmt15-chart-blowup)の定数検算です。
<!-- solution-end -->

### GMT15-B02 密度定理で他の片を消す
- Level: B
- 目安時間: 25分

$\mu$ を局所有限Radon測度、$M\subset\mathbb R^d$ を Borel集合とし、$x\in M$ で $\mu(B(x,r)\cap M)/\mu(B(x,r))\to1$ かつ $\mu(B(x,r)\cap M)/r^m\to a>0$ とする。$\mu(B(x,r))/r^m\to a$ を証明せよ。また $M$ が十分小さい球内で $X(x,V,\varepsilon)$ に含まれるなら、$\mu(B(x,r)\setminus X(x,V,\varepsilon))/r^m\to0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$p_r=\mu(B(x,r)\cap M)/\mu(B(x,r))$、$q_r=\mu(B(x,r)\cap M)/r^m$ と置けば、仮定から $p_r\to1$、$q_r\to a>0$ です。十分小さい $r$ では $p_r>0$ なので

$$
\frac{\mu(B(x,r))}{r^m}=\frac{q_r}{p_r}\longrightarrow a.
$$

次に十分小さい $r$ で $B(x,r)\cap M\subset X(x,V,\varepsilon)$ とします。円錐の外側の球内の部分は $M$ の外にあるため

$$
0\le\mu(B(x,r)\setminus X)
\le\mu(B(x,r)\setminus M)
=\mu(B(x,r))(1-p_r).
$$

$r^m$ で割ると右辺は $(\mu(B(x,r))/r^m)(1-p_r)\to a\cdot0=0$ です。局所有限性は、このような球比に [GMT1の測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)を適用するための仮定です。
<!-- solution-end -->

### GMT15-B03 折れ線の角点を監査する
- Level: B
- 目安時間: 25分

$C=\{(t,|t|):|t|\le1\}$ とする。$D^1(C,0)$ を求め、任意の1次元部分空間 $V$ に対して $0$ が近似接線を持たないことを、$\varepsilon=1/2$ の円錐外の長さの下界を与えて証明せよ。定理との関係も説明せよ。

<!-- solution-start -->
#### 詳細解答

二本の半直線は、どちらも原点から半径 $r$ の球に長さ $r$ だけ入るので、合計長さは $2r$。従って $D^1(C,0)=2r/(2r)=1$ です。

二本の半直線の向きは互いに90度です。直線 $V$ との鋭角をそれぞれ $\alpha,\beta\in[0,\pi/2]$ とすると、少なくとも一方は45度以上です。もし両方が45度未満なら $V$ の同じまたは反対向きを中心とする45度未満の二つの角域に、直交する二方向を同時に入れられないためです。角度45度以上の半直線上では

$$
\frac{\operatorname{dist}(y,V)}{|y|}
=\sin(\operatorname{angle}(y,V))\ge\frac1{\sqrt2}>\frac12.
$$

従って $C\cap B(0,r)\setminus X(0,V,1/2)$ には少なくとも長さ $r$ の半直線片があり、$r$ で割った下界は1です。全ての $V$ に対し極限0を満たさないので近似接線はありません。$C$ はLipschitz像で局所有限ですが、例外点 $\{0\}$ は $\mathcal H^1$-零であり、[密度と接平面の定理](#thm-gmt15-rectifiable-density-tangent)は破れていません。
<!-- solution-end -->

### GMT15-B04 可算整流可能性と局所有限性の違い
- Level: B
- 目安時間: 25分

$F=\bigcup_{q\in\mathbb Q\cap(0,1)}([0,1]\times\{q\})$ が可算1整流可能であることを直接確かめよ。また $x=(1/2,1/2)$ と $0<r<1/4$ について $\mathcal H^1(F\cap B(x,r))=\infty$ を示し、定理のどの仮定が欠けるか答えよ。

<!-- solution-start -->
#### 詳細解答

有理数 $q\in(0,1)$ を $q_1,q_2,\dots$ と数え上げます。切詰め関数 $p(t)=\min(1,\max(0,t))$ を用いると、$f_j(t)=(p(t),q_j)$ は全実数で1-Lipschitzで、その像は線分 $[0,1]\times\{q_j\}$ です。像の可算合併は $F$ に一致するので、[GMT12の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)を満たします。

$|q-1/2|<r/2$ の各有理数高さでは、球と水平直線の交差長は

$$
2\sqrt{r^2-(q-1/2)^2}
>2\sqrt{r^2-r^2/4}=\sqrt3r.
$$

$r<1/4$ ならこの交差区間は $[0,1]$ に収まります。該当する有理数は無数にあり、高さの異なる線分は互いに素です。有限個 $N$ を選んでも $\mathcal H^1(F\cap B)\ge N\sqrt3r$ なので $N\to\infty$ から無限大です。欠けているのは $\mathcal H^1\llcorner F$ の局所有限性です。個々の線分の接線の存在だけでは全体の面積密度は制御できません。
<!-- solution-end -->

### GMT15-C01 グラフと余分な曲線片を統合する
- Level: C
- 目安時間: 40分

$P=\{(t,t^2):|t|\le1\}$、$L=\{(s,1):|s|\le1\}$、$E=P\cup L$ とする。次を順に示せ。

1. $E$ は Borel、可算1整流可能で局所有限な $\mathcal H^1$ 測度を持つ。
2. $x_0=(0,0)$ で $D^1(E,x_0)=1$、近似接線は水平線である。
3. $x_1=(1,1)$ において、$\mathcal H^1(E\cap B(x_1,r))/(2r)$ の極限を計算し、なぜ定理の結論に反しないか説明せよ。
4. 一般の $\mathcal H^1$ に関してほとんどすべての $x\in E$ において、接線と平面基準密度の結論がなぜ成り立つか、使用する既習結果を列挙して論証せよ。

<!-- solution-start -->
#### 詳細解答

**1. 可測性・整流可能性・局所有限性。** $P$ と $L$ はコンパクトなのでその和集合 $E$ もコンパクト、従って Borel です。$P$ は $\phi(t)=(t,t^2)$ の $[-1,1]$ 上の Lipschitz像、$L$ は $\psi(s)=(s,1)$ の Lipschitz像です。切詰め写像で全実数へ拡張できるので [GMT12の可算整流可能性](../GMT12/index.md#def-gmt12-countably-rectifiable)を満たします。[GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)から

$$
\mathcal H^1(P)=\int_{-1}^1\sqrt{1+4t^2}\,dt\le2\sqrt5,\quad
\mathcal H^1(L)=2.
$$

ゆえに $\mathcal H^1(E)\le2\sqrt5+2<\infty$ で、任意の有界球との交わりも有限です。

**2. 原点。** $0<r<1/2$ のとき $B(x_0,r)$ は高さ1の線分 $L$ と交わりません。従って球内の $E$ は $P$ だけです。$P$ の球の逆像は $|t|<\rho_r$、$\rho_r^2+\rho_r^4=r^2$ で $\rho_r/r\to1$ だから

$$
\frac{\mathcal H^1(E\cap B(x_0,r))}{2r}
=\frac1{2r}\int_{-\rho_r}^{\rho_r}\sqrt{1+4t^2}\,dt\to1.
$$

水平線 $V$ への距離と球の中心からの距離の比は $|t|/\sqrt{1+t^2}\le|t|<r$ です。$r<\varepsilon$ では円錐外が空となり、水平線が近似接線です。

**3. 交点。** $P\cap L=\{(-1,1),(1,1)\}$ です。$x_1=(1,1)$ の十分小さい球には他方の交点は入りません。$P$ は端点 $t=1$ へ片側から近付き、その単位接方向は $(1,2)/\sqrt5$ です。$|\phi(1+h)-\phi(1)|/|h|\to\sqrt5$ であるため、$P\cap B(x_1,r)$ の長さは $r+o(r)$ です。$L$ は端点 $s=1$ なので $L\cap B(x_1,r)$ の長さは $r$。球内の交点は一つで長さ0ゆえ

$$
\frac{\mathcal H^1(E\cap B(x_1,r))}{2r}
=\frac{r+o(r)+r}{2r}\longrightarrow1.
$$

密度が1でも、互いに異なる二方向の半直線が交わるため、$x_1$ では近似接線が存在しません（どの直線にも一方の半直線が一定の角度で外れ、円錐外長さは $r+o(r)$ 以上残ります）。これは $\mathcal H^1$-零集合である交点で起きており、定理の「ほとんどすべての点」に反しません。

**4. 一般の典型点。** $P,L$ はそれぞれ双Lipschitzなパラメータ片へ分解できます。[GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)、[HA1の密度定理](../../HA/HA1/index.md#cor-ha1-density)と [Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)で、微分・Jacobianの典型点を取れます。[本章の双Lipschitz片補題](#lem-gmt15-chart-blowup)で各片の小球面積と円錐条件を得て、[GMT1の測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)により他の片の比率を消します。従って [本章の定理](#thm-gmt15-rectifiable-density-tangent)の密度1と近似接平面が $\mathcal H^1$ に関してほとんどすべての点で成立します。交点や端点など有限個の例外は零測度です。
<!-- solution-end -->

## まとめ

- 小球の面積を $(2r)^m$ で割る [GMT1の密度](../GMT1/index.md#def-gmt1-upper-lower-density)と、同じ次元の平面球 $c_m\omega_mr^m$ で割る平面基準密度は、定数倍だけ異なります。
- 近似接平面は「点が厳密に平面上にある」という条件ではなく、細い円錐の外側にある $m$ 次元面積が $o(r^m)$ であるという条件です。
- 局所有限な可算整流可能集合では、[双Lipschitz片の面積公式](#lem-gmt15-chart-blowup)と [Radon測度の微分](../GMT1/index.md#thm-gmt1-measure-differentiation)により、ほとんど至る所で平面基準密度1と近似接平面を得ます。
- 密度1の例外点で接線が失敗すること、局所有限でない可算整流可能集合があることを区別します。

次のGMT16では、こうした接平面による記述ができない成分をどのように取り出すかを調べます。
