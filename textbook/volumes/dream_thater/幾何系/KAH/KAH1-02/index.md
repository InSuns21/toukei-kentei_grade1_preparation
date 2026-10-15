# KAH1-02 基本(1,1)形式とKähler条件

<!-- definition-example-audit: strict -->

## 1. 面積形式を複素座標で判定する

前章では、複素構造 $J$ と両立する実計量 $g_{\mathbb R}$ から[基本2形式](../KAH1-01/index.md#def-kah1-01-fundamental-form) $\omega(u,v)=g_{\mathbb R}(Ju,v)$ を作った。これが実交代かつ非退化であっても、[Kähler構造の定義](../KAH1-01/index.md#def-kah1-01-kahler-structure)にある $d\omega=0$ は別に調べなければならない。実座標で外微分を展開し続けるより、正則座標の $(1,1)$ 型を使うと何が消えるかを先に見分けられる。

本章は複素次元 $n\geq1$ の複素多様体 $X$ と滑らかなHermite計量 $g_{\mathbb R}$ を扱う。正則座標 $z^j=x^j+iy^j$ で $\partial_j=\partial/\partial z^j$、$\partial_{\bar j}=\partial/\partial\bar z^j$ と書く。$\partial_j=\tfrac12(\partial_{x^j}-i\partial_{y^j})$ という[Wirtinger微分の定義](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)を使い、以下、重複する添字は $1,\ldots,n$ にわたって総和する。

まず $X=\mathbb C$ のEuclid計量の基本形式は、前章の[係数の計算](../KAH1-01/index.md#prop-kah1-01-hermitian-inner-product)で確かめたとおり

$$
dx\wedge dy=\frac{i}{2}\,dz\wedge d\bar z
$$

である。一般には $1/2$ をすべての式へ一律に足すのではなく、局所係数 $g_{i\bar j}$ 自体へ取り込む。

## 2. 実(1,1)形式の正値性をどこで測るか

[型分解](../../CM/CM2-01/index.md#thm-cm2-01-type-decomposition)により、$(1,1)$ 形式は $dz^i\wedge d\bar z^j$ の線形結合で表せる。しかし実であることと、長さを復元できるほど正であることは異なる。$(1,0)$ 接ベクトル $v=v^i\partial_i$ に対して $\bar v=\overline{v^i}\partial_{\bar i}$ を対応させ、$\omega(v,\bar v)$ に現れる $i$ を除いた値を調べよう。

<a id="def-kah1-02-positive-form"></a>

<!-- formal-statement-start -->
> **定義（正の実(1,1)形式）**  
> 複素多様体 $X$ 上の滑らかな実2形式 $\omega$ が $(1,1)$ 型であり、任意の点 $x$ および零でない $v\in T_x^{1,0}X$ について

$$
-i\,\omega_x(v,\bar v)>0
$$

> が成立するとき、$\omega$ を**正の実(1,1)形式**という。ここで $\omega$ は複素化した接空間へ複素双線形に延長して評価する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-02-positive-form -->
**定義の確認**。$\mathbb C$ の $z=x+iy$ において $\omega_0=\frac i2 dz\wedge d\bar z$ を考える。実2形式 $dx\wedge dy$ に等しいので実性があり、$dz\wedge d\bar z$ の項だけだから型は $(1,1)$ である。$v=c\partial_z$（$c\neq0$）に対し、$dz(v)=c$、$d\bar z(\bar v)=\bar c$、一方 $dz(\bar v)=d\bar z(v)=0$ なので

$$
-i\,\omega_0(v,\bar v)
=-i\left(\frac i2 c\bar c\right)=\frac{|c|^2}{2}>0.
$$

実性・型・正値性を独立に確かめた。閉性はこの定義に含めない。
<!-- definition-example-end -->

局所座標での判定へ移るため、係数を $i$ 倍で取り出す。[実(1,1)形式の係数判定](../../CM/CM2-01/index.md#prop-cm2-01-real-eleven)は、次の行列条件の出発点である。

<a id="prop-kah1-02-matrix-criterion"></a>

<!-- formal-statement-start -->
> **命題（正の基本形式とHermite行列）**  
> $X$ の正則座標領域で滑らかな複素数値関数 $g_{i\bar j}$ を用いて

$$
\omega=i\sum_{i,j=1}^{n}g_{i\bar j}\,dz^i\wedge d\bar z^j
$$

> とする。$\omega$ が実(1,1)形式である必要十分条件は $g_{i\bar j}=\overline{g_{j\bar i}}$ である。この条件下で $\omega$ が正である必要十分条件は、任意の零でない $c\in\mathbb C^n$ に対し

$$
\sum_{i,j=1}^{n}g_{i\bar j}c^i\overline{c^j}>0
$$

> が成立することである。正の場合、$\omega$ は唯一の $J$ と両立する滑らかなRiemann計量の基本形式となる。
<!-- formal-statement-end -->

### 証明の見取り図

実性は外積を共役した際の二つの1形式の交換符号から求める。正値性は $(v,\bar v)$ への評価そのものであり、計量の復元は前章の[復元命題](../KAH1-01/index.md#prop-kah1-01-reconstruction)を使う。ただしその前に、複素化したベクトルから実接ベクトルへ戻す計算を示す。

<!-- proof-start -->
### 証明

$(1,1)$ 型は表示から従う。共役を取り、外積の交代性で順序を戻すと

$$
\begin{aligned}
\overline{\omega}
&=-i\,\overline{g_{i\bar j}}\,d\bar z^i\wedge dz^j\\
&=i\,\overline{g_{i\bar j}}\,dz^j\wedge d\bar z^i\\
&=i\,\overline{g_{j\bar i}}\,dz^i\wedge d\bar z^j.
\end{aligned}
$$

[型別余接空間の基底](../../CM/CM2-01/index.md#prop-cm2-01-cotangent-splitting)により $dz^i\wedge d\bar z^j$ は独立だから、$\bar\omega=\omega$ とHermite対称性は同値である。$v=c^i\partial_i$ なら $dz^i(v)=c^i$、$d\bar z^j(\bar v)=\overline{c^j}$、交差評価は零なので

$$
-i\,\omega(v,\bar v)=g_{i\bar j}c^i\overline{c^j}.
$$

よって正値条件も同値。逆方向の計量の復元を具体的に見る。実接ベクトル $u$ に対し $a^i=dz^i(u)$ と置くと、その $(1,0)$ 成分は $u^{1,0}=\frac12(u-iJu)=a^i\partial_i$ である。$Ju$ の座標は $ia^i$ だから

$$
\begin{aligned}
\omega(u,Ju)
&=i\,g_{i\bar j}\{a^i\overline{ia^j}-(ia^i)\overline{a^j}\}\\
&=2g_{i\bar j}a^i\overline{a^j}>0\qquad(u\neq0).
\end{aligned}
$$

実性から $\omega$ は実交代形式、$(1,1)$ 型から $\omega(Ju,Jv)=\omega(u,v)$ となる。最後の不変性は $dz(Ju)=i\,dz(u)$ と $d\bar z(Ju)=-i\,d\bar z(u)$ を各外積に代入しても確かめられる。そこで $g_{\mathbb R}(u,v)=\omega(u,Jv)$ と置けば、[復元命題](../KAH1-01/index.md#prop-kah1-01-reconstruction)により対称・正定値・$J$ 両立となり、その基本形式は元の $\omega$ である。係数の滑らかさは $g_{\mathbb R}$ にも受け継がれる。復元式 $g_{\mathbb R}(u,v)=\omega(u,Jv)$ は $\omega,J$ が与えられれば値を一つに定めるから、計量の一意性も従う。$\square$
<!-- proof-end -->

この復元式を正則座標で書けば、$a^i=dz^i(u)$、$b^j=dz^j(v)$ に対して

$$
g_{\mathbb R}(u,v)=2\operatorname{Re}\!\left(g_{i\bar j}a^i\overline{b^j}\right).
$$

とくに標準Euclid計量なら $g_{i\bar j}=\delta_{ij}/2$。この係数は実計量の長さと上記の正値判定をつなぐ変換から決まり、任意に選んだ正規化ではない。

**行列による直接例**。$\mathbb C^2$ 上で $g_{1\bar1}=2$、$g_{2\bar2}=3$、$g_{1\bar2}=i$、$g_{2\bar1}=-i$ とする。共役対称性を満たし、

$$
2|c^1|^2+3|c^2|^2+i c^1\overline{c^2}-i c^2\overline{c^1}
=2\left|c^1-\frac i2c^2\right|^2+\frac52|c^2|^2>0
$$

（$c\neq0$）。したがって正の実(1,1)形式となる。係数が定数なので、この例ではさらに $d\omega=0$ が成り立つ。

## 3. Kähler条件はどの係数の対称性か

[型別外微分](../../CM/CM2-02/index.md#def-cm2-02-dolbeault-operators)の構成により、$(1,1)$ 形式には $\partial\omega$（$(2,1)$ 型）と $\bar\partial\omega$（$(1,2)$ 型）があり、$d\omega=\partial\omega+\bar\partial\omega$ である。二つの型は異なるため、和が零なら各々が零となる。さらに実形式では一方を計算すればもう一方は複素共役から従う。

<a id="thm-kah1-02-local-closedness"></a>

<!-- formal-statement-start -->
> **定理（Kähler閉性の局所係数条件）**  
> 複素次元 $n$ の複素多様体 $X$ 上の滑らかなHermite計量の基本形式を、任意の正則座標で

$$
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j
$$

> と書く。このとき以下は同値である。
>
> 1. $d\omega=0$。
> 2. $\partial\omega=0$ かつ $\bar\partial\omega=0$。
> 3. すべての $i,j,k$ について次の等式が成り立つ。

$$
\partial_k g_{i\bar j}=\partial_i g_{k\bar j}.
$$

> 同値な共役条件は $\partial_{\bar k}g_{i\bar j}=\partial_{\bar j}g_{i\bar k}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず局所公式に外微分を適用し、二つの $dz$ を交換した係数を比較する。次にHermite対称性を共役して $(1,2)$ 側も確認する。閉性を正定値性と取り違えないことが肝心である。

<!-- proof-start -->
### 証明

[型別外微分の局所公式](../../CM/CM2-02/index.md#thm-cm2-02-local-formula)を $\omega$ の係数 $g_{i\bar j}$ に適用する。座標1形式は閉じているので、微分は係数だけに作用し、

$$
\partial\omega
=i(\partial_k g_{i\bar j})\,dz^k\wedge dz^i\wedge d\bar z^j.
$$

$i=k$ の項は零。$k<i$ の組を一度ずつ集めると、$dz^i\wedge dz^k=-dz^k\wedge dz^i$ を使って

$$
\partial\omega
=i\sum_{k<i,j}(\partial_k g_{i\bar j}-\partial_i g_{k\bar j})
\,dz^k\wedge dz^i\wedge d\bar z^j.
$$

[型分解の一意性](../../CM/CM2-01/index.md#thm-cm2-01-type-decomposition)から、$\partial\omega=0$ は括弧内がすべて零となることと同値である。$i=k$ でも式は恒等的なので、添字を制限しない第3条件を得る。

他方、反正則方向を微分して、最初に $d\bar z^k$ を $dz^i$ の右へ一度動かすと

$$
\begin{aligned}
\bar\partial\omega
&=i(\partial_{\bar k}g_{i\bar j})\,d\bar z^k\wedge dz^i\wedge d\bar z^j\\
&=-i\sum_{i,k<j}
(\partial_{\bar k}g_{i\bar j}-\partial_{\bar j}g_{i\bar k})
\,dz^i\wedge d\bar z^k\wedge d\bar z^j.
\end{aligned}
$$

Hermite対称性 $g_{i\bar j}=\overline{g_{j\bar i}}$ の下で、第3条件を共役し、$(k,i,j)$ の名前を付け替えると

$$
\partial_{\bar k}g_{i\bar j}
=\partial_{\bar j}g_{i\bar k}
$$

を得る。逆向きも同じ共役と添字交換で従う。したがって $\partial\omega=0$ と $\bar\partial\omega=0$ は実 $(1,1)$ 形式について同値である。最後に $d\omega$ の $(2,1)$ 成分と $(1,2)$ 成分は[型分解](../../CM/CM2-01/index.md#thm-cm2-01-type-decomposition)により相殺し得ないので、第1・第2条件も同値である。$\square$
<!-- proof-end -->

この局所条件は正則座標で計算するための方法であって、座標に依存する新しい幾何の定義ではない。もともとの $d\omega=0$ は座標に依存しない。前章で定義したKähler構造は、**正値Hermite行列を持つこと**と**上の偏微分対称性**を同時に要求する。

## 4. 閉性・正値性・複素次元を別々に検査する

**複素次元1** では上の係数条件は $i=k=1$ しかなく、左右が一致する。外微分の次数から見ても実次元2上の3形式は零である。従って複素曲線上の任意の滑らかなHermite計量はKählerである。これは次元1に特有であり、次元2以上へ一般化できない。

**非Kählerの局所例**。$\mathbb C^2$ で次の係数行列を与える。

$$
(g_{i\bar j})=
\begin{pmatrix}1&0\\0&1+|z^1|^2\end{pmatrix}.
$$

対角成分は正、行列はHermite対称、従って[係数判定](#prop-kah1-02-matrix-criterion)で正の基本形式が得られる。しかし $k=1,i=2,j=2$ として[局所閉性定理](#thm-kah1-02-local-closedness)の両辺を計算すると

$$
\partial_1g_{2\bar2}=\bar z^1,\qquad
\partial_2g_{1\bar2}=0.
$$

$z^1\neq0$ で異なるのでKählerではない。実際に外微分を求めると

$$
\partial\omega=i\bar z^1\,dz^1\wedge dz^2\wedge d\bar z^2,
$$

となる。一方 $\partial_{\bar1}(1+|z^1|^2)=z^1$ を使うと

$
\bar\partial\omega
=i z^1\,d\bar z^1\wedge dz^2\wedge d\bar z^2
=-i z^1\,dz^2\wedge d\bar z^1\wedge d\bar z^2.
$

二つの項はそれぞれ $(2,1)$ 型と $(1,2)$ 型なので相殺できない。**正値であっても閉性は破れる**。

**閉じた非定数の局所例**。$t\ge0$ として $\mathbb C^2$ 上で

$$
\varphi=|z^1|^2+|z^2|^2+t|z^1|^2|z^2|^2
$$

を考え、$g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ と置く。これは後に扱う局所ポテンシャルの特別な構成例であり、あらゆる閉形式がこの形で表せることをここで仮定するわけではない。偏微分を順に行うと

$$
(g_{i\bar j})=
\begin{pmatrix}
1+t|z^2|^2&t\bar z^1z^2\\
tz^1\bar z^2&1+t|z^1|^2
\end{pmatrix}.
$$

Hermite対称で、第一主座小行列式 $1+t|z^2|^2>0$ と行列式

$$
(1+t|z^2|^2)(1+t|z^1|^2)-t^2|z^1z^2|^2
=1+t(|z^1|^2+|z^2|^2)>0
$$

から正定値となる。[局所閉性定理](#thm-kah1-02-local-closedness)を確かめるため、$j=1,2$ ごとに

$$
\begin{aligned}
\partial_2g_{1\bar1}&=t\bar z^2
=\partial_1g_{2\bar1},\\
\partial_1g_{2\bar2}&=t\bar z^1
=\partial_2g_{1\bar2}
\end{aligned}
$$

を計算する。これは閉性の全非自明条件を満たす。したがって非定数係数であってもKähler形式となる。

ここでポテンシャルを先に選ぶ発想には理由がある。$g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ なら滑らかさによる混合偏微分の交換で、閉性の係数等式が自動的に成立する。

<a id="prop-kah1-02-potential-suffices"></a>

<!-- formal-statement-start -->
> **命題（局所ポテンシャルからのKähler形式）**  
> 複素多様体 $X$ の正則座標領域 $U$ 上に滑らかな実関数 $\varphi$ があり、行列 $(\partial_i\partial_{\bar j}\varphi)$ が各点で正定値であるとする。このとき

$$
\omega=i\,\partial\bar\partial\varphi
=i(\partial_i\partial_{\bar j}\varphi)\,dz^i\wedge d\bar z^j
$$

> は $U$ 上のKähler形式である。
<!-- formal-statement-end -->

### 証明の見取り図

正値性は前の行列判定を使う。$\partial\bar\partial\varphi$ の符号を確かめてから、係数の三階偏微分を交換する。

<!-- proof-start -->
### 証明

実関数 $\varphi$ に対して $\overline{\partial_i\partial_{\bar j}\varphi}=\partial_j\partial_{\bar i}\varphi$ だから係数行列はHermite対称。正定値性の仮定と[係数判定](#prop-kah1-02-matrix-criterion)により正の実(1,1)形式であり、両立計量を復元できる。

さらに $g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ に対し

$$
\partial_k g_{i\bar j}
=\partial_k\partial_i\partial_{\bar j}\varphi
=\partial_i\partial_k\partial_{\bar j}\varphi
=\partial_i g_{k\bar j}.
$$

滑らかな関数の偏微分交換が使えるため、[局所閉性定理](#thm-kah1-02-local-closedness)から $d\omega=0$ を得る。符号は $\bar\partial\varphi=(\partial_{\bar j}\varphi)d\bar z^j$ の後に $\partial$ を作用させた順序で固定されている。$\square$
<!-- proof-end -->

逆向き、すなわち閉じた実(1,1)形式が**局所的に**このように表せることは次章以降の主題である。ここでは「十分条件」と「一般の存在定理」を区別しておく。

## 5. 演習

各題で (i) 実性・型、(ii) 正値性、(iii) 閉性を別々の判定として扱う。解答に使う導出は[係数判定](#prop-kah1-02-matrix-criterion)と[局所閉性定理](#thm-kah1-02-local-closedness)へ戻って確認する。

### Level A

<a id="ex-kah1-02-a01"></a>
#### KAH1-02-A01 対角係数と正値性
- Level: A

$\mathbb C^2$ 上で $\omega=i(2\,dz^1\wedge d\bar z^1+3\,dz^2\wedge d\bar z^2)$ とする。実性・$(1,1)$ 型・正値性・閉性をそれぞれ示せ。

<!-- solution-start -->
**詳細解答**。係数行列は $\operatorname{diag}(2,3)$ でHermite対称であるから実 $(1,1)$ 形式。零でない $c$ に対し $2|c^1|^2+3|c^2|^2>0$ なので正値である。全係数が定数ゆえ $\partial_k g_{i\bar j}=0=\partial_i g_{k\bar j}$、したがって $d\omega=0$。各条件を別々に確認した。
<!-- solution-end -->

<a id="ex-kah1-02-a02"></a>
#### KAH1-02-A02 共役の位置を検算する
- Level: A

$\omega=i(2\,dz^1\wedge d\bar z^1+i\,dz^1\wedge d\bar z^2-i\,dz^2\wedge d\bar z^1+3\,dz^2\wedge d\bar z^2)$ の係数行列を作り、実性と正値性を判定せよ。

<!-- solution-start -->
**詳細解答**。$H=\begin{pmatrix}2&i\\-i&3\end{pmatrix}$。非対角成分は $H_{2\bar1}=\overline{H_{1\bar2}}$ であり、対角成分は実数なので $\omega$ は実 $(1,1)$ 型。任意の $c$ に対し

$$
c^TH\bar c
=2|c^1|^2+3|c^2|^2+ic^1\bar c^2-ic^2\bar c^1
=2\left|c^1-\frac i2c^2\right|^2+\frac52|c^2|^2.
$$

どちらかの $c^j$ が非零なら右辺は正だから正値。$H$ は定数なので閉性も成り立つ。
<!-- solution-end -->

<a id="ex-kah1-02-a03"></a>
#### KAH1-02-A03 分離した係数
- Level: A

$\mathbb C^2$ 上で $g_{1\bar1}=1+|z^1|^2$、$g_{2\bar2}=2+|z^2|^2$、非対角成分は零とする。この基本形式がKählerであることを示せ。

<!-- solution-start -->
**詳細解答**。係数は実対角で、$1+|z^1|^2>0$、$2+|z^2|^2>0$ なのでHermite対称かつ正定値。非自明な閉性の式は

$$
\partial_1g_{2\bar2}=\partial_1(2+z^2\bar z^2)=0
=\partial_2g_{1\bar2},
$$

および $\partial_2g_{1\bar1}=0=\partial_1g_{2\bar1}$ である。従って[局所閉性定理](#thm-kah1-02-local-closedness)で閉じる。係数が定数でなくても閉性は成立し得る。
<!-- solution-end -->

<a id="ex-kah1-02-a04"></a>
#### KAH1-02-A04 複素曲線の場合
- Level: A

$\mathbb C$ 上の $g_{1\bar1}(z)=e^{|z|^2}$ について正値性と閉性を示し、一般の正の滑らかな $g_{1\bar1}(z)$ にも結論が成り立つ理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$e^{|z|^2}>0$ で実数なのでHermite係数の条件を満たす。$\omega=i e^{|z|^2} dz\wedge d\bar z$ は正の実 $(1,1)$ 形式である。$d\omega$ は実次元2上の3形式だから零。係数条件でも $i=k=1$ の恒等式 $\partial_1g_{1\bar1}=\partial_1g_{1\bar1}$ 以外になく、任意の正の滑らかな係数でKählerとなる。
<!-- solution-end -->

### Level B

<a id="ex-kah1-02-b01"></a>
#### KAH1-02-B01 正だが閉じない例
- Level: B

$\mathbb C^2$ 上で $H=\operatorname{diag}(1,1+|z^1|^2)$ とする。正値性を示し、$\partial\omega$ を直接計算してKählerでない点を特定せよ。

<!-- solution-start -->
**詳細解答**。任意の零でない $c$ に対して $c^TH\bar c=|c^1|^2+(1+|z^1|^2)|c^2|^2>0$ である。第一係数の微分は零、第二係数では $\partial(1+|z^1|^2)=\bar z^1 dz^1$ なので

$$
\begin{aligned}
\partial\omega
&=i\,\bar z^1 dz^1\wedge dz^2\wedge d\bar z^2.
\end{aligned}
$$

$z^1\ne0$ なら基底3形式の係数が非零。$z^1=0$ では $\partial\omega$ は零だが、$X$ 全体で $d\omega=0$ ではないためKähler計量ではない。破れるのは正値性でなく外微分の閉性である。
<!-- solution-end -->

<a id="ex-kah1-02-b02"></a>
#### KAH1-02-B02 混合ポテンシャルの検算
- Level: B

$t>0$ として $\varphi=|z^1|^2+|z^2|^2+t|z^1|^2|z^2|^2$ と置く。$H=(\partial_i\partial_{\bar j}\varphi)$ を導出し、正値性と閉性の両方を示せ。

<!-- solution-start -->
**詳細解答**。例えば

$$
\partial_{\bar1}\varphi=z^1(1+t|z^2|^2),\qquad
\partial_2\partial_{\bar1}\varphi=t z^1\bar z^2.
$$

他の成分も同じ順序で微分すると

$$
H=\begin{pmatrix}
1+t|z^2|^2&t\bar z^1 z^2\\
t z^1\bar z^2&1+t|z^1|^2
\end{pmatrix}.
$$

第一対角成分が正、$\det H=1+t(|z^1|^2+|z^2|^2)>0$ より正定値。閉性は $\partial_2 H_{1\bar1}=t\bar z^2=\partial_1H_{2\bar1}$ と $\partial_1H_{2\bar2}=t\bar z^1=\partial_2H_{1\bar2}$ で検算する。$H$ はHermite対称なので、共役側の条件も従い $d\omega=0$。
<!-- solution-end -->

<a id="ex-kah1-02-b03"></a>
#### KAH1-02-B03 正則引き戻しと退化
- Level: B

$F:\mathbb C^2\to\mathbb C^2$、$F(z^1,z^2)=(2z^1,z^2)$ とし、目標空間の $\omega_0=\frac i2(dw^1\wedge d\bar w^1+dw^2\wedge d\bar w^2)$ を引き戻せ。得た形式の正値性・閉性を確かめよ。次に $F(z^1,z^2)=(z^1,0)$ へ変えると正値性はどうなるか。

<!-- solution-start -->
**詳細解答**。第一の写像では $dw^1=2dz^1$、$dw^2=dz^2$、共役方向でも係数 $2$ が出るので

$$
F^*\omega_0=\frac i2(4\,dz^1\wedge d\bar z^1+dz^2\wedge d\bar z^2).
$$

行列 $\operatorname{diag}(2,1/2)$ は正定値、係数が定数だから閉じる。一方、第二の写像は $dw^1=dz^1$、$dw^2=0$ であるため

$$
F^*\omega_0=\frac i2 dz^1\wedge d\bar z^1.
$$

$v=\partial_2\ne0$ に対し $-i(F^*\omega_0)(v,\bar v)=0$ となる。閉性は保たれるが正値性は失われる。写像の微分が第二方向を消すことが破綻の機構である。
<!-- solution-end -->

### Level C

<a id="ex-kah1-02-c01"></a>
#### KAH1-02-C01 正値性と閉性を同時に分類する
- Level: C

実定数 $a,b$ に対し $\mathbb C^2$ 全体で

$$
H(z)=
\begin{pmatrix}
1+a|z^2|^2&b\bar z^1z^2\\
bz^1\bar z^2&1+a|z^1|^2
\end{pmatrix}
$$

と置く。$\omega=iH_{i\bar j}dz^i\wedge d\bar z^j$ が (1) 全点で正の実$(1,1)$形式となるための必要十分条件、(2) さらにKähler形式となるための必要十分条件を求めよ。(2) が成り立つときの実ポテンシャルも一つ与えて直接検算せよ。

<!-- solution-start -->
**詳細解答**。$a,b$ が実数で非対角成分が互いに共役だから、すべての $a,b$ で実$(1,1)$型である。行列の第一対角成分が $1+a|z^2|^2$ であり、$|z^2|$ を任意に大きくできるから、正値性には $a\ge0$ が必要。行列式は

$$
\det H=1+a(|z^1|^2+|z^2|^2)+(a^2-b^2)|z^1z^2|^2.
$$

$a^2<b^2$ なら $|z^1|=|z^2|=R$ としたとき $R^4$ の係数が負で、十分大きい $R$ では行列式が負になる。従って必要条件は $a\ge |b|$。逆に $a\ge |b|$ なら第一対角成分は $1+a|z^2|^2>0$ かつ

$$
\det H\ge1+a(|z^1|^2+|z^2|^2)>0
$$

なので、Hermite行列の平方完成（または二次の主座小行列式判定）で正定値となる。これが (1) の必要十分条件である。

閉性の非自明な式を計算すると

$$
\partial_2 H_{1\bar1}=a\bar z^2,\qquad
\partial_1 H_{2\bar1}=b\bar z^2,
$$

および

$$
\partial_1 H_{2\bar2}=a\bar z^1,\qquad
\partial_2 H_{1\bar2}=b\bar z^1.
$$

全点で一致する必要十分条件は $a=b$。これと正値性 $a\ge|b|$ を合わせると **$a=b\ge0$** が (2) の答えになる。実際、この場合

$$
\varphi(z)=|z^1|^2+|z^2|^2+a|z^1|^2|z^2|^2
$$

とすれば $\partial_1\partial_{\bar1}\varphi=1+a|z^2|^2$、$\partial_2\partial_{\bar2}\varphi=1+a|z^1|^2$、$\partial_1\partial_{\bar2}\varphi=a\bar z^1z^2$、$\partial_2\partial_{\bar1}\varphi=az^1\bar z^2$。四成分が $H$ に一致し、[ポテンシャル命題](#prop-kah1-02-potential-suffices)の仮定も満たす。
<!-- solution-end -->
