---
id: enginf-interaction-design-matrix
title: ダミー変数と交互作用項を含む計画行列を作る
category: applied-engineering
subcategory: engineering-linear-inference
topic: interaction-design-matrix
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形モデル
  - ダミー変数
  - 交互作用項
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
coverage_card: reg-multiple-model-matrix
archive_note: 重回帰の正本へモデル式から1観測分の計画行列行を作る手順を統合済み。E[Y]=beta0+beta1 x+beta2 D+beta3
  xD について行 (1,x,D,xD) を作り、観測 (2,0),(3,1) から [[1,2,0,0],[1,3,1,3]]
  を構成する同一数値例まで含むため独立カード不要。
---
## 問題
$E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD$ で、観測 $(x,D)=(2,0),(3,1)$ に対応する計画行列を作れ。
## 記号・用語
$D\in\{0,1\}$ は処理法ダミー、$xD$ は連続変数と処理法の交互作用項である。
## 使用公式・定理
計画行列の各行は係数 $(\beta_0,\beta_1,\beta_2,\beta_3)$ に掛かる値 $(1,x,D,xD)$。
## 一手／方針
各観測で積 $xD$ を計算して列順に並べる。
## 答え
$$X=\begin{pmatrix}1&2&0&0\\1&3&1&3\end{pmatrix}.$$
## 計算例
$D=0$ では平均 $\beta_0+\beta_1x$、$D=1$ では $(\beta_0+\beta_2)+(\beta_1+\beta_3)x$。
## 注意
交互作用を入れるときは通常、対応する主効果も残す。

<!-- CARD -->

---
id: enginf-interaction-slope-test
title: 交互作用係数から群別傾きの差を判定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: interaction-coefficient
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形モデル
  - 交互作用項
  - Wald検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-interaction-dummy-continuous
coverage_card: reg-interaction-dummy-continuous
archive_note: 交互作用正本にD=0の傾きbeta1、D=1の傾きbeta1+beta3、beta3が傾き差であることを統合済み。さらに
  betahat1=1.2, betahat3=-0.5, SE=0.2
  の同一例を有限標本ではt=-2.5で検定し、大標本Wald正規近似でも同じ判定になることまで整理したため吸収可能。
---
## 問題
$E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD$ の出力で $\widehat\beta_1=1.2$、$\widehat\beta_3=-0.5$、$\operatorname{SE}(\widehat\beta_3)=0.2$ である。群別傾きと交互作用のWald判定を求めよ。
## 記号・用語
$\beta_3$ は $D=1$ 群と基準群 $D=0$ の傾きの差である。
## 使用公式・定理
$D=0$ の傾きは $\beta_1$、$D=1$ は $\beta_1+\beta_3$。帰無仮説 $H_0:\beta_3=0$ のもとで
$$Z=\frac{\widehat\beta_3}{\operatorname{SE}(\widehat\beta_3)}\dot\sim N(0,1),$$
5%両側検定では $|Z|>1.96$ なら棄却する。
## 一手／方針
群別に $D$ を代入し、傾き差を標準化する。
## 答え
傾きは $D=0$ で1.2、$D=1$ で $1.2-0.5=0.7$。$Z=-0.5/0.2=-2.5$ なので5%両側で交互作用なしを棄却する。
## 計算例
処理法1では $x$ の効果が基準群より0.5小さい。
## 注意
$\beta_2$ は $x=0$ における群差であり、傾き差ではない。

<!-- CARD -->

---
id: enginf-dummy-reference-contrast
title: 基準カテゴリを変えたダミー係数を換算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: dummy-variable
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - ダミー変数
  - 線形対比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形対比
archive_reason: duplicate
canonical_card: reg-dummy-variable
coverage_card: reg-dummy-variable
archive_note: ダミー変数正本に3群A・B・Cの基準カテゴリ変更を統合済み。A基準の切片10、B係数2、C係数-1から群平均(10,12,9)を復元し、C基準で切片9、A係数1、B係数3へ再符号化する同一例を含むため完全重複。
---
## 問題
3処理A・B・CでAを基準とした係数が切片10、B係数2、C係数$-1$ である。Cを基準とした切片、A係数、B係数を求めよ。
## 記号・用語
基準カテゴリの係数は0と置き、他の係数は基準平均との差である。
## 使用公式・定理
群平均を先に復元し、新しい基準平均との差を作る。
## 一手／方針
$\mu_A,\mu_B,\mu_C$ を求めてからCを引く。
## 答え
群平均は $(10,12,9)$。したがってC基準では切片9、A係数 $10-9=1$、B係数 $12-9=3$。
## 計算例
基準を変えても当てはめ群平均は変わらない。
## 注意
係数値は基準カテゴリに依存するが、推定可能な群間差は不変である。
