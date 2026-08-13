# 最終機械検証

- 実行日時: 2026-08-14T00:11:22+09:00
- 対象: 公開カード50枚、カテゴリー別配信、継続執筆ワークフロー
- 独立数理査読: `fatal: 0 / major: 0 / minor: 0`
- 試験適合性査読: `fatal: 0 / major: 0 / minor: 0`

## 検証結果

- `npm run anki:build`: success（50 cards / 9 category pages / max 200 per page）
- `npm run anki:validate`: success（50 cards / warnings 0）
- `npm run validate`: success
  - 構造検証: success
  - KaTeX strict: 232 Markdown files
  - テキスト検証: 237 generated texts
- 768 × 1024 px 実ブラウザ確認: success
  - カテゴリー一覧からカードページへの遷移
  - 日本語サブカテゴリー表示
  - 全文検索
  - 回答の開閉
  - 横方向のはみ出しなし
- 生成物完全性: success
  - 正本と生成HTMLの一致
  - カード50枚の欠落・重複なし
  - KaTeX CSS・woff2全20ファイルの原本一致
  - 外部ネットワーク資産なし

## 生成物非追跡・相対リンク変更

- 実行日時: 2026-08-14T00:22:40+09:00
- 変更単位の独立査読: `fatal: 0 / major: 0 / minor: 0`
- `anki/dist/` なしの隔離コピーから35ファイルを再生成: success
- `./assets/*` の `dist/assets/*` への解決: success
- 768 × 1024 px 実ブラウザ確認: success（横あふれ・console error なし）
- `npm run anki:validate`: success（50 cards / warnings 0 / 9 category pages）
- `npm run validate`: success（233 Markdown files / 237 generated texts）
