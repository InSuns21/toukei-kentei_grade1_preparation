---
id: engmaint-reliability-vs-availability
title: 信頼度と可用度を使い分ける
category: applied-engineering
subcategory: engineering-quality
topic: reliability-vs-availability
type: recognition
difficulty: 1
priority: S
hashtags:
  - 信頼性
  - 保全性
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
archive_note: 信頼度を使命時間中の無故障継続確率、可用度を修復後の復帰を許す時点稼働確率として区別する説明と、高可用度でも使命信頼度が低くなり得る数値例をcanonical
  cardへ統合済み。
---
## 問題
高信頼度と高可用度の違いを、修理可能系を例に説明せよ。
## 記号・用語
信頼度は区間内に一度も故障しない確率、可用度は指定時点で稼働可能な確率である。
## 使用公式・定理
可用度は故障頻度だけでなく修復速度にも依存する。
## 一手／方針
故障を許さない指標と、修理後の復帰を許す指標に分ける。
## 答え
頻繁に故障しても即時修復できれば可用度は高くなり得るが、同じ期間の信頼度は低い。無修理ミッションでは信頼度が中心となる。
## 計算例
サーバ群は部品故障があっても冗長化・迅速修復で高可用度を保てる。
## 注意
要求仕様が無故障継続か稼働率かを先に確認する。

<!-- CARD -->

---
id: engmaint-series-availability
title: 独立直列設備の可用度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: system-availability
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 保全性
  - 可用度
  - 直列システム
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
archive_note: 独立直列設備の系可用度を成分可用度の積で求める公式、0.98×0.95=0.931の数値例、共通原因や保全要員共有で独立性が崩れる注意をcanonical
  cardへ統合済み。
---
## 問題
独立な2設備が両方稼働してラインが動き、各定常可用度が0.98と0.95である。ライン可用度を求めよ。
## 記号・用語
直列ラインは全設備が同時に利用可能である必要がある。
## 使用公式・定理
独立直列系の可用度は成分可用度の積。
## 一手／方針
同時稼働確率を掛ける。
## 答え
$$A_S=0.98(0.95)=0.931.$$
## 計算例
長期停止割合は $1-0.931=0.069$。
## 注意
保全要員共有などで停止状態が依存すると積は使えない。

<!-- CARD -->

---
id: engqc-control-vs-specification
title: 管理限界と規格限界を区別する
category: applied-engineering
subcategory: engineering-quality
topic: control-vs-specification
type: recognition
difficulty: 1
priority: S
hashtags:
  - 管理図
  - 工程能力指数
  - 規格限界
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: プロセス管理
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: 管理限界は工程データから決まる統計的安定性の基準、規格限界は設計・顧客要求から決まる適合性の基準という区別をcanonical
  cardへ明示済み。工程能力正本engqc-cpk-offcenterにも同じ注意があるため独立認識カードは不要。
---
## 問題
管理限界と規格限界はそれぞれ何から決まり、何を判定するか。
## 記号・用語
管理限界は工程データ、規格限界は設計・顧客要求から定める。
## 使用公式・定理
管理図は統計的安定性、工程能力指数は安定工程の分布と規格幅の適合を評価する。
## 一手／方針
「工程の声」と「顧客の声」に分ける。
## 答え
管理限界は共通原因変動の範囲を示し、特殊原因の兆候を検出する。規格限界は製品が要求を満たす許容範囲を示す。
## 計算例
管理内でも規格外品が多い工程、管理外でも規格内の一時点はいずれもあり得る。
## 注意
規格値を管理図の上下限へそのまま置かない。
