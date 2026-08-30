---
id: ts-ar1-mean
title: 切片付きAR(1)の定常平均を求める
category: applied-common
subcategory: applied-time-series
topic: ar1-mean
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ARIMAモデル
  - AR1
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
archive_note: 切片付きAR(1)の定常平均を、中心化→定常分散→ACFまで一続きで導くcanonicalへ統合済み。
---
## 問題
$X_t=c+\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$ の定常平均を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
定常なら $E[X_t]=E[X_{t-1}]=\mu$。
## 一手／方針
モデル両辺の期待値を取り、定常平均が時刻によらないことから一次方程式を解く。
## 答え
$$\mu=c+\phi\mu\iff\mu=\frac{c}{1-\phi}.$$
## 計算例
$c=2,\phi=0.5$ なら平均4。
## 注意
切片 $c$ と定常平均 $\mu$ を混同しない。

<!-- CARD -->

---
id: ts-ar1-one-step-forecast
title: AR(1)の1期先予測を計算する
category: applied-common
subcategory: applied-time-series
topic: ar1-forecast
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ARIMAモデル
  - AR1
  - 予測
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-ar1-hstep-forecast
archive_note: 1期先予測は多期先予測のh=1として、数値例と条件付き期待値の操作ごとcanonicalへ統合済み。
---
## 問題
$X_t=1+0.8X_{t-1}+\varepsilon_t$、$X_t=5$ のとき1期先予測値を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
$E[\varepsilon_{t+1}\mid\mathcal F_t]=0$。
## 一手／方針
次時点のモデル式を条件付き期待値に入れ、未知の革新だけを平均0で落とす。
## 答え
$$\widehat X_{t+1\mid t}=1+0.8(5)=5.$$
## 計算例
予測誤差は $\varepsilon_{t+1}$。
## 注意
定常平均は5だが、一般には現在値を代入して予測する。

<!-- CARD -->

---
id: ts-ar1-forecast-error-variance
title: AR(1)の多期先予測誤差分散を求める
category: applied-common
subcategory: applied-time-series
topic: ar1-forecast-error
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ARIMAモデル
  - AR1
  - 予測誤差分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-ar1-hstep-forecast
archive_note: h期先予測の反復展開から将来革新和を取り出し、予測誤差分散まで同じcanonicalで導出済み。
---
## 問題
革新分散 $\sigma_\varepsilon^2$ のAR(1)の $h$ 期先予測誤差分散を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
誤差は $\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}$。
## 一手／方針
実現値を革新の有限和へ展開し、予測値との差に残る将来革新の分散を加える。
## 答え
$$\operatorname{Var}(e_{t+h\mid t})
=\sigma_\varepsilon^2\sum_{j=0}^{h-1}\phi^{2j}
=\sigma_\varepsilon^2\frac{1-\phi^{2h}}{1-\phi^2}.$$
## 計算例
$h\to\infty$ で定常分散へ近づく。
## 注意
係数を二乗して分散を足す。

<!-- CARD -->

---
id: ts-ar2-stationarity
title: AR(2)の定常条件を根で判定する
category: applied-common
subcategory: applied-time-series
topic: ar2-stationarity
type: recognition
difficulty: 4
priority: A
hashtags:
  - ARIMAモデル
  - AR2
  - 定常条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-ar-causality-check
archive_note: AR(p)多項式の全根が単位円外という条件とAR(2)の数値根判定を一般canonicalへ統合済み。
---
## 問題
$X_t=\phi_1X_{t-1}+\phi_2X_{t-2}+\varepsilon_t$ の定常条件を根で述べよ。
## 記号・用語
- $B$：後退作用素、$BX_t=X_{t-1}$
## 使用公式・定理
AR多項式は $\phi(z)=1-\phi_1z-\phi_2z^2$。
## 一手／方針
AR多項式を作って二次方程式を解き、2根の絶対値をそれぞれ1と比較する。
## 答え
$$1-\phi_1z-\phi_2z^2=0$$
のすべての根が単位円の外側、すなわち $|z|>1$ にあれば定常である。
## 計算例
$\phi_1=0.5,\phi_2=0.2$ なら特性方程式 $1-0.5z-0.2z^2=0$ の根は $z=(-0.5\pm\sqrt{1.05})/0.4$。絶対値は約 $1.31,3.81$ でともに1を超えるため定常である。
## 注意
AR係数そのものを単に1未満と判定しない。

<!-- CARD -->

---
id: ts-kalman-prediction
title: カルマンフィルタの予測ステップを計算する
category: applied-common
subcategory: applied-time-series
topic: kalman-prediction
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 状態空間モデル
  - カルマンフィルタ
  - 予測
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 状態空間モデル
archive_reason: duplicate
canonical_card: ts-kalman-update
archive_note: Kalman予測→観測更新を一つのフィルタリングサイクルとして、同一数値例でcanonicalへ統合済み。
---
## 問題
$a_{t-1\mid t-1}=2$、$P_{t-1\mid t-1}=3$、$T=0.5$、$Q=1$ の1次元モデルで予測平均と予測分散を求めよ。
## 記号・用語
$a_{t\mid t-1}$ と $P_{t\mid t-1}$ は、時刻 $t-1$ までの観測に基づく状態 $\alpha_t$ の条件付き平均と条件付き分散である。
## 使用公式・定理
**カルマン予測式**：
$$a_{t\mid t-1}=Ta_{t-1\mid t-1},\qquad P_{t\mid t-1}=T^2P_{t-1\mid t-1}+Q.$$
## 一手／方針
平均には $T$、分散には $T^2$ を掛け、独立な状態雑音の分散 $Q$ を足す。
## 答え
$$a_{t\mid t-1}=0.5\cdot2=1,$$
$$P_{t\mid t-1}=0.5^2\cdot3+1=1.75.$$
## 計算例
多次元では分散式を $P_{t\mid t-1}=TP_{t-1\mid t-1}T^\top+Q$ とする。
## 注意
分散に $T$ を1回だけ掛けない。

<!-- CARD -->

---
id: ts-random-walk-nonstationary
title: ランダムウォークが非定常であると判定する
category: applied-common
subcategory: applied-time-series
topic: random-walk-time-series
type: proof_step
difficulty: 2
priority: B
hashtags:
  - ARIMAモデル
  - ランダムウォーク
  - 非定常
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
archive_note: Var(X_t)=t sigma^2による非定常性の証明と一階差分による定常化をcanonicalへ統合済み。
---
## 問題
$X_t=X_{t-1}+\varepsilon_t$、$X_0=0$、$\operatorname{Var}(\varepsilon_t)=\sigma^2$ が弱定常でない理由を示せ。
## 記号・用語
$X_t$ は時刻 $t$ の値、$\varepsilon_t$ は互いに無相関な革新で、$E[\varepsilon_t]=0$、$\operatorname{Var}(\varepsilon_t)=\sigma^2$ とする。
## 使用公式・定理
$X_t=\sum_{j=1}^t\varepsilon_j$。
## 一手／方針
初期値から革新の和へ展開し、互いに無相関な革新の分散を加えて時刻依存性を示す。
## 答え
$$\operatorname{Var}(X_t)=t\sigma^2$$
が時点 $t$ に依存するため弱定常でない。
## 計算例
一階差分 $\Delta X_t=\varepsilon_t$ は定常。
## 注意
平均0だけでは定常性を保証しない。
