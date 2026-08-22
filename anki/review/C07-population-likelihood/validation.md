# 最終機械検証

- 実行日時: 2026-08-18T14:41:12.065Z
- npm run anki:validate: success
- npm run validate: success

## 出力

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 354 cards (0 warnings)
built 354 cards in 7 category page(s), max 200 per page
checked 354 cards in 7 category page(s), max 200 per page
> toukei-kentei-grade1-preparation@0.1.0 validate
> npm run validate:structure && npm run validate:math && npm run validate:text


> toukei-kentei-grade1-preparation@0.1.0 validate:structure
> node scripts/validate_structure.mjs

教材構造、依存関係、進捗メタデータを検証しました。

> toukei-kentei-grade1-preparation@0.1.0 validate:math
> node scripts/validate_math.mjs

292 個の Markdown ファイルを KaTeX strict で検証しました。

> toukei-kentei-grade1-preparation@0.1.0 validate:text
> node scripts/validate_text.mjs

237 個の生成対象テキストを検証しました。
```

## 追加カード・表記統一の最終検証（2026-08-23）

- メイン担当: /root
- 独立数理査読: /root/math_review_population_cards
- 試験適合性査読: /root/exam_review_population_cards
- 両査読最終結果: fatal 0 / major 0 / minor 0
- `npm run anki:validate`: success
  - validated 1373 cards (0 warnings)
  - built and checked 1373 cards in 30 category pages
- `npm run validate`: success
  - structure: success
  - math: KaTeX strict 377 Markdown files
  - text: 237 generated texts

## 計算例展開の最終検証（2026-08-23）

- 対象: 母集団と標本・統計量の結論列挙型計算例7件
- 独立数理査読: fatal 0 / major 0 / minor 0
- 試験適合性査読: fatal 0 / major 0 / minor 0
- `npm run anki:validate`: success
  - validated 1373 cards (0 warnings)
  - built and checked 1373 cards in 30 category pages
- `npm run validate`: success
  - structure: success
  - math: KaTeX strict 377 Markdown files
  - text: 237 generated texts
