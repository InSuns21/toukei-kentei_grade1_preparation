# F0-00A1B 補講：実数の上限性質・Archimedes性

この補講は、後続で何度も使う

- 「上に有界なら supremum が**存在する**」
- 「任意に大きい自然数を取れる」
- 「任意の $\varepsilon>0$ に対し $1/N<\varepsilon$ となる自然数 $N$ を取れる」

という実数の基礎体力を明示します。

F0-00A1では supremum / infimum の**意味**を定義しました。しかし

> 非空で上に有界な実数集合には、そもそも supremum が存在するのか

は別問題です。ここを暗黙にすると、後の Bolzano--Weierstrass や $1/n\to0$ の証明で突然「当然あるもの」として使うことになります。

---

## 1. 実数の上限性質

<a id="thm-f0-00a1b-lub"></a>

<!-- formal-statement-start -->
> **実数の上限性質（least-upper-bound property）**  
> 空でない集合 $A\subset\mathbb R$ が上に有界なら、上限
> $$
> \sup A
> $$
> が実数として存在する。
<!-- formal-statement-end -->

本教材では、これは **実数の完備性を表す基本性質**として採用します。実数そのものを有理数から構成する章ではないため、ここでは証明の出発点です。

重要なのは、F0-00A1の

$$
\sup A=\text{「最小の上界」}
$$

という**定義**と、今回の

$$
\text{「その最小の上界が存在する」}
$$

という**存在保証**を区別することです。

---

## 2. Archimedes性

<a id="thm-f0-00a1b-archimedean"></a>

<!-- formal-statement-start -->
> **定理（Archimedes性）**  
> 任意の実数 $x\in\mathbb R$ に対し、
> $$
> n>x
> $$
> を満たす自然数 $n\in\mathbb N$ が存在する。
<!-- formal-statement-end -->

### 証明

自然数全体 $\mathbb N$ が上に有界だと仮定します。実数の上限性質により

$$
s=\sup\mathbb N
$$

が存在します。

$s-1$ は $\mathbb N$ の上界ではありません。したがって、ある $n\in\mathbb N$ が存在して

$$
n>s-1.
$$

両辺に1を足せば

$$
n+1>s.
$$

ところが $n+1\in\mathbb N$ なので、$s$ が $\mathbb N$ の上界であることに矛盾します。

したがって $\mathbb N$ は上に有界ではなく、任意の実数 $x$ より大きい自然数が存在します。$\square$

---

## 3. $1/N$ を好きなだけ小さくできる

<a id="cor-f0-00a1b-reciprocal"></a>

<!-- formal-statement-start -->
> **系（逆数を任意に小さくできる）**  
> 任意の $\varepsilon>0$ に対し、ある自然数 $N$ が存在して
> $$
> \frac1N<\varepsilon
> $$
> となる。
<!-- formal-statement-end -->

### 証明

Archimedes性を $x=1/\varepsilon$ に適用し、

$$
N>\frac1\varepsilon
$$

となる自然数 $N$ を取ればよいです。正数なので逆数を取って

$$
\frac1N<\varepsilon.
$$

$\square$

この系が、後続で頻出する

$$
\frac1n\to0
$$

の $\varepsilon$ 論法の土台です。

---

## 4. どこで使うか

この補講の役割は短いですが重要です。

- **F0-00B**：$1/n\to0$ を示すとき、$N>1/\varepsilon$ を取る。
- **F0-00C1**：Bolzano--Weierstrass の区間縮小法で、左端点集合の supremum を取る。
- **解析全般**：「有界単調な量の極限候補」を supremum / infimum で作る。

つまり「実数だから当然」の一言に埋まりやすい存在保証を、ここで一度だけ明示して後続から参照できるようにします。

---

## 5. ミニ演習

### F0-00A1B-A01 $1/N<\varepsilon$ を実際に取る

$\varepsilon=0.003$ とする。$1/N<\varepsilon$ を満たす自然数 $N$ を1つ挙げよ。

<!-- solution-start -->
#### 解答

$$
\frac1{0.003}=333.\overline3
$$

なので、例えば $N=334$ とすれば

$$
\frac1{334}<0.003.
$$
<!-- solution-end -->

---

## 6. 次に進む

次は、収束や部分列を語る前に「点列とは何か」「部分列とは何を抜き出す操作か」を集合・写像の言葉で固定します。

**次：[F0-00B0 点列・部分列・十分大きい添字](../F0_00B0_点列_部分列_十分大きい添字/index.md)**
