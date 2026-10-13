# DREAM THEATER 熱力学・ブラックホール・情報：科目別履修ルート

分冊: 2026-10-11  
状態: planned（横断ルートのみ、独立科目PLANの実装は未着手）

## 独立科目PLANへのリンク

- [熱力学 TH1〜8](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md)
- [統計力学 SM1〜8](DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md)
- [情報理論 I（INFO系列・講数可変）](../plans_progress/DREAM_THEATER_INFORMATION_THEORY_I_PLAN.md)
- [情報熱力学 I（ITD1〜15）](DREAM_THEATER_INFORMATION_THERMODYNAMICS_I_PLAN.md)
- [量子情報 I（QINF1〜15）](DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)
- [特殊相対論 I（SREL1〜15）](DREAM_THEATER_SPECIAL_RELATIVITY_I_PLAN.md)
- [一般相対論 I・II（GR1〜30）](DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md)
- [量子場理論 I〜IV（QFT系列・仮章数可変）](DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md)
- [曲がった時空の量子場 I（QCURV1〜15）](DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)
- [ブラックホール熱力学 I（BHT1〜15）](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md)
- [ホログラフィー I（HOLO1〜15）](DREAM_THEATER_HOLOGRAPHY_I_PLAN.md)
- [ブラックホール情報 I・II（BHI1〜30）](DREAM_THEATER_BLACK_HOLE_INFORMATION_I_II_PLAN.md)

## 直接依存の有向経路

~~~text
RA/MECH → TH → SM ────────────┐
確率論 → INFO → ITD ← TH/SM   │
QM → QINF ────────────────────┤
SREL → GR I→II ← LORG ────────┤
SREL/QM → QFT I→II ← HPDE     │（IIからIII／IVへ分岐）
GR＋QFT＋HPDE → QCURV ────────┼→ BHT → BHI I→II
GR＋QFT IV＋QINF＋BHT → HOLO ──┘          ↑     ↑
                                      INFO   HOLO
~~~

- LORG/HPDE/MICA/AQFTは[独立した数学系列](DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)が正本。MICAやAQFT全講をすべての物理科目に必須としない。
- **2026-10-13改訂: 物理・情報は17セメスター相当**（従来の15にQFT II・IIIの不足範囲を追加し、旧QFT IIのCFTはIVへ移す）。QFT I〜IVは同一PLAN内に置くが、I→II→IIIの素粒子ルートとI→IIの必要部分→IVのCFTルートに分岐する。講数・実学修週数は固定しない。
- 章ID・前提の全体衝突監査、未実装PLANの利用停止線、物理的仮定の整合は各講義着手時に確認する。本ルートファイルは個別科目の完了を代替しない。

---

## 元の横断PLANから保持した共通規則・資料（個別シラバスは各科目PLANが正本）

## 0. 中心問いとこのPLANの役割

熱・仕事・確率・情報を測る理論から、曲がった時空の地平線に温度とエントロピーが現れる理由を導き、最後に「蒸発するブラックホールの量子情報はどう扱われるか」を数学的に定式化する。

本PLANは**科目間の依存関係・境界・学修テーマ・研究論点**を管理する横断ルートである。新たに定義した [時空・量子場の数学基盤4セメスターPLAN](DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md) を数学的補完のcanonical ownerとして参照し、本PLAN内に数学講義を重複執筆しない。すでに存在する `DREAM_THEATER_THERMODYNAMICS_STATISTICAL_MECHANICS_SPIN_GLASS_PLAN.md` が **熱力学TH・統計力学SM・スピングラスSGのcanonical owner** であり、ここでTH/SMの理論的定義や証明を重複実装しない。情報幾何も既存の独立PLANが所有する。将来各専門PLANを切り出しても、正本を一つに保つ。

### 成功条件

1. 各科目が他科目のための数ページの導入ではなく、**必要な講数を設けて**一つの中心問いを閉じる学部上級〜大学院の独立講義になる。実際の講義なら演習時間・読書時間も別途必要で、単位認定を保証するものではない。
2. 既習として使える概念は既存DREAM THEATERの正式章へリンクし、未習概念は担当科目で定義・直接例・主要命題・核心証明を置く。物理的主張には仮定・近似・模型の適用範囲を付す。
3. 古典熱力学、統計力学、Shannon情報、量子情報、ブラックホール熱力学の「エントロピー」を区別した上で、対応関係が成立する条件を示す。
4. Hawking放射は**曲がった時空の量子場**で導出する。ブラックホール熱力学では結果を物理的状態量へ接続する。二つの科目が同じ導出を再執筆しない。
5. 最終章ではPage曲線・island公式の有力な半古典的計算成果と、一般のブラックホールの厳密な微視的復号が完成したという主張とを厳格に区別する。

## 1. 科目一覧（2026-10-13改訂・17セメスター相当、講数可変）

| 系列 | 科目（講数は可変） | 既存/新設 | 到達点 |
|---|---|---|---|
| 熱・情報 | 熱力学（既存正本・1セメスター） | 既存TH1–TH8 | TH8 相転移・秩序変数・総合問題 |
| 熱・情報 | 統計力学（既存正本・1セメスター） | 既存SM1–SM8 | SM8 臨界現象・普遍性への入口 |
| 熱・情報 | 情報理論 I：エントロピー・符号化・通信 | 新規 INFO1–INFO15 | 情報量・物理エントロピー比較演習 |
| 熱・情報 | 情報熱力学 I：測定・フィードバック・消去 | 新規 ITD1–ITD15 | 独立モデルによる収支総合演習 |
| 熱・情報 | 量子情報 I：密度行列・エンタングルメント・量子誤り訂正 | 新規 QINF1–QINF15 | 可逆時間発展と蒸発過程の情報収支 |
| 時空・量子場 | 特殊相対論 I：Minkowski時空と相対論的場 | 新規 SREL1–SREL15 | 因果構造と一般相対論への橋 |
| 時空・量子場 | 一般相対論 I：幾何とEinstein方程式 | 新規 GR1–GR15 | 解・仮定・座標不変量の総合演習 |
| 時空・量子場 | 一般相対論 II：因果構造とブラックホール時空 | 新規 GR16–GR30 | ブラックホール摂動・熱力学への橋 |
| 時空・量子場 | 量子場理論 I：自由場・作用・量子化・散乱 | 新規 QFT I（仮IDは着手時に確定） | 自由場・LSZ・木レベル散乱を再計算 |
| 時空・量子場 | 量子場理論 II：QED・ループ・くりこみ・Yang–Mills | 新規 QFT II（仮IDは着手時に確定） | 代表1ループ・Ward恒等式・RG・ゲージ固定 |
| 時空・量子場 | 量子場理論 III：標準模型・対称性の破れ・有効理論 | 新規 QFT III（仮IDは着手時に確定） | Higgs・電弱・QCDの模型計算（HOLOに必須ではない） |
| 時空・量子場 | 量子場理論 IV：共形場・OPE・レプリカ・エンタングルメント | 新規 QFT IV（仮IDは着手時に確定） | CFTの基本演算・区間エントロピーからHOLOへ |
| 時空・量子場 | 曲がった時空の量子場 I：Unruh効果とHawking放射 | 新規 QCURV1–QCURV15 | 導出可能範囲・近似・観測量の総点検 |
| ブラックホール | ブラックホール熱力学 I：地平線・温度・エントロピー | 新規 BHT1–BHT15 | 微視状態数の問いと情報問題への導線 |
| ブラックホール | ホログラフィー I：AdS/CFTと量子誤り訂正 | 新規 HOLO1–HOLO15 | モデル・双対性・仮説の境界を監査 |
| ブラックホール | ブラックホール情報 I：Hawking計算・Page曲線・矛盾 | 新規 BHI1–BHI15 | 諸立場の比較・未解決事項の整理 |
| ブラックホール | ブラックホール情報 II：Island・レプリカ・研究最前線 | 新規 BHI16–BHI30 | 2026時点の到達点と残る問いを論証評価 |

### 各科目の単位規模

- 1科目の講数・学習期間は固定しない。各章の中心問い、主要証明、独習に必要な演習で自然な区切りを選ぶ。TH/SMの既存8章を15週に引き伸ばさず、未証明部分があればそのために必要な講だけ追加する。
- 教材の章IDは実装時に衝突監査を行ってから確定する。上の `GRI/GRII`、`QFTI/QFTII/QFTIII/QFTIV`、`BHII/BHIII` は**科目管理キー**であり、公開章IDはその都度確定する。旧QFT1–QFT30は未実装の仮IDであり、改訂後にそのまま継承・連番固定しない。
- TH/SMは既存PLANの **TH1–TH8 / SM1–SM8** を維持する。SG1–SG8はスピングラス独立科目として存続するが、ブラックホールへの必須前提には置かない。
- この規模は一人が17科目を同時履修する前提ではない。TH→SM→情報、SREL→GR、SREL→QFTの並列経路を合流させるカリキュラムである。

## 1.1 数学科目の補完：独立4セメスター

既存のGEO1–GEO19（Riemann幾何）、PDE I/II・GPDE（Euclid空間上の超関数/弱解）、FOU、OA/VN（作用素環）を調べ、Black hole/QFT系列に共通して不足している数学を別PLANとして設計した。

| 新数学科目（講数可変） | 位置付け | 数学的な出口 |
|---|---|---|
| LORG1–LORG15：ローレンツ幾何と大域因果構造 | 基幹 | 因果集合・大域双曲性・Cauchy超曲面 |
| HPDE1–HPDE15：ローレンツ多様体上の双曲型PDE | 基幹 | 初期値問題・Green作用素・有限伝播 |
| MICA1–MICA15：超局所解析・波面集合・Hadamard条件 | 厳密ルート | 分布の積と引戻し・特異性伝播・量子場のUV構造 |
| AQFT1–AQFT15：代数的量子場理論・モジュラー理論 | 研究入門 | 局所環・Type III・Tomita–Takesaki・相対エントロピー |

新数学 **4科目** を独立に位置付ける。物理・情報のQFT I〜IVを含む計17セメスター相当の教育単位と合わせて設計するが、**60週・285週などの固定学修週数は設定しない**。数学側の学習テーマと証明課題は [専用数学PLAN](DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md) の科目別正本で扱う。

数学的に厳密なQCURV・BHT・BHIの発展内容を読む際にはMICA/AQFTを強く推奨する。一方、標準の物理講義の導入部へそれらの全講を一律必修化しない。各章の必要箇所でLORG/HPDEの定義・定理やMICA/AQFTの先行結果を参照する。**GR Iの幾何学的前提はLORGに置き、LORGにGR Iを必須前提として設定しない**。

既存のLie理論、Riemann幾何、変分問題・幾何解析、GEO9のde Rham、OA/VNを再利用するため、新しい表現論や代数的位相幾何の独立セメスターを今回の必須セットに重ねない。QFT Iのスピノル、HOLOのhomology constraintは必要な地点で初出定義・直接例を付す。

---

## 2. 学習依存と前提

~~~text
数学共通基礎（線形代数・実解析・測度/確率・微分幾何・Fourier/PDE）
 ├─ MECH / AMECH ─┬─ TH → SM ────────────┬─ ITD
 │                 │                       └─────────┐
 │                 └─ EMAG → SREL → GR I → GR II ──┬─ BHT ──────┐
 │                           │                    │             │
 ├─ QM1–QM8 ───┬─ QINF ← INFO┼────────────────────┤             ├→ BHI I → BHI II
 │             └─ QFT I → QFT II → QFT IV ─┬─ HOLO ← GR II ┘             │             ↑
 │                               └─ QCURV ← GR II ───→ BHT ─────┘             │
 └─ 既存確率・作用素環・複素解析は必要な場所で合流                HOLO ───────────┘
~~~

注：QFT II→III（標準模型）は図示を省略した独立の分岐であり、QFT IV・QCURV・HOLOの必修前提ではない。上の図は読み順の概略。**章ごとの直接 prerequisite は実装時の `chapter.yaml` と `knowledge.yaml` が正本**であり、未実装IDを現在の公開索引やDAGへ先取り登録しない。QFT IV・QCURV・HOLOの厳密な入口条件は独立PLAN化・本文実装時に最小集合へ精査する。

### 学修ゲート

- ゲートA（熱）：THの第一・第二法則からClausius不等式と熱力学ポテンシャルを導け、SMの分配関数から自由エネルギーを計算できる。
- ゲートB（情報）：Shannon・相互情報量・von Neumann entropy・部分トレースを別々に定義し、純粋全系の部分系が混合になり得る例を計算できる。
- ゲートC（幾何）：Schwarzschild座標の見かけの特異性と曲率特異性を区別し、光円錐・地平線・surface gravityを説明できる。
- ゲートD（場）：Bogoliubov変換と真空の選び方から熱的粒子数が現れる模型を再現し、温度だけの引用でHawking放射を済ませない。
- ゲートE（情報問題）：純粋全系・外部放射領域・時間発展のユニタリ性・放射のfine-grained entropyの定義を揃えてから矛盾を述べる。

## 4. 何を同じ「エントロピー」と呼び、何を区別するか

| 記号・概念 | 担当科目 | 基本対象 | 混同禁止 |
|---|---|---|---|
| 熱力学的エントロピー S | TH | 平衡状態の状態関数 | 可逆熱積分や不可逆過程の条件を省略しない |
| Boltzmann / Gibbsエントロピー | SM | 微視状態の計数・確率分布 | 有限系・熱力学極限・粗視化の違いを示す |
| Shannonエントロピー H(X) | INFO | 確率変数の分布 | 単位bit/natと物理次元の違いを示す |
| von Neumannエントロピー S(ρ) | QINF | 密度演算子と部分系 | 熱平衡状態だけの量ではない |
| エンタングルメントエントロピー S(A) | QINF / QFT IV | 複合系の縮約状態 | 分割、紫外発散、正則化依存を示す |
| Bekenstein–Hawkingエントロピー S_BH | BHT | ブラックホールの地平線面積 | 全モデルの微視的状態数を既知としない |
| 一般化エントロピー S_gen | BHT / HOLO / BHI II | 幾何学的面積項と量子場のエントロピー | coarse/fine-grained、領域とrenormalizationを区別する |

採用単位はまず幾何学的単位系 G=c=ℏ=k_B=1 とし、物理単位へ戻す回をBHTに設ける。代表式：

~~~text
F = U - T S,            F = -(1/β) log Z
H(X) = -Σ_x p(x) log p(x),
S(ρ) = -Tr(ρ log ρ),
T_H = κ/(2π),           S_BH = A/4,
S_gen = Area(∂I)/(4 G_N) + S_bulk(R ∪ I)  （必要な定数・繰り込み・量子補正を含める）
S(R) = min ext_I [ S_gen(I;R) ]  （適切な模型・サドルの範囲内）
~~~

最後のisland式は単なる熱力学的エントロピーの式ではない。重力系と非重力浴の結合、領域R・Iの意味、QES、極値を取る順序、重力経路積分・解析接続の仮定を明記する。単一の4次元天体ブラックホールについて一般に証明された普遍定理として宣言しない。

## 5. 重複執筆を避けるcanonical ownership

- **TH**：熱力学の法則・状態量・ポテンシャル・安定性。**SM**：アンサンブル・分配関数・微視的統計。SGは既存スピングラスPLAN。
- **INFO**：Shannonの符号化・情報量の定義と定理。**ITD**：熱浴・測定・フィードバック・Landauer消去の物理的収支。Landauer下界を「情報1 bitが常に熱k_BT ln2を必ず放出する」と無条件に書かない。
- **QINF**：量子エントロピー・量子チャネル・情報理論側の誤り訂正。HOLOでは重力双対へ必要な翻訳を行い、情報理論の基礎証明を繰り返さない。
- **SREL**：平坦時空の運動学と場の共変性。**GR I**：曲率とEinstein方程式。**GR II**：大域因果構造・ブラックホール解と地平線。
- **QFT I〜IV**：I＝自由場・散乱、II＝QED・くりこみ・非可換ゲージ、III＝標準模型、IV＝CFTとレプリカ。**QCURV**：曲がった背景時空におけるUnruh/Hawking効果の実計算。**BHT**：ブラックホール熱力学法則・S_BH・一般化第二法則・Waldエントロピー。
- **HOLO**：AdS/CFT・RT/HRT/QES・entanglement wedgeと誤り訂正。**BHI I**：情報損失の論理、Page曲線、firewall、scrambling。**BHI II**：replica wormhole / island / JT、研究段階での限界と解釈。
- 既存の**情報幾何PLAN**はFisher–Rao・統計多様体を所有する。Shannon情報理論・量子情報・ブラックホール情報の正式導入はこのPLANではない。

## 6. 必ず証明または計算する最小到達課題

1. Carnotサイクルから熱力学的絶対温度・第二法則とClausius不等式の関係を追う。
2. カノニカル分布を導き、分配関数からU・F・エントロピーを計算する。
3. Shannonの連鎖律、Gibbs不等式、古典データ処理不等式の有限アルファベット版を証明する。
4. Bell対の部分トレースから混合状態を求め、純粋な二体系の部分系に正のエントロピーがあることを示す。
5. Lorentz変換の導出、測地線方程式・曲率・Einstein方程式の変分原理を所定の境界条件の下で展開する。
6. Schwarzschild座標と正則座標を比較し、地平線での座標特異性を曲率不変量で検証する。
7. 自由場のBogoliubov係数による粒子生成を例示し、Unruh温度・Hawking温度の指数関係と仮定を導く。
8. Schwarzschildブラックホールで κ・T_H・S_BHの関係を次元付きで検算し、第一法則との整合を確認する。
9. 有限次元のランダム純粋状態模型でPage型のエントロピー曲線を計算する。**模型の曲線と現実の蒸発が同じであるという証明を区別**する。
10. Hawking対の局所的もつれとユニタリな蒸発が緊張する仮定の組を明確にし、AMPSのstrong-subadditivity論法を小さな量子系で追う。
11. 2次元JT重力+bath模型で、islandなしとislandありの二候補を比較しPage転移を再現する。レプリカ法の解釈上の仮定も監査する。
12. 再構成可能性・復号アルゴリズム・計算量・厳密なユニタリ性の間にある論理の飛躍を整理する。

## 7. 可視化と実験の候補

- TH/SM: Carnotサイクルp–V図、エントロピー変化、分布と自由エネルギー、有限サイズIsingの計算。
- INFO/ITD/QINF: 典型列・符号長、Szilardエンジンの状態遷移、Landauer消去の収支、Bloch球と部分トレース。可能なら簡単な数値検算。
- SREL/GR: Minkowski図、光円錐、測地線、Schwarzschildの座標変換、Penrose図。図から座標不変な結論を証明したことにしない。
- QFT/QCURV/BHT: Bogoliubov変換のモード、加速検出器応答、灰色体因子、温度・質量・面積の関係。
- BHI/HOLO: 縮約密度行列から直接描くPage型曲線、情報分割図、RT面・entanglement wedge・island候補の比較。
- アニメーションSVGは理解を助ける箇所で積極的に採用してよい。ただし`prefers-reduced-motion`、静止時の可読性、図中のモデル条件、数値生成法、本文中の図なし説明を担保する。

## 8. 未解決・条件付き結論として扱う事項

- Hawking放射の半古典的導出は、量子重力の微視的自由度を完全に数え上げたものではない。
- 島公式・replica wormholeは重要な模型でPage曲線を再現する。これをもってすべての現実的蒸発ブラックホールについて統一的な微視的復号機構まで確定したとは書かない。
- AdS/CFTの枠組みと漸近平坦な天体ブラックホールの扱いを無条件に同一視しない。
- factorization problem、ensemble averaging、重力Hilbert空間の分解、islandの一般性、復号の計算量、終状態・特異点・backreactionは分離して扱う。
- 「情報は地平線に保存される」「ER=EPRで完全解決」「firewallは否定された」などの決着済み断言は避け、仮定と実証範囲を同時に書く。
- 理論計算の進展は発行年とモデル条件を明記し、更新可能な研究史セクションへ隔離する。2026年の最新研究も研究論点として差し替え可能にする。

## 9. 章実装・査読・公開

- このPRは**PLANだけ**を追加する。未執筆の講義を `dream-theater.md`、公開索引、依存DAG、シリーズmanifestへ登録しない。`dream-theater-work.yaml`の現行next_workも変更しない。
- 実装着手時は `textbook/AGENTS.md` に従ってPLANを `plans_progress/` へ移動し、参照元を原子的に修正する。
- 新規講義では各章に動機→直接例→定義→主要結果→核心証明→演習/詳細解答。既存 `textbook/DREAM_THEATER_AUTHORING_STANDARD.md` を適用し、本文の推奨下限4,500字、原則A4/B3/C1以上とする。長い導出は週内に収められない場合は関連章へ分割する。
- 物理の導出は、座標系、計量符号、単位系、境界条件、真空状態、系/環境の分割、近似次数を宣言する。情報の定理は有限次元/無限次元、UVカットオフ、演算子の定義域を区別する。
- 各PRの査読は数理・物理整合性と読者粒度を別観点で実施する。独立査読を実施しなければそう明記し、CI成功を論証の完全性と同一視しない。
- Phase 1：既存TH/SMの学修目標・証明責務の確認＋INFO/ITD/QINFを独立PLANへ切り出す。
- Phase 2：数学のLORG/HPDEを先行して数学PLANの設計・実装ゲートを満たし、SREL、GR I/II、QFT I〜IV、QCURVの科目PLAN・章ID衝突監査と実装を進める。数学的に厳密なQCURVの発展分岐はMICAを参照する。
- Phase 3：BHT、HOLO、BHI I/IIの実装。量子場の局所環・factorizationを精密に論じる発展部分はAQFTを参照し、特に島公式章のモデル条件を監査。
- Phase 4：横断して用語、エントロピーの単位と領域、依存逆転、演習詳細解答、図、公開動線を監査して完了。

## 10. 教材の範囲校正に使う文献

- 既存TH/SM正本PLAN所載：田崎晴明『熱力学』『統計力学 I・II』、Callen, *Thermodynamics and an Introduction to Thermostatistics*、Pathria & Beale, *Statistical Mechanics*。
- MIT OpenCourseWare, 8.333 Statistical Mechanics I: https://ocw.mit.edu/courses/8-333-statistical-mechanics-i-statistical-mechanics-of-particles-fall-2013/pages/syllabus/
- MIT OpenCourseWare, 8.962 General Relativity: https://www.ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/syllabus/
- MIT OpenCourseWare, 8.323 Relativistic Quantum Field Theory I: https://www.ocw.mit.edu/courses/8-323-relativistic-quantum-field-theory-i-spring-2023/pages/syllabus/
- Christian Bär, Nicolas Ginoux and Frank Pfäffle, *Wave Equations on Lorentzian Manifolds and Quantization*: https://ems.press/books/esi/34
- Stefan Hollands and Robert M. Wald, *Quantum fields in curved spacetime*, Physics Reports (2015): https://doi.org/10.1016/j.physrep.2015.02.001
- Robert M. Wald, *The Thermodynamics of Black Holes*, Living Reviews in Relativity (2001): https://doi.org/10.12942/LRR-2001-6
- S. W. Hawking, *Particle Creation by Black Holes*, Communications in Mathematical Physics (1975): https://doi.org/10.1007/BF02345020
- G. Penington, *Entanglement Wedge Reconstruction and the Information Paradox*, JHEP (2020): https://doi.org/10.1007/JHEP09(2020)002
- A. Almheiri, R. Mahajan, J. Maldacena, Y. Zhao, *The Page Curve of Hawking Radiation from Semiclassical Geometry*, JHEP (2020): https://doi.org/10.1007/JHEP03(2020)149

文献は科目規模・証明の難度・研究上の論点の校正に使用する。本文や演習は転載せず独立に作成する。
