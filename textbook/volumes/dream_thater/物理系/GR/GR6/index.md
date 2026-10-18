# GR6 Riemann・Ricci・スカラー曲率

<!-- definition-example-audit: strict -->

[GR5の測地線偏差方程式](../GR5/index.md#thm-gr5-deviation)によって、曲率は隣接する自由落下者の相対加速度を決めると分かりました。しかし、三つの空間軸に沿って測る潮汐から、時空全体の曲率をどのように整理すればよいのでしょうか。個々の方向の曲率情報を一つの方向についてまとめ、最後に全方向で縮約するのが本章の主題です。

数学的な出発点は[GEO16の曲率作用素とRiemannテンソル](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)です。ただしGEO16は正定値計量を使っており、一般相対論の時間方向は負の長さ二乗を持ちます。ここでは[LORG4のLorentz計量のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に基づき、座標添字の位置、逆計量を掛ける場所、負符号を明確にして計算し直します。

以下、$(M,g)$ は滑らかな4次元時間向き付きLorentz多様体、符号は $(-,+,+,+)$、光速は $c>0$ とします。局所座標を $(x^0,x^1,x^2,x^3)$ とし、ギリシャ添字は $0,1,2,3$ を走り、重複する上下添字について和を取ります。時間座標を $x^0=ct$ とする場合と $t$ を使う場合は、それぞれ明記します。曲率演算子の規約は一貫して

$$
R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
$$

です。計量符号と曲率演算子の符号は独立な規約であり、これらを一度に反転させません。

## 1. 共変微分の交換から四添字へ

接続はベクトル場を方向に沿って微分する操作です。二方向の順番を入れ替えた差を測ると、平坦なCartesian座標では消え、曲がった時空では残ります。[GEO16の座標曲率の命題](../../../幾何系/GEO/GEO16/index.md#prop-geo16-tensoriality-coordinate)を現在の記法で展開してみましょう。

座標基底 $\partial_\mu$ に対して

$$
\nabla_{\partial_\mu}\partial_\sigma
=\Gamma^\rho_{\mu\sigma}\partial_\rho
$$

と書きます。曲率がどの成分を受け取りどの成分を返すかを曖昧にしないため、次の添字順を固定します。

<a id="prop-gr6-coordinate-curvature"></a>

<!-- formal-statement-start -->
> **命題（曲率作用素の成分と計量による添字下げ）**  
> 上のLorentz時空のLevi-Civita接続について、成分 $R^\rho{}_{\sigma\mu\nu}$ を

$$
R(\partial_\mu,\partial_\nu)\partial_\sigma
=R^\rho{}_{\sigma\mu\nu}\partial_\rho
$$

> と定義すると、次の座標式が成り立つ。

$$
\boxed{
R^\rho{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^\rho_{\nu\sigma}
-\partial_\nu\Gamma^\rho_{\mu\sigma}
+\Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}
-\Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}
}
$$

> 四つの添字をすべて下げた成分は

$$
R_{\alpha\sigma\mu\nu}
=g_{\alpha\rho}R^\rho{}_{\sigma\mu\nu}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

座標ベクトルのLie括弧は零です。接続を二回作用させると、Christoffel係数の微分と係数どうしの積がそれぞれ現れます。

<!-- proof-start -->
### 証明

[曲率作用素の定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)に $\partial_\mu,\partial_\nu,\partial_\sigma$ を代入します。まずLeibniz則により

$$
\begin{aligned}
\nabla_{\partial_\mu}\nabla_{\partial_\nu}\partial_\sigma
&=\nabla_{\partial_\mu}
  (\Gamma^\lambda_{\nu\sigma}\partial_\lambda)\\
&=(\partial_\mu\Gamma^\rho_{\nu\sigma})\partial_\rho
+\Gamma^\lambda_{\nu\sigma}\Gamma^\rho_{\mu\lambda}\partial_\rho .
\end{aligned}
$$

ここで $\mu$ と $\nu$ を交換した式を引きます。座標ベクトル場は $[\partial_\mu,\partial_\nu]=0$ なので、Lie括弧から来る項は零です。各 $\partial_\rho$ の係数を比較すると命題の四項式になります。最後の添字下げは $g(R(\partial_\mu,\partial_\nu)\partial_\sigma,\partial_\alpha)$ を定義どおりに展開したものです。$\square$
<!-- proof-end -->

四添字の順序には文献差があります。この章の $R_{\alpha\sigma\mu\nu}$ は「出力、作用されるベクトル、第一方向、第二方向」です。一方[GEO16の四重線形形式](../../../幾何系/GEO/GEO16/index.md#def-geo16-curvature)は $\operatorname{Rm}(X,Y,Z,W)=g(R(X,Y)Z,W)$ と引数を並べます。従って

$$
R_{\alpha\sigma\mu\nu}
=\operatorname{Rm}(\partial_\mu,\partial_\nu,\partial_\sigma,\partial_\alpha).
$$

これが異なる教科書の成分式を比較する際の翻訳表になります。

[GEO16の曲率対称性](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)の証明は計量両立性・捩率零・非退化性を用い、正定値性には依存しません。[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)もこれらを満たすので、Lorentz時空でも

$$
R_{\alpha\sigma\mu\nu}=-R_{\sigma\alpha\mu\nu},
\qquad
R_{\alpha\sigma\mu\nu}=-R_{\alpha\sigma\nu\mu},
\qquad
R_{\alpha\sigma\mu\nu}=R_{\mu\nu\alpha\sigma}
$$

が成り立ちます。接続係数 $\Gamma^\rho_{\mu\nu}$ は曲線座標では非零になり得ますが、これらの対称性を持つ $R$ はテンソルです。

## 2. 曲率を縮約する意味

四添字の曲率は多くの情報を持ちます。あるベクトル $Y$ を固定して「その周囲の方向 $X$ の効果を足す」と、二添字のRicci曲率ができます。さらに逆計量でその二添字を縮約すると、一つの実数であるスカラー曲率ができます。

ただし「足す」といっても、時間方向は空間方向と同じ符号では足せません。非退化なLorentz計量は各点で逆行列 $(g^{\mu\nu})$ を持つため、これを使った添字縮約が座標によらない定義になります。

<a id="def-gr6-ricci-scalar"></a>

<!-- formal-statement-start -->
> **定義（Lorentz時空のRicci曲率・スカラー曲率）**  
> 4次元Lorentz時空 $(M,g)$ の曲率を前節の成分規約で表す。曲率作用素の第一方向と出力方向を縮約した

$$
\boxed{\operatorname{Ric}_{\sigma\nu}
=R^\rho{}_{\sigma\rho\nu}
=g^{\rho\alpha}R_{\alpha\sigma\rho\nu}}
$$

> を **Ricci曲率**（Ricciテンソル）と定める。次にRicci曲率の二つの添字を逆計量で縮約した

$$
\boxed{\mathcal R=g^{\sigma\nu}\operatorname{Ric}_{\sigma\nu}}
$$

> を **スカラー曲率** と定める。$\mathcal R$ は曲率演算子 $R$ と区別するために別の記号で表す。
<!-- formal-statement-end -->

先行する[GEO16のRicci曲率・スカラー曲率](../../../幾何系/GEO/GEO16/index.md#def-geo16-ricci-scalar)はRiemann計量上の同じ縮約です。Lorentz計量でも逆行列を使うという仕組みは変わりませんが、正規直交基底での符号が変わります。

<!-- definition-example-start: def-gr6-ricci-scalar -->
**定義の確認：Minkowski時空。** 座標 $(x^0,x^1,x^2,x^3)=(ct,x,y,z)$ で計量行列を $\operatorname{diag}(-1,1,1,1)$ とします。行列は非退化で逆行列も同じです。計量成分が定数なので[LORG4の接続係数公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)から $\Gamma^\rho_{\mu\nu}=0$。四項の曲率公式の各項が零だから $R^\rho{}_{\sigma\mu\nu}=0$、従って縮約した $\operatorname{Ric}_{\sigma\nu}=0$、さらに $\mathcal R=0$ です。これは座標行列の値を言うだけでなく、曲率から二段階で縮約する定義を確認したものです。
<!-- definition-example-end -->

<a id="prop-gr6-orthonormal-contraction"></a>

<!-- formal-statement-start -->
> **命題（Lorentz直交枠における縮約とRicciの対称性）**  
> 4次元Lorentz時空の一点で $g(e_a,e_b)=\varepsilon_a\delta_{ab}$、$\varepsilon_0=-1$、$\varepsilon_i=1$（$i=1,2,3$）を満たす直交基底を取ると、任意の $Y,Z$ について

$$
\boxed{\operatorname{Ric}(Y,Z)
=\sum_{a=0}^3\varepsilon_a\,g(R(e_a,Y)Z,e_a)}
$$

> が成り立つ。この式は直交基底の選択に依らない。またRicciテンソルは対称であり、スカラー曲率は

$$
\boxed{\mathcal R=-\operatorname{Ric}(e_0,e_0)
+\sum_{i=1}^3\operatorname{Ric}(e_i,e_i)}
$$

> に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

正定値のときの $\sum_a$ をそのまま用いると時間成分の符号を間違えます。逆計量そのものを基底で表すことが符号の根拠です。

<!-- proof-start -->
### 証明

直交基底で計量行列は $\operatorname{diag}(-1,1,1,1)$ です。各 $\varepsilon_a^2=1$ なので逆行列も $\operatorname{diag}(\varepsilon_0,\ldots,\varepsilon_3)$ です。[Ricci曲率の定義](#def-gr6-ricci-scalar)でこの逆計量を用い、各引数を成分展開すれば

$$
\begin{aligned}
\operatorname{Ric}(Y,Z)
&=g^{\rho\alpha}
  g(R(\partial_\rho,Y)Z,\partial_\alpha)\\
&=\sum_a\varepsilon_a g(R(e_a,Y)Z,e_a)
\end{aligned}
$$

を得ます。第一行は任意の基底でのテンソル縮約だから、第二行も直交基底の取り替えに依存しません。

対称性には[曲率テンソルの対交換・反対称性](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)を使います。各 $a$ に対して

$$
\begin{aligned}
g(R(e_a,Z)Y,e_a)
&=\operatorname{Rm}(e_a,Z,Y,e_a)\\
&=\operatorname{Rm}(Y,e_a,e_a,Z)\\
&=\operatorname{Rm}(e_a,Y,Z,e_a)
\end{aligned}
$$

です。最後は前二変数と後二変数の反対称性をそれぞれ一回使っています。この式に $\varepsilon_a$ を掛けて和を取れば $\operatorname{Ric}(Z,Y)=\operatorname{Ric}(Y,Z)$。最後にスカラー曲率の定義で逆計量の対角要素を掛ければ表示式になります。$\square$
<!-- proof-end -->

[GR4の局所直交枠](../GR4/index.md#def-gr4-observer-frame)で未来向き四元速度を $u=ce_0$ とすると、[GR5の潮汐行列](../GR5/index.md#def-gr5-tidal-matrix)は $\mathcal E_{ij}=g(R(e_i,e_0)e_0,e_j)$ です。ここで $R(e_0,e_0)=0$ だから

$$
\boxed{\operatorname{Ric}(u,u)
=c^2\sum_{i=1}^3\mathcal E_{ii}}.
$$

これは時間方向の潮汐の **跡** に相当します。一方、潮汐行列の対角和を知っても全四添字は一般に復元できません。縮約は情報を捨てる操作なのです。

## 3. 定曲率模型で係数を一つずつ数える

[GEO16の定断面曲率テンソル](../../../幾何系/GEO/GEO16/index.md#prop-geo16-constant-curvature-tensor)は、計量から代数的に曲率を組み立てる手本です。Lorentz時空でも定数 $K$ に対し次の曲率形を仮定できます。時間的な2平面も含むので、Riemann多様体の「全方向の正定値な断面」をそのまま移植するのではなく、ここでは四添字の式そのものを仮定とします。

<a id="prop-gr6-constant-curvature"></a>

<!-- formal-statement-start -->
> **命題（一定の曲率形を持つLorentz時空の縮約）**  
> $n\ge2$ 次元の非退化な計量 $g$ とそのLevi-Civita接続があり、ある定数 $K$ について任意のベクトル $X,Y,Z$ が

$$
R(X,Y)Z
=K\{g(Y,Z)X-g(X,Z)Y\}
$$

> を満たすとする。このとき

$$
\boxed{\operatorname{Ric}=(n-1)K g,\qquad
\mathcal R=n(n-1)K}.
$$

> 特に4次元では $\operatorname{Ric}=3Kg$、$\mathcal R=12K$ である。
<!-- formal-statement-end -->

### 証明の見取り図

出力 $X$ と $Y$ の係数を成分表示し、出力添字と第一方向添字を縮約します。最初の項に次元 $n$ が出て、第二項が $1$ を引きます。

<!-- proof-start -->
### 証明

座標基底 $X=\partial_\mu,Y=\partial_\nu,Z=\partial_\sigma$ を代入すると

$$
R^\rho{}_{\sigma\mu\nu}
=K(\delta^\rho_\mu g_{\nu\sigma}
-\delta^\rho_\nu g_{\mu\sigma}).
$$

[縮約の定義](#def-gr6-ricci-scalar)に従い $\mu=\rho$ として和を取ります。

$$
\begin{aligned}
\operatorname{Ric}_{\sigma\nu}
&=R^\rho{}_{\sigma\rho\nu}\\
&=K(\delta^\rho_\rho g_{\nu\sigma}
-\delta^\rho_\nu g_{\rho\sigma})\\
&=K(ng_{\nu\sigma}-g_{\nu\sigma})\\
&=(n-1)Kg_{\sigma\nu}.
\end{aligned}
$$

ここで $\sum_\rho\delta^\rho_\rho=n$、$\sum_\rho\delta^\rho_\nu g_{\rho\sigma}=g_{\nu\sigma}$ です。次に

$$
\begin{aligned}
\mathcal R
&=g^{\sigma\nu}\operatorname{Ric}_{\sigma\nu}\\
&=(n-1)K g^{\sigma\nu}g_{\sigma\nu}\\
&=(n-1)K\delta^\sigma_\sigma\\
&=n(n-1)K.
\end{aligned}
$$

負符号を持つ時間軸があっても、逆計量と計量の積は恒等行列だから最後の係数は $n$ です。$\square$
<!-- proof-end -->

**直接例。** 4次元の $K>0$ の曲率形を局所直交枠に代入すると

$$
R(e_i,e_0)e_0
=K\{g(e_0,e_0)e_i-g(e_i,e_0)e_0\}
=-Ke_i.
$$

従って[GR5の潮汐行列](../GR5/index.md#def-gr5-tidal-matrix)は $\mathcal E_{ij}=-K\delta_{ij}$、$\operatorname{Ric}(u,u)=-3c^2K$ です。[前節の潮汐の跡](#prop-gr6-orthonormal-contraction)で計算すると $c^2(-3K)$ となり一致します。符号の一致を検算できれば、一般的な曲率公式を物理的な測定量へ接続できます。

## 4. 平坦でもChristoffel係数は消えない

Minkowski時空の空間 $(x,y)$ 平面を極座標へ移します。変換 $x=r\cos\phi,y=r\sin\phi$ は $r>0$ の局所座標として使え、$r=0$ では角度が一意でないため含めません。時間は $t$（秒）を使い

$$
ds^2=-c^2dt^2+dr^2+r^2d\phi^2+dz^2
$$

を得ます。計量の逆成分は $g^{tt}=-1/c^2$、$g^{rr}=1$、$g^{\phi\phi}=r^{-2}$、$g^{zz}=1$。非零になり得る接続係数を[LORG4の公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)で計算すると

$$
\Gamma^r_{\phi\phi}
=-\frac12\partial_r(r^2)=-r,\qquad
\Gamma^\phi_{r\phi}=\Gamma^\phi_{\phi r}
=\frac12r^{-2}\partial_r(r^2)=\frac1r.
$$

例えば曲率成分 $R^r{}_{\phi r\phi}$ を[四項公式](#prop-gr6-coordinate-curvature)に代入すると

$$
\begin{aligned}
R^r{}_{\phi r\phi}
&=\partial_r\Gamma^r_{\phi\phi}
-\partial_\phi\Gamma^r_{r\phi}
+\Gamma^r_{r\lambda}\Gamma^\lambda_{\phi\phi}
-\Gamma^r_{\phi\lambda}\Gamma^\lambda_{r\phi}\\
&=-1-(-r)(1/r)=0.
\end{aligned}
$$

他の成分まで零である理由はもっと根本的です。この計量はCartesian Minkowski計量を可逆な局所座標変換で表示しただけで、Cartesian座標で $R=0$ でした。曲率は[GEO16のテンソル性](../../../幾何系/GEO/GEO16/index.md#prop-geo16-tensoriality-coordinate)によって座標変更後も零です。従ってRicci曲率もスカラー曲率も零です。**接続係数が非零であることは曲率が非零であることの判定条件ではありません。**

## 5. 静的lapse計量で全縮約を計算する

次に[GR5の静的lapse模型](../GR5/index.md#prop-gr5-lapse-curvature)を三つの空間座標へ拡張します。$N(x,y,z)>0$ を滑らかな無次元関数として

$$
ds^2=-c^2N(x,y,z)^2dt^2+dx^2+dy^2+dz^2
$$

と置きます。$t$ は秒であり $x^0=ct$ ではありません。$N_i=\partial_iN$、$N_{ij}=\partial_i\partial_jN$、$\Delta N=N_{xx}+N_{yy}+N_{zz}$ とします。

<a id="prop-gr6-static-lapse-ricci"></a>

<!-- formal-statement-start -->
> **命題（静的lapse計量のRiemann・Ricci・スカラー曲率）**  
> 上の滑らかな正関数 $N$ に対し、非零になり得るChristoffel係数は

$$
\Gamma^t_{ti}=\Gamma^t_{it}=\frac{N_i}{N},
\qquad
\Gamma^i_{tt}=c^2NN_i
$$

> である。曲率およびその縮約は

$$
\boxed{
R^i{}_{tjt}=c^2NN_{ij},\qquad
\operatorname{Ric}_{tt}=c^2N\Delta N}
$$

$$
\boxed{
\operatorname{Ric}_{ij}=-\frac{N_{ij}}N,\quad
\operatorname{Ric}_{ti}=0,\quad
\mathcal R=-\frac{2\Delta N}{N}}
$$

> を満たす。空間添字 $i,j$ は $x,y,z$ を走る。
<!-- formal-statement-end -->

### 証明の見取り図

計量が空間成分では定数なので、接続は時間添字を含むものだけです。$N_iN_j$ を含む微分項と接続積を打ち消した後に、Hessian $N_{ij}$ が残ります。

<!-- proof-start -->
### 証明

計量行列と逆行列は

$$
(g_{\mu\nu})=\operatorname{diag}(-c^2N^2,1,1,1),
\quad
(g^{\mu\nu})=\operatorname{diag}(-1/(c^2N^2),1,1,1)
$$

です。$N>0$ だから行列は非退化です。計量の非零微分は $\partial_i g_{tt}=-2c^2NN_i$ だけです。[LORG4の接続係数公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)へ代入すると、例えば

$$
\Gamma^t_{it}
=\frac12g^{tt}\partial_i g_{tt}
=\frac{N_i}N,\qquad
\Gamma^i_{tt}
=-\frac12g^{ii}\partial_i g_{tt}=c^2NN_i.
$$

他は微分の零性と対角性から零です。[曲率成分公式](#prop-gr6-coordinate-curvature)で $\rho=i,\sigma=t,\mu=j,\nu=t$ とすれば

$$
\begin{aligned}
R^i{}_{tjt}
&=\partial_j(c^2NN_i)
-\Gamma^i_{t t}\Gamma^t_{j t}\\
&=c^2(N_jN_i+NN_{ij})-c^2N_iN_j\\
&=c^2NN_{ij}.
\end{aligned}
$$

もう一つ必要な成分は、$\rho=t,\sigma=i,\mu=t,\nu=j$ の場合です。

$$
\begin{aligned}
R^t{}_{itj}
&=-\partial_j(N_i/N)
-\Gamma^t_{jt}\Gamma^t_{ti}\\
&=-\left(\frac{N_{ij}}N-\frac{N_iN_j}{N^2}\right)
-\frac{N_iN_j}{N^2}\\
&=-\frac{N_{ij}}N.
\end{aligned}
$$

縮約の添字を取り違えないよう、[Ricci曲率の定義](#def-gr6-ricci-scalar)から

$$
\begin{aligned}
\operatorname{Ric}_{tt}
&=R^\rho{}_{t\rho t}
=\sum_{i=x,y,z}R^i{}_{tit}
=c^2N\sum_i N_{ii}
=c^2N\Delta N,\\
\operatorname{Ric}_{ij}
&=R^\rho{}_{i\rho j}
=R^t{}_{itj}
=-N_{ij}/N.
\end{aligned}
$$

また $R^\rho{}_{t\rho i}$ は時間非依存の計量と上の係数からすべて零なので $\operatorname{Ric}_{ti}=0$。最後に逆計量で縮約すると

$$
\begin{aligned}
\mathcal R
&=g^{tt}\operatorname{Ric}_{tt}+\sum_i\operatorname{Ric}_{ii}\\
&=-\frac{1}{c^2N^2}(c^2N\Delta N)
-\frac1N\sum_iN_{ii}\\
&=-\frac{2\Delta N}{N}.
\end{aligned}
$$

$\square$
<!-- proof-end -->

この命題で **$N'$ が加速度、$N_{ij}$ が曲率** に現れることが明確になりました。場合分けで意味を確かめます。

### 5.1 平坦なRindlerと曲がった模型

$N=1+bx>0$（$b$ は長さの逆数）なら、空間二階微分はすべて零です。[GR5のRindler曲率零](../GR5/index.md#prop-gr5-rindler-flat)の通り全曲率は零です。接続係数は一般には非零でも、Ricciもスカラーも零になります。

一方 $N=1+\alpha x^2/2>0$（$\alpha>0$ は長さの逆二乗）なら、$N_{xx}=\alpha$、$\Delta N=\alpha$。原点では

$$
\operatorname{Ric}_{tt}=c^2\alpha,\quad
\operatorname{Ric}_{xx}=-\alpha,\quad
\mathcal R=-2\alpha.
$$

さらに $R^x{}_{txt}=c^2\alpha$ です。従ってこれは単なる座標加速ではなく曲率のある模型です。時空全体を記述するために、接続・Riemann・Ricci・スカラーという順に計算すべき理由がここにあります。

### 5.2 スカラー曲率が零でも平坦ではない

曲率の全成分の情報は一回の縮約で減り、二回の縮約でさらに減ります。このため、スカラーが零であることだけで全曲率が零とは言えません。

<a id="prop-gr6-zero-scalar-counterexample"></a>

<!-- formal-statement-start -->
> **命題（スカラー曲率零だがRiemann曲率非零の局所模型）**  
> 原点の十分小さい開近傍で $N=1+\frac{\alpha}{2}(x^2-y^2)>0$（$\alpha\ne0$）とする。静的lapse計量 $g=-c^2N^2dt^2+dx^2+dy^2+dz^2$ は $\mathcal R=0$ を満たすが、Ricci曲率もRiemann曲率も零ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$N_{xx}$ と $N_{yy}$ が反対符号なので跡が消えます。しかし各成分は個別には消えません。

<!-- proof-start -->
### 証明

原点では $N=1$ なので連続性により近傍を小さく取れば $N>0$ が保証されます。全ての点で

$$
N_{xx}=\alpha,\qquad N_{yy}=-\alpha,\qquad N_{zz}=0,
\qquad \Delta N=\alpha-\alpha+0=0
$$

です。[静的lapse縮約公式](#prop-gr6-static-lapse-ricci)より $\mathcal R=-2\Delta N/N=0$、しかし

$$
\operatorname{Ric}_{xx}=-\frac{\alpha}{N}\ne0,\qquad
\operatorname{Ric}_{yy}=\frac{\alpha}{N}\ne0
$$

です。しかも $R^x{}_{txt}=c^2N\alpha\ne0$ なのでRiemann曲率そのものも零ではありません。$\square$
<!-- proof-end -->

この反例で壊れた推論は「総和が零なら各項が零」という部分です。Lorentz計量では時間方向の負符号もあり、そもそもスカラー曲率は非負量の総和ではありません。**$\mathcal R=0$、$\operatorname{Ric}=0$、$R=0$ は同じ条件ではありません。** $R=0$ なら他の二つも零ですが、逆向きの同値性を仮定する根拠はありません。

## 6. 演習：添字、符号、縮約の順番を自分で検算する

各問の曲率符号は本章冒頭の規約、Lorentz計量は $(-,+,+,+)$ です。$t$ を時間座標として書いた場合は秒であり、$x^0=ct$ と明記した場合のみ長さの次元を持ちます。

### Level A

<a id="ex-gr6-a01"></a>
#### GR6-A01 曲率成分の引数を読む
- Level: A

$R(\partial_1,\partial_2)\partial_0=3\partial_0-2\partial_3$ のとき $R^0{}_{0 1 2}$、$R^3{}_{0 1 2}$、$R^0{}_{0 2 1}$ を答えよ。

<!-- solution-start -->
**詳細解答。** [成分規約](#prop-gr6-coordinate-curvature)では右の添字 $1,2$ が作用方向、$0$ が作用を受けるベクトル、左上が出力です。従って

$$
R^0{}_{0 1 2}=3,\qquad R^3{}_{0 1 2}=-2.
$$

曲率の最初の二引数を交換すると符号が反転するから

$$
R^0{}_{0 2 1}=-3.
$$

$\partial_0$ が第三引数であることと、出力の上添字を混同しません。
<!-- solution-end -->

<a id="ex-gr6-a02"></a>
#### GR6-A02 直交枠の負符号
- Level: A

Lorentz直交枠で $\operatorname{Ric}(e_a,e_b)=\operatorname{diag}(2,3,4,5)_{ab}$ とする。スカラー曲率を求めよ。

<!-- solution-start -->
**詳細解答。** 逆計量は $\operatorname{diag}(-1,1,1,1)$ です。[直交枠の縮約公式](#prop-gr6-orthonormal-contraction)に入れると

$$
\mathcal R=(-1)\cdot2+1\cdot3+1\cdot4+1\cdot5=10.
$$

通常の行列の対角和 $14$ と区別しなければなりません。
<!-- solution-end -->

<a id="ex-gr6-a03"></a>
#### GR6-A03 定曲率係数の確認
- Level: A

4次元で $R(X,Y)Z=K(g(Y,Z)X-g(X,Z)Y)$ とする。$K=2/L^2$、$L>0$ のとき $\operatorname{Ric}$ と $\mathcal R$ を求めよ。

<!-- solution-start -->
**詳細解答。** [定曲率縮約命題](#prop-gr6-constant-curvature)の $n=4$ に $K=2/L^2$ を代入します。

$$
\operatorname{Ric}=3Kg=\frac6{L^2}g,
\qquad
\mathcal R=12K=\frac{24}{L^2}.
$$

どちらも曲率の単位は長さの逆二乗です。Ricciは二階テンソルなので $g$ の係数として示します。
<!-- solution-end -->

<a id="ex-gr6-a04"></a>
#### GR6-A04 曲線座標での相殺
- Level: A

$ds^2=-c^2dt^2+dr^2+r^2d\phi^2+dz^2$（$r>0$）について、$\Gamma^r_{\phi\phi}=-r$ と $\Gamma^\phi_{r\phi}=1/r$ だけを使い $R^r{}_{\phi r\phi}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [曲率座標公式](#prop-gr6-coordinate-curvature)の $\rho=r,\sigma=\phi,\mu=r,\nu=\phi$ に代入します。$\Gamma^r_{r\lambda}=0$、$\Gamma^r_{r\phi}=0$、$\partial_\phi\Gamma^r_{r\phi}=0$ を用いると

$$
R^r{}_{\phi r\phi}
=\partial_r(-r)-(-r)(1/r)
=-1+1=0.
$$

第一項の $-1$ だけで曲率が非零とは判定できず、接続係数の積との相殺が必要です。
<!-- solution-end -->

<a id="ex-gr6-a05"></a>
#### GR6-A05 潮汐行列の跡
- Level: A

4次元の自由落下者の平行直交枠で潮汐行列が $\operatorname{diag}(a,-2a,3a)$（$a$ の次元は長さの逆二乗）なら $\operatorname{Ric}(u,u)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [GR5の潮汐行列](../GR5/index.md#def-gr5-tidal-matrix)を使うには $u=ce_0$ と規格化され、枠が平行でなければなりません。設問では条件が満たされています。[Ricciと潮汐の跡](#prop-gr6-orthonormal-contraction)から

$$
\operatorname{Ric}(u,u)=c^2(a-2a+3a)=2c^2a.
$$

$c^2a$ の単位は $\mathrm{s}^{-2}$ です。
<!-- solution-end -->

### Level B

<a id="ex-gr6-b01"></a>
#### GR6-B01 逆計量による縮約を再構成
- Level: B

$n$ 次元の非退化計量で $R^\rho{}_{\sigma\mu\nu}=K(\delta^\rho_\mu g_{\nu\sigma}-\delta^\rho_\nu g_{\mu\sigma})$ とする。Ricci縮約とスカラー縮約の順序を示し、それぞれ求めよ。

<!-- solution-start -->
**詳細解答。** [Ricciの定義](#def-gr6-ricci-scalar)で出力の $\rho$ と第一方向の $\mu$ を同じにして和を取ります。

$$
\begin{aligned}
\operatorname{Ric}_{\sigma\nu}
&=R^\rho{}_{\sigma\rho\nu}\\
&=K(\delta^\rho_\rho g_{\nu\sigma}
-\delta^\rho_\nu g_{\rho\sigma})\\
&=K(ng_{\nu\sigma}-g_{\nu\sigma})
=(n-1)Kg_{\sigma\nu}.
\end{aligned}
$$

次に、自由な二添字に逆計量を掛けます。

$$
\mathcal R
=g^{\sigma\nu}\operatorname{Ric}_{\sigma\nu}
=(n-1)K\,g^{\sigma\nu}g_{\sigma\nu}
=n(n-1)K.
$$

縮約に逆計量が必要なのは二つの下添字をそのまま足せないからです。最後の $n$ は $g^{-1}g=I$ によります。
<!-- solution-end -->

<a id="ex-gr6-b02"></a>
#### GR6-B02 二方向に曲がるlapse
- Level: B

$N=1+\frac12(ax^2+by^2)$、$N>0$ の近傍で $g=-c^2N^2dt^2+dx^2+dy^2+dz^2$ とする。原点でRicciの非零成分と $\mathcal R$ を求め、$a+b=0$ の意味を説明せよ。

<!-- solution-start -->
**詳細解答。** $N(0)=1$、$N_{xx}=a$、$N_{yy}=b$、$N_{zz}=0$、$\Delta N=a+b$ です。[静的lapse公式](#prop-gr6-static-lapse-ricci)を成分ごとに適用すると

$$
\operatorname{Ric}_{tt}=c^2(a+b),\quad
\operatorname{Ric}_{xx}=-a,\quad
\operatorname{Ric}_{yy}=-b,\quad
\operatorname{Ric}_{zz}=0.
$$

逆計量の時間成分は原点で $-1/c^2$ なので

$$
\mathcal R=-\frac1{c^2}c^2(a+b)-a-b=-2(a+b).
$$

$a+b=0$ なら $\mathcal R=0$、$\operatorname{Ric}_{tt}=0$ ですが、例えば $a\ne0$ なら $\operatorname{Ric}_{xx}=-a\ne0$ です。スカラーの零性だけで全曲率は判断できません。
<!-- solution-end -->

<a id="ex-gr6-b03"></a>
#### GR6-B03 Ricciの対称性を検算
- Level: B

$e_a$ をLorentz直交枠とする。$\operatorname{Rm}(X,Y,Z,W)=g(R(X,Y)Z,W)$ が対交換対称性、前二変数・後二変数の反対称性を持つとき、$\operatorname{Ric}(Y,Z)=\operatorname{Ric}(Z,Y)$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [曲率の対称性](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)と[符号付き縮約式](#prop-gr6-orthonormal-contraction)を用います。まず対交換で

$$
\operatorname{Rm}(e_a,Z,Y,e_a)
=\operatorname{Rm}(Y,e_a,e_a,Z).
$$

前二変数交換で右辺は $-\operatorname{Rm}(e_a,Y,e_a,Z)$、後二変数交換で $+\operatorname{Rm}(e_a,Y,Z,e_a)$ です。従って

$$
\begin{aligned}
\operatorname{Ric}(Z,Y)
&=\sum_a\varepsilon_a\operatorname{Rm}(e_a,Z,Y,e_a)\\
&=\sum_a\varepsilon_a\operatorname{Rm}(e_a,Y,Z,e_a)
=\operatorname{Ric}(Y,Z).
\end{aligned}
$$

時間方向の $\varepsilon_0=-1$ は両辺に同じ重みで入り、対称性を壊しません。
<!-- solution-end -->

<a id="ex-gr6-b04"></a>
#### GR6-B04 Rindlerと二次lapseの物理的区別
- Level: B

$I$ は $N_1(x)=1+bx>0$、$II$ は $N_2(x)=1+\alpha x^2/2>0$ とする。両者の $\operatorname{Ric}_{tt}$、$\mathcal R$、$R^x{}_{txt}$ を求め、原点の静止者が測地線となる条件を確認せよ。$b\ne0$、$\alpha\ne0$ とする。

<!-- solution-start -->
**詳細解答。** [静的lapse公式](#prop-gr6-static-lapse-ricci)では $N_1''=0$ なので、$I$ の三量はいずれも零です。しかし静止者の四元速度 $u=N_1^{-1}\partial_t$ に対する加速度は[GR5の計算](../GR5/index.md#prop-gr5-lapse-curvature)から $a^x=c^2N_1'/N_1=c^2b/N_1\ne0$ です。

$II$ は $N_2''=\alpha$ だから

$$
\operatorname{Ric}_{tt}=c^2N_2\alpha,\quad
\mathcal R=-2\alpha/N_2,\quad
R^x{}_{txt}=c^2N_2\alpha.
$$

静止者の加速度は $a^x=c^2\alpha x/N_2$。原点では $N_2=1$、$a^x=0$ なので測地線ですが、$\mathcal R(0)=-2\alpha$ と曲率は残ります。静止座標の加速度の有無と曲率は別の判定です。
<!-- solution-end -->

### Level C

<a id="ex-gr6-c01"></a>
#### GR6-C01 曲率を縮約して失われる情報を判定する
- Level: C

滑らかな正関数 $N(x,y,z)$ に対し $g=-c^2N^2dt^2+dx^2+dy^2+dz^2$ を考える。[静的lapse曲率命題](#prop-gr6-static-lapse-ricci)だけに頼らず、接続係数から $R^i{}_{tjt}$ と $R^t{}_{itj}$ を再計算せよ。次に $\mathcal R=0$ と $\operatorname{Ric}=0$ の条件を $N$ の微分で表せ。最後に $N=1+\frac{\alpha}{2}(x^2-y^2)$ の正の領域（$\alpha\ne0$）がどちらの条件を満たすか判定し、非零の曲率成分を一つ挙げよ。

<!-- solution-start -->
**詳細解答。** 計量の非零微分は $\partial_i g_{tt}=-2c^2NN_i$ のため、[Levi-Civita接続係数](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)は $\Gamma^t_{ti}=N_i/N$、$\Gamma^i_{tt}=c^2NN_i$ です。座標基底のLie括弧は零です。

[曲率四項式](#prop-gr6-coordinate-curvature)をまず $\rho=i,\sigma=t,\mu=j,\nu=t$ に適用します。時間微分項と $\Gamma^i_{j\lambda}\Gamma^\lambda_{tt}$ は零であり、

$$
\begin{aligned}
R^i{}_{tjt}
&=\partial_j(c^2NN_i)
-\Gamma^i_{tt}\Gamma^t_{jt}\\
&=c^2(N_jN_i+NN_{ij})-c^2N_iN_j
=c^2NN_{ij}.
\end{aligned}
$$

次に $\rho=t,\sigma=i,\mu=t,\nu=j$ では

$$
\begin{aligned}
R^t{}_{itj}
&=-\partial_j(N_i/N)-(N_j/N)(N_i/N)\\
&=-N_{ij}/N+N_iN_j/N^2-N_iN_j/N^2\\
&=-N_{ij}/N.
\end{aligned}
$$

縮約は $\operatorname{Ric}_{tt}=c^2N\Delta N$、$\operatorname{Ric}_{ij}=-N_{ij}/N$、$\operatorname{Ric}_{ti}=0$ です。さらに

$$
\mathcal R=-\frac{\Delta N}{N}-\frac{\Delta N}{N}
=-\frac{2\Delta N}{N}.
$$

よって $N>0$ の領域で $\mathcal R=0$ と同値なのは $\Delta N=0$（調和関数という条件）です。一方 $\operatorname{Ric}=0$ と同値なのは全空間二階微分 $N_{ij}=0$ です。後者なら $\Delta N=0$ も従います。連結な座標領域では $N_{ij}=0$ は勾配一定を意味し、$N$ は空間座標の一次関数になります。

指定された $N$ は $N_{xx}=\alpha$、$N_{yy}=-\alpha$、$N_{zz}=0$ なので $\Delta N=0$、従って $\mathcal R=0$。しかし

$$
\operatorname{Ric}_{xx}=-\alpha/N\ne0,\quad
\operatorname{Ric}_{yy}=\alpha/N\ne0,\quad
R^x{}_{txt}=c^2N\alpha\ne0.
$$

定数項1のおかげで原点近傍では $N>0$ が成り立ち計量は正しくLorentz計量です。この例はスカラーが零でもRicci・Riemannが消えないことを、同じ計量の中で示しています。
<!-- solution-end -->

## 7. 次章への接続

本章では $R^\rho{}_{\sigma\mu\nu}$ という全曲率から $\operatorname{Ric}_{\mu\nu}$ と $\mathcal R$ を導き、逆計量による符号を含めて検算しました。縮約で情報が失われるため、物理的な方程式にどの組合せが現れるべきかは、まだ決まっていません。次のGR7では曲率の微分関係であるBianchi恒等式を調べ、Ricciとスカラーを組み合わせたEinsteinテンソルの共変発散がなぜ消えるのかを導きます。
