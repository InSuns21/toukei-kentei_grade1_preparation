# GR10 Einstein–Hilbert作用の変分

<!-- definition-example-audit: strict -->

[GR6のRicci曲率・スカラー曲率](../GR6/index.md#def-gr6-ricci-scalar)は時空の曲がり方を縮約して測り、[GR7のEinsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)は共変発散が零になる組合せを与えました。しかし、幾何からテンソルを作れることと、**どの方程式が重力場の運動方程式になるか**は別の問題です。

[AMECH2のLagrange方程式](../../AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)では、作用を少し変えたときの一次変化を零と置くことで運動を決めました。重力でも未知量を「計量そのもの」として作用を変分すれば、Einsteinテンソルが単なる候補ではなく、計量を動かした係数として現れるかを確かめられます。

直前の[GR9の局所物質作用](../GR9/index.md#def-gr9-matter-action)では、物質の作用を計量で変分して応力テンソルを取り出しました。その途中で用いた[逆計量と体積密度の変分式](../GR9/index.md#eq-gr9-metric-volume-variation)はここでも共通です。本章では符号を再導出してから、その道具を曲率を含む重力作用へ拡張します。

ただしスカラー曲率は計量の二階微分を含みます。作用を変分すると計量の変化の**微分**も出るので、それを境界へ移す操作を隠せません。ここでの目標は、体積要素、接続、曲率の変分を一つずつ導き、コンパクト台の変分のもとでEinsteinテンソルを得ることです。境界で計量だけを固定した変分問題はGR11で扱います。

以下、$M$ は滑らかな時間向き付き4次元Lorentz多様体です。計量 $g$ の符号は $(-,+,+,+)$ とし、接続 $\nabla$ には[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を用います。

局所座標は $x^\mu=(ct,x^1,x^2,x^3)$ とし、添字は $0$ から $3$ までを走ります。重力定数 $G>0$、光速 $c>0$、宇宙定数 $\Lambda$ は固定された実数です。[GR6の曲率成分公式](../GR6/index.md#prop-gr6-coordinate-curvature)と同じ規約に従い、

$$
R^\rho{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^\rho_{\nu\sigma}
-\partial_\nu\Gamma^\rho_{\mu\sigma}
+\Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}
-\Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma},
\qquad R_{\sigma\nu}=R^\rho{}_{\sigma\rho\nu}
$$

を使います。スカラー曲率は $\mathcal R=g^{\mu\nu}R_{\mu\nu}$ です。$\delta$ は時空座標の微分ではなく、変分パラメータについて $\epsilon=0$ で微分する記号です。

## 1. 何を動かすのか：逆計量と体積

作用は積分値なので、まず計量を変えたとき「長さ」と「積分の重み」がどう変わるかを確定します。$g_{\mu\nu}(\epsilon)$ を滑らかなLorentz計量の一変数族とし、$g_{\mu\nu}(0)=g_{\mu\nu}$ とします。十分小さい $\epsilon$ では非退化性と符号数が維持されると仮定します。

計量と逆計量は独立な変数ではありません。ここでは**逆計量**を基本変分とします。$\delta g^{\mu\nu}$ は対称であり、任意の点で独立に選べる対称成分10個を表します。

<a id="def-gr10-inverse-variation"></a>

<!-- formal-statement-start -->
> **定義（逆計量変分と跡）**  
> $g_{\mu\nu}(\epsilon)$ を上記の計量族とし、$\epsilon=0$ における逆計量の変分とその計量跡を

$$
h^{\mu\nu}:=\delta g^{\mu\nu}
:=\left.\frac{d}{d\epsilon}g^{\mu\nu}(\epsilon)\right|_{\epsilon=0},
\qquad h:=g_{\mu\nu}h^{\mu\nu}
$$

> と定める。$h^{\mu\nu}=h^{\nu\mu}$ であり、添字を下げた $h_{\mu\nu}:=g_{\mu\alpha}g_{\nu\beta}h^{\alpha\beta}$ は計量そのものの変分とは符号が異なる。
<!-- formal-statement-end -->

逆行列の微分は、行列式をいきなり使うより、積が単位行列であることから求まります。

<a id="prop-gr10-inverse-identity"></a>

<!-- formal-statement-start -->
> **命題（計量と逆計量の変分）**  
> 非退化な滑らかな計量族に対し、

$$
\boxed{\delta g_{\mu\nu}=-g_{\mu\alpha}g_{\nu\beta}h^{\alpha\beta}=-h_{\mu\nu}}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

逆行列の定義式 $g_{\mu\alpha}g^{\alpha\nu}=\delta_\mu^\nu$ を微分し、計量の逆行列をもう一度掛けます。

<!-- proof-start -->
### 証明

積の微分から

$$
(\delta g_{\mu\alpha})g^{\alpha\nu}+g_{\mu\alpha}\,\delta g^{\alpha\nu}=0.
$$

右から $g_{\nu\beta}$ を掛けると、

$$
\begin{aligned}
(\delta g_{\mu\alpha})g^{\alpha\nu}g_{\nu\beta}
+g_{\mu\alpha}h^{\alpha\nu}g_{\nu\beta}&=0,\\
\delta g_{\mu\beta}+g_{\mu\alpha}g_{\nu\beta}h^{\alpha\nu}&=0.
\end{aligned}
$$

これが主張です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-gr10-inverse-variation -->
**定義の確認**：座標を $(ct,x,y,z)$、$g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ とし、計量族を

$$
g_{\mu\nu}(\epsilon)=\operatorname{diag}(-(1+\epsilon)^2,1,1,1),
\qquad |\epsilon|<1
$$

とします。この範囲では $g_{00}(\epsilon)<0$、空間方向の固有値は正なので非退化なLorentz計量です。逆計量の $00$ 成分は $-(1+\epsilon)^{-2}$ なので

$$
h^{00}=\left.\frac{d}{d\epsilon}[-(1+\epsilon)^{-2}]\right|_0=2,
\qquad h^{ij}=h^{0i}=0.
$$

よって $h=g_{00}h^{00}=-2$。一方、直接微分した $\delta g_{00}=-2$ は[逆計量の変分公式](#prop-gr10-inverse-identity)の $-g_{00}^2h^{00}=-2$ と一致します。対称性も各成分で確認でき、逆計量の $h^{00}=2$ と計量の $\delta g_{00}=-2$ が異なることが見えます。
<!-- definition-example-end -->

積分の重みには行列式が必要です。任意の非退化行列 $A(\epsilon)$ に対する行列式の微分公式

$$
\delta(\det A)=(\det A)\operatorname{tr}(A^{-1}\delta A)
$$

を用います。これは $\det(A+\epsilon B)=\det A\det(I+\epsilon A^{-1}B)$ と $\det(I+\epsilon C)=1+\epsilon\operatorname{tr}C+O(\epsilon^2)$ の積から得られます。後者の一次項は、行列式の列の多重線形性により、一本だけ列を差し替えた項の和が対角成分の和になることから従います。

<a id="def-gr10-lorentz-density"></a>

<!-- formal-statement-start -->
> **定義（Lorentz体積密度）**  
> 4次元の非退化Lorentz計量の座標行列式を $d:=\det(g_{\mu\nu})<0$ とするとき、正の積分密度を

$$
\sqrt{|d|}\,d^4x=\sqrt{-\det(g_{\mu\nu})}\,dx^0dx^1dx^2dx^3
$$

> とする。座標積分ではこの密度を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr10-lorentz-density -->
**定義の確認**：Minkowski直交座標の $g=\operatorname{diag}(-1,1,1,1)$ では $\det g=-1$、従って $\sqrt{-\det g}=1>0$ です。前例の変分族では $\det g(\epsilon)=-(1+\epsilon)^2<0$、$\sqrt{-\det g(\epsilon)}=1+\epsilon$（$|\epsilon|<1$）であり、計量の時間軸を伸ばすと体積密度も伸びます。任意の座標変換 $x=x(y)$ では $g_y=J^{\mathsf T}g_xJ$ なので $\det g_y=(\det J)^2\det g_x$、$d^4x=|\det J|d^4y$ となり、積分密度全体は座標によらず一致します。
<!-- definition-example-end -->

<a id="prop-gr10-volume-variation"></a>

<!-- formal-statement-start -->
> **命題（体積密度の変分）**  
> 任意の滑らかな非退化Lorentz計量族と、その逆計量変分 $h^{\mu\nu}$ について

$$
\boxed{\delta\sqrt{-g}=-\frac12\sqrt{-g}\,g_{\mu\nu}h^{\mu\nu}
=-\frac12\sqrt{-g}\,h}
$$

> が成り立つ。ここで $g$ は文脈上この式だけ $\det(g_{\mu\nu})$ の略記である。
<!-- formal-statement-end -->

### 証明の見取り図

先の行列式微分公式を $A=(g_{\mu\nu})$ に代入し、逆計量変分を使って符号をそろえます。

<!-- proof-start -->
### 証明

$\det g<0$ の領域では $\sqrt{-\det g}$ を通常の一変数関数として微分でき、

$$
\begin{aligned}
\delta\sqrt{-g}
&=\frac12\sqrt{-g}\,g^{\mu\nu}\delta g_{\nu\mu}\\
&=-\frac12\sqrt{-g}\,g^{\mu\nu}g_{\nu\alpha}g_{\mu\beta}h^{\alpha\beta}\\
&=-\frac12\sqrt{-g}\,g_{\alpha\beta}h^{\alpha\beta}.
\end{aligned}
$$

二行目で[逆計量の変分公式](#prop-gr10-inverse-identity)を代入し、三行目で $g^{\mu\nu}g_{\nu\alpha}=\delta^\mu_\alpha$ を使いました。$\square$
<!-- proof-end -->

前例では $h=-2$、$\sqrt{-g}=1$ なので右辺は $1$、直接微分した $d(1+\epsilon)/d\epsilon|_0=1$ と一致します。これが体積変分における負符号の直接検算です。

## 2. 曲率の変化を接続の変化に分ける

体積だけでは曲率 $\mathcal R$ の変分を扱えません。先に、変分によりLevi-Civita接続がどう動くかを計算します。[Levi-Civita接続の一意性](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)から各 $\epsilon$ に対し捩率零と計量両立性があります。二つの接続係数の差はテンソルなので、その一次変化もテンソルです。

<a id="lem-gr10-connection-variation"></a>

<!-- formal-statement-start -->
> **補題（Levi-Civita接続の変分）**  
> $g_{\mu\nu}(\epsilon)$ を滑らかな非退化計量族、$\nabla$ を $\epsilon=0$ の接続、$k_{\mu\nu}:=\delta g_{\mu\nu}=-h_{\mu\nu}$ とすると、

$$
\boxed{\delta\Gamma^\rho_{\mu\nu}
=\frac12g^{\rho\sigma}
\left(\nabla_\mu k_{\nu\sigma}
+\nabla_\nu k_{\mu\sigma}
-\nabla_\sigma k_{\mu\nu}\right)}
$$

> が成り立つ。右辺は基準接続 $\nabla$ による共変微分である。
<!-- formal-statement-end -->

### 証明の見取り図

新旧の計量両立条件の差を一次まで取り、$\mu,\nu,\rho$ を巡回させます。差に含まれる $\delta\Gamma^\rho_{\mu\nu}$ は下二添字について対称です。

<!-- proof-start -->
### 証明

各 $\epsilon$ の計量両立性 $\nabla^{(\epsilon)}_\mu g_{\nu\sigma}(\epsilon)=0$ を微分します。$\nabla g=0$ と接続の共変添字への作用の負号から

$$
\nabla_\mu k_{\nu\sigma}
=C^\lambda_{\mu\nu}g_{\lambda\sigma}
+C^\lambda_{\mu\sigma}g_{\nu\lambda},
\qquad C^\lambda_{\mu\nu}:=\delta\Gamma^\lambda_{\mu\nu}.
$$

接続は捩率零なので $C^\lambda_{\mu\nu}=C^\lambda_{\nu\mu}$ です。上式について

$$
\begin{aligned}
\nabla_\mu k_{\nu\sigma}&=C^\lambda_{\mu\nu}g_{\lambda\sigma}+C^\lambda_{\mu\sigma}g_{\nu\lambda},\\
\nabla_\nu k_{\mu\sigma}&=C^\lambda_{\mu\nu}g_{\lambda\sigma}+C^\lambda_{\nu\sigma}g_{\mu\lambda},\\
\nabla_\sigma k_{\mu\nu}&=C^\lambda_{\mu\sigma}g_{\lambda\nu}+C^\lambda_{\nu\sigma}g_{\mu\lambda}.
\end{aligned}
$$

初めの二行を加えて三行目を引けば、最後の四項が打ち消され

$$
\nabla_\mu k_{\nu\sigma}+\nabla_\nu k_{\mu\sigma}
-\nabla_\sigma k_{\mu\nu}=2g_{\sigma\lambda}C^\lambda_{\mu\nu}.
$$

$g^{\rho\sigma}/2$ を掛けて結論を得ます。$\square$
<!-- proof-end -->

例えば背景がMinkowskiで $k_{00}=f(x^1)$ のみ非零なら、$\nabla=\partial$ なので

$$
\delta\Gamma^1_{00}
=-\frac12\partial_1 k_{00}=-\frac12 f'(x^1),
\qquad
\delta\Gamma^0_{01}=\frac12g^{00}\partial_1 k_{00}=-\frac12 f'(x^1).
$$

両方とも $k_{00}$ の**空間微分**が現れます。曲率の変化にさらに一階微分が出ることが予想できます。

<a id="lem-gr10-palatini"></a>

<!-- formal-statement-start -->
> **補題（Palatini恒等式）**  
> [GR6の曲率規約](../GR6/index.md#prop-gr6-coordinate-curvature)と滑らかなLevi-Civita接続の変分のもとで

$$
\boxed{\delta R_{\mu\nu}
=\nabla_\rho(\delta\Gamma^\rho_{\nu\mu})
-\nabla_\nu(\delta\Gamma^\rho_{\rho\mu})}
$$

> が成り立つ。$\delta\Gamma$ は二つの接続の差に由来する $(1,2)$ 型テンソルである。
<!-- formal-statement-end -->

### 証明の見取り図

[Riemann曲率の四項公式](../GR6/index.md#prop-gr6-coordinate-curvature)の各項を微分すると、$\partial(\delta\Gamma)$ に加え $\Gamma\delta\Gamma$ が現れます。これらはまさに $\delta\Gamma$ の共変微分を組み立てます。

<!-- proof-start -->
### 証明

$C^\rho_{\mu\nu}=\delta\Gamma^\rho_{\mu\nu}$ として曲率の四項公式を微分します。

$$
\begin{aligned}
\delta R^\rho{}_{\sigma\mu\nu}
={}&\partial_\mu C^\rho_{\nu\sigma}-\partial_\nu C^\rho_{\mu\sigma}\\
&+C^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}
+\Gamma^\rho_{\mu\lambda}C^\lambda_{\nu\sigma}\\
&-C^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}
-\Gamma^\rho_{\nu\lambda}C^\lambda_{\mu\sigma}.
\end{aligned}
$$

一方、$(1,2)$ テンソルの共変微分は

$$
\nabla_\mu C^\rho_{\nu\sigma}
=\partial_\mu C^\rho_{\nu\sigma}
+\Gamma^\rho_{\mu\lambda}C^\lambda_{\nu\sigma}
-\Gamma^\lambda_{\mu\nu}C^\rho_{\lambda\sigma}
-\Gamma^\lambda_{\mu\sigma}C^\rho_{\nu\lambda}.
$$

この式から $\nabla_\mu C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\mu\sigma}$ を作ります。捩率零により $\Gamma^\lambda_{\mu\nu}=\Gamma^\lambda_{\nu\mu}$ なので第二項の添字対の寄与が打ち消され、残りは先に展開した六項と一致します。よって

$$
\delta R^\rho{}_{\sigma\mu\nu}
=\nabla_\mu C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\mu\sigma}.
$$

Ricci縮約は $\mu=\rho$ と取るので、$R_{\sigma\nu}=R^\rho{}_{\sigma\rho\nu}$ に対応させ、

$$
\delta R_{\sigma\nu}
=\nabla_\rho C^\rho_{\nu\sigma}
-\nabla_\nu C^\rho_{\rho\sigma}.
$$

$\sigma$ を $\mu$ と書き換えると主張です。$\square$
<!-- proof-end -->

ここでのPalatini恒等式は、計量と接続を**独立な未知量として変分する**という主張ではありません。接続は常に計量のLevi-Civita接続であり、上の補題で接続の変分を計量変分へ結び付けています。

## 3. Einstein–Hilbert作用から何が出るか

スカラー曲率の体積積分を作用に使います。$U\subset M$ を向きの付いた滑らかな座標領域とし、積分とその変分が定義できるものとします。計量変分は $U$ 内部にコンパクト台を持つ滑らかな $h^{\mu\nu}$ とします。これは変分が境界近くで厳密に零であるという仮定です。

<a id="def-gr10-eh-action"></a>

<!-- formal-statement-start -->
> **定義（Einstein–Hilbert作用）**  
> 滑らかな4次元Lorentz計量 $g$、固定された $G>0,c>0,\Lambda\in\mathbb R$ に対し、重力作用を

$$
\boxed{
S_{\mathrm{EH}}[g;U]
=\frac{c^3}{16\pi G}
\int_U(\mathcal R-2\Lambda)\sqrt{-g}\,d^4x
}
$$

> とする。$x^0=ct$ である。境界項を別途加えないこの作用は、内部にコンパクト台を持つ変分について扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr10-eh-action -->
**定義の確認**：Minkowski直交座標の有界な直方体領域で $\mathcal R=0$、$\det g=-1$ です。[GR6の曲率の定義](../GR6/index.md#def-gr6-ricci-scalar)では接続係数が零なので曲率も零と確認できます。従って $\Lambda=0$ なら $S_{\mathrm{EH}}=0$、$\Lambda\ne0$ なら

$$
S_{\mathrm{EH}}=-\frac{c^3\Lambda}{8\pi G}\int_Ud^4x.
$$

計量は滑らか・非退化で、体積密度は正であり、有限領域なら積分は有限です。作用値が零でも、任意の計量変分に対して停留するとは限らないため、値と変分を区別します。係数の次元は $[c^3/G]=\mathrm{kg/s}$、$[\mathcal R\,d^4x]=\mathrm{m^2}$ であり、積は作用の単位 $\mathrm{J\,s}$ です。
<!-- definition-example-end -->

<a id="thm-gr10-eh-variation"></a>

<!-- formal-statement-start -->
> **定理（Einstein–Hilbert作用の計量変分）**  
> $U$ 上の滑らかな4次元Lorentz計量 $g$ と、その逆計量の滑らかな対称変分 $h^{\mu\nu}=\delta g^{\mu\nu}$ に対し、以下が成り立つ。$h=g_{\mu\nu}h^{\mu\nu}$、$V^\rho=\nabla^\rho h-\nabla_\mu h^{\rho\mu}$ とすると、

$$
\boxed{
\delta\!\left((\mathcal R-2\Lambda)\sqrt{-g}\right)
=\sqrt{-g}\left[
(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}
+\nabla_\rho V^\rho
\right].
}
$$

> ここで $G_{\mu\nu}=R_{\mu\nu}-\frac12\mathcal Rg_{\mu\nu}$ は[Einsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)である。特に $h^{\mu\nu}\in C_c^\infty(U)$ なら

$$
\boxed{
\delta S_{\mathrm{EH}}
=\frac{c^3}{16\pi G}
\int_U\sqrt{-g}\,(G_{\mu\nu}+\Lambda g_{\mu\nu})
h^{\mu\nu}\,d^4x.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $\delta\mathcal R$ を「逆計量を動かす部分」と「Ricciを動かす部分」に分割します。後者は[Palatini恒等式](#lem-gr10-palatini)により発散の形になります。体積密度の変化による $-\mathcal Rg_{\mu\nu}/2$ を組み合わせてEinsteinテンソルが現れます。

<!-- proof-start -->
### 証明

[スカラー曲率の縮約](../GR6/index.md#def-gr6-ricci-scalar) $\mathcal R=g^{\mu\nu}R_{\mu\nu}$ を積の規則で変分すると、

$$
\begin{aligned}
\delta\mathcal R
&=h^{\mu\nu}R_{\mu\nu}
+g^{\mu\nu}\delta R_{\mu\nu}\\
&=R_{\mu\nu}h^{\mu\nu}
+g^{\mu\nu}
\bigl(\nabla_\rho C^\rho_{\nu\mu}
-\nabla_\nu C^\rho_{\rho\mu}\bigr),
\qquad C^\rho_{\mu\nu}=\delta\Gamma^\rho_{\mu\nu}.
\end{aligned}
$$

Levi-Civita接続の計量両立性 $\nabla g=0$ より、

$$
g^{\mu\nu}\delta R_{\mu\nu}
=\nabla_\rho\bigl(g^{\mu\nu}C^\rho_{\mu\nu}
-g^{\rho\mu}C^\nu_{\mu\nu}\bigr).
$$

括弧内を $V^\rho$ とおき、[接続の変分](#lem-gr10-connection-variation)へ $k_{\mu\nu}=-h_{\mu\nu}$ を代入します。

$$
\begin{aligned}
g^{\mu\nu}C^\rho_{\mu\nu}
&=\frac12g^{\rho\sigma}g^{\mu\nu}
(\nabla_\mu k_{\nu\sigma}+\nabla_\nu k_{\mu\sigma}
-\nabla_\sigma k_{\mu\nu})\\
&=-\nabla_\mu h^{\rho\mu}+\frac12\nabla^\rho h,\\
C^\nu_{\mu\nu}
&=\frac12g^{\nu\sigma}\nabla_\mu k_{\nu\sigma}
=-\frac12\nabla_\mu h.
\end{aligned}
$$

従って

$$
V^\rho
=\left(-\nabla_\mu h^{\rho\mu}+\frac12\nabla^\rho h\right)
-\left(-\frac12\nabla^\rho h\right)
=\nabla^\rho h-\nabla_\mu h^{\rho\mu}.
$$

体積密度には[体積密度の変分](#prop-gr10-volume-variation)を使います。$\Lambda$ は固定なので $\delta\Lambda=0$ です。

$$
\begin{aligned}
\delta\bigl((\mathcal R-2\Lambda)\sqrt{-g}\bigr)
&=\sqrt{-g}\,\delta\mathcal R
+(\mathcal R-2\Lambda)\delta\sqrt{-g}\\
&=\sqrt{-g}\Bigl[
R_{\mu\nu}h^{\mu\nu}+\nabla_\rho V^\rho
-\frac12(\mathcal R-2\Lambda)g_{\mu\nu}h^{\mu\nu}
\Bigr]\\
&=\sqrt{-g}\Bigl[
(R_{\mu\nu}-\tfrac12\mathcal Rg_{\mu\nu}
+\Lambda g_{\mu\nu})h^{\mu\nu}+\nabla_\rho V^\rho
\Bigr].
\end{aligned}
$$

最後に $V$ は $h$ とその一階微分から作られるため、$h\in C_c^\infty(U)$ なら $V$ も $U$ 内部にコンパクト台を持ちます。Levi-Civita発散の座標式

$$
\sqrt{-g}\,\nabla_\rho V^\rho
=\partial_\rho(\sqrt{-g}\,V^\rho)
$$

を使い、その台を含む座標箱で各座標について積分すると、境界の値が零なので発散項の積分は零です。座標箱を有限個用いる一般の領域でも、分割を利用して同じ結論となります。従って作用の変分公式が従います。$\square$
<!-- proof-end -->

得られた計量変分の係数は[GR7の共変発散零](../GR7/index.md#thm-gr7-einstein-divergence-free)と整合します。ただしこの章で示したのは**重力作用の内部変分**です。物質作用と結合定数を合わせた場の方程式はGR12で扱います。局所的な任意の対称 $h^{\mu\nu}$ に対して真空重力作用が停留する場合に限り、$G_{\mu\nu}+\Lambda g_{\mu\nu}=0$ が従います。ここで「任意の変分の積分が零なら係数が零」という段階も確認しましょう。

任意の一点 $p\in U$ と成分対 $(a,b)$ を取ります。もし連続な対称テンソル

$
E_{\mu\nu}:=G_{\mu\nu}+\Lambda g_{\mu\nu}
$

の $E_{ab}(p)$ が零でなければ、連続性により近傍の小さな座標箱で符号を一定にできます。その箱に台を持つ非負で零でない滑らかな関数 $\varphi$ を選び、$a=b$ なら $h^{aa}=\varphi$ のみ、$a\ne b$ なら対称性を保って $h^{ab}=h^{ba}=\varphi$ のみを非零にします。すると積分の被積分量はそれぞれ

$
\sqrt{-g}\,E_{aa}\varphi,
\qquad
2\sqrt{-g}\,E_{ab}\varphi
$

であり、$\sqrt{-g}>0$ だから積分は零になりません。これは作用の停留条件と矛盾します。従ってすべての成分が零です。なお、コンパクト台の変分なら $\epsilon$ を十分小さく取れば計量の非退化性・Lorentz符号を保てるため、上で選んだ $h$ は実際に許される計量族の一次変分として実現できます。

## 4. 境界は本当に消えたのか：二つの検算

先の証明で変分の台が内部に入っていた点は、単なる技術的な飾りではありません。境界まで変分を許すと、$\int_U\sqrt{-g}\nabla_\rho V^\rho$ が残り、$V$ は $h$ の微分を含みます。境界上で $h$ の値だけを零にしても、その**法線微分**までは零になりません。境界の取扱いを決めずに真空場の方程式だけを提示するのは、作用原理の適用条件を落とすことになります。

### 検算1：平坦背景では一次の曲率積分が境界へ行く

Minkowski直交座標の平坦な $g=\eta$ で $\Lambda=0$ とします。[GR6の平坦曲率](../GR6/index.md#def-gr6-ricci-scalar)から $R_{\mu\nu}=\mathcal R=0$ であり、任意のコンパクト台 $h$ について

$$
\delta S_{\mathrm{EH}}
=\frac{c^3}{16\pi G}\int_U\partial_\rho V^\rho\,d^4x=0.
$$

これは変分した曲率自体が零という意味ではありません。例えば $h^{11}=f(x^0)$ 以外は零とすると、$h=f$、$V^0=\nabla^0h=-f'(x^0)$、$V^1=-\partial_1f=0$ です。局所的な密度変化は $\partial_\rho V^\rho=-f''(x^0)$ で、一般には零ではありません。なおこの $f$ が時間だけの関数で非零なら空間方向にコンパクト台を持ちません。**この例は局所密度の確認**であり、全時空のコンパクト台変分の例ではありません。積分消去の主張には別途 $h$ の全座標方向でのコンパクト台が必要です。

### 検算2：計量の一様拡大を局所化する

4次元で $g_{\mu\nu}(\epsilon)=e^{2\epsilon f}g_{\mu\nu}$、$f\in C_c^\infty(U)$ とすると、

$$
h^{\mu\nu}=-2fg^{\mu\nu},
\qquad h=-8f,
\qquad V^\rho=-6\nabla^\rho f.
$$

したがって前節の定理で $\Lambda=0$ なら

$$
\begin{aligned}
\delta(\sqrt{-g}\mathcal R)
&=\sqrt{-g}\bigl(G_{\mu\nu}(-2fg^{\mu\nu})-6\nabla_\rho\nabla^\rho f\bigr)\\
&=\sqrt{-g}(2f\mathcal R-6\Box_g f),
\quad \Box_gf:=\nabla_\rho\nabla^\rho f,
\end{aligned}
$$

となります。ここでは $g^{\mu\nu}G_{\mu\nu}=\mathcal R-\frac42\mathcal R=-\mathcal R$ と計算しました。直接、$\delta\sqrt{-g}=4f\sqrt{-g}$ と $\delta\mathcal R=-2f\mathcal R-6\Box_g f$ を組み合わせても同じ結果です。$\Box_g$ はLorentz計量の波動作用素であり、Riemann計量の正定値Laplacianをそのまま読み替えてはいけません。

平坦背景では $\mathcal R=0$ で、$-6\Box_g f$ が局所的には残りますが、コンパクト台なので積分は零です。変分の内部係数と境界の全微分項が**異なる働き**をすることが確かめられます。

## 5. 演習：逆計量・曲率・境界を自分で動かす

### Level A

<a id="ex-gr10-a01"></a>
#### GR10-A01 逆計量を動かす符号
- Level: A

$g_{\mu\nu}(\epsilon)=\operatorname{diag}(-1,1+\epsilon,1,1)$ とする。$\epsilon=0$ での $h^{11}$、$\delta g_{11}$、$h$ を求めよ。

<!-- solution-start -->
**詳細解答。** 逆計量の $11$ 成分は $(1+\epsilon)^{-1}$ なので $h^{11}=-1$ です。他の成分の変分は零です。計量の変分は直接 $\delta g_{11}=1$ ですが、[逆行列の変分](#prop-gr10-inverse-identity)でも $-g_{11}^2h^{11}=1$ です。跡は $h=g_{11}h^{11}=-1$ になります。この符号が次の体積変分へ伝わります。
<!-- solution-end -->

<a id="ex-gr10-a02"></a>
#### GR10-A02 体積密度の伸び
- Level: A

A01の計量族について、$\delta\sqrt{-g}$ を直接の行列式計算と変分公式の両方で求めよ。

<!-- solution-start -->
**詳細解答。** $\det g(\epsilon)=-(1+\epsilon)$ なので $\sqrt{-g(\epsilon)}=\sqrt{1+\epsilon}$ です。$\epsilon=0$ で微分して $1/2$ となります。一方、[体積変分公式](#prop-gr10-volume-variation)に $h=-1$、$\sqrt{-g}=1$ を代入すると $-\frac12(1)(-1)=1/2$ です。二通りの計算が一致します。
<!-- solution-end -->

<a id="ex-gr10-a03"></a>
#### GR10-A03 接続変分の対称性
- Level: A

Minkowski背景で $k_{00}=f(x^1)$、それ以外を零とする。$C^1_{00}$ と $C^0_{01}$、$C^0_{10}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\nabla=\partial$ で、[接続の変分補題](#lem-gr10-connection-variation)の $\rho=1,\mu=\nu=0$ について

$$
C^1_{00}
=\tfrac12g^{11}(0+0-\partial_1 k_{00})=-\tfrac12f'.
$$

$\rho=0,\mu=0,\nu=1$ では $g^{00}=-1$、非零項が $\partial_1 k_{00}=f'$ なので $C^0_{01}=-f'/2$ です。下二添字の対称性により $C^0_{10}=C^0_{01}$ となります。これは捩率零の変分と一致します。
<!-- solution-end -->

<a id="ex-gr10-a04"></a>
#### GR10-A04 Palatini恒等式の縮約
- Level: A

$\delta R^\rho{}_{\sigma\mu\nu}=\nabla_\mu C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\mu\sigma}$ を前提とする。Ricci成分の変分と $g^{\mu\nu}\delta R_{\mu\nu}$ を発散の形で書け。

<!-- solution-start -->
**詳細解答。** [GR6のRicci縮約](../GR6/index.md#def-gr6-ricci-scalar)に従い曲率の第1・第3添字を $\rho$ で縮約します。

$$
\delta R_{\sigma\nu}
=\delta R^\rho{}_{\sigma\rho\nu}
=\nabla_\rho C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\rho\sigma}.
$$

次に $g^{\sigma\nu}$ を掛けて $\nabla g=0$ を使うと、

$$
\begin{aligned}
g^{\sigma\nu}\delta R_{\sigma\nu}
&=\nabla_\rho(g^{\sigma\nu}C^\rho_{\nu\sigma})
-\nabla_\nu(g^{\sigma\nu}C^\rho_{\rho\sigma})\\
&=\nabla_\rho(g^{\sigma\nu}C^\rho_{\sigma\nu}
-g^{\rho\sigma}C^\nu_{\nu\sigma}).
\end{aligned}
$$

第二項のダミー添字名を替えただけで、自由添字は $\rho$ です。これが境界項を作ります。
<!-- solution-end -->

<a id="ex-gr10-a05"></a>
#### GR10-A05 宇宙項の符号
- Level: A

$\Lambda$ を固定するとき、$-2\Lambda\sqrt{-g}$ の逆計量変分の係数を求め、$\Lambda g_{\mu\nu}$ の符号を確かめよ。

<!-- solution-start -->
**詳細解答。** $\delta\Lambda=0$ ですから

$$
\delta(-2\Lambda\sqrt{-g})
=-2\Lambda\,\delta\sqrt{-g}
=-2\Lambda(-\tfrac12\sqrt{-g}g_{\mu\nu}h^{\mu\nu})
=\sqrt{-g}\Lambda g_{\mu\nu}h^{\mu\nu}.
$$

ここで使ったのは[体積変分公式](#prop-gr10-volume-variation)だけです。係数の符号は $+\Lambda g_{\mu\nu}$ になります。
<!-- solution-end -->

### Level B

<a id="ex-gr10-b01"></a>
#### GR10-B01 4次元の共形変分
- Level: B

$g_{\mu\nu}(\epsilon)=e^{2\epsilon f}g_{\mu\nu}$、$f\in C_c^\infty(U)$ とする。$\delta g^{\mu\nu}$、$V^\rho$ を導き、$\Lambda=0$ で $\delta(\sqrt{-g}\mathcal R)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 逆計量は $e^{-2\epsilon f}g^{\mu\nu}$ なので

$$
h^{\mu\nu}=-2fg^{\mu\nu},\quad
h=g_{\mu\nu}h^{\mu\nu}=-2f\delta^\mu_\mu=-8f.
$$

[作用変分の定理](#thm-gr10-eh-variation)の $V^\rho$ へ代入します。$\nabla_\mu g^{\rho\mu}=0$ なので

$$
\begin{aligned}
V^\rho
&=\nabla^\rho(-8f)-\nabla_\mu(-2fg^{\rho\mu})\\
&=-8\nabla^\rho f+2g^{\rho\mu}\nabla_\mu f
=-6\nabla^\rho f.
\end{aligned}
$$

また $G_{\mu\nu}g^{\mu\nu}=\mathcal R-\frac42\mathcal R=-\mathcal R$ です。ゆえに

$$
\delta(\sqrt{-g}\mathcal R)
=\sqrt{-g}(2f\mathcal R-6\Box_g f).
$$

$f$ が内部にコンパクト台を持つので $\int\sqrt{-g}\Box_g f=0$ です。したがって作用の変分は $\frac{c^3}{16\pi G}\int2f\mathcal R\sqrt{-g}\,d^4x$ となります。
<!-- solution-end -->

<a id="ex-gr10-b02"></a>
#### GR10-B02 法線微分が残る境界
- Level: B

Minkowski背景の座標領域 $U=\{(x^0,x^1,x^2,x^3):0<x^1<L,\; |x^0|,|x^2|,|x^3|<1\}$ で、$h^{00}=x^1(L-x^1)q(x^0,x^2,x^3)$、他の成分は零とする。$q$ は横方向にコンパクト台を持つ滑らかな関数である。$x^1=0,L$ で $h^{\mu\nu}=0$ でも $V^1$ が一般に零でないことを示せ。

<!-- solution-start -->
**詳細解答。** $h=g_{00}h^{00}=-h^{00}$ です。非零の $h^{\rho\mu}$ の添字は $00$ だけなので $\partial_\mu h^{1\mu}=0$。従って

$$
V^1=\partial^1h-\partial_\mu h^{1\mu}
=-\partial_1 h^{00}
=-(L-2x^1)q.
$$

従って $x^1=0$ で $V^1=-Lq$、$x^1=L$ で $V^1=Lq$ であり、$q\not\equiv0$ なら零ではありません。他の側面では $q$ のコンパクト台により $h$ とその微分は零です。境界で $h$ を零にする条件だけでは $\int\partial_\rho V^\rho$ が消えるとは言えません。この変分は横方向に台を絞っていても $x^1$ の境界に接するので $C_c^\infty(U)$ ではありません。
<!-- solution-end -->

<a id="ex-gr10-b03"></a>
#### GR10-B03 一定曲率と作用の一次変化
- Level: B

4次元で $R_{\mu\nu}=3Kg_{\mu\nu}$、$K$ は定数とする。$h^{\mu\nu}=-2fg^{\mu\nu}$、$f\in C_c^\infty(U)$ としたとき、Einstein–Hilbert作用の変分を $\Lambda$ を含めて求めよ。

<!-- solution-start -->
**詳細解答。** [GR6の一定曲率の縮約](../GR6/index.md#prop-gr6-constant-curvature)から $\mathcal R=g^{\mu\nu}R_{\mu\nu}=12K$ です。[GR7のEinsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)は

$$
G_{\mu\nu}=3Kg_{\mu\nu}-\tfrac12(12K)g_{\mu\nu}
=-3Kg_{\mu\nu}.
$$

従って

$$
\begin{aligned}
(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}
&=(-3K+\Lambda)g_{\mu\nu}(-2fg^{\mu\nu})\\
&=8f(3K-\Lambda).
\end{aligned}
$$

[コンパクト台の作用変分](#thm-gr10-eh-variation)により

$$
\delta S_{\mathrm{EH}}
=\frac{c^3}{16\pi G}\int_U8f(3K-\Lambda)\sqrt{-g}\,d^4x.
$$

係数は $K=\Lambda/3$ で零です。この結論は固定 $\Lambda$ と与えた一定曲率の仮定に依存します。
<!-- solution-end -->

<a id="ex-gr10-b04"></a>
#### GR10-B04 平坦時空でも局所的な変分は残る
- Level: B

Minkowski座標で $h^{11}=f(x^0)$ のみ非零、$f$ は滑らかとする。$\delta\mathcal R$ を求め、$f''\not\equiv0$ なら局所的に零でないことを示せ。またこのまま $U=\mathbb R^4$ 上のコンパクト台変分と呼べない理由を述べよ。

<!-- solution-start -->
**詳細解答。** Minkowskiでは $R_{\mu\nu}=0$、$\nabla=\partial$ です。跡は $h=h^{11}=f$ であり、

$$
V^0=\partial^0h-\partial_\mu h^{0\mu}=-f',
\qquad V^i=0\quad(i=1,2,3).
$$

[スカラー曲率の変分式](#thm-gr10-eh-variation)で逆計量とRicciの積の項は零なので

$$
\delta\mathcal R
=\partial_\rho V^\rho=-f''(x^0).
$$

例えば $f(x^0)=(x^0)^2$ なら $\delta\mathcal R=-2$ です。一方、この $h$ は空間座標に依存せず、$f\not\equiv0$ ならどの空間方向にも無限に延びます。ゆえに $\mathbb R^4$ でコンパクト台を持たず、全空間積分の境界消去を当然には使えません。
<!-- solution-end -->

### Level C

<a id="ex-gr10-c01"></a>
#### GR10-C01 全変分の導出と停留条件
- Level: C

滑らかな4次元Lorentz計量 $g$、固定した $\Lambda$、内部にコンパクト台を持つ対称逆計量変分 $h^{\mu\nu}$ を考える。次を順番に導け。

1. 計量変分 $\delta g_{\mu\nu}$ と体積密度変分 $\delta\sqrt{-g}$
2. 接続変分とPalatini恒等式
3. スカラー曲率の変分 $\delta\mathcal R$ と全微分項
4. Einstein–Hilbert作用の変分 $\delta S_{\mathrm{EH}}$

さらに、すべてのコンパクト台対称 $h$ に対する停留条件を述べ、境界上で $h=0$ とするだけでは同じ導出ができない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $g_{\mu\alpha}g^{\alpha\nu}=\delta_\mu^\nu$ を微分して逆計量を右から掛けると、[計量と逆計量の変分](#prop-gr10-inverse-identity)より

$$
\delta g_{\mu\nu}=-g_{\mu\alpha}g_{\nu\beta}h^{\alpha\beta}=-h_{\mu\nu}.
$$

行列式の一次変化 $\delta\det g=(\det g)g^{\mu\nu}\delta g_{\nu\mu}$ を使うと

$$
\delta\sqrt{-g}
=\tfrac12\sqrt{-g}g^{\mu\nu}\delta g_{\mu\nu}
=-\tfrac12\sqrt{-g}h.
$$

(2) 計量両立性と捩率零を微分すれば、[接続変分補題](#lem-gr10-connection-variation)の

$$
C^\rho_{\mu\nu}
=\tfrac12g^{\rho\sigma}
(\nabla_\mu k_{\nu\sigma}+\nabla_\nu k_{\mu\sigma}-\nabla_\sigma k_{\mu\nu}),
\qquad k_{\mu\nu}=-h_{\mu\nu}
$$

が出ます。曲率の四項公式を微分すると $\delta R^\rho{}_{\sigma\mu\nu}=\nabla_\mu C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\mu\sigma}$ です。$\rho$ と $\mu$ を縮約し、

$$
\delta R_{\sigma\nu}
=\nabla_\rho C^\rho_{\nu\sigma}-\nabla_\nu C^\rho_{\rho\sigma}.
$$

(3) $\mathcal R=g^{\mu\nu}R_{\mu\nu}$ から

$$
\begin{aligned}
\delta\mathcal R
&=R_{\mu\nu}h^{\mu\nu}
+g^{\mu\nu}\delta R_{\mu\nu}\\
&=R_{\mu\nu}h^{\mu\nu}
+\nabla_\rho(g^{\mu\nu}C^\rho_{\mu\nu}-g^{\rho\mu}C^\nu_{\mu\nu}).
\end{aligned}
$$

接続の式へ $k=-h$ を代入して二つの縮約を計算すると、

$$
g^{\mu\nu}C^\rho_{\mu\nu}
=-\nabla_\mu h^{\rho\mu}+\tfrac12\nabla^\rho h,\qquad
g^{\rho\mu}C^\nu_{\mu\nu}=-\tfrac12\nabla^\rho h.
$$

よって全微分項は $V^\rho=\nabla^\rho h-\nabla_\mu h^{\rho\mu}$ の発散です。

(4) $\Lambda$ は固定されているので積の微分で

$$
\begin{aligned}
\delta[(\mathcal R-2\Lambda)\sqrt{-g}]
&=\sqrt{-g}\bigl[R_{\mu\nu}h^{\mu\nu}
+\nabla_\rho V^\rho-\tfrac12(\mathcal R-2\Lambda)h\bigr]\\
&=\sqrt{-g}\bigl[(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}
+\nabla_\rho V^\rho\bigr].
\end{aligned}
$$

$h\in C_c^\infty(U)$ なら $V$ もコンパクト台なので、$\sqrt{-g}\nabla_\rho V^\rho=\partial_\rho(\sqrt{-g}V^\rho)$ の積分は零です。従って

$$
\delta S_{\mathrm{EH}}
=\frac{c^3}{16\pi G}\int_U
(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}\sqrt{-g}\,d^4x.
$$

すべての対称コンパクト台 $h$ について停留するなら、変分法の基本補題を各独立成分へ適用して $G_{\mu\nu}+\Lambda g_{\mu\nu}=0$ が各点で成り立ちます。境界で $h=0$ とするだけの場合、$V$ に含まれる $\nabla h$ の法線成分は一般に非零で、発散項の境界積分が消えないため、この停留条件を同じ手順で導けません。$\square$
<!-- solution-end -->

## 6. 次に必要な条件

本章では、計量の変分が内部にコンパクト台を持つことを明示した上で、

$$
\delta S_{\mathrm{EH}}
=\frac{c^3}{16\pi G}\int_U
(G_{\mu\nu}+\Lambda g_{\mu\nu})\delta g^{\mu\nu}
\sqrt{-g}\,d^4x
$$

を導きました。幾何学的な共変発散零と作用変分の係数が同じEinsteinテンソルへ到達することが、重要な接点です。

一方、現実の時空領域には境界があり、計量を固定しただけでは $\nabla(\delta g)$ に比例する境界寄与は消えません。次のGR11では、**非光的境界・誘導計量の固定・外向き法線**という追加条件を揃え、Gibbons–Hawking–York項の役割を調べます。物質の寄与を加えるのはその後です。
