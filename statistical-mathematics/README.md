# 統計数理 100大問

統計検定1級「統計数理」向けの100大問構成を管理するディレクトリです。

## 共通規約

作問・詳細解答・本番答案・採点、定理の利用、電卓・数表、行間の埋め方、日本語表記は、統計応用（理工学）と共通の [統計数理・統計応用 共通演習規約](../EXERCISE_GUIDELINES.md) を正本とします。

このディレクトリでは上記規約を別定義しません。規約と本文が食い違う場合は、局所規約を増やさず本文を共通規約へ合わせます。

- [正式演習目次](index.md): Core 48 / Standard 32 / Advanced 20 の100題一覧
- [Core 48](core/README.md): 最優先48題。1題1ファイル
- [Standard 32](standard/README.md): Coreの次に解く32題。1題1ファイル
- [Advanced 20](advanced/README.md): 発展20題。1題1ファイル
- [残り52題 横断監査](AUDIT_REMAINING_52_2026-08-25.md)
- [定理適用監査](THEOREM_APPLICATION_AUDIT_2026-08-25.md): 定理名・適用条件・条件確認の横断監査
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

## 検証

リポジトリルートで次を実行します。

```bash
npm ci
npm run validate:mathstat
npm run validate:exercise-style
```

リポジトリ全体の検証は次です。

```bash
npm run validate
```

数式は `$...$` / `$$...$$` を使い、KaTeX strictで通る記法を正本とします。
