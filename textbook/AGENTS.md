# textbook スコープ規約

このファイルは `textbook/**` の通常教材と共通教材インフラに適用する。DREAM THEATER の `textbook/volumes/00_foundations/**` では、さらにその配下の `AGENTS.md` を適用する。

## 通常教材の正本

通常教材を編集・査読するときは、必要な範囲で次を確認する。

1. `textbook/curriculum.yaml`
2. `textbook/notation.md`
3. `textbook/style-guide.md`
4. `textbook/dependency-graph.md`
5. 対象章の `chapter.yaml`
6. `references/official-scope.md`
7. `references/past-exam-trends.md`
8. `references/past-exam-index.yaml`
9. `references/terminology-guide.md`

公式出題範囲・過去問適合性を扱わない作業では、無関係な参考資料を毎回全文探索しない。

## PLAN のライフサイクル運用

DREAM THEATER 系の計画書は、計画の実装状態に応じて次の3ディレクトリのいずれか1か所だけに置く。

- `textbook/plans/`: 設計済みだが、計画固有の実装・検証・監査には未着手。
- `textbook/plans_progress/`: 計画固有の実装・検証・監査に着手済みで、明示タスクが1つ以上残っている。
- `textbook/plan_done/`: 計画書に定めた成果物、必要な検証・監査、直接必要な routing / index / manifest 更新まで完了している。

判定と遷移では次を守る。

1. 新規 PLAN は、設計だけを追加するなら `plans/` に置く。同じ作業単位で計画固有の実装まで始める場合は、最初から `plans_progress/` に置いてよい。
2. 既存章・既存理論がすでに存在することや、それらへ PLAN が言及することだけでは「着手」としない。PLAN 固有の成果物・検証・監査のいずれかを実際に開始した時点で `plans_progress/` へ移す。
3. 一部の章や phase が終わっても、PLAN に残タスク、横断監査、検証、公開・routing 更新が残るなら `plan_done/` へ移さない。
4. 状態遷移はコピーではなく移動で行い、同じ PLAN を複数ディレクトリへ重複配置しない。
5. PLAN の移動でパスが変わる場合は、その PLAN を直接参照する `textbook/dream-theater-work.yaml`、対応する `textbook/dream-theater-series/*.yaml` の `plan`、その他の機械参照を同じ作業単位で更新する。
6. `dream-theater-work.yaml` は「次に何をするか」を示す routing の正本であり、3ディレクトリは PLAN 自体のライフサイクル状態を示す。ディレクトリ一覧だけから次の作業や優先順位を推測しない。
7. `next_work` が残る active series の `active_plan` は原則として `plans_progress/` を指す。系列完了後の終端状態では、履歴保持のため `plan_done/` の PLAN を参照してよい。
8. `plan_done/` は実装時点の設計・進捗履歴であり、現行の執筆規約や現在地の代替ではない。完了済み PLAN を再び現行規約として扱わない。
9. 完了済み PLAN と同じスコープの残作業を再開するなら、履歴を黙って書き換えず、同一計画の再開なら `plans_progress/` へ戻し、新しい中心問い・成果物なら新規 PLAN として `plans/` から開始する。

各ディレクトリの README は上記分類の入口として扱い、競合する場合はこの scoped `AGENTS.md` を優先する。

## 通常教材の目的

90分で5問から3問を選び、各20〜30分で論述答案を完成させる力を作る。

Level C（本番標準）を中心とし、詳細解答と本番答案を分離する。詳細解答では行間を埋め、本番答案では採点に必要な式・根拠・結論へ圧縮する。

Level C/D と30分ドリルでは、同一設定の4〜6小問を連結し、前半結果を後半で再利用する。実過去問は転載せず、年度・科目・大問番号を示す参照課題として扱う。

## 継続手順

ユーザーが対象を指定せず「続きを書いて」と求めた通常教材では、原則として次の順で進める。

1. `npm run progress` で現在地を確認する。
2. 進行中成果物を再開し、なければ `next_work` を開始する。
3. 必要なら `npm run progress -- start <ID>` と `npm run new:chapter -- <ID>` を使う。
4. 本文・演習・詳細解答・必要な答案訓練成果物を完成させる。
5. 数学的完全性と読者粒度・目的適合性を独立に査読する。
6. 重大指摘を修正し、対象スコープに合う validation を通す。
7. `npm run progress -- complete <ID>` で完了を記録する。
8. 成果物・査読記録・進捗更新を同じ作業単位でコミットする。

進捗状態は `planned -> drafting -> self_review -> independent_review -> revision -> reviewed` を使い、外部判断が必要な場合だけ理由付きで `blocked` とする。

## 数学・文章品質

- 分布の台、パラメータ空間、正則性条件、標本の独立同分布性、極限定理の仮定を省略しない。
- 名前付き分布は、必要な台・母数・確率質量関数または確率密度関数を読者が追える位置に置く。
- PMF / PDF / CDF / PGF / MGF は本文の主表記にせず、日本語正式名を優先する。
- prerequisite にない Borel 集合、Lebesgue 測度、a.e.、微分同相、Tonelli の定理等を大学初年度読者の暗黙前提にしない。
- 「行間を少なくする」は文章を短くすることではなく、非自明な暗算・暗黙の定理・未記載の同値変形を減らすことを意味する。
- 密度の積分、累積分布関数の端点、期待値の存在、行列の次元・正定値性を確認する。
- 独立と無相関、確率収束と分布収束、n と n-1、自由度、Jacobian の絶対値等の典型的誤りを重点検査する。

## 査読

章、分野横断問題、模試を reviewed にする前に原則として次の2系統を確認する。

1. 独立数理査読: 定義、定理、証明、例題、演習、解答を再計算し、仮定漏れ・定義域・可逆性・正定値性・次元・導出欠落を検査する。
2. 読者粒度・目的適合性査読: 前提章、説明順、出題範囲、時間、部分点、問題選択、演習導線を検証する。

CI green は必要条件であって十分条件ではない。

## 用語・参照

用語の主表記は `references/terminology-guide.md` を正本とする。既存問題や解答を転載・言い換えコピーしない。第三者解説サイトはテーマ索引や別解確認に限り、公式問題・公式略解と区別する。
