# DREAM THEATER ローレンツ幾何と大域因果構造 I（LORG系列・講数可変）

作成・分冊: 2026-10-11  
改訂: 2026-10-14（標準教科書・論文との範囲照合、証明と依存の再設計）  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問いと出口

正定値なRiemann計量の「距離・最短路・完備性」をそのまま時空へ移せないのはなぜか。局所的な光円錐の情報から、因果関係、初期値を決定できる領域、大域双曲性まで、何を仮定すれば何がいえるか。

この科目の出口は、**時間向き付きLorentz多様体における局所・大域因果構造を定義・計算し、大域双曲性の定理を仮定付きで使えること**。HPDEが必要とするCauchy超曲面、因果的支持集合、分割の正確な数学的基盤を作る。Einstein方程式の解やブラックホールの物理解釈を主役としない。

## 直接必要な前提・依存と責務

- 既習の正本：GEO1–GEO19の多様体、テンソル、接続、曲率、指数写像、変分・Jacobi場（**Riemann計量の正定値性を使う結論は再利用しない**）。線形代数の符号数・非退化形式。SRELのMinkowski時空は動機と具体例として再導入する。
- 数学的矢印：GEO / SREL → **LORG** → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。GR I/IIはLORGの定義・因果定理を参照する物理分岐。
- LORGが所有：不定符号計量、時間向き、因果集合と因果階層、Lorentz時間分離、achronal集合、依存領域、大域双曲性、Cauchy面・時間関数の幾何。
- [GR I/II](DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md)が所有：Einstein方程式、Schwarzschild/Kerr模型、具体的なブラックホール・Killing/事象/見かけの地平線、Raychaudhuri方程式の物理・エネルギー条件・集束定理・特異点定理の応用。LORGで必要な共役点と測地線幾何は定義するが、これらの物理トピックを重複証明しない。
- [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md)が所有：波動作用素・エネルギー評価・大域Cauchy解・Green作用素。「大域双曲だから解ける」をLORGで先取りして証明したことにしない。

**規約・記号の出発点**：原則、滑らかな連結Hausdorff・第二可算の時空 M（次元 n+1、n≥1）、滑らかな計量 g の符号を (-,+,…,+)、時間向きが指定されたものとする。境界付き多様体・低正則計量・非時間向き可能な例は明示したときだけ扱う。接ベクトルの因果型、向き、許容する曲線の正則性（区分的 C¹ ないし局所Lipschitz）を結果ごとに定め、時空の計量と補助Riemann計量を混同しない。各章の実在前提・canonical anchorは実装時に確認する。

## 教科書との対照と補強の理由（目次・公開解説を照合）

| 教科書・文献 | 実際の扱いと本講座への示唆 | 対応 |
| --- | --- | --- |
| B. O'Neill, *Semi-Riemannian Geometry with Applications to Relativity* (1983), ch. 3, 5, 10, 14 | 半Riemann幾何、変分、Lorentz因果論を別々に積み上げる。Riemann測地線の「最短」を転用しない | 符号数・指数写像→Lorentz長さと最大化へ |
| J. K. Beem, P. E. Ehrlich, K. L. Easley, *Global Lorentzian Geometry*, 2nd ed. (1996) | 因果、Lorentz距離、時空例、完備性・最大測地線を独立に扱う | **時間分離・最大化・完備性の相違**を補強 |
| S. W. Hawking and G. F. R. Ellis, *The Large Scale Structure of Space-Time* (1973), §6.1–6.7 | 因果曲線→achronal境界→因果条件→Cauchy development→大域双曲性 | 境界・依存領域・因果階層の論理順を明示 |
| E. Minguzzi, “Lorentzian causality theory” (2019) | 因果階層、Lorentz時間分離、最大曲線、edge・依存領域を条件付きで体系化 | 教科書より細かな定理仮定と反例の照合先 |
| A. N. Bernal and M. Sánchez, *Smoothness of time functions and the metric splitting of globally hyperbolic spacetimes* (2005) | 大域双曲時空の滑らかなCauchy時間関数・直交分割の到達点 | 旧案の「分割」の証明範囲を正確に指定 |

参照（本文の代用品ではない）：
- https://shop.elsevier.com/books/semi-riemannian-geometry-with-applications-to-relativity/oneill/978-0-12-526740-3
- https://www.routledge.com/Global-Lorentzian-Geometry-Second-Edition/Beem-Ehrlich-Easley/p/book/9780824793241
- https://www.cambridge.org/core/books/large-scale-structure-of-spacetime/contents/F6CFDA827F5D549112E3845809887685
- https://link.springer.com/article/10.1007/s41114-019-0019-x
- https://arxiv.org/abs/gr-qc/0401112

## 学修順序と候補の学習単位

**LORG1–LORG15は旧案に由来する仮のテーマ番号であり、15講・15週でも章数上限でもない。** 各項目の中に非自明な定理・計算が複数あれば分割する。正式章ID、prerequisite、learning objective、演習数は着手時に実在章との照合後に確定する。

### A. 不定符号計量から局所因果へ

1. **候補LORG1：Lorentz内積・符号数と錐**。Sylvester慣性法則、非退化性、逆Cauchy–Schwarz不等式、将来向き時間的錐の凸性。座標上の直接例・退化形式との反例。
2. **候補LORG2：Lorentz計量と時間向き**。滑らかな計量、時間的/光的/空間的ベクトル、時間向き可能性、未来・過去向きの定義。Minkowski・円筒上の例。
3. **候補LORG3：因果曲線と固有時**。曲線の許容正則性、未来向き、再パラメータ化不変性、Lorentz長さと零長さ。Riemann長さとの決定的な違い。
4. **候補LORG4：Lorentz接続・測地線と指数写像**。既存GEOのKoszul・Jacobi理論のどこが正定値性を使わず成立するか、測地線の局所存在・一意性と法線座標。
5. **候補LORG5：凸正規近傍・局所錐と比較**。指数写像による局所因果特徴付け、局所Lorentz長さの最大化、測地線が一般には大域最大ではないこと。証明には曲線の変形条件を明示。

### B. 因果関係とその位相的・大域的病理

6. **候補LORG6：I⁺/I⁻・J⁺/J⁻・horismos**。曲線による定義、push-up lemmaの局所模型、I⁺の開性、J⁺は一般には閉でないという反例、I⁺・J⁺の包含・境界。
7. **候補LORG7：共形因果構造と因果的凸性**。正の共形因子によるI/Jの不変性と固有時の非不変性、因果的凸開集合、Alexandrov型近傍。
8. **候補LORG8：因果階層**。chronological、causal、distinguishing、strongly causal、stably causal、causally continuous、causally simple、globally hyperbolicの定義・含意。逆が成立しないものを混同しない。
9. **候補LORG9：因果的な反例・病理**。時間方向を周期化した時空の閉時間的曲線、Minkowski時空の点除去による非大域双曲性、有限・無限時間分離や非閉Jの例（仮定を逐一確認）。

### C. Cauchy条件と大域双曲性

10. **候補LORG10：achronal / acausal集合・edge**。二概念の違い、achronal境界、部分Cauchy超曲面の例、局所・大域の違い。
11. **候補LORG11：依存領域D⁺(S), D⁻(S) とCauchy horizon**。非延長可能な因果曲線による定義、初期面の部分集合の具体的なダイヤモンド計算、領域の境界を図と式で確認。
12. **候補LORG12：Cauchy超曲面と大域双曲性**。全ての非延長可能な因果曲線との交差条件（ちょうど1回）、Minkowskiの t=const 面、因果ダイヤモンド J⁺(p)∩J⁻(q) のコンパクト性。**大域双曲性の特徴付けにはcausality等の必要仮定を添える**。
13. **候補LORG13：Lorentz時間分離と最大化曲線**。d(p,q)を未来向き因果曲線長の上限として定義、reverse triangle inequality、上半連続性の条件、globally hyperbolicでの有限性・最大化曲線の存在（Avez–Seifert型）と曲線極限法の役割。測地線完備性と大域双曲性は別物。
14. **候補LORG14：時間関数・Cauchy temporal functionと分割**。因果階層との関係、滑らかな時空分割 g=-β dt²+h_t（β>0）の正確な定理、Geroch / Bernal–Sánchezの証明の鍵と一般定理での未証明部分を峻別。HPDEで用いる誘導計量・未来向き単位法線へ接続。

### D. 総合と後続への橋

15. **候補LORG15：模型・反例・横断演習**。Minkowski、静的積時空、点除去時空、時間周期商を対照し、I/J・D(S)・時間分離・因果条件を同じ表で計算。ローレンツ曲線長・共形変換・非コンパクト性を照合する。

**不足があれば増講する必修論点**：限界曲線補題の局所版→大域版（曲線の再パラメータ化とコンパクト性条件）、achronal境界の生成子、Cauchy超曲面の滑らかさ、Lorentz最長曲線と共役点の関係。複数の核心証明を一章へ押し込まず必要に応じてLORG16以降へ分割する。光線束・Raychaudhuri・地平線の応用はGRに接続し、独立のLORG必須講として水増ししない。

## 必須の数学的到達・証明ゲート

1. **局所の代数と幾何**：Minkowski内積で逆Cauchy–Schwarz不等式を証明し、将来向き時間的錐の凸性と因果曲線の長さ不等式を導く。Lorentz測地線の局所最大化とRiemann最短路の差を明示する。
2. **具体的因果集合**：座標でMinkowskiの I⁺(p), J⁺(p) を求め、有限区間 S⊂{t=0} の D(S) を描いて計算する。端点の含有と未来・過去両側の条件を検算する。
3. **局所→大域の橋**：I⁺の開性・push-up、強因果性と局所因果凸性、限界曲線の使いどころを、仮定と中間補題を指定して証明。大域定理を短い「明らか」で済ませない。
4. **大域双曲性の正確な主張**：Cauchy面・因果ダイヤモンド・時間関数の関係を、定理ごとに時空の正則性・因果仮定・「存在」「任意」を区別。Minkowskiの点除去でコンパクト性破綻を実際に示す。
5. **最大化と分割**：少なくともMinkowskiまたは明示した積時空で時間分離と最大曲線を出発点から導き、Avez–Seifert型一般定理およびBernal–Sánchez滑らか分割を使う箇所は、その核心となる補題・構成を分離して提示する。一般証明まで閉じられない場合は結果先行と明記し、後続で何を仮定して援用できるかを正確に残す。

## 演習・教材の設計

- 主役定義には定義条件を逐一検算する例を置く。図は時空図を補助に使い、縦軸を時間、光円錐の境界・開閉と領域の端点を座標で定義する。SVGの見栄えで数学的包含を証明したことにしない。
- 反例には**落とした仮定→失敗する主張→破綻する証明の一歩**を付す。例：因果ダイヤモンドのコンパクト性を外すと曲線極限を保証できない、など。
- 標準上の最低演習数A4/B3/C1は章ごとに適用し、学習目標に対して不足するなら増やす。証明・全解答を実際に再計算し、数式・stable anchorを結果の使用箇所に置く。
- **現行標準の変更章査読A/B/Cに従う**。新規実装・実質改稿は全件自己査読と別観点再査読。別の完成章の追跡監査は**章IDを指定された場合のみ**行う。PLAN設計だけで実装・査読・公開完了扱いしない。

## 着手時の確認と完了条件

- GEO/SRELの実在結果・stable anchor、既存Lorentz定義との重複、正式ID衝突、HPDE・GRの直接依存を確定する。未執筆PLANの定理を既習・証明済みとして引用しない。
- 各章は中心問い→定義例→仮定付き主張→途中式と核心論証→反例→演習と全詳細解答を満たす。特に高度な大域定理は証明の閉包と結果先行の境界を透明にする。
- 全章・横断監査・必要なmanifest / index / 公開導線・検証が完了するまで計画をdoneへ移さない。
