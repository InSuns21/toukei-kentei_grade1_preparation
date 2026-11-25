# DREAM THEATER テンソル理論・漸近スペクトル 計画

構成確定日: 2026-11-24 JST
状態: in progress（TSP1〜16実装、横断監査・公開導線確認が残る）
系列予約ID: TSP（実装時にmanifest/章ID衝突を再点検）
講数: **全16講**

## 1. 目的・前提・停止線

既存LA、AG1-01〜09・AG2-01〜03、COMB、ACOMP1–4（TSP後半はACOMP21–22） を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

物理のテンソル場や圏論のモノイダル構造を再講義しない。論文のcover/price/特殊な双対性は標準Strassen双対性そのものではなくVNP1–5で定義・証明する。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| TSP1 | 多重線形写像・テンソル積・基底表示と普遍性 | 上記の既存前提 |
| TSP2 | rank-one分解とtensor rank：行列rankとの差 | TSP1および必要な既存前提 |
| TSP3 | flatteningと部分空間のrank下界 | TSP2および必要な既存前提 |
| TSP4 | restriction・subrank・対角テンソルと局所線形写像 | TSP3および必要な既存前提 |
| TSP5 | 直和・Kronecker積・restriction preorder | TSP4、CAT1-02（前順序の定義） |
| TSP6 | テンソルネットワーク・縮約・wire：グラフの境界テンソル | TSP5および必要な既存前提 |
| TSP7 | 行列積テンソルと双線形複雑性 | TSP6および必要な既存前提 |
| TSP8 | border rank・Segre/secant：退化の具体計算 | TSP7および必要な既存前提 |
| TSP9 | 漸近rank・subrank・Fekete補題と指数 | TSP8および必要な既存前提 |
| TSP10 | 前順序付き可換半環と自然数の埋込み | TSP9および必要な既存前提 |
| TSP11 | スペクトル点：加法性・乗法性・単調性・正規化 | TSP10および必要な既存前提 |
| TSP12 | Strassen漸近スペクトル双対性：仮定・証明の骨格と例 | TSP11および必要な既存前提 |
| TSP13 | support functionals・entropyによるスペクトル評価 | TSP12および必要な既存前提 |
| TSP14 | 行列積指数と漸近スペクトル：既知の上下界の意味 | TSP13および必要な既存前提 |
| TSP15 | 多partyテンソル・partyの併合とpush-forward：標準restrictionとの比較 | TSP14および必要な既存前提 |
| TSP16 | 被覆・劣乗法的gauge・極限の準備：順序と凸性、一般スペクトルとの境界 | TSP15および必要な既存前提 |

## 3. 標準書・一次資料

Landsberg, [Tensors: Geometry and Applications](https://doi.org/10.1090/gsm/128)；[Geometry and Complexity Theory](https://www.cambridge.org/core/books/abs/geometry-and-complexity-theory/preface/13EB68870E2064973FE4805B496B6DF3)；Wigderson–Zuiddam, [Asymptotic spectra survey](https://doi.org/10.1090/bull/1880)；Christandl–Vrana–Zuiddam, [Universal points in the asymptotic spectrum of tensors](https://arxiv.org/abs/1709.07851)。

関連: [VP/VNP横断履修ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [x] 初回実装時に本PLANを plans_progress に移し、系列manifestを全16講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。
