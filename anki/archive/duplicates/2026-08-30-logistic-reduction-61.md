---
id: glm-logistic-probability
title: ロジットから予測確率を計算する
category: applied-common
subcategory: applied-multivariate
topic: logistic-probability
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ロジスティック回帰分析
  - ロジット変換
  - 予測確率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ロジスティック回帰
archive_reason: duplicate
canonical_card: glm-logistic-score
archive_note: 逆ロジットによる予測確率をロジスティック回帰正本へ統合済み。
---
## 問題
$\operatorname{logit}(p)=-1+0.5x$ でx=2の予測確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{logit}(p)=\log\{p/(1-p)\}$ の逆関数は $p=e^\eta/(1+e^\eta)$。

## 答え
$\eta=-1+0.5(2)=0$ なので
$$p=\frac{e^\eta}{1+e^\eta}=\frac12.$$

## 計算例
$\eta=\log3$ ならp=3/4。

## 注意
線形なのは確率ではなく対数オッズ。

<!-- CARD -->

---
id: glm-logistic-odds-ratio
title: ロジスティック係数をオッズ比へ変換する
category: applied-common
subcategory: applied-multivariate
topic: logistic-odds-ratio
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ロジスティック回帰分析
  - オッズ比
  - 回帰係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: オッズとオッズ比
archive_reason: duplicate
canonical_card: glm-logistic-score
archive_note: 係数からオッズ比を読む手順をロジスティック回帰正本へ統合済み。
---
## 問題
ロジスティック回帰の係数が $\beta=\log1.5$ のとき、xが2増える際のオッズ比を求めよ。

## 記号・用語
- OR：オッズ比（odds ratio）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

他の変数一定でxがc増えるとオッズは $e^{c\beta}$ 倍。

## 答え
$$OR=e^{2\beta}=e^{2\log1.5}=1.5^2=2.25.$$

## 計算例
1単位なら1.5倍。

## 注意
オッズ比を確率差と混同しない。

<!-- CARD -->

---
id: glm-binomial-loglikelihood
title: 二項一般化線形モデルの対数尤度を書く
category: applied-common
subcategory: applied-multivariate
topic: binomial-likelihood
type: formula
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 二項分布
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項一般化線形モデルの尤度
archive_reason: duplicate
canonical_card: glm-logistic-score
archive_note: ベルヌーイ・二項対数尤度をロジスティック回帰正本へ統合済み。
---
## 問題
$Y_i\sim\operatorname{Bin}(m_i,p_i)$ が独立な二項一般化線形モデルの対数尤度を、母数に依存しない項を除いて書け。

## 記号・用語
- $\ell$：対数尤度

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二項分布の確率質量関数は $P(Y=y)=\binom myp^y(1-p)^{m-y}$、$y=0,\ldots,m$。

## 答え
$$\ell(\boldsymbol\beta)=\sum_i\{y_i\log p_i+(m_i-y_i)\log(1-p_i)\},$$
$\operatorname{logit}(p_i)=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$。

## 計算例
$m=1$ ならベルヌーイ尤度。

## 注意
独立性を仮定して尤度を積にする。

<!-- CARD -->

---
id: glm-irls-update
title: IRLS更新式の各量を説明する
category: applied-common
subcategory: applied-multivariate
topic: iteratively-reweighted-least-squares
type: formula
difficulty: 4
priority: A
hashtags:
  - 一般化線形モデル
  - IRLS
  - 最尤法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 反復重み付き最小二乗
archive_reason: duplicate
canonical_card: glm-logistic-score
archive_note: フィッシャー・スコアリングからIRLS更新までをロジスティック回帰正本へ統合済み。
---
## 問題
一般化線形モデルの反復重み付き最小二乗法（IRLS）の更新式を書け。

## 記号・用語
- IRLS：反復重み付き最小二乗法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対数尤度を $\ell(\boldsymbol\beta)$、スコアを $\boldsymbol U(\boldsymbol\beta)=\partial\ell/\partial\boldsymbol\beta$、フィッシャー情報行列を $\boldsymbol I(\boldsymbol\beta)$ とすると、フィッシャー・スコアリング法は
$$\boldsymbol\beta^{\mathrm{new}}
=\boldsymbol\beta^{\mathrm{old}}
+\boldsymbol I(\boldsymbol\beta^{\mathrm{old}})^{-1}
\boldsymbol U(\boldsymbol\beta^{\mathrm{old}}).$$
一般化線形モデルでは、この更新を作業応答 $\boldsymbol z$ と重み行列 $\boldsymbol W$ による重み付き最小二乗として書き換えられる。

## 答え
現在値で作る作業応答
$$z_i=\eta_i+(y_i-\mu_i)\frac{d\eta_i}{d\mu_i}$$
と重み
$$w_i=\left\{\operatorname{Var}(Y_i)\left(\frac{d\eta_i}{d\mu_i}\right)^2\right\}^{-1}$$
を用い、
$$\boldsymbol\beta^{\mathrm{new}}=(\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol z.$$

## 計算例
収束までzとWを更新する。

## 注意
初期値や分離により収束しない場合がある。
