# DREAM THEATER カラビ予想とYauの定理（YAU1）

分冊: 2026-10-11
設計改訂: 2026-11-09
状態: in_progress（YAU1-01〜10完了、YAU1-11〜14は未着手。講義数は14章に確定）

## 中心問い・完成地点

コンパクト連結Kähler多様体上の指定Ricci形式の問題（$[\rho]=2\pi c_1(X)_{\mathbb R}$）を複素Monge–Ampère方程式へ帰着し、連続性の方法の開性・閉性を、$C^0$・二階・三階事前評価と正則性の道筋を含めて証明する。固定Kähler類での解の一意性（ポテンシャルは定数差）と、$c_1(X)_{\mathbb R}=0$でのRicci平坦計量の存在・一意性を得る。

## 直接依存と責務境界

- [CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)：Calabi–Yauの定義、標準束、第一Chern類、quinticの例。Yauの存在証明は本講座が所有する。
- [KAH1](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)：Kählerポテンシャル、Ricci形式、接続と曲率。
- [HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)：大域の$\partial\bar\partial$-補題、調和理論。
- [GA](../plan_done/DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md)、GPDE1〜10：Sobolev、楕円型評価、最大値原理、Schauder評価などを使用箇所の既存定理と照合する。

以下の**14章を確定講数**とする。90分授業の上限ではない。補題の証明が既習範囲で閉じなければ、独立補講を設けるかPLANを明示改訂し、無断で未証明入力扱いにしない。

## 講義構成（14章）

1. **YAU1-01：Calabi予想の精密な主張。** コンパクト連結性・固定Kähler類・$[\rho]=2\pi c_1(X)_{\mathbb R}$というRicci形式の整合条件、定数差を除いた一意性の量化を確認する。
2. **YAU1-02：Ricci形式からポテンシャルへ。** $\partial\bar\partial$-補題、$\rho(\omega')-\rho(\omega)=-i\partial\bar\partial\log(\omega'^n/\omega^n)$、体積正規化を導く。
3. **YAU1-03：複素Monge–Ampère方程式の幾何。** $\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$、$\omega_\varphi^n=e^F\omega^n$ の定義域・楕円性、線形化$\Delta_{\omega_\varphi}$と規約を検算する。
4. **YAU1-04：一意性と正規化。** 二解の差、対数行列式の積分、最大値原理を用いて定数差だけを残す。平均ゼロ等の規約を固定する。
5. **YAU1-05：連続性の方法と開性。** 体積正規化されたパス、線形化の核（定数）、積分条件を組み込んだ関数空間と陰関数定理を明示する。変動する体積測度に対する平均ゼロの扱いを省略しない。
6. **YAU1-06：$C^0$評価I。** 正値性からのLaplacian下界、熱核による平均ゼロGreen核の構成・再現公式、平均ゼロでの上限と$L^1$評価、上限ゼロ規格化への変換を示す。下限の$L^\infty$評価はMoser反復を用いる次章で閉じる。
7. **YAU1-07：$C^0$評価II。** Moser反復の指数列・測度・定数を追い、$\|\varphi\|_{L^\infty}$ の一様有界性まで閉じる。
8. **YAU1-08：二階評価の局所計算。** $\operatorname{tr}_{\omega}\omega_\varphi$、曲率項、$\Delta_{\omega_\varphi}\log\operatorname{tr}_{\omega}\omega_\varphi$ の主要項を導出する。
9. **YAU1-09：二階評価の大域閉包。** 補助関数$\log\operatorname{tr}_{\omega}\omega_\varphi-A\varphi$に最大値原理を適用し、行列式と跡から計量の双側評価を得る。
10. **YAU1-10：三階評価の核心。** Calabi型の三階量、共変微分と交換子の曲率項、最大値原理での吸収を導出する。本系列は古典的$C^3$評価を主証明とし、Evans–Krylovによる$C^{2,\alpha}$評価は代替経路の比較に留める。
11. **YAU1-11：高階評価と正則性。** 三階評価から係数のHölder制御、Schauderブートストラップを適用する条件と導出の閉包を確認する。
12. **YAU1-12：閉性と存在。** 解列のコンパクト性、楕円性の保持、極限の方程式への代入と連続性の方法の結論を接続する。
13. **YAU1-13：Ricci平坦Kähler計量の帰結。** $c_1(X)_{\mathbb R}=0$、指定Ricci形式$\rho=0$、固定Kähler類での一意性を示し、複素トーラス・K3・quinticへ適用する。
14. **YAU1-14：総合証明・仮定の破綻例・演習。** コンパクト性、Kähler正値性、体積整合条件の欠落で証明のどこが停止するかを反例・失敗例で点検し、帰着から存在・一意性まで自力再構成する。

## 14章に確定する根拠・証明の停止線

- Calabi予想の証明は「幾何的帰着・一意性・開性」だけでは終わらず、**一様$C^0$評価、二階評価、三階評価、楕円型正則性、閉性**をすべて接続して初めて完結する。Datarの講義ノート・Collinsの大学院講義・Błockiの完全証明を照合し、核となる事前評価をYAU1-06〜11へ独立配置する。
- **主証明は古典的な三階評価ルート**で統一する。Evans–Krylovによる$C^{2,\alpha}$評価はBłockiの別経路として比較するが、両方の証明を必修にして章数を増やさない。$C^0$評価はGreen関数等の準備とMoser反復の閉包に分け、二階評価も局所恒等式と大域最大値原理に分ける。
- YAU1-14は形式的な復習回でなく、主定理の全証明・仮定の必要性を再構成する総合演習章とする。一般のFano Kähler–Einstein計量の存在（K-stability）、特異解、Kähler類の退化・極限は本講座の外に置く。
- 各章は独習に必要な証明・直接例・詳細解答の単位であり、**14回×90分の授業への圧縮を約束しない**。局所解析の入力が既習GPDE/GAに見当たらなければ、その補題を本系列内で証明して閉じる。

## 文献との照合

- [V. V. Datar, *Lecture Notes on Calabi’s Conjectures and Kähler–Einstein Metrics*（IISc, 2019）](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf)：命題の量化、連続性の方法と開性、二階・三階・$C^0$評価。
- [Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*（Toulouse講義）](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf)：完全証明の区分、一意性・開性・Moser反復・二階評価・代替の$C^{2,\alpha}$経路。
- [T. Collins, *Geometry of the Complex Monge–Ampère Equation*（Harvard Math 262）](https://people.math.harvard.edu/~tcollins/Math262.html)：$C^2$・$C^3$、$C^0$・Moser反復を分ける教育的配列を照合する。
- [D. Joyce, *Compact Manifolds with Special Holonomy*（Oxford）](https://academic.oup.com/book/53817)：Ricci平坦性と特殊ホロノミーへの帰結・その限界。主定理の解析的存在証明の代替にはしない。

## 実装状況と査読の停止線

YAU1-01はCalabi予想の許容データ・正確な量化・一意性と正規化の区別を実装し、YAU1-02はRicci差公式・大域の実ポテンシャル・体積正規化と基準計量変更時の不変性を実装した。YAU1-03は許容Kählerポテンシャルの正値領域・凸性・開性、対数複素Monge–Ampère作用素、線形化のLaplacian係数、楕円性・凹性・体積整合を実装した。YAU1-04は二解を結ぶ対数行列式積分による一意性、可変係数強最大値原理の証明、エネルギー恒等式との対応、平均ゼロ／上限ゼロ正規化、核の定数性を実装した。YAU1-05は正規化された正の密度パス、固定平均零Sobolev空間、変動体積に関するPoissonの可解条件、Banach空間の局所陰関数論と解集合の開性を実装した。YAU1-06はGA5の熱核からGreen核を構成し、正値性由来のLaplacian下界・上限・$L^1$評価と下限の失敗例を実装した。YAU1-07はMonge–Ampère差の積分恒等式・勾配エネルギー評価・SobolevとPoincaréによるMoser反復を用いてパス上の一様$C^0$評価を実装した。YAU1-08はKähler正規座標での相対跡のLaplacian恒等式、背景曲率項、三階微分平方和による勾配吸収とパス一様の局所対数跡不等式を実装した。YAU1-09は補助関数の最大値原理、最大点での逆跡・行列式上界、$C^0$評価による全点の相対跡上界、密度下界による計量の双側評価と一様楕円性を実装した。YAU1-10はKähler接続差とCalabi型三階量、曲率交換子とRicci微分、相対跡の正項による吸収を組み合わせ、パス一様の三階評価を実装した。本文・metadata・公開目次を同期した。YAU1-11〜14の高階評価・閉性・総合証明および系列横断監査は未完了。進捗の正本は textbook/dream-theater-series/YAU1.yaml とする。

各章の着手時に章別metadata、直接prerequisiteと既存の解析定理の実在するanchorを照合する。各章はA4/B3/C1**以上**と全詳細解答を備え、核心証明の中間式を省かない。新規章自身に現行規約の区分C自己再計算と別観点再読を適用する。**別の完了章の追跡監査は章IDを指定された場合のみ**。講数確定やYAU1-01完成をもって本系列の存在証明や全体完了を宣言しない。
