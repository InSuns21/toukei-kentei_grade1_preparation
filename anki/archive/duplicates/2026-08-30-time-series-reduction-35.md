---
id: ts-arma11-mean
title: ARMA(1,1)の定常平均を求める
category: applied-common
subcategory: applied-time-series
topic: arma11-mean
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ARIMAモデル
  - ARMAモデル
  - 定常平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-ar1-acf
archive_note: ARMA(1,1)でも期待値を取るとMA項の平均が0になり mu=c/(1-phi) となる点をAR(1)モーメントcanonicalへ吸収済み。
---
## 問題
$X_t=c+\phi X_{t-1}+\varepsilon_t+\theta\varepsilon_{t-1}$ の定常平均を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
革新の平均は0、定常平均は時点に依存しない。
## 一手／方針
モデル両辺の期待値を取り、ホワイトノイズの平均0と定常平均一定を代入する。
## 答え
$$\mu=c+\phi\mu\iff\mu=\frac{c}{1-\phi}.$$
## 計算例
MA係数 $\theta$ は平均に影響しない。
## 注意
定常性にはAR部分の $|\phi|<1$ が必要。

<!-- CARD -->

---
id: ts-backshift-arma
title: ARMAモデルを後退作用素で表す
category: applied-common
subcategory: applied-time-series
topic: backshift-operator
type: formula
difficulty: 3
priority: A
hashtags:
  - ARIMAモデル
  - 後退作用素
  - ARMAモデル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-arima-definition
archive_note: phi(B)X_t=theta(B)epsilon_t は ARIMA(p,d,q) 定義 phi(B)(1-B)^d
  X_t=theta(B)epsilon_t の d=0 特殊形である。
---
## 問題
ARMA($p,q$)を後退作用素 $B$ で表せ。
## 記号・用語
- $BX_t=X_{t-1}$
## 使用公式・定理
$\phi(B)=1-\phi_1B-\cdots-\phi_pB^p$、$\theta(B)=1+\theta_1B+\cdots+\theta_qB^q$。
## 一手／方針
各ラグ項をバックシフト演算子で置き換え、Xの項と革新の項をそれぞれ多項式にまとめる。
## 答え
$$\phi(B)X_t=\theta(B)\varepsilon_t.$$
## 計算例
ARMA(1,1)は $(1-\phi B)X_t=(1+\theta B)\varepsilon_t$。
## 注意
MA多項式の符号規約は文献により異なる。
