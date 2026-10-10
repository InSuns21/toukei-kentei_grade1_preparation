# DREAM THEATER 時空・量子場の数学基盤 — 独立4セメスターPLAN

作成日: 2026-10-10  
状態: planned（数学講義の設計のみ、章本文・公開ルーティング・実装は未着手）

## 0. 目的

既存の [熱力学・ブラックホール・情報の横断PLAN](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md) を厳密に履修するための数学的不足を、**既存DREAM THEATERを重複執筆せずに**埋める。数学そのものを主題とする独立講義として成立させ、物理の短い補講にしない。

物理・情報系15セメスターに対して、新数学 **4セメスター×15週=60週** を設計する。既存の線形代数、微分幾何Ⅰ/Ⅱ、関数解析Ⅰ/Ⅱ、量子力学基礎Ⅰ/Ⅱ、作用素環Ⅰ/Ⅱ、測度/確率、Fourier解析、偏微分方程式Ⅰ/Ⅱ、既存調和解析・幾何解析・変分問題の各PLANは改めて科目として数えない。

## 1. 必須度と進路の区別

| 科目 | 位置付け | 主な接続先 | 章ID候補 |
|---|---|---|---|
| ローレンツ幾何と大域因果構造 I | 必須の数学基盤 | GR I/II | LORG1–LORG15 |
| ローレンツ多様体上の双曲型偏微分方程式 I | 必須の数学基盤 | QFT I・QCURV | HPDE1–HPDE15 |
| 超局所解析・波面集合・Hadamard条件 I | 厳密な曲がった時空QFTの発展基盤 | QCURV・BHT | MICA1–MICA15 |
| 代数的量子場理論・モジュラー理論 I | ブラックホール情報の研究入門を支える発展基盤 | BHI I/II・HOLO | AQFT1–AQFT15 |

**物理の概念を追う標準ルート**では、LORG/HPDEの主要定義と定理を順に学び、MICA/AQFTについては物理科目で必要な命題の条件を参照してよい。**主定理の数学的証明や因数分解の精密な問題まで追う厳密ルート**ではMICA/AQFTも通読する。既存の15セメスターから4科目を全員必修に変更するわけではない。

## 1.1 既存Riemann幾何の実装状況（2026-10-10再確認）

当初のPLAN設計ではGEO12–GEO19の章名と代表章本文を見て「Riemann幾何が実装済み」としたが、それだけでは正確な学修範囲の確認として不十分だった。追加で**8章の本文・主要節・定理/証明マーカー・演習見出しの構成**を取得して確認した。以下は**実装範囲の確認**であり、すべての証明の数学的正しさを行ごとに独立再計算したという意味ではない。

| 既存章 | 現行本文で扱う主要内容 |
|---|---|
| GEO12 | Riemann計量、正定値性、長さ・距離・体積・Laplace–Beltrami |
| GEO13 | アフィン接続、捩率、Koszul公式、Levi–Civita接続、テンソル共変微分 |
| GEO14 | 測地線、指数写像、正規座標、Gaussの補題、凸正規近傍 |
| GEO15 | 測地線・距離完備性、Hopf–Rinow、切断点と共役点の関係 |
| GEO16 | Riemann曲率の符号規約、代数・微分Bianchi恒等式、Ricci・スカラー曲率、Gauss方程式 |
| GEO17 | 第一・第二変分、Jacobi場、共役点、指数写像と局所最短性 |
| GEO18 | Jacobi場の比較、Bonnet–Myers、Cartan–Hadamard |
| GEO19 | 局所・大域Gauss–Bonnet、境界、Euler標数と曲率 |

GEO12–GEO19は合計約28.3万文字（演習と詳細解答を含む）であり、Riemann幾何の**基本的な接続・曲率・測地線・大域定理**が実質的にある。従って**同じ内容を新たな15週科目として重複新設しない**。ただし独立して「Riemann幾何」という題名の15章教材に再編成済み、という意味ではなく、現在は微分幾何IIの中の複数章として実装されている。

また既存GEO12の計量は**正定値**であり、Riemann距離・局所最短性・Hopf–Rinow・Bonnet–Myersなどの論証をそのままLorentz計量へ移せない。未実装の核心は**不定符号計量、時間向き・光円錐、因果階層、Cauchy面、大域双曲性**であり、これをLORGの独立15週の主題とする。Riemann幾何の重複ではない。必要な高度Riemann分野（holonomy・スピン幾何等）が将来の厳密証明で必要なら別途定義位置を検討し、未検証の数学を既習扱いしない。

---

## 2. 数学前提の再利用と責務

- **GEO1–GEO19**：滑らかな多様体、テンソル、Levi-Civita接続、曲率、変分/Jacobi場などの基礎は既存正本。LORGはLorentz符号と大域因果の新規部分のみを主題とする。
- **PDE I / GPDE1–GPDE10 / FOU**：R^nの波動方程式、分布、Sobolev、弱解、Fourierを既存正本から参照。HPDEは背景Lorentz多様体上のCauchy問題とGreen作用素を所有する。
- **既存の調和解析PLAN**：最大作用素・特異積分・Littlewood–Paley・oscillatory integralまでを担当。MICAは分布の波面集合、超局所的特異性の方向、Hadamard条件を主題とし、HAの基本結果を再構築しない。
- **OA1–OA6 / VN1–VN7**：C*環、GNS、von Neumann環、predual、factorの初歩を既存正本から参照。AQFTは相対論的局所環・モジュラー構造と情報問題固有の分割を扱う。
- **LIE1–LIE4、GEO9、既存変分問題PLAN**：Lie群・作用、de Rhamコホモロジー、測地線/極小曲面変分の基礎は再利用。Spin表現の最低限はQFT I、RT面のhomology constraintの最低限はHOLOがその場で定義する。これらのためだけに独立15週の講義を増やさない。
- **物理系列との境界**：Einstein方程式/Schwarzschild/KerrはGR、Unruh/HawkingはQCURV、量子エントロピーの有限次元理論はQINF、AdS/CFT/island/replica wormholeはHOLO/BHIがそれぞれcanonical owner。

## 3. 科目間の学修経路

~~~text
GEO12–GEO19 + SRELの入口
           ↓
         LORG ──────────────────→ GR I / GR II
           ↓                            │
 GPDE・PDE I・Fourier ──→ HPDE ─────────┼──→ QCURV
                              ↓         │
                     調和解析 → MICA ──┤
                                        │
 QM・OA・VN・QINF ──────────────→ AQFT ─┴──→ BHI I / BHI II
                             （AQFTにはHPDEも必要）
~~~

学習順の矢印は科目全体の推奨接続であり、正式な直接依存は各章を実装した時点の `chapter.yaml` / `knowledge.yaml` で最小集合に絞る。GR IはLorentz計量の物理的入口から始めるが、LORGの幾何学的結果を前提にする際は章リンクを付す。LORGにGR Iを前提とする循環依存を入れない。

## 4. 15週シラバス

### 1. ローレンツ幾何と大域因果構造 I（LORG1–LORG15）

- **位置付け:** 必須の数学基盤
- **前提:** GEO1–GEO19（多様体・接続・曲率）、線形代数、SRELのMinkowski時空概念（初回に必要部分を再定義）
- **canonical ownership:** Lorentz計量、因果集合、Cauchy超曲面、大域双曲性を数学として所有。Einstein方程式・物理的地平線・崩壊模型・時空解の解釈はGR I/II。

- **第01週 LORG1**：非退化対称双線形形式、符号数、ローレンツ計量
- **第02週 LORG2**：時間的・光的・空間的ベクトルと錐、時間向き
- **第03週 LORG3**：因果曲線、固有時、Lorentz長さの極値
- **第04週 LORG4**：Levi-Civita接続とLorentz測地線
- **第05週 LORG5**：法線座標と測地線方程式、局所的な因果錐
- **第06週 LORG6**：時系列集合I⁺/I⁻と因果集合J⁺/J⁻の定義
- **第07週 LORG7**：因果階層（chronology・causality・strong causality）
- **第08週 LORG8**：achronal集合・acausal集合・edgeの実例
- **第09週 LORG9**：領域依存 D(S) とCauchy horizonの基礎
- **第10週 LORG10**：Cauchy超曲面の定義・Minkowskiの具体例
- **第11週 LORG11**：大域双曲性・因果ダイヤモンドのコンパクト性
- **第12週 LORG12**：大域双曲時空の分割と時間関数（正確な定理の範囲）
- **第13週 LORG13**：光的測地線束・共役点・集束の幾何
- **第14週 LORG14**：準局所地平線と大域事象地平線の区別
- **第15週 LORG15**：因果図・反例・依存条件の総合演習

**必須の計算・証明ゲート**

1. 平坦Minkowski時空でI⁺(p), J⁺(p), D(S)を座標から計算する
2. 時間向きと因果曲線の接ベクトルの定義からLorentz長さを検算する
3. 大域双曲性を必要とする存在定理と、単なる局所計量の存在からは導けない主張を反例で分離する

### 2. ローレンツ多様体上の双曲型偏微分方程式 I（HPDE1–HPDE15）

- **位置付け:** 必須の数学基盤
- **前提:** LORG、GPDE1–GPDE10（超関数・Sobolev・弱解）、PDE I、EVOL（必要な節のみ）
- **canonical ownership:** ローレンツ多様体上の初期値問題、有限伝播、基本解、遅延/先進Green作用素を所有。粒子数・Bogoliubov係数・量子真空・Hawking放射はQCURV。

- **第01週 HPDE1**：試験関数と分布の多様体上の扱い
- **第02週 HPDE2**：ベクトル束・場の切断と微分作用素
- **第03週 HPDE3**：主シンボルと双曲性、normally hyperbolic作用素
- **第04週 HPDE4**：Minkowski波動方程式の基本解と支持
- **第05週 HPDE5**：初期データとCauchy問題、エネルギー積分
- **第06週 HPDE6**：エネルギー評価・解の一意性
- **第07週 HPDE7**：有限伝播速度と因果円錐
- **第08週 HPDE8**：局所Cauchy解の存在の枠組み
- **第09週 HPDE9**：大域双曲背景上の大域Cauchy問題
- **第10週 HPDE10**：遅延Green作用素G_retと支持制約
- **第11週 HPDE11**：先進Green作用素G_advと因果伝播子E
- **第12週 HPDE12**：Green作用素の一意性・恒等式・exact sequence
- **第13週 HPDE13**：Klein–Gordon方程式と保存電流
- **第14週 HPDE14**：解空間のシンプレクティック形式・CCRの前提
- **第15週 HPDE15**：Green作用素と物理的因果性の総合演習

**必須の計算・証明ゲート**

1. 平坦時空の波動方程式についてエネルギー恒等式から一意性と有限伝播を示す
2. Green作用素の定義域・値域と支持条件を明示して因果伝播子の基本恒等式を証明する
3. 大域双曲性を外した場合に先進/遅延問題がどう破綻し得るか反例を検討する

### 3. 超局所解析・波面集合・Hadamard条件 I（MICA1–MICA15）

- **位置付け:** 厳密な曲がった時空QFTの発展基盤
- **前提:** HPDE、Fourier解析、GPDE、調和解析の必要部分（既存独立PLAN）
- **canonical ownership:** 波面集合、分布の積と引戻しの可否、特異性伝播、Hadamard条件の超局所的定式化を所有。実際の曲がった時空の物理状態・粒子観測はQCURV、CFTレプリカはQFT II。

- **第01週 MICA1**：分布の局所Fourier変換と滑らかさ
- **第02週 MICA2**：滑らかなcutoffと周波数方向への減衰
- **第03週 MICA3**：波面集合WF(u)の定義
- **第04週 MICA4**：δ分布・Heaviside関数・振動積分のWF計算
- **第05週 MICA5**：波面集合の座標変換と共変性
- **第06週 MICA6**：分布積が存在するためのHörmander条件
- **第07週 MICA7**：分布の部分多様体への引戻しと対角制限
- **第08週 MICA8**：擬微分作用素と主シンボルの入口
- **第09週 MICA9**：特性集合と双曲作用素
- **第10週 MICA10**：特異性伝播の定理：モデル証明と一般定理の仮定
- **第11週 MICA11**：Hadamard parametrixの局所特異構造
- **第12週 MICA12**：二点関数のHadamard条件と波面集合
- **第13週 MICA13**：点分離(point-splitting)と応力テンソル
- **第14週 MICA14**：局所共変な繰り込みと許容される有限項
- **第15週 MICA15**：局所模型の計算・証明範囲・正則化依存の総合演習

**必須の計算・証明ゲート**

1. δ分布の波面集合、分布積の成功例/失敗例をFourier解析から具体的に計算する
2. 二点関数を対角線に制限するとき必要になるWF条件を示す
3. Hadamard条件と有限な物理量の関係について「適切な状態の選択」と「繰り込み規約」を区別する

### 4. 代数的量子場理論・モジュラー理論 I（AQFT1–AQFT15）

- **位置付け:** ブラックホール情報の研究入門を支える発展基盤
- **前提:** OA1–OA6、VN1–VN7、QM1–QM8、QINF、HPDE。MICAは曲がった時空へ拡張する章で参照
- **canonical ownership:** 観測量の局所環、Weyl代数、GNS、Type III/テンソル分解の問題、モジュラー作用素と相対エントロピーを数学として所有。重力双対・island・Page曲線はHOLO/BHI。

- **第01週 AQFT1**：局所可観測量と領域に添えた代数net
- **第02週 AQFT2**：isotony・Einstein局所性・共変性
- **第03週 AQFT3**：線形場のシンプレクティック空間とWeyl代数
- **第04週 AQFT4**：CCRと代数上の状態
- **第05週 AQFT5**：GNS表現と表現の非一意性
- **第06週 AQFT6**：局所von Neumann環の構成
- **第07週 AQFT7**：Reeh–Schlieder性：正しい条件と典型モデル
- **第08週 AQFT8**：Type I・II・III因子と有限次元モデルの限界
- **第09週 AQFT9**：局所環のType III性を示すために必要な仮定
- **第10週 AQFT10**：標準形の巡回分離ベクトルとTomita作用素
- **第11週 AQFT11**：極分解S=JΔ^{1/2}とモジュラー流
- **第12週 AQFT12**：Tomita–Takesaki定理の主要結論・有限次元例
- **第13週 AQFT13**：Araki相対エントロピーの定義と有限次元への帰着
- **第14週 AQFT14**：Bisognano–WichmannとRindler wedgeの特別な幾何学的流れ
- **第15週 AQFT15**：split property、領域のテンソル分解、情報問題への総合接続

**必須の計算・証明ゲート**

1. 有限次元行列環でGNS・モジュラー流・相対エントロピーを直接計算する
2. 局所性の公理とType IIIの性質を区別し「すべてのQFT局所環は自動的にType III」と断言しない
3. 無限次元Tomita–TakesakiやReeh–Schliederを主張する場合、適用条件と証明済部分/参照定理を明記する

## 5. 教材規模・定義と定理の扱い

- 各科目は**15回×90分**、毎週の独習2–4時間と演習を想定。**15週を章相当の実質で満たす**。1ページに全科目を圧縮したダイジェストにはしない。
- 各回は「直観・最小例 → 定義 → 命題/定理 → 条件付き証明 → 反例 → 演習と全詳細解答」。DREAM THEATER標準規約に従い、原則各章4,500字以上・演習A4/B3/C1以上。
- 大域双曲性・Green作用素・特異性伝播・Tomita–Takesakiなどの重い一般定理は、数学的に誠実な範囲で必要な補題と具体例を証明する。難しい一般証明を省略した場合は結果先行（参照定理）と正確に表記し、当該章で完全証明したと偽らない。
- 道具の定義域（非有界作用素、試験関数、Green作用素の支持空間）、積が存在する条件、Lorentz計量符号、時空の大域的仮定、状態の正規性・faithfulnessを必ず明記する。
- 物理の自由場やSchwarzschild幾何の例は使うが、数学の一般論の証明を物理模型の可視化に代替しない。

## 6. 研究入門へ向けた誤解防止

- Riemann多様体のHopf–Rinow定理や距離空間の最短路性を、符号が不定なLorentz幾何へ無条件に持ち込まない。
- 有限伝播やGreen作用素の存在を、任意の因果違反時空に無条件に適用しない。
- 波面集合の制約なしに分布を掛けたり、二点関数を対角上で評価したりしない。
- Hadamard条件が与えるものと、応力テンソルの局所共変な繰り込みに残る自由度を分離する。
- 局所場の代数が一般に有限次元テンソル積で分割できるとは仮定しない。Type III性は特定のQFTの適切な仮定の下での結果であり、全理論に一律の無条件結論ではない。
- 有限次元のvon Neumannエントロピーを、量子場のUV無限大のsharp-region entanglement entropyに無条件で代入しない。

## 7. 図版・数値・演習案

- LORG：光円錐、I⁺/J⁺、Cauchy面と領域依存、非大域双曲例の因果図。
- HPDE：Green関数の支持、因果伝播子、波動の有限伝播を時空間図で可視化。
- MICA：δ分布のWF方向、特性方向への特異性伝播、point-splittingの模式図。
- AQFT：局所環の包含、部分系分割モデル、有限次元モジュラー流と相対エントロピーの検算。
- SVGやアニメは必要なら採用可能だが、静止表示、代替テキスト、reduced-motion、証明との分離を守る。

## 8. 実装運用・完了条件

1. この作業ではPLANのみ新設。未実装の60章候補、canonical dependency、公開目次・シリーズmanifest・work routingは登録しない。
2. 実装開始時にID衝突を再確認して正式なIDと科目名を固定し、PLANを`plans_progress/`へ移動する。参照する横断PLAN/READMEも同期する。
3. 数学本文に含まれるすべての非自明な証明について、前提・論理の一手・反例・数式を確認し、少なくとも本文粒度と数理整合性の二観点で査読する。
4. 4科目各15週が独立に通読可能となり、QCURV・GR・BHIへの公式参照を整備する。数学系列のみが未完成でも既存物理15科目のPLAN全体を架空のcompleted扱いしない。

## 9. 範囲校正文献

- Christian Bär, Nicolas Ginoux, Frank Pfäffle, *Wave Equations on Lorentzian Manifolds and Quantization*, EMS 2007: https://ems.press/books/esi/34
- Stefan Hollands and Robert M. Wald, *Quantum fields in curved spacetime*, Physics Reports 574 (2015): https://doi.org/10.1016/j.physrep.2015.02.001
- Robert M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*, University of Chicago Press, 1994.
- Lars Hörmander, *The Analysis of Linear Partial Differential Operators I–IV*, Springer（波面集合・超局所解析の到達水準校正）.
- Rudolf Haag, *Local Quantum Physics*, Springer（AQFT局所環・共変性の参考）.
- Ola Bratteli and Derek W. Robinson, *Operator Algebras and Quantum Statistical Mechanics*（KMS・作用素環と統計力学の接続）.

上記の書籍・文献は到達水準・成立条件の校正に使い、本文・演習・証明を転載しない。
