---
id: bayes-gamma-exponential-numeric
title: ガンマ–指数更新を数値計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gamma-exponential-numeric
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - ガンマ分布
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ガンマ分布・指数分布
archive_reason: duplicate
canonical_card: bayes-gamma-exponential-update
archive_note: Gamma(2,1)と n=3, sum x=5
  の数値更新は、尤度核からGamma(5,6)を同定し事後平均・最頻値まで計算するよう強化したcanonicalへ吸収済み。
---
## 問題
$\lambda\sim\operatorname{Gamma}(2,1)$（shape–rate）、指数分布から $n=3,\ \sum x_i=5$ を観測した。事後分布と事後平均を求めよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

shape–rate型ガンマ分布の平均は shape/rate。

## 答え
$$\lambda\mid\boldsymbol x\sim\operatorname{Gamma}(2+3,1+5)
=\operatorname{Gamma}(5,6).$$
$$E[\lambda\mid\boldsymbol x]=\frac56.$$

## 計算例
事後最頻値は $(5-1)/6=2/3$。

## 注意
率 $\lambda$ の推定であり平均寿命 $1/\lambda$ の事後平均とは異なる。

<!-- CARD -->

---
id: bayes-prior-predictive
title: 事前予測分布を周辺化して求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: prior-predictive
type: formula
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - 事前予測分布
  - 周辺化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: duplicate
canonical_card: bayes-posterior-predictive-canonical
archive_note: 事前予測も事後予測も条件付き分布を母数分布で周辺化する同じ操作であり、canonicalに事前予測式と両者の違いを追記済み。
---
## 問題
事前分布 $\pi(\theta)$ と標本モデル $f(x\mid\theta)$ から事前予測密度を求める式を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全確率の公式による母数の周辺化。

## 答え
$$m(x)=\int f(x\mid\theta)\pi(\theta)\,d\theta.$$
これはベイズ公式の分母であり、観測前にxがどの程度もっともらしいかを表す。

## 計算例
離散母数なら積分を $\sum_\theta f(x\mid\theta)\pi(\theta)$ に置き換える。

## 注意
事後予測分布は観測xで更新した $\pi(\theta\mid x)$ を使う。

<!-- CARD -->

---
id: bayes-likelihood-principle
title: 事後分布で尤度の比例部分を見抜く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: likelihood-kernel
type: recognition
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - 尤度
  - 核
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事前分布・尤度・事後分布
archive_reason: duplicate
canonical_card: bayes-density-formula
archive_note: 事後核では母数に依存しない因子を落としてよい一方、周辺尤度・ベイズファクターでは保存するという注意をベイズ公式canonicalへ吸収済み。
---
## 問題
事後分布を求める際、尤度から母数 $\theta$ に依存しない因子を落としてよい理由を述べよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

母数に関する比例記号 $\propto_\theta$。

## 答え
ベイズ更新では
$$\pi(\theta\mid x)\propto_\theta L(\theta;x)\pi(\theta)$$
なので、xだけに依存する正の因子は事後密度を正規化すると相殺される。

## 計算例
二項尤度の $\binom ns$ はpに依存しないのでBeta核の同定では落とせる。

## 注意
周辺尤度やベイズファクターを計算するときは、モデル間で異なる定数を勝手に落とさない。

<!-- CARD -->

---
id: bayes-evidence-discrete
title: 離散仮説の周辺確率を計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-evidence
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - 周辺尤度
  - 全確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズの公式を密度で書く
archive_reason: duplicate
canonical_card: bayes-density-formula
archive_note: 離散仮説で全確率から周辺確率を作り事後確率へ正規化する数値例をベイズ公式canonicalへ吸収済み。
---
## 問題
$P(H_1)=0.3,\ P(H_0)=0.7$、$P(x\mid H_1)=0.8,\ P(x\mid H_0)=0.2$ のとき、$P(x)$ と $P(H_1\mid x)$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全確率の公式とベイズの公式。

## 答え
$$P(x)=0.8(0.3)+0.2(0.7)=0.38,$$
$$P(H_1\mid x)=\frac{0.8(0.3)}{0.38}
=\frac{12}{19}\approx0.632.$$

## 計算例
事前確率0.3が観測xにより約0.632へ更新された。

## 注意
尤度 $P(x\mid H_1)$ と事後確率 $P(H_1\mid x)$ を逆にしない。
