# GW1-09 凸な射影標的と変形・障害

<!-- definition-example-audit: strict -->

## 1. 安定写像を集めただけでは、次元は決まらない

前講で定義した[種数0の安定写像](../GW1-08/index.md#def-gw1-08-stable-map)は、標点・節点・成分ごとの正則写像を同時に記録する。しかし集合として集めるだけでは、曲線を少し動かしたとき何個の独立した自由度があるか、また動かそうとした変形が途中で行き詰まるかは分からない。

今回から標的 $X$ を**滑らかな複素射影多様体**とし、複素次元を $m$ とする。標準の複素構造に関して、擬正則写像は正則写像と同じ意味になる。まず定義域を滑らかな $\mathbb P^1=\mathbb{CP}^1$ に固定した正則写像 $u:\mathbb P^1\to X$ を考え、その後に節点付きの定義域へ進む。正則接束の引き戻し

$$
E=u^*TX
$$

が主役である。$E$ は $\mathbb P^1$ 上の階数 $m$ の正則ベクトル束である。既習の[正則ベクトル束の定義](../../CM/CM2-07/index.md#def-cm2-07-holomorphic-vector-bundle)により、局所正則枠と正則な遷移行列で表せる。

**中心となる問い**は二つある。第一に、写像の一次の変化はどの切断で書けるか。第二に、局所的な変形を大域的につなげられない障害を何が測るか。答えをそれぞれ $H^0(\mathbb P^1,E)$ と $H^1(\mathbb P^1,E)$ で表す。$H^1$ がすべての球面写像について消える標的が、この章の「凸な標的」である。

## 2. $H^0$ と $H^1$ を変形の言葉へ翻訳する

正則ベクトル束 $E$ の $H^0(C,E)$ は大域正則切断のベクトル空間である。$H^1(C,E)$ は、局所切断を貼り合わせる際の差のうち、局所切断の選び直しでは消せないものを表す。[層コホモロジーのČech計算と比較](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-cech-comparison)および[接続写像の具体的な作り方](../../../代数系/AG/AG3-08/index.md#prop-ag3-08-connecting-cech)で、被覆上の差から $H^1$ の類を得る方法を学んだ。

例えば $\mathbb P^1$ を二つの標準アフィン座標で覆い、$U_0\cap U_\infty$ 上の差を $\eta_{0\infty}$ と書く。各局所切断の修正を $b_0,b_\infty$ とすれば差は

$$
\eta_{0\infty}\longmapsto
\eta_{0\infty}+b_\infty-b_0
$$

と変わる。したがって差が適切な $b_0,b_\infty$ で零にできれば大域的に貼れ、そうでなければ $H^1$ に非零類が残る。符号は差の向きを揃えればよく、零になるかどうかは変わらない。

ここで「$H^1$ が非零」は、**個々の変形が必ず失敗する**という意味ではない。失敗する可能性を収容する空間がある、という意味である。障害を実際に生む写像や変形の高次項は別途調べる必要がある。

<a id="def-gw1-09-deformation-obstruction"></a>

<!-- formal-statement-start -->
> **定義（固定定義域の変形空間と障害空間）**  
> $C$ を滑らかなコンパクト複素曲線、$X$ を滑らかな複素多様体、$u:C\to X$ を正則写像とする。$E=u^*TX$ と置く。定義域 $C$ を固定した写像の一次変形空間を $H^0(C,E)$、局所変形の大域的な貼り合わせの障害を受け取る空間を $H^1(C,E)$ とする。後者の元が実際の延長問題の障害として現れるとき、その元を障害類という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-09-deformation-obstruction -->
**定義の確認**。定数写像 $u:\mathbb P^1\to X$ の値を $x$ とする。引き戻し接束は $E\simeq\mathcal O^{\oplus m}$ である。[射影直線上の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)から

$$
H^0(\mathbb P^1,E)\simeq T_xX,\qquad
H^1(\mathbb P^1,E)=0.
$$

従って一次変形は、標的における定数値 $x$ の動きである。局所座標で $x=(x^1,\ldots,x^m)$ とし、$x(t)=x+tv$ と置くと、$t=0$ での導関数 $v$ は定義域全体で一定の正則切断になる。
<!-- definition-example-end -->

<a id="prop-gw1-09-first-order"></a>

<!-- formal-statement-start -->
> **命題（一次変形と貼り合わせ障害）**  
> $C$ を滑らかなコンパクト複素曲線、$X$ を滑らかな複素多様体、$u:C\to X$ を正則写像とする。$E=u^*TX$ と置く。定義域を固定した一次正則変形は、次の空間と自然に一対一に対応する。

$$
H^0(C,E).
$$

> さらに、$t$ の次数 $r$ まで与えた局所的な正則形式変形を次数 $r+1$ へ延長し貼り合わせる際、障害類は次の空間に入る。

$$
H^1(C,E).
$$

> 特にこの一次コホモロジーが零なら、各次数で貼り合わせ障害は消える。
<!-- formal-statement-end -->

### 証明の見取り図

座標変換を微分すると、変分の成分は接束の遷移行列で変換する。次の次数で二つの局所持ち上げを比較すると、差は接束値のČech 1-余輪になる。その類が零なら局所修正で差を消せる。

<!-- proof-start -->
### 証明

$C$ の開被覆 $\{U_i\}$ で $u(U_i)$ が標的の正則座標 $w_i$ に入るようにする。一次変形を形式的に $w_i(u_t)=w_i(u)+t v_i$ と書く。座標変換を $w_j=F_{ji}(w_i)$ とすれば、$t$ の一次まで展開して

$$
F_{ji}(w_i(u)+t v_i)
=F_{ji}(w_i(u))+t\,dF_{ji}|_{u}\,v_i
\pmod{t^2}
$$

である。二つの座標の表示が同じ写像を定める必要十分条件は $v_j=dF_{ji}|_u v_i$。これはまさに $E=u^*TX$ の正則切断の貼り合わせ条件である。逆に大域切断を与えれば各座標でこの一次式を作れ、$t^2=0$ の範囲で矛盾なく貼れる。

次に次数 $r$ まで整合した形式変形があるとする。$X$ は滑らかなので、各座標で係数を一つ加え、次数 $r+1$ の局所持ち上げを選べる。重なり $U_i\cap U_j$ で、二つの持ち上げは次数 $r$ まで一致するから、最初の差は

$$
t^{r+1}\eta_{ij}\pmod{t^{r+2}},
\qquad \eta_{ij}\in\Gamma(U_i\cap U_j,E)
$$

の形になる。三重重なりで三つの差を足すと零なので $\eta_{ij}+\eta_{jk}+\eta_{ki}=0$。局所持ち上げを $t^{r+1}b_i$ だけ修正すると $\eta_{ij}$ は $b_j-b_i$ だけ変わる。したがって[Čech比較定理](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-cech-comparison)で表す $[\eta]\in H^1(C,E)$ が零なら補正を選んで貼れる。$H^1(C,E)=0$ なら任意の段階でその類が零である。

ここで示したのは形式変形の障害機構であり、形式級数の収束やモジュライ空間の大域的構成を無条件に証明したわけではない。解析的な実際の滑らかさを結論するには、後述する線形化の全射性と局所的な陰関数定理の適用が別に必要となる。
<!-- proof-end -->

## 3. 何をもって「凸な射影標的」とするか

$\mathbb P^1$ 上で $H^1$ が消える写像が一つあることと、全ての球面写像で消えることは異なる。後者を標的自身の条件にする。

以下の例で使う**写像の次数**も先に定める。正則写像 $u:\mathbb P^1\to\mathbb P^n$ の次数 $d$ は、引き戻し線束が $u^*\mathcal O_{\mathbb P^n}(1)\simeq\mathcal O_{\mathbb P^1}(d)$ となる整数である。正則写像について $d\ge0$ であり、線束のテンソル冪を引き戻すと

$$
u^*\mathcal O_{\mathbb P^n}(k)\simeq\mathcal O_{\mathbb P^1}(kd)
$$

が成立する。これにより接束を線束として計算した結果を、写像を引き戻したときの $H^1$ 判定へ結び付けられる。

<a id="def-gw1-09-convex"></a>

<!-- formal-statement-start -->
> **定義（種数0に関する凸な射影標的）**  
> $X$ を滑らかな複素射影多様体とする。任意の正則写像 $u:\mathbb P^1\to X$ に対して

$$
H^1(\mathbb P^1,u^*TX)=0
$$

> が成立するとき、$X$ を種数0の意味で**凸**（convex）という。これは、通常のベクトル空間で二点を結ぶ線分をすべて含むという意味の凸性とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-09-convex -->
**定義の確認**。$X=\mathbb P^1$ に対し、[射影直線の接束の座標計算](../GW1-03/index.md#calc-gw1-03-p1-tangent)から $T\mathbb P^1\simeq\mathcal O(2)$ である。次数 $d\ge0$ の任意の正則写像 $u:\mathbb P^1\to\mathbb P^1$ は $u^*\mathcal O(2)\simeq\mathcal O(2d)$ を満たす。[射影直線の層コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)で $2d\ge0\ge-1$ を代入すれば $H^1(\mathcal O(2d))=0$。定数写像の $d=0$ も含めて**任意の**写像で確認したので、$\mathbb P^1$ は凸である。
<!-- definition-example-end -->

定義から高種数の曲線 $C$ について $H^1(C,u^*TX)=0$ を導くことはできない。例えば凸な標的 $X=\mathbb P^1$ への定数写像を種数1の曲線 $C$ から取ると、$u^*TX\simeq\mathcal O_C$ であり、$H^1(C,\mathcal O_C)$ は一次元である。凸性は**定義域の種数を指定した条件**である。

このあと束が「大域生成」であることを使う。これは、束の各点 $p$ と任意のベクトル $v\in E_p$ に対して、その点で値 $v$ を取る**大域正則切断**が存在する、という条件である。各点で局所枠が存在するだけでは、大域生成とは限らない。

<a id="def-gw1-09-globally-generated"></a>

<!-- formal-statement-start -->
> **定義（正則ベクトル束の大域生成）**  
> 複素曲線 $C$ 上の正則ベクトル束 $E$ が大域生成されるとは、すべての点 $p\in C$ において評価写像

$$
\operatorname{ev}_p:H^0(C,E)\longrightarrow E_p,
\qquad s\longmapsto s(p)
$$

> が全射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-09-globally-generated -->
**定義の確認**。$\mathcal O(d)$（$d\ge0$）は同次多項式の大域切断で生成される。点 $[Z:W]$ では $Z$ または $W$ の少なくとも一つが非零なので、$Z^d,W^d$ の一方は非零値を持ち、スカラー倍して任意の繊維値を作れる。一方 $\mathcal O(-2)$ は $H^0=0$ だが各繊維は一次元であり、評価写像 $0\to\mathbb C$ は全射でない。
<!-- definition-example-end -->

<a id="lem-gw1-09-global-generation"></a>

<!-- formal-statement-start -->
> **補題（大域生成から球面上の一次コホモロジー消滅）**  
> $E$ を $\mathbb P^1$ 上の有限階数の正則ベクトル束とする。$E$ が大域生成なら $H^1(\mathbb P^1,E)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

大域切断を有限本選ぶと自明束から $E$ への全射を作れる。核を含む短完全列にコホモロジーの長完全列を適用し、球面上の $H^1(\mathcal O)=0$ と $H^2=0$ を使う。

<!-- proof-start -->
### 証明

大域生成性により、各点の近くで繊維を張る有限本の大域切断を取れる。$\mathbb P^1$ はコンパクトなのでそのような近傍を有限個で覆える。全ての切断を集めるとある $N$ に対して全射

$$
\mathcal O_{\mathbb P^1}^{\oplus N}
\longrightarrow E\longrightarrow0
$$

が得られる。$E$ は局所自由なので、その核 $K$ も局所自由であり、

$$
0\longrightarrow K\longrightarrow
\mathcal O_{\mathbb P^1}^{\oplus N}
\longrightarrow E\longrightarrow0
$$

は短完全列である。[層コホモロジーの長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)の該当箇所は

$$
H^1(\mathbb P^1,\mathcal O^{\oplus N})
\longrightarrow H^1(\mathbb P^1,E)
\longrightarrow H^2(\mathbb P^1,K)
$$

である。左端は[射影直線上の計算](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)から零。右端は、同じ[二つのアフィンによるČech計算](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-mayer-vietoris)で、曲線上の局所自由層の高次群が二次以上では零となることから零である。完全性により中央も零となる。
<!-- proof-end -->

大域生成は**凸性の定義より強い、計算しやすい十分条件**として利用する。ここでは全ての凸標的の接束が大域生成であるとは主張していない。以下の射影空間とGrassmann多様体では、各写像に対する引き戻しが大域生成であることを直接確かめる。

## 4. 射影空間ではEuler列が消滅を保証する

射影空間の接方向を表す[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)は次の短完全列である。

$$
0\longrightarrow\mathcal O_{\mathbb P^n}
\longrightarrow\mathcal O_{\mathbb P^n}(1)^{\oplus(n+1)}
\longrightarrow T\mathbb P^n\longrightarrow0.
$$

前節で定めた次数 $d$ について、非定数の正則写像なら $d\ge1$、定数写像なら $d=0$ である。写像が点に値を持ち、引き戻した列が完全である理由は、接Euler列が**ベクトル束の短完全列**だからである。局所的には行列の核・像を取るだけなので、引き戻しても各点で完全性を保つ。以下では $h^q(C,E)=\dim_{\mathbb C}H^q(C,E)$（$q=0,1$）と書く。

<a id="thm-gw1-09-projective-convex"></a>

<!-- formal-statement-start -->
> **定理（射影空間の凸性と変形次元）**  
> $n\ge1$、$X=\mathbb P^n$ とする。任意の次数 $d\ge0$ の正則写像 $u:\mathbb P^1\to\mathbb P^n$ に対し $E=u^*T\mathbb P^n$ と置く。このとき

$$
H^1(\mathbb P^1,E)=0,\qquad
h^0(\mathbb P^1,E)=(n+1)(d+1)-1.
$$

> さらに $E$ は大域生成され、したがって $\mathbb P^n$ は凸である。
<!-- formal-statement-end -->

### 証明の見取り図

Euler列を写像で引き戻すと $\mathcal O(d)$ だけの列になる。各線束の $H^1$ が消えることを長完全列へ入れ、$H^0$ の次元を引き算する。大域生成は、自明束からの全射が引き戻しで保たれることから従う。

<!-- proof-start -->
### 証明

接Euler列の引き戻しは

$$
0\longrightarrow\mathcal O
\longrightarrow\mathcal O(d)^{\oplus(n+1)}
\longrightarrow E\longrightarrow0.
$$

[射影直線の線束コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)を $d\ge0$ と $0$ に適用すると

$$
H^1(\mathcal O)=0,\quad H^1(\mathcal O(d))=0,\quad
h^0(\mathcal O)=1,\quad h^0(\mathcal O(d))=d+1.
$$

そこで[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)は

$$
0\to H^0(\mathcal O)\to H^0(\mathcal O(d))^{\oplus(n+1)}
\to H^0(E)\to0
$$

を与え、同時に $H^1(E)$ は $H^1(\mathcal O(d))^{\oplus(n+1)}=0$ の像と $H^2(\mathcal O)=0$ の間に入るので零となる。前者の短完全列で次元を計算すれば

$$
h^0(E)=(n+1)(d+1)-1.
$$

$\mathcal O(d)$ は[大域生成の例](#def-gw1-09-globally-generated)で確かめたとおり大域生成である。その $(n+1)$ 本の直和から $E$ への全射が各繊維で全射だから、$E$ も大域生成である。$u$ と $d$ は任意であり、[凸性の定義](#def-gw1-09-convex)が成立する。
<!-- proof-end -->

**定義の再確認**。$\mathbb P^2$ への次数1の写像では $h^0(E)=3\cdot2-1=5$、$h^1(E)=0$。次数0では $h^0(E)=3-1=2$、$h^1(E)=0$。一つの写像だけでなく次数全体を覆っていることに注意する。

## 5. Grassmann多様体でも接方向を作れる

$\operatorname{Gr}(r,N)$ は $\mathbb C^N$ の $r$ 次元線形部分空間全体を点とする滑らかな射影多様体で、$1\le r\le N-1$ とする。各点 $W$ で、$W$ の動く方向を一次で記録するには $W$ のベクトルを商空間 $\mathbb C^N/W$ に送ればよい。従ってその接空間は $\operatorname{Hom}(W,\mathbb C^N/W)$ となる。

$S$ を繊維 $S_W=W$ の階数 $r$ の**普遍部分束**、$Q$ を繊維 $Q_W=\mathbb C^N/W$ の**普遍商束**とする。これらは自然な短完全列をなす。

$$
0\longrightarrow S\longrightarrow
\mathcal O^{\oplus N}\longrightarrow Q\longrightarrow0.
$$

<a id="prop-gw1-09-grassmann-tangent"></a>

<!-- formal-statement-start -->
> **命題（Grassmann多様体の接束と凸性）**  
> $1\le r<N$、$X=\operatorname{Gr}(r,N)$ とする。$X$ の正則接束は

$$
TX\simeq S^*\otimes Q
$$

> であり、大域生成される。従って任意の正則写像 $u:\mathbb P^1\to X$ に対して $H^1(\mathbb P^1,u^*TX)=0$ であり、$X$ は凸である。
<!-- formal-statement-end -->

### 証明の見取り図

部分空間をグラフで表すと、その一次変化は $\operatorname{Hom}(W,\mathbb C^N/W)$ に入る。$S^*$ と $Q$ はそれぞれ定数ベクトルから得られる大域切断で繊維を張る。そのテンソル積も繊維を張る。

<!-- proof-start -->
### 証明

$W\subset\mathbb C^N$ に補空間 $V$ を選び $\mathbb C^N=W\oplus V$ と書く。$W$ に近い $r$ 次元部分空間は線形写像 $A:W\to V$ のグラフ $\{w+A(w):w\in W\}$ として一意に表せる。$A=0$ での座標微分は $\operatorname{Hom}(W,V)$ であり、補空間の同一視 $V\simeq\mathbb C^N/W$ により $\operatorname{Hom}(W,\mathbb C^N/W)$ となる。補空間を替えてもこの商空間への一次変化は変わらず、点ごとの同型が正則に貼られ $TX\simeq S^*\otimes Q$ を得る。

$Q$ は $\mathcal O^{\oplus N}$ の商だから、任意の $W$ で $\mathbb C^N\to Q_W$ は全射であり、定数ベクトルからの大域切断が $Q_W$ を張る。一方、$S^*$ は双対の制限写像 $(\mathbb C^N)^*\to W^*$ により繊維ごとに生成される。これも固定した線形汎関数による大域切断である。両者の大域切断のテンソル積は

$$
S_W^*\otimes Q_W\simeq\operatorname{Hom}(W,Q_W)
$$

を張る。従って $TX$ は大域生成である。引き戻した大域切断は任意の $u(z)$ の繊維を張るから $u^*TX$ も大域生成。最後に[大域生成からの $H^1$ 消滅](#lem-gw1-09-global-generation)を適用する。
<!-- proof-end -->

$\operatorname{Gr}(1,N)\simeq\mathbb P^{N-1}$ なので前節の計算と矛盾しない。Grassmann多様体ではEuler列を無理に再利用するのではなく、**接空間が線形写像である理由**から凸性を証明した。

## 6. 消滅から、実際の局所変形へ

[前講のFredholm線形化](../GW1-03/index.md#def-gw1-03-linearization)は、可積分な複素標的への正則写像を固定定義域で考えると、正則束 $E=u^*TX$ のDolbeault作用素に一致する。既習の[Dolbeaultコホモロジーと余核の同一視](../GW1-03/index.md#thm-gw1-03-rr-computation)から、その複素核・余核は $H^0(C,E)$・$H^1(C,E)$ に対応する。実線形な一般の概複素構造の場合の $D_u$ と、ここでの複素線形なDolbeault作用素を混同しない。

<a id="prop-gw1-09-smooth-map-locus"></a>

<!-- formal-statement-start -->
> **命題（凸標的への滑らかな球面写像の局所自由度）**  
> $X$ を複素次元 $m$ の滑らかな複素射影凸標的とし、$u:\mathbb P^1\to X$ を正則写像、$\beta=u_*[\mathbb P^1]$ とする。定義域の複素構造を固定した正則写像の局所解空間は、$u$ の近くで複素次元

$$
h^0(\mathbb P^1,u^*TX)=m+\langle c_1(TX),\beta\rangle
$$

> の滑らかな空間となる。さらに $k$ 個の相異なる順序付き標点を変動させ、写像と標点の組の自己同型が有限であるとき、再パラメータ化で割った局所的な期待複素次元は

$$
m-3+\langle c_1(TX),\beta\rangle+k.
$$

> この命題は滑らかな定義域の局所自由度を述べ、節点を含むモジュライ空間全体の構成・滑らかさを主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

凸性はDolbeault線形化の余核を零にする。局所陰関数定理で実際の写像を滑らかに動かし、Riemann–Rochで核を数える。標点を $k$ 個動かす自由度を足し、球面の再パラメータ化群の複素三次元を引く。

<!-- proof-start -->
### 証明

可積分な複素構造では固定定義域の線形化は $\bar\partial_E$ であり、その余核は前述の対応から $H^1(\mathbb P^1,E)$。[凸性の定義](#def-gw1-09-convex)により零だから線形化は全射となる。[楕円型正則性・Fredholm性](../GW1-03/index.md#thm-gw1-03-fredholm)と同講で説明したBanach空間上の局所陰関数定理の適用により、近くの解空間は核を接空間とする滑らかな有限次元複素空間になる。複素構造の可積分性により局所方程式は複素正則であり、複素次元は $h^0(E)$ である。

[Dolbeault指数公式](../GW1-03/index.md#thm-gw1-03-rr-computation)を $g=0$、階数 $m$、$E=u^*TX$ に代入すると

$$
h^0(E)-h^1(E)=m(1-0)+\deg E
=m+\langle c_1(TX),\beta\rangle.
$$

$h^1(E)=0$ だから最初の等式を得る。

次に標点を $k$ 個選ぶには局所的に複素一次元ずつの自由度があり、衝突しない条件は開条件なので $k$ を足す。[三点正規化](../GW1-07/index.md#thm-gw1-07-three-point)で、球面の双正則自己同型からなる群 $\operatorname{PGL}_2(\mathbb C)$ は複素次元3である。写像と標点の組を固定する自己同型が有限なら、その作用の軌道の局所次元は3であり、従って商の期待次元は

$$
h^0(E)+k-3
=m-3+\langle c_1(TX),\beta\rangle+k.
$$

有限群による商は粗空間では商特異点を持ち得る。ここでは粗空間が滑らかな多様体になるとは結論していない。
<!-- proof-end -->

**数え間違いを防ぐ例**。$X=\mathbb P^2$、$d=1$、$k=0$ なら[射影空間の定理](#thm-gw1-09-projective-convex)から $h^0(E)=5$。次数1の写像の自己同型は恒等であり、再パラメータ化の三次元を引くと $5-3=2$。これは射影平面内の直線のパラメータ空間の複素次元2と一致する。写像の係数5次元を、そのまま直線の本数を数える次元と呼ばない。

## 7. 節点付きの木では、値を一致させる式が増える

種数0の[安定写像の定義](../GW1-08/index.md#def-gw1-08-stable-map)で、定義域 $C$ の成分を $C_v\simeq\mathbb P^1$、節点を $q_e$、成分の写像を $u_v$ と書く。$E=u^*TX$ と $E_v=u_v^*TX$ は各成分で一致するが、切断は節点の両枝で同じ値を取らなければならない。これが**節点での値一致を切断に課した条件**である。

<a id="prop-gw1-09-nodal-matching"></a>

<!-- formal-statement-start -->
> **命題（種数0の節点付き写像の切断と障害）**  
> $X$ を複素次元 $m$ の滑らかな複素射影多様体、$u:C\to X$ を連結な種数0の節点付き正則写像とする。$C$ の双対グラフは $V$ 頂点・$E_0=V-1$ 辺の木とし、各節点の両枝の像が一致するとする。$E=u^*TX$ と $E_v=u_v^*TX$ を置き、すべての $E_v$ が大域生成されると仮定する。このとき

$$
H^1(C,E)=0,\qquad
h^0(C,E)=\sum_v h^0(C_v,E_v)-mE_0.
$$

> 特に $X=\mathbb P^n$ または $\operatorname{Gr}(r,N)$ なら、この大域生成の仮定は全ての成分写像で満たされる。
<!-- formal-statement-end -->

### 証明の見取り図

成分別の切断を全部並べ、各節点で「左の値−右の値」を取る。木なので葉の成分を一つずつ調整すれば全ての差を任意に指定できる。成分の $H^1$ 消滅と長完全列を使う。

<!-- proof-start -->
### 証明

$\nu:\coprod_v C_v\to C$ を正規化写像とする。節点 $q_e$ の両枝 $q_e^+,q_e^-$ は $u(q_e^+)=u(q_e^-)$ を満たすから、両側の繊維は同じ $T_{u(q_e)}X$ へ同一視できる。正規化による短完全列は

$$
0\to E\to\bigoplus_v\nu_*E_v
\xrightarrow{\Delta}\bigoplus_{e}T_{u(q_e)}X\to0
$$

で、$\Delta$ は各節点での両側の切断の値の差である。局所的には節点の環 $\mathbb C\{x,y\}/(xy)$ から二枝の組への埋め込みを考えると、二枝の定数項が等しいことだけが像の条件であり、余核は節点の繊維になる。従って上の列は節点でも完全である。

$\Delta$ が大域切断上で全射であることを示す。双対木から葉を一つ選ぶ。隣の成分で値をいったん固定しても、葉側の束 $E_v$ は大域生成なので、その接続節点で任意の差を作る切断を選べる。葉を取り去った残りの木について帰納法を適用し、最後に葉の値を調整すれば、任意に指定された全節点の差を実現できる。したがって

$$
\bigoplus_v H^0(C_v,E_v)
\xrightarrow{\Delta}\bigoplus_e T_{u(q_e)}X
$$

は全射である。

各 $E_v$ は大域生成だから[大域生成からの消滅](#lem-gw1-09-global-generation)により $H^1(C_v,E_v)=0$。正規化短完全列の[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)は

$$
0\to H^0(C,E)\to\bigoplus_v H^0(C_v,E_v)
\xrightarrow{\Delta}\bigoplus_e T_{u(q_e)}X
\to H^1(C,E)\to0
$$

となる。$\Delta$ が全射なので $H^1(C,E)=0$。右端のベクトル空間の複素次元は $mE_0$ だから核の次元は表示した式になる。
<!-- proof-end -->

**二成分の具体例**。$X=\mathbb P^1$、$u_1(z)=z$、$u_2(w)=w$ をそれぞれの球面に置き、$z=w=0$ を節点とする。各引き戻し接束は $\mathcal O(2)$ なので $h^0(E_1)=h^0(E_2)=3$。節点での値の差は $T_0\mathbb P^1$ の一次元の条件であり、$h^0(C,E)=3+3-1=5$、$h^1(C,E)=0$。片方を次数0とした場合、定数成分の[三特殊点条件](../GW1-08/index.md#thm-gw1-08-finite-aut)も別途必要になる。切断の計算だけで写像が安定かどうかは決まらない。

ここまでで示したのは**固定した節点付き曲線上の写像束のコホモロジー消滅**である。節点を平滑化する変形は別のパラメータを持ち、曲線と写像を同時に動かす局所チャート、安定写像の有限自己同型による作用、局所チャートの貼り合わせ、固有性の構成には追加の証明が要る。次講ではそれを扱う。

## 8. 凸性を外すと何が壊れるか：負の正規束

「射影多様体なら $H^1$ は消える」という推測は誤りである。負の自己交叉を持つ有理曲線を標的の中へ置けば、接方向は動かせても法方向は障害を持ち得る。

$B=\mathbb P^1$ とし、階数2の束 $\mathcal O_B\oplus\mathcal O_B(-2)$ の各繊維の**原点を通る直線**をパラメータにする射影束

$$
X=\mathbb P_B(\mathcal O_B\oplus\mathcal O_B(-2))
$$

を考える。これは $B$ 上の滑らかな射影曲面であり、Hirzebruch曲面の一例である。$\mathcal O_B$ という直和因子を選んで得る切断の像を $C\simeq\mathbb P^1$ とし、包含を $u:C\hookrightarrow X$ とする。

<a id="prop-gw1-09-nonconvex"></a>

<!-- formal-statement-start -->
> **命題（負の正規束を持つ射影標的は凸でない）**  
> 上の射影曲面 $X$ と切断 $C$ に対し、法束は $N_{C/X}\simeq\mathcal O_C(-2)$ であり、

$$
u^*TX\simeq \mathcal O_C(2)\oplus\mathcal O_C(-2).
$$

> したがって $h^0(C,u^*TX)=3$、$h^1(C,u^*TX)=1$。特に $X$ は凸でない。
<!-- formal-statement-end -->

### 証明の見取り図

射影束の繊維内にある直線の動きは「選んだ線から商への線形写像」である。これで法束を計算し、基底への射影と切断を微分して接完全列の分裂を具体的に作る。

<!-- proof-start -->
### 証明

各 $b\in B$ において $X_b$ は二次元空間 $\mathbb C\oplus\mathcal O(-2)_b$ の直線全体である。選んだ直線 $L_b=\mathbb C\oplus0$ の近くの直線は、線形写像 $L_b\to(\mathbb C\oplus\mathcal O(-2)_b)/L_b$ のグラフで表せる。その一次の法方向は

$$
\operatorname{Hom}(\mathcal O_B,\mathcal O_B(-2))
\simeq\mathcal O_B(-2)
$$

となる。切断なので基底方向の接束 $TC\simeq T\mathbb P^1\simeq\mathcal O(2)$ は $TX|_C$ の部分束をなし、[正規束と接完全列](../../../代数系/AG/AG2-10/index.md#thm-ag2-10-normal-tangent)から

$$
0\to\mathcal O(2)\to u^*TX\to\mathcal O(-2)\to0
$$

を得る。この射影束では分裂を微分から直接作れる。束の射影を $\pi:X\to B$ とすると、$u:C\simeq B\hookrightarrow X$ はその切断なので $\pi\circ u=\operatorname{id}_B$ である。従って $C\simeq B$ の接空間を同一視すると

$$
d\pi\circ du=\operatorname{id}_{TC}.
$$

任意の $\xi\in (u^*TX)_b$ は

$$
\xi=du(d\pi\,\xi)+\bigl(\xi-du(d\pi\,\xi)\bigr)
$$

と一意に分かれる。第一項は $du(T_bC)$ に、第二項は $\ker(d\pi)_b$ に属するので、接方向と繊維方向は正則な直和をなす。後者は先ほどグラフ座標で求めた法束 $N_{C/X}\simeq\mathcal O(-2)$ に一致する。従って $u^*TX\simeq\mathcal O(2)\oplus\mathcal O(-2)$ である。

同じ[射影直線の層コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)を $2,-2$ に代入して

$$
h^0(\mathcal O(2))=3,\quad h^0(\mathcal O(-2))=0,
\qquad h^1(\mathcal O(2))=0,\quad h^1(\mathcal O(-2))=1
$$

となる。ゆえに $h^0(u^*TX)=3$、$h^1(u^*TX)=1$。凸性は任意の球面写像について消滅を要求するので、この一つの包含写像が反例となる。
<!-- proof-end -->

ここで $H^1\ne0$ は、法方向の変形が存在しないことを直ちに証明するものではない。実際、一次法方向は $H^0(\mathcal O(-2))=0$ なので、この曲線の像は一次的にも法方向へは動かせない。一方、パラメータ付き写像としての $h^0=3$ は球面の自己同型による三次元の動きであり、商の実際の自由度は0。Riemann–Rochからの指数は $h^0-h^1=2$、三次元の再パラメータ化を差し引いた期待次元は $2-3=-1$。**実際の0次元と期待次元 $-1$ が異なる**ことが、通常の基本類で数を作るだけでは不十分になり得る理由である。

## 9. 演習：消滅、接束、節点、反例を自分で計算する

### Level A

<a id="ex-gw1-09-a01"></a>
#### GW1-09-A01 線束の零次・一次コホモロジー
- Level: A

$\mathbb P^1$ 上の $\mathcal O(3)$ と $\mathcal O(-2)$ について $h^0,h^1$ をそれぞれ求め、どちらが大域生成されるか判定せよ。

<!-- solution-start -->
**詳細解答**。[射影直線の層コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)では、整数 $d$ に対する次元公式は

$$
h^0(\mathcal O(d))=\max(d+1,0),\qquad
h^1(\mathcal O(d))=\max(-d-1,0).
$$

これへ $d=3$ と $d=-2$ を順に代入すると

$$
(h^0(\mathcal O(3)),h^1(\mathcal O(3)))=(4,0),\qquad
(h^0(\mathcal O(-2)),h^1(\mathcal O(-2)))=(0,1).
$$

$\mathcal O(3)$ の大域切断 $Z^3,W^3$ は、射影直線の各点で少なくとも一方が非零である。その値をスカラー倍すれば繊維の任意の値が得られ、[大域生成の定義](#def-gw1-09-globally-generated)を満たす。対して $\mathcal O(-2)$ の大域切断は零しかないのに繊維は一次元なので、大域生成されない。
<!-- solution-end -->

<a id="ex-gw1-09-a02"></a>
#### GW1-09-A02 定数写像の変形
- Level: A

$\mathbb P^1\to\mathbb P^4$ の定数正則写像 $u$ について $h^0(u^*T\mathbb P^4)$、$h^1$ を求め、一次変形の幾何学的意味を述べよ。

<!-- solution-start -->
**詳細解答**。定数値を $x$ とすると引き戻し束は $\mathcal O^{\oplus4}$。各自明線束は $h^0=1,h^1=0$ なので $h^0=4,h^1=0$。[一次変形の定義](#def-gw1-09-deformation-obstruction)により $H^0$ の元は一定の接ベクトル $v\in T_x\mathbb P^4$。これは標的で定数値 $x$ を動かす四次元の自由度に対応する。標点0個では定数写像は安定でないので、ここから無標点安定写像モジュライの次元を読み取ってはいけない。
<!-- solution-end -->

<a id="ex-gw1-09-a03"></a>
#### GW1-09-A03 射影平面の次数2写像
- Level: A

次数2の正則写像 $u:\mathbb P^1\to\mathbb P^2$ について、接Euler列の引き戻しを書き、$h^0(u^*T\mathbb P^2)$ と $h^1$ を求めよ。

<!-- solution-start -->
**詳細解答**。[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)を次数2の写像で引き戻すと

$$
0\to\mathcal O\to\mathcal O(2)^{\oplus3}\to E\to0
$$

を得る。[射影直線の層コホモロジー](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)により、左二束の一次コホモロジーは零である。[長完全列](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-long-exact)を使えば

$$
H^1(E)=0,\qquad
h^0(E)=3h^0(\mathcal O(2))-h^0(\mathcal O)
=3\cdot3-1=8.
$$

これは[射影空間の凸性と変形次元](#thm-gw1-09-projective-convex)の公式へ $n=2,d=2$ を代入した値とも一致する。
<!-- solution-end -->

<a id="ex-gw1-09-a04"></a>
#### GW1-09-A04 一次の障害と実際の失敗を区別する
- Level: A

ある写像について $H^1(C,u^*TX)$ が一次元であるとする。「どの変形も必ず延長できない」という結論は正しいか。$H^1=0$ の場合に言えることも述べよ。

<!-- solution-start -->
**詳細解答**。正しくない。[貼り合わせ障害の命題](#prop-gw1-09-first-order)で、各延長問題の具体的な余輪 $\eta$ が障害類 $[\eta]\in H^1$ を定める。$H^1$ が一次元でも、特定の余輪が零類なら修正 $b_i$ を選んで貼り合わせられる。一方 $H^1=0$ なら**どの**障害類も零になるので、形式的延長の各次数における貼り合わせ障害は消える。ただし実際の級数の収束や大域的モジュライの構成は別の論証が必要である。
<!-- solution-end -->

<a id="ex-gw1-09-a05"></a>
#### GW1-09-A05 標点による局所次元
- Level: A

$\mathbb P^1\to\mathbb P^1$ の次数3写像に、相異なる二つの標点を動かせるように付ける。自己同型が有限であるとし、固定定義域の変形次元と再パラメータ化後の局所次元を求めよ。

<!-- solution-start -->
**詳細解答**。[射影空間の定理](#thm-gw1-09-projective-convex)で $n=1,d=3$ を代入して $h^0(E)=2(4)-1=7$。標点の自由度が2、球面の双正則自己同型からなる群が3なので商の次元は $7+2-3=6$。[局所自由度の命題](#prop-gw1-09-smooth-map-locus)の $m-3+c_1\cdot\beta+k=1-3+2\cdot3+2=6$ とも一致する。
<!-- solution-end -->

### Level B

<a id="ex-gw1-09-b01"></a>
#### GW1-09-B01 局所補正が障害類を消す
- Level: B

二つの座標開集合 $U_0,U_1$ で覆う曲線と束 $E$ を考え、局所持ち上げの差が $\eta_{01}\in\Gamma(U_0\cap U_1,E)$ と書けるとする。$\eta_{01}=b_0-b_1$ を満たす局所切断 $b_i$ があるとき、どのように持ち上げを修正すれば一致するか。差が零類になることと貼り合わせを結び付けよ。

<!-- solution-start -->
**詳細解答**。両側の持ち上げを同じ座標で $f_0,f_1$ と書き、差の向きを $f_1-f_0=\eta_{01}$ に揃える。次数 $r+1$ の係数として $f_i$ に $b_i$ を加えると、新しい差は $\eta_{01}+b_1-b_0$ になる。仮定 $\eta_{01}=b_0-b_1$ を代入すれば零。これは[Čechの貼り合わせ障害](#prop-gw1-09-first-order)で $\eta$ が局所補正の差、すなわち零類であることに一致する。差の向きを逆に取った場合は補正も逆符号にする。
<!-- solution-end -->

<a id="ex-gw1-09-b02"></a>
#### GW1-09-B02 節点の値一致を数える
- Level: B

二成分の球面 $C_1,C_2$ を一節点でつなぎ、両方を $\mathbb P^2$ に次数1で写す。接続点の像は同じとし、各写像が正則であるとする。固定した節点付き定義域について $h^0(C,u^*T\mathbb P^2),h^1$ を計算せよ。

<!-- solution-start -->
**詳細解答**。各成分の引き戻し接束 $E_i$ は[射影空間の定理](#thm-gw1-09-projective-convex)で大域生成、$h^0(E_i)=3\cdot2-1=5$、$h^1(E_i)=0$。節点の像は $\mathbb P^2$ の一点 $x$ で、$T_x\mathbb P^2$ の複素次元は2。成分別の切断の値を一致させる独立条件が2つある。従って[節点一致命題](#prop-gw1-09-nodal-matching)により $h^0=5+5-2=8$、$h^1=0$。ここで節点平滑化の自由度は数えていない。
<!-- solution-end -->

<a id="ex-gw1-09-b03"></a>
#### GW1-09-B03 負の正規束で凸性を破る
- Level: B

滑らかな射影曲面内の正則な有理曲線 $C\simeq\mathbb P^1$ が $N_{C/X}\simeq\mathcal O(-2)$ を満たすとする。接完全列が分裂する理由、$h^0,h^1$、一次の法方向の自由度を求めよ。

<!-- solution-start -->
**詳細解答**。[正規束接完全列](../../../代数系/AG/AG2-10/index.md#thm-ag2-10-normal-tangent)は

$$
0\to\mathcal O(2)\xrightarrow{\iota}TX|_C\to\mathcal O(-2)\to0.
$$

一般の曲線には前節の射影束の射影 $\pi$ はないので、ここでは局所の右逆を貼り合わせる。$C\simeq\mathbb P^1$ の標準アフィン被覆 $\{U_i\}$ 上では、局所自由束の全射には正則な右逆 $s_i:\mathcal O(-2)|_{U_i}\to TX|_{U_i}$ がある。重なりで $s_j-s_i$ は $\mathcal O(2)$ に値を取るため、その差は

$$
\alpha_{ij}\in\Gamma(U_i\cap U_j,
\mathcal Hom(\mathcal O(-2),\mathcal O(2)))
=\Gamma(U_i\cap U_j,\mathcal O(4))
$$

である。三重重なりでは $\alpha_{ij}+\alpha_{jk}+\alpha_{ki}=0$。従って[Čech比較定理](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-cech-comparison)と[線束コホモロジーの公式](../../../代数系/AG/AG3-08/index.md#thm-ag3-08-p1-cohomology)から $H^1(\mathbb P^1,\mathcal O(4))=0$ であり、$\alpha_{ij}=b_j-b_i$ と書ける。$s_i$ を $s_i-\iota\circ b_i$ に直すと差は零になり、大域的な右逆が得られる。よって

$$
TX|_C\simeq\mathcal O(2)\oplus\mathcal O(-2),\qquad
(h^0,h^1)=(3+0,0+1)=(3,1).
$$

法方向の一次変分は $H^0(N_{C/X})=H^0(\mathcal O(-2))=0$。従って曲線の像は法方向に一次的には動けないが、非零の障害空間を持つ。[凸性の定義](#def-gw1-09-convex)を満たさないことはこの一つの写像で十分に示せる。
<!-- solution-end -->

<a id="ex-gw1-09-b04"></a>
#### GW1-09-B04 接Euler列と標点の次元を照合する
- Level: B

$\mathbb P^3$ への次数2写像に三つの相異なる標点を付け、写像と標点の組の自己同型が有限とする。$h^0$、$h^1$、商の局所次元を二通りの式で計算せよ。

<!-- solution-start -->
**詳細解答**。[射影空間の凸性と変形次元](#thm-gw1-09-projective-convex)に $n=3,d=2$ を代入すると

$$
h^0(E)=4\cdot3-1=11,\qquad h^1(E)=0.
$$

三標点の自由度を加え、再パラメータ化群の三次元を差し引くと商の局所次元は $11+3-3=11$。

一方、[接Euler列](../../../代数系/AG/AG2-09/index.md#thm-ag2-09-tangent-euler)の短完全列で行列式を取る。$H=c_1(\mathcal O(1))$ を超平面類と書くと、

$$
\det(T\mathbb P^3)\simeq\mathcal O(1)^{\otimes4}=\mathcal O(4),
\qquad c_1(T\mathbb P^3)=4H.
$$

次数2という仮定は $\langle H,\beta\rangle=2$ を意味するため、

$$
\langle c_1(T\mathbb P^3),\beta\rangle
=4\langle H,\beta\rangle=4\cdot2=8.
$$

[局所次元の命題](#prop-gw1-09-smooth-map-locus)へ代入すれば

$$
m-3+c_1(T\mathbb P^3)\cdot\beta+k
=3-3+8+3=11,
$$

となり、二通りの計算が一致する。
<!-- solution-end -->

### Level C

<a id="ex-gw1-09-c01"></a>
#### GW1-09-C01 凸な標的の二成分境界と非凸反例を比較する
- Level: C

次の全てを示せ。

1. $X=\mathbb P^1$ とし、二つの球面 $C_1,C_2$ を一節点でつなぎ、それぞれの節点を座標0として $u_1(z)=z$、$u_2(w)=w$ で写す。標点はない。この写像が安定であること、固定した節点付き定義域上の $h^0,h^1$ を求めよ。
2. この二成分写像の**節点を保ったまま**のパラメータ付き変形に対する再パラメータ化の自由度を数え、節点型の局所次元を求めよ。滑らかな次数2写像の局所次元と比較せよ。
3. 一方、節8の負の切断 $C\subset X=\mathbb P_B(\mathcal O\oplus\mathcal O(-2))$ の包含について、固定定義域の $h^0,h^1$、商の実際の自由度と指数から得る期待次元の差を求め、何が凸性と違うかを説明せよ。

<!-- solution-start -->
**詳細解答**。

(1) 二つの節点は $z=w=0$ で、$u_1(0)=0=u_2(0)$ だから[安定写像の節点一致条件](../GW1-08/index.md#def-gw1-08-stable-map)を満たす。双対グラフは二頂点一辺の木で、各写像は非定数なので各成分は特殊点が節点一つでも安定である。総次数は $1+1=2$。各 $u_i^*T\mathbb P^1\simeq\mathcal O(2)$ に対し $h^0=3,h^1=0$。[節点の値一致](#prop-gw1-09-nodal-matching)は $T_0\mathbb P^1$ における一次元条件なので

$$
h^0(C,u^*TX)=3+3-1=5,\qquad h^1(C,u^*TX)=0.
$$

(2) 節点を保つ各球面の再パラメータ化は、分数線形変換群のうち0を固定する部分群である。[三点正規化](../GW1-07/index.md#thm-gw1-07-three-point)より群全体は複素次元3で、点0を固定する独立条件は一次元だから、各成分で2、合計4の自由度がある。各写像は次数1なので、写像を不変にする非自明な変換はない。従って節点型の商の局所次元は $5-4=1$。

滑らかな球面への次数2写像では[射影空間の定理](#thm-gw1-09-projective-convex)から $h^0=2(2+1)-1=5$。球面全体の再パラメータ化は三次元で、非定数写像を固定する自己同型の群は有限だから、滑らかな写像の商の局所次元は $5-3=2$。差の一つは、節点を平滑化する独立した複素パラメータに対応すると予想される。ただし、その平滑化を実際のモジュライチャートとして作るのは次講の課題であり、この次元差だけでは存在を証明できない。

(3) [負の正規束を持つ射影標的は凸でない](#prop-gw1-09-nonconvex)から $u^*TX\simeq\mathcal O(2)\oplus\mathcal O(-2)$。したがって $h^0=3,h^1=1$。$H^0(\mathcal O(-2))=0$ なので法方向の一次変形は存在せず、$H^0(\mathcal O(2))$ の三次元は曲線の再パラメータ化に対応する。従って写像を割った実際の局所自由度は0。一方、指数は $h^0-h^1=2$ で、三次元の再パラメータ化を引くと期待次元は $-1$。凸標的では $H^1=0$ なので期待次元と一次変形の差は生じないが、この例では障害空間の一次元が差を生んでいる。従って単に曲線の集合を数えることだけで期待次元の基本類を作れるとは限らない。
<!-- solution-end -->

## 10. 次講で解決すること

今回、[凸性](#def-gw1-09-convex)は球面写像の $H^1$ を消す条件だと定め、$\mathbb P^n$ とGrassmann多様体で実際に確かめた。[一次変形と障害](#prop-gw1-09-first-order)、[滑らかな定義域の局所自由度](#prop-gw1-09-smooth-map-locus)、[節点の値一致](#prop-gw1-09-nodal-matching)も計算した。しかし「各写像で障害が消える」ことと「自己同型を持つ節点付き写像全体が、適切な次元の滑らかなDeligne–Mumfordスタックをなす」ことは同じ主張ではない。

次の **GW1-10「モジュライの構成と次元」**では、節点平滑化、局所変形チャート、有限自己同型による商、貼り合わせを組み合わせる。この章の $H^1$ 計算はそのための入力である。
