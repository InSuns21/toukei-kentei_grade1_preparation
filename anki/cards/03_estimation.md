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
$X_1,\ldots,X_n$ は一様分布 $U(0,\theta)$ からの独立同分布標本とする。ただし $\theta>0$、確率密度関数は $f_\theta(x)=\theta^{-1}\boldsymbol{1}_{\{0\le x\le\theta\}}$ である。ネイマンの分解定理を使い、$\theta$ の十分統計量を求めよ。
## 答え
$T=X_{(n)}=\max_iX_i$ が $\theta$ の十分統計量である。
## 使用公式・定理
ネイマンの分解定理：$L(\theta;x)=g_\theta(T(x))h(x)$ と書ければ $T$ は $\theta$ の十分統計量である。
## 計算例
$$L(\theta;x)=\prod_{i=1}^n\frac1\theta\boldsymbol{1}_{\{0\le x_i\le\theta\}}$$
$$=\underbrace{\theta^{-n}\boldsymbol{1}_{\{x_{(n)}\le\theta\}}}_{g_\theta(x_{(n)})}
\underbrace{\boldsymbol{1}_{\{x_{(1)}\ge0\}}}_{h(x)}.$$
$h(x)$ は $\theta$ に依存しないので、ネイマンの分解定理から $T=X_{(n)}=\max_iX_i$ は十分統計量である。
## 条件
台の上端が $\theta$ に依存するため、$\boldsymbol{1}_{\{x_{(n)}\le\theta\}}$ を $h(x)$ 側へ移してはいけない。
