# CAT4-03 組紐・対称モノイダル圏

## 1. 括弧を付け替えることと、順番を交換することは違う

[モノイダル圏](../CAT4-01/index.md#def-cat4-01-monoidal)では、$A\otimes B$ の組み合わせ方を結合子 $\alpha$ で変更できる。[Mac Lane の整合性定理](../CAT4-02/index.md#thm-cat4-02-coherence)は、同じ語を保った括弧と単位の付け替えが、一意な構造射を定めることを保証した。しかし、$A\otimes B$ と $B\otimes A$ は語の順番が違う。前講の定理だけでは交換できない。

集合の直積には $(a,b)\mapsto(b,a)$ がある。このような交換を一般のモノイダル圏にも指定したい。ただし、二対象ごとに勝手な同型を選んでも、射と両立するとは限らず、三対象を異なる順番で交換したときの結果も一致しない。そこで **自然性** と二つの **hexagon 条件**を要求する。

本講では、射の型を固定して二つのhexagonを読み、集合の直積とベクトル空間のテンソル積で検算する。さらに、交換が二回で元に戻る「対称」と、それが必ずしも成り立たない「組紐」を分ける。合成 $gf$ は右から左へ読む。

## 2. 組紐の定義と二つのhexagon

### 2.1 交換は自然同型である

モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ を固定する。まず対象ごとに同型

$$
c_{A,B}:A\otimes B\longrightarrow B\otimes A
$$

を選ぶ。交換前後の各因子に射 $f:A\to A'$ と $g:B\to B'$ を作用させた結果が、交換する順番に依存してはいけない。そのためには、[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)の条件

$$
(g\otimes f)c_{A,B}=c_{A',B'}(f\otimes g)
$$

が必要である。両辺は $A\otimes B\to B'\otimes A'$ の射になる。

三対象の交換には二種類ある。「左端の $A$ を $B,C$ の両方の右へ動かす」操作と、「右端の $C$ を $A,B$ の両方の左へ動かす」操作である。どちらも全体を一度に交換する道と、隣り合う二つを順に交換する道が一致することを要求する。

<a id="def-cat4-03-braiding"></a>

<!-- formal-statement-start -->
> **定義（組紐モノイダル圏）**  
> モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ における **組紐**とは、二変数で自然な同型射の族 $c_{A,B}:A\otimes B\to B\otimes A$ であり、任意の対象 $A,B,C$ について次の二つの等式を満たすものをいう。
>
> **（H1）$A$ を $B\otimes C$ の右へ移すhexagon：**

$$
\begin{aligned}
c_{A,B\otimes C}
={}&\alpha^{-1}_{B,C,A}(1_B\otimes c_{A,C})\\
&\ \alpha_{B,A,C}(c_{A,B}\otimes1_C)
\alpha^{-1}_{A,B,C}.
\end{aligned}
$$

> **（H2）$A\otimes B$ を $C$ の右へ移すhexagon：**

$$
\begin{aligned}
c_{A\otimes B,C}
={}&\alpha_{C,A,B}(c_{A,C}\otimes1_B)\\
&\ \alpha^{-1}_{A,C,B}(1_A\otimes c_{B,C})
\alpha_{A,B,C}.
\end{aligned}
$$

> このデータを持つモノイダル圏を **組紐モノイダル圏**という。
<!-- formal-statement-end -->

式をただ暗記するのではなく、経路として読む。H1 の右辺は

$$
\begin{aligned}
A\otimes(B\otimes C)
&\xrightarrow{\alpha^{-1}_{A,B,C}}(A\otimes B)\otimes C\\
&\xrightarrow{c_{A,B}\otimes1_C}(B\otimes A)\otimes C\\
&\xrightarrow{\alpha_{B,A,C}}B\otimes(A\otimes C)\\
&\xrightarrow{1_B\otimes c_{A,C}}B\otimes(C\otimes A)\\
&\xrightarrow{\alpha^{-1}_{B,C,A}}(B\otimes C)\otimes A .
\end{aligned}
$$

H2 の右辺も同じように

$$
\begin{aligned}
(A\otimes B)\otimes C
&\xrightarrow{\alpha_{A,B,C}}A\otimes(B\otimes C)\\
&\xrightarrow{1_A\otimes c_{B,C}}A\otimes(C\otimes B)\\
&\xrightarrow{\alpha^{-1}_{A,C,B}}(A\otimes C)\otimes B\\
&\xrightarrow{c_{A,C}\otimes1_B}(C\otimes A)\otimes B\\
&\xrightarrow{\alpha_{C,A,B}}C\otimes(A\otimes B).
\end{aligned}
$$

したがって H1 は $A\otimes(B\otimes C)\to(B\otimes C)\otimes A$、H2 は $(A\otimes B)\otimes C\to C\otimes(A\otimes B)$ の等式であり、異なる始域の式を直接比較していない。

<!-- definition-example-start: def-cat4-03-braiding -->
**定義の確認（集合の直積）。** [有限積からのモノイダル構造](../CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)を $\mathbf{Set}$ に適用する。$I=\{*\}$、$\otimes=\times$ とし、$c_{A,B}(a,b)=(b,a)$ と定める。逆写像は $c_{B,A}$ なので同型である。任意の写像 $f:A\to A'$、$g:B\to B'$ に対して

$$
(g\times f)c_{A,B}(a,b)
=(g(b),f(a))
=c_{A',B'}(f\times g)(a,b)
$$

となるので自然である。H1 の左辺は $(a,(b,d))\mapsto((b,d),a)$、右辺は

$$
(a,(b,d))\mapsto((a,b),d)\mapsto((b,a),d)
\mapsto(b,(a,d))\mapsto(b,(d,a))
\mapsto((b,d),a)
$$

と移る。H2 の左辺は $((a,b),d)\mapsto(d,(a,b))$、右辺は

$$
((a,b),d)\mapsto(a,(b,d))\mapsto(a,(d,b))
\mapsto((a,d),b)\mapsto((d,a),b)
\mapsto(d,(a,b)).
$$

両hexagonがすべての元で成立した。単に交換が可逆であるだけでなく、自然性と二経路の一致を確かめたので組紐である。
<!-- definition-example-end -->

### 2.2 交換できないモノイダル圏

組紐はすべてのモノイダル圏に備わるわけではない。文字 $x,y$ の有限語（空語も含む）を対象とする離散圏を考え、テンソルを語の連結、単位を空語とする。結合と単位は文字列として厳密に成立するから、[厳密モノイダル圏](../CAT4-01/index.md#def-cat4-01-strict)である。しかし $x\otimes y=xy$ と $y\otimes x=yx$ は異なる語で、異なる対象間に射がない。ゆえに $c_{x,y}$ を作れず、組紐は存在しない。「結合できる」ことと「交換できる」ことは異なる。

## 3. もう一段の条件：対称性

組紐が存在しても、$A$ と $B$ を交換した後、$B$ と $A$ を交換したら必ず戻るとは限らない。$c_{A,B}^{-1}$ の存在は定義で保証されるが、それが *逆順の組紐* $c_{B,A}$ と同じかは別問題である。

<a id="def-cat4-03-symmetric"></a>

<!-- formal-statement-start -->
> **定義（対称モノイダル圏）**  
> 組紐モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho,c)$ が **対称モノイダル圏**であるとは、任意の対象 $A,B$ について

$$
c_{B,A}c_{A,B}=1_{A\otimes B}
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-03-symmetric -->
**定義の確認（集合の直積）。** 先の $\mathbf{Set}$ の組紐では

$$
(a,b)\xmapsto{c_{A,B}}(b,a)
\xmapsto{c_{B,A}}(a,b)
$$

であるから $c_{B,A}c_{A,B}=1_{A\times B}$。自然性とhexagonは前節で検算したので、$\mathbf{Set}$ は対称モノイダル圏である。
<!-- definition-example-end -->

<a id="prop-cat4-03-inverse"></a>

<!-- formal-statement-start -->
> **命題（対称性と逆組紐）**  
> 組紐モノイダル圏が対称であることと、すべての対象 $A,B$ に対し $c_{B,A}=c_{A,B}^{-1}$ であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

組紐の成分が同型であることと、対称性が指定する合成の等式を組み合わせる。

<!-- proof-start -->
### 証明

対称なら $c_{B,A}c_{A,B}=1_{A\otimes B}$ である。右から $c_{A,B}^{-1}$ を合成すると

$$
c_{B,A}=c_{A,B}^{-1}.
$$

逆にこの等式を仮定すると

$$
c_{B,A}c_{A,B}
=c_{A,B}^{-1}c_{A,B}=1_{A\otimes B}.
$$

逆射の型は $B\otimes A\to A\otimes B$ なので、比較する二射の型は一致する。$\square$
<!-- proof-end -->

## 4. テンソル積でも交換を構成する

集合の直積では元 $(a,b)$ を交換した。ベクトル空間では順序付き対の代わりに **純テンソル** $v\otimes w$ を交換する。ただしテンソル積の元はすべて純テンソルとは限らず、その有限和である。この違いを利用して、まず純テンソル上で写像を定義し、線形性によって全体へ延長する。

体 $k$ 上のベクトル空間 $V,W$ に対し、$V\otimes_k W$ は記号 $[v,w]$ の自由 $k$-ベクトル空間を、各変数について加法とスカラー倍が線形になる関係で割った商として作れる。$[v,w]$ の像を $v\otimes w$ と書く。例えば

$$
(v+v')\otimes w=v\otimes w+v'\otimes w,\qquad
(av)\otimes w=a(v\otimes w),
$$

そして第二変数についても同様の二つの関係が成り立つ。この四種類の関係は、写像を純テンソルで定義するときの **well-defined 性** の判定基準になる。

<a id="thm-cat4-03-tensor"></a>

<!-- formal-statement-start -->
> **定理（ベクトル空間のテンソル積の対称性）**  
> 体 $k$ 上のベクトル空間と線形写像の圏 $\mathbf{Vect}_k$ に、通常のテンソル積、単位対象 $k$、純テンソルの結び直しによる結合子と標準単位子を入れる。このモノイダル圏は、線形写像

$$
c_{V,W}:V\otimes_k W\longrightarrow W\otimes_k V,\qquad
v\otimes w\longmapsto w\otimes v
$$

> を組紐として対称モノイダル圏になる。
<!-- formal-statement-end -->

### 証明の見取り図

純テンソルで定義した交換が商の関係を保つことを最初に確かめる。次に、自然性と二つのhexagonを三つのベクトルから作った純テンソルで照合する。最後に二回交換すると元に戻ることを示す。

<!-- proof-start -->
### 証明

**(1) 定義できること。** 自由ベクトル空間の生成元 $[v,w]$ に $w\otimes v$ を対応させ、線形に延長する。第一変数の加法関係の像は

$$
w\otimes(v+v')-w\otimes v-w\otimes v'=0,
$$

スカラー関係の像は

$$
w\otimes(av)-a(w\otimes v)=0.
$$

第二変数の加法・スカラー関係も、移り先の第一変数についての関係により $0$ になる。したがって商 $V\otimes_k W$ 上に線形写像 $c_{V,W}$ が誘導される。$c_{W,V}$ を続けると $v\otimes w$ を自身へ戻すので、純テンソルが全体を張ることから互いに逆写像である。

**(2) 自然性。** $f:V\to V'$、$g:W\to W'$ を線形写像とする。純テンソル上で

$$
\begin{aligned}
(g\otimes f)c_{V,W}(v\otimes w)
&=g(w)\otimes f(v),\\
c_{V',W'}(f\otimes g)(v\otimes w)
&=c_{V',W'}(f(v)\otimes g(w))\\
&=g(w)\otimes f(v).
\end{aligned}
$$

よって自然性の等式は全テンソル上で成立する。

**(3) 結合子とhexagon。** 標準の結合子は

$$
\alpha_{U,V,W}((u\otimes v)\otimes w)
=u\otimes(v\otimes w)
$$

であり、逆は逆の結び直しである。純テンソルについてこの式が各変数で線形なため商上に定義でき、逆写像も同様に作れる。結合子・単位子の自然性、五角形・三角形はそれぞれ四重または三重の純テンソルと $k$ の単位元 $1$ の像をたどれば同じ順序のベクトルになり、生成元の一致から成立する。

H1 の始域の純テンソル $u\otimes(v\otimes w)$ に、[組紐の定義](#def-cat4-03-braiding)の右経路を実際に適用すると

$$
\begin{aligned}
u\otimes(v\otimes w)
&\longmapsto (u\otimes v)\otimes w\\
&\longmapsto (v\otimes u)\otimes w\\
&\longmapsto v\otimes(u\otimes w)\\
&\longmapsto v\otimes(w\otimes u)\\
&\longmapsto (v\otimes w)\otimes u.
\end{aligned}
$$

左経路 $c_{U,V\otimes W}$ も同じ像を与える。H2 についても始域 $(u\otimes v)\otimes w$ から

$$
\begin{aligned}
(u\otimes v)\otimes w
&\longmapsto u\otimes(v\otimes w)\\
&\longmapsto u\otimes(w\otimes v)\\
&\longmapsto (u\otimes w)\otimes v\\
&\longmapsto (w\otimes u)\otimes v\\
&\longmapsto w\otimes(u\otimes v)
\end{aligned}
$$

となり、左経路 $c_{U\otimes V,W}$ と等しい。三重の純テンソルが各三重テンソル積を張るので、二つのhexagonが全体で成立する。

**(4) 対称性。** 最後に

$$
c_{W,V}c_{V,W}(v\otimes w)
=c_{W,V}(w\otimes v)=v\otimes w.
$$

生成元で一致するので $c_{W,V}c_{V,W}=1_{V\otimes W}$。必要な全条件を確認できた。$\square$
<!-- proof-end -->

テンソル積の交換は単なる「成分の交換」ではない。商空間の関係と整合するため初めて、線形写像として存在する。また、$V\otimes W$ と $W\otimes V$ が文字どおり等しい空間だと仮定してはいない。

## 5. 組紐だが対称ではない例

直積もベクトル空間のテンソル積も対称だったが、組紐から対称性は自動的には出てこない。最小限の計算でその違いを見せる。

有理数の乗法群 $\mathbb Q^\times$ を使う圏 $\mathcal G$ を考える。対象は整数 $m\in\mathbb Z$、$m\ne n$ なら $\mathrm{Hom}(m,n)=\varnothing$、$\mathrm{Hom}(n,n)=\mathbb Q^\times$ とする。射の合成は有理数の積、恒等射は $1$。テンソルは対象上で $m\otimes n=m+n$、射上で $a\otimes b=ab$、単位対象は $0$ とする。

このテンソルが双関手なのは

$$
(a'a)\otimes(b'b)=a'a\,b'b
=(a'b')(ab)
=(a'\otimes b')(a\otimes b)
$$

という可換な有理数の積の等式から分かる。対象の加法は結合・単位が厳密であり、結合子と単位子を恒等射 $1$ とすると五角形・三角形も成立する。

<a id="prop-cat4-03-q-braiding"></a>

<!-- formal-statement-start -->
> **命題（対称とは限らない組紐）**  
> 上の厳密モノイダル圏 $\mathcal G$ と $q\in\mathbb Q^\times$ に対し、

$$
c_{m,n}=q^{mn}\in\mathrm{Hom}(m+n,n+m)
$$

> と置くと組紐になる。この組紐が対称であるための必要十分条件は $q^2=1$ である。特に $q=2$ は組紐だが対称ではない。
<!-- formal-statement-end -->

### 証明の見取り図

hexagon は厳密な圏では二つの指数法則に帰着する。二回の交換を計算して、$m=n=1$ ですでに対称性の成否が判定できる。

<!-- proof-start -->
### 証明

$c_{m,n}$ は非零有理数なので同型射であり、逆射は $q^{-mn}$。自然性を確認する。$f:m\to m'$ と $g:n\to n'$ が存在するのは $m=m'$、$n=n'$ の場合だけである。$f=a$、$g=b$ とすると

$$
(g\otimes f)c_{m,n}=ba\,q^{mn}
=q^{mn}ab=c_{m,n}(f\otimes g)
$$

である。$\alpha=1$ のため H1、H2 はそれぞれ

$$
c_{m,n+p}=c_{m,p}c_{m,n},\qquad
c_{m+n,p}=c_{m,p}c_{n,p}
$$

に簡約される。これは

$$
q^{m(n+p)}=q^{mp}q^{mn},\qquad
q^{(m+n)p}=q^{mp}q^{np}
$$

によって成立する。従って組紐である。

二回交換すると

$$
c_{n,m}c_{m,n}=q^{nm}q^{mn}=q^{2mn}.
$$

これが全 $m,n$ で恒等射 $1$ になるなら $m=n=1$ として $q^2=1$。逆に $q^2=1$ なら任意の整数 $mn$ に対して $q^{2mn}=(q^2)^{mn}=1$。ゆえに同値である。$q=2$ では $m=n=1$ で合成は $4\ne1$。$\square$
<!-- proof-end -->

ここで失われたのは **二回交換が恒等射になる条件**であり、自然性もhexagonも壊れていない。したがって「hexagonから対称性が出る」という推論は誤りである。$q=-1$ は符号を生むが $(-1)^2=1$ なので対称な例になる。

## 6. 三本を交換すると満たす関係

三つの因子を逆順に並べる際、まず左隣を交換する経路と右隣を交換する経路がある。この二経路が一致するのが **組紐関係（Yang–Baxter 型の関係）**である。ただし、ここでは同じ出発点と到着点を比較しているので、括弧付けを省略するときには既出の正準的な結び直しを用いる。

<a id="prop-cat4-03-braid-relation"></a>

<!-- formal-statement-start -->
> **命題（組紐関係）**  
> 任意の組紐モノイダル圏と対象 $A,B,C$ において、両辺を[正準的な結び直し](../CAT4-02/index.md#cor-cat4-02-canonical)で同じ括弧付けに移せば、次が成立する。

$$
\begin{aligned}
&(c_{B,C}\otimes1_A)(1_B\otimes c_{A,C})
(c_{A,B}\otimes1_C)\\
&\qquad=(1_C\otimes c_{A,B})(c_{A,C}\otimes1_B)
(1_A\otimes c_{B,C}).
\end{aligned}
$$

> 両辺は $A\otimes B\otimes C$ から $C\otimes B\otimes A$ への射を表す（必要な結合子は正準的に挿入する）。
<!-- formal-statement-end -->

### 証明の見取り図

$(B\otimes C)$ を一つの対象と見る交換に、$c_{B,C}$ に関する自然性を適用する。その前後でhexagonを展開すると、三回ずつの交換になる。

<!-- proof-start -->
### 証明

括弧を変えるための射は[整合性定理](../CAT4-02/index.md#thm-cat4-02-coherence)で一意である。以下では各式を共通の括弧付けへ運んだ記法を使う。具体的に H1、H2 はそれぞれ

$$
c_{A,B\otimes C}
=(1_B\otimes c_{A,C})(c_{A,B}\otimes1_C),
$$

$$
c_{A\otimes B,C}
=(c_{A,C}\otimes1_B)(1_A\otimes c_{B,C})
$$

と書ける。これらは結合子を忘れた公理ではなく、2節の各五段階の経路を同じ括弧へ移し替えた等式である。

次に、[組紐の自然性](#def-cat4-03-braiding)に対象対 $(A,B\otimes C)$ と射 $(1_A,c_{B,C})$ を代入する。$c_{B,C}:B\otimes C\to C\otimes B$ なので、型を保ったまま

$$
(c_{B,C}\otimes1_A)c_{A,B\otimes C}
=c_{A,C\otimes B}(1_A\otimes c_{B,C})
$$

となる。左辺の $c_{A,B\otimes C}$ に H1 を適用すると

$$
(c_{B,C}\otimes1_A)(1_B\otimes c_{A,C})
(c_{A,B}\otimes1_C).
$$

右辺の $c_{A,C\otimes B}$ に H1 を適用すると

$$
(1_C\otimes c_{A,B})(c_{A,C}\otimes1_B)
(1_A\otimes c_{B,C}).
$$

この二式が等しいので求める関係を得る。結合子の挿入箇所は2節のH1経路に沿っており、始域・終域はいずれも同じになる。$\square$
<!-- proof-end -->

この関係は「三本の線が同じ入れ替わり方をする」ことを意味するが、二回の交換が消えるとは言っていない。対称性はあくまで別の条件である。

## 7. 演習：交換の型と条件を紙上で確かめる

### 問題1：自然性の型

- Level: A
- 問題ID: CAT4-03-NATURALITY

$f:A\to A'$、$g:B\to B'$ に対して、$(g\otimes f)c_{A,B}$ と $c_{A',B'}(f\otimes g)$ の始域・終域を一段ずつ追い、なぜ $f\otimes g$ を $g\otimes f$ に置き換えてはいけないか答えよ。

<!-- solution-start -->
**詳細解答。** 第一経路は

$$
A\otimes B\xrightarrow{c_{A,B}}B\otimes A
\xrightarrow{g\otimes f}B'\otimes A'.
$$

第二経路は

$$
A\otimes B\xrightarrow{f\otimes g}A'\otimes B'
\xrightarrow{c_{A',B'}}B'\otimes A'.
$$

したがって両辺は $A\otimes B\to B'\otimes A'$ の射。最初から $g\otimes f$ を始域 $A\otimes B$ に適用するには $g:A\to B'$、$f:B\to A'$ が必要だが、与えた型ではそうではない。[テンソル双関手](../CAT4-01/index.md#def-cat4-01-tensor-bifunctor)は順序を勝手に変えない。
<!-- solution-end -->

### 問題2：二回交換する条件

- Level: A
- 問題ID: CAT4-03-DOUBLE-SWAP

$\mathbf{Set}$ で $A=\{0,1\}$、$B=\{x,y,z\}$ とし、直積の組紐で $(1,z)$ を二回交換せよ。最初の交換とその逆射を型で区別せよ。

<!-- solution-start -->
**詳細解答。** $c_{A,B}:A\times B\to B\times A$ は $(1,z)\mapsto(z,1)$。次の $c_{B,A}:B\times A\to A\times B$ は $(z,1)\mapsto(1,z)$。したがって

$$
c_{B,A}c_{A,B}(1,z)=(1,z).
$$

すべての組に同じ計算が成り立つため、写像として恒等射である。逆射の型も $B\times A\to A\times B$ であり、この具体例では $c_{B,A}=c_{A,B}^{-1}$。
<!-- solution-end -->

### 問題3：H2の各段階

- Level: A
- 問題ID: CAT4-03-HEXAGON-TYPES

組紐のH2を $(A\otimes B)\otimes C$ から出発して五段階の始域・終域で書き、最後が $C\otimes(A\otimes B)$ になることを確かめよ。

<!-- solution-start -->
**詳細解答。** [組紐の定義](#def-cat4-03-braiding)に従い

$$
\begin{aligned}
(A\otimes B)\otimes C
&\xrightarrow{\alpha_{A,B,C}}A\otimes(B\otimes C)\\
&\xrightarrow{1_A\otimes c_{B,C}}A\otimes(C\otimes B)\\
&\xrightarrow{\alpha^{-1}_{A,C,B}}(A\otimes C)\otimes B\\
&\xrightarrow{c_{A,C}\otimes1_B}(C\otimes A)\otimes B\\
&\xrightarrow{\alpha_{C,A,B}}C\otimes(A\otimes B).
\end{aligned}
$$

各段の終域が次の始域に一致する。全体の射は左辺 $c_{A\otimes B,C}$ と同じ型である。特に三段目には $\alpha^{-1}$ が必要で、$\alpha$ では型が合わない。
<!-- solution-end -->

### 問題4：組紐を持たない語の圏

- Level: A
- 問題ID: CAT4-03-WORD-OBSTRUCTION

文字 $x,y$ の語を対象、恒等射だけを射、連結をテンソルとする圏で、モノイダル構造は存在するのに組紐は存在しないことを定義から説明せよ。

<!-- solution-start -->
**詳細解答。** 任意の語 $u,v,w$ で $(uv)w=u(vw)$、空語 $\varepsilon$ で $\varepsilon u=u\varepsilon=u$。恒等射の連結は恒等射なので双関手律も満たし、$\alpha,\lambda,\rho$ を恒等射にできる。一方、$xy$ と $yx$ は異なる対象で、この二対象間のHom集合は空である。必要な射 $c_{x,y}:xy\to yx$ 自体を選べない。失敗はhexagon以前の **組紐の成分の不存在** にある。
<!-- solution-end -->

### 問題5：$q$ による二度の交換

- Level: A
- 問題ID: CAT4-03-Q-DOUBLE

5節の圏 $\mathcal G$ と $q=2$ について、$c_{1,2}$、$c_{2,1}$ と合成を求め、対称性との違いを述べよ。

<!-- solution-start -->
**詳細解答。** $1\otimes2=3=2\otimes1$ は同じ整数対象でも、Hom$(3,3)=\mathbb Q^\times$ の射は一つに限らない。公式から

$$
c_{1,2}=2^{1\cdot2}=4,\quad
c_{2,1}=2^{2\cdot1}=4,\quad
c_{2,1}c_{1,2}=4\cdot4=16.
$$

恒等射は $1$ なので $16\ne1$。両成分は逆射 $1/4$ を持つが、逆順の組紐は逆射と異なる。この点が組紐と対称性の差である。
<!-- solution-end -->

### 問題6：テンソルの交換を商上で定義する

- Level: B
- 問題ID: CAT4-03-TENSOR-QUOTIENT

$V\otimes_k W$ を4節の自由ベクトル空間の商として構成する。$[v,w]\mapsto w\otimes v$ が、第二変数の加法関係とスカラー関係も $0$ に送ることを示し、逆写像を明示せよ。

<!-- solution-start -->
**詳細解答。** 第二変数の加法関係は $[v,w+w']-[v,w]-[v,w']$ で、交換先では

$$
(w+w')\otimes v-w\otimes v-w'\otimes v=0.
$$

これは $W\otimes V$ の第一変数の線形性による。スカラー関係 $[v,aw]-a[v,w]$ の像も

$$
(aw)\otimes v-a(w\otimes v)=0
$$

である。第一変数の二種類の関係は交換先の第二変数の線形性に帰着する。したがって商上で写像 $c_{V,W}$ が定まる。逆候補 $c_{W,V}$ は $w\otimes v\mapsto v\otimes w$ とし、両合成はすべての純テンソルを固定する。純テンソルが全体を張るので両合成は恒等射であり逆写像である。
<!-- solution-end -->

### 問題7：三本の交換関係を自然性から導く

- Level: B
- 問題ID: CAT4-03-BRAID-PROOF

組紐モノイダル圏の対象 $A,B,C$ について、$c_{B,C}:B\otimes C\to C\otimes B$ に自然性を適用し、H1で展開して三本の組紐関係を再構成せよ。括弧付けは正準同型を介して省略してよい。

<!-- solution-start -->
**詳細解答。** [自然性](#def-cat4-03-braiding)で $f=1_A$、$g=c_{B,C}$ を選ぶと

$$
(c_{B,C}\otimes1_A)c_{A,B\otimes C}
=c_{A,C\otimes B}(1_A\otimes c_{B,C}).
$$

左側の H1 展開は

$$
c_{A,B\otimes C}
=(1_B\otimes c_{A,C})(c_{A,B}\otimes1_C),
$$

右側は $B,C$ を入れ替えて

$$
c_{A,C\otimes B}
=(1_C\otimes c_{A,B})(c_{A,C}\otimes1_B).
$$

これらを順に代入し、

$$
\begin{aligned}
&(c_{B,C}\otimes1_A)(1_B\otimes c_{A,C})(c_{A,B}\otimes1_C)\\
&=(1_C\otimes c_{A,B})(c_{A,C}\otimes1_B)(1_A\otimes c_{B,C})
\end{aligned}
$$

を得る。[結び直しの一意性](../CAT4-02/index.md#cor-cat4-02-canonical)によって、式中の各 $\alpha$ の挿入は固定できる。使った条件は自然性とH1であり、対称性は仮定していない。
<!-- solution-end -->

### 問題8：テンソル積のH2と自然性

- Level: B
- 問題ID: CAT4-03-TENSOR-HEXAGON

$k$-ベクトル空間 $U,V,W$ の標準の結合子・組紐について、H2の両経路の像を純テンソルで計算せよ。さらに線形写像 $f:U\to U'$ と $g:V\to V'$ に対して自然性を示せ。

<!-- solution-start -->
**詳細解答。** H2の左経路は

$$
c_{U\otimes V,W}((u\otimes v)\otimes w)
=w\otimes(u\otimes v).
$$

右経路は結合子で $u\otimes(v\otimes w)$ にし、$1_U\otimes c_{V,W}$ で $u\otimes(w\otimes v)$、逆結合子で $(u\otimes w)\otimes v$、$c_{U,W}\otimes1_V$ で $(w\otimes u)\otimes v$、最後の結合子で $w\otimes(u\otimes v)$ となる。二経路はすべての三重純テンソルで等しく、それらが全体を張るため線形写像として等しい。自然性は

$$
\begin{aligned}
(g\otimes f)c_{U,V}(u\otimes v)&=g(v)\otimes f(u),\\
c_{U',V'}(f\otimes g)(u\otimes v)&=c_{U',V'}(f(u)\otimes g(v))\\
&=g(v)\otimes f(u).
\end{aligned}
$$

よって成立する。純テンソルで定義した写像のwell-defined性は[本章の定理](#thm-cat4-03-tensor)の証明 (1) による。
<!-- solution-end -->

### 問題9：整数次数上の組紐を分類する

- Level: C
- 問題ID: CAT4-03-CLASSIFY-BRAIDINGS

5節の厳密モノイダル圏 $\mathcal G$ において、各 $m,n\in\mathbb Z$ に任意の非零有理数 $b(m,n)$ を対応させ、$c_{m,n}=b(m,n)$ とする。すべての組紐が **ある $q\in\mathbb Q^\times$ に対して $b(m,n)=q^{mn}$** と書けることを示し、対称になる $q$ を分類せよ。負の整数次数も含めること。

<!-- solution-start -->
**詳細解答。** この圏では、各成分 $b(m,n)\in\mathbb Q^\times$ は自動的に可逆である。異なる整数間に射がないため、自然性の検査は同じ対象上の $a,b\in\mathbb Q^\times$ に限られる。$\mathbb Q^\times$ が可換なので

$$
(ba)b(m,n)=b(m,n)(ab)
$$

となり自然性は常に成立する。残る二つのhexagonは、結合子が恒等であることから

$$
b(m,n+p)=b(m,n)b(m,p),\qquad
b(m+n,p)=b(m,p)b(n,p)
$$

となる。したがって二変数それぞれについて整数の加法から有理数の乗法への準同型性を持つ。

まず $m=0$ とすると $b(0,n)=b(0,n)^2$。非零なので $b(0,n)=1$。同様に $b(m,0)=1$。$q=b(1,1)$ とおく。第二の等式で $p=1$ を固定し、$m$ を整数で増減させると

$$
b(m,1)=q^m
$$

が従う。正の整数は帰納法で、負の整数は $b(m,1)b(-m,1)=b(0,1)=1$ から導く。次に第一の等式で $m$ を固定し、同様に正負の $n$ に対して

$$
b(m,n)=b(m,1)^n=(q^m)^n=q^{mn}
$$

となる。従ってすべての組紐はこの形に限る。逆向きには、[本章の命題](#prop-cat4-03-q-braiding)の証明で任意の $q\ne0$ が二つのhexagonを満たすことを確認した。

対称性は

$$
b(n,m)b(m,n)=q^{nm}q^{mn}=q^{2mn}=1
$$

がすべての整数 $m,n$ で成り立つこと。$m=n=1$ により $q^2=1$ が必要で、この条件は任意の整数 $mn$ に対して十分である。有理数体では $q^2-1=(q-1)(q+1)=0$ なので $q=1$ または $q=-1$ に限られる。$q=1$ は交換がすべて恒等射、$q=-1$ は次数の積が奇数のとき符号 $-1$ を与える対称組紐である。
<!-- solution-end -->

## 8. 次講への橋渡し

[整合性定理](../CAT4-02/index.md#thm-cat4-02-coherence)で扱えたのは、括弧・単位の付け替えまでだった。本講で自然な交換を追加すると、三本の交換経路の一致まで証明できる。ただし逆順に交換して戻るかどうかは追加条件であり、組紐と対称性は区別しなければならない。

次講 CAT4-04 では、テンソルの構造を別の圏へ運ぶ **モノイダル関手**と、同じ圏の内部で乗法と単位を持つ **モノイド対象**を扱う。

参考：Saunders Mac Lane, *Categories for the Working Mathematician*, 2nd ed., Chapter XI；[Etingof ほか *Tensor Categories*](https://math.mit.edu/~etingof/egnobookfinal.pdf)。
