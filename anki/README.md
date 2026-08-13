# 統計検定1級 解法定跡カード

`pdfs/anki.md` を設計仕様、`pdfs/grade1_hani_20150508_2.pdf` を公式範囲の根拠として作る、オフライン完結の静的カード教材です。

## 使い方

```powershell
npm run anki:build
npm run anki:validate
npm run anki:progress
```

生成物は `dist/index.html` をカテゴリー一覧の入口とし、カード本文は `category-probability.html` など公式シラバスのカテゴリー別HTMLに分かれます。単一カテゴリーが200枚を超えた場合は、まずサブカテゴリー境界で意味的に分割します。単一サブカテゴリーだけで200枚を超える場合に限り、その内部を最大200枚で分割します。`dist/` をコピーすれば、ネットワークなしで閲覧できます。

カードの正本は `cards/**/*.md`、分類の正本は `syllabus/syllabus.yaml`、記法・分布の正本は `notation.md`、公式・定理・定義の正本は `formulae.md` です。CSSとJavaScriptの正本は `static/`、HTML雛形は `templates/`、KaTeX資産の正本はルートの `node_modules/katex/dist/` にあります。`dist/` はこれらから再生成できるためGit管理せず、生成済みHTMLや `dist/assets/` を直接編集しません。

テンプレート内のローカルリンクは、生成先である `dist/*.html` を基準に `./assets/style.css`、`./notation.html` のように明示的な相対パスで記述します。`./dist/assets/style.css` は生成後に `dist/dist/assets/style.css` を指すため使用しません。

## pilot の範囲

公式シラバス全域を横断する公開カード50枚を収録します。各カードは「1カード1論点」を守り、公式・方針だけで終わらず、使用する定義・公式・定理を再掲し、短い具体例で本質的操作を最低1回実行します。

## 継続執筆

「ankiの続きを書いて」では `progress.yaml` の次バッチを50枚単位で進めます。執筆後は独立数理査読と試験適合性査読をバッチ全体へ実行し、指摘を修正して初回と同じ2名へ再査読を依頼します。双方が `fatal: 0 / major: 0 / minor: 0` になった後、`npm run anki:build`、`npm run anki:validate`、`npm run validate` を成功させ、進捗を完了へ更新します。対象バッチ、正本、生成物、査読記録、直接必要なスクリプトだけを選択的にステージし、バッチ単位でコミットします。
