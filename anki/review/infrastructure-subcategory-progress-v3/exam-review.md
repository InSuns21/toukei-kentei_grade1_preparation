# Anki進捗基盤 schema v3 試験適合性査読

- 担当ID: `/root/anki_exam_review`
- 初回査読日時: 2026-08-14T01:20:00+09:00
- 最終再査読日時: 2026-08-14T01:34:00+09:00
- 対象: `AGENTS.md` のAnki継続手順、`anki/progress.yaml` schema v3、`anki/scripts/progress.mjs`、`anki/scripts/validate_cards.mjs`、`anki/README.md`、`anki/prompts/review-category.md`
- 対象外: 既存50カード本文の数理内容

## 結論

公式対象7カテゴリーの39サブカテゴリーは、重複・欠落なく26作業へ編成されている。各作業は同一親カテゴリー内の1〜2サブカテゴリーであり、隣接する概念・手法をまとめた意味単位になっている。人文科学・社会科学・医薬生物学分野は登録されていない。

開始・再開・状態遷移・完了の各入口で、開始時の全公開カードのIDとカテゴリー／サブカテゴリーを基準に、既存カードの削除・移動と対象外サブカテゴリーへの新規追加を拒否する。`next_work` の順序、作業別review directory、日本語title、カード内容変更時の2名査読と基盤変更時の1名査読も、文書とvalidatorで整合した。

## 初回指摘

### major 1: start前の対象外追加をbaselineへ取り込めた

- 場所: `anki/scripts/progress.mjs` の `start`
- 再現: 公開50カードへ対象外サブカテゴリーのカードを1枚追加した状態で `start C02-events-distribution-functions` を実行すると、初版は51枚をbaselineとして開始できた。
- 影響: 作業開始前の未追跡カードを正当な既存カードとして固定でき、作業範囲の隔離が破れる。

### major 2: stageが作業範囲を再検査しなかった

- 場所: `anki/scripts/progress.mjs` の `stage`
- 再現: 正常にstart後、対象外の `math-distribution-characteristics` にカードを追加して `stage ... self_review` を実行すると、初版は遷移を受理した。
- 影響: 不正差分を残したまま査読工程を進められる。

### major 3: 26作業の意味的な組合せ・順序をvalidatorが固定していなかった

- 場所: `anki/scripts/validate_cards.mjs`
- 根拠: 初版は39件の一意partition、1〜2件、同一親のみを検査し、別の組合せ、順序、曖昧なtitleへの変更を許した。
- 影響: 意味的な作業計画が機械的な再編成へ退行しても検出できない。

### major 4: 基盤変更の1名査読契約が進捗基盤を含まなかった

- 場所: `AGENTS.md` のAnki査読者数の例外規定
- 根拠: 初版の列挙は配信実装・生成物配置・リンク・ビルド手順に限定され、進捗管理と検証スクリプトを明示していなかった。
- 影響: 要件「カード内容変更は2名、基盤変更は1名」を字義どおり運用できない。

初回件数: fatal: 0 / major: 4 / minor: 0

## 修正確認

- `inspectWorkScope` がbaseline件数、全既存IDの存在、カテゴリー／サブカテゴリー位置不変、新規IDの対象範囲、総数整合を共通検査する。再開start、全stage、completeから呼ばれることを確認した。新規startもカード数が `reviewed_card_count` と一致しない場合に拒否する。
- `validate_cards.mjs` は26作業の順序付き `{id,title,category,subcategories,review_dir}` projectionをSHA-256で固定し、39件の完全partition、1〜2件、同一親、日本語titleへの全構成サブカテゴリー名包含を併せて検査する。
- `AGENTS.md` は、カード本文・記法・公式・coverageを変えない進捗管理、検証スクリプト、配信等の基盤変更を1名査読対象として明記した。
- `progress.yaml` の26作業を目視確認した。確率の事象／分布関数、特性値／変数変換、推定の母集団／尤度、推定法／推定量の性質、検定の基礎／導出、分散分析／回帰、共通分野の確率過程／時系列、理工学の線形推測／漸近理論などは意味的な組合せであり、単独作業も独立した重い論点である。
- `AGENTS.md`、`README.md`、査読promptは、枚数ノルマなし、作業別の新規review directory、同一担当による再査読、カード追加時の2独立査読、検証・進捗更新・選択コミットまでの導線で一致する。

## 隔離コピー検証

- 順序違反: 未着手状態で `start C03-characteristics-transformations` は `次の作業は C02-events-distribution-functions` として拒否。
- start前混入: 51枚目を対象外サブカテゴリーへ追加した状態の `start C02-events-distribution-functions` は `開始前に未追跡のカード差分があります` として拒否。
- stage対象外追加: 正常start後、対象外サブカテゴリーへ追加して `stage ... self_review` は `対象外サブカテゴリーに新規カードがあります` として拒否。
- 既存カード移動: 正常start後、既存カードを同じ作業内の別サブカテゴリーへ移して `stage ... self_review` は `既存カードが削除または別カテゴリー・サブカテゴリーへ移動されています` として拒否。
- complete対象外追加: revisionまで正常遷移後、対象外サブカテゴリーへ追加してcompleteすると同じ範囲検査で拒否。
- 作業計画改変: C02の日本語titleを変更したfixtureは、projection hash不一致と構成サブカテゴリー名欠落の双方でvalidatorが拒否。
- 正常系: C02をstartし、対象の `math-events` に1枚追加、coverageを同期し、`self_review -> independent_review -> revision -> reviewed` を完走。complete内の両validatorが成功し、`reviewed_card_count: 51`、`added_card_ids` は追加IDのみ、`baseline_cards` は削除、`current_work: null`、`next_work: C03-characteristics-transformations`、summaryは `planned: 25 / reviewed: 2` となった。summaryにはcurrent/nextの日本語titleも表示された。

## 最終機械検証

- 実行日時: 2026-08-14T01:32:00+09:00（修正後）、2026-08-14T01:34:00+09:00（最終文書修正後再実行）
- `npm run anki:validate`: success — `validated 50 cards (0 warnings)`、7 category pages、max 200、buildと`--check`成功。
- `npm run validate`: success — 構造・依存関係・進捗メタデータ成功、KaTeX strict 238 Markdown成功、生成対象テキスト237件成功。

## 最終判定

fatal: 0 / major: 0 / minor: 0
