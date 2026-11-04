# QFT41 QCDの色表現・クォークとグルーオンの頂点・走る強結合

[QFT28のYang–Mills曲率](../QFT28/index.md#def-qft28-curvature)は非可換ゲージ場自身の相互作用を説明しました。[QFT35の標準模型の表現](../QFT35/index.md#def-qft35-representation)では、クォークが色の基本表示に属することを確認しました。では、ゲージ場とクォークを同じ作用に入れると、どの散乱が起こり、強さはエネルギーでどう変わるのでしょうか。

本講の中心は**量子色力学（QCD）**です。色は可視光の色ではなく、内部対称性 $SU(3)_c$ の三成分を区別する名前です。色三成分のクォーク、八成分のグルーオン、群の行列、散乱の色平均を一つの計算につなぎます。その後、純ゲージ理論の一ループ結果にクォークループを加え、どこまでが摂動論で確かめられた主張かを分離します。

以下、四次元Minkowski時空で計算し、計量の符号は $\eta=\operatorname{diag}(-1,1,1,1)$、自然単位系は $\hbar=c=1$ とします。[QFT7のDirac随伴](../QFT7/index.md#def-qft7-adjoint-action)に従い、$\{\gamma^\mu,\gamma^\nu\}=2\eta^{\mu\nu}I_4$、$\bar q=-iq^\dagger\gamma^0$ とします。共変微分と生成子の規約は

$$
D_\mu=\partial_\mu-ig_sG_\mu^At^A,\qquad
g_s>0,\qquad
\operatorname{tr}(t^At^B)=\frac12\delta^{AB}
$$

です。$t^A$ はHermitianな $3\times3$ 行列で、随伴色添字は $A,B=1,\ldots,8$ を動きます。基本色添字は $a,b=1,2,3$、Lorentz添字は $\mu,\nu=0,1,2,3$ です。これらが反復するとそれぞれの範囲で和を取り、フレーバー $f$ の和は $\sum_f$ で明記します。

木レベルの外線にはFeynmanの $i0$ 処方を使います。一ループ計算ではゲージ対称性を保つ次元正則化と質量非依存の減算を仮定します。

## 1. 三色のクォークと八つのゲージ場

まず基本表示のクォーク $q=(q^1,q^2,q^3)^T$ は、局所的な $U(x)\in SU(3)$ によって $q'=Uq$ と変わります。添字 $a=1,2,3$ は**色添字**であり、Diracスピノルの添字やフレーバー（$u,d,s,\ldots$）のラベルではありません。反クォークは複素共役の**反基本表示**に属し、内部変換は $U^*$ です。[QFT40の右巻き場を共役表現で数える操作](../QFT40/index.md#def-qft40-left-handed-list)は異常計算の記法であって、ここでクォークと反クォークの物理的な状態を区別することと混同しません。

一方、グルーオン場 $G_\mu=G_\mu^At^A$ は行列値です。[非可換ゲージ変換則](../QFT28/index.md#thm-qft28-gauge-covariance)から $G_\mu$ の八つの係数は互いに混ざり、**随伴表示**をなします。これは $3\times3=9$ 種類のグルーオンを意味しません。Hermitianで跡零の行列の実次元は $3^2-1=8$ だからです。

ここで $f^{ABC}$ はフレーバー添字 $f$ と無関係な**構造定数**で、生成子の交換子 $[t^A,t^B]=if^{ABC}t^C$ によって決まる実数です。[QFT28の曲率の定義](../QFT28/index.md#def-qft28-curvature)に $SU(3)$ の生成子を代入し、$[D_\mu,D_\nu]q=-ig_sG_{\mu\nu}q$ を成分で展開すると、以下の偏微分項と $g_sf^{ABC}G_\mu^BG_\nu^C$ が現れます。したがって曲率の成分は任意に選んだ八つの独立なテンソルではありません。

<a id="def-qft41-qcd-action"></a>

<!-- formal-statement-start -->
> **定義（QCDの色場と作用）**
> 有限個のDiracフレーバー $f$ の質量 $m_f\ge0$、それぞれ色の基本表示 $\mathbf3$ に属する場 $q_f^a$、滑らかな $SU(3)$ 接続 $G_\mu=G_\mu^At^A$ を考える。曲率 $G_{\mu\nu}^A$ と古典QCD作用を

$$
\begin{aligned}
G_{\mu\nu}^A&=\partial_\mu G_\nu^A-\partial_\nu G_\mu^A
+g_s f^{ABC}G_\mu^BG_\nu^C,\\
S_{\rm QCD}&=\int d^4x\left[
-\frac14G_{\mu\nu}^AG^{A\mu\nu}
+\sum_f\bar q_f(\gamma^\mu D_\mu-m_f)q_f
\right],\\
D_\mu q_f&=(\partial_\mu-ig_sG_\mu^At^A)q_f
\end{aligned}
$$

> で定める。生成子は $[t^A,t^B]=if^{ABC}t^C$ に従う。これは古典作用の定義であり、無限次元の量子理論の非摂動的構成を主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft41-qcd-action -->
### 例：二つの対角色方向

**定義の確認**：対角なHermitian・跡零行列は $\operatorname{diag}(r_1,r_2,-r_1-r_2)$（$r_1,r_2\in\mathbb R$）の形なので、独立な方向は二つです。その二方向を跡内積 $\operatorname{tr}(XY)$ で直交規格化した基底として、次を選びます。この行列が色基底 $e_1,e_2,e_3$ に作用するので、対角成分が変換位相を決める固有値になります。

$$
t^3=\frac12\operatorname{diag}(1,-1,0),\qquad
t^8=\frac1{2\sqrt3}\operatorname{diag}(1,1,-2)
$$

と選びます。どちらもHermitian、跡零です。二乗の跡はそれぞれ $1/2$、積の跡は $(1-1+0)/(4\sqrt3)=0$。$U=\exp(i\theta t^3)$ は対角成分 $(e^{i\theta/2},e^{-i\theta/2},1)$ を持ち、$U^\dagger U=I$ かつ $\det U=1$ です。従って $q^1,q^2,q^3$ は順に電荷 $1/2,-1/2,0$ のような位相を受けますが、これらは電磁電荷ではありません。反基本表示の生成子は $-(t^A)^*$ なので同じ対角方向の固有値は符号が逆になります。定義の変換・生成子条件を一つずつ確かめました。

曲率の非可換項も局所的に検査します。$t^1=(e_{12}+e_{21})/2$、$t^2=(-ie_{12}+ie_{21})/2$ と置きます。ここで $e_{ij}$ は $(i,j)$ 成分だけが1の行列で、$[t^1,t^2]=it^3$ が行列の積から確かめられます。ある点の近傍で $G_1=h_1t^1$、$G_2=h_2t^2$（実定数 $h_1,h_2$）、ほかの $G_\mu=0$ とすれば、偏微分が零でも

$$
[D_1,D_2]q=-g_s^2[G_1,G_2]q=-ig_s(g_sh_1h_2t^3)q,
\qquad G_{12}^3=g_sh_1h_2,\quad G_{21}^3=-g_sh_1h_2.
$$

つまり接続の交換子から曲率成分を判定する理由と、曲率の反対称性が直接確かめられます。これは局所的な場の例であり、時空全体で一定の場の作用積分が有限であるとは仮定していません。
<!-- definition-example-end -->

作用のゲージ不変性も確認しましょう。[QFT28の共変性](../QFT28/index.md#thm-qft28-gauge-covariance)から $D'_\mu q'_f=UD_\mu q_f$、$\bar q'_f=\bar q_fU^\dagger$ です。従って $\bar q'_f\gamma^\mu D'_\mu q'_f=\bar q_fU^\dagger U\gamma^\mu D_\mu q_f$ で、質量項も不変です。[曲率の共変変換](../QFT28/index.md#thm-qft28-curvature-bianchi) $G'_{\mu\nu}=UG_{\mu\nu}U^{-1}$ と跡の巡回性から $\operatorname{tr}(G'_{\mu\nu}G'^{\mu\nu})=\operatorname{tr}(G_{\mu\nu}G^{\mu\nu})$。実際、$\operatorname{tr}(t^At^B)=\delta^{AB}/2$ なので $-\operatorname{tr}(G_{\mu\nu}G^{\mu\nu})/2=-G_{\mu\nu}^AG^{A\mu\nu}/4$ です。この二つを足した作用が不変になります。

## 2. 色行列を何倍すると散乱の係数になるか

粒子を結ぶ頂点に $t^A$ が現れます。観測される散乱確率を得るには、その色行列を始状態で平均し、終状態で和を取ります。行列をただ「8個」と数えるだけでは正しい係数になりません。

基本表示の生成子が何を測るかを固定します。以下では $i,j,k,l$ も基本色添字 $1,2,3$ で、$A,B$ は随伴色添字 $1,\ldots,8$ です。$C_F$ は基本表現の三次元空間に作用する行列の和、[QFT30で導入した $C_A$](../QFT30/index.md#def-qft30-adjoint-casimir) は八次元の随伴表示に由来する量です。どちらも二次Casimirと呼びますが、作用する表示が異なります。

<a id="def-qft41-color-invariants"></a>

<!-- formal-statement-start -->
> **定義（色の二次不変量）**
> $SU(3)$ のHermitian基本生成子 $t^A$ を $\operatorname{tr}(t^At^B)=T_F\delta^{AB}$ と規格化し、$T_F=1/2$ とする。基本表示の二次Casimir $C_F$ と随伴表示の二次Casimir $C_A$ を

$$
\sum_A t^At^A=C_FI_3,\qquad
\sum_{C,D}f^{ACD}f^{BCD}=C_A\delta^{AB}
$$

> で定義する。$T_F$ は**跡の係数**、$C_F$ は**基本表示で生成子を二回掛けた和**、$C_A$ は**構造定数の二次和**であり、同じ量ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft41-color-invariants -->
### 例：対角成分だけでも三つの不変量を混同できない

**定義の確認**：上の $t^3$ について $\operatorname{tr}[(t^3)^2]=1/2$ なので $T_F=1/2$ という規格化を直接満たします。

一方、$\sum_A(t^At^A)_{11}$ は $A=3$ 一個の $1/4$ ではなく八個すべての和です。前節の行列単位 $e_{ij}$ を用い、三組の色対 $(i,j)=(1,2),(1,3),(2,3)$ ごとに

$$
t_{ij}^{(x)}=\frac{e_{ij}+e_{ji}}2,\quad
t_{ij}^{(y)}=\frac{-ie_{ij}+ie_{ji}}2,\quad
(t_{ij}^{(x)})^2+(t_{ij}^{(y)})^2=\frac{e_{ii}+e_{jj}}2
$$

と置くと、六つの非対角生成子の二乗和は $I_3$ です。残る対角二つは $(t^3)^2+(t^8)^2=I_3/3$ なので、八つを合わせて $\sum_A t^At^A=(4/3)I_3$、従って $C_F=4/3$ です。以下の完全性関係からも基底を列挙せずに同じ結果を導きます。

さらに[QFT30の随伴Casimir](../QFT30/index.md#def-qft30-adjoint-casimir)は $SU(N)$ で $C_A=N$ なので $SU(3)$ では $3$ です。それぞれ定義する作用空間と縮約が異なるため、これらを一つの「色因子」にまとめてはいけません。
<!-- definition-example-end -->

<a id="lem-qft41-su3-completeness"></a>

<!-- formal-statement-start -->
> **補題（SU(3)基本生成子の完全性関係）**
> 上記の基本表示の規格化を満たす八つの生成子について、全ての色添字 $i,j,k,l$ で

$$
\sum_{A=1}^8(t^A)_{ij}(t^A)_{kl}
=\frac12\left(\delta_{il}\delta_{jk}
-\frac13\delta_{ij}\delta_{kl}\right)
$$

> が成り立つ。特に $C_F=4/3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

跡零のHermitian行列8個と単位行列を合わせれば、$3\times3$ 複素行列空間の九つの直交基底になります。完全性から単位行列成分を引き、最後に中間添字を縮約します。

<!-- proof-start -->
### 証明

$E^0=I_3/\sqrt6$、$E^A=t^A$ と置くと $\operatorname{tr}(E^ME^N)=\delta^{MN}/2$（$M,N=0,\ldots,8$）です。Hermitian行列9個は複素ベクトル空間 $M_3(\mathbb C)$ の基底でもあります。Hilbert–Schmidt内積 $\operatorname{tr}(X^\dagger Y)$ に関して $\sqrt2E^M$ は正規直交基底なので、各行列単位 $e_{lk}$ の成分展開の完全性は

$$
\sum_{M=0}^8 (E^M)_{ij}(E^M)_{kl}
=\frac12\delta_{il}\delta_{jk}.
$$

ここではHermitian性 $(E^M)_{lk}^*=(E^M)_{kl}$ を用いました。$M=0$ の積は $\delta_{ij}\delta_{kl}/6$ なので、これを引けば所望の式です。$j=k$ として $j$ を和に取ると

$$
\begin{aligned}
\left(\sum_A t^At^A\right)_{il}
&=\sum_{A,j}(t^A)_{ij}(t^A)_{jl}\\
&=\frac12\sum_j\left(\delta_{il}\delta_{jj}
-\frac13\delta_{ij}\delta_{jl}\right)
=\frac12\left(3-\frac13\right)\delta_{il}
=\frac43\delta_{il}.
\end{aligned}
$$

従って定義した $C_F$ は $4/3$ です。
<!-- proof-end -->

完全性関係は「色がランダムだから $1/3$」という推測では得られません。交換項 $\delta_{il}\delta_{jk}$ と跡を差し引く項 $-\delta_{ij}\delta_{kl}/3$ の両方が必要です。

## 3. 作用から頂点を取り出す

自由伝播と相互作用を分けるため、[QFT7のDirac作用](../QFT7/index.md#def-qft7-adjoint-action)の運動項に、[QFT28のYang–Mills自己相互作用](../QFT28/index.md#prop-qft28-self-interactions)を加えます。$\gamma^\mu D_\mu=\gamma^\mu\partial_\mu-ig_s\gamma^\mu G_\mu^At^A$ だから、クォークとグルーオンが接する三点項は $-ig_s\bar q\gamma^\mu t^AqG_\mu^A$ です。物理的な実色電流を $J^{A\mu}=-i\bar q\gamma^\mu t^Aq$ と書けば $\mathcal L_{q\bar qG}=g_sJ^{A\mu}G_\mu^A$ であり、$-i$ は[QFT17の電磁電流と頂点](../QFT17/index.md#def-qft17-vertex)と同じDirac規約に由来します。共変微分の符号を逆にした教科書と、頂点だけを比較してはいけません。

<a id="prop-qft41-vertices"></a>

<!-- formal-statement-start -->
> **命題（QCD相互作用の頂点と結合次数）**
> [QCD作用](#def-qft41-qcd-action)をグルーオンの自由曲率 $K_{\mu\nu}^A=\partial_\mu G_\nu^A-\partial_\nu G_\mu^A$ の次数で分解すると

$$
\begin{aligned}
\mathcal L_{q\bar qG}
&=-ig_s\sum_f\bar q_f^a\gamma^\mu(t^A)_{ab}q_f^bG_\mu^A,\\
\mathcal L_{GGG}
&=-\frac{g_s}{2}f^{ABC}K_{\mu\nu}^AG^{B\mu}G^{C\nu},\\
\mathcal L_{GGGG}
&=-\frac{g_s^2}{4}f^{ABC}f^{ADE}
G_\mu^BG_\nu^CG^{D\mu}G^{E\nu}.
\end{aligned}
$$

> ここで $a,b$ は基本色、$A,\ldots,E$ は随伴色である。外線を全て入射として Fourier 変換したとき、クォーク–反クォーク–グルーオン頂点の係数は本講の規約で $+g_s\gamma^\mu(t^A)_{ab}$ であり、三グルーオン頂点は $g_s$ 一次、四グルーオン頂点は $g_s^2$ 次である。
<!-- formal-statement-end -->

### 証明の見取り図

共変微分の一項と、曲率 $K+g_s fGG$ の平方を別々に展開します。頂点因子は相互作用作用を摂動展開する際の $i\mathcal L_{\rm int}$ から生じます。

<!-- proof-start -->
### 証明

Dirac項は色添字を示すと

$$
\begin{aligned}
\bar q^a\gamma^\mu(\partial_\mu\delta_{ab}
-ig_sG_\mu^A(t^A)_{ab})q^b
&=\bar q^a\gamma^\mu\partial_\mu q^a\\
&\quad-ig_s\bar q^a\gamma^\mu(t^A)_{ab}q^bG_\mu^A.
\end{aligned}
$$

右辺第二項をDyson展開の $i\int\mathcal L_{\rm int}$ に一回挿入すると $i(-i)=+1$ から頂点 $+g_s\gamma^\mu t^A$ です。フレーバーを変える行列はここにないのでこの頂点はフレーバー対角です。

一方、$G_{\mu\nu}^A=K_{\mu\nu}^A+g_sf^{ABC}G_\mu^BG_\nu^C$ を $-G_{\mu\nu}^AG^{A\mu\nu}/4$ に代入すると、$K^2$、$2g_s K(fGG)$、$g_s^2(fGG)^2$ が順に二次・三次・四次項になります。これらに $-1/4$ を掛けて表示の二項を得ます。特に可換な $U(1)$ なら $f^{ABC}=0$ となり、後二者は消えます。
<!-- proof-end -->

グルーオンの具体的なローレンツテンソルを必要とする際には、三点頂点に運動量差が付くことを確認します。三本の全て入射する運動量を $p+q+r=0$、Lorentz添字を $\mu,\nu,\rho$ とすると、**共通する $g_sf^{ABC}$ を除いた**運動量多項式は

$$
V_{\mu\nu\rho}(p,q,r)
=\eta_{\mu\nu}(p-q)_\rho
+\eta_{\nu\rho}(q-r)_\mu
+\eta_{\rho\mu}(r-p)_\nu.
$$

これは $K_{\mu\nu}$ の微分がFourier変換で運動量になることと、三本の脚の置換を足した結果です。頂点全体の $i$ の有無と全体符号は、Fourier指数と本講の $D_\mu$ に合わせて揃える必要があります。以下の異種クォーク散乱では三グルーオン頂点を使わず、クォーク頂点だけを使うためこの多項式の全体符号に依存しません。

## 4. 最小の散乱計算：異種クォークの色交換

異なるフレーバー $q_f(p_1,a)+q_h(p_2,b)\to q_f(p_3,c)+q_h(p_4,d)$（$f\ne h$）を取り、質量を零とします。$p_i^2=0$、Mandelstam変数は[QFT12の定義](../QFT12/index.md#def-qft12-mandelstam)に従い、$s=-(p_1+p_2)^2$、$t=-(p_1-p_3)^2$、$u=-(p_1-p_4)^2$、$s+t+u=0$ です。異種なので同種フェルミオンの交換図はありません。色は最初の二粒子で各3状態、始状態の非偏極スピンは各2状態です。

Feynmanゲージのグルーオン伝播因子 $+i\eta_{\mu\nu}\delta^{AB}/(t+i0)$（[QFT17の光子交換](../QFT17/index.md#prop-qft17-tree-amplitude)と同じLorentz部分）と[上の頂点](#prop-qft41-vertices)から、木レベル振幅を

$$
i\mathcal M_{cd;ab}
=\frac{ig_s^2}{t+i0}
\bigl[\bar u(p_3)\gamma^\mu u(p_1)\bigr]
\bigl[\bar u(p_4)\gamma_\mu u(p_2)\bigr]
\sum_A(t^A)_{ca}(t^A)_{db}
$$

と書けます。質量零の異種クォークをオンシェルで扱う限り、$i\not p\,u(p)=0$ と $\bar u(p)i\not p=0$ より、伝播関数の縦部分は $\bar u(p_3)(\not p_3-\not p_1)u(p_1)=0$ なので消えます。これは[QFT18の木レベルWard縮約](../QFT18/index.md#thm-qft18-tree-ward)と同じ機構です。

<a id="prop-qft41-qq-scattering"></a>

<!-- formal-statement-start -->
> **命題（異種クォーク弾性散乱の色・スピン平均）**
> 質量零の異なるDiracフレーバー二種類、各三色、始状態の色とスピンを等確率で平均し、終状態の色とスピンを和に取る。$s>0$、$t\ne0$ の木レベル $t$ チャネルグルーオン交換について、色の平均は $2/9$ であり、全てを平均した振幅二乗は

$$
\overline{|\mathcal M|^2}
=\frac49g_s^4\,\frac{s^2+u^2}{t^2}.
$$

> これは摂動的な色付き外線のparton振幅であり、自由な色付きクォークを検出できるとの主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

色の四本の添字は生成子の跡二つにまとめることができます。スピンは二本のDirac traceを掛け、質量零の内積を $s,t,u$ で書き直します。色平均 $1/9$ とスピン平均 $1/4$ をそれぞれ一度だけ掛けます。

<!-- proof-start -->
### 証明

色因子を $C_{cd;ab}=\sum_A(t^A)_{ca}(t^A)_{db}$ とします。終色 $c,d$ を和に取り、始色 $a,b$ で平均すると、Hermitian性により

$$
\begin{aligned}
\frac19\sum_{a,b,c,d}|C_{cd;ab}|^2
&=\frac19\sum_{A,B}
\left[\sum_{a,c}(t^A)_{ca}(t^B)_{ac}\right]
\left[\sum_{b,d}(t^A)_{db}(t^B)_{bd}\right]\\
&=\frac19\sum_{A,B}\operatorname{tr}(t^At^B)^2
=\frac19\sum_{A,B}\frac{\delta^{AB}\delta^{AB}}4
=\frac29.
\end{aligned}
$$

[QFT7のスピン和](../QFT7/index.md#thm-qft7-spin-sums)は $m>0$ で $\sum_su_s(p)\bar u_s(p)=i\not p+mI_4$ と証明されています。外線エネルギー $p^0>0$ を保って $m\downarrow0$ とすると、同定理のスピノルの分母 $p^0+m$ は零にならず、二つのスピン状態の和は $i\not p$ に連続的に移ります。この質量零スピン和と[QFT7のClifford関係](../QFT7/index.md#def-qft7-clifford)から

$$
\begin{aligned}
S&=\frac14\operatorname{tr}((i\not p_3)\gamma^\mu
(i\not p_1)\gamma^\nu)
\operatorname{tr}((i\not p_4)\gamma_\mu
(i\not p_2)\gamma_\nu),\\
\operatorname{tr}(\not a\gamma^\mu\not b\gamma^\nu)
&=4(a^\mu b^\nu+a^\nu b^\mu-\eta^{\mu\nu}a\cdot b).
\end{aligned}
$$

各トレースに $i^2=-1$ があり、その二つの積は $(-1)^2=+1$ です。したがって $i$ を外した二つの跡の括弧内をそれぞれ $A^{\mu\nu}$、$B_{\mu\nu}$ とすると、四次元では $\eta^\mu{}_{\mu}=4$ であり、計量を含む交差項の和 $(-4+4)(p_3\cdot p_1)(p_4\cdot p_2)$ が相殺します。残る積は

$$
A^{\mu\nu}B_{\mu\nu}
=2[(p_3\cdot p_4)(p_1\cdot p_2)
+(p_3\cdot p_2)(p_1\cdot p_4)].
$$

したがって二つの跡に付く $4\times4/4$ を掛けて $S=8[(p_3\cdot p_4)(p_1\cdot p_2)+(p_3\cdot p_2)(p_1\cdot p_4)]$。$p_1\cdot p_2=p_3\cdot p_4=-s/2$、$p_1\cdot p_4=p_2\cdot p_3=u/2$ なので

$$
S=8\left(\frac{s^2}4+\frac{u^2}4\right)
=2(s^2+u^2).
$$

従って $(g_s^4/t^2)(2/9)S=(4/9)g_s^4(s^2+u^2)/t^2$ です。$\bar u\gamma^\mu u$ に含まれる外線規格化は[QFT12の断面積規約](../QFT12/index.md#def-qft12-rate-cross-section)と対応し、ここで追加の色数や終状態の $1/2!$ は掛けません。
<!-- proof-end -->

この計算で使った**色平均**はparton計算の約束です。現実の入射陽子は色一重項の複合状態であり、陽子の断面積への接続にはparton分布や因子化条件が追加で必要です。それは後続の深非弾性散乱で扱います。

## 5. 純ゲージの走りにクォークを加える

[QFT30の純Yang–Millsの一ループβ関数](../QFT30/index.md#thm-qft30-beta-function)は $-11C_A/3$ を与えました。しかしクォークは荷電Dirac場であり、グルーオン二点関数に閉じたクォークループを追加します。そこで「何種類を軽いと数えるか」を尺度と合わせて定義します。

<a id="def-qft41-running-alpha"></a>

<!-- formal-statement-start -->
> **定義（走る強結合と有効フレーバー数）**
> 四次元のQCDで、質量非依存くりこみ方式により尺度 $\mu>0$ における結合 $g_s(\mu)$ を定める。微分では裸結合と裸作用のパラメータを固定し、尺度 $\mu$ を動かす。強結合パラメータとβ関数を次のように定義する。

$$
\alpha_s(\mu)=\frac{g_s^2(\mu)}{4\pi},
\qquad \beta(g_s)=\mu\frac{dg_s}{d\mu}.
$$

> ある尺度の周辺で質量を無視できるDirac基本表示のフレーバー数を $n_f$ と記す。固定 $n_f$ の一ループ式は、その区間の質量閾値から十分離れた摂動領域で用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft41-running-alpha -->
### 例：三つの軽いフレーバー

**定義の確認**：$u,d,s$ の三種類を質量零として近似でき、さらに重いフレーバーの寄与を低エネルギー有効理論へ吸収した区間では $n_f=3$ と数えます。各クォークは三色ですが、色数を掛けて $n_f=9$ とはしません。ループの色因子 $T_F$ が内部色の跡をすでに数えるからです。逆に十分高い摂動的尺度で六種類すべてを質量零近似する場合は $n_f=6$ です。閾値近傍では単純に整数を切り替えるだけでなく、有効理論間のmatchingが要ります。
<!-- definition-example-end -->

<a id="thm-qft41-qcd-beta"></a>

<!-- formal-statement-start -->
> **定理（質量零クォークを含むQCDの一ループβ関数）**
> 四次元 $SU(3)$ QCDで、$n_f$ 種の質量零Dirac基本表示クォークを加え、ゲージWard恒等式を保つ次元正則化と質量非依存減算を使い、$g_s$ の一ループ摂動次数まで扱う。このとき

$$
\begin{aligned}
\beta(g_s)&=-\frac{g_s^3}{16\pi^2}b_0+O(g_s^5),\\
b_0&=\frac{11}{3}C_A-\frac43T_Fn_f
=11-\frac23n_f,\\
\mu\frac{d\alpha_s}{d\mu}
&=-\frac{b_0}{2\pi}\alpha_s^2+O(\alpha_s^3).
\end{aligned}
$$

> 特に $n_f<33/2$ で一ループ係数は負である。固定した $n_f$ と一ループ近似に限れば、任意の摂動的基準尺度 $\mu_0$ から

$$
\frac1{\alpha_s(\mu)}
=\frac1{\alpha_s(\mu_0)}
+\frac{b_0}{2\pi}\log\frac{\mu}{\mu_0}
$$

> が成り立つ。質量閾値を跨ぐ場合、この式を同じ $n_f$ で無条件に延長しない。
<!-- formal-statement-end -->

### 証明の見取り図

ゲージ・ghostの寄与は[純ゲージの一ループ結果](../QFT30/index.md#thm-qft30-one-loop-log)を使います。新たな閉クォークループは[QFT24のQED真空偏極積分](../QFT24/index.md#thm-qft24-transverse-integral)とDirac部分が同じで、二つの電磁電荷 $e^2$ を $g_s^2\operatorname{tr}(t^At^B)$ に置き換えます。この群論の置換と積分の係数を明示し、最後に固定裸結合の尺度微分を行います。

<!-- proof-start -->
### 証明

グルーオン外線の色 $A,B$ を持つ一種類の閉Diracループは、両頂点に $t^A,t^B$ が入るので、閉じた色添字和は

$$
\sum_{a,b}(t^A)_{ab}(t^B)_{ba}
=\operatorname{tr}(t^At^B)=T_F\delta^{AB}.
$$

各フレーバーは独立に同じ質量零ループへ寄与するので $n_fT_F$ を掛けます。保存する色電流の横方向の二点関数は、次元正則化で積分変数を平行移動できることにより、[QFT24の横性の証明](../QFT24/index.md#thm-qft24-loop-ward)をそのまま色添字付きで適用できます。$d=4-2\varepsilon$ で、[同章のFeynmanパラメータ表示](../QFT24/index.md#thm-qft24-transverse-integral)は質量零・非零のEuclid外部運動量 $p$ において、二点係数の紫外極を

$$
\begin{aligned}
\Pi_{\rm quark}^{AB}(p^2)\big|_{\rm pole}
&=\delta^{AB}\frac{8g_s^2T_Fn_f}{16\pi^2\varepsilon}
\int_0^1x(1-x)\,dx\\
&=\delta^{AB}\frac{8g_s^2T_Fn_f}{16\pi^2\varepsilon}
\left[\frac{x^2}2-\frac{x^3}3\right]_0^1\\
&=\delta^{AB}\frac{4g_s^2T_Fn_f}{3(16\pi^2)\varepsilon}
\end{aligned}
$$

と与えます。外部二点核全体は $(p^2\delta_{\mu\nu}-p_\mu p_\nu)\Pi_{\rm quark}^{AB}(p^2)$ です。

QFT24の表示は $m>0$ で導いていますが、ここでは $p^2>0$ を固定して $m\downarrow0$ とできます。実際、$x(1-x)\log[m^2+x(1-x)p^2]$ は端点でも可積分で、紫外極の係数は質量に依存しません。非零のEuclid外部運動量で積分しているので、ここでは紫外極と赤外極を混同しません。

符号と結合の関係を明示します。一ループの紫外係数の比較では[QFT20のEuclid化](../QFT20/index.md#def-qft20-euclidean-action)を行います。以下の $F_{\mu\nu}$ の添字 $\mu,\nu=1,\ldots,4$ はEuclid座標を動き、添字のない $\mu>0$ は引き続きくりこみ尺度です。背景場を $B_\mu^A=g_sG_\mu^A$ と再規格化すると

$$
F_{\mu\nu}^A[B]=\partial_\mu B_\nu^A-\partial_\nu B_\mu^A
+f^{ABC}B_\mu^BB_\nu^C=g_sG_{\mu\nu}^A
$$

なので、Euclid型の古典ゲージ作用は $\int F[B]^2/(4g_s^2)$ の形になります。上のクォーク二点極はこの係数に $+4T_Fn_f/3$ の寄与を与えます。一方、[QFT30の純ゲージ対数係数](../QFT30/index.md#thm-qft30-one-loop-log)は同じ $F[B]^2/4$ に $-11C_A/3$ を与えます。ここでは背景ゲージ不変性を保つ正則化を仮定しているため、二つの局所紫外補正は同じ不変な $F[B]^2$ の係数として加算でき、全係数は

$$
\Gamma_{\rm UV}^{(1)}\supset
-\frac14\frac{b_0}{16\pi^2}\log\frac{\Lambda^2}{\mu^2}
\int d^4x\,F_{\mu\nu}^A[B]F^{A\mu\nu}[B],
\qquad b_0=\frac{11}{3}C_A-\frac43T_Fn_f.
$$

ここで対数は次元正則化の紫外極と同じ局所係数を表す模式的なカットオフ表記であり、両正則化の有限部分を同一視していません。この係数を $1/g_s^2$ のくりこみへ吸収する操作は[QFT30のβ導出](../QFT30/index.md#thm-qft30-beta-function)と同じです。

[QFT25の固定裸結合の微分](../QFT25/index.md#def-qft25-rg-functions)と[QFT30のβ導出](../QFT30/index.md#thm-qft30-beta-function)と同じく、結合の逆二乗の尺度微分は

$$
\frac{d}{d\log\mu}\frac1{g_s^2}
=\frac{2b_0}{16\pi^2},\qquad
-2g_s^{-3}\beta(g_s)=\frac{2b_0}{16\pi^2}.
$$

従って $\beta(g_s)=-b_0g_s^3/(16\pi^2)$ です。$\alpha_s=g_s^2/(4\pi)$ を微分すると

$$
\frac{d\alpha_s}{d\log\mu}
=\frac{2g_s}{4\pi}\beta(g_s)
=-\frac{b_0g_s^4}{32\pi^3}
=-\frac{b_0}{2\pi}\alpha_s^2.
$$

最後に $d(\alpha_s^{-1})/d\log\mu=b_0/(2\pi)$ を $\mu_0$ から $\mu$ へ積分すれば解の式を得ます。摂動論で無視した項は $\beta(g_s)$ では $O(g_s^5)$、$\beta(\alpha_s)$ では $O(\alpha_s^3)$ です。
<!-- proof-end -->

**係数と適用領域。** $n_f=0$ はQFT30の純Yang–Mills $b_0=11$、$n_f=3$ では $b_0=9$、$n_f=6$ では $b_0=7$ です。物理的な六フレーバー以内では全て正で、$\mu$ を上げると $\alpha_s$ は小さくなります。一方、形式的に $n_f\ge17$ とすると一ループの符号は逆転しますが、その模型を現実の六フレーバーQCDと同一視できません。

固定した $n_f$ の区間で積分定数 $\Lambda_{n_f}$ を定義すると

$$
\alpha_s(\mu)
=\frac{4\pi}{b_0\log(\mu^2/\Lambda_{n_f}^2)}
$$

です。分母が小さくなる低尺度では高次補正が重要になり、式の「発散」点を物理的な粒子質量や閉じ込めの証明とは呼べません。質量閾値を跨ぐ場合、例えば低エネルギー有効理論の $n_f=3$ と高エネルギーの $n_f=4$ を適切なmatching尺度で接続します。一ループの最も単純な連続matchingでは境界の $\alpha_s$ を合わせますが、それを精密な全次数の閾値関係と混同しません。

## 6. 演習：色行列から散乱と尺度まで

共通規約は $\operatorname{tr}(t^At^B)=\delta^{AB}/2$、$D_\mu=\partial_\mu-ig_sG_\mu^At^A$、$C_A=3$、$T_F=1/2$ です。別に指定しない限り、各演習は四次元の古典場または木レベル・一ループの摂動計算として解いてください。

### 演習 QFT41-A1：基本と反基本の対角電荷

- Level: A
- 問題：$t^8=\operatorname{diag}(1,1,-2)/(2\sqrt3)$ の基本三成分と反基本三成分の固有値を求め、生成子が跡零・Hermitianであることを確認せよ。

<!-- solution-start -->
### 詳細解答

基本表示では対角成分が固有値なので $(1/(2\sqrt3),1/(2\sqrt3),-1/\sqrt3)$。全て実数なのでHermitianで、和は $1/\sqrt3-1/\sqrt3=0$ です。反基本表示の生成子は $-(t^8)^*$ であり、ここでは実対角だから固有値は $(-1/(2\sqrt3),-1/(2\sqrt3),1/\sqrt3)$。この和も零です。単に色成分を三つ持つことは、両表示が同じことを意味しません。
<!-- solution-end -->

### 演習 QFT41-A2：SU(3)の八成分

- Level: A
- 問題：Hermitianな $3\times3$ 行列の実自由度が9、跡零条件が一つであることを成分で確かめ、随伴表示が8次元である理由を述べよ。

<!-- solution-start -->
### 詳細解答

対角成分は実数3個、上三角の非対角成分は独立な複素数3個で実数6個、下三角はHermitian性で決まります。合計 $3+6=9$。跡は三つの実対角成分の和なので、跡零は独立な実一次条件1つです。従って $9-1=8$。グルーオンはこの跡零Hermitian空間の基底 $t^A$ に係数 $G_\mu^A$ を持つので8色成分です。四元ベクトルの物理偏極の数とは別です。
<!-- solution-end -->

### 演習 QFT41-A3：クォーク頂点の符号とフレーバー

- Level: A
- 問題：$D_\mu=\partial_\mu-ig_sG_\mu^At^A$ を $\bar q(\gamma^\mu D_\mu-m)q$ に代入し、三点相互作用の符号と結合次数を求めよ。なぜこの頂点だけでは $u\to d$ が起きないか。

<!-- solution-start -->
### 詳細解答

$\gamma^\mu D_\mu=\gamma^\mu\partial_\mu-ig_s\gamma^\mu G_\mu^At^A$。従って三点項は $-ig_s\bar q\gamma^\mu t^AqG_\mu^A$、Dyson展開の一回挿入で $i(-i)g_s\gamma^\mu t^A=+g_s\gamma^\mu t^A$ です。フレーバー添字は同じ $f$ の $\bar q_f,q_f$ にだけ付き、$u,d$ を混ぜる行列は作用にないので、単独頂点はフレーバーを保存します。
<!-- solution-end -->

### 演習 QFT41-A4：色一重項の収縮

- Level: A
- 問題：$q^a\mapsto U^a{}_bq^b$、$\bar q_a\mapsto\bar q_b(U^\dagger)^b{}_a$ とする。$\bar q_aq^a$ が色一重項であることを確かめよ。$q^1$ 単独は任意の局所色変換で不変か。

<!-- solution-start -->
### 詳細解答

変換後は $\bar q_b(U^\dagger)^b{}_aU^a{}_cq^c=\bar q_b\delta^b{}_cq^c=\bar q_bq^b$ です。ここでは $U^\dagger U=I$ を使いました。一方、例として $U=\operatorname{diag}(e^{i\theta/2},e^{-i\theta/2},1)$ を取れば $q^1\mapsto e^{i\theta/2}q^1$ であり、一般には不変ではありません。「色一重項の局所演算子」の確認と、閉じ込めの一般的証明は別の主張です。
<!-- solution-end -->

### 演習 QFT41-A5：構造定数が零なら何が消えるか

- Level: A
- 問題：$f^{ABC}=0$ の可換極限で、グルーオンの三点・四点自己相互作用を作用から判定せよ。クォーク–ゲージ場三点項も消えるか。

<!-- solution-start -->
### 詳細解答

$G_{\mu\nu}^A=K_{\mu\nu}^A+g_sf^{ABC}G_\mu^BG_\nu^C$ なので、$f=0$ なら曲率は $K$ だけです。$-G^2/4$ の三次項は $-g_s f KGG/2=0$、四次項は $-g_s^2ffGGGG/4=0$。ただし $D_\mu q=\partial_\mu q-ig_sG_\mu^At^Aq$ には $f$ は直接入らず、$g_s$ と非零生成子を残せば $-ig_s\bar q\gamma^\mu t^AqG_\mu^A$ は消えません。これはQED型の物質–ゲージ場結合に対応します。
<!-- solution-end -->

### 演習 QFT41-B1：完全性から二次Casimir

- Level: B
- 問題：[完全性関係](#lem-qft41-su3-completeness)の色添字を二通りに縮約し、(i) $\sum_A\operatorname{tr}(t^At^A)=4$、(ii) $\sum_A t^At^A=(4/3)I_3$ を導け。

<!-- solution-start -->
### 詳細解答

(i) 完全性の $k=j,l=i$ を置いて $i,j$ で和を取ると左辺は $\sum_A\sum_{i,j}(t^A)_{ij}(t^A)_{ji}=\sum_A\operatorname{tr}((t^A)^2)$。右辺は $\frac12\sum_{i,j}(1-\frac13\delta_{ij})=\frac12(9-1)=4$ です。(ii) $k=j$ だけを置き $j$ で和を取ると左辺は $(\sum_A t^At^A)_{il}$、右辺は $\frac12(3\delta_{il}-\frac13\delta_{il})=\frac43\delta_{il}$。さらに(i)は(ii)の跡 $3(4/3)=4$ と一致し、縮約が整合します。
<!-- solution-end -->

### 演習 QFT41-B2：色を交換する行列要素

- Level: B
- 問題：木レベル交換の色テンソル $C_{cd;ab}=\sum_A(t^A)_{ca}(t^A)_{db}$ について、(i) $a=1,b=2,c=2,d=1$、(ii) $a=b=c=d=1$ の値を求め、二つが同じではない理由を述べよ。

<!-- solution-start -->
### 詳細解答

[完全性関係](#lem-qft41-su3-completeness)に $i=c,j=a,k=d,l=b$ を代入して

$$
C_{cd;ab}=\frac12(\delta_{cb}\delta_{ad}-\tfrac13\delta_{ca}\delta_{db})
$$

です。(i) では $\delta_{cb}\delta_{ad}=\delta_{22}\delta_{11}=1$、第二の積は $\delta_{21}\delta_{12}=0$ なので $C_{21;12}=1/2$。(ii) は両積とも1なので $C_{11;11}=(1-1/3)/2=1/3$。非可換な色交換項と跡を除く項が異なる添字の組で効きます。
<!-- solution-end -->

### 演習 QFT41-B3：ループ係数と有効フレーバー数

- Level: B
- 問題：$SU(3)$ で $n_f=0,3,6,17$ の $b_0$ を求め、$\mu$ 増大時の一ループ $\alpha_s$ の変化を判定せよ。なぜ現実の低エネルギーQCDに $n_f=6$ の式をそのまま当てはめてはいけないか。

<!-- solution-start -->
### 詳細解答

$b_0=11-2n_f/3$ なので順に $11,9,7,-1/3$。$\mu\,d\alpha_s/d\mu=-b_0\alpha_s^2/(2\pi)$ で $\alpha_s>0$ より、最初の三つは増大する $\mu$ で減少し、$n_f=17$ は一ループで増大します。ただし負の $b_0$ だけから全尺度での振舞いや非摂動的UV完成を断言できません。現実の重いクォークはその質量より十分低い尺度では質量零の活性フレーバーとして数えず、閾値matchingが必要です。
<!-- solution-end -->

### 演習 QFT41-B4：二つの尺度のmatching

- Level: B
- 問題：固定 $n_f=3$ の区間で $\alpha_s(\mu_0)=a>0$ とする。$\mu_1>\mu_0$ で $\alpha_s(\mu_1)$ を求め、$\mu_1$ を一つの重いフレーバーのmatching点と見なして $n_f=4$ に切り替えた場合の $\mu_2>\mu_1$ の一ループ式を書け。matchingは最も単純な連続条件とする。

<!-- solution-start -->
### 詳細解答

$b_3=9$ から $a_1^{-1}=a^{-1}+(9/(2\pi))\log(\mu_1/\mu_0)$ で $a_1=\alpha_s(\mu_1)$ です。連続matchingを $\alpha_s^{(4)}(\mu_1)=\alpha_s^{(3)}(\mu_1)=a_1$ と置くと、$b_4=11-8/3=25/3$ なので

$$
\frac1{\alpha_s^{(4)}(\mu_2)}
=\frac1a+\frac9{2\pi}\log\frac{\mu_1}{\mu_0}
+\frac{25}{6\pi}\log\frac{\mu_2}{\mu_1}.
$$

最初と次の区間で係数が違います。単一の $b_0$ で全区間を積分する式にはなりません。またここで用いた連続matchingは一ループの簡略化で、精密な閾値補正は別途計算が必要です。
<!-- solution-end -->

### 演習 QFT41-C1：色平均から走る散乱強度まで

- Level: C
- 問題：質量零で異なるクォーク二種の $t$ チャネル散乱を考え、$s>0,t<0,u=-s-t$、初期色各3・初期スピン各2の等確率平均とする。(i) $\operatorname{tr}(t^At^B)=\delta^{AB}/2$ から色平均を求め、(ii) スピンtraceを $s,u$ へ還元し、(iii) $\overline{|\mathcal M|^2}$ と二体微分断面積 $d\sigma/dt$ を求めよ。(iv) 固定 $n_f=3$ の一ループ近似で $\mu\to2\mu$ としたとき結合因子 $g_s^4$ がどう変わるか、$\alpha_s(\mu)=a>0$ から式で示せ。外線は質量零、$t\ne0$、摂動的尺度に限る。

<!-- solution-start -->
### 詳細解答

1. (i) 色テンソル $C_{cd;ab}=\sum_A(t^A)_{ca}(t^A)_{db}$ について、Hermitian性を使い $\frac19\sum_{a,b,c,d}|C|^2=\frac19\sum_{A,B}\operatorname{tr}(t^At^B)\operatorname{tr}(t^At^B)=\frac19\cdot8\cdot\frac14=2/9$ です。
2. (ii) 質量零スピン和を取ると二本のtraceの平均は

$$
S=\tfrac14\operatorname{tr}((i\not p_3)\gamma^\mu(i\not p_1)\gamma^\nu)
\operatorname{tr}((i\not p_4)\gamma_\mu(i\not p_2)\gamma_\nu)
=8[(p_3\!\cdot p_4)(p_1\!\cdot p_2)+(p_3\!\cdot p_2)(p_1\!\cdot p_4)].
$$

$i^4=+1$ を用い、$p_1\cdot p_2=p_3\cdot p_4=-s/2$ と $p_3\cdot p_2=p_1\cdot p_4=u/2$ を代入すると $S=2(s^2+u^2)$ です。
3. (iii) 従って平均二乗は $\overline{|\mathcal M|^2}=(g_s^4/t^2)(2/9)2(s^2+u^2)=(4/9)g_s^4(s^2+u^2)/t^2$。区別できる質量零二体散乱で[QFT12の流束・二体位相空間](../QFT12/index.md#thm-qft12-rate-formulas)を用いれば $d\sigma/dt=\overline{|\mathcal M|^2}/(16\pi s^2)$ なので

$$
\frac{d\sigma}{dt}
=\frac{4\pi\alpha_s^2}{9s^2}\frac{s^2+u^2}{t^2},
\qquad g_s^4=(4\pi\alpha_s)^2.
$$

4. (iv) $b_3=9$ より $\alpha_s(2\mu)=a/[1+(9a/(2\pi))\log2]$。よって同じ運動学で単に結合の尺度だけを置き換えた木レベル振幅二乗の比は

$$
\frac{g_s^4(2\mu)}{g_s^4(\mu)}
=\left[1+\frac{9a}{2\pi}\log2\right]^{-2}.
$$

これは結合のRG改善の一部だけであり、物理断面積の完全な尺度依存やパートン分布関数（Parton Distribution Function; PDF）・高次補正まで求めたわけではありません。
<!-- solution-end -->

## 7. まとめと次への問い

- 色の基本表現の次元は3、グルーオンの随伴表現の次元は8です。基本・反基本・随伴は異なる変換則を持ちます。
- QCD作用から $q\bar qG$ の $g_s$、$GGG$ の $g_s$、$GGGG$ の $g_s^2$ が現れます。$SU(3)$ の完全性関係は $T_F=1/2$、$C_F=4/3$ を結び、異種クォークの木レベル色平均は $2/9$ です。
- 純ゲージの $11$ にクォークの $-2n_f/3$ が加わり、固定フレーバーの一ループ $b_0=11-2n_f/3$ を得ます。六フレーバー以内の摂動的QCDでは高尺度で結合が小さくなります。
- 色付きpartonの散乱振幅と色一重項ハドロンの測定は同じではありません。低尺度への一ループ外挿は閉じ込めや質量ギャップの証明ではありません。

次は、どの尺度でこのparton計算が有効なのかをさらに考え、漸近自由性と閉じ込めの境界、そして深非弾性散乱の観測量へ接続します。
