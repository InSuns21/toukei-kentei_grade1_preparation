# Core 43 Poisson母数推定：不偏性・一致性・平均二乗誤差

- 旧No.: 53
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で Poisson 分布に従い、

$$
P_\lambda(X_i=x)
=e^{-\lambda}\frac{\lambda^x}{x!},
\qquad x=0,1,2,\ldots,
\qquad \lambda>0
$$

とする。推定量

$$
\widehat\lambda=\overline X
$$

について次を答えよ。

1. $\widehat\lambda$ の不偏性を示せ。
2. 分散と平均二乗誤差を求めよ。
3. Chebyshevの不等式を使って一致性を示せ。
4. 中心極限定理による漸近分布を求めよ。

## 詳細解答

### 0. Poisson分布の平均と分散を確認する

後の計算の出発点になる $E[X_i]$ と $\operatorname{Var}(X_i)$ を、確率質量関数から確認しておく。

まず

$$
\begin{aligned}
E[X_i]
&=\sum_{x=0}^\infty x e^{-\lambda}\frac{\lambda^x}{x!}\\
&=\sum_{x=1}^\infty e^{-\lambda}\frac{\lambda^x}{(x-1)!}\\
&=\lambda\sum_{y=0}^\infty e^{-\lambda}\frac{\lambda^y}{y!}\\
&=\lambda.
\end{aligned}
$$

次に階乗モーメントを使うと

$$
\begin{aligned}
E[X_i(X_i-1)]
&=\sum_{x=2}^\infty x(x-1)e^{-\lambda}\frac{\lambda^x}{x!}\\
&=\lambda^2\sum_{y=0}^\infty e^{-\lambda}\frac{\lambda^y}{y!}\\
&=\lambda^2.
\end{aligned}
$$

$X_i^2=X_i(X_i-1)+X_i$ なので

$$
E[X_i^2]=\lambda^2+\lambda.
$$

したがって

$$
\operatorname{Var}(X_i)
=E[X_i^2]-E[X_i]^2
=(\lambda^2+\lambda)-\lambda^2
=\lambda.
$$

つまり

$$
\boxed{E[X_i]=\lambda,\qquad \operatorname{Var}(X_i)=\lambda}.
$$

### 1. 不偏性

標本平均の期待値は期待値の線形性から

$$
\begin{aligned}
E[\widehat\lambda]
&=E\left[\frac1n\sum_{i=1}^nX_i\right]\\
&=\frac1n\sum_{i=1}^nE[X_i]\\
&=\frac1n\cdot n\lambda\\
&=\lambda.
\end{aligned}
$$

よって

$$
\boxed{E[\widehat\lambda]=\lambda}
$$

であり、$\widehat\lambda$ は不偏推定量である。

### 2. 分散と平均二乗誤差

独立性より異なる $X_i,X_j$ の共分散は0だから

$$
\begin{aligned}
\operatorname{Var}(\widehat\lambda)
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nX_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)\\
&=\frac1{n^2}\cdot n\lambda\\
&=\boxed{\frac\lambda n}.
\end{aligned}
$$

平均二乗誤差は

$$
\operatorname{MSE}(\widehat\lambda)
=E[(\widehat\lambda-\lambda)^2].
$$

一般に

$$
E[(\widehat\lambda-\lambda)^2]
=\operatorname{Var}(\widehat\lambda)
+\{E[\widehat\lambda]-\lambda\}^2.
$$

第1問で不偏性を示したので偏りの項は0となり、

$$
\boxed{
\operatorname{MSE}(\widehat\lambda)
=\frac\lambda n
}.
$$

### 3. Chebyshevの不等式による一致性

一致性を示すには、任意の $\varepsilon>0$ に対して

$$
P_\lambda(|\widehat\lambda-\lambda|>\varepsilon)\to0
$$

を示せばよい。

Chebyshevの不等式は、平均が有限で分散も有限な確率変数 $Y$ に対して

$$
P(|Y-E[Y]|\ge\varepsilon)
\le\frac{\operatorname{Var}(Y)}{\varepsilon^2}
$$

を与える。本問では $E[\widehat\lambda]=\lambda$、$\operatorname{Var}(\widehat\lambda)=\lambda/n$ なので

$$
P_\lambda(|\widehat\lambda-\lambda|\ge\varepsilon)
\le\frac{\lambda}{n\varepsilon^2}.
$$

$\lambda$ と $\varepsilon$ を固定して $n\to\infty$ とすれば右辺は0へ収束するから

$$
\boxed{\widehat\lambda\xrightarrow{p}\lambda}.
$$

したがって $\widehat\lambda$ は一致推定量である。

### 4. 中心極限定理による漸近分布

$X_i$ は独立同分布で

$$
E[X_i]=\lambda,
\qquad
0<\operatorname{Var}(X_i)=\lambda<\infty
$$

である。したがって Lindeberg–Lévy の中心極限定理を適用でき、

$$
\frac{\sqrt n(\overline X-\lambda)}{\sqrt\lambda}
\xrightarrow{d}N(0,1).
$$

両辺の標準化を戻せば

$$
\boxed{
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda)
}.
$$

同値な近似表現として、大標本では

$$
\widehat\lambda
\approx N\left(\lambda,\frac\lambda n\right)
$$

と書ける。

## 本番答案

Poisson分布について

$$
E[X_i]=\lambda,
\qquad
\operatorname{Var}(X_i)=\lambda.
$$

したがって

$$
E[\widehat\lambda]
=E[\overline X]
=\lambda,
$$

より不偏。また独立性から

$$
\operatorname{Var}(\widehat\lambda)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)
=\frac\lambda n.
$$

不偏なので

$$
\operatorname{MSE}(\widehat\lambda)=\frac\lambda n.
$$

任意の $\varepsilon>0$ に対し Chebyshev の不等式より

$$
P(|\widehat\lambda-\lambda|\ge\varepsilon)
\le\frac{\lambda}{n\varepsilon^2}\to0,
$$

したがって $\widehat\lambda\xrightarrow{p}\lambda$。

さらに独立同分布かつ有限正分散なので中心極限定理から

$$
\frac{\sqrt n(\widehat\lambda-\lambda)}{\sqrt\lambda}
\xrightarrow{d}N(0,1),
$$

すなわち

$$
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda).
$$

## 採点基準

- Poisson分布の平均・分散の確認と不偏性: 5点
- 分散・平均二乗誤差: 5点
- Chebyshevの不等式による一致性: 5点
- 中心極限定理（条件確認・標準化）: 5点
