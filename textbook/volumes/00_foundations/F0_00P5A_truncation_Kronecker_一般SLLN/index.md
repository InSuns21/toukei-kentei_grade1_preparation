# F0-00P5A truncation・Kolmogorov収束定理・Kronecker補題：一般iid強大数則

P5では有限分散版を証明しました。しかしiid強大数則の標準形は

$$E|X_1|<\infty$$

だけで

$$\boxed{\frac1n\sum_{k=1}^nX_k\to E[X_1]\quad\text{a.s.}}$$

を主張します。ここでは旧P5で名前だけ出ていた **Kolmogorov収束定理とKronecker補題を実際に埋めて** 証明を閉じます。

---

## 1. まず大きすぎる観測を切る

$$X_n'=X_n\mathbf1_{\{|X_n|\le n\}}$$

とします。tail-sum公式から

$$\sum_{n=1}^\infty P(|X_1|>n)\le E|X_1|<\infty.$$

iid性より $P(X_n\ne X_n')=P(|X_1|>n)$ なので第一Borel--Cantelliから

$$\boxed{X_n=X_n'\text{ eventually a.s.}}$$

です。従って元の平均と切断平均の差は有限個の項しか持たず、nで割れば0へ行きます。

---

## 2. 切断後の分散級数が有限になる

$Y_n=X_n'-E[X_n']$ と中心化します。独立性は保たれます。

$$\operatorname{Var}(Y_n)\le E[(X_n')^2].$$

Tonelliを使うと

$$
\sum_{n=1}^\infty\frac{E[(X_n')^2]}{n^2}
=E\left[X_1^2\sum_{n\ge |X_1|}\frac1{n^2}\right]
$$

という形になります。$x\ge1$ で

$$\sum_{n\ge x}\frac1{n^2}\le\frac{C}{x}$$

なので右辺は定数倍の $E|X_1|$ で抑えられます。従って

$$\boxed{\sum_n\frac{\operatorname{Var}(Y_n)}{n^2}<\infty}.$$

---

## 3. Kolmogorov収束定理

独立・中心化された $Z_n$ が

$$\sum_n\operatorname{Var}(Z_n)<\infty$$

を満たすとき

$$\boxed{\sum_nZ_n\text{ はa.s.収束する}}$$

というのがここで使うKolmogorov収束定理です。

証明の核はP5の最大不等式です。tail部分和に対して

$$
P\left(\max_{m\le k\le n}\left|\sum_{j=m}^kZ_j\right|>\varepsilon\right)
\le\frac1{\varepsilon^2}\sum_{j=m}^n\operatorname{Var}(Z_j).
$$

分散tailは0へ行くので、$m_r$ を十分速く取って右辺を可算和可能にできます。Borel--Cantelliを適用すると部分和列はa.s. Cauchyとなり、実数の完備性から収束します。

ここで

$$Z_n=\frac{Y_n}{n}$$

と置けば、前節から

$$\boxed{\sum_n\frac{Y_n}{n}\text{ converges a.s.}}$$

です。

---

## 4. Kronecker補題

数列 $a_n$ について

$$\sum_{n=1}^\infty\frac{a_n}{n}\text{ converges}$$

なら

$$\boxed{\frac1n\sum_{k=1}^na_k\to0}$$

です。

$B_n=\sum_{k=1}^na_k/k$ と置くとsummation by partsから

$$
\sum_{k=1}^na_k=nB_n-\sum_{k=1}^{n-1}B_k.
$$

nで割り、$B_n\to B$ とCesaro平均 $n^{-1}\sum_{k<n}B_k\to B$ を使えば差は0へ行きます。

$ a_n=Y_n $ に適用して

$$\boxed{\frac1n\sum_{k=1}^nY_k\to0\quad\text{a.s.}}$$

を得ます。

---

## 5. 中心を元へ戻す

DCTにより

$$E[X_n']=E[X_1\mathbf1_{\{|X_1|\le n\}}]\to E[X_1].$$

従ってCesaro平均も

$$\frac1n\sum_{k=1}^nE[X_k']\to E[X_1].$$

中心化部分と合わせて

$$\frac1n\sum_{k=1}^nX_k'\to E[X_1]\quad\text{a.s.}$$

さらに $X_k=X_k'$ eventually a.s. なので

$$\boxed{\frac1n\sum_{k=1}^nX_k\to E[X_1]\quad\text{a.s.}}$$

です。

---

## 6. 証明の地下鉄図

```text
E|X|<∞
 ↓ tail sum
ΣP(|X|>n)<∞
 ↓ Borel--Cantelli
X_n = truncated X_n eventually
 ↓
Σ Var(centered truncated X_n)/n² <∞
 ↓ Kolmogorov収束定理
Σ centered/n converges a.s.
 ↓ Kronecker補題
sample average of centered terms → 0
 ↓ DCT + Cesaro
sample average → EX
```

## 演習

### F0-00P5A-A01 truncated second momentの級数を抑える

- Level: A
- 目安時間: 15分

$E|X|<\infty$ とする。$Y_n=X\mathbf1_{\{|X|\le n\}}$ に対し $\sum_{n\ge1}E[Y_n^2]/n^2<\infty$ を示せ。

<!-- solution-start -->
#### 詳細解答
Tonelliで和と期待値を交換すると $E[X^2\sum_{n\ge |X|}n^{-2}]$ 型になる。$x\ge1$ で $\sum_{n\ge x}n^{-2}\le C/x$ なので integrand は $C|X|$ で抑えられ、期待値有限。$|X|<1$ 部分も有界。

#### 本番答案
Tonelli後、$\sum_{n\ge |X|}n^{-2}\le C/(1\vee|X|)$ を用い、全体を $C(1+|X|)$ で抑える。

#### 採点基準（20点）
- Tonelli: 6点
- tail sum評価: 7点
- E|X|への帰着: 7点
<!-- solution-end -->

### F0-00P5A-B01 Kronecker補題をsummation by partsで示す

- Level: B
- 目安時間: 20分

$\sum_{n\ge1}a_n/n$ が収束するとき、$n^{-1}\sum_{k=1}^na_k\to0$ を示せ。

<!-- solution-start -->
#### 詳細解答
$b_k=a_k/k$, $B_n=\sum_{k=1}^nb_k\to B$ と置く。$a_k=kb_k$ にsummation by partsを使うと $\sum_{k=1}^na_k=nB_n-\sum_{k=1}^{n-1}B_k$。nで割れば $B_n-(1/n)\sum_{k<n}B_k\to B-B=0$（Cesaro）。

#### 本番答案
$B_n=\sum_{k\le n}a_k/k$ と置く。部分和変換で $n^{-1}\sum_{k\le n}a_k=B_n-n^{-1}\sum_{k<n}B_k\to0$。

#### 採点基準（20点）
- $B_n$ の導入: 4点
- summation by parts: 8点
- Cesaro極限: 6点
- 結論: 2点
<!-- solution-end -->

---

## 次に進む

一般iid強大数則まで証明が閉じました。分布収束へ進む [F0-00P6 特性関数・Lévy](../F0_00P6_特性関数_中心極限定理/index.md) へ進めます。
