---
id: reg-leverage-threshold
title: レバレッジを平均値と比較する
category: applied-common
subcategory: applied-multiple-regression
topic: leverage
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 回帰診断法
  - レバレッジ
  - ハット行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰診断法
archive_reason: duplicate
canonical_card: reg-dffits-numeric
archive_note: 平均レバレッジ k/n と 2k/n・3k/n の目安、高レバレッジだけでは影響点と断定しない注意まで
  reg-dffits-numeric 正本に統合済み。単独の閾値計算カードは重複のため隔離する。
---
## 問題
n=50、切片を含む係数総数k=5の回帰で観測iの $h_{ii}=0.30$ である。平均レバレッジの2倍を目安に判定せよ。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\sum_i h_{ii}=\operatorname{tr}(\boldsymbol H)=k$。ここでkは切片を含む係数総数。

## 答え
平均は $k/n=5/50=0.10$、2倍は0.20。$0.30>0.20$ なので説明変数空間で高レバレッジの観測と判定する。

## 計算例
$0\le h_{ii}\le1$。

## 注意
$2k/n$ は機械的な棄却基準ではなく診断の目安。
