# DREAM THEATER 統計的学習理論 I・II（SLT1・SLT2）

分冊: 2026-10-11  
状態: planned（科目固有の実装は未着手）

## 中心問いと直接依存

[ML1](DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)、確率論・測度論、[HDP](DREAM_THEATER_HIGH_DIMENSIONAL_PROBABILITY_PLAN.md)の集中不等式。SLT2でRMTを使う部分は必要講に限定。

**本科目の正本：** VC・Rademacher・汎化界、次に高次元・深層学習の条件付き理論。

### SLT1（15週）

| 週 | 主題 |
|---|---|
| 1 | risk・Bayes risk・excess risk |
| 2 | 学習可能性と PAC 定式化 |
| 3 | HDP の Hoeffding 型集中を有限仮説に適用 |
| 4 | 一様大数則、union bound と必要標本数 |
| 5 | shattering と VC 次元 |
| 6 | Sauer–Shelah 補題 |
| 7 | VC 型汎化誤差界 |
| 8 | covering number・epsilon-net の導入 |
| 9 | symmetrization・Rademacher 複雑度 |
| 10 | contraction・関数クラスの評価 |
| 11 | 正則化 ERM・oracle inequality |
| 12 | algorithmic stability・一様安定性 |
| 13 | PAC-Bayes の典型形と証明 |
| 14 | minimax 下界・Fano/Le Cam との接続 |
| 15 | lower/upper bound の仮定比較、総合証明 |

### SLT2（15週）

| 週 | 主題 |
|---|---|
| 1 | 高次元回帰とランク欠損 |
| 2 | 最小ノルム補間解・implicit bias |
| 3 | bias/variance と double descent の線形模型 |
| 4 | 非漸近ランダム行列評価への導線 |
| 5 | gradient flow とカーネル回帰 |
| 6 | 有限幅ネットワークの線形化 |
| 7 | NTK 極限の仮定・モデル |
| 8 | 無限幅ガウス過程と関数空間 |
| 9 | mean-field parameter distribution |
| 10 | Wasserstein/確率測度上の形式的勾配流の成立条件 |
| 11 | SGD の雑音モデルと SDE 近似の限界 |
| 12 | sharpness / flatness と再パラメータ化 |
| 13 | 情報論的・圧縮型汎化評価 |
| 14 | 分布外一般化と何が保証されないか |
| 15 | 既知の定理・模型依存の主張・未解決問題の分類 |

## 章別執筆・数理査読・完了判定

本PLANは設計段階であり、未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して直前完了章の追跡監査とともに記録する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
