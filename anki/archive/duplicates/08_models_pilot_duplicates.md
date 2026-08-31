---
id: model-logistic-odds
title: ロジスティック回帰係数をオッズ比で読む
category: applied-common
subcategory: applied-multivariate
topic: logistic-regression
type: recognition
difficulty: 2
priority: A
hashtags:
  - 一般化線形モデル
  - ロジスティック回帰
  - オッズ比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-logistic-score
---
## 問題
$\log\{p(x)/(1-p(x))\}=\beta_0+0.7x$ のとき、$x$ が1増えた際のオッズ比を求めよ。
## 答え
線形予測子の差を指数化する。
## 使用公式・定理
ロジットリンク $\log\{p(x)/(1-p(x))\}=\beta_0+\beta_1x$ では、$x$ が1増えるとオッズは $e^{\beta_1}$ 倍になる。
## 計算例
$$\exp\{(\beta_0+0.7(x+1))-(\beta_0+0.7x)\}=e^{0.7}\approx2.01.$$
## 注意
確率そのものが常に約2倍になるわけではない。

<!-- CARD -->

---
id: model-contrast
title: 線形対比の係数条件を確認する
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-contrast
type: condition
difficulty: 2
priority: S
hashtags:
  - 線形対比
  - 制約
  - 分散分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形対比と制約
archive_reason: duplicate
canonical_card: reg-general-linear-hypothesis
---
## 問題
3群平均の式 $\mu_1-(\mu_2+\mu_3)/2$ は線形対比か。
## 答え
係数の和が0なら線形対比である。
## 使用公式・定理
$\sum_{i=1}^kc_i=0$ を満たす $\sum_{i=1}^kc_i\mu_i$ を線形対比という。
## 計算例
$$1-\frac12-\frac12=0,$$
したがってこれは群1と群2・3の平均を比較する対比である。
## 注意
係数を定数倍しても同じ比較方向だが、推定量の分散は倍率の二乗倍になる。
