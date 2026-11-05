# DREAM THEATER 曲がった時空の量子場 I（QCURV系列・講数可変）

作成・分冊: 2026-10-11  
改訂: 2026-11-03（標準教科書・公開講義ノート・原論文との範囲照合）  
状態: in_progress（QCURV1〜QCURV21の実装・章別査読・公開導線を進行。PLAN全体の科目横断監査と完了判定は未完了）

## 0. 中心問いと到達点

**古典的な背景時空を固定しても、量子場の「粒子」「真空」「温度」が観測者や状態にどう依存するのか。なぜ加速観測者に熱的な応答が現れ、崩壊ブラックホールから放射が生じるのか。**

平坦時空の自由場で用いた正振動数分解・粒子描像は、一般の曲がった時空では自然には一意に定まらない。古典解と二点関数を基礎に据え、モードとBogoliubov変換、粒子検出器、RindlerとUnruh効果、重力崩壊とHawking放射、応力テンソル・半古典的逆作用へ順に進む。

完成時に次を**仮定・規格化・中間計算付きで**再現できること。

1. 大域双曲な背景の実自由Klein–Gordon場について、保存内積、モード規格化、正振動数部分空間と量子状態の選択を区別する。
2. Bogoliubov係数の正準関係、in真空でのout粒子数を時間依存模型で検算し、無限自由度でのFock表現の非同値性を理解する。
3. Unruh–DeWitt検出器の応答を二点関数から計算し、有限時間の切替効果と定常・長時間の詳細釣合いを区別する。
4. Rindlerくさびへの状態の制限と一様加速検出器の応答からUnruh温度を導く。
5. 重力崩壊時空で光線の指数関係からHawking温度を導き、波束・灰色体因子・状態選択・遅い時刻の近似を説明する。
6. Boulware・Unruh・Hartle–Hawking状態を比較し、Hadamard差引きによる応力テンソルの期待値、半古典的逆作用の射程と限界を述べる。

**対象は固定した古典背景上の自由場、およびその量子期待値に基づく半古典近似である。** ブラックホールエントロピーの熱力学的意味はBHT、蒸発の情報問題はBHI、重力双対やislandはHOLO/BHIへ引き渡す。量子重力の蒸発終期を導出済み扱いしない。

## 1. 直接前提・canonical owner・実装境界

| 正本 | この講座で使う内容 | 依存の扱い |
| --- | --- | --- |
| [一般相対論 I・II（GR）](../plan_done/DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md) | Schwarzschild解、零測地線、地平線、Killing場、表面重力、因果図 | 場の量子効果に必要な座標・光線計算は再現。Einstein方程式一般論は重複させない |
| [量子場理論 I〜IV（QFT）](../plans_progress/DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md) | **科目Iの自由場の必要部分**、Fock量子化、CCR、Wightman二点分布 | 相互作用・QED・CFT全講は必須にしない |
| [Lorentz幾何（LORG）](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) | 大域双曲性、Cauchy面、因果構造 | 幾何一般定理の正本 |
| [Lorentz多様体上の双曲型PDE（HPDE）](../plan_done/DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) | 古典Klein–Gordon初期値、Green作用素、シンプレクティック解空間 | 量子状態の物理・検出器はQCURVが所有 |
| [超局所解析・Hadamard条件（MICA）](../plan_done/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md) | Hadamard二点関数、点分離、局所共変な応力テンソル | 一般的な数学証明はMICA。QCURVは物理的状態と流束の具体計算 |
| [量子情報（QINF）](../plan_done/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md) | 縮約状態・熱的混合状態・エンタングルメントの入口 | くさびへの制限に必要な結果だけ参照し、全講必修とはしない |
| [数学基盤ルート](../plans/DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)、[熱・時空・情報ルート](../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md) | 学修経路と他科目との境界 | 参照先の未実装結果を既証扱いしない |

- **最小学修路**：QFT Iの自由場、LORG/HPDEの必要結果、GRのブラックホール幾何 → QCURV。MICAの厳密Hadamard理論を深掘りする路と、QINF/AQFTによる状態・代数の路は必要箇所から分岐させる。MICAが完成済みであっても、QCURVでの物理的適用は別途導出する。
- **QCURVの所有範囲**：背景依存の真空・粒子生成、検出器の物理的応答、Rindler/Unruh、重力崩壊/Hawking、ブラックホールの代表的量子状態、エネルギー流・半古典的近似。
- **他科目の所有範囲**：MICAはHadamard条件・局所くりこみの一般定理、AQFTは局所代数・モジュラー理論、BHTはブラックホール熱力学・エントロピー、BHIは情報損失の論理、HOLOは重力双対・island関連。定理の一般証明をQCURVで複製せず、使う位置で実在するstable anchorへリンクする。
- 題名の「I」から未設計の続編を既成事実化しない。相互作用場の曲率背景での一般くりこみ、宇宙初期揺らぎの高度な理論、量子重力は必要なら別PLANにする。

### 1.1 共通の舞台と式の規約

基本は時間向き付き滑らかな**4次元大域双曲Lorentz時空** $(M,g)$、計量符号 $(-,+,+,+)$、境界なし、自然単位 $\hbar=c=k_B=G=1$。定理ごとに非コンパクトCauchy面の減衰条件、漸近平坦性、Killing場、地平線、時空領域の境界条件を追加する。Rindlerくさびやブラックホール外部は全時空と区別する。

- 実自由スカラー場の作用を $S=-\frac12\int_M\left(g^{ab}\nabla_a\phi\nabla_b\phi+(m^2+\xi R)\phi^2\right)d\mathrm{vol}_g$ とし、場の方程式は $(-\Box_g+m^2+\xi R)\phi=0$、$\Box_g=g^{ab}\nabla_a\nabla_b$、$m\ge0$。場の分布としての意味、実/複素化、解の空間を導入してから使う。
- 未来向き単位法線 $n^a$ を持つCauchy面 $\Sigma$ に対し $(u,v)_{\mathrm{KG}}=i\int_\Sigma\left(u^* n^a\nabla_a v-(n^a\nabla_a u^*)v\right)d\Sigma$。保存性は流束消失等の条件付き。**全複素解空間では正定値でない**ため、正振動数部分空間を選んでから一粒子内積とする。
- $\alpha,\beta$の添字とin/outの向き、Fourierの位相、モード規格化を固定し、$u^{out}=\alpha u^{in}+\beta u^{in*}$ の概略式から、適切な添字・総和を伴う $\langle0_{in}|N^{out}|0_{in}\rangle=\sum|\beta|^2$ を検算する。連続スペクトルのデルタ規格化・波束を明記する。
- 4次元質量零・共形結合は $\xi=1/6$。FLRWの共形真空で粒子生成がないという結論は場・状態・モードの選択に依存する。検出器応答や局所エネルギーが常に零という意味ではない。

## 2. 教科書・標準講義との比較

| 文献 | 確認した重点 | 改訂への反映 |
| --- | --- | --- |
| N. D. Birrell & P. C. W. Davies, *Quantum Fields in Curved Space* (1982), ch. 3–8 | モード量子化、検出器、宇宙膨張とRindler、応力テンソルのくりこみ、量子ブラックホール | 旧案に薄かった**膨張模型・断熱/共形真空**を追加し、流束と温度の導出を区別 |
| R. M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics* (1994) | 粒子描像に依存しない場・状態の構成、Unruh/Hawkingの前提 | **状態と二点関数を粒子数より基礎に置く**。一般の代数論はAQFTと分担 |
| L. Parker & D. Toms, *Quantum Field Theory in Curved Spacetime: Quantized Fields and Gravity* (2009), ch. 2–4 | 宇宙膨張、加速検出器、応力テンソル、崩壊時空、逆作用・trans-Planckian問題 | 宇宙論模型、有限時間の検出、逆作用の使用限界を補強。一般相互作用・有効作用は別系列 |
| C. J. Fewster, *Lectures on Quantum Field Theory in Curved Spacetime* (2008) | 大域双曲性、正準/代数量子化、Unruh、重力的粒子生成、Hadamard・波面集合 | 学習順と数学的入口を照合。微局所一般論はMICAに接続 |
| S. Hollands & R. M. Wald, *Quantum fields in curved spacetime* (2015) | 局所共変性、二点分布、Hadamard状態、Wick多項式とくりこみ | 状態の正則性・局所観測量・有限なくりこみ自由度を分離 |
| S. W. Hawking, *Particle Creation by Black Holes* (1975) | 崩壊時空の光線追跡と後期粒子生成 | **永遠のブラックホールのEuclid周期性だけで証明を済ませず、in/out波束を中心計算にする** |
| J. Louko & A. Satz, *Transition rate of the Unruh–DeWitt detector in curved spacetime* (2008) | 切替・正則化・遷移率の条件 | 定常・長時間極限と有限時間の過渡応答を分離 |

出版社公開の目次・序文、研究者が公開した講義資料、論文の要旨・書誌を照合した。本文・演習・証明は転載せず独自に構成する。

- Birrell–Davies（出版社の目次）: https://www.cambridge.org/core/books/abs/quantum-fields-in-curved-space/contents/AA158F2AE2F54A91596CDD0C8E884BF4
- Wald（出版社紹介）: https://press.uchicago.edu/ucp/books/book/chicago/Q/bo3684008.html
- Parker–Toms（出版社公開の目次）: https://assets.cambridge.org/97805218/77879/frontmatter/9780521877879_frontmatter.pdf
- Fewster（研究所公開の講義ノート）: https://www.mis.mpg.de/de/publications/preprint-repository/lecture_note/2008/issue-39
- Hollands–Wald: https://arxiv.org/abs/1401.2026
- Hawking: https://doi.org/10.1007/BF02345020
- Louko–Satz: https://arxiv.org/abs/0710.5671

## 3. 学習テーマと自然な章境界（仮候補・講数可変）

以下の番号は**論点の順番であり、正式章IDでも21講の割当でもない**。旧15週シラバスから移行した候補であり、講数・学修週数を固定しない。証明のまとまりと読者の中心問いによって統合・分割し、正式章IDは実装着手時に衝突・直接依存を確認して決める。

### 第I部：曲がった時空で真空をどう定義するか

1. **自由場の舞台**：曲率結合付きKlein–Gordon作用の変分・境界項・古典方程式、Cauchy問題、背景固定の仮定と量子化の区別。
2. **解空間と量子状態**：保存KG内積のCauchy面独立性と符号、シンプレクティック形式、正振動数分解・複素構造・CCR、Fock状態、Wightman二点分布の正値性。静的/Killing場がある場合と一般の背景を比較。
3. **Bogoliubov変換と粒子数**：完全モード系の規格化、$\alpha\alpha^\dagger-\beta\beta^\dagger=I$ ともう一方の正準条件の導出、in真空のout粒子数、波束、$\beta$のHilbert–Schmidt条件と無限自由度のユニタリ同値性。
4. **宇宙膨張における粒子生成**：漸近的に定常なFLRWまたは可解な時間依存振動子でin/out粒子数を計算。質量零・共形結合場では共形真空に関して生成が消える対照例を示す。
5. **断熱真空とHadamard性**：高振動数WKBの適用条件と次数、二点分布の短距離構造、有限断熱次数と厳密Hadamard条件の差。Hadamard性だけでは真空は一意でない。一般の微局所証明はMICAへ。

### 第II部：加速観測者は何を測るか

6. **粒子数と検出器応答の違い**：切替関数 $\chi(\tau)$、世界線 $x(\tau)$、検出器のエネルギー間隔 $\Omega$ を先に導入。一次摂動から応答 $\mathcal F(\Omega)=\int d\tau\,d\tau'\,\chi(\tau)\chi(\tau')e^{-i\Omega(\tau-\tau')}W(x(\tau),x(\tau'))$ を導出。二点分布の世界線への引戻しと滑らかな切替の条件を説明。
7. **MinkowskiとRindlerの比較**：等加速度軌道、Rindler座標と左右のくさび、固有加速度・boost時間・正振動数、地平線とモード。Minkowski真空のくさびへの制限を二点関数またはモードで確認。
8. **Unruh温度の二つの導線**：加速軌道上のWightman二点関数の解析的構造・KMS条件と、Bogoliubov係数の描像を比較。長時間の定常遷移率の詳細釣合いから $T_U=a/(2\pi)$。有限時間では一般に厳密な熱スペクトルにならないことを検算。

### 第III部：崩壊ブラックホールのどこから放射が生じるか

9. **地平線・表面重力・観測時刻**：Schwarzschild外部、tortoise座標、Eddington–Finkelstein/Kruskal座標、無限遠で規格化したKilling時間、$\kappa$の単位と意味。事象・見かけ・Rindlerの地平線を混同しない。
10. **崩壊時空のin/out波束**：過去/未来の無限遠、入射advanced時刻 $v$ と出射retarded時刻 $u$ を定義。遅い出射光線の $v_H-v(u)\simeq A e^{-\kappa u}$ の成立条件を幾何光学近似とともに示す。
11. **Hawking温度の実計算**：指数写像をFourier積分/Bogoliubov係数へ代入。Gamma関数、解析接続の枝と位相、正負振動数係数の比、波束化と遅い時刻の極限から $T_H=\kappa/(2\pi)$ を得る。連続モードの $\delta(0)$ を一個の粒子数と誤読しない。
12. **散乱障壁とgreybody因子**：球面調和分解、動径ポテンシャル、透過係数 $\Gamma_\ell(\omega)$。質量零スカラー・非回転Schwarzschildで遠方の数流束 $d^2N/(dt\,d\omega)=(2\pi)^{-1}\sum_\ell(2\ell+1)\Gamma_\ell(\omega)/(e^{\omega/T_H}-1)$ を計算。回転・荷電・フェルミオン・超放射には無条件に拡張しない。
13. **三つのブラックホール状態**：Boulware、Unruh、Hartle–Hawking状態の遠方入出射流束、過去/未来地平線の正則性、熱平衡性を条件付きで比較。崩壊時空を永遠の熱平衡状態と同一視しない。
14. **Unruh・Hawking・Tolman則の比較**：加速・静止・自由落下・無限遠観測者の時間と局所エネルギーを区別し、熱的状態、検出器の応答、無限遠への実放射流束を別の観測量として整理。Euclid時間の周期だけを崩壊放射の完全証明としない。

### 第IV部：局所観測量と半古典的逆作用

15. **Hadamard差引きと観測量**：二点分布の普遍的特異部と状態依存の滑らかな差、点分離、$\langle\phi^2\rangle_{\mathrm{ren}}$ と $\langle T_{ab}\rangle_{\mathrm{ren}}$、保存則・曲率による有限項。一般の波面集合・存在証明はMICAへ。
16. **二次元模型とtrace anomaly**：$1+1$次元共形模型のnull座標変換、Schwarzian微分と流束の関係を状態・境界条件付きで計算。IR、中心荷、符号規約を明記し、四次元のgreybody因子を無視した一般証明にはしない。
17. **半古典Einstein方程式**：$G_{ab}+\Lambda g_{ab}+\text{(許容される局所曲率項)}=8\pi G\langle T_{ab}\rangle_{\mathrm{ren}}$ と保存条件、ゆっくり蒸発するSchwarzschild模型のエネルギー収支、概算時定数。高階微分問題・初期状態と量子重力領域の難点を明示。
18. **導出範囲とUV感度**：定常・外部領域の近似、地平線形成、超Planckianな遡及周波数、場の相互作用と状態選択を棚卸し。短距離物理を変えた一部模型での頑健性を普遍的な証明と同一視しない。

### 第V部：比較模型・総合演習

19. **de Sitterと宇宙論的地平線**：Bunch–Davies状態、静的パッチと共動観測者、Gibbons–Hawking温度を最低限の定義から導入。ブラックホール遠方の散乱流束と同一視しない（内容が肥大化すれば独立章）。
20. **模型の横断比較**：時間依存振動子/FLRW、Minkowski–Rindler、崩壊ブラックホール、$1+1$次元共形模型を「背景・状態・モード・検出器・応力テンソル・観測者・近似」で対照する。
21. **総合再導出・後続への接続**：Hawking温度、greybody、地平線正則性と半古典的エネルギー収支を一つの説明に統合。BHTへ温度の物理条件、BHIへ情報議論に別途必要な仮定を渡す。

## 4. 必ず閉じる計算・証明と反例

章の題名だけで済ませず、以下を実本文の定義、主要結果、導出、演習詳細解答で確認する。

| 責務 | 紙上で必要な中間段階 | 典型的誤解・反例 |
| --- | --- | --- |
| KG内積の保存 | 保存流の発散零、二つのCauchy面間のStokes、無限遠の流束条件、正/負モードの符号 | 全解空間で正定値とは限らない |
| Bogoliubov変換 | 完備性→CCR保存→$\alpha/\beta$の正準制約→$\langle N\rangle$。波束・無限モードの収束 | 各モードの有限な係数と総粒子数/表現同値を混同 |
| FLRW生成・非生成 | 共形時間と場の再スケーリング、実効振動数、モード方程式と$\beta$ | 4次元質量零・共形結合の共形真空は一般の質量場と異なる |
| 検出器とUnruh | 検出器相互作用から応答積分、軌道上への二点関数の引戻し、KMSと詳細釣合い | 有限スイッチング中の励起が厳密な熱平衡とは限らない |
| 崩壊とHawking | $v(u)$の指数関係、Fourier/Gamma積分と位相、正負振動数係数の比、波束、無限遠時刻の規格化 | 永遠のSchwarzschildのEuclid周期だけでは崩壊in/out導出にならない |
| 無限遠の流束 | 動径方程式の散乱、$\Gamma_\ell$、粒子統計とエネルギー積分 | 地平線近傍の熱因子が遠方で完全な黒体になるとは限らない |
| くりこみと逆作用 | Hadamard特異部分との差、局所曲率の有限項、保存則、エネルギー収支 | くりこみ値の一意性や蒸発終期の有効性を無条件に主張しない |

**具体模型による検算の候補**（章境界に応じて配分）：

- 一次元振動子の周波数急変：規格化したin/out解から $|\alpha|^2-|\beta|^2=1$ と粒子数を得る。これは符号・正規化の検算模型であり、一般曲率背景の証明の代用ではない。
- 4次元Minkowskiの質量零スカラー場：慣性軌道と一様加速軌道で検出器の定常遷移率を比較し、励起/脱励起の比を求める。
- 質量零・共形結合のFLRW：場の再スケーリング後の方程式から、指定した共形真空の $\beta=0$ を確認する。
- Schwarzschild：Killing場の無限遠規格化から $\kappa=1/(4M)$、$T_H=1/(8\pi M)$ を導く。SI単位では $T_H=\hbar c^3/(8\pi G M k_B)$ に戻す。
- $1+1$次元の指数null座標写像：Schwarzian微分から定常流束を計算し、次元、状態、中心荷、くりこみの規約に依存する係数を検算する。

## 5. 演習・図・定義初出・査読

- 各実装章の実本文には現行規約に従い、原則として **Level A 4題、B 3題、C 1題以上**、全題の詳細解答を置く。最低題数で目標を練習できなければ追加する。Aは内積の符号・モード規格化・Rindler加速度・共形変換、Bは振動子の$\beta$・検出器応答・散乱係数・状態の比較、Cは崩壊のin/out導出から温度とgreybodyを接続する総合課題等を候補とする。
- 図はRindlerの左右くさびと世界線、重力崩壊の因果図と光線、$u\mapsto v$の指数関係、Schwarzschild動径ポテンシャルと反射/透過、状態別の流束の向きが必要な箇所で検討する。座標、時間向き、地平線と無限遠の違いを本文で確定し、図を証明の代わりにしない。追加SVGは現行standardの描画・アクセシビリティ・実レンダリング監査を行う。
- 定義を**初出・使用順**で監査する。例：正振動数/複素構造/Bogoliubov係数、Wightman二点分布/切替関数、KMS/詳細釣合い、Killing時刻/表面重力、Hadamard状態/点分離、くりこみ応力テンソル/局所曲率の有限項。formal statementの仮定・結論や定義例に現れる専門語も、使う前に定義するか既習の実在stable anchorへ接続する。
- 他章の定理・定義を実際に根拠として用いる位置には、その結果名からcanonical stable anchorへのリンクを付す。章頭PLANリンクだけを根拠としない。初出主要定義の条件を直接例で検証し、式の見通し、仮定の使用位置、反例で破綻する機構を明示する。

### 5.1 必須ゲート

1. **物理設定**：背景、場の種類、量子状態、観測者、時刻/座標、初期値・境界・無限遠条件、単位系、近似を明記したか。
2. **数理計算**：保存流・正準関係・添字・符号・係数・分布の引戻し・波束・Gamma関数の枝・極限と積分の交換・流束方向を検算したか。
3. **読者粒度**：初出概念の動機と直接例、主要中間式、反例、全演習の詳細解答を既習前提だけで再現できるか。
4. **結果の射程**：Unruhの熱的応答/KMS、Hawkingの後期粒子数・遠方流束、BHTの熱力学、BHIの情報問題を混同しないか。半古典近似から蒸発終期や情報回復を証明したことにしていないか。
5. **査読とCI**：新規・実質改稿章はstandardの区分Cとして全主要証明・全演習と詳細解答の自己再計算と、完成稿の別観点での再読を分ける。局所数学修正は区分B、表示変更のみは区分A。**別の完了章の追跡監査は、ユーザーが章IDを明示した場合のみ。** 変更範囲に応じたCI、PR統合結果の索引/formal/Pages検証を行い、PRに検証根拠と未確認事項を書く。

## 6. PLANのライフサイクルと完了条件

1. QCURV1の実装着手に伴い、本PLANを textbook/plans_progress/ に移した。未執筆の章を系列manifest、knowledge DAG、公開目次へ先取り登録しない。
2. 新設したQCURV系列manifestのplanパスと参照元リンクを同期する。QCURV2以降の候補IDは正式採番前に衝突と直接依存を確認する。
3. 章ごとの直接prerequisiteは実装した chapter.yaml / knowledge.yaml を正本とし、MICA・QINFの全講を一律必修化せず、必要な概念・結果へ絞る。
4. 全学修目標の実計算・主要証明・演習詳細解答・状態と観測量の対照・学修ルート・公開リンク・科目横断監査まで揃って初めて textbook/plan_done/ へ移す。BHTへ温度と流束のモデル条件、BHIへ情報問題に別途必要な仮定、宇宙論の後続へFLRW/de Sitter模型の限界を引き渡す。
