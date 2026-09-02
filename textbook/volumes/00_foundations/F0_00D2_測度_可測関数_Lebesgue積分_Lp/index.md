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

---

## 1. なぜ集合族を選ぶ必要があるのか

有限集合なら、すべての部分集合に大きさを割り当てても困りません。しかし実数全体では「すべての部分集合」に長さを矛盾なく割り当てることはできません。D5ではVitali集合を使ってその限界を見ます。

そこでまず、**大きさを割り当てる対象となる集合族**を決めます。

### 定義（σ代数）

集合 $\Omega$ の部分集合族 $\mathcal F\subset 2^\Omega$ が **σ代数** であるとは、次の3条件を満たすことをいう。

1. $\Omega\in\mathcal F$。
2. $A\in\mathcal F$ なら $A^c=\Omega\setminus A\in\mathcal F$。
3. $A_1,A_2,\ldots\in\mathcal F$ なら

$$
\bigcup_{n=1}^{\infty}A_n\in\mathcal F.
$$

組 $(\Omega,\mathcal F)$ を **可測空間** といい、$A\in\mathcal F$ を **可測集合** という。

この定義はステートメントの中だけで対象・記号・条件が完結しています。

### 命題（σ代数の基本閉性）

可測空間 $(\Omega,\mathcal F)$ に対して、$A_1,A_2,\ldots\in\mathcal F$ なら

$$
\bigcap_{n=1}^{\infty}A_n\in\mathcal F.
$$

また $A,B\in\mathcal F$ なら $A\setminus B\in\mathcal F$ である。

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

### 定義（生成σ代数）

集合 $\Omega$ の部分集合族 $\mathcal C\subset2^\Omega$ に対して、$\mathcal C$ を含む最小のσ代数を

$$
\sigma(\mathcal C)
$$

と書き、$\mathcal C$ が生成するσ代数という。

### 定義（Borel σ代数）

実数直線 $\mathbb R$ 上の **Borel σ代数** を

$$
\mathcal B(\mathbb R)
:=
\sigma\bigl(\{G\subset\mathbb R:G\text{ は開集合}\}\bigr)
$$

で定義する。

Borel集合には開集合・閉集合・区間だけでなく、それらから可算回の和・共通部分・補集合で作れる集合がすべて含まれます。

### 例2：区間はBorel集合

閉集合 $[a,b]$ は開集合 $(-\infty,a)\cup(b,\infty)$ の補集合なのでBorel集合です。半開区間も

$$
(a,b]
=(-\infty,b]\setminus(-\infty,a]
$$

のように書けるためBorel集合です。

---

## 3. 測度

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

と置くと測度になります。

### 例5：確率測度

測度 $P$ が

$$
P(\Omega)=1
$$

を満たすとき確率測度といいます。したがって確率は「全体の大きさが1の測度」です。

---

## 4. 測度の基本性質

### 命題（単調性）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合 $A,B\in\mathcal F$ が $A\subset B$ を満たすなら

$$
\mu(A)\le\mu(B).
$$

<!-- proof-start -->
#### 証明

$B=A\sqcup(B\setminus A)$ と互いに素な和に分けられるため、可算加法性から

$$
\mu(B)=\mu(A)+\mu(B\setminus A)\ge\mu(A).
$$

$\square$
<!-- proof-end -->

### 定理（下からの連続性）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合列 $(A_n)$ が

$$
A_1\subset A_2\subset\cdots
$$

を満たすとき、$A=\bigcup_{n=1}^{\infty}A_n$ と置けば

$$
\mu(A_n)\uparrow\mu(A).
$$

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

### 定義（測度0集合）

測度空間 $(\Omega,\mathcal F,\mu)$ の可測集合 $N\in\mathcal F$ が

$$
\mu(N)=0
$$

を満たすとき、$N$ を **測度0集合** または **零集合** という。

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

---

## 6. 可測関数

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

### 定理（連続関数はBorel可測）

連続関数 $f:\mathbb R\to\mathbb R$ は、可測空間 $(\mathbb R,\mathcal B(\mathbb R))$ から $(\mathbb R,\mathcal B(\mathbb R))$ への可測関数である。

<!-- proof-start -->
#### 証明

連続性より任意の開集合 $G\subset\mathbb R$ に対して $f^{-1}(G)$ は開集合です。したがって $f^{-1}(G)\in\mathcal B(\mathbb R)$。

そこで

$$
\mathcal C
=
\{B\subset\mathbb R:f^{-1}(B)\in\mathcal B(\mathbb R)\}
$$

と置きます。逆像は補集合・可算和と可換なので、$\mathcal C$ はσ代数です。さらに全ての開集合を含むので

$$
\mathcal B(\mathbb R)\subset\mathcal C.
$$

よって任意のBorel集合 $B$ に対して $f^{-1}(B)$ はBorel集合です。$\square$
<!-- proof-end -->

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

<!-- proof-start -->
#### 証明

$A\in\mathcal F$ なら、任意の $a$ に対して $\{1_A\le a\}$ は $\varnothing,A^c,\Omega$ のいずれかなので可測です。

逆に $1_A$ が可測なら

$$
A
=
\{\omega:1_A(\omega)>1/2\}
$$

は可測です。$\square$
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

連続関数 $f:\mathbb R\to\mathbb R$ がBorel可測であることを、「開集合の逆像が開」と「逆像が集合演算と可換」を使って示せ。

<!-- solution-start -->
### 詳細解答

本文の定理と同様に

$$
\mathcal C
=
\{B\subset\mathbb R:f^{-1}(B)\in\mathcal B(\mathbb R)\}
$$

と置く。逆像は補集合・可算和と可換なので $\mathcal C$ はσ代数。連続性から任意の開集合 $G$ について $f^{-1}(G)$ は開集合、したがってBorel集合である。よって $\mathcal C$ は全開集合を含み、

$$
\mathcal B(\mathbb R)\subset\mathcal C.
$$

したがって $f$ はBorel可測。

### 本番答案

$\mathcal C=\{B:f^{-1}(B)\in\mathcal B(\mathbb R)\}$ は逆像の性質からσ代数。連続性より開集合 $G$ の逆像は開なので $G\in\mathcal C$。よって開集合が生成する $\mathcal B(\mathbb R)\subset\mathcal C$ であり、$f$ はBorel可測。

### 採点基準（20点）

- $\mathcal C$ の定義: 4点
- σ代数確認: 6点
- 開集合を含む: 6点
- 生成σ代数から結論: 4点
<!-- solution-end -->

---

## 9. 次に進む

次講では、可測関数のうちまず単関数を積分し、そこから一般の非負可測関数へ広げます。

**次：F0-00D2A 単関数からLebesgue積分を構成**
