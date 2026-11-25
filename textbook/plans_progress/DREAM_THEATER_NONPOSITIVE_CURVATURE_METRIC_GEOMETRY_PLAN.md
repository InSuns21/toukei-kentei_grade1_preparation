# DREAM THEATER 距離幾何学・非正曲率空間 計画

構成確定日: 2026-11-24 JST
状態: in progress（NPCG1–3実装、NPCG4以降未着手）
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
| NPCG6 | 四辺形不等式・等号・平坦な部分集合 | NPCG5および必要な既存前提 |
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
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。
