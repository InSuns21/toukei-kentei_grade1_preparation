# DREAM THEATER ミラー対称性 I・II（MIR1・MIR2）

分冊: 2026-10-11
設計改訂: 2026-11-08
状態: planned（設計のみ、MIR1・MIR2を各12章、計24章に確定）

## 中心問い

複素構造の周期積分から鏡像の曲線計数に至るまで、quintic threefoldを軸に、B側のPicard–Fuchs方程式・ミラー写像とA側の種数0 Gromov–Witten不変量をどう結び付けるか。

## 直接依存と証明所有者

- **MIR1**：[DEF1](../plans_progress/DREAM_THEATER_COMPLEX_DEFORMATION_MODULI_PLAN.md)のGauss–Manin・変形、[HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)のHodge構造、[CAG1](../plan_done/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)と[CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)のquintic。**YAU1やGW1の完成をMIR1の必須にしない。**
- **MIR2**：MIR1の周期・ミラー写像に加え、[GW1](DREAM_THEATER_GROMOV_WITTEN_GEOMETRY_PLAN.md)のGW不変量・量子積を直接前提とする。一般仮想基本類の構成は別の深い理論であり、GW1内で完成済みと偽らない。
- Greene–Plesser型の商と解消、Picard–Fuchs、ミラー定理の精密な証明は、適用条件・外部定理の役割・本文で実際に導出する範囲を分離する。「mirror symmetryという一般定理」が全例で証明済みとは書かない。

## MIR1：周期・Picard–Fuchs・ミラー写像（12章）

1. **MIR1-01**：A模型・B模型の数学的対象と物理的動機、同一視できない構造。
2. **MIR1-02**：Hodge数交換の意味、楕円曲線・K3・quinticでの検証と限界。
3. **MIR1-03**：Greene–Plesser型のquintic商、固定点と特異性、適切な解消の必要性。
4. **MIR1-04**：quinticの一パラメータ複素構造族、滑らかさと判別式。
5. **MIR1-05**：留数で表す正則3形式、周期積分、サイクルの選択。
6. **MIR1-06**：Gauss–Manin接続と周期の微分、微分方程式の成立機構。
7. **MIR1-07**：quinticのPicard–Fuchs作用素を実導出し、規格化・独立解の数を検証。
8. **MIR1-08**：Frobenius法による冪級数解と対数解、漸化式・初項の検算。
9. **MIR1-09**：大複素構造極限近傍のモノドロミーを解析接続から計算。
10. **MIR1-10**：最大単冪モノドロミー・積分構造の意味、基底の規格化と限界。
11. **MIR1-11**：周期比からミラー写像$q=e^{2\pi i t}$を作り、初項と逆級数を検算。
12. **MIR1-12**：B側Yukawa結合と周期の総合計算、A側への橋。

## MIR2：量子コホモロジーと種数0計数（12章）

1. **MIR2-01**：複素化KählerパラメータとA模型の幾何。
2. **MIR2-02**：三点GW不変量の定義と次数・挿入条件をGW1に接続。
3. **MIR2-03**：小量子積、量子接続、曲線類とNovikov変数。
4. **MIR2-04**：A側Yukawa結合と種数0生成関数の定義域・規格化。
5. **MIR2-05**：B側Yukawa結合の座標変換と周期の規格化。
6. **MIR2-06**：prepotential、古典三重交叉項とインスタントン項の分離。
7. **MIR2-07**：quinticのミラー定理――何が等しいか、仮定と深い証明入力の正確な位置。
8. **MIR2-08**：ミラー写像を代入した$q$展開の実計算と係数検算。
9. **MIR2-09**：GW有理数$N_d$と整数型$n_d$、多重被覆式の係数・次数。
10. **MIR2-10**：$n_1=2875$の導出と「直線の本数」の幾何的意味・適用条件。
11. **MIR2-11**：低次数の独立検算、特異・非横断・高種数への外挿の限界。
12. **MIR2-12**：周期から曲線計数への全論証・数式と証明所有者の総合監査。

quinticのミラー計数は**引用した公式の披露ではなく、周期→ミラー写像→Yukawa→多重被覆→係数の計算**を全て紙上で再現できることを完成条件とする。ただし、一般のミラー定理自体の完全証明とその論理的使用は区別する。

## 文献との照合

- [D. Cox / S. Katz, Mirror Symmetry and Algebraic Geometry（AMS）](https://doi.org/10.1090/surv/068)：quintic、Hodge、モジュライ、GW、量子微分方程式、ミラー定理の順序。
- [K. Hori et al., Mirror Symmetry（Clay Mathematics Institute）](https://www.claymath.org/resource/mirror-symmetry/)：A/B模型と数学・物理の接続、周期・曲線計数の別経路。
- [C. Voisin, Hodge Theory and Complex Algebraic Geometry II（Cambridge）](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11)：変動Hodge構造の正確な定義と周期の入口。

## 実装・査読

各12章は設計上の確定数で、授業時間の上限ではない。不可欠な証明が未配置なら根拠を記録して明示的に再編する。MIR1が完了し、さらにGW1が完了した時点でMIR2へ進む。着手時にchapter IDの衝突、series manifest、直接前提とstable anchorを照合し、各章A4/B3/C1以上・全詳細解答と変更区分Cの自己再計算・別観点再読を実施する。別の完了章の追跡監査は明示依頼時のみ。
