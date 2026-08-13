# Anki進捗基盤schema v2 変更単位査読

- 担当ID: `/root/anki_exam_review`
- 実行日時: 2026-08-14T00:49:30+09:00
- 対象: `anki/progress.yaml` schema v2、`anki/scripts/progress.mjs`、`validate_cards.mjs`、`AGENTS.md`、`anki/README.md`、`anki/prompts/review-category.md`、`review/C01-pilot/` への既存査読3ファイル移動
- 対象外: 公開50枚のカード内容
- 最終判定: **合格**
- 最終件数: **fatal: 0 / major: 0 / minor: 0**

## 初回指摘

### INFRA-PROGRESS-FATAL-01 正常start後にvalidatorが必ず失敗する

初期実装は `start C02-probability` で同作業を `drafting` にする一方、`next_work` を同IDのまま保持し、validatorは `next_work` が `planned` であることを要求した。正常なstart直後から `next_work C02-probability はplanned作業ではありません` となり、`complete` 内の検証にも到達できない状態だった。

### INFRA-PROGRESS-FATAL-02 Windowsでcompleteのnpm検証を起動できない

正常遷移、新規カード、両査読記録を揃えた隔離コピーで `complete C02-probability` を実行すると、`execFileSync("npm.cmd", ...)` が `spawnSync npm.cmd EINVAL` となった。`validation.md` と `reviewed` 更新が作られず、Windows上で完了不能だった。

### INFRA-PROGRESS-MAJOR-01 対象外カードのID差し替えを新規対象カードと誤認できる

初期実装のbaselineは対象カテゴリー内IDだけだった。対象外カテゴリーの既存IDを別IDへ差し替え、同時に対象カテゴリーへ新規IDを追加すると、総数式だけでは対象外変更を識別できなかった。

### INFRA-PROGRESS-MAJOR-02 `next_work` を飛ばして後続作業を開始できる

初期状態で `start C02-distributions` が成功し、`C02-probability` を `planned` のまま残して `current_work` と `next_work` が `C02-distributions` になった。READMEと進捗正本が示すカテゴリー順をCLI・validatorが強制していなかった。

### INFRA-PROGRESS-MAJOR-03 複数active workをvalidatorが許す

正常な `C02-probability` 開始後に `C02-distributions.status=self_review` を併存させても、初期validatorは成功した。`current_work` とactive status集合の一対一性が検査されていなかった。

### INFRA-PROGRESS-MINOR-01 `updated_at` が日本時間で前日へ戻る

`new Date().toISOString().slice(0, 10)` はUTC日付であるため、日本時間2026-08-14 00時台のstartで `updated_at: 2026-08-13` を記録した。

## 修正確認

- INFRA-PROGRESS-FATAL-01: **解消**。save時に `next_work = current_work ?? 先頭planned` を同期し、validatorはactive中に `next_work === current_work`、idle時に先頭plannedとの一致を要求する。正常start直後の `npm run anki:validate` は成功した。
- INFRA-PROGRESS-FATAL-02: **解消**。`npm.cmd` の直接spawnを廃止し、`process.env.npm_execpath` のnpm CLIを `process.execPath` で実行する。隔離コピーの正常completeで両検証、専用`validation.md`生成、状態更新まで成功した。
- INFRA-PROGRESS-MAJOR-01: **解消**。start時に全公開カード50件の `{id, category}` を `baseline_cards` へ保存する。既存IDの削除・category移動、対象外categoryの新規ID、総数不一致をvalidatorとcompleteの双方が拒否する。対象外ID差し替え＋対象category追加の負例は3 errorsで失敗した。
- INFRA-PROGRESS-MAJOR-02: **解消**。新規startは要求IDと `next_work` の一致を必須とし、同一active workの再開だけを許す。`start C02-distributions` の先行実行は拒否された。idle時にYAML順の先頭plannedと異なる `next_work` を手編集した負例もvalidatorが拒否した。
- INFRA-PROGRESS-MAJOR-03: **解消**。active status ID集合を算出し、`current_work` があれば正確に1件かつ同ID、nullなら0件を必須化した。2作業をactiveにした負例は `active statusはcurrent_workの1件だけにします` で失敗した。
- INFRA-PROGRESS-MINOR-01: **解消**。通常教材と同じ `Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" })` を使用し、同時刻帯で `updated_at: 2026-08-14` を確認した。

## 要件別の最終確認

- schema v2の初期値は `current_work: null`、`next_work: C02-probability`、pilotを含むsummary `total: 10 / planned: 9 / reviewed: 1` である。9個のC02作業は公式シラバスの9カテゴリーと一対一で、固定枚数ノルマはない。
- 状態遷移は `planned -> drafting -> self_review -> independent_review -> revision -> reviewed` の順に限定され、途中飛ばしと別workの並行開始を拒否する。
- startは作業専用 `review/<WORK-ID>/` を生成する。review_dirは `review/<WORK-ID>` 固定かつ一意で、root直下の旧3ファイル再作成をvalidatorが拒否する。
- 既存3査読ファイルは内容変更0の100% renameで `review/C01-pilot/{math-review.md,exam-review.md,validation.md}` へ移動しており、legacy archiveとして固定される。新規作業は過去ファイルへ追記しない。
- 正常系の隔離テストではC02-probabilityへ1枚だけ追加してcompleteし、`added_card_ids: [prob-review-temp-new]`、`reviewed_card_count: 51`、`last_completed_work: C02-probability`、`current_work: null`、`next_work: C02-distributions`、summary `reviewed: 2 / planned: 8` を確認した。`baseline_cards` は削除され、`review/C02-probability/validation.md` が生成された。
- `AGENTS.md` とREADMEは「ankiの続きを書いて」から対象カテゴリー執筆、2独立査読、同一担当再査読、両検証、complete、対象限定コミット、次作業確認までを要求する。review promptも対象カテゴリーの追加カードと作業専用記録を単位とする。

## 最終機械検証

### `npm run anki:validate`

- 実行結果: **成功**（exit code 0）
- `validated 50 cards (0 warnings)`
- `built 50 cards in 9 category page(s), max 200 per page`
- `checked 50 cards in 9 category page(s), max 200 per page`

### `npm run validate`

- 実行結果: **成功**（exit code 0）
- 構造検証: 成功
- KaTeX strict: Markdown 234ファイルを検証し成功
- テキスト検証: 生成対象237件を検証し成功

fatal: 0 / major: 0 / minor: 0
