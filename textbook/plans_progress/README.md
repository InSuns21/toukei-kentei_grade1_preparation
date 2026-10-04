# 進行中の DREAM THEATER 計画

このディレクトリには、PLAN 固有の実装・検証・監査に着手済みで、計画全体としては未完了の DREAM THEATER 系計画書を置く。

## 運用

- 未着手 PLAN で最初の PLAN 固有作業を開始したら、`textbook/plans/` からここへ移す。
- 章や phase が一部完成していても、PLAN に残タスク、横断監査、検証、公開・routing 更新が残る限りここに置く。
- PLAN の本文に進捗欄・checklist・phase 状態がある場合は、成果物と同じ作業単位で更新する。実装と計画書の進捗を意図的にずらさない。
- DREAM THEATER の active series で `next_work` が残る場合、`active_plan` は原則としてこのディレクトリの PLAN を指す。
- PLAN 全体が完了したら `textbook/plan_done/` へ移し、パス変更に伴う `dream-theater-work.yaml`、series manifest の `plan`、その他の機械参照を同じ作業単位で更新する。
- 状態遷移はコピーではなく移動で行い、同じ PLAN を複数ディレクトリへ重複配置しない。
- 詳細な完了判定・参照更新・再開規則は `textbook/AGENTS.md` の「PLAN のライフサイクル運用」を正本とする。
