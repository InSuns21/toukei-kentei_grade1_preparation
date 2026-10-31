# DREAM THEATER カラビ予想とヤウの定理（YAU1）

分冊: 2026-10-11  
状態: planned（設計のみ）

## 中心問い

複素Monge–Ampèreの事前評価を用いてRicci-flat計量をどう構成するか。

## 直接依存・責務境界

[CYG1](DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)、[KAH1](DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)、[HOD1](../plans_progress/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)、GA2/GA3/GPDE。

**この科目の正本：** 連続性の方法と非線形楕円型評価

### YAU1（14講）
カラビ予想の設定、指定 Ricci 形式からケーラー・ポテンシャルへ、複素 Monge–Ampère 方程式
$$
(\omega+i\partial\bar\partial\varphi)^n=e^F\omega^n
$$
への帰着（体積積分の整合条件を必ず記載）、解の一意性、連続性の方法、開性、$C^0$ 評価、二階評価、必要な Hölder / 三階または Evans–Krylov 型正則性、高階 Schauder 評価、閉性、存在、Ricci-flat Kähler 計量への応用。

**非線形楕円型解析の owner:** manifold Sobolev・線形楕円型 PDE・Hodge は GA / GPDE / HOD1 に戻し、Monge–Ampère に固有の a priori estimates と補題を YAU1 に置く。途中に独立した解析補講が必要なら具体的な証明欠損を特定して追加するが、「GANA1」の再新設はしない。

## 実装と査読

現時点ではPLAN設計のみで本文未実装。正式着手時に既存chapter.yamlの直接依存、概念owner、公開stable anchorを監査する。前提となる新PLANが未完了なら定理を既証明として引用しない。各章に動機・定義の直接例・主要証明の中間式・演習A4/B3/C1以上の全詳細解答を設け、自己再検算・別観点査読・直前章追跡監査を実施する。完成には系列全体の依存・リンク・公開導線の横断監査を要する。
