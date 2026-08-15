# 統計検定1級 解法定跡カード

`pdfs/anki.md` を設計仕様、`pdfs/grade1_hani_20150508_2.pdf` を公式範囲の根拠として作る、オフライン完結の静的カード教材です。

## 使い方

```powershell
npm run anki:build
npm run anki:validate
npm run anki:progress
```

作業を明示して進める場合は、たとえば `npm run anki:progress -- start C02-events-distribution-functions`、`npm run anki:progress -- stage C02-events-distribution-functions self_review` のように実行します。

生成物は `dist/index.html` をカテゴリー一覧の入口とし、カード本文は `category-math-probability.html` など公式シラバスのカテゴリー別HTMLに分かれます。単一カテゴリーが200枚を超えた場合は、まずサブカテゴリー境界で意味的に分割します。単一サブカテゴリーだけで200枚を超える場合に限り、その内部を最大200枚で分割します。`dist/` をコピーすれば、ネットワークなしで閲覧できます。

カードの正本は `cards/**/*.md`、分類の正本は `syllabus/syllabus.yaml`、記法・分布の正本は `notation.md`、公式・定理・定義の正本は `formulae.md` です。CSSとJavaScriptの正本は `static/`、HTML雛形は `templates/`、KaTeX資産の正本はルートの `node_modules/katex/dist/` にあります。`dist/` はこれらから再生成できるためGit管理せず、生成済みHTMLや `dist/assets/` を直接編集しません。

テンプレート内のローカルリンクは、生成先である `dist/*.html` を基準に `./assets/style.css`、`./notation.html` のように明示的な相対パスで記述します。`./dist/assets/style.css` は生成後に `dist/dist/assets/style.css` を指すため使用しません。

## pilot の範囲

公式シラバス全域を横断する公開カード50枚を収録します。各カードは「1カード1論点」を守り、公式・方針だけで終わらず、使用する定義・公式・定理を再掲し、短い具体例で本質的操作を最低1回実行します。

## 継続執筆

「ankiの続きを書いて」では `progress.yaml` の `next_work` にある、意味的に関連する1〜2サブカテゴリーを1単位として進めます。重い論点は1件、密接な論点は2件とし、枚数による機械分割はしません。各作業の `target.min`〜`target.max` は新規カード枚数の目安として `anki:progress` に表示し、自己査読へ進む前に範囲を検査します。枚数だけで合否を決めず、試験適合性査読がシラバスのねらいにある到達行動、公式用語と合格に必要な技能の充足、重複・過剰、具体的な過去問IDに基づく優先度をカードID単位で確認します。通常教材と同じ `planned → drafting → self_review → independent_review → revision → reviewed` を使います。査読記録は `review/<WORK-ID>/` に作業ごとに新設し、過去の記録へ追記しません。双方が `fatal: 0 / major: 0 / minor: 0` になった後に検証・進捗更新・作業単位のコミットまで行います。

`syllabus/coverage.yaml` は公式表の「項目（学習しておくべき用語）例」を用語単位で保持します。対象作業を自己査読以降へ進めるには、各用語が `card` 状態で、その操作を実行する同一サブカテゴリーのカードIDを1件以上持つ必要があります。未着手用語は `planned` とし、サブカテゴリー単位の粗い収録判定で代用しません。

開始時点の既存カード一覧は差分検査のため `anki/.state/` に一時保存します。`progress.yaml` には一時ファイルのパスと件数だけを持ち、作業完了時に削除します。`anki/.state/` はGit管理しません。

既存の全カテゴリー横断pilot査読は `review/C01-pilot/` に固定保存します。今後は `C02-events-distribution-functions` から `C27-engineering-design` まで、公式表の39サブカテゴリーを26個の意味的な作業単位で進めます。具体的な組合せと順序の正本は `progress.yaml` です。人文科学・社会科学・医薬生物学分野はこの教材の対象外なので進捗へ登録しません。
