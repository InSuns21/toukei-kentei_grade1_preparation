# DREAM THEATER 時空・量子場の数学基盤：4科目の履修ルート

分冊: 2026-10-11  
状態: planned（横断案内のみ）

1. [ローレンツ幾何と大域因果構造（LORG1〜LORG21・全21講）](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)
2. [ローレンツ多様体上の双曲型PDE（HPDE1〜HPDE24・全24講）](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md)
3. [超局所解析・Hadamard条件 I（MICA1〜15）](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)
4. [代数的量子場理論・モジュラー理論 I（AQFT1〜15）](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)

GEO / SREL → LORG → HPDE → MICA（厳密Hadamard条件）。OA / VN + QM / QINF + HPDE → AQFT、曲がった時空のAQFTで必要ならMICAを追加。GR・QCURV・HOLO・BHIの物理科目は[熱・時空・情報横断ルート](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)の各個別PLANへ。

本ファイルは学修ゲートと直接依存を案内するだけであり、各科目のシラバスは上記ファイルを唯一の正本とする。

**2026-10-13 数学的QFT補完:** 既存のLORG／HPDE／MICA／AQFTという「時空と局所場の数学基盤」4科目とは別に、[Lie群の表現・スピノル（LREP）](DREAM_THEATER_LIE_REPRESENTATIONS_SPINORS_PLAN.md)、[主束・ゲージ幾何（GBG）](DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md)、[量子場の数学的構成 I/II（MQFC）](DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)を**独立した未着手PLAN**として追加した。LREP／GBGは通常のQFTに必要な数学の一般化、MQFCはWightman／OS・構成的QFT・対角延長くりこみの任意発展ルートを所有する。この横断PLANの4科目を7科目に置換したり、全数学科目をGR／QCURV／HOLOの必須前提へ追加したりはしない。各PLANの実装状態・責務は各個別ファイルを正本とする。

---

## 元の横断PLANから保持した共通規則・資料（個別シラバスは各科目PLANが正本）

## 0. 目的

既存の [熱力学・ブラックホール・情報の横断PLAN](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md) を厳密に履修するための数学的不足を、**既存DREAM THEATERを重複執筆せずに**埋める。数学そのものを主題とする独立講義として成立させ、物理の短い補講にしない。

物理・情報系17セメスター相当（2026-10-13 QFT I〜IV改訂）に対して、新数学 **4つの独立科目** を設計する（各科目の講数・学修期間は可変）。既存の線形代数、微分幾何Ⅰ/Ⅱ、関数解析Ⅰ/Ⅱ、量子力学基礎Ⅰ/Ⅱ、作用素環Ⅰ/Ⅱ、測度/確率、Fourier解析、偏微分方程式Ⅰ/Ⅱ、既存調和解析・幾何解析・変分問題の各PLANは改めて科目として数えない。

## 1. 必須度と進路の区別

| 科目 | 位置付け | 主な接続先 | 章ID候補 |
|---|---|---|---|
| ローレンツ幾何と大域因果構造 I | 必須の数学基盤 | GR I/II | LORG1–LORG21（21講） |
| ローレンツ多様体上の双曲型偏微分方程式 I | 必須の数学基盤 | QFT I・QCURV | HPDE1–HPDE24（24講） |
| 超局所解析・波面集合・Hadamard条件 I | 厳密な曲がった時空QFTの発展基盤 | QCURV・BHT | MICA1–MICA15 |
| 代数的量子場理論・モジュラー理論 I | ブラックホール情報の研究入門を支える発展基盤 | BHI I/II・HOLO | AQFT1–AQFT15 |

**物理の概念を追う標準ルート**では、LORG/HPDEの主要定義と定理を順に学び、MICA/AQFTについては物理科目で必要な命題の条件を参照してよい。**主定理の数学的証明や因数分解の精密な問題まで追う厳密ルート**ではMICA/AQFTも通読する。改訂後の物理・情報17セメスター相当から4科目を全員必修に変更するわけではない。

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

GEO12–GEO19は合計約28.3万文字（演習と詳細解答を含む）であり、Riemann幾何の**基本的な接続・曲率・測地線・大域定理**が実質的にある。従って**同じ内容を講数合わせで重複新設しない**。ただし独立して「Riemann幾何」という題名の固定講数の教材に再編成済み、という意味ではなく、現在は微分幾何IIの中の複数章として実装されている。

また既存GEO12の計量は**正定値**であり、Riemann距離・局所最短性・Hopf–Rinow・Bonnet–Myersなどの論証をそのままLorentz計量へ移せない。未実装の核心は**不定符号計量、時間向き・光円錐、因果階層、Cauchy面、大域双曲性**であり、これをLORGの独立科目の主題とする。Riemann幾何の重複ではない。必要な高度Riemann分野（holonomy・スピン幾何等）が将来の厳密証明で必要なら別途定義位置を検討し、未検証の数学を既習扱いしない。

---

## 2. 数学前提の再利用と責務

- **GEO1–GEO19**：滑らかな多様体、テンソル、Levi-Civita接続、曲率、変分/Jacobi場などの基礎は既存正本。LORGはLorentz符号と大域因果の新規部分のみを主題とする。
- **PDE I / GPDE1–GPDE10 / FOU**：R^nの波動方程式、分布、Sobolev、弱解、Fourierを既存正本から参照。HPDEは背景Lorentz多様体上のCauchy問題とGreen作用素を所有する。
- **既存の調和解析PLAN**：最大作用素・特異積分・Littlewood–Paley・oscillatory integralまでを担当。MICAは分布の波面集合、超局所的特異性の方向、Hadamard条件を主題とし、HAの基本結果を再構築しない。
- **OA1–OA6 / VN1–VN7**：C*環、GNS、von Neumann環、predual、factorの初歩を既存正本から参照。AQFTは相対論的局所環・モジュラー構造と情報問題固有の分割を扱う。
- **LIE1–LIE4、GEO9、既存変分問題PLAN**：Lie群・作用、de Rhamコホモロジー、測地線/極小曲面変分の基礎は再利用。Spin表現の最低限はQFT I、RT面のhomology constraintの最低限はHOLOがその場で定義する。これらのためだけに不要な独立科目を増やさない。
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

## 5. 教材規模・定義と定理の扱い

- **LORGは21講（LORG1〜21）、HPDEは24講（HPDE1〜24）**と個別PLANで確定済み。MICA/AQFTなど他科目の講数・学習期間は各個別PLANを正本とする。証明・例・演習に十分な紙幅を確保し、数合わせの増講や1ページに全科目を圧縮したダイジェストは避ける。
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

1. この計画段階ではPLANのみ整備する。LORGの21講・HPDEの24講は執筆IDまで確定したが、未実装の章本文、canonical dependency、公開目次・系列manifest・work routingは先取り登録しない。
2. 実装開始時にID衝突を再確認して正式なIDと科目名を固定し、PLANを`plans_progress/`へ移動する。参照する横断PLAN/READMEも同期する。
3. 数学本文に含まれるすべての非自明な証明について、前提・論理の一手・反例・数式を確認し、少なくとも本文粒度と数理整合性の二観点で査読する。
4. 4科目がそれぞれ必要な講数で独立に通読可能となり、QCURV・GR・BHIへの公式参照を整備する。数学系列のみが未完成でも改訂後の物理・情報17科目相当のPLAN全体を架空のcompleted扱いしない。

## 9. 範囲校正文献

- Christian Bär, Nicolas Ginoux, Frank Pfäffle, *Wave Equations on Lorentzian Manifolds and Quantization*, EMS 2007: https://ems.press/books/esi/34
- Stefan Hollands and Robert M. Wald, *Quantum fields in curved spacetime*, Physics Reports 574 (2015): https://doi.org/10.1016/j.physrep.2015.02.001
- Robert M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*, University of Chicago Press, 1994.
- Lars Hörmander, *The Analysis of Linear Partial Differential Operators I–IV*, Springer（波面集合・超局所解析の到達水準校正）.
- Rudolf Haag, *Local Quantum Physics*, Springer（AQFT局所環・共変性の参考）.
- Ola Bratteli and Derek W. Robinson, *Operator Algebras and Quantum Statistical Mechanics*（KMS・作用素環と統計力学の接続）.

上記の書籍・文献は到達水準・成立条件の校正に使い、本文・演習・証明を転載しない。
