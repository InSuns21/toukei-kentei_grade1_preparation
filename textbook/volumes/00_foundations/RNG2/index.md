# RNG2 抽象代数 VI：素イデアル・極大イデアル・中国剰余定理

<!-- definition-example-audit: strict -->

[RNG1](../RNG1/index.md) では、イデアルによって環を割ると商環ができ、環準同型の核が商構造を支配することを学びました。本章では、その商環が **整域になるか、体になるか** をイデアル側から読み取ります。

主線は

$$
\text{素イデアル}
\longleftrightarrow
\text{整域となる商}
$$

および

$$
\text{極大イデアル}
\longleftrightarrow
\text{体となる商}
$$

です。

さらに、二つ以上のイデアルが十分に独立しているとき、複数の商環を一つの商環へまとめられます。これが **中国剰余定理** です。

> **この章の停止線**
>
> 本章では、単位元 $1\ne0$ を持つ可換環を舞台とし、素イデアル・極大イデアルを商環から特徴付けたあと、複数のイデアルを組み合わせる条件を構成して中国剰余定理まで進みます。Euclid 整域・単項イデアル整域・一意分解整域、一般の Bézout 等式や最大公約数論は RNG3 へ送ります。

---

## 1. 本章の舞台：単位元を持つ可換環

RNG1 では環そのものに単位元を仮定しませんでした。本章では以後、特に断らない限り $R$ を **単位元 $1_R$ を持つ可換環** とし、

$$
1_R\ne0
$$

を仮定します。

この仮定により、商環 $R/I$ について、零因子を持つか、全ての非零元が逆元を持つかを使ってイデアル $I$ の性質を判定できます。

---

## 2. 素イデアルと極大イデアル

<a id="def-rng2-prime-maximal"></a>
<!-- formal-statement-start -->
> **定義（真のイデアル・素イデアル・極大イデアル）**
>
> イデアル $I\subset R$ が $I\ne R$ を満たすとき、$I$ を **真のイデアル** という。
>
> 真のイデアル $P$ が、任意の $a,b\in R$ に対して
>
$$
ab\in P
\Longrightarrow
a\in P
\ \text{または}\
b\in P
$$
>
> を満たすとき、$P$ を **素イデアル** という。
>
> 真のイデアル $M$ が、イデアル $J$ に対して
>
$$
M\subset J\subset R
$$
>
> なら $J=M$ または $J=R$ となるとき、$M$ を **極大イデアル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng2-prime-maximal -->
### 2.1 定義の確認：$5\mathbb Z$, $6\mathbb Z$, $(0)$

**定義の確認**

まず

$$
5\mathbb Z\ne\mathbb Z,\qquad
6\mathbb Z\ne\mathbb Z,\qquad
(0)\ne\mathbb Z
$$

なので、これらは全て $\mathbb Z$ の真のイデアルです。

$6\mathbb Z$ は素イデアルではありません。実際

$$
2\cdot3=6\in6\mathbb Z
$$

ですが

$$
2\notin6\mathbb Z,\qquad
3\notin6\mathbb Z.
$$

一方 $(0)$ は素イデアルです。整数 $a,b$ が $ab\in(0)$ を満たすことは $ab=0$ を意味し、整数には零因子がないので $a=0$ または $b=0$ です。

従って

$$
a\in(0)
\quad\text{または}\quad
b\in(0).
$$

$5\mathbb Z$ が極大かどうかは、後で商環 $\mathbb Z/5\mathbb Z$ が体であることから判定します。定義だけを見ると「中間のイデアルがないこと」を直接全て調べる必要があり、商環による特徴付けが強力である理由がここにあります。
<!-- definition-example-end -->

素イデアルは「積がイデアルへ落ちたとき、少なくとも片方が既にイデアルに入っていた」と要求します。

極大イデアルは包含関係で定義されます。見た目は別の概念ですが、商環を見ると両者はきれいに整理されます。

---

## 3. 素イデアルは整域となる商を特徴付ける

<a id="thm-rng2-prime-quotient-domain"></a>
<!-- formal-statement-start -->
> **定理（素イデアルと商整域）**
>
> $R$ を単位元 $1\ne0$ を持つ可換環とし、$P$ を $R$ のイデアルとする。このとき次は同値である。
>
> 1. $P$ は素イデアルである。
> 2. 商環 $R/P$ は整域である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### $P$ が素イデアルなら $R/P$ は整域

$P$ は真のイデアルなので $1\notin P$ です。従って商環では

$$
1+P\ne P,
$$

つまり零元と単位元が異なります。

$R$ が可換環なので $R/P$ も可換環です。

商環で

$$
(a+P)(b+P)=P
$$

とします。商環の積の定義から $ab+P=P$、従って $ab\in P$ です。

$P$ は素イデアルなので

$$
a\in P
\quad\text{または}\quad
b\in P.
$$

よって

$$
a+P=P
\quad\text{または}\quad
b+P=P.
$$

したがって $R/P$ は零因子を持たず、整域です。

#### $R/P$ が整域なら $P$ は素イデアル

$R/P$ が整域なので $1+P\ne P$、従って $P\ne R$ です。

次に $ab\in P$ とします。このとき

$$
(a+P)(b+P)=ab+P=P.
$$

$R/P$ は整域なので零因子を持ちません。従って

$$
a+P=P
\quad\text{または}\quad
b+P=P.
$$

これは

$$
a\in P
\quad\text{または}\quad
b\in P
$$

を意味します。

以上から $P$ は素イデアルです。$\square$
<!-- proof-end -->

### 3.1 商環で判定すると何が見えるか

$\mathbb Z/(0)\cong\mathbb Z$ で、$\mathbb Z$ は整域なので $(0)$ は素イデアルです。

一方 $\mathbb Z/6\mathbb Z$ では

$$
\overline2\,\overline3=\overline0
$$

ですが、$\overline2,\overline3$ はどちらも零元ではありません。従って $\mathbb Z/6\mathbb Z$ は整域ではなく、$6\mathbb Z$ は素イデアルではありません。

この対応は

$$
\boxed{
\text{素イデアル}
\iff
\text{商で零因子が消える}
}
$$

と読むと整理しやすくなります。

---

## 4. 複数のイデアルを組み合わせる

<a id="def-rng2-ideal-sum-product-comaximal"></a>
<!-- formal-statement-start -->
> **定義（イデアルの和・積・互いに素なイデアル）**
>
> $I,J$ を $R$ のイデアルとする。
>
> **和**を
>
$$
I+J=\{i+j:i\in I,\ j\in J\}
$$
>
> と定める。
>
> **積**を
>
$$
IJ=
\left\{
\sum_{k=1}^{n} i_kj_k:
n\ge1,\ i_k\in I,\ j_k\in J
\right\}
$$
>
> と定める。
>
> さらに
>
$$
I+J=R
$$
>
> のとき、$I$ と $J$ は **互いに素** であるという。
<!-- formal-statement-end -->

<a id="prop-rng2-ideal-sum-product"></a>
<!-- formal-statement-start -->
> **命題（イデアルの和と積はイデアル）**
>
> $I,J$ が $R$ のイデアルなら、$I+J$ と $IJ$ も $R$ のイデアルである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $I+J$ を考えます。

$$
0=0+0\in I+J.
$$

$i_1+j_1,i_2+j_2\in I+J$ なら

$$
(i_1+j_1)-(i_2+j_2)
=
(i_1-i_2)+(j_1-j_2)\in I+J.
$$

また $r\in R$ に対して

$$
r(i+j)=ri+rj.
$$

$I,J$ はイデアルなので $ri\in I$, $rj\in J$ です。従って $r(i+j)\in I+J$ です。よって $I+J$ はイデアルです。

次に $IJ$ を考えます。$IJ$ の元は有限和

$$
x=\sum_{k=1}^{m}i_kj_k
$$

の形です。二つの有限和の差も、係数の符号を変えて有限和として書けるので、$IJ$ は加法と加法逆元で閉じています。

さらに $r\in R$ に対し

$$
rx=
\sum_{k=1}^{m}(ri_k)j_k.
$$

$I$ はイデアルなので $ri_k\in I$ です。従って $rx\in IJ$ です。$R$ は可換なので右から掛けても同じです。

よって $IJ$ もイデアルです。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-rng2-ideal-sum-product-comaximal -->
### 4.1 定義の確認：$3\mathbb Z$ と $4\mathbb Z$

**定義の確認**

$I=3\mathbb Z$, $J=4\mathbb Z$ とします。

まず

$$
-3+4=1
$$

なので $1\in I+J$ です。$I+J$ はイデアルですから、任意の整数 $n$ に対して $n=n\cdot1\in I+J$ です。従って

$$
I+J=\mathbb Z.
$$

よって $3\mathbb Z$ と $4\mathbb Z$ は互いに素です。

積については、各項 $(3a)(4b)$ は $12$ の倍数なので $IJ\subset12\mathbb Z$ です。逆に $12n=(3)(4n)$ なので $12\mathbb Z\subset IJ$ です。

従って

$$
(3\mathbb Z)(4\mathbb Z)=12\mathbb Z.
$$
<!-- definition-example-end -->

単位元を持つ環では $I+J=R$ であることは $1\in I+J$ と同値です。

実際 $I+J=R$ なら $1\in I+J$ は明らかです。逆に $1=i+j$ と書ければ、任意の $r\in R$ に対し

$$
r=ri+rj\in I+J
$$

なので $I+J=R$ です。

---

## 5. 極大イデアルは体となる商を特徴付ける

<a id="thm-rng2-maximal-quotient-field"></a>
<!-- formal-statement-start -->
> **定理（極大イデアルと商体）**
>
> $R$ を単位元 $1\ne0$ を持つ可換環とし、$M$ を $R$ のイデアルとする。このとき次は同値である。
>
> 1. $M$ は極大イデアルである。
> 2. 商環 $R/M$ は体である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### $M$ が極大イデアルなら $R/M$ は体

$M$ は真のイデアルなので $1+M\ne M$ です。

非零元

$$
a+M\ne M
$$

を一つ取ります。これは $a\notin M$ を意味します。

$M$ と主イデアル $(a)$ の和 $M+(a)$ は $M$ を含むイデアルです。しかも $a\in M+(a)$ ですが $a\notin M$ なので

$$
M\subsetneq M+(a).
$$

$M$ は極大イデアルだから

$$
M+(a)=R.
$$

従って、ある $m\in M$, $r\in R$ が存在して

$$
1=m+ra.
$$

商環で見ると

$$
1+M=ra+M=(r+M)(a+M).
$$

従って $a+M$ は逆元 $r+M$ を持ちます。任意の非零元が逆元を持つので $R/M$ は体です。

#### $R/M$ が体なら $M$ は極大イデアル

$R/M$ は体なので零環ではなく、$M\ne R$ です。

$M$ を含むイデアル $J$ を取り

$$
M\subset J\subset R
$$

とします。

$J=M$ でなければ、ある $a\in J\setminus M$ が存在します。

$a+M$ は $R/M$ の非零元なので、ある $r+M$ が存在して

$$
(r+M)(a+M)=1+M.
$$

従って

$$
ra-1\in M\subset J.
$$

また $a\in J$ で $J$ はイデアルだから $ra\in J$ です。したがって

$$
1=ra-(ra-1)\in J.
$$

イデアルが $1$ を含めば任意の $x\in R$ に対して $x=x\cdot1\in J$ なので $J=R$ です。

従って $M$ と $R$ の間に真に中間のイデアルはなく、$M$ は極大イデアルです。$\square$
<!-- proof-end -->

### 5.1 $\mathbb Z$ の例

$\mathbb Z/5\mathbb Z$ の非零元は $\overline1,\overline2,\overline3,\overline4$ です。

それぞれ

$$
\overline1^{-1}=\overline1,\qquad
\overline2^{-1}=\overline3,\qquad
\overline3^{-1}=\overline2,\qquad
\overline4^{-1}=\overline4
$$

なので $\mathbb Z/5\mathbb Z$ は体です。従って $5\mathbb Z$ は極大イデアルです。

一方 $\mathbb Z/(0)\cong\mathbb Z$ は体ではないので、$(0)$ は極大イデアルではありません。

これにより

$$
\boxed{
(0)\subset\mathbb Z
\text{ は素イデアルだが極大イデアルではない}
}
$$

という、両概念の違いが見えます。

---

## 6. 極大性から素性を導く

<a id="cor-rng2-maximal-prime"></a>
<!-- formal-statement-start -->
> **系（極大イデアルは素イデアル）**
>
> 単位元 $1\ne0$ を持つ可換環 $R$ では、任意の極大イデアルは素イデアルである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M$ を極大イデアルとし $ab\in M$ とします。

$a\in M$ なら結論は得られています。そこで $a\notin M$ とします。

すると

$$
M\subsetneq M+(a).
$$

極大性から $M+(a)=R$ です。従って、ある $m\in M$, $r\in R$ が存在して

$$
1=m+ra.
$$

両辺に $b$ を掛けると

$$
b=mb+rab.
$$

$M$ はイデアルなので $mb\in M$ です。また $ab\in M$ から $rab\in M$ です。

従って $b\in M$ です。

よって

$$
ab\in M
\Longrightarrow
a\in M
\ \text{または}\
b\in M.
$$

したがって $M$ は素イデアルです。$\square$
<!-- proof-end -->

逆は一般には成り立ちません。先ほど見たように、$\mathbb Z$ の $(0)$ は素イデアルですが極大イデアルではありません。

---

## 7. 互いに素なら交わりと積が一致する

<a id="prop-rng2-comaximal-intersection-product"></a>
<!-- formal-statement-start -->
> **命題（互いに素なイデアルの交わりと積）**
>
> $I,J$ を $R$ の互いに素なイデアルとする。このとき
>
$$
I\cap J=IJ.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x\in IJ$ は有限和

$$
x=\sum_{k=1}^{n}i_kj_k
$$

と書けます。各 $i_kj_k$ は $I$ と $J$ の両方に属するので

$$
IJ\subset I\cap J.
$$

逆に $I+J=R$ なので

$$
1=u+v
$$

となる $u\in I$, $v\in J$ が存在します。

$x\in I\cap J$ とすると

$$
x=x(u+v)=xu+xv.
$$

$x\in J$ かつ $u\in I$ なので $xu\in IJ$ です。また $x\in I$ かつ $v\in J$ なので $xv\in IJ$ です。

従って $x\in IJ$ です。よって

$$
I\cap J=IJ.
$$

$\square$
<!-- proof-end -->

この証明で本質的なのは $1=u+v$ と分解できることです。これが「互いに素」という仮定の実際の働きです。

---

## 8. 二つのイデアルに対する中国剰余定理

<a id="thm-rng2-crt-two"></a>
<!-- formal-statement-start -->
> **定理（中国剰余定理：二つのイデアル）**
>
> $I,J$ を単位元 $1\ne0$ を持つ可換環 $R$ のイデアルとする。写像
>
$$
\Phi:R\to R/I\times R/J,
\qquad
\Phi(r)=(r+I,r+J)
$$
>
> を考える。
>
> 1. $\ker\Phi=I\cap J$ である。
> 2. $I+J=R$ なら $\Phi$ は全射である。
> 3. 従って $I+J=R$ なら
>
$$
R/(I\cap J)
\cong
R/I\times R/J.
$$
>
> さらに $I\cap J=IJ$ なので
>
$$
R/IJ
\cong
R/I\times R/J.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\Phi$ は成分ごとの加法・乗法を保つので環準同型です。

$r\in\ker\Phi$ であることは

$$
r+I=I
\quad\text{かつ}\quad
r+J=J
$$

と同値です。これは $r\in I$ かつ $r\in J$ を意味するので

$$
\ker\Phi=I\cap J.
$$

次に $I+J=R$ を仮定します。すると、ある $u\in I$, $v\in J$ が存在して

$$
u+v=1.
$$

任意の $(a+I,b+J)$ を取ります。ここで

$$
x=av+bu
$$

と置きます。

$I$ を法として見ると $u\equiv0$, $v\equiv1$ なので

$$
x\equiv a\pmod I.
$$

同様に $J$ を法として $v\equiv0$, $u\equiv1$ なので

$$
x\equiv b\pmod J.
$$

従って

$$
\Phi(x)=(a+I,b+J).
$$

任意の元が像に入るので $\Phi$ は全射です。

したがって [環の第一同型定理](../RNG1/index.md#thm-rng1-first-isomorphism-ring)から

$$
R/\ker\Phi\cong R/I\times R/J.
$$

核は $I\cap J$ なので

$$
R/(I\cap J)\cong R/I\times R/J.
$$

さらに互いに素なら $I\cap J=IJ$ なので

$$
R/IJ\cong R/I\times R/J.
$$

$\square$
<!-- proof-end -->

### 8.1 具体例：法 $3$ と法 $4$

$$
-3+4=1
$$

なので $3\mathbb Z$ と $4\mathbb Z$ は互いに素です。中国剰余定理から

$$
\mathbb Z/12\mathbb Z
\cong
\mathbb Z/3\mathbb Z
\times
\mathbb Z/4\mathbb Z.
$$

例えば

$$
x\equiv2\pmod3,
\qquad
x\equiv1\pmod4
$$

を同時に満たす整数を作ります。

$$
u=-3\in3\mathbb Z,
\qquad
v=4\in4\mathbb Z,
\qquad
u+v=1
$$

なので、証明の構成 $x=av+bu$ へ $a=2$, $b=1$ を入れると

$$
x=2\cdot4+1\cdot(-3)=5.
$$

実際

$$
5\equiv2\pmod3,
\qquad
5\equiv1\pmod4.
$$

定理の全射性の証明は、そのまま合同式の解の構成法になっています。

---

## 9. 有限個のイデアルに対する中国剰余定理

<a id="lem-rng2-comaximal-product"></a>
<!-- formal-statement-start -->
> **補題（互いに素な条件を積へまとめる）**
>
> イデアル $I,J,K$ が
>
$$
I+J=R,
\qquad
I+K=R
$$
>
> を満たすなら
>
$$
I+JK=R.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

仮定から

$$
1=a+b,
\qquad
a\in I,\ b\in J
$$

および

$$
1=c+d,
\qquad
c\in I,\ d\in K
$$

と書けます。

二式を掛けると

$$
1=(a+b)(c+d)=ac+ad+bc+bd.
$$

最初の三項は少なくとも一方の因子が $I$ に属するので

$$
ac+ad+bc\in I.
$$

最後の項は $bd\in JK$ です。

従って $1\in I+JK$、よって $I+JK=R$ です。$\square$
<!-- proof-end -->

<a id="thm-rng2-crt-finite"></a>
<!-- formal-statement-start -->
> **定理（中国剰余定理：有限個のイデアル）**
>
> $I_1,\dots,I_n$ を単位元 $1\ne0$ を持つ可換環 $R$ のイデアルとし、任意の $i\ne j$ について
>
$$
I_i+I_j=R
$$
>
> とする。
>
> このとき
>
$$
\Phi:R\to\prod_{k=1}^{n}R/I_k,
\qquad
\Phi(r)=(r+I_1,\dots,r+I_n)
$$
>
> は全射で
>
$$
\ker\Phi=\bigcap_{k=1}^{n}I_k.
$$
>
> 従って
>
$$
R/\bigcap_{k=1}^{n}I_k
\cong
\prod_{k=1}^{n}R/I_k.
$$
>
> さらに
>
$$
\bigcap_{k=1}^{n}I_k
=
\prod_{k=1}^{n}I_k
$$
>
> なので
>
$$
R/\prod_{k=1}^{n}I_k
\cong
\prod_{k=1}^{n}R/I_k.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

核については、$r\in\ker\Phi$ であることが全ての $k$ について $r\in I_k$ であることと同値なので

$$
\ker\Phi=\bigcap_{k=1}^{n}I_k.
$$

次に全射性を示します。

各 $k$ に対し

$$
J_k=\prod_{j\ne k}I_j
$$

と置きます。

$I_k$ は各 $I_j$ と互いに素です。前の補題を繰り返し使うと

$$
I_k+J_k=R.
$$

従って、ある $u_k\in I_k$, $e_k\in J_k$ が存在して

$$
u_k+e_k=1.
$$

よって

$$
e_k\equiv1\pmod{I_k}.
$$

また $j\ne k$ なら $J_k\subset I_j$ なので

$$
e_k\equiv0\pmod{I_j}.
$$

任意の $(a_1+I_1,\dots,a_n+I_n)$ を取ります。

$$
x=\sum_{k=1}^{n}a_ke_k
$$

と置くと、$I_\ell$ を法として

$$
e_\ell\equiv1,
\qquad
e_k\equiv0\quad(k\ne\ell)
$$

なので

$$
x\equiv a_\ell\pmod{I_\ell}.
$$

従って $\Phi$ は全射です。

[環の第一同型定理](../RNG1/index.md#thm-rng1-first-isomorphism-ring)から

$$
R/\bigcap_{k=1}^{n}I_k
\cong
\prod_{k=1}^{n}R/I_k.
$$

最後に交わりと積の一致を示します。

二つの場合には既に $I\cap J=IJ$ を証明しました。帰納的に

$$
I_1\cap\cdots\cap I_{m-1}
=
I_1\cdots I_{m-1}
$$

とします。

$I_m$ は $I_1,\dots,I_{m-1}$ の各々と互いに素なので、補題を繰り返すと

$$
I_m+I_1\cdots I_{m-1}=R.
$$

従って二つの場合を適用して

$$
(I_1\cdots I_{m-1})\cap I_m
=
I_1\cdots I_m.
$$

左辺は帰納法の仮定から $I_1\cap\cdots\cap I_m$ です。

よって有限個について

$$
\bigcap_{k=1}^{n}I_k
=
\prod_{k=1}^{n}I_k.
$$

以上で結論が得られます。$\square$
<!-- proof-end -->

### 9.1 整数の合同式へ戻す

$$
3\mathbb Z,\qquad
5\mathbb Z,\qquad
7\mathbb Z
$$

は二つずつ互いに素です。実際

$$
1=2\cdot3-1\cdot5,
$$

$$
1=1\cdot7-2\cdot3,
$$

$$
1=3\cdot5-2\cdot7.
$$

従って

$$
\mathbb Z/105\mathbb Z
\cong
\mathbb Z/3\mathbb Z
\times
\mathbb Z/5\mathbb Z
\times
\mathbb Z/7\mathbb Z.
$$

一般の整数 $m,n$ について「互いに素」と最大公約数や Bézout 等式を体系的に結ぶのは RNG3 で扱います。本章ではイデアル側の条件 $m\mathbb Z+n\mathbb Z=\mathbb Z$ そのものを中国剰余定理の仮定として使います。

---

## 10. どの仮定が何をしているか

### 10.1 真のイデアルという条件

素イデアルや極大イデアルで $I\ne R$ を要求しないと、$I=R$ が積に関する条件を自動的に満たしてしまいます。

しかし $R/R$ は零環であり、本章でいう整域や体ではありません。

従って「真のイデアル」は、商環の単位元と零元を区別するために必要です。

### 10.2 可換性と単位元

素イデアル・極大イデアルには非可換環でも複数の一般化があります。本章では

$$
R/P\text{ が整域},
\qquad
R/M\text{ が体}
$$

という標準的な可換環論の対応に集中するため、初めから単位元を持つ可換環へ限定しました。

### 10.3 中国剰余定理で互いに素が必要な理由

全射性の証明では

$$
1=u+v,
\qquad
u\in I,\ v\in J
$$

を使って

$$
x=av+bu
$$

を構成しました。

もし $I+J\ne R$ なら、この $1$ の分解が作れず、任意の剰余類の組を同時に実現できるとは限りません。

つまり互いに素という仮定は、別々の合同条件を独立に調整するための係数を作る条件です。

---

## 11. 演習

### Level A

#### RNG2-A01 $\mathbb Z$ の三つのイデアル
- Level: A

$\mathbb Z$ のイデアル

$$
(0),\qquad 5\mathbb Z,\qquad 6\mathbb Z
$$

について、それぞれ素イデアルか、極大イデアルかを判定せよ。判定には商環を用いてよい。

<!-- solution-start -->
##### 詳細解答

$$
\mathbb Z/(0)\cong\mathbb Z
$$

で、$\mathbb Z$ は整域なので $(0)$ は素イデアルです。しかし $\mathbb Z$ は体ではないので $(0)$ は極大イデアルではありません。

$\mathbb Z/5\mathbb Z$ の全ての非零元は逆元を持つので体です。従って $5\mathbb Z$ は極大イデアルであり、したがって素イデアルでもあります。

$\mathbb Z/6\mathbb Z$ では

$$
\overline2\,\overline3=\overline0
$$

ですが両因子は非零です。従って整域ではなく、$6\mathbb Z$ は素イデアルではありません。極大イデアルなら素イデアルなので、極大でもありません。

従って

$$
\boxed{
\begin{array}{c|cc}
I&\text{素}&\text{極大}\\
\hline
(0)&\text{はい}&\text{いいえ}\\
5\mathbb Z&\text{はい}&\text{はい}\\
6\mathbb Z&\text{いいえ}&\text{いいえ}
\end{array}
}
$$
<!-- solution-end -->

#### RNG2-A02 積環の素イデアル
- Level: A

$$
R=\mathbb Z\times\mathbb Z,
\qquad
P=\{0\}\times\mathbb Z
$$

とする。

1. $P$ が $R$ のイデアルであることを確認せよ。
2. $R/P\cong\mathbb Z$ を示せ。
3. $P$ が素イデアルだが極大イデアルではないことを示せ。

<!-- solution-start -->
##### 詳細解答

$P$ の元は $(0,b)$ の形です。

$$
(0,b)-(0,d)=(0,b-d)\in P
$$

なので加法部分群です。また任意の $(a,c)\in R$ に対し

$$
(a,c)(0,b)=(0,cb)\in P.
$$

従って $P$ はイデアルです。

第一成分への射影

$$
p_1:R\to\mathbb Z,\qquad
p_1(a,b)=a
$$

は全射環準同型で、$\ker p_1=P$ です。

従って [環の第一同型定理](../RNG1/index.md#thm-rng1-first-isomorphism-ring)から

$$
R/P\cong\mathbb Z.
$$

$\mathbb Z$ は整域なので $P$ は素イデアルです。しかし $\mathbb Z$ は体ではないので $P$ は極大イデアルではありません。

従って

$$
\boxed{
P=\{0\}\times\mathbb Z
\text{ は素だが極大ではない}
}
$$
です。
<!-- solution-end -->

#### RNG2-A03 二つの合同条件を構成する
- Level: A

$$
I=3\mathbb Z,\qquad
J=4\mathbb Z
$$

とする。

1. $I+J=\mathbb Z$ を示せ。
2.
   $$
   x\equiv2\pmod3,\qquad
   x\equiv1\pmod4
   $$
   を満たす整数を、中国剰余定理の証明の構成を使って一つ求めよ。
3. 全ての解を法 $12$ で表せ。

<!-- solution-start -->
##### 詳細解答

$$
1=-3+4
$$

で、$-3\in3\mathbb Z$, $4\in4\mathbb Z$ なので $I+J=\mathbb Z$ です。

$$
u=-3\in I,\qquad
v=4\in J,\qquad
u+v=1
$$

とします。

中国剰余定理の証明では $x=av+bu$ と置いたので

$$
x=2\cdot4+1\cdot(-3)=5.
$$

実際

$$
5\equiv2\pmod3,\qquad
5\equiv1\pmod4.
$$

また

$$
(3\mathbb Z)(4\mathbb Z)=12\mathbb Z
$$

なので、二つの合同条件を同時に満たす整数は法 $12$ で一意です。

従って

$$
\boxed{x\equiv5\pmod{12}}
$$

です。
<!-- solution-end -->

#### RNG2-A04 交わりと積を直接確認する
- Level: A

$$
I=2\mathbb Z,\qquad
J=3\mathbb Z
$$

とする。

1. $I+J=\mathbb Z$ を示せ。
2. $IJ=6\mathbb Z$ を示せ。
3. $I\cap J=6\mathbb Z$ を直接示せ。
4. [互いに素なイデアルの交わりと積](#prop-rng2-comaximal-intersection-product)と一致していることを確認せよ。

<!-- solution-start -->
##### 詳細解答

$$
1=-2+3
$$

なので $I+J=\mathbb Z$ です。

任意の積 $(2a)(3b)=6ab$ は $6\mathbb Z$ に入るので $IJ\subset6\mathbb Z$ です。逆に $6n=(2)(3n)$ なので $6\mathbb Z\subset IJ$ です。従って

$$
IJ=6\mathbb Z.
$$

次に $m\in I\cap J$ とすると、ある整数 $a,b$ が存在して

$$
m=2a=3b.
$$

$3b$ が偶数なので $b$ は偶数です。従って $b=2c$ と書け、

$$
m=3b=6c.
$$

よって $m\in6\mathbb Z$ です。

逆に $6\mathbb Z$ の元は $2$ と $3$ の両方の倍数なので $6\mathbb Z\subset I\cap J$ です。

従って

$$
\boxed{I\cap J=IJ=6\mathbb Z}.
$$
<!-- solution-end -->

### Level B

#### RNG2-B01 極大なら素を商環なしで証明する
- Level: B

$M$ を単位元 $1\ne0$ を持つ可換環 $R$ の極大イデアルとする。

$$
ab\in M,\qquad a\notin M
$$

とする。

1. $M+(a)=R$ を示せ。
2. $1=m+ra$ となる $m\in M$, $r\in R$ が存在することを示せ。
3. 両辺に $b$ を掛け、$b\in M$ を導け。
4. これにより $M$ が素イデアルであることを結論せよ。

<!-- solution-start -->
##### 詳細解答

$M+(a)$ は $M$ を含むイデアルです。しかも $a\in M+(a)$ ですが $a\notin M$ なので

$$
M\subsetneq M+(a).
$$

$M$ は極大イデアルなので

$$
M+(a)=R.
$$

特に $1\in M+(a)$ なので

$$
1=m+ra
$$

となる $m\in M$, $r\in R$ が存在します。

両辺に $b$ を掛けると

$$
b=mb+rab.
$$

$M$ はイデアルなので $mb\in M$ です。また $ab\in M$ だから $rab\in M$ です。従って $b\in M$ です。

よって

$$
ab\in M
\Longrightarrow
a\in M
\ \text{または}\
b\in M.
$$

したがって

$$
\boxed{M\text{ は素イデアル}}
$$

です。

この証明では、極大性が $M+(a)=R$ を作り、そこから $1=m+ra$ という係数表示を得る点が核心です。
<!-- solution-end -->

#### RNG2-B02 $\mathbb Z/12\mathbb Z$ を二つの商へ分解する
- Level: B

写像

$$
\Psi:\mathbb Z/12\mathbb Z
\to
\mathbb Z/3\mathbb Z\times\mathbb Z/4\mathbb Z,
\qquad
\Psi(\overline x^{\,12})
=
(\overline x^{\,3},\overline x^{\,4})
$$

を考える。

1. $\Psi$ が well-defined な環準同型であることを示せ。
2. 任意の $(\overline a^{\,3},\overline b^{\,4})$ に対し
   $$
   x=4a+9b
   $$
   と置けば $\Psi(\overline x^{\,12})$ がその元になることを示せ。
3. $\Psi$ が全単射であることを示せ。
4. 中国剰余定理との対応を説明せよ。

<!-- solution-start -->
##### 詳細解答

$$
\overline x^{\,12}=\overline y^{\,12}
$$

なら $12\mid(x-y)$ です。従って $3\mid(x-y)$ かつ $4\mid(x-y)$ なので

$$
\overline x^{\,3}=\overline y^{\,3},
\qquad
\overline x^{\,4}=\overline y^{\,4}.
$$

よって $\Psi$ は well-defined です。加法と乗法を成分ごとに保つので環準同型です。

任意の $(\overline a^{\,3},\overline b^{\,4})$ に対して $x=4a+9b$ と置きます。

法 $3$ では $4\equiv1$, $9\equiv0$ なので $x\equiv a\pmod3$ です。法 $4$ では $4\equiv0$, $9\equiv1$ なので $x\equiv b\pmod4$ です。

従って $\Psi$ は全射です。

単射性を示します。$\Psi(\overline x^{\,12})=(\overline0^{\,3},\overline0^{\,4})$ なら

$$
3\mid x,\qquad 4\mid x.
$$

$x=3k$ と書くと $4\mid3k$ です。法 $4$ では $3\cdot3\equiv1$ なので両辺に $3$ を掛ければ $k\equiv0\pmod4$ です。

従って $k=4\ell$ と書け、

$$
x=12\ell.
$$

よって $\overline x^{\,12}=\overline0^{\,12}$ です。したがって $\Psi$ は単射です。

以上から

$$
\boxed{
\mathbb Z/12\mathbb Z
\cong
\mathbb Z/3\mathbb Z\times\mathbb Z/4\mathbb Z
}
$$

です。これは $3\mathbb Z+4\mathbb Z=\mathbb Z$ に対する [中国剰余定理](#thm-rng2-crt-two)です。
<!-- solution-end -->

#### RNG2-B03 互いに素でないと全射性が壊れる
- Level: B

$$
I=4\mathbb Z,\qquad
J=6\mathbb Z
$$

とし

$$
\Phi:\mathbb Z\to
\mathbb Z/4\mathbb Z\times\mathbb Z/6\mathbb Z,
\qquad
\Phi(x)=(\overline x^{\,4},\overline x^{\,6})
$$

を考える。

1. $I+J=2\mathbb Z$ を示せ。
2. 従って $I,J$ が互いに素でないことを示せ。
3. $(\overline0^{\,4},\overline1^{\,6})$ が $\Phi$ の像に入らないことを示せ。
4. 中国剰余定理の証明のどの部分が使えなくなるか説明せよ。

<!-- solution-start -->
##### 詳細解答

$I+J$ の元は

$$
4a+6b=2(2a+3b)
$$

の形なので $I+J\subset2\mathbb Z$ です。

逆に任意の $2n$ は

$$
2n=4(-n)+6n
$$

と書けるので $2\mathbb Z\subset I+J$ です。

従って

$$
I+J=2\mathbb Z\ne\mathbb Z.
$$

よって $I,J$ は互いに素ではありません。

もし

$$
\Phi(x)=(\overline0^{\,4},\overline1^{\,6})
$$

なら、第一成分から $x$ は $4$ の倍数なので偶数です。一方、第二成分から $x=6k+1$ となり奇数です。矛盾です。

従ってこの元は像に入らず、$\Phi$ は全射ではありません。

中国剰余定理の証明では

$$
1=u+v,\qquad u\in I,\ v\in J
$$

を使っていました。しかし今は $I+J=2\mathbb Z$ なので $1\notin I+J$ です。

従ってこの分解を作れず、$x=av+bu$ によって任意の二つの剰余条件を独立に調整する手順が壊れます。

失った仮定は

$$
\boxed{I+J=R}
$$

であり、壊れた機構は

$$
\boxed{1=u+v\text{ を使う全射性の構成}}
$$

です。
<!-- solution-end -->

### Level C

#### RNG2-C01 三つの法の同時合同式
- Level: C

$$
I_1=3\mathbb Z,\qquad
I_2=5\mathbb Z,\qquad
I_3=7\mathbb Z
$$

とする。

1. 三つのイデアルが二つずつ互いに素であることを、具体的な $1$ の表示によって示せ。
2.
   $$
   e_1=70,\qquad e_2=21,\qquad e_3=15
   $$
   が
   $$
   e_k\equiv1\pmod{I_k},
   \qquad
   e_k\equiv0\pmod{I_j}\quad(j\ne k)
   $$
   を満たすことを示せ。
3. 写像
   $$
   \mathbb Z/105\mathbb Z
   \to
   \mathbb Z/3\mathbb Z
   \times
   \mathbb Z/5\mathbb Z
   \times
   \mathbb Z/7\mathbb Z
   $$
   が環同型になることを説明せよ。
4.
   $$
   x\equiv2\pmod3,\qquad
   x\equiv3\pmod5,\qquad
   x\equiv4\pmod7
   $$
   の全ての整数解を求めよ。

<!-- solution-start -->
##### 詳細解答

まず

$$
1=2\cdot3-1\cdot5,
$$

$$
1=1\cdot7-2\cdot3,
$$

$$
1=3\cdot5-2\cdot7.
$$

従って三つのイデアルは二つずつ互いに素です。

次に

$$
70\equiv1\pmod3,\qquad
70\equiv0\pmod5,\qquad
70\equiv0\pmod7,
$$

$$
21\equiv0\pmod3,\qquad
21\equiv1\pmod5,\qquad
21\equiv0\pmod7,
$$

$$
15\equiv0\pmod3,\qquad
15\equiv0\pmod5,\qquad
15\equiv1\pmod7.
$$

従って $e_1,e_2,e_3$ は、それぞれ一つの法だけで $1$、残りで $0$ になる選択子です。

[中国剰余定理（有限個のイデアル）](#thm-rng2-crt-finite)から

$$
\mathbb Z/
(3\mathbb Z\cap5\mathbb Z\cap7\mathbb Z)
\cong
\mathbb Z/3\mathbb Z
\times
\mathbb Z/5\mathbb Z
\times
\mathbb Z/7\mathbb Z.
$$

二つずつ互いに素なので交わりは積に等しく

$$
3\mathbb Z\cap5\mathbb Z\cap7\mathbb Z
=
(3\mathbb Z)(5\mathbb Z)(7\mathbb Z)
=
105\mathbb Z.
$$

従って

$$
\boxed{
\mathbb Z/105\mathbb Z
\cong
\mathbb Z/3\mathbb Z
\times
\mathbb Z/5\mathbb Z
\times
\mathbb Z/7\mathbb Z
}
$$

です。

合同式を解くため

$$
x=2e_1+3e_2+4e_3
$$

と置きます。

すると

$$
x
=
2\cdot70+3\cdot21+4\cdot15
=
140+63+60
=
263.
$$

法 $105$ で

$$
263=2\cdot105+53
$$

なので

$$
x\equiv53\pmod{105}.
$$

確認すると

$$
53\equiv2\pmod3,\qquad
53\equiv3\pmod5,\qquad
53\equiv4\pmod7.
$$

中国剰余定理により解は法 $105$ で一意なので、全ての整数解は

$$
\boxed{x\equiv53\pmod{105}}
$$

です。

この問題では

$$
\text{二つずつ互いに素}
\to
\text{選択子 }e_k
\to
\text{同時合同式の構成}
\to
\text{法 }105\text{ での一意性}
$$

という有限版中国剰余定理の核心を一通り再構成しています。
<!-- solution-end -->

---

## 12. 章末まとめ

本章では、RNG1 の商環を使ってイデアルの構造を読み取りました。

$$
\boxed{
P\text{ が素イデアル}
\iff
R/P\text{ が整域}
}
$$

および

$$
\boxed{
M\text{ が極大イデアル}
\iff
R/M\text{ が体}
}
$$

を証明しました。

従って

$$
\boxed{
\text{極大イデアル}
\Longrightarrow
\text{素イデアル}
}
$$

が従います。ただし逆は一般には成り立ちません。

さらに互いに素なイデアル $I+J=R$ に対して

$$
I\cap J=IJ
$$

を証明し、中国剰余定理

$$
\boxed{
R/IJ
\cong
R/I\times R/J
}
$$

を得ました。

有限個の二つずつ互いに素なイデアルについても

$$
\boxed{
R/\prod_{k=1}^{n}I_k
\cong
\prod_{k=1}^{n}R/I_k
}
$$

が成り立ちます。

次の RNG3 では、整域の中で「割り算の余り」「最大公約数」「Bézout 等式」「既約元・素元」を体系化し、

$$
\text{Euclid 整域}
\Longrightarrow
\text{単項イデアル整域}
\Longrightarrow
\text{一意分解整域}
$$

という整除理論の主線へ進みます。
