# DREAM THEATER スペクトルグラフ理論 — 独立科目PLAN

作成日: 2026-10-10  
再設計: 2026-10-12  
状態: planned（PLAN 設計のみ）

## 0. 中心問い

グラフの組合せ構造が、Laplacian の固有値・固有ベクトル・random walk を通じてどこまで読めるのか。多様体学習のためだけの graph Laplacian 補講ではなく、**独立したスペクトルグラフ理論の科目**とする。

## 1. 前提と正本境界

- 既存正本: LA の対称行列・Rayleigh quotient・スペクトル; 確率論の有限 Markov chain の基礎（未修なら本科目の必要部分で定義）。
- 本科目: weighted graph、combinatorial / normalized / random-walk Laplacian、Cheeger 型不等式、spectral partition、random walk と mixing、effective resistance、スペクトル摂動。
- GEO/幾何解析 PLAN: 滑らかな多様体・Laplace–Beltrami・熱核。
- **MFL1**: `n` 点の幾何データからグラフを構成した場合の連続 Laplace–Beltrami への近似、密度補正、bandwidth/boundary と標本揺らぎ。これらはグラフの純粋な数学的性質と混同せず、MFL1 側を正本とする。

## 2. 証明のまとまりから章を設計する

次のA〜Fは**学習ブロック**であり、1ブロック＝1講・1章ではない。講数・週数を固定せず、グラフの具体計算・重要な定理の証明・反例・詳細解答が独習者に再現可能な単位で分割・統合する。

### A. 有限グラフのLaplacian

- 重み付きグラフ、隣接行列、次数、体積、cutの定義。
- 組合せLaplacian L=D-Aの半正定値性、Dirichletエネルギーの辺ごとの和による証明。
- 連結成分と核の次元、固有値分解をpath・cycle・complete graphで計算する。

### B. 正規化とrandom walk

- 対称正規化Laplacianとrandom-walk Laplacian、零次数の頂点における逆行列の定義域。
- 正規化固有値、重み付き内積、遷移確率、詳細釣合い、定常分布を結び付ける。
- Rayleigh–Ritz、min–max、スペクトルギャップを導く。

### C. CutとCheeger型不等式

- conductanceの定義と固有値の正規化を固定し、Cheeger型不等式の両方向を証明する。
- sweep cutを構成し、定数・次数・体積の条件を追う。

### D. 分割と摂動

- spectral clustering、ratio cut／normalized cut、固有ベクトルを使う緩和問題。
- graph perturbationとDavis–Kahan型安定性。固有値間隔を明示し、既存LA／FAを使う箇所にリンクする。
- 固有空間の推定と真のクラスタの回復を混同しない。

### E. 混合と電気ネットワーク

- random walk mixingをspectral gapから評価し、連結性・非周期性（必要ならlazy walk）を条件に含める。
- electrical network、effective resistance、Laplacian擬似逆とspanning treeの入口。weighted pathで検算する。

### F. 点群グラフと連続極限への橋

- random geometric graph・近傍グラフの構成、有限グラフのスペクトルとエネルギー。
- continuum Laplace–Beltramiへの近似や標本誤差の一般理論はMFL側に引き渡す。
- 二つのcliqueを一辺でつないだグラフなどで、conductance・固有値・mixingを横断して計算する。

## 3. 最重要の区別

- graph Laplacian、normalized graph Laplacian、continuum Laplace–Beltrami は演算子が異なる。内積・正規化・境界条件・重みを固定する。
- `D^{-1/2}` や `D^{-1}` は孤立頂点で定義できない。零次数の除外または規約を明示する。
- Cheeger inequality の conductance の分母・固有値正規化による定数の違いを監査する。
- graph 上の random walk の mixing では連結性・非周期性（例: lazy walk）などの仮定を明示する。
- スペクトルクラスタリングで固有空間が得られることは、任意の真のクラスタが回復できることを保証しない。
- 点群の KNN グラフ構築 → manifold operator 近似は MFL1 の標本誤差定理へ引き渡す。

## 4. 代表例と完成条件

path, cycle, complete graph, 二つの clique を1辺でつないだ graph、weighted path を計算し、固有値・conductance・random walk を比較する。少なくとも Cheeger 型評価と graph Laplacian の Dirichlet 表現を証明し、有限 graph と連続 limit の主張を混同しない。

正式なSGT系列の章IDと直接前提は実装時に確定する。各変更章に初出定義の直接例、主要証明、Level A 4題・B 3題・C 1題以上（理由付き例外を除く）の演習と全詳細解答を備える。主要証明と全演習を再計算し、別観点で再査読する。別の完了章の追跡監査は章ID指定の明示依頼がある場合のみ行う。chapter ID競合、knowledge DAG、参照リンク、学習導線、公開索引とCIを検証し、講数でなく学修目標の充足をもって完成とする。

参考範囲: Fan Chung, *Spectral Graph Theory*; Daniel Spielman, *Spectral and Algebraic Graph Theory*（公開講義ノート）; Ulrike von Luxburg, “A Tutorial on Spectral Clustering”.
