---
id: reg-elastic-net-objective
title: Elastic Netの目的関数を書く
category: applied-common
subcategory: applied-multiple-regression
topic: elastic-net
type: formula
difficulty: 3
priority: B
hashtags:
  - L1正則化法
  - Elastic Net
  - 変数選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: reference_only
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: Elastic NetはL1とL2を同時に入れる派生としてRidge/Lasso
  canonicalへ式と端点条件を吸収済み。独立した定義カードは600枚正本では参照寄り。
---
## 問題
Elastic Netの目的関数を書き、LassoとRidgeを含むことを示せ。

## 記号・用語
- L1：係数絶対値の和を使うL1罰則
- L2：係数平方和を使うL2罰則

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

L1とL2罰則の凸結合。

## 答え
$$\frac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|^2
+\lambda\left\{\alpha\sum_j|\beta_j|+\frac{1-\alpha}{2}\sum_j\beta_j^2\right\}.$$
$\alpha=1$ でLasso、$\alpha=0$ でRidge型になる。

## 計算例
相関する変数群をまとめて残しつつ疎性も得やすい。

## 注意
通常は切片を罰せず説明変数を標準化する。
