# GMT20 密度によるrectifiability判定

<!-- definition-example-audit: strict -->

[GMT15の定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)では、可算整流可能集合を既にLipschitz片で覆えることから、ほとんどすべての点で密度が1になり、近似接平面が存在することを示しました。しかし、はじめからパラメータ表示が分からない集合に対し、**小球の面積と拡大したときの方向からLipschitz片を見つけられるか**、という逆問題が残っています。

この講義では「正の下密度＋近似接平面」から可算個のグラフを実際に構成します。[GMT19の平坦なblow-up](../GMT19/index.md#prop-gmt19-flat-approximate)は、この判定条件を測度極限から読み取る道具になります。最後に、**密度の極限だけ**を仮定するPreiss定理を正確に述べ、ここで証明する初等的判定法とは区別します。

以下、整数 $1\le m\le d$、$E\subset\mathbb R^d$ はBorel集合、$\mu=\mathcal H^m\llcorner E$ は局所有限なRadon測度とします。$\mathcal H^m$ は[MT8のHausdorff測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)です。[GMT10の非正規化Hausdorff測度の比例定数](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を $c_m=\mathcal H^m([0,1]^m)$、$\omega_m=\mathcal L^m(B_{\mathbb R^m}(0,1))$、$q_m=c_m\omega_m$ とします。$m$ 次元平面の半径 $r$ の球の測度は $q_mr^m$ です。特に $q_1=2$ です。球はすべて開球です。

## 1. 密度だけで「方向」は分かるか

点 $x$ の周囲で $\mu(B(x,r))$ が $r^m$ に比例することは、$m$ 次元的な量があるという情報です。しかしそれだけでは、その面積が一つの平面方向へ集中するかどうかは見えません。

[GMT15の平面基準密度](../GMT15/index.md#def-gmt15-plane-density)をもう一度用います。一般次元では $q_m$ をそのまま残し、[GMT1の $(2r)^m$ による密度](../GMT1/index.md#def-gmt1-upper-lower-density)と混同しません。

$$
\underline D^m(E,x)=\liminf_{r\downarrow0}\frac{\mu(B(x,r))}{q_mr^m},\qquad
\overline D^m(E,x)=\limsup_{r\downarrow0}\frac{\mu(B(x,r))}{q_mr^m}.
$$

例えば二本の直線が原点で交わる場合、原点の密度は2です。一方、一本の直線の内点では1です。しかし二本の直線が交わる原点は一つの近似接線を持ちません。密度の**数値**と平面への**方向の集中**は別条件です。

ここでは[GMT15の近似接平面](../GMT15/index.md#def-gmt15-approximate-tangent)を使います。$m$ 平面 $V$ が点 $x$ で近似接平面であるためには、正で有限な上下密度に加えて、任意の $\varepsilon\in(0,1)$ で

$$
\frac{\mu(B(x,r)\setminus X(x,V,\varepsilon))}{r^m}\longrightarrow0,
\quad
X(x,V,\varepsilon)=\{x\}\cup\{y\ne x:\operatorname{dist}(y-x,V)<\varepsilon|y-x|\}
$$

を要求します。$X$ は平面に沿う細い両側円錐です。円錐の外に点があってもよく、そこに残る面積が $r^m$ に比べて無視できることが重要です。

### 直接例：折れ線の角と滑らかな曲線

$E=([-1,1]\times\{0\})\cup(\{0\}\times[-1,1])$ とします。原点の球にはそれぞれ長さ $2r$ の二本が入るので $D^1(E,0)=2$ です。任意の直線 $V$ に対して少なくとも一方の枝は $V$ と角度 $\pi/4$ 以上をなし、その枝は十分細い円錐 $X(0,V,1/2)$ の外にあります。よって外側の長さは $2r$ 以上で、$r^{-1}$ 倍しても零になりません。

反対に $P=\{(t,t^2):|t|\le1\}$ の原点では、$|(t,t^2)|=|t|\sqrt{1+t^2}$、水平軸からの距離は $t^2$ なので、その比は $|t|/\sqrt{1+t^2}\to0$ です。[Lipschitz写像のarea formula](../GMT11/index.md#thm-gmt11-area-formula)から小球内の長さは $2r+o(r)$ となり、密度1と水平な近似接線の両方が成立します。

## 2. 円錐の小さな誤差から、二点間の傾きを制限する

近似接平面は一つの点 $x$ を中心にした**測度についての**条件です。グラフを構成するには、異なる二点 $x,y$ を結ぶ線分の方向を制限しなければなりません。そこで、各点での面積の下界を使い、円錐外へ離れた点 $y$ の周りには一定量の面積があることから矛盾を作ります。

まず $m<d$ とし、原点を通る $m$ 次元平面 $V$ を固定します。$F\subset E$ の各点で、同じ定数 $a,\rho>0$ と小さな $\eta>0$ によって

$$
\mu(B(x,r))\ge ar^m,\qquad
\mu(B(x,r)\setminus X(x,V,1/4))\le\eta r^m
\quad(0<r<\rho)
$$

が成立すると仮定します。これは「厚さ」の下界と「円錐外面積」の上界を、**点ごとに異なる尺度ではなく同じ尺度 $\rho$ で**保持する条件です。

<a id="lem-gmt20-cone-pair"></a>

<!-- formal-statement-start -->
> **補題（一様な密度・円錐条件から二点間の傾きが従う）**
> 整数 $1\le m<d$、$V\in G(d,m)$、$a,\rho>0$ とし、$E\subset\mathbb R^d$ はBorel、$\mu=\mathcal H^m\llcorner E$ は局所有限とする。$F\subset E$ の全点 $x$ と全 $0<r<\rho$ について、ある $0<\eta<a/2^{4m}$ により次が成り立つとする。

$$
\mu(B(x,r))\ge ar^m,\qquad
\mu(B(x,r)\setminus X(x,V,1/4))\le\eta r^m.
$$

> ここで円錐 $X$ は次の集合である。

$$
X(x,V,1/4)=\{x\}\cup\{z\ne x:\operatorname{dist}(z-x,V)<|z-x|/4\}.
$$

> このとき、$x,y\in F$ が $0<|x-y|<\rho/2$ を満たせば

$$
\operatorname{dist}(y-x,V)<\frac12|x-y|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

結論に反する方向へ $y$ が離れたなら、$y$ の周りの半径 $|x-y|/8$ の球は $x$ を頂点とする円錐の外に収まります。$y$ での密度下界が与える質量と、$x$ での円錐外質量上界を比較します。

<!-- proof-start -->
### 証明

$h=|x-y|$ として、$\operatorname{dist}(y-x,V)\ge h/2$ を仮定します。任意の $z\in B(y,h/8)$ に対し、直交射影の1-Lipschitz性、三角不等式から

$$
\operatorname{dist}(z-x,V)\ge\operatorname{dist}(y-x,V)-|z-y|>\frac{3h}{8},
$$

また $|z-x|\le|z-y|+|y-x|<9h/8$ です。よって

$$
\frac{\operatorname{dist}(z-x,V)}{|z-x|}>\frac{3h/8}{9h/8}=\frac13>\frac14.
$$

これにより次の包含が成り立ちます。

$$
B(y,h/8)\subset B(x,2h)\setminus X(x,V,1/4).
$$

$h<\rho/2$ なので $2h<\rho$、$h/8<\rho$ であり、二つの仮定をそれぞれ中心 $x$ と中心 $y$ に適用できます。

$$
a\left(\frac h8\right)^m
\le\mu(B(y,h/8))
\le\mu(B(x,2h)\setminus X(x,V,1/4))
\le\eta(2h)^m.
$$

しかし $\eta<a/2^{4m}$ なら $\eta 2^m<a/8^m$ となり矛盾します。したがって二点間の差は $V$ に沿う円錐へ入ります。$\square$
<!-- proof-end -->

### 直接例：グラフなら射影を逆にたどれる

$V=\mathbb R\times\{0\}\subset\mathbb R^2$ とし、$F=\{(t,t/2):0\le t\le1\}$ を考えます。異なる二点の差は $(h,h/2)$ なので、水平射影の長さは $|h|$、直交成分の長さは $|h|/2$、全体は $\sqrt5|h|/2$ です。従って直交成分と全体の比は $1/\sqrt5<1/2$ です。水平射影が同じであれば点も同じであり、逆写像は $t\mapsto(t,t/2)$ と一意に定まります。

<a id="lem-gmt20-cone-graph"></a>

<!-- formal-statement-start -->
> **補題（局所円錐条件からLipschitzグラフへの包含）**
> $1\le m<d$、$V$ を $m$ 次元線形平面、$F\subset\mathbb R^d$ とする。$F$ の異なる二点 $x,y$ について

$$
\operatorname{dist}(y-x,V)<\frac12|x-y|
$$

> が常に成り立つなら、$F$ は $V$ 上のLipschitz写像 $g:V\to V^\perp$ のグラフ $\{v+g(v):v\in V\}$ に含まれる。$F$ 上で得られる写像のLipschitz定数は高々 $1/\sqrt3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

直交成分が二点間距離の半分未満なら、射影成分は少なくとも $\sqrt3/2$ 倍あります。したがって射影が単射になり、その逆で直交成分を表せます。定義域を全平面へ拡張します。

<!-- proof-start -->
### 証明

$\pi_V$ と $\pi_{V^\perp}$ を直交射影とします。$h=y-x$ なら[直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)により

$$
|\pi_Vh|^2=|h|^2-|\pi_{V^\perp}h|^2>\frac34|h|^2.
$$

従って $\pi_V|_F$ は単射です。$A=\pi_V(F)$ とし、$v=\pi_V(x)$ に対し $g_0(v)=\pi_{V^\perp}(x)$ と定めても $x$ は一意です。$v,w\in A$ に対応する $x,y$ について

$$
|g_0(v)-g_0(w)|=|\pi_{V^\perp}(x-y)|<\frac12|x-y|
\le\frac1{\sqrt3}|v-w|.
$$

$V^\perp$ の直交基底 $e_1,\ldots,e_{d-m}$ で $g_0=\sum_j g_{0,j}e_j$ と書くと、各実数値成分は $1/\sqrt3$-Lipschitzです。各成分を

$$
g_j(v)=\inf_{w\in A}\left(g_{0,j}(w)+\frac{|v-w|}{\sqrt3}\right)
$$

で $V$ 全体へ拡張します。空集合 $A$ については $g=0$ とすればよいので、以下 $A$ は非空とします。三角不等式から $g_j$ は有限で $1/\sqrt3$-Lipschitz、$v\in A$ では $g_j(v)=g_{0,j}(v)$ です。$g=\sum_jg_je_j$ は高々 $\sqrt{d-m}/\sqrt3$-Lipschitzで、$F$ をグラフに含めます。$\square$
<!-- proof-end -->

ここで「$F$ 上で $1/\sqrt3$」と「全平面へ拡張後の定数」は別です。後者の定数が少し増えても、可算整流可能性には支障がありません。

## 3. 近似接平面を持つ点を可算個のグラフへ並べる

点ごとに接平面の向き、密度の下界、円錐外面積が小さくなる半径は異なります。しかし、これらの違いは可算個の選択に分けられます。平面の集合 $G(d,m)$ はコンパクトな距離空間で、直交射影 $\pi_V$ による距離 $\|\pi_V-\pi_W\|$ について可算な稠密集合を持ちます。

<a id="thm-gmt20-tangent-criterion"></a>

<!-- formal-statement-start -->
> **定理（正の下密度と近似接平面による整流可能性判定）**
> 整数 $1\le m\le d$ とする。$E\subset\mathbb R^d$ はBorel集合で、$\mu=\mathcal H^m\llcorner E$ は局所有限とする。このとき次は同値である。
>
> 1. $E$ は可算 $m$-整流可能である。
> 2. $\mu$-ほとんどすべての $x\in E$ で $0<\underline D^m(E,x)\le\overline D^m(E,x)<\infty$ であり、$x$ に近似接$m$平面が存在する。
>
> このときさらに、$\mu$-ほとんどすべての点で $D^m(E,x)=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

（1）から（2）は既習です。逆向きは、円錐の向きを可算個の候補平面に近似し、密度下界と円錐外面積の小ささを同じ定数に揃えます。さらに小さい立方体ごとに切ると、前節の補題でその部分を一枚のLipschitzグラフに入れられます。

<!-- proof-start -->
### 証明

**（1）なら（2）**：[GMT15の整流可能集合の密度・接平面定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)を適用します。局所有限性・Borel性は本定理の仮定に含まれ、密度1、近似接平面の存在がともに従います。

**（2）なら（1）**：$m=d$ の場合は $E$ 自身が $\mathbb R^d$ の部分集合で、恒等写像の像に含まれるため可算 $d$-整流可能です。以下 $m<d$ とします。

条件（2）を満たす点全体を $E_*$ とし、$\mu(E\setminus E_*)=0$ です。$G(d,m)$ に可算稠密な平面族 $\{V_j\}_{j\ge1}$ を取ります。各 $x\in E_*$ の近似接平面を $W_x$ とすれば、ある $j$ で

$$
\|\pi_{V_j}-\pi_{W_x}\|<\frac18
$$

とできます。任意の $z\ne x$ に対し、$\operatorname{dist}(z-x,V_j)\ge|z-x|/4$ なら

$$
\begin{aligned}
\operatorname{dist}(z-x,W_x)
&=|\pi_{W_x^\perp}(z-x)|\\
&\ge|\pi_{V_j^\perp}(z-x)|-\|\pi_{V_j}-\pi_{W_x}\|\,|z-x|\\
&>\frac18|z-x|.
\end{aligned}
$$

従って $V_j$ の幅 $1/4$ の円錐外部分は、$W_x$ の幅 $1/8$ の円錐外部分に含まれます。[面積測度による近似接m平面の定義](../GMT15/index.md#def-gmt15-approximate-tangent)から

$$
r^{-m}\mu(B(x,r)\setminus X(x,V_j,1/4))\longrightarrow0.
$$

また正の下密度から、十分小さい半径について $\mu(B(x,r))\ge ar^m$ となる $a>0$ が点ごとに存在します。

各 $j,k,l\ge1$ に対し、$a=1/k$、$\rho=1/l$、$\eta=a/2^{4m+1}$ とし、次の条件が**すべての** $0<r<\rho$ で成り立つ点の集合を $F_{jkl}\subset E$ とします。

$$
\mu(B(x,r))\ge ar^m,\qquad
\mu(B(x,r)\setminus X(x,V_j,1/4))\le\eta r^m.
$$

上で示した極限と下密度より、$E_*$ の各点は少なくとも一つの $F_{jkl}$ に入ります。従って

$$
E_*\subset\bigcup_{j,k,l\ge1}F_{jkl}.
$$

次に各 $F_{jkl}$ を、直径が $\rho/2$ より小さい可算個の半開立方体 $Q$ で切ります。$F=F_{jkl}\cap Q$ の任意の異なる二点について $|x-y|<\rho/2$ です。$\eta=a/2^{4m+1}<a/2^{4m}$ なので、[一様な密度・円錐条件から二点間の傾きが従う補題](#lem-gmt20-cone-pair)から

$$
\operatorname{dist}(y-x,V_j)<\frac12|x-y|.
$$

[局所円錐条件からLipschitzグラフへの包含](#lem-gmt20-cone-graph)を $F$ に適用すれば、その集合は $m$ 次元Lipschitzグラフに含まれます。各グラフは平面からEuclid空間へのLipschitz写像の像です。従って[可算m-整流可能集合の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)から $E_*$ は可算 $m$-整流可能です。

しかも $\mu(E\setminus E_*)=0$ なので、零集合を除いて $E$ 全体をこの可算個のグラフで覆えます。

最後に再び [GMT15の定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)を適用し、$D^m(E,x)=1$ を得ます。$\square$
<!-- proof-end -->

この証明では、接平面の方向 $W_x$ が測度論的に可測な関数であることを仮定しません。可算稠密な平面族と、各点で成立する不等式の**すべての半径での一様化**だけで、必要な被覆を作りました。

### 何を外すと証明が壊れるか

正の下密度を外すと、円錐外にある $y$ の周りの球 $B(y,h/8)$ が十分な面積を持つとはいえません。近似接平面条件を外すと、固定平面 $V_j$ に関する円錐外面積を小さくする根拠がありません。また「ある半径列だけ」で円錐外面積が小さいという仮定では、二点 $x,y$ に適した半径 $2|x-y|$ を一様に使えません。

## 4. 平坦なblow-upは、判定条件をどう保証するか

[GMT19の接測度](../GMT19/index.md#def-gmt19-tangent)は、半径の**部分列**と任意の正規化係数を許します。一方、ここで使うのは **全半径の極限** と $r^{-m}$ という固定正規化です。両者を混同してはいけません。

<a id="cor-gmt20-flat-blowup"></a>

<!-- formal-statement-start -->
> **系（全スケール平坦blow-upによる整流可能性判定）**
> 整数 $1\le m\le d$ とし、$E\subset\mathbb R^d$ はBorel、$\mu=\mathcal H^m\llcorner E$ は局所有限とする。$\mu$-ほとんどすべての点 $x\in E$ において、$m$ 次元線形平面 $V_x$ と $c_x\in(0,\infty)$ が存在し、

$$
r^{-m}(T_{x,r})_\#\mu\rightharpoonup_{\mathrm v}
c_x\mathcal H^m\llcorner V_x\qquad(r\downarrow0)
$$

> が全半径の極限として成り立つとする。このとき $E$ は可算 $m$-整流可能であり、$c_x=1$ が $\mu$-ほとんどすべての点で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

全スケールの平坦極限から密度と円錐外条件を読み、直前の判定定理に渡します。密度の係数 $c_x$ は、整流可能集合について既に証明した密度1で決定されます。

<!-- proof-start -->
### 証明

各典型点 $x$ で [GMT19の平坦極限命題](../GMT19/index.md#prop-gmt19-flat-approximate)を、与えられた平面 $V_x$ と係数 $c_x$ に適用します。Borel性・局所有限性・係数の正値性は仮定どおりです。そこで

$$
D^m(E,x)=c_x\in(0,\infty)
$$

と近似接平面 $V_x$ を得ます。[正の下密度と近似接平面による整流可能性判定](#thm-gmt20-tangent-criterion)から $E$ は可算整流可能です。同定した密度は同じ定理の結論 $D^m(E,x)=1$ と等しいため、$c_x=1$ がほとんどすべての点で成立します。$\square$
<!-- proof-end -->

### 直接例：重み付き直線と、交差点の例外

$E=\mathbb R\times\{0\}$、$\mu=\mathcal H^1\llcorner E$、$x=(a,0)$ とします。$T_{x,r}$ は直線をそのまま直線へ移し、$\mathcal H^1(x+rA)=r\mathcal H^1(A)$ なので

$$
r^{-1}(T_{x,r})_\#\mu=\mathcal H^1\llcorner E
$$

が任意の $r$ で成立します。正規化係数は1です。一方、二本の直線が交わる原点では平坦でない二本の直線の和が極限に残り、上の系の仮定を満たしません。しかし原点は $\mathcal H^1$-零なので、集合全体の可算整流可能性とは矛盾しません。

## 5. 密度の極限だけが分かる場合

「正で有限な密度極限」だけを与えられ、近似接平面が分からない場合を考えます。前節までの証明は円錐外面積が小さいことを使ったため、そのままでは適用できません。一般の測度に対してこの間を埋めるのがPreissの深い定理です。

まず「測度が可算個のLipschitz曲面に集中する」状況を定義します。Radon測度 $\nu$ について可算 $m$-整流可能なBorel集合 $R$ が存在し、$\nu(\mathbb R^d\setminus R)=0$ かつ $\nu\ll\mathcal H^m$ が成り立つことを要求します。後者は $\mathcal H^m(A)=0$ なら $\nu(A)=0$ を意味します。集合 $E$ が整流可能という話とは異なり、測度自体の集中先と絶対連続性を両方確認する必要があります。

<a id="def-gmt20-rectifiable-measure"></a>

<!-- formal-statement-start -->
> **定義（m-整流可能Radon測度）**
> 整数 $1\le m\le d$、$\nu$ を $\mathbb R^d$ 上の非負Radon測度とする。可算 $m$-整流可能なBorel集合 $R$ が存在し、

$$
\nu(\mathbb R^d\setminus R)=0,\qquad \nu\ll\mathcal H^m
$$

> が成り立つとき、$\nu$ を **m-整流可能Radon測度** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt20-rectifiable-measure -->
### 直接例：重み付き線分

**定義の確認**：可算整流可能な支持集合とHausdorff測度に対する絶対連続性をそれぞれ確かめます。

$R=[-1,1]\times\{0\}$ とし、$w(t)=2+|t|$、$\nu=w\,\mathcal H^1\llcorner R$ とします。$R$ は一本のLipschitz線分だから可算1整流可能です。$\nu$ は $R$ の外で零であり、$\mathcal H^1(A)=0$ なら $\nu(A)=\int_{A\cap R}w\,d\mathcal H^1=0$ なので絶対連続です。従ってこの測度は1整流可能です。

さらに内点 $x=(a,0)$、$|a|<1$ において、$r<1-|a|$ なら

$$
\frac{\nu(B(x,r))}{2r}
=\frac1{2r}\int_{a-r}^{a+r}(2+|t|)\,dt
\longrightarrow 2+|a|.
$$

これは正で有限ですが、一般に1ではありません。**集合の面積密度1**と**重み付き測度の密度値**を分離する必要があります。
<!-- definition-example-end -->

<a id="thm-gmt20-preiss"></a>

<!-- formal-statement-start -->
> **定理（Preissの密度による整流可能性定理：ここでは証明せずに紹介）**
> 整数 $1\le m\le d$、$\nu$ を $\mathbb R^d$ 上の非負Radon測度とする。$\nu$-ほとんどすべての点 $x$ において次の極限が**存在**し、正かつ有限であると仮定する。

$$
0<\Theta^m(\nu,x):=\lim_{r\downarrow0}\frac{\nu(B(x,r))}{(2r)^m}<\infty.
$$

> このとき $\nu$ は $m$-整流可能Radon測度である。分母を $\omega_mr^m$ に変更しても、一定の正の係数の違いしかないため成立条件と結論は変わらない。
<!-- formal-statement-end -->

この一般定理の証明には、接測度を使った深い分類・剛性論が必要です。**ここまでの円錐補題の証明からPreiss定理を証明できたわけではありません**。この講義では定理文と適用例にとどめ、他の命題の証明へブラックボックスとして密かに逆輸入しません。

### 有限面積集合への帰結と、仮定の差

正かつ有限の $\mathcal H^m$ 測度を持つBorel集合 $E$ を考え、その面積測度を $\mu=\mathcal H^m\llcorner E$ とします。$\mu$ の密度極限がほとんどすべての点で**正かつ有限に存在する**なら、[Preissの密度による整流可能性定理](#thm-gmt20-preiss)から可算整流可能な支持集合 $R$ を得ます。

$$
\mu(E\setminus R)=0.
$$

従って $E$ 自身も可算 $m$-整流可能です。[GMT15の定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)を適用し直せば、その密度極限は実際には1です。逆向きの「整流可能なら密度1」は同定理で証明済みです。

ここで密度の上極限だけが正である場合には、Preiss定理の「極限が存在する」という条件を満たしません。[GMT16の純非整流集合](../GMT16/index.md#thm-gmt16-decomposition)を密度の上界・下界だけで安易に排除することもできません。[GMT18の射影判定](../GMT18/index.md#thm-gmt18-besicovitch-federer)は別の幾何学的判定であり、密度の極限を自動的に保証する定理ではありません。

## 6. 演習：円錐・平面・密度の論理を組み立てる

### Level A：定義と定数を確かめる

<a id="ex-gmt20-a01"></a>
### GMT20-A01 平面基準密度と上・下密度

- Level: A

$E=[-2,2]\times\{0\}\subset\mathbb R^2$、$m=1$ とする。内点 $(0,0)$ と端点 $(2,0)$ の平面基準密度を計算し、どちらの点が「ほとんどすべての点」という結論の対象外になり得るか説明せよ。

<!-- solution-start -->
#### 詳細解答

内点では $0<r<2$ のとき球内の線分長は $2r$ なので $\mu(B(0,r))/(2r)=1$ です。端点では $0<r<4$ に対し球内の長さは $r$ なので $\mu(B((2,0),r))/(2r)=1/2$ です。両点とも上下密度はそれぞれ同じ値へ収束します。端点は $\mathcal H^1$-零集合なので、[GMT15の密度1 a.e.定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)と矛盾しません。
<!-- solution-end -->

<a id="ex-gmt20-a02"></a>
### GMT20-A02 円錐外の球の包含

- Level: A

$V=\mathbb R\times\{0\}$、$x=(0,0)$、$y=(0,h)$、$h>0$ とする。$z\in B(y,h/8)$ に対し $\operatorname{dist}(z-x,V)/|z-x|>1/4$ を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

$z=(z_1,z_2)$ とすると $|z_2-h|<h/8$ より $z_2>7h/8$、$|z|\le|z-y|+|y|<9h/8$ です。従って

$$
\frac{\operatorname{dist}(z,V)}{|z|}=\frac{|z_2|}{|z|}>\frac{7h/8}{9h/8}=\frac79>\frac14.
$$

よって球全体が $x$ を頂点とする幅 $1/4$ の円錐の外にあります。
<!-- solution-end -->

<a id="ex-gmt20-a03"></a>
### GMT20-A03 射影の単射性

- Level: A

$F\subset\mathbb R^d$ の異なる二点 $x,y$ が常に $\operatorname{dist}(y-x,V)<|x-y|/2$ を満たすとする。$\pi_V|_F$ が単射であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

もし $\pi_Vx=\pi_Vy$ なら $h=y-x\in V^\perp$ です。このとき $\operatorname{dist}(h,V)=|h|$ なので仮定は $|h|<|h|/2$ を要求し、$h\ne0$ と矛盾します。したがって同じ射影を持つ二点は一致します。[Lipschitzグラフ補題](#lem-gmt20-cone-graph)の第一段階です。
<!-- solution-end -->

<a id="ex-gmt20-a04"></a>
### GMT20-A04 重み付き測度の密度

- Level: A

$\nu=(1+t^2)\mathcal H^1\llcorner(\mathbb R\times\{0\})$ に対し、$x=(a,0)$ における $\lim_{r\downarrow0}\nu(B(x,r))/(2r)$ を求めよ。密度が1でないことは非整流性を意味するか。

<!-- solution-start -->
#### 詳細解答

区間 $(a-r,a+r)$ を積分すると

$$
\begin{aligned}
\nu(B(x,r))&=\int_{a-r}^{a+r}(1+t^2)\,dt\\
&=2r(1+a^2)+\frac{2r^3}{3}.
\end{aligned}
$$

従って比は $1+a^2+r^2/3\to1+a^2$ です。支持集合は一本の直線で、$\nu\ll\mathcal H^1$ ですから[整流可能測度の定義](#def-gmt20-rectifiable-measure)を満たします。重みが密度へ現れるだけで、非整流性を意味しません。
<!-- solution-end -->

<a id="ex-gmt20-a05"></a>
### GMT20-A05 密度極限の存在と上下密度

- Level: A

正の数列 $q_n$ が偶数番で1、奇数番で2となるとする。$\liminf q_n$、$\limsup q_n$ を計算し、$0<\liminf q_n\le\limsup q_n<\infty$ が「極限の存在」を意味しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

偶数部分列の極限が1、奇数部分列の極限が2なので $\liminf q_n=1$、$\limsup q_n=2$ です。両者が異なるため極限は存在しません。密度に置き換えても、正で有限な上下密度と、[Preiss定理](#thm-gmt20-preiss)が要求する正で有限な密度**極限**は別の仮定です。この数列自体が実際の測度の球密度として実現できると主張しているわけではありません。
<!-- solution-end -->

### Level B：主要補題の一段を自分で作る

<a id="ex-gmt20-b01"></a>
### GMT20-B01 密度・円錐の定数を検算する

- Level: B

[二点間傾き補題](#lem-gmt20-cone-pair)で $h=|x-y|$、$\operatorname{dist}(y-x,V)\ge h/2$ とする。$B(y,h/8)$ の包含を証明し、$\eta=a/2^{4m+1}$ で矛盾が出る式を示せ。

<!-- solution-start -->
#### 詳細解答

$|z-y|<h/8$ に対し $\operatorname{dist}(z-x,V)\ge h/2-h/8=3h/8$、$|z-x|<9h/8$ なので外側の比は $>1/3>1/4$ です。また $|z-x|<9h/8<2h$ です。従って包含が成立します。密度下界と円錐外上界を使うと

$$
\frac{ah^m}{8^m}\le\mu(B(y,h/8))\le\eta(2h)^m
=\frac{ah^m}{2^{3m+1}}<\frac{ah^m}{2^{3m}}.
$$

左端と右端はそれぞれ $ah^m/2^{3m}$ より大きいか小さいため矛盾です。半径 $2h$ が共通閾値 $\rho$ 未満であることも必要です。
<!-- solution-end -->

<a id="ex-gmt20-b02"></a>
### GMT20-B02 可算化の方向誤差

- Level: B

二つの $m$ 平面 $V,W$ が $\|\pi_V-\pi_W\|<1/8$ を満たすとき、$\operatorname{dist}(u,V)\ge|u|/4$ なら $\operatorname{dist}(u,W)>|u|/8$ と証明せよ。その結果を近似接平面の円錐外面積へ適用せよ。

<!-- solution-start -->
#### 詳細解答

$\pi_{V^\perp}=I-\pi_V$、$\pi_{W^\perp}=I-\pi_W$ より

$$
\begin{aligned}
\operatorname{dist}(u,W)&=|\pi_{W^\perp}u|\\
&\ge|\pi_{V^\perp}u|-|(\pi_V-\pi_W)u|\\
&>\frac{|u|}{4}-\frac{|u|}{8}=\frac{|u|}{8}.
\end{aligned}
$$

従って $B(x,r)\setminus X(x,V,1/4)$ は $B(x,r)\setminus X(x,W,1/8)$ に含まれます。$W$ が近似接平面なら右側の $r^{-m}$ 倍測度は零へ収束するため左側も零へ収束します。
<!-- solution-end -->

<a id="ex-gmt20-b03"></a>
### GMT20-B03 McShane型拡張の確認

- Level: B

$A\subset\mathbb R^m$ が非空で、$f_0:A\to\mathbb R$ が $L$-Lipschitzとする。$f(x)=\inf_{a\in A}(f_0(a)+L|x-a|)$ が有限で $L$-Lipschitz、かつ $A$ 上で $f_0$ と一致することを示せ。

<!-- solution-start -->
#### 詳細解答

$a_0\in A$ を固定すると、Lipschitz性から $f_0(a)\ge f_0(a_0)-L|a-a_0|$ です。三角不等式を併用して

$$
f_0(a)+L|x-a|\ge f_0(a_0)-L|x-a_0|
$$

となるため下に有界であり、$a=a_0$ の項が有限な上界を与えます。任意の $x,y$ に対し $|x-a|\le|x-y|+|y-a|$ なので $f(x)\le f(y)+L|x-y|$、交換して $|f(x)-f(y)|\le L|x-y|$ です。$x\in A$ では $f(x)\le f_0(x)$（$a=x$）かつ $f_0(a)+L|x-a|\ge f_0(x)$（Lipschitz性）なので等号です。[グラフ補題](#lem-gmt20-cone-graph)では成分ごとにこの操作を行いました。
<!-- solution-end -->

<a id="ex-gmt20-b04"></a>
### GMT20-B04 交差する線分の典型点と例外点

- Level: B

$E=([-1,1]\times\{0\})\cup(\{0\}\times[-1,1])$ とする。原点と原点以外の内点で、密度と近似接線の有無を調べ、[判定定理](#thm-gmt20-tangent-criterion)がどこで成立するか述べよ。

<!-- solution-start -->
#### 詳細解答

原点では各線分が長さ $2r$ を寄与し、密度は

$$
D^1(E,0)=\frac{4r}{2r}=2
$$

です。任意の直線 $V$ と角度が少なくとも $\pi/4$ の枝が一つあるので、幅 $1/2$ の円錐外にその枝の長さ $2r$ が残ります。従って近似接線はありません。

原点以外の各線分内点では、十分小さい球は一本の線分とだけ交わります。長さは $2r$、密度は1で、その線分の方向を接線とすると円錐外面積は0です。端点の密度は $1/2$ ですが、端点も $\mathcal H^1$-零集合です。従って判定条件はほとんどすべての点で成立し、二本のLipschitz像の和という表現と一致します。
<!-- solution-end -->

### Level C：判定法の境界を整理する

<a id="ex-gmt20-c01"></a>
### GMT20-C01 測度極限から整流可能性までをつなぐ

- Level: C

$E\subset\mathbb R^d$ を局所有限な $\mathcal H^m$ を持つBorel集合とし、$\mu=\mathcal H^m\llcorner E$ とする。$\mu$-ほとんどすべての $x$ で、ある $m$ 平面 $V_x$ と $c_x>0$ が存在して、$r^{-m}(T_{x,r})_\#\mu\rightharpoonup_{\mathrm v}c_x\mathcal H^m\llcorner V_x$ が**全半径**で成立する、と仮定する。密度・接平面・整流可能性・係数同定を、どの結果をどの順で適用するか明示して導け。また、一つの平坦な接測度が存在するだけでは同じ論証にならない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

まず各典型点 $x$ の全スケール極限に [GMT19の平坦極限命題](../GMT19/index.md#prop-gmt19-flat-approximate)を適用します。極限平面の単位球内測度が $q_m=c_m\omega_m$ なので、

$$
\frac{\mu(B(x,r))}{q_mr^m}\longrightarrow c_x,
$$

かつ円錐外部分の $r^{-m}$ 倍測度が0へ収束します。$c_x>0$ は正の下密度を、$c_x<\infty$ は有限の上密度を与えるため、[GMT20の判定定理](#thm-gmt20-tangent-criterion)の条件（2）を満たします。これで $E$ は可算 $m$-整流可能です。その後 [GMT15の密度定理](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)から密度1 a.e. が分かり、もともとの極限値と比較して $c_x=1$ a.e. です。

一つの平坦な接測度の存在は、[接測度](../GMT19/index.md#def-gmt19-tangent)の定義によれば特定の $r_j\downarrow0$ と任意の正の係数 $a_j$ での極限にすぎません。そこからすべての半径で $r^{-m}$ 規格化した極限や上下密度の存在、全半径での円錐外消失は導けません。したがって上の第一段階を実行できません。
<!-- solution-end -->

## 7. 次の講義へ

小球密度と方向の集中から、可算個のLipschitz片を再構成できました。次のGMT21では集合の境界だけでなく、関数の変化を**測度として保存する** $BV$ を導入します。ジャンプを持つ関数の微分を、通常の導関数だけでは表せないことが出発点です。
