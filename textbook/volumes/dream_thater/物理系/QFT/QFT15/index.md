# QFT15 Maxwell場の作用・ゲージ冗長性と二つの物理偏極

[SREL5の電磁場テンソル](../../SREL/SREL5/index.md#def-srel5-field-tensor)と[Maxwell方程式の共変形式](../../SREL/SREL5/index.md#thm-srel5-inhomogeneous-maxwell)により、電場と磁場を一つの反対称テンソルで表せるようになりました。[EMAG8の横波性](../../EMAG/EMAG8/index.md#prop-emag8-transverse)からは、真空中の平面電磁波の電場と磁場が進行方向に垂直であることも分かっています。

しかし、場を量子化するときに使う四元ポテンシャルには**四つの成分**があります。光が持つ独立な偏極が二つなのに、なぜ四成分の場を出発点にするのでしょうか。このずれを放置して各成分を独立に振動子へ変えては、時間的・縦方向の余分な状態まで物理粒子に数えてしまいます。

この講義では、ポテンシャルからMaxwell作用を作り、場の方程式とゲージ変換を導きます。次にGauss則が初期値を制限することを示し、最後に光的な平面波の二つの物理偏極を具体的に取り出します。量子光子の伝播関数とゲージ固定の量子論は、この古典的な自由度の区別を理解した上で扱います。

## 1. 電場・磁場を四元ポテンシャルから作る

時空は平坦な $3+1$ 次元Minkowski空間とし、座標を $x^\mu=(t,x^1,x^2,x^3)$、計量を $\eta=\operatorname{diag}(1,-1,-1,-1)$ とします。$c=\hbar=1$ の自然単位系と、電磁気の結合定数を場の規格化へ吸収したHeaviside–Lorentz単位系を使います。従ってこの章では $\partial_\mu F^{\mu\nu}=J^\nu$ であり、SI単位系の[SREL5の式](../../SREL/SREL5/index.md#thm-srel5-inhomogeneous-maxwell)にある $\mu_0$ は現れません。添字は $\mu,\nu=0,1,2,3$、空間添字は $i,j,k=1,2,3$、上下で反復した添字は和を表します。

電場 $\boldsymbol E$ と磁場 $\boldsymbol B$ を一つの未知量で表すには、実数値の時間成分 $\Phi$ と三成分のベクトルポテンシャル $\boldsymbol A$ が便利です。$\Phi$ は静電場を、$\boldsymbol A$ は磁場や時間変化する電場を作ります。成分を $A^\mu=(\Phi,A^1,A^2,A^3)$ と置くと、下付き成分は $A_\mu=(\Phi,-A^1,-A^2,-A^3)$ です。偏微分の添字を下げた $\partial_\mu=\partial/\partial x^\mu$ と、上げた $\partial^\mu=\eta^{\mu\nu}\partial_\nu$ を区別します。

<a id="def-qft15-potential-field"></a>

<!-- formal-statement-start -->
> **定義（四元ポテンシャルによる電磁場の表示）**  
> Minkowski時空の開集合 $\Omega$ 上の実数値 $C^2$ 四元ベクトル場 $A^\mu$ に対し、反対称な場の強さと電場・磁場を次の式で定める。空間の完全反対称記号は $\epsilon_{123}=+1$ とする。

$$
\begin{aligned}
F_{\mu\nu}&=\partial_\mu A_\nu-\partial_\nu A_\mu,\\
E_i&=F_{0i}=-\partial_t A^i-\partial_i\Phi,\\
B_i&=-\frac12\epsilon_{ijk}F_{jk}
= (\nabla\times\boldsymbol A)_i.
\end{aligned}
$$

> $F^{\mu\nu}=\eta^{\mu\alpha}\eta^{\nu\beta}F_{\alpha\beta}$ とし、$F_{\mu\nu}$ は既習の電磁場テンソルと同じ量を表す。
<!-- formal-statement-end -->

なぜこの導関数の差を使うのでしょうか。$A_\mu$ の微分には16成分ありますが、反対称な差を取れば $F_{\mu\nu}=-F_{\nu\mu}$ となり独立成分は6個です。このうち $F_{0i}=E_i$ は3個、$F_{ij}=-\epsilon_{ijk}B_k$ が残る3個で、[SREL5のテンソル成分](../../SREL/SREL5/index.md#def-srel5-field-tensor)と一致します。

<!-- definition-example-start: def-qft15-potential-field -->
### 例：一様磁場をポテンシャルから確認する

**定義の確認**：ポテンシャルの正則性、反対称な $F$ の成分と電場・磁場の対応を検査します。

$\Phi=0$、$\boldsymbol A=(0,B_0x^1,0)$、実定数 $B_0$ とします。このポテンシャルは全時空で実数値かつ滑らかです。$\partial_1A_2=-B_0$、$\partial_2A_1=0$ だから $F_{12}=-B_0$、$F_{21}=B_0$ です。他の空間成分と $F_{0i}$ は零になります。従って

$$
\boldsymbol E=0,\qquad
\boldsymbol B=(0,0,B_0),\qquad F_{\mu\nu}=-F_{\nu\mu}.
$$

定義の**正則性・反対称性・六成分から電磁場への対応**を直接検査できました。この例のポテンシャル自身は空間方向に増大するため、後で仮定する無限遠での減衰条件とは区別します。
<!-- definition-example-end -->

### 1.1 ポテンシャルを導入するとMaxwell方程式の半分が恒等式になる

上の表示を $\partial_\lambda F_{\mu\nu}+\partial_\mu F_{\nu\lambda}+\partial_\nu F_{\lambda\mu}$ に代入します。$A$ が $C^2$ なので二階偏微分を交換でき、

$$
\begin{aligned}
&\partial_\lambda\partial_\mu A_\nu-\partial_\lambda\partial_\nu A_\mu
+\partial_\mu\partial_\nu A_\lambda-\partial_\mu\partial_\lambda A_\nu\\
&\qquad+\partial_\nu\partial_\lambda A_\mu-\partial_\nu\partial_\mu A_\lambda=0.
\end{aligned}
$$

これは[斉次Maxwell方程式の巡回微分表示](../../SREL/SREL5/index.md#thm-srel5-homogeneous-maxwell)です。つまりポテンシャルから作った場は、磁束のGauss則とFaraday則を**自動的に**満たします。反対に、単連結性などを考慮せず任意の大域的な電磁場から大域ポテンシャルが存在すると主張するものではありません。ここでは $\mathbb R^{1,3}$ の滑らかな場を主に扱います。

## 2. 同じ電磁場を表す異なるポテンシャル

先ほどの一様磁場は $\boldsymbol A=(-B_0x^2,0,0)$ からも作れます。実際、どちらも $B_3=\partial_1A^2-\partial_2A^1=B_0$ です。観測する電場・磁場が同じなのに、ポテンシャルの成分は違っています。この表現の重複を体系的に扱うのがゲージ変換です。

滑らかな実数値関数 $\chi$ を使い、ポテンシャルにその勾配を足すことを考えます。$\chi$ の意味は、電磁場を変えずに表示を取り替えるための任意関数です。$U(1)$ という名前は、電荷 $q$ の複素場に掛ける位相 $e^{iq\chi(x)}$ が絶対値1であることから来ます。ここでは位相を持つ物質場の結合ではなく、平坦時空の電磁ポテンシャル側だけを扱います。[QFT2の大域$U(1)$対称性](../QFT2/index.md#prop-qft2-u1)と異なり、$\chi$ は時空点ごとに変えて構いません。

<a id="def-qft15-gauge"></a>

<!-- formal-statement-start -->
> **定義（局所ゲージ変換とゲージ同値性）**  
> Minkowski時空の開集合 $\Omega$ 上で $A_\mu\in C^2(\Omega)$ と実関数 $\chi\in C^3(\Omega)$ を取る。ポテンシャルの変換と、二つのポテンシャルが同値である条件を

$$
A'_\mu=A_\mu+\partial_\mu\chi,
\qquad A\sim A'\ \Longleftrightarrow\ A'-A=d\chi
$$

> と定める。ただし同値性の右辺は、条件を満たす滑らかな実関数 $\chi$ が少なくとも一つ存在するという意味である。$d\chi$ は成分 $\partial_\mu\chi$ を持つ勾配の略記である。同値であるポテンシャルを同一の電磁場の異なるゲージ表示として扱う。
<!-- formal-statement-end -->

座標成分では $\Phi'=\Phi+\partial_t\chi$、$\boldsymbol A'=\boldsymbol A-\nabla\chi$ です。物理でよく使う $\boldsymbol A\mapsto\boldsymbol A+\nabla\lambda$、$\Phi\mapsto\Phi-\partial_t\lambda$ は $\lambda=-\chi$ と置いた同じ変換です。

<!-- definition-example-start: def-qft15-gauge -->
### 例：一様磁場の二つの表示を結ぶ

**定義の確認**：変換関数の正則性、ゲージ同値の式、電磁場の一致を別々に確かめます。

第1節の $A_\mu=(0,0,-B_0x^1,0)$ に $\chi=B_0x^1x^2$ を加えます。$\partial_1\chi=B_0x^2$、$\partial_2\chi=B_0x^1$ なので

$$
A'_\mu=(0,B_0x^2,0,0),\qquad
\boldsymbol A'=(-B_0x^2,0,0).
$$

$\chi$ は実数値で滑らか、$A'-A=d\chi$ なのでゲージ同値です。一方、$B'_3=\partial_1A'^2-\partial_2A'^1=0-(-B_0)=B_0$、$E'_i=0$ です。**同値条件と観測場の一致**を両方確かめました。この $\chi$ は無限遠で消えないので、境界条件を固定する場の変分にそのまま用いるとは限りません。
<!-- definition-example-end -->

<a id="prop-qft15-gauge-invariance"></a>

<!-- formal-statement-start -->
> **命題（場の強さと斉次Maxwell方程式のゲージ不変性）**  
> 開集合 $\Omega\subset\mathbb R^{1,3}$ 上の $C^2$ 四元ポテンシャル $A_\mu$ と $C^3$ 実関数 $\chi$ に対し、次のゲージ変換を行う。

$$
A'_\mu=A_\mu+\partial_\mu\chi.
$$

> このとき $F'_{\mu\nu}=F_{\mu\nu}$ であり、電場・磁場および斉次Maxwell方程式は不変である。
<!-- formal-statement-end -->

### 証明の見取り図

差をとると $\partial_\mu\partial_\nu\chi$ が二つの順序で現れます。滑らかな関数ではこれらが一致するため、余計な部分が相殺されます。

<!-- proof-start -->
### 証明

まず[四元ポテンシャルによる電磁場の表示](#def-qft15-potential-field)を展開します。そこへ[局所ゲージ変換とゲージ同値性](#def-qft15-gauge)の変換式を代入すると

$$
\begin{aligned}
F'_{\mu\nu}
&=\partial_\mu(A_\nu+\partial_\nu\chi)
-\partial_\nu(A_\mu+\partial_\mu\chi)\\
&=F_{\mu\nu}
+(\partial_\mu\partial_\nu-\partial_\nu\partial_\mu)\chi
=F_{\mu\nu}.
\end{aligned}
$$

$E_i=F_{0i}$ と $B_i=-\epsilon_{ijk}F_{jk}/2$ の定義から両方の電磁場が不変です。巡回微分条件も同じ $F$ の式なので不変です。
<!-- proof-end -->

ポテンシャルの四成分を全て異なる物理自由度として数えられない理由がここにあります。**異なる関数 $A$ を選んでも同じ $F$ を表せる**からです。ただし「同じ $F$ なら必ず大域的に $d\chi$ だけ異なる」という逆向きの主張には領域の位相や境界の条件が必要です。以後の平面波では局所的・通常の減衰条件の下で計算します。

## 3. Maxwell作用を変分して運動方程式を得る

[QFT1の場の作用と第一変分](../QFT1/index.md#def-qft1-action)を、実スカラー場だけでなく四元ベクトル場へ適用します。反対称テンソルの二乗は、$F_{\mu\nu}F^{\mu\nu}=2(\boldsymbol B^2-\boldsymbol E^2)$ です。実際、$F_{0i}F^{0i}=-E_i^2$ は $0i$ と $i0$ の二つ、$F_{ij}F^{ij}$ は磁場の各独立対を二つずつ数えるので、この係数になります。

<a id="def-qft15-maxwell-action"></a>

<!-- formal-statement-start -->
> **定義（源付きMaxwell作用）**  
> 有界な開領域 $\Omega\subset\mathbb R^{1,3}$、実数値 $C^2$ ポテンシャル $A_\mu$、指定された $C^1$ 四元電流 $J^\mu=(\rho,\boldsymbol j)$ に対し、$F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ とする。積分が存在するとき、作用を

$$
S_\Omega[A]=\int_\Omega\left(-\frac14F_{\mu\nu}F^{\mu\nu}-J^\mu A_\mu\right)d^4x
$$

> と定める。停留性は任意の実数値 $C_c^\infty(\Omega)$ 四元変分 $\delta A_\nu$ に対して第一変分が零であることとする。
<!-- formal-statement-end -->

密度は $\mathcal L=(\boldsymbol E^2-\boldsymbol B^2)/2-\rho\Phi+\boldsymbol j\cdot\boldsymbol A$ です。ここで $J$ は独立に与えられた外部源とし、場 $A$ とともに変分しません。特にこの局所的な変分では境界項がないことが重要です。

<!-- definition-example-start: def-qft15-maxwell-action -->
### 例：静的電場の作用密度

**定義の確認**：四元ポテンシャルと源の正則性、積分の存在、密度の符号を調べます。

$\Omega$ を有界とし、$\Phi=-Ex^1$、$\boldsymbol A=0$、$J=0$ とします。$E$ は一定の実数です。上の定義から $F_{01}=E$、その他の独立成分は零であり、$F_{\mu\nu}F^{\mu\nu}=-2E^2$ です。従って $\mathcal L=E^2/2$、作用は $S_\Omega=E^2\operatorname{Vol}_4(\Omega)/2$ となり、積分は有界領域で有限です。場と源の正則性、積分の存在、作用密度の符号を確認しました。停留性そのものは次の定理で検査します。
<!-- definition-example-end -->

<a id="thm-qft15-euler-maxwell"></a>

<!-- formal-statement-start -->
> **定理（Maxwell作用のEuler–Lagrange方程式）**  
> 上の源付きMaxwell作用で $A_\mu\in C^2(\Omega)$、外部電流 $J^\mu\in C^1(\Omega)$ とし、全てのコンパクト台を持つ滑らかな変分に対して作用が停留すると仮定する。このとき各 $\nu=0,1,2,3$ で

$$
\partial_\mu F^{\mu\nu}=J^\nu.
$$

> 逆にこの四式を満たせば、同じ変分の範囲で作用は停留する。さらに $F=dA$ の定義によって斉次Maxwell方程式も満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ は反対称なので、その変分の二項は同じ寄与へまとめられます。導関数を変分から移す部分積分の符号を確認し、各 $\delta A_\nu$ を独立に選んで方程式を取り出します。

<!-- proof-start -->
### 証明

$\delta F_{\mu\nu}=\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu$ を作用へ代入します。$F^{\mu\nu}=-F^{\nu\mu}$ を使い、第二項のダミー添字を $\mu\leftrightarrow\nu$ と交換すると

$$
\begin{aligned}
\delta S_\Omega
&=\int_\Omega\left[-\frac12F^{\mu\nu}
(\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu)
-J^\nu\delta A_\nu\right]d^4x\\
&=\int_\Omega\left[-F^{\mu\nu}\partial_\mu\delta A_\nu
-J^\nu\delta A_\nu\right]d^4x.
\end{aligned}
$$

$\delta A$ は $\Omega$ の内部に台を持つので、$\partial_\mu(F^{\mu\nu}\delta A_\nu)$ の積分は零です。積の微分を展開して

$$
\delta S_\Omega
=\int_\Omega (\partial_\mu F^{\mu\nu}-J^\nu)\delta A_\nu\,d^4x.
$$

各成分を独立に任意の試験関数とできるため、[QFT1の場のEuler–Lagrange方程式](../QFT1/index.md#thm-qft1-field-el)で用いた変分論法を適用できます。実際、括弧内の連続関数がある点で正なら、近傍でも正となり、その近傍に台を持つ非負で零でない滑らかな変分を選ぶと積分は正となって停留性と矛盾します。負の場合も変分の符号を変えて同じです。従って括弧内は各点で零です。逆向きは被積分関数が零であることから直ちに従います。斉次方程式は第1節の巡回微分の直接計算で従います。
<!-- proof-end -->

ここで運動方程式の四成分を $\boldsymbol E,\boldsymbol B$ に戻して確認しましょう。$F^{i0}=E_i$、$F^{0i}=-E_i$、$F^{ji}=\epsilon_{ijk}B_k$ なので、$\nu=0$ は $\nabla\cdot\boldsymbol E=\rho$、$\nu=i$ は $\nabla\times\boldsymbol B-\partial_t\boldsymbol E=\boldsymbol j$ になります。残る二つのMaxwell方程式は既に $F=dA$ に含まれています。

### 3.1 外部源が保存しない場合に何が破綻するか

ゲージ変換における $F$ の不変性だけなら電流の条件は要りません。しかし作用の源との結合も不変であるには条件が必要です。

<a id="prop-qft15-current-conservation"></a>

<!-- formal-statement-start -->
> **命題（ゲージ不変性と外部電流保存）**  
> $J^\mu\in C^1(\Omega)$ を固定した外部電流とし、$A\mapsto A+\partial\chi$ を $\chi\in C_c^\infty(\Omega)$ によるゲージ変換とする。源付きMaxwell作用が全てのそのような $\chi$ に対して不変であることと、$\partial_\mu J^\mu=0$ は同値である。また $C^2$ の場がMaxwellの運動方程式を満たすなら、この保存則は必要条件である。
<!-- formal-statement-end -->

### 証明の見取り図

場の強さは不変です。外部電流との項だけを部分積分し、任意関数 $\chi$ の係数を見ます。別経路として運動方程式の発散を取り、反対称性と偏微分の交換で零になることを確かめます。

<!-- proof-start -->
### 証明

[ゲージ不変な場の強さ](#prop-qft15-gauge-invariance)から、変化するのは源との結合だけです。境界で零の $\chi$ について

$$
\begin{aligned}
S[A+\partial\chi]-S[A]
&=-\int_\Omega J^\mu\partial_\mu\chi\,d^4x\\
&=\int_\Omega \chi\,\partial_\mu J^\mu\,d^4x.
\end{aligned}
$$

保存則があれば右辺は零です。逆に全 $\chi$ で零なのに、連続関数 $\partial_\mu J^\mu$ がある点で正または負だと仮定すると、符号が一定の小領域に台を持つ非負の試験関数を選んで積分を非零にでき、矛盾します。従って $\partial_\mu J^\mu=0$ です。また[Maxwell作用のEuler–Lagrange方程式](#thm-qft15-euler-maxwell)を微分すると

$$
\partial_\nu J^\nu=\partial_\nu\partial_\mu F^{\mu\nu}
=\frac12\partial_\nu\partial_\mu(F^{\mu\nu}+F^{\nu\mu})=0.
$$

これは[SREL5の電荷保存](../../SREL/SREL5/index.md#thm-srel5-continuity)を作用・ゲージ変換の側から読み直したものです。
<!-- proof-end -->

例えば $J^\mu=(t,0,0,0)$ なら $\partial_\mu J^\mu=1$ です。この源は任意の滑らかな $\chi$ に対して作用を不変にできず、Maxwellの運動方程式の解も持ちません。壊れるのはゲージ場の導関数の計算ではなく、**外部源の保存性**です。

## 4. 時間成分は独立した振動子ではない

スカラー場では時間微分に対応する正準運動量を作れました。電磁場では $\Phi=A^0$ の時間微分が $\mathcal L$ に現れません。この事実が、単純な四つの振動子という数え方を妨げます。

空間を固定時刻の $\mathbb R^3$ とし、無限遠で積分の境界項が消える場、または周期境界条件のもとで零モードを別に扱う場を考えます。正準運動量 $\pi^\mu$ は対応する独立変数 $A_\mu$ ではなく、ここでは $A^0=\Phi$ と $A^i$ の時間微分に対して定めます。

<a id="def-qft15-canonical-momenta"></a>

<!-- formal-statement-start -->
> **定義（Maxwell場の正準運動量と一次拘束）**  
> 源付きMaxwell密度 $\mathcal L=(\boldsymbol E^2-\boldsymbol B^2)/2-\rho\Phi+\boldsymbol j\cdot\boldsymbol A$ について、$\Phi$ と $A^i$ を独立な配置変数とし、各時間微分による偏微分を

$$
\pi_\Phi=\frac{\partial\mathcal L}{\partial(\partial_t\Phi)},
\qquad
\pi_i=\frac{\partial\mathcal L}{\partial(\partial_t A^i)}
$$

> と定める。このモデルでは $\pi_\Phi=0$、$\pi_i=-E_i$ が成り立つ。$\pi_\Phi=0$ は速度に関係なく満たされる一次拘束である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft15-canonical-momenta -->
### 例：時間的なポテンシャルの速度を変えても運動量は変わらない

**定義の確認**：時間的成分と空間的成分について、正準運動量の条件をそれぞれ計算します。

$\Phi=f(t)$、$\boldsymbol A=0$ とします。$f\in C^2$ であれば $\partial_t\Phi=f'(t)$ は任意に変わりますが $\boldsymbol E=-\nabla f(t)=0$、$\boldsymbol B=0$ です。$\mathcal L$ に $\partial_t\Phi$ はないので $\pi_\Phi=0$ のままです。さらに $\pi_i=-E_i=0$ となり、定義にある二種類の運動量を直接確認できます。これは $\Phi$ 自身を観測可能な振動子座標と数えない最小例です。
<!-- definition-example-end -->

<a id="prop-qft15-gauss-constraint"></a>

<!-- formal-statement-start -->
> **命題（正準HamiltonianとGauss拘束）**  
> $3+1$ 次元の源付きMaxwell場を上記の正準変数で扱い、固定時刻の空間積分における部分積分の境界項が消えるとする。このとき正準Hamiltonianは

$$
H_c=\int_{\mathbb R^3}\left[\frac12(\boldsymbol E^2+\boldsymbol B^2)
+\Phi(\rho-\nabla\cdot\boldsymbol E)
-\boldsymbol j\cdot\boldsymbol A\right]d^3x
$$

> となる。$\Phi$ の変分で課される制約は $\nabla\cdot\boldsymbol E=\rho$ である。これは $\Phi$ の二階時間発展式ではなく、許される初期値が満たすGauss拘束である。
<!-- formal-statement-end -->

### 証明の見取り図

$\boldsymbol E=-\partial_t\boldsymbol A-\nabla\Phi$ から速度を消去し、正準運動量と速度の積から密度を引きます。最後に $\boldsymbol E\cdot\nabla\Phi$ を部分積分して $\Phi$ の係数を取り出します。

<!-- proof-start -->
### 証明

[Maxwell場の正準運動量と一次拘束](#def-qft15-canonical-momenta)から $\pi_i=-E_i$、$\partial_tA^i=-E_i-\partial_i\Phi$ です。従って

$$
\begin{aligned}
\mathcal H_c
&=\pi_i\partial_tA^i-\mathcal L\\
&=(-E_i)(-E_i-\partial_i\Phi)
-\left[\frac12(E_iE_i-B_iB_i)-\rho\Phi+j_iA^i\right]\\
&=\frac12(\boldsymbol E^2+\boldsymbol B^2)
+\boldsymbol E\cdot\nabla\Phi+\rho\Phi-\boldsymbol j\cdot\boldsymbol A.
\end{aligned}
$$

積分すると $\int\boldsymbol E\cdot\nabla\Phi\,d^3x=-\int\Phi\,\nabla\cdot\boldsymbol E\,d^3x$ です。これを代入して表示式を得ます。$\pi_\Phi=0$ のため $\Phi$ は独立な速度を持たず、Hamiltonian内で係数 $\rho-\nabla\cdot\boldsymbol E$ を零に制限する役割です。従って $\Phi$ を変分すると $\rho-\nabla\cdot\boldsymbol E=0$ が得られます。これは[作用からのGauss則](#thm-qft15-euler-maxwell)の $\nu=0$ 成分と同じ条件です。
<!-- proof-end -->

荷電源がない場合、初期データ $(\boldsymbol E,\boldsymbol B)$ は $\nabla\cdot\boldsymbol E=\nabla\cdot\boldsymbol B=0$ を満たさねばなりません。時刻ごとに自由な三つの電場成分を勝手に選んでよいのではありません。拘束を保った時間発展はAmpère則と電流保存に整合します。実際、

$$
\partial_t(\nabla\cdot\boldsymbol E-\rho)
=\nabla\cdot(\nabla\times\boldsymbol B-\boldsymbol j)-\partial_t\rho
=-\nabla\cdot\boldsymbol j-\partial_t\rho=0.
$$

## 5. 波に沿う成分を取り除いて二つの偏極を得る

Gauss拘束は時間を固定した条件でした。今度は波の一つ一つのFourierモードで何が残るかを調べます。真空、すなわち $J=0$ とし、**零でない光的運動量** $k^\mu=(\omega,\boldsymbol k)$、$\omega=|\boldsymbol k|>0$ を固定します。$k^2=\omega^2-|\boldsymbol k|^2=0$ です。複素偏極振幅 $\varepsilon^\mu$ は計算のための係数で、実際のポテンシャルは実部

$$
A^\mu(x)=\operatorname{Re}\bigl(\varepsilon^\mu e^{-ik_\nu x^\nu}\bigr)
$$

とします。$k_\nu x^\nu=\omega t-\boldsymbol k\cdot\boldsymbol x$ です。振幅は定数なので偏微分で $\partial_\mu\mapsto-ik_\mu$ となります。$\varepsilon$ の複素数の自由度と、物理的な実解の二つの偏極を混同しません。

<a id="thm-qft15-two-polarizations"></a>

<!-- formal-statement-start -->
> **定理（真空Maxwell平面波の二つの物理偏極）**  
> $k^\mu=(\omega,\boldsymbol k)\ne0$ を $\omega=|\boldsymbol k|>0$ を満たす実光的四元運動量とし、$A^\mu=\operatorname{Re}(\varepsilon^\mu e^{-ik\cdot x})$ を実Maxwellポテンシャルとする。真空方程式 $\partial_\mu F^{\mu\nu}=0$ はこのモードに対して $k_\mu\varepsilon^\mu=0$ を要求する。一方、振幅のゲージ同値 $\varepsilon^\mu\sim\varepsilon^\mu+\beta k^\mu$（$\beta\in\mathbb C$）により、各同値類には

$$
\varepsilon^0=0,\qquad
\boldsymbol k\cdot\boldsymbol\varepsilon=0
$$

> を満たす代表元が一意に存在する。この代表元の独立な複素振幅は二つであり、二つの独立した実偏極方向に対応する。ここでいう一意性は、固定した非零 $k$ の単一Fourierモードに限る。
<!-- formal-statement-end -->

### 証明の見取り図

Maxwell方程式を振幅へ直すと光的 $k$ と $\varepsilon$ の内積が零になります。ゲージ変換で $k$ に平行な一成分を取り去り、時間成分を零に選ぶと残る空間振幅は $\boldsymbol k$ と直交する二次元平面上にあります。

<!-- proof-start -->
### 証明

[ポテンシャルによる場の強さ](#def-qft15-potential-field)から、真空Maxwell方程式は

$$
\partial_\mu F^{\mu\nu}
=\partial_\mu(\partial^\mu A^\nu-\partial^\nu A^\mu)
=\Box A^\nu-\partial^\nu(\partial_\mu A^\mu)=0.
$$

ここで $\Box=\partial_\mu\partial^\mu$ は既習のダランベール演算子です。複素指数モードの実部と虚部を別々に代入できる線形方程式であり、振幅は

$$
-k^2\varepsilon^\nu+k^\nu(k_\mu\varepsilon^\mu)=0
$$

を満たします。$k^2=0$、$k^0=\omega>0$ なので、$\nu=0$ 成分から $k_\mu\varepsilon^\mu=0$ です。これは時空的な直交性であって、まだ $\boldsymbol k\cdot\boldsymbol\varepsilon=0$ という三次元の横波性ではありません。

次に[ゲージ変換](#def-qft15-gauge)の $\chi=\operatorname{Re}(i\beta e^{-ik\cdot x})$ を選ぶと $\partial^\mu\chi=\operatorname{Re}(\beta k^\mu e^{-ik\cdot x})$ となり、振幅は $\varepsilon^\mu+\beta k^\mu$ に移ります。$\beta=-\varepsilon^0/\omega$ を選べば新しい時間成分は零です。光的条件 $k^2=0$ により

$$
k_\mu(\varepsilon^\mu+\beta k^\mu)
=k_\mu\varepsilon^\mu+\beta k^2=0
$$

も保存されます。新しい時間成分が零なので $0=k_\mu\varepsilon'^\mu=-\boldsymbol k\cdot\boldsymbol\varepsilon'$、すなわち空間的な横波条件です。時間成分が零の代表元二つがゲージ同値なら差は $\beta k^0=\beta\omega=0$ を満たし、$\beta=0$ だから一意です。

固定した $\boldsymbol k\ne0$ に直交する $\mathbb C^3$ の部分空間は複素次元2です。例えば $\boldsymbol k=(0,0,\omega)$ なら $\boldsymbol\varepsilon'=(a,b,0)$ で $a,b\in\mathbb C$、独立な基底は $(1,0,0)$ と $(0,1,0)$ です。実部を取れば各基底の実数係数の余弦波・正弦波を組み合わせた一般解になります。
<!-- proof-end -->

具体的には $\varepsilon'^\mu=(0,a,b,0)$ を選んだとき

$$
\begin{aligned}
\boldsymbol E&=\operatorname{Re}\bigl(i\omega(a,b,0)e^{-ik\cdot x}\bigr),\\
\boldsymbol B&=\operatorname{Re}\bigl(i\boldsymbol k\times(a,b,0)e^{-ik\cdot x}\bigr).
\end{aligned}
$$

従って振幅について $\boldsymbol B=(\boldsymbol k/\omega)\times\boldsymbol E$ です。[EMAG8の横波性](../../EMAG/EMAG8/index.md#prop-emag8-transverse)と一致し、ポテンシャルのゲージによる成分削減が電磁場の既知の横波性へつながりました。

### 5.1 Lorenz条件とCoulomb条件をどう使い分けるか

$\partial_\mu A^\mu=0$ はLorenzゲージ条件です。この条件を課した場合に真空方程式が $\Box A^\nu=0$ へ簡約されるのは上の導出の通りです。ただしこれはゲージの代表を選ぶ条件であり、追加の独立した物理方程式ではありません。一般の場についてこの条件に到達できるかは、ゲージ関数が満たす波動方程式 $\Box\chi=-\partial_\mu A^\mu$ の初期・境界条件に依存します。単一の光的モードでは $k\cdot\varepsilon=0$ が**既に運動方程式から**出るので、残余ゲージ変換 $\varepsilon\mapsto\varepsilon+\beta k$ だけではその値を変えられません。

別に固定時刻で $\nabla\cdot\boldsymbol A=0$ とするCoulombゲージを考えると、真空ではGauss則は $-\Delta\Phi=0$ です。無限遠で消える $\Phi$ に限定すれば $\Phi=0$ であり、残る $\boldsymbol A$ は横方向だけになります。$\boldsymbol k\ne0$ のFourier成分について、ベクトル $\boldsymbol v$ を波数方向と直交方向に分ける射影を次で定義します。

<a id="def-qft15-transverse-projector"></a>

<!-- formal-statement-start -->
> **定義（非零波数の横射影）**  
> $\boldsymbol k\in\mathbb R^3\setminus\{0\}$ に対し、$\mathbb C^3$ 上の横射影行列 $P$ と横・縦成分を次で定める。$\delta_{ij}$ はKronecker記号、$I$ は単位行列である。

$$
P_{ij}(\boldsymbol k)=\delta_{ij}-\frac{k_i k_j}{|\boldsymbol k|^2},
\qquad
\boldsymbol v_T=P\boldsymbol v,\quad
\boldsymbol v_L=(I-P)\boldsymbol v.
$$

> ここで $\boldsymbol v\in\mathbb C^3$ は任意のベクトルである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft15-transverse-projector -->
### 例：進行方向を消して二成分だけ残す

**定義の確認**：射影の分母の非零性、横・縦成分と直交・冪等条件を計算します。

$\boldsymbol k=(0,0,\kappa)$、$\kappa>0$ なら $k_i k_j/|k|^2$ は $(3,3)$ 成分だけ1の行列です。従って $P=\operatorname{diag}(1,1,0)$、$P(v_1,v_2,v_3)=(v_1,v_2,0)$ です。$\boldsymbol k\cdot(P\boldsymbol v)=0$、$P^2=P$、$\boldsymbol v=P\boldsymbol v+(I-P)\boldsymbol v$ を直接満たします。$\boldsymbol k=0$ を除外する理由は分母が零で射影を定められないためです。
<!-- definition-example-end -->

<a id="prop-qft15-projector-rank"></a>

<!-- formal-statement-start -->
> **命題（横射影の階数）**  
> $\boldsymbol k\in\mathbb R^3\setminus\{0\}$ に対して上の $P(\boldsymbol k)$ は $P^2=P$、$P^*=P$、$P\boldsymbol k=0$ を満たす直交射影であり、像は $\{\boldsymbol v:\boldsymbol k\cdot\boldsymbol v=0\}$、階数は2である。
<!-- formal-statement-end -->

### 証明の見取り図

$K=\boldsymbol k\boldsymbol k^T/|\boldsymbol k|^2$ が $K^2=K$ となることを成分で確認し、$P=I-K$ と置きます。$P\boldsymbol v=\boldsymbol v$ となる条件が $\boldsymbol k\cdot\boldsymbol v=0$ であることから像を同定します。

<!-- proof-start -->
### 証明

$K_{ij}=k_i k_j/|k|^2$ とすると

$$
(K^2)_{ij}=\sum_{\ell=1}^3\frac{k_i k_\ell}{|k|^2}
\frac{k_\ell k_j}{|k|^2}
=\frac{k_i k_j}{|k|^4}\sum_\ell k_\ell^2
=K_{ij}.
$$

従って $P^2=(I-K)^2=I-2K+K^2=P$ です。$k_i$ は実数なので $P^*=P$、また $P\boldsymbol k=\boldsymbol k-\boldsymbol k|k|^2/|k|^2=0$。任意の $\boldsymbol v$ で $\boldsymbol k\cdot P\boldsymbol v=0$ です。逆に $\boldsymbol k\cdot\boldsymbol v=0$ なら $P\boldsymbol v=\boldsymbol v$。従って像が横方向の二次元空間に一致します。実際 $\operatorname{tr}P=3-|k|^2/|k|^2=2$ で、射影の固有値は0または1なので階数2です。
<!-- proof-end -->

この射影は**空間の**電磁波の二偏極を選びます。四元ベクトルに対するLorentz共変な単純射影が何の条件もなく存在すると言っているわけではありません。また非零波数の局所的な話を、境界・大域的な零モード・非自明な位相を持つ空間に無条件で広げません。

### 5.2 正準自由度の数え上げとも一致する

真空の固定時刻に四つの配置変数 $(\Phi,\boldsymbol A)$ と四つの共役運動量を形式上数えると、位相空間は各点で8成分です。$\pi_\Phi=0$ とGauss拘束は、通常の減衰条件・非零モードで二つの第一類拘束になり、それぞれ一つの拘束条件と一つのゲージ方向を除きます。従って物理的な位相空間成分は $8-2\times2=4$、すなわち**二組の正準座標と運動量**です。この数え上げは拘束のPoisson括弧とゲージ生成のHamiltonian解析に依存するため、ここでは独立の厳密定理としてではなく上の平面波計算と一致する確認として用います。

## 6. 演習：表示の冗長性を手で消す

### 演習 QFT15-A1：一様磁場のテンソル成分

$3+1$ 次元、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$\Phi=0$、$\boldsymbol A=(0,bx^1,0)$（実定数 $b$）について、$F_{12}$、$F^{12}$、$\boldsymbol E$、$\boldsymbol B$ をポテンシャルの定義から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

[四元ポテンシャルからの定義](#def-qft15-potential-field)で $A_1=0$、$A_2=-bx^1$ です。従って

$$
F_{12}=\partial_1A_2-\partial_2A_1=-b,
\qquad F^{12}=\eta^{11}\eta^{22}F_{12}=(-1)(-1)(-b)=-b.
$$

$A$ に時間依存はなく $\Phi=0$ なので $E_i=-\partial_tA^i-\partial_i\Phi=0$。磁場は $B_3=\partial_1A^2-\partial_2A^1=b$、他成分は零です。$F_{12}=-B_3$ の符号が正しいことも確認できます。
<!-- solution-end -->

### 演習 QFT15-A2：勾配を足しても電磁場は不変

任意の実数値 $C^3$ 関数 $\chi(t,\boldsymbol x)$ に対して、$\Phi'=\Phi+\partial_t\chi$、$\boldsymbol A'=\boldsymbol A-\nabla\chi$ とする。$\boldsymbol E'=-\nabla\Phi'-\partial_t\boldsymbol A'$、$\boldsymbol B'=\nabla\times\boldsymbol A'$ が元の場に等しいことを成分で示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

各空間成分について二階偏微分を交換できるため、

$$
\begin{aligned}
E'_i&=-\partial_i(\Phi+\partial_t\chi)
-\partial_t(A^i-\partial_i\chi)\\
&=-\partial_i\Phi-\partial_tA^i
-\partial_i\partial_t\chi+\partial_t\partial_i\chi=E_i.
\end{aligned}
$$

磁場について $B'_i=\epsilon_{ijk}\partial_j(A^k-\partial_k\chi)
=B_i-\epsilon_{ijk}\partial_j\partial_k\chi=B_i$ です。最後の項は $j,k$ に対称な二階偏微分と反対称な $\epsilon_{ijk}$ の縮約なので零です。
<!-- solution-end -->

### 演習 QFT15-A3：Gauss則と保存する電流

$\rho=\rho_0$（一定）、$\boldsymbol j=0$、$\Phi=-\rho_0(x^1)^2/2$、$\boldsymbol A=0$ とする。$\nabla\cdot\boldsymbol E=\rho$、$\partial_\mu J^\mu=0$ と、残りのMaxwell方程式を確かめよ。無限遠の全エネルギーの有限性は要求しない。

- Level: A

<!-- solution-start -->
**詳細解答**

$\boldsymbol E=-\nabla\Phi=(\rho_0x^1,0,0)$、$\boldsymbol B=0$ です。従って $\nabla\cdot\boldsymbol E=\partial_1(\rho_0x^1)=\rho_0$、$\nabla\cdot\boldsymbol B=0$。また時間依存がないため $\partial_t\boldsymbol B+\nabla\times\boldsymbol E=0$、$\nabla\times\boldsymbol B-\partial_t\boldsymbol E=0=\boldsymbol j$ です。$\partial_t\rho+\nabla\cdot\boldsymbol j=0+0=0$ も確認できます。全空間で増大する場なので有限エネルギーの散乱解とみなさない点は仮定と整合しています。
<!-- solution-end -->

### 演習 QFT15-A4：時間成分の正準運動量

Maxwell密度 $\mathcal L=(\boldsymbol E^2-\boldsymbol B^2)/2$ と $\boldsymbol E=-\partial_t\boldsymbol A-\nabla\Phi$ を与える。配置変数を $(\Phi,A^1,A^2,A^3)$ として $\pi_\Phi$、$\pi_i$ を偏微分から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$\mathcal L$ の $\boldsymbol B=\nabla\times\boldsymbol A$ は空間微分だけを含み、$\partial_t\Phi$ は $\boldsymbol E$ にもありません。従って $\pi_\Phi=\partial\mathcal L/\partial(\partial_t\Phi)=0$。また $\partial E_j/\partial(\partial_tA^i)=-\delta_{ji}$ なので、連鎖律から

$$
\pi_i=\sum_j\frac{\partial\mathcal L}{\partial E_j}
\frac{\partial E_j}{\partial(\partial_tA^i)}
=\sum_j E_j(-\delta_{ji})=-E_i.
$$

時間的成分だけ運動量が独立に決まらないことが、一次拘束の出発点です。
<!-- solution-end -->

### 演習 QFT15-A5：非零波数の横射影

$\boldsymbol k=(1,2,2)$、$\boldsymbol v=(2,0,1)$ に対して $P=I-\boldsymbol k\boldsymbol k^T/|\boldsymbol k|^2$ を使い $\boldsymbol v_T=P\boldsymbol v$、$\boldsymbol v_L=(I-P)\boldsymbol v$ を求め、それぞれ直交・平行条件を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$|\boldsymbol k|^2=1+4+4=9$、$\boldsymbol k\cdot\boldsymbol v=2+0+2=4$ です。従って[横射影](#def-qft15-transverse-projector)から

$$
\begin{aligned}
\boldsymbol v_L&=\frac{4}{9}(1,2,2)=(4/9,8/9,8/9),\\
\boldsymbol v_T&=(2,0,1)-\boldsymbol v_L=(14/9,-8/9,1/9).
\end{aligned}
$$

$\boldsymbol k\cdot\boldsymbol v_T=(14-16+2)/9=0$ です。$\boldsymbol v_L$ は $\boldsymbol k$ の $4/9$ 倍で平行であり、和は元の $\boldsymbol v$ へ戻ります。
<!-- solution-end -->

### 演習 QFT15-B1：作用から電流付きMaxwell方程式

有界領域 $\Omega$ 上の $C^2$ ポテンシャル $A_\mu$、固定した $C^1$ 外部源 $J^\mu$、コンパクト台の $C^\infty$ 変分 $\delta A_\nu$ と作用 $S[A]=\int_\Omega[-F_{\mu\nu}F^{\mu\nu}/4-J^\mu A_\mu]d^4x$ を与える。反対称性と部分積分を明示し、停留条件 $\partial_\mu F^{\mu\nu}=J^\nu$ を再導出せよ。$\nu=0$ 成分がGauss則となることを検算せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$\delta F_{\mu\nu}=\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu$ を使い、係数 $1/4$ と二乗の微分の係数2から

$$
\delta S=\int_\Omega\left[-\frac12F^{\mu\nu}
(\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu)
-J^\nu\delta A_\nu\right]d^4x.
$$

第二項で $\mu\leftrightarrow\nu$ とし、$F^{\nu\mu}=-F^{\mu\nu}$ を使うと、導関数を持つ二項の和は $-F^{\mu\nu}\partial_\mu\delta A_\nu$ です。境界項は $\delta A$ のコンパクト台により零なので、

$$
\delta S=\int_\Omega(\partial_\mu F^{\mu\nu}-J^\nu)
\delta A_\nu\,d^4x.
$$

各 $\delta A_\nu$ は独立なので係数が零です。$F^{00}=0$、$F^{i0}=E_i$、$J^0=\rho$ を代入した $\nu=0$ 成分は $\sum_i\partial_iE_i=\rho$ となり、Gauss則に一致します。
<!-- solution-end -->

### 演習 QFT15-B2：Hamiltonianと境界項

$\mathcal L=(E^2-B^2)/2-\rho\Phi+\boldsymbol j\cdot\boldsymbol A$、$\boldsymbol E=-\partial_t\boldsymbol A-\nabla\Phi$、$\pi_i=-E_i$ とし、空間積分の境界項が消えると仮定する。Hamiltonianを $\Phi$ の係数が見える形に直し、$\Phi$ がどの初期値条件を課すか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$\partial_t A^i=-E_i-\partial_i\Phi$ だから、Legendre変換の密度は

$$
\begin{aligned}
\pi_i\partial_tA^i-\mathcal L
&=(-E_i)(-E_i-\partial_i\Phi)
-\frac12(E_iE_i-B_iB_i)+\rho\Phi-\boldsymbol j\cdot\boldsymbol A\\
&=\frac12(E_iE_i+B_iB_i)+E_i\partial_i\Phi
+\rho\Phi-\boldsymbol j\cdot\boldsymbol A.
\end{aligned}
$$

$\int E_i\partial_i\Phi=-\int\Phi\partial_iE_i$ を使い、

$$
H_c=\int\left[\frac12(E^2+B^2)
+\Phi(\rho-\nabla\cdot E)-\boldsymbol j\cdot\boldsymbol A\right]d^3x.
$$

$\pi_\Phi=0$ により $\Phi$ の速度はこのLegendre変換で決定されません。$\Phi$ による変分は $\rho-\nabla\cdot E=0$ を強制し、$\Phi$ の二階時間微分を決めません。
<!-- solution-end -->

### 演習 QFT15-B3：複素振幅の縦成分はゲージで消える

真空で $k^\mu=(\kappa,0,0,\kappa)$、$\kappa>0$、$\varepsilon^\mu=(2,1,i,2)$ とし、実ポテンシャルを $A^\mu=\operatorname{Re}(\varepsilon^\mu e^{-ik\cdot x})$ とする。$k\cdot\varepsilon=0$ を確かめ、$\varepsilon\mapsto\varepsilon+\beta k$ で時間成分を零にせよ。残る二偏極と $\boldsymbol B=(\boldsymbol k/\kappa)\times\boldsymbol E$ を検算せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

計量 $(+---)$ より $k\cdot\varepsilon=\kappa\varepsilon^0-\kappa\varepsilon^3=\kappa(2-2)=0$ です。$\beta=-2/\kappa$ を選べば

$$
\varepsilon'^\mu=(2,1,i,2)-\frac{2}{\kappa}(\kappa,0,0,\kappa)
=(0,1,i,0).
$$

横方向の二つの基底 $(1,0,0)$、$(0,1,0)$ の係数は $1,i$ で、異なる位相を持つ円偏光の例です。$\theta=\kappa(t-x^3)$ とすると $\boldsymbol A'=\operatorname{Re}((1,i,0)e^{-i\theta})=(\cos\theta,\sin\theta,0)$ なので

$$
\boldsymbol E=-\partial_t\boldsymbol A'
=(\kappa\sin\theta,-\kappa\cos\theta,0),
\qquad
\boldsymbol B=\nabla\times\boldsymbol A'
=(\kappa\cos\theta,\kappa\sin\theta,0).
$$

$(0,0,1)\times\boldsymbol E=(\kappa\cos\theta,\kappa\sin\theta,0)=\boldsymbol B$ です。ゲージ変換前後で $F$ は不変なので元のポテンシャルも同じ電磁場を記述します。
<!-- solution-end -->

### 演習 QFT15-B4：保存しない源とゲージ変換

$\Omega$ を有界開時空領域とし、外部源 $J^\mu=(t,0,0,0)$、実試験関数 $\chi\in C_c^\infty(\Omega)$ を取る。$A\mapsto A+\partial\chi$ のときの作用変化を導き、$J$ に整合する滑らかなMaxwell解が存在しない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

源との結合項だけが変化します。[ゲージ不変性](#prop-qft15-gauge-invariance)により自由場の $F^2$ 項は同じです。部分積分で

$$
\begin{aligned}
\Delta S&=-\int_\Omega J^\mu\partial_\mu\chi\,d^4x\\
&=\int_\Omega\chi\,\partial_\mu J^\mu\,d^4x
=\int_\Omega\chi\,d^4x.
\end{aligned}
$$

非負で零でないコンパクト台の $\chi$ を選べば右辺は正なので、全てのゲージ変換に対する不変性はありません。もしMaxwell解が存在すれば[運動方程式](#thm-qft15-euler-maxwell)の発散から $\partial_\mu J^\mu=0$ が必要です。しかし指定された $J$ では $\partial_t t=1$ で矛盾します。電流保存の欠落により、方程式の解の存在機構が破綻しています。
<!-- solution-end -->

### 演習 QFT15-C1：Gauss拘束から二偏極までの全経路

$3+1$ 次元の無源Maxwell場を $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\mathcal L=-F_{\mu\nu}F^{\mu\nu}/4$、$F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$、$A^\mu=\operatorname{Re}(\varepsilon^\mu e^{-ik\cdot x})$ で考える。$k^\mu=(\omega,0,0,\omega)$、$\omega>0$ とする。

1. 作用の変分から四元Maxwell方程式を導き、その $\nu=0$ 成分をGauss則として書け。
2. 振幅に対する運動方程式と、その下で許されるゲージ変換 $\varepsilon\mapsto\varepsilon+\beta k$ を導け。
3. ゲージを選んで独立な振幅を列挙し、対応する電場・磁場の向きと分散関係を確認せよ。
4. $\pi_\Phi=0$ とGauss拘束が、四つの独立な光子を数えることを妨げる理由を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

**1. 作用とGauss則。** $\delta F_{\mu\nu}=\partial_\mu\delta A_\nu-\partial_\nu\delta A_\mu$ を代入します。反対称性により二項をまとめ、コンパクト台の変分について部分積分すると

$$
\begin{aligned}
\delta S&=-\int\!F^{\mu\nu}\partial_\mu\delta A_\nu\,d^4x\\
&=\int\!(\partial_\mu F^{\mu\nu})\delta A_\nu\,d^4x.
\end{aligned}
$$

従って $\partial_\mu F^{\mu\nu}=0$ です。$F^{i0}=E_i$、$F^{00}=0$ を代入した $\nu=0$ 成分は $\partial_iE_i=0$、すなわちGauss拘束です。

**2. Fourierモード。** $F^{\mu\nu}=\partial^\mu A^\nu-\partial^\nu A^\mu$ を代入して $\Box A^\nu-\partial^\nu(\partial\cdot A)=0$ と書きます。複素指数の微分で $\partial^\mu\mapsto-ik^\mu$ ですから

$$
-k^2\varepsilon^\nu+k^\nu(k\cdot\varepsilon)=0.
$$

与えられた $k$ は $k^2=\omega^2-\omega^2=0$ で $k^0>0$ なので $k\cdot\varepsilon=\omega(\varepsilon^0-\varepsilon^3)=0$、すなわち $\varepsilon^0=\varepsilon^3$。実ゲージ関数 $\chi=\operatorname{Re}(i\beta e^{-ik\cdot x})$ の勾配を足すと振幅は $\varepsilon^\mu+\beta k^\mu$ に移ります。$k^2=0$ だから条件 $k\cdot\varepsilon=0$ を保存します。

**3. 偏極の選択。** $\beta=-\varepsilon^0/\omega$ とすると

$$
\varepsilon'^\mu=(0,\varepsilon^1,\varepsilon^2,0)
=(0,a,b,0).
$$

$a,b$ が独立な横偏極振幅です。$\theta=\omega(t-x^3)$ と置き、$\boldsymbol A=\operatorname{Re}((a,b,0)e^{-i\theta})$ を微分すると

$$
\begin{aligned}
\boldsymbol E&=\operatorname{Re}(i\omega(a,b,0)e^{-i\theta}),\\
\boldsymbol B&=\operatorname{Re}(i\omega(-b,a,0)e^{-i\theta}).
\end{aligned}
$$

$\boldsymbol E\cdot\boldsymbol k=\boldsymbol B\cdot\boldsymbol k=0$、$\boldsymbol B=(0,0,1)\times\boldsymbol E$ です。$k^2=0$ は $\omega=|\boldsymbol k|$ という質量零の分散関係で、負振動数枝とは別に正の枝を選んでいます。

**4. 初期値の数え上げ。** $\mathcal L=(E^2-B^2)/2$ には $\partial_t\Phi$ が含まれないので $\pi_\Phi=0$ です。$\Phi$ はHamiltonianの中でGauss条件を課す変数であり、別の伝播する波を与えません。さらに $A\mapsto A+\partial\chi$ で同一の $F$ を表す振幅が複数あるため、四成分を独立に量子化した四種類の物理粒子とは数えられません。$k\ne0$ のモードで運動方程式による一条件 $k\cdot\varepsilon=0$ とゲージ方向 $\beta k$ の除去を行うと $4-1-1=2$ の横偏極だけが残り、正準拘束の数え方とも一致します。
<!-- solution-end -->

## 7. 次へ：冗長な記述を量子計算へ持ち込むには

Maxwell作用と二偏極の関係が分かりました。しかしLorenz条件やCoulomb条件で古典的な解を整理することと、量子論でその伝播を計算することは別の問題です。四成分の伝播関数には、どのゲージを選ぶかによって中間式が変わる部分があります。次はゲージ固定した二次作用を逆にして光子の伝播関数を作り、物理的な振幅からゲージ選択への依存がどう消えるのかを調べます。
