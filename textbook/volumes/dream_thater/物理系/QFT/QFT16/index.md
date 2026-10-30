# QFT16 共変ゲージ固定・光子伝播関数と保存電流

[QFT15のMaxwell作用](../QFT15/index.md#def-qft15-maxwell-action)と[二つの物理偏極](../QFT15/index.md#thm-qft15-two-polarizations)から、四元ポテンシャルの四成分をそのまま四種類の光子と数えてはいけないことが分かりました。しかし、摂動的な量子場計算を始めると、内部線には四元添字を持つ**時間順序二点核**が必要です。四成分の作用素を逆にしようとしても、ゲージ変換の方向で逆行列が存在しません。

この講義の中心問いは「**冗長な四元ポテンシャルのまま計算できる伝播関数を作り、最後に物理量から冗長性が消えることを確かめるには？**」です。まず逆行列がない理由を実際に計算し、共変ゲージ固定でそれを解決します。次に運動量空間で逆作用素とFeynman境界値を区別して導き、保存電流の縮約でゲージパラメータが消えることを証明します。最後にCoulombゲージで見える二偏極と比較します。

全章で $3+1$ 次元Minkowski時空、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、Heaviside–Lorentz単位系を使います。$x^\mu=(t,\boldsymbol x)$、$k^\mu=(k^0,\boldsymbol k)$、$k^2=(k^0)^2-|\boldsymbol k|^2$ とします。場と外部電流は実数値です。添字は $\eta$ で上げ下げし、反復した上下添字は総和します。Fourier変換は[QFT6の規約](../QFT6/index.md#def-qft6-feynman-two-point)と同じく

$$
\widehat f(k)=\int_{\mathbb R^4}e^{ik\cdot x}f(x)\,d^4x,\qquad
f(x)=\int\frac{d^4k}{(2\pi)^4}e^{-ik\cdot x}\widehat f(k)
$$

です。従って $\partial_\mu\mapsto-ik_\mu$、$\Box=\partial_\mu\partial^\mu\mapsto-k^2$ です。変分は有界領域でコンパクト台を持つ滑らかな変分に限り、境界項を消します。運動量空間の逆行列は最初に $k^2\ne0$ で計算し、光円錐上は後から分布の境界値で扱います。ここでの「伝播関数」は共変ゲージの**摂動論的な時間順序核**であって、正定値な四光子Hilbert空間を構成したという意味ではありません。

## 1. Maxwell方程式をそのまま逆にできない

[QFT15の作用変分](../QFT15/index.md#thm-qft15-euler-maxwell)で得た真空方程式をポテンシャルに戻すと

$$
\partial_\mu F^{\mu\nu}
=\Box A^\nu-\partial^\nu(\partial_\mu A^\mu)=0.
$$

右辺を作る線形微分作用素を $K_0$ と書きます。$K_0$ の作用先は四元ポテンシャルです。もしこれを反転できれば、外部電流 $J$ から $A$ を求める核が作れます。ところが[ゲージ変換](../QFT15/index.md#def-qft15-gauge) $A^\mu\mapsto A^\mu+\partial^\mu\chi$ は $F$ を変えません。勾配は $K_0$ が消してしまう方向なのです。

<a id="prop-qft16-zero-mode"></a>

<!-- formal-statement-start -->
> **命題（自由Maxwell二次作用素のゲージ零方向）**  
> 平坦時空の $C^3$ 関数 $\chi$ と $C^2$ 四元ポテンシャル $A$ に対し

$$
(K_0A)^\nu=\Box A^\nu-\partial^\nu(\partial_\mu A^\mu)
$$

> と置くと、$K_0(\partial\chi)=0$、従って $K_0(A+\partial\chi)=K_0A$ である。Fourier変換した作用素

$$
K_0^{\mu\nu}(k)=-k^2\eta^{\mu\nu}+k^\mu k^\nu
$$

> は、任意の $k\ne0$ について $K_0^{\mu\nu}(k)k_\nu=0$ を満たし、四成分全体の逆行列を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

勾配に作用させたときの二つの三階微分を交換して相殺します。Fourier側では同じことが $k$ と平行なベクトルの零固有値として現れます。

<!-- proof-start -->
### 証明

$C^3$ で偏微分が交換できるため、

$$
\begin{aligned}
(K_0\partial\chi)^\nu
&=\Box\partial^\nu\chi-\partial^\nu(\partial_\mu\partial^\mu\chi)\\
&=\partial^\nu\Box\chi-\partial^\nu\Box\chi=0.
\end{aligned}
$$

線形性から $K_0(A+\partial\chi)=K_0A$ です。Fourier変換では $\Box\mapsto-k^2$、$\partial^\mu\partial^\nu\mapsto-k^\mu k^\nu$ なので表示された行列になります。そして

$$
K_0^{\mu\nu}k_\nu
=-k^2k^\mu+k^\mu(k^\nu k_\nu)=0.
$$

$k\ne0$ は非零の零ベクトルを与えるため、この $4\times4$ 行列は可逆ではありません。$k^2=0$ のときは零方向がさらに増えることがありますが、非可逆性という結論は変わりません。
<!-- proof-end -->

例えば $\chi=t^2$ なら $\partial^\mu\chi=(2t,0,0,0)$ は零でないポテンシャルですが $F=0$ です。**逆行列がないのは計算技術の不足ではなく、同じ電磁場を表す表示が重複しているから**です。

## 2. 共変ゲージ固定で縦方向の零モードを取り除く

四元発散 $B=\partial_\mu A^\mu$ を使います。$B$ はポテンシャルのどの表示を選んだかを測る量で、[QFT15のLorenz条件](../QFT15/index.md#thm-qft15-two-polarizations)は $B=0$ です。$B$ 自体はゲージ不変ではなく、$A\mapsto A+\partial\chi$ で $B\mapsto B+\Box\chi$ になります。

ゲージ固定にはこの $B$ の二乗を作用へ加える方法が便利です。係数 $\xi$（クシー）は、四元共変な記述のうちどの**計算用表示**を選ぶかを制御する正の実数とします。$\xi=1$ をFeynmanゲージと呼びます。$\xi\downarrow0$ は後で伝播関数の極限として考えますが、$\xi=0$ を次の作用へ代入してはいけません。

<a id="def-qft16-gauge-fixed-action"></a>

<!-- formal-statement-start -->
> **定義（共変ゲージ固定Maxwell作用）**  
> $\xi>0$、有界領域 $\Omega\subset\mathbb R^{1,3}$、実数値 $C^2$ ポテンシャル $A_\mu$ と指定された $C^1$ 外部電流 $J^\mu$ に対し、$F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$、$B=\partial_\mu A^\mu$ として

$$
S_\xi[A]=\int_\Omega\left(
-\frac14F_{\mu\nu}F^{\mu\nu}
-\frac{1}{2\xi}B^2-J^\mu A_\mu
\right)d^4x
$$

> を定める。停留性は全ての実数値 $C_c^\infty(\Omega)$ 四元変分に関して判定する。
<!-- formal-statement-end -->

元のMaxwell作用と違い、ゲージ固定項は代表元の選び方で変わります。それは欠陥ではなく、元来同じ物理場を表した方向へ逆作用素を与えるための操作です。

<!-- definition-example-start: def-qft16-gauge-fixed-action -->
### 例：純ゲージ場にも作用の値が付く

**定義の確認**：$\Omega$ を有界、$J=0$、$\chi=t^2$、$A^\mu=\partial^\mu\chi=(2t,0,0,0)$ とします。$\chi$ と $A$ は滑らかで、$\Omega$ 上の作用積分は有限です。反対称微分は $F=0$ ですが

$$
B=\partial_t(2t)=2,\qquad
\mathcal L_\xi=-\frac{1}{2\xi}(2)^2=-\frac2\xi,\qquad
S_\xi[A]=-\frac2\xi\operatorname{Vol}_4(\Omega).
$$

$A=0$ では同じ $F=0$ にもかかわらず $S_\xi[0]=0$ です。**場の正則性、積分可能性、固定項の符号とゲージ代表依存性**を直接確認しました。これは停留点だとは主張していません。
<!-- definition-example-end -->

<a id="thm-qft16-gauge-fixed-eom"></a>

<!-- formal-statement-start -->
> **定理（ゲージ固定作用のEuler–Lagrange方程式）**  
> $\xi>0$、有界領域 $\Omega\subset\mathbb R^{1,3}$、実数値 $C^2$ ポテンシャル $A_\mu$ と固定した $C^1$ 外部電流 $J^\mu$ に対する[共変ゲージ固定Maxwell作用](#def-qft16-gauge-fixed-action)の停留点は、各 $\nu=0,1,2,3$ で

$$
\Box A^\nu-\left(1-\frac1\xi\right)
\partial^\nu(\partial_\mu A^\mu)=J^\nu
$$

> を満たし、逆も成り立つ。さらにその四元発散 $B=\partial_\mu A^\mu$ は、**分布の意味で**

$$
\frac1\xi\Box B=\partial_\nu J^\nu
$$

> を満たす。特に $\partial_\nu J^\nu=0$ なら $B$ は自由な波動方程式を満たすが、初期・境界条件なしに $B=0$ とは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

Maxwell部分の変分は既習の結果を使い、追加項では $\delta B=\partial^\mu\delta A_\mu$ を部分積分します。最後に全方程式の発散を取ると、二つの二階微分が同じ形へ集まります。

<!-- proof-start -->
### 証明

[Maxwell作用の第一変分](../QFT15/index.md#thm-qft15-euler-maxwell)は、電流項も含めて $\int(\partial_\mu F^{\mu\nu}-J^\nu)\delta A_\nu\,d^4x$ でした。一方、

$$
\begin{aligned}
\delta\left(-\frac{B^2}{2\xi}\right)
&=-\frac1\xi B\,\partial^\nu\delta A_\nu,\\
\int_\Omega-\frac1\xi B\,\partial^\nu\delta A_\nu\,d^4x
&=\int_\Omega\frac1\xi(\partial^\nu B)\delta A_\nu\,d^4x
\end{aligned}
$$

です。最後の等号では $\delta A$ のコンパクト台で境界積分が消えます。従って停留条件は

$$
\partial_\mu F^{\mu\nu}+\frac1\xi\partial^\nu B=J^\nu.
$$

$F^{\mu\nu}=\partial^\mu A^\nu-\partial^\nu A^\mu$ を代入し、$\partial_\mu F^{\mu\nu}=\Box A^\nu-\partial^\nu B$ とまとめれば、表示された方程式です。逆向きも同じ変分式から従います。

ここで $A\in C^2$ からは $F\in C^1$、$B\in C^1$ しか分かりません。従って $\partial_\nu\partial_\mu F^{\mu\nu}$ や $\Box B$ を点ごとの古典的な二階微分として扱わず、[GPDE2の超関数微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)で発散を取ります。任意の $\varphi\in C_c^\infty(\Omega)$ に対し、二回の部分積分と $F^{\mu\nu}=-F^{\nu\mu}$ より

$$
\begin{aligned}
\left\langle\partial_\nu\partial_\mu F^{\mu\nu},\varphi\right\rangle
&=\int_\Omega F^{\mu\nu}\partial_\mu\partial_\nu\varphi\,d^4x\\
&=\frac12\int_\Omega(F^{\mu\nu}+F^{\nu\mu})
\partial_\mu\partial_\nu\varphi\,d^4x=0.
\end{aligned}
$$

したがって運動方程式の分布的な発散は

$$
\partial_\nu J^\nu
=\frac1\xi\partial_\nu\partial^\nu B
=\frac1\xi\Box B
$$

です。左辺は $J\in C^1$ により連続関数でもありますが、右辺についてこの仮定だけで古典的な二階微分の存在を主張しません。$\partial\cdot J=0$ は分布の意味で $\Box B=0$ だけを意味し、例えば定数 $B=2$ も局所的にはその方程式を満たします。
<!-- proof-end -->

特に $\xi=1$ では $\Box A^\nu=J^\nu$ と四成分ごとの波動方程式になります。ただし四つの**物理的**偏極が存在するわけではありません。正定値な光子の状態空間を得るには拘束による物理状態の選別が別途必要です。また $\xi>0$ のゲージ固定作用は一般の局所ゲージ変換では不変でなく、$B$ を変えない残余変換 $\Box\chi=0$ とは区別します。

## 3. 運動量空間で横と縦を分けて反転する

$\xi$ の働きを行列で確かめます。[上の運動方程式](#thm-qft16-gauge-fixed-eom)をFourier変換すると

$$
K_\xi^{\mu\nu}(k)\widehat A_\nu(k)=\widehat J^\mu(k),\qquad
K_\xi^{\mu\nu}(k)=-k^2\eta^{\mu\nu}
+(1-\xi^{-1})k^\mu k^\nu.
$$

ここではまず $k^2\ne0$ とします。この条件のときだけ四次元で $k$ に沿う成分を $k^\mu k_\nu/k^2$ で取り出せます。$k^2=0$ は実際の光子の質量殻なので、**この射影を光的運動量へ直接代入するのは誤り**です。なお[QFT15の三次元横射影](../QFT15/index.md#def-qft15-transverse-projector)は $|\boldsymbol k|\ne0$ を条件とする別のものです。

<a id="def-qft16-projectors"></a>

<!-- formal-statement-start -->
> **定義（非光的運動量の横・縦射影）**  
> 実四元運動量 $k^\mu$ が $k^2\ne0$ を満たすとき、四元ベクトルに作用する混合添字行列を

$$
L^\mu{}_\nu(k)=\frac{k^\mu k_\nu}{k^2},\qquad
T^\mu{}_\nu(k)=\delta^\mu{}_\nu-L^\mu{}_\nu(k)
$$

> と定める。$L$ は $k$ に平行な成分、$T$ は $k_\mu v^\mu=0$ を満たす成分への射影である。ここで「横」はMinkowski内積に関する意味であり、空間的な正定値直交射影とは限らない。
<!-- formal-statement-end -->

混合添字なのは、たとえば $L^\mu{}_\nu v^\nu=k^\mu(k_\nu v^\nu)/k^2$ と四元ベクトルから四元ベクトルへ作用させるためです。この式で $k$ 方向の係数が $(k_\nu v^\nu)/k^2$ と決まり、残差が横条件を満たすことも直接確かめられます。

$$
(Tv)^\mu=v^\mu-k^\mu\frac{k_\nu v^\nu}{k^2},
\qquad
k_\mu(Tv)^\mu=k_\mu v^\mu-\frac{k^2(k_\nu v^\nu)}{k^2}=0.
$$

従って次の例では、表示行列がこの二つの写像を表すかと、射影の冪等性を確認します。上下両方の添字を上げた $L^{\mu\nu}$ は同じ成分行列ではありません。

<!-- definition-example-start: def-qft16-projectors -->
### 例：時間方向の非光的運動量

**定義の確認**：$k^\mu=(\kappa,0,0,0)$、$\kappa\in\mathbb R\setminus\{0\}$ とします。$k^2=\kappa^2>0$ で分母は非零、$k_\mu=(\kappa,0,0,0)$ なので、混合添字表示で

$$
L^\mu{}_\nu=\operatorname{diag}(1,0,0,0),\qquad
T^\mu{}_\nu=\operatorname{diag}(0,1,1,1).
$$

例えば $v=(a,b,c,d)$ に対し $Lv=(a,0,0,0)$、$Tv=(0,b,c,d)$ です。$L^2=L$、$T^2=T$、$LT=0$、$k_\mu(Tv)^\mu=0$ と $Lv+Tv=v$ が直接成り立ちます。元の定義の**分母条件、射影条件、横・縦の内積条件**を確認しました。
<!-- definition-example-end -->

<a id="thm-qft16-inverse"></a>

<!-- formal-statement-start -->
> **定理（ゲージ固定二次形式の反転）**  
> $\xi>0$、$k^2\ne0$ とする。[共変ゲージ固定作用](#def-qft16-gauge-fixed-action)のFourier二次作用素は

$$
K_\xi^{\mu\nu}=-k^2\left(T^{\mu\nu}+\xi^{-1}L^{\mu\nu}\right)
$$

> と分解でき、その逆テンソルは

$$
G_{\xi,\mu\nu}(k)
=-\frac1{k^2}\left(T_{\mu\nu}+\xi L_{\mu\nu}\right)
=-\frac1{k^2}\left(\eta_{\mu\nu}-(1-\xi)\frac{k_\mu k_\nu}{k^2}\right).
$$

> すなわち $K_\xi^{\mu\nu}G_{\xi,\nu\rho}=\delta^\mu{}_\rho$。$\xi=0$ や $k^2=0$ への直接の逆行列の主張は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ と $T$ が互いに交わらない射影なので、$K_\xi$ の横の固有係数は $-k^2$、縦は $-k^2/\xi$ です。それぞれの係数の逆数を掛ければよいことを、実際に積を展開して確かめます。

<!-- proof-start -->
### 証明

[射影の定義](#def-qft16-projectors)から

$$
\begin{aligned}
(L^2)^\mu{}_\nu
&=\frac{k^\mu k_\alpha k^\alpha k_\nu}{(k^2)^2}
=\frac{k^\mu k_\nu}{k^2}=L^\mu{}_\nu,\\
T^2&=(I-L)^2=I-2L+L^2=T,\\
TL&=(I-L)L=L-L^2=0,\qquad T+L=I.
\end{aligned}
$$

従って

$$
\begin{aligned}
-k^2(T^{\mu\nu}+\xi^{-1}L^{\mu\nu})
&=-k^2\eta^{\mu\nu}+(1-\xi^{-1})k^\mu k^\nu,\\
K_\xi^{\mu\nu}G_{\xi,\nu\rho}
&=(T^\mu{}_\nu+\xi^{-1}L^\mu{}_\nu)
(T^\nu{}_\rho+\xi L^\nu{}_\rho)\\
&=T^\mu{}_\rho+L^\mu{}_\rho=\delta^\mu{}_\rho.
\end{aligned}
$$

積の交差項が消えることを、行列記法でも書けば

$$
(T+\xi^{-1}L)(T+\xi L)
=T^2+\xi TL+\xi^{-1}LT+L^2=T+L=I.
$$

両側の反転も同じ射影積で確かめられます。特に $\xi=1$ では $G_{1,\mu\nu}=-\eta_{\mu\nu}/k^2$ です。
<!-- proof-end -->

この逆テンソルは $k^2\ne0$ の**代数的**な解です。光円錐にある極をどう扱うかは、逆行列だけでは決まりません。次に時間順序という境界条件を与えます。

## 4. 二点核にFeynman境界値を与える

[QFT6のスカラーFeynman核](../QFT6/index.md#def-qft6-feynman-two-point)で学んだように、実の極 $k^2=0$ をそのまま分母に置くだけでは時間順序核を指定できません。極を $k^2+i\varepsilon$（$\varepsilon>0$）とずらしてから $\varepsilon\downarrow0$ の境界値を取る規約を採用します。$i0$ は小さい実数を零として代入する意味ではなく、**分布の極限の指定**です。

自由な光子の量子論では、二次作用の逆に $i$ が掛かるのが時間順序収縮の規約です。質量零の一般共変ゲージでは縦方向に二重極が現れます。$k_\mu k_\nu/(k^2+i0)^2$ は分子ごとの境界値として解釈し、非零の通常関数を全質量殻へ点ごとに延長したものではありません。

<a id="def-qft16-photon-propagator"></a>

<!-- formal-statement-start -->
> **定義（共変ゲージの光子Feynman伝播関数）**  
> $\xi>0$、$\eta=\operatorname{diag}(1,-1,-1,-1)$、上記のFourier規約を固定する。自由なゲージ固定Maxwell場の摂動的な時間順序二点核を、次のFourier表示の境界値として定める。

$$
\boxed{\displaystyle
D^F_{\xi,\mu\nu}(k)=
\lim_{\varepsilon\downarrow0}
\left[
-\frac{i\eta_{\mu\nu}}{k^2+i\varepsilon}
+i(1-\xi)\frac{k_\mu k_\nu}{(k^2+i\varepsilon)^2}
\right].}
$$

> $k_\mu k_\nu$ を含めた全体をFourier分布として解釈する。任意の光的 $k$ で分母を数値評価する式ではなく、古典的な $K_\xi^{-1}$ にFeynman境界条件を付けた核の規約である。
<!-- formal-statement-end -->

この規約で $\xi=1$ はFeynmanゲージです。$\xi\to0^+$ の伝播関数の形式的極限はLandauゲージと呼ばれますが、元の定義の作用の分母へ $\xi=0$ を代入したものではありません。さらに二重極の処方を保持することが不可欠です。ゲージに依存する $A_\mu$ の二点核と、ゲージ不変な $F_{\mu\nu}$ や物理的な散乱振幅を区別します。

<!-- definition-example-start: def-qft16-photon-propagator -->
### 例：$\xi=1$ と $\xi=2$ の違い

**定義の確認**：固定した $\varepsilon>0$ では分母は実 $k$ で零になりません。$\xi=1$ なら縦方向の係数 $1-\xi$ が零なので

$$
D^F_{1,\mu\nu}(k)=-\frac{i\eta_{\mu\nu}}{k^2+i0}.
$$

$\xi=2$ なら

$$
D^F_{2,\mu\nu}(k)
=D^F_{1,\mu\nu}(k)-\frac{ik_\mu k_\nu}{(k^2+i0)^2}.
$$

差は $k_\mu k_\nu$ に比例する縦方向です。$\xi=2>0$ も条件を満たし、$\xi\to0$ と違って定義された固定作用から出発できます。分子の符号と二重極の存在を確認できました。
<!-- definition-example-end -->

<a id="prop-qft16-feynman-gauge"></a>

<!-- formal-statement-start -->
> **命題（Feynmanゲージと一般共変ゲージの伝播関数）**  
> 上の $D^F_\xi$ は $k^2\ne0$ で $iG_\xi$ の極限に一致する。$\xi=1$ の核は $-i\eta_{\mu\nu}/(k^2+i0)$ で、任意の $\xi>0$ との違いは $i(1-\xi)k_\mu k_\nu/(k^2+i0)^2$ である。固定した非零 $\varepsilon$ での式を、無修正の実作用素 $K_\xi$ の厳密な逆だと主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

前節の $G_\xi$ に $i$ を掛け、単純極と二重極それぞれに同じFeynman境界値を指定します。$\xi$ を1にすれば二重極は消えます。

<!-- proof-start -->
### 証明

[逆テンソル](#thm-qft16-inverse)を展開すると

$$
iG_{\xi,\mu\nu}
=-\frac{i\eta_{\mu\nu}}{k^2}
+i(1-\xi)\frac{k_\mu k_\nu}{(k^2)^2}
\qquad(k^2\ne0).
$$

各項の質量殻の極に共通の $+i\varepsilon$ を入れ、境界値の規約に従うと定義式を得ます。$\xi=1$ では $1-\xi=0$、二重極が消えて主張のFeynmanゲージの核になります。

なお有限 $\varepsilon$ で $k^2/(k^2+i\varepsilon)^2$ を $1/(k^2+i\varepsilon)$ と置くのは不正確です。その差は $-i\varepsilon/(k^2+i\varepsilon)^2$ であり、$i0$ を取る分布的な段階と有限正則化を混同しません。
<!-- proof-end -->

ここでは時間順序核を計算する摂動論の規約を扱っています。ゲージ固定された四つの成分を独立の正ノルム粒子として量子化してよい、あるいはすべての相関関数が正の確率的共分散である、とは言っていません。物理状態の選別や相互作用を含む厳密構成は別の論点です。

## 5. 保存電流を縮約するとゲージ依存項は消える

内部光子線の両端に外部電流がつく状況を考えます。$\widehat J^\mu(k)$ と $\widehat J'^\mu(k)$ は十分滑らかで急減少する電流のFourier変換とし、それぞれ**保存則** $\partial_\mu J^\mu=0$、$\partial_\mu J'^\mu=0$ を満たすとします。Fourier変換すると

$$
\partial_\mu J^\mu=0
\quad\Longleftrightarrow\quad
-ik_\mu\widehat J^\mu(k)=0
\quad\Longleftrightarrow\quad
k_\mu\widehat J^\mu(k)=0.
$$

この一行が、ゲージ依存性の相殺に必要な条件です。[QFT15の外部電流の保存条件](../QFT15/index.md#prop-qft15-current-conservation)と同じものですが、今度は運動量空間で使います。

<a id="thm-qft16-current-exchange"></a>

<!-- formal-statement-start -->
> **定理（保存電流間の交換核のゲージ非依存性）**  
> $J,J'$ を $\mathbb R^{1,3}$ 上の滑らかな急減少する四元電流とし、$\partial_\mu J^\mu=\partial_\mu J'^\mu=0$ を仮定する。共変ゲージの光子伝播関数で作る運動量ごとの交換核

$$
\mathcal E_\xi(k)
=\widehat J^\mu(-k)D^F_{\xi,\mu\nu}(k)\widehat J'^\nu(k)
$$

> は、分布としてゲージパラメータ $\xi>0$ に依存せず、

$$
\mathcal E_\xi(k)
=-\frac{i\,\widehat J_\nu(-k)\widehat J'^\nu(k)}{k^2+i0}
$$

> となる。これは二つの保存電流を結ぶ自由な内部光子線の木レベル縮約に関する結論であり、一般のゲージ非不変な中間相関関数や全次数の散乱を無条件に保証するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの伝播関数の差は縦方向の $k_\mu k_\nu$ だけです。左右の電流に保存則をFourier変換して適用すれば、その縦方向は必ず零になります。

<!-- proof-start -->
### 証明

[伝播関数の定義](#def-qft16-photon-propagator)を代入すると、$\varepsilon>0$ の各正則化で

$$
\begin{aligned}
\mathcal E_{\xi,\varepsilon}(k)
={}&-\frac{i\,\widehat J^\mu(-k)\eta_{\mu\nu}
\widehat J'^\nu(k)}{k^2+i\varepsilon}\\
&+i(1-\xi)
\frac{[k_\mu\widehat J^\mu(-k)]
[k_\nu\widehat J'^\nu(k)]}{(k^2+i\varepsilon)^2}.
\end{aligned}
$$

保存則から $q_\mu\widehat J^\mu(q)=0$ が全ての $q$ で成立するため、$q=-k$ を代入しても $k_\mu\widehat J^\mu(-k)=0$ です。$J'$ についても $k_\nu\widehat J'^\nu(k)=0$ です。したがって**有限の $\varepsilon>0$ の段階で**第二項は零になります。残る第一項の分布境界値を取れば結論を得ます。特に二重極の微妙な分布操作に頼らず相殺が成立します。
<!-- proof-end -->

逆に保存しない源を許せば縦方向の項は一般に残ります。例えば $k^\mu=(\omega,0,0,q)$、$\omega q\ne0$ とし、$J^\mu=(j,0,0,0)$、$J'^\mu=(j',0,0,0)$ という振幅なら、$k_\mu J^\mu=\omega j$、$k_\mu J'^\mu=\omega j'$ です。差は $i(1-\xi)\omega^2jj'/(k^2+i0)^2$ となり、$\xi$ に依存します。これは**保存則を外したために証明の相殺機構が壊れた**具体例であって、実在の非保存電磁源を許すという意味ではありません。

## 6. 二つの物理偏極とCoulombゲージ

伝播関数は四元添字を持ちますが、[QFT15で証明した物理偏極](../QFT15/index.md#thm-qft15-two-polarizations)は二つです。この二つを直接見るには、非零の光的運動量 $k^\mu=(\omega,0,0,\omega)$、$\omega>0$ を固定します。保存する振幅 $j^\mu$ なら $k_\mu j^\mu=\omega(j^0-j^3)=0$ なので $j^0=j^3$ です。複素振幅の $j_\mu^*$ は添字を下げた成分 $j_\mu$ の複素共役を表します。

<a id="prop-qft16-physical-polarizations"></a>

<!-- formal-statement-start -->
> **命題（光的運動量での二つの物理偏極）**  
> $k^\mu=(\omega,0,0,\omega)$、$\omega>0$ において、横偏極

$$
\varepsilon_1^\mu=(0,1,0,0),\qquad
\varepsilon_2^\mu=(0,0,1,0)
$$

> を取る。$k_\mu j^\mu=0$ を満たす任意の複素四元振幅 $j^\mu$ について

$$
\sum_{a=1}^{2}|j_\mu\varepsilon_a^\mu|^2
=-j_\mu^*j^\mu=|j^1|^2+|j^2|^2
$$

> が成り立つ。これは物理偏極に縮約した強度の恒等式であり、光的 $k$ に非光的射影 $k_\mu k_\nu/k^2$ を代入したものではない。
<!-- formal-statement-end -->

### 証明の見取り図

保存条件で時間と進行方向の振幅が等しくなるため、Minkowskiノルムの時間成分と縦成分が相殺します。残る二成分が偏極和と一致します。

<!-- proof-start -->
### 証明

$k_\mu j^\mu=\omega(j^0-j^3)=0$ で $\omega>0$ だから $j^0=j^3$ です。偏極ベクトルを下げると空間成分に負符号が付くので

$$
j_\mu\varepsilon_1^\mu=-j^1,\qquad
j_\mu\varepsilon_2^\mu=-j^2.
$$

従って左辺は $|j^1|^2+|j^2|^2$。一方

$$
-j_\mu^*j^\mu
=-|j^0|^2+|j^1|^2+|j^2|^2+|j^3|^2
=|j^1|^2+|j^2|^2
$$

であり、同じ量です。
<!-- proof-end -->

Coulombゲージは空間ベクトルポテンシャルを $\nabla\cdot\boldsymbol A=0$ と選びます。[QFT15の非零空間波数の横射影](../QFT15/index.md#def-qft15-transverse-projector)

$$
P_{ij}(\boldsymbol k)=\delta_{ij}-\frac{k_i k_j}{|\boldsymbol k|^2}
\qquad(|\boldsymbol k|>0)
$$

を使います。$P$ は**空間Fourier変換後の各 $\boldsymbol k$ の振幅**に作用する行列です。Coulomb条件 $\nabla\cdot\boldsymbol A=0$ をFourier変換すると $\boldsymbol k\cdot\widehat{\boldsymbol A}=0$ となるので、[横射影の定義](../QFT15/index.md#def-qft15-transverse-projector)により

$$
\widehat{\boldsymbol A}(k^0,\boldsymbol k)
=P(\boldsymbol k)\widehat{\boldsymbol A}(k^0,\boldsymbol k)
\qquad(|\boldsymbol k|>0)
$$

です。電場が $\boldsymbol E=-\partial_t\boldsymbol A-\nabla\Phi$ なので、Gauss則は

$$
\nabla\cdot\boldsymbol E=-\Delta\Phi=\rho,\qquad
\widehat\Phi(k^0,\boldsymbol k)=\frac{\widehat\rho(k^0,\boldsymbol k)}{|\boldsymbol k|^2}
\quad(|\boldsymbol k|>0)
$$

となります。$\Phi$ の決定式に二階の時間微分はなく、**同時刻の電荷分布に対応する拘束**です。これは「電磁作用が瞬時に遠方へ伝わる」という主張ではありません。Gauss拘束と、因果的に伝播する横波を分けているだけです。実際、Ampère則へ $\boldsymbol B=\nabla\times\boldsymbol A$ と $\boldsymbol E$ を代入すると

$$
\Box\boldsymbol A+\nabla\partial_t\Phi=\boldsymbol j.
$$

各非零空間波数で $P(\boldsymbol k)\boldsymbol k=0$ ですから、$P$ は勾配項のFourier振幅を消します。また $P$ は $k^0$ に依存しない行列乗算であり、$\Box$ のFourier記号 $-k^2$ はスカラーなので両者は交換します。よって

$$
-k^2\widehat{\boldsymbol A}
=P(\boldsymbol k)\widehat{\boldsymbol j}
=:\widehat{\boldsymbol j}_T
\qquad(|\boldsymbol k|>0)
$$

を得ます。ここで $\boldsymbol j_T$ は空間電流の横成分です。逆Fourier表示では $\Box\boldsymbol A=\boldsymbol j_T$ となり、**空間の横成分だけが波として伝播し、縦方向はGauss拘束で決まる**ことが分かります。これは共変ゲージで計算して保存電流で縦方向が相殺する記述と矛盾しません。零空間波数、境界条件、非局所的な射影、量子状態の選別はこの単一Fourierモードの議論だけでは決まりません。

## 7. 演習：縦方向の余分な成分を追跡する

### 演習 QFT16-A1：ゲージ零方向を直接検査

- Level: A
- 問題：$\chi=t^3$、$A^\mu=\partial^\mu\chi$ と置く。$F_{\mu\nu}$、$B=\partial_\mu A^\mu$、$K_0A$ を計算し、$B=0$ ではない純ゲージ場が $K_0$ の零方向になることを示せ。

<!-- solution-start -->
**詳細解答**

$A^\mu=(3t^2,0,0,0)$ です。$F_{\mu\nu}=\partial_\mu\partial_\nu\chi-\partial_\nu\partial_\mu\chi=0$ で、$B=\partial_t(3t^2)=6t$。さらに

$$
(K_0A)^0=\Box(3t^2)-\partial^0(6t)=6-6=0,\qquad
(K_0A)^i=0-(-\partial_i)(6t)=0.
$$

従って $K_0A=0$ です。$F=0$ と $B\ne0$ は両立し、ゲージ固定項が代表元を区別できる理由になります。
<!-- solution-end -->

### 演習 QFT16-A2：時間的運動量の射影

- Level: A
- 問題：$k^\mu=(2,0,0,0)$、$v^\mu=(a,b,c,d)$ に対し $L^\mu{}_\nu v^\nu$ と $T^\mu{}_\nu v^\nu$ を求め、$LT=0$ を成分で確かめよ。

<!-- solution-start -->
**詳細解答**

$k_\mu=(2,0,0,0)$、$k^2=4$ なので $L^\mu{}_\nu=k^\mu k_\nu/4=\operatorname{diag}(1,0,0,0)$ です。よって

$$
Lv=(a,0,0,0),\qquad Tv=v-Lv=(0,b,c,d).
$$

$L(Tv)$ の時間成分は $Tv$ の時間成分0、残る成分は $L$ の零行で0なので $L(Tv)=0$ です。任意の $v$ に成り立つため $LT=0$ です。
<!-- solution-end -->

### 演習 QFT16-A3：Feynmanゲージの符号

- Level: A
- 問題：$\xi=1$ の自由方程式を求め、$k^2\ne0$ で古典逆テンソル $G_{1,\mu\nu}$ を求めよ。$\eta_{11}=-1$ のため $D^F_{1,11}$ の符号が $D^F_{1,00}$ とどう違うか示せ。

<!-- solution-start -->
**詳細解答**

$1-\xi^{-1}=0$ なので $\Box A^\nu=J^\nu$ です。Fourierで $K_1^{\mu\nu}=-k^2\eta^{\mu\nu}$、従って $G_{1,\mu\nu}=-\eta_{\mu\nu}/k^2$ となります。Feynman処方を付けると

$$
D^F_{1,00}=-\frac{i}{k^2+i0},\qquad
D^F_{1,11}=+\frac{i}{k^2+i0}.
$$

これは計量の符号による違いで、四つの独立な正ノルム光子を意味しません。
<!-- solution-end -->

### 演習 QFT16-A4：保存電流なら発散モードは自由

- Level: A
- 問題：$\xi=2$ のゲージ固定Maxwell方程式の発散を取り、$\partial_\nu J^\nu=0$ のとき $B=\partial_\mu A^\mu$ に課される方程式を求めよ。$B=3$ はこの条件に反するか。

<!-- solution-start -->
**詳細解答**

[ゲージ固定作用の方程式](#thm-qft16-gauge-fixed-eom)に分布微分として $\partial_\nu$ を作用させると（$A\in C^2$ のみでは $B$ の二階微分を古典的に仮定できません）、

$$
\Box B-\left(1-\frac12\right)\Box B
=\frac12\Box B=\partial_\nu J^\nu.
$$

保存電流なら $\Box B=0$。定数 $B=3$ は全ての偏微分が零なので $\Box3=0$ を満たします。従って保存電流だけではLorenz条件 $B=0$ を強制できません。
<!-- solution-end -->

### 演習 QFT16-A5：二つの光子偏極

- Level: A
- 問題：$k^\mu=(\omega,0,0,\omega)$、$\omega>0$、$j^\mu=(3,1,2,3)$ とする。$k_\mu j^\mu$ と、$\varepsilon_1,\varepsilon_2$ との縮約二乗和を計算し、$-j_\mu j^\mu$ と比較せよ。

<!-- solution-start -->
**詳細解答**

$k_\mu=(\omega,0,0,-\omega)$ なので $k_\mu j^\mu=3\omega-3\omega=0$ です。$j_\mu\varepsilon_1^\mu=-1$、$j_\mu\varepsilon_2^\mu=-2$ から偏極和は $1+4=5$。また

$$
j_\mu j^\mu=3^2-1^2-2^2-3^2=-5,\qquad
-j_\mu j^\mu=5.
$$

時間成分と縦成分の二乗が相殺して、横偏極の二成分だけが残ります。
<!-- solution-end -->

### 演習 QFT16-B1：固定項を含む変分を再導出

- Level: B
- 問題：$S_\xi[A]$ のゲージ固定部分を $\delta A_\nu$ で変分し、その後Maxwell部分と合わせて $\xi=2$ の運動方程式を導け。$\delta A$ は内部にコンパクト台を持つとする。

<!-- solution-start -->
**詳細解答**

$B=\partial_\mu A^\mu=\partial^\nu A_\nu$ なので $\delta B=\partial^\nu\delta A_\nu$ です。固定部分は

$$
\delta S_{\rm gf}=-\frac1\xi\int B\partial^\nu\delta A_\nu\,d^4x
=\frac1\xi\int(\partial^\nu B)\delta A_\nu\,d^4x.
$$

二番目の等号の境界項は変分のコンパクト台から零です。[Maxwell作用の変分式](../QFT15/index.md#thm-qft15-euler-maxwell)の係数 $\partial_\mu F^{\mu\nu}-J^\nu$ を足すと、

$$
\delta S_\xi=\int\left[\Box A^\nu-\partial^\nu B
+\frac1\xi\partial^\nu B-J^\nu\right]\delta A_\nu\,d^4x.
$$

各 $\delta A_\nu$ が任意なので括弧内が零です。$\xi=2$ なら

$$
\Box A^\nu-\frac12\partial^\nu(\partial_\mu A^\mu)=J^\nu.
$$

$1-\xi^{-1}=1/2$ の係数と負符号を確認しました。
<!-- solution-end -->

### 演習 QFT16-B2：二次形式の逆を二通りで確かめる

- Level: B
- 問題：$k^2\ne0$、$\xi=3$ とする。$K_3=-k^2(T+L/3)$ の逆が $G_3=-(T+3L)/k^2$ であることを示し、$\eta_{\mu\nu}$ と $k_\mu k_\nu$ の表示にも戻せ。

<!-- solution-start -->
**詳細解答**

射影の恒等式 $T^2=T$、$L^2=L$、$TL=LT=0$ を[非光的射影](#def-qft16-projectors)から直接展開すると、

$$
\begin{aligned}
K_3G_3
&=(T+L/3)(T+3L)\\
&=T^2+3TL+\tfrac13LT+L^2=T+L=I.
\end{aligned}
$$

また $T_{\mu\nu}=\eta_{\mu\nu}-k_\mu k_\nu/k^2$ なので

$$
G_{3,\mu\nu}
=-\frac{T_{\mu\nu}+3L_{\mu\nu}}{k^2}
=-\frac{1}{k^2}\left(\eta_{\mu\nu}
+2\frac{k_\mu k_\nu}{k^2}\right).
$$

これは一般式の $1-\xi=-2$ と一致します。$k^2=0$ ではこの代数的な逆行列計算を使えません。
<!-- solution-end -->

### 演習 QFT16-B3：保存則が壊れるとゲージ依存

- Level: B
- 問題：$k^\mu=(\omega,0,0,q)$、$\omega q\ne0$、$k^2\ne0$ とする。$j^\mu=(a,0,0,b)$、$j'^\mu=(c,0,0,d)$ を固定振幅とし、$\xi$ と1の交換核の差を求めよ。二つの保存条件が成立するとき、その差が零になることを検査せよ。

<!-- solution-start -->
**詳細解答**

$k_\mu=(\omega,0,0,-q)$ なので $k\cdot j=\omega a-qb$、$k\cdot j'=\omega c-qd$ です。固定した光円錐外の運動量では通常の分数で計算でき、

$$
\begin{aligned}
\Delta\mathcal E
&=j^\mu(D^F_{\xi,\mu\nu}-D^F_{1,\mu\nu})j'^\nu\\
&=i(1-\xi)
\frac{(\omega a-qb)(\omega c-qd)}{(k^2+i0)^2}.
\end{aligned}
$$

両電流が保存するなら $\omega a=qb$、$\omega c=qd$ で各括弧が零です。片側だけ非保存なら差が偶然零になる場合もありますが、**任意の両側電流で消える**という定理の保証にはそれぞれの保存則が十分な条件になります。
<!-- solution-end -->

### 演習 QFT16-B4：CoulombゲージのGauss則と横波

- Level: B
- 問題：$\nabla\cdot\boldsymbol A=0$、$|\boldsymbol k|>0$ とする。$\boldsymbol E=-\partial_t\boldsymbol A-\nabla\Phi$ とMaxwellのGauss則から $\widehat\Phi$ を求めよ。次にAmpère則から、横射影を取った $\boldsymbol A$ の波動方程式を導け。

<!-- solution-start -->
**詳細解答**

Gauss則 $\nabla\cdot\boldsymbol E=\rho$ に代入すると

$$
-\partial_t(\nabla\cdot\boldsymbol A)-\Delta\Phi
=-\Delta\Phi=\rho.
$$

空間Fourier変換は $\Delta\mapsto-|\boldsymbol k|^2$ なので、非零波数では $\widehat\Phi=\widehat\rho/|\boldsymbol k|^2$ です。一方、$\boldsymbol B=\nabla\times\boldsymbol A$ から

$$
\nabla\times\boldsymbol B-\partial_t\boldsymbol E
=\nabla(\nabla\cdot\boldsymbol A)-\Delta\boldsymbol A
+\partial_t^2\boldsymbol A+\nabla\partial_t\Phi
=\Box\boldsymbol A+\nabla\partial_t\Phi=\boldsymbol j.
$$

[QFT15の横射影](../QFT15/index.md#def-qft15-transverse-projector)は各 $\boldsymbol k\ne0$ で $P\boldsymbol k=0$ なので、Fourier変換後に $P\widehat{\nabla\partial_t\Phi}=0$ です。またCoulomb条件から $P\widehat{\boldsymbol A}=\widehat{\boldsymbol A}$ で、$P$ は $\Box$ のスカラーFourier記号 $-k^2$ と交換します。従って $-k^2\widehat{\boldsymbol A}=P\widehat{\boldsymbol j}=:\widehat{\boldsymbol j}_T$、逆変換で $\Box\boldsymbol A=\boldsymbol j_T$ を得ます。Gauss拘束と伝播する横成分の役割が分離しました。
<!-- solution-end -->

### 演習 QFT16-C1：ゲージ固定から保存電流の交換核と二偏極まで

- Level: C
- 問題：計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、ゲージパラメータは $\xi>0$ とする。次の四項目を一続きに示せ。

  1. ゲージ固定Maxwell作用の二次Fourier作用素を導き、$k^2\ne0$ で $T,L$ に分解せよ。
  2. 逆作用素から一般共変ゲージのFeynman核を求めよ。
  3. 保存する二つの外部電流の木レベル縮約が $\xi$ に依存しないことを示せ。
  4. 光的運動量 $k=(\omega,0,0,\omega)$ と保存振幅 $j=(u,a,b,u)$ について、同じ振幅との複素共役縮約に現れる分子 $-j_\mu^*j^\mu$ が横偏極の二乗和とどう結び付くか示せ。$a,b,u$ は複素数でもよい。

<!-- solution-start -->
**詳細解答**

**(1) 作用の変分と射影。** Maxwell部分は $\partial_\mu F^{\mu\nu}=\Box A^\nu-\partial^\nu B$ です。固定項の変分は部分積分して $+\xi^{-1}\partial^\nu B$ となるので

$$
\Box A^\nu-(1-\xi^{-1})\partial^\nu B=J^\nu.
$$

$\partial^\mu\mapsto-ik^\mu$ と $\Box\mapsto-k^2$ をそれぞれ代入すると

$$
K_\xi^{\mu\nu}=-k^2\eta^{\mu\nu}+(1-\xi^{-1})k^\mu k^\nu.
$$

$k^2\ne0$ では $L^{\mu\nu}=k^\mu k^\nu/k^2$、$T^{\mu\nu}=\eta^{\mu\nu}-L^{\mu\nu}$ と置けるので、$K_\xi=-k^2(T+\xi^{-1}L)$ です。

**(2) 逆と極の処方。** $L^2=L$、$T^2=T$、$TL=LT=0$ より

$$
\begin{aligned}
G_{\xi,\mu\nu}
&=-\frac1{k^2}(T_{\mu\nu}+\xi L_{\mu\nu})\\
&=-\frac{\eta_{\mu\nu}}{k^2}
+(1-\xi)\frac{k_\mu k_\nu}{(k^2)^2},\\
K_\xi G_\xi
&=(T+\xi^{-1}L)(T+\xi L)=I.
\end{aligned}
$$

時間順序の選択は各質量殻の極に $+i0$ を付け、量子収縮の規約による $i$ を掛けるので

$$
D^F_{\xi,\mu\nu}
=-\frac{i\eta_{\mu\nu}}{k^2+i0}
+i(1-\xi)\frac{k_\mu k_\nu}{(k^2+i0)^2}.
$$

**(3) 保存電流。** 任意の保存電流に $k_\mu\widehat J^\mu(k)=0$、$k_\nu\widehat J'^\nu(k)=0$ が成り立ちます。よって

$$
\widehat J^\mu(-k)D^F_{\xi,\mu\nu}\widehat J'^\nu(k)
=-\frac{i\,\widehat J_\nu(-k)\widehat J'^\nu(k)}{k^2+i0}
$$

です。ここで縦項の分子は二つの保存条件で個別に零となるため、二重極の境界値を取る前に消えます。

**(4) 光的運動量での物理偏極。** $k^2=0$ なので (1) の $k_\mu k_\nu/k^2$ は使いません。保存条件は $\omega(j^0-j^3)=0$ で、与えられた $j=(u,a,b,u)$ は満たします。従って

$$
-j_\mu^*j^\mu
=-|u|^2+|a|^2+|b|^2+|u|^2
=|a|^2+|b|^2.
$$

実際、物理偏極 $\varepsilon_1=(0,1,0,0)$、$\varepsilon_2=(0,0,1,0)$ に対して $j\cdot\varepsilon_1=-a$、$j\cdot\varepsilon_2=-b$ なので、その絶対値二乗和は $|a|^2+|b|^2$ です。これは**伝播関数そのものを光円錐上で値として評価する操作ではなく**、物理偏極への縮約に現れる分子の等式です。四元共変な計算と二つの光子偏極が矛盾しないことを確認しました。
<!-- solution-end -->

## 8. 次へ：電磁場とDirac場を結合する

四元ポテンシャルの中間的なゲージ依存性は、保存電流との縮約で消えることを確かめました。次は[QFT7のDirac場](../QFT7/index.md#def-qft7-adjoint-action)を電磁ポテンシャルへ最小結合し、相互作用頂点を作ります。そこでは電流保存が単なる仮定ではなく、外部スピノルの運動方程式と結び付くことを確かめます。
