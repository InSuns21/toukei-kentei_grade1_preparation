# DREAM THEATER ブラックホール熱力学 I（BHT1〜BHT24・全24講確定）

分冊: 2026-10-11  
改訂: 2026-11-10（標準教科書・大学院講義資料と照合し講数・学修境界を確定）  
状態: in progress（BHT1〜BHT5執筆・査読・公開導線整備済み。BHT6〜BHT24と横断監査は未完了）

## 0. 中心問い・到達点

**古典的には外へ何も出せないブラックホールが、なぜ温度とエントロピーを持つ熱力学系なのか。その状態量・安定性・一般化は、どの幾何・量子場・境界条件の下で成り立つのか。**

GR IIで学んだ地平線・表面重力・Raychaudhuri方程式と、QCURVで導出したHawking温度を、TH/SMの熱力学へ接続する。物理的意味の異なる「古典的ブラックホール力学の法則」と「量子効果を含む熱力学の法則」を分け、Schwarzschild、Reissner–Nordström、Kerr（必要箇所ではKerr–Newman）、有限空洞、Schwarzschild–AdS、簡単な高階曲率作用を横断する。

修了時には次を仮定・境界条件・単位・中間計算付きで再構成できる。

1. 定常Killing地平線の表面重力の規格化、零法則、面積定理、平衡状態版と物理過程版の第一法則の差を説明し、代表解で検算する。
2. Hawking温度と第一法則からBekenstein–Hawkingエントロピーを求め、$M,A,J,Q$ の状態空間と共役量、Smarr関係、極限ブラックホールの扱いを検証する。
3. Euclid時間の周期性と円錐特異点、Einstein–Hilbert・Gibbons–Hawking–York境界項、半古典サドル近似を順に用いて作用から自由エネルギーとエントロピーを算出する。
4. 負熱容量と「どのアンサンブル・境界条件で安定か」を区別し、有限空洞およびAdSの熱力学的分岐とHawking–Page転移を計算する。
5. 微分同相不変作用の共変位相空間・Noether電荷からWaldエントロピーを構成し、Einstein重力と高階曲率模型を比較する。
6. 一般化エントロピー、一般化第二法則、Bekenstein boundの仮定と限界を整理し、微視状態数および情報問題の未解決範囲を正確にBHI/HOLOへ渡す。

**全24講 = 第I部7講 + 第II部4講 + 第III部6講 + 第IV部3講 + 第V部4講。** 旧15候補を一対一の講義にせず、主要な証明・具体計算・演習を独立に完結できる24個の中心問いへ再編した。24は現行の正式設計数であり、各回に必要な内容を省くための上限ではない。変更が必要になれば章IDと横断参照を同一PRで更新する。

## 1. 直接前提と所有範囲

| 既習正本 | BHTで再利用する内容 | BHTで新たに行うこと |
| --- | --- | --- |
| [TH（熱力学）](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md)・[SM（統計力学）](../plan_done/DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) | 熱力学第一・第二法則、Legendre変換、自由エネルギー、アンサンブルと安定性 | ブラックホールの境界条件・幾何的状態量への適用。熱・統計の一般定理を再証明しない |
| [GR I・II](../plan_done/DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md) | GR11の境界作用、GR29–36の地平線と面積定理、GR31–33の代表解、GR45の表面重力 | 力学法則の熱力学的解釈、定常解の変分、物理過程の第一法則、Smarr関係 |
| [QCURV1–21](../plan_done/DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md) | QCURV9–14のHawking温度・状態・Tolman則、QCURV17の半古典的流束 | 温度の熱力学的同定、エントロピー、一般化第二法則、アンサンブル。Bogoliubov積分・灰色体因子は再導出しない |
| [QFT I〜IV](../plan_done/DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md)の必要部分 | 場の作用、量子経路積分の形式的サドル展開 | 重力のEuclid境界値問題・on-shell作用・熱力学ポテンシャル。一般的QFTを再構築しない |
| [QINF](../plan_done/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)の必要部分 | 密度演算子、von Neumann・エンタングルメントエントロピー | 地平線外部のエントロピー収支を定式化し、BHIへの入口を作る |

**canonical ownership：** GRが地平線の幾何学的定義・一般的面積定理を、QCURVがUnruh/Hawking放射の場の導出を所有する。BHTは熱力学の四法則のブラックホールへの適用、状態量、Euclid重力熱力学、安定性、Waldエントロピー、一般化第二法則を所有する。[BHI I・II](../plans/DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md)はPage曲線・情報損失・islandの計算、[HOLO](../plans/DREAM_THEATER_HOLOGRAPHY_I_PLAN.md)はAdS/CFT辞書・RT/HRT・量子極値曲面を所有する。Hawking–Page転移はBHTで重力側の作用差まで扱い、CFT側の解釈はHOLOへ委ねる。

[熱・時空・情報の横断ルート](../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)を学修経路の正本とする。[時空・量子場数学ルート](../plans/DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)のLORG・HPDEの必要結果を参照し、MICA（Hadamardと繰り込み）・AQFT（局所環・モジュラー理論）は厳密化ルートの追加前提とする。全講を必修にしない。未実装または未確認の結果は既習扱いせず、章内で導入するか適用条件付きの参照結果とする。

基準：4次元、計量符号 $(-,+,+,+)$、まず $G=c=\hbar=k_B=1$。定理・計算ごとに漸近平坦性／AdS境界、定常性、地平線の正則性、Killing場の規格化、電荷、作用の境界条件を明記する。温度とエントロピーを次元付きに戻す回を設ける。宇宙検閲・エネルギー条件・半古典近似を無条件の定理にしない。

## 2. 教科書・標準講義との照合と改訂理由

| 文献・公開資料 | 照合した主要内容 | 本PLANへの反映 |
| --- | --- | --- |
| R. M. Wald, *General Relativity* (1984), 第12・14章 | ブラックホールの古典的構造、力学の法則、場の量子効果 | 力学の四法則を量子的熱力学と区別し、定常性・地平線の仮定を先行確認 |
| R. M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics* (1994), 第6・7章 | 古典的ブラックホール熱力学とHawking効果の接続 | QCURVのHawking導出を参照してBHTでは状態量とエントロピーの同定に集中 |
| H. S. Reall, *Black Holes*（Cambridge Part III, 2024）, 第9・10章 | 面積定理、平衡状態／物理過程の第一法則、Hawking温度、蒸発 | 第一法則を二つの版に分け、近似・エネルギー条件・境界設定を明記 |
| D. Tong, *General Relativity*, 第6章 | Kerrの地平線面積、可逆エネルギー抽出と熱力学 | $M,A,J,Q$ の具体計算とSmarr型スケーリングを必須演習に |
| D. Cassani, *Black Holes and Semi-Classical Quantum Gravity*（LACES 2019） | Euclidサドル、Hawking–Page、Wald公式、極限解、微視状態問題 | 元案で薄いEuclid重力・AdS安定性・高階曲率を独立部にし、微視状態の詳細は他科目へ |
| R. M. Wald, *The Thermodynamics of Black Holes*（Living Reviews, 2001） | 一般化第二法則、エントロピー境界、未解決問題と各主張の射程 | 「一般化第二法則」と「Bekenstein bound」の仮定と確立度を区別 |
| J. W. York, *Black-hole thermodynamics and the Euclidean Einstein action* (1986) | 有限空洞での正準アンサンブルの整合と安定性 | 負熱容量を無条件の不安定性とせず、境界温度・空洞の役割を計算 |
| S. W. Hawking & D. N. Page, *Thermodynamics of Black Holes in anti-de Sitter Space* (1983) | AdSの競合サドルと熱的相転移 | 重力側のon-shell作用差・相境界をBHTで計算 |
| R. M. Wald (1993), V. Iyer & R. M. Wald (1994) | 微分同相不変作用のNoether電荷とエントロピー | 共変位相空間→Noether電荷→Einstein/高階曲率という三段を分離 |

参照したのは出版社公開の目次・解説、大学の公開講義ノート、著者の総説・一次論文であり、証明や演習を転載しない。

- Wald, *General Relativity*（出版社）: https://press.uchicago.edu/ucp/books/book/chicago/G/bo5952261.html
- Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*（出版社）: https://press.uchicago.edu/ucp/books/book/chicago/Q/bo3684008.html
- Reall, *Black Holes*（講義ノート）: https://www.damtp.cam.ac.uk/user/hsr1000/black_holes_lectures_2024.pdf
- Tong, *General Relativity*, §6: https://www.damtp.cam.ac.uk/user/tong/gr/grhtml/S6.html
- Cassani, LACES 2019: https://www.ggi.infn.it/laces/LACES19/BH19.html
- Wald, Living Reviews: https://doi.org/10.12942/LRR-2001-6
- York, Phys. Rev. D 33 (1986): https://doi.org/10.1103/PhysRevD.33.2092
- Hawking–Page, Commun. Math. Phys. 87 (1983): https://doi.org/10.1007/BF01208266
- Wald, Noether charge: https://arxiv.org/abs/gr-qc/9307038
- Iyer–Wald, Noether formalism: https://arxiv.org/abs/gr-qc/9403028

## 3. 全24講の確定シラバス

表の計算課題は**各章の最低到達線**であり、証明の前提、主要な中間式、反例、A4/B3/C1以上の演習と全詳細解答を省略しない。

### 第I部：古典的ブラックホール力学の法則（BHT1〜BHT7、7講）

1. **BHT1｜ブラックホールを状態量で記述する**：TH/SMの平衡系・熱力学ポテンシャルを復習し、Schwarzschildの質量・面積・表面重力を同じ解から計算。古典的「力学の法則」と温度の物理的同定はまだ別であると確認する。
2. **BHT2｜Killing地平線と零法則**：地平線生成Killing場の規格化、$\kappa$ の定義の等価性と成立条件、定常性・エネルギー条件を置いた表面重力一定性。規格化を変えた反例比較を行う。
3. **BHT3｜面積定理と第二法則の仮定**：GR34–36のRaychaudhuri・集束結果から、零エネルギー条件、地平線生成線、大域的仮定を点検して面積非減少へ橋渡しする。量子蒸発中は同じ結論を無条件に使わない。
4. **BHT4｜Schwarzschild・Reissner–Nordströmの第一法則**：定常解族で$A(M,Q)$、$\kappa$、電位$\Phi_H$を直接微分し、$\delta M=\kappa\delta A/(8\pi)+\Phi_H\delta Q$ を検算する（Schwarzschildは$Q=0$）。
5. **BHT5｜回転ブラックホールの第一法則**：Kerr（発展ではKerr–Newman）の$A,\kappa,\Omega_H$と地平線生成場を求め、$\Omega_H\delta J$（および電荷項）を含む平衡状態版の変分関係を確認する。一般性を代表解の代数計算と混同しない。
6. **BHT6｜物理過程版の第一法則**：小さな物質流入、地平線上のエネルギー・角運動量流束、線形化Raychaudhuriをつないで面積の変分を得る。定常端状態への仮定、二次効果の捨て方、平衡状態版との違いを明示する。
7. **BHT7｜Smarr関係・不可逆質量と仕事**：次元・Eulerの同次性からSmarr関係を導き、Kerrの不可逆質量、可逆エネルギー抽出・面積不等式を照合する。宇宙項を含む場合のスケーリング変更は後半への予告に留める。

### 第II部：量子温度から熱力学的エントロピーへ（BHT8〜BHT11、4講）

8. **BHT8｜Hawking温度の熱力学的意味**：QCURV10–14の粒子生成と状態選択を参照し、$T_H=\kappa/(2\pi)$ の観測者・Killing時間・Tolman赤方偏移・熱平衡条件を区別。永遠の解と崩壊後の放射を同一状態としない。
9. **BHT9｜Bekenstein–Hawkingエントロピー**：第一法則と温度から自然単位で$S_{\rm BH}=A/4$（物理単位では$S_{\rm BH}=k_Bc^3A/(4G\hbar)$）を導く。積分定数・領域・正規化を説明し、Schwarzschildの質量依存・数値スケールを検算する。
10. **BHT10｜回転・電荷を含む熱力学の整合**：$dM=T_HdS+\Omega_HdJ+\Phi_HdQ$ とSmarr関係をRN/Kerr例で突き合わせ、共役量と状態空間・正則性の範囲を確認する。物理単位とゲージの基準を明示する。
11. **BHT11｜極限ブラックホールと第三法則**：$\kappa\to0$ の極限、有限面積エントロピー、零温度への動的到達不能性と熱力学的第三法則の諸表現を区別する。極限操作とEuclid解の非可換性を後続計算の警告として示す。

### 第III部：Euclid重力・アンサンブル・熱安定性（BHT12〜BHT17、6講）

12. **BHT12｜Euclid周期性と円錐正則性**：非極限・静的地平線近傍をEuclid化し、極座標の欠損角が消える周期$\beta=2\pi/\kappa$を求める。Lorentz場の量子状態からの温度導出と同一証明とはしない。
13. **BHT13｜重力作用と境界値問題**：GR10–11を参照し、Euclid化したEinstein–Hilbert作用、Gibbons–Hawking–York項、固定境界計量、背景差引き・必要な反項を整理。どの作用がどのアンサンブルに対応するかを固定する。
14. **BHT14｜Euclidサドルから自由エネルギーへ**：Schwarzschildのon-shell作用を境界項まで評価し、半古典$Z\simeq e^{-I_E}$から$F,E,S$を計算。サドル支配・負モード・赤外/境界の扱いを注意書きにせず検査する。
15. **BHT15｜負熱容量と有限空洞**：$T\propto1/M$から固定した条件下での$C<0$を計算し、York型有限空洞の壁温度と準局所エネルギーを導入。安定・不安定枝と正準／微正準の違いを導く。
16. **BHT16｜AdSブラックホールとHawking–Page転移**：4次元Schwarzschild–AdSの$T(r_+),S(r_+),F(r_+)$を求め、熱的AdSと同一境界条件で作用を比較する。安定枝・転移温度の意味を計算し、境界CFTでの解釈はHOLOへ送る。
17. **BHT17｜電荷・回転とアンサンブル選択**：固定$Q$と固定$\Phi$、固定$J$と固定$\Omega$の境界データ・Legendre変換を整理。代表的RN（必要ならKerr）模型で熱容量・Hessian等の安定性判定を計算し、超放射や境界条件により平衡の存在が変わることを示す。

### 第IV部：Noether電荷とWaldエントロピー（BHT18〜BHT20、3講）

18. **BHT18｜共変位相空間とNoether流**：微分同相不変Lagrangianの変分を場の方程式・境界ポテンシャルへ分け、シンプレクティック流とNoether流・電荷を作る。形式的な部分積分と境界条件を実際に追う。
19. **BHT19｜Wald公式とEinstein重力**：分岐Killing地平線を持つ定常解の仮定からNoether電荷による第一法則・エントロピー公式を導き、Einstein–Hilbert作用に代入して$A/(4G)$を回復する。正規化・向き・係数を検算する。
20. **BHT20｜高階曲率とWald公式の適用限界**：$f(R)$等の単純な微分同相不変模型で$\partial L/\partial R_{abcd}$から補正エントロピーを計算。動的地平線、非定常摂動、量子補正、Noether電荷の曖昧さを区別し、一般的な第二法則を無条件に宣言しない。

### 第V部：一般化第二法則・エントロピー境界・微視状態（BHT21〜BHT24、4講）

21. **BHT21｜一般化エントロピーと繰り込み**：$S_{\rm gen}=A/(4G_{\rm ren})+S_{\rm out}^{\rm ren}+\cdots$の領域・カット・量子状態を定義。外部エンタングルメントの紫外発散と面積項の繰り込みの対応をモデル依存性ごと確認し、有限次元量子情報の式を無条件で代入しない。
22. **BHT22｜一般化第二法則（GSL）**：物体を落とす思考実験、Hawking放射の外部エントロピー、地平線面積減少を同じ収支で扱う。一般化第二法則が成り立つための量子状態・エネルギー・半古典近似の条件と、証明される範囲を整理する。
23. **BHT23｜Bekenstein boundと限界**：弱重力・有限サイズ系の$S\le2\pi ER/\hbar c$型評価を導入し、降下実験の仮定（位置・エネルギー・浮力・境界）を点検する。任意の場や強重力系で普遍的に使える定理とはしない。
24. **BHT24｜総合検算・微視状態と情報問題への橋**：古典四法則、温度、作用・自由エネルギー、Wald・一般化エントロピーをSchwarzschild/RN/AdSの条件表で照合。$S_{\rm BH}$が示唆する微視状態数と、特定模型での計数成果が一般の四次元蒸発ブラックホールの微視状態・放射のfine-grained情報の解決を意味しないことを区別し、BHI・HOLOの問いに接続する。

## 4. 横断演習・数理監査の合格線

- **法則の適用範囲**：定常Killing地平線、event/apparent/isolated horizon、非極限／極限、Einstein／高階曲率の差を表にし、各定理で使う仮定を示す。
- **必須再計算**：Schwarzschild $A=16\pi M^2,\ \kappa=(4M)^{-1},\ T=(8\pi M)^{-1},\ S=4\pi M^2,\ C=-8\pi M^2$（自然単位）；RN/Kerrの第一法則、Smarr、Euclid周期と作用、空洞およびAdSの安定枝、Einstein／$f(R)$のWald公式、GSLの収支の各々を独立に検算する。
- **アンサンブルの明示**：固定するのが境界温度かエネルギーか、電荷か電位か、角運動量か角速度かを省略しない。負熱容量だけで微正準の不安定性を結論しない。
- **量子論の限界**：Hawking放射の近似・灰色体因子・逆作用はQCURVを参照し、極限への外挿、正則化依存、紫外発散の処理を区別する。一般化エントロピーの極値・islandはBHI II／HOLOに渡す。
- **定義の初出順**：各章のformal statement・例・解答に現れる専門語を、先行する導入か直接prerequisiteの実在する定義に接続する。既出結果を援用する箇所では実在するstable anchorへリンクする。
- **章の品質**：動機→直接例→定義→主要命題・核心証明→反例／条件の限界→演習の順に読めるよう設計し、各章にLevel A4/B3/C1以上と全詳細解答を置く。最低題数の水増しはせず、必要な学修目標を演習で覆う。
- **査読・CI**：新規章は全主要証明・全演習解答の出発点からの自己再計算と完成本文の別観点再読を区別して記録。対象章の変更区分に対応する検証、科目横断の依存・参照・公開導線の監査を経て初めて完了扱いする。別の完了章の追跡監査は明示依頼時のみ実施する。

## 5. 着手・完了条件

BHT1〜BHT5は状態量・零法則・面積法則・非回転および回転の定常解族の第一法則までの本文、演習、各章の査読と公開導線を実装した。BHT6〜BHT24の本文、各章の検証と系列横断監査は残るため、PLANは textbook/plans_progress/ に置く。未実装章のcanonical結果をDAGや公開索引へ先取りしない。

全24章が原則の証明・演習水準を満たし、系列manifest・目次・prerequisite・stable anchorと横断査読・CIが整合したときだけ textbook/plan_done/ へ移す。**講義数が24であることと完成していることを混同しない。**
