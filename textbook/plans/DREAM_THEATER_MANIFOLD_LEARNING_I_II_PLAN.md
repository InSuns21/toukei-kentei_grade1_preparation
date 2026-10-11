# DREAM THEATER 多様体学習 I・幾何的深層学習 II（MFL1・MFL2）

分冊: 2026-10-11  
状態: planned（科目固有の実装は未着手）

## 中心問いと直接依存

MFL1は[SGT](DREAM_THEATER_SPECTRAL_GRAPH_THEORY_PLAN.md)、GEOの必要部分。MFL2で群作用・表現とMFL1の先行講を利用。

**本科目の正本：** 点群からのLaplacian近似・内在次元、さらに等変・幾何的深層学習。

### MFL1（15週）

| 週 | 主題 |
|---|---|
| 1 | 高次元観測と内在次元：多様体仮説の定式化 |
| 2 | 埋め込み、局所座標、接空間 |
| 3 | reach・曲率・標本ノイズ・仮説の破綻例 |
| 4 | 局所 PCA と tangent estimation |
| 5 | 近傍グラフ・距離の歪み |
| 6 | Isomap と測地距離 |
| 7 | 局所線形埋め込み・識別不能性 |
| 8 | SGT の graph Laplacian・random walk を適用 |
| 9 | Laplace–Beltrami と熱半群 |
| 10 | diffusion maps と密度補正 |
| 11 | 離散 Laplacian の整合性の仮定 |
| 12 | スペクトル収束の証明模型 |
| 13 | 内在次元・曲率・ノイズの推定 |
| 14 | t-SNE・UMAP を幾何学的同型と取り違えない |
| 15 | manifold / near-manifold / stratified data のモデル比較 |

### MFL2 — 幾何的深層学習

1–3週: 群作用、表現、軌道・安定化群、等変性。  
4–6週: 畳み込みの対称性、群畳み込み、Fourier / Peter–Weyl の有限例。  
7–9週: グラフ message passing、表現力、Graph Laplacian、oversmoothing。  
10–12週: 多様体上の場、座標変換、接束と gauge-equivariant モデル。  
13–15週: E(n)/SE(3) 同変モデル、物理データ、対称性違反の数値実験。

## 章別執筆・数理査読・完了判定

本PLANは設計段階であり、未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して直前完了章の追跡監査とともに記録する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
