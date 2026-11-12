# HOLO22 共変HRT面

[HOLO18の静的RT処方](../HOLO18/index.md#thm-holo18-interval-coefficient)では、共通の時刻断面で境界区間の両端を結ぶ最短曲線を選びました。[HOLO19の相同条件](../HOLO19/index.md#def-holo19-homology)は端点だけでは候補を決められないことを教えます。しかし境界状態や重力時空が時間変化する場合、どの「同時刻」断面で長さを最小化すればよいのでしょうか。そもそもLorentz時空には、選ばれた特別な時間断面がありません。

そこで、**空間方向だけの最小性**を、時空の二つの法線方向に対する**面積の停留性**に置き換えます。これが共変的なHubeny–Rangamani–Takayanagi（HRT）処方の入口です。ただし停留する面は複数存在し得ます。後半では、各時空断面で最小化してから断面間で最大化する **maximin** の考え方を、局所計算と条件付きの一般定理に分けて学びます。

本章は古典的な漸近AdSバルクを対象とし、Lorentz計量は時間方向1・空間方向$d$の $(-,+,\ldots,+)$、$\hbar=1$、$G_N>0$ とします。面積は同じ境界UV cutoffで正則化します。$O(G_N^{-1})$ の古典主項を扱い、$O(G_N^0)$ の量子補正はHOLO23へ送ります。

## 1. 時間断面を選ばずに何を極値化するか

境界の空間領域 $A$ は、境界のある空間的Cauchy断面上の領域です。その境界 $\partial A$ をバルクの奥で埋める余次元2の**空間的**曲面を考えます。「空間的」とは曲面に制限した計量 $h$ が正定値で、曲面上の長さ・面積が実数として定義できることです。バルクが$d+1$次元なら曲面は$d-1$次元です。

曲面の場所を動かす方向は、局所的に時間的方向と空間的方向の二つです。面積の一次変分を任意のコンパクト支持法線変位 $V$ に対して零にする条件を、平均曲率ベクトル $H^a=0$ と書きます。前章の[固定面の二方向の極値条件](../HOLO21/index.md#prop-holo21-fixed-surface)が、Euclid模型で現れたのと対応しますが、ここではLorentz符号で扱います。

<a id="def-holo22-hrt-surface"></a>

<!-- formal-statement-start -->
> **定義（古典HRT候補とHRT処方）**  
> 漸近AdSの時間向き付けられたLorentzバルク $(M,g)$ と、境界Cauchy断面上の領域 $A$ を固定する。$A$ と相同なバルクの空間的余次元2曲面 $\gamma$ で、境界端が $\partial\gamma=\partial A$（cutoffで正則化して読む）であり、両法線方向の面積一次変分が零、すなわち $H^a=0$ であるものを**古典HRT極値候補**とする。
>
> 同じ状態、境界条件、相同条件、cutoffを固定し、物理的に許容される候補から古典処方で指定される最小面積の極値面を $\gamma_A^{\rm HRT}$ と書く。その**古典主項の処方**は
>
$$
S_A^{(0)}=\frac{\operatorname{Area}(\gamma_A^{\rm HRT})}{4G_N}.
$$
>
> これは一般のLorentz重力・境界量子論について無条件に証明された等式ではない。極値面の存在、候補の選択、相同条件、重力の半古典近似を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo22-hrt-surface -->
**定義の直接確認（静的な場合）。** Poincaré $AdS_3$ の $t=0$ 断面上で、$x=\pm R$ を結ぶ半円 $x^2+z^2=R^2$ を取ります。時間反転対称な断面では時間方向の一次変分が零で、空間方向は[HOLO18の半円測地線](../HOLO18/index.md#prop-holo18-regulated-length)です。したがって両方向の変分が零です。半円と境界区間が囲む半円板は[相同条件](../HOLO19/index.md#def-holo19-homology)を満たします。単に「半円らしい」からではなく、アンカー・相同・空間的性質・二方向の停留性をそれぞれ確認しています。
<!-- definition-example-end -->

注意すべき点は、**時空全体で面積を最小にする**とは言っていないことです。Lorentz符号では時間方向の変形によって空間的曲線の長さが**減る**ことさえあります。静的RTの「ある空間断面上の最小」と、HRTの「時空内での停留」を混同してはいけません。

## 2. 二つのnull方向を使って極値条件を判定する

時間的・空間的な法線を使う代わりに、二つの未来向きnull法線 $k^a,l^a$ を使うこともできます。nullとは $g_{ab}k^ak^b=0$ という意味です。二方向を独立にし、$g(k,l)=-1$ に規格化します。曲面に沿った計量の逆 $h^{ab}$ を曲面接方向へ拡張し、$k$ 方向へ動かしたときの面積の局所的な対数変化率を **null膨張率** と呼びます。

<a id="def-holo22-null-expansion"></a>

<!-- formal-statement-start -->
> **定義（HRT面の二つのnull膨張率）**  
> 滑らかな空間的余次元2曲面 $\gamma$ と、その法線束上の独立なnull法線 $k,l$ を取り、$g(k,l)=-1$ とする。誘導計量 $h$ による接方向射影を用いて
>
$$
\theta_{(k)}=h^{ab}\nabla_a k_b,\qquad
\theta_{(l)}=h^{ab}\nabla_a l_b
$$
>
> を各null膨張率と呼ぶ。どちらも零であることは、面積一次変分がすべての法線方向に対して零であることと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo22-null-expansion -->
**定義の確認（拡大縮小と零条件）。** Minkowskiの $1+2$ 次元時空 $ds^2=-dt^2+dx^2+dy^2$ において、$t=0$ 上の半径 $r$ の円を取ります。未来向き法線を $k=(\partial_t+\partial_r)/\sqrt2$、$l=(\partial_t-\partial_r)/\sqrt2$ とすると $g(k,l)=-1$ です。円周は $2\pi r$ ですから、外向きnull方向の半径変化率は $1/\sqrt2$、内向きは $-1/\sqrt2$ となり、
>
$$
\theta_{(k)}=\frac{1}{\sqrt2\,r},\qquad
\theta_{(l)}=-\frac{1}{\sqrt2\,r}.
$$
>
> 従って両者は零ではなく、この円はHRT極値候補ではありません。「時間反転対称な断面に載る」だけでは極値条件を満たしません。
<!-- definition-example-end -->

<a id="prop-holo22-expansion-equivalence"></a>

<!-- formal-statement-start -->
> **命題（二方向の膨張率と平均曲率）**  
> 滑らかな空間的余次元2曲面の法線平面が独立なnull法線 $k,l$ で張られ、曲面の法線変分が自由に取れるとする。このとき面積がすべてのコンパクト支持法線変分に対して停留することと、$\theta_{(k)}=\theta_{(l)}=0$ は同値である。null法線を $k\mapsto e^f k$, $l\mapsto e^{-f}l$ と再規格化しても、両方が零という条件は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

法線の任意の変位は二つのnull方向に分解できます。各方向の面積一次変分の係数が膨張率なので、任意の変位で零になるためには両係数が零でなければなりません。

<!-- proof-start -->
### 証明

法線変位を $V^a=fk^a+ql^a$ と書きます。一次変分は、境界を固定したとき、

$$
\delta_V\operatorname{Area}(\gamma)
=\int_\gamma \sqrt h\,\bigl(f\theta_{(k)}+q\theta_{(l)}\bigr)
$$

です。これは面積密度のLie変化が接方向の計量変化のトレースの半分で、$\mathcal L_k\sqrt h=\sqrt h\,h^{ab}\nabla_a k_b$ となることから得られます。$q=0$ として $f$ を任意のコンパクト支持関数にすれば変分法の基本補題から $\theta_{(k)}=0$。$f=0$ として $q$ を自由に動かせば $\theta_{(l)}=0$。逆に両者が零なら積分はすべての $f,q$ で零です。

法線再規格化では $\nabla_a(e^f k_b)=e^f(\nabla_a k_b+(\partial_a f)k_b)$。$h^{ab}k_b=0$ なので $\theta_{(e^f k)}=e^f\theta_{(k)}$、同じく $\theta_{(e^{-f}l)}=e^{-f}\theta_{(l)}$。従って零条件は規格化によらず不変です。
<!-- proof-end -->

曲面が$d+1=3$次元バルクの曲線なら、平均曲率ベクトルの消失は測地線方程式と同じです。この同値を、次の時間差がある区間で具体的に確認します。

## 3. 異なる境界時刻の二端点をつなぐ$AdS_3$極値曲線

Poincaré $AdS_3$ の計量を

$$
ds^2=\frac{L^2}{z^2}(-dt^2+dx^2+dz^2),\qquad L>0,\ z>0
$$

とします。境界の二端点を $(t_1,x_1)$、$(t_2,x_2)$ として、$\Delta x=x_2-x_1>0$、$\Delta t=t_2-t_1$、$|\Delta t|<\Delta x$ を仮定します。最後の不等式により二端点は**空間的に離れ**、その二点を同一の境界空間的断面に載せることができます。

時間差を消すためのLorentz boostを導入します。$t_c=(t_1+t_2)/2$、$x_c=(x_1+x_2)/2$ とし、

$$
v=\frac{\Delta t}{\Delta x},\qquad
\Gamma=\frac1{\sqrt{1-v^2}},\qquad
D=\sqrt{(\Delta x)^2-(\Delta t)^2},\qquad R=\frac D2
$$

と置きます。$|v|<1$ なので$\Gamma$は実数で、$D>0$ です。座標変換は

$$
T=\Gamma\bigl((t-t_c)-v(x-x_c)\bigr),\qquad
X=\Gamma\bigl((x-x_c)-v(t-t_c)\bigr)
$$

です。実際に微分すると $-dT^2+dX^2=-dt^2+dx^2$ となるため、$z$ を変えないこのboostはバルクの等長変換です。二端点は $T=0,\ X=\pm R$ に移ります。

<a id="prop-holo22-boosted-geodesic"></a>

<!-- formal-statement-start -->
> **命題（時間差を持つ真空区間のHRT曲線）**  
> 上記のPoincaré $AdS_3$ 真空で $|\Delta t|<\Delta x$、$0<\epsilon<R$ とする。単一区間の許容候補が通常の半円と等長な枝に限られ、同一 $z=\epsilon$ cutoffと半古典HRT処方を採用すると、二端点を結ぶ空間的極値曲線は
>
$$
T=0,\qquad X^2+z^2=R^2
$$
>
> で与えられ、そのcutoff長は
>
$$
\mathcal L_\epsilon
=2L\log\frac{R+\sqrt{R^2-\epsilon^2}}{\epsilon}
=2L\log\frac D\epsilon+O\!\left(L\frac{\epsilon^2}{D^2}\right).
$$
>
> 従って古典エントロピーの普遍対数主項は、$c_{\rm BH}=3L/(2G_3)$ とおけば
>
$$
S_A^{(0)}=\frac{c_{\rm BH}}3\log\frac{\sqrt{(\Delta x)^2-(\Delta t)^2}}{\epsilon}
+O\!\left(c_{\rm BH}\frac{\epsilon^2}{D^2}\right).
$$
>
> この単一真空区間の計算だけで時間依存する一般の幾何のHRT面を定めたことにはならない。
<!-- formal-statement-end -->

### 証明の見取り図

boostが計量を保つので、$T=0$ では[静的AdS3半円長](../HOLO18/index.md#prop-holo18-regulated-length)を使えます。ただし式へそのまま代入する前に、半円の半径が座標長 $\Delta x/2$ ではなく、不変長 $D/2$ であることを確かめます。

<!-- proof-start -->
### 証明

端点差に対して $T_2-T_1=\Gamma(\Delta t-v\Delta x)=0$ です。もう一方は

$$
X_2-X_1=\Gamma(\Delta x-v\Delta t)
=\Gamma\Delta x(1-v^2)
=\frac{\Delta x}{\Gamma}=D,
$$

なので中点を原点に取った $X$ の端点は $\pm R$。計量は $ds^2=L^2z^{-2}(-dT^2+dX^2+dz^2)$ だから、[HOLO18の静的測地線](../HOLO18/index.md#prop-holo18-regulated-length)は $T=0$、$X^2+z^2=R^2$。時間一定の断面が時間反転対称なので時間方向への一次変分も零となり、曲線はバルク時空の測地線、従ってHRT極値候補です。半円板の領域をboostで戻せば相同条件も保たれます。

$X=R\cos\vartheta$、$z=R\sin\vartheta$、$\vartheta_0=\arcsin(\epsilon/R)$ と置くと、線素は $ds=L\,d\vartheta/\sin\vartheta$ です。cutoffで $\vartheta_0\le\vartheta\le\pi-\vartheta_0$ を積分して

$$
\mathcal L_\epsilon
=L\int_{\vartheta_0}^{\pi-\vartheta_0}\frac{d\vartheta}{\sin\vartheta}
=2L\log\cot\frac{\vartheta_0}{2}.
$$

半角公式と $\sin\vartheta_0=\epsilon/R$ から

$$
\cot\frac{\vartheta_0}{2}
=\frac{1+\cos\vartheta_0}{\sin\vartheta_0}
=\frac{R+\sqrt{R^2-\epsilon^2}}{\epsilon}.
$$

$\sqrt{R^2-\epsilon^2}=R\bigl(1-\epsilon^2/(2R^2)+O(\epsilon^4/R^4)\bigr)$ だから、対数は $\log(2R/\epsilon)+O(\epsilon^2/R^2)$。$2R=D$ を使えば主張の長さ式です。最後に[HOLO13のBrown–Henneaux関係](../HOLO13/index.md#prop-holo13-brown-henneaux)を $S_A^{(0)}=\mathcal L_\epsilon/(4G_3)$ に代入すると $L/(2G_3)=c_{\rm BH}/3$ です。

cutoffはboostで変えない $z=\epsilon$ を固定しました。有限cutoffの端点は $X=\pm\sqrt{R^2-\epsilon^2}$ で、理想境界の $\pm R$ とは $O(\epsilon^2/R)$ だけずれます。これは有限cutoffで端点を厳密に固定する別の処方と混同しないための注意です。
<!-- proof-end -->

元の座標でこの曲線を見たい場合は、$T=0$ の式を解いて

$$
t-t_c=v(x-x_c),\qquad
z^2+\frac{(x-x_c)^2}{\Gamma^2}=R^2.
$$

と書けます。**$t=\text{一定}$ の半円ではありません**。たとえば $\Delta x=5$、$\Delta t=3$ なら $v=3/5$、$\Gamma=5/4$、$D=4$、$R=2$ です。曲線の時刻は左端から右端へ連続的に変わりますが、boostした座標では一つの空間的断面上の半円になります。

この計算は「時間が異なる端点」を扱いましたが、背景自体は静的な真空AdSです。**崩壊・摂動・時間依存する状態に対する一般HRT解の証明ではありません。** 真の時間依存時空ではboostで時間依存を除去できず、極値面の境界値問題を解く必要があります。

## 4. 極値が時間方向では最大、空間方向では最小になる局所計算

静的な $T=0$ 半円で $X^2+z_0(X)^2=R^2$、$z_0(X)=\sqrt{R^2-X^2}$ とします。cutoffより内側の固定区間で、両端を動かさない滑らかな関数 $f(X)$ を取り、$T(X)=\eta f(X)$ とだけ変形します。$\eta$ を十分小さくすれば曲線は空間的なままです。

<a id="prop-holo22-local-saddle"></a>

<!-- formal-statement-start -->
> **命題（半円曲線の時間法線に沿う局所最大性）**  
> $R>0$ とし、$f$ を $(-R,R)$ 内にコンパクト支持を持つ滑らかな非定数関数とする。$X^2+z_0^2=R^2$ を固定して $T=\eta f(X)$ と変形した曲線の長さは、$\eta\to0$ において
>
$$
\mathcal L(\eta)=\mathcal L(0)
-\frac{L\eta^2}{2R}\int_{-R}^{R}(f'(X))^2\,dX
+O(\eta^4).
$$
>
> よって一次変分は零、非自明な時間方向の二次変分は負である。一方、$T=0$ 内での半円は空間的な最短測地線であり、HRT面の停留性を時空全体での最小性と呼んではならない。
<!-- formal-statement-end -->

### 証明の見取り図

Lorentz符号の負項 $-dT^2$ が長さに入ることを、実際の曲線の誘導計量で確認します。正の空間変位と違い、時間変位は二次の係数を負にします。

<!-- proof-start -->
### 証明

$z_0'=-X/z_0$ であるから $1+(z_0')^2=R^2/z_0^2$ です。変形後の長さは

$$
\mathcal L(\eta)
=L\int_{-R}^{R}\frac1{z_0}
\sqrt{1+(z_0')^2-\eta^2(f')^2}\,dX.
$$

$f$ の支持は端から離れており、根号内は小さな $\eta$ で一様に正です。$\sqrt{a^2-u}=a-u/(2a)+O(u^2)$ を $a=R/z_0$、$u=\eta^2(f')^2$ に適用すると、

$$
\frac L{z_0}\sqrt{\frac{R^2}{z_0^2}-\eta^2(f')^2}
=\frac{LR}{z_0^2}-\frac{L\eta^2}{2R}(f')^2+O(\eta^4).
$$

支持の外では差が零なので積分した剰余も $O(\eta^4)$ です。$f$ が非定数かつコンパクト支持なら $\int(f')^2dX>0$。従って時間方向で二次変分は負です。

他方、$T=0$ 内で空間曲線 $z=z(X)$ の長さ汎関数は $L\int \sqrt{1+(z')^2}\,z^{-1}dX$。Euler–Lagrange式の両辺を半円へ代入すると

$$
\frac{\partial F}{\partial z}=-\frac R{z_0^3},\qquad
\frac d{dX}\frac{\partial F}{\partial z'}
=\frac d{dX}\left(-\frac X{Rz_0}\right)
=-\frac R{z_0^3}
$$

と一致します。$T=0$ 断面の最短性は[既習の静的半円測地線](../HOLO18/index.md#prop-holo18-regulated-length)の結果を使っています。従って局所的には空間方向で最小、時間方向で最大という鞍点のふるまいです。
<!-- proof-end -->

## 5. maximinでは何を最大化し、何を最小化するか

静的でない時空でHRT極値候補が複数現れた場合、単に一次変分が零というだけでは選択できません。そこで空間的なバルクCauchy断面 $\Sigma$ を一つ固定し、その中で許容される曲面の面積を**最小化**します。次に、境界領域 $A$ を含む同じ境界Cauchy断面に接続する $\Sigma$ を動かし、そこで得た最小面積を**最大化**します。順序を逆にしてはいけません。

<a id="def-holo22-maximin"></a>

<!-- formal-statement-start -->
> **定義（古典maximin構成）**  
> 境界領域 $A$ を含む境界Cauchy断面を固定する。その断面に接続する許容バルク空間的Cauchy断面 $\Sigma$ ごとに、$\partial A$ にアンカーし、$A$ と$\Sigma$上で相同な余次元2曲面のうち、面積最小のものを $m(A,\Sigma)$ とする。これらが存在するとき、$\operatorname{Area}(m(A,\Sigma))$ を $\Sigma$ について最大化して得る候補を **maximin面** と呼ぶ。最大が達成されない場合はこの定義から存在を結論してはならない。
>
$$
\operatorname{Area}(M_A)
=\max_{\Sigma}\left[\min_{\gamma\subset\Sigma,\ \gamma\sim A}
\operatorname{Area}(\gamma)\right].
$$
>
> ここで $\gamma\sim A$ は固定したアンカー・相同条件を表し、右辺の $\max$ はその値が達成される状況を仮定している。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo22-maximin -->
**定義の確認（順序で答えが変わる例）。** 数学的な有限候補模型として、断面 $\Sigma_1,\Sigma_2$ の二候補の面積表を考えます。$\Sigma_1$ で $(4,7)$、$\Sigma_2$ で $(5,6)$ なら各断面内の最小は $4,5$、その最大は $5$ です。一方、各候補列を先に最大化すると $5,7$、最小は $5$ で、この例では偶然一致します。しかし $\Sigma_1$ で $(4,100)$、$\Sigma_2$ で $(100,4)$ とすればmaximinは $4$、逆順のminimaxは $100$ です。**順序は本質的**です。この表は幾何学的なHRT面の存在証明ではなく、量化順序の直接例です。
<!-- definition-example-end -->

実際には時空の端・特異点・断面の極限で最大が失われたり、最小面が不連続に飛び移ったりします。そこでmaximinの「存在」と「極値面との一致」を、滑らかさ・安定性・因果構造・エネルギー条件などを点検せずに使うことはできません。

### null曲率条件とエネルギー条件

将来向きnullベクトル $k$ に対して $R_{ab}k^ak^b\ge0$ を要求する**null曲率条件（NCC）**は、null測地線束の収束を制御する条件です。通常のEinstein方程式

$$
R_{ab}-\frac12Rg_{ab}+\Lambda g_{ab}=8\pi G_N T_{ab}
$$

の下で、$g_{ab}k^ak^b=0$ を掛け合わせると

$$
R_{ab}k^ak^b=8\pi G_N T_{ab}k^ak^b.
$$

したがってEinstein方程式が成立する古典模型では、物質の **nullエネルギー条件（NEC）** $T_{ab}k^ak^b\ge0$ はNCCを与えます。$\Lambda$ の値はこの縮約から消えます。Einstein方程式や適用条件を外してNCCとNECを同一視してはいけません。

<a id="thm-holo22-maximin-conditional"></a>

<!-- formal-statement-start -->
> **定理（古典maximinとHRTの一致：既存の結果を条件付きで使用）**  
> 滑らかな古典漸近AdS Lorentz時空で、適切なAdS型の因果的双曲性、null曲率条件、必要なgenericityまたは退化の場合の補足条件、固定された境界アンカー・相同条件を仮定する。さらに関連する最小面・安定なmaximin面が存在し、特異点や不適切な非コンパクト端からの障害が排除される場合、安定なmaximin面は許容されるHRT極値面と一致し、適切な極値候補中の面積選択を実現する。
>
> これはWallによるmaximinの一般結果を必要な前提を限定して引用したもので、本章の有限次元計算・局所変分だけから証明した定理ではない。
<!-- formal-statement-end -->

### どこまで確かめ、どこから引用するか

本講義内で示したのは、半円のboostによる極値候補、正則化長、時間法線変分の負の二次項、およびEinstein方程式下でのNECとNCCの関係です。**一般のmaximin面の存在、null面上への射影の面積比較、安定性からの極値性の証明は本講義では導いていません。** これらを引用する際の対象と成立条件は [Wall, *Maximin Surfaces*](https://arxiv.org/abs/1211.3494) に戻ってください。

具体的な例として純 $AdS_3$ は $R_{ab}=-2L^{-2}g_{ab}$ なので、nullベクトルに対して $R_{ab}k^ak^b=0$、NCCを等号で満たします。ただし「NCCが成立する」だけで、すべての時空で安定なmaximin面が存在するとの結論にはなりません。退化や端の振る舞いを点検する必要があります。

| 問い | 静的RT | 共変HRT / maximin |
| --- | --- | --- |
| 変分する場所 | 固定した時間対称な空間断面内 | Lorentz時空の二つの法線方向 |
| 局所条件 | 断面内で面積停留・最小 | $H=0$、または二つのnull膨張率が零 |
| 大域選択 | 同じ断面上の相同な候補の最小 | 極値候補の選択。条件付きで安定maximinと一致 |
| 代表模型 | $t=0$ のAdS半円 | 時間差のある端点をboostしたAdS半円 |
| 注意 | 任意の時間断面へ流用しない | 存在・因果・NCC・安定性・cutoffを省略しない |

## 6. 何が壊れると処方を流用できないか

**時間的に離れた二端点。** $\Delta x=3$、$\Delta t=5$ なら $D^2=9-25=-16$ で、$D$ は正の実数になりません。二端点を一つの空間的境界区間の端とする設定が破綻しているので、[boost半円の命題](#prop-holo22-boosted-geodesic)に単に虚数を代入してエントロピーと呼んではいけません。

**極値性と最小性の混同。** [時間方向の変分命題](#prop-holo22-local-saddle)では、停留する半円の長さが時間変形で小さくなります。従って「時空内で全方向へ長さが最小」という仮定を足した瞬間、この具体例と矛盾します。

**nullエネルギー条件の欠落。** NCCが成り立たなければ、null測地線の収束を通じて面積を比較する一般maximinの証明機構をそのまま援用できません。NCCだけ満たしても、断面の存在・安定性・境界条件は独立に必要です。

**量子補正の欠落。** [HOLO21の古典レプリカ面積項](../HOLO21/index.md#prop-holo21-area-term)だけでは$O(G_N^0)$のバルクエントロピーは得られません。次のHOLO23でFLMの補正を扱い、さらにHOLO24で一般化エントロピーの量子極値曲面へ進みます。古典HRTの面を、そのまま全量子の極値面と断言しません。

## 7. 演習と詳細解答

### Level A：定義と計量を確かめる

<a id="ex-holo22-a01"></a>
**A1. 二端点とboostの範囲。** $\Delta x=13$、$\Delta t=5$、$L>0$ とする。$v,\Gamma,D,R$ を求め、二端点を同じ $T$ に置けることを確認せよ。
- Level: A
<!-- solution-start -->
**詳細解答。** $v=5/13$、$1-v^2=1-25/169=144/169$、従って $\Gamma=13/12$。不変長は $D=\sqrt{169-25}=\sqrt{144}=12$、$R=D/2=6$。$T_2-T_1=\Gamma(\Delta t-v\Delta x)=(13/12)(5-5)=0$ です。$|\Delta t|<\Delta x$ が成立するのでboostは実数で空間的端点条件を満たします。
<!-- solution-end -->

<a id="ex-holo22-a02"></a>
**A2. null曲率の縮約。** $R_{ab}=-2L^{-2}g_{ab}$、$g(k,k)=0$ を持つ $AdS_3$ で $R_{ab}k^ak^b$ を求めよ。これはNCCを満たすか。
- Level: A
<!-- solution-start -->
**詳細解答。** $R_{ab}k^ak^b=(-2/L^2)g_{ab}k^ak^b=(-2/L^2)\cdot0=0$。NCCは $R_{ab}k^ak^b\ge0$ なので等号で成立します。厳密に正であることは求められていません。NCCだけからmaximinの存在は結論できません。
<!-- solution-end -->

<a id="ex-holo22-a03"></a>
**A3. null膨張率。** Minkowski $ds^2=-dt^2+dr^2+r^2d\phi^2$ の $t=0$、$r=2$ の円に対し、$k=(\partial_t+\partial_r)/\sqrt2$、$l=(\partial_t-\partial_r)/\sqrt2$ とする。規格化 $g(k,l)$ と両膨張率を求め、極値性を判定せよ。
- Level: A
<!-- solution-start -->
**詳細解答。** $g(k,l)=\frac12(g(\partial_t,\partial_t)-g(\partial_r,\partial_r))=(-1-1)/2=-1$。円周は $2\pi r$。null方向の半径変化率は $\pm1/\sqrt2$ なので[膨張率の定義](#def-holo22-null-expansion)から $\theta_{(k)}=1/(\sqrt2r)=1/(2\sqrt2)$、$\theta_{(l)}=-1/(2\sqrt2)$。両方は零でなく、[二方向の同値命題](#prop-holo22-expansion-equivalence)より極値候補ではありません。
<!-- solution-end -->

<a id="ex-holo22-a04"></a>
**A4. cutoff長の数値例。** $L=2$、$R=5$、$\epsilon=3$ で半円の正確なcutoff長を求めよ。さらに$\epsilon/R$が小さくないので対数主項だけで代用してよいか述べよ。
- Level: A
<!-- solution-start -->
**詳細解答。** $\sqrt{R^2-\epsilon^2}=\sqrt{25-9}=4$。[boost半円の命題](#prop-holo22-boosted-geodesic)の正確式から $\mathcal L_\epsilon=2L\log((R+4)/3)=4\log3$。対数主項だけなら $2L\log(2R/\epsilon)=4\log(10/3)$ で異なります。$\epsilon/R=3/5$ は十分小さいとは言えず、誤差項を無視して正確な値と呼んではいけません。
<!-- solution-end -->

<a id="ex-holo22-a05"></a>
**A5. maximinの順序。** 二断面の候補面積が $\Sigma_1:(2,9)$、$\Sigma_2:(6,4)$ である。各断面での最小値、maximin値、列ごとに最大化した後のminimax値を求めよ。
- Level: A
<!-- solution-start -->
**詳細解答。** $\Sigma_1$ の最小は $\min(2,9)=2$、$\Sigma_2$ の最小は $\min(6,4)=4$。その最大は $\max(2,4)=4$。逆順は列ごとに $\max(2,6)=6$、$\max(9,4)=9$ を求め、その最小は $\min(6,9)=6$。したがって $4\ne6$。この表は[定義](#def-holo22-maximin)の演算順を確認する代数模型です。
<!-- solution-end -->

### Level B：変分と選択条件を導く

<a id="ex-holo22-b01"></a>
**B1. Lorentz boostした曲線を元の座標に戻す。** $\Delta x=10$、$\Delta t=6$、$t_c=x_c=0$ とする。$T=0$、$X^2+z^2=R^2$ を $(t,x,z)$ で表し、曲線が $t=\text{一定}$ でないことと、$z>0$ で空間的であることを検査せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** $v=6/10=3/5$、$D=\sqrt{100-36}=8$、$R=4$、$\Gamma=5/4$。$T=\Gamma(t-vx)=0$ より $t=3x/5$。$X=\Gamma(x-vt)=\Gamma x(1-v^2)=x/\Gamma=4x/5$。よって

$$
z^2+\frac{16}{25}x^2=16,\qquad t=\frac35x.
$$

半円のパラメータ $X=4\cos\vartheta,z=4\sin\vartheta$ を使うと

$$
-dt^2+dx^2+dz^2=-dT^2+dX^2+dz^2
=16\,d\vartheta^2>0
$$

です。$0<\vartheta<\pi$ で誘導計量は正、したがって空間的です。元の座標で $t$ は $x$ に比例して変わり、一定時刻断面には載りません。
<!-- solution-end -->

<a id="ex-holo22-b02"></a>
**B2. 時間変分の符号と停留性。** 半円 $z_0(X)=\sqrt{R^2-X^2}$ を固定し、$T=\eta f(X)$ とする。$f$ は端点近傍で0とする。長さの$\eta$一次項、二次項を計算し、時空最小の誤用を指摘せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** $1+(z_0')^2=R^2/z_0^2$ なので、[局所変分命題](#prop-holo22-local-saddle)の出発式は

$$
\mathcal L(\eta)=L\int \frac1{z_0}
\sqrt{\frac{R^2}{z_0^2}-\eta^2(f')^2}\,dX.
$$

平方根の展開で一次項はなく、二次係数は $-L(2R)^{-1}\int(f')^2dX$。非定数 $f$ ならこの積分は正で、$\mathcal L'(0)=0$、$\mathcal L''(0)=-(L/R)\int(f')^2dX<0$。時間方向へ動かすと長さは減るため、停留面を時空内の大域最小とみなす論法が破綻します。
<!-- solution-end -->

<a id="ex-holo22-b03"></a>
**B3. NECとNCCの接続を監査する。** $d+1$ 次元のEinstein方程式が成り立つとし、任意のnull $k$ に対して$T_{ab}k^ak^b\ge0$とする。NCCを導き、なぜこの計算だけでは安定maximinの存在を言えないか説明せよ。
- Level: B
<!-- solution-start -->
**詳細解答。** Einstein方程式に $k^ak^b$ を掛けると

$$
R_{ab}k^ak^b-\frac12 R\,g_{ab}k^ak^b
+\Lambda g_{ab}k^ak^b
=8\pi G_N T_{ab}k^ak^b.
$$

$g(k,k)=0$ より中央二項はともに0。$G_N>0$ とNECから $R_{ab}k^ak^b=8\pi G_N T_{ab}k^ak^b\ge0$。ただしNCCはnull方向の曲率不等式で、Cauchy断面の集合のコンパクト性や最小面の存在、安定性を保証する主張ではありません。[条件付きmaximin定理](#thm-holo22-maximin-conditional)には追加の幾何学的条件が要ります。
<!-- solution-end -->

<a id="ex-holo22-b04"></a>
**B4. null法線の再規格化。** $k\mapsto e^f k$、$l\mapsto e^{-f}l$ とする。$g(k,l)$ が保たれることと、膨張率の零条件が不変であることを定義式から導け。
- Level: B
<!-- solution-start -->
**詳細解答。** 双線形性から $g(e^f k,e^{-f}l)=e^fe^{-f}g(k,l)=-1$。一方

$$
h^{ab}\nabla_a(e^fk_b)
=e^f h^{ab}\nabla_a k_b+e^f h^{ab}(\partial_af)k_b
=e^f\theta_{(k)}
$$

です。第二項が消えるのは $k$ が法線で $h^{ab}k_b=0$ だからです。同じ計算で $\theta_{(e^{-f}l)}=e^{-f}\theta_{(l)}$。係数は常に零ではないため、両膨張率が零という条件は規格化に依存しません。
<!-- solution-end -->

### Level C：座標・変分・仮定を統合する

<a id="ex-holo22-c01"></a>
**C1. 傾いた境界区間のHRT処方と適用限界。** Poincaré $AdS_3$ 真空で、二端点の座標差が $\Delta x=10$、$\Delta t=6$、共通cutoff $0<\epsilon\ll4$、$L,G_3>0$ とする。

1. 二端点が一つの空間的境界断面に載ることを判定し、boost後の半円を構成せよ。
2. 面の極値性と相同条件を確認し、長さの正確式と対数主項を求めよ。
3. $\delta T=\eta f(X)$ の局所変分の符号を求め、空間的な最小性と両立する理由を述べよ。
4. $c_{\rm BH}$ を用いたエントロピー主項と、一般時空へmaximinを使う際の少なくとも三つの追加条件・留保を述べよ。
- Level: C
<!-- solution-start -->
**詳細解答。**

**（1）** $D^2=(\Delta x)^2-(\Delta t)^2=100-36=64>0$ なので空間的です。$v=3/5$、$\Gamma=5/4$、$D=8$、$R=4$。boostした端点差は $T_2-T_1=\Gamma(6-(3/5)10)=0$、$X_2-X_1=\Gamma(10-(3/5)6)=(5/4)(32/5)=8$。従って中点を原点に取って $T=0$、$X^2+z^2=16$ です。

**（2）** boostは等長変換で、[HOLO18の静的半円](../HOLO18/index.md#prop-holo18-regulated-length)は空間的測地線。時間反転対称な $T=0$ 断面上では時間法線の一次変分も零です。半円板と境界区間で挟まれた領域の境界は、その区間と半円に一致するので[HOLO19の相同条件](../HOLO19/index.md#def-holo19-homology)を満たします。$R=4$ を[本章の長さ命題](#prop-holo22-boosted-geodesic)へ代入すると

$$
\mathcal L_\epsilon
=2L\log\frac{4+\sqrt{16-\epsilon^2}}{\epsilon}
=2L\log\frac8\epsilon+O(L\epsilon^2/64).
$$

**（3）** [局所変分命題](#prop-holo22-local-saddle)より

$$
\mathcal L(\eta)-\mathcal L(0)
=-\frac{L\eta^2}{8}\int_{-4}^{4}(f')^2\,dX+O(\eta^4).
$$

非定数の $f$ で負です。空間方向の最短性は $T=0$ 断面内の比較であり、時間方向を含めた時空最小ではありません。両方向の一次変分が零というHRT極値性とは矛盾しません。

**（4）** [Brown–Henneaux関係](../HOLO13/index.md#prop-holo13-brown-henneaux)を使い、$c_{\rm BH}=3L/(2G_3)$ として

$$
S_A^{(0)}=\frac{\mathcal L_\epsilon}{4G_3}
=\frac{c_{\rm BH}}3\log\frac8\epsilon
+O(c_{\rm BH}\epsilon^2/64).
$$

一般時空でのmaximinへの移行には、例えば（i）AdS型の適切な因果的双曲性と許容Cauchy断面、（ii）NCCと必要な退化の扱い、（iii）minとmaxを達成する面の存在・安定性、（iv）境界アンカーと相同条件、（v）特異点・非コンパクト端・cutoffの制御が必要です。これらを満たす一般定理は[条件付きmaximin定理](#thm-holo22-maximin-conditional)として引用しており、この例だけから導いてはいません。
<!-- solution-end -->

## 8. 次講へ

本章ではHRTの共変的な**二方向の極値条件**を定義し、$AdS_3$ の傾いた区間についてboost、曲線、cutoff長、変分の符号を自力で計算しました。さらにmaximinの選択順序と、一般定理を使える条件を切り分けました。HOLO23では古典面の上で量子場のエントロピーを評価するFLM補正へ進み、HOLO24で面の位置そのものを一般化エントロピーに対して変分します。

参考：Hubeny–Rangamani–Takayanagi, [*A Covariant Holographic Entanglement Entropy Proposal*](https://arxiv.org/abs/0705.0016) (2007)；Wall, [*Maximin Surfaces, and the Strong Subadditivity of the Covariant Holographic Entanglement Entropy*](https://arxiv.org/abs/1211.3494) (2014)。これらは条件付きの物理的処方と幾何学的定理を含む原論文であり、AdS/CFT一般の厳密な証明ではありません。
