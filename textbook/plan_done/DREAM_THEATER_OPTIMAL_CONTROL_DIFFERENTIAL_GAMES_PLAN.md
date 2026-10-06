# DREAM THEATER 最適制御・HJB・微分ゲーム計画

作成日: 2026-10-04  
状態: completed

## 0. 目的

本計画は、古典 Hamilton--Jacobi 方程式、動的計画法、Hamilton--Jacobi--Bellman 方程式、粘性解、微分ゲーム、確率制御、確率微分ゲームを一つの学習線へ整理する設計台帳である。

中心となる問いは

> **時間発展する系を最適に操作したいとき、あるいは相手も最適に応答するとき、その意思決定問題をどの PDE で表し、値関数が滑らかでない場合に何を「解」と呼ぶのか。**

である。

既存の PDE12 は古典 Hamilton--Jacobi 方程式と特性曲線・焦散までを正本化する。本計画は、その先で

~~~text
PDE12 古典 Hamilton--Jacobi
        ↓
最適制御・動的計画原理
        ↓
HJB
        ↓
粘性解
        ↓
値関数 = HJB の粘性解
        ├── 微分ゲーム → HJI / Isaacs
        └── 確率制御 → 二階 HJB
                         ↓
              確率微分ゲーム → 二階 HJI
~~~

という接続を閉じる。

---

## 1. canonical owner と責務分担

| 領域 | canonical owner |
|---|---|
| 古典 Hamilton--Jacobi・特性曲線・焦散 | PDE12 |
| SDE | STO9 |
| Markov generator・Dynkin・Feynman--Kac | STO11 |
| 決定論的最適制御・DPP・HJB | 本計画 |
| 粘性解（viscosity solution） | 本計画 |
| 決定論的微分ゲーム・HJI | 本計画 |
| 確率制御・二階 HJB | 本計画 |
| 確率微分ゲーム・二階 HJI | 本計画 |
| 金融の最適執行 | DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md U3 |
| 静学ゲーム・反復ゲーム・Bayesian game | 既存 GAME 系列 |

応用 PLAN では HJB・粘性解・Isaacs 理論を再実装せず、本計画の結果を参照する。

---

## 2. prerequisite 方針

決定論的部分と確率部分を分ける。

### 2.1 HJC1--HJC4

主要候補:

- PDE12: Hamilton--Jacobi 方程式・特性曲線
- ODE 系列: 常微分方程式の存在一意性・流れ
- 実解析: 連続性・局所 Lipschitz・Taylor 展開
- GAME 系列: minimax と零和ゲームの基本語彙を使う節だけ

微分ゲームを学ぶためだけに確率解析を prerequisite にしない。

### 2.2 HJC5--HJC6

追加候補:

- STO9: SDE
- STO11: Markov 過程・生成作用素・Feynman--Kac
- 必要な節だけ stochastic integral / Itô formula

TSA6 の Kalman filter、Girsanov、martingale representation は、実際に使用する節が生じた場合だけ直接依存にする。

---

## 3. コース構成

章 ID は HJC1--HJC6 で確定済みであり、実装開始時に既存 ID と衝突しないことを確認した。

### HJC1 決定論的最適制御・動的計画原理・HJB の導出

代表形

$$
\dot x(s)=f(x(s),u(s)),
\qquad
J_{t,x}(u)=g(x(T))+\int_t^T L(x(s),u(s))\,ds
$$

から始める。

扱う内容:

- 制御付き ODE
- admissible control
- running cost / terminal cost
- value function
- Bellman の最適性原理
- dynamic programming principle
- 短時間区間 $[t,t+h]$ に分ける理由
- Hamiltonian
- HJB equation の形式導出
- smooth value function に対する verification theorem
- LQR と bang-bang 型の最小例
- Pontryagin 最大原理との役割差への橋

中心は「HJB を公式として提示する」ことではなく、DPP から時間微分・状態微分・最適化がどう現れるかを追うことである。

### HJC2 粘性解：比較原理を残して微分可能性を捨てる

古典解が壊れる最小例から始める。

扱う内容:

- viscosity subsolution / supersolution
- smooth test function による上接触・下接触
- 古典解との整合性
- 最大・最小での接触不等式
- 一様極限に対する安定性
- comparison principle
- uniqueness
- Perron method
- terminal / boundary condition

導入順は

~~~text
古典解が壊れる
   ↓
distributional 弱解では保持したい comparison 構造を直接表しにくい
   ↓
接触する滑らかな試験関数だけで不等式を読む
   ↓
粘性解
   ↓
comparison による一意性
~~~

とする。

### HJC3 HJB を値関数の方程式として正本化

HJC1 の形式導出と HJC2 の解概念を合流させる。

扱う内容:

- value function の連続性
- DPP から viscosity subsolution を導く
- DPP から viscosity supersolution を導く
- comparison theorem
- value function が一意な粘性解になること
- smooth case の verification theorem との整合
- exit-time / state constraint は発展扱い

完成点は

$$
\text{dynamic programming}
\Longleftrightarrow
\text{HJB in viscosity sense}
$$

を読者が論理の両側から追えることとする。

### HJC4 決定論的微分ゲーム・Hamilton--Jacobi--Isaacs

二人零和ゲームを標準モデルとする。

$$
\dot x=f(x,u,v),
\qquad
J_{t,x}(u,v)
$$

を用いて、

- pursuit--evasion の最小具体例
- control と strategy の違い
- nonanticipative strategy
- lower value / upper value
- game の DPP
- lower / upper Hamiltonian
- lower / upper HJI equation
- Isaacs condition
- $\sup_v\inf_u H=\inf_u\sup_v H$ の意味
- game value の存在
- HJI の粘性解
- 非ゼロ和微分ゲームとの境界

を扱う。

「最適制御に相手を一人追加しただけ」と説明せず、inf / sup の順序と情報構造を局所的に確認する。

### HJC5 確率制御・二階 HJB

代表形

$$
dX_s=b(X_s,u_s)\,ds+\sigma(X_s,u_s)\,dW_s
$$

から始める。

扱う内容:

- controlled diffusion
- stochastic DPP
- Itô formula
- generator
- second-order HJB
- smooth verification theorem
- 値関数の粘性解としての特徴付け
- degenerate elliptic / parabolic PDE
- Feynman--Kac が線形 PDE に対応し、HJB が最適化を含む非線形 PDE になる違い

確率性が

1. 状態方程式
2. Itô の二次変分
3. 二階項
4. 条件付き期待値を用いる DPP

のどこへ入るかを分離して説明する。

### HJC6 確率微分ゲーム・二階 Isaacs 方程式

HJC4 と HJC5 を合流させる。

$$
dX_s=b(X_s,u_s,v_s)\,ds
+\sigma(X_s,u_s,v_s)\,dW_s
$$

を基準形として、

- zero-sum stochastic differential game
- lower / upper stochastic value
- stochastic nonanticipative strategy
- stochastic DPP
- second-order lower / upper Isaacs equation
- stochastic Isaacs condition
- 粘性解による value characterization
- 最悪外乱を第二プレイヤーとみなす robust-control viewpoint

を扱う。

最終的に

~~~text
決定論的制御        → HJB
決定論的ゲーム      → HJI
確率制御            → 二階 HJB
確率微分ゲーム      → 二階 HJI
~~~

を同じ原理から再構成できる状態を目標とする。

---

## 4. 本計画に含めないもの

以下は重要だが、本計画の必須完成条件には含めない。

- 非ゼロ和微分ゲームの一般論
- mean field game
- mean field control
- 部分観測確率制御
- filtering + control の一般 separation principle
- jump / Lévy differential game
- path-dependent HJB
- functional Itô calculus
- stochastic target problem
- risk-sensitive control の体系
- $H^\infty$ 制御の体系
- optimal stopping / obstacle problem の完全系列

必要になった場合は別計画へ分け、本計画の HJB / viscosity / Isaacs を canonical dependency とする。

---

## 5. 証明責務

少なくとも次を「標準的」で飛ばさない。

- DPP から HJB を導く短時間展開。
- viscosity sub / supersolution の接触不等式。
- 古典解なら粘性解になること。
- comparison principle の主要機構。
- DPP から値関数が viscosity solution になる局所証明。
- lower / upper value から lower / upper HJI が分かれる理由。
- Isaacs condition がどの二つの Hamiltonian を一致させるか。
- 確率制御で Itô formula から二階項が現れる計算。

game value の存在、optimal control の存在、optimal strategy の存在を同一視しない。

---

## 6. 直接例

最低限、次を各段階で使う。

- 一次元有限時間 LQR
- bang-bang control
- Eikonal / time-optimal control の最小例
- 一次元の非滑らかな value function
- pursuit--evasion
- 線形 Gaussian controlled diffusion
- 最悪外乱を第二プレイヤーとした robust-control 型例

数式だけでモデルを始めず、$x,u,v$ が何を表すかを通常文で先に説明する。

---

## 7. 演習設計

各章は DREAM THEATER 標準どおり、理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。

特に演習で実際に使わせるもの:

- DPP の時間分割
- HJB の導出
- test function による粘性解判定
- comparison の適用条件
- lower / upper Hamiltonian の計算
- Isaacs condition の検証
- controlled diffusion の generator
- second-order HJB / HJI の導出

---

## 8. 実装順

~~~text
HJC1 決定論的最適制御・DPP
  ↓
HJC2 粘性解
  ↓
HJC3 HJB value characterization
  ├──→ HJC4 微分ゲーム・HJI
  └──→ HJC5 確率制御・二階 HJB
              ↓
        HJC6 確率微分ゲーム・二階 HJI
~~~

HJC1--HJC4 は確率解析の完了を待たない。HJC5--HJC6 で初めて STO9 / STO11 を主要 prerequisite とする。

---

## 9. 関連 PLAN との接続

- DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md: 最適執行は本計画の確率制御を使う応用。
- DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md: manifold-valued controlled diffusion が必要になった場合の発展先。
- DREAM_THEATER_NONLINEAR_PDE_PLAN.md: 粘性解以外の entropy / monotone / nonlinear diffusion はそちらの正本。
- 完了済み DREAM_THEATER_EVOLUTION_EQUATIONS_SEMIGROUP_PLAN.md: 閉作用素・半群・抽象発展方程式・半線形発展方程式の正本。

---

## 10. 完成条件

- HJB が DPP から出ることを式変形込みで再構成できる。
- 粘性解の sub / super 判定を具体例で行える。
- 値関数と HJB の粘性解がどう結びつくか説明できる。
- 微分ゲームで lower / upper value が分かれる理由を説明できる。
- Isaacs condition の意味を inf / sup の順序から説明できる。
- 確率制御で二階 HJB が生じる理由を Itô formula から追える。
- 確率微分ゲームで二階 HJI へ進む接続を再構成できる。
