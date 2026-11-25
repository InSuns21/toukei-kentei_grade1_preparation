# CATB7-04 導来圏と完全三角形

## 1. 完全列を複体の世界へ持ち上げる

前講では、コホモロジー上で同型になる射を逆にした。例えば次数 $-1,0$ の二項複体 $\mathbb Z\xrightarrow{m}\mathbb Z$ は、次数0にだけ $\mathbb Z/m\mathbb Z$ を置いた複体と同型になる。しかし、商群だけを記録すると、元の $m$ 倍写像やそれに続く射の情報が見えにくい。

そこで複体の間の射を出発点とし、写像錐とシフトを使って三つの複体を結ぶ。通常の短完全列のように各次数で単射・全射を要求するのではなく、各次数のコホモロジーをつなぐ長い完全列が得られる構造を調べる。

以下、局所小な[アーベル圏](../CATB1-04/index.md#def-catb1-04-abelian-category) $\mathcal A$ を固定する。その対象・射が集合となる十分大きな宇宙を選び、複体、射、同値類をその中で作る。余鎖次数は整数で、合成は右から左。加群の例では $M[0]$ を次数0だけに加群 $M$ を置く複体とする。指定のない次数の対象・射は零とし、$m$ 倍写像は整数加群上の $x\mapsto mx$、$[x]_m$ は剰余類を表す。冒頭の二項複体の例では $m\ne0$ とする。

[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex) $C$ の微分 $d_C^n:C^n\to C^{n+1}$ は実変数の導関数ではなく次数を上げる射である。[余鎖写像](../CATB7-01/index.md#def-catb7-01-cochain-map) $a:C\to D$ の成分は $a^n:C^n\to D^n$ で、$d_D^na^n=a^{n+1}d_C^n$ を満たす。$H^n(C)$ は[コホモロジー対象](../CATB7-01/index.md#def-catb7-01-cohomology)、$H^n(a)$ はその誘導射を表す。上付きの整数は次数であり、例えば $a^{-1}$ は次数 $-1$ の成分を表す（同型の逆射と混同しないよう、逆射には $Q(a)^{-1}$ などと書く）。

一般のアーベル圏での成分計算には[双積の射の行列表示](../CATB1-03/index.md#thm-catb1-03-matrix)を使う。例えば双積 $V_1\oplus V_2$ から $W_1\oplus W_2$ への射 $T$ の第 $a$ 行第 $b$ 列は、包含 $j_b$ と射影 $\pi_a$ を用いた $\pi_aTj_b:V_b\to W_a$ である。双積への射は射影との合成で一意に定まるので、各成分を比較すれば射の等式を判定できる。以下の $(y,x)$ などの成分式は加群では元への作用を表し、一般のアーベル圏では双積からの射の行列の作用、あるいは任意の共通始域からの射 $y,x$ に対する成分式として読む。

## 2. コホモロジーで見た同型を逆にする

[余鎖複体のホモトピー圏](../CATB7-03/index.md#def-catb7-03-homotopy-category) $K(\mathcal A)$ ではホモトピー類を射とした。さらに全次数のコホモロジーで同型になる[余鎖複体の擬同型](../CATB7-03/index.md#def-catb7-03-quasi-isomorphism)の集合を $S$ とする。[圏の局所化](../CATB7-03/index.md#def-catb7-03-localization)を使うと、対象を増やさずに擬同型を可逆にできる。その射は[roofと共通細分](../CATB7-03/index.md#def-catb7-03-roof)で記述する。roof の二本の射のうち左向きの射を逆にする。

<a id="def-catb7-04-derived-category"></a>

<!-- formal-statement-start -->
> **定義（導来圏）**
>
> 上の大きさの仮定を満たすアーベル圏 $\mathcal A$ の導来圏を、擬同型の集合 $S$ に関するホモトピー圏の局所化

$$
D(\mathcal A)=K(\mathcal A)[S^{-1}]
$$

> とする。局所化関手を $Q:K(\mathcal A)\to D(\mathcal A)$ と書く。対象は余鎖複体、射は前講の roof の同値類である。
<!-- formal-statement-end -->

存在と普遍性は[擬同型を逆にする局所化](../CATB7-03/index.md#thm-catb7-03-localization)による。射 $X\to Y$ を表す roof は

$$
X\xleftarrow{s}U\xrightarrow{a}Y,\qquad s\in S
$$

であり、その値は $Q(a)Q(s)^{-1}$ である。以下、混乱しない場合は余鎖写像からホモトピー類を作る操作を記号から省く。

<!-- definition-example-start: def-catb7-04-derived-category -->
**定義の確認**。$\mathcal A$ を整数加群の圏、$P$ を次数 $-1,0$ に $\mathbb Z\xrightarrow{4}\mathbb Z$ を置いた複体、$M=(\mathbb Z/4\mathbb Z)[0]$ とする。剰余射 $s:P\to M$ は余鎖写像であり、次数0で $s^0(4x)=[4x]_4=0$ となる。

$P$ の次数 $-1$ の核は零、次数0のコホモロジーは $\mathbb Z/4\mathbb Z$。$H^0(s)$ は剰余類の恒等射、他次数は零対象の恒等射である。よって $s\in S$。

$Q(s):P\to M$ は roof $(1_P,s)$ で、逆射は $(s,1_P)$ である。ここでは roof とその同値類を同じ記号で表すこともある。[roofの合成](../CATB7-03/index.md#thm-catb7-03-roof-category)では前の roof の分子と後の roof の分母をそろえる。逆射を後合成する場合はどちらも $s$ なので恒等射でそろい、$Q(s)$ を後合成する場合はどちらも $1_P$ なのでやはり恒等射でそろう。二つの合成はそれぞれ $(1_P,1_P)$ と $(s,s)$ になる。後者は共通細分 $P$ を使って $(1_M,1_M)$ と同値である。このように導来圏の同型は元の複体の各次数の同型を意味しない。
<!-- definition-example-end -->

### 2.1 射の和と次数の移動

三角形の回転では射に負号を付ける。そのため局所化の後にも射の和が意味を持つことを確認する。[加法圏](../CATB1-03/index.md#def-catb1-03-additive-category)で必要なのは射の集合の可換群構造、合成の両側の分配律、零対象と有限双積である。また、[余鎖複体のシフト](../CATB7-02/index.md#def-catb7-02-shift) $C[r]$ では $C[r]^n=C^{n+r}$、$d_{C[r]}^n=(-1)^rd_C^{n+r}$、$a[r]^n=a^{n+r}$ である。整数 $r$ は移動する次数の幅を表す。

<a id="prop-catb7-04-additive-shift"></a>

<!-- formal-statement-start -->
> **命題（導来圏の加法構造とシフト）**
>
> アーベル圏 $\mathcal A$ の導来圏は加法圏であり、局所化関手は加法的である。任意の整数 $r$ に対する複体のシフトは導来圏の自己同値を誘導する。各次数のコホモロジー関手は導来圏を経由し、次の自然同型を持つ。

$$
H^n(X[r])\cong H^{n+r}(X).
$$
<!-- formal-statement-end -->

核心は二つある。roof の和は分母をそろえてから分子を加えればよい。シフトはコホモロジーの次数を移すだけなので擬同型を保つ。

<!-- proof-start -->
### 証明

同じ始域・終域を持つ二つの roof $(s,a),(t,b)$ を取る。[擬同型の分母調整と消去](../CATB7-03/index.md#lem-catb7-03-fraction-calculus)によって共通の擬同型分母 $su=tv=w$ を取れる。$u,v$ も擬同型であることは[擬同型の2-out-of-3性質](../CATB7-03/index.md#thm-catb7-03-two-of-three)から従う。和を

$$
[(s,a)]+[(t,b)]=[(w,au+bv)]
$$

と置く。共通分母を別に選んだときは、二つの分母をさらに細分する。同じ分母 $w$ を持つ roof $(w,c),(w,e)$ が等しいなら、[roofと共通細分](../CATB7-03/index.md#def-catb7-03-roof)から $wr=wr'\in S$、$cr=er'$ となる擬同型 $r,r'$ がある。さらに[分母の消去性](../CATB7-03/index.md#lem-catb7-03-fraction-calculus)を $wr=wr'$ に適用して、擬同型 $v$ で $rv=r'v$ とできる。すると $crv=er'v=erv$ となり、一つの擬同型 $rv$ で両分子を一致させられる。有限個の等式についてこれを順次行えば、二つの和の分子も一致する。代表元を変更した場合も同じ手順を適用できる。

三つの射について共通分母を取れば、結合律と交換律はホモトピー圏の加法のそれに帰着する。零射は $(1_X,0)$、逆元は $(s,-a)$ である。合成の分配律も確かめる。二つの射を共通分母 $(s,a_1),(s,a_2)$ で表し、後合成する射を $(t,b)$ とする。各 $a_i$ について分母調整を行い、調整の擬同型をさらに共通細分して

$$
a_1u=tv_1,\qquad a_2u=tv_2
$$

を満たす同一の擬同型 $u$ を選ぶ。このとき

$$
(a_1+a_2)u=t(v_1+v_2)
$$

なので、合成の分子は $b(v_1+v_2)=bv_1+bv_2$、分母は $su$ である。前合成については $(w,c)$ を前に置き、一度 $cu=sv$ と調整すれば、二つの合成で分母 $wu$、分子 $a_1v,a_2v$ が共通の選択になる。従って両側で分配律が成り立つ。

$Q$ は分母が恒等射の roof によって加法を保つ。ホモトピー圏の有限双積の包含・射影の恒等式は $Q$ を通して保たれるので、[双積の条件](../CATB1-03/index.md#def-catb1-03-biproduct)を満たす。零複体の恒等射は零射であり、その像も零射だから零対象となる。従って導来圏は加法圏である。

[余鎖複体のシフト](../CATB7-02/index.md#def-catb7-02-shift)は微分を $(-1)^r$ 倍して次数を移す。[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy) $h^j:C^j\to D^{j-1}$ が $a-b$ を与えるとき、シフト後は $h_r^n=(-1)^rh^{n+r}$ と取る。すると

$$
\begin{aligned}
d_{D[r]}^{n-1}h_r^n+h_r^{n+1}d_{C[r]}^n
&=(-1)^{2r}(d_D^{n+r-1}h^{n+r}+h^{n+r+1}d_C^{n+r})\\
&=a^{n+r}-b^{n+r}.
\end{aligned}
$$

よってホモトピー類を変えずにシフトできる。また

$$
H^n(s[r])\cong H^{n+r}(s)
$$

なので $s[r]$ は擬同型である。従って[擬同型を逆にする局所化](../CATB7-03/index.md#thm-catb7-03-localization)をシフトと $Q$ の合成へ適用できる。roof 上での誘導関手は $(s[r],a[r])$ を返す。シフト $[-r]$ を続けて適用すれば元の対象・射に戻るので自己同値である。

各 $H^n$ は擬同型を同型へ送るため、同じ普遍性で導来圏に因子化する。roof の値は $H^n(a)H^n(s)^{-1}$ となる。複体のシフトでのコホモロジー同型は余鎖写像に対して自然であり、擬同型の誘導射の逆とも可換する。ゆえに roof に対しても自然である。
<!-- proof-end -->

例えば先の $P$ では $H^{-1}(P[1])=\mathbb Z/4\mathbb Z$、その他の次数は零である。$Q(s)[1]$ の逆射も存在し、次数を移しても同型は失われない。

## 3. 一つの射から三角形を作る

短完全列だけでは、例えば整数の零写像 $\mathbb Z\to\mathbb Z$ を最初の射にすることはできない。複体の世界では任意の余鎖写像を出発点にできる。[写像錐](../CATB7-02/index.md#def-catb7-02-cone)を用い、余鎖写像 $f:X\to Y$ に対して

$$
E^n=Y^n\oplus X^{n+1},\qquad
d_E^n=\begin{pmatrix}d_Y^n&f^{n+1}\\0&-d_X^{n+1}\end{pmatrix}
$$

とする。$E=\operatorname{Cone}(f)$ であり、行列は次数 $n$ の双積から次数 $n+1$ の双積への微分を表す。右上の $f^{n+1}:X^{n+1}\to Y^{n+1}$ は、元の余鎖写像を錐の微分に組み込む成分である。包含 $i^n(y)=(y,0)$、射影 $p^n(y,x)=x$ とする。これらが定める $i:Y\to E$ と $p:E\to X[1]$ は[写像錐の複体条件と短完全列](../CATB7-02/index.md#prop-catb7-02-cone-complex)で確認した余鎖写像である。この三本の射を基本モデルとする。

ここで三角形の同型とは、三つの頂点の同型が各辺と可換であり、第4頂点では第1頂点の同型をシフトしたものを使うことをいう。

<a id="def-catb7-04-distinguished-triangle"></a>

<!-- formal-statement-start -->
> **定義（完全三角形）**
>
> アーベル圏 $\mathcal A$ の導来圏において、三本の射の列

$$
X\xrightarrow{u}Y\xrightarrow{v}Z\xrightarrow{w}X[1]
$$

> が完全三角形であるとは、ある余鎖写像 $f:A\to B$ に対して、導来圏における標準の錐の三角形

$$
A\xrightarrow{Q(f)}B\xrightarrow{Q(i)}
\operatorname{Cone}(f)\xrightarrow{Q(p)}A[1]
$$

> と三角形として同型になることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb7-04-distinguished-triangle -->
**定義の確認**。$A=B=\mathbb Z[0]$、$f$ を3倍写像とする。錐の非零次数は $-1,0$ である。$E^{-1}=0\oplus\mathbb Z$、$E^0=\mathbb Z\oplus0$ なので、上の微分行列を次数 $-1$ に適用すると

$$
d_E^{-1}(0,x)=(3x,0).
$$

この行列の成分から、非零対象間の微分が3倍だと分かる。隣接する二つの微分の一方は必ず零であるため複体条件も満たす。$E=\operatorname{Cone}(f)$ には $B$ から次数0の恒等射、$A[1]$ への次数 $-1$ の恒等射がある。これらは余鎖写像である。後者の目標複体の次数0が零なので、微分と可換する。前者は次数0の微分が零なので可換する。

従って $A,B,E,A[1]$ の列は標準モデル自身であり、頂点の恒等射が全辺に可換するため完全三角形である。さらに剰余射 $s:E\to(\mathbb Z/3\mathbb Z)[0]$ は、$s^0d_E^{-1}(x)=[3x]_3=0$ より余鎖写像である。$H^{-1}(E)=\ker(3)=0$、$H^0(E)=\mathbb Z/3\mathbb Z$ で、$H^0(s)$ は剰余類の恒等射、他次数の誘導射は零対象の恒等射である。従って[擬同型](../CATB7-03/index.md#def-catb7-03-quasi-isomorphism)である。第三頂点をその商複体に置き換えるなら、最後の辺は

$$
Q(p)Q(s)^{-1}:(\mathbb Z/3\mathbb Z)[0]\longrightarrow A[1]
$$

となる。第三頂点の同型 $Q(s)$ と他の頂点の恒等射で、すべての辺が可換する。
<!-- definition-example-end -->

最後の辺は通常の余鎖写像からは得られない場合がある。商複体から $A[1]$ への余鎖写像は零しかないが、導来圏では roof によって異なる射を作れる。この点を後で演習でも確認する。

<a id="thm-catb7-04-triangle-completion"></a>

<!-- formal-statement-start -->
> **定理（導来圏の射の三角形への拡張）**
>
> 導来圏の任意の射 $u:X\to Y$ は完全三角形の第1射となる。特に $X\xrightarrow{1}X\to0\to X[1]$ は完全三角形である。完全三角形では隣接する二射の合成は零である（第3射と第1射のシフトの合成も含む）。
<!-- formal-statement-end -->

roof の分母を使って、任意の射を余鎖写像から作られた三角形へ移せる。

<!-- proof-start -->
### 証明

$u=Q(a)Q(s)^{-1}$ を roof $(s,a)$ で表す。$s:U\to X$ は擬同型である。標準の錐の三角形から

$$
X\xrightarrow{u}Y\xrightarrow{Q(i)}
\operatorname{Cone}(a)\xrightarrow{Q(s[1])Q(p)}X[1]
$$

を作る。第1頂点の同型は $Q(s)$、第2・第3頂点は恒等射である。第1辺の可換性は $uQ(s)=Q(a)$、第3辺の可換性は最後の射の定義そのものから従う。よって[完全三角形](#def-catb7-04-distinguished-triangle)である。

恒等射の場合、錐の成分を $(y,x)$ と書くと微分は $(d_X y+x,-d_X x)$ となる。次数を1下げる射 $h^n(y,x)=(0,y)$ を取ると

$$
d^{n-1}h^n(y,x)=(y,-d_X y),
$$

$$
h^{n+1}d^n(y,x)=(0,d_X y+x).
$$

和は $(y,x)$ である。[可縮余鎖複体](../CATB7-02/index.md#def-catb7-02-contractible)の条件を満たすので錐は可縮であり、全次数のコホモロジーが零となる。従って零複体への射は擬同型となる。第三頂点を零複体へ置き換えれば所望の三角形になる。

一般の標準モデルで $pi=0$ は成分表示から従う。$if$ はホモトピー $h^n:X^n\to E^{n-1}$ を $h^n(x)=(0,x)$ とすれば

$$
d_E^{n-1}h^n(x)+h^{n+1}d_X^n(x)=(f^n x,0)
$$

なのでホモトピー圏で零である。最後の合成 $f[1]p:E\to Y[1]$ について、次数を1下げる射 $k^n:E^n\to Y[1]^{n-1}$ を $k^n(y,x)=y$ と置くと

$$
d_{Y[1]}^{n-1}k^n(y,x)+k^{n+1}d_E^n(y,x)
=-d_Y^n y+d_Y^n y+f^{n+1}x.
$$

よってこの合成も零である。$Q$ は零射を保ち、三角形の同型は合成を共役によって移すので任意の完全三角形でも成り立つ。
<!-- proof-end -->

## 4. コホモロジーで完全三角形を読む

三角形には加群の短完全列のような単射・全射条件は課していない。代わりに、コホモロジーを取って次数を動かすと、前の射の像が次の射の核に一致する列が現れる。

<a id="thm-catb7-04-triangle-long-exact"></a>

<!-- formal-statement-start -->
> **定理（完全三角形のコホモロジー長完全列）**
>
> アーベル圏 $\mathcal A$ の導来圏の完全三角形 $X\xrightarrow{u}Y\xrightarrow{v}Z\xrightarrow{w}X[1]$ は、次の長完全列を誘導する。

$$
\cdots\to H^n(X)\xrightarrow{H^n(u)}H^n(Y)
\xrightarrow{H^n(v)}H^n(Z)
$$

$$
\xrightarrow{H^n(w)}H^{n+1}(X)
\xrightarrow{H^{n+1}(u)}H^{n+1}(Y)\to\cdots .
$$

> ここで $H^n(X[1])$ はシフトの自然同型を通して $H^{n+1}(X)$ と同一視する。
<!-- formal-statement-end -->

見取り図：錐の短完全列に対する既習の長完全列を使う。重要なのは、その接続射が元の写像の誘導射になることを確認する点である。

<!-- proof-start -->
### 証明

標準モデル $A\xrightarrow{f}B\xrightarrow{i}E\xrightarrow{p}A[1]$ を考える。[写像錐の複体条件と短完全列](../CATB7-02/index.md#prop-catb7-02-cone-complex)から $0\to B\to E\to A[1]\to0$ が次数ごとに短完全である。[余鎖複体のコホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)によって

$$
H^n(B)\xrightarrow{H^n(i)}H^n(E)
\xrightarrow{H^n(p)}H^n(A[1])
\xrightarrow{\delta^n}H^{n+1}(B)
$$

は完全である。

接続射の構成を確認する。一般のアーベル圏では $A^{n+1}$ のサイクル対象を $Z^{n+1}(A)=\ker d_A^{n+1}$ と書き、その包含を $z$ とする。シフトのサイクル対象には同じ $z$ を使える。錐への持ち上げは $(0,z)$ であり、

$$
p^n(0,z)=z,\qquad
d_E^n(0,z)=(f^{n+1}z,0).
$$

右辺の第1成分は $d_B^{n+1}f^{n+1}z=f^{n+2}d_A^{n+1}z=0$ を満たす。よって接続射の構成では $f^{n+1}z$ のコホモロジー類を取る。サイクルからコホモロジーへの余核射はエピ射なので、この持ち上げによって接続射は $H^{n+1}(f)$ に一致する。

従って添字を一つ前へずらした長完全列も合わせると、主張の列を得る。任意の完全三角形は標準モデルと同型である。[導来圏の加法構造とシフト](#prop-catb7-04-additive-shift)によりコホモロジー関手とシフトの自然同型を適用すると全ての辺が可換する。前の射の像が次の射の核に一致することは各頂点の同型で保たれるため、元の三角形についても完全である。
<!-- proof-end -->

例えば3倍写像の三角形では、非零になり得る部分は

$$
0\to H^{-1}(E)\to\mathbb Z\xrightarrow{3}\mathbb Z
\to H^0(E)\to0 .
$$

従って $H^{-1}(E)=0$、$H^0(E)=\mathbb Z/3\mathbb Z$ である。写像錐の微分から直接計算した結果と一致する。

## 5. 三角形を回転する

三角形の始点を次の頂点へ移すとき、最後の辺には負号が現れる。負号は装飾ではなく、二重の錐の微分から強制される。

<a id="thm-catb7-04-triangle-rotation"></a>

<!-- formal-statement-start -->
> **定理（完全三角形の回転）**
>
> 導来圏の完全三角形 $X\xrightarrow{u}Y\xrightarrow{v}Z\xrightarrow{w}X[1]$ に対して

$$
Y\xrightarrow{v}Z\xrightarrow{w}X[1]
\xrightarrow{-u[1]}Y[1]
$$

> も完全三角形である。逆に回転後の三角形が完全なら、元の三角形も完全である。
<!-- formal-statement-end -->

見取り図：標準モデルの包含 $i$ の錐を作り、それを $X[1]$ と比較する。比較射の核は恒等射の錐で可縮である。残った最後の射はホモトピーによって $-f[1]$ になる。

<!-- proof-start -->
### 証明

標準モデル $X\xrightarrow{f}Y\xrightarrow{i}E\xrightarrow{p}X[1]$ から始める。$F=\operatorname{Cone}(i)$ と置く。[写像錐](../CATB7-02/index.md#def-catb7-02-cone)の成分を順に $(y,x,z)$ と書くと

$$
F^n=Y^n\oplus X^{n+1}\oplus Y^{n+1},
$$

$$
d_F^n(y,x,z)=(d_Yy+fx+z,-d_Xx,-d_Yz).
$$

添字は入力成分の次数に従う。$r:F\to X[1]$ を $r(y,x,z)=x$ と置けば、微分との可換性は第2成分の $-d_Xx$ から従う。各次数で $r$ は第2成分への射影である。$r^n$ と合成して零となる射の第2成分は零なので、核の普遍性により $(y,0,z)$ を与える第1・第3成分の包含が核となる。その微分は $(d_Yy+z,-d_Yz)$。これは $\operatorname{Cone}(1_Y)$ である。[三角形への拡張の証明](#thm-catb7-04-triangle-completion)で与えた縮約を適用できる。$r$ は各次数で分裂全射なので、

$$
0\to \operatorname{Cone}(1_Y)\to F\to X[1]\to0
$$

は短完全な複体の列である。[余鎖複体のコホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)の両端が零なので $H^n(r)$ は全次数で同型、従って $Q(r)$ は同型である。

標準の錐の三角形 $Y\xrightarrow{i}E\xrightarrow{j}F\xrightarrow{q}Y[1]$ で $j(y,x)=(y,x,0)$、$q(y,x,z)=z$ である。$rj=p$ は直接成り立つ。

最後の辺を比較するため、次数を1下げる射 $h^n:F^n\to Y[1]^{n-1}$ を $h^n(y,x,z)=y$ とする。計算すると

$$
d_{Y[1]}^{n-1}h^n(y,x,z)=-d_Yy,
$$

$$
h^{n+1}d_F^n(y,x,z)=d_Yy+fx+z.
$$

和は $fx+z$、つまり $q+f[1]r$ である。[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)によって

$$
[q]=[-f[1]r]
$$

がホモトピー圏で成り立つ。$Q(r)$ を第三頂点の同型として、標準の錐の三角形を回転後の三角形へ移せる。一般の完全三角形についても、最初の三角形の同型を回転し、最後の可換関係をシフトして負号を付ければ得られる。

逆方向も錐から確かめられる。元の標準モデルの逆回転は

$$
E[-1]\xrightarrow{-p[-1]}X\xrightarrow{f}Y\xrightarrow{i}E
$$

である。$G=\operatorname{Cone}(-p[-1])$ の成分は順に $(a,b,x)\in X^n\oplus Y^n\oplus X^{n+1}$（加群での表記）となる。シフトの微分の負号と錐の微分を合わせると

$$
d_G(a,b,x)=(d_Xa-x,d_Yb+fx,-d_Xx).
$$

$r:G\to Y$ を $r(a,b,x)=fa+b$ とする。微分との可換性は

$$
r d_G(a,b,x)=f d_Xa-fx+d_Yb+fx
=d_Y(fa+b)
$$

から従う。各次数で $r$ は分裂エピ射であり、核は $(a,-fa,x)$ で表される。その微分を $(a,x)$ で書くと $(d_Xa-x,-d_Xx)$、すなわち $\operatorname{Cone}(-1_X)$ の微分である。核の複体から $\operatorname{Cone}(1_X)$ への射を $T^n(a,x)=(a,-x)$ とする。$T$ は自分と同じ成分式の逆射を持つ。さらに

$$
T^{n+1}(d_Xa-x,-d_Xx)=(d_Xa-x,d_Xx)
=d_{\operatorname{Cone}(1_X)}^n(a,-x).
$$

従って余鎖複体の同型であり、核は[恒等射の錐の縮約](#thm-catb7-04-triangle-completion)によって可縮である。$r^n$ の分裂全射性と核の記述から短完全列 $0\to\ker r\to G\to Y\to0$ を得る。[余鎖複体のコホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)では $H^n(r)$ の両側が零となるので $r$ は擬同型である。

$G$ への標準包含 $j:X\to G$ は $j(a)=(a,0,0)$ だから $rj=f$。標準射影 $q:G\to E$ は $q(a,b,x)=(b,x)$ である。$ir(a,b,x)=(fa+b,0)$ との差を計算する。次数を1下げる射 $h^n(a,b,x)=(0,-a)$ を取れば

$$
d_Eh(a,b,x)=(-fa,d_Xa),
$$

$$
hd_G(a,b,x)=(0,-d_Xa+x).
$$

和は $(-fa,x)=q(a,b,x)-ir(a,b,x)$ となる。従って $q$ と $ir$ はホモトピーで一致する。$Q(r)$ を第三頂点の同型として逆回転も標準の錐の三角形と同型になる。一般の完全三角形へは三角形の同型を使って移せる。前向き回転と逆回転は互いに逆の操作なので、回転後の三角形が完全なら元の三角形も完全である。

<!-- proof-end -->

### 5.1 三角圏という枠組み

ここまでの構造は、加法圏・シフト自己同値・完全三角形を組にして扱う一般理論へつながる。その一般理論を三角圏といい、通常は次の公理群を要求する。以下の一覧は全体像であり、本講で証明する範囲を右欄に示す。

| 公理群 | 要求される性質 | 本講の扱い |
| --- | --- | --- |
| TR1 | 三角形の同型による閉性、恒等射の三角形、任意の射の三角形への拡張 | 定義および第3節で確認 |
| TR2 | 負号付きの回転とその逆が完全三角形を保つ | 第5節で両方向を証明 |
| TR3 | 最初の二頂点の可換四角形を三角形の射へ拡張できる | 下の余鎖写像のモデルで仕組みを確認 |
| TR4 | 合成する二射とその合成の三つの錐が互いに完全三角形をなすよう、整合する図式（八面体）を選べる | 一般の公理の証明は本講の範囲外 |

三角形の射とは、三頂点の射が各辺と可換し、第4頂点では第1頂点の射をシフトしたものを使う図式である。本講では三角圏の一般公理を仮定せず、局所化と錐から直接証明した性質を用いる。導来圏上の任意の四角形に対するTR3・八面体公理は、三角圏構造の一般定理の一部であり、その完全な証明はここでは用いない。

<a id="prop-catb7-04-cone-square"></a>

<!-- formal-statement-start -->
> **命題（ホモトピー可換な四角形の錐の射）**
>
> アーベル圏の余鎖写像 $f:X\to Y$ と $g:X'\to Y'$、および余鎖写像 $a:X\to X'$、$b:Y\to Y'$ に対して、次数を1下げる射の族 $h^n:X^n\to Y'^{n-1}$ が

$$
bf-ga=d_{Y'}h+hd_X
$$

> を全次数で満たすなら、二つの標準の錐の三角形を結ぶ射として、第三頂点に余鎖写像

$$
c^n(y,x)=(b^ny+h^{n+1}x,a^{n+1}x)
$$

> を取れる。四角形はホモトピー圏および導来圏で可換する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

錐の微分を代入して二通りの合成を比較する。第2成分は $-d_{X'}a x=-a d_Xx$ で一致する。第1成分はそれぞれ

$$
d_{Y'}b y+d_{Y'}h x+ga x,
$$

$$
b d_Yy+bf x-h d_Xx .
$$

$b$ が余鎖写像なので $d_{Y'}b=b d_Y$。仮定を変形すると

$$
d_{Y'}h x+ga x=bf x-hd_Xx.
$$

従って第1成分も一致し、$c$ は余鎖写像である。包含に対して $ci(y)=(by,0)=i'b(y)$、射影に対して $p'c(y,x)=a[1]p(y,x)$ が成り立つ。第1辺の四角形は仮定のホモトピーによってホモトピー圏で可換する。局所化関手はこれらの可換関係を保つ。
<!-- proof-end -->

この計算では、コホモロジー上の射の一致だけを仮定しているのではない。指定された二辺 $a,b$ を保つ錐の射をこの式で構成するため、四角形のずれ $bf-ga$ を与えられた余鎖ホモトピー $h$ で補正している。

## 6. 短完全列を三角形へ変える

次数ごとに短完全な複体の列が与えられている場合、商の複体をわざわざ錐で置き換えなくてもよい。錐と商を比較することで、第4の射を導来圏の射として作れる。

<a id="thm-catb7-04-short-exact-triangle"></a>

<!-- formal-statement-start -->
> **定理（短完全な複体の列からの完全三角形）**
>
> アーベル圏 $\mathcal A$ の余鎖複体の列

$$
0\to A\xrightarrow{f}B\xrightarrow{g}C\to0
$$

> が各次数で短完全なら、$t:\operatorname{Cone}(f)\to C$ を $t^n(b,a)=g^nb$ と定めた射は擬同型である。従って

$$
A\xrightarrow{Q(f)}B\xrightarrow{Q(g)}C
\xrightarrow{Q(p)Q(t)^{-1}}A[1]
$$

> は完全三角形となる。ここで $p$ は錐からの標準射影である。
<!-- formal-statement-end -->

見取り図：錐を商へ送る射の核には、$A$ の成分が二つ残る。それは恒等射の錐である。

<!-- proof-start -->
### 証明

$gf=0$ と $g$ の余鎖写像条件によって

$$
t^{n+1}d_{\operatorname{Cone}(f)}^n(b,a)
=g^{n+1}(d_B^nb+f^{n+1}a)=d_C^ng^nb .
$$

よって $t$ は余鎖写像である。各次数で $g^n$ はエピ射、第一成分の射影も分裂エピ射なので $t^n$ はエピ射である。

$g^n$ の核は $f^n$ だから、$t^n$ の核は双積 $A^n\oplus A^{n+1}$ からの射

$$
k^n(x,a)=(f^nx,a)
$$

で与えられる。実際、$t^n$ と合成して零になる射の第1成分は核の普遍性で一意に $f^n$ を経由し、第2成分はそのままである。微分を比較すると

$$
d_{\operatorname{Cone}(f)}^nk^n(x,a)
=(f^{n+1}(d_A^nx+a),-d_A^{n+1}a).
$$

右辺は $k^{n+1}$ と $\operatorname{Cone}(1_A)$ の微分との合成である。従って次の複体の列は各次数で短完全になる。

$$
0\to\operatorname{Cone}(1_A)\xrightarrow{k}
\operatorname{Cone}(f)\xrightarrow{t}C\to0 .
$$

[恒等射の錐の縮約](#thm-catb7-04-triangle-completion)により左端は全次数でコホモロジーが零である。[余鎖複体のコホモロジー長完全列](../CATB7-02/index.md#thm-catb7-02-long-exact)において $H^n(t)$ の両側が零となるため、$H^n(t)$ はモノ射かつエピ射、[アーベル圏のモノかつエピな射は同型](../CATB1-04/index.md#prop-catb1-04-balanced)であるため同型となる。

従って $Q(t)$ は同型である。$ti=g$ および $Q(p)Q(t)^{-1}Q(t)=Q(p)$ によって、標準の錐の三角形の第三頂点を $C$ へ移せる。
<!-- proof-end -->

例えば整数 $m\ne0$ に対し $0\to\mathbb Z\xrightarrow{m}\mathbb Z\to\mathbb Z/m\mathbb Z\to0$ を次数0に置けば、商複体から $\mathbb Z[1]$ への射を含む完全三角形になる。次講ではこのような複体の置換を用いて導来関手を計算する。

## 7. 演習

### CATB7-04-A01 導来圏での逆射

- Level: A

次数 $-1,0$ に $\mathbb Z\xrightarrow{6}\mathbb Z$ を置いた $P$ と $M=(\mathbb Z/6\mathbb Z)[0]$ を考える。剰余射 $s:P\to M$ が導来圏で同型となる理由と、逆射の roof を答えよ。

<!-- solution-start -->
次数0で $s^0d_P^{-1}(x)=[6x]_6=0$ となるので余鎖写像である。6倍写像は単射、像は $6\mathbb Z$ だから $H^{-1}(P)=0$、$H^0(P)=\mathbb Z/6\mathbb Z$。$H^0(s)$ は剰余類の恒等射、他次数の誘導射も零対象の恒等射である。

よって $s$ は擬同型であり、[導来圏](#def-catb7-04-derived-category)の射 $Q(s)$ の逆射は $M\xleftarrow{s}P\xrightarrow{1_P}P$ である。合成 roof は一方が $(1_P,1_P)$、他方が $(s,s)$ となる。後者は $s$ による共通細分で $(1_M,1_M)$ と等しい。
<!-- solution-end -->

### CATB7-04-A02 シフトとコホモロジー

- Level: A

次数0,1に $\mathbb Z\xrightarrow{5}\mathbb Z$ を置いた複体 $C$ に対して $C[2]$ の非零成分、微分、コホモロジーを求めよ。

<!-- solution-start -->
[余鎖複体のシフト](../CATB7-02/index.md#def-catb7-02-shift)に $r=2$ を代入すると $C[2]^n=C^{n+2}$。従って非零成分は次数 $-2,-1$ にあり、微分は $(-1)^2 5=5$ 倍である。核は零、像は $5\mathbb Z$ だから

$$
H^{-2}(C[2])=0,\qquad H^{-1}(C[2])=\mathbb Z/5\mathbb Z.
$$

他の次数は零。これは $H^{-1}(C[2])=H^1(C)$ という[シフトのコホモロジーの関係](#prop-catb7-04-additive-shift)と一致する。
<!-- solution-end -->

### CATB7-04-A03 零写像の錐

- Level: A

$X=Y=\mathbb Z[0]$ とし $f=0:X\to Y$ の標準の錐の三角形を作り、錐のコホモロジーを求めよ。

<!-- solution-start -->
[写像錐](../CATB7-02/index.md#def-catb7-02-cone)の定義に $f=0$ を代入すると、交差成分も零なので $E=Y\oplus X[1]$。非零成分は次数 $-1,0$ の $\mathbb Z$ で、その間の微分は零である。

よって両次数のコホモロジーは $\mathbb Z$、他は零。三角形の第1射は零、第2射は $Y$ 成分への包含、第3射は $X[1]$ 成分への射影である。[完全三角形のコホモロジー長完全列](#thm-catb7-04-triangle-long-exact)の該当部分は

$$
0\to\mathbb Z\xrightarrow{1}\mathbb Z
\xrightarrow{0}\mathbb Z\xrightarrow{1}\mathbb Z\to0
$$

となる。左側の二つの非零対象は $H^{-1}(E),H^0(X)$、右側は $H^0(Y),H^0(E)$ であり、各像と次の核が一致する。
<!-- solution-end -->

### CATB7-04-A04 回転の符号

- Level: A

完全三角形 $X\xrightarrow{u}Y\xrightarrow{v}Z\xrightarrow{w}X[1]$ を2回前向きに回転せよ。

<!-- solution-start -->
[完全三角形の回転](#thm-catb7-04-triangle-rotation)を一度適用すると

$$
Y\xrightarrow{v}Z\xrightarrow{w}X[1]\xrightarrow{-u[1]}Y[1].
$$

今度の第1射は $v$ なので、さらに回転すると

$$
Z\xrightarrow{w}X[1]\xrightarrow{-u[1]}Y[1]
\xrightarrow{-v[1]}Z[1].
$$

第2回の負号は元の $v$ に付く。$-u[1]$ の負号はそのまま残る。
<!-- solution-end -->

### CATB7-04-B01 分母を持つ射の加法

- Level: B

A01の $P,M,s$ を用いる。導来圏の $M\to M$ の二射を roof $(s,2s)$ と $(s,5s)$ で表す。和を roof で求め、その和が恒等射に一致することを示せ。

<!-- solution-start -->
両者の分母が $s$ で一致するので、[導来圏の加法構造とシフト](#prop-catb7-04-additive-shift)の和の式を $u=v=1_P$ として適用する。結果は $(s,2s+5s)=(s,7s)$ である。

次数0で $7s^0(x)=[7x]_6=[x]_6$ だから $7s=s$ は余鎖写像として成立する。従って和は $(s,s)$ となる。この roof と $(1_M,1_M)$ は $P$ を共通細分とし、比較射 $1_P,s$ を使えば分母・分子とも $s$ で一致する。よって恒等射に等しい。
<!-- solution-end -->

### CATB7-04-B02 長完全列から核と余核を復元する

- Level: B

次数0の加群の写像 $f:\mathbb Z^2\to\mathbb Z$ を $f(a,b)=4a+6b$ とする。標準の錐の三角形から $H^{-1}(E),H^0(E)$ を求めよ。錐の微分からも確かめよ。

<!-- solution-start -->
[完全三角形のコホモロジー長完全列](#thm-catb7-04-triangle-long-exact)を次数 $-1,0$ で読む。$X,Y$ のそれ以外のコホモロジーは零であるから

$$
0\to H^{-1}(E)\to\mathbb Z^2
\xrightarrow{f}\mathbb Z\to H^0(E)\to0 .
$$

核の条件は $2a=-3b$。2と3は互いに素なので $b$ は偶数であり、$b=-2k$ と置くと $a=3k$。従って核は $(3k,-2k)$ 全体で $\mathbb Z$ と同型である。

像の値は常に偶数であり、$f(-1,1)=2$ なので全ての偶数が像に入る。従って

$$
H^{-1}(E)\cong\mathbb Z,\qquad H^0(E)\cong\mathbb Z/2\mathbb Z.
$$

[写像錐](../CATB7-02/index.md#def-catb7-02-cone)に戻ると、次数 $-1$ の対象は $\mathbb Z^2$、次数0は $\mathbb Z$、その微分は $f$ そのものである。従って次数 $-1$ は核、次数0は余核となり、長完全列での計算と一致する。
<!-- solution-end -->

### CATB7-04-B03 二重の錐を具体的に回転する

- Level: B

$X=Y=\mathbb Z[0]$、$f=2$ とする。$E=\operatorname{Cone}(f)$、$F=\operatorname{Cone}(i:Y\to E)$ とし、$F$ の非零次数の微分と比較射 $r:F\to X[1]$ を計算せよ。さらに $q:F\to Y[1]$ と $-f[1]r$ がホモトピーで一致することを確かめよ。

<!-- solution-start -->
$F^{-1}$ には $X^0,Y^0$ が残るので $\mathbb Z^2$、$F^0=Y^0=\mathbb Z$ である。[完全三角形の回転の証明](#thm-catb7-04-triangle-rotation)の微分に $d_X=d_Y=0$、$f=2$ を代入すると

$$
d_F^{-1}(x,z)=2x+z.
$$

$r^{-1}(x,z)=x$、$r^0=0$ である。次数 $-1$ のサイクルは $(x,-2x)$ だから $H^{-1}(r)$ は同型。微分は $(0,z)$ によって任意の整数を像に持つため $H^0(F)=0$。他の次数も零なので $r$ は擬同型。

$q^{-1}(x,z)=z$ と $(-f[1]r)^{-1}(x,z)=-2x$ の差は $z+2x$ である。次数0から $Y[1]^{-1}$ への恒等射を $h^0$ として他を零にすると、次数 $-1$ で $h^0d_F^{-1}(x,z)=2x+z$、次数0では目標の微分が零だから差は零となる。よって $q-(-f[1]r)=dh+hd$ が全次数で成立する。
<!-- solution-end -->

### CATB7-04-B04 四角形のずれを補正する

- Level: B

$X=X'=\mathbb Z[0]$、$Y=Y'$ を次数 $-1,0$ の $\mathbb Z\xrightarrow{3}\mathbb Z$ とする。$f:X\to Y$ は次数0で3倍、$g:X'\to Y'$ は零とし、$a=b=1$ とする。四角形は余鎖写像として可換しないがホモトピー可換であることを確認し、錐の比較射を具体化せよ。

<!-- solution-start -->
[余鎖ホモトピー](../CATB7-02/index.md#def-catb7-02-cochain-homotopy)を作るため、次数0から次数 $-1$ への恒等射を $h^0$ とし、他の成分を零とすると $d_Y^{-1}h^0=3$。$X$ の微分は零なので $bf-ga=3=d_Yh+hd_X$ となる。

両方の錐は次数 $-1$ に二つの整数成分、次数0に一つの整数成分を持つ。$f$ の錐の微分は $(y,x)\mapsto 3y+3x$、$g$ の錐の微分は $(y,x)\mapsto 3y$ である。

[ホモトピー可換な四角形の錐の射](#prop-catb7-04-cone-square)に代入すると

$$
c^{-1}(y,x)=(y+x,x),\qquad c^0=1 .
$$

微分を合成すると $d_{\operatorname{Cone}(g)}c^{-1}(y,x)=3(y+x)=c^0d_{\operatorname{Cone}(f)}(y,x)$。包含された $Y$ 成分 $(y,0)$ は $(y,0)$ のまま、射影される $X[1]$ 成分も $x$ のままなので後ろ二辺は可換する。第1辺は先に作ったホモトピーによってホモトピー圏で可換する。
<!-- solution-end -->

### CATB7-04-C01 短完全列から得られる非零射

- Level: C

$m\ge2$ を整数とする。次数0に置いた整数加群の短完全列 $0\to\mathbb Z\xrightarrow{m}\mathbb Z\to\mathbb Z/m\mathbb Z\to0$ から得られる完全三角形の第3射 $\delta:M\to\mathbb Z[1]$（$M=(\mathbb Z/m\mathbb Z)[0]$）を roof で記述し、導来圏で非零であることを示せ。

ヒント：零 roof と等しいなら分母をさらに擬同型で細分できる。その細分の次数0のサイクルを使い、ホモトピーの式を検査せよ。

<!-- solution-start -->
[短完全な複体の列からの完全三角形](#thm-catb7-04-short-exact-triangle)を適用する。$P$ は次数 $-1,0$ の $\mathbb Z\xrightarrow{m}\mathbb Z$ で、$s:P\to M$ は次数0の剰余射。$p:P\to\mathbb Z[1]$ は次数 $-1$ の恒等射である。従って $\delta$ は $(s,p)$ である。

まず $p$ はホモトピー圏で零ではない。零へのホモトピーがあるなら次数0から $\mathbb Z[1]^{-1}$ への射はある整数 $k$ 倍である。次数 $-1$ の式から $1=km$ が必要となるが、$m\ge2$ なので不可能である。

しかし、これだけでは局所化後にも非零とは言えない。そこで $\delta=0$ と仮定し、[roofと共通細分](../CATB7-03/index.md#def-catb7-03-roof)によって擬同型 $r:W\to P$ で $pr$ が零とホモトピーになるものを取る。$r$ が擬同型であることは、細分の分母 $sr$ と $s$ が擬同型であることに[擬同型の2-out-of-3性質](../CATB7-03/index.md#thm-catb7-03-two-of-three)を適用して確認できる。

$H^0(r)$ は全射なので、$W^0$ のサイクル $w$ で $r^0(w)\equiv 1\pmod m$ となるものがある。$mw$ のコホモロジー類は零である（$H^0(r)$ は単射で、$m[r^0(w)]_m=0$）。従ってある $v\in W^{-1}$ に対して $d_W^{-1}v=mw$ となる。

余鎖写像 $r$ の条件より

$$
m r^{-1}(v)=r^0(d_W^{-1}v)=m r^0(w).
$$

整数加群で $m\ne0$ なので $r^{-1}(v)=r^0(w)$ である。一方、$pr=dh+hd$ と書けるなら、目標 $\mathbb Z[1]$ の微分は零だから

$$
r^{-1}(v)=h^0(d_W^{-1}v)=m h^0(w).
$$

従って $r^0(w)$ は $m$ の倍数になり、$r^0(w)\equiv1\pmod m$ と矛盾する。ゆえに $\delta\ne0$ である。

$M$ から $\mathbb Z[1]$ への余鎖写像は次数が重ならないため零しかない。この非零射は局所化が新しい射を与えることの具体例であり、短完全列の拡大の情報を記録する。
<!-- solution-end -->

## 8. まとめ

導来圏は複体を対象として保ち、擬同型に逆射を与える。任意の射は錐による完全三角形に拡張でき、そのコホモロジーは長完全列になる。回転に現れる負号は二重の錐のホモトピー計算から生じる。短完全な複体の列も完全三角形を与え、その最後の射は通常の余鎖写像では表現できない場合がある。

次講では、射影対象・入射対象を用いた分解から導来関手を構成し、複体を置き換えても計算が矛盾しないことを確かめる。
