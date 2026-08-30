---
id: engproc-pacf-significance-output
title: PACF出力から有意なラグを判定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: pacf-output
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 偏自己相関
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-acf-pacf-identification
coverage_card: ts-acf-pacf-identification
archive_note: n=100で近似95%限界0.196を計算し、PACF
  0.55,-0.24,0.12からラグ1・2を有意と判定する数値例までACF・PACF canonical cardへ統合済み。
---
## 問題
$n=100$ の系列のPACF出力がラグ1で0.55、ラグ2で$-0.24$、ラグ3で0.12であった。近似95%限界 $\pm1.96/\sqrt n$ で有意なラグを判定せよ。
## 記号・用語
PACFは偏自己相関関数、$n$ は観測数である。有意とは近似限界の外側にあることをいう。
## 使用公式・定理
大標本での目安は $\pm1.96/\sqrt n$。
## 一手／方針
限界を数値化し、各PACFの絶対値と比較する。
## 答え
$$1.96/\sqrt{100}=0.196.$$
$|0.55|,|-0.24|>0.196$、$|0.12|<0.196$ なので、ラグ1と2が有意でラグ3は有意でない。
## 計算例
この切れ方はAR(2)候補と整合する。
## 注意
複数ラグの同時検定ではなく、次数選択の近似的な診断である。

<!-- CARD -->

---
id: engproc-arima-forecast-output
title: ARIMA予測出力から予測区間を復元する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arima-software-output
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - ARIMA過程
  - ソフトウェア出力
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
coverage_card: engproc-arima110-difference-forecast
archive_note: forecast=80.0、prediction standard
  error=2.5から95%予測区間(75.1,84.9)を復元し、係数標準誤差との違いまでARIMA予測canonical cardへ統合済み。
---
## 問題
ARIMAモデルの1期先予測出力が `forecast = 80.0`, `standard error = 2.5` であった。正規近似による95%予測区間を求めよ。
## 記号・用語
`forecast` は条件付き平均、`standard error` は将来観測の予測誤差標準偏差である。
## 使用公式・定理
正規革新を仮定した近似95%予測区間は
$$\widehat X_{t+h\mid t}\pm1.96\operatorname{se}_h.$$
## 一手／方針
標準誤差を1.96倍し、点予測の両側へ加減する。
## 答え
$$80.0\pm1.96(2.5)=80.0\pm4.9,$$
よって予測区間は $(75.1,84.9)$。
## 計算例
実現値85.3はこの区間の上側外にあり、予測モデルの再点検材料になる。
## 注意
係数推定の標準誤差ではなく、予測誤差の標準誤差を用いる。
