# Core 05 指数分布の十分性・完備性・一様最小分散不偏推定量

- 旧No.: 55
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$n\ge2$ とし、$X_i\overset{\mathrm{iid}}\sim\operatorname{Exp}(\lambda)$、$\lambda>0$、$T=\sum X_i$ とする。固定した$c>0$に対し

$$
\tau(\lambda)=P_\lambda(X_1>c)=e^{-\lambda c}
$$

を推定したい。

1. $T$が$\lambda$の十分統計量であることを示せ。
2. $T$が完備であることを示せ。Laplace変換の一意性「$\int_0^\infty q(t)e^{-\lambda t}dt=0$ が全ての $\lambda>0$ で成り立つなら $q(t)=0$」を用いてよい。
3. $Y=\boldsymbol{1}_{\{X_1>c\}}$ が$\tau(\lambda)$の不偏推定量であることを示せ。
4. $E[Y\mid T]$を求め、$\tau(\lambda)$の一様最小分散不偏推定量を与えよ。

## 詳細解答

### 1. 十分性：Neyman–Fisher 因子分解定理

同時確率密度関数は

$$
L(\lambda;x)
=\lambda^n e^{-\lambda T(x)}
\prod_{i=1}^n\boldsymbol{1}_{\{x_i>0\}}.
$$

これは

$$
L(\lambda;x)=g_\lambda(T(x))h(x),
$$

$$
g_\lambda(t)=\lambda^n e^{-\lambda t},
\qquad
h(x)=\prod_i\boldsymbol{1}_{\{x_i>0\}}
$$

と分解でき、$h$ は $\lambda$ に依存しない。よって **Neyman–Fisher 因子分解定理**から

$$
\boxed{T\text{ は }\lambda\text{ の十分統計量}}.
$$

### 2. 完備性：Laplace変換の一意性

$T\sim\operatorname{Gamma}(n,\lambda)$ で

$$
f_T(t)=\frac{\lambda^n}{\Gamma(n)}t^{n-1}e^{-\lambda t},
\qquad t>0.
$$

$E_\lambda[|g(T)|]$ が有限で、全ての $\lambda>0$ について

$$
E_\lambda[g(T)]=0
$$

とする。すると

$$
0
=\frac{\lambda^n}{\Gamma(n)}
\int_0^\infty g(t)t^{n-1}e^{-\lambda t}dt.
$$

$\lambda^n/\Gamma(n)>0$ だから

$$
\int_0^\infty g(t)t^{n-1}e^{-\lambda t}dt=0
$$

が全ての $\lambda>0$ で成り立つ。

ここで

$$
q(t)=g(t)t^{n-1}
$$

と置く。問題文で与えた **Laplace変換の一意性**により、上の積分が全ての $\lambda>0$ で0なら

$$
q(t)=0.
$$

$t>0$ では $t^{n-1}>0$ なので

$$
g(t)=0.
$$

したがって

$$
\boxed{T\text{ は完備}}
$$

と確認できる。

### 3. 元の不偏推定量

$$
E[Y]=P(X_1>c)=e^{-\lambda c}=\tau(\lambda),
$$

よって $Y$ は不偏。

### 4. 条件付き期待値とLehmann–Scheffé

指数分布は $\operatorname{Gamma}(1,\lambda)$ である。独立なGamma変数が**共通のrate**を持つとき、和 $T$ と比率ベクトル $(X_1/T,\ldots,X_n/T)$ は独立で、比率ベクトルはDirichlet分布になる。これは **Gamma–Dirichlet 分解**で、必要条件は各 $X_i$ が独立Gammaでrateが共通であること。本問は $X_i\overset{iid}\sim\Gamma(1,\lambda)$ なので満たす。

従って

$$
\frac{X_1}{T}\mid T=t
\sim\operatorname{Beta}(1,n-1).
$$

$t>c$ なら

$$
\begin{aligned}
P(X_1>c\mid T=t)
&=P\left(\frac{X_1}{T}>\frac ct\middle|T=t\right)\\
&=\int_{c/t}^1(n-1)(1-u)^{n-2}du\\
&=\left(1-\frac ct\right)^{n-1}.
\end{aligned}
$$

$t\le c$ なら $X_1\le T\le c$ なので確率0。よって

$$
\boxed{
E[Y\mid T]
=\boldsymbol{1}_{\{T>c\}}
\left(1-\frac cT\right)^{n-1}
}.
$$

最後に **Lehmann–Scheffé の定理**を使う。条件は「$T$ が完備十分」「その統計量から作った推定量の期待値が有限で、推定対象に対して不偏」である。前者は1・2で確認済み。後者は反復期待値より

$$
E[E(Y\mid T)]=E[Y]=\tau(\lambda)
$$

で確認でき、推定量の値は0から1の間なので期待値は有限である。したがって上の推定量が一意な一様最小分散不偏推定量。

## 本番答案

$$
L(\lambda;x)=\lambda^ne^{-\lambda T}\prod_i1\{x_i>0\}
=g_\lambda(T)h(x).
$$

母数依存部分が $T$ だけを通じて現れるので **Neyman–Fisher 因子分解定理**から $T$ は十分。

$T\sim\Gamma(n,\lambda)$ で、$E[g(T)]=0$ が全 $\lambda>0$ なら

$$
\int_0^\infty g(t)t^{n-1}e^{-\lambda t}dt=0.
$$

問題文で与えた **Laplace変換の一意性**から $g(t)t^{n-1}=0$、従って $g(t)=0$ で $T$ は完備。

また $Y=1\{X_1>c\}$ は不偏。独立Gammaで共通rateなので **Gamma–Dirichlet分解**から $X_1/T\mid T\sim Beta(1,n-1)$、従って

$$
E[Y\mid T]
=1\{T>c\}\left(1-\frac cT\right)^{n-1}.
$$

これは完備十分統計量から作られる有限期待値の不偏推定量なので **Lehmann–Scheffé 定理**から一様最小分散不偏推定量。

## 採点基準

- 十分性（定理・条件）: 4点
- 完備性（Laplace変換の一意性）: 5点
- 元の不偏推定量: 3点
- 条件付き分布（Gamma–Dirichlet条件）: 4点
- 一様最小分散不偏推定量結論（Lehmann–Scheffé定理の条件確認）: 4点
