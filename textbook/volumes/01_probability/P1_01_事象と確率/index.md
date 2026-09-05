# P1-01 事象と確率

確率計算では、式を選ぶ前に「何を一つの結果とし、どの結果の集合を数えるか」を決めます。本章では、事象を集合として表し、確率公理から基本公式を導き、包除原理・数え上げ・事象列の極限まで扱います。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 「少なくとも一つ」「ちょうど一つ」「高々一つ」を集合として書く。
- 有限等確率モデルで、数え上げと確率計算を分けて立式する。
- 確率公理から補集合公式、差の公式、単調性、加法公式を導く。
- 三事象の包除原理で、重複が何回数えられるか説明する。
- 増加・減少事象列に確率の連続性を適用する。
- 上極限事象・下極限事象を「無限回」「ある時点以降ずっと」と読み替える。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 確率の基本性質 | 確率公理、補集合、差、単調性、加法公式 |
| 確率の計算 | 有限等確率モデル、数え上げ |
| 包除原理 | 二事象・三事象、ちょうど何個起こるか |
| 事象列 | 増加列・減少列、確率の連続性、上極限・下極限 |

## 前提知識チェック

1. F0-00: 集合、和・積、基本的な数列と極限を使う。
2. 「すべて」と「少なくとも一つ」の否定を書ける。
3. 有限和を計算できる。

---

## 1. まず有限標本空間で考える

公平な六面体さいころを1回投げるとします。

<a id="def-p1-01-sample-space"></a>

<!-- formal-statement-start -->
> **定義（標本空間）**  
> 確率的な試行で起こり得る結果全体の集合を **標本空間** といい、通常 $\Omega$ と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-p1-01-sample-space -->
**定義の確認**  
公平な六面体さいころを1回投げる試行では、起こり得る結果全体は $\Omega=\{1,2,3,4,5,6\}$ です。偶数事象 $\{2,4,6\}$ は標本空間そのものではなく、その部分集合です。
<!-- definition-example-end -->

この例では

$$
\Omega=\{1,2,3,4,5,6\}
$$

です。

「偶数が出る」という事象を

$$
A=\{2,4,6\}
$$

とすると、公平なさいころでは各結果の確率が $1/6$ なので

$$
P(A)=\frac{|A|}{|\Omega|}
=\frac36
=\frac12
$$

です。

この例で重要なのは、最初に「結果全体 $\Omega$」と「数えたい結果の集合 $A$」を決め、その後で確率へ変換していることです。

### 1.1 有限標本空間の一般形

有限集合 $\Omega$ の各標本点 $\omega$ に重み

$$
p(\omega)\geq0,
\qquad
\sum_{\omega\in\Omega}p(\omega)=1
$$

を与えると、事象 $A\subset\Omega$ の確率を

$$
P(A)=\sum_{\omega\in A}p(\omega)
$$

で定められます。

各標本点が同じ確率 $1/|\Omega|$ をもつ場合は

$$
\boxed{
P(A)=\frac{|A|}{|\Omega|}
}
$$

です。

有限集団から1個体を**一様無作為抽出**するとは、各個体が選ばれる確率が等しい抽出をいいます。この仮定があるとき、該当人数の比を確率として使えます。

---

## 2. 事象の集合演算

標本空間 $\Omega$ の事象 $A,B$ に対して、次の演算を使います。

- $A\cup B$：$A$ または $B$ の少なくとも一方が起こる。
- $A\cap B$：$A$ と $B$ がともに起こる。
- $A^c$：$A$ が起こらない。
- $A\setminus B=A\cap B^c$：$A$ は起こるが $B$ は起こらない。
- $A\triangle B=(A\setminus B)\cup(B\setminus A)$：ちょうど一方が起こる。

たとえば三事象 $A,B,C$ のうち「ちょうど一つが起こる」事象は

$$
(A\cap B^c\cap C^c)
\cup
(A^c\cap B\cap C^c)
\cup
(A^c\cap B^c\cap C)
$$

です。三つの部分は互いに排反なので、確率は足し合わせられます。

### 2.1 排反

$$
A\cap B=\varnothing
$$

のとき、$A,B$ は**排反**であるといいます。

排反は「同時に起こらない」という集合の関係です。独立とは別の概念です。

---

## 3. 一般の確率空間と確率公理

無限個の結果を同じ枠組みで扱うときは、確率を割り当てる事象の集まりを $\mathcal F$ と書きます。$\mathcal F$ は次を満たすものとします。

1. $\Omega\in\mathcal F$。
2. $A\in\mathcal F$ なら $A^c\in\mathcal F$。
3. $A_1,A_2,\ldots\in\mathcal F$ なら $\bigcup_{n=1}^{\infty}A_n\in\mathcal F$。

このような事象族を $\sigma$-加法族といいます。一般には、**事象とは $\mathcal F$ に属する $\Omega$ の部分集合**です。有限標本空間では、特に断らない限り $\mathcal F=2^\Omega$ とします。

写像

$$
P:\mathcal F\to[0,1]
$$

が確率であるための基本条件は次の三つです。

1. **正規化**
   $$
   P(\Omega)=1.
   $$

2. **非負性**
   $$
   P(A)\geq0.
   $$

3. **可算加法性**  
   互いに排反な $A_1,A_2,\ldots$ に対して
   $$
   P\left(\bigcup_{n=1}^{\infty}A_n\right)
   =
   \sum_{n=1}^{\infty}P(A_n).
   $$

以下の公式は、この三条件から導きます。

---

## 4. 確率公理から基本公式を導く

### 4.1 空事象と有限加法性

まず

$$
\Omega=\Omega\sqcup\varnothing\sqcup\varnothing\sqcup\cdots
$$

へ可算加法性を使うと

$$
1
=
1+P(\varnothing)+P(\varnothing)+\cdots.
$$

各項は非負なので

$$
\boxed{P(\varnothing)=0}
$$

です。

次に排反な $A,B$ について、列

$$
A,\ B,\ \varnothing,\ \varnothing,\ldots
$$

へ可算加法性を使えば

$$
\boxed{
P(A\cup B)=P(A)+P(B)
}
$$

を得ます。これが有限加法性です。

### 4.2 補集合

$$
\Omega=A\sqcup A^c
$$

なので

$$
1=P(A)+P(A^c).
$$

したがって

$$
\boxed{
P(A^c)=1-P(A)
}
$$

です。

### 4.3 差の確率

集合 $A$ は

$$
A=(A\setminus B)\sqcup(A\cap B)
$$

と排反に分けられるので

$$
P(A)=P(A\setminus B)+P(A\cap B).
$$

よって

$$
\boxed{
P(A\setminus B)=P(A)-P(A\cap B)
}
$$

です。

### 4.4 単調性

$A\subset B$ なら

$$
B=A\sqcup(B\setminus A).
$$

したがって

$$
P(B)=P(A)+P(B\setminus A)\geq P(A)
$$

であり、

$$
\boxed{
A\subset B\Longrightarrow P(A)\leq P(B)
}
$$

を得ます。

---

## 5. 加法公式と包除の考え方

### 5.1 二事象

$A\cup B$ を

$$
A\cup B=A\sqcup(B\setminus A)
$$

と分けると

$$
P(A\cup B)
=
P(A)+P(B\setminus A).
$$

差の公式から

$$
P(B\setminus A)=P(B)-P(A\cap B)
$$

なので

$$
\boxed{
P(A\cup B)
=
P(A)+P(B)-P(A\cap B)
}
$$

です。

これは、$P(A)+P(B)$ では $A\cap B$ が二回数えられているため、一回引く公式です。

### 5.2 三事象

二事象の公式を $A\cup B$ と $C$ に使うと

$$
P(A\cup B\cup C)
=
P(A\cup B)+P(C)-P((A\cup B)\cap C).
$$

分配法則より

$$
(A\cup B)\cap C
=
(A\cap C)\cup(B\cap C)
$$

です。ここへもう一度二事象の公式を使うと

$$
P((A\cup B)\cap C)
=
P(A\cap C)+P(B\cap C)-P(A\cap B\cap C).
$$

さらに

$$
P(A\cup B)
=
P(A)+P(B)-P(A\cap B)
$$

を代入すれば

$$
\boxed{
\begin{aligned}
P(A\cup B\cup C)
&=P(A)+P(B)+P(C)\\
&\quad-P(A\cap B)-P(B\cap C)-P(C\cap A)\\
&\quad+P(A\cap B\cap C)
\end{aligned}
}
$$

を得ます。

三重共通部分は最初に3回足され、二重共通部分を3個引く操作でさらに3回引かれるので、その時点で0回です。最後に1回足し戻して、最終的に1回数えます。

<a id="thm-p1-01-inclusion-exclusion"></a>

<!-- formal-statement-start -->
> **定理（包除原理：二事象・三事象）**  
> 任意の事象 $A,B,C$ に対して次が成り立つ。

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

$$
\begin{aligned}
P(A\cup B\cup C)
&=P(A)+P(B)+P(C)\\
&\quad-P(A\cap B)-P(B\cap C)-P(C\cap A)\\
&\quad+P(A\cap B\cap C).
\end{aligned}
$$

> すなわち、重複して数えた共通部分を交互に引き戻し・足し戻す。
<!-- formal-statement-end -->

---

## 6. 確率の連続性

### 6.1 下からの連続性

事象列が

$$
A_1\subset A_2\subset\cdots
$$

を満たすとします。

$$
B_1=A_1,
\qquad
B_n=A_n\setminus A_{n-1}\quad(n\geq2)
$$

とおくと、$B_1,B_2,\ldots$ は互いに排反で

$$
A_n=\bigsqcup_{k=1}^nB_k,
\qquad
\bigcup_{n=1}^{\infty}A_n
=
\bigsqcup_{k=1}^{\infty}B_k
$$

です。

したがって

$$
P(A_n)=\sum_{k=1}^nP(B_k)
$$

であり、

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\sum_{k=1}^{\infty}P(B_k).
$$

右辺は左の有限和の極限なので

$$
\boxed{
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\lim_{n\to\infty}P(A_n)
}
$$

です。

### 6.2 上からの連続性

$$
A_1\supset A_2\supset\cdots
$$

とします。このとき

$$
A_1^c\subset A_2^c\subset\cdots
$$

です。De Morganの法則から

$$
\bigcup_{n=1}^{\infty}A_n^c
=
\left(
\bigcap_{n=1}^{\infty}A_n
\right)^c.
$$

下からの連続性と補集合公式より

$$
\begin{aligned}
1-
P\left(\bigcap_{n=1}^{\infty}A_n\right)
&=
P\left(
\bigcup_{n=1}^{\infty}A_n^c
\right)\\
&=
\lim_{n\to\infty}P(A_n^c)\\
&=
\lim_{n\to\infty}\{1-P(A_n)\}.
\end{aligned}
$$

両辺を1から引けば

$$
\boxed{
P\left(\bigcap_{n=1}^{\infty}A_n\right)
=
\lim_{n\to\infty}P(A_n)
}
$$

です。

---

## 7. 上極限事象と下極限事象

<a id="def-p1-01-event-limsup-liminf"></a>

<!-- formal-statement-start -->
> **定義（上極限事象・下極限事象）**  
> 事象列 $A_1,A_2,\ldots$ に対し

$$
\limsup_{n\to\infty}A_n
=\bigcap_{m=1}^{\infty}\bigcup_{n=m}^{\infty}A_n,
\qquad
\liminf_{n\to\infty}A_n
=\bigcup_{m=1}^{\infty}\bigcap_{n=m}^{\infty}A_n
$$

> をそれぞれ **上極限事象**、**下極限事象** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-p1-01-event-limsup-liminf -->
**定義の確認**  
$\Omega=\{1,2\}$ とし、奇数 $n$ では $A_n=\{1\}$、偶数 $n$ では $A_n=\{1,2\}$ とします。1は十分後も常に属するので $1\in\liminf A_n$、2は偶数番目に無限回だけ属するので $2\in\limsup A_n$ ですが $2\notin\liminf A_n$ です。したがって $\liminf A_n=\{1\}$、$\limsup A_n=\{1,2\}$ です。
<!-- definition-example-end -->

上極限事象に標本点 $\omega$ が属するとは、どれだけ後ろから見始めても、その後に $A_n$ が少なくとも一度は起こることです。したがって

$$
\omega\in\limsup A_n
$$

は「$\omega$ では $A_n$ が無限回起こる」という意味です。

一方、下極限事象は

これは、ある $m$ 以降の全ての $A_n$ に所属する標本点の集合なので、「ある時点以降ずっと $A_n$ が起こる」事象です。

常に

$$
\boxed{
\liminf A_n\subset\limsup A_n
}
$$

です。

---

## 8. 典型例

### 8.1 三事象の重複分類

$$
\begin{aligned}
&P(A)=0.50,\quad P(B)=0.40,\quad P(C)=0.30,\\
&P(A\cap B)=0.20,\quad P(B\cap C)=0.15,\quad P(C\cap A)=0.10,\\
&P(A\cap B\cap C)=0.05
\end{aligned}
$$

とします。

包除原理から

$$
P(A\cup B\cup C)
=
0.50+0.40+0.30-0.20-0.15-0.10+0.05
=
0.80.
$$

$A$ だけが起こる確率は

$$
P(A)-P(A\cap B)-P(A\cap C)+P(A\cap B\cap C)
$$

なので

$$
0.50-0.20-0.10+0.05=0.25.
$$

同様に、$B$ だけは $0.10$、$C$ だけは $0.10$ です。したがって、ちょうど一つだけ起こる確率は

$$
0.25+0.10+0.10=0.45.
$$

### 8.2 余事象で数える

公平な六面体さいころを4回投げ、$6^4$ 個の順序付き結果を全て等確率とします。

「少なくとも一度6が出る」の余事象は「一度も6が出ない」です。全結果は $6^4$ 通り、6が一度も出ない結果は $5^4$ 通りなので

$$
P(\text{少なくとも一度6})
=
1-\frac{5^4}{6^4}.
$$

### 8.3 増加事象列

$\Omega=[0,1]$ とし、区間 $[a,b]\subset[0,1]$ に

$$
P([a,b])=b-a
$$

を与える確率を考えます。

$$
A_n=[1/n,1]
$$

とすると

$$
A_1\subset A_2\subset\cdots,
\qquad
\bigcup_{n=1}^{\infty}A_n=(0,1].
$$

下からの連続性より

$$
P((0,1])
=
\lim_{n\to\infty}P(A_n)
=
\lim_{n\to\infty}\left(1-\frac1n\right)
=
1.
$$

$0$ は $(0,1]$ に含まれませんが、

$$
P(\{0\})=P([0,0])=0
$$

なので、$(0,1]$ の確率は1です。

---

## 9. 本番での解法手順

1. **基本事象を定義する。** 日本語をいきなり公式へ入れない。
2. **集合として書く。** 「少なくとも」は和、「ともに」は積、「起こらない」は補集合へ直す。
3. **等確率モデルなら標本空間を数える。** 順序を区別するか、重複を許すかを先に決める。
4. **重複があれば包除原理を検討する。** 各領域が最終的に一回だけ数えられるか確認する。
5. **事象列なら増加・減少を確認する。** 単調なら確率の連続性を使う。
6. **最後に確率が $[0,1]$ に入るか検算する。**

---

## 10. 演習

### Level A

#### P1-A01 集合恒等式

- level: A
- minutes: 6
- topics: 集合演算

標本空間を $\Omega$ とし、$A,B\subset\Omega$ を事象とする。次の集合恒等式を、任意の $\omega\in\Omega$ の所属関係から示せ。

1. $(A\cup B)^c=A^c\cap B^c$
2. $A\setminus B=A\cap B^c$

<!-- solution-start -->

##### 解答

###### 詳細解答

任意の $\omega\in\Omega$ を固定します。

1つ目について

$$
\begin{aligned}
\omega\in(A\cup B)^c
&\Longleftrightarrow
\omega\notin A\cup B\\
&\Longleftrightarrow
\omega\notin A\ \text{かつ}\ \omega\notin B\\
&\Longleftrightarrow
\omega\in A^c\cap B^c.
\end{aligned}
$$

任意の $\omega$ について所属が一致するので

$$
(A\cup B)^c=A^c\cap B^c.
$$

2つ目も同様に

$$
\begin{aligned}
\omega\in A\setminus B
&\Longleftrightarrow
\omega\in A\ \text{かつ}\ \omega\notin B\\
&\Longleftrightarrow
\omega\in A\cap B^c.
\end{aligned}
$$

したがって

$$
A\setminus B=A\cap B^c.
$$

###### 本番答案

任意の $\omega\in\Omega$ に対し

$$
\omega\in(A\cup B)^c
\Longleftrightarrow
\omega\notin A,\ \omega\notin B
\Longleftrightarrow
\omega\in A^c\cap B^c.
$$

また

$$
\omega\in A\setminus B
\Longleftrightarrow
\omega\in A,\ \omega\notin B
\Longleftrightarrow
\omega\in A\cap B^c.
$$

任意の元で所属が一致するので、両恒等式が成り立つ。

###### 採点基準

1つ目の所属関係8点、2つ目の所属関係8点、任意の元から集合の等しさを結論する部分4点。合計20点。

<!-- solution-end -->

#### P1-A02 二事象の加法公式

- level: A
- minutes: 6
- topics: 加法公式

標本空間上の二事象 $A,B$ について

$$
P(A)=0.6,\qquad
P(B)=0.5,\qquad
P(A\cap B)=0.3
$$

とする。$P(A\cup B)$ と $P(A\triangle B)$ を求めよ。ただし

$$
A\triangle B=(A\setminus B)\cup(B\setminus A)
$$

とする。

<!-- solution-start -->

##### 解答

###### 詳細解答

加法公式より

$$
\begin{aligned}
P(A\cup B)
&=P(A)+P(B)-P(A\cap B)\\
&=0.6+0.5-0.3\\
&=0.8.
\end{aligned}
$$

また $A\cap B\subset A\cup B$ で

$$
A\triangle B=(A\cup B)\setminus(A\cap B)
$$

なので

$$
\begin{aligned}
P(A\triangle B)
&=P(A\cup B)-P(A\cap B)\\
&=0.8-0.3\\
&=0.5.
\end{aligned}
$$

###### 本番答案

加法公式から

$$
P(A\cup B)=0.6+0.5-0.3=0.8.
$$

また $A\triangle B=(A\cup B)\setminus(A\cap B)$ より

$$
P(A\triangle B)=0.8-0.3=0.5.
$$

###### 採点基準

加法公式の立式6点、$P(A\cup B)$ の計算4点、対称差の集合関係4点、$P(A\triangle B)$ の立式・計算6点。合計20点。

<!-- solution-end -->

#### P1-A03 確率の連続性

- level: A
- minutes: 7
- topics: 増加事象列

事象列 $A_1,A_2,\ldots$ が

$$
A_1\subset A_2\subset\cdots
$$

を満たし、

$$
A=\bigcup_{n=1}^{\infty}A_n
$$

とする。適用する定理名と仮定を明記し、

$$
P(A_n)\to P(A)
$$

を示せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

与えられた仮定は

$$
A_n\subset A_{n+1}
$$

と

$$
A=\bigcup_{n=1}^{\infty}A_n
$$

です。

したがって、確率の**下からの連続性**

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\lim_{n\to\infty}P(A_n)
$$

を適用できます。

左辺は $P(A)$ なので

$$
\boxed{
P(A)=\lim_{n\to\infty}P(A_n)
}
$$

です。

###### 本番答案

$A_n\subset A_{n+1}$ かつ $A=\bigcup_{n=1}^{\infty}A_n$ である。よって下からの連続性より

$$
P(A)
=
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\lim_{n\to\infty}P(A_n).
$$

###### 採点基準

増加列の確認4点、和事象が $A$ であること4点、下からの連続性の明記4点、適用式と結論8点。合計20点。

<!-- solution-end -->

### Level B

#### P1-B01 ちょうど一つ

- level: B
- minutes: 12
- topics: 三事象, 包除原理

標本空間上の三事象 $A,B,C$ を考える。$A,B,C$ のうち**ちょうど一つ**が起こる確率を、

$$
P(A),P(B),P(C),
P(A\cap B),P(B\cap C),P(C\cap A),
P(A\cap B\cap C)
$$

を使って表せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

ちょうど一つが起こる事象を $E$ とします。

$P(A)+P(B)+P(C)$ では、ちょうど一つの領域は1回、ちょうど二つの領域は2回、三つ全ての領域は3回数えられます。

二重共通部分の確率を

$$
2\{P(A\cap B)+P(B\cap C)+P(C\cap A)\}
$$

だけ引くと、ちょうど二つの領域の係数は

$$
2-2=0
$$

になります。

三重共通部分は、三つの二重共通部分全てに含まれるので、この段階で

$$
3-2\cdot3=-3
$$

回です。したがって三重共通部分を3回足し戻せば係数は0になります。

よって

$$
\boxed{
\begin{aligned}
P(E)
&=P(A)+P(B)+P(C)\\
&\quad
-2\{P(A\cap B)+P(B\cap C)+P(C\cap A)\}\\
&\quad
+3P(A\cap B\cap C)
\end{aligned}
}
$$

です。

###### 本番答案

ちょうど一つが起こる事象を $E$ とする。所属する事象数ごとの係数を合わせると

$$
\begin{aligned}
P(E)
&=P(A)+P(B)+P(C)\\
&\quad-2\{P(A\cap B)+P(B\cap C)+P(C\cap A)\}\\
&\quad+3P(A\cap B\cap C).
\end{aligned}
$$

実際、所属数1の点の係数は1、所属数2では $2-2=0$、所属数3では $3-6+3=0$ である。

###### 採点基準

「ちょうど一つ」の事象または数え方の設定4点、二重共通部分の係数6点、三重共通部分の係数4点、完成式6点。合計20点。

<!-- solution-end -->

#### P1-B02 少なくとも一度

- level: B
- minutes: 10
- topics: 数え上げ, 余事象

公平な六面体さいころを5回投げ、$6^5$ 個の順序付き出目を全て等確率とする。

1. 1回の出目が1でも2でもない確率を求めよ。
2. 5回とも1でも2でもない確率を求めよ。
3. 少なくとも一度1または2が出る確率を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

1回の出目が1でも2でもないのは

$$
3,4,5,6
$$

の4通りなので

$$
P(\text{1でも2でもない})
=
\frac46
=
\frac23.
$$

5回の順序付き全結果は $6^5$ 通りです。5回とも1でも2でもない結果は、各回に4通りずつあるので $4^5$ 通りです。したがって

$$
P(\text{5回とも1でも2でもない})
=
\frac{4^5}{6^5}
=
\left(\frac23\right)^5.
$$

「少なくとも一度1または2が出る」はこの余事象なので

$$
\boxed{
1-\left(\frac23\right)^5
}
$$

です。

###### 本番答案

(1) $4/6=2/3$。

(2) 等確率な順序付き結果は $6^5$ 通り、該当する結果は $4^5$ 通りだから

$$
(4/6)^5=(2/3)^5.
$$

(3) (2)の余事象より

$$
1-(2/3)^5.
$$

###### 採点基準

(1) 4点、(2) 全結果 $6^5$ の設定4点・該当結果 $4^5$ の数え上げ4点、(3) 余事象の設定4点・結論4点。合計20点。

<!-- solution-end -->

#### P1-B03 上極限事象と下極限事象

- level: B
- minutes: 12
- topics: 事象列

標本空間上の二事象 $A,B$ を用いて

$$
A_{2k-1}=A,\qquad
A_{2k}=B
\qquad(k=1,2,\ldots)
$$

と定める。

上極限事象・下極限事象を

$$
\limsup_{n\to\infty}A_n
=
\bigcap_{m=1}^{\infty}
\bigcup_{n=m}^{\infty}A_n,
$$

$$
\liminf_{n\to\infty}A_n
=
\bigcup_{m=1}^{\infty}
\bigcap_{n=m}^{\infty}A_n
$$

と定義するとき、それぞれを $A,B$ で表せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

任意の $m$ より後にも奇数番と偶数番が無限に現れます。したがって、どの $m$ についても

$$
\bigcup_{n=m}^{\infty}A_n=A\cup B.
$$

よって

$$
\begin{aligned}
\limsup_{n\to\infty}A_n
&=
\bigcap_{m=1}^{\infty}(A\cup B)\\
&=A\cup B.
\end{aligned}
$$

一方、どの $m$ についても、$m$ 以降には $A$ と $B$ が交互に現れるので

$$
\bigcap_{n=m}^{\infty}A_n=A\cap B.
$$

したがって

$$
\begin{aligned}
\liminf_{n\to\infty}A_n
&=
\bigcup_{m=1}^{\infty}(A\cap B)\\
&=A\cap B.
\end{aligned}
$$

###### 本番答案

任意の $m$ について

$$
\bigcup_{n=m}^{\infty}A_n=A\cup B
$$

だから

$$
\limsup A_n=A\cup B.
$$

また

$$
\bigcap_{n=m}^{\infty}A_n=A\cap B
$$

だから

$$
\liminf A_n=A\cap B.
$$

###### 採点基準

上極限の定義適用6点、$A\cup B$ の結論4点、下極限の定義適用6点、$A\cap B$ の結論4点。合計20点。

<!-- solution-end -->

### Level C

#### P1-C01 三分類調査

- level: C
- minutes: 22
- topics: 包除原理, 排反分割

100人について三つの項目への該当者集合を $A,B,C$ とし、

$$
\begin{aligned}
&|A|=60,\quad |B|=50,\quad |C|=40,\\
&|A\cap B|=30,\quad |B\cap C|=20,\quad |C\cap A|=25,\\
&|A\cap B\cap C|=10
\end{aligned}
$$

であった。この100人から1人を一様無作為抽出する。

1. 少なくとも一項目に該当する人数を求めよ。
2. ちょうど一項目に該当する人数を求めよ。
3. ちょうど二項目に該当する人数を求めよ。
4. 抽出された1人がどの項目にも該当しない確率を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

包除原理より

$$
\begin{aligned}
|A\cup B\cup C|
&=|A|+|B|+|C|\\
&\quad-|A\cap B|-|B\cap C|-|C\cap A|\\
&\quad+|A\cap B\cap C|\\
&=60+50+40-30-20-25+10\\
&=85.
\end{aligned}
$$

よって少なくとも一項目に該当するのは85人です。

$A$ だけに該当する人数は

$$
60-30-25+10=15.
$$

同様に

$$
B\text{だけ}:50-30-20+10=10,
$$

$$
C\text{だけ}:40-25-20+10=5.
$$

したがって、ちょうど一項目に該当するのは

$$
15+10+5=30
$$

人です。

ちょうど二項目に該当するのは

$$
(30-10)+(20-10)+(25-10)
=
20+10+15
=
45
$$

人です。

どの項目にも該当しない人数は

$$
100-85=15
$$

人です。一様無作為抽出なので求める確率は

$$
\frac{15}{100}=0.15.
$$

検算すると

$$
30+45+10+15=100
$$

です。

###### 本番答案

包除原理より

$$
|A\cup B\cup C|
=
60+50+40-30-20-25+10
=
85.
$$

一項目だけは

$$
(60-30-25+10)
+(50-30-20+10)
+(40-25-20+10)
=
30
$$

人。二項目だけは

$$
(30-10)+(20-10)+(25-10)=45
$$

人。0項目は $100-85=15$ 人なので、一様無作為抽出した1人がどれにも該当しない確率は

$$
15/100=0.15.
$$

###### 採点基準と選択判断

包除原理と85人4点、ちょうど一項目5点、ちょうど二項目5点、非該当人数と確率4点、全体100人の検算2点。合計20点。3分で包除原理が立たなければ他問候補とし、15分で(2)まで進めば継続します。

<!-- solution-end -->

#### P1-C02 箱への配置

- level: C
- minutes: 25
- topics: 包除原理, 数え上げ

区別できる4個の球を区別できる3個の箱へ入れる。各球は3個の箱のいずれか一つへ入り、$3^4$ 個の写像を全て等確率とする。

1. 全配置数を求めよ。
2. 全ての箱が空でない配置数を求めよ。
3. 空箱がちょうど一つである確率を求めよ。
4. 少なくとも一つの箱が空である確率を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

各球には3個の箱の選択肢があるので、全配置数は

$$
3^4=81
$$

通りです。

箱 $i$ が空である事象を $E_i$ とします。箱 $i$ を使わない配置では各球の行き先は残る2箱なので

$$
|E_i|=2^4=16.
$$

二箱 $i,j$ がともに空なら、全ての球は残る1箱へ入るため

$$
|E_i\cap E_j|=1.
$$

三箱全てが空になる配置はありません。したがって、少なくとも一箱が空の配置数は包除原理から

$$
3\cdot2^4-\binom32\cdot1
=
48-3
=
45.
$$

よって全箱が非空の配置数は

$$
81-45=36.
$$

空箱を一つ指定すると、残る二箱を両方使う配置は

$$
2^4-2=14
$$

通りです。空箱の選び方は3通りなので、空箱がちょうど一つの配置は

$$
3\cdot14=42
$$

通りです。したがって確率は

$$
\frac{42}{81}
=
\frac{14}{27}.
$$

少なくとも一つの箱が空である確率は

$$
\frac{45}{81}
=
\frac59.
$$

###### 本番答案

全配置は $3^4=81$ 通り。箱 $i$ が空の配置を $E_i$ とすると

$$
|E_i|=2^4,\qquad |E_i\cap E_j|=1.
$$

したがって全箱非空は

$$
81-3\cdot16+3=36
$$

通り。空箱を一つ固定すると残る二箱がともに非空の配置は $2^4-2=14$ 通りなので、空箱がちょうど一つである確率は

$$
\frac{3\cdot14}{81}
=
\frac{14}{27}.
$$

少なくとも一箱が空である確率は

$$
1-\frac{36}{81}
=
\frac59.
$$

###### 採点基準と選択判断

全配置数3点、空箱事象の設定と包除原理7点、空箱ちょうど一つの数え上げ5点、少なくとも一空箱の確率3点、等確率モデルから確率へ移す説明2点。合計20点。12分で全箱非空36通りまで進めば継続します。

<!-- solution-end -->

#### P1-C03 減少事象と極限

- level: C
- minutes: 20
- topics: 上からの連続性

同一の確率空間上の事象列 $A_1,A_2,\ldots$ が

$$
A_1\supset A_2\supset\cdots,
\qquad
P(A_n)=\frac1{n+1}
$$

を満たすとする。また

$$
B_n=A_n\setminus A_{n+1}
\qquad(n=1,2,\ldots)
$$

と定義する。

1. $P(\bigcap_{n=1}^{\infty}A_n)$ を求めよ。
2. $B_1,B_2,\ldots$ が互いに排反であることを示せ。
3. $P(B_n)$ を求めよ。
4. 次の等式を確認せよ。
   $$
   P\left(A_1\setminus\bigcap_{n=1}^{\infty}A_n\right)
   =
   \sum_{n=1}^{\infty}P(B_n).
   $$

<!-- solution-start -->

##### 解答

###### 詳細解答

$A_n$ は減少列なので、上からの連続性より

$$
P\left(\bigcap_{n=1}^{\infty}A_n\right)
=
\lim_{n\to\infty}P(A_n)
=
\lim_{n\to\infty}\frac1{n+1}
=
0.
$$

次に $m<n$ とします。減少列なので

$$
A_n\subset A_{m+1}.
$$

一方

$$
B_m=A_m\setminus A_{m+1}
$$

は $A_{m+1}$ と交わりません。また $B_n\subset A_n\subset A_{m+1}$ です。よって

$$
B_m\cap B_n=\varnothing.
$$

したがって $(B_n)$ は互いに排反です。

また

$$
A_n=B_n\sqcup A_{n+1}
$$

なので

$$
\begin{aligned}
P(B_n)
&=P(A_n)-P(A_{n+1})\\
&=\frac1{n+1}-\frac1{n+2}\\
&=\frac1{(n+1)(n+2)}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\sum_{n=1}^{\infty}P(B_n)
&=
\sum_{n=1}^{\infty}
\left(
\frac1{n+1}-\frac1{n+2}
\right)\\
&=
\frac12.
\end{aligned}
$$

一方、

$$
P\left(A_1\setminus\bigcap_nA_n\right)
=
P(A_1)-P\left(\bigcap_nA_n\right)
=
\frac12-0
=
\frac12.
$$

よって両辺は一致します。

###### 本番答案

上からの連続性より

$$
P(\cap_nA_n)
=
\lim_nP(A_n)
=
0.
$$

$m<n$ なら $B_m\subset A_m\setminus A_{m+1}$、$B_n\subset A_n\subset A_{m+1}$ だから $B_m\cap B_n=\varnothing$。

また

$$
P(B_n)
=
P(A_n)-P(A_{n+1})
=
\frac1{n+1}-\frac1{n+2}.
$$

したがって

$$
\sum_{n=1}^{\infty}P(B_n)
=
\frac12
=
P(A_1)-P(\cap_nA_n).
$$

###### 採点基準と選択判断

上からの連続性5点、排反性5点、$P(B_n)$ の導出4点、望遠和と左辺の照合6点。合計20点。15分で(3)まで進めば継続します。

<!-- solution-end -->

### Level D

#### P1-D01 一般の包除原理

- level: D
- minutes: 35
- topics: 一般包除原理, 二項定理

同一の確率空間上の有限個の事象 $A_1,\ldots,A_m$ について

$$
P\left(\bigcup_{i=1}^mA_i\right)
=
\sum_{\varnothing\neq I\subset\{1,\ldots,m\}}
(-1)^{|I|+1}
P\left(\bigcap_{i\in I}A_i\right)
$$

を、各標本点の寄与を数える方法で証明せよ。必要なら二項定理

$$
\sum_{k=0}^r\binom rkx^ky^{r-k}=(x+y)^r
$$

を用いてよい。

<!-- solution-start -->

##### 解答

###### 詳細解答

標本点 $\omega$ が、$A_1,\ldots,A_m$ のうちちょうど $r\geq1$ 個に属するとします。

右辺で $|I|=k$ の項を考えます。$\omega$ を含む $r$ 個の事象の中から $k$ 個を選んだときに限り

$$
\omega\in\bigcap_{i\in I}A_i
$$

となるので、$\omega$ は $|I|=k$ の項に

$$
\binom rk
$$

回現れます。

したがって、右辺における $\omega$ の総係数は

$$
\sum_{k=1}^r(-1)^{k+1}\binom rk.
$$

二項定理に $x=-1,y=1$ を代入すると

$$
\sum_{k=0}^r(-1)^k\binom rk
=
(1-1)^r
=
0.
$$

よって

$$
\sum_{k=1}^r(-1)^{k+1}\binom rk
=
1.
$$

一方、どの $A_i$ にも属さない $\omega$ は左辺の和事象にも属さず、右辺のどの共通部分にも属さないので係数は0です。

したがって各 $\omega$ について

$$
\boldsymbol{1}_{\cup_{i=1}^mA_i}(\omega)
=
\sum_{\varnothing\neq I\subset\{1,\ldots,m\}}
(-1)^{|I|+1}
\boldsymbol{1}_{\cap_{i\in I}A_i}(\omega).
$$

両辺の期待値を取ります。指示関数について

$$
E[\boldsymbol{1}_A]=P(A)
$$

なので

$$
P\left(\bigcup_{i=1}^mA_i\right)
=
\sum_{\varnothing\neq I\subset\{1,\ldots,m\}}
(-1)^{|I|+1}
P\left(\bigcap_{i\in I}A_i\right).
$$

###### 本番答案

$\omega$ がちょうど $r\geq1$ 個の $A_i$ に属するとする。$|I|=k$ の共通部分では $\omega$ は $\binom rk$ 回数えられるので、右辺での係数は

$$
\sum_{k=1}^r(-1)^{k+1}\binom rk
=
1-(1-1)^r
=
1.
$$

どの $A_i$ にも属さない点の係数は両辺とも0。よって指示関数の等式が点ごとに成り立ち、期待値を取れば所望の包除公式を得る。

###### 採点基準と選択判断

所属事象数 $r$ の設定4点、$\binom rk$ の数え上げ4点、二項定理による係数1の導出6点、和事象外の点の確認2点、指示関数から確率へ移す部分4点。合計20点。15分で二項定理による係数計算まで進めば継続します。

<!-- solution-end -->

---

## 11. 30分ドリル

- id: P1-DRILL-01
- level: C
- minutes: 30
- total: 100点

### 問題

200人について三つの項目への該当者集合を $A,B,C$ とし、この200人から1人を一様無作為抽出する。人数は

$$
\begin{aligned}
&|A|=110,\quad |B|=90,\quad |C|=80,\\
&|A\cap B|=50,\quad |B\cap C|=40,\quad |C\cap A|=45
\end{aligned}
$$

である。三重共通部分の人数を

$$
t=|A\cap B\cap C|
$$

とする。

この問題では、二事象 $E,F$ が独立であるとは

$$
P(E\cap F)=P(E)P(F)
$$

が成り立つことと定義する。また $P(F)>0$ のとき、条件付き確率を

$$
P(E\mid F)=\frac{P(E\cap F)}{P(F)}
$$

と定義する。

1. 8個の排反な領域の人数を $t$ で表せ。（25点）
2. 全領域の人数が非負となるための $t$ の範囲を求め、その範囲の各整数値が実現可能である理由を述べよ。（25点）
3. $|A\cup B\cup C|$ の最小値と最大値を求めよ。（15点）
4. $A$ と $B$ が独立か判定せよ。（15点）
5. $t=20$ のとき、$P(C\mid A\cup B)$ を求め、無条件の $P(C)$ と大小を比較せよ。（20点）

<!-- solution-start -->

#### 解答

##### 詳細解答

三重共通部分を除いた二項目共通の領域は

$$
|A\cap B\cap C^c|
=
|A\cap B|-|A\cap B\cap C|
=
50-t,
$$

$$
|A\cap B^c\cap C|
=
45-t,
$$

$$
|A^c\cap B\cap C|
=
40-t.
$$

$A$ だけの人数は

$$
\begin{aligned}
|A\cap B^c\cap C^c|
&=
|A|-|A\cap B|-|A\cap C|+|A\cap B\cap C|\\
&=
110-50-45+t\\
&=
15+t.
\end{aligned}
$$

同様に

$$
|A^c\cap B\cap C^c|
=
90-50-40+t
=
t,
$$

$$
|A^c\cap B^c\cap C|
=
80-45-40+t
=
t-5.
$$

包除原理より

$$
\begin{aligned}
|A\cup B\cup C|
&=
110+90+80-50-40-45+t\\
&=
145+t.
\end{aligned}
$$

したがって、どの項目にも該当しない人数は

$$
200-(145+t)=55-t.
$$

よって8領域は

$$
t,\quad
50-t,\quad
45-t,\quad
40-t,\quad
15+t,\quad
t,\quad
t-5,\quad
55-t
$$

です。

全領域が非負であるためには

$$
t\geq0,\quad
50-t\geq0,\quad
45-t\geq0,\quad
40-t\geq0,
$$

$$
15+t\geq0,\quad
t-5\geq0,\quad
55-t\geq0
$$

が必要です。最も強い下限と上限は

$$
\boxed{
5\leq t\leq40
}
$$

です。

$t$ がこの範囲の整数なら、上の8領域は全て非負整数で、その総和は200です。各領域へその人数だけ異なる人を割り当てれば、指定された周辺人数・共通人数をもつ $A,B,C$ を構成できます。したがって範囲内の各整数値は実現可能です。

また

$$
|A\cup B\cup C|=145+t
$$

なので

$$
150\leq|A\cup B\cup C|\leq185.
$$

したがって最小値150、最大値185です。

独立性については

$$
P(A\cap B)=\frac{50}{200}=\frac14
$$

ですが

$$
P(A)P(B)
=
\frac{110}{200}\frac{90}{200}
=
\frac{99}{400}.
$$

$$
\frac14=\frac{100}{400}\neq\frac{99}{400}
$$

なので $A,B$ は独立ではありません。

最後に $t=20$ とします。

$$
|A\cup B|
=
110+90-50
=
150.
$$

また

$$
\begin{aligned}
|C\cap(A\cup B)|
&=
|(C\cap A)\cup(C\cap B)|\\
&=
|C\cap A|+|C\cap B|-|A\cap B\cap C|\\
&=
45+40-20\\
&=
65.
\end{aligned}
$$

したがって

$$
P(C\mid A\cup B)
=
\frac{65/200}{150/200}
=
\frac{65}{150}
=
\frac{13}{30}.
$$

一方

$$
P(C)=\frac{80}{200}=\frac25.
$$

比較すると

$$
\frac{13}{30}-\frac25
=
\frac{13}{30}-\frac{12}{30}
=
\frac1{30}>0.
$$

よって

$$
P(C\mid A\cup B)>P(C).
$$

##### 本番答案

8領域は

$$
t,\ 50-t,\ 45-t,\ 40-t,\ 15+t,\ t,\ t-5,\ 55-t.
$$

全ての非負条件をまとめると

$$
5\leq t\leq40.
$$

この範囲の整数 $t$ では8領域が非負整数で総和200となるため、各領域へ人を割り当てれば実現できる。

包除原理から

$$
|A\cup B\cup C|=145+t
$$

なので範囲は150〜185人。

$$
P(A\cap B)=\frac14,
\qquad
P(A)P(B)=\frac{99}{400}
$$

で一致しないため、$A,B$ は独立ではない。

$t=20$ では

$$
|A\cup B|=150,
\qquad
|C\cap(A\cup B)|=65
$$

だから

$$
P(C\mid A\cup B)
=
\frac{13}{30}
>
\frac25
=
P(C).
$$

##### 採点基準・時間配分・選択判断

8領域25点、範囲と実現可能性25点、和事象15点、独立性15点、条件付き確率と比較20点。初動3分、(1)7分、(2)7分、(3)3分、(4)3分、(5)4分、見直し3分。15分で8領域と範囲が出れば継続します。

<!-- solution-end -->

---

## 12. 実過去問演習

問題文は転載せず、公式問題集の年度・科目・大問番号で参照します。

#### PAST-P1-01: MATH-2022-Q1

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 30分
- 現在解く範囲: 事象の和・積・補事象、与えられた確率の実現可能性と上下界
- 後続章で再挑戦: 独立性と条件付き確率を使う部分
- 答案確認: 包除原理へ代入するだけでなく、非負性から生じる範囲と、その端点を達成する事象構成を示す。

#### PAST-P1-02: MATH-2022-Q2

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 現在15分、P2-01修了後30分
- 現在解く範囲: 標本空間を領域として表し、事象確率を面積比で求める部分
- 後続章で再挑戦: 条件付き分布と相関
- 答案確認: 標本空間、事象領域、面積、確率の順に書く。

---

## 13. 復習チェック

- [ ] 標本空間と事象を区別できる。
- [ ] 有限等確率モデルで $P(A)=|A|/|\Omega|$ を使える条件を説明できる。
- [ ] 和事象・積事象・補事象・差事象を日本語と相互変換できる。
- [ ] $P(\varnothing)=0$ と有限加法性を確率公理から導ける。
- [ ] 補集合公式、差の公式、単調性を導ける。
- [ ] 二事象・三事象の包除原理を重複の数え方から説明できる。
- [ ] 下からの連続性を排反分解から導ける。
- [ ] 上からの連続性を補集合と下からの連続性から導ける。
- [ ] $\limsup A_n$ を「無限回」、$\liminf A_n$ を「ある時点以降ずっと」と説明できる。
- [ ] 三事象を8個の排反領域へ分け、非負性から実現可能な範囲を求められる。
