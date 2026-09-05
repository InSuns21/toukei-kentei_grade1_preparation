# F0-00P4 limsup・Borel--Cantelli・確率収束

確率論では、単に「各 $n$ で確率が小さい」だけでなく、

> その事象が標本経路上で無限回起こるのか

を区別する必要があります。この章では事象の $\limsup$ を入口に、Borel--Cantelliの2補題と確率収束・概収束の関係を証明します。

```text
limsup event = infinitely often
  ↓
Borel--Cantelli I：確率がsummableなら無限回は起こらない
  ↓
Borel--Cantelli II：独立 + 確率和が発散なら無限回起こる
  ↓
概収束 / 確率収束の関係
  ↓
確率収束列から概収束部分列を抽出
```

---

## 1. 事象の上極限

<a id="def-f0-00p4-limsup-event"></a>

<!-- formal-statement-start -->
> **定義（事象列の上極限）**  
> 事象列 $A_1,A_2,\ldots$ に対し

$$
\boxed{
\limsup_{n\to\infty}A_n
:=\bigcap_{m=1}^{\infty}\bigcup_{n\ge m}A_n
}
$$

> と定義します。これは $A_n$ が**無限回起こる事象**であり、$\{A_n\ \mathrm{i.o.}\}$ とも書きます。
<!-- formal-statement-end -->

### 1.1 例：偶数番目だけ起こる

$$
A_n=
\begin{cases}
\{0\},&n\text{ が偶数},\\
\varnothing,&n\text{ が奇数}
\end{cases}
$$

とします。

<!-- definition-example-start: def-f0-00p4-limsup-event -->
**定義の確認**  
任意の $m$ より後にも偶数 $n$ があるので

$$
0\in\bigcup_{n\ge m}A_n
\qquad(\forall m).
$$

従って

$$
0\in\bigcap_m\bigcup_{n\ge m}A_n,
$$

すなわち $\limsup_nA_n=\{0\}$ です。これは「0が $A_n$ に無限回入る」という定義そのものです。
<!-- definition-example-end -->

比較のため、

$$
\liminf_{n\to\infty}A_n
:=\bigcup_{m=1}^{\infty}\bigcap_{n\ge m}A_n
$$

は「ある時点以降ずっと $A_n$ が起こる事象」です。上の例では $\liminf_nA_n=\varnothing$ です。

---

## 2. 概収束と確率収束

<a id="def-f0-00p4-as-convergence"></a>

<!-- formal-statement-start -->
> **定義（概収束）**  
> 確率変数列 $X_n$ が $X$ へ概収束するとは

$$
\boxed{
P\{\omega:X_n(\omega)\to X(\omega)\}=1
}
$$

> が成り立つことです。$X_n\xrightarrow{a.s.}X$ と書きます。
<!-- formal-statement-end -->

### 2.1 例：決定論的な収束列

<!-- definition-example-start: def-f0-00p4-as-convergence -->
**定義の確認**  
$X_n(\omega)=1/n$, $X(\omega)=0$ とすれば、全ての $\omega$ で $X_n(\omega)\to0$ です。従って収束する標本点全体の確率は1で、$X_n\xrightarrow{a.s.}0$ です。
<!-- definition-example-end -->

<a id="def-f0-00p4-probability-convergence"></a>

<!-- formal-statement-start -->
> **定義（確率収束）**  
> 任意の $\varepsilon>0$ に対して

$$
\boxed{
P(|X_n-X|>\varepsilon)\to0
}
$$

> が成り立つとき、$X_n$ は $X$ へ確率収束するといい、$X_n\xrightarrow{p}X$ と書きます。
<!-- formal-statement-end -->

### 2.2 例：まれに1になる確率変数

$P(X_n=1)=1/n$, $P(X_n=0)=1-1/n$ とします。

<!-- definition-example-start: def-f0-00p4-probability-convergence -->
**定義の確認**  
$0<\varepsilon<1$ なら

$$
P(|X_n|>\varepsilon)=P(X_n=1)=\frac1n\to0.
$$

$\varepsilon\ge1$ なら左辺は0です。従って任意の $\varepsilon>0$ で定義を満たし、$X_n\xrightarrow{p}0$ です。
<!-- definition-example-end -->

概収束は経路ごとの主張、確率収束は各 $n$ の誤差確率についての主張です。両者の差をBorel--Cantelliが埋めます。

---

## 3. 概収束を「大誤差が無限回起こらない」と読む

固定した $\varepsilon>0$ に対し

$$
A_n^{(\varepsilon)}:=\{|X_n-X|>\varepsilon\}
$$

と置きます。概収束は

$$
\boxed{
X_n\xrightarrow{a.s.}X
\iff
P\left(A_n^{(1/k)}\ \mathrm{i.o.}\right)=0
\quad(k=1,2,\ldots)
}
$$

と読み替えられます。

実際、$X_n(\omega)\to X(\omega)$ なら各 $1/k$ について大誤差は有限回しか起きません。逆に全ての $1/k$ について大誤差が有限回なら、任意の $\varepsilon>0$ に対し $1/k<\varepsilon$ を選べるので $|X_n-X|\to0$ です。

---

<a id="thm-borel-cantelli-1"></a>
<a id="thm-f0-00p4-borel-cantelli-1"></a>

## 4. Borel--Cantelli第1補題

<!-- formal-statement-start -->
> **補題（Borel--Cantelli第1補題）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ が

$$
\sum_{n=1}^{\infty}P(A_n)<\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=0}
$$

> が成り立ちます。独立性は仮定しません。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：tail unionを級数のtailで抑える

任意の $m$ について

$$
\{A_n\ \mathrm{i.o.}\}
=\bigcap_{r=1}^{\infty}\bigcup_{n\ge r}A_n
\subset
\bigcup_{n\ge m}A_n.
$$

従ってunion boundより

$$
P(A_n\ \mathrm{i.o.})
\le
P\left(\bigcup_{n\ge m}A_n\right)
\le
\sum_{n\ge m}P(A_n).
$$

収束級数のtailは $m\to\infty$ で0なので、左辺は0です。
<!-- proof-end -->

### 4.1 典型形：summableな誤差確率から概収束

全ての $k\ge1$ について

$$
\sum_{n=1}^{\infty}
P(|X_n-X|>1/k)<\infty
$$

なら、第1補題から各 $k$ で $\{|X_n-X|>1/k\}$ はa.s.有限回しか起こりません。可算個の確率1事象を交差して

$$
X_n\xrightarrow{a.s.}X
$$

を得ます。

---

<a id="lem-borel-cantelli-2"></a>
<a id="thm-f0-00p4-borel-cantelli-2"></a>

## 5. Borel--Cantelli第2補題

<!-- formal-statement-start -->
> **補題（Borel--Cantelli第2補題）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ が互いに独立で

$$
\sum_{n=1}^{\infty}P(A_n)=\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=1}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：tailで一度も起きない確率を積で0へ落とす

$m\le N$ に対して独立性から

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
=\prod_{n=m}^{N}(1-P(A_n)).
$$

$0\le x\le1$ で $1-x\le e^{-x}$ なので

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
\le
\exp\left(-\sum_{n=m}^{N}P(A_n)\right).
$$

$\sum_nP(A_n)=\infty$ だから、固定した $m$ に対して右辺は $N\to\infty$ で0です。

集合

$$
C_{m,N}:=\bigcap_{n=m}^{N}A_n^c
$$

は $N$ とともに減少するので、確率測度の上からの連続性より

$$
P\left(\bigcap_{n=m}^{\infty}A_n^c\right)
=\lim_{N\to\infty}P(C_{m,N})=0.
$$

従って

$$
P\left(\bigcup_{n\ge m}A_n\right)=1
\qquad(\forall m).
$$

最後に

$$
\{A_n\ \mathrm{i.o.}\}
=\bigcap_{m=1}^{\infty}\bigcup_{n\ge m}A_n.
$$

各 $m$ の事象の補集合は零事象なので、その可算和も零事象です。よって上の可算共通部分の確率は1、すなわち

$$
P(A_n\ \mathrm{i.o.})=1.
$$
<!-- proof-end -->

第1補題と違い、第2補題では独立性が本質的です。独立性を外すと、例えば全て同じ事象 $A_n=A$ で $0<P(A)<1$ とすれば $\sum_nP(A_n)=\infty$ でも $P(A_n\ \mathrm{i.o.})=P(A)<1$ です。

---

## 6. 概収束なら確率収束

<a id="thm-f0-00p4-as-implies-probability"></a>

<!-- formal-statement-start -->
> **定理（概収束は確率収束を含意する）**  
> $X_n\xrightarrow{a.s.}X$ なら

$$
\boxed{X_n\xrightarrow{p}X}
$$

> です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：誤差事象の指示関数へ優収束定理を使う

固定した $\varepsilon>0$ に対し

$$
I_n:=1_{\{|X_n-X|>\varepsilon\}}
$$

と置きます。概収束より $I_n\to0$ a.s. で、$0\le I_n\le1$ です。優収束定理から

$$
P(|X_n-X|>\varepsilon)=E[I_n]\to0.
$$

これは確率収束の定義です。
<!-- proof-end -->

逆向きは一般には成り立ちません。後の第8節で、確率収束からは「部分列なら概収束へ上げられる」ことを示します。

---

## 7. $L^p$ 収束なら確率収束

$p>0$ とし

$$
E|X_n-X|^p\to0
$$

とします。Markov不等式から

$$
P(|X_n-X|>\varepsilon)
=P(|X_n-X|^p>\varepsilon^p)
\le
\frac{E|X_n-X|^p}{\varepsilon^p}
\to0.
$$

従って

$$
X_n\xrightarrow{L^p}X
\Longrightarrow
X_n\xrightarrow{p}X.
$$

---

<a id="thm-f0-00p4-probability-subsequence-as"></a>

## 8. 確率収束から概収束部分列を取れる

<!-- formal-statement-start -->
> **定理（確率収束から概収束部分列）**  
> $X_n\xrightarrow{p}X$ なら、部分列 $X_{n_k}$ が存在して

$$
\boxed{X_{n_k}\xrightarrow{a.s.}X}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：誤差確率を $2^{-k}$ 以下にしてBorel--Cantelliへ渡す

確率収束より、各 $k$ に対し十分大きい $n_k$ を前のものより大きく選んで

$$
P(|X_{n_k}-X|>2^{-k})\le2^{-k}
$$

とできます。

$$
A_k:=\{|X_{n_k}-X|>2^{-k}\}
$$

と置けば

$$
\sum_{k=1}^{\infty}P(A_k)
\le\sum_{k=1}^{\infty}2^{-k}<\infty.
$$

[Borel--Cantelli第1補題](#thm-f0-00p4-borel-cantelli-1)より $A_k$ はa.s.有限回しか起こりません。従って確率1で、ある $K(\omega)$ 以降

$$
|X_{n_k}(\omega)-X(\omega)|\le2^{-k}.
$$

右辺は0へ行くので $X_{n_k}\to X$ a.s. です。
<!-- proof-end -->

この定理は後のVitali収束定理で、確率収束する列の極限が可積分であることを示す際にも使います。

---

## 9. 確率収束と概収束は同じではない

独立な事象 $A_n$ が

$$
P(A_n)=\frac1n
$$

を満たすとし、$X_n=1_{A_n}$ と置きます。

各 $0<\varepsilon<1$ で

$$
P(|X_n|>\varepsilon)=\frac1n\to0
$$

なので $X_n\xrightarrow{p}0$ です。一方

$$
\sum_nP(A_n)=\infty
$$

かつ $A_n$ は独立なので、[Borel--Cantelli第2補題](#thm-f0-00p4-borel-cantelli-2)より

$$
P(A_n\ \mathrm{i.o.})=1.
$$

つまりa.s.で $X_n=1$ が無限回現れ、$X_n$ は0へ概収束しません。

```text
a.s. ─────────────→ probability
                       ↑
L^p ──────────────────┘

probability ──→ a.s. convergent subsequence
```

---

## 10. 演習

### F0-00P4-A01 summableな誤差確率

- Level: A
- 目安時間: 10分

全ての $k\ge1$ について

$$
\sum_{n=1}^{\infty}P(|X_n-X|>1/k)<\infty
$$

とする。$X_n\to X$ a.s. を示せ。

<!-- solution-start -->
#### 詳細解答
各 $k$ についてBorel--Cantelli第1補題を使うと、$|X_n-X|>1/k$ はa.s.有限回しか起こらない。可算個の確率1事象を交差すれば、全ての $k$ について最終的に $|X_n-X|\le1/k$。従って $X_n\to X$ a.s.

#### 本番答案
$A_n^{(k)}=\{|X_n-X|>1/k\}$ と置く。各 $k$ で $\sum_nP(A_n^{(k)})<\infty$ だからBorel--Cantelli Iより $P(A_n^{(k)}\ \mathrm{i.o.})=0$。全 $k$ を可算交差して $X_n\to X$ a.s.

#### 採点基準（20点）
- 事象設定: 5点
- Borel--Cantelli I: 8点
- 可算交差: 4点
- 結論: 3点
<!-- solution-end -->

### F0-00P4-A02 独立コインは表を無限回出す

- Level: A
- 目安時間: 10分

独立なコイン投げで、$A_n$ を「$n$ 回目が表」とし $P(A_n)=p>0$ とする。表が無限回出る確率を求めよ。

<!-- solution-start -->
#### 詳細解答
$\sum_nP(A_n)=\sum_np=\infty$ で事象は独立。Borel--Cantelli第2補題から $P(A_n\ \mathrm{i.o.})=1$。

#### 本番答案
独立かつ $\sum_nP(A_n)=\infty$ よりBorel--Cantelli IIを適用し、確率1。

#### 採点基準（20点）
- 独立性: 5点
- 級数発散: 5点
- 第2補題: 7点
- 結論: 3点
<!-- solution-end -->

### F0-00P4-B01 確率収束から概収束部分列

- Level: B
- 目安時間: 15分

$X_n\xrightarrow{p}X$ とする。$P(|X_{n_k}-X|>2^{-k})\le2^{-k}$ を満たす部分列を選び、概収束を示せ。

<!-- solution-start -->
#### 詳細解答
確率収束から再帰的にそのような $n_k$ を取れる。超過事象の確率和は $\sum2^{-k}<\infty$。Borel--Cantelli Iより超過は有限回なので、a.s.で最終的に $|X_{n_k}-X|\le2^{-k}\to0$。

#### 本番答案
$A_k=\{|X_{n_k}-X|>2^{-k}\}$ とすれば $\sum_kP(A_k)<\infty$。BC Iより $A_k$ はa.s.有限回、従って $X_{n_k}\to X$ a.s.

#### 採点基準（20点）
- 部分列選択: 6点
- 確率和: 4点
- BC I: 6点
- 結論: 4点
<!-- solution-end -->

### F0-00P4-B02 確率収束するが概収束しない列

- Level: B
- 目安時間: 15分

独立な事象 $A_n$ が $P(A_n)=1/n$ を満たすとし、$X_n=1_{A_n}$ と置く。$X_n\to0$ in probability だが $X_n\not\to0$ a.s. を示せ。

<!-- solution-start -->
#### 詳細解答
$0<\varepsilon<1$ で $P(|X_n|>\varepsilon)=1/n\to0$。一方 $\sum_n1/n=\infty$ かつ独立なのでBC IIより $A_n$ は無限回起こる確率1。従って $X_n=1$ がa.s.無限回現れ、0へ収束しない。

#### 本番答案
$P(|X_n|>1/2)=1/n\to0$ なので確率収束。BC IIより $P(A_n\ \mathrm{i.o.})=1$ なので概収束しない。

#### 採点基準（20点）
- 確率収束: 6点
- 調和級数発散: 4点
- BC II: 6点
- 非概収束: 4点
<!-- solution-end -->

### F0-00P4-B03 $L^2$ 収束から確率収束

- Level: B
- 目安時間: 10分

$E|X_n-X|^2\to0$ なら $X_n\xrightarrow{p}X$ を示せ。

<!-- solution-start -->
#### 詳細解答
Markov不等式を $|X_n-X|^2$ に適用して $P(|X_n-X|>\varepsilon)\le E|X_n-X|^2/\varepsilon^2\to0$。

#### 本番答案
$P(|X_n-X|>\varepsilon)\le\varepsilon^{-2}E|X_n-X|^2\to0$。

#### 採点基準（20点）
- Markov適用: 10点
- 極限: 6点
- 結論: 4点
<!-- solution-end -->

---

## 章末チェック

- $\limsup A_n$ を「無限回起こる事象」として定義できる。
- Borel--Cantelli第1補題をunion boundから証明できる。
- Borel--Cantelli第2補題を独立性・積・$1-x\le e^{-x}$ から証明できる。
- 概収束と確率収束を区別できる。
- 概収束 $\Rightarrow$ 確率収束を証明できる。
- 確率収束から概収束部分列を抽出できる。
- 確率収束が概収束を一般には含意しない反例を説明できる。

次は [F0-00P4A 一様可積分性・Vitali](../F0_00P4A_一様可積分性_Vitali/index.md) で、確率収束から $L^1$ 収束へ進むために不足するtail controlを扱います。
