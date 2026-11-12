# HOLO9 GKPWと2点関数

[質量と漸近指数の関係](../HOLO8/index.md#prop-holo8-mass-dimension)から、自由スカラーの遅い境界係数が何を指定するかが分かりました。しかし、それだけでは境界の異なる二点 $x,y$ がどの程度相関するかは計算できません。[HOLO7のon-shell作用の境界表示](../HOLO7/index.md#prop-holo7-onshell-boundary)を使うにも、有限cutoffの値と無限遠での源を区別し、紫外発散を除かなければなりません。

本講の中心問いは「**境界源を指定すると、バルク内部の解を介して境界の2点関数の距離冪がどう生じるか**」です。境界から内部へ値を運ぶ核を構成し、その解を繰り込み済みの作用へ代入し、最後に源で2回微分します。CFTと重力の双対性そのものを数学的に証明するのではなく、**GKPW辞書を仮定した自由場の木レベル計算**を完結させます。

## 0. 模型・仮定・計算範囲

整数 $d\ge2$、AdS半径 $L>0$、$\hbar=1$ とします。背景は固定したEuclid Poincaré AdSで、逆反作用・重力ループを無視します。境界座標 $x\in\mathbb R^d$、$z>0$ において

$$
ds_E^2=\frac{L^2}{z^2}(dz^2+dx\cdot dx),\qquad
(-\nabla_E^2+m^2)\phi=0.
$$

特に**非共鳴の開いた窓** $0<\nu<1$ に限定して

$$
\nu=\sqrt{\frac{d^2}{4}+m^2L^2},\quad
\Delta=\frac d2+\nu,\quad
\Delta_-=d-\Delta=\frac d2-\nu
$$

と置きます。このとき $m^2L^2=\Delta(\Delta-d)$ です。$0<\nu<1$ なら遅い冪と速い冪の間に差 $2\nu<2$ があり、先頭の境界微分補正 $z^{\Delta_-+2}$ は速い冪 $z^\Delta$ より後に現れます。これが反項を一つにできる理由です。$\nu=0$ の対数・$\nu\ge1$ の追加発散は本講の一般式に黙って含めず、後のHOLO14で体系化します。

源 $J$ は実数値の滑らかなコンパクト台関数 $C_c^\infty(\mathbb R^d)$ とします。以下の積分の差を含む式ではこの条件を使い、零でない境界方向の波数成分については $z\to\infty$ で減衰するEuclid解を選びます。赤外端で追加の状態・境界条件を許したときの一意性は主張しません。源の二次の汎関数微分は最初は滑らかな試験方向で定義し、最終的な2点核は異なる点 $x\ne y$ で読みます。

## 1. 境界から内部へ値を運ぶ核

境界から離れた点 $(z,x)$ に、境界の点 $y$ の源をどれだけ反映させるかを表すのがbulk-to-boundary核です。まず距離 $r=|x-y|$ のみで決まる関数を考えます。分母 $z^2+r^2$ は、バルクの深さと境界に沿う距離の両方を比較するために現れます。

<a id="def-holo9-bulk-boundary"></a>

<!-- formal-statement-start -->
> **定義（規格化されたbulk-to-boundary核）**  
> $d\ge2$、$L>0$、$0<\nu<1$、$\Delta=d/2+\nu$ とする。$z>0$、$x,y\in\mathbb R^d$ に対して

$$
c_\Delta=\frac{\Gamma(\Delta)}{\pi^{d/2}\Gamma(\nu)},\qquad
K_\Delta(z,x;y)=c_\Delta\left(\frac{z}{z^2+|x-y|^2}\right)^\Delta
$$

> とする。ここで $\Gamma(a)=\int_0^\infty t^{a-1}e^{-t}dt$（$a>0$）である。滑らかなコンパクト台の源 $J$ から作る場を

$$
\phi_J(z,x)=\int_{\mathbb R^d}K_\Delta(z,x;y)J(y)\,d^dy
$$

> と定める。この核は、境界で $z^{-\Delta_-}\phi_J\to J$ となるように規格化している。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo9-bulk-boundary -->
**定義の確認**： $d=3$、$\nu=1/2$ なら $\Delta=2$、$\Gamma(2)=1$、$\Gamma(1/2)=\sqrt\pi$ なので $c_\Delta=1/\pi^2$ です。従って

$$
K_2(z,x;y)=\frac{z^2}{\pi^2(z^2+|x-y|^2)^2}>0.
$$

ここで積分は、境界方向の極座標 $r=|x-y|$ と $r=z\tan\theta$ を使うと直接確認できます。

$
\begin{aligned}
\int_{\mathbb R^3}K_2(z,x;y)\,d^3y
&=\frac{4z^2}{\pi}\int_0^\infty\frac{r^2}{(z^2+r^2)^2}\,dr\\
&=\frac{4z}{\pi}\int_0^{\pi/2}\sin^2\theta\,d\theta
=\frac{4z}{\pi}\cdot\frac{\pi}{4}=z.
\end{aligned}
$

従って定数源を形式的に入れると $\phi=zJ$ です。定数源はコンパクト台ではありませんが、**規格化の局所的な検算**としては意味があり、コンパクト台の源では $z^{-1}\phi_J\to J$ が成り立ちます。この例は核の正値性、指数、境界規格化を直接点検しています。
<!-- definition-example-end -->

<a id="prop-holo9-kernel-solution"></a>

<!-- formal-statement-start -->
> **命題（核の方程式と境界規格化）**  
> 上の仮定のもと、$K_\Delta(\cdot,\cdot;y)$ は $z>0$ で $(-\nabla_E^2+m^2)K_\Delta=0$ を満たす。$J\in C_c^\infty(\mathbb R^d)$ に対して $\phi_J$ も同じ方程式の滑らかな解で、各 $x$ において

$$
\lim_{z\downarrow0}z^{-\Delta_-}\phi_J(z,x)=J(x).
$$

> さらに $c_\Delta$ はこの境界規格化を満たす正の定数として一意に決まる。
<!-- formal-statement-end -->

### 証明の見取り図

核を $z^\Delta(z^2+r^2)^{-\Delta}$ に分解して微分し、質量と指数の関係を使います。境界極限は $y=x+zu$ と変数を変えると、積分核が確率密度と同じ「全質量1」の形になることから従います。

<!-- proof-start -->
### 証明

$u=z^2+|x-y|^2$、$F=z^\Delta u^{-\Delta}$ と書きます。対数微分から

$$
\frac{\partial_zF}{F}=\frac{\Delta}{z}-\frac{2\Delta z}{u},\qquad
\frac{\partial_z^2F}{F}=\frac{\Delta(\Delta-1)}{z^2}
-\frac{2\Delta(2\Delta+1)}{u}
+\frac{4\Delta(\Delta+1)z^2}{u^2}.
$$

境界方向の $d$ 個の微分を足すと

$$
\frac{\Delta_xF}{F}
=-\frac{2d\Delta}{u}+\frac{4\Delta(\Delta+1)|x-y|^2}{u^2}.
$$

[HOLO8の成分表示](../HOLO8/index.md#ref-holo8-radial-equation)での $\nabla_E^2=L^{-2}[z^2\partial_z^2-(d-1)z\partial_z+z^2\Delta_x]$ に代入します。$u^{-2}$ の項を先に合算すると、その寄与は

$
4\Delta(\Delta+1)\frac{z^2(z^2+|x-y|^2)}{u^2}
=4\Delta(\Delta+1)\frac{z^2}{u}
$

です。一方、$z^2/u$ に掛かる残りの係数は、$z^2\partial_z^2F$、$-(d-1)z\partial_zF$、$z^2\Delta_xF$ の順に

$
-2\Delta(2\Delta+1),\qquad
2(d-1)\Delta,\qquad -2d\Delta
$

です。したがって全係数は

$
-2\Delta(2\Delta+1)+2(d-1)\Delta-2d\Delta
+4\Delta(\Delta+1)=0.
$

残る定数項は

$
\frac{L^2\nabla_E^2F}{F}
=\Delta(\Delta-1)-(d-1)\Delta
=\Delta(\Delta-d)=m^2L^2.
$

従って各 $y$ ごとに方程式を満たします。$J$ のコンパクト台と $z>0$ によって微分を積分の中へ移せるので $\phi_J$ も解です。

次に $y=x+zu$ と変数変換し、$dy=z^ddu$ を使うと

$$
z^{-\Delta_-}\phi_J(z,x)
=c_\Delta\int_{\mathbb R^d}\frac{J(x+zu)}{(1+|u|^2)^\Delta}\,d^du.
$$

$\Delta>d/2$ なので右辺の重みは可積分です。実際 $\Gamma$ の積分表示と $d$ 次元Gaussian積分 $\int e^{-t|u|^2}d^du=(\pi/t)^{d/2}$ から

$$
\int_{\mathbb R^d}\frac{d^du}{(1+|u|^2)^\Delta}
=\frac{1}{\Gamma(\Delta)}
\int_0^\infty t^{\Delta-1}e^{-t}\left(\frac{\pi}{t}\right)^{d/2}dt
=\frac{\pi^{d/2}\Gamma(\nu)}{\Gamma(\Delta)}
=\frac1{c_\Delta}.
$$

$J$ は有界で連続だから、可積分な重みによる優収束で極限は $J(x)$ です。全質量を1にする係数は上式の逆数以外にありません。$\square$
<!-- proof-end -->

深さ $z$ を小さくすると、核の境界方向の広がりは概ね $|x-y|\sim z$ に集中します。しかし **$K_\Delta$ 自体が通常のDirac deltaへ近づくわけではありません**。境界源を返すのは $z^{-\Delta_-}K_\Delta$ の積分作用であり、冪を掛け忘れると規格化を誤ります。

## 2. 遅い係数から速い係数を取り出す

源 $J$ は遅い冪 $z^{\Delta_-}$ の係数です。一方、赤外で減衰する解を選んだ結果、速い冪 $z^\Delta$ の係数 $B[J]$ が **源全体に依存する応答**として決まります。この非局所依存が2点関数の起源です。

$J(x)$ を核の積分から足し引きし、前節の規格化を使うと厳密に

$$
\phi_J(z,x)=z^{\Delta_-}J(x)
+c_\Delta z^\Delta\int_{\mathbb R^d}
\frac{J(y)-J(x)}{(z^2+|x-y|^2)^\Delta}\,d^dy.
$$

線形差は $y=x$ の近くで奇関数となるため、対称な領域で積分すると打ち消されます。より正確には $J(y)-J(x)$ を $|x-y|<1$ で一次Taylor項と二次以上の剰余に分け、一次項を対称積分で零とし、剰余の絶対値を $C|x-y|^2$ で抑えます。動径積分は $\int_0^1r^{1-2\nu}dr$ なので **$\nu<1$ で有限**です。遠方では $J$ のコンパクト台と $\Delta>d/2$ が効きます。

<a id="ref-holo9-response"></a>

### 2.1 非局所応答の主値積分

従って、対称主値（半径 $\rho$ の球を除外して $\rho\downarrow0$ とする極限）で定めた

$$
B[J](x)=c_\Delta\,\mathrm{PV}\!\int_{\mathbb R^d}
\frac{J(y)-J(x)}{|x-y|^{2\Delta}}\,d^dy
$$

が存在し、$z\downarrow0$ での先頭二係数は

$$
\phi_J(z,x)=z^{\Delta_-}J(x)+z^\Delta B[J](x)+o(z^\Delta).
$$

この $o(z^\Delta)$ は滑らかな $J$ を固定したときの各点の漸近です。$z^{\Delta_-+2}$ 型の後続項は $0<\nu<1$ では $z^\Delta$ より小さいので妨げになりません。

**例：源を遠ざけた二点。** $x$ の近傍で $J=0$ とし、別の点 $y$ の小領域だけに源を置けば、$J(x)=0$ なので積分に主値は不要で

$$
B[J](x)=c_\Delta\int_{\mathbb R^d}\frac{J(y)}{|x-y|^{2\Delta}}\,d^dy.
$$

距離を2倍にした点源に対する寄与は $2^{-2\Delta}$ 倍です。これは2点の**離れた場所での応答**であり、同一点で発散する積分を勝手に通常積分とみなしたものではありません。

## 3. 有限cutoffの作用を、有限な境界汎関数へ

[HOLO7の境界応答](../HOLO7/index.md#def-holo7-cutoff-flux)では $z=\epsilon$ の外向き法線が負の $z$ 方向でした。境界値 $\phi_\epsilon(x)=\phi_J(\epsilon,x)$ とし、赤外 $z\to\infty$ からの境界項が消える規則的な解に限定すると、[on-shell境界表示](../HOLO7/index.md#prop-holo7-onshell-boundary)から

$$
S_{\mathrm{os},\epsilon}[J]
=-\frac{L^{d-1}}{2}\int_{\mathbb R^d}
\epsilon^{1-d}\phi_\epsilon(x)\partial_z\phi_J(\epsilon,x)\,d^dx
$$

です。一般には $\epsilon^{-2\nu}$ に比例する発散があります。局所的な境界作用を足し、源 $J$ を固定したまま $\epsilon\downarrow0$ とします。

<a id="def-holo9-renormalized-action"></a>

<!-- formal-statement-start -->
> **定義（本模型の繰り込み済みon-shell作用）**  
> $d\ge2$、$L>0$、$0<\nu<1$、$J\in C_c^\infty(\mathbb R^d)$ とする。前節の正則な $\phi_J$ について、境界の誘導計量 $\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$ と次の局所反項を使う。

$$
S_{\mathrm{ct},\epsilon}
=\frac{\Delta_-}{2L}
\int_{z=\epsilon}\!\sqrt{\gamma}\,\phi_\epsilon^2\,d^dx
=\frac{L^{d-1}\Delta_-}{2}
\int_{\mathbb R^d}\epsilon^{-d}\phi_\epsilon^2\,d^dx.
$$

> このとき、存在する場合の極限を

$$
S_{\mathrm{ren}}[J]
=\lim_{\epsilon\downarrow0}
\left(S_{\mathrm{os},\epsilon}[J]+S_{\mathrm{ct},\epsilon}[J]\right)
$$

> と定める。本講の標準選択では $J$ を固定し、源に依存しない真空作用定数を零に取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo9-renormalized-action -->
**定義の確認**： $d=3$、$\nu=1/2$ では $\Delta_-=1$ です。誘導面積密度は $\sqrt\gamma=L^3\epsilon^{-3}$ なので

$$
S_{\mathrm{ct},\epsilon}
=\frac{L^2}{2}\int\epsilon^{-3}\phi_\epsilon^2d^3x.
$$

先頭項 $\phi_\epsilon\sim\epsilon J$ を代入すると $S_{\mathrm{ct},\epsilon}\sim(L^2/2)\epsilon^{-1}\int J^2$。一方、on-shell側の先頭は $-(L^2/2)\epsilon^{-1}\int J^2$ です。**この例では反項と裸作用の主要発散が符号も含めて相殺**します。実際の有限項は次の命題で、$B[J]$ を含めて検算します。
<!-- definition-example-end -->

<a id="prop-holo9-finite-action"></a>

<!-- formal-statement-start -->
> **命題（繰り込み極限と境界応答）**  
> 上記の $0<\nu<1$、コンパクト台の滑らかな $J$、正則なEuclid解という条件で、定義した極限は存在し、次を満たす。

$$
S_{\mathrm{ren}}[J]=-\nu L^{d-1}\int_{\mathbb R^d}J(x)B[J](x)\,d^dx.
$$

> また、同じ条件を満たす任意の滑らかな実変分方向 $h$ に対し、

$$
\left.\frac{d}{ds}S_{\mathrm{ren}}[J+sh]\right|_{s=0}
=-2\nu L^{d-1}\int_{\mathbb R^d}h(x)B[J](x)\,d^dx.
$$

<!-- formal-statement-end -->

### 証明の見取り図

裸作用と反項を**極限前に合算**してから、遅い冪の微分が相殺されることを示します。残る $2\nu B$ が有限応答です。さらに積分核の対称性が、$J$ と変分方向 $h$ を交換することを保証します。

<!-- proof-start -->
### 証明

有限cutoffで二項をまとめると

$$
S_{\mathrm{os},\epsilon}+S_{\mathrm{ct},\epsilon}
=-\frac{L^{d-1}}2\int\epsilon^{1-d}\phi_\epsilon
\left(\partial_z\phi_J-\frac{\Delta_-}{\epsilon}\phi_J\right)_{z=\epsilon}d^dx.
$$

[前節の二係数展開](#ref-holo9-response)を微分できる滑らかな源について、積分表示を微分するかTaylor剰余を微分して確認すると

$$
\phi_\epsilon=\epsilon^{\Delta_-}J+\epsilon^\Delta B+o(\epsilon^\Delta),\quad
\left(\partial_z-\frac{\Delta_-}{z}\right)\phi_J
=2\nu z^{\Delta-1}B+o(z^{\Delta-1}).
$$

後者は単に $o(z^\Delta)$ を形式的に微分した結論ではありません。微分と積分極限を確かめるため、$r=y-x$ と置いて

$
R_z(x)=c_\Delta\int_{\mathbb R^d}
\frac{J(x+r)-J(x)}{(z^2+|r|^2)^\Delta}\,d^dr,
\qquad
P_z(x)=z^{-\Delta_-}\phi_J(z,x)
$

と書きます（$R_z$ の積分は対称主値で解釈します）。先の積分の恒等式から

$
\phi_J=z^{\Delta_-}J+z^\Delta R_z,\qquad
\left(\partial_z-\frac{\Delta_-}{z}\right)\phi_J
=z^{\Delta-1}(2\nu R_z+z\partial_zR_z)
$

が **$z>0$ で厳密に** 成り立ちます。局所的には $J(x+r)-J(x)$ から一次Taylor項 $\nabla J(x)\cdot r$ を引けます。この項の積分は反転対称性により零で、残りは $C|r|^2$ 以下です。従って $0<z\le1$ で $R_z$ は $x$ に関して一様有界であり、$R_z(x)\to B[J](x)$ です。また $z$ で微分した核から

$
z\partial_zR_z(x)
=-2\Delta c_\Delta z^2
\int_{\mathbb R^d}
\frac{J(x+r)-J(x)}{(z^2+|r|^2)^{\Delta+1}}\,d^dr
$

を得ます。ここでも一次Taylor項の積分は零です。$|r|<1$ と $|r|\ge1$ に分け、前者で $r=zu$ と置くと

$
\begin{aligned}
\sup_x|z\partial_zR_z(x)|
&\le C z^2\int_0^1
\frac{r^{d+1}}{(z^2+r^2)^{\Delta+1}}\,dr+Cz^2\\
&\le C' z^{2-2\nu}
\int_0^\infty\frac{u^{d+1}}{(1+u^2)^{\Delta+1}}\,du+Cz^2
\longrightarrow0.
\end{aligned}
$

最後の積分は無限遠で $u^{-1-2\nu}$ の次数であり、$\nu>0$ により有限です。さらに前節の規格化核は非負で積分1の近似恒等作用素なので、滑らかなコンパクト台の $J$ に対して $P_z\to J$ が $L^1(\mathbb R^d)$ でも成り立ち、$\|P_z\|_1\le\|J\|_1$ です。$R_z$ の一様有界性、各点収束と $\sup_x|z\partial_zR_z|\to0$ を合わせると

$
\int P_z(2\nu R_z+z\partial_zR_z)\,d^dx
\longrightarrow2\nu\int J(x)B[J](x)\,d^dx.
$

ここで $z^{1-d}\phi_Jz^{\Delta-1}=P_z$ は $\Delta+\Delta_-=d$ から従います。以上より、極限は $-\nu L^{d-1}\int JB$ となります。

次に [応答の主値積分](#ref-holo9-response)について対称なcutoff $|x-y|>\rho$ を入れます。$J,h$ のコンパクト台と対称性により

$$
\int h\,B[J]
=-\frac{c_\Delta}{2}
\iint\frac{(h(x)-h(y))(J(x)-J(y))}
{|x-y|^{2\Delta}}\,d^dx\,d^dy
=\int J\,B[h].
$$

積分は対角近くで分子が $O(|x-y|^2)$、動径指数が $1-2\nu>-1$ なので絶対収束します。二次汎関数 $-\nu L^{d-1}\int JB[J]$ を $J+sh$ で展開すると、二つの交差項が等しく、主張する係数 $-2\nu$ を得ます。$\square$
<!-- proof-end -->

この命題から、特に

$$
S_{\mathrm{ren}}[J]=\frac{\nu L^{d-1}c_\Delta}{2}
\iint_{\mathbb R^{2d}}\frac{(J(x)-J(y))^2}
{|x-y|^{d+2\nu}}\,d^dx\,d^dy\ge0
$$

とも書けます。この正値性は本模型の**規則的Euclid解とここで選んだ反項**についての式であり、負の質量二乗を持つ任意のLorentz境界問題のエネルギー正値性を証明したものではありません。

## 4. GKPW辞書から2点関数を得る

$d\ge3$ では、[QFT48のスカラー一次場の定義](../../QFT/QFT48/index.md#def-qft48-scalar-primary)を使った[HOLO4の境界CFT](../HOLO4/index.md)から、相異なる二点の相関関数が $|x-y|^{-2\Delta}$ に比例することを既習です。ただし両講の定理は $d\ge3$ を仮定しており、**本講で許す $d=2$ へそのまま引用できません**。$d=2$ も含む以下の距離冪は、共形対称性の既習定理を拡張したものとしてではなく、明示するGKPW辞書とバルク核から直接導きます。いずれの次元でも対称性だけでは係数が決まりません。ここでバルク作用の計算結果を境界演算子の生成汎関数と**対応させる仮定**を明示します。

<a id="def-holo9-gkpw"></a>

<!-- formal-statement-start -->
> **定義（本講で用いるGKPWの木レベル辞書）**  
> 上記の固定Euclid AdSの自由スカラーについて、境界にスカラー演算子 $\mathcal O$ と源 $J$ が存在し、標準選択の生成汎関数が半古典・木レベル近似で

$$
Z_{\mathrm{CFT}}[J]
=\left\langle\exp\!\left(\int_{\mathbb R^d}J(x)\mathcal O(x)\,d^dx\right)\right\rangle
\simeq e^{-S_{\mathrm{ren}}[J]},\qquad W[J]=\log Z_{\mathrm{CFT}}[J]
$$

> と対応すると仮定する。ここで $\langle\cdot\rangle$ は源零のEuclid境界状態での期待値、$\simeq$ は指定した近似での対応を表す。連結2点関数は $W$ の二階汎関数微分で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo9-gkpw -->
**定義の確認**：互いに台が重ならない実試験関数 $h_1,h_2$ を選び、$J=s h_1+t h_2$ とします。左辺を $s,t$ で一回ずつ微分し、$Z[0]=1$ を用いると

$
\left.\partial_s\partial_t\log Z[sh_1+th_2]\right|_{s=t=0}
=\iint h_1(x)h_2(y)
\bigl(\langle\mathcal O(x)\mathcal O(y)\rangle
-\langle\mathcal O(x)\rangle\langle\mathcal O(y)\rangle\bigr)
\,d^dx\,d^dy.
$

つまり対数が**連結部分**を返します。一方、本講の $W=-S_{\mathrm{ren}}$ は二次汎関数であり、源零で一次微分は零です。さらに [応答の対称性と変分](#prop-holo9-finite-action)を使い、二つの台が交わらないので局所的な引き算の項が消えることを確かめると

$
\left.\partial_s\partial_tW[sh_1+th_2]\right|_{s=t=0}
=2\nu L^{d-1}c_\Delta
\iint\frac{h_1(x)h_2(y)}{|x-y|^{2\Delta}}\,d^dx\,d^dy.
$

このように試験方向で微分を定義すれば、分離点の二点核と生成汎関数の対応を直接検査できます。
<!-- definition-example-end -->

<a id="prop-holo9-two-point"></a>

<!-- formal-statement-start -->
> **命題（自由スカラーのGKPW 2点関数）**  
> $d\ge2$、$L>0$、$0<\nu<1$、$\Delta=d/2+\nu$ とし、前節の作用・Euclid状態・GKPW辞書を仮定する。異なる二点 $x\ne y$ では

$$
\langle\mathcal O(x)\mathcal O(y)\rangle_{\mathrm{conn}}
=\frac{(2\Delta-d)L^{d-1}\Gamma(\Delta)}
{\pi^{d/2}\Gamma(\Delta-d/2)}
\frac1{|x-y|^{2\Delta}}.
$$

> 等号は木レベルの標準量子化・本講のバルク作用規格化における非接触部分についてである。同一点の接触項は局所反項の有限部分によって変更されうる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $W=-S_{\mathrm{ren}}$ の一階微分から応答 $B[J]$ を読みます。次に $B[J]$ の定義で $x$ と $y$ を離して微分すれば主値の特異性が消え、核 $c_\Delta|x-y|^{-2\Delta}$ がそのまま残ります。

<!-- proof-start -->
### 証明

[繰り込み極限と境界応答](#prop-holo9-finite-action)を源方向に適用します。[本講で用いるGKPWの木レベル辞書](#def-holo9-gkpw)によって $W=-S_{\mathrm{ren}}$ とするので、

$$
\frac{\delta W[J]}{\delta J(x)}
=2\nu L^{d-1}B[J](x).
$$

[境界応答の積分式](#ref-holo9-response)で $x\ne y$ かつ二つの変分方向の台が交わらない場合、引き算の局所項は寄与せず、

$$
\frac{\delta B[J](x)}{\delta J(y)}
=\frac{c_\Delta}{|x-y|^{2\Delta}}\quad(x\ne y).
$$

さらに源 $J=0$ としてもう一回微分すると

$$
\frac{\delta^2W}{\delta J(x)\delta J(y)}\bigg|_{J=0}
=2\nu L^{d-1}\frac{c_\Delta}{|x-y|^{2\Delta}}.
$$

$2\nu=2\Delta-d$、$\nu=\Delta-d/2$ と $c_\Delta$ の定義を代入すれば命題の係数となります。$\square$
<!-- proof-end -->

**具体値で検算。** $d=3$、$\nu=1/2$、$\Delta=2$ の場合は $c_\Delta=1/\pi^2$、$2\nu=1$ ですから

$$
\langle\mathcal O(x)\mathcal O(y)\rangle_{\mathrm{conn}}
=\frac{L^2}{\pi^2|x-y|^4}\qquad(x\ne y).
$$

距離を2倍にすると $1/16$ 倍です。ここで $L^{d-1}$ は本講の作用に前置係数を別に置かなかった結果です。一般の重力・超重力模型で作用に $1/g_\phi^2$ 等が掛かれば、2点関数にも**同じ係数が掛かります**。演算子 $\mathcal O$ の規格化を変えれば係数も変わりますが、分離点の指数 $2\Delta$ は変わりません。

## 5. Fourier空間での非局所性と接触項

距離冪の正規化を違う方法で点検します。以下で使う負の引数のGamma記号は、積分表示の定義域 $a>0$ から漸化式で延長し、$Γ(-\nu)=-\Gamma(1-\nu)/\nu$（$0<\nu<1$）と定めます。Fourier変換は $J(k)=\int e^{-ik\cdot x}J(x)\,d^dx$、逆変換は $\int e^{ik\cdot x}J(k)\,d^dk/(2\pi)^d$ とします。

<a id="prop-holo9-momentum"></a>

<!-- formal-statement-start -->
> **命題（運動量空間の応答）**  
> $d\ge2$、$0<\nu<1$、$J\in C_c^\infty(\mathbb R^d)$ では、[応答](#ref-holo9-response)のFourier変換は次を満たす。

$$
B[J](k)=\frac{\Gamma(-\nu)}{2^{2\nu}\Gamma(\nu)}
|k|^{2\nu}J(k).
$$

> したがって本講の木レベル連結2点関数の非局所な運動量依存は

$$
G(k)=2\nu L^{d-1}\frac{\Gamma(-\nu)}
{2^{2\nu}\Gamma(\nu)}|k|^{2\nu}
$$

> である。局所な有限反項を許せば $G(k)$ に $k$ の多項式を追加でき、位置空間では対角線 $x=y$ 上のdelta分布とその微分に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

主値の積分に平面波を代入すると、係数は $\int(e^{-ik\cdot r}-1)|r|^{-d-2\nu}dr$ になります。指数関数のGaussian積分表示により $d$ 次元積分を一変数の $\Gamma$ 積分へ戻します。

<!-- proof-start -->
### 証明

主値は反転 $r\mapsto-r$ で虚部が相殺され、Fourier変換後の係数は

$$
c_\Delta\int_{\mathbb R^d}
\frac{\cos(k\cdot r)-1}{|r|^{d+2\nu}}\,d^dr.
$$

$0<\nu<1$ なら原点で $\cos(k\cdot r)-1=O(|r|^2)$、遠方では $|r|^{-d-2\nu}$ なので絶対収束です。$|r|^{-2\Delta}$ のGamma積分表示を代入し、Gaussian Fourier積分を計算すると

$$
\begin{aligned}
I(k)&=\frac{\pi^{d/2}}{\Gamma(\Delta)}
\int_0^\infty t^{\nu-1}\left(e^{-|k|^2/(4t)}-1\right)dt\\
&=\frac{\pi^{d/2}}{\Gamma(\Delta)}
\left(\frac{|k|^2}{4}\right)^\nu
\int_0^\infty s^{-\nu-1}(e^{-s}-1)ds.
\end{aligned}
$$

ここでは $s=|k|^2/(4t)$ としました。最後の積分を部分積分し、$0<\nu<1$ だから両端の積が零になることを確かめると

$$
\int_0^\infty s^{-\nu-1}(e^{-s}-1)ds
=-\frac1\nu\int_0^\infty s^{-\nu}e^{-s}ds
=-\frac{\Gamma(1-\nu)}{\nu}
=\Gamma(-\nu).
$$

最後の等号は $\Gamma(1-\nu)=(-\nu)\Gamma(-\nu)$ によります。この $\Gamma(-\nu)$ は負数です。$c_\Delta=\Gamma(\Delta)/(\pi^{d/2}\Gamma(\nu))$ と合わせれば、$c_\Delta I(k)=\Gamma(-\nu)|k|^{2\nu}/(2^{2\nu}\Gamma(\nu))$ を得ます。最後の $G(k)$ は[2点関数命題](#prop-holo9-two-point)と同じ $2\nu L^{d-1}$ を掛けたものです。$\square$
<!-- proof-end -->

$G(k)$ がこの窓で負になることと、分離した二点での位置空間の正の係数は矛盾しません。Fourier変換する対象は**対角線上で普通の関数として積分できない特異核**であり、引き算を含む分布として定義しました。実際、$S_{\mathrm{ren}}\ge0$ なので $W=-S_{\mathrm{ren}}$ の二次形式は非正です。Euclid相関の反射陽性などの完全な検査には、時間反転・状態・接触項を含む別の議論が必要です。

## 6. 適用境界：cutoff、接触項、Lorentz継続

| 対象 | 本講で確定したこと | 自動的には言えないこと |
| --- | --- | --- |
| 有限cutoff $\epsilon$ | 外向き法線からの裸作用と、主要発散を消す局所反項 | $\phi(\epsilon,x)$ がそのままCFT源 $J(x)$ であること |
| 境界極限 | $z^{-\Delta_-}\phi\to J$、$B[J]$ は源全体の非局所応答 | 赤外条件なしに任意の $B$ が同じ $J$ に対応すること |
| Euclidの2点 | $x\ne y$ で $|x-y|^{-2\Delta}$ と規格化係数 | 対角線の一意な分布的延長・反項scheme独立性 |
| Fourier表示 | $|k|^{2\nu}$ の非解析的な依存 | 局所な $k$ 多項式の係数の一意性 |
| Lorentz実時間 | Euclid関数を解析接続する出発点 | 1つの形式的置換が全てのWightman・時間順序相関を決定すること |

特にEuclidの時間差を $\tau$、空間差を $\boldsymbol r$ とすると、分離点の式は $(\tau^2+|\boldsymbol r|^2)^{-\Delta}$ を含みます。真空の時間順序相関へ解析接続する際は、正しい解析領域と境界値の取り方を指定し、典型的には $|\boldsymbol r|^2-(|t|-i\epsilon)^2$ の枝を使います。**$i\epsilon$ は単に数式を見栄えよくする符号ではなく、どの相関関数の境界値かを選ぶ情報**です。Lorentzの波動方程式に対する初期データ・infalling条件などは今回のEuclid正則性だけでは指定していません。

また $\nu=0$ では[HOLO8の重根の対数](../HOLO8/index.md#prop-holo8-mass-dimension)が出て、$\nu\ge1$ では境界微分の発散項が増えます。前節までの単一反項と単純な $B[J]$ 式を、これらの範囲へそのまま広げないでください。

## 7. 演習と詳細解答

<a id="ex-holo9-a1"></a>
### A1. 核の規格化を再計算する

- Level: A
- 問題: $d=2$、$\nu=1/2$、$\Delta=3/2$ とする。$c_\Delta$ を求め、$\int_{\mathbb R^2}K_\Delta(z,x;y)\,d^2y=z^{1/2}$ を極座標積分から確かめよ。

<!-- solution-start -->
**詳細解答。** $\Gamma(3/2)=\sqrt\pi/2$、$\Gamma(1/2)=\sqrt\pi$ だから $c_\Delta=1/(2\pi)$。$r=|x-y|$ とし $d^2y=2\pi r\,dr$ を使うと

$$
\begin{aligned}
\int K_\Delta d^2y
&=\frac{z^{3/2}}{2\pi}\,2\pi
\int_0^\infty \frac{r\,dr}{(z^2+r^2)^{3/2}}\\
&=z^{3/2}\left[-(z^2+r^2)^{-1/2}\right]_{0}^{\infty}
=z^{3/2}\frac1z=z^{1/2}.
\end{aligned}
$$

$\Delta_-=2-3/2=1/2$ なので、必要な $z^{\Delta_-}$ に一致します。
<!-- solution-end -->

<a id="ex-holo9-a2"></a>
### A2. 方程式への代入を検算する

- Level: A
- 問題: $d=3$、$\Delta=2$ の $F=z^2/(z^2+r^2)^2$ について、$\nabla_E^2F= -2F/L^2$ となることを確認し、対応する $m^2L^2$ を求めよ。

<!-- solution-start -->
**詳細解答。** $u=z^2+r^2$ と置き、[核の証明](#prop-holo9-kernel-solution)の微分を $\Delta=2$ に具体化すると

$
\frac{\partial_zF}{F}=\frac2z-\frac{4z}{u},\qquad
\frac{\partial_z^2F}{F}=\frac{2}{z^2}-\frac{20}{u}+\frac{24z^2}{u^2},
\qquad
\frac{\Delta_xF}{F}=-\frac{12}{u}+\frac{24r^2}{u^2}
$

です。境界方向が3次元なので、[HOLO8のLaplace作用素](../HOLO8/index.md#ref-holo8-radial-equation)における $-(d-1)z\partial_z=-2z\partial_z$ と合わせれば

$
\begin{aligned}
\frac{L^2\nabla_E^2F}{F}
&=z^2\left(\frac{2}{z^2}-\frac{20}{u}+\frac{24z^2}{u^2}\right)
-2z\left(\frac2z-\frac{4z}{u}\right)
+z^2\left(-\frac{12}{u}+\frac{24r^2}{u^2}\right)\\
&=-2-\frac{24z^2}{u}
+\frac{24z^2(z^2+r^2)}{u^2}=-2.
\end{aligned}
$

従って $\nabla_E^2F=-2F/L^2$、場の式 $(-\nabla_E^2+m^2)F=0$ の質量は $m^2L^2=-2$ です。指数判別は $\nu=\sqrt{9/4-2}=1/2$ なので、今回の開いた窓にあります。核の前係数は微分方程式を変えず、境界の規格化だけを決めます。
<!-- solution-end -->

<a id="ex-holo9-a3"></a>
### A3. 主要発散を相殺する

- Level: A
- 問題: $d=3$、$\nu=1/2$ の解 $\phi_\epsilon=\epsilon J+\epsilon^2B+o(\epsilon^2)$ を用い、裸作用と反項を $\epsilon^0$ まで展開して和を計算せよ。

<!-- solution-start -->
**詳細解答。** $\partial_z\phi=J+2\epsilon B+o(\epsilon)$。従って

$$
\epsilon^{-2}\phi_\epsilon\partial_z\phi_\epsilon
=\epsilon^{-1}J^2+3JB+o(1).
$$

裸作用は $S_{\mathrm{os},\epsilon}=-(L^2/2)\int(\epsilon^{-1}J^2+3JB)d^3x+o(1)$ です。一方、$\Delta_-=1$ の反項では

$$
\epsilon^{-3}\phi_\epsilon^2
=\epsilon^{-1}J^2+2JB+o(1)
$$

なので $S_{\mathrm{ct},\epsilon}=(L^2/2)\int(\epsilon^{-1}J^2+2JB)d^3x+o(1)$。和は $-L^2\int JB/2+o(1)=-\nu L^2\int JB+o(1)$ です。発散と有限係数の両方を確認しました。
<!-- solution-end -->

<a id="ex-holo9-a4"></a>
### A4. 距離を変えたときの2点関数

- Level: A
- 問題: $d=3$、$\nu=1/2$ の分離点 $|x-y|=a>0$ と $|x-y|=3a$ の2点関数の比を求めよ。また係数を $L$ で表せ。

<!-- solution-start -->
**詳細解答。** $\Delta=3/2+1/2=2$、$2\Delta=4$。命題より $G(x,y)=L^2/(\pi^2|x-y|^4)$ です。従って $G(3a)/G(a)=a^4/(3a)^4=1/81$。距離を変えても係数 $L^2/\pi^2$ は変わりません。
<!-- solution-end -->

<a id="ex-holo9-a5"></a>
### A5. なぜ $x=y$ に代入できないか

- Level: A
- 問題: $d=3$、$\Delta=2$ で $|x-y|^{-4}$ を $x$ の近傍に通常積分しようとすると何が起きるか。接触項との違いを説明せよ。

<!-- solution-start -->
**詳細解答。** $r=|x-y|$ とし、半径 $\rho$ 以下の球で積分すると体積要素が $4\pi r^2dr$ なので $\int_0^\rho 4\pi r^2r^{-4}dr=4\pi\int_0^\rho r^{-2}dr$ は発散します。従って $r^{-4}$ をそのまま対角線までの通常の積分核とはできません。[応答の定義](#ref-holo9-response)は $J(y)-J(x)$ を差し引き、対称主値で有限な分布作用を定めています。接触項は $x=y$ に台を持つdelta分布やその微分であり、$x\ne y$ での $r^{-4}$ の値は変えません。
<!-- solution-end -->

<a id="ex-holo9-b1"></a>
### B1. 源の正則性と応答の有限性

- Level: B
- 問題: $J\in C_c^\infty(\mathbb R^d)$、$0<\nu<1$ とする。[応答積分](#ref-holo9-response)の原点で一次Taylor項を対称主値で消し、残りが有限となる指数条件を導け。$\nu=1$ で同じ証明が使えない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $r=y-x$、$J(x+r)-J(x)=\nabla J(x)\cdot r+R_x(r)$、$|R_x(r)|\le C|r|^2$ と展開します。球殻 $\rho<|r|<1$ では $\nabla J(x)\cdot r$ は $r\mapsto-r$ で符号が逆なので積分が零です。剰余には $|r|^{-d-2\nu}|R_x(r)|\le C|r|^{2-d-2\nu}$ を使い、動径要素 $r^{d-1}dr$ を掛けると $\int_0^1r^{1-2\nu}dr=1/(2-2\nu)$。$\nu<1$ で有限です。$\nu=1$ なら $r^{-1}$ の対数発散となり、二次微分を含む追加の局所差し引きが必要になります。
<!-- solution-end -->

<a id="ex-holo9-b2"></a>
### B2. 作用の変分の符号を独立に追う

- Level: B
- 問題: $\nu\in(0,1)$ で $B$ を [主値核](#ref-holo9-response)により定める。$\int hB[J]=\int JB[h]$ を二重積分で示し、$W=-S_{\mathrm{ren}}$ から $\delta W/\delta J=2\nu L^{d-1}B$ を導け。途中で対称核を使わずに一方の交差項だけを残すと何を誤るか。

<!-- solution-start -->
**詳細解答。** $c_\Delta$ を前に出し、積分領域 $|x-y|>\rho$ で

$$
\int h(x)B[J](x)dx
=c_\Delta\iint\frac{h(x)(J(y)-J(x))}{|x-y|^{d+2\nu}}dxdy.
$$

$x,y$ を交換した同じ式と平均を取ると $-c_\Delta/2$ と差の積 $(h(x)-h(y))(J(x)-J(y))$ を持つ式になります。この積は対角近くで二次の零を持つので $\rho\to0$ とでき、$h$ と $J$ に対称です。

$S_{\mathrm{ren}}[J+s h]=-\nu L^{d-1}[\int JB[J]+s\int hB[J]+s\int JB[h]+s^2\int hB[h]]$。対称性から $s$ の係数は $-2\nu L^{d-1}\int hB[J]$。$W=-S_{\mathrm{ren}}$ なので符号は正です。一方の交差項だけを数えると、微分の係数が半分になる誤りです。
<!-- solution-end -->

<a id="ex-holo9-b3"></a>
### B3. Fourierでの接触項の判定

- Level: B
- 問題: $d=3$、$\nu=1/2$ の $G(k)$ を求め、位置空間の分離点の係数と両立することを説明せよ。有限局所反項 $a\int J^2$ を $S_{\mathrm{ren}}$ に足した場合の $G(k)$ の変化も示せ。

<!-- solution-start -->
**詳細解答。** $\Gamma(-1/2)=-2\sqrt\pi$、$\Gamma(1/2)=\sqrt\pi$、$2^{2\nu}=2$ より

$$
G(k)=2\nu L^2\frac{\Gamma(-1/2)}{2\Gamma(1/2)}|k|
=L^2\frac{-2\sqrt\pi}{2\sqrt\pi}|k|=-L^2|k|.
$$

一方、[位置空間の2点](#prop-holo9-two-point)は $x\ne y$ で $L^2/(\pi^2|x-y|^4)>0$ です。$|x-y|^{-4}$ の対角は通常積分できず、差の積分として延長した分布のFourier像が $-\pi^2|k|$ となるため矛盾しません。

$S_{\mathrm{ren}}\mapsto S_{\mathrm{ren}}+a\int J^2$ とすると $W\mapsto W-a\int J^2$ なので二階微分は $-2a\delta(x-y)$ だけ変わります。従って $G(k)\mapsto G(k)-2a$ です。$x\ne y$ の距離冪は変化しません。
<!-- solution-end -->

<a id="ex-holo9-b4"></a>
### B4. 境界源を固定することとcutoff場を固定すること

- Level: B
- 問題: $\phi_\epsilon=\epsilon^{\Delta_-}J+\epsilon^\Delta B[J]+o(\epsilon^\Delta)$ とする。$\epsilon>0$ のまま源に $\delta J$ を加えたとき、何が $\delta\phi_\epsilon$ に現れるか。単に $\phi_\epsilon=J$ と置いた場合、HOLO9の何が失われるか説明せよ。

<!-- solution-start -->
**詳細解答。** 線形方程式なので $\delta B=B[\delta J]$ です。従ってcutoff面の場の変分は

$$
\delta\phi_\epsilon
=\epsilon^{\Delta_-}\delta J
+\epsilon^\Delta B[\delta J]
+o(\epsilon^\Delta)
$$

です。$z=\epsilon$ の場の値は源だけでなく非局所な応答を含みます。

$\phi_\epsilon=J$ とすると、主要項の係数 $\epsilon^{\Delta_-}$ を取り違えます。加えて $B[\delta J]$ の寄与を落とすので、反項が除くべき $\epsilon^{-2\nu}$ の発散次数や、有限な $2\nu B$ の係数を再現できなくなります。

有限cutoffのDirichlet値と境界極限の源は[HOLO8の境界選択](../HOLO8/index.md#def-holo8-quantization-choices)の段階から異なる対象です。
<!-- solution-end -->

<a id="ex-holo9-c1"></a>
### C1. バルク核から境界2点まで通して再構成する

- Level: C
- 問題: $d=3$、$L>0$、$m^2L^2=-2$、実数値 $J\in C_c^\infty(\mathbb R^3)$ とする。固定Euclid AdS・赤外正則性・標準選択を仮定し、次の全段階を途中式付きで実行せよ。
  1. $\nu,\Delta_\pm$ を求め、$K_\Delta$ の正規化係数と境界極限を求める。
  2. $B[J]$ の主値積分を求め、$x$ と $y$ を離した場合の応答核を示す。
  3. $z=\epsilon$ の裸作用と $\Delta_-/L$ の反項の発散・有限項を比較し、$S_{\mathrm{ren}}$ を求める。
  4. GKPW辞書から $x\ne y$ の連結2点関数を導き、運動量での非解析項を検算する。
  5. $x=y$ とLorentz時間への適用で未指定の事項をそれぞれ一つ挙げる。

<!-- solution-start -->
**詳細解答。**

**1. 指数・核・境界極限。** [HOLO8の質量指数](../HOLO8/index.md#prop-holo8-mass-dimension)から $\nu=\sqrt{9/4-2}=1/2$、$\Delta_-=1$、$\Delta=\Delta_+=2$。Gamma係数は $c_\Delta=\Gamma(2)/(\pi^{3/2}\Gamma(1/2))=1/\pi^2$ だから

$$
\phi_J(z,x)=\frac1{\pi^2}\int_{\mathbb R^3}
\frac{z^2J(y)}{(z^2+|x-y|^2)^2}d^3y.
$$

$y=x+zu$ にすると $z^{-1}\phi_J=\pi^{-2}\int (1+|u|^2)^{-2}J(x+zu)d^3u$。正規化 $\int(1+|u|^2)^{-2}d^3u=\pi^2$ と優収束から $z^{-1}\phi_J\to J$。

**2. 応答。** 上式から $zJ$ を引いて $z^{-2}$ で割ると

$$
B[J](x)=\frac1{\pi^2}\mathrm{PV}\!\int
\frac{J(y)-J(x)}{|x-y|^4}d^3y.
$$

滑らかな源の一次Taylor項は対称主値で消え、剰余の動径積分は $\int_0^1r^0dr$ なので有限。$x\ne y$ では $\delta B(x)/\delta J(y)=1/(\pi^2|x-y|^4)$。

**3. 境界作用。** [HOLO7の外向き法線密度](../HOLO7/index.md#def-holo7-cutoff-flux)は $-L^2\epsilon^{-2}$。$\phi_\epsilon=\epsilon J+\epsilon^2B+o(\epsilon^2)$、$\partial_z\phi_\epsilon=J+2\epsilon B+o(\epsilon)$ なので、積の有限項は $3JB$ です。

$$
S_{\mathrm{os},\epsilon}
=-\frac{L^2}{2}\int(\epsilon^{-1}J^2+3JB)d^3x+o(1).
$$

反項は $\Delta_-=1$ から

$$
S_{\mathrm{ct},\epsilon}
=\frac{L^2}{2}\int(\epsilon^{-1}J^2+2JB)d^3x+o(1).
$$

従って発散は相殺され、$S_{\mathrm{ren}}=-(L^2/2)\int JB$。主値核の対称性より $\delta S_{\mathrm{ren}}/\delta J=-L^2B$ です。

**4. 2点とFourier。** $W=-S_{\mathrm{ren}}$ を二回微分すると

$$
G(x,y)=\frac{L^2}{\pi^2|x-y|^4}\quad(x\ne y).
$$

$\Gamma(-1/2)=-2\sqrt\pi$ と $\Gamma(1/2)=\sqrt\pi$ を使った[Fourierの命題](#prop-holo9-momentum)では $G(k)=-L^2|k|$。位置空間の核は対角で分布的な延長を要するため、負号と分離点の正の係数は両立します。

**5. 限界。** $x=y$ では核 $r^{-4}$ が通常積分できず、局所反項の有限部分を含む接触項のschemeを指定する必要があります。Lorentzへ移るには時間順序かWightmanか、どの状態と $i\epsilon$ の境界値を使うかを別途指定する必要があります。Euclidの正則性だけで全ての実時間相関を確定したとは言えません。
<!-- solution-end -->

## 8. まとめと次講

- $K_\Delta$ は場の方程式と境界規格化の双方から導いた。源 $J$ に対する赤外正則解の速い係数 $B[J]$ が非局所な応答になる。
- $0<\nu<1$ では反項 $\Delta_-\phi_\epsilon^2/(2L)$ により $S_{\mathrm{ren}}=-\nu L^{d-1}\int JB$。発散除去後に源で微分する順序が重要である。
- GKPWを**仮定**すると、異なる点で $G(x,y)=2\nu L^{d-1}c_\Delta|x-y|^{-2\Delta}$ が得られる。接触項・係数の規格化・Fourierの分布的解釈は距離冪の導出と分ける。
- $i\epsilon$ の指定、共鳴端点、より一般の繰り込みは未解決のまま一般論へ飛ばさない。

**次講HOLO10「Witten接触図」**では、このbulk-to-boundary核を外線として組み合わせ、三次のバルク相互作用から境界3点相関関数の位置依存を求めます。
