---
id: est-unbiased-construction
title: 不偏推定量の構成
category: math-estimation
subcategory: math-point-estimator-properties
topic: unbiased-construction
type: strategy
difficulty: 2
priority: S
hashtags:
  - 不偏推定量
  - 標本平均
  - 不偏分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 不偏性
archive_reason: duplicate
canonical_card: est-unbiasedness
archive_note: 期待値のずれを確認し倍率補正で不偏化する構成手順を、不偏性の定義と標本分散の数値例を含む正本へ統合済み。
---
## 問題
母平均 $\mu$ と母分散 $\sigma^2$ の不偏推定量を構成せよ。
## 答え
$\overline X$ は $\mu$ の不偏推定量。母分散には自由度補正した $S^2=\frac1{n-1}\sum_i(X_i-\overline X)^2$ を使うと不偏になる。
## 使用公式・定理
$$E[\overline X]=\mu,\qquad E\!\left[\frac1{n-1}\sum_i(X_i-\overline X)^2\right]=\sigma^2.$$
後者は平方和の恒等式
$$\sum_i(X_i-\overline X)^2
=\sum_i(X_i-\mu)^2-n(\overline X-\mu)^2$$
の期待値を取って
$$E\left[\sum_i(X_i-\overline X)^2\right]
=n\sigma^2-n\operatorname{Var}(\overline X)
=n\sigma^2-n\frac{\sigma^2}{n}=(n-1)\sigma^2$$
と得る。
## 計算例
$E[\sum_i(X_i-\overline X)^2]=(n-1)\sigma^2$ より $n-1$ で割ると不偏。
## 一手
最尤推定量（$n$ で割る方）はバイアスがある。不偏分散は $n-1$ で割る。

<!-- CARD -->

---
id: est-consistency-bias
category: math-estimation
subcategory: math-point-estimator-properties
topic: consistency
type: pitfall
difficulty: 2
priority: A
hashtags:
  - 一致性
  - 不偏性
  - 収束
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一致性
title: 不偏性と一致性の混同
archive_reason: duplicate
canonical_card: est-consistency
archive_note: 有偏でもバイアスとばらつきが消えれば一致しうる点を、分母nの標本分散を使って一致性の定義と同じ正本へ統合済み。
---
## 問題
「不偏推定量は一致推定量である」は正しいか。反例を挙げよ。
## 答え
誤り。$T=X_1$（$\mu$ の推定量）は不偏だが $\operatorname{Var}(X_1)=\sigma^2$ のままで $n\to\infty$ でも $\mu$ に収束しない。一致するには分散が0へ向かう必要がある。
## 使用公式・定理
一致の十分条件：$E[T_n]\to\theta$ かつ $\operatorname{Var}(T_n)\to0$。
## 計算例
各 $n$ で $T_n=X_n$（その標本の最後の1観測だけを使う）とすれば $E[T_n]=\mu$ で不偏だが、$\operatorname{Var}(T_n)=\sigma^2$ のままなので一致しない。
## 一手
不偏性は中心、一致性は収束。不偏でも分散が減らないと一致しない。逆に、一致でも有限標本でバイアスがありうる。
