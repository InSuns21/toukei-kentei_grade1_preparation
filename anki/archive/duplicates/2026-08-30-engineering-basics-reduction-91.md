---
id: eng-capability-index
title: 工程能力指数を規格幅と工程幅から求める
category: applied-engineering
subcategory: engineering-quality
topic: process-capability
type: formula
difficulty: 1
priority: A
hashtags:
  - 工程能力
  - 品質管理
  - Cp
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
archive_note: Cpの定義・計算はCpkとの比較、等号条件、偏心診断まで含む工程能力canonical cardへ統合済み。
---
## 問題
上側規格 $USL=16$、下側規格 $LSL=4$、工程標準偏差 $\sigma=2$ のとき $C_p$ を求めよ。
## 答え
$$C_p=\frac{USL-LSL}{6\sigma}.$$
## 使用公式・定理
安定した正規工程の自然変動幅を $6\sigma$ とすると
$$C_p=\frac{\text{規格幅}}{\text{工程幅}}=\frac{USL-LSL}{6\sigma}.$$
## 計算例
$$C_p=\frac{16-4}{6\cdot2}=1.$$
## 注意
$C_p$ は工程平均の偏りを反映しない。偏りには $C_{pk}$ を使う。

<!-- CARD -->

---
id: engqc-cp-cpk-relationship
title: CpとCpkの大小関係を判定する
category: applied-engineering
subcategory: engineering-quality
topic: capability-relationship
type: recognition
difficulty: 1
priority: A
hashtags:
  - 工程能力指数
  - Cp
  - Cpk
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
archive_note: Cpk<=Cpの関係、等号条件、中心ずれの診断は同一canonical cardへ統合済み。
---
## 問題
両側規格の安定工程で、$C_p$ と $C_{pk}$ の一般的な関係と等号条件を答えよ。
## 記号・用語
$C_p$ は潜在能力、$C_{pk}$ は平均偏りを含む実際の片側余裕を測る。
## 使用公式・定理
近い規格限界までの距離は規格半幅以下である。
## 一手／方針
最小の片側距離と規格半幅を比較する。
## 答え
$$C_{pk}\le C_p.$$
工程平均が規格中心 $(USL+LSL)/2$ にあるとき等号。
## 計算例
$C_p$ が高く $C_{pk}$ が低いなら、ばらつきより中心ずれが課題。
## 注意
片側規格では $C_p$ の定義自体が適切でない。

<!-- CARD -->

---
id: eng-series-reliability
title: 直列系の信頼度を積で求める
category: applied-engineering
subcategory: engineering-quality
topic: series-system
type: formula
difficulty: 1
priority: A
hashtags:
  - 信頼性
  - 直列系
  - 独立
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信頼性
archive_reason: duplicate
canonical_card: engrel-series-component-requirement
archive_note: 独立直列系の積公式・数値計算・部品信頼度の逆算を直列並列信頼性canonical cardへ統合済み。
---
## 問題
独立な2部品の時刻 $t$ での信頼度が $0.9,0.8$ である。両方が動作して初めて動く直列系の信頼度は？
## 答え
直列系の生存は全成分の生存の共通部分である。
## 使用公式・定理
成分寿命が独立な直列系では
$$R_{\mathrm{series}}(t)=P(T_1>t,\ldots,T_m>t)=\prod_{i=1}^mR_i(t).$$
## 計算例
$$R_{\mathrm{series}}(t)=0.9\cdot0.8=0.72.$$
## 注意
積への分解には部品寿命の独立性が必要である。

<!-- CARD -->

---
id: engrel-parallel-system
title: 並列システムの信頼度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: parallel-reliability
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 信頼性
  - 並列システム
  - 冗長化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信頼性
archive_reason: duplicate
canonical_card: engrel-series-component-requirement
archive_note: 独立並列系の補集合公式と数値例は直列系との方法選択を含むcanonical cardへ統合済み。
---
## 問題
独立な2部品の信頼度がともに0.8で、少なくとも一方が動けば成功する並列システムの信頼度を求めよ。
## 記号・用語
並列システムの故障は全成分が故障する事象である。
## 使用公式・定理
$R_P=1-\prod_i(1-R_i)$。
## 一手／方針
全故障確率を求めて1から引く。
## 答え
$$R_P=1-(0.2)^2=0.96.$$
## 計算例
単一部品0.8から冗長化で0.96へ上がる。
## 注意
切替器の故障や依存故障を無視した理想並列モデルである。

<!-- CARD -->

---
id: eng-blocking
title: ブロック化で誤差分散を減らす条件を見抜く
category: applied-engineering
subcategory: engineering-design
topic: randomized-block-design
type: strategy
difficulty: 2
priority: A
hashtags:
  - 実験計画法
  - ブロック化
  - 変動要因
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
archive_note: ブロック化の目的、乱塊法の加法モデル、ブロック内無作為化と交絡回避をcanonical cardへ統合済み。
---
## 問題
4処理を、日ごとの環境差が大きい実験で比較したい。日をどう扱うか。
## 方針
日をブロックとし、各日内で4処理を無作為化する。
## 使用公式・定理
乱塊法の加法モデルは
$$Y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij},\qquad \sum_i\tau_i=\sum_j\beta_j=0.$$
## 計算例
$y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij}$ と置けば、日差 $\beta_j$ を残差から分離できる。
各ブロック内に全処理を1回ずつ割り付ける。
## 注意
処理とブロックの交互作用を推定しない加法モデルであることを確認する。
