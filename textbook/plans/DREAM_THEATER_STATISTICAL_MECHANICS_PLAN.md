# DREAM THEATER 統計力学（SM1〜SM8）

作成・分冊: 2026-10-11  
状態: planned・着手可能（前提のTH1〜TH8は全章完成・横断監査済み。SM本文の実装・公開は未着手）

## 中心問い

巨視的・微視的・無秩序系のうち、この科目がどの状態空間と極限を正本化するか。

## 直接必要な前提・PLAN間依存

- 完了済みの熱力学 TH1〜TH8、確率論・測度論。SM1 の着手時には実際に使う正本結果と必要な直接前提を chapter/knowledge metadata に確定する。量子統計を扱うSM6では QM の必要部分を改めて確定する。
- この系列の推奨順：[TH](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md) → [SM](DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) → [SG](DREAM_THEATER_SPIN_GLASS_PLAN.md)。SGは他系列のブラックホール基礎に無条件必修としない。

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

## 着手ゲートの確認（2026-10-12）

- TH1〜TH8 は系列 manifest で全章 `completed`、熱力学 PLAN は横断監査を完了して `plan_done/` に移動済み。熱力学の未完了を理由に SM1 の実装を留保する必要はない。
- SM はまだ設計済み・未着手であり、`plans/` に保持する。**SM1 の本文・検証など PLAN 固有作業に実際に着手したとき**、この PLAN を `plans_progress/` へ移し、SM 系列 manifest と直接参照を作成・更新する。準備完了だけでは着手扱いしない。
- SM1 は微視的状態・巨視的状態・アンサンブル・熱力学極限の定義を入口とし、TH の巨視的平衡論と微視的分配関数の論証を混同しない。
