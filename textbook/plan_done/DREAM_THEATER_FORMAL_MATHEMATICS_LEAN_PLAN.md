# DREAM THEATER 形式数学・Lean 4 計画

構成再確定日: 2026-11-24 JST（LVT共通基盤との重複3講を除去）
状態: done（2026-11-25 JST、全7講実装・追跡監査・系列横断確認）
系列ID: FML（進捗は [系列manifest](../dream-theater-series/FML.yaml) を正本とする）
講数: **全7講**

## 1. 目的・前提・停止線

**必修共通基盤は [LVT第I・II部（14講）](../plans_progress/DREAM_THEATER_LEAN4_SOFTWARE_TESTING_FORMAL_VERIFICATION_PLAN.md)**（LVT1-01〜06、LVT2-01〜08）。進捗は [LVT manifest](../dream-theater-series/LVT.yaml) を正本とする。LVT第III〜VI部（29講）はソフトウェア仕様・テスト・差分検査の発展であり、FMLの一律必修ではない。集合・論理・証明、LA・基礎代数、MT/TOP、CMPの必要箇所も再利用する。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

LVTがLean環境・Lake、型・再帰・停止性、論理・タクティク・帰納法・依存型・定理探索・一般的な信頼境界の正本を所有する。FMLはMathlib上の数学的対象、研究定理のstatement matching・公理監査・独立kernelによる証明artifactの評価を所有する。基本操作の再講義はせず、必要な章への参照と直接の数学例のみを置く。初回の旧案FML1〜3は削除し、旧FML4〜10を新FML1〜7へ再編した（本文未着手・manifest未作成のため実装済みIDの変更はない）。

FMLはLVT共通基盤から分岐する数学研究向けの発展科目。特定のAI論文を既証明定理として輸入しない。実装時は実際にコンパイルしたLeanソースと失敗例、環境固定、実行ログを付ける。VNP24ではVP/VNP固有の公開artifactの監査を別に行う。RH/GRH等の研究読解にも一般的方法を再利用できるが、他系列の完成条件をこの変更だけで一律に変更しない。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| FML1 | Mathlib・有限集合・Fin・順列・有限和の形式化：有限和の添字交換と順列の小命題を証明 | LVT1-01〜06・LVT2-01〜08、集合・COMB1〜3 |
| FML2 | 抽象代数学の形式化：型クラス・環・体・標数・coercion・universeと基底体の変更 | FML1、既存環・体・LA |
| FML3 | 多変数多項式・環準同型・算術回路の形式化：形式多項式と評価関数の差、回路サイズの仕様 | FML2、AG1-01〜03、ACOMP1〜4 |
| FML4 | 距離・完備性・極限・Laurent級数の形式化：Cauchy列・係数・形式的近似の読み方 | FML2〜3、MT/TOP、ACOMP21〜22（Laurent級数の部分） |
| FML5 | 数学的定理の依存関係と公理監査：print axioms、sorry、unsafe、標準公理、推論の空虚性・追加仮定 | FML1〜4、LVT2-08（一般的信頼境界） |
| FML6 | Comparator・独立kernel・再現検証：固定版、clean build、statement比較、nanoda、意図的な不一致の負のテスト | FML5、LVT1-02（Lakeと再現環境） |
| FML7 | 研究論文の形式化・自然言語との照合・証明監査：小算術回路の定理を再構成し、proof ledger・証拠範囲を作成 | FML3〜6、ACOMP6〜8 |

## 3. 標準書・一次資料

[Theorem Proving in Lean 4](https://leanprover.github.io/theorem_proving_in_lean4/)；[Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)；[Mathlib](https://github.com/leanprover-community/mathlib4)。

関連: [VP/VNP横断履修ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [x] LVT共通14講の定義・タクティク・再現環境を参照し、LVT第III〜VI部と一般Lean基礎を再執筆しない。数学固有の形式化・監査に7講を集中させる。

- [x] 初回実装時に本PLANを plans_progress に移し、系列manifestを全7講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [x] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [x] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [x] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [x] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [x] 横断監査・公開導線完了後に plan_done に移す。

## 5. 完了記録（2026-11-25 JST）

全7講 completed。公開目次7件、chapter/knowledge の前提、実本文の全63演習・詳細解答（A32/B24/C7）を照合。LVT共通14講は completed、LVT第III〜VI部の完成を条件にしていない。既存の追跡監査 PR [FML1 #4521](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4521)、[FML2 #4522](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4522)、[FML3 #4532](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4532)、[FML4 #4651](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4651)、[FML5 #4657](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4657)、[FML6 #4671](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4671) と今回の FML7 追跡監査で、各章の数学・導入・演習の査読証拠を確認。FML7 の固定版実行ログ（run 45575621765）は三宣言の許容公理依存、nanoda 受理、型不一致・許容外公理の拒否を示す。第三者の独立人間査読・出版はこれらの検証と区別し、外部研究主張の成立を宣言しない。系列 manifest と直接参照を同時に移行する。
