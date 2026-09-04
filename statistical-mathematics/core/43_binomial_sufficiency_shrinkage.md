# Core 16 二項モデル：十分性・最尤推定量・平均二乗誤差・縮小

- 旧No.: 43
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Bernoulli}(p)$、$0\le p\le1$ とし、$T=\sum X_i$とする。

1. $T$が$p$の十分統計量であることを示し、最尤推定量を求めよ。
2. $\widehat p=T/n$の平均二乗誤差を求めよ。
3. 縮小推定量

$$
\widetilde p=\frac{T+1}{n+2}
$$

のバイアス、分散、平均二乗誤差を求めよ。
4. $p=1/2$で$\widetilde p$と$\widehat p$の平均二乗誤差を比較せよ。

## 詳細解答

### 1. 十分性：Neyman–フィッシャー因子分解定理を使う

標本点を $x=(x_1,\ldots,x_n)\in\{0,1\}^n$ とする。Bernoulli標本の同時確率質量関数は

$$
\begin{aligned}
f_p(x)
&=\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}\\
&=p^{T(x)}(1-p)^{n-T(x)}\boldsymbol{1}_{\{x\in\{0,1\}^n\}}.
\end{aligned}
$$

ここで使うのは **Neyman–フィッシャーの因子分解定理**である。離散モデルでは、同時確率質量関数を

$$
f_p(x)=g_p(T(x))h(x)
$$

と書け、$h$ が $p$ に依存しなければ $T$ は十分統計量である。

本問では

$$
g_p(t)=p^t(1-p)^{n-t},
\qquad
h(x)=\boldsymbol{1}_{\{x\in\{0,1\}^n\}}.
$$

標本空間 $\{0,1\}^n$ は $p$ に依存せず、$h$ も $p$ に依存しない。したがって因子分解定理の条件を満たし、

$$
\boxed{T=\sum X_i\text{ は }p\text{ の十分統計量}}
$$

である。

次に最尤推定量を求める。$0<T<n$ なら対数尤度は

$$
\ell(p)=T\log p+(n-T)\log(1-p),
$$

$$
\ell'(p)=\frac Tp-\frac{n-T}{1-p},
$$

なので $\ell'(p)=0$ から

$$
p=\frac Tn.
$$

また

$$
\ell''(p)=-\frac{T}{p^2}-\frac{n-T}{(1-p)^2}<0
$$

だから内部解は最大値である。$T=0$ では尤度 $(1-p)^n$ は $p=0$ で最大、$T=n$ では $p^n$ は $p=1$ で最大なので、端点を含めても

$$
\boxed{\widehat p=\frac Tn}.
$$

### 2. 最尤推定量の平均二乗誤差

$T\sim\operatorname{Binomial}(n,p)$ より

$$
E[T]=np,
\qquad
\operatorname{Var}(T)=np(1-p).
$$

したがって

$$
E[\widehat p]=p,
\qquad
\operatorname{Var}(\widehat p)=\frac{p(1-p)}n.
$$

不偏なので

$$
\boxed{MSE(\widehat p)=\frac{p(1-p)}n}.
$$

### 3. 縮小推定量

$$
E[\widetilde p]
=\frac{E[T]+1}{n+2}
=\frac{np+1}{n+2},
$$

よって

$$
\operatorname{Bias}(\widetilde p)
=E[\widetilde p]-p
=\frac{1-2p}{n+2}.
$$

また定数を足しても分散は変わらないので

$$
\operatorname{Var}(\widetilde p)
=\frac{\operatorname{Var}(T)}{(n+2)^2}
=\frac{np(1-p)}{(n+2)^2}.
$$

平均二乗誤差分解

$$
MSE=\operatorname{Var}+\operatorname{Bias}^2
$$

より

$$
\boxed{
MSE(\widetilde p)
=\frac{np(1-p)+(1-2p)^2}{(n+2)^2}
}.
$$

### 4. $p=1/2$ で比較

$p=1/2$ では縮小推定量のバイアスは0なので

$$
MSE(\widetilde p)=\frac{n}{4(n+2)^2},
$$

$$
MSE(\widehat p)=\frac1{4n}.
$$

比は

$$
\frac{MSE(\widetilde p)}{MSE(\widehat p)}
=\frac{n^2}{(n+2)^2}<1,
$$

したがってこの点では縮小推定量の方が平均二乗誤差が小さい。

## 本番答案

Bernoulli標本の同時確率質量関数は

$$
f_p(x)=p^{T(x)}(1-p)^{n-T(x)}\boldsymbol{1}_{\{x\in\{0,1\}^n\}}
=g_p(T(x))h(x).
$$

標本空間と $h$ は $p$ に依存しないので、**Neyman–フィッシャー因子分解定理**から $T$ は十分。

$0<T<n$ では

$$
\ell'(p)=T/p-(n-T)/(1-p)=0
$$

より $\hat p=T/n$、端点 $T=0,n$ でも同式が境界最尤推定量を与える。

$$
MSE(\hat p)=\frac{p(1-p)}n.
$$

$$
Bias(\tilde p)=\frac{1-2p}{n+2},
\quad
Var(\tilde p)=\frac{np(1-p)}{(n+2)^2},
$$

$$
MSE(\tilde p)=\frac{np(1-p)+(1-2p)^2}{(n+2)^2}.
$$

$p=1/2$では$n/[4(n+2)^2]<1/(4n)$。

## 採点基準

- 十分性（定理名・条件確認・因子分解）: 5点
- 最尤推定量の平均二乗誤差: 4点
- 縮小推定量のbias/variance/平均二乗誤差: 8点
- $p=1/2$比較: 3点
