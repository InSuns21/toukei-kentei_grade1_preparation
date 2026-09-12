# F0-00A1C 補講：集合族・添字集合・べき集合

<!-- definition-example-audit: strict -->

後続の選択公理・位相・測度では、

$$
\{A_i\}_{i\in I},\qquad \bigcup_{i\in I}A_i,\qquad \mathcal P(X)
$$

のような記号が突然現れます。どれも初等的ですが、**記号の意味を知らないまま読むと定義そのものが読めません**。

この補講では、集合論の深い部分へ入る前に

$$
\boxed{
\text{べき集合}
\to
\text{集合族}
\to
\text{添字集合・添字付き集合族}
\to
\text{任意和・任意交差}
}
$$

を固定します。

---

## 1. べき集合

<a id="def-f0-00a1c-power-set"></a>

<!-- formal-statement-start -->
> **定義（べき集合）**  
> 集合 $X$ の部分集合をすべて集めた集合を $X$ の **べき集合** といい、$\mathcal P(X)$ と書く。すなわち

$$
\mathcal P(X)=\{A:A\subseteq X\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1c-power-set -->
### 1.1 定義の確認

**定義の確認**

$X=\{1,2\}$ なら

$$
\mathcal P(X)
=
\{\varnothing,\{1\},\{2\},\{1,2\}\}.
$$

したがって $\mathcal P(X)$ の要素は $X$ の「点」ではなく、$X$ の部分集合です。
<!-- definition-example-end -->

---

## 2. 集合族

<a id="def-f0-00a1c-family"></a>

<!-- formal-statement-start -->
> **定義（集合族）**  
> 要素がすべて集合である集合 $\mathcal A$ を **集合族** という。特に各要素が $X$ の部分集合なら

$$
\mathcal A\subseteq\mathcal P(X)
$$

> と書ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1c-family -->
### 2.1 定義の確認

**定義の確認**

$$
\mathcal A
=
\bigl\{\{1\},\{1,2\},\{2,3\}\bigr\}
$$

は集合族です。$\mathcal A$ の要素は $1,2,3$ ではなく、$\{1\}$ や $\{1,2\}$ といった集合です。
<!-- definition-example-end -->

位相では「開集合を集めた集合族」、測度論では「可測集合を集めた集合族」が主役になります。

---

## 3. 添字集合と添字付き集合族

<a id="def-f0-00a1c-indexed-family"></a>

<!-- formal-statement-start -->
> **定義（添字集合・添字付き集合族）**  
> 集合 $I$ の各元 $i$ に集合 $A_i$ を対応させる写像

$$
i\longmapsto A_i
$$

> を考える。このとき $I$ を **添字集合**、並び $\{A_i\}_{i\in I}$ を **添字付き集合族** という。
<!-- formal-statement-end -->

「添字付き」であることは、単に異なる集合を集めたことより少し情報が多いです。異なる添字が同じ集合を指しても構いません。

<!-- definition-example-start: def-f0-00a1c-indexed-family -->
### 3.1 定義の確認

**定義の確認**

$$
I=\{1,2,3\},
\qquad
A_1=\{a\},\quad A_2=\{b\},\quad A_3=\{a\}
$$

とします。$A_1=A_3$ ですが、$1$ と $3$ は異なる添字なので、添字付き集合族としては三つの場所を持っています。
<!-- definition-example-end -->

選択公理で必要なのは、まさに「各 $i\in I$ に対して $A_i$ から一つ選ぶ」という添字付きの構造です。

---

## 4. 任意和と任意交差

<a id="def-f0-00a1c-indexed-union-intersection"></a>

<!-- formal-statement-start -->
> **定義（添字付き集合族の任意和・任意交差）**  
> 添字付き集合族 $\{A_i\}_{i\in I}$ に対して、その **任意和** を

$$
\bigcup_{i\in I}A_i
=
\{x:\exists i\in I,\ x\in A_i\}
$$

> と定める。また $I\ne\varnothing$ のとき、その **任意交差** を

$$
\bigcap_{i\in I}A_i
=
\{x:\forall i\in I,\ x\in A_i\}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1c-indexed-union-intersection -->
### 4.1 定義の確認

**定義の確認**

$$
A_n=(0,1/n)
\qquad(n\in\mathbb N)
$$

とすると

$$
\bigcup_{n\in\mathbb N}A_n=(0,1),
\qquad
\bigcap_{n\in\mathbb N}A_n=\varnothing.
$$

後者では、どんな正の実数も十分大きい $n$ に対して $1/n$ より大きくなり、すべての $A_n$ に同時には入りません。
<!-- definition-example-end -->

位相の公理に出る「任意個の開集合の和集合」はこの任意和です。一方、有限個の共通部分だけを要求する、という違いが重要になります。

---

## 5. この先で何に使うか

- **F0-00B1 位相**：$\tau\subseteq\mathcal P(X)$ という「部分集合の集合族」を扱う。
- **F0-00A2 選択公理**：$\{A_i\}_{i\in I}$ から各添字ごとに一つずつ選ぶ。
- **測度論**：$\sigma$-加法族や可測集合族で、可算和・可算交差を繰り返し使う。

「集合」「集合を要素に持つ集合」「添字で番号付けされた集合の並び」をここで分けておくと、後続の式の型が見えやすくなります。

---

## 6. 演習

### F0-00A1C-A01 集合族と添字付き集合族

- Level: A
- 目安時間: 6分
- 主題: 集合族・添字集合
- 使用技術: 定義の展開

$X=\{1,2,3\}$、$I=\{a,b\}$ とし

$$
A_a=\{1,2\},\qquad A_b=\{2,3\}
$$

とする。$\mathcal P(X)$、$\bigcup_{i\in I}A_i$、$\bigcap_{i\in I}A_i$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
\mathcal P(X)
=
\{\varnothing,\{1\},\{2\},\{3\},\{1,2\},\{1,3\},\{2,3\},\{1,2,3\}\}.
$$

また

$$
\bigcup_{i\in I}A_i=\{1,2,3\},
\qquad
\bigcap_{i\in I}A_i=\{2\}.
$$

#### 本番答案

$$
\boxed{\bigcup_{i\in I}A_i=\{1,2,3\}},
\qquad
\boxed{\bigcap_{i\in I}A_i=\{2\}},
$$

べき集合は $X$ の8個の部分集合全体。

#### 採点基準（20点）
- べき集合: 8点
- 任意和: 6点
- 任意交差: 6点
<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00A1C-A02 同じ集合が複数の添字を持つ

- Level: A
- 目安時間: 6分

$I=\{1,2,3\}$、$A_1=A_3=\{0\}$、$A_2=\{1\}$ とする。添字付き集合族としては何個の場所を持つか。また $\{A_i:i\in I\}$ を通常の集合族として重複を除いて書け。

<!-- solution-start -->
#### 詳細解答
添字付き集合族は $1,2,3$ の三つの添字を持つので三つの場所を持つ。一方、値として現れる集合だけを通常の集合として集めると重複は消え
$$
\{A_i:i\in I\}=\bigl\{\{0\},\{1\}\bigr\}.
$$

#### 本番答案
添字は3個。通常の集合族としては
$$
\boxed{\{\{0\},\{1\}\}}.
$$
<!-- solution-end -->

### F0-00A1C-A03 任意和・任意交差を量化記号で読む

- Level: A
- 目安時間: 7分

添字付き集合族 $\{A_i\}_{i\in I}$ について、
$$
x\in\bigcup_{i\in I}A_i,
\qquad
x\in\bigcap_{i\in I}A_i
$$
をそれぞれ $\exists,\forall$ を使って書き換えよ。

<!-- solution-start -->
#### 詳細解答
任意和は「少なくとも一つの集合に入る」、任意交差は「全ての集合に入る」なので
$$
x\in\bigcup_{i\in I}A_i
\iff
\exists i\in I:\ x\in A_i,
$$
$$
x\in\bigcap_{i\in I}A_i
\iff
\forall i\in I:\ x\in A_i.
$$

#### 本番答案
上式の通り。任意和は $\exists$、任意交差は $\forall$ に対応する。
<!-- solution-end -->

### F0-00A1C-B01 任意和と共通部分の分配法則

- Level: B
- 目安時間: 12分

集合 $B$ と添字付き集合族 $\{A_i\}_{i\in I}$ に対して
$$
B\cap\left(\bigcup_{i\in I}A_i\right)
=
\bigcup_{i\in I}(B\cap A_i)
$$
を要素による同値変形で証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x$ について
$$
\begin{aligned}
x\in B\cap\bigcup_iA_i
&\iff x\in B\ \text{かつ}\ \exists i:\ x\in A_i\\
&\iff \exists i:\ (x\in B\ \text{かつ}\ x\in A_i)\\
&\iff \exists i:\ x\in B\cap A_i\\
&\iff x\in\bigcup_i(B\cap A_i).
\end{aligned}
$$
従って両集合は等しい。

#### 本番答案
任意の $x$ に対して上の所属条件が同値なので等しい。
<!-- solution-end -->

### F0-00A1C-B02 任意族のDe Morgan則

- Level: B
- 目安時間: 12分

全体集合 $X$ の部分集合族 $\{A_i\}_{i\in I}$ に対して
$$
X\setminus\bigcup_{i\in I}A_i
=
\bigcap_{i\in I}(X\setminus A_i)
$$
を証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x\in X$ について
$$
\begin{aligned}
x\notin\bigcup_iA_i
&\iff \neg(\exists i:\ x\in A_i)\\
&\iff \forall i:\ x\notin A_i\\
&\iff x\in\bigcap_i(X\setminus A_i).
\end{aligned}
$$
量化記号の否定 $\neg\exists=\forall\neg$ が核心である。

#### 本番答案
所属条件を量化記号に直すと
$$
x\notin\bigcup_iA_i
\iff \forall i,\ x\notin A_i,
$$
よって主張が従う。
<!-- solution-end -->

---

<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1C-A04 縮小する区間族の和と交差

- Level: A
- 目安時間: 8分

$A_n=(-1/n,1/n)$ $(n\in\mathbb N)$ とする。次を求めよ。
$$
\bigcup_{n\in\mathbb N}A_n,\qquad
\bigcap_{n\in\mathbb N}A_n.
$$

<!-- solution-start -->
#### 詳細解答
$A_1=(-1,1)$ が全ての $A_n$ を含むので任意和は $(-1,1)$。0は全ての $A_n$ に入る。一方 $x\ne0$ なら十分大きい $n$ で $1/n<|x|$ となり $x\notin A_n$。従って任意交差は $\{0\}$。

#### 本番答案
$$
\boxed{\bigcup_nA_n=(-1,1),\qquad \bigcap_nA_n=\{0\}}.
$$
<!-- solution-end -->

### F0-00A1C-B03 和集合と任意交差の分配

- Level: B
- 目安時間: 12分

$I\ne\varnothing$ とし、$B\subseteq X$ と集合族 $\{A_i\}_{i\in I}$ に対して
$$
B\cup\left(\bigcap_{i\in I}A_i\right)
=
\bigcap_{i\in I}(B\cup A_i)
$$
を要素による論理式から証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x\in X$ について
$$
\begin{aligned}
x\in B\cup\bigcap_iA_i
&\iff (x\in B)\ \text{または}\ (\forall i,\ x\in A_i)\\
&\iff \forall i,\ ((x\in B)\ \text{または}\ x\in A_i)\\
&\iff x\in\bigcap_i(B\cup A_i).
\end{aligned}
$$
第2の同値では「$x\in B$」が添字 $i$ に依存しないことを使っている。

#### 本番答案
所属条件を命題論理へ直せば
$$
P\lor(\forall i\,Q_i)\iff\forall i(P\lor Q_i)
$$
となるため等しい。
<!-- solution-end -->

### F0-00A1C-C01 「無限回」と「最終的に」を集合族で表す

- Level: C
- 目安時間: 18分

集合列 $(A_n)$ に対して
$$
L:=\bigcap_{N=1}^{\infty}\bigcup_{n\ge N}A_n,
\qquad
E:=\bigcup_{N=1}^{\infty}\bigcap_{n\ge N}A_n
$$
と置く。点 $x$ について、$x\in L$ と $x\in E$ がそれぞれ何を意味するか、量化記号で展開して説明せよ。

<!-- solution-start -->
#### 詳細解答
$x\in L$ は
$$
\forall N\ \exists n\ge N:\ x\in A_n
$$
と同値である。どこまで先へ進んでも再び $A_n$ に入る添字があるので、「$x$ が $A_n$ に無限回属する」という意味。

$x\in E$ は
$$
\exists N\ \forall n\ge N:\ x\in A_n
$$
と同値である。ある番号以降は常に $A_n$ に属するので、「最終的にずっと属する」という意味。

#### 本番答案
$$
x\in L\iff \forall N\exists n\ge N:x\in A_n,
$$
$$
x\in E\iff \exists N\forall n\ge N:x\in A_n.
$$
<!-- solution-end -->

---

## 7. 次に進む

標準ルートでは、実数の基礎と集合族の記法を持って点列へ進みます。選択公理まで追う場合は、その前に順序・全順序・整列可能性を整備します。

- **標準：[F0-00B0 点列・部分列・十分大きい添字](../F0_00B0_点列_部分列_十分大きい添字/index.md)**
- **集合論の補講：[F0-00A1D 順序・全順序・最小最大・整列](../F0_00A1D_順序_全順序_最小最大_整列/index.md)**
