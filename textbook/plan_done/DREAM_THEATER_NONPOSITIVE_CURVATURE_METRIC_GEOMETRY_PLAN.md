# DREAM THEATER 距離幾何学・非正曲率空間 計画

構成確定日: 2026-11-24 JST
状態: done（全12講実装・追跡監査・科目横断確認完了）
完了確認日: 2026-11-25 JST
系列ID: NPCG（[系列manifest](../dream-theater-series/NPCG.yaml)）
講数: **全12講**

## 1. 目的・前提・停止線

既存MT・TOP・LA（内積）、GEOの曲率の入口、GCT14、SGT1–3（後半のみ） を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

既存GEOのRiemann曲率からの飛躍を避け、一般距離空間のCAT(0)を独立に定義する。論文固有のpriceがCAT(0)になる命題および一様unitriangular PoincaréはVNPの責務。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| NPCG1 | 距離・擬距離・商・完備化：Cauchy列から構成 | 上記の既存前提 |
| NPCG2 | 長さ空間・測地線・比較三角形 | NPCG1および必要な既存前提 |
| NPCG3 | CAT(0)条件：木・Euclid空間・反例 | NPCG2および必要な既存前提 |
| NPCG4 | Bruhat–Tits CN不等式と中点一意性 | NPCG3および必要な既存前提 |
| NPCG5 | 測地線凸性と距離の凸性：中点から任意比へ | NPCG4および必要な既存前提 |
| NPCG6 | 四辺形不等式・等号・平坦な部分集合 | NPCG5、F0-00E（一次独立・一次従属）、OPT1（凸結合・凸集合・有限集合の凸包） |
| NPCG7 | 閉凸集合への射影とPythagoras型評価 | NPCG6および必要な既存前提 |
| NPCG8 | 重心・二乗距離の最小化・分散不等式 | NPCG7および必要な既存前提 |
| NPCG9 | 等長群作用・有限群固定点・不変凸集合 | NPCG8および必要な既存前提 |
| NPCG10 | 射影の平均と交互射影：凸集合の角度 | NPCG9および必要な既存前提 |
| NPCG11 | 非線形Poincaré不等式：CayleyグラフとHilbert版の比較 | NPCG10および必要な既存前提 |
| NPCG12 | rank距離・有限行列空間・等号とコンパクト性：論文D/Fへの準備 | NPCG11および必要な既存前提 |

## 3. 標準書・一次資料

Burago–Burago–Ivanov, [A Course in Metric Geometry](https://doi.org/10.1090/gsm/033)；Bridson–Haefliger, [Metric Spaces of Non-Positive Curvature](https://link.springer.com/book/10.1007/978-3-662-12494-9)（Part II のCAT(0)・凸性・群作用）；原論文Appendix OはVNPの証明照合に用いる。

関連: [VP/VNP横断履修ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [x] 初回実装時に本PLANを plans_progress に移し、系列manifestを全12講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [x] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [x] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [x] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [x] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [x] 横断監査・公開導線完了後に plan_done に移す。

## 5. 完了確認記録（2026-11-25 JST）

- 確認基準: main のコミット 298ee82ed5c79e9632df1ac821b2c6be5c6e9746。系列manifest の NPCG1–12 は全件 completed。12章の index.md / chapter.yaml / knowledge.yaml が実在し、両metadataの prerequisites は各章で一致、knowledge coverage は全件 complete。NPCG2→NPCG1 から NPCG12→NPCG11 まで連続した前提鎖を確認した。
- 各章の既存追跡監査記録を確認。下表のPRは全件 merged、最終headの5ワークフロー（textbook / Pages assembly / concepts / exercises / terminology）は全件 success。各マージコミットの index.md blob は確認基準の本文blobと全12章で一致する。各章の全主要証明・全解答の再計算・初出・行間・参照の査読は各PRに記録済み。本完了確認ではそれを再利用し、新規の全証明再計算とは称さない。

| 章 | 追跡監査PR | formal statement / proof | A / B / C | 詳細解答 |
| --- | --- | --- | --- | --- |
| NPCG1 | [#4569](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4569) | 4 / 3 | 4 / 3 / 1 | 8 |
| NPCG2 | [#4579](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4579) | 9 / 4 | 4 / 4 / 1 | 9 |
| NPCG3 | [#4588](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4588) | 6 / 4 | 4 / 4 / 1 | 9 |
| NPCG4 | [#4597](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4597) | 6 / 5 | 4 / 4 / 1 | 9 |
| NPCG5 | [#4606](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4606) | 7 / 5 | 4 / 4 / 1 | 9 |
| NPCG6 | [#4617](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4617) | 6 / 5 | 4 / 4 / 2 | 10 |
| NPCG7 | [#4618](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4618) | 4 / 3 | 4 / 4 / 1 | 9 |
| NPCG8 | [#4626](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4626) | 4 / 3 | 4 / 4 / 1 | 9 |
| NPCG9 | [#4635](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4635) | 6 / 4 | 4 / 4 / 1 | 9 |
| NPCG10 | [#4643](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4643) | 7 / 4 | 4 / 5 / 1 | 10 |
| NPCG11 | [#4655](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4655) | 6 / 4 | 4 / 4 / 1 | 9 |
| NPCG12 | [#4659](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4659) | 6 / 5 | 4 / 3 / 1 | 8 |

- 全108題に詳細解答（A48/B47/C13）。全71 formal statement、49 proof block、定義直接例22件を本文から棚卸し。公開目次ソース `textbook/dream-theater-toc/050_幾何系/145_nonpositive-curvature-metric-geometry.md` の12章リンク・順序・章タイトルは manifest と一致。各章PRのPages組み立て検証は成功。
- 科目横断: NPCG1の距離・商・完備化→NPCG2の比較三角形→NPCG3–5のCAT(0)・CN・凸性→NPCG6の四点評価→NPCG7–8の射影・重心→NPCG9–11の群作用・射影反復・Poincaré→NPCG12の階数距離、という学習目標の接続を章metadata、主要結果anchor、各章まとめから照合。完備性・測地性・一様定数を混同しない。論文固有のprice、Euclid cube、unitriangular群の一様評価やVP/VNP分離はVNP講読の責務であり、NPCG12末尾でも無条件の結論としていない。
- 本PLANの移動と同時にNPCG manifest、COURSE_DEPENDENCY_MAP、VP/VNP横断履修ルートの直接参照を更新。共通routing・公開目次・章本文・knowledgeは変更しない。
- 実施主体: ChatGPT。同一担当者による章別再計算・別観点再読の既存記録を照合した系列完了監査。第三者独立査読、実ブラウザ目視は未実施。既存の数学的未解消事項は各PR記録上なし。今回の移動PRのCIは別途確認する。
