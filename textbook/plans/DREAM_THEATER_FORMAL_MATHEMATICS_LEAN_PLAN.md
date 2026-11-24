# DREAM THEATER 形式数学・Lean 4 計画

構成確定日: 2026-11-24 JST
状態: planned（設計確定・本文未着手）
系列予約ID: FML（実装時にmanifest/章ID衝突を再点検）
講数: **全10講**

## 1. 目的・前提・停止線

既存集合・論理・証明、LA・基礎代数、CMP（型と計算の比較） を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

FMLは一般の形式証明科目。特定のAI論文を既証明定理として輸入しない。実装時は実際にコンパイルしたLeanソースと失敗例、環境固定、実行ログを付ける。VNP24では公開artifactの監査を別に行う。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| FML1 | Lean環境・Lake・命題と型：termをkernelが検査する仕組み | 上記の既存前提 |
| FML2 | 含意・連言・量化子・等式：term proofとtactic proof | FML1および必要な既存前提 |
| FML3 | 帰納型・自然数・再帰・停止性：帰納法を実装 | FML2および必要な既存前提 |
| FML4 | 有限集合・Fin・順列・有限和：小さな列挙命題 | FML3および必要な既存前提 |
| FML5 | 型クラス・環・体・標数・coercionとuniverse | FML4および必要な既存前提 |
| FML6 | MvPolynomial・評価・写像：形式多項式と関数の差 | FML5および必要な既存前提 |
| FML7 | 距離・完備性・極限・LaurentSeriesのstatement読解 | FML6および必要な既存前提 |
| FML8 | 定理の依存・公理監査：print axioms、sorry、unsafeの区別 | FML7および必要な既存前提 |
| FML9 | Leanの再現ビルド・固定toolchain・比較器・独立kernel・負のテスト | FML8および必要な既存前提 |
| FML10 | 論文と形式命題の照合・proof ledger：小回路の証明を再構成 | FML9および必要な既存前提 |

## 3. 標準書・一次資料

[Theorem Proving in Lean 4](https://leanprover.github.io/theorem_proving_in_lean4/)；[Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)；[Mathlib](https://github.com/leanprover-community/mathlib4)。

関連: [VP/VNP横断履修ルート](DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [ ] 初回実装時に本PLANを plans_progress に移し、系列manifestを全10講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。
