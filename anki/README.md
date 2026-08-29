# 統計検定1級 解法定跡カード

`../memo/anki.md` を設計仕様、`../references/official-scope.md` と公式出題範囲資料を範囲根拠として作る、オフライン完結の静的カード教材です。

## 現在のフェーズ

2026-08-29 から、Anki教材は**新規大量生成フェーズを終了し、編集・統合フェーズ**に入ります。

既存カードは1373枚ありますが、これを priority 順に上位600枚へ切るのではありません。

> **1373枚を素材として、重複・派生・参照専用カードを統合し、約600個の canonical な解法単位へ編集する。**

これが現在の最優先作業です。

監査完了までは、新規カード追加は原則停止します。明確なシラバス欠落・過去問上の欠落を埋める場合も、先に既存カードで cover できないか確認します。

## 共通規約

用語・記法・分布表記・Markdown/KaTeXは通常教材・数理100・理工80と共通の `../CONTENT_GUIDELINES.md` を継承します。一般記号の正本は `../references/notation-guide.md`、日本語用語の正本は `../references/terminology-guide.md`、分布の台・母数・確率質量関数・確率密度関数の共通正本は `../references/distribution-notation-guide.md` です。

`notation.md` はAnki固有の追加記号・表示差分だけを持ちます。

公式・定理・定義の網羅的な正本は `formulae.md` です。カードは公式集の複製ではなく、**本番で能動的に再生する価値がある判断・計算・証明の一手**を収録します。

## canonical card の原則

「1カード1論点」は、細かく切ればよいという意味ではありません。

> **1カード = 本番で1回想起すべき解法単位**

とします。

同じ trigger から同じ move を使う内容は、分野・出典・具体例・`type` が異なっても原則1枚へ統合します。

`formula / theorem / condition / recognition / reverse / pitfall` などの `type` は分類ラベルであり、それだけを理由に別カードを作りません。条件・認識・逆向き想起・典型ミスは、可能なら canonical card 本文の「なぜ」「条件・注意」へ吸収します。

1枚のカードが複数の公式シラバス用語を cover して構いません。`syllabus/coverage.yaml` は coverage を追跡するための正本であり、「公式用語1個につきカード1枚」を要求するものではありません。

## カード数

通常カードの目標は **580～620枚**、中心目標は約600枚です。

初期の分野別編集予算は次です。

| 分野 | 目安 |
|---|---:|
| 確率と確率変数 | 70 |
| 種々の確率分布 | 75 |
| 統計的推測（推定） | 110 |
| 統計的推測（検定） | 95 |
| データ解析法の考え方と各種分析手法 | 80 |
| 統計応用（共通事項） | 70 |
| 統計応用（理工学） | 100 |
| **計** | **600** |

分野別数字は quota ではなく監査目安です。全体580～620枚の中で試験価値を優先して調整します。

## archive

通常デッキから外すカードは、必要に応じて次へ隔離します。

```text
archive/
├─ duplicates/
├─ low_priority/
├─ too_specific/
└─ reference_only/
```

- `duplicates/`: 同じ trigger → same move の重複・近重複
- `low_priority/`: 正しいが600枚の通常反復対象として優先度が低い
- `too_specific/`: 数値・分布・工学設定だけを変えた特殊例
- `reference_only/`: `formulae.md` や通常教材の参照で十分な定義・公式

archive は通常ビルド、通常 coverage、通常カード枚数に含めません。

明白な完全重複は削除しても構いません。判断が分かれるものは archive に残します。

## priority

priority はカード作成順ではなく、**約600枚に残す価値**を表します。

- **S**：異なる年度の過去問で反復、または本番答案で非常に高頻度のボトルネック
- **A**：過去問で直接確認できる、または1級で極めて標準的な得点操作
- **B**：シラバス・教科書上の標準重要論点。統合対象にはなり得る
- **C**：特殊・低頻度・発展。余裕を見て採否判断
- **D**：通常デッキには原則入れず archive 候補

「他論点の前提だから」「重要そうだから」だけでは S にしません。

## 編集監査の判定順

各カードを次の順で確認します。

1. 既存カードと同じ trigger → same move ではないか
2. 数値・分布・分野だけを変えた類題ではないか
3. `formulae.md` にある参照事項だけで完結していないか
4. condition / reverse / pitfall を別カードにしただけではないか
5. 統計検定1級の独立小問または主要な一手として自然か
6. 他の canonical card を理解すれば自動的に答えられないか
7. 過去問頻度・再利用性・時間短縮効果に見合うか

判定は `keep / merge / archive / delete / review` を用います。

## 自動 curation の扱い

旧方式の

```text
1373枚
↓
priority・出典点でランキング
↓
上位950枚を通常デッキ
```

は廃止します。

これは同じ技能の重複を残したまま重要カードを落とす可能性があるためです。

監査中は `curation.yaml` の `audit_mode: true` と `selection_mode: canonical_only` を使います。自動ランキングで600枚に見せかけず、`cards/` 自体を canonical な580～620枚へ整理します。

監査完了後に `audit_mode: false` とし、カード数・coverage・検証が通る状態を完成形とします。

## 使い方

```powershell
npm run anki:build
npm run anki:validate
npm run anki:curation
npm run audit:terminology
```

`anki:curation` は現在の canonical 候補数、目標との差、priority・category内訳、監査モードを表示します。

`dist/` は生成物なので直接編集しません。

## 正本

- カード本文: `cards/**/*.md`
- 編集規約: `../memo/anki.md`
- curation規約: `curation.yaml`
- 公式シラバス分類: `syllabus/syllabus.yaml`
- coverage: `syllabus/coverage.yaml`
- 公式・定理・定義: `formulae.md`
- Anki固有記法: `notation.md`
- CSS/JavaScript: `static/`
- HTML雛形: `templates/`

生成済み `dist/` はこれらから再生成します。

## カード本文の品質

1カードは30秒～数分程度で復習できる単一の解法単位にします。ただし、手法名だけを答えるカードにはしません。

原則として、

```text
問題状況
↓
方針・公式
↓
なぜ
↓
短い具体例
↓
本質的操作
↓
結論
↓
条件・注意
```

を必要な範囲で含めます。

具体例では、畳み込みなら積分範囲、変数変換ならJacobian、MLEなら微分、Delta法なら導関数など、**そのカードの本質的操作を最低1回実行**します。

## 今後の「ankiの続きを書いて」

編集監査が完了するまでは、「ankiの続きを書いて」は新規サブカテゴリーの大量執筆ではなく、**削減監査の次の未処理範囲を進める指示**として扱います。

作業順は原則、

```text
重複統合
↓
reference-only 分離
↓
too-specific 分離
↓
priority 再査定
↓
580～620枚へ収束
↓
公式シラバス・過去問 coverage 再監査
```

です。

監査完了後、明確な欠落がある場合に限って新規カード作成へ戻ります。
