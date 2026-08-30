---
id: engproc-arima010-drift-forecast
title: ドリフト付きARIMA(0,1,0)の多期予測を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arima010-forecast
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - ARIMA過程
  - ドリフト
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMA過程
archive_reason: duplicate
canonical_card: engproc-arima110-difference-forecast
archive_note: ドリフト付きARIMA(0,1,0)は、差分を予測して水準へ累積する一般ARIMA予測workflowの特殊例としてcanonical cardへ統合済み。
---
## 問題
$\Delta X_t=1.5+\varepsilon_t$、$X_t=100$ とする。$3$ 期先の点予測を求めよ。
## 記号・用語
$\Delta X_t=X_t-X_{t-1}$、定数1.5は1期当たりのドリフトである。
## 使用公式・定理
ドリフト付きARIMA(0,1,0)では
$$\widehat X_{t+h\mid t}=X_t+hd$$
である。$d$ はドリフト。
## 一手／方針
未来の各革新の条件付き期待値を0とし、ドリフトを $h$ 回累積する。
## 答え
$$\widehat X_{t+3\mid t}=100+3(1.5)=104.5.$$
## 計算例
1期先から順に $101.5,103.0,104.5$ と増える。
## 注意
ドリフト $d$ と水準系列の切片を混同しない。差分系列の平均が $d$ である。
