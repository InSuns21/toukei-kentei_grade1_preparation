# CM1-05 複素接束の座標変換と正則性

<!-- definition-example-audit: strict -->

## 1. 点ごとの型分解から、座標をまたぐ接束へ

[前章の型分解](../CM1-04/index.md#thm-cm1-04-splitting)によって、複素多様体 $X$ の各点 $p$ には複素次元 $n$ の空間 $(T_pX)^{1,0}$ がある。さらに[型別接束の滑らかさ](../CM1-04/index.md#prop-cm1-04-smooth-bundles)から、これらは滑らかな複素ベクトル束 $T^{1,0}X$ をなす。

しかし、**滑らかな複素ベクトル束であること**と、**正則座標を取り替えても正則な係数で貼り合うこと**は同じではない。たとえば $\mathbb C$ 上の $s(z)=\overline z\,\partial_z$ は各点で $(1,0)$ 型のベクトルを与え、滑らかに変化するが、その係数 $\overline z$ は正則でない。

ここで解きたいのは、正則座標 $z$ と $w$ を取り替えたとき、$(1,0)$ 型の基底がどの行列で移り、成分を与える関数の正則性を判定してよいか、という問題である。必要な道具は **座標変換の複素Jacobi行列** であり、三つの重なりでは行列の積が矛盾なく一致することまで確かめる。

## 2. 一つの正則座標内の複素接基底

$X$ を複素次元 $n$ の複素多様体、$(U,z)$ を正則座標とし、

$$
z=(z^1,\ldots,z^n),\qquad z^j=x^j+iy^j
$$

と書く。[前章の複素偏微分基底](../CM1-04/index.md#def-cm1-04-tangent-subbundles)を具体的に書けば、

$$
\partial_{z^j}
=\frac12(\partial_{x^j}-i\partial_{y^j}),\qquad
\partial_{\overline z^j}
=\frac12(\partial_{x^j}+i\partial_{y^j}).
$$

ここで $\partial_{z^j}$ は、実接空間の要素ではなく、複素化接空間の要素である。各点で前者 $n$ 本は $(1,0)$ 型、後者 $n$ 本は $(0,1)$ 型の基底になる。したがって $(1,0)$ 型の接ベクトル $v_p$ はただ一通り

$$
v_p=\sum_{j=1}^{n}a^j\partial_{z^j}|_p,
\qquad a^j\in\mathbb C
$$

と表される。この係数の列 $a_z=(a^1,\ldots,a^n)^T$ が座標変換でどう変わるかを調べる。

## 3. 正則な座標変換とその導関数

まず「座標変換は正則だから、そのJacobi行列の成分も正則」という主張を確認する。[CM1-01 の多変数正則写像](../CM1-01/index.md#def-cm1-01-holomorphic-map)は、実 $C^1$ 級かつ実微分が複素線形であるという定義を採用している。従って導関数の連続性だけから導関数の正則性を結論するのは飛躍になる。

<a id="lem-cm1-05-holomorphic-derivative"></a>
<!-- formal-statement-start -->
> **補題（多変数正則写像の複素偏導関数の正則性）**  
> $U\subset\mathbb C^n$ を開集合、$F:U\to\mathbb C^m$ を実 $C^1$ 級で各点の微分が複素線形な写像とする。このとき各成分 $F^a$ と各座標 $z^j$ に対し、複素偏導関数 $\partial F^a/\partial z^j$ は $U$ 上の正則関数である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの変数だけを動かすと一変数正則関数になる。その変数についての導関数を [Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives) で表し、残りの変数での微分を周回積分の中へ移す。積分される関数の Cauchy–Riemann 条件が残るため、導関数も全変数で複素線形微分を持つ。

<!-- proof-start -->
### 証明

成分を一つ固定し $f=F^a$ と書く。任意の $p\in U$ と添字 $j$ を固定する。$p$ の周りの閉多重円板が $U$ に入るように半径 $r_1,\ldots,r_n>0$ を取る。その内側で $z^j$ 以外の座標を固定した関数

$$
\zeta\longmapsto
f(z^1,\ldots,z^{j-1},\zeta,z^{j+1},\ldots,z^n)
$$

は、一変数では実 $C^1$ 級で微分が複素線形なので正則である。$p^j$ を中心とする半径 $r_j$ の円周 $C_j$ に [Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)を適用する。評価点 $z^j$ を円の内部に取れば

$$
h(z):=\frac{\partial f}{\partial z^j}(z)
=\frac{1}{2\pi i}\int_{C_j}
\frac{f(z^1,\ldots,\zeta,\ldots,z^n)}
{(\zeta-z^j)^2}\,d\zeta.
$$

この円周は近傍内で固定してよい。$k\ne j$ について $f$ の実 $C^1$ 性により、円周上の積分核とその $x^k,y^k$ 微分は連続である。コンパクトな円周上で微分と積分を交換すると

$$
\begin{aligned}
\frac{\partial h}{\partial x^k}
&=\frac{1}{2\pi i}\int_{C_j}
\frac{\partial_{x^k}f(z^1,\ldots,\zeta,\ldots,z^n)}
{(\zeta-z^j)^2}\,d\zeta,\\
\frac{\partial h}{\partial y^k}
&=\frac{1}{2\pi i}\int_{C_j}
\frac{\partial_{y^k}f(z^1,\ldots,\zeta,\ldots,z^n)}
{(\zeta-z^j)^2}\,d\zeta.
\end{aligned}
$$

仮定の複素線形性は、円周上の各 $\zeta$ に対しても

$$
\partial_{y^k}f=i\partial_{x^k}f
$$

を意味する。上の二つの積分式へ代入して差を取れば

$$
\partial_{y^k}h-i\partial_{x^k}h
=\frac{1}{2\pi i}\int_{C_j}
\frac{\partial_{y^k}f-i\partial_{x^k}f}
{(\zeta-z^j)^2}\,d\zeta=0.
$$

$z^j=x^j+iy^j$ については、固定円周の内部で $|\zeta-z^j|$ が正の下界を持つので、積分核を $x^j,y^j$ で微分してよい。具体的に、

$
\begin{aligned}
\frac{\partial h}{\partial x^j}
&=\frac{2}{2\pi i}\int_{C_j}
\frac{f(z^1,\ldots,\zeta,\ldots,z^n)}
{(\zeta-z^j)^3}\,d\zeta,\\
\frac{\partial h}{\partial y^j}
&=\frac{2i}{2\pi i}\int_{C_j}
\frac{f(z^1,\ldots,\zeta,\ldots,z^n)}
{(\zeta-z^j)^3}\,d\zeta
=i\frac{\partial h}{\partial x^j}.
\end{aligned}
$

ここでは積分の分子が $z^j$ に依存しないことを使った。従って $j$ 方向にも Cauchy–Riemann 条件が成立する。偏微分は積分表示から局所的に連続であり、全ての複素座標方向について Cauchy–Riemann 条件が成り立つ。従って $Dh$ は複素線形である。[複素線形微分による多変数正則写像の定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)を適用し、$h$ の正則性を得る。$p,j,a$ は任意なので結論が従う。$\square$
<!-- proof-end -->

次に、二つの正則座標 $(U_\alpha,z_\alpha)$ と $(U_\beta,z_\beta)$ を取り、重なり $W=U_\alpha\cap U_\beta$ で

$$
w=z_\beta\circ z_\alpha^{-1}(z)=F_{\beta\alpha}(z)
$$

と置く。$F_{\beta\alpha}$ は[正則アトラスの条件](../CM1-01/index.md#def-cm1-01-atlas)から双正則である。

<a id="def-cm1-05-transition-matrix"></a>
<!-- formal-statement-start -->
> **定義（複素接枠の遷移行列）**  
> 複素 $n$ 次元多様体の二つの正則座標 $(U_\alpha,z_\alpha)$、$(U_\beta,z_\beta)$ の重なり $W$ において、$F_{\beta\alpha}=z_\beta\circ z_\alpha^{-1}$ と置く。$p\in W$ に対して次の $n\times n$ 複素行列を、$\alpha$ 座標の成分列から $\beta$ 座標の成分列への **複素接枠の遷移行列** とする。

$$
G_{\beta\alpha}(p)
=D_{\mathbb C}F_{\beta\alpha}(z_\alpha(p))
=\left(\frac{\partial z_\beta^a}{\partial z_\alpha^j}(p)\right)_{a,j=1}^n.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-05-transition-matrix -->
**定義の確認**。$\mathbb C^2$ の恒等座標 $z=(z^1,z^2)$ と剪断座標 $w=(z^1,z^2+(z^1)^2)$ を使うと

$$
G_{wz}(z)=
\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}.
$$

$w^1=z^1$、$w^2=z^2+(z^1)^2$ を偏微分したもので、行列式は $1$。逆座標は $z^1=w^1$、$z^2=w^2-(w^1)^2$ であるから、その微分は

$$
G_{zw}(w)=
\begin{pmatrix}1&0\\-2w^1&1\end{pmatrix}.
$$

同じ点で $w^1=z^1$ を代入すると、両者の積は単位行列になる。
<!-- definition-example-end -->

<a id="thm-cm1-05-frame-change"></a>
<!-- formal-statement-start -->
> **定理（複素接枠と成分列の座標変換則）**  
> $X$ を複素次元 $n$ の複素多様体、$(U_\alpha,z_\alpha)$ と $(U_\beta,z_\beta)$ を正則座標、$W=U_\alpha\cap U_\beta$ とする。$p\in W$ に対し
>
> $G_{\beta\alpha}(p)=D_{\mathbb C}(z_\beta\circ z_\alpha^{-1})(z_\alpha(p))$
>
> と置く。この行列はすべての $p\in W$ で可逆で、$z_\alpha$ で表した各行列成分は正則である。複素接基底の変換は

$$
\left.\partial_{z_\alpha^j}\right|_p
=\sum_{a=1}^n (G_{\beta\alpha}(p))_{aj}
\left.\partial_{z_\beta^a}\right|_p
$$

> である。同じベクトルを二つの座標基底で展開すると

$$
v_p=\sum_j a_\alpha^j\partial_{z_\alpha^j}|_p
=\sum_a a_\beta^a\partial_{z_\beta^a}|_p
$$

> と表せる。このとき係数列は

$$
a_\beta(p)=G_{\beta\alpha}(p)a_\alpha(p)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[実微分の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を複素化接ベクトルに適用する。正則性は $\partial\overline w/\partial z=0$ という混合項の消失として現れ、可逆性は逆座標の微分から得られる。

<!-- proof-start -->
### 証明

$w^a=F_{\beta\alpha}^a(z)$ とする。実 $C^1$ 級の座標関数に作用する[複素偏微分基底](../CM1-04/index.md#def-cm1-04-tangent-subbundles)と[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)から

$$
\partial_{z^j}
=\sum_{a=1}^n
\left(\frac{\partial w^a}{\partial z^j}\partial_{w^a}
+\frac{\partial\overline w^a}{\partial z^j}\partial_{\overline w^a}\right)
$$

となる。ここで $w$ は正則なので $\partial w^a/\partial\overline z^j=0$、従って

$$
\frac{\partial\overline w^a}{\partial z^j}
=\overline{\frac{\partial w^a}{\partial\overline z^j}}=0.
$$

残る第一項の係数が $(G_{\beta\alpha})_{aj}$ であり、基底の変換公式が得られる。接ベクトルの展開へ代入して項を集めると

$$
\begin{aligned}
v_p
&=\sum_j a_\alpha^j(p)\partial_{z_\alpha^j}|_p\\
&=\sum_j a_\alpha^j(p)
   \sum_a (G_{\beta\alpha}(p))_{aj}\partial_{z_\beta^a}|_p\\
&=\sum_a\left(\sum_j (G_{\beta\alpha}(p))_{aj}a_\alpha^j(p)\right)
    \partial_{z_\beta^a}|_p.
\end{aligned}
$$

基底係数の一意性により $a_\beta=G_{\beta\alpha}a_\alpha$ となる。両方向の座標遷移は逆写像なので、[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を $F_{\alpha\beta}\circ F_{\beta\alpha}=\operatorname{id}$ に用いると

$$
D_{\mathbb C}F_{\alpha\beta}(w)\,
D_{\mathbb C}F_{\beta\alpha}(z)=I_n.
$$

従って $G_{\beta\alpha}$ は可逆で、その逆は $G_{\alpha\beta}$ である。ただし両行列は同じ点 $p$ で評価する。行列成分の正則性は[複素偏導関数の正則性](#lem-cm1-05-holomorphic-derivative)を各 $F_{\beta\alpha}^a$ に適用した結果である。$\square$
<!-- proof-end -->

例えば上の剪断座標では

$$
\partial_{z^1}=\partial_{w^1}+2z^1\partial_{w^2},
\qquad
\partial_{z^2}=\partial_{w^2}.
$$

行列が掛かるのは「座標成分の列」である。**基底が行列 $G$ に従って書き換わるのと、成分が $G$ 倍になるのを逆向きに記憶しない**。上の二つの式に実際に代入して確かめられる。

## 4. 三重の座標重なりで矛盾が起きない理由

二座標の間で可逆な行列を定められるだけでは、三つ目の座標を経由したときに値が食い違う可能性が残る。$\alpha\to\beta\to\gamma$ と変換した結果は、$\alpha\to\gamma$ と直接変換した結果に一致しなければならない。

<a id="thm-cm1-05-cocycle"></a>
<!-- formal-statement-start -->
> **定理（複素接枠の遷移行列の合成条件）**  
> 複素多様体 $X$ の三つの正則座標 $(U_\alpha,z_\alpha)$、$(U_\beta,z_\beta)$、$(U_\gamma,z_\gamma)$ について、三重共通部分の各点 $p$ で

$$
G_{\gamma\beta}(p)G_{\beta\alpha}(p)
=G_{\gamma\alpha}(p),\qquad
G_{\alpha\alpha}(p)=I_n,\qquad
G_{\alpha\beta}(p)=G_{\beta\alpha}(p)^{-1}.
$$

> さらに各行列成分は対応する正則座標における正則関数である。
<!-- formal-statement-end -->

### 証明の見取り図

座標遷移写像自体が $F_{\gamma\alpha}=F_{\gamma\beta}\circ F_{\beta\alpha}$ を満たす。評価点を明記した複素微分の連鎖律を取れば行列の積の順序が決まる。

<!-- proof-start -->
### 証明

三重共通部分上の $z=z_\alpha(p)$、$w=z_\beta(p)$ を固定する。座標写像の合成は

$$
\begin{aligned}
F_{\gamma\alpha}(z)
&=z_\gamma\!\left(z_\alpha^{-1}(z)\right)\\
&=z_\gamma\!\left(z_\beta^{-1}
 \left(z_\beta(z_\alpha^{-1}(z))\right)\right)\\
&=F_{\gamma\beta}(F_{\beta\alpha}(z)).
\end{aligned}
$$

従って[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を右側の二写像に適用すると

$$
\begin{aligned}
D_{\mathbb C}F_{\gamma\alpha}(z)
&=D_{\mathbb C}F_{\gamma\beta}
  (F_{\beta\alpha}(z))D_{\mathbb C}F_{\beta\alpha}(z)\\
&=D_{\mathbb C}F_{\gamma\beta}(w)D_{\mathbb C}F_{\beta\alpha}(z)\\
&=G_{\gamma\beta}(p)G_{\beta\alpha}(p).
\end{aligned}
$$

左辺は $G_{\gamma\alpha}(p)$ である。$\beta=\alpha$ とした恒等座標の微分から $G_{\alpha\alpha}=I_n$。$\gamma=\alpha$ と置けば $G_{\alpha\beta}G_{\beta\alpha}=I_n$ で、各行列は正方行列だから逆行列の関係も成立する。成分の正則性は[前節の補題](#lem-cm1-05-holomorphic-derivative)による。$\square$
<!-- proof-end -->

この積の条件があるため、$a_\beta=G_{\beta\alpha}a_\alpha$、$a_\gamma=G_{\gamma\beta}a_\beta$ と移した列は直接の $a_\gamma=G_{\gamma\alpha}a_\alpha$ と一致する。これは接束を座標表示から扱う際の貼り合わせの整合性である。

## 5. 正則な接ベクトル場と単に滑らかな型別ベクトル場

$(1,0)$ 型の滑らかな場であることは、点ごとに $Jv=iv$ を満たすことを意味する。一方、正則であるためには、接枠に沿って書いた各係数が複素変数に関して正則でなければならない。この二つを区別するため、座標を選んで係数を検査する。

<a id="def-cm1-05-holomorphic-tangent-section"></a>
<!-- formal-statement-start -->
> **定義（正則な複素接束の切断）**  
> $X$ を複素次元 $n$ の複素多様体、$V\subset X$ を開集合とする。$V$ 上の $T^{1,0}X$ の滑らかな切断 $s$ が **正則** であるとは、任意の正則座標 $(U_\alpha,z_\alpha)$ で $V\cap U_\alpha$ 上の表示

$$
s=\sum_{j=1}^n a_\alpha^j\partial_{z_\alpha^j}
$$

> のすべての成分を与える関数 $a_\alpha^j$ が、その座標で正則であることをいう。各 $\partial_{z_\alpha^j}$ はこの意味で局所的な正則枠をなす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-05-holomorphic-tangent-section -->
**定義の確認**。$\mathbb C$ の標準座標で $s=z^2\partial_z$ と置く。これは各点で $J$ の $i$ 固有空間に入り、係数 $z^2$ は複素微分可能だから正則である。一方 $t=\overline z\,\partial_z$ も同じ $i$ 固有空間に属する滑らかな場だが、$\partial_{\overline z}\overline z=1$ で正則でない。型は同じでも係数の正則性が異なる。
<!-- definition-example-end -->

<a id="thm-cm1-05-section-invariance"></a>
<!-- formal-statement-start -->
> **定理（接ベクトル場の正則性の座標不変性）**  
> 複素多様体 $X$ の開集合 $V$ 上の滑らかな $(1,0)$ 型接ベクトル場 $s$ について、一つの正則座標で成分列が正則なら、その座標と重なる任意の正則座標でも成分列は正則である。従って正則な$(1,0)$接ベクトル場という性質は座標の取り方に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

成分は $a_\beta=G_{\beta\alpha}a_\alpha$ と変わる。すべての行列成分と $a_\alpha$ が正則なので積も正則になる。逆向きにも逆遷移行列を使える。

<!-- proof-start -->
### 証明

重なりで $s=\sum_j a_\alpha^j\partial_{z_\alpha^j}$ と表示し、$a_\alpha^j$ は正則とする。[複素接枠と成分列の座標変換則](#thm-cm1-05-frame-change)から

$$
a_\beta^a(p)=\sum_{j=1}^n
(G_{\beta\alpha}(p))_{aj}\,a_\alpha^j(p).
$$

$\beta$ 座標を $w$ とし、$p=z_\beta^{-1}(w)$ と置く。$\alpha$ 座標で表示された成分を $w$ に移すには、変換 $F_{\alpha\beta}$ を使う。実際、

$$
(a_\alpha^j\circ z_\beta^{-1})(w)
=(a_\alpha^j\circ z_\alpha^{-1})(F_{\alpha\beta}(w)).
$$

右辺の第一の関数は仮定により正則である。また $F_{\alpha\beta}$ は[正則アトラスの条件](../CM1-01/index.md#def-cm1-01-atlas)により正則だから、[正則写像の合成](../CM1-01/index.md#prop-cm1-01-composition)によって $w$ に関する成分も正則になる。

[偏導関数の正則性](#lem-cm1-05-holomorphic-derivative)から、$G_{\beta\alpha}$ の各成分も $w$ 座標で正則である。係数変換式の右辺は有限個の正則関数の積と和なので、各 $a_\beta^a$ が正則になる。

逆に $a_\beta$ が正則なら $a_\alpha=G_{\alpha\beta}a_\beta$ に同じ議論を適用する。各点の周りの重なりで示したから全域で成り立つ。$\square$
<!-- proof-end -->

**剪断座標で確認する**。先の $w^1=z^1$、$w^2=z^2+(z^1)^2$ に対し

$$
s=z^1\partial_{z^1}+z^2\partial_{z^2}
$$

を取ると、成分列は

$$
\begin{aligned}
a_w&=
\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}
\begin{pmatrix}z^1\\z^2\end{pmatrix}
=\begin{pmatrix}z^1\\2(z^1)^2+z^2\end{pmatrix}\\
&=\begin{pmatrix}w^1\\w^2+(w^1)^2\end{pmatrix}.
\end{aligned}
$$

どちらの成分も $w$ に関して正則であり、単に $z$ の式をコピーするのでなく、**行列で係数を変換したうえで $w$ に置き換える**必要がある。

### 正則でない実座標を混ぜると何が起きるか

実平面上の $u=z+\frac12\overline z$ は、$z=x+iy$ とすると $u=\frac32x+\frac12iy$ であり、実線形微分同相である。しかし $\partial_{\overline z}u=\frac12$ なので正則座標変換ではない。Wirtinger 基底へ実連鎖律を適用すると

$$
\partial_z
=\frac{\partial u}{\partial z}\partial_u+
\frac{\partial\overline u}{\partial z}\partial_{\overline u}
=\partial_u+\frac12\partial_{\overline u}.
$$

混合項が残る。ここで $\partial_u$、$\partial_{\overline u}$ はあくまで **実座標 $u$ から形式的に作ったWirtinger基底** であり、与えられた $J$ の固有基底とは限らない。従って実 $C^\infty$ 座標が存在するだけでは、複素接束の正則な遷移行列は得られない。

## 6. 写像の微分も行列で整合する

[正則写像の型保存](../CM1-04/index.md#thm-cm1-04-type-preservation)は、正則写像の微分が $(1,0)$ 型を $(1,0)$ 型に送ることを示した。本章ではそれを座標行列で見られる。$f:X\to Y$ を正則写像、$z$ と $w$ を始点・終点の正則座標、$F=w\circ f\circ z^{-1}$ とすると、

$$
d_{\mathbb C}f_p(\partial_{z^j}|_p)
=\sum_{a=1}^m
\frac{\partial F^a}{\partial z^j}(z(p))
\partial_{w^a}|_{f(p)}.
$$

$\partial\overline F/\partial z^j=0$ だから $(0,1)$ 成分がなく、[補題](#lem-cm1-05-holomorphic-derivative)からこの $m\times n$ 行列の各成分は正則である。始点座標を $z'$、終点座標を $w'$ に替えたときも、どの点でどの行列を評価するかを追える。$q=f(p)$ とし、元の座標での微分行列を

$
H_{wz}(p)=D_{\mathbb C}(w\circ f\circ z^{-1})(z(p))
$

と置く。新しい座標表示は

$
w'\circ f\circ(z')^{-1}
=(w'\circ w^{-1})\circ(w\circ f\circ z^{-1})
\circ(z\circ(z')^{-1})
$

である。よって[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)と[接枠の遷移行列の定義](#def-cm1-05-transition-matrix)から

$
\begin{aligned}
H_{w'z'}(p)
&=D_{\mathbb C}(w'\circ w^{-1})(w(q))\,
  H_{wz}(p)\,
  D_{\mathbb C}(z\circ(z')^{-1})(z'(p))\\
&=G^Y_{w'w}(q)\,H_{wz}(p)\,G^X_{zz'}(p).
\end{aligned}
$

ここで $G^X,G^Y$ はそれぞれ始点多様体と終点多様体の遷移行列である。右端が始点の **逆向きの座標遷移** $z'\to z$、左端が終点の $w\to w'$ になる。この評価点と積の順序が、正則写像の微分を二つの複素接束の間で扱える理由である。

## 7. 演習（全問詳細解答）

### Level A

<a id="ex-cm1-05-a01"></a>
#### CM1-05-A01 剪断座標の接枠
- Level: A

$\mathbb C^2$ で $w^1=z^1$、$w^2=z^2+(z^1)^2$ とする。$G_{wz}$ と $G_{zw}$ を求め、$\partial_{z^1}$ を $w$ 基底で表せ。

<!-- solution-start -->
**詳細解答**。成分を $z$ で偏微分すると

$$
G_{wz}=\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}.
$$

逆変換は $z^1=w^1$、$z^2=w^2-(w^1)^2$ であり、

$$
G_{zw}=\begin{pmatrix}1&0\\-2w^1&1\end{pmatrix}.
$$

同じ点では $w^1=z^1$ だから、積の左下成分は $-2z^1+2z^1=0$、対角成分はともに $1$、右上は $0$。よって互いに逆行列である。[接枠変換則](#thm-cm1-05-frame-change)の第一列を使い

$$
\partial_{z^1}=\partial_{w^1}+2z^1\partial_{w^2}
=\partial_{w^1}+2w^1\partial_{w^2}.
$$
<!-- solution-end -->

<a id="ex-cm1-05-a02"></a>
#### CM1-05-A02 反転座標の一次元接ベクトル場
- Level: A

$\mathbb C^\times$ 上で $w=1/z$ と置く。$s=z^2\partial_z$ の $w$ 座標係数を求め、正則か確かめよ。

<!-- solution-start -->
**詳細解答**。$dw/dz=-z^{-2}$ であり、$z\ne0$ なので逆数も存在する。[変換則](#thm-cm1-05-frame-change)で

$$
\partial_z=-z^{-2}\partial_w,\qquad
s=z^2(-z^{-2})\partial_w=-\partial_w.
$$

$w$ 座標で係数は定数 $-1$ だから正則である。元の $z^2$ も正則なので[座標不変性](#thm-cm1-05-section-invariance)と一致する。
<!-- solution-end -->

<a id="ex-cm1-05-a03"></a>
#### CM1-05-A03 型と正則性の違い
- Level: A

$\mathbb C$ 上の $s=\overline z\,\partial_z$ が $(1,0)$ 型の滑らかな場であることを示し、正則でないことを確かめよ。

<!-- solution-start -->
**詳細解答**。[固有空間の定義](../CM1-04/index.md#def-cm1-04-type-spaces)により $J\partial_z=i\partial_z$。$J$ は複素線形拡張なので

$$
J(\overline z\,\partial_z)
=\overline z\,J\partial_z
=i\overline z\,\partial_z=is.
$$

$\overline z=x-iy$ は実 $C^\infty$ 級だから $s$ は滑らかである。一方、係数の偏微分を計算すると

$$
\partial_{\overline z}\overline z
=\frac12(\partial_x+i\partial_y)(x-iy)
=\frac{1+1}{2}=1
$$

となる。従って係数は正則でなく、[正則切断の定義](#def-cm1-05-holomorphic-tangent-section)を満たさない。
<!-- solution-end -->

<a id="ex-cm1-05-a04"></a>
#### CM1-05-A04 三つの一次元座標
- Level: A

$\mathbb C^\times$ 上で $w=2z$、$u=w^2$ とする。ただし $|z-1|<1/4$ に制限し、各写像をその開円板上の座標とする。$G_{wz}$、$G_{uw}$、$G_{uz}$ を求め、合成条件を直接確認せよ。

<!-- solution-start -->
**詳細解答**。一次元では遷移行列は導関数そのものだから

$$
G_{wz}=2,\quad G_{uw}=2w=4z.
$$

合成は $u=(2z)^2=4z^2$、従って $G_{uz}=du/dz=8z$。積も

$$
G_{uw}G_{wz}=(4z)\cdot2=8z=G_{uz}.
$$

指定した円板では $\operatorname{Re}z>3/4$ である。二点 $z_1,z_2$ が $4z_1^2=4z_2^2$ を満たせば $z_1=z_2$ または $z_1=-z_2$ だが、後者は両点の実部が正であることに反する。従って $u=4z^2$ はこの円板上で単射であり、導関数 $8z\ne0$ なので局所正則逆写像を持つ。局所逆写像は単射性によりつながり、指定円板上の正則座標になる。一方 $u=w^2$ は $\mathbb C^\times$ 全体では単射でなく、全域の単一座標にはならない。[合成条件](#thm-cm1-05-cocycle)は各局所重なりで成立する。
<!-- solution-end -->

<a id="ex-cm1-05-a05"></a>
#### CM1-05-A05 行列式と係数の変換
- Level: A

$w=(z^1,z^2+(z^1)^2)$、$s=z^1\partial_{z^1}+\partial_{z^2}$ とする。$\det G_{wz}$ と $s$ の $w$ 成分を求めよ。

<!-- solution-start -->
**詳細解答**。偏導から $G_{wz}=\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}$ なので $\det G_{wz}=1$。[成分列の変換則](#thm-cm1-05-frame-change)で元の係数列 $(z^1,1)^T$ に掛けると

$$
G_{wz}\begin{pmatrix}z^1\\1\end{pmatrix}
=\begin{pmatrix}z^1\\2(z^1)^2+1\end{pmatrix}
=\begin{pmatrix}w^1\\2(w^1)^2+1\end{pmatrix}.
$$

いずれの係数も多項式で正則である。
<!-- solution-end -->

### Level B

<a id="ex-cm1-05-b01"></a>
#### CM1-05-B01 実座標による型の混合
- Level: B

$u=z+c\overline z$（定数 $c\in\mathbb C$、$0<|c|<1$）は実微分同相であるが正則でないことを示し、$\partial_z$ を $u$ の Wirtinger 基底で表せ。混合項が消える条件も答えよ。

<!-- solution-start -->
**詳細解答**。$u=z+c\overline z$ と共役式 $\overline u=\overline z+\overline c z$ から

$$
u-c\overline u=(1-|c|^2)z,\qquad
z=\frac{u-c\overline u}{1-|c|^2}.
$$

$|c|<1$ なので逆実線形写像が存在し、実微分同相である。しかし $\partial_{\overline z}u=c\ne0$ だから正則ではない。$u$ と $\overline u$ を独立な実変数の複素結合として連鎖律を使うと

$$
\partial_z
=\left(\partial_zu\right)\partial_u+
 \left(\partial_z\overline u\right)\partial_{\overline u}
=\partial_u+\overline c\,\partial_{\overline u}.
$$

したがって混合項は $\overline c\,\partial_{\overline u}$ であり、$c=0$ の場合に限り消える。この座標で作った $\partial_u$ は元の $J$ の $i$ 固有基底であるとは限らないため、混合が現れても[型分解](../CM1-04/index.md#thm-cm1-04-splitting)と矛盾しない。
<!-- solution-end -->

<a id="ex-cm1-05-b02"></a>
#### CM1-05-B02 反転座標の冪と延長
- Level: B

$z\ne0$ で $w=1/z$ とし、整数 $k$ に対して $s_k=z^k\partial_z$ を考える。$w$ 座標での係数を求め、$w=0$ を加えた近傍へ正則に延長できる $k$ を判定せよ。さらに $z=0$ の近傍と両方へ延長できる $k$ を答えよ。

<!-- solution-start -->
**詳細解答**。[接枠変換則](#thm-cm1-05-frame-change)に反転微分 $dw/dz=-z^{-2}$ を代入すると

$$
s_k=z^k(-z^{-2})\partial_w
=-z^{k-2}\partial_w
=-w^{2-k}\partial_w.
$$

整数冪 $w^{2-k}$ が $w=0$ で正則に延長できるのは指数が非負、すなわち $2-k\ge0$ または $k\le2$ のときに限る。逆に $2-k<0$ なら係数は極を持ち、正則延長は不可能である。

$z=0$ での係数は $z^k$ なので、こちらへの延長条件は $k\ge0$。両方を満たすのは $0\le k\le2$、従って $k=0,1,2$ である。これは[Riemann球面の標準アトラス](../../../解析系/CA/CA8/index.md#prop-ca8-riemann-sphere-atlas)で接ベクトル場を比較する計算にもなっている。
<!-- solution-end -->

<a id="ex-cm1-05-b03"></a>
#### CM1-05-B03 一般の正則剪断
- Level: B

$\phi:\mathbb C\to\mathbb C$ を正則関数とし、$w^1=z^1$、$w^2=z^2+\phi(z^1)$ とする。二座標が双正則であることを示し、$s=a(z^1)\partial_{z^1}+b(z^1)\partial_{z^2}$（$a,b$ は正則）の $w$ 成分を求めよ。

<!-- solution-start -->
**詳細解答**。逆写像は $z^1=w^1$、$z^2=w^2-\phi(w^1)$ であり、二つの合成は恒等になる。$\phi$ と恒等写像の和・合成だから両方向とも正則である。偏微分行列は

$$
G_{wz}
=\begin{pmatrix}1&0\\\phi'(z^1)&1\end{pmatrix},
\qquad \det G_{wz}=1.
$$

元の係数列 $(a(z^1),b(z^1))^T$ を掛ければ

$$
a_w=\begin{pmatrix}
a(z^1)\\ \phi'(z^1)a(z^1)+b(z^1)
\end{pmatrix}
=\begin{pmatrix}
a(w^1)\\ \phi'(w^1)a(w^1)+b(w^1)
\end{pmatrix}.
$$

[偏導関数の正則性](#lem-cm1-05-holomorphic-derivative)により $\phi'$ は正則で、和と積も正則。したがって新成分も正則となる。
<!-- solution-end -->

<a id="ex-cm1-05-b04"></a>
#### CM1-05-B04 複素線形座標と行列の共役変換
- Level: B

$A\in GL_n(\mathbb C)$、$C\in M_n(\mathbb C)$ を定数行列とし、$w=Az$、$s(z)=\sum_j(Cz)_j\partial_{z^j}$ とする。$s$ の $w$ 成分を求め、正則性を確かめよ。

<!-- solution-start -->
**詳細解答**。$A$ が複素線形で可逆なので $z=A^{-1}w$ は逆の正則座標変換である。その微分は定数行列 $G_{wz}=A$。[成分変換則](#thm-cm1-05-frame-change)より

$$
a_w=A(Cz)=AC(A^{-1}w)=(ACA^{-1})w.
$$

$ACA^{-1}$ は定数複素行列であるから、各成分は $w$ の複素線形多項式で正則である。係数行列が $C$ のままでなく $ACA^{-1}$ になる理由は、場の成分と入力座標の双方を変換するためである。
<!-- solution-end -->

### Level C

<a id="ex-cm1-05-c01"></a>
#### CM1-05-C01 三重座標・接枠・正則性の総合
- Level: C

$X=\mathbb C^2$ に次の三つの大域正則座標を取る。

$$
z=(z^1,z^2),\qquad
w=(z^1,z^2+(z^1)^2),\qquad
u=(w^1+w^2,w^2).
$$

1. $G_{wz}$、$G_{uw}$、$G_{uz}$ を求め、合成条件を検算せよ。
2. $s=z^1\partial_{z^1}+z^2\partial_{z^2}$ の $u$ 成分を、まず $w$ を経由して求めよ。
3. $u$ だけの関数に直し、$G_{uz}$ を直接使った答えと一致すること、正則性が保存されることを確認せよ。

<!-- solution-start -->
**詳細解答**。

**1. 遷移行列**。$w^1=z^1$、$w^2=z^2+(z^1)^2$ の偏微分は

$$
G_{wz}=\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}.
$$

$u^1=w^1+w^2$、$u^2=w^2$ から

$$
G_{uw}=\begin{pmatrix}1&1\\0&1\end{pmatrix}.
$$

直接 $u^1=z^1+z^2+(z^1)^2$、$u^2=z^2+(z^1)^2$ と書いて微分すれば

$$
G_{uz}=\begin{pmatrix}1+2z^1&1\\2z^1&1\end{pmatrix}.
$$

積を計算すると

$$
\begin{pmatrix}1&1\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\2z^1&1\end{pmatrix}
=\begin{pmatrix}1+2z^1&1\\2z^1&1\end{pmatrix}=G_{uz}.
$$

行列式はすべて $1$ で、三座標の遷移は双正則である。

**2. 二段階の成分計算**。$z$ での係数列は $(z^1,z^2)^T$ である。[成分変換則](#thm-cm1-05-frame-change)を最初の座標変換に適用すると

$$
a_w=G_{wz}a_z
=\begin{pmatrix}z^1\\2(z^1)^2+z^2\end{pmatrix}
=\begin{pmatrix}w^1\\w^2+(w^1)^2\end{pmatrix}.
$$

さらに

$$
a_u=G_{uw}a_w
=\begin{pmatrix}w^1+w^2+(w^1)^2\\w^2+(w^1)^2\end{pmatrix}.
$$

**3. 直接変換と正則性**。$u^2=w^2$、$u^1-u^2=w^1=z^1$ と解く。従って

$$
a_u=\begin{pmatrix}
u^1+(u^1-u^2)^2\\
u^2+(u^1-u^2)^2
\end{pmatrix}.
$$

一方、直接変換の計算は

$$
\begin{aligned}
G_{uz}a_z
&=\begin{pmatrix}
(1+2z^1)z^1+z^2\\2z^1\cdot z^1+z^2
\end{pmatrix}\\
&=\begin{pmatrix}
z^1+2(z^1)^2+z^2\\2(z^1)^2+z^2
\end{pmatrix}.
\end{aligned}
$$

$z^1=u^1-u^2$、$z^2=u^2-(u^1-u^2)^2$ を代入すると、上の $u$ 成分へ一致する。両成分は $u^1,u^2$ の多項式なので正則。これは[合成条件](#thm-cm1-05-cocycle)と[正則性の座標不変性](#thm-cm1-05-section-invariance)を同時に検算している。
<!-- solution-end -->

---

## 8. この結果から先に進むために

複素接束は、点ごとの固有空間を集めただけでなく、**正則座標由来の枠が正則可逆行列で貼り合わされる**ことまで示せた。切断の正則性も、局所係数を一座標で検査すれば十分である。

ただし、滑らかな概複素構造 $(M,J)$ から得られる $T^{1,0}M$ が、一般にこのような **正則座標由来の枠** を持つと主張したわけではない。先に示したのは、既に複素アトラスが与えられた場合の結論である。次章では、滑らかな $J$ から正則座標を得るために必要となる条件を、局所的な型別切断の交換子から調べる。
