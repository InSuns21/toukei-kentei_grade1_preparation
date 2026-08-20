# 最終機械検証

- 実行日時: 2026-08-20T16:59:21.861Z
- npm run anki:validate: success
- npm run validate: success

## 出力

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 814 cards (0 warnings)
built 814 cards in 13 category page(s), max 200 per page
checked 814 cards in 13 category page(s), max 200 per page
> toukei-kentei-grade1-preparation@0.1.0 validate
> npm run validate:structure && npm run validate:math && npm run validate:text


> toukei-kentei-grade1-preparation@0.1.0 validate:structure
> node scripts/validate_structure.mjs

教材構造、依存関係、進捗メタデータを検証しました。

> toukei-kentei-grade1-preparation@0.1.0 validate:math
> node scripts/validate_math.mjs

330 個の Markdown ファイルを KaTeX strict で検証しました。

> toukei-kentei-grade1-preparation@0.1.0 validate:text
> node scripts/validate_text.mjs

237 個の生成対象テキストを検証しました。
```
