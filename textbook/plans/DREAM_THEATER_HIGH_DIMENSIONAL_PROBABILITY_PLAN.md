# DREAM THEATER 高次元確率・集中不等式 — 独立1セメスターPLAN

作成日: 2026-10-10  
状態: planned（PLAN 設計のみ）

## 0. 中心問い

なぜ大きな次元や多数の候補の下でも確率的偏差を制御できるのか。独立性、尾部仮定、複雑度、行列の作用素ノルムが評価をどう変えるのかを証明で理解する。

**15週・90分×15回の独立数学科目**として、確率論の一部を駆け足で紹介するのではなく非漸近確率論を体系化する。数学的適用は統計的学習理論 SLT1/2、ランダム行列 RMT1、MFL の標本誤差など。

## 1. 前提と canonical ownership

- 既存正本: MT の積分・確率論の期待値、確率収束、モーメント・母関数; LA の SVD/固有値; RA の微分積分。
- 本科目: 集中不等式の独立の正本、sub-Gaussian/sub-exponential norm、有限 `epsilon`-net、行列集中、非漸近高次元評価。
- SLT1: VC・symmetrization・Rademacher 複雑度・PAC-Bayes・学習問題への適用（本 PLAN で重複しない）。
- RMT1: Wigner/Marčenko–Pastur の極限スペクトル分布・resolvent（本科目で重複しない）。
- 確率解析 STO: 連続時間マルチンゲール/SDE（離散時間の Azuma 等を引用するときは仮定と違いを明記）。

## 2. 15週シラバス

| 週 | 内容 | 証明責務 |
|---|---|---|
| 1 | tail bound、Markov、Chebyshev、Chernoff 法 | Markov→指数モーメント |
| 2 | moment generating function と Hoeffding lemma | 積の扱いと独立性 |
| 3 | Hoeffding inequality、非同分布有界和 | 最適化を含む証明 |
| 4 | Bernstein/Bennett 型界 | 二次と一次の尾部 regime |
| 5 | sub-Gaussian norm と同値な特徴づけ | 選択した同値形の仮定 |
| 6 | sub-exponential、和の集中 | `psi_1` norm と独立和 |
| 7 | bounded differences・McDiarmid | Doob 差分と条件付き幅 |
| 8 | Gaussian 集中・Lipschitz 関数 | 使用する標準定理の証明範囲を固定 |
| 9 | 高次元球面・net・covering number | net からの作用素ノルム評価 |
| 10 | Johnson–Lindenstrauss とランダム射影 | 固定ベクトル→有限点集合 |
| 11 | sub-Gaussian random vectors と isotropy | 投影・二次形式の tails |
| 12 | empirical covariance の非漸近評価 | 次元・標本数の明示 |
| 13 | matrix Hoeffding/Bernstein の入口 | 非可換 mgf の定理とその証明責務 |
| 14 | Hanson–Wright の主張と適用例 | 完全証明は証明監査で可否を決定 |
| 15 | chaining への入口・演習総括 | union bound の限界、証明範囲の分類 |

## 3. 中核定理と条件の例

独立確率変数 `X_i` が各 `a_i\le X_i\le b_i` を満たすとき、Hoeffding の不等式は

$$
\Pr\left(\sum_i(X_i-\mathbb E X_i)\ge t\right)
\le\exp\left(-\frac{2t^2}{\sum_i(b_i-a_i)^2}\right)
$$

を与える。独立性を外した場合に同じ評価を当然視しない。

sub-Gaussian の特性は平均中心化・全方向の線形射影に対する一様な尾部条件で区別し、標本共分散推定では母集団共分散の退化、isotropy、次元と標本数を明示する。

行列 Bernstein、Hanson–Wright、Gaussian concentration は、講義15回で完全証明を掲載できる形を選び、外部の深い結果を使うときは**intentional black box** として定理全文・仮定・必要な前提と証明後送先を記録する。

## 4. 演習・数値実験

- iid / non-iid の有界変数を比較し、尾部界が経験的に保守的な例とほぼ鋭い例を作る。
- 独立性や有限 exponential moment を除いた反例を構成する。
- Gaussian 射影の長さ保存確率を次元と標本数ごとに再現する。
- 共分散作用素ノルムの誤差と `n,d` の関係を記録する。

各単元に定義、直接例、定理、主要証明、反例、詳細解答を備える。確率変数の台・独立性・有限モーメント・行列次元を省かない。

## 5. 依存・実装・完成条件

- SLT1 の「集中不等式の本体」は HDP に参照を張り、SLT1 に既存証明を複製しない。
- RMT1 は HDP から必要な非漸近界を受け取り、極限分布を独立に担当。
- 仮 ID `HDP1` 以下の章 ID と正式サブ章配列は実装時に決め、knowledge DAG・本編索引・通読順を更新する。
- 完成は15週相当の講義、数学・読者粒度監査、演習、必要なCI合格を条件とする。

参考範囲: Roman Vershynin, *High-Dimensional Probability*; Martin Wainwright, *High-Dimensional Statistics*; Stéphane Boucheron, Gábor Lugosi, Pascal Massart, *Concentration Inequalities*.
