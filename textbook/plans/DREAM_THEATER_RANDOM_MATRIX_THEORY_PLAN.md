# DREAM THEATER ランダム行列理論 — 独立1セメスターPLAN

作成日: 2026-10-10  
状態: planned（発展数学・PLAN 設計のみ）

## 0. 中心問い

行列のサイズが大きくなったとき、固有値分布・特異値・スペクトル端がどのような法則に従うのか。**高次元確率の非漸近集中評価とは異なる「極限スペクトルの数学」を主役**にした独立科目とする。

高次元線形回帰、random features、double descent を考える SLT2 のために、ランダム行列分布の結果を都合よく抜き書きするだけの補講にはしない。

## 1. 正本境界・前提

- 線形代数 LA: 特性多項式、スペクトル分解、SVD、トレース、作用素ノルム。
- 確率・測度論: 独立性、収束、特性関数、弱収束、優収束、積分。
- HDP: sub-Gaussian、集中、標本共分散の非漸近界。
- RMT: 経験スペクトル測度、moment method、Stieltjes transform / resolvent、Wigner 半円則、sample covariance と Marčenko–Pastur 則。
- SLT2: 上記の法則を具体的な学習模型の汎化・予測誤差に適用する。

## 2. 15週シラバス

| 週 | 内容 |
|---|---|
| 1 | ランダム行列の代表模型、Wigner / Wishart 型行列 |
| 2 | empirical spectral distribution、確率測度の弱収束 |
| 3 | Wigner 行列の scaling と trace moment |
| 4 | 閉路の組合せと Catalan 数 |
| 5 | semicircle law の moment proof（仮定固定） |
| 6 | tightness・moment convergence の適用条件 |
| 7 | resolvent、Stieltjes transform、反転の考え方 |
| 8 | resolvent identity と concentration の接続 |
| 9 | Gram 行列・sample covariance と非零固有値 |
| 10 | aspect ratio と Marčenko–Pastur 分布 |
| 11 | MP law の証明骨格：moments または resolvent の選択 |
| 12 | spectrum edge、作用素ノルム、Bai–Yin 型結果の位置づけ |
| 13 | low-rank perturbation・spiked covariance・BBP 相転移の入口 |
| 14 | ridgeless regression / ridge の確率模型への適用 |
| 15 | 有限標本との比較・仮定の監査・総合証明 |

## 3. 中心証明・適用停止線

- 規格化 Wigner 行列の偶数 trace moment に対する leading pairing の数え上げを途中省略なく行う。
- 収束の種類（almost sure / in probability / expectation）、独立性、分散、有限高次 moment、次元比の極限を明記する。
- Marčenko–Pastur の atom at zero は `p/n` の採用規約と rank 欠損の有無で正確に書く。
- edge convergence や BBP の高度な完全証明を15週へ無理に詰めない。証明未掲載なら外部の named theorem の形で仮定・適用範囲と証明後送先を明記する。
- 「double descent は MP 法則によりあらゆる深層学習で証明された」と主張しない。可解模型と一般ネットワークの間に停止線を引く。

## 4. 演習・実装条件

Wigner 行列と Wishart 行列のシミュレーションで経験スペクトル測度を比較し、サイズ・行列成分の分布・乱数シード・次元比を記録する。RMT1 は SLT2 の一律必修にせず、必要な深掘りのときの発展分岐にする。

仮 ID `RMT1`。講義本文・詳細証明・演習解答・数学監査・CI・routing 更新が完了して初めて完了とする。

参考範囲: Terence Tao, *Topics in Random Matrix Theory*; Greg Anderson, Alice Guionnet, Ofer Zeitouni, *An Introduction to Random Matrices*; Zhidong Bai, Jack Silverstein, *Spectral Analysis of Large Dimensional Random Matrices*.
