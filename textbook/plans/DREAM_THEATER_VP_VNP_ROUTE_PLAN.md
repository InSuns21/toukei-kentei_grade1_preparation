# DREAM THEATER VP ≠ VNP 横断履修ルート

構成確定日: 2026-11-24 JST／状態: 系列別実装進行中（GCT完了）

## 全99講（6独立系列）+ EOM追加3講

| 系列 | 正本 | 講数 |
| --- | --- | ---: |
| GCT | [組合せグラフ理論・計数計算量](../plan_done/DREAM_THEATER_GRAPH_COUNTING_COMPLEXITY_PLAN.md) | 16 |
| ACOMP | [代数的計算複雑性理論 I・II](../plan_done/DREAM_THEATER_ALGEBRAIC_COMPLEXITY_I_II_PLAN.md) | 24 |
| TSP | [テンソル理論・漸近スペクトル](../plans_progress/DREAM_THEATER_TENSOR_ASYMPTOTIC_SPECTRUM_PLAN.md) | 16 |
| NPCG | [距離幾何学・非正曲率空間](../plans_progress/DREAM_THEATER_NONPOSITIVE_CURVATURE_METRIC_GEOMETRY_PLAN.md) | 12 |
| FML | [形式数学・Lean 4](../plan_done/DREAM_THEATER_FORMAL_MATHEMATICS_LEAN_PLAN.md) | 7 |
| VNP | [VP ≠ VNP 証明研究講読](DREAM_THEATER_VP_VNP_PROOF_STUDY_PLAN.md) | 24 |
| 合計 | 既存科目・EOMを除く | 99 |

## 依存関係

既存CMP/CPLX/COMB → GCT・ACOMP前半。既存LA/AG → TSP前半。ACOMP21–22 → TSP後半。既存MT/TOP/GEO・SGT、GCT14 → NPCG。LVT第I・II部（LVT1-01〜06、LVT2-01〜08の既存14講）→ FML1〜7。FML3以降はACOMPの対応箇所も参照。LVT第III〜VI部は必修ではない。新規99講は基礎75講＋研究講読24講、EOM追加3講を含め純増102講。VNP1はACOMPの定義から着手し、VNP2–12はTSP/NPCG/GCT、VNP13–21はGCT14–16・NPCG9–12、VNP22–24はACOMP・FMLと前段の証明を参照する。GCT9–13とACOMP9–12では前者が計数帰着、後者が形式多項式帰着を所有する。循環前提を置かない（GCTはACOMPを必修としない）。TSP後半の一部はACOMP21–22を選択履修。既存CPLX21講、COMB18講、AG、SGT、CMP、LVT共通14講を重複執筆しない。

EOMの[横断3講](DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md)は VNP の詳説を参照する研究比較・証拠台帳の科目であって、99講を再講義しない。EOM0・EOM378と接続し、EOMVPA/B/VPの完了判定では対応するVNP章の正本・anchorを確認する。

## 証拠と停止線

[Claude v1](https://hexagonmath.org/2611.00954v1)／[Anthropic artifact](https://github.com/anthropics/formal-math/tree/main/vp-vnp)。著者はLean形式化と比較器を公開しているが、READMEは数学者が証明を確認していないと記載。本設計では独立ビルド・完全な証明監査をしていない。紙面A–G/O/LとH.2(d,e)、I.1、J.3、N.4のLean依存を区別する。全5主要theoremのstatementと公理、固定版、nanoda再検証、自然言語再構成、外部評価を台帳化する。P≠NPは導かない。flat/contractingは排他的と断定しない。設計時には未実装manifest/目次を追加せず、初回実装から系列manifestで進捗を管理する。
