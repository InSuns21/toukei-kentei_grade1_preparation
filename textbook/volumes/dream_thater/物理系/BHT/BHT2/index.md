# BHT2 Killing地平線と零法則

<!-- definition-example-audit: strict -->

[BHT1のSchwarzschild状態族](../BHT1/index.md#def-bht1-geometric-family)では、同じ解の地平線面積と表面重力を計算しました。[GR45の表面重力](../../GR/GR45/index.md#def-gr45-surface-gravity)は、地平線を生成するKilling場 $\chi$ の非アフィン性を測ります。しかし、ある一点で $\kappa$ を計算できることと、**同じ地平線の別の点でも値が等しいこと**は別問題です。

例えば[GR45のKerr計算](../../GR/GR45/index.md#thm-gr45-kerr)では、途中に現れた極角依存の係数が最後に打ち消し合いました。それは具体解の検算であって、「Killing地平線なら必ず一定」という一般定理の証明ではありません。熱平衡の温度一様性に似た**零法則**をどの仮定で導けるのか、計算可能な局所座標とエネルギー条件を使って確かめます。

以下は滑らかな時間向き付き4次元Lorentz時空、計量符号 $(-,+,+,+)$、$G=c=1$ です。$\nabla$ はLevi-Civita接続、$R_{ab}$ は[GR34で用いたRicci曲率](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)と同じ符号とします。$\mathcal H$ は[GR29で定義したKilling地平線](../../GR/GR29/index.md#def-gr29-killing-horizon)の、$\chi\ne0$ となる滑らかな部分を指します。

## 1. 生成線に沿って変わらないことは、断面上で一定であることとは違う

[GR45の定義](../../GR/GR45/index.md#def-gr45-surface-gravity)および[ノルム勾配恒等式](../../GR/GR45/index.md#prop-gr45-gradient)は、地平線上でそれぞれ

$$
\nabla_\chi\chi=\kappa_\chi\chi,
\qquad d(\chi^2)=-2\kappa_\chi\chi^\flat
$$

を与えます。$\chi^2=g(\chi,\chi)$、$\chi^\flat=g(\chi,\cdot)$ です。一般の $\kappa_\chi$ は、まだ $\mathcal H$ 上の**関数**です。

Killing場の流れであるパラメータ $v$ に沿って移動した場合と、$v$ を固定して空間的な二次元断面内を移動した場合とを分けます。前者には時空の等長変換が働きますが、後者の点を結ぶKilling対称性があるとは限りません。

<a id="prop-bht2-generator-constancy"></a>

<!-- formal-statement-start -->
> **命題（表面重力の生成線方向の一定性）**
> 滑らかなLorentz時空のKilling場 $\chi$ が滑らかなKilling地平線 $\mathcal H$ を生成し、$\chi\ne0$ とする。[表面重力の定義](../../GR/GR45/index.md#def-gr45-surface-gravity)による関数 $\kappa_\chi$ は各生成線に沿って

$$
\boxed{\chi^a\nabla_a\kappa_\chi=0}
$$

> を満たす。Einstein方程式やエネルギー条件は必要ない。この主張だけでは異なる生成線の間で $\kappa_\chi$ が等しいとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

Killing流は計量・接続・生成場自身を変えません。したがって $\nabla_\chi\chi$ の比例係数も流れ方向には変えられません。

<!-- proof-start -->
### 証明

Killing流を $\Phi_s$ とします。[Killing条件](../../GR/GR14/index.md#def-gr14-killing-field)から $\Phi_s^*g=g$ です。Levi-Civita接続は計量から一意に決まるため $\Phi_s^*\nabla=\nabla$、また $\Phi_s$ は $\chi$ 自身の流れなので $(\Phi_s)_*\chi=\chi$ です。よって $\mathcal L_\chi(\nabla_\chi\chi)=0$ となります。

地平線上の定義式 $\nabla_\chi\chi=\kappa_\chi\chi$ の両辺にLie微分を取り、$\mathcal L_\chi\chi=[\chi,\chi]=0$ を使うと

$$
0=\mathcal L_\chi(\kappa_\chi\chi)
=(\chi^a\nabla_a\kappa_\chi)\chi
+\kappa_\chi[\chi,\chi]
=(\chi^a\nabla_a\kappa_\chi)\chi.
$$

$\chi\ne0$ なので係数は零です。$\square$
<!-- proof-end -->

たとえば生成線を $v\mapsto(v,x^1,x^2)$ と表す局所座標なら、命題は $\partial_v\kappa=0$ だけを述べます。$\partial_{x^1}\kappa$、$\partial_{x^2}\kappa$ の値はまだ自由です。この二方向を制御するのが次の問題です。

## 2. 地平線を横切る正則座標で、横方向の変化を見えるようにする

地平線上だけの退化した誘導計量では、$\kappa$ の横方向微分を計算するのは不便です。そこで地平線に沿うKilling流の座標を $v$、地平線に直交して横切る光的測地線のアフィン座標を $r$、空間的断面上の二座標を $x^A$（$A=1,2$）とします。断面から横切る光線を出し、その光線とKilling流で座標を運べば、局所的に $g_{vr}=1$、$g_{rr}=g_{rA}=0$、$\mathcal H=\{r=0\}$ と取れます。これは**Gaussian null座標**です。

この構成では、$r=0$ で $\chi=\partial_v$ が零法線であるため $g_{vv}=g_{vA}=0$ です。計量が滑らかなので、これらの成分はそれぞれ $r$ を因子に持ちます。計量のKilling不変性から係数は $v$ に依存しません。

<a id="def-bht2-gaussian-null-chart"></a>

<!-- formal-statement-start -->
> **定義（Killing地平線に適合するGaussian null座標表示）**
> 滑らかな4次元Lorentz計量と、その非零Killing場 $\chi$ が生成する滑らかなKilling地平線 $\mathcal H$ の近傍で、$\mathcal H=\{r=0\}$、$\chi=\partial_v$、$A,B\in\{1,2\}$ となる局所座標 $(v,r,x^1,x^2)$ を考える。計量を

$$
\boxed{ds^2=rF(r,x)\,dv^2+2\,dv\,dr
+2r h_A(r,x)\,dv\,dx^A
+\gamma_{AB}(r,x)\,dx^A dx^B}
$$

> と書き、$F,h_A,\gamma_{AB}$ は滑らかで $v$ に依存せず、$\gamma_{AB}(0,x)$ は正定値とする。この表示を本章のKilling地平線に適合するGaussian null座標表示という。添字 $A,B$ は二次元断面の座標添字で、反復する $A,B$ について和を取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht2-gaussian-null-chart -->
**定義の確認**：直接例。座標基底 $(\partial_v,\partial_r)$ に関する計量行列の成分は $g_{ij}=g(\partial_i,\partial_j)$ です。計量の $dv^2$ の係数が $g_{vv}$、$2\,dv\,dr$ の係数が $2g_{vr}$ に対応します。

以下の例では $h_A=0$ を選ぶので断面との交差ブロックが消え、逆計量の $(v,r)$ 部分も二行二列のブロックの逆行列として求められます。ここで $i,j,k\in\{v,r\}$、$\delta^i{}_j$ はKroneckerのデルタです。逆行列 $g^{ij}$ と法線 $dr$ の長さの関係は

$$
g^{ik}g_{kj}=\delta^i{}_j,\qquad g^{-1}(dr,dr)=g^{rr}
$$

です。[GR29のKilling地平線の定義](../../GR/GR29/index.md#def-gr29-killing-horizon)によれば、後者が地平線上で零であることを確かめます。

$L>0$ とし、$F=-1/L$、$h_A=0$、$\gamma_{AB}=\delta_{AB}$ を選びます。ここで $\delta_{AB}$ は断面座標 $(x^1,x^2)$ の単位行列の成分です。このとき

$$
ds^2=-\frac rL\,dv^2+2\,dv\,dr+(dx^1)^2+(dx^2)^2.
$$

$(v,r)$ 部分の行列と逆行列は

$$
(g_{ij})=\begin{pmatrix}-r/L&1\\1&0\end{pmatrix},
\qquad
(g^{ij})=\begin{pmatrix}0&1\\1&r/L\end{pmatrix}.
$$

$(v,r)$ ブロックの行列式は $-1$ なので、対称な実行列の二つの固有値は異符号で、ブロックは非退化です。また断面方向では非零ベクトル $u=(u^1,u^2)$ に対し

$$
\gamma_{AB}u^Au^B=(u^1)^2+(u^2)^2>0\quad(u\ne0)
$$

です。交差ブロックは零だから、全計量は一つの負方向と三つの正方向を持つ符号 $(-,+,+,+)$ の非退化計量です。

地平線 $r=0$ では、法線の長さ・生成場の計量双対・生成場自身を順に調べると

$$
g^{-1}(dr,dr)=g^{rr}=0,\qquad
\chi^\flat=-\frac rLdv+dr\longrightarrow dr,\qquad
\chi=\partial_v\ne0
$$

となります。さらに係数は $v$ に依存しないので $\chi$ はKilling場です。[GR29の全条件](../../GR/GR29/index.md#def-gr29-killing-horizon)を確認できました。次の式で $\kappa=1/(2L)$ も求まります。
<!-- definition-example-end -->

上の一般形では $\chi^2=g_{vv}=rF$、$\chi^\flat|_{r=0}=dr$ です。地平線へ制限する**前に**微分すると

$$
d(\chi^2)|_{r=0}=F(0,x)\,dr.
$$

したがって[表面重力とKillingノルムの勾配](../../GR/GR45/index.md#prop-gr45-gradient)から

$$
\boxed{\kappa_\chi(x)=-\frac12F(0,x)}.
$$

この表示は $\kappa$ が $x$ に依存しても幾何学的には矛盾しないことを既に示唆します。横方向微分を零にするには、このあと使うEinstein方程式と物質の条件が必要です。

## 3. 横方向の微分をRicci曲率に結び付ける

Einstein方程式の物質条件を使うために、Gaussian null座標のRicci成分を一つだけ計算します。これが零法則の核心です。

<a id="lem-bht2-transverse-ricci"></a>

<!-- formal-statement-start -->
> **補題（地平線横断方向のRicci恒等式）**
> 滑らかな4次元Lorentz計量が[上記のGaussian null表示](#def-bht2-gaussian-null-chart)を持ち、$r=0$ が $\chi=\partial_v$ のKilling地平線であるとする。$\kappa_\chi=-F(0,x)/2$ に対し、断面方向 $A=1,2$ で

$$
\boxed{R_{vA}\big|_{r=0}=-\partial_A\kappa_\chi}
$$

> が成り立つ。ここで $R_{vA}=R_{ab}(\partial_v)^a(\partial_A)^b$ であり、計量符号・Ricci符号は本章冒頭の規約を使う。
<!-- formal-statement-end -->

### 証明の見取り図

$g_{vv}=rF$ と $g_{vA}=rh_A$ の**一階の $r$ 係数**がRicciの $vA$ 成分に残ります。$h_A$ に比例する項はChristoffel記号の積で打ち消され、$\partial_A F/2$ だけが残ります。

<!-- proof-start -->
### 証明

$\gamma^{AB}$ を $\gamma_{AB}$ の逆行列、$h^A=\gamma^{AB}h_B$ とします。$(v,r,A)$ の順に逆計量を作ると

$$
g^{vr}=1,\quad g^{vv}=g^{vA}=0,\quad
g^{rA}=-r h^A,\quad
g^{rr}=-rF+r^2h_Ah^A,\quad g^{AB}=\gamma^{AB}.
$$

たとえば $g^{r\mu}g_{\mu v}=rF+(-rF+r^2h^2)-r^2h^2=0$、$g^{r\mu}g_{\mu r}=1$ で、逆行列の交差成分を検査できます。Christoffel記号の定義 $\Gamma^a{}_{bc}=g^{ad}(\partial_b g_{dc}+\partial_cg_{db}-\partial_dg_{bc})/2$ に代入すると、$r=0$ では

$$
\begin{aligned}
\Gamma^v{}_{vv}&=-F/2,&\Gamma^r{}_{vr}&=F/2,\\
\Gamma^v{}_{vA}&=-h_A/2,&\Gamma^r{}_{Ar}&=h_A/2,\\
\Gamma^r{}_{vA}&=\frac r2(\partial_A F+Fh_A)+O(r^2),
&\Gamma^B{}_{vA}\big|_{r=0}&=0.
\end{aligned}
$$

ここで $F,h_A$ は右辺では $r=0$ に制限するものとし、$\Gamma^r{}_{vA}$ の式だけは $r$ への一次展開を記しました。残りの成分が $R_{vA}$ に寄与しないことも確認します。係数は $v$ に依存しないため $\Gamma^\mu{}_{\mu v}=\partial_v\log\sqrt{|\det g|}=0$ です。また $\Gamma^r{}_{vA}$、$\Gamma^B{}_{vA}$ は地平線で零なので、$\partial_B\Gamma^B{}_{vA}|_{r=0}=0$ であり、$\Gamma^\mu{}_{\mu\nu}\Gamma^\nu{}_{vA}$ の全項も零です。

Ricciの座標表示

$$
R_{vA}=\partial_\mu\Gamma^\mu{}_{vA}
-\partial_A\Gamma^\mu{}_{v\mu}
+\Gamma^\mu{}_{\mu\nu}\Gamma^\nu{}_{vA}
-\Gamma^\mu{}_{A\nu}\Gamma^\nu{}_{v\mu}
$$

において、最後の積の非零寄与は $\Gamma^v{}_{Av}\Gamma^v{}_{vv}$ と $\Gamma^r{}_{Ar}\Gamma^r{}_{vr}$ で、和は $Fh_A/2$ です。したがって

$$
\begin{aligned}
R_{vA}|_{r=0}
&=\frac12(\partial_A F+Fh_A)
-\left(\frac{Fh_A}{4}+\frac{Fh_A}{4}\right)\\
&=\frac12\partial_A F
=-\partial_A\kappa_\chi.
\end{aligned}
$$

これは局所座標による計算であり、物質条件はまだ用いていません。$\square$
<!-- proof-end -->

横方向の変化はRicciの混合成分に正確に対応します。これを零にできるのは、Einstein方程式と、物質のエネルギー・運動量が地平線上でどう流れるかという条件のおかげです。

## 4. 零法則――優越エネルギー条件が何を保証するか

[GR35の優越エネルギー条件](../../GR/GR35/index.md#def-gr35-dec)は、未来向き時間的観測者に対して $J^a=-T^a{}_b v^b$ が未来因果的（または零）であることを要求します。滑らかな $T_{ab}$ なら時間的 $v$ を未来向き零ベクトルへ近づけることで、同じ性質を零方向にも拡張できます。単なる[零エネルギー条件](../../GR/GR35/index.md#def-gr35-nec)は $T_{ab}k^ak^b\ge0$ だけで、この**流束ベクトル全体の因果性**までは与えません。

<a id="thm-bht2-zeroth-law"></a>

<!-- formal-statement-start -->
> **定理（Einstein重力におけるブラックホール力学の零法則）**
> 滑らかな時間向き付き4次元Lorentz時空 $(\mathcal M,g)$ が、宇宙項 $\Lambda$ を左辺に置いたEinstein方程式

$$
R_{ab}-\frac12Rg_{ab}+\Lambda g_{ab}=8\pi T_{ab}
$$

> を満たすとする。滑らかな連結Killing地平線 $\mathcal H$ の正則部分を未来向き非零Killing場 $\chi$ が生成し、$T_{ab}$ は連続で[優越エネルギー条件](../../GR/GR35/index.md#def-gr35-dec)を満たすとする。このとき、[表面重力](../../GR/GR45/index.md#def-gr45-surface-gravity)は $\mathcal H$ 上の**すべての点で同一**である。

$$
\boxed{\kappa_\chi=\text{constant on each connected }\mathcal H}
$$

> 非極限性 $\kappa_\chi>0$ や分岐面の存在は仮定しない。異なる連結成分どうしの値の一致は結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

Killing対称性で地平線の膨張率・せん断が零になります。[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)から $R_{ab}\chi^a\chi^b=0$、Einstein方程式から $T_{ab}\chi^a\chi^b=0$ を得ます。優越エネルギー条件は、零となった光的エネルギー流の**横方向成分も零**であることを保証します。そこで[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)に戻ります。

<!-- proof-start -->
### 証明

**（1）地平線上の膨張・せん断は零。** $\chi$ の流れが計量を保つので、空間的二次元断面の計量 $q_{AB}$ を生成線に沿って運ぶと $\mathcal L_\chi q_{AB}=0$ です。[GR34でのスクリーン変形の分解](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)では、この対称変形のトレースが膨張率、無跡部分がせん断です。したがって $\theta=0$、$\sigma_{AB}=0$。$\chi$ は零超曲面の法線なので回転も零です。

生成線の接ベクトルを局所的に正の関数倍してアフィン媒介 $k=f\chi$ としても、スクリーンへの射影では $\nabla_a(f\chi_b)=f\nabla_a\chi_b+(\partial_a f)\chi_b$ の第二項が消えます。よって $k$ の膨張・せん断・回転も零です。

**（2）光的Ricci成分は零。** [光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)に $\theta=\sigma=\omega=0$、$d\theta/d\lambda=0$ を代入すると

$$
0=-\frac12\theta^2-\sigma_{AB}\sigma^{AB}
+\omega_{AB}\omega^{AB}-R_{ab}k^ak^b
=-R_{ab}k^ak^b.
$$

$f>0$ より $R_{ab}\chi^a\chi^b=0$ です。Einstein方程式を $\chi^a\chi^b$ と縮約すると、$g_{ab}\chi^a\chi^b=0$ なので跡と宇宙項が消え、

$$
0=R_{ab}\chi^a\chi^b=8\pi T_{ab}\chi^a\chi^b.
$$

**（3）優越エネルギー条件で横方向の流束を消す。** $J^a=-T^a{}_b\chi^b$ と置きます。$J$ は未来因果的または零で、$g(J,\chi)=-T_{ab}\chi^a\chi^b=0$ です。局所正規直交座標で $\chi=(E,E,0,0)$、$E>0$ と置けば、直交条件は $J^0=J^1$、因果性は

$$
-(J^0)^2+(J^1)^2+(J^2)^2+(J^3)^2\le0
$$

です。前者を後者へ代入すると $(J^2)^2+(J^3)^2\le0$。ゆえに $J^2=J^3=0$ で、$J$ は $\chi$ に比例します。すなわち地平線に接する断面ベクトル $e_A$ について

$$
T_{ab}\chi^a e_A^b=-g(J,e_A)=0.
$$

**（4）横断微分を消す。** [Gaussian null座標](#def-bht2-gaussian-null-chart)で $\chi=\partial_v$、$e_A=\partial_A$ とします。地平線上で $g_{vA}=0$ なので、Einstein方程式の $vA$ 成分は

$$
R_{vA}=8\pi T_{vA}=0.
$$

[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)より $\partial_A\kappa_\chi=-R_{vA}=0$。加えて[表面重力の生成線方向の一定性](#prop-bht2-generator-constancy)で $\partial_v\kappa_\chi=0$。よって各局所座標域で $\kappa_\chi$ は一定です。隣り合う座標域では同じスカラー値が一致するため、連結な $\mathcal H$ 全体で同じ定数になります。$\square$
<!-- proof-end -->

この証明で役割の違いがはっきりします。**Killing性だけで生成線方向、Raychaudhuri＋Einstein方程式＋優越エネルギー条件で断面方向**を押さえました。零エネルギー条件だけなら、（2）の式が零でも（3）の因果流束の議論が使えるとは限りません。また、一般の「定常時空」の任意の光的面がKilling地平線になるわけではありません。地平線を生成するKilling場の存在自体も定理の仮定です。

## 5. 仮定を一つ外すと、横方向に変わる地平線を作れる

零法則を単なる定義だと思わないため、Killing地平線の幾何学的な条件だけを満たし、$\kappa$ が横方向で変化する局所模型を作ります。

<a id="prop-bht2-variable-kappa"></a>

<!-- formal-statement-start -->
> **命題（Killing地平線だけでは零法則が成立しない反例）**
> $L>0$、$\kappa_0>0$、$\alpha\ne0$ を定数として $[\kappa_0]=L^{-1}$、$[\alpha]=L^{-2}$ とし、$|x|<\varepsilon$ で $\kappa_0+\alpha x>0$ となる領域の座標 $(v,r,x,y)$ に

$$
ds^2=-2r(\kappa_0+\alpha x)\,dv^2
+2\,dv\,dr+dx^2+dy^2
$$

> を置く。この滑らかなLorentz計量では $\mathcal H=\{r=0\}$ が $\chi=\partial_v$ のKilling地平線でありながら、$\kappa_\chi(x)=\kappa_0+\alpha x$ は一定ではない。したがってKilling性と地平線の正則性だけから零法則は導けない。
<!-- formal-statement-end -->

### 証明の見取り図

計量ブロックの行列式と $r=0$ の法線性を調べ、次に $\chi^2$ を微分します。Einstein方程式と優越エネルギー条件をともに加えるとこの模型が許されないことは、横方向Ricci成分からも確認できます。

<!-- proof-start -->
### 証明

$\kappa(x)=\kappa_0+\alpha x$ と置きます。$(v,r)$ ブロックは

$$
\begin{pmatrix}-2r\kappa(x)&1\\1&0\end{pmatrix},
\quad \det=-1,
\qquad g^{rr}=2r\kappa(x).
$$

従って全計量は非退化なLorentz符号を持ちます。$g$ は $v$ に依存しないので $\chi=\partial_v$ はKilling場です。$r=0$ では $\chi^2=-2r\kappa(x)=0$、$\chi^\flat=-2r\kappa(x)dv+dr\to dr$、$g^{-1}(dr,dr)=0$、かつ $\chi\ne0$ なので[GR29のKilling地平線条件](../../GR/GR29/index.md#def-gr29-killing-horizon)が成立します。

$r$ を微分してから制限すると

$$
d(\chi^2)|_{r=0}=-2\kappa(x)dr,
$$

だから[表面重力とKillingノルムの勾配](../../GR/GR45/index.md#prop-gr45-gradient)によって $\kappa_\chi=\kappa(x)$ です。横方向の微分は $\partial_x\kappa_\chi=\alpha\ne0$ で、一定性に反します。

さらに[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)へ $F=-2\kappa(x)$ と $h_A=0$ を代入すると

$$
R_{vx}\big|_{r=0}=\frac12\partial_x[-2(\kappa_0+\alpha x)]=-\alpha\ne0
$$

です。零法則の証明の（4）に必要な $R_{vA}=0$ が破れています。よって、この模型をEinstein方程式の解と読むなら、優越エネルギー条件まで同時に満たすことはありません。$\square$
<!-- proof-end -->

この模型は漸近平坦なブラックホール全体を構成したものではなく、地平線近傍の**局所反例**です。反例の役割は「Killing地平線の定義から一定性が自動的に出る」という論理を否定することです。

## 6. Killing時間とアフィンパラメータの関係

各生成線で $\kappa$ が一定と分かれば、Killing時間 $v$ と光的測地線のアフィンパラメータ $\lambda$ の関係も計算できます。これは定常な幾何であってもKilling時間が光線のアフィン時間とは限らない理由です。

以下の $d/dv$ は生成曲線 $x(v)$ に沿う**全微分**です。曲線上のスカラー関数 $u(x(v))$ について、パラメータ変更の連鎖律から

$$
\frac{d}{dv}u(x(v))=\frac{dx^\mu}{dv}\partial_\mu u
=\chi^\mu\partial_\mu u,\qquad
\frac{d}{d\lambda}=\frac{dv}{d\lambda}\frac{d}{dv}
$$

となります。Gaussian null座標で生成線の $r,x^A$ を固定していれば、前者は $\partial_v u$ と一致します。一方、$\lambda$ は別のパラメータで、その微分演算子は右端の式に従います。

<a id="prop-bht2-affine-parameter"></a>

<!-- formal-statement-start -->
> **命題（Killingパラメータとアフィンパラメータ）**
> 滑らかなKilling地平線の非零生成場 $\chi=dx/dv$ が $\nabla_\chi\chi=\kappa\chi$ を満たし、同じ生成線に沿って $\kappa$ が定数であるとする。未来向きアフィンパラメータ $\lambda$ を $dx/d\lambda=(dv/d\lambda)\chi$、$dv/d\lambda>0$ と選ぶと、ある正定数 $C$ と定数 $D$ が存在し、

$$
\boxed{\begin{cases}
\lambda(v)=D+(C/\kappa)e^{\kappa v},&\kappa\ne0,\\
\lambda(v)=D+Cv,&\kappa=0.
\end{cases}}
$$

> ここで $C>0$ は生成線ごとの任意のアフィン規格化定数であり、$\kappa<0$ の場合も $d\lambda/dv=Ce^{\kappa v}>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

アフィン接ベクトルを $k=p\chi$ と置き、$\nabla_k k=0$ から一次微分方程式を解きます。

<!-- proof-start -->
### 証明

$p=dv/d\lambda>0$ とすると、Leibniz則より

$$
\nabla_{p\chi}(p\chi)
=p\chi(p)\chi+p^2\nabla_\chi\chi
=\bigl(p\,dp/dv+p^2\kappa\bigr)\chi.
$$

アフィン条件と $\chi\ne0$ より $dp/dv+\kappa p=0$。積分因子 $e^{\kappa v}$ を掛けると $d(e^{\kappa v}p)/dv=0$、したがって $p=C^{-1}e^{-\kappa v}$ と書けます。逆数を取り $d\lambda/dv=Ce^{\kappa v}$、これを積分すれば $\kappa\ne0$ と $\kappa=0$ の両場合で主張した式になります。$\square$
<!-- proof-end -->

Schwarzschildの未来地平線では、[静的球対称地平線の表面重力](../../GR/GR45/index.md#thm-gr45-static)を $f(r)=1-2M/r$ に適用して $\kappa=1/(4M)$ となり、アフィンパラメータはKilling時間の指数関数です。一方、極限Reissner–Nordströmでは同じ公式に $f(r)=(1-M/r)^2$ を適用すると $f'(M)=0$ なので $\kappa=0$ となり、両者は一次関係になります。ただしこの差から「極限解には必ず分岐面がある」と結論してはいけません。

## 7. 規格化・代表解・熱力学との関係

零法則は「**固定した生成Killing場**に関して一定」という命題です。[Killing場の規格化と表面重力](../../GR/GR45/index.md#prop-gr45-scaling)で $\widehat\chi=a\chi$（定数 $a>0$）とすると $\widehat\kappa=a\kappa$ です。各解の基準を決めずに数字だけ比較するのは無意味ですが、$\kappa$ が地平線上で一定という性質は、この一様な倍率で不変です。位置依存の $a(x)$ は一般にはKilling場を保ちません。

| 代表解・条件 | 選ぶ生成場 | 表面重力 | 一定性の根拠 |
| --- | --- | --- | --- |
| Schwarzschild、$M>0$ | 無限遠で規格化した $\partial_v$ | $1/(4M)$ | [GR45の静的計算](../../GR/GR45/index.md#thm-gr45-static)と零法則 |
| Reissner–Nordström、$M\ge\lvert Q\rvert$、$M>0$ | 外側未来地平線の $\partial_v$ | $(r_+-r_-)/(2r_+^2)$ | [GR45の静的公式](../../GR/GR45/index.md#thm-gr45-static)、物質条件を確認すれば零法則 |
| Kerr、$M\ge\lvert a\rvert$、$M>0$ | $\partial_v+\Omega_H\partial_\psi$ | $(r_+-r_-)/(2(r_+^2+a^2))$ | [GR45の直接計算](../../GR/GR45/index.md#thm-gr45-kerr)、真空で零法則 |

ここで $r_\pm=M\pm\sqrt{M^2-Q^2}$（帯電解）または $r_\pm=M\pm\sqrt{M^2-a^2}$（回転解）です。両者は文字の形が同じでも、$Q$ は電荷、$a$ は回転パラメータです。Kerrの $\Omega_H=a/(r_+^2+a^2)$ は[GR32の生成場](../../GR/GR32/index.md#prop-gr32-horizon)と一致します。

古典的零法則は $\kappa$ の幾何学的な一定性です。[TH1の平衡状態](../../TH/TH1/index.md#def-th1-equilibrium-state)や温度の一様性と**形式的に似ている**からといって、これだけで $T=\kappa/(2\pi)$ が物理的温度だとは証明されません。[BHT1で確認した境界](../BHT1/index.md#prop-bht1-variation-identity)を保ち、Hawking放射と状態選択を調べるBHT8へつなぎます。次のBHT3では地平線が非定常に変化するときの面積非減少が、さらにどの大域的・エネルギー条件を必要とするかを調べます。

## 8. 演習

<a id="ex-bht2-a01"></a>

#### BHT2-A01 Gaussian null表示の直接確認

- Level: A

$L>0$ として $ds^2=-(r/L)dv^2+2dvdr+dx^2+dy^2$、$\chi=\partial_v$ とする。$r=0$ がKilling地平線であることを、逆計量、法線、非零生成場で確認し、表面重力を求めよ。

<!-- solution-start -->
**詳細解答。** $(v,r)$ 座標で計量成分を並べると、ブロック行列とその逆行列は

$$
(g_{ij})=\begin{pmatrix}-r/L&1\\1&0\end{pmatrix},
\qquad
(g^{ij})=\begin{pmatrix}0&1\\1&r/L\end{pmatrix}.
$$

行列式は $-1$ なので、地平線上でも非退化です。$g^{rr}|_{r=0}=0$ より $dr$ は零法線です。一方、生成場の計量双対は

$$
\chi^\flat=-(r/L)dv+dr
\ \xrightarrow{r\to0}\ dr.
$$

$\chi=\partial_v\ne0$ であり、計量成分が $v$ に依存しないためKilling条件も成立します。これで[GR29のKilling地平線](../../GR/GR29/index.md#def-gr29-killing-horizon)の全条件を確認しました。

最後に $\chi^2=-r/L$ を地平線へ制限する前に微分し、[表面重力とKillingノルムの勾配](../../GR/GR45/index.md#prop-gr45-gradient)を適用します。

$$
d(\chi^2)|_{r=0}=-\frac1L dr
=-2\kappa dr,\qquad
\therefore\ \kappa=\frac1{2L}.
$$
<!-- solution-end -->

<a id="ex-bht2-a02"></a>

#### BHT2-A02 生成線方向の微分

- Level: A

Killing地平線の座標で $\chi=\partial_v$ とする。$\mathcal L_\chi(\nabla_\chi\chi)=0$ および $\nabla_\chi\chi=\kappa\chi$ から $\partial_v\kappa=0$ を示せ。$\partial_x\kappa=0$ も従うか。

<!-- solution-start -->
**詳細解答。** Lie微分の積の規則と $[\chi,\chi]=0$ により

$$
0=\mathcal L_\chi(\kappa\chi)
=(\mathcal L_\chi\kappa)\chi+\kappa[\chi,\chi]
=(\partial_v\kappa)\chi.
$$

$\chi\ne0$ なので $\partial_v\kappa=0$。ここで微分したのは $v$ 方向だけですから $x$ 方向には何も結論できず、$\partial_x\kappa$ は零とは限りません。
<!-- solution-end -->

<a id="ex-bht2-a03"></a>

#### BHT2-A03 Schwarzschildと帯電解の値

- Level: A

$M=5L>0$、$Q=3L$ のReissner–Nordström解で $r_\pm=M\pm\sqrt{M^2-Q^2}$、$\kappa=(r_+-r_-)/(2r_+^2)$ とする。$r_\pm,\kappa$ を計算し、同質量Schwarzschildの値と比較せよ。

<!-- solution-start -->
**詳細解答。** $\sqrt{M^2-Q^2}=\sqrt{25-9}L=4L$ なので $r_+=9L$、$r_-=L$ です。RNの計量関数に[静的球対称地平線の表面重力](../../GR/GR45/index.md#thm-gr45-static)を適用し、根を代入します。

$$
\kappa_{\mathrm{RN}}=\frac{9L-L}{2(9L)^2}=\frac4{81L}.
$$

同質量Schwarzschildでは[GR45の静的計算](../../GR/GR45/index.md#thm-gr45-static)により $\kappa_S=1/(4M)=1/(20L)$。$4/81<1/20$ は $80<81$ で確かめられ、帯電解の値が少し小さいです。いずれも無限遠時間を同じように規格化して比較しています。
<!-- solution-end -->

<a id="ex-bht2-a04"></a>

#### BHT2-A04 生成場を三倍する

- Level: A

連結Killing地平線で $\kappa_\chi=2/L$ とする。同じ計量で $\widehat\chi=3\chi$ としたとき $\kappa_{\widehat\chi}$ と零法則の成立可否を求めよ。また $\widehat\chi=f(x)\chi$ としてよいか説明せよ。

<!-- solution-start -->
**詳細解答。** [Killing場の規格化と表面重力](../../GR/GR45/index.md#prop-gr45-scaling)を定数 $A=3$ で使うと $\kappa_{\widehat\chi}=3(2/L)=6/L$ です。この値は地平線上で一定なので零法則は保たれます。一方 $f(x)$ が非定数なら $\mathcal L_{f\chi}g$ には $df\otimes\chi^\flat+\chi^\flat\otimes df$ の項が現れ、一般に零になりません。ゆえに新しい場がKilling場だと確認せず零法則を適用できません。
<!-- solution-end -->

<a id="ex-bht2-a05"></a>

#### BHT2-A05 零法則の仮定を分類する

- Level: A

次の結論に必要な仮定を説明せよ。（1）$\chi(\kappa)=0$、（2）$T(\chi,\chi)=0$、（3）$T(\chi,e_A)=0$、（4）連結地平線全体で $\kappa$ が一定。

<!-- solution-start -->
**詳細解答。**

1. [表面重力の生成線方向の一定性](#prop-bht2-generator-constancy)により、正則なKilling地平線だけでよいです。
2. Killing対称性から膨張・せん断が零となり、[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)で $R(\chi,\chi)=0$ です。Einstein方程式で零方向を縮約すれば $R(\chi,\chi)=8\pi T(\chi,\chi)$ だから、結論できます。
3. （2）に[優越エネルギー条件](../../GR/GR35/index.md#def-gr35-dec)を加えます。$J=-T(\cdot,\chi)^\sharp$ が因果的かつ $\chi$ に直交するので $\chi$ に平行となり、断面成分が消えます。
4. （3）と[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)で断面方向の微分を消し、（1）で生成線方向を消します。最後に連結性から全体で一定と結論します。
<!-- solution-end -->

<a id="ex-bht2-b01"></a>

#### BHT2-B01 優越エネルギー条件で横流束が消える理由

- Level: B

符号 $(-,+,+,+)$ の局所正規直交枠で、未来向き零ベクトル $\chi=(E,E,0,0)$（$E>0$）と未来因果的または零の $J$ を取る。$g(J,\chi)=0$ なら $J$ が $\chi$ に比例することを成分で示し、これを零法則の証明の $J=-T(\cdot,\chi)^\sharp$ に適用せよ。

<!-- solution-start -->
**詳細解答。** $0=g(J,\chi)=E(-J^0+J^1)$ なので $J^1=J^0$ です。因果条件を代入すると

$$
0\ge g(J,J)=-(J^0)^2+(J^1)^2+(J^2)^2+(J^3)^2
=(J^2)^2+(J^3)^2\ge0.
$$

従って $J^2=J^3=0$ で $J=(J^0/E)\chi$。$J=-T(\cdot,\chi)^\sharp$、$g(J,\chi)=-T(\chi,\chi)=0$ を用いれば、$\chi$ と直交する断面ベクトル $e_A$ について $T(\chi,e_A)=-g(J,e_A)=0$ です。$J$ が因果的という仮定がなければ、$J^2,J^3$ が非零の空間的ベクトルも $\chi$ に直交でき、この結論は出ません。
<!-- solution-end -->

<a id="ex-bht2-b02"></a>

#### BHT2-B02 Ricci横断成分の係数検算

- Level: B

[Gaussian null表示](#def-bht2-gaussian-null-chart)で $F(0,x)=-2\kappa_0$、$h_1(0,x)=b$（定数）、$h_2=0$ とする。$\partial_1F=0$ のとき、$R_{v1}|_{r=0}=0$ を補題のChristoffel項から確かめよ。$\kappa_0,b$ は有限実数とする。

<!-- solution-start -->
**詳細解答。** [地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)の計算で $\partial_r\Gamma^r{}_{v1}|_{0}=\{\partial_1 F+Fh_1\}/2=Fb/2$ です。一方、積の二項は

$$
\Gamma^v{}_{1v}\Gamma^v{}_{vv}=\frac{(-b)(-F)}4=\frac{Fb}4,
\quad \Gamma^r{}_{1r}\Gamma^r{}_{vr}=\frac{bF}4.
$$

よって $R_{v1}=Fb/2-Fb/4-Fb/4=0$ です。$h_1$ の存在そのものは横方向の $\kappa$ の変化を意味しません。$F=-2\kappa_0$ の値に依存せず打ち消しが成立します。
<!-- solution-end -->

<a id="ex-bht2-b03"></a>

#### BHT2-B03 非一定表面重力の局所反例

- Level: B

$\kappa(x)=1/(2L)+x/(4L^2)$、$|x|<L$ を用いた計量 $ds^2=-2r\kappa(x)dv^2+2dvdr+dx^2+dy^2$ を考える。Killing地平線条件、$\kappa$ の値域、$R_{vx}|_{r=0}$ を求め、零法則のどの仮定を追加すれば排除できるか述べよ。

<!-- solution-start -->
**詳細解答。** 範囲 $|x|<L$ では

$$
\frac1{4L}<\kappa(x)<\frac3{4L},
$$

なので表面重力の候補は正ですが一定ではありません。計量の $(v,r)$ ブロックの行列式は $-1$、逆計量の成分は $g^{rr}=2r\kappa(x)$ です。

$\chi=\partial_v$ は $v$ に依存しない計量のKilling場であり、計量双対と法線を地平線で比較すると

$$
\chi^\flat=-2r\kappa(x)\,dv+dr
\ \xrightarrow{r\to0}\ dr,
\qquad g^{rr}|_{r=0}=0.
$$

したがって[GR29のKilling地平線](../../GR/GR29/index.md#def-gr29-killing-horizon)の正則性・零法線・非零生成場の条件が成立します。[表面重力とKillingノルムの勾配](../../GR/GR45/index.md#prop-gr45-gradient)から表面重力は $\kappa(x)$ です。[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)から

$$
R_{vx}|_{0}=-\partial_x\kappa=-\frac1{4L^2}\ne0.
$$

したがってKilling性だけでは零法則は成立しません。Einstein方程式と優越エネルギー条件を課せば、[Einstein重力におけるブラックホール力学の零法則](#thm-bht2-zeroth-law)の証明から $R_{vx}=0$ が必要となり、この反例は排除されます。これは局所模型であり実在の漸近平坦ブラックホール解とは主張していません。
<!-- solution-end -->

<a id="ex-bht2-b04"></a>

#### BHT2-B04 非アフィン時間をアフィンに直す

- Level: B

$\kappa=1/(4L)>0$ が一定の地平線生成線で $\chi=dx/dv$ とする。$d\lambda/dv=Ce^{v/(4L)}$ から $\lambda(v)$ を求め、$v\to-\infty$ の極限を答えよ。また $\kappa=0$ の場合と比べよ。

<!-- solution-start -->
**詳細解答。** $C>0$ を固定して積分すると

$$
\lambda(v)=D+\int Ce^{v/(4L)}dv
=D+4LCe^{v/(4L)}.
$$

$v\to-\infty$ で指数項が零になるので $\lambda\to D$ です。$\kappa=0$ では[アフィンパラメータ命題](#prop-bht2-affine-parameter)によって $d\lambda/dv=C$ であり、$\lambda=D+Cv$、従って $v\to-\infty$ なら $\lambda\to-\infty$ です。いずれもこの座標を覆う生成線区間のパラメータ計算であり、時空全体の測地線完備性を単独では判定しません。
<!-- solution-end -->

<a id="ex-bht2-c01"></a>

#### BHT2-C01 零法則の証明と反例を横断する

- Level: C

4次元の滑らかな連結Killing地平線 $\mathcal H$ に非零未来向きKilling生成場 $\chi$ があるとする。$\mathcal H$ の近傍で[Gaussian null表示](#def-bht2-gaussian-null-chart)が使える。

1. $\chi^2$ と $\chi^\flat$ から $\kappa=-F(0,x)/2$ を求め、Killing性だけで保証される一定性の方向を述べよ。
2. $\mathcal H$ 上で $\theta=\sigma=\omega=0$ と仮定し、Raychaudhuri式から $R(\chi,\chi)=0$ を示せ。Einstein方程式と優越エネルギー条件を加えて $R_{vA}=0$ を導け。
3. $R_{vA}=(\partial_A F)/2$ から零法則を結論せよ。連結性の役割を述べよ。
4. 逆に $F(0,x)=-2(\kappa_0+\alpha x^1)$、$h_A=0$、$\gamma_{AB}=\delta_{AB}$、$\alpha\ne0$ とした局所計量について、$\kappa$ と $R_{v1}$ を計算し、どの推論が使えなくなるか説明せよ。
5. $\widehat\chi=2\chi$ とした場合に、一定性と数値がどうなるか述べよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $\chi=\partial_v$ だから $\chi^2=rF$、$\chi^\flat=rFdv+dr+rh_A dx^A$ です。$r=0$ では $\chi^\flat=dr$、$d\chi^2=F(0,x)dr$ です。[表面重力とKillingノルムの勾配](../../GR/GR45/index.md#prop-gr45-gradient)から $Fdr=-2\kappa dr$、よって $\kappa=-F/2$。係数は $v$ に依存しないため $\partial_v\kappa=0$ ですが、$\partial_A\kappa$ は未確定です。

**（2）** アフィン生成場を $k=f\chi$、$f>0$ とします。[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)に膨張・せん断・回転が零という仮定を代入すると

$$
0=-R_{ab}k^ak^b=-f^2 R_{ab}\chi^a\chi^b.
$$

Einstein方程式を零方向に縮約すれば $g(\chi,\chi)=0$ より $T(\chi,\chi)=0$ です。[優越エネルギー条件](../../GR/GR35/index.md#def-gr35-dec)を使うために $J=-T(\cdot,\chi)^\sharp$ と置きます。この流束は未来因果的または零で、

$$
g(J,\chi)=-T(\chi,\chi)=0.
$$

光的な $\chi$ に直交する因果ベクトル $J$ は $\chi$ に比例するため、断面接方向で $T_{vA}=0$ です。Gaussian null表示の地平線上では $g_{vA}=0$ なので、Einstein方程式の跡・宇宙項が消え、

$$
R_{vA}=8\pi T_{vA}=0
$$

と結論できます。

**（3）** [地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)により $0=R_{vA}=(\partial_A F)/2=-\partial_A\kappa$。さらに（1）で $\partial_v\kappa=0$。両方向で微分が零なので各局所近傍で $\kappa$ は一定です。地平線が連結なら重なり合う近傍の定数値が一致し、全体で一定です。非連結なら成分ごとに別の定数を許します。

**（4）** $\kappa(x)=\kappa_0+\alpha x^1$ です。[地平線横断方向のRicci恒等式](#lem-bht2-transverse-ricci)により $R_{v1}=-\partial_1\kappa=-\alpha\ne0$、$R_{v2}=0$。この計量は滑らかなKilling地平線を持ちますが、Einstein方程式と優越エネルギー条件を両立させたときに必要な $T_{v1}=0$ が満たせません。したがって（2）の物質条件をこの模型に適用して（3）へ進むことはできません。

**（5）** [Killing場の規格化と表面重力](../../GR/GR45/index.md#prop-gr45-scaling)から $\kappa_{\widehat\chi}=2\kappa_\chi$ です。元の $\kappa$ が一定なら二倍後も一定、非一定なら二倍後も非一定です。零法則は固定した生成場の地平線内一定性を述べるので、異なる規格化の数値が同じであるとは言いません。
<!-- solution-end -->
