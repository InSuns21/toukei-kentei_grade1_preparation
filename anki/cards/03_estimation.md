---
id: est-factorization
title: ネイマンの分解定理で一様分布の十分統計量を見抜く
category: math-estimation
subcategory: math-population-sample-statistic
topic: factorization-theorem
type: theorem
difficulty: 2
priority: S
hashtags: [十分統計量, ネイマンの分解定理, 一様分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ネイマンの分解定理 }]
---
## 問題
$X_1,\ldots,X_n$ は一様分布 $U(0,\theta)$ からの独立同分布標本とする。ただし $\theta>0$、確率密度関数は $f_\theta(x)=\theta^{-1}\mathbf 1\{0\le x\le\theta\}$ である。ネイマンの分解定理を使い、$\theta$ の十分統計量を求めよ。
## 答え
$T=X_{(n)}=\max_iX_i$ が $\theta$ の十分統計量である。
## 使用公式・定理
ネイマンの分解定理：$L(\theta;x)=g_\theta(T(x))h(x)$ と書ければ $T$ は $\theta$ の十分統計量である。
## 計算例
$$L(\theta;x)=\prod_{i=1}^n\frac1\theta\mathbf 1\{0\le x_i\le\theta\}$$
$$=\underbrace{\theta^{-n}\mathbf 1\{x_{(n)}\le\theta\}}_{g_\theta(x_{(n)})}
\underbrace{\mathbf 1\{x_{(1)}\ge0\}}_{h(x)}.$$
$h(x)$ は $\theta$ に依存しないので、ネイマンの分解定理から $T=X_{(n)}=\max_iX_i$ は十分統計量である。
## 条件
台の上端が $\theta$ に依存するため、$\mathbf 1\{x_{(n)}\le\theta\}$ を $h(x)$ 側へ移してはいけない。

<!-- CARD -->
---
id: est-bernoulli-mle
title: ベルヌーイ標本の最尤推定量を求める
category: math-estimation
subcategory: math-likelihood-mle
topic: maximum-likelihood
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 尤度, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤法 }]
---
## 問題
ベルヌーイ分布 $P(X=x)=p^x(1-p)^{1-x}$（$x\in\{0,1\}$、$p\in[0,1]$）からの独立同分布標本が $1,0,1,1,0$ のとき、最尤推定値を求めよ。
## 方針
積を対数で和にし、内部解と境界を比較する。
## 使用公式・定理
$$\widehat p\in\mathop{\rm arg\,max}_{0\le p\le1}L(p;x)=\mathop{\rm arg\,max}_{0\le p\le1}\ell(p;x).$$
## 計算例
$$\begin{aligned}\ell(p)&=3\log p+2\log(1-p),\\\ell'(p)&=\frac3p-\frac2{1-p}\\&=\frac{3-5p}{p(1-p)}=0.\end{aligned}$$
よって $\widehat p=3/5$。また $\ell''(p)=-3/p^2-2/(1-p)^2<0$ なので最大である。
## 重要な一手
成功回数と失敗回数を数えてから対数尤度を書く。
## 注意
全成功・全失敗なら最大値は境界にある。

<!-- CARD -->
---
id: est-bias-variance
title: 平均二乗誤差を分散とバイアスに分解する
category: math-estimation
subcategory: math-point-estimator-properties
topic: mse-decomposition
type: proof_step
difficulty: 2
priority: A
hashtags: [不偏性, MSE, 証明の一手]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
---
## 問題
$E[T^2]<\infty$ とする。推定量 $T$ の $\theta$ に対する平均二乗誤差を分解せよ。
## 答え
$T-\theta=(T-E[T])+(E[T]-\theta)$ と中心化する。
## 使用公式・定理
$$\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2]=\operatorname{Var}_\theta(T)+\operatorname{Bias}_\theta(T)^2.$$
## 計算例
交差項の期待値は $2(E[T]-\theta)E[T-E[T]]=0$ なので
$$E[(T-\theta)^2]=\operatorname{Var}(T)+(E[T]-\theta)^2.$$
## 重要な一手
確率変数部分と定数のバイアス部分を分ける。

<!-- CARD -->
---
id: est-delta-log
title: デルタ法で対数変換後の漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method
type: strategy
difficulty: 3
priority: S
hashtags: [デルタ法, 漸近分布, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
$0<\sigma^2<\infty$、$\theta>0$ とし、正値推定量 $\widehat\theta$ が $\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$、すなわち正規分布 $N(0,\sigma^2)$ へ分布収束するとする。$\log\widehat\theta$ の漸近分布を求めよ。
## 方針
$g(x)=\log x$ の真値での導関数を漸近分散へ掛ける。
## 使用公式・定理
デルタ法：$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ かつ $g$ が $\theta$ で微分可能なら
$$\sqrt n\{g(\widehat\theta)-g(\theta)\}\xrightarrow{d}N(0,\{g'(\theta)\}^2\sigma^2).$$
## 計算例
$g'(\theta)=1/\theta$ より
$$\sqrt n(\log\widehat\theta-\log\theta)\xrightarrow{d}N\left(0,\frac{\sigma^2}{\theta^2}\right).$$
## 重要な一手
微分は推定値でなく真値 $\theta$ で評価する。
