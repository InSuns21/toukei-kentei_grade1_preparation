# MOD1 抽象代数 IX：加群・部分加群・商加群・自由加群

<!-- definition-example-audit: strict -->

[RNG4](../RNG4/index.md) までで、環とそのイデアル、整除、一意分解、多項式環を学びました。[LA2](../LA2/index.md) では、体上のベクトル空間について部分空間・商空間・第一同型定理を扱いました。

本章では、この二つの流れを一つにまとめます。

ベクトル空間ではスカラーは体の元でした。加群では、スカラーを一般の環の元まで広げます。見た目は小さな一般化ですが、非零スカラーを割れなくなるため、ベクトル空間では自動的だった性質がいくつも失われます。

例えば、

- 有限生成だからといって基底があるとは限らない。
- 非零元が非零スカラーで $0$ に潰れることがある。
- 同じ「線形代数型の議論」でも、環の性質を明示しないと成立しない。

一方で、商・準同型・第一同型定理という骨格はそのまま残ります。

本章の主線は

$$
\boxed{
\text{環の作用}
\to
\text{部分加群}
\to
\text{商加群}
\to
\text{第一同型定理}
}
$$

と

$$
\boxed{
\text{生成系}
\to
\text{自由加群}
\to
\text{基底の普遍性}
\to
\text{ねじれ}
}
$$

です。

最後に、線形自己写像 $T$ を

$$
p(x)\cdot v=p(T)v
$$

という $F[x]$ の作用として読み替えます。これが MOD2 で Smith 標準形と PID 上有限生成加群の構造定理を線形自己写像の分類へ結び付ける入口です。

> **この章の停止線**
>
> 本章では加群の基本構造、商、第一同型定理、自由加群、ねじれ、線形自己写像から作る $F[x]$-加群まで扱います。Smith 標準形、PID 上有限生成加群の構造定理、有限生成 Abel 群の分類は MOD2 へ送ります。

---

## 1. 加群は「環上の線形空間」である

本章では、特に断らない限り $R$ を単位元 $1\ne0$ を持つ環とします。可換性が必要な箇所では明示します。

<a id="def-mod1-module"></a>
<!-- formal-statement-start -->
> **定義（左加群・右加群）**
>
> $M$ を加法について Abel 群とする。写像
>
$$
R\times M\to M,
\qquad
(r,m)\mapsto rm
$$
>
> があり、任意の $r,s\in R$、$m,n\in M$ に対して
>
$$
r(m+n)=rm+rn,
$$
>
$$
(r+s)m=rm+sm,
$$
>
$$
(rs)m=r(sm),
$$
>
$$
1m=m
$$
>
> を満たすとき、$M$ を **左 $R$-加群** という。
>
> 同様に、右から作用する $mr$ を用い
>
$$
(m+n)r=mr+nr,
\qquad
m(r+s)=mr+ms,
$$
>
$$
m(rs)=(mr)s,
\qquad
m1=m
$$
>
> を満たすものを **右 $R$-加群** という。
<!-- formal-statement-end -->

可換環では、左作用 $rm$ から

$$
mr:=rm
$$

と置けば右作用も得られるので、左右を区別せず単に $R$-加群と呼ぶことが多くなります。非可換環では作用する側を変えると結合法則の向きが変わるため、左右を区別します。

<!-- definition-example-start: def-mod1-module -->
### 1.1 $\mathbb Z/n\mathbb Z$ は $\mathbb Z$-加群

**定義の確認**

$M=\mathbb Z/n\mathbb Z$ とし、整数 $k$ と剰余類 $[a]$ に対して

$$
k[a]=[ka]
$$

と定めます。

例えば

$$
k([a]+[b])
=
k[a+b]
=
[k(a+b)]
$$

であり、

$$
[k(a+b)]
=
[ka]+[kb]
=
k[a]+k[b].
$$

また

$$
(k+\ell)[a]
=
[(k+\ell)a]
=
[ka]+[\ell a]
=
k[a]+\ell[a],
$$

$$
(k\ell)[a]
=
[k\ell a]
=
k[\ell a]
=
k(\ell[a]),
$$

$$
1[a]=[a].
$$

従って $\mathbb Z/n\mathbb Z$ は左 $\mathbb Z$-加群です。

ここでは「整数倍」は新しい操作ではありません。Abel 群の加法を繰り返す操作を、環 $\mathbb Z$ の作用として読み替えています。
<!-- definition-example-end -->

### 1.2 ベクトル空間は加群の特別な場合

体 $F$ は環なので、$F$-ベクトル空間はそのまま $F$-加群です。

違いは、体では

$$
a\ne0
\Longrightarrow
a^{-1}\text{ が存在}
$$

するのに対し、一般の環では非零元を割れないことです。

この差が後で

$$
rm=0
\qquad
(r\ne0,\ m\ne0)
$$

という現象を生みます。

### 1.3 可換環ではイデアルが部分加群になる

ここだけ $R$ を可換環とします。$R$ を自分自身への乗法

$
r\cdot x=rx
$

で $R$-加群とみなします。

[RNG1 のイデアル](../RNG1/index.md#def-rng1-ideal) $I\subset R$ は加法について部分群で、任意の $r\in R$、$x\in I$ に対して

$
rx\in I
$

を満たします。

従って $I$ は $R$ の部分加群です。逆に $R$ の部分加群 $L\subset R$ は加法について部分群で、任意の $r\in R$ と $x\in L$ に対して $rx\in L$ なので、$R$ のイデアルです。

したがって可換環では

$
\boxed{
R\text{ のイデアル}
\Longleftrightarrow
R\text{ を }R\text{-加群とみたときの部分加群}
}
$

と読み替えられます。

---

## 2. 加群準同型は加法と環作用を同時に保つ

<a id="def-mod1-homomorphism"></a>
<!-- formal-statement-start -->
> **定義（加群準同型・核・像）**
>
> $M,N$ を左 $R$-加群とする。写像
>
$$
\varphi:M\to N
$$
>
> が任意の $m,n\in M$、$r\in R$ に対して
>
$$
\varphi(m+n)=\varphi(m)+\varphi(n),
$$
>
$$
\varphi(rm)=r\varphi(m)
$$
>
> を満たすとき、$\varphi$ を **$R$-加群準同型** という。
>
> さらに
>
$$
\ker\varphi
=
\{m\in M:\varphi(m)=0\},
$$
>
$$
\operatorname{Im}\varphi
=
\{\varphi(m):m\in M\}
$$
>
> をそれぞれ核、像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod1-homomorphism -->
### 2.1 剰余類への標準写像

**定義の確認**

$$
\pi:\mathbb Z\to\mathbb Z/6\mathbb Z,
\qquad
\pi(a)=[a]
$$

を考えます。

$$
\pi(a+b)
=
[a+b]
=
[a]+[b]
=
\pi(a)+\pi(b)
$$

であり、任意の $k\in\mathbb Z$ に対して

$$
\pi(ka)
=
[ka]
=
k[a]
=
k\pi(a).
$$

従って $\pi$ は $\mathbb Z$-加群準同型です。

核は

$$
\ker\pi=6\mathbb Z,
$$

像は

$$
\operatorname{Im}\pi=\mathbb Z/6\mathbb Z
$$

です。
<!-- definition-example-end -->

---

## 3. 部分加群は「線形結合で閉じる部分集合」である

<a id="def-mod1-submodule"></a>
<!-- formal-statement-start -->
> **定義（部分加群）**
>
> $M$ を左 $R$-加群とする。部分集合 $L\subset M$ が、$M$ の加法と $R$-作用を制限することで左 $R$-加群になるとき、$L$ を $M$ の **部分加群** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod1-submodule -->
### 3.1 $2\mathbb Z\subset\mathbb Z$

**定義の確認**

$\mathbb Z$ を $\mathbb Z$-加群と見ます。

$$
2\mathbb Z
=
\{2a:a\in\mathbb Z\}
$$

は $0=2\cdot0$ を含みます。

$2a,2b\in2\mathbb Z$ なら

$$
2a+2b=2(a+b)\in2\mathbb Z,
$$

また任意の $k\in\mathbb Z$ に対して

$$
k(2a)=2(ka)\in2\mathbb Z.
$$

従って $2\mathbb Z$ は $\mathbb Z$ の部分加群です。
<!-- definition-example-end -->

毎回すべての加群公理を確認する必要はありません。必要なのは、$M$ の演算を制限しても集合の外へ出ないことです。

<a id="prop-mod1-submodule-test"></a>
<!-- formal-statement-start -->
> **命題（部分加群判定）**
>
> $M$ を左 $R$-加群、空でない部分集合 $L\subset M$ とする。
>
> このとき次は同値である。
>
> 1. $L$ は $M$ の部分加群である。
> 2. 任意の $x,y\in L$ と $r,s\in R$ に対して
>
$$
rx+sy\in L
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

部分加群なら線形結合で閉じるのは定義から直ちに従います。

逆向きでは、空でないことから一つ $x\in L$ を取り、係数 $0,-1$ を使って零元と加法逆元を回収します。その後、加法とスカラー倍の閉性を取り出せばよいだけです。

<!-- proof-start -->
### 証明

1 から 2 は、$L$ が加法とスカラー倍で閉じるので従います。

2 から 1 を示します。

$L$ は空でないので、ある $x\in L$ を取れます。$r=s=0$ とすれば

$$
0x+0x=0\in L.
$$

任意の $x\in L$ に対し $r=-1,s=0$ と置くと

$$
(-1)x+0x=-x\in L.
$$

任意の $x,y\in L$ に対し $r=s=1$ と置けば

$$
x+y\in L.
$$

任意の $x\in L$、$r\in R$ に対し、$y=0\in L$、$s=0$ と置けば

$$
rx\in L.
$$

従って $L$ は加法について部分群であり、さらに $R$ の作用で閉じています。

結合則・分配法則・単位元作用は $M$ で成立している等式をそのまま制限すればよいので、$L$ は左 $R$-加群です。$\square$
<!-- proof-end -->

<a id="prop-mod1-kernel-image"></a>
<!-- formal-statement-start -->
> **命題（加群準同型の核と像は部分加群）**
>
> 左 $R$-加群の準同型
>
$$
\varphi:M\to N
$$
>
> に対して、$\ker\varphi$ は $M$ の部分加群、$\operatorname{Im}\varphi$ は $N$ の部分加群である。
<!-- formal-statement-end -->

### 証明の見取り図

[部分加群判定](#prop-mod1-submodule-test)を使います。核では

$$
\varphi(rx+sy)
=
r\varphi(x)+s\varphi(y)
$$

が $0$ になることを確認します。像では、像の元を $\varphi(x),\varphi(y)$ と書いてから線形結合を一つの像へ戻します。

<!-- proof-start -->
### 証明

まず核を考えます。

$0\in\ker\varphi$ なので空ではありません。$x,y\in\ker\varphi$、$r,s\in R$ とすると

$$
\varphi(rx+sy)
=
r\varphi(x)+s\varphi(y)
=
0.
$$

従って

$$
rx+sy\in\ker\varphi.
$$

[部分加群判定](#prop-mod1-submodule-test)から $\ker\varphi$ は部分加群です。

次に像を考えます。

$\varphi(0)=0$ なので $0\in\operatorname{Im}\varphi$ です。

$u,v\in\operatorname{Im}\varphi$ とすると、ある $x,y\in M$ が存在して

$$
u=\varphi(x),
\qquad
v=\varphi(y).
$$

任意の $r,s\in R$ に対し

$$
ru+sv
=
r\varphi(x)+s\varphi(y)
=
\varphi(rx+sy)
\in\operatorname{Im}\varphi.
$$

従って像も部分加群です。$\square$
<!-- proof-end -->

---

## 4. 商加群では部分加群を $0$ とみなす

LA2 の商空間と同じ発想で、部分加群 $L\subset M$ の元だけ違うものを同一視します。

<a id="def-mod1-quotient-module"></a>
<!-- formal-statement-start -->
> **定義（商加群）**
>
> $M$ を左 $R$-加群、$L\subset M$ を部分加群とする。
>
> 加法群の剰余類
>
$$
m+L
=
\{m+\ell:\ell\in L\}
$$
>
> 全体を
>
$$
M/L
$$
>
> と書く。
>
> 剰余類に
>
$$
(m+L)+(n+L)
=
(m+n)+L,
$$
>
$$
r(m+L)
=
rm+L
$$
>
> と演算を定めたものを **商加群** という。
<!-- formal-statement-end -->

この定義で一番重要なのは、代表元を取り替えても答えが変わらないことです。

<!-- definition-example-start: def-mod1-quotient-module -->
### 4.1 $\mathbb Z/4\mathbb Z$

**定義の確認**

$M=\mathbb Z$、$L=4\mathbb Z$ とすると、商加群は

$$
\mathbb Z/4\mathbb Z
=
\{0+4\mathbb Z,1+4\mathbb Z,2+4\mathbb Z,3+4\mathbb Z\}.
$$

例えば

$$
(1+4\mathbb Z)+(3+4\mathbb Z)
=
4+4\mathbb Z
=
4\mathbb Z
$$

です。

また整数 $3$ を作用させると

$$
3(2+4\mathbb Z)
=
6+4\mathbb Z
=
2+4\mathbb Z.
$$

代表元を $2$ から $6$ に変えても

$$
3(6+4\mathbb Z)
=
18+4\mathbb Z
=
2+4\mathbb Z
$$

となり、同じ剰余類を得ます。
<!-- definition-example-end -->

<a id="prop-mod1-quotient-well-defined"></a>
<!-- formal-statement-start -->
> **命題（商加群の演算の良定義性）**
>
> $M$ を左 $R$-加群、$L\subset M$ を部分加群とする。
>
> 上で定めた
>
$$
(m+L)+(n+L)=(m+n)+L,
$$
>
$$
r(m+L)=rm+L
$$
>
> は代表元の選び方によらず良定義であり、$M/L$ を左 $R$-加群にする。
<!-- formal-statement-end -->

### 証明の見取り図

代表元を

$$
m'=m+\ell_1,
\qquad
n'=n+\ell_2
$$

へ変えたとき、差が再び $L$ に入ることを示します。

加法では $\ell_1+\ell_2\in L$、スカラー倍では $r\ell_1\in L$ が必要です。ここで「$L$ が単なる加法部分群ではなく部分加群であること」が働きます。

<!-- proof-start -->
### 証明

$$
m+L=m'+L,
\qquad
n+L=n'+L
$$

とします。

これは

$$
m-m'\in L,
\qquad
n-n'\in L
$$

を意味します。

加法について

$$
(m+n)-(m'+n')
=
(m-m')+(n-n')
\in L
$$

なので

$$
(m+n)+L=(m'+n')+L.
$$

従って加法は良定義です。

次にスカラー倍を考えます。$m+L=m'+L$ なら

$$
m-m'\in L.
$$

$L$ は部分加群なので

$$
r(m-m')\in L.
$$

すなわち

$$
rm-rm'\in L.
$$

従って

$$
rm+L=rm'+L.
$$

よってスカラー倍も良定義です。

残る加群公理は $M$ の公理から従います。例えば

$$
r((m+L)+(n+L))
=
r((m+n)+L)
=
r(m+n)+L
$$

$$
=
(rm+rn)+L
=
(rm+L)+(rn+L).
$$

同様に

$$
(rs)(m+L)
=
((rs)m)+L
=
r(sm)+L
=
r(sm+L),
$$

また

$$
1(m+L)=m+L.
$$

従って $M/L$ は左 $R$-加群です。$\square$
<!-- proof-end -->

### 4.2 なぜ「部分加群」が必要なのか

$M=\mathbb Q$ を $\mathbb Q$-加群とし、加法部分群

$$
L=\mathbb Z
$$

を考えます。

$\mathbb Z$ は $\mathbb Q$ の加法部分群ですが、$\mathbb Q$-部分加群ではありません。実際

$$
1\in\mathbb Z
$$

なのに

$$
\frac12\cdot1=\frac12\notin\mathbb Z.
$$

加法群としては

$$
0+\mathbb Z
=
1+\mathbb Z
$$

です。

もし $\mathbb Q$ のスカラー倍を商へ入れようとすると、

$$
\frac12(0+\mathbb Z)
=
0+\mathbb Z
$$

である一方、

$$
\frac12(1+\mathbb Z)
=
\frac12+\mathbb Z
$$

となり、この二つは同じ剰余類ではありません。

壊れたのは、証明中の

$$
r(m-m')\in L
$$

という一段です。

---

## 5. 第一同型定理は「核だけを潰せば像になる」

準同型 $\varphi:M\to N$ は、核の中の差を見分けられません。

実際、

$$
m-m'\in\ker\varphi
$$

なら

$$
\varphi(m)-\varphi(m')
=
\varphi(m-m')
=
0.
$$

そこで最初から核だけ異なる元を同じ剰余類として扱います。

<a id="thm-mod1-first-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（加群の第一同型定理）**
>
> 左 $R$-加群の準同型
>
$$
\varphi:M\to N
$$
>
> に対して
>
$$
\widetilde\varphi:
M/\ker\varphi
\to
\operatorname{Im}\varphi,
\qquad
\widetilde\varphi(m+\ker\varphi)=\varphi(m)
$$
>
> は良定義な $R$-加群同型である。
>
> 従って
>
$$
M/\ker\varphi
\cong
\operatorname{Im}\varphi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

LA2 の線形空間版と論理は同じです。

ただし「線形写像」という語に頼らず、

1. 代表元を変えても値が同じ。
2. 加法と $R$-作用を保つ。
3. 像を終域に取ったので全射。
4. 核が零剰余類だけなので単射。

の四点を加群の言葉で確認します。

<!-- proof-start -->
### 証明

まず良定義性を示します。

$$
m+\ker\varphi
=
m'+\ker\varphi
$$

なら

$$
m-m'\in\ker\varphi.
$$

従って

$$
\varphi(m-m')=0.
$$

加法性から

$$
\varphi(m)-\varphi(m')=0,
$$

よって

$$
\varphi(m)=\varphi(m').
$$

従って $\widetilde\varphi$ は代表元によらず定まります。

次に準同型性です。任意の $m,n\in M$ と $r\in R$ に対して

$$
\widetilde\varphi((m+\ker\varphi)+(n+\ker\varphi))
=
\widetilde\varphi((m+n)+\ker\varphi)
$$

$$
=
\varphi(m+n)
=
\varphi(m)+\varphi(n)
$$

$$
=
\widetilde\varphi(m+\ker\varphi)
+
\widetilde\varphi(n+\ker\varphi).
$$

また

$$
\widetilde\varphi(r(m+\ker\varphi))
=
\widetilde\varphi(rm+\ker\varphi)
$$

$$
=
\varphi(rm)
=
r\varphi(m)
=
r\widetilde\varphi(m+\ker\varphi).
$$

従って $\widetilde\varphi$ は加群準同型です。

全射性は像の定義から従います。任意の $y\in\operatorname{Im}\varphi$ に対して、ある $m\in M$ が存在して

$$
y=\varphi(m)
=
\widetilde\varphi(m+\ker\varphi).
$$

最後に単射性を示します。

$$
\widetilde\varphi(m+\ker\varphi)=0
$$

なら

$$
\varphi(m)=0.
$$

従って

$$
m\in\ker\varphi.
$$

よって

$$
m+\ker\varphi=\ker\varphi
$$

は商加群の零元です。

従って $\ker\widetilde\varphi$ は零元だけであり、$\widetilde\varphi$ は単射です。

以上より $\widetilde\varphi$ は同型です。$\square$
<!-- proof-end -->

### 5.1 例：$\mathbb Z/n\mathbb Z$ は整数の商加群

標準写像

$$
\pi:\mathbb Z\to\mathbb Z/n\mathbb Z,
\qquad
a\mapsto[a]
$$

は全射で、

$$
\ker\pi=n\mathbb Z.
$$

従って第一同型定理から

$$
\mathbb Z/\ker\pi
\cong
\operatorname{Im}\pi,
$$

すなわち

$$
\mathbb Z/n\mathbb Z
\cong
\mathbb Z/n\mathbb Z
$$

となります。

式自体は同じ対象が両側に現れますが、本質は

$$
\boxed{
\mathbb Z\text{ から }n\mathbb Z\text{ を潰したもの}
=
\mathbb Z/n\mathbb Z
}
$$

という構成原理です。

---

## 6. 生成系は「有限線形結合で全部を作る」

ベクトル空間で span を使ったのと同じように、加群でも与えられた元から線形結合を作ります。

<a id="def-mod1-generating-set"></a>
<!-- formal-statement-start -->
> **定義（生成系・有限生成加群）**
>
> $M$ を左 $R$-加群、$S\subset M$ とする。
>
> $S$ の元の有限個の $R$-線形結合全体
>
$$
\langle S\rangle_R
=
\left\{
\sum_{i=1}^{k}r_i s_i
:
k\ge0,\ 
r_i\in R,\ 
s_i\in S
\right\}
$$
>
> を $S$ が生成する部分加群という。
>
> $\langle S\rangle_R=M$ のとき、$S$ を $M$ の **生成系** という。
>
> 有限集合 $S$ で $M$ を生成できるとき、$M$ を **有限生成加群** という。
<!-- formal-statement-end -->

$k=0$ の和は $0$ とします。

<!-- definition-example-start: def-mod1-generating-set -->
### 6.1 $\mathbb Z^2$ は二つの元で生成される

**定義の確認**

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

とします。

任意の $(a,b)\in\mathbb Z^2$ は

$$
(a,b)=ae_1+be_2
$$

と書けます。

従って

$$
\mathbb Z^2
=
\langle e_1,e_2\rangle_{\mathbb Z}.
$$

よって $\mathbb Z^2$ は有限生成 $\mathbb Z$-加群です。
<!-- definition-example-end -->

---

## 7. 自由加群では座標表示が一意である

生成できることと、係数表示が一意であることは別問題です。

<a id="def-mod1-free-module-basis"></a>
<!-- formal-statement-start -->
> **定義（加群の基底・自由加群）**
>
> $M$ を左 $R$-加群とする。
>
> 部分集合 $B\subset M$ が **基底** であるとは、任意の $m\in M$ が、互いに異なる有限個の $b_i\in B$ を用いて一意に
>
$$
m
=
r_1b_1+\cdots+r_kb_k
$$
>
> と書けることをいう。ここで $r_i\in R$ である。
>
> 基底を持つ $R$-加群を **自由加群** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod1-free-module-basis -->
### 7.1 $R^2$ の標準基底

**定義の確認**

左 $R$-加群

$$
R^2
$$

に対して

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

を考えます。

任意の $(a,b)\in R^2$ は

$$
(a,b)=ae_1+be_2
$$

と書けます。

もし

$$
ae_1+be_2
=
a'e_1+b'e_2
$$

なら成分比較から

$$
a=a',
\qquad
b=b'.
$$

従って $\{e_1,e_2\}$ は基底で、$R^2$ は自由 $R$-加群です。
<!-- definition-example-end -->

### 7.2 有限生成でも自由とは限らない

$\mathbb Z/6\mathbb Z$ を $\mathbb Z$-加群として見ます。

これは

$$
\mathbb Z/6\mathbb Z
=
\langle[1]\rangle_{\mathbb Z}
$$

なので一つの元で生成されます。

しかし

$$
6[1]=0
$$

という非自明な係数関係があります。

もし $\{[1]\}$ が基底なら、零元の表示は係数 $0$ だけでなければならないので、

$$
6[1]=0[1]
$$

から $6=0$ が必要になります。これは $\mathbb Z$ では偽です。

従って $\mathbb Z/6\mathbb Z$ は有限生成ですが、$\mathbb Z$ 上自由ではありません。

ベクトル空間では有限生成空間から基底を取り出せますが、一般の環上の加群ではこの結論は成立しません。

---

## 8. 自由加群の普遍性は「基底上で決めれば十分」を定式化する

線形写像は基底の像で決まる、という線形代数の事実は自由加群でもそのまま残ります。

<a id="thm-mod1-free-universal-property"></a>
<!-- formal-statement-start -->
> **定理（自由加群の普遍性）**
>
> $M$ を左 $R$-加群、$B$ を $M$ の基底とする。
>
> 任意の左 $R$-加群 $N$ と写像
>
$$
f:B\to N
$$
>
> に対して、$f$ を延長する $R$-加群準同型
>
$$
\Phi:M\to N
$$
>
> がただ一つ存在する。
>
> すなわち任意の $b\in B$ に対して
>
$$
\Phi(b)=f(b)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$m\in M$ は基底を使って一意に有限和

$$
m=\sum_i r_i b_i
$$

と書けます。

そこで

$$
\Phi(m)
=
\sum_i r_i f(b_i)
$$

と置く以外に候補はありません。

存在には「基底表示が一意であること」、一意性には「準同型は線形結合を保つこと」が使われます。

<!-- proof-start -->
### 証明

任意の $m\in M$ に対して、基底性から一意な有限表示

$$
m=\sum_{i=1}^{k}r_i b_i
$$

が存在します。

そこで

$$
\Phi(m)
:=
\sum_{i=1}^{k}r_i f(b_i)
$$

と定めます。

基底表示が一意なので、この値は $m$ の表示の選び方に依存せず良定義です。

次に準同型性を確認します。

$$
m=\sum_i r_i b_i,
\qquad
n=\sum_i s_i b_i
$$

と、現れる基底元を必要なら係数 $0$ を補って共通に取ります。

すると

$$
m+n
=
\sum_i(r_i+s_i)b_i
$$

なので

$$
\Phi(m+n)
=
\sum_i(r_i+s_i)f(b_i)
$$

$$
=
\sum_i r_if(b_i)
+
\sum_i s_if(b_i)
=
\Phi(m)+\Phi(n).
$$

また $a\in R$ に対して

$$
am
=
\sum_i(ar_i)b_i
$$

だから

$$
\Phi(am)
=
\sum_i(ar_i)f(b_i)
=
a\sum_i r_if(b_i)
=
a\Phi(m).
$$

従って $\Phi$ は $R$-加群準同型です。

基底元 $b\in B$ は

$$
b=1b
$$

と書けるので

$$
\Phi(b)=1f(b)=f(b).
$$

よって $\Phi$ は $f$ を延長します。

最後に一意性を示します。

$\Psi:M\to N$ も $f$ を延長する準同型とすると、任意の

$$
m=\sum_i r_i b_i
$$

に対して

$$
\Psi(m)
=
\sum_i r_i\Psi(b_i)
=
\sum_i r_i f(b_i)
=
\Phi(m).
$$

従って $\Psi=\Phi$ です。$\square$
<!-- proof-end -->

### 8.1 有限基底なら行列が現れる

特に $M=R^n$ なら、標準基底 $e_1,\dots,e_n$ の像を決めれば準同型が一意に決まります。

$N=R^m$ なら各 $\Phi(e_j)$ は $R^m$ の列ベクトルなので、それらを並べた $m\times n$ 行列が $\Phi$ を表します。

つまり「行列は自由加群間準同型の座標表示」という見方ができます。

---

## 9. ねじれは体上では見えない新現象である

ここからは $R$ を **可換整域** とします。

整域という仮定を置く理由は、二つの非零消去係数を掛けても非零であることを保証するためです。

<a id="def-mod1-torsion"></a>
<!-- formal-statement-start -->
> **定義（ねじれ元・ねじれ加群・ねじれなし加群）**
>
> $R$ を可換整域、$M$ を $R$-加群とする。
>
> $m\in M$ が **ねじれ元** であるとは、ある $0\ne r\in R$ が存在して
>
$$
rm=0
$$
>
> となることをいう。
>
> ねじれ元全体を
>
$$
\operatorname{Tor}_R(M)
$$
>
> と書く。
>
> 全ての元がねじれ元であるとき $M$ を **ねじれ加群**、$0$ 以外にねじれ元を持たないとき $M$ を **ねじれなし加群** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod1-torsion -->
### 9.1 $\mathbb Z/6\mathbb Z$ と $\mathbb Z$

**定義の確認**

$\mathbb Z/6\mathbb Z$ では

$$
6[a]=[0]
$$

が全ての $[a]$ に対して成り立ちます。

従って全ての元がねじれ元であり、$\mathbb Z/6\mathbb Z$ はねじれ $\mathbb Z$-加群です。

一方 $\mathbb Z$ 自身では、

$$
km=0,
\qquad
k\ne0
$$

なら整数の積が $0$ なので

$$
m=0.
$$

従って $\mathbb Z$ はねじれなし $\mathbb Z$-加群です。
<!-- definition-example-end -->

<a id="prop-mod1-torsion-submodule"></a>
<!-- formal-statement-start -->
> **命題（ねじれ元全体は部分加群）**
>
> $R$ を可換整域、$M$ を $R$-加群とする。
>
> このとき
>
$$
\operatorname{Tor}_R(M)
=
\{m\in M:\exists\,0\ne r\in R,\ rm=0\}
$$
>
> は $M$ の部分加群である。
<!-- formal-statement-end -->

### 証明の見取り図

$m,n$ をそれぞれ非零元 $a,b$ が消すとします。

和 $m+n$ を消す係数として

$$
ab
$$

を使います。

ここで整域性から

$$
a\ne0,\ b\ne0
\Longrightarrow
ab\ne0
$$

が必要です。

<!-- proof-start -->
### 証明

まず $0\in\operatorname{Tor}_R(M)$ です。実際 $1\ne0$ で

$$
1\cdot0=0.
$$

$m,n\in\operatorname{Tor}_R(M)$ とします。

するとある $0\ne a,b\in R$ が存在して

$$
am=0,
\qquad
bn=0.
$$

$R$ は整域なので

$$
ab\ne0.
$$

さらに可換性と加群公理から

$$
(ab)(m+n)
=
(ab)m+(ab)n
$$

$$
=
b(am)+a(bn)
=
0.
$$

従って

$$
m+n\in\operatorname{Tor}_R(M).
$$

次に $c\in R$ と $m\in\operatorname{Tor}_R(M)$ を取ります。

ある $0\ne a\in R$ が

$$
am=0
$$

を満たします。

すると可換性から

$$
a(cm)
=
(ac)m
=
(ca)m
=
c(am)
=
0.
$$

従って

$$
cm\in\operatorname{Tor}_R(M).
$$

よって $\operatorname{Tor}_R(M)$ は加法とスカラー倍で閉じ、部分加群です。$\square$
<!-- proof-end -->

### 9.2 整域性を外すと何が壊れるか

$R=\mathbb Z/6\mathbb Z$ を自分自身上の加群とします。

$[2]$ は

$$
[3][2]=[0]
$$

なので、非零スカラーに消されます。

$[3]$ も

$$
[2][3]=[0]
$$

なので同様です。

しかし

$$
[2]+[3]=[5]
$$

はねじれ元ではありません。

実際

$$
r[5]=[0]
$$

なら $[5]$ は $\mathbb Z/6\mathbb Z$ の単元なので

$$
r=[0].
$$

従って非零スカラーで $[5]$ を消せません。

つまり、零因子があると

$$
a\ne0,\quad b\ne0
$$

でも

$$
ab=0
$$

となり得ます。ねじれ部分加群の証明で「$ab$ が非零の共通消去係数になる」という機構が壊れます。

---

## 10. $\mathbb Z$-加群は Abel 群そのものである

加群論が群論を含む最も重要な例が $\mathbb Z$-加群です。

<a id="prop-mod1-z-mod-abelian"></a>
<!-- formal-statement-start -->
> **命題（整数環上の加群と Abel 群の対応）**
>
> 任意の Abel 群 $A$ には
>
$$
n\cdot a
=
\begin{cases}
\underbrace{a+\cdots+a}_{n\text{ 個}}, & n>0,\\
0, & n=0,\\
-\bigl((-n)\cdot a\bigr), & n<0
\end{cases}
$$
>
> により自然な $\mathbb Z$-加群構造が入る。
>
> 逆に、任意の $\mathbb Z$-加群は加法について Abel 群である。
>
> さらに Abel 群準同型は、この自然な $\mathbb Z$-加群構造に関する加群準同型と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

整数倍は Abel 群で既に定義できる操作です。

加群公理のうち

$$
(n+m)a=na+ma,
\qquad
(nm)a=n(ma)
$$

は整数倍の基本性質です。

また群準同型は加法を保つので、正の整数倍を保ち、零と負の整数倍も自動的に保ちます。

<!-- proof-start -->
### 証明

Abel 群 $A$ に上の整数倍を定めます。

任意の整数 $m,n$ と $a,b\in A$ に対して、整数倍の定義から

$$
n(a+b)=na+nb,
$$

$$
(m+n)a=ma+na,
$$

$$
(mn)a=m(na),
$$

$$
1a=a
$$

が成り立ちます。

正整数については繰り返し加法から直接確認でき、$0$ と負整数については加法逆元の定義を使って拡張されます。

従って $A$ は $\mathbb Z$-加群です。

逆に、$\mathbb Z$-加群の定義では $M$ は最初から加法について Abel 群であることを要求しているので、逆向きは直ちに従います。

最後に Abel 群準同型

$$
f:A\to B
$$

を取ります。

$n>0$ なら

$$
f(na)
=
f(\underbrace{a+\cdots+a}_{n\text{ 個}})
=
\underbrace{f(a)+\cdots+f(a)}_{n\text{ 個}}
=
nf(a).
$$

$n=0$ では両辺 $0$ です。

$n<0$ では

$$
f(na)
=
f(-((-n)a))
=
-f((-n)a)
=
-((-n)f(a))
=
nf(a).
$$

従って群準同型は $\mathbb Z$-加群準同型です。

逆向きは加群準同型の定義に加法性が含まれるので直ちに従います。$\square$
<!-- proof-end -->

この対応により、有限生成 Abel 群の分類は「$\mathbb Z$ という PID 上の有限生成加群の構造定理」として理解できます。これは MOD2 の主題です。

---

## 11. 線形自己写像は多項式環を作用させる

[RNG4 の多項式環](../RNG4/index.md#def-rng4-polynomial-ring-degree)を、線形自己写像へ作用させます。

$F$ を体、$V$ を $F$-ベクトル空間、$T:V\to V$ を線形自己写像とします。

多項式

$$
p(x)=a_0+a_1x+\cdots+a_nx^n
$$

に対して

$$
p(T)
=
a_0I+a_1T+\cdots+a_nT^n
$$

と置きます。

<a id="prop-mod1-polynomial-module"></a>
<!-- formal-statement-start -->
> **命題（線形自己写像が定める多項式環加群）**
>
> $F$ を体、$V$ を $F$-ベクトル空間、$T:V\to V$ を線形自己写像とする。
>
> $p(x)\in F[x]$ と $v\in V$ に対して
>
$$
p(x)\cdot v:=p(T)v
$$
>
> と定めると、$V$ は左 $F[x]$-加群になる。
<!-- formal-statement-end -->

### 証明の見取り図

加群公理で核心になるのは

$$
(pq)(T)=p(T)q(T)
$$

です。

同じ写像 $T$ の冪同士を合成しているため

$$
T^iT^j=T^{i+j}
$$

となり、多項式の積と写像の合成が対応します。

<!-- proof-start -->
### 証明

$p,q\in F[x]$、$u,v\in V$ とします。

線形性から

$$
p(T)(u+v)
=
p(T)u+p(T)v,
$$

従って

$$
p\cdot(u+v)
=
p\cdot u+p\cdot v.
$$

また

$$
(p+q)(T)=p(T)+q(T)
$$

なので

$$
(p+q)\cdot v
=
p\cdot v+q\cdot v.
$$

積について、

$$
p(x)=\sum_i a_ix^i,
\qquad
q(x)=\sum_j b_jx^j
$$

とします。

すると

$$
p(T)q(T)
=
\left(\sum_i a_iT^i\right)
\left(\sum_j b_jT^j\right)
=
\sum_{i,j}a_ib_jT^{i+j}.
$$

一方、

$$
p(x)q(x)
=
\sum_{i,j}a_ib_jx^{i+j}
$$

なので

$$
(pq)(T)
=
\sum_{i,j}a_ib_jT^{i+j}
=
p(T)q(T).
$$

従って

$$
(pq)\cdot v
=
(pq)(T)v
=
p(T)(q(T)v)
=
p\cdot(q\cdot v).
$$

単位多項式 $1$ について

$$
1(T)=I
$$

なので

$$
1\cdot v=v.
$$

以上より $V$ は左 $F[x]$-加群です。$\square$
<!-- proof-end -->

<a id="prop-mod1-polynomial-submodule"></a>
<!-- formal-statement-start -->
> **命題（多項式環部分加群と T-不変性の対応）**
>
> 上の $F[x]$-加群構造を入れた $V$ と、$F$-線形部分空間 $W\subset V$ を考える。
>
> このとき次は同値である。
>
> 1. $W$ は $F[x]$-部分加群である。
> 2. $W$ は $T$ で閉じる。すなわち
>
$$
T(W)\subset W
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

$F[x]$ の元 $x$ の作用は

$$
x\cdot w=T(w)
$$

そのものです。

したがって、部分加群なら $T$ で閉じます。逆に $T$ で閉じるなら $T^k$ でも閉じるため、任意の多項式 $p(T)$ の作用でも閉じます。

<!-- proof-start -->
### 証明

$W$ が $F[x]$-部分加群なら、任意の $w\in W$ に対して

$$
T(w)
=
x\cdot w
\in W.
$$

従って

$$
T(W)\subset W.
$$

逆に

$$
T(W)\subset W
$$

とします。

すると帰納的に

$$
T^k(W)\subset W
$$

が全ての $k\ge0$ で成り立ちます。

$W$ は $F$-線形部分空間なので、$w\in W$ と

$$
p(x)=\sum_{k=0}^n a_kx^k
$$

に対して、各

$$
a_kT^kw
$$

は $W$ に属し、その有限和も $W$ に属します。

従って

$$
p(T)w\in W.
$$

つまり

$$
p\cdot w\in W.
$$

よって $W$ は $F[x]$-部分加群です。$\square$
<!-- proof-end -->

### 11.1 直接例：Jordan 型作用素

$F=\mathbb Q$、$V=\mathbb Q^2$ とし、

$$
T(e_1)=e_1,
\qquad
T(e_2)=e_1+e_2
$$

とします。

行列では

$$
[T]
=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix}.
$$

部分空間

$$
W_1=\operatorname{span}(e_1)
$$

では

$$
T(e_1)=e_1\in W_1
$$

なので $T$-不変です。従って $W_1$ は $F[x]$-部分加群です。

一方

$$
W_2=\operatorname{span}(e_2)
$$

では

$$
T(e_2)=e_1+e_2\notin W_2
$$

なので、$W_2$ は $F[x]$-部分加群ではありません。

また

$$
(x-1)\cdot e_2
=
(T-I)e_2
=
e_1.
$$

この式は、作用素 $T$ の情報を多項式 $x-1$ の作用として読めることを示しています。

MOD2 では、この $F[x]$-加群の構造を PID 上有限生成加群の構造定理で解析し、線形自己写像の標準形との関係を整理します。

---

## 12. どの仮定が何をしているか

### 12.1 体から環へ広げると基底の存在は自動でなくなる

ベクトル空間では、有限生成なら基底を取り出せます。

一般の加群では

$$
\mathbb Z/6\mathbb Z
$$

のように、一つの元で生成されても

$$
6[1]=0
$$

という非自明な関係が残ります。

従って

$$
\text{有限生成}
\not\Longrightarrow
\text{自由}
$$

です。

### 12.2 商を作るにはスカラー倍で閉じている必要がある

商加群のスカラー倍の良定義性では、

$$
m-m'\in L
$$

から

$$
r(m-m')\in L
$$

を使いました。

この一段は $L$ が部分加群であることそのものです。

単なる加法部分群では足りません。

### 12.3 ねじれ部分が部分加群になるには整域性が効く

$m,n$ をそれぞれ $a,b$ が消すとき、和を消すために $ab$ を使いました。

整域なら

$$
a,b\ne0
\Longrightarrow
ab\ne0
$$

です。

零因子を許すと $ab=0$ になり得て、非零の共通消去係数を作れません。

### 12.4 $F[x]$-加群では「$x$ の作用」が作用素そのものになる

線形自己写像 $T$ から作った $F[x]$-加群では

$$
x\cdot v=T(v)
$$

です。

したがって $F[x]$-部分加群を調べることは、$T$-不変な部分空間を調べることと同じです。

この翻訳が、加群構造論を線形自己写像の分類へ運ぶ橋になります。

---

## 13. 演習

### Level A

#### MOD1-A01 $\mathbb Z/6\mathbb Z$ の加群構造
- Level: A

$\mathbb Z/6\mathbb Z$ に

$$
n[a]=[na]
$$

と定める。

1. これが良定義であることを示せ。
2. $\mathbb Z$-加群公理のうち
   $$
   (m+n)[a]=m[a]+n[a],
   \qquad
   (mn)[a]=m(n[a])
   $$
   を確認せよ。
3. $[2]$ がねじれ元であることを示せ。

<!-- solution-start -->
##### 詳細解答

### 1. 良定義性

$[a]=[b]$ とします。

これは

$$
a-b\in6\mathbb Z
$$

を意味します。

従ってある $k\in\mathbb Z$ が存在して

$$
a-b=6k.
$$

任意の $n\in\mathbb Z$ に対して

$$
na-nb
=
n(a-b)
=
6nk
\in6\mathbb Z.
$$

従って

$$
[na]=[nb].
$$

よって $n[a]=[na]$ は代表元によらず良定義です。

### 2. 加群公理

まず

$$
(m+n)[a]
=
[(m+n)a].
$$

整数の分配法則から

$$
(m+n)a=ma+na
$$

なので

$$
[(m+n)a]
=
[ma]+[na]
=
m[a]+n[a].
$$

次に

$$
(mn)[a]
=
[(mn)a].
$$

整数の結合法則から

$$
(mn)a=m(na)
$$

なので

$$
[(mn)a]
=
m[na]
=
m(n[a]).
$$

### 3. ねじれ

$[2]\ne[0]$ ですが

$$
3[2]
=
[6]
=
[0].
$$

ここで $3\ne0$ は $\mathbb Z$ の非零元です。

従って $[2]$ はねじれ元です。
<!-- solution-end -->

#### MOD1-A02 偶奇条件で定まる部分加群
- Level: A

$$
L
=
\{(a,b)\in\mathbb Z^2:a+b\text{ が偶数}\}
$$

とする。

$L$ が $\mathbb Z^2$ の $\mathbb Z$-部分加群であることを[部分加群判定](#prop-mod1-submodule-test)で示せ。

<!-- solution-start -->
##### 詳細解答

まず

$$
(0,0)\in L
$$

なので $L$ は空ではありません。

$x=(a,b)\in L$、$y=(c,d)\in L$ とします。

すると

$$
a+b
$$

と

$$
c+d
$$

はともに偶数です。

任意の $r,s\in\mathbb Z$ に対して

$$
rx+sy
=
(ra+sc,rb+sd).
$$

この二成分の和は

$$
ra+sc+rb+sd
=
r(a+b)+s(c+d).
$$

$a+b$ と $c+d$ は偶数なので、それらの整数倍と和も偶数です。

従って

$$
rx+sy\in L.
$$

[部分加群判定](#prop-mod1-submodule-test)により、$L$ は $\mathbb Z^2$ の部分加群です。
<!-- solution-end -->

#### MOD1-A03 商加群 $\mathbb Z/4\mathbb Z$
- Level: A

商加群

$$
\mathbb Z/4\mathbb Z
$$

で次を計算せよ。

$$
(3+4\mathbb Z)+(2+4\mathbb Z),
$$

$$
5(3+4\mathbb Z),
$$

$$
-2(1+4\mathbb Z).
$$

また、それぞれを $0+4\mathbb Z,\dots,3+4\mathbb Z$ のいずれかで表せ。

<!-- solution-start -->
##### 詳細解答

加法は

$$
(3+4\mathbb Z)+(2+4\mathbb Z)
=
5+4\mathbb Z.
$$

$5-1=4\in4\mathbb Z$ なので

$$
5+4\mathbb Z
=
1+4\mathbb Z.
$$

次に

$$
5(3+4\mathbb Z)
=
15+4\mathbb Z.
$$

$15-3=12\in4\mathbb Z$ なので

$$
15+4\mathbb Z
=
3+4\mathbb Z.
$$

最後に

$$
-2(1+4\mathbb Z)
=
-2+4\mathbb Z.
$$

$-2-2=-4\in4\mathbb Z$ なので

$$
-2+4\mathbb Z
=
2+4\mathbb Z.
$$

従って答えは順に

$$
1+4\mathbb Z,
\qquad
3+4\mathbb Z,
\qquad
2+4\mathbb Z.
$$
<!-- solution-end -->

#### MOD1-A04 基底の像から準同型を作る
- Level: A

$R$ を単位元を持つ環、$N$ を左 $R$-加群とする。

$R^2$ の標準基底を $e_1,e_2$ とし、$u,v\in N$ を固定する。

$$
\Phi(e_1)=u,
\qquad
\Phi(e_2)=v
$$

を満たす $R$-加群準同型 $\Phi:R^2\to N$ を具体的に書き、その一意性を説明せよ。

<!-- solution-start -->
##### 詳細解答

任意の $(a,b)\in R^2$ は標準基底を使って一意に

$$
(a,b)=ae_1+be_2
$$

と書けます。

準同型なら

$$
\Phi(ae_1+be_2)
=
a\Phi(e_1)+b\Phi(e_2)
$$

でなければならないので、候補は

$$
\Phi(a,b)
=
au+bv
$$

しかありません。

この式で実際に写像を定めます。

$(a,b),(c,d)\in R^2$ に対して

$$
\Phi((a,b)+(c,d))
=
\Phi(a+c,b+d)
$$

$$
=
(a+c)u+(b+d)v
$$

$$
=
(au+bv)+(cu+dv)
=
\Phi(a,b)+\Phi(c,d).
$$

また $r\in R$ に対して

$$
\Phi(r(a,b))
=
\Phi(ra,rb)
=
(ra)u+(rb)v
$$

$$
=
r(au+bv)
=
r\Phi(a,b).
$$

従って $\Phi$ は加群準同型です。

さらに

$$
\Phi(e_1)=\Phi(1,0)=u,
$$

$$
\Phi(e_2)=\Phi(0,1)=v.
$$

別の準同型 $\Psi$ も同じ基底像を持つなら

$$
\Psi(a,b)
=
a\Psi(e_1)+b\Psi(e_2)
=
au+bv
=
\Phi(a,b).
$$

従って $\Psi=\Phi$ であり、一意です。
<!-- solution-end -->

### Level B

#### MOD1-B01 第一同型定理を整数格子で使う
- Level: B

$\mathbb Z$-加群準同型

$$
\varphi:\mathbb Z^2\to\mathbb Z,
\qquad
\varphi(a,b)=2a+3b
$$

を考える。

1. $\operatorname{Im}\varphi=\mathbb Z$ を示せ。
2. $\ker\varphi=\mathbb Z(3,-2)$ を示せ。
3. 第一同型定理から商加群を同定せよ。

<!-- solution-start -->
##### 詳細解答

### 1. 像

任意の像は整数なので

$$
\operatorname{Im}\varphi\subset\mathbb Z.
$$

逆包含を示します。

$$
2(-1)+3(1)=1
$$

なので

$$
1=\varphi(-1,1)
$$

は像に入ります。

像は $\mathbb Z$-部分加群なので、任意の $n\in\mathbb Z$ に対して

$$
n=n\cdot1\in\operatorname{Im}\varphi.
$$

従って

$$
\operatorname{Im}\varphi=\mathbb Z.
$$

### 2. 核

$(a,b)\in\ker\varphi$ なら

$$
2a+3b=0.
$$

従って

$$
2a=-3b.
$$

右辺は $3$ の倍数なので

$$
3\mid2a.
$$

$\gcd(2,3)=1$ だから

$$
3\mid a.
$$

よってある $k\in\mathbb Z$ が存在して

$$
a=3k.
$$

元の式へ代入すると

$$
6k+3b=0,
$$

したがって

$$
b=-2k.
$$

従って

$$
(a,b)
=
k(3,-2).
$$

よって

$$
\ker\varphi
\subset
\mathbb Z(3,-2).
$$

逆に任意の $k\in\mathbb Z$ に対して

$$
\varphi(3k,-2k)
=
6k-6k
=
0.
$$

従って

$$
\mathbb Z(3,-2)
\subset
\ker\varphi.
$$

以上から

$$
\ker\varphi
=
\mathbb Z(3,-2).
$$

### 3. 商加群

[加群の第一同型定理](#thm-mod1-first-isomorphism)から

$$
\mathbb Z^2/\ker\varphi
\cong
\operatorname{Im}\varphi.
$$

上で求めた核と像を代入して

$$
\boxed{
\mathbb Z^2/\mathbb Z(3,-2)
\cong
\mathbb Z
}
$$

です。
<!-- solution-end -->

#### MOD1-B02 ねじれ部分加群を求める
- Level: B

$\mathbb Z$-加群

$$
M
=
\mathbb Z/12\mathbb Z
\oplus
\mathbb Z
$$

を考える。

$$
\operatorname{Tor}_{\mathbb Z}(M)
$$

を求めよ。

<!-- solution-start -->
##### 詳細解答

元を

$$
([a],b)
\in
\mathbb Z/12\mathbb Z\oplus\mathbb Z
$$

と書きます。

まず

$$
([a],0)
$$

は常にねじれ元です。

実際

$$
12([a],0)
=
(12[a],0)
=
([0],0).
$$

従って

$$
\mathbb Z/12\mathbb Z\oplus\{0\}
\subset
\operatorname{Tor}_{\mathbb Z}(M).
$$

逆包含を示します。

$([a],b)$ がねじれ元なら、ある非零整数 $n$ が存在して

$$
n([a],b)
=
([na],nb)
=
([0],0)
$$

となります。

第二成分から

$$
nb=0
$$

です。

$n\ne0$ かつ $\mathbb Z$ は整域なので

$$
b=0.
$$

従ってねじれ元は必ず

$$
([a],0)
$$

の形です。

以上より

$$
\boxed{
\operatorname{Tor}_{\mathbb Z}(M)
=
\mathbb Z/12\mathbb Z\oplus\{0\}
}
$$

です。

この例では、有限巡回群の成分だけがねじれとして抽出され、自由な $\mathbb Z$ 成分は残りません。
<!-- solution-end -->

#### MOD1-B03 Jordan 型作用素を $F[x]$-加群として読む
- Level: B

$F=\mathbb Q$、$V=\mathbb Q^2$ とし、

$$
T(e_1)=e_1,
\qquad
T(e_2)=e_1+e_2
$$

とする。

$V$ に

$$
p(x)\cdot v=p(T)v
$$

で $\mathbb Q[x]$-加群構造を入れる。

1. $W_1=\operatorname{span}(e_1)$ が部分加群であることを示せ。
2. $W_2=\operatorname{span}(e_2)$ が部分加群でないことを示せ。
3. $(x-1)^2\cdot e_2$ を計算せよ。

<!-- solution-start -->
##### 詳細解答

[多項式環部分加群と T-不変性の対応](#prop-mod1-polynomial-submodule)により、部分空間が $\mathbb Q[x]$-部分加群であることと $T$-不変であることは同値です。

### 1. $W_1$

$$
T(e_1)=e_1\in W_1.
$$

$W_1$ は $e_1$ で張られる一次元部分空間なので、任意の $ce_1\in W_1$ に対して

$$
T(ce_1)
=
cT(e_1)
=
ce_1
\in W_1.
$$

従って

$$
T(W_1)\subset W_1.
$$

よって $W_1$ は $\mathbb Q[x]$-部分加群です。

### 2. $W_2$

$$
T(e_2)
=
e_1+e_2.
$$

もし $e_1+e_2\in W_2$ なら、ある $c\in\mathbb Q$ が存在して

$$
e_1+e_2=ce_2
$$

となるはずです。

しかし標準基底の係数比較から $e_1$ の係数は左辺で $1$、右辺で $0$ なので不可能です。

従って

$$
T(e_2)\notin W_2
$$

であり、$W_2$ は $T$-不変ではありません。

よって $\mathbb Q[x]$-部分加群ではありません。

### 3. $(x-1)^2$ の作用

まず

$$
(x-1)\cdot e_2
=
(T-I)e_2
=
(e_1+e_2)-e_2
=
e_1.
$$

もう一度 $x-1$ を作用させると

$$
(x-1)^2\cdot e_2
=
(x-1)\cdot e_1
=
(T-I)e_1.
$$

ところが

$$
T(e_1)=e_1
$$

なので

$$
(T-I)e_1
=
e_1-e_1
=
0.
$$

従って

$$
\boxed{
(x-1)^2\cdot e_2=0
}
$$

です。
<!-- solution-end -->

### Level C

#### MOD1-C01 自由加群の商から有限巡回群を作る
- Level: C

$\mathbb Z$-加群準同型

$$
\varphi:\mathbb Z^2\to\mathbb Z/6\mathbb Z,
\qquad
\varphi(a,b)=[a+2b]
$$

を考える。

1. $\varphi$ が全射であることを示せ。
2. 
   $$
   \ker\varphi
   =
   \mathbb Z(6,0)+\mathbb Z(-2,1)
   $$
   を示せ。
3. 第一同型定理を使って
   $$
   \mathbb Z^2/
   \bigl(
   \mathbb Z(6,0)+\mathbb Z(-2,1)
   \bigr)
   \cong
   \mathbb Z/6\mathbb Z
   $$
   を導け。
4. この商加群が $\mathbb Z$ 上自由でないことを、ねじれ元を一つ具体的に示して説明せよ。

<!-- solution-start -->
##### 詳細解答

### 1. 全射性

任意の剰余類 $[c]\in\mathbb Z/6\mathbb Z$ に対して

$$
\varphi(c,0)
=
[c+0]
=
[c].
$$

従って $\varphi$ は全射です。

### 2. 核

$(a,b)\in\ker\varphi$ とします。

すると

$$
[a+2b]=[0]
$$

なので

$$
a+2b\in6\mathbb Z.
$$

従ってある $k\in\mathbb Z$ が存在して

$$
a+2b=6k.
$$

よって

$$
a=6k-2b.
$$

したがって

$$
(a,b)
=
(6k-2b,b)
$$

$$
=
k(6,0)+b(-2,1).
$$

従って

$$
\ker\varphi
\subset
\mathbb Z(6,0)+\mathbb Z(-2,1).
$$

逆に

$$
(a,b)
=
k(6,0)+\ell(-2,1)
$$

とします。

すると

$$
a=6k-2\ell,
\qquad
b=\ell.
$$

従って

$$
a+2b
=
6k-2\ell+2\ell
=
6k.
$$

よって

$$
\varphi(a,b)
=
[6k]
=
[0].
$$

したがって

$$
\mathbb Z(6,0)+\mathbb Z(-2,1)
\subset
\ker\varphi.
$$

以上から

$$
\boxed{
\ker\varphi
=
\mathbb Z(6,0)+\mathbb Z(-2,1)
}
$$

です。

### 3. 商の同定

[加群の第一同型定理](#thm-mod1-first-isomorphism)から

$$
\mathbb Z^2/\ker\varphi
\cong
\operatorname{Im}\varphi.
$$

$\varphi$ は全射なので

$$
\operatorname{Im}\varphi
=
\mathbb Z/6\mathbb Z.
$$

また 2 で求めた核を代入すると

$$
\boxed{
\mathbb Z^2/
\bigl(
\mathbb Z(6,0)+\mathbb Z(-2,1)
\bigr)
\cong
\mathbb Z/6\mathbb Z
}
$$

を得ます。

### 4. 自由でないこと

商加群の元

$$
(1,0)+\ker\varphi
$$

を考えます。

$\varphi(1,0)=[1]$ なので、この元は第一同型定理の同型の下で $[1]$ に対応します。

従って

$$
6\bigl((1,0)+\ker\varphi\bigr)
$$

は $[6]=[0]$ に対応し、零元です。

一方

$$
(1,0)+\ker\varphi
$$

自体は零元ではありません。もし零元なら $(1,0)\in\ker\varphi$ ですが、

$$
\varphi(1,0)=[1]\ne[0].
$$

よってこの商加群には非零ねじれ元があります。

非零自由 $\mathbb Z$-加群はねじれなしです。実際、基底表示

$$
m=\sum_i a_i b_i
$$

を持つ非零元に非零整数 $n$ を掛けて

$$
nm=0
$$

となれば

$$
\sum_i(na_i)b_i=0.
$$

基底表示の一意性から全ての $na_i=0$ で、$\mathbb Z$ は整域なので全ての $a_i=0$、従って $m=0$ となるからです。

したがって、この商加群は $\mathbb Z$ 上自由ではありません。
<!-- solution-end -->

---

## 14. 章末まとめ

本章では、環上の線形代数として加群を導入しました。

- 左 $R$-加群は、Abel 群 $M$ に環 $R$ が左から作用する構造です。
- 加群準同型は加法と $R$-作用を保ち、その核と像は部分加群になります。
- 部分加群 $L\subset M$ に対して
  $$
  M/L
  $$
  を商加群として作れます。
- 商のスカラー倍が良定義になるためには
  $$
  r(m-m')\in L
  $$
  が必要で、ここで部分加群の仮定が働きます。
- 加群の第一同型定理は
  $$
  M/\ker\varphi
  \cong
  \operatorname{Im}\varphi
  $$
  です。
- 生成系は加群全体を作る元の集合ですが、一般の環上では有限生成でも基底を持つとは限りません。
- 基底を持つ加群が自由加群です。
- 自由加群では、基底上の任意の写像がただ一つの加群準同型へ延長します。
- 可換整域上では、非零スカラーで $0$ に潰れる元をねじれ元と呼び、その全体は部分加群になります。
- $\mathbb Z$-加群は Abel 群そのものであり、有限生成 Abel 群の分類は加群の構造定理の一例として見られます。
- 線形自己写像 $T$ から
  $$
  p(x)\cdot v=p(T)v
  $$
  と定めると $V$ は $F[x]$-加群になり、$F[x]$-部分加群は $T$-不変な部分空間と一致します。

これで

$$
\boxed{
\text{環}
\to
\text{加群}
\to
\text{商・準同型}
\to
\text{自由加群}
\to
\text{ねじれ}
}
$$

という加群論の基本語彙が揃いました。

次は **MOD2「Smith 標準形・PID 上有限生成加群」** です。そこで行列の基本変形を加群の生成関係へ読み替え、有限生成 Abel 群と線形自己写像の構造を一つの定理から回収します。
