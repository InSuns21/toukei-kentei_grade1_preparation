# GRP1 抽象代数 I：可逆な演算と対称性

<!-- definition-example-audit: strict -->

[F0-00A](../F0_00A_集合_写像_上限下限/index.md) では、集合、直積集合、写像、全単射、合成写像を扱いました。本章では、集合の上に一つの二項演算を置き、その演算が「元を組み合わせ、単位操作があり、逆向きにも戻れる」ための最小公理を抽出します。

## 1. 最小公理を置く

集合 $G$ 上の二項演算とは、[直積集合](../F0_00A_集合_写像_上限下限/index.md#def-f0-00a-cartesian-product)からの写像

$$
G\times G\to G
$$

のことです。二つの元 $a,b\in G$ に対する値を $ab$ と書きます。

<a id="def-grp1-group"></a>
<!-- formal-statement-start -->
> **定義（群・可換群）**
>
> 集合 $G$ と二項演算 $(a,b)\mapsto ab$ の組を考える。次の三条件を満たすとき、$G$ を **群**という。
>
> 1. **結合則**
>    $$
>    (ab)c=a(bc)
>    \qquad
>    (a,b,c\in G).
>    $$
> 2. **単位元の存在**
>    ある $e\in G$ が存在して
>    $$
>    ea=ae=a
>    \qquad
>    (a\in G)
>    $$
>    を満たす。
> 3. **逆元の存在**
>    各 $a\in G$ に対してある $b\in G$ が存在して
>    $$
>    ab=ba=e
>    $$
>    を満たす。
>
> さらに
> $$
> ab=ba
> \qquad
> (a,b\in G)
> $$
> が成り立つとき、$G$ を **可換群**という。
<!-- formal-statement-end -->

群論の最初の目標は、抽象記号だけを覚えることではありません。

- 整数の加法
- 法 $n$ の加法
- 集合上の全単射の合成
- 正多角形を回す操作と反転

が、同じ公理の下で同じ証明を共有することを確認します。

本章では、まず公理から基本法則を導き、次に「大きな構造の中の小さな構造」「一つの元から生成される構造」「全単射の合成による具体例」「左移動による全単射表現」という順に進みます。

> **この章の停止線**
>
> 積を保つ写像の一般論、核・像、剰余類、Lagrange の定理、商構造、同型定理は GRP2 で扱います。本章では左移動が積を保存する単射になるところまでを直接確かめ、一般理論へは進みません。

<!-- definition-example-start: def-grp1-group -->
**定義の確認**

例：整数の加法

$G=\mathbb Z$ とし、演算を加法とします。この場合は積の記号ではなく $a+b$ と書きます。

結合則は

$$
(a+b)+c=a+(b+c)
$$

です。単位元は $0$ で、

$$
0+a=a+0=a.
$$

$a$ の逆元は $-a$ で、

$$
a+(-a)=(-a)+a=0.
$$

さらに $a+b=b+a$ なので、$(\mathbb Z,+)$ は可換群です。

ここでは三公理を全部確認しました。「いつもの整数だから群」と名前だけで済ませないのが定義確認です。
<!-- definition-example-end -->

### 法 n の加法も群になる

$n\ge2$ とし、

$$
\mathbb Z_n=\{0,1,\ldots,n-1\}
$$

を考えます。$a\oplus b$ を $a+b$ を $n$ で割った余りと定めると、$\mathbb Z_n$ は可換群になります。

単位元は $0$ です。$a\ne0$ に対する逆元は $n-a$ で、

$$
a\oplus(n-a)=0.
$$

たとえば $\mathbb Z_5$ では $2$ の逆元は $3$ です。

---

## 2. 群公理から最初に何が出るか

群の定義では「ある単位元」「ある逆元」としか言っていません。しかし実際には一意です。

<a id="prop-grp1-basic-identities"></a>
<!-- formal-statement-start -->
> **命題（単位元・逆元の一意性と消去法則）**
>
> $G$ を群とする。
>
> 1. 単位元は一意である。
> 2. 各 $a\in G$ の逆元は一意である。これを $a^{-1}$ と書く。
> 3. $ab=ac$ なら $b=c$、また $ba=ca$ なら $b=c$ である。
> 4.
>    $$
>    (ab)^{-1}=b^{-1}a^{-1}.
>    $$
<!-- formal-statement-end -->

### 証明の見取り図

一意性は「候補を二つ置き、互いの defining property を代入する」ことで示します。消去は逆元を同じ側から掛けます。積の逆元では順序が反転することが重要です。

<!-- proof-start -->
### 証明

単位元 $e,e'$ がともに存在するとします。$e$ が単位元なので

$$
ee'=e',
$$

一方 $e'$ が単位元なので

$$
ee'=e.
$$

従って $e=e'$ です。

次に $b,c$ がともに $a$ の逆元とします。すると

$$
ab=ba=e,
\qquad
ac=ca=e.
$$

よって結合則を使って

$$
b
=
be
=
b(ac)
=
(ba)c
=
ec
=
c.
$$

従って逆元も一意です。

左消去について $ab=ac$ とします。両辺の左から $a^{-1}$ を掛けると

$$
a^{-1}(ab)=a^{-1}(ac).
$$

結合則より

$$
(a^{-1}a)b=(a^{-1}a)c,
$$

従って

$$
eb=ec,
$$

すなわち $b=c$ です。右消去も同様に、右から $a^{-1}$ を掛ければ得られます。

最後に

$$
(ab)(b^{-1}a^{-1})
=
a(bb^{-1})a^{-1}
=
aea^{-1}
=
e.
$$

また

$$
(b^{-1}a^{-1})(ab)
=
b^{-1}(a^{-1}a)b
=
b^{-1}eb
=
e.
$$

従って逆元の一意性から

$$
(ab)^{-1}=b^{-1}a^{-1}.
$$

$\square$
<!-- proof-end -->

この命題だけでも、群では方程式

$$
ax=b
$$

が必ず一意に解け、

$$
x=a^{-1}b
$$

となることが分かります。群とは、演算に関して「戻る操作」が常に存在する構造です。

---

## 3. 部分集合がそのまま群になる条件

大きな群の中から、小さな群を切り出したい場面が頻繁にあります。

<a id="def-grp1-subgroup"></a>
<!-- formal-statement-start -->
> **定義（部分群）**
>
> $G$ を群とする。部分集合 $H\subset G$ が、$G$ の演算を $H$ に制限したとき群になるなら、$H$ を $G$ の **部分群**といい、
>
> $$
> H\le G
> $$
>
> と書く。
<!-- formal-statement-end -->

定義どおり確認するなら結合則、単位元、逆元、演算で閉じることを全部確かめる必要があります。しかし結合則は $G$ から自動的に受け継がれます。さらに三つの確認を一つへまとめられます。

<a id="thm-grp1-subgroup-test"></a>
<!-- formal-statement-start -->
> **定理（部分群判定）**
>
> $G$ を群、$H\subset G$ を空でない部分集合とする。このとき次は同値である。
>
> 1. $H\le G$。
> 2. 任意の $x,y\in H$ に対して
>    $$
>    xy^{-1}\in H
>    $$
>    が成り立つ。
<!-- formal-statement-end -->

### なぜ $xy^{-1}$ だけで足りるのか

$x=y$ と置けば単位元が出ます。単位元と $y$ を組み合わせれば逆元が出ます。その後で逆元をもう一度使えば積についての閉性が出ます。

<!-- proof-start -->
### 証明

$H$ が部分群なら、$y\in H$ から $y^{-1}\in H$ であり、積について閉じているので $xy^{-1}\in H$ です。

逆に、$H$ は空でないので $h\in H$ を一つ取れます。仮定に $x=y=h$ を入れると

$$
hh^{-1}=e\in H.
$$

次に任意の $y\in H$ に対し、$x=e$ と置けば

$$
ey^{-1}=y^{-1}\in H.
$$

従って $H$ は逆元について閉じています。

さらに任意の $x,y\in H$ に対し、今示したことから $y^{-1}\in H$ です。部分群判定の仮定を $x$ と $y^{-1}$ に適用すると

$$
x(y^{-1})^{-1}=xy\in H.
$$

従って積についても閉じています。結合則は $G$ から継承され、$e\in H$ と各元の逆元も $H$ にあるので、$H$ は群です。

$\square$
<!-- proof-end -->

<!-- definition-example-start: def-grp1-subgroup -->
**定義の確認**

例：偶数全体

$(\mathbb Z,+)$ の部分集合

$$
2\mathbb Z=\{2k:k\in\mathbb Z\}
$$

を考えます。$x=2m,y=2n$ とすると、加法記法で部分群判定の $xy^{-1}$ は

$$
x-y=2m-2n=2(m-n)\in2\mathbb Z.
$$

また $2\mathbb Z$ は空でありません。従って

$$
2\mathbb Z\le\mathbb Z.
$$
<!-- definition-example-end -->

### 反例：正の整数は部分群ではない

正の整数全体 $\mathbb Z_{>0}$ は加法について閉じています。しかし $1$ の逆元である $-1$ を含みません。

ここで失われたのは逆元の存在です。部分群判定で見ると

$$
1-2=-1\notin\mathbb Z_{>0}.
$$

「演算で閉じている」だけでは部分群にならないことが分かります。

---

## 4. 一つの元から作れる範囲

群の中でいくつかの元だけを与え、その元から積と逆元を何回でも作ることを考えます。

<a id="def-grp1-generated-subgroup"></a>
<!-- formal-statement-start -->
> **定義（生成部分群）**
>
> $G$ を群、$S\subset G$ とする。$S$ の元とその逆元を有限個並べて得られる積、および空積 $e$ の全体を
>
> $$
> \langle S\rangle
> $$
>
> と書く。これを $S$ が **生成する部分群**という。
>
> $S=\{a\}$ のときは
>
> $$
> \langle a\rangle
> =
> \{a^m:m\in\mathbb Z\}
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-generated-subgroup -->
**定義の確認**

例：$(\mathbb Z,+)$ で $2$ が生成する部分群

加法群では冪の代わりに整数倍を使うので、

$
\langle2\rangle
=
\{2m:m\in\mathbb Z\}
=
2\mathbb Z.
$

実際、$2\mathbb Z$ は $2$ を含む部分群です。また $2$ を含む任意の部分群 $H\le\mathbb Z$ は、加法と逆元について閉じているため $2m$ をすべて含みます。従って $2\mathbb Z$ は $2$ を含む最小の部分群です。
<!-- definition-example-end -->

この定義で、負の指数は

$
a^{-m}=(a^{-1})^m
\qquad(m>0)
$

を意味し、$a^0=e$ とします。

ここで「部分群」と呼んでよいことも確認しておきます。$\langle S\rangle$ は空積 $e$ を含むので空ではありません。$x,y\in\langle S\rangle$ はともに $S$ の元とその逆元の有限積です。したがって $y^{-1}$ は $y$ の因子を逆順に並べて各因子を逆元へ替えた有限積になり、$xy^{-1}$ も同じ種類の有限積です。[部分群判定](#thm-grp1-subgroup-test)より

$
\langle S\rangle\le G.
$

さらに $S\subset H\le G$ なら、$H$ は積と逆元について閉じているため $S$ の元から作る有限積をすべて含みます。従って $\langle S\rangle\subset H$ です。つまり $\langle S\rangle$ は $S$ を含む最小の部分群です。

<a id="prop-grp1-cyclic-basic"></a>
<!-- formal-statement-start -->
> **命題（巡回部分群の基本性質）**
>
> $G$ を群、$a\in G$ とする。
>
> 1. $\langle a\rangle$ は $G$ の部分群である。
> 2. $a$ を含む任意の部分群 $H\le G$ に対して
>    $$
>    \langle a\rangle\subset H
>    $$
>    である。
>
> 従って $\langle a\rangle$ は $a$ を含む最小の部分群である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $a^m,a^n\in\langle a\rangle$ に対して

$$
a^m(a^n)^{-1}
=
a^ma^{-n}
=
a^{m-n}
\in
\langle a\rangle.
$$

$\langle a\rangle$ は $e=a^0$ を含むので空でありません。[部分群判定](#thm-grp1-subgroup-test)より $\langle a\rangle\le G$ です。

次に $H\le G$ が $a$ を含むとします。部分群は積と逆元について閉じているので、$a$ の正の冪、$e$、負の冪をすべて含みます。従って

$$
\langle a\rangle\subset H.
$$

$\square$
<!-- proof-end -->

<a id="def-grp1-element-order"></a>
<!-- formal-statement-start -->
> **定義（元の位数）**
>
> $G$ を群、$a\in G$ とする。
>
> $$
> a^m=e
> $$
>
> を満たす正整数 $m$ が存在するとき、その最小のものを $a$ の **位数**といい、
>
> $$
> \operatorname{ord}(a)=m
> $$
>
> と書く。そのような正整数が存在しないとき、$a$ は無限位数を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-element-order -->
**定義の確認**

例：$\mathbb Z_8$ の元 $2$

加法群 $\mathbb Z_8$ では、冪の代わりに整数倍を使います。

$$
2,\ 2+2=4,\ 2+2+2=6,\ 2+2+2+2=0
\pmod 8.
$$

正の整数 $1,2,3$ 回では $0$ に戻らず、4回で初めて $0$ に戻るので

$$
\operatorname{ord}(2)=4.
$$
<!-- definition-example-end -->

---

## 5. 一元で全体を生成できる場合

<a id="def-grp1-cyclic-group"></a>
<!-- formal-statement-start -->
> **定義（巡回群）**
>
> 群 $G$ にある元 $g\in G$ が存在して
>
> $$
> G=\langle g\rangle
> $$
>
> となるとき、$G$ を **巡回群**といい、$g$ を生成元という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-cyclic-group -->
**定義の確認**

例：$\mathbb Z_{12}$ は巡回群

加法群 $\mathbb Z_{12}$ で $1$ を繰り返し足すと

$$
0,1,2,\ldots,11
$$

をすべて得ます。従って

$$
\mathbb Z_{12}=\langle1\rangle.
$$

一方 $4$ から得られるのは

$$
0,4,8
$$

だけなので、$4$ は $\mathbb Z_{12}$ 全体の生成元ではありません。
<!-- definition-example-end -->

巡回群は部分群まで巡回群です。ここが最初の構造定理です。

<a id="thm-grp1-cyclic-subgroups"></a>
<!-- formal-statement-start -->
> **定理（巡回群の部分群構造）**
>
> $G=\langle g\rangle$ を巡回群とし、$H\le G$ とする。
>
> 1. $H$ も巡回群である。
> 2. $G$ が無限巡回群なら、各部分群はある $m\ge0$ に対して
>    $$
>    H=\langle g^m\rangle
>    $$
>    と一意に書ける。$m=0$ は自明部分群 $\{e\}$ を表す。
> 3. $G$ が有限で $\operatorname{ord}(g)=n$ なら、$H$ はある約数 $m\mid n$ に対して
>    $$
>    H=\langle g^m\rangle
>    $$
>    と書ける。また $\langle g^m\rangle$ の元の個数は $n/m$ である。
> 4. 従って有限巡回群には、各約数 $d\mid n$ に対して元の個数が $d$ の部分群がちょうど一つあり、それは
>    $$
>    \langle g^{n/d}\rangle
>    $$
>    である。
<!-- formal-statement-end -->

### 証明の見取り図

$H$ に単位元以外があれば、$g^k\in H$ となる正整数 $k$ の最小値 $m$ を取ります。任意の指数 $q$ を $m$ で割り、余りが正なら最小性に反することを使います。

<!-- proof-start -->
### 証明

まず $H=\{e\}$ なら $H=\langle e\rangle$ で巡回群です。以下 $H\ne\{e\}$ とします。

$G=\langle g\rangle$ なので、$H$ の任意の元は $g^k$ の形です。$H$ は逆元について閉じているため、$g^k\in H$ なら $g^{-k}\in H$ です。従って $g^m\in H$ となる正整数 $m$ が存在し、その中で最小の $m$ を取れます。

まず

$$
\langle g^m\rangle\subset H
$$

です。実際 $g^m\in H$ で、$H$ は部分群だからその整数冪をすべて含みます。

逆包含を示します。任意の $g^k\in H$ を取ります。整数の除法により

$$
k=qm+r,
\qquad
0\le r<m
$$

と書けます。このとき

$$
g^r
=
g^k(g^m)^{-q}.
$$

右辺の二つの因子は $H$ に属するため $g^r\in H$ です。もし $r>0$ なら、$g^r\in H$ となる正整数 $r<m$ が存在し、$m$ の最小性に反します。従って $r=0$ です。

よって $m\mid k$ であり、

$$
g^k\in\langle g^m\rangle.
$$

従って

$$
H=\langle g^m\rangle.
$$

無限巡回群では $g^a=g^b$ なら $a=b$ なので、最小正指数 $m$ は $H$ から一意に決まります。

次に $\operatorname{ord}(g)=n<\infty$ とします。$e=g^n\in H$ です。$n=qm+r$、$0\le r<m$ と割ると上と同じ議論で $g^r\in H$ となり、最小性から $r=0$ です。従って

$$
m\mid n.
$$

$n=md$ と書きます。$g^m$ の冪

$$
e,g^m,g^{2m},\ldots,g^{(d-1)m}
$$

は互いに異なります。もし $g^{im}=g^{jm}$、$0\le i<j<d$ なら

$$
g^{(j-i)m}=e.
$$

しかし

$$
0<(j-i)m<dm=n
$$

であり、$n=\operatorname{ord}(g)$ の最小性に反します。一方

$$
(g^m)^d=g^n=e
$$

なので、$\langle g^m\rangle$ の元はちょうど $d=n/m$ 個です。

最後に $d\mid n$ とします。$m=n/d$ と置けば $\langle g^m\rangle$ は $d$ 個の元を持ちます。逆に $H$ が $d$ 個の元を持つ部分群なら、上で $H=\langle g^m\rangle$ かつ $|H|=n/m=d$ なので $m=n/d$ です。従って一意です。

$\square$
<!-- proof-end -->

この定理は Lagrange の定理を使っていません。GRP2 で Lagrange の定理を証明すると、「有限群の部分群の大きさは群の大きさを割る」という一般原理へ拡張されます。

---

## 6. 二つの群を並べる：直積

<a id="def-grp1-direct-product"></a>
<!-- formal-statement-start -->
> **定義（群の直積）**
>
> $G,H$ を群とする。直積集合 $G\times H$ に
>
> $$
> (g,h)(g',h')
> :=
> (gg',hh')
> $$
>
> と成分ごとの演算を入れる。これを $G$ と $H$ の **直積群**という。
<!-- formal-statement-end -->

<a id="prop-grp1-direct-product"></a>
<!-- formal-statement-start -->
> **命題（直積群）**
>
> $G,H$ が群なら、上の成分ごとの演算により $G\times H$ は群になる。単位元は $(e_G,e_H)$、$(g,h)$ の逆元は
>
> $$
> (g,h)^{-1}=(g^{-1},h^{-1})
> $$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

三元 $(g_1,h_1),(g_2,h_2),(g_3,h_3)$ に対して

$$
\begin{aligned}
((g_1,h_1)(g_2,h_2))(g_3,h_3)
&=
((g_1g_2)g_3,(h_1h_2)h_3)\\
&=
(g_1(g_2g_3),h_1(h_2h_3))\\
&=
(g_1,h_1)((g_2,h_2)(g_3,h_3)).
\end{aligned}
$$

従って結合則が成り立ちます。

また

$$
(e_G,e_H)(g,h)
=
(e_Gg,e_Hh)
=
(g,h)
$$

で、右から掛けても同様です。

さらに

$$
(g,h)(g^{-1},h^{-1})
=
(gg^{-1},hh^{-1})
=
(e_G,e_H),
$$

逆順でも同じです。従って群です。

$\square$
<!-- proof-end -->

<!-- definition-example-start: def-grp1-direct-product -->
**定義の確認**

例：$\mathbb Z_2\times\mathbb Z_3$

加法記法で

$$
(1,1)+(1,1)
=
(0,2),
$$

さらに足すと

$$
(1,0),(0,1),(1,2),(0,0)
$$

と進み、6回で初めて $(0,0)$ に戻ります。従って $(1,1)$ は6個すべての元を生成します。
<!-- definition-example-end -->

---

## 7. 全単射を合成する

集合 $X$ から $X$ への全単射を合成すると、また全単射になります。逆写像も全単射です。

<a id="def-grp1-symmetric-group"></a>
<!-- formal-statement-start -->
> **定義（置換と対称群）**
>
> 集合 $X$ から $X$ への全単射を $X$ の **置換**という。
>
> $X$ の全置換の集合を
>
> $$
> \operatorname{Sym}(X)
> $$
>
> と書き、写像の合成を演算として **対称群**と呼ぶ。
>
> $X=\{1,\ldots,n\}$ のときは
>
> $$
> S_n:=\operatorname{Sym}(X)
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-symmetric-group -->
**定義の確認**

例：$S_3$

置換

$$
\sigma:
1\mapsto2,\quad
2\mapsto3,\quad
3\mapsto1
$$

は全単射です。その逆写像は

$$
\sigma^{-1}:
1\mapsto3,\quad
2\mapsto1,\quad
3\mapsto2.
$$

従って $\sigma,\sigma^{-1}\in S_3$ で、

$$
\sigma\circ\sigma^{-1}
=
\operatorname{id}.
$$

写像合成の結合則は既知なので、$S_3$ は群です。
<!-- definition-example-end -->

以後、置換の積 $\sigma\tau$ は写像合成

$$
\sigma\circ\tau
$$

を意味し、右側の $\tau$ を先に作用させます。

---

## 8. 有限集合上の作用を輪に分解する

<a id="def-grp1-cycle"></a>
<!-- formal-statement-start -->
> **定義（巡回置換と互いに素な巡回置換）**
>
> 相異なる $a_1,\ldots,a_k$ に対し、
>
> $$
> a_1\mapsto a_2,\ 
> a_2\mapsto a_3,\ \ldots,\
> a_{k-1}\mapsto a_k,\ 
> a_k\mapsto a_1
> $$
>
> と動かし、それ以外の点を固定する置換を
>
> $$
> (a_1\,a_2\,\cdots\,a_k)
> $$
>
> と書き、$k$-巡回置換という。
>
> 二つの巡回置換が動かす点の集合を共有しないとき、それらを **互いに素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-cycle -->
**定義の確認**

例：$S_5$ の $(1\,4\,3)$ と $(2\,5)$

$
(1\,4\,3):
1\mapsto4,\quad
4\mapsto3,\quad
3\mapsto1
$

で、$2,5$ は固定されます。従って $(1\,4\,3)$ は3-巡回置換です。

一方 $(2\,5)$ が動かす点は $\{2,5\}$ で、$(1\,4\,3)$ が動かす $\{1,3,4\}$ と交わりません。よって二つは互いに素です。
<!-- definition-example-end -->

互いに素な巡回置換は可換です。なぜなら各点について、片方が動かすならもう片方は固定し、両方が固定する点では何も起きないからです。

<a id="thm-grp1-disjoint-cycles"></a>
<!-- formal-statement-start -->
> **定理（有限置換の互いに素な巡回置換への分解）**
>
> $\sigma\in S_n$ とする。$\sigma$ は、長さ2以上の互いに素な巡回置換の積として書ける。
>
> さらに巡回置換の順序と各巡回置換の巡回表示の開始点を除けば、この分解は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $i$ から

$$
i,\sigma(i),\sigma^2(i),\ldots
$$

と追います。有限集合なのでいつか同じ点に戻ります。全単射性により、初めて戻る点は出発点 $i$ でなければなりません。こうして一つの巡回置換が得られます。

<!-- proof-start -->
### 証明

$i\in\{1,\ldots,n\}$ を固定します。列

$$
i,\sigma(i),\sigma^2(i),\ldots
$$

は有限集合の中を動くので、ある $r<s$ で

$$
\sigma^r(i)=\sigma^s(i)
$$

となります。$\sigma^{-r}$ を両辺へ作用させると

$$
i=\sigma^{s-r}(i).
$$

従って $i$ は有限回で $i$ 自身へ戻ります。最小の正整数 $m$ を取ると

$$
i,\sigma(i),\ldots,\sigma^{m-1}(i)
$$

は相異なり、一つの巡回置換を作ります。

次に、この巡回に含まれない点 $j$ を取ります。$j$ から同じ構成をすると、新しい巡回は前の巡回と点を共有しません。もし共有点 $x$ があれば、ある整数 $p,q$ に対して

$$
x=\sigma^p(i)=\sigma^q(j)
$$

となり、逆向きにたどれば $j$ は $i$ の巡回に入ってしまうからです。

この操作を未処理の点がなくなるまで繰り返せば、互いに素な巡回置換の積で $\sigma$ が得られます。固定点は長さ1の巡回として省略できます。

一意性について、各点 $i$ が属する巡回は

$$
\{\sigma^k(i):k\in\mathbb Z\}
$$

によって $\sigma$ 自身から一意に決まります。従って巡回の点集合も、その中での移り方も $\sigma$ から決まり、残る自由度は巡回を並べる順序と、同じ巡回をどの点から書き始めるかだけです。

$\square$
<!-- proof-end -->

### 例

$$
\sigma=
\begin{pmatrix}
1&2&3&4&5&6&7\\
2&3&1&5&4&7&6
\end{pmatrix}
$$

なら

$$
1\to2\to3\to1,
$$

$$
4\leftrightarrow5,
\qquad
6\leftrightarrow7
$$

なので

$$
\sigma=(1\,2\,3)(4\,5)(6\,7).
$$

---

## 9. 二点交換から偶奇を作る

<a id="def-grp1-transposition"></a>
<!-- formal-statement-start -->
> **定義（互換）**
>
> $S_n$ の置換のうち、相異なる二点 $i,j$ だけを交換し、それ以外の点を固定する置換
>
> $
> (i\,j)
> $
>
> を **互換**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-transposition -->
**定義の確認**

例：$(1\,4)$

$S_5$ の置換 $(1\,4)$ は

$
1\mapsto4,\qquad
4\mapsto1
$

とし、$2,3,5$ は固定します。従って動かす点がちょうど二つの互換です。
<!-- definition-example-end -->

置換が互換何個の積で書けるかは一意ではありません。しかし、その個数の偶奇は変わりません。これを示すため、まず置換自身から計算できる量を使います。

$\sigma\in S_n$ に対して、

$$
i<j,
\qquad
\sigma(i)>\sigma(j)
$$

を満たす組 $(i,j)$ を **転倒（inversion）**と呼び、その個数を $N(\sigma)$ とします。

<a id="def-grp1-parity"></a>
<!-- formal-statement-start -->
> **定義（置換の偶奇・交代群）**
>
> $\sigma\in S_n$ に対し
>
> $$
> \operatorname{sgn}(\sigma)
> :=
> (-1)^{N(\sigma)}
> $$
>
> と定める。
>
> $\operatorname{sgn}(\sigma)=1$ のとき $\sigma$ を **偶置換**、
> $\operatorname{sgn}(\sigma)=-1$ のとき **奇置換**という。
>
> 偶置換全体を
>
> $$
> A_n
> :=
> \{\sigma\in S_n:\operatorname{sgn}(\sigma)=1\}
> $$
>
> と書き、**交代群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-parity -->
**定義の確認**

例：$(1\,2\,3)$

$\sigma=(1\,2\,3)$ は一列表記では

$$
(2,3,1).
$$

転倒は

$$
(1,3),\quad(2,3)
$$

の2個なので

$$
N(\sigma)=2,
\qquad
\operatorname{sgn}(\sigma)=1.
$$

従って $(1\,2\,3)$ は偶置換です。
<!-- definition-example-end -->

<a id="thm-grp1-parity"></a>
<!-- formal-statement-start -->
> **定理（置換の偶奇の一意性）**
>
> $\sigma\in S_n$ とする。
>
> 1. $\sigma$ は有限個の互換の積として書ける。
> 2. $\sigma$ を
>    $$
>    \sigma=\tau_1\cdots\tau_k
>    $$
>    と互換の積で表したとき、
>    $$
>    (-1)^k=\operatorname{sgn}(\sigma).
>    $$
>    従って互換分解に現れる互換の個数の偶奇は分解の仕方によらない。
> 3. 任意の $\sigma,\rho\in S_n$ に対して
>    $$
>    \operatorname{sgn}(\sigma\rho)
>    =
>    \operatorname{sgn}(\sigma)
>    \operatorname{sgn}(\rho).
>    $$
> 4. $A_n\le S_n$。
<!-- formal-statement-end -->

### 証明の見取り図

隣り合う二点を交換する互換を使って、一列表記を昇順へ並べ替えます。隣接交換は 転倒数をちょうど1だけ変えます。したがって必要な交換回数の偶奇は最初の 転倒数で決まります。

<!-- proof-start -->
### 証明

まず任意の置換 $\sigma$ の一列表記

$$
(\sigma(1),\ldots,\sigma(n))
$$

を考えます。隣り合う逆転

$$
\cdots,a,b,\cdots
\qquad
(a>b)
$$

があれば、その二項を交換します。この操作は 転倒数をちょうど1減らします。

実際、交換した二項どうしの 転倒が一つ消えます。また、それ以外の値 $c$ と $a,b$ の大小関係は、$a,b$ の位置が隣接しているため、二項をまとめた 転倒の総数を変えません。

転倒数は非負整数なので、この操作は有限回で停止します。停止した一列表記には 転倒がなく、

$$
(1,2,\ldots,n)
$$

です。従って逆向きにたどれば、$\sigma$ は隣接互換の積として書けます。

隣接互換を一つ掛けるたび 転倒数の偶奇が反転するので、$\sigma$ を隣接互換 $k$ 個で作れば

$$
(-1)^k=(-1)^{N(\sigma)}.
$$

次に一般の互換 $(i\,j)$、$i<j$ を考えます。これは隣接互換を使って

$$
(i\,j)
=
(i\,i+1)(i+1\,i+2)\cdots(j-1\,j)
(j-2\,j-1)\cdots(i\,i+1)
$$

と書けます。右辺の互換数は

$$
(j-i)+(j-i-1)=2(j-i)-1
$$

で奇数です。従って任意の互換は 符号が $-1$ です。

$\sigma=\tau_1\cdots\tau_k$ が任意の互換分解なら、各 $\tau_i$ を上の隣接互換分解に置き換えると、それぞれ奇数個の隣接互換になるため、全体の隣接互換数の偶奇は $k$ と同じです。一方その偶奇は $N(\sigma)$ の偶奇に等しいので

$$
(-1)^k=(-1)^{N(\sigma)}.
$$

従って偶奇は分解に依存しません。

$\sigma,\rho$ をそれぞれ $k,\ell$ 個の互換で書けば、$\sigma\rho$ は $k+\ell$ 個の互換で書けるので

$$
\operatorname{sgn}(\sigma\rho)
=
(-1)^{k+\ell}
=
(-1)^k(-1)^\ell
=
\operatorname{sgn}(\sigma)\operatorname{sgn}(\rho).
$$

最後に $A_n$ が部分群であることを[部分群判定](#thm-grp1-subgroup-test)で示します。$\sigma,\rho\in A_n$ なら

$$
\operatorname{sgn}(\sigma\rho^{-1})
=
\operatorname{sgn}(\sigma)
\operatorname{sgn}(\rho^{-1}).
$$

$\rho\rho^{-1}=\operatorname{id}$ であり、上で示した $\operatorname{sgn}(\alpha\beta)=\operatorname{sgn}(\alpha)\operatorname{sgn}(\beta)$ を使うと

$$
1
=
\operatorname{sgn}(\rho)\operatorname{sgn}(\rho^{-1}),
$$

$\operatorname{sgn}(\rho)=1$ より $\operatorname{sgn}(\rho^{-1})=1$ です。従って

$$
\operatorname{sgn}(\sigma\rho^{-1})=1,
$$

つまり $\sigma\rho^{-1}\in A_n$ です。$A_n$ は空でないので[部分群判定](#thm-grp1-subgroup-test)より

$$
A_n\le S_n.
$$

$\square$
<!-- proof-end -->

---

## 10. 正多角形の対称性を一つの構造にまとめる

$n\ge3$ とします。正 $n$ 角形の頂点を

$$
\mathbb Z_n=\{0,1,\ldots,n-1\}
$$

で番号付けします。

一頂点分だけ正の向きへ回す置換 $r$ と反転 $s$ を

$$
r(k)=k+1\pmod n,
$$

$$
s(k)=-k\pmod n
$$

で定めます。

<a id="def-grp1-dihedral"></a>
<!-- formal-statement-start -->
> **定義（二面体群）**
>
> 上の置換 $r,s\in S_n$ が生成する部分群
>
> $$
> D_n:=\langle r,s\rangle
> $$
>
> を正 $n$ 角形の **二面体群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp1-dihedral -->
**定義の確認**

例：$D_4$

正方形では

$$
r=(0\,1\,2\,3),
$$

反転 $s(k)=-k\pmod4$ は

$$
s=(1\,3)
$$

です。

直接計算すると

$$
r^4=e,
\qquad
s^2=e.
$$

また各頂点 $k$ に対して

$$
srs(k)
=
s(r(-k))
=
s(-k+1)
=
k-1
=
r^{-1}(k),
$$

なので

$$
srs=r^{-1}.
$$
<!-- definition-example-end -->

<a id="prop-grp1-dihedral-normal-form"></a>
<!-- formal-statement-start -->
> **命題（二面体群の標準形）**
>
> $n\ge3$ とし、$D_n=\langle r,s\rangle$ を上で定めた二面体群とする。
>
> $$
> r^n=e,\qquad s^2=e,\qquad srs=r^{-1}
> $$
>
> が成り立ち、$D_n$ の任意の元はちょうど一通り
>
> $$
> r^k
> \quad\text{または}\quad
> sr^k
> \qquad
> (0\le k<n)
> $$
>
> と書ける。
>
> 従って $D_n$ の元の個数は $2n$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から $r^n=e$、$s^2=e$ です。また先ほど頂点への作用を直接計算して

$$
srs=r^{-1}
$$

を得ました。両辺の右から $s$ を掛けると

$$
sr=r^{-1}s.
$$

同値に

$$
rs=sr^{-1}.
$$

従って $r$ と $s$ からなる任意の有限積では、関係式 $rs=sr^{-1}$ を繰り返し使って、すべての $s$ を左端へ移動できます。さらに $s^2=e$ なので、左端に残る $s$ は0個か1個です。$r^n=e$ により指数は $0,\ldots,n-1$ に直せます。

従って任意の元は

$$
r^k
\quad\text{または}\quad
sr^k
$$

の形になります。

一意性を示します。$r^i=r^j$ なら

$$
r^{i-j}=e.
$$

$r$ は頂点を一つずつ回すので $\operatorname{ord}(r)=n$ です。従って $0\le i,j<n$ なら $i=j$ です。

同様に $sr^i=sr^j$ なら左から $s$ を掛けて $r^i=r^j$ となるので $i=j$ です。

最後に $r^i=sr^j$ は起こりません。もし成り立てば

$$
s=r^{i-j}
$$

となります。しかし $r^{i-j}$ は向きを保つ対称変換なので頂点間の巡回順序を保ち、$s$ は $k\mapsto-k$ という反転です。具体的には $s(0)=0$ ですが、非自明な $r^m$ は $0$ を固定しません。一方 $r^0=e$ は $1$ を固定しますが $s(1)=-1\not\equiv1\pmod n$ です。従って矛盾です。

よって $2n$ 個の標準形はすべて異なります。

$\square$
<!-- proof-end -->

---

## 11. 左移動で抽象構造を置換として実現する

ここまで、置換群は群の重要な具体例でした。驚くべきことに、任意の抽象群は置換群の部分群として見ることができます。

$G$ を群とし、各 $a\in G$ に対して写像

$$
L_a:G\to G,
\qquad
L_a(x)=ax
$$

を考えます。これを左移動と呼びます。

$L_a$ は全単射です。実際、逆写像は

$$
L_{a^{-1}}
$$

です。

<a id="thm-grp1-cayley"></a>
<!-- formal-statement-start -->
> **定理（Cayley の定理）**
>
> $G$ を任意の群とする。各 $a\in G$ に左移動
>
> $$
> L_a(x)=ax
> $$
>
> を対応させる写像
>
> $$
> \lambda:G\to\operatorname{Sym}(G),
> \qquad
> \lambda(a)=L_a
> $$
>
> を考える。このとき
>
> $$
> L_{ab}=L_a\circ L_b
> $$
>
> が成り立ち、$\lambda$ は単射である。
>
> さらに
>
> $$
> \lambda(G)=\{L_a:a\in G\}
> $$
>
> は $\operatorname{Sym}(G)$ の部分群である。
>
> 従って任意の群の乗法は、ある集合上の置換の合成として忠実に実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

群の積 $ab$ を左移動へ送ると、「まず $b$ を掛け、次に $a$ を掛ける」合成になります。単射性は左移動が単位元 $e$ をどこへ送るかを見るだけで分かります。

<!-- proof-start -->
### 証明

任意の $x\in G$ に対して

$$
L_{ab}(x)
=
(ab)x
=
a(bx)
=
L_a(L_b(x)).
$$

従って写像として

$$
L_{ab}=L_a\circ L_b.
$$

次に $\lambda$ の単射性を示します。$L_a=L_b$ とします。両写像を単位元 $e$ に作用させると

$$
a
=
ae
=
L_a(e)
=
L_b(e)
=
be
=
b.
$$

従って $a=b$ です。

最後に $\lambda(G)$ が部分群であることを示します。$L_a,L_b\in\lambda(G)$ に対して

$$
L_a(L_b)^{-1}
=
L_aL_{b^{-1}}
=
L_{ab^{-1}}
\in\lambda(G).
$$

また $L_e\in\lambda(G)$ なので空ではありません。[部分群判定](#thm-grp1-subgroup-test)より

$$
\lambda(G)\le\operatorname{Sym}(G).
$$

$\square$
<!-- proof-end -->

Cayley の定理は「抽象群という新しい怪物を作った」のではなく、「置換群に共通する構造だけを抜き出した」と読むこともできます。

GRP2 では、等式

$
\lambda(ab)=\lambda(a)\lambda(b)
$

のように積を保つ写像を一般的に扱い、核・像・商構造へ進みます。Cayley の定理で現れた $\lambda$ は、その一般論の最初の具体例になります。

---

## 12. 具体例を一枚に並べる

ここまでの代表例を整理します。

| 群 | 演算 | 単位元 | 逆元 | 特徴 |
|---|---|---|---|---|
| $\mathbb Z$ | 加法 | $0$ | $-a$ | 無限巡回群 |
| $\mathbb Z_n$ | 法 $n$ の加法 | $0$ | $-a\bmod n$ | 有限巡回群 |
| $G\times H$ | 成分ごとの積 | $(e_G,e_H)$ | $(g^{-1},h^{-1})$ | 二つの群を並べる |
| $S_n$ | 置換の合成 | 恒等置換 | 逆置換 | 一般に非可換 |
| $A_n$ | 置換の合成 | 恒等置換 | 逆置換 | 偶置換全体 |
| $D_n$ | 正 $n$ 角形の対称性の合成 | 恒等変換 | 逆の対称性 | 向きを保つ対称性と反転 |

特に

$$
S_3
$$

は最小の非可換対称群です。たとえば

$$
(1\,2)(2\,3)
\ne
(2\,3)(1\,2).
$$

実際、右側から先に作用させると

$$
(1\,2)(2\,3)=(1\,2\,3),
$$

$$
(2\,3)(1\,2)=(1\,3\,2).
$$

---

## 13. 演習

### Level A

#### GRP1-A01 法4の加法群を定義から確認する
- Level: A

集合

$$
\mathbb Z_4=\{0,1,2,3\}
$$

に法4の加法 $\oplus$ を入れる。

1. 単位元を求めよ。
2. 各元の逆元を求めよ。
3. $1$ と $2$ の位数を求めよ。
4. $\mathbb Z_4$ が可換群であることを説明せよ。

<!-- solution-start -->
##### 詳細解答

単位元は $0$ です。任意の $a\in\mathbb Z_4$ に対して

$$
0\oplus a=a\oplus0=a.
$$

各元の逆元は

$$
0^{-1}=0,
\qquad
1^{-1}=3,
\qquad
2^{-1}=2,
\qquad
3^{-1}=1
$$

です。ここで逆元記号は加法群でも群の一般記号として書いています。

$1$ について

$$
1,\quad
1\oplus1=2,\quad
1\oplus1\oplus1=3,\quad
1\oplus1\oplus1\oplus1=0.
$$

従って

$$
\operatorname{ord}(1)=4.
$$

$2$ について

$$
2\ne0,
\qquad
2\oplus2=0
$$

なので

$$
\operatorname{ord}(2)=2.
$$

結合則は整数の加法の結合則を法4で読んでも保たれます。また

$$
a\oplus b=b\oplus a
$$

なので可換です。以上から $\mathbb Z_4$ は可換群です。
<!-- solution-end -->

#### GRP1-A02 部分群判定を使う
- Level: A

$(\mathbb Z,+)$ の部分集合

$$
H=3\mathbb Z
=
\{3k:k\in\mathbb Z\}
$$

が部分群であることを[部分群判定](#thm-grp1-subgroup-test)から示せ。

一方、

$$
K=\{0,1,2,\ldots\}
$$

が部分群でないことも同じ判定から示せ。

<!-- solution-start -->
##### 詳細解答

$H$ は $0=3\cdot0$ を含むので空ではありません。

任意の $x,y\in H$ を取ると、ある $m,n\in\mathbb Z$ が存在して

$$
x=3m,
\qquad
y=3n.
$$

加法記法で部分群判定の $xy^{-1}$ は $x-y$ なので

$$
x-y
=
3m-3n
=
3(m-n)
\in3\mathbb Z.
$$

従って

$$
3\mathbb Z\le\mathbb Z.
$$

次に $K$ を考えます。$0,1\in K$ ですが

$$
0-1=-1\notin K.
$$

従って部分群判定の条件が破れています。よって $K$ は部分群ではありません。

ここで壊れている群公理は逆元の存在です。特に $1$ の加法逆元 $-1$ が $K$ にありません。
<!-- solution-end -->

#### GRP1-A03 $\mathbb Z_{12}$ の元の位数を求める
- Level: A

加法群 $\mathbb Z_{12}$ で、$2,3,4,5$ の位数をそれぞれ求めよ。

<!-- solution-start -->
##### 詳細解答

加法群では、$a$ の位数は

$$
ma\equiv0\pmod{12}
$$

となる最小の正整数 $m$ です。

$a=2$ では

$$
2,4,6,8,10,0
$$

と進むので

$$
\operatorname{ord}(2)=6.
$$

$a=3$ では

$$
3,6,9,0
$$

なので

$$
\operatorname{ord}(3)=4.
$$

$a=4$ では

$$
4,8,0
$$

なので

$$
\operatorname{ord}(4)=3.
$$

$a=5$ では

$$
5,10,3,8,1,6,11,4,9,2,7,0.
$$

11回目までは0でなく、12回目で0になるので

$$
\operatorname{ord}(5)=12.
$$

したがって $5$ は $\mathbb Z_{12}$ の生成元です。
<!-- solution-end -->

#### GRP1-A04 置換を分解し偶奇を判定する
- Level: A

$\sigma\in S_7$ を

$$
\sigma=
\begin{pmatrix}
1&2&3&4&5&6&7\\
3&1&2&5&4&7&6
\end{pmatrix}
$$

で定める。

1. $\sigma$ を互いに素な巡回置換の積へ分解せよ。
2. 互換の積へ分解せよ。
3. $\sigma$ の偶奇を判定せよ。

<!-- solution-start -->
##### 詳細解答

まず $1$ から追います。

$$
1\mapsto3,\qquad
3\mapsto2,\qquad
2\mapsto1.
$$

従って一つ目の巡回置換は

$$
(1\,3\,2).
$$

次に

$$
4\mapsto5,\qquad5\mapsto4
$$

なので

$$
(4\,5).
$$

さらに

$$
6\mapsto7,\qquad7\mapsto6
$$

なので

$$
(6\,7).
$$

従って

$$
\boxed{
\sigma=(1\,3\,2)(4\,5)(6\,7)
}.
$$

3-巡回置換は

$$
(1\,3\,2)
=
(1\,2)(1\,3)
$$

と互換2個の積に書けます。従って

$$
\sigma
=
(1\,2)(1\,3)(4\,5)(6\,7).
$$

互換が4個なので偶置換です。

よって

$$
\boxed{
\sigma\in A_7
}.
$$
<!-- solution-end -->

### Level B

#### GRP1-B01 一元から生成される部分群を全部書く
- Level: B

加法群 $\mathbb Z_{18}$ で

$$
H=\langle8\rangle
$$

とする。

1. $H$ の元をすべて書け。
2. $8$ の位数を求めよ。
3. $\langle8\rangle=\langle2\rangle$ を示せ。
4. $8$ は $\mathbb Z_{18}$ 全体の生成元ではない理由を説明せよ。

<!-- solution-start -->
##### 詳細解答

$8$ を繰り返し足します。

$$
0,
8,
16,
24\equiv6,
14,
22\equiv4,
12,
20\equiv2,
10,
18\equiv0
\pmod{18}.
$$

従って

$$
H=
\{0,2,4,6,8,10,12,14,16\}.
$$

0へ初めて戻るのは9回目なので

$$
\operatorname{ord}(8)=9.
$$

次に $\langle2\rangle$ は

$$
0,2,4,\ldots,16
$$

という偶数剰余全体です。これは上で得た $H$ と同じなので

$$
\langle8\rangle=\langle2\rangle.
$$

$\mathbb Z_{18}$ は18個の元を持ちますが、$\langle8\rangle$ は9個の元しか持ちません。従って $8$ は $\mathbb Z_{18}$ 全体を生成しません。
<!-- solution-end -->

#### GRP1-B02 12元巡回群の部分群を分類する
- Level: B

$G=\langle g\rangle$、$\operatorname{ord}(g)=12$ とする。

1. $G$ の部分群をすべて列挙せよ。
2. 各部分群の元の個数を求めよ。
3. 元の個数が6の部分群が一意であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

[巡回群の部分群構造](#thm-grp1-cyclic-subgroups)より、部分群は

$$
\langle g^m\rangle
$$

で $m\mid12$ の形です。

12の正の約数は

$$
1,2,3,4,6,12.
$$

従って部分群は

$$
\langle g\rangle,
\quad
\langle g^2\rangle,
\quad
\langle g^3\rangle,
\quad
\langle g^4\rangle,
\quad
\langle g^6\rangle,
\quad
\langle g^{12}\rangle.
$$

最後のものは

$$
\langle g^{12}\rangle=\langle e\rangle=\{e\}.
$$

$\langle g^m\rangle$ の元の個数は $12/m$ なので、順に

$$
12,\ 6,\ 4,\ 3,\ 2,\ 1.
$$

特に元の個数が6の部分群は

$$
\boxed{
\langle g^2\rangle
}
$$

だけです。

実際、定理の一意性は「元の個数 $d$ の部分群は $\langle g^{12/d}\rangle$」と与えるので、$d=6$ なら指数は $12/6=2$ に一意に決まります。
<!-- solution-end -->

#### GRP1-B03 $D_4$ の標準形を使う
- Level: B

正方形の二面体群

$$
D_4=\langle r,s\rangle
$$

で

$$
r^4=e,
\qquad
s^2=e,
\qquad
srs=r^{-1}
$$

とする。

1. $rsr$ を標準形へ直せ。
2. $(sr)^2$ を計算せよ。
3. $sr$ の位数を求めよ。
4. 集合
   $$
   H=\{e,r^2,s,sr^2\}
   $$
   が $D_4$ の部分群であることを[部分群判定](#thm-grp1-subgroup-test)から示せ。

<!-- solution-start -->
##### 詳細解答

関係式

$$
rs=sr^{-1}
$$

を使います。

まず

$$
rsr
=
sr^{-1}r
=
s.
$$

従って

$$
\boxed{rsr=s}.
$$

次に

$$
(sr)^2
=
srsr.
$$

$srs=r^{-1}$ より

$$
srsr
=
r^{-1}r
=
e.
$$

従って $sr\ne e$ かつ $(sr)^2=e$ なので

$$
\boxed{
\operatorname{ord}(sr)=2
}.
$$

最後に

$$
H=\{e,r^2,s,sr^2\}
$$

を考えます。直接全組合せを調べる代わりに、$r^2$ と $s$ が生成する集合として見ます。

$r^2$ について

$$
(r^2)^2=r^4=e.
$$

また

$$
sr^2s
=
(srs)(srs)
=
r^{-1}r^{-1}
=
r^{-2}
=
r^2
$$

です。従って

$$
sr^2=r^2s.
$$

つまり $r^2$ と $s$ は可換し、どちらも位数2です。

$H$ の任意の元は

$$
(r^2)^a s^b
\qquad
a,b\in\{0,1\}
$$

と書けます。その逆元も同じ形で、二つの元の積も指数を法2で足した同じ形になります。従って $x,y\in H$ なら

$$
xy^{-1}\in H.
$$

$H$ は空でないので[部分群判定](#thm-grp1-subgroup-test)より

$$
\boxed{
H\le D_4
}.
$$
<!-- solution-end -->

### Level C

#### GRP1-C01 Cayley の定理を $D_3$ で手計算する
- Level: C

$D_3=\langle r,s\rangle$ を

$$
r^3=e,
\qquad
s^2=e,
\qquad
srs=r^{-1}
$$

で与える。元を

$$
G=\{e,r,r^2,s,sr,sr^2\}
$$

の順に並べる。

各 $a\in G$ に対する左移動

$$
L_a(x)=ax
$$

を $G$ 上の置換とみなす。

1. $L_r$ と $L_s$ を巡回置換表示せよ。
2. $L_r^3=L_e$、$L_s^2=L_e$ を置換として確認せよ。
3. $L_sL_rL_s=L_{r^{-1}}$ を確認せよ。
4. 正三角形の頂点3点への通常の作用と、Cayley の定理で得る6点 $G$ 自身への作用の違いを説明せよ。
5. なぜ $a\mapsto L_a$ が $D_3$ の6個の元を互いに異なる置換へ送るのか、単位元 $e$ の像を使って説明せよ。

<!-- solution-start -->
##### 詳細解答

まず $L_r$ を計算します。

$$
L_r(e)=r,
\qquad
L_r(r)=r^2,
\qquad
L_r(r^2)=e.
$$

従って

$$
(e\,r\,r^2)
$$

という3巡回が一つあります。

反転側では、関係式 $rs=sr^{-1}$ を使います。

$$
L_r(s)=rs=sr^2,
$$

$$
L_r(sr^2)=rsr^2=sr^{-1}r^2=sr,
$$

$$
L_r(sr)=rsr=s.
$$

従って

$$
\boxed{
L_r=(e\,r\,r^2)(s\,sr^2\,sr)
}.
$$

次に $L_s$ です。

$$
L_s(e)=s,
\qquad
L_s(s)=e,
$$

なので $(e\,s)$ ができます。

また

$$
L_s(r)=sr,
\qquad
L_s(sr)=r
$$

なので $(r\,sr)$ です。

さらに

$$
L_s(r^2)=sr^2,
\qquad
L_s(sr^2)=r^2
$$

なので $(r^2\,sr^2)$ です。

従って

$$
\boxed{
L_s=(e\,s)(r\,sr)(r^2\,sr^2)
}.
$$

$L_r$ は長さ3の巡回置換二つの積なので

$$
L_r^3=L_e.
$$

$L_s$ は互いに素な互換三つの積なので

$$
L_s^2=L_e.
$$

一般に Cayley の定理の証明で

$$
L_aL_b=L_{ab}
$$

を示しました。従って

$$
L_sL_rL_s
=
L_{srs}
=
L_{r^{-1}}.
$$

ここでは $r^{-1}=r^2$ なので

$$
\boxed{
L_sL_rL_s=L_{r^2}
}.
$$

正三角形への通常の幾何学的作用では、$D_3$ は3個の頂点を置換します。一方 Cayley の定理では、群の元そのもの

$$
e,r,r^2,s,sr,sr^2
$$

という6点を置換します。

したがって作用する集合の大きさが違います。Cayley の構成は、群に最初から幾何学的対象がなくても必ず作れる普遍的な置換実現です。

最後に $L_a=L_b$ と仮定します。両辺を $e$ に作用させると

$$
L_a(e)=ae=a,
$$

$$
L_b(e)=be=b.
$$

従って

$$
a=b.
$$

よって異なる群要素は異なる左移動へ送られます。これが Cayley の置換実現で情報が失われない理由です。
<!-- solution-end -->

---

## 14. この章の要点

1. 群は結合則、単位元、逆元の三公理を持つ。
2. 単位元と各逆元は一意で、消去法則が成り立つ。
3. 空でない部分集合 $H$ は
   $$
   x,y\in H\Rightarrow xy^{-1}\in H
   $$
   を満たせば部分群である。
4. 一元 $a$ が生成する部分群は
   $$
   \langle a\rangle=\{a^m:m\in\mathbb Z\}
   $$
   である。
5. 巡回群の部分群は再び巡回群であり、有限巡回群では部分群が群の位数の約数で完全に分類される。
6. 群の直積は成分ごとの演算で群になる。
7. $S_n$ は $n$ 点の全置換からなる群であり、任意の有限置換は互いに素な巡回置換へ一意に分解できる。
8. 置換の偶奇は互換分解の仕方によらず、偶置換全体 $A_n$ は $S_n$ の部分群になる。
9. 二面体群 $D_n$ は
   $$
   r^n=e,\quad s^2=e,\quad srs=r^{-1}
   $$
   を満たし、全要素は $r^k$ または $sr^k$ に一意に直せる。
10. [Cayley の定理](#thm-grp1-cayley)により、任意の群は左移動を通して置換群の部分群として忠実に実現できる。

次の GRP2 では、積を保つ写像の一般理論へ進みます。その後、核・像、剰余類、Lagrange の定理、正規部分群、商群、同型定理へ進みます。
