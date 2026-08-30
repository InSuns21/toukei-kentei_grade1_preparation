---
id: engqc-capability-stability-first
title: 工程能力評価の前提として安定性を確認する
category: applied-engineering
subcategory: engineering-quality
topic: capability-prerequisites
type: recognition
difficulty: 1
priority: S
hashtags:
  - 工程能力指数
  - プロセス管理
  - 安定性
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
archive_note: 工程能力指数を計算する前に管理図などで統計的安定性を確認する理由と、高い能力指数が管理状態を保証しない注意をcanonical cardへ統合済み。
---
## 問題
工程能力指数を計算する前に管理図で安定性を確認すべき理由を答えよ。
## 記号・用語
工程能力は将来も同じ分布が続くことを前提に規格適合を予測する。
## 使用公式・定理
$C_p,C_{pk}$ は固定した $\mu,\sigma$ を前提とする。
## 一手／方針
時間で平均・分散が変わる場合に単一指数が何を意味するか考える。
## 答え
特殊原因で分布が変動中なら、全期間をまとめた平均・標準偏差は将来工程を表さず、指数による規格外率予測が無効になる。
## 計算例
まず管理図で特殊原因を除去し、その後の安定データで能力を評価する。
## 注意
高い能力指数は統計的管理状態を保証しない。

<!-- CARD -->

---
id: engqc-one-sided-cpu
title: 片側規格の工程能力指数を計算する
category: applied-engineering
subcategory: engineering-quality
topic: one-sided-capability
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 工程能力指数
  - 片側規格
  - Cpu
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
archive_note: 片側規格でCpu/Cplを使う判断、公式、USL=25・mu=20・sigma=1.5のCpu=1.111数値例をcanonical cardへ統合済み。
---
## 問題
上側規格だけが $USL=25$、工程平均 $\mu=20$、標準偏差 $\sigma=1.5$ の $C_{pu}$ を求めよ。
## 記号・用語
$C_{pu}$ は上側規格までの距離を3標準偏差で割る片側能力指数であり、$USL$ は上側規格限界である。
## 使用公式・定理
$$C_{pu}=\frac{USL-\mu}{3\sigma}.$$
## 一手／方針
上側余裕5を $3\sigma=4.5$ で割る。
## 答え
$$C_{pu}=5/4.5\approx1.111.$$
## 計算例
下側だけなら $C_{pl}=(\mu-LSL)/(3\sigma)$。
## 注意
存在しない側の規格を仮定して $C_p$ を作らない。
