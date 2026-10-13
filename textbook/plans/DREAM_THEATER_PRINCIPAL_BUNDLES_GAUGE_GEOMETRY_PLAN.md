# DREAM THEATER 主束・接続・ゲージ理論の幾何（GBG系列・講数可変）

設計: 2026-10-13  
状態: planned（設計のみ。章本文・series manifest・公開は未着手）

## 中心問い

座標ごとのゲージポテンシャルAを貼り合わせると、どのような大域的幾何ができるか。ゲージ変換は何を同一視し、曲率・holonomy・特性類・トポロジカル数はどの条件で不変か。

既存GEOはベクトル束・Levi–Civita接続・微分形式・de Rhamを、LIEはLie群・Maurer–Cartanを扱うが、**主G束・一般接続・随伴束・Chern–Weil理論は既存正本の停止線の外**。QFT IIでYang–Millsの局所公式だけを示しても、大域的非自明性・instantons・異常を数学として説明できない。

## 前提と他講義との担当境界

- 既存GEO2／7〜9／13（束の入口、微分形式、de Rham、接続）、LIE1〜4、GRP／LA／位相、必要に応じて[Lie群の表現](DREAM_THEATER_LIE_REPRESENTATIONS_SPINORS_PLAN.md)。
- 本PLANは主束・ゲージ接続・曲率・holonomy・Chern–Weilの**一般幾何**を所有する。局所Yang–Mills場の量子化、ゲージ固定、ghost、BRST、散乱振幅はQFT II。
- 大域Lorentz幾何は[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)、量子異常の具体的ループ計算と標準模型での相殺はQFT III。一般のAtiyah–Singer指数定理・非可換ゲージQFTの完全構成までこの基幹科目で証明したと宣言しない。
- 平坦Minkowski上の局所ゲージ計算に限るQFT IIはGBG全講を必修にしない。大域的束・topological charge／spin構造の議論で必要な完成章を参照する。

## 候補テーマ（各テーマ=1章固定ではない）

1. 局所積と大域的貼り合わせ：被覆・遷移関数・1-cocycleとその整合式。
2. 主G束、局所自明化、右G作用、局所sectionとゲージ変換。
3. 随伴ベクトル束、随伴束、主束から表現を使った物質場の構成。
4. 主束上の接続1形式、水平分布、局所ゲージポテンシャルの変換則。
5. 共変微分、曲率F、局所式F=dA+A∧A、Bianchi恒等式。
6. 平行移動とholonomy、Wilson loopのゲージ不変性（trace等の条件）。
7. U(1)の非自明な線束、Dirac monopole、パッチ間遷移と第一Chern数。
8. Chern–Weilの構成、特性類と曲率の不変多項式、正規化・積分可能性の仮定。
9. 4次元の第二Chern数／Pontryagin型密度、instantonsへの入口。
10. 結合した場の大域的ゲージ変換、ゲージ変換群とゲージ固定の幾何学的意味。
11. spin構造・spinor束・背景計量依存：障害類を導入する際は必要なコホモロジーを先に定義（一般存在判定のフル証明は発展へ）。
12. 指数と量子異常への橋：topological charge・zero mode・異常の関係に必要な一般結果の**仮定と証明責務を分離**。
13. 局所表示→大域的不変量を往復する模型演習（U(1) monopole・SU(2)の純ゲージ／非自明配位）。

## 必須の検算・証明

- 3重重なりで遷移関数のcocycle条件を確かめ、局所接続の変換則から曲率の共変性を導く。
- U(1) monopoleで北／南パッチのポテンシャル差から量子化条件とChern数を計算し、ゲージポテンシャルの局所正則性と束の大域的非自明性を区別する。
- 曲率のBianchi恒等式と、適切な不変多項式から構成する閉形式を計算する。一般のChern–Weil定理を使う際はその正確な仮定を表記。
- Wilson loopのtraceが基点での共役に対して不変になることを、経路順序／向きの規約を付して示す。
- 「大域的主束上でAが単一の大域Lie環値1形式として存在する」という誤用を避ける。

## 学修・品質・ステータス

- 中心問いと具体的な2つ以上の非自明束の例を軸に章を分割する。一般相対論のLevi–Civita接続の再証明やQFTのゲージ固定計算を重複させない。
- 初出定義→条件確認できる例→主要結果の証明→A4/B3/C1以上の演習と全詳細解答を基本とする。証明の本質部分を省略しない。
- 実装・査読・検証・索引の整合と実在ID・canonical anchorの検証が済むまでplanned。別完成章の追跡監査はユーザー指定時のみ。

## 校正用文献

- John C. Baez & Javier P. Muniain, *Gauge Fields, Knots and Gravity*（主束・接続・Yang–Mills幾何）
- Shoshichi Kobayashi & Katsumi Nomizu, *Foundations of Differential Geometry*, Vol. I（主束・接続・曲率の一般論）
- Mikio Nakahara, *Geometry, Topology and Physics*（特性類・ゲージ理論への接続）
- David Tong, [*Gauge Theory*](https://davidtong.org/teaching/gauge-theory/)（ゲージ理論・monopole・instantons・異常の物理への境界）
