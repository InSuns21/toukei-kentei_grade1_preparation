---
id: bayes-conjugate-definition
title: 共役事前分布を定義する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: conjugate-prior
type: recognition
difficulty: 2
priority: A
hashtags:
  - ベイズ統計
  - 共役事前分布
  - 事後分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共役事前分布
archive_reason: duplicate
canonical_card: bayes-gamma-exponential-update
archive_note: 共役事前分布の定義と利点をGamma–指数の実際の共役更新canonicalへ吸収済み。定義だけの独立カードは残さない。
---
## 問題
尤度族に対する共役事前分布とは何か。利点も述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\pi(\theta\mid x)\propto L(\theta;x)\pi(\theta).$$

## 答え
事後分布が事前分布と同じ分布族に属するような事前分布。更新後の超母数を十分統計量の加算として得られ、正規化・事後要約・予測計算が容易になる。

## 計算例
二項尤度にBeta事前分布を置くと事後分布もBeta。

## 注意
共役性は計算上の便利さであり、事前知識への適合性とは別。

<!-- CARD -->

---
id: bayes-prior-sensitivity
title: 事前分布の感度分析を設計する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: prior-sensitivity
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 事前分布
  - 感度分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 無情報事前分布（基本）
archive_reason: duplicate
canonical_card: bayes-proper-improper
archive_note: 事前中心・尺度・裾を変えて事後平均・信用区間・予測・意思決定等を比較する感度分析をproper/improper正本へ吸収済み。
---
## 問題
事前分布の選択に対する感度分析で比較すべきものを述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\pi(\theta\mid x)\propto L(\theta;x)\pi(\theta)$$
より、データが弱いほど事前分布の影響が残る。

## 答え
科学的に妥当な複数の事前中心・尺度・裾の重さを設定し、事後平均・信用区間・予測分布・意思決定・ベイズファクターがどの程度変わるかを比較する。

## 計算例
有効事前標本サイズを変えたBeta事前分布で二項比率を再計算する。

## 注意
「無情報」という名称だけで一つの事前分布を自動採用しない。

<!-- CARD -->

---
id: bayes-empirical-bayes
title: 経験ベイズ法と完全ベイズ法を区別する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: empirical-bayes
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 経験ベイズ法
  - 超母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 階層ベイズの考え方
archive_reason: duplicate
canonical_card: bayes-hierarchical-definition
archive_note: 経験ベイズで超母数を推定値へ固定する方法と、完全ベイズで超母数の不確実性まで積分する方法の違いを階層モデルcanonicalへ吸収済み。
---
## 問題
超母数 $\eta$ の扱いについて経験ベイズ法と完全ベイズ法を区別せよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

完全ベイズ：
$$\pi(\theta\mid y)=\int\pi(\theta\mid y,\eta)\pi(\eta\mid y)\,d\eta.$$

## 答え
経験ベイズ法は周辺尤度などで $\widehat\eta$ を推定し、その値へ固定して $\pi(\theta\mid y,\widehat\eta)$ を使う。完全ベイズ法は超事前分布 $\pi(\eta)$ を置き、$\eta$ の不確実性も事後分布で積分する。

## 計算例
経験ベイズは計算が軽いが、超母数推定の不確実性を過小評価しやすい。

## 注意
データから事前分布を推定するため、通常の固定事前ベイズとは異なる。
