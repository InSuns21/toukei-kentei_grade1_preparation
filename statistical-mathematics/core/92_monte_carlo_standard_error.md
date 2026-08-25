# Core 47 Monte Carlo標準誤差・必要試行数

- 旧No.: 92
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ○

## 問題

独立同分布な $W_1,\ldots,W_n$ を用いる Monte Carlo 推定量

$$
\widehat\theta_n=\frac1n\sum_{i=1}^nW_i
$$

を考える。予備実験から

$$
\operatorname{Var}(W_i)\approx9
$$

と見積もられた。

1. $\widehat\theta_n$ の標準誤差を $n$ で表せ。
2. 標準誤差を $0.03$ 以下にするために必要な $n$ を求めよ。
3. 正規近似による95%区間の半幅を $0.06$ 以下にするために必要な $n$ を求めよ。$z_{0.975}=1.96$ とする。
4. 両条件を同時に満たす最小 $n$ を求めよ。

## 詳細解答

### 1. 標準誤差

標準誤差は推定量の標準偏差である。まず独立性から

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_n)
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nW_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(W_i)\\
&\approx\frac1{n^2}\cdot n\cdot9\\
&=\frac9n.
\end{aligned}
$$

したがって標準誤差は

$$
\boxed{
\sqrt{\operatorname{Var}(\widehat\theta_n)}
\approx\frac3{\sqrt n}
}.
$$

ここで $1/\sqrt n$ でしか減らないことが重要で、誤差を半分にするには試行数を4倍にする必要がある。

### 2. 標準誤差を $0.03$ 以下にする条件

条件は

$$
\frac3{\sqrt n}\le0.03.
$$

両辺は正なので $\sqrt n$ を掛けて

$$
3\le0.03\sqrt n.
$$

さらに $0.03$ で割ると

$$
\sqrt n\ge\frac3{0.03}=100.
$$

両辺を二乗して

$$
\boxed{n\ge10000}.
$$

### 3. 95%区間の半幅を $0.06$ 以下にする条件

大標本で中心極限定理による正規近似を使うと、95%区間は概ね

$$
\widehat\theta_n
\pm1.96\frac3{\sqrt n}
$$

となる。したがって半幅は

$$
1.96\frac3{\sqrt n}.
$$

これが $0.06$ 以下という条件は

$$
1.96\frac3{\sqrt n}\le0.06.
$$

よって

$$
\sqrt n
\ge\frac{1.96\cdot3}{0.06}.
$$

分子は $5.88$ なので

$$
\frac{5.88}{0.06}=98.
$$

したがって

$$
\boxed{n\ge98^2=9604}.
$$

### 4. 両条件を同時に満たす試行数

第2問は

$$
n\ge10000,
$$

第3問は

$$
n\ge9604
$$

を要求する。両方を同時に満たすには、より厳しい条件を採用すればよいので

$$
\boxed{n_{\min}=10000}.
$$

この例では「標準誤差 $0.03$ 以下」という条件の方が、95%区間半幅 $0.06$ 以下よりわずかに厳しい。

## 本番答案

独立性から

$$
\operatorname{Var}(\widehat\theta_n)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(W_i)
\approx\frac9n.
$$

したがって標準誤差は

$$
3/\sqrt n.
$$

$3/\sqrt n\le0.03$ より

$$
\sqrt n\ge100,
\qquad
n\ge10000.
$$

95%区間の半幅条件は

$$
1.96\cdot3/\sqrt n\le0.06
$$

なので

$$
\sqrt n\ge98,
\qquad
n\ge9604.
$$

両条件を同時に満たす最小値は

$$
\boxed{n=10000}.
$$

## 採点基準

- 推定量の分散から標準誤差を導出: 4点
- 標準誤差条件の不等式: 6点
- 95%区間半幅条件の不等式: 7点
- 同時条件の比較: 3点
