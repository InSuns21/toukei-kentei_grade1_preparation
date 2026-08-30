---
id: reg-feasible-gls-steps
title: 実行可能一般化最小二乗法の手順を答える
category: applied-common
subcategory: applied-multiple-regression
topic: feasible-gls
type: recognition
difficulty: 3
priority: B
hashtags:
  - 一般化最小二乗推定
  - FGLS
  - 分散モデル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化最小二乗推定
archive_reason: duplicate
canonical_card: reg-gls-estimator
archive_note: 未知の誤差共分散を推定してGLSへ代入するFGLS手順をGLS正本へ統合済み。
---
## 問題
誤差分散共分散行列Ωが未知だが母数化できるとき、実行可能一般化最小二乗法（FGLS）の手順を述べよ。

## 記号・用語
- FGLS：実行可能一般化最小二乗法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

既知Ωの一般化最小二乗推定量へ推定Ωを代入する。

## 答え
まず最小二乗法などで残差を得て分散・相関モデルの母数を推定し $\widehat\Omega$ を作る。次に
$$\widehat{\boldsymbol\beta}_{\mathrm{FGLS}}
=(\boldsymbol X^{\mathsf T}\widehat\Omega^{-1}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\widehat\Omega^{-1}\boldsymbol y$$
を計算する。

## 計算例
必要なら分散モデルと係数推定を反復更新する。

## 注意
Ωの誤指定は効率や標準誤差へ影響する。

<!-- CARD -->

---
id: reg-wls-two-points
title: 重み付き最小二乗の重みを分散から決める
category: applied-common
subcategory: applied-multiple-regression
topic: weighted-least-squares
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一般化最小二乗推定
  - WLS
  - 不均一分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化最小二乗推定
archive_reason: duplicate
canonical_card: reg-gls-estimator
archive_note: 対角誤差共分散で逆分散重みを用いるWLSと数値例をGLS正本へ統合済み。
---
## 問題
独立な2観測の誤差分散がそれぞれ1と4である。WLSの相対重みを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Q=\sum_iw_i(y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2$、$w_i\propto1/\sigma_i^2$。

## 答え
分散の逆数を用いるので
$$w_1:w_2=1/1:1/4=4:1.$$
第1観測を第2観測の4倍重く扱う。

## 計算例
共通倍率は推定係数を変えない。

## 注意
分散モデルを誤ると効率が落ち得る。
