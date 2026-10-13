# AG3-08 層コホモロジーの基本計算

[前章のČechコホモロジー](../AG3-07/index.md#def-ag3-07-cech-cohomology)は、開被覆の重なり上に現れる「消せない差」を測りました。しかし被覆を替えると複体そのものが変わります。そこで、被覆に依存せず、しかも短完全列から計算できる量を作ります。これを後に**被覆に依存しないコホモロジー群**として定義します。

たとえば射影直線上の局所切断は二つのアフィンチャートで記述できます。重なりの Laurent 多項式から得た計算を、いつ真のコホモロジー群と呼べるでしょうか。本章では、まず大域切断が完全性を保たない理由を確認し、次に層コホモロジーの定義、アフィン消滅、計算に使える被覆の条件を順に確かめます。最後に射影直線の実計算と短完全列を結び付けます。

以下、環は可換・単位的、$X$ はスキーム、$\mathcal F$ は原則として $\mathcal O_X$-加群の層とします。高次コホモロジーの抽象構成には一般の層を使いますが、アフィン消滅とČech比較の計算対象は**準連接層**とします。特に被覆の各有限交叉がアフィンである場合を扱い、任意の被覆についてČech群と層コホモロジーが一致すると仮定しません。

## 1. 大域切断はなぜ右端の全射性を失うか

[層の完全性の茎判定](../AG3-07/index.md#thm-ag3-07-exact-stalks)では、短完全列の末尾の全射とは「各点の近くで持ち上げられる」ことでした。一方で $\Gamma(X,-)$ は全体で一つの持ち上げを要求します。その差を数式で記録します。

<a id="prop-ag3-08-left-exact"></a>

<!-- formal-statement-start -->
> **命題（大域切断の左完全性）**  
> 任意の環付き空間 $X$ の $\mathcal O_X$-加群の短完全列
>
$$
0\longrightarrow\mathcal F'\xrightarrow{\alpha}\mathcal F
\xrightarrow{\beta}\mathcal F''\longrightarrow0
$$
>
> に大域切断を取ると、列
>
$$
0\longrightarrow\Gamma(X,\mathcal F')
\xrightarrow{\Gamma\alpha}\Gamma(X,\mathcal F)
\xrightarrow{\Gamma\beta}\Gamma(X,\mathcal F'')
$$
>
> は完全である。末尾の $\Gamma\beta$ は一般に全射ではない。
<!-- formal-statement-end -->

### 証明の見取り図

左端では切断そのものの単射性、中間では局所的に核に入る切断を貼ることを使います。右端には貼り合わせる前の局所持ち上げしかありません。

<!-- proof-start -->
### 証明

$\alpha$ が単射なら任意の開集合で $\alpha_U$ は単射なので、特に $\alpha_X$ も単射です。$\beta_X\alpha_X=0$ は層の射の合成が零であることから従います。逆に $s\in\Gamma(X,\mathcal F)$ が $\beta_X(s)=0$ なら、各点の近傍 $U_i$ 上では短完全性により $s|_{U_i}=\alpha(t_i)$ となります。$U_i\cap U_j$ 上で $\alpha(t_i-t_j)=0$ ですから、$\alpha$ の単射性により $t_i=t_j$。層の貼り合わせによる $t\in\Gamma(X,\mathcal F')$ が存在し、$\alpha(t)=s$ です。

右端の反例として $\mathbb P^1_k$ 上の[前章のKoszul型短完全列](../AG3-07/index.md#prop-ag3-07-connecting-obstruction)で用いた
$$
0\to\mathcal O(-2)\to\mathcal O(-1)^{\oplus2}\to\mathcal O\to0
$$
を取ります。[二チャート計算](../AG3-07/index.md#thm-ag3-07-p1-cech)から大域切断の右端は $0\to k$ です。従って $1\in k$ は持ち上がらず、末尾は全射ではありません。
<!-- proof-end -->

この「全射にならなかった分」を第一コホモロジーが測ります。ただしそれには、特定の被覆をいったん離れた定義が必要です。

## 2. 大域切断から層コホモロジーを構成する

加群の列に対する核・像・商と同様に、層の列も茎ごとに完全性を調べられます。大域切断という左完全な操作を、十分大きな層を経由させて高次へ延長します。「入射的な層」はそのための補助対象で、最終的な群は選択によらなくなります。

<a id="def-ag3-08-injective-resolution"></a>

<!-- formal-statement-start -->
> **定義（入射層と入射分解）**  
> 環付き空間 $(X,\mathcal O_X)$ において、$\mathcal O_X$-加群の層 $\mathcal I$ が**入射的**とは、任意の単射 $\mathcal A\hookrightarrow\mathcal B$ と任意の射 $\mathcal A\to\mathcal I$ が $\mathcal B\to\mathcal I$ へ延長できることをいう。$\mathcal F$ の**入射分解**とは、入射的な層からなる完全列
>
$$
0\longrightarrow\mathcal F\longrightarrow\mathcal I^0
\xrightarrow{d^0}\mathcal I^1\xrightarrow{d^1}\mathcal I^2\longrightarrow\cdots
$$
>
> をいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-08-injective-resolution -->
**定義の使い方の確認**：有限集合 $X=\{x,y\}$ に離散位相を入れ、係数体 $k$ の定数環の層を考えます。この場合、層は二つの $k$-ベクトル空間 $(V_x,V_y)$ の組に等しく、単射も各成分の単射です。各 $k$-線形写像 $U_x\to V_x$ は $U_x\subseteq W_x$ に対して基底を延長して $W_x\to V_x$ へ延長でき、$y$ 側も同様です。従ってすべての層が入射的で、$\mathcal F\to\mathcal F\to0$ 自体が入射分解になります。抽象定義でも、点ごとに独立なら高次の障害がないことを表します。
<!-- definition-example-end -->

一般の環付き空間の加群の層には十分な入射対象があります。具体的には、各点の茎を入射加群へ埋め込み、各点への押し出しの積を取る操作を繰り返して分解を構成できます。この存在だけを前提にしても、以下のコホモロジーは具体的に定義できます。

<a id="def-ag3-08-sheaf-cohomology"></a>

<!-- formal-statement-start -->
> **定義（層コホモロジー）**  
> 環付き空間 $(X,\mathcal O_X)$、$\mathcal O_X$-加群の層 $\mathcal F$、その入射分解 $\mathcal F\to\mathcal I^\bullet$ に対し
>
$$
H^0(X,\mathcal F)=\ker\bigl(\Gamma(X,\mathcal I^0)\to\Gamma(X,\mathcal I^1)\bigr),
$$
$$
H^q(X,\mathcal F)=
\frac{\ker\bigl(\Gamma(X,\mathcal I^q)\to\Gamma(X,\mathcal I^{q+1})\bigr)}
{\operatorname{im}\bigl(\Gamma(X,\mathcal I^{q-1})\to\Gamma(X,\mathcal I^q)\bigr)}
\quad(q\ge1)
$$
>
> と定める。別の入射分解を選んでも自然同型で一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-08-sheaf-cohomology -->
**定義の確認**：上の二点離散空間において $\mathcal F\to\mathcal F\to0$ を使うと、$\Gamma(X,\mathcal F)=V_x\oplus V_y$ であり、
$$
H^0(X,\mathcal F)=V_x\oplus V_y,\qquad
H^q(X,\mathcal F)=0\quad(q\ge1)
$$
です。分母と分子が零になる次数を実際に確認できます。一般には同じ一項分解が使えるわけではありません。
<!-- definition-example-end -->

<a id="prop-ag3-08-resolution-independence"></a>

<!-- formal-statement-start -->
> **命題（分解の選択不変性と零次）**  
> 任意の環付き空間 $X$ と $\mathcal O_X$-加群の層 $\mathcal F$ について、二つの入射分解から得る $H^q(X,\mathcal F)$ は各次数で自然同型であり、
>
$$
H^0(X,\mathcal F)\simeq\Gamma(X,\mathcal F)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つの分解の間に恒等射を延長して鎖写像を作ります。逆向きの鎖写像との合成が恒等と鎖ホモトピーになるので、コホモロジー群が一致します。

<!-- proof-start -->
### 証明

$\mathcal F\to\mathcal I^\bullet$ と $\mathcal F\to\mathcal J^\bullet$ を取ります。$\mathcal F\hookrightarrow\mathcal I^0$ と $\mathcal F\to\mathcal J^0$ に $\mathcal J^0$ の入射性を適用し、$\phi^0:\mathcal I^0\to\mathcal J^0$ を作ります。次に
$$
\mathcal I^0/\mathcal F\simeq\operatorname{im}d_{\mathcal I}^0
\hookrightarrow\mathcal I^1
$$
上に、$\phi^0$ の像を $\mathcal J^0\to\mathcal J^1$ へ送る写像を定めます。$\phi^0|_{\mathcal F}=\mathrm{id}_{\mathcal F}$ であり $\mathcal F$ は微分の核なので、この写像は商上で well-defined です。$\mathcal J^1$ の入射性によって $\phi^1:\mathcal I^1\to\mathcal J^1$ へ延長します。同じ構成を順に繰り返し、$d_{\mathcal J}\phi=\phi d_{\mathcal I}$ を満たす鎖写像を得ます。

二つの延長 $\phi,\psi$ について、差 $\phi^0-\psi^0$ は $\mathcal F$ 上で零です。従って $\operatorname{im}d_{\mathcal I}^0\subseteq\mathcal I^1$ から $\mathcal J^0$ への写像として因子化し、$\mathcal J^0$ の入射性で $h^1:\mathcal I^1\to\mathcal J^0$ へ延長できます。このとき $\phi^0-\psi^0=h^1d_{\mathcal I}^0$ です。次数 $n$ では
$$
\phi^n-\psi^n-d_{\mathcal J}^{n-1}h^n
$$
が $\ker d_{\mathcal I}^n=\operatorname{im}d_{\mathcal I}^{n-1}$ 上で零になるように帰納的に $h^n$ を選び、同じ入射性で $h^{n+1}$ を延長します。結果として
$$
\phi-\psi=d_{\mathcal J}h+hd_{\mathcal I}
$$
です。大域切断を取ってもこの式は保たれ、右辺はコホモロジー上で零写像です。逆方向にも鎖写像を作ると、両向きの合成は恒等射の延長なので、上の議論で恒等射と鎖ホモトピーです。従って同型を誘導します。

零次では $\mathcal F=\ker(\mathcal I^0\to\mathcal I^1)$ が**層として**成立します。[大域切断の左完全性](#prop-ag3-08-left-exact)を適用すると
$$
\Gamma(X,\mathcal F)=
\ker\bigl(\Gamma(X,\mathcal I^0)\to\Gamma(X,\mathcal I^1)\bigr)
$$
であり、定義した $H^0$ に一致します。
<!-- proof-end -->

**どこに計算の難しさが残るか**：入射分解は定義のために必要ですが、通常の計算で直接書き下すには巨大です。次節では、短完全列とアフィン開被覆により、入射分解を実際に構成せずに計算する方法を得ます。

## 3. 短完全列から長完全列へ

短完全列の右端で大域切断が全射とならないことを補うには、その欠損を $H^1$ へ送ればよいと考えます。高次も同様に連なります。

<a id="thm-ag3-08-long-exact"></a>

<!-- formal-statement-start -->
> **定理（層コホモロジーの長完全列）**  
> 環付き空間 $X$ 上の $\mathcal O_X$-加群の短完全列 $0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0$ に対し、自然な連結準同型 $\partial^q$ が存在し、
>
$$
\begin{aligned}
0&\to H^0(X,\mathcal F')\to H^0(X,\mathcal F)
\to H^0(X,\mathcal F'')\\
&\xrightarrow{\partial^0}H^1(X,\mathcal F')
\to H^1(X,\mathcal F)\to H^1(X,\mathcal F'')\\
&\xrightarrow{\partial^1}H^2(X,\mathcal F')\to\cdots
\end{aligned}
$$
>
> は完全である。
<!-- formal-statement-end -->

### 証明の見取り図

短完全列に整合する分解を選ぶと、各次数で短完全な複体が得られます。右端のコサイクルを中間へ持ち上げ、その微分を左端へ戻すと、次数が一つ上がります。この操作が連結準同型です。

<!-- proof-start -->
### 証明

入射分解を整合して並べる標準的な馬蹄構成を説明します。$\mathcal F',\mathcal F''$ の入射分解を $\mathcal I'^\bullet,\mathcal I''^\bullet$ とし、$\mathcal F$ から $\mathcal I'^0\oplus\mathcal I''^0$ へ、左の核上では $\mathcal I'^0$ への埋込み、右成分では $\mathcal I''^0$ への埋込みを延長して写します。核からの写像を中間へ延長できるのは入射性によります。この段階の余核に同じ操作を繰り返して、各次数で分裂する短完全列
$$
0\to\mathcal I'^q\to\mathcal I^q\to\mathcal I''^q\to0
$$
を持つ分解を得ます。分裂しているので、大域切断を取っても各次数の列は短完全です。

そこで三つの大域切断複体を $A^\bullet,B^\bullet,C^\bullet$ と書きます。$[c]\in H^q(C^\bullet)$ に対して $dc=0$ を満たす代表 $c\in C^q$ を選び、$B^q\to C^q$ の全射性で $b\in B^q$ を取ります。$db$ は $C^{q+1}$ で $dc=0$ に写るので、一意の $a\in A^{q+1}$ があって $db=\iota(a)$ です。$d^2b=0$ と $\iota$ の単射性から $da=0$。これにより
$$
\partial^q[c]=[a]
$$
と定めます。

持ち上げを $b+\iota(v)$ に替えると $a$ は $a+dv$ に替わるだけなので類は不変です。$c$ を $c+dw$ に替えた場合は $w$ を $B^{q-1}$ に持ち上げ、その微分を $b$ に加えると $a$ は変わりません。完全性も直接示せます。$\partial[c]=0$ なら $a=dv$ なので $b-\iota(v)$ はコサイクルとなり $[c]$ は $H^q(B)$ から来ます。逆方向は $b$ がコサイクルなら $a=0$。同じ持ち上げの議論を $A\to B$ と $B\to C$ の箇所にも適用すると、各位置で核と像が一致します。以上が長完全列です。
<!-- proof-end -->

この証明は層コホモロジーを特別扱いしていません。「短完全な複体 → 長完全なコホモロジー列」という計算機構を確認したものです。

## 4. アフィンでは障害が消える：どこまで証明できるか

準連接層の[アフィン上の加群との対応](../AG3-06/index.md#thm-ag3-06-affine-equivalence)は、$\operatorname{Spec}A$ の切断を加群として取り扱わせてくれました。高次にも同様の消滅が起こります。鍵は、被覆に使う元が単位イデアルを生成するという一点です。

<a id="lem-ag3-08-principal-cech"></a>

<!-- formal-statement-start -->
> **補題（主開被覆の増大Čech複体）**  
> $A$ を可換環、$M$ を $A$-加群、$(f_1,\ldots,f_r)=A$ とする。このとき
>
$$
0\longrightarrow M
\longrightarrow\prod_i M_{f_i}
\longrightarrow\prod_{i<j}M_{f_if_j}
\longrightarrow\cdots
\longrightarrow M_{f_1\cdots f_r}\longrightarrow0
$$
>
> は[Čech交代微分](../AG3-07/index.md#def-ag3-07-cech-complex)について完全である。
<!-- formal-statement-end -->

### 証明の見取り図

全ての素イデアルで局所化すれば十分です。各素イデアルでは、被覆に使った $f_i$ の少なくとも一つが単元になります。その添字を差し込む操作が交代微分の縮約を与えます。

<!-- proof-start -->
### 証明

任意の素イデアル $\mathfrak p$ を固定します。$1=\sum_i a_if_i$ なので、全ての $f_i$ が $\mathfrak p$ に入ることはありません。$f_j\notin\mathfrak p$ となる $j$ を選びます。有限積と局所化は交換するので、表示した複体を $A_{\mathfrak p}$ で局所化してよいです。この環では $f_j$ が単元となり
$$
(M_{f_j})_{\mathfrak p}=M_{\mathfrak p}.
$$
添字の重複を含む交代コチェインは零とみなし、任意の $q$-コチェイン $c$ の縮約を
$$
(hc)_{i_0\cdots i_{q-1}}=c_{j\,i_0\cdots i_{q-1}}
$$
と置きます。右辺は添字を昇順に並べ替えた際の符号を含みます。$f_j$ が単元なので、右辺の切断は必要な交叉の局所化へ制限できます。

交代微分を展開すると、$j$ を削除する項は $c_{i_0\cdots i_q}$ を一度だけ残します。他の各項は「先に $j$ を差し込み一つを消す」場合と「先に一つを消してから $j$ を差し込む」場合で符号が反対になり相殺します。従って増大複体の全次数で
$$
\delta h+h\delta=\operatorname{id}
$$
となります。特に局所化後の複体は完全です。

ある $A$-加群 $N$ が全ての素イデアルで $N_{\mathfrak p}=0$ なら $N=0$ です。実際 $0\ne n\in N$ なら $\operatorname{Ann}(n)$ を含む極大イデアル $\mathfrak m$ を取ると $n/1\ne0$ が $N_{\mathfrak m}$ に残り、矛盾します。各コホモロジー加群をこの原理へ適用すると元の複体も完全です。
<!-- proof-end -->

上の補題は**Čech複体の完全性**を直接証明したもので、まだ層コホモロジーの消滅を述べたものではありません。両者を結ぶ基底比較を次に明示します。

<a id="lem-ag3-08-basis-comparison"></a>

<!-- formal-statement-start -->
> **補題（Čech零化から層コホモロジーの零化）**  
> 位相空間 $Y$ とアーベル群の層 $\mathcal G$ を考える。開集合の基底 $\mathcal B$ があり、各基底開集合の任意の開被覆には指定された基底被覆による細分があるとする。指定被覆とその有限交叉におけるČech複体が正次数で完全であり、同じ性質が基底開部分でも成立するなら、任意の $U\in\mathcal B$ に対して
>
$
H^q(U,\mathcal G)=0\qquad(q>0)
$
>
> が成り立つ。
<!-- formal-statement-end -->

### 基底比較の証明機構

ここで必要なのは、**各開集合の切断が層の全射から自動的に持ち上がるとは限らない**点です。基底被覆を細分してはじめて持ち上げが存在します。次の手順でそれを扱います。

<!-- proof-start -->
### 証明

入射層への単射 $0\to\mathcal G\to\mathcal I\to\mathcal Q\to0$ を取ります。入射層の制限写像は全射（フラスク性）であるため、被覆上のČech複体は正次数で縮約でき、$\check H^{>0}(-,\mathcal I)=0$ です。また任意の $\mathcal Q(U)$ の切断は、$\mathcal I\to\mathcal Q$ が層として全射であることから、$U$ の基底被覆をさらに細分すれば局所的に持ち上がります。

この二点を使い、$\mathcal Q$ の基底被覆での $q$-コサイクルを $\mathcal I$ へ局所的に持ち上げると、その微分は $\mathcal G$ の $(q+1)$-コサイクルになります。持ち上げの差は境界に変わり、さらに細分しても同じ類を表します。従って被覆を細分した極限では、正次数で
$$
\varinjlim_{\mathfrak U}\check H^q(\mathfrak U,\mathcal Q)
\simeq
\varinjlim_{\mathfrak U}\check H^{q+1}(\mathfrak U,\mathcal G)
$$
という次数移動が得られます。右辺は仮定により零です。零次では層の貼り合わせから $\check H^0(U,\mathcal Q)=\Gamma(U,\mathcal Q)$ です。よって $\Gamma(U,\mathcal I)\to\Gamma(U,\mathcal Q)$ の余核も、局所持ち上げから得るČech一次障害が細分で消えるので零です。

入射層は高次層コホモロジーを持ちません。従って[長完全列](#thm-ag3-08-long-exact)で $H^1(U,\mathcal G)=0$ となり、さらに $H^q(U,\mathcal Q)\simeq H^{q+1}(U,\mathcal G)$ です。同じ議論を $\mathcal Q$ に対して繰り返せば、次数移動によって各 $H^q(U,\mathcal G)$ が零になります。ここで必要な被覆の細分は、基底被覆が任意の開被覆を細分でき、各有限交叉でも同様に行えるという仮定で保証されています。
<!-- proof-end -->

この補題は通常、Čechコホモロジーと導来コホモロジーの比較に使う基底消滅補題と呼ばれます。具体的な計算へ適用するときは、基底・有限交叉・細分可能性をその場で確認します。

<a id="thm-ag3-08-affine-vanishing"></a>

<!-- formal-statement-start -->
> **定理（準連接層のアフィン消滅）**  
> 可換環 $A$、$X=\operatorname{Spec}A$、準連接層 $\mathcal F=\widetilde M$ に対し、
>
$$
H^0(X,\mathcal F)=M,\qquad
H^q(X,\mathcal F)=0\quad(q\ge1).
$$
>
> 特にアフィン上では、準連接層の短完全列に大域切断を取っても短完全性が保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

主開集合は位相の基底です。すべての主開集合の有限主開被覆に対して、先ほどの複体を $A_f$ と $M_f$ で作り直せます。増大Čech複体の完全性を基底比較に適用します。

<!-- proof-start -->
### 証明

任意の主開 $D(g)$ は $\operatorname{Spec}A_g$ です。[準連接層の主開切断](../AG3-06/index.md#thm-ag3-06-tilde-sheaf)によって、その上の制限は $\widetilde{M_g}$ です。$D(g)$ の有限主開被覆 $D(gf_i)$ は、$A_g$ で $(f_1,\ldots,f_r)=A_g$ を意味します。したがって[主開被覆の補題](#lem-ag3-08-principal-cech)を $(A_g,M_g)$ に適用すると、各主開上で増大Čech複体が正次数で完全です。

主開集合は位相の基底であり、二つの主開集合の交叉も $D(f)\cap D(g)=D(fg)$ という主開です。主開 $D(g)$ は準コンパクトなので、その任意の開被覆から有限個の主開細分を取れます。[基底比較補題](#lem-ag3-08-basis-comparison)の条件が満たされ、$H^q(D(g),\mathcal F)=0$（$q>0$）を得ます。$g=1$ とすると高次消滅です。

零次は[アフィン上の加群と層の対応](../AG3-06/index.md#thm-ag3-06-affine-equivalence)により $\Gamma(X,\widetilde M)=M$ です。短完全列については[長完全列](#thm-ag3-08-long-exact)の接続先 $H^1(X,\mathcal F')$ が零なので、$\Gamma(X,\mathcal F)\to\Gamma(X,\mathcal F'')$ まで全射となります。
<!-- proof-end -->

**仮定の意味**：これは任意の層についての消滅定理ではなく、**準連接層**についての定理です。上の証明で $M_{fg}$ という局所化を使った箇所が準連接性への依存箇所です。例えば非アフィンな射影直線では、前章の $\mathcal O(-2)$ に高次コホモロジーが残ります。

## 5. いつČechの計算が本当のコホモロジーになるか

各チャートだけでなく、重なりの全てがアフィンなら、その上では前節の高次コホモロジーが零です。重なりをまとめるČech複体が、高次コホモロジーを余分な項なしに計算できる条件はこれです。

<a id="thm-ag3-08-cech-comparison"></a>

<!-- formal-statement-start -->
> **定理（アフィン交叉を持つ被覆のČech比較）**  
> $X$ をスキーム、$\mathcal F$ を準連接層、$\mathfrak U=(U_0,\ldots,U_m)$ を有限開被覆とする。空でない任意の有限交叉
>
$$
U_{i_0\cdots i_p}=U_{i_0}\cap\cdots\cap U_{i_p}
$$
>
> がアフィンスキームであれば、すべての $q\ge0$ について自然な同型
>
$$
\check H^q(\mathfrak U,\mathcal F)\simeq H^q(X,\mathcal F)
$$
>
> が成り立つ。特に、有限アフィン開被覆を持つ分離スキームでは任意の有限交叉がアフィンであり、この比較を適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

入射分解を使って各交叉上の切断も同時に取り、Čech次数と分解次数の二方向を持つ二重複体を作ります。縦方向ではアフィン消滅、横方向では入射層のフラスク性を使います。同じ全複体のコホモロジーを二通りに計算します。

<!-- proof-start -->
### 証明

$\mathcal F\to\mathcal I^\bullet$ を入射分解とします。$p,q\ge0$ に対し
$$
K^{p,q}
=\prod_{i_0<\cdots<i_p}
\Gamma(U_{i_0\cdots i_p},\mathcal I^q)
$$
を作り、横微分をČechの交代和 $\delta$、縦微分を入射分解の $d$ とします。全複体の次数 $n$ 成分は $\bigoplus_{p+q=n}K^{p,q}$、全微分は $D=\delta+(-1)^p d$ とします。$\delta d=d\delta$ なので $D^2=0$ です。

まず横方向に計算します。入射層はフラスク、すなわち制限写像が全射です。有限被覆について、前の添字の最大のものから切断を延長する操作を繰り返せばČechの正次数コサイクルは境界となります。零次は[零次Čech同型](../AG3-07/index.md#thm-ag3-07-cech-h0)によって $\Gamma(X,\mathcal I^q)$ です。従って横方向のコホモロジーを先に取ると、全複体は $\Gamma(X,\mathcal I^\bullet)$ のコホモロジー、すなわち $H^\bullet(X,\mathcal F)$ を与えます。

次に縦方向に計算します。各交叉上へ入射分解を制限したものは依然としてフラスク分解です。フラスク層は高次コホモロジー計算に使えるため、その縦コホモロジーは $H^q(U_{i_0\cdots i_p},\mathcal F)$ です。仮定で交叉はアフィンなので[アフィン消滅](#thm-ag3-08-affine-vanishing)から $q>0$ の縦コホモロジーは零、$q=0$ では $\Gamma(U_{i_0\cdots i_p},\mathcal F)$ となります。従って縦方向を先に計算すると、全複体はČech複体 $C^\bullet(\mathfrak U,\mathcal F)$ のコホモロジーを与えます。

有限被覆なので各全次数には有限個の $K^{p,q}$ しか現れず、行・列による段階的な消去は同じ全複体のコホモロジーへ収束します。両方の計算を同定すると主張を得ます。

最後に分離スキームでは対角射が閉埋込みです。アフィン開 $U,V$ の交叉は $U\times V$ のアフィン開における対角の閉部分として記述でき、閉部分スキームはアフィンなので $U\cap V$ もアフィンです。二つずつ繰り返して有限交叉にも従います。
<!-- proof-end -->

**反例の機構を把握する**：この比較の仮定を外し、ある交叉がアフィンでなく $H^q(U_I,\mathcal F)$ が残る場合、縦方向の計算には $q>0$ の行が残ります。したがって零次の切断だけで作るČech複体は全複体の全情報を受け取れず、一致を自動的に主張できません。具体的な非零の交叉コホモロジーがなくても、証明がどこで使えなくなるかは判定できます。

## 6. 二つのアフィンで覆うときの完全な計算手順

$X=U\cup V$、$U,V,U\cap V$ がアフィン、$\mathcal F$ が準連接層なら、Čech複体は二項だけです。高次は消え、零次は等しい局所切断、一次は重なりの商として求まります。

<a id="thm-ag3-08-mayer-vietoris"></a>

<!-- formal-statement-start -->
> **定理（二アフィン被覆のMayer–Vietoris列）**  
> $X=U\cup V$ が二つのアフィン開集合による被覆で、$U\cap V$ もアフィン、$\mathcal F$ が準連接層なら
>
$$
\begin{aligned}
0&\to H^0(X,\mathcal F)
\to\mathcal F(U)\oplus\mathcal F(V)
\xrightarrow{\rho}\mathcal F(U\cap V)\\
&\to H^1(X,\mathcal F)\to0,\qquad
H^q(X,\mathcal F)=0\ (q\ge2),
\end{aligned}
$$
>
> ただし $\rho(a,b)=b|_{U\cap V}-a|_{U\cap V}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの開集合では三重の異なる添字がないため、Čech複体は次数一で終わります。比較定理でコホモロジーを同定します。

<!-- proof-start -->
### 証明

[Čech複体](../AG3-07/index.md#def-ag3-07-cech-complex)は
$$
C^0=\mathcal F(U)\oplus\mathcal F(V),\qquad
C^1=\mathcal F(U\cap V),\qquad C^q=0\ (q\ge2)
$$
であり、唯一の微分が $\rho$ です。従って $\check H^0=\ker\rho$、$\check H^1=\operatorname{coker}\rho$、$\check H^q=0$（$q\ge2$）です。[アフィン被覆比較定理](#thm-ag3-08-cech-comparison)の適用条件は $U,V,U\cap V$ のアフィン性で満たされます。各Čech群を $H^q(X,\mathcal F)$ と置き換えれば主張を得ます。
<!-- proof-end -->

**射影直線への適用**：$X=\mathbb P^1_k$、$U_0=\operatorname{Spec}k[t]$、$U_1=\operatorname{Spec}k[t^{-1}]$、交叉 $\operatorname{Spec}k[t,t^{-1}]$ はすべてアフィンです。[ねじれ層の局所基底](../AG2-06/index.md#def-ag2-06-twisting-sheaf)で $e_1=t^de_0$ です。よって
$$
\rho(f,g)=t^dg(t^{-1})-f(t),\qquad
H^1(X,\mathcal O(d))
=\frac{k[t,t^{-1}]}{k[t]+t^dk[t^{-1}]}.
$$

<a id="thm-ag3-08-p1-cohomology"></a>

<!-- formal-statement-start -->
> **定理（射影直線の層コホモロジー）**  
> 体 $k$ と整数 $d$ に対し、
>
$$
h^0(\mathbb P^1_k,\mathcal O(d))=\max(d+1,0),
\qquad
h^1(\mathbb P^1_k,\mathcal O(d))=\max(-d-1,0),
$$
>
> かつ $H^q(\mathbb P^1_k,\mathcal O(d))=0$（$q\ge2$）である。ここで $h^q=\dim_k H^q$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

前章で計算した指数の範囲を、比較定理によって層コホモロジーの式として読み直します。零次と一次の次元差もすぐ分かります。

<!-- proof-start -->
### 証明

[前章のLaurent指数計算](../AG3-07/index.md#thm-ag3-07-p1-cech)では、$\ker\rho$ の単項式は $0\le n\le d$、$\operatorname{coker}\rho$ に残る単項式は $d<n<0$ だけでした。前者は $d\ge0$ で $d+1$ 個、負の $d$ では零個です。後者は $d\le-2$ で $-d-1$ 個、それ以外では零個です。これは[二アフィン被覆の定理](#thm-ag3-08-mayer-vietoris)により、まさしく $H^0$ と $H^1$ の次元です。同定に使用したチャートと交叉は全てアフィンであることを確認しました。高次消滅も[二アフィン被覆のMayer–Vietoris列](#thm-ag3-08-mayer-vietoris)から従います。
<!-- proof-end -->

例えば $d=-3$ なら $H^0=0$、$H^1$ は $[t^{-2}],[t^{-1}]$ を基底とする二次元空間です。一方 $d=2$ なら $H^0$ は $1,t,t^2$ に対応する三次元空間で、$H^1=0$ です。この差はコホモロジーの定義に依存しない実際の幾何学的な量となりました。

## 7. 局所持ち上げの障害が長完全列の連結写像になる

前章では各チャート上の持ち上げの差から一次Čech類を作りました。今なら、その障害が長完全列の連結準同型 $\partial^0$ そのものであると確かめられます。

<a id="prop-ag3-08-connecting-cech"></a>

<!-- formal-statement-start -->
> **命題（局所持ち上げと連結準同型）**  
> $X$ を有限アフィン開被覆 $\mathfrak U$ の全有限交叉がアフィンであるスキームとし、準連接層の短完全列 $0\to\mathcal F'\xrightarrow{\alpha}\mathcal F\xrightarrow{\beta}\mathcal F''\to0$ を取る。$s\in H^0(X,\mathcal F'')$ の局所持ち上げ $t_i\in\mathcal F(U_i)$ を選ぶと、
>
$$
\alpha(c_{ij})=t_j-t_i
$$
>
> で定めた $\check H^1(\mathfrak U,\mathcal F')$ の類は、[Čech比較](#thm-ag3-08-cech-comparison)の同型で $\partial^0(s)\in H^1(X,\mathcal F')$ に一致する。特に $\partial^0(s)=0$ と $s$ の大域持ち上げ可能性は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

各チャートはアフィンなので、短完全列の切断は全射です。Čech複体についても次数ごとに短完全列ができ、連結写像の持ち上げ→微分→核への戻しがそのまま $t_j-t_i$ となります。

<!-- proof-start -->
### 証明

各有限交叉 $U_I$ はアフィンなので、[アフィン消滅](#thm-ag3-08-affine-vanishing)と[長完全列](#thm-ag3-08-long-exact)から $\mathcal F(U_I)\to\mathcal F''(U_I)$ は全射です。従って三つのČech複体の各次数で短完全な列が得られます。

零次コサイクル $s$ を $C^0(\mathfrak U,\mathcal F)$ へ持ち上げたものが $t=(t_i)$ です。そのČech微分は $(t_j-t_i)_{ij}$。$\beta(\delta t)=\delta s=0$ なので、単射 $\alpha$ を逆にたどって $c=(c_{ij})$ を得ます。$\delta^2t=0$ から $\alpha(\delta c)=0$、ゆえに $\delta c=0$ です。これは[複体の連結写像の構成](#thm-ag3-08-long-exact)と同じ操作であり、Čechと入射分解の比較を通じて $\partial^0(s)$ に一致します。

零類であれば $c=\delta a$ と書き換え、$t_i-\alpha(a_i)$ を各 $U_i$ 上で貼れば大域持ち上げができます。逆に大域持ち上げがあればその制限を選んで $c=0$ にできます。この最後の同値は[前章の障害命題](../AG3-07/index.md#prop-ag3-07-connecting-obstruction)の計算そのものです。
<!-- proof-end -->

**Koszul型短完全列の完成した解釈**：射影直線上で
$$
0\to\mathcal O(-2)\xrightarrow{(-X_1,X_0)}
\mathcal O(-1)^{\oplus2}\xrightarrow{(X_0,X_1)}
\mathcal O\to0
$$
に適用します。$H^0(\mathcal O(-2))=H^0(\mathcal O(-1))=0$、$H^1(\mathcal O(-1))=H^1(\mathcal O)=0$ です。従って長完全列の該当部分は
$$
0\longrightarrow k
\xrightarrow{\ \partial^0\ }
H^1(\mathbb P^1_k,\mathcal O(-2))
\longrightarrow0.
$$
[前章の局所持ち上げ計算](../AG3-07/index.md#prop-ag3-07-connecting-obstruction)を具体化すると、$U_0$ 上で $(X_0^{-1},0)$、$U_1$ 上で $(0,X_1^{-1})$ を選び、差は $\alpha(t^{-1}X_0^{-2})$ です。従って
$$
\partial^0(1)=[t^{-1}]\ne0.
$$
これは $k\simeq H^1(\mathcal O(-2))$ の同型を、抽象的な群の次元だけでなく生成元のレベルで表しています。

## 8. 演習：定義から長完全列・射影直線まで

### A1. 離散二点空間の高次群

二点離散空間 $X=\{x,y\}$ 上の体 $k$ の加群の層 $\mathcal F$ の茎が $V_x=k^2,V_y=k$ であるとする。$H^q(X,\mathcal F)$ を全次数で求めよ。

- Level: A
- ID: AG3-08-A1

<!-- solution-start -->
### 詳細解答

二点離散空間の各開集合は点の和であり、切断は対応する茎の直和です。従って $\Gamma(X,\mathcal F)=k^2\oplus k\simeq k^3$ です。$k$-ベクトル空間の単射は補空間の基底を選ぶことで分裂するため、二点での層の単射は各点で分裂します。よって $\mathcal F$ は入射的です。[層コホモロジーの定義](#def-ag3-08-sheaf-cohomology)に $\mathcal F\to\mathcal F\to0$ を使えば、$H^0=k^3$、$H^q=0$（$q\ge1$）です。
<!-- solution-end -->

### A2. 主開被覆の二項複体

$A=k[x]$、$f=x$、$g=1-x$ とし、$X=\operatorname{Spec}A$ とする。$\mathcal O_X$ の $D(f),D(g)$ による増大Čech複体を書き、$H^1(X,\mathcal O_X)=0$ を確認せよ。

- Level: A
- ID: AG3-08-A2

<!-- solution-start -->
### 詳細解答

$f+g=1$ なので $D(f)\cup D(g)=X$ です。[主開被覆の補題](#lem-ag3-08-principal-cech)の複体は
$$
0\to k[x]\to k[x,x^{-1}]\oplus k[x,(1-x)^{-1}]
\xrightarrow{\rho}k[x,x^{-1},(1-x)^{-1}]\to0
$$
です。$\rho(a,b)=b-a$。$f,g$ が単位イデアルを生成するため、この複体は完全です。とくに右端の商は零であり、全ての交叉もアフィンなので[Čech比較](#thm-ag3-08-cech-comparison)から $H^1(X,\mathcal O_X)=0$ です。主開集合の被覆が $X$ を覆うことと、複体の完全性を別々に確認しました。
<!-- solution-end -->

### A3. ねじれ層 $\mathcal O(1)$ の次元

$\mathbb P^1_k$ 上の $H^0(\mathcal O(1)),H^1(\mathcal O(1)),H^2(\mathcal O(1))$ を計算し、零次の基底を $U_0$ の座標で示せ。

- Level: A
- ID: AG3-08-A3

<!-- solution-start -->
### 詳細解答

[射影直線の定理](#thm-ag3-08-p1-cohomology)を $d=1$ に適用すると $h^0=2$、$h^1=\max(-2,0)=0$、$H^2=0$ です。局所基底 $e_0=X_0$ で零次の対応する Laurent 指数は $0\le n\le1$ だから、$e_0$ と $te_0$ が零次切断の基底です。斉次表示ではそれぞれ $X_0,X_1$ に対応します。
<!-- solution-end -->

### A4. 短完全列の接続先

$X=\operatorname{Spec}A$、$\mathcal F',\mathcal F,\mathcal F''$ が準連接層で $0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0$ が短完全とする。大域切断列が短完全になることを長完全列で示せ。

- Level: A
- ID: AG3-08-A4

<!-- solution-start -->
### 詳細解答

[長完全列](#thm-ag3-08-long-exact)の最初は
$$
0\to H^0(X,\mathcal F')\to H^0(X,\mathcal F)
\to H^0(X,\mathcal F'')\xrightarrow{\partial^0}H^1(X,\mathcal F').
$$
$X$ はアフィンで $\mathcal F'$ は準連接なので、[アフィン消滅](#thm-ag3-08-affine-vanishing)から最後の群は零です。従って $H^0(X,\mathcal F)\to H^0(X,\mathcal F'')$ が全射になります。[零次の同定](#prop-ag3-08-resolution-independence)で $H^0=\Gamma$ と直すと求める大域切断の短完全列です。
<!-- solution-end -->

### B1. $\mathcal O(-4)$ の一次群と高次消滅

$\mathbb P^1_k$ の標準二チャートで $H^1(\mathcal O(-4))$ の基底と次元を求め、$H^2$ が零である理由を述べよ。

- Level: B
- ID: AG3-08-B1

<!-- solution-start -->
### 詳細解答

二チャートの微分の像は $k[t]+t^{-4}k[t^{-1}]$ です。第1項が指数 $n\ge0$、第2項が $n\le-4$ を占めるため、残るのは $n=-3,-2,-1$ です。従って
$$
H^1(\mathbb P^1_k,\mathcal O(-4))
\simeq k[t,t^{-1}]/(k[t]+t^{-4}k[t^{-1}])
=k[t^{-3}]\oplus k[t^{-2}]\oplus k[t^{-1}]
$$
です。右端の記法は剰余類の $k$-線形直和を意味します。二チャートとその交叉はアフィンなので[二アフィン被覆の定理](#thm-ag3-08-mayer-vietoris)が使え、$C^2=0$ より真の層コホモロジー $H^2=0$ です。
<!-- solution-end -->

### B2. $\mathcal O(-2)$ の連結写像の非零性

$0\to\mathcal O(-2)\to\mathcal O(-1)^{\oplus2}\to\mathcal O\to0$ の長完全列で、$\partial^0:k\to H^1(\mathcal O(-2))$ が同型であることを示し、$1$ の像を求めよ。

- Level: B
- ID: AG3-08-B2

<!-- solution-start -->
### 詳細解答

[射影直線の計算](#thm-ag3-08-p1-cohomology)から $H^0(\mathcal O(-1))=0$、$H^1(\mathcal O(-1))=0$、$H^0(\mathcal O)=k$、$H^1(\mathcal O(-2))\simeq k[t^{-1}]$ です。[長完全列](#thm-ag3-08-long-exact)の当該部分は $0\to k\xrightarrow{\partial^0}k\to0$ になるので $\partial^0$ は同型です。

さらにチャート持ち上げを $v_0=(X_0^{-1},0)$、$v_1=(0,X_1^{-1})$ とすると、$\mathcal O(-1)$ の $U_0$ 基底で
$$
v_1-v_0=(-1,t^{-1})X_0^{-1}
=t^{-1}(-t,1)X_0^{-1}.
$$
左の注入 $\alpha(X_0^{-2})=(-t,1)X_0^{-1}$ によって戻すと、$\partial^0(1)=[t^{-1}]$ です。これは商群で零にならないので、同型の具体的生成元が確認できました。
<!-- solution-end -->

### B3. 被覆の条件の誤用を見抜く

準連接層のČech群を層コホモロジーと同一視するための、本文の比較定理の仮定を列挙せよ。また $X$ の開被覆がアフィン集合からなるだけで十分と言えるのはどの追加仮定がある場合か。

- Level: B
- ID: AG3-08-B3

<!-- solution-start -->
### 詳細解答

[比較定理](#thm-ag3-08-cech-comparison)の仮定は、(1) $X$ がスキームである、(2) $\mathcal F$ が準連接層である、(3) 使用する有限被覆の**空でない全有限交叉**がアフィンである、の三点です。被覆の各 $U_i$ がアフィンでも、交叉がアフィンとは限りません。

追加で $X$ が分離スキームなら、アフィン開 $U_i,U_j$ の交叉はアフィンです。実際対角射が閉埋込みであり、そのアフィンな基底変換によって交叉がアフィンになるため、有限交叉も帰納的にアフィンです。この追加仮定の下なら有限アフィン開被覆だけで比較定理が適用できます。証明が要求するのは各交叉の高次消滅であり、この保証がないと二重複体の縦方向に項が残ります。
<!-- solution-end -->

### B4. 次数差は全整数で同じ式

整数 $d$ について $\chi(\mathcal O(d))=h^0(\mathcal O(d))-h^1(\mathcal O(d))$ を求め、場合分けして $\chi=d+1$ を確認せよ。

- Level: B
- ID: AG3-08-B4

<!-- solution-start -->
### 詳細解答

[射影直線の定理](#thm-ag3-08-p1-cohomology)から、$d\ge0$ なら $h^0=d+1,h^1=0$ なので差は $d+1$ です。$d=-1$ なら両方零で差は $0=d+1$ です。$d\le-2$ なら $h^0=0,h^1=-d-1$ なので
$$
\chi=0-(-d-1)=d+1.
$$
三つの場合を合わせると $\chi(\mathcal O(d))=d+1$ が全整数で成り立ちます。高次が零であることも確認済みなので、ここでの $\chi$ は全次数の交代次元和に等しくなります。
<!-- solution-end -->

### C1. 非全射性を二つの言葉で説明する

体 $k$ と射影直線 $X=\mathbb P^1_k$ に対し、Koszul型短完全列
$$
0\to\mathcal O(-2)\xrightarrow{\alpha}\mathcal O(-1)^{\oplus2}
\xrightarrow{\beta}\mathcal O\to0,\quad
\alpha(h)=(-X_1h,X_0h),\ \beta(a,b)=X_0a+X_1b
$$
について次を示せ。(i) 局所的には $1$ が持ち上がる。(ii) Čech類から大域的持ち上げがないことを示せ。(iii) 長完全列の $\partial^0$ が同じ障害を測ることを示せ。

- Level: C
- ID: AG3-08-C1

<!-- solution-start -->
### 詳細解答

(i) $U_0=\{X_0\ne0\}$ では $v_0=(X_0^{-1},0)$、$U_1=\{X_1\ne0\}$ では $v_1=(0,X_1^{-1})$ が $\beta(v_i)=1$ を満たします。従って各点の近くでは持ち上がり、$\beta$ は[茎による完全性判定](../AG3-07/index.md#thm-ag3-07-exact-stalks)の意味で全射です。

(ii) 重なりで $t=X_1/X_0$ とし、$U_0$ の局所基底で表示すると
$$
v_0=(1,0)X_0^{-1},\quad
v_1=(0,t^{-1})X_0^{-1},\quad
\alpha(X_0^{-2})=(-t,1)X_0^{-1}.
$$
従って $v_1-v_0=\alpha(t^{-1}X_0^{-2})$ です。一次Čech類 $[t^{-1}]$ は $k[t,t^{-1}]/(k[t]+t^{-2}k[t^{-1}])$ における基底元で零ではありません。[障害命題](../AG3-07/index.md#prop-ag3-07-connecting-obstruction)から $1$ は大域切断へ持ち上がりません。

(iii) 被覆の全交叉がアフィンであるため[比較定理](#thm-ag3-08-cech-comparison)を適用でき、$[t^{-1}]$ は真の $H^1(X,\mathcal O(-2))$ の元です。長完全列の連結準同型は局所持ち上げの差を左側へ戻す写像なので、[連結写像の命題](#prop-ag3-08-connecting-cech)により $\partial^0(1)=[t^{-1}]$ です。一方 $H^0(X,\mathcal O(-1)^{\oplus2})=0$ ですから、長完全列の完全性だけでも $1$ が像に入らないことが分かります。両計算は同じ障害の抽象形と具体形です。
<!-- solution-end -->

### C2. 中間の層を通した次数差

$\mathbb P^1_k$ 上で、整数 $d$ に対する完全列
$$
0\to\mathcal O(d-2)\to\mathcal O(d-1)^{\oplus2}\to\mathcal O(d)\to0
$$
を、Koszul型短完全列のねじりとして考える。各項の $\chi=h^0-h^1$ が満たす等式を長完全列から導き、既知の $\chi(\mathcal O(e))=e+1$ と整合することを確かめよ。

- Level: C
- ID: AG3-08-C2

<!-- solution-start -->
### 詳細解答

可逆層 $\mathcal O(d)$ でテンソルすると局所基底上では自由階数一加群とのテンソル積なので、元の短完全列の完全性が保たれます。[長完全列](#thm-ag3-08-long-exact)は、射影直線上の全ての準連接層について $H^q=0$（$q\ge2$）なので、有限次元 $k$-空間の列
$$
0\to H^0(d-2)\to H^0(d-1)^{\oplus2}\to H^0(d)
\to H^1(d-2)\to H^1(d-1)^{\oplus2}\to H^1(d)\to0
$$
となります（$H^q(e)$ は $H^q(\mathbb P^1_k,\mathcal O(e))$ の略記）。有限次元ベクトル空間の完全列では隣接する次元の交代和が零となるので
$$
\chi(\mathcal O(d-2))-2\chi(\mathcal O(d-1))+\chi(\mathcal O(d))=0.
$$
[次数差の計算](#thm-ag3-08-p1-cohomology)を用い $\chi(\mathcal O(e))=e+1$ を代入すると
$$
(d-1)-2d+(d+1)=0.
$$
実際に零になるので完全列と整合します。これは数値の偶然ではなく、完全列がコホモロジー次元の交代和を保存するためです。
<!-- solution-end -->

## 9. 次章への橋

層コホモロジーは「大域切断の右完全性が欠ける量」を、被覆を選ばない群へ変換します。アフィン上の準連接層では高次群が消え、有限アフィン被覆の全交叉がアフィンならČech計算をそのまま使えます。射影直線で残る Laurent 単項式は、抽象的な長完全列の連結写像の値でもありました。

次章では、射影的なスキームを $\operatorname{Proj}$ で構成します。その次に射影空間 $\mathbb P^n$ へ進む際は、本章の「全交叉がアフィンである被覆」「Čech複体」「高次への比較」という手順を多重交叉へ拡張して用います。