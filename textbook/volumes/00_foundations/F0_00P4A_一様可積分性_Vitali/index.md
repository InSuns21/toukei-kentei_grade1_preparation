# F0-00P4A 一様可積分性・Vitali：確率収束から $L^1$ 収束へ

確率収束は「大部分の標本で近い」ことしか保証しません。まれな巨大値は確率収束では見えにくくても、期待値を壊せます。

典型例は

$$
X_n=
\begin{cases}
n,&\text{確率 }1/n,\\
0,&\text{確率 }1-1/n.
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

### 1.1 例：一様有界な確率変数族

$|X_n|\le M$ a.s. が全ての $n$ で成り立つとします。

<!-- definition-example-start: def-f0-00p4a-ui -->
**定義の確認**  
$K>M$ なら $\{|X_n|>K\}=\varnothing$ a.s. なので

$$
E[|X_n|1_{\{|X_n|>K\}}]=0
\qquad(\forall n).
$$

従ってsupを取っても0であり、$K\to\infty$ の極限は0です。よって $\{X_n\}$ は一様可積分です。
<!-- definition-example-end -->

一様可積分性が制御しているのは単なる $P(|X_n|>K)$ ではなく、**tailが期待値へ寄与する量**です。

---

## 2. 確率収束だけでは足りない反例

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

したがって $X_n\xrightarrow{p}0$ です。しかし

$$
E|X_n|=1.
$$

さらに固定した $K$ に対し $n>K$ なら

$$
E[|X_n|1_{\{|X_n|>K\}}]=1,
$$

なので

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]=1.
$$

従ってこの族は一様可積分ではありません。「まれだが巨大」がVitaliの仮定から正確に排除されています。

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

が全ての $n$ で成り立ちます。$M=0$ なら自明です。従って積分の一様絶対連続性を持ちます。
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

よって一様 $L^1$ 有界です。

次に $\varepsilon>0$ を固定します。一様可積分性から $K>0$ を十分大きく取り

$$
\sup_{Y\in\mathcal X}
E[|Y|1_{\{|Y|>K\}}]<\frac{\varepsilon}{2}
$$

とします。$\delta:=\varepsilon/(2K)$ と置けば、$P(A)<\delta$ のとき

$$
\begin{aligned}
E[|Y|1_A]
&=E[|Y|1_{A\cap\{|Y|\le K\}}]
 +E[|Y|1_{A\cap\{|Y|>K\}}]\\
&\le KP(A)
 +E[|Y|1_{\{|Y|>K\}}]\\
&<K\delta+\frac{\varepsilon}{2}
=\varepsilon.
\end{aligned}
$$

これは全ての $Y\in\mathcal X$ に一様なので、積分の一様絶対連続性が従います。
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

$|X_n|>K$ 上では

$$
|X_n|
\le
K^{1-p}|X_n|^p.
$$

従って $C:=\sup_nE|X_n|^p<\infty$ と置けば

$$
\sup_nE[|X_n|1_{\{|X_n|>K\}}]
\le
CK^{1-p}\to0.
$$

よってUIです。
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

$|X_n|>K$ なら $Y>K$ なので

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

右辺は $K\to\infty$ で0へ行きます。例えば $Y1_{\{Y>K\}}\to0$ a.s. かつ $0\le Y1_{\{Y>K\}}\le Y\in L^1$ なので優収束定理を使えます。従って $\{X_n\}$ はUIです。
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

#### Step 2：$X$ が可積分であることを示す

$X_n\xrightarrow{p}X$ なので、[確率収束から概収束部分列を取る定理](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-probability-subsequence-as)から、ある部分列 $X_{n_k}$ が存在して

$$
X_{n_k}\xrightarrow{a.s.}X.
$$

従って $|X_{n_k}|\to|X|$ a.s. です。Fatouの補題より

$$
E|X|
\le
\liminf_{k\to\infty}E|X_{n_k}|
\le C<\infty.
$$

よって $X\in L^1$ です。

#### Step 3：$X$ 自身も小確率集合上で積分を小さくできる

$X\in L^1$ なので、任意の $\varepsilon>0$ に対してある $K_X>0$ を取り

$$
E[|X|1_{\{|X|>K_X\}}]<\frac{\varepsilon}{2}
$$

とできます。さらに $\delta_X:=\varepsilon/(2K_X)$ とすれば $P(A)<\delta_X$ から

$$
E[|X|1_A]
\le K_XP(A)+E[|X|1_{\{|X|>K_X\}}]
<\varepsilon.
$$

#### Step 4：大誤差が起きる集合だけを切り出す

UIの基本帰結より、同じ $\varepsilon>0$ に対してある $\delta_1>0$ が存在し

$$
P(A)<\delta_1
\Longrightarrow
\sup_nE[|X_n|1_A]<\varepsilon.
$$

$\delta:=\min(\delta_1,\delta_X)$ とします。確率収束から、十分大きい $n$ では

$$
A_n:=\{|X_n-X|>\varepsilon\}
$$

が $P(A_n)<\delta$ を満たします。

すると

$$
\begin{aligned}
E|X_n-X|
&=E[|X_n-X|1_{A_n^c}]
  +E[|X_n-X|1_{A_n}]\\
&\le \varepsilon
 +E[|X_n|1_{A_n}]
 +E[|X|1_{A_n}]\\
&<3\varepsilon.
\end{aligned}
$$

$\varepsilon>0$ は任意なので

$$
E|X_n-X|\to0.
$$

最後に

$$
|E[X_n]-E[X]|
\le E|X_n-X|\to0
$$

より期待値収束も従います。
<!-- proof-end -->

ここで重要なのは、確率収束そのものではなく

> 誤差が大きい集合の確率が小さい + その小確率集合上の積分がUIにより一様に小さい

という二段構えです。

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

つまり優収束定理はVitaliの枠組みからも理解できます。ただしDCTは $X$ の可積分性まで同時に直接与える非常に使いやすい十分条件です。

---

## 9. 演習

### F0-00P4A-A01 $L^p$ 有界性からUI

- Level: A
- 目安時間: 10分

ある $p>1$ と $C<\infty$ が存在して $\sup_nE|X_n|^p\le C$ とする。$\{X_n\}$ がUIであることを示せ。

<!-- solution-start -->
#### 詳細解答
$|X_n|>K$ 上で $|X_n|\le K^{1-p}|X_n|^p$。従って $E[|X_n|;|X_n|>K]\le CK^{1-p}$。supを取っても同じ上界で、$K\to\infty$ で0。

#### 本番答案
$\sup_nE[|X_n|;|X_n|>K]\le K^{1-p}\sup_nE|X_n|^p\le CK^{1-p}\to0$。

#### 採点基準（20点）
- tail上の不等式: 8点
- 一様上界: 7点
- 極限: 5点
<!-- solution-end -->

### F0-00P4A-A02 支配される族はUI

- Level: A
- 目安時間: 10分

$|X_n|\le Y$ a.s. for all $n$、$E|Y|<\infty$ とする。$\{X_n\}$ がUIであることを示せ。

<!-- solution-start -->
#### 詳細解答
$|X_n|>K$ なら $Y>K$ なので $|X_n|1_{|X_n|>K}\le Y1_{Y>K}$。期待値とsupを取り、右辺をDCTで0へ送る。

#### 本番答案
$\sup_nE[|X_n|;|X_n|>K]\le E[Y;Y>K]\to0$。

#### 採点基準（20点）
- 集合の包含: 6点
- 支配不等式: 7点
- tail極限: 7点
<!-- solution-end -->

### F0-00P4A-B01 UIから積分の一様絶対連続性

- Level: B
- 目安時間: 15分

$\{X_n\}$ がUIとする。任意の $\varepsilon>0$ に対し、$P(A)$ が十分小さければ

$$
\sup_nE[|X_n|1_A]<\varepsilon
$$

となることを示せ。

<!-- solution-start -->
#### 詳細解答
UIで $K$ を大きく取りtailを $\varepsilon/2$ 未満にする。$|X_n|\le K$ の部分は $KP(A)$ 以下。$\delta=\varepsilon/(2K)$ と取れば和が $\varepsilon$ 未満。

#### 本番答案
$E[|X_n|1_A]\le KP(A)+E[|X_n|;|X_n|>K]$ と分解し、先にUIでK、次にP(A)で制御する。

#### 採点基準（20点）
- 分解: 7点
- tail制御: 6点
- 小確率部分: 5点
- 一様性: 2点
<!-- solution-end -->

### F0-00P4A-B02 Vitaliの証明を再構成する

- Level: B
- 目安時間: 20分

$X_n\xrightarrow{p}X$ かつ $\{X_n\}$ がUIとする。次を順に示して $E|X_n-X|\to0$ を導け。

1. $X$ は可積分。
2. $A_n=\{|X_n-X|>\eta\}$ 上の積分を小さくできる。
3. $A_n^c$ 上では誤差が $\eta$ 以下。

<!-- solution-start -->
#### 詳細解答
確率収束からa.s.収束部分列を取り、UIによる一様L1有界性とFatouで $E|X|<\infty$。UIは積分の一様絶対連続性を与え、Xの可積分性も同じ性質を与える。確率収束でP(A_n)を十分小さくし、$E|X_n-X|\le\eta+E[|X_n|1_{A_n}]+E[|X|1_{A_n}]$ と評価する。

#### 本番答案
$a.s.$ 部分列 + Fatouで $X\in L^1$。UIと $X\in L^1$ から小確率集合上の積分を一様に小さくし、$A_n=\{|X_n-X|>\eta\}$ へ適用して $E|X_n-X|\le\eta+o(1)$。$\eta\downarrow0$。

#### 採点基準（20点）
- 極限の可積分性: 6点
- 小確率集合制御: 7点
- 誤差分解: 5点
- 結論: 2点
<!-- solution-end -->

---

## 章末チェック

- 一様可積分性をtail expectationの一様制御として定義できる。
- UIから一様 $L^1$ 有界性を導ける。
- UIから積分の一様絶対連続性を証明できる。
- $L^p$ 有界性、可積分な支配関数からUIを示せる。
- 確率収束列から概収束部分列を取って極限の可積分性を示せる。
- Vitali型収束定理を証明できる。
- 確率収束だけでは期待値収束しない反例を説明できる。

次は [F0-00P5 強大数則](../F0_00P5_大数の強法則/index.md) へ進めます。特性関数による分布収束へ進む場合は [F0-00P6](../F0_00P6_特性関数_中心極限定理/index.md) へ進みます。
