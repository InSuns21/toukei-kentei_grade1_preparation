---
id: glm-pearson-chi-square
title: Pearsonカイ二乗統計量を計算する
category: applied-common
subcategory: applied-multivariate
topic: pearson-chi-square
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 一般化線形モデル
  - Pearsonカイ二乗
  - 適合度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: Pearsonカイ二乗統計量
archive_reason: duplicate
canonical_card: glm-deviance-definition
archive_note: Pearson残差・Pearsonカイ二乗統計量と分散診断を一般化線形モデル診断正本へ統合済み。
---
## 問題
3観測について $(y_i,\widehat\mu_i,V(\widehat\mu_i))=(2,1,1),(3,4,4),(5,5,5)$ のときPearson統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各Pearson残差の二乗和。

## 答え
$$X_P^2=\sum_i\frac{(y_i-\widehat\mu_i)^2}{V(\widehat\mu_i)}
=\frac{1^2}{1}+\frac{(-1)^2}{4}+0=1.25.$$

## 計算例
分散母数推定では $X_P^2/(n-p)$ を用いることがある。

## 注意
小標本でのカイ二乗近似に注意する。

<!-- CARD -->

---
id: glm-likelihood-ratio-test
title: 一般化線形モデルの尤度比検定を計算する
category: applied-common
subcategory: applied-multivariate
topic: glm-likelihood-ratio
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 尤度比検定
  - モデル比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 尤度比によるモデル比較
archive_reason: duplicate
canonical_card: glm-deviance-definition
archive_note: 入れ子モデルの逸脱度差と尤度比検定を一般化線形モデル診断正本へ統合済み。
---
## 問題
縮小一般化線形モデルの逸脱度が30、完全一般化線形モデルが22、追加母数2個である。尤度比統計量を求めよ。

## 記号・用語
- 逸脱度：当てはめモデルと飽和モデルの最大対数尤度差を2倍した適合度指標
- $\ell$：対数尤度

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$G^2=2(\ell_F-\ell_R)$。

## 答え
$$G^2=D_R-D_F=30-22=8.$$
帰無仮説下で漸近的に自由度2のカイ二乗分布へ従う。

## 計算例
5%臨界値5.991なら8>5.991なので棄却する。

## 注意
モデルは入れ子で、通常の正則性条件が必要。

<!-- CARD -->

---
id: glm-overdispersion-diagnostic
title: 過分散をPearson統計量で診断する
category: applied-common
subcategory: applied-multivariate
topic: overdispersion
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 一般化線形モデル
  - 過分散
  - 分散母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 過分散
archive_reason: duplicate
canonical_card: glm-deviance-definition
archive_note: Pearson統計量による過分散倍率推定と解釈を一般化線形モデル診断正本へ統合済み。
---
## 問題
ポアソン回帰で $X_P^2=180$、残差自由度90である。分散倍率を推定し解釈せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

擬似尤度では $\operatorname{Var}(Y_i)=\phi V(\mu_i)$。

## 答え
$$\widehat\phi=\frac{X_P^2}{df_E}=\frac{180}{90}=2.$$
ポアソン仮定の約2倍の条件付き分散がある過分散を示す。

## 計算例
標準誤差は概ね $\sqrt2$ 倍へ補正される。

## 注意
欠落変数、群内相関、ゼロ過剰も原因になり得る。
