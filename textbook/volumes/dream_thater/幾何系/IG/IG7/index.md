# IG7 計量に関する双対接続・α-接続と三次テンソル

<!-- definition-example-audit: strict -->

[IG6 のアファイン接続](../IG6/index.md#def-ig6-connection-choice)では、Fisher 計量が同じでも「まっすぐ」を測る規則は複数あることを学びました。成功確率 $p$ を直線的に動かす Bernoulli 曲線と、Fisher 長さに関して一定速で進む曲線は、同じ点を通っても異なる接続の測地線です。

では、どの接続を統計的に選べばよいでしょう。確率密度の対数を一回微分した score は [IG2 の Fisher 計量](../IG2/index.md#def-ig2-fisher-rao-metric)を作りました。もう一段微分し、score の三つの積まで見ると、**計量と組になって現れる二つの接続**を構成できます。本講の目標は、それらが互いに双対である理由を定義から証明し、一般の曲がった統計モデルでも成り立つ部分と、後の IG8 で初めて証明する平坦性を区別することです。

全編で次を仮定します。$M$ は座標領域 $\Theta\subset\mathbb R^d$ を持つ滑らかな識別可能な正則統計モデルです。確率質量関数または密度 $p(x;\theta)$ は共通の台で正であり、対数密度 $\ell=\log p$ は母数について三階まで微分可能とします。

必要な微分と和・積分の交換、期待値の有限性と滑らかさを仮定します。Fisher 行列は正定値とします。座標基底と添字の範囲を

$$
\partial_i=\frac{\partial}{\partial\theta^i},
\qquad i,j,k,\ell\in\{1,\ldots,d\}
$$

と定めます。[IG6 の接続係数](../IG6/index.md#def-ig6-connection-choice)と同じく、上下に一度ずつ現れる添字については和を取ります。以下の偏微分では、標本値 $x$ を固定して母数 $\theta$ を動かします。

$$
\ell_i=\partial_i\ell,\qquad
\ell_{ij}=\partial_i\partial_j\ell,\qquad
g_{ij}=E_\theta[\ell_i\ell_j].
$$

逆計量の成分を $g^{ij}$ と書きます。これは正定値な行列 $(g_{ij})$ の逆行列 $(g^{ij})=(g_{ij})^{-1}$ の成分で、$g^{ik}g_{kj}=\delta^i_j$ を満たします。

KL の三階微分を使う箇所では、二つの母数に関する三階混合微分も連続で、期待値との交換ができるとします。有限正モデルと正規位置尺度族は、母数の内部でこれらの条件を満たします。

## 1. 計量の変化を二つの接続へ分配する

Fisher 内積 $g(Y,Z)$ を方向 $X$ に沿って変化させると、ベクトル場 $Y$ の変化と $Z$ の変化の両方が寄与します。普通の積の微分に対応する式を、一般のアファイン接続 $\nabla$ と別の接続 $\nabla^*$ で記述するのが双対性です。ここで $X,Y,Z$ は $M$ 上の滑らかなベクトル場です。

<a id="def-ig7-dual-connection"></a>

<!-- formal-statement-start -->
> **定義（計量に関する双対接続）**  
> 非退化な Riemann 計量 $g$ とアファイン接続 $\nabla$ を持つ滑らかな多様体 $M$ に対し、アファイン接続 $\nabla^*$ が $\nabla$ の **$g$ に関する双対**であるとは、すべての滑らかなベクトル場 $X,Y,Z$ について

$$
X\bigl(g(Y,Z)\bigr)=g(\nabla_XY,Z)+g(Y,\nabla_X^*Z)
$$

> が成立することをいう。左辺はスカラー関数 $g(Y,Z)$ の $X$ 方向微分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig7-dual-connection -->
**定義の確認**（Bernoulli の二つの規則）。$M=(0,1)$、$q=p(1-p)>0$ とします。[IG2 の Bernoulli 計量](../IG2/index.md#def-ig2-fisher-information)を $p$ 座標で表すと

$$
g_{pp}=g(\partial_p,\partial_p)=\frac1q
$$

です。この座標で二つの接続 $A,B$ を $\nabla^A_{\partial_p}\partial_p=\Gamma^{A,p}_{pp}\partial_p$、$\nabla^B_{\partial_p}\partial_p=\Gamma^{B,p}_{pp}\partial_p$ により表し、それぞれの係数を

$$
\Gamma^{A,p}_{pp}=0,\qquad
\Gamma^{B,p}_{pp}=\frac{2p-1}{q}
$$

と置きます。この一つの座標基底に定義式を適用することは、内積 $g_{pp}$ の微分を二つの係数に分けることです。$X=Y=Z=\partial_p$ について

$$
\partial_p g_{pp}=\frac{2p-1}{q^2}
=g_{pp}\Gamma^{A,p}_{pp}+g_{pp}\Gamma^{B,p}_{pp}.
$$

任意の $X=f\partial_p,Y=h\partial_p,Z=k\partial_p$ に拡張すると、両辺に現れる $fh'k/q$ と $fhk'/q$ は [接続の Leibniz 則](../IG6/index.md#def-ig6-connection-choice)から一致し、残る係数が上式です。よって二つは確かに双対です。後の第3節で、これらが統計的な二種類の接続に一致することを確かめます。
<!-- definition-example-end -->

[GEO13 の捩率](../../GEO/GEO13/index.md#prop-geo13-torsion-tensor)は $\operatorname{Tor}(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$ で測る接続の非対称性です。また [GEO13 の Levi-Civita 接続](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)は、捩率零かつ計量両立な接続として一意に定まります。この二条件を平均接続へ適用する際に区別します。

<a id="thm-ig7-dual-existence"></a>

<!-- formal-statement-start -->
> **定理（双対接続の存在・一意性と二重双対）**  
> 滑らかな多様体 $M$ 上の非退化な Riemann 計量 $g$ と任意のアファイン接続 $\nabla$ に対し、その $g$ に関する双対 $\nabla^*$ は一意に存在し、$(\nabla^*)^*=\nabla$ となる。さらに $(\nabla+\nabla^*)/2$ は計量両立であり、**両方の接続が捩率零ならば**この平均は $g$ の Levi-Civita 接続に一致する。
<!-- formal-statement-end -->

計量の非退化性が双対を一意に決めます。しかし平均が Levi-Civita になるには捩率零の条件が必要です。一般の接続について「双対なら必ず Levi-Civita を挟む」とは言えません。

### 証明の見取り図

定義式の右辺第二項を未知の $\nabla_X^*Z$ の内積として読み、非退化性でベクトルを復元します。二重双対は $g$ の対称性から、平均の計量両立性は二つの双対式を足して確認します。

<!-- proof-start -->
### 証明

$X,Z$ を固定して $Y$ の関数

$$
L_{X,Z}(Y)=X(g(Y,Z))-g(\nabla_XY,Z)
$$

を作ります。$\nabla_X(fY)=X(f)Y+f\nabla_XY$ を代入すると $X(f)g(Y,Z)$ が差で消え、$L_{X,Z}(fY)=fL_{X,Z}(Y)$ です。したがって各点で $Y$ に線形な共変ベクトルが得られます。$g$ の非退化性により、$g(Y,W)=L_{X,Z}(Y)$ を満たすベクトル $W$ がただ一つ存在し、これを $\nabla_X^*Z$ とします。実際、局所座標で $W=W^b\partial_b$ と置けば

$$
W^b=g^{ba}\{X(g(\partial_a,Z))-g(\nabla_X\partial_a,Z)\}
$$

です。逆行列の各成分 $g^{ba}$ と括弧内の関数は滑らかなので、点ごとに復元した $W$ は滑らかなベクトル場です。

実数線形性と $\nabla_{fX}^*Z=f\nabla_X^*Z$ は構成式から従います。また

$$
\begin{aligned}
g(Y,\nabla_X^*(fZ))
&=X\{f g(Y,Z)\}-g(\nabla_XY,fZ)\\
&=X(f)g(Y,Z)+f g(Y,\nabla_X^*Z),
\end{aligned}
$$

ゆえに $\nabla_X^*(fZ)=X(f)Z+f\nabla_X^*Z$ です。これでアファイン接続の公理が揃い、構成の各段で一意でした。

定義式で $Y,Z$ を交換し、内積の対称性を使うと

$$
Xg(Z,Y)=g(\nabla_X^*Z,Y)+g(Z,\nabla_XY)
$$

となるので $\nabla$ は $\nabla^*$ の双対です。$D=(\nabla+\nabla^*)/2$ と置き、上の二式を足して半分にすると

$$
Xg(Y,Z)=g(D_XY,Z)+g(Y,D_XZ).
$$

したがって $Dg=0$ です。もし $\nabla,\nabla^*$ の捩率がともに零なら、捩率の線形性から $D$ の捩率も零です。[GEO13 の Levi-Civita 接続の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)を、正定値計量 $g$ と捩率零・計量両立の $D$ に適用すると $D=\nabla^{\mathrm{LC}}$ です。
<!-- proof-end -->

## 2. 三つの score を掛けるとテンソルになる

[IG1 の score の平均零](../IG1/index.md#thm-ig1-regular-score-mean)を念頭に置きます。ここから確率モデルを論じる際の $X$ は観測を表す確率変数であり、第1節のベクトル場 $X$ とは異なります。score は再パラメータ化に対して一次式で変換するので、三つの積の期待値も三階の共変テンソルになります。これは接続同士の差を記述する量です。接続の捩率も通常 $T$ と書くことがありますが、本講では捩率を $\operatorname{Tor}$、三次テンソルを $T$ と区別します。

<a id="def-ig7-amari-chentsov"></a>

<!-- formal-statement-start -->
> **定義（Amari--Chentsov 三次テンソル）**  
> 上記の三階正則統計モデル $M$ において、Amari--Chentsov 三次テンソル $T$ を

$$
T_{ijk}(\theta)=E_\theta[\ell_i(X;\theta)\ell_j(X;\theta)\ell_k(X;\theta)]
$$

> で定める。$T$ は三添字について完全対称な共変三階テンソルである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig7-amari-chentsov -->
**定義の確認**（Bernoulli の三次モーメント）。$X\in\{0,1\}$、$P_p(X=1)=p$、$P_p(X=0)=1-p$ で $0<p<1$ とします。$q=p(1-p)$ とすると

$$
\ell_p(1)=\frac1p,\qquad \ell_p(0)=-\frac1{1-p}.
$$

したがって、定義の有限和から

$$
T_{ppp}=p\frac1{p^3}+(1-p)\left(-\frac1{(1-p)^3}\right)
=\frac{1-2p}{p^2(1-p)^2}=\frac{1-2p}{q^2}.
$$

$p=1/2$ でのみ零となり、三次の非対称性は一般に消えません。座標 $a=\log\{p/(1-p)\}$ では $dp/da=q$ です。連鎖律で $\ell_a=(dp/da)\ell_p=q\ell_p$ としたうえで、定義の三乗期待値を取り直すと $T_{aaa}=E[\ell_a^3]=q^3T_{ppp}=q(1-2p)$ です。次の命題の変換則を先取りせずに、この座標で直接確かめられました。
<!-- definition-example-end -->

<a id="prop-ig7-tensor-transformation"></a>

<!-- formal-statement-start -->
> **命題（三次テンソルの座標変換）**  
> 上記の正則モデルで、滑らかで可逆な座標の取り替え $\theta=\theta(y)$ の Jacobian を $P^i_a=\partial\theta^i/\partial y^a$ とすると

$$
T'_{abc}=P^i_aP^j_bP^k_cT_{ijk}.
$$

> 特に $T$ は座標の選び方に依らない三階共変テンソルを定める。
<!-- formal-statement-end -->

### 証明の見取り図

対数密度の一階微分には、接続係数と違って二階微分の余分な項がありません。三つの score に連鎖律を使います。

<!-- proof-start -->
### 証明

母数を $y$ で表すと、$\partial_a\ell(x;\theta(y))=P^i_a\ell_i(x;\theta(y))$ です。Jacobian は標本点 $x$ に依存しないので、三つ掛けて期待値の外へ出せます。

$$
\begin{aligned}
T'_{abc}&=E[(P^i_a\ell_i)(P^j_b\ell_j)(P^k_c\ell_k)]\\
&=P^i_aP^j_bP^k_cE[\ell_i\ell_j\ell_k].
\end{aligned}
$$

積の交換により添字の任意の置換で同じ値となります。
<!-- proof-end -->

## 3. α-接続は三次テンソルでずれる

三次テンソルだけでは測地線は決まりません。もう一つ、対数密度の二階微分 $\ell_{ij}$ と score の積を組み合わせます。二階微分だけの期待値 $E[\ell_{ij}]$ では接続係数になりませんが、第三の score を掛けると、再パラメータ化で接続に必要な二階 Jacobian 項が現れます。

何を計算して接続と判定するかを先に確認します。[IG6 の接続係数の定義](../IG6/index.md#def-ig6-connection-choice)では $\nabla_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k$ です。両辺と $\partial_\ell$ の内積を取れば、計量で最後の添字を下げた係数は

$$
\Gamma_{ij,\ell}:=g(\nabla_{\partial_i}\partial_j,\partial_\ell)
=g_{k\ell}\Gamma^k_{ij}.
$$

この線形方程式を解けば $\Gamma^k_{ij}=g^{k\ell}\Gamma_{ij,\ell}$ です。ここで $g^{k\ell}$ は正定値 Fisher 行列 $(g_{ij})$ の逆行列の成分です。したがって、まず確率的な期待値から下付き係数を作り、逆計量で上付き係数へ戻せば、[IG6 の座標変換則](../IG6/index.md#thm-ig6-coordinate-covariance)に照らして接続であるか判定できます。

<a id="def-ig7-alpha-connection"></a>

<!-- formal-statement-start -->
> **定義（統計モデルの α-接続）**  
> 上記の正則統計モデルの各実数 $\alpha$ に対し、係数を第一・第二添字が微分方向、最後が計量で下げた添字となる順で

$$
\Gamma^{(\alpha)}_{ij,k}
=E_\theta\!\left[\left(\ell_{ij}+\frac{1-\alpha}{2}\ell_i\ell_j\right)\ell_k\right],
\qquad
\Gamma^{(\alpha)k}_{ij}=g^{k\ell}\Gamma^{(\alpha)}_{ij,\ell}
$$

> と定める。逆計量 $g^{k\ell}$ による添字上げは直前に説明した通りである。これらを局所接続係数とするアファイン接続を $\nabla^{(\alpha)}$ と呼ぶ。符号規約は $\nabla^{(+1)}=\nabla^e$（指数接続）、$\nabla^{(-1)}=\nabla^m$（混合接続）とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig7-alpha-connection -->
**定義の確認**（Bernoulli の全 $\alpha$）。$q=p(1-p)$ とすると

$$
\ell_{pp}(1)=-\frac1{p^2},\qquad
\ell_{pp}(0)=-\frac1{(1-p)^2}.
$$

それぞれに $\ell_p$ を掛けて期待値を取れば

$$
E[\ell_{pp}\ell_p]= -\frac1{p^2}+\frac1{(1-p)^2}
=\frac{2p-1}{q^2}.
$$

前節の $T_{ppp}=(1-2p)/q^2$ と $g^{pp}=q$ を代入すると

$$
\Gamma^{(\alpha)p}_{pp}
=q\left\{\frac{2p-1}{q^2}+\frac{1-\alpha}{2}\frac{1-2p}{q^2}\right\}
=\frac{(\alpha+1)(2p-1)}{2q}.
$$

特に $\Gamma^{e,p}_{pp}=(2p-1)/q$、$\Gamma^{m,p}_{pp}=0$、$\Gamma^{(0)p}_{pp}=(2p-1)/(2q)$ です。$m$ 接続は [IG6 の成功確率接続](../IG6/index.md#def-ig6-bernoulli-probability-connection)と一致します。
<!-- definition-example-end -->

<a id="thm-ig7-alpha-duality"></a>

<!-- formal-statement-start -->
> **定理（α-接続の存在・捩率零・双対性）**  
> 上記の三階正則統計モデルで、定義した $\Gamma^{(\alpha)k}_{ij}$ はアファイン接続の係数の変換則を満たす。すべての実数 $\alpha$ に対し $\nabla^{(\alpha)}$ は捩率零で、$\nabla^{(\alpha)}$ と $\nabla^{(-\alpha)}$ は Fisher 計量 $g$ に関して双対である。また

$$
\nabla^{(0)}=\nabla^{\mathrm{LC}},\qquad
\Gamma^{(\alpha)k}_{ij}
=\Gamma^{\mathrm{LC},k}_{ij}-\frac\alpha2 g^{k\ell}T_{ij\ell}.
$$

> この結論に平坦性の仮定は含まれず、接続が平坦であるとの主張も含まない。
<!-- formal-statement-end -->

二つの接続が双対なのは、計量を微分したときの三次の項を互いに分け合うためです。以下では期待値の微分を実際に行います。

### 証明の見取り図

一階の score は Jacobian で変換し、二階の score には二階 Jacobian が加わります。これで接続係数の変換則を確認します。次に $\partial_i g_{jk}$ を微分し、$\alpha$ と $-\alpha$ の三次テンソル係数が合計 1 になることを使います。

<!-- proof-start -->
### 証明

座標を $\theta=\theta(y)$ と取り替え、$P^i_a=\partial\theta^i/\partial y^a$、$Q^i_{ab}=\partial_a\partial_b\theta^i$ とすると、連鎖律から

$$
\ell'_a=P^i_a\ell_i,\qquad
\ell'_{ab}=P^i_aP^j_b\ell_{ij}+Q^i_{ab}\ell_i.
$$

したがって

$$
\Gamma'^{(\alpha)}_{ab,c}
=P^i_aP^j_bP^k_c\Gamma^{(\alpha)}_{ij,k}
+Q^i_{ab}P^k_c g_{ik}.
$$

逆計量 $g'^{cd}$ で最後の添字を上げると

$$
\Gamma'^{(\alpha)d}_{ab}
=\frac{\partial y^d}{\partial\theta^k}
\left(P^i_aP^j_b\Gamma^{(\alpha)k}_{ij}+Q^k_{ab}\right).
$$

これは [IG6 の接続係数の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)そのものです。また $\ell_{ij}=\ell_{ji}$ と三次積の対称性から $\Gamma^{(\alpha)k}_{ij}=\Gamma^{(\alpha)k}_{ji}$ で、[GEO13 の捩率のテンソル性と座標表示](../../GEO/GEO13/index.md#prop-geo13-torsion-tensor)により捩率零です。

次に、期待値の微分公式

$$
\partial_i E_\theta[F(X;\theta)]
=E_\theta[\partial_iF+\ell_iF]
$$

を、$F=\ell_j\ell_k$ に適用します。密度の微分が $\partial_i p=p\ell_i$ であることから導かれ、交換は冒頭の正則性で許されます。積の微分を展開すると

$$
\partial_i g_{jk}
=E[\ell_{ij}\ell_k]+E[\ell_j\ell_{ik}]+T_{ijk}.
$$

一方で [α-接続の定義](#def-ig7-alpha-connection)を $\alpha$ と $-\alpha$ それぞれに適用すると

$$
\begin{aligned}
\Gamma^{(\alpha)}_{ij,k}+\Gamma^{(-\alpha)}_{ik,j}
&=E[\ell_{ij}\ell_k]+E[\ell_{ik}\ell_j]\\
&\quad+\left(\frac{1-\alpha}{2}+\frac{1+\alpha}{2}\right)T_{ijk}\\
&=\partial_i g_{jk}.
\end{aligned}
$$

これが [計量に関する双対接続の定義](#def-ig7-dual-connection)の座標基底での式です。一般のベクトル場へ拡張すると、両接続の Leibniz 則によるベクトル成分の微分が左辺の積の微分と一致するため、双対性が成立します。

$\alpha=0$ では自分自身が双対なので $\nabla^{(0)}g=0$、かつ捩率零です。[Levi-Civita の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)より $\nabla^{(0)}=\nabla^{\mathrm{LC}}$ です。さらに定義から

$$
\Gamma^{(\alpha)}_{ij,k}-\Gamma^{(0)}_{ij,k}
=-\frac\alpha2T_{ijk}
$$

を得て、逆計量で添字を上げれば結論の式です。
<!-- proof-end -->

ここで $T=0$ ならすべての $\alpha$-接続が Levi-Civita に一致します。逆に一点で $T=0$ でも周囲で消えなければ接続全体の一致は言えません。接続の差は [IG6 の差テンソル](../IG6/index.md#prop-ig6-difference-torsion)と整合します。

## 4. KL divergence の三階微分は二つの接続を区別する

[IG3 の混合二階微分](../IG3/index.md#thm-ig3-mixed-hessian)は divergence から計量を回収しました。二つの引数を区別して三階まで微分すれば接続が現れます。どちらの引数を二回微分するかが重要で、ここを交換すると e/m の符号が逆になります。

<a id="def-ig7-kl-induced-connections"></a>

<!-- formal-statement-start -->
> **定義（KL から誘導する二つの接続係数）**  
> 上記の正則統計モデルで、$D(\theta,\theta')=D_{\mathrm{KL}}(p_\theta\Vert p_{\theta'})$ を定める。$\partial_i$ は第一引数、$\partial_{i'}$ は第二引数の微分とし、縦線 $|_{\theta'=\theta}$ で対角線に制限する。混合二階微分で $g_{ij}=-\partial_i\partial_{j'}D|_{\theta'=\theta}$ を得るとき、次の係数を **KL 誘導の接続係数**と呼ぶ。

$$
\begin{aligned}
\Gamma^{D}_{ij,k}&=-\left.\partial_i\partial_j\partial_{k'}D\right|_{\theta'=\theta},\\
\Gamma^{D*}_{ij,k}&=-\left.\partial_{i'}\partial_{j'}\partial_kD\right|_{\theta'=\theta}.
\end{aligned}
$$

> 上添字は同じ Fisher 逆計量 $g^{k\ell}$ で上げる。前者では第一引数を二回、後者では第二引数を二回微分する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig7-kl-induced-connections -->
**定義の確認**（Bernoulli）。$p,r\in(0,1)$ とし

$$
D(p,r)=p\log\frac pr+(1-p)\log\frac{1-p}{1-r}.
$$

直接微分すると

$$
\partial_rD=\frac{r-p}{r(1-r)},\quad
\partial_pD=\log\frac{p}{1-p}-\log\frac r{1-r}.
$$

さらに $\partial_p^2\partial_rD=0$、$\partial_r^2\partial_pD=(1-2r)/[r^2(1-r)^2]$ です。よって対角線上で

$$
\Gamma^D_{pp,p}=0,\qquad
\Gamma^{D*}_{pp,p}=\frac{2p-1}{q^2}.
$$

これは前節で得た $m$ と $e$ の順に一致します。三階微分では値を計算する前に**引数の向き**を固定する必要があります。
<!-- definition-example-end -->

<a id="thm-ig7-kl-third-derivatives"></a>

<!-- formal-statement-start -->
> **定理（KL の三階微分と e/m 双対接続）**  
> 冒頭の正則性を満たし $D_{\mathrm{KL}}(p_\theta\Vert p_{\theta'})$ の三階混合微分が対角線近傍で存在する統計モデルでは、上の KL 誘導係数がアファイン接続を定め、

$$
\Gamma^D_{ij,k}=\Gamma^{(-1)}_{ij,k},\qquad
\Gamma^{D*}_{ij,k}=\Gamma^{(+1)}_{ij,k}
$$

> が成り立つ。すなわち第一引数二回微分は $m$ 接続、第二引数二回微分は $e$ 接続を与える。両者は Fisher 計量に関して双対である。
<!-- formal-statement-end -->

### 証明の見取り図

$D=E_\theta[\ell_\theta-\ell_{\theta'}]$ をそのまま微分します。第二引数の微分は期待値の中だけを微分し、第一引数の微分には期待値の分布 $p_\theta$ 自身の微分が加わります。この差が三次テンソルを生みます。

<!-- proof-start -->
### 証明

第二引数を $\theta'$ に固定して、$\partial_{k'}D=-E_\theta[\ell_k(X;\theta')]$ です。第一引数による期待値の微分公式を一回使うと

$$
\partial_i\partial_{k'}D
=-E_\theta[\ell_i(X;\theta)\ell_k(X;\theta')].
$$

さらに $\partial_j$ で微分します。$\partial_j\ell_i=\ell_{ij}$、密度の微分により $\ell_j$ がもう一つ掛かるので

$$
\partial_j\partial_i\partial_{k'}D
=-E_\theta[(\ell_{ij}+\ell_i\ell_j)(X;\theta)\ell_k(X;\theta')].
$$

対角線で $\theta'=\theta$ とし、符号を反転すると

$$
\Gamma^D_{ij,k}=E[(\ell_{ij}+\ell_i\ell_j)\ell_k]
=\Gamma^{(-1)}_{ij,k}.
$$

他方、第一引数を一回だけ微分した式から第二引数を二回微分すると、$\theta'$ に依存するのは $\ell_k(X;\theta')$ だけなので

$$
\partial_{i'}\partial_{j'}\partial_kD
=-E_\theta[\ell_k(X;\theta)\ell_{ij}(X;\theta')].
$$

対角線で符号を反転して $\Gamma^{D*}_{ij,k}=E[\ell_{ij}\ell_k]=\Gamma^{(+1)}_{ij,k}$ です。接続の変換則と双対性は [α-接続の定理](#thm-ig7-alpha-duality)から従います。対角線への制限は**すべての微分の後**に行った点に注意してください。
<!-- proof-end -->

一般の滑らかな divergence でも対角線で零、一階偏微分が零、混合 Hessian が正定値なら同様の三階微分から接続候補を作れますが、KL と同じ $e/m$ になるとは限りません。この章で同定したのは **指定した向きの KL** です。[IG3 の局所二階計量](../IG3/index.md#thm-ig3-mixed-hessian)だけから三階係数を決めることもできません。

## 5. 具体モデルで符号と係数を検算する

### 5.1 Bernoulli：自然座標と混合座標

$p\in(0,1)$、$q=p(1-p)$ について、既出の $g_{pp}=1/q$、$T_{ppp}=(1-2p)/q^2$ と接続の式をまとめると

| 接続 | $p$ 座標での $\Gamma^p_{pp}$ | $a=\log\{p/(1-p)\}$ 座標での $\Gamma^a_{aa}$ |
|---|---:|---:|
| $e$（$\alpha=+1$） | $(2p-1)/q$ | $0$ |
| $\mathrm{LC}$（$\alpha=0$） | $(2p-1)/(2q)$ | $(1-2p)/2$ |
| $m$（$\alpha=-1$） | $0$ | $1-2p$ |

右列は [IG6 の接続変換則](../IG6/index.md#thm-ig6-coordinate-covariance)で検算できます。$dp/da=q$、$d^2p/da^2=q(1-2p)$ ですから

$$
\Gamma^{(\alpha)a}_{aa}
=\frac1q\left(q^2\Gamma^{(\alpha)p}_{pp}+q(1-2p)\right)
=\frac{1-\alpha}{2}(1-2p).
$$

したがって $e$ の係数が零になるのは自然座標 $a$、$m$ の係数が零になるのは混合座標 $p$ です。ただし**一次元の接続係数が適当な座標で零になること**は、一般の多次元モデルの e/m 平坦性の証明ではありません。IG8 で全指数型分布族と曲がった部分族を分けて議論します。

### 5.2 正規位置尺度族：二次元では異なる成分が現れる

$X\sim N(\mu,\sigma^2)$、$\mu\in\mathbb R$、$\sigma>0$ とし、$z=(X-\mu)/\sigma$ と置きます。密度と対数密度は

$$
p(x;\mu,\sigma)=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),\qquad
\ell=-\frac12\log(2\pi)-\log\sigma-\frac{z^2}{2}.
$$

$\partial_\mu z=-1/\sigma$、$\partial_\sigma z=-z/\sigma$ であり、$\sigma$ 微分では $z$ 自身も変化します。例えば対数密度から

$$
\ell_\sigma=-\frac1\sigma-z\left(-\frac z\sigma\right)
=\frac{z^2-1}{\sigma}
$$

を得て、もう一度 $\sigma$ で微分すると

$$
\partial_\sigma\ell_\sigma
=\frac{2z(-z/\sigma)}{\sigma}-\frac{z^2-1}{\sigma^2}
=\frac{1-3z^2}{\sigma^2}.
$$

一階・二階微分を $z$ で表すと

$$
\begin{aligned}
\ell_\mu&=z/\sigma,&\ell_\sigma&=(z^2-1)/\sigma,\\
\ell_{\mu\mu}&=-1/\sigma^2,&\ell_{\mu\sigma}&=-2z/\sigma^2,&
\ell_{\sigma\sigma}&=(1-3z^2)/\sigma^2.
\end{aligned}
$$

$E[z^2]=1$、$E[z^4]=3$、$E[z^6]=15$（標準正規密度の部分積分で得る）から、Fisher 計量と非零の三次成分は

$$
(g_{ij})=\frac1{\sigma^2}\begin{pmatrix}1&0\\0&2\end{pmatrix},
\qquad T_{\mu\mu\sigma}=\frac2{\sigma^3},
\qquad T_{\sigma\sigma\sigma}=\frac8{\sigma^3}.
$$

前者の三次成分は $E[z^2(z^2-1)]/\sigma^3=(3-1)/\sigma^3$、後者は $E[(z^2-1)^3]/\sigma^3=(15-9+3-1)/\sigma^3$ です。$z$ に関して奇関数となる $T_{\mu\mu\mu}$、$T_{\mu\sigma\sigma}$ は零です。$g^{ij}=\operatorname{diag}(\sigma^2,\sigma^2/2)$ を用いて添字を上げます。

まず $e$ 接続の下げた係数は $E[\ell_{ij}\ell_k]$ です。非零なのは

$$
\Gamma^e_{\mu\sigma,\mu}=-\frac2{\sigma^3},
\qquad
\Gamma^e_{\sigma\sigma,\sigma}=-\frac6{\sigma^3}.
$$

例えば後者の分子は $E[(1-3z^2)(z^2-1)]=4-1-9=-6$ です。$m$ 接続は $\Gamma^m_{ij,k}=\Gamma^e_{ij,k}+T_{ijk}$ により求まります。零でない**上付き係数**をまとめると、下添字 $i,j$ は対称であり

| 接続 | $\Gamma^\mu_{\mu\sigma}=\Gamma^\mu_{\sigma\mu}$ | $\Gamma^\sigma_{\mu\mu}$ | $\Gamma^\sigma_{\sigma\sigma}$ |
|---|---:|---:|---:|
| $e$ | $-2/\sigma$ | $0$ | $-3/\sigma$ |
| $m$ | $0$ | $1/\sigma$ | $1/\sigma$ |
| $\mathrm{LC}$ | $-1/\sigma$ | $1/(2\sigma)$ | $-1/\sigma$ |

例えば $\partial_\sigma g_{\mu\mu}=-2/\sigma^3$ は双対式の右辺 $g_{\mu\mu}\Gamma^{e,\mu}_{\sigma\mu}+g_{\mu\mu}\Gamma^{m,\mu}_{\sigma\mu}=(-2/\sigma)/\sigma^2+0$ に一致します。これは多次元でも双対性の一つの成分を直接確認した例です。

## 6. 演習

### IG7-A01 双対式から未知の係数を求める

区間 $(0,1)$ 上の計量 $g_{pp}=1/[p(1-p)]$ と接続 $\Gamma^p_{pp}=0$ を考える。この計量に関する双対接続の係数 $\Gamma^{*p}_{pp}$ を定義から求め、$p=1/4$ で式を検算せよ。

- Level: A
- 狙い: 計量に関する双対接続の定義を成分で使う

<!-- solution-start -->
**詳細解答**

$q=p(1-p)$ と置く。基底 $X=Y=Z=\partial_p$ に [双対性の定義](#def-ig7-dual-connection)を代入すると $\partial_pg_{pp}=g_{pp}(\Gamma^p_{pp}+\Gamma^{*p}_{pp})$ です。$q'=1-2p$ より $\partial_p(1/q)=-(1-2p)/q^2$ だから

$$
\Gamma^{*p}_{pp}=q\frac{2p-1}{q^2}-0=\frac{2p-1}{q}.
$$

$p=1/4$ では $q=3/16$、左辺 $(-1/2)/(9/256)=-128/9$、右辺 $g_{pp}\Gamma^{*p}_{pp}=(16/3)(-8/3)=-128/9$ で一致します。
<!-- solution-end -->

### IG7-A02 Bernoulli の三次テンソル

$X\in\{0,1\}$、$P_p(X=1)=p$、$P_p(X=0)=1-p$、$0<p<1$ とする。score $\ell_p$ と $T_{ppp}$ を有限和で計算し、$a=\log\{p/(1-p)\}$ における $T_{aaa}$ を変換則で求めよ。

- Level: A
- 狙い: score の三乗とテンソル変換の区別

<!-- solution-start -->
**詳細解答**

$\ell=x\log p+(1-x)\log(1-p)$ を微分すると $\ell_p=x/p-(1-x)/(1-p)$ です。従って

$$
T_{ppp}=p(1/p)^3+(1-p)\{-1/(1-p)\}^3
=\frac{1-2p}{p^2(1-p)^2}.
$$

$p=e^a/(1+e^a)$ で $dp/da=p(1-p)=q$ です。[三次テンソルの変換則](#prop-ig7-tensor-transformation)に $P^p_a=q$ を代入すると $T_{aaa}=q^3(1-2p)/q^2=q(1-2p)$ です。三つの添字分の Jacobian を掛けた点が重要です。
<!-- solution-end -->

### IG7-A03 α の符号と特殊値

Bernoulli 族の $p\in(0,1)$ に $g_{pp}=1/q$、$q=p(1-p)$、$T_{ppp}=(1-2p)/q^2$ を与える。$\Gamma^{\mathrm{LC},p}_{pp}=(2p-1)/(2q)$ とする。$\alpha=+1,0,-1$ の係数を $\Gamma^{(\alpha)}=\Gamma^{\mathrm{LC}}-(\alpha/2)g^{-1}T$ から求めよ。

- Level: A
- 狙い: α の符号を計量で添字を上げて確かめる

<!-- solution-start -->
**詳細解答**

$g^{pp}=q$ なので $g^{pp}T_{ppp}=(1-2p)/q$ です。[α-接続の存在・捩率零・双対性](#thm-ig7-alpha-duality)から

$$
\Gamma^{(\alpha)p}_{pp}=\frac{2p-1}{2q}-\frac\alpha2\frac{1-2p}{q}
=\frac{(1+\alpha)(2p-1)}{2q}.
$$

$\alpha=+1$ では $(2p-1)/q$（e）、$\alpha=0$ では $(2p-1)/(2q)$（Levi-Civita）、$\alpha=-1$ では $0$（m）です。$g^{pp}$ を掛けないと添字の型も係数の次元も合いません。
<!-- solution-end -->

### IG7-A04 KL の三階微分を直接計算する

$p,r\in(0,1)$ の Bernoulli KL を $D(p,r)=p\log(p/r)+(1-p)\log\{(1-p)/(1-r)\}$ と定める。$-\partial_p^2\partial_rD|_{r=p}$ と $-\partial_r^2\partial_pD|_{r=p}$ を求め、どちらが e/m か述べよ。

- Level: A
- 狙い: KL の引数順と三階微分の符号を固定する

<!-- solution-start -->
**詳細解答**

第二引数で一回微分すると $\partial_rD=-p/r+(1-p)/(1-r)=(r-p)/[r(1-r)]$ です。$r$ 固定の下では $p$ に一次式なので $\partial_p^2\partial_rD=0$ です。一方、$\partial_pD=\log\{p/(1-p)\}-\log\{r/(1-r)\}$ なので

$$
\partial_r\partial_pD=-\frac1{r(1-r)},\qquad
\partial_r^2\partial_pD=\frac{1-2r}{r^2(1-r)^2}.
$$

従って答えは順に $0$ と $(2p-1)/[p^2(1-p)^2]$ です。[KL の三階微分と e/m 双対接続](#thm-ig7-kl-third-derivatives)により前者が m、後者が e の下付き係数です。
<!-- solution-end -->

### IG7-B01 双対の平均と捩率

滑らかな Riemann 多様体 $(M,g)$ 上の任意の接続 $\nabla$ とその $g$-双対 $\nabla^*$ を考える。$D=(\nabla+\nabla^*)/2$ が計量両立であることを定義から証明せよ。次に、二接続が捩率零なら $D=\nabla^{\mathrm{LC}}$ であることを示し、捩率零を除いたときに同じ結論が言えない例を $\mathbb R^2$ の標準計量で作れ。

- Level: B
- 狙い: 計量両立と捩率零を独立の条件として扱う

<!-- solution-start -->
**詳細解答**

[計量に関する双対接続の定義](#def-ig7-dual-connection)と二重双対を、$Y,Z$ の交換も含めて書くと

$$
\begin{aligned}
Xg(Y,Z)&=g(\nabla_XY,Z)+g(Y,\nabla_X^*Z),\\
Xg(Y,Z)&=g(\nabla_X^*Y,Z)+g(Y,\nabla_XZ).
\end{aligned}
$$

二式を足して 2 で割れば $Xg(Y,Z)=g(D_XY,Z)+g(Y,D_XZ)$ です。捩率零が双方で成立すれば $D$ も捩率零で、[Levi-Civita の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)により $D=\nabla^{\mathrm{LC}}$ です。

反例として $\mathbb R^2$ の Euclid 計量を標準座標で固定し、定数 $c\ne0$ に対して $\nabla_{\partial_1}\partial_2=c\partial_1$、$\nabla_{\partial_1}\partial_1=-c\partial_2$、それ以外の係数を零と置きます。各方向 $i$ における係数行列 $A_i$ は $A_1=\left(\begin{smallmatrix}0&c\\-c&0\end{smallmatrix}\right)$、$A_2=0$ で反対称です。標準計量は $g_{jk}=\delta_{jk}$ で一定なので、$\partial_i g_{jk}=0$ に対して

$$
g(\nabla_{\partial_i}\partial_j,\partial_k)
+g(\partial_j,\nabla_{\partial_i}\partial_k)
=(A_i)_{kj}+(A_i)_{jk}=0.
$$

よって $\nabla g=0$ となり $\nabla^*=\nabla$ ですが、$\operatorname{Tor}(\partial_1,\partial_2)=c\partial_1\ne0$ です。従って $D=\nabla$ は Levi-Civita と違います。
<!-- solution-end -->

### IG7-B02 正規分布の三次テンソルと双対性

$X\sim N(\mu,\sigma^2)$、$\mu\in\mathbb R,\sigma>0$ の密度を $p(x)=\exp\{-(x-\mu)^2/(2\sigma^2)\}/(\sqrt{2\pi}\sigma)$ とする。$z=(X-\mu)/\sigma$ に対して $E[z^2]=1,E[z^4]=3,E[z^6]=15$ を使ってよい。$T_{\mu\mu\sigma}$ と $T_{\sigma\sigma\sigma}$ を求め、$\partial_\sigma g_{\mu\mu}$ に関する e/m 双対性を確かめよ。ただし $g_{\mu\mu}=1/\sigma^2$, $g_{\sigma\sigma}=2/\sigma^2$, $g_{\mu\sigma}=0$ とする。

- Level: B
- 狙い: 非零の三次成分と接続の双対性を結ぶ

<!-- solution-start -->
**詳細解答**

対数密度を微分すると $\ell_\mu=z/\sigma$、$\ell_\sigma=(z^2-1)/\sigma$ です。従って

$$
\begin{aligned}
T_{\mu\mu\sigma}&=E[z^2(z^2-1)]/\sigma^3=(3-1)/\sigma^3=2/\sigma^3,\\
T_{\sigma\sigma\sigma}&=E[(z^2-1)^3]/\sigma^3=(15-9+3-1)/\sigma^3=8/\sigma^3.
\end{aligned}
$$

$\ell_{\sigma\mu}=-2z/\sigma^2$ なので $\Gamma^e_{\sigma\mu,\mu}=E[(-2z/\sigma^2)(z/\sigma)]=-2/\sigma^3$ です。$m$ 側は $T_{\sigma\mu\mu}$ を加えて $0$。逆計量 $g^{\mu\mu}=\sigma^2$ で上添字にすると $\Gamma^{e,\mu}_{\sigma\mu}=-2/\sigma$、$\Gamma^{m,\mu}_{\sigma\mu}=0$。よって

$$
g_{\mu\mu}\Gamma^{e,\mu}_{\sigma\mu}+g_{\mu\mu}\Gamma^{m,\mu}_{\sigma\mu}
=-\frac2{\sigma^3}=\partial_\sigma\frac1{\sigma^2}.
$$

[双対性の座標式](#thm-ig7-alpha-duality)が成立しました。
<!-- solution-end -->

### IG7-B03 KL の引数反転と接続の交換

三階まで滑らかな KL divergence を $D(\theta,\theta')=D_{\mathrm{KL}}(p_\theta\Vert p_{\theta'})$ とし、反転 $\widetilde D(\theta,\theta')=D(\theta',\theta)$ を定める。$D$ の二つの三階誘導係数を $\Gamma^D_{ij,k}=-\partial_i\partial_j\partial_{k'}D|$、$\Gamma^{D*}_{ij,k}=-\partial_{i'}\partial_{j'}\partial_kD|$ とする。反転後の二つの係数を元の係数で表し、Fisher 計量は変わらないことを示せ。

- Level: B
- 狙い: divergence の向きが計量には見えず三階で見えることを証明する

<!-- solution-start -->
**詳細解答**

$\widetilde D(\theta,\theta')=D(\theta',\theta)$ では、第一引数の $\partial_i$ が元の第二引数の $\partial_{i'}$ に、第二引数の $\partial_{k'}$ が元の第一引数の $\partial_k$ に対応します。三回微分の後で対角線に置けば

$$
\Gamma^{\widetilde D}_{ij,k}
=-\left.\partial_{i'}\partial_{j'}\partial_kD\right|=\Gamma^{D*}_{ij,k},
\quad
\Gamma^{\widetilde D*}_{ij,k}=\Gamma^D_{ij,k}.
$$

混合二階微分については $-\partial_i\partial_{j'}\widetilde D|=-\partial_{i'}\partial_jD|=g_{ji}=g_{ij}$ で不変です。[KL の三階微分と e/m 双対接続](#thm-ig7-kl-third-derivatives)により、元の $m/e$ が反転によって $e/m$ に交換されます。
<!-- solution-end -->

### IG7-B04 座標を変えても接続の差はテンソル

Bernoulli 族 $P_p(X=1)=p$（$p\in(0,1)$）で $a=\log\{p/(1-p)\}$ とする。$\Gamma^{e,p}_{pp}=(2p-1)/q$、$\Gamma^{m,p}_{pp}=0$、$q=p(1-p)$ が与えられている。接続変換則で $\Gamma^{e,a}_{aa},\Gamma^{m,a}_{aa}$ を計算し、差 $\Gamma^{e}-\Gamma^{m}=-g^{-1}T$ が $a$ 座標でも成り立つことを証明せよ。

- Level: B
- 狙い: 接続係数と接続差テンソルの変換の違いを確認する

<!-- solution-start -->
**詳細解答**

$dp/da=q$、$d^2p/da^2=q(1-2p)$ です。[接続係数の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)にそれぞれ代入します。

$$
\begin{aligned}
\Gamma^{e,a}_{aa}&=\frac1q\left(q^2\frac{2p-1}{q}+q(1-2p)\right)=0,\\
\Gamma^{m,a}_{aa}&=\frac1q\left(0+q(1-2p)\right)=1-2p.
\end{aligned}
$$

一方 $g_{aa}=q^2g_{pp}=q$、$g^{aa}=1/q$、[三次テンソルの変換則](#prop-ig7-tensor-transformation)によれば $T_{aaa}=q^3(1-2p)/q^2=q(1-2p)$ です。従って

$$
\Gamma^{e,a}_{aa}-\Gamma^{m,a}_{aa}=-(1-2p)
=-g^{aa}T_{aaa}.
$$

個々の接続係数に含まれた二階微分の項は差を取ると消えます。
<!-- solution-end -->

### IG7-C01 Bernoulli の計量・互いに双対な接続・KL を一つに結ぶ

Bernoulli 族 $P_p(X=1)=p$、$P_p(X=0)=1-p$（$p\in(0,1)$）について、$q=p(1-p)$、$a=\log\{p/(1-p)\}$ と置く。$D(p,r)=p\log(p/r)+(1-p)\log\{(1-p)/(1-r)\}$ とする。

1. score を有限和から求め、Fisher 計量 $g_{pp}$ と三次テンソル $T_{ppp}$ を導け。
2. e、m、Levi-Civita 接続の $p$ 座標係数を α-接続の定義から導け。e/m の双対性を計量微分で検算せよ。
3. 接続変換則で三つの $a$ 座標係数を求め、$a$ で e 係数、$p$ で m 係数が零となることを示せ。
4. $D$ の三階混合微分を二通り直接計算し、どちらが e/m か同定せよ。
5. $p=1/2$ の一点で $T=0$ であることから、e と m が $(0,1)$ 全体で同じ接続だと言えるか。理由を述べよ。

- Level: C
- 狙い: 定義・テンソル性・双対性・再パラメータ化・KL の符号を一体として再構成する

<!-- solution-start -->
**詳細解答**

1. 対数質量関数は $\ell=x\log p+(1-x)\log(1-p)$ です。微分した $\ell_p=x/p-(1-x)/(1-p)$ を $x=1,0$ に代入すると

   $$
   \begin{aligned}
   g_{pp}&=p\frac1{p^2}+(1-p)\frac1{(1-p)^2}=\frac1q,\\
   T_{ppp}&=p\frac1{p^3}-(1-p)\frac1{(1-p)^3}=\frac{1-2p}{q^2}.
   \end{aligned}
   $$

2. $\ell_{pp}(1)=-1/p^2$、$\ell_{pp}(0)=-1/(1-p)^2$ です。従って

   $$
   E[\ell_{pp}\ell_p]=-\frac1{p^2}+\frac1{(1-p)^2}=\frac{2p-1}{q^2}.
   $$

   [α-接続の定義](#def-ig7-alpha-connection)と逆計量 $g^{pp}=q$ を用いて

   $$
   \Gamma^{(\alpha)p}_{pp}=q\left\{\frac{2p-1}{q^2}+\frac{1-\alpha}{2}\frac{1-2p}{q^2}\right\}
   =\frac{(1+\alpha)(2p-1)}{2q}.
   $$

   特殊値を入れると $\Gamma^{e,p}_{pp}=(2p-1)/q$、$\Gamma^{m,p}_{pp}=0$、$\Gamma^{\mathrm{LC},p}_{pp}=(2p-1)/(2q)$ です。$\partial_pg_{pp}=(2p-1)/q^2$ と $g_{pp}(\Gamma^{e,p}_{pp}+\Gamma^{m,p}_{pp})=(1/q)(2p-1)/q$ が等しく、[双対性の定義](#def-ig7-dual-connection)を満たします。

3. $p=e^a/(1+e^a)$ から $dp/da=q$、$d^2p/da^2=q(1-2p)$ です。[IG6 の接続係数の変換則](../IG6/index.md#thm-ig6-coordinate-covariance)を使って

   $$
   \Gamma^{(\alpha)a}_{aa}=\frac1q\{q^2\Gamma^{(\alpha)p}_{pp}+q(1-2p)\}
   =\frac{1-\alpha}{2}(1-2p).
   $$

   よって $\Gamma^{e,a}_{aa}=0$、$\Gamma^{m,a}_{aa}=1-2p$、$\Gamma^{\mathrm{LC},a}_{aa}=(1-2p)/2$ で、$p$ 側の $m$ の零係数と対になります。

4. $r$ 固定で $\partial_rD=(r-p)/[r(1-r)]$、$p$ 固定で $\partial_pD=\log\{p/(1-p)\}-\log\{r/(1-r)\}$ です。順に二回微分すると

   $$
   \begin{aligned}
   -\left.\partial_p^2\partial_rD\right|_{r=p}&=0,\\
   -\left.\partial_r^2\partial_pD\right|_{r=p}&=-\left.\partial_r\left(-\frac1{r(1-r)}\right)\right|_{r=p}
   =\frac{2p-1}{q^2}.
   \end{aligned}
   $$

   それぞれ $\Gamma^m_{pp,p}=g_{pp}\Gamma^{m,p}_{pp}=0$、$\Gamma^e_{pp,p}=g_{pp}\Gamma^{e,p}_{pp}=(2p-1)/q^2$ と一致します。

5. $p=1/2$ では $T_{ppp}=0$ ですが、例えば $p=1/4$ では $T_{ppp}=(1/2)/(9/256)=128/9\ne0$ です。[α-接続の差の式](#thm-ig7-alpha-duality)により e と m の差は $-g^{-1}T$ なので、一点で係数が一致しても開区間全体では一致しません。
<!-- solution-end -->

---

## 7. 何が分かったか

- 計量に関する双対接続は計量の変化を二つの共変微分へ分配する規則で、非退化な計量の下で一意です。二つとも捩率零なら平均は Levi-Civita 接続です。
- score の三乗期待値は対称三次テンソル $T$ となり、$\alpha$-接続は $\nabla^{\mathrm{LC}}-(\alpha/2)T^\sharp$ と表せます。$\alpha=+1$ が e、$\alpha=-1$ が m で、互いに双対です。
- 向きを固定した $D_{\mathrm{KL}}(p_\theta\Vert p_{\theta'})$ の三階微分は、第一引数を二回なら m、第二引数を二回なら e を誘導します。
- Bernoulli と正規位置尺度族では具体的に符号と係数を計算できました。**双対性は平坦性を意味しません。** 次の IG8 で、どの統計モデルのどの座標で接続が平坦になるかを調べます。
