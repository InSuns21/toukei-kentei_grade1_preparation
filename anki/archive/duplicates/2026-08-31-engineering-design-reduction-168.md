---
id: engdesign-block-vs-covariate
title: 局外因子をブロックか共変量で扱う
category: applied-engineering
subcategory: engineering-design
topic: block-or-covariate
type: recognition
difficulty: 2
priority: B
hashtags:
  - ブロック化
  - 共変量
  - 実験の計画と実施
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: duplicate
canonical_card: engdesign-confounder-randomization
coverage_card: engdesign-confounder-randomization
archive_note: 局外因子をブロックとして割付に使う場合と、処置前連続量を共変量として共分散分析に残す場合の比較・仮定・処置後変数を調整する危険までブロック化canonical
  cardへ統合済み。
---
## 問題
応答へ影響する初期重量が連続量として実験前に測れる。粗い区分でブロック化する方法と共分散分析で調整する方法を比較せよ。
## 記号・用語
局外因子（nuisance factor）は主目的ではないが応答変動を説明する変数である。共変量は処置前に測定する連続説明変数である。
## 使用公式・定理
ブロック化は区分内比較、共分散分析は $Y=\mu+\tau_i+\beta(X-\overline X)+\varepsilon$ により連続的に調整する。
## 一手／方針
割付前に層として使うか、測定値を回帰調整へ残すかを区別する。
## 答え
ブロック化はモデル依存が小さいが区分で情報を失う。共分散分析は連続情報を使い効率的だが、線形性と処置間の共通傾きを要する。
## 計算例
初期重量を軽・中・重に分け各層内で無作為化し、解析では実測重量も補助的に使える。
## 注意
処置後に変化した変数を共変量として調整すると処置効果の一部を除くおそれがある。

<!-- CARD -->

---
id: engdesign-bibd-contrast-variance
title: BIBDの処置差推定量の分散を計算する
category: applied-engineering
subcategory: engineering-design
topic: bibd-contrast-variance
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ブロック化
  - BIBD
  - 処置比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: duplicate
canonical_card: engdesign-incomplete-block-connectivity
coverage_card: engdesign-incomplete-block-connectivity
archive_note: 不完備ブロックの接続性からBIBDのbk=vr、lambda(v-1)=r(k-1)、処置差分散と標準誤差の数値計算までcanonical
  cardへ統合済み。
---
## 問題
ブロック内誤差分散 $\sigma^2=6$、BIBDの処置数 $v=4$、ブロックサイズ $k=3$、反復数 $r=3$、処置対の共出現数 $\lambda=2$ とする。任意の2処置の調整平均差の分散を求めよ。
## 記号・用語
釣合いにより任意の処置対の比較精度は等しい。$\lambda$ は任意の処置対の共出現数、$\widehat\tau_i-\widehat\tau_j$ はブロック調整済み処置効果差である。
## 使用公式・定理
BIBDでは $\lambda(v-1)=r(k-1)$ であり、調整処置差の分散は $\operatorname{Var}(\widehat\tau_i-\widehat\tau_j)=2k\sigma^2/(\lambda v)$。
## 一手／方針
$k=3,\sigma^2=6,\lambda=2,v=4$ を代入する。
## 答え
$2(3)(6)/(2\cdot4)=36/8=4.5$。
## 計算例
標準誤差は $\sqrt{4.5}\approx2.121$。
## 注意
式は等ブロックサイズで釣合った接続を持つBIBDに対するものである。
