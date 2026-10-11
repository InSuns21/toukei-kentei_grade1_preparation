# DREAM THEATER 代数的量子場理論・モジュラー理論 I（AQFT1〜15）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- OA/VN作用素環、QM、量子情報QINF、HPDE。MICAは曲がった時空へ拡張する章で参照。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

## 所有範囲

局所代数net、CCR、Type III因子、Tomita–Takesaki、相対エントロピー。

### 4. 代数的量子場理論・モジュラー理論 I（AQFT1–AQFT15）

- **位置付け:** ブラックホール情報の研究入門を支える発展基盤
- **前提:** OA1–OA6、VN1–VN7、QM1–QM8、QINF、HPDE。MICAは曲がった時空へ拡張する章で参照
- **canonical ownership:** 観測量の局所環、Weyl代数、GNS、Type III/テンソル分解の問題、モジュラー作用素と相対エントロピーを数学として所有。重力双対・island・Page曲線はHOLO/BHI。

- **第01週 AQFT1**：局所可観測量と領域に添えた代数net
- **第02週 AQFT2**：isotony・Einstein局所性・共変性
- **第03週 AQFT3**：線形場のシンプレクティック空間とWeyl代数
- **第04週 AQFT4**：CCRと代数上の状態
- **第05週 AQFT5**：GNS表現と表現の非一意性
- **第06週 AQFT6**：局所von Neumann環の構成
- **第07週 AQFT7**：Reeh–Schlieder性：正しい条件と典型モデル
- **第08週 AQFT8**：Type I・II・III因子と有限次元モデルの限界
- **第09週 AQFT9**：局所環のType III性を示すために必要な仮定
- **第10週 AQFT10**：標準形の巡回分離ベクトルとTomita作用素
- **第11週 AQFT11**：極分解S=JΔ^{1/2}とモジュラー流
- **第12週 AQFT12**：Tomita–Takesaki定理の主要結論・有限次元例
- **第13週 AQFT13**：Araki相対エントロピーの定義と有限次元への帰着
- **第14週 AQFT14**：Bisognano–WichmannとRindler wedgeの特別な幾何学的流れ
- **第15週 AQFT15**：split property、領域のテンソル分解、情報問題への総合接続

**必須の計算・証明ゲート**

1. 有限次元行列環でGNS・モジュラー流・相対エントロピーを直接計算する
2. 局所性の公理とType IIIの性質を区別し「すべてのQFT局所環は自動的にType III」と断言しない
3. 無限次元Tomita–TakesakiやReeh–Schliederを主張する場合、適用条件と証明済部分/参照定理を明記する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
