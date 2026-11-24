# DREAM THEATER 代数的計算複雑性理論 I・II 計画

構成確定日: 2026-11-24 JST
状態: planned（設計確定・本文未着手）
系列予約ID: ACOMP（実装時にmanifest/章ID衝突を再点検）
講数: **全24講**

## 1. 目的・前提・停止線

CPLX1–11・18–21、COMB1–3、AG1-01〜04、GCT1–13（後半のみ）、既存環・体・線形代数 を再利用する。既存の全科目の完成を一律必修としない。着手時に直接参照する章の本文・knowledge.yaml・定理anchorを照合する。

I=ACOMP1–12、II=ACOMP13–24。既存AGの環・体・射影幾何は引用する。determinantを一般VP完全と誤記しない。下界は制限モデルごとに仮定を検査。近似は数値許容誤差ではなく形式的退化。2026年claimはVNP系列に隔離。

## 2. 確定講義構成

| 予定章ID | 中心問い・証明責務 | prerequisite（科目内の順序） |
| --- | --- | --- |
| ACOMP1 | 形式多項式と多項式関数：有限体・Boolean cubeの反例 | 上記の既存前提 |
| ACOMP2 | 算術回路・straight-line program：加法・乗法・定数ゲート | ACOMP1および必要な既存前提 |
| ACOMP3 | 回路とformula・ABP：共有部分式とサイズ／深さ | ACOMP2および必要な既存前提 |
| ACOMP4 | 体の標数・拡大・定数モデル：単位コストとビット計算 | ACOMP3および必要な既存前提 |
| ACOMP5 | 斉次化・次数切断・形式次数と実次数 | ACOMP4および必要な既存前提 |
| ACOMP6 | 多項式族・VP・非一様性：量化順序とサイズ | ACOMP5および必要な既存前提 |
| ACOMP7 | VNP・Boolean和：VP包含と変数数・次数境界 | ACOMP6および必要な既存前提 |
| ACOMP8 | p-projectionとc-reduction：閉性と帰着の方向 | ACOMP7および必要な既存前提 |
| ACOMP9 | VNP完全性の証明枠組み：局所制約から多項式へ | ACOMP8および必要な既存前提 |
| ACOMP10 | determinantの多項式サイズ回路：除算不要のBerkowitz型構成 | ACOMP9および必要な既存前提 |
| ACOMP11 | permanentのVNP完全性：標数2以外のgadgetの符号検算 | ACOMP10および必要な既存前提 |
| ACOMP12 | Hamilton閉路多項式のVNP完全性：任意標数と特性2 | ACOMP11および必要な既存前提 |
| ACOMP13 | VF・VBP・VP・VNP：determinantの正しい完全性範囲 | ACOMP12および必要な既存前提 |
| ACOMP14 | 部分微分法・Baur–Strassen：回路微分のコスト | ACOMP13および必要な既存前提 |
| ACOMP15 | 深さ削減：VSBR型分割と次数・サイズのトレードオフ | ACOMP14および必要な既存前提 |
| ACOMP16 | 単調回路下界：打消しを許すモデルとの差 | ACOMP15および必要な既存前提 |
| ACOMP17 | 非可換ABPとNisan型ランク下界 | ACOMP16および必要な既存前提 |
| ACOMP18 | 制限付き可換回路：multilinear・bounded-depthの下界 | ACOMP17および必要な既存前提 |
| ACOMP19 | shifted partial derivatives：小さな多項式でランクを計算 | ACOMP18および必要な既存前提 |
| ACOMP20 | PIT・Schwartz–Zippel・derandomizationと下界の関係 | ACOMP19および必要な既存前提 |
| ACOMP21 | 形式冪級数・Laurent級数・付値：定数の極と係数の極限 | ACOMP20および必要な既存前提 |
| ACOMP22 | border complexity・退化・Zariski閉包：体と同値条件を区別 | ACOMP21および必要な既存前提 |
| ACOMP23 | GCTへの入口：軌道閉包・determinantal complexity・表現論の役割 | ACOMP22および必要な既存前提 |
| ACOMP24 | Boolean P vs NP・P/poly・#Pとの条件付き含意、既知の証明障壁と総合演習 | ACOMP23および必要な既存前提 |

## 3. 標準書・一次資料

Bürgisser–Clausen–Shokrollahi, [Algebraic Complexity Theory](https://link.springer.com/book/10.1007/978-3-662-03338-8)；Bürgisser, [Completeness and Reduction in Algebraic Complexity Theory](https://link.springer.com/book/10.1007/978-3-662-04179-6)；Shpilka–Yehudayoff, [Arithmetic Circuits](https://doi.org/10.1561/0400000039)；[IISc lecture outline](https://www.csa.iisc.ac.in/~chandan/courses/act25/home.html)；[Valiant 1979](https://sites.math.washington.edu/~billey/colombia/references/valiant.completeness.1979.pdf)。

関連: [VP/VNP横断履修ルート](DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)。各書の目次と公開された研究資料を設計基準にし、本文を転載しない。

## 4. 完成条件

- [ ] 初回実装時に本PLANを plans_progress に移し、系列manifestを全24講の予定IDで整備する。未実装章の公開目次先行登録はしない。
- [ ] 各講で主要定義を使用前に導入し、定理の仮定・定義域・量化・中間計算を明示。直接例と反例を含め、主要証明を再構成可能にする。
- [ ] 原則 Level A 4題・B 3題・C 1題以上と詳細解答。単なる題数合わせはしない。
- [ ] chapter.yaml・knowledge.yaml・prerequisite・stable anchor・KaTeX・concept/knowledge/exercise/Pages検証を完了する。
- [ ] 研究claimは証明artifact・statement matching・kernel・独立人間検証・出版を分離し、未確認のものを無条件の正本定理にしない。
- [ ] 横断監査・公開導線完了後に plan_done に移す。
