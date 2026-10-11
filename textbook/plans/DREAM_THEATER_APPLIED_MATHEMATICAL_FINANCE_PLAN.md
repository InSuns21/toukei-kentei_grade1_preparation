# DREAM THEATER 地下帝国・U3 数理ファイナンス：価格付け・最適執行

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

具体的な応用目的を入口にして、既存数学の結果をどこで使い、何を計算できるようにするか。

## 直接必要な前提・PLAN間依存

- 確率過程、STO/SDE、Monte Carlo、最適制御/HJBは既存理論の該当箇所。
- 入口設計は[地下帝国の横断ルート](DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md)。他U科目を機械的に前提としない。

## 所有範囲

幾何Brown運動、リスク中立価格、価格付けと最適執行。

## U3 数理ファイナンス：不確実な価格をどう扱うか

### Mission

将来価格がランダムに動く資産のデリバティブ価格を求め、さらに大口注文をどう執行するか考える。

### 第1ルート：価格付け

離散時間の幾何Brown運動近似

$$
S_{t+\Delta t}
=
S_t\exp\left[
\left(\mu-\frac{\sigma^2}{2}\right)\Delta t
+\sigma\sqrt{\Delta t}Z_t
\right]
$$

から

$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t
$$

へ進む。

1. random walkからBrown運動へのスケーリング
2. 幾何Brown運動と対数正規分布
3. Monte Carlo option pricing
4. Monte Carlo標準誤差・信頼区間
5. European call と Black–Scholes の比較
6. Itô公式
7. リスク中立評価
8. optional basement：Girsanov、stochastic volatility

### 第2ルート：最適執行

$$
dX_t=-v_tdt
$$

を在庫、$v_t$ を売却速度とし、例えば

$$
E\left[
\int_0^T
\left(\eta v_t^2+\lambda X_t^2\right)dt
+\phi X_T^2
\right]
$$

を最小化する。

ここから

- stochastic control
- dynamic programming
- HJB equation
- optimal stopping

へ接続する。

ただし、HJB・viscosity solution・stochastic control・stochastic differential game の**理論正本は** DREAM_THEATER_OPTIMAL_CONTROL_DIFFERENTIAL_GAMES_PLAN.md とする。U3 は最適執行という金融応用に必要な範囲を参照して使い、DPP / HJB / Isaacs 理論を独立に再構築しない。

optional basement は、部分観測下の filtering + control、order book、最適制御・HJB・微分ゲーム計画で理論整備済みの場合の stochastic differential game 応用とする。

### 最低到達点

Brown運動・SDE・Monte Carlo・制御が「金融専用の公式」ではなく、既習の確率・推定・最適化の延長としてつながることを説明できる。

---

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
