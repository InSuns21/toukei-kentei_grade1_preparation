# GMT14 coarea formula：レベル集合の測度

<!-- definition-example-audit: strict -->

[GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)では、同じ像点へ到達する**点の個数**を数えました。しかし $f:\mathbb R^3\to\mathbb R$ が高さを返す場合、$f^{-1}(t)$ は通常は曲面です。逆像の点数は無限で、何も測れません。必要なのは、各高さでの**断面積**を先に測り、その値を高さ方向に積分する操作です。

例えば $f(x,y,z)=z$ と直方体 $Q=[0,2]\times[0,3]\times[0,4]$ なら、$0<t<4$ の断面は面積 $6$ の長方形です。したがって体積 $24$ は $6\times4$ で復元されます。一般の Lipschitz 写像では断面が曲がるため、これに断面方向を除いた体積の倍率を掛ける必要があります。

本講では [GMT9のRademacher定理](../GMT9/index.md#thm-gmt9-rademacher)、[GMT10のGram行列式](../GMT10/index.md#def-gmt10-geometric-jacobian)、[GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)から、rank欠損集合を含めて公式を導きます。最後に [GMT13の整流可能集合](../GMT13/index.md#thm-gmt13-rectifiable-area)へ拡張します。

**測度の規約**：$\mathcal L^j$ は Lebesgue 測度、$\mathcal H^j$ は [MT8の非正規化Hausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)です。[GMT10の正規化補題](../GMT10/index.md#lem-gmt10-hausdorff-normalization)に従って

以下、「ほとんど至る所（almost everywhere; a.e.）」は、明記した測度について零集合を除いて成立することを意味します。

$$
c_j=\mathcal H^j([0,1]^j),\qquad
\mathcal H^j|_{\mathbb R^j}=c_j\mathcal L^j\quad(j\ge1),\qquad
c_0=1
$$

と置きます。$\mathcal H^0$ は点の個数です。特に $c_1=1$ ですが、$c_2$ を無断で $1$ としてはいけません。

## 1. 像の次元だけを測るJacobian

整数 $d\ge m\ge1$ を固定し、開集合 $\Omega\subset\mathbb R^d$ 上の Lipschitz 写像 $f:\Omega\to\mathbb R^m$ を考えます。微分 $Df(x)$ は $m\times d$ 行列です。[GMT10の $d$ 次元像に対する $m$ 次元Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)とは行列の向きが反対なので、**行のGram行列** $Df\,Df^{\mathsf T}$ を使います。

その理由は、$Df$ の各行が独立なら像の $m$ 方向の体積が正であり、行が従属なら $m$ 次元の体積が潰れるからです。Gram行列の行列式は、行ベクトルの作る平行体の体積の二乗です。

<a id="def-gmt14-coarea-jacobian"></a>

<!-- formal-statement-start -->
> **定義（coarea Jacobian）**
> $1\le m\le d$、$\Omega\subset\mathbb R^d$ を開集合、$f:\Omega\to\mathbb R^m$ を Lipschitz 写像とする。微分可能点 $x$ における **coarea Jacobian** を

$$
J_m f(x)=\sqrt{\det(Df(x)Df(x)^{\mathsf T})}
$$

> と定め、微分不能点では $J_mf(x)=0$ とする。rank $Df(x)<m$ なら $J_mf(x)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt14-coarea-jacobian -->
**定義の確認**
**定義を直接確認する例**：$f(x,y,z)=(2x,3y)$ なら

$$
Df=\begin{pmatrix}2&0&0\\0&3&0\end{pmatrix},\quad
Df\,Df^{\mathsf T}
=\begin{pmatrix}4&0\\0&9\end{pmatrix},\quad
J_2f=\sqrt{36}=6.
$$

行が二本あり、独立でrank $2$、その作る面積倍率が $6$ です。一方 $q(x,y,z)=(x,2x)$ なら行が従属でrank $1<2$、Gram行列式は $0$ です。$Df$ の $d\times d$ 行列式を求めようとしても、そもそも $m<d$ では正方行列になりません。
<!-- definition-example-end -->

## 2. レベル集合の測度と公式の形

$k=d-m$ と置きます。[VC1のレベル集合](../../../幾何系/VC/VC1/index.md#def-vc1-level-surface)を一般のベクトル値関数について書けば、値 $y\in\mathbb R^m$ に対応する集合は $f^{-1}(y)=\{x\in\Omega:f(x)=y\}$ です。一般には滑らかな曲面とは限らないため、断面には $\mathcal H^k$ を使います。$k=0$ では点を数えます。

<a id="def-gmt14-slice-integral"></a>

<!-- formal-statement-start -->
> **定義（レベル集合の断面積分）**
> $d\ge m\ge1$、$k=d-m$、$E\subset\Omega\subset\mathbb R^d$ を Borel 集合、$f:\Omega\to\mathbb R^m$ を Lipschitz、$g:E\to[0,\infty]$ を Borel 関数とする。値 $y$ における断面積分を

$$
S_g(y)=\int_{E\cap f^{-1}(y)}g(x)\,d\mathcal H^k(x)
$$

> と書く。$k=0$ の場合は $S_g(y)=\sum_{x\in E,\ f(x)=y}g(x)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt14-slice-integral -->
**定義の確認**
ここで被積分関数 $g$ は空間上の重みです。例えば $d=3,m=1,k=2$、$f(x,y,z)=z$、$E=[0,2]\times[0,3]\times[0,4]$、$g\equiv1$ とすれば、$E$ は Borel、$f$ は Lipschitz、$g$ は非負 Borel です。$0<t<4$ で断面は長方形であり、$S_1(t)=6c_2$、それ以外の高さでは $S_1(t)=0$ です（端点の値は積分に影響しません）。$\mathcal H^2$ を使う理由は断面が2次元だからです。
<!-- definition-example-end -->

これから導く等式では $\mathcal L^3$ で測る直方体体積が $24$、各断面の $\mathcal H^2$ が $6c_2$ なので、係数は $1/c_2$ でなければなりません。以下で滑らかとは限らない断面まで扱います。

## 3. rankが足りない点は、ほとんどの断面に寄与しない

微分がrank $m$ に満たない点では $J_mf=0$ です。しかし左辺が零でも、右辺のレベル集合に正の $\mathcal H^k$ 測度が残れば公式は破綻します。そこで **rank欠損集合の断面はほとんどすべての値で零**と示す必要があります。これは「rank欠損点を像に持つ値が存在しない」という意味ではありません。

<a id="lem-gmt14-critical-slices"></a>

<!-- formal-statement-start -->
> **補題（rank欠損集合のほとんどすべての断面は零測度）**
> $1\le m\le d$、$k=d-m$、$\Omega\subset\mathbb R^d$ は開、$f:\Omega\to\mathbb R^m$ は Lipschitz とする。
> $C=\{x\in\Omega:Df(x)\text{ が存在し、}\operatorname{rank}Df(x)<m\}$ と置くと、

$$
\mathcal H^k(C\cap f^{-1}(y))=0
\quad\text{for }\mathcal L^m\text{-a.e. }y.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各臨界点の近傍の像は低次元の板の薄い管に入ります。その **像の $m$ 次元測度** は球半径の $m$ 乗に小係数を掛けた程度です。一方、断面を元の球で覆うための $\mathcal H^k$ コストは半径の $k$ 乗です。積は半径の $d$ 乗になり、有界重複被覆で総和を抑えられます。

<!-- proof-start -->
### 証明

$k=0$、すなわち $d=m$ の場合、[GMT11のrank欠損像の補題](../GMT11/index.md#lem-gmt11-critical-image)を $f:\mathbb R^d\to\mathbb R^d$ の局所制限に適用すれば $\mathcal L^d(f(C))=0$ です。以降は $k\ge1$ とします。

まず $C_R=C\cap B(0,R)$ に制限し、Lipschitz 定数を $L$ とします。$\varepsilon\in(0,1)$ を固定します。任意の $x\in C_R$ で $A=Df(x)$ のrankを $r\le m-1$ とすると、微分の定義から十分小さい $\rho>0$ で

$$
f(B(x,\rho))\subset f(x)+A(B(0,\rho))+B(0,\varepsilon\rho)
$$

です。$A(B(0,\rho))$ は $r$ 次元部分空間の半径 $L\rho$ の球内なので、像全体はその周囲の厚さ $\varepsilon\rho$ の管です。$r$ 方向に長さ $O(L\rho)$、残る $m-r$ 方向に長さ $O(\varepsilon\rho)$ の箱で覆えば

$$
\mathcal L^m(f(B(x,\rho)))
\le C_{d,m,L}\varepsilon^{m-r}\rho^m
\le C_{d,m,L}\varepsilon\rho^m.
$$

[GMT1の有界重複球被覆補題](../GMT1/index.md#lem-gmt1-besicovitch-balls)で $C_R$ をこのような球 $B_i=B(x_i,\rho_i)$ により覆い、$\rho_i<\delta/2$、被覆重複数を $N_d$ 以下にします。全て $B(0,R+1)$ 内に取れるので

$$
\omega_d\sum_i\rho_i^d
=\sum_i\mathcal L^d(B_i)
\le N_d\,\mathcal L^d(B(0,R+1)).
$$

ここで $\omega_d=\mathcal L^d(B(0,1))$ です。固定した $y$ に対して、$C_R\cap f^{-1}(y)$ を $y\in f(B_i)$ となる $B_i$ だけで覆えます。直径 $\delta$ 未満の Hausdorff 被覆コストを $\mathcal H^k_\delta$ と記せば

$$
\mathcal H^k_\delta(C_R\cap f^{-1}(y))
\le\sum_i(2\rho_i)^k\boldsymbol1_{f(B_i)}(y).
$$

非負項について積分と和を交換し、$k+m=d$ を使うと

$$
\begin{aligned}
\int_{\mathbb R^m}\mathcal H^k_\delta(C_R\cap f^{-1}(y))\,dy
&\le\sum_i(2\rho_i)^k\mathcal L^m(f(B_i))\\
&\le C_{d,m,L}\varepsilon\sum_i\rho_i^{k+m}\\
&\le C_{d,m,L,R}\varepsilon.
\end{aligned}
$$

断面の外測度で書いた場合も、右辺の可測上界と可測包によって同じ零積分の結論を得ます。$\delta\downarrow0$ に沿う [Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)、次に $\varepsilon\downarrow0$ によって、$\int\mathcal H^k(C_R\cap f^{-1}(y))\,dy=0$ です。$R\to\infty$ の可算和を取れば主張が従います。$\square$
<!-- proof-end -->

**微分不能点** $N$ は [Rademacher定理](../GMT9/index.md#thm-gmt9-rademacher)により $\mathcal L^d(N)=0$ です。

$N$ を体積の総和が任意に小さい球で覆います。$f(B_i)$ の $m$ 次元体積を Lipschitz 性から $O(L^m\rho_i^m)$ と評価すると、先ほどと同じ断面被覆の積分は $O(\sum_i\rho_i^d)$ です。

従って $\mathcal H^k(N\cap f^{-1}(y))=0$ がほとんど全ての $y$ で成立します。$k=0$ では [GMT11の零集合の像](../GMT11/index.md#lem-gmt11-lipschitz-null-image)を使います。微分不能点に $J_mf=0$ を割り当てても両辺は変わりません。

## 4. full-rank点での座標変換が核心

rank $m$ の微分 $Df(x)$ には可逆な $m\times m$ 小行列があります。その列に対応する変数を $v\in\mathbb R^m$、残りを $u\in\mathbb R^k$ と並べ替え、座標を

$$
x=(v,u),\qquad
T(v,u)=(f(v,u),u)=(y,u)
$$

へ変えます。$T$ の微分はブロック上三角なので

$$
DT=\begin{pmatrix}A&B\\0&I_k\end{pmatrix},
\qquad Df=(A\ B),\qquad\det DT=\det A\ne0.
$$

逆変換を $h(y,u)=(v(y,u),u)$ とすると、$y$ を固定したまま $u$ を動かす曲面 $h_y(u)=h(y,u)$ がレベル集合を表します。

<a id="lem-gmt14-full-rank-chart"></a>

<!-- formal-statement-start -->
> **補題（full-rank座標片のJacobian恒等式）**
> $d=m+k$、$k\ge1$ とし、$f:\Omega\subset\mathbb R^d\to\mathbb R^m$ が点 $x=(v,u)$ で微分可能で、$Df(x)=(A\ B)$ の $m\times m$ 行列 $A$ が可逆とする。$T(v,u)=(f(v,u),u)$ と置く。局所逆変換の微分が存在する場所では

$$
J_mf(x)
=|\det DT(x)|\,J_k(D_uh(T(x))).
$$

> ここで $D_uh$ は $y$ を固定した $u$ 方向の微分、$J_k$ は [GMT10の列Gram行列式](../GMT10/index.md#def-gmt10-geometric-jacobian)による $k$ 次元Jacobianである。
<!-- formal-statement-end -->

### 証明の見取り図

座標変換の $d$ 次元体積倍率と、固定した $y$ に沿う $k$ 次元の断面倍率を掛けると、残る $m$ 方向の倍率になります。行列を実際に書いて $m+k=d$ の関係を検算します。

<!-- proof-start -->
### 証明

$T$ の微分の逆行列は

$$
(DT)^{-1}
=\begin{pmatrix}A^{-1}&-A^{-1}B\\0&I_k\end{pmatrix}.
$$

従って $D_uh=\begin{pmatrix}-A^{-1}B\\I_k\end{pmatrix}$ です。その列Gram行列式は

$$
J_k(D_uh)^2
=\det\big(I_k+B^{\mathsf T}A^{-\mathsf T}A^{-1}B\big).
$$

一方、$\det(I+PQ)=\det(I+QP)$ を $P=A^{-1}B$、$Q=B^{\mathsf T}A^{-\mathsf T}$ に用いると

$$
\begin{aligned}
|\det A|^2J_k(D_uh)^2
&=\det(AA^{\mathsf T})\det(I_m+A^{-1}BB^{\mathsf T}A^{-\mathsf T})\\
&=\det(AA^{\mathsf T}+BB^{\mathsf T})\\
&=\det(Df\,Df^{\mathsf T})=(J_mf)^2.
\end{aligned}
$$

$|\det DT|=|\det A|$ と両辺の非負平方根から結論が得られます。$\square$
<!-- proof-end -->

この補題は **近傍全体での可逆性を保証しません**。一点で $DT$ が可逆であっても、Lipschitz 写像 $T$ がその近傍で単射とは限らないためです。次の導出では、単射な**可測小片**に分けて使います。

<a id="thm-gmt14-coarea"></a>

<!-- formal-statement-start -->
> **定理（Euclid空間のcoarea formula）**
> $1\le m\le d$、$k=d-m$、$\Omega\subset\mathbb R^d$ を開集合、$f:\Omega\to\mathbb R^m$ を Lipschitz 写像とする。任意の Borel 集合 $E\subset\Omega$ と非負 Borel 関数 $g:E\to[0,\infty]$ に対し、[断面積分](#def-gmt14-slice-integral) $S_g$ は Lebesgue 測度の完備化について可測で、

$$
\boxed{\displaystyle
\int_E g(x)J_mf(x)\,d\mathcal L^d(x)
=\frac1{c_k}\int_{\mathbb R^m}
S_g(y)\,d\mathcal L^m(y).
}
$$

> 等号は両辺が $+\infty$ の場合も含む。$\mathcal H^d$ を左辺に用いるなら右辺の係数は $c_d/c_k$ となる。$k=0$ の場合は $c_0=1$、断面積分は重複度の和である。
<!-- formal-statement-end -->

## 5. coarea公式を導く：断面積分とarea公式を交換する

### 証明の見取り図

rank欠損点と微分不能点を第3節で処理しました。full-rank点を可算個の片へ分け、各片で $T=(f,u)$ を双Lipschitzにします。その片を $(y,u)$ 座標へ変換し、$u$ 方向の面積公式と $y$ 方向のFubiniを続けて適用します。最後に非負項の和を戻します。

<!-- proof-start -->
### [Euclid空間のcoarea formula](#thm-gmt14-coarea) の証明

まず $k\ge1$ とします。$Df$ が存在しrank $m$ の点 $x$ では、ある $m$ 本の列を抜いた行列 $A$ が可逆です。列の選び方は有限通りです。これを固定した部分では $T(x)=(f(x),u)$ の微分 $DT(x)$ が可逆です。

**(1) 双Lipschitz片を作る。** [GMT11のfull-rank片への可算分割](../GMT11/index.md#thm-gmt11-area-formula)を、今度は同次元の Lipschitz 写像 $T:\mathbb R^d\to\mathbb R^d$ に適用します。

微分の最小特異値を $1/q$ 以上に固定し、微分行列を一定の $M$ で $\eta$ 以内に近似します。点 $a,b$ の微分誤差を引き算すると、同じ小片 $P$ 上で

$$
|T(a)-T(b)-M(a-b)|\le2\eta|a-b|
$$

となるよう可算分割します。$2\eta<s(M)$ と選べば

$$
(s(M)-2\eta)|a-b|\le|T(a)-T(b)|
$$

であり、$T|_P$ とその逆 $h:T(P)\to P$ は共に Lipschitz です。各片は Borel 代表に取り、互いに素に直します。元の $E$ と交わらせても双Lipschitz性は保たれます。

**(2) $d$ 次元の面積公式で座標を変える。** 一つの片 $P\subset E$ を固定し、$B=T(P)\subset\mathbb R^m\times\mathbb R^k$ と置きます。$T$ は単射なので [GMT11の重み付き面積公式](../GMT11/index.md#cor-gmt11-weighted-area)で $d$ 次元の場合 $c_d$ を両辺から消すと、任意の非負 Borel 関数 $w$ に対して

$$
\int_Pw(x)|\det DT(x)|\,dx
=\int_Bw(h(y,u))\,dy\,du.
$$

$DT$ はfull-rankの片で $|\det DT|>0$ です。$w(x)=g(x)J_mf(x)/|\det DT(x)|$ を選び、第4節の [Jacobian恒等式](#lem-gmt14-full-rank-chart)を代入すれば

$$
\int_PgJ_mf\,dx
=\int_Bg(h(y,u))J_k(D_uh(y,u))\,dy\,du.
$$

逆写像 $h$ の任意の Lipschitz 延長の微分は $B$ の密度1点で同じです。$T$ の逆微分は、$T$ と $h$ の二点差分を密度1点で合成することにより $(DT)^{-1}$ となります。したがって上の等式は $\mathcal L^d$-a.e.の正しい導関数で成立します。

**(3) Fubiniで断面ごとに積分する。** $B_y=\{u:(y,u)\in B\}$ とします。非負の被積分関数について [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli) を適用すると

$$
\int_Bg(h)J_k(D_uh)\,dy\,du
=\int_{\mathbb R^m}\left(
\int_{B_y}g(h_y(u))J_kh_y(u)\,du
\right)dy.
$$

ほとんど全ての $y$ で、$B_y$ の密度1点における $u$ 微分は $D_uh$ と一致します。$h_y$ は $B_y$ 上の双Lipschitz写像で、座標ごとの Lipschitz 延長が存在します。$u\mapsto h_y(u)$ に [GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)を $k$ 次元で適用すると、$h_y$ は単射で $h_y(B_y)=P\cap f^{-1}(y)$ だから

$$
c_k\int_{B_y}g(h_y(u))J_kh_y(u)\,du
=\int_{P\cap f^{-1}(y)}g(x)\,d\mathcal H^k(x).
$$

よって

$$
\int_PgJ_mf\,dx
=\frac1{c_k}\int_{\mathbb R^m}
\int_{P\cap f^{-1}(y)}g\,d\mathcal H^k\,dy.
$$

**(4) 全体へ戻す。** 互いに素な可算片 $P_j$ に上の等式を足します。左辺は非負なので [単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)で和を取れ、右辺の断面は互いに素なので加法的です。片に入らなかった微分不能集合とrank欠損集合は、第3節によって左辺・ほとんど全ての断面で零となります。Borel代表に対する等式から、非負 Borel $g$ と Borel $E$ 全体へ拡張されます。各片の断面積分は Fubini 表示から可測であり、零寄与集合を加えても完備化に関する可測性は維持されます。

最後に $k=0$、つまり $d=m$ では、[GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)をそのまま $f:\mathbb R^d\to\mathbb R^d$ に適用します。$c_d\int g|\det Df|\,dx=\int\sum g\,d\mathcal H^d=c_d\int\sum g\,dy$ であり、$J_df=|\det Df|$、$c_0=1$ なので同じ公式です。$\square$
<!-- proof-end -->

## 6. 線形射影・距離関数・極座標

### 6.1 射影：断面の厚みを積分する

$f:\mathbb R^{m+k}\to\mathbb R^m$、$f(y,u)=y$ は $Df=(I_m\ 0)$ なので $J_mf=1$ です。$E=A\times B$（Borel、$\mathcal L^m(A),\mathcal L^k(B)<\infty$）を代入すると

$$
\begin{aligned}
\int_E J_mf\,d\mathcal L^{m+k}
&=\mathcal L^m(A)\mathcal L^k(B),\\
\frac1{c_k}\int_A\mathcal H^k(\{y\}\times B)\,dy
&=\frac1{c_k}\int_Ac_k\mathcal L^k(B)\,dy.
\end{aligned}
$$

両辺が一致します。一般の可測 $E$ に対しても、同じ関係は断面ごとのFubiniの公式になります。

### 6.2 距離関数：球面積を半径で積分する

$d\ge2$ とし、$r(x)=|x|$ を $\mathbb R^d$ 上で考えます。$x\ne0$ では $Dr(x)=x^{\mathsf T}/|x|$、よって $J_1r(x)=1$ です。原点は $\mathcal L^d$-零で、$r^{-1}(t)=S^{d-1}_t$（$t>0$）です。非正規化Hausdorff測度の相似性より $\mathcal H^{d-1}(S^{d-1}_t)=t^{d-1}\mathcal H^{d-1}(S^{d-1}_1)$ です。球 $B(0,R)$ に公式を適用すれば

$$
\omega_dR^d
=\frac{\mathcal H^{d-1}(S^{d-1}_1)}{c_{d-1}}
\int_0^R t^{d-1}\,dt
=\frac{\mathcal H^{d-1}(S^{d-1}_1)}{c_{d-1}}\frac{R^d}{d}.
$$

したがって球面の正規化面積は $d\omega_d$、すなわち $\mathcal H^{d-1}(S^{d-1}_1)=c_{d-1}d\omega_d$ と求まります。これは幾何学的な球面積公式とも一致します。

### 6.3 極座標：角度の「長さ」が $r$ 倍になる

平面 $d=2,m=1,k=1$ では $c_1=1$ です。非負 Borel 関数 $g$ に対して $f(x)=|x|$ を使うと

$$
\int_{\mathbb R^2}g(x)\,dx
=\int_0^\infty\left(\int_{|x|=r}g(x)\,d\mathcal H^1(x)\right)\,dr.
$$

円周を $\gamma_r(\theta)=(r\cos\theta,r\sin\theta)$、$0\le\theta<2\pi$ でパラメータ表示すると $|\gamma_r'(\theta)|=r$ です。[GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)から、円周上での積分は $\int_0^{2\pi}g(r\cos\theta,r\sin\theta)r\,d\theta$ です。従って

$$
\int_{\mathbb R^2}g(x)\,dx
=\int_0^\infty\int_0^{2\pi}
g(r\cos\theta,r\sin\theta)\,r\,d\theta\,dr.
$$

半径の因子 $r$ は $J_1r=1$ からではなく、**円周断面の長さ**から生まれます。

## 7. 整流可能集合でも断面を積分できる

$s$ 次元の可算整流可能集合 $E\subset\mathbb R^d$ 上で $f:E\to\mathbb R^m$（$1\le m\le s\le d$）を考えます。[GMT13の接平面](../GMT13/index.md#def-gmt13-tangent-plane) $T_xE$ に $f$ の微分を制限した線形写像 $D^Ef:T_xE\to\mathbb R^m$ は、$m\times s$ 行列で表せます。その **接coarea Jacobian** は行Gram行列式

$$
J_m^Ef(x)=\sqrt{\det(D^Ef(x)(D^Ef(x))^{\mathsf T})}
$$

です。接方向を直交基底で取り替えても、右から直交行列が掛かるだけなので値は変わりません。$m=s$ では [GMT13の接Jacobian](../GMT13/index.md#def-gmt13-tangential-jacobian)と一致します。

<a id="cor-gmt14-rectifiable-coarea"></a>

<!-- formal-statement-start -->
> **系（整流可能集合上のcoarea formula）**
> $1\le m\le s\le d$ を整数とし、$k=s-m$ とする。$E\subset\mathbb R^d$ は $\mathcal H^s$-可測で可算 $s$-整流可能、$f:E\to\mathbb R^m$ は Lipschitz、$g:E\to[0,\infty]$ は非負 $\mathcal H^s$-可測とする。$\mathcal H^s$-ほとんどすべての点の接微分で定める $J_m^Ef$ について

$$
\boxed{\displaystyle
\int_E g(x)J_m^Ef(x)\,d\mathcal H^s(x)
=\frac{c_s}{c_k}\int_{\mathbb R^m}
\left(\int_{E\cap f^{-1}(y)}g(x)\,d\mathcal H^k(x)\right)dy.
}
$$

> $k=0$ では断面積分を逆像点の和と解釈する。どちらの側も拡張非負実数値を取ってよい。
<!-- formal-statement-end -->

### 証明の見取り図

[GMT13の可算双Lipschitz片](../GMT13/index.md#lem-gmt13-bilipschitz-pieces)ごとに $x=\phi(a)$ と置き、$F=f\circ\phi:\mathbb R^s\to\mathbb R^m$ へ Euclid coarea を適用します。レベル集合に沿う $\phi$ の面積倍率と接coarea Jacobianが、もとの $\phi$ の全体Jacobianを分解することを示します。

<!-- proof-start -->
### 証明

$k=0$ は [GMT13の整流可能集合上のarea formula](../GMT13/index.md#thm-gmt13-rectifiable-area)を $F=f$ と $n=m=s$ で使うと右辺が $\int\sum g\,d\mathcal H^s(y)=c_s\int\sum g\,dy$ となり成立します。以下 $k\ge1$ とします。

互いに素な双Lipschitz片 $E_i=\phi_i(A_i)$ で $E$ を零集合を除いて覆います。$\phi_i:A_i\subset\mathbb R^s\to E_i$ を Lipschitz 延長し、$F_i=f\circ\phi_i$ も各座標を延長します。密度1点の微分で値は一意です。$\phi_i$ の微分はrank $s$ を持ち、[GMT13の接平面](../GMT13/index.md#def-gmt13-tangent-plane)はその列の像です。

一つの片で $P=D\phi$（$d\times s$）、$Q=DF$（$m\times s$）と書きます。rank $Q=m$ の点では、$\mathbb R^s=\ker Q\oplus(\ker Q)^\perp$ の正規直交基底を選びます。$P=(U\ V)$、$Q=(0\ C)$ と分け、$U$ は $d\times k$、$V$ は $d\times m$、$C$ は可逆な $m\times m$ 行列です。

$G=P^{\mathsf T}P$ のブロック行列式を計算します。$U^{\mathsf T}U$ は正定値なので Schur 補行列

$$
S=V^{\mathsf T}V-V^{\mathsf T}U(U^{\mathsf T}U)^{-1}U^{\mathsf T}V
$$

も正定値で、$\det G=\det(U^{\mathsf T}U)\det S$ です。接方向の内積は $G$ で与えられるので、$D^Ef$ の行Gram行列式は $QG^{-1}Q^{\mathsf T}=CS^{-1}C^{\mathsf T}$ です。したがって

$$
\begin{aligned}
(J_m^Ef)^2(J_s\phi)^2
&=\frac{(\det C)^2}{\det S}
  \det(U^{\mathsf T}U)\det S\\
&=(J_mF)^2(J_k(P|_{\ker Q}))^2.
\end{aligned}
$$

非負平方根から

$$
J_m^Ef(\phi(a))J_s\phi(a)
=J_mF(a)J_k(D\phi(a)|_{\ker DF(a)})
$$

が成立します。rank $Q<m$ なら両辺の $m$-Jacobian は $0$ であり、[rank欠損集合のほとんどすべての断面は零測度という補題](#lem-gmt14-critical-slices)によりほとんどの $y$ の断面積分にも寄与しません。

まず [GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)を単射な $\phi_i$ に使い、$c_s$ を保持します。次に上の恒等式を代入して $F_i$ に [Euclid coarea](#thm-gmt14-coarea)を適用します。

ほとんど全ての $y$ に対し、$A_i\cap F_i^{-1}(y)$ は第5節のfull-rank片の逆像により可算 $k$-整流可能です。その接方向は $\ker DF_i$ となります。

最後に断面上の $\phi_i$ へ [GMT13の整流可能集合上のarea formula](../GMT13/index.md#thm-gmt13-rectifiable-area)を適用します。この操作で $J_k(D\phi_i|_{\ker DF_i})$ の積分を、像の断面 $E_i\cap f^{-1}(y)$ の $\mathcal H^k$ 積分へ変えます。係数を明示すると

$$
\begin{aligned}
\int_{E_i}gJ_m^Ef\,d\mathcal H^s
&=c_s\int_{A_i}(g\circ\phi_i)J_m^Ef(\phi_i)J_s\phi_i\,da\\
&=c_s\int_{A_i}(g\circ\phi_i)J_mF_i\,J_k(D\phi_i|_{\ker DF_i})\,da\\
&=\frac{c_s}{c_k}\int_{\mathbb R^m}
\int_{E_i\cap f^{-1}(y)}g\,d\mathcal H^k\,dy.
\end{aligned}
$$

第2行から第3行では coarea と断面上の面積公式を続けて使い、断面の可算片を重複なく足しました。$E_i$ を足し合わせます。残余 $Z=E\setminus\bigcup_iE_i$ は $\mathcal H^s(Z)=0$ なので、任意の $\delta,\varepsilon>0$ に対し直径 $2r_j<\delta$ の球で $Z$ を覆い、$\sum_j(2r_j)^s<\varepsilon$ とできます。$f$ は $E$ 上で Lipschitz だから $f(Z\cap B_j)$ は半径 $2Lr_j$ の球に入り、$\mathcal L^m(f(Z\cap B_j))\le C_{m,L}r_j^m$ です。ほとんど全ての $y$ で測定できる断面の $\delta$-Hausdorff被覆コストを積分すると

$$
\int_{\mathbb R^m}\mathcal H^k_\delta(Z\cap f^{-1}(y))\,dy
\le C_{m,L}\sum_j(2r_j)^kr_j^m
\le C_{m,L}\varepsilon.
$$

$k+m=s$ を使いました。$\delta,\varepsilon\downarrow0$ によりほとんど全ての断面で $Z$ の $\mathcal H^k$ 測度は零となります。これで左辺・右辺とも残余は寄与しません。完備化により非負 $\mathcal H^s$-可測 $g$ にも拡張できます。$\square$
<!-- proof-end -->

**具体例：円柱の側面**。$E=\{(R\cos\theta,R\sin\theta,z):0\le\theta<2\pi,\ 0\le z\le H\}$、$f(x,y,z)=z$、$s=2,m=1,k=1$ では接Jacobian $J_1^Ef=1$、各 $z$ の断面長は $2\pi R$ です。したがって

$$
\mathcal H^2(E)=c_2(2\pi RH)
=\frac{c_2}{c_1}\int_0^H2\pi R\,dz,
$$

と両側で係数 $c_2$ が一致します。

## 8. 仮定を落とすと何が起きるか

**「全てのレベル集合が滑らか」とは言っていない。** $f(x,y)=x^2$ を有界領域へ制限すると $x=0$ はrank欠損点で、$y=0$ に対応するレベル集合は一本の線分です。この線分は正の $\mathcal H^1$ 測度を持ちますが、悪いレベル値は一つだけで $\mathcal L^1$-零です。第3節は**ほとんど全ての値**についての主張です。

**単なる連続性では足りない。** $f:[0,1]\to[0,1]$ をCantor関数とすると、単調連続なのにほとんど至る所で導関数が $0$ です。もし Lipschitz を外し、左辺のJacobianを微分可能点の導関数の絶対値に置き換えれば左辺は $0$ ですが、全区間を写し、ほとんど全ての値の逆像は少なくとも一点を持つので右辺は $1$ 以上です。破綻する機構は、Lipschitz性に依存した零集合の像・rank欠損部分の制御です。

## 9. 演習（全10題・詳細解答）

### Level A：断面とJacobianを自分で計算

<a id="ex-gmt14-a1"></a>

**A1. 射影と直方体**
- Level: A
- 問題: $f(x,y,z)=x$、$E=[0,2]\times[0,3]\times[0,4]$ として、$J_1f$、断面の $\mathcal H^2$ 測度、coarea公式の両辺を求めよ。

<!-- solution-start -->
**詳細解答**

$Df=(1,0,0)$、$Df\,Df^{\mathsf T}=(1)$ なので $J_1f=1$ です。$0<t<2$ で $E\cap f^{-1}(t)=\{t\}\times[0,3]\times[0,4]$、その $\mathcal H^2$ 測度は $12c_2$ です。したがって左辺は $2\cdot3\cdot4=24$、右辺は $c_2^{-1}\int_0^2 12c_2\,dt=24$ です。
<!-- solution-end -->

<a id="ex-gmt14-a2"></a>

**A2. 一方向の倍率**
- Level: A
- 問題: $f(x,y)=3x$、$E=[0,2]\times[0,1]$ とする。断面積分と $J_1f$ の両側の倍率を求めよ。

<!-- solution-start -->
**詳細解答**

$Df=(3,0)$ なので $J_1f=3$、左辺は $3\mathcal L^2(E)=6$ です。$0<t<6$ では $f^{-1}(t)\cap E=\{t/3\}\times[0,1]$ という長さ1の線分です。$k=1$、$c_1=1$ だから右辺は $\int_0^6 1\,dt=6$ です。像の値域の長さが $3$ 倍になり、断面長は変わりません。
<!-- solution-end -->

<a id="ex-gmt14-a3"></a>

**A3. 半径の微分**
- Level: A
- 問題: $r(x,y)=\sqrt{x^2+y^2}$ を $x^2+y^2\le R^2$ 上で考え、$J_1r$ と各正の半径の断面長から円板の面積を導け。

<!-- solution-start -->
**詳細解答**

原点以外では $Dr=(x/r,y/r)$、従って $J_1r=\sqrt{(x^2+y^2)/r^2}=1$ です。原点は零測度です。半径 $t>0$ の円周は $\gamma(\theta)=(t\cos\theta,t\sin\theta)$ により長さ $\int_0^{2\pi}|\gamma'(\theta)|\,d\theta=\int_0^{2\pi}t\,d\theta=2\pi t$ です。coarea右辺は $\int_0^R2\pi t\,dt=\pi R^2$、左辺は円板の面積です。
<!-- solution-end -->

<a id="ex-gmt14-a4"></a>

**A4. rank欠損**
- Level: A
- 問題: $f(x,y,z)=(x,2x)$ について $J_2f$ を求め、$f^{-1}(0,0)$ が非空でも coarea右辺が零となる理由を述べよ。

<!-- solution-start -->
**詳細解答**

$Df=\begin{pmatrix}1&0&0\\2&0&0\end{pmatrix}$ で行rankは1です。$Df\,Df^{\mathsf T}=\begin{pmatrix}1&2\\2&4\end{pmatrix}$ の行列式は $4-4=0$、よって $J_2f=0$ です。像は直線 $\{(t,2t):t\in\mathbb R\}$ に含まれ、$\mathcal L^2$-零です。$f^{-1}(0,0)=\{(0,y,z)\}$ が非空で $\mathcal H^1$ は無限にもなりますが、その値を含め像側の例外値は二次元Lebesgue零集合なので、積分には寄与しません。
<!-- solution-end -->

<a id="ex-gmt14-a5"></a>

**A5. 高さ方向の重み**
- Level: A
- 問題: $E=[0,1]^3$、$f(x,y,z)=z$、$g(x,y,z)=z^2$ のcoarea公式を計算せよ。

<!-- solution-start -->
**詳細解答**

$J_1f=1$、左辺は $\int_0^1\int_0^1\int_0^1z^2\,dx\,dy\,dz=\int_0^1z^2\,dz=1/3$ です。$0<t<1$ の断面は単位正方形で、そこで $g=t^2$ なので断面積分は $t^2c_2$ です。右辺は $c_2^{-1}\int_0^1t^2c_2\,dt=1/3$ です。
<!-- solution-end -->

### Level B：証明の機構と係数を確かめる

<a id="ex-gmt14-b1"></a>

**B1. full-rank座標の逆行列**
- Level: B
- 問題: $f(x,y,z)=2x+3z$、$T(x,y,z)=(f(x,y,z),y,z)$ とする。$\det DT$、$D_{(y,z)}T^{-1}$ の2次元Jacobian、$J_1f$ を求め、[full-rank恒等式](#lem-gmt14-full-rank-chart)を検算せよ。

<!-- solution-start -->
**詳細解答**

$DT=\begin{pmatrix}2&0&3\\0&1&0\\0&0&1\end{pmatrix}$ なので $\det DT=2$ です。$T^{-1}(t,y,z)=((t-3z)/2,y,z)$ から

$$
D_{(y,z)}T^{-1}
=\begin{pmatrix}0&-3/2\\1&0\\0&1\end{pmatrix},\quad
(D_uT^{-1})^{\mathsf T}D_uT^{-1}
=\begin{pmatrix}1&0\\0&13/4\end{pmatrix}.
$$

したがって $J_2(D_uT^{-1})=\sqrt{13}/2$、積は $2(\sqrt{13}/2)=\sqrt{13}$ です。一方 $Df=(2,0,3)$ だから $J_1f=\sqrt{4+9}=\sqrt{13}$ です。変数は $(y,z)$ の2方向であり、$t$ は固定しています。
<!-- solution-end -->

<a id="ex-gmt14-b2"></a>

**B2. 有界領域の臨界断面**
- Level: B
- 問題: $f(x,y)=x^2$ を $E=[-1,1]\times[0,2]$ に制限する。臨界集合、$0<t<1$ の断面長、coareaの両辺を計算し、$t=0$ の扱いを述べよ。

<!-- solution-start -->
**詳細解答**

$Df=(2x,0)$ で $J_1f=2|x|$、臨界集合は $\{0\}\times[0,2]$ です。$0<t<1$ では $x=\pm\sqrt t$ の縦線分が2本あり、それぞれ長さ2なので $S_1(t)=4$ です。右辺は $\int_0^1 4\,dt=4$。左辺は

$$
\int_{-1}^1\int_0^2 2|x|\,dy\,dx
=2\left(2\int_0^1 2x\,dx\right)=4.
$$

$t=0$ の断面は長さ2ですが、値 $t=0$ は一点のLebesgue零集合なので積分に影響しません。「臨界断面が全て空になる」とは主張していません。
<!-- solution-end -->

<a id="ex-gmt14-b3"></a>

**B3. $d=m$ と非正規化係数**
- Level: B
- 問題: $f:\mathbb R^2\to\mathbb R^2$、$f(x,y)=(2x,3y)$、$E=[0,1]^2$ とする。$J_2f$ と $N(f,E,z)$ を用い、coareaがGMT11のarea formulaと一致することを示せ。

<!-- solution-start -->
**詳細解答**

$Df=\operatorname{diag}(2,3)$ で $J_2f=|\det Df|=6$、左辺は $6$ です。$f$ は単射で $f(E)=[0,2]\times[0,3]$、その内部の点で $N=1$、外で $N=0$ です。$k=0$、$c_0=1$ なのでcoarea右辺は $\int_{\mathbb R^2}N\,d\mathcal L^2=6$ です。一方GMT11の式は $c_2\cdot6=\int N\,d\mathcal H^2=c_2\cdot6$ で、$c_2$ を両側から消した同じ内容です。
<!-- solution-end -->

<a id="ex-gmt14-b4"></a>

**B4. 円柱の側面と接coarea**
- Level: B
- 問題: 半径 $R>0$、高さ $H>0$ の円柱側面 $E$ に $f(x,y,z)=z$ を適用する。接Jacobian、各断面の長さ、$\mathcal H^2(E)$ を計算せよ。空間全体のLebesgue測度を左辺に使ってはいけない理由も述べよ。

<!-- solution-start -->
**詳細解答**

$\phi(\theta,z)=(R\cos\theta,R\sin\theta,z)$ の接方向を与える微分列は $\phi_\theta=(-R\sin\theta,R\cos\theta,0)$ と $\phi_z=(0,0,1)$ で直交します。正規直交接基底 $(\phi_\theta/R,\phi_z)$ への $D^Ef$ の値は $(0,1)$、従って $J_1^Ef=1$ です。$0<t<H$ の断面は半径 $R$ の円で $\mathcal H^1=2\pi R$。$c_1=1$ なので整流可能集合のcoarea公式の右辺は $c_2\int_0^H2\pi R\,dt=2\pi RHc_2$ です。左辺は $\int_E1\,d\mathcal H^2=\mathcal H^2(E)=c_2(2\pi RH)$ です。曲面 $E$ は $\mathcal L^3$-零なので、その体積積分では側面積を測れません。
<!-- solution-end -->

### Level C：radial重み・測度・例外集合を接続する

<a id="ex-gmt14-c1"></a>

**C1. 重み付き円環と非線形半径**
- Level: C
- 問題: $0<a<b$、$E=\{(x,y):a\le x^2+y^2\le b\}$、$f(x,y)=x^2+y^2$、$g(x,y)=x^2+y^2$ とする。(i) $J_1f$、(ii) 各値 $t$ の断面積分 $S_g(t)$、(iii) coareaの両辺を計算せよ。さらに $a=0$ にしたときの例外点の扱いを説明せよ。

<!-- solution-start -->
**詳細解答**

**(i)** $Df=(2x,2y)$ なので $J_1f=\sqrt{4x^2+4y^2}=2r$、ただし $r=\sqrt{x^2+y^2}$ です。

**(ii)** $a<t<b$ では $f^{-1}(t)$ は半径 $\sqrt t$ の円で、$\mathcal H^1$ 長は $2\pi\sqrt t$ です。円上では $g=t$ が一定なので

$$
S_g(t)=t\cdot2\pi\sqrt t=2\pi t^{3/2}.
$$

$m=k=1$、$c_1=1$ だから右辺は

$$
\int_a^b2\pi t^{3/2}\,dt
=\frac{4\pi}{5}(b^{5/2}-a^{5/2}).
$$

**(iii)** 左辺は $\int_E gJ_1f\,dx\,dy=\int_E2r^3\,dx\,dy$ です。[距離関数から導出した極座標](#thm-gmt14-coarea)の $dx\,dy=r\,dr\,d\theta$ を使い、

$$
\begin{aligned}
\int_{\sqrt a}^{\sqrt b}\int_0^{2\pi}2r^4\,d\theta\,dr
&=4\pi\int_{\sqrt a}^{\sqrt b}r^4\,dr\\
&=\frac{4\pi}{5}\big((\sqrt b)^5-(\sqrt a)^5\big)\\
&=\frac{4\pi}{5}(b^{5/2}-a^{5/2})
\end{aligned}
$$

となって一致します。$a=0$ では原点で $Df=0$、レベル $t=0$ は一点ですが、原点は面積零、値 $t=0$ もLebesgue零であり、式の極限 $a\downarrow0$ はどちら側でも連続です。
<!-- solution-end -->

## 10. 次へ：断面積分から密度と接平面へ

coarea公式は「値を固定した集合の測度」を積分で足し合わせる道具です。しかし、可算整流可能集合がどの点でも平面に近いというわけではありません。次の GMT15 では、球内の $\mathcal H^m$ の密度と近似接平面を、**局所有限測度などの仮定を明示したうえで**結びつけます。
