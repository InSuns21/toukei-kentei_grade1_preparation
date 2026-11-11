# GMT27 De Giorgi構造定理 II：整流可能性と測度同定

<!-- definition-example-audit: strict -->

## 1. 半空間に見える境界を、曲面で覆えるか

[GMT26の半空間blow-up定理](../GMT26/index.md#thm-gmt26-halfspace-blowup)は、[縮約境界](../GMT25/index.md#def-gmt25-reduced-boundary)の**各点**を拡大すると、集合がある半空間に近づき、その点の周長密度が一定値になると示しました。ただし、一点ごとに異なる向きの半空間が見えるだけでは、境界全体を一枚の曲面として表せません。点を可算個の群に分け、それぞれで**二点間の傾き**を制限できれば、Lipschitzグラフによって覆えます。

さらに、球内の周長が面積と同じ次数で減るだけでは、両者が同じ**測度**とは言えません。最終的には、局所有限性、絶対連続性、測度微分を順に確認します。これが今回の二つの問い、すなわち**整流可能性**と**測度同定**です。

以下、整数 $d\ge2$、$m=d-1$、開集合 $\Omega\subset\mathbb R^d$、$\Omega$ で局所有限周長を持つLebesgue可測集合 $E\subset\mathbb R^d$ を考えます。[Gauss--Green測度の存在・極分解・双対性](../GMT24/index.md#thm-gmt24-gauss-green)に従い

$$
\mathcal G_E=-D\chi_E=\nu_E\mu_E,\qquad
\mu_E=|D\chi_E|,\qquad |\nu_E|=1\quad\mu_E\text{-a.e.}
$$

と書きます。$\nu_E$ は外向き単位法線、$\mu_E$ は周長測度です。$\partial^*E$ とその点での $\nu_E^*(x)$ は[縮約境界の定義](../GMT25/index.md#def-gmt25-reduced-boundary)のとおりです。[縮約境界上の法線の平均振動と周長測度ほとんど至る所での存在](../GMT25/index.md#thm-gmt25-normal-mean)から、$\mu_E$ は $\partial^*E\cap\Omega$ に集中します。「集中する」とは補集合の $\mu_E$-測度が0という意味で、集合そのものが位相的境界と一致するという意味ではありません。

ここで面積の単位を固定します。$\omega_m=\mathcal L^m(B_{\mathbb R^m}(0,1))$ とし、[GMT10の非正規化Hausdorff測度の比例補題](../GMT10/index.md#lem-gmt10-hausdorff-normalization)にある

$$
c_m=\mathcal H^m([0,1]^m),\qquad
\widehat{\mathcal H}^{\,m}=c_m^{-1}\mathcal H^m
$$

を使います。この教材の $\mathcal H^m$ は直径の $m$ 乗から作る**非正規化**測度です。$m$ 次元平面 $V$ 上では

$$
\widehat{\mathcal H}^{\,m}(V\cap B(x,r))=\omega_mr^m
\quad(x\in V).
$$

したがって求めたい同定は、無条件の $\mu_E=\mathcal H^m\llcorner\partial^*E$ ではなく、係数 $c_m^{-1}$ を含む形です。記号 $\lambda\llcorner A$ は測度 $\lambda$ をBorel集合 $A$ に制限したもの、すなわち $(\lambda\llcorner A)(B)=\lambda(A\cap B)$ です。

**先に最小例。** $H=\{z_d<0\}$ なら[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から

$$
\partial^*H=\{z_d=0\},\quad \nu_H^*=e_d,\quad
\mu_H(B(0,r))=\omega_mr^m
=c_m^{-1}\mathcal H^m(\partial^*H\cap B(0,r)).
$$

符号は $-D\chi_H=e_d\mu_H$ です。$d=2$ では $c_1=1$ ですが、一般の $d$ で $c_m=1$ と決め打ちできません。

## 2. 縮約境界では、周長測度自身が平面になる

集合の $L^1_{\mathrm{loc}}$ 収束と周長測度の弱収束は別物です。今回のグラフ被覆に必要なのは、集合の形ではなく**周長測度の円錐外質量**が消えることです。[GMT26の証明](../GMT26/index.md#thm-gmt26-halfspace-blowup)で得た法線の揃い方を、測度の主張として取り出します。

点 $x$ を中心とする拡大写像 $T_{x,r}(y)=(y-x)/r$ と、正規化した周長測度

$$
\mu_{x,r}=r^{-m}(T_{x,r})_\#\mu_E
$$

を使います（$\Omega$ の外では必要な半径の球を取らず、固定コンパクト上で十分小さい $r$ だけを考えます）。ここで $(T_{x,r})_\#\mu_E$ は写像 $T_{x,r}$ による像測度です。

[GMT26の再尺度化の定義](../GMT26/index.md#def-gmt26-rescalings)に合わせ、拡大後の集合を $E_{x,r}=T_{x,r}(E)$ と書きます。測度の係数 $r^{-m}$ は、面積が相似比 $r^{-1}$ に対して $r^{-m}$ 倍されることに対応します。

<a id="lem-gmt27-flat-perimeter-tangent"></a>

<!-- formal-statement-start -->
> **補題（縮約境界での周長測度の平坦接測度）**
> $d\ge2$、$m=d-1$、$E\subset\mathbb R^d$ は開集合 $\Omega$ で局所有限周長を持ち、$\mu_E=|D\chi_E|$ とする。任意の $x\in\partial^*E\cap\Omega$ で $n=\nu_E^*(x)$、$V=n^\perp$ と置くと、すべての $r\downarrow0$ について

$$
\mu_{x,r}\rightharpoonup_{\mathrm v}
\widehat{\mathcal H}^{\,m}\llcorner V
\quad\text{in }\mathbb R^d.
$$

> ここで $\rightharpoonup_{\mathrm v}$ は[GMT19の局所弱収束](../GMT19/index.md#def-gmt19-vague)、すなわちコンパクト台連続関数で試す収束である。さらに

$$
\lim_{r\downarrow0}\frac{\mu_E(B(x,r))}{\omega_mr^m}=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

法線の平均が単位長になるため、再尺度化後のベクトル測度は $n\mu_{x,r}$ から全変動の意味でも離れません。指示関数の半空間極限からベクトル測度の極限を決め、その長さを取って正測度の極限を確定します。

<!-- proof-start -->
### 証明

$x\in\partial^*E$ を固定し、任意の尺度列 $r_j\downarrow0$ を取ります。[縮約境界点での二相体積密度と周長密度の上下評価](../GMT26/index.md#thm-gmt26-density-bounds)により、固定 $R$ で

$$
\mu_{x,r_j}(B(0,R))
=r_j^{-m}\mu_E(B(x,r_jR))\le C_dR^m
$$

が十分大きい $j$ に対して成立します。[局所弱コンパクト性](../GMT19/index.md#lem-gmt19-vague-compactness)（GMT26の前提閉包で既習）から、適当な部分列について $\mu_{x,r_j}\rightharpoonup_{\mathrm v}\lambda$ とできます。

再尺度化後の外向き法線を $\nu_j(z)=\nu_E(x+r_jz)$（$\mu_{x,r_j}$-ほとんど至る所）と定めます。[GMT26の尺度変換](../GMT26/index.md#lem-gmt26-rescaling-variation)により

$$
\mathcal G_{E_{x,r_j}}=\nu_j\mu_{x,r_j}
$$

です。[縮約境界上の法線平均の定義](../GMT25/index.md#def-gmt25-reduced-boundary)と[二乗平均振動の同値性](../GMT25/index.md#thm-gmt25-normal-mean)により

$$
\begin{aligned}
\int_{B_R}|\nu_j-n|^2\,d\mu_{x,r_j}
&=2\mu_{x,r_j}(B_R)
\bigl(1-n\cdot N_{r_jR}(E,x)\bigr)\\
&\longrightarrow0.
\end{aligned}
$$

ここで $\mu_{x,r_j}(B_R)$ の一様有界性と $N_{r_jR}(E,x)\to n$ の双方を使いました。Cauchy--Schwarzにより、コンパクト台の任意の連続ベクトル場 $\varphi$ に対して

$$
\left|\int\varphi\cdot d\mathcal G_{E_{x,r_j}}
-\int\varphi\cdot n\,d\mu_{x,r_j}\right|
\le \|\varphi\|_\infty
\mu_{x,r_j}(B_R)^{1/2}
\left(\int_{B_R}|\nu_j-n|^2\,d\mu_{x,r_j}\right)^{1/2}
\to0
$$

となります。ただし $R$ は $\operatorname{supp}\varphi$ を含む半径です。[BV再尺度化の恒等式](../GMT26/index.md#lem-gmt26-rescaling-variation)によって $\mathcal G_{E_{x,r_j}}=r_j^{-m}(T_{x,r_j})_\#\mathcal G_E$ です。一方、[半空間blow-up](../GMT26/index.md#thm-gmt26-halfspace-blowup)から指示関数が $L^1_{\mathrm{loc}}$ で $\chi_{H_n^-}$ へ収束するので、任意の $\varphi\in C_c^1(\mathbb R^d;\mathbb R^d)$ に対して

$$
\begin{aligned}
\int\varphi\cdot d\mathcal G_{E_{x,r_j}}
&=\int\chi_{E_{x,r_j}}\operatorname{div}\varphi\,dz\\
&\longrightarrow\int\chi_{H_n^-}\operatorname{div}\varphi\,dz
=\int\varphi\cdot n\,d(\widehat{\mathcal H}^{\,m}\llcorner V).
\end{aligned}
$$

最後の等式は半空間の[Gauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)です。前の差の評価と組み合わせると、$n\lambda=n(\widehat{\mathcal H}^{\,m}\llcorner V)$ であり、$|n|=1$ だから $\lambda=\widehat{\mathcal H}^{\,m}\llcorner V$。どの尺度列からも同じ極限の部分列を取れるので、全尺度で局所弱収束します。

極限の平面測度は $\partial B_1$ に質量を置きません。したがって[球質量の収束](../GMT19/index.md#def-gmt19-vague)より

$$
\frac{\mu_E(B(x,r))}{r^m}=\mu_{x,r}(B_1)
\longrightarrow\widehat{\mathcal H}^{\,m}(V\cap B_1)=\omega_m.
$$

これで正規化の係数も確かめられました。$\square$
<!-- proof-end -->

この補題の強みは、**部分列の接測度が存在する**だけではなく、**任意の半径が同じ平面測度へ向かう**ことです。円錐の外側についても任意の小半径で誤差を小さくでき、後で一様な条件へ分割できます。

### 測度と面積を比較するための被覆

有限周長集合の境界がグラフで覆われても、そこに載る二つの測度の等しさは自動的には出ません。例えば直線上の重み付き長さ測度は同じグラフに載っていますが、通常の長さとは一致しません。必要なのは、**面積ゼロなら周長もゼロ**という絶対連続性と、その逆、そして面積の局所有限性です。

以下では $\sigma\ll\mu$ を「$\mu(A)=0$ なら $\sigma(A)=0$」と読みます。球の半径 $r$ による密度の上下界と、[GMT1の有界重複被覆補題](../GMT1/index.md#lem-gmt1-besicovitch-balls)がこの橋を作ります。

<a id="lem-gmt27-density-comparison"></a>

<!-- formal-statement-start -->
> **補題（球密度からの面積測度の比較）**
> 整数 $1\le m<d$、開集合 $\Omega\subset\mathbb R^d$ とする。$\mu$ は $\Omega$ 上の正Radon測度、$S\subset\Omega$ はBorel集合で $\mu(\Omega\setminus S)=0$ とし、すべての $x\in S$ で

$$
\lim_{r\downarrow0}\frac{\mu(B(x,r))}{\omega_mr^m}=1
$$

> が成り立つとする。ただし球は十分小さく $\Omega$ 内に収める。このとき $\sigma=c_m^{-1}\mathcal H^m\llcorner S$ は $\Omega$ 上で局所有限なRadon測度であり、$\mu\ll\sigma$ および $\sigma\ll\mu$ が成り立つ。ここで $\mathcal H^m$ は直径による非正規化Hausdorff測度、$c_m=\mathcal H^m([0,1]^m)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

下密度からは、中心を $S$ に持つ細球に周長が一定量あるので、球の直径の $m$ 乗の総和を有界重複被覆で制御します。上密度からは、面積ゼロ集合を細球で安く覆えば周長も小さいと分かります。上下を別々に使うことが要点です。

<!-- proof-start -->
### 証明

**(1) 局所有限性。** $K\Subset\Omega$ を固定し、$K$ の小さな閉近傍 $K_\delta$ が $\Omega$ に収まるよう $\delta>0$ を選びます。各 $x\in S\cap K$ について、密度の仮定から $0<r_x<\delta$ を任意に小さく選べ、

$$
\mu(B(x,r_x))\ge\frac{\omega_m}{2}r_x^m
$$

を満たします。[有界重複球被覆](../GMT1/index.md#lem-gmt1-besicovitch-balls)で、$S\cap K$ を覆う指定球の部分族 $\{B(x_i,r_i)\}$ を取り、各点での重なりを高々 $N_d$ とします。選んだ球は $K_\delta$ 内にあるため

$$
\begin{aligned}
\sum_i(2r_i)^m
&\le\frac{2^{m+1}}{\omega_m}\sum_i\mu(B(x_i,r_i))\\
&=\frac{2^{m+1}}{\omega_m}
\int\sum_i\boldsymbol{1}_{B(x_i,r_i)}\,d\mu\\
&\le\frac{2^{m+1}N_d}{\omega_m}\mu(K_\delta)<\infty.
\end{aligned}
$$

半径を一斉に任意の $\varepsilon>0$ 未満に選べるので、Hausdorff測度の定義で $\varepsilon\downarrow0$ とすれば

$$
\mathcal H^m(S\cap K)
\le\frac{2^{m+1}N_d}{\omega_m}\mu(K_\delta).
$$

従って $\sigma(K)<\infty$ です。Hausdorff測度はBorel正則で $S$ はBorelだから、その制限は局所有限Radon測度になります。

**(2) $\sigma\ll\mu$。** Borel集合 $A\subset S$ で $\mu(A)=0$ とします。局所化して $A$ を有界とし、$\mu$ の外正則性により $\mu(A)\le\mu(U)<\varepsilon$ となる開集合 $U\Subset\Omega$ を選びます（必要ならまずコンパクト領域の内側に $A$ を切り、その内部の開集合を取ります）。各 $x\in A$ で(1)の下密度を満たす球を $U$ 内に収まるほど小さく選びます。同じ有界重複被覆を $A$ に適用すれば

$$
\mathcal H^m(A)\le
\frac{2^{m+1}N_d}{\omega_m}\mu(U)
<\frac{2^{m+1}N_d}{\omega_m}\varepsilon.
$$

$\varepsilon\downarrow0$ で $\sigma(A)=0$ です。一般の $A$ は可算個のコンパクト領域内部への制限を合わせれば同じ結論になります。

**(3) $\mu\ll\sigma$。** 各自然数 $k$ に対し、$S_k$ を、すべての $0<r<1/k$ で

$$
\mu(B(x,r))\le2\omega_mr^m
$$

となる $x\in S$ の集合とします。上密度の仮定から $S=\bigcup_kS_k$ です。各固定 $r$ の球質量は中心 $x$ についてBorel可測で、半径を有理数に限っても球質量の下からの連続性により同じ条件になるため、$S_k$ はBorel集合です。

$\mathcal H^m(A)=0$ となるBorel集合 $A\subset S$ と $\varepsilon>0$ を取ります。$A\cap S_k$ を、中心 $x_i\in A\cap S_k$、半径 $r_i<1/k$ の可算個の球で覆い、直径コストを

$$
\sum_i(2r_i)^m<\varepsilon
$$

とできます。実際、Hausdorff零測度による十分細かい被覆の各集合から $A\cap S_k$ の点を選び、元の直径よりわずかに大きい半径の球へ置き換えます。定数倍のコスト増加を含めても、元の被覆をさらに安く取れば $\varepsilon$ 未満にできます。よって

$$
\mu(A\cap S_k)
\le\sum_i\mu(B(x_i,r_i))
\le2\omega_m\sum_i r_i^m
<\frac{2\omega_m}{2^m}\varepsilon.
$$

$\varepsilon\downarrow0$ で $\mu(A\cap S_k)=0$、$k$ について可算合併して $\mu(A)=0$ です。さらに $\mu$ は $S$ に集中するので、一般の $\sigma$-零集合についても $\mu\ll\sigma$ が従います。$\square$
<!-- proof-end -->

**使い分けの例。** 線分に沿う通常の長さは密度が内点で1です。長さに原点の点質量 $\delta_0$ を足すと、原点の球質量を $r$ で割った比が発散し、この補題の全点での**有限な上密度**が壊れます。一方、長さに定数2を掛けただけなら密度の極限は2であり、絶対連続性は残っても最終的な係数は1になりません。

## 3. 一点ごとの方向を、可算個のグラフに束ねる

$x\in\partial^*E$ の平面 $V_x=(\nu_E^*(x))^\perp$ を選ぶと、前補題の平坦極限から、$V_x$ から角度が離れた方向にある周長は小球で消えます。正確には[GMT15の円錐の記法](../GMT15/index.md#def-gmt15-approximate-tangent)を使い

$$
X(x,V,\alpha)=\{x\}\cup
\{y\ne x:\operatorname{dist}(y-x,V)<\alpha|y-x|\}
$$

と置きます。任意の $\alpha\in(0,1)$ に対し、前補題の局所弱収束を閉集合

$$
\{z\in\overline B_1:\operatorname{dist}(z,V_x)\ge\alpha|z|\}
$$

に適用すると、その極限測度は0です（平面と交わるのは原点だけで、平面測度に原子はありません）。したがって

$$
\lim_{r\downarrow0}r^{-m}
\mu_E(B(x,r)\setminus X(x,V_x,\alpha))=0.
$$

これは[GMT20の近似接平面判定](../GMT20/index.md#thm-gmt20-tangent-criterion)と同じ**円錐外質量の消失**ですが、今回は測度が $\mathcal H^m\llcorner S$ ではなく $\mu_E$ であるため、後のグラフ構成では必要な不等式を実際に確認します。

<a id="thm-gmt27-de-giorgi-structure"></a>

<!-- formal-statement-start -->
> **定理（De Giorgi構造定理：整流可能性と測度同定）**
> 整数 $d\ge2$、$m=d-1$ とする。$E\subset\mathbb R^d$ が開集合 $\Omega$ で局所有限周長を持つなら、その縮約境界 $S=\partial^*E\cap\Omega$ は可算 $m$-整流可能である。すなわち、可算個のLipschitz写像 $f_j:\mathbb R^m\to\mathbb R^d$ の像の合併によって、$S$ を $\mathcal H^m$-零集合を除いて覆える。
>
> さらに $\Omega$ 上のRadon測度として

$$
|D\chi_E|\llcorner\Omega
=\widehat{\mathcal H}^{\,m}\llcorner S
=c_m^{-1}\mathcal H^m\llcorner S,
\qquad c_m=\mathcal H^m([0,1]^m).
$$

> ベクトル値Gauss--Green測度も同じ集合上で

$$
-D\chi_E\llcorner\Omega
=\nu_E^*\,\widehat{\mathcal H}^{\,m}\llcorner S
$$

> と表される。ここで $\nu_E^*$ は縮約境界上の測度論的**外向き**単位法線である。
<!-- formal-statement-end -->

### 証明の見取り図

1. 平坦接測度の円錐外質量消失と周長の球密度下界を、可算個の方向・半径で一様化する。二点間の傾きを抑えてLipschitzグラフで覆う。
2. 周長とHausdorff面積を比較するため、上下の球密度と[有界重複被覆](../GMT1/index.md#lem-gmt1-besicovitch-balls)から両者の絶対連続性を得る。
3. 整流可能集合上の密度1と[Radon測度の微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)で、Radon--Nikodym密度を1に定める。最後にGauss--Green測度の外向き法線による表示へ戻す。

<!-- proof-start -->
### 証明

**(1) 可算グラフ被覆。** $S=\partial^*E\cap\Omega$、$\mu=\mu_E\llcorner\Omega$ とします。[縮約境界上の法線の平均振動と周長測度ほとんど至る所での存在](../GMT25/index.md#thm-gmt25-normal-mean)により $\mu(\Omega\setminus S)=0$ です。$S$ は球平均の極限で記述できるBorel集合です。実際、各固定半径の球質量とベクトル球質量は中心についてBorel可測であり、有理半径列と球の内側からの連続性によって、極限・単位長条件をBorel演算で表せます。

$m$ 次元平面全体 $G(d,m)$ は、[GMT7で直交射影とともに定義したGrassmann空間](../GMT7/index.md#def-gmt7-grassmann-projection)です。直交射影の作用素ノルムで距離を測るとコンパクトなので、可算稠密な平面 $\{V_j\}_{j\ge1}$ を選べます。任意の $x\in S$ の $V_x=(\nu_E^*(x))^\perp$ に対し、ある $j$ は $\|\pi_{V_j}-\pi_{V_x}\|<1/8$ を満たします。よって

$$
B(x,r)\setminus X(x,V_j,1/4)
\subset B(x,r)\setminus X(x,V_x,1/8).
$$

前段の円錐外質量の極限と[縮約境界での周長測度の平坦接測度](#lem-gmt27-flat-perimeter-tangent)から、すべての $x\in S$ で適切な $j$ を選べば

$$
\frac{\mu(B(x,r))}{r^m}\to\omega_m,\qquad
\frac{\mu(B(x,r)\setminus X(x,V_j,1/4))}{r^m}\to0.
$$

$a=\omega_m/2>0$、$\eta=a/2^{4m+1}$ を固定します。$j,l\ge1$ について、$F_{jl}\subset S$ を、**すべての** $0<r<1/l$ で

$$
\mu(B(x,r))\ge ar^m,\qquad
\mu(B(x,r)\setminus X(x,V_j,1/4))\le\eta r^m
$$

を満たす点の集合とします。各点で二つの極限が成立するため $S=\bigcup_{j,l}F_{jl}$ です。各 $F_{jl}$ を直径が $1/(2l)$ 未満の可算個の小立方体で切り、ひとつの片を $F$ と書きます。

異なる $x,y\in F$ に $h=|x-y|<1/(2l)$ と置きます。もし $\operatorname{dist}(y-x,V_j)\ge h/2$ なら、任意の $z\in B(y,h/8)$ について

$$
\operatorname{dist}(z-x,V_j)>3h/8,\qquad
|z-x|<9h/8,
$$

ゆえに $B(y,h/8)\subset B(x,2h)\setminus X(x,V_j,1/4)$ です。中心 $y$ の密度下界と中心 $x$ の円錐外上界を順に用いると

$$
a(h/8)^m\le\mu(B(y,h/8))
\le\eta(2h)^m,
\quad\text{すなわち}\quad a\le 2^{4m}\eta=a/2,
$$

となって矛盾します。この球の包含と矛盾は、[一様な密度・円錐条件から二点間の傾きが従う](../GMT20/index.md#lem-gmt20-cone-pair)という既習の論証を、今回の**測度 $\mu$** について再計算したものです。

従ってすべての異なる $x,y\in F$ について $\operatorname{dist}(y-x,V_j)<|x-y|/2$。直交射影 $\pi_{V_j}$ は $F$ 上で単射であり

$$
|\pi_{V_j^\perp}(y-x)|<\frac12|x-y|,
\qquad |\pi_{V_j}(y-x)|>\frac{\sqrt3}{2}|x-y|.
$$

射影像上の高さ関数を定めます。

$$
g_0(\pi_{V_j}x)=\pi_{V_j^\perp}x.
$$

上の直交成分・射影成分の評価から、$g_0$ のLipschitz定数は $1/\sqrt3$ 以下です。[局所円錐条件からLipschitzグラフへの包含](../GMT20/index.md#lem-gmt20-cone-graph)を適用して、$g_0$ を平面全体へ延長すると $F$ はそのグラフに入ります。

$V_j$ と $\mathbb R^m$ は等長に同一視できます。従って得られたグラフは $\mathbb R^m$ からのLipschitz写像の像です。

方向の番号 $j$、尺度の番号 $l$、小立方体はいずれも可算個です。[可算m-整流可能集合](../GMT12/index.md#def-gmt12-countably-rectifiable)の定義により $S$ は可算 $m$-整流可能です。この構成では $S$ の**全点**をグラフで覆えており、零集合を捨てる段階はありません。

**(2) 面積測度の局所有限性と絶対連続性。** [球密度比較補題](#lem-gmt27-density-comparison)を $\mu$ と $S$ に適用します。上で示したように $\mu$ は $S$ に集中し、[平坦接測度補題](#lem-gmt27-flat-perimeter-tangent)が $x\in S$ のすべての点で

$$
\lim_{r\downarrow0}\frac{\mu(B(x,r))}{\omega_mr^m}=1
$$

を与えます。したがって $\sigma=\widehat{\mathcal H}^{\,m}\llcorner S$ は局所有限Radon測度で、$\mu\ll\sigma$、$\sigma\ll\mu$ です。

**(3) 密度の同定。** $\mu\ll\sigma$ から局所的にRadon--Nikodym密度 $f=d\mu/d\sigma$ が存在します。[GMT1の測度微分定理](../GMT1/index.md#thm-gmt1-measure-differentiation)を分母 $\sigma$・分子 $\mu$ に適用して、$\sigma$-ほとんど至る所の $x$ で

$$
f(x)=\lim_{r\downarrow0}
\frac{\mu(B(x,r))}{\sigma(B(x,r))}.
$$

一方、$S$ の可算整流可能性と $\sigma$ の局所有限性が揃ったので、[局所有限な可算整流可能集合の密度と近似接平面](../GMT15/index.md#thm-gmt15-rectifiable-density-tangent)から $\sigma$-ほとんどすべての $x\in S$ で

$$
\frac{\sigma(B(x,r))}{\omega_mr^m}\to1.
$$

分子については(2)の全点密度を使い、比を分けると

$$
f(x)=\lim_{r\downarrow0}
\frac{\mu(B(x,r))/(\omega_mr^m)}
{\sigma(B(x,r))/(\omega_mr^m)}
=1.
$$

よって $\mu=\sigma$ が $\Omega$ 上のRadon測度として成立します。最後に $\mathcal G_E=\nu_E\mu_E$ と[縮約境界上の法線の一致](../GMT25/index.md#thm-gmt25-normal-mean)を用い、$\mathcal G_E=\nu_E^*\sigma$ を得ます。$\mathcal G_E=-D\chi_E$ なので符号も結論と一致します。$\square$
<!-- proof-end -->

被覆の証明では周長測度の**下密度**が二点間の方向を拘束し、最後の同定では整流可能性から得る**面積の密度1**が係数を決めました。仮に後者の段階を飛ばすと、同じグラフ上に重みを置いた別の測度でも円錐条件を満たしてしまいます。

## 4. 三つの境界で定理を試す

### 半空間――係数と符号を最短で確かめる

$H=\{z_d<0\}$ の境界は $z_d=0$、外向き法線は $e_d$ です。[平坦接測度補題](#lem-gmt27-flat-perimeter-tangent)の正規化 $r^{-m}$ は超平面上の面積をちょうど打ち消すので、任意の尺度で測度は不変です。$d=3$ では球と平面の交わりが半径 $r$ の円板になり、その周長測度の質量は $\pi r^2$ です。非正規化 $\mathcal H^2$ の質量は $c_2\pi r^2$ なので、$c_2^{-1}$ が不可欠です。

### 球――外向き法線は場所で変わってよい

$E=B(0,R)\subset\mathbb R^3$（$R>0$）では、[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から

$$
\partial^*E=\partial B(0,R),\quad
\nu_E^*(x)=\frac{x}{R},\quad
\mu_E(\mathbb R^3)=4\pi R^2.
$$

各点の接平面は $x^\perp$ で向きが違いますが、可算個のグラフに分けて覆えるので[De Giorgi構造定理](#thm-gmt27-de-giorgi-structure)の対象です。球面の非正規化Hausdorff測度は $c_2\,4\pi R^2$ で、これを $c_2$ で割ると周長に一致します。球面全体に**一つの固定接平面**がある、という意味ではありません。

### 角を持つ長方形――例外は周長を増やさない

$E=(0,a)\times(0,b)\subset\mathbb R^2$（$a,b>0$）では、各開辺の中点近くで外向き法線が一定です。角点では二方向の法線の球平均が長さ1にならず、[縮約境界の定義](../GMT25/index.md#def-gmt25-reduced-boundary)から外れます。それでも四隅の $\mathcal H^1$ は0、周長も0なので、

$$
\mu_E(\mathbb R^2)=2(a+b)
=\mathcal H^1(\partial^*E)
$$

です。「縮約境界が位相的境界と一致しない」ことと「周長を失う」ことを混同しないでください。

## 5. どの仮定を落とすと壊れるか

**集合の収束だけでは足りない。** $k\in\mathbb N$ に対し、$\mathbb R^2$ 上のグラフ下側の集合

$$
E_k=\{(u,t):t<k^{-1}\sin(ku)\}
$$

を考えます。固定された有界領域では $\chi_{E_k}\to\chi_{\{t<0\}}$ が $L^1$ で成り立ちますが、グラフの傾きは $\cos(ku)$ です。$u\in[-\pi,\pi]$ 上の周長は

$$
\int_{-\pi}^{\pi}\sqrt{1+\cos^2(ku)}\,du
=\int_{-\pi}^{\pi}\sqrt{1+\cos^2v}\,dv
>2\pi
$$

と一定の余剰長を持ちます。この例には、[GMT25の縮約境界点における法線平均の揃い方](../GMT25/index.md#thm-gmt25-normal-mean)を**列 $E_k$ に一様に適用できる**という仮定がありません。単なる $L^1$ 収束を[平坦接測度補題](#lem-gmt27-flat-perimeter-tangent)と取り違えないための反例です。

**密度だけでも足りない。** 固定直線上の通常の長さを2倍した測度は、正の有限密度も平坦な接測度も持ちます。しかし密度の極限が1でなく2なので、その直線の正規化面積とは等しくありません。最後の測度微分で係数を同定する段階が必要です。

## 6. 演習：円錐・被覆・正規化を再構成する

### Level A：符号と局所的な係数

<a id="ex-gmt27-a01"></a>
### GMT27-A01 半平面での測度同定

- Level: A

$H=\{(u,t)\in\mathbb R^2:t<0\}$、$x=(a,0)$ とする。$\partial^*H$、$\nu_H^*(x)$、$\mu_H(B(x,r))$、$\mathcal H^1(\partial^*H\cap B(x,r))$ を直接求め、符号と $c_1$ を検算せよ。

<!-- solution-start -->
#### 詳細解答

[半空間の縮約境界の直接例](../GMT25/index.md#def-gmt25-reduced-boundary)から

$$
\partial^*H=\{t=0\},\qquad \nu_H^*(x)=e_2.
$$

[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)を使うと

$$
\mathcal G_H=e_2\mathcal H^1\llcorner\{t=0\},\qquad
\mu_H=\mathcal H^1\llcorner\{t=0\}
$$

です。球との交わりは線分 $(a-r,a+r)\times\{0\}$ なので、両測度の球質量は $2r$。定数は[非正規化Hausdorff測度の比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)から $c_1=1$ です。符号が正の $e_2$ になるのは、$-D\chi_H$ が外向き法線を持つからです。
<!-- solution-end -->

<a id="ex-gmt27-a02"></a>
### GMT27-A02 三次元で係数を残す

- Level: A

$H=\{z_3<0\}\subset\mathbb R^3$ とし、$r>0$、$c_2=\mathcal H^2([0,1]^2)$ とする。$\mu_H(B(0,r))$ と $\mathcal H^2(\partial^*H\cap B(0,r))$ を求め、両者の正しい等式を書け。

<!-- solution-start -->
#### 詳細解答

水平平面と球の交わりは半径 $r$ の円板です。[非正規化Hausdorff測度のEuclid空間上での比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)から非正規化面積は $c_2\pi r^2$、[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から周長測度は通常の円板面積 $\pi r^2$ です。よって

$$
\mu_H(B(0,r))=\pi r^2
=c_2^{-1}\mathcal H^2(\partial^*H\cap B(0,r)).
$$

$c_2$ を勝手に1にすると教材内のHausdorff測度の定義と整合しません。
<!-- solution-end -->

<a id="ex-gmt27-a03"></a>
### GMT27-A03 球面と外向き法線

- Level: A

$E=B(0,R)\subset\mathbb R^3$、$R>0$ とする。$\nu_E^*(x)$、$\mu_E(\mathbb R^3)$、$\mathcal H^2(\partial^*E)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

球面の外向き単位法線は $x/R$ です（$|x|=R$）。球面の座標表示を

$$
F(\theta,\varphi)=(R\sin\theta\cos\varphi,\ R\sin\theta\sin\varphi,\ R\cos\theta),
\quad 0<\theta<\pi,\quad 0<\varphi<2\pi
$$

と取ります。$\theta$、$\varphi$ はそれぞれ極角・方位角で、偏微分では他方を固定します。座標表示 $F$ を各角度で偏微分して得る二つのベクトルは互いに直交し、

$$
|\partial_\theta F|=R,\qquad
|\partial_\varphi F|=R\sin\theta,\qquad
\partial_\theta F\cdot\partial_\varphi F=0.
$$

従って[GMT10の幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)から面積要素は

$$
\sqrt{R^2(R^2\sin^2\theta)}\,d\theta\,d\varphi
=R^2\sin\theta\,d\theta\,d\varphi
$$

です。$F$ は極と経度の切れ目を除いて1対1であり、それらの例外部分は面積零です。[GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)でこのJacobianを積分し、[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)を用いると

$$
\begin{aligned}
\mu_E(\mathbb R^3)
&=\int_0^{2\pi}\int_0^\pi R^2\sin\theta\,d\theta\,d\varphi\\
&=(2\pi)R^2[-\cos\theta]_0^\pi=4\pi R^2.
\end{aligned}
$$

[非正規化Hausdorff面積の比例](../GMT10/index.md#lem-gmt10-hausdorff-normalization)より $\mathcal H^2(\partial^*E)=c_2\,4\pi R^2$。従って $c_2^{-1}\mathcal H^2(\partial^*E)=\mu_E(\mathbb R^3)$ です。
<!-- solution-end -->

<a id="ex-gmt27-a04"></a>
### GMT27-A04 長方形の角を除く

- Level: A

$E=(0,2)\times(0,3)$ とする。$\partial^*E$ を記述し、位相的境界との差集合の $\mathcal H^1$-測度、$\mu_E(\mathbb R^2)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

四本の開辺では球内の境界が一直線で、法線平均はその辺の一定単位法線です。例えば左辺では $-e_1$ です。角点の十分小さい球には、互いに直交する外向き法線 $n_1,n_2$ の二本の辺がそれぞれ長さ $r$ だけ入ります。従って

$$
N_r(E,x)=\frac{rn_1+rn_2}{2r}=\frac{n_1+n_2}{2},\qquad
|N_r(E,x)|^2=\frac{1+1+2n_1\cdot n_2}{4}=\frac12.
$$

角点では[縮約境界の単位長条件](../GMT25/index.md#def-gmt25-reduced-boundary)を満たしません。従って $\partial^*E$ は四本の開辺の合併で、差は四隅です。一点の $\mathcal H^1$ は0なので差の測度も0。辺の長さの和は $2+3+2+3=10$、[境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)を辺ごとに適用して $\mu_E(\mathbb R^2)=10$ です。
<!-- solution-end -->

<a id="ex-gmt27-a05"></a>
### GMT27-A05 円錐の外に球を入れる

- Level: A

$V\subset\mathbb R^d$ を線形平面、$h=|y-x|>0$ とし、$\operatorname{dist}(y-x,V)\ge h/2$ とする。$z\in B(y,h/8)$ について $\operatorname{dist}(z-x,V)/|z-x|>1/4$ と $|z-x|<2h$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

距離関数 $u\mapsto\operatorname{dist}(u,V)$ は1-Lipschitzなので

$$
\operatorname{dist}(z-x,V)
\ge\operatorname{dist}(y-x,V)-|z-y|
>h/2-h/8=3h/8.
$$

三角不等式で $|z-x|\le|z-y|+|y-x|<h/8+h=9h/8<2h$ です。従って比は $>(3/8)/(9/8)=1/3>1/4$。これは $B(y,h/8)\subset B(x,2h)\setminus X(x,V,1/4)$ を意味し、[二点円錐補題](../GMT20/index.md#lem-gmt20-cone-pair)の幾何部分です。
<!-- solution-end -->

### Level B：主要証明の橋を自分で架ける

<a id="ex-gmt27-b01"></a>
### GMT27-B01 平坦測度の再尺度化をテスト関数で調べる

- Level: B

$n\in\mathbb R^d$ を単位ベクトル、$V=n^\perp$、$H=\{z:z\cdot n<0\}$ とする。$x\in V$、$r>0$ と $\varphi\in C_c(\mathbb R^d)$ に対し、$r^{1-d}(T_{x,r})_\#\mu_H$ が $\widehat{\mathcal H}^{\,d-1}\llcorner V$ に等しいことを積分で示せ。

<!-- solution-start -->
#### 詳細解答

$m=d-1$ です。[半空間の周長表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から $\mu_H=\widehat{\mathcal H}^{\,m}\llcorner V$。定義より

$$
\int\varphi(z)\,d[r^{-m}(T_{x,r})_\#\mu_H](z)
=r^{-m}\int_V\varphi((y-x)/r)\,d\widehat{\mathcal H}^{\,m}(y).
$$

$y=x+rz$ と置くと、$x\in V$ で $V$ は線形だから $z\in V$ です。[Hausdorff測度の斉次性](../GMT10/index.md#lem-gmt10-hausdorff-normalization)で面積要素は $r^m$ 倍になり、右辺は

$$
r^{-m}r^m\int_V\varphi(z)\,d\widehat{\mathcal H}^{\,m}(z)
=\int_V\varphi(z)\,d\widehat{\mathcal H}^{\,m}(z).
$$

すべてのコンパクト台連続 $\varphi$ で一致するため測度が等しいです。
<!-- solution-end -->

<a id="ex-gmt27-b02"></a>
### GMT27-B02 下密度と円錐外上界を衝突させる

- Level: B

正Radon測度 $\mu$、$m\ge1$、$a,\rho>0$、$\eta<a/2^{4m}$ があり、集合 $F$ の各 $x$ と $0<r<\rho$ で $\mu(B(x,r))\ge ar^m$ と $\mu(B(x,r)\setminus X(x,V,1/4))\le\eta r^m$ が成立するとする。$x,y\in F$、$0<|x-y|<\rho/2$ なら $\operatorname{dist}(y-x,V)<|x-y|/2$ を示せ。

<!-- solution-start -->
#### 詳細解答

$h=|x-y|$、逆に直交成分が $h/2$ 以上と仮定します。演習[A05](#ex-gmt27-a05)で確認した球包含から

$$
B(y,h/8)\subset B(x,2h)\setminus X(x,V,1/4).
$$

$h/8<\rho$、$2h<\rho$ なので、中心 $y$ の下界と中心 $x$ の上界をそれぞれ適用でき、

$$
\frac{a}{8^m}h^m
\le\mu(B(y,h/8))
\le\eta(2h)^m.
$$

$h>0$ で割ると $\eta\ge a/(8^m2^m)=a/2^{4m}$ となって仮定と矛盾。従って二点の差は $V$ に沿う円錐に入り、[グラフ延長補題](../GMT20/index.md#lem-gmt20-cone-graph)を適用できます。元の[GMT20の二点円錐補題](../GMT20/index.md#lem-gmt20-cone-pair)はHausdorff測度を仮定しますが、この計算はその性質を使わず、任意の正測度へ適用できることも確認しました。
<!-- solution-end -->

<a id="ex-gmt27-b03"></a>
### GMT27-B03 下密度から局所有限面積を得る

- Level: B

有界な $S\subset K\Subset\Omega$、正Radon測度 $\mu$、整数 $m<d$ を考える。各 $x\in S$ に対し、任意に小さい $r$ で $\mu(B(x,r))\ge ar^m$（$a>0$ は共通）とできるとする。球の重複を高々 $N_d$ とする被覆を使い、$\mathcal H^m(S)\le 2^mN_da^{-1}\mu(K_\delta)$ を示せ。ただし $K_\delta\Subset\Omega$ は $K$ の小さな近傍である。

<!-- solution-start -->
#### 詳細解答

任意の $\varepsilon\in(0,\delta)$ を取り、各 $x\in S$ で $0<r_x<\varepsilon$ かつ $\mu(B(x,r_x))\ge ar_x^m$ を選びます。[Euclid球の有界重複被覆](../GMT1/index.md#lem-gmt1-besicovitch-balls)から、選択球 $\{B_i\}$ は $S$ を覆い、$\sum_i\boldsymbol{1}_{B_i}\le N_d$ です。すべて $K_\delta$ 内だから

$$
\sum_i(2r_i)^m
\le\frac{2^m}{a}\sum_i\mu(B_i)
\le\frac{2^mN_d}{a}\mu(K_\delta).
$$

選んだ球の直径は $2\varepsilon$ 未満です。Hausdorff外測度の定義で $\varepsilon\downarrow0$ とすれば、要求された不等式になります。下密度を**ある固定半径だけ**で仮定しても $\varepsilon$ を任意に小さくできず、この証明は閉じません。
<!-- solution-end -->

<a id="ex-gmt27-b04"></a>
### GMT27-B04 上密度から周長の絶対連続性を得る

- Level: B

$\mu$ はBorel集合 $S\subset\mathbb R^d$ に集中する正Radon測度とし、すべての $x\in S$ で $\limsup_{r\downarrow0}\mu(B(x,r))/r^m\le C$ とする。$\mathcal H^m(A)=0$ となるBorel集合 $A$ なら $\mu(A)=0$ を示せ。

<!-- solution-start -->
#### 詳細解答

$C_1>C$ を固定し、$S_k=\{x\in S:\mu(B(x,r))\le C_1r^m\ \text{for all }0<r<1/k\}$ と置きます。上密度の仮定から $S=\bigcup_kS_k$ です。$A_k=A\cap S_k$ はHausdorff零集合なので、各 $\varepsilon>0$ に対し中心 $x_i\in A_k$ と $r_i<1/k$ を選び、$A_k\subset\bigcup_iB(x_i,r_i)$、$\sum_i(2r_i)^m<\varepsilon$ とできます。従って

$$
\mu(A_k)\le\sum_i\mu(B(x_i,r_i))
\le C_1\sum_i r_i^m
<C_1\,2^{-m}\varepsilon.
$$

$\varepsilon\downarrow0$ で $\mu(A_k)=0$、$k$ について可算合併を取って $\mu(A\cap S)=0$。さらに $\mu(\mathbb R^d\setminus S)=0$ なので $\mu(A)=0$ です。必要なのは上密度であり、下密度を使った[演習B03](#ex-gmt27-b03)とは逆方向です。
<!-- solution-end -->

### Level C：局所結果から全体定理へ

<a id="ex-gmt27-c01"></a>
### GMT27-C01 多角形でのGauss--Green測度と縮約境界

- Level: C

$E=(0,a)\times(0,b)\subset\mathbb R^2$（$a,b>0$）とする。四辺を $S_L,S_R,S_B,S_T$（角を除いた開辺）と書く。次を示せ。

1. $\partial^*E$ と各辺の外向き法線を求めよ。
2. 任意の $\varphi\in C_c^1(\mathbb R^2;\mathbb R^2)$ について、次を座標積分から確かめよ。

   $$
   \int_E\operatorname{div}\varphi
   =\int_{\partial^*E}\varphi\cdot\nu_E^*\,d\mathcal H^1
   $$

3. 周長を求めよ。

<!-- solution-start -->
#### 詳細解答

$(i)$ 開辺の点では法線平均は辺の法線に等しく、角点では半径 $r$ の小球に直交する外向き法線 $n_1,n_2$ を持つ二辺が各長さ $r$ だけ入ります。従って法線平均は $(n_1+n_2)/2$ で、二乗長が $(1+1+2n_1\cdot n_2)/4=1/2$ となり、[縮約境界の定義](../GMT25/index.md#def-gmt25-reduced-boundary)の単位長条件を満たしません。従って $\partial^*E=S_L\cup S_R\cup S_B\cup S_T$ です。法線は順に $-e_1,e_1,-e_2,e_2$ です。

$(ii)$ $\varphi=(\varphi_1,\varphi_2)$ とし、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)と一変数の微積分学の基本定理で

$$
\begin{aligned}
\int_E\operatorname{div}\varphi\,du\,dt
&=\int_0^b[\varphi_1(a,t)-\varphi_1(0,t)]\,dt\\
&\quad+\int_0^a[\varphi_2(u,b)-\varphi_2(u,0)]\,du.
\end{aligned}
$$

右辺の四項は順に $S_R,S_L,S_T,S_B$ 上で $\varphi\cdot\nu_E^*$ を積分したものです。角点は一点集合で $\mathcal H^1$-零なので寄与しません。これで[Gauss--Greenの符号規約](../GMT24/index.md#thm-gmt24-gauss-green)とも一致します。

$(iii)$ 四辺の長さを足すと

$$
P(E;\mathbb R^2)
=a+a+b+b=2(a+b).
$$

$c_1=1$ なので $\mathcal H^1(\partial^*E)=2(a+b)$ であり、[De Giorgi構造定理](#thm-gmt27-de-giorgi-structure)の測度同定も具体的に検算できました。
<!-- solution-end -->

<a id="ex-gmt27-c02"></a>
### GMT27-C02 微小振幅でも余分な周長が残る

- Level: C

整数 $k\ge1$ に対して $E_k=\{(u,t)\in\mathbb R^2:t<k^{-1}\sin(ku)\}$、$H=\{t<0\}$ とし、$Q=(-\pi,\pi)\times(-2,2)$ とする。次を示せ。

1. $\|\chi_{E_k}-\chi_H\|_{L^1(Q)}$ を求めよ。
2. $\mu_{E_k}(Q)$ を求めよ。
3. 集合の $L^1$ 収束だけから周長測度の弱収束や測度同定を主張できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$(i)$ 両指示関数が異なるのは、各 $u$ に対し高さ0と $k^{-1}\sin(ku)$ の間の縦区間です。振幅は $1/k\le1<2$ なので区間全体が $Q$ に収まり、

$$
\begin{aligned}
\|\chi_{E_k}-\chi_H\|_{L^1(Q)}
&=\frac1k\int_{-\pi}^{\pi}|\sin(ku)|\,du\\
&=\frac1{k^2}\int_{-k\pi}^{k\pi}|\sin v|\,dv
=\frac4k\longrightarrow0.
\end{aligned}
$$

$(ii)$ グラフ関数 $f_k(u)=k^{-1}\sin(ku)$ の導関数は、$u$ に関する一変数微分として

$$
f_k'(u)=\frac{df_k}{du}(u)=\cos(ku)
$$

です。パラメータ表示 $\gamma_k(u)=(u,f_k(u))$ の速度は $\gamma_k'(u)=(1,\cos(ku))$ なので、[Lipschitz曲線のarea formula](../GMT11/index.md#thm-gmt11-area-formula)（GMT20の前提閉包で既習）を適用すると

$$
\begin{aligned}
\mu_{E_k}(Q)
&=\int_{-\pi}^{\pi}\sqrt{1+|f_k'(u)|^2}\,du\\
&=\frac1k\int_{-k\pi}^{k\pi}\sqrt{1+\cos^2 v}\,dv\\
&=\int_{-\pi}^{\pi}\sqrt{1+\cos^2 v}\,dv>2\pi.
\end{aligned}
$$

第2行では $v=ku$、$dv=k\,du$ と置換し、第3行では被積分関数の周期が $\pi$ で、積分区間が $2k$ 周期分であることを使いました。不等号は $\cos v\ne0$ が正の長さの集合で成立するため厳密です。一方 $\mu_H(Q)=2\pi$ です。

$(iii)$ ここで単に球や矩形の質量を比較するだけでは、弱収束が失敗した証明としては不十分です。そこで

$$
M=\frac1{2\pi}\int_{-\pi}^{\pi}\sqrt{1+\cos^2v}\,dv>1
$$

と置き、$0<\delta<\pi(M-1)/\sqrt2$ を選びます。$0\le\varphi\le1$、$\varphi=1$ が $[-\pi+\delta,\pi-\delta]\times[-1,1]$ 上で成り立ち、$\operatorname{supp}\varphi\Subset Q$ となる連続関数 $\varphi$ を取ります。$E_k$ のグラフの高さは常に $[-1,1]$ にあるので、(ii)の全周長積分から幅 $\delta$ の両端を除けば

$$
\begin{aligned}
\int\varphi\,d\mu_{E_k}
&\ge\int_{-\pi+\delta}^{\pi-\delta}
\sqrt{1+\cos^2(ku)}\,du\\
&\ge2\pi M-2\delta\sqrt2
>2\pi\ge\int\varphi\,d\mu_H.
\end{aligned}
$$

これはすべての $k$ で同じ正の差が残るコンパクト台テスト関数なので、$\mu_{E_k}\rightharpoonup_{\mathrm v}\mu_H$ は成り立ちません。[平坦接測度補題](#lem-gmt27-flat-perimeter-tangent)は**固定した一つの有限周長集合の縮約境界点で、法線平均も揃う**場合の主張です。この例では $k$ とともに法線が振動し、必要な条件を欠いています。
<!-- solution-end -->

## 7. 次の講義へ

これで、有限周長集合の境界について「どこに法線があるか」「どのような曲面で覆えるか」「その曲面の面積と周長測度が一致するか」が一つの定理になりました。次のGMT28では、この結果を使ってGauss--Greenの弱い積分公式を実際の境界積分へ書き換え、集合の和・共通部分・切断で境界を二重に数えない条件を調べます。
