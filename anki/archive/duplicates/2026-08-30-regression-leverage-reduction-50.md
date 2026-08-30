---
id: reg-leverage-meaning
title: レバレッジを定義して平均を求める
category: math-data-analysis
subcategory: math-regression
topic: leverage
type: formula
difficulty: 3
priority: A
hashtags:
  - レバレッジ
  - ハット行列
  - 影響点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 残差
archive_reason: duplicate
canonical_card: reg-hat-matrix-properties
archive_note: レバレッジの定義、総和と平均をハット行列の射影性から導く正本へ統合済み。
---
## 問題
標本サイズを $n$、切片以外の説明変数数を $p$ とする列フルランクの線形回帰で、ハット行列の対角要素であるレバレッジ $h_{ii}$ の定義、範囲、全観測での平均を書け。

## 記号・用語
- ハット行列：観測ベクトルを当てはめ値へ写す射影行列
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat Y_i=\sum_jh_{ij}Y_j$ で、$h_{ii}$ は自身の観測値が当てはめ値へ及ぼす重み。

## 答え
$h_{ii}$ はハット行列 $H$ の第i対角要素で
$$0\le h_{ii}\le1,\qquad \sum_i h_{ii}=\operatorname{tr}(H)=p+1.$$
したがって平均は $(p+1)/n$。

## 計算例
$n=30,p=2$ なら平均レバレッジは3/30=0.1。

## 注意
高レバレッジだけでは影響点とは限らず、残差の大きさも見る。

<!-- CARD -->

---
id: reg-residual-variance-leverage
title: 最小二乗法残差の分散をレバレッジで表す
category: math-data-analysis
subcategory: math-regression
topic: residual-variance
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 残差
  - レバレッジ
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 残差
archive_reason: duplicate
canonical_card: reg-hat-matrix-properties
archive_note: 残差生成行列I-Hから残差共分散とVar(e_i)=sigma^2(1-h_ii)を導く正本へ統合済み。
---
## 問題
線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で $\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I$ とする。ハット行列を $\boldsymbol H$、当てはめ値を $\widehat{\boldsymbol Y}=\boldsymbol H\boldsymbol Y$、残差を $\boldsymbol e=\boldsymbol Y-\widehat{\boldsymbol Y}=(\boldsymbol I-\boldsymbol H)\boldsymbol Y$ と定義する。残差ベクトルの共分散と第 $i$ 残差の分散を求めよ。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$(I-H)^2=I-H$。

## 答え
$$e=(I-H)\varepsilon$$
なので、$I-H$ の対称冪等性より
$$\operatorname{Var}(e)=\sigma^2(I-H),$$
$$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii}).$$

## 計算例
$h_{ii}=0.8$ なら残差分散は $0.2\sigma^2$。

## 注意
生の残差は高レバレッジ点で分散が小さいため、標準化して比較する。

<!-- CARD -->

---
id: reg-studentized-residual
title: 標準化残差を計算する
category: math-data-analysis
subcategory: math-regression
topic: studentized-residual
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 標準化残差
  - レバレッジ
  - 外れ値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 残差
archive_reason: duplicate
canonical_card: reg-hat-matrix-properties
archive_note: レバレッジによる残差分散差を補正する標準化残差を数値例付き正本へ統合済み。
---
## 問題
残差を $e_i$、残差標準偏差を $s$、ハット行列の対角要素であるレバレッジを $h_{ii}$ とする。$e_i=3,s=2,h_{ii}=0.4375$ の内部標準化残差を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii})$。

## 答え
$$r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
=\frac3{2\sqrt{0.5625}}
=\frac3{1.5}=2.$$

## 計算例
$$1-h_{ii}=1-0.4375=0.5625,
\qquad\sqrt{0.5625}=0.75.$$
したがって
$$r_i=\frac3{2\cdot0.75}=2.$$
$|r_i|=2$ なので、応答方向の外れ値候補として確認する。

## 注意
厳密な外れ値検定には当該点を除いて分散推定する外部Student化残差を使う。
