# CAT1-12 Yoneda埋め込み

## 1. 対象を「そこへ入る全ての射」で記録する

前講の[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)では、対象 $A$ へ入る射を集めた反変関手

$$
h^A(X)=\operatorname{Hom}_{\mathcal C}(X,A)
$$

から集合値関手 $P$ への自然変換が、$P(A)$ の一つの元で決まることを証明した。今度は $A$ を動かす。対象 $A$ を $h^A$ に、射 $f:A\to B$ を「どの $X$ から来た射にも $f$ を後から合成する操作」に送れば、圏 $\mathcal C$ の構造全体が集合値関手の圏に移るだろうか。

たとえば二対象 $0,1$ と恒等射、ただ一つの非恒等射 $u:0\to1$ を持つ圏では、「$0$ に向かう射」と「$1$ に向かう射」の個数が異なる。関手として記録すれば、この違いだけでなく $u$ の向きも保存できるはずである。

以下は集合論的なサイズの混乱を避けるため、$\mathcal C$ を[小さい圏](../CAT1-02/index.md#def-cat1-02-size)とする。すると $\mathcal C^{\mathrm{op}}$ も小さく、$\mathbf{Set}$ は局所小なので、[関手圏の局所小性](../CAT1-08/index.md#prop-cat1-08-size)を使用できる。これは $\mathbf{Set}$ 自身が小さいと仮定するものではない。

## 2. 集合値前層とYoneda埋め込み

前講で使った[反変関手](../CAT1-06/index.md#def-cat1-06-contravariant)のうち、集合に値を取るものを、ここでは「前層」と呼ぶ。$\mathcal C$ の射 $u:X\to Y$ は前層 $P$ により

$$
P(u):P(Y)\longrightarrow P(X)
$$

という引き戻しになる。前層間の射には既習の[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation)を使い、その全体を[関手圏](../CAT1-08/index.md#def-cat1-08-functor-category)として扱う。

<a id="def-cat1-12-presheaf"></a>

<!-- formal-statement-start -->
> **定義（集合値前層と前層圏）**
> 小さい圏 $\mathcal C$ 上の **集合値前層**は、反変関手 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ である。前層 $P,Q$ 間の射を自然変換 $P\Rightarrow Q$ とし、恒等自然変換と成分ごとの合成で作る圏を **前層圏** と呼び、$[\mathcal C^{\mathrm{op}},\mathbf{Set}]$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-12-presheaf -->
**定義の確認**

**定義の確認：二対象の矢印圏。** $\mathcal A$ は $0\overset{u}{\longrightarrow}1$ と各恒等射だけを持つ小さい圏とする。集合 $S,T$ と写像 $r:T\to S$ を選べば、$P(0)=S$、$P(1)=T$、$P(u)=r$ として前層を作れる。反変性のために $r$ の向きは $P(1)\to P(0)$ であり、$P(1_0)=1_S$、$P(1_1)=1_T$ と置く。非自明な射を二本連続して合成する場合は存在しないので、残る合成は単位律だけであり関手公理を満たす。

二つの前層 $(S,T,r)$、$(S',T',r')$ の自然変換の成分は写像 $a:S\to S'$、$b:T\to T'$ である。射 $u:0\to1$ の自然性を任意の $t\in T$ に適用すると

$$
a(P(u)(t))=P'(u)(b(t))
$$

である。$P(u)=r$、$P'(u)=r'$ を代入した条件は

$$
a\circ r=r'\circ b
$$

を満たす組である。これが前層圏での射の具体的な姿になる。成分ごとの恒等写像と合成もこの等式を保つので、[関手圏の圏公理](../CAT1-08/index.md#prop-cat1-08-axioms)がこの例でも確認できる。
<!-- definition-example-end -->

一つの対象から作る前層 $h^A=\operatorname{Hom}_{\mathcal C}(-,A)$ は、[反変Hom関手](../CAT1-06/index.md#def-cat1-06-hom-functors)としてすでに定義した。$f:A\to B$ によって射 $g:X\to A$ が $f\circ g:X\to B$ に変わる。前層の対象と射の両方へ、この操作を対応させるのが次の構成である。

<a id="def-cat1-12-yoneda-embedding"></a>

<!-- formal-statement-start -->
> **定義（Yoneda埋め込み）**
> 小さい圏 $\mathcal C$ に対し、**Yoneda埋め込み** $y:\mathcal C\to[\mathcal C^{\mathrm{op}},\mathbf{Set}]$ は、対象 $A$ と射 $f:A\to B$ をそれぞれ

$$
\begin{aligned}
y(A)&=h^A=\operatorname{Hom}_{\mathcal C}(-,A),\\
y(f)&=h^f:h^A\Rightarrow h^B,\\
(h^f)_X(g)&=f\circ g \quad(g:X\to A)
\end{aligned}
$$

> に送る対応である。これが共変関手をなすことは、自然性と関手公理の確認を含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-12-yoneda-embedding -->
**定義の確認**

**定義の確認：同じ矢印圏。** 上の $\mathcal A$ で Hom 集合を直接列挙すると

| 前層 | $X=0$ での値 | $X=1$ での値 | $u$ に沿う引き戻し |
| --- | --- | --- | --- |
| $y(0)=h^0$ | $\{1_0\}$ | $\varnothing$ | $\varnothing\to\{1_0\}$ |
| $y(1)=h^1$ | $\{u\}$ | $\{1_1\}$ | $1_1\mapsto u$ |

$y(u):h^0\Rightarrow h^1$ の $0$ 成分は $1_0\mapsto u\circ1_0=u$、$1$ 成分は $\varnothing\to\{1_1\}$ という唯一の写像である。自然性を射 $u$ で調べると、両辺とも空集合 $\operatorname{Hom}(1,0)$ から $\operatorname{Hom}(0,1)$ への写像になり一致する。恒等射 $1_0,1_1$ に沿う各前層の作用は恒等写像なので、それらに関する自然性も成立する。したがってこの二対象例で、前層とその間の自然変換という定義の条件を全て直接確認した。
<!-- definition-example-end -->

### 構成が本当に関手になること

任意の $f:A\to B$ に対して $h^f$ が自然であることをまず示す。$u:X\to Y$ と $g:Y\to A$ を取れば、両辺は $h^A(Y)\to h^B(X)$ の写像であり、

$$
\begin{aligned}
(h^B(u)\circ(h^f)_Y)(g)
 &=(f\circ g)\circ u\\
 &=f\circ(g\circ u)\\
 &=((h^f)_X\circ h^A(u))(g).
\end{aligned}
$$

射 $f:A\to B$、$k:B\to D$ に対する関手公理も、各 $X$、$g:X\to A$ で

$$
\begin{aligned}
(h^{1_A})_X(g)&=1_A\circ g=g,\\
(h^k\circ h^f)_X(g)
 &=(h^k)_X(f\circ g)\\
 &=k\circ(f\circ g)=(k\circ f)\circ g
 =(h^{k\circ f})_X(g)
\end{aligned}
$$

と確認できる。したがって $y(1_A)=1_{y(A)}$、$y(k\circ f)=y(k)\circ y(f)$ であり、上の定義は実際に共変関手を与える。

## 3. 射を一つも失わない：充満忠実性

前節の構成は射 $f$ の「全ての合成先での働き」を記録している。では異なる射を区別でき、さらに前層間の自然変換に余計なものが現れないだろうか。これは[充満・忠実の定義](../CAT1-09/index.md#def-cat1-09-fully-faithful)に照らし、各二対象間のHom写像が全単射かを判定する問題である。

<a id="thm-cat1-12-full-faithful"></a>

<!-- formal-statement-start -->
> **定理（Yoneda埋め込みの充満忠実性）**
> 小さい圏 $\mathcal C$ のYoneda埋め込み $y:\mathcal C\to[\mathcal C^{\mathrm{op}},\mathbf{Set}]$ は充満忠実である。すなわち任意の $A,B\in\mathcal C$ に対し

$$
\begin{aligned}
\Phi_{A,B}:\operatorname{Hom}_{\mathcal C}(A,B)
 &\longrightarrow \operatorname{Nat}(h^A,h^B),\\
f&\longmapsto h^f
\end{aligned}
$$

> は全単射である。逆写像は自然変換 $\alpha:h^A\Rightarrow h^B$ を、射 $\alpha_A(1_A):A\to B$ に送る。
<!-- formal-statement-end -->

### 証明の見取り図

[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)で、表現対象を $A$、値を取る前層を $P=h^B$ にする。すると自然変換から $P(A)=\operatorname{Hom}(A,B)$ の元が取り出せる。補題の逆写像の式がまさに $f$ の後合成になっていることを確かめれば、単射と全射を同時に得る。

<!-- proof-start -->
### 証明

小さい圏は局所小であり、$h^B:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ は反変集合値関手だから、[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)の仮定を満たす。そこで $P=h^B$ と代入した評価写像は

$$
\begin{aligned}
\Psi_{A,B}:\operatorname{Nat}(h^A,h^B)
 &\longrightarrow h^B(A)=\operatorname{Hom}_{\mathcal C}(A,B),\\
\alpha&\longmapsto \alpha_A(1_A).
\end{aligned}
$$

まず任意の $f:A\to B$ に対して、$\Phi_{A,B}(f)=h^f$ は前節で自然であると確認した。恒等射で評価すれば

$$
\Psi_{A,B}(\Phi_{A,B}(f))
=(h^f)_A(1_A)=f\circ1_A=f.
$$

逆向きには、任意の $\alpha:h^A\Rightarrow h^B$ を取って $f=\alpha_A(1_A)$ と置く。$g:X\to A$ に関する $\alpha$ の自然性を $g:X\to A$ と $1_A\in h^A(A)$ に適用すると

$$
\begin{aligned}
\alpha_X(g)
 &=\alpha_X(h^A(g)(1_A))\\
 &=h^B(g)(\alpha_A(1_A))\\
 &=f\circ g=(h^f)_X(g).
\end{aligned}
$$

全ての $X,g$ で成分が一致するので $\alpha=h^f=\Phi_{A,B}(\Psi_{A,B}(\alpha))$。二つの写像は互いに逆であり、$\Phi_{A,B}$ は全単射。よって $y$ は充満忠実である。$\square$
<!-- proof-end -->

この証明では「忠実」は $h^f_A(1_A)=f$ により異なる射を見分けること、「充満」は自然変換が必ず $f\circ-$ の形であり新しい射を勝手に作らないことに対応する。対象 $A$ が集合値前層として記述されても、元の射の情報は残っている。

**一対象圏の例。** 群 $G=\{1,s\}$、$s^2=1$ を自己射集合とする小さい一対象圏を考える。ここでは群の積 $fg$ を射の合成 $f\circ g$ と同一視する。$h^*(*)=G$ で、射 $u$ による前層の作用は右合成 $g\mapsto gu$。一方 $y(f)_*(g)=fg$ は左合成である。$(fg)u=f(gu)$ が自然性であり、自然な自己変換は $1$ と $s$ による二種類の左合成に限られる。実際、自然変換 $\alpha$ は $\alpha(g)=\alpha(1)g$ と復元でき、二つの群元と一対一で対応する。

## 4. 対象と同型も復元できる

射を復元できるなら、互いに逆となる二つの自然変換も元の圏の逆射に戻せる。「同じ前層の形で見える」ことは、対象の等号ではなく同型を意味する。

<a id="cor-cat1-12-representable-iso"></a>

<!-- formal-statement-start -->
> **系（表現可能前層の自然同型と表現対象の同型）**
> 小さい圏 $\mathcal C$ の任意の二対象 $A,B$ について、$h^A$ と $h^B$ が自然同型であることと、$A$ と $B$ が同型であることは同値である。
>
> 特に指定された自然同型 $\alpha:h^A\Rightarrow h^B$ に対応する同型射は

$$
f=\alpha_A(1_A):A\to B
$$

> として一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

[充満忠実性](#thm-cat1-12-full-faithful)で自然同型とその逆を二本の射に戻す。合成が恒等自然変換であることを、関手公理と忠実性で元の恒等射へ戻す。

<!-- proof-start -->
### 証明

$\alpha:h^A\Rightarrow h^B$ を自然同型とし、逆を $\beta:h^B\Rightarrow h^A$ とする。[充満忠実性](#thm-cat1-12-full-faithful)により一意な $f:A\to B$、$g:B\to A$ があり、$\alpha=y(f)$、$\beta=y(g)$ である。自然同型の逆の条件と $y$ の関手性から

$$
\begin{aligned}
y(g\circ f)&=y(g)\circ y(f)=\beta\circ\alpha=1_{h^A}=y(1_A),\\
y(f\circ g)&=y(f)\circ y(g)=\alpha\circ\beta=1_{h^B}=y(1_B).
\end{aligned}
$$

$y$ は忠実なので $g\circ f=1_A$、$f\circ g=1_B$。この二式は[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)の条件そのものであり、$f$ は同型射である。

逆に $f:A\to B$ が逆射 $g:B\to A$ を持てば、関手公理により $y(g)y(f)=y(1_A)$、$y(f)y(g)=y(1_B)$ となるから $y(f)$ は自然同型となる。$f$ の一意性は $f=\alpha_A(1_A)$ から従う。$\square$
<!-- proof-end -->

別の形で同じ結論を見るには、[普遍元付き表現対象の一意性](../CAT1-10/index.md#thm-cat1-10-uniqueness)を使ってもよい。ただしこちらで指定しているのは普遍元ではなく自然同型 $\alpha$ であり、それがどの同型射を選ぶかを $1_A$ の像で明示した点が重要である。

## 5. 普遍元は「全ての元を一意に引き戻す元」

前層が **表現可能** であるとは、ある対象 $A$ の $h^A$ と自然同型であることをいう（[反変表現可能性・普遍元の定義](../CAT1-10/index.md#def-cat1-10-contra-representable)）。Yoneda埋め込みの対象像に文字どおり等しい前層だけでなく、その自然同型な前層も含む。ここではYonedaの補題を使って、その判定を「写像の全単射」という手で検査できる式に直す。

<a id="prop-cat1-12-universal-element"></a>

<!-- formal-statement-start -->
> **命題（Yoneda評価による普遍元判定）**
> 小さい圏 $\mathcal C$、反変集合値前層 $P:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$、対象 $A\in\mathcal C$ と元 $x\in P(A)$ に対し、次は同値である。
>
> 1. $x$ に対するYonedaの自然変換 $\alpha^x:h^A\Rightarrow P$ が自然同型である。
> 2. 全ての対象 $X$ と全ての元 $z\in P(X)$ について、$P(f)(x)=z$ を満たす射 $f:X\to A$ がただ一つ存在する。
>
> いずれかが成立するとき、$P$ は $A$ で表現され、$x$ はその反変普遍元である。
<!-- formal-statement-end -->

### 証明の見取り図

[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)の逆写像 $\alpha^x_X(f)=P(f)(x)$ をそのまま使う。自然同型であるための各成分の全単射性を、存在と一意性に分解する。

<!-- proof-start -->
### 証明

補題により任意の $x\in P(A)$ から自然変換 $\alpha^x$ が作れ、その成分は

$$
\alpha^x_X:\operatorname{Hom}_{\mathcal C}(X,A)\longrightarrow P(X),
\qquad f\longmapsto P(f)(x)
$$

である。[自然同型の成分ごとの判定](../CAT1-07/index.md#prop-cat1-07-componentwise-iso)によれば、(1) は全ての $X$ でこの成分が全単射であることと同値。全射とは各 $z\in P(X)$ に $P(f)(x)=z$ となる $f$ が少なくとも一つあること、単射とはそのような $f$ が高々一つであることだから、合わせて(2)と同値になる。(1) の自然同型は[反変表現可能関手の定義](../CAT1-10/index.md#def-cat1-10-contra-representable)による表現そのものであり、(2) は[反変普遍元の定義](../CAT1-10/index.md#def-cat1-10-contra-universal)そのものである。$\square$
<!-- proof-end -->

**直接例：特性写像。** 小さい圏 $\mathcal E$ の対象を $\varnothing$、$1=\{*\}$、$2=\{0,1\}$ の三集合とし、その間の全ての写像を射とする。冪集合の逆像で作る前層 $P(X)=\mathcal P(X)$ を $\mathcal E$ 上に制限する。$A=2$、$x=\{1\}\in P(2)$ とすれば、任意の $X\in\mathcal E$、$S\subseteq X$ に対し

$$
\chi_S(t)=
\begin{cases}
1 & (t\in S),\\
0 & (t\notin S)
\end{cases}
\qquad(t\in X)
$$

という射 $\chi_S:X\to2$ が存在し、$P(\chi_S)(x)=\chi_S^{-1}(\{1\})=S$。逆に $f^{-1}(\{1\})=S$ なら各 $t$ の $f(t)$ はその所属条件から一意に決まるため $f=\chi_S$。$X=\varnothing$ でも唯一の空写像が唯一の部分集合を与える。従って全称存在一意性を全対象で確かめたので、[普遍元判定](#prop-cat1-12-universal-element)から $P\cong h^2$ である。

**逆の例：表現できない前層。** 対象 $a,b$ にそれぞれ恒等射だけがある二対象離散圏 $\mathcal D$ を取る。両対象に一元集合 $\{*\}$ を与える定値前層 $K$ は、射が恒等射だけなので前層公理を満たす。しかし

$$
h^a(b)=\operatorname{Hom}_{\mathcal D}(b,a)=\varnothing,\qquad
h^b(a)=\operatorname{Hom}_{\mathcal D}(a,b)=\varnothing
$$

であり、$K(a),K(b)$ は共に一元集合である。$K$ と $h^a$ は $b$ 成分で、$K$ と $h^b$ は $a$ 成分で全単射になれない。$\mathcal D$ の対象はこの二つだけだから、$K$ は表現可能でない。Yoneda埋め込みは充満忠実だが、**全ての前層が埋め込みの像に入るわけではない**のである。

## 6. 演習：構成・復元・表現可能性

### CAT1-12-A01 後合成の自然性を型から確かめる

- Level: A

小さい圏 $\mathcal C$ の射 $f:A\to B$、$u:X\to Y$、$g:Y\to A$ を取る。$(h^f)_X\circ h^A(u)$ と $h^B(u)\circ(h^f)_Y$ の始域・終域を明記し、$g$ での値が等しいことを示せ。

<!-- solution-start -->
**詳細解答**。$h^A(u):\operatorname{Hom}(Y,A)\to\operatorname{Hom}(X,A)$、$(h^f)_X:\operatorname{Hom}(X,A)\to\operatorname{Hom}(X,B)$ だから第1の合成の型は $\operatorname{Hom}(Y,A)\to\operatorname{Hom}(X,B)$。第2も $(h^f)_Y:\operatorname{Hom}(Y,A)\to\operatorname{Hom}(Y,B)$ と $h^B(u):\operatorname{Hom}(Y,B)\to\operatorname{Hom}(X,B)$ を合成するので同じ型である。値は

$$
\begin{aligned}
((h^f)_X\circ h^A(u))(g)&=f\circ(g\circ u),\\
(h^B(u)\circ(h^f)_Y)(g)&=(f\circ g)\circ u.
\end{aligned}
$$

射の結合則で一致する。任意の $u,g$ に対して成立し、自然性の四角形が可換となる。
<!-- solution-end -->

### CAT1-12-A02 恒等射と合成を保存する

- Level: A

$f:A\to B$、$k:B\to D$ を持つ小さい圏で $y(1_A)=1_{y(A)}$、$y(k\circ f)=y(k)\circ y(f)$ を各成分で確認せよ。

<!-- solution-start -->
**詳細解答**。任意の $X$ と $g:X\to A$ を取る。恒等射の場合、$(h^{1_A})_X(g)=1_A\circ g=g$ なので $h^{1_A}$ は恒等自然変換。合成の場合

$$
(h^k)_X((h^f)_X(g))=k\circ(f\circ g)=(k\circ f)\circ g=(h^{k\circ f})_X(g).
$$

全成分で一致するから、前層圏の射として $h^k\circ h^f=h^{k\circ f}$。従って関手の二公理を満たす。
<!-- solution-end -->

### CAT1-12-A03 矢印圏で二つの表現可能前層を列挙する

- Level: A

対象 $0,1$ と $u:0\to1$ のみを非恒等射として持つ圏 $\mathcal A$ について、$h^0(0)$、$h^0(1)$、$h^1(0)$、$h^1(1)$ を求めよ。$h^1(u)$ の始域・終域と値も書け。

<!-- solution-start -->
**詳細解答**。$0\to0$ の射は $1_0$ だけ、$1\to0$ は存在せず、$0\to1$ は $u$ だけ、$1\to1$ は $1_1$ だけなので

$$
h^0(0)=\{1_0\},\quad h^0(1)=\varnothing,\quad
h^1(0)=\{u\},\quad h^1(1)=\{1_1\}.
$$

反変Hom関手では $u:0\to1$ が写像 $h^1(u):h^1(1)\to h^1(0)$ を定める。従って $h^1(u):\{1_1\}\to\{u\}$ で、$1_1\mapsto1_1\circ u=u$。逆方向に送ると反変性と矛盾する。
<!-- solution-end -->

### CAT1-12-A04 忠実性に必要な評価点

- Level: A

小さい圏 $\mathcal C$ の $f,g:A\to B$ が $h^f=h^g$ を満たすとする。$X=A$、$1_A\in h^A(A)$ で評価することにより $f=g$ を示せ。

<!-- solution-start -->
**詳細解答**。自然変換が等しければ $A$ 成分も等しいので $(h^f)_A(1_A)=(h^g)_A(1_A)$。左辺は $f\circ1_A=f$、右辺は $g\circ1_A=g$。従って $f=g$。この証明はHom写像の単射性、すなわち[忠実性](../CAT1-09/index.md#def-cat1-09-fully-faithful)を直接確認する。
<!-- solution-end -->

### CAT1-12-A05 特性写像による普遍元の検査

- Level: A

対象が $\varnothing,1,2$ で射がその間の全ての写像である小さい圏 $\mathcal E$ を取る。$P(X)=\mathcal P(X)$、$P(f)(U)=f^{-1}(U)$ とし、$x=\{1\}\subseteq2$ と置く。$X=1$ と $X=\varnothing$ の全ての $S\subseteq X$ について、$P(f)(x)=S$ を満たす $f:X\to2$ を列挙し一意性を示せ。

<!-- solution-start -->
**詳細解答**。$X=1=\{*\}$ では写像 $1\to2$ は二つだけである。$f_0(*)=0$ は $f_0^{-1}(\{1\})=\varnothing$ を、$f_1(*)=1$ は $f_1^{-1}(\{1\})=1$ を与える。$1$ の部分集合もこの二つだけだから存在・一意性が成立する。$X=\varnothing$ では $\varnothing\to2$ は空写像ただ一つ、部分集合も $\varnothing$ ただ一つであり、その逆像は $\varnothing$。従ってここでも一意である。$X=2$ の場合も各点の $0/1$ の選択で全ての部分集合を一意に復元できる。
<!-- solution-end -->

### CAT1-12-B01 任意の自然変換を射へ復元する

- Level: B

小さい圏 $\mathcal C$ と $\alpha:h^A\Rightarrow h^B$ を取る。自然性の式を $g:X\to A$ に適用して、$\alpha=h^f$ となる唯一の $f:A\to B$ を構成せよ。ここで $\alpha$ が自然であることを本質的に使う位置を明記せよ。

<!-- solution-start -->
**詳細解答**。$f=\alpha_A(1_A)$ と取ると、$\alpha_A$ の終域は $h^B(A)=\operatorname{Hom}(A,B)$ なので型の合う射である。射 $g:X\to A$ に関する自然性は $h^B(g)\alpha_A=\alpha_Xh^A(g)$。$1_A$ に適用すると

$$
\begin{aligned}
\alpha_X(g)
 &=\alpha_X(1_A\circ g)
 =\alpha_X(h^A(g)(1_A))\\
 &=h^B(g)(\alpha_A(1_A))
 =f\circ g.
\end{aligned}
$$

二行目の中央の等号が自然性の使用位置である。全ての $X,g$ に対して等しいので $\alpha=h^f$。別の $f'$ が同じ自然変換を与えるなら $f'=(h^{f'})_A(1_A)=\alpha_A(1_A)=f$。存在と一意性が示された。
<!-- solution-end -->

### CAT1-12-B02 自然同型から逆射を作る

- Level: B

小さい圏 $\mathcal C$ の $\alpha:h^A\Rightarrow h^B$ と $\beta:h^B\Rightarrow h^A$ が互いに逆の自然変換とする。$f=\alpha_A(1_A)$、$g=\beta_B(1_B)$ が互いに逆の同型射であることを証明せよ。

<!-- solution-start -->
**詳細解答**。[充満忠実性](#thm-cat1-12-full-faithful)による復元式から、$\alpha_X(t)=f\circ t$（$t:X\to A$）および $\beta_X(v)=g\circ v$（$v:X\to B$）。そこで $A$ 成分を $1_A$ で評価すると

$$
1_A=(\beta\circ\alpha)_A(1_A)
=\beta_A(f)=g\circ f.
$$

同じく $B$ 成分を $1_B$ で評価すれば

$$
1_B=(\alpha\circ\beta)_B(1_B)=\alpha_B(g)=f\circ g.
$$

二つの射は型が $f:A\to B$、$g:B\to A$ であり、両側の合成がそれぞれ恒等射なので[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)の互いの逆である。
<!-- solution-end -->

### CAT1-12-B03 普遍元らしく見える元を反証する

- Level: B

第5節の小さい圏 $\mathcal E$ と前層 $P(X)=\mathcal P(X)$ を取る。$A=2$ で $x=\varnothing\in P(2)$ とすると、$x$ は反変普遍元になれないことを、$X=1$ における $f\mapsto P(f)(x)$ の写像の単射性・全射性の両方から判定せよ。$x=\{1\}$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答**。$1\to2$ の写像は $f_0(*)=0$、$f_1(*)=1$ の二つであり、どちらも

$$
P(f_0)(\varnothing)=f_0^{-1}(\varnothing)=\varnothing
=f_1^{-1}(\varnothing)=P(f_1)(\varnothing)
$$

となる。異なる射が同じ部分集合に写るから単射ではない。さらに $P(1)=\{\varnothing,1\}$ の元 $1$ はどの写像の像にも現れないから全射でもない。[Yoneda評価による普遍元判定](#prop-cat1-12-universal-element)により $x=\varnothing$ は普遍元ではない。

一方 $x=\{1\}$ なら二つの射に対し

$$
P(f_0)(\{1\})=\varnothing,\qquad P(f_1)(\{1\})=1
$$

となる。さらに全ての対象 $X\in\{\varnothing,1,2\}$ で特性写像による存在・一意性が成り立つので、こちらは普遍元である。表現対象が同じ $2$ でも選ぶ元によって判定が変わる。
<!-- solution-end -->

### CAT1-12-B04 離散圏の前層を分類する

- Level: B

二対象 $a,b$ と恒等射しか持たない小さい離散圏 $\mathcal D$ について、前層 $P$ を二つの集合 $P(a),P(b)$ で記述せよ。$P$ が表現可能となる必要十分条件を、二つの集合の濃度から求めよ。特に両方が一元集合の前層が表現可能でない理由を示せ。

<!-- solution-start -->
**詳細解答**。非恒等射がないため、前層は二集合 $S=P(a)$、$T=P(b)$ と恒等写像だけで決まる。自然変換も各成分の任意の写像の組であり、自然同型とは両成分が全単射であることをいう。[反変表現可能関手](../CAT1-10/index.md#def-cat1-10-contra-representable)の候補は $h^a$ と $h^b$ のみで、

$$
(h^a(a),h^a(b))=(\{1_a\},\varnothing),\qquad
(h^b(a),h^b(b))=(\varnothing,\{1_b\}).
$$

従って $P$ が表現可能である必要十分条件は $(|S|,|T|)=(1,0)$ または $(0,1)$。十分性は各成分の一意な全単射が恒等射に関して自動的に自然となることによる。$(1,1)$ はどちらの候補とも一方の成分の濃度が異なる。失われるのは全成分の全単射性であり、自然同型に届かない。
<!-- solution-end -->

### CAT1-12-C01 矢印圏の前層を用いて埋め込みの到達範囲を調べる

- Level: C

二対象 $0,1$、非恒等射 $u:0\to1$ を持つ小さい圏 $\mathcal A$ を取る。前層 $P$ を $S=P(0)$、$T=P(1)$、$r=P(u):T\to S$ で表す。

1. $h^0$、$h^1$ に対応する三つ組 $(S,T,r)$ を求め、任意の前層 $P$ が表現可能となる必要十分条件を記せ。
2. $S=\{a,b\}$、$T=\{z\}$、$r(z)=a$ という前層が表現可能でないことを示せ。
3. この $P$ について $\operatorname{Nat}(h^0,P)$、$\operatorname{Nat}(h^1,P)$ を具体的に求め、[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)と照合せよ。
4. $\operatorname{Nat}(h^0,h^1)$ と $\operatorname{Nat}(h^1,h^0)$ を求め、元の圏のHom集合との対応を説明せよ。

<!-- solution-start -->
**詳細解答**。

**1. 表現可能な三つ組。** Hom集合を列挙すると

$$
\begin{aligned}
h^0&=(\{1_0\},\varnothing,\varnothing\to\{1_0\}),\\
h^1&=(\{u\},\{1_1\},1_1\mapsto u).
\end{aligned}
$$

$P\cong h^0$ となるのは $|S|=1$、$T=\varnothing$ の場合である。このとき $r$ は空集合からの唯一の写像であり、成分の全単射は自然になる。$P\cong h^1$ となるのは $|S|=|T|=1$ の場合である。このとき $r$ も一元集合間の唯一の全単射であり、成分の全単射で自然性が成立する。$\mathcal A$ の対象は $0,1$ だけなので、この二種類が必要十分条件になる。

**2. 非表現可能性。** 与えられた $P$ は $|S|=2$、$|T|=1$ なので上のどちらの型にも該当しない。$r$ は指定どおりの写像で、恒等射の作用を恒等写像に取れば反変関手公理は満たされる。前層であることと表現可能であることを混同してはならない。

**3. 自然変換の実計算。** 自然変換 $\alpha:h^0\Rightarrow P$ は、$0$ 成分で $1_0$ を $a$ または $b$ に送る。$1$ 成分は空集合から $T$ への唯一の写像であり、自然性は空集合上の等式となって常に成立する。従って二種類。

自然変換 $\beta:h^1\Rightarrow P$ は、$1$ 成分で $1_1$ を $z$ に送るしかない。射 $u$ に関する自然性は

$$
\beta_0(u)=P(u)(\beta_1(1_1))=r(z)=a
$$

を要求するので、$0$ 成分も一意である。従って一種類。これは

$$
\operatorname{Nat}(h^0,P)\cong P(0)=\{a,b\},\qquad
\operatorname{Nat}(h^1,P)\cong P(1)=\{z\}
$$

という[反変Yonedaの補題](../CAT1-11/index.md#thm-cat1-11-contravariant-yoneda)の評価と一致する。

**4. 元のHomの復元。** $h^0\Rightarrow h^1$ は $0$ 成分で $1_0\mapsto u$、$1$ 成分で空集合からの唯一の写像しかなく、自然変換はただ一つ。一方 $h^1\Rightarrow h^0$ の $1$ 成分には一元集合 $\{1_1\}$ から空集合への写像が必要で、存在しない。従って

$$
\operatorname{Nat}(h^0,h^1)=\{h^u\},\qquad
\operatorname{Nat}(h^1,h^0)=\varnothing.
$$

元の圏でも $\operatorname{Hom}(0,1)=\{u\}$、$\operatorname{Hom}(1,0)=\varnothing$。これらは[充満忠実性](#thm-cat1-12-full-faithful)のHom全単射そのものである。$\square$
<!-- solution-end -->

## 7. ここから極限へ

Yoneda埋め込みによって、小さい圏の対象と射は反変集合値前層として、同型まで忠実に記録できる。ただし前層圏には元の圏の像以外の対象もあり、全ての前層が表現可能とは限らない。次の CAT2-01「図式・錐・極限」では、複数の対象と射からなる図式を一つの普遍性で捉える。そこでの「どの対象からの射も自然に対応する」という考え方を、今回のHom集合の視点から読むことができる。
