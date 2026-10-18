# GR9 物質作用と電磁場の応力テンソル

<!-- definition-example-audit: strict -->

[GR8の完全流体テンソル](../GR8/index.md#def-gr8-perfect-fluid-stress)は、流体とともに動く観測者の測定値から組み立てました。しかし電磁場は圧力が三方向で等しい流体ではありません。電場の向きには張力が現れ、電磁波はエネルギーと運動量を運びます。物質を一種類ずつ当て推量で書くのではなく、**物質を記述する作用から、何を重力の源として数えるかを決める方法**が必要です。

[GR3の自由粒子の作用](../GR3/index.md#def-gr3-proper-time-action)や[AMECH2のLagrange方程式](../../AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)では、軌道を動かして運動方程式を導きました。今回は場の配置を変えてMaxwell方程式を求める変分と、計量を変えて応力テンソルを得る変分を区別します。後者がGR10・GR12で重力作用と物質作用を結ぶ入口になります。

以下、$M$ は向きと時間向きを持つ4次元Lorentz多様体、$g$ は符号 $(-,+,+,+)$ の滑らかな計量、$\nabla$ は[計量両立かつ捩れのない接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)です。添字は $0,1,2,3$、$x^0=ct$、$c>0$、真空の透磁率 $\mu_0>0$、誘電率 $\varepsilon_0=1/(\mu_0c^2)$ とします。境界を避ける変分にはコンパクト台を仮定します。積分は向きを選んだ座標で行い、$\sqrt{-g}$ は計量行列式の負の平方根の正値、$d^4x=dx^0dx^1dx^2dx^3$ です。

## 1. 作用を何について変えるか

作用とは、場の配置ごとに一つの実数を対応させる汎関数です。力学で位置を変えたときの作用と同様、場 $\psi$ を $\psi+s\eta$ へ動かし、$s=0$ での微分をとることができます。**場の変分**では計量を固定し、**計量変分**ではあらかじめ選んだ物質場の独立変数を固定します。本章の電磁場では共変ポテンシャル $A_\mu$ を独立変数とし、添字を上げた $A^\mu$ は固定しません。変分時の固定対象を取り違えると、計量に依存する項を見落として応力を誤って求めます。

座標体積 $d^4x$ は座標変換で変わりますが、Lorentz計量の体積密度 $\sqrt{-g}\,d^4x$ は座標によらず積分できます。場のラグランジアン密度 $\mathcal L_m$ は本章ではエネルギー密度の単位を持ち、物理的な作用を次で書きます。

<a id="def-gr9-matter-action"></a>

<!-- formal-statement-start -->
> **定義（局所物質作用）**  
> 領域 $\Omega\subset M$ 上で物質場 $\psi$ とLorentz計量 $g$ に依存するスカラー $\mathcal L_m(g,\psi,\nabla\psi)$ が与えられたとき、$\sqrt{-g}\,\mathcal L_m$ を座標体積に掛ける積分密度として、物質作用を

$$
S_m[g,\psi]=\frac1c\int_\Omega\sqrt{-g}\,\mathcal L_m\,d^4x
$$

> とする。場を固定した計量変分と、計量を固定した場の変分は別々に行う。場を固定するとは選んだ独立な場変数を固定することで、特に電磁ポテンシャルには $A_\mu$ を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr9-matter-action -->
**定義の確認**：Minkowski計量 $g_{\mu\nu}=\mathrm{diag}(-1,1,1,1)$ と定数の $\mathcal L_m=L_0$ を、座標四直方体 $\Omega=[0,c\Delta t]\times[0,L]^3$ に与えます。$\det g=-1$ なので $\sqrt{-g}=1$、積分は

$$
S_m=\frac{L_0}{c}(c\Delta t)L^3=L_0L^3\Delta t.
$$

確かにエネルギー密度×体積×時間の次元は作用（J s）です。これは変分の練習模型であり、定数 $L_0$ のみから一般の物質運動が決まるとは主張していません。
<!-- definition-example-end -->

### 1.1 体積密度と逆計量の変分

計量行列の恒等式 $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu_\nu$ を変分すると

$$
(\delta g^{\mu\alpha})g_{\alpha\nu}
+g^{\mu\alpha}\delta g_{\alpha\nu}=0.
$$

左辺の第一添字を $g_{\lambda\mu}$ で縮約すると

$$
g_{\lambda\mu}\delta g^{\mu\alpha}g_{\alpha\nu}
+\delta g_{\lambda\nu}=0.
$$

自由添字 $\lambda$ を $\mu$ と書き換え、対称性 $g_{\mu\nu}=g_{\nu\mu}$ を用いると、両変分は独立ではなく

$$
\boxed{\delta g_{\mu\nu}=-g_{\mu\alpha}g_{\nu\beta}\delta g^{\alpha\beta}.}
$$

また行列式の微分（可逆行列 $G$ の $\delta\det G=(\det G)\operatorname{tr}(G^{-1}\delta G)$）を $G=(g_{\mu\nu})$ へ適用して

$$
\delta g=g\,g^{\mu\nu}\delta g_{\mu\nu}
=-g\,g_{\mu\nu}\delta g^{\mu\nu},
$$

<a id="eq-gr9-metric-volume-variation"></a>

$$
\boxed{\delta\sqrt{-g}
=\frac12\sqrt{-g}\,g^{\mu\nu}\delta g_{\mu\nu}
=-\frac12\sqrt{-g}\,g_{\mu\nu}\delta g^{\mu\nu}.}
$$

行列式 $g=\det(g_{\mu\nu})<0$ は4次元Lorentz計量の非退化性と符号数を使ったものです。**$\sqrt{-g}$ の符号を先に決め、逆計量を変えるか計量を変えるかを明記する**のがこの後の計算の要点です。

## 2. 計量変分から応力テンソルを定義する

曲がった時空でエネルギーの「位置ごとの量」を取り出すには、作用が計量の変化にどれだけ反応するかを測ります。物質の場の方程式はこの定義自体に必要ありません。局所作用の変分に計量の微分が入らない場合、係数をそのまま読み取れます。微分がある一般の場合には部分積分と境界条件を処理してから定義します。

<a id="def-gr9-hilbert-stress"></a>

<!-- formal-statement-start -->
> **定義（計量変分によるHilbert応力テンソル）**  
> 滑らかなLorentz計量 $g$ と物質場 $\psi$ に対し、物質場の独立変数 $\psi$ を固定したコンパクト台の対称変分 $\delta g^{\mu\nu}$ のもとで

$$
\left.\delta S_m\right|_\psi
=-\frac1{2c}\int_\Omega\sqrt{-g}\,
T_{\mu\nu}\,\delta g^{\mu\nu}\,d^4x
$$

> が成り立つとき、対称テンソル $T_{\mu\nu}$ をHilbert応力テンソルと定義する。等価に、共変計量を独立変数に選べば

$$
\left.\delta S_m\right|_\psi
=\frac1{2c}\int_\Omega\sqrt{-g}\,
T^{\mu\nu}\,\delta g_{\mu\nu}\,d^4x.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr9-hilbert-stress -->
**定義の確認**：$\mathcal L_m=-V_0$（$V_0>0$ は一定）を模型として、場変数を含まない体積作用を考えます。逆計量だけを動かすと、前節の体積変分から

$$
\delta S_m=\frac1c\int_\Omega
(-V_0)\left(-\frac12\sqrt{-g}g_{\mu\nu}\delta g^{\mu\nu}\right)d^4x
=\frac1{2c}\int_\Omega\sqrt{-g}V_0g_{\mu\nu}\delta g^{\mu\nu}d^4x.
$$

定義式と係数を比較すれば $T_{\mu\nu}=-V_0g_{\mu\nu}$。Minkowski静止枠では $T^{00}=V_0$、$T^{ii}=-V_0$ です。エネルギー密度が正でも圧力が負になりうるため、応力を単なる正の「密度」と同一視しない例です。
<!-- definition-example-end -->

$\mathcal L_m$ が計量の微分を含まず、独立な物質変数を固定できる場合は、積の変分から簡便公式を得ます。

<a id="prop-gr9-stress-from-lagrangian"></a>

<!-- formal-statement-start -->
> **命題（計量の微分を含まない作用の応力）**  
> $S_m=(1/c)\int\sqrt{-g}\mathcal L_m\,d^4x$ の $\mathcal L_m$ が $g^{\mu\nu}$ に代数的に依存し、固定する物質場の独立成分を指定したとき、Hilbert応力は

$$
\boxed{T_{\mu\nu}
=-2\left.\frac{\partial\mathcal L_m}{\partial g^{\mu\nu}}\right|_\psi
+g_{\mu\nu}\mathcal L_m.}
$$

> 変分は対称な $\delta g^{\mu\nu}$ に関して行い、偏微分はその係数として定める。
<!-- formal-statement-end -->

### 証明の見取り図

ラグランジアン密度の変分と体積要素の変分を分け、$\delta g^{\mu\nu}$ の係数を一つにまとめます。

<!-- proof-start -->
### 証明

物質変数を固定したので

$$
\delta\mathcal L_m
=\frac{\partial\mathcal L_m}{\partial g^{\mu\nu}}
\delta g^{\mu\nu}.
$$

前節の[体積要素の変分](#eq-gr9-metric-volume-variation)を代入すると

$$
\begin{aligned}
\delta S_m
&=\frac1c\int_\Omega
\bigl[(\delta\sqrt{-g})\mathcal L_m
+\sqrt{-g}\delta\mathcal L_m\bigr]d^4x\\
&=\frac1c\int_\Omega\sqrt{-g}
\left[\frac{\partial\mathcal L_m}{\partial g^{\mu\nu}}
-\frac12g_{\mu\nu}\mathcal L_m\right]
\delta g^{\mu\nu}d^4x.
\end{aligned}
$$

任意のコンパクト台の対称変分に対する係数を[Hilbert応力の定義](#def-gr9-hilbert-stress)と比較し、命題の式を得ます。$\square$
<!-- proof-end -->

## 3. 電磁場の作用：何を固定するか

[EMAG6の荷電粒子のラグランジアンで用いた電磁ポテンシャル](../../EMAG/EMAG6/index.md#def-emag6-charged-particle-lagrangian)を曲がった時空へ延ばします。ここでは局所的に滑らかな1形式 $A=A_\mu dx^\mu$ を使い、場の強さを

$$
F_{\mu\nu}:=\nabla_\mu A_\nu-\nabla_\nu A_\mu
=\partial_\mu A_\nu-\partial_\nu A_\mu
$$

と置きます。最後の等号にはLevi-Civita接続の $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$ を使いました。$F_{\mu\nu}=-F_{\nu\mu}$ は定義から直ちに従います。さらに **閉形式条件** は反対称性だけではなく、$F$ がポテンシャルから作られたことに由来します。$A$ の二階偏微分が交換できるので、

<a id="eq-gr9-electromagnetic-closure"></a>

$$
\begin{aligned}
&\partial_\alpha F_{\mu\nu}
+\partial_\mu F_{\nu\alpha}
+\partial_\nu F_{\alpha\mu}\\
&=(\partial_\alpha\partial_\mu A_\nu-\partial_\mu\partial_\alpha A_\nu)
+(\partial_\mu\partial_\nu A_\alpha-\partial_\nu\partial_\mu A_\alpha)
+(\partial_\nu\partial_\alpha A_\mu-\partial_\alpha\partial_\nu A_\mu)=0.
\end{aligned}
$$

捩れのない接続では、この巡回和の接続係数項も対称性によって相殺されます。従って $\nabla_{[\alpha}F_{\mu\nu]}=0$ です。電磁ポテンシャルの大域的な存在は仮定せず、この節は局所表示で議論します。

<a id="def-gr9-maxwell-action"></a>

<!-- formal-statement-start -->
> **定義（曲がった時空の真空Maxwell作用）**  
> Lorentz計量 $g$ と滑らかな共変ポテンシャル $A_\mu$ に対して $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ とする。電磁場の作用は

$$
\boxed{S_{\rm EM}[g,A]
=-\frac1{4\mu_0c}\int_\Omega\sqrt{-g}\,
F_{\mu\nu}F^{\mu\nu}\,d^4x,}
$$

> ただし $F^{\mu\nu}=g^{\mu\alpha}g^{\nu\beta}F_{\alpha\beta}$ とする。計量変分では **$A_\mu$ と $F_{\mu\nu}$ を固定**し、$F^{\mu\nu}$ と $\sqrt{-g}$ の計量依存だけを変える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr9-maxwell-action -->
**定義の確認**：Minkowski枠でポテンシャルを $A_\mu=(-\phi/c,A_i)$ とし、

$$
E_i=-\partial_i\phi-\partial_t A_i,\quad
F_{0i}=-E_i/c,\quad
F_{ij}=\epsilon_{ijk}B_k,\quad
B=\nabla\times\mathbf A
$$

を計算します。$F_{0i}$ の符号は $x^0=ct$ と $A_0=-\phi/c$ から出ます。$\eta^{00}=-1$ より $F^{0i}=+E_i/c$。反対称性のため各独立な組を2回数えると

$$
F_{\mu\nu}F^{\mu\nu}
=2\left(B^2-\frac{E^2}{c^2}\right),
\quad
\mathcal L_{\rm EM}
=\frac{\varepsilon_0 E^2}{2}-\frac{B^2}{2\mu_0}.
$$

抽象的な成分式を具体的なポテンシャルで確かめます。Minkowski座標 $(x^0,x,y,z)$ で定数 $E_0,B_0$ を取り、

$$
A_0=\frac{E_0x}{c},\qquad A_2=B_0x,\qquad A_1=A_3=0
$$

とすれば $\phi=-E_0x$ であり、

$$
F_{01}=-\frac{E_0}{c},\qquad F_{12}=B_0,\qquad
\mathbf E=E_0\mathbf e_x,\qquad \mathbf B=B_0\mathbf e_z.
$$

他の独立な $F_{\mu\nu}$ は零です。よって $F^2=2(B_0^2-E_0^2/c^2)$、$\mathcal L_{\rm EM}=\varepsilon_0E_0^2/2-B_0^2/(2\mu_0)$ と具体的に定義式を検算できます。

これは[EMAG8の電磁エネルギー密度](../../EMAG/EMAG8/index.md#def-emag8-energy-flux)とは異なります。ラグランジアン密度はエネルギー密度そのものではありません。さらにゲージ変換 $A_\mu\mapsto A_\mu+\partial_\mu\chi$ に対して偏微分の交換から変換後の $F'_{\mu\nu}-F_{\mu\nu}=\partial_\mu\partial_\nu\chi-\partial_\nu\partial_\mu\chi=0$ で、作用も変わりません。
<!-- definition-example-end -->

## 4. 電磁場の応力テンソルを計算する

計量が $F_{\mu\nu}$ に直接入るわけではありません。入るのは、**添字を上げる逆計量二個**と体積要素です。添字を二つとも上げた $F^{\mu\nu}$ まで固定すると、計量への応答を消してしまいます。

<a id="thm-gr9-em-stress"></a>

<!-- formal-statement-start -->
> **定理（Maxwell作用からのHilbert応力テンソル）**  
> 4次元Lorentz時空上の[真空Maxwell作用](#def-gr9-maxwell-action)について、$A_\mu$ を固定して逆計量をコンパクト台で変分すると、[Hilbert応力](#def-gr9-hilbert-stress)は

$$
\boxed{T_{\mu\nu}^{\rm EM}
=\frac1{\mu_0}\left(
F_{\mu\alpha}F_\nu{}^\alpha
-\frac14 g_{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}
\right).}
$$

> このテンソルは対称で、4次元では跡 $T^\mu{}_\mu=0$ である。成立にMaxwell方程式は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

計量の逆行列を二回使って $F^{\alpha\beta}$ を作るため、同じ形の寄与が2個現れます。その係数と $\delta\sqrt{-g}$ の寄与を別々に確認します。反対称性で二つの積を同じ形に直すところが核心です。

<!-- proof-start -->
### 証明

$F_{\alpha\beta}$ は固定した $A_\mu$ の外微分なので $\delta F_{\alpha\beta}=0$ です。したがって

$$
\begin{aligned}
\delta(F_{\alpha\beta}F^{\alpha\beta})
&=F_{\alpha\beta}F_{\rho\sigma}
\delta(g^{\alpha\rho}g^{\beta\sigma})\\
&=F_{\alpha\beta}F_{\rho\sigma}
\bigl(g^{\beta\sigma}\delta g^{\alpha\rho}
+g^{\alpha\rho}\delta g^{\beta\sigma}\bigr)\\
&=2F_{\mu\lambda}F_\nu{}^\lambda\delta g^{\mu\nu}.
\end{aligned}
$$

最後はダミー添字を交換し $F_{\alpha\beta}=-F_{\beta\alpha}$ を両因子に使いました。$\mathcal L_{\rm EM}=-(4\mu_0)^{-1}F^2$ の計量変分は

$$
\left.\delta\mathcal L_{\rm EM}\right|_A
=-\frac1{2\mu_0}F_{\mu\alpha}F_\nu{}^\alpha\delta g^{\mu\nu}.
$$

[体積要素の変分](#eq-gr9-metric-volume-variation)を合わせると

$$
\begin{aligned}
\delta S_{\rm EM}
&=\frac1c\int_\Omega\sqrt{-g}\left[
-\frac1{2\mu_0}F_{\mu\alpha}F_\nu{}^\alpha
+\frac1{8\mu_0}g_{\mu\nu}F^2
\right]\delta g^{\mu\nu}d^4x\\
&=-\frac1{2c}\int_\Omega\sqrt{-g}\,
T_{\mu\nu}^{\rm EM}\delta g^{\mu\nu}d^4x.
\end{aligned}
$$

定義と比較して主張のテンソルを得ます。$F_{\mu\alpha}F_\nu{}^\alpha$ は $\mu,\nu$ を交換しても同じ積なので対称です。最後に $g^{\mu\nu}$ で縮約すると

$$
T^\mu{}_\mu
=\frac1{\mu_0}
\left(F_{\mu\alpha}F^{\mu\alpha}
-\frac14\cdot4F_{\alpha\beta}F^{\alpha\beta}\right)=0.
$$

4次元という仮定は係数 $4$ に使われます。$\square$
<!-- proof-end -->

### 4.1 静止系の電場・磁場：張力と圧力

Minkowski枠で $F_{0i}=-E_i/c$、$F_{ij}=\epsilon_{ijk}B_k$ を代入し、まず $00$ 成分を求めます。

$$
\begin{aligned}
T^{00}
&=\frac1{\mu_0}\left(
F^{0i}F^0{}_i-\frac14\eta^{00}F^2\right)\\
&=\frac1{\mu_0}\left(
\frac{E^2}{c^2}
+\frac12B^2-\frac{E^2}{2c^2}\right)\\
&=\boxed{\frac{\varepsilon_0E^2}{2}+\frac{B^2}{2\mu_0}}.
\end{aligned}
$$

これは[EMAG8のエネルギー密度](../../EMAG/EMAG8/index.md#def-emag8-energy-flux)と一致します。混合成分は

$$
T^{0i}
=\frac1{\mu_0}F^{0j}F^i{}_j
=\frac1{\mu_0c}\epsilon_{ijk}E_jB_k
=\frac{(\mathbf E\times\mathbf B)^i}{\mu_0c}.
$$

したがって $cT^{0i}$ は[Poyntingベクトル](../../EMAG/EMAG8/index.md#def-emag8-energy-flux)です。空間応力については時間添字の項と空間添字の項を分けます。$\sum_k\epsilon_{ik\ell}\epsilon_{jkm}B_\ell B_m=\delta^{ij}B^2-B_iB_j$ を用い、

$$
\begin{aligned}
F^{i\alpha}F^j{}_\alpha
&=F^{i0}F^j{}_0+F^{ik}F^j{}_k\\
&=-\frac{E_iE_j}{c^2}+\delta^{ij}B^2-B_iB_j.
\end{aligned}
$$

さらに $-\eta^{ij}F^2/4=\delta^{ij}(E^2/c^2-B^2)/2$ を足すと、空間成分は

$$
\boxed{T^{ij}
=\left(\frac{\varepsilon_0E^2}{2}+\frac{B^2}{2\mu_0}\right)\delta^{ij}
-\varepsilon_0E_iE_j-\frac{B_iB_j}{\mu_0}.}
$$

例えば $\mathbf E=(E,0,0),\mathbf B=0$ なら

$$
(T^{\mu\nu})=
\frac{\varepsilon_0E^2}{2}\operatorname{diag}(1,-1,1,1).
$$

電場方向の $T^{11}$ が負、横方向の $T^{22},T^{33}$ が正です。[GR8の等方圧力模型](../GR8/index.md#def-gr8-perfect-fluid-stress)のような $T^{ij}=p\delta^{ij}$ ではありません。この応力の異方性こそ、流体の式だけで電磁場を記述できない理由です。

## 5. ポテンシャルの変分とエネルギーの受け渡し

ここまでの応力は計量変分から求め、場の方程式を使いませんでした。次に**同じ作用を $A_\nu$ で変分**すると別の結果が出ます。外部電流 $J^\nu$ はここでは計量を固定した背景として、相互作用密度 $J^\nu A_\nu$ を加えます。$\delta A_\nu$ はコンパクト台に取り、部分積分の境界項を零にします。

<a id="thm-gr9-maxwell-variation"></a>

<!-- formal-statement-start -->
> **定理（電磁ポテンシャル変分とMaxwell方程式）**  
> 滑らかな $g,A_\mu,J^\mu$ を持つ領域で、計量と $J^\mu$ を固定した作用

$$
S[g,A;J]=S_{\rm EM}[g,A]
+\frac1c\int_\Omega\sqrt{-g}\,J^\nu A_\nu\,d^4x
$$

> がすべてのコンパクト台変分 $\delta A_\nu$ に対して停留するための必要十分条件は

$$
\boxed{\nabla_\mu F^{\mu\nu}=-\mu_0J^\nu}
$$

> である。符号は $A_\mu=(-\phi/c,\mathbf A)$、$J^\mu=(c\rho,\mathbf j)$ の規約による。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta F$ を2項で展開して反対称性によりまとめます。共変発散の積の微分を逆に用いて境界へ移し、任意の $\delta A_\nu$ の係数を零とします。

<!-- proof-start -->
### 証明

計量固定だから $\delta\sqrt{-g}=0$、$\delta F_{\mu\nu}=\nabla_\mu\delta A_\nu-\nabla_\nu\delta A_\mu$ です。ゆえに

$$
\begin{aligned}
\delta S_{\rm EM}
&=-\frac1{2\mu_0c}\int_\Omega\sqrt{-g}\,
F^{\mu\nu}(\nabla_\mu\delta A_\nu-\nabla_\nu\delta A_\mu)d^4x\\
&=-\frac1{\mu_0c}\int_\Omega\sqrt{-g}\,
F^{\mu\nu}\nabla_\mu\delta A_\nu\,d^4x\\
&=\frac1{\mu_0c}\int_\Omega\sqrt{-g}\,
(\nabla_\mu F^{\mu\nu})\delta A_\nu\,d^4x.
\end{aligned}
$$

最後はコンパクト台変分で境界項を落としました。相互作用の変分を加えると

$$
\delta S=\frac1c\int_\Omega\sqrt{-g}\left(
\frac1{\mu_0}\nabla_\mu F^{\mu\nu}+J^\nu
\right)\delta A_\nu d^4x.
$$

任意の滑らかなコンパクト台 $\delta A_\nu$ に対する積分が零なら括弧の成分が各点で零となります。逆に方程式が成り立てば変分は零です。$\square$
<!-- proof-end -->

Minkowski枠では $\nu=0$ の式が $\nabla\cdot\mathbf E=\rho/\varepsilon_0$ に、$\nu=i$ の式が $\nabla\times\mathbf B-\partial_t\mathbf E/c^2=\mu_0\mathbf j$ に戻ります。曲がった時空でも $F_{\mu\nu}$ の反対称性とRicciテンソルの対称性から $\nabla_\nu\nabla_\mu F^{\mu\nu}=0$ なので、式の発散を取ると $\nabla_\nu J^\nu=0$ が必要です。

<a id="prop-gr9-em-force-balance"></a>

<!-- formal-statement-start -->
> **命題（電磁場と荷電物質の局所運動量交換）**  
> 上のMaxwell方程式と恒等式 $\nabla_{[\lambda}F_{\mu\nu]}=0$ が成立するとき、自由電磁場のHilbert応力は

$$
\boxed{\nabla_\mu T_{\rm EM}^{\mu\nu}
=-F^\nu{}_\lambda J^\lambda.}
$$

> 電荷を持つ物質が逆向きの力密度 $F^\nu{}_\lambda J^\lambda$ を受ける模型なら、場と物質の応力の和が共変保存する。
<!-- formal-statement-end -->

### 証明の見取り図

応力の積を微分したとき、$F$ の微分を含む残り三項は反対称性とBianchi型恒等式で相殺されます。最後にMaxwell方程式を代入して物質への力の反作用を取り出します。

<!-- proof-start -->
### 証明

計量両立性から

$$
\begin{aligned}
\mu_0\nabla_\mu T_{\rm EM}^{\mu\nu}
={}&(\nabla_\mu F^{\mu\lambda})F^\nu{}_\lambda
+F^{\mu\lambda}\nabla_\mu F^\nu{}_\lambda
-\tfrac14\nabla^\nu(F_{\alpha\beta}F^{\alpha\beta}).
\end{aligned}
$$

$\nabla_\mu F^\nu{}_\lambda=g^{\nu\rho}\nabla_\mu F_{\rho\lambda}$ とし、閉形式条件

$$
\nabla_\mu F_{\rho\lambda}
+\nabla_\rho F_{\lambda\mu}
+\nabla_\lambda F_{\mu\rho}=0
$$

に $F^{\mu\lambda}$ を掛けます。この等式は前節で導いた[閉形式条件](#eq-gr9-electromagnetic-closure)です。第1項と第3項は反対称性とダミー添字の交換により等しくなり

$$
2F^{\mu\lambda}\nabla_\mu F_{\rho\lambda}
=\frac12\nabla_\rho(F_{\alpha\beta}F^{\alpha\beta}).
$$

両辺に $g^{\nu\rho}/2$ を掛ければ

$$
F^{\mu\lambda}\nabla_\mu F^\nu{}_\lambda
=\frac14\nabla^\nu(F_{\alpha\beta}F^{\alpha\beta}).
$$

従って先の二項が消え、

$$
\nabla_\mu T_{\rm EM}^{\mu\nu}
=\frac1{\mu_0}F^\nu{}_\lambda\nabla_\mu F^{\mu\lambda}
=-F^\nu{}_\lambda J^\lambda.
$$

証明の後半だけでMaxwell方程式を使い、応力の定義自体には使っていません。$\square$
<!-- proof-end -->

Minkowski枠では右辺の空間成分の符号を確かめられます。$F^i{}_0=E_i/c$、$F^i{}_j=\epsilon_{ijk}B_k$ なので

$$
F^i{}_\lambda J^\lambda
=\frac{E_i}{c}(c\rho)+\epsilon_{ijk}B_kj_j
=\rho E_i+(\mathbf j\times\mathbf B)_i.
$$

すなわち[EMAG6のLorentz力](../../EMAG/EMAG6/index.md#principle-emag6-lorentz-force)が**物質が受け取る側**に現れ、場だけの保存則は一般に零ではありません。

## 6. 演習

### Level A

<a id="ex-gr9-a01"></a>
#### GR9-A01 計量の逆変分
- Level: A

$g_{\mu\nu}(s)=\operatorname{diag}(-(1+s)^2,1,1,1)$、$|s|<1$ について、$s=0$ の $\delta g_{00}$、$\delta g^{00}$、$\delta\sqrt{-g}$ を求め、前節の一般公式を確認せよ。

<!-- solution-start -->
**詳細解答。** $g_{00}=-(1+s)^2$ なので $\frac d{ds}g_{00}|_0=-2$。逆数は $g^{00}=-(1+s)^{-2}$ なので $\frac d{ds}g^{00}|_0=+2$。また $g=-(1+s)^2$、$\sqrt{-g}=1+s$（$|s|<1$）より変分は $1$。公式の共変版へ代入すると $\frac12\sqrt{-g}g^{00}\delta g_{00}|_0=\frac12(1)(-1)(-2)=1$ で一致します。逆計量版でも $-\frac12(1)(-1)(2)=1$ です。
<!-- solution-end -->

<a id="ex-gr9-a02"></a>
#### GR9-A02 定数ラグランジアンの応力
- Level: A

$\mathcal L=-V_0$、$V_0>0$ の作用に対し、$T_{\mu\nu}$ とMinkowski枠の $T^{00},T^{11}$ を導け。

<!-- solution-start -->
**詳細解答。** $\partial\mathcal L/\partial g^{\mu\nu}=0$。したがって[計量変分の公式](#prop-gr9-stress-from-lagrangian)より $T_{\mu\nu}=g_{\mu\nu}(-V_0)$。Minkowski枠では添字を2回上げても対角成分の値は変わらず、$T^{00}=-V_0\eta^{00}=V_0$、$T^{11}=-V_0\eta^{11}=-V_0$ です。
<!-- solution-end -->

<a id="ex-gr9-a03"></a>
#### GR9-A03 場の強さとゲージ
- Level: A

Minkowski座標で $A_0=-Ex/c$、$A_1=A_2=A_3=0$（$E$ 定数）とする。$F_{01}$ と $F_{\mu\nu}F^{\mu\nu}$ を求め、$\chi=kx^0x$ による $A_\mu\to A_\mu+\partial_\mu\chi$ で不変なことを示せ。

<!-- solution-start -->
**詳細解答。** $\partial_0A_1=0$、$\partial_1 A_0=-E/c$ より $F_{01}=+E/c$（この与え方の電場は $E_x=-E$ であることに注意）。$F^{01}=-E/c$ なので $F^2=2F_{01}F^{01}=-2E^2/c^2$。変換では $\partial_0\chi=kx$、$\partial_1\chi=kx^0$、したがって $\partial_0\partial_1\chi-\partial_1\partial_0\chi=k-k=0$。$F$ は変わらず $F^2$ も同じです。
<!-- solution-end -->

<a id="ex-gr9-a04"></a>
#### GR9-A04 真空Maxwell作用の静的電場
- Level: A

Minkowski枠の純電場 $\mathbf E=(E,0,0)$ について $\mathcal L_{\rm EM}$ と $T^{00},T^{11},T^{22}$ を求め、違いを説明せよ。

<!-- solution-start -->
**詳細解答。** $B=0$、$F^2=-2E^2/c^2$ なので $\mathcal L_{\rm EM}=E^2/(2\mu_0c^2)=\varepsilon_0E^2/2$。一方、$T^{00}=\varepsilon_0E^2/2$、$T^{11}=-\varepsilon_0E^2/2$、$T^{22}=+\varepsilon_0E^2/2$。今回の純電場では $\mathcal L_{\rm EM}$ と $T^{00}$ が偶然一致しますが、磁場を入れると $\mathcal L_{\rm EM}$ には $-B^2/(2\mu_0)$、$T^{00}$ には $+B^2/(2\mu_0)$ が現れます。両者は定義の異なる量です。
<!-- solution-end -->

<a id="ex-gr9-a05"></a>
#### GR9-A05 電磁エネルギー流束
- Level: A

$\mathbf E=E\mathbf e_x$、$\mathbf B=B\mathbf e_y$ とする。$T^{03}$ とエネルギー流束の $z$ 成分を求めよ。

<!-- solution-start -->
**詳細解答。** $\mathbf e_x\times\mathbf e_y=\mathbf e_z$ なので $(\mathbf E\times\mathbf B)^3=EB$。よって[流束公式](#thm-gr9-em-stress)の成分計算から $T^{03}=EB/(\mu_0c)$、エネルギー流束は $cT^{03}=EB/\mu_0$ です。$c$ を取り落とすと $T^{03}$ と流束の単位が合いません。
<!-- solution-end -->

### Level B

<a id="ex-gr9-b01"></a>
#### GR9-B01 逆計量の二つの寄与
- Level: B

$F_{\alpha\beta}$ を固定したときの $\delta(F_{\alpha\beta}F^{\alpha\beta})$ を最初から展開し、係数 $2$ が現れる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $F^{\alpha\beta}=g^{\alpha\rho}g^{\beta\sigma}F_{\rho\sigma}$ と書き、

$$
\delta(F_{\alpha\beta}F^{\alpha\beta})
=F_{\alpha\beta}F_{\rho\sigma}
\bigl[\delta g^{\alpha\rho}g^{\beta\sigma}
+g^{\alpha\rho}\delta g^{\beta\sigma}\bigr].
$$

第1項は $F_{\mu\lambda}F_\nu{}^\lambda\delta g^{\mu\nu}$。第2項で $\alpha\leftrightarrow\beta$ と $\rho\leftrightarrow\sigma$ を同時交換すると、$F_{\beta\alpha}F_{\sigma\rho}=F_{\alpha\beta}F_{\rho\sigma}$ だから第1項と同じです。したがって両者の和は $2F_{\mu\lambda}F_\nu{}^\lambda\delta g^{\mu\nu}$。二つの逆計量のうち片方だけ変えるのが典型的な係数誤りです。
<!-- solution-end -->

<a id="ex-gr9-b02"></a>
#### GR9-B02 磁場方向の張力と跡
- Level: B

$\mathbf E=0$、$\mathbf B=B\mathbf e_z$ のMinkowski枠で $T^{\mu\nu}$ の対角成分をすべて求め、跡が零であることを確かめよ。

<!-- solution-start -->
**詳細解答。** エネルギー密度を $u=B^2/(2\mu_0)$ とおきます。空間応力式では $T^{ij}=u\delta^{ij}-B_iB_j/\mu_0$。従って $T^{11}=T^{22}=u$、$T^{33}=u-B^2/\mu_0=-u$ です。$\mathbf E=0$ で $T^{0i}=0$、$T^{00}=u$ なので対角は $(u,u,u,-u)$。跡は計量で一度縮約するから $T^\mu{}_\mu=\eta_{\mu\nu}T^{\mu\nu}=-u+u+u-u=0$ となります。対角成分を単純に足した $2u$ はLorentz的な跡ではありません。
<!-- solution-end -->

<a id="ex-gr9-b03"></a>
#### GR9-B03 ポテンシャル変分と電流保存
- Level: B

$S=S_{\rm EM}+(1/c)\int\sqrt{-g}J^\nu A_\nu d^4x$ を考える。$J$ を固定し、コンパクト台の $\delta A_\nu$ によって運動方程式を再導出せよ。さらに $\nabla_\nu J^\nu=0$ が必要な理由を示せ。

<!-- solution-start -->
**詳細解答。** $\delta F_{\mu\nu}=2\nabla_{[\mu}\delta A_{\nu]}$ より反対称性で $\delta S_{\rm EM}=-(\mu_0c)^{-1}\int\sqrt{-g}F^{\mu\nu}\nabla_\mu\delta A_\nu d^4x$。部分積分し、境界項を消すと $(\mu_0c)^{-1}\int\sqrt{-g}(\nabla_\mu F^{\mu\nu})\delta A_\nu d^4x$。相互作用から $c^{-1}\int\sqrt{-g}J^\nu\delta A_\nu d^4x$ を足し、任意変分の係数を零とすると $\nabla_\mu F^{\mu\nu}=-\mu_0J^\nu$ です。さらに $\nabla_\nu\nabla_\mu F^{\mu\nu}=\tfrac12[\nabla_\nu,\nabla_\mu]F^{\mu\nu}=0$（Ricciテンソルの対称性と $F$ の反対称性）だから、発散をとって $-\mu_0\nabla_\nu J^\nu=0$。$\mu_0>0$ により電流保存を得ます。
<!-- solution-end -->

<a id="ex-gr9-b04"></a>
#### GR9-B04 場と塵の運動量交換
- Level: B

Minkowski時空で $J^\mu=(c\rho,0,0,0)$、$\mathbf E=E\mathbf e_x$、$\mathbf B=0$ とする。電磁場の運動量収支 $\partial_\mu T_{\rm EM}^{\mu1}$ の右辺を求め、荷電物質側の力との符号を比較せよ。

<!-- solution-start -->
**詳細解答。** $F^1{}_0=E/c$、$J^0=c\rho$ だから $F^1{}_\lambda J^\lambda=\rho E$。したがって[電磁場の運動量収支](#prop-gr9-em-force-balance)は $\partial_\mu T_{\rm EM}^{\mu1}=-\rho E$。物質が受けるLorentz力密度は $+\rho E$ なので和は零です。ただし、一様な時間・空間に一定の $E,\rho\ne0$ を同時に仮定するとMaxwell方程式に反します。この設問の値は**各点の局所力密度の代数的計算**であって、一様な場と非零密度を含む大域解を構成したものではありません。
<!-- solution-end -->

### Level C

<a id="ex-gr9-c01"></a>
#### GR9-C01 電磁場は完全流体か
- Level: C

Minkowski時空、符号 $(-,+,+,+)$、$\mathbf E=E\mathbf e_x$、$\mathbf B=B\mathbf e_y$（$E,B$ は零でない定数）とする。

1. $F^2$ と $\mathcal L_{\rm EM}$ を求めよ。
2. $u:=T^{00}$、$T^{03}$ と $T^{11},T^{22},T^{33}$ を求めよ。
3. 跡 $T^\mu{}_\mu$ を検算せよ。
4. $B=0,E\ne0$ の場合に、静止する完全流体の応力形式 $T^{ij}=p\delta^{ij}$ と一致できない理由を説明せよ。
5. $E=cB$ としたとき、エネルギー流束の大きさが $cu$ になることを示せ。

<!-- solution-start -->
**詳細解答。** (1) 時間空間成分と空間成分は

$$
F^2=2\left(B^2-\frac{E^2}{c^2}\right),\qquad
\mathcal L_{\rm EM}=\frac{\varepsilon_0E^2}{2}-\frac{B^2}{2\mu_0}.
$$

(2) [応力テンソル](#thm-gr9-em-stress)へ代入し $u=\varepsilon_0E^2/2+B^2/(2\mu_0)$。$\mathbf E\times\mathbf B=EB\mathbf e_z$ なので

$$
T^{03}=\frac{EB}{\mu_0c}.
$$

空間応力は $u\delta^{ij}-\varepsilon_0 E_iE_j-B_iB_j/\mu_0$。従って

$$
T^{11}=u-\varepsilon_0E^2,\qquad
T^{22}=u-\frac{B^2}{\mu_0},\qquad
T^{33}=u.
$$

(3) 非対角成分は計量の対角縮約で寄与せず、

$$
\begin{aligned}
T^\mu{}_\mu
&=-u+(u-\varepsilon_0E^2)
+(u-B^2/\mu_0)+u\\
&=2u-\varepsilon_0E^2-B^2/\mu_0=0.
\end{aligned}
$$

(4) $B=0$ なら $(T^{11},T^{22},T^{33})=(-u,u,u)$。$E\ne0$ なら $u>0$ で三成分が等しくないため、流体と同じ静止観測者を選んだ等方圧力 $p$ で表せません。電磁場の異方性は座標の書き損じではありません。

(5) $E=cB$ なら $u=\varepsilon_0c^2B^2/2+B^2/(2\mu_0)=B^2/\mu_0$、エネルギー流束の大きさは $S=EB/\mu_0=cB^2/\mu_0=cu$。これは一方向の無源平面波の局所的なエネルギー流に対応します（本設問では空間的に一定の値を代数的に用いているだけで、非自明な波動解までは指定していません）。
<!-- solution-end -->

## 7. GR10への接続

物質の計量変分では電磁場の応力が得られ、ポテンシャル変分ではMaxwell方程式が得られました。二つの変分は同じ作用から出ても異なる問いへの答えです。さらに電磁場だけの発散は荷電物質との交換によって非零になりえます。次のGR10では、同じ**計量変分**を重力側のEinstein–Hilbert作用に行い、そこから何が現れるかを導きます。
