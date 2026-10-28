# CAG1-05 GAGA I――連接層コホモロジーの比較

[前章の射影空間上の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)では、$mathbb P^n$ のねじり層 $mathcal O(d)$ の全コホモロジーについて、代数的なLaurent多項式と解析的なLaurent級数が同じ類を与えることを確認した。しかし一般の連接層は一本のねじり層ではない。たとえば射影直線上の二重に厚くした点の構造層には冪零元があり、どの $mathcal O(d)$ とも同型ではない。

それでも、**有限個のねじり層から連接層を作り、その核も再び連接層になる**。この操作と長完全列を組み合わせれば、ねじり層で知っている比較を一般の層へ広げられるだろうか。難所は、長完全列の中央項の同型を単純な一回の「五項補題」だけでは言えない点にある。以下では全射性と単射性を分けて降下帰納を完結させる。

基礎体は $mathbb C$ とする。$P=mathbb P^n_{mathbb C}$ は $n\ge0$ とし、$X$ は有限型の射影 $mathbb C$-スキーム（滑らか・既約・被約とは仮定しない）、$mathcal F$ はその代数的連接層とする。解析化写像を $h:X^{\mathrm{an}}\to X$ と書く。層コホモロジーの意味は[既習の定義](../../AG/AG3-08/index.md#def-ag3-08-sheaf-cohomology)に従う。

## 1. 比較写像はどこから来るか

[連接層の解析化](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)は、代数的な局所切断を正則な局所切断として読む操作である。$U_i=\{X_i\ne0\}$ を $P$ の標準開集合とすると、代数的Čechコチェインを、同じ交叉上の正則コチェインへ移せる。さらにこの操作は制限写像、加法、交代微分と可換である。

<a id="def-cag1-05-comparison-map"></a>

<!-- formal-statement-start -->
> **定義（コホモロジーの自然比較写像）**
> 射影 $mathbb C$-スキーム $X$ と代数的連接層 $\mathcal F$ の解析化を $\mathcal F^{\mathrm{an}}$ とする。局所切断を解析化し、層コホモロジーへ誘導される写像

$$
\alpha^q_{X,\mathcal F}:H^q(X,\mathcal F)
\longrightarrow H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}})
\qquad(q\ge0)
$$

> をコホモロジーの自然比較写像とする。短完全列に対して、対応する長完全列の各矢印・連結準同型と可換に定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cag1-05-comparison-map -->
**定義の確認**：$P=\mathbb P^1$、$\mathcal F=\mathcal O_P(-2)$ では、[前章のLaurent計算](../CAG1-04/index.md#thm-cag1-04-projective-comparison)により、$H^1$ の代数的Čech類 $[X_0^{-1}X_1^{-1}]$ が解析側でも同じ分数の類となる。$H^0=0$ も両側で一致する。これは単に群の次元が等しいだけでなく、**具体的な類をどこへ送るか**が指定されている例である。
<!-- definition-example-end -->

短完全列の自然性を少し展開しておく。$0\to\mathcal K\to\mathcal E\to\mathcal F\to0$ が代数側で完全なら、[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)から解析側でも短完全である。各交叉上の代数的な持ち上げを解析化してからČech微分を取る操作と、先に微分してから解析化する操作が一致するので、連結準同型 $\partial^q$ について

$$
\alpha^{q+1}_{X,\mathcal K}\circ\partial^q_{\mathrm{alg}}
=\partial^q_{\mathrm{an}}\circ\alpha^q_{X,\mathcal F}
$$

となる。特にこの可換性は、比較を証明した**後に**付け加える結論ではなく、降下帰納の途中で使う性質である。

## 2. 高次数の出発点と有限個のねじり層

最初に二つの資源を分離する。解析側には[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)を用いた高次消滅があり、代数側には連接層をねじり層から全射で表示する事実がある。それぞれの役割は異なる。

<a id="lem-cag1-05-dimension-bound"></a>

<!-- formal-statement-start -->
> **補題（射影空間上の連接層の高次消滅）**
> $P=\mathbb P^n_{\mathbb C}$（$n\ge0$）とし、$\mathcal F$ を $P$ 上の代数的連接層とする。このとき

$$
H^q(P,\mathcal F)=0,
\qquad H^q(P^{\mathrm{an}},\mathcal F^{\mathrm{an}})=0
\qquad(q>n).
$$

> 解析側の主張は、$P^{\mathrm{an}}$ 上の任意の解析的連接層についても成立する。
<!-- formal-statement-end -->

### 証明の見取り図

射影空間の標準被覆には $n+1$ 枚しかなく、したがってČech複体は次数 $n$ で終わる。これが実際の層コホモロジーを計算するには、代数側ではアフィン消滅、解析側ではStein交叉上のCartanの定理Bが必要である。

<!-- proof-start -->
### 証明

$n=0$ なら $P$ は一点であり、両側の大域切断関手は完全なので正次数群は零である。$n\ge1$ の場合、標準被覆 $\{U_0,\ldots,U_n\}$ の各空でない有限交叉はアフィンである。[準連接層のアフィン消滅](../../AG/AG3-08/index.md#thm-ag3-08-affine-vanishing)が適用でき、[Čechと層コホモロジーの比較](../../AG/AG3-08/index.md#thm-ag3-08-cech-comparison)から代数側をこの被覆のČech複体で計算できる。

解析側では[交叉のStein性](../CAG1-04/index.md#prop-cag1-04-stein-intersections)と[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)から、任意の解析的連接層 $\mathcal E$ に対し $H^r(U_I^{\mathrm{an}},\mathcal E)=0$（$r>0$）。[解析的Čech比較](../CAG1-04/index.md#prop-cag1-04-analytic-cech-comparison)で使った二重複体の論法は $\mathcal O(d)$ に限らず、これらの交叉上で非巡回な $\mathcal E$ に適用できる。

双方のČech複体の $q$ 次項は $q+1$ 個の相異なる添字の交叉上の切断を並べる。$q>n$ ではそのような添字を選べず項自体が零だから、対応するコホモロジー群も零である。
<!-- proof-end -->

高次群の消滅は、$\mathcal F$ のねじり方を変えても同じである。ただし**零次切断の全射性**はこの補題から従わない。次に、各点の近くで有限個の生成元を持つという連接性を、全空間で有限個のねじり層による表示へつなぐ。

代数的な局所生成元は、十分高くねじると全域で使えるようになる。これは解析的な正則関数の延長ではなく、Projの次数付き局所化で分母の冪を払う仕組みに基づく。

<a id="thm-cag1-05-serre-generation"></a>

<!-- formal-statement-start -->
> **定理（代数的Serreの生成補題）**
> $P=\mathbb P^n_{\mathbb C}$ 上の代数的連接層 $\mathcal F$ と、標準開集合 $U_i=D_+(X_i)$ 上の切断 $s$ を取る。十分大きな整数 $m$ について、局所切断

$$
s\otimes X_i^m\in\Gamma(U_i,\mathcal F(m))
$$

> は $P$ 上の大域切断の制限として表される。
<!-- formal-statement-end -->

この代数的Serreの生成補題は[Stacks Project, Tag 01YR（連接層のねじり層による有限全射表示）](https://stacks.math.columbia.edu/tag/01YR)へ帰着する標準結果であり、証明に用いる次数付き加群の有限生成・局所化の一般補題はここでは入力とする。ここで求めているのは、既に与えられた**代数的な局所切断**を高いねじりで延長することに限る。

<a id="lem-cag1-05-finite-twist"></a>

<!-- formal-statement-start -->
> **補題（ねじり層の有限直和による全射表示）**
> $P=\mathbb P^n_{\mathbb C}$ 上の代数的連接層 $\mathcal F$ に対して、有限個の整数 $a_1,\ldots,a_r$ と短完全列

$$
0\longrightarrow\mathcal K\longrightarrow
\mathcal E:=\bigoplus_{j=1}^{r}\mathcal O_P(a_j)
\xrightarrow{\pi}\mathcal F\longrightarrow0
$$

> が存在する。$\mathcal K$ も代数的連接層である。さらに $m$ を十分大きくすれば、$\mathcal F(m)$ は有限個の大域切断で生成される。
<!-- formal-statement-end -->

### 証明の見取り図

標準開 $U_i=D_+(X_i)$ 上では $\mathcal F$ は有限生成加群に対応する。局所生成元に高い冪を掛けて大域切断へ延長する[代数的Serreの生成補題](#thm-cag1-05-serre-generation)を使う。有限枚の被覆なので、各開の生成元から有限個だけ取り、その切断が全点で生成する。核が連接なのは局所Noether性による。

<!-- proof-start -->
### 証明（代数的Serreの生成補題への帰着）

$U_i\simeq\operatorname{Spec}\mathbb C[X_0/X_i,\ldots,\widehat{X_i/X_i},\ldots,X_n/X_i]$ である。これはNoether環のスペクトルで、[アフィン上の連接層と有限加群の対応](../../AG/AG3-06/index.md#thm-ag3-06-affine-equivalence)によって $\Gamma(U_i,\mathcal F)$ は有限生成である。生成元を $s_{i1},\ldots,s_{ir_i}$ と選ぶ。

ここで[代数的Serreの生成補題](#thm-cag1-05-serre-generation)を用いる。射影空間上の連接層の $U_i$ 上の切断 $s$ に対し、ある整数 $m_i$ が存在して、十分大きな $m$ では局所切断

$$
s\otimes X_i^m\in\Gamma(U_i,\mathcal F(m))
$$

が $P$ 全体の大域切断へ延長できる。これはProjの次数付き局所化で分母の冪を払う有限性の命題であり、解析的な正則関数の延長ではない。

この入力の代数的な根拠は[前掲のSerreの生成補題](#thm-cag1-05-serre-generation)に記録した。実際に必要なのは、有限個の局所生成元に共通して使える十分大きなねじり次数を選べることである。

有限個の $s_{ij}$ に対して共通の $m$ を取る。得られた大域切断を $t_{ij}\in\Gamma(P,\mathcal F(m))$ とすると、$U_i$ では $X_i$ が可逆だから $t_{ij}=X_i^m s_{ij}$ が $\mathcal F(m)$ を生成する。全ての $i,j$ の切断を集めると

$$
\mathcal O_P^{\oplus r}\twoheadrightarrow\mathcal F(m)
$$

ができ、$\mathcal O_P(-m)$ をテンソルして $\mathcal O_P(-m)^{\oplus r}\twoheadrightarrow\mathcal F$ を得る。より一般の $a_j$ を許す形も従う。$P$ はNoetherスキームで、$\mathcal F$ と $\mathcal E$ は連接だから、局所的に有限生成加群の準同型の核は有限生成であり[局所Noether上の連接性](../../AG/AG3-06/index.md#thm-ag3-06-noether-coherence)から $\mathcal K$ は連接である。
<!-- proof-end -->

**この入力の境界**：有限直和による全射表示は代数的な定理である。前章の[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)から直接得たのではない。通常のSerre消滅 $H^q(P,\mathcal F(m))=0$（$q>0$, $m\gg0$）は、この有限全射表示と[ねじり層の高次群](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から別途導ける。

具体的には $0\to\mathcal K(m)\to\bigoplus\mathcal O(a_j+m)\to\mathcal F(m)\to0$ において、固定した $q>0$ に対する長完全列の

$$
H^q\!\left(P,\bigoplus_j\mathcal O(a_j+m)\right)
\longrightarrow H^q(P,\mathcal F(m))
\longrightarrow H^{q+1}(P,\mathcal K(m))
$$

を使う。右端の消滅を $q>n$ から降下帰納で既知とし、$m\gg0$ で左端が零になることをねじり層の計算から確認すれば、中央も零である。これは**代数側のSerre消滅の位置**である。一方、次節のGAGA比較の降下帰納そのものは、この強いねじり後消滅を前提にせず、[高次群の消滅](#lem-cag1-05-dimension-bound)と有限全射表示だけで進む。解析側の「$m\gg0$ で全コホモロジーが消える」という別定理をこっそり使う必要はない。

## 3. 一次数ずつ降りる：五項補題の中身

一般の連接層の比較は「全次数 $q$ について、全ての連接層で同型」という**同時命題**で帰納する。たとえば特定の $\mathcal F$ だけに帰納法をかけると、短完全列から現れる核 $\mathcal K$ を扱えない。

<a id="lem-cag1-05-descending"></a>

<!-- formal-statement-start -->
> **補題（一次数降下の全射・単射補題）**
> $P=\mathbb P^n_{\mathbb C}$ とし、整数 $q\ge0$ を固定する。任意の代数的連接層 $\mathcal G$ について、全ての次数 $r>q$ の $\alpha^r_{P,\mathcal G}$ が同型と仮定する。このとき任意の代数的連接層 $\mathcal F$ について $\alpha^q_{P,\mathcal F}$ も同型である。
<!-- formal-statement-end -->

### 証明の見取り図

[ねじり層の有限全射表示](#lem-cag1-05-finite-twist) $0\to\mathcal K\to\mathcal E\to\mathcal F\to0$ を使う。$\mathcal E$ はねじり層の有限直和だから、[前章の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)でその全次数が既に同型である。まず短い区間の図式追跡で $\mathcal F$ の次数 $q$ の**全射性**を証明する。この論法はどの連接層にも使えるので、$\mathcal K$ にも全射性が成立する。それを左に一項付け足した図式で使って、初めて $\mathcal F$ の**単射性**が従う。

<!-- proof-start -->
### 証明

まず[有限全射表示](#lem-cag1-05-finite-twist)を選ぶ。

$$
0\longrightarrow\mathcal K\xrightarrow{u}\mathcal E
\xrightarrow{v}\mathcal F\longrightarrow0,
\qquad \mathcal E=\bigoplus_{j=1}^r\mathcal O_P(a_j).
$$

[解析化の完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)により、解析側でも同じ短完全列がある。以下、$H^j_{\mathrm a}(\mathcal M)=H^j(P,\mathcal M)$、$H^j_{\mathrm h}(\mathcal M)=H^j(P^{\mathrm{an}},\mathcal M^{\mathrm{an}})$ と略し、比較写像を縦矢印 $\alpha$ とする。

**第一段階（全射性）**。長完全列の次の部分を見る。

$$
\begin{array}{ccccccc}
H^q_{\mathrm a}(\mathcal E)&\xrightarrow{v_*}&H^q_{\mathrm a}(\mathcal F)&\xrightarrow{\partial}&H^{q+1}_{\mathrm a}(\mathcal K)&\xrightarrow{u_*}&H^{q+1}_{\mathrm a}(\mathcal E)\\
\downarrow\wr&&\downarrow\alpha&&\downarrow\wr&&\downarrow\wr\\
H^q_{\mathrm h}(\mathcal E)&\xrightarrow{v_*}&H^q_{\mathrm h}(\mathcal F)&\xrightarrow{\partial}&H^{q+1}_{\mathrm h}(\mathcal K)&\xrightarrow{u_*}&H^{q+1}_{\mathrm h}(\mathcal E).
\end{array}
$$

左右の $\wr$ は $\mathcal E$ のねじり層比較と、$\mathcal K$ に対する帰納仮定である。任意の $y\in H^q_{\mathrm h}(\mathcal F)$ を取る。$\partial y$ は $H^{q+1}_{\mathrm h}(\mathcal K)$ の元なので、一意な $k\in H^{q+1}_{\mathrm a}(\mathcal K)$ があり $\alpha(k)=\partial y$。下段の完全性で $u_*\partial y=0$、右端の縦矢印の単射性から $u_*k=0$ となる。上段の完全性から $k=\partial x$ を満たす $x\in H^q_{\mathrm a}(\mathcal F)$ を取れる。

$$
\partial(y-\alpha(x))=\partial y-\alpha(\partial x)=0.
$$

下段の完全性で $y-\alpha(x)=v_*(e')$ となる $e'\in H^q_{\mathrm h}(\mathcal E)$ が存在する。左端の比較は全射なので、$e'=\alpha(e)$ となる $e\in H^q_{\mathrm a}(\mathcal E)$ を選べる。自然性から

$$
y=\alpha(x)+v_*\alpha(e)=\alpha(x+v_*e).
$$

ゆえに $\alpha^q_{P,\mathcal F}$ は全射である。**$\mathcal F$ の選び方を限定していない**ので、同じ議論を任意の連接層、特に $\mathcal K$ にも適用できる。

**第二段階（単射性）**。$x\in H^q_{\mathrm a}(\mathcal F)$ が $\alpha(x)=0$ を満たすとする。$\alpha(\partial x)=\partial\alpha(x)=0$ かつ $\alpha^{q+1}_{P,\mathcal K}$ は単射なので $\partial x=0$。したがって $x=v_*e$ となる $e\in H^q_{\mathrm a}(\mathcal E)$ がある。

ところが $v_*\alpha(e)=\alpha(x)=0$ だから、下段の長完全列を一項左へ伸ばした部分

$$
H^q_{\mathrm h}(\mathcal K)\xrightarrow{u_*}
H^q_{\mathrm h}(\mathcal E)\xrightarrow{v_*}
H^q_{\mathrm h}(\mathcal F)
$$

の完全性により $\alpha(e)=u_*k'$ となる $k'\in H^q_{\mathrm h}(\mathcal K)$ がある。第一段階を $\mathcal K$ に適用した全射性によって、$k'=\alpha(k)$ となる $k\in H^q_{\mathrm a}(\mathcal K)$ を選ぶ。従って

$$
\alpha(e-u_*k)=0.
$$

$\mathcal E$ の次数 $q$ の比較は**単射**なので $e=u_*k$。上段の完全性から $x=v_*e=v_*u_*k=0$ となる。ゆえに $\alpha^q_{P,\mathcal F}$ は単射でもあり、補題が証明された。
<!-- proof-end -->

この論法では、最初の四項の図式だけで単射まで結論していない。**核 $\mathcal K$ の次数 $q$ の全射性を、一度「全ての連接層」について作った後**に左隣の項へ戻るのが論理上の要点である。

## 4. 射影空間から特異・非被約な射影スキームへ

射影的な $X$ はある $P=\mathbb P^n_{\mathbb C}$ へ閉埋込み $i:X\hookrightarrow P$ を持つ。ここで $X$ を滑らかな部分多様体と仮定する必要はない。局所方程式が冪零元を許す場合も、閉埋込みであることは変わらない。

<a id="prop-cag1-05-closed-pushforward"></a>

<!-- formal-statement-start -->
> **命題（閉埋込みの直像と解析化の交換）**
> 有限型の閉埋込み $i:X\hookrightarrow P=\mathbb P^n_{\mathbb C}$ と $X$ 上の代数的連接層 $\mathcal F$ に対し、$i_*\mathcal F$ は $P$ 上で連接であり、自然な同型

$$
(i_*\mathcal F)^{\mathrm{an}}
\simeq i^{\mathrm{an}}_*\mathcal F^{\mathrm{an}}
$$

> が成り立つ。また各 $q\ge0$ について、代数・解析の両側で

$$
H^q(X,\mathcal F)\simeq H^q(P,i_*\mathcal F),
\quad
H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}})
\simeq H^q(P^{\mathrm{an}},i^{\mathrm{an}}_*\mathcal F^{\mathrm{an}})
$$

> が自然に成り立ち、これらの同型は比較写像と可換である。
<!-- formal-statement-end -->

### 証明の見取り図

閉埋込みの直像は、閉部分集合の外で零、内側で元の層の茎を持つ。局所的に $\mathcal O_P/I$-加群として書いた有限表示を解析化すると、[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)によって核と余核が保持される。閉埋込みの直像は完全であるため、高次直像が零となり、双方のコホモロジーを $P$ 上で計算できる。

<!-- proof-start -->
### 証明

$P$ のアフィン開 $U=\operatorname{Spec}A$ では、閉部分スキームは $X\cap U=\operatorname{Spec}(A/I)$ と書ける。$\mathcal F$ の制限は $A/I$ 上の有限加群 $M$ に対応する。$A$ はNoetherなので $M$ は $A$-加群として有限表示を持ち、次の列が存在する。

$$
A^s\longrightarrow A^r\longrightarrow M\longrightarrow0.
$$

この表示の解析化は $U^{\mathrm{an}}$ 上の正則関数層による同じ行列の余核である。[有限表示と解析化](../CAG1-03/index.md#prop-cag1-03-local-presentation)により、それは閉埋込み後の $i^{\mathrm{an}}_*\mathcal F^{\mathrm{an}}$ の局所表示に一致する。各開集合上の同型は同じ行列に由来するため、重なりで貼り合わさる。

閉埋込み $i$ に対する直像は層の短完全列を短完全列に移す。実際、$p\in P$ が $X$ に属せば $(i_*\mathcal F)_p=\mathcal F_p$、属さなければ零であり、各茎での完全性が保存される。解析側も同様である。よって $R^qi_*=R^qi_*^{\mathrm{an}}=0$（$q>0$）であり、[層コホモロジー](../../AG/AG3-08/index.md#def-ag3-08-sheaf-cohomology)の導来関手による構成、またはLerayのコホモロジー比較から、記した自然同型を得る。局所切断の解析化は $i_*$ の前後で同じ表示行列に作用するため、自然比較写像との可換性も従う。
<!-- proof-end -->

ここで、**代数的連接層を解析化したもの**を扱っていることが重要である。任意の解析的連接層がこの形になるという「GAGA III」はまだ使っていない。

<a id="thm-cag1-05-gaga-cohomology"></a>

<!-- formal-statement-start -->
> **定理（GAGA I――連接層コホモロジーの比較）**
> $X$ を $\mathbb C$ 上の射影スキーム、$\mathcal F$ を $X$ 上の代数的連接層とする。各整数 $q\ge0$ について自然比較写像は同型である。

$$
\alpha^q_{X,\mathcal F}:H^q(X,\mathcal F)
\xrightarrow{\ \sim\ }
H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}}).
$$

> この同型は連接層の射、短完全列の長完全列、連結準同型と可換である。$X$ に滑らかさ、既約性、被約性は要求しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $P=\mathbb P^n$ では、[高次消滅](#lem-cag1-05-dimension-bound)から全連接層・全 $q>n$ で比較が同型となる。[一次数降下補題](#lem-cag1-05-descending)を $q=n,n-1,\ldots,0$ と順に適用して全次数を得る。一般の射影 $X$ は閉埋込みによる直像へ置き換える。

<!-- proof-start -->
### 証明

$X=P$ の場合を先に示す。[高次消滅補題](#lem-cag1-05-dimension-bound)により、任意の連接層 $\mathcal G$ と次数 $q>n$ で、比較写像は $0\to0$ の同型である。ここを**全ての連接層についての降下帰納**の初期条件とする。

[一次数降下の全射・単射補題](#lem-cag1-05-descending)を $q=n$ に適用すると、全連接層で次数 $n$ の比較も同型となる。次に次数 $n-1$ では、それより高い全次数で同型性が成立しているため再び同じ補題を適用できる。この手順を次数零まで繰り返す。$n=0$ では一点の零次切断の同一視として直接確認できる。

一般の $X$ について、射影性から閉埋込み $i:X\hookrightarrow P$ を選ぶ。[閉埋込みの命題](#prop-cag1-05-closed-pushforward)による可換図式を作る。

$$
\begin{array}{ccc}
H^q(X,\mathcal F)&\xrightarrow{\alpha^q_{X,\mathcal F}}&H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}})\\
\downarrow\wr&&\downarrow\wr\\
H^q(P,i_*\mathcal F)&\xrightarrow{\alpha^q_{P,i_*\mathcal F}}&H^q(P^{\mathrm{an}},(i_*\mathcal F)^{\mathrm{an}}).
\end{array}
$$

下辺は $i_*\mathcal F$ が連接であることから既証明の $P$ 上の比較で同型。両縦辺も命題の同型なので上辺も同型である。射および連結写像に関する自然性は[比較写像の構成](#def-cag1-05-comparison-map)と各段階の可換性から従う。
<!-- proof-end -->

**何が分かったか**：正則関数が代数的関数より多い開集合が存在しても、射影的 $X$ 上の**代数的連接層**の大域切断と高次コホモロジーには余分な類が増えない。これは正則連接層の全てが代数化できるという主張ではなく、代数側で与えられた層についての比較である。次章ではこの零次比較を層の射の比較へ用いる。

## 5. 手で追う二つの例

### 5.1 二重に厚くした点：冪零元を見落とさない

$P=\mathbb P^1$、$p=[1:0]$ とし、$Z\subset P$ を $X_1^2=0$ で定まる閉部分スキームとする。$U_0$ の座標 $z=X_1/X_0$ では

$$
Z\cap U_0=\operatorname{Spec}\mathbb C[z]/(z^2),
\qquad Z\cap U_1=\varnothing.
$$

$Z$ の点集合は一つだが、構造層には零でない冪零元 $\bar z$ が残る。超曲面の[短完全列](../../AG/AG3-10/index.md#prop-ag3-10-hyperplane-sequence)を $X_1^2$ の乗法に適用すると

$$
0\longrightarrow\mathcal O_P(-2)
\xrightarrow{X_1^2}\mathcal O_P
\longrightarrow i_*\mathcal O_Z\longrightarrow0.
$$

[$\mathcal O(-2)$ の既習計算](../CAG1-04/index.md#thm-cag1-04-projective-comparison)により $H^0(P,\mathcal O(-2))=0$、$H^1(P,\mathcal O(-2))\simeq\mathbb C$、$H^0(P,\mathcal O)=\mathbb C$、$H^1(P,\mathcal O)=0$。長完全列は

$$
0\longrightarrow\mathbb C\longrightarrow
H^0(Z,\mathcal O_Z)\xrightarrow{\partial}
\mathbb C\longrightarrow0
$$

となる。実際 $H^0(Z,\mathcal O_Z)=\mathbb C\{1,\bar z\}$ は二次元である。$\bar z$ を $U_0$ 上の $z$ に持ち上げ、$U_1$ の空部分上の値は零とすると、交叉でのČech差は $-z$。$X_1^2$ で割ると

$$
\partial(\bar z)=\left[-\frac{z}{X_1^2}\right]
=\left[-\frac1{X_0X_1}\right]
\in H^1(P,\mathcal O_P(-2)).
$$

これは一次群の非零基底であり、定数 $1$ は $P$ 上の大域切断から来るので境界が零。解析化しても同じ $z^2=0$ と同じČech差が残るため、[GAGA I](#thm-cag1-05-gaga-cohomology)は両側の二次元空間を **$1\mapsto1$, $\bar z\mapsto\bar z$** と同一視する。点が一つだから切断空間が一次元と考えるのは、非被約構造を捨てた誤りである。

### 5.2 射影平面の超平面：直像を介して比較する

$P=\mathbb P^2$、$H=\{X_2=0\}\simeq\mathbb P^1$ とし、包含を $j:H\hookrightarrow P$ とする。$X_2$ の乗法で

$$
0\longrightarrow\mathcal O_P(-1)
\xrightarrow{X_2}\mathcal O_P
\longrightarrow j_*\mathcal O_H\longrightarrow0.
$$

[ねじり層の計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で $H^q(P,\mathcal O(-1))=0$（全 $q$）、$H^0(P,\mathcal O)=\mathbb C$、$H^{q>0}(P,\mathcal O)=0$。従って

$$
H^0(H,\mathcal O_H)=\mathbb C,
\qquad H^{q>0}(H,\mathcal O_H)=0.
$$

解析側でも $j^{\mathrm{an}}_*\mathcal O_{H^{\mathrm{an}}}$ は解析化した直像で、同じ長完全列・消滅が使える。特に射影平面上の直像の比較と、射影直線自身の比較が一致することを確認できる。

## 6. 演習と詳細解答

以下では、比較写像の具体的な作用、長完全列での図式追跡、特異・非被約な場合への適用を別々の技能として確認する。

### Level A

<a id="ex-cag1-05-a01"></a>
#### CAG1-05-A01 比較写像が送るもの
- Level: A

$P=\mathbb P^1_{\mathbb C}$ とし、$\mathcal F=\mathcal O_P(2)$ とする。$H^0(P,\mathcal F)$ の基底を斉次座標で書き、$\alpha^0_{P,\mathcal F}$ が各基底をどこへ送るか述べよ。解析側の切断空間の次元も求めよ。

<!-- solution-start -->
**詳細解答**。[射影空間のねじり層の計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で $d=2,n=1$ とすると、斉次二次式の空間が零次群になる。基底は $X_0^2,X_0X_1,X_1^2$ の三つである。

[自然比較写像](#def-cag1-05-comparison-map)はこれらを同じ斉次多項式として正則切断へ移す。[前章の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)により、この三つの像は解析側の全ての切断を張り、互いに一次独立である。従って解析側の $H^0$ も三次元である。「正則」だから次数3以上の斉次式も許されるわけではない。線束のねじり次数が2と固定されている。
<!-- solution-end -->

<a id="ex-cag1-05-a02"></a>
#### CAG1-05-A02 三枚の被覆が止める次数
- Level: A

$P=\mathbb P^2_{\mathbb C}$、$\mathcal F$ を任意の代数的連接層とする。代数・解析の双方で $H^3(P,\mathcal F)$ が零になる理由を、被覆の枚数と被覆交叉上の消滅を区別して説明せよ。

<!-- solution-start -->
**詳細解答**。標準被覆は $U_0,U_1,U_2$ の三枚であり、Čechの $q$ 次項は $q+1$ 個の添字を必要とする。$q=3$ では四つの相異なる添字を選べず、$C^3=0$ である。

ただしČech複体を真の層コホモロジーと同一視する前には、交叉の高次消滅が必要である。代数側は[アフィン消滅](../../AG/AG3-08/index.md#thm-ag3-08-affine-vanishing)、解析側は[Stein交叉](../CAG1-04/index.md#prop-cag1-04-stein-intersections)と[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)を適用する。これにより[高次消滅補題](#lem-cag1-05-dimension-bound)から $H^3=0$ が両側で従う。被覆が三枚という事実だけでは交叉の非巡回性を保証しない。
<!-- solution-end -->

<a id="ex-cag1-05-a03"></a>
#### CAG1-05-A03 全射表示を解析化する
- Level: A

$P=\mathbb P^1$、$p=[1:0]$ とする。$p$ のイデアル層 $\mathcal I_p$ は $\mathcal O_P(-1)$ と同型である。$0\to\mathcal I_p\to\mathcal O_P\to\mathcal O_p\to0$ を解析化した列を書き、なぜ右端がなお層として全射になるか答えよ。

<!-- solution-start -->
**詳細解答**。$p$ は $X_1=0$ で定義されるので、[超平面制限列](../../AG/AG3-10/index.md#prop-ag3-10-hyperplane-sequence)の $n=1,d=0$ を使うと $\mathcal I_p\simeq\mathcal O_P(-1)$ であり、

$$
0\to\mathcal O_P(-1)^{\mathrm{an}}
\xrightarrow{X_1}\mathcal O_P^{\mathrm{an}}
\to\mathcal O_p^{\mathrm{an}}\to0
$$

を得る。ここで $X_1$ は局所自明化での乗法を表す。[解析化の忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)から茎でテンソル積が完全列を保ち、右端の余核も対応する。全射は**層として局所的に**持ち上げられることを意味し、任意の開集合上の大域切断の写像が全射とは限らない。
<!-- solution-end -->

<a id="ex-cag1-05-a04"></a>
#### CAG1-05-A04 有限直和のコホモロジー
- Level: A

$P=\mathbb P^1_{\mathbb C}$、$\mathcal E=\mathcal O_P(1)\oplus\mathcal O_P(-3)$ とする。$H^0(P,\mathcal E)$、$H^1(P,\mathcal E)$ の次元を求め、解析側の群を同定せよ。

<!-- solution-start -->
**詳細解答**。[ねじり層の公式](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)より $h^0(\mathcal O(1))=2,h^1(\mathcal O(1))=0$、$h^0(\mathcal O(-3))=0,h^1(\mathcal O(-3))=2$ である。有限直和の切断と導来関手は直和に分解するので

$$
H^0(P,\mathcal E)\simeq\mathbb C^2,
\qquad H^1(P,\mathcal E)\simeq\mathbb C^2.
$$

解析側も二つのねじり層の解析化の直和であり、[前章の全次数比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)を各成分に適用する。比較写像は直和の二つの同型の直和だから、解析側でも同じ二つのベクトル空間を得る。
<!-- solution-end -->

<a id="ex-cag1-05-a05"></a>
#### CAG1-05-A05 射影性を抜いた零次の比較
- Level: A

$X=\mathbb A^1_{\mathbb C}$、$\mathcal F=\mathcal O_X$ に対して $\alpha^0$ の始域と終域を関数として書き、全射でないことを示せ。

<!-- solution-start -->
**詳細解答**。代数側は $H^0(X,\mathcal O_X)=\mathbb C[z]$、解析側は $H^0(\mathbb C,\mathcal O_{\mathbb C})=\mathcal O(\mathbb C)$（整関数全体）である。[アフィン直線の比較](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)により自然写像は多項式を同じ正則関数として読む包含である。

$e^z=\sum_{k\ge0}z^k/k!$ は無限個の非零Taylor係数を持つので多項式ではない。従って $\alpha^0$ の像に入らず、全射でない。代数側の連接性は成立しているため、ここで失った仮定は $X$ の射影性である。
<!-- solution-end -->

### Level B

<a id="ex-cag1-05-b01"></a>
#### CAG1-05-B01 降下帰納の最初の段階
- Level: B

$P=\mathbb P^1_{\mathbb C}$、$\mathcal F$ は任意の連接層とする。有限全射表示 $0\to\mathcal K\to\mathcal E\to\mathcal F\to0$ を選び、$H^2(\mathcal K)=0$ と $\mathcal E$ の比較を使って $\alpha^1_{P,\mathcal F}$ が全射になることを示せ。次に単射性に何が追加で要るか述べよ。

<!-- solution-start -->
**詳細解答**。[有限全射表示](#lem-cag1-05-finite-twist)を使い、$\mathcal E$ をねじり層の有限直和として取る。[$q>1$ の消滅](#lem-cag1-05-dimension-bound)により $H^2(P,\mathcal K)=H^2(P^{\mathrm{an}},\mathcal K^{\mathrm{an}})=0$。長完全列には

$$
H^1(P,\mathcal E)\twoheadrightarrow H^1(P,\mathcal F)\to0
$$

および同じ解析側の列がある。[ねじり層の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)で $H^1(\mathcal E)$ の比較が全射だから、解析側の $H^1(\mathcal F^{\mathrm{an}})$ の任意の類を代数側へ持ち上げられる。

単射性には、長完全列の左隣 $H^1(\mathcal K)\to H^1(\mathcal E)$ を使う。今証明した全射性は**任意の連接層**で成立するので $\mathcal K$ にも適用できる。この全射性を使って解析側の核の元を代数側で補正し、[一次数降下の全射・単射補題](#lem-cag1-05-descending)の第二段階と同じ操作で単射性を得る。$H^2(\mathcal K)=0$ だけから直接に単射が出たと考えてはいけない。
<!-- solution-end -->

<a id="ex-cag1-05-b02"></a>
#### CAG1-05-B02 零次の単射性を自分で再構成する
- Level: B

$P=\mathbb P^n_{\mathbb C}$ の連接層 $\mathcal F$ の有限全射表示 $0\to\mathcal K\to\mathcal E\to\mathcal F\to0$ を固定する。$\alpha^1_{P,\mathcal K}$ が単射であり、$\alpha^0_{P,\mathcal E}$ が同型、$\alpha^0_{P,\mathcal K}$ が全射であるとする。この三条件から $\alpha^0_{P,\mathcal F}$ が単射であることを示せ。

<!-- solution-start -->
**詳細解答**。$x\in H^0(P,\mathcal F)$ が $\alpha(x)=0$ を満たすとする。長完全列の自然性により $\alpha^1_{P,\mathcal K}(\partial x)=\partial\alpha(x)=0$。$\alpha^1_{P,\mathcal K}$ は単射なので $\partial x=0$。よって $x=v_*(e)$ となる $e\in H^0(P,\mathcal E)$ がある。

$v_*\alpha(e)=\alpha(v_*e)=0$ だから、解析側で $\alpha(e)=u_*k'$ となる $k'\in H^0(P^{\mathrm{an}},\mathcal K^{\mathrm{an}})$ を取れる。$\alpha^0_{P,\mathcal K}$ の全射性から $k'=\alpha(k)$ となる $k\in H^0(P,\mathcal K)$ がある。従って

$$
\alpha^0_{P,\mathcal E}(e-u_*k)=0.
$$

$\alpha^0_{P,\mathcal E}$ は単射だから $e=u_*k$、従って $x=v_*u_*k=0$。これで核が零となり、$\alpha^0_{P,\mathcal F}$ は単射である。重要なのは、解析側で見つけた $k'$ を代数側の $k$ へ戻すための全射性である。
<!-- solution-end -->

<a id="ex-cag1-05-b03"></a>
#### CAG1-05-B03 二重の点の境界写像
- Level: B

$P=\mathbb P^1$、$Z=\{X_1^2=0\}$ とする。$0\to\mathcal O_P(-2)\xrightarrow{X_1^2}\mathcal O_P\to i_*\mathcal O_Z\to0$ の零次・一次長完全列を書き、$\bar z\in\mathbb C[z]/(z^2)$（$z=X_1/X_0$）の連結像を求めよ。また解析側に移してもその次元と像が一致する理由を述べよ。

<!-- solution-start -->
**詳細解答**。[ねじり層の計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から

$$
0\to0\to\mathbb C\to H^0(Z,\mathcal O_Z)
\xrightarrow{\partial}\mathbb C\to0\to H^1(Z,\mathcal O_Z)\to0
$$

となる。よって $H^0(Z,\mathcal O_Z)$ は二次元で $H^1(Z,\mathcal O_Z)=0$。局所的には $H^0(Z,\mathcal O_Z)=\mathbb C\{1,\bar z\}$ である。

$\bar z$ を $U_0$ の $z$ へ持ち上げ、$U_1$ では零を選ぶと、交叉で差は $-z$。$X_1^2$ の乗法で逆に戻した $\mathcal O(-2)$ のコチェインは $-z/X_1^2=-1/(X_0X_1)$。従って

$$
\partial(\bar z)=[-1/(X_0X_1)]\ne0.
$$

解析化した短完全列は[局所完全性](../CAG1-03/index.md#thm-cag1-03-coherent-exact)で正確に残り、[ねじり層の比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)と連結写像の自然性から同じ代表を持つ。特に二次元の零次群と境界の非零性が一致する。
<!-- solution-end -->

<a id="ex-cag1-05-b04"></a>
#### CAG1-05-B04 閉埋込みに関する図式
- Level: B

$i:X\hookrightarrow\mathbb P^n$ を射影スキームの閉埋込みとし、$\mathcal F$ は $X$ 上の連接層とする。$H^1(X,\mathcal F)$ の比較を $\mathbb P^n$ 上の比較へ帰着する三段階を、各段階の必要条件とともに説明せよ。$X$ が非被約な場合の変更点も答えよ。

<!-- solution-start -->
**詳細解答**。第一に、閉埋込みの局所有限表示により $i_*\mathcal F$ は $\mathbb P^n$ 上の代数的連接層である。第二に、[直像と解析化の交換](#prop-cag1-05-closed-pushforward)で $(i_*\mathcal F)^{\mathrm{an}}\simeq i_*^{\mathrm{an}}\mathcal F^{\mathrm{an}}$ が成立し、両側の $H^1$ は閉埋込みの直像の $H^1$ と同型になる。第三に、[射影空間で証明したGAGA I](#thm-cag1-05-gaga-cohomology)を $i_*\mathcal F$ に適用して

$$
H^1(\mathbb P^n,i_*\mathcal F)
\simeq H^1((\mathbb P^n)^{\mathrm{an}},(i_*\mathcal F)^{\mathrm{an}})
$$

を得て、前後の直像同型で $X$ 上へ戻す。非被約な場合は局所環に冪零元があるが、解析化の[忠実平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)と有限表示の余核がそれを保つので、三段階のどの仮定も失われない。$X$ を「滑らかな多様体」と見なす置換は不要である。
<!-- solution-end -->

### Level C

<a id="ex-cag1-05-c01"></a>
#### CAG1-05-C01 三重に厚くした点を両側で比較する
- Level: C

$P=\mathbb P^1_{\mathbb C}$、$Z=\{X_1^3=0\}$、$z=X_1/X_0$ とする。次を示せ。

1. $H^0(Z,\mathcal O_Z)$ と $H^1(Z,\mathcal O_Z)$ を計算し、冪零元を含む基底を示す。
2. 完全列 $0\to\mathcal O_P(-3)\xrightarrow{X_1^3}\mathcal O_P\to i_*\mathcal O_Z\to0$ の連結写像が $\bar z,\bar z^2$ を送る二つのČech類を求め、両者が一次群の基底であると示す。
3. 解析化後に同じ結果が成り立つ理由を、局所構造と自然比較写像から説明する。

<!-- solution-start -->
**詳細解答**。

1. $Z\cap U_0=\operatorname{Spec}\mathbb C[z]/(z^3)$、$Z\cap U_1=\varnothing$ なので

   $$
   H^0(Z,\mathcal O_Z)=\mathbb C\{1,\bar z,\bar z^2\}.
   $$

   $Z$ はアフィンかつ零次元であり、[アフィン消滅](../../AG/AG3-08/index.md#thm-ag3-08-affine-vanishing)で $H^1(Z,\mathcal O_Z)=0$。射影直線の完全列からも確認できる。実際 $H^0(\mathcal O(-3))=0$、$H^1(\mathcal O(-3))\simeq\mathbb C^2$、$H^1(\mathcal O)=0$ を代入すると $0\to\mathbb C\to H^0(Z,\mathcal O_Z)\to\mathbb C^2\to0$ となり、三次元と一致する。

2. $\bar z$ と $\bar z^2$ を $U_0$ の正則関数 $z,z^2$ へ持ち上げ、$U_1$ 上には零を選ぶ。Čech微分はそれぞれ $-z,-z^2$ であり、射 $X_1^3$ の逆像は

   $$
   \partial(\bar z)=\left[-\frac{z}{X_1^3}\right]
   =\left[-\frac1{X_0X_1^2}\right],
   $$

   $$
   \partial(\bar z^2)=\left[-\frac{z^2}{X_1^3}\right]
   =\left[-\frac1{X_0^2X_1}\right].
   $$

   両分数の指数はそれぞれ $(-1,-2),(-2,-1)$ であり、[負指数による最高次基底](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)の二つに一致する。従ってこれらは一次独立で、$H^1(P,\mathcal O(-3))$ を張る。定数切断 $1$ の境界は零であり、長完全列の核と一致する。

3. [アフィン解析化の構成](../CAG1-02/index.md#def-cag1-02-affine-analytification)を $z^3=0$ に適用すると、原点の正則局所環を $(z^3)$ で割るため、解析側でも $1,\bar z,\bar z^2$ が残る。短完全列の解析化は正確であり、[自然比較写像](#def-cag1-05-comparison-map)は同じ二つの分数のČech類を同じ分数へ送る。[GAGA I](#thm-cag1-05-gaga-cohomology)によって零次・一次の比較は同型であり、群の次元も代表も一致する。
<!-- solution-end -->

<a id="ex-cag1-05-c02"></a>
#### CAG1-05-C02 射影平面の二重直線と非固有例
- Level: C

$P=\mathbb P^2_{\mathbb C}$、$H=\{X_2=0\}$、$Y=\{X_2^2=0\}$ とする。$j:Y\hookrightarrow P$ を閉埋込みとする。

1. $0\to\mathcal O_P(-2)\xrightarrow{X_2^2}\mathcal O_P\to j_*\mathcal O_Y\to0$ を使い、$H^q(Y,\mathcal O_Y)$ を全 $q\ge0$ で求めよ。
2. $Y$ は非被約なのに、なぜ $H^0(Y,\mathcal O_Y)$ に非零の大域冪零関数が増えないか、$H$ 上の核の層とその大域切断から説明せよ。
3. $Y$ へのGAGA Iの適用と、$\mathbb A^1$ の大域関数の比較が失敗することを、仮定の違いで説明せよ。

<!-- solution-start -->
**詳細解答**。

1. [射影平面のねじり層計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で $\mathcal O_P(-2)$ は全次数で零、$\mathcal O_P$ は零次のみ $\mathbb C$ である。よって長完全列の $H^0$ 部分は $0\to0\to\mathbb C\to H^0(Y,\mathcal O_Y)\to0$ となり、$H^0(Y,\mathcal O_Y)=\mathbb C$。$q\ge1$ では両隣のねじり層群が零なので $H^q(Y,\mathcal O_Y)=0$。

2. $Y$ の被約化は直線 $H$ であり、局所的な冪零元は $X_2$ の像である。還元写像の核を $\mathcal J$ とする。$X_2$ の一次の係数を取り出すと、$H$ 上の層として

   $$
   \mathcal J=(X_2)/(X_2^2)\simeq\mathcal O_H(-1),
   \qquad \mathcal J^2=0
   $$

   となる。[$H\simeq\mathbb P^1$ のねじり層計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から $H^0(H,\mathcal O_H(-1))=0$ なので、非零の大域冪零切断は存在しない。二重の点では冪零成分の大域切断があったのと対照的である。

3. $Y$ は $P$ への閉埋込みを持つので射影スキームであり、被約でなくても[閉埋込みの命題](#prop-cag1-05-closed-pushforward)と[GAGA I](#thm-cag1-05-gaga-cohomology)が適用できる。従って解析側も $H^0=\mathbb C$、高次群は零。一方、[アフィン直線の比較](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)では $e^z$ が解析的な零次切断として増える。$\mathbb A^1$ は非射影・非固有なので、GAGA Iの射影性の仮定を満たさず、矛盾はない。
<!-- solution-end -->

## 7. 証明の依存と次章への橋

ここで証明したのは、**射影スキーム上の代数的連接層**の全次数コホモロジー比較である。核心は、[ねじり層の全次数比較](../CAG1-04/index.md#thm-cag1-04-projective-comparison)から、[連接層の有限全射表示](#lem-cag1-05-finite-twist)と[次数降下の図式追跡](#lem-cag1-05-descending)により一般の層へ移る手順である。特異・非被約な $X$ は[閉埋込みの直像](#prop-cag1-05-closed-pushforward)で扱った。

**使用した入力と未証明部分**：解析側には前章で明示した[Cartanの定理B](../CAG1-04/index.md#thm-cag1-04-cartan-b)と解析的連接性・忠実平坦性を用いた。代数側ではNoether性・Proj上の有限生成と代数的Serreの大域生成補題を用いた。後者は[Stacks Project, Tag 01YR](https://stacks.math.columbia.edu/tag/01YR)の結果であり、一般の有限生成層に対する次数付き局所化の延長補題の完全証明は本章で再録していない。一方、代数的Serre消滅の降下帰納と、**GAGA Iそのものの全射・単射の帰納は本文で展開した**。解析側の高次消滅は標準交叉のStein性と同じ定理Bから導出し、別の解析的Serre消滅を未証明のまま混入させていない。

次章で扱う層の射の代数性は、局所的な $\mathcal Hom$ の解析化と、本章で確かめた **$H^0$ の比較**を結び付ける問題になる。解析的連接層が全て代数化できるという存在定理はさらにその後で扱う。

**出典・照合資料**：[Serre, *Géométrie algébrique et géométrie analytique* (1956)](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/)、[Kedlaya, MIT 18.726 *GAGA* 講義ノート](https://ocw.mit.edu/courses/18-726-algebraic-geometry-spring-2009/resources/mit18_726s09_lec22_gaga/)、[Stacks Project, Coherent sheaves on Proj, I](https://stacks.math.columbia.edu/tag/01YR)。証明の降下帰納と有限全射表示の論理をこれらの一次・大学講義資料と照合した。
