# CAG1-09 Chowの定理と解析的射の代数性

前章の[射影版GAGAの圏同値](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)で、射影スキーム上の解析的連接層とその射を代数的に戻せるようになった。しかし幾何学の対象は層だけではない。射影空間内で**正則関数の零点**として切り出された図形は、多項式で切り出せるのだろうか。また、二つの射影多様体を結ぶ**正則写像**が、実は代数的写像であると証明できるだろうか。

この二つの問いの間に、閉解析部分集合の「消える関数を全部集めた層」がある。層の連接性という解析的な入力とGAGAの圏同値を組み合わせると、**射影的な零点集合の代数性**が証明できる。最後に写像を対応する点の対の集合として考え、同じ結論を線束と大域切断からも構成して、どこで射影性・分離性を使ったか確かめる。

以下、基礎体は $\mathbb C$ とし、$P=\mathbb P^n_{\mathbb C}$、$P^{\mathrm{an}}=\mathbb{CP}^n$ と書く。「閉解析部分集合」は局所的に有限個の正則関数の共通零点として表される閉集合を指す。射影的、固有、分離という条件は同義ではない。

## 1. 零点集合からイデアル層へ

アフィン座標 $z$ 上の点 $\{0\}$ は $z=0$ と $z^2=0$ のどちらからも生じる。だが商環 $\mathbb C\{z\}/(z)$ と $\mathbb C\{z\}/(z^2)$ は異なり、後者には非零の冪零元がある。図形の点集合だけでなく、正則関数がどのように消えるかを層として覚えておく。

<a id="def-cag1-09-vanishing-ideal"></a>

<!-- formal-statement-start -->
> **定義（閉解析部分集合の消滅イデアル層）**
> $M$ を複素多様体、$Z\subset M$ を閉解析部分集合とする。各開集合 $U\subset M$ に対し、$U\cap Z$ 上で恒等的に零となる正則関数の集合を

$$
\mathcal I_Z(U)
=\{g\in\mathcal O_M(U):g|_{U\cap Z}=0\}
$$

> と置く。これは $\mathcal O_M$ のイデアル層であり、**消滅イデアル層**という。商層 $\mathcal O_M/\mathcal I_Z$ は $Z$ に自然な被約解析空間の構造を与える。
<!-- formal-statement-end -->

消滅イデアル層の定義で「すべての消える正則関数」を取ることと、最初に与えた方程式の生成イデアルを取ることは別である。例えば $z^2$ という方程式から作る商のイデアルは $(z^2)$ だが、点集合 $\{0\}$ の消滅イデアルは $(z)$ である。

<!-- definition-example-start: def-cag1-09-vanishing-ideal -->
**定義の確認**：$P^1=\mathbb P^1_{\mathbb C}$ に座標 $[S:T]$ を取り、$p=[0:1]$ とする。$T\ne0$ のチャートで $w=S/T$ とすれば、$p$ で消える正則関数の芽は $g(w)=w h(w)$ と書ける。これは収束級数の定数項が零であることから従う。したがって $(\mathcal I_p)_p=(w)$ であり、他の点ではイデアルは構造層全体である。

代数側でも斉次一次式 $S$ による射 $\mathcal O_{P^1}(-1)\xrightarrow{\cdot S}\mathcal O_{P^1}$ の像が点 $p$ のイデアル層であり、$T\ne0$ では $w$ 倍、$S\ne0$ では単元倍になる。商は $p$ で $\mathbb C\{w\}/(w)\simeq\mathbb C$。一方、$(w^2)$ の商には非零元 $\bar w$ があり $\bar w^2=0$。定義の二種類のイデアルを手で区別できた。
<!-- definition-example-end -->

「点集合が同じ」でも厚みの異なる方程式を保持したい場合には、最初に与えたイデアルをそのまま構造層に使う。

<a id="def-cag1-09-analytic-subspace"></a>

<!-- formal-statement-start -->
> **定義（閉解析部分空間）**
> 複素多様体 $M$ 上の[解析的連接層](../CAG1-03/index.md#def-cag1-03-analytic-coherent)であるイデアル層 $\mathcal J\subset\mathcal O_M$ に対し、その零点集合を台とし、構造層を $\mathcal O_M/\mathcal J$ とする解析空間を **閉解析部分空間** と呼ぶ。$\mathcal J=\mathcal I_Z$ の場合は被約だが、一般には冪零元が残ってよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-09-analytic-subspace -->
**定義の確認**：$M=\mathbb C$、$\mathcal J=(z^2)$ とする。零点は $\{0\}$ だが、原点での商は $\mathbb C\{z\}/(z^2)$ となり、$\bar z\ne0$、$\bar z^2=0$ である。一方 $\mathcal I_{\{0\}}=(z)$ では商は $\mathbb C$。どちらもイデアルが一つの正則関数で生成され、[Okaの連接性](../CAG1-03/index.md#thm-cag1-03-oka-coherence)により連接という条件を満たす。したがって台集合が同じでも閉解析部分空間として異なる。
<!-- definition-example-end -->

### 解析側の深い入力を分離する

$Z$ が有限個の正則方程式で局所的に与えられるとしても、**全ての消滅関数の層** $\mathcal I_Z$ が局所有限表示を持つことは、方程式の個数を数えるだけでは証明できない。この点は、前章までの[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)ではなく解析的定理が支える。

<a id="thm-cag1-09-ideal-coherence"></a>

<!-- formal-statement-start -->
> **定理（Cartan–Okaの解析的イデアル層連接性：外部入力）**
> $M$ を複素多様体、$Z\subset M$ を閉解析部分集合とする。このとき消滅イデアル層 $\mathcal I_Z$ は $\mathcal O_M$-加群として解析的連接であり、商層 $\mathcal O_M/\mathcal I_Z$ も解析的連接である。
<!-- formal-statement-end -->

これは一般の解析集合に対する**Cartan–Okaのイデアル連接性定理**を外部入力として引用したもので、ここでは証明しない。[Okaの構造層連接性](../CAG1-03/index.md#thm-cag1-03-oka-coherence)と密接に関係するが、定義に現れた消滅イデアルが連接であるという結論を、その一文だけで自明としない。以後の代数化の議論はこの入力を置いた**相対的な証明**である。原典の射程は[SerreのGAGA論文](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/)と関連する解析的連接性理論を参照。

## 2. Chowの定理――解析的零点集合が代数的になる

射影空間の中では、正則関数による局所方程式がどんなに複雑でも、全体の零点集合には斉次多項式の方程式が存在する。ただし「各チャートの正則関数が多項式に変わる」と主張しているのではない。**同じ閉部分空間を定めるイデアル層を代数的に復元**するのである。

<a id="thm-cag1-09-chow"></a>

<!-- formal-statement-start -->
> **定理（Chowの定理）**
> $n\ge0$ とし、$Z\subset\mathbb{CP}^n$ を閉解析部分集合とする。このとき、有限個の斉次多項式 $F_1,\ldots,F_r\in\mathbb C[S_0,\ldots,S_n]$ が存在して

$$
Z=\{[S_0:\cdots:S_n]\in\mathbb{CP}^n:
F_1(S)=\cdots=F_r(S)=0\}
$$

> が集合として成り立つ。さらに、被約な解析空間構造 $\mathcal O/\mathcal I_Z$ は射影的な被約 $\mathbb C$-閉部分スキームの解析化として得られる。
<!-- formal-statement-end -->

### 証明の見取り図

消滅イデアル $\mathcal I_Z$ は[Cartan–Okaの定理](#thm-cag1-09-ideal-coherence)で連接である。$P$ が射影的なので[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)がこの**層そのもの**を代数化する。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で包含射も代数化し、[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)で代数側の単射性を確かめる。この一連の操作により代数的なイデアル層ができる。

<!-- proof-start -->
### 証明

まず $n=0$ なら $P=\mathbb P^0_{\mathbb C}$ は一点で、閉解析部分集合は空集合か全体だけである。それぞれ定数斉次式 $1$、$0$ の零点として表せ、被約構造の主張も直ちに成立する。以下は $n\ge1$ とする。

$\mathcal I_Z\hookrightarrow\mathcal O_{P^{\mathrm{an}}}$ を考える。これらは解析的連接層である。射影性の仮定のもと、[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)から代数的連接層 $\mathcal F$ と同型 $\alpha:\mathcal F^{\mathrm{an}}\xrightarrow{\sim}\mathcal I_Z$ を取れる。

解析的な合成射

$$
\mathcal F^{\mathrm{an}}
\xrightarrow{\alpha}\mathcal I_Z
\hookrightarrow\mathcal O_{P^{\mathrm{an}}}
$$

は、[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)によって、ただ一つの代数的な層の射 $u:\mathcal F\to\mathcal O_P$ の解析化である。

この $u$ が単射であることも確認する。$\mathcal K=\ker u$ は代数的連接層である。[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)から次を得る。

$$
\mathcal K^{\mathrm{an}}\simeq\ker u^{\mathrm{an}}=0.
$$

各複素閉点 $x$ では、解析化の茎を取ると

$$
\mathcal K_x\otimes_{\mathcal O_{P,x}}
\mathcal O_{P^{\mathrm{an}},x}=0.
$$

[局所環の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)より $\mathcal K_x=0$ となる。非零連接層の支持はNoetherスキーム $P$ 上の非空閉集合で複素閉点を含むため、$\mathcal K=0$ と従う。

よって $\mathcal F$ を $u$ の像 $\mathcal J\subset\mathcal O_P$ と同一視できる。$u$ は $\mathcal O_P$-線形だから $\mathcal J$ はイデアル層である。[Noetherスキームの連接性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)により商 $\mathcal O_P/\mathcal J$ は連接で、対応する閉部分スキーム $Y\hookrightarrow P$ を定める。

再び[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)を次の完全列に適用する。

$$
0\to\mathcal J\to\mathcal O_P\to\mathcal O_Y\to0.
$$

右側に得られる解析的完全列は $\mathcal J^{\mathrm{an}}\simeq\mathcal I_Z$ という**包含射と両立する**同型のため、$\mathcal O_{Y^{\mathrm{an}}}\simeq\mathcal O_{P^{\mathrm{an}}}/\mathcal I_Z$ を与える。したがって解析的閉部分空間として $Y^{\mathrm{an}}=Z$ である。

有限個の斉次方程式が得られる方向も確認する。代数的連接イデアル $\mathcal J\subset\mathcal O_P$ に[十分高いねじりの大域生成](../CAG1-05/index.md#lem-cag1-05-finite-twist)を適用し、$m\ge0$ を十分大きく取る。合成

$$
\mathcal O_P^{\oplus r}\twoheadrightarrow\mathcal J(m)
\hookrightarrow\mathcal O_P(m)
$$

の各成分は $\mathcal O_P(m)$ の大域切断であり、[射影空間上の切断表示](../../AG/AG2-06/index.md#thm-ag2-06-pn-sections)から次数 $m$ の斉次多項式 $F_1,\ldots,F_r$ に対応する。$\mathcal O_P(-m)$ で戻すと $F_i$ の生成するイデアル層がちょうど $\mathcal J$ になる。[斉次商環の閉埋込み](../../AG/AG3-09/index.md#thm-ag3-09-homogeneous-quotient)とも一致し、これらの解析的共通零点が $Z$ となる。

さらに、$Z$ は点集合上で消える**全て**の関数から消滅イデアル層を作ったので、解析側の商 $\mathcal O_{P^{\mathrm{an}}}/\mathcal I_Z$ は被約である。各複素閉点 $x$ における代数側と解析側の商局所環を

$$
A=\mathcal O_{P,x}/\mathcal J_x,
\qquad B=\mathcal O_{P^{\mathrm{an}},x}/(\mathcal J^{\mathrm{an}})_x
$$

と置く。上の完全列から

$$
A\otimes_{\mathcal O_{P,x}}\mathcal O_{P^{\mathrm{an}},x}
\simeq B
$$

であり、$A\to B$ は[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)により単射となる。$A$ の元が冪零なら、その像は被約環 $B$ で零だから、元も零である。全複素閉点の局所環が被約なので $Y$ は被約である。これで構造層まで含む主張が従う。
<!-- proof-end -->

証明の核心は、$\mathcal F$ を層として戻しただけでは**イデアル**と断言せず、包含射を戻して、その核が零であることまで確認した点にある。これは[GAGAの圏同値](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)が対象と射の両方を復元することの幾何学的な使い道である。

### 閉解析部分空間まで拡張する

上の定理は被約な**集合** $Z$ から始めた。一方、最初から冪零元を持つ解析的なイデアル $\mathcal J_{\mathrm{an}}$ が与えられていても、同じ議論は働く。ただし「冪零元を消してから扱う」必要はない。

<a id="prop-cag1-09-subspace-algebraization"></a>

<!-- formal-statement-start -->
> **命題（閉解析部分空間の代数化）**
> $W\hookrightarrow(\mathbb P^n_{\mathbb C})^{\mathrm{an}}$ を、連接なイデアル層 $\mathcal J_{\mathrm{an}}\subset\mathcal O_{P^{\mathrm{an}}}$ で定まる閉解析部分空間とする。すると、ある閉部分スキーム $Y\hookrightarrow\mathbb P^n_{\mathbb C}$ が存在し、埋め込みを保って $Y^{\mathrm{an}}\simeq W$ となる。$W$ は非被約でもよい。
<!-- formal-statement-end -->

### 証明の見取り図

被約性が必要だったのは、零点集合から $\mathcal I_Z$ を作る出発部分だけである。すでに連接イデアルがあるなら、Chowの定理の証明中の層・包含射・核・商の操作をそのまま繰り返せばよい。

<!-- proof-start -->
### 証明

連接層 $\mathcal J_{\mathrm{an}}$ を[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で $\mathcal F^{\mathrm{an}}$ と同一視する。包含射を[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で $u:\mathcal F\to\mathcal O_P$ へ持ち上げる。

解析的に核が零なので、[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)から $u$ の核も零である。像 $\mathcal J$ は代数的連接イデアルとなる。

したがって $\mathcal O_P/\mathcal J$ の解析化は $\mathcal O_{P^{\mathrm{an}}}/\mathcal J_{\mathrm{an}}$ になる。これが求める閉部分スキーム $Y$ の構造層であり、冪零元の有無を変えていない。
<!-- proof-end -->

**手で見る例**：$P^1$ の $p=[0:1]$ で $\mathcal J_{\mathrm{an}}=(w^2)$ とする。代数側は $S^2:\mathcal O(-2)\to\mathcal O$ の余核で局所環 $\mathbb C[w]_{(w)}/(w^2)$ を持つ。[非被約二重点のGAGA](../CAG1-08/index.md#prop-cag1-08-double-point)と同様、解析側の $\mathbb C\{w\}/(w^2)$ は $1,\bar w$ を基底とし $\bar w^2=0$。点集合だけを代数化するとこの一次項が失われる。

## 3. 正則写像を「グラフ」という部分空間に変える

閉解析集合の代数性が分かったので、写像を**そのグラフという集合**として扱いたい。$f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ が正則なら、グラフは $X^{\mathrm{an}}\times Y^{\mathrm{an}}$ の中にある。しかしグラフが閉であるためには、標的の点を解析的に分離できることを使う。

<a id="def-cag1-09-graph"></a>

<!-- formal-statement-start -->
> **定義（正則写像のグラフ）**
> 複素解析空間 $A,B$ と正則写像 $f:A\to B$ に対し、グラフは

$$
\Gamma_f=\{(x,f(x)):x\in A\}\subset A\times B
$$

> である。$A$ から $\Gamma_f$ への $x\mapsto(x,f(x))$ と第一射影 $\Gamma_f\to A$ は互いに逆の正則写像であり、グラフに与えた自然な解析空間構造の同型をなす。
<!-- formal-statement-end -->

グラフを定義した意図は、写像 $f$ を「二つの射影空間の積の中の閉解析部分集合」に置き換えてChowを適用することである。特に $B$ が射影代数多様体の解析化なら、$B$ はHausdorffであり、グラフの閉性が保証される。

<!-- definition-example-start: def-cag1-09-graph -->
**定義の確認**：$f:\mathbb P^1\to\mathbb P^1$ を $[S:T]\mapsto[S^2:T^2]$ で与える。二つ目の点の座標を $[U:V]$ と書く。二つの射影点 $[U:V]$ と $[S^2:T^2]$ が一致する条件は、どちらの座標対も零対でないことを前提として $UT^2=VS^2$ である。この比例条件を、始域と標的にそれぞれ斉次な方程式へ書き直すと

$$
\Gamma_f=V(UT^2-VS^2)\subset\mathbb P^1\times\mathbb P^1.
$$

$S,T$ は同時に零にならないので、固定した $[S:T]$ に対する第二成分は一意である。$T\ne0$ なら方程式から $V\ne0$ となる。局所座標 $t=S/T$、$v=U/V$ での式は

$$
v=t^2,\qquad t\longmapsto(t,t^2)
$$

で、右辺は第一射影の逆を表す。$S\ne0$ の側では $U\ne0$、局所座標 $s=T/S$、$u=V/U$ に対して

$$
u=s^2,\qquad s\longmapsto(s,s^2)
$$

となる。二つの逆写像は重なりで同じ $f$ を表すため、解析空間構造も含めて第一射影が同型である。
<!-- definition-example-end -->

<a id="prop-cag1-09-graph-algebraization"></a>

<!-- formal-statement-start -->
> **命題（正則グラフの閉性と代数化）**
> $X,Y$ を $\mathbb C$ 上の射影代数多様体、$f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ を正則写像とする。$\Gamma_f$ は $(X\times_{\mathbb C}Y)^{\mathrm{an}}$ の閉解析部分集合であり、ある代数的な閉部分多様体 $G\subset X\times_{\mathbb C}Y$ の解析化として得られる。
<!-- formal-statement-end -->

### 証明の見取り図

標的 $Y^{\mathrm{an}}$ のHausdorff性でグラフが閉じ、局所正則座標では $y_j-f_j(x)=0$ で解析的に定義される。積 $X\times Y$ は[Segre写像の像の定理](../../AG/AG2-03/index.md#thm-ag2-03-segre-minors)で射影的になるので、[Chowの定理](#thm-cag1-09-chow)を適用できる。

<!-- proof-start -->
### 証明

$Y^{\mathrm{an}}$ は射影空間の閉部分空間なのでHausdorffである。$\Gamma_f$ は連続写像 $(x,y)\mapsto(f(x),y)$ の下で $Y^{\mathrm{an}}\times Y^{\mathrm{an}}$ の対角集合の逆像として表される。Hausdorff性により対角集合は閉だから $\Gamma_f$ も閉である。

$Y$ が特異な場合も、その点の近傍を正則関数による方程式で複素座標空間へ埋め込める（[複素解析空間の局所定義](../CAG1-02/index.md#def-cag1-02-analytic-subspace)）。その周囲の座標を $y_1,\ldots,y_r$、$f$ の局所表示を $f_j(x)$ とすると、積の中のグラフは $Y$ の方程式と $y_j-f_j(x)=0$ の共通零点になる。これは第一射影の逆 $x\mapsto(x,f(x))$ も正則であることを同時に示す。よって閉解析部分集合である。

代数側で $X\subset\mathbb P^a$、$Y\subset\mathbb P^b$ という閉埋込みを選ぶ。必要なら座標を増やして $a,b\ge1$ とできる。[Segre写像の像の定理](../../AG/AG2-03/index.md#thm-ag2-03-segre-minors)は $([a_i],[b_j])\mapsto[a_ib_j]$ の像を二次小行列式の零点で表し、局所逆も与える。従って $X\times Y$ は射影空間の閉部分空間となり、その中の $\Gamma_f$ も閉解析部分集合である。[Chowの定理](#thm-cag1-09-chow)を適用して代数的閉部分多様体 $G$ を得る。

元のグラフは被約な多様体 $X^{\mathrm{an}}$ と解析的に同型なので、対応する代数化も被約構造を選べる。
<!-- proof-end -->

**注意：点ごとの全単射を同型と混同しない。** 第一射影 $G\to X$ が複素点上全単射だからといって、それだけで代数的同型にはならない。たとえば尖点 $y^2=x^3$ の正規化 $t\mapsto(t^2,t^3)$ は点集合として一対一でも、局所環は $\mathbb C[t^2,t^3]\subsetneq\mathbb C[t]$ である。次節では、この飛躍をせず、写像の座標切断を実際に代数化する。

## 4. グラフに対応する写像を実際に作る

射影空間 $\mathbb P^m$ への正則写像は、各点で同時には消えない $m+1$ 個の正則切断の比で表せる。標的の座標 $[U_0:\cdots:U_m]$ を引き戻すには、単なる関数ではなく[ねじり層 $\mathcal O(1)$](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf) の正則線束を使う必要がある。各局所チャートで別の分母が現れるからである。

まず、解析側の正則線束を代数化した後、本当に可逆な代数的層になるのかを確かめておく。

<a id="lem-cag1-09-line-bundle-sections"></a>

<!-- formal-statement-start -->
> **補題（解析的正則線束の代数化と切断の復元）**
> $X$ を有限型射影 $\mathbb C$-スキーム、$\mathcal L_{\mathrm{an}}$ を $X^{\mathrm{an}}$ 上の階数一の局所自由解析的連接層とする（[可逆層・直線束の定義](../../AG/AG2-06/index.md#def-ag2-06-invertible-sheaf)の解析版）。このとき代数的可逆層 $\mathcal L$ が存在し、$\mathcal L^{\mathrm{an}}\simeq\mathcal L_{\mathrm{an}}$ である。また選んだ同型の下で、大域切断の比較

$$
H^0(X,\mathcal L)
\xrightarrow{\sim}
H^0(X^{\mathrm{an}},\mathcal L_{\mathrm{an}})
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)は解析的線束をまず代数的な**連接層**として戻す。可逆性の判定には[局所環の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)と、ここで有限生成加群について確認するNakayamaの補題を使う。切断の復元は[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の $q=0$ である。

<!-- proof-start -->
### 証明

[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で連接層 $\mathcal F$ と $\mathcal F^{\mathrm{an}}\simeq\mathcal L_{\mathrm{an}}$ を得る。任意の複素閉点 $x$ における $A=\mathcal O_{X,x}$、$B=\mathcal O_{X^{\mathrm{an}},x}$、$M=\mathcal F_x$ と置くと、$A\to B$ は[忠実平坦な局所準同型](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)で、$M\otimes_A B\simeq B$ である。

局所座標で $X$ を多項式方程式の商として表すと、[解析化の茎の表示](../CAG1-02/index.md#prop-cag1-02-stalk-comparison)では同じ方程式を収束冪級数環に移す。したがって両局所環の極大イデアルは座標差 $z_i-z_i(x)$ の像で生成され、$\mathfrak m_AB=\mathfrak m_B$、剰余体はともに $\mathbb C$ である。ゆえに

$$
M/\mathfrak m_A M
\simeq (M\otimes_A B)/\mathfrak m_B(M\otimes_A B)
\simeq B/\mathfrak m_B\simeq\mathbb C.
$$

従って $M/\mathfrak m_A M$ は一次元であり、その生成元を $M$ の元 $m$ に持ち上げる。ここで使うNakayamaの補題の有限生成版は、局所環 $(A,\mathfrak m)$ 上の有限生成加群 $N$ が $N=\mathfrak m N$ を満たせば $N=0$、という主張である。

実際、生成元 $n_1,\ldots,n_r$ に対して $N=\mathfrak m N$ を使い、係数 $a_{ij}\in\mathfrak m$ を選んで

$$
n_i=\sum_{j=1}^r a_{ij}n_j,
\qquad \det(I-(a_{ij}))n_i=0
$$

を得る。第二式は第一式に行列 $I-(a_{ij})$ の余因子行列を掛けたものである。行列式は法 $\mathfrak m$ で $1$ となる単元だから、全ての $n_i$ が零になる。

これを $N=M/Am$ に適用する。$N/\mathfrak m_A N=0$ だから $N=0$、従って $A\xrightarrow{1\mapsto m}M$ は全射である。$B$ へテンソルした射 $B\to M\otimes_A B\simeq B$ も全射である。局所環 $B$ 上の全射 $B\to B$ は単元による乗法だから同型であり、その核は零である。$A\to B$ の忠実平坦性により元の核も零、従って $M\simeq A$ である。

有限表示層の局所自由性は開条件で、任意の非空閉集合は複素閉点を含む。ゆえに全ての閉点の近くで階数一局所自由なら $\mathcal F$ は $X$ 全体で可逆である。これを $\mathcal L$ とする。

最後に射影性と連接性を使って[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を $\mathcal L$、$q=0$ に適用すると、表示した自然な比較写像が同型となる。
<!-- proof-end -->

この補題で、正則写像の座標切断を代数的切断として**一つずつ**戻せる。しかし射を作るには、戻した切断が各点で同時には零にならないことも必要である。

<a id="thm-cag1-09-morphism-algebraic"></a>

<!-- formal-statement-start -->
> **定理（射影多様体間の正則写像の代数性）**
> $X,Y$ を $\mathbb C$ 上の射影代数多様体とし、$f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ を正則写像とする。このとき、ただ一つの代数的射 $g:X\to Y$ が存在して $g^{\mathrm{an}}=f$ となる。ここで「射影多様体」は特異でもよいが、$X,Y$ は有限型・被約・分離とする。
<!-- formal-statement-end -->

### 証明の見取り図

$Y\hookrightarrow\mathbb P^m$ を固定する。$f$ をこの射影空間へ写すと、座標切断は正則線束 $f^*\mathcal O(1)$ の大域切断となる。[線束の代数化](#lem-cag1-09-line-bundle-sections)でこれらを代数化し、同時零点がないことを閉点で確認して代数的射を作る。最後に $Y$ の斉次方程式を切断へ代入し、解析的に零なら代数的にも零だと示す。これでグラフの点集合の全単射だけに頼らず射そのものを構成できる。

<!-- proof-start -->
### 証明

射影埋め込み $i:Y\hookrightarrow\mathbb P^m_{\mathbb C}$ を選び、$h=i^{\mathrm{an}}\circ f$ とする。射影空間の標準座標切断 $U_0,\ldots,U_m\in H^0(\mathbb P^m,\mathcal O(1))$ を引き戻すと、$\mathcal L_{\mathrm{an}}=h^*\mathcal O_{\mathbb P^m}(1)^{\mathrm{an}}$ の正則切断

$$
t_j=h^*U_j\in H^0(X^{\mathrm{an}},\mathcal L_{\mathrm{an}})
\qquad(0\le j\le m)
$$

を得る。各点 $x$ における $h(x)=[t_0(x):\cdots:t_m(x)]$ は、局所枠を選んで書いた比である。射影点の全座標が零にはならないから、$t_j$ はどの点でも同時に消えない。

[補題](#lem-cag1-09-line-bundle-sections)から代数的可逆層 $\mathcal L$ と解析化同型を選べる。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の零次比較を使い、各 $t_j$ に対応する代数的切断を一意に取る。

$$
s_j\in H^0(X,\mathcal L)\qquad(0\le j\le m).
$$

もし $s_0,\ldots,s_m$ に共通零点があれば、その零点集合は有限型 $\mathbb C$-スキーム上の非空閉集合なので複素閉点 $x$ を含む。その点で $s_j(x)=0$ が全 $j$ について成立し、解析化後も $t_j(x)=0$ となって矛盾する。

従って評価写像は全射である。

$$
\mathcal O_X^{m+1}\xrightarrow{(s_0,\ldots,s_m)}\mathcal L
$$

ここから射を作る操作を局所的に確認する。各添字 $j$ に対して、切断が消えない開集合

$$
D(s_j)=\{x\in X:s_j(x)\ne0\}
$$

を取ると、これらは $X$ を覆う。$D(s_j)$ 上では $s_j$ 自身を[可逆層の局所枠](../../AG/AG2-06/index.md#def-ag2-06-invertible-sheaf)として使える。従って $s_i/s_j$ は通常の正則関数である。$\mathbb P^m$ の $U_j\ne0$ チャートへの環の射は、座標 $U_i/U_j$ をこの正則関数へ送ることで定まる。二つのチャートが重なるところでは

$$
\frac{s_i}{s_k}=\frac{s_i/s_j}{s_k/s_j}
\qquad(s_j\ne0,\ s_k\ne0)
$$

となる。分母 $s_k/s_j$ は重なりで単元なので、これはチャート変更と一致する。この局所構成を[射の貼り合わせ定理](../../AG/AG3-04/index.md#thm-ag3-04-morphism-gluing)で貼ると、代数的射

$$
g_P:X\longrightarrow\mathbb P^m,\qquad
x\longmapsto[s_0(x):\cdots:s_m(x)]
$$

が得られる。解析化した局所座標の引戻しは $t_i/t_j=h^*(U_i/U_j)$ だから、各チャートで解析化した射は $h$ と一致する。

次に $Y\subset\mathbb P^m$ の連接イデアル層に[十分高いねじりの大域生成](../CAG1-05/index.md#lem-cag1-05-finite-twist)を使い、上の[Chowの証明](#thm-cag1-09-chow)と同じく斉次多項式 $F_\nu(U_0,\ldots,U_m)$（次数 $d_\nu$）で局所イデアルを生成する。切断の斉次式

$$
F_\nu(s_0,\ldots,s_m)\in
H^0(X,\mathcal L^{\otimes d_\nu})
$$

を考える。これを解析化すると $F_\nu(t_0,\ldots,t_m)$ である。$h(X^{\mathrm{an}})\subseteq Y^{\mathrm{an}}$ だから全点で零となり、解析側の正則線束の零切断である。

[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の比較は単射だから、代数的切断 $F_\nu(s)$ も零である。

局所枠で割った座標環の準同型は全ての $F_\nu$ を零に送る。そのため $g_P$ は閉部分スキーム $Y$ を通る射 $g:X\to Y$ に因子化し、その解析化は $f$ と一致する。

一意性も局所座標で確かめられる。$g_1,g_2:X\to Y$ の解析化が一致するとし、$Y$ を射影空間に埋め込む。各標準チャートの逆像が複素閉点上で一致するので、それらの開集合も一致する（異なるなら差は非空な局所閉集合となり、有限型 $\mathbb C$-スキーム上では複素閉点を含む）。そこで座標関数 $U_i/U_j$ の二つの引戻しは全ての複素閉点で等しい。$X$ が**被約**だから、その差は各アフィン開上で零であり、[射の貼り合わせ](../../AG/AG3-04/index.md#thm-ag3-04-morphism-gluing)により $g_1=g_2$ となる。
<!-- proof-end -->

この証明は**Chowの定理を仮定して射を作ったわけではない**。GAGA I・IIIから直接射を構成した。前節のグラフの代数化と合わせると、構成した代数的射のグラフの解析化は $\Gamma_f$ に一致するため、Chowで得た代数的閉部分多様体 $G$ とも同一になる。これで「グラフの代数化」と「射の代数化」が閉部分空間の構造まで一致する。

### 手計算：二次Veronese写像

$X=\mathbb P^1$、$\mathcal L=\mathcal O_{\mathbb P^1}(2)$ とし、$s_0=S^2$、$s_1=ST$、$s_2=T^2$ を取る。同時零点はなく、射

$$
v_2:\mathbb P^1\longrightarrow\mathbb P^2,\qquad
[S:T]\longmapsto[S^2:ST:T^2]
$$

を定める。標的の座標を $[U:V:W]$ とすると、

$$
UW-V^2=S^2T^2-(ST)^2=0.
$$

ゆえに像は二次曲線 $Q=V(UW-V^2)$ に含まれる。$T\ne0$ の座標 $t=S/T$ では $v_2(t)=[t^2:t:1]$ となり、標的チャート $W\ne0$ で $u=U/W=t^2$、$v=V/W=t$ と復元できる。この計算は「切断を代数化する」「標的の斉次方程式が零になる」という証明の二段階を具体化する。

## 5. どの仮定を落とすと壊れるか

定理の射影性は単なる慣習ではない。**閉性の議論**には標的のHausdorff性（代数側の分離性）が重要で、**Chowの適用**には $X\times Y$ の射影性が重要である。**切断の復元**には始域 $X$ の射影性がGAGA I・IIIの仮定として必要である。射影的なら固有だが、一般の固有スキームへ射影版の証明を移すには[固有版GAGA](../CAG1-08/index.md#thm-cag1-08-proper-gaga)という別の深い入力が要る。

<a id="prop-cag1-09-affine-counterexample"></a>

<!-- formal-statement-start -->
> **命題（非固有直線上の正則写像の非代数性）**
> $\mathbb A^1_{\mathbb C}$ の解析化 $\mathbb C$ から $\mathbb P^1(\mathbb C)$ への正則写像

$$
f(z)=[1:e^z]
$$

> は、いかなる代数的射 $\mathbb A^1_{\mathbb C}\to\mathbb P^1_{\mathbb C}$ の解析化でもない。
<!-- formal-statement-end -->

### 証明の見取り図

像は標的の $U\ne0$ チャートに入り、そこで座標 $V/U$ は $e^z$ になる。代数的射がこのチャートへ因子化するなら、その座標は $\mathbb C[z]$ の元でなければならない。

<!-- proof-start -->
### 証明

もし代数的射 $g:\mathbb A^1_{\mathbb C}\to\mathbb P^1_{\mathbb C}$ が $g^{\mathrm{an}}=f$ を満たすとする。$f$ の第一斉次座標は常に $1\ne0$ なので、$g$ の像も $U\ne0$ のアフィンチャートに含まれる。これは $\mathbb A^1$ の全複素閉点が $g^{-1}(U\ne0)$ に属し、その補集合である閉集合が空だからである。したがって $g$ はアフィン直線への射で、座標環の準同型 $\mathbb C[w]\to\mathbb C[z]$ は $w\mapsto p(z)$（ある多項式 $p$）となる。

解析化すると $p(z)=e^z$ が全ての複素数 $z$ で成立する。特に $p(0)=1$ なので $p$ は零多項式でなく、その次数を $d\ge0$ と置ける。$z$ を微分変数とする $d+1$ 階導関数を比較すると、

$$
\left.\frac{d^{d+1}}{dz^{d+1}}e^z\right|_{z=0}=1,
\qquad \frac{d^{d+1}}{dz^{d+1}}p(z)=0
$$

となって矛盾する。左辺は指数関数を何回微分しても同じ関数となること、右辺は多項式の次数が $d$ であることを使った。
<!-- proof-end -->

また、始域がコンパクト複素多様体というだけでは、それが射影代数多様体の解析化であるとは限らない。**Chowの定理は「すでに射影空間の中にある」閉解析集合についての定理**である。コンパクト性だけを理由に、任意の複素多様体へ代数性を宣言してはならない。

## 6. 演習と詳細解答

### Level A

<a id="ex-cag1-09-a01"></a>
#### CAG1-09-A01 一点のイデアル層を二つのチャートで確認する
- Level: A

$P^1$ の $p=[0:1]$ を考える。$S:\mathcal O(-1)\to\mathcal O$ が $p$ の消滅イデアルを与えることを、$T\ne0$、$S\ne0$ の両チャートで示し、商層の非零な茎を求めよ。

<!-- solution-start -->
**詳細解答**。$T\ne0$ では $w=S/T$ とし、$\mathcal O(1)$ の局所枠を $T$ として射を自明化すると $S=wT$ だから乗法は $w$。像は $(w)$ で、$p$ における代数的な商の茎は

$$
\mathbb C[w]_{(w)}/(w)\simeq\mathbb C.
$$

$S\ne0$ では $S$ が $\mathcal O(1)$ の局所枠なので乗法は $1$、商は零である。両チャートでの像を貼れば点 $p$ のイデアル層となる。解析化では $\mathbb C[w]_{(w)}$ を正則関数の芽 $\mathbb C\{w\}$ へ移すので、商の茎は $\mathbb C\{w\}/(w)\simeq\mathbb C$ で変わらない。$p$ 以外では像が単位イデアルだから、$(\mathcal I_p)^{\mathrm{an}}=\mathcal I_{\{p\}}$ である。[消滅イデアルの定義](#def-cag1-09-vanishing-ideal)を直接検算した。
<!-- solution-end -->

<a id="ex-cag1-09-a02"></a>
#### CAG1-09-A02 点集合と二重構造を区別する
- Level: A

$p=[0:1]\in\mathbb P^1$ とする。$S$ と $S^2$ が定める閉部分スキームの解析的台集合、$p$ での構造層の茎、複素ベクトル空間としての長さをそれぞれ比較せよ。

<!-- solution-start -->
**詳細解答**。いずれも台集合は $\{p\}$。$T\ne0$ で $w=S/T$ とすると商局所環は順に $\mathbb C\{w\}/(w)\simeq\mathbb C$ と $\mathbb C\{w\}/(w^2)$。前者の長さは1、後者は $1,\bar w$ を基底に持ち長さ2で、$\bar w\ne0$ かつ $\bar w^2=0$。後者は被約ではない。[閉解析部分空間の代数化](#prop-cag1-09-subspace-algebraization)はこの冪零元を保存するが、単に集合にChowを適用しただけでは区別できない。
<!-- solution-end -->

<a id="ex-cag1-09-a03"></a>
#### CAG1-09-A03 二乗写像のグラフを座標で検算する
- Level: A

$f([S:T])=[S^2:T^2]$ のグラフが $\mathbb P^1\times\mathbb P^1$ で $UT^2-VS^2=0$ と書けることを示せ。$S\ne0$ と $T\ne0$ のチャートで第一射影が同型であることも確かめよ。

<!-- solution-start -->
**詳細解答**。二つ目の点を $[U:V]$ とする。$[U:V]=[S^2:T^2]$ は、両座標対が非零という条件の下で比例条件 $UT^2-VS^2=0$ と同値である。

$T\ne0$ なら方程式から $V\ne0$ であり、$t=S/T$、$v=U/V$ と置くと $v=t^2$。逆は $t\mapsto(t,t^2)$ となる。$S\ne0$ なら $U\ne0$ であり、$s=T/S$、$u=V/U$ と置くと $u=s^2$。逆は $s\mapsto(s,s^2)$ となる。両方の逆写像は重なりで同じ $f$ を与える。[グラフの定義](#def-cag1-09-graph)の解析的同型を局所計算で確かめた。
<!-- solution-end -->

<a id="ex-cag1-09-a04"></a>
#### CAG1-09-A04 全単射だけでは同型にならない
- Level: A

アフィン尖点 $C=V(y^2-x^3)$ と写像 $\nu:\mathbb A^1\to C$、$t\mapsto(t^2,t^3)$ を考える。$\nu$ が複素点上全単射であること、しかし同型でないことを局所環から示せ。

<!-- solution-start -->
**詳細解答**。まず単射性を確かめる。$\nu(t)=\nu(s)$ なら $t^2=s^2$、$t^3=s^3$。$t=0$ なら $s=0$。非零なら $t/s$ の二乗も三乗も $1$ なので $t=s$ である。

次に任意の $(x,y)\in C(\mathbb C)$ を取る。$x=0$ なら $y=0$ で原点となる。$x\ne0$ なら $t=y/x$ と置き、曲線の式から

$$
t^2=\frac{y^2}{x^2}=x,
\qquad t^3=tx=y
$$

を得るので全射でもある。しかし尖点の局所環の射

$$
\mathbb C[t^2,t^3]_{(t^2,t^3)}
\longrightarrow\mathbb C[t]_{(t)}
$$

は全射でない。左辺の分子・分母はともに $t$ の一次項を持たず、分母の定数項は非零なので、その商も一次項を持たない。一方、右辺の $t$ は一次係数が $1$ である。従って局所環は同型でなく、スキーム同型でもない。
<!-- solution-end -->

<a id="ex-cag1-09-a05"></a>
#### CAG1-09-A05 閉性の仮定を見つける
- Level: A

複素解析空間 $A$ とHausdorff複素解析空間 $B$ の正則写像 $f:A\to B$ に対し、$\Gamma_f$ が閉集合であることを対角集合から証明せよ。さらに $A=\mathbb C$、$B=\mathbb P^1(\mathbb C)$ の $z\mapsto[1:e^z]$ にもこの閉性があるのに、代数性が従わない理由を述べよ。

<!-- solution-start -->
**詳細解答**。連続写像 $\Phi:A\times B\to B\times B$ を、$(x,y)\mapsto(f(x),y)$ で定める。グラフは $\Gamma_f=\Phi^{-1}(\Delta_B)$ と書ける。

Hausdorff性から二点は互いに交わらない近傍で分離でき、$\Delta_B$ の補集合はそのような開直積で覆われる。従って $\Delta_B$ は閉で、その逆像 $\Gamma_f$ も閉である。

しかし $A=\mathbb C$ は $\mathbb A^1$ の解析化であり、始域が射影的でない。射影積内のChowや始域上のGAGA I・IIIの仮定を満たさないので、[非代数性の命題](#prop-cag1-09-affine-counterexample)と矛盾しない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-09-b01"></a>
#### CAG1-09-B01 二点の解析的消滅イデアルを代数化する
- Level: B

$P^1$ で $p=[0:1]$、$q=[1:1]$ とし、$Z=\{p,q\}$ とする。$T\ne0$ の座標 $w=S/T$ で $\mathcal I_Z$ の局所生成元を求め、斉次二次式を使って代数的イデアル層を構成せよ。もう一方のチャートでも零点が増えないことを確認せよ。

<!-- solution-start -->
**詳細解答**。$p,q$ は $w=0,1$ に対応する。両点で消える正則関数 $h(w)$ は各零点で一次因子を持つ。実際、$w=0$ の近くでは $h(w)=w a(w)$、$w=1$ の近くでは $h(w)=(w-1)b(w)$ と書け、他方の因子はそれぞれ単元である。従って二点の近傍では消滅イデアルは $(w(w-1))$、それ以外では単位イデアルとなる。

斉次化すると $F(S,T)=S(S-T)$ であり、代数的層の射

$$
\mathcal O_{P^1}(-2)\xrightarrow{\cdot S(S-T)}\mathcal O_{P^1}
$$

の像を取ればよい。$T\ne0$ で $F/T^2=w(w-1)$ となる。$S\ne0$ では $v=T/S$ として $F/S^2=1-v$ だから零点は $v=1$（すでに $q$）だけで、無限遠点 $[1:0]$ は零点ではない。ゆえに解析化したイデアルは $\mathcal I_Z$ と一致する。[Chowの定理](#thm-cag1-09-chow)の抽象的な代数化を次数二で実現した。
<!-- solution-end -->

<a id="ex-cag1-09-b02"></a>
#### CAG1-09-B02 二次曲線を三つの切断から構成する
- Level: B

$P^1$ 上の $\mathcal O(2)$ の三切断 $S^2,ST,T^2$ から $P^2$ への射を作り、標的の斉次式 $UW-V^2$ が引き戻しで零になることを示せ。$T\ne0$ のチャートで像の局所方程式と逆写像を求めよ。

<!-- solution-start -->
**詳細解答**。$S^2$ と $T^2$ は同時に零でないので、三切断に共通零点がない。従って $\mathcal O^3\to\mathcal O(2)$ は全射で、[切断比による局所構成](#thm-cag1-09-morphism-algebraic)により代数的射

$$
v_2([S:T])=[S^2:ST:T^2]
$$

が得られる。標的方程式の引戻しは

$$
(UW-V^2)(S^2,ST,T^2)=S^2T^2-S^2T^2=0.
$$

$T\ne0$ で $t=S/T$ と置くと像は $[t^2:t:1]$。$W\ne0$ の局所座標 $u=U/W$、$v=V/W$ では、$u-v^2=0$ なので逆写像は $(u,v)\mapsto t=v$ である。

$S\ne0$ では $s=T/S$ とし、$U\ne0$ の座標を $a=V/U$、$b=W/U$ とする。このとき局所計算は

$$
(a,b)=(s,s^2),\qquad b-a^2=0,
\qquad (a,b)\longmapsto s=a
$$

である。両側で座標環の同型を作ったため、点集合の一致だけではない。
<!-- solution-end -->

<a id="ex-cag1-09-b03"></a>
#### CAG1-09-B03 正則写像を標的の方程式へ因子化する
- Level: B

$X=\mathbb P^1$、$Y=V(UW-V^2)\subset\mathbb P^2$ とする。正則写像 $f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ の座標切断が $\mathcal O_{X^{\mathrm{an}}}(2)$ の $S^2,ST,T^2$ で与えられている。代数的射 $g:X\to Y$ を作り、因子化が成立する論拠を切断の等式から説明せよ。

<!-- solution-start -->
**詳細解答**。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の $q=0$ 比較では $\mathcal O(2)$ の大域切断 $S^2,ST,T^2$ をそのまま代数的切断へ戻す。$S=T=0$ は射影点ではないので同時零点がなく、射は次の式で定まる。

$$
g_P([S:T])=[S^2:ST:T^2].
$$

$Y$ の斉次方程式の引戻しは、次の **$\mathcal O(4)$ の零切断**である。

$$
S^2T^2-(ST)^2=0.
$$

従って座標環の準同型は $Y$ の斉次イデアルを殺し、$g_P$ は $Y$ を通る射 $g$ へ因子化する。[正則射の代数性](#thm-cag1-09-morphism-algebraic)で必要な「共通零点なし」と「方程式の零切断」を検算できた。
<!-- solution-end -->

<a id="ex-cag1-09-b04"></a>
#### CAG1-09-B04 一次変換のグラフを比較する
- Level: B

$f:\mathbb P^1\to\mathbb P^1$ を $[S:T]\mapsto[S+T:T]$ とする。二つ目の斉次座標を $[U:V]$ としてグラフの双斉次方程式を書け。$T\ne0$ で局所式を求め、代数化後のグラフの第一射影が同型であることを確認せよ。

<!-- solution-start -->
**詳細解答**。$[U:V]=[S+T:T]$ は外積の零条件

$$
UT-V(S+T)=0
$$

と同値である。$T\ne0$ では $t=S/T$ と置き、$V\ne0$ の座標 $u=U/V$ で $u=t+1$ となる。逆写像 $t\mapsto(t,t+1)$ は正則かつ代数的である。

$T=0$ の点 $[1:0]$ では $[U:V]=[1:0]$ に一意に決まる。$S\ne0$ のチャートで $s=T/S$、$U\ne0$ のチャートで $v=V/U$ と置けば、方程式は

$$
s-v(1+s)=0,
\qquad v=\frac{s}{1+s}\quad(1+s\ne0)
$$

となる。$s=0$ の近くでは $1+s$ は単元で、第一射影の逆 $s\mapsto(s,s/(1+s))$ は代数的である。$s=-1$ の点では $U=0$ となるが、その点は既に $T\ne0$ 側のチャートで扱った。

二つの一次切断 $S+T,T$ は共通零点を持たないので、[射影空間への射の構成](#thm-cag1-09-morphism-algebraic)でも同じグラフを得る。第一射影の**実際の逆射**を作れたので、単なる点集合の全単射に頼っていない。
<!-- solution-end -->

### Level C

<a id="ex-cag1-09-c01"></a>
#### CAG1-09-C01 連接イデアルからChowの定理を再構成する
- Level: C

$Z\subset(\mathbb P^n_{\mathbb C})^{\mathrm{an}}$ を閉解析部分集合とする。

1. $\mathcal I_Z$ の連接性に必要な外部定理を示し、GAGAで代数化できる対象を特定せよ。
2. 代数化した連接層 $\mathcal F$ を $\mathcal O_P$ の**イデアル部分層**にする射と、その単射性の理由を証明せよ。
3. 商層の解析化から零点集合を復元し、有限個の斉次方程式を得るまでを説明せよ。さらに $(w)$ と $(w^2)$ の違いをどの段階で保つか述べよ。

<!-- solution-start -->
**詳細解答**。

1. [Cartan–Okaのイデアル連接性](#thm-cag1-09-ideal-coherence)を外部入力とする。これで $\mathcal I_Z$ は解析的連接になり、射影 $P$ に対する[GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)から $\mathcal F^{\mathrm{an}}\simeq\mathcal I_Z$ を満たす代数的連接層 $\mathcal F$ が得られる。
2. 包含 $\mathcal I_Z\hookrightarrow\mathcal O_{P^{\mathrm{an}}}$ を、選んだ同型で $\mathcal F^{\mathrm{an}}\to\mathcal O_{P^{\mathrm{an}}}$ と見る。[GAGA II](../CAG1-06/index.md#thm-cag1-06-gaga-hom)から代数的射 $u:\mathcal F\to\mathcal O_P$ が一意に得られる。

   $\ker u$ は連接で、その解析化は $\ker u^{\mathrm{an}}=0$。各複素閉点で[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)により $(\ker u)_x=0$ となる。非零連接層の支持には閉点があるため $\ker u=0$。像 $\mathcal J$ は $\mathcal O_P$-線形射の像だからイデアルである。

3. 次の代数的短完全列を解析化する。

   $$
   0\to\mathcal J\to\mathcal O_P
   \to\mathcal O_P/\mathcal J\to0.
   $$

   包含射と両立する形で解析側は $\mathcal I_Z$ を核とする列になる。従って対応する閉部分スキームは解析化後に $Z$ を再現する。[大域生成補題](../CAG1-05/index.md#lem-cag1-05-finite-twist)を $\mathcal J(m)$ に適用し、$\mathcal O_P^{\oplus r}\twoheadrightarrow\mathcal J(m)\hookrightarrow\mathcal O_P(m)$ を取る。[切断の斉次多項式表示](../../AG/AG2-06/index.md#thm-ag2-06-pn-sections)から各成分は次数 $m$ の斉次多項式で、$-m$ ねじりを戻すと生成イデアル層が $\mathcal J$ になる。

   非被約なイデアル $(w^2)$ を与えた場合は、二段目で**指定した包含射そのもの**を代数化するため $(w)$ に置き換わらない。商の $\bar w\ne0$, $\bar w^2=0$ も保存される。
<!-- solution-end -->

<a id="ex-cag1-09-c02"></a>
#### CAG1-09-C02 代数化の一般構成と非射影反例を比較する
- Level: C

$X$ を射影代数多様体、$Y=V(F_1,\ldots,F_r)\subset\mathbb P^m$ を射影部分多様体、$f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ を正則写像とする。

1. $f^*\mathcal O(1)$ と座標切断を使って代数的射 $g_P:X\to\mathbb P^m$ を作る手順を、各GAGAの使用箇所とともに示せ。
2. $F_\nu$ の次数を $d_\nu$ として $F_\nu(s_0,\ldots,s_m)$ の所属する空間を特定し、これが零であることから $g_P$ が $Y$ を通ると示せ。
3. $X=\mathbb A^1$ に変更し、$z\mapsto[1:e^z]$ を考える。上の手順の**どの入力**が欠け、なぜ写像が代数的でないかを示せ。

<!-- solution-start -->
**詳細解答**。

1. $h=i^{\mathrm{an}}\circ f$ と置き、$\mathcal L_{\mathrm{an}}=h^*\mathcal O(1)^{\mathrm{an}}$、$t_j=h^*U_j$ を取る。$t_j$ はどの点でも同時に零にならない。

   [GAGA III](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で $\mathcal L_{\mathrm{an}}$ を代数的連接層へ戻す。[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)とNakayamaの補題で可逆層 $\mathcal L$ だと確かめる。

   [GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の $H^0$ 比較で切断 $t_j$ を代数側の切断へ戻す。

   $$
   s_j\in H^0(X,\mathcal L).
   $$

   共通零点があれば複素閉点があり、そこで全 $t_j$ が零になる矛盾が生じる。よって $\mathcal O_X^{m+1}\twoheadrightarrow\mathcal L$ から射 $g_P=[s_0:\cdots:s_m]$ が定まる。
2. $F_\nu$ は斉次次数 $d_\nu$ なので $F_\nu(s)\in H^0(X,\mathcal L^{\otimes d_\nu})$。解析化は $F_\nu(t)=0$ である。各 $t$ の値は $Y$ 上にあるから、これは解析側で零切断。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の単射性により代数側でも零切断で、全ての標的方程式を殺す。ゆえに $g_P$ は $g:X\to Y$ へ因子化する。
3. $\mathbb A^1$ は射影的でなく、GAGA Iの $H^0$ 全単射もGAGA IIIの連接層代数化も使えない。実際 $\mathcal O$ の解析的大域切断 $e^z$ は $\mathbb C[z]$ の切断でない。射の像は $U\ne0$ に入るので、代数的射なら座標 $w=V/U$ を多項式 $p(z)$ へ引き戻すはずだが、$p(z)=e^z$ は導関数の次数議論で不可能。グラフが閉であるだけではChowの射影性仮定も満たせない。
<!-- solution-end -->

## まとめと次章への橋

Chowの定理は、閉解析集合の消滅イデアル層の連接性を**解析的入力**とし、GAGA IIIで層、GAGA IIで包含射を戻し、忠実平坦性でイデアル構造を保証することで得られた。非被約な解析的イデアルも同じ手順で代数化できる。

正則写像については、グラフが閉解析的であることと、射影積でChowが使えることを確認した。さらに、引戻した正則線束と座標切断をGAGAで代数化して**実際の代数的射を構成**したので、点集合の全単射を同型と取り違えずに済んだ。

射影性を失うと $[1:e^z]$ が反例になる。次の CAG1-10 では、ここで使った「正則線束を代数化すると可逆層に戻る」という仕組みを、Picard群全体の比較と因子の言葉へ進める。
