# DREAM THEATER 超局所解析・Hadamard条件 I（MICA1〜15）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- HPDE、Fourier解析、GPDE、調和解析の必要部分。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

## 所有範囲

波面集合、分布の積・引き戻し、特異性伝播、Hadamard状態。

### 3. 超局所解析・波面集合・Hadamard条件 I（MICA1–MICA15）

- **位置付け:** 厳密な曲がった時空QFTの発展基盤
- **前提:** HPDE、Fourier解析、GPDE、調和解析の必要部分（既存独立PLAN）
- **canonical ownership:** 波面集合、分布の積と引戻しの可否、特異性伝播、Hadamard条件の超局所的定式化を所有。実際の曲がった時空の物理状態・粒子観測はQCURV、CFTレプリカはQFT II。

- **第01週 MICA1**：分布の局所Fourier変換と滑らかさ
- **第02週 MICA2**：滑らかなcutoffと周波数方向への減衰
- **第03週 MICA3**：波面集合WF(u)の定義
- **第04週 MICA4**：δ分布・Heaviside関数・振動積分のWF計算
- **第05週 MICA5**：波面集合の座標変換と共変性
- **第06週 MICA6**：分布積が存在するためのHörmander条件
- **第07週 MICA7**：分布の部分多様体への引戻しと対角制限
- **第08週 MICA8**：擬微分作用素と主シンボルの入口
- **第09週 MICA9**：特性集合と双曲作用素
- **第10週 MICA10**：特異性伝播の定理：モデル証明と一般定理の仮定
- **第11週 MICA11**：Hadamard parametrixの局所特異構造
- **第12週 MICA12**：二点関数のHadamard条件と波面集合
- **第13週 MICA13**：点分離(point-splitting)と応力テンソル
- **第14週 MICA14**：局所共変な繰り込みと許容される有限項
- **第15週 MICA15**：局所模型の計算・証明範囲・正則化依存の総合演習

**必須の計算・証明ゲート**

1. δ分布の波面集合、分布積の成功例/失敗例をFourier解析から具体的に計算する
2. 二点関数を対角線に制限するとき必要になるWF条件を示す
3. Hadamard条件と有限な物理量の関係について「適切な状態の選択」と「繰り込み規約」を区別する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
