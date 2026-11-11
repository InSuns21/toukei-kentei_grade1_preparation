# INV5 TSVDとTikhonovは何を抑えるか

<!-- definition-example-audit: strict -->

INV3の[Picardの可解性判定](../INV3/index.md#thm-inv3-picard-solvability)によれば、正確なデータを逆算するとき、正の特異値 $\sigma_j$ で観測係数を割ります。INV4の[正則化誤差の二項分解](../INV4/index.md#thm-inv4-error-splitting)は、その割り算を有限のノイズ下でどう制御するかを問い直しました。

小さい特異値を全部使うとノイズを増幅します。しかし小さい特異値を全部捨てると、真の未知量の成分も失います。この両方の危険を、**特異値ごとに逆算をどれだけ許すか**という共通の言葉で比較します。

本章では実 Hilbert 空間 $X,Y$ とコンパクト線形作用素 $A:X\to Y$ を固定します。[Hilbert随伴](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)を $A^*:Y\to X$ と書きます。内積の関係は次の通りです。

$$
\langle Ax,z\rangle_Y=\langle x,A^*z\rangle_X.
$$

観測値を $y^\delta\in Y$、正確なデータを $y\in\mathcal D(A^\dagger)$ とし、ノイズの条件を $\|y^\delta-y\|_Y\le\delta$ とします。$A^\dagger$ は随伴ではなく[最小ノルム一般化逆](../INV4/index.md#def-inv4-pseudoinverse-domain)です。

INV3の[完全特異系](../INV3/index.md#def-inv3-singular-system)を $(\sigma_j,u_j,v_j)_{j\in J}$ と書きます。$J$ は有限または可算無限で、$\sigma_j>0$、$Av_j=\sigma_ju_j$、$A^*u_j=\sigma_jv_j$ です。正の特異値に対応する $v_j$ は $(\ker A)^\perp$、$u_j$ は $\overline{\mathcal R(A)}$ を尽くします。$A=0$ のときは $J=\varnothing$ です。

## 1. 小さい特異値を切り捨てる：TSVD

まず $A:\mathbb R^3\to\mathbb R^3$ が $A=\operatorname{diag}(1,1/2,1/4)$ の場合を考えます。未知量 $x=(2,2,2)$ から得るデータは $y=(2,1,1/2)$ です。通常の逆算は各座標で $1,2,4$ 倍します。最後のデータ座標に誤差があると、その誤差は4倍になります。

そこで、閾値 $\tau>0$ 以上の特異値に対応する座標だけ復元します。この操作を打切り特異値分解（truncated singular value decomposition, TSVD）と呼びます。無限次元でも同じ操作を定義できます。

<a id="def-inv5-tsvd"></a>

<!-- formal-statement-start -->
> **定義（TSVD正則化作用素）**
> 実 Hilbert 空間間のコンパクト線形作用素 $A:X\to Y$ の完全特異系 $(\sigma_j,u_j,v_j)_{j\in J}$ に対し、各 $\tau>0$ で有界線形写像 $R_\tau^{\mathrm T}:Y\to X$ を

$$
R_\tau^{\mathrm T}z
=\sum_{\substack{j\in J\\\sigma_j\ge\tau}}
\frac{\langle z,u_j\rangle_Y}{\sigma_j}v_j
$$

> と定める。$\sigma_j\ge\tau$ の添字がないときは零作用素とする。
<!-- formal-statement-end -->

コンパクト作用素の非零特異値は、無限個なら $0$ に収束します。したがって固定した $\tau>0$ に対し和は必ず有限です。[完全特異系の直交性](../INV3/index.md#def-inv3-singular-system)から、各係数を直接評価すると

$$
\|R_\tau^{\mathrm T}z\|_X^2
=\sum_{\sigma_j\ge\tau}\frac{|\langle z,u_j\rangle_Y|^2}{\sigma_j^2}
\le\frac1{\tau^2}\sum_j|\langle z,u_j\rangle_Y|^2
\le\frac{\|z\|_Y^2}{\tau^2}.
$$

最後の不等式は[Bessel不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-bessel-inequality)を有限個の $u_j$ に適用したものです。ゆえに $\|R_\tau^{\mathrm T}\|\le1/\tau$ です。残す方向を減らすことで、データ誤差の増幅を有限にしています。

<!-- definition-example-start: def-inv5-tsvd -->
### 例：三つの方向のうち一つを捨てる

**定義の確認**：$A=\operatorname{diag}(1,1/2,1/4)$ の標準基底を $e_1,e_2,e_3$ とします。標準内積では、$x=\sum_{j=1}^3x_je_j$ と $w=\sum_{j=1}^3w_je_j$ に対して

$$
\langle Ax,w\rangle=\sum_{j=1}^3\sigma_jx_jw_j
=\langle x,Aw\rangle,
\qquad (\sigma_1,\sigma_2,\sigma_3)=(1,1/2,1/4).
$$

よって $A^*=A$ です。$u_j=v_j=e_j$ と選ぶと、$\sigma_j>0$、両組の正規直交性、$Av_j=\sigma_ju_j$ と $A^*u_j=\sigma_jv_j$ を直接確認できます。さらに $Ax=0$ なら $\sigma_jx_j=0$ が全 $j$ で成り立つため $x=0$ です。任意の $w=\sum_jw_je_j$ に対し $A(\sum_j(w_j/\sigma_j)e_j)=w$ なので値域は全空間です。したがって両側の標準基底は、[完全特異系の定義](../INV3/index.md#def-inv3-singular-system)が求める核の直交補と値域の閉包を尽くします。

$\tau=2/5$ を選ぶと、$1,1/2\ge2/5$ で $1/4<2/5$ です。定義の和は最初の二方向だけとなり、

$$
R_{2/5}^{\mathrm T}(2,1,1/2)
=\frac2{1}e_1+\frac1{1/2}e_2=(2,2,0).
$$

真の第三成分 $2$ は失われましたが、第三座標の観測誤差も一切逆算されません。作用素ノルムは、この例では残した倍率の最大値 $2$ です。一般上界 $1/\tau=5/2$ より小さくなります。
<!-- definition-example-end -->

## 2. データへの適合と解の大きさを同時に評価する

TSVD は採用・不採用を閾値で切り分けました。もう一つの方法は、観測への不一致 $\|Ax-y^\delta\|_Y^2$ を小さくしつつ、復元値 $\|x\|_X^2$ が大きくなることに罰則を与えるものです。$\alpha>0$ は、解の大きさをどれだけ重く見るかを表します。

<a id="def-inv5-tikhonov"></a>

<!-- formal-statement-start -->
> **定義（二乗ノルムTikhonov正則化）**
> 実 Hilbert 空間 $X,Y$、有界線形作用素 $A:X\to Y$、データ $z\in Y$、$\alpha>0$ に対し、目的関数

$$
J_{\alpha,z}(x)=\|Ax-z\|_Y^2+\alpha\|x\|_X^2
\qquad(x\in X)
$$

> の最小点を **Tikhonov解**と呼ぶ。第一項をデータ適合項、第二項を二乗ノルム罰則と呼ぶ。
<!-- formal-statement-end -->

この定義の時点では最小点の存在・一意性を仮定していません。以下で、それが必ず得られることを証明します。

<!-- definition-example-start: def-inv5-tikhonov -->
### 例：観測できない方向は零に選ばれる

**定義の確認**：データ適合項と罰則を別々に書き、最小点の存在・一意性と観測不能成分の扱いを直接確認します。

$A:\mathbb R^2\to\mathbb R^2$ を $A(x_1,x_2)=(2x_1,0)$、$z=(a,b)$ とします。標準内積について

$$
\langle A(x_1,x_2),(u,v)\rangle=2x_1u
=\langle(x_1,x_2),(2u,0)\rangle
$$

なので $A^*(u,v)=(2u,0)$ です。従って $\ker A=\ker A^*=\operatorname{span}\{(0,1)\}$ で、$(0,b)$ は観測値の $\ker A^*$ 成分、$(0,x_2)$ は未知量の $\ker A$ 成分です。$A$ は有界線形、$\alpha>0$ であり、[二乗ノルムTikhonov正則化](#def-inv5-tikhonov)の目的関数は

$$
\begin{aligned}
J_{\alpha,z}(x_1,x_2)
&=(2x_1-a)^2+b^2+\alpha(x_1^2+x_2^2)\\
&=(4+\alpha)\left(x_1-\frac{2a}{4+\alpha}\right)^2
+\alpha x_2^2+b^2+\frac{\alpha a^2}{4+\alpha}.
\end{aligned}
$$

$4+\alpha>0$、$\alpha>0$ なので平方項は $x_1=2a/(4+\alpha),x_2=0$ のとき、かつそのときだけ最小です。$b$ はどの未知量からも観測できず、復元値には現れません。さらに $x_2$ 方向も観測に寄与しないため、罰則は $x_2=0$ を選びます。これは定義の二つの項を具体的に確認した例です。
<!-- definition-example-end -->

## 3. 最小点は存在し、正規方程式を満たす

有限次元では微分して連立一次方程式を解けます。しかしここでの $X$ は無限次元かもしれません。まず正規方程式が必ず一意に解けることを示し、その解が本当に目的関数を最小化することを確かめます。

<a id="thm-inv5-tikhonov-minimizer"></a>

<!-- formal-statement-start -->
> **定理（Tikhonov最小点の存在・一意性と正規方程式）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ を有界線形作用素、$z\in Y$、$\alpha>0$ とする。このとき $J_{\alpha,z}$ は $X$ 上に唯一の最小点 $x_\alpha(z)$ を持つ。その点は一意に解ける正規方程式

$$
(A^*A+\alpha I)x_\alpha(z)=A^*z
$$

> を満たし、逆にこの式の解は唯一の最小点である。特に

$$
R_\alpha^{\mathrm K}:=(A^*A+\alpha I)^{-1}A^*:Y\to X
$$

> は有界線形作用素で、$x_\alpha(z)=R_\alpha^{\mathrm K}z$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$B_\alpha=A^*A+\alpha I$ と置くと、$\langle B_\alpha h,h\rangle=\|Ah\|^2+\alpha\|h\|^2$ です。$\alpha>0$ という正の項が、零空間を含む全方向を制御します。これにより $B_\alpha$ の値域が閉かつ稠密、従って全 $X$ であると示せます。解を得たら目的関数を平方完成して最小性を証明します。

<!-- proof-start -->
### 証明

$B_\alpha=A^*A+\alpha I$ は有界で自己共役です。実際、[随伴の定義](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)により、任意の $h,k\in X$ で

$$
\langle B_\alpha h,k\rangle_X
=\langle Ah,Ak\rangle_Y+\alpha\langle h,k\rangle_X
=\langle h,B_\alpha k\rangle_X.
$$

特に[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を $B_\alpha h$ と $h$ に適用すると

$$
\alpha\|h\|_X^2
\le\langle B_\alpha h,h\rangle_X
\le\|B_\alpha h\|_X\|h\|_X
$$

です。$h\ne0$ なら $\|B_\alpha h\|_X\ge\alpha\|h\|_X$ なので、$\ker B_\alpha=\{0\}$ です。

次に $B_\alpha h_n\to w$ とする値域内の収束列を取ると、

$$
\|h_n-h_m\|_X
\le\alpha^{-1}\|B_\alpha h_n-B_\alpha h_m\|_X
$$

から $(h_n)$ は Cauchy 列です。$X$ は完備なので $h_n\to h$ となり、$B_\alpha$ の有界性より $w=B_\alpha h$。従って $\mathcal R(B_\alpha)$ は閉です。一方、$w\perp\mathcal R(B_\alpha)$ であることは、全ての $h\in X$ に対し $\langle B_\alpha h,w\rangle=\langle h,B_\alpha^*w\rangle=0$ であること、すなわち $B_\alpha^*w=0$ と同値です。すでに確かめた $B_\alpha^*=B_\alpha$ から

$$
\mathcal R(B_\alpha)^\perp=\ker B_\alpha^*=\ker B_\alpha=\{0\}.
$$

値域は稠密でもあるので、閉性と合わせて $\mathcal R(B_\alpha)=X$ です。従って $B_\alpha$ は全単射で、その逆は $\|B_\alpha^{-1}w\|\le\|w\|/\alpha$ を満たします。$A^*$ も有界なので、$x_\alpha=B_\alpha^{-1}A^*z$ と $R_\alpha^{\mathrm K}$ は意味を持ちます。

任意の $x=x_\alpha+h$ を代入して二乗を展開すると

$$
\begin{aligned}
J_{\alpha,z}(x)-J_{\alpha,z}(x_\alpha)
&=2\langle Ax_\alpha-z,Ah\rangle_Y
+2\alpha\langle x_\alpha,h\rangle_X
+\|Ah\|_Y^2+\alpha\|h\|_X^2\\
&=2\langle B_\alpha x_\alpha-A^*z,h\rangle_X
+\|Ah\|_Y^2+\alpha\|h\|_X^2\\
&=\|Ah\|_Y^2+\alpha\|h\|_X^2
\ge\alpha\|h\|_X^2.
\end{aligned}
$$

よって $x_\alpha$ は唯一の最小点です。逆に最小点 $x$ があれば、任意の $h\in X$ に対し $t\mapsto J_{\alpha,z}(x+th)$ は $t=0$ で最小です。実数 $t$ の一次係数は

$$
2\langle Ax-z,Ah\rangle_Y+2\alpha\langle x,h\rangle_X
=2\langle B_\alpha x-A^*z,h\rangle_X
$$

なので全ての $h$ で零です。$h=B_\alpha x-A^*z$ を取ればそのノルムの二乗が零となり、正規方程式が従います。$\square$
<!-- proof-end -->

ここで $\alpha=0$ にしてしまうと、最後の $\alpha\|h\|^2$ が消え、可逆性と一意性の根拠がなくなります。たとえば $D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$、$z_n=1/n$ では $z\in\ell^2$ ですが、$Dx=z$ は $x_n=1$ を要求して解けません。一方、有限項だけ $x_n=1$ とする列では残差の二乗が $\sum_{n>N}1/n^2\to0$ です。無罰則の最小二乗では、下限 $0$ が達成されないのです。$\alpha>0$ はこの存在の問題も解消します。

## 4. 同じ特異値上で「硬い切断」と「滑らかな減衰」を比べる

真の未知量の正の特異方向成分を $x_j=\langle x,v_j\rangle_X$、データ成分を $z_j=\langle z,u_j\rangle_Y$ と書きます。[特異系の展開](../INV3/index.md#thm-inv3-singular-expansion)から $A^*z=\sum_j\sigma_jz_jv_j$、$A^*Av_j=\sigma_j^2v_j$ です。$A^*z$ は $\ker A$ に直交するので、Tikhonov の正規方程式の核方向の成分は $\alpha\langle x_\alpha,k\rangle=0$ となります。

各 $v_j$ と正規方程式の内積を取れば

$$
(\sigma_j^2+\alpha)\langle x_\alpha(z),v_j\rangle_X
=\sigma_j\langle z,u_j\rangle_Y.
$$

これを全方向についてまとめると、次の表現になります。

<a id="thm-inv5-spectral-filters"></a>

<!-- formal-statement-start -->
> **定理（TSVD・Tikhonovの特異値フィルタ表示）**
> 実 Hilbert 空間間のコンパクト線形作用素 $A:X\to Y$ の完全特異系 $(\sigma_j,u_j,v_j)_{j\in J}$ に対し、全ての $z\in Y$、$\tau,\alpha>0$ で

$$
\begin{aligned}
R_\tau^{\mathrm T}z
&=\sum_j\frac{f_\tau^{\mathrm T}(\sigma_j)}{\sigma_j}
\langle z,u_j\rangle_Yv_j,\\
R_\alpha^{\mathrm K}z
&=\sum_j\frac{f_\alpha^{\mathrm K}(\sigma_j)}{\sigma_j}
\langle z,u_j\rangle_Yv_j,
\end{aligned}
$$

> ただし正の特異値 $s>0$ に対する **フィルタ因子** は

$$
f_\tau^{\mathrm T}(s)=
\begin{cases}
1,&s\ge\tau,\\
0,&0<s<\tau,
\end{cases}
\qquad
f_\alpha^{\mathrm K}(s)=\frac{s^2}{s^2+\alpha}.
$$

> 後者の級数は $X$ でノルム収束する。両作用素は $\ker A^*$ の観測成分を無視し、出力は $(\ker A)^\perp$ に属する。また

$$
\|R_\tau^{\mathrm T}\|\le\frac1\tau,
\qquad
\|R_\alpha^{\mathrm K}\|\le\frac1{2\sqrt\alpha}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

TSVD の因子は閾値を超えると $1$、超えないと $0$ です。Tikhonov の因子は $0<f<1$ で、小さい $s$ ほど強く減衰します。正規方程式を各特異方向で解き、Bessel の不等式で級数と作用素ノルムを制御します。

<!-- proof-start -->
### 証明

TSVD の式は[TSVD正則化作用素](#def-inv5-tsvd)の和に場合分けの係数を書き入れたものです。[Tikhonov最小点の存在・一意性と正規方程式](#thm-inv5-tikhonov-minimizer)とその直前の成分計算から、$x_\alpha$ の $v_j$ 係数が $\sigma_jz_j/(\sigma_j^2+\alpha)$ と分かります。

さらに $k\in\ker A$ に対して次を確認できます。

$$
\langle A^*z,k\rangle_X=\langle z,Ak\rangle_Y=0.
$$

正規方程式と $Ak=0$ より $\alpha\langle x_\alpha,k\rangle=0$ です。従って $x_\alpha\in(\ker A)^\perp$ で、完全特異系の $v_j$ 展開で上式を復元できます。

各 $s>0$ に対して $(s-\sqrt\alpha)^2\ge0$ を開けば

$$
s^2+\alpha\ge2s\sqrt\alpha,
\qquad 0\le\frac{s}{s^2+\alpha}\le\frac1{2\sqrt\alpha}.
$$

よって[Bessel不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-bessel-inequality)を $(u_j)$ の任意の有限部分系に適用し、部分和の上界を取ると、$v_j$ の直交性から

$$
\begin{aligned}
\sum_j\left|\frac{\sigma_jz_j}{\sigma_j^2+\alpha}\right|^2
&\le\frac1{4\alpha}\sum_j|z_j|^2\\
&\le\frac{\|z\|_Y^2}{4\alpha}.
\end{aligned}
$$

従って級数は $X$ で収束し、$\|R_\alpha^{\mathrm K}z\|\le\|z\|/(2\sqrt\alpha)$ です。TSVD の上界は第1節で示しました。最後に $z\in\ker A^*$ なら全ての $j$ に対し $\sigma_jz_j=\langle A^*z,v_j\rangle=0$ なので両方の出力は零です。$\square$
<!-- proof-end -->

### 例：同じ観測を二つの方法で復元する

先ほどの $A=\operatorname{diag}(1,1/2,1/4)$ と $y=(2,1,1/2)$ を使います。Tikhonov で $\alpha=1/4$ とすると、特異値の二乗は $1,1/4,1/16$ だから、フィルタ因子は順に

$$
f_{1/4}^{\mathrm K}(1)=\frac45,
\qquad f_{1/4}^{\mathrm K}(1/2)=\frac12,
\qquad f_{1/4}^{\mathrm K}(1/4)=\frac15.
$$

正確な逆係数はすべて $2$ なので、

$$
R_{1/4}^{\mathrm K}y=(8/5,1,2/5),
\qquad R_{2/5}^{\mathrm T}y=(2,2,0).
$$

TSVD は第三成分だけを零にし、Tikhonov は三つとも別の割合で小さくします。さらに $y^\delta=(2,1,1/2+\varepsilon)$ とすれば $\delta=|\varepsilon|$、TSVD の出力は不変ですが、Tikhonov の第三成分は $2/5+(4/5)\varepsilon$ になります。**前者の完全な切断と、後者の部分的なノイズ透過**が直接見えます。

正の特異値方向だけでなく、観測不可能な $\ker A^*$ の成分はどちらの方法でも復元されません。データを $z=z_0+z_\perp$（$z_0\in\overline{\mathcal R(A)}$、$z_\perp\in\ker A^*$）と直交分解すると、復元値 $Rz\in X$ に $A$ を作用させた $ARz\in Y$ は $z_\perp$ 成分を持てません。従って残差 $ARz-z$ には必ず $-z_\perp$ が残ります。

## 5. 真の解への近づき方とノイズの抑制

どちらも有限パラメータでは真の信号まで減らします。前者は正則化によるバイアス、後者は観測ノイズが復元値へ伝わる誤差です。INV4の[誤差分解](../INV4/index.md#thm-inv4-error-splitting)へフィルタの具体式を代入すると、パラメータを小さくする条件が見えてきます。

<a id="thm-inv5-filter-convergence"></a>

<!-- formal-statement-start -->
> **定理（TSVDとTikhonovの整合性・ノイズ下での収束）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ をコンパクト線形作用素、$y\in\mathcal D(A^\dagger)$、$x^\dagger=A^\dagger y$ とする。$\|y^\delta-y\|_Y\le\delta$ なら、任意の $\tau,\alpha>0$ で

$$
\begin{aligned}
\|R_\tau^{\mathrm T}y^\delta-x^\dagger\|_X
&\le\left(\sum_{\sigma_j<\tau}|\langle x^\dagger,v_j\rangle_X|^2\right)^{1/2}
+\frac\delta\tau,\\
\|R_\alpha^{\mathrm K}y^\delta-x^\dagger\|_X
&\le\left(\sum_j\left(\frac\alpha{\sigma_j^2+\alpha}\right)^2
|\langle x^\dagger,v_j\rangle_X|^2\right)^{1/2}
+\frac\delta{2\sqrt\alpha}.
\end{aligned}
$$

> $\tau\downarrow0$、$\alpha\downarrow0$ ならそれぞれ無雑音のバイアスは零に収束する。従って $\delta\downarrow0$ に対し

$$
\tau(\delta)\to0,\quad\frac\delta{\tau(\delta)}\to0,
\qquad
\alpha(\delta)\to0,\quad\frac\delta{\sqrt{\alpha(\delta)}}\to0
$$

> を満たす選択をそれぞれ使えば、$\|y^\delta-y\|\le\delta$ を満たすすべての観測に対して復元値は $x^\dagger$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

厳密データ $y$ の係数は $\sigma_jx_j^\dagger$ です。これを二つのフィルタへ代入すると、TSVD の誤差は切り捨てた尾部、Tikhonov の誤差は $\alpha/(\sigma_j^2+\alpha)$ 倍された係数になります。各係数は $\alpha\to0$ で零に向かい、全体も二乗和の尾部を先に小さくすれば零にできます。

<!-- proof-start -->
### 証明

[最小ノルム一般化逆の定義域](../INV4/index.md#def-inv4-pseudoinverse-domain)より $x^\dagger\in(\ker A)^\perp$ で、$Ax^\dagger$ は $y$ の $\overline{\mathcal R(A)}$ 成分です。したがって[特異系の展開](../INV3/index.md#thm-inv3-singular-expansion)で $y_j=\langle y,u_j\rangle=\sigma_jx_j^\dagger$ です。この式を[フィルタ表示](#thm-inv5-spectral-filters)へ代入し、$x^\dagger=\sum_jx_j^\dagger v_j$ を引けば

$$
\begin{aligned}
R_\tau^{\mathrm T}y-x^\dagger
&=-\sum_{\sigma_j<\tau}x_j^\dagger v_j,\\
R_\alpha^{\mathrm K}y-x^\dagger
&=-\sum_j\frac\alpha{\sigma_j^2+\alpha}x_j^\dagger v_j.
\end{aligned}
$$

正規直交性により両者のノルムの二乗が定理右辺の級数です。無限個の添字でも $\sum_j|x_j^\dagger|^2=\|x^\dagger\|_X^2<\infty$ です。

TSVD では任意の $\varepsilon>0$ に対し有限集合 $F\subset J$ を選び、$\sum_{j\notin F}|x_j^\dagger|^2<\varepsilon^2$ とできます。$F$ が非空なら $\tau<\min_{j\in F}\sigma_j$ とすれば切り捨て側は $F$ を含まず、バイアスは $\varepsilon$ 未満です。$F$ が空なら元から全体のノルムが $\varepsilon$ 未満です。

Tikhonov でも同じ有限集合 $F$ を選びます。$0\le\alpha/(\sigma_j^2+\alpha)\le1$ なので $F$ の外の二乗和は $\varepsilon^2$ 以下です。有限個の $j\in F$ では各係数が $\alpha\downarrow0$ で零になるため、その有限和も零に近づきます。これで全バイアスが零へ収束します。

最後に[INV4の誤差分解](../INV4/index.md#thm-inv4-error-splitting)を $R_\tau^{\mathrm T}$、$R_\alpha^{\mathrm K}$ にそれぞれ適用します。[作用素ノルムの上界](#thm-inv5-spectral-filters)を代入すれば主張の二つの評価が得られます。パラメータ選択条件は両項を同時に零へ近づけます。$\square$
<!-- proof-end -->

パラメータを小さくするとバイアスは減りますが、ノイズを抑える上界 $1/\tau$ と $1/(2\sqrt\alpha)$ は増えます。たとえば $\tau(\delta)=\sqrt\delta$、$\alpha(\delta)=\delta$（$0<\delta<1$）は両方の条件を満たします。ただし、どちらが速く収束するかを一律には言えません。真の解がどの特異方向に多く含まれるかという追加仮定は次講で調べます。

## 6. 演習：切断・最小化・ノイズを結び付ける

<a id="ex-inv5-a01"></a>

### INV5-A01 TSVDの閾値とノルム
- Level: A

$A=\operatorname{diag}(3,1,1/5):\mathbb R^3\to\mathbb R^3$、$z=(3,2,1)$ とする。$\tau=1/2$ の TSVD 復元値、$\|R_\tau^{\mathrm T}\|$、残差 $\|AR_\tau^{\mathrm T}z-z\|$ を求めよ。

<!-- solution-start -->
#### 詳細解答

標準基底が完全特異系です。$3,1\ge1/2$、$1/5<1/2$ なので最初の二つだけ採用します。[TSVD正則化作用素](#def-inv5-tsvd)から

$$
R_{1/2}^{\mathrm T}z=(3/3,2/1,0)=(1,2,0).
$$

作用素は対角行列 $\operatorname{diag}(1/3,1,0)$ なので、単位ベクトルに対する最大倍率は $1$、従ってノルムは $1$ です。また $ARz=(3,2,0)$ なので $ARz-z=(0,0,-1)$、残差ノルムは $1$ です。最初の二方向は厳密に合わせ、第三方向を捨てたことによる残差だけが残ります。
<!-- solution-end -->

<a id="ex-inv5-a02"></a>

### INV5-A02 正規方程式を座標で解く
- Level: A

$A=\operatorname{diag}(2,0)$、$z=(3,4)$、$\alpha=1$ に対し、$J_{\alpha,z}$ の最小点とその最小値を求めよ。$z$ の第二成分が解に現れない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$A^*A+I=\operatorname{diag}(5,1)$、$A^*z=(6,0)$ です。[正規方程式](#thm-inv5-tikhonov-minimizer)は $5x_1=6$、$x_2=0$ なので $x=(6/5,0)$ です。目的関数へ戻して

$$
J_{1,z}(6/5,0)
=(12/5-3)^2+(-4)^2+(6/5)^2
=9/25+16+36/25=89/5.
$$

$A(x_1,x_2)$ の第二成分は常に零なので、残差の $4^2$ はどの $x$ でも消せません。$A^*(0,4)=(0,0)$ であり、第二観測成分は正規方程式の右辺にも入りません。
<!-- solution-end -->

<a id="ex-inv5-a03"></a>

### INV5-A03 一方向のフィルタ因子
- Level: A

$A:\mathbb R\to\mathbb R$、$Ax=x/2$ とし、$z=1$、$\alpha=1/4$ とする。Tikhonov のフィルタ因子と復元値を求め、無罰則の逆算値と比べよ。

<!-- solution-start -->
#### 詳細解答

唯一の特異値は $s=1/2$ です。[特異値フィルタ](#thm-inv5-spectral-filters)の式へ $s^2=1/4$ と $\alpha=1/4$ を代入すると

$$
f_{1/4}^{\mathrm K}(1/2)=\frac{1/4}{1/4+1/4}=\frac12.
$$

無罰則の逆算係数は $z/s=2$ です。Tikhonov はその半分なので $x_\alpha=1$。[本章のTikhonov最小点の定理](#thm-inv5-tikhonov-minimizer)へ $A^*A=1/4$、$\alpha=1/4$、$A^*z=1/2$ を代入しても、$(1/4+1/4)x=1/2$ となり $x=1$ と確かめられます。
<!-- solution-end -->

<a id="ex-inv5-a04"></a>

### INV5-A04 罰則係数を零にできない理由
- Level: A

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$、$z_n=1/n$ とする。$\inf_{x\in\ell^2}\|Dx-z\|_2^2=0$ だが最小点が存在しないことを、具体的な有限台の列から示せ。

<!-- solution-start -->
#### 詳細解答

$z\in\ell^2$ は $\sum_n1/n^2<\infty$ から従います。$x^{(N)}=(1,\ldots,1,0,\ldots)$（最初の $N$ 個だけ $1$）を取れば $x^{(N)}\in\ell^2$ で

$$
\|Dx^{(N)}-z\|_2^2=\sum_{n>N}\frac1{n^2}\longrightarrow0.
$$

二乗ノルムは非負なので下限は零です。ところが最小点 $x$ があれば $Dx=z$、各座標で $x_n/n=1/n$、すなわち $x_n=1$ が全 $n$ で必要です。この列は $\ell^2$ に属しません。従って下限は達成されません。$\alpha>0$ の[存在定理](#thm-inv5-tikhonov-minimizer)で必要だった正の罰則を消した影響です。
<!-- solution-end -->

<a id="ex-inv5-a05"></a>

### INV5-A05 ノイズの最大増幅率
- Level: A

任意の $s,\alpha>0$ に対し $s/(s^2+\alpha)\le1/(2\sqrt\alpha)$ を平方の非負性から示せ。等号がいつ成り立つかも答えよ。

<!-- solution-start -->
#### 詳細解答

$(s-\sqrt\alpha)^2\ge0$ を展開すると $s^2-2s\sqrt\alpha+\alpha\ge0$ です。移項して $s^2+\alpha\ge2s\sqrt\alpha$。両辺は正なので逆数の不等号に注意して

$$
\frac{s}{s^2+\alpha}\le\frac{s}{2s\sqrt\alpha}
=\frac1{2\sqrt\alpha}.
$$

等号は元の平方が零、すなわち $s=\sqrt\alpha$ のときに限られます。これはその特異値に沿った観測ノイズが最も強く通ることを意味します。
<!-- solution-end -->

<a id="ex-inv5-b01"></a>

### INV5-B01 直接法を使わず一意性を再構成する
- Level: B

実 Hilbert 空間 $X,Y$ と有界線形作用素 $A:X\to Y$、$z\in Y$、$\alpha>0$ に対し、$B=A^*A+\alpha I$ の値域が閉であることを示せ。また $B^*=B$、$\ker B=\{0\}$ を使い $B$ が全射だと証明し、$J_{\alpha,z}$ の最小点の唯一性まで結べ。

<!-- solution-start -->
#### 詳細解答

任意の $h$ について $\alpha\|h\|^2\le\langle Bh,h\rangle\le\|Bh\|\|h\|$ なので $\|Bh\|\ge\alpha\|h\|$ です。この評価から $Bh=0$ なら $h=0$。さらに $Bh_n$ が Cauchy 列なら

$$
\|h_n-h_m\|\le\alpha^{-1}\|Bh_n-Bh_m\|
$$

なので $h_n\to h$ となり、$B$ の連続性から $Bh_n\to Bh$ です。従って $\mathcal R(B)$ は閉。$B$ は随伴の定義から自己共役なので $\mathcal R(B)^\perp=\ker B^*=\ker B=\{0\}$ です。値域は閉かつ稠密ゆえ $X$ 全体となります。従って $Bx=A^*z$ に唯一の解 $x_\alpha$ が存在します。

任意の $h$ に対し平方を展開すると

$$
J_{\alpha,z}(x_\alpha+h)-J_{\alpha,z}(x_\alpha)
=\|Ah\|^2+\alpha\|h\|^2\ge\alpha\|h\|^2.
$$

展開前の一次交差項は

$$
2\langle Ax_\alpha-z,Ah\rangle+2\alpha\langle x_\alpha,h\rangle
=2\langle Bx_\alpha-A^*z,h\rangle=0
$$

であり、$Bx_\alpha=A^*z$ を使いました。等号は $h=0$ の場合に限るので $x_\alpha$ は唯一の最小点です。
<!-- solution-end -->

<a id="ex-inv5-b02"></a>

### INV5-B02 無限次元対角作用素の二種類の復元
- Level: B

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$、$x_n^\dagger=1/n$、$y=Dx^\dagger$ とする。$\tau=1/m$（$m\in\mathbb N$）の TSVD と $\alpha>0$ の Tikhonov の $n$ 番目の出力係数を求めよ。両者の無雑音バイアス二乗を書き、$m\to\infty$、$\alpha\downarrow0$ でそれぞれ零になる理由を述べよ。

<!-- solution-start -->
#### 詳細解答

この作用素の正の特異値は $\sigma_n=1/n$、特異ベクトルは $e_n$ です。観測 $y_n=1/n^2$ なので、$\sigma_n\ge1/m$ と $n\le m$ は同値です。[TSVD正則化作用素](#def-inv5-tsvd)から

$$
(R_{1/m}^{\mathrm T}y)_n=
\begin{cases}1/n,&n\le m,\\0,&n>m.\end{cases}
$$

従って誤差の二乗は $\sum_{n>m}1/n^2\to0$ です。Tikhonov は[フィルタ式](#thm-inv5-spectral-filters)の倍率 $\sigma_n/(\sigma_n^2+\alpha)=n/(1+\alpha n^2)$ に $y_n$ を掛けるので

$$
(R_\alpha^{\mathrm K}y)_n=\frac1{n(1+\alpha n^2)}.
$$

元の $1/n$ との差は $-\alpha n/(1+\alpha n^2)$ で、バイアス二乗は

$$
\sum_{n\ge1}\frac{\alpha^2n^2}{(1+\alpha n^2)^2}.
$$

各項は $\alpha\to0$ で零、かつ $0\le\alpha n/(1+\alpha n^2)\le1/n$ なので二乗和は $\sum1/n^2$ で抑えられます。有限項と尾部を分ければ全体も零へ収束します。
<!-- solution-end -->

<a id="ex-inv5-b03"></a>

### INV5-B03 ノイズ水準だけを下げても失敗する選択
- Level: B

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$、真のデータ $y=0$ とする。$m\to\infty$ に対し $\delta_m=1/m$、$y^{\delta_m}=\delta_m e_m$ を取る。$\tau_m=1/m$ および $\alpha_m=1/m^2$ で TSVD、Tikhonov の出力を計算し、収束しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$\|y^{\delta_m}-0\|_2=\delta_m\to0$ です。しかし $\sigma_m=1/m=\tau_m$ なので TSVD はこの方向を残し、

$$
R_{\tau_m}^{\mathrm T}y^{\delta_m}
=\frac{\delta_m}{\sigma_m}e_m=e_m,
\qquad\|R_{\tau_m}^{\mathrm T}y^{\delta_m}\|_2=1.
$$

Tikhonov では同じ方向のデータを $\sigma_m/(\sigma_m^2+\alpha_m)$ 倍するので、

$$
R_{\alpha_m}^{\mathrm K}y^{\delta_m}
=\frac{1/m}{1/m^2+1/m^2}\frac1m e_m
=\frac12e_m.
$$

どちらも真の最小ノルム解 $0$ に近づきません。[収束定理](#thm-inv5-filter-convergence)の十分条件は $\delta_m/\tau_m=1\not\to0$、$\delta_m/\sqrt{\alpha_m}=1\not\to0$ で破れています。この例は十分条件の欠如が実際の失敗として現れることを示します。
<!-- solution-end -->

<a id="ex-inv5-b04"></a>

### INV5-B04 Tikhonovの罰則を強めるとどうなるか
- Level: B

コンパクト作用素 $A$ と $z\in Y$ を固定する。$0<\alpha_1<\alpha_2$ としたとき、$\|R_{\alpha_2}^{\mathrm K}z\|_X\le\|R_{\alpha_1}^{\mathrm K}z\|_X$ と $\|AR_{\alpha_1}^{\mathrm K}z-z\|_Y\le\|AR_{\alpha_2}^{\mathrm K}z-z\|_Y$ を、フィルタ係数から示せ。

<!-- solution-start -->
#### 詳細解答

$z_j=\langle z,u_j\rangle$ とし、[特異系の展開](../INV3/index.md#thm-inv3-singular-expansion)から $\overline{\mathcal R(A)}$ を張る $u_j$ を用いて $z_0=\sum_jz_ju_j$、$z_\perp=z-z_0\in\ker A^*$ と直交分解します。[特異値表示](#thm-inv5-spectral-filters)より

$$
\|R_\alpha^{\mathrm K}z\|_X^2
=\sum_j\frac{\sigma_j^2|z_j|^2}{(\sigma_j^2+\alpha)^2}.
$$

分母は $\alpha$ とともに増えるので各項は非増加です。出力に $A$ を作用させた $u_j$ 係数は $\sigma_j^2z_j/(\sigma_j^2+\alpha)$ であり、残差の係数は $-\alpha z_j/(\sigma_j^2+\alpha)$ です。従って

$$
\|AR_\alpha^{\mathrm K}z-z\|_Y^2
=\|z_\perp\|_Y^2
+\sum_j\frac{\alpha^2|z_j|^2}{(\sigma_j^2+\alpha)^2}.
$$

$\alpha/(\sigma_j^2+\alpha)$ は $\alpha$ とともに増えるため、各項は非減少です。二乗和で比較してから平方根を取れば両不等式が得られます。罰則を強めると解は小さくなるが、観測への不一致は増えるという交換関係です。
<!-- solution-end -->

<a id="ex-inv5-c01"></a>

### INV5-C01 観測不能成分・小特異値・ノイズを同時に扱う
- Level: C

$H=\ell^2\oplus\mathbb R$、$A:H\to H$ を $A((x_n),t)=((x_n/n),0)$ とする。$x^\dagger=((1/n)_{n\ge1},0)$、$y=Ax^\dagger$、$z^\delta=y+((\eta_n),b)$、$\sum_n|\eta_n|^2+b^2\le\delta^2$ とする。

1. $A$ の正の特異系、$\ker A$、$\ker A^*$ を求めよ。
2. $R_{1/m}^{\mathrm T}z^\delta$ と $R_\alpha^{\mathrm K}z^\delta$ の全座標を求めよ。
3. $m(\delta)=\lceil\delta^{-1/2}\rceil$、$\alpha(\delta)=\delta$（$0<\delta<1$）で、全許容ノイズに対し $x^\dagger$ へ収束することを示せ。
4. $b$ を $1$ に固定し $\eta=0$、$\delta=1$ とすると、再構成した $x$ で $Ax=z^\delta$ とできない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** 直交和の内積から、任意の $((x_n),t),((w_n),s)$ に対し

$$
\langle A((x_n),t),((w_n),s)\rangle_H
=\sum_n\frac{x_nw_n}{n}
=\langle ((x_n),t),A((w_n),s)\rangle_H.
$$

従って $A^*=A$。$\ker A=\ker A^*=\{0\}\oplus\mathbb R$、$\sigma_n=1/n$、$u_n=v_n=(e_n,0)$ です。$A$ は有限階数打切り作用素への作用素ノルム収束（尾部ノルム $\le1/(N+1)$）からコンパクトです。$(e_n,0)$ は核の直交補と値域の閉包 $\ell^2\oplus\{0\}$ の完全正規直交系なので、[完全特異系の定義](../INV3/index.md#def-inv3-singular-system)をすべて満たします。

**2.** 観測の第 $n$ 成分は $1/n^2+\eta_n$ です。TSVD では $1/n\ge1/m$ と $n\le m$ は同値なので

$$
R_{1/m}^{\mathrm T}z^\delta=\left((w_n)_{n\ge1},0\right),
\qquad
w_n=\begin{cases}
1/n+n\eta_n,&n\le m,\\
0,&n>m.
\end{cases}
$$

Tikhonov の各係数は $\sigma_n/(\sigma_n^2+\alpha)=n/(1+\alpha n^2)$ であるため

$$
R_\alpha^{\mathrm K}z^\delta
=\left(\left(\frac1{n(1+\alpha n^2)}
+\frac{n\eta_n}{1+\alpha n^2}\right)_{n\ge1},0\right).
$$

どちらも最後の観測値 $b$ を捨て、出力の最後の未知成分を零にします。

**3.** [誤差評価の定理](#thm-inv5-filter-convergence)をこの $x^\dagger$ に使います。$m(\delta)\to\infty$ なので、TSVD のバイアスは $\left(\sum_{n>m}1/n^2\right)^{1/2}\to0$ です。ノイズ項は

$$
\frac\delta{\tau(\delta)}
=\delta\,m(\delta)
\le\sqrt\delta+\delta\longrightarrow0,
$$

ここで $m=\lceil\delta^{-1/2}\rceil\le\delta^{-1/2}+1$ を使いました。Tikhonov のバイアスも同じ定理で零に収束し、ノイズ項は $\delta/(2\sqrt\alpha)=\sqrt\delta/2\to0$ です。誤差評価は任意の $\eta,b$ に対して $\|((\eta_n),b)\|\le\delta$ だけを使用するため、結論は全許容ノイズに一様です。

**4.** $A((x_n),t)$ の最後の成分は必ず零ですが、$z^\delta$ の最後の成分は $1$ です。従って $Ax=z^\delta$ はいかなる $x\in H$ に対しても不可能です。これはノイズの増幅とは別の、$\ker A^*$ 方向にある観測不能成分の問題です。
<!-- solution-end -->

## 7. 次に問うこと

TSVD は小さい特異値を切り捨て、Tikhonov は $s^2/(s^2+\alpha)$ という連続的な因子で抑制します。どちらも、真の未知量まで削るバイアスと、残した方向に流れ込むデータ誤差の競争を避けられません。

今回示したのは収束に十分なパラメータ条件であり、誤差が **どれくらい速く** 減るかではありません。INV6 では、真の未知量が小特異値方向へどの程度広がるかを記述する source condition を導入し、収束速度を定量化します。
