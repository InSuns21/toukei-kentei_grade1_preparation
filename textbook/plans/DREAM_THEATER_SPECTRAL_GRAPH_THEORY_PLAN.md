# DREAM THEATER スペクトルグラフ理論 — 独立1セメスターPLAN

作成日: 2026-10-10  
状態: planned（PLAN 設計のみ）

## 0. 中心問い

グラフの組合せ構造が、Laplacian の固有値・固有ベクトル・random walk を通じてどこまで読めるのか。多様体学習のためだけの graph Laplacian 補講ではなく、**独立したスペクトルグラフ理論の1セメスター**とする。

## 1. 前提と正本境界

- 既存正本: LA の対称行列・Rayleigh quotient・スペクトル; 確率論の有限 Markov chain の基礎（未修なら本科目の必要部分で定義）。
- 本科目: weighted graph、combinatorial / normalized / random-walk Laplacian、Cheeger 型不等式、spectral partition、random walk と mixing、effective resistance、スペクトル摂動。
- GEO/幾何解析 PLAN: 滑らかな多様体・Laplace–Beltrami・熱核。
- **MFL1**: `n` 点の幾何データからグラフを構成した場合の連続 Laplace–Beltrami への近似、密度補正、bandwidth/boundary と標本揺らぎ。これらはグラフの純粋な数学的性質と混同せず、MFL1 側を正本とする。

## 2. 15週シラバス

| 週 | 内容・主証明 |
|---|---|
| 1 | 重み付きグラフ、隣接行列、次数、体積 |
| 2 | `L=D-A`、非負性、Dirichlet エネルギー |
| 3 | `L_{sym}=I-D^{-1/2}AD^{-1/2}` と固有値 |
| 4 | `L_{rw}=I-D^{-1}A`、定常分布、零次数への注意 |
| 5 | 連結成分、核の次元、スペクトル分解 |
| 6 | Rayleigh–Ritz、min–max、cut・conductance |
| 7 | Cheeger 不等式の片側評価 |
| 8 | Cheeger の逆向き評価、sweep cut |
| 9 | spectral clustering・ratio cut / normalized cut |
| 10 | random walk mixing・spectral gap |
| 11 | electrical network・effective resistance |
| 12 | Laplacian pseudoinverse と spanning tree の入口 |
| 13 | graph perturbation・Davis–Kahan 型安定性（既存 LA/FA の結果を参照） |
| 14 | random geometric graph の定義、標本構成と連続極限への橋 |
| 15 | manifold learning との境界確認・総合証明／計算 |

## 3. 最重要の区別

- graph Laplacian、normalized graph Laplacian、continuum Laplace–Beltrami は演算子が異なる。内積・正規化・境界条件・重みを固定する。
- `D^{-1/2}` や `D^{-1}` は孤立頂点で定義できない。零次数の除外または規約を明示する。
- Cheeger inequality の conductance の分母・固有値正規化による定数の違いを監査する。
- graph 上の random walk の mixing では連結性・非周期性（例: lazy walk）などの仮定を明示する。
- スペクトルクラスタリングで固有空間が得られることは、任意の真のクラスタが回復できることを保証しない。
- 点群の KNN グラフ構築 → manifold operator 近似は MFL1 の標本誤差定理へ引き渡す。

## 4. 代表例と完成条件

path, cycle, complete graph, 二つの clique を1辺でつないだ graph、weighted path を計算し、固有値・conductance・random walk を比較する。少なくとも Cheeger 型評価と graph Laplacian の Dirichlet 表現を証明し、有限 graph と連続 limit の主張を混同しない。

ID 候補 `SGT1`。実装前の chapter ID 競合確認、学習導線、演習詳細解答、独立数理監査、CI をもって完成とする。

参考範囲: Fan Chung, *Spectral Graph Theory*; Daniel Spielman, *Spectral and Algebraic Graph Theory*（公開講義ノート）; Ulrike von Luxburg, “A Tutorial on Spectral Clustering”.
