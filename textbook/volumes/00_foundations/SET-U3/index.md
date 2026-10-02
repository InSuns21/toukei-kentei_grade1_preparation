# SET-U3 濃度・Cantor--Bernstein・Cantor の定理

<!-- definition-example-audit: strict -->

SET-U2 では、集合を「自然数順に全部並べられるか」で可算・非可算に分けました。しかし、非可算集合どうしを比べたいとき、この物差しだけでは足りません。

たとえば

$$
[0,1],\qquad (0,1),\qquad \mathbb R,\qquad \mathcal P(\mathbb N)
$$

はいずれも非可算です。では、これらは同じ大きさなのでしょうか。それとも、非可算の中にもさらに大きさの違いがあるのでしょうか。

集合の「個数」を有限集合のように数値で数え切れない場合でも、**全単射があるか、単射があるか**を調べれば比較できます。この章では

$$
\boxed{
\text{全単射で同じ大きさ}
\to
\text{単射で大小比較}
\to
\text{相互単射から全単射}
\to
\text{べき集合は必ずさらに大きい}
}
$$

という順に、無限集合の大きさを扱います。

ここで扱う「濃度」は、基数を順序数として構成する公理的集合論ではありません。$\aleph$ 記法や初期順序数の一般論は独立した「集合論・数学基礎論」へ送り、本章では学部「集合と位相」で必要な比較の道具に集中します。

---

## 1. 全単射があれば「同じ大きさ」と考える

有限集合では、元が3個の集合どうしならどちらも $\{1,2,3\}$ と全単射を持ちます。無限集合でも同じ考え方を採用します。

<a id="def-setu3-same-cardinality"></a>
<!-- formal-statement-start -->
> **定義（同じ濃度）**  
> 集合 $A,B$ の間に全単射
>
> $$
> f:A\to B
> $$
>
> が存在するとき、$A$ と $B$ は **同じ濃度**を持つという。このことを
>
> $$
> |A|=|B|
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-setu3-same-cardinality -->
**定義の確認**：自然数と正の偶数

$$
E=\{2,4,6,\dots\}
$$

とします。写像

$$
f:\mathbb N\to E,
\qquad
f(n)=2n
$$

は単射かつ全射です。従って

$$
|\mathbb N|=|E|.
$$

$E$ は $\mathbb N$ の真部分集合ですが、無限集合では「真部分集合なら必ず小さい」とは限りません。
<!-- definition-example-end -->

この最後の点が、有限集合との大きな違いです。

---

## 2. 単射があれば「こちらは相手より大きくない」と考える

全単射をいきなり作るのは難しくても、一方から他方へ重複なく埋め込むことなら簡単な場合があります。

<a id="def-setu3-cardinality-comparison"></a>
<!-- formal-statement-start -->
> **定義（濃度の比較）**  
> 集合 $A$ から集合 $B$ への単射が存在するとき
>
> $$
> |A|\le |B|
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-setu3-cardinality-comparison -->
**定義の確認**：部分集合の包含写像

$A\subseteq B$ なら

$$
i:A\to B,
\qquad
i(a)=a
$$

は単射です。従って

$$
|A|\le |B|.
$$

ただし $A\subsetneq B$ であっても、先ほどの $2\mathbb N\subsetneq\mathbb N$ のように濃度が等しいことがあります。従って $\le$ から直ちに「真に小さい」とは言えません。
<!-- definition-example-end -->

濃度が本当に小さいことは、単射があるだけでなく、全単射が存在しないことまで確認して表します。

<a id="def-setu3-strict-cardinality"></a>
<!-- formal-statement-start -->
> **定義（真に小さい濃度）**  
> 
> $$
> |A|\le |B|
> $$
>
> であり、かつ
>
> $$
> |A|\ne |B|
> $$
>
> であるとき
>
> $$
> |A|<|B|
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-setu3-strict-cardinality -->
**定義の確認**：2点集合と3点集合

$$
A=\{a,b\},
\qquad
B=\{1,2,3\}
$$

とします。

$$
a\mapsto1,\qquad b\mapsto2
$$

で $A$ から $B$ への単射があります。一方、2個の元だけを3個の異なる元すべてへ重複なく対応させることはできないので全単射はありません。

従って

$$
|A|<|B|.
$$
<!-- definition-example-end -->

ここまでで濃度の大小を定義できました。ただし一つ大きな穴があります。

$$
|A|\le |B|,
\qquad
|B|\le |A|
$$

が両方分かっても、二本の単射は別々の写像です。そこから本当に全単射が作れるのでしょうか。

---

## 3. Cantor--Bernstein の定理：相互に埋め込めれば同じ濃度

有限集合なら、相互に単射があれば元の個数が一致するので全単射が存在します。無限集合では「個数を数える」証明は使えません。

そこで、二本の単射そのものから全単射を組み立てます。

<a id="thm-setu3-cantor-bernstein"></a>
<!-- formal-statement-start -->
> **定理（Cantor--Bernstein の定理）**  
> 集合 $A,B$ に対し単射
>
> $$
> f:A\to B,
> \qquad
> g:B\to A
> $$
>
> が存在するなら、$A$ と $B$ の間に全単射が存在する。従って
>
> $$
> |A|=|B|.
> $$
<!-- formal-statement-end -->

### 証明の考え方

$f$ をそのまま全単射として使えるとは限りません。$f(A)$ から漏れる $B$ の元があるかもしれないからです。

一方、$g$ の像に入らない $A$ の元

$$
A\setminus g(B)
$$

は、$g^{-1}$ で戻すことができません。そこで、この「$g$ から来ていない元」から出発し、

$$
f
\quad\text{で }B\text{へ進み、}\quad
g
\quad\text{で }A\text{へ戻る}
$$

操作を繰り返して得られる部分では $f$ を使います。それ以外では $g^{-1}$ を使います。

### 構成

$$
A_0=A\setminus g(B)
$$

と置き、帰納的に

$$
A_{n+1}=g(f(A_n))
$$

とします。さらに

$$
C=\bigcup_{n=0}^{\infty}A_n
$$

と置きます。

$a\in C$ では $f(a)$ を使い、$a\notin C$ では $g^{-1}(a)$ を使う写像

$$
h:A\to B
$$

を作ります。

<!-- proof-start -->
### 証明

まず $a\notin C$ とします。

$$
A_0=A\setminus g(B)\subseteq C
$$

なので、$a\notin C$ なら $a\notin A_0$ です。従って

$$
a\in g(B).
$$

$g$ は単射なので、$a=g(b)$ を満たす $b\in B$ は一意です。この元を $g^{-1}(a)$ と書けます。

従って

$$
h(a)=
\begin{cases}
f(a),&a\in C,\\
g^{-1}(a),&a\notin C
\end{cases}
$$

は良定義です。

#### 単射性

$a,a'\in C$ で $h(a)=h(a')$ なら

$$
f(a)=f(a')
$$

です。$f$ は単射なので

$$
a=a'.
$$

$a,a'\notin C$ で $h(a)=h(a')$ なら

$$
g^{-1}(a)=g^{-1}(a').
$$

両辺へ $g$ を作用させて

$$
a=a'.
$$

残るのは一方だけが $C$ に入る場合です。$a\in C$, $a'\notin C$ として

$$
h(a)=h(a')
$$

と仮定すると

$$
f(a)=g^{-1}(a')
$$

です。両辺へ $g$ を作用させれば

$$
g(f(a))=a'.
$$

$a\in C$ なので、ある $n$ に対して $a\in A_n$ です。従って

$$
g(f(a))\in g(f(A_n))=A_{n+1}\subseteq C.
$$

よって $a'\in C$ となり、$a'\notin C$ に矛盾します。

以上より $h$ は単射です。

#### 全射性

任意に $b\in B$ を取ります。$g(b)$ が $C$ に入るかどうかで分けます。

まず

$$
g(b)\notin C
$$

なら、$a=g(b)$ と置けば $a\notin C$ なので

$$
h(a)=g^{-1}(g(b))=b.
$$

次に

$$
g(b)\in C
$$

とします。

$g(b)$ は $g(B)$ の元なので

$$
g(b)\notin A_0=A\setminus g(B).
$$

従って $g(b)$ はある $n\ge0$ に対して

$$
g(b)\in A_{n+1}=g(f(A_n))
$$

と書けます。したがって、ある $a\in A_n$ が存在して

$$
g(b)=g(f(a)).
$$

$g$ は単射なので

$$
b=f(a).
$$

しかも $a\in A_n\subseteq C$ だから

$$
h(a)=f(a)=b.
$$

どちらの場合も $b$ は $h$ の像に入ります。従って $h$ は全射です。

以上より $h$ は全単射です。従って

$$
|A|=|B|.
$$
<!-- proof-end -->

この定理により、濃度の等号を示すときは「巧妙な全単射を一発で当てる」必要がありません。**両向きの単射を別々に作ればよい**ことになります。

---

## 4. 閉区間と開区間は同じ濃度

この定理の最初の使い道を見ます。

$$
(0,1)\subseteq[0,1]
$$

なので包含写像から

$$
|(0,1)|\le|[0,1]|.
$$

逆向きには

$$
f:[0,1]\to(0,1),
\qquad
f(x)=\frac{x+1}{3}
$$

と置けます。

$x\in[0,1]$ なら

$$
\frac13\le f(x)\le\frac23
$$

なので確かに $f(x)\in(0,1)$ です。また

$$
f(x)=f(y)
$$

なら

$$
\frac{x+1}{3}=\frac{y+1}{3}
$$

より $x=y$ なので $f$ は単射です。

従って

$$
|[0,1]|\le|(0,1)|.
$$

Cantor--Bernstein の定理から

$$
|[0,1]|=|(0,1)|.
$$

端点を2個取り除いても濃度は変わりません。

---

## 5. Cantor の定理：べき集合は必ず一段大きい

SET-U2 では、実数を自然数順に並べたと仮定すると対角線上の桁を変えて「列にない実数」を作りました。

Cantor の定理では、この発想を任意の集合 $X$ に対して行います。桁の代わりに

$$
x\in S
$$

かどうかを反転します。

<a id="thm-setu3-cantor"></a>
<!-- formal-statement-start -->
> **定理（Cantor の定理）**  
> 任意の集合 $X$ に対して、全射
>
> $$
> F:X\to\mathcal P(X)
> $$
>
> は存在しない。
>
> 一方、
>
> $$
> x\mapsto\{x\}
> $$
>
> は $X$ から $\mathcal P(X)$ への単射である。従って
>
> $$
> |X|<|\mathcal P(X)|.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

仮に $F:X\to\mathcal P(X)$ が全射だとします。

各 $x$ について、「$x$ 自身が $F(x)$ に入るか」を調べ、それを反転した集合

$$
D=\{x\in X:x\notin F(x)\}
$$

を作ります。

全射なら $D$ もどこかの $F(d)$ として現れるはずです。しかし $d$ が $D$ に入るかを調べると矛盾します。

<!-- proof-start -->
### 証明

まず

$$
s:X\to\mathcal P(X),
\qquad
s(x)=\{x\}
$$

と置きます。

$s(x)=s(y)$ なら

$$
\{x\}=\{y\}
$$

なので $x=y$ です。従って $s$ は単射で、

$$
|X|\le|\mathcal P(X)|.
$$

次に、全射

$$
F:X\to\mathcal P(X)
$$

が存在すると仮定します。

集合

$$
D=\{x\in X:x\notin F(x)\}
$$

を考えます。$D\subseteq X$ なので

$$
D\in\mathcal P(X).
$$

$F$ は全射だと仮定したので、ある $d\in X$ が存在して

$$
F(d)=D
$$

となるはずです。

ここで $d\in D$ かどうかを調べます。

$D$ の定義から

$$
d\in D
\iff
d\notin F(d).
$$

しかし $F(d)=D$ なので

$$
d\in D
\iff
d\notin D.
$$

これは矛盾です。

従って $X$ から $\mathcal P(X)$ への全射は存在しません。特に全単射も存在しません。

一方で単射 $s:X\to\mathcal P(X)$ は存在するので

$$
|X|<|\mathcal P(X)|.
$$
<!-- proof-end -->

この証明は $X$ が有限か無限かを問いません。**どんな集合を出発点にしても、そのべき集合は必ず真に大きい**という主張です。

---

## 6. 可算無限の次に、もっと大きい無限がある

Cantor の定理へ

$$
X=\mathbb N
$$

を代入すると

$$
|\mathbb N|<|\mathcal P(\mathbb N)|.
$$

従って $\mathcal P(\mathbb N)$ は可算ではありません。

SET-U2 で「実数は非可算」と学びましたが、ここではさらに具体的に

$$
|\mathbb R|=|\mathcal P(\mathbb N)|
$$

まで示します。

その前に、まず $[0,1]$ と $\mathcal P(\mathbb N)$ を比較します。

<a id="prop-setu3-interval-powerset"></a>
<!-- formal-statement-start -->
> **命題（区間と自然数のべき集合は同じ濃度）**  
>
> $$
> |[0,1]|=|\mathcal P(\mathbb N)|.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 6.1 $\mathcal P(\mathbb N)$ から $[0,1]$ への単射

各 $S\subseteq\mathbb N$ に対して

$$
\Phi(S)
=
\sum_{n\in S}\frac{2}{3^n}
$$

と置きます。

これは3進展開で「$n$ 桁目を、$n\in S$ なら2、そうでなければ0にする」符号化です。

$S\ne T$ とします。$S$ と $T$ が最初に異なる自然数を $k$ とし、必要なら $S,T$ を入れ替えて

$$
k\in S,
\qquad
k\notin T
$$

とします。

$k$ より前の項は同じなので、差は

$$
\Phi(S)-\Phi(T)
$$

の $k$ 番目以降だけで決まります。

最悪の場合、$T$ 側が $k$ より後の全ての桁で2を持つとしても

$$
\Phi(S)-\Phi(T)
\ge
\frac{2}{3^k}
-
\sum_{n=k+1}^{\infty}\frac{2}{3^n}.
$$

等比級数を計算すると

$$
\sum_{n=k+1}^{\infty}\frac{2}{3^n}
=
\frac{1}{3^k}.
$$

従って

$$
\Phi(S)-\Phi(T)
\ge
\frac{1}{3^k}
>0.
$$

よって

$$
\Phi(S)\ne\Phi(T).
$$

従って $\Phi$ は単射です。

### 6.2 $[0,1]$ から $\mathcal P(\mathbb N)$ への単射

今度は実数を桁列として自然数の部分集合へ符号化します。

$x\in[0,1)$ について、末尾がずっと9になる表示を使わず

$$
x=0.a_1a_2a_3\dots,
\qquad
a_n\in\{0,1,\dots,9\}
$$

と10進表示を一意に選びます。

SET-U2 の全単射

$$
\pi:\mathbb N\times\mathbb N\to\mathbb N
$$

を使って

$$
\Psi(x)
=
\{\pi(n,a_n+1):n\in\mathbb N\}
$$

と置きます。

各 $n$ についてちょうど一つの符号 $\pi(n,a_n+1)$ が入るので、桁列全体を一つの自然数の部分集合へ保存できます。

$x,y\in[0,1)$ が異なれば、一意に選んだ10進表示のどこかの桁が異なります。ある $k$ で

$$
a_k\ne b_k
$$

となるため

$$
\pi(k,a_k+1)\in\Psi(x)
$$

ですが

$$
\pi(k,a_k+1)\notin\Psi(y).
$$

従って

$$
\Psi(x)\ne\Psi(y).
$$

最後に $x=1$ だけは

$$
\Psi(1)=\varnothing
$$

と置きます。

$x<1$ なら $\Psi(x)$ には各 $n$ に対応する元が入るので空集合ではありません。従って1も他の点と衝突しません。

以上より $\Psi:[0,1]\to\mathcal P(\mathbb N)$ は単射です。

### 6.3 Cantor--Bernstein を適用する

両向きの単射

$$
\Phi:\mathcal P(\mathbb N)\to[0,1],
\qquad
\Psi:[0,1]\to\mathcal P(\mathbb N)
$$

が得られたので、Cantor--Bernstein の定理から

$$
|[0,1]|=|\mathcal P(\mathbb N)|.
$$
<!-- proof-end -->

---

## 7. 実数全体も同じ濃度

$[0,1]\subseteq\mathbb R$ なので

$$
|[0,1]|\le|\mathbb R|.
$$

逆向きには

$$
\theta:\mathbb R\to(0,1),
\qquad
\theta(x)
=
\frac12+\frac{x}{2(1+|x|)}
$$

を考えます。

$x\ge0$ では

$$
\frac{x}{1+x}
$$

は $[0,1)$ に入り、$x<0$ では負の値になります。従って常に

$$
0<\theta(x)<1.
$$

また $x\mapsto x/(1+|x|)$ は実数上で狭義単調増加なので単射です。従って $\theta$ も単射です。

したがって

$$
|\mathbb R|\le|(0,1)|
\le|[0,1]|.
$$

Cantor--Bernstein の定理から

$$
|\mathbb R|=|[0,1]|.
$$

前節と合わせると次を得ます。

<a id="thm-setu3-real-powerset-natural"></a>
<!-- formal-statement-start -->
> **定理（実数と自然数のべき集合は同じ濃度）**  
>
> $$
> |\mathbb R|
> =
> |\mathcal P(\mathbb N)|.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節で

$$
|[0,1]|=|\mathcal P(\mathbb N)|
$$

を示しました。またこの節で、包含写像と $\theta$ による逆向きの単射から

$$
|\mathbb R|=|[0,1]|
$$

を示しました。従って等号の推移性から

$$
|\mathbb R|
=
|\mathcal P(\mathbb N)|.
$$
<!-- proof-end -->

Cantor の定理から

$$
|\mathbb N|
<
|\mathcal P(\mathbb N)|
=
|\mathbb R|.
$$

したがって、SET-U2 で示した「実数は非可算」という事実は

$$
|\mathbb N|<|\mathbb R|
$$

という濃度の真の大小として表せます。

---

## 8. 連続体濃度

実数全体の濃度は特に頻繁に現れるので名前を付けます。

<a id="def-setu3-continuum"></a>
<!-- formal-statement-start -->
> **定義（連続体濃度）**  
> 実数全体の濃度
>
> $$
> |\mathbb R|
> $$
>
> を **連続体濃度**といい、
>
> $$
> \mathfrak c
> $$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-setu3-continuum -->
**定義の確認**：区間と自然数のべき集合

すでに

$$
|[0,1]|=|\mathbb R|
$$

と

$$
|\mathcal P(\mathbb N)|=|\mathbb R|
$$

を示しました。従って

$$
|[0,1]|
=
|\mathcal P(\mathbb N)|
=
\mathfrak c.
$$

連続体濃度は「区間の長さ」ではありません。$[0,1]$ と $\mathbb R$ は長さの意味では全く違いますが、全単射で比較する濃度は同じです。
<!-- definition-example-end -->

ここでは

$$
\mathfrak c=|\mathcal P(\mathbb N)|
$$

までを使います。

$\aleph_0$ や一般の基数演算、初期順序数、連続体仮説は、本章の前提にも完成条件にも入れません。

---

## 9. 何が分かったか

ここまでの流れを整理します。

1. 全単射があれば
   $$
   |A|=|B|.
   $$
2. 単射 $A\to B$ があれば
   $$
   |A|\le|B|.
   $$
3. 両向きに単射があれば Cantor--Bernstein により
   $$
   |A|=|B|.
   $$
4. 任意の集合 $X$ について Cantor の定理から
   $$
   |X|<|\mathcal P(X)|.
   $$
5. 特に
   $$
   |\mathbb N|
   <
   |\mathcal P(\mathbb N)|
   =
   |\mathbb R|
   =
   \mathfrak c.
   $$

「無限」は一種類ではありません。しかも Cantor の定理を繰り返せば

$$
|X|
<
|\mathcal P(X)|
<
|\mathcal P(\mathcal P(X))|
<
\cdots
$$

と、どの段階からでもさらに大きい濃度を作れます。

この章で重要なのは、その事実を記号だけで覚えることではありません。

- 同じ大きさなら全単射
- 大きくないなら単射
- 二本の単射から全単射を作る
- 「全ての部分集合を列挙した」と仮定したら対角集合を作る

という証明操作を再現できることが中心です。

---

## 10. 演習

### Level A

<a id="ex-setu3-a01"></a>
#### SET-U3-A01 真部分集合でも同じ濃度になりうる
- Level: A

正の偶数全体

$$
E=\{2,4,6,\dots\}
$$

について

$$
|\mathbb N|=|E|
$$

を示せ。また $E\subsetneq\mathbb N$ と両立する理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

写像

$$
f:\mathbb N\to E,
\qquad
f(n)=2n
$$

を考えます。

$f(n)=f(m)$ なら

$$
2n=2m
$$

なので $n=m$ です。従って $f$ は単射です。

また任意の $2k\in E$ は

$$
2k=f(k)
$$

と書けるので $f$ は全射です。

従って $f$ は全単射で

$$
|\mathbb N|=|E|.
$$

一方、

$$
1\in\mathbb N,
\qquad
1\notin E
$$

なので

$$
E\subsetneq\mathbb N.
$$

有限集合では真部分集合の元数は必ず減りますが、無限集合では真部分集合と全体の間に全単射が存在しうるため、包含関係と濃度の真の大小は一致しません。
<!-- solution-end -->

<a id="ex-setu3-a02"></a>
#### SET-U3-A02 濃度の大小を単射で示す
- Level: A

$$
A=\{1,2,3\},
\qquad
B=\{a,b,c,d,e\}
$$

とする。

1. $|A|\le|B|$ を単射を一つ書いて示せ。
2. $|A|<|B|$ であることを説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 例えば

$$
f(1)=a,\qquad
f(2)=b,\qquad
f(3)=c
$$

と置けば、異なる元を異なる元へ送るので $f:A\to B$ は単射です。従って

$$
|A|\le|B|.
$$

2. $A$ には3個、$B$ には5個の元があります。$A$ の3個の元を互いに異なる像へ送っても、$B$ の5個全てを像として使うことはできません。従って $A$ から $B$ への全単射は存在しません。

よって

$$
|A|<|B|.
$$
<!-- solution-end -->

<a id="ex-setu3-a03"></a>
#### SET-U3-A03 開区間と閉区間
- Level: A

Cantor--Bernstein の定理を用いて

$$
|(0,1)|=|[0,1]|
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
(0,1)\subseteq[0,1]
$$

なので包含写像

$$
i:(0,1)\to[0,1],
\qquad
i(x)=x
$$

は単射です。従って

$$
|(0,1)|\le|[0,1]|.
$$

逆向きには

$$
f:[0,1]\to(0,1),
\qquad
f(x)=\frac{x+1}{3}
$$

と置きます。

$x\in[0,1]$ なら

$$
\frac13\le f(x)\le\frac23
$$

なので $f(x)\in(0,1)$ です。

また

$$
f(x)=f(y)
$$

なら

$$
\frac{x+1}{3}=\frac{y+1}{3}
$$

より $x=y$ です。従って $f$ は単射です。

よって

$$
|[0,1]|\le|(0,1)|.
$$

両向きの単射が得られたので Cantor--Bernstein の定理から

$$
|(0,1)|=|[0,1]|.
$$
<!-- solution-end -->

<a id="ex-setu3-a04"></a>
#### SET-U3-A04 2点集合とそのべき集合
- Level: A

$$
X=\{a,b\}
$$

とする。

1. $\mathcal P(X)$ を全て書け。
2. $x\mapsto\{x\}$ が $X\to\mathcal P(X)$ の単射であることを確認せよ。
3. Cantor の定理と整合する形で濃度を比較せよ。

<!-- solution-start -->
#### 詳細解答

1. 部分集合は

$$
\varnothing,\qquad
\{a\},\qquad
\{b\},\qquad
\{a,b\}
$$

の4個です。従って

$$
\mathcal P(X)
=
\{\varnothing,\{a\},\{b\},\{a,b\}\}.
$$

2. 写像

$$
s:X\to\mathcal P(X),
\qquad
s(x)=\{x\}
$$

では

$$
s(a)=\{a\},
\qquad
s(b)=\{b\}.
$$

これらは異なるので $s$ は単射です。

3. $X$ は2点、$\mathcal P(X)$ は4点なので全単射は存在しません。従って

$$
|X|<|\mathcal P(X)|.
$$

これは任意の集合について同じ結論を与える Cantor の定理の有限集合での具体例です。
<!-- solution-end -->

### Level B

<a id="ex-setu3-b01"></a>
#### SET-U3-B01 Cantor--Bernstein の構成を追う
- Level: B

$$
A=\mathbb N,
\qquad
B=\mathbb N\setminus\{1\}
$$

とする。単射

$$
f:A\to B,
\qquad
f(n)=n+1
$$

と、包含写像

$$
g:B\to A
$$

に対して、Cantor--Bernstein の証明で使った

$$
A_0=A\setminus g(B),
\qquad
A_{n+1}=g(f(A_n))
$$

を計算し、得られる全単射 $h:A\to B$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$g$ は包含写像なので

$$
g(B)=\mathbb N\setminus\{1\}.
$$

従って

$$
A_0
=
A\setminus g(B)
=
\{1\}.
$$

次に

$$
A_1
=
g(f(A_0)).
$$

$f(1)=2$ で、$g$ はそのまま包含するので

$$
A_1=\{2\}.
$$

同様に

$$
A_2=\{3\},
\qquad
A_3=\{4\},
\qquad\dots
$$

となります。従って

$$
C=\bigcup_{n=0}^{\infty}A_n=\mathbb N.
$$

Cantor--Bernstein の構成では $a\in C$ のとき $h(a)=f(a)$ を使います。今回は全ての $a\in A$ が $C$ に入るので

$$
h(n)=f(n)=n+1.
$$

したがって

$$
h:\mathbb N\to\mathbb N\setminus\{1\},
\qquad
h(n)=n+1
$$

が全単射として得られます。

この例では最終的な全単射は最初から見えていましたが、証明の $A_0,A_1,\dots$ が「どこで $f$ を採用するか」を実際に選んでいることが確認できます。
<!-- solution-end -->

<a id="ex-setu3-b02"></a>
#### SET-U3-B02 対角集合を具体的に作る
- Level: B

$$
X=\{1,2,3\}
$$

とし、写像 $F:X\to\mathcal P(X)$ を

$$
F(1)=\varnothing,
\qquad
F(2)=\{1,2\},
\qquad
F(3)=\{2,3\}
$$

で定める。

1. 対角集合
   $$
   D=\{x\in X:x\notin F(x)\}
   $$
   を求めよ。
2. $D$ が $F(1),F(2),F(3)$ のどれとも一致しないことを確認せよ。
3. これが Cantor の定理の証明のどの部分に対応するか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 各 $x$ について確認します。

$x=1$ では

$$
1\notin F(1)=\varnothing
$$

なので $1\in D$ です。

$x=2$ では

$$
2\in F(2)=\{1,2\}
$$

なので $2\notin D$ です。

$x=3$ では

$$
3\in F(3)=\{2,3\}
$$

なので $3\notin D$ です。

従って

$$
D=\{1\}.
$$

2. 与えられた値は

$$
\varnothing,\qquad
\{1,2\},\qquad
\{2,3\}
$$

なので

$$
D=\{1\}
$$

はどれとも一致しません。

3. Cantor の定理では、任意の候補写像 $F:X\to\mathcal P(X)$ に対して

$$
D=\{x:x\notin F(x)\}
$$

を作ると、各 $x$ について $D$ は $F(x)$ と少なくとも $x$ の所属判定で食い違います。

今回の有限例では、その「必ず像から漏れる部分集合」が実際に $\{1\}$ として見えています。
<!-- solution-end -->

<a id="ex-setu3-b03"></a>
#### SET-U3-B03 自然数の全ての部分集合は列挙できない
- Level: B

Cantor の定理を使って、$\mathcal P(\mathbb N)$ が可算でないことを示せ。さらに「自然数の部分集合を全部

$$
S_1,S_2,S_3,\dots
$$

と並べる」試みが失敗する理由を、対角集合を書いて説明せよ。

<!-- solution-start -->
#### 詳細解答

Cantor の定理に

$$
X=\mathbb N
$$

を代入すると

$$
|\mathbb N|<|\mathcal P(\mathbb N)|.
$$

従って $\mathcal P(\mathbb N)$ と $\mathbb N$ の間に全単射はありません。よって $\mathcal P(\mathbb N)$ は可算無限ではありません。

仮に全ての部分集合を

$$
S_1,S_2,S_3,\dots
$$

と列挙できたとします。

これは写像

$$
F:\mathbb N\to\mathcal P(\mathbb N),
\qquad
F(n)=S_n
$$

が全射だという仮定です。

そこで

$$
D=\{n\in\mathbb N:n\notin S_n\}
$$

を作ります。

任意の $k$ について

$$
k\in D
\iff
k\notin S_k.
$$

従って $D$ と $S_k$ は $k$ の所属判定で必ず異なり、

$$
D\ne S_k.
$$

これは全ての $k$ について成り立つので、$D$ は列

$$
S_1,S_2,\dots
$$

のどこにも現れません。従って「全て列挙した」という仮定に矛盾します。
<!-- solution-end -->

### Level C

<a id="ex-setu3-c01"></a>
#### SET-U3-C01 実数と自然数のべき集合の濃度を再構成する
- Level: C

次の流れを自力で再構成して

$$
|\mathbb R|=|\mathcal P(\mathbb N)|
$$

を示せ。

1. $S\subseteq\mathbb N$ に
   $$
   \Phi(S)=\sum_{n\in S}\frac{2}{3^n}
   $$
   を対応させ、$\Phi:\mathcal P(\mathbb N)\to[0,1]$ が単射であることを示す。
2. $x\in[0,1)$ の一意な10進表示
   $$
   x=0.a_1a_2\dots
   $$
   を、SET-U2 の全単射 $\pi:\mathbb N^2\to\mathbb N$ を使って自然数の部分集合へ符号化し、$[0,1]\to\mathcal P(\mathbb N)$ の単射を作る。
3. Cantor--Bernstein の定理で
   $$
   |[0,1]|=|\mathcal P(\mathbb N)|
   $$
   を得る。
4. 
   $$
   \theta(x)=\frac12+\frac{x}{2(1+|x|)}
   $$
   を用いて
   $$
   |\mathbb R|=|[0,1]|
   $$
   を示す。

<!-- solution-start -->
#### 詳細解答

### 1. $\mathcal P(\mathbb N)\to[0,1]$

$S\subseteq\mathbb N$ に対して

$$
\Phi(S)=\sum_{n\in S}\frac{2}{3^n}
$$

と置きます。

各項は非負で、

$$
\sum_{n=1}^{\infty}\frac{2}{3^n}=1
$$

なので

$$
0\le\Phi(S)\le1.
$$

従って $\Phi(S)\in[0,1]$ です。

$S\ne T$ とし、両者が最初に異なる自然数を $k$ とします。必要なら $S,T$ を入れ替えて

$$
k\in S,
\qquad
k\notin T
$$

とします。

$k$ より前の寄与は同じです。$k$ より後で $T$ 側が差を最大限に打ち消す場合でも

$$
\Phi(S)-\Phi(T)
\ge
\frac{2}{3^k}
-
\sum_{n=k+1}^{\infty}\frac{2}{3^n}.
$$

右辺の級数は

$$
\sum_{n=k+1}^{\infty}\frac{2}{3^n}
=
\frac{2/3^{k+1}}{1-1/3}
=
\frac{1}{3^k}.
$$

従って

$$
\Phi(S)-\Phi(T)
\ge
\frac{1}{3^k}
>0.
$$

よって $\Phi(S)\ne\Phi(T)$ であり、$\Phi$ は単射です。

従って

$$
|\mathcal P(\mathbb N)|\le|[0,1]|.
$$

### 2. $[0,1]\to\mathcal P(\mathbb N)$

$x\in[0,1)$ について、末尾がずっと9になる表示を使わず

$$
x=0.a_1a_2a_3\dots
$$

と書きます。

各桁 $a_n$ は

$$
a_n\in\{0,1,\dots,9\}
$$

です。

SET-U2 の全単射

$$
\pi:\mathbb N\times\mathbb N\to\mathbb N
$$

を使って

$$
\Psi(x)
=
\{\pi(n,a_n+1):n\in\mathbb N\}
$$

と定めます。

$x\ne y$ なら、一意に選んだ10進表示はどこかで異なります。ある $k$ で

$$
a_k\ne b_k
$$

となります。

そのとき

$$
\pi(k,a_k+1)\in\Psi(x).
$$

一方、$\Psi(y)$ で第1成分が $k$ の符号は

$$
\pi(k,b_k+1)
$$

だけです。$\pi$ は単射で $a_k\ne b_k$ なので

$$
\pi(k,a_k+1)\ne\pi(k,b_k+1).
$$

従って

$$
\pi(k,a_k+1)\notin\Psi(y),
$$

よって

$$
\Psi(x)\ne\Psi(y).
$$

$x=1$ だけは

$$
\Psi(1)=\varnothing
$$

と定めます。

$x<1$ なら各 $n$ について $\pi(n,a_n+1)$ が一つ入るので $\Psi(x)$ は空ではありません。従って1も他の点と衝突しません。

よって $\Psi$ は単射で

$$
|[0,1]|\le|\mathcal P(\mathbb N)|.
$$

### 3. Cantor--Bernstein

1と2から両向きに単射があるので

$$
|[0,1]|=|\mathcal P(\mathbb N)|.
$$

### 4. $\mathbb R$ と $[0,1]$

包含写像から

$$
|[0,1]|\le|\mathbb R|.
$$

逆向きには

$$
\theta(x)
=
\frac12+\frac{x}{2(1+|x|)}
$$

と置きます。

$x\ge0$ なら

$$
0\le\frac{x}{1+x}<1,
$$

$x<0$ なら

$$
-1<\frac{x}{1+|x|}<0.
$$

従って全ての $x$ について

$$
0<\theta(x)<1.
$$

また

$$
u(x)=\frac{x}{1+|x|}
$$

は $x<0$ と $x\ge0$ の各区間で狭義単調増加で、負の領域の値は負、非負の領域の値は非負です。従って $\mathbb R$ 全体で単射です。

よって $\theta$ も単射で

$$
|\mathbb R|\le|(0,1)|\le|[0,1]|.
$$

Cantor--Bernstein の定理から

$$
|\mathbb R|=|[0,1]|.
$$

以上を合わせて

$$
\boxed{
|\mathbb R|
=
|[0,1]|
=
|\mathcal P(\mathbb N)|
}
$$

を得ます。
<!-- solution-end -->

---

## 11. 章末チェック

この章を終えた時点で、次を本文なしで再構成できるか確認してください。

1. 「同じ濃度」を全単射の存在で定義できる。
2. $|A|\le|B|$ を単射の存在で定義し、包含関係とは別の概念だと説明できる。
3. $|A|<|B|$ では何を追加で確認する必要があるか説明できる。
4. Cantor--Bernstein の証明で
   $$
   A_0=A\setminus g(B),\qquad A_{n+1}=g(f(A_n))
   $$
   を作る理由を説明できる。
5. Cantor--Bernstein の区分的写像が、なぜ $A\setminus C$ 上で $g^{-1}$ を使えるか説明できる。
6. Cantor の定理で
   $$
   D=\{x:x\notin F(x)\}
   $$
   と置くと、なぜ $D$ が全ての $F(x)$ と食い違うか説明できる。
7. $|\mathbb N|<|\mathcal P(\mathbb N)|$ を Cantor の定理から導ける。
8. $\mathcal P(\mathbb N)\to[0,1]$ の3進符号化が単射になる理由を、最初に異なる桁と残りの尾の評価から示せる。
9. $[0,1]\to\mathcal P(\mathbb N)$ の符号化で、10進表示の二重性を避ける必要を説明できる。
10. 
    $$
    |\mathbb N|<|\mathbb R|=|\mathcal P(\mathbb N)|=\mathfrak c
    $$
    を証明の流れ付きで説明できる。

この章の中心は、無限の大きさに名前を付けることではありません。**写像を作ることで比較し、対角化で「どうしても漏れる対象」を作る**という二つの操作を自力で再現できることです。
