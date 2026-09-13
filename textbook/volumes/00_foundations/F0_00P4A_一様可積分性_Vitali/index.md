# F0-00P4A 一様可積分性・Vitali：確率収束から $L^1$ 収束へ

<!-- definition-example-audit: strict -->

確率収束は「大部分の標本で近い」ことしか保証しません。まれな巨大値は確率収束では見えにくくても、期待値を壊せます。

典型例は

$$
X_n=
\begin{cases}
n,&\text{確率 }1/n,\\
0,&\text{確率 }1-1/n
\end{cases}
$$

です。$X_n\xrightarrow{p}0$ なのに $E[X_n]=1$ のままです。

この穴を埋める条件が**一様可積分性**です。この章では

```text
uniform integrability
  ↓
uniform L1 bound + 積分の一様絶対連続性
  ↓
確率収束からa.s.収束部分列を抽出
  ↓ Fatou
極限 X の可積分性
  ↓
Vitali：probability + UI ⇒ L1
  ↑
L1 ⇒ probability + UI
```

まで証明します。

---

## 1. 一様可積分性

<a id="def-f0-00p4a-ui"></a>

<!-- formal-statement-start -->
> **定義（一様可積分性）**  
> 可積分確率変数族 $\mathcal X$ が一様可積分であるとは

$$
\boxed{
\lim_{K\to\infty}
\sup_{Y\in\mathcal X}
E\left[|Y|1_{\{|Y|>K\}}\right]
=0
}
$$

> が成り立つことです。列 $\{X_n\}$ に対しては $\sup_{Y\in\mathcal X}$ を $\sup_n$ と書きます。
<!-- formal-statement-end -->

量化を展開すると、これは

$$
\boxed{
\forall\varepsilon>0\ \exists K_0<\infty\ \forall K\ge K_0:\quad
\sup_{Y\in\mathcal X}E[|Y|1_{\{|Y|>K\}}]<\varepsilon
}
$$

という意味です。$K$ は $Y$ や $n$ ごとに選んではならず、**族全体に共通のtail cutoff** である点が核心です。

### 1.1 例：一様有界な確率変数族

$|X_n|\le M$ a.s. が全ての $n$ で成り立つとします。

<!-- definition-example-start: def-f0-00p4a-ui -->
**定義の確認**  
$K>M$ なら $\{|X_n|>K\}=\varnothing$ a.s. なので

$$
E[|X_n|1_{\{|X_n|>K\}}]=0
\qquad(\forall n).
$$

従ってsupを取っても0であり、上の $\varepsilon$-$K_0$ 量化では例えば $K_0=M+1$ と取れます。よって $\{X_n\}$ は一様可積分です。
<!-- definition-example-end -->

一様可積分性が制御しているのは単なる $P(|X_n|>K)$ ではなく、**tailが期待値へ寄与する量**です。

---

## 2. $L^1$ bounded だけでは足りない反例

冒頭の

$$
P(X_n=n)=\frac1n,
\qquad
P(X_n=0)=1-\frac1n
$$

を考えます。任意の $\varepsilon>0$ で、十分大きい $n$ について

$$
P(|X_n|>\varepsilon)=\frac1n\to0,
$$

したがって $X_n\xrightarrow{p}0$ です。一方

$$
E|X_n|=n\cdot\frac1n=1
$$

なので

$$
\sup_nE|X_n|=1<\infty.
$$

つまり族は一様に $L^1$ 有界です。それでもUIではありません。実際、固定した $K$ に対し $n>K$ を一つ取れば

$$
E[|X_n|1_{\{|X_n|>K\}}]
=nP(X_n=n)=1.
$$

従って全ての $K$ について

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]=1,
$$

となり、$K\to\infty$ でも0へ行きません。「期待値の総量が一様に有限」だけでは、質量が遠方へ逃げることを防げないわけです。

---

## 3. 積分の一様絶対連続性

<a id="def-f0-00p4a-uac"></a>

<!-- formal-statement-start -->
> **定義（積分の一様絶対連続性）**  
> 可積分確率変数族 $\mathcal X$ が積分の一様絶対連続性を持つとは、任意の $\varepsilon>0$ に対して $\delta>0$ が存在し、任意の事象 $A$ について

$$
P(A)<\delta
\quad\Longrightarrow\quad
\boxed{
\sup_{Y\in\mathcal X}E[|Y|1_A]<\varepsilon
}
$$

> が成り立つことです。
<!-- formal-statement-end -->

### 3.1 例：一様有界族

<!-- definition-example-start: def-f0-00p4a-uac -->
**定義の確認**  
$|X_n|\le M$ a.s. とします。$M>0$ なら $\delta=\varepsilon/M$ と取れば、$P(A)<\delta$ から

$$
E[|X_n|1_A]\le MP(A)<M\delta=\varepsilon
$$

が全ての $n$ で成り立ちます。$M=0$ なら左辺は常に0です。従って積分の一様絶対連続性を持ちます。
<!-- definition-example-end -->

---

<a id="lem-f0-00p4a-ui-consequences"></a>

## 4. UIから一様 $L^1$ 有界性と積分の一様絶対連続性

<!-- formal-statement-start -->
> **補題（UIの二つの基本帰結）**  
> 可積分確率変数族 $\mathcal X$ が一様可積分なら

$$
\boxed{
\sup_{Y\in\mathcal X}E|Y|<\infty
}
$$

> であり、さらに $\mathcal X$ は積分の一様絶対連続性を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：値を $K$ 以下とtailに分ける

**一様 $L^1$ 有界性。**  
一様可積分性から、ある $K_0>0$ を取って

$$
\sup_{Y\in\mathcal X}
E[|Y|1_{\{|Y|>K_0\}}]<1
$$

とできます。従って任意の $Y\in\mathcal X$ で

$$
\begin{aligned}
E|Y|
&=E[|Y|1_{\{|Y|\le K_0\}}]
 +E[|Y|1_{\{|Y|>K_0\}}]\\
&\le K_0+1.
\end{aligned}
$$

右辺は $Y$ に依存しないので

$$
\sup_{Y\in\mathcal X}E|Y|\le K_0+1<\infty.
$$

**積分の一様絶対連続性。**  
$\varepsilon>0$ を固定します。一様可積分性から $K>0$ を十分大きく取り

$$
\sup_{Y\in\mathcal X}
E[|Y|1_{\{|Y|>K\}}]<\frac{\varepsilon}{2}
$$

とします。次に

$$
\delta:=\frac{\varepsilon}{2K}
$$

と置きます。$P(A)<\delta$ のとき、任意の $Y\in\mathcal X$ について

$$
\begin{aligned}
E[|Y|1_A]
&=E[|Y|1_{A\cap\{|Y|\le K\}}]
 +E[|Y|1_{A\cap\{|Y|>K\}}]\\
&\le KP(A)
 +E[|Y|1_{\{|Y|>K\}}]\\
&<K\delta+\frac{\varepsilon}{2}\\
&=\varepsilon.
\end{aligned}
$$

最初に $K$ を族全体へ共通に選び、その後で $\delta$ を決めたため、この評価は全ての $Y$ に一様です。$\square$
<!-- proof-end -->

---

<a id="thm-f0-00p4a-lp-ui"></a>

## 5. $L^p$ 有界性はUIの十分条件

<!-- formal-statement-start -->
> **定理（$L^p$ 有界性から一様可積分性）**  
> ある $p>1$ について

$$
\sup_nE|X_n|^p<\infty
$$

> なら $\{X_n\}$ は一様可積分です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：tail上で $|X_n|$ を $|X_n|^p$ に持ち上げる

$|X_n|>K$ 上では $p>1$ より

$$
|X_n|
=|X_n|^p|X_n|^{1-p}
\le K^{1-p}|X_n|^p.
$$

従って $C:=\sup_nE|X_n|^p<\infty$ と置けば

$$
\begin{aligned}
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
&\le K^{1-p}\sup_nE|X_n|^p\\
&\le CK^{1-p}\to0.
\end{aligned}
$$

ここで $p>1$ を使ったのは $1-p<0$、すなわち $K^{1-p}\to0$ とする箇所です。$\square$
<!-- proof-end -->

---

<a id="thm-f0-00p4a-dominated-ui"></a>

## 6. 一つの可積分確率変数で支配される族はUI

<!-- formal-statement-start -->
> **定理（可積分な支配関数から一様可積分性）**  
> $Y\in L^1$ が存在して

$$
|X_n|\le Y
\qquad\text{a.s. for all }n
$$

> なら $\{X_n\}$ は一様可積分です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：$X_n$ のtailを $Y$ のtailへ押し込む

$|X_n|>K$ なら $Y\ge|X_n|>K$ なので

$$
|X_n|1_{\{|X_n|>K\}}
\le
Y1_{\{Y>K\}}.
$$

従って

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
\le
E[Y1_{\{Y>K\}}].
$$

右辺は $K\to\infty$ で0へ行きます。実際、$Y1_{\{Y>K\}}\to0$ a.s. かつ

$$
0\le Y1_{\{Y>K\}}\le Y\in L^1
$$

なので優収束定理を使えます。従って $\{X_n\}$ はUIです。$\square$
<!-- proof-end -->

これは優収束定理がVitaliより強いtail controlを仮定していることを示します。

---

<a id="thm-f0-00p4a-vitali"></a>

## 7. Vitali型収束定理

<!-- formal-statement-start -->
> **定理（Vitali型収束定理）**  
> 同一の確率空間上の可積分確率変数列 $X_n$ が $X$ へ確率収束し、族 $\{X_n:n\ge1\}$ が一様可積分であるとします。このとき $X$ も可積分で

$$
\boxed{
E|X_n-X|\to0
}
$$

> が成り立ちます。特に $E[X_n]\to E[X]$ です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：a.s.部分列で極限の可積分性を得て、小確率集合をUIで消す

#### Step 1：UIから $\sup_nE|X_n|<\infty$

[UIの基本帰結](#lem-f0-00p4a-ui-consequences)より

$$
C:=\sup_nE|X_n|<\infty.
$$

#### Step 2：確率収束からa.s.収束部分列を取り、$X\in L^1$ を得る

$X_n\xrightarrow{p}X$ なので、[確率収束から概収束部分列を取る定理](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-probability-subsequence-as)から、ある部分列 $X_{n_k}$ が存在して

$$
X_{n_k}\xrightarrow{a.s.}X.
$$

従って $|X_{n_k}|\to|X|$ a.s. です。[Fatouの補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)より

$$
E|X|
\le
\liminf_{k\to\infty}E|X_{n_k}|
\le C<\infty.
$$

ここでFatouを使った箇所が、UIで得た一様 $L^1$ bound を極限 $X$ の可積分性へ渡す箇所です。

#### Step 3：$X$ を族へ加えてもUIである

$X\in L^1$ なので

$$
E[|X|1_{\{|X|>K\}}]\to0
$$

です。したがって

$$
\sup_{Z\in\{X_1,X_2,\dots,X\}}
E[|Z|1_{\{|Z|>K\}}]
$$

は、$\{X_n\}$ のtail supと $X$ 一個のtailの最大値であり、$K\to\infty$ で0へ行きます。よって

$$
\{X_1,X_2,\dots,X\}
$$

もUIです。[UIの基本帰結](#lem-f0-00p4a-ui-consequences)をこの拡大した族へ適用すると、任意の $\varepsilon>0$ に対して $\delta>0$ が存在し、

$$
P(A)<\delta
\Longrightarrow
\sup_{Z\in\{X_1,X_2,\dots,X\}}E[|Z|1_A]<\varepsilon
$$

となります。

#### Step 4：大誤差集合 $A_n$ を切り出す

ここでは「誤差の高さ」と「小集合上の積分誤差」を別の記号で管理します。任意の $\eta>0$ と $\varepsilon>0$ を固定し、Step 3から上の $\delta$ を取ります。

$$
A_n:=\{|X_n-X|>\eta\}
$$

と置きます。確率収束から $P(A_n)\to0$ なので、十分大きい $n$ では $P(A_n)<\delta$ です。そのとき

$$
\begin{aligned}
E|X_n-X|
&=E[|X_n-X|1_{A_n^c}]
 +E[|X_n-X|1_{A_n}]\\
&\le \eta
 +E[|X_n|1_{A_n}]
 +E[|X|1_{A_n}]\\
&<\eta+2\varepsilon.
\end{aligned}
$$

したがって

$$
\limsup_{n\to\infty}E|X_n-X|
\le\eta+2\varepsilon.
$$

まず $\varepsilon\downarrow0$ とすれば

$$
\limsup_{n\to\infty}E|X_n-X|\le\eta.
$$

さらに $\eta\downarrow0$ とすれば、左辺は非負なので

$$
E|X_n-X|\to0.
$$

最後に

$$
|E[X_n]-E[X]|
\le E|X_n-X|\to0
$$

より期待値収束も従います。$\square$
<!-- proof-end -->

ここで重要なのは

> 大誤差集合の確率が小さい + 小確率集合上の積分がUIにより一様に小さい

という二段構えです。確率収束だけでは後半がありません。

### 7.1 逆向き：$L^1$ 収束なら確率収束し、族はUIになる

Vitaliの逆向きも閉じておきます。$X_n\to X$ in $L^1$、すなわち

$$
\|X_n-X\|_1=E|X_n-X|\to0
$$

とします。

**確率収束。**  
任意の $\eta>0$ に対しMarkovの不等式から

$$
P(|X_n-X|>\eta)
\le\frac{E|X_n-X|}{\eta}
\to0.
$$

従って $X_n\xrightarrow{p}X$ です。

**一様可積分性。**  
$K>0$ に対して次の点ごとの評価が成り立ちます。

$$
\boxed{
|X_n|1_{\{|X_n|>K\}}
\le
|X|1_{\{|X|>K/2\}}+2|X_n-X|
}
$$

確認します。$|X_n|\le K$ なら左辺は0です。$|X_n|>K$ のとき、もし $|X|>K/2$ なら三角不等式

$$
|X_n|\le |X|+|X_n-X|
$$

で右辺が左辺以上です。一方 $|X|\le K/2$ なら

$$
|X_n-X|
\ge |X_n|-|X|
>|X_n|-\frac K2
>\frac{|X_n|}{2},
$$

なので $|X_n|<2|X_n-X|$ です。

よって期待値を取ると

$$
E[|X_n|1_{\{|X_n|>K\}}]
\le
E[|X|1_{\{|X|>K/2\}}]
+2\|X_n-X\|_1.
$$

$\varepsilon>0$ を固定します。まず $L^1$ 収束から $N$ を取り、$n\ge N$ なら

$$
2\|X_n-X\|_1<\frac\varepsilon2
$$

とします。次に $X\in L^1$ なので $K_1$ を取り、$K\ge K_1$ なら

$$
E[|X|1_{\{|X|>K/2\}}]<\frac\varepsilon2
$$

とできます。したがって $n\ge N$ の全てについてtailは $\varepsilon$ 未満です。

残る $X_1,\dots,X_{N-1}$ は有限個で、各々が $L^1$ です。よってある $K_2$ を十分大きく取れば、$K\ge K_2$ で

$$
E[|X_n|1_{\{|X_n|>K\}}]<\varepsilon
\qquad(n<N)
$$

を同時に満たせます。$K\ge\max(K_1,K_2)$ とすれば全ての $n$ に対してtailが $\varepsilon$ 未満なので

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]\to0.
$$

従って $\{X_n\}$ はUIです。

以上から、可積分確率変数列について

$$
\boxed{
X_n\to X\text{ in }L^1
\iff
X_n\xrightarrow{p}X\ \text{かつ }\{X_n\}\text{ がUI}
}
$$

と理解できます。右から左ではVitali本体が $X\in L^1$ も同時に証明します。

---

## 8. 優収束定理との関係

もし

$$
X_n\to X\quad\text{a.s.},
\qquad
|X_n|\le Y\in L^1
$$

なら、概収束から確率収束し、[可積分な支配関数からUI](#thm-f0-00p4a-dominated-ui)より $\{X_n\}$ はUIです。従ってVitaliから

$$
E|X_n-X|\to0.
$$

つまり優収束定理はVitaliの枠組みからも理解できます。ただしDCTは共通の支配関数という、より直接的で強い十分条件を仮定します。

---

## 9. 演習A

### F0-00P4A-A01 $L^p$ 有界性からUI

- Level: A
- 目安時間: 10分

ある $p>1$ と $C<\infty$ が存在して $\sup_nE|X_n|^p\le C$ とする。$\{X_n\}$ がUIであることを示せ。

<!-- solution-start -->
#### 詳細解答
$|X_n|>K$ 上では $1-p<0$ なので

$$
|X_n|
=|X_n|^p|X_n|^{1-p}
\le K^{1-p}|X_n|^p.
$$

従って

$$
\begin{aligned}
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
&\le K^{1-p}\sup_nE|X_n|^p\\
&\le CK^{1-p}.
\end{aligned}
$$

$p>1$ だから $K^{1-p}\to0$。よってUIの定義を満たします。
<!-- solution-end -->

### F0-00P4A-A02 支配される族はUI

- Level: A
- 目安時間: 10分

$|X_n|\le Y$ a.s. for all $n$、$E|Y|<\infty$ とする。$\{X_n\}$ がUIであることを示せ。

<!-- solution-start -->
#### 詳細解答
$|X_n|>K$ なら $Y\ge|X_n|>K$ なので

$$
|X_n|1_{\{|X_n|>K\}}
\le Y1_{\{Y>K\}}.
$$

従って

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
\le E[Y1_{\{Y>K\}}].
$$

右辺は $Y\in L^1$ とDCTから0へ収束します。上界が $n$ に依存しないため、一様可積分性が得られます。
<!-- solution-end -->

### F0-00P4A-A03 unbounded でもUIになり得る

- Level: A
- 目安時間: 12分

事象 $A_n$ が $P(A_n)=1/n^2$ を満たし、

$$
X_n=n\mathbf1_{A_n}
$$

とする。$\sup_n\|X_n\|_\infty=\infty$ であるにもかかわらず $\{X_n\}$ がUIであることを、tailを直接計算して示せ。

<!-- solution-start -->
#### 詳細解答
$X_n$ は $0$ または $n$ を取ります。固定した $K>0$ に対し、$n\le K$ なら $|X_n|>K$ は起こらないのでtail期待値は0です。$n>K$ なら

$$
E[|X_n|1_{\{|X_n|>K\}}]
=nP(A_n)
=\frac1n.
$$

従って

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
=\sup_{n>K}\frac1n
=\frac1{\lfloor K\rfloor+1}
\to0.
$$

振幅 $n$ 自体は無限に大きくなっても、その発生確率 $1/n^2$ が十分速く減るためtailの期待値寄与は消えます。
<!-- solution-end -->

### F0-00P4A-A04 $L^1$ bounded だがUIでない

- Level: A
- 目安時間: 12分

$P(A_n)=1/n$、$X_n=n\mathbf1_{A_n}$ とする。

1. $\sup_nE|X_n|<\infty$ を示せ。
2. $\{X_n\}$ がUIでないことをtailから示せ。
3. $X_n\xrightarrow{p}0$ も確認せよ。

<!-- solution-start -->
#### 詳細解答
1. 各 $n$ で

$$
E|X_n|=nP(A_n)=1,
$$

したがって $\sup_nE|X_n|=1$ です。

2. 任意の $K$ に対し $n>K$ を選べば、$A_n$ 上で $|X_n|=n>K$ なので

$$
E[|X_n|1_{\{|X_n|>K\}}]
=nP(A_n)=1.
$$

従って

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]=1
$$

であり、$K\to\infty$ でも0になりません。よってUIではありません。

3. $\eta>0$ を固定すると、$n>\eta$ では

$$
P(|X_n|>\eta)=P(A_n)=\frac1n\to0.
$$

よって確率収束します。この例が「確率収束 + 一様 $L^1$ bounded」だけでは $L^1$ 収束を保証できない反例です。
<!-- solution-end -->

---

## 10. 演習B

### F0-00P4A-B01 UIから積分の一様絶対連続性

- Level: B
- 目安時間: 15分

$\{X_n\}$ がUIとする。任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して

$$
P(A)<\delta
\Longrightarrow
\sup_nE[|X_n|1_A]<\varepsilon
$$

となることを、$|X_n|\le K$ の部分とtailに分けて示せ。

<!-- solution-start -->
#### 詳細解答
$\varepsilon>0$ を固定します。UIより、ある $K$ を全ての $n$ に共通に選んで

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]<\frac\varepsilon2
$$

とできます。次に $\delta=\varepsilon/(2K)$ とします。$P(A)<\delta$ なら各 $n$ について

$$
\begin{aligned}
E[|X_n|1_A]
&\le E[|X_n|1_{A\cap\{|X_n|\le K\}}]
 +E[|X_n|1_{\{|X_n|>K\}}]\\
&\le KP(A)+E[|X_n|1_{\{|X_n|>K\}}]\\
&<K\delta+\frac\varepsilon2
=\varepsilon.
\end{aligned}
$$

$K,\delta$ は $n$ に依存しないのでsupを取っても不等式が保たれます。
<!-- solution-end -->

### F0-00P4A-B02 $L^p$ bound とVitaliを組み合わせる

- Level: B
- 目安時間: 18分

$X_n\xrightarrow{p}X$ かつ、ある $p>1$ と $C<\infty$ について

$$
\sup_nE|X_n|^p\le C
$$

とする。$X\in L^1$ と $E|X_n-X|\to0$ を示せ。どの段階で $p>1$ を使うかも明記せよ。

<!-- solution-start -->
#### 詳細解答
まず $p>1$ と一様 $L^p$ bound から、A01と同じtail評価

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
\le CK^{1-p}\to0
$$

が得られます。ここで $p>1$ を使っています。従って $\{X_n\}$ はUIです。

仮定には $X_n\xrightarrow{p}X$ もあるので、Vitali型収束定理を適用できます。定理の証明中でa.s.収束部分列とFatouから $X\in L^1$ が従い、その後

$$
E|X_n-X|\to0
$$

を得ます。単に「$L^p$ boundだから $L^1$ 収束」とするのではなく、

$$
L^p\text{ bound }\Rightarrow UI,
\qquad
\text{probability}+UI\Rightarrow L^1
$$

という2段階です。
<!-- solution-end -->

### F0-00P4A-B03 $L^1$ 収束からUIを証明する

- Level: B
- 目安時間: 22分

$X_n\to X$ in $L^1$ とする。次の不等式を示し、$\{X_n\}$ がUIであることを証明せよ。

$$
|X_n|1_{\{|X_n|>K\}}
\le
|X|1_{\{|X|>K/2\}}+2|X_n-X|.
$$

<!-- solution-start -->
#### 詳細解答
$|X_n|\le K$ なら左辺は0です。$|X_n|>K$ とします。

- $|X|>K/2$ なら、三角不等式から
  $|X_n|\le|X|+|X_n-X|$ なので右辺が左辺を上回ります。
- $|X|\le K/2$ なら

$$
|X_n-X|
\ge|X_n|-|X|
>|X_n|-\frac K2
>\frac{|X_n|}{2},
$$

よって $|X_n|<2|X_n-X|$ です。

従って期待値を取れば

$$
E[|X_n|1_{\{|X_n|>K\}}]
\le
E[|X|1_{\{|X|>K/2\}}]+2\|X_n-X\|_1.
$$

$\varepsilon>0$ を固定し、まず $N$ を十分大きくして $n\ge N$ なら第2項を $\varepsilon/2$ 未満にします。次に $X\in L^1$ から $K$ を大きくして第1項を $\varepsilon/2$ 未満にします。これで $n\ge N$ のtailは一様に $\varepsilon$ 未満です。

残る $n<N$ は有限個です。各 $X_n\in L^1$ なので、さらに $K$ を大きくすれば有限個すべてのtailを同時に $\varepsilon$ 未満にできます。したがって

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]\to0,
$$

すなわちUIです。
<!-- solution-end -->

---

## 11. 演習C

### F0-00P4A-C01 条件付き期待値の族はUIになる

- Level: C
- 目安時間: 30分

この問題では [P3Aの条件付き期待値](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md#def-f0-00p3a-conditional-expectation) を使う。$X\in L^1$ とし、部分 $\sigma$ 代数 $\mathcal G_n$ に対して

$$
Z_n:=E[X\mid\mathcal G_n]
$$

と置く。$\{Z_n\}$ がUIであることを示せ。$\mathcal G_n$ が増大列であることは仮定しなくてよい。

<!-- solution-start -->
#### 詳細解答
条件付き期待値の単調性を $-|X|\le X\le|X|$ に適用すると

$$
-E[|X|\mid\mathcal G_n]
\le Z_n
\le E[|X|\mid\mathcal G_n],
$$

したがって

$$
|Z_n|\le E[|X|\mid\mathcal G_n]
\qquad\text{a.s.}
$$

です。特に

$$
E|Z_n|\le E|X|
$$

なのでMarkovの不等式から、

$$
A_{n,K}:=\{|Z_n|>K\}\in\mathcal G_n
$$

に対して

$$
P(A_{n,K})
\le\frac{E|Z_n|}{K}
\le\frac{E|X|}{K}.
$$

右辺は $n$ に依存せず $K\to\infty$ で0へ行きます。

次に $A_{n,K}\in\mathcal G_n$ を使います。上の絶対値不等式と条件付き期待値の積分保存性から

$$
\begin{aligned}
E[|Z_n|1_{A_{n,K}}]
&\le E[E(|X|\mid\mathcal G_n)1_{A_{n,K}}]\\
&=E[|X|1_{A_{n,K}}].
\end{aligned}
$$

$X\in L^1$ なので、その積分は小測度集合上で絶対連続です。すなわち任意の $\varepsilon>0$ に対して $\delta>0$ があり、$P(A)<\delta$ なら

$$
E[|X|1_A]<\varepsilon.
$$

そこで $K$ を十分大きく取り

$$
\frac{E|X|}{K}<\delta
$$

とすれば、全ての $n$ について $P(A_{n,K})<\delta$ なので

$$
E[|Z_n|1_{\{|Z_n|>K\}}]
\le E[|X|1_{A_{n,K}}]
<\varepsilon.
$$

従って

$$
\sup_nE[|Z_n|1_{\{|Z_n|>K\}}]<\varepsilon,
$$

つまり $\{E[X\mid\mathcal G_n]\}$ はUIです。増大性を一度も使っていないので、任意の部分 $\sigma$ 代数族に対して成立します。
<!-- solution-end -->

---

## 12. 章末チェック

- 一様可積分性をtail expectationの一様制御として、$\varepsilon$-$K$ の量化まで含めて定義できる。
- 一様 $L^1$ bounded だけではUIにならない反例で、tailが消えないことを計算できる。
- UIから一様 $L^1$ 有界性と積分の一様絶対連続性を証明できる。
- $L^p$ 有界性、可積分な支配関数からUIを示せる。
- 確率収束列からa.s.収束部分列を取り、Fatouで極限の可積分性を示せる。
- $\{X_n\}$ に極限 $X$ を加えてもUIである根拠を説明できる。
- Vitaliの大誤差集合分解から $\limsup E|X_n-X|\le\eta$ を導き、$\eta\downarrow0$ で $L^1$ 収束を得られる。
- 逆に $L^1$ 収束からMarkovで確率収束を、tail不等式と有限個＋tail分割でUIを示せる。
- 条件付き期待値 $E[X\mid\mathcal G_n]$ の族がUIになることを、小測度集合上の $X$ の積分制御から証明できる。

次は [F0-00P5 強大数則](../F0_00P5_大数の強法則/index.md) へ進めます。特性関数による分布収束へ進む場合は [F0-00P6](../F0_00P6_特性関数_中心極限定理/index.md) へ進みます。
