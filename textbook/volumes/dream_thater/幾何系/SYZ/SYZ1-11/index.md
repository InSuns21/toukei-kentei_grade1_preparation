# SYZ1-11 semi-flat鏡像II――Kähler形式・計量・接続

<!-- definition-example-audit: strict -->

## 1. 複素トーラスにどの計量を入れるか

[前講の複素構造の構成](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)では、滑らかな特殊Lagrange（SLag）トーラス束のシンプレクティック周期から、双対束
$\check X_0=TB_0/\Lambda_\omega$ と局所複素座標 $z^i=u^i+iv^i$ を得た。ここで $v^i$ は周期1のホロノミー角である。しかし複素座標があっても、長さや面積をどう測るかは決まらない。

[基底のHessian計量定理](../SYZ1-09/index.md#thm-syz1-09-hessian)は、周期座標 $u$ の局所領域 $U\subset B_0$ で、実関数 $\phi$ と正定値対称行列

$$
H_{ij}(u)=\frac{\partial^2\phi}{\partial u^i\partial u^j},
\qquad dt_i=\sum_j H_{ij}\,du^j
$$

を構成した。今回はこの $H$ を横方向 $u$ と角方向 $v$ の両方に用いる。新しい条件は、計量と複素構造が両立し、その基本2形式が閉じることである。これが **Kählerであるための条件** である。

本講を通じ、$n\ge1$、$U$ は単連結な小さな整数アフィン座標域、$\phi\in C^\infty(U,\mathbb R)$ は厳密に凸かつ $H>0$ とする。局所計算は $U\times(\mathbb R/\mathbb Z)^n$ 上で行う。複素座標の局所持ち上げを選び、$J\partial_{u^i}=\partial_{v^i}$、$J\partial_{v^i}=-\partial_{u^i}$ とする。**大域的な滑らかなSLagトーラス束の存在自体は追加仮定**であり、一般のCalabi–Yauから自動的には得られない。

## 2. HessianからKähler形式を作る

計量 $g$ は二つの接ベクトルへ実数を返す対称な双線形形式であり、Kähler形式 $\check\omega$ は二つの接ベクトルへ実数を返す交代2形式である。複素構造 $J$ と $g$ の組に対して $\check\omega(V,W)=g(JV,W)$ とする。ここではKähler計量の要件を、$g$ が正定値で、$J$ と両立し、$d\check\omega=0$ であることとして確認する。

<a id="def-syz1-11-semiflat-kahler"></a>

<!-- formal-statement-start -->
> **定義（semi-flat Kähler構造）**  
> $U\subset\mathbb R^n$ 上の $C^\infty$ 関数 $\phi$ のHessian $H=(\partial_i\partial_j\phi)$ が正定値とする。$\check X_U=U\times(\mathbb R/\mathbb Z)^n$ に、前講の複素構造 $J$ と、次の実計量・実2形式を置く。

$$
\check g=\sum_{i,j=1}^n H_{ij}
 (du^i\otimes du^j+dv^i\otimes dv^j),
\qquad
\check\omega=\sum_{i,j=1}^n H_{ij}\,du^i\wedge dv^j.
$$

> この組を $\phi$ による **semi-flat Kähler構造** と呼ぶ。ここで $\otimes$ は対称計量を評価するためのテンソル積、$\wedge$ は外積である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-11-semiflat-kahler -->
### 直接例：二つの異方的な長さを持つトーラス

$n=2$、$\phi(u)=\frac12(2(u^1)^2+3(u^2)^2)$ とする。一次微分は $(2u^1,3u^2)$、二次微分は $H=\operatorname{diag}(2,3)$ で、任意の非零 $(a,b)$ に対して $2a^2+3b^2>0$ である。定義式は

$$
\check g=2((du^1)^2+(dv^1)^2)+3((du^2)^2+(dv^2)^2),
\quad
\check\omega=2du^1\wedge dv^1+3du^2\wedge dv^2.
$$

ここで $(du^i)^2=du^i\otimes du^i$ と略記した。$\check\omega(\partial_{u^1},\partial_{v^1})=2=\check g(J\partial_{u^1},\partial_{v^1})$ であり、第二成分は3、異なる添字の組は0である。係数が定数なので $d\check\omega=0$ も成り立つ。周期 $v^i\mapsto v^i+m^i$ は微分を変えず、角方向にも正定値である。**定義の確認**：正定値性、複素構造との両立、閉性、格子商での良定義性を直接確認できた。
<!-- definition-example-end -->

<a id="thm-syz1-11-kahler-from-hessian"></a>

<!-- formal-statement-start -->
> **定理（Hessianが与えるKähler計量）**  
> $\phi\in C^\infty(U,\mathbb R)$ のHessian $H$ が正定値で、$z^i=u^i+iv^i$ による積分可能な複素構造があるとする。このとき上の $\check g$ は $J$ と両立し、$\check\omega$ は閉形式となる。さらに実関数 $K=2\phi(u)$ は局所Kählerポテンシャルであり、

$$
\check\omega=\frac{i}{2}\sum_{i,j}H_{ij}\,dz^i\wedge d\bar z^j
=i\partial\bar\partial K
$$

> を満たす。$\partial,\bar\partial$ は複素座標の正則方向・反正則方向の外微分である。
<!-- formal-statement-end -->

### 証明の見取り図

$H$ の対称性が複素構造との両立を与え、三階微分の完全対称性が $d\check\omega=0$ を与える。最後に $\partial/\partial z^i=(\partial_{u^i}-i\partial_{v^i})/2$ を $K=2\phi(u)$ に適用して係数 $1/2$ を検算する。

<!-- proof-start -->
### 証明

任意の実接ベクトルを $V=(a,b)$、$W=(c,d)$ と $u,v$ 成分で書くと、$JV=(-b,a)$ である。対称性 $H^{\mathsf T}=H$ から

$$
\check g(JV,JW)=b^{\mathsf T}Hd+a^{\mathsf T}Hc
=\check g(V,W),
$$

$$
\check g(JV,W)=-b^{\mathsf T}Hc+a^{\mathsf T}Hd
=\check\omega(V,W).
$$

$H>0$ ゆえ $\check g(V,V)=a^{\mathsf T}Ha+b^{\mathsf T}Hb>0$（$V\ne0$）。閉性については $d(du^i)=d(dv^j)=0$ だから

$$
d\check\omega
=\sum_{i,j,k}(\partial_kH_{ij})\,du^k\wedge du^i\wedge dv^j.
$$

$H_{ij}=\partial_i\partial_j\phi$ なので $\partial_kH_{ij}=\partial_iH_{kj}$。$k,i$ を交換した二項は外積の反対称性で相殺し、$d\check\omega=0$。

次に $dz^i=du^i+i\,dv^i$、$d\bar z^j=du^j-i\,dv^j$ を展開する。対称な $H_{ij}$ と縮約すると $du^i\wedge du^j$ および $dv^i\wedge dv^j$ の和は消え、残りは

$$
\sum_{i,j}H_{ij}\,dz^i\wedge d\bar z^j
=-2i\sum_{i,j}H_{ij}\,du^i\wedge dv^j.
$$

また $K$ は $v$ に依存しないので、$\partial_i^{(z)}K=(1/2)\partial_i^{(u)}K=\partial_i\phi$、さらに

$$
\frac{\partial^2K}{\partial z^i\partial\bar z^j}
=\frac12 H_{ij}.
$$

従って $i\partial\bar\partial K=(i/2)\sum H_{ij}dz^i\wedge d\bar z^j=\check\omega$。これで正定値性、両立性、閉性、ポテンシャル表示をすべて証明した。
<!-- proof-end -->

**なぜHessianである必要があるか。** たとえば $n=2$、$u^2>-1$ において $H=\operatorname{diag}(1+u^2,1)$ とだけ置けば、各点で $H>0$ だが $\partial_2H_{11}=1$、$\partial_1H_{21}=0$ である。そのため $d\check\omega=du^2\wedge du^1\wedge dv^1\ne0$。正定値行列を角方向にも複写するだけではKählerにならない。失われたのは三階微分の対称性であり、閉性の証明がそこで破れる。

## 3. 整数アフィン遷移で計量は変わらないか

[semi-flat双対トーラスの複素構造と貼り合わせ](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)により $u'=Au+c$、$v'=Av$、$A\in GL(n,\mathbb Z)$ である。[Hessianポテンシャルの遷移命題](../SYZ1-09/index.md#prop-syz1-09-affine-transition)では

$$
\phi'(u')=\phi(A^{-1}(u'-c))+d^{\mathsf T}u'+C
$$

と取れた。ここで $d\in\mathbb R^n$ は複素周期の並進、$C$ は定数である。一次項を加えても二階微分は変わらない。

<a id="prop-syz1-11-global-gluing"></a>

<!-- formal-statement-start -->
> **命題（semi-flat Kählerデータの貼り合わせ）**  
> $B_0$ に整数アフィン遷移と、それに整合する正定値の局所Hessianポテンシャルがあるとする。重なりでの遷移は

$$
u'=Au+c,\qquad
\phi'(u')=\phi(A^{-1}(u'-c))+d^{\mathsf T}u'+C,
\quad A\in GL(n,\mathbb Z)
$$

> である。このとき $\check X_0=TB_0/\Lambda_\omega$ 上で $\check g$ と $\check\omega$ は貼り合い、Kähler計量と閉2形式を与える。局所ポテンシャルの差 $K'-K$ は座標変換後に正則関数の実部である。
<!-- formal-statement-end -->

### 証明の見取り図

$H$ は共変2テンソルなので逆転置で変換する。$du,dv$ は共に $A$ で変換するため、計量の二つの項と2形式の係数がそれぞれ打ち消し合う。

<!-- proof-start -->
### 証明

$u=A^{-1}(u'-c)$ を代入して一階微分を取ると $\nabla_{u'}\phi'=A^{-\mathsf T}\nabla_u\phi+d$。さらに二階微分して

$$
H'=A^{-\mathsf T}HA^{-1},
\qquad du'=A\,du,\quad dv'=A\,dv.
$$

評価する二方向の成分を $a,b\in\mathbb R^n$ とすると

$$
(Aa)^{\mathsf T}H'(Ab)
=a^{\mathsf T}A^{\mathsf T}A^{-\mathsf T}HA^{-1}Ab
=a^{\mathsf T}Hb.
$$

これは $du\otimes du$ と $dv\otimes dv$ のそれぞれに適用できる。同じ行列恒等式を $du\wedge dv$ に適用すると $\check\omega'=\check\omega$。整数条件は $v$ の周期1の商とその逆変換を保証する。

最後に $K'(u')=K(u)+2d^{\mathsf T}u'+2C$ であり、$u'=\operatorname{Re}z'$ だから、差は正則アフィン関数 $2d^{\mathsf T}z'+2C$ の実部である。$\partial\bar\partial$ はその実部を消す。局所式の閉性と正定値性も貼り合う。
<!-- proof-end -->

**注意：** $\phi$ 自体が一価の大域関数になる必要はない。逆に、前講の複素構造は $H$ を使わなくても存在したので、ここでの貼り合わせには **Hessian計量が与えられていること** という追加の入力が必要である。

## 4. 正則体積形式とRicci平坦条件

複素 $n$ 次元のチャートで $n$ 個の正則1形式を外積にすると正則な最高次形式になる。その非消失性と、Kähler計量で測ったノルムを区別することが大切である。SLagの正則体積形式は[位相と規格化の講義](../SYZ1-04/index.md#def-syz1-04-slag)で導入されており、鏡像側でもどの規格化を選ぶかが問題になる。

<a id="def-syz1-11-holomorphic-volume"></a>

<!-- formal-statement-start -->
> **定義（semi-flatの局所正則体積形式）**  
> $z^1,\ldots,z^n$ が上記の局所複素座標であるとき、

$$
\check\Omega=dz^1\wedge\cdots\wedge dz^n
$$

> を局所正則体積形式とする。整数アフィン遷移の線形部分 $A$ の行列式が $+1$ の向き付けられたアトラス上では、この式は大域的に一致する。$\det A=-1$ の重なりでは符号が反転するため、このままでは大域の同じ形式とは呼ばない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-11-holomorphic-volume -->
### 直接例：せん断で正則体積形式を検算する

$n=2$、$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$z'^1=z^1+z^2+c$、$z'^2=z^2$ とする。$dz'^1\wedge dz'^2=(dz^1+dz^2)\wedge dz^2=dz^1\wedge dz^2$。**定義の確認**：正則性・非消失性・$+1$ の貼り合わせを直接確認できる。一方 $z'^1=-z^1$、$z'^2=z^2$ は行列式 $-1$ で、外積が負になる。計量とKähler形式の貼り合わせはこの符号に影響されない。
<!-- definition-example-end -->

Kähler計量の **Ricci形式** は、局所Hermitian行列の行列式の対数に複素微分を施した実2形式である。固定した複素構造と計量から定まり、Ricci平坦性を検査できる。今のHermitian行列は $H$ と定数倍の差しかないので、その行列式の対数の二階微分には $\log\det H$ を使える。

<a id="thm-syz1-11-ricci-ma"></a>

<!-- formal-statement-start -->
> **定理（semi-flat Ricci形式と実Monge–Ampère条件）**  
> 第2節の $C^\infty$ な正定値Hessian $H=\nabla_u^2\phi$ を持つsemi-flat Kähler計量について、Ricci形式 $\rho$ は

$$
\rho=-i\partial\bar\partial\log\det H
=-\frac12\sum_{i,j}
\frac{\partial^2\log\det H}{\partial u^i\partial u^j}
\,du^i\wedge dv^j.
$$

> よって局所的に $\rho=0$ であることと、$\log\det H$ が実アフィン関数であることは同値である。さらに、局所正則体積形式 $\check\Omega$ の $\check g$ によるノルムが一定であることは $\det H=C>0$ と同値であり、この追加条件は実Monge–Ampère方程式

$$
\det\bigl(\partial_i\partial_j\phi\bigr)=C
$$

> である。後者はRicci平坦性を保証するが、単連結な任意の局所領域では逆は一般に成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

複素変数 $z=u+iv$ に関して $u$ の関数を二回微分すると $1/4$ 倍の実Hessianになる。Ricci形式の係数をそこから出し、最高次正則形式のノルムはGram行列の行列式の逆であることを使う。

<!-- proof-start -->
### 証明

$F(u)=\log\det H(u)$ は $H>0$ により実数値である。$u^i=(z^i+\bar z^i)/2$ だから

$$
\frac{\partial F}{\partial z^i}=\frac12 F_i,
\qquad
\frac{\partial^2 F}{\partial z^i\partial\bar z^j}
=\frac14 F_{ij}.
$$

従って $-i\partial\bar\partial F=-(i/4)\sum F_{ij}dz^i\wedge d\bar z^j$。$F_{ij}=F_{ji}$ であることから第2節と同じ外積展開をすると、$\rho=-(1/2)\sum F_{ij}\,du^i\wedge dv^j$。

$du^i\wedge dv^j$ は互いに一次独立な2形式なので、$\rho=0$ と $F_{ij}=0$ は同値である。連結な凸小近傍で全二階微分が0なら $\nabla F$ は一定で、$F(u)=a^{\mathsf T}u+b$。逆にその形の二階微分は0である。

複素計量のGram行列は規約に依存する正定数倍を除いて $H$ である。したがって $dz^1\wedge\cdots\wedge dz^n$ のノルム二乗は、**固定した規約に依存する正定数** $c_n$ を用いて

$$
|\check\Omega|_{\check g}^2=\frac{c_n}{\det H}.
$$

実際、正定値Hermitian行列をある点で対角化し、長さ二乗が $\lambda_i$ の複素余接基底の外積の長さ二乗を掛け合わせれば $\prod_i\lambda_i^{-1}=(\det H)^{-1}$ となる。よって $\check\Omega$ のノルムが一定である条件は $\det H$ が正定数である条件に等しい。この条件なら $F$ は定数で $\rho=0$。
<!-- proof-end -->

**Ricci平坦と定数行列式を混同しない例。** 一次元の $U=\mathbb R$ で $\phi(u)=e^u$ とすれば、$H=e^u>0$、$\log\det H=u$ で二階微分は0。したがって

$$
\check g=e^u((du)^2+(dv)^2),\qquad \rho=0,
\qquad |\check\Omega|_{\check g}^2=c_1e^{-u}
$$

である。**局所Ricci平坦**だが、固定した $\check\Omega=dz$ のノルムは一定でない。逆向きの含意が壊れるのは、$\log\det H$ の一次項をRicci形式の二階微分が検知できないためである。

## 5. 二つの接続を区別する

計量が定める **Levi-Civita接続** は曲線に沿って接ベクトルを平行移動する微分法であり、計量とねじれなし条件から一意に決まる。整数アフィン座標 $u$ の成分を一定とする平坦な座標接続とは、一般には異なる。もう一つ、鏡像トーラスの点を表す **平坦 $U(1)$ 接続** は、元のファイバー上の複素直線束の位相を平行移動するもので、計量接続とは作用先が違う。

<a id="prop-syz1-11-levi-civita"></a>

<!-- formal-statement-start -->
> **命題（semi-flat計量のLevi-Civita係数）**  
> $H_{ij}=\partial_i\partial_j\phi>0$、$H^{ij}=(H^{-1})_{ij}$、$\phi_{ij\ell}=\partial_i\partial_j\partial_\ell\phi$ とする。$(u,v)$ 座標のLevi-Civita接続で零でない可能性のあるChristoffel記号は

$$
\Gamma^{u^k}_{u^iu^j}=\frac12\sum_\ell H^{k\ell}\phi_{ij\ell},
\qquad
\Gamma^{u^k}_{v^iv^j}=-\frac12\sum_\ell H^{k\ell}\phi_{ij\ell},
$$

$$
\Gamma^{v^k}_{u^iv^j}
=\Gamma^{v^k}_{v^ju^i}
=\frac12\sum_\ell H^{k\ell}\phi_{ij\ell}.
$$

> その他の成分は0である。従って $\phi$ が三次微分を持つ非二次関数なら、整数アフィン座標の定数接続とLevi-Civita接続は必ずしも一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

計量行列は $\operatorname{diag}(H,H)$ であり、$v$ 方向微分はすべて0である。Christoffelの公式へ代入すれば、$u$ と $v$ の組によって正負が分かれる。

<!-- proof-start -->
### 証明

一般の実座標 $q^a$ で

$$
\Gamma^a_{bc}
=\frac12 g^{ad}
 (\partial_b g_{cd}+\partial_c g_{bd}-\partial_d g_{bc})
$$

を用いる。$g_{u^iu^j}=g_{v^iv^j}=H_{ij}(u)$、混合成分は0、逆計量は両ブロックで $H^{-1}$ である。よって

$$
\Gamma^{u^k}_{u^iu^j}
=\frac12 H^{k\ell}
(\partial_iH_{j\ell}+\partial_jH_{i\ell}-\partial_\ell H_{ij})
=\frac12H^{k\ell}\phi_{ij\ell}.
$$

$u^k$ が上添字で下が二つとも $v$ なら、初めの二つの微分は $v$ に関するものなので零で、残る項は $-\frac12H^{k\ell}\partial_\ell H_{ij}$。$v^k$ が上添字で下が $u^i,v^j$ なら、唯一残る項は $\frac12H^{k\ell}\partial_iH_{j\ell}$。反転した下添字はねじれなし性から同値である。他の組では $v$ 微分または混合計量が零である。
<!-- proof-end -->

<a id="def-syz1-11-flat-holonomy"></a>

<!-- formal-statement-start -->
> **定義（ファイバーの平坦U(1)接続とホロノミー）**  
> 元のトーラスファイバー $L_b\cong(\mathbb R/\mathbb Z)^n$ の周期1座標を $x^j$、ホロノミー角を $v^j\in\mathbb R/\mathbb Z$ とする。自明複素直線束の局所接続を

$$
\nabla_v=d-2\pi i\sum_{j=1}^n v^j\,dx^j
$$

> と定める。曲線に沿って $\nabla_v s=0$ を満たす断面の平行移動の倍率をホロノミーと呼ぶ。この符号では基本周期 $\gamma_j$ のホロノミーは $\exp(2\pi i v^j)$ である。$v$ を整数だけ変えた接続はゲージ同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-11-flat-holonomy -->
### 直接例：符号と整数ゲージ変換

$L_b=S^1$、$\nabla_v=d-2\pi i v\,dx$、$v=1/4$ とする。平行断面は微分方程式 $s'(x)-2\pi i v s(x)=0$ を満たし、$s(1)=e^{\pi i/2}s(0)=i\,s(0)$。曲率は $-2\pi i v\,d(dx)=0$、よってファイバー上で平坦である。$v'=v+1$ に替えたとき、周期1の関数 $g(x)=e^{-2\pi i x}$ を用いると $g^{-1}\nabla_v g=\nabla_{v+1}$。**定義の確認**：平坦性、指定ホロノミー、整数周期によるゲージ同値性がすべて確認できる。
<!-- definition-example-end -->

この構成は[前講のホロノミー文字の同型](../SYZ1-10/index.md#prop-syz1-10-holonomy-dual)を接続の微分方程式として実現している。基底方向へ $v$ が変わる場合、ファイバー方向の平坦性だけを主張する。$B_0$ 全体を含む普遍接続の曲率まで常に0とするわけではない。

## 6. B場は計量とは別の位相情報である

実閉2形式の積分は曲面へ位相を割り当てる。その位相をKähler形式の実際の面積と組み合わせるのが鏡像対称性で現れる **B場** の一つの役割である。ここでは平坦なU(1)接続の1サイクルホロノミーと、B場の2サイクル積分を区別する。

<a id="def-syz1-11-b-field-phase"></a>

<!-- formal-statement-start -->
> **定義（B場の指数位相）**  
> 滑らかな多様体 $X_0$ 上の実閉2形式 $B$ をこの局所模型のB場とし、閉じた向き付き2サイクル $\Sigma$ に

$$
\operatorname{phase}_B(\Sigma)
=\exp\left(2\pi i\int_\Sigma B\right)\in U(1)
$$

> を割り当てる。$B$ を整数周期を持つ閉2形式 $\eta$ に置き換えて加えても、この指数位相は変わらない。境界付き曲面の場合には、境界の接続データも別途必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-11-b-field-phase -->
### 直接例：2トーラス上のB場

$X_0=(\mathbb R/\mathbb Z)^2$ を座標 $(x,y)$、向き $dx\wedge dy$ で表し、$B=b\,dx\wedge dy$ と取る。$dB=0$、$\int_{T^2}B=b$ より位相は $e^{2\pi i b}$。$B'=B+m\,dx\wedge dy$（$m\in\mathbb Z$）なら位相は同じ。一方 $b=1/2$ の位相は $-1$ で、$b=0$ の位相1とは区別できる。**定義の確認**：閉性、整数周期での同値性、異なる位相の区別を検証した。これは**2サイクル**の位相であり、前節の $\rho(\gamma)=e^{2\pi i v}$ は**1サイクル**のホロノミーである。
<!-- definition-example-end -->

B場の情報はしばしば面積を測る $\omega$ と合わせて $B+i\omega$ と表す。ただしここでの式は閉2形式の位相を定める範囲に限り、**任意のB場を追加しても同じ単純な双対チャートがそのまま完全な鏡像になる**とは結論しない。非自明なB場のねじれや正則円板による補正は後続講義で仮定を追加して扱う。

## 7. 平坦模型と非定数Hessianを比較する

$H=\operatorname{diag}(h_1,\ldots,h_n)$、$h_i>0$ が定数なら、$\phi(u)=\frac12\sum_i h_i(u^i)^2$ と取れる。$H$ の三階微分は0だから第5節のChristoffel記号は全て0、$\rho=0$ であり、$\det H=\prod_i h_i$ は一定である。$u$ の周期が与えられる平坦トーラス模型では、$v$ の周期1と組み合わせた双対計量が大域に降りる。

非定数HessianではKähler性は保たれるが、Ricci形式の消滅には追加条件が要る。たとえば一次元で $\phi(u)=u^2/2+u^4/12$ とすれば $H=1+u^2>0$、

$$
\frac{d^2}{du^2}\log(1+u^2)
=\frac{2(1-u^2)}{(1+u^2)^2}
$$

なので $u=0$ では $\rho=-du\wedge dv\ne0$。反対に第4節の指数関数例では $H=e^u$ は非定数でもRicci形式が0である。**Hessianであること、Ricci平坦性、固定正則体積形式の定数ノルム性は三段階の異なる条件**と理解できる。

## 8. 演習：計量・曲率・位相を自分で再構成する

### Level A：定義と係数

<a id="ex-syz1-11-a01"></a>

#### SYZ1-11-A01 Kähler計量の直接計算

- Level: A

$n=2$、$\phi=\frac12(5(u^1)^2+2(u^2)^2)$ とする。$H$、$\check g$、$\check\omega$ を求め、正定値性と閉性を確かめよ。

<!-- solution-start -->
### 詳細解答

$\partial_1\phi=5u^1$、$\partial_2\phi=2u^2$、従って $H=\operatorname{diag}(5,2)$。非零 $(a,b)$ に対し $5a^2+2b^2>0$ である。定義に代入して

$$
\check g=5((du^1)^2+(dv^1)^2)+2((du^2)^2+(dv^2)^2),
\quad
\check\omega=5du^1\wedge dv^1+2du^2\wedge dv^2.
$$

係数は定数で $ddu^i=ddv^i=0$ だから $d\check\omega=0$。また $J\partial_{u^i}=\partial_{v^i}$ なので、対応する組の $\check\omega$ は $5,2$ と計量の値に一致する。
<!-- solution-end -->

<a id="ex-syz1-11-a02"></a>

#### SYZ1-11-A02 Kählerポテンシャルの係数

- Level: A

$n=1$、$\phi(u)=3u^2/2$ とする。$K=2\phi$ を $z=u+iv$ で二回微分して $i\partial\bar\partial K$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$H=\phi''=3$、$K=3u^2$。$\partial_z=\frac12(\partial_u-i\partial_v)$、$\partial_{\bar z}=\frac12(\partial_u+i\partial_v)$ として、$\partial_zK=3u$、$\partial_{\bar z}\partial_zK=3/2$。従って

$$
i\partial\bar\partial K=\frac{3i}{2}dz\wedge d\bar z
=\frac{3i}{2}(-2i\,du\wedge dv)=3du\wedge dv.
$$

$\check\omega=Hdu\wedge dv$ と一致する。$K=\phi$ なら半分になってしまう。
<!-- solution-end -->

<a id="ex-syz1-11-a03"></a>

#### SYZ1-11-A03 せん断時の体積形式

- Level: A

$z'^1=z^1+2z^2+c$、$z'^2=z^2$ とするとき、$dz'^1\wedge dz'^2$ と $\det A$ を求めよ。

<!-- solution-start -->
### 詳細解答

$A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ で $\det A=1$。$dz'^1=dz^1+2dz^2$、$dz'^2=dz^2$ だから

$$
dz'^1\wedge dz'^2=dz^1\wedge dz^2+2dz^2\wedge dz^2
=dz^1\wedge dz^2.
$$

最後の項は外積の交代性で0。定数 $c$ も微分すると消える。
<!-- solution-end -->

<a id="ex-syz1-11-a04"></a>

#### SYZ1-11-A04 ホロノミーの符号

- Level: A

$S^1$ 上の $\nabla=d-2\pi i(1/3)\,dx$ に対し、平行断面の方程式、1周のホロノミー、曲率を求めよ。

<!-- solution-start -->
### 詳細解答

$\nabla_{\partial_x}s=0$ は $s'(x)-(2\pi i/3)s(x)=0$。初期値 $s(0)$ から $s(x)=e^{2\pi i x/3}s(0)$ だからホロノミーは $e^{2\pi i/3}$。接続を表す1形式 $A=-2\pi i\,dx/3$ は閉じ、直線束の可換な構造群では $F=dA=0$ である。接続を $d+2\pi iv\,dx$ と書けばホロノミーの指数符号が逆になる。
<!-- solution-end -->

<a id="ex-syz1-11-a05"></a>

#### SYZ1-11-A05 B場の整数周期

- Level: A

向き付き単位2トーラスで $B=\frac34dx\wedge dy$ と $B'=B+2dx\wedge dy$ の位相を比較せよ。

<!-- solution-start -->
### 詳細解答

$\int_{T^2}dx\wedge dy=1$ より $\int B=3/4$、$\int B'=11/4$。位相はそれぞれ $e^{2\pi i(3/4)}=-i$ と $e^{2\pi i(11/4)}=e^{2\pi i(3/4)}=-i$。積分値の差2は整数なので指数で消える。曲面の向きを反転すれば各位相は複素共役となる。
<!-- solution-end -->

### Level B：貼り合わせ・追加条件・接続

<a id="ex-syz1-11-b01"></a>

#### SYZ1-11-B01 Hessianの逆転置と計量不変性

- Level: B

$H=\begin{pmatrix}2&1\\1&3\end{pmatrix}$、$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$u'=Au$、$v'=Av$ とする。$H'$ を計算し、$\check g$ の $u$ ブロックが保たれることを直接確かめよ。

<!-- solution-start -->
### 詳細解答

$A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$、$A^{-\mathsf T}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}$。まず

$$
HA^{-1}=\begin{pmatrix}2&-1\\1&2\end{pmatrix},
\quad H'=A^{-\mathsf T}HA^{-1}
=\begin{pmatrix}2&-1\\-1&3\end{pmatrix}.
$$

旧成分 $a=(a_1,a_2)^{\mathsf T}$ は新成分 $a'=Aa=(a_1+a_2,a_2)^{\mathsf T}$。従って

$$
(a')^{\mathsf T}H'a'
=2(a_1+a_2)^2-2(a_1+a_2)a_2+3a_2^2
=2a_1^2+2a_1a_2+3a_2^2=a^{\mathsf T}Ha.
$$

$v$ ブロックにも同じ $A$ を適用するので計量全体が保たれる。$H'$ の行列式は $6-1=5>0$、第一主座小行列は2であり、正定値性も保持する。
<!-- solution-end -->

<a id="ex-syz1-11-b02"></a>

#### SYZ1-11-B02 Ricci平坦だが行列式非定数

- Level: B

$n=1$、$\phi=e^{2u}/4$ とする。$H$、Ricci形式、$\check\Omega=dz$ のノルムの $u$ 依存性を求めよ。実Monge–Ampèreの定数条件との違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$\phi'=e^{2u}/2$、$\phi''=e^{2u}=H>0$。$\log H=2u$ で二階微分は0だから、[semi-flat Ricci形式と実Monge–Ampère条件](#thm-syz1-11-ricci-ma)より $\rho=0$。一方、体積形式のノルムは $\lvert dz\rvert_{\check g}^2=c_1/H=c_1 e^{-2u}$ で一定でない。Monge–Ampère方程式の $\det H=C$ は $e^{2u}=C$ を全区間に要求し、成立しない。Ricci形式は対数行列式の二階微分だけを見るため、一次関数 $2u$ を区別できない。
<!-- solution-end -->

<a id="ex-syz1-11-b03"></a>

#### SYZ1-11-B03 非Hessian行列が閉性を失う

- Level: B

$U=\{u^2>0\}$ で $H(u)=\operatorname{diag}(u^2,1)$ と置き、$\check\omega$ の外微分を計算せよ。なぜこれが正定値Kähler計量を定めないか説明せよ。

<!-- solution-start -->
### 詳細解答

$u^2>0$ だから $H$ は各点で正定値である。形式は $\check\omega=u^2\,du^1\wedge dv^1+du^2\wedge dv^2$。Leibniz則と $d(du^i)=d(dv^i)=0$ より

$$
d\check\omega=du^2\wedge du^1\wedge dv^1\ne0.
$$

$H$ がHessianなら $\partial_2H_{11}=\partial_1H_{21}$ が必要だが、左辺1・右辺0で矛盾する。Kählerの閉性が破れているので正定値性と複素構造への両立だけでは足りない。
<!-- solution-end -->

<a id="ex-syz1-11-b04"></a>

#### SYZ1-11-B04 座標接続とLevi-Civita接続の違い

- Level: B

$n=1$、$\phi(u)=e^u$ とする。$\Gamma^u_{uu}$、$\Gamma^u_{vv}$、$\Gamma^v_{uv}$ を求め、整数アフィン座標の平坦な定数接続との違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$H=e^u$、$H^{-1}=e^{-u}$、$\phi'''=e^u$ なので、[接続係数の命題](#prop-syz1-11-levi-civita)に代入して

$$
\Gamma^u_{uu}=\frac12 e^{-u}e^u=\frac12,\quad
\Gamma^u_{vv}=-\frac12,\quad
\Gamma^v_{uv}=\frac12.
$$

同様に $\Gamma^v_{vu}=1/2$。一方、$u,v$ の成分を一定とする座標接続のChristoffel記号は0。ゆえに二つの接続は同じではない。ただし $\Gamma\ne0$ という事実だけで曲率が非零とは結論できない。この例のRicci形式は0である。
<!-- solution-end -->

### Level C：複素構造から曲率とホロノミーまで

<a id="ex-syz1-11-c01"></a>

#### SYZ1-11-C01 semi-flat鏡像の全条件を再構成する

- Level: C

$U=\mathbb R^2$ で $\phi(u)=\frac12(2(u^1)^2+3(u^2)^2)$、$v\in(\mathbb R/\mathbb Z)^2$、$z=u+iv$ を取る。以下をすべて示せ。

1. $H$ の正定値性、$\check g$ と $\check\omega$ のKähler条件および $K=2\phi$ の式を確かめる。
2. $\check\Omega=dz^1\wedge dz^2$ の非消失性、$\rho=0$、$\det H=C$ を確かめる。
3. $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ による整数アフィン座標変更で、$H'$、形式 $\check\omega$、$\check\Omega$ の貼り合わせを検算する。
4. 元のファイバー $L=T^2$ 上に $v=(1/2,1/4)$ に対応する平坦接続を与え、$\gamma_1+\gamma_2$ のホロノミーを求める。さらに $B=\frac12dx^1\wedge dx^2$ の2サイクル位相と比較する。

<!-- solution-start -->
### 詳細解答

**(1) 計量とポテンシャル。** 一階微分 $\nabla\phi=(2u^1,3u^2)$、二階微分 $H=\operatorname{diag}(2,3)$。任意の $(a,b)\ne0$ で $2a^2+3b^2>0$。したがって

$$
\check g=2((du^1)^2+(dv^1)^2)+3((du^2)^2+(dv^2)^2),
\quad
\check\omega=2du^1\wedge dv^1+3du^2\wedge dv^2.
$$

$\check g(JV,W)=\check\omega(V,W)$ は基底の $u^i,v^i$ の組で検査でき、係数一定ゆえ $d\check\omega=0$。$K=2(u^1)^2+3(u^2)^2$ に対して $\partial_i^{(z)}\partial_j^{(\bar z)}K=H_{ij}/2$。従って $i\partial\bar\partial K=(i/2)\sum H_{ij}dz^i\wedge d\bar z^j=\check\omega$。

**(2) Ricci平坦と体積形式。** $dz^1,dz^2$ は複素座標の独立な余接基底なので、その外積は零にならず正則である。$\det H=2\cdot3=6$ は正定数、$\log\det H=\log6$ の二階微分は0。従って $\rho=0$。ノルム二乗も $c_2/6$ で一定である。

**(3) 貼り合わせ。** $A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$。直接積を取って

$$
H'=A^{-\mathsf T}HA^{-1}
=\begin{pmatrix}2&-2\\-2&5\end{pmatrix}.
$$

$d u'^1=du^1+du^2$、$d u'^2=du^2$、$d v'^1=dv^1+dv^2$、$d v'^2=dv^2$ だから

$$
\begin{aligned}
\check\omega'
&=2(du^1+du^2)\wedge(dv^1+dv^2)
 -2(du^1+du^2)\wedge dv^2\\
&\quad-2du^2\wedge(dv^1+dv^2)+5du^2\wedge dv^2\\
&=2du^1\wedge dv^1+3du^2\wedge dv^2=\check\omega.
\end{aligned}
$$

$dz'^1=dz^1+dz^2$、$dz'^2=dz^2$ より $\check\Omega'=dz'^1\wedge dz'^2=\check\Omega$。$A$ と $A^{-1}$ はともに整数行列で $\det A=1$ なので、周期商にも両方向へ降りる。

**(4) 1サイクルと2サイクル。** ファイバーの周期1座標を $x^1,x^2$ とすると

$$
\nabla=d-2\pi i\left(\frac12dx^1+\frac14dx^2\right).
$$

曲率は $-2\pi i\,d(\frac12dx^1+\frac14dx^2)=0$。$\gamma_1+\gamma_2$ のホロノミーは $e^{2\pi i(1/2+1/4)}=e^{3\pi i/2}=-i$。一方、$T^2$ を正向きに積分したB場の位相は $e^{2\pi i(1/2)}=-1$。両者はそれぞれ1サイクル上の平行移動と2サイクル上の閉2形式の積分という**異なる入力**から得られる。等しい必要はない。
<!-- solution-end -->

## 9. 次講へ：楕円曲線で規格化を確かめる

本講では、[前講の複素トーラスの構成](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)に正定値Hessianを追加することでKähler計量が貼り合うことを証明した。Ricci平坦性は $\log\det H$ のアフィン性、固定正則体積形式の定数ノルムは $\det H=C$ という、より強い条件である。次講SYZ1-12では一次元の周期・面積・複素パラメータを具体的に計算し、双対化で何が交換されるかを確かめる。
