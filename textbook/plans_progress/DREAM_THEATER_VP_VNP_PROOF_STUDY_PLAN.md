# DREAM THEATER VP ≠ VNP 証明研究講読 計画

構成確定日: 2026-11-24 JST
状態: in progress（VNP1–4実装、VNP5–24予定）
系列予約ID: VNP（実装時にmanifest/章ID衝突を再点検）
講数: **全24講**

## 1. 目的・前提・停止線

GCT1–16、ACOMP1–24、TSP1–16、NPCG1–12、LVT第I・II部を前提とするFML1–7の対応箇所（下表の順で選択履修） を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

原論文A–G/O/Lは紙面の証明を再構成し、H.2(d,e)、I.1、J.3、N.4は著者が完全な正しさの根拠をLeanに委ねると明記しているため、Leanの補題・プログラム・サイズ証明を実際に追う。省略された箇所を完全証明済みとしない。flat/contractingは排他的とは示していない。cは全標数共通、m₀は標数依存・非有効。原論文の検証状態は公開時点の著者報告と第三者実行・専門家審査を別記。計画では再ビルド未実施。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| VNP1 | §1–3：主定理の量化、回路ゲート数、分離・近似分離と証拠台帳（ACOMP6–12,21–24） | 上記の既存前提 |
| VNP2 | A：多party tensor・wire・restriction・cover・push-forward（TSP4–6,15） | VNP1および必要な既存前提 |
| VNP3 | A：スペクトル点から擬距離とprice、回路を評価するLemma A.3（TSP9–11） | VNP2および必要な既存前提 |
| VNP4 | A：gaugeの最小化・冪の極限・双対性（A.5–A.6、TSP12,16） | VNP3および必要な既存前提 |
| VNP5 | A：priceの拡張・混合・fan（A.7–A.8、NPCG1–5） | VNP4および必要な既存前提 |
| VNP6 | B：crossing identity、二つの分割に対する項数、crossing inequality | VNP5および必要な既存前提 |
| VNP7 | C/O：CN不等式、priceのCAT(0)完備化（C.1,C.3,C.4、NPCG3–8） | VNP6および必要な既存前提 |
| VNP8 | D：F₂行列rank、transversal pair、平均D(r)の劣加法性 | VNP7および必要な既存前提 |
| VNP9 | D：等号解析とEuclid cube、flatまたはcontracting（D.2、NPCG6,12） | VNP8および必要な既存前提 |
| VNP10 | E：grid sums・clause sumsからpermanentへの射影（GCT7–13、ACOMP11） | VNP9および必要な既存前提 |
| VNP11 | E：完全ネットワーク・二つのhub・few-term lemmaとcut | VNP10および必要な既存前提 |
| VNP12 | E/L：Euclid hub長の節約、k・ℓの最適化とlog指数4/3（E.9–11） | VNP11および必要な既存前提 |
| VNP13 | F：unitriangular群のランク方向収縮と弱いPoincaré（GCT14、NPCG9–12） | VNP12および必要な既存前提 |
| VNP14 | F：overlapping windows・固定点集合の角度・一様Poincaré F.6 | VNP13および必要な既存前提 |
| VNP15 | G：Poincaréからrerouting laws、有限生成係数環、loadの評価（G.2） | VNP14および必要な既存前提 |
| VNP16 | H：F₂[s]/(s^{n+1})上SL群のtower・辺タイプ・coset | VNP15および必要な既存前提 |
| VNP17 | H：networkをthin treeの和へ、depth・packet・straight-line program（H.2） | VNP16および必要な既存前提 |
| VNP18 | I：重み付き木プログラム・universal tape automatonとnetwork化（I.1–2、GCT15–16） | VNP17および必要な既存前提 |
| VNP19 | J：computationの一回のcut、piece evaluatorと正しさ（J.2–3） | VNP18および必要な既存前提 |
| VNP20 | J：反復cut、時間・入力・piece数の指数台帳（J.4） | VNP19および必要な既存前提 |
| VNP21 | K：small circuitからaccelerator、定数名・低次数化・scale transferと対角線論法（K.7） | VNP20および必要な既存前提 |
| VNP22 | L/M：両caseの結合、全標数へのtransfer、HC grid gadget、VP≠VNP（M.3–4） | VNP21および必要な既存前提 |
| VNP23 | N：Laurent切断、近似few-term lemma・近似accelerator、VNP not⊆ closure(VP)（N.5） | VNP22および必要な既存前提 |
| VNP24 | P/Q：用語・全主要定理とLean対応、I.1/H.2(d,e)/J.3/N.4の監査、P vs NPへの限界（FML5–7） | VNP23および必要な既存前提 |

## 3. 標準書・一次資料

Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1)（2026-11-23）、[paper・Lean](https://github.com/anthropics/formal-math/tree/main/vp-vnp)、[Statement.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Statement.lean)、[Solution.lean](https://github.com/anthropics/formal-math/blob/main/vp-vnp/Solution.lean)、[comparator.json](https://github.com/anthropics/formal-math/blob/main/vp-vnp/comparator.json)。標準書はGCT/ACOMP/TSP/NPCG/FMLの各PLANを参照。

関連: [VP/VNP横断履修ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [x] 初回実装時に本PLANを plans_progress に移し、系列manifestを全24講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。
