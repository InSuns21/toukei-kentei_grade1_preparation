# DREAM THEATER 演習・解答ポリシー

このファイルは、`textbook/dream-theater-index.json` に掲載される DREAM THEATER ページに対する演習量と解答形式の差分規約を定める。

DREAM THEATER は統計検定1級の本番答案訓練ではなく、数学・確率・統計理論を理解して使えるようにするための発展教材である。そのため、通常の試験向け章にある答案圧縮・部分点設計を機械的に持ち込まない。

## 1. 演習量の最低基準

DREAM THEATER の章本文 `index.md` を新規追加または編集した場合、明示例外がなければ実際の演習数として次を満たす。

- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上

CI は `chapter.yaml` の `exercise_counts` 自己申告値ではなく、章本文中の `- Level: A` / `- Level: B` / `- Level: C` を数える。

この基準は**今回の差分で編集された DREAM THEATER 章だけ**に適用する。既存章を一括して失敗させるための監査ではない。

## 2. 水増し禁止と例外

題材の性質上、上記の題数を作ることに教育的意味が薄い場合は、水増しして基準を満たさない。代わりに同じ章の `chapter.yaml` に理由付きの例外を記録する。

```yaml
dream_theater_exercise_count_exception: "ロードマップ章であり、独立演習を8題置くより参照先の各章で演習する方が適切なため"
```

- 値は理由を記した非空文字列とする。
- `true` のような理由なしのフラグは使わない。
- 例外を指定した章では A/B/C の最低題数チェック全体をスキップする。
- 例外は「CIを通すため」ではなく、その章で題数を増やさない教育上の理由を書く。

## 3. DREAM THEATER の解答形式

DREAM THEATER の演習で必要なのは、学習者が導出・計算・証明を追える**詳細解答**である。

次の2区分は DREAM THEATER では不要とし、新規追加・編集時に作成を要求しない。

- 本番答案
- 採点基準

既存ページに残っているものを、このポリシー導入だけを理由に一括削除する必要はない。ただし、DREAM THEATER の新規演習や大幅改稿では原則として追加しない。

通常の統計検定1級対策章、統計数理100大問、理工80など試験答案訓練を目的とする教材には、この免除を適用しない。

## 4. CI

変更対象だけを検証する通常コマンド:

```bash
npm run validate:dream-theater-exercise-counts
```

全 DREAM THEATER ページを任意監査するときだけ:

```bash
npm run validate:dream-theater-exercise-counts -- --all
```

GitHub Actions では PR の base SHA または main push 前の SHA を `DREAM_THEATER_BASE_SHA` として渡し、変更された `index.md` のみをブロッキング対象にする。
