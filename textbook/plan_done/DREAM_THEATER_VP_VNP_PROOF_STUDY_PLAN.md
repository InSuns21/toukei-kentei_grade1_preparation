# DREAM THEATER VP ≠ VNP 証明研究講読 計画

構成確定日: 2026-11-24 JST
状態: completed（全24講の教材実装・系列横断確認・公開導線整備）
完了確認日: 2026-11-28 JST
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
- [x] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [x] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [x] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [x] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [x] 横断監査・公開導線完了後に plan_done に移す。

## 5. 最終講の照合記録

VNP24では付録Qの番号付き命題一覧と公開ソース（固定版 `db8472ee0fe3ebea21765160a6e3a04f5eaba4c5`）を対応させ、H.2(d,e)、I.1、J.3、N.4について形式化の契約・主要補助命題とサイズ評価を講義に収録した。Statement / Solution / Challenge / Comparator の構成を確認した。独立したLean再ビルド・全内部命令の再査読・専門家審査は未実施であり、著者の検査報告と分ける。教材としての最終系列確認は次節に記録する。

## 6. 系列横断完了確認（2026-11-28）

対象は VNP1–24 の教材。各講の数学的査読は既にマージされた執筆・追跡監査PRの記録を再利用し、現行本文の演習・formal/proof・章ID・公開目次と照合した。VNP21 は区分Cの執筆時全件査読と追補査読を採用（追跡監査を別途実施したとはしない）。VNP24 は本完了作業で追加追跡監査・局所修正を行った。すべてを改めて独立再証明したという意味ではない。

| 講 | A/B/C | formal / proof | 既存のマージ済み査読記録 |
| --- | --- | --- | --- |
| VNP1 | 4/4/1 | 4 / 3 | [#4796](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4796) |
| VNP2 | 4/3/1 | 10 / 6 | [#4803](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4803) |
| VNP3 | 4/3/1 | 9 / 6 | [#4812](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4812) |
| VNP4 | 4/3/1 | 7 / 4 | [#4819](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4819) |
| VNP5 | 4/3/1 | 6 / 4 | [#4830](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4830) |
| VNP6 | 4/3/1 | 7 / 5 | [#4837](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4837) |
| VNP7 | 4/4/1 | 5 / 4 | [#4845](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4845) |
| VNP8 | 4/3/1 | 6 / 4 | [#4851](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4851) |
| VNP9 | 4/3/1 | 8 / 6 | [#4859](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4859) |
| VNP10 | 4/4/1 | 6 / 4 | [#4867](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4867) |
| VNP11 | 4/4/1 | 6 / 5 | [#4878](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4878) |
| VNP12 | 4/4/1 | 8 / 7 | [#4884](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4884) |
| VNP13 | 4/3/1 | 7 / 5 | [#4897](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4897) |
| VNP14 | 4/3/1 | 5 / 4 | [#4903](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4903) |
| VNP15 | 5/4/1 | 4 / 2 | [#4908](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4908) |
| VNP16 | 4/4/1 | 7 / 3 | [#4922](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4922) |
| VNP17 | 4/3/1 | 7 / 3 | [#4924](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4924) |
| VNP18 | 4/3/1 | 6 / 2 | [#4932](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4932) |
| VNP19 | 4/3/1 | 6 / 4 | [#4941](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4941) |
| VNP20 | 4/3/1 | 3 / 3 | [#4952](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4952) |
| VNP21 | 4/4/1 | 6 / 5 | [#4954](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4954) |
| VNP22 | 4/5/1 | 9 / 8 | [#4969](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4969) |
| VNP23 | 5/4/2 | 13 / 10 | [#4979](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4979) |
| VNP24 | 4/4/2 | 1 / 1 | [#4980](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/4980) |

合計：A98/B84/C26、208題・詳細解答208件。formal 156件・proof 108件（表示ブロック数であり、定理の完全性を数だけで判定しない）。全24章が manifest で completed、科目別目次に全章リンク、各章の index.md / chapter.yaml / knowledge.yaml の実在を確認。本文では解答開始・終了が全章で一致し、単独のドル記号行なし。基点 19cda83a6c0e388b30b5b82f5fc2e45d7d305cfb の [全教材検証](https://github.com/InSuns21/toukei-kentei_grade1_preparation/actions/runs/46107340508) は構造・DAG・数学・正式定理参照・定義例・公開目次等で成功、[Pages deploy](https://github.com/InSuns21/toukei-kentei_grade1_preparation/actions/runs/46107340510) 成功。移動と局所修正を含むPRでも必須検証を行う。

横断の論理接続：VNP1の全ゲート数・量化 → VNP2–9の被覆型スペクトル点、price、CAT(0)、少なくとも一方の平坦/収縮仮説 → VNP10–12の格子和・平坦側下界、およびVNP13–21の再配線・木・分割・加速器不存在 → VNP22の同標数移送とHCの全標数下界（PERMは標数2を除く）→ VNP23のLaurent近似・定数項抽出・近似下界 → VNP24の固定版の声明・証拠の読み方。全標数共通の c と標数別 m₀、厳密/近似、算術/Boolean を区別する。VNP24の係数は形式冪級数であり、有限多項式と混同しない。H.2/I.1/J.3/N.4 のプログラム契約と数学的導出の境界はVNP17–24の本文・既存査読記録に記載。外部Lean再ビルド・全内部命令の独立査読・専門家検証・出版確認は実施しておらず、教材PLAN完了と外部研究claimの独立検証は別である。公開ブラウザの全ページ目視は未実施。今回の系列確認担当はChatGPT。
