# DREAM THEATER 地下帝国・U6 量子状態推定

作成・分冊: 2026-10-11  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問い

具体的な応用目的を入口にして、既存数学の結果をどこで使い、何を計算できるようにするか。

## 直接必要な前提・PLAN間依存

- 量子力学QM1〜8、確率統計・MLE・Fisher情報、既存情報幾何の必要部分。
- 入口設計は[地下帝国の横断ルート](DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md)。他U科目を機械的に前提としない。

## 所有範囲

qubit測定、密度行列、POVM、量子状態トモグラフィ。

## U6 量子統計：量子状態を観測から推定したい

### Mission

量子力学を一冊学び直すことを入口にせず、**観測結果から未知の量子状態・量子パラメータを推定する**問題として統計学から入る。

### 最初の例

qubit

$$
|\psi\rangle
=
\cos\frac{\theta}{2}|0\rangle
+
\sin\frac{\theta}{2}|1\rangle
$$

を繰り返し測定すると、測定結果は二項モデルとして扱える。

ここから

1. Born rule と測定確率
2. 二項尤度
3. MLE
4. Fisher情報量
5. Cramér–Rao lower bound
6. 複素内積空間・Hermitian / unitary operator の最小補講
7. density matrix

$$
\rho
=
\frac12\left(I+\mathbf r\cdot\boldsymbol\sigma\right)
$$

8. quantum state tomography
9. POVM
10. quantum Fisher information
11. quantum Cramér–Rao bound

へ進む。

### 境界線

Schrödinger方程式、量子力学の全体系、場の量子論を本系列の必須前提にはしない。

必要に応じて

- 複素ベクトル空間
- Hermitian / unitary 行列
- スペクトル定理
- tensor product
- operator

を最小限補う。量子力学そのものの講義へ膨張した場合は別系列へ分離する。

### 最低到達点

古典統計の「未知分布・未知母数を観測から推定する」という発想が、量子測定ではどこまでそのまま使え、どこから測定設計・非可換性という新しい問題が加わるか説明できる。

---

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読と直前完了章の追跡監査を行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。
