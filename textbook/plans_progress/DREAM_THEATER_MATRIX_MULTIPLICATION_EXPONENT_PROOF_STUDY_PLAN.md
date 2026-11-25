# DREAM THEATER 行列乗算指数とテンソル幾何学 証明研究講読 計画

構成確定日: 2026-11-25 JST
状態: in progress（第1講実装、残り31講）
系列ID: MMX（series manifest 登録済み）
講数: **全32講**（既存基礎科目・EOM横断4講を含まない）

## 1. 中心問いと停止線

任意の体 $F$ 上の形式的算術回路における正方行列乗算指数 $\omega_F=9/4$ という2026年11月24日版の主張について、既知の上界・新しい下界を分離して研究読解する。教科書的な行列積から始めるが、定義・証明の正本は既存ACOMP/TSP等に置く。上界の発見と下界の証明、有限サイズのrank・border rank・漸近rank、算術演算とbit complexity・浮動小数点実測を混同しない。$\omega$ は上界指数の下限であり、任意の $\varepsilon>0$ に対する $O_{F,\varepsilon}(n^{9/4+\varepsilon})$ と、ちょうど $O(n^{9/4})$ の達成を区別する。有限体上でも形式多項式／有理関数恒等式を要求し、多項式関数だけの一致で代用しない。

下界論文の証明には同日版の Euclidean geometry と Circuit lower bounds が必要である。AnthropicのVP/VNP論文（VNP系列）は別の著者・別の証明であり、類似のpriceや圧縮を同一補題として無条件に流用しない。関連論文のうち本定理に必要な部分をMMXで扱い、ハミルトン閉路・permanentの全定理やsunflower等は独立の中心問いなのでこの32講に追加しない。

## 2. 前提・再利用・実装順序

[VP/VNP横断ルート](../plans/DREAM_THEATER_VP_VNP_ROUTE_PLAN.md)で計画済みの基礎5系列（GCT16、ACOMP24、TSP16、NPCG12、FML7、計75講）から直接必要な章だけを選択履修する。VNP24講の完成をMMX全体の必修とせず、MMXにもVNPを依存させない。既存LA・AG（体、局所化、Zariski閉包）、COMB・INFO（条件付きentropy）、FOU、QFT（外積・フェルミオンの符号）、LREP等は対応する章とanchorを実装時に確認する。特に有限生成環の有限体への特殊化、非Archimedes付値、ultralimit、球面テンソル、sorting network、tagged permutation、符号付き計数は未導入なら下表の担当講で具体例・補題から導入する。新規一般基礎系列を増やさず、必要な橋渡しはMMX内で完結させる。

各行の前提に科目内の直接依存だけを挙げる（推移的依存は重複しない）。関連正本の未完成章はplannedのままとし、名称だけで前提充足と判定しない。

## 3. 確定講義構成（32講）

| ID | 中心問い・証明責務 | 直接前提／既存正本 |
| --- | --- | --- |
| MMX1 | 行列積の算術モデル・指数のinfimum、出力サイズ、Strassenの7積を全展開、再帰・paddingとビット計算との差 | LA、ACOMP1–4、TSP7–9、TSP14（指数の正本と回路モデルの比較） |
| MMX2 | 双線形分解と行列積テンソル、冪と漸近rank、通常rankの定数倍下界と指数下界の違い | MMX1、TSP2–9,14 |
| MMX3 | 上下界の古典史：Biniの補間、Schönhage漸近和不等式、laser法・手法限定障壁の量化 | MMX2、ACOMP21–22 |
| MMX4 | 多項式乗算テンソルと次数profile・補間、スペクトル点への評価 | MMX3、TSP10–14 |
| MMX5 | 共有脚をもつ独立ブロックの分離・退化、複素数上の9/4上界の中心不等式 | MMX4 |
| MMX6 | 任意標数の分離補題、任意の体への9/4上界、Amanov–van den Berg–Zuiddamの証明とShpilka解説の照合 | MMX5、ACOMP4,21–22 |
| MMX7 | 長方形乗算・dual exponentの定義、既知上界と平方の場合の関係、指数の正規化 | MMX6 |
| MMX8 | price・wire・共通ラベル・局所restriction：辺長の和とrank分解の不等式、Euclid三角形の比2 | MMX2、TSP10–16 |
| MMX9 | Euclidean geometry companion：compatible spectral system、mean width、Gaussian表示、flat lawの証明と共有ラベルの増分 | MMX8、INFO、NPCG1–8 |
| MMX10 | spectral priceの曲率・完備化・ultralimit・積・合同と拡張条件、Euclid flatと非平坦空間の違い | MMX9、NPCG3–12 |
| MMX11 | portsの定義、グラフの非線形Poincaré、catalyst・protocolと幅の評価、二分岐の論理 | MMX10、GCT14–16 |
| MMX12 | companionのcompressor・exact・descent：タグ付き置換をoracleにしたネットワーク圧縮、サイズと複製数の台帳 | MMX11、TSP6 |
| MMX13 | Circuit lower bounds companionの比較・entropy・product theorem：no-ports側のグラフentropy boundを導く | MMX10–11、INFO |
| MMX14 | 同 companionのmodel/compress/gap/batch：ports側の符号付き普遍計数テンソルと厳密なbatch下界、その証明依存と対角線論法 | MMX12–13、GCT15–16、ACOMP6–12 |
| MMX15 | trivalent bit tensorの体積・境界、Batcher sorting network、比較・交換・fanout・隣接非一致で初期サイズを構成 | MMX2、TSP6、GCT |
| MMX16 | tagged permutationへの二つのdistinctness testによる帰着、signed selectorの恒等式（標数2も含む） | MMX15 |
| MMX17 | no-ports側の一様宛先下界：距離表の凸性・minimax・条件付きentropy・平方根log評価 | MMX13,16 |
| MMX18 | ports側のリスト下界：oracle descentとbatch下界の合成、$1\le t\le2^w$ の一様性とパラメータ選択 | MMX12,14,16 |
| MMX19 | 臨界tripodの腕とラベルrate、rectangular decoderと多項式乗算のrigidity、比 $6/(8/3)=9/4$ の位置づけ | MMX7–11 |
| MMX20 | valued・motion：付値・衝突・極限、siteの動きからhomogeneous tripodへの帰着 | MMX19、ACOMP21 |
| MMX21 | boundary・contact・sync：厳密saving仮定から動きを排除し、複数のtensorを同じprice拡張で評価する | MMX20 |
| MMX22 | fermions・sphere：外積の縮約と符号、marked pointで定義される球面テンソル、衝突時の分解と脚幅 | MMX21、LA/QFTの対応正本 |
| MMX23 | sphere・incidence：最安の共通siteへの輸送コスト、脚幅を指定した漸近priceとincidence不等式 | MMX22 |
| MMX24 | sorting：stable sorting・batched table lookup、$2^u$ recordsで幅$O(u)$、$p<2$ の指数台帳 | MMX15,23 |
| MMX25 | sorting後半・local：wide recordのコスト、seamを跨ぐ挿入、stationの統合と二乗脚幅の制御 | MMX24 |
| MMX26 | rounds：局所arity集中を反復してnetwork volumeを削る、各roundの仮定・サイズ・誤差 | MMX25 |
| MMX27 | assembly・shaving：代替配線の符号化、routing・lookup・和の費用、複製数$d\le n^{o(1)}$と圧縮定理の証明 | MMX24,26 |
| MMX28 | obstruction：圧縮を定数回反復、$x_{j+1}\le h^{-\gamma}x_j+h^\eta$ とリスト下界の矛盾、有限体下界を閉じる | MMX17–18,27 |
| MMX29 | formal circuitの双線形化：二重切断変数による積・商の係数式、有限生成係数環の有限体への特殊化、全体への移送 | MMX28、ACOMP1–5,21 |
| MMX30 | 有限サイズのgate/rank/border rank・漸近rank、Zariski閉包の冪と体拡大、tight tensor予想への反例の検算 | MMX6,29、TSP8–14 |
| MMX31 | 長方形指数：原論文の帰結とLean scopeのより強い公式を区別、dual exponent・正方極限・軸境界・rigidityの依存を追う | MMX7,30 |
| MMX32 | 総合証明監査：全論文の依存台帳、Lean statement・公理・固定版・再ビルド・独立検証、数値性能とAI研究への非含意 | MMX28–31、FML3–7 |

配分: 古典・上界7 + 幾何と関連下界7 + リスト下界4 + 球面テンソル5 + 圧縮4 + 下界閉包・帰結・監査5 = **32講**。研究論文のページ数で均等割りせず、中心的な補題を独習者が検算できる単位で確定した。MMX15–18はソート・ルーティングの橋渡しと下界、MMX19–23は新規幾何、MMX24–27は構成の費用解析を所有する。MMX8–14でVNPの類似概念を必要に応じて参照するが、新版の原文の定義・命題を別に照合する。

## 4. 主要定理・証拠台帳

- 正方版（論文intro/obstruction/consequences）：$\omega_F=9/4$、$n\ge2$ の非スカラー乗算・除算ゲート下界 $\lceil n^{9/4}/2\rceil$、双線形rankと幾何的border rankの下界 $n^{9/4}$、漸近rankの等式。非スカラー除算を含む論文のモデルとLeanのdivision-free形式恒等式モデルの差を記録する。
- リスト：$2^w$個の$2w$ bit語、$n_w=2w2^w$。ある$\sigma>0$について十分大きい$w$、全$1\le t\le2^w$で $\operatorname{vol}_k(D_w^{\otimes t})>tn_ww^\sigma$。通常のRAMの重複判定下界ではない。圧縮定理の$e\ge n$、$m\le n^{1.05}$、固定$\eta>0$、$d\le n^{o(1)}$の一様性を落とさない。
- 上界は10月2日版（複素数）と任意標数への拡張・独立の解説を分離。下界は11月24日版を対象にする。古典的な $\omega\ge2$ と有限サイズの二次の定数倍下界は別の事実。tight tensorのsupport条件・flatteningと漸近rankを区別する。
- 長方形：11月24日正方論文のcorollaryは $\max\{ab,bc,ca,(abc)^{3/4}\}$ と $1/2\le\alpha_F\le2/3$。一方Lean scope 107は $\alpha_F=1/2$ と、正の指数重みを降順に$x\ge y\ge z>0$とした場合の式
  $$\omega(F;a,b,c)=x+y+\frac{[\max(0,(x+y)z-xy)]^2}{4xyz}.$$
  正方版論文だけでこの公式が示されたと扱わず、Leanの関連定理・rigidityと別資料を追う。$x=y=z=1$、$x=y=1$かつ$z\le1/2$、$z=0$の別扱いを検算する。
- 原論文の主張、参照補題、証明の再構成、Lean statement matching、kernelチェック、追加公理・sorry、第三者の独立評価、査読出版を別欄に記録。本設計ではLean実行・全証明の独立再検証をしていない。未確認研究claimは既知の無条件定理として他科目に輸出しない。VP/VNP・P/NP・ETHと論理的に区別する。

## 5. 市販教科書・公開テキストによる校正基準

- Bürgisser, Clausen, Shokrollahi, [Algebraic Complexity Theory](https://link.springer.com/book/10.1007/978-3-662-03338-8)：multiplicative/bilinear complexity、行列乗算の漸近複雑性。MMX1–7,29–31。
- Landsberg, [Geometry and Complexity Theory](https://www.cambridge.org/core/books/abs/geometry-and-complexity-theory/contents/6DF28D133C6025F288E8ECBF0660C8D7)：第2–5章の行列乗算rank下界・漸近上界・幾何による分解・テンソルの複雑性。MMX2–5,30。
- Wigderson–Zuiddam, [Asymptotic Spectra: Theory, Applications, and Extensions](https://doi.org/10.1090/bull/1880)：半環・漸近双対性、graph tensor、tensor network compression。MMX4,8–14,24–27。新規price定理を古典的スペクトル双対性だけから自明としない。
- Bridson–Haefliger, [Metric Spaces of Non-Positive Curvature](https://link.springer.com/book/10.1007/978-3-662-12494-9)：測地線・CAT(0)・凸性・群作用。MMX9–11,17,19–21。
- Knuth, [The Art of Computer Programming, Vol. 3: Sorting and Searching](https://www-cs-faculty.stanford.edu/~knuth/taocp.html)（[日本語版](https://www.kadokawa.co.jp/product/312356800000/)）：比較・ソート・sorting networksの基礎。MMX15,24–25。Batcherのネットワークと一般RAMを区別する。
- 上記の公開目次・出版社の記述を設計に使用した。商用書籍の本文全体を読了・転載したわけではなく、実装時は該当節の定義と証明を参照し独自の例題で再構成する。研究固有の定理の出典は下記一次資料に限定する。

## 6. 一次資料（2026-11-25確認）

- OpenAI, [The matrix multiplication exponent is nine fourths, 2026-11-24](https://github.com/openai/math/tree/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026)（build/main.tex、intro、obstruction、consequences、history、list、prices〜shaving）。
- OpenAI, [Euclidean geometry in the asymptotic spectrum of tensors](https://github.com/openai/math/tree/main/preprints/Euclidean-geometry-in-the-asymptotic-spectrum-of-tensors-November-24-2026)、[Circuit lower bounds for Hamiltonian cycle and the permanent](https://github.com/openai/math/tree/main/preprints/Circuit-lower-bounds-for-Hamiltonian-cycle-and-the-permanent-November-24-2026)（ともに2026-11-24）。
- OpenAI, [An Upper Bound of 9/4 for the Matrix Multiplication Exponent](https://github.com/openai/math/tree/main/preprints/Matrix-Multiplication-Nine-Fourths-October-2-2026)；Amanov, van den Berg, Zuiddam, [Multiplying matrices via polynomials: exposition and barriers](https://arxiv.org/abs/2610.30054v1)；Lü, [Polynomial separation of a shared tensor leg and matrix multiplication in arbitrary characteristic](https://arxiv.org/abs/2610.18914)；Shpilka, [exposition and explicit algorithm](https://eccc.weizmann.ac.il/report/2026/281/)（下界論文のbibliographyに基づく関連資料）。
- [Lean scope 107](https://github.com/openai/math/blob/main/lean/docs/107.md)、[ExactExponent.lean](https://github.com/openai/math/blob/main/lean/OAI/LinearAlgebra/SpectralBooks/ExactExponent.lean)、[Comparator statement](https://github.com/openai/math/blob/main/lean/ComparatorChallenges/MatrixExponent.lean)。論文の版とLeanのimport tree、実行環境、statement一致を実装時に固定する。
- [EOM横断4講](../plans/DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md)、[TSP基礎16講](../plans_progress/DREAM_THEATER_TENSOR_ASYMPTOTIC_SPECTRUM_PLAN.md)。

## 7. 完成条件

- [x] 初回実装としてplans_progressへ移し、MMX manifestに全32講を登録。未実装章は公開目次に先行登録しない。
- [ ] 全主要定義は使用前に導入、主定理・中間補題の仮定、添字、標数、次数、指数、定数依存、極限を検算。各講原則A4/B3/C1以上の独自演習と詳細解答（計算・反例・証明の再構成）。
- [ ] 研究依存台帳を上界・geometry・circuit companion・下界・Leanに分け、閉じた証明と未検証・外部依存を明示。証明全体を独立再構成できない箇所を「明らか」としない。
- [ ] 既存正本・章ID・chapter.yaml・knowledge.yaml・prerequisite・anchor、KaTeX、concept/knowledge/exercise/Pages検証、横断査読を完了してからplan_doneへ移す。
