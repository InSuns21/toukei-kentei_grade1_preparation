# CAT1-05 部分圏・積圏・スライス圏

## 1. 圏から新しい圏を作る三つの方法

[圏の定義](../CAT1-01/index.md#def-cat1-01-category)では、対象・射・恒等射・合成を与え、結合則と単位律を確かめた。前講では[反対圏](../CAT1-04/index.md#def-cat1-04-opposite)を作り、射の向きと合成順序を同時に反転した。今回は異なる三つの操作を考える。

1. **制限する**：一部の対象と射だけを残す。ただし合成が途中で欠けてはならない。
2. **組にする**：二つの圏の対象・射を対にし、二成分を同時に合成する。
3. **基準への射を固定する**：一つの対象 $S$ へ向かう射を新しい対象とみなし、$S$ への行き方を変えない射だけを認める。

三つとも「対象の候補を列挙した」だけでは圏にならない。**射の始域・終域、合成の閉性、結合則、単位律**を一つずつ確認することが本講の中心である。後の関手・自然変換・極限を理解するための具体的な構成になる。

## 2. 部分圏：対象や射をどこまで減らせるか

三点の順序 $0<1<2$ からなる[半順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)では、射 $0\to1$, $1\to2$ とその合成 $0\to2$ がある。最初の二本だけを残し、三本目を取り除いたらどうなるだろうか。二本を合成した結果が射の集まりから消えるので、圏の公理を満たさない。対象や射を制限する際には、この落とし穴を避けたい。

元の圏 $\mathcal C$ の対象をいくつか選び、その間の射も選ぶ。選んだ射は元の圏と同じ仕方で合成し、各選んだ対象の恒等射も元のものを使う。具体的には、恒等射の保持と合成の閉性が必要になる。さらに「選んだ対象間の射をすべて残す」場合と「対象をすべて残す」場合を区別する。

<a id="def-cat1-05-subcategory"></a>

<!-- formal-statement-start -->
> **定義（部分圏・充満部分圏・広い部分圏）**  
> 圏 $\mathcal C$ の**部分圏** $\mathcal D$ とは、次の条件を満たし、恒等射と合成を $\mathcal C$ から制限した圏をいう。
>
> **（S1）対象**。$\operatorname{Ob}(\mathcal D)\subseteq\operatorname{Ob}(\mathcal C)$。
>
> **（S2）射**。$A,B\in\operatorname{Ob}(\mathcal D)$ なら

$$
\operatorname{Hom}_{\mathcal D}(A,B)
\subseteq\operatorname{Hom}_{\mathcal C}(A,B).
$$

> **（S3）恒等射**。すべての $A\in\operatorname{Ob}(\mathcal D)$ について $1_A\in\operatorname{Hom}_{\mathcal D}(A,A)$。
>
> **（S4）合成の閉性**。$f\in\operatorname{Hom}_{\mathcal D}(A,B)$ と $g\in\operatorname{Hom}_{\mathcal D}(B,E)$ なら $g\circ_{\mathcal C}f\in\operatorname{Hom}_{\mathcal D}(A,E)$。
>
> さらに、選んだ任意の二対象間のすべての射を残す、すなわち全 $A,B\in\operatorname{Ob}(\mathcal D)$ について

$$
\operatorname{Hom}_{\mathcal D}(A,B)=\operatorname{Hom}_{\mathcal C}(A,B)
$$

> なら**充満部分圏**という。$\operatorname{Ob}(\mathcal D)=\operatorname{Ob}(\mathcal C)$ なら**広い部分圏**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-05-subcategory -->
**定義の確認**（三点鎖）。$\mathcal C$ を $0<1<2$ の半順序圏とする。

- 対象 $\{0,2\}$ を選んで、その間の射を元の圏からすべて残すと、恒等射 $1_0,1_2$ と $a:0\to2$ がある。対象は元の対象の一部で、選んだ各Homも元のHomに含まれるので（S1）（S2）を満たす。$1_0,1_2$ を残したので（S3）も満たす。$a$ の前後で合成できるのは恒等射だけだから（S4）の閉性が成り立つ。すべてのHomを残したので充満部分圏である。
- 対象 $\{0,1,2\}$ をすべて残し、射を恒等射と $a:0\to2$ だけにすると、（S1）（S2）は同様に成立し、すべての恒等射を含むので（S3）も成立する。非恒等射 $a$ 同士は合成できず、合成は恒等射とのものだけで閉じるため（S4）も満たす。広い部分圏だが、元の $0\to1$ を欠くので充満ではない。
- 対象をすべて残し、恒等射と $0\to1$, $1\to2$ だけを選ぶのは失敗する。二本の合成 $0\to2$ が（S4）に反するからである。
<!-- definition-example-end -->

<a id="prop-cat1-05-subcategory-construction"></a>

<!-- formal-statement-start -->
> **命題（部分圏の構成と充満部分圏）**  
> 圏 $\mathcal C$ の対象・Homの部分集合の選択が上記（S1）〜（S4）を満たすなら、$\mathcal C$ の恒等射と合成の制限は圏 $\mathcal D$ を定める。また、任意の対象の部分集まり $\mathcal A\subseteq\operatorname{Ob}(\mathcal C)$ に対し、対象を $\mathcal A$ とし、任意の $A,B\in\mathcal A$ のHomを $\operatorname{Hom}_{\mathcal C}(A,B)$ とする構成は充満部分圏になる。
<!-- formal-statement-end -->

### 証明の見取り図

閉性（S4）によって合成の値が選んだHomに留まる。結合則と単位律は、元の圏における同じ式を制限して使う。すべてのHomを残す構成では閉性が自動的に成立する。

<!-- proof-start -->
### 証明

$\mathcal D$ の $f:A\to B$, $g:B\to E$ を取る。（S4）により $g\circ_{\mathcal C}f$ が $\mathcal D$ に属するので、この値を $g\circ_{\mathcal D}f$ と定められる。$f:A\to B$, $g:B\to E$, $h:E\to F$ に対し、（S4）を二回用いると二つの括弧付けはともに $\mathcal D$ の射である。元の圏の[結合則](../CAT1-01/index.md#def-cat1-01-category)を用いれば

$$
h\circ_{\mathcal D}(g\circ_{\mathcal D}f)
=h\circ_{\mathcal C}(g\circ_{\mathcal C}f)
=(h\circ_{\mathcal C}g)\circ_{\mathcal C}f
=(h\circ_{\mathcal D}g)\circ_{\mathcal D}f.
$$

各 $A$ の恒等射は（S3）で選ばれており、$f:A\to B$ に対して

$$
1_B\circ_{\mathcal D}f
=1_B\circ_{\mathcal C}f=f,
\qquad
f\circ_{\mathcal D}1_A=f.
$$

よって $\mathcal D$ は圏である。後半の構成では対象集合を $\mathcal A$ とし、各Homを元のHom全体としたから（S1）（S2）（S3）が成り立つ。合成も元のHom $\operatorname{Hom}_{\mathcal C}(A,E)$ に入るので（S4）が成り立ち、前半を適用できる。$\square$
<!-- proof-end -->

一対象圏を考えるとさらに見通しがよい。[一対象圏とモノイドの対応](../CAT1-02/index.md#prop-cat1-02-one-object)では、合成がモノイドの積、恒等射が単位元である。同じ一対象を残す部分圏は、単位元と積に関して閉じた部分集合、すなわち部分モノイドに対応する。対象を残すだけでは積の閉性を保証できない。

## 3. 積圏：二つの圏を同時に動かす

次に二つの圏 $\mathcal C,\mathcal D$ を並べ、$\mathcal C$ の射と $\mathcal D$ の射を**一組として**実行したい。例えば二つの二点鎖で、$(0,0)$ から $(1,0)$ へは第一成分だけ、$(0,0)$ から $(1,1)$ へは両成分とも進む。この「両方で射がある場合だけ、対の射がある」という規則を一般化する。

<a id="def-cat1-05-product"></a>

<!-- formal-statement-start -->
> **定義（積圏）**  
> 圏 $\mathcal C,\mathcal D$ に対し、**積圏** $\mathcal C\times\mathcal D$ の対象を対 $(A,X)$（$A\in\mathcal C$, $X\in\mathcal D$）とし、Homを

$$
\operatorname{Hom}_{\mathcal C\times\mathcal D}
((A,X),(B,Y))
=\operatorname{Hom}_{\mathcal C}(A,B)
\times\operatorname{Hom}_{\mathcal D}(X,Y)
$$

> と定める。射は対 $(f,u):(A,X)\to(B,Y)$ であり、$f:A\to B$ と $u:X\to Y$ である。恒等射と合成を成分ごとに

$$
1_{(A,X)}=(1_A,1_X),
\qquad
(g,v)\circ(f,u)=(g\circ f,v\circ u)
$$

> とする。ただし $g:B\to E$, $v:Y\to Z$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-05-product -->
**定義の確認**（二点鎖の積）。二点鎖 $\mathcal P=\{0<1\}$ の順序圏を二つ用いると、対象は $(0,0),(0,1),(1,0),(1,1)$ の四つである。$\operatorname{Hom}_{\mathcal P}(i,j)$ は $i\le j$ なら一元集合、そうでなければ空なので

$$
\operatorname{Hom}_{\mathcal P\times\mathcal P}((i,j),(k,\ell))
\ne\varnothing
\quad\Longleftrightarrow\quad
i\le k\ \text{かつ}\ j\le\ell.
$$

例えば $(0,0)\to(1,0)\to(1,1)$ の合成は $(0,0)\to(1,1)$ で、両成分の合成によって一意に決まる。一方 $(1,0)\to(0,1)$ は第一成分の射がないので存在しない。対角の恒等射 $(1_i,1_j)$ を合成すると各成分に戻る。これで射の存在・恒等射・合成の三条件を具体的に確認した。
<!-- definition-example-end -->

<a id="prop-cat1-05-product-axioms"></a>

<!-- formal-statement-start -->
> **命題（積圏の公理と局所小性）**  
> 任意の圏 $\mathcal C,\mathcal D$ の積圏 $\mathcal C\times\mathcal D$ は圏である。両者が局所小圏なら積圏も局所小圏であり、両者が小さい圏なら積圏も小さい圏である。
<!-- formal-statement-end -->

### 証明の見取り図

対の射の型を確認し、結合則と単位律を各成分で使う。局所小性は二つのHom集合の直積が集合であること、小ささは対象と射の集合の直積が集合であることから従う。

<!-- proof-start -->
### 証明

$(f,u):(A,X)\to(B,Y)$ と $(g,v):(B,Y)\to(E,Z)$ を取る。$g\circ f:A\to E$ と $v\circ u:X\to Z$ が元の二圏で定義されるので、$(g\circ f,v\circ u)$ は正しい型の射である。さらに $(h,w):(E,Z)\to(F,W)$ を取る。二圏の[結合則](../CAT1-01/index.md#def-cat1-01-category)を成分ごとに適用すると

$$
\begin{aligned}
((h,w)\circ(g,v))\circ(f,u)
&=((h\circ g)\circ f,(w\circ v)\circ u)\\
&=(h\circ(g\circ f),w\circ(v\circ u))\\
&=(h,w)\circ((g,v)\circ(f,u)).
\end{aligned}
$$

恒等射も、元の単位律から

$$
\begin{aligned}
(1_B,1_Y)\circ(f,u)&=(1_B\circ f,1_Y\circ u)=(f,u),\\
(f,u)\circ(1_A,1_X)&=(f\circ1_A,u\circ1_X)=(f,u).
\end{aligned}
$$

各Homが集合ならその直積も集合なので、[局所小圏の定義](../CAT1-02/index.md#def-cat1-02-size)を満たす。対象と射の全体がそれぞれ集合なら、それらの直積および必要な始域・終域の組も集合となり、[小さい圏の定義](../CAT1-02/index.md#def-cat1-02-size)を満たす。$\square$
<!-- proof-end -->

逆向きの「積圏が局所小だから、両因子が局所小」とは無条件には言えない。片方が対象を持たない空の圏なら、積圏は空になり、もう片方のHomについて何も分からない。**十分条件と必要条件を混同しない**ための例である。

### 3.1 積圏での同型と消去律

積圏の射 $(f,u)$ が[同型](../CAT1-03/index.md#def-cat1-03-isomorphism)なら、逆射も二成分で存在するはずである。実はモノ射とエピ射も各成分で判定できる。

<a id="prop-cat1-05-product-cancellation"></a>

<!-- formal-statement-start -->
> **命題（積圏の同型・モノ射・エピ射）**  
> 圏 $\mathcal C,\mathcal D$ の射 $f:A\to B$ と $u:X\to Y$ に対して、積圏の射 $(f,u):(A,X)\to(B,Y)$ が同型射、モノ射、エピ射である条件は、それぞれ $f$ と $u$ が両方とも対応する性質を持つことと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

同型は対の逆射を二成分へ分解する。モノ射について逆向きを示すときは、第一成分を試験する射に、第二成分では恒等射を組み合わせる。エピ射では出力側の恒等射を組み合わせる。

<!-- proof-start -->
### 証明

同型性について、$(g,v):(B,Y)\to(A,X)$ が $(f,u)$ の逆射なら、[積圏](#def-cat1-05-product)で定めた成分ごとの合成から

$$
g\circ f=1_A,\quad f\circ g=1_B,
\qquad v\circ u=1_X,\quad u\circ v=1_Y.
$$

よって $g,v$ はそれぞれ逆射である。逆に二成分に逆射があれば、それを組にすれば対の両側逆となる。

$f,u$ がともに[モノ射](../CAT1-03/index.md#def-cat1-03-monomorphism)なら、$(f,u)\circ(a,p)=(f,u)\circ(b,q)$ は $f\circ a=f\circ b$ と $u\circ p=u\circ q$ の組の等式なので、両成分の左消去律から $(a,p)=(b,q)$ を得る。

逆に $(f,u)$ がモノ射とする。任意の $a,b:K\to A$ が $f\circ a=f\circ b$ を満たすとき、積圏の射 $(a,1_X),(b,1_X):(K,X)\to(A,X)$ を考える。合成はともに $(f\circ a,u)$ だから、$(f,u)$ の左消去律により $(a,1_X)=(b,1_X)$、従って $a=b$。同じ手順で $(1_A,p),(1_A,q)$ を試験すれば $u$ もモノ射である。

エピ射については[右消去律](../CAT1-03/index.md#def-cat1-03-epimorphism)を使う。$f,u$ がそれぞれエピ射なら、$(a,p)\circ(f,u)=(b,q)\circ(f,u)$ の両成分から $a=b,p=q$ となる。逆に $(f,u)$ がエピ射なら、$a,b:B\to L$ と $a\circ f=b\circ f$ に対し、$(a,1_Y),(b,1_Y):(B,Y)\to(L,Y)$ を試験する。右から $(f,u)$ を合成した二つは $(a\circ f,u)$ に等しいので、右消去律から $a=b$。第二成分も $(1_B,p),(1_B,q)$ を用いて同じ型の論証で示せる。$\square$
<!-- proof-end -->

## 4. スライス圏：同じ対象へ向かう射を比べる

積圏では二つの射を独立に並べた。今度は基底となる対象 $S$ を一つ固定し、$S$ への写像 $f:A\to S$ を一つのデータとして扱う。例えば集合 $S=\{0,1\}$ への写像は、$A$ の各元を「0側」「1側」に分類する。別の分類 $g:B\to S$ へ写すときは、その分類を変えない写像 $h:A\to B$ だけを許したい。

条件は $g(h(a))=f(a)$ であり、抽象圏では二本の射の等式 $g\circ h=f$ で表す。この可換な三角形を射の定義に組み込む。

<a id="def-cat1-05-slice"></a>

<!-- formal-statement-start -->
> **定義（スライス圏）**  
> 圏 $\mathcal C$ とその対象 $S$ を固定する。**スライス圏** $\mathcal C/S$ の対象は、$\mathcal C$ の射 $f:A\to S$ とする（対象を $(A,f)$ と記す）。
>
> $(A,f)$ から $(B,g)$ への射は、$\mathcal C$ の射 $h:A\to B$ で、次の可換条件を満たすものとする。

$$
g\circ h=f.
$$

> 恒等射は $1_A:(A,f)\to(A,f)$、合成は $\mathcal C$ における通常の合成 $k\circ h$ とする。従ってHomは

$$
\operatorname{Hom}_{\mathcal C/S}((A,f),(B,g))
=\{h\in\operatorname{Hom}_{\mathcal C}(A,B)\mid g\circ h=f\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-05-slice -->
**定義の確認**（集合の二分類）。$S=\{0,1\}$、$A=\{a,b,c\}$ とし、$f(a)=f(b)=0$, $f(c)=1$ とする。$B=\{u,v,w\}$ とし、$g(u)=0$, $g(v)=g(w)=1$ とする。

$g\circ h=f$ を満たす写像 $h:A\to B$ は、$a,b$ を $\{u\}$ に、$c$ を $\{v,w\}$ に写さなければならない。従って

$$
h(a)=u,\quad h(b)=u,\quad h(c)\in\{v,w\}
$$

であり、射は二本存在する。各 $x\in A$ で $g(h(x))=f(x)$ を代入して確かめられる。$1_A$ についても $f\circ1_A=f$ なので、確かに自己射となる。二分類を守ることが、可換三角形の意味である。
<!-- definition-example-end -->

<a id="prop-cat1-05-slice-axioms"></a>

<!-- formal-statement-start -->
> **命題（スライス圏の公理と局所小性）**  
> 圏 $\mathcal C$ と対象 $S$ に対して $\mathcal C/S$ は圏である。$\mathcal C$ が局所小圏なら $\mathcal C/S$ も局所小圏である。$\mathcal C$ が小さい圏なら $\mathcal C/S$ も小さい圏である。
<!-- formal-statement-end -->

### 証明の見取り図

$g\circ h=f$ と $r\circ k=g$ を合成すると、$r\circ(k\circ h)=f$ になる。三角形の可換条件は合成に関して閉じている。Homは元のHomの部分集合だから、局所小性も引き継ぐ。

<!-- proof-start -->
### 証明

対象 $(A,f)$, $(B,g)$, $(E,r)$ を取り、$h:(A,f)\to(B,g)$ と $k:(B,g)\to(E,r)$ を取る。元の圏における射の型は $h:A\to B$, $k:B\to E$ である。スライス圏の射の条件は $g\circ h=f$, $r\circ k=g$ なので、[結合則](../CAT1-01/index.md#def-cat1-01-category)から

$$
r\circ(k\circ h)=(r\circ k)\circ h
=g\circ h=f.
$$

ゆえに $k\circ h$ は $(A,f)\to(E,r)$ の射になり、合成は閉じる。任意の $(A,f)$ について $f\circ1_A=f$ なので $1_A$ は自己射である。三つのスライス圏の射の結合則と左右の単位律は、元の圏の同じ等式がそのまま成立するため従う。

$\mathcal C$ が局所小なら、固定した $(A,f),(B,g)$ に対し $\operatorname{Hom}_{\mathcal C}(A,B)$ は集合であり、可換条件を満たす部分集合も集合である。[局所小圏](../CAT1-02/index.md#def-cat1-02-size)となる。$\mathcal C$ が小さければ、対象 $f:A\to S$ の集まりは $\mathcal C$ の射集合の部分集合であり、スライス圏の射も元の射と始域・終域の指定から作る集合である。よって小さい。$\square$
<!-- proof-end -->

### 4.1 スライス圏の終対象

基底 $S$ に向かう最も単純な射は恒等射 $1_S:S\to S$ である。任意の $(A,f)$ から $(S,1_S)$ への射 $h$ は、可換条件 $1_S\circ h=f$ によって $h=f$ と強制される。これは[終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)にぴったり一致する。

一方、スライス圏に始対象が存在するかは元の圏と $S$ に依存する。たとえば集合のスライス圏では空集合から $S$ への唯一の写像が始対象になるが、一般の圏で同じ存在を断言することはできない。

## 5. 余スライス圏：基底から出ていく射を固定する

今度は射の向きを反転し、基底 $S$ **から出る**射 $f:S\to A$ を対象にしたい。二つの対象の間では、出発点 $S$ からの指定した射を保つ必要がある。これは[反対圏の合成](../CAT1-04/index.md#def-cat1-04-opposite)と対応する双対的な構成になる。

<a id="def-cat1-05-coslice"></a>

<!-- formal-statement-start -->
> **定義（余スライス圏）**  
> 圏 $\mathcal C$ とその対象 $S$ に対し、**余スライス圏** $S\backslash\mathcal C$ の対象は射 $f:S\to A$（$(A,f)$ と記す）である。$(A,f)$ から $(B,g)$ への射は、$\mathcal C$ の射 $h:A\to B$ で

$$
h\circ f=g
$$

> を満たすものとする。恒等射は $1_A$、合成は $\mathcal C$ における合成とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-05-coslice -->
**定義の確認**（印を付けた集合）。$S=\{*\}$ とする。$f:S\to A$ は一つの元 $a=f(*)\in A$ を指定する。$g:S\to B$ が $b=g(*)\in B$ を指定するとき、写像 $h:A\to B$ が余スライス圏の射である条件は、$h(f(*))=g(*)$、つまり $h(a)=b$ である。

例えば $A=\{a,a'\}$, $B=\{b,b'\}$ なら、$h(a)=b$ に固定して $h(a')$ は二通り選べる。恒等射は $1_A(a)=a$ なので条件を満たす。

さらに $r:S\to E$ が $c=r(*)\in E$ を指定し、$k:B\to E$ が $k(b)=c$ を満たすなら、$h:(A,f)\to(B,g)$ と $k:(B,g)\to(E,r)$ はともに余スライス圏の射である。合成についても

$$
(k\circ h)(a)=k(b)=c=r(*)
$$

だから、$k\circ h$ は $(A,f)\to(E,r)$ の射になる。
<!-- definition-example-end -->

<a id="prop-cat1-05-slice-special"></a>

<!-- formal-statement-start -->
> **命題（スライス圏と余スライス圏の特別な対象）**  
> 任意の圏 $\mathcal C$ とその対象 $S$ に対し、$(S,1_S)$ はスライス圏 $\mathcal C/S$ の終対象であり、余スライス圏 $S\backslash\mathcal C$ の始対象である。余スライス圏も圏をなし、$\mathcal C$ が局所小なら余スライス圏も局所小である。
<!-- formal-statement-end -->

### 証明の見取り図

スライス側は $1_S\circ h=f$、余スライス側は $h\circ1_S=f$ を解くだけで射の存在と一意性が同時に決まる。余スライス圏の合成閉性はスライスの証明と反対の向きで確認する。

<!-- proof-start -->
### 証明

$\mathcal C/S$ の任意の対象 $(A,f)$ に対して、$(A,f)\to(S,1_S)$ の射は $h:A\to S$ で $1_S\circ h=f$ を満たすものに限る。$h=f$ は条件を満たし、条件から $h=f$ が必ず従うので、ちょうど一本である。従って[終対象の定義](../CAT1-04/index.md#def-cat1-04-initial-terminal)を満たす。

余スライス圏では $(S,1_S)\to(A,f)$ の射 $h:S\to A$ が $h\circ1_S=f$ を満たす必要があり、$h=f$ が存在し一意である。従って始対象である。

余スライスの圏の公理も直接確認する。$h:(A,f)\to(B,g)$、$k:(B,g)\to(E,r)$ なら $h\circ f=g$、$k\circ g=r$ なので

$$
(k\circ h)\circ f=k\circ(h\circ f)=k\circ g=r.
$$

合成は閉じ、$1_A\circ f=f$ で恒等射があり、結合則と単位律は元の圏から引き継ぐ。任意の二対象のHomは $\operatorname{Hom}_{\mathcal C}(A,B)$ のうち等式を満たす部分集合なので、元の圏が局所小なら集合である。$\square$
<!-- proof-end -->

<a id="prop-cat1-05-coslice-opposite"></a>

<!-- formal-statement-start -->
> **命題（余スライス圏と反対圏）**  
> 圏 $\mathcal C$ と対象 $S$ に対し、$S\backslash\mathcal C$ の反対圏の対象・射・恒等射・合成は、各射を反対向きに読み替えると $\mathcal C^{\mathrm{op}}/S$ のものと一対一に対応し、その対応は合成と恒等射を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

余スライスの対象 $f:S\to A$ を反対圏で $f^{\mathrm{op}}:A\to S$ と読む。余スライスでの可換条件を反転させると、スライス圏での可換条件になる。

<!-- proof-start -->
### 証明

$S\backslash\mathcal C$ の対象 $f:S\to A$ は、$\mathcal C^{\mathrm{op}}/S$ の対象 $f^{\mathrm{op}}:A\to S$ に対応する。$(S\backslash\mathcal C)^{\mathrm{op}}$ で $f$ から $g$ への射は、元の余スライスで $g$ から $f$ への射 $u:B\to A$ を反転した $u^{\mathrm{op}}:A\to B$ である。余スライスの条件は

$$
u\circ g=f.
$$

[反対圏の合成規則](../CAT1-04/index.md#def-cat1-04-opposite)から、これは

$$
g^{\mathrm{op}}\circ_{\mathrm{op}}u^{\mathrm{op}}
=(u\circ g)^{\mathrm{op}}=f^{\mathrm{op}}
$$

と同値であり、$\mathcal C^{\mathrm{op}}/S$ の射の条件そのものである。対応は反対を二度取れば戻るから射について全単射である。恒等射は $(1_A)^{\mathrm{op}}$ に移る。合成について、さらに $r:S\to E$ と $v:E\to B$ が $v\circ r=g$ を満たすとする。元の余スライス圏では $r\xrightarrow{v}g\xrightarrow{u}f$ が合成可能で、$u\circ v:E\to A$ が合成射である。反対圏側では $f^{\mathrm{op}}\xrightarrow{u^{\mathrm{op}}}g^{\mathrm{op}}\xrightarrow{v^{\mathrm{op}}}r^{\mathrm{op}}$ となり、

$$
v^{\mathrm{op}}\circ_{\mathrm{op}}u^{\mathrm{op}}
=(u\circ v)^{\mathrm{op}}
$$

が成り立つ。したがって両側の合成規則も一致する。$\square$
<!-- proof-end -->

### 5.1 半順序圏ではスライスが下側、余スライスが上側になる

半順序集合 $(P,\le)$ に対応する[順序圏](../CAT1-02/index.md#prop-cat1-02-order-category)を考える。元 $s\in P$ を固定すると、$P/s$ の対象 $p\to s$ が存在する条件は $p\le s$ である。二対象 $p,q\le s$ の間の射は $p\le q$ の場合にただ一本あり、可換条件は唯一の $p\to s$ への合成が一致することから成り立つ。従って **$P/s$ は $s$ 以下の元からなる順序圏**である。

同様に $s\backslash P$ の対象は $s\le p$ を満たす元であり、射は元の順序に従う。$s$ は下側の圏では最大元、上側の圏では最小元なので、先ほどの終対象・始対象の命題とも一致する。

## 6. 演習：圏の公理を自分で組み立てる

### CAT1-05-A01 充満な制限と合成で失敗する制限

- Level: A

三点鎖 $0<1<2$ の順序圏 $\mathcal P$ について、対象 $\{0,2\}$ の充満部分圏の全Homを列挙せよ。また三対象をすべて残し、恒等射と $0\to1$, $1\to2$ のみを残した候補が部分圏でない理由を示せ。

<!-- solution-start -->
**詳細解答**。[半順序圏の構成](../CAT1-02/index.md#prop-cat1-02-order-category)により、$i\le j$ ならHomは一元集合、そうでなければ空である。選んだ対象間では

$$
\operatorname{Hom}(0,0)=\{1_0\},\quad
\operatorname{Hom}(2,2)=\{1_2\},\quad
\operatorname{Hom}(0,2)=\{a\},\quad
\operatorname{Hom}(2,0)=\varnothing
$$

となる。恒等射の合成以外には非自明な合成可能対がないから閉じている。元の四つのHomをすべて残したので[充満部分圏](#def-cat1-05-subcategory)である。後半では $f:0\to1$, $g:1\to2$ を残した以上、$g\circ f:0\to2$ も必要である。しかし候補の射に入っていないため（S4）の合成閉性が破れる。
<!-- solution-end -->

### CAT1-05-A02 一対象圏の部分圏

- Level: A

加法モノイド $(\mathbb N_0,+,0)$ を一対象圏とみなす。偶数 $2\mathbb N_0$ の射だけを残すと部分圏になるか。充満か、広いかも判定せよ。

<!-- solution-start -->
**詳細解答**。[一対象圏の構成](../CAT1-02/index.md#prop-cat1-02-one-object)で恒等射は $0$、合成は加法である。$0=2\cdot0$ は残り、$2m+2n=2(m+n)\in2\mathbb N_0$ だから合成で閉じる。結合則と単位律は元の圏から引き継がれるので部分圏となる。対象は唯一の対象を残しているから広い。一方、元のHomには奇数 $1$ があるが残していないため、[充満の条件](#def-cat1-05-subcategory)は満たさない。
<!-- solution-end -->

### CAT1-05-A03 積圏の射を判定する

- Level: A

二点鎖 $\mathcal P=\{0<1\}$ に対し、$\mathcal P\times\mathcal P$ の $(0,1)\to(1,0)$ と $(0,0)\to(1,1)$ のHomを求めよ。後者の射を $(0,0)\to(0,1)\to(1,1)$ に分解した合成と比較せよ。

<!-- solution-start -->
**詳細解答**。[積圏のHom](#def-cat1-05-product)は二つのHomの直積である。$(0,1)\to(1,0)$ の第一成分には射があるが、第二成分 $1\to0$ は存在しないので直積は空である。$(0,0)\to(1,1)$ では両成分 $0\to1$ が唯一なのでHomは一元である。中間の $(0,1)$ を通る合成は、第一成分で $0\to0\to1$、第二成分で $0\to1\to1$ を合成する。どちらも唯一の $0\to1$ となり、直接の射と一致する。
<!-- solution-end -->

### CAT1-05-A04 集合のスライス圏のHom

- Level: A

$S=\{0,1\}$、$A=\{a,b\}$、$B=\{u,v,w\}$ とし、$f(a)=0,f(b)=1$、$g(u)=g(v)=0,g(w)=1$ とする。$\mathbf{Set}/S$ で $(A,f)\to(B,g)$ の射をすべて求めよ。

<!-- solution-start -->
**詳細解答**。[スライス圏の可換条件](#def-cat1-05-slice)は各 $x\in A$ で $g(h(x))=f(x)$ である。$f(a)=0$ なので $h(a)\in\{u,v\}$、$f(b)=1$ なので $h(b)=w$ が必要十分である。従って $h_1(a)=u,h_1(b)=w$ と $h_2(a)=v,h_2(b)=w$ の二本だけである。二本とも $a,b$ で条件を代入して満たすと確認でき、他は各元で選択肢が尽くされている。
<!-- solution-end -->

### CAT1-05-A05 余スライス圏の印付き集合

- Level: A

$S=\{*\}$、$A=\{a,a'\}$、$B=\{b,b'\}$ とし、$f(*)=a$, $g(*)=b$ とする。$S\backslash\mathbf{Set}$ の $(A,f)\to(B,g)$ の射を数え、なぜ $1_A$ が $(A,f)$ の恒等射か確かめよ。

<!-- solution-start -->
**詳細解答**。[余スライス圏の定義](#def-cat1-05-coslice)では $h\circ f=g$ が条件である。$S$ は一元集合なのでこれは $h(a)=b$ と同値で、残る $a'$ の像は $b$ または $b'$ の二通り。射は二本となる。$1_A\circ f$ の $*$ での値は $1_A(f(*))=1_A(a)=a=f(*)$ だから $1_A\circ f=f$。よって $1_A$ は自己射であり、任意の射との合成について元の写像の単位律を満たす。
<!-- solution-end -->

### CAT1-05-B01 広いが充満でない部分圏を構成する

- Level: B

三点鎖 $0<1<2$ の順序圏で、全対象・全恒等射と $a:0\to2$ だけを残す。部分圏の四条件を検証し、充満でないことを示せ。続いて $b:0\to1$ を追加しても、$1\to2$ を追加しなければ部分圏のままであることを確認せよ。

<!-- solution-start -->
**詳細解答**。対象は元の三対象と一致するから（S1）を満たし、選んだ射は元のHomに属するから（S2）を満たす。全恒等射を残すので（S3）も満たす。非恒等射 $a:0\to2$ は自分自身と合成できない。従って合成可能な対は少なくとも片方が恒等射であり、結果は $a$ または恒等射で残る。よって（S4）も成立し、[部分圏の構成と充満部分圏](#prop-cat1-05-subcategory-construction)から圏である。

一方、元の $0\to1$ が欠けているから充満ではない。$b:0\to1$ を加えた後も、非恒等射 $a$ と $b$ は互いに合成できない（両方とも始域が $0$）。両者と恒等射との合成だけが可能なので閉性が保たれる。ただしさらに $1\to2$ を加えると、$b$ との合成 $0\to2$ が必要になる。この例では $a$ を残しているので問題ないが、$a$ を除去すれば閉性が壊れる。
<!-- solution-end -->

### CAT1-05-B02 積圏のモノ射を成分に戻す

- Level: B

圏 $\mathcal C,\mathcal D$ の射 $(f,u):(A,X)\to(B,Y)$ が積圏でモノ射であると仮定する。$f$ と $u$ がそれぞれモノ射であることを、試験射を実際に構成して証明せよ。さらに集合の圏で $f$ が単射、$u$ が非単射なら $(f,u)$ がモノ射にならないことを説明せよ。

<!-- solution-start -->
**詳細解答**。$a,b:K\to A$ について $f\circ a=f\circ b$ を仮定する。$\mathcal D$ には恒等射 $1_X:X\to X$ があるから、$(a,1_X),(b,1_X):(K,X)\to(A,X)$ を作れる。[積圏の合成](#def-cat1-05-product)より

$$
(f,u)\circ(a,1_X)=(f\circ a,u)
=(f\circ b,u)=(f,u)\circ(b,1_X).
$$

モノ射性から $(a,1_X)=(b,1_X)$、すなわち $a=b$。今度は $p,q:Z\to X$ と $u\circ p=u\circ q$ に対し、$(1_A,p),(1_A,q):(A,Z)\to(A,X)$ を作ると、合成の等式とモノ射性から $p=q$。従って両方がモノ射である。

集合の圏では[モノ射と単射の同値](../CAT1-03/index.md#prop-cat1-03-set-characterization)により、非単射の $u$ はモノ射でない。積圏のモノ射からは $u$ のモノ射性が必要なので、$(f,u)$ はモノ射でない。
<!-- solution-end -->

### CAT1-05-B03 スライス圏のモノ射を判定する

- Level: B

スライス圏 $\mathcal C/S$ の射 $h:(A,f)\to(B,g)$ がモノ射であることと、元の圏 $\mathcal C$ で $h:A\to B$ がモノ射であることが同値であると証明せよ。特に逆向きの証明では、任意の試験射がスライスの射になる対象を構成せよ。

<!-- solution-start -->
**詳細解答**。まず $h$ が元の圏でモノ射とする。スライスの射 $u,v:(X,p)\to(A,f)$ について $h\circ u=h\circ v$ なら、元の圏の[左消去律](../CAT1-03/index.md#def-cat1-03-monomorphism)から $u=v$ である。従ってスライスでモノ射となる。

逆に $h$ がスライスでモノ射とし、元の圏で任意の $u,v:X\to A$ が $h\circ u=h\circ v$ を満たすとする。スライスの射の条件 $g\circ h=f$ を両辺に左合成すると

$$
f\circ u=(g\circ h)\circ u
=g\circ(h\circ u)
=g\circ(h\circ v)
=(g\circ h)\circ v=f\circ v.
$$

ここで $p:=f\circ u=f\circ v:X\to S$ と置くと、$f\circ u=p$ と $f\circ v=p$ だから、**同じ対象** $(X,p)$ から $(A,f)$ へのスライス射 $u,v$ が得られた。$h\circ u=h\circ v$ とスライスでのモノ射性から $u=v$。任意の $X,u,v$ で成立したので、元の圏でもモノ射である。
<!-- solution-end -->

### CAT1-05-B04 スライスと余スライスの向きを比較する

- Level: B

半順序集合 $P=\{0<1<2<3\}$ の順序圏で $s=2$ とする。$P/s$ と $s\backslash P$ の対象、異なる対象間の射、始対象・終対象をすべて求めよ。さらに、存在しないはずの $3\to2$ が必要だと誤読した場合、どの定義を誤用したか指摘せよ。

<!-- solution-start -->
**詳細解答**。[順序圏の射](../CAT1-02/index.md#prop-cat1-02-order-category)は $p\le q$ のときだけ存在する。$P/2$ の対象は $p\to2$ に対応する $0,1,2$ で、異対象間の射は $0\to1$, $0\to2$, $1\to2$ の三本である。最小元 $0$ は始対象、最大元 $2$ は終対象である。$2\backslash P$ の対象は $2\to p$ に対応する $2,3$ で、異対象間の射は $2\to3$ の一本。$2$ が始対象、$3$ が終対象となる。

$3\to2$ は $3\le2$ が偽なので $P$ に存在しない。スライスの対象は **$p\to2$**、余スライスの対象は **$2\to p$** であり、二つの向きを混同すると誤った射を要求してしまう。[スライスの定義](#def-cat1-05-slice)と[余スライスの定義](#def-cat1-05-coslice)に戻れば区別できる。
<!-- solution-end -->

### CAT1-05-C01 積圏のスライスを二つのスライスに分解する

- Level: C

半順序集合 $(P,\le)$ と $(Q,\preceq)$ を圏とみなし、$p_0\in P$, $q_0\in Q$ を固定する。次の二つの圏を考える。

1. 積圏 $P\times Q$ の対象 $(p_0,q_0)$ へのスライス圏 $(P\times Q)/(p_0,q_0)$。
2. 二つのスライス圏の積 $(P/p_0)\times(Q/q_0)$。

両者の対象・Hom・恒等射・合成を実際に書き、対応 $(p,q)\mapsto(p,q)$ がこれら四つをすべて保つ一対一対応であることを示せ。また $P=Q=\{0<1\}$, $p_0=q_0=1$ のとき、各対象から終対象への射が何本あるか計算せよ。

<!-- solution-start -->
**詳細解答**。まず[積圏のHom](#def-cat1-05-product)から、$P\times Q$ で $(p,q)\to(r,s)$ が存在する条件は $p\le r$ と $q\preceq s$ が両方成立することであり、その場合Homは一元集合である。

従って左側のスライスの対象は、$(p,q)\to(p_0,q_0)$ がある組、すなわち

$$
p\le p_0,\qquad q\preceq q_0
$$

を満たす組である。右側の二つも[スライス圏](#def-cat1-05-slice)だから、$P/p_0$ の対象は $p\le p_0$、$Q/q_0$ の対象は $q\preceq q_0$ であり、その対はまったく同じ組である。

左側で $(p,q)\to(r,s)$ がスライス射であるには $p\le r$, $q\preceq s$ で、さらに固定基底への三角形が可換でなければならない。しかし順序圏では合成可能な射のHomが一元なので、$(p,q)\to(r,s)\to(p_0,q_0)$ は唯一の $(p,q)\to(p_0,q_0)$ と等しい。従って条件はちょうど

$$
p\le r,\qquad q\preceq s.
$$

右側でも二つのスライスのHomを直積に取るので、同じ条件なら一元、そうでなければ空である。恒等射は左で $(1_p,1_q)$、右でも $(1_p,1_q)$、合成はどちらも $P,Q$ での成分ごとの唯一の射の合成で一致する。従って対象、Hom、恒等射、合成の四つがこの対応で保たれ、逆対応も同じ組を取り出す操作である。

最後に二点鎖を取ると、対象は $(0,0),(0,1),(1,0),(1,1)$ で、終対象は $(1,1)$ である。各対象 $(i,j)$ は $i\le1$, $j\le1$ を満たすので、どの対象からも $(1,1)$ へのHomは一元集合、すなわち射はそれぞれ**一本**である。この計算は[スライスの終対象](#prop-cat1-05-slice-special)の一般命題とも一致する。$\square$
<!-- solution-end -->

## 7. 次の講義へ

部分圏は選んだ射が合成に関して閉じること、積圏は二成分の射が同時に合成できること、スライス圏は可換三角形が合成によって保たれることが鍵であった。どれも個別の圏から別の圏を作る規則であり、すべての公理を検証できた。

次の **CAT1-06「関手と保存する構造」** では、こうして得た二つの圏の間を行き来する写像が、恒等射と合成を保存するための条件を定義する。
