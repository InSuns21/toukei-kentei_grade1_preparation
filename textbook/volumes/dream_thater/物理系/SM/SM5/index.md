# SM5 古典理想気体とアンサンブルの同値性

[SM3の正準分配関数](../SM3/index.md#def-sm3-canonical)では、微視的配置に指数重みを付けました。[SM4の大分配関数](../SM4/index.md#def-sm4-grand-ensemble)では、さらに粒子数を揺らがせました。それでも、実際の気体について分配関数を計算するには「何を一つの微視的状態として数えるか」が未解決です。気体分子の位置と[運動量](../../MECH/MECH4/index.md#def-mech4-linear-momentum)は連続量なので、有限個の配置を足すだけでは済みません。

本章では、[相空間](../../AMECH/AMECH5/index.md#def-amech5-phase-space)の積分により古典理想気体の分配関数を計算し、速度分布・状態方程式・エントロピーを導きます。その後、エネルギー固定・温度固定・粒子数可変という三つの記述を比較します。「同値」とは有限の容積で分布が等しいという意味ではなく、**指定した密度・温度で、特定の巨視的観測量や一粒子当たりの熱力学量の極限が一致する**という主張です。

## 1. 相空間で何を積分するのか

一辺の長さが $L>0$ の立方体容器を取り、体積を $V=L^3$ とします。$N\ge1$ 個の質量 $m>0$ の同種粒子は、互いに相互作用せず、容器内で位置 $\boldsymbol q_i\in[0,L]^3$ と運動量 $\boldsymbol p_i\in\mathbb R^3$ を持つとします。壁を除く内部のエネルギーは運動エネルギーのみです。

位置・運動量の組を並べた連続相空間を使うと、単に体積を積分しただけでは分配関数に単位が残ります。ここでは作用の単位を持つ定数 $h>0$ を固定し、一粒子につき $h^3$ で相空間体積を無次元化します。同種粒子のラベル交換を巨視的な状態数へ重複計上しないため $N!$ でも割ります。古典近似の範囲では $h$ をPlanck定数と取りますが、**連続的な古典力学だけから $h$ や $1/N!$ が導出されるわけではありません**。これは量子論と整合する相空間の数え方を採用する、という模型上の入力です。

<a id="def-sm5-phase-gas"></a>

<!-- formal-statement-start -->
> **定義（古典理想気体の相空間模型）**  
> $N\in\mathbb N$、$V=L^3>0$、$m,h,k_{\mathrm B}>0$ とする。相空間 $\Gamma_{N,V}=[0,L]^{3N}\times\mathbb R^{3N}$ の点を $(\boldsymbol q,\boldsymbol p)$ とし、Hamilton関数および無次元相空間測度を

$$
H_N(\boldsymbol q,\boldsymbol p)=
\sum_{i=1}^{N}\frac{|\boldsymbol p_i|^2}{2m},
\qquad
d\nu_{N,V}=\frac{d^{3N}q\,d^{3N}p}{N!\,h^{3N}}
$$

> と定める。$T>0$、$\beta=(k_{\mathrm B}T)^{-1}$ における固定粒子数の正準分配関数は

$$
Z_N(T,V)=\int_{\Gamma_{N,V}}e^{-\beta H_N}\,d\nu_{N,V}
$$

> である。$d\nu_{N,V}$ に関する正準確率密度を $e^{-\beta H_N}/Z_N$ とする。交換対称な観測量だけを物理的観測量として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm5-phase-gas -->
### 直接例：一粒子なら重複計数がない

**定義の確認**：$N=1$ なら $1!=1$ であり、位置の積分は立方体の体積 $V$ です。運動量の各成分について積分が有限なら、$Z_1$ は正の有限値になります。$N=2$ では位置の積分は $V^2$ ですが、ラベル交換した二粒子の組を数え直さない規約のため測度に $1/2!$ が掛かります。測度のこの定数倍は固定 $N$ の正準**確率密度の規格化では相殺**されますが、自由エネルギーには残ります。
<!-- definition-example-end -->

以後、相空間測度は上の定義を使います。連続模型の公式を有限状態の公式へ代入するのではなく、積分の収束と規格化を直接確認します。

## 2. 正準分配関数とMaxwell–Boltzmann分布

運動量の各Cartesian成分は二乗和として現れます。まず一変数のGaussian積分を使い、最後に三次元へ戻しましょう。$\beta m$ の単位に注意すると、長さを持つ新しい量も得られます。

<a id="prop-sm5-partition"></a>

<!-- formal-statement-start -->
> **命題（古典理想気体の正準分配関数）**  
> [古典理想気体の相空間模型](#def-sm5-phase-gas)で $N\ge1$、$T>0$ とする。熱的波長を

$$
\lambda_T=\frac{h}{\sqrt{2\pi m k_{\mathrm B}T}}
$$

> と置けば $\lambda_T>0$ は長さの次元を持ち、分配関数は

$$
Z_N(T,V)=\frac1{N!}\left(\frac{V}{\lambda_T^3}\right)^N
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

位置の積分は $V^N$、運動量の積分は $3N$ 個の一変数Gaussian積分の積です。正の $\beta$ を固定しているので積分は収束し、非負関数の反復積分が使えます。

<!-- proof-start -->
### 証明

$a>0$ に対するGaussian積分は

$$
I(a)=\int_{\mathbb R}e^{-ax^2}\,dx=\sqrt{\frac{\pi}{a}}.
$$

たとえば $I(a)^2$ を平面上の積分にして極座標へ移せば、

$$
I(a)^2=\int_0^{2\pi}d\theta\int_0^\infty e^{-ar^2}r\,dr
=2\pi\left[-\frac{e^{-ar^2}}{2a}\right]_{0}^{\infty}
=\frac{\pi}{a}.
$$

$I(a)>0$ なので正の平方根を取ります。いま $a=\beta/(2m)>0$ を代入し、位置積分と運動量積分を分けると

$$
\begin{aligned}
Z_N&=\frac1{N!h^{3N}}
\left(\int_{[0,L]^{3N}}d^{3N}q\right)
\prod_{j=1}^{3N}\int_{\mathbb R}e^{-\beta p_j^2/(2m)}\,dp_j\\
&=\frac{V^N}{N!h^{3N}}
\left(\frac{2\pi m}{\beta}\right)^{3N/2}
=\frac1{N!}\left[
\frac{V}{h^3}(2\pi m k_{\mathrm B}T)^{3/2}
\right]^N.
\end{aligned}
$$

$\lambda_T^3=h^3/(2\pi m k_{\mathrm B}T)^{3/2}$ を代入すれば結論です。運動量の各積分は有限であり、$Z_N>0$ です。
<!-- proof-end -->

速度 $\boldsymbol v=\boldsymbol p/m$ に移ると、$d^3p=m^3d^3v$ というJacobianが必要です。「速い粒子の割合」を計算するには、分配関数の計算だけでなく、一粒子の密度がどう規格化されるかも確認します。

<a id="prop-sm5-maxwell"></a>

<!-- formal-statement-start -->
> **命題（Maxwell–Boltzmann速度分布）**  
> [古典理想気体の正準模型](#def-sm5-phase-gas)で $N\ge1$、$T>0$ とすると、指定した一粒子の速度ベクトル $\boldsymbol v\in\mathbb R^3$ のLebesgue密度は

$$
f_T(\boldsymbol v)=
\left(\frac{m}{2\pi k_{\mathrm B}T}\right)^{3/2}
\exp\left(-\frac{m|\boldsymbol v|^2}{2k_{\mathrm B}T}\right).
$$

> 粒子ごとの速度ベクトルは独立同分布で、各成分の平均は0、分散は $k_{\mathrm B}T/m$ である。速さ $r=|\boldsymbol v|\ge0$ の密度は

$$
g_T(r)=4\pi r^2
\left(\frac{m}{2\pi k_{\mathrm B}T}\right)^{3/2}
e^{-mr^2/(2k_{\mathrm B}T)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[分配関数の積表示](#prop-sm5-partition)を正準密度の分母へ入れると、位置と運動量の因子がそれぞれ規格化された形になります。速さの密度は球面積 $4\pi r^2$ を掛けたものです。

<!-- proof-start -->
### 証明

確率測度は $Z_N^{-1}e^{-\beta H_N}d\nu_{N,V}$ です。[分配関数](#prop-sm5-partition)の式と $d\nu_{N,V}$ を代入すると、基礎となるLebesgue測度について

$$
\frac{e^{-\beta H_N}}{Z_NN!h^{3N}}
=\frac1{V^N}\prod_{i=1}^N
\left(\frac{\beta}{2\pi m}\right)^{3/2}
e^{-\beta|\boldsymbol p_i|^2/(2m)}.
$$

右辺は位置の一様密度と運動量の確率密度の積です。$\boldsymbol p_i=m\boldsymbol v_i$ と変数変換すれば

$$
m^3\left(\frac{\beta}{2\pi m}\right)^{3/2}
e^{-\beta m|\boldsymbol v_i|^2/2}
=\left(\frac{\beta m}{2\pi}\right)^{3/2}
e^{-\beta m|\boldsymbol v_i|^2/2},
$$

これが $f_T$ です。各成分についてGaussian積分から規格化が1と分かります。平均0は奇関数の積分、二乗平均は $I(a)=\sqrt{\pi/a}$ を $a$ で微分した式

$$
-\frac{dI}{da}
=\int_{\mathbb R}x^2e^{-ax^2}\,dx
=\frac{\sqrt\pi}{2a^{3/2}}
$$

に $a=\beta m/2$ を代入することで $1/(\beta m)=k_{\mathrm B}T/m$ と得られます。球座標では $d^3v=r^2\sin\theta\,dr\,d\theta\,d\varphi$ であり、角度積分は

$$
\int_0^{2\pi}d\varphi\int_0^\pi\sin\theta\,d\theta
=2\pi[-\cos\theta]_0^\pi=4\pi.
$$

従って $g_T(r)=4\pi r^2 f_T(r,0,0)$ であり、$\int_0^\infty g_T(r)\,dr=\int_{\mathbb R^3} f_T(\boldsymbol v)\,d^3v=1$ です。
<!-- proof-end -->

速さの分布の山は $r>0$ にありますが、速度ベクトルの密度は原点で最大です。これは球殻の体積 $4\pi r^2dr$ が速さの分布に掛かるためです。

## 3. 状態方程式とSackur–Tetrode式

位置積分が容積 $V$ に比例することから圧力を、運動量積分が $T^{3/2}$ に比例することから内部エネルギーを計算できます。熱力学量へつなぐときには、[正準Helmholtz自由エネルギー](../SM3/index.md#def-sm3-free-energy)の定義を使います。ただしここでの連続相空間への拡張は前節の積分が有限であることによって正当化します。

ここから先のエントロピー比較では、階乗とGamma関数の対数の主要項を何度も使います。定数までの精密なStirling公式は必要ありません。次の粗い評価なら、Gamma積分だけから証明できます。

<a id="lem-sm5-log-gamma"></a>

<!-- formal-statement-start -->
> **補題（対数Gamma関数の漸近評価）**  
> 実数 $x\ge1$ に対し、$x\to\infty$ で

$$
\log\Gamma(x+1)=x\log x-x+O(\log x)
$$

> が成り立つ。特に整数 $N\to\infty$ では $\log N!=N\log N-N+O(\log N)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Gamma積分の変数を $t=xu$ に変え、指数関数の最大が $u=1$ 付近にあることを使います。積分全体は $x^{-1}$ 程度より小さくならず、定数倍を超えて増大もしません。その対数が $O(\log x)$ に収まることが十分です。

<!-- proof-start -->
### 証明

Gamma積分の定義に $t=xu$ を代入し、$h(u)=u-1-\log u$（$u>0$）とすると

$$
\begin{aligned}
\Gamma(x+1)
&=\int_0^\infty t^xe^{-t}\,dt\\
&=x^{x+1}e^{-x}
\int_0^\infty \exp[-x(u-1-\log u)]\,du\\
&=x^{x+1}e^{-x}J_x.
\end{aligned}
$$

$\log u\le u-1$ なので $h(u)\ge0$。従って $0<u\le2$ の積分は2以下です。$u\ge2$ では $h'(u)=1-1/u\ge1/2$ と $h(2)>0$ より $h(u)\ge(u-2)/2$、従って

$$
J_x\le2+\int_2^\infty e^{-x(u-2)/2}\,du
=2+\frac2x\le4.
$$

一方 $0\le y\le1/x$ に対し、$\log(1+y)\ge y-y^2/2$ は両辺の差を微分すれば確かめられるので、$h(1+y)\le y^2/2$ です。従って $u\in[1,1+1/x]$ で $xh(u)\le1/(2x)\le1/2$ となり、

$$
J_x\ge\int_1^{1+1/x}e^{-xh(u)}\,du
\ge\frac{e^{-1/2}}x.
$$

まとめると

$$
-\log x-\frac12\le\log J_x\le\log4.
$$

はじめのGamma積分の等式で対数を取り、

$$
\log\Gamma(x+1)
=(x+1)\log x-x+\log J_x
=x\log x-x+O(\log x)
$$

を得ます。整数 $N\ge1$ に対して $\Gamma(N+1)=N!$ なので最後の主張も成立します。
<!-- proof-end -->

<a id="thm-sm5-ideal-thermodynamics"></a>

<!-- formal-statement-start -->
> **定理（古典理想気体の正準熱力学）**  
> [古典理想気体の相空間模型](#def-sm5-phase-gas)で $N\ge1$、$V,T>0$ を取り、$m,h,k_{\mathrm B}$ を固定する。$F=-k_{\mathrm B}T\log Z_N$、$U=-\partial_\beta\log Z_N$、$P=-\partial_VF|_{T,N}$、$S=-\partial_TF|_{V,N}$ とすれば、

$$
U=\frac32Nk_{\mathrm B}T,\qquad PV=Nk_{\mathrm B}T,\qquad
F=-k_{\mathrm B}T\left[N\log\frac{V}{\lambda_T^3}-\log N!\right],
$$

$$
S=k_{\mathrm B}\left[
N\log\frac{V}{\lambda_T^3}-\log N!+\frac32N
\right].
$$

> さらに $N\to\infty$、$N/V\to\rho\in(0,\infty)$、$T$ 一定とすると、一粒子当たりのエントロピーの極限（Sackur–Tetrode式）は

$$
\lim_{N\to\infty}\frac{S}{Nk_{\mathrm B}}
=\log\frac{1}{\rho\lambda_T^3}+\frac52.
$$

> 最後の極限は採用した古典相空間規約と理想気体近似の下での結果である。
<!-- formal-statement-end -->

### 証明の見取り図

$\log Z_N$ の容積微分・逆温度微分・温度微分を別々に行います。$N!$ は $T,V$ に依存しないため、圧力と内部エネルギーの微分では消えますが、エントロピーには不可欠です。最後だけ大きな $N$ の漸近評価を使います。

<!-- proof-start -->
### 証明

[分配関数](#prop-sm5-partition)の対数を開くと

$$
\log Z_N=N\log\frac{V}{\lambda_T^3}-\log N!,
\qquad
\partial_\beta\log\lambda_T^3=\frac{3}{2\beta}.
$$

$\beta$ 微分は $\partial_\beta\log\beta=1/\beta$ より

$$
-\partial_\beta\log Z_N
=-\left(-\frac{3N}{2\beta}\right)
=\frac{3N}{2\beta}=\frac32Nk_{\mathrm B}T.
$$

[自由エネルギー](../SM3/index.md#def-sm3-free-energy)の連続模型での式を用い、容積微分を取ると

$$
P=-\left.\partial_VF\right|_{T,N}
=k_{\mathrm B}T\,\left.\partial_V\log Z_N\right|_{T,N}
=k_{\mathrm B}T\frac NV.
$$

$\lambda_T=h(2\pi mk_{\mathrm B}T)^{-1/2}$ なので

$$
\partial_T\log\lambda_T=-\frac1{2T},
\qquad
\partial_T\log Z_N=-3N\partial_T\log\lambda_T=\frac{3N}{2T}.
$$

積の微分により

$$
\begin{aligned}
S&=-\partial_T(-k_{\mathrm B}T\log Z_N)\\
&=k_{\mathrm B}\log Z_N
+k_{\mathrm B}T\frac{3N}{2T}
=k_{\mathrm B}\left(\log Z_N+\frac32N\right).
\end{aligned}
$$

$F=U-TS$ も代入すれば確かめられます。次に[対数Gamma関数の漸近評価](#lem-sm5-log-gamma)により

$$
\log N!=N\log N-N+O(\log N)
$$

を使います。これを上の厳密な $S$ に代入して、$V_N=N/\rho_N$ とおけば

$$
\begin{aligned}
\frac{S}{Nk_{\mathrm B}}
&=\log\frac{V_N}{\lambda_T^3}
-\frac{\log N!}{N}+\frac32\\
&=\log\frac{V_N}{N\lambda_T^3}+\frac52
+O\left(\frac{\log N}{N}\right)\\
&=\log\frac1{\rho_N\lambda_T^3}+\frac52
+O\left(\frac{\log N}{N}\right).
\end{aligned}
$$

$\rho_N\to\rho>0$ と $\log N/N\to0$ から主張が従います。
<!-- proof-end -->

### なぜ $N!$ を落とせないか

もし $1/N!$ を使わなければ、$S/(Nk_{\mathrm B})$ に $\log N$ が残り、密度一定の熱力学極限で発散します。$1/N!$ は速度分布の形を変えませんが、巨視的に自然なエントロピーの広延性を成立させる役割を持ちます。

ただし古典近似が物理的に妥当なのは、粒子の量子波長に対して一粒子当たりの体積が十分大きい領域、概ね $\rho\lambda_T^3\ll1$ です。この条件を外れた領域は次章SM6の量子統計で扱います。Sackur–Tetrode式はすべての密度・温度の気体へ無条件には適用できません。

## 4. 微正準側の相空間体積を数える

[SM2の微正準アンサンブル](../SM2/index.md#def-sm2-microcanonical)は、許されたエネルギー窓での等確率でした。ここでは連続模型での取り扱いを明示するため、エネルギーが $E$ 以下となる相空間の累積体積から計算します。**累積体積の対数**と、薄いエネルギー殻の体積の対数は有限 $N$ では別のエントロピー定義です。両者を無断で同一視しません。

<a id="def-sm5-phase-volume"></a>

<!-- formal-statement-start -->
> **定義（古典理想気体の累積相空間体積）**  
> $N\ge1$、$V>0$、$E>0$ の[古典理想気体](#def-sm5-phase-gas)に対して、累積相空間体積とその対数エントロピーを

$$
\Phi_N(E,V)=\int_{\{H_N\le E\}}d\nu_{N,V},
\qquad
S_{\mathrm{vol}}(E,V,N)=k_{\mathrm B}\log\Phi_N(E,V)
$$

> とする。この章では固定 $N$ に対し、$T_{\mathrm{vol}}^{-1}=\partial_ES_{\mathrm{vol}}$、$P_{\mathrm{vol}}/T_{\mathrm{vol}}=\partial_VS_{\mathrm{vol}}$ を連続模型の微正準型の熱力学量として定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm5-phase-volume -->
### 直接例：エネルギーを倍にすると

**定義の確認**：$N=1$ の許容運動量は半径 $\sqrt{2mE}$ の三次元球です。球体積は $4\pi(2mE)^{3/2}/3$、位置積分は $V$ なので

$$
\Phi_1(E,V)=\frac{4\pi V}{3h^3}(2mE)^{3/2}>0.
$$

$E$ を2倍にすると $\Phi_1$ は $2^{3/2}$ 倍になります。$S_{\mathrm{vol}}$ の変化は $(3/2)k_{\mathrm B}\log2$ であり、絶対的な相空間の大きさではなく**その対数**を取っています。
<!-- definition-example-end -->

<a id="prop-sm5-phase-volume"></a>

<!-- formal-statement-start -->
> **命題（累積相空間体積と微正準型の状態方程式）**  
> [累積相空間体積](#def-sm5-phase-volume)で $\alpha=3N/2$ とおくと、任意の $N\ge1$、$V,E>0$ で

$$
\Phi_N(E,V)=\frac{V^N}{N!h^{3N}}\,
\frac{(2\pi mE)^\alpha}{\Gamma(\alpha+1)}.
$$

> よって

$$
\frac1{k_{\mathrm B}T_{\mathrm{vol}}}
=\frac{\alpha}{E},\qquad
E=\frac32Nk_{\mathrm B}T_{\mathrm{vol}},\qquad
P_{\mathrm{vol}}V=Nk_{\mathrm B}T_{\mathrm{vol}}.
$$

> エネルギー殻の密度は $\partial_E\Phi_N=\alpha\Phi_N/E$ であり、累積体積そのものとは異なる。
<!-- formal-statement-end -->

### 証明の見取り図

$3N$ 次元の運動量球の半径は $\sqrt{2mE}$ です。球の体積係数はGaussian積分とGamma積分を比較して求め、その後は $\log\Phi_N$ を微分します。

<!-- proof-start -->
### 証明

$d=3N$ と置き、$d$ 次元単位球の体積を $C_d$ と書きます。半径 $r$ の球の体積が $C_dr^d$ なので球殻を積分すると

$$
\int_{\mathbb R^d}e^{-|x|^2}\,d^dx
=dC_d\int_0^\infty e^{-r^2}r^{d-1}\,dr.
$$

$t=r^2$ と変数変換し、$r^{d-1}dr=\tfrac12t^{d/2-1}dt$ を使うと右辺は $\tfrac d2C_d\Gamma(d/2)=C_d\Gamma(d/2+1)$ です。一方、[Gaussian積分](#prop-sm5-partition)を $d$ 回掛けると左辺は $\pi^{d/2}$ となります。したがって

$$
C_d=\frac{\pi^{d/2}}{\Gamma(d/2+1)}.
$$

許される運動量は $|\boldsymbol p|^2\le2mE$ を満たす半径 $\sqrt{2mE}$ の $d$ 次元球であり、その体積は

$$
C_d(2mE)^{d/2}
=\frac{(2\pi mE)^{3N/2}}{\Gamma(3N/2+1)}.
$$

位置積分は $V^N$ です。これに測度の $1/(N!h^{3N})$ を掛けて $\Phi_N$ の式を得ます。特に正の $E,V$ 上では $\Phi_N>0$ かつ微分可能です。$\log\Phi_N$ を取ると、$E$ 依存は $\alpha\log E$、$V$ 依存は $N\log V$ のみなので、

$$
\partial_E S_{\mathrm{vol}}
=k_{\mathrm B}\frac\alpha E,\qquad
\partial_V S_{\mathrm{vol}}
=k_{\mathrm B}\frac NV.
$$

第一式が $1/T_{\mathrm{vol}}$、第二式が $P_{\mathrm{vol}}/T_{\mathrm{vol}}$ という定義に一致するので、各式を整理すれば残る二式です。最後に $\partial_E(E^\alpha)=\alpha E^{\alpha-1}$ から殻の密度を得ます。
<!-- proof-end -->

## 5. 「アンサンブルが同値」と言える範囲

温度を固定した正準系ではエネルギーが揺らぎます。一方、微正準側では $E$ を指定します。では「両者は同じ」と言えるのでしょうか。比較すべきなのは**熱力学極限の温度・圧力・一粒子当たりのエントロピー**であり、粒子一つ一つの確率分布を有限系で等号にすることではありません。

まず[正準分配関数](#prop-sm5-partition)をエネルギーの積分に書き換えます。$\alpha=3N/2$、$\beta>0$ とすると $\partial_E\Phi_N=C_N\alpha E^{\alpha-1}$ です。ただし $C_N=V^N(2\pi m)^\alpha/[N!h^{3N}\Gamma(\alpha+1)]$ と置きました。

<a id="thm-sm5-energy-concentration"></a>

<!-- formal-statement-start -->
> **定理（正準エネルギーの分布と集中）**  
> [古典理想気体](#def-sm5-phase-gas)の正準確率を $N\ge1$、$V,T>0$ で取る。全運動エネルギー $H_N$ は、$\alpha=3N/2$、$\beta=1/(k_{\mathrm B}T)$ を用いてGamma密度

$$
f_{H_N}(E)=\frac{\beta^\alpha}{\Gamma(\alpha)}
E^{\alpha-1}e^{-\beta E}\quad(E>0)
$$

> を持ち、平均・分散は

$$
\mathbb E[H_N]=\frac{\alpha}{\beta},
\qquad
\operatorname{Var}(H_N)=\frac{\alpha}{\beta^2}.
$$

> $N\to\infty$、$T$ 固定では、任意の $\varepsilon>0$ に対して

$$
P\left(\left|\frac{H_N}{N}-\frac32k_{\mathrm B}T\right|
\ge\varepsilon\right)
\le\frac{3(k_{\mathrm B}T)^2}{2N\varepsilon^2}
\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi_N$ を微分したエネルギー殻の密度へBoltzmann因子を掛けて正規化します。Gamma積分の一階・二階の比から平均と分散を再計算し、最後は[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を適用します。

<!-- proof-start -->
### 証明

微正準側の[相空間体積](#prop-sm5-phase-volume)を $C_NE^\alpha$ と書き、その微分を使うと、エネルギーが $(E,E+dE)$ に入る正準確率密度は

$$
\frac{e^{-\beta E}}{Z_N}\frac{\partial\Phi_N}{\partial E}
=\frac{C_N\alpha}{Z_N}E^{\alpha-1}e^{-\beta E}.
$$

Gamma関数の定義と $t=\beta E$ の代入により

$$
\int_0^\infty E^{\alpha-1}e^{-\beta E}\,dE
=\frac{\Gamma(\alpha)}{\beta^\alpha}.
$$

したがって正規化係数は

$
Z_N=C_N\alpha\Gamma(\alpha)\beta^{-\alpha}
=C_N\Gamma(\alpha+1)\beta^{-\alpha}.
$

上の確率密度の係数へ戻すと $\beta^\alpha/\Gamma(\alpha)$ となります。第一・二モーメントも同じ置換から

$$
\mathbb E[H_N]
=\frac{\Gamma(\alpha+1)}{\beta\Gamma(\alpha)}
=\frac{\alpha}{\beta},
$$

$$
\mathbb E[H_N^2]
=\frac{\Gamma(\alpha+2)}{\beta^2\Gamma(\alpha)}
=\frac{\alpha(\alpha+1)}{\beta^2}.
$$

両式の差を取って

$$
\operatorname{Var}(H_N)
=\frac{\alpha(\alpha+1)-\alpha^2}{\beta^2}
=\frac{\alpha}{\beta^2}.
$$

よって $H_N/N$ の分散は $\alpha/(N^2\beta^2)=3(k_{\mathrm B}T)^2/(2N)$ です。[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を $H_N/N$ に適用すれば表示した上界となります。
<!-- proof-end -->

<a id="thm-sm5-ensemble-equivalence"></a>

<!-- formal-statement-start -->
> **定理（古典理想気体の熱力学量の同値性）**  
> 密度 $\rho>0$ と温度 $T>0$ を固定し、$V_N=N/\rho$、$E_N=(3/2)Nk_{\mathrm B}T$ とする。$N\to\infty$ では、[累積体積エントロピー](#def-sm5-phase-volume)と正準エントロピーの一粒子当たりの値は同じ極限を持つ：

$$
\lim_{N\to\infty}
\frac{S_{\mathrm{vol}}(E_N,V_N,N)}{Nk_{\mathrm B}}
=
\lim_{N\to\infty}
\frac{S(T,V_N,N)}{Nk_{\mathrm B}}
=\log\frac1{\rho\lambda_T^3}+\frac52.
$$

> また、$T_{\mathrm{vol}}(E_N,V_N,N)=T$、$P_{\mathrm{vol}}=P=\rho k_{\mathrm B}T$ は各 $N$ ですでに一致し、正準系のエネルギー密度は[確率収束](../../../解析系/F0/F0-00P4/index.md#def-f0-00p4-probability-convergence)する。ただし微正準エネルギー固定の分布と正準分布の**すべての事象についての確率差の上限が0へ収束する**という主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

圧力と温度は前二節で求めた式へ同じ $E_N,V_N$ を入れます。エントロピーは $\log N!$ と $\log\Gamma(3N/2+1)$ の両方にStirling近似を使い、主要項が一致することを示します。

<!-- proof-start -->
### 証明

[微正準型の式](#prop-sm5-phase-volume)に $E=E_N$ を入れると

$$
k_{\mathrm B}T_{\mathrm{vol}}=\frac{E_N}{3N/2}=k_{\mathrm B}T,
\qquad
P_{\mathrm{vol}}=\frac{Nk_{\mathrm B}T}{V_N}=\rho k_{\mathrm B}T.
$$

[正準の状態方程式](#thm-sm5-ideal-thermodynamics)でも $P=Nk_{\mathrm B}T/V_N$ です。エントロピーについて、$\alpha=3N/2$ を使って

$$
\frac{S_{\mathrm{vol}}}{k_{\mathrm B}}
=N\log V_N-\log N!-3N\log h
+\alpha\log(2\pi mE_N)-\log\Gamma(\alpha+1).
$$

[対数Gamma関数の漸近評価](#lem-sm5-log-gamma)を $N$ および $\alpha$ に適用すると

$$
\log N!=N\log N-N+O(\log N),
\qquad
\log\Gamma(\alpha+1)=\alpha\log\alpha-\alpha+O(\log\alpha).
$$

これらを代入して、$E_N/\alpha=k_{\mathrm B}T$ に注意すると

$$
\begin{aligned}
\frac{S_{\mathrm{vol}}}{Nk_{\mathrm B}}
&=\log\frac{V_N}{N}
+\frac32\log\frac{2\pi mE_N}{\alpha h^2}
+1+\frac32
+O\left(\frac{\log N}{N}\right)\\
&=\log\frac{V_N}{N}
+\frac32\log\frac{2\pi mk_{\mathrm B}T}{h^2}
+\frac52+O\left(\frac{\log N}{N}\right)\\
&=\log\frac1{\rho\lambda_T^3}+\frac52
+O\left(\frac{\log N}{N}\right).
\end{aligned}
$$

正準エントロピーも[前節のSackur–Tetrode極限](#thm-sm5-ideal-thermodynamics)から同じ値へ収束します。エネルギーの確率収束は[集中定理](#thm-sm5-energy-concentration)の最後の式によります。

最後の留保を具体的に確認します。連続相空間上の厳密なエネルギー面 $\{H_N=E_N\}$ はLebesgue測度0であるため、正準分布ではこの事象の確率が0です。これに対しエネルギー面に支持される微正準測度では確率1です。従って、すべての事象 $A$ にわたる確率差の上限 $\sup_A|P_{\mathrm{micro}}(A)-P_{\mathrm{canon}}(A)|$ は、このエネルギー面を選ぶと差が1になり、上限も1です。熱力学量の一致だけから確率測度がすべての事象で一様に近づくとは導けません。
<!-- proof-end -->

正準のエネルギーは $O(N)$、その標準偏差は $O(\sqrt N)$ なので、**相対的な揺らぎが小さくなる**のが本章の同値性の基礎です。この結論は理想気体の明示計算に依存します。相互作用系、非凹なエントロピー、長距離相互作用などで一般に同じ同値性が成り立つと主張しているわけではありません。

## 6. 大正準系から見た密度の集中

粒子数が可変であるときも、独立な理想気体ならすべての $Z_n$ を足せます。ここでは $n=0$ の空配置を含め、$Z_0=1$ とします。$V,T>0$ を固定し、粒子数は $n=0,1,2,\ldots$ に広がるため、[SM4の有限集合上の大正準定義](../SM4/index.md#def-sm4-grand-ensemble)を収束する無限級数へ拡張することを明示します。

<a id="prop-sm5-grand-poisson"></a>

<!-- formal-statement-start -->
> **命題（古典理想気体の大分配関数とPoisson粒子数）**  
> $V,T>0$、$\mu\in\mathbb R$、$z=e^{\beta\mu}>0$ を取り、すべての $n\ge0$ に[古典理想気体の正準分配関数](#prop-sm5-partition)を適用する。$a=zV/\lambda_T^3$ とすると、大分配関数は絶対収束して

$$
\Xi=\sum_{n=0}^{\infty}z^nZ_n=e^a,
\qquad
P(N=n)=e^{-a}\frac{a^n}{n!}.
$$

> 粒子数の平均・分散はともに $a$。さらに $z=\rho\lambda_T^3$、$V\to\infty$ として密度 $\rho>0$ と温度を固定すれば

$$
\mathbb E\left[\frac NV\right]=\rho,\quad
\operatorname{Var}\left(\frac NV\right)=\frac{\rho}{V}\to0,\quad
-\frac{k_{\mathrm B}T}{V}\log\Xi=-\rho k_{\mathrm B}T.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$n!$ が分母にあるため、大分配関数は指数関数のTaylor級数となります。粒子数分布はPoisson分布で、平均と分散を級数の添字のずらしで直接求めます。

<!-- proof-start -->
### 証明

$a=zV/\lambda_T^3>0$ を置くと、[正準分配関数](#prop-sm5-partition)から

$$
\Xi=\sum_{n=0}^\infty z^n\frac{(V/\lambda_T^3)^n}{n!}
=\sum_{n=0}^\infty\frac{a^n}{n!}=e^a<\infty.
$$

全項は非負なので確率は $\Xi^{-1}a^n/n!=e^{-a}a^n/n!$ で、総和1です。$n/n!=1/(n-1)!$、$n(n-1)/n!=1/(n-2)!$ を使うと

$$
\begin{aligned}
\mathbb E[N]
&=e^{-a}\sum_{n=1}^\infty\frac{na^n}{n!}
=e^{-a}a\sum_{j=0}^\infty\frac{a^j}{j!}=a,\\
\mathbb E[N(N-1)]
&=e^{-a}a^2\sum_{j=0}^\infty\frac{a^j}{j!}=a^2.
\end{aligned}
$$

$N^2=N(N-1)+N$ なので $\operatorname{Var}(N)=a^2+a-a^2=a$。$z=\rho\lambda_T^3$ なら $a=\rho V$ であり、$\mathbb E[N/V]=a/V=\rho$、分散は $a/V^2=\rho/V$ です。最後の式は $\log\Xi=a$ の代入です。
<!-- proof-end -->

$N/V$ は[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)により $\rho$ へ確率収束します。一方、固定 $N$ の正準模型で $V=N/\rho$ としたときと、大正準模型で $z=\rho\lambda_T^3$ としたときの巨視的圧力は、どちらも $\rho k_{\mathrm B}T$ です。ただし粒子数の分布は当然同一ではありません。

## 7. 演習：積分から極限まで検算する

### Level A：定義・規格化・単位

#### A1. 熱的波長の温度依存

$m,h,k_{\mathrm B}$ を正の定数とし、温度 $T>0$ の $\lambda_T$ を定義せよ。温度を $4T$ としたときの比 $\lambda_{4T}/\lambda_T$ を求め、$\rho\lambda_T^3$ が無次元であることを確認せよ。

- Level: A
- ID: SM5-A1

<!-- solution-start -->
**詳細解答**

[古典理想気体の正準分配関数](#prop-sm5-partition)で使う熱的波長より

$$
\lambda_T=\frac h{\sqrt{2\pi mk_{\mathrm B}T}},
\qquad
\frac{\lambda_{4T}}{\lambda_T}
=\sqrt{\frac{T}{4T}}=\frac12.
$$

$h$ の単位は $\mathrm{kg\,m^2/s}$、$mk_{\mathrm B}T$ の平方根は $\mathrm{kg\,m/s}$ なので $\lambda_T$ はメートルです。密度 $\rho$ は粒子数を体積で割ったもので $\mathrm{m}^{-3}$、従って $\rho\lambda_T^3$ は無次元です。
<!-- solution-end -->

#### A2. 速度成分の二乗平均

密度 $f(v)=\sqrt{a/\pi}e^{-av^2}$（$v\in\mathbb R$、$a>0$）について、規格化と平均・分散を求めよ。$a=m/(2k_{\mathrm B}T)$ とした値も求めよ。

- Level: A
- ID: SM5-A2

<!-- solution-start -->
**詳細解答**

[Gaussian積分の導出](#prop-sm5-partition)から $\int e^{-av^2}dv=\sqrt{\pi/a}$ なので

$$
\int_{\mathbb R}f(v)\,dv
=\sqrt{\frac a\pi}\sqrt{\frac\pi a}=1.
$$

被積分関数 $vf(v)$ は奇関数なので平均は0です。[二乗積分の計算](#prop-sm5-maxwell)を適用すると

$$
\mathbb E[v^2]
=\sqrt{\frac a\pi}\frac{\sqrt\pi}{2a^{3/2}}
=\frac1{2a}.
$$

従って分散も $1/(2a)$、指定された $a=m/(2k_{\mathrm B}T)$ なら $k_{\mathrm B}T/m$ です。
<!-- solution-end -->

#### A3. 一粒子の圧力とエネルギー

$N=1$ の理想気体について $Z_1$ を求め、$\partial_\beta\log Z_1$ と $\partial_V\log Z_1$ から内部エネルギーと圧力を求めよ。

- Level: A
- ID: SM5-A3

<!-- solution-start -->
**詳細解答**

[正準分配関数](#prop-sm5-partition)で $N!=1$ とすると

$$
Z_1=\frac V{h^3}\left(\frac{2\pi m}{\beta}\right)^{3/2}.
$$

対数を取れば

$$
\log Z_1=\log V-3\log h
+\frac32\log(2\pi m)-\frac32\log\beta.
$$

従って $\partial_\beta\log Z_1=-3/(2\beta)$、$\partial_V\log Z_1=1/V$。内部エネルギーは $U=-\partial_\beta\log Z_1=3k_{\mathrm B}T/2$、圧力は

$$
P=k_{\mathrm B}T\partial_V\log Z_1=\frac{k_{\mathrm B}T}{V}.
$$

容積微分は $T$ を固定して行いました。
<!-- solution-end -->

#### A4. 二粒子のラベル補正

同種粒子二個の古典理想気体で、ラベル付きの相空間積分と $1/2!$ 補正後の $Z_2$ を比較せよ。また同じ $T,V$ における自由エネルギーの差を求めよ。

- Level: A
- ID: SM5-A4

<!-- solution-start -->
**詳細解答**　$x=V/\lambda_T^3>0$ と置きます。[分配関数の積分](#prop-sm5-partition)では、ラベルを区別した積分値は $x^2$、定義に従って $2!=2$ で割った値は

$$
Z_2=\frac{x^2}{2}.
$$

$F=-k_{\mathrm B}T\log Z$ とすると、ラベル付きの $F_{\mathrm{lab}}=-2k_{\mathrm B}T\log x$ に対して

$$
F_2=-k_{\mathrm B}T(2\log x-\log2)
=F_{\mathrm{lab}}+k_{\mathrm B}T\log2.
$$

固定粒子数での規格化確率は共通係数が相殺されますが、自由エネルギーは変化します。
<!-- solution-end -->

#### A5. $N=2$ の相空間体積

$N=2$、$E,V>0$ とし、$\Phi_2(E,V)$ を求めよ。$E$ の対数微分から $T_{\mathrm{vol}}$ を求めよ。

- Level: A
- ID: SM5-A5

<!-- solution-start -->
**詳細解答**

[累積相空間体積の公式](#prop-sm5-phase-volume)で $\alpha=3N/2=3$、$2!=2$、$\Gamma(4)=3!=6$ なので

$$
\Phi_2(E,V)
=\frac{V^2}{2h^6}\frac{(2\pi mE)^3}{6}
=\frac{V^2(2\pi mE)^3}{12h^6}.
$$

この式の $E$ に依存する部分は $E^3$ なので

$$
\partial_E\log\Phi_2=\frac3E
=\frac1{k_{\mathrm B}T_{\mathrm{vol}}},
\qquad
T_{\mathrm{vol}}=\frac E{3k_{\mathrm B}}.
$$

$\Phi_2>0$ のため対数が定義できます。
<!-- solution-end -->

### Level B：分布・漸近・仮定

#### B1. 固定密度でのエントロピー

$V_N=N/\rho$、$T,\rho>0$ 一定とする。厳密な正準エントロピーを $N$ で割り、$\log N!=N\log N-N+O(\log N)$ を使って熱力学極限を求めよ。$N!$ を除いたとき何が壊れるかも述べよ。

- Level: B
- ID: SM5-B1

<!-- solution-start -->
**詳細解答**

[古典理想気体の正準熱力学](#thm-sm5-ideal-thermodynamics)から

$$
\frac{S_N}{Nk_{\mathrm B}}
=\log\frac{V_N}{\lambda_T^3}
-\frac{\log N!}{N}+\frac32.
$$

[対数Gamma関数の漸近補題](#lem-sm5-log-gamma)を明示的に代入すると

$$
\begin{aligned}
\frac{S_N}{Nk_{\mathrm B}}
&=\log\frac{N}{\rho\lambda_T^3}
-\log N+1+\frac32
+O\left(\frac{\log N}{N}\right)\\
&=\log\frac1{\rho\lambda_T^3}+\frac52
+O\left(\frac{\log N}{N}\right).
\end{aligned}
$$

$N!$ を省くと第二項の $-\log N$ がなくなるため、$\log N$ の発散が残ります。密度一定で一粒子当たりのエントロピーが有限になりません。
<!-- solution-end -->

#### B2. 揺らぎの定量評価

$T>0$ の理想気体正準系で、$\delta>0$ として

$$
P\left(\left|\frac{H_N}{\mathbb E H_N}-1\right|\ge\delta\right)
$$

のChebyshev上界を $N,\delta$ で表せ。$N$ が大きいことだけですべての事象についての確率差の上限が小さいと結論してよいかも答えよ。

- Level: B
- ID: SM5-B2

<!-- solution-start -->
**詳細解答**

[正準エネルギーの分布と集中](#thm-sm5-energy-concentration)から、$\alpha=3N/2$ とすれば

$$
\mathbb EH_N=\frac\alpha\beta,\quad
\operatorname{Var}(H_N)=\frac\alpha{\beta^2}.
$$

従って相対分散は

$$
\frac{\operatorname{Var}(H_N)}{(\mathbb EH_N)^2}
=\frac{\alpha/\beta^2}{\alpha^2/\beta^2}
=\frac1\alpha=\frac{2}{3N}.
$$

[Chebyshevの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)は指定した事象の確率を $2/(3N\delta^2)$ 以下と評価します。ただし厳密なエネルギー面は正準分布では確率0、面上の微正準分布では確率1です。集中は測度全体のすべての事象について確率差が一様に消えることを意味しません。
<!-- solution-end -->

#### B3. 大正準理想気体の粒子数

$z>0$、$V,T>0$ とし、$a=zV/\lambda_T^3$ である。大分配関数を級数から計算し、$\mathbb E[N(N-1)]$ と $\operatorname{Var}(N/V)$ を求めよ。$z=\rho\lambda_T^3$ の極限も述べよ。

- Level: B
- ID: SM5-B3

<!-- solution-start -->
**詳細解答**

[Poisson粒子数の命題](#prop-sm5-grand-poisson)の定義を展開すると

$$
\Xi=\sum_{n=0}^\infty\frac{a^n}{n!}=e^a,\qquad
P(N=n)=e^{-a}\frac{a^n}{n!}.
$$

二階階乗モーメントは

$$
\begin{aligned}
\mathbb E[N(N-1)]
&=e^{-a}\sum_{n=2}^\infty\frac{n(n-1)a^n}{n!}\\
&=a^2e^{-a}\sum_{j=0}^\infty\frac{a^j}{j!}=a^2.
\end{aligned}
$$

一階モーメントは同じ添字ずらしから $\mathbb E N=a$ です。$N^2=N(N-1)+N$ なので分散は $a$、従って

$$
\operatorname{Var}(N/V)=\frac a{V^2}=\frac{z}{V\lambda_T^3}.
$$

$z=\rho\lambda_T^3$ を固定すると上式は $\rho/V\to0$ です。
<!-- solution-end -->

#### B4. 相空間の規約を変えると何が変わるか

相空間のセル定数を $h'=ch$（$c>0$）へ変える。$N,V,T$ と力学を固定し、$Z_N'$、$F_N'-F_N$、$S_N'-S_N$、$P_N'-P_N$ を求めよ。

- Level: B
- ID: SM5-B4

<!-- solution-start -->
**詳細解答**

[古典理想気体の正準分配関数](#prop-sm5-partition)で使う熱的波長から $\lambda_T'=c\lambda_T$。従って

$$
Z_N'=\frac1{N!}\left(\frac{V}{c^3\lambda_T^3}\right)^N
=c^{-3N}Z_N.
$$

$F=-k_{\mathrm B}T\log Z_N$ を使えば

$$
F_N'-F_N
=-k_{\mathrm B}T\log(c^{-3N})
=3Nk_{\mathrm B}T\log c.
$$

この追加項を $T$ で微分すると

$$
S_N'-S_N=-3Nk_{\mathrm B}\log c.
$$

追加項には $V$ が入らないので $P_N'-P_N=-\partial_V(F_N'-F_N)=0$ です。力学の予測と状態数の原点規約の役割が異なることを確かめられます。
<!-- solution-end -->

#### B5. 最確速さと平均二乗速さ

[Maxwell–Boltzmann速さの密度](#prop-sm5-maxwell)の最大点 $r_*$ を求め、$\mathbb E[|\boldsymbol v|^2]$ と比較せよ。$m,T>0$ とする。

- Level: B
- ID: SM5-B5

<!-- solution-start -->
**詳細解答**　速さ密度は $g_T(r)=Cr^2e^{-ar^2}$（$r\ge0$、$C>0$、$a=m/(2k_{\mathrm B}T)>0$）です。$r>0$ では

$$
\frac{d}{dr}\log g_T(r)
=\frac2r-2ar.
$$

停留条件は $r^2=1/a=2k_{\mathrm B}T/m$、従って $r_*=\sqrt{2k_{\mathrm B}T/m}$ です。$r\downarrow0$ と $r\to\infty$ で $g_T(r)\to0$、また対数微分は $r<r_*$ で正、$r>r_*$ で負なので、これが唯一の最大点です。一方、速度三成分の二乗平均を加算すると

$$
\mathbb E[|\boldsymbol v|^2]
=\sum_{j=1}^3\mathbb E[v_j^2]
=3\frac{k_{\mathrm B}T}{m},
$$

従って二乗平均平方根は $\sqrt{3k_{\mathrm B}T/m}$ であり $r_*$ より大きい値です。
<!-- solution-end -->

### Level C：三つのアンサンブルを接続する

#### C1. 固定密度の古典理想気体

$T,\rho,m,h,k_{\mathrm B}>0$ を固定し、$V_N=N/\rho$ の理想気体を考える。$\lambda_T$ は本章の定義による。

1. 正準系の $Z_N$ と $U_N,P_N,S_N$ を求めよ。
2. $E_N=(3/2)Nk_{\mathrm B}T$ として $\Phi_N(E_N,V_N)$ を求め、微正準型の温度と圧力を求めよ。
3. $\log\Gamma(x+1)=x\log x-x+O(\log x)$ を使い、二つのエントロピーの一粒子当たりの極限を比較せよ。
4. 同じ $T,\rho$ を持つ大正準系の $z$ を選び、粒子数密度の平均・分散と大熱力学ポテンシャル密度を求めよ。
5. 上の一致から、三つのアンサンブルの相空間確率分布自体が有限 $N$ で等しいと結論できるか。理由を挙げよ。

- Level: C
- ID: SM5-C1

<!-- solution-start -->
**詳細解答**

**(1)**　[正準分配関数](#prop-sm5-partition)より

$$
Z_N=\frac1{N!}\left(\frac{N}{\rho\lambda_T^3}\right)^N.
$$

[正準熱力学の定理](#thm-sm5-ideal-thermodynamics)を $V_N=N/\rho$ に適用すると

$$
U_N=\frac32Nk_{\mathrm B}T,\qquad
P_N=\frac{Nk_{\mathrm B}T}{N/\rho}=\rho k_{\mathrm B}T,
$$

$$
S_N=k_{\mathrm B}\left[
N\log\frac{N}{\rho\lambda_T^3}
-\log N!+\frac32N\right].
$$

**(2)**　$\alpha=3N/2$ を置きます。[累積相空間体積](#prop-sm5-phase-volume)に $E_N=\alpha k_{\mathrm B}T$ を代入して

$$
\Phi_N(E_N,V_N)=
\frac{(N/\rho)^N}{N!h^{3N}}\,
\frac{(2\pi m\alpha k_{\mathrm B}T)^\alpha}
{\Gamma(\alpha+1)}.
$$

$\partial_E\log\Phi_N=\alpha/E$、$\partial_V\log\Phi_N=N/V$ のため

$$
T_{\mathrm{vol}}=\frac{E_N}{\alpha k_{\mathrm B}}=T,\qquad
P_{\mathrm{vol}}=\frac{Nk_{\mathrm B}T}{V_N}
=\rho k_{\mathrm B}T.
$$

**(3)**　正準側では

$$
\frac{S_N}{Nk_{\mathrm B}}
=\log\frac1{\rho\lambda_T^3}+\frac52
+O\left(\frac{\log N}{N}\right).
$$

微正準側は $\log\Phi_N$ に対して、[対数Gamma関数の漸近補題](#lem-sm5-log-gamma)を $N!$ と $\Gamma(\alpha+1)$ の両方へ適用します。$\alpha=3N/2$ と $E_N/\alpha=k_{\mathrm B}T$ により

$$
\begin{aligned}
\frac{\log\Phi_N}{N}
&=\log\frac{V_N}{N}
+\frac{\alpha}{N}\log\frac{2\pi mE_N}{\alpha h^2}
+1+\frac{\alpha}{N}
+O\left(\frac{\log N}{N}\right)\\
&=\log\frac1{\rho}
+\frac32\log\frac{2\pi mk_{\mathrm B}T}{h^2}
+\frac52+O\left(\frac{\log N}{N}\right)\\
&=\log\frac1{\rho\lambda_T^3}
+\frac52+O\left(\frac{\log N}{N}\right).
\end{aligned}
$$

従って両方の極限は同一です。極限操作が必要なのはエントロピーの一致であって、圧力・温度の一致はこの模型では各 $N$ で成り立っています。

**(4)**　[大正準のPoisson粒子数](#prop-sm5-grand-poisson)で平均粒子数を $\rho V$ に合わせるには

$$
a=\frac{zV}{\lambda_T^3}=\rho V,
\qquad z=\rho\lambda_T^3
$$

と選べばよいです。従って

$$
\mathbb E[N/V]=\rho,\qquad
\operatorname{Var}(N/V)=\frac{\rho}{V}\to0.
$$

$\Xi=e^{\rho V}$ なので大熱力学ポテンシャル密度は

$$
-\frac{k_{\mathrm B}T}{V}\log\Xi
=-\rho k_{\mathrm B}T=-P_N.
$$

**(5)**　結論できません。正準では $N$ が固定されるのに対し大正準ではPoisson分布に従って変動します。またエネルギー面に正確に固定された微正準分布は、連続相空間の正準分布と同じ確率測度にはなりません。[同値性定理](#thm-sm5-ensemble-equivalence)が述べるのは、指定した巨視的熱力学量と集中の極限の一致です。相互作用のある一般系への外挿にも追加の仮定が必要です。
<!-- solution-end -->

## 8. 次章へつながる結論

古典理想気体では、相空間積分の規約を一度指定すると、分配関数から速度分布・状態方程式・熱力学関数を手計算で導けます。累積相空間体積からは微正準型の温度と圧力が計算でき、熱力学極限ではエントロピーも一致します。粒子数可変の理想気体ではPoisson揺らぎが相対的に小さくなります。

この結果が成立するには、非相互作用、正の温度、固定密度、古典的な希薄条件、そして比較する観測量の指定が必要です。次のSM6では $\rho\lambda_T^3$ が小さいという条件を外し、Bose–Einstein統計とFermi–Dirac統計へ進みます。
