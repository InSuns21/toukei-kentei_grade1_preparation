# KAH1-08 Kähler接続と正則座標

<!-- definition-example-audit: strict -->

## 1. 接続係数を消して、何を残すのか

[前章のFubini–Study形式の貼り合わせ](../KAH1-07/index.md#thm-kah1-07-global-fs)で、座標が変わっても計量の幾何は変わらないことを確かめた。一方、接続は座標基底を微分する操作であるから、その係数は座標の取り方に左右される。曲率を調べる前に、**一点で計量と接続をどこまで単純にできるか**を知りたい。

既習の[Chern接続の存在・一意性](../../CM/CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)を正則接束に適用する。さらに[Kähler条件の接続による同値判定](../KAH1-03/index.md#thm-kah1-03-main-equivalence)により、その接続は実Levi–Civita接続と一致する。新しい一般接続を作るのではなく、**その接続の座標表示を整理する**のが本章の目的である。

以下、$X$ は複素次元 $n\ge1$ の複素多様体、$g$ は滑らかなKähler計量、$\omega$ はその基本形式とする。正則座標を $z=(z^1,\ldots,z^n)$、$e_j=\partial_j=\partial/\partial z^j$ と書き、反復添字は総和する。計量は

$$
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j,\qquad
g_{i\bar j}=g(\partial_i,\partial_{\bar j})
$$

という規約を用いる。$g$ は実計量を複素双線形に延長したものとし、$g_{i\bar j}$ は正値Hermite行列である。この規約では標準実Euclid計量の $g_{i\bar j}$ は $\delta_{ij}/2$。以下で一点の成分を $\delta_{ij}$ に整えることは正則座標の定数倍も許しており、実Euclid計量そのものとの同一視ではない。

## 2. 接束のChern接続を正則方向と混合方向に分ける

[正則接束に入るHermite計量](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)では、第一変数共役線形の内積 $h_T(S,T)=g(T,\overline S)$ を用いる。その正則枠 $e_j$ に関する計量行列は $H_{\ell j}=g_{j\bar\ell}$。これは $G=(g_{j\bar\ell})$ をそのまま行列 $H$ とみなすのではなく、行と列の置き方を指定した式である。

[一般Chern接続の行列公式](../../CM/CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)は $A=H^{-1}\partial H$。実際、$(\partial_iH)_{\ell j}=\sum_kH_{\ell k}(A_i)^k{}_j$ と成分に戻すと

$$
\partial_i g_{j\bar\ell}
=\sum_k g_{k\bar\ell}\Gamma^k_{ij},\qquad
D_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k.
$$

逆行列の添字 $g^{k\bar\ell}$ を $\sum_\ell g^{k\bar\ell}g_{m\bar\ell}=\delta^k_m$ で定義すれば、

$$
\boxed{\Gamma^k_{ij}=\sum_\ell g^{k\bar\ell}\partial_i g_{j\bar\ell}}.
$$

これは[既習の接束のChern係数公式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)の再表示であり、再度存在定理を証明しているわけではない。実際の共変微分では、ベクトル場 $V=V^j\partial_j$ の係数も微分する。したがって

$$
\begin{aligned}
D_{\partial_i}V
&=(\partial_iV^k+\Gamma^k_{ij}V^j)\partial_k,\\
D_{\partial_{\bar i}}V
&=(\partial_{\bar i}V^k)\partial_k.
\end{aligned}
$$

二式目は、正則座標枠に限って $D_{\partial_{\bar i}}\partial_j=0$ であることを使った。任意の滑らかな $V$ に対して $D_{\partial_{\bar i}}V=0$ と言っているのではない。

Kähler計量では[Kähler閉性と捩率消滅の同値性](../KAH1-03/index.md#thm-kah1-03-closed-torsion)から

$$
\partial_i g_{j\bar\ell}=\partial_j g_{i\bar\ell},
\qquad
\Gamma^k_{ij}=\Gamma^k_{ji}.
$$

複素共役の接続と直和し、実Levi–Civita接続を複素線形に延長して同定すると、座標基底について

$$
\begin{array}{ll}
\nabla_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k,
&\nabla_{\partial_{\bar i}}\partial_j=0,\\
\nabla_{\partial_i}\partial_{\bar j}=0,
&\nabla_{\partial_{\bar i}}\partial_{\bar j}
 =\overline{\Gamma^k_{ij}}\partial_{\bar k}.
\end{array}
$$

混合成分が消えるのは**正則座標基底における等式**であり、無条件の実座標公式ではない。一般Hermite計量ではChern接続の実延長とLevi–Civita接続が一致しないから、この四式をLevi–Civita接続の式として使えない。

**直接例：非定数でも混合成分は零。** $\mathbb C$ の計量 $g_{z\bar z}=1+|z|^2$ では

$$
\Gamma^z_{zz}
=\frac{\partial_z(1+z\bar z)}{1+|z|^2}
=\frac{\bar z}{1+|z|^2}.
$$

$\Gamma^z_{zz}$ は通常は非零だが、$\nabla_{\partial_{\bar z}}\partial_z=0$ である。また $V=z\bar z\,\partial_z$ なら $D_{\partial_{\bar z}}V=z\,\partial_z$ であり、座標枠の式と係数関数への作用を区別できる。

## 3. 座標変更で係数が変わる仕組み

正則座標 $z=z(w)$ を取り、$J^i_a=\partial z^i/\partial w^a$ とおく。新しい座標ベクトルは $\partial'_a=J^i_a\partial_i$ である。[接続のLeibniz則](../../CM/CM2-10/index.md#def-cm2-10-connection)を適用すると

$$
\begin{aligned}
\nabla_{\partial'_a}\partial'_b
&=\nabla_{J^i_a\partial_i}(J^j_b\partial_j)\\
&=J^i_a(\partial_iJ^k_b)\partial_k
  +J^i_aJ^j_b\Gamma^k_{ij}\partial_k\\
&=\left(\frac{\partial^2z^k}{\partial w^a\partial w^b}
  +J^i_aJ^j_b\Gamma^k_{ij}\right)\partial_k.
\end{aligned}
$$

最後に $\partial_k=(\partial w^c/\partial z^k)\partial'_c$ と変換する。接続係数はテンソル成分のように単純な一次変換をするのではなく、座標変換の**二階微分**を含む。

<a id="prop-kah1-08-coordinate-change"></a>

<!-- formal-statement-start -->
> **命題（正則座標変更による接続係数の変換）**  
> 複素多様体上のHermite計量のChern接続を正則座標 $z,w$ で表示し、$z=z(w)$ を正則座標変換とする。このとき

$$
\Gamma'^c_{ab}
=\frac{\partial w^c}{\partial z^k}
\left(
\frac{\partial^2z^k}{\partial w^a\partial w^b}
+\Gamma^k_{ij}
\frac{\partial z^i}{\partial w^a}
\frac{\partial z^j}{\partial w^b}
\right).
$$

> 特に $\Gamma'^c_{ab}-\Gamma'^c_{ba}$ は座標変換の二階微分項を含まない。
<!-- formal-statement-end -->

### 証明の見取り図

座標基底をLeibniz則で微分してから、逆Jacobianで新基底に戻す。二階偏微分の交換で捩率の反対称部分だけが残る。

<!-- proof-start -->
### 証明

上で計算した $\nabla_{\partial'_a}\partial'_b$ の $\partial_k$ 成分に逆Jacobianを掛ければ表示式を得る。$z(w)$ は滑らかな正則写像だから $\partial_a\partial_bz^k=\partial_b\partial_az^k$。式を $a,b$ で交換して差を取ると

$$
\Gamma'^c_{ab}-\Gamma'^c_{ba}
=\frac{\partial w^c}{\partial z^k}
(\Gamma^k_{ij}-\Gamma^k_{ji})
\frac{\partial z^i}{\partial w^a}
\frac{\partial z^j}{\partial w^b}.
$$

ここで和を取る添字 $i,j$ を交換して第二項をまとめた。[捩率のテンソル性](../../GEO/GEO13/index.md#prop-geo13-torsion-tensor)と整合する。$\square$
<!-- proof-end -->

**直接例：平坦なのに係数は非零になる。** $\mathbb C$ に $g_{z\bar z}=1$ を入れ、原点付近で $w=z+az^2$（$a\in\mathbb C$）とする。$dw/dz|_0=1$ なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により局所正則逆写像 $z=z(w)$ が存在する。合成 $w(z(w))=w$ を二回微分すると

$$
0=\left.\frac{d^2}{dw^2}(z(w)+az(w)^2)\right|_{0}
=\left.\frac{d^2z}{dw^2}\right|_0+2a,
$$

したがって $d^2z/dw^2|_0=-2a$。元の $\Gamma^z_{zz}=0$ を[接続係数の変換公式](#prop-kah1-08-coordinate-change)に入れると $\Gamma^w_{ww}(0)=-2a$。曲がっていない計量でも、曲がった座標を使えば係数が現れる。係数そのものを曲率と呼んではならない。

## 4. 一点で計量と一階微分を標準化する

正則座標の取り方を工夫し、点 $p$ で

$$
g_{a\bar b}(p)=\delta_{ab},\qquad
\partial_cg_{a\bar b}(p)=
\partial_{\bar c}g_{a\bar b}(p)=0
$$

とできれば、$\Gamma^c_{ab}(p)=0$ が従う。こうした座標を**Kähler正規座標**（本章では一階の条件を満たす座標）と呼ぶ。これは一点での条件であり、開集合全域で係数が消えるという条件ではない。

この線形正規化を、行列が何を表すかまで確認しておく。$p$ の正則座標 $z$ の基底 $\partial_j$ に対する[Hermite計量の局所行列](../../CM/CM2-09/index.md#def-cm2-09-metric-matrix)は

$$
H_{\ell j}(p)=g_{j\bar\ell}(p),\qquad
v^*H(p)v>0\quad(v\ne0)
$$

を満たす。有限次元の正値Hermite行列なので、既習の[Hermitian半正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)から正値で可逆な平方根が得られる。定数行列 $B=H(p)^{-1/2}$ を使い、座標を次のように取り直す。

$$
z^i=z^i(p)+B^i{}_a u^a,\qquad
H^{(u)}(p)=B^*H(p)B=I,\qquad
g^{(u)}_{a\bar b}(p)=\delta_{ab}.
$$

二つ目の等式は、$e^{(u)}_a=B^i{}_a\partial_i$ という基底展開に内積を適用した結果である。$B$ は可逆な定数複素行列なので $u=B^{-1}(z-z(p))$ は正則座標で、$u(p)=0$ となる。正値性の定義から座標行列による標準化まで、これでつながった。

残る一階微分は二次の座標変換で消す。Kähler条件から $\Gamma^k_{ij}(p)=\Gamma^k_{ji}(p)$ なので、$w$ の各成分を

$$
w^k=u^k+\frac12\Gamma^k_{ij}(p)u^iu^j
$$

と定めても、対称な二次項を過不足なく指定できる。$dw/du|_p=I$ なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を実 $2n$ 次元の写像に適用すると、十分小さい近傍で滑らかな逆写像 $u=u(w)$ が存在する。$dw/du$ は複素線形な可逆写像だから、その逆 $(dw/du)^{-1}$ も複素線形である。[複素線形微分による正則性](../../CM/CM1-01/index.md#def-cm1-01-holomorphic-map)により逆写像は正則であり、$w$ は正則座標となる。

<a id="def-kah1-08-normal-coordinates"></a>

<!-- formal-statement-start -->
> **定義（点におけるKähler正規座標）**  
> 複素多様体 $X$ 上の滑らかなKähler計量 $g$ と点 $p\in X$ に対し、$p$ の正則座標 $w$ が $w(p)=0$、$g_{a\bar b}(p)=\delta_{ab}$、かつすべての $a,b,c$ について
>
$$
\partial_cg_{a\bar b}(p)=\partial_{\bar c}g_{a\bar b}(p)=0.
$$

> この条件を満たす $w$ を $p$ における（一階の）**Kähler正規座標**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-08-normal-coordinates -->
**定義の確認**。直接例として $\mathbb C^n$ 上の定数計量 $g_{i\bar j}=\delta_{ij}$ と、正則な平行移動 $w=z-p$ を取る。Jacobian は $I$ なので引き戻した計量も定数であり、

$$
w(p)=0,\quad
g^{(w)}_{a\bar b}(p)=\delta_{ab},\quad
\partial_cg^{(w)}_{a\bar b}(p)
=\partial_{\bar c}g^{(w)}_{a\bar b}(p)=0.
$$

さらに $g(v,\bar v)=\sum_a|v^a|^2>0$（$v\ne0$）で、正値という元の仮定も満たす。定義の位置・零階・両側の一階条件をすべて直接確認できた。

定数を $1/2$ に取った標準実Euclid計量なら $w=(z-p)/\sqrt2$ とする。$dz/dw=\sqrt2\,I$ のため、引き戻し成分は $g^{(w)}_{a\bar b}=(1/2)(\sqrt2)^2\delta_{ab}=\delta_{ab}$ となり、一階微分も零である。この係数規約は、元の実Euclid座標での係数と異なり得る。
<!-- definition-example-end -->

<a id="thm-kah1-08-normal-existence"></a>

<!-- formal-statement-start -->
> **定理（Kähler正規座標の局所存在）**  
> $X$ が複素多様体、$g$ が滑らかなKähler計量、$p\in X$ が任意の点なら、$p$ のある近傍にKähler正規座標 $w$ が存在する。この座標では接束のChern接続および実Levi–Civita接続の正則な接続係数はすべて $p$ で零となる。
<!-- formal-statement-end -->

### 証明の見取り図

正値Hermite行列を複素線形変換で $I$ にし、Kähler条件で係数の対称性を確保する。二次正則変換を逆写像まで展開し、計量の積の微分で**すべての**一階偏微分が消えたことを確かめる。

<!-- proof-start -->
### 証明

まず前段で構成した正値Hermite行列の平方根による定数正則線形座標 $u$ を取り、$u(p)=0$ かつ $g^{(u)}_{a\bar b}(p)=\delta_{ab}$ とする。[接束Chern係数の局所式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)と[Kähler閉性の局所条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)より $\Gamma^k_{ij}(p)=\Gamma^k_{ji}(p)$。

上で述べた二次正則変換 $w^k=u^k+\tfrac12\Gamma^k_{ij}(p)u^iu^j$ を取る。そのJacobianは $p$ で $I$ なので正則逆写像が存在し、逆写像のTaylor展開は

$$
u^k=w^k-\frac12\Gamma^k_{ij}(p)w^iw^j+O(|w|^3).
$$

一回微分して $J^i_a=\partial u^i/\partial w^a$ とおくと、

$$
J^i_a(0)=\delta^i_a,\qquad
\partial_cJ^i_a(0)=-\Gamma^i_{ca}(p).
$$

新しい計量は実計量の引き戻しにより

$$
g'_{a\bar b}(w)
=g_{i\bar j}(u(w))\,J^i_a(w)\,
\overline{J^j_b(w)}.
$$

従って $g'_{a\bar b}(0)=\delta_{ab}$。$w$ で正則微分すると、$\overline{J^j_b(w)}$ は反正則だから $\partial_c\overline{J^j_b}=0$。積の微分により

$$
\begin{aligned}
\partial_cg'_{a\bar b}(0)
&=\partial_cg_{a\bar b}(p)
 -\Gamma^i_{ca}(p)g_{i\bar b}(p)\\
&=\partial_cg_{a\bar b}(p)
 -\sum_i\Gamma^i_{ca}(p)\delta_{ib}=0.
\end{aligned}
$$

最後の等号は正規化済み座標での $\partial_cg_{a\bar b}=\sum_i\Gamma^i_{ca}g_{i\bar b}$ を代入したためである。Hermite対称性 $g'_{a\bar b}=\overline{g'_{b\bar a}}$ から、反正則方向でも $\partial_{\bar c}g'_{a\bar b}(0)=0$。定義の三条件がすべて成立した。

したがって $\Gamma'^c_{ab}(p)=\sum_\ell g'^{c\bar\ell}(p)\partial_ag'_{b\bar\ell}(p)=0$。[接続の一致](../KAH1-03/index.md#thm-kah1-03-main-equivalence)により、実Levi–Civita接続についても点 $p$ で同じ結論を得る。$\square$
<!-- proof-end -->

この正規化の本質は「一階微分だけを消す」ことである。一般に**二階微分まで零にはならない**。次章で計算する曲率は、Kähler正規座標でも残る二階の情報から現れる。したがってKähler正規座標の存在は計量が近傍全体で平坦であることを意味しない。また構成に使った座標と線形変換の選択は一意ではない。

## 5. Kähler条件を失うと二次補正が失敗する

非KählerのHermite計量でも、Chern接続自体は存在する。しかし一般には $\Gamma^k_{ij}(p)\ne\Gamma^k_{ji}(p)$ であり、二階微分 $\partial_a\partial_bu^k$ は対称であるから、その反対称部分を座標変更では取り去れない。これは単なる計算上の都合ではなく、[Chern捩率の局所公式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)で測る幾何学的な障害である。

<a id="prop-kah1-08-normal-characterization"></a>

<!-- formal-statement-start -->
> **命題（Kähler条件と正則一階正規化）**  
> $X$ を複素多様体、$g$ を滑らかな正値Hermite計量とする。各点 $p$ において、ある正則座標が存在して次の条件を満たすことと、$g$ がKähler計量であることは同値である。

$$
g_{a\bar b}(p)=\delta_{ab},\qquad
\partial_cg_{a\bar b}(p)=0
\quad(1\le a,b,c\le n).
$$
<!-- formal-statement-end -->

### 証明の見取り図

Kählerなら直前の局所存在定理を使う。逆は各点の座標で接続係数がすべて零となることを確認し、捩率のテンソル性と既習のKähler同値性を適用する。

<!-- proof-start -->
### 証明

Kählerなら直前の局所存在定理により、すべての点で指定された座標を取れる。

逆に各点 $p$ で命題の条件を満たす正則座標を取る。その座標では全ての $\partial_i g_{j\bar\ell}(p)$ が零だから、[接束Chern係数式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)より

$$
\Gamma^k_{ij}(p)
=\sum_{\ell}g^{k\bar\ell}(p)\partial_i g_{j\bar\ell}(p)
=0.
$$

そこで正則方向の捩率は

$$
T(\partial_i,\partial_j)(p)
=(\Gamma^k_{ij}-\Gamma^k_{ji})(p)\partial_k=0.
$$

[接束の捩率の局所式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)では混合成分は常に零で、反正則成分は正則成分の複素共役だから、ともに消える。[捩率のテンソル性](../../GEO/GEO13/index.md#prop-geo13-torsion-tensor)により、この結論は座標に依存しない。点 $p$ は任意なので捩率は全域で零となり、[Kähler閉性との同値性](../KAH1-03/index.md#thm-kah1-03-closed-torsion)で $d\omega=0$。$\square$
<!-- proof-end -->

**反例：正値Hermite計量でも正規化できない点。** $\mathbb C^2$ 上で

$$
(g_{i\bar j})=
\begin{pmatrix}1&0\\0&1+|z^1|^2\end{pmatrix}
$$

とする。両対角成分は正なので正値だが、

$$
\partial_1g_{2\bar2}=\bar z^1,\qquad
\partial_2g_{1\bar2}=0,\qquad
T^2_{12}=\frac{\bar z^1}{1+|z^1|^2}.
$$

例えば $p=(1,0)$ では $T^2_{12}(p)=1/2$。座標変更の二階微分は対称なので、この捩率の非零値を打ち消すことはできない。消せないのは「接続係数の全体」であって、任意の一点で個々の対称部分を整えることは妨げない。この反例が失う仮定は閉性 $d\omega=0$ である。

## 6. 演習：係数・座標変換・捩率を使う

### Level A

<a id="ex-kah1-08-a01"></a>
#### KAH1-08-A01 一次元の接続係数と混合微分
- Level: A

$\mathbb C$ 上で $g_{z\bar z}=1+|z|^2$、$V=z\bar z\,\partial_z$ とする。$\Gamma^z_{zz}$、$D_{\partial_{\bar z}}\partial_z$、$D_{\partial_{\bar z}}V$ を求めよ。

<!-- solution-start -->
**詳細解答**。一次元では $g^{z\bar z}=(1+|z|^2)^{-1}$。$\partial_zg_{z\bar z}=\bar z$ なので

$$
\Gamma^z_{zz}=\frac{\bar z}{1+|z|^2}.
$$

正則座標枠に対するChern接続の $(0,1)$ 部分は $\bar\partial$ だから $D_{\partial_{\bar z}}\partial_z=0$。一方、Leibniz則により

$$
D_{\partial_{\bar z}}(z\bar z\,\partial_z)
=\partial_{\bar z}(z\bar z)\,\partial_z
+z\bar z D_{\partial_{\bar z}}\partial_z
=z\,\partial_z.
$$

枠自体の微分が零でも、滑らかな係数の微分は残る。
<!-- solution-end -->

<a id="ex-kah1-08-a02"></a>
#### KAH1-08-A02 計量行列の向き
- Level: A

正則座標で $g_{1\bar1}=2,g_{2\bar2}=3,g_{1\bar2}=g_{2\bar1}=0$ がある点で成立し、さらに同点で $\partial_1g_{2\bar2}=6$、他の $\partial_1g_{2\bar\ell}$ は零とする。$\Gamma^k_{12}$ を求めよ。

<!-- solution-start -->
**詳細解答**。[接束Chern係数の局所式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)を $\partial_1g_{2\bar\ell}=\sum_k g_{k\bar\ell}\Gamma^k_{12}$ として使う。与えられた対角行列の値を $\ell=1,2$ に代入すると、

$$
0=2\Gamma^1_{12},\qquad
6=3\Gamma^2_{12},
\quad\Longrightarrow\quad
\Gamma^1_{12}=0,\quad \Gamma^2_{12}=2.
$$

逆行列を掛ける方法でも $g^{2\bar2}=1/3$ だから $\Gamma^2_{12}=(1/3)\cdot6=2$ となる。計量行列に成分の並びの規約が必要な理由も確認できた。
<!-- solution-end -->

<a id="ex-kah1-08-a03"></a>
#### KAH1-08-A03 一点で既にKähler正規座標
- Level: A

$\lambda>0$、$\varphi=|z|^2+\lambda|z|^4$ とし、$g_{z\bar z}=\partial_z\partial_{\bar z}\varphi$ とする。原点で $z$ がKähler正規座標か、定義の各条件を確かめよ。

<!-- solution-start -->
**詳細解答**。$\partial_{\bar z}\varphi=z+2\lambda z^2\bar z$ だから

$$
g_{z\bar z}=1+4\lambda z\bar z,\qquad
\partial_zg_{z\bar z}=4\lambda\bar z,\qquad
\partial_{\bar z}g_{z\bar z}=4\lambda z.
$$

$\lambda>0$ なので $g>0$。$\omega=i\partial\bar\partial\varphi$ は閉でありKähler。原点では座標値 $z(0)=0$、$g(0)=1$、正則・反正則一階微分とも零であるから定義を満たす。原点から離れれば一般に係数は零でない。
<!-- solution-end -->

<a id="ex-kah1-08-a04"></a>
#### KAH1-08-A04 平坦計量を非線形座標で見る
- Level: A

$\mathbb C$ の $g_{z\bar z}=1$ について $w=z+az^2$（$a\ne0$）を原点付近で使い、$\Gamma^w_{ww}(0)$ を求めよ。元の計量が平坦でも係数が非零になる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$dw/dz=1+2az$ は原点で1。従って局所逆写像 $z(w)$ があり、$z=w-aw^2+O(w^3)$。ゆえに $d^2z/dw^2|_0=-2a$。元の接続係数は $\Gamma^z_{zz}=0$ であり、変換公式は

$$
\Gamma^w_{ww}(0)
=\left.\frac{dw}{dz}\right|_0
\left(\left.\frac{d^2z}{dw^2}\right|_0
+\Gamma^z_{zz}(0)\left(\left.\frac{dz}{dw}\right|_0\right)^2\right)
=-2a.
$$

二階微分項は座標由来であり、接続係数そのものは曲率テンソルではない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-08-b01"></a>
#### KAH1-08-B01 非Kähler捩率の障害
- Level: B

$\mathbb C^2$ に $g_{1\bar1}=1,g_{2\bar2}=1+|z^1|^2$、非対角成分零を与える。$p=(1,0)$ で $\Gamma^2_{12},\Gamma^2_{21}$、捩率 $T^2_{12}$ を求め、計量の零階・一階条件をすべて満たす正則座標が存在しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$\partial_1g_{2\bar2}=\bar z^1$ であり、$\partial_2g_{1\bar2}=0$。対角逆行列は $g^{2\bar2}=(1+|z^1|^2)^{-1}$ だから

$$
\Gamma^2_{12}=\frac{\bar z^1}{1+|z^1|^2},\qquad
\Gamma^2_{21}=0,\qquad
T^2_{12}=\Gamma^2_{12}-\Gamma^2_{21}.
$$

$p$ で $T^2_{12}=1/2\ne0$。正則座標変更の二階微分は添字 $1,2$ に対称であり、捩率のテンソル変換則は非零のテンソルを零にできない。もし全一階微分が消える正則座標があればその座標では全Chern係数が零になり、捩率も零となって矛盾する。
<!-- solution-end -->

<a id="ex-kah1-08-b02"></a>
#### KAH1-08-B02 正規化の二次係数を直接求める
- Level: B

$\mathbb C$ 上で $g_{z\bar z}=e^{z+\bar z}$ とする。原点での接続係数を求め、$w=z+bz^2$ により $\Gamma^w_{ww}(0)=0$ となる $b$ を計算し、変換後の計量の一階微分が零であることを別法で確かめよ。

<!-- solution-start -->
**詳細解答**。$g(0)=1$、$\partial_zg=g$ だから $\Gamma^z_{zz}=g^{-1}\partial_zg=1$。変換公式で $d^2z/dw^2|_0=-2b$ なので $\Gamma^w_{ww}(0)=1-2b$、従って $b=1/2$。

逆写像は $z=w-\tfrac12w^2+O(w^3)$、$dz/dw=1-w+O(w^2)$。よって新しい成分は

$$
\begin{aligned}
g'_{w\bar w}
&=e^{z(w)+\overline{z(w)}}\left|\frac{dz}{dw}\right|^2\\
&=(1+w+\bar w+O(|w|^2))
(1-w-\bar w+O(|w|^2))\\
&=1+O(|w|^2).
\end{aligned}
$$

従って両側の一階微分は原点で零。単に係数が消えたという式の代入に頼らず、計量の定義から直接照合した。
<!-- solution-end -->

<a id="ex-kah1-08-b03"></a>
#### KAH1-08-B03 Kähler正規座標なら平坦か
- Level: B

$\lambda>0$ の一次元計量 $g_{z\bar z}=1+4\lambda|z|^2$ について、原点でKähler正規座標の定義条件と $\partial_z\partial_{\bar z}g_{z\bar z}(0)$ を計算せよ。なぜKähler正規座標の存在から近傍平坦性を結論できないか説明せよ。

<!-- solution-start -->
**詳細解答**。$g(0)=1$ であり、$\partial_zg=4\lambda\bar z$、$\partial_{\bar z}g=4\lambda z$ だから両方とも原点で零。従って原点におけるKähler正規座標である。一方、

$$
\partial_z\partial_{\bar z}g_{z\bar z}
=\partial_z(4\lambda z)=4\lambda\ne0.
$$

Kähler正規座標で制約されるのは計量の0階・1階の値であり、2階微分が零になるとは定義されていない。曲率の計算では二階微分と一次項の積が現れるので、この非零値は平坦性を導く根拠にならない。実際この例の原点では接続係数が零だが $\partial_{\bar z}\Gamma^z_{zz}(0)=4\lambda$ であり、接続の一階変化が残る。
<!-- solution-end -->

### Level C

<a id="ex-kah1-08-c01"></a>
#### KAH1-08-C01 二変数ポテンシャルからKähler正規座標を構成する
- Level: C

$\lambda>0$、$\varphi(z)=|z^1|^2+|z^2|^2+\lambda|z^1|^2|z^2|^2$ とする。$g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$、点 $p=(a,0)$（$a\ne0$）、$d=1+\lambda|a|^2$ とおく。

1. $g$ が全域でKähler計量となることを正定値性と閉性から示せ。
2. $p$ における非零の接続係数を求めよ。
3. $u^1=z^1-a,\ u^2=\sqrt d\,z^2$ とし、$u$ 座標の接続係数を使って $p$ におけるKähler正規座標 $w$ の二次式を構成せよ。

<!-- solution-start -->
**詳細解答**。まず二階微分を順に行うと

$$
(g_{i\bar j})=
\begin{pmatrix}
1+\lambda|z^2|^2 & \lambda\bar z^1z^2\\
\lambda z^1\bar z^2 & 1+\lambda|z^1|^2
\end{pmatrix}.
$$

対角の左上は正で、行列式は

$$
(1+\lambda|z^2|^2)(1+\lambda|z^1|^2)
-\lambda^2|z^1|^2|z^2|^2
=1+\lambda(|z^1|^2+|z^2|^2)>0.
$$

行列式と左上成分から正値を判定できる理由も、元の内積の定義に戻って確かめる。$A=g_{1\bar1}>0$、$B=g_{1\bar2}$、$D=g_{2\bar2}$ と置くと、任意の $(v^1,v^2)\ne(0,0)$ について

$$
\begin{aligned}
g(v,\bar v)
&=A|v^1|^2+Bv^1\overline{v^2}
 +\overline Bv^2\overline{v^1}+D|v^2|^2\\
&=A\left|v^1+\frac{\overline B}{A}v^2\right|^2
 +\frac{AD-|B|^2}{A}|v^2|^2>0.
\end{aligned}
$$

ここで $AD-|B|^2$ は直前に計算した正の行列式である。$v^2\ne0$ なら第二項が正、$v^2=0$ なら第一項が正なので、[Hermite計量の正値条件](../../CM/CM2-09/index.md#def-cm2-09-metric-matrix)を全非零ベクトルについて確認できた。また $\omega=i\partial\bar\partial\varphi$ なので $\partial^2=\bar\partial^2=0$ と型別微分の反交換則から $d\omega=0$。全域でKählerである。

次に $p$ では $g(p)=\operatorname{diag}(1,d)$。$\partial_1g_{2\bar2}(p)=\lambda\bar a$、$\partial_2g_{1\bar2}(p)=\lambda\bar a$、それ以外の $\partial_i g_{j\bar\ell}(p)$ は零（添字対称性により二つの表示を含む）。[Chern係数の局所式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)から

$$
\Gamma^2_{12}(p)=\Gamma^2_{21}(p)
=\frac{\lambda\bar a}{d},\qquad
\Gamma^k_{ij}(p)=0\quad\text{（その他）}.
$$

$u^1=z^1-a,\ u^2=\sqrt d\,z^2$ は定数正則線形変換であり、新しい計量は $g_u(p)=I$。その接続係数は変換公式の二階項が零だから

$$
(\Gamma_u)^2_{12}(p)=(\Gamma_u)^2_{21}(p)
=\left(\frac{\partial u^2}{\partial z^2}\right)
\left(\frac{\partial z^1}{\partial u^1}\right)
\left(\frac{\partial z^2}{\partial u^2}\right)
\Gamma^2_{12}(p)
=\frac{\lambda\bar a}{d};
$$

他の成分は零である。なお $u$ 座標での計量は $g^{(u)}_{1\bar1}(p)=1$、$g^{(u)}_{2\bar2}(p)=g_{2\bar2}(p)/d=1$、非対角成分零で、正規化の零階条件を直接満たす。したがって二次補正を

$$
w^1=u^1,\qquad
w^2=u^2+\frac{\lambda\bar a}{d}u^1u^2
$$

とすればよい。$dw/du|_p=I$ なので局所正則逆写像を持つ。係数の対称性を用いると二次項は $\tfrac12((\Gamma_u)^2_{12}+(\Gamma_u)^2_{21})u^1u^2=(\lambda\bar a/d)u^1u^2$ になる。

一階条件も成分で確かめる。$q=\lambda\bar a/d$ と略記する。逆写像とそのJacobian $J^i_a=\partial u^i/\partial w^a$ は原点付近で

$$
u^1=w^1,\qquad
u^2=w^2-qw^1w^2+O(|w|^3)
$$

を満たすから、原点での非零一階微分は

$$
\partial_{w^1}J^2_2(0)=\partial_{w^2}J^2_1(0)=-q.
$$

元の $u$ 座標で非零となり得る正則一階微分は $\partial_{u^1}g^{(u)}_{2\bar2}(p)=\partial_{u^2}g^{(u)}_{1\bar2}(p)=q$ だけである。引き戻し式 $g^{(w)}_{a\bar b}=g^{(u)}_{i\bar j}J^i_a\overline{J^j_b}$ を微分すると

$$
\partial_{w^1}g^{(w)}_{2\bar2}(p)=q-q=0,\qquad
\partial_{w^2}g^{(w)}_{1\bar2}(p)=q-q=0.
$$

他の正則一階微分も零で、Hermite対称性から反正則一階微分も零になる。これで $w(p)=0$、$g^{(w)}(p)=I$、全一階微分零という定義の条件を直接確認した。ここで $\bar a$ は**固定した点の定数**であり、変数 $u$ の共役を座標変換へ混入させていないから、$w(u)$ は正則である。
<!-- solution-end -->

## 7. 次章への橋

正則座標でのChern接続、Levi–Civita接続との一致、混合成分の消失、接続係数の非テンソル的な変換、そして**Kähler条件に支えられた一階の正則座標正規化**を確認した。次章では、Kähler正規座標で接続係数を一点で零にしても残る二階の計量変化を、曲率テンソルとして取り出す。