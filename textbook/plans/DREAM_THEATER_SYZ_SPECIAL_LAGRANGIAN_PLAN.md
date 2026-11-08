# DREAM THEATER 特殊Lagrange幾何とSYZ（SYZ1）

分冊: 2026-10-11
設計改訂: 2026-11-08
状態: planned（設計のみ、講義数は14章に確定）

## 中心問いと責務境界

Calabi–Yau上の特殊Lagrangeトーラスを双対化すると、なぜ鏡像の複素幾何が現れるのか。滑らかなトーラス束でのsemi-flat構成は実計算し、特異ファイバー・正則円板・インスタントン補正を未証明の一般原理で片付けない。SYZは一般の場合の完全な既証明定理ではない。

直接依存：[CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)、[YAU1](../plans_progress/DREAM_THEATER_YAU_CALABI_CONJECTURE_PLAN.md)のRicci平坦計量の存在、[SYM6を含むSYM1〜8](../plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)。McLeanの変形理論には楕円型解析・Hodge理論の直接結果も必要。SYZ全体を知るための前提としてMIR2・HM1の全課程を無条件には要求しない。

## 講義構成（確定14章）

1. **SYZ1-01**：複素トーラスと双対トーラス、滑らかな例からの中心問い。
2. **SYZ1-02**：Lagrange条件、余接束のグラフ、局所変形を直接計算。
3. **SYZ1-03**：較正形式、体積最小性、Harvey–Lawsonの基本不等式。
4. **SYZ1-04**：正則体積形式と特殊Lagrange位相、局所方程式。
5. **SYZ1-05**：McLean変形理論、閉形式・余閉形式と調和1形式への帰着。
6. **SYZ1-06**：局所トーラス・ファイブレーションと法線変形、次元の確認。
7. **SYZ1-07**：基底の整数アフィン構造、周期積分と遷移関数。
8. **SYZ1-08**：semi-flatの双対化と複素座標、metricと複素構造の対応。
9. **SYZ1-09**：局所系・$B$場・接続の鏡像側解釈、位相・符号の規約。
10. **SYZ1-10**：楕円曲線とK3の基本例、どこまで滑らかな束とみなせるか。
11. **SYZ1-11**：特異ファイバーとモノドロミー、滑らかな双対化の破綻を例で検証。
12. **SYZ1-12**：正則円板、壁越え、インスタントン補正の必要性と局所モデル。
13. **SYZ1-13**：Gross–Siebertのアフィン幾何・トロピカル退化との比較、仮定と構成の境界。
14. **SYZ1-14**：典型例から一般予想までの証明地図、反例・総合演習。

## 参考文献

- [MIT OCW, Topics in Geometry: Mirror Symmetry（2009）](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/)：特殊Lagrangeの変形、アフィン構造、トーラス双対化、K3の例。
- [M. Gross / B. Siebert, From Real Affine Geometry to Complex Geometry（Annals, 2011）](https://annals.math.princeton.edu/2011/174-3/p01)：特異アフィン構造からの再構成とその精密な適用範囲。
- [K. Hori et al., Mirror Symmetry（Clay）](https://www.claymath.org/resource/mirror-symmetry/)：SYZを他のミラー対称性との対話で位置付ける。

## 実装・査読

14章は編集設計上の確定数で、固定授業数や証明省略の上限ではない。McLean理論や特異ファイバーの核心証明の不足は、外部入力と本講座で証明する結果を峻別して、必要なら根拠付きでPLAN改訂する。着手時にchapter ID・series manifest・既存stable anchorを確認。各章A4/B3/C1以上・全詳細解答、新規章自身の区分C査読を守る。別章の追跡監査は明示依頼時のみ。
