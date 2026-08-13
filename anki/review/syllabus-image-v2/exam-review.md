# 公式出題範囲画像に基づくAnki分類変更査読

- 担当ID: `/root/anki_exam_review`
- 初回査読日時: 2026-08-14T01:01:00+09:00
- 最終査読日時: 2026-08-14T01:14:47+09:00
- 対象: `pdfs/grade1_hani_20150508_2/{1,2,3,4}.jpg`、`anki/syllabus/syllabus.yaml`、`coverage.yaml`、公開50カードのcategory/subcategory、`anki/progress.yaml`、README、`validate_cards.mjs`、生成レポート
- 対象外: カード本文の数学内容
- 適用範囲: 統計数理、および統計応用の「共通した事項」「理工学分野」。人文科学・社会科学・医薬生物学分野は登録しない。
- 最終判定: **合格**
- 最終件数: **fatal: 0 / major: 0 / minor: 0**

## 初回指摘

### SYL-IMG-MAJ-01 共通事項の前提文を公式小項目として登録している

公式画像3ページの「確率・統計の基礎事項（統計検定2級の範囲）に加え、各応用分野に共通した事項」は、共通事項の導入・前提を示す横断行であり、小項目ではない。初回状態はこれを `applied-common-basics` としてchildren、items、coverageへ登録し、共通事項を8小項目、対象全体を40小項目としていた。

### SYL-IMG-MAJ-02 対象範囲と公式転記を将来の変更から守る独立検証がない

初回validatorは `scope`、category、subcategory、terms自身を信頼して相互整合だけを検査していた。このため、対象外行リストや公式用語を削除・変更しても、同じ正本内の構造を合わせれば成功し得た。また `progress.work` が対象カテゴリーを完全に一度ずつ持つことも保証していなかった。

### SYL-IMG-MIN-01 前提文の読点が画像と一致しない

初回の用語列は「に加え各」とし、画像の「に加え、各」から読点が欠けていた。

## 修正確認

- SYL-IMG-MAJ-01: **解消**。前提文を `applied-common.prerequisite` へ画像どおり移し、children、subcategories、items、coverageから削除した。共通事項は公式どおり7小項目、統計数理26＋共通7＋理工学6の計39小項目となった。
- SYL-IMG-MAJ-02: **解消**。公式scope、7カテゴリー、親子階層、39小項目名、全用語例、共通事項の前提文をprojection化し、目視確認した値のSHA-256と固定照合する。progressは対象7カテゴリーの完全一致・重複なしを必須化した。scopeの対象外行削除、公式語句変更、progressカテゴリー欠落の負例はいずれもvalidatorが拒否した。
- SYL-IMG-MIN-01: **解消**。`prerequisite` は「確率・統計の基礎事項（統計検定2級の範囲）に加え、各応用分野に共通した事項」と画像どおり記録した。

## 画像転記・対象範囲の最終確認

- 1.jpg: 統計数理の「確率と確率変数」5小項目、「種々の確率分布」3小項目、「統計的推測（推定）」7小項目、「統計的推測（検定）」4小項目を、名称・階層・用語例まで照合した。
- 2.jpg: 「データ解析法の考え方と各種分析手法」7小項目を照合した。
- 3.jpg: 「共通した事項」の前提文と7小項目を照合した。人文科学分野・社会科学分野はcategory、progress、coverageにない。
- 4.jpg: 「理工学分野」の想定分野6件、6小項目、用語例を照合した。医薬生物学分野はcategory、progress、coverageにない。
- 対象カテゴリーは統計数理5件、応用共通1件、理工学1件の計7件である。`progress.yaml` はC01-pilotをlegacy archiveとし、C02作業をこの7カテゴリーだけに一件ずつ持ち、`next_work: C02-probability` とする。
- `coverage.yaml` は39小項目と一対一で、対象外項目はない。各公開カードはcoverageへ収録され、カード自身のsubcategory項目へ主分類される。主coverageからカードを外す負例は拒否された。

## 50カード再分類の確認

- 公開50枚は7カテゴリーへ `8 / 1 / 10 / 5 / 7 / 6 / 13` 枚に再分類され、親subcategoryはすべて公式階層内である。
- 確率分布関数・特性値・変換・極限定理、各分布、推定、検定、データ解析は統計数理の対応小項目へ置かれている。
- 重回帰・GLM・Markov連鎖・Poisson過程は応用共通、理工学固有の多変量正規・線形推測・時系列過程・品質管理・実験計画は理工学分野へ置かれている。カード題名・操作と主分類に実質的な矛盾はない。
- 副次的に複数小項目へ関係するカードはcoverageに重複掲載できるが、validatorはカードsubcategoryへの主分類掲載を必須化する。

## 生成レポート

- `coverage.md` は7カテゴリー、公開50枚、39公式小項目のcard/reference/planned状態を日本語名で出力する。
- `validation_errors.md` は50枚、errors 0、warnings 0である。frequent movesとduplicate candidatesも再生成され、旧カテゴリー名や対象外3分野は混入していない。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `built 50 cards in 7 category page(s), max 200 per page`
- `checked 50 cards in 7 category page(s), max 200 per page`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 237ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

fatal: 0 / major: 0 / minor: 0
