---
id: engasym-sample-size-mean-precision
title: 漸近信頼区間の幅から必要標本数を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-sample-size
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 標本数設計
  - 信頼区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: ci-sample-size-for-width
coverage_card: ci-sample-size-for-width
archive_note: 漸近信頼区間の目標半幅から必要標本数を逆算する判断単位は区間推定側の正本と同一。正本は n=ceil((z_{alpha/2}
  sigma/d)^2)、切り上げ、sigma未知時の事前推定、許容誤差を半分にすると標本数約4倍まで既に扱う。engineering側の
  sigma=12,d=3,n=62 は数値代入例なので吸収可能。
---
## 問題
標準偏差が約12の工程平均を、95%信頼区間の半幅3以内で推定したい。正規近似で必要な最小標本数を求めよ。
## 記号・用語
半幅 $E$ は点推定値から信頼区間端点までの距離である。
## 使用公式・定理
母平均の正規近似区間の半幅は $E=z_{0.025}\sigma/\sqrt n$。
## 一手／方針
$n$ について解き、最後に切り上げる。
## 答え
$$n\ge\left(\frac{1.96(12)}3\right)^2=61.4656.$$
したがって最小標本数は $n=62$。
## 計算例
$n=61$ へ切り捨てると目標半幅をわずかに超える。
## 注意
事前の標準偏差12が不確かなら余裕を持たせる。
