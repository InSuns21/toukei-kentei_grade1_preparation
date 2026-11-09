# GMT9 Lipschitz写像とRademacher定理

<!-- definition-example-audit: strict -->

これまでの[Hausdorff測度に関するLipschitz像の評価](../../MT/MT8/index.md#thm-mt8-lipschitz)では、距離を最大 $L$ 倍にしか伸ばさない写像は、集合の測度・次元を制御することを学びました。しかしその評価だけでは、曲線や曲面を小さく拡大したとき、写像がどんな線形変換に見えるのかは分かりません。次のGMT10でJacobianを測るには、各点での線形近似が必要です。

Lipschitz写像は折り目を持てるので、**すべての点**で滑らかとは限りません。それでも **Lebesgue測度に関してほとんど至る所（a.e.）で全微分可能**です。これがRademacherの定理です。証明では、[1変数の絶対連続関数の基本定理](../../MT/MT4/index.md#thm-mt4-ac-ftc)を直線に適用し、[高次元Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)で座標導関数の平均を制御します。偏微分が存在する点と全微分可能な点は区別して進みます。

以下、$\Omega\subset\mathbb R^n$ は非空開集合、$n,m\ge1$、$f:\Omega\to\mathbb R^m$ とします。$|\cdot|$ はEuclidノルム、$\mathcal L^n$ は $n$ 次元Lebesgue測度、$B_r=B(0,r)$ とし、$\operatorname{avg}_{B}g=|B|^{-1}\int_B g$ は球平均を表します。

## 1. 距離の評価と線形近似は違う

$f$ が $L$-Lipschitzであるとは、すべての $x,y\in\Omega$ に対して $|f(x)-f(y)|\le L|x-y|$ を満たすことです。$L\ge0$ は一つの共通上界です。$\Omega$ が開集合なので、点 $x$ の周囲の十分小さな球の線分は $\Omega$ に収まります。

一方、[Fréchet微分の定義](../../F0/F0-02C3/index.md#def-f0-02c3-frechet-derivative)は、ある線形写像 $A:\mathbb R^n\to\mathbb R^m$ によって

$$
f(x+h)=f(x)+Ah+o(|h|)\qquad(h\to0)
$$

と近似できることです。このとき $Df(x)=A$ と書き、標準基底 $e_1,\ldots,e_n$ で列 $Ae_j$ を並べた $m\times n$ 行列を用います。作用素ノルムは $\|A\|_{\mathrm{op}}=\sup_{|v|=1}|Av|$ です。

例えば $f(t)=|t|$ は $||t|-|s||\le|t-s|$ により1-Lipschitzですが、原点では右微分が1、左微分が$-1$であるため微分できません。**距離制御は折り目を禁止しません**。重要なのは折り目が占める集合の測度です。

## 2. 直線に制限した関数の微分

高次元の証明をいきなり全微分から始めず、まず一方向だけ動かします。$x=(x_1,\ldots,x_n)$ で第 $j$ 座標を動かした関数は、元のLipschitz定数を超えません。[絶対連続性の基本定理](../../MT/MT4/index.md#thm-mt4-ac-ftc)によって、この切片はa.e.に微分でき、導関数を積分すると値の差を回復できます。

<a id="lem-gmt9-coordinate-slices"></a>

<!-- formal-statement-start -->
> **補題（Lipschitz写像の座標切片と有界導関数）**  
> $\Omega\subset\mathbb R^n$ を開集合、$f:\Omega\to\mathbb R^m$ を $L$-Lipschitz写像とする。各 $j=1,\ldots,n$ に対して偏導関数 $\partial_jf(x)$ が $\mathcal L^n$-a.e.に存在し、$|\partial_jf(x)|\le L$ である。存在する点で $G_j(x)=\partial_jf(x)$、それ以外で $G_j(x)=0$ と定めると、$G_j$ は可測・局所有界であり、$\varphi\in C_c^1(\Omega)$ に対して成分ごとに

$$
\int_\Omega f(x)\,\partial_j\varphi(x)\,dx
=-\int_\Omega G_j(x)\varphi(x)\,dx
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

座標を一つだけ動かすと、Lipschitz性から1変数の絶対連続性が得られます。固定した残りの座標で微分し、その後[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で全空間の零集合をまとめます。積分恒等式は、後で斜めの方向に進むための橋渡しです。

<!-- proof-start -->
### 証明

$j$ を固定して $x=z+te_j$ と書きます。ここで $z$ は $j$ 番目の成分が0の $(n-1)$ 次元の座標、$t\in\mathbb R$ です。$z$ を固定したとき、集合 $\{t:z+te_j\in\Omega\}$ は開区間の可算和です。その中の閉区間 $[a,b]$ では

$$
|f(z+te_j)-f(z+se_j)|\le L|t-s|
$$

なので、有限個の互いに交わらない小区間について変化量の和は $L$ 倍の長さの和以下です。従って切片は絶対連続であり、[1変数の絶対連続関数の基本定理](../../MT/MT4/index.md#thm-mt4-ac-ftc)から $t$ のa.e.で導関数が存在し、その大きさは $L$ 以下です（$m$ 個の成分に同時に適用します）。

偏微分の存在は、例えば有理数列 $q\to0$ に沿う差商 $\{f(x+qe_j)-f(x)\}/q$ の収束と同値です。これはLipschitz性により、有理差商の極限が存在すれば任意の実数の差商へも近似できるためです。よって存在集合は可測で、零に延長した $G_j$ も可測です。$z$ ごとの例外集合は1次元零測度なので、コンパクトな座標箱で[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を使って全空間の例外集合は $\mathcal L^n$-零と分かります。

$\varphi\in C_c^1(\Omega)$ に対して、各切片で1変数の部分積分を行います。$\varphi$ の台がコンパクトなので端点項は0となり、

$$
\int f(z+te_j)\,\partial_j\varphi(z+te_j)\,dt
=-\int G_j(z+te_j)\varphi(z+te_j)\,dt.
$$

両辺は台の近くで絶対可積分（$f$ は連続で有界、$G_j$ は $L$ 以下）です。もう一度[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で $z$ を積分して主張を得ます。$\square$
<!-- proof-end -->

ここで $G(x)$ は、**第 $j$ 列が $G_j(x)$ である $m\times n$ 行列**とします。定義した代表値により $G$ はすべての $x$ で定義でき、各列の長さが高々 $L$ です。$v=\sum_jv_je_j$ に対し

$$
|G(x)v|\le\sum_j|v_j|\,|G_j(x)|
\le L\sqrt n\,|v|
$$

なので $\|G(x)\|_{\mathrm{op}}\le\sqrt nL$ です。この段階ではまだ $G(x)=Df(x)$ と断定していません。

## 3. 固定した斜め方向にも積分公式がある

座標軸の公式だけでは $x$ から $x+h$ への斜めの移動を表せません。ただし、[座標切片の補題](#lem-gmt9-coordinate-slices)で得た積分恒等式を線形結合すれば、任意の**固定した方向** $v$ に沿う導関数を制御できます。方向に依存する例外集合があるため、「すべての方向で同時に」と読み替えないことが大切です。

<a id="lem-gmt9-directional-slices"></a>

<!-- formal-statement-start -->
> **補題（固定方向に沿う切片積分公式）**  
> $\Omega\subset\mathbb R^n$ を開集合、$f:\Omega\to\mathbb R^m$ を $L$-Lipschitz写像とする。$G_j$ をa.e.に存在する座標偏導関数の零延長、$G$ をそれらを列とする行列とする。固定した $v\in\mathbb R^n$ に対して、線分 $[x,x+v]\subset\Omega$ を満たす点 $x$ のうち $\mathcal L^n$-a.e.で

$$
f(x+v)-f(x)=\int_0^1G(x+tv)v\,dt
$$

> が成立する。さらに、$\{(x,h):[x,x+h]\subset\Omega\}$ 上でこの等式は $(x,h)$ の積測度に関してa.e.成立する。
<!-- formal-statement-end -->

### 証明の見取り図

直線座標に回転し、[座標切片の補題](#lem-gmt9-coordinate-slices)を使います。そこで得た $G_j$ の積分恒等式を線形結合し、その直線上の導関数が $G$ の方向成分と一致することを確かめます。そのうえで1変数の微積分学の基本定理を使います。最後の積測度a.e.の主張が、次節の球平均への入力になります。

<!-- proof-start -->
### 証明

$v=0$ なら両辺は0なので、$v\ne0$ とし $e=v/|v|$ と置きます。[座標切片の積分恒等式](#lem-gmt9-coordinate-slices)を係数 $e_j$ で足すと、$\partial_e\varphi=\sum_je_j\partial_j\varphi$ に対し

$$
\int_\Omega f\,\partial_e\varphi\,dx
=-\int_\Omega (Ge)\varphi\,dx
$$

です。直交基底の第1軸を $e$ に取り、$x=z+se$（$z\perp e$）と変数変換します。直交変換のJacobianの絶対値は1です。$f(z+se)$ は各直線上でLipschitz、従って絶対連続ですから、切片の通常の導関数 $d f(z+se)/ds$ がa.e.存在します。

直線上の部分積分をもう一度使うと、上の式の左辺は $-\int (d f(z+se)/ds)\varphi(z+se)\,dz\,ds$ でもあります。差を $H(z,s)=d f(z+se)/ds-G(z+se)e$ と置けば、任意の滑らかなコンパクト台関数 $\varphi$ に対して $\int H\varphi=0$ です。これから $H=0$ a.e.を確かめます。非負の滑らかな球内支持関数 $\eta$ で $\int\eta=1$ を取り、$\eta_\varepsilon(u)=\varepsilon^{-n}\eta(u/\varepsilon)$ とします。$H$ のLebesgue点 $p$ の十分小さい近傍では $\varphi(q)=\eta_\varepsilon(p-q)$ を選べるので $\int H(q)\eta_\varepsilon(p-q)dq=0$ です。一方、$\eta_\varepsilon\le C\varepsilon^{-n}$ と[高次元Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)から、この積分は $\varepsilon\downarrow0$ で $H(p)$ へ収束します。従って $H(p)=0$、すなわちa.e.で $H=0$ です。よって

$$
\frac d{ds}f(z+se)=G(z+se)e
\quad\text{for a.e. }(z,s).
$$

固定した $e$ に対する[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)により、a.e.の直線上でほとんどすべての $s$ にこの等式が成立します。そこでは絶対連続性から、$s$ と $s+|v|$ が同じ $\Omega$ 内の線分に属すれば

$$
\begin{aligned}
f(x+v)-f(x)
&=\int_s^{s+|v|}G(z+ue)e\,du\\
&=\int_0^1G(x+tv)v\,dt
\end{aligned}
$$

です。最後に各固定 $h$ について例外となる $x$ の測度は0です。両辺は $(x,h)$ の可測関数であり、線分包含条件も可測なので、局所有界な領域で $(x,h)$ の[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用し、可算個の領域へ拡張すれば積測度a.e.の主張が従います。$\square$
<!-- proof-end -->

## 4. 平均誤差から全方向の微分を取り戻す

微分の定義は $h\to0$ の**すべての方向**に関する極限です。しかしこれから得る評価は、最初は球内での誤差の**平均**にすぎません。ここでLipschitz性をもう一度使います。大きな誤差がどこか一か所にあれば、その近くにも大きな誤差が残るため、球平均が小さくなることと矛盾します。

<a id="lem-gmt9-mean-to-uniform"></a>

<!-- formal-statement-start -->
> **補題（平均一次誤差からFréchet微分へ）**  
> $\Omega\subset\mathbb R^n$ は開集合、$f:\Omega\to\mathbb R^m$ は $L$-Lipschitz、$x\in\Omega$、$A:\mathbb R^n\to\mathbb R^m$ は固定した線形写像とする。すべての十分小さい $r>0$ で $B(x,2r)\subset\Omega$ とし、

$$
\lim_{r\downarrow0}\frac1r\operatorname{avg}_{B_r}
|f(x+h)-f(x)-Ah|\,dh=0
$$

> なら、$f$ は $x$ でFréchet微分可能で $Df(x)=A$ である。
<!-- formal-statement-end -->

### 証明の見取り図

剰余 $R(h)=f(x+h)-f(x)-Ah$ 自身もLipschitzです。もし半径 $r$ 内に $\varepsilon r$ 以上の誤差があれば、半径が $r$ に比例する小球の上でも誤差が大きいはずです。これが平均の $o(r)$ に反します。

<!-- proof-start -->
### 証明

$R(h)=f(x+h)-f(x)-Ah$、$K=L+\|A\|_{\mathrm{op}}$ と置きます。三角不等式から $|R(h)-R(k)|\le K|h-k|$ です。$K=0$ なら $R(h)\equiv0$ で結論は直ちに成立します。

背理法で、ある $\varepsilon>0$ と $r_k\downarrow0$、$|h_k|\le r_k$ に対し $|R(h_k)|\ge\varepsilon r_k$ と仮定します。$\delta=\min\{1/2,\varepsilon/(4K)\}>0$ と置くと、$h\in B(h_k,\delta r_k)$ では

$$
|R(h)|\ge |R(h_k)|-K|h-h_k|
\ge\frac34\varepsilon r_k.
$$

この小球は $B_{2r_k}$ に含まれるため、球体積の比 $|B_{\delta r_k}|/|B_{2r_k}|=(\delta/2)^n$ を使えば

$$
\frac1{2r_k}\operatorname{avg}_{B_{2r_k}}|R(h)|\,dh
\ge\frac{3\varepsilon}{8}\left(\frac\delta2\right)^n>0.
$$

これは仮定の平均誤差が $o(r)$ になることと矛盾します。よって $\sup_{|h|\le r}|R(h)|/r\to0$、すなわち $R(h)=o(|h|)$ です。最後の同値を厳密に見るには、任意の $h\ne0$ に対し $r=|h|$ と置いて上限を適用します。$\square$
<!-- proof-end -->

## 5. Rademacher定理を証明する

ここまでで必要な道具が揃いました。$G$ を座標切片から作った導関数行列とし、ほとんどすべての点 $x$ で $G$ の各成分がLebesgue点になることを使います。その点では、$G$ と $G(x)$ の球平均の差が消えます。この情報を直線積分から関数値の一次近似へ移します。

<a id="thm-gmt9-rademacher"></a>

<!-- formal-statement-start -->
> **定理（Rademacherの微分可能性定理）**  
> $n,m\ge1$、$\Omega\subset\mathbb R^n$ を開集合とし、$f:\Omega\to\mathbb R^m$ を $L$-Lipschitz写像とする。このとき $\mathcal L^n$-零集合 $N\subset\Omega$ が存在し、すべての $x\in\Omega\setminus N$ に対して線形写像 $Df(x):\mathbb R^n\to\mathbb R^m$ が存在して

$$
\lim_{h\to0}\frac{|f(x+h)-f(x)-Df(x)h|}{|h|}=0
$$

> を満たす。ただし $h\ne0$ かつ $x+h\in\Omega$ とする。さらに $\|Df(x)\|_{\mathrm{op}}\le L$ である。局所Lipschitz写像もa.e.微分可能であり、各 $L_x$-Lipschitz近傍内の微分にはノルム上界 $L_x$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

1. 1変数絶対連続性から、各座標導関数 $G_j$ がa.e.存在し $|G_j|\le L$ と分かります。
2. その有限個の成分に[高次元Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)を適用し、ほとんどすべての $x$ で $G$ が球平均の意味で $G(x)$ に近いと分かります。
3. [固定方向の積分公式](#lem-gmt9-directional-slices)を $h$ で平均すると、関数値の一次剰余が $o(r)$ になります。
4. [平均から一様への補題](#lem-gmt9-mean-to-uniform)で全方向のFréchet微分を得ます。

<!-- proof-start -->
### 証明

**第1段階：候補行列とLebesgue点。** [座標切片の補題](#lem-gmt9-coordinate-slices)から、各 $G_j:\Omega\to\mathbb R^m$ は可測、$|G_j|\le L$ であり、$G$ は $m\times n$ の有界行列値関数です。[高次元Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)を各成分に適用します。$n m$ 個の零集合の和は零集合なので、ほとんどすべての $x$ について

$$
\lim_{\rho\downarrow0}\operatorname{avg}_{B_\rho}
\|G(x+z)-G(x)\|_{\mathrm{op}}\,dz=0
$$

です。実際、作用素ノルムは各成分の絶対値の和以下なので、成分ごとの平均収束から従います。以後、この性質を持ち、$G_j(x)$ が各偏微分に等しい $x$ を固定し、$A=G(x)$ と置きます。

**第2段階：関数値の平均剰余。** $0<2r<\operatorname{dist}(x,\mathbb R^n\setminus\Omega)$ とします（$\Omega=\mathbb R^n$ なら任意の小さい $r$）。[固定方向に沿う積分公式](#lem-gmt9-directional-slices)の積測度a.e.版を使うと、固定した上記のような $x$ のうち、さらに零集合を除いて、ほとんどすべての $h\in B_r$ に対し

$$
\begin{aligned}
R_x(h)&:=f(x+h)-f(x)-Ah\\
&=\int_0^1\{G(x+th)-A\}h\,dt.
\end{aligned}
$$

右辺の積分は $G$ の有界性により絶対可積分です。$|h|\le r$、三角不等式、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使い、$z=th$（Jacobian $t^n$、$t>0$）で変数変換すると

$$
\begin{aligned}
\frac1r\operatorname{avg}_{B_r}|R_x(h)|\,dh
&\le\int_0^1\operatorname{avg}_{B_r}
\|G(x+th)-A\|_{\mathrm{op}}\,dh\,dt\\
&=\int_0^1\operatorname{avg}_{B_{tr}}
\|G(x+z)-A\|_{\mathrm{op}}\,dz\,dt.
\end{aligned}
$$

ここで $t\in(0,1]$ を固定すれば、$r\downarrow0$ のとき $tr\downarrow0$ です。第1段階のLebesgue点の性質により内側の球平均は0へ収束します。しかも $\|G(y)\|_{\mathrm{op}}\le\sqrt nL$、$\|A\|_{\mathrm{op}}\le\sqrt nL$ なので内側は $2\sqrt nL$ 以下です。有限区間 $t\in(0,1)$ 上の優収束定理を適用し、

$$
\frac1r\operatorname{avg}_{B_r}|R_x(h)|\,dh\longrightarrow0
$$

を得ます。この議論を有理数半径などの可算な小球に局所化し、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)から生じる $x$ の零集合を一つにまとめれば、同じ $x$ で任意の十分小さい $r$ に成り立ちます（積分公式は $h$ のa.e.であり、$r$ に依存しない局所的な積測度の零集合を除いています）。

**第3段階：全方向の微分とノルム。** [平均一次誤差からFréchet微分へ](#lem-gmt9-mean-to-uniform)を $A=G(x)$ に適用すれば $Df(x)=G(x)$ です。任意の単位ベクトル $v$ について $x+tv\in\Omega$ となる小さい $t$ で

$$
\left|\frac{f(x+tv)-f(x)}t\right|\le L
$$

です。$t\to0$ で左辺は $|Df(x)v|$ に収束するため、$\|Df(x)\|_{\mathrm{op}}\le L$ が従います。

局所Lipschitz写像では、各点を定数 $L_k$ が使える開球で覆い、第二可算性により可算部分被覆を取ります。各球で上記の零集合を除けば、可算和は再び零集合なので同じ結論が成立します。$\square$
<!-- proof-end -->

<a id="cor-gmt9-derivative-bound"></a>

<!-- formal-statement-start -->
> **系（Lipschitz微分のノルム評価）**  
> $\Omega\subset\mathbb R^n$ を開集合、$f:\Omega\to\mathbb R^m$ を $L$-Lipschitz写像とする。$Df(x)$ が存在する任意の $x\in\Omega$ に対し、次の評価が成立する。

$$
\|Df(x)\|_{\mathrm{op}}\le L.
$$

> 特に、Rademacherの定理が与えるa.e.の点でこの評価が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

この不等式はa.e.の主張より強く、**微分が存在する各点**で成り立ちます。微分の定義を単位方向 $h=tv$ に制限して距離評価と比較します。

<!-- proof-start -->
### 証明

$|v|=1$ とし、$x+tv\in\Omega$ となる $t\ne0$ についてLipschitz条件から $|f(x+tv)-f(x)|/|t|\le L$ です。微分可能性より $\{f(x+tv)-f(x)\}/t\to Df(x)v$。ノルムの連続性から $|Df(x)v|\le L$ であり、全単位ベクトルの上限が作用素ノルムなので結論を得ます。$\square$
<!-- proof-end -->

**ここでいうa.e.は $\mathcal L^n$ に関してです。** 非微分可能集合はHausdorff次元が $n-1$ の面を含むこともあり、「空集合」や「Hausdorff次元が0」と言っているわけではありません。また、ほとんどすべての点で存在する微分の値が連続に変化するとも主張していません。

## 6. 折り目を実際に調べる

### 例1：Euclidノルム

$f(x)=|x|$（$x\in\mathbb R^n$、$n\ge2$）は[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)で1-Lipschitzです。$x\ne0$ において

$$
|x+h|-|x|=\frac{2x\cdot h+|h|^2}{|x+h|+|x|}
$$

なので、分母が $2|x|$ に収束することから

$$
Df(x)h=\frac{x\cdot h}{|x|},\qquad\|Df(x)\|_{\mathrm{op}}=1.
$$

分母の差と $|h|^2$ の項はそれぞれ $O(|h|)$ と $O(|h|^2)$ なので剰余は $o(|h|)$ です。原点では任意の単位 $v$ に対し $f(tv)=|t|$ となり、両側の差商が一致しません。非微分可能集合は $\{0\}$ で $\mathcal L^n$-零です。

### 例2：折り目が直線全体にある

$f(x,y)=\max\{x,y\}$ とします。最大値の差の絶対値は入力2成分の最大差以下なので、$f$ は1-Lipschitzです。$x>y$ では $f=x$ で $Df=(1,0)$、$x<y$ では $f=y$ で $Df=(0,1)$ です。$x=y$ では $(1,-1)$ 方向に $t$ と $-t$ で動くと、関数値は常に $x+|t|$ となり微分不能です。例外集合は対角線で、平面Lebesgue測度は0ですがHausdorff次元は1です。

### 例3：偏微分が二つとも存在しても足りない

$f(x,y)=\min\{|x|,|y|\}$ とします。最小値についても $|\min(a,b)-\min(c,d)|\le\max\{|a-c|,|b-d|\}$ が成り立つので、これは1-Lipschitzです。原点では $f(t,0)=f(0,t)=0$ だから $\partial_1f(0,0)=\partial_2f(0,0)=0$ です。もし全微分が存在すれば、標準基底上で0になる線形写像は零写像に限られます。しかし $h=(t,t)$ では

$$
\frac{|f(h)-f(0)-0h|}{|h|}
=\frac{|t|}{\sqrt2|t|}=\frac1{\sqrt2}
$$

で0へ収束しません。**偏微分の存在を全微分の存在へ飛躍させない**ために、Rademacherの証明では球平均とLipschitz性を結びました。

## 7. 演習（全問詳細解答付き）

### Level A：基本的な微分と折り目

<a id="ex-gmt9-a1"></a>

**A1. 線形写像の最良Lipschitz定数**

- Level: A
- 問題: $T:\mathbb R^2\to\mathbb R^2$ を $T(x,y)=(2x,y/2)$ とする。Euclidノルムでの最小のLipschitz定数を求め、任意の点でのFréchet微分とその作用素ノルムを求めよ。

<!-- solution-start -->
**詳細解答**

$h=(h_1,h_2)$ に対して

$$
|Th|^2=4h_1^2+\frac14h_2^2\le4(h_1^2+h_2^2)=4|h|^2.
$$

よって $|T(x)-T(y)|\le2|x-y|$ です。$h=(1,0)$ では $|Th|/|h|=2$ なのでこれより小さい定数は使えません。線形性により $T(x+h)-T(x)-Th=0$、従って全点で $DT(x)=T$、$\|DT(x)\|_{\mathrm{op}}=2$ です。
<!-- solution-end -->

<a id="ex-gmt9-a2"></a>

**A2. 1変数の折り目**

- Level: A
- 問題: $f:\mathbb R\to\mathbb R$、$f(t)=|t-3|$ についてLipschitz定数、微分可能な点とその微分、不可能な点をすべて求めよ。

<!-- solution-start -->
**詳細解答**

[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から $||t-3|-|s-3||\le|t-s|$ なので1-Lipschitzです。$t>3$ では $f(t)=t-3$ で微分1、$t<3$ では $f(t)=3-t$ で微分$-1$。$t=3$ の右差商は1、左差商は$-1$だから微分不能です。例外集合 $\{3\}$ は1次元Lebesgue零集合です。
<!-- solution-end -->

<a id="ex-gmt9-a3"></a>

**A3. 最大値写像の微分行列**

- Level: A
- 問題: $f(x,y)=\max\{x,y\}$ が1-Lipschitzであることを示し、領域 $x>y$ と $x<y$ の微分を求めよ。$x=y$ でなぜ微分不能かも説明せよ。

<!-- solution-start -->
**詳細解答**

任意の $(a,b),(c,d)$ について $\max(a,b)\le\max(c,d)+\max(|a-c|,|b-d|)$ であり、二組を交換しても同じ上界が得られます。従って

$$
|\max(a,b)-\max(c,d)|\le\max(|a-c|,|b-d|)
\le\sqrt{(a-c)^2+(b-d)^2}.
$$

$x>y$ の点では近傍で $f=x$、従って $Df=(1,0)$、$x<y$ では $Df=(0,1)$。$x=y=s$ では $f(s+t,s-t)=s+|t|$ となるので、方向 $(1,-1)$ の両側微分が異なり全微分できません。
<!-- solution-end -->

<a id="ex-gmt9-a4"></a>

**A4. Euclid距離関数の導関数とノルム**

- Level: A
- 問題: $f:\mathbb R^2\to\mathbb R$、$f(x,y)=\sqrt{x^2+y^2}$ について、原点以外の $Df$ と作用素ノルムを計算し、原点での非微分可能性を示せ。

<!-- solution-start -->
**詳細解答**

$r=\sqrt{x^2+y^2}>0$ の点で分母の有理化をすると

$$
f((x,y)+h)-f(x,y)
=\frac{2(x,y)\cdot h+|h|^2}{|(x,y)+h|+r}.
$$

右辺の一次項は $(x,y)\cdot h/r$ です。差の剰余は、分母が $2r+O(|h|)$ であることから $O(|h|^2/r)$ なので、$Df=(x/r,y/r)$。Cauchy--Schwarzより $|Df\,h|\le|h|$、$h=(x/r,y/r)$ で等号となるので作用素ノルムは1です。原点で $h=te_1$ と置くと差商 $|t|/t$ は $t>0$ と $t<0$ で符号が異なり、微分不能です。
<!-- solution-end -->

<a id="ex-gmt9-a5"></a>

**A5. 偏微分と全微分の違い**

- Level: A
- 問題: $f(x,y)=\min\{|x|,|y|\}$ が1-Lipschitzであることを示し、原点で両偏微分が存在するにもかかわらず全微分が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**

$\min(a,b)=-\max(-a,-b)$ を使い、[演習A3](#ex-gmt9-a3)で直接確かめた最大値の差の評価に $a=-|x|$、$b=-|y|$、$c=-|u|$、$d=-|v|$ を代入すると

$$
|f(x,y)-f(u,v)|\le\max\{||x|-|u||,||y|-|v||\}
\le\sqrt{(x-u)^2+(y-v)^2}.
$$

$f(t,0)=f(0,t)=0$ なので原点での二偏微分は0です。全微分候補 $A$ が存在すれば $Ae_1=Ae_2=0$、従って $A=0$ です。しかし $h=(t,t)$、$t\ne0$ では $|f(h)-f(0)-Ah|/|h|=1/\sqrt2$。これが0に収束しないので全微分不能です。
<!-- solution-end -->

### Level B：証明の中間機構を自力で使う

<a id="ex-gmt9-b1"></a>

**B1. 切片積分公式を折り目のある写像で検算する**

- Level: B
- 問題: $f(x,y)=|x|+2y$ とし、$G(x,y)=(\operatorname{sgn}x,2)$（$x\ne0$）を導関数候補とする。$a=(a_1,a_2)$、$h=(h_1,h_2)$ に対し、$[a_1,a_1+h_1]$ が0を横切る場合も含め、$f(a+h)-f(a)=\int_0^1G(a+th)h\,dt$ を検証せよ。ただし $\operatorname{sgn}0$ の値は任意に固定してよい。

<!-- solution-start -->
**詳細解答**

$f$ は $\big||x|-|u|\big|+2|y-v|\le\sqrt5\sqrt{(x-u)^2+(y-v)^2}$ によりLipschitzです。$h_1=0$ なら $G(a+th)h=2h_2$ a.e.で、両辺は $2h_2$ です。$h_1\ne0$ なら $t\mapsto|a_1+th_1|$ は絶対連続で、0になる点は高々一つ、その他の点での導関数は $\operatorname{sgn}(a_1+th_1)h_1$ です。[1変数の絶対連続関数の基本定理](../../MT/MT4/index.md#thm-mt4-ac-ftc)より

$$
|a_1+h_1|-|a_1|=\int_0^1\operatorname{sgn}(a_1+th_1)h_1\,dt.
$$

両辺に $2h_2$ を加えれば求める式です。零点での $\operatorname{sgn}0$ の指定は積分値を変えません。
<!-- solution-end -->

<a id="ex-gmt9-b2"></a>

**B2. 球平均の変数変換と優収束**

- Level: B
- 問題: $G:\mathbb R^n\to\mathbb R^{m\times n}$ を有界可測行列値関数とし、点 $x$ で $\operatorname{avg}_{B_\rho}\|G(x+z)-G(x)\|_{\mathrm{op}}dz\to0$ が $\rho\downarrow0$ で成立するとする。$I(r)=\int_0^1\operatorname{avg}_{B_r}\|G(x+th)-G(x)\|_{\mathrm{op}}dh\,dt$ と置く。$z=th$ のJacobianを追って $I(r)\to0$ を証明せよ。

<!-- solution-start -->
**詳細解答**

$t>0$ を固定すると $dh=t^{-n}dz$、$h\in B_r$ は $z\in B_{tr}$ に写ります。$|B_{tr}|=t^n|B_r|$ より

$$
\begin{aligned}
\operatorname{avg}_{B_r}\|G(x+th)-G(x)\|_{\mathrm{op}}dh
&=\frac{t^{-n}}{|B_r|}\int_{B_{tr}}\|G(x+z)-G(x)\|_{\mathrm{op}}dz\\
&=\operatorname{avg}_{B_{tr}}\|G(x+z)-G(x)\|_{\mathrm{op}}dz.
\end{aligned}
$$

各 $t\in(0,1]$ で $tr\to0$ なので、仮定から右辺は0へ収束します。$\|G(y)\|_{\mathrm{op}}\le M$ とすれば積分内は $2M$ 以下です。$t=0$ は積分に影響しないため、$[0,1]$ 上の優収束定理で $I(r)\to0$ です。固定 $t$ での球平均収束を「$t$ について一様」と仮定する必要はありません。
<!-- solution-end -->

<a id="ex-gmt9-b3"></a>

**B3. 平均が小さいだけでなく一様に小さい理由**

- Level: B
- 問題: $R:B(0,\rho_0)\to\mathbb R^m$ は $K$-Lipschitzで $R(0)=0$ とする。$r\downarrow0$ で $r^{-1}\operatorname{avg}_{B_r}|R(h)|dh\to0$ なら、$\sup_{0<|h|\le r}|R(h)|/r\to0$ を示せ。$K=0$ の場合と $K>0$ の場合を分けよ。

<!-- solution-start -->
**詳細解答**

$K=0$ なら $R$ は定数で $R(0)=0$ なので主張は成立します。$K>0$ の場合、結論が偽なら $\varepsilon>0$、$r_k\downarrow0$、$|h_k|\le r_k$、$|R(h_k)|\ge\varepsilon r_k$ を取れます。$\delta=\min(1/2,\varepsilon/(4K))$ とすると $B(h_k,\delta r_k)\subset B_{2r_k}$ で、そこでは

$$
|R(h)|\ge\varepsilon r_k-K\delta r_k\ge\frac34\varepsilon r_k.
$$

体積比を使うと $(2r_k)^{-1}\operatorname{avg}_{B_{2r_k}}|R(h)|dh\ge(3\varepsilon/8)(\delta/2)^n$ です。右辺は $k$ に依存しない正定数で、仮定を半径 $2r_k$ に適用した極限0に矛盾します。したがって一様誤差も0へ収束します。
<!-- solution-end -->

<a id="ex-gmt9-b4"></a>

**B4. ベクトル値の折り目の微分行列**

- Level: B
- 問題: $F:\mathbb R^2\to\mathbb R^2$ を $F(x,y)=(|x|,\max\{x,y\})$ とする。(i) $F$ が $\sqrt2$-Lipschitzであること、(ii) $x\ne0$ かつ $x\ne y$ での $DF$ の行列、(iii) 非微分可能集合が $\{x=0\}\cup\{x=y\}$ であること、(iv) $\|DF\|_{\mathrm{op}}\le\sqrt2$ を確かめよ。

<!-- solution-start -->
**詳細解答**

絶対値関数と最大値関数はそれぞれ1-Lipschitzなので、$p,q\in\mathbb R^2$ について

$$
|F(p)-F(q)|^2
=\big||p_1|-|q_1|\big|^2
+|\max(p_1,p_2)-\max(q_1,q_2)|^2
\le2|p-q|^2.
$$

$x\ne0$ で第1成分の微分は $(\operatorname{sgn}x,0)$。$x>y$ では第2成分の微分は $(1,0)$、$x<y$ では $(0,1)$ なので

$$
DF(x,y)=
\begin{cases}
\begin{pmatrix}\operatorname{sgn}x&0\\1&0\end{pmatrix}&(x>y,\ x\ne0),\\
\begin{pmatrix}\operatorname{sgn}x&0\\0&1\end{pmatrix}&(x<y,\ x\ne0).
\end{cases}
$$

$x=0$ では第1成分 $|x|$ の左右差商が食い違い、$x=y$ では第2成分 $\max(x,y)$ の方向 $(1,-1)$ に折り目があるので、どちらもベクトル値写像として微分不能です。どちらでもない点では表示が局所的に線形なので、これで集合を尽くします。前者の行列は作用素ノルム $\sqrt2$、後者は1で、(iv)を確かめます。これらの直線の平面Lebesgue測度は0です。
<!-- solution-end -->

### Level C：定理の証明を組み立て直す

<a id="ex-gmt9-c1"></a>

**C1. 一変数の微分からRademacher定理まで**

- Level: C
- 問題: $f:\mathbb R^n\to\mathbb R^m$ を $L$-Lipschitzとする。次を使い、a.e.でFréchet微分できることを証明せよ。(1) 1変数Lipschitz関数は絶対連続でa.e.微分可能、(2) [Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)と高次元Lebesgue微分定理、(3) 各固定方向 $v$ の線分積分公式、(4) $K$-Lipschitzな剰余の平均が $o(r)$ なら一様剰余も $o(r)$。特に、方向ごとの例外集合を無条件に交差させないこと、変数変換の体積因子、微分の作用素ノルムを明記せよ。

<!-- solution-start -->
**詳細解答**

座標 $j$ の切片に(1)を適用し、[座標切片の補題](#lem-gmt9-coordinate-slices)と[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)から偏導関数 $G_j$ がa.e.存在し、$|G_j|\le L$ と分かります。これを列とした行列 $G$ は有界可測です。各成分に(2)を使うと、a.e.の $x$ で $A=G(x)$ として

$$
\operatorname{avg}_{B_\rho}\|G(x+z)-A\|_{\mathrm{op}}dz\to0.
$$

各**固定** $v$ について、座標積分恒等式を合成して直線方向の弱い導関数が $Gv$ であることを示し、直線の絶対連続性から $f(x+v)-f(x)=\int_0^1G(x+tv)vdt$ をa.e.の $x$ で得ます。$v$ ごとに零集合が違ってよいことを保ったまま、$(x,h)$ に[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用して、a.e.の $x$ ではa.e.の $h$ についてこの等式が成り立つとします。

このようなLebesgue点 $x$ を固定し、$R(h)=f(x+h)-f(x)-Ah$ と置きます。$|h|\le r$ と[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)から

$$
\begin{aligned}
\frac1r\operatorname{avg}_{B_r}|R(h)|dh
&\le\int_0^1\operatorname{avg}_{B_r}\|G(x+th)-A\|_{\mathrm{op}}dh\,dt\\
&=\int_0^1\operatorname{avg}_{B_{tr}}\|G(x+z)-A\|_{\mathrm{op}}dz\,dt,
\end{aligned}
$$

最後の等式は $z=th$ による $dh=t^{-n}dz$ と $|B_{tr}|=t^n|B_r|$ の相殺です。固定 $t>0$ で内側は0へ、かつ $\|G\|_{\mathrm{op}}\le\sqrt nL$ により一様有界なので優収束で全体が0へ収束します。$R$ は $K=L+\|A\|_{\mathrm{op}}$-Lipschitzです。もし半径 $r$ 内に $|R(h_0)|\ge\varepsilon r$ があれば、$B(h_0,\delta r)\subset B_{2r}$、$\delta=\min(1/2,\varepsilon/(4K))$ で $|R|\ge3\varepsilon r/4$ が成立し、平均は正の定数倍の $r$ 以上となり矛盾します。よって $R(h)=o(|h|)$、$Df(x)=A$ です。

最後に任意の $|v|=1$ に対し $|f(x+tv)-f(x)|/|t|\le L$ とFréchet微分の極限を比較して $|Df(x)v|\le L$。上限を取れば $\|Df(x)\|_{\mathrm{op}}\le L$ です。
<!-- solution-end -->

## 8. 何が得られ、次に何が必要か

- Lipschitz写像は曲線・曲面上で折れても、$\mathcal L^n$-a.e.の点では線形近似できます。
- Rademacher定理の要点は、1変数の絶対連続性から得る切片積分公式、導関数のLebesgue点、Lipschitz性による平均誤差の一様化です。偏微分が存在するだけでは結論できません。
- 微分が存在すれば、その作用素ノルムは元のLipschitz定数以下です。ただし例外集合は任意の $m$ 次元Hausdorff測度について零とは限りません。
- 次のGMT10では、このa.e.微分と、零集合の扱いをより柔軟にした**近似微分**を区別し、次元に応じたJacobianをGram行列から構成します。
