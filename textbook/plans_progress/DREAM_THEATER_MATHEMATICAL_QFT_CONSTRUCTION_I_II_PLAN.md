# DREAM THEATER 量子場の数学的構成 I・II（MQFC1–48・全48講）

設計: 2026-10-13／講義数確定・文献校正: 2026-11-24  
状態: in progress（章ごとの進捗正本は[MQFC manifest](../dream-theater-series/MQFC.yaml)）

## 1. 中心問いと到達目標

無限自由度の量子場は一般に作用素値分布であり、点ごとの積、対角制限、cutoff除去、解析接続は自動的に定義されない。どの対象をどの仮定から構成できるかを、非摂動的なEuclid構成と形式摂動的な局所くりこみの二方向から学ぶ。

**I＝MQFC1–30（30講）、II＝MQFC31–48（18講）、計48講を確定**する。旧I/II各12候補は証明機構ごとに再編し、Iにスペクトル・低次元相互作用模型・格子ゲージ・二極限を増補する。IIは対角延長、因果帰納、ゲージ対称性を独立して再現できる粒度にする。章IDは設計上の予約であり、着手時に衝突確認を行う。科目の一律必修化や講数のための水増しはしない。

Iの最終目標は、任意のコンパクト単純Lie群に対する非自明な4次元純Yang–Mills理論の存在と正の質量ギャップというClay公式問題を数学的に定式化し、既知の定理・検証可能な模型・未確立の推論を区別できること。IIの最終目標は、形式摂動的な局所量子場を次数ごとに構成する方法とその限界を理解すること。**両科目の修了は4D Yang–Millsの質量ギャップの証明を意味しない。**

## 2. 前提・正本・履修経路

- 基礎はFA・QM（スペクトル定理、非有界作用素、半群、CCR）、FOU・GPDE（Schwartz空間、緩増加分布、Sobolev）、測度・確率・確率過程、SM（Gibbs測度、相関、熱力学極限）、複素解析。章ごとの実在する前提定義・定理・anchorは執筆前に照合する。
- QFT1–6・9・19–20（自由場、Wick、Euclid化）をIの物理的動機に、QFT22–30・39–42（反項、RG、ゲージ・異常）をIIの計算上の接続に、QFT46を格子の動機に使う。QFT全64講を一律前提にはしない。
- [AQFT](../plan_done/DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md) のAQFT2–12は局所net・状態・正エネルギー・自由場・GNSの正本。[MICA](../plan_done/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md) のMICA3–7・11–15は波面集合、積・引戻し、Hadamard条件と点分離の正本。[HPDE](../plan_done/DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) は因果伝播の正本。IIでは必要な章のみ直接依存する。
- [GBG](../plan_done/DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md) のGBG8・10–11・13–17・27は接続・曲率・ゲージ軌道・holonomy・Wilson loop・古典作用の正本。Iの後半でコンパクト群の表現・Haar測度とともに利用する。一般のHaar積分・Peter–Weyl定理の既習範囲を実装時に確認し、未習の必要部分はMQFC20で導入する。
- MQFCはWightman階層とEuclid確率測度・OS再構成、スペクトルギャップへの橋、非摂動的有限格子構成・一様評価の模型、分布の対角延長とEpstein–Glaser型くりこみを所有する。MICAのHadamard点分離と相互作用の時間順序積の延長を同一視しない。AQFTの代数一般論やGBGの古典幾何、QFTの物理的ループ計算は再執筆しない。
- IはMQFC1–18（スカラー場の構成）→19–30（ゲージ理論）と進む。IIはIのうちMQFC1–4・7・14の必要部分とMICA・HPDE・QFTを前提に開始でき、Iの格子後半を全て必修にしない。MQFC48の比較でIの結果を参照する。QCURV・HOLOへの全科目必修化はしない。

## 3. 数学的量子場 I：公理・Euclid場・非摂動構成（30講）

表の章参照は設計上の依存であり、外部前提は第2節の対応する既存正本を加える。主な証明・直接例を到達目標として固定する。

| 章ID | 中心問い・内容 | 本文で再現する主要論証・直接例 | 系列内前提 |
|---|---|---|---|
| MQFC1 | 場をなぜ試験関数で平均するか：Schwartz空間・緩増加分布・核 | デルタ分布・微分・Fourier変換、点評価や積が失敗する例。核と正値型の区別 | — |
| MQFC2 | 作用素値分布と共通稠密定義域 | 自由Fock場を有限粒子部分空間でsmearし、随伴・真空期待値の連続性を評価 | 1 |
| MQFC3 | Wightman公理とスペクトル条件 | 真空、巡回性、Poincaré共変性、局所性、正値性、スペクトル条件を自由場で照合 | 2 |
| MQFC4 | Wightman再構成と解析性 | 試験関数列の代数、正値形式、零空間商、作用素の共通領域を構成。管状領域の解析性は必要条件を示す | 3 |
| MQFC5 | Euclid自由場の共分散 | Fourier乗数、逆楕円作用素、熱核表示、正値性を導出しm>0と赤外条件を区別 | 1 |
| MQFC6 | Gaussian測度をどう作るか | 有限次元・格子で正規化と特性関数、核空間SでBochner–Minlosの仮定を照合 | 5 |
| MQFC7 | Schwinger関数とGaussianの全モーメント | 特性汎関数の微分からWick対分割、連結相関・cumulantを導出 | 6 |
| MQFC8 | 反射陽性はなぜ成り立つか | 正時間支持の自由共分散を空間Fourier変換し、指数核から正半定値性を証明。Gaussian多項式へ拡張 | 5–7 |
| MQFC9 | OS Hilbert空間と時間並進半群 | 反射内積・零空間商・完備化、時間並進がwell-definedな対称縮小半群となる条件、生成作用素H≥0 | 8 |
| MQFC10 | OS公理から相対論的場へ | 1973/1975の再構成条件（増大条件を含む）を区別し、自由場でSchwinger→Wightmanを計算。一般定理の証明地図 | 3–4, 7–9 |
| MQFC11 | 粒子質量とスペクトル測度 | Källén–Lehmann表示の正値スペクトル測度の導出、自由場の質量殻と連続スペクトルの比較 | 3, 9–10 |
| MQFC12 | 質量ギャップと指数的相関減衰 | 真空直交補空間でのスペクトル定理、連結Euclid時間相関のLaplace表示、指数評価の逆向きに必要な稠密性 | 9–11 |
| MQFC13 | cutoff・体積・極限の構成 | 有限体積・UV正則化、確率測度のtightness、分布収束とモーメント一様可積分性の違いを反例で示す | 6–7 |
| MQFC14 | Wick積と発散する自己収縮 | Gaussian Wick多項式・共分散とL²評価、2D/3D共分散特異性を比較。有限cutoffと分布としての極限 | 5–7, 13 |
| MQFC15 | 相互作用測度を作る：P(φ)₂ | 下に有界な偶数最高次多項式、Wick順序、有限領域Gibbs密度の正規化と反射陽性の保存条件 | 8, 13–14 |
| MQFC16 | P(φ)₂のUV除去を支える評価 | 自己収縮相殺、Gaussian chaosのL²評価と指数可積分性・安定性の役割。有限体積構成の代表定理の仮定と核心補題 | 14–15 |
| MQFC17 | 熱力学極限・クラスター展開・低次元ギャップ | 連結成分の組合せ、絶対収束の小活動度模型、相関減衰から弱結合mass gapへの既知定理の証明地図。相転移・真空選択の区別 | 12, 15–16 |
| MQFC18 | 3次元のφ⁴と構成の限界 | tadpole・二頂点自己エネルギーの発散次数、追加質量くりこみの必要性、既知φ⁴₃構成の仮定と証明責務。4Dへの外挿の反例的検討 | 14–17 |
| MQFC19 | 連続ゲージ場を格子に置く | 有向辺の群値接続、逆向き辺、頂点ゲージ変換、plaquetteとWilson loopの共役変換・不変性 | 13; GBG |
| MQFC20 | Haar積分と表現の直交性 | SU(2)などでHaar不変性、行列要素の直交性、指標展開・射影の必要部分を導出 | 19; LIE |
| MQFC21 | Wilson格子ゲージ測度 | コンパクト群・有限格子・境界条件・作用と分配関数、ゲージ不変観測量の期待値、plaquetteの連続作用への古典的展開 | 19–20 |
| MQFC22 | 格子ゲージ場の反射陽性 | 反射面・辺反転、正係数の指標展開、左右因子分解による正値性を指定したWilson模型で証明 | 8, 20–21 |
| MQFC23 | 転送作用素と物理Hilbert空間 | Haar平均によるゲージ不変部分への射影、正の転送作用素、真空規格化とスペクトル。零固有値の処理を明記 | 9, 20–22 |
| MQFC24 | 強結合展開とWilson loopの面積則 | 小βでの展開、2D単純連結領域の指標積分または有限群の厳密模型で面積依存を導出。高次元の既知強結合定理の条件 | 20–23 |
| MQFC25 | 強結合での相関減衰と格子ギャップ | 有界局所相互作用の小βでの条件付き分布・影響係数、Dobrushin型収縮から体積一様な相関評価を導く。時間方向と物理空間への適用条件 | 12, 21–24 |
| MQFC26 | 格子単位の質量と物理単位の質量 | 転送作用素の固有値比、相関長とaの換算、連続極限での正の物理ギャップの条件。固定格子のギャップだけでは不足する例 | 12, 23–25 |
| MQFC27 | 漸近自由性と尺度をどう固定するか | QFT30のβ関数を参照し一ループの走る結合と次元転換を積分。強結合の定理が弱結合軌道へ届かない理由 | 21, 26; QFT25–26,30 |
| MQFC28 | 多重尺度くりこみと大場領域 | Gaussianのブロック積分・共分散分解、局所作用と残差評価を手計算。Balaban型小場/大場分解とUV安定性の証明地図 | 16–17, 21, 27 |
| MQFC29 | 連続極限と無限体積極限をどう閉じるか | renormalized gauge-invariant observables、試験関数でsmearした階層の一様評価・tightness/部分列抽出・OS条件の保存・非自明性・一意性の別々の証明責務 | 10, 13, 21–28 |
| MQFC30 | Clay Yang–Mills存在・質量ギャップ問題 | 公式命題、Hの正スペクトル下界、真空選択、稠密観測量の連結相関の必要評価、模型と4Dの差を一枚の証明地図に統合。EOMの論文査定への接続 | 11–12, 19–29 |

### 3.1 Iの必須検証ゲート

- 自由場の反射陽性はFourier表示から直接証明し、OS商構成ではCauchy–Schwarz、零空間、半群の縮小性・強連続性を確認する。OS IIの増大条件を単なる各nの緩増加分布性で代用しない。
- 真空を一意に選んだ再構成で $H\Omega=0$ とし、$P_\Omega$ を真空射影とすると、ギャップ $\Delta>0$ は $\operatorname{spec}(H|_{\Omega^\perp})\subset[\Delta,\infty)$（非自明な直交補空間）で表す。スペクトル定理から
  $|\langle v,e^{-tH}w\rangle|\le e^{-t\Delta}\|v\|\|w\|$（$v,w\perp\Omega$）を導く。逆向きは正の対角スペクトル測度と稠密な真空直交ベクトル族で共通の指数下界を確認する。一観測量の減衰・クラスタ性・質量パラメータだけから全物理スペクトルのギャップを結論しない。
- 転送作用素Tの真空固有値を1に規格化し、真空直交成分のスペクトル上端を $0<\lambda_*<1$ とする場合、格子単位ギャップは $-\log\lambda_*$、物理単位では $-a^{-1}\log\lambda_*$（自然単位）。空間体積・a・β・境界条件・観測量の規格化を固定し、連続極限への一様下界と極限での保存を別々に示す。固定aでの強結合結果やUV安定性はこの下界の代わりにならない。
- 2D面積則、強結合の高次元格子結果、自由場、P(φ)₂のギャップは各模型・群・結合範囲を固定する。閉じ込め（Wilson loopの面積則）、非自明性、真空一意性、質量ギャップは別命題であり、Higgs機構や摂動的グルーオン質量と混同しない。
- 一般OS再構成、P(φ)₂の完全構成、φ⁴₃、Balabanの全評価は研究水準の外部定理として、正確な仮定・結論、証明地図、教材で完結した代表補題、未再構成部分を区別する。外部依存を明記しても当該章の学習目標の核心論証は省略しない。

## 4. 数学的量子場 II：局所摂動的くりこみ（18講）

| 章ID | 中心問い・内容 | 本文で再現する主要論証・直接例 | 系列内前提 |
|---|---|---|---|
| MQFC31 | 相互作用をなぜ形式冪級数で扱うか | 配置空間、衝突対角、時間順序積の非対角定義、因果順序、形式次数と実収束の区別 | 1–4, 7; MICA |
| MQFC32 | 分布のscaling degree | スケール変換のJacobian、斉次核・δと導関数の次数、UVとIRの区別 | 31 |
| MQFC33 | 原点を除く分布をどう延長するか | 試験関数のTaylor jet引去りによる延長、同じscaling degreeの延長の存在条件、整数端点 | 32 |
| MQFC34 | 局所反項の自由度 | 点支持分布の構造と許容δ導関数の次数、対称性による制約、対数スケール変更の直接計算 | 33 |
| MQFC35 | Feynman核の対角延長を計算する | 具体的な一ループ核のscaling degree、位置空間減算とcutoff反項の対応 | 32–34 |
| MQFC36 | 多点の部分対角・重なる発散 | 部分対角の配置、部分グラフと次数、既知の下位時間順序積の貼合せと全対角への帰着 | 31–35 |
| MQFC37 | 汎関数微分と局所汎関数 | コンパクト支持相互作用、変分微分の分布核、対角支持と波面条件 | 31; MICA |
| MQFC38 | Peierls括弧と自由場の積 | Green作用素から括弧、自由場star積と交換子、microcausal汎関数上の定義条件 | 37; HPDE |
| MQFC39 | 時間順序積と因果分解 | Feynman核の収縮、二点での因果因子化、自由Wick積との比較 | 35, 37–38 |
| MQFC40 | Epstein–Glaser帰納構成 | 因果順序で開被覆を作り重なりでの一致を確認、全対角の延長と対称性・unitarityの次数別条件 | 36, 39 |
| MQFC41 | 局所S行列とBogoliubov公式 | 相対S行列の形式逆元、微分による相互作用場、retarded productを低次数で導出 | 40 |
| MQFC42 | くりこみ処方の変更 | Stückelberg–Petermann型写像の局所性・恒等線形部、低次数での反項再定義とBPHZ減算の比較 | 34–36, 40–41 |
| MQFC43 | スケール変更とくりこみ群 | 延長の対数項、質量・結合の変更、QFT25–26との対応。Wilsonの粗視化と形式的処方変更の違い | 35, 42 |
| MQFC44 | ゲージ対称性とBRST複体 | Lie環・ghost・次数・graded derivation、自由/古典BRSTの冪零性をJacobi恒等式から導出 | 37–38; QFT28–29 |
| MQFC45 | BV形式とゲージ不変観測量 | antifieldと反括弧、古典master equation、単純模型でのコホモロジー、ゲージ固定の役割 | 44 |
| MQFC46 | 量子Ward恒等式と異常 | 局所反項で消せる項とコホモロジー障害、整合条件、QFT39–40の既知計算との対応。一般異常分類は主張しない | 40–45 |
| MQFC47 | 局所共変性とOPEの入口 | Hadamard処方の状態変更と時間順序積の局所自由度、曲がった時空への適用条件、短距離展開の具体例 | 35–43,46; MICA |
| MQFC48 | 非摂動構成と形式摂動構成は何が違うか | 同一スカラー模型で低次数反項・相関を比較、形式級数にはHilbert正値性・実収束・非摂動的ギャップが自動では付かないことを確認。pure YM/QCDとの接続 | 31–47; Iの対応部分 |

### 4.1 IIの必須検証ゲート

- n次元の原点除去分布の有限scaling degree sについて、延長の自由度が $|\alpha|\le s-n$ のデルタ導関数に限られることを導出する（負なら自由度なし）。部分対角では余次元を使用する。波面集合の積の存在条件と延長可能性を混同しない。
- 具体的な核の減算、因果帰納の貼合せ、形式次数ごとのunitarity・局所性を同一の模型で追えるようにする。一般のゲージ理論の量子master equationは異常消去の条件を伴う。BRSTコホモロジーの形式的物理観測量から正定値Hilbert表現や非摂動的ギャップを主張しない。
- BPHZは運動量空間減算、Stückelberg–Petermannは処方変更、Wilson型RGは尺度の自由度の積分という操作の違いを示す。共形net・VOAの分類は範囲外。

## 5. EOMおよびミレニアム問題との役割分担

[THE END OF MATHEMATICS?](../plans/DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md) のEOMYMA/B/C・EOMYM・EOMQCDA/QCDは研究論文・評価・形式化の比較を担当する。MQFCは標準理論と代表模型を担当し、研究成果の査定はEOMに集約する。EOMの39講・既存橋渡しを維持し、EOM着手をMQFC全講の完成待ちにしない。MQFCが完成した部分はEOMから実在するanchorを参照し、一般理論の二重証明を避ける。

| EOM講義 | MQFCで体系的に補う内容 |
|---|---|
| EOMYMA | MQFC19–23：格子接続・Haar・Wilson作用・正値性 |
| EOMYMB | MQFC3–12・22–23：Schwinger階層・OS再構成・スペクトル |
| EOMYMC | MQFC13・25–29：一様評価・尺度変換・大場領域・二極限 |
| EOMYM | MQFC12・26・29–30：存在・非自明性・質量ギャップの論理を照合 |
| EOMQCDA/QCD | MQFC44–48：BRST・異常・形式/非摂動の区別。格子フェルミオンの論文固有部分はEOM/QFTが担当 |
| EOM268系 | MQFC12・25–26：有限系のギャップと一様下界の論証を比較（スピン鎖の定理を4D YMへ転用しない） |

2026-11-24時点、[Clay公式問題](https://www.claymath.org/millennium/yang-mills-the-maths-gap/)と[Yang–Mills group](https://github.com/yang-mills-group/YM)の2026-11-10評価を照合した。同評価は2026-10-28提出版の存在構成を対象とし、無限体積極限の一意性・mass gapを証明したとはしていない。別提出版・QCD・形式化・Clay認定の現在地はEOMの版別台帳を正本とし、MQFC執筆時には更新を確認する。

MQFC30では次の推論を別々に点検する：有限格子の定義 → 一様なUV/IR評価 → 非自明な連続・無限体積極限 → 適切なOS条件と再構成 → 物理Hilbert空間での正のギャップ。最後のギャップの評価を存在の定理から自動的に得たとはしない。部分列存在と全列収束・極限一意性も区別する。これが研究論文の読解・証明責務の特定までの到達点である。

## 6. 文献校正と講義数の根拠

文献の公開目次・概要と原論文書誌を2026-11-24に照合した。書籍の全ページや研究論文の全証明を査読済みという意味ではない。執筆時は引用する定理の版・仮定・ページをさらに確認する。

| 標準文献・テキスト | 設計への反映 |
|---|---|
| R. F. Streater & A. S. Wightman, [PCT, Spin and Statistics, and All That](https://press.princeton.edu/books/paperback/9780691070629/pct-spin-and-statistics-and-all-that) | 1–4,10–11：作用素値分布、スペクトル、公理・解析性を自由場だけの計算から分離 |
| J. Glimm & A. Jaffe, [Quantum Physics: A Functional Integral Point of View](https://link.springer.com/book/10.1007/978-1-4612-4728-9), 2nd ed. | 5–18,22–29：関数積分・反射陽性・低次元構成・クラスター展開・ゲージ構成 |
| B. Simon, [The P(φ)₂ Euclidean (Quantum) Field Theory](https://press.princeton.edu/books/ebook/9781400868759/p02-euclidean-quantum-field-theory-pdf) | 14–17：Wick積、相互作用測度、相関不等式と極限を独立した論証単位へ |
| K. Osterwalder & R. Schrader, [Axioms for Euclidean Green's Functions](https://doi.org/10.1007/BF01645738) (1973), [II](https://doi.org/10.1007/BF01608978) (1975) | 8–10：反射陽性、商Hilbert空間、再構成条件と修正された増大条件を分ける |
| M. Gubinelli & M. Hofmanová, [A PDE Construction of the Euclidean Φ⁴₃ Quantum Field Theory](https://link.springer.com/article/10.1007/s00220-021-04022-0) | 18：3Dの非Gaussian場の既知構成と2Dとの差、完全SPDE理論は別発展 |
| I. Montvay & G. Münster, [Quantum Fields on a Lattice](https://www.cambridge.org/core/books/quantum-fields-on-a-lattice/4401A88CD232B0AEF1409BF6B260883A) | 19–27：格子場、ゲージ場、Wilson作用、尺度と格子QCDとの区別 |
| K. Osterwalder & E. Seiler, [Gauge Field Theories on a Lattice](https://doi.org/10.1016/0003-4916(78)90039-8) | 22–25：格子反射陽性・強結合領域での厳密な結果 |
| S. Chatterjee, [Yang-Mills for Probabilists](https://arxiv.org/abs/1803.01950) | 19–30：確率測度としての定式化、相関減衰と連続極限の問題設定 |
| T. Balaban, [Large Field Renormalization I](https://doi.org/10.1007/BF01257412), [II](https://doi.org/10.1007/BF01238433) (1989) | 28–29：大場評価とUV安定性の射程。ギャップの証明書とは扱わない |
| K. Rejzner, [Perturbative Algebraic Quantum Field Theory](https://link.springer.com/book/10.1007/978-3-319-25901-7); K. Fredenhagen & K. Rejzner, [講義ノート](https://arxiv.org/abs/1208.1428) | 31–48：汎関数・自由積・局所相互作用・くりこみ・ゲージ/BVを学習サイクルへ分解 |
| R. Brunetti & K. Fredenhagen, [Microlocal Analysis and Interacting Quantum Field Theories](https://arxiv.org/abs/math-ph/9903028) | 32–40,47：scaling degree、延長、対角、超局所的条件 |
| R. Brunetti, M. Dütsch & K. Fredenhagen, [Perturbative AQFT and the Renormalization Groups](https://arxiv.org/abs/0901.2038) | 42–43：処方変更と尺度流の区別 |
| R. Haag, Local Quantum Physics | AQFTの局所netとの比較。一般作用素環を再構築しない |
| A. Jaffe & E. Witten, [Clay公式問題説明へのリンク](https://www.claymath.org/millennium/yang-mills-the-maths-gap/) | 12,26,29–30：存在と物理的な正のギャップ、非自明性・公理の要請 |

講数はIを公理・自由場・再構成12講、低次元相互作用6講、ゲージ模型からClay問題12講に、IIを分布延長6講、局所汎関数・因果構成5講、くりこみ群2講、ゲージ・局所共変性・比較5講に配分した（12+6+12+6+5+2+5=48）。単なる教科書の目次の転載ではなく、既習QFT・AQFT・MICA・GBGと重複しない証明責務に基づく。今後、研究定理の再構成に独立した中心問いが必要となった場合のみ理由付きの設計変更を行う。

## 7. 実装・完成条件

- MQFC1の実装に伴い plans_progress へ移動し、全48講の系列manifestを初期化した。未実装章を公開しない。
- 全章で主要定義の前置きと直接例、主要定理の対象・位相・仮定・定義域、核心証明、A4/B3/C1以上の演習と詳細解答を揃える。既習結果を実際に使う位置にstable anchorを付す。
- 外部研究定理は証明済み範囲・教材で再現する補題・未再構成範囲を明確にする。研究未解決問題を完了条件に課さない。I/IIの各検証ゲート、EOMとの横断整合、全件数理査読・別観点再読・規約に沿うCI・公開を終えてからPLAN完了とする。
