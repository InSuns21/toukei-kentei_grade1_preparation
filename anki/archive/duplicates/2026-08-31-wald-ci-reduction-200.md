---
id: engasym-wald-ci-generic
title: 漸近正規推定量からWald信頼区間を作る
category: applied-engineering
subcategory: engineering-asymptotics
topic: wald-confidence-interval
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 漸近分散
  - Wald信頼区間
  - 最尤推定量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: ci-asymptotic-mle
coverage_card: ci-asymptotic-mle
archive_note: 区間推定側の正本を任意の漸近正規推定量に対するWald信頼区間へ一般化済み。正本に theta_hat ± z_{alpha/2}
  SE_hat、theta_hat=2.5・SE=0.4 の95%区間
  (1.716,3.284)、漸近分散定数Vと推定量自身のV/nの区別、MLEのフィッシャー情報量（1次元）による特殊化まで統合済み。
---
## 問題
$\widehat\theta=2.5$、推定漸近標準誤差0.4のとき、95% Wald信頼区間を求めよ。
## 記号・用語
Wald区間は推定量の近似正規性を用いる区間である。
## 使用公式・定理
$$\widehat\theta\pm z_{0.025}\widehat{\operatorname{SE}}(\widehat\theta),\qquad z_{0.025}=1.96.$$
## 一手／方針
標準誤差に1.96を掛けて推定値へ加減する。
## 答え
$$2.5\pm1.96(0.4)=2.5\pm0.784,$$
よって $(1.716,3.284)$。
## 計算例
帰無値0は区間外なので5%両側Wald検定では棄却する。
## 注意
母数空間の境界を区間が越える場合は変換区間や尤度区間も検討する。
