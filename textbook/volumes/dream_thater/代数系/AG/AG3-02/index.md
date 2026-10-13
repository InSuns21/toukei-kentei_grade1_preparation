# AG3-02 素スペクトルの位相と構造層

[素スペクトルの定義](../AG3-01/index.md#def-ag3-01-spec)では、環 $A$ の素イデアルを点として集めました。しかし点を列挙するだけでは、「ある方程式が消える点の集まり」や「分母を逆にできる領域」がどこなのか分かりません。さらに $k[\varepsilon]/(\varepsilon^2)$ と $k$ は素点集合がともに一点であり、集合としては区別できません。

そこで本章では、まず式の零点集合から **Zariski位相**を定めます。次に各開集合で許される分数を集め、その制限・貼り合わせを備えた**構造層**を作ります。結果として主開集合 $D(f)$ 上の関数環は局所化 $A_f$、素点 $\mathfrak p$ の近くの関数環は $A_{\mathfrak p}$ となります。これは既習の[局所化](../AG1-04/index.md#def-ag1-04-localization)を、環の点全体に同時に適用する構成です。

以下 $A$ は任意の可換単位的環、準同型は単位元を保つものとします。整域性、有限生成性、Noether性、体上の代数であることは仮定しません。零環を許し、その素スペクトルは空集合、零環上の唯一の切断は零環とします。[環の層の公理](../AG2-05/index.md#def-ag2-05-sheaf-axioms)と[層の茎](../AG2-05/index.md#def-ag2-05-stalk)の意味は既習とします。

## 1. 方程式の零点から位相を作る

普通のアフィン平面では $V(xy)$ を二本の軸の和集合と見ました。素点の集合でも「イデアル $I$ のすべての式が消える」という条件を $\mathfrak p\supseteq I$ と読み替えられます。式が消えない点は逆に開集合としたいので、閉集合と開集合を一緒に定めます。

<a id="def-ag3-02-zariski"></a>

<!-- formal-statement-start -->
> **定義（素スペクトルのZariski閉集合と主開集合）**  
> 可換単位的環 $A$ とイデアル $I\subseteq A$ に対し、
 
$$
V(I)=\{\mathfrak p\in\operatorname{Spec}A\mid I\subseteq\mathfrak p\}
$$

> と置く。また $f\in A$ に対し、その補集合を主開集合と呼ぶ。

$$
D(f)=\{\mathfrak p\in\operatorname{Spec}A\mid f\notin\mathfrak p\}.
$$

> $V(I)$ の形の集合を閉集合とする位相を素スペクトルのZariski位相と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-02-zariski -->
### 例：一変数多項式環で閉集合・開集合を判定する

**定義の確認** $A=k[t]$ で $I=(t)$ とします。$V(t)$ の点は $t$ を含む素イデアルです。$(t)$ は極大なので、そのような真の素イデアルは $(t)$ 自身しかありません。したがって $V(t)=\{(t)\}$ で、$D(t)$ はこれ以外のすべての素点です。特に $(0)\in D(t)$ ですが $(t)\notin D(t)$ です。多項式 $t$ が一般点では零でないことまで、定義を直接確認できます。
<!-- definition-example-end -->

<a id="prop-ag3-02-topology"></a>

<!-- formal-statement-start -->
> **命題（Zariski位相と主開基）**  
> 任意の可換単位的環 $A$ について、$V(I)$ は位相の閉集合系をなし、$D(f)$ は開集合の基底をなす。任意のイデアル族 $(I_\lambda)$ とイデアル $I,J$、元 $f,g\in A$ について、

$$
\bigcap_\lambda V(I_\lambda)=V\Bigl(\sum_\lambda I_\lambda\Bigr),
\qquad V(I)\cup V(J)=V(IJ),
$$

$$
D(f)\cap D(g)=D(fg),\qquad
\operatorname{Spec}A=D(1),\quad \varnothing=D(0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

閉集合の共通部分は「すべての式が消える」、二つの閉集合の和は「積が素イデアルに入るなら片方が入る」と言い換えます。開集合については積を使って共通部分を表せます。

<!-- proof-start -->
### 証明

$\mathfrak p$ が左辺の $\bigcap_\lambda V(I_\lambda)$ に入るとは、すべての $\lambda$ で $I_\lambda\subseteq\mathfrak p$ となることです。これは $I_\lambda$ の有限和で生成されるイデアル $\sum_\lambda I_\lambda$ が $\mathfrak p$ に含まれることと同値なので、最初の式を得ます。

次に $\mathfrak p\in V(I)\cup V(J)$ なら $I\subseteq\mathfrak p$ または $J\subseteq\mathfrak p$ です。いずれの場合も $IJ\subseteq\mathfrak p$ です。逆に $IJ\subseteq\mathfrak p$ で $I\not\subseteq\mathfrak p$ と仮定します。$a\in I\setminus\mathfrak p$ を選ぶと、任意の $b\in J$ に対して $ab\in IJ\subseteq\mathfrak p$ です。素性と $a\notin\mathfrak p$ から $b\in\mathfrak p$、従って $J\subseteq\mathfrak p$ です。よって第二の式が従います。

$V(0)=\operatorname{Spec}A$、$V(A)=\varnothing$ ですから、これらと共通部分・有限和の式によって閉集合の三公理が成立します。

主開集合について、$f,g\notin\mathfrak p$ なら $fg\notin\mathfrak p$ です（もし積が入れば素性に反する）。逆に $fg\notin\mathfrak p$ なら両因子は入りません。ゆえに $D(f)\cap D(g)=D(fg)$ です。さらに任意の開集合 $U=\operatorname{Spec}A\setminus V(I)$ は

$$
U=\bigcup_{f\in I}D(f)
$$

と表されます。実際 $\mathfrak p\notin V(I)$ は $I\not\subseteq\mathfrak p$ と同値で、その証人となる $f\in I\setminus\mathfrak p$ が存在します。主開集合が全空間を覆い、二つの共通部分も主開集合になるため開基です。
<!-- proof-end -->

主開基があると、どの開集合上の切断も、小さな $D(f)$ 上の式から扱えます。このことが、後の貼り合わせの出発点になります。

## 2. 一般点の閉包と環準同型

$k[t]$ の $(0)$ は一点ですが、すべての非零多項式が消える点ではありません。どこまでをその点の閉包とみなすべきかは、閉集合を一つずつ調べれば決まります。

<a id="prop-ag3-02-closure"></a>

<!-- formal-statement-start -->
> **命題（素点の閉包と特殊化）**  
> 可換単位的環 $A$、$\mathfrak p\in\operatorname{Spec}A$ に対し、点集合 $\{\mathfrak p\}$ の閉包は $V(\mathfrak p)$ である。したがって $\mathfrak q$ が $\mathfrak p$ の閉包に入る必要十分条件は $\mathfrak p\subseteq\mathfrak q$ である。また $V(\mathfrak p)$ は既約閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathfrak p$ を含む閉集合 $V(I)$ には $I\subseteq\mathfrak p$ が必要です。包含を逆にすると $V(\mathfrak p)\subseteq V(I)$ になり、最小の閉集合が分かります。既約性は主開基と素性で直接示します。

<!-- proof-start -->
### 証明

$V(\mathfrak p)$ は $\mathfrak p$ 自身を含みます。$V(I)$ が $\mathfrak p$ を含むなら $I\subseteq\mathfrak p$ です。このとき $\mathfrak q\in V(\mathfrak p)$ は $\mathfrak p\subseteq\mathfrak q$、従って $I\subseteq\mathfrak q$ を満たすため、$V(\mathfrak p)\subseteq V(I)$ です。これが閉包であり、閉包の点の条件も証明されました。

$V(\mathfrak p)$ の空でない相対開集合 $U$ を任意に取ると、ある $D(f)\cap V(\mathfrak p)$ が $U$ に含まれ、空でありません。そこに $\mathfrak q\supseteq\mathfrak p$ があるなら $f\notin\mathfrak q$ なので $f\notin\mathfrak p$ です。よって $\mathfrak p\in D(f)\cap V(\mathfrak p)\subseteq U$ です。したがって $V(\mathfrak p)$ のどの二つの空でない開集合も $\mathfrak p$ を共通に含みます。これは二つの真の閉集合の和に分割できないことと同値で、既約性が従います。
<!-- proof-end -->

$A=k[t]$ の $(0)$ では $V((0))=\operatorname{Spec}k[t]$ です。つまり一般点 $(0)$ は密ですが、各極大イデアル $(t-a)$ は閉点です。閉包の包含は単純な「点と点の距離」とは違います。

<a id="prop-ag3-02-continuity"></a>

<!-- formal-statement-start -->
> **命題（環準同型が定める連続写像）**  
> 可換単位的環の準同型 $\alpha:A\to B$ による[素点の逆像写像](../AG3-01/index.md#prop-ag3-01-contraction)

$$
\alpha^*:\operatorname{Spec}B\longrightarrow\operatorname{Spec}A,
\qquad \mathfrak q\longmapsto\alpha^{-1}(\mathfrak q)
$$

> は連続であり、$f\in A$、イデアル $I\subseteq A$ について、

$$
(\alpha^*)^{-1}(D_A(f))=D_B(\alpha(f)),
\qquad
(\alpha^*)^{-1}(V_A(I))=V_B(IB)
$$

> が成り立つ。ここで $IB$ は $\alpha(I)$ で生成される $B$ のイデアルを表す。
<!-- formal-statement-end -->

### 証明の見取り図

開基 $D_A(f)$ の逆像を計算すれば、連続性の確認はすべての開集合に自動的に広がります。

<!-- proof-start -->
### 証明

$\mathfrak q\in\operatorname{Spec}B$ について、

$$
\mathfrak q\in(\alpha^*)^{-1}(D_A(f))
\Longleftrightarrow f\notin\alpha^{-1}(\mathfrak q)
\Longleftrightarrow \alpha(f)\notin\mathfrak q
$$

です。これは $\mathfrak q\in D_B(\alpha(f))$ という条件です。開基の逆像が開集合なので、任意の開集合の逆像も和集合を通して開集合となり、連続です。

閉集合については $I\subseteq\alpha^{-1}(\mathfrak q)$ と $\alpha(I)\subseteq\mathfrak q$ が同値です。$\mathfrak q$ はイデアルだから、後者は $IB\subseteq\mathfrak q$ と同値であり、第二の式が成り立ちます。
<!-- proof-end -->

## 3. 主開集合が有限個で覆える理由

構造層を作るとき、各点の周りでは分数として書けても、開集合全体で一つの分数になるとは限りません。主開集合の場合に有限個の局所表示へ減らせる、という性質が決定的です。ここでいう**準コンパクト**とは、「どの開被覆からも有限部分被覆を選べる」という意味です。

<a id="thm-ag3-02-quasicompact"></a>

<!-- formal-statement-start -->
> **定理（主開集合の準コンパクト性）**  
> 任意の可換単位的環 $A$ と $f\in A$ について、$D(f)\subseteq\operatorname{Spec}A$ は準コンパクトである。とくに主開集合族 $(D(g_i))_{i\in\Lambda}$ が $D(f)$ を覆う場合、有限個の $g_{i_1},\ldots,g_{i_r}$ だけで覆える。
<!-- formal-statement-end -->

### 証明の見取り図

開基で覆われた場合を示せば十分です。被覆条件を「$f$ のある冪が $g_i$ たちのイデアルに属する」という環の等式へ翻訳し、等式で実際に使われた有限個だけを採用します。

<!-- proof-start -->
### 証明

任意の開被覆は主開基により細分できるので、$D(f)\subseteq\bigcup_iD(g_i)$ の場合を考えます。$I=(g_i\mid i\in\Lambda)$ と置きます。もし $f\notin\sqrt I$ なら、どの $n\ge0$ に対しても $f^n\notin I$ です。従って商環 $A/I$ で $f$ の冪を分母にした局所化 $(A/I)_f$ は零環ではありません。実際、$1=0$ となるのはある $f^n$ が $I$ に入るときに限ります。

非零単位的環には極大イデアルが存在します（イデアルの包含順序にZornの補題を適用します）。$(A/I)_f$ の極大イデアルを $M$ とし、その $A$ への逆像を $\mathfrak p$ とすると、$\mathfrak p$ は素イデアルで、$I\subseteq\mathfrak p$ です。$f$ は局所化で可逆なので $f\notin\mathfrak p$ です。すると $\mathfrak p\in D(f)$ ですが、すべての $g_i\in I$ は $\mathfrak p$ に入るので $\mathfrak p\notin D(g_i)$ です。これは被覆に矛盾します。

よって $f\in\sqrt I$ であり、ある $N$ と有限個の添字 $i_1,\ldots,i_r$、係数 $a_j\in A$ について

$$
f^N=a_1g_{i_1}+\cdots+a_rg_{i_r}
$$

となります。$\mathfrak p\in D(f)$ で右辺の $g_{i_j}$ がすべて $\mathfrak p$ に入れば $f^N\in\mathfrak p$、素性により $f\in\mathfrak p$ となって矛盾します。従って有限個の $D(g_{i_j})$ が $D(f)$ を覆います。
<!-- proof-end -->

この証明は $A$ がNoether環であることを使っていません。$f=0$ や $A$ が零環のときは $D(f)=\varnothing$ であり、空の有限被覆でよいことも含みます。

## 4. 点ごとの分数から構造層を作る

点 $\mathfrak p$ で分母として使えるのは $A\setminus\mathfrak p$ の元です。[点における局所環](../AG1-04/index.md#thm-ag1-04-local-ring)を $A_{\mathfrak p}$ と書くと、素点ごとに別の環を持てます。しかし一つの開集合上の関数は、各点で勝手な元を選ぶだけでは不十分です。近くの点でも**同じ分数式**で記述できる、という整合性を課します。

<a id="def-ag3-02-structure-sheaf"></a>

<!-- formal-statement-start -->
> **定義（素スペクトルの構造層）**  
> $X=\operatorname{Spec}A$ とする。開集合 $U\subseteq X$ に対して $\mathcal O_X(U)$ は、各 $\mathfrak p\in U$ に $s(\mathfrak p)\in A_{\mathfrak p}$ を割り当てる族で、次を満たすもの全体とする。各 $\mathfrak p\in U$ に対し $\mathfrak p$ を含む開近傍 $W\subseteq U$ と $a,g\in A$ があり、すべての $\mathfrak q\in W$ で $g\notin\mathfrak q$ かつ

$$
s(\mathfrak q)=a/g\quad\text{in }A_{\mathfrak q}
$$

> が成り立つ。和と積は各 $A_{\mathfrak p}$ で点ごとに定め、$V\subseteq U$ の制限写像は族を $V$ へ制限するものとする。$\mathcal O_X$ を $X$ の構造層と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-02-structure-sheaf -->
### 例：$t$ が消えない領域で $1/t$ を使う

**定義の確認** $A=k[t]$、$U=D(t)$ とし、各 $\mathfrak p\in U$ に $s(\mathfrak p)=1/t\in A_{\mathfrak p}$ を対応させます。$t\notin\mathfrak p$ は $U$ の定義そのものなので、全点の共通近傍 $W=U$、分子 $a=1$、分母 $g=t$ を取れます。従ってこの族は $\mathcal O_X(D(t))$ の切断です。一方 $U=X$ とすると点 $(t)$ で $t$ が非可逆なので、同じ式を全点で用意することはできません。
<!-- definition-example-end -->

開集合ごとの環を定めただけでは層とは言えません。重なりで等しい関数が一つに貼れることを実際に検証します。

<a id="prop-ag3-02-sheaf"></a>

<!-- formal-statement-start -->
> **命題（構造層の制限と貼り合わせ）**  
> **任意の可換単位的環 $A$** に対し、上の $\mathcal O_X$ は $X=\operatorname{Spec}A$ 上の環の層である。具体的には開被覆 $U=\bigcup_i U_i$ と切断 $s_i\in\mathcal O_X(U_i)$ がすべての重なりで一致するなら、一意の $s\in\mathcal O_X(U)$ が存在し、各 $i$ で

$$
s|_{U_i}=s_i
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

点での値は各 $A_{\mathfrak p}$ にあるため、重なりで一致するもの同士の貼り合わせは点ごとに定義できます。局所分数表示は、点を含む一枚の $U_i$ の内部で確保します。

<!-- proof-start -->
### 証明

局所環の和・積で切断を足したり掛けたりすると、各点の近傍で $a/g$ と $b/h$ と表示できる場合、その共通近傍で

$$
a/g+b/h=(ah+bg)/(gh),\qquad
(a/g)(b/h)=ab/(gh)
$$

となります。$g,h$ は近傍の各素点に属さないので積 $gh$ も属さず、和・積は再び局所表示を持ちます。零・単位元・加法逆元も同様に分母1または $g$ を使って構成できます。制限は明らかに環準同型で、恒等・合成を保ちます。

被覆 $U=\bigcup_iU_i$ 上で $s_i$ が重なりで一致するなら、$\mathfrak p\in U$ に対して $\mathfrak p\in U_i$ となる $i$ を選び $s(\mathfrak p)=s_i(\mathfrak p)$ と置きます。二つの $i$ が選べても、重なりでの一致条件から値は変わらず、well-defined です。$\mathfrak p$ を含む $U_i$ の内部で $s_i$ の局所表示 $a/g$ を取れば、それが $s$ の局所表示になります。よって $s\in\mathcal O_X(U)$ です。

別の貼り合わせ $t$ があれば各 $\mathfrak p$ を含む $U_i$ 上で $t(\mathfrak p)=s_i(\mathfrak p)=s(\mathfrak p)$ なので $t=s$ です。従って層の存在・一意性の双方が成り立ちます。
<!-- proof-end -->

## 5. 主開集合上の切断は局所化に等しい

構造層の定義では各点で分数を選びました。これが主開集合 $D(f)$ なら**一つの局所化環**からすべての切断を記述できる、というのが本章の核です。特に、大域切断には元の環 $A$ が丸ごと戻ります。

<a id="thm-ag3-02-principal-sections"></a>

<!-- formal-statement-start -->
> **定理（主開集合の切断環）**  
> 任意の可換単位的環 $A$ と $f\in A$、$X=\operatorname{Spec}A$ について、自然な環同型

$$
A_f\xrightarrow{\ \sim\ }\mathcal O_X(D(f)),
\qquad
a/f^n\longmapsto\bigl(\mathfrak p\mapsto a/f^n\in A_{\mathfrak p}\bigr)
$$

> が存在する。特に $f=1$ の場合、$\mathcal O_X(X)\simeq A$ である。また $D(fg)\subseteq D(f)$ に沿う制限写像は局所化 $A_f\to A_{fg}$ に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathfrak p\in D(f)$ では $f$ を逆にできるので写像は自然に定まります。単射は「各点で零なら分数は零」、全射は有限個の局所分数の重なりを等式として貼り合わせることで証明します。有限性には先ほどの[主開集合の準コンパクト性](#thm-ag3-02-quasicompact)を使います。

<!-- proof-start -->
### 証明

**写像の定義。** $f\notin\mathfrak p$ のとき $A_f\to A_{\mathfrak p}$ が[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)から得られます。従って各 $a/f^n$ は $D(f)$ の全点で同じ表示を持ち、切断です。これは環準同型 $\Phi_f:A_f\to\mathcal O_X(D(f))$ を定めます。

**単射。** $\Phi_f(a/f^n)=0$ とします。各 $\mathfrak p\in D(f)$ で $a/f^n=0$ となるので、ある $h_{\mathfrak p}\notin\mathfrak p$ が $h_{\mathfrak p}a=0$ を満たします。実際、局所化で分数が零となる条件を分母に適用して共通分母の冪を吸収すれば、この形にできます。$D(h_{\mathfrak p})$ は $D(f)$ を覆うので、準コンパクト性より有限個 $h_1,\ldots,h_r$ で覆えます。前節の証明と同じ被覆・根基の議論により

$$
f^N=\sum_{i=1}^r c_i h_i
$$

と書けます。これに $a$ を掛けると $f^Na=\sum_i c_i(h_i a)=0$ です。ゆえに $a/f^n=0$（$A_f$ 内） となり、単射です。

**全射の準備。** $s\in\mathcal O_X(D(f))$ を取ります。任意の $\mathfrak p\in D(f)$ で、定義から $\mathfrak p$ の開近傍 $W\subseteq D(f)$ と $a,h\in A$ があり、$s(\mathfrak q)=a/h$ かつ $h\notin\mathfrak q$ がすべての $\mathfrak q\in W$ で成立します。主開基を使って $\mathfrak p\in D(v)\subseteq W$ とし、$g=vh$ と置きます。このとき $\mathfrak p\in D(fg)\subseteq D(v)\subseteq W$ であり、

$
a/h=(av)/(vh)=(av)/g
\quad\text{in }A_{\mathfrak q}\qquad(\mathfrak q\in D(fg))
$

です。したがって $s$ は $D(fg)$ 上で一つの局所化元から得られます。[準コンパクト性](#thm-ag3-02-quasicompact)によって、これらの中から有限個の $D(fg_1),\ldots,D(fg_r)$ を選べます。

$B=A_f$ と置き、まず素点の対応を調べます。$B$ の素イデアル $\mathfrak q$ を $A$ へ引き戻して $\mathfrak p$ と置くと、$f$ が $B$ で可逆であるため $f\notin\mathfrak p$ です。逆にその条件を満たす素イデアル $\mathfrak p$ については

$$
B/\mathfrak pB\simeq(A/\mathfrak p)_f
$$

が零でない整域です。ここでは $\mathfrak p$ の素性から $A/\mathfrak p$ が整域になるという[素イデアルの整域商判定](../../RNG/RNG2/index.md#thm-rng2-prime-quotient-domain)を使っています。従って $\mathfrak pB$ は素イデアルです。

$\mathfrak q$ の元 $a/f^n$ は、可逆な $f$ を掛けてもイデアルへの所属が変わらないため、$a/1\in\mathfrak q$ と同値です。一方、$a/1\in\mathfrak pB$ ならある $m$ に対して $f^m a\in\mathfrak p$ です。ここで素性と $f\notin\mathfrak p$ により $a\in\mathfrak p$ です。以上から素点の拡大・縮約は逆写像となります。

$$
\operatorname{Spec}(A_f)\simeq D_A(f).
$$

この対応は $g_i/1\notin\mathfrak pB$ と $g_i\notin\mathfrak p$ の同値から主開集合を保ちます。

よって選んだ $D_A(fg_i)$ は $\operatorname{Spec}B$ の主開被覆 $D_B(g_i)$ に対応します。[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)を二度使えば、$f$ と $g_i$ を順に逆にすることと積 $fg_i$ を逆にすることは同じなので $A_{fg_i}\simeq B_{g_i}$ です。各局所表示を $s_i\in B_{g_i}$ と書きます。

重なりでの $s$ の値は等しいので、$D(fg_i g_j)$ 上の切断として一致します。すでに証明した**単射**を $fg_i g_j$ に適用すると、$s_i$ と $s_j$ の像は $B_{g_ig_j}$ で等しくなります。

**有限個の分数を貼る計算。** まず $s_i=b_i/g_i^n$ の分母指数を共通の $n$ に揃えます。$B_{g_ig_j}$ での一致から、各 $i,j$ に対して十分大きい共通整数 $m$ を選べば

$$
(g_i g_j)^m(b_i g_j^n-b_j g_i^n)=0
$$

が $B$ で成り立ちます。$N=n+m$、$c_i=b_i g_i^m$ とすれば、すべての $i,j$ について

$$
c_i g_j^N=c_j g_i^N
$$

が $B$ 内の等式として成り立ちます。被覆 $D_B(g_i)$ が全 $\operatorname{Spec}B$ を覆うため、$(g_1,\ldots,g_r)=B$ です。実際このイデアルが真なら極大イデアルに含まれ、被覆から漏れる素点が生じます。さらに $(g_1^N,\ldots,g_r^N)=B$ です。仮に冪で生成されるイデアルが真なら極大イデアル $\mathfrak m$ に含まれ、$g_i^N\in\mathfrak m$ と素性からすべての $g_i\in\mathfrak m$ となります。これは先ほどの被覆と矛盾します。よってある $u_i\in B$ が

$$
\sum_{i=1}^r u_i g_i^N=1
$$

を満たします。$b=\sum_i u_i c_i$ と置くと、各 $i$ について

$$
b g_i^N=\sum_j u_j c_jg_i^N
=\sum_j u_j c_i g_j^N=c_i.
$$

従って $B_{g_i}$ 内で $b=c_i/g_i^N=s_i$ です。$b\in B=A_f$ の像と $s$ は被覆上で一致し、層の一意性により $\Phi_f(b)=s$ です。これで全射が示されました。

最後に $f=1$ なら $D(1)=X$、$A_1=A$ です。$D(fg)$ への制限は各素点で同じ $a/f^n$ を読む操作であり、代数側の $A_f\to A_{fg}$ と一致します。
<!-- proof-end -->

**例。** $A=k[t]$ では

$$
\mathcal O_X(D(t))\simeq k[t,t^{-1}],
\qquad
\mathcal O_X(X)\simeq k[t].
$$

$D(t)$ では $1/t$ が許されますが、点 $(t)$ まで含む全空間ではその逆元は存在しません。この差は、局所化における「どの元を分母として逆にしたか」に対応しています。

## 6. 点の近くで見た関数環は何か

ある素点 $\mathfrak p$ の周囲をいくらでも縮め、近くで一致する切断を同一視すると茎を得ます。[茎の考え方](../AG2-05/index.md#def-ag2-05-stalk)では開近傍の取り方より、その点での局所表示が重要でした。

<a id="thm-ag3-02-stalk"></a>

<!-- formal-statement-start -->
> **定理（素点での構造層の茎）**  
> 可換単位的環 $A$、$X=\operatorname{Spec}A$、$\mathfrak p\in X$ に対して、点での評価は自然な環同型

$$
\mathcal O_{X,\mathfrak p}\xrightarrow{\ \sim\ }A_{\mathfrak p}
$$

> を定める。右辺は唯一の極大イデアル $\mathfrak p A_{\mathfrak p}$ をもつ局所環である。
<!-- formal-statement-end -->

### 証明の見取り図

局所切断の芽から点での分数値を取り、逆に $a/g\in A_{\mathfrak p}$ を $D(g)$ 上の切断に戻します。点で零となる分数が近傍でも零になることが単射の核心です。

<!-- proof-start -->
### 証明

$\mathfrak p$ を含む開近傍 $U$ 上の切断 $s$ に対し、その芽 $[U,s]$ を $s(\mathfrak p)\in A_{\mathfrak p}$ へ送ります。芽が等しければ共通の小さい近傍で切断が一致するので、$\mathfrak p$ での値も一致し、この写像はwell-definedな環準同型です。

任意の $a/g\in A_{\mathfrak p}$ は $g\notin\mathfrak p$ を満たす分母 $g$ を持ちます。$D(g)$ は $\mathfrak p$ の開近傍であり、$\mathfrak q\mapsto a/g\in A_{\mathfrak q}$ はその切断です。その芽は $a/g$ に写るので全射です。

単射を示します。$s(\mathfrak p)=0$ のとき、$s$ の局所表示を $\mathfrak p$ を含む $W\subseteq U$ で $a/g$ と取り、$g\notin\mathfrak p$ とします。$a/g=0$（$A_{\mathfrak p}$ 内） なので、局所化での零条件により $h\notin\mathfrak p$ かつ $ha=0$ となる $h\in A$ が取れます。$W\cap D(h)$ は $\mathfrak p$ の近傍です。この上の各点 $\mathfrak q$ では $h,g\notin\mathfrak q$ なので

$$
s(\mathfrak q)=a/g=(ha)/(hg)=0
\quad\text{in }A_{\mathfrak q}.
$$

従って $s$ の芽は零です。二つの芽の差に同じ議論を適用すれば単射が従います。最後に $a/s\in A_{\mathfrak p}$ で $a\notin\mathfrak p$ なら、$s/a$ が逆元です。$a\in\mathfrak p$ の分数はイデアル $\mathfrak pA_{\mathfrak p}$ に入ります。商環は

$$
A_{\mathfrak p}/\mathfrak pA_{\mathfrak p}
\simeq (A/\mathfrak p)_{(A/\mathfrak p)\setminus\{0\}}
=\operatorname{Frac}(A/\mathfrak p)
$$

という体なので $\mathfrak pA_{\mathfrak p}$ は極大です。それ以外の元はすべて単元だから、ほかに極大イデアルはありません。これは[点での局所環の単元判定](../AG1-04/index.md#thm-ag1-04-local-ring)を任意の素点へ広げた計算です。
<!-- proof-end -->

**手で追う例。** $A=k[t]$ では $(t)$ における茎は $k[t]_{(t)}$ です。$t+1$ は $(t)$ に属さないので $1/(t+1)$ はこの茎の元ですが、$1/t$ はそうではありません。一方、一般点 $(0)$ では分母として任意の非零多項式を許すので、茎は $k(t)$ です。

## 7. 点も位相も同じでも、関数環は違う

$D=k[\varepsilon]/(\varepsilon^2)$ では、任意の素イデアル $\mathfrak p$ が $\varepsilon^2=0\in\mathfrak p$ を含むため $\varepsilon\in\mathfrak p$ です。一方 $D/(\varepsilon)\simeq k$ は体なので $(\varepsilon)$ は極大かつ素です。従って[素スペクトルの定義](../AG3-01/index.md#def-ag3-01-spec)による $X=\operatorname{Spec}D$ は一点の位相空間です。同様に $Y=\operatorname{Spec}k$ も一点です。しかし

$$
\mathcal O_X(X)\simeq D,\qquad
\mathcal O_Y(Y)\simeq k
$$

であり、$D$ には零でない平方零元 $\varepsilon$ が残っています。両者の位相空間は同相でも、構造層の大域切断環は同型ではありません。**位相だけでは冪零の厚みは復元できない**という意味が、具体的な環の差として確認できました。

また $A=k[x,y]/(xy)$ では $xy=0$ なので $D(x)\cap D(y)=D(xy)=\varnothing$ です。$x$ を逆にすれば $xy=0$ から $y=0$ となり、

$$
A_x\simeq k[x,x^{-1}],\qquad
A_y\simeq k[y,y^{-1}].
$$

しかしこの二つの主開集合の和には原点 $(x,y)$ が含まれません。よって二つの環の直積を**全空間の**関数環と誤認してはいけません。原点での局所情報と貼り合わせ条件を含むことで、全空間の環が $A$ に戻ります。

ここまでで位相空間 $X$、環の層 $\mathcal O_X$、点での局所環 $\mathcal O_{X,\mathfrak p}$ が用意できました。次章ではこの組に必要な点ごとの局所環の整合条件と、環準同型が層の射を含む幾何学的写像になる仕組みを扱います。

## 8. 演習：主開基から局所環まで

### A1. 具体的な主開集合

$k$ を体、$A=k[t]$ とする。$D(t)\cap D(t-1)$ と $V(t)\cup V(t-1)$ を式で求め、両者が互いに補集合か判定せよ。

- Level: A
- ID: AG3-02-A1

<!-- solution-start -->
**詳細解答。** [主開基の積公式](#prop-ag3-02-topology)へ $f=t,g=t-1$ を代入すると

$$
D(t)\cap D(t-1)=D(t(t-1)).
$$

閉集合の和集合は $V((t)(t-1))=V(t(t-1))$ です。前者は $t(t-1)$ を含まない素イデアル、後者はそれを含む素イデアルであり、互いに補集合です。$V(t(t-1))=\{(t),(t-1)\}$ であることも、$A$ が主イデアル整域で、どちらの一次式も極大イデアルを生成することから確かめられます。
<!-- solution-end -->

### A2. 閉包はどこまで広がるか

$A=k[t]$ とする。$(0)$ と $(t-a)$ の各一点集合の閉包を求めよ。ここで $a\in k$ とする。

- Level: A
- ID: AG3-02-A2

<!-- solution-start -->
**詳細解答。** [素点の閉包と特殊化](#prop-ag3-02-closure)から、$\overline{\{(0)\}}=V((0))$ と $\overline{\{(t-a)\}}=V(t-a)$ です。すべての素イデアルは $(0)$ を含むので前者は $\operatorname{Spec}k[t]$ 全体です。$(t-a)$ は商が $k$ の極大イデアルですから、それを含む真の素イデアルは自身だけです。よって後者は $\{(t-a)\}$ です。一般点は閉点ではなく、$k$ 値点に対応する極大イデアルは閉点であることが分かります。
<!-- solution-end -->

### A3. 分母を許す開集合

$A=k[t]$、$X=\operatorname{Spec}A$ とする。$1/(t-2)$ が $D(t-2)$ 上の切断であることと、$X$ 全体の切断ではないことを示せ。

- Level: A
- ID: AG3-02-A3

<!-- solution-start -->
**詳細解答。** $D(t-2)$ の任意の点 $\mathfrak p$ で $t-2\notin\mathfrak p$ です。そのため $1/(t-2)\in A_{\mathfrak p}$ が定義され、同じ分子1と分母 $t-2$ を $D(t-2)$ 全体で使用できます。[構造層の定義](#def-ag3-02-structure-sheaf)を満たします。

一方 [全空間の切断環の同型](#thm-ag3-02-principal-sections)によれば $\mathcal O_X(X)\simeq k[t]$ です。もしこの分数が大域切断ならある $b(t)\in k[t]$ が $b(t)=1/(t-2)$ を $D(t-2)$ 上で満たします。$k[t]_{t-2}$ で $(t-2)b(t)=1$ となり、整域 $k[t]$ の等式としても成り立ちます。しかし左辺は $t-2$ で割り切れ、右辺は割り切れません。矛盾です。
<!-- solution-end -->

### A4. 射による主開集合の逆像

$\alpha:k[t]\to k[s]$ を $\alpha(t)=s^2$ とする。$\alpha^*$ による $D(t-1)$ の逆像を求めよ。

- Level: A
- ID: AG3-02-A4

<!-- solution-start -->
**詳細解答。** [連続写像の主開逆像公式](#prop-ag3-02-continuity)に $f=t-1$ を入力します。$\alpha(t-1)=s^2-1$ なので

$$
(\alpha^*)^{-1}(D(t-1))
=D(s^2-1)
=D((s-1)(s+1)).
$$

従ってこれは $D(s-1)\cap D(s+1)$ です。標数2では $s+1=s-1$ となりますが、主開集合の等式は標数に依存せず成り立ちます。
<!-- solution-end -->

### B1. 二つの局所表示を貼り合わせる

$A=k[t]$ とし、$U_1=D(t)$、$U_2=D(1-t)$ とする。$U_1$ 上で $(t^2-t)/t$、$U_2$ 上で $(1-t)(t-1)/(1-t)$ と書かれた切断が全空間で貼り合わさることを示し、その大域切断を求めよ。

- Level: B
- ID: AG3-02-B1

<!-- solution-start -->
**詳細解答。** $t+(1-t)=1$ なので任意の素イデアルが $t,1-t$ をともに含むことはなく、$U_1\cup U_2=X$ です。$A_t$ では

$$
(t^2-t)/t=t-1,
$$

$A_{1-t}$ では

$$
(1-t)(t-1)/(1-t)=t-1
$$

です。従って重なり $D(t(1-t))$ でも両切断は $t-1$ に一致します。[層の貼り合わせ](#prop-ag3-02-sheaf)から一意の大域切断があり、明示的に $t-1\in A\simeq\mathcal O_X(X)$ がその制限を与えます。
<!-- solution-end -->

### B2. 準コンパクト性を等式で確かめる

$A=k[x,y]$ とし、$D(x+y)$ が $D(x)$ と $D(y)$ で覆われることを証明せよ。さらに $D(x)\cup D(y)$ は $X=\operatorname{Spec}A$ の全体ではないことを確認せよ。

- Level: B
- ID: AG3-02-B2

<!-- solution-start -->
**詳細解答。** $\mathfrak p\in D(x+y)$ なら $x+y\notin\mathfrak p$ です。もし $x,y\in\mathfrak p$ ならイデアルの加法閉性で $x+y\in\mathfrak p$ となり矛盾します。従って $x\notin\mathfrak p$ または $y\notin\mathfrak p$ で、$D(x+y)\subseteq D(x)\cup D(y)$ です。これは $x+y=1\cdot x+1\cdot y\in(x,y)$ という元の等式に対応します。

しかし $\mathfrak m=(x,y)$ は $A/\mathfrak m\simeq k$ により極大イデアルで、$x,y$ の双方を含みます。従って $\mathfrak m\notin D(x)\cup D(y)$ です。前半は $D(x+y)$ の被覆であって、全空間の被覆を意味しません。
<!-- solution-end -->

### B3. 二本の軸を局所化する

$A=k[x,y]/(xy)$ とし、$\mathcal O_X(D(x))$、$\mathcal O_X(D(y))$ とその交わりの切断環を求めよ。また $D(x)\cup D(y)\ne X$ を示せ。

- Level: B
- ID: AG3-02-B3

<!-- solution-start -->
**詳細解答。** $A_x$ では $x$ が可逆です。$xy=0$ に $x^{-1}$ を掛けると $y=0$ です。従って、関係式 $xy=0$ を持つ多項式環を $x$ で局所化すると

$$
A_x\simeq k[x,x^{-1}]
$$

となります。同様に $A_y\simeq k[y,y^{-1}]$ です。[主開切断環](#thm-ag3-02-principal-sections)よりこれらが求める切断環です。

[Zariski位相と主開基](#prop-ag3-02-topology)の共通部分の等式から、$D(x)\cap D(y)=D(xy)=D(0)=\varnothing$ です。$A_{xy}$ は $xy=0$ を可逆にするため零環で、空集合上の切断環に一致します。一方 $(x,y)\subset A$ は商が体 $k$ の極大イデアルで、$x,y$ の双方を含みます。従って原点は $D(x)\cup D(y)$ に含まれず、その和は $X$ 全体ではありません。
<!-- solution-end -->

### B4. 同じ点集合が異なる関数環を持つ

$D=k[\varepsilon]/(\varepsilon^2)$ と $k$ の素スペクトルについて、位相空間としての関係と大域切断環の違いを述べ、$D(\varepsilon)$ とその切断環を計算せよ。

- Level: B
- ID: AG3-02-B4

<!-- solution-start -->
**詳細解答。** $D$ の素イデアルは $(\varepsilon)$ のみ、$k$ の素イデアルは $(0)$ のみで、どちらも一点の位相空間です。従って位相空間として同相です。

しかし[全空間の切断環](#thm-ag3-02-principal-sections)はそれぞれ $D$、$k$ です。$D$ には $\varepsilon\ne0$、$\varepsilon^2=0$ となる元があり、体 $k$ にそのような元はありません。よって環は同型ではありません。唯一の素イデアルは $\varepsilon$ を含むので $D(\varepsilon)=\varnothing$ です。局所化 $D_\varepsilon$ では $1=\varepsilon^{-2}\varepsilon^2=0$ となり零環です。従って $\mathcal O_X(D(\varepsilon))$ も零環です。
<!-- solution-end -->

### C1. 二つの主開集合の等化子を再構成する

可換単位的環 $A$ と $f,g\in A$ が $(f,g)=A$ を満たすとする。このとき

$$
A\longrightarrow A_f\oplus A_g
\rightrightarrows A_{fg}
$$

が等化子であることを示せ。すなわち二つの局所化元が $A_{fg}$ で一致する必要十分条件は、ただ一つの $a\in A$ から制限されたことである。零因子があっても成り立つ形で証明せよ。

- Level: C
- ID: AG3-02-C1

<!-- solution-start -->
**詳細解答。** $(f,g)=A$ なので $D(f)\cup D(g)=X$ です。$a\in A$ が $A_f,A_g$ の双方で零になれば、ある $r,s$ に対し $f^ra=g^sa=0$ です。$N\ge\max(r,s,1)$ として $f^Na=g^Na=0$。ここで $(f,g)=A$ から $\lambda f+\mu g=1$ と書き、両辺を $2N-1$ 乗します。展開した各項は $f$ または $g$ を少なくとも $N$ 個因子に持つので、$1=(\lambda f+\mu g)^{2N-1}\in(f^N,g^N)$ です。よって $u f^N+v g^N=1$ と書けます。両辺に $a$ を掛けると $a=0$ で、写像は単射です。

次に $x=b/f^n\in A_f$、$y=c/g^n\in A_g$ が $A_{fg}$ で一致するとします。分母を共通の $n$ に揃えました。局所化の等号からある $m$ について

$$
(fg)^m(bg^n-cf^n)=0
$$

です。$N=n+m$、$B=bf^m$、$C=cg^m$ とすると $B g^N=C f^N$ が $A$ で成り立ちます。先ほどと同じ二項展開により $(f^N,g^N)=A$ ですから、$u f^N+v g^N=1$ を選び、$a=uB+vC$ と置きます。すると

$$
af^N=uBf^N+vCf^N
=uBf^N+vBg^N=B
$$

です。同様に $ag^N=C$ です。従って $a/1=B/f^N=x$ in $A_f$、$a/1=C/g^N=y$ in $A_g$ となります。単射で示した一意性から、この $a$ は唯一です。式には零因子がないという仮定を一切使いません。
<!-- solution-end -->

### C2. 一般点・局所環・大域環を一緒に調べる

$k$ を代数閉体、$A=k[t]$、$X=\operatorname{Spec}A$ とする。(1) $(0)$ の閉包と茎、(2) $(t)$ の閉包と茎、(3) $\mathcal O_X(X)$ と $\mathcal O_X(D(t))$ を求めよ。さらに $1/t$ がどこで切断になり、どこで失敗するか説明せよ。

- Level: C
- ID: AG3-02-C2

<!-- solution-start -->
**詳細解答。** (1) $k[t]$ は整域なので $(0)$ は素イデアルです。[閉包公式](#prop-ag3-02-closure)から

$$
\overline{\{(0)\}}=V(0)=X.
$$

[茎の同型](#thm-ag3-02-stalk)により $\mathcal O_{X,(0)}\simeq A_{(0)}$ です。分母としてすべての非零多項式を許すため $A_{(0)}=k(t)$ です。

(2) $(t)$ は $A/(t)\simeq k$ により極大です。従って $\overline{\{(t)\}}=V(t)=\{(t)\}$ です。また $\mathcal O_{X,(t)}\simeq k[t]_{(t)}$ で、これは分母の定数項が非零の有理式からなる局所環です。

(3) [主開切断環](#thm-ag3-02-principal-sections)を $f=1,t$ に適用すると

$$
\mathcal O_X(X)=k[t],\qquad
\mathcal O_X(D(t))=k[t,t^{-1}].
$$

$1/t$ は $D(t)$ の全点で $t$ が可逆なので切断になります。また一般点 $(0)$ の茎 $k(t)$ にも属します。しかし $(t)$ の局所環では $t$ が極大イデアルに入り可逆ではなく、$1/t$ はその点の芽として存在しません。従って全空間の切断にはなりません。この比較により、点の位相・局所環・大域環の役割を区別できます。
<!-- solution-end -->
