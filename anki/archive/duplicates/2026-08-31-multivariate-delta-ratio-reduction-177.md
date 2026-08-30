---
id: engasym-delta-ratio
title: 2推定量の比の漸近分散を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: multivariate-delta-ratio
type: calc_step
difficulty: 3
priority: S
hashtags:
  - デルタ法
  - 比率
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
archive_reason: duplicate
canonical_card: asym-ratio-two-means-delta
coverage_card: asym-ratio-two-means-delta
archive_note: 多変量デルタ法の正本へ、一般の分散共分散行列Sigmaに対する比 a_hat/b_hat の勾配、V=Sigma11/b^2+a^2
  Sigma22/b^4-2a Sigma12/b^3、独立2標本の数値例、共分散ありの数値例、分母が0近傍での不安定性まで統合済み。
---
## 問題
$\sqrt n\{(\widehat a,\widehat b)^{\mathsf T}-(a,b)^{\mathsf T}\}\xrightarrow{d}N_2(0,\Sigma)$、$b\ne0$ とする。$\widehat a/\widehat b$ の漸近分散を示せ。（ここで $N$ は正規分布を表す。）
## 記号・用語
$\Sigma_{11},\Sigma_{22},\Sigma_{12}$ は各推定量の漸近分散・共分散である。
## 使用公式・定理
多変量デルタ法：漸近分散定数は $\nabla g^{\mathsf T}\Sigma\nabla g$。
## 一手／方針
$g(a,b)=a/b$ の勾配 $(1/b,-a/b^2)^{\mathsf T}$ を作る。
## 答え
$$V_g=\frac{\Sigma_{11}}{b^2}+\frac{a^2\Sigma_{22}}{b^4}-\frac{2a\Sigma_{12}}{b^3}.$$
## 計算例
独立なら $\Sigma_{12}=0$ で交差項が消える。
## 注意
分母 $b$ が0に近いと正規近似が不安定になる。
