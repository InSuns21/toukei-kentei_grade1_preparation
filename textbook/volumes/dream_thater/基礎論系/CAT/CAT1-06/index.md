# CAT1-06 関手と保存する構造

## 1. 圏から圏への「構造を壊さない」対応

前講の[積圏](../CAT1-05/index.md#def-cat1-05-product)では、二つの圏を組にして新しい圏を作った。また[部分圏](../CAT1-05/index.md#def-cat1-05-subcategory)では対象と射を制限した。これらを元の圏と比べると、「新しい圏から元の圏へ対象・射を戻す」規則が自然に現れる。

例えば積圏 $\mathcal C\times\mathcal D$ から第一成分だけを取り出すと、対象 $(A,X)$ は $A$、射 $(f,u)$ は $f$ に移る。この操作で $(g,v)\circ(f,u)$ を先に合成してから第一成分を取っても、第一成分 $g\circ f$ を先に計算しても答えは同じである。恒等射も恒等射へ移る。

対象だけの対応では、合成できる射がどう写るか分からない。圏の間の対応として重要なのは、**対象・射を同時に移し、恒等射と合成を保存すること**である。これを関手という枠組みで明確にする。

## 2. 共変関手の二つの保存則

圏 $\mathcal C,\mathcal D$ を固定する。$\mathcal C$ の各対象 $A$ を $\mathcal D$ の対象 $F(A)$ へ、各射 $f:A\to B$ を $F(f):F(A)\to F(B)$ へ送ることを考える。「どのHomからどのHomへ送るか」を明記しないと、例えば合成 $F(g)\circ F(f)$ の型さえ保証できない。

<a id="def-cat1-06-functor"></a>

<!-- formal-statement-start -->
> **定義（共変関手）**  
> 圏 $\mathcal C,\mathcal D$ の間の**共変関手** $F:\mathcal C\to\mathcal D$ とは、各対象 $A$ に対象 $F(A)$ を対応させ、各 $A,B$ に射の対応

$$
F_{A,B}:\operatorname{Hom}_{\mathcal C}(A,B)
\longrightarrow \operatorname{Hom}_{\mathcal D}(F(A),F(B)),
\qquad f\longmapsto F(f)
$$

> を与え、次の二条件を満たすものをいう。
>
> **（F1）恒等射の保存**：任意の対象 $A$ について $F(1_A)=1_{F(A)}$。
>
> **（F2）合成の保存**：任意の $f:A\to B$, $g:B\to C$ について

$$
F(g\circ f)=F(g)\circ F(f).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-06-functor -->
**定義の確認**（積圏の第一射影）。[積圏の定義](../CAT1-05/index.md#def-cat1-05-product)から

$$
\pi_1:\mathcal C\times\mathcal D\to\mathcal C,\quad
\pi_1(A,X)=A,\qquad \pi_1(f,u)=f
$$

を考える。$(f,u):(A,X)\to(B,Y)$ の第一成分は $f:A\to B$ なので、射の始域・終域は正しく写る。恒等射は

$$
\pi_1(1_{(A,X)})=\pi_1(1_A,1_X)=1_A=1_{\pi_1(A,X)}
$$

で（F1）を満たす。さらに $(g,v):(B,Y)\to(C,Z)$ に対し

$$
\begin{aligned}
\pi_1\bigl((g,v)\circ(f,u)\bigr)
&=\pi_1(g\circ f,v\circ u)=g\circ f\\
&=\pi_1(g,v)\circ\pi_1(f,u)
\end{aligned}
$$

となり（F2）も満たす。第二成分を取る $\pi_2$ も同様に定義でき、第二成分の型、恒等射、合成を同じ式で確認できる。
<!-- definition-example-end -->

対象の対応が単なる写像でも、射をどう移すかと二条件は別に検証する必要がある。例えば[部分圏](../CAT1-05/index.md#def-cat1-05-subcategory) $\mathcal A\subseteq\mathcal C$ の包含は、対象 $A$ と射 $f$ をそれぞれ同じ $A,f$ へ送るので、$\mathcal A$ の恒等射と合成が元の圏のものと一致することから関手となる。

### 2.1 忘却関手：構造を忘れても合成は忘れない

[モノイド準同型と圏 $\mathbf{Mon}$](../CAT1-03/index.md#def-cat1-03-monoid-hom)では、対象がモノイド、射が演算と単位元を保存する写像だった。各モノイドから演算を忘れて台集合だけを取り出し、準同型から同じ集合写像を取り出す操作

$$
U:\mathbf{Mon}\to\mathbf{Set},\qquad
U(M)=|M|,\quad U(h)=h
$$

を考える。$|M|$ はモノイド $M$ の元の集合を表す。射 $h:M\to N$ はもともと関数 $|M|\to|N|$ だから型が合う。またモノイドの恒等射は元の集合の恒等写像、準同型の合成は集合写像の合成である。従って

$$
U(1_M)=1_{|M|},\qquad U(k\circ h)=U(k)\circ U(h)
$$

となる。この $U$ は具体的な**忘却関手**の例である。「忘れる」のはモノイド演算を付随データとして保持しないことであり、射の合成そのものを変更することではない。

## 3. 恒等関手と関手の合成

関手を続けて適用できると便利である。ただし $F:\mathcal C\to\mathcal D$ の次に $G$ を適用するには、$G$ の入力圏が $\mathcal D$ であることが必要だ。まず対象と射への対応をそれぞれ続けて行い、関手の条件が保たれるかを調べる。

<a id="def-cat1-06-composition"></a>

<!-- formal-statement-start -->
> **定義（恒等関手と合成関手）**  
> 圏 $\mathcal C$ の**恒等関手** $1_{\mathcal C}:\mathcal C\to\mathcal C$ は、各対象 $A$ を $A$、各射 $f$ を $f$ に送る対応とする。
>
> 関手 $F:\mathcal C\to\mathcal D$, $G:\mathcal D\to\mathcal E$ の**合成関手** $G\circ F:\mathcal C\to\mathcal E$ は

$$
(G\circ F)(A)=G(F(A)),\qquad
(G\circ F)(f)=G(F(f))
$$

> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-06-composition -->
**定義の確認**（三つの積の成分）。圏 $\mathcal A,\mathcal B,\mathcal C$ に対し、先ほどの[射影関手](#def-cat1-06-functor)を二度使うと

$$
(\mathcal A\times\mathcal B)\times\mathcal C
\xrightarrow{\ \pi_1\ }\mathcal A\times\mathcal B
\xrightarrow{\ \pi_2\ }\mathcal B
$$

で対象 $((A,B),C)$ は $B$、射 $((f,g),h)$ は $g$ へ送られる。両射影がそれぞれ恒等射・合成を成分ごとに保つので、続けて適用してもそれらは保たれる。恒等関手については対象・射を変えないので、両条件は元の圏の等式そのものである。
<!-- definition-example-end -->

<a id="prop-cat1-06-composition"></a>

<!-- formal-statement-start -->
> **命題（関手の合成と恒等関手の公理）**  
> 任意の圏 $\mathcal C$ の恒等関手 $1_{\mathcal C}$ は共変関手である。共変関手 $F:\mathcal C\to\mathcal D$, $G:\mathcal D\to\mathcal E$ の合成 $G\circ F$ も共変関手である。また合成可能な三関手 $F,G,H$ について

$$
H\circ(G\circ F)=(H\circ G)\circ F,
\quad 1_{\mathcal D}\circ F=F=F\circ1_{\mathcal C}
$$

> が対象・射への対応として成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

射 $f:A\to B$ を二度送ったときの始域・終域を追い、恒等射の保存を二回、合成の保存も二回適用する。三重合成の等号は、対象と射に同じ対応を与えることを確かめる。

<!-- proof-start -->
### 証明

$1_{\mathcal C}(f)=f:A\to B$ は正しい型の射で、$1_{\mathcal C}(1_A)=1_A$、$1_{\mathcal C}(g\circ f)=g\circ f=1_{\mathcal C}(g)\circ1_{\mathcal C}(f)$ なので、[関手の定義](#def-cat1-06-functor)を満たす。

$f:A\to B$ に対し $F(f):F(A)\to F(B)$ だから、$G(F(f)):G(F(A))\to G(F(B))$ も正しい型である。恒等射について二関手の（F1）を順に使うと

$$
(G\circ F)(1_A)=G(F(1_A))
=G(1_{F(A)})=1_{G(F(A))}.
$$

合成可能な $f:A\to B$, $g:B\to C$ については、まず $F$ の（F2）、次に $G$ の（F2）を適用し

$$
\begin{aligned}
(G\circ F)(g\circ f)
&=G(F(g\circ f))\\
&=G(F(g)\circ F(f))\\
&=G(F(g))\circ G(F(f))\\
&=(G\circ F)(g)\circ(G\circ F)(f)
\end{aligned}
$$

を得る。三関手の場合、対象 $A$ はどちらの括弧付けでも $H(G(F(A)))$、射 $f$ は $H(G(F(f)))$ へ写る。恒等関手との合成も、各対象・射を一度そのまま通すだけなので元の $F$ に一致する。$\square$
<!-- proof-end -->

## 4. 関手が必ず保存するもの、しないもの

関手の二つの公理だけで、すべての性質が保存されるわけではない。まず[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)と[分裂する射](../CAT1-03/index.md#def-cat1-03-split)は「いくつかの合成が恒等射になる」という等式で表せるため、関手と相性がよい。

<a id="prop-cat1-06-preservation"></a>

<!-- formal-statement-start -->
> **命題（関手による同型と分裂射の保存）**  
> 共変関手 $F:\mathcal C\to\mathcal D$ と射 $f:A\to B$ に対して次が成り立つ。
>
> 1. $f$ が同型射なら $F(f)$ も同型射であり、逆射は $F(f^{-1})$ である。
> 2. $f$ に左逆射 $r:B\to A$ があれば $F(f)$ に左逆射 $F(r)$ がある。右逆射があれば、その像も右逆射である。
>
> また任意の合成可能な射に関する等式 $g\circ f=h$ は、$F(g)\circ F(f)=F(h)$ を導く。
<!-- formal-statement-end -->

### 証明の見取り図

逆射の両側合成、左逆・右逆の片側合成をそれぞれ関手で写す。合成と恒等射の保存が同時に必要である。

<!-- proof-start -->
### 証明

$f$ が同型なら[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)から $f^{-1}:B\to A$ があり、$f^{-1}\circ f=1_A$, $f\circ f^{-1}=1_B$ である。[関手の二つの保存則](#def-cat1-06-functor)をそれぞれに使うと

$$
\begin{aligned}
F(f^{-1})\circ F(f)&=F(f^{-1}\circ f)=F(1_A)=1_{F(A)},\\
F(f)\circ F(f^{-1})&=F(f\circ f^{-1})=F(1_B)=1_{F(B)}.
\end{aligned}
$$

従って $F(f^{-1})$ は $F(f)$ の両側逆射である。左逆射 $r$ の場合は $r\circ f=1_A$ という第一式だけがあり、同様に $F(r)\circ F(f)=1_{F(A)}$ を得る。右逆射 $s:B\to A$ の場合は $f\circ s=1_B$ を写して $F(f)\circ F(s)=1_{F(B)}$ を得る。

最後に $g\circ f=h$ の両辺を関手で移せば $F(g\circ f)=F(h)$ であり、（F2）により左辺は $F(g)\circ F(f)$ となる。$\square$
<!-- proof-end -->

ここで**保存と逆向きの判定は違う**。全射でも単射でもない集合写像を、すべての射が恒等射になる一対象一射の圏へ送る関手は存在する。移った射は同型だが元の射は同型とは限らない。

さらに関手は[モノ射・エピ射の定義](../CAT1-03/index.md#def-cat1-03-monomorphism)にある「すべての試験射に対する消去条件」を無条件には保存しない。例えば $U:\mathbf{Mon}\to\mathbf{Set}$ では、[全射でないモノイドのエピ射](../CAT1-03/index.md#prop-cat1-03-monoid-non-surj-epi)である $\mathbb N_0\hookrightarrow\mathbb Z$ が、集合では[エピ射と全射の同値](../CAT1-03/index.md#prop-cat1-03-set-characterization)によりエピ射でなくなる。射の等式を保存しても、移った圏にある**すべての**試験射まで元の圏から来るとは限らないのである。

終対象も関手一般では保存されない。一対象一射の圏 $\mathbf1$ の唯一の対象は[終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)だが、これを空集合に送る関手 $\mathbf1\to\mathbf{Set}$ がある。空集合から二元集合への写像は存在するが、二元集合から空集合への写像は存在しないため、空集合は $\mathbf{Set}$ の終対象ではない。

## 5. 順序とモノイドで関手を読み直す

抽象的な条件を具体的な構造に翻訳してみよう。[順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)では $p\le q$ なら射 $p\to q$ が一本だけある。また[一対象圏](../CAT1-02/index.md#prop-cat1-02-one-object)では射の合成がモノイドの積である。

順序集合の写像 $\varphi:P\to Q$ が **順序を保存する**とは、$p\le q$ なら $\varphi(p)\preceq\varphi(q)$ が成り立つという条件である。この条件と、[モノイド準同型](../CAT1-03/index.md#def-cat1-03-monoid-hom)の積・単位元保存が、関手の公理とどう対応するかを見る。

<a id="prop-cat1-06-order-monoid"></a>

<!-- formal-statement-start -->
> **命題（順序圏と一対象圏における関手の判定）**  
> 半順序集合 $(P,\le)$, $(Q,\preceq)$ を順序圏とみなす。写像 $\varphi:P\to Q$ が共変関手の対象対応へ延長できる必要十分条件は、$\varphi$ が順序を保存することである。延長できるとき射の対応は一意である。
>
> またモノイド $M,N$ を一対象圏とみなすと、両者の間の共変関手は、モノイド準同型 $h:M\to N$ と一対一に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

順序圏のHomは空か一元集合なので、射の行き先が存在する条件が順序保存そのものである。一対象圏では対象の行き先は一通りで、（F1）が単位元保存、（F2）が積の保存になる。

<!-- proof-start -->
### 証明

順序圏に関手 $F$ があり、$F(p)=\varphi(p)$ とする。$p\le q$ なら唯一の射 $a:p\to q$ があるから、$F(a):\varphi(p)\to\varphi(q)$ も存在する。[順序圏の射の存在条件](../CAT1-02/index.md#prop-cat1-02-order-category)から $\varphi(p)\preceq\varphi(q)$ である。

逆に $\varphi$ が順序を保存すれば、$p\le q$ の唯一の射を $\varphi(p)\preceq\varphi(q)$ の唯一の射に送る。$p=q$ の恒等射は両圏で唯一の自己射だから（F1）が成立する。$p\le q\le r$ では合成と直接の射 $p\to r$ が同一の唯一の射であり、像の合成と直接の像も $\varphi(p)\to\varphi(r)$ の唯一の射である。よって（F2）が成立し、一意性もHomの一元性から従う。

モノイドの場合、両一対象圏の唯一の対象は必ず互いに対応する。[一対象圏の合成](../CAT1-02/index.md#prop-cat1-02-one-object)は $n\circ m=nm$、恒等射は単位元なので、射の対応 $h$ が関手である条件は

$$
h(e_M)=e_N,\qquad h(nm)=h(n)h(m)
$$

である。これは[モノイド準同型の定義](../CAT1-03/index.md#def-cat1-03-monoid-hom)と一致する。逆に準同型から同じ射の対応を作れば、両式が（F1）（F2）を与える。$\square$
<!-- proof-end -->

二点鎖 $0<1$ の圏から $\mathbf{Set}$ への関手は、二集合 $X_0,X_1$ と一本の写像 $u:X_0\to X_1$ を選ぶことに対応する。始域と終域の恒等射は恒等写像へ送られ、非自明な合成は恒等射との合成しかないからである。この観察は、関手がモノ射を保存しない例を演習で作る手掛かりになる。

## 6. 反変関手：射の向きを反対に移す

共変関手は $f:A\to B$ を $F(A)\to F(B)$ に送る。しかし集合への写像 $f:X\to Y$ に対し、$Y$ の部分集合 $T$ から逆像 $f^{-1}(T)\subseteq X$ を作る操作は、**$Y$ の側から $X$ の側へ**進む。この逆像は

$
f^{-1}(T)=\{x\in X\mid f(x)\in T\}
$

で定まり、$f$ が全単射でなくても定義できる。これは[同型射の逆射](../CAT1-03/index.md#def-cat1-03-isomorphism) $f^{-1}:Y\to X$ とは異なる記法である。このように向きが逆になる対応には、既習の[反対圏](../CAT1-04/index.md#def-cat1-04-opposite)を利用する。

反対圏では、元の射 $f:A\to B$ を $f^{\mathrm{op}}:B\to A$ として扱う。以下、反変関手 $T:\mathcal C^{\mathrm{op}}\to\mathcal D$ の射への作用を $T(f)$ と略記するときは、厳密には $T(f^{\mathrm{op}})$ を意味する。この約束により、元の圏 $\mathcal C$ の射について式を読みやすく書ける。

<a id="def-cat1-06-contravariant"></a>

<!-- formal-statement-start -->
> **定義（反変関手）**  
> 圏 $\mathcal C,\mathcal D$ の間の**反変関手**とは、$\mathcal C^{\mathrm{op}}$ から $\mathcal D$ への共変関手 $T:\mathcal C^{\mathrm{op}}\to\mathcal D$ である。同じ対応を $\mathcal C$ の射で書くと、$f:A\to B$ に対し $T(f):T(B)\to T(A)$ を与え、

$$
T(1_A)=1_{T(A)},\qquad
T(g\circ f)=T(f)\circ T(g)
$$

> を満たす。右辺の合成順序が共変関手と逆である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-06-contravariant -->
**定義の確認**（逆像）。集合 $X$ にその部分集合全体の集合 $\mathcal P(X)$ を対応させ、$f:X\to Y$ に

$$
\mathcal P(f)=f^{-1}:\mathcal P(Y)\to\mathcal P(X)
$$

を対応させる。$T\subseteq Y$ に対して $f^{-1}(T)=\{x\in X\mid f(x)\in T\}$ である。恒等写像について $1_X^{-1}(S)=S$、合成 $X\xrightarrow{f}Y\xrightarrow{g}Z$ について各 $S\subseteq Z$ で

$$
\begin{aligned}
(g\circ f)^{-1}(S)
&=\{x\in X\mid g(f(x))\in S\}\\
&=\{x\in X\mid f(x)\in g^{-1}(S)\}\\
&=f^{-1}(g^{-1}(S))
\end{aligned}
$$

だから、$\mathcal P(g\circ f)=\mathcal P(f)\circ\mathcal P(g)$ となる。従って $\mathcal P:\mathbf{Set}^{\mathrm{op}}\to\mathbf{Set}$ は反変関手である。
<!-- definition-example-end -->

反対圏の記法で型を確かめると、$f:A\to B$ に対応する $f^{\mathrm{op}}:B\to A$ は $\mathcal C^{\mathrm{op}}$ の射である。$g:B\to C$ のとき $(g\circ f)^{\mathrm{op}}=f^{\mathrm{op}}\circ_{\mathrm{op}}g^{\mathrm{op}}$ なので、共変関手として（F2）を使えば上の反転式が出る。「反変も $T(g)\circ T(f)$」と書くと一般に型が合わない。

## 7. Homを集合にして運ぶ二つの関手

局所小圏では[Hom集合の定義](../CAT1-02/index.md#def-cat1-02-size)により各 $\operatorname{Hom}_{\mathcal C}(A,X)$ が集合である。対象 $A$ を固定すると、もう一方の対象 $X$ を変えて、$A$ から $X$ への射の集合を比べられる。

$f:X\to Y$ があるとき、$h:A\to X$ に **後から $f$ を合成**して $f\circ h:A\to Y$ を作れる。別の向きでは $h:Y\to A$ の**前に $f$ を入れて** $h\circ f:X\to A$ を作れる。固定する側と動かす側に注意して二種類を定義する。

<a id="def-cat1-06-hom-functors"></a>

<!-- formal-statement-start -->
> **定義（共変Hom関手と反変Hom関手）**  
> 局所小圏 $\mathcal C$ と対象 $A\in\mathcal C$ を固定する。
>
> **共変Hom関手** $H_A=\operatorname{Hom}_{\mathcal C}(A,-):\mathcal C\to\mathbf{Set}$ は、対象 $X$ を $\operatorname{Hom}_{\mathcal C}(A,X)$ に、射 $f:X\to Y$ を写像

$$
H_A(f):\operatorname{Hom}_{\mathcal C}(A,X)
\longrightarrow\operatorname{Hom}_{\mathcal C}(A,Y),
\qquad h\longmapsto f\circ h
$$

> に送る。
>
> **反変Hom関手** $K_A=\operatorname{Hom}_{\mathcal C}(-,A):\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ は、対象 $X$ を $\operatorname{Hom}_{\mathcal C}(X,A)$ に、$\mathcal C$ の射 $f:X\to Y$ を逆向きの写像

$$
K_A(f):\operatorname{Hom}_{\mathcal C}(Y,A)
\longrightarrow\operatorname{Hom}_{\mathcal C}(X,A),
\qquad h\longmapsto h\circ f
$$

> に送る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-06-hom-functors -->
**定義の確認**（有限集合）。$\mathcal C=\mathbf{Set}$、$A=\{*\}$、$X=\{0,1\}$、$Y=\{a\}$、$f:X\to Y$ を定値写像とする。$\operatorname{Hom}(A,X)$ には $h_0(*)=0$, $h_1(*)=1$ の二本があり、$\operatorname{Hom}(A,Y)$ には $k(*)=a$ の一本しかない。共変側では

$$
H_A(f)(h_0)=f\circ h_0=k,\qquad
H_A(f)(h_1)=f\circ h_1=k.
$$

始域の二本が終域の一本へ移ることを、各 $*$ で計算した。

反変側では $A=\{0,1\}$、$X=\{x\}$、$Y=\{y,z\}$、$f:X\to Y$ を $f(x)=y$ とする。$h:Y\to A$ を $h(y)=0$, $h(z)=1$ とすると

$$
K_A(f)(h)=h\circ f:X\to A,\qquad (h\circ f)(x)=h(y)=0.
$$

これは $\operatorname{Hom}(Y,A)$ から $\operatorname{Hom}(X,A)$ への写像であり、向きが反対になることを直接確認できる。いずれもHomは集合だから $\mathbf{Set}$ の対象として扱える。
<!-- definition-example-end -->

<a id="prop-cat1-06-hom-axioms"></a>

<!-- formal-statement-start -->
> **命題（Hom関手の公理）**  
> 任意の局所小圏 $\mathcal C$ と対象 $A\in\mathcal C$ に対して、上の $H_A$ は共変関手 $\mathcal C\to\mathbf{Set}$、$K_A$ は共変関手 $\mathcal C^{\mathrm{op}}\to\mathbf{Set}$（すなわち $\mathcal C$ 上の反変関手）である。
<!-- formal-statement-end -->

### 証明の見取り図

それぞれのHom上の写像が正しい型を持つことを先に確かめる。恒等射との合成は元の射に戻り、二本の射を順に作用させると元の圏の[結合則](../CAT1-01/index.md#def-cat1-01-category)によって一本の合成を作用させるのと一致する。

<!-- proof-start -->
### 証明

$f:X\to Y$ と $h:A\to X$ に対し $f\circ h:A\to Y$ が定義されるので、$H_A(f)$ の値は指定のHomに入る。任意の $h:A\to X$ について[圏の単位律](../CAT1-01/index.md#def-cat1-01-category)から

$$
H_A(1_X)(h)=1_X\circ h=h
$$

であり、$H_A(1_X)$ はHom集合の恒等写像となる。$f:X\to Y$, $g:Y\to Z$ と $h:A\to X$ に対して

$$
\begin{aligned}
H_A(g\circ f)(h)
&=(g\circ f)\circ h\\
&=g\circ(f\circ h)\\
&=H_A(g)(H_A(f)(h))
\end{aligned}
$$

だから二つの集合写像は全ての $h$ で一致する。

反変側で $f:X\to Y$ と $h:Y\to A$ を取れば $h\circ f:X\to A$ なので $K_A(f)$ の型が合う。$h:X\to A$ に対して

$$
K_A(1_X)(h)=h\circ1_X=h.
$$

さらに $f:X\to Y$, $g:Y\to Z$, $h:Z\to A$ とすると

$$
\begin{aligned}
K_A(g\circ f)(h)
&=h\circ(g\circ f)\\
&=(h\circ g)\circ f\\
&=K_A(f)(K_A(g)(h)).
\end{aligned}
$$

よって $K_A(g\circ f)=K_A(f)\circ K_A(g)$ である。これは[反変関手の定義](#def-cat1-06-contravariant)の合成則であり、$\mathcal C^{\mathrm{op}}$ からの共変関手としての公理を満たす。$\square$
<!-- proof-end -->

共変Homは射の**後合成**、反変Homは**前合成**である。後の自然変換やYonedaの補題ではこの二種類を使うので、式を暗記するより、$h$ の始域・終域を一度書いて型を確かめる習慣が大切になる。

## 8. 演習：関手を型と公理から組み立てる

### CAT1-06-A01 順序圏で射が写せる条件

- Level: A

三点鎖 $P=\{0<1<2\}$ と二点鎖 $Q=\{a<b\}$ を順序圏とする。対象写像 $\varphi(0)=a$, $\varphi(1)=b$, $\varphi(2)=b$ は共変関手へ延長できるか。$\psi(0)=b$, $\psi(1)=a$, $\psi(2)=b$ はどうか。射 $0\to1$, $1\to2$, $0\to2$ を使って説明せよ。

<!-- solution-start -->
**詳細解答**。[順序圏の関手判定](#prop-cat1-06-order-monoid)を適用するため順序保存を確かめる。$\varphi$ では $a\preceq b\preceq b$ だから、三本の射の像は順に

$$
a\to b,\qquad b\to b=1_b,\qquad a\to b
$$

として存在する。合成の保存も、$1_b\circ(a\to b)=a\to b$ が直接の像と一致することから確かめられる。恒等射は各像での唯一の自己射に移るので関手である。

一方 $\psi$ では、$0\to1$ の像として $b\to a$ が必要になる。しかし $Q$ にこの射は存在しない。射の型を作れないため、関手へ延長できない。
<!-- solution-end -->

### CAT1-06-A02 積圏の第二射影

- Level: A

圏 $\mathcal C,\mathcal D$ の積圏から $\mathcal D$ への対応 $\pi_2(A,X)=X$, $\pi_2(f,u)=u$ を考える。射の型、恒等射の保存、二本の射の合成保存を式で確認せよ。

<!-- solution-start -->
**詳細解答**。[積圏の射](../CAT1-05/index.md#def-cat1-05-product) $(f,u):(A,X)\to(B,Y)$ の第二成分は $u:X\to Y$ だから型が合う。恒等射について

$$
\pi_2(1_{(A,X)})=\pi_2(1_A,1_X)=1_X=1_{\pi_2(A,X)}.
$$

合成可能な $(f,u),(g,v)$ に対し

$$
\begin{aligned}
\pi_2((g,v)\circ(f,u))
&=\pi_2(g\circ f,v\circ u)\\
&=v\circ u=\pi_2(g,v)\circ\pi_2(f,u).
\end{aligned}
$$

従って[共変関手の二公理](#def-cat1-06-functor)を満たす。
<!-- solution-end -->

### CAT1-06-A03 共変Homの二本が一本へ移る

- Level: A

$A=\{*\}$、$X=\{0,1\}$、$Y=\{a,b\}$、$f:X\to Y$ を $f(0)=f(1)=a$ とする。$\operatorname{Hom}(A,X)$ と $\operatorname{Hom}(A,Y)$ の写像を列挙し、$H_A(f)$ の値を全て求めよ。

<!-- solution-start -->
**詳細解答**。$A$ は一元集合なので、$h_0(*)=0$, $h_1(*)=1$ が $A\to X$ の全二本である。$A\to Y$ は $k_a(*)=a$, $k_b(*)=b$ の二本。[共変Homの定義](#def-cat1-06-hom-functors)で $H_A(f)(h)=f\circ h$ だから

$$
(f\circ h_0)(*)=f(0)=a,\qquad
(f\circ h_1)(*)=f(1)=a.
$$

よって $H_A(f)(h_0)=k_a$, $H_A(f)(h_1)=k_a$ であり、$k_b$ は像に入らない。Hom上の写像が全単射である必要はない。
<!-- solution-end -->

### CAT1-06-A04 反変Homの前合成

- Level: A

$X=\{x\}$、$Y=\{y,z\}$、$A=\{0,1\}$ とし、$f:X\to Y$ は $f(x)=z$ とする。$h:Y\to A$ を $h(y)=0$, $h(z)=1$ とするとき、$K_A(f)$ の始域・終域と $K_A(f)(h)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[反変Homの定義](#def-cat1-06-hom-functors)で、$f:X\to Y$ に対応する写像の始域は $\operatorname{Hom}(Y,A)$、終域は $\operatorname{Hom}(X,A)$ である。$K_A(f)(h)=h\circ f$ は $X\to A$ であり、唯一の $x$ の値は

$$
(h\circ f)(x)=h(f(x))=h(z)=1.
$$

従って値 $x\mapsto1$ の写像が答えである。$f$ の向きをそのまま使って $\operatorname{Hom}(X,A)\to\operatorname{Hom}(Y,A)$ としてはいけない。
<!-- solution-end -->

### CAT1-06-A05 忘却関手とエピ射

- Level: A

[モノイドの圏](../CAT1-03/index.md#def-cat1-03-monoid-hom)から集合の圏への忘却関手 $U$ について、恒等射と合成の保存を示せ。さらに加法モノイドの包含 $i:\mathbb N_0\to\mathbb Z$ が、$U$ によりエピ射でなくなる理由を答えよ。

<!-- solution-start -->
**詳細解答**。$M$ 上の恒等準同型は集合写像としても $1_{|M|}$ であるから $U(1_M)=1_{U(M)}$。$h:M\to N$, $k:N\to L$ の準同型の合成は写像の通常の合成なので、任意の $m\in M$ に対して

$$
U(k\circ h)(m)=k(h(m))=(U(k)\circ U(h))(m).
$$

これで[関手の公理](#def-cat1-06-functor)が成立する。一方、[全射でないモノイドのエピ射](../CAT1-03/index.md#prop-cat1-03-monoid-non-surj-epi)から $i$ は $\mathbf{Mon}$ のエピ射だが、像に $-1$ がない。集合の圏では[エピ射は全射](../CAT1-03/index.md#prop-cat1-03-set-characterization)なので $U(i)$ はエピ射でない。関手がすべてのエピ射を保存するという推論はできない。
<!-- solution-end -->

### CAT1-06-B01 合成関手の公理を二段で使う

- Level: B

共変関手 $F:\mathcal A\to\mathcal B$, $G:\mathcal B\to\mathcal C$ を考える。$f:X\to Y$, $g:Y\to Z$ の型を追いながら $G(F(g\circ f))=G(F(g))\circ G(F(f))$ を示せ。さらに $1_{\mathcal B}\circ F=F$ が対象・射の両方で成立することを確かめよ。

<!-- solution-start -->
**詳細解答**。$F(f):F(X)\to F(Y)$ と $F(g):F(Y)\to F(Z)$ が合成可能なので、$G$ に写した射も $G(F(X))\to G(F(Y))\to G(F(Z))$ と合成可能である。[関手の公理](#def-cat1-06-functor)をまず $F$ に、次に $G$ に用いると

$$
\begin{aligned}
G(F(g\circ f))
&=G(F(g)\circ F(f))\\
&=G(F(g))\circ G(F(f)).
\end{aligned}
$$

また[恒等関手の定義](#def-cat1-06-composition)から、対象 $X$ に対し $(1_{\mathcal B}\circ F)(X)=1_{\mathcal B}(F(X))=F(X)$、射 $f$ に対し $(1_{\mathcal B}\circ F)(f)=1_{\mathcal B}(F(f))=F(f)$。二種類のデータの双方が一致するから関手として等しい。
<!-- solution-end -->

### CAT1-06-B02 一対象圏の二倍関手

- Level: B

加法モノイド $(\mathbb N_0,+,0)$ を一対象圏とみなし、その唯一の対象を自分に送り、射 $n$ を $2n$ に送る対応 $T$ を作る。これが関手であることを直接示し、射 $1$ と $2$ の合成について $T(2\circ1)$ を二通りで求めよ。

<!-- solution-start -->
**詳細解答**。[一対象圏の構成](../CAT1-02/index.md#prop-cat1-02-one-object)では恒等射は加法単位元 $0$、合成は $m\circ n=m+n$ である。$T(0)=0$ だから恒等射を保存する。任意の $m,n\in\mathbb N_0$ について

$$
T(m\circ n)=T(m+n)=2(m+n)=2m+2n=T(m)\circ T(n).
$$

従って関手である。実際 $2\circ1=3$ なので $T(2\circ1)=T(3)=6$。一方 $T(2)\circ T(1)=4\circ2=4+2=6$。これは[順序圏と一対象圏の関手判定](#prop-cat1-06-order-monoid)におけるモノイド準同型 $n\mapsto2n$ の具体例である。
<!-- solution-end -->

### CAT1-06-B03 保存と反映を区別する

- Level: B

共変関手 $F:\mathcal C\to\mathcal D$ と $f:A\to B$ に対し、$r:B\to A$ が $r\circ f=1_A$ を満たすなら $F(r)$ が $F(f)$ の左逆射になることを示せ。次に、二点鎖 $0<1$ の順序圏から一対象一射の圏 $\mathbf1$ への関手で、同型でない射が同型へ写ることを説明せよ。

<!-- solution-start -->
**詳細解答**。左逆射の等式を[関手の合成・恒等射保存](#def-cat1-06-functor)に代入すると

$$
F(r)\circ F(f)=F(r\circ f)=F(1_A)=1_{F(A)}.
$$

射の型は $F(f):F(A)\to F(B)$、$F(r):F(B)\to F(A)$ であり、確かに左逆射である。

二点鎖の唯一の非恒等射 $u:0\to1$ は逆向きの $1\to0$ がないから、[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)では同型でない。一対象一射の圏 $\mathbf1$ へ両対象を唯一の対象 $*$ に送り、すべての射を唯一の射 $1_*$ に送ると、恒等射保存も合成保存も成立する。像 $F(u)=1_*$ は逆射 $1_*$ を持つ同型射である。従って関手が同型を保存しても、像が同型であることから元が同型とは推論できない。
<!-- solution-end -->

### CAT1-06-B04 逆像はなぜ反変か

- Level: B

$X=\{1,2,3\}$、$Y=\{a,b\}$、$Z=\{0,1\}$ とし、$f:X\to Y$ を $f(1)=a$, $f(2)=f(3)=b$、$g:Y\to Z$ を $g(a)=0$, $g(b)=1$ とする。$S=\{1\}\subseteq Z$ について $(g\circ f)^{-1}(S)$ と $f^{-1}(g^{-1}(S))$ を別々に計算せよ。次に一般の写像について反変の合成則を元の定義から証明せよ。

<!-- solution-start -->
**詳細解答**。合成は $(g\circ f)(1)=0$, $(g\circ f)(2)=(g\circ f)(3)=1$ だから

$$
(g\circ f)^{-1}(\{1\})=\{2,3\}.
$$

一方 $g^{-1}(\{1\})=\{b\}$、$f^{-1}(\{b\})=\{2,3\}$ であり、二段の逆像も同じ集合である。一般の $X\xrightarrow{f}Y\xrightarrow{g}Z$ と $S\subseteq Z$ に対して、元 $x\in X$ について

$$
\begin{aligned}
x\in(g\circ f)^{-1}(S)
&\Longleftrightarrow g(f(x))\in S\\
&\Longleftrightarrow f(x)\in g^{-1}(S)\\
&\Longleftrightarrow x\in f^{-1}(g^{-1}(S)).
\end{aligned}
$$

従って集合として一致し、写像として $\mathcal P(g\circ f)=\mathcal P(f)\circ\mathcal P(g)$ を得る。[反変関手の定義](#def-cat1-06-contravariant)にある順序と一致する。恒等写像についても $1_X^{-1}(S)=S$ だから（F1）を満たす。
<!-- solution-end -->

### CAT1-06-C01 矢印圏からの関手を分類する

- Level: C

二点鎖 $0<1$ を圏 $\mathcal J$ とみなし、唯一の非恒等射を $u:0\to1$ とする。

1. 共変関手 $F:\mathcal J\to\mathbf{Set}$ を与えることが、二集合 $X_0,X_1$ と一つの写像 $t:X_0\to X_1$ を与えることと一対一に対応することを、対象・射・恒等射・合成まで確かめて示せ。
2. $\mathcal J$ では $u$ がモノ射かつエピ射であることを消去律から示せ。
3. 関手 $F$ の具体的な選び方によって $F(u)$ がモノ射でなくなる例と、別の関手 $G$ で $G(u)$ がエピ射でなくなる例を作り、何の保存則が破れたか説明せよ。

<!-- solution-start -->
**詳細解答**。

**第1問：関手の分類。** 関手 $F$ からは二集合 $X_0:=F(0)$, $X_1:=F(1)$ と一本の写像 $t:=F(u):X_0\to X_1$ が得られる。逆に二集合と一本の写像を選んだら、対象と三本の射の像を

$$
F(0)=X_0,\quad F(1)=X_1,\quad
F(u)=t,\quad F(1_0)=1_{X_0},\quad F(1_1)=1_{X_1}
$$

と定める。$\mathcal J$ で合成可能な二射の少なくとも一方は恒等射である。例えば二つの非自明な単位律は

$$
F(u\circ1_0)=t=t\circ1_{X_0},\qquad
F(1_1\circ u)=t=1_{X_1}\circ t
$$

となり、恒等射どうしの合成も保存する。従って[関手の公理](#def-cat1-06-functor)を満たし、二つの構成は対象と三本の射のデータを互いに復元する。

**第2問：消去律。** [モノ射の定義](../CAT1-03/index.md#def-cat1-03-monomorphism)により $u\circ a=u\circ b$ を考える。$a,b$ は同じ対象 $K$ から $0$ への射である必要がある。$K=0$ に限られ、その射は $1_0$ だけなので $a=b$ となる。

[エピ射の定義](../CAT1-03/index.md#def-cat1-03-epimorphism)では $a\circ u=b\circ u$ を考える。$a,b$ は $1$ から同じ対象 $L$ への射であり、$L=1$ の $1_1$ しかないので、やはり $a=b$ である。

**第3問：保存されない二性質。** まず次の対象と射の対応を選ぶ。

$$
F(0)=\{a,b\},\quad F(1)=\{*\},\quad F(u)(a)=F(u)(b)=*.
$$

第1問から関手である。しかし異なる二元が同じ元へ移るため $F(u)$ は単射でなく、[集合でのモノ射の特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)によってモノ射でもない。

別の対応として

$$
G(0)=\{*\},\quad G(1)=\{a,b\},\quad G(u)(*)=a
$$

を選ぶ。これも関手だが、$b$ が像に入らず全射でないから集合の圏でエピ射でない。元の $\mathcal J$ では $u$ は両性質を持つのに、各像では性質が失われた。関手は合成等式を保存するが、集合の圏に新たに存在するすべての試験射に対する消去律までは保証しない。$\square$
<!-- solution-end -->

## 9. 次の講義へ

関手は圏の対象と射を対応させ、恒等射と合成を保存する。忘却関手、射影関手、順序圏・一対象圏の関手、共変・反変Hom関手をすべて同じ公理で検証できた。一方、同型は保存しても一般のモノ射・エピ射や終対象までは保存しない。

次の **CAT1-07「自然変換と自然同型」** では、二つの関手をさらに比較する。その際、各対象で与えた射が、元の圏のすべての射と矛盾なく両立することを自然性という条件で表す。
