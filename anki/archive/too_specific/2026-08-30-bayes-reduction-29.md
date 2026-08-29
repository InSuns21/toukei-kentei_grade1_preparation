---
id: bayes-normal-hierarchical-gibbs-theta
title: 正規階層モデルの群効果のギブス更新を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gibbs-normal-theta
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - ギブスサンプリング
  - 正規階層モデル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ギブスサンプリング
archive_reason: too_specific
canonical_card: bayes-gibbs-full-conditionals
archive_note: 正規階層モデルの群効果だけに特化した完全条件付き更新は、一般の完全条件付き分布の作り方と正規–正規の代表計算を統合したGibbs
  canonicalへ吸収済み。
---
## 問題
観測モデルが正規分布 $Y_{ij}\mid\theta_j\overset{\mathrm{iid}}{\sim}N(\theta_j,\sigma^2)$、事前分布が正規分布 $\theta_j\mid\mu,\tau^2\sim N(\mu,\tau^2)$ で分散既知とする。$\theta_j$ の完全条件付き分布を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Normal–Normal共役更新。

## 答え
群jの標本数を $n_j$、平均を $\bar y_j$ とすると
$$V_j=\left(\frac{n_j}{\sigma^2}+\frac1{\tau^2}\right)^{-1},$$
$$M_j=V_j\left(\frac{n_j\bar y_j}{\sigma^2}
+\frac{\mu}{\tau^2}\right),$$
$$\theta_j\mid-\sim N(M_j,V_j).$$

## 計算例
各ギブス掃引で現在の $\mu,\tau^2$ を代入する。

## 注意
記号「$-$」は他の全母数とデータを条件付ける意味。

<!-- CARD -->

---
id: bayes-normal-hierarchical-gibbs-mu
title: 正規階層モデルの全体平均のギブス更新を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gibbs-normal-mu
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - ギブスサンプリング
  - 正規階層モデル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ギブスサンプリング
archive_reason: too_specific
canonical_card: bayes-gibbs-full-conditionals
archive_note: 正規階層モデルの全体平均だけに特化したGibbs更新は、更新対象以外を固定して核を同定する一般操作の派生なのでcanonicalへ統合する。
---
## 問題
群効果が正規分布 $\theta_j\mid\mu,\tau^2\overset{\mathrm{iid}}{\sim}N(\mu,\tau^2)$、事前分布が正規分布 $\mu\sim N(m_0,s_0^2)$ とする。J個の $\theta_j$ を条件付けた $\mu$ の完全条件付き分布を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

J個の正規観測 $\theta_j$ に対するNormal–Normal更新。

## 答え
$$V_\mu=\left(\frac1{s_0^2}+\frac J{\tau^2}\right)^{-1},$$
$$M_\mu=V_\mu\left(\frac{m_0}{s_0^2}
+\frac{\sum_j\theta_j}{\tau^2}\right),$$
$$\mu\mid-\sim N(M_\mu,V_\mu).$$

## 計算例
現在の群効果平均 $\bar\theta$ と事前平均の精度加重平均。

## 注意
観測 $Y_{ij}$ は $\theta_j$ を条件付けるとこの完全条件付き核に直接現れない。

<!-- CARD -->

---
id: bayes-beta-binomial-hierarchy
title: ベータ–二項階層モデルの群間情報共有を説明する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hierarchical-beta-binomial
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 階層ベイズモデル
  - ベータ–二項
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 階層ベイズの考え方
archive_reason: too_specific
canonical_card: bayes-normal-hierarchical-shrinkage
archive_note: 階層モデルによる部分プーリング・情報共有という主論点は、縮小係数を実際に計算できる正規階層モデルのcanonicalで保持する。分布別の階層化例は増殖させない。
---
## 問題
$X_j\mid p_j\sim\operatorname{Bin}(n_j,p_j)$、$p_j\mid a,b\sim\operatorname{Beta}(a,b)$ という階層化の効果を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベータ–二項共役更新と階層的部分プーリング。

## 答え
$a,b$ が既知なら
$$p_j\mid x_j,a,b\sim
\operatorname{Beta}(a+x_j,b+n_j-x_j).$$
共通のa,bにより、各群の推定が全体傾向 $a/(a+b)$ へ縮小される。a,bも推定すれば全群データが超母数を介して情報共有する。

## 計算例
$n_j$ が小さい群ほど事前擬似度数の影響が大きい。

## 注意
全群を同じpとする完全プーリングとは異なる。
