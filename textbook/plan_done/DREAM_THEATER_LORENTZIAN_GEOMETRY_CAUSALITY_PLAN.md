# DREAM THEATER ローレンツ幾何と大域因果構造 I（LORG系列・全21講）

作成・分冊: 2026-10-11  
改訂: 2026-10-14（標準教科書・論文との範囲照合、証明と依存の再設計）  
状態: completed（2026-10-15：全21章の実装・公開導線・系列横断整合監査、最終章LORG21の追跡監査と改善を完了）

## 中心問いと出口

正定値なRiemann計量の「距離・最短路・完備性」をそのまま時空へ移せないのはなぜか。局所的な光円錐の情報から、因果関係、初期値を決定できる領域、大域双曲性まで、何を仮定すれば何がいえるか。

この科目の出口は、**時間向き付きLorentz多様体における局所・大域因果構造を定義・計算し、大域双曲性の定理を仮定付きで使えること**。HPDEが必要とするCauchy超曲面、因果的支持集合、分割の正確な数学的基盤を作る。Einstein方程式の解やブラックホールの物理解釈を主役としない。

## 直接必要な前提・依存と責務

- 既習の正本：GEO1–GEO19の多様体、テンソル、接続、曲率、指数写像、変分・Jacobi場（**Riemann計量の正定値性を使う結論は再利用しない**）。線形代数の符号数・非退化形式。SRELのMinkowski時空は動機と具体例として再導入する。
- 数学的矢印：GEO / SREL → **LORG** → [HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) → [MICA](../plans/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)。GR I/IIはLORGの定義・因果定理を参照する物理分岐。
- LORGが所有：不定符号計量、時間向き、因果集合と因果階層、Lorentz時間分離、achronal集合、依存領域、大域双曲性、Cauchy面・時間関数の幾何。
- [GR I/II](../plan_done/DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md)が所有：Einstein方程式、Schwarzschild/Kerr模型、具体的なブラックホール・Killing/事象/見かけの地平線、Raychaudhuri方程式の物理・エネルギー条件・集束定理・特異点定理の応用。LORGで必要な共役点と測地線幾何は定義するが、これらの物理トピックを重複証明しない。
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

## 講義計画（**全21講：LORG1〜LORG21**）

**本PLANの執筆単位は21章に確定する。** 章IDは `LORG1` から `LORG21` まで連番で使用し、以下を実装順序・担当範囲の正本とする。これは旧15講への数合わせではない。Lorentz計量・因果階層・限界曲線・大域双曲性・時間分離・時間関数という**異なる証明機構**を分けた結果の21講である。各講に動機・主要定義の直接例・核心論証・演習と全詳細解答を置き、補題の必要数は講内で調整する。内容の不足が判明した場合は証明を削って定数の21に押し込まず、PLAN改訂で章ID・直接参照を明示的に更新する。**着手時に章数を再決定する必要はない。**

### 第I部：計量・測地線・局所因果（LORG1〜LORG5、5講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| LORG1 | Lorentz内積と未来錐 | Sylvester慣性法則を復習し、不定値内積・逆Cauchy–Schwarz不等式・未来錐の凸性をMinkowski座標で証明する。 |
| LORG2 | Lorentz計量と時間向き | 時間的・光的・空間的ベクトル、滑らかな時間向き、時間向き可能性を定義し、Minkowskiと時間方向の商の例で検算する。 |
| LORG3 | 因果曲線とLorentz長さ | 未来向き曲線の許容正則性、固有時と再パラメータ化不変性を導き、光的曲線の零長さ・Riemann長さとの違いを示す。 |
| LORG4 | Lorentz接続と測地線 | Koszul公式・測地線方程式・指数写像を非退化性の下で導き、正定値性に依存しないGEOの結果を特定する。 |
| LORG5 | 凸正規近傍と局所最大化 | 法線座標、局所光円錐、時間的測地線の局所長さ最大化を証明し、大域最大化への無条件拡張が誤りであることを示す。 |

### 第II部：因果集合と因果階層（LORG6〜LORG11、6講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| LORG6 | 因果的未来と過去の集合 | I±・J±・horismosを曲線で定義し、Minkowskiで内点・境界・開閉を座標計算する。 |
| LORG7 | push-up補題とI±の開性 | 局所曲線変形からpush-up補題とI±の開性を導出し、J±が一般には閉でない模型を検討する。 |
| LORG8 | 共形因果構造と局所因果凸性 | 共形再尺度でI/Jが不変で固有時が変わることを証明し、因果的凸近傍とAlexandrov近傍を具体化する。 |
| LORG9 | 因果階層 I：chronologyとcausality | chronological・causal・distinguishingの関係を整理し、閉時間的・閉因果曲線の反例で逆含意を吟味する。 |
| LORG10 | 因果階層 II：strongとstable | 強因果性、安定因果性、時間関数の関係を正確に述べ、局所因果凸性が役立つ箇所を説明する。 |
| LORG11 | 因果階層 III：continuityとsimplicity | 因果連続性・因果単純性の定義と含意を検証し、非閉なJ等の病理で逆含意が失敗する仕組みを扱う。 |

### 第III部：Cauchy構造と大域幾何（LORG12〜LORG20、9講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| LORG12 | achronal集合・edge・achronal境界 | achronalとacausalの違い、edgeの定義と局所例を検算し、achronal境界・光的生成子の基本性質を導く。 |
| LORG13 | 依存領域とCauchy horizon | D±(S)とCauchy horizonを非延長因果曲線で定義し、初期区間から未来・過去の依存ダイヤモンドを計算する。 |
| LORG14 | 限界曲線補題 | 補助Riemann計量による曲線の再パラメータ化、局所コンパクト性・部分列収束を積み上げ、適用の因果仮定を整理する。 |
| LORG15 | Cauchy超曲面の定義と具体例 | すべての非延長因果曲線との一意交差を検証し、Minkowskiの時刻一定面・非例を計算する。 |
| LORG16 | 大域双曲性の特徴付け | Cauchy面存在と因果ダイヤモンドのコンパクト性の特徴付けを、causality等の仮定付きで接続し、点除去時空を反例にする。 |
| LORG17 | Lorentz時間分離とLorentz長さの極限 | 時間分離d(p,q)、逆三角不等式・連続性/半連続性の必要仮定を調べ、Minkowskiで距離公式を算出する。 |
| LORG18 | 最大化因果曲線とAvez–Seifert | 大域双曲性・限界曲線・長さ半連続性から最大曲線の存在を追い、共役点と極大性・完備性の違いを説明する。 |
| LORG19 | Cauchy時間関数の存在 | Geroch型時間関数の狙いと連続Cauchy時間関数の構成の核を示し、時間関数の単調性・Cauchy性を区別する。 |
| LORG20 | 滑らかな時空分割 | Bernal–SánchezのCauchy temporal function・g=-βdt²+h_t の定理を正確な条件で提示し、滑らかな面・単位法線をHPDEへ渡す。 |

### 第IV部：模型・反例・後続接続（LORG21、1講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| LORG21 | 時空模型の総合演習とHPDE接続 | Minkowski・静的積・点除去・時間周期商でI/J・D(S)・時間分離・因果階層を総合検算し、HPDEの必要前提を確定する。 |

### 初回実装・講間依存

- **LORG1〜LORG21は実装済み。残工程は系列横断監査と最終完了判定**。LORG1ではLorentz内積・未来錐を、LORG2では滑らかなLorentz計量・時間向きの大域選択・時間反転商の障害を導出した。LORG3ではLORG2の時間向きを前提に因果曲線とLorentz長さを定義し、区分的C¹曲線の長さ不変性とMinkowskiでの端点長さ不等式まで証明した。LORG4では非退化性によるLevi-Civita接続の存在一意性、測地線の因果型保存、平行移動と指数写像を導き、測地完備性・大域単射性の反例を扱った。LORG5では凸正規近傍の存在、Lorentz版Gaussの補題、Gaussian正規座標からの時間的測地線の局所固有時最大化、平坦円筒の大域反例を証明した。LORG6では因果集合の定義とMinkowskiの錐を計算し、LORG7では局所摂動によるpush-up・時間的未来の開性・非閉なJの反例を扱った。LORG8では共形因果不変性と長さの変化、Alexandrovダイヤモンドの因果的凸性、相対的な局所近傍と時間周期商の反例を扱った。LORG9ではchronological・causal・distinguishingの含意と、閉光的曲線を持つ円筒・一点除去円筒での逆含意不成立を検算した。LORG10では強因果性とAlexandrov近傍基底の同値、temporal functionからの安定因果的計量の明示構成、点除去円筒での局所再侵入を扱った。LORG11では反映性と両側外側連続性、因果単純性から因果連続性への含意、体積関数を用いた時間関数、一点除去Minkowskiの逆含意反例を扱った。LORG12ではachronal/acausalの区別、edgeの局所検算、achronal境界のグラフ・edge不在と光的生成子を扱った。LORG13では依存領域の全称条件、Minkowski交点補題、有限区間のCauchy horizon、点除去時空を検算した。LORG16では因果ダイヤモンドのコンパクト性とGeroch型体積関数の構成、依存領域定理を用いたCauchy面の特徴付けを扱った。LORG14では補助Riemann弧長、局所因果錐の閉性、コンパクト抽出と対角法、非延長な限界曲線、有界弧長の端点収束を証明した。
- LORG2以降は、原則として当該講以前の必要結果のみを使用し、未完成の後続結果を証明へ逆輸入しない。とくにLORG14の限界曲線→LORG16/18の大域結果、LORG19/20の時間関数→HPDEの時間分割という直接依存を保持する。
- `textbook/plan_done/` へ移動済み。LORG1〜LORG21の本文・系列manifest・公開導線を整備した。LORG21では四時空模型を比較し、空間周期の静的積、点除去の全初期スライス、時間周期商を総合検算してHPDEへの幾何学的入力を整理した。系列横断の構造・参照整合を確認し、LORG21の追跡監査で見つかった証明・説明の不足を補強した。完了判定の根拠は末尾の「最終監査記録」に記す。

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
- LORG1〜LORG21の全21章・横断監査・必要なmanifest / index / 公開導線・検証が完了するまで計画をdoneへ移さない。

## 最終監査記録（2026-10-15）

- **対象と完了状態**：`dream-theater-series/LORG.yaml` の LORG1〜LORG21 は全21章 `completed`。全21章の `chapter.yaml` ID・exercise_counts と `knowledge.yaml` chapter・`coverage: complete` を照合し、章内の全演習anchorと詳細解答の対応、主要 proof / solution マーカーの対応を検査した。いずれも欠落なし。
- **章間依存**：全21章の LORG 内 `chapter.yaml` / `knowledge.yaml` prerequisites と本文の LORG 系列リンクを抽出し、後続章から先行章への逆輸入・未来章依存がないことを確認。章内の相対 anchor はすべて解決。LORG21 で実際に援用した他章の anchor 41件は対応する実本文に存在することを確認した。
- **公開導線**：`textbook/dream-theater-index.json` と `textbook/dream-theater.md` に LORG1〜LORG21 の全章が登録されていることを照合。共通ルーティングファイルの個別系列進捗は変更しない。
- **数学内容の重点横断照合**：LORG21で使用する LORG3（端点長さ不等式）、LORG6（到達関係）、LORG10・11（因果階層）、LORG12（achronal）、LORG13（依存領域）、LORG15・16（Cauchy面・大域双曲性）、LORG17・18（時間分離・最大化）、LORG20（temporal function・直交分割）の定義・仮定と使用箇所を照合。特に「D(S)=M でも Cauchy面でない時間周期商」と「時間的勾配を持つが Cauchyでない点除去」を区別した。
- **LORG21の追跡監査**：本文全8節、主要命題3件（`prop-lorg21-static-cylinder`、`prop-lorg21-punctured-domain`、`prop-lorg21-time-periodic`）と全11題 A01〜A05/B01〜B04/C01〜C02 の詳細解答を再計算。静的積の持ち上げ整数の量化、点除去での Lorentz 長さ等号条件と光的端点の列、逆計量の座標基底から双対基底への橋渡し、Cauchy面不在の根拠を改訂。詳細な中間式と変更区分Bの再査読証拠は対応PR本文を参照。
- **監査の限界**：本記録の科目横断監査は全21章の構造・依存・参照整合と終端章に集約された主要結果の仮定の照合であり、別章20章の全証明・全演習を独立に再計算し直したものではない。査読実施者は同一ChatGPT担当による数理検算と別観点再読であり、第三者独立査読ではない。CIはマージ前のPR統合結果で確認する。
