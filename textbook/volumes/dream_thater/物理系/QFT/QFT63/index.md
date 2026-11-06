# QFT63 高次元CFTの四点関数・大N因子化と境界相関

<!-- definition-example-audit: strict -->

[QFT48のスカラー一次場](../QFT48/index.md#def-qft48-scalar-primary)では、三点までの相関関数の座標依存が共形対称性によってほぼ決まることを学びました。しかし四点には二つの共形交差比が残り、理論固有の情報が必要です。また、二次元の[Virasoro代数](../QFT51/index.md#thm-qft51-virasoro)だけで高次元の相関を決定することはできません。

この章では、**共形対称性だけでは未定な四点関数に、大きな自由度数と境界条件がどのような制約を加えるか**を考えます。まず四点の置換を検算し、次に大きな行列サイズ $N$ に伴う連結相関の抑制を有限次元模型で正確に数えます。最後に、半空間での鏡像核を計算します。これは高次元CFTとその境界相関の入口であって、重力双対の存在証明ではありません。

舞台は整数 $d\ge3$ のEuclid空間で、$r_{ij}=|x_i-x_j|$、相異なる挿入点、自然単位を用います。実時間へ読み替える場合は[計量規約](../../../../../dream-theater-lorentz-conventions.md)の $(-,+,+,+)$ を使い、Euclid内積との混同を避けます。接触点の積、解析接続、反射陽性は別途条件が必要です。

## 1. 四点関数に残る情報と交差対称性

同じスカラー一次場 $\mathcal O$ を四つ挿入します。真空が共形不変で、$\mathcal O$ の次元が $\Delta>0$、二点規格化を $\langle\mathcal O(x)\mathcal O(y)\rangle=r_{xy}^{-2\Delta}$ と選んだとします（一般の正係数は場の再規格化で吸収できます）。[QFT48の二点・三点の変換則](../QFT48/index.md#thm-qft48-primary-two-point)を前提とします。

[QFT48の交差比](../QFT48/index.md#def-qft48-conformal-cross-ratios)は、四点の距離の積から作る $u=r_{12}^2r_{34}^2/(r_{13}^2r_{24}^2)$、$v=r_{14}^2r_{23}^2/(r_{13}^2r_{24}^2)$ です。この二量は平行移動・回転・拡大・反転で不変です。四点相関の残りを一つの無次元関数に分離します。

<a id="def-qft63-reduced-four-point"></a>

<!-- formal-statement-start -->
> **定義（同一スカラー一次場の縮約四点関数）**
> $d\ge3$ の共形不変なEuclid真空で、次元 $\Delta$ の同一の局所bosonスカラー一次場 $\mathcal O$ の相異なる四点相関 $G_4$ を考える。交差比 $(u,v)$ により

$$
G_4(x_1,x_2,x_3,x_4)
=\frac{\mathcal G(u,v)}{r_{12}^{2\Delta}r_{34}^{2\Delta}}
$$

> と表した $\mathcal G$ を縮約四点関数という。接触点・時間順序に伴う別の分布項はこの式の対象外とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft63-reduced-four-point -->
**定義の確認**： 自由Gaussian場なら[Wickの対合公式](../QFT19/index.md#thm-qft19-boson-wick)で

$$
G_4=r_{12}^{-2\Delta}r_{34}^{-2\Delta}
+r_{13}^{-2\Delta}r_{24}^{-2\Delta}
+r_{14}^{-2\Delta}r_{23}^{-2\Delta}.
$$

第一項でくくり、第二項には $r_{12}^2r_{34}^2/(r_{13}^2r_{24}^2)=u$、第三項には $r_{12}^2r_{34}^2/(r_{14}^2r_{23}^2)=u/v$ を代入すると

$$
\mathcal G_{\mathrm{pair}}(u,v)=1+u^\Delta+(u/v)^\Delta
$$

となります。例えば四点を同一直線の座標 $0,1,2,4$ に置くと $u=1/9,v=4/9$ ですから、$\Delta=1$ では $\mathcal G_{\mathrm{pair}}=49/36$ と直接計算できます。このGaussianの形を、任意の相互作用CFTが従う公式と取り違えてはいけません。
<!-- definition-example-end -->

四点の順序を入れ替えると、縮約に使う距離の組も変わります。局所bosonの相異なるEuclid点の相関が置換で不変という条件が、四点関数の**交差対称性**です。[QFT54の二次元正則四点](../QFT54/index.md#thm-qft54-crossing)の条件と同じ役割を果たしますが、ここでは $d\ge3$ の実距離を使います。

<a id="thm-qft63-crossing"></a>

<!-- formal-statement-start -->
> **定理（同一スカラー四点関数の交差対称式）**
> $d\ge3$ のEuclid共形不変な真空で、相異なる点に挿入した同一局所bosonスカラー一次場 $\mathcal O$ の四点相関が置換対称であり、次元 $\Delta$ の縮約関数 $\mathcal G(u,v)$ が上の定義で存在するとする。このとき点 $1$ と $3$ の交換から

$$
\mathcal G(u,v)=\left(\frac uv\right)^\Delta\mathcal G(v,u)
$$

> が成り立つ（各交差比は正である）。
<!-- formal-statement-end -->

### 証明の見取り図

交換後の交差比は $(v,u)$ となり、四点関数全体は同じですが、その前へ出した距離因子が違います。両方の規格化を揃えてから比較します。

<!-- proof-start -->
### 証明

$1\leftrightarrow3$ によって $r_{12}r_{34}$ は $r_{23}r_{14}$ に、$r_{13}r_{24}$ は自身へ移ります。従って

$$
u'=\frac{r_{23}^2r_{14}^2}{r_{13}^2r_{24}^2}=v,\qquad
v'=\frac{r_{34}^2r_{12}^2}{r_{13}^2r_{24}^2}=u.
$$

置換前後の同じ $G_4$ を書くと

$$
\frac{\mathcal G(u,v)}{r_{12}^{2\Delta}r_{34}^{2\Delta}}
=\frac{\mathcal G(v,u)}{r_{23}^{2\Delta}r_{14}^{2\Delta}}.
$$

両辺へ $r_{12}^{2\Delta}r_{34}^{2\Delta}$ を掛ければ、係数は

$$
\left(\frac{r_{12}^2r_{34}^2}{r_{23}^2r_{14}^2}\right)^\Delta
=\left(\frac uv\right)^\Delta
$$

です。距離が零でないため除算は正当です。
<!-- proof-end -->

**実例の照合。** 対合関数なら右辺は

$$
(u/v)^\Delta\left[1+v^\Delta+(v/u)^\Delta\right]
=(u/v)^\Delta+u^\Delta+1
$$

となり、左辺と項ごとに一致します。逆に交差対称性を満たすというだけで、その解が対合関数一つに決まるわけではありません。

## 2. 大N因子化はどの仮定から来るか

相互作用場の四点関数をGaussian型で近似するには、対合以外の**連結相関**が小さいという入力が必要です。まず有限個の中心化確率変数や、相異なる点のEuclid相関の代数式として連結部分を定義します。中心化とは一体期待値が零であることです。生成式の $t_1,\ldots,t_m$ は互いに独立な補助変数で、$\partial_{t_i}$ は他の $t_j$ を固定して $t_i$ で偏微分し、$|_{t=0}$ は全ての $t_i$ を零にすることを表します。一般の量子場ではEuclid相関の存在・反射陽性を別途確かめる必要があります。

<a id="def-qft63-connected-cumulants"></a>

<!-- formal-statement-start -->
> **定義（中心化相関関数の連結累積量）**
> 中心化された可換確率変数または相異なる点の対称Euclid挿入 $X_i$（$\langle X_i\rangle=0$）について、連結 $m$ 点関数を次の生成式で定める。モーメント母関数が原点近傍で存在する場合は通常の微分、そうでなければ存在する有限次モーメントから作る形式べき級数の係数として解釈する。

$$
\langle X_1\cdots X_m\rangle_c
=\left.\partial_{t_1}\cdots\partial_{t_m}
\log\left\langle\exp\left(\sum_{i=1}^m t_iX_i\right)\right\rangle\right|_{t=0}.
$$

> 特に二点・三点の連結相関は通常の二点・三点期待値であり、四点の連結部分は

$$
\begin{aligned}
\langle X_1X_2X_3X_4\rangle_c
&=\langle X_1X_2X_3X_4\rangle\\
&\quad-\langle X_1X_2\rangle\langle X_3X_4\rangle
-\langle X_1X_3\rangle\langle X_2X_4\rangle\\
&\quad-\langle X_1X_4\rangle\langle X_2X_3\rangle
\end{aligned}
$$

> となる。一変数 $X$ の $k$ 次累積量 $\kappa_k(X)$ は、$\log\langle e^{tX}\rangle$ の $t^k/k!$ の係数を $k!$ 倍したものである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft63-connected-cumulants -->
**定義の確認**： 平均零で分散 $a$ の実Gaussian変数 $X$ は $\langle X^4\rangle=3a^2$ です。[Gaussian対合公式](../QFT19/index.md#thm-qft19-boson-wick)の三つの対合はそれぞれ $a^2$ なので $\langle X^4\rangle_c=3a^2-3a^2=0$。一方で $X$ が確率 $1/2$ ずつ $\pm1$ を取る場合は $\langle X^4\rangle_c=1-3=-2$ であり、中心化だけでは連結四点は消えません。
<!-- definition-example-end -->

次に $N$ は場の座標次元 $d$ ではなく、例えば $N\times N$ 行列のサイズを表します。相関の $O(N^{-p})$ は**相異なる挿入点を固定**して $N\to\infty$ とする評価であり、点を同時に衝突させる極限を含みません。

<a id="def-qft63-large-n-factorizing"></a>

<!-- formal-statement-start -->
> **定義（大N因子化するスカラー場族）**
> $N$ を正整数とし、各 $N$ で共形不変なEuclid真空上の同じ次元 $\Delta$ の中心化スカラー一次場 $\mathcal O_N$ を考える。相異なる点で

$$
\langle\mathcal O_N(x)\mathcal O_N(y)\rangle
=r_{xy}^{-2\Delta}+O(N^{-2}),
$$

> かつ全ての固定した $k\ge3$ について連結 $k$ 点関数が $O(N^{2-k})$ となるとき、この場族をここでは大N因子化する場族と呼ぶ。誤差は選んだ相異なる挿入点配置ごとに評価する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft63-large-n-factorizing -->
**定義の確認**： $k=3$ なら $O(N^{-1})$、$k=4$ なら $O(N^{-2})$ という要求です。二点関数の正規化だけからは導けません。定義の全条件を満たす自由場の直接例を作ります。[QFT48の質量零自由スカラー場](../QFT48/index.md#thm-qft48-massless-kernel)を二点係数が1となるよう規格化し、$d\ge3$、$\Delta=(d-2)/2$ で、互いに独立な $N^2$ 個の中心化Gaussianスカラー一次場 $\psi_a$ を取ります。[一次場の定義](../QFT48/index.md#def-qft48-scalar-primary)から、等しい次元を持つこれらの線形結合も一次場です。$\delta_{ab}$ は同じ添字の場合だけ1となるKroneckerのデルタとして

$$
\mathcal O_N(x)=\frac1N\sum_{a=1}^{N^2}\psi_a(x),\qquad
\langle\psi_a(x)\psi_b(y)\rangle=\delta_{ab}r_{xy}^{-2\Delta}
$$

と置きます。独立性・中心化と[GaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)から

$$
\begin{aligned}
\langle\mathcal O_N(x)\rangle&=0,\\
\langle\mathcal O_N(x)\mathcal O_N(y)\rangle
&=\frac1{N^2}\sum_{a,b=1}^{N^2}\delta_{ab}r_{xy}^{-2\Delta}
=r_{xy}^{-2\Delta},\\
\langle\mathcal O_N(x_1)\cdots\mathcal O_N(x_k)\rangle_c&=0
\quad(k\ge3)
\end{aligned}
$$

が成立します。したがって相異なる固定点で二点の誤差は厳密に零で、全ての連結 $k$ 点は $0=O(N^{2-k})$ です。これは非零の高次連結項を示す例ではありません。次節の有限Gaussian行列模型では中心化変数の累積量が実際に $N^{2-k}$ となりますが、位置 $x$ を持たない零次元模型なのでCFT例とは区別します。相互作用する大Nゲージ理論でこの階層を用いるには、平面図展開と演算子規格化などの追加の検証が必要です。
<!-- definition-example-end -->

<a id="thm-qft63-leading-four-point"></a>

<!-- formal-statement-start -->
> **定理（大N因子化の先頭四点関数）**
> $d\ge3$ の共形不変なEuclid真空で、同一局所bosonスカラー一次場族 $\mathcal O_N$ が上の大N因子化条件を満たすとする。相異なる固定四点について

$$
\begin{aligned}
\langle\mathcal O_N(x_1)\cdots\mathcal O_N(x_4)\rangle
&=\frac1{r_{12}^{2\Delta}r_{34}^{2\Delta}}
+\frac1{r_{13}^{2\Delta}r_{24}^{2\Delta}}\\
&\quad+\frac1{r_{14}^{2\Delta}r_{23}^{2\Delta}}
+O(N^{-2}).
\end{aligned}
$$

> 従って縮約関数の先頭項は $\mathcal G_0(u,v)=1+u^\Delta+(u/v)^\Delta$ であり、交差対称式を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

四点の連結部分と三つの二点積を[連結累積量の定義](#def-qft63-connected-cumulants)で分離し、各二点の $O(N^{-2})$ 補正と連結四点の次数を数えます。

<!-- proof-start -->
### 証明

$C_{ij}=r_{ij}^{-2\Delta}$、$\varepsilon_{ij}(N)=O(N^{-2})$ とすると、仮定より $\langle\mathcal O_N(x_i)\mathcal O_N(x_j)\rangle=C_{ij}+\varepsilon_{ij}$ です。固定配置で $C_{ij}$ は有限なので、例えば

$$
(C_{12}+\varepsilon_{12})(C_{34}+\varepsilon_{34})
=C_{12}C_{34}
+C_{12}\varepsilon_{34}+C_{34}\varepsilon_{12}
+\varepsilon_{12}\varepsilon_{34}
=C_{12}C_{34}+O(N^{-2}).
$$

他の二組でも同様に各積を実際に展開でき、連結四点は仮定から $O(N^{-2})$ です。四点分解へ戻すと主張の三対合と誤差次数を得ます。最後に $C_{12}C_{34}$ をくくると $C_{13}C_{24}/(C_{12}C_{34})=u^\Delta$、$C_{14}C_{23}/(C_{12}C_{34})=(u/v)^\Delta$ です。[交差対称式](#thm-qft63-crossing)には前節の直接代入を使えます。
<!-- proof-end -->

**注意。** この形を「一般化自由場型の先頭相関」と呼びますが、任意の $\Delta$ と任意の高次相関を勝手に指定して正値性・局所性・反射陽性を保証したわけではありません。また $N$ が大きいことだけでも不十分で、正規化と連結階層が本質です。有限 $N$ の補正には相互作用の情報が残ります。

## 3. 有限Gaussian行列でN次数を出発点から数える

上の $N^{2-k}$ を単なる標語にしないため、まず時空を持たない厳密な確率模型を作ります。ここで $N\times N$ Hermitian行列 $A$ とは、複素行列で $A_{ji}=\overline{A_{ij}}$ を満たすものです。対角成分は実数で $N$ 個、非対角の複素成分の実部・虚部はそれぞれ $N(N-1)/2$ 個なので、実自由度は $N^2$ 個です。この成分関係から

$$
\operatorname{tr}(A^2)
=\sum_{i=1}^N A_{ii}^2+2\sum_{1\le i<j\le N}|A_{ij}|^2
$$

であり、零行列以外では正です。これで $\operatorname{tr}(AB)$ はHermitian行列の実ベクトル空間上の内積となり、正規直交基底 $T_1,\ldots,T_{N^2}$ を取れます。各 $g_a$ を独立標準正規変数とし、その基底で行列 $M$ を展開して、

$$
M=\frac1{\sqrt N}\sum_{a=1}^{N^2}g_aT_a,\qquad
Y=\operatorname{tr}(M^2),\qquad X=Y-N
$$

とします。$M$ はHermitianなので $\operatorname{tr}(M^2)\ge0$ です。これは[QFT19の有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)だけで計算できます。

<a id="thm-qft63-matrix-cumulants"></a>

<!-- formal-statement-start -->
> **定理（Gaussian行列模型の連結累積量）**
> $N\ge1$ とし、上記の $N^2$ 個の独立標準正規変数から作った $X=\operatorname{tr}(M^2)-N$ を考える。このとき $\langle X\rangle=0$ で、全ての整数 $k\ge2$ に対して

$$
\kappa_k(X)=2^{k-1}(k-1)!\,N^{2-k}.
$$

> 特に $\kappa_2=2$、$\kappa_3=8/N$、$\kappa_4=48/N^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基底の直交性から $Y=N^{-1}\sum_a g_a^2$ へ還元し、各一変数Gaussian平方の母関数を積にしてから対数のべき級数を読みます。

<!-- proof-start -->
### 証明

$\operatorname{tr}(T_aT_b)=\delta_{ab}$ より

$$
Y=\frac1N\sum_{a,b}g_ag_b\operatorname{tr}(T_aT_b)
=\frac1N\sum_{a=1}^{N^2}g_a^2.
$$

独立性と一変数Gaussian積分から、$t<N/2$ の零近傍で

$$
\langle e^{tY}\rangle
=\prod_{a=1}^{N^2}\frac1{\sqrt{2\pi}}
\int_{\mathbb R}e^{-(1/2-t/N)g_a^2}\,dg_a
=(1-2t/N)^{-N^2/2}.
$$

従って $X=Y-N$ について

$$
\begin{aligned}
\log\langle e^{tX}\rangle
&=-Nt-\frac{N^2}{2}\log(1-2t/N)\\
&=-Nt+\frac{N^2}{2}\sum_{k=1}^\infty\frac{(2t/N)^k}{k}\\
&=\sum_{k=2}^\infty\frac{2^{k-1}}kN^{2-k}t^k,
\qquad |t|<N/2.
\end{aligned}
$$

$k=1$ の項は $-Nt+Nt=0$ と相殺します。定義の $t^k/k!$ 係数を比較すると $\kappa_k=k!\,2^{k-1}N^{2-k}/k=2^{k-1}(k-1)!N^{2-k}$。$k=2,3,4$ を順に代入すれば $2$、$2^2\cdot2!/N=8/N$、$2^3\cdot3!/N^2=48/N^2$ です。
<!-- proof-end -->

四次モーメントは[連結四点の定義](#def-qft63-connected-cumulants)で三つの二点積を加え直して

$$
\langle X^4\rangle=\kappa_4+3\kappa_2^2
=12+\frac{48}{N^2}
$$

と検算できます。$N=1$ では $X=g^2-1$ となり $\langle X^4\rangle=60$、式も $12+48=60$ です。行列の自由度が $N^2$ 個という構造によって、この例では連結三点・四点が抑制されました。**しかし零次元の計算から全てのゲージ理論やCFTの平面展開を証明したことにはなりません。**

## 4. 境界のある高次元CFT：半空間で何が変わるか

[QFT56の二次元境界自由場](../QFT56/index.md#thm-qft56-dirichlet-image)では、境界上で場を零にするDirichlet条件と法線微分を零にするNeumann条件を鏡像法で実現しました。ここでは **$d\ge3$ の質量零自由スカラー場**で同じ構成を行い、距離べきが対数ではなく $d-2$ になることを検証します。

半空間 $H=\{x=(\boldsymbol y,z)\in\mathbb R^{d-1}\times\mathbb R:z>0\}$ を取り、境界を $z=0$ とします。境界に平行な並進と回転は残りますが、境界に垂直な並進は対称性ではありません。境界を保存する拡大縮小では $(\boldsymbol y,z)\mapsto(\lambda\boldsymbol y,\lambda z)$ です。

最初に、境界までの距離 $z$ だけで決まる一次場の一体関数を考えます。境界条件と共形不変真空が存在しても、係数の値自体は理論ごとに異なります。

<a id="prop-qft63-boundary-one-point"></a>

<!-- formal-statement-start -->
> **命題（境界一次場の一体関数の距離則）**
> $d\ge3$ の半空間 $H$ 上で、境界に平行な並進に不変で、境界を保つ拡大縮小に共変な真空を考える。次元 $\Delta$ のbulkスカラー一次場 $\mathcal O(\boldsymbol y,z)$ の一体関数が存在するとき、ある理論・境界条件依存の定数 $A_{\mathcal O}$ により

$$
\langle\mathcal O(\boldsymbol y,z)\rangle_H
=\frac{A_{\mathcal O}}{(2z)^\Delta},\qquad z>0
$$

> と書ける。$A_{\mathcal O}=0$ も許される。
<!-- formal-statement-end -->

### 証明の見取り図

境界方向への並進で $\boldsymbol y$ 依存が消え、一次場の尺度則が一変数関数への斉次条件を与えます。

<!-- proof-start -->
### 証明

$F(z)=\langle\mathcal O(\boldsymbol y,z)\rangle_H$ は境界に平行な並進不変性より $\boldsymbol y$ に依りません。[一次場の拡大縮小則](../QFT48/index.md#def-qft48-scalar-primary)を真空へ適用すると、任意の $\lambda>0$ に対して $F(\lambda z)=\lambda^{-\Delta}F(z)$。$\lambda=z/z_0$ と取れば $F(z)=(z/z_0)^{-\Delta}F(z_0)$ です。特に $z_0=1/2$ を選び $A_{\mathcal O}=F(1/2)$ と置けば $F(z)=A_{\mathcal O}(2z)^{-\Delta}$ を得ます。
<!-- proof-end -->

**直接例と条件。** 奇対称性のため場の期待値が零なら $A_{\mathcal O}=0$ で、式を満たします。自由場の $\phi$ はDirichletまたは中心化Neumann状態では平均零です。一方、境界と整合する複合一次場には非零の係数が許されます。単なる尺度則だけでは境界条件の相関関数全体は決まりません。

境界上の二点を使わず、二つの**bulk**挿入点の位置を比較するには、境界までの距離を含む比を作ります。$x'=(\boldsymbol y',z')$、$z,z'>0$ として、同じ $x'$ とその鏡像 $x'^*=(\boldsymbol y',-z')$ までの距離を比べると

$$
|x-x'^*|^2=|\boldsymbol y-\boldsymbol y'|^2+(z+z')^2
=|x-x'|^2+4zz'
$$

となります。これが境界交差比の自然な出発点です。

<a id="def-qft63-boundary-ratio"></a>

<!-- formal-statement-start -->
> **定義（半空間の境界交差比）**
> $d\ge3$ のEuclid半空間 $H$ で、相異なる二つのbulk点 $x=(\boldsymbol y,z)$、$x'=(\boldsymbol y',z')$（$z,z'>0$）に対し

$$
\xi=\frac{|x-x'|^2}{4zz'}>0
$$

> を境界交差比と呼ぶ。境界を保存する平行移動・回転・拡大縮小・（定義される点での）反転の下で不変である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft63-boundary-ratio -->
**定義の確認**： $\boldsymbol y=\boldsymbol y'=0$、$z=1,z'=2$ とすると $|x-x'|^2=1$、$4zz'=8$ なので $\xi=1/8$。鏡像までの距離二乗は $9$ であり、$|x-x'|^2/|x-x'^*|^2=\xi/(1+\xi)=1/9$ と一致します。境界を保つ反転 $I(x)=x/|x|^2$ では $z\mapsto z/|x|^2$、[QFT48の反転距離恒等式](../QFT48/index.md#prop-qft48-inversion)で分子も $1/(|x|^2|x'|^2)$ 倍ですから、その倍率は分母と完全に相殺します。
<!-- definition-example-end -->

鏡像法は正則性と境界条件を両方確かめて初めてGreen核になります。[QFT48の質量零共分散](../QFT48/index.md#thm-qft48-massless-kernel)に現れた $c_d=\Gamma(d/2-1)/(4\pi^{d/2})$ を使います。以下の $\Delta_x=\sum_{j=1}^d\partial_{x_j}^2$ は第一引数 $x$ に作用するEuclidラプラシアンで、先のスケーリング次元 $\Delta$ とは別物です。また $\partial_z$ は $x=(\boldsymbol y,z)$ の法線座標だけを動かし、第二引数 $x'$ を固定する偏微分です。

<a id="thm-qft63-half-space-image"></a>

<!-- formal-statement-start -->
> **定理（半空間自由スカラー場の鏡像Green核）**
> 整数 $d\ge3$ の半空間 $H$ と質量零Euclid作用 $S_E=\frac12\int_H|\nabla\phi|^2\,d^dx$ を考える。無限遠で減衰する基本解について、$x,x'\in H$、$x\ne x'$ とすると

$$
G_D(x,x')=c_d\left(|x-x'|^{2-d}-|x-x'^*|^{2-d}\right),
$$

$$
G_N(x,x')=c_d\left(|x-x'|^{2-d}+|x-x'^*|^{2-d}\right)
$$

> はそれぞれ $-\Delta_xG_D(x,x')=\delta(x-x')$、$-\Delta_xG_N(x,x')=\delta(x-x')$ を $H$ 内の分布として満たし、境界で $G_D=0$、$\partial_zG_N=0$ を満たす。さらに相異なる点で

$$
G_{D/N}(x,x')
=c_d|x-x'|^{2-d}
\left[1\mp\left(\frac{\xi}{1+\xi}\right)^{(d-2)/2}\right]
$$

> と表せる（上符号がDirichlet）。
<!-- formal-statement-end -->

### 証明の見取り図

像点 $x'^*$ は半空間の外にあるので内部にデルタ源を加えません。境界では距離が等しくなり、二つの符号で値または法線微分が相殺されます。最後に距離比を $\xi$ へ換算します。

<!-- proof-start -->
### 証明

[全空間の質量零Green核](../QFT48/index.md#thm-qft48-massless-kernel) $C_d(s)=c_d|s|^{2-d}$ は $-\Delta C_d=\delta_0$ です。$x'\in H$、$x'^*\notin H$ なので、$H$ 内の試験関数に対して $-\Delta_x C_d(x-x')=\delta_{x'}$、$-\Delta_xC_d(x-x'^*)=0$。和と差の両方が内部の基本解です。

境界 $x=(\boldsymbol y,0)$ では $|x-x'|^2=|\boldsymbol y-\boldsymbol y'|^2+z'^2=|x-x'^*|^2$ なので、差の $G_D=0$。法線方向の微分は $r=|x-x'|$ として

$$
\partial_zr^{2-d}=(2-d)(z-z')r^{-d},
$$

鏡像の距離 $r_*=|x-x'^*|$ に対しては

$$
\partial_zr_*^{2-d}=(2-d)(z+z')r_*^{-d}.
$$

$z=0$ では $r=r_*$ かつ二式の値が互いに反対なので、和の $\partial_zG_N=0$。係数 $c_d$ は両項共通です。

最後に $r_*^2=r^2+4zz'=r^2(1+\xi)/\xi$ を用いると

$$
\frac{r_*^{2-d}}{r^{2-d}}
=\left(\frac{r^2}{r_*^2}\right)^{(d-2)/2}
=\left(\frac{\xi}{1+\xi}\right)^{(d-2)/2},
$$

よって交差比表示を得ます。さらに核の非負二次形式も確認します。半空間の試験関数 $f$ を、境界の反対側へ奇延長（$D$）または偶延長（$N$）したものを $f_D,f_N$ とします。[全空間の正の共分散](../QFT48/index.md#thm-qft48-massless-kernel)を $C_d$ と書くと、反射で移した積分領域を合わせて

$$
\int_{\mathbb R^d}\!\!\int_{\mathbb R^d}
\overline{f_{D/N}(x)}C_d(x-y)f_{D/N}(y)\,dx\,dy
=2\int_H\!\!\int_H
\overline{f(x)}G_{D/N}(x,y)f(y)\,dx\,dy\ge0
$$

です。右辺の符号は上の差（$D$）・和（$N$）と一致します。従って単なる微分方程式の形式解以上の、正のGaussian共分散を得ます。ただし、この二次形式の正性と場の全相関に対する反射陽性は同じ条件ではありません。
<!-- proof-end -->

**四次元の検算。** $d=4$ なら $c_4=1/(4\pi^2)$。$\boldsymbol y=\boldsymbol y'=0,z=1,z'=2$ について

$$
G_D=\frac1{4\pi^2}\left(1-\frac19\right)=\frac2{9\pi^2},
\qquad
G_N=\frac1{4\pi^2}\left(1+\frac19\right)=\frac5{18\pi^2}.
$$

境界を入れると、全空間の[二点関数の距離則](../QFT48/index.md#thm-qft48-primary-two-point)と異なり、二つのbulk点の相関にも $\xi$ の関数が残ります。それでも鏡像核が実際の量子論の相関関数となるには、選んだ境界条件・Gaussian構成・反射陽性などを確認する必要があります。

## 5. どこまでが境界CFTで、どこからがホログラフィーか

- **共形運動学**：一次場の変換則、二つのbulk交差比、境界までの距離の尺度則は対称性の帰結です。
- **模型依存の入力**：大Nの連結相関の階層、境界係数 $A_{\mathcal O}$、鏡像核の符号・正則化は追加の理論データです。
- **未導出の主張**：これらだけから高次元CFTに重力双対が存在すること、bulk場との辞書、面積公式、有限 $N$ の重力補正は導けません。そうした命題には別の仮定と構成が必要です。

特に「境界」という語には、**平坦なEuclid半空間の物理的境界**と、将来のホログラフィーで扱う**漸近的な重力時空の境界**という異なる意味があります。本章で計算したのは前者です。大N因子化も後者の存在を単独では保証しません。

## 6. 演習：交差比・連結性・鏡像を自分で計算する

<a id="ex-qft63-a01"></a>

### QFT63-A01 四点の交差比を数える

- Level: A
- 対応目標: 実座標の交差比と点の置換

$d=4$ の同一直線上に $x_1=0,x_2=e_1,x_3=2e_1,x_4=4e_1$ を置く。$u,v$ と $1\leftrightarrow3$ の交換後の $(u',v')$ を求めよ。

<!-- solution-start -->
### 詳細解答

六つの距離二乗は $r_{12}^2=1,r_{34}^2=4,r_{13}^2=4,r_{24}^2=9,r_{14}^2=16,r_{23}^2=1$ です。[交差比の定義](../QFT48/index.md#def-qft48-conformal-cross-ratios)の分母は $4\cdot9=36$ なので

$$
u=\frac{1\cdot4}{36}=\frac19,\qquad
v=\frac{16\cdot1}{36}=\frac49.
$$

交換後には $r_{32}^2r_{14}^2/(r_{31}^2r_{24}^2)=16/36=4/9$、もう一方は $r_{34}^2r_{21}^2/36=4/36=1/9$ です。つまり $(u',v')=(v,u)$ です。
<!-- solution-end -->

<a id="ex-qft63-a02"></a>

### QFT63-A02 Gaussian四点の三対合

- Level: A
- 対応目標: 縮約四点関数を距離で検算する

$\Delta=1$ で前問の四点を使い、$\mathcal G_{\mathrm{pair}}$ の三項の値と和を求めよ。

<!-- solution-start -->
### 詳細解答

[対合表示](#def-qft63-reduced-four-point)で第一項は $1$、第二項は $u^\Delta=1/9$、第三項は $(u/v)^\Delta=(1/9)/(4/9)=1/4$ です。分母を $36$ にそろえると

$$
\mathcal G_{\mathrm{pair}}=1+\frac19+\frac14
=\frac{36+4+9}{36}=\frac{49}{36}.
$$

四点の非縮約相関では前置因子が $(r_{12}^2r_{34}^2)^{-1}=1/4$ なので $G_4=49/144$ です。距離から直接計算しても $1/4+1/36+1/16=49/144$ となります。
<!-- solution-end -->

<a id="ex-qft63-a03"></a>

### QFT63-A03 境界一体関数の尺度

- Level: A
- 対応目標: 境界までの距離の次元依存

半空間の次元 $\Delta=2$ の一次場について $F(1)=3$ とする。尺度則を仮定し、$F(2)$ と係数 $A_{\mathcal O}$ を求めよ。

<!-- solution-start -->
### 詳細解答

[境界一体関数の命題](#prop-qft63-boundary-one-point)に $\lambda=2$、$z=1$ を代入して

$$
F(2)=2^{-2}F(1)=\frac34.
$$

また $F(1)=A_{\mathcal O}/2^2$ なので $A_{\mathcal O}=4F(1)=12$ です。$F(2)=12/(2\cdot2)^2=3/4$ とも一致します。
<!-- solution-end -->

<a id="ex-qft63-a04"></a>

### QFT63-A04 四次元鏡像核の値

- Level: A
- 対応目標: DirichletとNeumannの違い

$d=4$、$\boldsymbol y=\boldsymbol y'=0$、$z=1,z'=2$ とし、$c_4=1/(4\pi^2)$ を用いて $G_D,G_N$ を計算せよ。

<!-- solution-start -->
### 詳細解答

直接点の距離は $|x-x'|=1$、像点までの距離は $|x-x'^*|=3$ です。[鏡像Green核](#thm-qft63-half-space-image)で距離の指数は $2-d=-2$ ですから

$$
G_D=c_4(1-3^{-2})=\frac{8}{9}\frac1{4\pi^2}
=\frac2{9\pi^2},
$$

$$
G_N=c_4(1+3^{-2})=\frac{10}{9}\frac1{4\pi^2}
=\frac5{18\pi^2}.
$$

差の核は境界で値が相殺し、和の核は境界で法線微分が相殺するので、符号は入れ替えません。
<!-- solution-end -->

<a id="ex-qft63-a05"></a>

### QFT63-A05 行列跡の三次連結量

- Level: A
- 対応目標: 累積量の次数

[Gaussian行列模型](#thm-qft63-matrix-cumulants)で $N=10$ とする。$X$ の平均、分散、三次累積量を求めよ。

<!-- solution-start -->
### 詳細解答

定理の中心化により $\kappa_1=\langle X\rangle=0$ です。$k=2$ は $2^{1}1!\,10^0=2$、$k=3$ は $2^2 2!\,10^{-1}=8/10=4/5$ です。平均零なので三次累積量は三次中心モーメント $\langle X^3\rangle$ と一致します。$\kappa_3$ は $N\to\infty$ で $1/N$ に比例して減少しますが、分散は2のままです。
<!-- solution-end -->

<a id="ex-qft63-b01"></a>

### QFT63-B01 置換と交差方程式

- Level: B
- 対応目標: 四点の規格化因子を含めた交差対称性

同一bosonスカラー一次場の縮約関数を $G_4=(r_{12}r_{34})^{-2\Delta}\mathcal G(u,v)$ とする。$1\leftrightarrow3$ を用い、交差対称式を導け。さらに $\mathcal G_0=1+u^\Delta+(u/v)^\Delta$ が満たすことを検算せよ。

<!-- solution-start -->
### 詳細解答

交換により $r_{12}r_{34}\mapsto r_{23}r_{14}$、$(u,v)\mapsto(v,u)$ です。相関が同じなので

$$
\frac{\mathcal G(u,v)}{(r_{12}r_{34})^{2\Delta}}
=\frac{\mathcal G(v,u)}{(r_{23}r_{14})^{2\Delta}}.
$$

$\mathcal G(v,u)$ の前に出る比は $(r_{12}r_{34}/(r_{23}r_{14}))^{2\Delta}=(u/v)^\Delta$ です。従って $\mathcal G(u,v)=(u/v)^\Delta\mathcal G(v,u)$。後半は

$$
(u/v)^\Delta\mathcal G_0(v,u)
=(u/v)^\Delta[1+v^\Delta+(v/u)^\Delta]
=(u/v)^\Delta+u^\Delta+1=\mathcal G_0(u,v)
$$

となり、三対合の置換が正しく反映されています。
<!-- solution-end -->

<a id="ex-qft63-b02"></a>

### QFT63-B02 二点補正と四点連結補正

- Level: B
- 対応目標: 誤差の次数を明示した因子化

平均零の $X_N$ が $\langle X_N^2\rangle=a+b/N^2+O(N^{-4})$、$\kappa_4(X_N)=c/N^2+O(N^{-4})$ を満たす（$a,b,c$ は $N$ に依らない）とする。$\langle X_N^4\rangle$ を $N^{-2}$ まで求めよ。

<!-- solution-start -->
### 詳細解答

[連結四点の定義](#def-qft63-connected-cumulants)で同じ変数を四回置けば $\langle X_N^4\rangle=\kappa_4+3\langle X_N^2\rangle^2$ です。まず

$$
\left(a+\frac b{N^2}+O(N^{-4})\right)^2
=a^2+\frac{2ab}{N^2}+O(N^{-4}),
$$

なので

$$
\langle X_N^4\rangle
=3a^2+\frac{6ab+c}{N^2}+O(N^{-4}).
$$

四点の $N^{-2}$ 補正には連結部分 $c$ だけでなく二点の補正 $b$ も寄与します。
<!-- solution-end -->

<a id="ex-qft63-b03"></a>

### QFT63-B03 境界反転と鏡像距離

- Level: B
- 対応目標: 境界交差比の共形不変性

半空間の二点 $x=(\boldsymbol y,z)$、$x'=(\boldsymbol y',z')$ に境界を保つ反転 $I(x)=x/|x|^2$ を施す。$\xi$ が不変であること、および $r^2/r_*^2=\xi/(1+\xi)$ を導け。

<!-- solution-start -->
### 詳細解答

反転後の法線座標は $\widetilde z=z/|x|^2$、$\widetilde z'=z'/|x'|^2$ で、両者は正です。[反転距離恒等式](../QFT48/index.md#prop-qft48-inversion)により

$$
|I(x)-I(x')|^2=\frac{|x-x'|^2}{|x|^2|x'|^2}.
$$

従って

$$
\widetilde\xi
=\frac{|x-x'|^2/(|x|^2|x'|^2)}
{4zz'/(|x|^2|x'|^2)}=\xi.
$$

一方、鏡像の座標では $r_*^2=|\boldsymbol y-\boldsymbol y'|^2+(z+z')^2=r^2+4zz'$。$r^2=4zz'\xi$ を代入すると $r_*^2=4zz'(1+\xi)$ で、両辺の比が結論です。
<!-- solution-end -->

<a id="ex-qft63-b04"></a>

### QFT63-B04 四次累積量と有限N補正

- Level: B
- 対応目標: 行列模型の母関数から四次モーメントへ

$X=N^{-1}\sum_{a=1}^{N^2}g_a^2-N$、$g_a$ は独立標準正規とする。$\log\langle e^{tX}\rangle$ の $t^4$ 係数を求め、$\langle X^4\rangle$ を計算せよ。

<!-- solution-start -->
### 詳細解答

各Gaussian平方の積分から $\langle e^{tX}\rangle=e^{-Nt}(1-2t/N)^{-N^2/2}$。$-\log(1-s)=s+s^2/2+s^3/3+s^4/4+\cdots$ で $s=2t/N$ を入れると、$t^4$ の係数は

$$
\frac{N^2}{2}\frac{(2/N)^4}{4}
=\frac2{N^2}.
$$

したがって $\kappa_4=4!\cdot2/N^2=48/N^2$。同じ展開で $\kappa_2=2$ だから、[四点と連結部分の分解](#def-qft63-connected-cumulants)より

$$
\langle X^4\rangle=\kappa_4+3\kappa_2^2
=\frac{48}{N^2}+3\cdot4
=12+\frac{48}{N^2}.
$$

正規分布なら四次累積量は0ですが、有限 $N$ のこの $X$ はGaussianそのものではありません。
<!-- solution-end -->

<a id="ex-qft63-c01"></a>

### QFT63-C01 全空間と境界の四点を比較する

- Level: C
- 対応目標: Gaussian因子化・交差比・境界条件の統合

$d=4$ の質量零自由スカラー場（$\Delta=1$）を取り、同じ境界平行座標 $\boldsymbol y=0$、法線座標 $z_1=1,z_2=2,z_3=3,z_4=4$ の四点を考える。$c_4=1/(4\pi^2)$ とする。

1. 全空間での四点相関をGaussian対合から $c_4^2$ の倍数として求め、$u,v,\mathcal G$ との関係を確かめよ。
2. Dirichlet半空間の核 $K_{ij}=c_4[(z_i-z_j)^{-2}-(z_i+z_j)^{-2}]$ を用いて、四点の三対合を $c_4^2$ の倍数で表せ。
3. 二つの値が異なる理由と、この差を有限 $N$ の連結四点相関や重力双対の効果と断定できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**(1)** 全空間の二点核は $c_4/(z_i-z_j)^2$。三対合の距離二乗の逆積をそれぞれ数えると

$$
\begin{aligned}
G_4^{\mathrm{full}}/c_4^2
&=\frac1{(1-2)^2(3-4)^2}
+\frac1{(1-3)^2(2-4)^2}
+\frac1{(1-4)^2(2-3)^2}\\
&=1+\frac1{16}+\frac19=\frac{169}{144}.
\end{aligned}
$$

$r_{12}^2r_{34}^2=1$、$r_{13}^2r_{24}^2=16$、$r_{14}^2r_{23}^2=9$ なので $u=1/16$、$v=9/16$、$u/v=1/9$。従って[縮約四点の式](#def-qft63-reduced-four-point)で $\mathcal G=1+1/16+1/9=169/144$ と一致します。ここでは二点規格化が $c_4$ なので、縮約関数は場を $\phi/\sqrt{c_4}$ に再規格化したものです。

**(2)** [境界鏡像核](#thm-qft63-half-space-image)の距離差を各組で計算します。

$$
\begin{array}{lll}
K_{12}/c_4=1-1/9=8/9,&K_{34}/c_4=1-1/49=48/49,\\
K_{13}/c_4=1/4-1/16=3/16,&K_{24}/c_4=1/4-1/36=2/9,\\
K_{14}/c_4=1/9-1/25=16/225,&K_{23}/c_4=1-1/25=24/25.
\end{array}
$$

この自由Gaussian場の四点は[Wick対合](../QFT19/index.md#thm-qft19-boson-wick)で

$$
\begin{aligned}
G_4^{D}/c_4^2
&=\frac89\frac{48}{49}
+\frac3{16}\frac29
+\frac{16}{225}\frac{24}{25}\\
&=\frac{128}{147}+\frac1{24}+\frac{128}{1875}.
\end{aligned}
$$

どの二点にも対応する鏡像があるため、三対合だけでも全空間の数値とは異なります。

**(3)** 全空間の並進対称性と違って、境界は垂直方向の並進を壊し、各二点核を鏡像項だけ変えます。どちらの模型でも連結四点は零ですから、差を連結相関の $1/N^2$ 効果と解釈できません。ここで $N$ も重力時空も導入していないので、重力双対に帰属させる根拠はありません。境界CFTの四点は一般にbulkの二交差比だけでなく境界との配置にも依存し、全空間の交差式を同じ関数へそのまま適用できないことにも注意します。
<!-- solution-end -->

## この章で確認したこと

高次元の四点関数では共形対称性だけで関数 $\mathcal G(u,v)$ は決まりません。局所bosonの置換は交差方程式を課し、連結相関が $N^{2-k}$ で抑えられる**場合には**対合型の先頭項が生じます。その次数は有限Gaussian行列で厳密に練習できました。境界は新しい距離比 $\xi$ と鏡像核を生みますが、共形対称性・大N・境界だけからホログラフィーの力学を得たわけではありません。
