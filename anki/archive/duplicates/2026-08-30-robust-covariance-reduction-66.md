---
id: reg-hc3-sandwich
title: HC3頑健共分散のレバレッジ補正を書く
category: applied-common
subcategory: applied-multiple-regression
topic: hc3-standard-error
type: formula
difficulty: 4
priority: A
hashtags:
  - 異分散
  - HC3
  - サンドイッチ推定量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 異分散と標準誤差
archive_reason: duplicate
canonical_card: reg-robust-sandwich
archive_note: HC3のレバレッジ補正、HC0との比較、適用上の注意を異分散頑健分散正本へ統合済み。
---
## 問題
HC3型の異分散頑健共分散推定量を書け。

## 記号・用語
- HC3：レバレッジ補正を行う異分散頑健共分散推定量
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

HC3は各残差をレバレッジで強く補正するサンドイッチ推定量。

## 答え
$$\widehat{\operatorname{Var}}_{\mathrm{HC3}}(\widehat{\boldsymbol\beta})
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\operatorname{diag}\left\{\frac{e_i^2}{(1-h_{ii})^2}\right\}
\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.$$

## 計算例
$h_{ii}=0$ ならその観測の補正倍率は1。

## 注意
誤差の独立性はなお必要で、系列相関には別の補正を使う。
