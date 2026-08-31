---
id: enginf-logistic-wald-output
title: ロジスティック回帰出力をWald検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-wald-test
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 一般化線形モデル
  - Wald検定
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: test-wald-general
coverage_card: test-wald-general
archive_note: ロジスティック回帰の係数0.80・標準誤差0.25から Z_W=3.2 を計算する5%両側Wald検定、近似95%信頼区間
  (0.31,1.29)、完全分離・小標本での不安定性を test-wald-general へ吸収済み。1次元Waldの一般形と同じ技能である。
---
## 問題
係数推定値0.80、標準誤差0.25のロジスティック回帰出力について、$H_0:\beta=0$ のWald統計量と5%両側判定を求めよ。
## 記号・用語
Wald統計量は推定値と帰無値との差を推定標準誤差で標準化した量である。
## 使用公式・定理
大標本で $Z=(\widehat\beta-\beta_0)/\operatorname{SE}(\widehat\beta)\dot\sim N(0,1)$。
## 一手／方針
係数を標準誤差で割り、絶対値を1.96と比較する。
## 答え
$$Z=0.80/0.25=3.2.$$
$3.2>1.96$ なので5%水準で棄却する。
## 計算例
近似95%信頼区間は $0.80\pm1.96(0.25)=(0.31,1.29)$。
## 注意
小標本や完全分離ではWald近似が不安定になり得る。

<!-- CARD -->

---
id: enginf-glm-wald-joint
title: 一般化線形モデルの複数係数をWald検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-joint-wald
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 一般化線形モデル
  - 線形制約
  - Wald検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形制約
archive_reason: duplicate
canonical_card: test-wald-general
coverage_card: test-wald-general
archive_note: 複数制約 R theta=r のWald二次形式、制約差 (1,2)^T・推定分散 diag(0.25,1) から W=8
  を計算する数値例、自由度2のカイ二乗近似、有限標本の線形正規モデルF検定との違いを test-wald-general へ統合済み。
---
## 問題
2係数について $R\widehat\beta-r=(1,2)^{\mathsf T}$、この制約差の推定分散共分散行列 $R\widehat V R^{\mathsf T}$ が $\operatorname{diag}(0.25,1)$ である。Wald統計量を求めよ。
## 記号・用語
$R\beta=r$ は同時に課す2本の線形制約である。
## 使用公式・定理
$$W=(R\widehat\beta-r)^{\mathsf T}[R\widehat V R^{\mathsf T}]^{-1}(R\widehat\beta-r)\dot\sim\chi_q^2.$$
## 一手／方針
対角分散行列の逆行列を作り、標準化平方を足す。
## 答え
$$W=1^2/0.25+2^2/1=4+4=8.$$
## 計算例
$\chi^2_{2,0.05}=5.991$ より大きく、5%水準で同時制約を棄却する。
## 注意
線形正規モデルの有限標本F検定と異なり、一般化線形モデルでは通常大標本カイ二乗近似を使う。
