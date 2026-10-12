# CM1-02 複素多様体間の正則写像と座標不変性

<!-- definition-example-audit: strict -->

## 1. 座標そのものではなく、空間の間の写像を調べる

前章では、[複素多様体の定義](../CM1-01/index.md#def-cm1-01-manifold)によって、空間の各点の近傍を $\mathbb C^n$ の開集合へ写し、重なる座標の変換を正則にできた。しかし、空間 $X$ から別の空間 $Y$ への写像 $f$ を考えるとき、$f(p)$ そのものは一般に複素数の組ではない。座標に移して初めて微分が計算できる。

解きたい問いは、**座標で見た写像が正則なら、その性質は座標の選び方を変えても保存されるか**である。保存されなければ、正則性は幾何学的な性質と呼べない。

本章では、次の順に進む。

1. 写像を始点・終点の座標で表し、定義域を明確にする。
2. 座標を替えた式を三つの写像の合成として書き、正則性の不変性を証明する。
3. 写像の合成、正則な逆写像、座標によらない複素Jacobi行列の階数を扱う。
4. Riemann球面、直積、非線形座標で計算し、局所的性質と大域的性質を区別する。

ここでは実接束上の概複素構造 $J$ や複素接束をまだ導入しない。後続章でその言葉を得るまでは、微分を各座標で計算し、座標変換行列で比較する。

## 2. どの開集合で座標表示を作るのか

$X,Y$ を複素次元 $n,m$ の複素多様体、$f:X\to Y$ を連続写像とする。$p\in X$ について、$p\in U$ である $X$ の座標 $(U,\varphi)$ と、$f(p)\in V$ である $Y$ の座標 $(V,\psi)$ を選ぶ。

$f(U)$ が全て $V$ に入る必要はない。正しい始点の範囲は $U\cap f^{-1}(V)$ である。$f$ の連続性によりこの集合は開で、$\varphi$ も同相だから、次の写像は開集合上で定義される。

$$
f_{\psi\varphi}
=\psi\circ f\circ\varphi^{-1}:
\varphi(U\cap f^{-1}(V))\longrightarrow\psi(V)\subset\mathbb C^m.
$$

前章の[多変数正則写像](../CM1-01/index.md#def-cm1-01-holomorphic-map)をこの座標表示に適用する。

<a id="def-cm1-02-holomorphic-map"></a>
<!-- formal-statement-start -->
> **定義（複素多様体間の正則写像）**  
> $X,Y$ をそれぞれ複素次元 $n,m$ の複素多様体、$f:X\to Y$ を連続写像とする。$p\in X$ で $f$ が **正則** であるとは、$p$ と $f(p)$ を含む任意の複素座標 $(U,\varphi)$、$(V,\psi)$ に対して、$f_{\psi\varphi}$ が $\varphi(p)$ の近傍で多変数正則であることをいう。全ての $p\in X$ で正則である写像を **正則写像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-02-holomorphic-map -->
**定義の確認**。$X=\mathbb C$、$Y=\mathbb C^2$ とし、$f(z)=(z,z^2)$ を考える。両側に恒等座標を選ぶと、増分 $h$ に対して

$$
f(z+h)-f(z)=(h,2zh)+(0,h^2).
$$

一次項は複素線形で、残差のノルムは $|h|^2=o(|h|)$ である。微分の係数 $(1,2z)$ は連続なので恒等座標で正則である。任意の座標へ替えても正則となることは、次節の定理によって保証される。
<!-- definition-example-end -->

**非例**。$\mathbb C\to\mathbb C$ の $k(z)=\overline z$ は連続だが、恒等座標において $Dk(ih)=-i\overline h$、$iDk(h)=i\overline h$ となる。$h=1$ で不一致なので正則でない。始点・終点が複素多様体でも、連続写像が自動的に正則になるわけではない。

## 3. 座標の選択が正則性を変えない

定義に「任意の座標」と書いたが、実際には一点につき**一組の座標で確認すれば十分**である。その根拠を証明する。

<a id="thm-cm1-02-coordinate-independence"></a>
<!-- formal-statement-start -->
> **定理（正則写像の座標不変性）**  
> $f:X\to Y$ を複素多様体間の連続写像、$p\in X$ とする。$p,f(p)$ を含むある一組の座標 $(U,\varphi)$、$(V,\psi)$ で $\psi\circ f\circ\varphi^{-1}$ が $\varphi(p)$ の近傍で正則なら、$p,f(p)$ を含む任意の別の座標 $(U',\varphi')$、$(V',\psi')$ でも $\psi'\circ f\circ(\varphi')^{-1}$ が $\varphi'(p)$ の近傍で正則となる。従って一点ごとに一組の座標表示を確認すれば、前節の正則性の定義を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

座標表示を取り替えると、始点側は旧座標へ変換してから $f$ を適用し、終点側は旧座標から新座標へ変換する。つまり **新しい表示 = 終点遷移 $\circ$ 旧表示 $\circ$ 始点遷移** となる。三つの写像が定義される近傍を明示することが要点である。

<!-- proof-start -->
### 証明

$q=f(p)$ と置く。$U,U'$ は $p$ を、$V,V'$ は $q$ を含む。$f$ の連続性から

$$
W=U\cap U'\cap f^{-1}(V\cap V')
$$

は $p$ の開近傍である。仮定の正則性が成り立つ領域を狭め、必要なら $W$ もさらに $p$ の近傍へ縮める。すると $x\in W$ について、全ての合成が定義でき、

$$
\begin{aligned}
\psi'\circ f\circ(\varphi')^{-1}
&=(\psi'\circ\psi^{-1})\circ
  (\psi\circ f\circ\varphi^{-1})\\
&\qquad\circ(\varphi\circ(\varphi')^{-1})
\end{aligned}
$$

が $\varphi'(W)$ 上で成り立つ。右端は $X$ のアトラスの遷移、左端は $Y$ のアトラスの遷移である。どちらも[正則アトラスの条件](../CM1-01/index.md#def-cm1-01-atlas)から正則。中央は仮定により $\varphi(p)$ の近傍で正則である。

[正則写像の合成命題](../CM1-01/index.md#prop-cm1-01-composition)を、右端と中央の合成、さらに左端との合成の順に適用すると、新座標表示は $\varphi'(p)$ の近傍で正則である。$p$ と座標の選択は任意だったので結論を得る。$\square$
<!-- proof-end -->

定義には全域を一組の座標で覆うという条件はない。各点で必要な近傍を小さく取り、正則性を局所的に貼り合わせるから、複雑な多様体でも扱える。

**座標変換の直接計算**。$\mathbb C^2$ の写像

$$
f(z_1,z_2)=(z_1+z_2^2,z_2)
$$

を考える。始点では $\sigma(z)=(z_1+z_2^2,z_2)$、終点では $\tau(w)=(w_1,w_2+w_1)$ を新座標とする。$\sigma^{-1}(a,b)=(a-b^2,b)$ を代入すると

$$
\begin{aligned}
(\tau\circ f\circ\sigma^{-1})(a,b)
&=\tau\bigl(f(a-b^2,b)\bigr)\\
&=\tau(a,b)\\
&=(a,b+a).
\end{aligned}
$$

元の表示は二次式、新しい表示は一次式である。しかしどちらも複素線形な微分を持つ正則写像であり、見た目の次数が正則性の不変量ではないことが分かる。

## 4. 正則写像を合成してよいか

座標の不変性が分かると、写像全体を微分する代わりに、各点の座標で[合成則](../CM1-01/index.md#prop-cm1-01-composition)を使える。

<a id="prop-cm1-02-composition"></a>
<!-- formal-statement-start -->
> **命題（多様体間の正則写像の合成と恒等写像）**  
> $X,Y,Z$ を有限複素次元の複素多様体とし、$f:X\to Y$、$g:Y\to Z$ を正則写像とする。このとき $g\circ f:X\to Z$ は正則である。また各複素多様体 $X$ の恒等写像 $\operatorname{id}_X$ は正則である。
<!-- formal-statement-end -->

### 証明の見取り図

$f(p)$ に中間の $Y$ 座標を固定し、その座標を $f$ の終点側と $g$ の始点側に共用する。座標の取り方が違っていても前節の定理で取り替えられる。

<!-- proof-start -->
### 証明

$p\in X$ とし、$q=f(p)$、$r=g(q)$ と置く。それぞれの点の座標 $\varphi,\psi,\chi$ を選び、$f(U)$ と $g(V)$ が必要な座標近傍へ入るように定義域を縮める。この操作は $f,g$ の連続性から可能である。局所表示について

$$
\chi\circ(g\circ f)\circ\varphi^{-1}
=(\chi\circ g\circ\psi^{-1})
\circ(\psi\circ f\circ\varphi^{-1}).
$$

右辺の二写像は正則であるから、[高次元正則写像の合成と双正則座標変換](../CM1-01/index.md#prop-cm1-01-composition)より左辺も正則。座標不変性によって任意の座標で同じ結論になる。

恒等写像は、始点と終点に同じ座標 $\varphi$ を選ぶと

$$
\varphi\circ\operatorname{id}_X\circ\varphi^{-1}
=\operatorname{id}_{\varphi(U)}
$$

となり、その微分は複素線形恒等写像である。[座標不変性](#thm-cm1-02-coordinate-independence)より恒等写像は正則である。$\square$
<!-- proof-end -->

**例**。$\mathbb C\to\mathbb C^2$ の $f(z)=(z,z^2)$ と、$\mathbb C^2\to\mathbb C$ の $g(w_1,w_2)=w_1+w_2$ を合成すると、$(g\circ f)(z)=z+z^2$ となる。恒等座標の微分は $1+2z$ である。この関数の微分は $z=-1/2$ で消えるが、正則性そのものは失われない。**正則性と微分の非退化性は異なる条件**である。

## 5. 正則な逆写像と双正則性

二つの複素多様体が座標表示の仕方こそ違っても、複素幾何として同じであることを言うには、正則性を両方向に要求する。連続な逆写像があることだけでは、複素構造を保存したとは言えない。

<a id="def-cm1-02-biholomorphism"></a>
<!-- formal-statement-start -->
> **定義（複素多様体の双正則同値）**  
> 複素多様体 $X,Y$ の間に全単射な正則写像 $f:X\to Y$ が存在し、その逆写像 $f^{-1}:Y\to X$ も正則であるとき、$X$ と $Y$ は **双正則同値** であるという。このような $f$ は、[Riemann面の双正則写像](../../../解析系/CA/CA8/index.md#def-ca8-biholomorphism)を一般複素次元へ拡張した双正則写像である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-02-biholomorphism -->
**定義の確認**。$f:\mathbb C^2\to\mathbb C^2$ を

$$
f(z_1,z_2)=(z_1+z_2^2,z_2)
$$

とすると、$f^{-1}(w_1,w_2)=(w_1-w_2^2,w_2)$ である。両方向が多項式写像だから正則で、二つの合成も恒等写像になる。従って $f$ は双正則である。これは[前章の剪断座標](../CM1-01/index.md#prop-cm1-01-shear-atlas)を、二つの複素多様体の間の写像として読み直した例である。
<!-- definition-example-end -->

複素座標の実部・虚部を並べれば、局所的には $\mathbb R^{2n}$ の実座標として読める。次の命題の「実 $C^1$ 級微分同相」は、$f$ が全単射であり、始点・終点の複素座標をこのように実座標へ読み替えたとき、$f$ と $f^{-1}$ の局所表示がいずれも実 $C^1$ 級であるという仮定である。[複素座標遷移が実 $C^1$ 級であること](../CM1-01/index.md#def-cm1-01-atlas)から、これは座標を替えても成り立つ。実多様体としての全体構成は次章で行うが、ここでは必要な局所条件だけを使う。

<a id="prop-cm1-02-biholomorphic-inverse"></a>
<!-- formal-statement-start -->
> **命題（実微分同相である正則写像の逆）**  
> 同じ複素次元 $n$ の複素多様体 $X,Y$ の間の正則写像 $f:X\to Y$ が全単射であり、複素座標の実部・虚部を用いた実 $2n$ 次元の局所表示で $f$ と $f^{-1}$ が実 $C^1$ 級なら、$f$ は双正則である。
<!-- formal-statement-end -->

### 証明の見取り図

連続逆写像の存在は実微分同相という仮定から確保する。逆の局所表示は、$f$ の局所表示の逆に一致する。逆の正則性だけを[前章の逆写像命題](../CM1-01/index.md#prop-cm1-01-composition)で得る。

<!-- proof-start -->
### 証明

$p\in X$ を任意に取り、$q=f(p)$ とする。仮定から $f^{-1}$ は実局所表示で $C^1$ 級、従って連続である。座標 $\varphi:U\to\mathbb C^n$ と $\psi:V\to\mathbb C^n$ を選び、$p$ の十分小さい開近傍 $W\subset U\cap f^{-1}(V)$ を取る。$f$ は全単射で逆も連続だから、$f(W)$ は $q$ の開近傍である。

$$
F=\psi\circ f\circ\varphi^{-1}
$$

は $\varphi(W)$ 上で正則な実 $C^1$ 級微分同相写像である。像 $\psi(f(W))$ も開であり、$F$ の逆写像をそこで定義できる。ここで

$$
F^{-1}=\varphi\circ f^{-1}\circ\psi^{-1}
$$

であり、[Euclid空間上の正則逆写像の命題](../CM1-01/index.md#prop-cm1-01-composition)を $F$ とその開像に適用すると $F^{-1}$ は正則となる。$q$ は任意であり、[座標不変性](#thm-cm1-02-coordinate-independence)より $f^{-1}$ は全域で正則である。$\square$
<!-- proof-end -->

**重要な境界**。実 $C^1$ 級微分同相という強い仮定を外して、「複素Jacobi行列式が非零なら大域的に双正則」とは言えない。例えば $e^z:\mathbb C\to\mathbb C$ は微分が $e^z\ne0$ でも、$e^{z+2\pi i}=e^z$ により単射でない。局所で微分が可逆であることと大域全単射は区別する。

さらに、共役 $z\mapsto\overline z$ は実微分同相でも正則でない。命題には「正則」と「実微分同相」の双方が必要である。

## 6. 複素Jacobi行列の階数は座標に依存しない

正則写像が一点でどれだけの複素方向を局所的に潰すかは、座標表示の複素Jacobi行列の階数で測れる。ただし行列の成分は座標を替えると変わるので、まず階数が変わらないことを確認する。

<a id="thm-cm1-02-rank-invariance"></a>
<!-- formal-statement-start -->
> **定理（正則写像の複素Jacobi階数の座標不変性）**  
> 複素次元 $n$ の $X$ から複素次元 $m$ の $Y$ への正則写像 $f$ と点 $p\in X$ を取る。二組の始点・終点座標による複素Jacobi行列を次で定める。

$$
A=D_{\mathbb C}f_{\psi\varphi}(\varphi(p)),\qquad
A'=D_{\mathbb C}f_{\psi'\varphi'}(\varphi'(p)).
$$

> このとき $A,A'$ はともに $m\times n$ 行列で、その複素階数は等しい。
<!-- formal-statement-end -->

### 証明の見取り図

座標を替えた局所表示の三重合成に連鎖律を適用すると、新しいJacobi行列は旧行列の左右に可逆な複素行列を掛けた形となる。可逆な線形写像は像の複素次元を変えない。

<!-- proof-start -->
### 証明

$p$ を含む共通近傍を第3節と同じように縮める。そこで

$$
S=\varphi\circ(\varphi')^{-1},\qquad
T=\psi'\circ\psi^{-1},\qquad
F=\psi\circ f\circ\varphi^{-1}
$$

と置けば、新表示は $T\circ F\circ S$。評価点と複素微分行列を次のように置く。

$$
a'=\varphi'(p),\qquad a=\varphi(p),\qquad b=\psi(f(p)).
$$

$$
B=D_{\mathbb C}T_b\in\mathbb C^{m\times m},\qquad
C=D_{\mathbb C}S_{a'}\in\mathbb C^{n\times n}.
$$

[実微分の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を $S$ と $F$、さらに $F\circ S$ と $T$ の順に適用する。各微分は複素線形だから、複素Jacobi行列について

$$
A'=D_{\mathbb C}T_b\,
    D_{\mathbb C}F_a\,
    D_{\mathbb C}S_{a'}
=BAC
$$

を得る。

$S$ と $T$ は[正則アトラスの遷移写像](../CM1-01/index.md#def-cm1-01-atlas)であり、逆表示も正則だから、[実微分の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を各恒等写像に適用して

$$
D_{\mathbb C}S^{-1}_{a}\,C=I_n,\qquad
D_{\mathbb C}T^{-1}_{T(b)}\,B=I_m
$$

を得る。逆側の合成も恒等写像になるため、$C$ は $n\times n$ 可逆、$B$ は $m\times m$ 可逆である。$C(\mathbb C^n)=\mathbb C^n$ なので

$$
\operatorname{im}(AC)=\operatorname{im}(A).
$$

さらに $B$ は $\operatorname{im}(A)$ から $\operatorname{im}(BAC)$ への複素線形同型を与える。したがって

$$
\operatorname{rank}_{\mathbb C}A'
=\dim_{\mathbb C}\operatorname{im}(BAC)
=\dim_{\mathbb C}\operatorname{im}(A)
=\operatorname{rank}_{\mathbb C}A.
$$

$\square$
<!-- proof-end -->

これで各点に一つの数を割り当てられる。

<a id="def-cm1-02-holomorphic-rank"></a>
<!-- formal-statement-start -->
> **定義（正則写像の局所複素階数）**  
> 複素多様体間の正則写像 $f:X^n\to Y^m$ と $p\in X$ に対し、任意の座標表示の複素Jacobi行列の階数を $\operatorname{rank}_{\mathbb C}f(p)$ と書き、$p$ における **局所複素階数** と呼ぶ。この値は $0$ 以上 $\min(n,m)$ 以下の整数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-02-holomorphic-rank -->
**定義の確認**。$f:\mathbb C\to\mathbb C^2$、$f(z)=(z^2,z^3)$ なら、恒等座標で

$$
D_{\mathbb C}f_z=
\begin{pmatrix}2z\\3z^2\end{pmatrix}.
$$

$z\ne0$ では第一成分が非零で階数1、$z=0$ では零行列で階数0となる。ここで微分が消えても $f$ の各成分は多項式なので正則である。座標を取り替えても階数の値は前の定理により変わらない。
<!-- definition-example-end -->

階数を保つという主張は、**Jacobi行列そのものが同じ**という主張ではない。第3節の剪断写像はある座標では

$$
D_{\mathbb C}f_z=
\begin{pmatrix}1&2z_2\\0&1\end{pmatrix},
$$

別の座標では

$$
D_{\mathbb C}(\tau\circ f\circ\sigma^{-1})=
\begin{pmatrix}1&0\\1&1\end{pmatrix}
$$

になる。成分は異なるが、いずれも階数2である。

## 7. 直積写像とRiemann球面での局所確認

直積の複素構造は[前章の直積命題](../CM1-01/index.md#prop-cm1-01-product)で構成した。写像も因子ごとに正則なら、まとめて正則になる。

<a id="prop-cm1-02-product-maps"></a>
<!-- formal-statement-start -->
> **命題（正則写像の直積）**  
> $f:X\to Y$、$g:X'\to Y'$ がそれぞれ複素多様体間の正則写像なら、積写像 $f\times g:X\times X'\to Y\times Y'$、$(p,p')\mapsto(f(p),g(p'))$ は積複素構造について正則である。その局所複素階数は各因子の局所複素階数の和である。
<!-- formal-statement-end -->

### 証明の見取り図

積座標では局所表示は $(F(z),G(w))$ となり、複素Jacobi行列はブロック対角である。正則性は複素線形性から、階数の加法性は像の直和から得る。

<!-- proof-start -->
### 証明

$p\in X,p'\in X'$ について、各写像の始点・終点座標を選び、局所表示を $F:\mathbb C^n\supset A\to\mathbb C^m$、$G:\mathbb C^{n'}\supset A'\to\mathbb C^{m'}$ とする。[複素多様体の直積構成](../CM1-01/index.md#prop-cm1-01-product)により、積座標での表示は

$$
H(z,w)=(F(z),G(w))
$$

である。実微分の増分表示を二成分に分けると

$$
D_{\mathbb C}H_{(z,w)}
=\begin{pmatrix}
D_{\mathbb C}F_z&0\\
0&D_{\mathbb C}G_w
\end{pmatrix}.
$$

二つの対角ブロックは連続で複素線形であるから、$H$ も実 $C^1$ 級かつ微分が複素線形、すなわち正則である。行列の像は

$$
\operatorname{im}D_{\mathbb C}F_z
\oplus
\operatorname{im}D_{\mathbb C}G_w
$$

なので、その複素次元は各像の次元の和になる。[階数不変性](#thm-cm1-02-rank-invariance)を使えばこの等式は座標によらない。$\square$
<!-- proof-end -->

**Riemann球面の例**。$X=Y=\widehat{\mathbb C}$ を、[CA8の球面二座標](../../../解析系/CA/CA8/index.md#prop-ca8-riemann-sphere-atlas)を備えたRiemann面とする。有限点では $h(z)=z^2$、無限遠点では $h(\infty)=\infty$ と定める。

無限遠点付近では始点座標 $\zeta=1/z$、終点座標 $\eta=1/w$ を使う。$\zeta\ne0$ なら

$$
\eta=\frac1{h(1/\zeta)}
=\frac1{(1/\zeta)^2}
=\zeta^2.
$$

$\zeta=0$ は無限遠点を表し、定義 $h(\infty)=\infty$ によって同じ式 $\eta=\zeta^2$ がそこで成立する。この局所表示は零点を含む開円板上の多項式なので、$h$ は無限遠でも連続かつ正則。有限点では恒等座標で多項式 $z^2$ だから正則であり、[座標不変性](#thm-cm1-02-coordinate-independence)から球面上の正則写像となる。

有限点 $z=0$ の微分は $2z=0$、無限遠点 $\zeta=0$ の微分は $2\zeta=0$ で、両点の局所複素階数は0である。しかし $h$ は定数写像ではない。階数は**一点での一次近似**を表す。

## 8. 演習

正則性は一組の座標で確認してよいが、重なりで座標を替える場合は、写像の定義域・評価点・連鎖律の順序を明記すること。全問に詳細解答を付ける。

### Level A

<a id="ex-cm1-02-a01"></a>
#### CM1-02-A01 異なる複素次元への写像
- Level: A

$f:\mathbb C\to\mathbb C^2$、$f(z)=(z+1,z^2)$ の正則性と $z=0$ における局所複素階数を調べよ。

<!-- solution-start -->
**詳細解答**。恒等座標を使い、$h\in\mathbb C$ に対して

$$
f(z+h)-f(z)=(h,2zh)+(0,h^2).
$$

残差は $O(|h|^2)$、一次項は複素線形で、その係数は連続だから正則である。Jacobi行列は

$$
D_{\mathbb C}f_z=\begin{pmatrix}1\\2z\end{pmatrix}.
$$

$z=0$ では列 $(1,0)^T$ が非零だから階数1。行列は $2\times1$ であり、階数を2とはできない。[階数の定義](#def-cm1-02-holomorphic-rank)に一致する。
<!-- solution-end -->

<a id="ex-cm1-02-a02"></a>
#### CM1-02-A02 正しい座標表示の定義域
- Level: A

$X=Y=\mathbb C$、$f(z)=2z$ とし、始点座標を $U=\{|z|<2\}$ 上の恒等写像、終点座標を $V=\{|w|<1\}$ 上の恒等写像とする。座標表示の定義域と値域を求めよ。

<!-- solution-start -->
**詳細解答**。$f^{-1}(V)=\{|2z|<1\}=\{|z|<1/2\}$ だから

$$
U\cap f^{-1}(V)=\{|z|<1/2\}.
$$

始点座標像はこの開円板、終点座標は $V$ への恒等写像なので、座標表示は

$$
f_{\psi\varphi}:\{|z|<1/2\}\longrightarrow\{|w|<1\},
\qquad z\longmapsto2z.
$$

全ての $U$ から $V$ への写像と書くと $|z|$ が $1/2$ 以上の点で値が $V$ から外れる。
<!-- solution-end -->

<a id="ex-cm1-02-a03"></a>
#### CM1-02-A03 非正則写像を一組の座標で排除
- Level: A

$k:\mathbb C^2\to\mathbb C$、$k(z_1,z_2)=\overline{z_1}+z_2$ は連続だが正則でないことを示せ。

<!-- solution-start -->
**詳細解答**。恒等座標で実微分は $Dk_z(h_1,h_2)=\overline{h_1}+h_2$。$h=(1,0)$ とすると

$$
Dk_z(ih)=-i,\qquad iDk_z(h)=i.
$$

一致しないので、実微分は複素線形でない。[多変数正則性の定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)に反する。従って一点の恒等座標だけで非正則と判定でき、別座標を探しても[正則写像の座標不変性](#thm-cm1-02-coordinate-independence)により改善できない。
<!-- solution-end -->

<a id="ex-cm1-02-a04"></a>
#### CM1-02-A04 正則な逆写像
- Level: A

$f:\mathbb C^2\to\mathbb C^2$、$f(z_1,z_2)=(z_1,z_2+z_1^2)$ の逆を求め、双正則性を示せ。

<!-- solution-start -->
**詳細解答**。$w_1=z_1$、$w_2=z_2+z_1^2$ より

$$
f^{-1}(w_1,w_2)=(w_1,w_2-w_1^2).
$$

合成を両方向に計算すると

$$
\begin{aligned}
f^{-1}(f(z_1,z_2))&=(z_1,z_2+z_1^2-z_1^2)=(z_1,z_2),\\
f(f^{-1}(w_1,w_2))&=(w_1,w_2-w_1^2+w_1^2)=(w_1,w_2).
\end{aligned}
$$

いずれも複素多項式で実 $C^1$ 級かつ微分が複素線形だから正則。[双正則写像の定義](#def-cm1-02-biholomorphism)を満たす。
<!-- solution-end -->

<a id="ex-cm1-02-a05"></a>
#### CM1-02-A05 階数が落ちる点
- Level: A

$f:\mathbb C^2\to\mathbb C$、$f(z_1,z_2)=z_1z_2$ の局所複素階数を全点で求めよ。

<!-- solution-start -->
**詳細解答**。増分 $(h_1,h_2)$ に対して

$$
f(z+h)-f(z)=z_2h_1+z_1h_2+h_1h_2.
$$

残差は二次だから複素微分は行列 $(z_2\ \ z_1)$ である。$z_1=z_2=0$ のとき零行列で階数0。それ以外では少なくとも一方の係数が非零なので像が $\mathbb C$ 全体になり階数1。多項式であるため、原点でも正則性は失わない。
<!-- solution-end -->

### Level B

<a id="ex-cm1-02-b01"></a>
#### CM1-02-B01 非線形座標でのJacobi行列
- Level: B

$f(z_1,z_2)=(z_1+z_2^2,z_2)$、始点座標 $\sigma(z)=(z_1+z_2^2,z_2)$、終点座標 $\tau(w)=(w_1,w_2+w_1)$ とする。新しい座標表示を計算し、Jacobi行列と階数を元の表示と比較せよ。

<!-- solution-start -->
**詳細解答**。まず $\sigma^{-1}(a,b)=(a-b^2,b)$。これを写像へ代入すると

$$
f(\sigma^{-1}(a,b))
=f(a-b^2,b)
=(a-b^2+b^2,b)
=(a,b).
$$

続けて $\tau$ を適用し、

$$
(\tau\circ f\circ\sigma^{-1})(a,b)=(a,b+a)
$$

を得る。元のJacobi行列と新しいJacobi行列はそれぞれ

$$
A(z)=\begin{pmatrix}1&2z_2\\0&1\end{pmatrix},
\qquad
A'(a,b)=\begin{pmatrix}1&0\\1&1\end{pmatrix}.
$$

両方とも行列式1で階数2。元の写像の微分と新座標表示の微分は一致しないが、[階数不変性定理](#thm-cm1-02-rank-invariance)と整合する。
<!-- solution-end -->

<a id="ex-cm1-02-b02"></a>
#### CM1-02-B02 連鎖律と階数の上界
- Level: B

$f:\mathbb C\to\mathbb C^2$、$f(z)=(z,z^2)$、$g:\mathbb C^2\to\mathbb C$、$g(w_1,w_2)=w_2-w_1^2$ とする。$g\circ f$ の正則性、微分、階数を求め、$Dg_{f(z)}Df_z$ を直接計算せよ。

<!-- solution-start -->
**詳細解答**。代入すると

$$
(g\circ f)(z)=z^2-z^2=0.
$$

よって恒等的に正則で、微分は零、局所複素階数は全点で0である。一方、

$$
Df_z=\begin{pmatrix}1\\2z\end{pmatrix},
\qquad
Dg_{(w_1,w_2)}=\begin{pmatrix}-2w_1&1\end{pmatrix}.
$$

$w_1=z$ と代入して掛けると

$$
Dg_{f(z)}Df_z
=\begin{pmatrix}-2z&1\end{pmatrix}
\begin{pmatrix}1\\2z\end{pmatrix}
=-2z+2z=0.
$$

[合成命題](#prop-cm1-02-composition)と連鎖律に一致する。各因子の階数は1でも合成の階数は0になり得る。階数の積については一般に等号ではなく上界が得られるだけである。
<!-- solution-end -->

<a id="ex-cm1-02-b03"></a>
#### CM1-02-B03 球面上の三乗写像
- Level: B

$h:\widehat{\mathbb C}\to\widehat{\mathbb C}$ を有限点で $h(z)=z^3$、無限遠点で $h(\infty)=\infty$ と定める。無限遠点の二座標で正則性を確認し、$0$ と $\infty$ の局所複素階数を求めよ。

<!-- solution-start -->
**詳細解答**。[球面二座標](../../../解析系/CA/CA8/index.md#prop-ca8-riemann-sphere-atlas)の無限遠付近で $\zeta=1/z$、$\eta=1/w$ を使う。$\zeta\ne0$ なら

$$
\eta=\frac1{h(1/\zeta)}
=\frac1{\zeta^{-3}}
=\zeta^3.
$$

$\zeta=0$ は無限遠点で、その像を無限遠と定めたから $\eta(0)=0$。従って全近傍で局所表示は $\zeta\mapsto\zeta^3$ となり、連続かつ正則である。有限点も多項式なので正則。[座標不変性](#thm-cm1-02-coordinate-independence)で全域の正則性が確定する。$z=0$ での微分は $3z^2=0$、$\zeta=0$ での微分も $3\zeta^2=0$。両点の階数は0である。
<!-- solution-end -->

<a id="ex-cm1-02-b04"></a>
#### CM1-02-B04 直積写像のJacobi行列
- Level: B

$f:\mathbb C\to\mathbb C^2$、$f(z)=(z^2,z)$ と $g:\mathbb C\to\mathbb C$、$g(w)=w^2$ の積写像を求め、点 $(0,0)$、$(1,0)$、$(0,1)$ における局所複素階数を計算せよ。最後の点では、両因子の階数が正になる場合の加法性も確認せよ。

<!-- solution-start -->
**詳細解答**。積写像は

$$
H(z,w)=(z^2,z,w^2).
$$

複素Jacobi行列は

$$
DH_{(z,w)}
=\begin{pmatrix}
2z&0\\
1&0\\
0&2w
\end{pmatrix}.
$$

$(0,0)$ では第一列 $(0,1,0)^T$ が非零で第二列が零だから階数1。$(1,0)$ では第一列 $(2,1,0)^T$ が非零で第二列が零だから階数1。どちらでも $Df_z=(2z,1)^T$ は階数1、$Dg_0=0$ は階数0なので、[積写像命題](#prop-cm1-02-product-maps)の $1+0=1$ に一致する。

一方、$(0,1)$ では行列は

$$
DH_{(0,1)}
=\begin{pmatrix}
0&0\\
1&0\\
0&2
\end{pmatrix}.
$$

二つの列 $(0,1,0)^T$ と $(0,0,2)^T$ は、互いに異なる成分に非零項を持つため複素線形独立である。よって階数2となる。実際 $Df_0$ と $Dg_1=2$ はどちらも階数1で、$1+1=2$ となる。
<!-- solution-end -->

### Level C

<a id="ex-cm1-02-c01"></a>
#### CM1-02-C01 座標不変性・合成・非単射性の総合
- Level: C

$X=Y=\mathbb C^2$ に標準複素構造を入れ、$f:X\to Y$ を

$$
f(z_1,z_2)=(e^{z_1},z_2+z_1)
$$

とする。始点には $\sigma(z_1,z_2)=(z_1,z_2+z_1)$、終点には恒等座標 $\psi$ を取る。

1. $\sigma$ が双正則座標であることを確認せよ。
2. $\psi\circ f\circ\sigma^{-1}$ を求め、正則性と複素Jacobi行列を計算せよ。
3. 元の恒等座標での $Df_z$ と比較し、階数が全点で2であることを示せ。
4. $f$ が全単射でない理由を挙げ、非零行列式と双正則性の違いを説明せよ。

<!-- solution-start -->
**詳細解答**。

**1. 始点座標の確認**。$(a,b)=\sigma(z)$ なら $a=z_1$、$b=z_2+z_1$ なので

$$
\sigma^{-1}(a,b)=(a,b-a).
$$

$\sigma(\sigma^{-1}(a,b))=(a,b)$、$\sigma^{-1}(\sigma(z))=z$ を直接確認できる。両方向とも複素線形多項式なので正則であり、[双正則写像の定義](#def-cm1-02-biholomorphism)を満たす。

**2. 新座標表示**。逆座標を $f$ に代入して

$$
\begin{aligned}
(\psi\circ f\circ\sigma^{-1})(a,b)
&=f(a,b-a)\\
&=(e^a,(b-a)+a)\\
&=(e^a,b).
\end{aligned}
$$

複素指数関数に[正則関数のTaylor展開](../../../解析系/CA/CA3/index.md#thm-ca3-taylor)を、展開点 $a$、評価点 $a+h$、一次まで適用する。指数関数の導関数が指数関数自身であることを使うと

$$
e^{a+h}=e^a+e^a h+O(|h|^2)
$$

となり、一次係数は $e^a$ である。第2成分 $b$ は $b$ 方向の係数が1、$a$ 方向の係数が0なので、

$$
D_{\mathbb C}(\psi\circ f\circ\sigma^{-1})_{(a,b)}
=\begin{pmatrix}e^a&0\\0&1\end{pmatrix}.
$$

各成分は連続で、行列は複素線形微分を表すので新表示は正則である。[正則写像の座標不変性](#thm-cm1-02-coordinate-independence)より $f$ も正則。

**3. 元のJacobi行列と階数**。恒等座標では

$$
D_{\mathbb C}f_z
=\begin{pmatrix}e^{z_1}&0\\1&1\end{pmatrix}.
$$

元の行列式は $e^{z_1}$。新座標表示の行列式は $e^a$ で $a=z_1$ だから、指数関数が零にならないことにより、両方とも階数2となる。

新座標の点 $(a,b)$ における逆座標の微分は

$$
D_{\mathbb C}\sigma^{-1}_{(a,b)}
=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

連鎖律における元の写像の評価点は $\sigma^{-1}(a,b)=(a,b-a)$ である。$z_1=a$ としてこれを掛けると

$$
D_{\mathbb C}f_z\,D_{\mathbb C}\sigma^{-1}
=\begin{pmatrix}e^{z_1}&0\\1&1\end{pmatrix}
 \begin{pmatrix}1&0\\-1&1\end{pmatrix}
=\begin{pmatrix}e^{z_1}&0\\0&1\end{pmatrix},
$$

となり、[階数不変性の証明](#thm-cm1-02-rank-invariance)で現れた右側の可逆行列との関係を直接確認できる。

**4. 大域の非単射性**。$(z_1,z_2)$ と $(z_1+2\pi i,z_2-2\pi i)$ は異なる二点だが

$$
\begin{aligned}
f(z_1+2\pi i,z_2-2\pi i)
&=(e^{z_1+2\pi i},z_2-2\pi i+z_1+2\pi i)\\
&=(e^{z_1},z_2+z_1)\\
&=f(z_1,z_2).
\end{aligned}
$$

従って $f$ は単射でなく、[双正則写像](#def-cm1-02-biholomorphism)ではない。Jacobi行列が全点可逆という一次の局所情報から、大域的な単射性を結論することはできない。
<!-- solution-end -->

---

## 9. 次章への接続

複素多様体の写像について、正則性と局所複素階数が座標不変であることを確かめた。証明で現れた「左右から可逆な複素線形行列を掛ける」という構造は、次に基礎となる実接空間と概複素構造 $J$ を考えるときの出発点になる。

本章で再現すべき核心は、**$\varphi(U\cap f^{-1}(V))$ という正しい定義域、三重合成による座標不変性、連鎖律の評価点、可逆行列による階数保存、双正則性と局所階数の非同一性**である。
