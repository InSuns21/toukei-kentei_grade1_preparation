# NSA4 内部集合・外部集合・超自然数・超有限集合

<!-- definition-example-audit: strict -->

NSA3 では Łoś の定理を証明し、一階の主張を超冪へ移送できることを示しました。集合ソートを含む多ソート超冪では、集合列の同値類も超準世界の対象になります。

ここで新しい問題が生じます。超準世界の部分集合なら何でも集合ソートの元なのでしょうか。答えは「いいえ」です。集合列から作れる集合と、超準世界を外から眺めて初めて切り出せる集合を区別しなければなりません。

この章では

$$
\text{集合列・写像列から作れる対象}
\quad\text{と}\quad
\text{外から定義しただけの対象}
$$

を分けます。超自然数、内部集合、内部写像、超有限集合を代表列から具体的に作り、最後に overspill を直接証明します。その結果として、標準自然数全体・無限小全体・有限超実数全体が外部集合であることを確認します。

---

## 1. 自然数も超冪に入れる

NSA1 では実数列から超実数を作りました。同じ構成を自然数ソートに行います。

<a id="def-nsa4-hypernatural"></a>
<!-- formal-statement-start -->
### 定義（超自然数）

自然数ソートの超冪

$$
{}^*\mathbb N
=
\mathbb N^{\mathbb N}/\mathcal U
$$

の元を**超自然数**という。

自然数列 $(h_n)$ の同値類を

$$
H=[h_n]
$$

と書く。標準自然数 $m\in\mathbb N$ は定数列

$$
{}^*m=[m,m,\ldots]
$$

で埋め込む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-hypernatural -->
**定義の確認**。$h_n=n+1$ とすれば

$$
H=[n+1]\in{}^*\mathbb N.
$$

順序は NSA3 の Łoś の定理から

$$
[h_n]<[k_n]
\iff
\{n:h_n<k_n\}\in\mathcal U
$$

と読めます。
<!-- definition-example-end -->

<a id="def-nsa4-infinite-hypernatural"></a>
<!-- formal-statement-start -->
### 定義（無限超自然数）

$H\in{}^*\mathbb N$ が**無限超自然数**であるとは、全ての標準自然数 $m\in\mathbb N$ に対し

$$
H>{}^*m
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-infinite-hypernatural -->
**定義の確認**。$H=[n+1]$ は無限超自然数です。

標準自然数 $m$ を固定すると

$$
E_m=\{n:n+1>m\}
$$

は余有限集合です。自由超フィルター $\mathcal U$ は全ての余有限集合を含むので

$$
E_m\in\mathcal U.
$$

従って

$$
[n+1]>{}^*m.
$$

$m$ は任意だったため、$H$ は無限超自然数です。
<!-- definition-example-end -->

ここで量化しているのは**標準**自然数です。全ての超自然数 $K$ に対して $H>K$ を要求しているのではありません。後者なら $K=H+1$ が反例になります。

---

## 2. 集合列から内部集合を作る

空でない標準集合 $S$ を固定し、集合ソートを

$$
\operatorname{Set}(S)=\mathcal P(S)
$$

とします。集合ソートの超冪の元は部分集合列

$$
A_n\subseteq S
$$

の同値類です。

<a id="def-nsa4-internal-set"></a>
<!-- formal-statement-start -->
### 定義（内部集合）

部分集合列 $A_n\subseteq S$ に対し

$$
[A_n]_{\mathrm{int}}
=
\left\{
[x_n]\in{}^*S:
\{n:x_n\in A_n\}\in\mathcal U
\right\}
$$

と置く。

この形で表される ${}^*S$ の部分集合を**内部集合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-internal-set -->
**定義の確認**。$S=\mathbb N$ とし

$$
A_n=\{0,1,\ldots,n\}
$$

と置きます。

$K=[k_n]$ がこの内部集合に属する条件は

$$
\{n:0\le k_n\le n\}\in\mathcal U.
$$

標準自然数 ${}^*5$ については $n\ge5$ なら $5\in A_n$ なので

$$
{}^*5\in[A_n]_{\mathrm{int}}.
$$

一方、

$$
[n+1]\notin[A_n]_{\mathrm{int}}
$$

です。$n+1\le n$ となる添字は存在しないからです。
<!-- definition-example-end -->

定義が商集合上で意味を持つには、数側・集合側の代表元を取り替えても所属の真偽が変わらないことが必要です。

<a id="prop-nsa4-internal-membership-well-defined"></a>
<!-- formal-statement-start -->
### 命題（内部集合への所属は代表元によらない）

$x_n,y_n\in S$、$A_n,B_n\subseteq S$ とし

$$
[x_n]=[y_n],
\qquad
[A_n]=[B_n].
$$

このとき

$$
\{n:x_n\in A_n\}\in\mathcal U
$$

と

$$
\{n:y_n\in B_n\}\in\mathcal U
$$

は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同値類の仮定から

$$
E=\{n:x_n=y_n\}\in\mathcal U,
\qquad
F=\{n:A_n=B_n\}\in\mathcal U.
$$

さらに

$$
C=\{n:x_n\in A_n\}
$$

が $\mathcal U$ に属すると仮定します。

有限共通部分への閉性により

$$
C\cap E\cap F\in\mathcal U.
$$

この共通部分上では

$$
x_n=y_n,
\qquad
A_n=B_n,
\qquad
x_n\in A_n
$$

なので

$$
y_n\in B_n.
$$

従って

$$
C\cap E\cap F
\subseteq
D:=\{n:y_n\in B_n\}.
$$

上方閉性から $D\in\mathcal U$ です。逆向きは $C,D$ を入れ替えれば同じです。
<!-- proof-end -->

<a id="prop-nsa4-internal-set-sort-injective"></a>
<!-- formal-statement-start -->
### 命題（集合ソートから内部集合への対応は単射）

部分集合列 $A_n,B_n\subseteq S$ に対し

$$
[A_n]_{\mathrm{int}}
=
[B_n]_{\mathrm{int}}
$$

が ${}^*S$ の部分集合として成り立つなら、集合ソートの超冪でも

$$
[A_n]=[B_n]
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

標準世界では、異なる二つの部分集合には必ず一方だけに属する元があります。これは要素ソート $S$ と集合ソート $\mathcal P(S)$、所属関係 $\in$ を使う一階命題なので、NSA3 の移送原理をそのまま適用できます。

<!-- proof-start -->
### 証明

標準世界の外延性から、任意の $A,B\subseteq S$ について

$$
A\ne B
\Longrightarrow
\exists x\in S\,
\bigl(
(x\in A\land x\notin B)
\lor
(x\in B\land x\notin A)
\bigr)
$$

が成り立ちます。

これは多ソート一階言語で書けるので、移送原理により集合ソートの超冪でも同じ主張が成り立ちます。

いま

$$
[A_n]_{\mathrm{int}}
=
[B_n]_{\mathrm{int}}
$$

と仮定します。もし集合ソートで $[A_n]\ne[B_n]$ なら、移送された外延性により、ある $X\in{}^*S$ が存在して

$$
X\in[A_n]_{\mathrm{int}},
\quad
X\notin[B_n]_{\mathrm{int}}
$$

またはその逆が成り立ちます。

しかしこれは二つの内部部分集合が等しいという仮定に反します。従って

$$
[A_n]=[B_n].
$$
<!-- proof-end -->

この単射性により、内部集合を「集合ソートの超冪の元」として扱う見方と、「${}^*S$ の部分集合」として扱う見方を混同せず往復できます。

### 2.1 内部集合は有限集合演算で閉じる

$X=[A_n]_{\mathrm{int}}$、$Y=[B_n]_{\mathrm{int}}$ なら

$$
X\cap Y=[A_n\cap B_n]_{\mathrm{int}},
$$

$$
X\cup Y=[A_n\cup B_n]_{\mathrm{int}},
$$

$$
{}^*S\setminus X=[S\setminus A_n]_{\mathrm{int}}.
$$

共通部分を例に取ると、$[x_n]\in X\cap Y$ は

$$
\{n:x_n\in A_n\}\in\mathcal U
$$

かつ

$$
\{n:x_n\in B_n\}\in\mathcal U
$$

と同値です。有限共通部分への閉性から、これは

$$
\{n:x_n\in A_n\cap B_n\}\in\mathcal U
$$

と同値です。

---

## 3. 標準集合の超準拡張

内部集合の基本例は、集合列を一定にしたものです。

<a id="def-nsa4-standard-set-extension"></a>
<!-- formal-statement-start -->
### 定義（標準集合の超準拡張）

標準集合 $B\subseteq S$ に対し、定数列

$$
B,B,B,\ldots
$$

が定める内部集合を

$$
{}^*B
$$

と書き、$B$ の**超準拡張**という。

すなわち

$$
[x_n]\in{}^*B
\iff
\{n:x_n\in B\}\in\mathcal U.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-standard-set-extension -->
**定義の確認**。$B=\{0,1\}$ とします。

$X=[x_n]\in{}^*B$ なら

$$
E=\{n:x_n\in\{0,1\}\}\in\mathcal U.
$$

$E$ は

$$
E_0=\{n:x_n=0\},
\qquad
E_1=\{n:x_n=1\}
$$

の和集合です。超フィルターの二者択一から $E_0$ または $E_1$ が $\mathcal U$ に属するので

$$
X={}^*0
\quad\text{または}\quad
X={}^*1.
$$
<!-- definition-example-end -->

<a id="prop-nsa4-finite-standard-extension"></a>
<!-- formal-statement-start -->
### 命題（有限標準集合の超準拡張は新しい元を持たない）

有限集合

$$
F=\{a_1,\ldots,a_r\}\subseteq S
$$

に対し

$$
{}^*F
=
\{{}^*a_1,\ldots,{}^*a_r\}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

右辺の各元が ${}^*F$ に属することは

$$
\{n:a_j\in F\}
=
\mathbb N\in\mathcal U
$$

から従います。

逆に $X=[x_n]\in{}^*F$ とします。すると

$$
E=\{n:x_n\in F\}\in\mathcal U.
$$

各 $j$ について

$$
E_j=\{n:x_n=a_j\}
$$

と置けば

$$
E=E_1\cup\cdots\cup E_r.
$$

もし全ての $E_j$ が $\mathcal U$ に属さなければ、超フィルター性から全ての補集合が $\mathcal U$ に属します。その有限共通部分は

$$
\mathbb N\setminus E
$$

なので、$E\in\mathcal U$ と両立しません。

従ってある $j$ について $E_j\in\mathcal U$ であり

$$
X={}^*a_j.
$$
<!-- proof-end -->

標準集合 $B$ に対して

$$
\sigma(B)=\{{}^*b:b\in B\}
$$

を標準元だけのコピーと書くことにします。有限 $B$ なら ${}^*B=\sigma(B)$ です。

しかし $B=\mathbb N$ では

$$
[n+1]\in{}^*\mathbb N
$$

は無限超自然数なので $\sigma(\mathbb N)$ に入りません。従って

$$
\sigma(\mathbb N)\subsetneq{}^*\mathbb N.
$$

---

## 4. 写像列から内部写像を作る

空でない標準集合 $S,T$ を固定し、各 $n$ について

$$
f_n:S\to T
$$

を取ります。

<a id="def-nsa4-internal-map"></a>
<!-- formal-statement-start -->
### 定義（内部写像）

写像列 $(f_n)$ の $\mathcal U$-同値類 $F=[f_n]$ に対し

$$
F:{}^*S\to{}^*T
$$

を

$$
F([x_n])
=
[f_n(x_n)]
$$

で定める。

この形で得られる写像を**内部写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-internal-map -->
**定義の確認**。$S=T=\mathbb N$ とし

$$
f_n(k)=k+n
$$

とします。この列が定める内部写像は

$$
F([k_n])=[k_n+n].
$$

特に

$$
F({}^*0)=[n]
$$

は無限超自然数です。

従って $F$ は固定した標準写像 $f:\mathbb N\to\mathbb N$ の超準拡張 ${}^*f$ ではありません。標準写像の超準拡張なら

$$
{}^*f({}^*0)={}^*(f(0))
$$

は標準自然数だからです。
<!-- definition-example-end -->

<a id="prop-nsa4-internal-map-well-defined"></a>
<!-- formal-statement-start -->
### 命題（内部写像の評価は代表元によらない）

$$
[f_n]=[g_n],
\qquad
[x_n]=[y_n]
$$

なら

$$
[f_n(x_n)]=[g_n(y_n)].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

仮定から

$$
E=\{n:f_n=g_n\}\in\mathcal U,
\qquad
F=\{n:x_n=y_n\}\in\mathcal U.
$$

従って $E\cap F\in\mathcal U$ です。

$n\in E\cap F$ なら

$$
f_n(x_n)=g_n(y_n).
$$

よって

$$
E\cap F
\subseteq
\{n:f_n(x_n)=g_n(y_n)\}.
$$

上方閉性から右辺は $\mathcal U$ に属し、結論が従います。
<!-- proof-end -->

固定した標準写像 $f:S\to T$ の定数列から得る内部写像を ${}^*f$ と書きます。

---

## 5. 超有限集合

有限集合については最大値や有限和などの性質が使えます。超準解析では「各座標では有限」という形を残したまま、その要素数を無限超自然数にできます。

<a id="def-nsa4-hyperfinite-set"></a>
<!-- formal-statement-start -->
### 定義（超有限集合）

内部集合

$$
X=[F_n]_{\mathrm{int}}
$$

が、各 $n$ について有限集合 $F_n$ を取る代表列を持つとき、$X$ を**超有限集合**という。

この代表列に対し

$$
|X|_{\mathrm{int}}
=
[\,|F_n|\,]\in{}^*\mathbb N
$$

を内部的な大きさという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-hyperfinite-set -->
**定義の確認**。$H=[h_n]\in{}^*\mathbb N$ とし

$$
I_{h_n}=\{1,2,\ldots,h_n\}
$$

とします。$h_n=0$ のときは空集合と約束します。

$$
I_H=[I_{h_n}]_{\mathrm{int}}
$$

は超有限集合で

$$
|I_H|_{\mathrm{int}}=H.
$$

特に $H=[n+1]$ なら各 $I_{n+1}$ は有限ですが、内部的な大きさ $H$ は無限超自然数です。
<!-- definition-example-end -->

<a id="prop-nsa4-hyperfinite-initial-segment"></a>
<!-- formal-statement-start -->
### 命題（超有限初期区間の所属判定）

$H=[h_n]\in{}^*\mathbb N$ とし

$$
I_H=[\{1,\ldots,h_n\}]_{\mathrm{int}}.
$$

$K=[k_n]\in{}^*\mathbb N$ に対し

$$
K\in I_H
\iff
1\le K\le H.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内部集合への所属の定義から

$$
K\in I_H
\iff
\{n:1\le k_n\le h_n\}\in\mathcal U.
$$

一方

$$
1\le K
\iff
\{n:1\le k_n\}\in\mathcal U,
$$

$$
K\le H
\iff
\{n:k_n\le h_n\}\in\mathcal U.
$$

二つの右辺が同時に成り立つことは、その有限共通部分

$$
\{n:1\le k_n\le h_n\}
$$

が $\mathcal U$ に属することと同値です。
<!-- proof-end -->

---

## 6. 超有限集合では最大値を座標ごとに作れる

<a id="thm-nsa4-hyperfinite-maximum"></a>
<!-- formal-statement-start -->
### 定理（非空内部部分集合の超有限最大値原理）

$H\in{}^*\mathbb N$ とし、$Y$ を $I_H$ の非空な内部部分集合とする。

このとき $Y$ は最大元を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$H=[h_n]$、$Y=[A_n]_{\mathrm{int}}$ と表します。内部包含と非空性を Łoś の定理で座標ごとの主張へ戻すと、$\mathcal U$-大集合上で $A_n$ は非空有限集合になります。そこで各座標の最大値を取ります。

<!-- proof-start -->
### 証明

$H=[h_n]$、$Y=[A_n]_{\mathrm{int}}$ とします。

$Y\subseteq I_H$ は集合ソートの一階命題

$$
\forall x\,(x\in Y\to x\in I_H)
$$

なので Łoś の定理から

$$
E_1
=
\{n:A_n\subseteq\{1,\ldots,h_n\}\}
\in\mathcal U.
$$

また $Y\ne\varnothing$ から

$$
E_2
=
\{n:A_n\ne\varnothing\}
\in\mathcal U.
$$

従って

$$
E=E_1\cap E_2\in\mathcal U.
$$

$n\in E$ では $A_n$ は非空有限集合なので

$$
m_n=\max A_n
$$

を取ります。$n\notin E$ では $m_n=1$ と置きます。

$E$ 上で $m_n\in A_n$ なので

$$
M=[m_n]\in Y.
$$

任意の $K=[k_n]\in Y$ を取ると

$$
F=\{n:k_n\in A_n\}\in\mathcal U.
$$

$n\in E\cap F$ では

$$
k_n\le m_n.
$$

従って

$$
\{n:k_n\le m_n\}\in\mathcal U,
$$

すなわち $K\le M$ です。$K$ は任意なので $M$ が最大元です。
<!-- proof-end -->

ここで $Y$ が単なる部分集合ではなく**内部集合**であることが核心です。

---

## 7. 外部集合

超準世界を外から見ると、「標準である」「無限小である」といった条件でも部分集合を切り出せます。しかし、その全てが集合列から来るわけではありません。

<a id="def-nsa4-external-set"></a>
<!-- formal-statement-start -->
### 定義（外部集合）

${}^*S$ の部分集合 $E$ が、どの部分集合列 $A_n\subseteq S$ に対しても

$$
E=[A_n]_{\mathrm{int}}
$$

と表せないとき、$E$ を**外部集合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa4-external-set -->
**定義の見通し**。次節で

$$
\mathbb N_{\mathrm{std}}
=
\{{}^*m:m\in\mathbb N\}
$$

が外部集合であることを示します。

一方、無限超自然数 $H$ に対する

$$
I_H=\{K\in{}^*\mathbb N:1\le K\le H\}
$$

は内部集合です。
<!-- definition-example-end -->

外部集合も通常の集合論の意味では普通の部分集合です。違いは、集合ソートの超冪の元ではないため、内部集合に対する移送をそのまま適用できないことです。

---

## 8. overspill

内部集合と外部集合の差をはっきり示すのが overspill です。ここでは飽和性を前提にせず、代表列から直接証明します。

<a id="thm-nsa4-overspill"></a>
<!-- formal-statement-start -->
### 定理（内部集合の overspill）

$X\subseteq{}^*\mathbb N$ を内部集合とする。

全ての標準自然数 $m\in\mathbb N$ について

$$
{}^*m\in X
$$

と仮定する。

このとき、ある無限超自然数 $H$ が存在して

$$
H\in X
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

$X=[A_n]_{\mathrm{int}}$ とします。各座標で

> $A_n$ が $0$ からどこまで連続して含むか

を $n$ 以下で測り、その最大値を $h_n$ とします。固定した標準 $m$ に対しては $\mathcal U$-大集合上で $h_n>m$ となり、一方 $h_n\in A_n$ も $\mathcal U$-大集合上で成り立ちます。

<!-- proof-start -->
### 証明

内部性から

$$
X=[A_n]_{\mathrm{int}}
$$

と表します。

各 $n$ について

$$
C_n
=
\left\{
k\in\{0,1,\ldots,n\}:
\{0,1,\ldots,k\}\subseteq A_n
\right\}
$$

と置きます。

$C_n\ne\varnothing$ なら

$$
h_n=\max C_n
$$

とし、空なら $h_n=0$ とします。

${}^*0\in X$ なので

$$
E_0=\{n:0\in A_n\}\in\mathcal U.
$$

$n\in E_0$ では $0\in C_n$ なので $h_n\in A_n$ です。従って

$$
\{n:h_n\in A_n\}\in\mathcal U
$$

であり

$$
H=[h_n]\in X.
$$

次に標準自然数 $m$ を固定します。

仮定から各 $j=0,1,\ldots,m+1$ について

$$
E_j=\{n:j\in A_n\}\in\mathcal U.
$$

有限共通部分

$$
E^{(m)}
=
E_0\cap E_1\cap\cdots\cap E_{m+1}
$$

は $\mathcal U$ に属します。

また

$$
F^{(m)}=\{n:n\ge m+1\}
$$

は余有限なので $\mathcal U$ に属します。

$n\in E^{(m)}\cap F^{(m)}$ なら

$$
\{0,1,\ldots,m+1\}\subseteq A_n
$$

かつ $m+1\le n$ なので

$$
m+1\in C_n.
$$

従って

$$
h_n\ge m+1>m.
$$

よって

$$
\{n:h_n>m\}\in\mathcal U
$$

であり

$$
H>{}^*m.
$$

$m$ は任意だったので $H$ は無限超自然数です。
<!-- proof-end -->

無限個の集合を一度に共通部分したわけではありません。各固定 $m$ について使ったのは

$$
E_0\cap\cdots\cap E_{m+1}
$$

という**有限**共通部分です。

<a id="cor-nsa4-standard-naturals-external"></a>
<!-- formal-statement-start -->
### 系（標準自然数全体は外部集合である）

$$
\mathbb N_{\mathrm{std}}
=
\{{}^*m:m\in\mathbb N\}
$$

は外部集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内部集合だと仮定します。定義上、全ての標準自然数を含むので overspill により無限超自然数 $H$ も含むことになります。

しかし $\mathbb N_{\mathrm{std}}$ の元は定数列から来る標準自然数だけです。無限超自然数はそのどれとも等しくありません。矛盾です。
<!-- proof-end -->

---

## 9. 無限小全体は外部集合である

NSA1 の無限小全体を

$$
\mu(0)
=
\{X\in{}^*\mathbb R:X\text{ は無限小}\}
$$

と書きます。

<a id="prop-nsa4-infinitesimals-external"></a>
<!-- formal-statement-start -->
### 命題（無限小全体は外部集合である）

$\mu(0)$ は外部集合である。
<!-- formal-statement-end -->

### 証明の見取り図

内部だと仮定して $\mu(0)=[A_n]_{\mathrm{int}}$ とします。各標準 $k\ge1$ について $1/k$ は無限小ではないので、$\mathcal U$-大集合上で $1/k\notin A_n$ です。

各座標で「$A_n$ から抜けている $1/k$ のうち $k\le n+1$ で最大の分母」を選びます。その分母を $q_n$ とすると $1/q_n$ は全ての標準 $1/m$ より小さくなる一方、$A_n$ からは外れます。

<!-- proof-start -->
### 証明

内部集合だと仮定し

$$
\mu(0)=[A_n]_{\mathrm{int}}
$$

とします。

標準 $k\ge1$ に対して $1/k$ は無限小ではないので

$$
E_k
=
\left\{
n:\frac1k\notin A_n
\right\}
\in\mathcal U.
$$

各 $n$ について

$$
Q_n
=
\left\{
k\in\{1,\ldots,n+1\}:
\frac1k\notin A_n
\right\}
$$

と置きます。

$Q_n\ne\varnothing$ なら

$$
q_n=\max Q_n
$$

とし、空なら $q_n=1$ とします。

$E_1\in\mathcal U$ 上では $Q_n$ は非空で、定義から

$$
\frac1{q_n}\notin A_n.
$$

従って

$$
X=\left[\frac1{q_n}\right]
\notin[A_n]_{\mathrm{int}}.
$$

一方、標準 $m\ge1$ を固定します。

$$
E_{m+1}\in\mathcal U
$$

であり

$$
F_m=\{n:n\ge m\}
$$

も余有限集合なので $\mathcal U$ に属します。

$n\in E_{m+1}\cap F_m$ では $m+1\in Q_n$ なので

$$
q_n\ge m+1.
$$

従って

$$
0<
\frac1{q_n}
\le
\frac1{m+1}
<
\frac1m.
$$

よって全ての標準 $m$ について

$$
0<X<\frac1m.
$$

任意の標準実数 $r>0$ に対し、Archimedes 性から $1/m<r$ となる標準 $m$ を選べるので

$$
|X|<r.
$$

従って $X$ は無限小、すなわち $X\in\mu(0)$ です。

これは

$$
X\notin[A_n]_{\mathrm{int}}
$$

と矛盾します。従って $\mu(0)$ は外部集合です。
<!-- proof-end -->

---

## 10. 有限超実数全体も外部集合である

NSA5 で標準部を作るため、有限超実数を詳しく扱います。ここでは外部性だけ先に確認します。

$$
\operatorname{Fin}({}^*\mathbb R)
=
\left\{
X\in{}^*\mathbb R:
\exists\text{ 標準 }m\ge1,\ |X|<m
\right\}.
$$

<a id="prop-nsa4-limited-hyperreals-external"></a>
<!-- formal-statement-start -->
### 命題（有限超実数全体は外部集合である）

$\operatorname{Fin}({}^*\mathbb R)$ は外部集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内部集合だと仮定し

$$
\operatorname{Fin}({}^*\mathbb R)
=
[A_n]_{\mathrm{int}}
$$

とします。

全ての標準自然数 $m$ は有限超実数なので

$$
E_m=\{n:m\in A_n\}\in\mathcal U.
$$

overspill の証明と同じ対角構成を行います。各 $n$ について

$$
C_n
=
\left\{
k\in\{0,\ldots,n\}:
\{0,\ldots,k\}\subseteq A_n
\right\}
$$

とし、非空なら $h_n=\max C_n$、空なら $h_n=0$ とします。

$E_0\in\mathcal U$ 上では $h_n\in A_n$ なので

$$
H=[h_n]\in[A_n]_{\mathrm{int}}.
$$

一方、任意の標準 $m$ に対して

$$
E_0\cap\cdots\cap E_{m+1}\cap\{n:n\ge m+1\}
$$

は $\mathcal U$ に属し、その上で

$$
h_n\ge m+1.
$$

従って

$$
H>{}^*m
$$

が全ての標準 $m$ について成り立ちます。$H$ は無限超自然数なので有限超実数ではありません。

これは

$$
H\in[A_n]_{\mathrm{int}}
=
\operatorname{Fin}({}^*\mathbb R)
$$

と矛盾します。
<!-- proof-end -->

NSA5 で定義する標準部写像の定義域自体が外部集合であることに注意してください。標準部は普通の内部写像ではありません。

---

## 11. internal / external を見分ける

内部側の典型例は次です。

- ${}^*\mathbb N$
- 固定した標準集合 $B$ の ${}^*B$
- 集合列 $A_n$ から作った $[A_n]_{\mathrm{int}}$
- 標準写像 $f$ の ${}^*f$
- 写像列 $f_n$ から作った内部写像
- $H\in{}^*\mathbb N$ に対する $I_H=\{1,\ldots,H\}$

外部側の典型例は次です。

- 標準自然数全体 $\mathbb N_{\mathrm{std}}$
- 無限小全体 $\mu(0)$
- 有限超実数全体 $\operatorname{Fin}({}^*\mathbb R)$
- 「標準である」という条件で切り出した集合

無限超自然数 $H$ を固定すると $I_H$ は内部超有限集合で、最大元 $H$ を持ちます。

一方、その中の標準正自然数だけを集めた

$$
S_{\mathrm{std}}
=
\{{}^*m:m\in\mathbb N,\ m\ge1\}
$$

は外部集合です。任意の標準 $m$ に対して $m+1$ も標準なので最大元を持ちません。

つまり、壊れたのは「有限性」ではなく**内部性**です。

---

## 12. この章で得た道具

この章では

$$
\text{標準集合・写像}
\longrightarrow
\text{定数列}
\longrightarrow
\text{内部集合・内部写像}
$$

と

$$
\text{有限集合列}
\longrightarrow
\text{超有限集合}
$$

を具体化しました。

一方で

$$
\mathbb N_{\mathrm{std}},
\qquad
\mu(0),
\qquad
\operatorname{Fin}({}^*\mathbb R)
$$

は外部集合でした。

次の NSA5 では、この区別を踏まえて有限超実数から実数を取り出す標準部を構成します。

---

# 演習

## Level A

<a id="ex-nsa4-a01"></a>
### NSA4-A01 $[n+1]$ が無限超自然数であることを確認する
- Level: A

$$
H=[n+1]\in{}^*\mathbb N
$$

とする。任意の標準自然数 $m$ に対し $H>{}^*m$ を、添字集合を明示して示せ。

<!-- solution-start -->
#### 詳細解答

標準 $m$ を固定します。

$$
E_m=\{n:n+1>m\}
$$

と置きます。$n\ge m$ なら $n+1>m$ なので

$$
\{n:n\ge m\}\subseteq E_m.
$$

左辺は余有限集合で $\mathcal U$ に属します。上方閉性から $E_m\in\mathcal U$ です。

従って

$$
[n+1]>{}^*m.
$$

$m$ は任意なので $H$ は無限超自然数です。
<!-- solution-end -->

<a id="ex-nsa4-a02"></a>
### NSA4-A02 増大する有限集合列から内部集合を読む
- Level: A

$$
A_n=\{0,1,\ldots,n\},
\qquad
X=[A_n]_{\mathrm{int}}.
$$

1. 全ての標準自然数 ${}^*m$ が $X$ に属することを示せ。
2. $[n]\in X$ を示せ。
3. $[n+1]\notin X$ を示せ。

<!-- solution-start -->
#### 詳細解答

1. 標準 $m$ について

$$
\{n:m\in A_n\}
=
\{n:m\le n\}
$$

は余有限集合なので $\mathcal U$ に属します。従って ${}^*m\in X$ です。

2. 全ての $n$ で $n\in A_n$ なので

$$
\{n:n\in A_n\}=\mathbb N\in\mathcal U.
$$

従って $[n]\in X$ です。

3. $n+1\in A_n$ となる $n$ は存在しないので

$$
\{n:n+1\in A_n\}=\varnothing\notin\mathcal U.
$$

従って $[n+1]\notin X$ です。
<!-- solution-end -->

<a id="ex-nsa4-a03"></a>
### NSA4-A03 有限標準集合の超準拡張
- Level: A

$F=\{2,5,9\}$ とする。$X=[x_n]\in{}^*F$ なら

$$
X={}^*2,\quad{}^*5,\quad{}^*9
$$

のいずれかであることを示せ。

<!-- solution-start -->
#### 詳細解答

$X\in{}^*F$ なので

$$
E=\{n:x_n\in\{2,5,9\}\}\in\mathcal U.
$$

$$
E_2=\{n:x_n=2\},\quad
E_5=\{n:x_n=5\},\quad
E_9=\{n:x_n=9\}
$$

と置けば

$$
E=E_2\cup E_5\cup E_9.
$$

もし三つ全てが $\mathcal U$ に属さなければ、三つの補集合が全て $\mathcal U$ に属し、その有限共通部分 $\mathbb N\setminus E$ も $\mathcal U$ に入って矛盾します。

従って少なくとも一つ、例えば $E_5$ が $\mathcal U$ に属します。このとき

$$
[x_n]={}^*5.
$$

他の場合も同じです。
<!-- solution-end -->

<a id="ex-nsa4-a04"></a>
### NSA4-A04 標準写像ではない内部写像
- Level: A

$$
f_n(k)=k+n
$$

が定める内部写像 $F=[f_n]$ を考える。

1. $F([k_n])$ を求めよ。
2. $F({}^*3)$ を求めよ。
3. $F$ が固定した標準写像の超準拡張ではないことを示せ。

<!-- solution-start -->
#### 詳細解答

1.

$$
F([k_n])
=
[f_n(k_n)]
=
[k_n+n].
$$

2.

$$
F({}^*3)=[n+3].
$$

これは無限超自然数です。

3. $F={}^*f$ となる標準写像 $f$ が存在すると仮定します。すると

$$
F({}^*3)={}^*(f(3))
$$

は標準自然数です。しかし $[n+3]$ は無限超自然数なので矛盾します。
<!-- solution-end -->

<a id="ex-nsa4-a05"></a>
### NSA4-A05 超有限初期区間
- Level: A

無限超自然数 $H$ に対し

$$
I_H=\{K\in{}^*\mathbb N:1\le K\le H\}
$$

とする。

1. 全ての標準正自然数 ${}^*m$ が $I_H$ に属することを示せ。
2. $H\in I_H$ を示せ。
3. $H+1\notin I_H$ を示せ。

<!-- solution-start -->
#### 詳細解答

1. $m\ge1$ が標準なら

$$
1\le{}^*m<H
$$

なので ${}^*m\in I_H$ です。

2. $1\le H\le H$ なので $H\in I_H$ です。

3. $H+1\in I_H$ なら $H+1\le H$ となります。一方、順序の移送から $H<H+1$ です。矛盾するので $H+1\notin I_H$ です。
<!-- solution-end -->

## Level B

<a id="ex-nsa4-b01"></a>
### NSA4-B01 内部集合への所属の well-defined 性
- Level: B

$$
[x_n]=[y_n],
\qquad
[A_n]=[B_n]
$$

とする。$[x_n]\in[A_n]_{\mathrm{int}}$ なら $[y_n]\in[B_n]_{\mathrm{int}}$ を示せ。

<!-- solution-start -->
#### 詳細解答

$$
E=\{n:x_n=y_n\},
\qquad
F=\{n:A_n=B_n\},
\qquad
C=\{n:x_n\in A_n\}
$$

はいずれも $\mathcal U$ に属します。

従って

$$
C\cap E\cap F\in\mathcal U.
$$

この集合上では $y_n\in B_n$ なので

$$
C\cap E\cap F
\subseteq
\{n:y_n\in B_n\}.
$$

上方閉性から右辺も $\mathcal U$ に属し、結論が従います。
<!-- solution-end -->

<a id="ex-nsa4-b02"></a>
### NSA4-B02 内部写像の評価の well-defined 性
- Level: B

$$
[f_n]=[g_n],
\qquad
[x_n]=[y_n]
$$

なら $[f_n(x_n)]=[g_n(y_n)]$ を示せ。

<!-- solution-start -->
#### 詳細解答

$$
E=\{n:f_n=g_n\}\in\mathcal U,
\qquad
F=\{n:x_n=y_n\}\in\mathcal U.
$$

$n\in E\cap F$ なら $f_n(x_n)=g_n(y_n)$ です。従って

$$
E\cap F
\subseteq
\{n:f_n(x_n)=g_n(y_n)\}.
$$

$E\cap F\in\mathcal U$ と上方閉性から

$$
\{n:f_n(x_n)=g_n(y_n)\}\in\mathcal U.
$$

よって値の同値類が一致します。
<!-- solution-end -->

<a id="ex-nsa4-b03"></a>
### NSA4-B03 overspill から標準自然数全体の外部性を示す
- Level: B

$\mathbb N_{\mathrm{std}}$ が内部集合だと仮定し、overspill から矛盾を導け。また「無限集合だから内部でない」という説明が誤りである理由を述べよ。

<!-- solution-start -->
#### 詳細解答

内部だと仮定すると全ての標準自然数を含むので、overspill により無限超自然数 $H$ も含みます。

しかし $\mathbb N_{\mathrm{std}}$ は標準自然数だけの集合なので矛盾です。

「無限集合だから内部でない」は誤りです。無限超自然数 $H$ に対する $I_H$ は外から見れば無限に多くの要素を持ちますが、有限集合列から作られる内部超有限集合です。

区別を決めるのは無限性ではなく、集合列の超冪として表せるかどうかです。
<!-- solution-end -->

<a id="ex-nsa4-b04"></a>
### NSA4-B04 無限小全体の外部性を対角化で示す
- Level: B

$\mu(0)=[A_n]_{\mathrm{int}}$ と仮定する。本文の対角構成を再現し

$$
X\in\mu(0)
\quad\text{かつ}\quad
X\notin[A_n]_{\mathrm{int}}
$$

となる $X$ を作れ。

<!-- solution-start -->
#### 詳細解答

各標準 $k\ge1$ について $1/k$ は無限小ではないので

$$
E_k=\{n:1/k\notin A_n\}\in\mathcal U.
$$

各 $n$ で

$$
Q_n
=
\{k\in\{1,\ldots,n+1\}:1/k\notin A_n\}
$$

とし、非空なら $q_n=\max Q_n$、空なら $q_n=1$ とします。

$E_1$ 上では $1/q_n\notin A_n$ なので

$$
X=[1/q_n]\notin[A_n]_{\mathrm{int}}.
$$

一方、標準 $m$ に対して $E_{m+1}\cap\{n:n\ge m\}$ は $\mathcal U$ に属し、その上で

$$
q_n\ge m+1.
$$

従って

$$
0<X<1/m
$$

が全ての標準 $m$ について成り立ちます。Archimedes 性から任意の標準 $r>0$ に対し $1/m<r$ となる $m$ が取れるため $|X|<r$ です。

よって $X$ は無限小です。これは $X\notin[A_n]_{\mathrm{int}}$ と矛盾します。
<!-- solution-end -->

<a id="ex-nsa4-b05"></a>
### NSA4-B05 有限超実数全体の外部性
- Level: B

$\operatorname{Fin}({}^*\mathbb R)$ が内部集合だと仮定し、全ての標準自然数が属することから overspill 型の対角構成で矛盾を導け。

<!-- solution-start -->
#### 詳細解答

$$
\operatorname{Fin}({}^*\mathbb R)
=
[A_n]_{\mathrm{int}}
$$

と仮定します。

全ての標準自然数 $m$ は有限超実数なので

$$
E_m=\{n:m\in A_n\}\in\mathcal U.
$$

各 $n$ について

$$
C_n
=
\{k\in\{0,\ldots,n\}:\{0,\ldots,k\}\subseteq A_n\}
$$

とし、非空なら $h_n=\max C_n$、空なら $h_n=0$ とします。

$E_0$ 上で $h_n\in A_n$ なので

$$
H=[h_n]\in[A_n]_{\mathrm{int}}.
$$

しかし固定した標準 $m$ に対し

$$
E_0\cap\cdots\cap E_{m+1}\cap\{n:n\ge m+1\}
$$

上では $h_n\ge m+1$ です。従って $H>{}^*m$ が全ての標準 $m$ について成り立ち、$H$ は無限超自然数です。

よって $H$ は有限超実数ではありません。これは $H\in[A_n]_{\mathrm{int}}$ と矛盾します。
<!-- solution-end -->

## Level C

<a id="ex-nsa4-c01"></a>
### NSA4-C01 内部最大値原理と外部集合の失敗を比較する
- Level: C

$H$ を無限超自然数とし

$$
I_H=\{K\in{}^*\mathbb N:1\le K\le H\}.
$$

1. $Y\subseteq I_H$ が非空内部集合なら最大元を持つことを代表列から再構成せよ。
2. 外部集合
   $$
   S_{\mathrm{std}}
   =
   \{{}^*m:m\in\mathbb N,\ m\ge1\}
   $$
   が $I_H$ の部分集合であることを示せ。
3. $S_{\mathrm{std}}$ が最大元を持たないことを示せ。
4. 1. と3. が矛盾しない理由を、内部性を使った箇所まで特定して説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $H=[h_n]$、$Y=[A_n]_{\mathrm{int}}$ とします。

内部包含と非空性から Łoś の定理で

$$
E_1
=
\{n:A_n\subseteq\{1,\ldots,h_n\}\}
\in\mathcal U,
$$

$$
E_2
=
\{n:A_n\ne\varnothing\}
\in\mathcal U.
$$

$E=E_1\cap E_2$ 上で

$$
m_n=\max A_n
$$

を取り、外では $m_n=1$ と置きます。すると

$$
M=[m_n]\in Y.
$$

任意の $K=[k_n]\in Y$ に対し

$$
F=\{n:k_n\in A_n\}\in\mathcal U.
$$

$E\cap F$ 上で $k_n\le m_n$ なので $K\le M$ です。従って $M$ が最大元です。

2. 標準 $m\ge1$ なら $H$ が無限なので

$$
1\le{}^*m<H.
$$

従って ${}^*m\in I_H$ であり、$S_{\mathrm{std}}\subseteq I_H$ です。

3. $S_{\mathrm{std}}$ の最大元が ${}^*m$ だと仮定します。しかし ${}^*(m+1)$ も $S_{\mathrm{std}}$ に属し

$$
{}^*m<{}^*(m+1).
$$

矛盾です。

4. 1. では $Y$ が内部集合だから

$$
Y=[A_n]_{\mathrm{int}}
$$

と表せ、包含・非空性を Łoś の定理で座標ごとの有限集合 $A_n$ の主張へ戻せました。その後で初めて $m_n=\max A_n$ を構成できました。

外部集合 $S_{\mathrm{std}}$ には、この集合自身を表す集合列がありません。従って座標ごとの最大値構成へ入れません。差を生んでいるのは部分集合の内部性です。
<!-- solution-end -->
