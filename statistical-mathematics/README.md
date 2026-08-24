# 統計数理 100大問

統計検定1級「統計数理」向けの100大問構成を管理するディレクトリです。

- [正式演習目次](index.md): Core 48 / Standard 32 / Advanced 20 の100題一覧
- [Core 48](core/README.md): 最優先48題。1題1ファイル
- [Standard 32](standard/README.md): Coreの次に解く32題。1題1ファイル
- [Advanced 20](advanced/README.md): 発展20題。1題1ファイル
- [残り52題 横断監査](AUDIT_REMAINING_52_2026-08-25.md)
- [Source / provenance](sources/README.md): 過去問再構成・シラバス補完時の分野別ソース
- [validate-katex.mjs](validate-katex.mjs): このディレクトリ全体のKaTeX strict検証

## ディレクトリ規約

`applied-rikou-80/` と同じく、演習の正本は `core/`, `standard/`, `advanced/` の3階層です。各大問は1題1 Markdownファイルとし、ファイル名は `<100大問No.>_<snake_case_slug>.md` に統一します。

各大問は原則として次の4区分を持ちます。

1. 問題
2. 詳細解答
3. 本番答案
4. 採点基準（20点満点）

旧分野別ファイルは内容・来歴追跡のため `sources/` に退避し、日常演習では正規化済み3階層を使用します。

## KaTeX検証

リポジトリルートで次を実行します。

```bash
npm ci
npm run validate:mathstat
```

リポジトリ全体の数式検証は次です。

```bash
npm run validate:math
```

数式は `$...$` / `$$...$$` を使い、KaTeX strictで通る記法を正本とします。
