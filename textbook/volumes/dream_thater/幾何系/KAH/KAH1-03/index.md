# KAH1-03 Kähler条件の同値性

<!-- definition-example-audit: strict -->

## 1. 閉じた2形式は、何を平行に保つのか

前章では、複素多様体のHermite計量について、基本形式の閉性 $d\omega=0$ を[係数の微分対称性](../KAH1-02/index.md#thm-kah1-02-local-closedness)に直した。しかし閉性だけを見ても、「曲線に沿って長さと複素構造を同時に運べるのか」はまだ分からない。そこで、[Levi–Civita接続](../../GEO/GEO13/index.md#def-geo13-levi-civita)と[正則束のChern接続](../../CM/CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)を比較する。

Levi–Civita接続は実計量を保ち、捩率（torsion）が零になるよう選ばれる。一方Chern接続は、正則束の正則構造とHermite計量を保つよう選ばれる。**一般には、両接続に同じ条件を課していない**。Kähler条件の重要な意味は、この二種類の接続が一致することにある。

以下、$X$ は複素次元 $n\ge1$ の複素多様体、$J$ は正則座標から得られる可積分複素構造、$g=g_{\mathbb R}$ は滑らかな正定値で $J$ と両立する実Riemann計量とする。基本形式は[基本2形式の定義](../KAH1-01/index.md#def-kah1-01-fundamental-form)に従い $\omega(U,V)=g(JU,V)$ とする。正則座標 $z^1,\ldots,z^n$ では

$$
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j,\qquad
g_{i\bar j}=\overline{g_{j\bar i}}.
$$

添字を反復したときは $1,\ldots,n$ にわたり総和する。この規約では標準実Euclid計量の係数は $g_{i\bar j}=\delta_{ij}/2$ である。複素化した接続は複素線形に延長し、$\partial_i=\partial/\partial z^i$、$\partial_{\bar i}=\partial/\partial\bar z^i$ と記す。

## 2. 二つの接続を同じ接束上へ載せる

[複素接束の型分解](../../CM/CM1-04/index.md#thm-cm1-04-splitting)によって、複素化した実接束は $T_{\mathbb C}X=T^{1,0}X\oplus T^{0,1}X$ となる。Chern接続 $D$ は最初は正則束 $T^{1,0}X$ 上の接続だが、共役束上に共役接続 $\bar D$ を取れば、両者を直和した接続 $\widetilde D=D\oplus\bar D$ が得られる。実ベクトルの複素共役に関して不変なので、$\widetilde D$ は実接束の実接続も定める。**以後「Chern接続とLevi–Civita接続の一致」というときは、この実接続としての一致**を意味する。

比較のため、どの係数が必要かを確かめる。$\omega$ の係数と実計量の関係は[正の基本形式とHermite行列](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)から

$$
g(\partial_i,\partial_j)=0,\qquad
g(\partial_i,\partial_{\bar j})=g_{i\bar j}
$$

となる。例えば標準複素直線では $g(\partial_z,\partial_{\bar z})=1/2$ であり、前章の係数と一致する。これは実計量を複素双線形に延長した値であって、正値性を調べるHermite形式の「第一変数共役線形」と混同しない。

[捩率の定義](../../GEO/GEO13/index.md#def-geo13-torsion)は接続 $\nabla$ に対して

$$
T^\nabla(U,V)=\nabla_UV-\nabla_VU-[U,V]
$$

である。この式の各項は複素線形に延長できる。局所座標の $\partial_i,\partial_{\bar j}$ は互いに可換なので、その座標基底対では括弧項が零となる。

<a id="prop-kah1-03-chern-coefficients"></a>

<!-- formal-statement-start -->
> **命題（接束のChern接続と捩率の局所式）**  
> 複素多様体 $X$ に滑らかなHermite計量 $g$ を与え、正則接束 $T^{1,0}X$ のChern接続を $D$ とする。任意の正則座標上で、$g^{k\bar\ell}$ を次の逆行列の添字規約で定める。

$$
\sum_k g_{k\bar\ell}g^{k\bar m}=\delta_{\ell m}.
$$

> このときChern接続の正則方向の係数は次である。

$$
D_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k,\qquad
\Gamma^k_{ij}=\sum_{\ell}g^{k\bar\ell}\partial_i g_{j\bar\ell},\qquad
D_{\partial_{\bar i}}\partial_j=0.
$$

> 実接束へ延長した接続 $\widetilde D$ の捩率は、正則・反正則混合成分が零であり、$(2,0)$ 成分は次で与えられる。

$$
T^{\widetilde D}(\partial_i,\partial_j)
=\sum_{k,\ell}g^{k\bar\ell}
(\partial_i g_{j\bar\ell}-\partial_j g_{i\bar\ell})\partial_k.
$$

> $(0,2)$ 成分はこの複素共役である。
<!-- formal-statement-end -->

### 証明の見取り図

正則枠 $\partial_j$ での $(0,1)$ 成分は既習のChern接続の定義で消える。正則方向の係数は計量を微分する等式から一つずつ求める。最後に二方向を交換して捩率を作る。

<!-- proof-start -->
### 証明

正則枠では[正則構造と両立するChern接続](../../CM/CM2-10/index.md#def-cm2-10-compatible-conditions)の $(0,1)$ 部分が $\bar\partial$ なので $D_{\partial_{\bar i}}\partial_j=0$。$T^{1,0}$ 上のHermite計量は、第一変数共役線形の規約では $h(\partial_\ell,\partial_j)=g_{j\bar\ell}$ である。実際、$g_{j\bar\ell}=\overline{g_{\ell\bar j}}$ に注意すれば、これは前節の実計量と同じ長さを表している。

接続の計量両立式を $\partial_i$ 方向へ適用すると、第一変数の接続係数は $(0,1)$ 形式の共役となってこの方向では寄与しない。従って

$$
\begin{aligned}
\partial_i g_{j\bar\ell}
&=\partial_i h(\partial_\ell,\partial_j)\\
&=h(\partial_\ell,D_{\partial_i}\partial_j)
=\sum_k\Gamma^k_{ij}g_{k\bar\ell}.
\end{aligned}
$$

正値Hermite行列は可逆だから、逆行列の関係を用いて

$$
\begin{aligned}
\sum_\ell g^{m\bar\ell}\partial_i g_{j\bar\ell}
&=\sum_{k,\ell}\Gamma^k_{ij}g_{k\bar\ell}g^{m\bar\ell}\\
&=\Gamma^m_{ij}.
\end{aligned}
$$

最後の等号は、表示した逆行列の添字規約による。共役束では $\widetilde D_{\partial_i}\partial_{\bar j}=0$、$\widetilde D_{\partial_{\bar i}}\partial_{\bar j}=\overline{\Gamma^k_{ij}}\partial_{\bar k}$（共役方向の添字を対応させた表記）となる。よって混合方向では

$$
T^{\widetilde D}(\partial_i,\partial_{\bar j})
=0-0-[\partial_i,\partial_{\bar j}]=0.
$$

正則方向同士は座標ベクトル場が可換なので

$$
\begin{aligned}
T^{\widetilde D}(\partial_i,\partial_j)
&=(\Gamma^k_{ij}-\Gamma^k_{ji})\partial_k\\
&=\sum_{k,\ell}g^{k\bar\ell}
(\partial_i g_{j\bar\ell}-\partial_j g_{i\bar\ell})\partial_k.
\end{aligned}
$$

反正則方向同士は複素共役を取れば得られる。$\square$
<!-- proof-end -->

**座標から元の定義への橋**。上の係数 $\Gamma^k_{ij}$ は単なる行列の値ではない。座標基底 $\partial_j$ を $\partial_i$ 方向へ接続で微分した成分であり、捩率は順序を入れ替えたときの差である。捩率が零かどうかはテンソルの性質だから、この局所計算を全座標で調べれば座標に依存しない結論となる。

**直接例：非定数でも捩率が零**。$\mathbb C^2$ 上で

$$
\varphi=|z^1|^2+|z^2|^2+t|z^1|^2|z^2|^2,\quad t>0,\qquad
g_{i\bar j}=\partial_i\partial_{\bar j}\varphi
$$

とする。前章の[正値性・閉性の計算](../KAH1-02/index.md#prop-kah1-02-potential-suffices)により、これは正値Hermite計量を定める。さらに

$$
\begin{aligned}
\partial_1g_{2\bar1}&=t\bar z^2=\partial_2g_{1\bar1},\\
\partial_1g_{2\bar2}&=t\bar z^1=\partial_2g_{1\bar2}.
\end{aligned}
$$

各 $\ell=1,2$ で捩率公式の括弧内が零なので、$T^{\widetilde D}(\partial_1,\partial_2)=0$。共役・混合成分も零である。一方 $\partial_1g_{2\bar2}=t\bar z^1$ は一般に非零だから、捩率零は接続係数の全消滅を意味しない。

## 3. 閉性とChern捩率が同じ差を測る

前章の閉性は係数の差 $\partial_i g_{j\bar\ell}-\partial_j g_{i\bar\ell}$ の消滅だった。捩率でも同じ差に逆行列を掛けた式が現れた。正値計量により逆行列が存在するので、二つは同値になる。

<a id="thm-kah1-03-closed-torsion"></a>

<!-- formal-statement-start -->
> **定理（Kähler閉性とChern捩率の同値性）**  
> 可積分複素構造 $J$ を持つ複素多様体 $X$ と、その上の滑らかなHermite計量 $g$ の基本形式 $\omega$ を考える。$D$ を正則接束のChern接続、$\widetilde D$ をその実接束への延長とする。このとき次は同値である。
>
> 1. $d\omega=0$。
> 2. $\widetilde D$ の捩率 $T^{\widetilde D}$ が恒等的に零である。
> 3. 各正則座標で $\Gamma^k_{ij}=\Gamma^k_{ji}$ が全添字について成立する。
<!-- formal-statement-end -->

### 証明の見取り図

閉性の式と捩率の式を同じ添字で照合する。逆行列を掛けたことで条件が弱くなっていないことを、可逆性を使って逆向きにも確かめる。

<!-- proof-start -->
### 証明

[局所Kähler閉性条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)を添字を付け替えて書けば、$d\omega=0$ と

$$
\partial_i g_{j\bar\ell}-\partial_j g_{i\bar\ell}=0
\quad(\text{すべての }i,j,\ell)
$$

が同値である。[Chern捩率の公式](#prop-kah1-03-chern-coefficients)で括弧内が零なら、各 $\Gamma^k_{ij}-\Gamma^k_{ji}=0$、よって捩率は零となる。

逆に $\Gamma^k_{ij}-\Gamma^k_{ji}=0$ が全 $k$ で成立すると仮定する。両辺に $g_{k\bar m}$ を掛けて $k$ で和を取ると

$$
\begin{aligned}
0
&=\sum_k g_{k\bar m}(\Gamma^k_{ij}-\Gamma^k_{ji})\\
&=\partial_i g_{j\bar m}-\partial_j g_{i\bar m}.
\end{aligned}
$$

従って局所閉性条件が戻る。混合捩率は常に零で、反正則成分は正則成分の共役だから、捩率全体が零であることと係数の対称性も同値である。$\square$
<!-- proof-end -->

これは可積分複素構造の上での結果である。概複素構造では正則座標と $T^{1,0}$ の正則束構造を同じようには用意できず、**閉じた基本形式があるだけで以下の同値性を適用してはいけない**。

## 4. Levi–Civita接続との一致、そして $\nabla J=0$

実接束上の[Levi–Civita接続の存在・一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)は、計量両立性と捩率零の両方で接続を一意に指定する。前節の $\widetilde D$ は最初から実計量と両立する。従って捩率が消えれば同じ接続になる。

さらに「$J$ を平行に保つ」とは、接続が $J$ による回転と可換であること、つまり $(\nabla_UJ)V=\nabla_U(JV)-J\nabla_UV=0$ をいう。これは[テンソルの共変微分](../../GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)の $J$ への適用である。

<a id="thm-kah1-03-main-equivalence"></a>

<!-- formal-statement-start -->
> **定理（Kähler条件の接続による同値判定）**  
> $X$ を複素多様体、$J$ をその可積分複素構造、$g$ を滑らかな $J$ 両立Riemann計量とする。基本形式を次で定める。

$$
\omega(U,V)=g(JU,V).
$$

> $\nabla^{\mathrm{LC}}$ を $g$ のLevi–Civita接続とする。また $D$ をHermite正則束 $(T^{1,0}X,h)$ のChern接続、その実接束への延長を $\widetilde D$ とする。このとき以下は同値である。
>
> 1. $d\omega=0$（$g$ はKähler）。
> 2. $\nabla^{\mathrm{LC}}J=0$。
> 3. $\nabla^{\mathrm{LC}}=\widetilde D$（したがって $T^{1,0}X$ への制限が $D$）。
> 4. $\widetilde D$ の捩率が零である。
<!-- formal-statement-end -->

### 証明の見取り図

(1) と (4) は直前の定理で結んだ。(4) なら計量両立・捩率零の一意性から (3)。(3) ならChern接続が複素型を保つため (2)。最後に (2) ならLevi–Civita接続の型混合成分が、捩率零によって消えることを示し、Chern接続の一意性へ戻す。

<!-- proof-start -->
### 証明

**(1) $\Longleftrightarrow$ (4)** は[Kähler閉性とChern捩率の同値性](#thm-kah1-03-closed-torsion)による。

**(4) $\Longrightarrow$ (3)**。$\widetilde D$ は $D$ と $\bar D$ の直和であり、Chern接続がHermite計量を保つから実部の $g$ も保つ。実際、実ベクトル場 $U,V,W$ に対し、複素化したHermite計量の計量両立式の実部を取れば

$$
U\,g(V,W)=g(\widetilde D_UV,W)+g(V,\widetilde D_UW).
$$

(4) の捩率零と合わせると、[Levi–Civita接続の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)から $\widetilde D=\nabla^{\mathrm{LC}}$。

**(3) $\Longrightarrow$ (2)**。$D\oplus\bar D$ は $T^{1,0}$ と $T^{0,1}$ の各部分束を保つ。$J$ は前者で $i$ 倍、後者で $-i$ 倍なので、型 $V=V^{1,0}+V^{0,1}$ に対して

$$
\begin{aligned}
\widetilde D_U(JV)
&=i\widetilde D_UV^{1,0}-i\widetilde D_UV^{0,1}\\
&=J\bigl(\widetilde D_UV^{1,0}+\widetilde D_UV^{0,1}\bigr)
=J\widetilde D_UV.
\end{aligned}
$$

従って $\widetilde DJ=0$、(3) により $\nabla^{\mathrm{LC}}J=0$。

**(2) $\Longrightarrow$ (3)**。$\nabla=\nabla^{\mathrm{LC}}$ を複素線形に延長する。(2) により $\nabla$ は $J$ と可換で、$T^{1,0}$ と $T^{0,1}$ をそれぞれ保つ。正則座標において $\nabla_{\partial_{\bar i}}\partial_j$ は $T^{1,0}$ に属する。他方Levi–Civita接続の捩率は零、座標ベクトル場の括弧も零だから

$$
\nabla_{\partial_{\bar i}}\partial_j
-\nabla_{\partial_j}\partial_{\bar i}
=[\partial_{\bar i},\partial_j]=0.
$$

右側の $\nabla_{\partial_j}\partial_{\bar i}$ は $T^{0,1}$ に属する。従って等しい二つのベクトルは $T^{1,0}\cap T^{0,1}=\{0\}$ に属し、

$$
\nabla_{\partial_{\bar i}}\partial_j=0.
$$

この式は任意の正則局所枠の各基底について成立するので、$\nabla$ の $T^{1,0}$ への制限の $(0,1)$ 部分は $\bar\partial$ である。また $\nabla g=0$ と $\nabla J=0$ から、$h(U,V)=g(U,V)+i\,g(JU,V)$（実ベクトルへの[Hermite内積の復元](../KAH1-01/index.md#prop-kah1-01-hermitian-inner-product)）について

$$
\nabla h=(\nabla g)+i\,(\nabla g)(J\cdot,\cdot)
+i\,g((\nabla J)\cdot,\cdot)=0.
$$

よって $T^{1,0}$ 上で正則構造とHermite計量を同時に保つ。[Chern接続の存在・一意性](../../CM/CM2-10/index.md#thm-cm2-10-chern-existence-uniqueness)から、その制限は $D$ と一致する。共役側も一致するため実接続として $\nabla=\widetilde D$。以上ですべてが同値。$\square$
<!-- proof-end -->

**もう一つの直接確認**。計量と捩率零の関係を使わず、(2) から (1) も見える。$\omega(U,V)=g(JU,V)$ と計量両立性から

$$
(\nabla_U\omega)(V,W)=g((\nabla_UJ)V,W).
$$

捩率が零の接続では、外微分は共変微分の交代和

$$
d\omega(U,V,W)
=(\nabla_U\omega)(V,W)
+(\nabla_V\omega)(W,U)
+(\nabla_W\omega)(U,V)
$$

である。これは外微分の定義を展開し、捩率零の式 $\nabla_UV-\nabla_VU=[U,V]$ を各組で代入して確かめられる。従って $\nabla J=0$ なら三項とも零で $d\omega=0$。**逆向き**には単にこの交代和が零というだけで各 $\nabla J$ が零とはいえない。そのため前節の可積分複素構造とChern捩率の計算が必要だった。

## 5. 非Kählerでは一致がどこで壊れるか

複素次元1では $\partial_i g_{j\bar\ell}-\partial_j g_{i\bar\ell}$ に異なる正則添字の組がない。従って任意の滑らかなHermite計量はKählerであり、二つの接続は一致する。これは曲率が零だという意味ではない。

複素次元2では壊れる。$\mathbb C^2$ 上の正値Hermite係数

$$
(g_{i\bar j})=
\begin{pmatrix}
1&0\\
0&1+|z^1|^2
\end{pmatrix}
$$

を考える。[閉性の反例](../KAH1-02/index.md#thm-kah1-02-local-closedness)と同じ計量である。係数微分と逆行列から

$$
\Gamma^2_{12}=\frac{\bar z^1}{1+|z^1|^2},
\qquad
\Gamma^2_{21}=0,
\qquad
T^{\widetilde D}(\partial_1,\partial_2)
=\frac{\bar z^1}{1+|z^1|^2}\partial_2.
$$

$z^1\ne0$ では捩率が非零であり、$D$ とLevi–Civita接続は一致しない。この非対称性は閉性の差

$$
\partial_1g_{2\bar2}-\partial_2g_{1\bar2}
=\bar z^1
$$

そのものに由来する。逆に $z^1=0$ の点だけで捩率が零でも、近傍全体のKähler性を意味しない。

捩率が消えることは接続係数が消えることとも違う。前節の非定数ポテンシャル例は、$\Gamma$ が非零でも $\Gamma^k_{ij}=\Gamma^k_{ji}$ となる。

**可積分性を外した場合**。概複素多様体 $(M,J)$ に正の $J$ 両立計量 $g$ と閉じた基本形式があれば概Kählerではある。しかし正則座標や正則接束のChern接続へ無条件に戻れない。可積分性が失われると、(2) から (1) への含意はなお成り立つ一方、(1) から (2) は一般には導けない。これは正則座標における $\nabla_{\partial_{\bar i}}\partial_j=0$ の議論が使えないことに対応する。

## 6. 演習：局所微分から接続の同一性まで

### Level A

<a id="ex-kah1-03-a01"></a>
#### KAH1-03-A01 正則接束の接続係数
- Level: A

$\mathbb C^2$ 上の定数Hermite係数 $g_{i\bar j}=\operatorname{diag}(1,2)$ について、すべての $\Gamma^k_{ij}$ とChern捩率を求め、Levi–Civita接続との関係を述べよ。

<!-- solution-start -->
**詳細解答**。定数なので $\partial_i g_{j\bar\ell}=0$。よって[係数公式](#prop-kah1-03-chern-coefficients)の各和 $\Gamma^k_{ij}=\sum_\ell g^{k\bar\ell}0=0$。正則方向の捩率は差が零、混合成分も零で、共役側も零となる。したがって[同値定理](#thm-kah1-03-main-equivalence)から $\nabla^{\mathrm{LC}}=\widetilde D$。係数が定数という事実だけでなく、捩率零と計量両立性を通じて結論した。
<!-- solution-end -->

<a id="ex-kah1-03-a02"></a>
#### KAH1-03-A02 複素次元1の捩率
- Level: A

複素曲線の正則座標で $g_{1\bar1}=e^{|z|^2}$ とする。$\Gamma^1_{11}$ を求め、捩率が零である理由を示せ。

<!-- solution-start -->
**詳細解答**。逆係数は $g^{1\bar1}=e^{-|z|^2}$。偏微分は $\partial_z e^{z\bar z}=\bar z e^{z\bar z}$ だから

$$
\Gamma^1_{11}=e^{-|z|^2}\bar z e^{|z|^2}=\bar z.
$$

一方 $(2,0)$ 捩率は $\Gamma^1_{11}-\Gamma^1_{11}=0$ しかない。混合成分はChern接続の性質で零、共役側も零。従って曲線のHermite計量はKählerで両接続は一致する。$\Gamma^1_{11}=\bar z$ が零とは限らない点に注意する。
<!-- solution-end -->

<a id="ex-kah1-03-a03"></a>
#### KAH1-03-A03 非閉性と捩率の対応
- Level: A

$g_{i\bar j}=\operatorname{diag}(1,1+|z^1|^2)$ とする。$\partial_1g_{2\bar2}-\partial_2g_{1\bar2}$ と $T^{\widetilde D}(\partial_1,\partial_2)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$\partial_1g_{2\bar2}=\bar z^1$、$g_{1\bar2}=0$ なので第二項は零。逆行列は $\operatorname{diag}(1,(1+|z^1|^2)^{-1})$。従って捩率公式へ代入すると

$$
T^{\widetilde D}(\partial_1,\partial_2)
=\frac{\bar z^1}{1+|z^1|^2}\partial_2.
$$

$z^1\ne0$ なら捩率は非零で、[Kähler閉性とChern捩率の同値性](#thm-kah1-03-closed-torsion)からその近傍の計量はKählerではない。
<!-- solution-end -->

<a id="ex-kah1-03-a04"></a>
#### KAH1-03-A04 平行な複素構造から閉性を得る
- Level: A

捩率零かつ計量両立な接続 $\nabla$ について $\nabla J=0$ を仮定し、$d\omega=0$ を示せ。

<!-- solution-start -->
**詳細解答**。$\omega(V,W)=g(JV,W)$ を微分すると、積の規則により

$$
\begin{aligned}
(\nabla_U\omega)(V,W)
&=U\,g(JV,W)-g(J\nabla_UV,W)-g(JV,\nabla_UW)\\
&=g(\nabla_U(JV)-J\nabla_UV,W)\\
&=g((\nabla_UJ)V,W)=0.
\end{aligned}
$$

ここで第二等号に $\nabla g=0$ を使った。捩率零のため、$d\omega$ は $\nabla\omega$ の巡回和と一致するので三項とも零。したがって $d\omega=0$。この向きでは可積分性を使わない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-03-b01"></a>
#### KAH1-03-B01 対角計量の分類
- Level: B

$\mathbb C^2$ 上で $g_{1\bar1}=a(z)>0$、$g_{2\bar2}=b(z)>0$、$g_{1\bar2}=g_{2\bar1}=0$（$a,b$ は滑らかな実関数）とする。Chern捩率の零条件と、Kähler性の必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答**。逆係数は $g^{1\bar1}=1/a$、$g^{2\bar2}=1/b$。正則添字の唯一の独立な組 $(1,2)$ に対し

$$
\begin{aligned}
T^{\widetilde D}(\partial_1,\partial_2)
&=\sum_{k,\ell}g^{k\bar\ell}
(\partial_1g_{2\bar\ell}-\partial_2g_{1\bar\ell})\partial_k\\
&=-\frac{\partial_2a}{a}\partial_1
+\frac{\partial_1b}{b}\partial_2.
\end{aligned}
$$

基底が独立で $a,b>0$ だから捩率零は $\partial_2a=0$ かつ $\partial_1b=0$ と同値である。$a,b$ は実関数なので共役を取れば $\partial_{\bar2}a=\partial_{\bar1}b=0$ も従う。従って $a$ は $z^1,\bar z^1$ のみ、$b$ は $z^2,\bar z^2$ のみに局所的に依存する。この条件とKähler性は[閉性・捩率の同値性](#thm-kah1-03-closed-torsion)で一致する。
<!-- solution-end -->

<a id="ex-kah1-03-b02"></a>
#### KAH1-03-B02 逆行列を外して戻す
- Level: B

一般の正値Hermite行列 $G=(g_{i\bar j})$ に対し、$T^{\widetilde D}(\partial_i,\partial_j)=0$ から $\partial_i g_{j\bar m}=\partial_jg_{i\bar m}$ を導け。逆向きと、正値性のどの性質を使うかを説明せよ。

<!-- solution-start -->
**詳細解答**。捩率が零なら各 $k$ について $\Gamma^k_{ij}-\Gamma^k_{ji}=0$。これへ $g_{k\bar m}$ を掛け、$k$ の和を取る。

$$
\begin{aligned}
0&=\sum_k g_{k\bar m}(\Gamma^k_{ij}-\Gamma^k_{ji})\\
&=\sum_{k,\ell}g_{k\bar m}g^{k\bar\ell}
(\partial_i g_{j\bar\ell}-\partial_jg_{i\bar\ell})\\
&=\sum_\ell\delta_{m\ell}
(\partial_i g_{j\bar\ell}-\partial_jg_{i\bar\ell})\\
&=\partial_i g_{j\bar m}-\partial_jg_{i\bar m}.
\end{aligned}
$$

逆向きは括弧内が零ならその逆行列との積も零という公式への直接代入である。正値Hermite行列が可逆であることが重要で、退化した行列に同じ「逆行列を掛ける」議論はできない。
<!-- solution-end -->

<a id="ex-kah1-03-b03"></a>
#### KAH1-03-B03 Kählerでも接続係数は非零
- Level: B

$t>0$、$\varphi=|z^1|^2+|z^2|^2+t|z^1|^2|z^2|^2$ とし $g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ を与える。$g$ が正値であることを確認し、少なくとも一つの非零のChern接続係数を求めた上で捩率零を示せ。

<!-- solution-start -->
**詳細解答**。係数行列は

$$
G=\begin{pmatrix}
1+t|z^2|^2&t\bar z^1 z^2\\
tz^1\bar z^2&1+t|z^1|^2
\end{pmatrix},\quad
\Delta=\det G=1+t(|z^1|^2+|z^2|^2)>0.
$$

第一対角成分も正だから $G$ は正値。上の添字規約で逆行列の該当行は $g^{2\bar1}=-t\bar z^1 z^2/\Delta$、$g^{2\bar2}=(1+t|z^2|^2)/\Delta$ である。$\partial_1g_{2\bar1}=t\bar z^2$、$\partial_1g_{2\bar2}=t\bar z^1$ なので

$$
\begin{aligned}
\Gamma^2_{12}
&=g^{2\bar1}\partial_1g_{2\bar1}
+g^{2\bar2}\partial_1g_{2\bar2}\\
&=\frac{-t^2\bar z^1|z^2|^2+t\bar z^1(1+t|z^2|^2)}{\Delta}\\
&=\frac{t\bar z^1}{\Delta}.
\end{aligned}
$$

特に $z^2=0$ では $\Delta=1+t|z^1|^2$ だから

$$
\Gamma^2_{12}\big|_{z^2=0}=\frac{t\bar z^1}{1+t|z^1|^2}.
$$

$z^1\ne0$ なら非零。一方 $\partial_1g_{2\bar\ell}=\partial_2g_{1\bar\ell}$ は $\ell=1,2$ についてそれぞれ $t\bar z^2$、$t\bar z^1$ と計算できるので全ての $\Gamma^k_{12}-\Gamma^k_{21}=0$。正値・閉性・捩率零を確認した。
<!-- solution-end -->

### Level C

<a id="ex-kah1-03-c01"></a>
#### KAH1-03-C01 変数係数から三つの条件を同時に分類する
- Level: C

実定数 $a,b$ を用いて $\mathbb C^2$ 上で

$$
G(z)=\begin{pmatrix}
1+a|z^2|^2&b\bar z^1 z^2\\
b z^1\bar z^2&1+a|z^1|^2
\end{pmatrix}
$$

とし、$g_{i\bar j}=G_{i\bar j}$ とする。(i) 全点でHermite正値となる範囲、(ii) その範囲でChern捩率が消える条件、(iii) そのときLevi–Civita接続と一致する理由を求めよ。また捩率消滅をチェックするとき、$\Gamma=0$ を課してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**。係数は共役対称である。第一主座小行列式は $1+a|z^2|^2$、行列式は

$$
\det G=1+a(|z^1|^2+|z^2|^2)+(a^2-b^2)|z^1z^2|^2.
$$

全点で正となるには $a\ge0$ が必要。$|b|>a$ なら $|z^1|=|z^2|=R$ を大きくして行列式の負の $R^4$ 項が支配するから不適。逆に $a\ge|b|$ なら両式は正であり、この条件が (i) の必要十分条件である。

次に

$$
\begin{aligned}
\partial_1g_{2\bar1}-\partial_2g_{1\bar1}
&=(b-a)\bar z^2,\\
\partial_1g_{2\bar2}-\partial_2g_{1\bar2}
&=(a-b)\bar z^1.
\end{aligned}
$$

これらが全点で零となる必要十分条件は $a=b$。正値範囲と合わせれば (ii) は $a=b\ge0$ となる。逆行列は存在するので捩率の零性とこの差の零性は同値である。

(iii) このとき $\widetilde D$ はHermite計量の実部を保ち、捩率も零。よって[Levi–Civita接続の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)から $\nabla^{\mathrm{LC}}=\widetilde D$。例えば $a=b>0$、$z^2=0$、$z^1\ne0$ では B03 と同様 $\Gamma^2_{12}=a\bar z^1/(1+a|z^1|^2)\ne0$ である。捩率は係数の**差**を測るので、各係数そのものの消滅を要求してはいけない。$\square$
<!-- solution-end -->

## 7. 章末の確認と次章

同じKähler条件を、**形式**では $d\omega=0$、**Chern接続**では捩率零、**Levi–Civita接続**では $\nabla J=0$ として捉え直した。正則座標を通じてChern捩率の係数に閉性と同じ微分差が現れることが鍵であり、可積分性を黙って外してよいわけではない。

次章は閉じた実 $(1,1)$ 形式が局所的に $\omega=i\partial\bar\partial\varphi$ と書ける理由を、単なる十分条件を超えて証明する。
