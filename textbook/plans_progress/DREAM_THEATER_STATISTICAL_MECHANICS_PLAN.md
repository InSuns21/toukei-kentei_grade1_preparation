# DREAM THEATER 統計力学（SM1〜SM8）

作成・分冊: 2026-10-11  
状態: in progress（TH1〜TH8の完了・横断監査を前提に、SM1の本文・演習・公開導線を実装。SM7〜SM8と系列横断監査は未完了）

## 中心問い

巨視的・微視的・無秩序系のうち、この科目がどの状態空間と極限を正本化するか。

## 直接必要な前提・PLAN間依存

- 完了済みの熱力学 TH1〜TH8、確率論・測度論。SM1 の着手時には実際に使う正本結果と必要な直接前提を chapter/knowledge metadata に確定する。量子統計を扱うSM6では QM の必要部分を改めて確定する。
- この系列の推奨順：[TH](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md) → [SM](DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) → [SG](../plans/DREAM_THEATER_SPIN_GLASS_PLAN.md)。SGは他系列のブラックホール基礎に無条件必修としない。

## 所有範囲

アンサンブル・分配関数・熱力学極限・量子統計・Ising。

## 2. 統計力学 SM1--SM8

### SM1 microscopic state・ensemble・thermodynamic limit
microstate / macrostate、density of states、thermodynamic limit。

### SM2 microcanonical ensemble
equal probability、Boltzmann entropy、temperature の emergence。

### SM3 canonical ensemble
Gibbs distribution、partition function、free energy、energy fluctuation。

### SM4 grand canonical ensemble
chemical potential、grand partition function、particle-number fluctuation。

### SM5 classical ideal gas・equivalence of ensembles
Maxwell--Boltzmann、Sackur--Tetrode の位置付け、ensemble equivalence。

### SM6 quantum statistics
Bose--Einstein、Fermi--Dirac、quantum ideal gas。

### SM7 Ising / Curie--Weiss・mean-field
Ising Hamiltonian、magnetization、Curie--Weiss、self-consistency、spontaneous symmetry breaking。

### SM8 phase transition・critical phenomenon
free-energy nonanalyticity、correlation、critical point、scaling / universality への入口。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。変更章自身の主要証明と全詳細解答を再導出し、別観点の再査読を行う。別の完了章の追跡監査は章IDを指定した明示依頼時のみ行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。

## SM1 の着手と進捗（2026-10-12）

- SM1 を微視的状態・巨視的状態・有限アンサンブル・離散準位の状態数・熱力学極限の入口として執筆し、SM 系列 manifest を作成した。
- SM1 は主要4結果の完全証明と A5/B4/C1 の詳細解答を備える。SM2 は微正準アンサンブル、Boltzmannエントロピー、複合系、統計的温度と二値スピンのエントロピー率を実装済み。SM3 は正準アンサンブル・分配関数・自由エネルギー・エネルギー揺らぎを実装済み。SM4 は大正準アンサンブルとして実装済み、SM7〜SM8 は未着手、系列横断監査も今後実施する。
- 概念、証明、数え上げの各役割を区別し、等確率とエントロピーの物理的対応は SM2 に委ねる。

## SM2 の進捗（2026-10-12）

- SM2 は有限エネルギー窓の等確率仮定を明示し、状態数の積・畳み込み、内部最大の温度一致の条件、二項係数の指数漸近を証明する。
- A5/B4/C1 の全詳細解答を追加する。温度の同定に必要な滑らかさ・熱力学的対応を等確率の仮定と区別した。

## SM3 の進捗（2026-10-12）

- SM3 は有限熱浴の厳密な周辺分布と指数重みへの近似条件を区別し、正準分配関数・Gibbsエントロピー・Helmholtz自由エネルギー・変分原理・熱容量と揺らぎ・独立系の積表示まで証明する。
- Level A 5題・B 4題・C 1題の詳細解答を実装。SM6以降および系列横断監査は未完了。

## 着手ゲートの確認（2026-10-12）

- TH1〜TH8 は系列 manifest で全章 `completed`、熱力学 PLAN は横断監査を完了して `plan_done/` に移動済み。熱力学の未完了を理由に SM1 の実装を留保する必要はない。
- SM1 の本文・検証に着手したため PLAN を `plans_progress/` へ移し、SM 系列 manifest に進捗を登録した。
- SM1 は微視的状態・巨視的状態・アンサンブル・熱力学極限の定義を入口とし、TH の巨視的平衡論と微視的分配関数の論証を混同しない。

## SM4 の進捗（2026-10-12）

- SM4 は粒子数別有限配置、浴からの二保存量の周辺確率、大分配関数の対数微分と粒子数揺らぎ、大熱力学ポテンシャルの導出、変分原理、二値独立サイト模型を実装した。
- 本文には9個の主要 formal result、Level A 5題・B 4題・C 1題の詳細解答を配置。SM7〜SM8 と系列横断監査は未完了。

## SM5 の進捗（2026-10-12）

- SM5 は古典理想気体の相空間積分、Maxwell–Boltzmann分布、Sackur–Tetrode式、累積相空間体積、正準エネルギーのGamma分布と集中、微正準・正準の熱力学量同値、大正準Poisson粒子数を実装した。
- Level A 5題・B 5題・C 1題の詳細解答を配置。SM7〜SM8 と系列横断監査は未完了。

## SM6 の進捗（2026-10-12）

- SM6 はBose型・Fermi型占有数、大分配関数と揺らぎ、周期境界自由粒子の状態密度、量子理想気体の状態方程式、希薄極限、Bose基底占有とFermi零温度極限を実装した。
- 主要 formal result 11件、主要証明8件、Level A 4題・B 4題・C 1題の詳細解答を配置。SM7〜SM8 の実装と系列横断監査は残っている。
