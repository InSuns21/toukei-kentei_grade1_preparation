---
id: engqc-nonnormal-capability
title: 非正規工程で6シグマ能力指数を使う注意点を答える
category: applied-engineering
subcategory: engineering-quality
topic: nonnormal-capability
type: recognition
difficulty: 2
priority: A
hashtags:
  - 工程能力指数
  - 非正規分布
  - 分位点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 工程能力指数
archive_reason: duplicate
canonical_card: engqc-cpk-offcenter
archive_note: 非正規工程では平均±3σと正規分布の分位点・規格外率が対応しないためCpkからppmを機械的に換算できない点、分布当てはめ・変換・実分位点による代替評価をcanonical
  cardへ統合済み。
---
## 問題
強く右に歪んだ安定工程で、平均と標準偏差だけから $C_{pk}$ と規格外ppmを結び付ける問題点を答えよ。
## 記号・用語
ppmはparts per million（100万分率）であり、通常のppm換算は正規分布の裾確率を使う。
## 使用公式・定理
非正規分布では平均から3標準偏差の位置と0.135%分位点が一致しない。
## 一手／方針
標準偏差幅と実際の分位点幅を区別する。
## 答え
$C_{pk}$ の数値が同じでも実際の規格外率は正規換算と大きく異なり得る。変換、適切な分布モデル、または分位点ベースの能力評価を用いる。
## 計算例
寿命や待ち時間のような非負・右裾分布では特に注意する。
## 注意
非正規だから能力評価不能なのではなく、評価方法を分布に合わせる。
