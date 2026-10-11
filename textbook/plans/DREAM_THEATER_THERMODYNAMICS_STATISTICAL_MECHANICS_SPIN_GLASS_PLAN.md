# DREAM THEATER 熱力学 → 統計力学 → スピングラス 履修ルート

作成日: 2026-10-07  
分冊: 2026-10-11  
状態: planned（横断経路のみ）

- [熱力学 TH1〜8](DREAM_THEATER_THERMODYNAMICS_PLAN.md)：法則、状態量、熱力学ポテンシャル。
- [統計力学 SM1〜8](DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md)：ミクロな状態とアンサンブル。
- [スピングラス SG1〜8](DREAM_THEATER_SPIN_GLASS_PLAN.md)：disorder、SK、Parisi、cavity。

依存：RA/MECH → TH → SM → SG。EOM221が必要とするスピングラス定理はSGを正本とし、2026年研究結果の評価はEOM。独立3科目の実装・監査・完了をこのルート自体の完成と混同しない。

---

## 元PLANの共通設計・文献・依存監査資料（各科目のシラバスは分冊先が正本）

## 4. canonical boundary

- thermodynamic potential の公理的構造: TH
- partition function から potential を導く: SM
- disorder / overlap / Parisi / cavity: SG
- 2026 Family 221 の exact claim / proof architecture / verification status: EOM221

同じ定義を各系列で再導入しない。

## 5. 停止線

今回の主線には含めない。

- nonequilibrium thermodynamics
- Boltzmann equation / kinetic theory
- transport coefficient / Onsager theory
- renormalization group の完全理論
- constructive statistical mechanics
- quantum spin glass の完全理論

必要なら独立 PLAN とする。

## 6. 完成条件

- TH1--TH8 で平衡熱力学を独立に履修できる。
- SM1--SM8 で標準平衡統計力学を独立に履修できる。
- SG1--SG8 で平均場から diluted spin glass / cavity method まで一本の講義になる。
- EOM221 が基礎定義の初出場所にならない。
