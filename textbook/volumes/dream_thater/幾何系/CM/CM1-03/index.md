# CM1-03 基礎となる実多様体と概複素構造J

<!-- definition-example-audit: strict -->

## 1. 複素数の掛け算を接空間で見る

[複素アトラス](../CM1-01/index.md#def-cm1-01-atlas)を用いると、複素多様体の各点を局所的に $\mathbb C^n$ の点として扱える。[正則写像の座標不変性](../CM1-02/index.md#thm-cm1-02-coordinate-independence)も分かった。しかし、異なる点の複素座標は直接比較できない。では「方向を $i$ 倍する」という演算を座標を持たない接空間に移せるだろうか。

$\mathbb C$ の複素数 $z=x+iy$ を実ベクトル $(x,y)$ と見ると、$i$ 倍は $(x,y)\mapsto(-y,x)$ という90度回転である。これを各点の接空間に貼り合わせたい。鍵は、正則座標変換の微分がこの回転と可換になることである。

本章では、複素多様体から実多様体を作り、各接空間に $J^2=-I$ を満たす写像を構成する。逆に任意の $J$ が正則座標から来ると主張するわけではない。この差は後続の積分可能性の問題になる。

## 2. 複素アトラスは実の微分可能アトラスを与える

複素次元 $n$ の複素多様体 $X$ の座標 $\varphi=(z^1,\ldots,z^n)$ に対して、$z^k=x^k+iy^k$ と置き、実座標を

$$
\varphi_{\mathbb R}
=(x^1,y^1,\ldots,x^n,y^n)
:U\longrightarrow\mathbb R^{2n}
$$

とする。座標の順序は各複素座標について実部・虚部を隣り合わせに固定する。[GEO2の接空間](../../GEO/GEO2/index.md#def-geo2-tangent-derivation)や[接束](../../GEO/GEO2/index.md#def-geo2-tangent-bundle)の構成をこの実座標に適用したいが、まず実座標の遷移が滑らかであることを保証する必要がある。

<a id="prop-cm1-03-real-atlas"></a>
<!-- formal-statement-start -->
> **命題（複素アトラスから得られる実滑らかなアトラス）**  
> 複素次元 $n\geq1$ の複素多様体 $X$ の正則アトラスを取り、各複素座標を上記の順序の実座標へ読み替える。この実座標族は実次元 $2n$ の $C^\infty$ 級アトラスを定める。基礎位相は元の $X$ の位相と同じである。
<!-- formal-statement-end -->

### 証明の見取り図

複素数を実数二つに分ける操作は線形同相なので、開集合と位相を変えない。難所は「正則なら $C^\infty$」という滑らかさである。一変数のCauchy積分公式を変数ごとに使い、局所的に任意階数の微分が存在することを確かめる。

<!-- proof-start -->
### 証明

$X$ のHausdorff性と第二可算性は[複素多様体の定義](../CM1-01/index.md#def-cm1-01-manifold)に含まれており、実座標へ読み替えても変化しない。複素数の実部・虚部を並べる写像 $\mathbb C^n\to\mathbb R^{2n}$ は実線形同相である。従って各実座標像は開集合で、各座標写像も同相である。

二つの複素座標の重なりにおける遷移 $F:O\to O'$ は、[正則アトラスの条件](../CM1-01/index.md#def-cm1-01-atlas)により正則である。すなわち $F$ は実 $C^1$ 級で、微分が複素線形である。各成分 $F^j$ は、他の変数を固定したとき一変数の正則関数になる。実際、固定方向 $e_k$ に沿った微分が複素線形なので、実部・虚部は一変数のCauchy–Riemann条件を満たす。

任意の点 $a\in O$ に対して、閉包が $O$ に含まれる小さい多重円板を取り、その各変数の境界円を $\Gamma_k$ とする。固定した他の座標に対し[一変数Cauchy積分公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-integral-formula)を第1変数に適用し、次に第2変数、以下同様に適用する。連続な被積分関数をコンパクトな円周の有限直積上で積分するので、積分順序を交換でき、

$$
F^j(z)=\frac{1}{(2\pi i)^n}
\int_{\Gamma_1}\cdots\int_{\Gamma_n}
\frac{F^j(\zeta)}
{\prod_{k=1}^n(\zeta_k-z_k)}
\,d\zeta_n\cdots d\zeta_1
$$

を内部の点 $z$ について得る。$z$ を境界円から正の距離だけ離れた小円板へ制限すると、各分母は一様に零から離れる。その範囲では被積分関数を $z$ で何回でも微分でき、その導関数は円周の積上で連続かつ一様有界である。従って積分記号の下で任意回数微分でき、$F^j$ は実 $C^\infty$ 級である。各成分が滑らかなので実座標間の遷移も $C^\infty$ 級となる。$F^{-1}$ も正則アトラスの遷移だから同じ議論が使える。$X$ の実アトラスが得られた。$\square$
<!-- proof-end -->

上で「正則だから滑らか」と省略せず、複素多変数の定義と実微分可能性の間をつないだ。以後は、この実滑らかな多様体を $X_{\mathbb R}$ と記す。

<a id="def-cm1-03-underlying-real"></a>
<!-- formal-statement-start -->
> **定義（基礎となる実多様体）**  
> 複素次元 $n$ の複素多様体 $X$ の正則座標を実部と虚部の $2n$ 個の座標に分けて得る、上の $C^\infty$ 級実多様体を **基礎となる実多様体** $X_{\mathbb R}$ という。台集合と位相は $X$ と同一である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-03-underlying-real -->
**定義の確認**。$X=\mathbb C$ では $z=x+iy$ を $(x,y)\in\mathbb R^2$ に置き換えるので、$X_{\mathbb R}$ は普通の実平面である。$X=\mathbb C^2$ では $(z^1,z^2)$ を $(x^1,y^1,x^2,y^2)$ と読むので実次元は4になる。これは単なる個数の対応でなく、重なりの微分可能性を前の命題で確認した結果である。
<!-- definition-example-end -->

## 3. 接空間での「$i$ 倍」と概複素構造

標準座標で実接ベクトルを $(a^1,b^1,\ldots,a^n,b^n)$ とすると、$i$ 倍は各対 $(a^k,b^k)$ を $(-b^k,a^k)$ に送る。実 $2n$ 次元空間の線形写像として

$$
J_0=\operatorname{diag}(R,\ldots,R),
\qquad
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad R^2=-I_2
$$

である。従って $J_0^2=-I_{2n}$ である。これを、座標で与えられる特別な写像という段階から、実多様体上で定義できる概念へ移す。

<a id="def-cm1-03-almost-complex"></a>
<!-- formal-statement-start -->
> **定義（概複素構造）**  
> $M$ を実次元 $2n$ の $C^\infty$ 級多様体とする。滑らかな接束準同型 $J:TM\to TM$ が各点 $p$ で実線形写像 $J_p:T_pM\to T_pM$ を定め、すべての $p$ で
>
$$
J_p\circ J_p=-\operatorname{id}_{T_pM}
$$
>
> を満たすとき、$J$ を $M$ 上の **概複素構造** という。組 $(M,J)$ を概複素多様体という。「滑らか」は任意の実滑らかな局所座標で $J_p$ の行列成分が点 $p$ に滑らかに依存することを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-03-almost-complex -->
**定義の確認**。$M=\mathbb R^2$ に定数行列 $J=R$ を置く。各点の接空間を $\mathbb R^2$ と同一視すると、

$$
J(a,b)=(-b,a),\qquad
J^2(a,b)=J(-b,a)=(-a,-b)
$$

である。各成分は点に依存しないので滑らかで、定義の全条件を満たす。$J$ は実線形だが、実数倍の単位写像とは異なる。
<!-- definition-example-end -->

この定義には複素座標を一切使わない。従って任意の実多様体に候補を作れるが、条件を満たすとは限らない。例えば実奇数次元の接空間にはこのような実線形 $J$ は存在しない。もし実 $d$ 次元で $J^2=-I_d$ なら行列式から $(\det J)^2=(-1)^d$ となり、$d$ が奇数なら左辺は非負、右辺は $-1$ で矛盾する。

## 4. 正則遷移の微分が回転と可換になる

ここで重要なのは、座標変換の微分を取ったときも「$i$ 倍」が同じ幾何学的演算として残るか、という点である。

<a id="lem-cm1-03-transition-commutes"></a>
<!-- formal-statement-start -->
> **補題（正則座標遷移と標準複素構造の可換性）**  
> $O,O'\subset\mathbb C^n$ を開集合、$F:O\to O'$ を正則写像とする。$F$ を実 $2n$ 次元の $C^1$ 写像とみると、その微分は各点 $z\in O$ で次を満たす。
>
$$
D_{\mathbb R}F_z\,J_0
=J_0\,D_{\mathbb R}F_z.
$$
>
> 特に $F$ が双正則なら、$D_{\mathbb R}F_z$ は可逆であり、$D_{\mathbb R}F_zJ_0(D_{\mathbb R}F_z)^{-1}=J_0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

行列の等式を最初から仮定するのではなく、任意の実ベクトル $v$ に適用した像が同じかを見る。$J_0v$ は複素数の $iv$ に等しい。

<!-- proof-start -->
### 証明

[多変数正則性の定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)により、$D_{\mathbb R}F_z$ は複素線形だから任意の実接ベクトル $v$ に対して

$$
D_{\mathbb R}F_z(J_0v)
=D_{\mathbb R}F_z(iv)
=iD_{\mathbb R}F_z(v)
=J_0(D_{\mathbb R}F_zv).
$$

従って線形写像としての等式が成り立つ。双正則の場合は $F^{-1}\circ F=\operatorname{id}$ を微分し、[連鎖律](../../GEO/GEO2/index.md#thm-geo2-composition-differential)を用いると

$$
D_{\mathbb R}F^{-1}_{F(z)}D_{\mathbb R}F_z=I_{2n}
$$

となる。逆側の合成も同様に恒等行列となるので微分は可逆。右から逆行列を掛けて後半の等式を得る。$\square$
<!-- proof-end -->

例えば $F(z)=z^2$ を $z=x+iy$ の実写像 $F(x,y)=(x^2-y^2,2xy)$ と読めば

$$
D_{\mathbb R}F_{(x,y)}
=\begin{pmatrix}2x&-2y\\2y&2x\end{pmatrix},
\qquad
(D_{\mathbb R}F)R=R(D_{\mathbb R}F).
$$

実際に左辺も右辺も

$$
\begin{pmatrix}-2y&-2x\\2x&-2y\end{pmatrix}
$$

となる。これは「正則」と「実微分」の結節点である。

## 5. 複素多様体が持つ標準のJを貼り合わせる

実座標 $\varphi_{\mathbb R}$ を使うと、[GEO2の微分の座標表示](../../GEO/GEO2/index.md#thm-geo2-differential-coordinate)によって $d\varphi_{\mathbb R}|_p$ は $T_pX_{\mathbb R}$ と $\mathbb R^{2n}$ の線形同型を与える。そこで

$$
J^{(\varphi)}_p
=(d\varphi_{\mathbb R}|_p)^{-1}
\,J_0\,(d\varphi_{\mathbb R}|_p)
$$

と置く。右辺には座標 $\varphi$ が現れるため、本当に座標に依存しないか検証しなくてはならない。

<a id="thm-cm1-03-induced-j"></a>
<!-- formal-statement-start -->
> **定理（複素多様体から誘導される標準概複素構造）**  
> $X$ を複素次元 $n$ の複素多様体、$X_{\mathbb R}$ をその基礎となる実多様体とする。任意の複素座標 $(U,\varphi)$ に対し上の式で定めた $J_p^{(\varphi)}$ は、重なりで一致する。従って $X_{\mathbb R}$ には、各複素座標での行列が $J_0$ である一意の滑らかな概複素構造 $J_X$ が定まる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの実座標の遷移の微分は、標準の回転 $J_0$ と可換である。接空間の同じベクトルを両方の座標で表し、可換性で式を移せば一致する。

<!-- proof-start -->
### 証明

$p\in U\cap V$ を取り、複素座標 $\varphi,\psi$ の遷移を $F=\psi\circ\varphi^{-1}$ とする。実座標での微分を $A=d\varphi_{\mathbb R}|_p$、$B=d\psi_{\mathbb R}|_p$ と書く。[多様体上の連鎖律](../../GEO/GEO2/index.md#thm-geo2-composition-differential)から

$$
B=D_{\mathbb R}F_{\varphi(p)}A
$$

となる。$C=D_{\mathbb R}F_{\varphi(p)}$ とすれば $B=CA$。$F$ は正則座標遷移だから[補題](#lem-cm1-03-transition-commutes)より $CJ_0=J_0C$ であり、$C$ は可逆である。ゆえに

$$
\begin{aligned}
B^{-1}J_0B
&=A^{-1}C^{-1}J_0CA\\
&=A^{-1}C^{-1}CJ_0A\\
&=A^{-1}J_0A.
\end{aligned}
$$

従って点 $p$ における $J$ は座標選択に依存しない。各点で

$$
J_p^2=A^{-1}J_0AA^{-1}J_0A
=A^{-1}J_0^2A=-\operatorname{id}_{T_pX_{\mathbb R}}
$$

となる。各実座標での成分は定数行列 $J_0$ なので滑らかであり、座標間で一致するため大域的な滑らかな接束準同型となる。各座標で $J_0$ と指定されれば $A^{-1}J_0A$ 以外に候補はないから一意である。$\square$
<!-- proof-end -->

**座標の違いと幾何学的な違い**。$X=\mathbb C$ の通常座標 $z$ と、$w=2z$ の座標で行列はともに $R$ である。$w=z^2$ は $z\ne0$ の近傍に限って正則座標になり、その微分は点によって変わる。それでも上の共役計算で同じ $J_X$ を表す。行列の一致は「座標での表示が標準形になる」という主張であって、どんな実座標でも $R$ になるという主張ではない。

## 6. 正則写像はJを保存する

前章では正則写像の微分を複素Jacobi行列で調べた。ここでは実接空間同士の微分で正則性を表す。始点と終点では $J$ が別の空間に作用することに注意する。

<a id="thm-cm1-03-holomorphic-intertwining"></a>
<!-- formal-statement-start -->
> **定理（正則写像と概複素構造の可換条件）**  
> $X,Y$ をそれぞれ複素次元 $n,m$ の複素多様体とし、誘導される概複素構造を $J_X,J_Y$ とする。写像 $f:X_{\mathbb R}\to Y_{\mathbb R}$ が実 $C^1$ 級なら、$f$ が複素多様体間の正則写像であることと、すべての $p\in X$ で次が成り立つことは同値である。
>
$$
df_p\circ(J_X)_p=(J_Y)_{f(p)}\circ df_p.
$$
<!-- formal-statement-end -->

### 証明の見取り図

座標表示 $F=\psi\circ f\circ\varphi^{-1}$ の微分を、接空間上の微分 $df_p$ へ左右の座標微分で変換する。正則性の判定式 $D_{\mathbb R}F\,J_0=J_0D_{\mathbb R}F$ を座標なしで書き直す。

<!-- proof-start -->
### 証明

$p\in X$ を取り、始点・終点の複素座標 $(U,\varphi)$、$(V,\psi)$ を選ぶ。$f$ は $C^1$ だから連続であり、必要なら $U\cap f^{-1}(V)$ に始点を縮める。[微分の座標表示](../../GEO/GEO2/index.md#thm-geo2-differential-coordinate)を用い、$A=d\varphi_{\mathbb R}|_p$、$B=d\psi_{\mathbb R}|_{f(p)}$ とすると、

$$
D_{\mathbb R}F_{\varphi(p)}
=B\,df_p\,A^{-1}.
$$

また[誘導構造の定理](#thm-cm1-03-induced-j)から $A(J_X)_p=J_0A$ および $B(J_Y)_{f(p)}=J_0B$ である。従って

$$
\begin{aligned}
D_{\mathbb R}F_{\varphi(p)}J_0
&=Bdf_pA^{-1}J_0
 =Bdf_p(J_X)_pA^{-1},\\
J_0D_{\mathbb R}F_{\varphi(p)}
&=J_0Bdf_pA^{-1}
 =B(J_Y)_{f(p)}df_pA^{-1}.
\end{aligned}
$$

$A,B$ は可逆なので、この二式が等しいことと $df_p(J_X)_p=(J_Y)_{f(p)}df_p$ が等しいことは同値である。

正則なら[複素線形微分による定義](../CM1-01/index.md#def-cm1-01-holomorphic-map)により各点で二式が等しい。逆に可換条件が全点で成り立つなら、$F$ は実 $C^1$ でその微分が複素線形となる。同じ定義により各座標表示は正則で、[前章の座標不変性](../CM1-02/index.md#thm-cm1-02-coordinate-independence)と合わせて $f$ は正則である。$\square$
<!-- proof-end -->

**共役の反例**。$c:\mathbb C\to\mathbb C$、$c(z)=\overline z$ は実座標で $(x,y)\mapsto(x,-y)$ だから

$$
Dc=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
Dc\,R=\begin{pmatrix}0&-1\\-1&0\end{pmatrix},\qquad
R\,Dc=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

可換条件が破れるため正則でない。連続性・実微分可能性・実微分の可逆性を備えていても、$J$ の保存条件がなければ正則とは限らない。

## 7. 概複素構造は正則アトラスからだけ生まれるのか

$J^2=-I$ という点ごとの代数条件だけでも概複素構造を作れる。実平面の座標 $(x,y)$ で

$$
A(x,y)=\begin{pmatrix}e^x&0\\0&1\end{pmatrix},
\qquad
J(x,y)=A(x,y)RA(x,y)^{-1}
=\begin{pmatrix}0&-e^x\\e^{-x}&0\end{pmatrix}
$$

とする。$A$ は滑らかでどの点でも可逆なので、

$$
J(x,y)^2
=A R(A^{-1}A)R A^{-1}
=A R^2 A^{-1}
=-I_2
$$

となる。これは定数係数の標準構造とは異なり、各点で成分が変わる概複素構造である。

ただし、この表示から「この $J$ は複素座標から来ない」とは言えない。実二次元では追加の事情があり、もっと一般の実次元では積分可能性が非自明な問題となる。**概複素構造の定義は複素アトラスの存在を含まない**。本章ではこの論理的な違いを押さえ、積分可能性の判定は後続章で扱う。

また $J^2=-I$ なら、各接空間には $i\cdot v=Jv$ という複素スカラー倍を定められる。実数倍と組み合わせ、$(a+ib)\cdot v=av+bJv$ とすれば

$$
i(i v)=J(Jv)=-v
$$

で複素数の乗法と整合する。よって実 $2n$ 次元接空間は複素 $n$ 次元ベクトル空間となる。しかし、これは **各点の線形代数** であって、複素座標が貼り合わさることの証明ではない。

## 8. 演習

各題は定義から出発し、変換行列の作用する空間を取り違えずに途中式を示すこと。特に $J$ の行列が変わることと $J$ 自体が変わることを区別する。

### Level A

<a id="ex-cm1-03-a01"></a>
#### CM1-03-A01 実次元と座標順序
- Level: A

$\mathbb C^3$ の座標 $(z^1,z^2,z^3)$ を実座標で書き、$i$ 倍による $J_0$ の作用と $J_0^2$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$z^k=x^k+iy^k$ として実座標は $(x^1,y^1,x^2,y^2,x^3,y^3)$ で、実次元6である。接ベクトル $v=(a^1,b^1,a^2,b^2,a^3,b^3)$ に対して

$$
J_0v=(-b^1,a^1,-b^2,a^2,-b^3,a^3).
$$

もう一度 $J_0$ を適用すると

$$
J_0^2v=(-a^1,-b^1,-a^2,-b^2,-a^3,-b^3)=-v.
$$

よって $J_0^2=-I_6$。[概複素構造の定義](#def-cm1-03-almost-complex)の代数条件を満たす。
<!-- solution-end -->

<a id="ex-cm1-03-a02"></a>
#### CM1-03-A02 実線形写像の可換判定
- Level: A

$L=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ が $LR=RL$ を満たす必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答**。直接掛け算すると

$$
LR=\begin{pmatrix}b&-a\\d&-c\end{pmatrix},
\qquad
RL=\begin{pmatrix}-c&-d\\a&b\end{pmatrix}.
$$

行列成分を比較して $b=-c$、$d=a$ を得る。従って

$$
L=\begin{pmatrix}a&-c\\c&a\end{pmatrix}
$$

であり、逆にこの形の行列は掛け算で $LR=RL$ を満たす。これは複素数 $a+ic$ による掛け算の実行列に等しい。
<!-- solution-end -->

<a id="ex-cm1-03-a03"></a>
#### CM1-03-A03 定数でないJ
- Level: A

実平面上の $J(x,y)=\begin{pmatrix}0&-e^x\\e^{-x}&0\end{pmatrix}$ が概複素構造であることを成分計算で確かめよ。

<!-- solution-start -->
**詳細解答**。行列の積は

$$
J(x,y)^2
=\begin{pmatrix}
(-e^x)e^{-x}&0\\
0&e^{-x}(-e^x)
\end{pmatrix}
=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}.
$$

指数関数は任意階微分可能で $e^{-x}$ も全実数で定義される。従って行列成分は滑らかで、[概複素構造の定義](#def-cm1-03-almost-complex)を満たす。$x$ に依存することは代数条件と矛盾しない。
<!-- solution-end -->

<a id="ex-cm1-03-a04"></a>
#### CM1-03-A04 共役は回転を保存しない
- Level: A

$c(z)=\overline z$ の実微分行列 $C$ を求め、$CR$ と $RC$ の差を計算せよ。

<!-- solution-start -->
**詳細解答**。$c(x+iy)=x-iy$ だから $C=\operatorname{diag}(1,-1)$。直接計算すると

$$
CR=\begin{pmatrix}0&-1\\-1&0\end{pmatrix},
\quad
RC=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\quad
CR-RC=\begin{pmatrix}0&-2\\-2&0\end{pmatrix}.
$$

差は零行列でないので[正則写像の可換条件](#thm-cm1-03-holomorphic-intertwining)を満たさない。実微分が可逆であっても正則性は保証されない。
<!-- solution-end -->

<a id="ex-cm1-03-a05"></a>
#### CM1-03-A05 奇数次元にJはあるか
- Level: A

実3次元線形空間上に $J^2=-I$ を満たす実線形写像が存在しないことを証明せよ。

<!-- solution-start -->
**詳細解答**。任意の基底を取り実 $3\times3$ 行列 $A$ で $J$ を表す。$A^2=-I_3$ の両辺の行列式を取ると

$$
(\det A)^2=\det(-I_3)=(-1)^3=-1.
$$

実数の平方が負数にはならないため矛盾する。従って存在しない。[概複素構造](#def-cm1-03-almost-complex)には偶数実次元が必要である。
<!-- solution-end -->

### Level B

<a id="ex-cm1-03-b01"></a>
#### CM1-03-B01 非線形正則座標のJ
- Level: B

$\mathbb C$ の $z\ne0$ の近傍で $w=z^2$ を座標として使う。実Jacobi行列 $C$ を求め、$C^{-1}RC=R$ を直接示せ。

<!-- solution-start -->
**詳細解答**。$z=x+iy$ とすると $w=(x^2-y^2)+i(2xy)$ であるから

$$
C=\begin{pmatrix}2x&-2y\\2y&2x\end{pmatrix},
\qquad
\det C=4(x^2+y^2)>0.
$$

$z\ne0$ の周囲で逆写像を持つよう座標域を縮める。行列積は

$$
CR=RC=\begin{pmatrix}-2y&-2x\\2x&-2y\end{pmatrix}.
$$

$C$ は可逆なので $CR=RC$ の左から $C^{-1}$ を掛けると $R=C^{-1}RC$。これは[誘導構造の座標不変性](#thm-cm1-03-induced-j)の具体例である。
<!-- solution-end -->

<a id="ex-cm1-03-b02"></a>
#### CM1-03-B02 実座標を替えたときの行列
- Level: B

標準構造 $R$ を持つ実平面で、新しい実座標を $(u,v)=(2x,y)$ とする。新座標での $J$ の行列を求め、二乗が $-I$ であることを示せ。この座標変換は標準複素座標の正則変換か。

<!-- solution-start -->
**詳細解答**。座標変更の微分は $A=\operatorname{diag}(2,1)$ である。新座標での行列はベクトルの新座標成分から

$$
J_{\mathrm{new}}=ARA^{-1}
=\begin{pmatrix}0&-2\\1/2&0\end{pmatrix}.
$$

二乗は対角成分が $-2(1/2)=-1$、非対角成分が0だから $-I_2$ である。一方

$$
AR=\begin{pmatrix}0&-2\\1&0\end{pmatrix},
\qquad
RA=\begin{pmatrix}0&-1\\2&0\end{pmatrix}
$$

は一致しない。[正則座標遷移の補題](#lem-cm1-03-transition-commutes)の必要条件が破れるので $(u,v)$ は標準構造に関する複素正則座標ではない。**$J$ の座標行列が $R$ と異なることは $J$ の存在と矛盾しない。**
<!-- solution-end -->

<a id="ex-cm1-03-b03"></a>
#### CM1-03-B03 高次元写像とJ
- Level: B

$f:\mathbb C^2\to\mathbb C$、$f(z_1,z_2)=z_1+z_2^2$ とする。点 $(1,i)$ において、任意の方向 $h=(h_1,h_2)$ に対して $df(ih)=i\,df(h)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。増分 $h$ を代入すると

$$
f(z+h)-f(z)
=h_1+2z_2h_2+h_2^2.
$$

最後の項は二次残差なので、微分は $df_z(h)=h_1+2z_2h_2$。$z=(1,i)$ では

$$
df_{(1,i)}(ih)
=ih_1+2i(ih_2)
=ih_1-2h_2.
$$

一方、

$$
i\,df_{(1,i)}(h)
=i(h_1+2ih_2)=ih_1-2h_2.
$$

従って両者は一致する。実接空間でのこの等式が[正則写像の可換条件](#thm-cm1-03-holomorphic-intertwining)である。
<!-- solution-end -->

<a id="ex-cm1-03-b04"></a>
#### CM1-03-B04 異なる概複素構造の間の写像
- Level: B

$\mathbb R^2$ の始点に $J_s=R$、終点に $J_t=ARA^{-1}$、$A=\operatorname{diag}(2,1)$ を置く。線形写像 $f(v)=Av$ が $df\,J_s=J_t\,df$ を満たすことを確かめ、終点を誤って $R$ と置くとどうなるか述べよ。

<!-- solution-start -->
**詳細解答**。$df=A$ は定数行列。終点の構造を定義通りに代入すると

$$
J_t\,df=(ARA^{-1})A=AR=df\,J_s.
$$

一方、終点を $R$ と取り違えると、前題で計算したように

$$
AR=\begin{pmatrix}0&-2\\1&0\end{pmatrix},
\qquad
RA=\begin{pmatrix}0&-1\\2&0\end{pmatrix}
$$

で一致しない。可換条件では始点と終点の **それぞれの $J$** を使わなければならない。
<!-- solution-end -->

### Level C

<a id="ex-cm1-03-c01"></a>
#### CM1-03-C01 正則写像・実座標変換・Jの総合
- Level: C

$X=Y=\mathbb C$ を標準複素構造で考え、$f(z)=z^2$ とする。始点では実座標 $(u,v)=(2x,y)$、終点では通常の実座標 $(s,t)=(\operatorname{Re}w,\operatorname{Im}w)$ を使う。

1. 実座標での $f$ の表示 $F(u,v)$ と、$(u,v)=(2,1)$ における微分行列を計算せよ。
2. 始点・終点の概複素構造の座標行列 $J_s,J_t$ を求めよ。
3. その点で $DF\,J_s=J_t\,DF$ を行列の積で確認せよ。
4. 同じ計算を $J_s=R$ と誤って置くと失敗する理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

**1. 写像の実座標表示**。$x=u/2$、$y=v$ を $z^2=(x^2-y^2)+i(2xy)$ に代入する。

$$
F(u,v)=\left(\frac{u^2}{4}-v^2,\,uv\right).
$$

偏微分を各成分で計算すると

$$
DF_{(u,v)}
=\begin{pmatrix}u/2&-2v\\v&u\end{pmatrix},
\qquad
DF_{(2,1)}=\begin{pmatrix}1&-2\\1&2\end{pmatrix}.
$$

**2. 概複素構造**。始点の座標変更の微分を $A=\operatorname{diag}(2,1)$ とする。通常座標での構造が $R$ なので、

$$
J_s=ARA^{-1}
=\begin{pmatrix}0&-2\\1/2&0\end{pmatrix},
\qquad
J_t=R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

**3. 可換条件の直接確認**。指定点で左右を別々に掛ける。

$$
DF_{(2,1)}J_s
=\begin{pmatrix}1&-2\\1&2\end{pmatrix}
 \begin{pmatrix}0&-2\\1/2&0\end{pmatrix}
=\begin{pmatrix}-1&-2\\1&-2\end{pmatrix}.
$$

$$
J_tDF_{(2,1)}
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
 \begin{pmatrix}1&-2\\1&2\end{pmatrix}
=\begin{pmatrix}-1&-2\\1&-2\end{pmatrix}.
$$

従って等しい。これは[正則写像と $J$ の可換条件](#thm-cm1-03-holomorphic-intertwining)と一致する。

**4. 誤った行列の失敗**。始点も $R$ と置くと

$$
DF_{(2,1)}R
=\begin{pmatrix}-2&-1\\2&-1\end{pmatrix}
$$

となり、上の $RDF_{(2,1)}$ と一致しない。始点の $(u,v)$ は正則座標でないため、標準行列 $R$ を無条件で代入したことが誤りである。[誘導構造の座標表示](#thm-cm1-03-induced-j)を使う必要がある。
<!-- solution-end -->

---

## 9. 次章への接続

複素多様体の正則アトラスは実滑らかなアトラスを与え、その接空間上には自然に $J^2=-I$ を満たす滑らかな構造が貼り合わさる。また実 $C^1$ 級写像について、正則性は微分と $J$ の可換条件で判定できる。

しかし $J$ を持つことだけから正則アトラスは得られない。次章では各実接空間を複素化し、$J$ の固有値 $i,-i$ に対応する部分空間を構成する。本章で再現すべき核心は、**正則遷移の実微分と $J_0$ の可換性、共役変換による座標不変性、正則写像の微分による $J$ の保存条件**である。
