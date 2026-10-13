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

## 学修構造：証明の依存関係に沿う学習ブロック

以下は**章番号・講数・授業回数を設定したシラバスではなく、概念と証明の依存順序を示す学修ブロック**である。各項目は章に1対1対応しない。定義・定理・核心証明・具体例・演習が自然に閉じる単位で、執筆時に章を分割・統合する。全内容を独習者が再構成できることから必要な章数を決め、正式IDと参照・manifestは実装時に確定する。

### A. 不定符号計量を備えた時空を作る

- **Lorentz内積と符号数**：非退化対称双線形形式、Sylvester慣性法則、逆Cauchy–Schwarz不等式、将来向きの錐の凸性を座標で確かめ、退化形式との差を示す。
- **Lorentz計量と時間向き**：滑らかな計量、時間的・光的・空間的ベクトル、時間向き可能性、未来・過去向きの定義をMinkowski・円筒上の直接例で検証する。
- **因果曲線と長さ**：曲線の許容正則性、固有時、再パラメータ化不変性、光的曲線の零長さとRiemann長さとの差を導く。
- **接続・測地線・局所極値**：GEOのKoszul公式・Jacobi理論のうち正定値性を使わない部分を確定し、指数写像、凸正規近傍、局所因果錐、適切な条件下の局所的なLorentz長さ最大化を構成する。

### B. 因果関係と時空の病理を識別する

- **因果的未来・過去**：I⁺/I⁻、J⁺/J⁻、horismosを曲線から定義し、Minkowskiで境界・内部を計算する。
- **局所から集合への推論**：push-up lemma、I⁺の開性、因果的凸近傍、Alexandrov型近傍を中間補題を明示して示す。
- **共形変換**：正の共形因子による因果関係の不変性と、曲線長・固有時の非不変性を分離する。
- **因果階層の論理**：chronological、causal、distinguishing、strongly causal、stably causal、causally continuous、causally simple、globally hyperbolicの定義と含意を仮定付きで整理する。
- **非含意を示す時空**：時間周期商、点除去、非閉なJや無限時間分離をもつ模型を計算し、失った因果条件がどの補題を壊すか調べる。

### C. 局所情報からCauchy構造と大域定理へ

- **非時間的集合と境界**：achronal/acausalの違い、edge、achronal境界の局所構造・生成子、部分Cauchy超曲面の直接例を扱う。
- **初期値の依存領域**：D⁺(S)、D⁻(S)、Cauchy horizonを非延長可能な因果曲線で定義し、Minkowskiの初期データ区間からダイヤモンドを求める。
- **曲線列の極限**：補助Riemann計量による再パラメータ化、局所コンパクト性、限界曲線補題の局所→大域への拡張に必要な因果仮定を区別する。
- **大域双曲性の特徴付け**：Cauchy超曲面の交差条件、強因果性・因果ダイヤモンドのコンパクト性と同値な定式化の正確な仮定を示す。測地線完備性とは混同しない。
- **Lorentz時間分離と最大化**：d(p,q)を曲線長の上限で定め、逆三角不等式、長さの上半連続性の条件、Avez–Seifert型の最大化曲線の存在を曲線極限法と結びつける。共役点・最大性の関係も位置づける。
- **Cauchy時間関数と時空分割**：時間関数・temporal functionの区別、Geroch / Bernal–Sánchez定理の主張、滑らかな分割 g=-β dt²+h_t（β>0）とCauchy面の幾何をHPDEが使える形で示す。一般定理の核心証明と結果先行部分の境界を明示する。

### D. 反例・総合問題と次科目への受け渡し

- **時空の横断計算**：Minkowski、静的積時空、点除去時空、時間周期商でI/J・D(S)・Lorentz時間分離・因果条件を計算し、結果を比較する。
- **図と解析の整合**：因果図の開閉・境界・非コンパクト性を座標と集合の包含式で検証し、「図で見える」ことを証明の代用にしない。
- **HPDEとの接続**：大域双曲性、Cauchy面、未来向き法線、因果的支持集合の定義と仮定を揃え、波動方程式そのものの存在一意性はHPDEへ引き渡す。光線束・Raychaudhuri方程式・地平線の具体的物理応用はGRに接続する。

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
