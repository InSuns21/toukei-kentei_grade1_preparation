# GMECH6 Lie–Poisson構造と余随伴軌道

[GMECH5のMarsden–Weinstein簡約](../GMECH5/index.md#thm-gmech5-marsden-weinstein)では運動量を固定して対称群で割り、非退化な2形式を得ました。では、固定前の運動量そのものを変数にして運動を記述するにはどうしたらよいでしょうか。$SO(3)$ の角運動量は三つの成分を持ちますが、三次元空間全体には非退化な交代2形式は存在しません。それでも角運動量の長さが一定なら、運動は二次元球面に制限されます。

この事情を一般化するのが **Lie–Poisson構造** です。Lie代数の双対空間全体では退化を許す括弧を使い、その中の **余随伴軌道** ごとにシンプレクティック力学を復元します。最初に左右の作用と符号を固定してから、Jacobi恒等式、Hamilton方程式、軌道上の2形式、Casimirを順に導きます。

## 1. 左余随伴作用と軌道の接方向

$G$ を有限次元実Lie群、$\mathfrak g$ をそのLie代数、$\mathfrak g^*$ を双対空間とします。[LIE2の無限小随伴作用](../../../代数系/LIE/LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)は $\operatorname{ad}_\xi\eta=[\xi,\eta]$ です。[GMECH2の左余随伴作用](../GMECH2/index.md#def-gmech2-coadjoint-equivariance)と同じ規約を採用します。

$$
\langle\operatorname{Ad}_g^*\mu,\eta\rangle
=\langle\mu,\operatorname{Ad}_{g^{-1}}\eta\rangle.
$$

$g=\exp(t\xi)$ として双対評価を微分すると

$$
\begin{aligned}
\left\langle\left.\frac{d}{dt}\right|_0\operatorname{Ad}_{\exp(t\xi)}^*\mu,\eta\right\rangle
&=\left.\frac{d}{dt}\right|_0\langle\mu,\operatorname{Ad}_{\exp(-t\xi)}\eta\rangle\\
&=-\langle\mu,[\xi,\eta]\rangle.
\end{aligned}
$$

ここで負号は $g^{-1}=\exp(-t\xi)$ から生じます。線形写像 $\operatorname{ad}_\xi$ の通常の転置を $\operatorname{ad}_\xi^{\mathsf T}$ と書けば、得られた速度は $-\operatorname{ad}_\xi^{\mathsf T}\mu$ です。

<a id="def-gmech6-coadjoint-tangent"></a>

<!-- formal-statement-start -->
> **定義（余随伴軌道と無限小余随伴作用）**  
> 左余随伴作用に対して点 $\mu\in\mathfrak g^*$ の余随伴軌道を $\mathcal O_\mu=\{\operatorname{Ad}_g^*\mu:g\in G\}$ とする。また $\xi\in\mathfrak g$ が生む速度 $\rho_\xi(\nu)$ を次式で定める。

$$
\langle\rho_\xi(\nu),\eta\rangle=-\langle\nu,[\xi,\eta]\rangle
\qquad(\eta\in\mathfrak g).
$$

> 軌道の接空間は $T_\nu\mathcal O_\mu=\{\rho_\xi(\nu):\xi\in\mathfrak g\}$ である（$\nu\in\mathcal O_\mu$）。
<!-- formal-statement-end -->

接空間の記述は[LIE4の軌道写像・安定化Lie代数の定理](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)を左余随伴作用に適用して得ます。

<!-- definition-example-start: def-gmech6-coadjoint-tangent -->
### 直接例：回転群

**定義の確認**：余随伴作用の速度を双対評価から求め、その像が軌道の接平面を張ることを検算します。

$\mathfrak{so}(3)$ を $\mathbb R^3$ と同一視し、Lie括弧を $[\xi,\eta]=\xi\times\eta$、双対評価を内積とします。三重積の順序を確認すると

$$
-\mu\cdot(\xi\times\eta)
=(\xi\times\mu)\cdot\eta,
\qquad
\rho_\xi(\mu)=\xi\times\mu.
$$

したがって非零 $\mu$ の速度全体は $\mu^\perp$ です。$SO(3)$ の回転は長さを保ち、同じ長さの任意の二つの非零ベクトルを互いに移せるため、余随伴軌道は半径 $|\mu|$ の球面です。$\mu=0$ では速度は常に零で、軌道は一点です。この計算は定義の全ての $\eta$ について双対評価を確認しています。
<!-- definition-example-end -->

## 2. Lie括弧から関数の括弧を作る

[SYM4のシンプレクティックPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)は2形式から導かれました。ここでは逆にLie代数の括弧を出発点にします。滑らかな関数 $F$ の点 $\mu$ における微分は、有限次元の同一視 $T_\mu^*\mathfrak g^*\simeq\mathfrak g$ によってLie代数の元と見なせます。

<a id="def-gmech6-lie-poisson"></a>

<!-- formal-statement-start -->
> **定義（正・負のLie–Poisson括弧）**  
> 有限次元実Lie代数 $\mathfrak g$ と滑らかな関数 $F,G:\mathfrak g^*\to\mathbb R$ に対し、正のLie–Poisson括弧を次式で定める。

$$
\{F,G\}_+(\mu)=\langle\mu,[dF_\mu,dG_\mu]\rangle.
$$

> 負の括弧は $\{F,G\}_-=-\{F,G\}_+$ と定める。本章では特記しなければ正の括弧を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech6-lie-poisson -->
### 直接例：構造定数と角運動量

**定義の確認**：座標関数の微分をLie括弧へ入力し、正のLie–Poisson括弧を具体的に計算します。

基底 $e_i$ が $[e_i,e_j]=\sum_k c_{ij}^k e_k$ を満たし、座標が $x_i(\mu)=\langle\mu,e_i\rangle$ なら $dx_i=e_i$ なので

$$
\{x_i,x_j\}_+=\sum_k c_{ij}^k x_k.
$$

$SO(3)$ では $x=\mu_1,y=\mu_2,z=\mu_3$ と置くと

$$
\{x,y\}_+=z,\quad \{y,z\}_+=x,\quad \{z,x\}_+=y.
$$

例えば $F=x^2,G=y$ では $dF=2xe_1$、$dG=e_2$ だから $\{F,G\}_+=2xz$ です。単なる符号表の暗記ではなく、定義から直接計算しました。
<!-- definition-example-end -->

<a id="thm-gmech6-jacobi"></a>

<!-- formal-statement-start -->
> **定理（Lie–Poisson括弧のJacobi恒等式）**  
> 任意の有限次元実Lie代数 $\mathfrak g$ について $\{\ ,\ \}_+$ は双線形・交代的で、任意の滑らかな $F,G,H$ に対してLeibniz則とJacobi恒等式を満たす。

$$
\{F,GH\}_+=\{F,G\}_+H+G\{F,H\}_+,
$$

$$
\{F,\{G,H\}_+\}_++\{G,\{H,F\}_+\}_+
+\{H,\{F,G\}_+\}_+=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

微分の積の法則でLeibniz則を得ます。Jacobi恒等式では二階微分を含む項が消えることを確認した後、Lie括弧のJacobi恒等式を構造定数に適用します。

<!-- proof-start -->
### 証明

$d(aF+bG)=a\,dF+b\,dG$ とLie括弧の双線形性から双線形性が従い、$[dF,dG]=-[dG,dF]$ から交代性が従います。また $d(GH)=G\,dH+H\,dG$ を定義に代入すればLeibniz則です。

一般の滑らかな関数でJacobiを証明します。$\pi^{ij}(x)=\sum_k c_{ij}^k x_k$ とし、$F_i=\partial_iF$ と書くと

$$
\{F,G\}_+=\sum_{ij}\pi^{ij}F_iG_j.
$$

一つ目の二重括弧を微分すると

$$
\begin{aligned}
\{F,\{G,H\}_+\}_+
=\sum_{i\ell jk}\pi^{i\ell}F_i\bigl[
&(\partial_\ell\pi^{jk})G_jH_k\\
&+\pi^{jk}G_{j\ell}H_k+\pi^{jk}G_jH_{k\ell}\bigr].
\end{aligned}
$$

三つの巡回順序で足したとき、二階微分項は対ごとに消えます。例えば $H$ の二階微分を含む項は、最初の二つの二重括弧から

$$
\begin{aligned}
T_1&=\sum_{ijk\ell}\pi^{i\ell}\pi^{jk}F_iG_jH_{k\ell},\\
T_2&=\sum_{ijk\ell}\pi^{j\ell}\pi^{ki}G_jH_{k\ell}F_i
\end{aligned}
$$

と現れます。$T_2$ の和で $k$ と $\ell$ を交換し、$H_{\ell k}=H_{k\ell}$ と $\pi^{\ell i}=-\pi^{i\ell}$ を使うと

$$
T_2=\sum_{ijk\ell}\pi^{jk}\pi^{\ell i}F_iG_jH_{\ell k}
=-\sum_{ijk\ell}\pi^{i\ell}\pi^{jk}F_iG_jH_{k\ell}
=-T_1.
$$

$F$ または $G$ の二階微分を含む項も三関数を巡回させると同じように相殺します。残りのJacobiatorは

$$
\sum_{ijk\ell}\bigl(
\pi^{i\ell}\partial_\ell\pi^{jk}
+\pi^{j\ell}\partial_\ell\pi^{ki}
+\pi^{k\ell}\partial_\ell\pi^{ij}
\bigr)F_iG_jH_k.
$$

$\partial_\ell\pi^{jk}=c_{jk}^{\ell}$ を代入し、$x_m$ の係数を取り出すと

$$
\sum_\ell\left(
c_{i\ell}^m c_{jk}^{\ell}
+c_{j\ell}^m c_{ki}^{\ell}
+c_{k\ell}^m c_{ij}^{\ell}\right).
$$

これは $[e_i,[e_j,e_k]]+[e_j,[e_k,e_i]]+[e_k,[e_i,e_j]]$ の $e_m$ 成分なので、[Lie括弧のJacobi恒等式](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)により零です。全係数が零だから滑らかな三関数についても結論が成り立ちます。
<!-- proof-end -->

## 3. Hamilton方程式は余随伴軌道に沿う

Hamiltonian $H$ が与えられると、観測量の時間変化を $\dot F=\{F,H\}_+$ で定めます。線形関数 $F_\eta(\mu)=\langle\mu,\eta\rangle$ を使えば速度の全成分を求められます。

<a id="thm-gmech6-flow"></a>

<!-- formal-statement-start -->
> **定理（Lie–Poisson運動方程式と軌道保存）**  
> 有限次元実Lie代数 $\mathfrak g$ 上の滑らかなHamiltonian $H:\mathfrak g^*\to\mathbb R$ に対し、正のLie–Poisson括弧のHamiltonベクトル場は次を満たす。

$$
X_H(\mu)=\rho_{dH_\mu}(\mu)
=-\operatorname{ad}_{dH_\mu}^{\mathsf T}\mu.
$$

> 任意の積分曲線は存在する時間区間で初期点の連結余随伴軌道にとどまる。$SO(3)$ では $\dot{\boldsymbol\mu}=\nabla H(\boldsymbol\mu)\times\boldsymbol\mu$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $\eta$ に対する双対評価の時間微分から速度を特定します。続いて軌道接空間との一致と局所解の一意性を使い、軌道の不変性を得ます。

<!-- proof-start -->
### 証明

$dF_\eta=\eta$ なので、括弧の定義に代入して

$$
\begin{aligned}
\frac d{dt}\langle\mu(t),\eta\rangle
&=\{F_\eta,H\}_+(\mu)\\
&=\langle\mu,[\eta,dH_\mu]\rangle\\
&=-\langle\mu,[dH_\mu,\eta]\rangle\\
&=\langle\rho_{dH_\mu}(\mu),\eta\rangle.
\end{aligned}
$$

これが全 $\eta$ で成り立つため $\dot\mu=\rho_{dH_\mu}(\mu)$ です。[軌道接空間の式](#def-gmech6-coadjoint-tangent)よりこの速度は常に軌道に接します。軌道上に制限した滑らかなベクトル場の局所解は、双対空間上の同じ初期値問題の解でもあります。[Picard–Lindelöfの局所存在・一意性](../../../解析系/ODE/ODE1/index.md#thm-ode1-picard-lindelof)により両者は一致します。この局所議論を解の存在する区間に沿って反復すれば軌道を出ません。

最後に $\rho_\xi(\mu)=\xi\times\mu$ へ $\xi=\nabla H(\mu)$ を入れると $SO(3)$ の式が得られます。
<!-- proof-end -->

負のLie–Poisson括弧を採用すると右辺が反転し、$SO(3)$ では $\dot\mu=\mu\times\nabla H$ になります。これはGMECH7で物体座標を使う場合に重要です。**正の括弧を採用したまま負の括弧の方程式を書くのは符号誤り**です。

## 4. Kirillov–Kostant–Souriau形式

双対空間のPoisson構造が退化しても、その余随伴軌道には非退化な2形式が存在します。軌道を動かす $\xi,\eta$ のLie括弧を評価して定義します。

<a id="def-gmech6-kks"></a>

<!-- formal-statement-start -->
> **定義（KKS形式）**  
> 有限次元実Lie群 $G$ の余随伴軌道 $\mathcal O_\mu$ 上で、$\nu\in\mathcal O_\mu$ におけるKirillov–Kostant–Souriau形式を次の評価式で与える。

$$
(\omega_{\mathrm{KKS}})_\nu
(\rho_\xi(\nu),\rho_\eta(\nu))
=\langle\nu,[\xi,\eta]\rangle.
$$

> 接ベクトルを表す $\xi,\eta$ の選び方への非依存性は次の定理で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech6-kks -->
### 直接例：球面の接平面

**定義の確認**：余随伴軌道の接方向を二つ選び、KKS形式の評価式へ代入します。

$SO(3)$ で $\nu=r e_3$、$r>0$ と置きます。$\rho_{e_1}(\nu)=-r e_2$、$\rho_{e_2}(\nu)=r e_1$ は接平面の基底です。評価式へ代入すれば

$$
\omega_{\mathrm{KKS}}(-r e_2,r e_1)
=r e_3\cdot(e_1\times e_2)=r\ne0.
$$

接平面の二本の独立な方向で零でない値を取り、非退化性が期待できます。原点の軌道は零次元なので零形式が非退化です。
<!-- definition-example-end -->

<a id="thm-gmech6-kks"></a>

<!-- formal-statement-start -->
> **定理（余随伴軌道のシンプレクティック構造）**  
> 有限次元実Lie群 $G$ の各余随伴軌道 $\mathcal O_\mu$ において、KKS形式はwell-definedな滑らかで閉じた非退化2形式である。また線形関数 $F_\xi(\nu)=\langle\nu,\xi\rangle$ のKKS-Hamiltonベクトル場は $\rho_\xi$ であり、軌道のシンプレクティックPoisson括弧は正のLie–Poisson括弧の制限に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

代表元の差が速度零なら2形式の値に寄与しないことを示します。同じ計算で非退化性を示し、外微分公式で[Lie括弧のJacobi恒等式](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)を使って閉性を証明します。

<!-- proof-start -->
### 証明

**代表元の選択と非退化性。** $\rho_\zeta(\nu)=0$ なら、任意の $\eta$ に対して

$$
0=\langle\rho_\zeta(\nu),\eta\rangle
=-\langle\nu,[\zeta,\eta]\rangle.
$$

従って $\xi$ を $\xi+\zeta$ に変えても右辺は変わりません。第二引数についても交代性で同じです。これにより形式の値は接ベクトルだけで決まります。

**非退化性。** 接ベクトル $v=\rho_\xi(\nu)$ に対して、全ての接ベクトルとの形式の評価が零とします。このとき任意の $\eta$ について

$$
\omega_{\mathrm{KKS}}(v,\rho_\eta(\nu))
=\langle\nu,[\xi,\eta]\rangle=0.
$$

無限小余随伴作用の定義へ戻すと $\rho_\xi(\nu)=0$、すなわち $v=0$ です。

**滑らかさ。** [安定化 Lie 環と軌道方向](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)から、軌道写像の階数は一定で、軌道は局所的に滑らかな座標を持ちます。接空間への写像

$$
\mathfrak g\longrightarrow T_\nu\mathcal O_\mu,
\qquad \xi\longmapsto\rho_\xi(\nu)
$$

の核の補空間を選びます。局所座標内で接ベクトルの滑らかな代表を取れ、その代表と点に関するLie括弧の双線形評価も滑らかです。従ってKKS形式の係数は滑らかです。

**閉性。** [LIE4の左作用の基本ベクトル場の交換子](../../../代数系/LIE/LIE4/index.md#thm-lie4-fundamental-flow-antihom)は

$$
[\rho_\xi,\rho_\eta]=-\rho_{[\xi,\eta]}.
$$

また余随伴作用に沿って2形式の評価関数を微分すると

$$
\rho_\xi\bigl(\omega_{\mathrm{KKS}}(\rho_\eta,\rho_\zeta)\bigr)
=-\langle\nu,[\xi,[\eta,\zeta]]\rangle.
$$

外微分の三ベクトル公式に代入すると

$$
\begin{aligned}
d\omega_{\mathrm{KKS}}(\rho_\xi,\rho_\eta,\rho_\zeta)
={}&-\sum_{\mathrm{cyc}}\langle\nu,[\xi,[\eta,\zeta]]\rangle\\
&+\sum_{\mathrm{cyc}}\langle\nu,[[\xi,\eta],\zeta]\rangle=0.
\end{aligned}
$$

二つの巡回和はそれぞれ[Lie括弧のJacobi恒等式](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)から零です。軌道の接方向は $\rho_\xi$ で張られるため、$d\omega_{\mathrm{KKS}}=0$ です。

**Poisson括弧の一致。** まず線形関数 $F_\xi(\nu)=\langle\nu,\xi\rangle$ では

$$
dF_\xi(\rho_\eta(\nu))
=\langle\rho_\eta(\nu),\xi\rangle
=\langle\nu,[\xi,\eta]\rangle
=\omega_{\mathrm{KKS}}(\rho_\xi(\nu),\rho_\eta(\nu)).
$$

接ベクトルは $\rho_\eta(\nu)$ で張られるため、$\iota_{\rho_\xi}\omega_{\mathrm{KKS}}=dF_\xi$ です。

一般の軌道上の滑らかな関数 $f$ では、点 $\nu$ の近傍で $f$ を $\mathfrak g^*$ 上の滑らかな関数 $\widetilde f$ へ局所延長します。軌道の局所座標を周囲の座標へ延ばせるため、そのような局所延長は存在します。$\xi=d\widetilde f_\nu\in\mathfrak g$ と置くと、任意の軌道接方向 $\rho_\eta(\nu)$ に対して

$$
\begin{aligned}
df_\nu(\rho_\eta(\nu))
&=\langle\rho_\eta(\nu),d\widetilde f_\nu\rangle\\
&=\langle\nu,[d\widetilde f_\nu,\eta]\rangle
=\omega_{\mathrm{KKS}}(\rho_\xi(\nu),\rho_\eta(\nu)).
\end{aligned}
$$

従って $X_f(\nu)=\rho_{d\widetilde f_\nu}(\nu)$ です。別の延長との差の微分 $\zeta$ は全軌道接方向を消すので、全 $\eta$ で $\langle\nu,[\zeta,\eta]\rangle=0$ となり、$\rho_\zeta(\nu)=0$ です。ゆえに $X_f$ は延長の選び方に依存しません。

軌道上の $f,g$ と延長 $\widetilde f,\widetilde g$ について[SYM4のPoisson括弧の定義](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)を使うと

$$
\begin{aligned}
\{f,g\}_{\mathrm{KKS}}(\nu)
&=df_\nu(X_g(\nu))\\
&=\langle\nu,[d\widetilde f_\nu,d\widetilde g_\nu]\rangle
=\{\widetilde f,\widetilde g\}_+(\nu).
\end{aligned}
$$

したがって軌道上の括弧は、周囲の正のLie–Poisson括弧の制限として、延長の選び方によらず定まります。
<!-- proof-end -->

## 5. Casimirとシンプレクティック葉

ある特定のHamiltonianに依存せずに保存する量があれば、どの運動もその等位集合から出ません。これを関数の括弧で特徴づけます。

<a id="def-gmech6-casimir"></a>

<!-- formal-statement-start -->
> **定義（Casimir関数）**  
> Lie–Poisson空間 $\mathfrak g^*$ 上の滑らかな関数 $C$ が任意の滑らかな $F$ について次を満たすとき、$C$ をCasimir関数とする。

$$
\{C,F\}_+=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech6-casimir -->
### 直接例：角運動量の長さ

**定義の確認**：全ての滑らかな関数との括弧が零になることを外積の直交性で確認します。

$SO(3)$ で $C(\mu)=|\mu|^2/2$ とすると $\nabla C=\mu$ なので

$$
\{C,F\}_+=\mu\cdot(\mu\times\nabla F)=0
$$

が全 $F$ について成り立ちます。よって $C$ はCasimirであり、球面 $|\mu|=r$ が自然な保存集合です。
<!-- definition-example-end -->

<a id="thm-gmech6-leaves"></a>

<!-- formal-statement-start -->
> **定理（Casimirと余随伴シンプレクティック葉）**  
> $G$ が連結な有限次元実Lie群なら、滑らかな $C$ がCasimirであることと、全ての余随伴軌道で一定であることは同値である。また正のLie–Poisson構造の連結なシンプレクティック葉は余随伴軌道に一致する。$G$ が非連結な場合の葉は一般に余随伴軌道の連結成分である。
<!-- formal-statement-end -->

### 証明の見取り図

線形Hamiltonianが全軌道方向を生成し、一般のHamiltonianも必ず軌道に接することを両方向で使います。

<!-- proof-start -->
### 証明

$C$ がCasimirなら線形関数 $F_\xi(\mu)=\langle\mu,\xi\rangle$ に対して

$$
dC_\mu(\rho_\xi(\mu))=\{C,F_\xi\}_+(\mu)=0.
$$

軌道の接空間はこれらの速度で張られるため $C$ は軌道上の滑らかな曲線に沿って一定です。$G$ が連結なら軌道も連結なので軌道全体で一定です。

逆に $C$ が軌道上で一定なら接方向で $dC=0$ です。[Hamilton方程式](#thm-gmech6-flow)の $X_F(\mu)=\rho_{dF_\mu}(\mu)$ は軌道方向なので

$$
\{C,F\}_+(\mu)=dC_\mu(X_F(\mu))=0.
$$

従ってCasimirです。さらに一般のHamiltonianが与える速度は全て軌道の接空間にあり、逆に任意の $\rho_\xi$ は $F_\xi$ のHamiltonベクトル場です。これによりPoisson構造の速度分布は軌道の接分布と等しくなります。[余随伴軌道のシンプレクティック構造定理](#thm-gmech6-kks)により軌道自身が非退化なシンプレクティック多様体なので、その極大連結積分部分多様体は余随伴軌道です。非連結な群では連結成分ごとに議論します。
<!-- proof-end -->

$SO(3)$ の非零葉は球面で、接ベクトル $u,v\in\mu^\perp$、$|\mu|=r$ に対するKKS形式は

$$
\omega_{\mathrm{KKS},\mu}(u,v)
=\frac{\mu\cdot(u\times v)}{r^2}.
$$

$u=\xi\times\mu$、$v=\eta\times\mu$ と置き、$|\mu|^2=r^2$ を使います。ベクトル三重積の公式 $a\times(b\times c)=b(a\cdot c)-c(a\cdot b)$ に $a=\xi\times\mu,b=\eta,c=\mu$ を代入すると

$$
\begin{aligned}
(\xi\times\mu)\times(\eta\times\mu)
&=\eta\bigl((\xi\times\mu)\cdot\mu\bigr)
-\mu\bigl((\xi\times\mu)\cdot\eta\bigr)\\
&=-\mu\bigl(\eta\cdot(\xi\times\mu)\bigr)\\
&=\bigl(\mu\cdot(\xi\times\eta)\bigr)\mu.
\end{aligned}
$$

ここで第2行は外積の直交性、第3行はスカラー三重積の循環性を使いました。この等式の両辺と $\mu$ の内積を取って $r^2$ で割れば

$$
\frac{\mu\cdot(u\times v)}{r^2}
=\frac{\bigl(\mu\cdot(\xi\times\eta)\bigr)|\mu|^2}{r^2}
=\mu\cdot(\xi\times\eta)
$$

となり、KKS形式の定義式と一致します。球面の極座標 $\mu=r(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$ では

$$
\omega_{\mathrm{KKS}}=r\sin\theta\,d\theta\wedge d\phi.
$$

実際、パラメータ表示の偏微分から $\partial_\theta\mu\times\partial_\phi\mu=r\sin\theta\,\mu$ となり、上で得た球面上のKKS形式の式に代入すると係数が $r\sin\theta$ になります。正の向きで積分すれば

$$
\int_{S_r^2}\omega_{\mathrm{KKS}}
=\int_0^{2\pi}\int_0^\pi r\sin\theta\,d\theta\,d\phi
=4\pi r.
$$

角運動量空間全体の次元は3ですが、各球面葉は2次元です。$r=0$ の葉は一点であり、**Casimirの等位集合と葉を機械的に同一視してよいとは限りません**。次の演習ではその差が際立つLie代数も扱います。

## 6. 演習

### Level A

<a id="ex-gmech6-a01"></a>
**A1. 無限小余随伴速度。** $SO(3)$ で $\mu=(1,2,3)$、$\xi=e_3$ とする。$\rho_\xi(\mu)$ を求め、双対評価の定義でも一成分を検算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [無限小作用の定義](#def-gmech6-coadjoint-tangent)で $e_3\times e_1=e_2$ と置けば、$\eta=e_1$ に対して

$$
-\langle\mu,[e_3,e_1]\rangle
=-(1,2,3)\cdot e_2=-2.
$$

一方、$\rho_\xi(\mu)=\xi\times\mu$ を全成分で求めると

$$
\rho_{e_3}(\mu)=e_3\times(1,2,3)=(-2,1,0).
$$

第一成分の評価も $\langle(-2,1,0),e_1\rangle=-2$ となるため、符号を含めて一致します。
<!-- solution-end -->

<a id="ex-gmech6-a02"></a>
**A2. 座標括弧。** $SO(3)$ の正の括弧で $\{xy,z\}_+$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [基本括弧](#def-gmech6-lie-poisson)により $\{y,z\}_+=x$、$\{x,z\}_+=-y$ です。[Leibniz則](#thm-gmech6-jacobi)へ代入すると

$$
\{xy,z\}_+=x\{y,z\}_++y\{x,z\}_+=x^2-y^2.
$$

直接計算でも $(y e_1+x e_2)\times e_3=x e_1-y e_2$ の $\mu$ との内積が同じ値です。
<!-- solution-end -->

<a id="ex-gmech6-a03"></a>
**A3. Casimirを確認する。** $SO(3)$ の $C=x^2+y^2+z^2$ が任意のHamiltonianに対して保存することを示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\nabla C=2\mu$ より、任意の滑らかな $H$ に対して

$$
\dot C=\{C,H\}_+=\mu\cdot(2\mu\times\nabla H)=0.
$$

最後の零は外積が $\mu$ に直交することによります。$H$ の形を仮定していないので[Casimirの定義](#def-gmech6-casimir)を満たします。
<!-- solution-end -->

<a id="ex-gmech6-a04"></a>
**A4. 葉の次元。** $SO(3)$ の $\mu\ne0$ と $\mu=0$ における余随伴軌道の次元を求め、$\mathbb R^3$ 全体には非退化な2形式がないことを説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\rho_\xi(\mu)=\xi\times\mu$ の像は $\mu\ne0$ なら $\mu^\perp$ で2次元、$\mu=0$ なら $\{0\}$ で0次元です。三次元の交代行列 $A$ は $A^{\mathsf T}=-A$ だから $\det A=\det(-A)=-\det A$、従って $\det A=0$ です。球面上では2形式が非退化でも、三次元全体では非退化になりません。
<!-- solution-end -->

### Level B

<a id="ex-gmech6-b01"></a>
**B1. Heisenberg型Lie代数。** 基底 $e_1,e_2,e_3$ で $[e_1,e_2]=e_3$、他の基底間の括弧は零とする。双対座標 $(x,y,z)$ のPoisson行列を求め、$z$ がCasimirであること、$z\ne0$ と $z=0$ で葉がどう異なるか示せ。対応する連結Lie群を使ってよい。

- Level: B

<!-- solution-start -->
**詳細解答。** [座標括弧の定義](#def-gmech6-lie-poisson)から $\{x,y\}_+=z$、$\{y,z\}_+=\{z,x\}_+=0$ です。したがってPoisson行列は

$$
\begin{pmatrix}
0&z&0\\-z&0&0\\0&0&0
\end{pmatrix}.
$$

全関数 $F$ に対する括弧は

$$
\{z,F\}_+=0
$$

なので $z$ はCasimirです。$z\ne0$ ではPoisson行列の階数が2です。線形関数 $x,y$ をHamiltonianに選び、$\dot F=\{F,H\}_+$ を各座標に適用すると

$$
X_x=(\{x,x\}_+,\{y,x\}_+,\{z,x\}_+)=(0,-z,0),
$$

$$
X_y=(\{x,y\}_+,\{y,y\}_+,\{z,y\}_+)=(z,0,0).
$$

$z$ は両流れで一定で、$z\ne0$ なら $X_x$ と $X_y$ の流れを順に使って $x,y$ の任意の変位を実現できます。従って[余随伴シンプレクティック葉の定理](#thm-gmech6-leaves)に従い、固定した $z\ne0$ の平面全体が一枚の連結な葉です。

一方、$z=0$ では行列が零であり、全Hamiltonian速度も零です。従って各点がそれぞれ零次元の葉です。Casimirの等位集合である平面 $z=0$ は、一枚の葉ではありません。
<!-- solution-end -->

<a id="ex-gmech6-b02"></a>
**B2. KKS形式の代表独立性。** $\rho_\xi(\nu)=\rho_{\xi'}(\nu)$ のとき $\omega_{\mathrm{KKS}}(\rho_\xi(\nu),\rho_\eta(\nu))$ が $\xi$ の選び方によらないことを示し、非退化性の証明へつなげよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\zeta=\xi-\xi'$ とおくと $\rho_\zeta(\nu)=0$ です。[無限小作用](#def-gmech6-coadjoint-tangent)により全 $\eta$ で $\langle\nu,[\zeta,\eta]\rangle=0$ です。従って

$$
\langle\nu,[\xi,\eta]\rangle-
\langle\nu,[\xi',\eta]\rangle
=\langle\nu,[\zeta,\eta]\rangle=0.
$$

第二引数の代表を $\eta'=\eta+\vartheta$ に替え、$\rho_\vartheta(\nu)=0$ とすると

$$
\begin{aligned}
\langle\nu,[\xi,\eta']\rangle-\langle\nu,[\xi,\eta]\rangle
&=\langle\nu,[\xi,\vartheta]\rangle\\
&=-\langle\nu,[\vartheta,\xi]\rangle=0.
\end{aligned}
$$

これで両引数の代表独立性を確認できました。逆に $v=\rho_\xi(\nu)$ と任意の $\rho_\eta(\nu)$ のKKS値が零なら、全 $\eta$ で $\langle\nu,[\xi,\eta]\rangle=0$ なので $\rho_\xi(\nu)=0$、よって $v=0$ です。これが非退化性です。
<!-- solution-end -->

<a id="ex-gmech6-b03"></a>
**B3. 正負の符号。** $SO(3)$ で $H=(ax^2+by^2+cz^2)/2$、$a,b,c>0$ とする。正・負の括弧での方程式を求め、両方で $H$ と $|\mu|^2$ が保存することを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\nabla H=(ax,by,cz)$ と[運動方程式](#thm-gmech6-flow)から、正の括弧では

$$
\dot x=(b-c)yz,\quad
\dot y=(c-a)zx,\quad
\dot z=(a-b)xy.
$$

負の括弧では全右辺に負号が付きます。どちらでも $\dot\mu=\pm(\nabla H\times\mu)$ なので

$$
\frac{dH}{dt}=\nabla H\cdot\dot\mu=0,\qquad
\frac{d}{dt}|\mu|^2=2\mu\cdot\dot\mu=0
$$

です。零になるのは外積が両因子と直交するためです。速度の符号と保存則の成立を区別できました。
<!-- solution-end -->

<a id="ex-gmech6-b04"></a>
**B4. Jacobi恒等式の再検算。** $SO(3)$ の座標 $x,y,z$ についてJacobiatorを計算せよ。またこれだけでは一般の滑らかな関数でのJacobiを証明したことにならない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\{y,z\}_+=x$、$\{z,x\}_+=y$、$\{x,y\}_+=z$ なので

$$
\{x,\{y,z\}_+\}_++\{y,\{z,x\}_+\}_+
+\{z,\{x,y\}_+\}_+
=\{x,x\}_++\{y,y\}_++\{z,z\}_+=0.
$$

一般関数では二重括弧に二階偏微分が現れます。[Jacobi定理の証明](#thm-gmech6-jacobi)では、これらの項が二階微分の対称性とPoisson係数の反対称性で打ち消されることを確認してから構造定数のJacobiへ帰着しました。
<!-- solution-end -->

### Level C

<a id="ex-gmech6-c01"></a>
**C1. 球面上の二次Hamiltonian。** $SO(3)$ に正のLie–Poisson括弧を入れ、係数 $0<\alpha<\beta<\gamma$ に対してHamiltonianを次のように与える。

$$
H=\frac12(\alpha\mu_1^2+\beta\mu_2^2+\gamma\mu_3^2).
$$

次の問いに答えよ。

1. 運動方程式を出し、$H$ と $|\mu|^2$ の保存を証明せよ。
2. 初期値が $|\mu|=r>0$ のときの葉を特定せよ。
3. 葉上でHamiltonベクトル場が零になる点を全て求めよ。
4. $(r,0,0)$ 付近で球面接平面上の線形化を行い安定性を判定せよ。
5. 負の括弧に替えた場合の変化を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (1) $\nabla H=(\alpha\mu_1,\beta\mu_2,\gamma\mu_3)$ を[正の運動方程式](#thm-gmech6-flow)へ代入し、外積を三成分で展開すると

$$
\dot\mu_1=(\beta-\gamma)\mu_2\mu_3,\quad
\dot\mu_2=(\gamma-\alpha)\mu_3\mu_1,\quad
\dot\mu_3=(\alpha-\beta)\mu_1\mu_2.
$$

$dH/dt=\nabla H\cdot(\nabla H\times\mu)=0$ かつ $d|\mu|^2/dt=2\mu\cdot(\nabla H\times\mu)=0$ です。(2) 従って $|\mu(t)|=r$。非零の $SO(3)$ 余随伴軌道はこの球面であり、[余随伴軌道のシンプレクティック構造定理](#thm-gmech6-kks)によって二次元シンプレクティック葉です。

(3) $\dot\mu_i=0$ の三式における係数は全て非零です。よって $\mu_1\mu_2=\mu_2\mu_3=\mu_3\mu_1=0$ で、非零になれる成分は高々一つです。球面との共通部分から速度零の点は $(\pm r,0,0)$、$(0,\pm r,0)$、$(0,0,\pm r)$ の六点です。

(4) $u=\mu_2,v=\mu_3$ を球面上の局所座標に取り、$\mu_1=\sqrt{r^2-u^2-v^2}$ の正の枝を使います。このとき

$$
\mu_1-r=-\frac{u^2+v^2}{r+\sqrt{r^2-u^2-v^2}}=O(u^2+v^2).
$$

したがって一次摂動には $\delta\mu_1$ が現れず、第二・第三式の一次項を取り出せば

$$
\begin{pmatrix}\dot u\\\dot v\end{pmatrix}
=\begin{pmatrix}
0&r(\gamma-\alpha)\\
r(\alpha-\beta)&0
\end{pmatrix}
\begin{pmatrix}u\\v\end{pmatrix}.
$$

この線形化行列を $A$ と置くと、行列積を直接計算して

$$
A^2=r^2(\gamma-\alpha)(\alpha-\beta)I_2=-\omega^2 I_2,
\qquad \omega=r\sqrt{(\gamma-\alpha)(\beta-\alpha)}>0
$$

となります。従って特性方程式は $\lambda^2=-\omega^2$ で固有値は $\pm i\omega$ です。冪級数を偶数項と奇数項に分ければ

$$
e^{tA}=\cos(\omega t)I_2+\frac{\sin(\omega t)}{\omega}A.
$$

右辺は全ての実数 $t$ で有界なので、球面接方向の線形系は安定です。これは非線形安定性まで自動的に主張するものではありません。

(5) 負の括弧では速度と線形化行列の符号が逆になります。しかし保存量の外積直交性は変わらず、速度零の点も変わりません。固有値が $\lambda$ から $-\lambda$ へ置き換わるだけなので純虚数性も変わりません。
<!-- solution-end -->

Lie–Poisson括弧は空間全体で退化を許しつつ、各余随伴軌道で非退化なシンプレクティック力学を回復します。GMECH7ではこの枠組みを回転系の角運動量球面に適用し、物体座標・空間座標の符号とエネルギー曲線を追います。
