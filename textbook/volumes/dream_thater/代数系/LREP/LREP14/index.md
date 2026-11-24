# LREP14 Clifford代数の構成

<!-- definition-example-audit: strict -->

前講の[四元ベクトルの行列収縮](../LREP13/index.md#prop-lrep13-vector-pairing)は二本のベクトルからMinkowski内積を取り出しました。今回は一歩進み、ベクトル同士の積そのものに計量を組み込みます。二乗が時空の長さを返す線形な行列を作れれば、二次式を一次の行列式へ分解する道が開けます。

$V=\mathbb R^4$、標準基底を $e_0,e_1,e_2,e_3$ とし、対称双線形形式 $\eta$ の行列を $\operatorname{diag}(-1,1,1,1)$ とします。対称双線形とは各引数で線形、かつ引数を交換しても値が同じという意味です。従って $q(v)=\eta(v,v)=-(v^0)^2+\sum_{j=1}^3(v^j)^2$ です。

## 1. ベクトルの積を自由に作る

ベクトル空間には元同士の積がまだありません。実ベクトル空間に結合的な双線形積と単位元 $1$ を備えたものを単位的結合代数といいます。例えば実正方行列は行列積でこの条件を満たします。代数準同型は線形で積と単位元を保つ写像とします。

[LREP4のテンソル積](../LREP4/index.md)を繰り返して、ベクトルを並べた語を作ります。次数 $k$ の空間 $V^{\otimes k}$ は $k$ 個の因子のテンソル積で、基底ベクトルを並べた語を基底に持ちます。次数0は実数です。有限個の次数にだけ非零成分を持つ直和を取れば、任意の有限長の積を収められます。

<a id="def-lrep14-tensor-algebra"></a>

<!-- formal-statement-start -->
> **定義（テンソル代数）**  
> 実ベクトル空間 $V$ に対し、次数0を $\mathbb R$ とする直和

$$
T(V)=\bigoplus_{k\ge0}V^{\otimes k}
$$

> に、純テンソルを連結する積を入れ、双線形に延長する。次数0の $1$ を単位元とするこの代数をテンソル代数と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep14-tensor-algebra -->
**定義の確認。** $V=\mathbb R e_0\oplus\mathbb R e_1$ のとき、$e_0e_1$ と $e_1e_0$ は次数2の異なる基底語です。$(e_0+e_1)e_0=e_0e_0+e_1e_0$ は線形性による展開です。三つの基底語の積は、括弧の位置を変えても同じ三文字の語になるため結合的です。双線形性により一般の有限和にも結合律が成立し、空の語 $1$ を連結しても語は変わりません。
<!-- definition-example-end -->

## 2. 計量を積に組み込む

自由な語の空間では $vv$ と $q(v)1$ は別の元です。これらを等しいとみなすため、差を零にします。積を保つ商を作るには、その差だけでなく、左右から任意の語を掛けた差も零にする必要があります。

代数の部分空間 $J$ が任意の元 $a$ と $j\in J$ に対して $aj,ja\in J$ を満たすとき、両側イデアルといいます。商空間では $a-a'\in J$ なら $[a]=[a']$ とみなします。積は $[a][b]=[ab]$ です。実際、

$$
ab-a'b'=(a-a')b+a'(b-b')\in J
$$

なので代表元の選び方に依存しません。

<a id="def-lrep14-clifford"></a>

<!-- formal-statement-start -->
> **定義（Clifford代数）**  
> 実ベクトル空間 $V$ と対称双線形形式 $g$ に対し、$q(v)=g(v,v)$ とする。テンソル代数 $T(V)$ の両側イデアル $J$ を、すべての $v\in V$ に対する $v\otimes v-q(v)1$ の左右に任意の元を掛けたものの有限線形結合全体とする。商代数

$$
\mathrm{Cl}(V,g)=T(V)/J
$$

> をClifford代数と呼ぶ。自然な線形写像 $j:V\to\mathrm{Cl}(V,g)$ は $j(v)=[v]$ であり、$j(v)^2=q(v)1$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep14-clifford -->
**定義の確認。** 一次元の時間方向 $V=\mathbb R e_0$、$g(e_0,e_0)=-1$ では $T(V)$ の元は一文字 $e_0$ の実係数多項式です。$v=te_0$ に対する生成関係は $t^2(e_0^2+1)$ なので、イデアルは $e_0^2+1$ の多項式倍全体です。左右から掛けても同じ形を保ちます。商では $e_0^2=-1$、$e_0^3=-e_0$ となります。多項式を $e_0^2+1$ で割った余りは一意に $a+be_0$ となり、非零の一次以下の多項式はこのイデアルに入りません。従って $1,e_0$ は独立で、商の実次元は2です。積は

$$
(a+be_0)(c+de_0)=ac-bd+(ad+bc)e_0.
$$

これは実代数として複素数の積と一致します。任意の $te_0$ の二乗も $-t^2$ なので定義条件を満たします。
<!-- definition-example-end -->

四次元の場合も以下では $j(v)$ を単に $v$ と書きます。二乗条件だけから、異なるベクトルの積を交換する規則まで決まります。

<a id="prop-lrep14-anticommutator"></a>

<!-- formal-statement-start -->
> **命題（Clifford反交換関係）**  
> 実対称双線形形式 $g$ を持つ $V$ のClifford代数では、任意の $v,w\in V$ に対し

$$
vw+wv=2g(v,w)1.
$$

> 逆に単位的実結合代数への線形写像がこの反交換関係を満たすなら、その像は二乗条件を満たす。
<!-- formal-statement-end -->

**証明の見取り図。** 二乗した和から個々の二乗を引けば交差項が残ります。

<!-- proof-start -->
### 証明

商の積の双線形性から

$$
(v+w)^2=v^2+vw+wv+w^2.
$$

一方、[Clifford代数の定義](#def-lrep14-clifford)と $g$ の対称性より

$$
(v+w)^2=(g(v,v)+2g(v,w)+g(w,w))1.
$$

二乗条件 $v^2=g(v,v)1$ と $w^2=g(w,w)1$ を差し引くと所定の関係を得ます。逆は $w=v$ を代入し、実数2で割れば成立します。$\square$
<!-- proof-end -->

Minkowski基底では $e_0^2=-1$、$e_j^2=1$（$j=1,2,3$）、異なる添字について $e_\mu e_\nu=-e_\nu e_\mu$ です。例えば $(e_0+e_1)^2=-1+1=0$ となります。二乗が零だからベクトル自身も零だとは限りません。実際、第4節の行列模型でこの元が非零であることを確かめます。

## 3. なぜ商を取るのか――普遍性

別の代数で計量を満たす積を見つけたとき、自由な語をその代数の積へ写せるはずです。商を取っておけば、Clifford関係で同一視した語は同じ像に移ります。この性質は、特定の行列表示を先に選ばず代数を構成する意味を与えます。

<a id="thm-lrep14-universal"></a>

<!-- formal-statement-start -->
> **定理（Clifford代数の普遍性）**  
> 実対称双線形形式 $g$ を持つ $V$、単位的実結合代数 $A$、実線形写像 $f:V\to A$ があり、すべての $v$ に対して $f(v)^2=g(v,v)1_A$ とする。このとき

$$
F:\mathrm{Cl}(V,g)\to A,\qquad F(j(v))=f(v)
$$

> を満たす単位的代数準同型 $F$ がただ一つ存在する。
<!-- formal-statement-end -->

**証明の見取り図。** 語を像の積に置き換え、関係式から生じる差がすべて零に写ることを確かめます。

<!-- proof-start -->
### 証明

まず $T(V)$ 上で次数0の $a$ を $a1_A$ へ、純テンソルを

$$
v_1\otimes\cdots\otimes v_k
\longmapsto f(v_1)\cdots f(v_k)
$$

へ写します。右辺は各因子で線形です。従ってテンソル積の多重線形写像を線形化する性質によって各次数に線形写像が定まります。直和の元は有限和なので、全次数について足し合わせて線形写像 $\widetilde F:T(V)\to A$ を得ます。連結した語の像は各語の像の積に等しく、双線形性から任意の元の積も保存します。単位元の像は $1_A$ です。

仮定より $\widetilde F(v\otimes v-q(v)1)=f(v)^2-q(v)1_A=0$。従って任意の $a,b\in T(V)$ に対し

$$
\widetilde F(a(v\otimes v-q(v)1)b)
=\widetilde F(a)0\widetilde F(b)=0.
$$

有限和にもこの性質が成り立つので $J\subset\ker\widetilde F$ です。よって $F([t])=\widetilde F(t)$ と置くと、代表元が異なっても差が零に写ります。積・単位元も保存されます。

最後に商の任意の元は $j(v)$ の有限積とその線形結合で書けます。従って $j(v)$ 上で値が指定されれば全ての語の像が決まり、二つの準同型は一致します。$\square$
<!-- proof-end -->

例えば時間方向だけの模型で $f(te_0)=t\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とすると、行列の二乗は $-t^2I_2$ です。上の定理は $a+be_0$ を $aI_2+b f(e_0)$ に移す準同型を与えます。この例では二つの行列が実線形独立なので単射でもあります。普遍性そのものは、一般の $f$ について単射や全射まで保証するわけではありません。

## 4. 四次元の行列模型と16次元性

まず語を並べ替え、必要な基底候補の個数を数えます。その後、行列を使って候補が独立であることを示します。実係数の代数に複素係数を許す操作を複素化といいます。具体的には実ベクトル空間とのテンソル積で $\mathrm{Cl}_{\mathbb C}=\mathrm{Cl}(V,\eta)\otimes_{\mathbb R}\mathbb C$ とし、積を $(a\otimes z)(b\otimes w)=ab\otimes zw$ で延長します。

<a id="prop-lrep14-spanning"></a>

<!-- formal-statement-start -->
> **命題（順序付きClifford単項式による生成）**  
> $V=\mathbb R^4$、$\eta=\operatorname{diag}(-1,1,1,1)$ とする。$\mathrm{Cl}(V,\eta)$ は空積 $1$ および

$$
e_{i_1}\cdots e_{i_k},
\qquad 0\le i_1<\cdots<i_k\le3
$$

> の16個の元で実線形に張られる。複素化も同じ元で複素線形に張られる。
<!-- formal-statement-end -->

**証明の見取り図。** 交換で添字を整列させ、同じ添字が隣り合えば二乗を数に置き換えます。

<!-- proof-start -->
### 証明

[Clifford反交換関係](#prop-lrep14-anticommutator)より異なる隣接添字を交換するたびに $-1$ を掛けます。逆順の添字対の個数が一つずつ減るため有限回で昇順（同じ添字は隣接）にできます。同じ添字の二乗は $-1$ または $1$ なので取り除きます。残る語には各添字が高々一回現れます。

例えば

$$
e_2e_0e_2e_1=-e_0e_2^2e_1=-e_0e_1.
$$

元は基底語の有限線形結合なので、空積も含め各添字を使うか使わないかの $2^4=16$ 通りで張られます。複素化では実係数を複素係数へ拡張しても同じ生成集合が使えます。$\square$
<!-- proof-end -->

次数ごとの候補数は $1,4,6,4,1$ です。ただし「張る」だけでは次元が16とはまだ言えません。関係によって候補同士がさらに従属する可能性を排除する必要があります。

[LREP5のPauli行列](../LREP5/index.md#def-lrep5-pauli-model)を使います。$I=I_2$ とし、四次行列を二次ブロックで書きます。

<a id="thm-lrep14-matrix-model"></a>

<!-- formal-statement-start -->
> **定理（四次元複素Clifford代数の行列模型）**  
> $V=\mathbb R^4$、$\eta=\operatorname{diag}(-1,1,1,1)$ とし、$\sigma_j$ をPauli行列とする。四次複素行列

$$
G_0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad
G_j=\begin{pmatrix}0&\sigma_j\\\sigma_j&0\end{pmatrix}
\quad(j=1,2,3)
$$

> は $G_\mu G_\nu+G_\nu G_\mu=2\eta_{\mu\nu}I_4$ を満たす。対応 $e_\mu\mapsto G_\mu$ は複素代数の同型

$$
\mathrm{Cl}_{\mathbb C}\cong M_4(\mathbb C)
$$

> を与える。従って複素化の複素次元と実Clifford代数の実次元はともに16である。
<!-- formal-statement-end -->

**証明の見取り図。** まず行列の反交換関係を確認し、普遍性で準同型を作ります。さらに異なる順序付き行列積の間で跡を取ると交差項が消えることを使い、16個の独立性を示します。

<!-- proof-start -->
### 証明

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)を標準基底に適用すると $\sigma_j^2=I$、$j\ne k$ なら $\sigma_j\sigma_k+\sigma_k\sigma_j=0$ です。ブロック積は

$$
G_0^2=-I_4,\qquad
G_jG_k=\begin{pmatrix}\sigma_j\sigma_k&0\\0&\sigma_j\sigma_k\end{pmatrix},
$$

$$
G_0G_j=\begin{pmatrix}\sigma_j&0\\0&-\sigma_j\end{pmatrix},
\quad
G_jG_0=\begin{pmatrix}-\sigma_j&0\\0&\sigma_j\end{pmatrix}.
$$

従って時間・空間、異なる空間同士、同じ添字の全てについて反交換関係が成立します。$G(v)=\sum_{\mu=0}^3v^\mu G_\mu$ とすると

$$
\begin{aligned}
G(v)^2
&=\sum_\mu(v^\mu)^2G_\mu^2
+\sum_{\mu<\nu}v^\mu v^\nu(G_\mu G_\nu+G_\nu G_\mu)\\
&=\eta(v,v)I_4.
\end{aligned}
$$

[Clifford代数の普遍性](#thm-lrep14-universal)を実代数 $A=M_4(\mathbb C)$ と実線形写像 $G$ に適用します。得られた実準同型を複素線形に延長し、$a\otimes z$ を $zF(a)$ へ移せば複素代数準同型 $\Phi$ になります。複素数は行列積と可換なので積も保存されます。

添字集合 $S\subset\{0,1,2,3\}$ に対し、昇順に掛けた行列を $G_S$、空集合の場合を $I_4$ とします。各 $G_\mu$ は二乗が $\pm I_4$ なので可逆です。従って $G_S$ も可逆です。

非空の $S$ について $\operatorname{tr}G_S=0$ を示します。$|S|=k$ が偶数なら $a\in S$ を選び、奇数なら $a\notin S$ を選びます（奇数の場合 $k=1,3$ なので選べます）。$G_a$ による共役は $G_a$ 自身を変えず、それ以外の各因子の符号を変えます。実際 $a\ne b$ なら $G_aG_bG_a^{-1}=-G_b$ です。従って偶数の場合は $k-1$ 個、奇数の場合は $k$ 個の符号が変わり、

$$
G_aG_SG_a^{-1}=-G_S.
$$

跡の巡回性から左辺の跡は $\operatorname{tr}G_S$、右辺の跡はその負です。従って跡は零です。

次に $\sum_S c_S G_S=0$ と仮定し、任意の集合 $T$ を固定して左から $G_T^{-1}$ を掛け、跡を取ります。$S=T$ なら $G_T^{-1}G_S=I_4$。$S\ne T$ なら交換と二乗の除去によって、共通の添字がすべて消え、片方にだけ含まれる添字の集合 $S\triangle T$ の積の符号倍になります。この集合は非空なので跡は零です。従って

$$
0=\sum_S c_S\operatorname{tr}(G_T^{-1}G_S)=4c_T.
$$

全ての $T$ に対し $c_T=0$ です。四次複素行列空間は各成分を独立に選べるため複素次元16であり、これら16行列は基底です。[順序付きClifford単項式による生成](#prop-lrep14-spanning)から $\Phi$ の定義域は16個で張られ、像の16個が独立なので定義域の16個も独立です。ゆえに $\Phi$ は全単射です。

実代数の順序付き単項式も実線形独立です。もし実線形関係があれば複素化して同じ関係が生じるからです。実代数も16個で張られるため実次元16を得ます。$\square$
<!-- proof-end -->

この構成では $G(v)$ は時空ベクトルの一次式で、その二乗は計量の二次式です。例えば $v=e_0+e_3$ に対し

$$
G(v)=\begin{pmatrix}0&I+\sigma_3\\-I+\sigma_3&0\end{pmatrix}.
$$

非零の二つの対角ブロック $I+\sigma_3=\operatorname{diag}(2,0)$ と $-I+\sigma_3=\operatorname{diag}(0,-2)$ の積はどちらの順でも零です。よって $G(v)\ne0$ ですが $G(v)^2=0$ です。これで光的方向では非零元が二乗零になり得ることが見えます。なお実代数の実次元16と $M_4(\mathbb C)$ の実次元32を混同してはいけません。全行列代数との同型は複素化に対する主張です。

## 5. 演習

### Level A

<a id="ex-lrep14-a01"></a>

#### LREP14-A01 語の整列
- Level: A
- ID: LREP14-A01

Minkowski基底で $e_3e_1e_0e_3$ を順序付き単項式へ直せ。

<!-- solution-start -->
**詳細解答。** [Clifford反交換関係](#prop-lrep14-anticommutator)で異なる添字を交換します。

$$
e_3e_1e_0e_3=-e_1e_3e_0e_3
=e_1e_0e_3^2=e_1e_0=-e_0e_1.
$$

$e_3^2=1$ を使いました。
<!-- solution-end -->

<a id="ex-lrep14-a02"></a>

#### LREP14-A02 時間方向の商
- Level: A
- ID: LREP14-A02

一次元時間方向のClifford代数で $(2+e_0)(3-2e_0)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [Clifford代数の定義](#def-lrep14-clifford)から $e_0^2=-1$。分配律で

$$
(2+e_0)(3-2e_0)=6-4e_0+3e_0-2e_0^2=8-e_0.
$$

余りは次数1以下なので $1,e_0$ による表示です。
<!-- solution-end -->

<a id="ex-lrep14-a03"></a>

#### LREP14-A03 反交換子と内積
- Level: A
- ID: LREP14-A03

$v=2e_0+e_1$、$w=e_0+3e_1$ とする。$v^2,w^2,vw+wv$ を求めよ。

<!-- solution-start -->
**詳細解答。** [Clifford反交換関係](#prop-lrep14-anticommutator)により混合項 $e_0e_1+e_1e_0=0$。従って $v^2=-4+1=-3$、$w^2=-1+9=8$ です。内積は $\eta(v,w)=-2+3=1$ なので $vw+wv=2$ です。展開でも

$$
vw=1+5e_0e_1,\qquad wv=1-5e_0e_1
$$

となり、和が2になります。
<!-- solution-end -->

<a id="ex-lrep14-a04"></a>

#### LREP14-A04 積の二乗
- Level: A
- ID: LREP14-A04

$(e_0e_2)^2$ と $(e_1e_2)^2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [Clifford反交換関係](#prop-lrep14-anticommutator)より

$$
(e_0e_2)^2=-e_0^2e_2^2=1,\qquad
(e_1e_2)^2=-e_1^2e_2^2=-1.
$$

時間方向を含むかどうかで符号が変わります。
<!-- solution-end -->

### Level B

<a id="ex-lrep14-b01"></a>

#### LREP14-B01 二乗条件の不足
- Level: B
- ID: LREP14-B01

$\mathbb R^2$ の正定値標準計量に対し、線形写像 $f(e_1)=f(e_2)=1$ を実数代数へ定める。各基底の二乗条件は成立するが、Clifford代数からの準同型へ延長できないことを示せ。

<!-- solution-start -->
**詳細解答。** 基底では $f(e_i)^2=1$。しかし $v=e_1+e_2$ では $f(v)=2$ なので $f(v)^2=4$、計量の二乗は $g(v,v)=2$ です。[Clifford代数の普遍性](#thm-lrep14-universal)の仮定は全てのベクトルについての二乗条件であり、基底だけではありません。もし延長が存在すれば $v^2=2$ の像は $f(v)^2=2$ でなければならず矛盾します。反交換関係でも $f(e_1)f(e_2)+f(e_2)f(e_1)=2\ne0$ なので障害が確認できます。
<!-- solution-end -->

<a id="ex-lrep14-b02"></a>

#### LREP14-B02 光的方向と非可逆性
- Level: B
- ID: LREP14-B02

$v=e_0+e_1$、$w=e_0+2e_1$ の行列 $G(v),G(w)$ について、二乗と可逆性を調べよ。可逆な方の逆行列を求めよ。

<!-- solution-start -->
**詳細解答。** [四次元複素Clifford代数の行列模型](#thm-lrep14-matrix-model)より

$$
G(v)^2=(-1+1)I_4=0,\quad
G(w)^2=(-1+4)I_4=3I_4.
$$

$G(v)$ の右上ブロックは $I+\sigma_1$ で非零です。もし可逆なら二乗も可逆になりますが零行列なので矛盾します。一方 $G(w)$ の左右から $G(w)/3$ を掛けると $I_4$ になるので、逆行列は $G(w)/3$ です。
<!-- solution-end -->

<a id="ex-lrep14-b03"></a>

#### LREP14-B03 跡で係数を読む
- Level: B
- ID: LREP14-B03

$M=2I_4+3G_0G_2-G_1$ とする。$T=\{0,2\}$ の係数を $\operatorname{tr}(G_T^{-1}M)/4$ で取り出せ。

<!-- solution-start -->
**詳細解答。** [Clifford反交換関係](#prop-lrep14-anticommutator)より $(G_0G_2)^2=-G_0^2G_2^2=I_4$ なので逆行列は自身です。従って

$$
G_T^{-1}M=2G_0G_2+3I_4-G_0G_2G_1
=2G_0G_2+3I_4+G_0G_1G_2.
$$

[四次元複素Clifford代数の行列模型](#thm-lrep14-matrix-model)の跡の議論より非空の添字集合の積の跡は零です。残る跡は $3\cdot4=12$。4で割ると係数3が得られます。
<!-- solution-end -->

### Level C

<a id="ex-lrep14-c01"></a>

#### LREP14-C01 四元積と二つの射影
- Level: C
- ID: LREP14-C01

$K=G_0G_1G_2G_3$、$H=iK$、$P_\pm=(I_4\pm H)/2$ とする。$K^2$ を求め、$H^2=I_4$、$P_\pm^2=P_\pm$、$P_+P_-=0$、$P_++P_-=I_4$ を示せ。さらに $\operatorname{tr}P_\pm$ と $G_\mu P_\pm$ の関係を求めよ。

<!-- solution-start -->
**詳細解答。** [四次元複素Clifford代数の行列模型](#thm-lrep14-matrix-model)の反交換関係を使います。右側の $G_0$ を三つ、次の $G_1$ を二つ、次の $G_2$ を一つの行列と交換して、同じ添字をまとめます。

$$
K^2=(-1)^{3+2+1}G_0^2G_1^2G_2^2G_3^2=-I_4.
$$

従って $H^2=i^2K^2=I_4$ です。分配律により

$$
P_\pm^2=\frac{I_4\pm2H+H^2}{4}=P_\pm,
$$

$$
P_+P_-=\frac{I_4-H^2}{4}=0,\qquad P_++P_-=I_4.
$$

四つの異なる添字の積 $K$ は跡が零なので $\operatorname{tr}P_\pm=(4\pm i\operatorname{tr}K)/2=2$ です。$P_\pm^2=P_\pm$ なので任意の列 $u$ は $P_\pm u+(I_4-P_\pm)u$ に分かれ、前者は固有値1、後者は固有値0の空間に入ります。従って跡2は像の次元2を表します。

$G_\mu$ による共役は $K$ のうち他の三因子の符号を変えるので $G_\mu K G_\mu^{-1}=-K$、従って $G_\mu H=-HG_\mu$。よって

$$
G_\mu P_\pm=\frac{G_\mu\pm G_\mu H}{2}
=\frac{(I_4\mp H)G_\mu}{2}=P_\mp G_\mu.
$$

一つの基底行列を掛けると二つの像の間を移ります。
<!-- solution-end -->

## 6. まとめと次講

Clifford代数は、自由なテンソル積の語に計量による二乗関係を課して得られます。普遍性によって関係を満たす行列模型が代数準同型を定め、Minkowski四次元の場合は16個の順序付き積の独立性から複素四次行列代数全体に対応します。次講LREP15「Spin群とガンマ行列」では、この積を使ってLorentz変換を行列の共役作用として構成します。
