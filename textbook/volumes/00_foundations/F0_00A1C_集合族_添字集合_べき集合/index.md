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

## 7. 次に進む

標準ルートでは、実数の基礎と集合族の記法を持って点列へ進みます。選択公理まで追う場合は、その前に順序・全順序・整列可能性を整備します。

- **標準：[F0-00B0 点列・部分列・十分大きい添字](../F0_00B0_点列_部分列_十分大きい添字/index.md)**
- **集合論の補講：[F0-00A1D 順序・全順序・最小最大・整列](../F0_00A1D_順序_全順序_最小最大_整列/index.md)**
