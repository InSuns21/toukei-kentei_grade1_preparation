# GMT11 area formula：重複度と測度

<!-- definition-example-audit: strict -->

[GMT10の線形面積倍率](../GMT10/index.md#thm-gmt10-linear-area)では、線形写像 $A:\mathbb R^m\to\mathbb R^d$ が集合の $m$ 次元面積を $J_m(A)$ 倍することを証明しました。しかし、非線形写像では **別々の点が同じ像へ重なる**ことがあります。例えば $f(t)=|t|$ は左右の区間を同じ区間へ折り返します。導関数の絶対値はほとんど至る所で $1$ なのに、像の長さは元の区間の半分です。

この講義では「微分の面積倍率を積分した値」は、像を一回だけ測る量ではなく、**各像点が何回現れたかを数えて測る量**になることを示します。そのために、微分の rank が足りない部分、単射にできる部分、最後に各部分の重複を足す操作を分けます。次の GMT12・GMT13 ではこの公式を曲面状の集合へ広げます。

以下 $1\le m\le d$、$\Omega\subset\mathbb R^m$ は開集合、$f:\Omega\to\mathbb R^d$ は $L>0$ を Lipschitz 定数とする写像とします。$\mathcal L^m$ は定義域上の Lebesgue 測度、$\mathcal H^m$ は [MT8の直径による非正規化 Hausdorff 測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)です。[GMT10の比例定数](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を

$$
c_m=\mathcal H^m([0,1]^m)>0,\qquad
\mathcal H^m\big|_{\mathbb R^m}=c_m\mathcal L^m
$$

と書きます。とくに $c_1=1$ ですが、一般の $m$ で $c_m=1$ と置いてはいけません。

[Rademacherの微分可能性定理](../GMT9/index.md#thm-gmt9-rademacher)により $Df$ は Lebesgue 測度に関してほとんど至る所（almost everywhere; a.e.）で存在します。微分可能点 $x$ での $Df(x):\mathbb R^m\to\mathbb R^d$ は線形写像です。

その標準基底の像を列に並べた行列から、既習の [m次元幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian) に従って

$$
J_m f(x)=J_m(Df(x))
=\sqrt{\det(Df(x)^{\mathsf T}Df(x))}
$$

と置きます。行列 $Df(x)^{\mathsf T}Df(x)$ の $(i,j)$ 成分は $Df(x)e_i\cdot Df(x)e_j$ であり、微分が送る基底方向の長さと角度を記録します。微分不能点では便宜上 $J_m f=0$ と定めます。これは可測な非負関数です。

## 1. 折り重なった像をどう数えるか

まず $f(t)=|t|$ を区間 $E=[-1,1]$ に制限します。$y\in(0,1)$ の逆像は $\{-y,y\}$ の二点、$y=0$ の逆像は一点、$y\notin[0,1]$ では空です。像の長さだけを使うと $1$、微分の絶対値の積分は $2$ となります。この差を消すには、像点 $y$ ごとに逆像の個数を数えればよいのです。

写像の各像点について、この「逆像の個数」を **重複度** として記録します。$\#S$ は集合 $S$ の要素数であり、無限集合なら値 $+\infty$ も許します。

<a id="def-gmt11-multiplicity"></a>

<!-- formal-statement-start -->
> **定義（写像の重複度）**
> 集合 $E\subset\Omega$、写像 $f:\Omega\to\mathbb R^d$、点 $y\in\mathbb R^d$ に対し、$f$ の $E$ 上での重複度を

$$
N(f,E,y)=\#\{x\in E:f(x)=y\}\in\{0,1,2,\ldots,\infty\}
$$

> と定める。$N(f,E,y)$ は $y$ における **異なる定義域の点の個数**を数え、導関数の大きさや符号は数えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt11-multiplicity -->
### 直接例：絶対値写像の逆像を全部挙げる

**定義の確認**：定義域の異なる点を一つずつ調べ、逆像の個数がどの値になるかを直接確認します。

$f(t)=|t|$、$E=[-1,1]$ では

$$
N(f,E,y)=
\begin{cases}
2 &(0<y\le1),\\
1 &(y=0),\\
0 &(y<0\text{ または }y>1).
\end{cases}
$$

$y=1$ にも $-1,1$ の二点があります。両端と折り目を直接調べると、重複度は上の三通りの非負整数（または $\infty$）という定義の値域に入ると確認できます。$\mathcal H^1$ では一点の測度は $0$ なので

$$
\int_{\mathbb R}N(f,E,y)\,d\mathcal H^1(y)
=\int_0^1 2\,dy=2.
$$

一方 $t\ne0$ で $|f'(t)|=1$ ですから、$\int_{-1}^1|f'(t)|\,dt=2$ と一致します。重複度は「向き付きの符号の和」ではありません。
<!-- definition-example-end -->

## 2. 面積公式で何を結びたいか

目標は、定義域上の Jacobian の積分と、像側で重複度を足した積分を、$c_m$ を含めて等しくすることです。式の正確な仮定・結論は、第3・4節の補題を準備してから第5節の定理で述べます。

### 何が主張され、何を証明すべきか

- 左辺は **定義域** の $\mathcal L^m$ で $m$ 次元の局所倍率を積分します。$c_m$ は [GMT10の線形面積倍率](../GMT10/index.md#thm-gmt10-linear-area)から必要になります。
- 右辺は **像側** の $\mathcal H^m$ で逆像の個数を積分します。像が一点を通るたびに一回ずつ足すので、折り返しを失いません。
- 微分の rank が $m$ 未満なら [Gram行列式のrank条件](../GMT10/index.md#thm-gmt10-gram-invariance)から $J_m f=0$ です。しかし、その点集合の像の $m$ 次元測度も $0$ だと証明しなければ、右辺との一致はまだ言えません。
- 重なりがなく $f|_E$ が単射なら、右辺は $\mathcal H^m(f(E))$ です。まず単射片で公式を作り、その片を可算個足すのが証明の核心です。

以下の第3〜5節で定理を証明します。「area formula 自体を使って単射部分を示す」という循環論法は使いません。

## 3. 零集合と rank 欠損の像

Lipschitz性は二点間の距離を高々 $L$ 倍にするため、直径を使った被覆コストも高々 $L^m$ 倍です。この一行を零集合の制御に使います。

<a id="lem-gmt11-lipschitz-null-image"></a>

<!-- formal-statement-start -->
> **補題（Lipschitz写像の零集合保存）**
> $1\le m\le d$、$\Omega\subset\mathbb R^m$、$L>0$、$f:\Omega\to\mathbb R^d$ が $L$-Lipschitz なら、任意の集合 $A\subset\Omega$ について

$$
\mathcal H^m(f(A))\le L^m\mathcal H^m(A).
$$

> 特に $\mathcal L^m(A)=0$ なら $\mathcal H^m(f(A))=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

小さい直径の集合で $A$ を覆い、像を同じ枚数の集合で覆います。各直径だけが $L$ 倍に変わるので、$m$ 乗和に $L^m$ が現れます。

<!-- proof-start -->
### 証明

$A\subset\bigcup_i U_i$、$\operatorname{diam}U_i<\delta$ を任意の可算被覆とすると、$f(A)\subset\bigcup_i f(U_i\cap\Omega)$ であり

$$
\operatorname{diam}f(U_i\cap\Omega)
\le L\operatorname{diam}U_i.
$$

直径の $m$ 乗を足し、下限を取ってから $\delta\downarrow0$ とすると

$$
\mathcal H^m(f(A))\le L^m\mathcal H^m(A).
$$

[非正規化Hausdorff測度のEuclid空間上での比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)から定義域では $\mathcal H^m(A)=c_m\mathcal L^m(A)$ なので、後半も従います。一般の集合では Borel 外包と外測度の正則性で同じ同一視ができます。$\square$
<!-- proof-end -->

次はより微妙です。rank 欠損点の集合には **正の $\mathcal L^m$ 測度があり得る**ので、前補題だけでは像の零測度性を言えません。微分が $m$ 次元球をより低次元の板へ近づけることを定量化します。

<a id="lem-gmt11-critical-image"></a>

<!-- formal-statement-start -->
> **補題（rank欠損集合の像のm次元測度は零）**
> $1\le m\le d$、$\Omega\subset\mathbb R^m$ を開集合、$f:\Omega\to\mathbb R^d$ を $L$-Lipschitz とする。集合

$$
C=\{x\in\Omega:Df(x)\text{ が存在し、}\operatorname{rank}Df(x)<m\}
$$

> の像は $\mathcal H^m(f(C))=0$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

各 $x\in C$ の微分 $A=Df(x)$ は rank $k\le m-1$ です。十分小さい球の像は、$k$ 次元の線形像のまわりの薄い帯に入ります。その帯を半径およそ $\varepsilon r$ の球で覆うと、必要な球の個数は高々 $O(\varepsilon^{-k})$、各球の直径の $m$ 乗は $O(\varepsilon^m r^m)$ です。積は $O(\varepsilon^{m-k}r^m)$ となり、$m-k\ge1$ が決め手です。

<!-- proof-start -->
### 証明

まず $C$ を有界な部分 $C\cap B(0,R)$ に制限します。$\varepsilon\in(0,1)$ を固定します。$x\in C$ では $A=Df(x)$ の rank は $k\le m-1$、かつ $\|A\|_{\mathrm{op}}\le L$ です。微分の定義より、$B(x,r)\subset\Omega$ となる十分小さい $r>0$ と $|h|<r$ に対して

$$
|f(x+h)-f(x)-Ah|\le\varepsilon|h|
\le\varepsilon r.
$$

$A(B(0,r))$ は $k$ 次元部分空間の半径 $Lr$ 以下の球内にあります。この部分空間の正規直交座標に幅 $\varepsilon r/\sqrt m$ の格子を置くと、どの点もある格子点から距離 $\varepsilon r$ 以下になり、必要な格子点数は高々

$$
M\le C_{m,d}(1+L/\varepsilon)^k
$$

です（各座標方向に $O_m(1+L/\varepsilon)$ 個、$k$ 方向の積）。微分の残差 $\varepsilon r$ を加えても $f(B(x,r))$ は、半径 $2\varepsilon r$ の $\mathbb R^d$ の球 $M$ 個で覆われます。従って直径の $m$ 乗の総和は

$$
\begin{aligned}
M(4\varepsilon r)^m
&\le C_{m,d,L}\varepsilon^{m-k}r^m\\
&\le C_{m,d,L}\varepsilon r^m.
\end{aligned}
$$

各 $x\in C\cap B(0,R)$ で $r_x<1$ とし、上の微分近似が $|h|<r_x$ で成立し、像を覆う球の直径 $4\varepsilon r_x$ が任意に指定した $\delta>0$ より小さくなるよう半径を選びます。

ここでは [GMT1のEuclid球の有界重複被覆補題](../GMT1/index.md#lem-gmt1-besicovitch-balls)をそのまま使います。中心集合 $C\cap B(0,R)$ は有界、指定半径は $r_x<1$ なので、集合全体を覆い、各点での重複度が次元だけに依存する $N_m$ 以下となる球 $B(x_i,r_i)$ を可算個選べます。球は $B(0,R+1)$ 内にあり、指示関数を積分すると

$$
\begin{aligned}
\mathcal L^m(B(0,1))\sum_i r_i^m
&=\int_{\mathbb R^m}\sum_i\boldsymbol1_{B(x_i,r_i)}(z)\,dz\\
&\le N_m\mathcal L^m(B(0,R+1)).
\end{aligned}
$$

選んだ球の像を先の小球で覆えば、$\delta$-Hausdorff被覆コストは高々

$$
C_{m,d,L}\varepsilon\sum_i r_i^m
\le C_{m,d,L,R}\varepsilon.
$$

まず $\delta\downarrow0$、次に $\varepsilon\downarrow0$ として $\mathcal H^m(f(C\cap B(0,R)))=0$ です。$R=1,2,\ldots$ の可算和で $C$ 全体も零測度です。$m=1$ では $k=0$ であり、同じ計算が働きます。$\square$
<!-- proof-end -->

rank欠損点では左辺の被積分関数が $0$ で、今示したように像側の寄与も $\mathcal H^m$-零集合上に限られます。微分不能点は [Rademacherの微分可能性定理](../GMT9/index.md#thm-gmt9-rademacher)で $\mathcal L^m$-零となり、[零集合保存補題](#lem-gmt11-lipschitz-null-image)で像も零です。従って本質的に **full-rank 微分可能点**だけを調べれば十分です。

## 4. 単射な小片では線形面積倍率に戻せる

rank $m$ の線形写像 $A:\mathbb R^m\to\mathbb R^d$ には、[F0-00F2で導入した特異値](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors)のうち最小のもの

$$
s(A)=\min_{|v|=1}|Av|>0
$$

があります。実際、単位ベクトル $v$ について

$$
|Av|^2=v^{\mathsf T}A^{\mathsf T}Av
$$

なので、最小値の二乗は Gram 行列の最小固有値です。[GMT10のrank判定](../GMT10/index.md#thm-gmt10-gram-invariance)から rank $m$ ならその値は正です。

任意の異なる二点 $u,v$ に対し、上式の単位ベクトルを $(u-v)/|u-v|$ と選べば

$$
|A(u-v)|\ge s(A)|u-v|
$$

が従います。小片 $P$ 上で写像 $f$ が $A$ に対する二点差分の誤差を一様に小さく保てば、二つの像は互いにほぼ等長な対応を持ちます。

<a id="lem-gmt11-patch-comparison"></a>

<!-- formal-statement-start -->
> **補題（線形近似が一様な片の面積比較）**
> $1\le m\le d$、$A:\mathbb R^m\to\mathbb R^d$ を rank $m$ の線形写像、$s=s(A)>0$ とする。$P\subset\mathbb R^m$ 上の写像 $f:P\to\mathbb R^d$ が、ある $0\le\eta<s$ についてすべての $u,v\in P$ で

$$
|f(u)-f(v)-A(u-v)|\le\eta|u-v|
$$

> を満たすなら、$f|_P$ は単射かつ双Lipschitzである。任意の $\mathcal L^m$-可測集合 $F\subset P$ に対し

$$
\begin{aligned}
&c_m J_m(A)(1-\eta/s)^m\mathcal L^m(F)\\
&\qquad\le\mathcal H^m(f(F))\\
&\qquad\le c_m J_m(A)(1+\eta/s)^m\mathcal L^m(F)
\end{aligned}
$$

> が成り立つ（外測度を通じても解釈できる）。
<!-- formal-statement-end -->

### 証明の見取り図

$A(u-v)$ を基準に三角不等式を二方向へ使います。$A(P)$ 上に写像 $T(Au)=f(u)$ を作ると、$T$ とその逆写像の Lipschitz 定数は $1+\eta/s$ と $(1-\eta/s)^{-1}$ で抑えられます。その後は [Hausdorff測度のLipschitz評価](#lem-gmt11-lipschitz-null-image)と [線形面積倍率](../GMT10/index.md#thm-gmt10-linear-area)を順に使います。

<!-- proof-start -->
### 証明

$u,v\in P$ に対し三角不等式と $|A(u-v)|\ge s|u-v|$ から

$$
\begin{aligned}
|f(u)-f(v)|
&\le |A(u-v)|+\eta|u-v|\\
&\le(1+\eta/s)|A(u-v)|,\\
|f(u)-f(v)|
&\ge |A(u-v)|-\eta|u-v|\\
&\ge(1-\eta/s)|A(u-v)|.
\end{aligned}
$$

$A$ は単射で $1-\eta/s>0$ なので $f$ も単射です。$T:A(P)\to f(P)$、$T(Au)=f(u)$ と置けば、上の第一式から $\operatorname{Lip}(T)\le1+\eta/s$、第二式から $\operatorname{Lip}(T^{-1})\le(1-\eta/s)^{-1}$ です。

線形面積倍率は [GMT10では Borel 集合に対して](../GMT10/index.md#thm-gmt10-linear-area)述べられています。ここでの $F$ が Lebesgue 可測なだけでも、有限測度の球への切断と内側正則性を順に使い、$F$ に含まれる可算個のコンパクト集合で零集合を除いて覆えます。

$A$ と $f|_P$ は Lipschitz なので、[Lipschitz写像の零集合保存](#lem-gmt11-lipschitz-null-image)から残りの像はともに Hausdorff 零集合です。従って $A(F)$、$f(F)$ は Hausdorff 測度の完備化で可測です。

$A(F)$ の線形面積倍率等式はコンパクト集合からの極限で拡張できます。$f(F)$ の面積は、これから比較によって評価します。

$A(F)$ に $T$ を使って [零集合保存補題の一般のLipschitz評価](#lem-gmt11-lipschitz-null-image)を適用し、逆向きには $f(F)$ に $T^{-1}$ を適用すると

$$
(1-\eta/s)^m\mathcal H^m(A(F))
\le\mathcal H^m(f(F))
\le(1+\eta/s)^m\mathcal H^m(A(F)).
$$

[GMT10の線形面積倍率](../GMT10/index.md#thm-gmt10-linear-area)を full-rank の $A$ と可測 $F$ に適用すると $\mathcal H^m(A(F))=c_mJ_m(A)\mathcal L^m(F)$ です。これを両側に代入して結論を得ます。$\square$
<!-- proof-end -->

## 5. 可算分割して重複を足す

ここまでで、零測度集合、rank欠損集合、単射な小片を扱う準備が整いました。これらを組み合わせると、Lipschitz 写像の面積公式を厳密に述べられます。

<a id="thm-gmt11-area-formula"></a>

<!-- formal-statement-start -->
> **定理（Lipschitz写像のarea formula）**
> $1\le m\le d$、$\Omega\subset\mathbb R^m$ を開集合、$f:\Omega\to\mathbb R^d$ を $L$-Lipschitz 写像、$E\subset\Omega$ を Borel 集合とする。$J_m f(x)=\sqrt{\det(Df(x)^{\mathsf T}Df(x))}$ を微分可能点で定義し、それ以外で $0$ と置く。このとき $N(f,E,\cdot)$ は $\mathcal H^m$ の完備化について可測であり、

$$
c_m\int_E J_m f(x)\,d\mathcal L^m(x)
=\int_{\mathbb R^d}N(f,E,y)\,d\mathcal H^m(y)
$$

> が拡張非負実数値の等式として成り立つ。ここで $c_m=\mathcal H^m([0,1]^m)$ は直径による **非正規化** Hausdorff 測度の比例定数である。
<!-- formal-statement-end -->

### 証明の見取り図

full-rank 点でも微分 $Df(x)$ は場所によって異なります。それでも一定の rank 下界 $s(Df(x))\ge1/q$ を持つ部分を固定すれば、微分行列を近くの定数行列 $A_j$ で近似でき、微分可能性から得られる各点の誤差評価を使って第4節の二点差分評価を一様に満たす小片へ分けられます。片の上では単射です。可算分割の像は互いに重なってよく、**重なった分を足すことがまさに重複度の積分**です。

<!-- proof-start -->
### area formula の証明

**(1) full-rank 点を固定する。** 微分可能点集合を $D$ とし、正整数 $q$ ごとに

$$
D_q=\{x\in D:s(Df(x))\ge1/q\}
$$

とします。$D_q$ は増大し、full-rank 点全体を覆います。$Df$ は差商の極限なので可測で、これらは Borel 集合として取れます。まず $E\cap D_q\cap B(0,R)$ のような有限 $\mathcal L^m$ 測度の範囲で証明します。

**(2) 一様な単射片を作る。** $\varepsilon>0$ を $4q\varepsilon<1/2$ となるほど小さく固定し、行列の空間の可算稠密集合から、$s(A_j)\ge1/(2q)$ を満たす行列を使います。任意の $x\in D_q$ に対し $\|Df(x)-A_j\|<\varepsilon$ となる $j$ を選べます。$f$ が $x$ で微分可能なので、ある整数 $n\ge1$ を取れば $|y-x|<1/n$ で

$$
|f(y)-f(x)-Df(x)(y-x)|
\le\varepsilon|y-x|.
$$

ゆえに同じ範囲で

$$
|f(y)-f(x)-A_j(y-x)|\le2\varepsilon|y-x|.
$$

各 $j,n$ に対し、これが成立する点 $x$ の集合を一辺が十分小さい可算個の立方体へ切り分けます。同じ片 $P$ の任意の二点 $u,v$ は $|u-v|<1/n$ を満たすため、直前の式を $x=u,y=v$ として使えます。すなわち

$$
|f(v)-f(u)-A_j(v-u)|
\le2\varepsilon|v-u|\quad(u,v\in P).
$$

片の候補は可算個であり、集合差を順に取って互いに素な Borel 分割にできます。微分と全点に対する誤差条件の可測性は、連続な $f$ について半径内の有理点で条件を照合して確認できます。

**(3) 各片の面積を比較する。** $\|Df\|_{\mathrm{op}}\le L$、$\|A_j-Df(x)\|<\varepsilon$ なので、$J_m$ が有界な行列集合上で一様連続であることから

$$
|J_m(A_j)-J_m(Df(x))|
\le\omega_L(\varepsilon),\qquad
\omega_L(\varepsilon)\longrightarrow0.
$$

ここで $\omega_L$ は $m,d,L$ に依存する連続性の誤差上界です。各片では $s(A_j)\ge1/(2q)$、従って $2\varepsilon/s(A_j)\le4q\varepsilon$ です。[線形近似が一様な片の面積比較](#lem-gmt11-patch-comparison)より、任意の可測 $F\subset P$ で

$$
\begin{aligned}
&c_m(1-4q\varepsilon)^m J_m(A_j)\mathcal L^m(F)\\
&\quad\le\mathcal H^m(f(F))\\
&\quad\le c_m(1+4q\varepsilon)^m J_m(A_j)\mathcal L^m(F).
\end{aligned}
$$

上の点ごとの誤差を $F$ で積分すると、$\mathcal L^m(F)=0$ の場合も含めて

$$
\left|J_m(A_j)\mathcal L^m(F)-\int_FJ_mf\,d\mathcal L^m\right|
\le\omega_L(\varepsilon)\mathcal L^m(F)
$$

です。さらに $J_m(A_j)\le(L+\varepsilon)^m$ です。$a=4q\varepsilon<1/2$ と置けば、中間の面積比較係数には

$$
\max\{(1+a)^m-1,\,1-(1-a)^m\}
\le m2^{m-1}a
$$

という評価を使えます（$t\mapsto t^m$ の平均値の定理）。したがって $\mathcal H^m(f(F))$ と $c_m\int_FJ_mf$ の差は、ある定数 $K_{q,L,m,d}$ に対し

$$
\left|\mathcal H^m(f(F))-c_m\int_FJ_mf\,dx\right|
\le K_{q,L,m,d}
[\varepsilon+\omega_L(\varepsilon)]\mathcal L^m(F).
$$

**(4) 片の重複を数えて足す。** 前段の Borel 片 $P$ は有限測度部分に限定しています。Lebesgue測度の内側正則性により、$P$ に含まれるコンパクト集合 $K_1$ を選んで残余の測度を $1/2$ 未満にできます。次に $P\setminus K_1$ に含まれるコンパクト集合 $K_2$ を選んで残余を $1/4$ 未満にし、同様に残余を $2^{-i}$ 未満へ減らします。

こうして各片に互いに素なコンパクト集合を可算個取り、すべての片についてまとめて $K_i$ と番号付けすれば、残りは Lebesgue 零集合です。[Lipschitz写像の零集合保存](#lem-gmt11-lipschitz-null-image)によりその像も Hausdorff 零集合です。各 $K_i$ 上で $f$ は単射、$f(K_i)$ はコンパクトなので、その指示関数は Borel 可測です。残りの像を除けば

$$
N(f,E\cap D_q\cap B(0,R),y)
=\sum_i\boldsymbol1_{f(K_i)}(y).
$$

従って[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)により

$$
\int N(f,E\cap D_q\cap B(0,R),y)\,d\mathcal H^m(y)
=\sum_i\mathcal H^m(f(K_i)).
$$

前段の面積誤差を各 $K_i$ で足すと、互いに素であるため誤差総量は高々

$$
K_{q,L,m,d}[\varepsilon+\omega_L(\varepsilon)]
\mathcal L^m(E\cap D_q\cap B(0,R)).
$$

右端は有限です。$\varepsilon\downarrow0$ として、$E\cap D_q\cap B(0,R)$ に対する公式が得られます。コンパクト分割は $\varepsilon$ ごとに変わってよいものの、誤差上界は分割に依存しません。

**(5) 範囲を広げ、例外を戻す。** $q\to\infty$、$R\to\infty$ とし、被積分関数の単調収束で full-rank 点全体へ広げます。残る rank 欠損点の像は [rank欠損集合の補題](#lem-gmt11-critical-image)で $\mathcal H^m$-零、微分不能点の像は [零集合保存](#lem-gmt11-lipschitz-null-image)で零です。一方それらの点では $J_m f=0$ と置くか、[rank条件](../GMT10/index.md#thm-gmt10-gram-invariance)で $0$ です。したがって $E$ 全体について

$$
c_m\int_EJ_mf\,d\mathcal L^m
=\int_{\mathbb R^d}N(f,E,y)\,d\mathcal H^m(y)
$$

です。重複度の可測性も、零測度の像を除いてコンパクト像の指示関数の可算和として表したことから従います。$\square$
<!-- proof-end -->

ここで **可算分割であること**が大切です。有限個の滑らかな枝だけを持つ写像に公式を限定していません。$\mathcal H^m$-零の像上では $N=\infty$ となっても積分値は変わらず、一般の $E$ に対しても正しく解釈できます。

## 6. 計算例：折り目・グラフ・潰れた面

以下で閉区間・長方形上の写像を扱うときは、表示された式をその集合を含む開近傍まで定義し、面積公式をその中の Borel 集合に適用します。例えば $t^2$ は $[-1,1]$ 上だけでなく $\Omega=(-2,2)$ 上で Lipschitz です。

### 二次写像：Jacobian が一定でなくても二回数える

$f(t)=t^2$ を $E=[-1,1]$ に制限します。$f$ はこの区間で $2$-Lipschitz、$f'(t)=2t$ なので

$$
c_1\int_EJ_1f\,dt
=\int_{-1}^1|2t|\,dt
=2\int_0^1 2t\,dt=2.
$$

$y\in(0,1]$ では逆像が $\pm\sqrt y$、$y=0$ では一個なので、$\int N\,d\mathcal H^1=\int_0^1 2\,dy=2$ です。重要なのは「重複度が2」と「微分の倍率が $2|t|$」が **別々の情報**であり、式の左右でそれぞれ正確に数えられていることです。

### グラフ：重複がなければ曲面の面積になる

$F(x,y)=(x,y,ax+by)$ を長方形 $E=[0,p]\times[0,q]$（$p,q>0$）へ適用します。微分 $DF(x,y)$ の第1列は $y$ を固定した $x$ の変化、第2列は $x$ を固定した $y$ の変化です。標準基底の像として

$$
DF e_1=\frac{\partial F}{\partial x}=(1,0,a)^{\mathsf T},\qquad
DF e_2=\frac{\partial F}{\partial y}=(0,1,b)^{\mathsf T}
$$

となります。この列から [m次元幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian) に従い Gram 行列を作ると

$$
DF=\begin{pmatrix}1&0\\0&1\\a&b\end{pmatrix},
\quad
(DF)^{\mathsf T}DF=
\begin{pmatrix}1+a^2&ab\\ab&1+b^2\end{pmatrix},
$$

$$
J_2F=\sqrt{(1+a^2)(1+b^2)-a^2b^2}
=\sqrt{1+a^2+b^2}.
$$

最初の二成分から $(x,y)$ が復元できるため $F$ は単射であり、像上の重複度は1です。[面積公式](#thm-gmt11-area-formula)に $m=2$ を入れると

$$
\mathcal H^2(F(E))
=c_2pq\sqrt{1+a^2+b^2}.
$$

非正規化係数 $c_2$ が残ることと、rank が2で面積倍率が正になることの両方を確認しました。

### rank欠損：逆像が無限個あっても面積は0

$G(x,y)=(x+y,0,0)$ を $E=[0,1]^2$ 上で考えます。二本の微分列がどちらも $(1,0,0)^{\mathsf T}$ なので Gram 行列式は0、$J_2G=0$ です。像は直線分で $\mathcal H^2(G(E))=0$ です。像の内部点 $(t,0,0)$（$0<t<2$）には通常無限個の逆像があるため $N(G,E,(t,0,0))=\infty$ ですが、これは $\mathcal H^2$-零集合上の値です。よって両辺は0になります。**無限重複度だから面積が無限になる**とは限りません。

## 7. 重みを付けて「どの点から来たか」を残す

右辺で単に個数を数える代わりに、逆像 $x$ に付いた非負の値 $g(x)$ を足せば、密度や積分量を像へ移せます。まず指示関数については $E$ を小さくした [面積公式](#thm-gmt11-area-formula)そのものです。そこから非負単純関数、非負 Borel 関数へ単調収束で広げます。

<a id="cor-gmt11-weighted-area"></a>

<!-- formal-statement-start -->
> **系（重み付きarea formula）**
> $1\le m\le d$、$\Omega\subset\mathbb R^m$ は開集合、$f:\Omega\to\mathbb R^d$ は Lipschitz、$E\subset\Omega$ は Borel、$g:E\to[0,\infty]$ は Borel 可測とする。このとき

$$
c_m\int_Eg(x)J_mf(x)\,d\mathcal L^m(x)
=\int_{\mathbb R^d}
\left(\sum_{\substack{x\in E\\f(x)=y}}g(x)\right)
d\mathcal H^m(y).
$$

> 空の和は $0$、無限個の非負項の和は有限部分和の上限とする。右辺は $\mathcal H^m$ の完備化について可測である。
<!-- formal-statement-end -->

### 証明の見取り図

$g=\boldsymbol1_A$ なら左辺は $E\cap A$ での積分、右辺はその集合での重複度です。非負単純関数はその有限和であり、一般の非負関数は単純関数の増大極限です。

<!-- proof-start -->
### 証明

$g=\boldsymbol1_A$、$A\subset E$ が Borel なら [面積公式](#thm-gmt11-area-formula)を $A$ に適用して式を得ます。$g=\sum_{i=1}^n a_i\boldsymbol1_{A_i}$、$a_i\ge0$ のとき、両辺の有限和の線形性から同じ式が成立します。

一般の $g\ge0$ に対して Borel 単純関数 $g_n\uparrow g$ を選ぶと、左辺は非負関数 $g_nJ_mf$ の単調収束です。右辺でも各 $y$ に対して

$$
\sum_{f(x)=y}g_n(x)\uparrow
\sum_{f(x)=y}g(x)
$$

が成り立ちます。実際、どの有限個の逆像に関しても和の極限を取れ、全有限部分集合について上限を取ると双方が一致します。従って像側でも[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)を適用できます。$\square$
<!-- proof-end -->

この系は、次の整流可能集合での積分を準備するものです。重みを付けると「曲面がどこにあるか」に加えて「その曲面のどのパラメータ点から来たか」も積分に反映されます。

## 8. 演習（全問詳細解答付き）

### Level A：重複度とJacobianの手計算

<a id="ex-gmt11-a1"></a>

**A1. 非対称区間の折り返し**
- Level: A
- 問題: $f:[-2,3]\to\mathbb R$、$f(t)=|t|$ とする。$N(f,[-2,3],y)$ を区間ごとに求め、area formula の両辺を計算せよ。

<!-- solution-start -->
**詳細解答**

$y<0$ または $y>3$ では逆像は空です。$0<y\le2$ なら $t=\pm y$ の二点、$2<y\le3$ なら $t=y$ の一点です。$y=0$ は一点ですが積分に影響しません。従って

$$
\int N\,d\mathcal H^1
=2\mathcal L^1((0,2))+\mathcal L^1((2,3))
=2\cdot2+1=5.
$$

$t\ne0$ では $f'(t)=\pm1$、よって $J_1f=1$ a.e. です。$c_1=1$ なので $c_1\int_{-2}^3J_1f\,dt=5$ と一致します。端点の重複度を取り違えても積分値が同じことと、逆像の個数の定義が正しいことは別なので両方確認します。
<!-- solution-end -->

<a id="ex-gmt11-a2"></a>

**A2. 空間内の線分の長さ**
- Level: A
- 問題: $F:[0,3]\to\mathbb R^3$ を $F(t)=(t,2t,0)$ とする。$J_1F$、$N(F,[0,3],y)$、$\mathcal H^1(F([0,3]))$ を求めよ。

<!-- solution-start -->
**詳細解答**

$DF(t)=(1,2,0)^{\mathsf T}$ の Gram 行列は $(1^2+2^2)=(5)$ で、[m次元幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)から $J_1F=\sqrt5$ です。第1成分が $t$ なので $F$ は単射です。像上で $N=1$、像外では0です。[面積公式](#thm-gmt11-area-formula)から

$$
\mathcal H^1(F([0,3]))
=c_1\int_0^3\sqrt5\,dt=3\sqrt5.
$$

実際、端点間の距離は $|(3,6,0)|=\sqrt{9+36}=3\sqrt5$ です。
<!-- solution-end -->

<a id="ex-gmt11-a3"></a>

**A3. 潰れた正方形**
- Level: A
- 問題: $G:[0,1]^2\to\mathbb R^3$ を $G(x,y)=(x+y,0,0)$ とする。$J_2G$ と $\mathcal H^2(G([0,1]^2))$ を求め、$N=\infty$ となる像点が存在するか調べよ。

<!-- solution-start -->
**詳細解答**

微分行列の列はいずれも $(1,0,0)^{\mathsf T}$ なので

$$
(DG)^{\mathsf T}DG=
\begin{pmatrix}1&1\\1&1\end{pmatrix},
\quad
\det((DG)^{\mathsf T}DG)=1-1=0.
$$

従って $J_2G=0$ です。像は $\{(t,0,0):0\le t\le2\}$ で、直線を幅 $\delta$ の小区間 $O(1/\delta)$ 個で覆うと直径の2乗の和は $O(\delta)\to0$ なので $\mathcal H^2=0$ です。例えば像点 $(1,0,0)$ の逆像は $\{(x,1-x):0\le x\le1\}$ で無限個です。それでも $\mathcal H^2$-零集合上の無限値は積分を増やしません。
<!-- solution-end -->

<a id="ex-gmt11-a4"></a>

**A4. 長方形への線形拡大**
- Level: A
- 問題: $A:[0,1]^2\to\mathbb R^2$、$A(x,y)=(2x,3y)$ について両辺の面積を $c_2$ を残して計算せよ。

<!-- solution-start -->
**詳細解答**

$DA=\operatorname{diag}(2,3)$ なので $(DA)^{\mathsf T}DA=\operatorname{diag}(4,9)$、$J_2A=\sqrt{36}=6$ です。$A$ は単射で、像は $[0,2]\times[0,3]$ です。定義域の Lebesgue 面積は1だから

$$
c_2\int_{[0,1]^2}J_2A\,d\mathcal L^2
=6c_2.
$$

像で $N=1$ であるため右辺は $\mathcal H^2([0,2]\times[0,3])=c_2\cdot(2\cdot3)=6c_2$ です。[非正規化の比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を使い、$c_2$ を省きません。
<!-- solution-end -->

<a id="ex-gmt11-a5"></a>

**A5. 二次写像の可変倍率**
- Level: A
- 問題: $f:[-1,1]\to\mathbb R$、$f(t)=t^2$ について $N(f,[-1,1],y)$ を求め、$J_1f=2|t|$ の積分と照合せよ。

<!-- solution-start -->
**詳細解答**

$0<y\le1$ で $t=\pm\sqrt y$ の二点、$y=0$ で $t=0$ の一点、像外で0です。一方 $Df(t)=2t$ なので、[一次元の幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)は $|2t|$ です。

$$
\begin{aligned}
c_1\int_{-1}^1 J_1f(t)\,dt
&=2\int_0^1 2t\,dt
=2[t^2]_0^1=2,\\
\int N\,d\mathcal H^1
&=\int_0^1 2\,dy=2.
\end{aligned}
$$

$t=0$ の微分が0になることと、$y=0$ の重複度が1になることは別の現象です。
<!-- solution-end -->

### Level B：証明の道具を別設定で使う

<a id="ex-gmt11-b1"></a>

**B1. Lipschitz像の零測度**
- Level: B
- 問題: $A\subset\mathbb R^2$ は $\mathcal L^2(A)=0$、$f:\mathbb R^2\to\mathbb R^3$ は $L$-Lipschitz とする。$\mathcal H^2(f(A))=0$ を被覆の直径から証明せよ。$A$ の Borel 性を仮定する必要があるか。

<!-- solution-start -->
**詳細解答**

[非正規化Hausdorff測度の比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)により $\mathcal H^2(A)=c_2\mathcal L^2(A)=0$ です。任意の $\eta>0$、$\delta>0$ に対し $A\subset\bigcup_iU_i$、$\operatorname{diam}U_i<\delta$、$\sum_i(\operatorname{diam}U_i)^2<\eta$ と取れます。像の各直径は $\operatorname{diam}f(U_i)\le L\operatorname{diam}U_i$ なので、

$$
\mathcal H^2_{L\delta}(f(A))
\le\sum_i(\operatorname{diam}f(U_i))^2
\le L^2\eta.
$$

$\delta\downarrow0$、$\eta\downarrow0$ とすれば $\mathcal H^2(f(A))=0$ です。Hausdorff外測度の被覆で議論しているので、$A$ が Borel である必要はありません。
<!-- solution-end -->

<a id="ex-gmt11-b2"></a>

**B2. 重み付き折り返し**
- Level: B
- 問題: $f:[-1,1]\to\mathbb R$ は $f(t)=|t|$、$g(t)=1+t^2$ とする。[重み付きarea formula](#cor-gmt11-weighted-area)の左右を別々に計算せよ。

<!-- solution-start -->
**詳細解答**

$J_1f=1$ a.e.、$c_1=1$ です。従って定義域側は

$$
\int_{-1}^1(1+t^2)\,dt
=\left[t+\frac{t^3}{3}\right]_{-1}^1
=\frac83.
$$

$0<y\le1$ の逆像は $t=y,-y$ で、それぞれの重みは $1+y^2$ です。像側の重みの和は $2(1+y^2)$ となるので

$$
\int_0^1 2(1+y^2)\,dy
=2\left[y+\frac{y^3}{3}\right]_0^1
=\frac83.
$$

$y=0$ の逆像は一個ですが、$\mathcal H^1(\{0\})=0$ なので積分値には寄与しません。
<!-- solution-end -->

<a id="ex-gmt11-b3"></a>

**B3. 二点差分から単射と面積評価を作る**
- Level: B
- 問題: $A:\mathbb R^2\to\mathbb R^3$ は $A(x,y)=(2x,3y,0)$、$P\subset\mathbb R^2$ 上の $f$ は $|f(u)-f(v)-A(u-v)|\le\frac12|u-v|$ を全 $u,v\in P$ で満たすとする。$f$ の単射性を示し、可測 $F\subset P$ に対する $\mathcal H^2(f(F))$ の上下界を $c_2\mathcal L^2(F)$ の倍数で書け。

<!-- solution-start -->
**詳細解答**

$|A(h_1,h_2)|^2=4h_1^2+9h_2^2\ge4(h_1^2+h_2^2)$ なので $s(A)=2$ です。従って $|f(u)-f(v)|\ge(2-\frac12)|u-v|=\frac32|u-v|$、異なる点の像は異なるため単射です。

$\eta/s=(1/2)/2=1/4$、$J_2(A)=\sqrt{4\cdot9}=6$ です。[線形近似片の補題](#lem-gmt11-patch-comparison)に具体値を入れると

$$
6c_2\left(\frac34\right)^2\mathcal L^2(F)
\le\mathcal H^2(f(F))
\le6c_2\left(\frac54\right)^2\mathcal L^2(F).
$$

従って下界は $(27/8)c_2\mathcal L^2(F)$、上界は $(75/8)c_2\mathcal L^2(F)$ です。二点差分の仮定がなく一点での微分だけ分かっている場合、同じ上下界を集合全体へ無条件に使うことはできません。
<!-- solution-end -->

<a id="ex-gmt11-b4"></a>

**B4. rank欠損像の被覆指数**
- Level: B
- 問題: $\mathbb R^2\to\mathbb R^3$ の Lipschitz 写像 $f$ が点 $x$ で微分可能で、$\operatorname{rank}Df(x)=1$、$\|Df(x)\|_{\mathrm{op}}\le L$ とする。十分小さい半径 $r$ の $f(B(x,r))$ が $O_L(\varepsilon^{-1})$ 個の半径 $2\varepsilon r$ の球で覆える理由を示し、直径の2乗の総和を評価せよ。

<!-- solution-start -->
**詳細解答**

$A=Df(x)$ とします。微分の定義から、$\varepsilon>0$ を固定して十分小さい $r$ なら $|h|<r$ で $|f(x+h)-f(x)-Ah|\le\varepsilon r$ です。rank1 の $A(B(0,r))$ は長さ高々 $2Lr$ の線分に含まれます。線分上に間隔 $\varepsilon r$ の点を置くと点の数は高々 $2L/\varepsilon+2=O_L(\varepsilon^{-1})$ です。

各点を中心に半径 $2\varepsilon r$ の球を置けば、線形像からのずれ $\varepsilon r$ と線分上での間隔を吸収し、$f(B(x,r))$ を覆えます。各球の直径は $4\varepsilon r$ なので総コストは

$$
O_L(\varepsilon^{-1})(4\varepsilon r)^2
=O_L(\varepsilon r^2).
$$

rank が2なら球数が $O(\varepsilon^{-2})$ となり、この積で $\varepsilon$ が残りません。rank欠損の $m-k>0$ が [rank欠損像の補題](#lem-gmt11-critical-image)で本質的である理由です。
<!-- solution-end -->

### Level C：重複・グラフ面積・重みを一つにつなぐ

<a id="ex-gmt11-c1"></a>

**C1. 折り返した斜面の重複度と重み**
- Level: C
- 問題: 定数 $a,b\in\mathbb R$ と $E=[-1,2]\times[0,1]$ に対し、$F:E\to\mathbb R^3$ を $F(x,y)=(|x|,y,a|x|+by)$ とする。次の3項目を調べよ。
  1. $x\ne0$ での $J_2F$ を求めよ。
  2. 像点 $(u,v,au+bv)$ の重複度を $u$ の範囲で表し、非正規化 $\mathcal H^2$ を用いて area formula を検算せよ。
  3. 重み $g(x,y)=1+x\ge0$ について重み付き formula の両辺を計算せよ。

<!-- solution-start -->
**詳細解答**

**(1)** $DF$ の第1列は $y$ を固定した $x$ に関する偏微分、第2列は $x$ を固定した $y$ に関する偏微分です。折り目以外では

$$
\frac{d}{dx}|x|=\begin{cases}1&(x>0),\\-1&(x<0)\end{cases}
$$

なので、$x>0$ では列ベクトルが $(1,0,a)^{\mathsf T}$ と $(0,1,b)^{\mathsf T}$、$x<0$ では $(-1,0,-a)^{\mathsf T}$ と $(0,1,b)^{\mathsf T}$ です。両側で Gram 行列の行列式は

$$
\begin{aligned}
\det((DF)^{\mathsf T}DF)
&=(1+a^2)(1+b^2)-(ab)^2\\
&=1+a^2+b^2.
\end{aligned}
$$

よって $J_2F=\lambda:=\sqrt{1+a^2+b^2}$ が $x\ne0$ で成り立ちます。折り目 $x=0$ は $\mathcal L^2$-零なので積分に影響しません。

**(2)** $u=|x|$、$v=y$ です。$0<u<1$ では $x=u,-u$ の二点、$1<u<2$ では $x=u$ の一点です。$u=0,1,2$ と $v=0,1$ の境界は像の $\mathcal H^2$-零集合であり、積分値に影響しません。単射グラフ $(u,v)\mapsto(u,v,au+bv)$ の [面積計算](#thm-gmt11-area-formula)では、基底長方形の Lebesgue 面積1当たり $c_2\lambda$ の Hausdorff 面積です。従って

$$
\begin{aligned}
\int N(F,E,z)\,d\mathcal H^2(z)
&=c_2\lambda\left(2\int_0^1du+\int_1^2du\right)\\
&=3c_2\lambda.
\end{aligned}
$$

一方、$c_2\int_EJ_2F\,d\mathcal L^2=c_2\lambda\cdot3\cdot1=3c_2\lambda$ で一致します。

**(3)** 重みは $x\in[-1,2]$ で $g=1+x\ge0$ です。定義域側は

$$
\begin{aligned}
c_2\int_EgJ_2F\,d\mathcal L^2
&=c_2\lambda\int_{-1}^2(1+x)\,dx\\
&=c_2\lambda\left[x+\frac{x^2}{2}\right]_{-1}^2\\
&=\frac92c_2\lambda.
\end{aligned}
$$

像側で $0<u<1$ の二つの逆像から来る重みの和は $(1+u)+(1-u)=2$、$1<u<2$ では $1+u$ です。ゆえに

$$
\begin{aligned}
\int\sum_{F(x,y)=z}g(x,y)\,d\mathcal H^2(z)
&=c_2\lambda\left(\int_0^1 2\,du+\int_1^2(1+u)\,du\right)\\
&=c_2\lambda\left(2+\left[u+\frac{u^2}{2}\right]_1^2\right)\\
&=c_2\lambda\left(2+\frac52\right)
=\frac92c_2\lambda.
\end{aligned}
$$

重複した二つの枝の重みは**足し合わせる**のであって、単に大きい方を採るわけでも、向きによって差し引くわけでもありません。
<!-- solution-end -->

## 9. 次の講義への橋渡し

面積公式は「$\mathbb R^m$ 上のパラメータから作る Lipschitz 像」の面積を完全に数えます。次の GMT12 では、集合自体が可算個の Lipschitz 像でほとんど覆えるときに **可算 $m$-整流可能集合**と呼ぶことを学びます。そして GMT13 で、そのような集合上へ面積公式を移し、パラメータの選び方に依存しない積分へ進みます。
