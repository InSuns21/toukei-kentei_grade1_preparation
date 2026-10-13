# DREAM THEATER 代数的量子場理論・モジュラー理論 I（AQFT系列・講数可変）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- OA/VN作用素環、QM、量子情報QINF、HPDE。MICAは曲がった時空へ拡張する章で参照。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

**講数・ID方針（2026-10-12）**：本PLANの旧15週案は**15個の学習テーマを列挙した草案**であり、15講・15週を完成条件としない。下記の番号は候補IDで、1テーマを複数講に分ける／関連テーマを統合する／必要な補題・演習講を追加してよい。正式なchapter IDと全体講数は着手時に確定し、下流の参照も同時に更新する。証明の閉包と独習者の理解を優先する。

## 所有範囲

局所代数net、CCR、Type III因子、Tomita–Takesaki、相対エントロピー。**Wightman／Schwinger／OSの再構成と構成的相互作用模型、Epstein–Glaserくりこみ**は[MQFC I/II](DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)が数学的構成の正本。局所環netとその表現・モジュラー理論の本PLANと責務を重複させない。

### 4. 代数的量子場理論・モジュラー理論 I（AQFT1–AQFT15：仮構成）

- **位置付け:** ブラックホール情報の研究入門を支える発展基盤
- **前提:** OA1–OA6、VN1–VN7、QM1–QM8、QINF、HPDE。MICAは曲がった時空へ拡張する章で参照
- **canonical ownership:** 観測量の局所環、Weyl代数、GNS、Type III/テンソル分解の問題、モジュラー作用素と相対エントロピーを数学として所有。重力双対・island・Page曲線はHOLO/BHI。

- **候補AQFT1**：局所可観測量と領域に添えた代数net
- **候補AQFT2**：isotony・Einstein局所性・共変性
- **候補AQFT3**：線形場のシンプレクティック空間とWeyl代数
- **候補AQFT4**：CCRと代数上の状態
- **候補AQFT5**：GNS表現と表現の非一意性
- **候補AQFT6**：局所von Neumann環の構成
- **候補AQFT7**：Reeh–Schlieder性：正しい条件と典型モデル
- **候補AQFT8**：Type I・II・III因子と有限次元モデルの限界
- **候補AQFT9**：局所環のType III性を示すために必要な仮定
- **候補AQFT10**：標準形の巡回分離ベクトルとTomita作用素
- **候補AQFT11**：極分解S=JΔ^{1/2}とモジュラー流
- **候補AQFT12**：Tomita–Takesaki定理の主要結論・有限次元例
- **候補AQFT13**：Araki相対エントロピーの定義と有限次元への帰着
- **候補AQFT14**：Bisognano–WichmannとRindler wedgeの特別な幾何学的流れ
- **候補AQFT15**：split property、領域のテンソル分解、情報問題への総合接続

**必須の計算・証明ゲート**

1. 有限次元行列環でGNS・モジュラー流・相対エントロピーを直接計算する
2. 局所性の公理とType IIIの性質を区別し「すべてのQFT局所環は自動的にType III」と断言しない
3. 無限次元Tomita–TakesakiやReeh–Schliederを主張する場合、適用条件と証明済部分/参照定理を明記する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
