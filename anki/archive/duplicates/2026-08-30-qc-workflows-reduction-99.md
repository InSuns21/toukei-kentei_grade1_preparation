---
id: engqc-arl0-three-sigma
title: 3シグマ管理図の管理内平均連長を求める
category: applied-engineering
subcategory: engineering-quality
topic: average-run-length
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 管理図
  - 平均連長
  - 誤警報
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-three-sigma-false-alarm
archive_note: 3シグマ単点誤警報確率から幾何分布を介して管理内平均連長を導くcanonical cardへ統合済み。
---
## 問題
各点が独立で、管理状態の1点信号確率が $\alpha=0.0027$ のとき平均連長 $ARL_0$ を求めよ。
## 記号・用語
平均連長は信号が出るまでの点数の期待値である。添字0は管理状態を表す。
## 使用公式・定理
各点で一定確率 $\alpha$ で信号なら連長は幾何分布に従い、$ARL_0=1/\alpha$。
## 一手／方針
単点誤警報確率の逆数を取る。
## 答え
$$ARL_0=1/0.0027\approx370.4.$$
## 計算例
1時間に1点なら平均約370時間に1回の誤警報。
## 注意
点間相関やランルールがあると単純な幾何分布ではない。

<!-- CARD -->

---
id: engmaint-two-state-availability
title: 故障率と修復率から可用度を求める
category: applied-engineering
subcategory: engineering-quality
topic: two-state-availability
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 保全性
  - マルコフ過程
  - 可用度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 保全性
archive_reason: duplicate
canonical_card: engmaint-steady-availability
archive_note: 故障率・修復率による2状態定常可用度はMTBF・MTTR表現との等価性まで含むcanonical cardへ統合済み。
---
## 問題
稼働から故障への率 $\lambda=0.01$、故障から修復への率 $\mu=0.2$ の2状態連続時間マルコフ過程の定常可用度を求めよ。
## 記号・用語
定常可用度は稼働状態の定常確率 $\pi_U$ であり、$\pi_D$ は故障状態の定常確率である。
## 使用公式・定理
詳細釣合い $\pi_U\lambda=\pi_D\mu$ と $\pi_U+\pi_D=1$ より $\pi_U=\mu/(\lambda+\mu)$。
## 一手／方針
修復率を総遷移率で割る。
## 答え
$$A=\frac{0.2}{0.01+0.2}=\frac{20}{21}\approx0.9524.$$
## 計算例
$MTBF=100$、$MTTR=5$ からも $100/105$。
## 注意
率と平均時間は逆数関係である。

<!-- CARD -->

---
id: engqc-ewma-steady-variance
title: EWMA統計量の定常分散を計算する
category: applied-engineering
subcategory: engineering-quality
topic: ewma-variance
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 管理図
  - EWMA管理図
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-ewma-update
archive_note: EWMA更新式から定常分散を再帰的に導くcanonical cardへ統合済み。
---
## 問題
独立観測の分散が $\sigma^2=9$、EWMA係数 $\lambda=0.2$ のとき、定常状態の $Z_t$ の分散を求めよ。
## 記号・用語
初期値の影響が消えた長期状態を定常状態とする。
## 使用公式・定理
$$\operatorname{Var}(Z_\infty)=\sigma^2\frac{\lambda}{2-\lambda}.$$
## 一手／方針
観測分散にEWMAの分散縮小率を掛ける。
## 答え
$$9\frac{0.2}{1.8}=1.$$
## 計算例
定常標準偏差は1なので、幅 $L=3$ なら中心線から3の限界幅。
## 注意
立ち上がり時の分散には因子 $1-(1-\lambda)^{2t}$ が付く。

<!-- CARD -->

---
id: engqc-r-chart-limits
title: R管理図の管理限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: r-chart
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 管理図
  - R管理図
  - ばらつき
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-xbar-r-chart-limits
archive_note: R図の限界は平均図との対計算とR図を先に確認する判断まで含むcanonical cardへ統合済み。
---
## 問題
群サイズ5、$\overline R=4$、$D_3=0$、$D_4=2.114$ のR管理図限界を求めよ。
## 記号・用語
R管理図は群内範囲を用いて工程のばらつきを監視する。$D_3,D_4$ は群サイズで決まる管理図定数、$CL,UCL,LCL$ は中心線、上側・下側管理限界である。
## 使用公式・定理
$$CL=\overline R,\qquad UCL=D_4\overline R,\qquad LCL=D_3\overline R.$$
## 一手／方針
管理図定数を平均範囲へ掛ける。
## 答え
$$UCL=2.114(4)=8.456,\qquad CL=4,\qquad LCL=0.$$
## 計算例
$R=9$ の群はばらつき異常を示す。
## 注意
範囲は非負なので小群サイズでは下方限界が0になることがある。
