---
id: anova-no-replication-limitation
title: 反復なし二元配置の限界を説明する
category: math-data-analysis
subcategory: math-anova
topic: twoway-no-replication
type: condition
difficulty: 3
priority: A
hashtags:
  - 二元配置分散分析
  - 反復なし
  - 交互作用
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二元配置分散分析
archive_reason: duplicate
canonical_card: anova-twoway-f-tests
archive_note: 反復なしでは純粋誤差自由度が0となり交互作用と誤差を分離できない点、加法モデル仮定に基づく扱い、2×3数値例まで二元配置正本へ吸収済み。
---
## 問題
各A×Bセルに観測が1個しかない二元配置で、交互作用を独立に検定できない理由を述べよ。

## 記号・用語
- 交絡（ここでの意味）：交互作用と誤差の寄与を観測データから別々に識別できないこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

セル内反復が、同じ処理組合せにおける純粋誤差を与える。

## 答え
$n=1$ では純粋誤差自由度
$$ab(n-1)=0$$
となる。残差に見える変動は交互作用と誤差を分離できないため、交互作用なしを仮定して交互作用平方和を誤差として使うほかない。

## 計算例
2×3反復なしなら全自由度5、A:1、B:2、残り2は交互作用と誤差が交絡する。

## 注意
「交互作用なし」はデータから検証できない追加仮定である。
