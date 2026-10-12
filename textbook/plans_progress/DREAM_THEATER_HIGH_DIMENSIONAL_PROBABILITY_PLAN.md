# DREAM THEATER 高次元確率・集中不等式 — 独立科目PLAN

作成日: 2026-10-10  
再設計: 2026-10-12  
状態: in_progress（HDP1・HDP2 実装・変更章査読済、HDP3 以降と横断監査は未完了）

## 0. 中心問い

なぜ大きな次元や多数の候補の下でも確率的偏差を制御できるのか。独立性、尾部仮定、複雑度、行列の作用素ノルムが評価をどう変えるのかを証明で理解する。

**独立数学科目**として、確率論の一部を駆け足で紹介するのではなく非漸近確率論を体系化する。数学的適用は統計的学習理論 SLT1/2、ランダム行列 RMT1、MFL の標本誤差など。

## 1. 前提と canonical ownership

- 既存正本: MT の積分・確率論の期待値、確率収束、モーメント・母関数; LA の SVD/固有値; RA の微分積分。
- 本科目: 集中不等式の独立の正本、sub-Gaussian/sub-exponential norm、有限 `epsilon`-net、行列集中、非漸近高次元評価。
- SLT1: VC・symmetrization・Rademacher 複雑度・PAC-Bayes・学習問題への適用（本 PLAN で重複しない）。
- RMT1: Wigner/Marčenko–Pastur の極限スペクトル分布・resolvent（本科目で重複しない）。
- 確率解析 STO: 連続時間マルチンゲール/SDE（離散時間の Azuma 等を引用するときは仮定と違いを明記）。

## 2. 証明のまとまりから章を設計する

以下のA〜Fは**学習ブロック**であって、1ブロックが1講・1章を表すものではない。講数・週数の上限も下限も事前に置かない。主要補題の導出、反例、定義例、演習解答に合わせて分割・統合・増補し、深い証明を短い枠へ押し込まない。

### A. スカラーの集中不等式

- Markov・Chebyshev、指数Markov法（Chernoff法）、モーメント母関数。
- Hoeffding補題と独立な非同分布有界和のHoeffding不等式。指数の最適化まで証明する。
- Bernstein／Bennett型評価の二次・一次tail領域とモーメント条件。
- sub-Gaussian／sub-exponentialのOrliczノルム、尾部・モーメントの関係、独立和の集中。使用する同値形の仮定を示す。

### B. 有界差分とGaussian集中

- Doob差分の構成からbounded differences／McDiarmid不等式を導く。条件付き変化幅を検算する。
- Gaussian集中とLipschitz関数。標準定理の証明範囲とノルム・分散の規約を固定する。

### C. 高次元幾何とランダム射影

- 高次元球面の有限epsilon-net・covering numberの構成と、作用素ノルムの近似評価。
- Johnson–Lindenstrauss型射影を固定ベクトルの長さ保存確率から有限点集合へのunion boundへ進めて導く。

### D. ランダムベクトルと共分散

- sub-Gaussian random vector、全方向の射影、isotropy、共分散の退化を区別する。
- empirical covarianceの非漸近的作用素ノルム評価と、標本数・次元・母集団共分散の関係を導く。

### E. 行列集中と二次形式

- matrix Hoeffding／Bernstein、非可換モーメント母関数、トレースと作用素順序の補題を扱う。
- Hanson–Wrightの主張・適用例・必要な補題を明示する。証明していない一般形は証明済みと表示せず、証明後送先を明記する。

### F. 複雑度と応用への接続

- union boundの限界とchainingへの入口を、covering numberとの関係から説明する。
- SLT／RMT／MFLで引用する結果と、各応用PLANの独自の学修目標を分離し、総合演習で仮定の違いを比較する。

## 3. 中核定理と条件の例

独立確率変数 `X_i` が各 `a_i\le X_i\le b_i` を満たすとき、Hoeffding の不等式は

$$
\Pr\left(\sum_i(X_i-\mathbb E X_i)\ge t\right)
\le\exp\left(-\frac{2t^2}{\sum_i(b_i-a_i)^2}\right)
$$

を与える。独立性を外した場合に同じ評価を当然視しない。

sub-Gaussian の特性は平均中心化・全方向の線形射影に対する一様な尾部条件で区別し、標本共分散推定では母集団共分散の退化、isotropy、次元と標本数を明示する。

行列 Bernstein、Hanson–Wright、Gaussian concentration は、必要な補題・証明時間から講数を設計し、外部の深い結果を使うときは**intentional black box** として定理全文・仮定・必要な前提と証明後送先を記録する。

## 4. 演習・数値実験

- iid / non-iid の有界変数を比較し、尾部界が経験的に保守的な例とほぼ鋭い例を作る。
- 独立性や有限 exponential moment を除いた反例を構成する。
- Gaussian 射影の長さ保存確率を次元と標本数ごとに再現する。
- 共分散作用素ノルムの誤差と `n,d` の関係を記録する。

各章に定義、直接例、定理、主要証明、反例、Level A 4題・B 3題・C 1題以上（理由付き例外を除く）の演習と全詳細解答を備える。確率変数の台・独立性・有限モーメント・行列次元を省かない。

## 5. 依存・実装・完成条件

- SLT1 の「集中不等式の本体」は HDP に参照を張り、SLT1 に既存証明を複製しない。
- RMT1 は HDP から必要な非漸近界を受け取り、極限分布を独立に担当。
- 正式なHDP系列の章IDと直接前提は実装時に定め、実在章・knowledge DAG・本編索引・下流参照を照合する。
- 完成は主要な学習目標・定理証明・演習詳細解答の充足、数学・読者粒度監査、必要なCI合格を条件とする。講数・週数は完了条件にしない。変更章の主要証明と全演習解答を再計算し、別観点で査読する。別の完了章の追跡監査は章ID指定の明示依頼がある場合のみ行う。

参考範囲: Roman Vershynin, *High-Dimensional Probability*; Martin Wainwright, *High-Dimensional Statistics*; Stéphane Boucheron, Gábor Lugosi, Pascal Massart, *Concentration Inequalities*.


## 6. 実装系列と現在地（2026-10-12）

- 系列manifest: `textbook/dream-theater-series/HDP.yaml`
- HDP1: 指数Markov法、Hoeffding補題、独立非同分布Hoeffding不等式、両側偏差と多座標union bound。本文・全演習解答を実装し、自己検算と同一担当の別観点再査読を実施。
- HDP2: Bennett・Bernsteinの分散依存不等式、指数余剰の導出、退化分散・片側上限・独立性の反例と全10演習を実装・変更章査読済。
- HDP3: sub-Gaussianとsub-exponentialの同値評価（次章・planned）。
- HDP4〜HDP10: 上記B〜Fを実装する暫定まとまり。証明の長さや前提によって実装時に追加・分割・統合でき、講数は固定しない。
- PLAN全体の科目横断監査、下流SLT/RMTへの参照更新は、該当成果物が揃った段階で行う。HDP1の完成は PLAN全体の完了を意味しない。
