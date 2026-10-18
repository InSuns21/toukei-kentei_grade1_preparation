# GR7 Bianchi恒等式とEinsteinテンソル

<!-- definition-example-audit: strict -->

[GR6のRicci曲率・スカラー曲率](../GR6/index.md#def-gr6-ricci-scalar)では、Riemann曲率の情報を順に二階テンソルと一つの数へ縮約しました。では、その二つを物理的な重力場の方程式に用いるとき、任意の組合せを選べるのでしょうか。

自由落下の相対加速度を記述する曲率には、各点での対称性だけでなく、隣り合う点の間で変化する仕方にも制約があります。この制約が**第二Bianchi恒等式**です。微分の順序を追い、二度縮約すると、Ricci曲率とスカラー曲率に特別な係数で結びついた、共変発散が必ず消えるテンソルに到達します。これがEinsteinテンソルです。

以下、$(M,g)$ は滑らかな4次元Lorentz多様体で、$g$ の符号は $(-,+,+,+)$、$\nabla$ は[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)とします。局所座標では上下で重複する添字を $0,1,2,3$ について和を取り、$x^0=ct$ を使う場合はその旨を明示します。曲率演算子はGR6と同じ

$$
R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
$$

で、[GR6の成分規約](../GR6/index.md#prop-gr6-coordinate-curvature)を固定します。$R$ は曲率演算子、$\mathcal R$ はスカラー曲率として区別します。

## 1. 「発散」とは何を足すことか

通常のベクトル解析では、ベクトル場の発散は偏微分を足した量です。曲がった時空では基底自体が点とともに変わるため、単純な偏微分では座標に依存してしまいます。そこで共変微分を使います。[GEO13のテンソルの共変微分](../../../幾何系/GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)と逆計量での縮約を合わせるのが、以下の操作です。

二階の共変テンソル $S$ とは、各点で二つの接ベクトルを受け取り実数を返す双線形写像です。座標成分 $S_{\mu\nu}=S(\partial_\mu,\partial_\nu)$ の第1添字を、共変微分の添字と逆計量で結び、残る第2添字を自由にします。

<a id="def-gr7-covariant-divergence"></a>

<!-- formal-statement-start -->
> **定義（二階共変テンソルの共変発散）**  
> 滑らかな非退化計量 $g$ とそのLevi-Civita接続 $\nabla$ を持つ多様体上で、滑らかな二階共変テンソル $S$ の **共変発散** を一階共変テンソル $\operatorname{div}S$ と定める。その成分は

$$
\boxed{(\operatorname{div}S)_\nu
=\nabla^\mu S_{\mu\nu}
:=g^{\mu\alpha}\nabla_\alpha S_{\mu\nu}}
$$

> である。右辺で和を取るのは $\mu,\alpha$ であり、$\nu$ は自由添字である。
<!-- formal-statement-end -->

微分に現れる基底の変化を確認しておきます。[共変テンソルの共変微分](../../../幾何系/GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)から

$$
\nabla_\alpha S_{\mu\nu}
=\partial_\alpha S_{\mu\nu}
-\Gamma^\lambda_{\alpha\mu}S_{\lambda\nu}
-\Gamma^\lambda_{\alpha\nu}S_{\mu\lambda}.
$$

負号が二つあるのは $S$ が共変添字を二つ持つからです。発散は偏微分だけの総和ではありません。

<!-- definition-example-start: def-gr7-covariant-divergence -->
**定義の確認：Minkowski座標。** $x^\mu=(ct,x,y,z)$、$g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ とします。行列式は $-1\ne0$ だから非退化で、逆計量は同じ対角行列です。[Levi-Civita接続公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)では計量の偏微分がすべて零なので $\Gamma^\rho_{\mu\nu}=0$ です。$S_{00}=f(x^0)$ 以外の成分が零なら、$S$ は対称な二階共変テンソルで、

$$
\begin{aligned}
(\operatorname{div}S)_0
&=g^{\mu\alpha}\partial_\alpha S_{\mu0}
=g^{00}\partial_0S_{00}=-f'(x^0),\\
(\operatorname{div}S)_i&=0\qquad (i=1,2,3).
\end{aligned}
$$

従って発散は一階共変テンソルになり、一般には零ではありません。特に $S=g$ とすると $\nabla g=0$ なので $\operatorname{div}g=0$ です。計量両立性を使う場面ではこの後者が重要になります。
<!-- definition-example-end -->

## 2. 第二Bianchi恒等式をLorentz時空へ運ぶ

[第一Bianchi恒等式](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)は曲率の三つの引数を交換して足す、各点での代数的関係でした。それに対し第二Bianchi恒等式は**曲率の共変微分**についての関係です。滑らかな曲率テンソルに $\nabla$ を作用させるので、計量は少なくとも必要な微分が存在する滑らかさを持つとします。

ここで四添字をすべて下げた曲率を

$$
R_{abcd}=g_{a\rho}R^\rho{}_{bcd}
$$

と書きます。[GR6の曲率対称性](../GR6/index.md#prop-gr6-orthonormal-contraction)で使った反対称性および対交換対称性はLorentz計量でも成り立ちます。$\nabla g=0$ により、添字を下げる操作と共変微分は交換します。

<a id="thm-gr7-lorentz-second-bianchi"></a>

<!-- formal-statement-start -->
> **定理（Lorentz時空の第二Bianchi恒等式）**  
> 滑らかな非退化Lorentz計量 $g$ のLevi-Civita接続と、GR6の規約による曲率 $R_{abcd}$ について、任意の局所座標で

$$
\boxed{
\nabla_eR_{abcd}
+\nabla_cR_{abde}
+\nabla_dR_{abec}=0
}
$$

> が成り立つ。添字 $a,b$ を固定し、微分添字と曲率の後二添字を巡回させた恒等式である。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO16の第二Bianchi恒等式](../../../幾何系/GEO/GEO16/index.md#thm-geo16-second-bianchi)と同じ機構です。GEO16での正定値性は証明のどこにも必要なく、捩率零によって一点で接続係数を零にできることと、混合偏微分の交換だけを使います。Lorentzの場合にもこの二条件を具体的に確認します。

<!-- proof-start -->
### 証明

一点 $p$ を固定します。Levi-Civita接続は捩率零なので $\Gamma^\rho_{\mu\nu}(p)=\Gamma^\rho_{\nu\mu}(p)$ です。$p$ を原点とする旧座標 $x$ から局所座標 $y$ へ移す際、

$$
x^\rho=y^\rho-\frac12\Gamma^\rho_{\mu\nu}(p)y^\mu y^\nu
$$

と二次補正すると、原点でJacobianは恒等行列です。従って逆関数定理により近傍で座標を成し、接続係数の変換式に現れる二階微分が旧座標の $\Gamma(p)$ を打ち消します。よってこの座標では $\Gamma(p)=0$ です。これは正定値性を要求しません。

[GR6の四項公式](../GR6/index.md#prop-gr6-coordinate-curvature)では、$p$ において接続係数の積は零なので

$$
R^\rho{}_{bcd}(p)
=\partial_c\Gamma^\rho_{db}(p)
-\partial_d\Gamma^\rho_{cb}(p).
$$

また $p$ で $\nabla_e R^\rho{}_{bcd}=\partial_eR^\rho{}_{bcd}$ です。積 $\Gamma\Gamma$ を偏微分した項も、各項に $\Gamma(p)=0$ が残るため零です。よって巡回和を $p$ で展開すると

$$
\begin{aligned}
&\nabla_eR^\rho{}_{bcd}
+\nabla_cR^\rho{}_{bde}
+\nabla_dR^\rho{}_{bec}\\
={}&
(\partial_e\partial_c-\partial_c\partial_e)\Gamma^\rho_{db}\\
&+(\partial_d\partial_e-\partial_e\partial_d)\Gamma^\rho_{cb}\\
&+(\partial_c\partial_d-\partial_d\partial_c)\Gamma^\rho_{eb}
=0.
\end{aligned}
$$

ここでは $\Gamma$ は滑らかなので混合二階偏微分が交換します。この巡回和はテンソルであり、$p$ は任意でした。さらに $\nabla g=0$ を使って出力添字を下げると主張の式になります。$\square$
<!-- proof-end -->

**符号の確認。** GR6の $R^\rho{}_{bcd}$ は $c,d$ の交換で符号が変わります。第二Bianchiの式も一つだけ添字を反転したものを混ぜてはいけません。上の三項は $(e,c,d)$ を同じ向きに巡回させています。

## 3. 一度縮約し、さらにもう一度縮約する

曲率の四添字を残したままでは方程式に使いにくいため、[GR6のRicci縮約](../GR6/index.md#def-gr6-ricci-scalar)と同じ組を先に縮約します。

<a id="thm-gr7-contracted-bianchi"></a>

<!-- formal-statement-start -->
> **定理（縮約Bianchi恒等式）**  
> 滑らかな非退化Lorentz計量のLevi-Civita接続について、Ricciテンソル $\operatorname{Ric}_{ab}$ とスカラー曲率 $\mathcal R$ は

$$
\boxed{
\nabla^aR_{abde}
=\nabla_d\operatorname{Ric}_{be}
-\nabla_e\operatorname{Ric}_{bd}
}
$$

> および

$$
\boxed{
\nabla^a\operatorname{Ric}_{ae}
=\frac12\nabla_e\mathcal R
}
$$

> を満たす。上式の $R_{abde}$ は4階曲率であり、$\mathcal R$ はスカラー曲率である。
<!-- formal-statement-end -->

### 証明の見取り図

最初は第二Bianchiの $a,c$ を $g^{ac}$ で縮約します。次は自由だった $b,d$ を $g^{bd}$ で縮約します。二度目の左辺に出る負符号が、最後の $1/2$ の決め手です。

<!-- proof-start -->
### 証明

[第二Bianchi恒等式](#thm-gr7-lorentz-second-bianchi)へ $g^{ac}$ を掛けます。Levi-Civita接続の計量両立性から $\nabla_e g^{ac}=0$ なので、計量を微分の内外へ移して構いません。

$$
g^{ac}\nabla_eR_{abcd}
+g^{ac}\nabla_cR_{abde}
+g^{ac}\nabla_dR_{abec}=0.
$$

まず[GR6のRicci定義](../GR6/index.md#def-gr6-ricci-scalar)により

$$
g^{ac}R_{abcd}=\operatorname{Ric}_{bd}.
$$

最後の項は曲率の末尾二添字の反対称性を使って

$$
g^{ac}R_{abec}
=-g^{ac}R_{abce}
=-\operatorname{Ric}_{be}
$$

です。中央は $g^{ac}\nabla_cR_{abde}=\nabla^aR_{abde}$ なので、

$$
\nabla_e\operatorname{Ric}_{bd}
+\nabla^aR_{abde}
-\nabla_d\operatorname{Ric}_{be}=0.
$$

これを移項すれば第一の式です。

さらに $b,d$ を逆計量 $g^{bd}$ で縮約します。左辺の曲率は対交換対称性と添字反対称性から

$$
\begin{aligned}
g^{bd}R_{abde}
&=-g^{bd}R_{abed}\\
&=-g^{bd}R_{edab}\\
&=-g^{bd}R_{d e b a}
=-\operatorname{Ric}_{ea}.
\end{aligned}
$$

最後の等号では前二添字の交換とRicciの定義を用いています。従って第一式の左辺をもう一度縮約すると $-\nabla^a\operatorname{Ric}_{ae}$ です。一方、右辺はRicciの対称性を用いて

$$
g^{bd}\nabla_d\operatorname{Ric}_{be}
-g^{bd}\nabla_e\operatorname{Ric}_{bd}
=\nabla^b\operatorname{Ric}_{be}-\nabla_e\mathcal R.
$$

両辺を移項して

$$
-\nabla^a\operatorname{Ric}_{ae}
=\nabla^a\operatorname{Ric}_{ae}-\nabla_e\mathcal R
$$

となるため、$2\nabla^a\operatorname{Ric}_{ae}=\nabla_e\mathcal R$、すなわち主張を得ます。$\square$
<!-- proof-end -->

**なぜ $1/2$ なのか。** 最初の縮約でRicciの二つの微分が現れ、二度目にその一つが反対符号の同じ発散になります。両辺に一個ずつ残った同じ量をまとめると係数2が現れます。これは「4次元だから半分」という話ではありません。一般の非退化計量でも同じ係数です。

## 4. Einsteinテンソル：発散を零にする組合せ

上の恒等式は $\operatorname{Ric}$ と $\mathcal R$ の微分を結びました。いま二階共変テンソルを $\operatorname{Ric}_{\mu\nu}-\lambda\mathcal R g_{\mu\nu}$ の形で作ります。計量両立性によって

$$
\begin{aligned}
\nabla^\mu(\mathcal R g_{\mu\nu})
&=g^{\mu\alpha}(\nabla_\alpha\mathcal R)g_{\mu\nu}
+g^{\mu\alpha}\mathcal R\,\nabla_\alpha g_{\mu\nu}\\
&=\delta^\alpha_\nu\partial_\alpha\mathcal R
=\partial_\nu\mathcal R.
\end{aligned}
$$

ここでスカラー関数の共変微分は偏微分に一致します。したがって前節の縮約恒等式と合わせると

$$
\nabla^\mu(\operatorname{Ric}_{\mu\nu}
-\lambda\mathcal R g_{\mu\nu})
=(\tfrac12-\lambda)\partial_\nu\mathcal R.
$$

$\lambda=1/2$ にすれば、任意の滑らかな計量で右辺が消えます。曲率スカラーが特定の時空で一定なら他の係数でも偶然零になる場合はありますが、恒等式として零にする自然な選択が $1/2$ です。

<a id="def-gr7-einstein-tensor"></a>

<!-- formal-statement-start -->
> **定義（Einsteinテンソル）**  
> 滑らかな非退化Lorentz計量 $g$ とそのLevi-Civita接続から得たRicciテンソルとスカラー曲率を用い、二階共変テンソル

$$
\boxed{G_{\mu\nu}:=\operatorname{Ric}_{\mu\nu}
-\frac12\mathcal R g_{\mu\nu}}
$$

> を **Einsteinテンソル** と定義する。Ricciテンソルと計量は対称なので $G_{\mu\nu}=G_{\nu\mu}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr7-einstein-tensor -->
**定義の確認：Minkowski時空と定曲率形。** Minkowski計量では既習の[GR6の曲率計算](../GR6/index.md#def-gr6-ricci-scalar)により $\operatorname{Ric}=0$、$\mathcal R=0$ なので、定義の二項はともに零となり $G=0$ です。次に[GR6の定曲率縮約](../GR6/index.md#prop-gr6-constant-curvature)の4次元模型では $\operatorname{Ric}=3Kg$、$\mathcal R=12K$。ゆえに

$$
G_{\mu\nu}=3Kg_{\mu\nu}-\tfrac12(12K)g_{\mu\nu}
=-3Kg_{\mu\nu}.
$$

非退化性を持つLorentz計量上でRicciとスカラーという二段階の縮約を確認したうえで、同じ型の二階共変テンソル二つを引いています。
<!-- definition-example-end -->

<a id="thm-gr7-einstein-divergence-free"></a>

<!-- formal-statement-start -->
> **定理（Einsteinテンソルの共変発散零）**  
> 滑らかな4次元Lorentz多様体 $(M,g)$ のLevi-Civita接続について、そのEinsteinテンソルは

$$
\boxed{\nabla^\mu G_{\mu\nu}=0}
$$

> を恒等的に満たす。この結論は物質方程式やEinstein場の方程式を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

縮約Bianchi恒等式と $\nabla g=0$ を別々に適用し、係数 $1/2$ が相殺することを確認します。

<!-- proof-start -->
### 証明

[Einsteinテンソルの定義](#def-gr7-einstein-tensor)から共変微分の線形性で

$$
\begin{aligned}
\nabla^\mu G_{\mu\nu}
&=\nabla^\mu\operatorname{Ric}_{\mu\nu}
-\frac12\nabla^\mu(\mathcal R g_{\mu\nu})\\
&=\frac12\nabla_\nu\mathcal R
-\frac12(\nabla_\nu\mathcal R)\\
&=0.
\end{aligned}
$$

二行目の第一項には[縮約Bianchi恒等式](#thm-gr7-contracted-bianchi)、第二項には上で計算したLeibniz則と $\nabla g=0$ を用いています。$\square$
<!-- proof-end -->

**何が「保存」されたのか。** これは曲率から恒等的に成り立つ幾何学的制約です。まだ物質のエネルギーが具体的に保存すると導出したわけではありません。後のGR8で物質のエネルギー運動量を導入し、GR12で場の方程式と突き合わせて初めて、物質側の共変保存に結び付けます。また局所的な共変発散零から任意の時空で大域的な一定のエネルギー量が作れるとは限りません。

## 5. 宇宙項と次元を調べる

Einsteinテンソルの定義は4次元に限られません。一般の次元 $n$ で跡を取ると、係数がどう現れるでしょうか。

$$
\begin{aligned}
g^{\mu\nu}G_{\mu\nu}
&=g^{\mu\nu}\operatorname{Ric}_{\mu\nu}
-\frac12\mathcal R\,g^{\mu\nu}g_{\mu\nu}\\
&=\mathcal R-\frac n2\mathcal R
=\left(1-\frac n2\right)\mathcal R.
\end{aligned}
$$

特に4次元では $\operatorname{tr}_gG=-\mathcal R$ です。計量の符号が $(-,+,+,+)$ でも、$g^{\mu\nu}g_{\mu\nu}=4$ であり $-1+1+1+1=2$ と数えてはいけません。

<a id="prop-gr7-constant-curvature"></a>

<!-- formal-statement-start -->
> **命題（一定曲率形のEinsteinテンソル）**  
> 次元 $n\ge2$ の非退化計量 $g$ のLevi-Civita曲率が

$$
R(X,Y)Z=K\{g(Y,Z)X-g(X,Z)Y\}
$$

> を一定の実数 $K$ について満たすとする。このとき

$$
\boxed{G_{\mu\nu}
=-\frac{(n-1)(n-2)}2\,K g_{\mu\nu}}
$$

> である。特に4次元では $G=-3Kg$。
<!-- formal-statement-end -->

### 証明の見取り図

GR6で求めた $(n-1)K$ と $n(n-1)K$ を両方定義式に代入します。

<!-- proof-start -->
### 証明

[GR6の定曲率縮約命題](../GR6/index.md#prop-gr6-constant-curvature)により、仮定の曲率では $\operatorname{Ric}=(n-1)Kg$、$\mathcal R=n(n-1)K$。ゆえに

$$
\begin{aligned}
G
&=(n-1)Kg-\frac12n(n-1)Kg\\
&=(n-1)\left(1-\frac n2\right)Kg\\
&=-\frac{(n-1)(n-2)}2Kg.
\end{aligned}
$$

$n=4$ を代入すると $-\frac{3\cdot2}{2}Kg=-3Kg$ です。$\square$
<!-- proof-end -->

ここで宇宙項という、定数 $\Lambda$ と計量の積を左辺に加える場合を考えます。

<a id="prop-gr7-cosmological-divergence"></a>

<!-- formal-statement-start -->
> **命題（定数宇宙項を加えても発散は零）**  
> 滑らかなLorentz計量とそのLevi-Civita接続、定数 $\Lambda\in\mathbb R$ に対して

$$
\boxed{\nabla^\mu(G_{\mu\nu}+\Lambda g_{\mu\nu})=0}
$$

> が成り立つ。$\Lambda$ を一般の滑らかな関数とした場合、左辺は $\partial_\nu\Lambda$ に等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Einsteinテンソルの発散零](#thm-gr7-einstein-divergence-free)と $\nabla g=0$ を用い、

$$
\begin{aligned}
\nabla^\mu(G_{\mu\nu}+\Lambda g_{\mu\nu})
&=0+g^{\mu\alpha}\nabla_\alpha(\Lambda g_{\mu\nu})\\
&=g^{\mu\alpha}(\partial_\alpha\Lambda)g_{\mu\nu}
+\Lambda g^{\mu\alpha}\nabla_\alpha g_{\mu\nu}\\
&=\delta^\alpha_\nu\partial_\alpha\Lambda
=\partial_\nu\Lambda.
\end{aligned}
$$

定数なら偏微分は零です。関数なら非零の可能性が残ります。$\square$
<!-- proof-end -->

これは「$\Lambda$ がどんな関数でもよい」ことを意味しません。**定数性を落とすと証明で消えた偏微分項が戻る**という反例になっています。

## 6. 静的lapse計量で座標成分を最後まで確かめる

抽象式の検算には[GR6の静的lapse模型](../GR6/index.md#prop-gr6-static-lapse-ricci)が向いています。時間座標を秒単位の $t$ とし、$N(x,y,z)>0$ を滑らかな無次元関数として

$$
ds^2=-c^2N(x,y,z)^2dt^2+dx^2+dy^2+dz^2
$$

を考えます。空間添字 $i,j,k$ は $x,y,z$ を走り、$N_i=\partial_iN$、$N_{ij}=\partial_i\partial_jN$、$\Delta N=\sum_iN_{ii}$ と書きます。

<a id="prop-gr7-static-lapse-einstein"></a>

<!-- formal-statement-start -->
> **命題（静的lapse模型のEinsteinテンソルと発散）**  
> 上の正関数 $N$ から作るLorentz計量について、

$$
\boxed{
G_{tt}=0,\quad G_{ti}=0,\quad
G_{ij}=\frac{\delta_{ij}\Delta N-N_{ij}}{N}
}
$$

> であり、すべての成分について $\nabla^\mu G_{\mu\nu}=0$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初にGR6のRicciとスカラーを代入し、次に偏微分と接続補正を別々に計算します。偏微分だけでは一般に零にならないことが重要です。

<!-- proof-start -->
### 証明

[GR6の曲率成分計算](../GR6/index.md#prop-gr6-static-lapse-ricci)より

$$
\operatorname{Ric}_{tt}=c^2N\Delta N,\quad
\operatorname{Ric}_{ij}=-N_{ij}/N,\quad
\operatorname{Ric}_{ti}=0,\quad
\mathcal R=-2\Delta N/N.
$$

[Einsteinテンソルの定義](#def-gr7-einstein-tensor)に代入し、$g_{tt}=-c^2N^2$、$g_{ij}=\delta_{ij}$ を使うと

$$
\begin{aligned}
G_{tt}&=c^2N\Delta N
-\tfrac12(-2\Delta N/N)(-c^2N^2)=0,\\
G_{ij}&=-N_{ij}/N+\delta_{ij}\Delta N/N,\\
G_{ti}&=0.
\end{aligned}
$$

ここで $\Gamma^t_{ti}=N_i/N$、$\Gamma^i_{tt}=c^2NN_i$ 以外の接続係数は零です。[発散の定義](#def-gr7-covariant-divergence)と共変微分の座標式を適用すると、時間成分について

$$
\nabla^\mu G_{\mu t}=0.
$$

これは $G_{tt}=G_{it}=0$ であり、残る接続補正も $G_{ti}$ を掛けるものだけだからです。

空間成分 $\nu=j$ については、逆計量の対角性から

$$
\nabla^\mu G_{\mu j}
=g^{tt}\nabla_tG_{tj}+\sum_i\nabla_iG_{ij}.
$$

各項を独立に展開します。

$$
\begin{aligned}
\nabla_tG_{tj}
&=-\Gamma^k_{tt}G_{kj}-\Gamma^t_{tj}G_{tt}
=-c^2NN_kG_{kj},\\
g^{tt}\nabla_tG_{tj}
&=\left(-\frac1{c^2N^2}\right)(-c^2NN_kG_{kj})
=\frac{N_k}{N}G_{kj},\\
\sum_i\nabla_iG_{ij}
&=\sum_i\partial_iG_{ij}
\end{aligned}
$$

となります。最後の等号では空間的な接続係数 $\Gamma^k_{ij}$ が零で、$G_{t\mu}=0$ であることを使いました。一方、混合偏微分の交換で $\sum_i\partial_iN_{ij}=\partial_j\Delta N$ なので

$$
\begin{aligned}
\sum_i\partial_iG_{ij}
&=\frac{\partial_j\Delta N-\sum_i\partial_iN_{ij}}N
-\frac{\sum_iN_i(\delta_{ij}\Delta N-N_{ij})}{N^2}\\
&=-\frac{N_i}{N}G_{ij}.
\end{aligned}
$$

従って時間方向からの接続補正と空間方向の偏微分が相殺し、$\nabla^\mu G_{\mu j}=0$ です。$\square$
<!-- proof-end -->

具体的に $N=1+\alpha xy>0$（$\alpha\ne0$、原点近傍）を選ぶと $\Delta N=0$、$N_{xy}=N_{yx}=\alpha$ なので

$$
G_{xy}=G_{yx}=-\frac{\alpha}{N},\qquad
G_{tt}=G_{xx}=G_{yy}=G_{zz}=0.
$$

このとき $\partial_yG_{yx}=\alpha^2x/N^2$ は一般には零でありません。しかし接続補正は $(N_y/N)G_{yx}=-\alpha^2x/N^2$ で、確かに打ち消します。**普通の偏微分による発散と共変発散を区別する理由**が、この一例に凝縮されています。

## 7. 演習：巡回、縮約、保存の区別

以下はすべて本章冒頭の曲率規約と $(-,+,+,+)$ を使います。各式を「どの添字を和で消し、どれが自由か」と照合してください。

### Level A

<a id="ex-gr7-a01"></a>
#### GR7-A01 計量の発散
- Level: A

滑らかなLorentz計量で $\nabla^\mu g_{\mu\nu}=0$ を成分表示から導け。

<!-- solution-start -->
**詳細解答。** [発散の定義](#def-gr7-covariant-divergence)では

$$
\nabla^\mu g_{\mu\nu}=g^{\mu\alpha}\nabla_\alpha g_{\mu\nu}.
$$

[Levi-Civita接続の計量両立性](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)より、任意の $\alpha,\mu,\nu$ について $\nabla_\alpha g_{\mu\nu}=0$ です。従って逆計量による和の各項が零で、発散も零です。偏微分 $\partial_\alpha g_{\mu\nu}$ が一般に零であると主張したわけではありません。
<!-- solution-end -->

<a id="ex-gr7-a02"></a>
#### GR7-A02 平坦時空で非零の発散
- Level: A

Minkowski座標 $x^0=ct$ において $S_{00}=(x^0)^2$、その他の成分零のテンソルの共変発散を求めよ。

<!-- solution-start -->
**詳細解答。** 計量は定数で、接続係数は零、$g^{00}=-1$ です。[定義](#def-gr7-covariant-divergence)から

$$
(\operatorname{div}S)_0
=g^{00}\partial_0S_{00}
=-\partial_0(x^0)^2=-2x^0.
$$

$S_{\mu i}=0$ だから $(\operatorname{div}S)_i=0$ です。計量の発散零とは異なり、任意のテンソルの発散は消えません。
<!-- solution-end -->

<a id="ex-gr7-a03"></a>
#### GR7-A03 定曲率の係数
- Level: A

4次元の一定曲率形 $R(X,Y)Z=K(g(Y,Z)X-g(X,Z)Y)$ で $K=2/L^2$、$L>0$ とする。Einsteinテンソルを求めよ。

<!-- solution-start -->
**詳細解答。** [定曲率Einsteinテンソル](#prop-gr7-constant-curvature)へ $n=4$、$K=2/L^2$ を代入します。

$$
G=-\frac{(4-1)(4-2)}2\,\frac2{L^2}g
=-\frac6{L^2}g.
$$

[GR6の縮約式](../GR6/index.md#prop-gr6-constant-curvature)から直接でも $\operatorname{Ric}=6g/L^2$、$\mathcal R=24/L^2$ なので $G=(6-12)g/L^2$ と一致します。
<!-- solution-end -->

<a id="ex-gr7-a04"></a>
#### GR7-A04 時間成分の符号と跡
- Level: A

Lorentz直交枠で $g_{ab}=\operatorname{diag}(-1,1,1,1)$、$\operatorname{Ric}_{ab}=\operatorname{diag}(2,3,4,5)$ とする。一点での $\mathcal R$、$G_{ab}$、$g^{ab}G_{ab}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [GR6の符号付き縮約](../GR6/index.md#prop-gr6-orthonormal-contraction)から

$$
\mathcal R=(-1)2+3+4+5=10.
$$

Einsteinテンソルの各対角成分は $\operatorname{Ric}_{aa}-5g_{aa}$ だから

$$
(G_{ab})=\operatorname{diag}(7,-2,-1,0).
$$

従って逆計量で跡を取れば

$$
g^{ab}G_{ab}=-7-2-1+0=-10=-\mathcal R.
$$

通常の対角和 $7-2-1=4$ と混同してはいけません。
<!-- solution-end -->

<a id="ex-gr7-a05"></a>
#### GR7-A05 宇宙項の定数性
- Level: A

任意の滑らかな関数 $\Lambda(x)$ に対し $\nabla^\mu(\Lambda g_{\mu\nu})$ を計算し、$\Lambda$ が定数の場合との差を述べよ。

<!-- solution-start -->
**詳細解答。** 積の微分法則と $\nabla g=0$ によって

$$
\begin{aligned}
\nabla^\mu(\Lambda g_{\mu\nu})
&=g^{\mu\alpha}\{(\partial_\alpha\Lambda)g_{\mu\nu}
+\Lambda\nabla_\alpha g_{\mu\nu}\}\\
&=g^{\mu\alpha}g_{\mu\nu}\partial_\alpha\Lambda
=\partial_\nu\Lambda.
\end{aligned}
$$

定数なら右辺は零ですが、座標依存する $\Lambda$ では一般に零ではありません。消える仕組みは計量両立性だけでなく $\partial\Lambda=0$ にも依存します。
<!-- solution-end -->

### Level B

<a id="ex-gr7-b01"></a>
#### GR7-B01 最初の縮約を自分で行う
- Level: B

$\nabla_eR_{abcd}+\nabla_cR_{abde}+\nabla_dR_{abec}=0$ に $g^{ac}$ を掛け、各項をRicciテンソルで表せ。

<!-- solution-start -->
**詳細解答。** [第二Bianchi恒等式](#thm-gr7-lorentz-second-bianchi)の三項をそれぞれ縮約します。第一項は

$$
g^{ac}\nabla_eR_{abcd}
=\nabla_e(g^{ac}R_{abcd})
=\nabla_e\operatorname{Ric}_{bd}
$$

であり、計量を移した箇所で $\nabla g^{-1}=0$ を使います。第二項は $g^{ac}\nabla_cR_{abde}=\nabla^aR_{abde}$。第三項は後二添字交換から

$$
g^{ac}\nabla_dR_{abec}
=-\nabla_d(g^{ac}R_{abce})
=-\nabla_d\operatorname{Ric}_{be}.
$$

従って三項の和が零であることから

$$
\nabla^aR_{abde}
=\nabla_d\operatorname{Ric}_{be}-\nabla_e\operatorname{Ric}_{bd}
$$

が得られます。自由添字は $b,d,e$ です。
<!-- solution-end -->

<a id="ex-gr7-b02"></a>
#### GR7-B02 次元による跡の変化
- Level: B

一般の $n\ge2$ 次元の非退化計量で $G_{ab}=\operatorname{Ric}_{ab}-\frac12\mathcal Rg_{ab}$ とする。$g^{ab}G_{ab}$ を求め、$n=2,3,4$ を比較せよ。

<!-- solution-start -->
**詳細解答。** [GR6のスカラー縮約](../GR6/index.md#def-gr6-ricci-scalar)で $g^{ab}\operatorname{Ric}_{ab}=\mathcal R$ です。また $g^{ab}g_{ab}=\delta^a_a=n$ なので

$$
g^{ab}G_{ab}
=\mathcal R-\frac12n\mathcal R
=(1-\tfrac n2)\mathcal R.
$$

$n=2$ では $0$、$n=3$ では $-\mathcal R/2$、$n=4$ では $-\mathcal R$ です。2次元で跡が零になるという結論だけから任意の対称二階テンソルが零だと推論してはいけません。
<!-- solution-end -->

<a id="ex-gr7-b03"></a>
#### GR7-B03 偏微分は零でないのに共変発散は零
- Level: B

$N=1+\alpha xy>0$ の原点近傍で、$ds^2=-c^2N^2dt^2+dx^2+dy^2+dz^2$、$\alpha\ne0$ とする。$G_{yx}$、$\partial_yG_{yx}$、時間方向からの接続補正を求め、$\nabla^\mu G_{\mu x}=0$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $N_x=\alpha y$、$N_y=\alpha x$、$N_{xy}=\alpha$、$\Delta N=0$ です。[静的lapseの命題](#prop-gr7-static-lapse-einstein)により

$$
G_{yx}=-\alpha/N,\quad
G_{xx}=G_{zx}=G_{tx}=0.
$$

従って偏微分による和では

$$
\sum_i\partial_iG_{ix}=\partial_y(-\alpha/N)
=\frac{\alpha N_y}{N^2}
=\frac{\alpha^2x}{N^2}.
$$

一方、$g^{tt}=-1/(c^2N^2)$、$\Gamma^y_{tt}=c^2NN_y$ なので

$$
\begin{aligned}
g^{tt}\nabla_tG_{tx}
&=g^{tt}(-\Gamma^y_{tt}G_{yx})\\
&=\frac{N_y}{N}G_{yx}
=-\frac{\alpha^2x}{N^2}.
\end{aligned}
$$

他の接続補正は零です。両者を加えると $0$ となります。$\partial_yG_{yx}\ne0$ を見落とし「偏微分の発散も零」と結論するのは誤りです。
<!-- solution-end -->

<a id="ex-gr7-b04"></a>
#### GR7-B04 場の方程式を仮定した場合
- Level: B

定数 $\kappa\ne0$ と二階共変テンソル $T_{\mu\nu}$ が、あるLorentz計量上で $G_{\mu\nu}=\kappa T_{\mu\nu}$ を満たすと仮定する。何が導かれるか、またBianchi恒等式だけでこの方程式自体を導けるか説明せよ。

<!-- solution-start -->
**詳細解答。** 両辺の共変発散を取り、$\kappa$ は定数なので微分の外へ出せます。[発散零定理](#thm-gr7-einstein-divergence-free)により

$$
0=\nabla^\mu G_{\mu\nu}
=\nabla^\mu(\kappa T_{\mu\nu})
=\kappa\nabla^\mu T_{\mu\nu}.
$$

$\kappa\ne0$ より $\nabla^\mu T_{\mu\nu}=0$ です。しかしこれは**仮定した場の方程式の必要条件**であり、恒等式からその方程式の成立や結合定数の値を証明したことにはなりません。物質作用・重力作用の選択などは後続のGR9–GR12で扱います。
<!-- solution-end -->

### Level C

<a id="ex-gr7-c01"></a>
#### GR7-C01 静的lapseの発散を独立に再導出する
- Level: C

滑らかな正関数 $N(x,y,z)$ に対して $g=-c^2N^2dt^2+dx^2+dy^2+dz^2$ とする。(1) Ricciとスカラーから $G_{\mu\nu}$ を求めよ。(2) 定義式を用いて各自由添字 $\nu=t,x,y,z$ の $\nabla^\mu G_{\mu\nu}=0$ を証明せよ。(3) $N=1+\frac{\beta}{2}(x^2+y^2)$（$\beta>0$）の原点で $G_{\mu\nu}$ の非零成分を求めよ。

<!-- solution-start -->
**詳細解答。** (1) [GR6の静的lapse縮約](../GR6/index.md#prop-gr6-static-lapse-ricci)より $\operatorname{Ric}_{tt}=c^2N\Delta N$、$\operatorname{Ric}_{ij}=-N_{ij}/N$、$\operatorname{Ric}_{ti}=0$、$\mathcal R=-2\Delta N/N$ です。[Einsteinテンソルの定義](#def-gr7-einstein-tensor)に計量成分を代入すると

$$
\begin{aligned}
G_{tt}&=c^2N\Delta N-\tfrac12(-2\Delta N/N)(-c^2N^2)=0,\\
G_{ti}&=0,\\
G_{ij}&=-N_{ij}/N+\delta_{ij}\Delta N/N
=\frac{\delta_{ij}\Delta N-N_{ij}}N.
\end{aligned}
$$

(2) 非零になり得る接続係数は $\Gamma^t_{ti}=N_i/N$ と $\Gamma^i_{tt}=c^2NN_i$ です。共変微分は二階共変テンソルの両添字に負の接続項を含みます。時間成分では

$$
\nabla^\mu G_{\mu t}
=g^{tt}\nabla_tG_{tt}+\sum_i\nabla_iG_{it}=0.
$$

実際、$\nabla_tG_{tt}$ は $\partial_tG_{tt}=0$ と $\Gamma^i_{tt}G_{it}=0$ により零、$\nabla_iG_{it}$ は $\partial_iG_{it}=0$ と $\Gamma^t_{it}G_{tt}=0$ により零です。

空間添字 $j$ では

$$
\begin{aligned}
g^{tt}\nabla_tG_{tj}
&=-g^{tt}\Gamma^k_{tt}G_{kj}
=\frac{N_k}{N}G_{kj},\\
\sum_i\nabla_iG_{ij}
&=\sum_i\partial_i\left(\frac{\delta_{ij}\Delta N-N_{ij}}{N}\right)\\
&=\frac{\partial_j\Delta N-\sum_i\partial_iN_{ij}}N
-\frac{N_i(\delta_{ij}\Delta N-N_{ij})}{N^2}.
\end{aligned}
$$

$N$ は滑らかなので $\sum_i\partial_iN_{ij}=\partial_j\sum_iN_{ii}=\partial_j\Delta N$ であり、後者は $-(N_i/N)G_{ij}$ に等しくなります。時間方向の寄与と和を取れば $0$ です。$j=x,y,z$ は任意なので全成分を確認できました。

(3) 指定の $N$ は $N(0)=1$、$N_{xx}=N_{yy}=\beta$、$N_{zz}=0$、$\Delta N=2\beta$ です。原点で

$$
G_{xx}=2\beta-\beta=\beta,\quad
G_{yy}=\beta,\quad
G_{zz}=2\beta,\quad
G_{tt}=0,
$$

非対角成分は零です。$\beta>0$ なので $N\ge1$ で計量は非退化です。$\nabla^\mu G_{\mu\nu}=0$ は成分が零であるという意味ではなく、微分と接続補正の和が零だという意味です。
<!-- solution-end -->

## 8. 次章への接続

本章で得た $\nabla^\mu G_{\mu\nu}=0$ は、曲率の定義とLevi-Civita接続から決まる恒等式です。物質テンソル $T_{\mu\nu}$ があるとき $G_{\mu\nu}$ とどう関係づけるかは、まだ物理的仮定を要します。次のGR8では塵と完全流体のエネルギー・運動量を定義し、局所的な共変保存が物質運動へ与える意味を追います。
