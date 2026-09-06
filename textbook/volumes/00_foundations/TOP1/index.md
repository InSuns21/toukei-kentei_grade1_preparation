# TOP1 標準位相 I：位相の生成・initial/final topology・積・商

<!-- definition-example-audit: strict -->

[F0-00B1](../F0_00B1_位相空間_近傍_部分空間_収束/index.md) では、位相を「開集合族」として定義し、近傍・部分空間・収束・連続写像まで導入しました。

この章では一段進んで、**開集合を一つずつ列挙する代わりに、少数の集合や写像から位相全体を生成する方法**を扱います。中心になる問いは次の二つです。

1. 「この集合族を開にしたい」とき、必要最小限の位相はどう作るか。
2. 「この写像を連続にしたい」とき、定義域・値域にどの位相を入れればよいか。

この二問から、基底・部分基底、initial topology、積位相、final topology、商位相が一つの流れで出てきます。

---

## 1. 基底：開集合を局所的な部品から作る

<a id="def-top1-basis"></a>
<!-- formal-statement-start -->
> **定義（位相の基底）**  
> 集合 $X$ の部分集合族 $\mathcal B\subseteq\mathcal P(X)$ が次の二条件を満たすとする。
>
> 1. 任意の $x\in X$ に対し、ある $B\in\mathcal B$ が存在して $x\in B$。
> 2. $x\in B_1\cap B_2$（$B_1,B_2\in\mathcal B$）なら、ある $B_3\in\mathcal B$ が存在して

$$
x\in B_3\subseteq B_1\cap B_2.
$$

> このとき $\mathcal B$ を $X$ 上の **位相の基底** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-basis -->
### 1.1 定義の確認：開区間は $\mathbb R$ の基底

通常の $\mathbb R$ で

$$
\mathcal B=\{(a,b):a<b\}
$$

とします。任意の $x$ は $(x-1,x+1)$ に入るので第1条件を満たします。

また

$$
x\in(a,b)\cap(c,d)
$$

なら

$$
\max(a,c)<x<\min(b,d).
$$

そこで

$$
\varepsilon
=\frac12\min\{x-\max(a,c),\ \min(b,d)-x\}>0
$$

と取れば

$$
x\in(x-\varepsilon,x+\varepsilon)
\subseteq(a,b)\cap(c,d).
$$

従って開区間全体は基底です。
<!-- definition-example-end -->

<a id="thm-top1-basis-generates-topology"></a>
<!-- formal-statement-start -->
> **定理（基底から位相を作れる）**  
> $\mathcal B$ を $X$ 上の基底とする。部分集合 $U\subseteq X$ について

$$
U\in\tau_{\mathcal B}
\quad\Longleftrightarrow\quad
U=\bigcup_{\lambda\in\Lambda}B_\lambda
\quad(B_\lambda\in\mathcal B)
$$

> と定める。ただし空和は $\varnothing$ とする。このとき $\tau_{\mathcal B}$ は $X$ 上の位相である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

位相の三公理を一つずつ確認します。

まず $\varnothing$ は空個の基底要素の和なので $\varnothing\in\tau_{\mathcal B}$ です。第1基底条件により、各 $x\in X$ について $x\in B_x$ となる $B_x\in\mathcal B$ を一つ取れます。従って

$$
X=\bigcup_{x\in X}B_x
$$

なので $X\in\tau_{\mathcal B}$ です。

次に $U_i\in\tau_{\mathcal B}$ とします。各 $i$ について

$$
U_i=\bigcup_{\lambda\in\Lambda_i}B_{i,\lambda}
$$

と書けるので

$$
\bigcup_iU_i
=\bigcup_i\bigcup_{\lambda\in\Lambda_i}B_{i,\lambda}
$$

も基底要素の和です。従って任意和について閉じています。

最後に有限交差を確認します。二集合の場合を示せば帰納法で十分です。$U,V\in\tau_{\mathcal B}$ とし、任意の $x\in U\cap V$ を取ります。$U,V$ は基底要素の和なので、ある $B_1,B_2\in\mathcal B$ が存在して

$$
x\in B_1\subseteq U,
\qquad
x\in B_2\subseteq V.
$$

第2基底条件から、ある $B_x\in\mathcal B$ が存在して

$$
x\in B_x\subseteq B_1\cap B_2\subseteq U\cap V.
$$

従って

$$
U\cap V=\bigcup_{x\in U\cap V}B_x,
$$

すなわち $U\cap V$ も基底要素の和です。以上から $\tau_{\mathcal B}$ は位相です。$\square$
<!-- proof-end -->

この証明の核心は「$B_1\cap B_2$ 自体が基底要素である必要はない」という点です。交点の各点の周囲に、より小さな基底要素を入れれば十分です。

---

## 2. 部分基底：有限交差を一度挟んでから任意和を取る

<a id="def-top1-subbasis"></a>
<!-- formal-statement-start -->
> **定義（部分基底と生成位相）**  
> 集合 $X$ の任意の部分集合族 $\mathcal S\subseteq\mathcal P(X)$ を考える。$\mathcal S$ の有限個の要素の交差全体を $\mathcal B_{\mathcal S}$ とし、空個の交差は $X$ と約束する。$\mathcal B_{\mathcal S}$ が生成する位相を、$\mathcal S$ が **生成する位相** といい、$\mathcal S$ をその **部分基底** という。
>
> 特に $\mathcal S=\varnothing$ でも、空交差 $X$ が基底に入るため、生成位相は $\{\varnothing,X\}$ と定まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-subbasis -->
### 2.1 定義の確認：半直線から通常位相を作る

$\mathbb R$ 上で

$$
\mathcal S
=\{(-\infty,a):a\in\mathbb R\}
\cup
\{(b,\infty):b\in\mathbb R\}
$$

とします。例えば二つの部分基底要素を交差すると

$$
(-\infty,a)\cap(b,\infty)=(b,a)
$$

となります。従って全ての開区間が有限交差として得られ、それらの任意和から通常の開集合が全て得られます。
<!-- definition-example-end -->

<a id="thm-top1-subbasis-generates"></a>
<!-- formal-statement-start -->
> **定理（部分基底から生成される位相の最小性）**  
> 上の $\mathcal S$ に対し、有限交差族 $\mathcal B_{\mathcal S}$ は基底である。従って位相 $\tau(\mathcal S)$ を生成する。また $\tau(\mathcal S)$ は $\mathcal S$ の全要素を開にする位相のうち最も粗い。すなわち、$\sigma$ が $X$ 上の位相で

$$
\mathcal S\subseteq\sigma
$$

> なら

$$
\tau(\mathcal S)\subseteq\sigma.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\mathcal B_{\mathcal S}$ が基底条件を満たすことを示します。空交差 $X$ 自身が $\mathcal B_{\mathcal S}$ に入るので、全ての点は少なくとも一つの基底候補に入ります。

次に

$$
x\in B_1\cap B_2,
\qquad
B_1,B_2\in\mathcal B_{\mathcal S}
$$

とします。$B_1,B_2$ はそれぞれ $\mathcal S$ の有限個の要素の交差です。従って $B_1\cap B_2$ も $\mathcal S$ の有限個の要素の交差であり

$$
B_1\cap B_2\in\mathcal B_{\mathcal S}.
$$

この $B_1\cap B_2$ 自身を $B_3$ に取れば第2基底条件を満たします。よって[基底から位相を作れる](#thm-top1-basis-generates-topology)から $\tau(\mathcal S)$ が位相として得られます。

最小性を示します。$\sigma$ を $\mathcal S\subseteq\sigma$ を満たす任意の位相とします。位相は有限交差に閉じるので

$$
\mathcal B_{\mathcal S}\subseteq\sigma.
$$

さらに位相は任意和に閉じるので、$\mathcal B_{\mathcal S}$ の任意和も全て $\sigma$ に入ります。しかしそれらがちょうど $\tau(\mathcal S)$ の要素です。従って

$$
\tau(\mathcal S)\subseteq\sigma.
$$

つまり、部分基底を開にするために位相公理が強制する集合だけを追加したものが $\tau(\mathcal S)$ です。$\square$
<!-- proof-end -->

### 2.2 「全ての位相の共通部分」でも同じものが得られる

$\mathcal S$ を含む位相全体を $\mathfrak T$ とすると

$$
\tau(\mathcal S)
=\bigcap_{\sigma\in\mathfrak T}\sigma.
$$

実際、右辺は $\mathcal S$ を含む全ての位相に含まれる集合だけを残すので、上の最小性と一致します。共通部分が位相であることも、各位相公理を成分ごとに確認すれば分かります。

---

## 3. initial topology：写像を連続にする最も粗い位相

写像

$$
f_i:X\to Y_i\qquad(i\in I)
$$

が先に与えられ、各 $Y_i$ には既に位相 $\tau_i$ が入っているとします。$X$ にまだ位相がないとき、「全ての $f_i$ を連続にしたい」という要求から $X$ の位相を逆算できます。

<a id="def-top1-initial-topology"></a>
<!-- formal-statement-start -->
> **定義（initial topology／始位相）**  
> 写像族 $f_i:X\to(Y_i,\tau_i)$ に対して

$$
\mathcal S
=\{f_i^{-1}(U):i\in I,\ U\in\tau_i\}
$$

> を部分基底として生成される $X$ 上の位相を **initial topology**（始位相）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-initial-topology -->
### 3.1 定義の確認：一つの実数値関数から位相を入れる

集合 $X$ と写像 $f:X\to\mathbb R$ を考えます。例えば

$$
f^{-1}((-1,1)),
\qquad
f^{-1}((0,\infty))
$$

などを開にし、さらに有限交差・任意和で強制される集合を全て加えます。このとき $f$ は定義通り連続になります。

$f$ が定数写像なら、開集合の逆像は $\varnothing$ または $X$ だけなので、生成されるのは密着位相 $\{\varnothing,X\}$ です。「定数写像を連続にするためには、ほとんど開集合を要求しなくてよい」ことが見えます。
<!-- definition-example-end -->

<a id="thm-top1-initial-universal"></a>
<!-- formal-statement-start -->
> **定理（initial topology の最粗性と連続性判定）**  
> $X$ に写像族 $f_i:X\to Y_i$ が誘導する initial topology を入れる。このとき：
>
> 1. 全ての $f_i$ は連続である。
> 2. これは全ての $f_i$ を連続にする $X$ 上の位相のうち最も粗い。
> 3. 任意の位相空間 $Z$ と写像 $g:Z\to X$ について

$$
g\text{ が連続}
\quad\Longleftrightarrow\quad
f_i\circ g\text{ が全ての }i\text{ で連続}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**1. 各 $f_i$ の連続性。**  $U\subseteq Y_i$ が開なら

$$
f_i^{-1}(U)\in\mathcal S\subseteq\tau_{\mathrm{init}}
$$

なので、連続性の定義そのものから $f_i$ は連続です。

**2. 最粗性。**  $\sigma$ を、全ての $f_i$ を連続にする別の位相とします。連続性から、任意の $U\in\tau_i$ について

$$
f_i^{-1}(U)\in\sigma.
$$

従って部分基底全体について

$$
\mathcal S\subseteq\sigma.
$$

[部分基底から生成される位相の最小性](#thm-top1-subbasis-generates)より

$$
\tau_{\mathrm{init}}\subseteq\sigma.
$$

これが「最も粗い」の意味です。開集合が少ないほど、$X$ を値域とする写像 $g:Z\to X$ の連続性条件は弱くなります。

**3. 普遍的な連続性判定。**  まず $g$ が連続とします。$U\subseteq Y_i$ を開集合とすると、1より $f_i^{-1}(U)$ は $X$ で開です。従って

$
(f_i\circ g)^{-1}(U)
=g^{-1}(f_i^{-1}(U))
$

は $Z$ で開です。よって各 $f_i\circ g$ は連続です。

逆に全ての $f_i\circ g$ が連続とします。initial topology の部分基底要素

$$
S=f_i^{-1}(U)
$$

を一つ取ると

$$
g^{-1}(S)
=g^{-1}(f_i^{-1}(U))
=(f_i\circ g)^{-1}(U).
$$

右辺は仮定より $Z$ で開です。

ここから「部分基底だけ調べれば十分」を丁寧に確認します。有限交差

$$
B=S_1\cap\cdots\cap S_m
$$

について逆像は交差を保つので

$$
g^{-1}(B)
=g^{-1}(S_1)\cap\cdots\cap g^{-1}(S_m)
$$

であり開です。さらに任意の initial-open set はそのような $B$ の任意和

$$
V=\bigcup_\lambda B_\lambda
$$

なので

$$
g^{-1}(V)
=\bigcup_\lambda g^{-1}(B_\lambda)
$$

も開です。従って $g$ は連続です。$\square$
<!-- proof-end -->

ここで逆像が重要なのは偶然ではありません。任意の写像 $f$ について

$$
f^{-1}\!\left(\bigcup_iA_i\right)
=\bigcup_i f^{-1}(A_i),
\qquad
f^{-1}\!\left(\bigcap_iA_i\right)
=\bigcap_i f^{-1}(A_i)
$$

が常に成り立つため、位相公理と非常に相性がよいのです。

---

## 4. 部分空間位相は initial topology である

[F0-00B1の部分空間位相](../F0_00B1_位相空間_近傍_部分空間_収束/index.md#def-f0-00b1-subspace)を普遍性から見直します。

$A\subseteq X$ とし、包含写像

$$
\iota:A\hookrightarrow X,
\qquad
\iota(a)=a
$$

を考えます。$X$ の開集合 $U$ の逆像は

$$
\iota^{-1}(U)=A\cap U.
$$

従って $\iota$ が誘導する initial topology は

$$
\{A\cap U:U\subseteq X\text{ は開}\},
$$

まさに部分空間位相です。

<a id="prop-top1-subspace-universal"></a>
<!-- formal-statement-start -->
> **命題（部分空間位相の連続性判定）**  
> $A\subseteq X$ に部分空間位相を入れ、$g:Z\to A$ を写像とする。このとき

$$
g:Z\to A\text{ が連続}
\quad\Longleftrightarrow\quad
\iota\circ g:Z\to X\text{ が連続}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

これは[initial topology の連続性判定](#thm-top1-initial-universal)を写像族が $\{\iota\}$ 一つだけの場合に適用したものです。

式で直接確認すると、$A$ の任意の開集合は $A\cap U$ と書けるので

$$
g^{-1}(A\cap U)
=g^{-1}(\iota^{-1}(U))
=(\iota\circ g)^{-1}(U).
$$

従って左右の連続性条件は同じです。$\square$
<!-- proof-end -->

---

## 5. 積位相は射影が作る initial topology

位相空間族 $(X_i,\tau_i)$（$i\in I$）の直積集合

$$
X=\prod_{i\in I}X_i
$$

を考えます。各成分を取り出す射影を

$$
\pi_i:X\to X_i,
\qquad
\pi_i((x_j)_{j\in I})=x_i
$$

とします。

<a id="def-top1-product-topology"></a>
<!-- formal-statement-start -->
> **定義（積位相）**  
> 全ての射影 $\pi_i:\prod_jX_j\to X_i$ が誘導する initial topology を **積位相** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-product-topology -->
### 5.1 定義の確認：$\mathbb R^2$ の長方形

$\mathbb R^2=\mathbb R\times\mathbb R$ では

$$
\pi_1^{-1}((a,b))=(a,b)\times\mathbb R,
$$

$$
\pi_2^{-1}((c,d))=\mathbb R\times(c,d).
$$

この二つを交差すると

$$
\pi_1^{-1}((a,b))\cap\pi_2^{-1}((c,d))
=(a,b)\times(c,d)
$$

となります。従って開長方形が基底になり、その任意和が通常の $\mathbb R^2$ の開集合です。
<!-- definition-example-end -->

<a id="thm-top1-product-basis"></a>
<!-- formal-statement-start -->
> **定理（積位相の基底）**  
> $\prod_{i\in I}X_i$ の積位相は、有限個の座標だけを開集合 $U_i\subseteq X_i$ に制限し、残りの座標を $X_i$ 全体のままにした集合

$$
\prod_{i\in I}U_i,
\qquad
U_i=X_i\text{ except for finitely many }i
$$

> を基底にもつ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積位相の部分基底は

$$
\pi_i^{-1}(U_i)
$$

の形です。異なる有限個の添字 $i_1,\dots,i_m$ について有限交差を取ると

$$
\bigcap_{k=1}^m\pi_{i_k}^{-1}(U_{i_k})
$$

は、「座標 $i_k$ だけ $U_{i_k}$ に入ることを要求し、その他の座標には条件を課さない」集合です。これは直積記号で

$$
\prod_{i\in I}V_i,
$$

ただし

$$
V_i=
\begin{cases}
U_i,&i\in\{i_1,\dots,i_m\},\\
X_i,&\text{otherwise}
\end{cases}
$$

と書けます。

逆に有限個の座標だけ制限した任意の直積集合は、その有限個の射影逆像の交差として書けます。従って「部分基底の有限交差全体」がちょうど主張した集合族であり、[部分基底から生成される位相](#thm-top1-subbasis-generates)の基底です。$\square$
<!-- proof-end -->

<a id="thm-top1-product-universal"></a>
<!-- formal-statement-start -->
> **定理（積位相の普遍性）**  
> 任意の位相空間 $Z$ と写像

$$
g:Z\to\prod_{i\in I}X_i
$$

> に対して

$$
g\text{ が連続}
\quad\Longleftrightarrow\quad
\pi_i\circ g:Z\to X_i\text{ が全て連続}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積位相は射影族 $\{\pi_i\}$ が誘導する initial topology そのものなので、[initial topology の連続性判定](#thm-top1-initial-universal)を適用すれば結論を得ます。

具体的には、$g(z)=(g_i(z))_{i\in I}$ と書けば

$$
\pi_i\circ g=g_i.
$$

従って「直積への写像が連続か」は「各座標関数 $g_i$ が連続か」を一つずつ調べればよいことになります。$\square$
<!-- proof-end -->

### 5.2 なぜ無限積では有限個の座標しか制限しないのか

積位相の基底で同時に制限する座標が有限個なのは、部分基底から基底を作る操作が **有限交差** だからです。

例えば $\mathbb R^{\mathbb N}$ で

$$
(-1,1)^{\mathbb N}
=\prod_{n=1}^{\infty}(-1,1)
$$

は各座標を全部同時に制限しています。これは一般には積位相の基底要素ではなく、実際、積位相では開になりません。

任意の積位相の基底近傍は有限個の座標しか制限しないので、残りのどこかの座標を $2$ に変更してもその基底近傍から出ません。従って $0=(0,0,\dots)$ の周囲に $(-1,1)^{\mathbb N}$ に含まれる積位相の基底近傍は存在しません。

---

## 6. final topology：写像を連続にする最も細かい位相

今度は向きを逆にします。位相空間 $(X_i,\tau_i)$ から、まだ位相を持たない集合 $Y$ への写像

$$
q_i:X_i\to Y
$$

が与えられているとします。

<a id="def-top1-final-topology"></a>
<!-- formal-statement-start -->
> **定義（final topology／終位相）**  
> $Y$ の部分集合族

$$
\tau_{\mathrm{fin}}
=
\{U\subseteq Y:q_i^{-1}(U)\in\tau_i\text{ for every }i\}
$$

> を写像族 $q_i:X_i\to Y$ が誘導する **final topology**（終位相）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-final-topology -->
### 6.1 定義の確認：一つの全射で値域の開集合を決める

全射 $q:X\to Y$ があるとき、$U\subseteq Y$ を開と宣言するかどうかを

$$
q^{-1}(U)\text{ が }X\text{ で開か}
$$

だけで判定できます。例えば $q^{-1}(U)$ が開でなければ、$q$ を連続に保ったまま $U$ を開にすることはできません。
<!-- definition-example-end -->

<a id="thm-top1-final-universal"></a>
<!-- formal-statement-start -->
> **定理（final topology は位相であり、最細である）**  
> 上の $\tau_{\mathrm{fin}}$ は $Y$ 上の位相である。また：
>
> 1. 全ての $q_i$ は連続である。
> 2. $\tau_{\mathrm{fin}}$ は全ての $q_i$ を連続にする $Y$ 上の位相のうち最も細かい。
> 3. 任意の位相空間 $Z$ と写像 $h:Y\to Z$ について

$$
h\text{ が連続}
\quad\Longleftrightarrow\quad
h\circ q_i:X_i\to Z\text{ が全ての }i\text{ で連続}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**まず $\tau_{\mathrm{fin}}$ が位相であること。**  任意の $i$ について

$$
q_i^{-1}(\varnothing)=\varnothing,
\qquad
q_i^{-1}(Y)=X_i
$$

は開なので $\varnothing,Y\in\tau_{\mathrm{fin}}$ です。

$U_\lambda\in\tau_{\mathrm{fin}}$ なら逆像は任意和を保つので

$$
q_i^{-1}\!\left(\bigcup_\lambda U_\lambda\right)
=\bigcup_\lambda q_i^{-1}(U_\lambda)
$$

は各 $X_i$ で開です。従って $\bigcup_\lambda U_\lambda\in\tau_{\mathrm{fin}}$。

また $U_1,\dots,U_m\in\tau_{\mathrm{fin}}$ なら

$$
q_i^{-1}(U_1\cap\cdots\cap U_m)
=q_i^{-1}(U_1)\cap\cdots\cap q_i^{-1}(U_m)
$$

も開です。従って有限交差にも閉じます。

**1. 各 $q_i$ の連続性。**  $U\in\tau_{\mathrm{fin}}$ なら定義により $q_i^{-1}(U)$ が開なので、そのまま連続性の定義です。

**2. 最細性。**  $\sigma$ を、全ての $q_i$ を連続にする $Y$ 上の別の位相とします。$U\in\sigma$ を任意に取ると、各 $q_i$ の連続性から

$$
q_i^{-1}(U)\in\tau_i
$$

です。従って $U\in\tau_{\mathrm{fin}}$。つまり

$$
\sigma\subseteq\tau_{\mathrm{fin}}.
$$

これが「最も細かい」の意味です。initial topology の包含

$$
\tau_{\mathrm{init}}\subseteq\sigma
$$

とは向きが逆なので注意してください。

**3. 普遍的な連続性判定。**  まず $h$ が連続とします。$V\subseteq Z$ を開集合とすると $h^{-1}(V)$ は $Y$ で開です。final topology の定義から各 $i$ について

$
q_i^{-1}(h^{-1}(V))
$

は $X_i$ で開です。一方

$
(h\circ q_i)^{-1}(V)
=q_i^{-1}(h^{-1}(V)),
$

なので各 $h\circ q_i$ は連続です。

逆に全ての $h\circ q_i$ が連続とします。$V\subseteq Z$ を開とすると

$$
q_i^{-1}(h^{-1}(V))
=(h\circ q_i)^{-1}(V)
$$

は全ての $i$ で $X_i$ の開集合です。final topology の定義から

$$
h^{-1}(V)\in\tau_{\mathrm{fin}}.
$$

従って $h$ は連続です。$\square$
<!-- proof-end -->

### 6.2 initial と final の向きを整理する

```text
initial topology:
       f_i
  X --------> Y_i
  ↑
  g
  |
  Z

X の位相を「最粗」にする。
g: Z -> X は、全ての f_i∘g を調べる。

final topology:
  X_i --------> Y
        q_i     |
                | h
                ↓
                Z

Y の位相を「最細」にする。
h: Y -> Z は、全ての h∘q_i を調べる。
```

向きを曖昧な語呂で覚えず、構造写像そのものを見る方が安全です。**initial topology は $f_i:X\to Y_i$ の共通定義域 $X$ に入り、final topology は $q_i:X_i\to Y$ の共通値域 $Y$ に入ります。** そのうえで連続性を試す写像は、initial では $g:Z\to X$ と「入ってくる」向き、final では $h:Y\to Z$ と「出ていく」向きになります。

---

## 7. 商位相は全射が作る final topology

集合 $X$ 上の同値関係 $\sim$ を考え、同値類全体の集合を

$$
X/{\sim}
$$

とします。標準射影を

$$
q:X\to X/{\sim},
\qquad
q(x)=[x]
$$

とします。

<a id="def-top1-quotient-topology"></a>
<!-- formal-statement-start -->
> **定義（商位相・商写像）**  
> 位相空間 $X$ と全射 $q:X\to Y$ に対し

$$
U\subseteq Y\text{ が開}
\quad\Longleftrightarrow\quad
q^{-1}(U)\subseteq X\text{ が開}
$$

> で定まる final topology を $Y$ の **商位相** という。この位相を入れた $Y$ への $q$ を **商写像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-quotient-topology -->
### 7.1 定義の確認：区間の両端を貼る

$X=[0,1]$ で $0\sim1$ とし、それ以外の点は自分自身とのみ同値とします。商集合 $Y=X/{\sim}$ は、直感的には両端を貼って円を作ったものです。

商空間の集合 $U\subseteq Y$ が貼り合わせ点 $q(0)=q(1)$ を含むなら、その逆像 $q^{-1}(U)$ は0と1を両方含みます。従って貼り合わせ点の小さな開近傍は、$[0,1]$ 側では0付近と1付近の **二つの端** を同時に含む形になります。
<!-- definition-example-end -->

<a id="thm-top1-quotient-universal"></a>
<!-- formal-statement-start -->
> **定理（商写像の普遍性）**  
> $q:X\to Y$ を商写像、$Z$ を位相空間とする。写像 $h:Y\to Z$ について

$$
h\text{ が連続}
\quad\Longleftrightarrow\quad
h\circ q:X\to Z\text{ が連続}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

商位相は一つの写像 $q$ が誘導する final topology なので、[final topology の普遍性](#thm-top1-final-universal)の特殊場合です。

直接確認すると、$V\subseteq Z$ が開のとき

$$
q^{-1}(h^{-1}(V))=(h\circ q)^{-1}(V).
$$

右辺が $X$ で開であることと、商位相の定義により $h^{-1}(V)$ が $Y$ で開であることが同値です。$\square$
<!-- proof-end -->

この定理は「貼り合わせ後の空間上で連続性を直接調べる」代わりに、「貼り合わせ前の $X$ へ戻して調べる」ための道具です。

---

## 8. 飽和集合：商写像で像を扱うための条件

逆像は和・交差とよく両立しますが、**像は一般にそうではありません**。商写像の開集合を像で扱うときには、各同値類を途中で切らないことが重要です。

<a id="def-top1-saturated"></a>
<!-- formal-statement-start -->
> **定義（飽和集合）**  
> 全射 $q:X\to Y$ と部分集合 $A\subseteq X$ に対し

$$
q^{-1}(q(A))=A
$$

> が成り立つとき、$A$ を $q$ に関して **飽和している** という。商写像の場合、これは $A$ が各同値類を丸ごと含むか、丸ごと含まないことを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top1-saturated -->
### 8.1 定義の確認

$\mathbb R$ で $0\sim1$ とし、それ以外は自分自身とのみ同値とします。$q:\mathbb R\to\mathbb R/{\sim}$ を標準射影とします。

集合

$$
A=(-1/2,1/2)
$$

は $0$ を含みますが、$0$ と同じ同値類にいる $1$ を含みません。実際

$$
q^{-1}(q(A))=(-1/2,1/2)\cup\{1\}\neq A.
$$

従って $A$ は飽和していません。

一方

$$
A'=(-1/2,1/2)\cup(1-\varepsilon,1+\varepsilon)
$$

のように0と1を同時に十分含む集合でも、他の同値類は単点なので、適切な $\varepsilon$ のもとで飽和性を直接確認できます。
<!-- definition-example-end -->

<a id="prop-top1-saturated-open-image"></a>
<!-- formal-statement-start -->
> **命題（開な飽和集合の像は商空間で開）**  
> $q:X\to Y$ を商写像とする。$A\subseteq X$ が開かつ飽和なら $q(A)$ は $Y$ で開である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

商位相の定義より、$q(A)$ が開であることを示すには

$$
q^{-1}(q(A))
$$

が $X$ で開であることを示せば十分です。飽和性から

$$
q^{-1}(q(A))=A.
$$

仮定により $A$ は開なので、$q^{-1}(q(A))$ は開です。従って $q(A)$ は商空間で開です。$\square$
<!-- proof-end -->

### 8.2 商写像は開写像とは限らない

ここは頻出の誤解です。商写像 $q$ について分かっているのは

$$
U\subseteq Y\text{ open}
\Longleftrightarrow
q^{-1}(U)\subseteq X\text{ open}
$$

であって、

$$
A\subseteq X\text{ open}
\Longrightarrow
q(A)\subseteq Y\text{ open}
$$

ではありません。

先ほどの例

$$
0\sim1\quad\text{in }\mathbb R
$$

を使います。

$$
A=(-1/2,1/2)
$$

は $\mathbb R$ で開です。しかし

$$
q^{-1}(q(A))=(-1/2,1/2)\cup\{1\}
$$

は $1$ を孤立して付け加えた集合なので $\mathbb R$ で開ではありません。商位相の定義から

$$
q(A)\text{ は開ではない}.
$$

従ってこの $q$ は商写像ですが開写像ではありません。

「商写像が像で開集合を送れる」のは、[開な飽和集合](#prop-top1-saturated-open-image)など追加条件がある場合です。

---

## 9. 逆像・像・飽和を手で計算する

抽象定義だけでは混線しやすいので、同じ例を最後まで計算します。

### 9.1 同値関係 $0\sim1$ の例

$q:\mathbb R\to Y=\mathbb R/{\sim}$ とします。

**例1：飽和していない開集合。**

$$
A=(-1/2,1/2).
$$

像 $q(A)$ は商空間の部分集合ですが、その開性を調べるには像を眺めるのでなく逆像へ戻します。

$$
q^{-1}(q(A))=A\cup\{1\}.
$$

これは開でないため $q(A)$ は開でありません。

**例2：飽和した開集合。**

$$
B=(-1/2,1/2)\cup(1/2,3/2).
$$

$B$ は0と1をともに含み、それ以外の同値類は単点なので

$$
q^{-1}(q(B))=B.
$$

$B$ は開なので $q(B)$ は開です。

**例3：商空間の集合から始める。**

$U=q(B)$ と置けば

$$
q^{-1}(U)=B
$$

です。商位相の開性判定はこの向きです。

### 9.2 なぜ $q^{-1}(q(A))$ を計算するのか

一般の全射 $q:X\to Y$ では常に

$$
A\subseteq q^{-1}(q(A))
$$

ですが、等号とは限りません。右辺は $A$ と同じ像へ送られる点を全て追加した集合です。つまり **$A$ を各ファイバーごとに丸ごと膨らませたもの** が $q^{-1}(q(A))$ です。

商位相では、この膨らませた集合の開性が $q(A)$ の開性を決めます。

---

## 10. 最粗・最細を集合包含で読む

「粗い」「細かい」を雰囲気で覚えると initial/final を逆にしがちです。$X$ 上の二つの位相 $\tau_1,\tau_2$ について

$$
\tau_1\subseteq\tau_2
$$

なら、$\tau_1$ の方が **粗い**、$\tau_2$ の方が **細かい** といいます。

### initial topology

全ての $f_i:X\to Y_i$ を連続にする任意の位相 $\sigma$ に対して

$$
\boxed{\tau_{\mathrm{init}}\subseteq\sigma}.
$$

従って initial topology は最粗です。

### final topology

全ての $q_i:X_i\to Y$ を連続にする任意の位相 $\sigma$ に対して

$$
\boxed{\sigma\subseteq\tau_{\mathrm{fin}}}.
$$

従って final topology は最細です。

この二つは「連続写像は開集合の **逆像** を開にする」という一つの定義から出ています。定義域側の位相を選ぶ initial では必要な逆像だけを開にするため最粗、値域側の位相を選ぶ final では逆像が開になる集合を全部開にできるため最細になります。

---

## 11. 演習

### Level A

<a id="ex-top1-a01"></a>
#### TOP1-A01 基底条件
- Level: A

$\mathbb R$ 上の集合族

$$
\mathcal B=\{(a,b):a,b\in\mathbb Q,\ a<b\}
$$

が通常位相の基底であることを示せ。

<!-- solution-start -->
**解答**：任意の $x\in\mathbb R$ に対して有理数の稠密性から

$$
a<x<b
$$

となる $a,b\in\mathbb Q$ を取れるので第1条件を満たします。

また

$$
x\in(a_1,b_1)\cap(a_2,b_2)
$$

なら

$$
\max(a_1,a_2)<x<\min(b_1,b_2).
$$

再び有理数の稠密性から

$$
\max(a_1,a_2)<c<x<d<\min(b_1,b_2)
$$

となる有理数 $c,d$ を取れます。従って

$$
x\in(c,d)\subseteq(a_1,b_1)\cap(a_2,b_2).
$$

よって基底です。さらに任意の通常の開区間 $(u,v)$ と点 $x\in(u,v)$ について、有理端点の $(a,b)$ で

$$
x\in(a,b)\subseteq(u,v)
$$

とできるため、生成される位相は通常位相です。
<!-- solution-end -->

<a id="ex-top1-a02"></a>
#### TOP1-A02 initial topology
- Level: A

$f:X\to Y$ が単射で、$Y$ が離散位相をもつとする。$f$ が誘導する $X$ 上の initial topology を求めよ。

<!-- solution-start -->
**解答**：任意の $A\subseteq X$ に対して、単射性から

$$
A=f^{-1}(f(A)).
$$

$Y$ は離散位相なので $f(A)$ は開です。従って全ての $A\subseteq X$ が initial topology で開になり、$X$ は離散位相をもちます。
<!-- solution-end -->

<a id="ex-top1-a03"></a>
#### TOP1-A03 積位相の逆像
- Level: A

$g:\mathbb R\to\mathbb R^2$ を

$$
g(t)=(t,t^2)
$$

とする。開長方形 $U=(-1,2)\times(1,4)$ の逆像 $g^{-1}(U)$ を求めよ。

<!-- solution-start -->
**解答**：

$$
t\in g^{-1}(U)
$$

であることは

$$
-1<t<2,
\qquad
1<t^2<4
$$

と同値です。後者は

$$
-2<t<-1
\quad\text{または}\quad
1<t<2
$$

なので、前者との共通部分を取って

$$
g^{-1}(U)=(1,2).
$$

開集合になっており、座標関数 $t$ と $t^2$ の連続性から $g$ の連続性が分かることとも一致します。
<!-- solution-end -->

<a id="ex-top1-a04"></a>
#### TOP1-A04 飽和集合
- Level: A

$q:\mathbb R\to\mathbb R/{\sim}$ で $0\sim1$ とし、それ以外は単点同値類とする。次の集合が飽和しているか判定せよ。

1. $(-2,-1)$
2. $(-1/2,1/2)$
3. $(-1/2,1/2)\cup(1/2,3/2)$

<!-- solution-start -->
**解答**：非自明な同値類は $\{0,1\}$ だけです。

1. 0も1も含まないので飽和しています。
2. 0を含むが1を含まないので飽和していません。
3. 0と1をともに含むので飽和しています。
<!-- solution-end -->

### Level B

<a id="ex-top1-b01"></a>
#### TOP1-B01 商写像だが開写像でない例
- Level: B

本文の $0\sim1$ の商写像 $q:\mathbb R\to Y$ について、$q$ が開写像でないことを定義から証明せよ。

<!-- solution-start -->
**解答**：

$$
A=(-1/2,1/2)
$$

は $\mathbb R$ で開です。しかし

$$
q^{-1}(q(A))=A\cup\{1\}
$$

は開でありません。もし $q(A)$ が $Y$ で開なら、商位相の定義からその逆像 $q^{-1}(q(A))$ は開でなければならないので矛盾です。従って $q(A)$ は開でなく、$q$ は開写像ではありません。
<!-- solution-end -->

<a id="ex-top1-b02"></a>
#### TOP1-B02 積への写像
- Level: B

位相空間 $X,Y,Z$ と写像 $f:Z\to X$, $g:Z\to Y$ に対し

$$
F:Z\to X\times Y,
\qquad
F(z)=(f(z),g(z))
$$

と定める。$F$ が連続であることと、$f,g$ がともに連続であることが同値であることを示せ。

<!-- solution-start -->
**解答**：積位相の射影 $\pi_X,\pi_Y$ に対して

$$
\pi_X\circ F=f,
\qquad
\pi_Y\circ F=g.
$$

[積位相の普遍性](#thm-top1-product-universal)から

$$
F\text{ continuous}
\Longleftrightarrow
\pi_X\circ F,\pi_Y\circ F\text{ continuous},
$$

すなわち $f,g$ がともに連続であることと同値です。
<!-- solution-end -->

<a id="ex-top1-b03"></a>
#### TOP1-B03 商空間上の写像を降ろす
- Level: B

$q:X\to Y$ を商写像とし、連続写像 $F:X\to Z$ が各ファイバー上で定数、すなわち

$$
q(x)=q(x')\Longrightarrow F(x)=F(x')
$$

を満たすとする。このとき一意な連続写像 $\bar F:Y\to Z$ が存在して

$$
F=\bar F\circ q
$$

となることを示せ。

<!-- solution-start -->
**解答**：$q$ は全射なので、$y\in Y$ に対し $q(x)=y$ となる $x$ を取り

$$
\bar F(y)=F(x)
$$

と定めます。別の代表元 $x'$ も $q(x')=y$ を満たすなら仮定から $F(x')=F(x)$ なので well-defined です。

定義から直ちに

$$
\bar F\circ q=F.
$$

右辺 $F$ は連続なので、[商写像の普遍性](#thm-top1-quotient-universal)から $\bar F$ は連続です。

一意性について、$G:Y\to Z$ も $G\circ q=F$ を満たすとします。任意の $y\in Y$ に対し全射性から $q(x)=y$ となる $x$ を取れば

$$
G(y)=G(q(x))=F(x)=\bar F(q(x))=\bar F(y).
$$

従って $G=\bar F$ です。
<!-- solution-end -->

### Level C

<a id="ex-top1-c01"></a>
#### TOP1-C01 無限積と箱位相の違い
- Level: C

$X=\mathbb R^{\mathbb N}$ に積位相を入れる。

$$
U=\prod_{n=1}^{\infty}(-1/n,1/n)
$$

が積位相で開でないことを示せ。

<!-- solution-start -->
**解答**：$0=(0,0,\dots)\in U$ です。$U$ が積位相で開なら、$0$ を含む基底要素 $B$ で

$$
0\in B\subseteq U
$$

となるものが存在するはずです。

しかし積位相の基底要素 $B$ は有限個の座標しか制限しません。従って制限されていない添字 $N$ が存在します。その $N$ 座標だけを $2$ に変え、他を0にした点 $x$ を取れば $x\in B$ です。一方

$$
2\notin(-1/N,1/N)
$$

なので $x\notin U$。これは $B\subseteq U$ に矛盾します。従って $U$ は積位相で開ではありません。
<!-- solution-end -->

---

## 12. 章末チェック

- 基底の二条件から、基底要素の任意和が位相になることを証明できる。
- 部分基底の有限交差→任意和という二段階を説明できる。
- 生成位相が「指定した集合族を開にする最粗の位相」であることを包含関係で示せる。
- initial topology を逆像部分基底から構成し、最粗性と普遍性を証明できる。
- 部分空間位相と積位相を initial topology の特殊例として説明できる。
- final topology が本当に位相であること、最細性、普遍性を証明できる。
- 商位相を final topology の特殊例として説明できる。
- $q^{-1}(q(A))$ を計算し、飽和性を判定できる。
- 「商写像は開写像とは限らない」ことを具体的な反例で説明できる。
- initial の最粗と final の最細を、位相の集合包含の向きで区別できる。

---

## 13. 次に進む

この章では「位相を作る装置」を整備しました。次は、これらの構成を使って **商空間・貼り合わせ・同値関係による具体的な位相空間の構成** を扱い、円・円柱・トーラスなどの標準例を、図の直感だけでなく商写像の普遍性で追います。
