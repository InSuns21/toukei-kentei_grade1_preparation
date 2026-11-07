# DREAM THEATER カラビ予想とYauの定理（YAU1）

分冊: 2026-10-11
設計改訂: 2026-11-08
状態: planned（設計のみ、講義数は14章に確定）

## 中心問い・完成地点

コンパクトKähler多様体上の指定Ricci形式の問題を複素Monge–Ampère方程式へ帰着し、連続性の方法の開性・閉性を、非線形方程式固有の事前評価と正則性の道筋を含めて証明する。固定Kähler類でのRicci平坦計量の存在と一意性を得る。

## 直接依存と責務境界

- [CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)：Calabi–Yauの定義、標準束、第一Chern類、quinticの例。Yauの存在証明は本講座が所有する。
- [KAH1](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)：Kählerポテンシャル、Ricci形式、接続と曲率。
- [HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)：大域の$\partial\bar\partial$-補題、調和理論。
- [GA](../plan_done/DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md)、GPDE1〜10：Sobolev、楕円型評価、最大値原理、Schauder評価などを使用箇所の既存定理と照合する。

従来の「14講」は以下の**確定した設計上の14章**を指す。90分授業の上限ではない。補題の証明が既習範囲で閉じなければ、独立補講を設けるかPLANを明示改訂し、無断で未証明入力扱いにしない。

## 講義構成（14章）

1. **YAU1-01：Calabi予想の精密な主張。** コンパクト性・Kähler類・Ricci形式のde Rham類、指定代表の整合条件と一意性の量化を確認する。
2. **YAU1-02：Ricci形式からポテンシャルへ。** $\partial\bar\partial$-補題、$\rho(\omega')-\rho(\omega)=-i\partial\bar\partial\log(\omega'^n/\omega^n)$、体積正規化を導く。
3. **YAU1-03：複素Monge–Ampère方程式の幾何。** $\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$、$\omega_\varphi^n=e^F\omega^n$ の定義域・楕円性、線形化$\Delta_{\omega_\varphi}$と規約を検算する。
4. **YAU1-04：一意性と正規化。** 二解の差、対数行列式の積分、最大値原理を用いて定数差だけを残す。平均ゼロ等の規約を固定する。
5. **YAU1-05：連続性の方法と開性。** パスの構成、線形化の核、平均ゼロ関数上の逆写像定理、積分整合条件を示す。
6. **YAU1-06：$C^0$評価I。** 平均値の制御、Green関数・Sobolev不等式を適用する仮定、$\varphi$の正規化と下限の導出を示す。
7. **YAU1-07：$C^0$評価II。** Moser反復の指数列・測度・定数を追い、$\|\varphi\|_{L^\infty}$ の一様有界性まで閉じる。
8. **YAU1-08：二階評価の局所計算。** $\operatorname{tr}_{\omega}\omega_\varphi$、曲率項、$\Delta_{\omega_\varphi}\log\operatorname{tr}_{\omega}\omega_\varphi$ の主要項を導出する。
9. **YAU1-09：二階評価の大域閉包。** 補助関数$\log\operatorname{tr}_{\omega}\omega_\varphi-A\varphi$に最大値原理を適用し、行列式と跡から計量の双側評価を得る。
10. **YAU1-10：三階評価の核心。** Calabi型の三階量、共変微分と交換子の曲率項、局所計算から一様評価への橋を作る。Evans–Krylov法は代替証明経路として比較し、両方を暗黙に要求しない。
11. **YAU1-11：高階評価と正則性。** 三階評価から係数のHölder制御、Schauderブートストラップを適用する条件と導出の閉包を確認する。
12. **YAU1-12：閉性と存在。** 解列のコンパクト性、楕円性の保持、極限の方程式への代入と連続性の方法の結論を接続する。
13. **YAU1-13：Ricci平坦Kähler計量の帰結。** $c_1(X)_{\mathbb R}=0$、$\eta=0$、固定Kähler類での一意性を示し、複素トーラス・K3・quinticへ適用する。
14. **YAU1-14：総合証明・反例・演習。** コンパクト性、正値性、体積整合条件のどれが失われると何が壊れるかを点検し、方程式への帰着から存在まで自力再構成する。

## 文献との照合

- [V. Tosatti / W. Kong, Notes on Calabi–Yau Manifolds (2024)](https://cims.nyu.edu/~wk805/files/CY_Manifolds_Notes.pdf)：定理の量化、Ricci形式と複素Monge–Ampèreへの帰着。
- [T. Collins, Geometry of the Complex Monge–Ampère Equation（Harvard講義）](https://people.math.harvard.edu/~tcollins/Math262.html)：$C^0$、$C^2$、$C^3$評価を独立して追う順序。
- [D. Joyce, Compact Manifolds with Special Holonomy（Oxford）](https://academic.oup.com/book/53817)：Ricci平坦性と特殊ホロノミーの帰結・その限界。

## 実装・査読の停止線

現在は設計のみ。着手時にYAU1のseries manifest、章別metadata、直接prerequisiteと既存の解析定理の実在するanchorを照合する。各章はA4/B3/C1**以上**と全詳細解答を備え、核心証明の中間式を省かない。新規章自身に現行規約の区分C自己再計算と別観点再読を適用する。**別の完了章の追跡監査は章IDを指定された場合のみ**。計画書の講数確定は本講座の実装開始・完成を意味しない。
