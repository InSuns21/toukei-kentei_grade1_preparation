# DREAM THEATER 超局所解析・Hadamard条件 I（MICA系列・講数可変）

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

Riemann幾何や平坦な波動方程式では不足する、この科目固有の幾何・解析・代数は何か。

## 直接必要な前提・PLAN間依存

- HPDE、Fourier解析、GPDE、調和解析の必要部分。
- 経路：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)はHPDE・OA/VN/QINFからの発展分岐でありMICA全講の一律必修ではない。

**講数・ID方針（2026-10-12）**：本PLANの旧15週案は**15個の学習テーマを列挙した草案**であり、15講・15週を完成条件としない。下記の番号は候補IDで、1テーマを複数講に分ける／関連テーマを統合する／必要な補題・演習講を追加してよい。正式なchapter IDと全体講数は着手時に確定し、下流の参照も同時に更新する。証明の閉包と独習者の理解を優先する。

## 所有範囲

波面集合、分布の積・引き戻し、特異性伝播、Hadamard状態。**局所Hadamard二点関数の点分離と応力テンソルの繰り込み**は本PLANの責務。相互作用の時間順序積を衝突対角へ延長するEpstein–Glaser型の**摂動的くりこみの構成**は[MQFC II](DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)が独立正本であり、混同しない。

### 3. 超局所解析・波面集合・Hadamard条件 I（MICA1–MICA15：仮構成）

- **位置付け:** 厳密な曲がった時空QFTの発展基盤
- **前提:** HPDE、Fourier解析、GPDE、調和解析の必要部分（既存独立PLAN）
- **canonical ownership:** 波面集合、分布の積と引戻しの可否、特異性伝播、Hadamard条件の超局所的定式化を所有。実際の曲がった時空の物理状態・粒子観測はQCURV、CFTレプリカはQFT IV。

- **候補MICA1**：分布の局所Fourier変換と滑らかさ
- **候補MICA2**：滑らかなcutoffと周波数方向への減衰
- **候補MICA3**：波面集合WF(u)の定義
- **候補MICA4**：δ分布・Heaviside関数・振動積分のWF計算
- **候補MICA5**：波面集合の座標変換と共変性
- **候補MICA6**：分布積が存在するためのHörmander条件
- **候補MICA7**：分布の部分多様体への引戻しと対角制限
- **候補MICA8**：擬微分作用素と主シンボルの入口
- **候補MICA9**：特性集合と双曲作用素
- **候補MICA10**：特異性伝播の定理：モデル証明と一般定理の仮定
- **候補MICA11**：Hadamard parametrixの局所特異構造
- **候補MICA12**：二点関数のHadamard条件と波面集合
- **候補MICA13**：点分離(point-splitting)と応力テンソル
- **候補MICA14**：局所共変な繰り込みと許容される有限項
- **候補MICA15**：局所模型の計算・証明範囲・正則化依存の総合演習

**必須の計算・証明ゲート**

1. δ分布の波面集合、分布積の成功例/失敗例をFourier解析から具体的に計算する
2. 二点関数を対角線に制限するとき必要になるWF条件を示す
3. Hadamard条件と有限な物理量の関係について「適切な状態の選択」と「繰り込み規約」を区別する

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
