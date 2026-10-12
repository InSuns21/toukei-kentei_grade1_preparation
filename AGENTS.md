# 統計検定1級 独習教材プロジェクト

このリポジトリでは、統計検定1級向け教材、DREAM THEATER 発展数学講座、Anki 解法定跡カードを管理する。

## 最初に対象スコープを決める

作業内容に応じて、root の規約を全部読み続けるのではなく、対象に最も近い正本へ移る。

- 通常教材・textbook 共通: `textbook/AGENTS.md`
- DREAM THEATER / `textbook/volumes/00_foundations/**`: `textbook/volumes/00_foundations/AGENTS.md`
- Anki / `anki/**`: `anki/AGENTS.md`
- リポジトリ横断インフラ・CI: このファイルと変更対象の workflow / script

より深い `AGENTS.md` がある場合は、root の共通規則にそのスコープ固有規則を追加して適用する。

## GitHub上の現在状態を正本とする

教材・規約・進捗・依存関係を、過去チャットや記憶だけから推測しない。ファイル名・章ID・PR・branchが指定された場合は、GitHub上の現在の対象を確認してから編集する。

古い監査スナップショットや完了済み plan を現行規約として復活させない。規約が競合する場合は、現行の scoped `AGENTS.md` とそこから参照される正本を優先する。

## DREAM THEATER の継続作業は探索を最小化する

「続けて」「planを進めて」の場合、`textbook/volumes/00_foundations/` 全体を先に探索しない。

1. `textbook/dream-theater-work.yaml`（共通設定のみ）
2. 指定された章ID・系列IDに対応する `textbook/dream-theater-series/<系列ID>.yaml`
3. その系列 manifest の `plan` と対象章
4. 対象章と直接依存する正本

章IDを指定されたら、各 manifest の章一覧と照合して正確に特定する。指定なしなら未完了系列が一つのときのみ続行し、複数なら系列を確認する。単一の `active_series` / `next_work` は持たず、進捗は系列 manifest の `chapters` から導出する。異なる系列の作業で共通ルーターを書き換えない。

数学内容・依存関係の正本は各教材ファイルと knowledge DAG である。別の完了章の追跡監査は**明示依頼時のみ**実施し、変更章自身の必須査読とは区別する。

## 検証のスコープ

通常の leaf教材変更では changed-only validation を優先する。workflow、validator、global index、knowledge DAG、共通規約など未変更ページへ波及しうる変更は full validation へ昇格する。

PRの軽量化を理由に品質ゲートを削除しない。full audit は main、nightly、manual、または global-impact change で維持する。

## 共通の破壊防止規則

- Markdown + KaTeX。インラインは `$...$`、別行立ては `$$...$$`。
- `\(...\)`、`\[...\]`、`align`、`equation`、独自マクロ、`\label`、`\ref`、`\tag` は使わない。
- Markdown を機械編集するとき、`$$` を JavaScript の通常 replacement string に通さない。数式を含む置換は callback replacer 等を使う。
- 機械編集後は空白を除いて `$` だけの行がないことを確認する。
- `dist/` 等の生成物は、そのサブシステムの規約で明示されない限り原則コミットしない。
- 検証失敗や未解消の重大指摘がある状態を完了扱いしない。
- 作業単位ごとに、成果物と直接必要な索引・規約・進捗更新をまとめる。
- ユーザーが merge まで依頼している場合は、可能な範囲で検証・PR・mergeまで同じ作業で完了する。
