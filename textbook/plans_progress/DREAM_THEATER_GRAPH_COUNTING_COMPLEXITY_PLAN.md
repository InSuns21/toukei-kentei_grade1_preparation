# DREAM THEATER 組合せグラフ理論・計数計算量 計画

構成確定日: 2026-11-24 JST
状態: in progress（GCT1–3実装、GCT4–16予定）
系列予約ID: GCT（実装時にmanifest/章ID衝突を再点検）
講数: **全16講**

## 1. 目的・前提・停止線

COMB1–18、CPLX1–11・18–21、CMP1–8、SGT1–3（必要箇所のみ） を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

既存COMBの包除・母関数、SGTのLaplacian・線形スペクトルギャップ、CPLXのNP完全性を正本とする。線形PoincaréはSGTへ、非線形はNPCGへ。論文固有のgrid gadget・高速化はVNPへ。#P完全性を形式多項式のVNP完全性と同一視しない。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| GCT1 | 有限有向・無向グラフ、辺重み、隣接行列：同型とwalkの計数 | 上記の既存前提 |
| GCT2 | 二部マッチングとHallの定理：増加路による証明 | GCT1および必要な既存前提 |
| GCT3 | 完全マッチングの重み付き母関数とパーマネント | GCT2および必要な既存前提 |
| GCT4 | サイクル被覆・Hamilton閉路と順列の巡回分解 | GCT3および必要な既存前提 |
| GCT5 | 木・森・カット・separator：木上の動的計画 | GCT4および必要な既存前提 |
| GCT6 | 木分解とtreewidth：境界状態による計数 | GCT5および必要な既存前提 |
| GCT7 | グラフ準同型・制約充足問題と因子グラフ | GCT6および必要な既存前提 |
| GCT8 | 格子状制約・局所表・重み付き分配和：小格子を直接計算 | GCT7および必要な既存前提 |
| GCT9 | #P・FP・GapP：検証証明書と受理経路数 | GCT8および必要な既存前提 |
| GCT10 | parsimonious帰着・計数Turing帰着：SATと#SATの差 | GCT9および必要な既存前提 |
| GCT11 | #P完全性と0–1 permanent：Valiantの帰着の中核 | GCT10および必要な既存前提 |
| GCT12 | Ryserの包除公式と部分集合DP：指数上界を導出 | GCT11および必要な既存前提 |
| GCT13 | 多項式補間と重みの除去：体・ビット長・oracle回数の管理 | GCT12および必要な既存前提 |
| GCT14 | 有限群とCayleyグラフ：F₂上の上三角単位行列群の計算 | GCT13および必要な既存前提 |
| GCT15 | 重み付き有限オートマトン・テープ機械・受理runの総和 | GCT14および必要な既存前提 |
| GCT16 | 木プログラムの符号化と計算ネットワーク：状態・tally・計数の保存 | GCT15および必要な既存前提 |

## 3. 標準書・一次資料

Diestel, [Graph Theory, 6th ed.](https://link.springer.com/book/10.1007/978-3-662-70107-2)（基礎・マッチング・Hamilton閉路・木分解）；Arora–Barak, [Computational Complexity](https://users.cs.duke.edu/~reif/courses/complectures/books/AB/)（第17章）；Valiant, [The Complexity of Enumeration and Reliability Problems](https://doi.org/10.1137/0208032)；[The Complexity of Computing the Permanent](https://www.math.cmu.edu/users/af1p/Teaching/MCC17/Papers/permanent.pdf)。

関連: [VP/VNP横断履修ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [x] 初回実装時に本PLANを plans_progress に移し、系列manifestを全16講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。

進捗の正本: [GCT系列manifest](../dream-theater-series/GCT.yaml)。
