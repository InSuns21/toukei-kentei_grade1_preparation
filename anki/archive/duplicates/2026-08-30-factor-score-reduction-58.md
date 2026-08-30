---
id: mv-factor-score-regression
title: 回帰法による因子得点係数を書く
category: applied-common
subcategory: applied-multivariate
topic: factor-score
type: formula
difficulty: 4
priority: B
hashtags:
  - 因子分析
  - 因子得点
  - 回帰法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因子分析モデル
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: 回帰法による因子得点予測式を、共分散分解・回転と同じ因子分析正本へ統合済み。
---
## 問題
因子分析モデル $\boldsymbol X=\boldsymbol\mu+\boldsymbol\Lambda\boldsymbol F+\boldsymbol\varepsilon$ で $\operatorname{Var}(\boldsymbol F)=\boldsymbol I$、$\operatorname{Var}(\boldsymbol X)=\boldsymbol\Sigma$ とする。回帰法による因子得点予測式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

多変量線形回帰の最良線形予測係数は $\operatorname{Cov}(F,X)\operatorname{Var}(X)^{-1}$。

## 答え
共分散は
$$\operatorname{Cov}(\boldsymbol F,\boldsymbol X)=\boldsymbol\Lambda^{\mathsf T}.$$
したがって線形回帰による因子得点は
$$\widehat{\boldsymbol F}
=\boldsymbol\Lambda^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu).$$

## 計算例
1因子なら負荷量ベクトルと逆共分散で観測を重み付けする。

## 注意
因子得点は観測された真値ではなく推定値で、推定法により異なる。
