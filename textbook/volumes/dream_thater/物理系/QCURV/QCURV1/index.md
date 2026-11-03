# QCURV1 曲率結合Klein–Gordon場の作用とCauchy問題

<!-- definition-example-audit: strict -->

[QFT1の自由スカラー場](../../QFT/QFT1/index.md#def-qft1-real-scalar)は平坦時空で波を記述できました。[GR6のスカラー曲率](../../GR/GR6/index.md#def-gr6-ricci-scalar)は背景時空の曲がり具合を一つの実数で表します。では背景を曲げたとき、場の方程式を単に $\partial_\mu$ から $\nabla_a$ に置き換えるだけでよいのでしょうか。

曲がった時空には、場の質量の二乗と同じ次元を持つスカラー曲率 $R$ があります。そのため、自由場の作用には $R\phi^2$ という新しい二次項を置けます。まず**古典的な背景計量を固定**し、その上で実スカラー場だけを変分して方程式を導きます。次に、その方程式を初期値から一意に解ける条件を確認します。この段階では量子真空も粒子も選んでいません。

## 1. 背景と未知関数を分ける

$(M,g)$ は境界がなく連結で、滑らかで時間向きの付いた4次元[大域双曲Lorentz時空](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)とし、計量の符号は $(-,+,+,+)$ に固定します。[LORG20の滑らかな時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)から、時空を横切る滑らかな空間的[Cauchy超曲面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy) $\Sigma$ を取れます。$g$ とその[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita) $\nabla$ は**与えられた古典的データ**であり、以下の場の変分では動かしません。

局所座標を $x^a$（$a=0,1,2,3$）とし、上下に重複する添字は和を取ります。$g_{ab}=g(\partial/\partial x^a,\partial/\partial x^b)$ は座標基底での計量成分、$g^{ab}$ はその逆行列の成分、$R=g^{ab}R_{ab}$ は[曲率の縮約](../../GR/GR6/index.md#def-gr6-ricci-scalar)です。自然単位 $\hbar=c=k_B=G=1$ を用います。符号の異なるQFT1では $g_{+---}$ を使いましたが、**本章の** $g_{-+++}$ では波動演算子の符号が逆になります。

平坦時空でのスカラー場の値と同様、一般の時空でも同じ事象の物理的な値は座標に依存しません。各点に一つの実数を割り当てる滑らかな関数として扱います。座標図 $(U,x)$ では $\phi_x=\phi\circ x^{-1}$ と書き、別の座標図 $(W,y)$ と比較するときは両方の座標が使える $p\in U\cap W$ に限ります。

<a id="def-qcurv1-background-field"></a>

<!-- formal-statement-start -->
> **定義（固定背景上の実スカラー場）**
> 時間向き付き滑らかな4次元Lorentz多様体 $(M,g)$ の計量を固定する。滑らかな実数値関数 $\phi:M\to\mathbb R$ を、この固定背景上の古典的な実スカラー場とする。任意の座標図 $(U,x)$、$(W,y)$ に対する局所表示 $\phi_x=\phi\circ x^{-1}$、$\phi_y=\phi\circ y^{-1}$ は、重なり $U\cap W$ の同じ点で次の変換則を満たす。

$$
\phi_y(y(p))=\phi_x(x(p))\qquad(p\in U\cap W).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv1-background-field -->
### 例：座標に依存しない定数場

**定義の確認**：定義域、実数値性、滑らかさ、座標変換則をそれぞれ調べます。

任意の $c\in\mathbb R$ を固定して $\phi(p)=c$ と置きます。値は実数で、任意回微分可能であり、どの座標でも $\phi_y(y(p))=c=\phi_x(x(p))$ です。定義域・実数値性・滑らかさ・座標変換則の四点を直接満たします。ただし**場として許される**ことは、これから作る方程式の**解である**ことと同じではありません。
<!-- definition-example-end -->

場の変分は、滑らかで**コンパクトな台**を持つ実数値 $\chi\in C_c^\infty(M)$ に対して $\phi_\varepsilon=\phi+\varepsilon\chi$ と置く操作です。ここで $\varepsilon$ は実数パラメータ、台とは関数が零でない点の閉包です。[QFT1の第一変分](../../QFT/QFT1/index.md#def-qft1-action)と同じく、時刻を進める操作ではありません。

## 2. 曲率はどこから作用へ入るか

平坦時空の質量項 $m^2\phi^2$ と同様、曲率 $R$ に $\phi^2$ を掛けた項は場について二次です。$m\ge0$ と無次元の実定数 $\xi$ を与え、背景に依存する実数値関数を

$$
V(x)=m^2+\xi R(x)
$$

と書きます。$V$ は一定とは限りません。$m$ は場の質量パラメータ、$\xi$ は**曲率結合係数**です。特別な値 $\xi=0$ を最小結合、4次元質量零の模型で現れる $\xi=1/6$ を共形結合と呼びます。共形変換を使う理由は後の講義で導きます。

体積要素は座標では

$$
d\mathrm{vol}_g=\sqrt{-\det(g_{ab})}\,d^4x
$$

です。計量符号が $(-,+,+,+)$ なので行列式は負です。座標変換 $x=x(y)$ のJacobianを $J^a{}_b=\partial x^a/\partial y^b$ とし、計量行列を $G_x=(g_{ab})$、$G_y$ と記すと、座標基底の変換から

$$
G_y=J^{\mathsf T}G_xJ,
\qquad \det G_y=(\det J)^2\det G_x
$$

です。したがって

$$
\sqrt{|\det G_y|}\,d^4y
=\sqrt{|\det G_x|}\,|\det J|\,d^4y
$$

は変数変換で同じ密度を表します。[GR9の局所物質作用](../../GR/GR9/index.md#def-gr9-matter-action)と同様、座標表示を変えても積分値が一致する幾何学的な密度で積分します。全時空の作用が発散し得るため、まず相対コンパクトな開領域 $\Omega\subset M$ で考え、変分の台をその内部に取ります。

<a id="def-qcurv1-curved-action"></a>

<!-- formal-statement-start -->
> **定義（曲率結合スカラー場の作用）**
> 固定した滑らかな4次元Lorentz計量 $g$、$m\ge0$、$\xi\in\mathbb R$、相対コンパクトな開領域 $\Omega\subset M$、実スカラー場 $\phi\in C^\infty(M,\mathbb R)$ に対し、曲率結合した自由場の作用を

$$
S_\Omega[\phi;g]
=-\frac12\int_\Omega
\left(g^{ab}\nabla_a\phi\nabla_b\phi+
(m^2+\xi R)\phi^2\right)d\mathrm{vol}_g
$$

> と定める。$\delta_\phi S_\Omega[\phi;\chi]$ は $\chi\in C_c^\infty(\Omega,\mathbb R)$ に対する $\varepsilon=0$ での $S_\Omega[\phi+\varepsilon\chi;g]$ の微分であり、$g,m,\xi$ は固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv1-curved-action -->
### 例：曲率一定の有限時間円筒

**定義の確認**：背景を固定し、作用の積分が定義できることと曲率項の寄与を調べます。

$M=\mathbb R\times S^3_a$ に $g=-dt^2+h_a$ を入れます。$S^3_a$ は半径 $a>0$ の丸い3球面、$h_a$ はその正定値計量です。時間区間 $(-T,T)$（$T>0$）と球面の積を $\Omega$ とします。[$S^3$ の定曲率縮約](../../GR/GR6/index.md#prop-gr6-constant-curvature)で3球面のスカラー曲率は $6/a^2$ です。時間方向が曲率を加えないことは第4節で計算します。

定数場 $\phi=c$ なら $\nabla_a\phi=0$、$V=m^2+6\xi/a^2$、$d\mathrm{vol}_g=dt\,d\mathrm{vol}_{h_a}$ です。したがって定義の積分を直接行うと

$$
\begin{aligned}
S_\Omega[c;g]
&=-\frac12\int_{-T}^{T}\!dt\int_{S^3_a}
Vc^2\,d\mathrm{vol}_{h_a}\\
&=-T\,\operatorname{Vol}(S^3_a)
\left(m^2+\frac{6\xi}{a^2}\right)c^2.
\end{aligned}
$$

有限時間かつコンパクトな空間だから積分は有限です。背景を固定したこと、実数値場・積分可能性・曲率項の全条件をここで確認できました。
<!-- definition-example-end -->

## 3. 作用から方程式へ

波動方程式を座標で使うため、まず一般の曲がった計量での発散を確認します。$X^a$ を滑らかなベクトル場とすると、[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の係数は

$$
\nabla_aX^a=\partial_aX^a+\Gamma^a{}_{ab}X^b,
\qquad
\Gamma^a{}_{ab}
=\frac12g^{ac}\partial_b g_{ac}
=\partial_b\log\sqrt{-\det g}
$$

を満たします。最後の等号では、$\partial_b\log|\det g|=\operatorname{tr}(g^{-1}\partial_b g)$ を使いました。よって

$$
\nabla_aX^a=
\frac{1}{\sqrt{-\det g}}
\partial_a\left(\sqrt{-\det g}\,X^a\right).
$$

実スカラーの $\nabla_a\phi=\partial_a\phi$ に適用すると、二階の波動演算子が計算可能になります。

<a id="def-qcurv1-kg-operator"></a>

<!-- formal-statement-start -->
> **定義（曲率結合Klein–Gordon作用素）**
> 時間向き付き滑らかな4次元Lorentz時空 $(M,g)$ と $m\ge0$、$\xi\in\mathbb R$ に対し、実スカラー場に作用する線形微分作用素を

$$
P_g=-\Box_g+m^2+\xi R,\qquad
\Box_g\phi:=g^{ab}\nabla_a\nabla_b\phi
$$

> と定める。方程式 $P_g\phi=0$ を曲率結合Klein–Gordon方程式と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv1-kg-operator -->
### 例：Minkowski時空への復帰と符号

**定義の確認**：作用素に計量を実際に代入し、平坦時空の方程式との一致を検算します。

ここでは $x^0=t$、$\boldsymbol x=(x^1,x^2,x^3)$ とし、$\Delta=\sum_{i=1}^3\partial_i^2$ を空間Laplacianとします。$g_{ab}=\operatorname{diag}(-1,1,1,1)$、$R=0$ とします。接続係数は零なので $\Box_g=-\partial_t^2+\Delta$、従って

$$
P_g=\partial_t^2-\Delta+m^2.
$$

振幅 $A\in\mathbb R\setminus\{0\}$、角振動数 $\omega\in\mathbb R$、波数ベクトル $\boldsymbol k\in\mathbb R^3$ を固定し、この式を $\phi=A\cos(\omega t-\boldsymbol k\cdot\boldsymbol x)$ に適用すると

$$
P_g\phi=(-\omega^2+|\boldsymbol k|^2+m^2)\phi.
$$

$A\ne0$ の非自明な平面波について $P_g\phi=0$ と $\omega^2=|\boldsymbol k|^2+m^2$ は同値で、[QFT1の分散関係](../../QFT/QFT1/index.md#prop-qft1-dispersion)に戻ります。QFT1での $\Box_{+---}=\partial_t^2-\Delta$ を本章の $\Box_g$ と同一視して符号を二重反転しないことが大切です。
<!-- definition-example-end -->

<a id="prop-qcurv1-kg-coordinate"></a>

<!-- formal-statement-start -->
> **命題（曲率結合Klein–Gordon作用素の座標表示）**
> 滑らかな4次元Lorentz時空 $(M,g)$ の任意の座標近傍で、$\det g=\det(g_{ab})<0$、$V=m^2+\xi R$ とすると、任意の滑らかな実スカラー場 $\phi$ に対し

$$
P_g\phi=
-\frac{1}{\sqrt{-\det g}}
\partial_a\left(\sqrt{-\det g}\,g^{ab}\partial_b\phi\right)
+V\phi
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\nabla_b\phi$ を逆計量で上げてベクトル場 $X^a=g^{ab}\partial_b\phi$ を作り、先に導いた発散の公式へ代入します。計量の微分から生じる項が、曲がった座標の補正です。

<!-- proof-start -->
### 証明

実スカラーに対して $\nabla_b\phi=\partial_b\phi$ です。計量両立性 $\nabla_ag^{ab}=0$ より

$$
\begin{aligned}
\nabla_a(g^{ab}\nabla_b\phi)
&=(\nabla_ag^{ab})\nabla_b\phi
  +g^{ab}\nabla_a\nabla_b\phi\\
&=\Box_g\phi.
\end{aligned}
$$

次に $X^a=g^{ab}\partial_b\phi$ を $\nabla_aX^a=(\sqrt{-\det g})^{-1}\partial_a(\sqrt{-\det g}\,X^a)$ へ代入すると

$$
\Box_g\phi
=\frac{1}{\sqrt{-\det g}}
\partial_a(\sqrt{-\det g}\,g^{ab}\partial_b\phi).
$$

両辺に負符号を掛け、零次項 $V\phi$ を加えれば主張を得ます。各座標で同じ幾何学的スカラー $-\Box_g\phi+V\phi$ を計算しているので、座標表示に依存しません。
<!-- proof-end -->

<a id="thm-qcurv1-stationarity"></a>

<!-- formal-statement-start -->
> **定理（曲率結合作用の停留条件）**
> $(M,g)$ を境界のない滑らかな4次元Lorentz時空、$m\ge0$、$\xi\in\mathbb R$ とする。滑らかな実スカラー場 $\phi$ が、すべての相対コンパクトな開領域 $\Omega\subset M$ とすべての実数値 $\chi\in C_c^\infty(\Omega)$ に対して $\delta_\phi S_\Omega[\phi;\chi]=0$ を満たすことと、各点で

$$
P_g\phi=(-\Box_g+m^2+\xi R)\phi=0
$$

> が成り立つことは同値である。背景 $g$ の変分は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

微分項を一度変分すると二つの同じ項が現れて係数 $1/2$ と相殺します。積の微分で $\nabla_a\chi$ を $\chi$ に移せば、コンパクト支持により境界流束が消えます。最後は任意の試験関数による局所化です。

<!-- proof-start -->
### 証明

$V=m^2+\xi R$ を固定します。$\phi_\varepsilon=\phi+\varepsilon\chi$ を[本章の作用](#def-qcurv1-curved-action)へ入れ、計量を変えずに微分すると

$$
\begin{aligned}
\delta_\phi S_\Omega[\phi;\chi]
&=-\frac12\int_\Omega
\left(2g^{ab}\nabla_a\phi\nabla_b\chi
+2V\phi\chi\right)d\mathrm{vol}_g\\
&=-\int_\Omega
\left(\nabla^a\phi\,\nabla_a\chi+V\phi\chi\right)
d\mathrm{vol}_g.
\end{aligned}
$$

ここでは $R$ が $g$ から作られることと、**$g$ 自体を変分する**ことを区別しています。$\delta_\phi R=0$ です。積のLeibniz則により

$$
\nabla_a(\chi\nabla^a\phi)
=\nabla_a\chi\,\nabla^a\phi
+\chi\Box_g\phi.
$$

$\chi$ の台は $\Omega$ 内のコンパクト集合なので、境界へ流れる積分は零です。従って

$$
\begin{aligned}
\delta_\phi S_\Omega[\phi;\chi]
&=-\int_\Omega\nabla_a(\chi\nabla^a\phi)d\mathrm{vol}_g
+\int_\Omega(\Box_g\phi-V\phi)\chi d\mathrm{vol}_g\\
&=-\int_\Omega(P_g\phi)\chi\,d\mathrm{vol}_g.
\end{aligned}
$$

$P_g\phi$ は連続です。もしある点で正なら、その点の近くに台を持つ非負で零でない滑らかな $\chi$ を選ぶと最後の積分は負です。負なら $\chi$ を同様に選べば正になります。いずれもすべての変分が零という仮定に反します。これは[QFT1の局所化の論証](../../QFT/QFT1/index.md#thm-qft1-field-el)を正の体積密度 $\sqrt{-\det g}$ で重み付けしたものです。したがって $P_g\phi=0$。逆向きは最後の積分式に代入すれば直ちに従います。
<!-- proof-end -->

境界で任意の値を許す変分には別の条件が必要です。例えば空間断面が閉じた時間スラブ $\Omega=(t_0,t_1)\times\Sigma$ で、変分が時間端点に達する場合、部分積分後に端点項が残ります。**内部の場の方程式**と**境界で固定するデータ**は別々に指定すべきものです。境界項の符号は演習で確認します。

## 4. 曲率の寄与を手で確かめる

一般の座標表示だけでは曲率結合がどう働くか見えません。時間軸と空間が直積になった**超静的な背景**を取りましょう。時間によらないRiemann計量 $h_{ij}(x)$ を持つ3次元空間 $\Sigma$ を用い、

$$
M=\mathbb R\times\Sigma,\qquad
g=-dt^2+h_{ij}(x)\,dx^i dx^j
$$

とします。$h$ は正定値で、空間のLaplacianを

$$
\Delta_h f
=\frac{1}{\sqrt{\det h}}\partial_i
\left(\sqrt{\det h}\,h^{ij}\partial_jf\right)
$$

とします。これは符号規約として通常のEuclid空間で $\sum_i\partial_i^2$ に戻るものです。空間一定の場を $\phi(t,x)=q(t)$ と置くと、$\partial_t\phi=dq/dt=\dot q$、$\partial_t^2\phi=d^2q/dt^2=\ddot q$、$\partial_i\phi=0$ です。点記法は時間 $t$ に関する通常の導関数を表し、一般の場に対する偏微分とは区別します。

<a id="prop-qcurv1-ultrastatic"></a>

<!-- formal-statement-start -->
> **命題（超静的背景での場の方程式）**
> 上記の滑らかな直積計量 $g=-dt^2+h$、$m\ge0$、$\xi\in\mathbb R$ において、$R_h$ を空間計量 $h$ のスカラー曲率とする。任意の滑らかな実スカラー場 $\phi$ に対し

$$
P_g\phi
=\partial_t^2\phi-\Delta_h\phi
+(m^2+\xi R_h)\phi.
$$

> とくに $\Sigma=S^3_a$ なら $R_h=6/a^2$ であり、空間的に一定の場 $\phi(t,x)=q(t)$ の方程式は

$$
\ddot q+\left(m^2+\frac{6\xi}{a^2}\right)q=0
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

時間方向の計量成分は一定で空間との交差項が零です。このため計量の行列式と曲率が空間側のものに還元され、[$P_g$ の座標表示](#prop-qcurv1-kg-coordinate)が時間二階微分と空間Laplacianに分かれます。

<!-- proof-start -->
### 証明

計量のブロック対角形から $g^{tt}=-1$、$g^{ti}=0$、$g^{ij}=h^{ij}$ および $\det g=-\det h$ を得ます。[$P_g$ の座標表示](#prop-qcurv1-kg-coordinate)で時間微分部分は

$$
-\frac{1}{\sqrt{\det h}}\partial_t
\left(\sqrt{\det h}\,(-1)\partial_t\phi\right)
=\partial_t^2\phi,
$$

空間微分部分は $-\Delta_h\phi$ です。

さらにChristoffel係数の式で $g_{tt}=-1$、$g_{ti}=0$、$\partial_t h_{ij}=0$ を使うと、時間添字を持つ係数はすべて零で、空間添字だけの係数は $h$ のChristoffel係数です。よって曲率テンソルの時間成分は零で、$R_g=R_h$。これで第一式が成立します。

$S^3_a$ の断面曲率は $1/a^2$ なので、[定曲率のRicci・スカラー曲率公式](../../GR/GR6/index.md#prop-gr6-constant-curvature)で $R_h=3(3-1)/a^2=6/a^2$ です。$\phi=q(t)$ なら $\partial_iq=0$ より $\Delta_hq=0$。第一式に代入して第二式を得ます。
<!-- proof-end -->

例えば $m=0,\xi=1/6$ のとき係数は $1/a^2$ なので $q(t)=\cos(t/a)$ は解です。微分して $\ddot q=-a^{-2}\cos(t/a)$ を代入すれば直接確認できます。同じ背景でも $\xi=0,m=0$ なら $q=1$ が解です。**背景が同じでも曲率結合の選択で時間発展は変わる**のです。

一方、$m^2+6\xi/a^2<0$ なら $q$ は指数的に増える解を持ちます。これはこの模型での不安定性であり、Cauchy解の一意性の破れを意味しません。「方程式が一意に解ける」と「解が振動して有界に保たれる」は違う条件です。

## 5. どの条件で初期値から一意に決まるか

時間発展を論じるには、ある一枚の空間面で場の値と時間方向の微分を指定します。[HPDE6の法線初期データ](../../../解析系/HPDE/HPDE6/index.md#def-hpde6-cauchy-data)に従い、滑らかな空間的Cauchy超曲面 $\Sigma$、未来向き単位法線 $n$ を取り、

$$
f=\phi|_\Sigma,\qquad h=n^a\nabla_a\phi|_\Sigma
$$

を与えます。$f$ と $h$ はそれぞれ場の初期値・法線方向微分です。ここで初期データの $h$ は第4節の空間計量 $h_{ij}$ とは異なる量です。量子論で状態を与える操作とはまだ異なります。

<a id="cor-qcurv1-cauchy"></a>

<!-- formal-statement-start -->
> **系（曲率結合場の大域Cauchy問題）**
> $(M,g)$ を境界のない時間向き付き滑らかな4次元大域双曲Lorentz時空、$\Sigma$ を滑らかな空間的Cauchy超曲面、$n$ をその未来向き単位法線とする。$m\ge0$、$\xi\in\mathbb R$ を定数、$R$ を滑らかなスカラー曲率とする。このとき任意の $f,h\in C_c^\infty(\Sigma,\mathbb R)$ に対し、滑らかな実スカラー場 $\phi$ がただ一つ存在して

$$
P_g\phi=0,\qquad
\phi|_\Sigma=f,\qquad n^a\nabla_a\phi|_\Sigma=h
$$

> を満たす。$K=\operatorname{supp}f\cup\operatorname{supp}h$ とすれば $\operatorname{supp}\phi\subset J^+(K)\cup J^-(K)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

方程式の最高階部分が計量 $g$ により決まるため、低階の曲率項は双曲型性を壊しません。コンパクト支持データに対して、[HPDE16の大域Cauchy定理](../../../解析系/HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)の仮定を一つずつ確認して適用します。

<!-- proof-start -->
### 証明

[normally hyperbolic作用素の定義](../../../解析系/HPDE/HPDE5/index.md#def-hpde5-normally-hyperbolic)の最高階係数は $-g^{ab}$ です。実際

$$
P_g\phi=-g^{ab}(\partial_a\partial_b\phi
-\Gamma^c{}_{ab}\partial_c\phi)+V\phi
$$

であり、$V=m^2+\xi R$ は滑らかな零次係数です。よって $P_g$ は実の自明な1次元ベクトル束上のnormally hyperbolic作用素です。[HPDE5の一意接続表示](../../../解析系/HPDE/HPDE5/index.md#thm-hpde5-unique-connection)をこの式の一次係数へ照合すると、$P_g$ の接続はスカラーのLevi-Civita接続 $\nabla_a\phi=\partial_a\phi$ です。その法線微分は $\nabla_n\phi=n^a\partial_a\phi$ となります。

$M$ の大域双曲性、$\Sigma$ の滑らかな空間的Cauchy性、初期データのコンパクト支持と正則性が[HPDE16の大域Cauchy定理](../../../解析系/HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)の対応条件です。その定理へ代入する対象は

$$
E=M\times\mathbb R,\qquad
P=P_g,\qquad
f_{\mathrm{source}}=0,\qquad
(u_0,u_1)=(f,h)
$$

です。この同定で一意な滑らかな大域解が存在します。さらに源を零とした同定理の支持評価は

$$
\operatorname{supp}\phi\cap J^\pm(\Sigma)
\subset J^\pm(K)
$$

となります。これら未来側・過去側の包含を合わせれば系の支持条件が従います。
<!-- proof-end -->

### 例：Minkowski初期データの外には信号が出ない

$M=\mathbb R^{1,3}$、$\Sigma=\{t=0\}$ とします。初期データ $f,h$ が半径 $L$ の球 $|\boldsymbol x|\le L$ の内側に台を持つなら、未来向き・過去向きの因果曲線の空間速度は1以下です。初期点 $\boldsymbol y$ から時刻 $t$ の点 $\boldsymbol x$ へ届くには

$$
|\boldsymbol x-\boldsymbol y|\le |t|
$$

が必要です。初期点で $|\boldsymbol y|\le L$ を使い三角不等式を取ると

$$
|\boldsymbol x|\le |\boldsymbol y|+|\boldsymbol x-\boldsymbol y|
\le L+|t|.
$$

従って $|\boldsymbol x|>L+|t|$ では解は零です。質量項があっても伝播の**最大速度**は変わらず、これは方程式の最高階部分が因果錐を決めるためです。

大域双曲性を落とすと、初期面を通らない光線が欠けた境界から入る可能性があり、上の定理の存在一意性をそのまま援用できません。実際、Minkowski時空の開半空間 $M=\{(t,x,y,z):x>0\}$ で $m=\xi=0$ とします。非零の滑らかな関数 $F\in C_c^\infty((0,1))$ を選び、

$$
\phi(t,x,y,z)=F(t-x)
$$

と置きます。二階微分は

$$
\partial_t^2\phi=\partial_x^2\phi=F''(t-x),
\qquad \partial_y^2\phi=\partial_z^2\phi=0
$$

なので $P_g\phi=0$ です。初期面 $t=0,x>0$ では $F(-x)=F'(-x)=0$ だから初期値はすべて零ですが、$t-x\in(0,1)$ の点では場が非零になり得ます。零解と区別できない初期データを持つのは、欠けた面 $x=0$ から入射する光線が初期面と交わらないためです。

この半空間の $t=0$ はCauchy面ではありません。例えば点 $p=(0,1,0,0)$、$q=(2,1,0,0)$ の因果ダイヤモンドには

$$
r_n=(1,1/n,0,0)\qquad(n=1,2,\ldots)
$$

が含まれますが、列は $x=0$ に近づいて時空内の極限を持たず、ダイヤモンドはコンパクトでありません。**失われたのは大域双曲性と欠けた境界からのデータの制御**です。

## 6. 古典解が決まっても、真空は決まらない

本章で選んだのは背景 $(M,g)$、場の種類、$m,\xi$、初期データです。これらから古典的な $\phi$ は一意に決まります。しかし量子化では、複素解の中から「正の振動数」をどう選ぶか、そしてどの状態の二点関数を使うかがさらに必要です。

[QFT4のFock量子化](../../QFT/QFT4/index.md#def-qft4-fock-space)は平坦時空の時間並進と結び付きます。一般の曲がった背景には、その役目をする時間並進対称性が存在するとは限りません。次は、既に構成した古典解空間から内積・モード・状態を作る過程と、その選択がどこで入るかを扱います。古典的Cauchy定理だけから一意の真空や粒子数が従うわけではありません。

## 演習

### Level A：符号・体積・定義の確認

<a id="ex-qcurv1-a01"></a>
#### QCURV1-A01 平坦時空で二つの符号規約を照合する
- Level: A

$\eta_{-+++}=\operatorname{diag}(-1,1,1,1)$、$m\ge0$、$R=0$ とする。本章の $P_g=-\Box_g+m^2$ を座標微分で書き、QFT1の $\Box_{+---}=\partial_t^2-\Delta$ を使った $(\Box_{+---}+m^2)$ との一致を示せ。

<!-- solution-start -->
**詳細解答。** $\eta_{-+++}^{tt}=-1$、$\eta_{-+++}^{ij}=\delta^{ij}$ で接続係数が零なので

$$
\Box_g=-\partial_t^2+\sum_{i=1}^3\partial_i^2
=-\partial_t^2+\Delta.
$$

従って $-\Box_g+m^2=\partial_t^2-\Delta+m^2$。これは[QFT1のKlein–Gordon方程式](../../QFT/QFT1/index.md#def-qft1-klein-gordon)に現れた $\Box_{+---}+m^2$ と同じ作用素です。$\Box$ そのものの符号と物理方程式の符号を区別します。
<!-- solution-end -->

<a id="ex-qcurv1-a02"></a>
#### QCURV1-A02 非一定lapseの体積密度と波動演算子
- Level: A

$M=\mathbb R^4$ に $g=-N(x)^2dt^2+dx^2+dy^2+dz^2$ を置く。ただし $N(x)>0$ は滑らかで時間によらない。$\sqrt{-\det g}$ と $\Box_g\phi$ を求めよ（$R$ は計算しなくてよい）。

<!-- solution-start -->
**詳細解答。** 計量行列は対角で $\det g=-N(x)^2$、正の平方根は $N(x)$ です。逆計量は $g^{tt}=-N^{-2}$、$g^{xx}=g^{yy}=g^{zz}=1$。[$\Box_g$ の座標表示](#prop-qcurv1-kg-coordinate)の負号を外して代入すると

$$
\begin{aligned}
\Box_g\phi
&=\frac1N\partial_t\left(-\frac1N\partial_t\phi\right)
+\frac1N\partial_x(N\partial_x\phi)\\
&\quad+\frac1N\partial_y(N\partial_y\phi)
+\frac1N\partial_z(N\partial_z\phi).
\end{aligned}
$$

ここで $N'(x)=dN/dx$ と記します。$\partial_tN=\partial_yN=\partial_zN=0$ なので

$$
\Box_g\phi=-N^{-2}\partial_t^2\phi
+\partial_x^2\phi+\frac{N'}N\partial_x\phi
+\partial_y^2\phi+\partial_z^2\phi.
$$

$x$ 方向だけに一次微分の補正が残ります。
<!-- solution-end -->

<a id="ex-qcurv1-a03"></a>
#### QCURV1-A03 定数場が解になる条件
- Level: A

$M=\mathbb R\times S^3_a$、$g=-dt^2+h_a$、$a>0$、$R=6/a^2$、$m\ge0$、$\xi\in\mathbb R$ とする。$\phi=c$（実定数）が曲率結合Klein–Gordon方程式を満たす必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答。** 定数場には $\nabla_a c=0$、$\Box_gc=0$ です。[作用素の定義](#def-qcurv1-kg-operator)へ代入すると

$$
P_gc=\left(m^2+\frac{6\xi}{a^2}\right)c.
$$

よって必要十分条件は $c=0$、または $m^2+6\xi/a^2=0$ です。特に $\xi=0,m>0$ なら零場だけ、$\xi=0,m=0$ なら任意の定数場が解です。単なるスカラー場の定義は非零定数を禁じませんが、方程式は追加条件を課します。
<!-- solution-end -->

<a id="ex-qcurv1-a04"></a>
#### QCURV1-A04 共形結合の空間一定モード
- Level: A

$M=\mathbb R\times S^3_a$、$g=-dt^2+h_a$、$a>0$、$R=6/a^2$ とする。$m=0,\xi=1/6$、$\phi(t,x)=q(t)$ の場合、$q(t)=\cos(t/a)$ が解であり、$q(0)=1,\dot q(0)=0$ となることを確認せよ。

<!-- solution-start -->
**詳細解答。** [超静的背景の方程式](#prop-qcurv1-ultrastatic)は $\ddot q+(6\xi/a^2)q=0$。$\xi=1/6$ を入れると $\ddot q+a^{-2}q=0$ です。$q(t)=\cos(t/a)$ を微分して

$$
\dot q(t)=-a^{-1}\sin(t/a),\qquad
\ddot q(t)=-a^{-2}\cos(t/a).
$$

よって $\ddot q+a^{-2}q=0$、また $q(0)=1$、$\dot q(0)=0$ です。質量零でも曲率結合によりこの空間一定モードには復元力が生じます。
<!-- solution-end -->

<a id="ex-qcurv1-a05"></a>
#### QCURV1-A05 曲率ポテンシャルだけの第一変分
- Level: A

固定背景上の相対コンパクト領域 $\Omega$ で滑らかな $V=m^2+\xi R$ と実スカラー場 $\phi$ を固定し、$S_{\rm pot}[\phi]=-\frac12\int_\Omega V\phi^2d\mathrm{vol}_g$ とする。$\chi\in C_c^\infty(\Omega)$ による第一変分を求めよ。

<!-- solution-start -->
**詳細解答。** 背景を変えないので $V$ と $d\mathrm{vol}_g$ は $\varepsilon$ に依存しません。

$$
(\phi+\varepsilon\chi)^2
=\phi^2+2\varepsilon\phi\chi+\varepsilon^2\chi^2
$$

を代入して $\varepsilon=0$ で微分すると

$$
\delta_\phi S_{\rm pot}[\phi;\chi]
=-\frac12\int_\Omega 2V\phi\chi\,d\mathrm{vol}_g
=-\int_\Omega V\phi\chi\,d\mathrm{vol}_g.
$$

この変分だけからは微分項 $-\Box_g\phi$ は出ません。$g$ の変分なら $\delta R$ や体積要素の変分も必要ですが、この設問では行いません。
<!-- solution-end -->

### Level B：導出と定理の適用条件

<a id="ex-qcurv1-b01"></a>
#### QCURV1-B01 計量密度からEuler–Lagrange方程式
- Level: B

4次元の滑らかな固定Lorentz背景 $(M,g)$ の一つの座標近傍に含まれる相対コンパクト開領域 $\Omega$ 上で、$\chi\in C_c^\infty(\Omega)$ とする。$V=m^2+\xi R$、$S_\Omega[\phi;g]=-\frac12\int_\Omega(g^{ab}\partial_a\phi\partial_b\phi+V\phi^2)\sqrt{-\det g}\,d^4x$ から、座標微分だけで停留条件の局所式を導け。

<!-- solution-start -->
**詳細解答。** $\rho=\sqrt{-\det g}>0$ と略記します。$\rho,g^{ab},V$ は固定なので、変分で

$$
\delta_\phi S_\Omega
=-\int_\Omega\rho\left(g^{ab}\partial_a\phi\partial_b\chi
+V\phi\chi\right)d^4x
$$

です。積の微分を

$$
\partial_b(\rho g^{ab}\partial_a\phi\,\chi)
=\partial_b(\rho g^{ab}\partial_a\phi)\chi
+\rho g^{ab}\partial_a\phi\partial_b\chi
$$

と展開して第一項を移項すると

$$
\delta_\phi S_\Omega
=\int_\Omega\left[
\partial_b(\rho g^{ab}\partial_a\phi)-\rho V\phi
\right]\chi\,d^4x,
$$

となります。全微分の積分は $\chi$ のコンパクト支持により零です。任意の試験関数で積分が零なら係数が零なので、$\rho>0$ で割って

$$
\frac1\rho\partial_b(\rho g^{ab}\partial_a\phi)-V\phi=0.
$$

[作用素の座標表示](#prop-qcurv1-kg-coordinate)と照合するとこれは $\Box_g\phi-V\phi=0$、すなわち $P_g\phi=0$ です。$a,b$ の交換には $g^{ab}=g^{ba}$ を使いました。
<!-- solution-end -->

<a id="ex-qcurv1-b02"></a>
#### QCURV1-B02 球面背景の安定性と一意性
- Level: B

$M=\mathbb R\times S^3_a$、$g=-dt^2+h_a$、$R=6/a^2$、$m\ge0$ とし、$\phi=q(t)$ を考える。$\omega_0^2=m^2+6\xi/a^2$ と置く。初期値 $q(0)=q_0,\dot q(0)=v_0$ に対して $\omega_0^2>0$、$=0$、$<0$ の解をそれぞれ求め、最後の場合に一意性が壊れるか答えよ。

<!-- solution-start -->
**詳細解答。** [超静的背景の方程式](#prop-qcurv1-ultrastatic)は $\ddot q+\omega_0^2q=0$ です。

1. $\omega_0^2>0$ のとき $\omega_0>0$ を正の平方根として、$q=q_0\cos(\omega_0t)+(v_0/\omega_0)\sin(\omega_0t)$。$t=0$ とその微分に初期値を代入して係数を決めました。
2. $\omega_0^2=0$ なら $\ddot q=0$ を二回積分して $q=q_0+v_0t$ です。
3. $\omega_0^2<0$ なら $\lambda=\sqrt{-\omega_0^2}>0$ を置き、$\ddot q-\lambda^2q=0$ から $q=q_0\cosh(\lambda t)+(v_0/\lambda)\sinh(\lambda t)$ です。

第三の場合は一般に指数増大しますが、上式の係数は初期値から一意に決まっています。特に $q_0=v_0=0$ なら恒等零解だけです。増大という**安定性**の問題と、データからの**一意性**は異なります。
<!-- solution-end -->

<a id="ex-qcurv1-b03"></a>
#### QCURV1-B03 初期値と有限伝播の確認
- Level: B

4次元Minkowski時空 $g=-dt^2+d\boldsymbol x^2$ で $m\ge0$、$\xi\in\mathbb R$、$R=0$ とする。$t=0$ に滑らかで台が $|\boldsymbol x|\le L$ に含まれる実初期データ $f,h$ を与える。大域解の存在一意性を既出定理から示し、時刻 $t$ の支持が $|\boldsymbol x|\le L+|t|$ に含まれることを示せ。

<!-- solution-start -->
**詳細解答。** 背景は境界のない時間向き付き大域双曲時空、$t=0$ は滑らかな空間的Cauchy面、$P=\partial_t^2-\Delta+m^2$ は滑らかなnormally hyperbolic作用素です。$f,h$ は問題の仮定により $C_c^\infty$ です。よって[本章のCauchy系](#cor-qcurv1-cauchy)が適用でき、一意の大域解があります。

支持の初期集合 $K$ は半径 $L$ の閉球に含まれます。$\operatorname{supp}\phi\subset J^+(K)\cup J^-(K)$ なので、解が零でない点 $(t,\boldsymbol x)$ には $K$ 内のある初期点 $(0,\boldsymbol y)$ との因果関係があります。Minkowski計量の因果速度条件より $|\boldsymbol x-\boldsymbol y|\le|t|$。従って

$$
|\boldsymbol x|\le|\boldsymbol x-\boldsymbol y|+|\boldsymbol y|
\le |t|+L.
$$

これが有限伝播の主張です。質量項の値はこの支持の上界に入りません。
<!-- solution-end -->

<a id="ex-qcurv1-b04"></a>
#### QCURV1-B04 時間端点を固定しない変分
- Level: B

$M=\mathbb R\times S^3_a$、$g=-dt^2+h_a$、$R=6/a^2$、$V=m^2+\xi R$、$m\ge0$、$\xi\in\mathbb R$ とする。空間一定場 $\phi=q(t)$ を $[t_0,t_1]$ 上で考え、$q$ の端点値を固定しない滑らかな変分 $\chi(t)$ に対する作用の第一変分を計算せよ。内部方程式と端点項を区別せよ。

<!-- solution-start -->
**詳細解答。** $C=\operatorname{Vol}(S^3_a)>0$ とすると、空間積分を実行した作用は

$$
S[q]=\frac C2\int_{t_0}^{t_1}(\dot q^2-Vq^2)\,dt
$$

です。変分で $\delta S=C\int(\dot q\dot\chi-Vq\chi)dt$。積の微分を使い、

$$
\dot q\dot\chi=\frac{d}{dt}(\dot q\chi)-\ddot q\chi
$$

なので

$$
\delta S
=C[\dot q\chi]_{t_0}^{t_1}
-C\int_{t_0}^{t_1}(\ddot q+Vq)\chi\,dt.
$$

内部でのみ台を持つ $\chi$ なら端点項が零となり $\ddot q+Vq=0$ が従います。端点でも任意の $\chi$ を許して作用の停留を要求するなら、内部方程式に加えて $\dot q(t_0)=\dot q(t_1)=0$ が境界からの追加条件として必要です。通常の初期値問題では二つの端点を自由に変分するわけではありません。
<!-- solution-end -->

### Level C：幾何・変分・初期値をつなぐ

<a id="ex-qcurv1-c01"></a>
#### QCURV1-C01 Einstein静的宇宙の二つの場
- Level: C

$M=\mathbb R\times S^3_a$、$g=-dt^2+h_a$（$a>0$）、$R=6/a^2$ とし、有限な時刻 $t_0<0<t_1$ に対して作用の領域を $\Omega=(t_0,t_1)\times S^3_a$ とする。実スカラー場は空間一定 $\phi(t,x)=q(t)$、$m=0$ とし、初期値 $q(0)=1,\dot q(0)=0$ を与える。

1. $S_\Omega[q]$ を空間積分した形へ直し、$(t_0,t_1)$ 内にコンパクトな台を持つ時間変分で運動方程式を導け。
2. $\xi=0$ と $\xi=1/6$ の二場合で初期値を満たす解をそれぞれ求めよ。
3. $\xi=1/6$ の場合、$E=(C/2)(\dot q^2+a^{-2}q^2)$（$C=\operatorname{Vol}(S^3_a)$）が保存することを微分で示し、初期値から値を求めよ。
4. 二場合で背景時空と初期データは同じなのに時間発展が異なる理由と、ここから量子真空の一意性が従わない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $\partial_iq=0$、$g^{tt}=-1$、$V=6\xi/a^2$ を[作用の定義](#def-qcurv1-curved-action)へ代入します。時空体積要素は $dt\,d\mathrm{vol}_{h_a}$ なので、

$$
\begin{aligned}
S_\Omega[q]
&=-\frac12\int_{t_0}^{t_1}dt\int_{S^3_a}
(-\dot q^2+6\xi a^{-2}q^2)\,d\mathrm{vol}_{h_a}\\
&=\frac C2\int_{t_0}^{t_1}(\dot q^2-6\xi a^{-2}q^2)\,dt.
\end{aligned}
$$

$(t_0,t_1)$ の内部にコンパクトな台を持つ変分 $q+\varepsilon\chi$ を使うと、

$$
\delta S=C\int_{t_0}^{t_1}(\dot q\dot\chi-6\xi a^{-2}q\chi)\,dt.
$$

部分積分で端点項が零になり、

$$
\delta S=-C\int_{t_0}^{t_1}(\ddot q+6\xi a^{-2}q)\chi\,dt.
$$

$C>0$ と試験関数の任意性から $\ddot q+6\xi a^{-2}q=0$ を得ます。

(2) $\xi=0$ なら $\ddot q=0$、一般解 $q=A+Bt$ の初期値から $A=1,B=0$、よって $q(t)=1$ です。$\xi=1/6$ なら $\ddot q+a^{-2}q=0$、一般解 $q=A\cos(t/a)+B\sin(t/a)$ の初期値から $A=1,B=0$、よって $q(t)=\cos(t/a)$ です。

(3) 時間で微分して積の微分を明示すると、

$$
\frac{dE}{dt}
=\frac C2(2\dot q\ddot q+2a^{-2}q\dot q)
=C\dot q(\ddot q+a^{-2}q)=0.
$$

最後は(2)の方程式を使用しました。初期値を代入して $E(0)=C/(2a^2)$、従ってすべての時刻で $E=C/(2a^2)$ です。これはこの古典モードの保存量であり、量子状態で測るエネルギーを計算したわけではありません。

(4) 背景と初期値は共通ですが、作用の係数 $\xi$ が違い、$R=6/a^2\ne0$ が $\xi Rq$ として運動方程式へ入るため、解が異なります。$\xi$ を固定すれば[大域Cauchy系](#cor-qcurv1-cauchy)は各々の古典解を一意に決めます。しかし量子化では古典解空間からの正振動数分解や二点関数の状態を別に指定する必要があります。古典初期値の一意性だけでそれらの選択は定まりません。
<!-- solution-end -->
