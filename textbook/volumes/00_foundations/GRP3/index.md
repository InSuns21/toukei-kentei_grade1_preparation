# GRP3 抽象代数 III：群作用・軌道・安定化群・共役

<!-- definition-example-audit: strict -->

[GRP2](../GRP2/index.md) では、準同型・剰余類・正規部分群・商構造までを構成しました。本章では、群の元を集合の自己全単射として働かせる考え方を導入し、一点を動かして得られる集合と、その点を固定する群要素の集合を結び付けます。

この考え方を群自身へ適用すると、有限群の元を「同じ型のもの」に分けて数えられます。最後に、その数え上げを素数冪位数の有限群へ適用します。

主線は

$$
\text{群を集合上の変換として使う}
\longrightarrow
\text{一点を動かす／固定する}
\longrightarrow
\text{剰余類との対応}
\longrightarrow
\text{群自身への作用}
\longrightarrow
\text{有限群の数え上げ}
$$

です。

> **この章の停止線**
>
> 素数ごとの部分群の存在・共役・個数を体系的に調べる理論は GRP4 に送ります。本章では、その準備となる作用の一般論と素数冪位数の有限群の中心までを閉じます。

---

## 1. 群の各元を「変換」として働かせる

<a id="def-grp3-group-action"></a>
<!-- formal-statement-start -->
> **定義（群作用）**
>
> 群 $G$ と集合 $X$ に対し、写像
>
$$
G\times X\to X,
\qquad
(g,x)\mapsto g\cdot x
$$
>
> が次の2条件を満たすとき、$G$ が $X$ に **作用する**、またはこれを **群作用**という。
>
> 1. 任意の $x\in X$ に対して
>
$$
e\cdot x=x.
$$
>
> 2. 任意の $g,h\in G$、$x\in X$ に対して
>
$$
(gh)\cdot x
=
g\cdot(h\cdot x).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-group-action -->
**定義の確認：正方形の回転**

巡回群
$$
C_4=\langle r\rangle,
\qquad
r^4=e
$$
と
$$
X=\{0,1,2,3\}
$$
を考えます。$X$ を正方形の4頂点とみなし、
$$
r^k\cdot j
=
j+k\pmod4
$$
と定めます。

単位元は $r^0=e$ なので
$$
e\cdot j
=
j+0
=
j.
$$

また
$$
(r^a r^b)\cdot j
=
r^{a+b}\cdot j
=
j+a+b,
$$
一方
$$
r^a\cdot(r^b\cdot j)
=
r^a\cdot(j+b)
=
j+b+a.
$$
法4で同じ値なので2条件を満たし、これは群作用です。
<!-- definition-example-end -->

群作用は「各 $g$ が $X$ の自己全単射を与える」と言い換えられます。

実際、$g$ に対して
$$
\rho(g):X\to X,
\qquad
\rho(g)(x)=g\cdot x
$$
と置きます。逆写像は $\rho(g^{-1})$ です。なぜなら
$$
g^{-1}\cdot(g\cdot x)
=
(g^{-1}g)\cdot x
=
x
$$
だからです。

<a id="thm-grp3-action-homomorphism"></a>
<!-- formal-statement-start -->
> **定理（群作用と対称群への準同型）**
>
> 群 $G$ の集合 $X$ への群作用が与えられると、
>
$$
\rho:G\to\operatorname{Sym}(X),
\qquad
\rho(g)(x)=g\cdot x
$$
>
> は群準同型になる。
>
> 逆に群準同型
>
$$
\rho:G\to\operatorname{Sym}(X)
$$
>
> が与えられると、
>
$$
g\cdot x:=\rho(g)(x)
$$
>
> により $G$ の $X$ への群作用が定まる。
<!-- formal-statement-end -->

### 証明の見取り図

群作用の第2条件は、そのまま
$$
\rho(gh)=\rho(g)\rho(h)
$$
を意味します。逆向きでは、準同型が単位元を単位元へ送ることと積を保つことを、作用の2公理へ読み替えます。

<!-- proof-start -->
### 証明

まず群作用が与えられているとします。

任意の $g\in G$ に対して $\rho(g)$ が全単射であることは、上で見たように $\rho(g^{-1})$ が逆写像になることから分かります。従って
$$
\rho(g)\in\operatorname{Sym}(X).
$$

任意の $g,h\in G$、$x\in X$ に対して
$$
\begin{aligned}
\rho(gh)(x)
&=
(gh)\cdot x\\
&=
g\cdot(h\cdot x)\\
&=
\rho(g)(\rho(h)(x)).
\end{aligned}
$$
よって写像として
$$
\rho(gh)
=
\rho(g)\circ\rho(h).
$$
従って $\rho$ は群準同型です。

逆に群準同型
$$
\rho:G\to\operatorname{Sym}(X)
$$
が与えられたとします。

[群準同型の基本性質](../GRP2/index.md#prop-grp2-hom-basic)から
$$
\rho(e)=\operatorname{id}_X.
$$
従って
$$
e\cdot x
=
\rho(e)(x)
=
x.
$$

また準同型性から
$$
\rho(gh)
=
\rho(g)\rho(h).
$$
よって
$$
\begin{aligned}
(gh)\cdot x
&=
\rho(gh)(x)\\
&=
\rho(g)(\rho(h)(x))\\
&=
g\cdot(h\cdot x).
\end{aligned}
$$
従って2つの作用公理が成り立ちます。$\square$
<!-- proof-end -->

群作用を考えることと、群を置換群へ準同型で写すことは同じ情報を表しています。

---

## 2. 作用が群をどれだけ区別するか、集合をどれだけ動かすか

<a id="def-grp3-faithful-transitive"></a>
<!-- formal-statement-start -->
> **定義（忠実な作用・推移的な作用）**
>
> 群作用に対応する準同型
>
$$
\rho:G\to\operatorname{Sym}(X)
$$
>
> が単射であるとき、その作用を **忠実な群作用**という。
>
> また任意の $x,y\in X$ に対し、ある $g\in G$ が存在して
>
$$
g\cdot x=y
$$
>
> となるとき、その作用を **推移的な群作用**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-faithful-transitive -->
**定義の確認：左移動**

任意の群 $G$ が自分自身に
$$
g\cdot x:=gx
$$
で作用するとします。

任意の $x,y\in G$ に対して
$$
g:=yx^{-1}
$$
と置けば
$$
g\cdot x
=
yx^{-1}x
=
y.
$$
従ってこの作用は推移的です。

また全ての $x\in G$ に対して
$$
g\cdot x=x
$$
なら、特に $x=e$ を代入して
$$
g=e.
$$
従って対応する準同型の核は $\{e\}$ であり、[群の第一同型定理](../GRP2/index.md#thm-grp2-first-isomorphism)の単射判定から、この作用は忠実です。
<!-- definition-example-end -->

一方、どの群 $G$ でも1点集合 $\{*\}$ には
$$
g\cdot *=*
$$
と作用できます。$G\ne\{e\}$ なら全ての元が同じ恒等変換を与えるので、これは忠実ではありません。

この失敗例では、作用そのものは存在しますが、作用から群の異なる元を識別する情報が消えています。

---

## 3. 一点を動かして得られる集合と、一点を固定する元

<a id="def-grp3-orbit-stabilizer"></a>
<!-- formal-statement-start -->
> **定義（軌道・安定化群）**
>
> 群 $G$ が集合 $X$ に作用しているとする。
>
> $x\in X$ に対して
>
$$
Gx
:=
\{g\cdot x:g\in G\}
$$
>
> を $x$ の **軌道**という。
>
> また
>
$$
G_x
:=
\{g\in G:g\cdot x=x\}
$$
>
> を $x$ の **安定化群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-orbit-stabilizer -->
**定義の確認：$S_3$ が3点を置換する**

$S_3$ を
$$
X=\{1,2,3\}
$$
へ
$$
\sigma\cdot i:=\sigma(i)
$$
で作用させます。

点 $1$ は
$$
e\cdot1=1,
\qquad
(1\,2)\cdot1=2,
\qquad
(1\,3)\cdot1=3
$$
と動かせるので
$$
G1=\{1,2,3\}.
$$

一方、$1$ を固定する置換は $2,3$ を入れ替えるか何もしないものだけなので
$$
G_1
=
\{e,(2\,3)\}.
$$
<!-- definition-example-end -->

安定化群という名前どおり、$G_x$ は本当に $G$ の部分群です。

<a id="prop-grp3-stabilizer-subgroup"></a>
<!-- formal-statement-start -->
> **命題（安定化群は部分群）**
>
> 群 $G$ が集合 $X$ に作用し、$x\in X$ とする。このとき
>
$$
G_x\le G.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$e\cdot x=x$ なので
$$
e\in G_x.
$$

$a,b\in G_x$ とします。すると
$$
a\cdot x=x,
\qquad
b\cdot x=x.
$$
まず
$$
x
=
b^{-1}\cdot(b\cdot x)
=
b^{-1}\cdot x
$$
なので
$$
b^{-1}\in G_x.
$$
さらに
$$
(ab^{-1})\cdot x
=
a\cdot(b^{-1}\cdot x)
=
a\cdot x
=
x.
$$
従って
$$
ab^{-1}\in G_x.
$$

[部分群判定](../GRP1/index.md#thm-grp1-subgroup-test)から
$$
G_x\le G.
$$
$\square$
<!-- proof-end -->

---

## 4. 軌道は集合を重なりなく分ける

一点から始めて群で動かした範囲は、別の一点から始めた範囲と「同じ」か「全く交わらない」かのどちらかです。

<a id="prop-grp3-orbit-partition"></a>
<!-- formal-statement-start -->
> **命題（軌道による分割）**
>
> 群 $G$ が集合 $X$ に作用しているとする。
>
> 関係
>
$$
x\sim y
\iff
\text{ある }g\in G\text{ が存在して }y=g\cdot x
$$
>
> は $X$ 上の同値関係である。
>
> その同値類は各点の軌道である。従って軌道全体は $X$ を分割する。
<!-- formal-statement-end -->

### 証明の見取り図

反射律には単位元、対称律には逆元、推移律には積を使います。群公理の3つの構造が、そのまま同値関係の3条件に対応します。

<!-- proof-start -->
### 証明

反射律は
$$
x=e\cdot x
$$
から
$$
x\sim x.
$$

$x\sim y$ とします。ある $g\in G$ が存在して
$$
y=g\cdot x.
$$
すると
$$
g^{-1}\cdot y
=
g^{-1}\cdot(g\cdot x)
=
x
$$
なので
$$
y\sim x.
$$

最後に
$$
x\sim y,
\qquad
y\sim z
$$
とします。ある $g,h\in G$ が存在して
$$
y=g\cdot x,
\qquad
z=h\cdot y.
$$
従って
$$
z
=
h\cdot(g\cdot x)
=
(hg)\cdot x.
$$
よって
$$
x\sim z.
$$

以上から $\sim$ は同値関係です。

$x$ の同値類は
$$
\{y\in X:y=g\cdot x\text{ となる }g\in G\text{ がある}\}
=
Gx
$$
なので軌道そのものです。同値類は集合を分割するため、軌道も $X$ を分割します。$\square$
<!-- proof-end -->

推移的な作用とは、この分割が1個の軌道だけからなる場合です。

---

## 5. 軌道の大きさは安定化群の剰余類の個数

ここで GRP2 の剰余類が再登場します。

<a id="thm-grp3-coset-orbit-bijection"></a>
<!-- formal-statement-start -->
> **定理（剰余類と軌道の自然な全単射）**
>
> 群 $G$ が集合 $X$ に作用し、$x\in X$ とする。
>
> 写像
>
$$
\Phi:G/G_x\to Gx,
\qquad
\Phi(gG_x)=g\cdot x
$$
>
> は well-defined な全単射である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は
$$
gG_x=hG_x
\iff
h^{-1}g\in G_x
\iff
g\cdot x=h\cdot x
$$
という同値です。

左側は GRP2 の剰余類、右側は作用で同じ点へ着くことを表しています。この一行が well-defined 性と単射性の両方を担います。

<!-- proof-start -->
### 証明

まず well-defined 性を示します。

$$
gG_x=hG_x
$$
とします。[剰余類の等値条件](../GRP2/index.md#prop-grp2-coset-partition)から
$$
h^{-1}g\in G_x.
$$
安定化群の定義より
$$
(h^{-1}g)\cdot x=x.
$$
両辺に $h$ を作用させると
$$
g\cdot x
=
h\cdot x.
$$
従って代表元を変えても $\Phi$ の値は変わりません。

次に単射性を示します。
$$
\Phi(gG_x)
=
\Phi(hG_x)
$$
なら
$$
g\cdot x=h\cdot x.
$$
両辺に $h^{-1}$ を作用させて
$$
(h^{-1}g)\cdot x=x.
$$
従って
$$
h^{-1}g\in G_x.
$$
再び[剰余類の等値条件](../GRP2/index.md#prop-grp2-coset-partition)から
$$
gG_x=hG_x.
$$

最後に $y\in Gx$ を任意に取ります。軌道の定義からある $g\in G$ が存在して
$$
y=g\cdot x.
$$
従って
$$
y=\Phi(gG_x),
$$
なので全射です。

以上から $\Phi$ は全単射です。$\square$
<!-- proof-end -->

<a id="thm-grp3-orbit-stabilizer"></a>
<!-- formal-statement-start -->
> **定理（軌道・安定化群公式）**
>
> 群 $G$ が集合 $X$ に作用し、$x\in X$ とする。このとき
>
$$
|Gx|
=
[G:G_x]
$$
>
> が成り立つ。
>
> 特に $G$ が有限群なら
>
$$
|G|
=
|Gx|\,|G_x|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[剰余類と軌道の自然な全単射](#thm-grp3-coset-orbit-bijection)により
$$
G/G_x
\longleftrightarrow
Gx
$$
は全単射です。

従って剰余類の個数の定義から
$$
|Gx|
=
|G/G_x|
=
[G:G_x].
$$

さらに $G$ が有限なら、[群論の Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)を部分群 $G_x\le G$ に適用して
$$
|G|
=
[G:G_x]|G_x|.
$$
上の等式を代入すれば
$$
|G|
=
|Gx|\,|G_x|.
$$
$\square$
<!-- proof-end -->

### 5.1 $S_3$ の3点作用を数え直す

第3節では
$$
G1=\{1,2,3\},
\qquad
G_1=\{e,(2\,3)\}
$$
でした。

従って
$$
|G1|=3,
\qquad
|G_1|=2.
$$
実際
$$
|S_3|
=
6
=
3\cdot2
=
|G1|\,|G_1|.
$$

### 5.2 左剰余類集合への作用

任意の部分群 $H\le G$ を取ります。左剰余類全体
$$
G/H
=
\{gH:g\in G\}
$$
に
$$
a\cdot(gH)
:=
agH
$$
と定めます。

これは代表元によらず定まります。実際
$$
gH=g'H
$$
なら
$$
g'=gh
$$
となる $h\in H$ があり、
$$
ag'H
=
aghH
=
agH.
$$

また
$$
e\cdot(gH)=gH,
$$
$$
(ab)\cdot(gH)
=
abgH
=
a\cdot(b\cdot(gH))
$$
なので群作用です。

$H=eH$ を固定する元は
$$
aH=H
\iff
a\in H.
$$
従って安定化群はちょうど $H$ です。

さらに任意の $gH$ は
$$
g\cdot H=gH
$$
と書けるので、この作用は推移的です。

つまり「部分群 $H$」は「推移的作用の一点の安定化群」として現れます。

---

## 6. 群を自分自身へ作用させる

次に、群 $G$ が自分自身を
$$
x\longmapsto gxg^{-1}
$$
で動かすことを考えます。

<a id="def-grp3-conjugation"></a>
<!-- formal-statement-start -->
> **定義（共役作用・共役類）**
>
> 群 $G$ が集合としての $G$ 自身に
>
$$
g\cdot x
:=
gxg^{-1}
$$
>
> で作用することを **共役作用**という。
>
> この作用における $x\in G$ の軌道
>
$$
\operatorname{Cl}_G(x)
:=
\{gxg^{-1}:g\in G\}
$$
>
> を $x$ の **共役類**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-conjugation -->
**定義の確認：作用公理**

単位元について
$$
e\cdot x
=
exe^{-1}
=
x.
$$

また $g,h\in G$ に対して
$$
\begin{aligned}
(gh)\cdot x
&=
(gh)x(gh)^{-1}\\
&=
ghxh^{-1}g^{-1}\\
&=
g\cdot(h\cdot x).
\end{aligned}
$$
従って確かに群作用です。

$S_3$ では互換どうしは共役で、例えば
$$
(1\,2)(2\,3)(1\,2)^{-1}
=
(1\,3).
$$
したがって3つの互換は同じ共役類に入ります。
<!-- definition-example-end -->

共役は「群の内部で座標を付け替える」操作だとみなせます。共役類は、この付け替えで互いに移り合う元をまとめた集合です。

---

## 7. 全てと可換する元と、ある元と可換する元

<a id="def-grp3-center-centralizer"></a>
<!-- formal-statement-start -->
> **定義（群の中心・元の中心化群）**
>
> 群 $G$ に対して
>
$$
Z(G)
:=
\{z\in G:zg=gz\text{ for all }g\in G\}
$$
>
> を **群の中心**という。
>
> また $x\in G$ に対して
>
$$
C_G(x)
:=
\{g\in G:gx=xg\}
$$
>
> を $x$ の **中心化群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-center-centralizer -->
**定義の確認：$S_3$**

$S_3$ で $x=(1\,2)$ とします。

恒等置換と $(1\,2)$ 自身は $x$ と可換するので
$$
\{e,(1\,2)\}\subset C_{S_3}((1\,2)).
$$

一方
$$
(1\,2)(1\,3)
\ne
(1\,3)(1\,2),
$$
であり、他の互換や3-cycle も $(1\,2)$ と可換しません。従って
$$
C_{S_3}((1\,2))
=
\{e,(1\,2)\}.
$$

また $S_3$ の非単位元は全て何かと非可換なので
$$
Z(S_3)=\{e\}.
$$
<!-- definition-example-end -->

<a id="prop-grp3-center-centralizer-subgroups"></a>
<!-- formal-statement-start -->
> **命題（群の中心・元の中心化群は部分群）**
>
> 群 $G$ と $x\in G$ に対して
>
$$
Z(G)\le G,
\qquad
C_G(x)\le G.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $C_G(x)$ を示します。

$e$ は $x$ と可換するので
$$
e\in C_G(x).
$$

$a,b\in C_G(x)$ とすると
$$
ax=xa,
\qquad
bx=xb.
$$
後者から
$$
b^{-1}x=xb^{-1}
$$
も従います。従って
$$
\begin{aligned}
(ab^{-1})x
&=
a(b^{-1}x)\\
&=
a(xb^{-1})\\
&=
(ax)b^{-1}\\
&=
x(ab^{-1}).
\end{aligned}
$$
よって
$$
ab^{-1}\in C_G(x).
$$
[部分群判定](../GRP1/index.md#thm-grp1-subgroup-test)から
$$
C_G(x)\le G.
$$

次に $Z(G)$ を示します。

$a,b\in Z(G)$ なら、任意の $g\in G$ に対して $a,b$ は $g$ と可換します。上と同じ計算により
$$
ab^{-1}
$$
も任意の $g$ と可換します。従って
$$
ab^{-1}\in Z(G).
$$
再び[部分群判定](../GRP1/index.md#thm-grp1-subgroup-test)から
$$
Z(G)\le G.
$$
$\square$
<!-- proof-end -->

### 7.1 中心化群は共役作用の安定化群

共役作用で $x$ を固定する条件は
$$
gxg^{-1}=x.
$$
右から $g$ を掛けると
$$
gx=xg.
$$
従って
$$
G_x
=
C_G(x).
$$

このため[軌道・安定化群公式](#thm-grp3-orbit-stabilizer)は
$$
|\operatorname{Cl}_G(x)|
=
[G:C_G(x)]
$$
と書けます。

### 7.2 中心は共役作用で全ての群要素に固定される元

$x\in Z(G)$ なら任意の $g\in G$ と可換するので
$$
gxg^{-1}
=
x.
$$
従って
$$
\operatorname{Cl}_G(x)=\{x\}.
$$

逆に共役類が1点集合なら
$$
gxg^{-1}=x
$$
が全ての $g$ で成り立つため
$$
x\in Z(G).
$$

つまり中心の元は、共役作用の1点軌道そのものです。

---

## 8. 有限群を共役類ごとに数える

[軌道による分割](#prop-grp3-orbit-partition)を共役作用に適用すると、有限群 $G$ は互いに素な共役類へ分割されます。

中心の元は1点共役類を作り、中心にない元の共役類の大きさは中心化群の指数です。

<a id="thm-grp3-class-equation"></a>
<!-- formal-statement-start -->
> **定理（類等式）**
>
> $G$ を有限群とする。
>
> $x_1,\ldots,x_r$ を、中心 $Z(G)$ に含まれない共役類から1つずつ選んだ代表元とする。このとき
>
$$
|G|
=
|Z(G)|
+
\sum_{i=1}^r
[G:C_G(x_i)].
$$
<!-- formal-statement-end -->

### 証明の見取り図

共役作用の軌道分解を数えるだけです。

- 中心の元の軌道は1点。
- 非中心元の軌道は共役類。
- その大きさは軌道・安定化群公式により中心化群の指数。

この3点を足し合わせます。

<!-- proof-start -->
### 証明

[軌道による分割](#prop-grp3-orbit-partition)を共役作用へ適用すると、
$$
G
$$
は共役類の互いに素な和として書けます。

前節で示したように
$$
x\in Z(G)
\iff
\operatorname{Cl}_G(x)=\{x\}.
$$
従って中心に属する元は、それぞれ1点共役類を作り、その総数は
$$
|Z(G)|.
$$

中心に属さない共役類の代表元を
$$
x_1,\ldots,x_r
$$
とします。

各 $x_i$ について、共役作用の安定化群は
$$
C_G(x_i)
$$
でした。[軌道・安定化群公式](#thm-grp3-orbit-stabilizer)から
$$
|\operatorname{Cl}_G(x_i)|
=
[G:C_G(x_i)].
$$

全ての共役類の大きさを足せば $|G|$ になるので
$$
|G|
=
|Z(G)|
+
\sum_{i=1}^r
[G:C_G(x_i)].
$$
$\square$
<!-- proof-end -->

### 8.1 $S_3$ の類等式

$S_3$ の共役類は
$$
\{e\},
$$
$$
\{(1\,2),(1\,3),(2\,3)\},
$$
$$
\{(1\,2\,3),(1\,3\,2)\}
$$
です。

中心は
$$
Z(S_3)=\{e\}.
$$

互換 $x=(1\,2)$ について
$$
C_{S_3}(x)
=
\{e,(1\,2)\}
$$
なので
$$
[S_3:C_{S_3}(x)]
=
\frac{6}{2}
=
3.
$$

3-cycle $y=(1\,2\,3)$ について
$$
C_{S_3}(y)
=
\langle(1\,2\,3)\rangle
$$
で位数3なので
$$
[S_3:C_{S_3}(y)]
=
\frac{6}{3}
=
2.
$$

従って
$$
6
=
1+3+2,
$$
これが $S_3$ の類等式です。

---

## 9. 素数冪位数の有限群では中心が必ず残る

<a id="def-grp3-finite-p-group"></a>
<!-- formal-statement-start -->
> **定義（有限 p-群）**
>
> $p$ を素数とする。
>
> 有限群 $G$ の位数が、ある整数 $n\ge0$ に対して
>
$$
|G|=p^n
$$
>
> と書けるとき、$G$ を **有限 p-群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp3-finite-p-group -->
**定義の確認**

正方形の二面体群
$$
D_4
=
\langle r,s:r^4=e,\ s^2=e,\ srs=r^{-1}\rangle
$$
は位数
$$
|D_4|=8=2^3
$$
なので有限 $2$-群です。

一方 $S_3$ の位数は
$$
6=2\cdot3
$$
で、1つの素数の冪ではないので有限 $p$-群ではありません。
<!-- definition-example-end -->

<a id="thm-grp3-pgroup-center"></a>
<!-- formal-statement-start -->
> **定理（有限 p-群の中心は非自明）**
>
> $G$ を非自明な有限 $p$-群とする。このとき
>
$$
|Z(G)|\ge p.
$$
>
> 特に
>
$$
Z(G)\ne\{e\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

類等式
$$
|G|
=
|Z(G)|
+
\sum [G:C_G(x_i)]
$$
を法 $p$ で見ます。

非中心元 $x_i$ について
$$
C_G(x_i)\ne G
$$
なので、その指数は $1$ より大きい $p$ の冪です。従って各項が $p$ の倍数になります。

左辺も $p$ の倍数なので、残った $|Z(G)|$ も $p$ の倍数になります。

<!-- proof-start -->
### 証明

$$
|G|=p^n,
\qquad
n\ge1
$$
とします。

[群の類等式](#thm-grp3-class-equation)により
$$
|G|
=
|Z(G)|
+
\sum_{i=1}^r
[G:C_G(x_i)],
$$
ただし $x_i$ は非中心共役類の代表元です。

各 $x_i\notin Z(G)$ について
$$
C_G(x_i)\ne G.
$$
もし $C_G(x_i)=G$ なら、$x_i$ は全ての群要素と可換し
$$
x_i\in Z(G)
$$
となるからです。

$C_G(x_i)$ は $G$ の部分群なので、[群論の Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)から
$$
|C_G(x_i)|
$$
は $p^n$ の約数です。従ってある整数 $m_i$ により
$$
|C_G(x_i)|=p^{m_i}
$$
と書けます。

しかも $C_G(x_i)\ne G$ なので
$$
m_i<n.
$$
よって
$$
[G:C_G(x_i)]
=
p^{n-m_i}
$$
は $p$ の倍数です。

類等式を法 $p$ で見ると
$$
|G|
\equiv
|Z(G)|
\pmod p.
$$
左辺は
$$
|G|=p^n
$$
なので
$$
|G|\equiv0\pmod p.
$$
従って
$$
|Z(G)|
\equiv0\pmod p.
$$

中心は少なくとも単位元 $e$ を含むので
$$
|Z(G)|\ge1.
$$
正の $p$ の倍数であることから
$$
|Z(G)|\ge p.
$$
従って
$$
Z(G)\ne\{e\}.
$$
$\square$
<!-- proof-end -->

### 9.1 $D_4$ では中心が目で見える

$D_4$ では
$$
r^2
$$
は180度回転です。

回転 $r$ とは当然可換し、
$$
sr^2s^{-1}
=
r^{-2}
=
r^2
$$
なので反転 $s$ とも可換します。

$D_4$ は $r,s$ で生成されるので
$$
r^2\in Z(D_4).
$$
従って
$$
\{e,r^2\}\subset Z(D_4).
$$

実際
$$
Z(D_4)=\{e,r^2\}.
$$
有限 $2$-群の中心非自明性が具体的に確認できます。

---

## 10. GRP2 と GRP3 の関係

GRP2 の剰余類は、GRP3 では単なる商構造の材料ではなく、「一点を固定する部分群から、その点が動ける範囲を復元する」ために現れます。

$$
G/G_x
\longleftrightarrow
Gx
$$

という全単射がその核心です。

また共役作用では
$$
G_x=C_G(x)
$$
なので
$$
G/C_G(x)
\longleftrightarrow
\operatorname{Cl}_G(x).
$$

つまり、

$$
\text{剰余類}
\quad\longrightarrow\quad
\text{作用の軌道}
\quad\longrightarrow\quad
\text{共役類}
$$

と同じ構造が形を変えて繰り返し現れます。

この視点は、後続の Lie 群で群が多様体へ作用するときにもそのまま使われます。

---

## 11. 演習

### Level A

#### GRP3-A01 正方形への回転作用
- Level: A

$$
C_4=\langle r\rangle
$$
を
$$
X=\{0,1,2,3\}
$$
へ
$$
r^k\cdot j=j+k\pmod4
$$
で作用させる。

1. 群作用の2公理を確認せよ。
2. 対応する
   $$
   \rho:C_4\to\operatorname{Sym}(X)
   $$
   を書け。
3. この作用が忠実か判定せよ。
4. この作用が推移的か判定せよ。

<!-- solution-start -->
##### 詳細解答

単位元は $e=r^0$ なので
$$
e\cdot j
=
r^0\cdot j
=
j.
$$

また
$$
r^a r^b=r^{a+b}
$$
なので
$$
(r^a r^b)\cdot j
=
j+a+b.
$$
一方
$$
r^a\cdot(r^b\cdot j)
=
r^a\cdot(j+b)
=
j+b+a.
$$
法4で一致するので群作用です。

対応する準同型は
$$
\rho(r^k)(j)
=
j+k\pmod4
$$
です。特に
$$
\rho(r)=(0\,1\,2\,3)
$$
と4頂点を巡回させます。

$\rho(r^k)$ が恒等置換なら、特に
$$
\rho(r^k)(0)=0
$$
なので
$$
k\equiv0\pmod4.
$$
従って
$$
r^k=e.
$$
よって核は $\{e\}$ で、この作用は忠実です。

最後に任意の $i,j\in X$ に対し
$$
k\equiv j-i\pmod4
$$
となる $k$ を取れば
$$
r^k\cdot i=j.
$$
従って推移的です。
<!-- solution-end -->

#### GRP3-A02 $S_3$ の軌道と安定化群
- Level: A

$S_3$ を
$$
X=\{1,2,3\}
$$
へ自然に作用させる。

1. 点 $1$ の軌道を求めよ。
2. 点 $1$ の安定化群を求めよ。
3. 軌道・安定化群公式を確認せよ。
4. この作用が忠実・推移的かそれぞれ判定せよ。

<!-- solution-start -->
##### 詳細解答

$1$ は恒等置換で $1$ に、$(1\,2)$ で $2$ に、$(1\,3)$ で $3$ に移るので
$$
S_3\cdot1
=
\{1,2,3\}.
$$
従って軌道の大きさは
$$
|S_3\cdot1|=3.
$$

$1$ を固定する置換は
$$
e,\quad(2\,3)
$$
だけなので
$$
(S_3)_1
=
\{e,(2\,3)\}.
$$
従って
$$
|(S_3)_1|=2.
$$

よって
$$
|S_3|
=
6
=
3\cdot2
=
|S_3\cdot1|\,|(S_3)_1|.
$$
軌道・安定化群公式が確認できました。

軌道が $X$ 全体なので作用は推移的です。

また全ての点を固定する置換は恒等置換だけなので、対応する準同型
$$
S_3\to\operatorname{Sym}(X)
$$
の核は $\{e\}$ です。従って忠実です。
<!-- solution-end -->

#### GRP3-A03 左剰余類集合への作用
- Level: A

群 $G$ の部分群 $H\le G$ に対し、左剰余類集合 $G/H$ へ
$$
a\cdot(gH):=agH
$$
と定める。

1. この定義が代表元 $g$ の選び方によらないことを示せ。
2. 群作用の2公理を示せ。
3. 点 $H\in G/H$ の安定化群を求めよ。
4. この作用が推移的であることを示せ。

<!-- solution-start -->
##### 詳細解答

まず
$$
gH=g'H
$$
とします。[剰余類の等値条件](../GRP2/index.md#prop-grp2-coset-partition)から
$$
g'=gh
$$
となる $h\in H$ が存在します。

従って
$$
ag'H
=
aghH
=
agH.
$$
よって代表元の選び方によらず定まります。

単位元について
$$
e\cdot(gH)
=
egH
=
gH.
$$
また
$$
(ab)\cdot(gH)
=
abgH,
$$
一方
$$
a\cdot(b\cdot(gH))
=
a\cdot(bgH)
=
abgH.
$$
従って群作用です。

$H$ の安定化群は
$$
G_H
=
\{a\in G:aH=H\}.
$$
剰余類の等値条件から
$$
aH=H
\iff
a\in H.
$$
従って
$$
\boxed{G_H=H}.
$$

最後に任意の左剰余類 $gH$ は
$$
g\cdot H=gH
$$
と書けます。従って $H$ の軌道が $G/H$ 全体であり、作用は推移的です。
<!-- solution-end -->

#### GRP3-A04 $S_3$ の共役類
- Level: A

$S_3$ の共役作用について次を求めよ。

1. $e$ の共役類。
2. $(1\,2)$ の共役類。
3. $(1\,2\,3)$ の共役類。
4. $Z(S_3)$。
5. 類等式。

<!-- solution-start -->
##### 詳細解答

恒等置換は任意の $\sigma\in S_3$ に対して
$$
\sigma e\sigma^{-1}=e
$$
なので
$$
\operatorname{Cl}_{S_3}(e)=\{e\}.
$$

互換の共役は再び互換です。実際
$$
\sigma(i\,j)\sigma^{-1}
=
(\sigma(i)\,\sigma(j)).
$$
従って3つの互換は全て同じ共役類に入り
$$
\operatorname{Cl}_{S_3}((1\,2))
=
\{(1\,2),(1\,3),(2\,3)\}.
$$

同様に3-cycle の共役は3-cycle なので
$$
\operatorname{Cl}_{S_3}((1\,2\,3))
=
\{(1\,2\,3),(1\,3\,2)\}.
$$

1点共役類は $\{e\}$ だけなので
$$
Z(S_3)=\{e\}.
$$

従って類等式は
$$
\boxed{6=1+3+2}.
$$
<!-- solution-end -->

### Level B

#### GRP3-B01 $S_4$ の2点部分集合への作用
- Level: B

$S_4$ を
$$
X=
\{\{i,j\}:1\le i<j\le4\}
$$
へ
$$
\sigma\cdot\{i,j\}
=
\{\sigma(i),\sigma(j)\}
$$
で作用させる。

1. $|X|$ を求めよ。
2. $\{1,2\}$ の軌道を求めよ。
3. $\{1,2\}$ の安定化群を具体的に求めよ。
4. 軌道・安定化群公式を確認せよ。

<!-- solution-start -->
##### 詳細解答

4点から2点を選ぶので
$$
|X|
=
\binom42
=
6.
$$

任意の2点部分集合 $\{i,j\}$ に対して、$1,2$ をそれぞれ $i,j$ へ送る置換を作れるので
$$
S_4\cdot\{1,2\}
=
X.
$$
従って軌道の大きさは6です。

$\{1,2\}$ を集合として固定するには、

- $1,2$ をそのままにするか交換する。
- 残りの $3,4$ をそのままにするか交換する。

の2つの選択が独立にあります。

従って安定化群は
$$
\{
e,\,
(1\,2),\,
(3\,4),\,
(1\,2)(3\,4)
\}
$$
で、位数は4です。

したがって
$$
|S_4|
=
24
=
6\cdot4
=
|S_4\cdot\{1,2\}|
\,
|(S_4)_{\{1,2\}}|.
$$
軌道・安定化群公式が確認できました。
<!-- solution-end -->

#### GRP3-B02 $D_4$ の類等式
- Level: B

$$
D_4
=
\langle r,s:r^4=e,\ s^2=e,\ srs=r^{-1}\rangle
$$
を位数8の二面体群とする。

1. $Z(D_4)$ を求めよ。
2. $r$ の共役類を求めよ。
3. $s$ の共役類を求めよ。
4. $rs$ の共役類を求めよ。
5. 類等式を書け。

<!-- solution-start -->
##### 詳細解答

まず
$$
r^2
$$
は $r$ と可換します。また
$$
sr^2s^{-1}
=
r^{-2}
=
r^2
$$
なので $s$ とも可換します。

$D_4$ は $r,s$ で生成されるので
$$
\{e,r^2\}\subset Z(D_4).
$$

一方 $r$ は
$$
srs^{-1}=r^{-1}=r^3\ne r
$$
なので中心に入りません。

$s$ も
$$
rsr^{-1}\ne s
$$
なので中心に入りません。同様に残りの反転も中心ではありません。従って
$$
Z(D_4)
=
\{e,r^2\}.
$$

$r$ について
$$
srs^{-1}=r^3
$$
なので
$$
\operatorname{Cl}_{D_4}(r)
=
\{r,r^3\}.
$$

次に関係式
$$
sr=r^{-1}s
$$
から
$$
rsr^{-1}
=
r^2s.
$$
従って
$$
\operatorname{Cl}_{D_4}(s)
=
\{s,r^2s\}.
$$

同様に
$$
r(rs)r^{-1}
=
r^3s
$$
となり
$$
\operatorname{Cl}_{D_4}(rs)
=
\{rs,r^3s\}.
$$

以上から共役類は
$$
\{e\},
\quad
\{r^2\},
\quad
\{r,r^3\},
\quad
\{s,r^2s\},
\quad
\{rs,r^3s\}.
$$
従って類等式は
$$
\boxed{
8=1+1+2+2+2
}.
$$
<!-- solution-end -->

#### GRP3-B03 左剰余類作用の核
- Level: B

群 $G$ の部分群 $H\le G$ に対し、$G$ を左剰余類集合 $G/H$ へ左から作用させる。

対応する準同型を
$$
\rho:G\to\operatorname{Sym}(G/H)
$$
とする。

1. $a\in\ker\rho$ であるための必要十分条件が
   $$
   g^{-1}ag\in H
   \quad
   \text{for all }g\in G
   $$
   であることを直接導け。
2. 
   $$
   \ker\rho
   =
   \bigcap_{g\in G}gHg^{-1}
   $$
   を示せ。
3. この作用が忠実であるための必要十分条件を書け。

<!-- solution-start -->
##### 詳細解答

$a\in\ker\rho$ とは、$a$ が $G/H$ の全ての点を固定することです。

従って任意の $g\in G$ に対して
$$
a\cdot(gH)
=
gH.
$$
作用の定義から
$$
agH=gH.
$$
[剰余類の等値条件](../GRP2/index.md#prop-grp2-coset-partition)より
$$
g^{-1}ag\in H.
$$

逆に全ての $g$ に対して
$$
g^{-1}ag\in H
$$
なら
$$
agH=gH
$$
なので、$a$ は全ての剰余類を固定します。従って
$$
a\in\ker\rho.
$$

よって
$$
a\in\ker\rho
\iff
g^{-1}ag\in H
\quad
\text{for all }g\in G.
$$

この条件を
$$
a\in gHg^{-1}
$$
と書き直すと
$$
a\in\ker\rho
\iff
a\in\bigcap_{g\in G}gHg^{-1}.
$$
従って
$$
\boxed{
\ker\rho
=
\bigcap_{g\in G}gHg^{-1}
}.
$$

作用が忠実であることは $\rho$ が単射であることです。[群の第一同型定理](../GRP2/index.md#thm-grp2-first-isomorphism)の単射判定から、これは
$$
\ker\rho=\{e\}
$$
と同値です。

従って必要十分条件は
$$
\boxed{
\bigcap_{g\in G}gHg^{-1}
=
\{e\}
}.
$$
<!-- solution-end -->

### Level C

#### GRP3-C01 位数 $p^2$ の群を分類する
- Level: C

$p$ を素数、$G$ を
$$
|G|=p^2
$$
を満たす群とする。

1. $G$ が可換群であることを示せ。
2. $G$ に位数 $p^2$ の元が存在する場合、
   $$
   G\cong C_{p^2}
   $$
   を示せ。
3. 全ての非単位元の位数が $p$ である場合、
   $$
   G\cong C_p\times C_p
   $$
   を示せ。
4. 以上から位数 $p^2$ の群が同型を除いて2種類であることを示せ。

<!-- solution-start -->
##### 詳細解答

まず $G$ は非自明な有限 $p$-群です。[有限 p-群の中心非自明性](#thm-grp3-pgroup-center)から
$$
|Z(G)|\ge p.
$$

また $Z(G)\le G$ なので、[群論の Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)から
$$
|Z(G)|
$$
は
$$
p^2
$$
の約数です。従って
$$
|Z(G)|=p
\quad\text{または}\quad
p^2.
$$

もし
$$
|Z(G)|=p^2
$$
なら
$$
Z(G)=G
$$
なので $G$ は可換群です。

残る可能性
$$
|Z(G)|=p
$$
を考えます。このとき
$$
|G/Z(G)|
=
p.
$$
素数位数の群は GRP2 の [Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)から巡回群なので、
$$
G/Z(G)
$$
は巡回群です。

ここで
$$
G/Z(G)=\langle aZ(G)\rangle
$$
とします。

任意の $x,y\in G$ は、ある整数 $m,n$ と
$$
z_1,z_2\in Z(G)
$$
を使って
$$
x=a^m z_1,
\qquad
y=a^n z_2
$$
と書けます。

$z_1,z_2$ は中心の元なので全てと可換します。従って
$$
\begin{aligned}
xy
&=
a^m z_1 a^n z_2\\
&=
a^{m+n}z_1z_2\\
&=
a^{n+m}z_2z_1\\
&=
yx.
\end{aligned}
$$
よって $G$ は可換群です。

すると $Z(G)=G$ でなければならず、
$$
|Z(G)|=p
$$
に矛盾します。

従って必ず
$$
|Z(G)|=p^2
$$
であり、
$$
\boxed{G\text{ は可換群}}
$$
です。

次に $G$ に位数 $p^2$ の元 $a$ が存在するとします。

すると
$$
|\langle a\rangle|
=
p^2
=
|G|.
$$
従って
$$
G=\langle a\rangle
$$
で
$$
\boxed{G\cong C_{p^2}}.
$$

最後に全ての非単位元の位数が $p$ だとします。

非単位元 $a$ を1つ取ると
$$
|\langle a\rangle|=p.
$$
$|G|=p^2$ なので
$$
\langle a\rangle\ne G.
$$
従って
$$
b\in G\setminus\langle a\rangle
$$
を取れます。

$G$ は可換なので写像
$$
\varphi:C_p\times C_p\to G,
\qquad
(i,j)\mapsto a^i b^j
$$
は群準同型です。

核を調べます。
$$
a^i b^j=e
$$
なら
$$
b^j=a^{-i}\in\langle a\rangle.
$$

もし $j\not\equiv0\pmod p$ なら、$b$ の位数は $p$ なので $j$ は法 $p$ で逆元を持ち、
$$
b\in\langle b^j\rangle\subset\langle a\rangle
$$
となって $b\notin\langle a\rangle$ に矛盾します。

従って
$$
j\equiv0\pmod p.
$$
すると
$$
a^i=e
$$
なので
$$
i\equiv0\pmod p.
$$

よって
$$
\ker\varphi=\{(0,0)\}.
$$
従って $\varphi$ は単射です。

定義域と終域はどちらも $p^2$ 個の元を持つので、単射は全射でもあります。よって
$$
\boxed{
G\cong C_p\times C_p
}.
$$

以上から位数 $p^2$ の群は同型を除いて
$$
\boxed{
C_{p^2},
\qquad
C_p\times C_p
}
$$
の2種類です。
<!-- solution-end -->

---

## 12. この章の要点

1. 群作用は、群の各元を集合の自己全単射として整合的に働かせる構造である。
2. 群作用は準同型
   $$
   G\to\operatorname{Sym}(X)
   $$
   と同値な情報を持つ。
3. 忠実な作用は群要素を変換として区別でき、推移的な作用は一点から集合全体へ到達できる。
4. 一点 $x$ の軌道は群で動かして到達できる点全体、安定化群は $x$ を固定する群要素全体である。
5. 軌道は集合を分割する。
6. 自然な全単射
   $$
   G/G_x\longrightarrow Gx
   $$
   により
   $$
   |Gx|=[G:G_x]
   $$
   が成り立つ。
7. 共役作用では軌道が共役類、安定化群が中心化群になる。
8. 中心の元は共役作用の1点軌道である。
9. 有限群では
   $$
   |G|
   =
   |Z(G)|
   +
   \sum [G:C_G(x_i)]
   $$
   と共役類ごとに数えられる。
10. 非自明な有限 $p$-群では、非中心共役類の大きさが全て $p$ の倍数になるため、中心にも $p$ 個以上の元が残る。

次の GRP4 では、この作用による数え上げを使いながら、素数ごとの部分群の存在・共役・個数を調べ、有限群の構造判定へ進みます。
