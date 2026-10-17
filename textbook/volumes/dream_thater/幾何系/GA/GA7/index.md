# GA7 Bochner--Weitzenböck公式・曲率と解析

## 1. 微分を二回しただけでは曲率が見えない

[GA6のHodge Laplacian](../GA6/index.md#def-ga6-hodge-laplacian)は微分形式の外微分と余微分から作られ、調和1形式が位相を表すことまで分かりました。一方、[GEO16のRicci曲率](../../GEO/GEO16/index.md#def-geo16-ricci-scalar)は、接続を異なる順で微分したときのずれを縮約した量です。両者は一見別々ですが、1形式を「外微分と余微分で二回微分する」方法と「接続で二回微分する」方法を比べると、差としてRicci曲率が現れます。

まず以後の対象と符号を固定します。$(M^d,g)$ は滑らかな $d\ge2$ 次元Riemann多様体、$\nabla$ はLevi-Civita接続です。[GEO16の曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature)は

$$
R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
$$

という符号に従います。関数のLaplacianは $\Delta_g=\operatorname{div}_g\nabla_g$（非正）、微分形式のLaplacianは $\Delta_H=d\delta+\delta d$（非負）です。正規直交標構とは、各点で接ベクトルの内積がKronecker記号になる局所ベクトル場 $e_1,\ldots,e_d$ の組です。

接続は[GEO13のテンソルの共変微分](../../GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)に従って1形式にも作用します。例えば $\alpha$ が1形式なら

$$
(\nabla_X\alpha)(Y)=X(\alpha(Y))-\alpha(\nabla_XY).
$$

単なる成分ごとの二階偏微分では座標変換に耐えないので、接続で補正した二階演算を作ります。

<a id="def-ga7-rough-laplacian"></a>

<!-- formal-statement-start -->
> **定義（接続Laplacian）**  
> Riemann多様体 $(M^d,g)$ のLevi-Civita接続 $\nabla$ と、滑らかな1形式 $\alpha$ に対し、正規直交標構 $e_1,\ldots,e_d$ を用いて

$$
\nabla^*\nabla\alpha
=-\sum_{i=1}^d\left(
\nabla_{e_i}\nabla_{e_i}\alpha
-\nabla_{\nabla_{e_i}e_i}\alpha
\right)
$$

> と定める。これを1形式上の**接続Laplacian**（粗Laplacian）と呼ぶ。0形式（関数）に対しては $\nabla^*\nabla f=-\Delta_g f$ とする。
<!-- formal-statement-end -->

この式は二階共変微分の計量による縮約に負号を付けたものです。したがって正規直交標構を替えても変わりません。座標 $(x^i)$ では二階共変微分の成分を $\nabla_i\nabla_j\alpha$ と書くと

$$
(\nabla^*\nabla\alpha)_k=-g^{ij}(\nabla_i\nabla_j\alpha)_k.
$$

ここで $\nabla_i\nabla_j\alpha$ は最初の微分添字 $j$ も共変テンソルの添字として微分したものです。そのため標構式に現れる補正項を含みます。

<!-- definition-example-start: def-ga7-rough-laplacian -->
**定義の確認**（平坦トーラス）：$\mathbb T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ に標準計量を入れ、$\alpha=\sin x\,dy$ とします。大域的な正規直交標構 $\partial_x,\partial_y$ は平行なので $\nabla_{\partial_i}\partial_i=0$。また

$$
\nabla_{\partial_x}\alpha=\cos x\,dy,\qquad
\nabla_{\partial_y}\alpha=0.
$$

さらに $\nabla_{\partial_x}\nabla_{\partial_x}\alpha=-\sin x\,dy$ です。よって

$$
\nabla^*\nabla\alpha
=-(-\sin x\,dy+0)=\sin x\,dy.
$$

各補正項と符号を定義から確認できました。平坦だから曲率項は零で、[GA6の同じ形式のHodge計算](../GA6/index.md#def-ga6-hodge-laplacian)とも一致します。
<!-- definition-example-end -->

閉多様体（コンパクト・境界なし）上では積の微分を積分し、[GA1のGreen公式](../GA1/index.md#thm-ga1-green-first)と同じ発散定理の議論を各成分へ適用すると

$$
(\nabla^*\nabla\alpha,\beta)_2
=\int_M\langle\nabla\alpha,\nabla\beta\rangle\,dV_g
$$

が滑らかな1形式 $\alpha,\beta$ に成立します。右辺は計量を使った二階テンソルの内積です。これが $\nabla^*$ という表記の意味であり、境界ありでは法線方向の境界項が残ります。

## 2. 微分順序を交換するとRicci曲率が残る

曲率によるずれを求めるため、一点 $p$ で $\nabla_{e_i}e_j=0$ となる正規直交標構を選びます。このような標構は[GEO16の正規座標での接続係数消去](../../GEO/GEO16/index.md#prop-geo16-normal-coordinate-second-derivatives)から作れます。ただし、接続係数はその点で零でもその微分は一般に零ではありません。

1形式 $\alpha$ について、外微分と余微分はその点で

$$
(d\alpha)_{ij}=\nabla_i\alpha_j-\nabla_j\alpha_i,\qquad
\delta\alpha=-\nabla^i\alpha_i
$$

と書けます。前者は接続の捩率が零であること、後者は[GA6の余微分](../GA6/index.md#def-ga6-codifferential)の局所式によります。上付き添字は計量による縮約、反復添字は和を表します。

<a id="lem-ga7-covector-commutator"></a>

<!-- formal-statement-start -->
> **補題（1形式の共変微分交換公式）**  
> Riemann多様体 $(M^d,g)$ 上の滑らかな1形式 $\alpha$ と接ベクトル場 $X,Y,Z$ に対し、Levi-Civita接続の曲率が上の符号で定義されるなら

$$
([\nabla_X,\nabla_Y]\alpha)(Z)
-\nabla_{[X,Y]}\alpha(Z)
=-\alpha(R(X,Y)Z)
$$

> が成立する。ここで交換子の左辺は1形式への作用として評価する。
<!-- formal-statement-end -->

### 証明の見取り図

共変微分が評価 $\alpha(Z)$ と積を取る際の規則を2回適用します。$Z$ の共変微分から生じる項が、ベクトルの曲率作用素を負号付きで作ります。

<!-- proof-start -->
### 証明

座標 $(x^i)$ でLevi-Civita接続の係数を $\Gamma^m_{ik}$ と記します。[GEO13の共変微分の座標表示](../../GEO/GEO13/index.md#prop-geo13-tensor-coordinate)に従って

$$
\nabla_i\alpha_k=\partial_i\alpha_k-\Gamma^m_{ik}\alpha_m,
$$

さらに微分添字 $j$ 自体も共変に微分するので

$$
(\nabla_i\nabla_j\alpha)_k
=\partial_i(\nabla_j\alpha_k)
-\Gamma^m_{ij}\nabla_m\alpha_k
-\Gamma^m_{ik}\nabla_j\alpha_m.
$$

この式と $i,j$ を交換した式の差を取ります。$\Gamma^m_{ij}=\Gamma^m_{ji}$（捩率零）なので、方向添字の補正項は相殺されます。残る $\partial_i\partial_j\alpha_k-\partial_j\partial_i\alpha_k$ も零です。従って

$$
\begin{aligned}
(\nabla_i\nabla_j-\nabla_j\nabla_i)\alpha_k
={}&-\bigl(
\partial_i\Gamma^m_{jk}-\partial_j\Gamma^m_{ik}\\
&\quad+\Gamma^m_{i\ell}\Gamma^\ell_{jk}
-\Gamma^m_{j\ell}\Gamma^\ell_{ik}
\bigr)\alpha_m\\
={}&-R^m{}_{kij}\alpha_m.
\end{aligned}
$$

最後の係数は[GEO16の曲率作用素の座標式](../../GEO/GEO16/index.md#prop-geo16-tensoriality-coordinate)です。座標方向は可換なので $[\,\partial_i,\partial_j\,]=0$ です。一般のベクトル場 $X,Y$ では $-\nabla_{[X,Y]}\alpha$ を加えた左辺がテンソルになり、各点で座標基底へ展開すれば

$$
([\nabla_X,\nabla_Y]\alpha-\nabla_{[X,Y]}\alpha)(Z)
=-\alpha(R(X,Y)Z)
$$

を得ます。
<!-- proof-end -->

この交換子は、単純に二階微分を入れ替えたときの「ずれ」を記録しています。縮約した形も導いておきます。$p$ で正規直交標構を使い、$\alpha^\sharp$ を1形式の計量双対とすると

$$
\begin{aligned}
\sum_i([\nabla_{e_i},\nabla_{e_j}]\alpha)(e_i)
&=-\sum_i\alpha(R(e_i,e_j)e_i)\\
&=\sum_i\langle R(e_i,e_j)\alpha^\sharp,e_i\rangle\\
&=\operatorname{Ric}(e_j,\alpha^\sharp).
\end{aligned}
$$

二行目では[曲率の計量反対称性](../../GEO/GEO16/index.md#thm-geo16-curvature-symmetries)を、三行目では[Ricci曲率の定義](../../GEO/GEO16/index.md#def-geo16-ricci-scalar)を使いました。これはRicci項の正号を確定する最重要計算です。

<a id="thm-ga7-weitzenbock"></a>

<!-- formal-statement-start -->
> **定理（1形式のBochner--Weitzenböck公式）**  
> 任意の滑らかなRiemann多様体 $(M^d,g)$ 上の滑らかな1形式 $\alpha$ に対し、Hodge Laplacian $\Delta_H=d\delta+\delta d$、接続Laplacian $\nabla^*\nabla$ を上の規約で取ると

$$
\Delta_H\alpha=\nabla^*\nabla\alpha+\operatorname{Ric}^{\sharp}(\alpha)
$$

> が成り立つ。最後の1形式は、任意のベクトル $X$ に対し $(\operatorname{Ric}^{\sharp}\alpha)(X)=\operatorname{Ric}(X,\alpha^\sharp)$ で定義する。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta d$ と $d\delta$ を座標で展開します。一方は接続Laplacianになり、残った微分交換子に[1形式の共変微分交換公式](#lem-ga7-covector-commutator)を適用するとRicci曲率になります。

<!-- proof-start -->
### 証明

任意の点 $p$ で正規直交標構を取り、$(d\alpha)_{ij}=\nabla_i\alpha_j-\nabla_j\alpha_i$ を余微分に代入します。$p$ では標構の一階接続係数が零なので

$$
(\delta d\alpha)_j=-\nabla^i(d\alpha)_{ij}
=-\nabla^i\nabla_i\alpha_j+\nabla^i\nabla_j\alpha_i.
$$

また $\delta\alpha=-\nabla^i\alpha_i$ は0形式だから

$$
(d\delta\alpha)_j=-\nabla_j\nabla^i\alpha_i.
$$

二式を加え、計量両立性により $\nabla g=0$ を使えば

$$
(\Delta_H\alpha)_j
=-\nabla^i\nabla_i\alpha_j
+(\nabla^i\nabla_j-\nabla_j\nabla^i)\alpha_i.
$$

第一項は[接続Laplacian](#def-ga7-rough-laplacian)です。第二項は補題の縮約計算から $\operatorname{Ric}(e_j,\alpha^\sharp)$ となります。任意の点で成立するテンソルの等式なので全多様体で成立します。
<!-- proof-end -->

この恒等式は境界の有無に依存しない**点ごとの公式**です。しかし次節で積分して消滅定理を得るには、境界項が零になる別の理由が必要です。

## 3. 関数のBochner恒等式

1形式へ $\alpha=du$ を代入します。関数 $u$ のHessian（共変二階微分）は対称2階テンソル

$$
\nabla^2u(X,Y)=X(Yu)-(\nabla_XY)u
$$

であり、$du$ の共変微分に一致します。$\nabla^2u$ の計量による二乗ノルムを $|\nabla^2u|^2$ と書きます。[GEO13のテンソル共変微分](../../GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)から作る量です。

<a id="thm-ga7-scalar-bochner"></a>

<!-- formal-statement-start -->
> **定理（関数のBochner恒等式）**  
> 滑らかなRiemann多様体 $(M^d,g)$ 上の任意の $u\in C^\infty(M)$ に対し、$\Delta_g=\operatorname{div}_g\nabla_g$ とすると

$$
\frac12\Delta_g|\nabla_gu|^2
=|\nabla^2u|^2+
\langle\nabla_gu,\nabla_g\Delta_gu\rangle+
\operatorname{Ric}(\nabla_gu,\nabla_gu)
$$

> が各点で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず接続の積の微分から勾配ノルムのLaplacianを展開します。次に[Weitzenböck公式](#thm-ga7-weitzenbock)を $du$ に適用し、$\Delta_Hdu=d\Delta_Hu=-d\Delta_gu$ と同定します。この段階でRicci項の符号が確定します。

<!-- proof-start -->
### 証明

$p$ で $\nabla_{e_i}e_j=0$ の正規直交標構を選び、$V=\nabla_gu$ と置きます。計量両立性より

$$
e_i|V|^2=2\langle\nabla_{e_i}V,V\rangle.
$$

再び $e_i$ で微分して縮約すると

$$
\begin{aligned}
\frac12\Delta_g|V|^2
&=\sum_i\left(
|\nabla_{e_i}V|^2
+\langle\nabla_{e_i}\nabla_{e_i}V,V\rangle
\right)\\
&=|\nabla^2u|^2
+\left\langle\sum_i\nabla_{e_i}\nabla_{e_i}V,V\right\rangle.
\end{aligned}
$$

次に[GA6のHodge Laplacian](../GA6/index.md#def-ga6-hodge-laplacian)の定義と $d^2=0$ から

$$
\Delta_H(du)=d\delta du=d(\Delta_Hu)=-d(\Delta_gu).
$$

一方、[本章のWeitzenböck公式](#thm-ga7-weitzenbock)を $\alpha=du$ に適用すると

$$
-\nabla^i\nabla_i(du)+\operatorname{Ric}^{\sharp}(du)
=-d(\Delta_gu).
$$

双方を計量双対でベクトルに直して移項すれば、$p$ において

$$
\sum_i\nabla_{e_i}\nabla_{e_i}V
=\nabla_g\Delta_gu+\operatorname{Ric}^{\sharp}(V)
$$

となります。これをノルムの二階微分の式に代入し、$V$ と内積を取れば結論です。
<!-- proof-end -->

**例：標準単位球面。** $S^d\subset\mathbb R^{d+1}$ 上の高さ関数 $u(x)=x_{d+1}$ を考えます。単位球面では[定断面曲率空間の Ricci 曲率とスカラー曲率](../../GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)から $\operatorname{Ric}=(d-1)g$、また球面の接ベクトル成分を微分すると

$$
\nabla^2u=-u g,\quad
\Delta_gu=-d\,u,\quad
|\nabla u|^2=1-u^2.
$$

左辺を直接計算すれば

$$
\frac12\Delta_g(1-u^2)
=-u\Delta_gu-|\nabla u|^2
=d\,u^2-(1-u^2).
$$

右辺では $|\nabla^2u|^2=d\,u^2$、$\langle\nabla u,\nabla\Delta_gu\rangle=-d|\nabla u|^2$、Ricci項は $(d-1)|\nabla u|^2$ です。合計は $d\,u^2-|\nabla u|^2$ と一致します。この段落の $d\,u^2$ は次元と関数値の二乗の積であり、外微分 $du$ と区別しています。

## 4. 曲率から調和形式の消滅へ

[GA6の調和形式](../GA6/index.md#def-ga6-harmonic-form)は $\Delta_H\alpha=0$ を満たします。この方程式に[Weitzenböck公式](#thm-ga7-weitzenbock)を代入して全体を積分すれば、曲率は非負の量を増やす方向に現れます。

<a id="thm-ga7-integrated-weitzenbock"></a>

<!-- formal-statement-start -->
> **定理（積分Weitzenböck恒等式）**  
> $(M^d,g)$ を滑らかな、向き付け可能なコンパクト境界なしRiemann多様体とする。任意の滑らかな1形式 $\alpha$ について

$$
\|d\alpha\|_2^2+\|\delta\alpha\|_2^2
=\|\nabla\alpha\|_2^2+
\int_M\operatorname{Ric}(\alpha^\sharp,\alpha^\sharp)\,dV_g
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左辺は[GA6のHodgeエネルギー恒等式](../GA6/index.md#thm-ga6-energy)、右辺の第一項は接続Laplacianを積分して生まれます。境界なしという仮定をここで使います。

<!-- proof-start -->
### 証明

[1形式のWeitzenböck公式](#thm-ga7-weitzenbock)に $\alpha$ との $L^2$ 内積を取り、

$$
(\Delta_H\alpha,\alpha)_2
=(\nabla^*\nabla\alpha,\alpha)_2
+\int_M\operatorname{Ric}(\alpha^\sharp,\alpha^\sharp)\,dV_g
$$

とします。[GA6の随伴関係](../GA6/index.md#prop-ga6-adjoint)から左辺は $\|d\alpha\|_2^2+\|\delta\alpha\|_2^2$ です。右辺の第一項は、$\nabla$ の計量両立性と発散定理によって $\|\nabla\alpha\|_2^2$ に等しくなります。具体的には局所正規直交標構で $\operatorname{div}\bigl(\sum_i\langle\nabla_{e_i}\alpha,\alpha\rangle e_i\bigr)$ を積分し、境界積分を零と置くと二階微分項が $\nabla^*\nabla$ に変わります。従って表示式を得ます。
<!-- proof-end -->

<a id="thm-ga7-bochner-vanishing"></a>

<!-- formal-statement-start -->
> **定理（Bochnerの調和1形式消滅定理）**  
> $(M^d,g)$ を連結・滑らか・向き付け可能・コンパクト・境界なしのRiemann多様体とする。各点の各接ベクトル $v$ について $\operatorname{Ric}(v,v)\ge0$ なら、すべての調和1形式は平行（$\nabla\alpha=0$）である。さらに各点で $v\ne0$ なら $\operatorname{Ric}(v,v)>0$ が成り立つ場合、調和1形式は零のみであり、実係数の第一de Rhamコホモロジー $H_{\mathrm{dR}}^1(M)$ は零である。
<!-- formal-statement-end -->

### 証明の見取り図

調和形式なら積分恒等式の左辺は零です。Ricci非負なら右辺が非負の二項の和なのでそれぞれ消えます。正値なら平行形式のどの点での値も零に押し込まれます。

<!-- proof-start -->
### 証明

$\alpha$ を滑らかな調和1形式とします。[GA6の調和性判定](../GA6/index.md#thm-ga6-energy)から $d\alpha=\delta\alpha=0$ です。これを[積分Weitzenböck恒等式](#thm-ga7-integrated-weitzenbock)に入れると

$$
0=\int_M|\nabla\alpha|^2\,dV_g+
\int_M\operatorname{Ric}(\alpha^\sharp,\alpha^\sharp)\,dV_g.
$$

両被積分関数は連続かつ非負です。第一積分が零なので $|\nabla\alpha|^2=0$ が各点で成立し、$\alpha$ は平行です。Ricci正値の場合、もしどこかの点で $\alpha^\sharp\ne0$ ならそこでRicci項が正となり、連続性により小さな近傍で積分が正になります。これは上式と矛盾します。従って $\alpha=0$ です。最後に[GA6のHodge--de Rham同型](../GA6/index.md#thm-ga6-hodge-de-rham)により $H_{\mathrm{dR}}^1(M)\simeq\mathcal H^1(M)=\{0\}$ を得ます。
<!-- proof-end -->

正値と非負は交換できません。標準平坦トーラスではRicciが零でも $dx,dy$ は平行で非零の調和1形式です。したがって非負曲率だけでは一次コホモロジーの消滅は導けません。

## 5. 曲率下界が第一固有値を押し上げる

関数についてもBochner恒等式を積分します。そこではHessianの二乗ノルムとLaplacianの二乗を比べる必要があります。なぜ次元で割るのかを、先に行列の不等式として確かめます。

<a id="lem-ga7-hessian-trace"></a>

<!-- formal-statement-start -->
> **補題（Hessianのトレース不等式）**  
> $(M^d,g)$ を $d\ge2$ 次元Riemann多様体とし、$u\in C^\infty(M)$ とする。任意の点で

$$
|\nabla^2u|^2\ge\frac{(\Delta_gu)^2}{d}
$$

> が成り立つ。等号はその点で $\nabla^2u=cg$ を満たす実数 $c$ がある場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

計量で正規直交基底を取るとHessianは実対称行列になります。固有値の和がトレース、固有値の二乗和が二乗ノルムです。

<!-- proof-start -->
### 証明

その点でのHessian行列を直交対角化し、固有値を $\mu_1,\ldots,\mu_d$ とします。実数ベクトル $(\mu_1,\ldots,\mu_d)$ と $(1,\ldots,1)$ のCauchy--Schwarz不等式から

$$
\left(\sum_i\mu_i\right)^2
\le\left(\sum_i\mu_i^2\right)\left(\sum_i1^2\right)
=d\sum_i\mu_i^2.
$$

Hessianのトレースは $\sum_i\mu_i=\Delta_gu$、二乗ノルムは $\sum_i\mu_i^2=|\nabla^2u|^2$ です。割り算して結論です。等号は全固有値が等しい場合、すなわちHessianが計量のスカラー倍になる場合に限ります。
<!-- proof-end -->

この補題が、解析と曲率の間に次元 $d$ を入れる箇所です。

<a id="thm-ga7-lichnerowicz"></a>

<!-- formal-statement-start -->
> **定理（Lichnerowiczの第一固有値下界）**  
> $(M^d,g)$ を連結・滑らか・コンパクト・境界なしの $d\ge2$ 次元Riemann多様体とする。ある定数 $K>0$ について

$$
\operatorname{Ric}(v,v)\ge(d-1)K\,g(v,v)
$$

> が各点・各接ベクトル $v$ で成り立つとする。このとき非負作用素 $-\Delta_g$ の最小の正固有値 $\lambda_1$ は

$$
\lambda_1\ge dK
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[GA4のスペクトル定理](../GA4/index.md#thm-ga4-spectral-basis)から第一固有関数を取ります。積分したBochner恒等式で $|\nabla^2u|^2$ をトレースの二乗で下から評価し、$\int|\nabla u|^2=\lambda_1\int u^2$ を代入します。

<!-- proof-start -->
### 証明

[GA4の固有関数展開](../GA4/index.md#thm-ga4-spectral-basis)により実数値の非零で滑らかな固有関数 $u$ が存在し、$-\Delta_gu=\lambda_1u$、$\lambda_1>0$ です。[GA1のGreen公式](../GA1/index.md#thm-ga1-green-first)から

$$
\int_M|\nabla u|^2\,dV_g
=-\int_Mu\Delta_gu\,dV_g
=\lambda_1\int_Mu^2\,dV_g.
$$

[関数のBochner恒等式](#thm-ga7-scalar-bochner)を全体で積分します。コンパクト・境界なしなのでLaplacianの積分は零です。固有方程式を微分すると $\nabla\Delta_gu=-\lambda_1\nabla u$ だから

$$
0=\int_M|\nabla^2u|^2\,dV_g
-\lambda_1\int_M|\nabla u|^2\,dV_g
+\int_M\operatorname{Ric}(\nabla u,\nabla u)\,dV_g.
$$

[Hessianのトレース不等式](#lem-ga7-hessian-trace)と曲率下界を代入して

$$
0\ge\frac1d\int_M(\Delta_gu)^2\,dV_g
-\lambda_1\int_M|\nabla u|^2\,dV_g
+(d-1)K\int_M|\nabla u|^2\,dV_g.
$$

さらに $\Delta_gu=-\lambda_1u$ と直前のエネルギー式を使うと

$$
0\ge\left[
\frac{\lambda_1^2}{d}-\lambda_1^2
+(d-1)K\lambda_1\right]\int_Mu^2\,dV_g
=(d-1)\lambda_1\left(K-\frac{\lambda_1}{d}\right)\int_Mu^2\,dV_g.
$$

$d\ge2$、$\lambda_1>0$、$u\not\equiv0$ より、最後の積の残りは $K-\lambda_1/d\le0$。従って $\lambda_1\ge dK$ です。
<!-- proof-end -->

半径 $a>0$ の標準球面 $S^d(a)$ ではRicciが $(d-1)a^{-2}g$、高さ関数の固有値が $d/a^2$ なので、この下界には等号の例があります。

## 6. 積分できることは自動ではない

Bochner恒等式とWeitzenböck公式は局所的に成立しますが、消滅定理と固有値下界はコンパクト・境界なしを使いました。境界ありなら部分積分に法線項が現れ、DirichletかNeumannか、1形式なら絶対・相対境界条件等を指定する必要があります。非コンパクト完備だけでは $\int_M|\nabla\alpha|^2$ の有限性や境界項の消滅は従いません。切断関数を使う場合も、その導関数の評価と可積分性が別途必要です。

例として非コンパクトな $\mathbb R^d$ の標準計量にはRicci曲率0で平行な $dx^1$ がありますが、体積が無限大なので $dx^1\notin L^2$ です。閉多様体上の調和1形式と、非コンパクト空間の $L^2$ 調和1形式を区別しなければなりません。

## 7. 演習

### Level A：符号・曲率・不等式を確かめる

<a id="ex-ga7-a01"></a>
#### GA7-A01 平坦トーラスで二種類のLaplacianを比較する
- Level: A

標準平坦トーラス $\mathbb T^2$ 上の1形式 $\alpha=\sin x\,dy$ に対し、$\nabla^*\nabla\alpha$ と $\Delta_H\alpha$ を直接計算し、Ricci項を検証せよ。

<!-- solution-start -->
**詳細解答**

平坦計量では正規直交標構 $\partial_x,\partial_y$ が平行であり、[接続Laplacianの定義](#def-ga7-rough-laplacian)から

$$
\nabla^*\nabla\alpha
=-(\partial_x^2+\partial_y^2)(\sin x)\,dy
=\sin x\,dy.
$$

[GA6の余微分](../GA6/index.md#def-ga6-codifferential)の平坦座標式を使うと $\delta\alpha=-\partial_y(\sin x)=0$、$d\alpha=\cos x\,dx\wedge dy$ です。さらに $\delta(\cos x\,dx\wedge dy)=-\partial_x(\cos x)\,dy=\sin x\,dy$。ゆえに

$$
\Delta_H\alpha=d\delta\alpha+\delta d\alpha=\sin x\,dy.
$$

平坦なのでRicci曲率は零であり、[Weitzenböck公式](#thm-ga7-weitzenbock)の両辺は一致します。
<!-- solution-end -->

<a id="ex-ga7-a02"></a>
#### GA7-A02 球面の高さ関数でBochner恒等式を確かめる
- Level: A

単位球面 $S^d$（$d\ge2$）の高さ関数 $u=x_{d+1}$ について、$\nabla^2u=-ug$、$\Delta_gu=-d\,u$、$|\nabla u|^2=1-u^2$ を用い、Bochner恒等式の両辺を計算せよ。

<!-- solution-start -->
**詳細解答**

左辺は積の微分を用いて

$$
\frac12\Delta_g|\nabla u|^2
=-\frac12\Delta_g(u^2)
=-u\Delta_gu-|\nabla u|^2
=d\,u^2-(1-u^2)
$$

となります。ここで $d\,u^2$ は次元 $d$ と $u^2$ の積です。右辺は $|\nabla^2u|^2=d\,u^2$、$\nabla\Delta_gu=-d\,\nabla u$、$\operatorname{Ric}=(d-1)g$ なので

$$
d\,u^2-d|\nabla u|^2+(d-1)|\nabla u|^2
=d\,u^2-(1-u^2).
$$

両辺は一致し、Ricci項の符号が正であることも確認できました。
<!-- solution-end -->

<a id="ex-ga7-a03"></a>
#### GA7-A03 Hessianのトレース不等式
- Level: A

対称 $d\times d$ 実行列 $H$ に対して $\operatorname{tr}(H^2)\ge(\operatorname{tr}H)^2/d$ を示し、等号条件を求めよ。

<!-- solution-start -->
**詳細解答**

実対称行列の直交対角化により固有値 $\mu_1,\ldots,\mu_d$ を取れます。Cauchy--Schwarz不等式から

$$
\left(\sum_i\mu_i\right)^2
=\langle(\mu_i),(1,\ldots,1)\rangle^2
\le\left(\sum_i\mu_i^2\right)d.
$$

$\operatorname{tr}(H)=\sum_i\mu_i$、$\operatorname{tr}(H^2)=\sum_i\mu_i^2$ を代入して結論です。等号は $(\mu_i)$ が $(1,\ldots,1)$ と比例する場合、すなわち全固有値が等しく $H=cI$ の場合に限ります。
<!-- solution-end -->

<a id="ex-ga7-a04"></a>
#### GA7-A04 Ricci非負なら調和1形式は平行
- Level: A

コンパクト・向き付け可能・境界なし多様体でRicci非負を仮定する。調和1形式 $\alpha$ が平行であることを積分式から示し、「Ricci非負」を「正値」にしないと消滅は従わない理由を述べよ。

<!-- solution-start -->
**詳細解答**

[GA6の調和性判定](../GA6/index.md#thm-ga6-energy)から $d\alpha=\delta\alpha=0$ です。[積分Weitzenböck恒等式](#thm-ga7-integrated-weitzenbock)に代入すると

$$
0=\int_M|\nabla\alpha|^2\,dV_g+\int_M\operatorname{Ric}(\alpha^\sharp,\alpha^\sharp)\,dV_g.
$$

両積分は非負であり第一項が零なので、連続性から $\nabla\alpha=0$ です。しかし $\alpha=0$ は従いません。平坦トーラスの $dx$ は平行・非零・調和で、Ricciは零だからです。
<!-- solution-end -->

### Level B：曲率から解析的結論を組み立てる

<a id="ex-ga7-b01"></a>
#### GA7-B01 第一固有値の次元係数
- Level: B

コンパクト連結境界なし多様体で $\operatorname{Ric}\ge(d-1)Kg$（$d\ge2$, $K>0$）とする。$-\Delta_gu=\lambda u$、$u\not\equiv0$、$\lambda>0$ を満たす滑らかな固有関数から $\lambda\ge dK$ を導け。積分式の各項を別々に評価すること。

<!-- solution-start -->
**詳細解答**

[関数のBochner恒等式](#thm-ga7-scalar-bochner)を積分し、境界なしから左辺を零にします。固有値方程式を微分して $\nabla\Delta_gu=-\lambda\nabla u$ を得ます。

$$
0=\int_M|\nabla^2u|^2-\lambda\int_M|\nabla u|^2+
\int_M\operatorname{Ric}(\nabla u,\nabla u).
$$

ここでは各積分の測度を $dV_g$ とします。[Hessianのトレース不等式](#lem-ga7-hessian-trace)から第一項は $\lambda^2\int u^2/d$ 以上です。[Green公式](../GA1/index.md#thm-ga1-green-first)により $\int|\nabla u|^2=\lambda\int u^2$ です。最後のRicci項は $(d-1)K\lambda\int u^2$ 以上なので

$$
0\ge\left(\frac{\lambda^2}{d}-\lambda^2+(d-1)K\lambda\right)\int_Mu^2
=(d-1)\lambda\left(K-\frac{\lambda}{d}\right)\int_Mu^2.
$$

$d-1>0$、$\lambda>0$、$\int_Mu^2>0$ により $K-\lambda/d\le0$、すなわち $\lambda\ge dK$ です。
<!-- solution-end -->

<a id="ex-ga7-b02"></a>
#### GA7-B02 Ricci非負と一次コホモロジー
- Level: B

標準平坦 $\mathbb T^2$ 上で $dx,dy$ が調和1形式であることを示し、Ricci非負なのに $H^1_{\mathrm{dR}}(\mathbb T^2)\ne0$ となる機構を説明せよ。

<!-- solution-start -->
**詳細解答**

大域1形式 $dx,dy$ は各点で平行であり、$d(dx)=d(dy)=0$ です。平坦座標では成分が定数なので $\delta(dx)=\delta(dy)=0$ も成立します。[GA6のエネルギー恒等式と調和性の判定](../GA6/index.md#thm-ga6-energy)から両方は調和です。例えば $dx$ が零でないことは $\partial_x$ へ評価して $dx(\partial_x)=1$ で分かります。また $dx,dy$ は独立です。

平坦だから $\operatorname{Ric}=0$。積分Weitzenböck式は $\|\nabla\alpha\|^2=0$ しか強制せず、平行形式の値を零にはしません。[Hodge--de Rham同型](../GA6/index.md#thm-ga6-hodge-de-rham)によって独立な二つの調和1形式が独立なコホモロジー類を与えます。
<!-- solution-end -->

<a id="ex-ga7-b03"></a>
#### GA7-B03 半径付き球面の鋭い固有値評価
- Level: B

半径 $a>0$ の標準 $S^d(a)$（$d\ge2$）で $\operatorname{Ric}=(d-1)a^{-2}g$ が成り立つ。位置ベクトルの一つの座標関数 $u$ に $\Delta_gu=-(d/a^2)u$ が成り立つことを確認し、Lichnerowicz下界の等号成立を示せ。

<!-- solution-start -->
**詳細解答**

[定断面曲率空間の Ricci 曲率とスカラー曲率](../../GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)から断面曲率 $1/a^2$ の球面のRicciは $(d-1)a^{-2}g$ です。球面の法線は $x/a$ なので、接ベクトル $X$ に沿った座標関数 $u(x)=\langle x,v\rangle$（$v$ は固定の単位ベクトル）を二回微分すると $\nabla^2u=-(u/a^2)g$ となります。トレースを取れば

$$
\Delta_gu=\operatorname{tr}_g\nabla^2u=-\frac d{a^2}u.
$$

非定数なので $d/a^2$ は正固有値です。[Lichnerowiczの定理](#thm-ga7-lichnerowicz)は $K=1/a^2$ より $\lambda_1\ge d/a^2$ を与え、上の固有関数は $\lambda_1\le d/a^2$ を与えます。従って $\lambda_1=d/a^2$ で等号が成立します。
<!-- solution-end -->

<a id="ex-ga7-b04"></a>
#### GA7-B04 余微分の交換子の添字と符号
- Level: B

任意のRiemann多様体で、点 $p$ の正規直交標構 $e_i$ と滑らかな1形式 $\alpha$ について、$\sum_i([\nabla_{e_i},\nabla_{e_j}]\alpha)(e_i)$ を曲率テンソルを経由してRicci曲率で表せ。なぜ最終式が負号でなく正号になるか説明せよ。

<!-- solution-start -->
**詳細解答**

[1形式の微分交換公式](#lem-ga7-covector-commutator)を用い、点 $p$ で $\nabla_{[e_i,e_j]}\alpha$ の項は正規標構を取ったとき零であることを確認します。したがって

$$
\sum_i([\nabla_{e_i},\nabla_{e_j}]\alpha)(e_i)
=-\sum_i\alpha(R(e_i,e_j)e_i).
$$

[曲率の計量反対称性](../../GEO/GEO16/index.md#thm-geo16-curvature-symmetries)から

$$
-\langle R(e_i,e_j)e_i,\alpha^\sharp\rangle
=\langle R(e_i,e_j)\alpha^\sharp,e_i\rangle.
$$

和を取れば、[Ricci曲率の定義](../../GEO/GEO16/index.md#def-geo16-ricci-scalar)より $\operatorname{Ric}(e_j,\alpha^\sharp)$ です。共変ベクトルの交換式に最初の負号があり、曲率の計量反対称性でもう一度負号が生じるため、結果は正です。
<!-- solution-end -->

### Level C：位相とスペクトルを同時に理解する

<a id="ex-ga7-c01"></a>
#### GA7-C01 Ricci正値の二つの帰結と零曲率の反例
- Level: C

$(M^d,g)$ を向き付けられた連結な滑らかなコンパクト境界なしRiemann多様体（$d\ge2$）とし、$\operatorname{Ric}\ge(d-1)Kg$、$K>0$ とする。

1. すべての調和1形式が零であることを証明せよ。
2. $H^1_{\mathrm{dR}}(M)=0$ を示せ。
3. $-\Delta_g$ の第一正固有値に対する下界を導け。
4. Ricci非負に弱めた場合、どの結論の証明が壊れるか、具体例で説明せよ。

<!-- solution-start -->
**詳細解答**

**1.** 曲率下界と $d\ge2$、$K>0$ から零でない $v$ に対して

$$
\operatorname{Ric}(v,v)\ge(d-1)K|v|^2>0.
$$

$\alpha$ が調和なら[GA6のエネルギー判定](../GA6/index.md#thm-ga6-energy)によって $d\alpha=\delta\alpha=0$ です。[積分Weitzenböck恒等式](#thm-ga7-integrated-weitzenbock)から

$$
0=\|\nabla\alpha\|_2^2+
\int_M\operatorname{Ric}(\alpha^\sharp,\alpha^\sharp)\,dV_g
\ge(d-1)K\|\alpha\|_2^2.
$$

係数は正なので $\|\alpha\|_2=0$、滑らかさにより $\alpha=0$ です。

**2.** [GA6のHodge--de Rham同型](../GA6/index.md#thm-ga6-hodge-de-rham)の仮定（コンパクト・向き付け・境界なし）は満たされています。従って

$$
H^1_{\mathrm{dR}}(M)\simeq\mathcal H^1(M)=\{0\}.
$$

**3.** [GA4の離散スペクトル定理](../GA4/index.md#thm-ga4-spectral-basis)により $\lambda_1>0$ とその滑らかな固有関数が存在します。関数のBochner恒等式を積分し、Hessianのトレース不等式とGreen公式を代入する[本章の計算](#thm-ga7-lichnerowicz)から

$$
0\ge(d-1)\lambda_1\left(K-\frac{\lambda_1}{d}\right)\|u\|_2^2
$$

を得ます。正の因子を除けば $\lambda_1\ge dK$ です。

**4.** 標準平坦 $\mathbb T^d$ はRicci非負（実際には零）ですが $dx^1$ は非零で平行かつ調和です。このため1・2は一般には結論できません。また正の $K$ が存在しないので3の議論には正の固有値下界を生む曲率項がなくなります。固定された平坦トーラス自体には $\lambda_1>0$ はありますが、辺長 $L$ の平坦トーラスを取れば第一正固有値は $(2\pi/L)^2$ であり、$L\to\infty$ で零へ近づきます。Ricci非負だけでは全多様体に共通する正の数値下界を与えられません。
<!-- solution-end -->
