# Advanced 03 特性関数による中心極限定理

- 旧No.: 24
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：独立確率変数の積の期待値、標準化、分布収束の記号 $\xrightarrow{d}$
- **この問題で定義する**：特性関数 $\varphi_X(t)=E[e^{itX}]$
- **この問題で使用してよい事実**：特性関数の原点近傍展開、$n$ 乗極限の補題、Lévyの連続性定理
- **1級での扱い**：Lévyの連続性定理そのものの証明や複素解析を前提にしない。「特性関数が標準正規の特性関数へ収束すれば分布収束が従う」という橋渡しを理解することが目的

この問題では、中心極限定理の証明に必要な解析定理を暗黙の既知事項にしない。以下の事実は**問題中で与えられたものとして使用してよい**。

### 使用してよい事実A：特性関数の二次展開

$E[Y]=0$, $E[Y^2]=1$ なら、$Y$ の特性関数

$$
\varphi_Y(u)=E[e^{iuY}]
$$

は

$$
\boxed{
\varphi_Y(u)=1-\frac{u^2}{2}+o(u^2)
\qquad(u\to0)
}
$$

を満たす。

ここで $r(u)=o(u^2)$ とは

$$
\frac{r(u)}{u^2}\to0
$$

という意味である。

### 使用してよい事実B：$n$ 乗極限

複素数列 $v_n$ が $v_n\to v$ を満たすとき

$$
\boxed{
\left(1+\frac{v_n}{n}\right)^n\to e^v
}
$$

を用いてよい。

この補題により、特性関数が複素数値であることを気にして複素対数の枝まで議論する必要はない。

### 使用してよい事実C：Lévyの連続性定理（本問で使う向き）

<a id="thm-statmath-advanced24-levy"></a>

<!-- formal-statement-start -->
> **定理（Lévyの連続性定理：本問で使う向き）**  
> 確率変数列 $W_n$ の特性関数を $\varphi_n$ とします。ある確率変数 $W$ の特性関数 $\varphi$ に対して、すべての $t\in\mathbb R$ で

$$
\varphi_n(t)\to\varphi(t)
$$

> が成り立つなら

$$
\boxed{W_n\xrightarrow{d}W}
$$

> が成り立ちます。
<!-- formal-statement-end -->

確率変数列 $W_n$ の特性関数を $\varphi_n$ とする。ある確率分布の特性関数 $\varphi$ に対して

$$
\varphi_n(t)\to\varphi(t)
\qquad(\forall t\in\mathbb R)
$$

が成り立つなら、

$$
\boxed{W_n\xrightarrow{d}W}
$$

である。ここで $W$ は特性関数 $\varphi$ を持つ確率変数である。

## 問題

$X_1,X_2,\ldots$ は独立同分布で

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)
$$

とする。

$$
Y_i=\frac{X_i-\mu}{\sigma},
\qquad
S_n=\frac1{\sqrt n}\sum_{i=1}^nY_i
$$

と置く。

1. $Y_i$ の平均と分散を求め、$S_n$ を $X_1,\ldots,X_n$ を用いて表せ。
2. 特性関数の定義と独立性を用いて、
   $$
   \varphi_{S_n}(t)
   =\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^n
   $$
   を示せ。
3. 使用してよい事実Aから、固定した $t\in\mathbb R$ に対して
   $$
   \varphi_Y\left(\frac{t}{\sqrt n}\right)
   =1-\frac{t^2}{2n}+o(n^{-1})
   $$
   を示せ。さらに使用してよい事実Bを適用して
   $$
   \varphi_{S_n}(t)\to e^{-t^2/2}
   $$
   を示せ。
4. $e^{-t^2/2}$ が $N(0,1)$ の特性関数であることを確認し、使用してよい事実Cから
   $$
   \frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
   \xrightarrow{d}N(0,1)
   $$
   を結論せよ。

## 詳細解答

### 1. 標準化

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

だから

$$
E[Y_i]
=\frac{E[X_i]-\mu}{\sigma}
=0,
$$

また

$$
\operatorname{Var}(Y_i)
=\frac{\operatorname{Var}(X_i)}{\sigma^2}
=1.
$$

したがって

$$
E[Y_i]=0,
\qquad
E[Y_i^2]=1.
$$

さらに

$$
\begin{aligned}
S_n
&=\frac1{\sqrt n}\sum_{i=1}^n\frac{X_i-\mu}{\sigma}\\
&=\boxed{
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
}.
\end{aligned}
$$

従って $S_n\xrightarrow{d}N(0,1)$ を示せば中心極限定理が得られる。

### 2. 標準化和の特性関数

特性関数の定義から

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E[e^{itS_n}]\\
&=E\left[
\exp\left\{\frac{it}{\sqrt n}\sum_{j=1}^nY_j\right\}
\right]\\
&=E\left[
\prod_{j=1}^n e^{itY_j/\sqrt n}
\right].
\end{aligned}
$$

$Y_1,\ldots,Y_n$ は独立なので、積の期待値は期待値の積に分解できる。

$$
\begin{aligned}
\varphi_{S_n}(t)
&=\prod_{j=1}^nE[e^{itY_j/\sqrt n}]\\
&=\prod_{j=1}^n\varphi_Y\left(\frac t{\sqrt n}\right)\\
&=\boxed{
\left[\varphi_Y\left(\frac t{\sqrt n}\right)\right]^n
}.
\end{aligned}
$$

最後の等号では同分布性を使っている。

### 3. 二次展開と $n$ 乗極限

使用してよい事実Aを

$$
\varphi_Y(u)
=1-\frac{u^2}{2}+r(u),
\qquad
\frac{r(u)}{u^2}\to0
$$

と書く。

$u=t/\sqrt n$ を代入すると

$$
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}
+r\left(\frac t{\sqrt n}\right).
$$

$t\ne0$ のとき

$$
\begin{aligned}
\frac{r(t/\sqrt n)}{1/n}
&=t^2
\frac{r(t/\sqrt n)}{t^2/n}\\
&\to0,
\end{aligned}
$$

したがって

$$
r\left(\frac t{\sqrt n}\right)=o(n^{-1}).
$$

$t=0$ では $\varphi_Y(0)=1$ なので自明である。よって

$$
\boxed{
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}+o(n^{-1})
}.
$$

ここで $o(n^{-1})$ を

$$
o(n^{-1})=\frac{\eta_n}{n},
\qquad
\eta_n\to0
$$

と書けば

$$
\varphi_Y\left(\frac t{\sqrt n}\right)
=1+\frac{v_n}{n},
\qquad
v_n=-\frac{t^2}{2}+\eta_n.
$$

従って

$$
v_n\to-\frac{t^2}{2}.
$$

使用してよい事実Bから

$$
\begin{aligned}
\varphi_{S_n}(t)
&=\left(1+\frac{v_n}{n}\right)^n\\
&\longrightarrow
\boxed{e^{-t^2/2}}.
\end{aligned}
$$

ここでは複素対数を新しい前提知識として要求していない。

### 4. Lévyの連続性定理による結論

標準正規分布 $Z\sim N(0,1)$ の特性関数は

$$
\boxed{
\varphi_Z(t)=e^{-t^2/2}
}.
$$

したがって問3は

$$
\varphi_{S_n}(t)\to\varphi_Z(t)
\qquad(\forall t\in\mathbb R)
$$

を示している。

使用してよい事実C、すなわちLévyの連続性定理から

$$
S_n\xrightarrow{d}Z\sim N(0,1).
$$

問1で

$$
S_n
=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
$$

であったから

$$
\boxed{
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\xrightarrow{d}N(0,1)
}.
$$

### 証明全体の見取り図

この証明は

$$
\boxed{
\begin{array}{c}
\text{独立な和}\\
\downarrow\\
\text{特性関数では積}\\
\downarrow\\
\text{原点近傍の2次展開}\\
\downarrow\\
\left(1-\frac{t^2}{2n}+o(n^{-1})\right)^n
\to e^{-t^2/2}\\
\downarrow\\
\text{Lévyの連続性定理}\\
\downarrow\\
N(0,1)\text{ への分布収束}
\end{array}
}
$$

という一本の流れである。

Advancedで要求しているのはこの論理を追えることであり、Lévyの定理や複素解析を別途暗記していることではない。

## 本番答案

### (1)

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

と置けば

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=1,
$$

かつ

$$
S_n
=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}.
$$

### (2)

特性関数の定義と独立性より

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E\left[\prod_{i=1}^ne^{itY_i/\sqrt n}\right]\\
&=\prod_{i=1}^nE[e^{itY_i/\sqrt n}]\\
&=\left[\varphi_Y(t/\sqrt n)\right]^n.
\end{aligned}
$$

### (3)

与えられた展開から

$$
\varphi_Y(t/\sqrt n)
=1-\frac{t^2}{2n}+o(n^{-1}).
$$

これを

$$
1+\frac{v_n}{n},
\qquad
v_n\to-\frac{t^2}{2}
$$

と書けば、与えられた $n$ 乗極限より

$$
\varphi_{S_n}(t)	o e^{-t^2/2}.
$$

### (4)

$e^{-t^2/2}$ は $N(0,1)$ の特性関数。Lévyの連続性定理より

$$
S_n\xrightarrow{d}N(0,1).
$$

従って

$$
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\xrightarrow{d}N(0,1).
$$

## 採点基準

- 小問1（標準化、平均・分散、$S_n$ の表示）: 4点
- 小問2（特性関数の定義から積表示を導出）: 5点
- 小問3（二次展開、$o(n^{-1})$、与えられた $n$ 乗極限の適用）: 8点
- 小問4（標準正規の特性関数、Lévyの連続性定理の適用）: 3点
