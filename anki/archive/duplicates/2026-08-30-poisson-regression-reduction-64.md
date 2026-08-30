---
id: glm-poisson-offset
title: 曝露量をoffsetとして組み込む
category: applied-common
subcategory: applied-multivariate
topic: poisson-offset
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ポアソン回帰
  - offset
  - 発生率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 対数リンク
archive_reason: duplicate
canonical_card: glm-poisson-mean-ratio
archive_note: 曝露量・発生率・offsetの定義と数値計算をポアソン回帰正本へ統合済み。
---
## 問題
観測時間tに比例する件数Yをポアソン回帰し、率 $\lambda$ に $\log\lambda=\beta_0+\beta_1x$ を仮定する。平均の式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\log t$ を係数1に固定したoffsetとする。

## 答え
$$E[Y\mid x,t]=t\lambda=t\exp(\beta_0+\beta_1x),$$
したがって
$$\log E[Y\mid x,t]=\log t+\beta_0+\beta_1x.$$

## 計算例
観測時間2倍なら同じ率で期待件数も2倍。

## 注意
t>0が必要。
