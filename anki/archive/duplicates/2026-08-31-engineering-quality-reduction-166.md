---
id: engqc-cpm-target
title: 目標値ずれを含むCpmを計算する
category: applied-engineering
subcategory: engineering-quality
topic: capability-cpm
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 工程能力指数
  - Cpm
  - 目標値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 工程能力指数
archive_reason: duplicate
canonical_card: engqc-cpk-offcenter
coverage_card: engqc-cpk-offcenter
archive_note: Cpmの定義、目標値ずれを含む数値例、mu=TならCpへ戻る関係まで工程能力canonical cardへ統合済み。
---
## 問題
$USL=110,LSL=90$、目標値 $T=100$、$\mu=102$、$\sigma=2$ の $C_{pm}$ を求めよ。
## 記号・用語
$C_{pm}$ はばらつきと目標値からの偏りを同時に罰するTaguchi型指数である。$USL,LSL,T$ は上側・下側規格限界と目標値である。
## 使用公式・定理
$$C_{pm}=\frac{USL-LSL}{6\sqrt{\sigma^2+(\mu-T)^2}}.$$
## 一手／方針
平均二乗偏差 $\sigma^2+(\mu-T)^2$ の平方根を使う。
## 答え
分母は $6\sqrt{4+4}=6\sqrt8$ より、$C_{pm}\approx20/16.971=1.179$。
## 計算例
$\mu=T$ なら $C_{pm}=C_p$。
## 注意
規格中心と品質目標値が同じとは限らない。

<!-- CARD -->

---
id: engqc-capability-defect-rate
title: 正規工程の規格外率を計算する
category: applied-engineering
subcategory: engineering-quality
topic: capability-defect-rate
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 工程能力指数
  - 規格外率
  - 正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 工程能力指数
archive_reason: duplicate
canonical_card: engqc-cpk-offcenter
coverage_card: engqc-cpk-offcenter
archive_note: 正規工程の両側規格外率、標準化、2700ppmの数値例、Cp=Cpk=1との対応、非正規時の注意まで工程能力canonical cardへ統合済み。
---
## 問題
正規分布 $X\sim N(100,2^2)$ に従う安定工程で、規格が $94\le X\le106$ のとき規格外率を求めよ。
## 記号・用語
両規格は平均からそれぞれ3標準偏差離れている。$USL,LSL$ は上側・下側規格限界、$\Phi(z)=P(Z\le z)$ は標準正規分布の累積分布関数、ppmはparts per million（100万分率）である。
## 使用公式・定理
$P(X<LSL)+P(X>USL)=2\{1-\Phi(3)\}$。
## 一手／方針
上下を標準化し、対称な両側裾を足す。
## 答え
規格外率は約 $0.00270=0.27\%$、すなわち約2700 ppm。
## 計算例
この設定では $C_p=C_{pk}=1$。
## 注意
正規性と長期安定性が崩れるとppm換算は信用できない。

<!-- CARD -->

---
id: engqc-arl1-mean-shift
title: 平均シフト後のXbar管理図検出力とARLを求める
category: applied-engineering
subcategory: engineering-quality
topic: shift-detection-arl
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 管理図
  - 検出力
  - 平均連長
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
coverage_card: engqc-three-sigma-false-alarm
archive_note: 平均シフト後の1点検出確率とARL1、標準誤差単位のシフト量を管理図検出性能canonical cardへ統合済み。
---
## 問題
標準化した群平均の管理限界が $\pm3$ で、工程平均が標準誤差の2倍だけ上方へ移動した。1点検出確率と $ARL_1$ を近似せよ。
## 記号・用語
シフト後の標準化統計量は正規分布 $Z\sim N(2,1)$ に従う。標準正規分布の累積分布関数を $\Phi(z)=P(Z_0\le z)$ とし、添字1は工程変化後を表す。
## 使用公式・定理
$p_s=P(Z>3)+P(Z<-3)$、$ARL_1=1/p_s$。
## 一手／方針
平均2の正規分布から上下限外確率を計算する。
## 答え
$P(Z>3)=1-\Phi(1)=0.1587$、下側はほぼ0なので $p_s\approx0.1587$、$ARL_1\approx6.30$。
## 計算例
平均して約6群で2標準誤差シフトを検出する。
## 注意
シフト量を個体標準偏差単位か群平均標準誤差単位か明示する。

<!-- CARD -->

---
id: engqc-control-chart-sample-size
title: シフト後平均が3シグマ限界に達する群サイズを求める
category: applied-engineering
subcategory: engineering-quality
topic: chart-sample-size
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 管理図
  - 検出力
  - 標本数
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
coverage_card: engqc-three-sigma-false-alarm
archive_note: 群サイズで標準誤差が縮む機構、Delta=delta
  sqrt(n)/sigma、delta=1.5sigmaでn=4となる数値例、平均位置だけの設計は高検出確率を保証しない注意まで統合済み。
---
## 問題
個体標準偏差 $\sigma$ の工程で、平均が $1.5\sigma$ 上方シフトしたとき、群平均の標準化シフトを3以上にする最小群サイズを求めよ。
## 記号・用語
群平均の標準誤差は $\sigma/\sqrt n$。
## 使用公式・定理
標準化シフトは $\delta\sqrt n/\sigma$。
## 一手／方針
$1.5\sqrt n\ge3$ を $n$ について解く。
## 答え
$\sqrt n\ge2$ より最小は $n=4$。
## 計算例
$n=4$ ならシフト後平均は上側3シグマ限界の位置に来る。
## 注意
この条件は平均位置だけの比較で、所望検出確率を直接指定した設計ではない。

<!-- CARD -->

---
id: engqc-process-adjustment-overcontrol
title: 安定工程の過剰調整が変動を増やす理由を説明する
category: applied-engineering
subcategory: engineering-quality
topic: overcontrol
type: recognition
difficulty: 2
priority: A
hashtags:
  - プロセス管理
  - 過剰調整
  - 共通原因
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: プロセス管理
archive_reason: duplicate
canonical_card: engqc-phase1-phase2
coverage_card: engqc-phase1-phase2
archive_note: 安定工程への過剰調整をPhase I・II運用canonical
  cardへ統合し、偏差epsilon_(t+1)-epsilon_tと分散2sigma^2の導出、sigma=2の数値例まで追加済み。
---
## 問題
管理状態の工程で、中心線からの各点の偏差を打ち消すよう毎回設備を調整すると何が起こり得るか。
## 記号・用語
過剰調整は共通原因によるランダム変動へ逐次反応する操作である。
## 使用公式・定理
独立な測定誤差に基づく逆方向調整は、次期出力へ余分な調整誤差を加える。
## 一手／方針
ランダム偏差を真の水準変化と誤認した影響を考える。
## 答え
工程平均は改善せず、調整量のばらつきが加わって出力分散を増やし得る。
## 計算例
管理図の信号なしに点ごとにノブを動かす「tampering」が典型。
## 注意
特殊原因の信号が出た場合の原因除去とは区別する。
