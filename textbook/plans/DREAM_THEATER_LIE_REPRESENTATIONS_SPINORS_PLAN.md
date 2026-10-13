# DREAM THEATER Lie群の表現・スピノルと相対論的粒子（LREP系列・講数可変）

設計: 2026-10-13  
状態: planned（設計のみ。章本文／series manifest／公開は未着手）

## 中心問いと追加理由

対称性が作用する群を理解しただけでは、場の成分・スピン・ヘリシティ・1粒子状態の変換法則は定まらない。既存LIE1〜LIE4はLie群・Lie環・指数・作用・Maurer–Cartanまでで、**表現論を明示的に停止線の外**としている。QFT I／IIIで個別のガンマ行列だけを導入すると、有限次元スピノル表現とHilbert空間上のユニタリ粒子表現を混同しやすい。

**このPLANは一般の表現論と相対論への具体的接続の数学的正本**。特殊相対論の物理的説明やQFTの粒子・場の量子化を再執筆しない。

## 直接の前提・所有権

- 既存LIE1〜LIE4（Lie群・Lie環・作用・指数・Maurer–Cartan）、GRP（群・商群・作用）、LA、FA／QMのHilbert空間・ユニタリ作用素・スペクトル測度、[SREL](../plan_done/DREAM_THEATER_SPECIAL_RELATIVITY_I_PLAN.md)のMinkowski時空。
- LREPは**有限次元Lie群／Lie環の表現、LorentzとSpinの被覆、Poincaré群の1粒子ユニタリ表現の入口**を所有する。
- Lorentz多様体のspin構造を大域的に扱う段階は[主束・ゲージ幾何](DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md)と[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)へ依存。任意多様体上のスピン構造の存在を無条件に仮定しない。
- QFT Iは場をFock量子化し、QFT IIIは標準模型の表現と粒子内容を扱う。本PLANを**QFT I全体の一律必修にはしない**。スピノルやスピン和の証明を完全追跡する箇所で該当する完成章を直接前提にする。

## 候補学習テーマ（各テーマ=1章固定ではない）

1. 群表現・Lie環表現・不変部分空間・可約性・交換子と微分表現。
2. 行列群SU(2)、SO(3)と二重被覆、スピン1/2表現、角運動量の合成。
3. Lie環sl(2,C)の複素表示とLorentz群の関係（実Lie群としてのSL(2,C)とSO⁺(1,3)の被覆を区別）。
4. (j_L,j_R)表現、Weylスピノル・ベクトル表示、テンソル積・複素共役・双対。
5. Clifford代数Cl(1,3)の符号規約、γ行列、Dirac表現、chirality・charge conjugationの条件。
6. Lorentz不変双線形形式、Dirac共役、スピン和と共変な自由場方程式への橋。
7. 群の半直積、Poincaré群・平行移動のスペクトル条件、運動量軌道。
8. Wignerのlittle group：質量正の回転安定群と質量零のISO(2)の標準的ヘリシティ表現（連続スピン表現は扱わない理由を明示）。
9. 誘導表現・正エネルギー1粒子Hilbert空間と有限次元場の変換行列の**区別**。
10. 対称性のユニタリ／反ユニタリ実装、離散変換・スピン統計・CPTの一般定理の仮定を整理。
11. 自由場を構成するための偏極ベクトル／スピノル・共変性を具体計算する総合演習。

## 必須の数学的検算

- SU(2)→SO(3)の2対1対応を具体的に示し、2π回転がスピノル上でどう作用するか計算する。
- SL(2,C)作用とHermite行列表示から、Minkowskiノルムの保存と群準同型の核を確認する。
- 左右Weylスピノル・DiracスピノルのLorentz変換を構成し、γ行列のClifford関係と平面波のスピン和を検算する。
- 有限次元の非自明なLorentz表現が一般に正定値内積を保つユニタリ表現でないことと、1粒子Hilbert空間上のユニタリ表現が異なることを説明する。
- 質量零のlittle groupの並進部分を自動的に「消える群」とせず、通常の有限ヘリシティ系列での表現の選択であることを示す。

## 教材・実装ゲート

- 未実装の一般定理を前提として断言せず、規模の大きい分類定理は模型を証明した後に適用仮定・完全性の境界を明示する。
- 初出定義→直接例→主要計算／証明→演習・詳細解答。最低A4/B3/C1を機械的上限としない。標準第10節の変更区分に従い査読する。別完成章の追跡監査は明示依頼時のみ。
- 章ID、chapter.yaml、knowledge.yaml、stable anchor、公開導線は着手時に確定し、実在する前提とのみ接続する。単なる設計でcompletedにしない。

## 範囲校正用文献

- Brian C. Hall, *Lie Groups, Lie Algebras, and Representations*（有限次元行列Lie群／表現）
- Steven Weinberg, *The Quantum Theory of Fields*, Vol. I（Poincaré群・1粒子分類・場の共変性）
- David Tong, [*Quantum Field Theory*](https://davidtong.org/teaching/quantum-field-theory/)（スピノルと場の物理への接続）
- MIT OCW 18.757, [Representations of SL2(C)](https://ocw.mit.edu/courses/18-757-representations-of-lie-groups-fall-2023/resources/mit18_757_f23_lec26_pdf/)（高度部分の校正。初学者に全内容を課さない）

文献は範囲・正確な前提の校正に使用し、本文・演習の転載はしない。
