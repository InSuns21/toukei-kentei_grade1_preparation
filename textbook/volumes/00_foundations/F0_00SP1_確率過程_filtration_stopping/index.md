# F0-00SP1 Encore IV：確率過程・filtration・stopping time

確率過程では、時刻ごとの確率変数だけでなく **その時刻までに何を知ってよいか** を同時に管理します。

この章では離散時間

$$
n=0,1,2,\dots
$$

を中心に、次章のmartingaleとoptional stoppingに必要な情報構造を閉じます。

```text
確率変数列
  ↓
filtration = 時間とともに増える情報
  ↓
adapted = 現在値が現在情報で分かる
  ↓
stopping time = 「もう止まったか」が現在情報で分かる
  ↓
停止時刻までの情報 F_tau
  ↓
stopped process X_{n∧tau}
```

---

## 1. 確率過程

<a id="def-f0-00sp1-process"></a>

<!-- formal-statement-start -->
> **定義（確率過程）**  
> 確率空間 $(\Omega,\mathcal F,P)$ と添字集合 $T$ に対し、各 $t\in T$ について $X_t:\Omega\to\mathbb R$ が確率変数であるとき、族 $(X_t)_{t\in T}$ を確率過程と呼びます。固定した $\omega\in\Omega$ に対する写像 $t\mapsto X_t(\omega)$ をsample pathと呼びます。
<!-- formal-statement-end -->

### 1.1 例：コイン投げの累積和

独立な $\xi_k\in\{-1,1\}$ を取り

$$
S_0=0,
\qquad
S_n=\sum_{k=1}^n\xi_k
$$

とします。

<!-- definition-example-start: def-f0-00sp1-process -->
**定義の確認**  
各 $n$ を固定すると $S_n$ は有限個の確率変数の和なので確率変数です。従って $(S_n)_{n\ge0}$ は離散時間確率過程です。一方 $\omega$ を固定すると

$$
0,S_1(\omega),S_2(\omega),\dots
$$

という一本のsample pathが得られます。
<!-- definition-example-end -->

---

## 2. filtration

<a id="def-f0-00sp1-filtration"></a>

<!-- formal-statement-start -->
> **定義（filtration）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上のσ代数列 $(\mathcal F_n)_{n\ge0}$ が

$$
\mathcal F_0\subset\mathcal F_1\subset\mathcal F_2\subset\cdots\subset\mathcal F
$$

> を満たすとき、$(\mathcal F_n)$ をfiltrationと呼びます。
<!-- formal-statement-end -->

$\mathcal F_n$ は「時刻 $n$ までに利用可能な情報」です。時間が進むと情報は増えてよい一方、過去に知っていた事実を忘れないことを包含関係で表します。

### 2.1 例：コイン投げの情報

$$
\mathcal F_n:=\sigma(\xi_1,\dots,\xi_n),
\qquad
\mathcal F_0:=\{\varnothing,\Omega\}
$$

とします。

<!-- definition-example-start: def-f0-00sp1-filtration -->
**定義の確認**  
$\mathcal F_n$ はσ代数であり、生成元が一つ増えるだけなので

$$
\mathcal F_n\subset\mathcal F_{n+1}.
$$

したがって $(\mathcal F_n)$ はfiltrationです。時刻 $n$ では最初の $n$ 回のコイン結果だけを使えます。
<!-- definition-example-end -->

---

## 3. natural filtration

<a id="def-f0-00sp1-natural-filtration"></a>

<!-- formal-statement-start -->
> **定義（natural filtration）**  
> 確率過程 $(X_n)_{n\ge0}$ に対し

$$
\mathcal F_n^X:=\sigma(X_0,X_1,\dots,X_n)
$$

> と定めたfiltrationを、$X$ のnatural filtrationと呼びます。
<!-- formal-statement-end -->

### 3.1 例：ランダムウォーク

公平ランダムウォーク $S_n=\xi_1+\cdots+\xi_n$ では

$$
\xi_n=S_n-S_{n-1}
$$

なので

<!-- definition-example-start: def-f0-00sp1-natural-filtration -->
**定義の確認**  
$S_0,\dots,S_n$ から $\xi_1,\dots,\xi_n$ を復元でき、逆に $\xi_1,\dots,\xi_n$ から $S_0,\dots,S_n$ を計算できます。従って

$$
\sigma(S_0,\dots,S_n)=\sigma(\xi_1,\dots,\xi_n).
$$

この場合、ランダムウォークのnatural filtrationは「これまでの全増分を知る情報」と一致します。
<!-- definition-example-end -->

---

## 4. adapted process

<a id="def-f0-00sp1-adapted"></a>

<!-- formal-statement-start -->
> **定義（adapted process）**  
> filtration $(\mathcal F_n)$ に対し、確率過程 $(X_n)$ が各 $n$ で $\mathcal F_n$-可測であるとき、$X$ は $(\mathcal F_n)$ にadaptedであるといいます。
<!-- formal-statement-end -->

「現在値は現在までの情報で決まる」という条件です。

### 4.1 例と反例

公平ランダムウォーク $S_n$ とそのnatural filtrationを考えます。

<!-- definition-example-start: def-f0-00sp1-adapted -->
**定義の確認**  
$S_n$ は $\mathcal F_n^S=\sigma(S_0,\dots,S_n)$ の生成元そのものなので $\mathcal F_n^S$-可測です。従って $S$ はnatural filtrationにadaptedです。

一方、固定した $N>n$ に対し

$$
Y_n:=1_{\{S_N>0\}}
$$

と置くと、一般に $Y_n$ は $\mathcal F_n^S$-可測ではありません。未来の $S_N$ を見ないと現在値を決められないためです。
<!-- definition-example-end -->

連続時間Itô積分ではadaptednessだけでなくpredictable / progressively measurableというより強い可測性を使います。ここでは離散時間の情報構造に集中します。

---

## 5. stopping time

<a id="def-f0-00sp1-stopping-time"></a>

<!-- formal-statement-start -->
> **定義（stopping time）**  
> filtration $(\mathcal F_n)$ に対し、$\tau:\Omega\to\{0,1,2,\dots\}\cup\{\infty\}$ が

$$
\{\tau\le n\}\in\mathcal F_n
\qquad(n=0,1,2,\dots)
$$

> を満たすとき、$\tau$ をstopping timeと呼びます。
<!-- formal-statement-end -->

時刻 $n$ の時点で「すでに止まったか」を未来を見ずに判定できる、という定義です。

離散時間では

$$
\{\tau=n\}=\{\tau\le n\}\setminus\{\tau\le n-1\}\in\mathcal F_n
$$

も従います。

### 5.1 例：初回到達時刻

adapted process $(X_n)$ と集合 $A\subset\mathbb R$ を考え

$$
\tau_A:=\inf\{n\ge0:X_n\in A\}
$$

とします。

<!-- definition-example-start: def-f0-00sp1-stopping-time -->
**定義の確認**  
離散時間では

$$
\{\tau_A\le n\}
=
\bigcup_{k=0}^n\{X_k\in A\}.
$$

$X_k$ は $\mathcal F_k$-可測で $\mathcal F_k\subset\mathcal F_n$ だから、右辺は $\mathcal F_n$ に属します。従って初回到達時刻はstopping timeです。
<!-- definition-example-end -->

<a id="prop-f0-00sp1-hitting-time"></a>

<!-- formal-statement-start -->
> **命題（離散時間の初回到達時刻）**  
> $(X_n)$ が $(\mathcal F_n)$ にadaptedで、$A$ がBorel集合なら、$\tau_A=\inf\{n\ge0:X_n\in A\}$ はstopping timeです。
<!-- formal-statement-end -->

上の定義確認がそのまま証明です。

---

## 6. stopping timeでない時刻

有限期間 $0\le n\le N$ で

$$
\rho:=\max\{0\le k\le N:S_k=\max_{0\le j\le N}S_j\}
$$

を「最終最大時刻」とします。

時刻 $n<N$ で $\rho\le n$ かどうかを判定するには、時刻 $n+1,\dots,N$ に新しい最大値が出ないことを知る必要があります。従って通常、$\rho$ はnatural filtrationに対するstopping timeではありません。

> ランダムな時刻なら停止時刻、ではありません。**現在までの情報だけで停止判定できるか**が本質です。

---

## 7. 停止時刻までの情報

optional samplingの条件付き版では「時刻 $\tau$ までに知っている事象」を明示する必要があります。

<a id="def-f0-00sp1-stopped-sigma-field"></a>

<!-- formal-statement-start -->
> **定義（停止時刻までのσ代数）**  
> stopping time $\tau$ に対して

$$
\mathcal F_\tau
:=
\left\{
A\in\mathcal F:
A\cap\{\tau\le n\}\in\mathcal F_n
\text{ for every }n
\right\}
$$

> と定めます。
<!-- formal-statement-end -->

### 7.1 例：決定論的時刻

$\tau\equiv m$ とします。

<!-- definition-example-start: def-f0-00sp1-stopped-sigma-field -->
**定義の確認**  
$n<m$ では $\{\tau\le n\}=\varnothing$、$n\ge m$ では $\{\tau\le n\}=\Omega$ です。従って $A\in\mathcal F_\tau$ である条件は

$$
A\in\mathcal F_n\quad(n\ge m)
$$

であり、filtrationの単調性からこれは $A\in\mathcal F_m$ と同値です。よって

$$
\mathcal F_\tau=\mathcal F_m.
$$
<!-- definition-example-end -->

<a id="lem-f0-00sp1-stopped-information"></a>

<!-- formal-statement-start -->
> **補題（停止時刻情報の基本性質）**  
> stopping times $\sigma,\tau$ が $\sigma\le\tau$ a.s. を満たすなら

$$
\mathcal F_\sigma\subset\mathcal F_\tau.
$$

> また $A\in\mathcal F_\sigma$ と $k\ge0$ に対し

$$
A\cap\{\sigma\le k\}\in\mathcal F_k.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：定義をそのまま使う

後半は $\mathcal F_\sigma$ の定義そのものです。

前半について $A\in\mathcal F_\sigma$ とします。$\sigma\le\tau$ なら

$$
A\cap\{\tau\le n\}
=
A\cap\{\sigma\le n\}\cap\{\tau\le n\}.
$$

第1・第2因子はいずれも $\mathcal F_n$ に属するので右辺も $\mathcal F_n$ に属します。従って $A\in\mathcal F_\tau$ です。
<!-- proof-end -->

---

## 8. stopped process

<a id="def-f0-00sp1-stopped-process"></a>

<!-- formal-statement-start -->
> **定義（stopped process）**  
> 確率過程 $(X_n)$ とstopping time $\tau$ に対し

$$
X_n^\tau:=X_{n\wedge\tau}
$$

> と定めた過程をstopped processと呼びます。
<!-- formal-statement-end -->

### 8.1 例：ランダムウォークを境界で止める

$$
\tau:=\inf\{n\ge0:|S_n|=2\}
$$

とします。

<!-- definition-example-start: def-f0-00sp1-stopped-process -->
**定義の確認**  
例えばpathが

$$
S_0,S_1,S_2,S_3,S_4=(0,1,0,-1,-2)
$$

なら $\tau=4$ で、stopped processは

$$
0,1,0,-1,-2,-2,-2,\dots
$$

です。$n<\tau$ では $S_n^\tau=S_n$、$n\ge\tau$ では $S_n^\tau=S_\tau$ という定義を直接満たしています。
<!-- definition-example-end -->

---

## 9. optional stoppingへ必要な可測性

次章では

$$
M_\tau-M_\sigma
=
\sum_{k=0}^{N-1}
1_{\{\sigma\le k<\tau\}}(M_{k+1}-M_k)
$$

という分解を使います。

$\sigma,\tau$ がstopping timeなら

$$
\{\sigma\le k<\tau\}
=
\{\sigma\le k\}\cap\{\tau>k\}
\in\mathcal F_k.
$$

つまり「時刻 $k$ の次の増分を保有するか」は時刻 $k$ までの情報だけで決められます。この一行がoptional stoppingの情報論的な核心です。

---

## 10. Markov性との違い

filtrationは「過去に何を知るか」を表す一般的な器です。Markov性はその上で、未来予測が現在状態だけに圧縮できるという追加構造です。

概念的には

$$
E[f(X_{n+m})\mid\mathcal F_n]
=
E[f(X_{n+m})\mid X_n]
$$

です。

martingaleは別方向の条件で、未来の条件付き平均が現在値と一致することを要求します。

---

# 11. 演習

## F0-00SP1-A01 stopping timeを判定する

- Level: A
- 目安時間: 10分

adapted process $(X_n)$ に対して

$$
\tau=\inf\{n\ge0:X_n\ge a\}
$$

がstopping timeであることを示せ。

<!-- solution-start -->
### 詳細解答

$$
\{\tau\le n\}=\bigcup_{k=0}^n\{X_k\ge a\}.
$$

$X_k$ は $\mathcal F_k$-可測で $\mathcal F_k\subset\mathcal F_n$ だから各事象は $\mathcal F_n$ に属する。有限和集合も $\mathcal F_n$ に属するので、定義から $\tau$ はstopping time。

### 本番答案

$\{\tau\le n\}=\cup_{k\le n}\{X_k\ge a\}\in\mathcal F_n$ よりstopping time。

### 採点基準（20点）
- stopping timeの判定事象を書く：8点
- adaptednessを使う：8点
- 結論：4点
<!-- solution-end -->

## F0-00SP1-A02 決定論的時刻の停止時刻σ代数

- Level: A
- 目安時間: 10分

$\tau\equiv m$ のとき $\mathcal F_\tau=\mathcal F_m$ を示せ。

<!-- solution-start -->
### 詳細解答

$n<m$ では $\{\tau\le n\}=\varnothing$、$n\ge m$ では $\Omega$。従って $A\in\mathcal F_\tau$ は $A\in\mathcal F_n$ for all $n\ge m$ と同値であり、filtrationの単調性から $A\in\mathcal F_m$ と同値。

### 本番答案

$\{\tau\le n\}$ が $n<m$ で空集合、$n\ge m$ で全空間になることを定義へ代入すれば $\mathcal F_\tau=\mathcal F_m$。

### 採点基準（20点）
- 二場合分け：8点
- 定義への代入：8点
- 結論：4点
<!-- solution-end -->

## F0-00SP1-B01 最終最大時刻が停止時刻でない理由

- Level: B
- 目安時間: 15分

公平ランダムウォークを時刻 $N$ まで観測し、$\rho$ を最大値を最後に達成する時刻とする。$\rho$ が通常natural filtrationに対するstopping timeでない理由を、$\{\rho\le n\}$ の判定に必要な情報から説明せよ。

<!-- solution-start -->
### 詳細解答

時刻 $n<N$ まで同じpathを持つ二つの標本点でも、その後により高い値を更新するpathと更新しないpathを取れる。前者では最終最大時刻は $n$ より後、後者では $n$ 以下となり得る。従って $\{\rho\le n\}$ は時刻 $n$ までの情報だけでは判定できず、一般に $\mathcal F_n$ に属さない。

### 本番答案

未来に新最大値が出るかを知らないと $\rho\le n$ を判定できないため、$\{\rho\le n\}\notin\mathcal F_n$ が一般的でありstopping timeではない。

### 採点基準（20点）
- 同じ過去・異なる未来を指摘：8点
- $\{\rho\le n\}$ に言及：8点
- stopping time定義へ接続：4点
<!-- solution-end -->

## F0-00SP1-B02 $\mathcal F_\sigma\subset\mathcal F_\tau$

- Level: B
- 目安時間: 15分

stopping times $\sigma\le\tau$ に対して $\mathcal F_\sigma\subset\mathcal F_\tau$ を示せ。

<!-- solution-start -->
### 詳細解答

$A\in\mathcal F_\sigma$ とする。各 $n$ で

$$
A\cap\{\tau\le n\}
=A\cap\{\sigma\le n\}\cap\{\tau\le n\}.
$$

$A\cap\{\sigma\le n\}\in\mathcal F_n$ と $\{\tau\le n\}\in\mathcal F_n$ から右辺は $\mathcal F_n$。従って $A\in\mathcal F_\tau$。

### 本番答案

上の集合恒等式を使って $\mathcal F_\tau$ の定義を確認する。

### 採点基準（20点）
- 集合恒等式：8点
- 二つの可測性：8点
- 結論：4点
<!-- solution-end -->

---

## 章末チェック

- 確率過程とsample pathを区別できる。
- filtrationをσ代数の増加列として定義できる。
- natural filtrationとadaptednessを判定できる。
- stopping timeを $\{\tau\le n\}\in\mathcal F_n$ で確認できる。
- 初回到達時刻がstopping timeになる理由を証明できる。
- 未来を見て決める時刻との違いを説明できる。
- $\mathcal F_\tau$ を定義し、$\sigma\le\tau$ なら $\mathcal F_\sigma\subset\mathcal F_\tau$ を示せる。
- stopped processを定義できる。
