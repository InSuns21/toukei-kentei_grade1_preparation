---
id: enginf-logistic-irls-one-step
title: ロジスティック回帰のIRLS作業応答を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-irls
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 一般化線形モデル
  - IRLS
  - 推定計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-logistic-score
coverage_card: glm-logistic-score
archive_note: 二項ロジットの IRLS 作業応答 z=eta+(y-p)/(p(1-p)) と重み w=p(1-p)、eta=0・y=1 で
  p=1/2, z=2, w=1/4 となる数値例は glm-logistic-score がフィッシャー・スコアリングから IRLS
  への導出とともに既に保持している。一般の二項試行数では重みに m_i が入る注意も正本にある。
---
## 問題
二項ロジットモデルの1観測で $y=1$、現在の $\eta=0$ とする。反復再重み付き最小二乗法（iteratively reweighted least squares; IRLS）の作業応答 $z$ と重み $w$ を求めよ。
## 記号・用語
$\mu=p$ は条件付き平均、$z$ は線形化した作業応答、$w$ は各反復で用いる重みである。
## 使用公式・定理
ロジットリンクでは
$$z=\eta+\frac{y-p}{p(1-p)},\qquad w=p(1-p).$$
## 一手／方針
$\eta=0$ から $p=0.5$ を求めて代入する。
## 答え
$$p=0.5,\qquad z=0+\frac{1-0.5}{0.25}=2,\qquad w=0.25.$$
## 計算例
$y=0$ なら同じ重みで $z=-2$。
## 注意
一般の二項試行数付きデータでは重みに試行数が掛かる。

<!-- CARD -->

---
id: enginf-poisson-mean
title: ポアソン回帰から期待件数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: poisson-regression
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 一般化線形モデル
  - ポアソン回帰
  - 期待件数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-poisson-mean-ratio
coverage_card: glm-poisson-mean-ratio
archive_note: 対数リンク log(mu)=eta から mu=exp(eta) を戻して期待件数を計算し、説明変数1単位増加を exp(beta)
  倍として読む操作は glm-poisson-mean-ratio
  の中心技能そのもの。正本は期待件数・平均比・発生率を一続きで扱い、ポアソン分布の平均=分散と過分散への注意も保持する。
---
## 問題
$\log\mu=1.2+0.3x$ のポアソン回帰で $x=2$ の期待件数を求めよ。
## 記号・用語
$\mu=E[Y\mid x]$ は条件付き期待件数、対数リンクは $\log\mu=\eta$ である。
## 使用公式・定理
逆リンクは $\mu=e^\eta$。
## 一手／方針
線形予測子を求めて指数を取る。
## 答え
$$\eta=1.2+0.3(2)=1.8,\qquad \mu=e^{1.8}\approx6.05.$$
## 計算例
$x$ が1増えると期待件数は $e^{0.3}\approx1.35$ 倍。
## 注意
ポアソン回帰では条件付き分散も基本モデル上は $\mu$ である。

<!-- CARD -->

---
id: enginf-poisson-offset-rate
title: オフセット付きポアソン回帰で発生率を扱う
category: applied-engineering
subcategory: engineering-linear-inference
topic: poisson-offset
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 一般化線形モデル
  - ポアソン回帰
  - オフセット
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-poisson-mean-ratio
coverage_card: glm-poisson-mean-ratio
archive_note: log E[Y]=log t+X beta とし log t を係数1固定の offset と読むこと、E[Y]=t exp(X
  beta) から単位曝露量当たりの発生率と期待件数を計算することは glm-poisson-mean-ratio
  が定義・導出・数値例まで包含している。工学側の故障件数例は文脈を変えた同一操作である。
---
## 問題
$\log E[Y]=\log t+\beta_0$、$\beta_0=\log0.02$、曝露時間 $t=500$ のとき期待故障数を求めよ。
## 記号・用語
$\log t$ は係数を1に固定したオフセット、$e^{\beta_0}$ は単位曝露当たりの発生率である。
## 使用公式・定理
$E[Y]=t\exp(\beta_0)$。
## 一手／方針
率0.02に曝露時間を掛ける。
## 答え
$$E[Y]=500(0.02)=10.$$
## 計算例
曝露時間が1000なら期待故障数20となる。
## 注意
オフセットの係数は推定せず1に固定する。
