# DREAM THEATER 熱力学 → 統計力学 → スピングラス 履修ルート

作成日: 2026-10-07  
分冊: 2026-10-11  
状態: completed（TH・SM・SG 全24章公開・各科目横断監査済み。履修ルート横断監査とクローズ判定を2026-10-13に完了）

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

## 7. 履修ルート横断監査と最終クローズ（2026-10-13）

### 対象と実装状態

- `textbook/dream-theater-series/TH.yaml`・`SM.yaml`・`SG.yaml` に登録された TH1〜TH8、SM1〜SM8、SG1〜SG8 はすべて `completed`（8+8+8=24章）。三つの科目PLANはそれぞれ `plan_done/` にあり、科目固有の執筆・章内査読・科目横断監査の完了記録を持つ。今回の履修ルート監査は、その三件を代替せず、科目間の接続を別に検査する。
- 24章は公開索引 `textbook/dream-theater-index.json` と目次 `textbook/dream-theater.md` の双方に掲載されている。未公開のSG章や追加執筆をクローズの前提としない。

### 科目間の依存・概念と証明の担当

1. **巨視的平衡から微視的状態へ（TH → SM）**：TH1〜TH8 は状態量・第二法則・エントロピー・安定性・相転移を扱う。特に [TH5の熱力学ポテンシャル](../volumes/dream_thater/物理系/TH/TH5/index.md#def-th5-potentials) は平衡熱力学の正本。[SM1の微視的／巨視的状態](../volumes/dream_thater/物理系/SM/SM1/index.md#def-sm1-micro-macro) はTH1の巨視的状態量を参照して微視的な状態数へ橋渡しし、[SM3の有限正準アンサンブル・分配関数](../volumes/dream_thater/物理系/SM/SM3/index.md#def-sm3-canonical) は TH5 への使用箇所リンクを持つ。分配関数から自由エネルギーを導く証明はSM側が担当する。SM3の `chapter.yaml` と `knowledge.yaml` は SM2/TH5 を直接前提として整合する。
2. **熱揺らぎから固定無秩序へ（SM → SG）**：[SM7のCurie–Weiss模型](../volumes/dream_thater/物理系/SM/SM7/index.md#def-sm7-cw) は決定論的結合のIsing平均場であり、[SG1のquenched/annealed圧力](../volumes/dream_thater/物理系/SG/SG1/index.md#def-sg1-quenched) が外部無秩序を固定してから熱平均を取る操作を新たに定義する。SG1の導入はSM3の正準分配関数とSM7のCurie–Weiss模型をそれぞれ実在anchorへリンクし、`chapter.yaml`・`knowledge.yaml` ともにSM7を直接前提とする。熱平均と無秩序平均の順序を暗黙に同一視しない。
3. **平均場から希薄系へ（SG内の終端接続）**：SG2のGaussian計算からSG3のSK模型・overlap、SG4〜SG6の階層とParisi理論へ進み、[SG7のランダム因子グラフ](../volumes/dream_thater/物理系/SG/SG7/index.md#def-sg7-factor-graph) が相互作用の希薄化を、[SG8の木上BPとBethe厳密性](../volumes/dream_thater/物理系/SG/SG8/index.md#thm-sg8-tree) がcavity法への橋を担う。SG8はSG7の因子グラフ・木上分配関数およびSG6のParisi関連結果を使用箇所から参照する。SG8の `chapter.yaml`・`knowledge.yaml` はSG7/SG6/SG3/SG1を直接前提として一致する。
4. **厳密結果と研究級結果の境界**：SG5の一般ultrametricity・SG6のParisi等式は科目PLANの監査記録どおり研究級外部定理と本文内の導出可能部分を区別する。SG8の一般希薄グラフでのMézard–Parisiの議論も木上BPの厳密性と混同しない。未証明の一般公式を本ルートで証明済みと称さない。

### EOM221と公開参照

- 2026 Family 221 の exact claim・proof architecture・verification status は将来のEOM221が所有する。2026-10-13のmainのファイルツリーでは EOM221 と命名されたPLAN・本文は存在しないため、**未実装のEOM221の内容や正しさを監査済みとは判定しない**。
- ただし、quenched/annealed、REM、overlap、Parisi、cavity・BPの基礎はSG1〜SG8に実装されており、現時点でEOM221がこれらの初出場所になってはいない。EOM221を将来執筆する際にはSGのcanonical stable anchorを引用し、研究成果の評価を分離する。
- 今回の科目間使用箇所で確認したTH5、SM1、SM3、SM7、SG1、SG6、SG7、SG8の代表的stable anchorは実在する。目次・公開索引の24章掲載を確認した。全章の全リンク再検査や全主要証明・全演習解答の再計算をこの**履修ルート横断監査**で新たに実施したとの主張はしない（科目別クローズ記録と区別）。

### 完了判定と変更範囲

- 平衡熱力学の独立履修（TH1〜8）、標準平衡統計力学の独立履修（SM1〜8）、平均場からdiluted / cavityまでの講義（SG1〜8）は、各科目の完了記録と今回の科目間接続監査により本ルートの完成条件を満たす。
- 停止線（非平衡、運動論、輸送係数、RGの完全理論、constructive統計力学、量子スピングラスの完全理論）を今回のクローズに逆輸入しない。
- 変更はPLANの移動・状態記録・PLAN間参照の保守のみ。章本文、数学的な定理・証明・演習・knowledge metadataは変更しない。査読は同一実施主体による依存・公開・リンクの横断照合であり、第三者独立数理査読とは称しない。CIおよびPRの結果は本クローズPRの記録を参照する。
