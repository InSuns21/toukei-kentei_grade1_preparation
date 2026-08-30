---
id: mv-hotelling-f-transform
title: HotellingのT²をF統計量へ変換する
category: applied-common
subcategory: applied-multivariate
topic: hotelling-f-transform
type: calc_step
difficulty: 4
priority: B
hashtags:
  - HotellingのT2検定
  - F分布
  - 多変量正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: HotellingのT²検定
archive_reason: duplicate
canonical_card: mv-hotelling-one-sample
archive_note: 1標本Hotelling T²の計算から正確なF変換までを一つの検定手順としてcanonicalへ統合済み。
---
## 問題
独立な10個の観測が2次元正規分布から得られ、標本分散共分散行列Sが可逆である。1標本T²検定で $T^2=15$ のときF統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

多変量正規母集団からの独立標本でSが可逆なら、帰無仮説下で $\{(n-p)/(p(n-1))\}T^2\sim F_{p,n-p}$。

## 答え
$$F=\frac{n-p}{p(n-1)}T^2
=\frac{8}{2\cdot9}15=\frac{20}{3}\approx6.67.$$
帰無仮説下で $F_{2,8}$ に従う。

## 計算例
n>pが必要。

## 注意
標本共分散の分母をn-1とする規約。

<!-- CARD -->

---
id: mv-factor-communality
title: 共通性と独自性を計算する
category: applied-common
subcategory: applied-multivariate
topic: communality-uniqueness
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 因子分析
  - 共通性
  - 独自性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共通性と独自性
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: 共通性と独自性は因子モデルの共分散分解の対角成分であり、負荷量0.6,0.5の数値例までcanonicalへ吸収済み。
---
## 問題
標準化変数の2因子負荷量が0.6,0.5である。共通性と独自性を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$h_i^2=\sum_j\lambda_{ij}^2$。

## 答え
$$h_i^2=0.6^2+0.5^2=0.61,$$
標準化されているので
$$\psi_i=1-h_i^2=0.39.$$

## 計算例
共通因子が分散の61%を説明する。

## 注意
斜交回転では単純な平方和解釈に注意する。

<!-- CARD -->

---
id: mv-lda-numeric
title: 線形判別得点を数値計算する
category: applied-common
subcategory: applied-multivariate
topic: lda-numeric
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 判別分析
  - 線形判別
  - 分類
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: Σ^{-1}(μ1-μ0)からフィッシャー方向を求める数値計算を一般式のcanonicalへ吸収済み。
---
## 問題
$\boldsymbol\mu_1=(2,1)^{\mathsf T}$、$\boldsymbol\mu_0=(0,0)^{\mathsf T}$、$\boldsymbol\Sigma=\operatorname{diag}(2,1)$ のときフィッシャー方向を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\boldsymbol w\propto\boldsymbol\Sigma^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_0)$。

## 答え
$$\boldsymbol w=\boldsymbol\Sigma^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_0)
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}1\\1\end{pmatrix}.$$

## 計算例
判別得点は $x_1+x_2$。

## 注意
事前確率と誤分類費用が閾値を変える。

<!-- CARD -->

---
id: mv-lda-vs-qda
title: LDAとQDAの仮定を区別する
category: applied-common
subcategory: applied-multivariate
topic: lda-qda-comparison
type: recognition
difficulty: 2
priority: B
hashtags:
  - 判別分析
  - LDA
  - QDA
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: LDAは共通共分散で線形境界、QDAは群別共分散で二次境界という違いを正規対数密度の比較としてclassification canonicalへ統合済み。
---
## 問題
線形判別分析（LDA）と二次判別分析（QDA）の共分散仮定と境界を比較せよ。

## 記号・用語
- LDA：線形判別分析
- QDA：二次判別分析

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規密度の二次形式 $-(\boldsymbol x-\boldsymbol\mu_k)^{\mathsf T}\boldsymbol\Sigma_k^{-1}(\boldsymbol x-\boldsymbol\mu_k)/2$。

## 答え
LDAは全群で共通分散共分散行列を仮定し、判別境界は線形。QDAは群別分散共分散行列を許し、対数密度比に二次項が残るため境界は二次。

## 計算例
QDAは柔軟だが推定母数が多い。

## 注意
小標本・高次元ではLDAの方が安定しやすい。

<!-- CARD -->

---
id: mv-kmeans-objective
title: k-meansの目的関数を判定する
category: applied-common
subcategory: applied-multivariate
topic: k-means-objective
type: formula
difficulty: 2
priority: B
hashtags:
  - クラスター分析
  - k-means法
  - 群内平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: k-means法
archive_reason: duplicate
canonical_card: mv-kmeans-one-iteration
archive_note: k-meansの群内平方和目的関数と、最近傍割当て・重心更新が同じ目的関数を下げる操作であることを数値反復canonicalへ吸収済み。
---
## 問題
k-means法が最小化する目的関数を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

平方距離和は平均で最小になる。

## 答え
$$W(C_1,\ldots,C_K)=\sum_{k=1}^K\sum_{i\in C_k}\|\boldsymbol x_i-\bar{\boldsymbol x}_k\|^2.$$
固定した割当てに対して最適な代表点は各クラスタの標本平均。

## 計算例
Kを増やすとWは増えない。

## 注意
カテゴリ変数や外れ値に弱い。
