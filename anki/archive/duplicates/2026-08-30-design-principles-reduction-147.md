---
id: design-randomization-purpose
title: 無作為化が推論を支える理由を説明する
category: applied-common
subcategory: applied-design
topic: randomization
type: recognition
difficulty: 3
priority: B
hashtags:
  - フィッシャーの3原則
  - 無作為化
  - 交絡
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 無作為化・反復・局所管理
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 無作為化が割付前背景因子と処置の系統的な結び付きを避け、割付機構に基づく推論を支える理由と、有限標本で完全均衡を保証しない注意をcanonical
  cardへ統合済み。
---
## 問題
処置の無作為割付が、観測された交絡因子だけでなく未観測交絡にも有効な理由を述べよ。

## 記号・用語
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

完全無作為化では固定された潜在結果に対し、処置ラベルだけが無作為。

## 答え
割付前の実験単位特性と処置割付を確率的に独立にするため、処置群間の背景差が平均的に均衡する。割付機構そのものから帰無分布と標準誤差を評価できる。

## 計算例
大標本では年齢、重症度、未知の予後因子も群間で均衡しやすい。

## 注意
無作為化は有限標本で全共変量の完全一致を保証しない。

<!-- CARD -->

---
id: design-replication-purpose
title: 真の反復と技術的反復を区別する
category: applied-common
subcategory: applied-design
topic: replication
type: recognition
difficulty: 2
priority: B
hashtags:
  - フィッシャーの3原則
  - 反復
  - 実験単位
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 無作為化・反復・局所管理
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 真の反復を独立な実験単位への処置割付として定義し、技術的反復との違い、処置効果の誤差自由度を増やさない注意をcanonical cardへ統合済み。
---
## 問題
真の反復と、同じ実験単位を複数回測る技術的反復を区別せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

解析上の標本数は観測数でなく独立に無作為化された実験単位数で決まる。

## 答え
真の反復は処置を独立な複数の実験単位へ割り付ける。技術的反復は一つの実験単位から複数測定を得て測定誤差を減らすが、処置効果の独立な誤差自由度は増やさない。

## 計算例
1匹の動物から3組織切片を測るのは処置反復1、測定反復3。

## 注意
技術的反復を独立標本として扱うと擬似反復になる。

<!-- CARD -->

---
id: design-local-control
title: 局所管理で誤差を減らす仕組みを説明する
category: applied-common
subcategory: applied-design
topic: local-control
type: recognition
difficulty: 3
priority: B
hashtags:
  - フィッシャーの3原則
  - 局所管理
  - ブロック化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化の意味
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 局所管理を処置前に分かる異質性によるブロック化とブロック内無作為化として説明し、誤差変動を分離して精度を上げる仕組みをcanonical cardへ統合済み。
---
## 問題
処置と無関係だが応答に影響する因子Zが既知のとき、局所管理をどう行い、何が改善するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

乱塊法では全変動を処置・ブロック・誤差へ分解する。

## 答え
Zが近い実験単位を同じブロックにまとめ、各ブロック内で処置を無作為化する。ブロック間変動を誤差平方和から分離し、処置差の誤差分散を小さくする。

## 計算例
患者を施設または重症度でブロック化して治療を割り付ける。

## 注意
処置後に決まる変数でブロック化しない。

<!-- CARD -->

---
id: design-experimental-observational-unit
title: 実験単位と観測単位を判別する
category: applied-common
subcategory: applied-design
topic: experimental-unit
type: recognition
difficulty: 3
priority: B
hashtags:
  - 実験単位
  - 観測単位
  - 無作為割付
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験単位と観測単位
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 実験単位を処置を独立に割り付けられる最小単位、観測単位を応答測定単位として区別し、炉運転と製品の具体例をcanonical cardへ統合済み。
---
## 問題
実験単位と観測単位を、無作為割付との関係で定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処置割付が共有される観測は条件付きに相関し得る。

## 答え
実験単位は処置を独立に割り付けられる最小単位。観測単位は実際に応答を測定する単位。両者が異なる場合、誤差自由度と解析単位は実験単位に基づける。

## 計算例
教室単位で教材を割り付け、生徒得点を測ると、実験単位は教室、観測単位は生徒。

## 注意
観測数をそのまま処置の反復数としない。

<!-- CARD -->

---
id: design-pseudoreplication
title: 擬似反復による標準誤差過小評価を判定する
category: applied-common
subcategory: applied-design
topic: pseudoreplication
type: recognition
difficulty: 3
priority: B
hashtags:
  - 実験単位
  - 擬似反復
  - クラスタ相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験単位と観測単位
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 同一実験単位内の複数観測を独立反復として扱う擬似反復、誤差自由度と標準誤差への影響、階層モデルでも真の反復不足は補えない注意をcanonical
  cardへ統合済み。
---
## 問題
処置群ごとに水槽1個だけを用意し、各水槽から魚10匹を測った。魚を独立な処置反復として比較できない理由を述べよ。

## 記号・用語
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同一実験単位内の観測には共通ランダム効果による相関がある。

## 答え
処置は水槽へ割り付けられ、魚は水槽環境を共有する。処置効果と水槽効果が交絡し、独立な処置反復は各群1しかない。魚10匹を独立扱いすると誤差自由度を水増しする。

## 計算例
複数水槽を各処置へ無作為割付する必要がある。

## 注意
階層モデルを使っても処置ごとに実験単位1では処置と単位効果を分離できない。

<!-- CARD -->

---
id: engdesign-objective-response-factor
title: 実験目的から応答・因子・実験単位を特定する
category: applied-engineering
subcategory: engineering-design
topic: experiment-planning
type: recognition
difficulty: 1
priority: B
hashtags:
  - 実験の計画と実施
  - 応答
  - 実験単位
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 応答・因子・実験単位の同定と、同じ炉で処理する複数製品を独立反復としない工学例をcanonical cardへ統合済み。
---
## 問題
焼成温度が製品強度へ与える影響を調べ、同じ炉で一度に焼く5個へ同じ温度を与える。応答、因子、実験単位を答えよ。
## 記号・用語
応答は測定する結果、因子は操作する条件、実験単位は処置を独立に割り付けられる最小単位である。
## 使用公式・定理
独立な反復数は測定個数ではなく、処置を独立に無作為化できる実験単位数で数える。
## 一手／方針
何を測るか、何を変えるか、どこまで別々に温度を割り付けられるかを分ける。
## 答え
応答は製品強度、因子は焼成温度、実験単位は炉の1回の運転である。
## 計算例
4回の炉運転を各温度へ割り付ければ各温度4反復であり、各運転内5個は測定の反復である。
## 注意
炉内の5個を独立反復として扱うと疑似反復になる。

<!-- CARD -->

---
id: engdesign-replication-power-ratio
title: 反復数と標準誤差の関係を計算する
category: applied-engineering
subcategory: engineering-design
topic: replication-precision
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 実験の計画と実施
  - 反復
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 独立反復数を増やすと平均の標準誤差が概ね反復数の平方根に反比例して低下する関係をcanonical
  cardへ統合済み。したがって標準誤差を半分にするには反復数を4倍にする数値専用カードは不要。
---
## 問題
等分散で2処置を各 $n$ 回独立反復する。平均差の標準誤差を現在の半分にするには反復数を何倍にすべきか。
## 記号・用語
$\sigma^2$ は1実験単位の誤差分散である。
## 使用公式・定理
$\operatorname{SE}(\overline Y_1-\overline Y_2)=\sigma\sqrt{2/n}$。
## 一手／方針
標準誤差が $n^{-1/2}$ に比例することを使う。
## 答え
$1/\sqrt c=1/2$ より $c=4$。反復数を4倍にする。
## 計算例
各処置5反復から20反復へ増やすと標準誤差は半分になる。
## 注意
測定を同じ実験単位内で増やすだけでは独立反復数は増えない。
