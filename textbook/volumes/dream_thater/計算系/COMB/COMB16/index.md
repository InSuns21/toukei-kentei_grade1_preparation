# COMB16 重み付き計数と q-二項係数

<!-- definition-example-audit: strict -->

[通常の二項係数](../COMB2/index.md#thm-comb2-binomial-count)は、条件を満たす対象を一つずつ数えます。しかし、同じ個数の格子路でも、曲がる位置や通った領域の広さは違います。総数だけを出すと、その違いは消えてしまいます。

ここでは各対象に指数の形で**重み**を付け、個数と形の情報を一つの多項式へまとめます。[単調格子路](../COMB4/index.md#def-comb4-lattice-path)を例に、面積を指数にすると普通の二項係数が $q$-二項係数へ変わることを証明します。$q$ はまず単なる不定元であり、無限級数の収束を仮定しません。

## 1. 「何個あるか」と「どんなものか」を同時に数える

有限集合 $X$ の各元 $x$ に、二つの非負整数 $s(x),t(x)$ を割り当てます。例えば $s$ は使った印の数、$t$ は配置の複雑さです。$u$ の次数で前者、$q$ の次数で後者を記録すれば、同じ統計値の対象が同じ項へ集まります。

以下の $\mathbb Z[u,q]$ は、$u,q$ の非負整数冪からなる整数係数多項式全体です。また $[u^kq^\ell]$ は [COMB9 の係数抽出](../COMB9/index.md#def-comb9-formal-series)を二変数へ拡張した記号です。

<a id="def-comb16-weight-inventory"></a>

<!-- formal-statement-start -->
> **定義（有限集合の重み付き計数多項式）**  
> 有限集合 $X$ と写像 $s,t:X\to\mathbb Z_{\ge0}$ に対し、二変数の重み付き計数多項式を

$$
W_X(u,q)=\sum_{x\in X}u^{s(x)}q^{t(x)}\in\mathbb Z[u,q]
$$

> と定める。空集合の多項式は $W_{\varnothing}=0$ とする。$[u^kq^\ell]W_X$ は $u^kq^\ell$ の係数を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb16-weight-inventory -->
### 例：長さ3の二値語

**定義の確認**として、文字 $E,N$ からなる長さ3の語を $X$ とし、$s(w)$ は $E$ の個数、$t(w)$ は「先に現れた $E$、後に現れた $N$」という位置の組の数とします。$s,t$ はいずれも非負整数で、語が有限個なので多項式の定義条件を満たします。

| $E$ の個数 | 語と $t$ の値 | その係数多項式 |
| --- | --- | --- |
| 0 | $NNN:0$ | $1$ |
| 1 | $NNE:0,\ NEN:1,\ ENN:2$ | $1+q+q^2$ |
| 2 | $NEE:0,\ ENE:1,\ EEN:2$ | $1+q+q^2$ |
| 3 | $EEE:0$ | $1$ |

従って

$$
W_X(u,q)=1+(1+q+q^2)u+(1+q+q^2)u^2+u^3.
$$

例えば $[u^1q^2]W_X=1$ は語 $ENN$ 一つを、$[u^2q^1]W_X=1$ は語 $ENE$ 一つを数えます。$W_X(1,1)=8$ は総数であり、$[u^1]W_X(u,1)=3$ は $E$ が一個の語の数です。
<!-- definition-example-end -->

二つの集合が重ならなければ、一方か他方かで分類して重みを足せます。この互いに素な和を $X\sqcup Y$ と書きます。一方、組 $(x,y)$ の統計がそれぞれの統計の和なら、重みは積になります。

<a id="prop-comb16-weight-laws"></a>

<!-- formal-statement-start -->
> **命題（重み付き計数の加法・乗法）**  
> 有限集合 $X,Y$ が交わらず、それぞれに非負整数値の二統計 $s_X,t_X:X\to\mathbb Z_{\ge0}$、$s_Y,t_Y:Y\to\mathbb Z_{\ge0}$ が定まるとき、和集合には各集合で与えられた統計を使って

$$
W_{X\sqcup Y}(u,q)=W_X(u,q)+W_Y(u,q).
$$

> また $X\times Y$ の統計を $s(x,y)=s_X(x)+s_Y(y)$、$t(x,y)=t_X(x)+t_Y(y)$ と定めた場合、

$$
W_{X\times Y}(u,q)=W_X(u,q)W_Y(u,q).
$$
<!-- formal-statement-end -->

### 証明の見取り図

加法は重複のない分類で和を分け、乗法は一つの組の重みが二つの重みの積になることを使います。

<!-- proof-start -->
### 証明

互いに素な和の各元は $X$ または $Y$ の一方だけに属するので、

$$
\sum_{z\in X\sqcup Y}u^{s(z)}q^{t(z)}
=\sum_{x\in X}u^{s_X(x)}q^{t_X(x)}
+\sum_{y\in Y}u^{s_Y(y)}q^{t_Y(y)}.
$$

直積では $u^{s(x,y)}q^{t(x,y)}=(u^{s_X(x)}q^{t_X(x)})(u^{s_Y(y)}q^{t_Y(y)})$ です。右辺を全ての $(x,y)$ について展開して集めると

$$
\sum_{x\in X}\sum_{y\in Y}
(u^{s_X(x)}q^{t_X(x)})(u^{s_Y(y)}q^{t_Y(y)})
=W_X(u,q)W_Y(u,q)
$$

となります。
<!-- proof-end -->

この乗法は**二つの統計がともに加法的である場合**に限ります。二値語を連結すると、前半の $E$ と後半の $N$ が新しい組を作ります。その交差項を忘れて単純に掛けると、面積の多項式を誤って数えることになります。

## 2. 格子路の面積を一項ずつ記録する

格子点 $(0,0)$ から $(a,b)$ へ、東 $E=(1,0)$ と北 $N=(0,1)$ の歩みだけで行く路を考えます。以下 $a,b$ は非負整数です。路は $a$ 個の $E$ と $b$ 個の $N$ からなる語と一対一に対応します（[格子路の語表示](../COMB4/index.md#def-comb4-lattice-path)）。

北向きの一歩を始める点の横座標は、その歩みより前にあった $E$ の数です。その横座標だけ、その高さの行に経路の左側の単位正方形があるので、全ての北向きの一歩で足せば面積を数えられます。

<a id="def-comb16-path-area"></a>

<!-- formal-statement-start -->
> **定義（単調格子路の面積統計）**  
> $a$ 個の $E$ と $b$ 個の $N$ からなる語 $w$ に対し、各 $N$ の直前までに現れた $E$ の個数を足したものを面積 $A(w)$ と呼ぶ。すなわち

$$
A(w)=\#\{(i,j):1\le i<j\le a+b,\ w_i=E,\ w_j=N\}.
$$

> これは $[0,a]\times[0,b]$ 内の各水平帯で、北向き辺の左側にある単位正方形の総数に等しい。面積の計数多項式を

$$
G_{a,b}(q)=\sum_{w:\#E=a,\ \#N=b}q^{A(w)}
$$

> と定義する。$a=0$ または $b=0$ の場合は唯一の路の面積が0なので $G_{a,0}=G_{0,b}=1$ とする。
<!-- formal-statement-end -->

これは路全体を $X$ とし、先ほどの[重み付き計数多項式](#def-comb16-weight-inventory)で $s(w)=0$、$t(w)=A(w)$ と置いた $W_X(1,q)$ です。特に、面積の異なる路をまとめる操作は多項式の係数を足す操作に対応します。

<!-- definition-example-start: def-comb16-path-area -->
### 例：幅2、高さ1の三つの路

**定義の確認**として、$a=2,b=1$ の路は $NEE,ENE,EEN$ だけです。各路で北向きの一歩の直前の横座標は順に $0,1,2$ です。従って面積も $0,1,2$ となり、

$$
G_{2,1}(q)=1+q+q^2.
$$

一方 $a=b=2$ では六つの路があり、$NNEE,NENE,NEEN,ENNE,ENEN,EENN$ の面積は順に $0,1,2,2,3,4$ です。$[q^2]G_{2,2}=2$ の理由は、面積2の路が $NEEN$ と $ENNE$ の二つだからです。
<!-- definition-example-end -->

単に「面積を重みとして定義する」だけでは計算は速くなりません。最後にどの一歩を置くかで分類すると、面積がどう変わるかを正確に追えます。

<a id="thm-comb16-path-recurrence"></a>

<!-- formal-statement-start -->
> **定理（面積多項式の二方向の漸化式）**  
> 非負整数 $a,b$ に対して $G_{a,0}=G_{0,b}=1$ である。$a,b\ge1$ なら

$$
G_{a,b}(q)=G_{a-1,b}(q)+q^aG_{a,b-1}(q)
$$

> および

$$
G_{a,b}(q)=q^bG_{a-1,b}(q)+G_{a,b-1}(q)
$$

> が成立する。いずれも初期値と合わせて全ての $G_{a,b}$ を一意に定める。
<!-- formal-statement-end -->

### 証明の見取り図

最後の文字で分類する式では、最後が $N$ なら先行する $E$ が全て新しい組を一つずつ作ります。最初の文字で分類する式では、最初が $E$ なら後続の $N$ が全て新しい組を作ります。

<!-- proof-start -->
### 証明

$a,b\ge1$ を固定します。末尾が $E$ の語は $(a-1,b)$ の語に $E$ を付けたものと一対一です。後に $N$ がないので面積は増えず、重みの総和は $G_{a-1,b}$ です。

末尾が $N$ の語は $(a,b-1)$ の語に $N$ を付けたものと一対一です。先行する $E$ はちょうど $a$ 個なので面積は $A+a$ となり、重みの総和は $q^aG_{a,b-1}$ です。[重み付き加法](#prop-comb16-weight-laws)で両分類を足して第一式を得ます。

同様に、先頭が $N$ ならそれより前の $E$ はなく、残り $(a,b-1)$ の面積は変わりません。先頭が $E$ なら後続の $N$ が $b$ 個なので、残り $(a-1,b)$ の面積に $b$ を加えます。第二式を得ます。

境界 $a=0$ または $b=0$ には一本しか路がなく面積0です。また内部の $a+b$ の小さい順に計算すれば、右辺は必ず $a+b-1$ の値なので一意に決まります。
<!-- proof-end -->

例えば第一式で

$$
G_{2,2}=G_{1,2}+q^2G_{2,1}
=(1+q+q^2)+q^2(1+q+q^2)
=1+q+2q^2+q^3+q^4.
$$

手で列挙した六路の係数と一致します。

## 3. q-二項係数：普通の二項係数の精密化

$(0,0)$ から $(k,n-k)$ への路は、長さ $n$ の語で $E$ の位置を $k$ か所選ぶものです。面積の情報を忘れると $\binom nk$ 通りです。面積を残したものを $q$-二項係数（Gaussian 二項係数）と呼びます。

<a id="def-comb16-gaussian-binomial"></a>

<!-- formal-statement-start -->
> **定義（q-二項係数）**  
> 整数 $n\ge0$、$0\le k\le n$ に対し

$$
\begin{bmatrix}n\\k\end{bmatrix}_q
=G_{k,n-k}(q)
=\sum_{w:\#E=k,\ \#N=n-k}q^{A(w)}
$$

> と定義する。範囲外の整数 $k$ には値0を割り当てる。境界値は次のとおりである。

$$
\begin{bmatrix}n\\0\end{bmatrix}_q
=\begin{bmatrix}n\\n\end{bmatrix}_q=1.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb16-gaussian-binomial -->
### 例：三個から一個を選ぶとき

**定義の確認**として $n=3,k=1$ を選びます。$E$ が一個、$N$ が二個の語は $ENN,NEN,NNE$ で、面積はそれぞれ $2,1,0$ です。よって

$$
\begin{bmatrix}3\\1\end{bmatrix}_q=1+q+q^2,
\qquad
\left.\begin{bmatrix}3\\1\end{bmatrix}_q\right|_{q=1}=3=\binom31.
$$

同じ三個の選択肢でも、$E$ がどの位置に置かれるかまで識別されています。
<!-- definition-example-end -->

<a id="thm-comb16-q-pascal"></a>

<!-- formal-statement-start -->
> **定理（q-Pascal の二つの漸化式）**  
> 整数 $n\ge2$、$1\le k\le n-1$ に対し、

$$
\begin{bmatrix}n\\k\end{bmatrix}_q
=\begin{bmatrix}n-1\\k-1\end{bmatrix}_q
+q^k\begin{bmatrix}n-1\\k\end{bmatrix}_q
$$

> と

$$
\begin{bmatrix}n\\k\end{bmatrix}_q
=\begin{bmatrix}n-1\\k\end{bmatrix}_q
+q^{n-k}\begin{bmatrix}n-1\\k-1\end{bmatrix}_q
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

面積多項式の第一式と第二式にそれぞれ $a=k,b=n-k$ を代入します。指数が $k$ と $n-k$ で違うのは、最後と最初のどちらで語を分類したかの違いです。

<!-- proof-start -->
### 証明

[面積の漸化式](#thm-comb16-path-recurrence)の第一式に $a=k,b=n-k$ を入れると、

$$
G_{k,n-k}=G_{k-1,n-k}+q^kG_{k,n-k-1}.
$$

右辺の第一項は長さ $(k-1)+(n-k)=n-1$、$E$ が $k-1$ 個の路なので $\begin{bmatrix}n-1\\k-1\end{bmatrix}_q$、第二項は長さ $k+(n-k-1)=n-1$、$E$ が $k$ 個の路なので $\begin{bmatrix}n-1\\k\end{bmatrix}_q$ です。これが第一式です。第二の面積漸化式を同じ $a,b$ に適用すれば

$$
G_{k,n-k}=q^{n-k}G_{k-1,n-k}+G_{k,n-k-1}
$$

となり第二式を得ます。
<!-- proof-end -->

次の積には $1-q^i$ という分母が現れます。$q$ をまだ数値にしないとき、零でない多項式を分母に持つ分数式も計算できる範囲を $\mathbb Q(q)$ と書きます。分母を0にしてよいという意味ではありません。

<a id="thm-comb16-product-formula"></a>

<!-- formal-statement-start -->
> **定理（q-二項係数の積公式）**  
> 整数 $n\ge0$、$0\le k\le n$ に対し、$q$ を不定元とし、多項式の商を扱える $\mathbb Q(q)$ では

$$
\begin{bmatrix}n\\k\end{bmatrix}_q
=\prod_{i=1}^{k}\frac{1-q^{n-k+i}}{1-q^i}.
$$

> 空積は1とする。右辺は分数式として書かれているが、約分した結果は非負整数係数の多項式である。
<!-- formal-statement-end -->

### 証明の見取り図

積の式を $P(n,k)$ と置きます。$P(n-1,k)$ と $P(n-1,k-1)$ を共通の $P(n,k)$ で表すと、[q-Pascal の第二式](#thm-comb16-q-pascal)が成立します。境界も一致するため、格子路を数える多項式と同一です。

<!-- proof-start -->
### 証明

$P(n,k)=\prod_{i=1}^{k}(1-q^{n-k+i})/(1-q^i)$ とします。$k=0$ は空積で1、$k=n$ は分子・分母が同じ因子で1です。内部 $1\le k\le n-1$ では分子の因子を一つずつ比較して

$$
\begin{aligned}
\frac{P(n-1,k)}{P(n,k)}
&=\frac{1-q^{n-k}}{1-q^n},\\
\frac{P(n-1,k-1)}{P(n,k)}
&=\frac{1-q^k}{1-q^n}.
\end{aligned}
$$

第一式では分子の最小指数が $n-k$ に下がり、最大指数 $n$ が消えます。第二式では分子の最大指数 $n$ を除き、分母でも最後の因子 $1-q^k$ を除きます。従って

$$
\begin{aligned}
P(n-1,k)+q^{n-k}P(n-1,k-1)
&=P(n,k)\frac{(1-q^{n-k})+q^{n-k}(1-q^k)}{1-q^n}\\
&=P(n,k)\frac{1-q^n}{1-q^n}=P(n,k).
\end{aligned}
$$

初期値と[漸化式](#thm-comb16-q-pascal)が一致するので、$n$ に関する帰納法により $P(n,k)=\begin{bmatrix}n\\k\end{bmatrix}_q$ です。右辺は[格子路の定義](#def-comb16-gaussian-binomial)から有限個の単項式の和であるため、非負整数係数の多項式になることも証明できました。
<!-- proof-end -->

ここで $q=1$ を積の各因子へ直接代入すると $0/0$ になります。**評価するのは約分後の多項式**です。[二項係数の計数](../COMB2/index.md#thm-comb2-binomial-count)と格子路の位置選択を用いれば

$$
\left.\begin{bmatrix}n\\k\end{bmatrix}_q\right|_{q=1}
=\#\{w:\#E=k,\#N=n-k\}=\binom nk.
$$

積からも $1-q^m=(1-q)(1+q+\cdots+q^{m-1})$ を用い、$q\to1$ の各商の極限を取れば $\prod_{i=1}^k(n-k+i)/i=\binom nk$ です。**有限な多項式の評価**と**有理式の極限**を区別してください。

## 4. 対称性と積の展開

路を逆順に読むと、元の「$E$ が $N$ より前」という組は「$N$ が $E$ より前」という組へ移ります。$E,N$ の組は全部で $k(n-k)$ 個です。この操作が係数の左右対称性を説明します。

この対称性を式にすると $q^{-1}$（$q$ の逆数）への置換が現れます。[形式的 Laurent 級数](../COMB13/index.md#def-comb13-formal-residue)のうち、負の指数を含んでも項数が有限な式を **Laurent 多項式**と呼びます。

いったん $q,q^{-1}$ の両方を使える式として比較し、最後に負の指数が打ち消されることを確認します。$q=0$ を代入する操作ではありません。

<a id="prop-comb16-q-symmetries"></a>

<!-- formal-statement-start -->
> **命題（q-二項係数の対称性と次数）**  
> 整数 $n\ge0$、$0\le k\le n$、$d=k(n-k)$ に対し

$$
\begin{bmatrix}n\\k\end{bmatrix}_q
=\begin{bmatrix}n\\n-k\end{bmatrix}_q,\qquad
\begin{bmatrix}n\\k\end{bmatrix}_q
=q^d\begin{bmatrix}n\\k\end{bmatrix}_{q^{-1}}
$$

> が成立する。後者は Laurent 多項式としての恒等式であり、両辺は実際には通常の多項式である。$0<k<n$ の場合は次数が $d$、定数項と最高次係数はともに1である。
<!-- formal-statement-end -->

### 証明の見取り図

「語の逆順」は指数を $d-A$ へ、「逆順かつ $E,N$ の交換」は $E$ の個数を $k$ から $n-k$ へ変え、面積を保ちます。

<!-- proof-start -->
### 証明

語 $w$ に $k$ 個の $E$ と $n-k$ 個の $N$ があれば、異種文字の組は $d$ 個です。どの組も $E$ が先か $N$ が先かのいずれか一方なので、逆順にした語 $w^{\mathrm{rev}}$ は

$$
A(w^{\mathrm{rev}})=d-A(w)
$$

を満たします。逆順操作は全単射ですから

$$
\sum_wq^{A(w)}
=\sum_wq^{d-A(w)}
=q^d\sum_w(q^{-1})^{A(w)}.
$$

また逆順にした後で $E,N$ を交換する操作を考えます。元の $i<j$ で $w_i=E,w_j=N$ の組は、変換後には $n+1-j<n+1-i$ にある $E,N$ の組へ対応します。従って面積を保ち、$E$ が $n-k$ 個の語への全単射です。これで第一の対称性も従います。

面積は $0\le A\le d$ で、$N^{n-k}E^k$ だけが $A=0$、$E^kN^{n-k}$ だけが $A=d$ です。従って定数項と最高次係数は1で、$0<k<n$ なら次数は $d$ です。$k=0,n$ は $d=0$ の定数多項式です。
<!-- proof-end -->

<a id="thm-comb16-q-binomial-theorem"></a>

<!-- formal-statement-start -->
> **定理（有限 q-二項定理）**  
> 任意の整数 $n\ge0$ に対し、$\mathbb Z[u,q]$ の多項式恒等式

$$
\prod_{j=0}^{n-1}(1+uq^j)
=\sum_{k=0}^{n}u^kq^{k(k-1)/2}
\begin{bmatrix}n\\k\end{bmatrix}_q
$$

> が成り立つ。$n=0$ の積は1とする。
<!-- formal-statement-end -->

### 証明の見取り図

左辺で $u$ を選ぶ因子の位置を $j_1<\cdots<j_k$ とすると指数は $\sum j_i$ です。この指数から最小値 $0+1+\cdots+(k-1)$ を引くと、「選んでいない位置が選んだ位置より先にある」組を数えられます。これは先の面積統計と逆順操作で同じ分布になります。

<!-- proof-start -->
### 証明

各因子から $1$ か $uq^j$ を選んで展開します。$u$ を選んだ位置を $0\le j_1<\cdots<j_k\le n-1$ とすれば、その項は $u^kq^{j_1+\cdots+j_k}$ です。

選んだ位置を $E$、残りを $N$ とした語を考えます。位置 $j_i$ より前には $j_i$ 個の位置があり、そのうち $i-1$ 個は $E$ です。従ってこの $E$ より前の $N$ は $j_i-(i-1)$ 個で、

$$
\sum_{i=1}^k j_i
=\frac{k(k-1)}2+\sum_{i=1}^k\bigl(j_i-(i-1)\bigr).
$$

後ろの和は「$N$ が $E$ より先」の組の総数です。[語の逆順操作](#prop-comb16-q-symmetries)はこの組を[面積統計](#def-comb16-path-area) $A$ で数える組へ移す全単射です。従って $u^k$ の係数は $q^{k(k-1)/2}\begin{bmatrix}n\\k\end{bmatrix}_q$ となり、全ての $k$ を足せば結論です。
<!-- proof-end -->

$n=3$ では

$$
\begin{aligned}
(1+u)(1+uq)(1+uq^2)
&=1+(1+q+q^2)u\\
&\quad+(q+q^2+q^3)u^2+q^3u^3.
\end{aligned}
$$

$q=1$ では $(1+u)^3$ へ戻り、[通常の二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)と一致します。なお $\sum_k\begin{bmatrix}n\\k\end{bmatrix}_q u^k$ **そのもの**が左辺の積に等しいわけではありません。$q^{k(k-1)/2}$ を落とさないことが重要です。

## 5. 二つの部分路をつなぐときの交差項

二値語を $w=vw'$ に分け、前半に $j$ 個の $E$、後半に $k-j$ 個の $E$ があるとします。面積を数える位置の組は「両方とも前半」「両方とも後半」「前半の $E$ と後半の $N$」の三種類です。最後の種類が重み付き計数の追加因子を生みます。

<a id="thm-comb16-q-vandermonde"></a>

<!-- formal-statement-start -->
> **定理（q-Vandermonde の畳み込み）**  
> 非負整数 $n,m$ と $0\le k\le n+m$ に対し

$$
\begin{bmatrix}n+m\\k\end{bmatrix}_q
=\sum_{j=\max(0,k-m)}^{\min(n,k)}
q^{j(m-k+j)}
\begin{bmatrix}n\\j\end{bmatrix}_q
\begin{bmatrix}m\\k-j\end{bmatrix}_q
$$

> が成り立つ。和は添字が許される範囲だけを走る。
<!-- formal-statement-end -->

### 証明の見取り図

前半の $E$ が $j$ 個、後半の $N$ が $m-k+j$ 個なので、前半から後半をまたぐ $E,N$ の組は必ず $j(m-k+j)$ 個です。内部の面積だけなら二つの $q$-二項係数が掛かります。

<!-- proof-start -->
### 証明

長さ $n+m$、$E$ が $k$ 個の任意の語を、先頭 $n$ 文字の $v$ と末尾 $m$ 文字の $w'$ に一意に切ります。$v$ の $E$ の数を $j$ とすると、$0\le j\le n$、$0\le k-j\le m$ なので和の範囲は明示された上下限です。$w'$ には $m-(k-j)=m-k+j$ 個の $N$ があります。

元の語の $E$ が $N$ より前にある位置の組は、両方が $v$ 内の $A(v)$ 個、両方が $w'$ 内の $A(w')$ 個、前半の $E$ と後半の $N$ の $j(m-k+j)$ 個にちょうど分割されます。従って

$$
q^{A(vw')}=q^{j(m-k+j)}q^{A(v)}q^{A(w')}.
$$

固定した $j$ では前半と後半を独立に選べます。両部分語にはそれぞれ $s=0,t=A$ を与えます。交差因子は $j$ のみに依存する定数です。[重み付き計数の加法・乗法](#prop-comb16-weight-laws)の直積の式を適用すると、重みの総和は

$$
q^{j(m-k+j)}
\begin{bmatrix}n\\j\end{bmatrix}_q
\begin{bmatrix}m\\k-j\end{bmatrix}_q
$$

です。$j$ の異なる分類は重ならず、全語を尽くすため、和を取れば結論です。
<!-- proof-end -->

ここで $q=1$ にすると交差因子が1になり、通常の二項係数についての畳み込み

$$
\binom{n+m}{k}=\sum_j\binom nj\binom m{k-j}
$$

が得られます。総数の計数では見えなかった交差項が、面積統計では不可欠です。

## 6. 演習：重みと分類を同時に検算する

### Level A：小さい集合を確実に数える

#### A1. 二値語の面積

$E$ が1個、$N$ が2個の語を全て列挙し、各面積と $\begin{bmatrix}3\\1\end{bmatrix}_q$ を求めよ。

- Level: A
- ID: COMB16-A1

<!-- solution-start -->
**詳細解答**

語は $ENN,NEN,NNE$ です。[面積の定義](#def-comb16-path-area)で $E$ より後の $N$ を数えると、順に2、1、0です。従って

$$
\begin{bmatrix}3\\1\end{bmatrix}_q=q^2+q+1.
$$

$q=1$ では3通りとなり、$\binom31=3$ と一致します。
<!-- solution-end -->

#### A2. 重み付き直積

$X=\{x,y\}$ で $(s,t)(x)=(0,1)$、$(s,t)(y)=(1,0)$、$Y=\{z_0,z_1\}$ で $(s,t)(z_0)=(0,0)$、$(s,t)(z_1)=(1,2)$ とする。直積の統計は成分ごとの和とする。$W_X,W_Y,W_{X\times Y}$ と $[u^1]W_{X\times Y}$ を求めよ。

- Level: A
- ID: COMB16-A2

<!-- solution-start -->
**詳細解答**

[重みの定義](#def-comb16-weight-inventory)から $W_X=q+u$、$W_Y=1+uq^2$ です。[直積の公式](#prop-comb16-weight-laws)で

$$
W_{X\times Y}=(q+u)(1+uq^2)
=q+u+uq^3+u^2q^2.
$$

従って $[u^1]W_{X\times Y}=1+q^3$ です。実際 $(y,z_0)$ の統計は $(1,0)$、$(x,z_1)$ の統計は $(1,3)$ で、この二組だけが $s=1$ です。
<!-- solution-end -->

#### A3. 二行二列の面積分布

$(0,0)$ から $(2,2)$ への全単調格子路を列挙し、$G_{2,2}(q)$ を求めよ。$q=1$ で検算せよ。

- Level: A
- ID: COMB16-A3

<!-- solution-start -->
**詳細解答**

語 $NNEE,NENE,NEEN,ENNE,ENEN,EENN$ の面積は順に $0,1,2,2,3,4$ です。従って

$$
G_{2,2}(q)=1+q+2q^2+q^3+q^4.
$$

$q=1$ では係数和 $1+1+2+1+1=6$ です。[通常の格子路の総数](../COMB4/index.md#thm-comb4-unrestricted-paths) $\binom42=6$ と一致します。
<!-- solution-end -->

#### A4. 境界と $q=0$

$G_{3,0}(q)$、$G_{0,3}(q)$ と、多項式 $\begin{bmatrix}5\\2\end{bmatrix}_q$ を $q=0$ および $q=1$ で評価した値を求め、それぞれ何を数えるか説明せよ。

- Level: A
- ID: COMB16-A4

<!-- solution-start -->
**詳細解答**

前二者は $EEE$、$NNN$ の唯一の路で面積0なので、どちらも1です。後二者は $E$ が2個、$N$ が3個の語を数えます。

$q=0$ では面積0の $NNNEE$ だけが寄与して1です（$q^0=1$）。一方 $q=1$ では全語が重み1で、[位置選択の計数](../COMB2/index.md#thm-comb2-binomial-count)により $\binom52=10$ です。$q=0$ は面積0だけを残す操作であり、対象集合を空にする操作ではありません。
<!-- solution-end -->

#### A5. 面積の総和

$E$ が1個、$N$ が2個の語について、面積の総和を求めよ。$\begin{bmatrix}3\\1\end{bmatrix}_q$ を $q$ について[形式的微分](../COMB13/index.md#def-comb13-formal-derivative)し、$q=1$ で評価する方法でも確認せよ。

- Level: A
- ID: COMB16-A5

<!-- solution-start -->
**詳細解答**

語 $ENN,NEN,NNE$ の面積は2、1、0なので総和は3です。$F(q)=\sum_wq^{A(w)}=1+q+q^2$ と置きます。ここで $F'(q)$ は形式変数 $q$ に関する微分であり、各 $q^r$ を $rq^{r-1}$ に写します。有限和の各項に適用して

$$
F'(q)=\sum_{w:A(w)\ge1}A(w)q^{A(w)-1}=1+2q.
$$

$A=0$ の項は定数なので微分すると0です。$F'(1)=1+2=3$ で直接計数と一致します。[形式的微分](../COMB13/index.md#def-comb13-formal-derivative)を多項式へ適用しているので、極限や収束の仮定は不要です。
<!-- solution-end -->

### Level B：式を別の経路から導く

#### B1. 最初の一歩でも分類する

$G_{a,b}$ を最初の一歩によって分類して第二の漸化式を再導出せよ。$a=b=2$ に適用し、最後の一歩の分類と一致することを確かめよ。

- Level: B
- ID: COMB16-B1

<!-- solution-start -->
**詳細解答**

先頭が $N$ なら後続は $(a,b-1)$ の語で、先頭 $N$ は新しい $E$-先行-$N$ の組を作りません。先頭が $E$ なら後続は $(a-1,b)$ の語で、先頭 $E$ と後続 $b$ 個の $N$ が新しい組を作ります。従って

$$
G_{a,b}=G_{a,b-1}+q^bG_{a-1,b}.
$$

$a=b=2$ では $G_{2,1}=G_{1,2}=1+q+q^2$ なので

$$
G_{2,2}=(1+q+q^2)+q^2(1+q+q^2)
=1+q+2q^2+q^3+q^4.
$$

これは[末尾分類](#thm-comb16-path-recurrence)の $G_{1,2}+q^2G_{2,1}$ と一致します。
<!-- solution-end -->

#### B2. 有理式が多項式になる

$\begin{bmatrix}5\\2\end{bmatrix}_q$ を漸化式で多項式として求め、[積公式](#thm-comb16-product-formula)の有理式と一致することを分母を払って確認せよ。

- Level: B
- ID: COMB16-B2

<!-- solution-start -->
**詳細解答**

[q-Pascal の第二式](#thm-comb16-q-pascal)で

$$
\begin{bmatrix}5\\2\end{bmatrix}_q
=\begin{bmatrix}4\\2\end{bmatrix}_q
+q^3\begin{bmatrix}4\\1\end{bmatrix}_q.
$$

第一項は $1+q+2q^2+q^3+q^4$、第二の二項係数は $1+q+q^2+q^3$ なので

$$
P(q)=1+q+2q^2+2q^3+2q^4+q^5+q^6.
$$

積公式は $(1-q^4)(1-q^5)/((1-q)(1-q^2))$ です。実際

$$
\begin{aligned}
(1-q)P(q)&=1+q^2-q^5-q^7,\\
(1-q^2)(1-q)P(q)&=1-q^4-q^5+q^9\\
&=(1-q^4)(1-q^5).
\end{aligned}
$$

従って有理式と一致します。$q=1$ では係数和10で $\binom52=10$ です。
<!-- solution-end -->

#### B3. 積の展開と補正指数

$(1+u)(1+uq)(1+uq^2)$ を展開し、有限 $q$-二項定理の $u^2$ の係数と比較せよ。補正因子 $q^{k(k-1)/2}$ を落とすと何が間違うか説明せよ。

- Level: B
- ID: COMB16-B3

<!-- solution-start -->
**詳細解答**

まず $(1+u)(1+uq)=1+(1+q)u+qu^2$ です。さらに $(1+uq^2)$ を掛けて

$$
1+(1+q+q^2)u+(q+q^2+q^3)u^2+q^3u^3
$$

を得ます。[有限 $q$-二項定理](#thm-comb16-q-binomial-theorem)の $k=2$ 項は

$$
q^{2(2-1)/2}\begin{bmatrix}3\\2\end{bmatrix}_q
=q(1+q+q^2)=q+q^2+q^3.
$$

補正を落とすと $1+q+q^2$ となり、定数項が1になる誤りが生じます。実際、二つの異なる位置 $j_1<j_2$ の最小の和は $0+1=1$ であり、$q^0$ の項はあり得ません。
<!-- solution-end -->

#### B4. 対称な係数列

語の逆順操作で $\begin{bmatrix}4\\2\end{bmatrix}_q=q^4\begin{bmatrix}4\\2\end{bmatrix}_{q^{-1}}$ を証明し、係数列を示せ。

- Level: B
- ID: COMB16-B4

<!-- solution-start -->
**詳細解答**

$E,N$ が各2個なので異種の組は $2\cdot2=4$ 個です。語を逆順にすると、元の $E$-先行-$N$ と $N$-先行-$E$ が入れ替わり、面積は $A\mapsto4-A$ となります。逆順は全単射なので[対称性](#prop-comb16-q-symmetries)から恒等式が成立します。実際

$$
\begin{bmatrix}4\\2\end{bmatrix}_q
=1+q+2q^2+q^3+q^4
$$

で、次数 $0,1,2,3,4$ の係数列は $(1,1,2,1,1)$ です。左右から同じ値になり、逆順で面積0の路と面積4の路、面積1と3の路が組になります。面積2の二路 $ENNE,NEEN$ はどちらも逆順で自身へ戻ります。
<!-- solution-end -->

#### B5. 平均面積を式で求める

$a$ 個の $E$ と $b$ 個の $N$ をもつ全路の面積の平均が $ab/2$ になることを、路の逆順で証明せよ。$a=2,b=3$ の面積総和も求めよ。

- Level: B
- ID: COMB16-B5

<!-- solution-start -->
**詳細解答**

各路 $w$ の逆順 $w^{\mathrm{rev}}$ は同じ集合の路で、[逆順による面積の補数](#prop-comb16-q-symmetries)から

$$
A(w)+A(w^{\mathrm{rev}})=ab.
$$

全路にわたり足し、逆順が全単射であることを使うと

$$
2\sum_w A(w)=\sum_w\bigl(A(w)+A(w^{\mathrm{rev}})\bigr)
=ab\binom{a+b}{a}.
$$

路の総数 $\binom{a+b}{a}$ で割れば平均 $ab/2$ です。$a=2,b=3$ では総数 $\binom52=10$、平均3、面積総和30となります。$a=0$ や $b=0$ でも唯一の路の面積0として同じ公式が成立します。
<!-- solution-end -->

### Level C：複数の重みを接続する

#### C1. 指定した格子点を通る路

$(0,0)$ から $(3,2)$ へ行く単調格子路のうち、$(1,1)$ を通るものだけの面積多項式を求めよ。指定点を通る路の個数も検算せよ。

- Level: C
- ID: COMB16-C1

<!-- solution-start -->
**詳細解答**

指定点までの前半は $(1,1)$ の路、後半は $(1,1)$ から $(3,2)$ までの相対変位 $(2,1)$ の路です。前半の $E$ は1個、後半の $N$ は1個なので、両部分をまたぐ $E$-先行-$N$ の組が必ず1個あります。よって

$$
\begin{aligned}
\sum_{\text{指定点を通る }w}q^{A(w)}
&=q^{1\cdot1}G_{1,1}(q)G_{2,1}(q)\\
&=q(1+q)(1+q+q^2)\\
&=q+2q^2+2q^3+q^4.
\end{aligned}
$$

第一式は[重み付き乗法](#prop-comb16-weight-laws)に固定の交差因子を掛けたものです。$q=1$ では $1+2+2+1=6$ 通り。無重みの計数でも前半の $\binom21=2$ 通り、後半の $\binom32=3$ 通りで $2\cdot3=6$ と一致します。
<!-- solution-end -->

#### C2. q-Vandermonde を数値で確かめる

[q-Vandermonde の定理](#thm-comb16-q-vandermonde)で $n=m=k=2$ とし、全ての $j$ の寄与を展開して $\begin{bmatrix}4\\2\end{bmatrix}_q$ と比較せよ。その後 $q=1$ でも検算せよ。

- Level: C
- ID: COMB16-C2

<!-- solution-start -->
**詳細解答**

$j$ は $0,1,2$ を走り、交差項の指数は $j(2-2+j)=j^2$ です。従って

$$
\begin{aligned}
\sum_{j=0}^2q^{j^2}
\begin{bmatrix}2\\j\end{bmatrix}_q
\begin{bmatrix}2\\2-j\end{bmatrix}_q
&=1+q(1+q)^2+q^4\\
&=1+q+2q^2+q^3+q^4\\
&=\begin{bmatrix}4\\2\end{bmatrix}_q.
\end{aligned}
$$

$j=0$ では前半に $E$ がなく、$j=2$ では前半に $E$ が全てあるため、交差面積がそれぞれ0と4です。$j=1$ では前半の $E$ と後半の $N$ が一組あり、必ず $q$ を掛けます。$q=1$ では $1+4+1=6=\binom42$ です。
<!-- solution-end -->

## 7. まとめ

重み付き計数では、対象の分割と統計の加法性を区別します。$q$-二項係数は、格子路を単に $\binom nk$ 通りと数えるだけでなく、面積ごとに分類する多項式です。

- [二方向の漸化式](#thm-comb16-q-pascal)は最初・最後の一歩で分類して得られます。
- [積公式](#thm-comb16-product-formula)は有理式表示ですが、路の定義により非負整数係数の多項式です。$q=1$ への代入はその多項式で行います。
- [有限 $q$-二項定理](#thm-comb16-q-binomial-theorem)には $q^{k(k-1)/2}$ の補正が必要です。
- [q-Vandermonde の畳み込み](#thm-comb16-q-vandermonde)は、部分路を連結したときに新たに生じる交差面積を明示します。

重みを忘れる操作 $q=1$ は、これらを通常の計数公式へ戻します。次の係数漸近の話題へ進むときは、有限な係数計算と、収束や極限を用いた議論を改めて区別します。
