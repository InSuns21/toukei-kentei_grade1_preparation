# F0-00P6B：希少 Bernoulli 三角配列の Poisson 極限

通常教材 P4-02 では、二項分布

$$
\operatorname{Bin}(n,p_n),
\qquad
p_n\to0,\quad np_n\to\lambda
$$

が $\operatorname{Poisson}(\lambda)$ へ近づく [少数法則](../../02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md#law-of-small-numbers-syllabus) を扱いました。

しかし現実の希少事象は「全ての個体が同じ確率 $p_n$」とは限りません。機械ごとに故障率が違う、契約ごとに事故率が違う、観測セルごとに発生率が違う、という方が普通です。

本章では

$$
S_n=\sum_{k=1}^{m_n}X_{n,k}
$$

で、同じ行の $X_{n,k}$ は独立な Bernoulli 変数だが成功確率 $p_{n,k}$ は異なってよい、という三角配列を扱います。

結論は、

- 一個一個は十分まれで、
- 全体の期待件数だけが $\lambda$ に落ち着く

なら、総件数は Poisson 分布へ収束する、というものです。

---

## 1. 行ごとに成功確率が変わる Bernoulli 配列

<a id="def-p6b-rare-bernoulli-array"></a>

<!-- formal-statement-start -->
> **定義（希少 Bernoulli 三角配列）**  
> 各 $n$ に対し
>
$$
X_{n,1},\ldots,X_{n,m_n}
$$
>
> を互いに独立な Bernoulli 確率変数とし
>
$$
P(X_{n,k}=1)=p_{n,k},
\qquad
P(X_{n,k}=0)=1-p_{n,k}
$$
>
> とする。さらに
>
$$
\max_{1\le k\le m_n}p_{n,k}\to0
$$
>
> を満たすとき、この配列を本章では希少 Bernoulli 三角配列と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-p6b-rare-bernoulli-array -->
### 直接例：成功確率 $1/n$ の三角配列

**定義の確認**

各 $n$ で $m_n=n$ とし、$X_{n,1},\ldots,X_{n,n}$ を独立な Bernoulli 変数、
$$
P(X_{n,k}=1)=\frac1n
$$
とします。このとき
$$
\max_{1\le k\le n}p_{n,k}=\frac1n\to0.
$$
従ってこれは希少 Bernoulli 三角配列です。さらに成功確率の総和は $1$ なので、後で Poisson$(1)$ 極限の基本例になります。
<!-- definition-example-end -->

「最大の成功確率も0へ行く」という条件は重要です。全体の期待件数が有限でも、一個だけ確率 $1/2$ の事象が残れば、それは Poisson 的な「微小事象の集積」ではありません。

---

## 2. 極限分布を特性関数で準備する

$Y\sim\operatorname{Poisson}(\lambda)$ なら

$$
P(Y=j)=e^{-\lambda}\frac{\lambda^j}{j!}.
$$

したがって

$$
\begin{aligned}
\varphi_Y(t)
&=
E[e^{itY}]\\
&=
\sum_{j=0}^{\infty}
e^{itj}e^{-\lambda}\frac{\lambda^j}{j!}\\
&=
e^{-\lambda}
\exp(\lambda e^{it})\\
&=
\exp\{\lambda(e^{it}-1)\}.
\end{aligned}
$$

<a id="prop-p6b-poisson-characteristic"></a>

<!-- formal-statement-start -->
> **命題（Poisson 分布の特性関数）**  
> $Y\sim\operatorname{Poisson}(\lambda)$ なら
>
$$
\varphi_Y(t)
=
\exp\{\lambda(e^{it}-1)\}.
$$
<!-- formal-statement-end -->

この指数形が、希少事象の積を極限で読み解く鍵です。

---

## 3. 対数を取ったときの誤差

固定した $t\in\mathbb R$ に対し

$$
z=e^{it}-1
$$

と置きます。$p$ が小さいとき

$$
\log(1+pz)
=
pz+O(p^2)
$$

ですが、本章では $O$ 記号だけで核心を隠しません。

<a id="lem-p6b-log-remainder"></a>

<!-- formal-statement-start -->
> **補題（対数の二次剰余評価）**  
> 固定した $t\in\mathbb R$ と $z=e^{it}-1$ に対し、ある $c_t>0$ と $\eta_t>0$ が存在して、$0\le p\le\eta_t$ なら
>
$$
\left|\log(1+pz)-pz\right|
\le c_t p^2.
$$
>
> ここで $\log$ は $1$ の近傍で $\log 1=0$ となる連続な枝を固定して用いる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

関数

$$
g(w)=\log(1+w)-w
$$

を $w=0$ の近傍で考えます。$g(0)=0$, $g'(0)=0$ であり

$$
g''(w)
=
-\frac{1}{(1+w)^2}.
$$

$|w|\le1/2$ では $|1+w|\ge1/2$ なので

$$
|g''(w)|\le4.
$$

複素変数の線分積分による Taylor の積分形から

$$
g(w)
=
w^2\int_0^1(1-u)g''(uw)\,du
$$

であり、

$$
|g(w)|
\le
|w|^2\int_0^1 4(1-u)\,du
=
2|w|^2.
$$

$w=pz$ とし、$p|z|\le1/2$ となるよう $\eta_t$ を選べば

$$
|\log(1+pz)-pz|
\le
2|z|^2p^2.
$$

従って $c_t=2|e^{it}-1|^2$ と取れます。
<!-- proof-end -->

---

## 4. 一般三角配列の Poisson 極限

<a id="thm-p6b-law-small-numbers"></a>

<!-- formal-statement-start -->
> **定理（Bernoulli 三角配列の Poisson 少数法則）**  
> 各 $n$ について $X_{n,1},\ldots,X_{n,m_n}$ を独立な Bernoulli 確率変数とし
>
$$
P(X_{n,k}=1)=p_{n,k}.
$$
>
> 次を仮定する。
>
$$
\max_{1\le k\le m_n}p_{n,k}\to0,
\qquad
\sum_{k=1}^{m_n}p_{n,k}\to\lambda\in[0,\infty).
$$
>
> このとき
>
$$
S_n=\sum_{k=1}^{m_n}X_{n,k}
$$
>
> は
>
$$
S_n\xrightarrow{d}\operatorname{Poisson}(\lambda)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

独立性から特性関数は積になります。

$$
\varphi_{S_n}(t)
=
\prod_k\{1+p_{n,k}(e^{it}-1)\}.
$$

対数を取ると

$$
\log\varphi_{S_n}(t)
=
(e^{it}-1)\sum_kp_{n,k}
+
\text{二次誤差}.
$$

二次誤差は

$$
\sum_kp_{n,k}^2
\le
\left(\max_kp_{n,k}\right)\sum_kp_{n,k}
\to0
$$

で消えます。最後に [[Lévy 連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)](../F0_00P6_特性関数_中心極限定理/index.md) を使います。

<!-- proof-start -->
### 証明

固定した $t\in\mathbb R$ を取ります。独立性と [特性関数の積の性質](../F0_00P6_特性関数_中心極限定理/index.md) から

$$
\begin{aligned}
\varphi_{S_n}(t)
&=
\prod_{k=1}^{m_n}
E[e^{itX_{n,k}}]\\
&=
\prod_{k=1}^{m_n}
\left\{
1-p_{n,k}+p_{n,k}e^{it}
\right\}\\
&=
\prod_{k=1}^{m_n}
\left\{
1+p_{n,k}(e^{it}-1)
\right\}.
\end{aligned}
$$

$z=e^{it}-1$ と置きます。$\max_kp_{n,k}\to0$ なので、十分大きい $n$ では全ての $k$ に対して先の対数剰余補題を使えます。

したがって

$$
\log\varphi_{S_n}(t)
=
z\sum_{k=1}^{m_n}p_{n,k}+R_n(t)
$$

で、

$$
|R_n(t)|
\le
c_t\sum_{k=1}^{m_n}p_{n,k}^2.
$$

ここで

$$
\sum_{k=1}^{m_n}p_{n,k}^2
\le
\left(\max_{1\le k\le m_n}p_{n,k}\right)
\sum_{k=1}^{m_n}p_{n,k}.
$$

第1因子は0へ、第2因子は $\lambda$ へ収束するので

$$
\sum_kp_{n,k}^2\to0.
$$

従って $R_n(t)\to0$ です。一方

$$
z\sum_kp_{n,k}
\to
\lambda(e^{it}-1).
$$

よって

$$
\log\varphi_{S_n}(t)
\to
\lambda(e^{it}-1)
$$

であり、

$$
\varphi_{S_n}(t)
\to
\exp\{\lambda(e^{it}-1)\}.
$$

右辺は $\operatorname{Poisson}(\lambda)$ の特性関数です。[[Lévy 連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)](../F0_00P6_特性関数_中心極限定理/index.md) により

$$
S_n\xrightarrow{d}\operatorname{Poisson}(\lambda).
$$
<!-- proof-end -->

### 仮定はどこで働いたか

- **独立性**：特性関数を積へ分解した。
- **$\max_kp_{n,k}\to0$**：全ての因子で同じ対数近似を使え、二次誤差を消した。
- **$\sum_kp_{n,k}\to\lambda$**：一次項を Poisson intensity $\lambda$ に固定した。

---

## 5. 二項分布の少数法則を回収する

$p_{n,k}=p_n$、$m_n=n$ とすれば

$$
S_n\sim\operatorname{Bin}(n,p_n).
$$

仮定

$$
p_n\to0,
\qquad
np_n\to\lambda
$$

のもとで

$$
\max_kp_{n,k}=p_n\to0,
\qquad
\sum_{k=1}^{n}p_{n,k}=np_n\to\lambda.
$$

従って一般定理から

$$
\operatorname{Bin}(n,p_n)
\xrightarrow{d}
\operatorname{Poisson}(\lambda)
$$

が直ちに出ます。

つまり P4-02 の少数法則は、本章の三角配列定理の「全ての成功確率が等しい場合」です。

---

## 6. 非同分布の例

$n$ 台の装置があり、装置 $k$ の故障確率を

$$
p_{n,k}
=
\frac{\lambda}{n}
\left(1+\frac{k-n/2}{n^2}\right)
$$

とします。十分大きい $n$ では全て $[0,1]$ に入り、

$$
\max_kp_{n,k}\to0.
$$

また補正項の総和は $O(1/n)$ なので

$$
\sum_{k=1}^{n}p_{n,k}\to\lambda.
$$

各装置の確率は完全には同じでなくても、総故障件数は $\operatorname{Poisson}(\lambda)$ へ収束します。

これが二項分布だけを覚えるより一般定理を持つ意味です。

---

## 7. 一つだけ大きい確率が残ると何が壊れるか

$X_{n,1}\sim\operatorname{Bernoulli}(1/2)$ とし、残りの Bernoulli 変数の成功確率を調整して

$$
\sum_kp_{n,k}\to\lambda
$$

としたとします。

このとき

$$
\max_kp_{n,k}\ge\frac12
$$

なので希少性条件は破れています。

特性関数には

$$
1+\frac12(e^{it}-1)
=
\frac{1+e^{it}}{2}
$$

という有限サイズの Bernoulli 因子が最後まで残ります。極限は一般に

$$
\operatorname{Bernoulli}(1/2)+\operatorname{Poisson}(\lambda-1/2)
$$

型になり、純粋な Poisson 分布ではありません。

「総平均だけ合わせればよい」のではなく、**最大の一件も希少になる**ことが必要です。

---

## 8. 多カテゴリの希少事象

次は Poisson random measure への最初の橋です。

各行 $n$ の各試行 $k$ は、カテゴリ $1,\ldots,r$ の高々一つを発生させるとします。

$$
P(Y_{n,k}=j)=p_{n,k}^{(j)},
\qquad
P(Y_{n,k}=0)
=
1-\sum_{j=1}^{r}p_{n,k}^{(j)}.
$$

試行 $k$ 同士は独立とし、カテゴリ別件数を

$$
N_{n,j}
=
\sum_{k=1}^{m_n}1_{\{Y_{n,k}=j\}}
$$

とします。

<a id="thm-p6b-poisson-vector"></a>

<!-- formal-statement-start -->
> **定理（希少カテゴリの独立 Poisson 極限）**  
> 各 $j=1,\ldots,r$ について
>
$$
\sum_{k=1}^{m_n}p_{n,k}^{(j)}
\to\lambda_j\ge0
$$
>
> とし、さらに
>
$$
\max_{1\le k\le m_n}
\sum_{j=1}^{r}p_{n,k}^{(j)}
\to0
$$
>
> とする。このとき
>
$$
(N_{n,1},\ldots,N_{n,r})
\xrightarrow{d}
(Z_1,\ldots,Z_r),
$$
>
> ここで $Z_1,\ldots,Z_r$ は互いに独立で
>
$$
Z_j\sim\operatorname{Poisson}(\lambda_j).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$t_1,\ldots,t_r\in\mathbb R$ を固定します。一試行 $k$ の joint characteristic factor は

$$
1+
\sum_{j=1}^{r}
p_{n,k}^{(j)}(e^{it_j}-1).
$$

したがって独立性より

$$
\varphi_n(t_1,\ldots,t_r)
=
\prod_{k=1}^{m_n}
\left[
1+
\sum_{j=1}^{r}
p_{n,k}^{(j)}(e^{it_j}-1)
\right].
$$

$$
w_{n,k}
=
\sum_{j=1}^{r}
p_{n,k}^{(j)}(e^{it_j}-1)
$$

と置きます。希少性条件から

$$
\max_k|w_{n,k}|\to0.
$$

対数剰余評価により

$$
\log\varphi_n
=
\sum_kw_{n,k}
+
R_n,
\qquad
|R_n|
\le
C\sum_k|w_{n,k}|^2.
$$

ある定数 $C'$ に対して

$$
|w_{n,k}|
\le
C'
\sum_jp_{n,k}^{(j)}
$$

なので

$$
\sum_k|w_{n,k}|^2
\le
C'^2
\left(
\max_k\sum_jp_{n,k}^{(j)}
\right)
\sum_k\sum_jp_{n,k}^{(j)}
\to0.
$$

一方

$$
\sum_kw_{n,k}
=
\sum_{j=1}^{r}
(e^{it_j}-1)
\sum_kp_{n,k}^{(j)}
\to
\sum_{j=1}^{r}\lambda_j(e^{it_j}-1).
$$

従って

$$
\varphi_n(t_1,\ldots,t_r)
\to
\prod_{j=1}^{r}
\exp\{\lambda_j(e^{it_j}-1)\}.
$$

これは独立な Poisson 変数 $(Z_1,\ldots,Z_r)$ の同時特性関数です。有限次元版 [Lévy 連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)により結論を得ます。

この結果は「互いに排他的な希少カテゴリ」が極限では独立 Poisson 件数へ分離することを表します。

<!-- proof-end -->

---

## 9. Poisson random measure への橋

有限個のカテゴリを、空間の互いに素な集合

$$
A_1,\ldots,A_r
$$

だと読み替えます。

各小試行が $A_j$ に点を一つ落とす確率が小さく、総期待件数が

$$
\nu(A_j)
$$

へ収束するとき、極限では

$$
N(A_1),\ldots,N(A_r)
$$

が独立 Poisson になってほしい。

これが Poisson random measure の有限分割における構造です。将来の STO13 ではこの有限カテゴリ極限を、空間上の random measure と compensated measure の言葉へ持ち上げます。

---

# 10. 演習 A

<a id="ex-p6b-a01"></a>

## P6B-A01 二項少数法則の回収

- Level: A

$p_{n,k}=\lambda/n$, $k=1,\ldots,n$ とする。本章の一般定理の二つの仮定を確認し、$S_n$ の極限分布を答えよ。

<!-- solution-start -->
### 詳細解答

最大確率は

$$
\max_kp_{n,k}=\frac{\lambda}{n}\to0.
$$

総和は

$$
\sum_{k=1}^{n}p_{n,k}
=
n\frac{\lambda}{n}
=
\lambda.
$$

したがって一般 Poisson 少数法則を適用でき、

$$
S_n\xrightarrow{d}\operatorname{Poisson}(\lambda).
$$

この場合 $S_n\sim\operatorname{Bin}(n,\lambda/n)$ なので、通常の二項 Poisson 極限を回収している。
<!-- solution-end -->

<a id="ex-p6b-a02"></a>

## P6B-A02 二次誤差が消える理由

- Level: A

非負数 $p_{n,k}$ が

$$
\max_kp_{n,k}\to0,
\qquad
\sum_kp_{n,k}\to\lambda<\infty
$$

を満たすとき

$$
\sum_kp_{n,k}^2\to0
$$

を示せ。

<!-- solution-start -->
### 詳細解答

各 $k$ について

$$
p_{n,k}^2
\le
\left(\max_jp_{n,j}\right)p_{n,k}.
$$

総和を取れば

$$
\sum_kp_{n,k}^2
\le
\left(\max_jp_{n,j}\right)\sum_kp_{n,k}.
$$

右辺の第1因子は0へ、第2因子は有限値 $\lambda$ へ収束するため、積は0へ収束する。
<!-- solution-end -->

<a id="ex-p6b-a03"></a>

## P6B-A03 Poisson 特性関数

- Level: A

$Y\sim\operatorname{Poisson}(\lambda)$ の特性関数を確率質量関数の無限和から直接導け。

<!-- solution-start -->
### 詳細解答

定義から

$$
\begin{aligned}
E[e^{itY}]
&=
\sum_{j=0}^{\infty}
e^{itj}e^{-\lambda}\frac{\lambda^j}{j!}\\
&=
e^{-\lambda}
\sum_{j=0}^{\infty}\frac{(\lambda e^{it})^j}{j!}\\
&=
e^{-\lambda}e^{\lambda e^{it}}\\
&=
\exp\{\lambda(e^{it}-1)\}.
\end{aligned}
$$
<!-- solution-end -->

<a id="ex-p6b-a04"></a>

## P6B-A04 仮定違反

- Level: A

$p_{n,1}=1/3$ が全ての $n$ で成り立つ配列は、なぜ本章の Poisson 少数法則を直接使えないか。

<!-- solution-start -->
### 詳細解答

希少性条件は

$$
\max_kp_{n,k}\to0
$$

です。しかし

$$
\max_kp_{n,k}\ge p_{n,1}=\frac13
$$

なので最大確率は0へ行きません。

したがって一個の Bernoulli 因子が有限サイズのまま残り、対数展開の二次誤差を一様に消す論証が使えません。総平均の収束だけでは Poisson 極限は保証されません。
<!-- solution-end -->

# 11. 演習 B

<a id="ex-p6b-b01"></a>

## P6B-B01 非同分布故障列

- Level: B

$$
p_{n,k}
=
\frac{2}{n}
+
\frac{k}{n^3},
\qquad
1\le k\le n
$$

とする。$S_n=\sum_{k=1}^nX_{n,k}$ の極限分布を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\max_{1\le k\le n}p_{n,k}
=
\frac2n+\frac1{n^2}
\to0.
$$

総和は

$$
\sum_{k=1}^{n}p_{n,k}
=
2+\frac1{n^3}\sum_{k=1}^{n}k
=
2+\frac{n(n+1)}{2n^3}
\to2.
$$

従って [Poisson 少数法則](#thm-p6b-law-small-numbers) より

$$
S_n\xrightarrow{d}\operatorname{Poisson}(2).
$$

各 Bernoulli の成功確率が異なっていても、最大確率が消え、総 intensity が2へ収束することが本質である。
<!-- solution-end -->

<a id="ex-p6b-b02"></a>

## P6B-B02 Bernoulli 成分が残る極限

- Level: B

$X_{n,1}\sim\operatorname{Bernoulli}(1/2)$ とし、$k=2,\ldots,n$ では独立に

$$
P(X_{n,k}=1)=\frac{\lambda}{n}
$$

とする。$S_n=\sum_{k=1}^{n}X_{n,k}$ の極限分布を特性関数から同定せよ。

<!-- solution-start -->
### 詳細解答

$X_{n,1}$ は残りと独立なので

$$
\varphi_{S_n}(t)
=
\frac{1+e^{it}}{2}
\left(
1+\frac{\lambda}{n}(e^{it}-1)
\right)^{n-1}.
$$

第2因子は

$$
\exp\{\lambda(e^{it}-1)\}
$$

へ収束する。従って極限特性関数は

$$
\frac{1+e^{it}}{2}
\exp\{\lambda(e^{it}-1)\}.
$$

これは独立な

$$
B\sim\operatorname{Bernoulli}(1/2),
\qquad
Z\sim\operatorname{Poisson}(\lambda)
$$

の和 $B+Z$ の特性関数である。

したがって

$$
S_n\xrightarrow{d}B+Z.
$$

純粋な Poisson にならない原因は、最大確率 $1/2$ が消えないことにある。
<!-- solution-end -->

<a id="ex-p6b-b03"></a>

## P6B-B03 二カテゴリ rare events

- Level: B

各 $k=1,\ldots,n$ が互いに独立で、

$$
P(Y_{n,k}=1)=\frac{a}{n},
\qquad
P(Y_{n,k}=2)=\frac{b}{n},
$$

残りの確率で0とする。カテゴリ別件数 $(N_{n,1},N_{n,2})$ の極限を求め、なぜ極限で独立になるかを特性関数から説明せよ。

<!-- solution-start -->
### 詳細解答

各カテゴリの総 intensity は

$$
\sum_{k=1}^{n}\frac an=a,
\qquad
\sum_{k=1}^{n}\frac bn=b.
$$

一試行の総発生確率は $(a+b)/n\to0$ なので多カテゴリ定理の仮定を満たす。

joint characteristic function の極限は

$$
\exp\{a(e^{it_1}-1)+b(e^{it_2}-1)\}.
$$

これは

$$
\exp\{a(e^{it_1}-1)\}
\exp\{b(e^{it_2}-1)\}
$$

と積に分かれる。各因子は Poisson 特性関数なので

$$
(N_{n,1},N_{n,2})
\xrightarrow{d}
(Z_1,Z_2),
$$

$$
Z_1\sim\operatorname{Poisson}(a),
\qquad
Z_2\sim\operatorname{Poisson}(b),
$$

かつ $Z_1,Z_2$ は独立である。

有限 $n$ では一つの試行が二カテゴリへ同時に入れないため負の依存があるが、一試行の発生確率が0へ行くことでその競合が極限では消える。
<!-- solution-end -->

# 12. 演習 C

<a id="ex-p6b-c01"></a>

## P6B-C01 三角配列から Poisson vector まで再構成する

- Level: C

各行で独立な試行 $Y_{n,k}\in\{0,1,2,3\}$ を考え、

$$
P(Y_{n,k}=j)=p_{n,k}^{(j)}
\qquad(j=1,2,3)
$$

とする。次を仮定する。

$$
\max_k\sum_{j=1}^{3}p_{n,k}^{(j)}\to0,
$$

$$
\sum_kp_{n,k}^{(j)}\to\lambda_j
\qquad(j=1,2,3).
$$

カテゴリ別件数を $N_{n,j}$ とする。

1. joint characteristic function を積で書け。
2. 対数の一次項を求めよ。
3. 二次剰余が0へ行くことを示せ。
4. 極限分布を同定せよ。
5. この結果が Poisson random measure のどの性質を有限分割で表しているか説明せよ。

<!-- solution-start -->
### 詳細解答

1. 一試行 $k$ について

   $$
   E\left[
   e^{i(t_1 1_{\{Y_{n,k}=1\}}+
        t_2 1_{\{Y_{n,k}=2\}}+
        t_3 1_{\{Y_{n,k}=3\}})}
   \right]
   =
   1+
   \sum_{j=1}^{3}
   p_{n,k}^{(j)}(e^{it_j}-1).
   $$

   試行間の独立性より

   $$
   \varphi_n(t_1,t_2,t_3)
   =
   \prod_k
   \left[
   1+
   \sum_{j=1}^{3}
   p_{n,k}^{(j)}(e^{it_j}-1)
   \right].
   $$

2. 

   $$
   w_{n,k}
   =
   \sum_{j=1}^{3}
   p_{n,k}^{(j)}(e^{it_j}-1)
   $$

   と置く。対数の一次項は

   $$
   \sum_kw_{n,k}
   =
   \sum_{j=1}^{3}
   (e^{it_j}-1)
   \sum_kp_{n,k}^{(j)}
   $$

   なので

   $$
   \sum_kw_{n,k}
   \to
   \sum_{j=1}^{3}\lambda_j(e^{it_j}-1).
   $$

3. ある $C>0$ に対し

   $$
   |w_{n,k}|
   \le
   C\sum_jp_{n,k}^{(j)}.
   $$

   従って

   $$
   \sum_k|w_{n,k}|^2
   \le
   C^2
   \left(
   \max_k\sum_jp_{n,k}^{(j)}
   \right)
   \sum_k\sum_jp_{n,k}^{(j)}
   \to0.
   $$

   対数剰余は定数倍のこの量で抑えられるため0へ行く。

4. よって joint characteristic function は

   $$
   \exp\left\{
   \sum_{j=1}^{3}
   \lambda_j(e^{it_j}-1)
   \right\}
   =
   \prod_{j=1}^{3}
   \exp\{\lambda_j(e^{it_j}-1)\}
   $$

   へ収束する。これは独立な

   $$
   Z_j\sim\operatorname{Poisson}(\lambda_j)
   $$

   の joint characteristic function なので

   $$
   (N_{n,1},N_{n,2},N_{n,3})
   \xrightarrow{d}
   (Z_1,Z_2,Z_3).
   $$

5. Poisson random measure $N$ では、互いに素な集合 $A_1,A_2,A_3$ に対し

   $$
   N(A_j)\sim\operatorname{Poisson}(\nu(A_j))
   $$

   となり、これらの件数が独立になる。本問はこの「互いに素な有限分割上の独立 Poisson count」を離散 rare-event model の極限として再現している。
<!-- solution-end -->

---

## 13. 章末チェック

- [ ] 二項少数法則と一般 Bernoulli 三角配列の違いを説明できる。
- [ ] $\max_kp_{n,k}\to0$ が必要な理由を反例で説明できる。
- [ ] $\sum_kp_{n,k}^2\to0$ を最大確率と総 intensity から導ける。
- [ ] 特性関数の積から Poisson exponent が出る計算を再現できる。
- [ ] 非同分布 Bernoulli 和へ一般定理を適用できる。
- [ ] 多カテゴリ rare events が独立 Poisson vector へ収束することを joint characteristic function で示せる。
- [ ] Poisson random measure の有限分割構造との対応を説明できる。
