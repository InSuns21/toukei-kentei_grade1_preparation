# DREAM THEATER 量子場理論 I〜IV（QFT系列・学修期間／講数可変）

改訂: 2026-10-13（Tong・Schwartz・Srednicki・MIT大学院講義等との範囲照合）  
状態: in progress（2026-10-27にQFT Iの第1講 QFT1 を開始。I〜IVの残講・横断査読は未完了）

## 0. 改訂理由と中心問い

旧PLANは「I＝自由場・初歩的摂動、II＝共形場とエンタングルメント」という**ブラックホール物理への短距離ルート**としては有用だが、それだけでは相対論的場の**散乱振幅／S行列とLSZ、量子電磁力学、実際のループ計算、くりこみ群、非可換ゲージ理論、自発的対称性の破れ、標準模型**を独習者が再構成できない。これらをQCURV・AQFT・HOLOへ押し付けない。

教科書の構造と重複を比較し、**量子場理論 I〜IVという4つの科目相当**へ改訂する。これは「各部15週」「全部60章」という宣言ではない。以下は候補テーマと学習ゲートであり、主要な証明・導出、具体模型、演習解答を閉じるのに必要な章数は着手時に確定する。旧仮ID QFT1–QFT30 は未実装で、**新しい部への機械的対応やQFT31の確定を意味しない**。

- **I：相対論的量子場の言語** — 自由場・局所性・相互作用の最初の散乱計算まで。
- **II：量子場の計算機構** — QED・ループ・くりこみ・くりこみ群・Yang–Mills量子化の入口。
- **III：素粒子の理論** — 自発的対称性の破れ・電弱理論・QCD・標準模型・有効場の理論。
- **IV：共形場と量子情報** — CFTの構造・2次元模型・レプリカ・場のエンタングルメント。旧QFT IIの内容をこの部へ移す。

**直接の依存は直列四部ではない。** I→IIから、II→III（標準模型）と I＋IIの必要部分→IV（CFT）の**分岐**にする。QCURVの自由場入門はIとHPDE／GRで進められ、IIIまでの履修を要求しない。HOLO／BHI IIのCFT入口はIVの必要章であり、IIIを必修にしない。

## 1. 直接前提・既存正本

- 共通: [特殊相対論SREL](../plan_done/DREAM_THEATER_SPECIAL_RELATIVITY_I_PLAN.md)、既存QM、AMECH（作用・正準形式）、FOU、PDE／GPDE、複素解析・線形代数。自由場のFourier展開・分布・積分はその既存結果を使う。
- I: 上記に加え、Lorentz群・スピノルは**必要な定義・具体計算を本文で導入**する。LIEの既存結果は実際に使用する箇所へリンクする。CPT・一般のスピン統計定理を無仮定で証明済み扱いしない。
- II: I、複素積分・漸近評価、必要なLie代数。ゲージ固定、Faddeev–Popov、正則化はIIで初出導入する。
- III: II、群・表現の最低限（I／IIの復習を含む）。QCDの閉じ込めと質量ギャップは一般的に証明済みと扱わない。
- IV: I、IIの経路積分・Ward恒等式・RGの必要部分、複素解析。有限次元の量子エントロピーは[QINF](../plans_progress/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)が正本。IVにIIIは原則不要。
- Lorentz計量・因果幾何は[LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)、Lorentz多様体上のGreen作用素は[HPDE](../plan_done/DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md)。厳密な波面集合は[MICA](../plans/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)、局所演算子環の一般理論は[AQFT](../plans/DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)を参照。これら全部をQFT Iの入学条件にしない。
- 先行PLAN未実装の箇所は既習定理として使わない。実装時に直接必要な概念を本文で導入するか、公開済みcanonical dependencyを確認する。

### 1.1 数学的不足の追加監査（2026-10-13）

| 数学的論点 | 前提となる既存正本／追加する正本 | QFT本編に必要なこと |
|---|---|---|
| Schwartz試験関数・温度分布・Fourier変換 | 既存FOU・GPDE；発展的波面集合は[MICA](../plans/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md) | **場を点ごとの作用素と置かず、smearingした作用素値分布**と共通定義域を明記して自由場の交換関係を導く |
| Hilbert空間・非有界作用素・CCR／Weyl関係 | 既存QM・FA・OA | Fockの有限粒子稠密領域・無限自由度の表現非一意性・自由真空の仮定を区別する |
| Lorentz表現・スピノル・Poincaré粒子表現 | [LREP：Lie群の表現とスピノル](../plans/DREAM_THEATER_LIE_REPRESENTATIONS_SPINORS_PLAN.md)（追加・未着手） | QFT IのDirac／Weyl、QFT IIIの質量・ヘリシティは必要な具体計算を本文に置き、一般分類の証明はLREPへ |
| 主G束・接続・Chern–Weil・spin構造 | [GBG：主束とゲージ幾何](../plans/DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md)（追加・未着手） | QFT IIでは平坦時空の局所ゲージ変換と曲率を導く。非自明束・monopole／instanton／特性類はGBGへ |
| Lorentz多様体上の初期値・因果Green作用素 | [LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)・[HPDE](../plan_done/DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) | 一般多様体の定理を自由平坦場の計算へ逆輸入しない |
| Euclid測度・Schwinger／Wightman・OS反射陽性 | [MQFC I：Euclid構成](../plans/DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)（追加・任意発展） | QFT II／IVでは**形式的Wick回転と再構成定理の違い**、特に反射陽性を要することを明示 |
| 分布の対角延長・因果的時間順序積・摂動くりこみ | [MQFC II：数学的くりこみ](../plans/DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)（追加・任意発展）、MICA | QFT IIで具体的反項・1ループを計算し、時間順序分布の衝突点での延長に自由度が生じる理由を説明 |
| BRST・ghost・異常 | QFT II／IIIは具体模型と計算；MQFC IIは摂動論のコホモロジー入口；GBGは古典幾何 | BRSTのnilpotency、物理状態の条件と量子異常の障害を区別。指数定理を前提外から暗黙使用しない |
| Virasoro最高ウェイト表現・null状態 | QFT IVで自由boson等から直接導入、一般のVOA／共形netの数学的分類は将来の**独立候補** | 高次の一般分類をQFT IVの必須到達点にせず、2次元具体模型の計算を閉じる |

**新規数学PLANの優先度:** LREP・GBGはQFT I〜IIIの高度な説明で直接必要な欠損を埋める**基幹の後続数学科目**。MQFC I/IIは「無限次元量子場をどこまで厳密に構成できるか」という別の中心問いを持つ**任意の研究水準ルート**であり、QCURVやHOLOへの標準読順に一律必修化しない。いずれも今はPLAN設計のみで、既存の完了済み章の本文・査読済み範囲を増やしたという意味ではない。

## 2. 科目 I：場の作用・量子化・散乱（仮テーマ）

**中心問い:** 粒子数が変わる相対論的理論で、局所的な場から粒子と散乱確率をどう計算するか。

1. 粒子描像の限界、相対論的量子力学から場への動機、単位・Lorentz符号・Fourier規約。
2. 実／複素スカラー場、作用の変分、Euler–Lagrange方程式、境界条件。
3. 並進・内部対称性とNoether流、エネルギー運動量テンソル（改良項の条件）。
4. Klein–Gordon解、正／負振動数、初期値、保存内積の範囲。場をSchwartz試験関数でsmearingする意味と、分布としての解を導入。
5. 調和振動子からFock空間、実／複素スカラー場の正準量子化、交換関係。有限粒子稠密領域・作用素の定義域、Fock表現の選択を明示。
6. 規格化・生成消滅演算子・真空・正規順序、発散する零点エネルギーの扱い。
7. Wightman二点関数、Pauli–Jordan交換子、空間的分離の可換性。スペクトル条件・正値性を自由模型で確認し、局所性を試験関数の支持で定式化。
8. 遅延／先進／Feynman伝播関数とiε処方、支持・時間順序・因果性の違い。
9. Dirac場のLorentz変換、Clifford代数、スピノルの平面波解とスピン和。Spin被覆と有限次元非ユニタリLorentz表現／ユニタリ1粒子表現を区別（一般表現論はLREP）。
10. フェルミオンFock空間・反交換関係・Dirac伝播関数、粒子／反粒子。
11. 相互作用描像、Dyson級数、Wickの定理を有限次数で実際に展開。
12. スカラーφ³／φ⁴模型の頂点規則、対称因子、連結図と真空bubble。
13. S行列・漸近状態・LSZ還元の仮定と自由／摂動模型での導出。孤立した質量殻極・安定な漸近1粒子状態の有無を検査し、長距離QEDのinfraparticle問題に注意。
14. 運動学、位相空間測度、振幅から崩壊率・微分断面積への変換。
15. 代表的な木レベル2→2散乱、交差対称性の適用条件、光学定理の入口。
16. 自由場二点関数とスカラー散乱の**計算・仮定・正規化**を統合した総合演習。

**Iの検証ゲート:** [φ(x),φ(y)]の空間的分離での消滅を特定模型で追い、時間順序伝播関数との区別を説明できる。φ⁴木レベル振幅から、外線規格化・対称粒子因子・位相空間を記して断面積まで自力計算できる。LSZは漸近粒子が存在する理論・質量殻と波動関数繰り込み等の仮定を明記する。

**QFT Iの実装状況（2026-10-28）:** QFT1は実スカラー場の作用・Klein–Gordon方程式・エネルギー保存、QFT2はNoether流とエネルギー運動量テンソル、QFT3は古典場の初期値・正負振動数・超関数、QFT4は実自由スカラー場のFock空間・正準交換関係・正規順序を扱う。QFT5では真空のWightman二点分布、正エネルギー質量殻、Pauli–Jordan交換子、有限伝播速度による局所的可換性を導いた。**QFT6**ではKlein–Gordon方程式の遅延・先進基本解とFeynman二点分布を比較し、光円錐支持・時間順序・エネルギー極の処方と基本解の係数を導いた。**QFT7**ではClifford関係、Lorentzスピノル変換、Dirac作用、正負振動数の平面波解とスピン和・質量殻射影を構成した。**QFT8**ではフェルミオンFockの外積構成、CAR、粒子・反粒子、等時刻CARと空間的分離での反交換性、時間順序Dirac二点分布と $i\\varepsilon$ 処方を導いた。**QFT9**では相互作用描像の発展方程式とDyson級数の時間順序・二次ユニタリ性、自由スカラー・Dirac場のWick展開、正規順序四次相互作用の有限次数計算と真空bubbleの相殺を導いた。続いてスカラー相互作用の頂点規則・対称因子・連結図へ進む。正式章IDと進捗はQFT系列manifestで管理する。上記16項目は依然として科目I全体の到達要件であり、QFT9の完了は科目Iの完了を意味しない。

## 3. 科目 II：QED・くりこみ・量子ゲージ理論（仮テーマ）

**中心問い:** 発散を含む量子補正をどう定義し、ゲージ対称性を壊さず予測可能な観測量へ結びつけるか。

1. 古典Maxwell場・U(1)ゲージ冗長性、拘束と物理偏極。
2. ゲージ固定と光子伝播関数（ゲージ依存の中間量と物理的振幅）。
3. Dirac場への最小結合とQED頂点、電子–ミューオン散乱等の木レベル計算。
4. Ward恒等式の木レベル確認、電荷保存と外線Ward identity。
5. 有限次元Gaussian／Grassmann積分から生成汎関数と経路積分の形式的極限。Grassmann代数・Berezin積分の順序／符号を具体計算。
6. Euclid化・Wick回転の成立条件と反例、形式測度・実時間処方の区別。Schwinger関数の反射陽性とOsterwalder–Schrader再構成の**必要条件だけ**を紹介し、一般証明はMQFC Iへ。
7. Green関数、連結生成汎関数、1PI有効作用・Legendre変換の定義。
8. φ⁴の1ループ2点・4点積分、表面上の発散次数と具体的正則化。時間順序分布の点衝突における積／延長が非自明であることを小模型で確認（一般延長定理はMQFC II）。
9. カットオフと次元正則化、くりこみ条件・反項・波動関数繰り込み。
10. QEDの真空偏極とWard–Takahashi恒等式、物理電荷との関係。
11. くりこみ群方程式、β関数・異常次元、φ⁴またはQEDでの1ループ例。
12. Wilson流の関連・無関連・周辺演算子、スケールと有効場の理論の入口。
13. 赤外発散・軟光子とinclusive観測量、正則化と物理的解消の区別。
14. 非可換ゲージ変換、曲率F_{μν}、Yang–Mills作用、自己相互作用。
15. Faddeev–Popov ghost・ゲージ固定、BRST変換の冪零性と物理状態をBRSTコホモロジーとして捉える入口（正則性・量子異常・非摂動的なGribov問題には停止線を置く）。
16. SU(N)ゲージ場の1ループβ関数の導出範囲、漸近自由性への橋。
17. 散乱・ループ・ゲージ不変性・くりこみ規約を統合する演習。

**IIの検証ゲート:** φ⁴の代表1ループを実際に正則化して反項と有限部分を切り分け、β関数の符号と規約を明示する。QEDの木レベルWard identityをスピノルの運動方程式から検算する。Yang–Millsのゲージ変換と曲率変換を計算する。「形式的経路積分＝構成済み確率測度」とはしない。

## 4. 科目 III：標準模型の場・対称性・有効理論（仮テーマ）

**中心問い:** どの場・対称性・相互作用を選ぶと、電弱・強相互作用の主要構造と計算可能な予測を説明できるか。

1. Poincaré表現、質量・ヘリシティ、Weyl／Dirac／Majorana記述の適用条件。LREPのlittle group・Spin被覆を参照し、有限次元場とユニタリ粒子状態の違いを説明。
2. 大域対称性の自発的破れ、真空多様体、Goldstoneの定理（仮定付き）。
3. 局所ゲージ理論とHiggs機構、ゲージ固定後の物理自由度数。
4. SU(3)×SU(2)×U(1)の表現と標準模型の場の一覧（世代・チャージ）。
5. 電弱共変微分、混合角、W・Z・光子、電弱質量行列の対角化。
6. Yukawa結合・質量生成、世代混合とCKMの構造。
7. 弱相互作用の木レベル崩壊と低エネルギーFermi有効相互作用。
8. カイラル対称性、量子異常と古典Noether保存則の相違。三角図またはFujikawa法で模型計算し、measureのJacobianと正則化の仮定を示す。
9. ゲージ異常相殺の電荷・表現チェック（単純な模型から標準模型へ）。局所（摂動的）異常と大域異常を区別し、一般指数定理の完全証明は前提にしない。
10. QCDの色・表現・頂点、強結合定数のスケール依存。
11. QCD漸近自由性と摂動論の適用領域、閉じ込めを未証明の一般命題と区別。
12. パートン模型／深非弾性散乱・因子化の入口（仮定と運動学）。
13. 有効場の理論、次元別演算子、matchingとrunningの小模型。
14. 自発的対称性の破れと量子補正の関係、Higgs質量項・調整問題。
15. 非摂動的方法の境界：格子ゲージ理論／インスタントン・θ項・topological charge等はGBGの特性類と接続する入口。格子連続極限／閉じ込めの完全証明を約束しない。
16. 代表的な電弱・QCD計算、近似と測定可能量のつながりの総合演習。

**IIIの検証ゲート:** 電弱中性ゲージ場の質量行列を実際に対角化して光子の質量が零となる条件を確認する。簡単な模型でGoldstone／Higgsの自由度を計数し、標準模型のカイラルフェルミオンの異常相殺を検算する。QCDの閉じ込め・4次元Yang–Mills質量ギャップを証明済みとしない。

## 5. 科目 IV：共形場理論・相関関数・エンタングルメント（仮テーマ）

**中心問い:** スケール・共形対称性が相関関数をどう拘束し、領域の量子もつれをどう計算可能にするか。

1. Euclid相関関数と解析接続、反射陽性・実時間復元についての条件。Schwinger関数とWightman関数を混同せず、OSの一般再構成証明はMQFC I。
2. スケール変換と共形変換、一次場の変換則、固定される2点／3点相関関数。
3. Ward恒等式と応力テンソル、トレース・保存・接触項の扱い。
4. 2次元の複素座標、局所正則変換、保存カレント。
5. 2次元応力テンソルのOPE、Virasoro代数と中心電荷。
6. 一次演算子・descendant・状態–演算子対応・放射量子化。Virasoro最高ウェイト表現・Verma module・null状態を自由場等の直接例で導入。
7. 自由boson／自由Majorana fermion模型の相関関数と中心電荷。
8. OPEの計算、共形ブロック・crossingと適用範囲の入口。ユニタリ性・正値性・収束範囲の前提を明示し、一般VOA／共形netの分類を証明済みとしない。
9. 平面から円筒への共形写像、Schwarzian、有限サイズ・熱的相関。
10. 境界・区間・温度の具体モデル、UV cutoffと非普遍定数。
11. QINFの有限次元密度行列から場の局所領域への移行、Type III問題はAQFTへ。
12. レプリカ法、分岐被覆、twist演算子、整数レプリカから解析接続する仮定。
13. 単一区間のエンタングルメントエントロピーと普遍係数の導出。
14. 有限温度／有限サイズの区間エントロピー、極限の検算。
15. 既知の局所モジュラーハミルトニアンの例とエンタングルメント第一法則。
16. 相対エントロピーの単調性とエネルギー条件への橋（一般結果の仮定、証明担当を明示）。
17. 高次元CFT・大N・境界理論への入口。ただしAdS/CFTの辞書・RT/HRTはHOLO。
18. Virasoro／OPE／レプリカの独立計算を用いた総合演習（自由bosonのVerma descendant、null状態の条件、解析接続で未正当化の操作を識別）。

**IVの検証ゲート:** 自由boson等で2点関数・Ward identity・T(z)T(w)の特異部分を具体計算する。レプリカ式の整数nでの計算とn→1の解析接続が自動的な数学定理ではない点を明示し、単一区間の普遍項を導出する。一般CFTのエントロピーを有限次元の部分トレース公式と無条件に同一視しない。

## 6. 後続講義との担当境界と履修ゲート

| トピック | 担当／必要範囲 | QFT本PLANで重複しない範囲 |
|---|---|---|
| Minkowski自由場・平坦時空の散乱 | **QFT I**（QCURVの最低入口） | Lorentz多様体でのGreen作用素一般論はHPDE |
| QED・くりこみ・Yang–Millsの計算 | **QFT II**（他に直接の正本なし） | 数学的一般構成は別途明示、形式操作を厳密化済としない |
| Higgs・標準模型・QCD・EFT | **QFT III**（他に直接の正本なし） | 閉じ込め／質量ギャップの一般証明 |
| CFT・Virasoro・レプリカ区間計算 | **QFT IV**（HOLO・BHI IIのCFT入口） | AdS/CFT辞書・RT/HRT・islandの重力計算はHOLO／BHI |
| 非慣性観測者・粒子生成・Unruh／Hawking | [QCURV](../plans/DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md) | QFT Iでは自由場と変換の準備まで。温度の物理的導出を二重所有しない |
| Hadamard・波面集合・曲がった時空の局所くりこみ | [MICA](../plans/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)、QCURV | QFT IIの平坦摂動論の反項と混同しない |
| Weyl代数・局所環・Type III・Tomita–Takesaki | [AQFT](../plans/DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md) | QFT IVで必要な問題の動機と参照にとどめる |
| von Neumann entropy・量子チャネル・誤り訂正 | [QINF](../plans_progress/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md) | QFT IVは連続場の局所性・UV・CFTに固有の計算 |
| AdS/CFT・RT/HRT・量子極値曲面 | [HOLO](../plans/DREAM_THEATER_HOLOGRAPHY_I_PLAN.md) | QFT IVのCFTは境界側だけ |
| Page曲線・replica wormhole・island | [BHI I／II](../plans/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md) | QFT IVのreplicaは非重力の領域エントロピーまで |

**実用的な履修経路:**

- Hawking放射へ急ぐ: **QFT I → QCURV**（＋GR／HPDE）。II・III・IVを一律必修にしない。
- 標準的な素粒子理論: **QFT I → II → III**。
- ブラックホール情報／ホログラフィー: **QFT I → IIの経路積分・Ward・RGの必要部分 → IV → HOLO／BHI**。IIIは任意。QINF・GR・BHT等を別途満たす。
- 厳密数学: HPDE／MICA／OA・VN／AQFTへ枝分かれし、通常のQFT I〜IVでその一般定理を重複導出しない。

## 7. 独習・執筆・査読・完了条件

1. 各章で**モデル／時空次元／計量の符号／単位／境界条件／規格化／状態／真空／UV・IR正則化／摂動次数**を必要に応じて先に定める。
2. 初出定義を通常文で説明し直接例で条件確認し、非自明な2〜4手やスピノル縮約・積分変数変換・解析接続・境界項を省略しない。formal statementでは仮定と結論を単独で読めるようにする。
3. 現代QFT全体の数学的厳密構成を宣言するのではなく、**有限自由度／cutoffでの定理、摂動級数の形式操作、条件付き物理的推論**を分ける。Minkowskiの振動型経路積分を無条件の測度積分と同一視しない。非摂動的主張の証明は安易に補完しない。
4. 別科目から実際に結果を援用する各箇所で結果名をcanonical stable anchorへリンクする。公開前にchapter.yaml／knowledge.yamlと実際の依存DAG、候補IDと実在ID、参考文献の適用範囲を検証する。
5. 各章で原則 Level A 4題／B 3題／C 1題以上と全詳細解答。最低題数ではなく、独習上必要な主要モデル・計算・仮定を練習できる量で判断する。
6. 新規・実質改稿章は現行authoring standardの区分Cとして**全主要証明・全演習詳細解答を全件再計算**し、独立した観点で読み直す。同一担当者の別観点再読を第三者査読とは呼ばない。**別の完成章の追跡監査はユーザーの明示指定時に限る**。
7. 着手時に必要なら部ごとに章を増減・統合する。全科目の成果物、参照・横断演習・公開導線、必要な検証・査読が済むまでPLANはplanned/progressのままにし、15や30という数字だけで完了扱いしない。

## 8. 教科書・講義ノートとの対照（設計の根拠）

- David Tong, [*Quantum Field Theory*](https://davidtong.org/teaching/quantum-field-theory/)（古典場・自由量子化・摂動・Dirac場・QED）：I〜IIの導入順、計算水準。
- Tom Lancaster & Stephen J. Blundell, [*Quantum Field Theory for the Gifted Amateur*](https://academic.oup.com/book/36442)（調和振動子から経路積分・くりこみ・QED・非可換ゲージ理論）：動機・直接例の粒度。
- Mark Srednicki, [*Quantum Field Theory*](https://books.google.com/books?id=5OepxIG42B4C)（スカラー／スピン1/2／1、LSZ、ループ、RG、EFT）：I〜IIIで抜けてはならない主要計算。
- Matthew D. Schwartz, [*Quantum Field Theory and the Standard Model*](https://schwartzqft.fas.harvard.edu/)（S行列・QED・くりこみ・Yang–Mills・標準模型・QCD）：特に旧PLANに欠けていたII・IIIの範囲。
- MIT Physics, [8.323／8.324／8.325の科目説明](https://physics.mit.edu/academic-programs/subjects/)（基礎・ループとゲージ・標準模型）：同領域を複数の大学院科目で扱う規模の目安。**MITの内容をそのまま4部に機械転記したものではない**。
- David Tong, [*Gauge Theory*](https://davidtong.org/teaching/gauge-theory/)（Yang–Mills、量子補正、非摂動の問題）：II・IIIの上限を校正。
- Pasquale Calabrese & John Cardy, [*Entanglement entropy and conformal field theory*](https://arxiv.org/abs/0905.4013)（レプリカ・区間・温度・境界）：IVの計算到達目標と適用範囲。

これらは**目次・講義概要を使った範囲と前提の比較**であり、著作物の証明や演習を転載しない。著者間で採用する流儀が異なる場の正規化・符号・スキームについては、各章で選んだ規約を一貫させて元の式から検算する。
