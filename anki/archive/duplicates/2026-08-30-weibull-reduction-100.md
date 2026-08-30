---
id: engrel-weibull-hazard-shape
title: ワイブル分布の形状母数から故障率傾向を判定する
category: applied-engineering
subcategory: engineering-quality
topic: weibull-hazard
type: recognition
difficulty: 2
priority: A
hashtags:
  - 信頼性
  - ワイブル分布
  - 故障率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信頼性
archive_reason: duplicate
canonical_card: engrel-weibull-reliability
archive_note: ワイブル信頼度から故障率を導出し、形状母数による減少・一定・増加故障率まで判定するcanonical cardへ統合済み。浴槽曲線カードは別概念として残す。
---
## 問題
ワイブル分布（Weibull distribution）に従う寿命の形状母数 $k$ が $k<1,k=1,k>1$ のとき、故障率の時間傾向を答えよ。
## 記号・用語
尺度 $\lambda>0$ のワイブル分布の故障率は $h(t)=\frac{k}{\lambda}(t/\lambda)^{k-1}$。
## 使用公式・定理
指数 $k-1$ の符号で単調性を判定する。
## 一手／方針
$t^{k-1}$ が増えるか減るかを見る。
## 答え
$k<1$ は減少故障率、$k=1$ は一定故障率、$k>1$ は増加故障率。
## 計算例
初期故障・偶発故障・摩耗故障の各局面の近似に対応する。
## 注意
浴槽曲線全体を単一ワイブル分布だけで表すとは限らない。
