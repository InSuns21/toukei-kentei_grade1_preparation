# GRP2 抽象代数 II：構造を保つ写像と商構造

<!-- definition-example-audit: strict -->

[GRP1](../GRP1/index.md) では、群・部分群・巡回群・置換群を構成しました。本章では「二つの群の間で演算を保つ写像」を導入し、その写像が区別できない部分を核として潰すことで、商群と同型定理へ進みます。

主線は

$$
\text{準同型}
\longrightarrow
\text{核・像}
\longrightarrow
\text{剰余類}
\longrightarrow
\text{正規部分群}
\longrightarrow
\text{商群}
\longrightarrow
\text{同型定理}
$$

です。

GRP1 の Cayley の定理では、左移動
$$
\lambda(a)=L_a
$$
が
$$
L_aL_b=L_{ab}
$$
を満たしました。これは本章でいう群準同型の具体例です。

> **この章の停止線**
>
> 群作用・軌道・安定化群・共役類・類等式は GRP3 で扱います。ここでは商構造と同型定理までを閉じます。

---

## 1. 群準同型は「積を保つ写像」

<a id="def-grp2-homomorphism"></a>
<!-- formal-statement-start -->
> **定義（群準同型・群同型）**
>
> 群 $G,H$ の間の写像
>
> $$
> f:G\to H
> $$
>
> が任意の $a,b\in G$ に対して
>
> $$
> f(ab)=f(a)f(b)
> $$
>
> を満たすとき、$f$ を **群準同型**という。
>
> 群準同型が全単射であるとき **群同型**という。群同型
>
> $$
> f:G\to H
> $$
>
> が存在するとき
>
> $$
> G\cong H
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-homomorphism -->
**定義の確認**

加法群 $\mathbb Z$ から GRP1 の法 $n$ の加法群 $\mathbb Z_n$ への写像
$$
q_n:\mathbb Z\to\mathbb Z_n,
\qquad
q_n(k)=k\bmod n
$$
を考えます。

整数 $a,b$ に対して
$$
q_n(a+b)
=
(a+b)\bmod n
=
q_n(a)+q_n(b)
$$
なので $q_n$ は群準同型です。

一方
$$
f:\mathbb Z\to\mathbb Z,
\qquad
f(k)=k+1
$$
は
$$
f(a+b)=a+b+1,
$$
$$
f(a)+f(b)=a+b+2
$$
で一般に一致しないので群準同型ではありません。
<!-- definition-example-end -->

積を一つ保つだけで、単位元や逆元まで自動的に保存されます。

<a id="prop-grp2-hom-basic"></a>
<!-- formal-statement-start -->
> **命題（群準同型の基本性質）**
>
> 群準同型 $f:G\to H$ と $a\in G$ に対して
>
> 1. $f(e_G)=e_H$。
> 2. $f(a^{-1})=f(a)^{-1}$。
> 3. 任意の $m\in\mathbb Z$ に対して
>
> $$
> f(a^m)=f(a)^m.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

単位元について $f(e_G)=f(e_Ge_G)$ と書くと、$H$ の消去法則が使えます。逆元は
$$
f(a)f(a^{-1})=f(e_G)
$$
から決まります。冪は正整数・0・負整数に分ければ従います。

<!-- proof-start -->
### 証明

準同型性から
$$
f(e_G)=f(e_Ge_G)=f(e_G)f(e_G).
$$
左から $f(e_G)^{-1}$ を掛けると
$$
e_H=f(e_G).
$$

次に
$$
f(a)f(a^{-1})
=
f(aa^{-1})
=
f(e_G)
=
e_H.
$$
同様に
$$
f(a^{-1})f(a)=e_H
$$
なので、逆元の一意性から
$$
f(a^{-1})=f(a)^{-1}.
$$

$m>0$ なら準同型性を繰り返して
$$
f(a^m)=f(a)^m.
$$
$m=0$ では両辺は $e_H$ です。$m<0$ なら $m=-r$、$r>0$ と書いて
$$
f(a^m)
=
f((a^{-1})^r)
=
f(a^{-1})^r
=
f(a)^{-r}
=
f(a)^m.
$$
これで全ての整数 $m$ について成り立ちます。$\square$
<!-- proof-end -->

GRP1 の置換の符号
$$
\operatorname{sgn}:S_n\to\{1,-1\}
$$
も、[置換の偶奇の一意性](../GRP1/index.md#thm-grp1-parity)で
$$
\operatorname{sgn}(\sigma\tau)
=
\operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)
$$
を証明したので群準同型です。

---

## 2. 核は「写像が潰す部分」、像は「届く部分」

<a id="def-grp2-kernel-image"></a>
<!-- formal-statement-start -->
> **定義（核・像）**
>
> 群準同型 $f:G\to H$ に対して
>
> $$
> \ker f
> :=
> \{g\in G:f(g)=e_H\},
> $$
>
> $$
> \operatorname{Im}f
> :=
> \{f(g):g\in G\}
> $$
>
> をそれぞれ $f$ の **核**、**像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-kernel-image -->
**定義の確認**

法 $n$ の写像
$$
q_n:\mathbb Z\to\mathbb Z_n
$$
では
$$
q_n(k)=0
\iff
n\mid k.
$$
従って
$$
\ker q_n=n\mathbb Z.
$$

また任意の剰余 $r\in\mathbb Z_n$ は
$$
q_n(r)=r
$$
と書けるので
$$
\operatorname{Im}q_n=\mathbb Z_n.
$$
<!-- definition-example-end -->

像が部分群であることはすぐ確認できます。$x=f(a)$、$y=f(b)$ なら
$$
xy^{-1}
=
f(a)f(b)^{-1}
=
f(ab^{-1})
\in\operatorname{Im}f.
$$
従って [部分群判定](../GRP1/index.md#thm-grp1-subgroup-test)から
$$
\operatorname{Im}f\le H.
$$

核も部分群です。$a,b\in\ker f$ なら
$$
f(ab^{-1})
=
f(a)f(b)^{-1}
=
e_He_H^{-1}
=
e_H,
$$
従って
$$
ab^{-1}\in\ker f.
$$

核にはさらに、後で商群を作れるだけの強い性質があります。それが正規性です。

---

## 3. 剰余類は部分群を同じ大きさの塊として並べる

$H\le G$ とします。$g\in G$ を固定すると、$H$ の各元に左から $g$ を掛けた集合と、右から $g$ を掛けた集合を考えられます。

<a id="def-grp2-cosets"></a>
<!-- formal-statement-start -->
> **定義（左剰余類・右剰余類）**
>
> 部分群 $H\le G$ と $g\in G$ に対して
>
> $$
> gH:=\{gh:h\in H\}
> $$
>
> を $g$ による **左剰余類**、
>
> $$
> Hg:=\{hg:h\in H\}
> $$
>
> を **右剰余類**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-cosets -->
**定義の確認**

加法群 $\mathbb Z$ で
$$
H=4\mathbb Z
$$
とすると
$$
1+H
=
\{\ldots,-7,-3,1,5,9,\ldots\}
$$
です。

加法群は可換なので左剰余類と右剰余類は同じです。剰余類は
$$
0+4\mathbb Z,\quad
1+4\mathbb Z,\quad
2+4\mathbb Z,\quad
3+4\mathbb Z
$$
の4種類しかありません。
<!-- definition-example-end -->

二つの左剰余類が同じかどうかは代表元の差に相当する積で判定できます。

<a id="prop-grp2-coset-partition"></a>
<!-- formal-statement-start -->
> **命題（剰余類の等値条件と分割）**
>
> $H\le G$、$g,k\in G$ とする。
>
> $$
> gH=kH
> \iff
> k^{-1}g\in H.
> $$
>
> 特に任意の二つの左剰余類は、等しいか互いに素である。従って左剰余類全体は $G$ を分割する。
<!-- formal-statement-end -->

### 証明の見取り図

$gH=kH$ なら $g$ 自身が $kH$ に入ります。逆に $k^{-1}g\in H$ なら $g=kh_0$ と書けるので $gH=kH$ です。二つの剰余類が一つでも共通元を持てば、この等値条件を使って同じ剰余類だと分かります。

<!-- proof-start -->
### 証明

$gH=kH$ とします。$e\in H$ なので
$$
g=ge\in gH=kH.
$$
従ってある $h\in H$ が存在して
$$
g=kh.
$$
よって
$$
k^{-1}g=h\in H.
$$

逆に $k^{-1}g\in H$ とします。
$$
h_0:=k^{-1}g\in H
$$
と置けば
$$
g=kh_0.
$$
従って
$$
gH
=
kh_0H.
$$
$h_0\in H$ なので $h_0H=H$ であり
$$
gH=kH.
$$

次に $gH\cap kH\ne\varnothing$ とします。ある $x$ が両方に入るので
$$
x=gh_1=kh_2
$$
となる $h_1,h_2\in H$ が存在します。従って
$$
k^{-1}g=h_2h_1^{-1}\in H.
$$
上で示した等値条件から
$$
gH=kH.
$$
従って異なる左剰余類は互いに素であり、各 $g\in G$ は $gH$ に入るので、左剰余類は $G$ を分割します。$\square$
<!-- proof-end -->

さらに写像
$$
H\to gH,
\qquad
h\mapsto gh
$$
は全単射です。逆写像は
$$
gh\mapsto h
$$
で与えられます。したがって有限群では全ての左剰余類が $H$ と同じ個数の元を持ちます。

<a id="def-grp2-index"></a>
<!-- formal-statement-start -->
> **定義（部分群の指数）**
>
> $H\le G$ に対し、$H$ の左剰余類の個数を
>
> $$
> [G:H]
> $$
>
> と書き、$G$ における $H$ の **指数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-index -->
**定義の確認**

$\mathbb Z$ における $4\mathbb Z$ の左剰余類は
$$
0+4\mathbb Z,\quad
1+4\mathbb Z,\quad
2+4\mathbb Z,\quad
3+4\mathbb Z
$$
の4個なので
$$
[\mathbb Z:4\mathbb Z]=4.
$$
<!-- definition-example-end -->

---

## 4. Lagrange の定理は「同じ大きさの剰余類を数える」

<a id="thm-grp2-lagrange"></a>
<!-- formal-statement-start -->
> **定理（Lagrange の定理）**
>
> $G$ を有限群、$H\le G$ とする。このとき
>
> $$
> |G|
> =
> [G:H]\,|H|.
> $$
>
> 特に $|H|$ は $|G|$ の約数である。
<!-- formal-statement-end -->

### 証明の見取り図

剰余類は $G$ を重なりなく分割し、各剰余類は $H$ と全単射なので全て $|H|$ 個の元を持ちます。あとは「塊の個数 × 一塊の大きさ」を数えるだけです。

<!-- proof-start -->
### 証明

[剰余類による分割](#prop-grp2-coset-partition)により、$G$ は相異なる左剰余類
$$
g_1H,\ldots,g_rH
$$
の互いに素な和として書けます。ここで
$$
r=[G:H].
$$

各 $i$ について
$$
H\to g_iH,\qquad h\mapsto g_ih
$$
は全単射なので
$$
|g_iH|=|H|.
$$
従って
$$
|G|
=
\sum_{i=1}^r|g_iH|
=
r|H|
=
[G:H]|H|.
$$
$\square$
<!-- proof-end -->

### 4.1 元の位数は群の位数を割る

有限群 $G$ の元 $g$ に対して、GRP1 の巡回部分群
$$
\langle g\rangle
$$
を考えると
$$
|\langle g\rangle|
=
\operatorname{ord}(g).
$$
Lagrange の定理から
$$
\operatorname{ord}(g)\mid |G|.
$$

したがって
$$
g^{|G|}=e.
$$

また $|G|=p$ が素数なら、$e$ でない任意の $g$ の位数は $p$ しかあり得ません。従って
$$
G=\langle g\rangle
$$
で、素数位数の群は巡回群です。

---

## 5. 左右の剰余類が一致すると商の積が作れる

一般の部分群では左剰余類と右剰余類は一致しません。

GRP1 の
$$
S_3
$$
で
$$
H=\{e,(1\,2)\}
$$
とすると
$$
(1\,3)H
=
\{(1\,3),(1\,2\,3)\},
$$
一方
$$
H(1\,3)
=
\{(1\,3),(1\,3\,2)\}.
$$
従って
$$
(1\,3)H\ne H(1\,3).
$$

商群を作るためには、この左右差が消える必要があります。

<a id="def-grp2-normal-subgroup"></a>
<!-- formal-statement-start -->
> **定義（正規部分群）**
>
> 部分群 $N\le G$ が任意の $g\in G$ に対して
>
> $$
> gN=Ng
> $$
>
> を満たすとき、$N$ を $G$ の **正規部分群**といい
>
> $$
> N\trianglelefteq G
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-normal-subgroup -->
**定義の確認**

$G$ が可換群なら任意の部分群 $N\le G$ は正規です。実際
$$
gN
=
\{gn:n\in N\}
=
\{ng:n\in N\}
=
Ng.
$$

従って
$$
n\mathbb Z\trianglelefteq\mathbb Z
$$
です。
<!-- definition-example-end -->

<a id="prop-grp2-normal-equivalences"></a>
<!-- formal-statement-start -->
> **命題（正規部分群の同値条件）**
>
> $N\le G$ とする。次は同値である。
>
> 1. $N\trianglelefteq G$。
> 2. 任意の $g\in G$ に対して
>
> $$
> gNg^{-1}=N.
> $$
>
> 3. 任意の $g\in G$、$n\in N$ に対して
>
> $$
> gng^{-1}\in N.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 から 2 を示します。
$$
gN=Ng
$$
の両辺に右から $g^{-1}$ を掛けると
$$
gNg^{-1}=N.
$$

2 なら、任意の $n\in N$ に対して
$$
gng^{-1}\in gNg^{-1}=N
$$
なので 3 が従います。

3 を仮定します。任意の $g$ に対して
$$
gNg^{-1}\subset N.
$$
ここで $g^{-1}$ を $g$ の代わりに使うと
$$
g^{-1}Ng\subset N.
$$
両辺を左から $g$、右から $g^{-1}$ で挟めば
$$
N\subset gNg^{-1}.
$$
従って
$$
gNg^{-1}=N.
$$
よって 2 が成り立ち、したがって 1 も成り立ちます。$\square$
<!-- proof-end -->

### 5.1 核が正規になる理由

<a id="prop-grp2-kernel-normal-image-subgroup"></a>
<!-- formal-statement-start -->
> **命題（核は正規部分群、像は部分群）**
>
> 群準同型 $f:G\to H$ に対して
>
> $$
> \ker f\trianglelefteq G,
> \qquad
> \operatorname{Im}f\le H.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

像が部分群であることは第2節ですでに確認しました。核の正規性は、$n\in\ker f$ を $gng^{-1}$ へ動かしても
$$
f(gng^{-1})=f(g)e_Hf(g)^{-1}=e_H
$$
となることから従います。

<!-- proof-start -->
### 証明

像については $x=f(a),y=f(b)$ とすれば
$$
xy^{-1}
=
f(ab^{-1})
\in\operatorname{Im}f
$$
なので部分群判定により
$$
\operatorname{Im}f\le H.
$$

核について $g\in G$、$n\in\ker f$ とします。すると
$$
\begin{aligned}
f(gng^{-1})
&=
f(g)f(n)f(g^{-1})\\
&=
f(g)e_Hf(g)^{-1}\\
&=
e_H.
\end{aligned}
$$
従って
$$
gng^{-1}\in\ker f.
$$
[正規部分群の同値条件](#prop-grp2-normal-equivalences)より
$$
\ker f\trianglelefteq G.
$$
$\square$
<!-- proof-end -->

これで「核は商群を作れる部分群」であることが分かりました。

---

## 6. 商群は「核の方向を一つの元に潰す」

<a id="def-grp2-quotient-group"></a>
<!-- formal-statement-start -->
> **定義（商群）**
>
> 正規部分群 $N\trianglelefteq G$ に対し、左剰余類全体
>
> $$
> G/N
> :=
> \{gN:g\in G\}
> $$
>
> に
>
> $$
> (gN)(hN)
> :=
> ghN
> $$
>
> と積を定めて得られる群を **商群**という。
<!-- formal-statement-end -->

ここで最重要なのは、右辺が代表元 $g,h$ の選び方によらないことです。

<a id="thm-grp2-quotient-well-defined"></a>
<!-- formal-statement-start -->
> **定理（商群構成と正規性）**
>
> $N\le G$ とする。
>
> 剰余類全体に
>
> $$
> (gN)(hN)=ghN
> $$
>
> と積を定める操作が代表元によらず定まるための必要十分条件は
>
> $$
> N\trianglelefteq G
> $$
>
> である。
>
> この条件の下で $G/N$ は群になり、単位元は $N$、$gN$ の逆元は $g^{-1}N$ である。
<!-- formal-statement-end -->

### 証明の見取り図

十分性では
$$
g'=gn_1,\qquad h'=hn_2
$$
と代表元を変えたとき
$$
g'h'
=
gh(h^{-1}n_1h)n_2
$$
と変形します。正規性によって括弧内が再び $N$ に入るので同じ剰余類になります。

必要性では、同じ剰余類 $N=nN$ を使って積を作り、代表元を変えても結果が同じという仮定から
$$
gng^{-1}\in N
$$
を引き出します。

<!-- proof-start -->
### 証明

まず $N\trianglelefteq G$ とします。

$$
gN=g'N,
\qquad
hN=h'N
$$
とすると、剰余類の等値条件からある $n_1,n_2\in N$ が存在して
$$
g'=gn_1,
\qquad
h'=hn_2
$$
と書けます。

従って
$$
\begin{aligned}
g'h'
&=
gn_1hn_2\\
&=
gh(h^{-1}n_1h)n_2.
\end{aligned}
$$
正規性から
$$
h^{-1}n_1h\in N.
$$
また $N$ は部分群なので
$$
(h^{-1}n_1h)n_2\in N.
$$
よって
$$
g'h'N=ghN.
$$
従って積は代表元によらず定まります。

結合則は $G$ の結合則から
$$
((gN)(hN))(kN)
=
(ghk)N
=
(gN)((hN)(kN))
$$
です。

単位元は
$$
N=eN
$$
で
$$
N(gN)=gN=(gN)N.
$$
逆元は
$$
(gN)(g^{-1}N)=N
$$
なので $g^{-1}N$ です。従って $G/N$ は群です。

逆に、積
$$
(gN)(hN)=ghN
$$
が代表元によらず定まると仮定します。$n\in N$ と $g\in G$ を任意に取ります。
$$
N=nN
$$
なので
$$
(gN)(N)(g^{-1}N)
=
(gN)(nN)(g^{-1}N).
$$
左辺は $N$、右辺は
$$
gng^{-1}N
$$
です。従って
$$
gng^{-1}N=N,
$$
すなわち
$$
gng^{-1}\in N.
$$
[正規部分群の同値条件](#prop-grp2-normal-equivalences)から
$$
N\trianglelefteq G.
$$
$\square$
<!-- proof-end -->

<!-- definition-example-start: def-grp2-quotient-group -->
**定義の確認**

$N=4\mathbb Z\trianglelefteq\mathbb Z$ とします。加法記法では
$$
\mathbb Z/4\mathbb Z
=
\{
4\mathbb Z,\,
1+4\mathbb Z,\,
2+4\mathbb Z,\,
3+4\mathbb Z
\}.
$$
加法は
$$
(a+4\mathbb Z)+(b+4\mathbb Z)
=
(a+b)+4\mathbb Z
$$
です。

例えば
$$
(3+4\mathbb Z)+(2+4\mathbb Z)
=
5+4\mathbb Z
=
1+4\mathbb Z.
$$
代表元を $3$ から $7$、$2$ から $-2$ に変えても
$$
7+(-2)=5
$$
なので同じ剰余類になります。
<!-- definition-example-end -->

### 6.1 正規でないと積が代表元に依存する

再び
$$
G=S_3,
\qquad
H=\{e,(1\,2)\}
$$
を考えます。$H$ は正規ではありません。

同じ左剰余類
$$
H=eH=(1\,2)H
$$
を、別の剰余類 $(1\,3)H$ と掛けることを考えます。

代表元 $e$ を使えば
$$
(eH)((1\,3)H)
=
(1\,3)H.
$$
一方、同じ第1剰余類の代表元として $(1\,2)$ を使うと
$$
((1\,2)H)((1\,3)H)
=
(1\,2)(1\,3)H
=
(1\,3\,2)H.
$$
この二つは異なる剰余類です。

したがって、正規性を失うと「剰余類を元とする積」が代表元の選び方で変わってしまいます。壊れているのは群公理以前に、演算そのものの定義可能性です。

---

## 7. 標準射影は商群を作る最も基本的な準同型

<a id="def-grp2-projection"></a>
<!-- formal-statement-start -->
> **定義（商群の標準射影）**
>
> $N\trianglelefteq G$ に対し
>
> $$
> \pi:G\to G/N,
> \qquad
> \pi(g)=gN
> $$
>
> を **標準射影**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-grp2-projection -->
**定義の確認**

$N=4\mathbb Z$ では
$$
\pi:\mathbb Z\to\mathbb Z/4\mathbb Z,
\qquad
\pi(k)=k+4\mathbb Z.
$$
加法について
$$
\pi(a+b)
=
(a+b)+4\mathbb Z
=
(a+4\mathbb Z)+(b+4\mathbb Z)
$$
なので準同型です。

また
$$
\pi(k)=4\mathbb Z
\iff
k\in4\mathbb Z
$$
だから
$$
\ker\pi=4\mathbb Z.
$$
<!-- definition-example-end -->

一般に
$$
\ker\pi=N
$$
です。商群は「$N$ をちょうど単位元へ潰す標準的な準同型」の行き先です。

---

## 8. 第一同型定理：準同型は核を潰した後では単射になる

<a id="thm-grp2-first-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（群の第一同型定理）**
>
> 群準同型
>
> $$
> f:G\to H
> $$
>
> に対して
>
> $$
> \overline f:G/\ker f\to\operatorname{Im}f,
> \qquad
> \overline f(g\ker f)=f(g)
> $$
>
> は群同型である。
>
> 従って
>
> $$
> G/\ker f
> \cong
> \operatorname{Im}f.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

必要なのは4点です。

1. 代表元を変えても $f(g)$ が変わらない。
2. 積を保つ。
3. 像への全射である。
4. 核が商群の単位元だけなので単射である。

特に1番目が「核で割る」理由そのものです。

<!-- proof-start -->
### 証明

まず代表元によらず定まることを示します。
$$
g\ker f
=
g'\ker f
$$
なら
$$
(g')^{-1}g\in\ker f.
$$
従って
$$
f((g')^{-1}g)=e_H.
$$
準同型性から
$$
f(g')^{-1}f(g)=e_H
$$
なので
$$
f(g)=f(g').
$$

次に
$$
\begin{aligned}
\overline f((g\ker f)(h\ker f))
&=
\overline f(gh\ker f)\\
&=
f(gh)\\
&=
f(g)f(h)\\
&=
\overline f(g\ker f)\overline f(h\ker f).
\end{aligned}
$$
従って $\overline f$ は準同型です。

任意の $y\in\operatorname{Im}f$ は、像の定義からある $g\in G$ に対して
$$
y=f(g)=\overline f(g\ker f)
$$
と書けるので全射です。

最後に
$$
\overline f(g\ker f)=e_H
$$
なら
$$
f(g)=e_H,
$$
従って
$$
g\in\ker f.
$$
よって
$$
g\ker f=\ker f
$$
で、これは商群の単位元です。従って $\overline f$ の核は単位元だけであり、$\overline f$ は単射です。

したがって群同型
$$
G/\ker f
\cong
\operatorname{Im}f
$$
を得ます。$\square$
<!-- proof-end -->

### 8.1 $\mathbb Z/n\mathbb Z$ は法 $n$ 写像から出る

$q_n:\mathbb Z\to\mathbb Z_n$ は全射で
$$
\ker q_n=n\mathbb Z.
$$
第一同型定理から
$$
\mathbb Z/n\mathbb Z
\cong
\mathbb Z_n.
$$

つまり GRP1 で具体的に使った法 $n$ の加法群は、整数群から $n$ の倍数を0へ潰した商群として再構成できます。

### 8.2 $S_n/A_n$ は符号だけを残す

$n\ge2$ とします。GRP1 の符号準同型
$$
\operatorname{sgn}:S_n\to\{1,-1\}
$$
は全射で
$$
\ker(\operatorname{sgn})=A_n.
$$
従って
$$
S_n/A_n
\cong
\{1,-1\}.
$$

これは $S_n$ の置換から「偶か奇か」という1ビットの情報だけを残した商です。

### 8.3 線形代数を既習なら：行列式も同じ形

可逆実行列全体を積で群
$$
GL_n(\mathbb R)
$$
とし、非零実数全体を積で群
$$
\mathbb R^\times
$$
とします。

行列式の積公式
$$
\det(AB)=\det(A)\det(B)
$$
から
$$
\det:GL_n(\mathbb R)\to\mathbb R^\times
$$
は群準同型です。

核は
$$
SL_n(\mathbb R)
=
\{A\in GL_n(\mathbb R):\det A=1\}
$$
で、対角行列
$$
\operatorname{diag}(r,1,\ldots,1)
$$
を使えば任意の $r\ne0$ が像に入るため全射です。従って
$$
GL_n(\mathbb R)/SL_n(\mathbb R)
\cong
\mathbb R^\times.
$$

この例は行列式を既習の読者向けの接続例であり、本章の証明依存には使いません。

---

## 9. 第二同型定理：部分群と正規部分群を交差させる

<a id="thm-grp2-second-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（群の第二同型定理）**
>
> $H\le G$、$N\trianglelefteq G$ とする。このとき
>
> $$
> HN:=\{hn:h\in H,\ n\in N\}
> $$
>
> は $G$ の部分群で、
>
> $$
> H\cap N\trianglelefteq H,
> \qquad
> N\trianglelefteq HN,
> $$
>
> かつ
>
> $$
> H/(H\cap N)
> \cong
> HN/N.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

自然な写像
$$
\varphi:H\to HN/N,
\qquad
\varphi(h)=hN
$$
を作り、第一同型定理を使います。核が $H\cap N$、像が $HN/N$ になります。その前に $HN$ が本当に部分群であることを確認します。

<!-- proof-start -->
### 証明

まず $HN\le G$ を示します。$h_1n_1,h_2n_2\in HN$ とします。
$$
(h_2n_2)^{-1}
=
n_2^{-1}h_2^{-1}.
$$
従って
$$
(h_1n_1)(h_2n_2)^{-1}
=
h_1n_1n_2^{-1}h_2^{-1}.
$$
$N$ は正規なので
$$
h_2(n_1n_2^{-1})h_2^{-1}\in N.
$$
これを $n_3$ と置けば
$$
n_1n_2^{-1}h_2^{-1}
=
h_2^{-1}n_3.
$$
したがって
$$
(h_1n_1)(h_2n_2)^{-1}
=
h_1h_2^{-1}n_3\in HN.
$$
部分群判定から
$$
HN\le G.
$$

$N\trianglelefteq G$ なので、特に $HN$ の全ての元による共役でも $N$ は保たれます。従って
$$
N\trianglelefteq HN.
$$

次に
$$
\varphi:H\to HN/N,
\qquad
\varphi(h)=hN
$$
と置きます。これは標準射影の $H$ への制限なので群準同型です。

核は
$$
\begin{aligned}
h\in\ker\varphi
&\iff hN=N\\
&\iff h\in N.
\end{aligned}
$$
もともと $h\in H$ なので
$$
\ker\varphi=H\cap N.
$$
従って核の正規性から
$$
H\cap N\trianglelefteq H.
$$

像について、$HN/N$ の任意の元は
$$
hnN
=
hN
$$
と書けるので
$$
\operatorname{Im}\varphi=HN/N.
$$

第一同型定理から
$$
H/(H\cap N)
\cong
HN/N.
$$
$\square$
<!-- proof-end -->

---

## 10. 第三同型定理：「二段階で潰す」と「一度に潰す」

<a id="thm-grp2-third-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（群の第三同型定理）**
>
> $N,H\trianglelefteq G$ かつ
>
> $$
> N\subset H
> $$
>
> とする。このとき
>
> $$
> H/N\trianglelefteq G/N
> $$
>
> であり、
>
> $$
> (G/N)/(H/N)
> \cong
> G/H.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$G/N$ から $G/H$ へ
$$
gN\mapsto gH
$$
と送ります。$N\subset H$ が「$N$ の違いを無視しても $H$ の剰余類は変わらない」ことを保証します。その核が $H/N$ です。

<!-- proof-start -->
### 証明

写像
$$
\psi:G/N\to G/H,
\qquad
\psi(gN)=gH
$$
を考えます。

まず代表元によらず定まることを示します。
$$
gN=g'N
$$
なら
$$
(g')^{-1}g\in N\subset H.
$$
従って
$$
gH=g'H.
$$

また
$$
\psi((gN)(kN))
=
\psi(gkN)
=
gkH
=
(gH)(kH),
$$
なので準同型です。

任意の $gH\in G/H$ は
$$
\psi(gN)=gH
$$
と書けるので全射です。

核は
$$
\begin{aligned}
gN\in\ker\psi
&\iff gH=H\\
&\iff g\in H.
\end{aligned}
$$
従って
$$
\ker\psi=H/N.
$$
核は正規部分群なので
$$
H/N\trianglelefteq G/N.
$$

第一同型定理から
$$
(G/N)/(H/N)
\cong
G/H.
$$
$\square$
<!-- proof-end -->

---

## 11. 対応定理：商群の部分群は元の群の部分群から来る

<a id="thm-grp2-correspondence"></a>
<!-- formal-statement-start -->
> **定理（群の対応定理）**
>
> $N\trianglelefteq G$ とし、標準射影を
>
> $$
> \pi:G\to G/N
> $$
>
> とする。
>
> $N$ を含む $G$ の部分群 $H$ と、$G/N$ の部分群 $K$ の間には
>
> $$
> H\longmapsto H/N,
> $$
>
> $$
> K\longmapsto \pi^{-1}(K)
> $$
>
> による一対一対応がある。
>
> この対応は包含関係を保つ。さらに
>
> $$
> H\trianglelefteq G
> \iff
> H/N\trianglelefteq G/N.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

商群の部分群を標準射影で引き戻すと、必ず核 $N$ を含む部分群になります。逆に $N\subset H$ なら $\pi(H)=H/N$ です。二つの操作が互いに逆であることを示せば対応が得られます。

<!-- proof-start -->
### 証明

まず $H\le G$ かつ $N\subset H$ とします。
$$
H/N=\{hN:h\in H\}
$$
は $G/N$ の部分群です。実際
$$
(h_1N)(h_2N)^{-1}
=
h_1h_2^{-1}N
$$
で、$h_1h_2^{-1}\in H$ だからです。

逆に $K\le G/N$ とし
$$
\pi^{-1}(K)
=
\{g\in G:gN\in K\}
$$
と置きます。$a,b\in\pi^{-1}(K)$ なら
$$
aN,bN\in K.
$$
従って
$$
ab^{-1}N
=
(aN)(bN)^{-1}
\in K,
$$
よって
$$
ab^{-1}\in\pi^{-1}(K).
$$
部分群判定から
$$
\pi^{-1}(K)\le G.
$$
また
$$
N=\ker\pi\subset\pi^{-1}(K)
$$
です。

二つの操作が互いに逆であることを示します。$N\subset H$ なら
$$
\pi^{-1}(H/N)=H.
$$
実際、$gN\in H/N$ ならある $h\in H$ が存在して
$$
gN=hN.
$$
従って
$$
h^{-1}g\in N\subset H
$$
なので $g\in H$ です。逆包含は明らかです。

また $K\le G/N$ に対して、$\pi$ は全射なので
$$
\pi(\pi^{-1}(K))=K.
$$
従って一対一対応です。

包含保存も定義から直ちに従います。

最後に正規性を確認します。$H\trianglelefteq G$ なら
$$
(gN)(hN)(gN)^{-1}
=
ghg^{-1}N
\in H/N,
$$
なので
$$
H/N\trianglelefteq G/N.
$$

逆に $H/N\trianglelefteq G/N$ とします。$g\in G$、$h\in H$ に対し
$$
ghg^{-1}N
=
(gN)(hN)(gN)^{-1}
\in H/N.
$$
従ってある $h'\in H$ が存在して
$$
ghg^{-1}N=h'N.
$$
よって
$$
(h')^{-1}ghg^{-1}\in N\subset H.
$$
したがって
$$
ghg^{-1}\in H.
$$
正規部分群の同値条件から
$$
H\trianglelefteq G.
$$
$\square$
<!-- proof-end -->

---

## 12. 同型定理を一つの図として読む

4つの結果は別々の暗記項目ではありません。

- **第一同型定理**：準同型は核で割れば像と同じになる。
- **第二同型定理**：$H$ を $N$ 方向へ広げた $HN$ と、$H$ 内で潰れる $H\cap N$ が対応する。
- **第三同型定理**：$N$ を潰してから $H/N$ を潰すのは、最初から $H$ を潰すのと同じ。
- **対応定理**：$N$ を含む部分群構造は、商群 $G/N$ の部分群構造としてそのまま残る。

特に第一同型定理は
$$
\text{元の群}
\longrightarrow
\text{核を潰した商群}
\longrightarrow
\text{像}
$$
という全章の主線を最も直接に表しています。

---

## 13. 演習

### Level A

#### GRP2-A01 法6写像の核と像
- Level: A

加法群の準同型
$$
q_6:\mathbb Z\to\mathbb Z_6,
\qquad
q_6(k)=k\bmod6
$$
について次を求めよ。

1. $\ker q_6$。
2. $\operatorname{Im}q_6$。
3. 第一同型定理から得られる同型。

<!-- solution-start -->
##### 詳細解答

$q_6(k)=0$ となるのは $6\mid k$ のときだけなので
$$
\ker q_6=6\mathbb Z.
$$

また $\mathbb Z_6$ の各元 $r$ は整数 $r$ の像なので
$$
\operatorname{Im}q_6=\mathbb Z_6.
$$

第一同型定理から
$$
\mathbb Z/\ker q_6
\cong
\operatorname{Im}q_6.
$$
従って
$$
\boxed{
\mathbb Z/6\mathbb Z\cong\mathbb Z_6
}.
$$
<!-- solution-end -->

#### GRP2-A02 $\mathbb Z_{12}$ の剰余類と指数
- Level: A

加法群
$$
G=\mathbb Z_{12}
$$
で
$$
H=\langle4\rangle
$$
とする。

1. $H$ の元を求めよ。
2. $H$ の剰余類を全て書け。
3. $[G:H]$ を求めよ。
4. Lagrange の定理を数値で確認せよ。

<!-- solution-start -->
##### 詳細解答

$4$ を繰り返し足すと
$$
0,\ 4,\ 8,\ 0
$$
なので
$$
H=\{0,4,8\}.
$$
従って
$$
|H|=3.
$$

剰余類は
$$
H=\{0,4,8\},
$$
$$
1+H=\{1,5,9\},
$$
$$
2+H=\{2,6,10\},
$$
$$
3+H=\{3,7,11\}.
$$
これで $G$ の12元を重なりなく覆っています。

従って剰余類は4個なので
$$
[G:H]=4.
$$
Lagrange の定理は
$$
|G|
=
[G:H]|H|
=
4\cdot3
=
12
$$
として確認できます。
<!-- solution-end -->

#### GRP2-A03 指数2の部分群は正規
- Level: A

$H\le G$ かつ
$$
[G:H]=2
$$
とする。$H\trianglelefteq G$ を示せ。

<!-- solution-start -->
##### 詳細解答

左剰余類はちょうど2個です。一つは $H$ 自身です。

$g\in H$ なら
$$
gH=H=Hg.
$$

次に $g\notin H$ とします。左剰余類は2個しかないので、$gH$ は $H$ でない方の剰余類、すなわち
$$
gH=G\setminus H
$$
です。

同様に右剰余類も $H$ ともう一つだけです。$g\notin H$ なので
$$
Hg\ne H,
$$
従って
$$
Hg=G\setminus H.
$$

よって
$$
gH=Hg
$$
が全ての $g\in G$ について成り立ちます。したがって
$$
\boxed{H\trianglelefteq G}.
$$
<!-- solution-end -->

#### GRP2-A04 $\mathbb Z/4\mathbb Z$ の商演算
- Level: A

商群
$$
\mathbb Z/4\mathbb Z
$$
で次を計算せよ。

1. $(1+4\mathbb Z)+(3+4\mathbb Z)$。
2. $(2+4\mathbb Z)+(3+4\mathbb Z)$。
3. $3+4\mathbb Z$ の逆元。
4. 標準射影 $\pi:\mathbb Z\to\mathbb Z/4\mathbb Z$ の核。

<!-- solution-start -->
##### 詳細解答

商群の加法は
$$
(a+4\mathbb Z)+(b+4\mathbb Z)
=
(a+b)+4\mathbb Z
$$
です。

従って
$$
(1+4\mathbb Z)+(3+4\mathbb Z)
=
4+4\mathbb Z
=
4\mathbb Z.
$$

また
$$
(2+4\mathbb Z)+(3+4\mathbb Z)
=
5+4\mathbb Z
=
1+4\mathbb Z.
$$

$3+4\mathbb Z$ の加法逆元は
$$
-3+4\mathbb Z
=
1+4\mathbb Z
$$
です。実際
$$
(3+4\mathbb Z)+(1+4\mathbb Z)
=
4\mathbb Z.
$$

最後に
$$
\pi(k)=4\mathbb Z
\iff
k\in4\mathbb Z
$$
なので
$$
\boxed{\ker\pi=4\mathbb Z}.
$$
<!-- solution-end -->

### Level B

#### GRP2-B01 非正規部分群では商の積が壊れる
- Level: B

$$
G=S_3,
\qquad
H=\{e,(1\,2)\}
$$
とする。

1. $(1\,3)H$ と $H(1\,3)$ を求め、$H$ が正規でないことを示せ。
2. $eH=(1\,2)H$ を確認せよ。
3. 商の積を
   $$
   (gH)(kH)=gkH
   $$
   と定めようとすると、第1因子の代表元として $e$ と $(1\,2)$ を選ぶことで結果が変わることを示せ。
4. どの仮定を失ったために何が壊れたか説明せよ。

<!-- solution-start -->
##### 詳細解答

まず
$$
(1\,3)H
=
\{(1\,3),(1\,3)(1\,2)\}
=
\{(1\,3),(1\,2\,3)\}.
$$

一方
$$
H(1\,3)
=
\{(1\,3),(1\,2)(1\,3)\}
=
\{(1\,3),(1\,3\,2)\}.
$$
従って
$$
(1\,3)H\ne H(1\,3)
$$
であり
$$
H\not\trianglelefteq S_3.
$$

また $(1\,2)\in H$ なので
$$
(1\,2)H=H=eH.
$$

ところが第1因子を $e$ で代表すると
$$
(eH)((1\,3)H)
=
(1\,3)H.
$$
同じ剰余類の代表元として $(1\,2)$ を使うと
$$
((1\,2)H)((1\,3)H)
=
(1\,2)(1\,3)H
=
(1\,3\,2)H.
$$
この二つは異なります。

したがって失った仮定は正規性です。正規性がないと代表元を変えたときに部分群の元を積の反対側へ移せず、積の剰余類が一定しません。つまり群公理の一部が後で失敗するのではなく、そもそも剰余類上の積が一意に定まりません。
<!-- solution-end -->

#### GRP2-B02 符号準同型から $S_4/A_4$ を求める
- Level: B

GRP1 の符号準同型
$$
\operatorname{sgn}:S_4\to\{1,-1\}
$$
を使って次を示せ。

1. $\ker(\operatorname{sgn})=A_4$。
2. $\operatorname{sgn}$ は全射である。
3. $S_4/A_4\cong\{1,-1\}$。
4. $[S_4:A_4]=2$。

<!-- solution-start -->
##### 詳細解答

$A_4$ は偶置換全体なので、定義から
$$
\sigma\in A_4
\iff
\operatorname{sgn}(\sigma)=1.
$$
$\{1,-1\}$ の単位元は $1$ なので
$$
\ker(\operatorname{sgn})=A_4.
$$

恒等置換の符号は $1$、互換 $(1\,2)$ の符号は $-1$ です。従って像には $1,-1$ の両方が入り
$$
\operatorname{Im}(\operatorname{sgn})
=
\{1,-1\}.
$$
よって全射です。

第一同型定理から
$$
S_4/\ker(\operatorname{sgn})
\cong
\operatorname{Im}(\operatorname{sgn}),
$$
従って
$$
\boxed{
S_4/A_4\cong\{1,-1\}
}.
$$

商群の元数は2なので
$$
[S_4:A_4]=2.
$$
Lagrange の定理からも
$$
|A_4|
=
\frac{|S_4|}{2}
=
\frac{24}{2}
=
12
$$
と確認できます。
<!-- solution-end -->

#### GRP2-B03 第二同型定理を整数群で確認する
- Level: B

加法群
$$
G=\mathbb Z,
\qquad
H=4\mathbb Z,
\qquad
N=6\mathbb Z
$$
とする。

1. $H+N$ を求めよ。
2. $H\cap N$ を求めよ。
3. 第二同型定理から得られる同型を書け。
4. 両辺の元数を確認せよ。

<!-- solution-start -->
##### 詳細解答

$4\mathbb Z+6\mathbb Z$ は
$$
4a+6b
=
2(2a+3b)
$$
の形なので $2\mathbb Z$ に含まれます。

逆に
$$
2=4(-1)+6(1)
$$
なので全ての $2$ の倍数は $4\mathbb Z+6\mathbb Z$ に入ります。従って
$$
H+N=2\mathbb Z.
$$

共通部分は4と6の両方の倍数、すなわち最小公倍数12の倍数なので
$$
H\cap N=12\mathbb Z.
$$

第二同型定理から
$$
H/(H\cap N)
\cong
(H+N)/N.
$$
従って
$$
\boxed{
4\mathbb Z/12\mathbb Z
\cong
2\mathbb Z/6\mathbb Z
}.
$$

左辺では
$$
12\mathbb Z,\quad
4+12\mathbb Z,\quad
8+12\mathbb Z
$$
の3剰余類があります。

右辺では
$$
6\mathbb Z,\quad
2+6\mathbb Z,\quad
4+6\mathbb Z
$$
の3剰余類があります。

従って両辺とも3元群です。
<!-- solution-end -->

### Level C

#### GRP2-C01 整数群で同型定理と対応定理をまとめて再構成する
- Level: C

加法群
$$
G=\mathbb Z,
\qquad
N=12\mathbb Z,
\qquad
H=4\mathbb Z
$$
を考える。

1. $N\subset H$ と $N,H\trianglelefteq G$ を確認せよ。
2. 第三同型定理から
   $$
   (\mathbb Z/12\mathbb Z)/(4\mathbb Z/12\mathbb Z)
   \cong
   \mathbb Z/4\mathbb Z
   $$
   を導け。
3. 左辺の商群の3つの剰余類を具体的に書き、それぞれが右辺のどの元に対応するか示せ。
4. $12\mathbb Z$ を含む $\mathbb Z$ の部分群を全て求めよ。
5. 対応定理を使って $\mathbb Z/12\mathbb Z$ の部分群を全て求めよ。
6. この例で「部分群を商へ送る操作」と「商の部分群を逆像で戻す操作」が互いに逆であることを一例について直接確認せよ。

<!-- solution-start -->
##### 詳細解答

まず
$$
12\mathbb Z\subset4\mathbb Z
$$
です。$\mathbb Z$ は可換群なので全ての部分群が正規です。従って
$$
N,H\trianglelefteq G.
$$

第三同型定理を
$$
N=12\mathbb Z,
\qquad
H=4\mathbb Z,
\qquad
G=\mathbb Z
$$
へ適用すると
$$
(\mathbb Z/12\mathbb Z)/(4\mathbb Z/12\mathbb Z)
\cong
\mathbb Z/4\mathbb Z.
$$

ここで
$$
4\mathbb Z/12\mathbb Z
=
\{
12\mathbb Z,\,
4+12\mathbb Z,\,
8+12\mathbb Z
\}
$$
です。

$\mathbb Z/12\mathbb Z$ の中でこれを一つの単位元剰余類として潰すと、商群の元は
$$
(4\mathbb Z/12\mathbb Z),
$$
$$
(1+12\mathbb Z)+(4\mathbb Z/12\mathbb Z),
$$
$$
(2+12\mathbb Z)+(4\mathbb Z/12\mathbb Z),
$$
$$
(3+12\mathbb Z)+(4\mathbb Z/12\mathbb Z)
$$
の4個です。

第三同型定理の写像
$$
(a+12\mathbb Z)+(4\mathbb Z/12\mathbb Z)
\longmapsto
a+4\mathbb Z
$$
により、これらは順に
$$
0+4\mathbb Z,\quad
1+4\mathbb Z,\quad
2+4\mathbb Z,\quad
3+4\mathbb Z
$$
へ対応します。

次に $12\mathbb Z$ を含む $\mathbb Z$ の部分群を求めます。$\mathbb Z$ の部分群は $d\mathbb Z$ の形であり、
$$
12\mathbb Z\subset d\mathbb Z
$$
となるのは
$$
d\mid12
$$
のときです。従って
$$
\mathbb Z,\quad
2\mathbb Z,\quad
3\mathbb Z,\quad
4\mathbb Z,\quad
6\mathbb Z,\quad
12\mathbb Z
$$
の6個です。

対応定理により、$\mathbb Z/12\mathbb Z$ の部分群はそれぞれ
$$
\mathbb Z/12\mathbb Z,
$$
$$
2\mathbb Z/12\mathbb Z,
$$
$$
3\mathbb Z/12\mathbb Z,
$$
$$
4\mathbb Z/12\mathbb Z,
$$
$$
6\mathbb Z/12\mathbb Z,
$$
$$
12\mathbb Z/12\mathbb Z
$$
です。

具体的には
$$
2\mathbb Z/12\mathbb Z
=
\{0,2,4,6,8,10\}\pmod{12},
$$
$$
3\mathbb Z/12\mathbb Z
=
\{0,3,6,9\}\pmod{12},
$$
$$
4\mathbb Z/12\mathbb Z
=
\{0,4,8\}\pmod{12},
$$
$$
6\mathbb Z/12\mathbb Z
=
\{0,6\}\pmod{12},
$$
最後は自明部分群です。

最後に一例として
$$
H=4\mathbb Z
$$
を取ります。商へ送ると
$$
H/N
=
4\mathbb Z/12\mathbb Z.
$$
標準射影
$$
\pi:\mathbb Z\to\mathbb Z/12\mathbb Z
$$
で逆像を取ると
$$
\pi^{-1}(4\mathbb Z/12\mathbb Z)
$$
は「法12で $0,4,8$ のいずれかになる整数」全体です。これはちょうど4の倍数全体なので
$$
\pi^{-1}(4\mathbb Z/12\mathbb Z)
=
4\mathbb Z
=
H.
$$
従って対応定理の二つの操作がこの例で確かに互いに逆になっています。
<!-- solution-end -->

---

## 14. この章の要点

1. 群準同型は
   $$
   f(ab)=f(a)f(b)
   $$
   を満たし、単位元・逆元・整数冪も自動的に保存する。
2. 核は単位元へ潰れる部分、像は実際に届く部分である。
3. 左剰余類は $G$ を互いに素な同じ大きさの塊へ分割する。
4. 有限群では
   $$
   |G|=[G:H]|H|
   $$
   が成り立ち、元の位数も $|G|$ を割る。
5. 正規部分群は左右の剰余類が一致する部分群であり、共役で保たれることと同値である。
6. 準同型の核は必ず正規部分群である。
7. 正規性は
   $$
   (gN)(hN)=ghN
   $$
   を代表元によらず定めるためのちょうど必要十分な条件である。
8. 第一同型定理は
   $$
   G/\ker f\cong\operatorname{Im}f
   $$
   として、準同型が失う情報を核だけで完全に記述する。
9. 第二・第三同型定理は、部分群と正規部分群の交差・積・段階的な商を自然な同型で結ぶ。
10. 対応定理は $N$ を含む $G$ の部分群構造を $G/N$ の部分群構造へ移す。

次の GRP3 では、群が集合へ作用するときの軌道・安定化群・共役を扱います。そこでは本章の剰余類と指数が
$$
G/G_x
$$
という形で再登場し、軌道・安定化群公式と類等式へ進みます。
