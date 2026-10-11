# DREAM THEATER 地下帝国・U2 確率ロボティクス：自己位置推定

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

具体的な応用目的を入口にして、既存数学の結果をどこで使い、何を計算できるようにするか。

## 直接必要な前提・PLAN間依存

- 確率論、条件付き分布、線形代数、状態空間モデル、Monte Carlo。
- 入口設計は[地下帝国の横断ルート](DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md)。他U科目を機械的に前提としない。

## 所有範囲

ローカライゼーション、Kalman/EKF、particle filter、SLAMへの応用。

## U2 確率ロボティクス：ロボットを迷子にしたくない

### Mission

移動にもセンサーにも誤差があるロボットに、自分がどこにいるか推定させたい。

### 最小モデル

$$
x_t=x_{t-1}+u_t+w_t,
\qquad
 y_t=x_t+v_t
$$

から始める。

### 地下へ降りる順序

1. Bayes localization
2. 線形Gaussian状態空間モデル
3. Kalman filter の予測・更新
4. 共分散更新の意味
5. 非線形観測と extended Kalman filter
6. Monte Carloによる particle filter
7. degeneracy と resampling
8. 2次元自己位置推定
9. optional basement：SLAM、data association、factor graph

### 既存教材との接続

- 条件付き分布・Bayes
- 多変量正規分布
- 状態空間モデル
- Monte Carlo
- 行列計算
- GIS・位置情報への応用

### 最低到達点

Kalman filterを公式暗記ではなく、**事前分布と観測尤度から事後分布を更新する操作**として説明できる。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
