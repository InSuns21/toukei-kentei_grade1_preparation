# F0-00A1B 補講：実数の上限性質・Archimedes性

この補講では、後続で何度も使う二つの事実を明示します。

- 空でなく上に有界な実数集合には上限が存在する。
- 任意の $\varepsilon>0$ に対して $1/N<\varepsilon$ となる自然数 $N$ を取れる。

[F0-00A1](../F0_00A1_上界_下界_supremum_infimum/index.md) では supremum / infimum の**意味**を定義しました。しかし、

> 非空で上に有界な実数集合には、そもそも supremum が存在するのか

は別問題です。ここを暗黙にすると、後の Bolzano--Weierstrass や $1/n\to0$ の証明で突然「当然あるもの」として使うことになります。

---

## 1. 実数の上限性質

<a id="thm-f0-00a1b-lub"></a>

<!-- formal-statement-start -->
> **定理（実数の上限性質 / least-upper-bound property）**  
> 空でない集合 $A\subseteq\mathbb R$ が上に有界なら、上限

$$
\sup A
$$

> が実数として存在する。
<!-- formal-statement-end -->

F0-00A1の

$$
\sup A=\text{「$A$ の最小の上界」}
$$

は**上限という語の定義**です。これに対し、ここで述べたのは

$$
\text{「その最小の上界が実際に存在する」}
$$

という**存在保証**です。

本教材では実数そのものを有理数から構成しないため、この性質を実数に対する基本的な存在性質として用います。

---

## 2. Archimedes性

<a id="thm-f0-00a1b-archimedean"></a>

<!-- formal-statement-start -->
> **定理（Archimedes性）**  
> 任意の実数 $x\in\mathbb R$ に対し、

$$
n>x
$$

> を満たす自然数 $n\in\mathbb N$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

自然数全体が上に有界だと仮定し、その上限 $s$ を取ります。すると $s-1$ は上界ではないため $s-1<n$ となる自然数 $n$ があり、$n+1>s$ となって $s$ が上界であることに矛盾します。

<!-- proof-start -->
### 証明

自然数全体 $\mathbb N$ が上に有界だと仮定します。[実数の上限性質](#thm-f0-00a1b-lub)により

$$
s=\sup\mathbb N
$$

が存在します。

$s-1$ は $\mathbb N$ の上界ではありません。もし上界なら、$s$ より小さい上界が存在して $s$ の最小性に反するからです。したがって、ある $n\in\mathbb N$ が存在して

$$
n>s-1.
$$

両辺に1を足すと

$$
n+1>s.
$$

ところが $n+1\in\mathbb N$ なので、$s$ が $\mathbb N$ の上界であることに矛盾します。

したがって $\mathbb N$ は上に有界ではなく、任意の実数 $x$ より大きい自然数が存在します。$\square$
<!-- proof-end -->

---

## 3. $1/N$ を好きなだけ小さくできる

<a id="cor-f0-00a1b-reciprocal"></a>

<!-- formal-statement-start -->
> **系（逆数を任意に小さくできる）**  
> 任意の $\varepsilon>0$ に対し、ある自然数 $N$ が存在して

$$
\frac1N<\varepsilon
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$1/\varepsilon$ より大きい自然数をArchimedes性で取って逆数を取ります。

<!-- proof-start -->
### 証明

[Archimedes性](#thm-f0-00a1b-archimedean)を $x=1/\varepsilon$ に適用し、

$$
N>\frac1\varepsilon
$$

となる自然数 $N$ を取ります。両辺は正なので逆数を取れば

$$
\frac1N<\varepsilon.
$$

よって主張が従います。$\square$
<!-- proof-end -->

この系が、後続で頻出する

$$
\frac1n\to0
$$

の $\varepsilon$ 論法の土台です。

---

## 4. 後続でどこに効くか

- **F0-00B**：$1/n\to0$ を示すとき、$N>1/\varepsilon$ を取る。
- **F0-00C1**：Bolzano--Weierstrass の区間縮小法で、左端点集合の supremum を取る。
- **解析全般**：有界な量の極限候補を supremum / infimum から作る。

「実数だから当然」に埋まりやすい存在保証を、ここで一度だけ正式に置いて後続から参照できるようにします。

---

## 5. 演習

### F0-00A1B-A01 $1/N<\varepsilon$ を実際に取る

- Level: A
- 目安時間: 5分
- 主題: Archimedes性
- 使用技術: 逆数評価

$\varepsilon=0.003$ とする。$1/N<\varepsilon$ を満たす自然数 $N$ を1つ挙げ、その不等式を確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\frac1{0.003}=333.\overline3
$$

なので、例えば $N=334$ と取れます。このとき

$$
334>\frac1{0.003}
$$

であり、正数の逆数を取って

$$
\frac1{334}<0.003.
$$

##### 本番答案

$1/0.003=333.\overline3$ より $N=334$ と取れば

$$
\boxed{\frac1{334}<0.003}.
$$

##### 採点基準

- $N>1/\varepsilon$ を満たす自然数を取る：10点
- 逆数を取って結論を確認する：10点

<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00A1B-A02 $n\varepsilon$ を任意に大きくする

- Level: A
- 目安時間: 7分

$\varepsilon>0$、$M>0$ とする。Archimedes性を用いて、ある $N\in\mathbb N$ が存在し
$$
N\varepsilon>M
$$
となることを示せ。

<!-- solution-start -->
#### 詳細解答
$M/\varepsilon$ は実数である。Archimedes性から
$$
N>\frac{M}{\varepsilon}
$$
となる自然数 $N$ が存在する。$\varepsilon>0$ を掛ければ $N\varepsilon>M$ となる。

#### 本番答案
Archimedes性を $M/\varepsilon$ に適用して $N>M/\varepsilon$ を取ればよい。
<!-- solution-end -->

### F0-00A1B-A03 $1/n$ の尾部を誤差内に入れる

- Level: A
- 目安時間: 7分

任意の $\varepsilon>0$ に対して、十分大きい全ての $n$ で
$$
\frac1n<\varepsilon
$$
となることを量化記号を省略せず示せ。

<!-- solution-start -->
#### 詳細解答
Archimedes性から $N>1/\varepsilon$ となる自然数 $N$ を取れる。$n\ge N$ なら
$$
n\ge N>\frac1\varepsilon.
$$
正数の逆数を取ると
$$
0<\frac1n\le\frac1N<\varepsilon.
$$
従って
$$
\forall\varepsilon>0\ \exists N\in\mathbb N\ \forall n\ge N:\ \frac1n<\varepsilon.
$$

#### 本番答案
$N>1/\varepsilon$ を取る。$n\ge N$ なら $1/n\le1/N<\varepsilon$。
<!-- solution-end -->

### F0-00A1B-B01 自然数全体は上に有界でない

- Level: B
- 目安時間: 10分

実数の上限性質を仮定し、$\mathbb N$ が上に有界であると仮定すると矛盾することを、$s=\sup\mathbb N$ を使って再構成せよ。

<!-- solution-start -->
#### 詳細解答
$\mathbb N$ が上に有界なら上限性質により $s=\sup\mathbb N$ が存在する。$s-1<s$ なので $s-1$ は最小上界 $s$ より小さく、上界ではない。従ってある $n\in\mathbb N$ が $n>s-1$ を満たす。すると $n+1>s$ だが $n+1\in\mathbb N$ であり、$s$ が上界であることに反する。

#### 本番答案
$s=\sup\mathbb N$ とすると $s-1$ は上界でないため $n>s-1$ となる $n\in\mathbb N$ がある。よって $n+1>s$。しかし $n+1\in\mathbb N$ なので矛盾。
<!-- solution-end -->

### F0-00A1B-B02 下限版の存在保証

- Level: B
- 目安時間: 12分

実数の上限性質を用いて、空でなく下に有界な $A\subseteq\mathbb R$ には $\inf A$ が存在することを示せ。$-A:=\{-a:a\in A\}$ を使ってよい。

<!-- solution-start -->
#### 詳細解答
$A$ が下に有界なら、ある $m$ が全ての $a\in A$ に対して $m\le a$ を満たす。従って $-a\le-m$ なので $-A$ は上に有界であり、空でもない。上限性質から
$$
s=\sup(-A)
$$
が存在する。

$-s$ は $A$ の下界である。実際 $-a\le s$ から $a\ge-s$。さらに $\ell>-s$ なら $-\ell<s$ なので $-\ell$ は $-A$ の上界ではない。よってある $a\in A$ で $-a>-\ell$、すなわち $a<\ell$。従って $\ell$ は下界ではない。よって $-s$ が最大の下界である。

#### 本番答案
$-A$ は空でなく上に有界なので $s=\sup(-A)$ が存在する。すると $-s$ は $A$ の下界で、これより大きい数は下界になれない。従って
$$
\boxed{\inf A=-\sup(-A)}.
$$
<!-- solution-end -->

---

## 6. 次に進む

次は、位相や選択公理に現れる記号を読むため、**べき集合・集合族・添字集合・任意和/任意交差**を正式に定義します。

**次：[F0-00A1C 集合族・添字集合・べき集合](../F0_00A1C_集合族_添字集合_べき集合/index.md)**
