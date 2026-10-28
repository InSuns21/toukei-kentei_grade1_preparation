# DREAM THEATER ミラー対称性 I・II（MIR1・MIR2）

分冊: 2026-10-11  
状態: planned（設計のみ）

## 中心問い

周期積分と曲線計数をどのように結ぶか。

## 直接依存・責務境界

MIR1：[DEF1](DREAM_THEATER_COMPLEX_DEFORMATION_MODULI_PLAN.md)、[HOD1](DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)、[CAG1](../plans_progress/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)。MIR2ではさらに[GW1](DREAM_THEATER_GROMOV_WITTEN_GEOMETRY_PLAN.md)。**I→IIは同じ連続PLANだが、MIR1の必須にGW1を混ぜない**。

**この科目の正本：** 周期・Picard–Fuchs、ミラー計数・量子コホモロジー

### MIR1（12講）
A/B-model の数学的入口、Hodge 数の交換、quintic と Greene–Plesser 型ミラーの関係、周期積分、Gauss–Manin 接続、Picard–Fuchs 微分方程式、冪級数解、モノドロミー、大複素構造極限、ミラー写像、具体計算・検算。

### MIR2（12講）
小量子コホモロジー、三点不変量、Yukawa 結合、ミラー定理の成立条件、quintic の genus 0 計数、通常の GW 不変量と整数型不変量の多重被覆変換、$n_1=2875$ の意味、曲線計数への周期積分の応用。**quintic のミラー計数の導出と検証を単なる公式紹介で終わらせない。**

## 実装と査読

現時点ではPLAN設計のみで本文未実装。正式着手時に既存chapter.yamlの直接依存、概念owner、公開stable anchorを監査する。前提となる新PLANが未完了なら定理を既証明として引用しない。各章に動機・定義の直接例・主要証明の中間式・演習A4/B3/C1以上の全詳細解答を設け、自己再検算・別観点査読・直前章追跡監査を実施する。完成には系列全体の依存・リンク・公開導線の横断監査を要する。
