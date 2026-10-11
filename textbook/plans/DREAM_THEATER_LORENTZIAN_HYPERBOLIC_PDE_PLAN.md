# DREAM THEATER ローレンツ多様体上の双曲型PDE I（HPDE1〜15）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- LORGの因果構造、GPDE1〜10・FOU・EVOLの必要部分。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

## 所有範囲

Cauchy問題、エネルギー評価、有限伝播、retarded/advanced Green作用素。

### 2. ローレンツ多様体上の双曲型偏微分方程式 I（HPDE1–HPDE15）

- **位置付け:** 必須の数学基盤
- **前提:** LORG、GPDE1–GPDE10（超関数・Sobolev・弱解）、PDE I、EVOL（必要な節のみ）
- **canonical ownership:** ローレンツ多様体上の初期値問題、有限伝播、基本解、遅延/先進Green作用素を所有。粒子数・Bogoliubov係数・量子真空・Hawking放射はQCURV。

- **第01週 HPDE1**：試験関数と分布の多様体上の扱い
- **第02週 HPDE2**：ベクトル束・場の切断と微分作用素
- **第03週 HPDE3**：主シンボルと双曲性、normally hyperbolic作用素
- **第04週 HPDE4**：Minkowski波動方程式の基本解と支持
- **第05週 HPDE5**：初期データとCauchy問題、エネルギー積分
- **第06週 HPDE6**：エネルギー評価・解の一意性
- **第07週 HPDE7**：有限伝播速度と因果円錐
- **第08週 HPDE8**：局所Cauchy解の存在の枠組み
- **第09週 HPDE9**：大域双曲背景上の大域Cauchy問題
- **第10週 HPDE10**：遅延Green作用素G_retと支持制約
- **第11週 HPDE11**：先進Green作用素G_advと因果伝播子E
- **第12週 HPDE12**：Green作用素の一意性・恒等式・exact sequence
- **第13週 HPDE13**：Klein–Gordon方程式と保存電流
- **第14週 HPDE14**：解空間のシンプレクティック形式・CCRの前提
- **第15週 HPDE15**：Green作用素と物理的因果性の総合演習

**必須の計算・証明ゲート**

1. 平坦時空の波動方程式についてエネルギー恒等式から一意性と有限伝播を示す
2. Green作用素の定義域・値域と支持条件を明示して因果伝播子の基本恒等式を証明する
3. 大域双曲性を外した場合に先進/遅延問題がどう破綻し得るか反例を検討する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
