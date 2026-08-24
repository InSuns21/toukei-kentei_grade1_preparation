# 通常教材

統計検定1級の通常章教材をまとめる領域です。Anki教材の `anki/` と同様に、通常教材に固有の正本・本文・補助資材をこのフォルダ配下へ集約します。

- 構成・進捗の正本：`curriculum.yaml`
- 章本文・演習・解答の正本：`volumes/`
- 記法規約：`notation.md`
- 執筆規約：`style-guide.md`
- 章間依存：`dependency-graph.md`
- 章生成・査読プロンプト：`prompts/`
- 雛形：`templates/`

通常教材の進捗操作と検証はリポジトリルートから実行します。

```powershell
npm run progress
npm run new:chapter -- <CHAPTER-ID>
npm run validate
```

`curriculum.yaml` の `volumes[].directory` は、この `textbook/` を基準とする相対パスです。通常教材の新規ファイルは原則としてこのフォルダ配下へ置き、共有の出典・過去問索引はルートの `references/` を参照します。
