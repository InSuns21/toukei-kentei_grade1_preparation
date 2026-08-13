# 統計検定1級 解法定跡カード

`pdfs/anki.md` を設計仕様、`pdfs/grade1_hani_20150508_2.pdf` を公式範囲の根拠として作る、オフライン完結の静的カード教材です。

## 使い方

```powershell
npm run anki:build
npm run anki:validate
npm run anki:progress
```

カテゴリー作業を明示して進める場合は、たとえば `npm run anki:progress -- start C02-probability`、`npm run anki:progress -- stage C02-probability self_review` のように実行します。

生成物は `dist/index.html` をカテゴリー一覧の入口とし、カード本文は `category-math-probability.html` など公式シラバスのカテゴリー別HTMLに分かれます。単一カテゴリーが200枚を超えた場合は、まずサブカテゴリー境界で意味的に分割します。単一サブカテゴリーだけで200枚を超える場合に限り、その内部を最大200枚で分割します。`dist/` をコピーすれば、ネットワークなしで閲覧できます。

カードの正本は `cards/**/*.md`、分類の正本は `syllabus/syllabus.yaml`、記法・分布の正本は `notation.md`、公式・定理・定義の正本は `formulae.md` です。CSSとJavaScriptの正本は `static/`、HTML雛形は `templates/`、KaTeX資産の正本はルートの `node_modules/katex/dist/` にあります。`dist/` はこれらから再生成できるためGit管理せず、生成済みHTMLや `dist/assets/` を直接編集しません。

テンプレート内のローカルリンクは、生成先である `dist/*.html` を基準に `./assets/style.css`、`./notation.html` のように明示的な相対パスで記述します。`./dist/assets/style.css` は生成後に `dist/dist/assets/style.css` を指すため使用しません。

## pilot の範囲

公式シラバス全域を横断する公開カード50枚を収録します。各カードは「1カード1論点」を守り、公式・方針だけで終わらず、使用する定義・公式・定理を再掲し、短い具体例で本質的操作を最低1回実行します。

## 継続執筆

「ankiの続きを書いて」では `progress.yaml` の `next_work` にある公式シラバスのカテゴリーを1単位として進めます。通常教材と同じ `planned → drafting → self_review → independent_review → revision → reviewed` を使い、機械的な枚数ノルマは設けません。査読記録は `review/<WORK-ID>/` に作業ごとに新設し、過去の記録へ追記しません。双方が `fatal: 0 / major: 0 / minor: 0` になった後に検証・進捗更新・カテゴリー作業単位のコミットまで行います。

既存の全カテゴリー横断pilot査読は `review/C01-pilot/` に固定保存します。今後の作業は公式表の対象範囲に沿って `C02-probability`、`C02-distributions`、`C02-estimation`、`C02-testing`、`C02-data-analysis`、`C02-applied-common`、`C02-applied-engineering` の順で、それぞれ独立した査読記録を持ちます。人文科学・社会科学・医薬生物学分野はこの教材の対象外なので進捗へ登録しません。
