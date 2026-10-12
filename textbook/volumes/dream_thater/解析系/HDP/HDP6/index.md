# HDP6 ε-netとJohnson–Lindenstrauss射影

[HDP5のGaussian集中](../HDP5/index.md#thm-hdp5-gaussian-concentration)では、ひとつのLipschitz関数の値が期待値から大きく離れる確率を評価しました。しかし高次元の問題では、向きが無数にあります。例えば行列 $T$ がすべての方向をどれだけ伸ばすかを調べるには、単一のベクトルだけでは足りません。また、何百万もの点の距離を保ったまま出力次元を減らせるのか、という問いでは点の組ごとに誤差を同時制御しなければなりません。

二つの課題に共通する考え方は、**無限の方向を有限の代表点で近似すること**、そして **有限個の失敗確率を足すこと**です。この章では球面を覆う有限集合を実際に構成し、その上で行列ノルムを検査できることを証明します。次にGaussian行列の一本のベクトルに対する長さ保存を密度積分から証明し、有限個の点の全ての組へ拡張します。重要なのは「特定の有限点集合に対する保証」と「空間中の全ベクトルに対する保証」を区別することです。

## 1. 方向の無限集合を有限集合で近似する

$d\ge1$ とし、Euclidノルムを $\|x\|_2=(\sum_{j=1}^d x_j^2)^{1/2}$、単位球面を $S^{d-1}=\{x\in\mathbb R^d:\|x\|_2=1\}$ と書きます。方向を有限個の候補で近似するには、任意の方向から距離 $\eta$ 以内に候補が見つかるようにすれば十分です。$\eta$ は距離の精度であり、後で距離の二乗の伸縮率を測る $\varepsilon$ とは別の記号です。

<a id="def-hdp6-net"></a>

<!-- formal-statement-start -->
> **定義（球面の有限η-net）**  
> $d\ge1$、$\eta>0$ とする。有限集合 $\mathcal N\subset S^{d-1}$ が $\eta$-netであるとは、任意の $x\in S^{d-1}$ に対し、ある $v\in\mathcal N$ が存在して

$$
\|x-v\|_2\le\eta
$$

> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp6-net -->
**定義の確認。** $d=1$ では $S^0=\{-1,1\}$ です。$\mathcal N=\{-1,1\}$ とすれば任意の $x\in S^0$ に対して $v=x$ が選べ、距離は $0\le\eta$ です。$d=2$ なら正整数 $q\ge2$ に対して $v_j=(\cos(2\pi j/q),\sin(2\pi j/q))$（$0\le j<q$）を候補にします。任意の方向角 $\theta$ から角度差が高々 $\pi/q$ の $v_j$ があり、

$$
\|(\cos\theta,\sin\theta)-v_j\|_2
=2\left|\sin\frac{\theta-2\pi j/q}{2}\right|
\le\frac{\pi}{q}.
$$

したがって $\mathcal N=\{v_0,\ldots,v_{q-1}\}$ は $\pi/q$-netです。$q$ を増やすと誤差が下がりますが、代表点数も増えます。
<!-- definition-example-end -->

球面は有界なので、十分近い点を際限なく互いに離して置くことはできません。これを有限個の小球の体積で数え上げると、**次元に対して指数的な大きさのnetが存在する**と分かります。これは上界であって、すべての場合の最小点数を主張するものではありません。

<a id="def-hdp6-covering-number"></a>

<!-- formal-statement-start -->
> **定義（球面の被覆数）**  
> $d\ge1$、$\eta>0$ に対し、$S^{d-1}$ の有限 $\eta$-netの濃度の最小値を

$$
N(S^{d-1},\eta)
=\min\{|\mathcal N|:\mathcal N\subset S^{d-1}\text{ は有限 }\eta\text{-net}\}
$$

> と書く。右辺が非空であることは次の補題で保証される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp6-covering-number -->
**定義の確認。** $S^0=\{-1,1\}$、$0<\eta<2$ なら、一点だけを選んだ場合には残る点まで距離 $2>\eta$ です。一方二点とも選べば距離は $0$ なので、$N(S^0,\eta)=2$ です。$\eta\ge2$ なら一点ですべてを覆い、被覆数は $1$ になります。定義の最小値は、単なる候補数ではありません。
<!-- definition-example-end -->

<a id="lem-hdp6-volumetric-net"></a>

<!-- formal-statement-start -->
> **補題（球面の体積法による被覆）**  
> 任意の整数 $d\ge1$ と $0<\eta<1$ に対し、$S^{d-1}$ には有限 $\eta$-net $\mathcal N$ が存在して

$$
|\mathcal N|\le(1+2/\eta)^d
$$

> を満たす。従って $N(S^{d-1},\eta)\le(1+2/\eta)^d$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まだ覆われていない方向を一つずつ加えます。選んだ点の周りの半径 $\eta/2$ の開球は互いに交わらず、すべて半径 $1+\eta/2$ の球の内部に収まります。体積は半径の $d$ 乗に比例するので、この操作が何回で止まるかを直接数えられます。

<!-- proof-start -->
### 証明

最初に $v_1\in S^{d-1}$ を一つ選びます。すでに選んだ $v_1,\ldots,v_k$ のいずれからも距離が **$\eta$ より大きい**点があれば、それを $v_{k+1}$ として追加します。追加できなくなれば、任意の $x\in S^{d-1}$ に対して $\min_i\|x-v_i\|_2\le\eta$ となるので、選ばれた集合は定義どおりnetです。

この操作が有限回で止まることを示します。選んだ点同士の距離は $\eta$ より大きいので、各中心 $v_i$ の開球

$$
B_i=\{y\in\mathbb R^d:\|y-v_i\|_2<\eta/2\}
$$

は互いに交わりません。二つの小球が交わると仮定し、共通点を $y\in B_i\cap B_j$ と取ります。[三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-triangle-inequality)を使うと

$$
\|v_i-v_j\|_2
\le\|v_i-y\|_2+\|y-v_j\|_2<\eta,
$$

となり選び方と矛盾するからです。他方 $y\in B_i$ なら $\|y\|_2\le\|y-v_i\|_2+\|v_i\|_2<1+\eta/2$ です。

$\mathbb R^d$ の単位開球の体積を $V_d\in(0,\infty)$ とします。変数変換 $y=rz$ のJacobianが $r^d$ なので半径 $r$ の開球の体積は $r^dV_d$ です。従って有限個 $k$ を選べたなら、互いに交わらない開球の体積を足して

$$
k(\eta/2)^dV_d
\le(1+\eta/2)^dV_d.
$$

$V_d>0$ で割ると $k\le(1+2/\eta)^d$ です。右辺は選び方に依存しない有限数なので無限に点を追加することは不可能であり、有限回後にはnetが完成します。被覆数もその濃度以下です。
<!-- proof-end -->

**数の読み方。** $\eta=1/4$ なら高々 $9^d$ 個で覆えます。$d=100$ で $9^{100}$ 個を実際に列挙するという意味ではありません。「全方向の条件を有限個で確かめる」という論証に、候補数の上限を与えたのです。候補数の対数は $d\log9$ となり、次章の確率評価と組み合わせると効いてきます。

## 2. netから作用素ノルムへ

行列の作用素ノルムは、球面上の無限個の入力についての最大伸長率です。ここでは[2-作用素ノルムの定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)に従い、$T\in\mathbb R^{m\times d}$ について

$$
\|T\|_{\mathrm{op}}
=\sup_{\|x\|_2=1}\|Tx\|_2
$$

とします。候補 $v\in\mathcal N$ だけの値はこの上限以下ですが、どれほど近いでしょうか。

<a id="lem-hdp6-operator-net"></a>

<!-- formal-statement-start -->
> **補題（netによる作用素ノルム近似）**  
> $d,m\ge1$、$0<\eta<1$ とし、$\mathcal N\subset S^{d-1}$ を有限 $\eta$-netとする。任意の $T\in\mathbb R^{m\times d}$ について

$$
\max_{v\in\mathcal N}\|Tv\|_2
\le\|T\|_{\mathrm{op}}
\le\frac{1}{1-\eta}\max_{v\in\mathcal N}\|Tv\|_2
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

任意の単位ベクトルを近い代表点で置き換えます。置換誤差に $\eta\|T\|_{\mathrm{op}}$ が残りますが、これを左辺に移項すると係数 $1-\eta$ が現れます。

<!-- proof-start -->
### 証明

各 $v\in\mathcal N$ は単位ベクトルなので $\|Tv\|_2\le\|T\|_{\mathrm{op}}$ です。逆側には任意の $x\in S^{d-1}$ を取り、[球面の有限η-net](#def-hdp6-net)の被覆条件により $\|x-v\|_2\le\eta$ となる $v\in\mathcal N$ を選びます。線形性と三角不等式を順に使うと

$$
\begin{aligned}
\|Tx\|_2
&=\|Tv+T(x-v)\|_2\\
&\le\|Tv\|_2+\|T(x-v)\|_2\\
&\le\max_{w\in\mathcal N}\|Tw\|_2
+\|T\|_{\mathrm{op}}\|x-v\|_2\\
&\le\max_{w\in\mathcal N}\|Tw\|_2+\eta\|T\|_{\mathrm{op}}.
\end{aligned}
$$

この不等式はすべての単位 $x$ について成立するので左辺の上限を取れます。移項して

$$
(1-\eta)\|T\|_{\mathrm{op}}
\le\max_{w\in\mathcal N}\|Tw\|_2
$$

です。$1-\eta>0$ を確認して割れば結論です。
<!-- proof-end -->

例えば $\eta=1/4$ なら有限個の値の最大値を $4/3$ 倍するだけで、無限個の方向に対する最大伸長率を上から評価できます。$\eta\ge1$ としてしまうと上の移項後の係数が非正となり、この証明は機能しません。

対称行列の二次形式では、入力の二箇所にベクトルが現れるため誤差が $2\eta$ になります。

<a id="lem-hdp6-quadratic-net"></a>

<!-- formal-statement-start -->
> **補題（対称行列の二次形式net評価）**  
> $d\ge1$、$B\in\mathbb R^{d\times d}$ が実対称、$0<\eta<1/2$ とする。$\mathcal N\subset S^{d-1}$ が有限 $\eta$-netなら

$$
\max_{v\in\mathcal N}|v^{\mathsf T}Bv|
\le\|B\|_{\mathrm{op}}
\le\frac{1}{1-2\eta}
\max_{v\in\mathcal N}|v^{\mathsf T}Bv|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

対称行列では最大絶対固有値が作用素ノルムであることを使います。その二次形式を $x$ から $v$ へ二回置き換え、それぞれで生じる誤差を評価します。

<!-- proof-start -->
### 証明

[実対称行列の直交対角化](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)より、正規直交固有基底で $B=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T}$ と書けます。単位 $x$ に対し $z=Q^{\mathsf T}x$ と置けば $\sum z_i^2=1$ なので

$$
|x^{\mathsf T}Bx|
=\left|\sum_{i=1}^d\lambda_i z_i^2\right|
\le\max_i|\lambda_i|\sum_i z_i^2
=\max_i|\lambda_i|.
$$

最大絶対固有値に対応する固有ベクトルでは等号です。[最大特異値の公式](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-operator-norm-largest-singular)と対称性から $\|B\|_{\mathrm{op}}=\max_i|\lambda_i|$ であり、

$$
\|B\|_{\mathrm{op}}
=\sup_{\|x\|_2=1}|x^{\mathsf T}Bx|
$$

となります。任意の単位 $x$ に対し $\|x-v\|_2\le\eta$ となる代表点 $v$ を取り、差を二つに分けると

$$
x^{\mathsf T}Bx-v^{\mathsf T}Bv
=(x-v)^{\mathsf T}Bx+v^{\mathsf T}B(x-v).
$$

ここで[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を各内積へ適用します。さらに[2-作用素ノルムの定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)を各行列積に適用すると

$$
\begin{aligned}
|x^{\mathsf T}Bx-v^{\mathsf T}Bv|
&\le\|x-v\|_2\|Bx\|_2+
\|v\|_2\|B(x-v)\|_2\\
&\le\eta\|B\|_{\mathrm{op}}+\eta\|B\|_{\mathrm{op}}
=2\eta\|B\|_{\mathrm{op}}.
\end{aligned}
$$

上限を取って $(1-2\eta)\|B\|_{\mathrm{op}}\le\max_{v\in\mathcal N}|v^{\mathsf T}Bv|$ を得ます。$\eta<1/2$ なので割れます。逆向きは各 $v$ が単位であることから従います。
<!-- proof-end -->

この補題は標本共分散のように対称な誤差行列を評価するときの入口です。重要な違いは、一般の $T$ では係数が $1-\eta$、二次形式では $1-2\eta$ になることです。

## 3. Gaussian射影が一本の長さを保つ理由

今度は代表点を検査するのではなく、有限個の点を少ない座標へ写す問題を考えます。$m,d\ge1$ として、$m\times d$ 行列 $A$ の各要素 $A_{ij}$ を独立な $N(0,1/m)$ に従わせます。$N(0,1/m)$ は平均 $0$、分散 $1/m$ の正規分布です。$A:\mathbb R^d\to\mathbb R^m$ を**Gaussianランダム射影**として使います。

一つの固定ベクトル $x\ne0$ を決めると、各行と $x$ の内積は平均 $0$、分散 $\|x\|_2^2/m$ の正規変数です。異なる行は独立なので、標準正規変数 $G_1,\ldots,G_m$ を使って

$$
\frac{\|Ax\|_2^2}{\|x\|_2^2}
\ \overset{\mathrm d}{=}\ \frac1m\sum_{i=1}^mG_i^2
$$

と書けます。$\overset{\mathrm d}{=}$ は確率分布が一致する意味であり、実現値そのものの一致は主張していません。係数 $1/\sqrt m$ がないと長さの二乗の平均は $m$ 倍になってしまいます。

まず正規変数の二乗和の指数モーメントを計算します。$G\sim N(0,1)$ の密度は $(2\pi)^{-1/2}e^{-u^2/2}$ です。$s<1/2$ で

$$
\begin{aligned}
E e^{sG^2}
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}
\exp\!\left(-\frac{1-2s}{2}u^2\right)du\\
&=\frac1{\sqrt{1-2s}}.
\end{aligned}
$$

二行目は $z=\sqrt{1-2s}\,u$ と置き、標準正規密度の積分が $1$ であることを使いました。$s\ge1/2$ では積分は発散します。以降 $S=\sum_{i=1}^mG_i^2$ と置くと、独立性から

$$
Ee^{sS}=(1-2s)^{-m/2}\quad(s<1/2),
\qquad ES=m.
$$

これが集中評価の出発点です。

<a id="lem-hdp6-gaussian-fixed-vector"></a>

<!-- formal-statement-start -->
> **補題（Gaussian射影の固定ベクトル長さ保存）**  
> $m,d\ge1$ とし、$A\in\mathbb R^{m\times d}$ の成分が独立に $N(0,1/m)$ に従うとする。固定した任意の $x\in\mathbb R^d$ と $0<\varepsilon<1$ に対し、$x\ne0$ なら

$$
P\!\left(
\left|\|Ax\|_2^2-\|x\|_2^2\right|
\ge\varepsilon\|x\|_2^2
\right)
\le2\exp(-m\varepsilon^2/8).
$$

> $x=0$ なら $\|Ax\|_2^2=\|x\|_2^2=0$ は確率 $1$ で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

一つの方向へ作用させたGaussian行列の各行は独立な正規変数を生みます。長さの二乗は正規二乗和 $S$ に変わり、[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)に $e^{sS}$ と $e^{-sS}$ を適用します。最適な $s$ の代入と対数の不等式まで実際に計算します。

<!-- proof-start -->
### 証明

$x\ne0$ を固定します。各行の内積 $Y_i=\sum_{j=1}^dA_{ij}x_j$ は独立な正規変数です。平均は $0$、分散は共分散が零の独立項について足して

$$
\operatorname{Var}(Y_i)
=\sum_{j=1}^dx_j^2\operatorname{Var}(A_{ij})
=\frac{\|x\|_2^2}{m}.
$$

従って $Y_i\overset{\mathrm d}{=}(\|x\|_2/\sqrt m)G_i$ であり、比の分布は $S/m$ です。

**上側。** $0<s<1/2$ とし、[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を $S$ と閾値 $m(1+\varepsilon)$ に適用します。

$$
\begin{aligned}
P(S\ge m(1+\varepsilon))
&\le e^{-sm(1+\varepsilon)}Ee^{sS}\\
&=\exp\left[-sm(1+\varepsilon)
-\frac m2\log(1-2s)\right].
\end{aligned}
$$

指数部を $s$ で微分すると $-m(1+\varepsilon)+m/(1-2s)$ です。これが $0$ となる値

$$
s_+=\frac{\varepsilon}{2(1+\varepsilon)}
$$

は $0<s_+<1/2$ を満たします。$1-2s_+=1/(1+\varepsilon)$ を代入して

$$
P(S\ge m(1+\varepsilon))
\le\exp\left[-\frac m2\bigl(\varepsilon-\log(1+\varepsilon)\bigr)\right].
$$

ここで $h(u)=u-\log(1+u)-u^2/4$ は $h(0)=0$、$0\le u\le1$ で

$$
h'(u)=\frac{u}{1+u}-\frac u2
=\frac{u(1-u)}{2(1+u)}\ge0.
$$

よって $\varepsilon-\log(1+\varepsilon)\ge\varepsilon^2/4$ であり、上側確率は $\exp(-m\varepsilon^2/8)$ 以下です。

**下側。** $s>0$ として $-S$ に[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を適用すると

$$
\begin{aligned}
P(S\le m(1-\varepsilon))
&\le e^{sm(1-\varepsilon)}Ee^{-sS}\\
&=\exp\left[sm(1-\varepsilon)
-\frac m2\log(1+2s)\right].
\end{aligned}
$$

指数部の微分は $m(1-\varepsilon)-m/(1+2s)$ で、零にする値は

$$
s_-=\frac{\varepsilon}{2(1-\varepsilon)}>0.
$$

$1+2s_-=1/(1-\varepsilon)$ を代入すると

$$
P(S\le m(1-\varepsilon))
\le\exp\left[-\frac m2\bigl(-\varepsilon-\log(1-\varepsilon)\bigr)\right].
$$

関数 $g(u)=-u-\log(1-u)-u^2/2$ は $g(0)=0$、$0\le u<1$ で

$$
g'(u)=-1+\frac1{1-u}-u
=\frac{u^2}{1-u}\ge0
$$

なので $-\varepsilon-\log(1-\varepsilon)\ge\varepsilon^2/2$ です。従って下側確率は $\exp(-m\varepsilon^2/4)$ 以下で、さらに $\exp(-m\varepsilon^2/8)$ 以下です。

二つの事象の和を評価して、$\left|S/m-1\right|\ge\varepsilon$ の確率を $2e^{-m\varepsilon^2/8}$ 以下に抑えます。最初の分布同一性を戻せば主張を得ます。$x=0$ は $A0=0$ より確率評価なしで成立します。
<!-- proof-end -->

重要なのは $x$ を**ランダム行列 $A$ の実現前に固定**することです。この証明から直ちに「すべての $x$ に同時に成り立つ」とは言えません。$m<d$ の場合、どの $m\times d$ 行列にも非零の核ベクトルがあるため、全方向の長さを保存することはそもそも不可能です。

## 4. 有限点集合のすべての距離を保つ

いま有限個の点 $x_1,\ldots,x_N\in\mathbb R^d$ を考え、同じランダム行列 $A$ でまとめて写します。距離 $\|x_i-x_j\|_2$ は差ベクトル $x_i-x_j$ の長さです。行列の線形性から

$$
Ax_i-Ax_j=A(x_i-x_j)
$$

となるので、前節の固定ベクトル補題を各組へ適用すればよいのです。

<a id="thm-hdp6-jl"></a>

<!-- formal-statement-start -->
> **定理（Gaussian型Johnson–Lindenstrauss補題）**  
> 整数 $d\ge1$、$N\ge2$、二乗距離の伸縮率の許容幅 $0<\varepsilon<1$、失敗確率 $0<\delta<1$ を固定する。$x_1,\ldots,x_N\in\mathbb R^d$ は任意の**決定論的**な点とする。整数 $m\ge1$ が

$$
m\ge\frac8{\varepsilon^2}
\log\frac{N(N-1)}{\delta}
$$

> を満たすとする。成分が独立に $N(0,1/m)$ に従う $A\in\mathbb R^{m\times d}$ を一度生成すると、確率少なくとも $1-\delta$ で、すべての $1\le i<j\le N$ について同時に

$$
(1-\varepsilon)\|x_i-x_j\|_2^2
\le\|Ax_i-Ax_j\|_2^2
\le(1+\varepsilon)\|x_i-x_j\|_2^2
$$

> が成立する。特にこのような決定論的な線形写像 $A$ が少なくとも一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

固定した組 $(i,j)$ については[長さ保存補題](#lem-hdp6-gaussian-fixed-vector)が使えます。組は $\binom N2$ 個しかないため、和事象の確率は各事象の確率の和以下であり、点対ごとの事象には独立性を仮定しません。

<!-- proof-start -->
### 証明

各 $i<j$ に対して $u_{ij}=x_i-x_j$ と置き、失敗事象を

$$
E_{ij}=\left\{
\bigl|\|Au_{ij}\|_2^2-\|u_{ij}\|_2^2\bigr|
\ge\varepsilon\|u_{ij}\|_2^2
\right\}
$$

とします。$u_{ij}\ne0$ なら[Gaussian射影の固定ベクトル長さ保存](#lem-hdp6-gaussian-fixed-vector)から $P(E_{ij})\le2e^{-m\varepsilon^2/8}$ です。$u_{ij}=0$ なら二乗長さは常に $0$ なので、この組は失敗しません。零ベクトルの組に上の「$\ge$」で定義した $E_{ij}$ をそのまま使うと恒真事象になるため、失敗事象の定義は $u_{ij}\ne0$ の組に限定し、零ベクトルの組では $E_{ij}=\varnothing$ と定めます。

すべての組について成功する確率は、和事象の上界から

$$
\begin{aligned}
P\left(\bigcup_{i<j}E_{ij}\right)
&\le\sum_{i<j}P(E_{ij})\\
&\le\binom N2\,2e^{-m\varepsilon^2/8}\\
&=N(N-1)e^{-m\varepsilon^2/8}.
\end{aligned}
$$

$m\ge(8/\varepsilon^2)\log(N(N-1)/\delta)$ なら指数の単調性により

$$
e^{-m\varepsilon^2/8}
\le\frac{\delta}{N(N-1)}.
$$

従って失敗確率は $\delta$ 以下です。成功事象上ではすべての差の二乗長さが指定された二乗距離の伸縮範囲にあり、$Au_{ij}=Ax_i-Ax_j$ を使って定理の形に戻せます。$1-\delta>0$ なので成功する実現が少なくとも一つ存在し、存在主張も成立します。
<!-- proof-end -->

**距離そのものとの関係。** 上の定理は距離の**二乗**を伸縮率の許容幅 $\varepsilon$ で保ちます。平方根を取れば

$$
\sqrt{1-\varepsilon}\,\|x_i-x_j\|_2
\le\|Ax_i-Ax_j\|_2
\le\sqrt{1+\varepsilon}\,\|x_i-x_j\|_2.
$$

さらに $0<\varepsilon<1$ で $1-\varepsilon\le\sqrt{1-\varepsilon}$、$\sqrt{1+\varepsilon}\le1+\varepsilon$ なので、距離自体も $(1\pm\varepsilon)$ の範囲に入ります。ただし平方根を取るだけで等号の係数が厳密に $1\pm\varepsilon$ になるわけではありません。

**次元の意味。** 十分な出力次元は $\varepsilon^{-2}(\log N+\log(1/\delta))$ のオーダーで、入力次元 $d$ に現れません。$d$ が大きく、$N$ が相対的に少ない場合には $m<d$ の射影を得られます。他方この十分条件が $m\ge d$ になる例もあり、必ず次元を減らせると主張しているわけではありません。$N=1$ の集合には比較する点の組がなく、任意の線形写像で距離条件が空虚に成り立ちます。

## 5. 二つの有限化を混同しない

球面のnetは、**すべての方向**を近似したいときに作ります。半径 $\eta$ のnetで候補数は高々 $(1+2/\eta)^d$ です。したがって全方向の条件を一斉に保証するために各net点での失敗確率を足すと、その対数には少なくとも $d$ に比例する項が入ります。対してJohnson–Lindenstrauss補題では、入力の全方向は調べません。初めから指定された点集合の差だけを検査するので候補数が $\binom N2$ で済むのです。

例えば $d=10000$、$N=100$、$\varepsilon=1/2$、$\delta=0.1$ を代入すると、定理の十分条件は

$$
m\ge32\log(99000)
$$

です。右辺は約 $368.2$ なので整数 $m=369$ を選べば保証されます。実際の成功にはこれより小さい $m$ でも十分なことがありますが、本章の証明からはその値を保証できません。この例では $m<d$ となり次元を圧縮できます。

**固定性の注意。** $x_i$ が $A$ と無関係に先に決まっていることが必要です。$m<d$ で $A$ の結果を見てから核の非零ベクトル $v$ を選び、点集合 $\{0,v\}$ を作ると $\|Av-A0\|_2=0$ となります。非零の元の距離は保持されません。適用順序を入れ替えると保証が破れる理由はここにあります。

## 6. 演習：被覆・行列評価・ランダム射影

**Level A：定義と係数を確かめる**

### A1. 一次元球面の被覆数

$S^0=\{-1,1\}$ について $0<\eta<2$ と $\eta\ge2$ の被覆数をそれぞれ求め、必要な代表点を示せ。

- Level: A
- ID: HDP6-A1

<!-- solution-start -->
**詳細解答**　二点の距離は $|-1-1|=2$ です。$0<\eta<2$ では一方だけではもう一方を覆えませんが、両方を選べば各点から距離 $0$ なので $N(S^0,\eta)=2$ です。$\eta\ge2$ なら $\mathcal N=\{1\}$ とすれば、$x=1$ では距離 $0$、$x=-1$ では距離 $2\le\eta$ なので最小値は $1$ です。[球面の被覆数](#def-hdp6-covering-number)が最も少ない代表点数であることも確認できました。
<!-- solution-end -->

### A2. 二次元円周の等間隔net

$q=12$ として本文の $v_j$ を用いる。$\eta=\pi/12$ のnetであることを示し、一般の $q$ に対して必要な最小の整数 $q$ の十分条件を $\eta$ で表せ。

- Level: A
- ID: HDP6-A2

<!-- solution-start -->
**詳細解答**　円周上では隣り合う候補の角差は $2\pi/q$ です。任意の角度から最も近い候補への角差は高々 $\pi/q$ なので、二つの単位ベクトルの座標差を二乗して足し、半角の公式を使うと

$$
\|x-v_j\|_2
=2|\sin(\Delta\theta/2)|\le|\Delta\theta|\le\pi/q.
$$

$q=12$ では $\pi/q=\pi/12$ なので所定のnetです。一般の $q$ で $\pi/q\le\eta$ を保証するには $q\ge\lceil\pi/\eta\rceil$ とすればよく、$q\ge2$ という構成条件と合わせて $q\ge\max(2,\lceil\pi/\eta\rceil)$ で十分です。これは等間隔点による十分条件であり、一般の最小被覆数との等号を主張していません。
<!-- solution-end -->

### A3. 作用素ノルムの有限検査

$T\in\mathbb R^{5\times3}$、$\mathcal N$ は $S^2$ の $1/4$-netとし、各 $v\in\mathcal N$ に対し $\|Tv\|_2\le6$ とする。$\|T\|_{\mathrm{op}}$ の保証上界を求めよ。

- Level: A
- ID: HDP6-A3

<!-- solution-start -->
**詳細解答**　[作用素ノルムのnet評価](#lem-hdp6-operator-net)に $\eta=1/4$、$\max_{v\in\mathcal N}\|Tv\|_2\le6$ を代入すると

$$
\|T\|_{\mathrm{op}}
\le\frac6{1-1/4}
=\frac6{3/4}=8.
$$

$0<1/4<1$ なので補題の除算条件も満たします。最大値がちょうど $6$ と分かっていなくても、この上界は成立します。
<!-- solution-end -->

### A4. 二次形式のnet定数

$B\in\mathbb R^{4\times4}$ は実対称とし、$1/5$-net上で $|v^{\mathsf T}Bv|\le3$ とする。$\|B\|_{\mathrm{op}}$ を上から抑え、一般行列の評価と分母が異なる理由を説明せよ。

- Level: A
- ID: HDP6-A4

<!-- solution-start -->
**詳細解答**　[二次形式のnet補題](#lem-hdp6-quadratic-net)は $\eta<1/2$ を要求します。$\eta=1/5$ はこれを満たすので

$$
\|B\|_{\mathrm{op}}
\le\frac3{1-2/5}
=\frac3{3/5}=5.
$$

$|x^{\mathsf T}Bx-v^{\mathsf T}Bv|$ を $(x-v)^{\mathsf T}Bx+v^{\mathsf T}B(x-v)$ に分解すると、両項それぞれが高々 $\eta\|B\|_{\mathrm{op}}$ です。そのため総誤差は $2\eta\|B\|_{\mathrm{op}}$ となり、分母は $1-2\eta$ です。
<!-- solution-end -->

### A5. 点対の数と必要な射影次元

$N=10$、$\varepsilon=1/2$、$\delta=0.05$ とする。検査する非順序の点対の数と、[Johnson–Lindenstrauss補題](#thm-hdp6-jl)が保証する最小整数 $m$ を式で示せ。

- Level: A
- ID: HDP6-A5

<!-- solution-start -->
**詳細解答**　非順序の点対は

$$
\binom{10}{2}=\frac{10\cdot9}{2}=45
$$

個です。各点対の失敗確率の上界は $2e^{-m\varepsilon^2/8}$ なので、全失敗確率は $90e^{-m/32}$ 以下です。これを $0.05$ 以下にするには

$$
e^{-m/32}\le\frac{0.05}{90}
=\frac1{1800},
\qquad m\ge32\log1800.
$$

したがって $m=\lceil32\log1800\rceil$ がこの十分条件を満たす最小整数です。確率事象の独立性を仮定していません。
<!-- solution-end -->

**Level B：証明の核心を再構成する**

### B1. 体積法の逆算

$0<\eta<1$、$d\ge1$ とする。球面上で距離が互いに $\eta$ より大きい $k$ 点があれば $k\le(1+2/\eta)^d$ を、開球の包含・非交差・体積比較の順に示せ。

- Level: B
- ID: HDP6-B1

<!-- solution-start -->
**詳細解答**　各点を $v_i$ とし半径 $\eta/2$ の開球 $B(v_i,\eta/2)$ を取ります。もし二つが交われば共通点 $y$ を介して三角不等式で $\|v_i-v_j\|_2<\eta/2+\eta/2=\eta$ となり、仮定に反します。$y$ が任意の小球に入れば $\|y\|_2<\eta/2+\|v_i\|_2=1+\eta/2$ なので、それらは半径 $1+\eta/2$ の原点中心球に収まります。

単位球の体積を $V_d>0$ とすると、半径 $r$ の球の体積は線形拡大 $y=rz$ のJacobian $r^d$ から $r^dV_d$ です。非交差の小球の体積は足せるため

$$
k(\eta/2)^dV_d\le(1+\eta/2)^dV_d.
$$

両辺を $(\eta/2)^dV_d>0$ で割れば

$$
k\le\left(\frac{1+\eta/2}{\eta/2}\right)^d
=(1+2/\eta)^d.
$$

これは任意の分離集合に対する上界であり、代表点を追加していく構成の停止も保証します。
<!-- solution-end -->

### B2. 正規二乗和の片側指数界

$G_i$ は独立な $N(0,1)$、$S=\sum_{i=1}^mG_i^2$、$0<u<1$ とする。$P(S\ge m(1+u))$ の上界 $\exp[-m(u-\log(1+u))/2]$ を指数Markov法と最適化から導き、$u-\log(1+u)\ge u^2/4$ を微分で証明せよ。

- Level: B
- ID: HDP6-B2

<!-- solution-start -->
**詳細解答**　平方完成した正規密度の積分から $Ee^{sG_i^2}=(1-2s)^{-1/2}$（$0<s<1/2$）を得ます。独立性で指数モーメントが積となり、

$$
P(S\ge m(1+u))
\le\exp\left[-sm(1+u)-\frac m2\log(1-2s)\right].
$$

指数部の導関数を $s$ で取ると $-m(1+u)+m/(1-2s)$ です。これを零にする $s=u/(2(1+u))$ は $(0,1/2)$ にあり、代入すると

$$
-sm(1+u)=-mu/2,\qquad
-\frac m2\log(1-2s)=\frac m2\log(1+u).
$$

従って目的の指数界を得ます。さらに $h(u)=u-\log(1+u)-u^2/4$ の微分は $h'(u)=u(1-u)/(2(1+u))\ge0$、$h(0)=0$ なので $h(u)\ge0$ です。これを指数に代入すると $P(S\ge m(1+u))\le e^{-mu^2/8}$ になります。
<!-- solution-end -->

### B3. 核を使った適用範囲の反例

$m<d$ とする。任意の線形写像 $A:\mathbb R^d\to\mathbb R^m$ がすべてのベクトルについて $(1-\varepsilon)\|x\|_2^2\le\|Ax\|_2^2$（$0<\varepsilon<1$）を満たすことはないと示せ。また、固定した有限点集合についてのJL補題とは矛盾しない理由を説明せよ。

- Level: B
- ID: HDP6-B3

<!-- solution-start -->
**詳細解答**　行列の階数は $\operatorname{rank}A\le m<d$ です。[階数・退化次数の関係](../../../基礎科目/F0/F0-00F2/index.md#prop-f0-00f2-rank-singular-values)と階数・零化度の関係から、$\ker A$ には $x\ne0$ が存在します。その $x$ について

$$
\|Ax\|_2^2=0,\qquad
(1-\varepsilon)\|x\|_2^2>0
$$

なので不等式は破れます。一方[JL補題](#thm-hdp6-jl)では、$A$ を生成する前に有限個の点を固定し、差ベクトルだけの失敗確率を同時に抑えます。$A$ を見てからその核に合わせて点を選んだ場合は定理の「固定した点」という仮定を失います。
<!-- solution-end -->

### B4. 行列の二次形式をnetで調べる

$B=\operatorname{diag}(4,-2)$ とする。(1) $\|B\|_{\mathrm{op}}$ と $\sup_{\|x\|_2=1}|x^{\mathsf T}Bx|$ を直接計算せよ。(2) $1/4$-net上の最大二次形式が $M$ と分かったときの一般的な上界を示せ。

- Level: B
- ID: HDP6-B4

<!-- solution-start -->
**詳細解答**　単位ベクトル $x=(x_1,x_2)$ は $x_1^2+x_2^2=1$ で、二次形式は

$$
x^{\mathsf T}Bx=4x_1^2-2x_2^2
=6x_1^2-2.
$$

$x_1^2\in[0,1]$ なので値は $[-2,4]$ を動き、絶対値の上限は $4$ で $x=(1,0)$ で達成します。一方 $\|Bx\|_2^2=16x_1^2+4x_2^2\le16(x_1^2+x_2^2)=16$ で、同じ $x$ で等号なので $\|B\|_{\mathrm{op}}=4$ です。

$\eta=1/4$ では $1-2\eta=1/2>0$ です。[対称行列の二次形式net評価](#lem-hdp6-quadratic-net)を適用すると

$$
\|B\|_{\mathrm{op}}
\le\frac{M}{1-2(1/4)}=2M.
$$

この式は $M$ に関する一般保証であり、任意のnet上で $M=4$ とは限りません。
<!-- solution-end -->

**Level C：複数概念を接続する**

### C1. 有限集合の距離保存を一から導く

$N\ge2$、$0<\varepsilon,\delta<1$、固定点 $x_1,\ldots,x_N\in\mathbb R^d$ とする。独立 $N(0,1/m)$ 成分を持つ $m\times d$ 行列 $A$ に対し、(1) 任意の非零の固定した差ベクトルについて長さの二乗の伸縮率超過確率を導き、(2) 点集合全体での失敗確率を評価し、(3) 必要な $m$ の十分条件を解け。点に重複がある場合も扱え。

- Level: C
- ID: HDP6-C1

<!-- solution-start -->
**詳細解答**　非零の固定差 $u=x_i-x_j$ を取ると、$Au$ の各成分は独立な $N(0,\|u\|_2^2/m)$ です。従って $\|Au\|_2^2/\|u\|_2^2$ は独立標準正規二乗和 $S/m$ と同分布です。$Ee^{sS}=(1-2s)^{-m/2}$（$s<1/2$）を用い、[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)で上側 $s=\varepsilon/(2(1+\varepsilon))$、下側に $-s$ を用いて $s=\varepsilon/(2(1-\varepsilon))$ と最適化すれば

$$
P\left(\left|\|Au\|_2^2-\|u\|_2^2\right|
\ge\varepsilon\|u\|_2^2\right)
\le 2e^{-m\varepsilon^2/8}
$$

を得ます。ここで上側には $\varepsilon-\log(1+\varepsilon)\ge\varepsilon^2/4$、下側には $-\varepsilon-\log(1-\varepsilon)\ge\varepsilon^2/2$ を用いました（いずれも本文の微分計算で確認できます）。

重複点の組では $u=0$、$Au=0$ なので距離は常に一致し、失敗事象を空集合とします。非重複の組についてのみ失敗確率を加算し、組数は最大 $\binom N2$ なので

$$
P(\text{いずれかの距離保存が失敗})
\le 2\binom N2e^{-m\varepsilon^2/8}
=N(N-1)e^{-m\varepsilon^2/8}.
$$

これが $\delta$ 以下となるには、対数を取って

$$
-\frac{m\varepsilon^2}{8}
\le\log\delta-\log(N(N-1)),
\qquad
m\ge\frac8{\varepsilon^2}\log\frac{N(N-1)}{\delta}
$$

で十分です。成功事象では全組の二乗距離が同時に $1\pm\varepsilon$ 倍に入り、$A(x_i-x_j)=Ax_i-Ax_j$ を使えば定理の結論になります。各組の成功事象が互いに独立である必要はありません。
<!-- solution-end -->

### C2. netと射影の両方を使う場合の限界

$0<\eta<1$、$d\ge2$ とする。$S^{d-1}$ の $\eta$-net $\mathcal N$ を体積法で選び、各 $v\in\mathcal N$ に対し固定ベクトルのGaussian射影長さ保存評価を用いる。(1) 全net点の二乗長さが伸縮率の許容幅 $\varepsilon$ 以内に入る失敗確率の上界を求めよ。(2) これを $\delta$ 以下にする $m$ の十分条件を求めよ。(3) この結果だけで全単位球面の長さが保存されるとは言えない理由を述べよ。

- Level: C
- ID: HDP6-C2

<!-- solution-start -->
**詳細解答**　まず[球面の体積法による被覆](#lem-hdp6-volumetric-net)から $|\mathcal N|\le(1+2/\eta)^d$ となるnetが存在します。各 $v$ は $\|v\|_2=1$ の決定論的なベクトルなので、[固定ベクトルのGaussian射影評価](#lem-hdp6-gaussian-fixed-vector)により、各方向の失敗確率は $2e^{-m\varepsilon^2/8}$ 以下です。和事象の上界から

$$
P(\exists v\in\mathcal N:
|\|Av\|_2^2-1|\ge\varepsilon)
\le2(1+2/\eta)^d e^{-m\varepsilon^2/8}.
$$

この右辺を $\delta$ 以下にするには

$$
-\frac{m\varepsilon^2}{8}
\le\log\frac\delta2-d\log(1+2/\eta)
$$

すなわち

$$
m\ge\frac8{\varepsilon^2}
\left[d\log(1+2/\eta)+\log(2/\delta)\right]
$$

で十分です。ここでは点数の対数が $d$ に比例します。

最後に、有限net上の評価から全方向へ進むには、各 $x$ とその近傍 $v$ の差 $x-v$ の像も抑える必要があります。[作用素ノルム近似](#lem-hdp6-operator-net)などの追加の議論が必要です。しかも $m<d$ では非零の核ベクトルが存在するため全方向について正の長さ下限を保つのは不可能です。従ってnet上の結果をそのまま全球面での等長性だと読み替えてはいけません。
<!-- solution-end -->

## 7. この章で得た道具

有限 $\eta$-netの存在・被覆数・作用素ノルム近似によって、無限の方向を有限の候補へ帰着できました。またGaussian射影では、固定ベクトルに対する正規二乗和の集中を証明し、差ベクトルの有限組への和事象評価によってJohnson–Lindenstrauss補題を得ました。次の共分散評価では、すべての方向での二次形式を扱うために、再びnetとその指数的な個数が重要になります。
