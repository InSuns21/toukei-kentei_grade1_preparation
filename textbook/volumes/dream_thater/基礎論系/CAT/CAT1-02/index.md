# CAT1-02 小さい圏と局所小圏

<!-- definition-example-audit: strict -->

## 1. 「集まり」はいつ集合なのか

[前講の圏の定義](../CAT1-01/index.md#def-cat1-01-category)では、対象や射を単に「集まり」と呼んだ。二対象の有限圏には問題がないが、集合と写像の圏 $\mathbf{Set}$ では、対象を「すべての集合」とした。これは一つの集合にはならない。

[Russell のパラドックス](../../SET/SET1/index.md#prop-set1-russell)を思い出そう。もしすべての集合を元とする集合 $U$ があれば、[分出公理図式](../../SET/SET1/index.md#axiom-set1-separation)によって

$$
R=\{x\in U:x\notin x\}
$$

が集合としてできる。$R$ も集合だから $R\in U$ であり、$R\in R$ と $R\notin R$ が同値になって矛盾する。このため、すべての集合は [真の類](../../SET/SET1/index.md#def-set1-proper-class) であって、集合ではない。

ここで二つの問いは違う。

1. **対象や射を全部まとめたもの**は集合になるか。
2. 対象 $A,B$ を**固定したとき**、$A$ から $B$ への射を全部まとめた $\operatorname{Hom}(A,B)$ は集合になるか。

後者だけが成立する圏も扱いたい。以下の「類」は、[SET1 の真の類の説明](../../SET/SET1/index.md#def-set1-proper-class)と同じく、集合論の外から条件で指定した集合の集まりを話すための言い方である。ZF に新しい「類という集合」を追加するわけではない。例で使う対象・射・演算の条件は、いずれも明示した集合論的な式で指定する。

## 2. 圏の大きさを二通りに測る

まず各圏 $\mathcal C$ に対して、全対象の集まりを $\operatorname{Ob}(\mathcal C)$、始域・終域を付けて区別した全射の集まりを $\operatorname{Mor}(\mathcal C)$ と書く。前講の $\operatorname{Hom}_{\mathcal C}(A,B)$ は、後者のうち始域が $A$、終域が $B$ の射だけを取り出したものだった。

対象の集まりも射の集まりも集合になる場合を「小さい」と言い、Hom だけが各組で集合になる場合を「局所小」と言う。小ささは対象だけの個数では決まらない。

<a id="def-cat1-02-size"></a>

<!-- formal-statement-start -->
> **定義（小さい圏・局所小圏・大きい圏）**  
> 圏 $\mathcal C$ が **小さい圏** であるとは、$\operatorname{Ob}(\mathcal C)$ と $\operatorname{Mor}(\mathcal C)$ がともに集合であることをいう。  
> 圏 $\mathcal C$ が **局所小圏** であるとは、任意の対象 $A,B\in\operatorname{Ob}(\mathcal C)$ に対し $\operatorname{Hom}_{\mathcal C}(A,B)$ が集合であることをいう。  
> **大きい圏** とは小さくない圏をいう。「大きい」ことと「局所小でない」ことは同義ではない。
<!-- formal-statement-end -->

### 定義の直接確認：二対象の圏

[前講の二対象の圏](../CAT1-01/index.md#def-cat1-01-category)を取る。対象は $\{P,Q\}$、射は $\{1_P,1_Q,u\}$ で、$u:P\to Q$ だけが非恒等射である。

<!-- definition-example-start: def-cat1-02-size -->
**定義の確認**。対象全体も射全体も三元以下の有限集合だから小さい。さらに、任意の組に対する四つの Hom は

$$
\operatorname{Hom}(P,P)=\{1_P\},\quad
\operatorname{Hom}(P,Q)=\{u\},\quad
\operatorname{Hom}(Q,P)=\varnothing,\quad
\operatorname{Hom}(Q,Q)=\{1_Q\}
$$

という集合である。よって局所小でもある。単に「対象が二つだから」と結論するのではなく、射の集まりと各 Hom の双方を検査した。
<!-- definition-example-end -->

小さい圏では Hom が自動的に集合になる。しかし、局所小圏が小さいとは限らない。

<a id="prop-cat1-02-small-local"></a>

<!-- formal-statement-start -->
> **命題（小さい圏は局所小圏）**  
> $\mathcal C$ が小さい圏なら、任意の対象 $A,B$ に対し $\operatorname{Hom}_{\mathcal C}(A,B)$ は集合である。
<!-- formal-statement-end -->

### 証明の見取り図

全射の集合から、始域と終域が指定のものだけを取り出す。これが集合であることに[分出公理図式](../../SET/SET1/index.md#axiom-set1-separation)を使う。

<!-- proof-start -->
### 証明

小さいという仮定から $M:=\operatorname{Mor}(\mathcal C)$ は集合である。対象 $A,B$ を固定する。各射には始域と終域が一意に定まるので、条件「$f$ の始域が $A$ かつ終域が $B$」で $M$ から分出できる。つまり

$$
\operatorname{Hom}_{\mathcal C}(A,B)
=\{f\in M:\operatorname{dom}(f)=A,\ \operatorname{cod}(f)=B\}
$$

は集合である。$A,B$ の選び方は任意だから局所小である。$\square$
<!-- proof-end -->

逆に、全対象が集合で、各 Hom も集合なら、全射をまとめて集合にできる。ここでは対象・Hom の指定が集合論の式で与えられている圏を考える。

<a id="prop-cat1-02-object-set"></a>

<!-- formal-statement-start -->
> **命題（対象の集合性と局所小性）**  
> 集合論的に指定された圏 $\mathcal C$ について、$\operatorname{Ob}(\mathcal C)$ が集合で、各 $\operatorname{Hom}_{\mathcal C}(A,B)$ が集合なら、$\mathcal C$ は小さい圏である。
<!-- formal-statement-end -->

### 証明の見取り図

対象の組 $(A,B)$ を一つずつ動かして Hom 集合を集める。組全体が集合なので、[置換公理図式](../../SET/SET1/index.md#axiom-set1-replacement)で Hom 集合の族自体を集合とし、[和集合公理](../../SET/SET1/index.md#axiom-set1-union)で射を全部集める。

<!-- proof-start -->
### 証明

$O=\operatorname{Ob}(\mathcal C)$ は集合であるから、[直積集合](../../../基礎科目/F0/F0-00A/index.md#def-f0-00a-cartesian-product) $O\times O$ も集合である。各組 $(A,B)\in O\times O$ には、仮定により一意に定まる集合 $H_{A,B}:=\operatorname{Hom}_{\mathcal C}(A,B)$ が対応する。Hom の指定は集合論的な式なので、置換公理図式から

$$
\mathscr H=\{H_{A,B}:(A,B)\in O\times O\}
$$

は集合である。和集合公理により

$$
M=\bigcup\mathscr H
$$

も集合となる。前講の約束どおり異なる始域・終域の射を型で区別しているので、$M$ はまさにすべての射の集合である。よって対象も射も集合であり、小さい圏である。$\square$
<!-- proof-end -->

この命題のポイントは、「Hom 集合がいくつもある」ことではなく、**その添字となる対象の組が集合をなす**ことにある。対象が真の類なら、同じまとめ方を無条件に使えない。

## 3. 半順序集合を圏にする

[半順序集合](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-poset) $(P,\preceq)$ では、$x\preceq y$ のときだけ $x$ から $y$ へ矢印を一本置くことにしよう。反射律は恒等射、推移律は合成の存在に対応する。反対称律は圏の公理には使わない。

反対称律を外し、反射律・推移律だけを持つ関係でも同じ構成が働く。この場合の関係を区別しておこう。

<a id="def-cat1-02-preorder"></a>

<!-- formal-statement-start -->
> **定義（前順序）**  
> 集合 $P$ 上の二項関係 $\preceq$ が前順序であるとは、任意の $x,y,z\in P$ について、反射律 $x\preceq x$ と、$x\preceq y$ かつ $y\preceq z$ なら $x\preceq z$ という推移律を満たすことをいう。反対称律は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-02-preorder -->
**定義の確認**。$P=\{p,q\}$ とし、すべての二元の組で $x\preceq y$ とする。特に $(p,p),(q,q)$ が含まれるため反射律は成立する。任意の三元 $x,y,z$ に対し結論 $x\preceq z$ が常に成立するため、推移律も成立する。一方、$p\preceq q$ かつ $q\preceq p$ なのに $p\ne q$ なので反対称律は失敗する。従って前順序だが半順序ではない。
<!-- definition-example-end -->

例えば $P=\{0,1,2\}$ と通常の順序を入れると、$0\to1$ と $1\to2$ があり、それらを合成した $0\to2$ もある。任意の始域・終域の組に射が高々一本だから、合成の結果は向きが定まれば一意である。

<a id="prop-cat1-02-order-category"></a>

<!-- formal-statement-start -->
> **命題（半順序集合の圏）**  
> 集合 $P$ 上の半順序 $\preceq$ に対し、対象を $P$ の元とし、各 $x,y\in P$ について

$$
\operatorname{Hom}(x,y)=
\begin{cases}
\{(x,y)\},&x\preceq y,\\
\varnothing,&x\npreceq y
\end{cases}
$$

> とする。$x\preceq y\preceq z$ のとき $(y,z)\circ(x,y)=(x,z)$ と定めると、これは小さい圏である。
<!-- formal-statement-end -->

### 証明の見取り図

反射律から $(x,x)$ があり、推移律から合成先 $(x,z)$ がある。三本を合成しても、始域・終域が同じ唯一の射に戻る。全射は $P\times P$ の部分集合である。

<!-- proof-start -->
### 証明

まず $x\preceq y$ と $y\preceq z$ なら、[半順序の推移律](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order)から $x\preceq z$ である。従って $(x,z)$ は指定された $\operatorname{Hom}(x,z)$ にあり、合成は閉じている。

反射律 $x\preceq x$ から $1_x:=(x,x)$ を取れる。$x\preceq y$ に対し

$$
(y,y)\circ(x,y)=(x,y),\qquad
(x,y)\circ(x,x)=(x,y)
$$

なので左右の単位律が成立する。さらに $w\preceq x\preceq y\preceq z$ のとき

$$
\begin{aligned}
((y,z)\circ(x,y))\circ(w,x)&=(w,z),\\
(y,z)\circ((x,y)\circ(w,x))&=(w,z)
\end{aligned}
$$

であり、結合則も満たす。全対象は集合 $P$、全射は

$$
\{(x,y)\in P\times P:x\preceq y\}
$$

という集合であるから小さい。$\square$
<!-- proof-end -->

ここでは矢印 $(x,y)$ は集合の元を送る関数ではなく、関係が成立することを表す記号である。証明で使ったのは反射律と推移律だけなので、[前順序](#def-cat1-02-preorder)にも同じ方法を適用できる。半順序にはさらに [反対称律](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order)があるが、圏の公理の証明には不要だった。

## 4. 一対象でも Hom は豊かになり得る

一対象 $*$ の圏では、すべての射が $*\to *$ である。このためどの二射も合成可能で、合成は一つの集まり $M=\operatorname{Hom}(*,*)$ 上の二項演算と同じになる。

まず $M=\{e,a\}$、$e$ を単位、$a\circ a=a$ とすれば、前講で確認した有限の一対象圏ができる。演算について必要なのは、結合則と左右の単位律だけである。このデータを代数の言葉でまとめておく。

<a id="def-cat1-02-monoid"></a>

<!-- formal-statement-start -->
> **定義（モノイド）**  
> 集合 $M$ と二項演算 $\ast:M\times M\to M$、元 $e\in M$ の組がモノイドであるとは、すべての $a,b,c\in M$ について

$$
(a\ast b)\ast c=a\ast(b\ast c),\qquad
e\ast a=a=a\ast e
$$

> が成立することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-02-monoid -->
**定義の確認**。$M=\{0,1\}$、$a\ast b=\max\{a,b\}$、$e=0$ とする。二元の最大値は再び $M$ に入る。三元の最大値は括弧付けに依らず、$\max(\max(a,b),c)=\max(a,\max(b,c))$ である。さらに $\max(0,a)=a=\max(a,0)$。従って定義の全条件を満たす。これは二元モノイドの直接例である。
<!-- definition-example-end -->

一般に $M$ が集合であるモノイドなら、次の構成が使える。

<a id="prop-cat1-02-one-object"></a>

<!-- formal-statement-start -->
> **命題（一対象圏の構成）**  
> 集合 $M$ と演算 $\ast:M\times M\to M$、元 $e\in M$ があり、すべての $a,b,c\in M$ について

$$
(a\ast b)\ast c=a\ast(b\ast c),\qquad
e\ast a=a=a\ast e
$$

> を満たすとする。対象を $\{*\}$、$\operatorname{Hom}(*,*)=M$、$g\circ f:=g\ast f$、$1_*:=e$ とすれば、小さい圏ができる。
<!-- formal-statement-end -->

### 証明の見取り図

合成の型の問題は一対象ゆえに起きない。演算の結合則と単位元が、圏の結合則と恒等射にそのまま対応する。

<!-- proof-start -->
### 証明

$f,g\in M$ なら $g\ast f\in M$ なので合成は閉じている。$f,g,h\in M$ に対し

$$
(h\circ g)\circ f=(h\ast g)\ast f
=h\ast(g\ast f)=h\circ(g\circ f)
$$

である。また

$$
1_*\circ f=e\ast f=f,\qquad
f\circ1_*=f\ast e=f.
$$

対象全体は一元集合、射全体は集合 $M$ なので小さい。$\square$
<!-- proof-end -->

一対象の圏は、射の演算としてモノイドの構造を見ている。ただし「対象が一つ」だけでは小ささは決まらない。第6節では Hom 自体が真の類になる例を作る。

## 5. $\mathbf{Set}$ は局所小だが小さくない

集合 $X,Y$ を固定してみよう。$X$ から $Y$ への写像 $f$ は、そのグラフ $\{(x,f(x)):x\in X\}$ で表せる。このグラフは $X\times Y$ の部分集合である。そこで、[冪集合公理](../../SET/SET1/index.md#axiom-set1-power-set)が保証する集合 $\mathcal P(X\times Y)$ の中から、「各 $x\in X$ にちょうど一つの $y\in Y$ が対応する」という条件で分出すればよい。

例えば $X=\{0,1\}$、$Y=\{a,b\}$ なら二つの入力値を別々に選べるので、写像は $2^2=4$ 個である。一方、$X,Y$ を任意の集合として変化させると、対象は「すべての集合」になる。

<a id="prop-cat1-02-set-size"></a>

<!-- formal-statement-start -->
> **命題（集合と写像の圏の大きさ）**  
> 集合を対象、集合間のすべての写像を射とする圏 $\mathbf{Set}$ は局所小圏だが、小さい圏ではない。
<!-- formal-statement-end -->

### 証明の見取り図

局所小性は、二つの集合を固定してその写像グラフを冪集合から切り出すことで示す。小さくないことは、対象の全体が集合ではないという [Russell の議論](../../SET/SET1/index.md#prop-set1-russell)で示す。

<!-- proof-start -->
### 証明

任意の集合 $X,Y$ を固定する。[直積集合](../../../基礎科目/F0/F0-00A/index.md#def-f0-00a-cartesian-product) $X\times Y$ は集合であり、[冪集合公理](../../SET/SET1/index.md#axiom-set1-power-set)からその冪集合も存在する。$G\subseteq X\times Y$ が写像のグラフであるための条件は

$$
\forall x\in X\ \exists! y\in Y\ ((x,y)\in G)
$$

である。この条件に対する [分出公理図式](../../SET/SET1/index.md#axiom-set1-separation)を適用すると

$$
\operatorname{Hom}_{\mathbf{Set}}(X,Y)
=\{G\in\mathcal P(X\times Y):
\forall x\in X\ \exists!y\in Y\ ((x,y)\in G)\}
$$

は集合である。$X,Y$ は任意なので $\mathbf{Set}$ は局所小である。

他方、$\operatorname{Ob}(\mathbf{Set})$ はすべての集合の集まりである。[真の類の定義例](../../SET/SET1/index.md#def-set1-proper-class)で確認した通り、これが集合なら Russell の矛盾が生じる。よって対象全体は集合でなく、$\mathbf{Set}$ は小さくない。$\square$
<!-- proof-end -->

局所小性は $\operatorname{Hom}_{\mathbf{Set}}(X,Y)$ を**固定した $X,Y$ ごとに**作れるという主張である。「すべての Hom を一つにまとめた集合がある」という主張ではない。

## 6. 一対象でも局所小でない圏

逆向きの注意も必要だ。対象が一つしかなくても、そこからそこへの射全体が集合になる保証はない。

一対象 $*$ を持ち、射として**すべての集合**を使うものを考える。二射 $f,g$ に対する合成を

$$
g\circ f:=g\cup f
$$

とし、恒等射を空集合とする。二集合の和は集合なので、任意の二射の合成は再び射である。集合の和の結合則と $\varnothing\cup f=f=f\cup\varnothing$ から、前講の圏の公理は満たされる。ところが $\operatorname{Hom}(*,*)$ はすべての集合という真の類である。

<a id="prop-cat1-02-large-hom"></a>

<!-- formal-statement-start -->
> **命題（対象が一つでも局所小でない例）**  
> 対象が $*$ の一つだけで、$\operatorname{Hom}(*,*)$ をすべての集合の類とし、$g\circ f=g\cup f$、$1_*=\varnothing$ とした構造は圏であるが、局所小圏ではない。
<!-- formal-statement-end -->

### 証明の見取り図

圏の公理は二集合の和についての等式へ帰着する。局所小性は唯一の Hom に対して判定でき、そこが真の類なので失敗する。

<!-- proof-start -->
### 証明

二つの射 $f,g$ は集合であるから、[対公理](../../SET/SET1/index.md#axiom-set1-pairing)と[和集合公理](../../SET/SET1/index.md#axiom-set1-union)により $g\cup f$ は集合で、合成が閉じている。三つの射について、任意の集合 $x$ に対し

$$
\begin{aligned}
x\in(h\cup g)\cup f
&\iff(x\in h\ \text{または}\ x\in g\ \text{または}\ x\in f)\\
&\iff x\in h\cup(g\cup f)
\end{aligned}
$$

だから、[外延性公理](../../SET/SET1/index.md#axiom-set1-extensionality)から $(h\cup g)\cup f=h\cup(g\cup f)$ となる。空集合は左右の単位元なので、結合則・単位律を満たし圏である。

しかし唯一の Hom は全集合の真の類であって集合ではない。従って局所小ではなく、小さくもない。$\square$
<!-- proof-end -->

対象が有限個だから小さい、という推論が誤りになることが分かる。各 Hom が集合かどうかを忘れずに調べたい。

## 7. 演習：対象全体と Hom を別々に調べる

### CAT1-02-A01 無限個の対象でも小さい

- Level: A

対象を自然数 $n\in\mathbb N$ とし、$\operatorname{Hom}(m,n)$ は $m=n$ のとき恒等射一本、$m\ne n$ のとき空とする。圏の公理を確認し、小さいか局所小か判定せよ。

<!-- solution-start -->
**詳細解答**。合成できるのは同じ対象の恒等射二本だけで、$1_n\circ1_n=1_n$ と定める。三射の合成も $1_n$ の三本の場合だけ存在し、どちらの括弧でも $1_n$ になる。単位律も同じ式で成立する。対象全体 $\mathbb N$ は集合、全射は $\{1_n:n\in\mathbb N\}$ という集合（自然数からの像として[置換公理図式](../../SET/SET1/index.md#axiom-set1-replacement)で得られる）である。よって小さい圏であり、[小さい圏は局所小圏という命題](#prop-cat1-02-small-local)により局所小でもある。対象が無限個でも「小さい」を妨げない。
<!-- solution-end -->

### CAT1-02-A02 三点の順序から射を列挙する

- Level: A

$P=\{0,1,2\}$ を $0\preceq1\preceq2$ の三点鎖とする。[半順序集合の圏](#prop-cat1-02-order-category)で $\operatorname{Hom}(2,0)$、$\operatorname{Hom}(0,2)$ と $\operatorname{Mor}$ を求め、小さいことを確かめよ。

<!-- solution-start -->
**詳細解答**。$2\npreceq0$ だから $\operatorname{Hom}(2,0)=\varnothing$、$0\preceq2$ だから $\operatorname{Hom}(0,2)=\{(0,2)\}$。全射を対で列挙すると

$$
\operatorname{Mor}=\{(0,0),(1,1),(2,2),(0,1),(1,2),(0,2)\}
$$

の六元集合である。全対象も三元集合 $P$ なので小さい。合成 $(1,2)\circ(0,1)=(0,2)$ が必要であり、矢印を省略すると合成の閉性が壊れる。
<!-- solution-end -->

### CAT1-02-A03 一対象の二元演算

- Level: A

$M=\{0,1\}$、$a\ast b=\max\{a,b\}$、$e=0$ とする。[一対象圏の構成](#prop-cat1-02-one-object)の仮定を値から確認し、$1\circ0$ と $1\circ1$ を求めよ。

<!-- solution-start -->
**詳細解答**。$a,b,c\in\{0,1\}$ に対し、$\max(\max(a,b),c)$ と $\max(a,\max(b,c))$ はどちらも三つの値の最大値なので等しい。$\max(0,a)=a=\max(a,0)$ より $0$ は左右単位元である。従って命題の仮定を満たす。合成は左の射と右の射の最大値だから

$$
1\circ0=\max(1,0)=1,\qquad
1\circ1=\max(1,1)=1.
$$

対象は一つ、射は二つなので小さく局所小である。
<!-- solution-end -->

### CAT1-02-A04 写像のグラフを数える

- Level: A

$X=\{0,1\}$、$Y=\{a,b\}$ とする。$\mathbf{Set}$ の $\operatorname{Hom}(X,Y)$ に属する四つの写像を、$X\times Y$ の部分集合（グラフ）としてすべて列挙せよ。

<!-- solution-start -->
**詳細解答**。$0,1$ のそれぞれについて $a$ または $b$ をちょうど一つ選ぶので、グラフは

$$
\begin{aligned}
&\{(0,a),(1,a)\},\quad \{(0,a),(1,b)\},\\
&\{(0,b),(1,a)\},\quad \{(0,b),(1,b)\}
\end{aligned}
$$

の四つである。各グラフは $X\times Y$ の部分集合であり、各 $x$ にちょうど一つの $y$ が対応する。逆にその条件を満たすグラフでは、$0,1$ の各行で一組ずつ選ぶ以外の可能性はない。よって列挙は完全であり Hom は四元集合である。これは $\mathbf{Set}$ の全対象が集合であることを意味しない。
<!-- solution-end -->

### CAT1-02-A05 空集合に関する Hom

- Level: A

任意の集合 $Y$ と、空でない集合 $X$ に対し、$\operatorname{Hom}_{\mathbf{Set}}(\varnothing,Y)$ と $\operatorname{Hom}_{\mathbf{Set}}(X,\varnothing)$ を求めよ。なぜどちらも集合と言えるか説明せよ。

<!-- solution-start -->
**詳細解答**。$\varnothing$ を始域とする写像は空のグラフだけである。空の入力に対する「ちょうど一つ」の条件は反例となる元がないため成立するので、$Y$ が空の場合を含め

$$
\operatorname{Hom}_{\mathbf{Set}}(\varnothing,Y)=\{\varnothing\}.
$$

一方 $X\ne\varnothing$ から $\varnothing$ への写像があれば、ある $x\in X$ に対応する値 $f(x)\in\varnothing$ が必要だが、そのような値はない。従って

$$
\operatorname{Hom}_{\mathbf{Set}}(X,\varnothing)=\varnothing.
$$

一元集合と空集合はいずれも集合である。$X=\varnothing$ の場合を勝手に後者へ含めないことが肝心である。
<!-- solution-end -->

### CAT1-02-B01 Hom が一元集合でも対象は大きくできる

- Level: B

すべての集合を対象とし、$X\to Y$ の射を $X\subseteq Y$ の場合にただ一本、そうでなければ一本も置かない構造を考える。合成と恒等射を定めて圏を作り、局所小だが小さくないことを証明せよ。

<!-- solution-start -->
**詳細解答**。$X\subseteq Y$ のときの唯一の射を $u_{XY}$ と書く。$X\subseteq X$ なので $1_X:=u_{XX}$ が存在する。$X\subseteq Y$ かつ $Y\subseteq Z$ なら包含の推移性から $X\subseteq Z$ である。そこで $u_{YZ}\circ u_{XY}:=u_{XZ}$ と定める。

四集合の包含 $W\subseteq X\subseteq Y\subseteq Z$ に対し、$(u_{YZ}\circ u_{XY})\circ u_{WX}$ も $u_{YZ}\circ(u_{XY}\circ u_{WX})$ も $u_{WZ}$ である。これで結合則が成り立つ。恒等射との合成は $u_{YY}\circ u_{XY}=u_{XY}=u_{XY}\circ u_{XX}$ であり単位律も成立する。

各 Hom は $\{u_{XY}\}$ または $\varnothing$ なので集合であり、局所小である。一方、対象全体はすべての集合の真の類であり、[SET1 の論証](../../SET/SET1/index.md#prop-set1-russell)から集合でない。従って小さくない。各 Hom が高々一本という条件は対象の大きさを制御しない。
<!-- solution-end -->

### CAT1-02-B02 局所小性だけから全射を集められない理由

- Level: B

対象の集合 $O=\{p,q\}$ を持つ局所小圏について、すべての射を集合として作る手順を書け。Hom が空集合でもよいことを含めて説明せよ。

<!-- solution-start -->
**詳細解答**。組を列挙すると $(p,p),(p,q),(q,p),(q,q)$ の四つである。局所小性により四つの Hom はすべて集合である。そこで

$$
M=\operatorname{Hom}(p,p)\cup\operatorname{Hom}(p,q)
\cup\operatorname{Hom}(q,p)\cup\operatorname{Hom}(q,q)
$$

と置く。有限個の集合の和は[対公理](../../SET/SET1/index.md#axiom-set1-pairing)と[和集合公理](../../SET/SET1/index.md#axiom-set1-union)で集合となる。各射には一意の始域・終域があるので、すべての射はいずれかの Hom に入り、逆にこの和の元はすべて射である。空の Hom があっても和へ元を加えないだけである。対象も集合 $O$ だから小さい。この例では有限和で済み、一般の [対象の集合性と局所小性の命題](#prop-cat1-02-object-set)では置換公理図式を使う。
<!-- solution-end -->

### CAT1-02-B03 写像は各組ごとには集合になる

- Level: B

集合 $X=\{1,2\}$ と $Y=\varnothing$ の場合、$\mathcal P(X\times Y)$ およびそのうち写像グラフを表す元を求めよ。$X=\varnothing$ と入れ替えた場合と比較し、[局所小性の証明](#prop-cat1-02-set-size)で全域性の条件が必要な理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$X\times Y=\varnothing$ だから $\mathcal P(X\times Y)=\{\varnothing\}$ である。しかし唯一の候補グラフ $G=\varnothing$ は $x=1\in X$ に対応する $y\in Y$ を持たず、条件 $\forall x\in X\ \exists!y\in Y$ に失敗する。従って写像の Hom は空集合である。

逆に $X=\varnothing$、$Y=\{1,2\}$ なら、同じ冪集合 $\{\varnothing\}$ の唯一の元 $G=\varnothing$ は、入力 $x$ が存在しないので全域性・一価性をともに満たし、Hom は $\{\varnothing\}$ である。冪集合のすべての部分集合が写像のグラフとは限らず、条件による分出が必要になる。どちらの Hom も集合である。
<!-- solution-end -->

### CAT1-02-B04 対象一個と Hom の大きさを切り分ける

- Level: B

対象を $*$ 一個とし、射をすべての集合、合成を集合の和、恒等射を空集合とする [本章の構成](#prop-cat1-02-large-hom)について、$f=\{1\}$、$g=\{1,2\}$、$h=\{2,3\}$ の三射の両方の括弧付けを計算し、この例が「小さい圏は局所小圏」の逆を示す反例にはならない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$g\circ f=g\cup f=\{1,2\}$、$h\circ g=h\cup g=\{1,2,3\}$ だから

$$
\begin{aligned}
(h\circ g)\circ f&=\{1,2,3\}\cup\{1\}=\{1,2,3\},\\
h\circ(g\circ f)&=\{2,3\}\cup\{1,2\}=\{1,2,3\}.
\end{aligned}
$$

この計算は結合則の具体例になっている。しかし $\operatorname{Hom}(*,*)$ はすべての集合の真の類なので局所小ではない。命題の逆「局所小なら小さい」への反例には、前提である局所小性を満たす例が必要である。[集合と写像の圏](#prop-cat1-02-set-size)や B01 の圏がその反例になる。
<!-- solution-end -->

### CAT1-02-C01 すべての有限集合の圏

- Level: C

有限集合をすべて対象とし、その間のすべての写像を射とする圏 $\mathbf{FinSet}_{\mathrm{all}}$ を考える。

1. 圏の公理と局所小性を示せ。二元集合から三元集合への Hom の射数も求めよ。
2. 対象はすべて有限集合なのに、この圏が小さくないことを証明せよ。ヒント：もし全有限集合からなる集合 $F$ があれば、$\bigcup F$ を考えよ。
3. この例と、対象が一個で Hom がすべての集合となる本章の例を比較し、「対象の性質」と「対象・射の集まりの集合性」が別物であることを説明せよ。

<!-- solution-start -->
**詳細解答**。

1. 有限集合も集合なので、任意の対象 $X,Y,Z$ の間の写像 $f:X\to Y$、$g:Y\to Z$ の合成 $g\circ f:X\to Z$ が存在する。恒等写像 $\operatorname{id}_X$ もある。[前講の集合と写像の圏の公理の証明](../CAT1-01/index.md#prop-cat1-01-set-category)を、有限集合という対象の条件を保って適用できる。特に合成の定義域・終域は有限集合のままで、結合則と左右単位律が成立する。各 Hom は [本章の集合グラフによる構成](#prop-cat1-02-set-size)と同じく $\mathcal P(X\times Y)$ から分出される集合である。二元集合から三元集合への写像は、それぞれの二つの入力に三通りの値を独立に選ぶから $3\cdot3=9$ 本である。

2. 全有限集合を元とする集合 $F$ があると仮定する。

   任意の集合 $x$ に対して一元集合 $\{x\}$ は有限なので、$\{x\}\in F$ である。さらに $x\in\{x\}$ だから

   $$
   x\in\bigcup F.
   $$

   $x$ は任意だったので $\bigcup F$ はすべての集合を元に持つ集合となる。しかし[SET1 の Russell の論証](../../SET/SET1/index.md#prop-set1-russell)に矛盾する。よって全有限集合は真の類であり、$\mathbf{FinSet}_{\mathrm{all}}$ は小さくない。

3. $\mathbf{FinSet}_{\mathrm{all}}$ は、個々の対象が有限で各 Hom が集合でも、対象の全体が集合でないため大きい。反対に一対象で全集合を射にした例は、対象全体は一元集合であっても唯一の Hom が真の類のため大きく、しかも局所小でない。集合性は、個々の対象に付けられた「有限」という性質や対象数の有限性と区別し、定義の各箇所で判定する必要がある。
<!-- solution-end -->

## 8. 何が整理できたか

「小さい」は対象**全体と射全体**が集合という条件、「局所小」は固定した二対象間の Hom が集合という条件である。小さい圏は局所小であるが、$\mathbf{Set}$ は局所小で小さくない。また、対象が一つでも Hom が真の類なら局所小ではない。

順序集合や一対象の演算から圏を作ると、圏の公理が反射・推移や結合・単位の条件として現れることも確かめた。次の **CAT1-03** では、射の間の方程式を使って同型・モノ射・エピ射を区別する。
