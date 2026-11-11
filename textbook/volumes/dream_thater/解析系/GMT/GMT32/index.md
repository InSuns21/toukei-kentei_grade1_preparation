# GMT32 $\delta$-tube・方向分離・次元

<!-- definition-example-audit: strict -->

## 1. 測度零の線分集合を有限の太い管へ戻す

[GMT31のBesicovitch集合](../GMT31/index.md#def-gmt31-besicovitch)は、すべての方向の単位線分を含むのに、平面Lebesgue測度を零にできました（[存在定理](../GMT31/index.md#thm-gmt31-null-existence)）。ところが線分そのものの面積は零です。有限の線分を数えても、その重なり具合は測れません。

そこで線分の周囲に厚さ $\delta>0$ を与えます。各線分を**tube（管）**へ太らせ、方向を $\delta$ 以上離して有限個だけ選びます。「管の体積の総和」と「合併体積」は違います。この差を数値化する重複度が、次講の交差評価への入口です。

本講では $d\ge2$ を固定します。$|\cdot|$ はEuclidノルム、$\mathcal L^d$ は $\mathbb R^d$ のLebesgue測度、$\omega_d=\mathcal L^d(B(0,1))$ です。$\delta\downarrow0$ は正の $\delta$ を零へ近づける極限です。正の量 $A_\delta,B_\delta$ に対し $A_\delta\asymp_d B_\delta$ は、$\delta$ に依存しない正の定数 $c_d,C_d$ が存在して $c_dB_\delta\le A_\delta\le C_dB_\delta$ となる意味です。

## 2. 線分を太らせた $\delta$-tube と重複度

始点 $a\in\mathbb R^d$、単位方向 $v\in S^{d-1}=\{v:|v|=1\}$ の線分 $L(a,v)=\{a+tv:0\le t\le1\}$ を考えます。点 $x$ と集合 $E$ の距離は $\operatorname{dist}(x,E)=\inf_{y\in E}|x-y|$ です。$\delta$-近傍は $E_\delta=\{x:\operatorname{dist}(x,E)<\delta\}$ とします。端の半球も含む「長さ1の線分から距離 $\delta$ 未満の開いた管」を使います。

<a id="def-gmt32-tube"></a>

<!-- formal-statement-start -->
> **定義（$\delta$-tubeと重複度）**  
> $d\ge2$、$0<\delta<1$、$a\in\mathbb R^d$、$v\in S^{d-1}$ とする。長さ1・半径 $\delta$ のtubeを

$$
T_\delta(a,v)=\{x\in\mathbb R^d:\operatorname{dist}(x,L(a,v))<\delta\}
$$

> と定める。有限個のtube $T_1,\ldots,T_M$ に対し、重複度関数と合併を

$$
m_\delta(x)=\sum_{j=1}^M\mathbf1_{T_j}(x),
\qquad U_\delta=\bigcup_{j=1}^M T_j
$$

> と定める。$m_\delta(x)$ は点 $x$ を覆うtubeの本数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt32-tube -->
### 直接確認：水平tubeと交差の数え方

$d=2$、$a=(0,0)$、$v=(1,0)$ とすると、$0<x_1<1$ では $|x_2|<\delta$ がtube内部の条件です。$x_1<0$ では $x_1^2+x_2^2<\delta^2$、$x_1>1$ では $(x_1-1)^2+x_2^2<\delta^2$ となり、中央の長方形と両端の半円が得られます。この形が距離による元の定義から生じる理由は、線分上への最近点が中央では垂線の足、左右では端点になるためです。

$T_1=T_2$ として同じ管を二度数えれば、管内で $m_\delta=2$、外では $m_\delta=0$ です。一方、二管が互いに交わらなければ各管内で $m_\delta=1$ です。**二本あることは合併体積が二倍になることを意味しません**。
<!-- definition-example-end -->

tube体積は正確に計算できます。直交座標を $v$ 方向とその直交補空間に分けると、長さ1の円柱に、両端で合計一個分の $d$ 次元球が付いています。

<a id="prop-gmt32-tube-volume"></a>

<!-- formal-statement-start -->
> **命題（tube体積と重複度の積分）**  
> $d\ge2$、$0<\delta<1$ とする。任意の $a\in\mathbb R^d$ と $v\in S^{d-1}$ に対し

$$
\mathcal L^d(T_\delta(a,v))
=\omega_{d-1}\delta^{d-1}+\omega_d\delta^d.
$$

> また、任意の有限個のtube $T_1,\ldots,T_M$ と重複度 $m_\delta$ に対し

$$
\int_{\mathbb R^d}m_\delta\,dx
=\sum_{j=1}^M|T_j|,
\qquad
\int_{\mathbb R^d}m_\delta^2\,dx
=\sum_{i,j=1}^M|T_i\cap T_j|.
$$

> 特に次の合併体積の下界が成り立つ。

$$
|U_\delta|\ge
\frac{\left(\sum_{j=1}^M|T_j|\right)^2}
{\sum_{i,j=1}^M|T_i\cap T_j|}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

体積は線分に平行な方向で断面積分します。重複度の二乗を展開すると、対角項は各管の体積、非対角項は交差体積です。最後は $m_\delta$ が合併の外で零であることからCauchy--Schwarz不等式を使います。

<!-- proof-start -->
### 証明

平行移動・直交変換で $a=0$、$v=e_1$ としてよいです。$x=(t,y)$、$t\in\mathbb R$、$y\in\mathbb R^{d-1}$ と分けると、$0<t<1$ では $|y|<\delta$、$t<0$ では $t^2+|y|^2<\delta^2$、$t>1$ では $(t-1)^2+|y|^2<\delta^2$ が距離条件です。中央の積の体積は $1\cdot\omega_{d-1}\delta^{d-1}$、両端の半球を合わせると $\omega_d\delta^d$ です。断面の重複は境界のみなので足せます。

有限和なので積分と和を交換できます。また $\mathbf1_{T_i}\mathbf1_{T_j}=\mathbf1_{T_i\cap T_j}$ です。従って

$$
\int m_\delta^2\,dx
=\int\sum_{i=1}^M\sum_{j=1}^M
\mathbf1_{T_i}\mathbf1_{T_j}\,dx
=\sum_{i,j=1}^M|T_i\cap T_j|.
$$

$m_\delta=\mathbf1_{U_\delta}m_\delta$ とCauchy--Schwarzから

$$
\left(\int m_\delta\,dx\right)^2
\le\left(\int\mathbf1_{U_\delta}^2\,dx\right)
\left(\int m_\delta^2\,dx\right)
=|U_\delta|\int m_\delta^2\,dx.
$$

各管は正の体積を持つため、$M\ge1$ のとき分母は正です。$M=0$ なら体積の不等式は $0\ge0$ と別に読みます。$\square$
<!-- proof-end -->

**例：二本の管。** 同じ管を二度選ぶと $\int m_\delta=2|T|$、$\int m_\delta^2=4|T|$ で、下界は $|U|=|T|$ と一致します。互いに交わらない同体積の二管では $\int m_\delta^2=2|T|$ で下界は $2|T|$ です。重なりを数える二乗積分がなぜ必要か、両極端が示しています。

## 3. 方向を $\delta$ だけ離すと何本選べるか

方向は球面 $S^{d-1}$ の点で表します。二方向の距離としてEuclidの弦長 $|v-w|$ を使い、互いに近すぎる向きを一緒に数えることを防ぎます。無向線分で $v$ と $-v$ が同じ向きを表しても、二重に数えることによる定数倍は後のべき指数を変えません。

<a id="def-gmt32-separated"></a>

<!-- formal-statement-start -->
> **定義（$\delta$-分離方向集合）**  
> $d\ge2$、$\delta>0$ とする。有限集合 $V_\delta\subset S^{d-1}$ が $\delta$-分離であるとは、異なる $v,w\in V_\delta$ のすべてについて $|v-w|\ge\delta$ が成り立つことをいう。これ以上方向を追加して $\delta$-分離を保てない集合を極大 $\delta$-分離集合という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt32-separated -->
### 直接確認：平面の等間隔方向

$d=2$ で $v_k=(\cos(2\pi k/M),\sin(2\pi k/M))$、$k=0,\ldots,M-1$ とします。隣り合う弦長は $2\sin(\pi/M)$ で、最短の異なる二点間距離も同じです。従って $\delta\le2\sin(\pi/M)$ なら $\delta$-分離です。$M\asymp\delta^{-1}$ と取れることが具体的に見えます。

単に $M$ が多いだけで極大とは限りません。極大性を確かめるには、球面の任意の新しい方向が既存の方向から距離 $\delta$ 未満にあるという**被覆条件**も必要です。
<!-- definition-example-end -->

<a id="lem-gmt32-direction-count"></a>

<!-- formal-statement-start -->
> **補題（分離方向の本数）**  
> $d\ge2$、$0<\delta<1/8$ とし、$V_\delta\subset S^{d-1}$ を極大 $\delta$-分離集合、$M_\delta=\#V_\delta$ とする。$d$ だけに依存する $0<c_d<C_d<\infty$ が存在して

$$
c_d\delta^{-(d-1)}
\le M_\delta\le
C_d\delta^{-(d-1)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

単位球面上の小球の周りを、厚さ約 $\delta$ の球殻で挟みます。分離性から小球が交わらず、極大性から少し大きな小球で球殻を覆えます。球殻の体積は $\delta$ の一次、各小球の体積は $\delta^d$ のオーダーです。

<!-- proof-start -->
### 証明

$A_\delta=\{x\in\mathbb R^d:1-\delta/2<|x|<1+\delta/2\}$ とします。その体積は

$$
|A_\delta|=\omega_d\bigl((1+\delta/2)^d-(1-\delta/2)^d\bigr).
$$

因数分解または平均値の定理から、$0<\delta<1/8$ では $c'_d\delta\le|A_\delta|\le C'_d\delta$ です。

**上界。** $v\in V_\delta$ を中心とする開球 $B(v,\delta/2)$ は互いに交わらず、すべて $A_\delta$ に入ります。従って

$$
M_\delta\omega_d(\delta/2)^d
\le |A_\delta|\le C'_d\delta,
\qquad
M_\delta\le\frac{2^dC'_d}{\omega_d}\delta^{1-d}.
$$

**下界。** 極大性より、どの $u\in S^{d-1}$ にも $|u-v|<\delta$ となる $v\in V_\delta$ が存在します。$x\in A_\delta$ に対し $u=x/|x|$ とすると

$$
|x-v|\le |x-u|+|u-v|<\delta/2+\delta<2\delta.
$$

よって $A_\delta\subset\bigcup_{v\in V_\delta}B(v,2\delta)$ であり、

$$
c'_d\delta\le|A_\delta|
\le M_\delta\omega_d(2\delta)^d.
$$

整理すると $M_\delta\ge c'_d(2^d\omega_d)^{-1}\delta^{1-d}$ です。$\square$
<!-- proof-end -->

したがって各方向へ一本ずつtubeを置くと、個数は $\delta^{-(d-1)}$、一本の体積は $\delta^{d-1}$ のオーダーです。すべてを重複なしに足した総体積は定数のオーダーになります。

| 次元 $d$ | 分離方向数 $M_\delta$ | 一本のtube体積 | 体積の総和 |
| --- | --- | --- | --- |
| $2$ | $\asymp\delta^{-1}$ | $\asymp\delta$ | $\asymp1$ |
| $3$ | $\asymp\delta^{-2}$ | $\asymp\delta^2$ | $\asymp1$ |
| 一般の $d\ge2$ | $\asymp\delta^{-(d-1)}$ | $\asymp\delta^{d-1}$ | $\asymp1$ |

**ただし合併体積は総和ではありません。** [tube体積と重複度の積分](#prop-gmt32-tube-volume)を使えば、交差の多さを知らない段階では

$$
c_d\delta^{d-1}\le|U_\delta|
\le\sum_{v\in V_\delta}|T_v|\le C_d
$$

という粗い範囲しか得られません。下界は一本分の体積、上界は総和から従います。

## 4. 太い近傍からMinkowski次元を読む

[MT8のHausdorff次元](../../MT/MT8/index.md#def-mt8-hausdorff-dimension)は、任意の細かい可算被覆の直径のべきを足す方法で定義されました。tubeの議論ではむしろ、**一つの尺度 $\delta$ で何個の球が要るか**を知りたい場面が多くあります。

非空有界集合 $E\subset\mathbb R^d$ に対し $N_\delta(E)$ を、「中心を $E$ に置いた半径 $\delta$ の開球で $E$ を覆う」ための最小個数とします。$E$ が有界ならこの数は有限です。下・上Minkowski次元（箱次元）は、被覆数の $\delta$ に関する成長指数で定義します。

<a id="def-gmt32-minkowski"></a>

<!-- formal-statement-start -->
> **定義（上下Minkowski次元）**  
> $d\ge1$、非空有界集合 $E\subset\mathbb R^d$ とする。半径 $\delta$、中心 $E$ の開球による最小被覆数 $N_\delta(E)$ を用い、

$$
\underline{\dim}_{\mathrm M}E
=\liminf_{\delta\downarrow0}
\frac{\log N_\delta(E)}{\log(1/\delta)},
\qquad
\overline{\dim}_{\mathrm M}E
=\limsup_{\delta\downarrow0}
\frac{\log N_\delta(E)}{\log(1/\delta)}
$$

> と定める。二つが一致するとき、その共通値をMinkowski次元 $\dim_{\mathrm M}E$ と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt32-minkowski -->
### 直接確認：線分の被覆数

$E=[0,1]\times\{0\}\subset\mathbb R^2$ とします。半径 $\delta$ の球と水平線との交わりの長さは高々 $2\delta$ です。従って $N_\delta(E)\ge1/(2\delta)$ です。逆に線分上へ間隔 $\delta$ 以下で中心を置くと高々 $\lceil1/\delta\rceil+1$ 球で覆えます。したがって

$$
\frac1{2\delta}\le N_\delta(E)
\le\lceil1/\delta\rceil+1
$$

であり、対数を $\log(1/\delta)$ で割ると上下の極限はいずれも $1$ です。**二つのliminf/limsupをそれぞれ確かめた**ので、単なる推測ではありません。
<!-- definition-example-end -->

<a id="lem-gmt32-neighborhood-cover"></a>

<!-- formal-statement-start -->
> **補題（被覆数と近傍体積の比較）**  
> $d\ge1$、非空有界集合 $E\subset\mathbb R^d$ とし、$0<\delta<1$ とする。$E_\delta=\{x:\operatorname{dist}(x,E)<\delta\}$ について

$$
\omega_d2^{-d}\delta^d N_\delta(E)
\le |E_\delta|
\le \omega_d2^d\delta^d N_\delta(E).
$$

> 従って

$$
\underline{\dim}_{\mathrm M}E
=d-\limsup_{\delta\downarrow0}\frac{\log|E_\delta|}{\log\delta},
\qquad
\overline{\dim}_{\mathrm M}E
=d-\liminf_{\delta\downarrow0}\frac{\log|E_\delta|}{\log\delta}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

被覆球を半径 $2\delta$ に広げると $E_\delta$ 全体を覆います。逆向きには、互いに $\delta$ 以上離れた点を極大に選び、その周囲の半径 $\delta/2$ の球を、互いに交わらず $E_\delta$ に収めます。対数を取ると定数因子は指数に影響しません。

<!-- proof-start -->
### 証明

半径 $\delta$ の球 $B(a_j,\delta)$、$a_j\in E$、$1\le j\le N_\delta(E)$ が $E$ を覆うとします。$x\in E_\delta$ なら $|x-y|<\delta$ となる $y\in E$ があり、その $y$ を覆う中心 $a_j$ について

$$
|x-a_j|\le|x-y|+|y-a_j|<2\delta.
$$

従って $E_\delta\subset\bigcup_jB(a_j,2\delta)$ であり、上界を得ます。

一方、$E$ の中に相互距離が $\delta$ 以上の点 $p_1,\ldots,p_P$ を極大になるまで選びます。有界性により、この選択は有限回で止まります（無限に選べれば有界な箱の有限分割と鳩の巣原理に反する）。極大性から $B(p_j,\delta)$ が $E$ を覆い、従って $N_\delta(E)\le P$ です。開球 $B(p_j,\delta/2)$ は互いに交わらず、それぞれ $E_\delta$ に含まれるため

$$
|E_\delta|\ge\sum_{j=1}^P|B(p_j,\delta/2)|
=P\omega_d(\delta/2)^d
\ge N_\delta(E)\omega_d(\delta/2)^d.
$$

二つの不等式を対数にすると

$$
\log|E_\delta|
=d\log\delta+\log N_\delta(E)+O_d(1).
$$

$\log\delta=-\log(1/\delta)$ は負なので、$\liminf$ と $\limsup$ の対応が逆転します。これを上の定義へ代入すれば表示された二式が従います。$\square$
<!-- proof-end -->

例えば $E=[0,1]^k\times\{0\}^{d-k}$、$1\le k\le d$ では、$k$ 個の座標が有界領域を動き、残り $d-k$ 個が幅 $\delta$ に制約されます。直積の箱で内外を挟むと

$$
c_{d,k}\delta^{d-k}\le|E_\delta|
\le C_{d,k}\delta^{d-k}.
$$

よって $\underline{\dim}_{\mathrm M}E=\overline{\dim}_{\mathrm M}E=k$ です。特に平面の一本の線分については、近傍面積は $2\delta+\pi\delta^2$ です。

<a id="thm-gmt32-dimension-comparison"></a>

<!-- formal-statement-start -->
> **定理（Hausdorff次元と上下Minkowski次元）**  
> $d\ge1$、非空有界集合 $E\subset\mathbb R^d$ とする。このとき

$$
\dim_{\mathrm H}E
\le\underline{\dim}_{\mathrm M}E
\le\overline{\dim}_{\mathrm M}E
\le d.
$$

> 第一の不等式は一般に厳密になり得る。
<!-- formal-statement-end -->

### 証明の見取り図

Hausdorff次元では、尺度を好きに小さくした被覆列を使えます。下Minkowski次元より少し大きい指数を選ぶと、ある尺度列では球の個数がそれより小さなべきで抑えられ、Hausdorff測度を零にできます。

<!-- proof-start -->
### 証明

$s>\underline{\dim}_{\mathrm M}E$ を任意に取ります。両者の間に $t$ を選び、

$$
\underline{\dim}_{\mathrm M}E<t<s
$$

とします。$\liminf$ の定義から $\delta_n\downarrow0$ を選び、すべての $n$ で $N_{\delta_n}(E)\le\delta_n^{-t}$ とできます。半径 $\delta_n$ の被覆球の直径は $2\delta_n$ なので、[MT8のHausdorff外測度の定義](../../MT/MT8/index.md#def-mt8-hausdorff-measure)による $s$ 乗和は

$$
N_{\delta_n}(E)(2\delta_n)^s
\le2^s\delta_n^{s-t}\longrightarrow0.
$$

よって $\mathcal H^s(E)=0$。これを任意の $s>\underline{\dim}_{\mathrm M}E$ に適用し、[臨界指数としてのHausdorff次元](../../MT/MT8/index.md#thm-mt8-threshold)から第一の不等式を得ます。第二の不等式は $\liminf\le\limsup$ です。

最後に $E$ を含む固定の立方体を幅 $\delta$ の小立方体で分割すると、高々 $C_E\delta^{-d}$ 個の半径 $C_d\delta$ の球で覆えます。半径を定数倍調整しても指数は変わらず、$\overline{\dim}_{\mathrm M}E\le d$ です。$\square$
<!-- proof-end -->

**反例：有理点の稠密集合。** $E=\mathbb Q^d\cap[0,1]^d$ は可算なので $\dim_{\mathrm H}E=0$ です（各点を十分小さい球で覆い、$s>0$ の直径の $s$ 乗和を任意に小さくします）。一方、$E$ は立方体に稠密なので任意の $\delta>0$ で $[0,1]^d\subset E_\delta\subset[-\delta,1+\delta]^d$ です。このため $1\le|E_\delta|\le(1+2\delta)^d$、近傍体積の公式から上下Minkowski次元はどちらも $d$ です。

**壊れた機構**は、Hausdorff側では各有理点に異なる極小半径を与えられるのに、Minkowski側では全点を同じ尺度で覆うため、稠密な集合と閉包を区別できないことです。実際 $E_\delta=(\overline E)_\delta$ であり、Minkowski次元は閉包を取っても変わりません。Hausdorff次元にはその性質はありません。

## 5. Besicovitch集合のtubeはどれほど重ならなければならないか

$K\subset\mathbb R^2$ を[GMT31のコンパクトで面積零のBesicovitch集合](../GMT31/index.md#thm-gmt31-null-existence)とします。各 $\delta$ で極大 $\delta$-分離方向集合 $V_\delta$ を選び、$v\in V_\delta$ ごとに $K$ 内の長さ1線分 $L_v$ を選びます。$T_v=(L_v)_\delta$、$m_\delta=\sum_{v\in V_\delta}\mathbf1_{T_v}$ とすれば、その合併は $K_\delta$ に含まれます。

<a id="prop-gmt32-kakeya-overlap"></a>

<!-- formal-statement-start -->
> **命題（零面積Besicovitch集合に伴う重複度の発散）**  
> $K\subset\mathbb R^2$ がコンパクト、$\mathcal L^2(K)=0$ で、すべての無向方向に長さ1の線分を含むとする。$0<\delta<1/8$ ごとに極大 $\delta$-分離方向集合 $V_\delta$ を選び、各方向の線分の $\delta$-tubeを $T_v$、重複度を $m_\delta$ とする。このとき

$$
\int_{\mathbb R^2}m_\delta\,dx\asymp1,
\qquad
\int_{\mathbb R^2}m_\delta^2\,dx
\ge\frac{c}{|K_\delta|}
\longrightarrow\infty
\quad(\delta\downarrow0)
$$

> が成り立つ。ただし $c>0$ は $\delta$ と選んだ線分に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

方向の本数が $\asymp\delta^{-1}$、一本の管面積が $\asymp\delta$ だから一次の総量は一定です。一方、コンパクト零測度集合の $\delta$-近傍の面積は零へ減ります。同じ一次の総量を狭くなった合併へ収めるため、二乗の重複度は発散する必要があります。

<!-- proof-start -->
### 証明

[分離方向の本数](#lem-gmt32-direction-count)と[tube面積](#prop-gmt32-tube-volume)により、$M_\delta=\#V_\delta$ として

$$
c\delta^{-1}\le M_\delta\le C\delta^{-1},
\qquad
2\delta\le|T_v|=2\delta+\pi\delta^2\le(2+\pi)\delta.
$$

従って

$$
0<c_0\le\sum_{v\in V_\delta}|T_v|
=\int m_\delta\,dx\le C_0<\infty.
$$

$K$ はコンパクトなので $K_\delta$ は有界で、$\delta_n\downarrow0$ に対して $K_{\delta_n}$ は減少し、その共通部分は $K$ です。Lebesgue測度の上からの連続性（最初の近傍の測度が有限）により $|K_{\delta_n}|\to|K|=0$。これは任意の $\delta\downarrow0$ に対して成立します。

$U_\delta=\bigcup_vT_v\subset K_\delta$ であり、[重複度不等式](#prop-gmt32-tube-volume)から

$$
c_0^2\le\left(\int m_\delta\,dx\right)^2
\le |U_\delta|\int m_\delta^2\,dx
\le |K_\delta|\int m_\delta^2\,dx.
$$

従って表示された下界と発散を得ます。$\square$
<!-- proof-end -->

これは**次元の下界を完成させた定理ではありません**。むしろ「多数の異方向tubeを小面積に押し込むなら、二管の交差面積の総和が非常に大きい」という必要条件です。次講 GMT33 では角度が離れた二管の交差量を上から抑え、逆に合併体積を下から評価します。

また $|K_\delta|\to0$ は $\overline{\dim}_{\mathrm M}K<2$ を意味しません。例えば $|K_\delta|$ が対数程度にしか減らなければ、その対数を $\log\delta$ で割った極限は零になり得ます。**面積零とMinkowski次元2は両立可能**です。

## 6. 演習：体積・方向・次元を別々に検算する

### Level A：定義と直接計算

<a id="ex-gmt32-a01"></a>

**A01　tubeの端部を数える**

- Level: A
- 問題: $d=2$ と $d=3$ で、長さ1・半径 $\delta$ のtube体積を計算せよ。円柱部分と両端の部分を別々に求めよ。

<!-- solution-start -->
#### 詳細解答

$d=2$ では中央の長方形は長さ1、幅 $2\delta$ なので面積 $2\delta$。両端の半円を合わせると半径 $\delta$ の円一個で面積 $\pi\delta^2$。従って $2\delta+\pi\delta^2$ です。

$d=3$ では中央の円柱は底面積 $\pi\delta^2$、長さ1で体積 $\pi\delta^2$。両端の半球は球一個で体積 $4\pi\delta^3/3$。合計は $\pi\delta^2+4\pi\delta^3/3$ です。端部の項が円柱項より $\delta$ だけ高次になる点も確認できます。
<!-- solution-end -->

<a id="ex-gmt32-a02"></a>

**A02　方向の分離を弦長で確認する**

- Level: A
- 問題: $v_j=(\cos(2\pi j/M),\sin(2\pi j/M))$、$j=0,\ldots,M-1$、$M\ge3$ とする。最小の異なる二方向間距離を求め、$M$ が $\delta^{-1}$ のオーダーとなる選び方を説明せよ。

<!-- solution-start -->
#### 詳細解答

角度差を $\alpha$ とすれば単位ベクトル間の距離の二乗は $2-2\cos\alpha=4\sin^2(\alpha/2)$ です。最短角度差は $2\pi/M$ なので最短弦長は $2\sin(\pi/M)$。$0<\pi/M\le\pi/3$ で $\frac{2}{\pi}x\le\sin x\le x$ を使えば

$$
\frac4M\le2\sin(\pi/M)\le\frac{2\pi}M.
$$

例えば $M=\lfloor2/\delta\rfloor$（$\delta$ が十分小さいとき $M\ge3$）なら $2\sin(\pi/M)\ge4/M\ge2\delta\ge\delta$ で分離します。また $M\asymp\delta^{-1}$ です。
<!-- solution-end -->

<a id="ex-gmt32-a03"></a>

**A03　線分の箱次元**

- Level: A
- 問題: $E=[0,1]\times\{0\}\subset\mathbb R^2$ の $\delta$-近傍面積を計算し、上下Minkowski次元を求めよ。

<!-- solution-start -->
#### 詳細解答

$E_\delta$ は幅 $2\delta$・長さ1の長方形と、両端の半円からなるので、[tube面積式](#prop-gmt32-tube-volume)より $|E_\delta|=2\delta+\pi\delta^2=\delta(2+\pi\delta)$。従って

$$
\frac{\log|E_\delta|}{\log\delta}
=1+\frac{\log(2+\pi\delta)}{\log\delta}\longrightarrow1.
$$

[近傍体積公式](#lem-gmt32-neighborhood-cover)から下・上Minkowski次元はともに $2-1=1$ です。
<!-- solution-end -->

<a id="ex-gmt32-a04"></a>

**A04　有限集合と稠密可算集合**

- Level: A
- 問題: $F=\{(0,0),(1,0)\}$ と $E=\mathbb Q^2\cap[0,1]^2$ について、Hausdorff次元と上下Minkowski次元をそれぞれ求めよ。

<!-- solution-start -->
#### 詳細解答

$F$ は有限なので可算点被覆から $\dim_{\mathrm H}F=0$。$0<\delta<1/3$ では $F_\delta$ は二つの互いに交わらない半径 $\delta$ 円盤で、$|F_\delta|=2\pi\delta^2$。近傍体積公式で上下Minkowski次元は $2-2=0$ です。

$E$ は可算だから $\dim_{\mathrm H}E=0$。任意の $x\in[0,1]^2$ と $\delta>0$ に対し $x$ から距離 $\delta$ 未満の有理点が存在するので $[0,1]^2\subset E_\delta$。一方 $E_\delta\subset[-\delta,1+\delta]^2$ です。よって $1\le|E_\delta|\le(1+2\delta)^2$ から上下Minkowski次元は $2$ になります。差の原因は固定尺度の被覆と可算可変尺度の被覆の違いです。
<!-- solution-end -->

<a id="ex-gmt32-a05"></a>

**A05　二重に数えたtube**

- Level: A
- 問題: 面積 $A>0$ の二つの可測集合 $T_1,T_2$ が同じ集合の場合と、互いに交わらない場合の二通りで、$m=\mathbf1_{T_1}+\mathbf1_{T_2}$ の $\int m$、$\int m^2$ と Cauchy--Schwarz による合併体積下界を計算せよ。

<!-- solution-start -->
#### 詳細解答

両方とも $\int m=2A$ です。同じ集合なら $m=2\mathbf1_{T_1}$、従って $\int m^2=4A$、下界は $(2A)^2/(4A)=A=|T_1\cup T_2|$ です。互いに交わらなければ $m^2=\mathbf1_{T_1}+\mathbf1_{T_2}$、従って $\int m^2=2A$、下界は $(2A)^2/(2A)=2A=|T_1\cup T_2|$ です。一次積分が同じでも二次積分が違うため、合併体積を区別できます。
<!-- solution-end -->

### Level B：証明と落とし穴

<a id="ex-gmt32-b01"></a>

**B01　球殻から方向数を導く**

- Level: B
- 問題: $d=3$、$0<\delta<1/8$ とし、単位球面の極大 $\delta$-分離集合の本数 $M_\delta$ が $c\delta^{-2}\le M_\delta\le C\delta^{-2}$ を満たすことを、球殻体積を用いて証明せよ。

<!-- solution-start -->
#### 詳細解答

$A_\delta=\{1-\delta/2<|x|<1+\delta/2\}$ の体積は

$$
\frac{4\pi}{3}\bigl((1+\delta/2)^3-(1-\delta/2)^3\bigr)
=4\pi\delta+\frac{\pi}{3}\delta^3.
$$

分離点の周囲の半径 $\delta/2$ の球は互いに交わらず球殻内に入るため、

$$
M_\delta\frac{4\pi}{3}(\delta/2)^3
\le4\pi\delta+\frac{\pi}{3}\delta^3,
$$

すなわち $M_\delta\le C\delta^{-2}$ です。極大性から球面上の点は選んだ点の距離 $\delta$ 以内にあり、球殻上の任意の点は選んだ点の距離 $2\delta$ 以内です。よって

$$
4\pi\delta+\frac{\pi}{3}\delta^3
\le M_\delta\frac{4\pi}{3}(2\delta)^3
$$

から $M_\delta\ge(3/8)\delta^{-2}$ が従います。上と下で「互いに交わらない」「全体を覆う」という異なる事実を使いました。
<!-- solution-end -->

<a id="ex-gmt32-b02"></a>

**B02　被覆数からHausdorff測度を零にする**

- Level: B
- 問題: 有界集合 $E\subset\mathbb R^d$ と数列 $\delta_n\downarrow0$ があり、$N_{\delta_n}(E)\le C\delta_n^{-t}$ が成立するとする。任意の $s>t\ge0$ に対して $\mathcal H^s(E)=0$ を証明せよ。さらにこの主張とMinkowski次元の定義から $\dim_{\mathrm H}E\le\underline{\dim}_{\mathrm M}E$ を再構成せよ。

<!-- solution-start -->
#### 詳細解答

$n$ ごとに半径 $\delta_n$ の球で $E$ を覆うと、直径は高々 $2\delta_n$ であるため

$$
\sum_{j=1}^{N_{\delta_n}(E)}(\operatorname{diam}B_j)^s
\le C\delta_n^{-t}(2\delta_n)^s
=C2^s\delta_n^{s-t}\longrightarrow0.
$$

[Hausdorff外測度の定義](../../MT/MT8/index.md#def-mt8-hausdorff-measure)から $\mathcal H^s(E)=0$ です。

$u=\underline{\dim}_{\mathrm M}E$ とし、$s>u$ に対して $u<t<s$ を選びます。$\liminf$ の意味からある $\delta_n\downarrow0$ で $N_{\delta_n}(E)\le\delta_n^{-t}$ とできます。前半を $C=1$ で適用して $\mathcal H^s(E)=0$、[Hausdorff次元の臨界指数性](../../MT/MT8/index.md#thm-mt8-threshold)から $\dim_{\mathrm H}E\le u$ です。
<!-- solution-end -->

<a id="ex-gmt32-b03"></a>

**B03　一次総量が一定でも合併面積が零へ減る**

- Level: B
- 問題: コンパクトな面積零の平面Besicovitch集合 $K$ に対し、各極大 $\delta$-分離方向から選んだtubeを $T_v$ とする。$\sum_v|T_v|\asymp1$、$|\bigcup_vT_v|\to0$ をそれぞれ独立に証明せよ。

<!-- solution-start -->
#### 詳細解答

[方向数補題](#lem-gmt32-direction-count)から $c\delta^{-1}\le M_\delta\le C\delta^{-1}$、[tube面積式](#prop-gmt32-tube-volume)から $|T_v|=2\delta+\pi\delta^2$ です。積を取れば $2c\le\sum_v|T_v|\le C(2+\pi)$ です。

一方、各管は $K_\delta$ に含まれるので $U_\delta=\bigcup_vT_v\subset K_\delta$。$K$ がコンパクトで零面積だから、例えば $K_{\delta_n}$ の減少列と測度の上からの連続性により $|K_\delta|\to0$ です。従って $0\le|U_\delta|\le|K_\delta|\to0$。総和と合併は交差部分を重複計上するかどうかが異なります。
<!-- solution-end -->

<a id="ex-gmt32-b04"></a>

**B04　重複度の二乗と交差の寄与**

- Level: B
- 問題: 有限個の可測集合 $T_1,\ldots,T_M$ について $m=\sum_j\mathbf1_{T_j}$ とする。$\int m^2=\sum_j|T_j|+2\sum_{i<j}|T_i\cap T_j|$ を証明し、各 $|T_j|=A$ で $|U|\le\varepsilon$ なら $\sum_{i<j}|T_i\cap T_j|\ge(M^2A^2/\varepsilon-MA)/2$ を示せ。

<!-- solution-start -->
#### 詳細解答

$m^2=\sum_j\mathbf1_{T_j}^2+\sum_{i\ne j}\mathbf1_{T_i}\mathbf1_{T_j}$ です。指示関数の二乗は自分自身であり、$i\ne j$ の各組は $(i,j),(j,i)$ の二回現れるので、積分すると

$$
\int m^2\,dx=MA+2\sum_{i<j}|T_i\cap T_j|.
$$

さらに $m$ は $U$ の外で零ですから Cauchy--Schwarz により $(MA)^2=(\int_Um)^2\le|U|\int m^2\le\varepsilon\int m^2$。よって $\int m^2\ge M^2A^2/\varepsilon$ です。前式へ代入して対角項 $MA$ を引き、2で割れば結論です。$\varepsilon>0$ を仮定しています。
<!-- solution-end -->

### Level C：総合的な判定

<a id="ex-gmt32-c01"></a>

**C01　集合の次元とtube重複を一続きで読む**

- Level: C
- 問題: $d=2$ とする。コンパクトで面積零のBesicovitch集合 $K$ に対し、$V_\delta$ を極大 $\delta$-分離方向集合、$T_v\subset K_\delta$ を各方向の単位線分から作ったtubeとし、$m_\delta=\sum_{v\in V_\delta}\mathbf1_{T_v}$ とする。(i) $M_\delta\asymp\delta^{-1}$ と $\int m_\delta\asymp1$ を導け。(ii) $|K_\delta|\to0$ から $\int m_\delta^2\to\infty$ を証明せよ。(iii) この情報だけで $\overline{\dim}_{\mathrm M}K=2$ と結論してよいか。次元公式の対数を使って理由を説明せよ。(iv) 比較として $E=\mathbb Q^2\cap[0,1]^2$ のHausdorff次元と上下Minkowski次元を求め、面積零と「近傍面積が零に減ること」の違いを述べよ。

<!-- solution-start -->
#### 詳細解答

**(i)** [方向数補題](#lem-gmt32-direction-count)を $d=2$ に代入すれば $c\delta^{-1}\le M_\delta\le C\delta^{-1}$。各管の面積は $2\delta+\pi\delta^2$ なので

$$
2c\le\int m_\delta\,dx
=M_\delta(2\delta+\pi\delta^2)
\le C(2+\pi).
$$

**(ii)** [GMT31の零面積コンパクト集合](../GMT31/index.md#thm-gmt31-null-existence)を使っています。コンパクト性と測度の上からの連続性から $|K_\delta|\to0$。さらに $\bigcup_vT_v\subset K_\delta$ なので、[重複度不等式](#prop-gmt32-tube-volume)より

$$
(2c)^2
\le\left(\int m_\delta\right)^2
\le|K_\delta|\int m_\delta^2,
\qquad
\int m_\delta^2\ge\frac{4c^2}{|K_\delta|}\to\infty.
$$

**(iii)** 結論できません。近傍公式は

$$
\overline{\dim}_{\mathrm M}K
=2-\liminf_{\delta\downarrow0}
\frac{\log|K_\delta|}{\log\delta}
$$

です。$|K_\delta|\to0$ は比の極限が正であることを保証しません。例として正の数列 $a_\delta=1/\log(e/\delta)$ は零へ減りますが

$$
\frac{\log a_\delta}{\log\delta}
=-\frac{\log\log(e/\delta)}{\log\delta}\longrightarrow0.
$$

これを実際の $K$ の近傍面積と同一視する必要はなく、**極限 $|K_\delta|\to0$ だけではべき指数を特定できない**ことを示す比較例です。平面でのfull Minkowski次元を証明するには次講の交差上界が必要です。

**(iv)** $E$ は可算なので $\dim_{\mathrm H}E=0$。稠密性から $[0,1]^2\subset E_\delta\subset[-\delta,1+\delta]^2$ なので $1\le|E_\delta|\le(1+2\delta)^2$、従って上下Minkowski次元はともに $2$ です。$E$ 自体は面積零ですが、その閉包は立方体で面積1です。対してコンパクト $K$ は自身が閉包なので、零面積なら $|K_\delta|\to0$ となります。可算稠密集合にはその推論はできません。
<!-- solution-end -->

## 7. 次講への橋：二管の角度は何を決めるか

- tubeの本数と総体積は方向分離だけで制御できる。しかし合併体積には交差面積の総和が必要になる。
- $\delta$-近傍のべき指数は上下Minkowski次元を与える。Hausdorff次元とMinkowski次元を同一視しない。
- 零面積のコンパクトBesicovitch集合では、tubeの一次総量は消えず二次総量は発散する。これは矛盾ではなく、著しい重なりの存在を表す。
- 次講GMT33では、角度 $\theta$ の二管に対する交差上界と、方向の離散和を組み合わせ、平面の対数損失を導く。
