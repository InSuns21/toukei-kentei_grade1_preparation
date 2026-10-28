# QFT5 自由場の二点関数・因果的交換子・局所的可換性

<!-- definition-example-audit: strict -->

[QFT4の正準量子化](../QFT4/index.md#def-qft4-smeared-field)で、実自由スカラー場を試験関数で積分した作用素 $\Phi(F)$ と真空 $\Omega$ を作りました。また[等時刻交換関係](../QFT4/index.md#thm-qft4-equal-time-ccr)は得られました。しかし、時刻の違う二つの場はどう相関し、どのような時空的分離で交換できるのでしょうか。等時刻の式をそのまま任意の時刻へ拡張することはできません。

真空で二つの場をこの順に掛けると、空間的に離れていても一般には零でない相関が残ります。一方、**積の順番を入れ替えた差**は、光より速く影響を伝えられないというKlein–Gordon方程式の性質から消えます。この違いを、二点関数のFourier表示、Cauchyデータ、局所エネルギー評価の三つをつないで導きます。

全章を通じ、Minkowski時空 $\mathbb R^{1+3}$、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、**質量 $m>0$ の自由実スカラー場のFock真空**を用います。内積は第1変数線形、交換子は $[A,B]=AB-BA$ です。場の等式は共通不変な[有限粒子Schwartz領域](../QFT4/index.md#def-qft4-fock-space) $\mathcal D_{\mathcal S}$ 上で考え、点での場の積を作用素の積として仮定しません。相関の積分核は分布として扱います。

## 1. 真空に二つの場を掛ける

前章のFourier規格化を引き継ぎ、$x=(t,\boldsymbol x)$、$p=(p^0,\boldsymbol p)$ と書きます。$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$、$d\mu(\boldsymbol p)=d^3p/(2\pi)^3$ とし、時空Schwartz関数 $F$ の変換を

$$
\widetilde F(E,\boldsymbol p)
=\int_{\mathbb R^4}F(t,\boldsymbol x)
e^{iEt-i\boldsymbol p\cdot\boldsymbol x}\,dt\,d^3x,\qquad
u_F(\boldsymbol p)=\frac{\widetilde F(\omega_{\boldsymbol p},\boldsymbol p)}
{\sqrt{2\omega_{\boldsymbol p}}}
$$

とします。実関数なら $\Phi(F)=a(u_F)+a^\dagger(u_F)$ です。複素関数へは実部・虚部から**複素線形**に延長し、消滅演算子が反線形であることを使うと

$$
\Phi(F)=a(u_{\overline F})+a^\dagger(u_F),
\qquad \Phi(F)^*=\Phi(\overline F)\quad\text{on }\mathcal D_{\mathcal S}.
$$

ここで $u_{\overline F}$ は「$F$ の複素共役を先に取ってから正振動数成分を抽出した波束」です。一般に $\overline{u_F}$ ではありません。

真空期待値は、第1変数線形の内積規約に合わせて $\omega_0(A)=\langle A\Omega,\Omega\rangle_{\mathcal F}$ と書きます。これは作用素 $A$ に線形です。二つの場の順序は交換せず、そのまま固定して計算します。

<a id="def-qft5-wightman"></a>

<!-- formal-statement-start -->
> **定義（Wightman二点分布）**
> $m>0$ の自由実スカラー場とFock真空 $\Omega$ について、複素Schwartz関数 $F,G\in\mathcal S(\mathbb R^4;\mathbb C)$ の対へ割り当てる双線形汎関数を

$$
W(F,G)=\omega_0\!\left(\Phi(F)\Phi(G)\right)
=\langle\Phi(F)\Phi(G)\Omega,\Omega\rangle_{\mathcal F}
$$

> と定める。これを真空のWightman二点分布という。時間順序に並べ替えた量ではない。
<!-- formal-statement-end -->

<a id="thm-qft5-wightman-positive"></a>

<!-- formal-statement-start -->
> **定理（真空二点分布の表示と正値性）**
> 質量 $m>0$、内積第1変数線形の前章のFock表現について、任意の複素Schwartz関数 $F,G$ に対し

$$
W(F,G)=\langle u_G,u_{\overline F}\rangle_{\mathfrak h}.
$$

> 特に任意の複素Schwartz関数 $F$ に対し、正値性

$$
W(\overline F,F)=\|u_F\|_{\mathfrak h}^2\ge0
$$

> が成り立つ。この双線形汎関数は、時空差 $z=x-y$ だけに依存する次の緩増加分布を積分核として持つ。

$$
W(z)=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-i\omega_{\boldsymbol p}z^0+i\boldsymbol p\cdot\boldsymbol z}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

真空では消滅演算子が零になり、右側の場が一粒子状態を作ります。左側の場はその一粒子を取り去る成分だけが真空へ戻るため、二点量は一粒子内積になります。正値性はこの内積のノルム二乗であり、点ごとの核の正負を論じることとは違います。

<!-- proof-start -->
### 証明

[QFT4の生成・消滅演算子](../QFT4/index.md#def-qft4-ladder-operators)によって

$$
\Phi(G)\Omega=a^\dagger(u_G)\Omega,\qquad
\Phi(F)\Phi(G)\Omega
=a(u_{\overline F})a^\dagger(u_G)\Omega
+a^\dagger(u_F)a^\dagger(u_G)\Omega.
$$

最後の項は二粒子成分なので真空と直交します。第1項は[前章のFock交換関係](../QFT4/index.md#thm-qft4-fock-ccr)から $\langle u_G,u_{\overline F}\rangle\Omega$ です。これで表示と $G=F$、左引数を $\overline F$ とした正値性が従います。

次に一粒子内積をFourier変換へ戻します。$\overline{u_{\overline F}(\boldsymbol p)}$ は

$$
\overline{u_{\overline F}(\boldsymbol p)}
=\frac1{\sqrt{2\omega_{\boldsymbol p}}}
\int d^4x\,F(x)e^{-i\omega_{\boldsymbol p}x^0
+i\boldsymbol p\cdot\boldsymbol x}
$$

なので、$u_G$ の積分と掛けると

$$
\begin{aligned}
W(F,G)
&=\int\frac{d\mu(\boldsymbol p)}{2\omega_{\boldsymbol p}}
\int d^4x\,d^4y\,F(x)G(y)\\
&\qquad\qquad\cdot
e^{-i\omega_{\boldsymbol p}(x^0-y^0)
+i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}\\
&=\int d^4x\,d^4y\,F(x)G(y)W(x-y).
\end{aligned}
$$

最後は分布の作用としての等号です。Schwartz関数のFourier減衰と $\omega\ge m$ により $\|u_F\|$ は有限個のSchwartz半ノルムで制御され、Cauchy–Schwarzから $W(F,G)$ は連続です。従って上の振動積分は緩増加分布を定め、点での作用素の積を要求しません。
<!-- proof-end -->

<!-- definition-example-start: def-qft5-wightman -->
### 例：Gaussian試験関数が作る正の二点量

**定義の確認**：時空の実Schwartz関数で二点分布の双線形性と正値性を実際に確認します。

$\sigma_t,\sigma_x>0$ として

$$
F(t,\boldsymbol x)
=e^{-t^2/(2\sigma_t^2)-|\boldsymbol x|^2/(2\sigma_x^2)}
$$

を選ぶと、各変数でGaussian Fourier積分を計算して

$$
\widetilde F(\omega_{\boldsymbol p},\boldsymbol p)
=(2\pi)^2\sigma_t\sigma_x^3
e^{-\sigma_t^2\omega_{\boldsymbol p}^2/2
-\sigma_x^2|\boldsymbol p|^2/2}
$$

を得ます。ゆえに

$$
W(F,F)=(2\pi)^4\sigma_t^2\sigma_x^6
\int\frac{d\mu(\boldsymbol p)}{2\omega_{\boldsymbol p}}
e^{-\sigma_t^2\omega_{\boldsymbol p}^2-\sigma_x^2|\boldsymbol p|^2}>0.
$$

分母は $2m$ 以上、分子は急減少なので有限です。$F$ は実数値だから $W(\overline F,F)=W(F,F)$ であり、正値条件を満たします。
<!-- definition-example-end -->

## 2. 二点分布のエネルギーはどこにあるか

正値性は真空のHilbert空間に由来します。もう一つの制約は、真空から場を掛けて作る波束のエネルギーが正であることです。「質量殻上」という条件は[QFT3の分散関係](../QFT3/index.md#thm-qft3-cauchy)と同じですが、二点分布ではFourier変換の**支持**として表れます。

四元運動量 $k=(k^0,\boldsymbol k)$ のMinkowski二乗を $k^2=(k^0)^2-|\boldsymbol k|^2$ とし、$\theta(k^0)$ は $k^0>0$ で1、それ以外で0となる階段関数、$\delta$ はDiracデルタ分布です。

<a id="def-qft5-positive-mass-shell"></a>

<!-- formal-statement-start -->
> **定義（正エネルギー質量殻スペクトル）**
> $m>0$ に対し、正エネルギー質量殻を次の集合とする。

$$
H_m^+=\{(k^0,\boldsymbol k)\in\mathbb R^4:
k^0>0,\ (k^0)^2-|\boldsymbol k|^2=m^2\}.
$$

> 二点分布のFourier変換がこの集合に支持されるとき、自由二点分布についての正エネルギースペクトル条件を満たすという。ここではFourier逆変換を $e^{-ik^0z^0+i\boldsymbol k\cdot\boldsymbol z}$ の指数で書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft5-positive-mass-shell -->
### 例：正の枝と負の枝

**定義の確認**：$\boldsymbol k=0$ なら質量殻方程式は $(k^0)^2=m^2$ で、解は $k^0=\pm m$ です。しかし $k^0>0$ を追加すると $(m,\boldsymbol0)$ だけが残ります。一般の $\boldsymbol k$ でも $k^0=\omega_{\boldsymbol k}$ の枝だけです。負エネルギーの枝を残した和と、正の枝を採る二点関数を混同しません。
<!-- definition-example-end -->

<a id="prop-qft5-spectrum-kg"></a>

<!-- formal-statement-start -->
> **命題（二点分布の質量殻スペクトルと弱い場の方程式）**
> $m>0$ の上のWightman二点分布は、Fourier逆変換の規約の下で

$$
W(z)=\int_{\mathbb R^4}\frac{d^4k}{(2\pi)^4}\,
2\pi\,\theta(k^0)\delta(k^2-m^2)
e^{-ik^0z^0+i\boldsymbol k\cdot\boldsymbol z}
$$

> と書ける。Fourier支持は $H_m^+$ 上にあり、時空差に関するKlein–Gordon作用素 $P_z=\partial_{z^0}^2-\Delta_{\boldsymbol z}+m^2$ に対して分布の意味で $P_zW=0$ となる。従って両引数のいずれにも場の方程式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

デルタ分布の変数変換で正のエネルギー枝だけを積分します。質量殻方程式そのものがFourier空間でKlein–Gordon作用素の係数を零にします。

<!-- proof-start -->
### 証明

固定した $\boldsymbol k$ について $\omega=\sqrt{|\boldsymbol k|^2+m^2}>0$ と置きます。$f(E)=E^2-\omega^2$ は $\pm\omega$ に単純零点を持ち、各点で $|f'(E)|=2\omega$ です。試験関数 $q(E)$ をそれぞれの零点の近くへ分割して $s=f(E)$ と変数変換すれば、$\int\delta(s)\,q(E(s))\,|dE/ds|\,ds=q(\pm\omega)/(2\omega)$ です。二つの寄与を足すと

$$
\delta((k^0)^2-\omega^2)
=\frac{\delta(k^0-\omega)+\delta(k^0+\omega)}{2\omega}.
$$

$\theta(k^0)$ が負の枝を消すため、$k^0$ 積分は

$$
\int_{\mathbb R}\frac{dk^0}{2\pi}\,
2\pi\theta(k^0)\delta((k^0)^2-\omega^2)
e^{-ik^0z^0}
=\frac{e^{-i\omega z^0}}{2\omega}.
$$

これを残りの $d^3k/(2\pi)^3$ に代入すると[二点表示](#thm-qft5-wightman-positive)へ戻ります。Klein–Gordon作用素は各指数に作用して

$$
P_z e^{-ik^0z^0+i\boldsymbol k\cdot\boldsymbol z}
=\bigl(-(k^0)^2+|\boldsymbol k|^2+m^2\bigr)
e^{-ik^0z^0+i\boldsymbol k\cdot\boldsymbol z}
$$

を与えます。係数は質量殻上で零です。この計算はSchwartz試験関数との対合で行うので、分布の微分として正当です。$z=x-y$ のため $P_x$、$P_y$ の二階微分はどちらも同じ $P_z$ になります。
<!-- proof-end -->

ここでの正値性とスペクトル条件は**この章で構成した $W$** について計算したものです。相互作用する全ての量子場の存在・構成を証明したわけではありません。

## 3. 二点の順序を入れ替えた差

二点相関 $W(x-y)$ は順序に依存します。その差を考えると、粒子数状態に依らない交換子が現れます。時間を逆にした二点分布を差し引き、質量殻の正・負の枝を合わせたものが因果的な情報を運びます。

<a id="def-qft5-pauli-jordan"></a>

<!-- formal-statement-start -->
> **定義（Pauli–Jordan交換子分布）**
> $m>0$ の自由実スカラー場の二点分布 $W$ について

$$
C(z)=W(z)-W(-z),\qquad E(z)=iC(z)
$$

> と定める。$C$ をPauli–Jordan交換子分布、$E$ を実数値の因果核とする。本章の符号規約は $C=-iE$ である。
<!-- formal-statement-end -->

<a id="thm-qft5-commutator-cauchy"></a>

<!-- formal-statement-start -->
> **定理（Pauli–Jordan交換子の表示とCauchyデータ）**
> $m>0$ の自由実スカラー場について、実Schwartz関数 $F,G\in\mathcal S(\mathbb R^4)$ に対し、$\mathcal D_{\mathcal S}$ 上の演算子恒等式

$$
[\Phi(F),\Phi(G)]
=\left(\int d^4x\,d^4y\,F(x)G(y)C(x-y)\right)I
$$

> が成立する。また $t=z^0$、$\boldsymbol z$ を空間差として

$$
\begin{aligned}
C(t,\boldsymbol z)&=-iE(t,\boldsymbol z),\\
E(t,\boldsymbol z)&=\int\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z},\\
PE&=0,\qquad
E(0,\boldsymbol z)=0,\qquad
\partial_tE(0,\boldsymbol z)=\delta^3(\boldsymbol z).
\end{aligned}
$$

> 最後の二式は空間Schwartz関数に作用させる分布の等式である。
<!-- formal-statement-end -->

### 証明の見取り図

交換子を生成・消滅演算子で展開すると、二つの混合項のみ残ります。運動量 $\boldsymbol p$ を反転させれば、二点の順序差は正弦関数となります。その時刻零での値と時間微分が、前章の等時刻正準交換関係の符号を確定します。

<!-- proof-start -->
### 証明

まず実Schwartz関数に対し[前章のFock交換関係](../QFT4/index.md#thm-qft4-fock-ccr)を二度使います。

$$
\begin{aligned}
[\Phi(F),\Phi(G)]
&=[a(u_F),a^\dagger(u_G)]
+[a^\dagger(u_F),a(u_G)]\\
&=\bigl(\langle u_G,u_F\rangle
-\langle u_F,u_G\rangle\bigr)I\\
&=\bigl(W(F,G)-W(G,F)\bigr)I.
\end{aligned}
$$

第1節の核表示で $W(G,F)$ の積分変数を $x\leftrightarrow y$ と交換すれば、差の核は $W(z)-W(-z)$ です。

続いて $W(-t,-\boldsymbol z)$ の積分で $\boldsymbol p\mapsto-\boldsymbol p$ を行います。$\omega_{-\boldsymbol p}=\omega_{\boldsymbol p}$ より

$$
\begin{aligned}
C(t,\boldsymbol z)
&=\int\frac{d\mu(\boldsymbol p)}{2\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}
\bigl(e^{-i\omega_{\boldsymbol p}t}-e^{i\omega_{\boldsymbol p}t}\bigr)\\
&=-i\int d\mu(\boldsymbol p)\,
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol z}.
\end{aligned}
$$

逆Fourier変換は空間Schwartz関数に対して定義されます。正弦の奇性から $E(0)=0$、微分して $\partial_tE$ のFourier乗数は $\cos(\omega_{\boldsymbol p}t)$ です。従って

$$
\partial_tE(0,\boldsymbol z)
=\int\frac{d^3p}{(2\pi)^3}e^{i\boldsymbol p\cdot\boldsymbol z}
=\delta^3(\boldsymbol z).
$$

二階時間微分で $-\omega_{\boldsymbol p}^2$ を掛け、空間Laplace作用素で $-|\boldsymbol p|^2$ を掛けると $PE=0$ です。Schwartz関数との対合では微分を乗数へ移せるため、いずれも分布の主張として成立します。
<!-- proof-end -->

<!-- definition-example-start: def-qft5-pauli-jordan -->
### 例：等時刻の場と時間微分の符号

**定義の確認**：正弦表示は $C(0,\boldsymbol z)=0$ と $\partial_tC(0,\boldsymbol z)=-i\delta^3(\boldsymbol z)$ を与えます。二つの時刻 $t,s$ の空間smearingから

$$
[\Phi_t(h),\Phi_s(k)]
=-i\int d^3x\,d^3y\,h(\boldsymbol x)k(\boldsymbol y)
E(t-s,\boldsymbol x-\boldsymbol y)\,I
$$

を得ます。第2の場を時間微分すると $\partial_sE(t-s)=-\partial_tE(t-s)$ なので、$s=t$ で

$$
[\Phi_t(h),\Pi_t(k)]
=i\int_{\mathbb R^3}h(\boldsymbol x)k(\boldsymbol x)\,d^3x\,I.
$$

これは[QFT4の等時刻正準交換関係](../QFT4/index.md#thm-qft4-equal-time-ccr)と一致します。時間差を逆向きに取るとこの符号が反転するので、どちらを微分したかの確認が不可欠です。
<!-- definition-example-end -->

## 4. 交換子の信号は光円錐を越えない

$E$ は正弦を含む振動積分なので、式だけを見てもどこで零になるか分かりません。ここでは[QFT1の局所エネルギー収支](../QFT1/index.md#thm-qft1-energy)の計算を、**時間とともに縮む球**へ適用します。そうすればKlein–Gordon方程式が初期データを光速より外へ運べないことを直接証明できます。

空間集合 $K\subset\mathbb R^3$ と $r\ge0$ に対し、$K+\overline B_r$ は $K$ から距離 $r$ 以内の点の集合です。

<a id="thm-qft5-finite-speed"></a>

<!-- formal-statement-start -->
> **定理（Klein–Gordon解の有限伝播速度）**
> $m>0$、$f,g\in C_c^\infty(\mathbb R^3;\mathbb R)$ とし、$u$ を

$$
(\partial_t^2-\Delta+m^2)u=0,\quad
u(0,\boldsymbol x)=f(\boldsymbol x),\quad
\partial_tu(0,\boldsymbol x)=g(\boldsymbol x)
$$

> を満たす滑らかな解とする。$K=\operatorname{supp}f\cup\operatorname{supp}g$ と置けば、任意の $t\in\mathbb R$ について

$$
\operatorname{supp}u(t,\cdot)\subset K+\overline B_{|t|}.
$$

> とくに前節の因果核は、時空分布として閉じた光円錐内に支持される。

$$
\operatorname{supp}E
\subset\{(t,\boldsymbol x):|\boldsymbol x|\le|t|\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ある時空点へ初期データが届かないことを示すには、その点を頂点にして初期時刻へ広がる逆向き円錐を考えます。円錐内部のエネルギーは、境界から入る流束を含めても増加できません。底面の初期エネルギーが零なら内部はずっと零です。最後に近似デルタを初期速度へ置くと因果核の支持を得ます。

<!-- proof-start -->
### 証明

$t_0>0$、$\boldsymbol x_0$ を固定し、$\overline B_{t_0}(\boldsymbol x_0)$ が $K$ と交わらないとします。$0\le s<t_0$ で半径 $R(s)=t_0-s$ の球 $B_{R(s)}(\boldsymbol x_0)$ を考え、エネルギー密度

$$
e(s,\boldsymbol x)=\frac12\bigl(
(\partial_su)^2+|\nabla u|^2+m^2u^2\bigr)
$$

の球内積分 $Q(s)=\int_{B_{R(s)}(\boldsymbol x_0)}e(s,\boldsymbol x)d^3x$ を置きます。$m>0$ なので $e\ge0$、また初期データは球内で零であるため $Q(0)=0$ です。

Klein–Gordon方程式から積の微分を行うと

$$
\begin{aligned}
\partial_se
&=u_s(u_{ss}+m^2u)+\nabla u\cdot\nabla u_s\\
&=u_s\Delta u+\nabla u\cdot\nabla u_s
=\nabla\cdot(u_s\nabla u).
\end{aligned}
$$

移動する球の境界速度は $R'(s)=-1$ です。積分領域の微分と[VC4の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を合わせ、境界外向き単位法線を $n$ とすれば

$$
Q'(s)=\int_{\partial B_{R(s)}}(u_s\partial_nu-e)\,dS.
$$

境界で $\nabla u=(\partial_nu)n+\nabla_{\mathrm{tan}}u$ と直交分解すると

$$
u_s\partial_nu-e
=-\frac12\bigl((u_s-\partial_nu)^2
+|\nabla_{\mathrm{tan}}u|^2+m^2u^2\bigr)\le0.
$$

したがって $0\le Q(s)\le Q(0)=0$。球内で $m^2u^2$ の積分は零なので $u=0$、滑らかさにより $u(t_0,\boldsymbol x_0)=0$ です。任意の球が初期データから離れている場合にこれが成り立つため、$t>0$ の支持包含が従います。$t<0$ は $u(-s,\boldsymbol x)$ に同じ議論を適用します。

次に $\rho\in C_c^\infty(\mathbb R^3)$ を非負で積分1とし、$\rho_\varepsilon(\boldsymbol x)=\varepsilon^{-3}\rho(\boldsymbol x/\varepsilon)$ と置きます。前節のFourier表示より

$$
u_\varepsilon(t,\boldsymbol x)
=(E(t,\cdot)*\rho_\varepsilon)(\boldsymbol x)
$$

は初期値 $(0,\rho_\varepsilon)$ の滑らかなKlein–Gordon解です。$\rho$ を単位球に支持させれば上の包含から

$$
\operatorname{supp}u_\varepsilon(t,\cdot)
\subset\overline B_{|t|+\varepsilon}.
$$

近似恒等族の性質によって、任意の空間Schwartz試験関数への $u_\varepsilon(t,\cdot)$ の作用は $E(t,\cdot)$ の作用へ収束します。時間についてもコンパクト台試験関数で積分すれば時空試験関数への作用が収束します。閉光円錐の外に支持を持つ任意のコンパクト台試験関数は十分小さい $\varepsilon$ で全ての $u_\varepsilon$ と対合が零なので、極限の $E$ とも零です。これで時空支持の主張が証明されました。
<!-- proof-end -->

この証明で重要なのは局所エネルギーの**境界速度が1**であることです。球を固定したまま全空間エネルギー保存だけを使っても、外への伝播速度は分かりません。

## 5. 離れた観測の交換子

時空点 $x,y$ の差のMinkowski二乗が負、すなわち

$$
(x^0-y^0)^2-|\boldsymbol x-\boldsymbol y|^2<0
$$

なら、二点は空間的に分離しています。場は点ごとの作用素ではなく試験関数で積分するので、局所性を正確に述べるには二つの**支持全体**が分離している必要があります。

<a id="def-qft5-spacelike-support"></a>

<!-- formal-statement-start -->
> **定義（空間的分離した試験関数の支持）**
> $F,G\in C_c^\infty(\mathbb R^4)$ について、任意の $x\in\operatorname{supp}F$ と $y\in\operatorname{supp}G$ が

$$
|\boldsymbol x-\boldsymbol y|>|x^0-y^0|
$$

> を満たすとき、両者の支持は互いに空間的に分離しているという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft5-spacelike-support -->
### 例：二つの時空小球を離して置く

**定義の確認**：時空座標の各成分について、$F$ の支持が $|t|\le\delta$、$|\boldsymbol x|\le\delta$ に、$G$ の支持が $|s|\le\delta$、$|\boldsymbol y-L\boldsymbol e_1|\le\delta$ に入るとします。$\delta>0$、$L>4\delta$ なら、任意の二点に対して

$$
|t-s|\le2\delta,\qquad
|\boldsymbol x-\boldsymbol y|\ge L-2\delta>2\delta.
$$

従って全ての点対で空間的分離です。中心時刻が同じという条件**だけ**では不十分で、支持の広がりも評価しなければなりません。
<!-- definition-example-end -->

空間的に分離した領域の観測量は、掛ける順序を変えても結果が変わらないはずです。これを、共通領域の上で検証できる交換子の形にします。

<a id="def-qft5-locality"></a>

<!-- formal-statement-start -->
> **定義（局所的可換性）**
> 時空上の実試験関数で定義される場の対応 $\Phi$ が、互いに空間的に分離した支持を持つ全ての実 $F,G\in C_c^\infty(\mathbb R^4)$ について

$$
[\Phi(F),\Phi(G)]=0
$$

> を指定された共通不変領域上で満たすとき、この場は局所的可換性を持つという。
<!-- formal-statement-end -->

<a id="thm-qft5-locality"></a>

<!-- formal-statement-start -->
> **定理（自由実スカラー場の局所的可換性）**
> 質量 $m>0$ の前章の自由実スカラー場をFock真空表現で構成する。実試験関数 $F,G\in C_c^\infty(\mathbb R^4)$ の支持が互いに空間的に分離していれば

$$
[\Phi(F),\Phi(G)]=0\quad\text{on }\mathcal D_{\mathcal S}.
$$

> 複素試験関数にも複素線形に拡張できる。これは $W(F,G)=0$ を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

交換子は前節までに得た数値分布 $C=-iE$ の試験関数との対合です。[QFT5の因果核支持定理](#thm-qft5-finite-speed)により $C$ の支持は光円錐内部です。一方、二つの試験関数の差 $x-y$ の集合は光円錐の外です。二つの支持が交わらないので対合が零になります。

<!-- proof-start -->
### 証明

[交換子の表示](#thm-qft5-commutator-cauchy)で $z=x-y$ と変数を取り直し、

$$
H(z)=\int_{\mathbb R^4}F(z+y)G(y)\,d^4y
$$

と置きます。$F,G$ は滑らかでコンパクト台を持つので $H\in C_c^\infty(\mathbb R^4)$ であり、

$$
\operatorname{supp}H
\subset\operatorname{supp}F-\operatorname{supp}G.
$$

右辺はコンパクト集合で、空間的分離の仮定により全ての $z$ が $|\boldsymbol z|>|z^0|$ を満たします。一方[QFT5の因果核支持定理](#thm-qft5-finite-speed)から $\operatorname{supp}C\subset\{|\boldsymbol z|\le|z^0|\}$ です。支持が交わらない分布と試験関数の対合は零なので

$$
[\Phi(F),\Phi(G)]
=\langle C,H\rangle I=0.
$$

複素 $F,G$ は実部と虚部に分け、交換子の複素双線形性で従います。全ての等式は共通不変領域 $\mathcal D_{\mathcal S}$ 上の式です。
<!-- proof-end -->

<!-- definition-example-start: def-qft5-locality -->
### 例：零交換子でも真空相関は残る

**定義の確認**：空間差 $\boldsymbol r\ne0$ で等時刻の二点核を調べます。$\sqrt a$ の逆数のGaussian積分表示

$$
\frac1{\sqrt a}=\frac1{\sqrt\pi}
\int_0^\infty s^{-1/2}e^{-as}\,ds
\qquad(a>0)
$$

を $a=|\boldsymbol p|^2+m^2$ へ適用すると、$\boldsymbol r\ne0$ で

$$
\begin{aligned}
W(0,\boldsymbol r)
&=\int\frac{d\mu(\boldsymbol p)}{2\sqrt{|\boldsymbol p|^2+m^2}}
e^{i\boldsymbol p\cdot\boldsymbol r}\\
&=\frac1{16\pi^2}\int_0^\infty s^{-2}
e^{-m^2s-|\boldsymbol r|^2/(4s)}\,ds>0.
\end{aligned}
$$

中間段階では $\int d^3p/(2\pi)^3\,e^{-s|\boldsymbol p|^2+i\boldsymbol p\cdot\boldsymbol r}=(4\pi s)^{-3/2}e^{-|\boldsymbol r|^2/(4s)}$ を使いました。$\boldsymbol r\ne0$ なら両端の積分は収束し、積分の被積分関数は正です。元の振動積分は分布として解釈し、空間的分離領域で滑らかな値へ制限した結果を表示しています。

これに対して[交換子の時刻零データ](#thm-qft5-commutator-cauchy)は $C(0,\boldsymbol r)=0$ です。等時刻で空間的に離れた二つの小さい非負試験関数を選ぶと、連続性から二点相関の実部は非零にできますが、交換子は[局所性定理](#thm-qft5-locality)により零です。**相関があること**と**相互に影響を信号として伝えられること**は異なります。
<!-- definition-example-end -->

## 6. 演習：二点分布と因果性を手で確認する

全問で $m>0$、Fourier規約と第1変数線形内積は本章のものを使い、作用素は $\mathcal D_{\mathcal S}$ 上で扱うとします。空間試験関数は特に指定がなければ実Schwartz関数、時空の支持を問う問題は実 $C_c^\infty$ 関数とします。

### Level A：基本式を一つずつ使う

### 演習 QFT5-A1：真空で残る粒子成分

$F,G$ を実Schwartz関数とし、$\Phi(F)=a(u_F)+a^\dagger(u_F)$、$\Omega$ をFock真空とする。$\Phi(F)\Phi(G)\Omega$ の零粒子成分を求め、$F=G$ なら非負になることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$a(u_G)\Omega=0$ より $\Phi(G)\Omega=a^\dagger(u_G)\Omega$ は一粒子状態です。左から $\Phi(F)$ を掛けると、生成部分は二粒子状態、消滅部分は零粒子状態になります。[Fock交換関係](../QFT4/index.md#thm-qft4-fock-ccr)を使い

$$
\begin{aligned}
a(u_F)a^\dagger(u_G)\Omega
&=\bigl(a^\dagger(u_G)a(u_F)
+\langle u_G,u_F\rangle I\bigr)\Omega\\
&=\langle u_G,u_F\rangle\Omega.
\end{aligned}
$$

従って零粒子成分は $\langle u_G,u_F\rangle$ で、これが[Wightman二点分布](#def-qft5-wightman)の $W(F,G)$ です。$F=G$ なら $\langle u_F,u_F\rangle=\|u_F\|^2\ge0$。二粒子成分を真空期待値へ加えてはいけません。
<!-- solution-end -->

### 演習 QFT5-A2：質量殻のデルタ積分

$m>0$、$\boldsymbol p\in\mathbb R^3$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とする。滑らかな急減少関数 $q(E)$ について

$$
I=\int_{\mathbb R}dE\,
\theta(E)\delta(E^2-\omega_{\boldsymbol p}^2)q(E)
$$

を計算し、なぜ負の周波数の寄与がないか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$f(E)=E^2-\omega_{\boldsymbol p}^2$ の零点は $E=\pm\omega_{\boldsymbol p}$、導関数の絶対値は両点で $2\omega_{\boldsymbol p}>0$ です。単純零点の公式を用いると

$$
\delta(f(E))=\frac1{2\omega_{\boldsymbol p}}
\bigl(\delta(E-\omega_{\boldsymbol p})
+\delta(E+\omega_{\boldsymbol p})\bigr).
$$

$\theta(-\omega_{\boldsymbol p})=0$、$\theta(\omega_{\boldsymbol p})=1$ なので

$$
I=\frac{q(\omega_{\boldsymbol p})}{2\omega_{\boldsymbol p}}.
$$

$m>0$ は二根を零から離し、分母を非零にしています。これが[正エネルギー質量殻](#def-qft5-positive-mass-shell)の積分重みです。
<!-- solution-end -->

### 演習 QFT5-A3：因果核の奇偶性と初期値

$E(t,\boldsymbol x)$ を本章の正弦Fourier積分で定める。$E(-t,\boldsymbol x)$、$E(t,-\boldsymbol x)$ を $E(t,\boldsymbol x)$ で表し、$\partial_tE(0,\cdot)$ を分布として求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\sin(-\omega t)=-\sin(\omega t)$ なので

$$
E(-t,\boldsymbol x)=-E(t,\boldsymbol x).
$$

空間反転では $\boldsymbol p\mapsto-\boldsymbol p$ と置き、$\omega$ と積分測度が不変だから

$$
E(t,-\boldsymbol x)=E(t,\boldsymbol x).
$$

時間微分を空間試験関数との対合で行うと

$$
\partial_tE(t,\boldsymbol x)
=\int d\mu(\boldsymbol p)\cos(\omega_{\boldsymbol p}t)
e^{i\boldsymbol p\cdot\boldsymbol x}.
$$

$t=0$ ではFourier逆変換の単位核なので $\partial_tE(0,\cdot)=\delta^3$ です。奇関数であるため $E(0,\cdot)=0$ も従います。
<!-- solution-end -->

### 演習 QFT5-A4：等時刻の混合交換子

実Schwartz関数 $h,k$ に対し、$C(t,\boldsymbol z)=-iE(t,\boldsymbol z)$ を用いて $[\Phi_t(h),\partial_s\Phi_s(k)]_{s=t}$ を計算せよ。時間差の微分の符号も示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[交換子核](#thm-qft5-commutator-cauchy)から、時間の違う二つの場の交換子は

$$
[\Phi_t(h),\Phi_s(k)]
=-i\int d^3x\,d^3y\,h(\boldsymbol x)k(\boldsymbol y)
E(t-s,\boldsymbol x-\boldsymbol y)\,I.
$$

$s$ に関する微分では $\partial_s(t-s)=-1$ です。従って

$$
\begin{aligned}
[\Phi_t(h),\partial_s\Phi_s(k)]_{s=t}
&=i\int d^3x\,d^3y\,h(\boldsymbol x)k(\boldsymbol y)
\partial_tE(0,\boldsymbol x-\boldsymbol y)\,I\\
&=i\int_{\mathbb R^3}h(\boldsymbol x)k(\boldsymbol x)\,d^3x\,I.
\end{aligned}
$$

ここで $\partial_tE(0,\cdot)=\delta^3$ を使いました。第2引数の微分なので正符号になります。
<!-- solution-end -->

### 演習 QFT5-A5：支持全体の空間的分離

$\delta>0$、$L>0$ とし、$F$ が $|t|\le\delta$、$|\boldsymbol x|\le\delta$ の中に、$G$ が $|s|\le\delta$、$|\boldsymbol y-L\boldsymbol e_1|\le\delta$ の中に支持されるとする。$L>4\delta$ なら支持が互いに空間的に分離していることを示し、$L=2\delta$ からは同じ結論が出ない理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

三角不等式から

$$
\begin{aligned}
|\boldsymbol x-\boldsymbol y|
&\ge L-|\boldsymbol x|-|\boldsymbol y-L\boldsymbol e_1|
\ge L-2\delta,\\
|t-s|&\le|t|+|s|\le2\delta.
\end{aligned}
$$

$L>4\delta$ なら $L-2\delta>2\delta$ となり、任意の点対で空間的分離を満たします。$L=2\delta$ なら二球の空間的境界が接し得るため、$|\boldsymbol x-\boldsymbol y|$ の下界は0です。$|t-s|>0$ の点対も可能なので、中心が離れているだけでは定義の全称条件を満たす保証がありません。
<!-- solution-end -->

### Level B：定理をつないで確かめる

### 演習 QFT5-B1：複素試験関数の正値性

実Schwartz関数 $H,K$ から複素関数 $F=H+iK$ を作る。$\Phi(F)$ の消滅・生成部分をそれぞれ $u_H,u_K$ で表し、$W(\overline F,F)\ge0$ を計算から示せ。$W(F,F)$ が必ず非負とは限らない理由も説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$a$ は反線形、$a^\dagger$ は線形なので

$$
\begin{aligned}
\Phi(F)
&=\Phi(H)+i\Phi(K)\\
&=a(u_H-i u_K)+a^\dagger(u_H+i u_K)\\
&=a(u_{\overline F})+a^\dagger(u_F).
\end{aligned}
$$

真空への作用は消滅部分が零で $\Phi(F)\Omega=a^\dagger(u_F)\Omega$ です。[二点分布の表示](#thm-qft5-wightman-positive)によって

$$
\begin{aligned}
W(\overline F,F)
&=\langle u_F,u_F\rangle\\
&=\|u_H\|^2+\|u_K\|^2
+i\langle u_K,u_H\rangle-i\langle u_H,u_K\rangle\\
&=\|u_H\|^2+\|u_K\|^2
+2\,\operatorname{Im}\langle u_H,u_K\rangle\ge0.
\end{aligned}
$$

最後の不等号は、交差項単独の符号からではなく最初のノルム二乗の表示から従います。一般に $W(F,F)=\langle u_F,u_{\overline F}\rangle$ はノルム二乗でなく、複素数になり得ます。正値性の定義では第1引数へ複素共役を取ることが本質です。
<!-- solution-end -->

### 演習 QFT5-B2：縮む球の流束は正にはならない

$m>0$ の実Klein–Gordon解 $u$、時刻 $s$、半径 $R(s)=T-s$ の球 $B_{R(s)}(\boldsymbol x_0)$ を考える。$e=(u_s^2+|\nabla u|^2+m^2u^2)/2$ と置き、局所エネルギー $Q(s)=\int_{B_{R(s)}}e$ の導関数を境界積分に直した後、平方完成で $Q'(s)\le0$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

方程式 $u_{ss}=\Delta u-m^2u$ をエネルギー密度の微分へ代入すると

$$
\partial_se=u_su_{ss}+\nabla u\cdot\nabla u_s+m^2uu_s
=u_s\Delta u+\nabla u\cdot\nabla u_s
=\nabla\cdot(u_s\nabla u).
$$

移動球の境界速度が $R'=-1$ なので、積分領域の微分公式と[VC4の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)により

$$
Q'=\int_{\partial B_R}u_s\partial_nu\,dS
-\int_{\partial B_R}e\,dS.
$$

境界の接線勾配を $\nabla_{\rm tan}u$ とし、$|\nabla u|^2=(\partial_nu)^2+|\nabla_{\rm tan}u|^2$ を代入すると

$$
\begin{aligned}
u_s\partial_nu-e
&=u_s\partial_nu
-\frac12\bigl(u_s^2+(\partial_nu)^2
+|\nabla_{\rm tan}u|^2+m^2u^2\bigr)\\
&=-\frac12\bigl((u_s-\partial_nu)^2
+|\nabla_{\rm tan}u|^2+m^2u^2\bigr)\le0.
\end{aligned}
$$

したがって $Q'\le0$。境界速度を無視すると $-\int_{\partial B_R}e$ が消えてしまい、有限伝播の結論は得られません。
<!-- solution-end -->

### 演習 QFT5-B3：支持の差と局所性

実 $C_c^\infty$ 関数 $F,G$ の支持が互いに空間的に分離し、$C(z)$ が閉光円錐の内部に支持されるとする。$H(z)=\int F(z+y)G(y)\,d^4y$ が滑らかでコンパクト台を持つこと、$\operatorname{supp}H$ が光円錐外にあることを順に示して、$\int F(x)G(y)C(x-y)\,d^4x\,d^4y$ が零になることを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$F,G$ はコンパクト台を持つため、$F(z+y)G(y)$ の $y$ 積分は有界領域で行われます。$z$ 微分を何度でも積分の中へ移せるので $H$ は滑らかです。$H(z)\ne0$ となるには、ある $y\in\operatorname{supp}G$ で $z+y\in\operatorname{supp}F$ が必要です。よって

$$
\operatorname{supp}H\subset
\operatorname{supp}F-\operatorname{supp}G.
$$

右辺はコンパクト集合です。またその各 $z=x-y$ は $|\boldsymbol z|>|z^0|$ を満たします。[本章のKlein–Gordon伝播定理](#thm-qft5-finite-speed)による $\operatorname{supp}C\subset\{|\boldsymbol z|\le|z^0|\}$ と交わりません。従って、分布 $C$ の試験関数 $H$ への作用は

$$
\langle C,H\rangle=0.
$$

変数を $z=x-y$ に取り直すと問題の二重積分はこの対合です。[局所的可換性](#thm-qft5-locality)は点での $C(z)$ の値を仮定せず、支持の分離だけで証明できます。
<!-- solution-end -->

### 演習 QFT5-B4：時間的に離れた場は交換し得ない

非零の実 $h\in\mathcal S(\mathbb R^3)$ について、同じ空間波束の異なる時刻での交換子 $[\Phi_t(h),\Phi_0(h)]$ を運動量積分で表せ。$t=0$ におけるその時間微分を求め、十分小さい非零の $t$ で交換子が一般に零でないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[因果核の表示](#thm-qft5-commutator-cauchy)に $s=0$、$k=h$ を代入し、空間積分をFourier変換に移すと

$$
[\Phi_t(h),\Phi_0(h)]
=-i\int\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
|\widehat h(\boldsymbol p)|^2\,I.
$$

$h$ はSchwartz級なので $\omega$ を掛けた積分も有限で、$t$ について微分と積分を交換できます。従って

$$
\left.\frac d{dt}[\Phi_t(h),\Phi_0(h)]\right|_{t=0}
=-i\int d\mu(\boldsymbol p)|\widehat h(\boldsymbol p)|^2I
=-i\|h\|_{L^2(\mathbb R^3)}^2I\ne0.
$$

積分係数は $t=0$ で零かつその微分が非零なので、連続微分可能性から十分小さい $t\ne0$ で非零です。これは同じ空間領域で時刻をずらした点対が空間的分離の条件を満たさないことと整合します。
<!-- solution-end -->

### Level C：相関・交換子・有限伝播を統合する

### 演習 QFT5-C1：離れた二つの観測の真空相関

質量 $m>0$ の自由実スカラー場で、次の設定を考える。$F,G\in C_c^\infty(\mathbb R^4;\mathbb R)$ は非負で非零、各々の支持は時空原点および $(0,L\boldsymbol e_1)$ を中心に、時刻幅と空間半径がともに $\delta$ 以下の領域に含まれ、$L>4\delta$ とする。$W$ は真空のWightman二点分布、$C=W-W(-\cdot)$ とする。

1. Fock生成・消滅演算子から $W(F,G)$ を一粒子内積で導き、$W(\overline F,F)\ge0$ を示せ。
2. 交換子の積分核が $C=-iE$ であり、$E(0)=0$、$\partial_tE(0)=\delta^3$ であることを質量殻Fourier表示から示せ。
3. 縮む球のエネルギー評価で $E$ の支持が $|\boldsymbol x|\le|t|$ に入る理由を述べ、二つの支持の分離を評価して $[\Phi(F),\Phi(G)]=0$ を導け。
4. $W(0,\boldsymbol r)>0$（$\boldsymbol r\ne0$）のGaussian積分表示を使い、空間的分離した支持の交換子が零でも二点相関が零である必要はないことを説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** 真空へ右側の場を掛けると

$$
\Phi(G)\Omega=a^\dagger(u_G)\Omega.
$$

左側の消滅部分だけが零粒子へ戻り、[Fock交換関係](../QFT4/index.md#thm-qft4-fock-ccr)から

$$
\begin{aligned}
W(F,G)
&=\langle a(u_F)a^\dagger(u_G)\Omega,\Omega\rangle\\
&=\langle u_G,u_F\rangle_{\mathfrak h}.
\end{aligned}
$$

ここで $F,G$ は実関数です。複素 $F$ へ拡張すると $\Phi(F)=a(u_{\overline F})+a^\dagger(u_F)$ なので、$W(\overline F,F)=\|u_F\|^2\ge0$。この正値性は一般の $W(F,G)$ の値が正であることとは違います。

**(2)** [二点分布の質量殻表示](#prop-qft5-spectrum-kg)で $W(-z)$ を引き、負の指数を正の指数と比較するために $\boldsymbol p\mapsto-\boldsymbol p$ と置きます。

$$
\begin{aligned}
C(t,\boldsymbol x)
&=\int\frac{d\mu(\boldsymbol p)}{2\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol x}
\bigl(e^{-i\omega_{\boldsymbol p}t}-e^{i\omega_{\boldsymbol p}t}\bigr)\\
&=-i\int d\mu(\boldsymbol p)
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol x}
=-iE(t,\boldsymbol x).
\end{aligned}
$$

正弦が時刻零で零、微分が $\omega\cos(\omega t)$ になることから

$$
E(0,\boldsymbol x)=0,\qquad
\partial_tE(0,\boldsymbol x)
=\int d\mu(\boldsymbol p)e^{i\boldsymbol p\cdot\boldsymbol x}
=\delta^3(\boldsymbol x).
$$

これは分布としての初期値です。[QFT4の等時刻交換関係](../QFT4/index.md#thm-qft4-equal-time-ccr)で混合交換子が正の $i$ になるのは、第2時刻を微分したときに符号がもう一度反転するからです。

**(3)** $E*\rho_\varepsilon$ は初期速度だけが半径 $\varepsilon$ の球に支持されるKlein–Gordon解です。半径 $R(s)=T-s$ の球内エネルギーは、[本章のKlein–Gordon伝播定理の証明](#thm-qft5-finite-speed)と同じ積の微分により

$$
Q'(s)=-\frac12\int_{\partial B_{R(s)}}
\bigl((u_s-\partial_nu)^2+|\nabla_{\rm tan}u|^2+m^2u^2\bigr)dS\le0.
$$

初期球にデータがなければ $Q(0)=0$ なので解は逆向き円錐で零です。$\varepsilon\downarrow0$ により $\operatorname{supp}E\subset\{|\boldsymbol x|\le|t|\}$ が従います。

二点の時刻差と空間距離について

$$
|t-s|\le2\delta,\qquad
|\boldsymbol x-\boldsymbol y|\ge L-2\delta>2\delta
$$

です。$F,G$ の全ての点対が空間的に分離し、$C=-iE$ の支持と交わらないので

$$
[\Phi(F),\Phi(G)]=0\quad\text{on }\mathcal D_{\mathcal S}.
$$

**(4)** 正のパラメータ $s$ を用いたGaussian表示から、空間差 $\boldsymbol r\ne0$ では

$$
W(0,\boldsymbol r)
=\frac1{16\pi^2}\int_0^\infty
s^{-2}e^{-m^2s-|\boldsymbol r|^2/(4s)}\,ds>0.
$$

近接した等時刻空間的分離点の近傍では $W$ が滑らかで、この正の実部は小さい時間・空間のずれに対しても保たれます。従って $L>0$ を固定して十分小さい $\delta$ を選び、各中心の近くに非負の滑らかな関数 $F,G$ を支持させれば、二点相関の実部が正となる例を構成できます。一方、それらの交換子は(3)により零です。ここで**任意の**非負 $F,G$ が必ず正の二点相関を持つと主張してはいません。真空相関と因果的な交換子は異なる量です。
<!-- solution-end -->

## 7. まとめと次の問い

- 自由真空のWightman二点分布は一粒子内積から得られ、複素試験関数について $W(\overline F,F)\ge0$ を満たす。
- 二点分布のFourier支持は正エネルギー質量殻上にあり、両変数について弱いKlein–Gordon方程式を満たす。
- Pauli–Jordan交換子は二点分布の反対称部分で、$C=-iE$、$E(0)=0$、$\partial_tE(0)=\delta^3$ という符号規約を持つ。
- 縮む球の局所エネルギー評価は、$E$ の支持が閉じた光円錐を越えないことを保証する。
- 試験関数の支持が空間的に分離すれば場は交換する。しかし交換子が零でも、真空の二点相関まで零になるとは限らない。

次は、同じKlein–Gordon作用素について、過去から未来へ解を運ぶ核、未来向きとは逆に解を運ぶ核、そして時間順序を指定した核の違いを調べます。ここで得た二点関数と交換子はその出発点ですが、異なる核を同じものとは扱いません。
