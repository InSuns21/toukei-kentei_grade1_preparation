# CATB7-01 複体と鎖写像

## 1. 完全性の不足を測る

[完全列](../CATB1-05/index.md#def-catb1-05-exact)では、前の射の像が次の射の核と一致した。しかし整数の列

$$
\mathbb Z\xrightarrow{4}\mathbb Z\xrightarrow{\bmod 2}\mathbb Z/2\mathbb Z
$$

では左の矢印は $x\mapsto4x$、右の矢印は整数を2で割った剰余類への射影を表す。合成は零でも、中央の核は $2\mathbb Z$、前の像は $4\mathbb Z$ である。両者の違いは偶数を4の倍数だけずらして同一視した二つの類で表せる。完全でないことを単なる真偽ではなく対象として記録し、その記録を射で移せるようにするのが本講の目的である。

以下、合成を $gf=g\circ f$ と書く。$O$ は零対象、$0$ は型に応じた零射、$1_X$ は恒等射とする。可換群と加法を保つ写像の圏は整数加群の圏なので、[加群の圏はアーベル圏](../CATB1-04/index.md#thm-catb1-04-module-category)を適用できる。

正整数 $m$ に対し、整数の倍数全体を

$$
m\mathbb Z=\{mt:t\in\mathbb Z\}
$$

と表す。商群 $\mathbb Z/m\mathbb Z$ の剰余類を $[x]_m$ と書く。二つの剰余類が等しい条件は

$$
[x]_m=[y]_m\quad\Longleftrightarrow\quad x-y\in m\mathbb Z
$$

である。倍写像と剰余類への射影は加法を保つ。

## 2. 連続する二射の合成を零にする

整数 $n$ を位置の番号（次数）とする。各次数に対象を置き、隣の次数に進む射を微分と呼ぶ。この呼び名は射の役割を表すもので、整数の倍写像なども微分として使える。射を二回適用すると零になる、という条件を抽出している。

<a id="def-catb7-01-cochain-complex"></a>

<!-- formal-statement-start -->
> **定義（余鎖複体）**
>
> [局所小](../../CAT/CAT1-02/index.md#def-cat1-02-size)（各二対象間の射が集合をなす）な[加法圏](../CATB1-03/index.md#def-catb1-03-additive-category) $\mathcal A$ において、各整数 $n$ に対象 $C^n$ と射 $d_C^n:C^n\to C^{n+1}$ が指定され、すべての整数 $n$ で

$$
d_C^{n+1}d_C^n=0
$$

> が成り立つとき、$(C^n,d_C^n)_{n\in\mathbb Z}$ を余鎖複体と呼ぶ。$C^\bullet$ と略記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-01-cochain-complex -->
**定義の確認**。次数 $-1,0,1$ にそれぞれ $\mathbb Z,\mathbb Z,\mathbb Z/2\mathbb Z$ を置き、他の次数は $O$ とする。$d^{-1}(x)=4x$、$d^0(y)=[y]_2$ とし、残りは零射とする。

二本とも加法を保つ写像で、始域・終域は隣の次数に一致する。中央では $d^0d^{-1}(x)=[4x]_2=[0]_2$。それ以外では少なくとも一方が零射だから、[零射との合成](../CATB1-03/index.md#prop-catb1-03-zero-composition)により零となる。したがってすべての次数で条件を満たす。
<!-- definition-example-end -->

下付き添字で次数を表し、微分を $C_n\to C_{n-1}$ とする流儀を鎖複体という。$C_n=C^{-n}$、$\partial_n=d_C^{-n}$ と置けば $\partial_{n-1}\partial_n=d_C^{-n+1}d_C^{-n}=0$ である。本講と次講では上付き添字で統一する。

例えば二本の射をともに整数の倍写像 $2$ とすると合成は $4$ であり、余鎖複体ではない。後で像を核の内部で比較するためには、この零条件が不可欠である。

## 3. 複体の間で微分を保つ

複体間の写像は各位置で対象を移すだけでは足りない。「先に微分して移す」と「先に移して微分する」が一致すれば、零になる入力を零になる入力へ送れる。

<a id="def-catb7-01-cochain-map"></a>

<!-- formal-statement-start -->
> **定義（余鎖写像）**
>
> 加法圏の余鎖複体 $C^\bullet,D^\bullet$（同じ加法圏に属する）の間の余鎖写像 $f:C^\bullet\to D^\bullet$ は、射 $f^n:C^n\to D^n$ の族であって、すべての整数 $n$ で

$$
d_D^nf^n=f^{n+1}d_C^n
$$

> を満たすものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-01-cochain-map -->
**定義の確認**。前節の複体を $C^\bullet=D^\bullet$ として、各非零次数で3倍する射を取る。次数 $-1$ では $4(3x)=3(4x)$、次数0では $[3y]_2=3[y]_2$。商群上の3倍は代表元の差が2の倍数なら3倍後の差も2の倍数なので定義できる。他の次数では両辺が零射である。よってこの族は余鎖写像である。

一方、次数 $-1$ だけ恒等射、他を零射とすれば次数 $-1$ の条件は $4x=0$ となり、$x=1$ で破れる。
<!-- definition-example-end -->

余鎖写像を成分ごとに合成・加算できれば、複体を一つの圏にまとめられる。

<a id="thm-catb7-01-complex-category"></a>

<!-- formal-statement-start -->
> **定理（余鎖複体の加法圏）**
>
> 局所小な加法圏 $\mathcal A$ の余鎖複体を対象、余鎖写像を射とすると、局所小な加法圏 $\operatorname{Ch}(\mathcal A)$ が得られる。合成・恒等射・和・零射・加法逆元は成分ごとに定め、[有限双積](../CATB1-03/index.md#def-catb1-03-biproduct)も次数ごとに取れる。
<!-- formal-statement-end -->

見取り図：可換条件が合成と和の両方で保存されることを調べる。双積には二つの微分を対角成分として入れれば、それぞれの微分が二乗零であることを別々に使える。

<!-- proof-start -->
### 証明

$f:C^\bullet\to D^\bullet$、$g:D^\bullet\to E^\bullet$ に対し、成分を $(gf)^n=g^nf^n$ と置く。二つの余鎖写像条件を順に使うと

$$
\begin{aligned}
d_E^n g^n f^n
&=g^{n+1}d_D^nf^n\\
&=g^{n+1}f^{n+1}d_C^n.
\end{aligned}
$$

したがって合成は余鎖写像である。恒等射の族は $d_C^n1_{C^n}=1_{C^{n+1}}d_C^n$ を満たす。結合律と単位律は各成分での圏の公理から従う。射の集合は各次数の射の集合の可算直積の部分集合なので集合である。

平行な二射 $f,h:C^\bullet\to D^\bullet$ に対し、[前加法圏の双加法性](../CATB1-03/index.md#def-catb1-03-preadditive)を使うと

$$
\begin{aligned}
d_D^n(f^n+h^n)
&=d_D^nf^n+d_D^nh^n\\
&=(f^{n+1}+h^{n+1})d_C^n.
\end{aligned}
$$

零射の族も条件を満たす。合成の双加法性から $d_D^n(-f^n)=-d_D^nf^n=(-f^{n+1})d_C^n$ なので逆元も条件を満たす。従って射の集合は可換群で、合成の双加法性も各成分から従う。

全次数が零対象の複体は零対象である。二複体 $C^\bullet,D^\bullet$ の双積候補 $S^n=C^n\oplus D^n$ を取る。[有限双積](../CATB1-03/index.md#def-catb1-03-biproduct)の包含を $i_C^n,i_D^n$、射影を $p_C^n,p_D^n$ と書き、

$$
d_S^n=i_C^{n+1}d_C^np_C^n+i_D^{n+1}d_D^np_D^n
$$

と定める。$p_C^ni_C^n=1$、$p_D^ni_D^n=1$、交差する二合成は零である。分配して計算すると

$$
d_S^{n+1}d_S^n
=i_C^{n+2}d_C^{n+1}d_C^np_C^n+
i_D^{n+2}d_D^{n+1}d_D^np_D^n=0.
$$

同じ[双積の条件](../CATB1-03/index.md#def-catb1-03-biproduct)から $p_C^{n+1}d_S^n=d_C^np_C^n$、$d_S^ni_C^n=i_C^{n+1}d_C^n$ が成立する。例えば $D$ 成分では、交差項が零になるため

$$
\begin{aligned}
p_D^{n+1}d_S^n
&=0\cdot d_C^np_C^n+1_{D^{n+1}}d_D^np_D^n\\
&=d_D^np_D^n,\\
d_S^ni_D^n
&=i_C^{n+1}d_C^n0+i_D^{n+1}d_D^n1_{D^n}\\
&=i_D^{n+1}d_D^n.
\end{aligned}
$$

従って挿入射と射影の族は[余鎖写像](#def-catb7-01-cochain-map)である。

成分で $i_Cp_C+i_Dp_D=1_S$ および上述の四つの合成条件を満たすから、複体の圏でも[双積の普遍性](../CATB1-03/index.md#thm-catb1-03-biproduct-universality)を適用できる。零対象と二項双積を反復すれば有限双積があるので加法圏である。
<!-- proof-end -->

## 4. 核の中で像を取り除く

ここからは $\mathcal A$ を[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category)とする。像・核・余核が使えるので、完全性の不足を対象として定義できる。

次数 $n$ の[核](../CATB1-04/index.md#def-catb1-04-kernel)を $k_C^n:Z_C^n\to C^n$、前の微分の[像](../CATB1-01/index.md#def-catb1-01-image)を $i_C^n:B_C^n\to C^n$ とする。前者は $d_C^n$ で消える情報、後者は前の微分から来た情報を表す。それぞれの元を使える圏ではコサイクル、コバウンダリと呼ぶ。

[像と余像の比較同型](../CATB1-05/index.md#thm-catb1-05-image-coimage)により $d_C^{n-1}=i_C^ne_C^{n-1}$ と分解でき、$e_C^{n-1}$ はエピ射である。複体条件から

$$
d_C^ni_C^ne_C^{n-1}=0.
$$

[エピ射の右消去性](../../CAT/CAT1-03/index.md#def-cat1-03-epimorphism)を使うと $d_C^ni_C^n=0$。[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)により $k_C^nj_C^n=i_C^n$ となる唯一の射 $j_C^n:B_C^n\to Z_C^n$ がある。$i_C^n$ はモノ射なので、$j_C^na=j_C^nb$ なら $i_C^na=i_C^nb$、従って $a=b$。この $j_C^n$ はモノ射である。こうして像を核の内部に置けた。

<a id="def-catb7-01-cohomology"></a>

<!-- formal-statement-start -->
> **定義（余鎖複体のコホモロジー）**
>
> アーベル圏の余鎖複体 $C^\bullet$ と整数 $n$ を取る。核射と像の包含をそれぞれ

$$
k_C^n:Z_C^n\to C^n,\qquad i_C^n:B_C^n\to C^n
$$

> とする。前者は $d_C^n$ の核、後者は $d_C^{n-1}$ の像である。核の普遍性により定まる射 $j_C^n:B_C^n\to Z_C^n$ は次の等式を満たす。

$$
k_C^nj_C^n=i_C^n.
$$

> この射の[余核](../CATB1-04/index.md#def-catb1-04-cokernel)を次のように表す。

$$
q_C^n:Z_C^n\to H^n(C^\bullet).
$$

> 終域 $H^n(C^\bullet)$ を次数 $n$ のコホモロジー対象という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-01-cohomology -->
**定義の確認**。[加群の核・余核の構成](../CATB1-04/index.md#thm-catb1-04-module-category)によれば、可換群では核射は微分で零になる元全体の包含、余核は値全体による商への射影である。[像と余像の比較同型](../CATB1-05/index.md#thm-catb1-05-image-coimage)によれば像の射は余核の核であり、商への射影で零になる元は元の射の値全体に一致する。したがって像の射も部分群の包含で表せる。複体条件で $B_C^n\subseteq Z_C^n$ なので、$j_C^n$ の余核は核の部分群を像の部分群で割った商群となる。ここから

$$
H^n(C^\bullet)=\ker d_C^n/\operatorname{im} d_C^{n-1}.
$$

第2節の三項複体では次数0で $Z_C^0=2\mathbb Z$、$B_C^0=4\mathbb Z$。$j_C^0$ は包含、$q_C^0$ は剰余類への商射となる。商の元は $2t+4\mathbb Z$（$t\in\mathbb Z$）と書ける。写像を

$$
2t+4\mathbb Z\longmapsto[t]_2
$$

と定める。代表元を $2s$ に替えても同じ類になる条件は

$$
2t-2s\in4\mathbb Z
\quad\Longleftrightarrow\quad
t-s\in2\mathbb Z.
$$

よって代表元によらず、異なる類が同じ値に移ることもない。加法を保つのは $2t+2s=2(t+s)$ から分かり、任意の $[t]_2$ は $2t+4\mathbb Z$ の像である。従って商から $\mathbb Z/2\mathbb Z$ への同型を与える。

次数 $-1$ では4倍が単射なので核も像も零、次数1では微分が零で核は $\mathbb Z/2\mathbb Z$ 全体、前の微分が全射なので像も全体。従ってこの二次数のコホモロジーは零となる。他の次数は対象自体が零である。
<!-- definition-example-end -->

二項複体 $A\xrightarrow{u} B$ を次数0,1に置くと、$H^0$ は $u$ の核の対象、$H^1$ は $u$ の余核の対象である。例えば $u(x)=3x$ なら $H^0=0$、$H^1=\mathbb Z/3\mathbb Z$。二項複体でも単射性と全射性の不足を別々に記録できる。

<a id="thm-catb7-01-exact-cohomology"></a>

<!-- formal-statement-start -->
> **定理（完全性とコホモロジーの消滅）**
>
> アーベル圏の余鎖複体 $C^\bullet$ が次数 $n$ で完全であることと、$H^n(C^\bullet)$ が零対象であることは同値である。
<!-- formal-statement-end -->

見取り図：像の包含と核射が可換な同型で結ばれるなら、その商は零になる。逆方向では商が零であることから、核の中の像の包含がエピ射でもあることを示す。

<!-- proof-start -->
### 証明

[完全列の定義](../CATB1-05/index.md#def-catb1-05-exact)により、次数 $n$ で完全であることは上で構成した $j_C^n$ が同型であることと同値である。

$j_C^n$ が同型なら任意の $t:Z_C^n\to T$ で $tj_C^n=0$ を満たすものは、逆射を右から合成して $t=0$。零対象への射 $Z_C^n\to O$ はこの条件を満たす全ての射を一意に因子化するので余核である。[余核の同型一意性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)から $H^n(C^\bullet)$ は零対象と同型である。

逆に $H^n(C^\bullet)$ が零対象なら $q_C^n$ は零射である。$a,b:Z_C^n\to T$ に対して $aj_C^n=bj_C^n$ と仮定する。$(a-b)j_C^n=0$ なので余核の普遍性から $a-b=tq_C^n=0$ となる。従って $a=b$ であり $j_C^n$ はエピ射である。既にモノ射であることを示したので、[アーベル圏における同型射の判定](../CATB1-04/index.md#prop-catb1-04-balanced)により同型となる。
<!-- proof-end -->

## 5. 余鎖写像からコホモロジーの射を作る

単に核の間の射を作るだけでは、商で同一視する情報が保たれるか分からない。余鎖写像の可換条件は、この問題を解決するためにも使える。

<a id="thm-catb7-01-cohomology-functor"></a>

<!-- formal-statement-start -->
> **定理（コホモロジーの関手性）**
>
> 局所小なアーベル圏 $\mathcal A$ と整数 $n$ を固定し、各複体について核・像・余核の選択が与えられているとする。
>
> 余鎖写像 $f:C^\bullet\to D^\bullet$ は一意に次の射を誘導する。

$$
H^n(f):H^n(C^\bullet)\to H^n(D^\bullet).
$$

> ここで $k_C^n,k_D^n$ は核射、$q_C^n,q_D^n$ はコホモロジーへの余核射とする。核上の射 $z_f:Z_C^n\to Z_D^n$（添字 $f$ はもとの余鎖写像を表す）は次の条件で一意に定まる。

$$
k_D^nz_f=f^nk_C^n.
$$

> 誘導射は次の等式で特徴づけられる。

$$
H^n(f)q_C^n=q_D^nz_f.
$$

> これらは恒等射・合成・和を保存し、加法的な関手 $H^n:\operatorname{Ch}(\mathcal A)\to\mathcal A$ を与える。
<!-- formal-statement-end -->

見取り図：核への射を作り、前の微分の像を保つことを示す。その後、余核の普遍性により商への射を作る。抽象的な圏でも元を選ぶ必要はない。

<!-- proof-start -->
### 証明

まず $d_D^nf^nk_C^n=f^{n+1}d_C^nk_C^n=0$ なので、[核の普遍性](../CATB1-04/index.md#def-catb1-04-kernel)から唯一の $z_f:Z_C^n\to Z_D^n$ が存在して $k_D^nz_f=f^nk_C^n$ を満たす。

[余鎖複体のコホモロジー](#def-catb7-01-cohomology)の直前で用いた像分解を両複体で適用すると、

$$
\begin{aligned}
k_D^nz_f j_C^ne_C^{n-1}
&=f^nk_C^nj_C^ne_C^{n-1}\\
&=f^nd_C^{n-1}\\
&=d_D^{n-1}f^{n-1}\\
&=k_D^nj_D^ne_D^{n-1}f^{n-1}.
\end{aligned}
$$

$k_D^n$ はモノ射なので消去し、左から $q_D^n$ を合成する。$q_D^nj_D^n=0$ なので

$$
q_D^nz_fj_C^ne_C^{n-1}=0.
$$

$e_C^{n-1}$ はエピ射なので $q_D^nz_fj_C^n=0$ となる。従って[余核の普遍性](../CATB1-04/index.md#def-catb1-04-cokernel)により唯一の $H^n(f)$ が存在して

$$
H^n(f)q_C^n=q_D^nz_f
$$

を満たす。

恒等射について $k_C^nz_{1_C}=k_C^n$ から $z_{1_C}=1_{Z_C^n}$。従って $H^n(1_C)q_C^n=q_C^n$ であり、[余核のエピ射性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)により $H^n(1_C)=1_{H^n(C)}$ である。

$g:D^\bullet\to E^\bullet$ に対して $k_E^nz_gz_f=g^nk_D^nz_f=g^nf^nk_C^n$。核の一意性から $z_{gf}=z_gz_f$。さらに

$$
H^n(g)H^n(f)q_C^n
=H^n(g)q_D^nz_f
=q_E^nz_gz_f=H^n(gf)q_C^n.
$$

$q_C^n$ を消去して合成の保存を得る。

平行な $f,h$ について[合成の双加法性](../CATB1-03/index.md#def-catb1-03-preadditive)から $k_D^n(z_f+z_h)=(f^n+h^n)k_C^n$ なので $z_{f+h}=z_f+z_h$。余核への式は

$$
(H^n(f)+H^n(h))q_C^n
=q_D^n(z_f+z_h)=H^n(f+h)q_C^n.
$$

よって和を保存する。零射の保存は $H^n(0)=H^n(0)+H^n(0)$ の両辺から $H^n(0)$ を引いて従う。

[核の同型一意性](../CATB1-04/index.md#prop-catb1-04-kernel-cokernel-uniqueness)と[像の普遍性](../CATB1-01/index.md#def-catb1-01-image)から、異なる核・像の選択には一意な可換同型がある。以下では次数を $n$ に固定し、核射・像の包含・余核射などの上付き次数を省略する。別の選択をプライム付きの記号で表し、核射および像の包含に対応する同型を $u_C:Z_C^n\to Z_C^{\prime n}$、$v_C:B_C^n\to B_C^{\prime n}$ とする。$k'_Cu_C=k_C$、$i'_Cv_C=i_C$ だから

$$
k'_Cu_Cj_C=i_C=k'_Cj'_Cv_C.
$$

核射を消去して $u_Cj_C=j'_Cv_C$。従って $q'_Cu_Cj_C=0$ であり、余核の普遍性から $w_Cq_C=q'_Cu_C$ を満たす唯一の $w_C:H^n(C)\to H^{\prime n}(C)$ がある。逆方向にも $u_C^{-1}$ から同様に $w'_Cq'_C=q_Cu_C^{-1}$ を得る。すると $w'_Cw_Cq_C=q_C$ および $w_Cw'_Cq'_C=q'_C$ となるので、余核射を消去して両者が互いに逆であることが分かる。

また $k'_Du_Dz_f=f^nk_C=k'_Dz'_fu_C$ なので $u_Dz_f=z'_fu_C$。従って

$$
w_DH^n(f)q_C=q'_Du_Dz_f
=q'_Dz'_fu_C=H^{\prime n}(f)w_Cq_C.
$$

$q_C$ を消去すれば、$w_DH^n(f)=H^{\prime n}(f)w_C$ を得る。したがって選択による違いは自然な同型に限られる。
<!-- proof-end -->

可換群では、ここから再び次数を明記する。$[x]$ はコサイクル $x\in Z_C^n$ の $B_C^n$ による剰余類を表し、$[f^n(x)]$ は $B_D^n$ による剰余類を表す。この構成は

$$
H^n(f)([x])=[f^n(x)]
$$

と書ける。実際、$d_C^nx=0$ なら $d_D^nf^nx=f^{n+1}0=0$。また $x-x'=d_C^{n-1}y$ なら $f^n(x)-f^n(x')=d_D^{n-1}f^{n-1}(y)$ なので同じ類へ移る。第3節の3倍写像は次数0の $\mathbb Z/2\mathbb Z$ 上で $[t]_2\mapsto[3t]_2=[t]_2$ を誘導する。複体上の異なる射が同じコホモロジーの射になることもある。

## 6. 演習

以下の整数・商群の例は可換群の圏で考え、表示していない次数の対象と微分は零とする。コホモロジーの計算は第4節の商群表示を用いる。

### CATB7-01-A01 複体条件

- Level: A

次数0,1,2に $\mathbb Z,\mathbb Z^2,\mathbb Z$ を置き、$d^0(x)=(x,2x)$、$d^1(a,b)=2a-b$ とする。他は零とする。余鎖複体か判定せよ。

<!-- solution-start -->
[余鎖複体](#def-catb7-01-cochain-complex)の条件を調べる。両射は各成分で整数倍と和によって定義されるため加法を保ち、隣接次数を結ぶ。$d^1d^0(x)=2x-2x=0$。残る合成は零射を含むから零である。従って余鎖複体である。
<!-- solution-end -->

### CATB7-01-A02 余鎖写像の条件

- Level: A

次数0,1に置いた二項複体 $C=(\mathbb Z\xrightarrow{2}\mathbb Z)$、$D=(\mathbb Z\xrightarrow{3}\mathbb Z)$ を取る。$f^0$ を整数 $a$ 倍、$f^1$ を整数 $b$ 倍とする。余鎖写像となる全ての $(a,b)$ を求めよ。

<!-- solution-start -->
[余鎖写像](#def-catb7-01-cochain-map)の条件は全整数 $x$ で $3ax=2bx$。$x=1$ から $3a=2b$。左辺が偶数なので $a=2t$ と書け、$6t=2b$ から $b=3t$。逆に任意の整数 $t$ で $3(2t)=2(3t)$。他の次数の両辺は零なので、答えは $(2t,3t)$ 全体である。
<!-- solution-end -->

### CATB7-01-A03 二項複体

- Level: A

次数0,1の二項複体 $\mathbb Z\xrightarrow{5}\mathbb Z$ の全次数のコホモロジーを求めよ。

<!-- solution-start -->
[余鎖複体のコホモロジー](#def-catb7-01-cohomology)を使う。次数0の核は $5x=0$ を満たす整数だけなので零、前の像も零。次数1の微分は零、核は整数全体、前の像は $5\mathbb Z$。従って $H^0=0$、$H^1=\mathbb Z/5\mathbb Z$、それ以外は対象が零なので $H^n=0$。
<!-- solution-end -->

### CATB7-01-A04 合成と和

- Level: A

次数0,1の複体 $\mathbb Z\xrightarrow{4}\mathbb Z$ で、両次数をそれぞれ2倍、3倍する二つの自己余鎖写像を $f,g$ とする。$g f$ と $f+g$ を求めよ。

<!-- solution-start -->
$4(2x)=2(4x)$、$4(3x)=3(4x)$ だから双方とも余鎖写像である。[余鎖複体の加法圏](#thm-catb7-01-complex-category)より成分ごとに計算する。$(gf)^n(x)=3(2x)=6x$、$(f+g)^n(x)=2x+3x=5x$（$n=0,1$）。他の次数は零。実際に $4\cdot6=6\cdot4$、$4\cdot5=5\cdot4$ で可換条件も保たれている。
<!-- solution-end -->

### CATB7-01-B01 完全性と中央の商

- Level: B

正整数 $m,r$ に対して次数 $-1,0,1$ に $\mathbb Z\xrightarrow{r}\mathbb Z\xrightarrow{\bmod m}\mathbb Z/m\mathbb Z$ を置く。複体になる条件と、その条件下で全コホモロジーを求めよ。

<!-- solution-start -->
合成は $x\mapsto[rx]_m$ だから $x=1$ で $m$ が $r$ を割る必要がある。逆に $r=mt$（正整数 $t$）なら $[mtx]_m=0$。他の合成は零なので複体となる。

[余鎖複体のコホモロジー](#def-catb7-01-cohomology)より、中央の核は $m\mathbb Z$、像は $mt\mathbb Z$ である。商を計算するため、次の射を考える。

$$
m\mathbb Z\to\mathbb Z/t\mathbb Z,\qquad mx\mapsto[x]_t.
$$

$m(x+y)\mapsto[x+y]_t=[x]_t+[y]_t$ だから加法を保つ。任意の剰余類には代表元 $x$ があるため全射である。零に移るのは $x$ が $t$ の倍数の場合なので、この射の核は $mt\mathbb Z$。従って[群の第一同型定理](../../../代数系/GRP/GRP2/index.md#thm-grp2-first-isomorphism)により

$$
H^0=m\mathbb Z/mt\mathbb Z\simeq\mathbb Z/t\mathbb Z.
$$

$r>0$ なので左端の微分は単射であり、右端への微分は全射である。従って $H^{-1}=H^1=0$。他の次数も零である。

[完全性とコホモロジーの消滅](#thm-catb7-01-exact-cohomology)より、全次数で完全となるのは中央の商も零となる $t=1$、すなわち $m=r$ のときである。
<!-- solution-end -->

### CATB7-01-B02 誘導射の計算

- Level: B

次数0,1の二項複体 $C=(\mathbb Z\xrightarrow{6}\mathbb Z)$、$D=(\mathbb Z\xrightarrow{4}\mathbb Z)$ に対し、$f^0(x)=3x$、$f^1(x)=2x$ とする。余鎖写像か判定し、誘導射 $H^1(f)$ について、核および像を求めよ。

<!-- solution-start -->
$4(3x)=12x=2(6x)$ なので余鎖写像である。[コホモロジーの関手性](#thm-catb7-01-cohomology-functor)の商の式より

$$
H^1(f):\mathbb Z/6\mathbb Z\to\mathbb Z/4\mathbb Z,\quad [x]_6\mapsto[2x]_4.
$$

代表元の差が6の倍数なら2倍した差は12の倍数であり4で割り切れる。$[2x]_4=0$ と $x$ が偶数であることは同値なので核は $\{[0]_6,[2]_6,[4]_6\}$。像は $x=0,1$ でそれぞれ $[0]_4,[2]_4$ を取り、全ての $x$ は偶奇いずれかだからこの二元のみである。
<!-- solution-end -->

### CATB7-01-B03 成分ごとの双積

- Level: B

次数0,1の二項複体 $\mathbb Z\xrightarrow{2}\mathbb Z$ と $\mathbb Z\xrightarrow{3}\mathbb Z$ の双積の微分と、全コホモロジーを求めよ。

<!-- solution-start -->
[余鎖複体の加法圏](#thm-catb7-01-complex-category)より次数0,1の双積は $\mathbb Z^2$ である。挿入射は $i_C(x)=(x,0)$、$i_D(y)=(0,y)$、射影は $p_C(x,y)=x$、$p_D(x,y)=y$ なので、定理の微分の式に代入すると

$$
\begin{aligned}
d^0(x,y)&=i_C(2p_C(x,y))+i_D(3p_D(x,y))\\
&=(2x,0)+(0,3y)=(2x,3y).
\end{aligned}
$$

この射の核は $2x=3y=0$ を満たす $(0,0)$ のみであり、像は $2\mathbb Z\oplus3\mathbb Z$ である。

従って $H^0=0$。次数1の核は $\mathbb Z^2$ 全体。$(x,y)\mapsto([x]_2,[y]_3)$ は各剰余類から代表元を取れば全射、加法も各成分で保ち、核は $2\mathbb Z\oplus3\mathbb Z$。よって[群の第一同型定理](../../../代数系/GRP/GRP2/index.md#thm-grp2-first-isomorphism)から商との同型は

$$
H^1\simeq\mathbb Z/2\mathbb Z\oplus\mathbb Z/3\mathbb Z.
$$

他の次数は零である。
<!-- solution-end -->

### CATB7-01-B04 逆射を持つ余鎖写像

- Level: B

局所小なアーベル圏の余鎖写像 $f:C^\bullet\to D^\bullet$ のすべての成分が同型であるとする。成分の逆射が余鎖写像を与えることを示し、コホモロジーの誘導射について結論を述べよ。

<!-- solution-start -->
$d_D^nf^n=f^{n+1}d_C^n$ の左から $(f^{n+1})^{-1}$、右から $(f^n)^{-1}$ を合成すると

$$
(f^{n+1})^{-1}d_D^n=d_C^n(f^n)^{-1}.
$$

これは $D^\bullet\to C^\bullet$ の余鎖写像条件である。逆射の族を $g$ とすると成分ごとに $gf=1_C$、$fg=1_D$。[コホモロジーの関手性](#thm-catb7-01-cohomology-functor)より $H^n(g)H^n(f)=1_{H^n(C)}$、$H^n(f)H^n(g)=1_{H^n(D)}$。従って全次数で $H^n(f)$ は同型である。
<!-- solution-end -->

### CATB7-01-C01 三項複体の比較

- Level: C

次数 $-1,0,1$ に複体 $C=(\mathbb Z\xrightarrow{12}\mathbb Z\xrightarrow{\bmod 3}\mathbb Z/3\mathbb Z)$ と $D=(\mathbb Z\xrightarrow{8}\mathbb Z\xrightarrow{\bmod 2}\mathbb Z/2\mathbb Z)$ を置く。

1. 複体条件と全次数のコホモロジーを求めよ。
2. $f^{-1}(x)=3x$、$f^0(x)=2x$、$f^1=0$ とした族が余鎖写像となることを示せ。
3. 中央で誘導される射の具体式を求め、同型か判定せよ。複体自体の同型と区別せよ。

<!-- solution-start -->
第1問。$[12x]_3=0$、$[8x]_2=0$ なので合成は零。他は零射との合成である。[余鎖複体のコホモロジー](#def-catb7-01-cohomology)より中央の核・像はそれぞれ $3\mathbb Z,12\mathbb Z$ および $2\mathbb Z,8\mathbb Z$。$3t\mapsto[t]_4$ と $2s\mapsto[s]_4$ は双方とも加法を保ち、全射で核がそれぞれ前の像だから、[群の第一同型定理](../../../代数系/GRP/GRP2/index.md#thm-grp2-first-isomorphism)により

$$
H^0(C)\simeq\mathbb Z/4\mathbb Z,\qquad H^0(D)\simeq\mathbb Z/4\mathbb Z.
$$

左端の微分は両方とも単射、右端への微分は両方とも全射なので、次数 $-1,1$ のコホモロジーは双方で零。他の次数も零である。

第2問。[余鎖写像](#def-catb7-01-cochain-map)の条件を調べる。次数 $-1$ では $8(3x)=24x=2(12x)$。次数0では $[2x]_2=0=f^1([x]_3)$。他の次数は零射を含み両辺が零となる。よって余鎖写像である。

第3問。中央の核の元 $3t$ は $f^0$ により $6t=2(3t)$ に移る。[コホモロジーの関手性](#thm-catb7-01-cohomology-functor)で得られる商の射は、第1問で得た商群の同型を使うと

$$
H^0(f)([t]_4)=[3t]_4.
$$

$3\cdot3=9$ は4で割った余りが1なので、3倍をもう一度適用すれば恒等射になる。従って同型である。他の次数でも零対象間の唯一の射は同型である。しかし $f^0$ は2倍であり、整数1を値に取らないため逆射を持たない。もし複体として逆射があれば次数0の成分がその逆射になるので矛盾する。さらにこの例では、別の射によっても二複体は同型にならない。複体の同型の次数1の成分には $\mathbb Z/3\mathbb Z$ と $\mathbb Z/2\mathbb Z$ の同型が必要だが、元の個数が3と2で異なるので不可能である。全次数のコホモロジーが同型であることと複体そのものが同型であることは異なる条件である。
<!-- solution-end -->

## 7. まとめ

余鎖複体は連続する微分の合成が零である列で、余鎖写像は微分との可換性を満たす射の族である。アーベル圏では前の微分の像を次の微分の核に入れ、その商によって完全性の不足を測れる。コホモロジーは余鎖写像から射を作り、合成と和を保存する。次講では、異なる余鎖写像が同じコホモロジーの射を誘導する仕組みを調べる。
