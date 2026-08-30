---
id: reg-lasso-vs-ridge
title: LassoとRidgeの役割を区別する
category: applied-common
subcategory: applied-multiple-regression
topic: lasso-ridge-comparison
type: recognition
difficulty: 2
priority: B
hashtags:
  - L1正則化法
  - Ridge回帰
  - 変数選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: duplicate
canonical_card: reg-lasso-soft-threshold
archive_note: L1/L2罰則、疎化と連続縮小、標準化、相関説明変数での挙動比較をLasso正本へ統合済み。
---
## 問題
LassoとRidgeを、罰則と係数が厳密に0になり得るかで比較せよ。

## 記号・用語
- L1：係数絶対値の和を使うL1罰則
- L2：係数平方和を使うL2罰則

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

L1球には軸上の角があり、二次損失の等高線が角で接しやすい。

## 答え
LassoはL1罰則 $\lambda\sum_j|\beta_j|$ で疎な解を作り、変数選択を同時に行える。RidgeはL2罰則 $\lambda\sum_j\beta_j^2$ で係数を連続的に縮小するが、通常は厳密な0にしない。

## 計算例
強く相関する変数群ではRidgeは分散を安定化しやすい。

## 注意
$\lambda$ は交差検証などで選び、尺度依存を避けるため標準化する。
