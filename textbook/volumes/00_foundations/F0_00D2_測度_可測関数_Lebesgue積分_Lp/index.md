# F0-00D2 補講：測度空間・測度0・a.e.・可測関数

F0-00までは、積分を主として「計算する技法」として扱いました。ここからは、確率論・Lebesgue積分・関数解析の共通言語を作ります。

この講義の問いは一つです。

> **どの集合を「測ってよい」とし、どの関数を「測れる関数」と呼ぶのか。**

Lebesgue積分そのものは次講 D2A で構成します。収束定理はD2B、積測度はD2C、$L^p$ はD2D、$L^2$完備性はD2Eで扱います。

```text
D2   測度空間・測度0・a.e.・可測関数
 ↓
D2A  単関数からLebesgue積分
 ↓
D2B  MCT → Fatou → DCT
 ↓
D2C  積測度 → Tonelli → Fubini
 ↓
D2D  Lp → Hölder → Minkowski
 ↓
D2E  L2完備性 → Hilbert空間
```

Lebesgue測度そのものを「区間の長さ」から構成したい場合は、D2の後で D3 → D4 → D5 へ寄り道し、その後D2Aへ戻れます。標準ルートではLebesgue測度の存在と基本性質を既知の定理として受け入れます。

## 0. まず有限の確率空間で測度論を読む

抽象記号へ入る前に、サイコロ1回を

$$
\Omega=\{1,2,3,4,5,6\}
$$

とします。全ての部分集合を事象としてよいなら $\mathcal F=2^\Omega$、公平なサイコロなら

$$
P(A)=\frac{\#A}{6}
$$

です。

このとき測度論の言葉は、すでに知っている確率の言葉そのものです。

| 測度論 | 確率論での読み方 |
|---|---|
| $\Omega$ | 起こりうる全結果 |
| $\mathcal F$ | 確率を割り当ててよい事象の集合 |
| 測度 $\mu$ | 集合の大きさ |
| 確率測度 $P$ | 全体の大きさが1の測度 |
| 可測関数 $X$ | 確率変数 |
| a.e. | 確率0の例外を除いて |

連続空間へ行くと「全ての部分集合に確率を割り当てる」ができなくなるため、$\sigma$代数が必要になります。

したがって本章は、確率論に突然別の抽象数学を持ち込むのではなく、**有限確率空間で当たり前だった構造を無限集合でも壊れない形へ拡張する章**です。

---

## 1. なぜ集合族を選ぶ必要があるのか

有限集合なら、すべての部分集合に大きさを割り当てても困りません。しかし実数全体では「すべての部分集合」に長さを矛盾なく割り当てることはできません。D5ではVitali集合を使ってその限界を見ます。

そこでまず、**大きさを割り当てる対象となる集合族**を決めます。

<a id="def-f0-00d2-01"></a>
 
<!-- formal-statement-start -->
### 定義（σ代数）

集合 $\Omega$ の部分集合族 $\mathcal F\subset 2^\Omega$ が **σ代数** であるとは、次の3条件を満たすことをいう。

1. $\Omega\in\mathcal F$。
2. $A\in\mathcal F$ なら $A^c=\Omega\setminus A\in\mathcal F$。
3. $A_1,A_2,\ldots\in\mathcal F$ なら

$$
\bigcup_{n=1}^{\infty}A_n\in\mathcal F.
$$

組 $(\Omega,\mathcal F)$ を **可測空間** といい、$A\in\mathcal F$ を **可測集合** という。

<!-- formal-statement-end -->

<a id="prop-f0-00d2-01"></a>
 
<!-- formal-statement-start -->
### 命題（σ代数の基本閉性）

可測空間 $(\Omega,\mathcal F)$ に対して、$A_1,A_2,\ldots\in\mathcal F$ なら

$$
\bigcap_{n=1}^{\infty}A_n\in\mathcal F.
$$

また $A,B\in\mathcal F$ なら $A\setminus B\in\mathcal F$ である。
<!-- formal-statement-end -->

### 1.1 証明の見取り図：$\sigma$代数の三条件だけで他の集合演算を作る

定義に直接入っているのは「補集合」と「可算和」です。

- 可算共通部分は De Morgan 則で「補集合 + 可算和」に変換する。
- 集合差 $A\setminus B$ は $A\cap B^c$ に変換する。

つまり新しい公理を使うのではなく、定義の三条件を集合恒等式で使い回しているだけです。

<!-- proof-start -->
#### 証明

De Morgan則より

$$
\bigcap_{n=1}^{\infty}A_n
=
\left(\bigcup_{n=1}^{\infty}A_n^c\right)^c.
$$

各 $A_n^c$ は可測で、その可算和も可測、その補集合も可測です。また

$$
A\setminus B=A\cap B^c
$$

なので集合差も可測です。$\square$
<!-- proof-end -->

### 例1：有限集合上のσ代数

$\Omega=\{1,2,3,4\}$ とし、

$$
\mathcal F
=
\{\varnothing,\{1,2\},\{3,4\},\Omega\}
$$

とします。補集合と可算和（有限集合なので実質有限和）で閉じているため、これはσ代数です。

一方

$$
\mathcal G=\{\varnothing,\{1\},\Omega\}
$$

はσ代数ではありません。$\{1\}$ の補集合 $\{2,3,4\}$ が入っていないからです。

---

## 2. Borel σ代数

実数上では、開集合を少なくとも測れるようにしたいので、開集合から生成される最小のσ代数を使います。

<a id="def-f0-00d2-02"></a>
 
<!-- formal-statement-start -->
### 定義（生成σ代数）

集合 $\Omega$ の部分集合族 $\mathcal C\subset2^\Omega$ に対して、$\mathcal C$ を含む最小のσ代数を

$$
\sigma(\mathcal C)
$$

と書き、$\mathcal C$ が生成するσ代数という。
<!-- formal-statement-end -->

「最小のσ代数」が本当に存在することも確認しておきます。$\mathcal C$ を含むσ代数全体を集めると、少なくとも $2^\Omega$ がその一つなので空ではありません。その全ての共通部分を取ると、$\Omega$ を含むこと・補集合で閉じること・可算和で閉じることは共通部分にも引き継がれます。したがって

$
\sigma(\mathcal C)
=
\bigcap\{\mathcal A:\mathcal A\text{ は }\mathcal C\text{ を含むσ代数}\}
$

と構成でき、これが $\mathcal C$ を含む最小のσ代数です。

<a id="def-f0-00d2-03"></a>
 
<!-- formal-statement-start -->
### 定義（Borel σ代数）

実数直線 $\mathbb R$ 上の **Borel σ代数** を

$$
\mathcal B(\mathbb R)
:=
\sigma\bigl(\{G\subset\mathbb R:G\text{ は開集合}\}\bigr)
$$

で定義する。

Borel集合には開集合・閉集合・区間だけでなく、それらから可算回の和・共通部分・補集合で作れる集合がすべて含まれます。
<!-- formal-statement-end -->

### 例2：区間はBorel集合

閉集合 $[a,b]$ は開集合 $(-\infty,a)\cup(b,\infty)$ の補集合なのでBorel集合です。半開区間も

$$
(a,b]
=(-\infty,b]\setminus(-\infty,a]
$$

のように書けるためBorel集合です。

---

## 3. 測度

<a id="def-f0-00d2-04"></a>
 
<!-- formal-statement-start -->
### 定義（測度・測度空間）

可測空間 $(\Omega,\mathcal F)$ 上の写像

$$
\mu:\mathcal F\to[0,\infty]
$$

が **測度** であるとは、

$$
\mu(\varnothing)=0
$$

かつ、互いに素な可測集合列 $A_1,A_2,\ldots\in\mathcal F$ に対して

$$
\mu\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\sum_{n=1}^{\infty}\mu(A_n)
$$

を満たすことをいう。三つ組 $(\Omega,\mathcal F,\mu)$ を **測度空間** という。
<!-- formal-statement-end -->

### 例3：数え上げ測度

任意の集合 $\Omega$ 上で $\mathcal F=2^\Omega$ とし、

$$
\mu(A)=\#A
$$

とします。無限集合なら $\mu(A)=\infty$ とします。これは数え上げ測度です。

### 例4：Dirac測度

固定した $x_0\in\Omega$ に対して

$$
\delta_{x_0}(A)
=
\begin{cases}
1,&x_0\in A,\\
0,&x_0\notin A
\end{cases}
$$

と置きます。測度の二条件を直接確認します。

まず $\delta_{x_0}(\varnothing)=0$ です。次に互いに素な可測集合列 $A_1,A_2,\ldots$ を取ります。互いに素なので、$x_0$ が属する $A_n$ は高々一つです。

- どの $A_n$ にも $x_0$ が属さなければ、和集合にも属さず、両辺は0です。
- ちょうど一つ $A_j$ に属すれば、和集合にも属し、

$
\delta_{x_0}\!\left(\bigcup_n A_n\right)=1
=
\sum_n\delta_{x_0}(A_n).
$

したがって可算加法性が成り立ち、$\delta_{x_0}$ は測度です。

### 例5：確率測度

測度 $P$ が

$$
P(\Omega)=1
$$

を満たすとき確率測度といいます。したがって確率は「全体の大きさが1の測度」です。

---

## 4. 測度の基本性質

### 4.1 直感：測度の基本性質は「集合の包含・増加が大きさへ反映される」

測度の公理は可算加法性ですが、実際の計算ではそこから導かれる

- $A\subset B$ なら $\mu(A)\le\mu(B)$
- $A_n\uparrow A$ なら $\mu(A_n)\uparrow\mu(A)$

を頻繁に使います。

後者は、集合を少しずつ増やして近似したときに、その大きさも極限で回収できるという性質です。Lebesgue積分のMCTへそのまま持ち上がります。

<a id="prop-f0-00d2-02"></a>
 
<!-- formal-statement-start -->
### 命題（単調性）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合 $A,B\in\mathcal F$ が $A\subset B$ を満たすなら

$$
\mu(A)\le\mu(B).
$$
<!-- formal-statement-end -->

#### 証明の見取り図

$B$ を

$$
B=A\sqcup(B\setminus A)
$$

と分解し、測度の非負性を使います。包含関係を「互いに素な和」へ変換すれば可算加法性が使える、という典型パターンです。

<!-- proof-start -->
#### 証明

$B=A\sqcup(B\setminus A)$ と互いに素な和に分けられるため、可算加法性から

$$
\mu(B)=\mu(A)+\mu(B\setminus A)\ge\mu(A).
$$

$\square$
<!-- proof-end -->

<a id="thm-f0-00d2-01"></a>
 
<!-- formal-statement-start -->
### 定理（下からの連続性）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合列 $(A_n)$ が

$$
A_1\subset A_2\subset\cdots
$$

を満たすとき、$A=\bigcup_{n=1}^{\infty}A_n$ と置けば

$$
\mu(A_n)\uparrow\mu(A).
$$
<!-- formal-statement-end -->

#### 証明の見取り図

増加列 $A_n$ を、そのたびに新しく増えた部分

$$
B_1=A_1,
\qquad
B_n=A_n\setminus A_{n-1}
$$

へ分解します。$B_n$ は互いに素なので、集合の増加問題を、互いに素な集合の有限和を順に増やす問題へ変換できます。

<!-- proof-start -->
#### 証明

$B_1=A_1$、$B_n=A_n\setminus A_{n-1}$ $(n\ge2)$ と置くと、$B_n$ は互いに素で

$$
A_n=\bigsqcup_{k=1}^nB_k,
\qquad
A=\bigsqcup_{k=1}^{\infty}B_k.
$$

したがって

$$
\mu(A_n)=\sum_{k=1}^n\mu(B_k)
\to
\sum_{k=1}^{\infty}\mu(B_k)
=
\mu(A).
$$

$\square$
<!-- proof-end -->

この定理はD2Bの単調収束定理の証明でも使います。

---

## 5. 測度0と「ほとんど至るところ」

<a id="def-f0-00d2-05"></a>
 
<!-- formal-statement-start -->
### 定義（測度0集合）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合 $N\in\mathcal F$ が

$$
\mu(N)=0
$$

を満たすとき、$N$ を **測度0集合** または **零集合** という。
<!-- formal-statement-end -->

<a id="def-f0-00d2-06"></a>
 
<!-- formal-statement-start -->
### 定義（ほとんど至るところ）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の性質 $P(\omega)$ が **ほとんど至るところ成立する**（almost everywhere, a.e.）とは、

$$
\{\omega\in\Omega:P(\omega)\text{ が成立しない}\}
$$

が可測な測度0集合であることをいう。

Lebesgue測度では一点集合は測度0であり、可算個の測度0集合の和も測度0です。したがって $\mathbb Q\cap[0,1]$ は測度0です。

重要なのは

$$
\text{測度0}\neq\text{空集合}
$$

という点です。
<!-- formal-statement-end -->

---

### 5.1 具体例：確率0の例外は「存在しない」とは違う

一様分布 $U\sim\mathrm{Unif}(0,1)$ では

$$
P(U=1/2)=0
$$

ですが、$U=1/2$ という値そのものが論理的に不可能なわけではありません。

Lebesgue測度では、可算集合 $\mathbb Q\cap[0,1]$ は無数の点を含むにもかかわらず測度0です。

したがって a.e. は

> **例外集合は空ではないかもしれないが、積分・確率の観点では大きさ0**

という意味です。これが後で「関数を測度0集合上の違いを無視して同一視する」$L^p$ 空間につながります。

## 6. 可測関数

### 6.1 直感：可測関数は「値の条件を事象へ戻せる関数」

確率変数 $X$ について

$$
P(X\le a)
$$

を考えるには、集合

$$
\{\omega:X(\omega)\le a\}
$$

が $\mathcal F$ に入っていなければなりません。

可測関数の定義はまさに、**出力側のしきい値条件を入力側の可測集合へ引き戻せる**ことを要求しています。連続写像の「開集合の逆像が開」と同じ構図です。

<a id="def-f0-00d2-07"></a>
 
<!-- formal-statement-start -->
### 定義（実数値可測関数）

可測空間 $(\Omega,\mathcal F)$ 上の関数 $f:\Omega\to\mathbb R$ が **可測** であるとは、任意の $a\in\mathbb R$ に対して

$$
\{\omega\in\Omega:f(\omega)\le a\}\in\mathcal F
$$

を満たすことをいう。

これは

$$
f^{-1}(( -\infty,a])\in\mathcal F
$$

という逆像条件です。
<!-- formal-statement-end -->

<a id="thm-f0-00d2-02"></a>
 
<!-- formal-statement-start -->
### 定理（連続関数はBorel可測）

連続関数 $f:\mathbb R\to\mathbb R$ は、可測空間 $(\mathbb R,\mathcal B(\mathbb R))$ から $(\mathbb R,\mathcal B(\mathbb R))$ への可測関数である。
<!-- formal-statement-end -->

#### 証明の見取り図：可測関数の定義に出てくる半直線をそのまま引き戻す

この章では実数値可測関数を

$
\{x:f(x)\le a\}=f^{-1}(( -\infty,a])
$

が全てBorel集合になることとして定義しました。したがって、任意の $a$ を固定し、出力側の閉半直線 $(-\infty,a]$ を連続関数で引き戻せば十分です。

<!-- proof-start -->
#### 証明

任意の $a\in\mathbb R$ を固定し、

$
C_a:=(-\infty,a]
$

と置きます。$C_a$ は閉集合です。連続関数は閉集合の逆像を閉集合へ戻すので

$
f^{-1}(C_a)
=
\{x\in\mathbb R:f(x)\le a\}
$

は $\mathbb R$ の閉集合です。閉集合はBorel集合だから

$
\{x:f(x)\le a\}\in\mathcal B(\mathbb R).
$

$a$ は任意だったので、可測関数の定義を満たし、$f$ はBorel可測です。$\square$
<!-- proof-end -->

<a id="prop-f0-00d2-03"></a>
 
<!-- formal-statement-start -->
### 命題（指示関数の可測性）

可測空間 $(\Omega,\mathcal F)$ の部分集合 $A\subset\Omega$ に対して、指示関数

$$
1_A(\omega)
=
\begin{cases}
1,&\omega\in A,\\
0,&\omega\notin A
\end{cases}
$$

が可測であることと $A\in\mathcal F$ は同値である。
<!-- formal-statement-end -->

#### 証明の見取り図：指示関数は集合そのものを0/1へ符号化している

$1_A$ の値は0と1だけなので、しきい値 $1/2$ を使えば

$$
A=\{1_A>1/2\}
$$

と集合 $A$ をそのまま復元できます。したがって「$1_A$ が可測」と「$A$ が可測」は同じ情報です。

<!-- proof-start -->
#### 証明

$A\in\mathcal F$ なら、任意の $a$ に対して $\{1_A\le a\}$ は $\varnothing,A^c,\Omega$ のいずれかなので可測です。

逆に $1_A$ が可測なら、定義を $a=1/2$ に適用して

$
\{\omega:1_A(\omega)\le1/2\}=A^c\in\mathcal F.
$

σ代数は補集合で閉じるので

$
A=(A^c)^c\in\mathcal F.
$

従って $A$ は可測です。$\square$
<!-- proof-end -->

---

## 7. 「同じ関数」をa.e.で考える準備

関数 $f,g$ が

$$
f=g\quad\text{a.e.}
$$

であるとは、$f(\omega)\ne g(\omega)$ となる集合が測度0であることです。

例えば $[0,1]$ 上で

$$
f(x)=1_{\mathbb Q}(x),
\qquad
g(x)=0
$$

なら $f=g$ a.e. です。

D2A以降のLebesgue積分では、このような測度0上の違いは積分値に影響しません。D2Dの$L^p$空間では、さらに **a.e.で等しい関数を同じ元として扱う** ようになります。

---

### 7.1 この講義で作った土台

ここまでで次の階層ができました。

```text
測ってよい集合を決める        → σ代数
集合へ大きさを割り当てる      → 測度
大きさ0の例外を無視する       → a.e.
値の条件を可測集合へ戻せる    → 可測関数
```

次講D2Aでは、この可測関数に対して積分を

```text
指示関数 → 単関数 → 非負可測関数 → 一般可積分関数
```

の順に構成します。証明を閉じて読む場合でも、この二段の階層だけは持ったまま先へ進んでください。

# 8. 演習

## F0-00D2-A01 σ代数か判定する

- Level: A
- 目安時間: 8分

$\Omega=\{1,2,3,4\}$ に対し

$$
\mathcal F
=
\{\varnothing,\{1,2\},\{3,4\},\Omega\}
$$

がσ代数であることを確認せよ。

<!-- solution-start -->
### 詳細解答

$\Omega\in\mathcal F$。補集合は $\varnothing\leftrightarrow\Omega$、$\{1,2\}\leftrightarrow\{3,4\}$ とすべて $\mathcal F$ に残ります。$\mathcal F$ は有限なので、任意の可算和も結局この4集合のいずれかです。したがってσ代数です。

### 本番答案

全体集合を含み、補集合で閉じ、任意の和も $\varnothing,\{1,2\},\{3,4\},\Omega$ のいずれかになるのでσ代数である。

### 採点基準（20点）

- 全体集合: 4点
- 補集合: 8点
- 可算和: 6点
- 結論: 2点
<!-- solution-end -->

## F0-00D2-A02 測度0とa.e.

- Level: A
- 目安時間: 8分

$[0,1]$ 上のLebesgue測度を $m$ とする。$f=1_{\mathbb Q\cap[0,1]}$ に対して $f=0$ a.e. を示せ。

<!-- solution-start -->
### 詳細解答

$\mathbb Q\cap[0,1]$ は可算集合なので、可算個の一点集合の和です。一点集合はLebesgue測度0であるため

$$
m(\mathbb Q\cap[0,1])=0.
$$

$f(x)\ne0$ となる集合はちょうど $\mathbb Q\cap[0,1]$ なので $f=0$ a.e. です。

### 本番答案

$\mathbb Q\cap[0,1]$ は可算でLebesgue測度0。$\{x:f(x)\ne0\}=\mathbb Q\cap[0,1]$ より $f=0$ a.e.

### 採点基準（20点）

- 可算集合であること: 5点
- 測度0: 7点
- 例外集合の特定: 6点
- 結論: 2点
<!-- solution-end -->

## F0-00D2-A03 しきい値集合を書き下す

- Level: A
- 目安時間: 8分

$f(x)=x^2$ とする。任意の $a\in\mathbb R$ に対して

$
\{x\in\mathbb R:f(x)\le a\}
$

がBorel集合であることを、集合を具体的に書いて確認せよ。

<!-- solution-start -->
### 詳細解答

$a<0$ なら $x^2\le a$ を満たす実数はないので

$
\{x:x^2\le a\}=\varnothing.
$

$a\ge0$ なら

$
x^2\le a
\iff
-\sqrt a\le x\le\sqrt a
$

だから

$
\{x:x^2\le a\}
=
[-\sqrt a,\sqrt a].
$

空集合も閉区間もBorel集合です。従って全ての $a$ についてしきい値集合はBorel集合であり、$f(x)=x^2$ はこの章の定義でBorel可測です。
<!-- solution-end -->

## F0-00D2-A04 増加する集合を数え上げる

- Level: A
- 目安時間: 8分

$\Omega=\mathbb N$ に数え上げ測度 $\mu$ を入れ、

$
A_n=\{1,2,\ldots,n\}
$

とする。$A_n\uparrow\mathbb N$ と

$
\mu(A_n)\uparrow\mu(\mathbb N)
$

を直接確認せよ。

<!-- solution-start -->
### 詳細解答

$A_n\subset A_{n+1}$ であり、任意の自然数 $m$ は $A_m$ に入るので

$
\bigcup_{n=1}^{\infty}A_n=\mathbb N.
$

数え上げ測度では

$
\mu(A_n)=n,
\qquad
\mu(\mathbb N)=\infty.
$

従って

$
\mu(A_n)=n\uparrow\infty=\mu(\mathbb N).
$

この例では、集合の増加 $A_n\uparrow\mathbb N$ が測度の増加極限へそのまま移ることを具体的に確認できます。
<!-- solution-end -->

## F0-00D2-B01 最小のσ代数

- Level: B
- 目安時間: 12分

$\Omega=\{1,2,3,4\}$ とし、$A=\{1,2\}$ とする。$A$ を含む最小のσ代数 $\sigma(\{A\})$ を求めよ。

<!-- solution-start -->
### 詳細解答

σ代数は $\Omega$ を含み、$A$ を含むなら $A^c=\{3,4\}$ も含みます。さらに $\varnothing=\Omega^c$ も必要です。これら4集合は補集合・可算和で閉じています。したがって

$$
\sigma(\{A\})
=
\{\varnothing,A,A^c,\Omega\}.
$$

### 本番答案

$A$ とその補集合 $A^c$、さらに $\varnothing,\Omega$ が必要十分なので

$$
\sigma(\{A\})=\{\varnothing,\{1,2\},\{3,4\},\Omega\}.
$$

### 採点基準（20点）

- 必要な4集合: 8点
- 閉性確認: 6点
- 最小性: 4点
- 結論: 2点
<!-- solution-end -->

## F0-00D2-B02 Dirac測度

- Level: B
- 目安時間: 12分

可測空間 $(\Omega,\mathcal F)$ と $x_0\in\Omega$ に対して、$\delta_{x_0}$ が測度であることを示せ。

<!-- solution-start -->
### 詳細解答

$\delta_{x_0}(\varnothing)=0$。互いに素な可測集合列 $(A_n)$ について、$x_0$ がどの $A_n$ にも属さなければ両辺0です。属する場合、互いに素なので属する $A_n$ はただ1個であり、

$$
\delta_{x_0}\left(\bigcup_nA_n\right)=1
=
\sum_n\delta_{x_0}(A_n).
$$

よって可算加法性を満たします。

### 本番答案

空集合の測度は0。互いに素な $(A_n)$ では $x_0$ は高々1つの $A_n$ にしか属さないので、$x_0$ が和集合に属する場合も属さない場合も可算加法性が成立する。

### 採点基準（20点）

- 空集合: 3点
- 互いに素の利用: 7点
- 2ケース: 7点
- 結論: 3点
<!-- solution-end -->

## F0-00D2-B03 連続関数の可測性

- Level: B
- 目安時間: 15分

連続関数 $f:\mathbb R\to\mathbb R$ がBorel可測であることを、この章の定義

$$
\{x:f(x)\le a\}\in\mathcal B(\mathbb R)
\qquad(a\in\mathbb R)
$$

から直接示せ。

<!-- solution-start -->
### 詳細解答

任意の $a\in\mathbb R$ を固定します。可測性の定義で調べる集合は

$$
\{x:f(x)\le a\}
=
f^{-1}(( -\infty,a])
$$

です。

出力側の集合 $(-\infty,a]$ は閉集合です。$f$ は連続なので、閉集合の逆像は閉集合です。従って

$$
f^{-1}(( -\infty,a])
$$

は $\mathbb R$ の閉集合であり、特にBorel集合です。

$a$ は任意だったので

$$
\{x:f(x)\le a\}\in\mathcal B(\mathbb R)
$$

が全ての $a$ で成り立ち、$f$ はBorel可測です。

### 本番答案

任意の $a\in\mathbb R$ に対し $(-\infty,a]$ は閉集合であり、連続性から $f^{-1}(( -\infty,a])=\{x:f(x)\le a\}$ も閉集合、従ってBorel集合である。よって $f$ はBorel可測。

### 採点基準（20点）

- 任意の $a$ を固定: 3点
- しきい値集合を逆像で表示: 5点
- $(-\infty,a]$ が閉集合: 3点
- 連続性から逆像が閉集合: 5点
- 可測性の定義へ戻して結論: 4点
<!-- solution-end -->

## F0-00D2-C01 粗いσ代数で可測関数を特徴づける

- Level: C
- 目安時間: 20分

$\Omega=\{1,2,3,4\}$ とし、

$
\mathcal F
=
\{\varnothing,\{1,2\},\{3,4\},\Omega\}
$

とする。関数 $f:\Omega\to\mathbb R$ が $\mathcal F$-可測であるための必要十分条件が

$
f(1)=f(2),
\qquad
f(3)=f(4)
$

であることを示せ。

<!-- solution-start -->
### 詳細解答

まず十分性を示します。

$
f(1)=f(2)=:\alpha,
\qquad
f(3)=f(4)=:\beta
$

とします。任意の $a\in\mathbb R$ に対して、しきい値集合

$
\{\omega:f(\omega)\le a\}
$

は、$\alpha,\beta$ と $a$ の大小関係に応じて

$
\varnothing,quad
\{1,2\},quad
\{3,4\},quad
\Omega
$

のいずれかです。したがって常に $\mathcal F$ に属し、$f$ は可測です。

次に必要性を示します。$f$ が可測で、たとえば $f(1)\ne f(2)$ と仮定します。必要なら1と2を入れ替えて

$
f(1)<f(2)
$

としてよいので、その間の実数 $a$ を

$
f(1)<a<f(2)
$

となるように取ります。すると

$
1\in\{\omega:f(\omega)\le a\},
\qquad
2\notin\{\omega:f(\omega)\le a\}.
$

しかし $\mathcal F$ の集合は1と2を常に同時に含むか、同時に含みません。従ってこのしきい値集合は $\mathcal F$ に属さず、可測性に反します。よって $f(1)=f(2)$ です。

同じ議論を3と4に適用して $f(3)=f(4)$ も得ます。以上から必要十分条件が示されました。
<!-- solution-end -->

---

## 9. 次に進む

次講では、可測関数のうちまず単関数を積分し、そこから一般の非負可測関数へ広げます。

**次：F0-00D2A 単関数からLebesgue積分を構成**
