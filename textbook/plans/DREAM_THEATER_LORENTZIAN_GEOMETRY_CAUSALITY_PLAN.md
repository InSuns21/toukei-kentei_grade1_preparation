# DREAM THEATER ローレンツ幾何と大域因果構造 I（LORG1〜15）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- GEO1〜19、線形代数、特殊相対論SRELの必要部分。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

## 所有範囲

Lorentz計量・因果曲線・大域双曲性・Cauchy超曲面。

### 1. ローレンツ幾何と大域因果構造 I（LORG1–LORG15）

- **位置付け:** 必須の数学基盤
- **前提:** GEO1–GEO19（多様体・接続・曲率）、線形代数、SRELのMinkowski時空概念（初回に必要部分を再定義）
- **canonical ownership:** Lorentz計量、因果集合、Cauchy超曲面、大域双曲性を数学として所有。Einstein方程式・物理的地平線・崩壊模型・時空解の解釈はGR I/II。

- **第01週 LORG1**：非退化対称双線形形式、符号数、ローレンツ計量
- **第02週 LORG2**：時間的・光的・空間的ベクトルと錐、時間向き
- **第03週 LORG3**：因果曲線、固有時、Lorentz長さの極値
- **第04週 LORG4**：Levi-Civita接続とLorentz測地線
- **第05週 LORG5**：法線座標と測地線方程式、局所的な因果錐
- **第06週 LORG6**：時系列集合I⁺/I⁻と因果集合J⁺/J⁻の定義
- **第07週 LORG7**：因果階層（chronology・causality・strong causality）
- **第08週 LORG8**：achronal集合・acausal集合・edgeの実例
- **第09週 LORG9**：領域依存 D(S) とCauchy horizonの基礎
- **第10週 LORG10**：Cauchy超曲面の定義・Minkowskiの具体例
- **第11週 LORG11**：大域双曲性・因果ダイヤモンドのコンパクト性
- **第12週 LORG12**：大域双曲時空の分割と時間関数（正確な定理の範囲）
- **第13週 LORG13**：光的測地線束・共役点・集束の幾何
- **第14週 LORG14**：準局所地平線と大域事象地平線の区別
- **第15週 LORG15**：因果図・反例・依存条件の総合演習

**必須の計算・証明ゲート**

1. 平坦Minkowski時空でI⁺(p), J⁺(p), D(S)を座標から計算する
2. 時間向きと因果曲線の接ベクトルの定義からLorentz長さを検算する
3. 大域双曲性を必要とする存在定理と、単なる局所計量の存在からは導けない主張を反例で分離する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
