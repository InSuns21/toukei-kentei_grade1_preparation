# 完了済みの DREAM THEATER 計画

このディレクトリには、計画書に定めた成果物、必要な検証・監査、直接必要な routing / index / manifest 更新まで完了した DREAM THEATER 系計画書を履歴として保管する。

## 運用

- 一部の章や phase が終わっただけではここへ移さない。PLAN に明示された残タスク、横断監査、検証、公開・routing 更新まで完了していることを確認する。
- 完了時は `textbook/plans_progress/` からここへ移し、パス変更に伴う `dream-theater-work.yaml`、series manifest の `plan`、その他の機械参照を同じ作業単位で更新する。
- 系列完了後の終端状態では、`next_work: null` の `dream-theater-work.yaml` がここにある PLAN を `active_plan` として参照してよい。
- ここにある文書は実装時点の設計・進捗履歴であり、現行の執筆規約や現在地の正本ではない。完了済み PLAN を根拠に、現行の scoped `AGENTS.md` や authoring standard を上書きしない。
- 完了済み PLAN と同じスコープの残作業を再開する場合、履歴を黙って継続編集しない。同一計画の再開なら `textbook/plans_progress/` へ戻し、新しい中心問い・成果物なら新規 PLAN を `textbook/plans/` に作る。
- 誤字・リンク切れ等の履歴保守を除き、完了済み PLAN へ新しい未実装要件だけを書き足して「done」のままにしない。
- 詳細な状態判定・参照更新・再開規則は `textbook/AGENTS.md` の「PLAN のライフサイクル運用」を正本とする。
