# 通常教材

統計検定1級の通常章教材をまとめる領域です。Anki教材の `anki/` と同様に、通常教材に固有の正本・本文・補助資材をこのフォルダ配下へ集約します。

- 全教材共通規約：`../CONTENT_GUIDELINES.md`
- 構成・進捗の正本：`curriculum.yaml`
- 章本文の正本：`volumes/<volume>/<chapter>/index.md`（新形式）
- 章メタデータ：各章の `chapter.yaml`、`glossary.yaml`
- 記法規約：`notation.md`
- 共通用語：`../references/terminology-guide.md`
- 共通分布規約：`../references/distribution-notation-guide.md`
- 執筆規約：`style-guide.md`
- 粒度レビュー計画：`REVIEW_PLAN.md`
- 章間依存：`dependency-graph.md`
- 章生成・査読プロンプト：`prompts/`
- 雛形：`templates/`

## 1単元1ページ

新規章は `index.md` 1枚に、導入・定義・定理・例題・演習・詳細解答・本番ドリルをまとめます。演習は「問題 → 折りたたみ式の解答 → 次の問題」の順に配置します。

既存章には `00_overview.md` から `09_past_exam_practice.md` までの旧分割形式が残っています。移行期間中はこの形式もvalidationで許容し、GitHub Pagesのビルド時に1ページへ合成します。既存の個別ファイルへのリンクは互換性のため当面残します。

## Chatからの追記

通常教材の本文追記・問題追加は、独立査読記録が未作成でも機械validationを実行できます。人手査読と機械検証を分離し、Chatから小さな追記を行うたびにレビュー状態遷移を強制しません。

```powershell
npm run progress
npm run new:chapter -- <CHAPTER-ID>
npm run validate
npm run validate:pages
```

`npm run validate` は構造・数式・文字コードなどのブロッキング検証です。従来の厳格な査読状態込み構造検証を確認したい場合だけ `npm run validate:structure:strict` を使います。

品質改善用の非ブロッキング監査は別コマンドです。

```powershell
npm run audit:textbook-granularity
npm run audit:terminology
```

`curriculum.yaml` の `volumes[].directory` は、この `textbook/` を基準とする相対パスです。通常教材の新規ファイルは原則としてこのフォルダ配下へ置き、共有の出典・過去問索引・用語ガイドはルートの `references/` を参照します。
