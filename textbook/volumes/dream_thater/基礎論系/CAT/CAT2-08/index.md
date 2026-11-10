# CAT2-08 随伴のHom集合による定義

## 1. 射の集合が自然に対応するとは

[圏論の二項積](../CAT2-02/index.md#def-cat2-02-binary-product)は、二本の射 $f:X\to A$, $g:X\to B$ を、ただ一本の射 $\langle f,g\rangle:X\to A\times B$ にまとめる。単なる個数の一致ではない。$X$ から先に写しても、$A,B$ を後から写しても、組を作る操作と両立する。

一方、[モノイドとその準同型](../CAT1-03/index.md#def-cat1-03-monoid-hom)を考えると、集合 $X$ の文字からできる単語を、モノイド $M$ の元へ評価する準同型は、各文字に割り当てる元を決めるだけで一意になる。この二つは「一方の圏のHom集合と、もう一方の圏のHom集合の**自然な全単射**」という同じ形を持つ。

本講の目的は、射の向きと二変数の自然性を明記してこの形を**随伴**として定義し、実際に全単射とその逆を構成することである。次講で単位・余単位と三角恒等式を扱うため、ここではHom集合による定義自体を確実にする。

以下の圏は、特に断らない限り[局所小圏](../CAT1-02/index.md#def-cat1-02-size)とする。したがってHomは集合であり、集合の全単射としての議論ができる。圏全体が小さい必要はない。

## 2. Homの二変数と随伴の定義

既習の[共変・反変Hom関手](../CAT1-06/index.md#def-cat1-06-hom-functors)では一方の変数を固定した。今度は始域の対象 $c$ と終域の対象 $d$ を同時に動かす。射 $u:c'\to c$ は**前合成**によって始域を $c'$ に替え、射 $v:d\to d'$ は**後合成**によって終域を $d'$ に替える。

<a id="def-cat2-08-hom-bifunctor"></a>

<!-- formal-statement-start -->
> **定義（二変数Hom関手）**
> 局所小圏 $\mathcal C$ について、二変数Hom関手は

$$
\operatorname{Hom}_{\mathcal C}(-,-):
\mathcal C^{\mathrm{op}}\times\mathcal C\longrightarrow\mathbf{Set}
$$

> であり、対象 $(c,d)$ に $\operatorname{Hom}_{\mathcal C}(c,d)$ を対応させる。$\mathcal C^{\mathrm{op}}\times\mathcal C$ の射 $(u^{\mathrm{op}},v):(c,d)\to(c',d')$、すなわち $u:c'\to c$ と $v:d\to d'$ に対し

$$
h:c\to d\quad\longmapsto\quad v\circ h\circ u:c'\to d'
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-08-hom-bifunctor -->
**定義の確認**。集合 $c=\{0,1\}$、$c'=\{*\}$、$d=\{a,b\}$、$d'=\{z\}$ とし、$u(*)=1$、$h(0)=a,\ h(1)=b$、$v(a)=v(b)=z$ とする。このとき $vhu(*)=v(h(1))=z$ であり、確かに $c'$ から $d'$ への写像になる。恒等射なら $1_dh1_c=h$。さらに $u':c''\to c'$、$v':d'\to d''$ を続けると

$$
v'\circ(v\circ h\circ u)\circ u'
=(v'\circ v)\circ h\circ(u\circ u'),
$$

なので、二段階の射の作用と合成してからの作用が一致する。これが[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)の検算である。
<!-- definition-example-end -->

二つの圏 $\mathcal C,\mathcal D$ と[関手](../CAT1-06/index.md#def-cat1-06-functor) $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ を固定する。$F$ を先に適用した後の射 $Fc\to d$ と、$G$ を適用する前の射 $c\to Gd$ の対応を探そう。

<a id="def-cat2-08-adjunction"></a>

<!-- formal-statement-start -->
> **定義（随伴と転置）**
> 局所小圏 $\mathcal C,\mathcal D$ と関手 $F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ に対し、任意の $c\in\mathcal C$、$d\in\mathcal D$ について全単射

$$
\Phi_{c,d}:\operatorname{Hom}_{\mathcal D}(Fc,d)
\xrightarrow{\ \cong\ }\operatorname{Hom}_{\mathcal C}(c,Gd)
$$

> が与えられ、任意の $u:c'\to c$、$v:d\to d'$、$h:Fc\to d$ に対して

$$
\boxed{\;
\Phi_{c',d'}(v\circ h\circ F(u))
=G(v)\circ\Phi_{c,d}(h)\circ u
\;}
$$

> が成立するとき、$F$ は $G$ の**左随伴**、$G$ は $F$ の**右随伴**といい、$F\dashv G$ と記す。この全単射を**随伴のHom対応**という。$h$ に対応する $\Phi_{c,d}(h):c\to Gd$ を $h$ の**転置**と呼び、逆対応も転置と呼ぶ。
<!-- formal-statement-end -->

この式では左辺の $F(u):Fc'\to Fc$ に注意する。右辺では $G(v):Gd\to Gd'$ である。$F$ と $G$ の向きを入れ替えてはならない。また「全単射」だけでは随伴にならず、**両変数について自然**であることを要求する。式の左上の $\Phi_{c',d'}$ は移動先のHom集合に作用している。

<!-- definition-example-start: def-cat2-08-adjunction -->
**定義の確認**（集合の積を先に見る）。$\Delta X=(X,X)$ とする対角関手 $\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$、$(A,B)$ を $A\times B$ へ送る積関手 $\Pi:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ を考える。[積圏](../CAT1-05/index.md#def-cat1-05-product)での射は二本組なので、対応候補は

$$
\Phi_{X,(A,B)}(f,g)(x)=(f(x),g(x)),
\qquad
\Phi^{-1}_{X,(A,B)}(h)=(\pi_Ah,\pi_Bh).
$$

射影を取ってから組に戻せば元に戻り、組から射影を取れば各成分は $f,g$ なので、互いに逆である。$u:X'\to X$、$(a,b):(A,B)\to(A',B')$ に対して左辺を $x'\in X'$ で評価すると

$$
\begin{aligned}
\Phi_{X',(A',B')}(a f u,b g u)(x')
&=(a(f(u(x'))),b(g(u(x'))))\\
&=((a\times b)\circ\Phi_{X,(A,B)}(f,g)\circ u)(x').
\end{aligned}
$$

従って**全単射と二変数の自然性という両条件**を満たす。第4節では、この計算を[積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)から一般的に説明する。
<!-- definition-example-end -->

二変数の等式は、二つのより短い等式に分けて検算できる。

<a id="prop-cat2-08-separate-naturality"></a>

<!-- formal-statement-start -->
> **命題（二変数自然性の分解）**
> 上記の各 $\Phi_{c,d}$ が全単射であるとする。二変数自然性が成り立つことと、すべての適切な $u,v,h$ について次の二式がともに成り立つことは同値である。

$$
\begin{aligned}
\Phi_{c',d}(h\circ F(u))&=\Phi_{c,d}(h)\circ u,\\
\Phi_{c,d'}(v\circ h)&=G(v)\circ\Phi_{c,d}(h).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

必要性は他方の射を恒等射とする。十分性は $v\circ h\circ F(u)$ の前合成と後合成を順番に処理する。

<!-- proof-start -->
### 証明

二変数自然性の式で $v=1_d$ とすれば $G(1_d)=1_{Gd}$ だから第一式を得る。$u=1_c$ とすれば $F(1_c)=1_{Fc}$ だから第二式を得る。

逆に二式を仮定し、$u:c'\to c$ と $v:d\to d'$ を任意に取る。まず $h\circ F(u):Fc'\to d$ へ第二式を用い、その結果へ第一式を用いると

$$
\begin{aligned}
\Phi_{c',d'}(v\circ h\circ F(u))
&=G(v)\circ\Phi_{c',d}(h\circ F(u))\\
&=G(v)\circ\Phi_{c,d}(h)\circ u.
\end{aligned}
$$

これは要求する二変数自然性である。$\square$
<!-- proof-end -->

## 3. 自由モノイドは忘却関手の左随伴

[忘却関手](../CAT1-06/index.md#def-cat1-06-functor) $U:\mathbf{Mon}\to\mathbf{Set}$ は、モノイドの演算を忘れ、台集合だけを残す。これに対して、集合 $X$ に**有限長の単語すべて**からなるモノイド $W(X)$ を対応させる。文字は $X$ の元、空語は $\varepsilon$、演算は単語の連結である。空語が単位元となり、連結の結合律は文字列の順序を変えずに区切り位置だけを変えることから成り立つ。

写像 $u:X\to Y$ に対して $W(u)$ は単語 $(x_1,\dots,x_n)$ を $(u(x_1),\dots,u(x_n))$ へ送る。空語を空語に送り、連結を保ち、$W(1_X)=1_{W(X)}$ と $W(vu)=W(v)W(u)$ が各文字で成り立つ。従って $W:\mathbf{Set}\to\mathbf{Mon}$ は関手である。

<a id="thm-cat2-08-free-monoid"></a>

<!-- formal-statement-start -->
> **定理（自由モノイドと忘却関手の随伴）**
> $\mathbf{Mon}$ を単位元を保つモノイド準同型の圏とし、$U:\mathbf{Mon}\to\mathbf{Set}$ を忘却関手とする。有限語の関手 $W:\mathbf{Set}\to\mathbf{Mon}$ には、各集合 $X$ と各モノイド $M$ について二変数自然な全単射

$$
\operatorname{Hom}_{\mathbf{Mon}}(W(X),M)
\cong\operatorname{Hom}_{\mathbf{Set}}(X,U(M))
$$

> が存在する。従って $W\dashv U$ である。
<!-- formal-statement-end -->

### 証明の見取り図

準同型から各一文字の像を取り出し、逆に各文字の指定値を左から順に掛け合わせて単語を評価する。全単射だけでなく、**文字の置換とモノイド準同型による後合成**の両方を検算する。

<!-- proof-start -->
### 証明

$\iota_X:X\to U(W(X))$ を $x\mapsto(x)$ とする。一つ目の写像を

$$
\Phi_{X,M}(h)=U(h)\circ\iota_X,\qquad h:W(X)\to M
$$

と定める。逆候補は、任意の集合写像 $f:X\to U(M)$ から

$$
\widehat f(\varepsilon)=e_M,\qquad
\widehat f(x_1,\ldots,x_n)=f(x_1)\cdots f(x_n)
$$

で定める。空語と連結語 $ww'$ に対して

$$
\widehat f(ww')=\widehat f(w)\widehat f(w')
$$

であるから $\widehat f$ はモノイド準同型である。$\Phi(\widehat f)(x)=\widehat f((x))=f(x)$。逆向きに準同型 $h$ について

$$
h((x_1,\ldots,x_n))
=h((x_1))\cdots h((x_n))
=\widehat{\Phi(h)}((x_1,\ldots,x_n))
$$

となり、空語の像も双方 $e_M$ なので $h=\widehat{\Phi(h)}$。これで全単射が分かった。

次に $u:X'\to X$、$k:M\to N$ をそれぞれ集合写像とモノイド準同型とする。任意の $h:W(X)\to M$、$x'\in X'$ に対し

$$
\begin{aligned}
\Phi_{X',N}(k\circ h\circ W(u))(x')
&=k(h((u(x'))))\\
&=(U(k)\circ\Phi_{X,M}(h)\circ u)(x').
\end{aligned}
$$

従って[随伴の定義](#def-cat2-08-adjunction)の二変数自然性を満たす。$\square$
<!-- proof-end -->

**実際の計算。** $X=\{a,b\}$、$M=(\mathbb N,+,0)$ とし、$f(a)=2,\ f(b)=3$ とする。対応する準同型は

$$
\widehat f((a,b,b,a))=2+3+3+2=10,\qquad
\widehat f(\varepsilon)=0.
$$

ここでは単語の評価が一意であることに意味がある。文字 $a,b$ の像を与えた後で、長い単語の像を自由に変更する余地はない。

## 4. 積・余積の普遍性も随伴

先の[定義例](#def-cat2-08-adjunction)に戻る。対角関手 $\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$ は $X\mapsto(X,X)$、$u\mapsto(u,u)$ とする。積関手 $\Pi$ は $(A,B)\mapsto A\times B$、$(a,b)\mapsto a\times b$ とする。$\Pi$ の関手性は、集合の元 $(x,y)$ に適用して恒等と合成を検算でき、また[積への射の合成則](../CAT2-02/index.md#prop-cat2-02-product-map)からも従う。

<a id="thm-cat2-08-diagonal-product"></a>

<!-- formal-statement-start -->
> **定理（対角関手と積関手の随伴）**
> 集合の圏で $\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$、$\Pi:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ を上の関手とする。このとき

$$
\Delta\dashv\Pi,\qquad
\operatorname{Hom}_{\mathbf{Set}\times\mathbf{Set}}((X,X),(A,B))
\cong\operatorname{Hom}_{\mathbf{Set}}(X,A\times B)
$$

> が二変数自然に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

左側は射の組 $(f,g)$ である。[積の射影と組の一意性](../CAT2-02/index.md#prop-cat2-02-pairing-laws)が全単射を与える。自然性には前合成 $u$ と後合成 $(a,b)$ を両方入れる。

<!-- proof-start -->
### 証明

$(f,g)$ を $\langle f,g\rangle$ へ送り、$h:X\to A\times B$ を $(\pi_Ah,\pi_Bh)$ へ戻す。積の普遍性により

$$
\pi_A\langle f,g\rangle=f,\quad
\pi_B\langle f,g\rangle=g,\quad
\langle\pi_Ah,\pi_Bh\rangle=h.
$$

ゆえに両写像は逆である。$u:X'\to X$、$a:A\to A'$、$b:B\to B'$ とすると、積への射の一意性により

$$
\langle a f u,b g u\rangle=(a\times b)\langle f,g\rangle u,
$$

なぜなら右辺の第一射影は $afu$、第二射影は $bgu$ であるからである。これは[二変数自然性](#def-cat2-08-adjunction)そのものである。$\square$
<!-- proof-end -->

今度は[余積](../CAT2-05/index.md#def-cat2-05-coproduct) $A\sqcup B$ を用いる。$\Sigma(A,B)=A\sqcup B$、$\Sigma(a,b)$ はタグ $(0,x)$ を $(0,a(x))$、$(1,y)$ を $(1,b(y))$ へ写す。タグを保つので合成と恒等を保存する関手である。

<a id="thm-cat2-08-coproduct-diagonal"></a>

<!-- formal-statement-start -->
> **定理（余積関手と対角関手の随伴）**
> $\Sigma:\mathbf{Set}\times\mathbf{Set}\to\mathbf{Set}$ をタグ付き非交和による余積関手、$\Delta$ を対角関手とする。このとき

$$
\Sigma\dashv\Delta,\qquad
\operatorname{Hom}_{\mathbf{Set}}(A\sqcup B,X)
\cong\operatorname{Hom}_{\mathbf{Set}\times\mathbf{Set}}((A,B),(X,X))
$$

> が二変数自然に成立する。
<!-- formal-statement-end -->

### 証明の見取り図

余積からの写像は、二つの包含に制限すると二本の射になる。逆は二本の写像をタグに従って場合分けして貼る。

<!-- proof-start -->
### 証明

包含 $i_A:A\to A\sqcup B$、$i_B:B\to A\sqcup B$ を用い、$h:A\sqcup B\to X$ を $(hi_A,hi_B)$ へ送る。逆に $(f:A\to X,g:B\to X)$ から $[f,g](0,a)=f(a)$、$[f,g](1,b)=g(b)$ とする。両者を合成すれば各タグで元の写像に戻り、[余積の普遍性](../CAT2-05/index.md#def-cat2-05-coproduct)によって一意でもある。

$(a,b):(A',B')\to(A,B)$ と $u:X\to X'$ を取る。任意の $h:A\sqcup B\to X$ について

$$
\begin{aligned}
(u h\Sigma(a,b))i_{A'}&=u h i_A a,\\
(u h\Sigma(a,b))i_{B'}&=u h i_B b.
\end{aligned}
$$

従って

$$
\Phi_{(A',B'),X'}(u h\Sigma(a,b))
=(u,u)\circ(hi_A,hi_B)\circ(a,b),
$$

となり、二変数自然性が成立する。$\square$
<!-- proof-end -->

こうして集合では $\Sigma\dashv\Delta\dashv\Pi$ が成立する。**左随伴と右随伴という言葉は、どちらのHomに $F$ が現れるかで決まる**。同じ $\Delta$ が、一方では右随伴、他方では左随伴になる。

## 5. 半順序圏では不等式になる

[半順序を圏と見る方法](../CAT1-02/index.md#prop-cat1-02-order-category)では、$p\le q$ のときだけ一本の射 $p\to q$ がある。Hom集合は空集合か一元集合だから、全単射が存在するかは**射の存在条件が一致するか**だけで判定できる。

<a id="thm-cat2-08-poset"></a>

<!-- formal-statement-start -->
> **定理（半順序圏の随伴判定）**
> 半順序集合 $P,Q$ をそれぞれ圏とみなし、順序を保つ写像 $F:P\to Q$、$G:Q\to P$ を関手とする。このとき $F\dashv G$ であるための必要十分条件は、任意の $p\in P,q\in Q$ について

$$
F(p)\le_Q q\quad\Longleftrightarrow\quad p\le_P G(q)
$$

> が成り立つことである。
<!-- formal-statement-end -->

### 証明の見取り図

どちらかのHomが空で、他方が一元なら全単射は存在しない。両方が空、または両方が一元なら対応はただ一つで、自然性に選択の余地がない。

<!-- proof-start -->
### 証明

$\operatorname{Hom}_Q(Fp,q)$ は $Fp\le q$ のとき一元集合、それ以外で空集合である。同様に $\operatorname{Hom}_P(p,Gq)$ は $p\le Gq$ のとき一元集合、それ以外で空集合である。従って全ての組で全単射が存在することと表示された同値条件は同じである。

条件が成立するとき各 $\Phi_{p,q}$ は空集合どうしの唯一の写像、または一元集合どうしの唯一の写像とする。$p'\le p$、$q\le q'$ のとき、同時自然性の両辺は、射が存在する場合には同じ一元Homの唯一の元である。射が存在しない場合はチェックすべき $h$ 自体がない。従って自然性も成立する。$\square$
<!-- proof-end -->

**直接例。** 包含 $I:\mathbb Z\hookrightarrow\mathbb R$ を通常の大小関係の圏の関手とする。任意の整数 $n$ と実数 $x$ について

$$
I(n)\le x\quad\Longleftrightarrow\quad n\le\lfloor x\rfloor
$$

なので $I\dashv\lfloor-\rfloor$ である。床関数は単調だから関手になる。他方

$$
\lceil x\rceil\le n\quad\Longleftrightarrow\quad x\le I(n)
$$

だから $\lceil-\rceil\dashv I$ も成立する。実数 $2.4$ では床は $2$、天井は $3$ となり、**左右を入れ替えれば同じ関手になるわけではない**。

## 6. 随伴が存在すれば右側はどこまで決まるか

全単射の式だけを眺めると、異なる右随伴を選べるのではないかと感じる。しかし、右随伴は[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)を除いて一意になる。証明では「Homに作用する自然な写像は、対象間の射との合成で書ける」ということを直接計算する。

<a id="thm-cat2-08-right-unique"></a>

<!-- formal-statement-start -->
> **定理（右随伴の自然同型一意性）**
> 局所小圏 $\mathcal C,\mathcal D$ について、同じ $F:\mathcal C\to\mathcal D$ に対して随伴 $F\dashv G$ と $F\dashv G'$ が与えられたとする。この二つのHom対応は、$G$ と $G'$ の間に自然同型 $t:G\Rightarrow G'$ を一意に定め、各 $c,d$ と $h:Fc\to d$ について

$$
\Phi'_{c,d}(h)=t_d\circ\Phi_{c,d}(h)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi'\Phi^{-1}$ は $\operatorname{Hom}(c,Gd)$ から $\operatorname{Hom}(c,G'd)$ への自然な全単射である。$c=Gd$ として恒等射を入力すると $t_d$ が得られる。その逆と、$d$ に関する自然性を検算する。

<!-- proof-start -->
### 証明

各 $d$ について

$$
\alpha^d_c=\Phi'_{c,d}\circ\Phi_{c,d}^{-1}:
\operatorname{Hom}_{\mathcal C}(c,Gd)\longrightarrow
\operatorname{Hom}_{\mathcal C}(c,G'd)
$$

と置く。二つの随伴の $c$ に関する自然性から、$u:c'\to c$、$f:c\to Gd$ について

$$
\alpha^d_{c'}(f\circ u)=\alpha^d_c(f)\circ u.
$$

$t_d:=\alpha^d_{Gd}(1_{Gd}):Gd\to G'd$ と定め、$u=f:c\to Gd$、$f=1_{Gd}$ を代入すると

$$
\alpha^d_c(f)=\alpha^d_{Gd}(1_{Gd})\circ f=t_d\circ f.
$$

逆の全単射 $(\alpha^d_c)^{-1}$ にも同じ議論を適用し、$s_d:G'd\to Gd$ を得る。任意の $f:c\to Gd$ に対し $s_dt_df=f$ だから、$c=Gd,\ f=1_{Gd}$ とすれば $s_dt_d=1_{Gd}$。逆向きも $t_ds_d=1_{G'd}$ で、$t_d$ は同型射である。

さらに $v:d\to d'$ について両随伴の第二変数での自然性を合成すれば、任意の $f:c\to Gd$ に対し

$$
\alpha^{d'}_c(G(v)f)=G'(v)\alpha^d_c(f).
$$

先ほどの表示を代入すると

$$
t_{d'}G(v)f=G'(v)t_df.
$$

$c=Gd,\ f=1_{Gd}$ と取って $t_{d'}G(v)=G'(v)t_d$、すなわち $t$ の自然性が得られる。要求する式は $\alpha^d_c(f)=t_df$ を $f=\Phi_{c,d}(h)$ に適用したもの。一意性は $c=Gd,\ f=1_{Gd}$ を代入すれば直ちに従う。$\square$
<!-- proof-end -->

**存在しない例。** $\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$ の右随伴を第一射影 $\pi_1$ と仮定すると、$\operatorname{Hom}((X,X),(A,B))$ と $\operatorname{Hom}(X,A)$ が全単射でなければならない。$X=A=\{*\}$、$B=\{0,1\}$ とすると左辺は二元集合、右辺は一元集合である。自然性以前に全単射が存在しない。積関手を第一射影へ置き換えると、第二成分への射を記憶できなくなることが失敗の機構である。

## 7. 演習

### 問題1：Homの向き

- Level: A

$F:\mathcal C\to\mathcal D$、$G:\mathcal D\to\mathcal C$ とする。$u:c'\to c$、$v:d\to d'$、$h:Fc\to d$ のとき、次の四つの射の始域・終域をすべて書け。

1. $F(u)$
2. $v\circ h\circ F(u)$
3. $\Phi_{c,d}(h)$
4. $G(v)\circ\Phi_{c,d}(h)\circ u$

<!-- solution-start -->
**詳細解答。** $F$ は共変関手なので $F(u):Fc'\to Fc$。続けて $h:Fc\to d$、$v:d\to d'$ と合成するから $vhF(u):Fc'\to d'$。随伴の定義で $\Phi_{c,d}(h):c\to Gd$。右辺では $u:c'\to c$ を先に、$G(v):Gd\to Gd'$ を後に合成するから $G(v)\Phi_{c,d}(h)u:c'\to Gd'$。二つの辺はそれぞれ $\Phi_{c',d'}$ の入力・出力と型が一致する。$\square$
<!-- solution-end -->

### 問題2：自由語の評価

- Level: A

$X=\{a,b\}$、$M=(\mathbb Z,+,0)$、$f(a)=-1$、$f(b)=4$ とする。$f$ の転置に対応する準同型 $\widehat f:W(X)\to M$ について、$\varepsilon$、$(a,b,a,b,b)$、$(b,b)$ の像を求め、最後の二つの単語を連結した像を二通りで計算せよ。

<!-- solution-start -->
**詳細解答。** [自由モノイドのHom対応](#thm-cat2-08-free-monoid)より空語は単位元 $0$ へ写る。

$$
\widehat f(a,b,a,b,b)=-1+4-1+4+4=10,\qquad
\widehat f(b,b)=4+4=8.
$$

連結語は $(a,b,a,b,b,b,b)$ であり、各文字の値を足すと $-1+4-1+4+4+4+4=18$。一方、準同型性から $\widehat f(ww')=\widehat f(w)+\widehat f(w')=10+8=18$ となる。$\square$
<!-- solution-end -->

### 問題3：積の転置

- Level: A

$X=\{0,1\}$、$A=\{a,b\}$、$B=\{\alpha,\beta\}$ とする。$f(0)=a,f(1)=b$、$g(0)=\beta,g(1)=\alpha$ に対応する $h:X\to A\times B$ を書き、二つの射影との合成を確認せよ。さらに $u:\{*\}\to X$ が $u(*)=1$ のとき、$h\circ u$ はどの射の組の転置か。

<!-- solution-start -->
**詳細解答。** [対角と積の随伴](#thm-cat2-08-diagonal-product)より

$$
h(0)=(a,\beta),\qquad h(1)=(b,\alpha).
$$

第一射影で $(a,b)$、第二射影で $(\beta,\alpha)$ を得るから $\pi_Ah=f,\ \pi_Bh=g$。$hu(*)=(b,\alpha)$ であり、$(fu,gu)$ の転置である。これは第一変数の自然性 $\Phi(fu,gu)=\Phi(f,g)u$ の直接確認となる。$\square$
<!-- solution-end -->

### 問題4：床関数と天井関数

- Level: A

通常の順序を持つ $\mathbb Z,\mathbb R$ を圏とみなす。$x=-1.3$ のとき、$n=-2,-1,0$ の各整数について $n\le x$ と $n\le\lfloor x\rfloor$ の真偽を比べよ。また $\lceil x\rceil\le n$ と $x\le n$ の真偽を比べよ。

<!-- solution-start -->
**詳細解答。** $\lfloor-1.3\rfloor=-2$、$\lceil-1.3\rceil=-1$。最初の二条件は $n=-2$ で真、$n=-1,0$ で偽である。次の二条件は $n=-2$ で偽、$n=-1,0$ で真である。[半順序圏の随伴判定](#thm-cat2-08-poset)の二つの同値式が、この三点で一致することを確認できる。これは例の検算であって、全ての実数と整数についての証明は、床を「$x$ 以下の最大の整数」、天井を「$x$ 以上の最小の整数」と定義する性質による。$\square$
<!-- solution-end -->

### 問題5：全単射が存在しない

- Level: A

$\Delta:\mathbf{Set}\to\mathbf{Set}\times\mathbf{Set}$ と第一射影 $\pi_1$ について、$X=\{*\}$、$A=\{0,1\}$、$B=\{p,q,r\}$ としたとき、$\operatorname{Hom}(\Delta X,(A,B))$ と $\operatorname{Hom}(X,\pi_1(A,B))$ の濃度を計算し、$\Delta\dashv\pi_1$ が成り立たない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 左辺の射は $\{*\}\to A$ と $\{*\}\to B$ の組であるから、$A$ の二つの選択と $B$ の三つの選択で $2\cdot3=6$ 通り。右辺は $\{*\}\to A$ の写像だけなので $2$ 通り。$6\ne2$ であり、[随伴の定義](#def-cat2-08-adjunction)が要求する全単射がこの対象の組ですでに存在しない。$\pi_1$ は $B$ への写像の選択を忘れてしまう。$\square$
<!-- solution-end -->

### 問題6：自由モノイドの二変数自然性

- Level: B

集合写像 $u:X'\to X$ とモノイド準同型 $k:M\to N$、写像 $f:X\to U(M)$ を取る。次の二つの単語評価準同型が一致することを、空語と任意の非空語の両方で示せ。

$$
k\circ\widehat f\circ W(u)
\quad\text{と}\quad
\widehat{\,U(k)\circ f\circ u\,}.
$$

<!-- solution-start -->
**詳細解答。** 空語では前者が $k(\widehat f(\varepsilon))=k(e_M)=e_N$、後者も $e_N$ である。任意の $w=(x'_1,\dots,x'_n)\in W(X')$ では

$$
\begin{aligned}
(k\widehat f W(u))(w)
&=k\bigl(f(u(x'_1))\cdots f(u(x'_n))\bigr)\\
&=k(f(u(x'_1)))\cdots k(f(u(x'_n)))\\
&=\widehat{\,U(k)fu\,}(w).
\end{aligned}
$$

第二等号に $k$ が積を保つ仮定を使った。従って準同型は全ての単語で一致する。[自由モノイドと忘却関手の随伴](#thm-cat2-08-free-monoid)の第一変数と第二変数の自然性を同時に確かめた式である。$\square$
<!-- solution-end -->

### 問題7：余積からの射と積への射

- Level: B

集合 $A,B,X$ について、二本の写像 $f:A\to X,\ g:B\to X$ から $[f,g]:A\sqcup B\to X$ を構成し、$[f,g]i_A=f$、$[f,g]i_B=g$ と一意性を直接証明せよ。次に $p:X\to A,\ q:X\to B$ の場合の $\langle p,q\rangle:X\to A\times B$ と比較し、**どちらの関手が左随伴か**を答えよ。

<!-- solution-start -->
**詳細解答。** [タグ付き余積](../CAT2-05/index.md#def-cat2-05-coproduct)で $A\sqcup B=\{(0,a):a\in A\}\cup\{(1,b):b\in B\}$ とする。$[f,g](0,a)=f(a)$、$[f,g](1,b)=g(b)$ と定義すると二つのタグは交わらないのでwell-definedであり、$[f,g]i_A(a)=f(a)$、$[f,g]i_B(b)=g(b)$。別の $h$ がこの二式を満たせば各 $(0,a),(1,b)$ 上で $h$ の値が固定され、$h=[f,g]$。従って

$$
\operatorname{Hom}(A\sqcup B,X)
\cong\operatorname{Hom}(A,X)\times\operatorname{Hom}(B,X).
$$

他方、$x\mapsto(p(x),q(x))$ は射影で $p,q$ を回収できる一意の写像なので

$$
\operatorname{Hom}(X,A\times B)
\cong\operatorname{Hom}(X,A)\times\operatorname{Hom}(X,B).
$$

前者では $\Sigma$ が左随伴、$\Delta$ が右随伴（$\Sigma\dashv\Delta$）。後者では $\Delta$ が左随伴、$\Pi$ が右随伴（$\Delta\dashv\Pi$）。両者の二変数自然性はそれぞれ[余積の場合](#thm-cat2-08-coproduct-diagonal)と[積の場合](#thm-cat2-08-diagonal-product)で証明されている。$\square$
<!-- solution-end -->

### 問題8：随伴を合成する

- Level: B

局所小圏の関手 $F:\mathcal A\to\mathcal B$、$G:\mathcal B\to\mathcal A$、$F':\mathcal B\to\mathcal E$、$G':\mathcal E\to\mathcal B$ が $F\dashv G$、$F'\dashv G'$ を満たすとする。$F'F\dashv GG'$ をHom集合の全単射を具体的に与えて証明せよ。二変数自然性は合成の各段階で型を確認すること。

<!-- solution-start -->
**詳細解答。** $a\in\mathcal A,e\in\mathcal E$ に対し、第一の全単射を $\Phi$、第二を $\Psi$ として

$$
\operatorname{Hom}_{\mathcal E}(F'Fa,e)
\xrightarrow{\ \Psi_{Fa,e}\ }
\operatorname{Hom}_{\mathcal B}(Fa,G'e)
\xrightarrow{\ \Phi_{a,G'e}\ }
\operatorname{Hom}_{\mathcal A}(a,GG'e)
$$

を合成する。両方が全単射なので合成も全単射である。$u:a'\to a$、$v:e\to e'$、$h:F'Fa\to e$ に対し、まず $\Psi$ の自然性で

$$
\Psi_{Fa',e'}(v h F'F(u))
=G'(v)\,\Psi_{Fa,e}(h)\,F(u).
$$

次に $\Phi$ の自然性を用いる（$\mathcal B$ の射 $G'(v):G'e\to G'e'$ と $\mathcal A$ の射 $u$ が入力になる）。

$$
\begin{aligned}
\Phi_{a',G'e'}\!\left(G'(v)\,\Psi_{Fa,e}(h)\,F(u)\right)
&=G(G'(v))\,\Phi_{a,G'e}(\Psi_{Fa,e}(h))\,u\\
&=(GG')(v)\,(\Phi\Psi)_{a,e}(h)\,u.
\end{aligned}
$$

これは $F'F:\mathcal A\to\mathcal E$ と $GG':\mathcal E\to\mathcal A$ の随伴の自然性そのもの。$\square$
<!-- solution-end -->

### 問題9：像・逆像・全称像の三つ組

- Level: C

集合写像 $f:X\to Y$ に対して、べき集合を包含順序の圏とみなす。$A\subseteq X$、$B\subseteq Y$ について

$$
\exists_f(A)=\{f(x):x\in A\},\qquad
f^{-1}(B)=\{x\in X:f(x)\in B\},
$$

$$
\forall_f(A)=\{y\in Y:f^{-1}(\{y\})\subseteq A\}
$$

と定める。

1. 三つの写像が包含を保存し、関手であることを示せ。
2. $\exists_f\dashv f^{-1}$ と $f^{-1}\dashv\forall_f$ を、二つの包含同値式から証明せよ。
3. $X=\{a,b\}$、$Y=\{0,1\}$、$f(a)=f(b)=0$、$A=\{a\}$ のとき $\exists_f(A)$ と $\forall_f(A)$ を計算し、像に現れない $1$ の扱いを説明せよ。

<!-- solution-start -->
**詳細解答。**

**（1）関手性。** $A\subseteq A'$ なら、$f(A)$ の各元 $f(x)$ は $x\in A'$ でもあるので $\exists_f(A)\subseteq\exists_f(A')$。$B\subseteq B'$ なら、$f(x)\in B$ は $f(x)\in B'$ を含意し、$f^{-1}(B)\subseteq f^{-1}(B')$。最後に $A\subseteq A'$ なら、$f^{-1}(\{y\})\subseteq A$ を満たす $y$ は $f^{-1}(\{y\})\subseteq A'$ も満たすので $\forall_f(A)\subseteq\forall_f(A')$。半順序圏で順序を保つ写像は恒等射と合成（推移関係）を保存するから、三つとも関手である。

**（2）二つの随伴。** まず

$$
\begin{aligned}
\exists_f(A)\subseteq B
&\Longleftrightarrow(\forall x\in A)\ f(x)\in B\\
&\Longleftrightarrow(\forall x\in A)\ x\in f^{-1}(B)\\
&\Longleftrightarrow A\subseteq f^{-1}(B).
\end{aligned}
$$

従って[半順序圏の随伴判定](#thm-cat2-08-poset)により $\exists_f\dashv f^{-1}$。次に

$$
\begin{aligned}
f^{-1}(B)\subseteq A
&\Longleftrightarrow(\forall y\in B)\ f^{-1}(\{y\})\subseteq A\\
&\Longleftrightarrow B\subseteq\forall_f(A).
\end{aligned}
$$

第一の同値は $f^{-1}(B)=\bigcup_{y\in B}f^{-1}(\{y\})$ を使う。よって $f^{-1}\dashv\forall_f$。どちらもHomが空か一元かで決まるため、自然性もこの判定定理に含まれている。

**（3）空の逆像の役割。** $\exists_f(\{a\})=\{0\}$。$f^{-1}(\{0\})=\{a,b\}$ は $\{a\}$ に含まれないから $0\notin\forall_f(A)$。一方 $f^{-1}(\{1\})=\varnothing$ は $\{a\}$ に含まれるから $1\in\forall_f(A)$。従って $\forall_f(A)=\{1\}$。全称像は「その $y$ の**すべての**原像が $A$ に入る」条件なので、原像を持たない $y$ は空集合に対する全称命題が真であることにより含まれる。$\square$
<!-- solution-end -->

## 8. 次講への準備

ここまでの随伴は $\Phi_{c,d}$ という二変数自然なHom集合の全単射として定義した。次の**CAT2-09「単位・余単位と三角恒等式」**では、恒等射 $1_{Fc}$ と $1_{Gd}$ を転置することから自然変換を構成し、それらの三角恒等式とHom全単射との両方向の同値を証明する。
