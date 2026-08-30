---
id: mle-log-likelihood
title: 対数尤度への変換
category: math-estimation
subcategory: math-likelihood-mle
topic: log-likelihood
type: strategy
difficulty: 2
priority: S
hashtags:
  - 最尤推定
  - 対数尤度
  - 単調変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 対数尤度関数
archive_reason: duplicate
canonical_card: mle-score-equation
archive_note: 対数の単調性で最大点が変わらないこと、積を和へ変えること、母数に依存しない定数項を最大化から落とせることは
  mle-score-equation 正本に統合済み。最尤推定の途中工程だけを単独で問うカードは重複のため隔離する。
---
## 問題
なぜ最尤推定では尤度 $L(\theta;x)$ の代わりに対数尤度 $\ell(\theta;x)=\log L(\theta;x)$ を最大化するのか。
## 答え
対数は単調増加で最大点が変わらない。積を和に変え、微分・最大化を容易にする。
$$\ell(\theta;x)=\sum_{i=1}^n \log f(x_i;\theta).$$
## 使用公式・定理
$\log$ は単調増加なので $\mathop{\rm arg\,max}_\theta L(\theta;x)=\mathop{\rm arg\,max}_\theta \ell(\theta;x)$。独立同分布なら対数で総和に分解する。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ のとき
$\ell(\lambda;x)=\sum_{i=1}^n(x_i\log\lambda-\lambda-\log x_i!)=\log\lambda\sum_i x_i-n\lambda-\sum_i\log x_i!.$
$\theta$ に依存しない項 $\sum_i\log x_i!$ は最大化から落とせる。
## 一手
まず $\log$ を取って積を和に直す。定数項は $\theta$ に依らないので最大化から落とせる。
