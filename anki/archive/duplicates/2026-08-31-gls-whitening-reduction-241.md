---
id: enginf-gls-whitening
title: 一般化最小二乗法を白色化変換として説明する
category: applied-engineering
subcategory: engineering-linear-inference
topic: generalized-least-squares
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 線形モデル
  - 一般化最小二乗法
  - 白色化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-gls-estimator
coverage_card: reg-gls-estimator
archive_note: 一般化最小二乗法を白色化して通常の最小二乗法へ帰着する技能は reg-gls-estimator に吸収済み。正本では
  C=Omega^(-1/2) と明示して変換後誤差の分散共分散行列が sigma^2 I
  になることからGLS式を再導出し、さらに二次形式最小化、逆分散WLS、FGLS、数値例まで同時に保持しているため、工学側カード固有の技能は残らない。
---
## 問題
$\operatorname{Var}(\varepsilon)=\sigma^2\Omega$ で、$C^{\mathsf T}C=\Omega^{-1}$ とする。一般化最小二乗法（generalized least squares; GLS）が変換後最小二乗法になることを示せ。
## 記号・用語
$\Omega$ は既知の正定値な誤差分散共分散構造（尺度行列）、$C$ は白色化行列である。
## 使用公式・定理
モデル左から $C$ を掛けると $CY=CX\beta+C\varepsilon$。
## 一手／方針
変換後誤差の分散を計算し、最小二乗法公式を戻す。
## 答え
$$\operatorname{Var}(C\varepsilon)=\sigma^2C\Omega C^{\mathsf T}=\sigma^2I,$$
したがって
$$\widehat\beta_{\mathrm{GLS}}=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}Y.$$
## 計算例
$\Omega$ が対角なら一般化最小二乗法は逆分散重みのWLSになる。
## 注意
$\Omega$ の推定誤差がある場合は有限標本分布が変わり得る。
