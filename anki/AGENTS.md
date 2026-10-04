# Anki スコープ規約

このファイルは `anki/**` の編集・監査に適用する。

## 正本

作業前に必要な範囲で次を確認する。

1. `memo/anki.md`
2. `anki/README.md`
3. `anki/curation.yaml`
4. 最新の `anki/reports/reduction_audit_*.md`
5. `anki/syllabus/syllabus.yaml`
6. `anki/syllabus/coverage.yaml`
7. `anki/formulae.md`
8. `anki/notation.md`
9. `references/official-scope.md`
10. `references/past-exam-index.yaml`

## 1カード = 本番で1回想起すべき解法単位

「1カード1論点」は細かく切れるものを全部カードにする意味ではない。同じ問題状況を見て同じ一手を発火するなら、分野・出典・具体例・type が違っても原則として canonical card に統合する。

type差、一般形と数値例、名前空間差、同じ手法を別分布へ適用しただけの差を理由にカードを増殖させない。

カードは単なる手法名当てで終わらせず、短い具体例で本質的操作を最低1回実行する。公式・定義・定理の網羅は `anki/formulae.md` が担う。

## audit_mode

`anki/curation.yaml` の `audit_mode: true` では新規大量生成ではなく、約600枚への編集・統合を優先する。

原則順序:

```text
重複統合
↓
reference-only 分離
↓
too-specific 分離
↓
priority 再査定
↓
580〜620枚へ収束
↓
coverage 再監査
```

禁止事項:

- priority順の単純上位600枚切り
- 自動selectorだけで監査完了扱い
- coverageを埋めるためだけの新規カード
- type差だけを理由に残すこと
- タイトルだけ見た大量削除

archive は通常カード数・通常ビルド・通常 coverage に含めない。可能なら `archive_reason` と `canonical_card` を残す。

`audit_mode: false` 後の新規追加は、公式シラバスまたは過去問 coverage に明確な欠落があり、既存 canonical card と archive で cover できない場合に限る。

## priority

- S: 複数年度で反復、または本番答案の高頻度ボトルネック
- A: 過去問で直接確認、または1級で極めて標準的な得点操作
- B: シラバス・教科書上の標準重要論点
- C: 特殊・低頻度・発展
- D: 通常デッキには原則残さず archive 候補

「他論点の前提」「重要そう」だけで S にしない。

## カード品質

必要な範囲で

```text
問題状況
↓
方針・公式
↓
なぜ
↓
具体例
↓
本質的操作
↓
結論
↓
条件・注意
```

を含める。

畳み込みなら積分区間、変数変換なら逆変換と Jacobian、MLEなら尤度と微分、CLTなら中心化・標準化、CRLBなら Fisher 情報、Delta法なら導関数、OLSなら係数計算など、本質的操作を実行する。

## 査読

削減監査では、統合後に数学操作が失われていないか、1枚が巨大化していないか、archive対象が独立技能を持っていないか、公式シラバスの到達行動・過去問頻出 canonical move が残るかを確認する。

カード本文・数式を変更した場合は数理検証を行う。インフラ・selector・レポートだけの変更は、その変更領域に合う機械検証を使う。

Anki に連結4〜6小問、20〜30分論述、答案圧縮、部分点構造、90分の問題選択戦略を必須化しない。これらは通常教材・模試側が担当する。
