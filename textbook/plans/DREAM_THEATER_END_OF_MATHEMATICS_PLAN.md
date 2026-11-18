# DREAM THEATER THE END OF MATHEMATICS? 計画

作成日: 2026-10-07
旧構成確定日: 2026-11-09（5 family・12講）
前回構成確定日: 2026-11-18（8 family・25講）
構成再確定日: 2026-11-19（9 family・31講：268/Haldane–Tasakiを正式採択）
状態: planned（講義設計確定・EOM固有の章本文は未着手）

## 0. 目的と研究上の留保

2026年の数学・理論計算機科学・数理物理の研究主張を、基礎科目から原論文へつなぐ**研究読解科目**として扱う。対象は以下の **9 research family** とする。268 は OpenAI/math のカタログ上の結果群であり、田崎晴明の研究は別著者の関連論文として同じ教材 family に接続する（田崎論文を268の公式構成論文とはしない）。

- **074**: 3次元 Kakeya 最大作用素・4次元 Kakeya 集合の次元（従来）
- **079**: 全次元の波動方程式の local smoothing と Kakeya・restriction 等への帰結（追加）
- **017**: $\pi$ の無理数度（従来）
- **004**: 有理数体上の Hilbert 第10問題（従来）
- **376**: 外力付き Navier–Stokes 流の計算普遍性（従来）
- **221**: 希釈スピングラスの Mézard–Parisi 公式（従来）
- **268/Haldane–Tasaki**: スピン1 Haldaneギャップ（周期鎖・境界場付き開放鎖）と田崎晴明のSPT指標・無限鎖の並進不変基底状態の一意性（2026-11-19採択）
- **378**: 指数時間仮説（ETH）への反証と厳密な #SAT 算法（追加）
- **YM/QCD**: 4次元 pure Yang–Mills 存在構成・QCD・ゲージ場とフェルミオンを含む模型（追加、公開資料と検証範囲を分離）

2026-11-18に追加した3件の起点は [OpenAI の2026年10月26日発表](https://openai.com/index/building-scientific-understanding-with-academic-communities/) と [関連記事](https://finance.biggo.com/news/9dcf4c0c-13a2-40b6-8870-10c6c38e8b49)。**「3件＝研究テーマ3群」であり、「3講追加」ではない。** 079 は 074 と数学的帰結が重なるが、074 の3D/4D幾何的議論と 079 の波動方程式・調和解析からの多次元的含意は異なる中心問いとして扱い、説明・演習を重複させない。

result family は成果群識別子であって講数ではない。268 は OpenAI の Haldane gap 群のIDであり、田崎氏の2025/2026年の論文にこのIDを割り当てない。078/079 等のカタログ番号は論文・formalization catalogue の版と照合する。YM/QCD はこの PLAN 独自の便宜的な群名であり、OpenAI/math に数値 ID があると主張しない。計画上の章IDは仮予約し、着手時に実在 ID・索引・manifest との衝突を検査する。

原論文全体の独立完全証明と、教材で再構成できる主要補題・計算と、原論文へ依存関係を残す箇所を厳密に区別する。論文、Lean kernel 検証、statement と自然言語との一致、独立専門家の判断、査読・出版、Clay等の公式認定は別々の証拠である。**数学上の未検証 claim を他章の無条件な既知定理にしない。**

とくにYM/QCDでは2026年11月10日の [Yang–Mills group の第一評価](https://github.com/yang-mills-group/YM) が、2026年10月28日提出の pure Yang–Mills の Wightman 型存在構成を肯定的に評価した一方、**無限体積極限の一意性および正の質量ギャップは示していない**。同グループが審査した pure YM と、QCD・統一模型の非公開または別審査の主張を混ぜない。評価はその提出版と日付に限定する。

## 1. 講義数の再確定：全31講

**全31講とする（2026-11-18時点の25講 + 268/Haldane–Tasakiの6講）。** 旧25講の8講の橋渡し（079A/B、378A/B、YMA/B/C、QCDA）を維持し、新たに268A/B/Eの3講へ有限スピン・転送作用素・作用素代数/SPTの基礎橋渡しを埋め込む。268C/Dと268の3講は研究論文の異なる証明責務に対応する。講数は証明のまとまりと未習概念の量から決め、1講1論文・15週の時間割には従わない。EOM0 と EOM6、従来の章ID・中心問いを保つ。

| 講 | 予定章ID | 中心問い・到達目標 | prerequisite / 接続 |
| --- | --- | --- | --- |
| 1 | **EOM0** | 問題・予想・主張・形式化・独立検証・出版をどう区別するか。9 family の証拠台帳。 | CMP、数学的証明の基礎 |
| 2 | **EOM074A** | Kakeya set を tube 最大作用素へ翻訳し、方向分離・体積・次元・ノルム指数を計算。 | MT8、HA11、GMT1–8・GMT31–36 |
| 3 | **EOM074B** | 3D Kakeya maximal の評価と多重尺度補題の入力・出力。 | EOM074A |
| 4 | **EOM074** | 4D Kakeya の Hausdorff 次元4への幾何的入力。 | EOM074B、GMT35–36 |
| 5 | **EOM079A** | **追加前提①** 半波作用素・位相関数・Fourier積分作用素を波動方程式から構成。 | HA8–11、HPDE1–2、QFT3 |
| 6 | **EOM079B** | **追加前提②** 空間時間 $L^p$、Sobolev 微分損失、wave packet・局所平滑化の臨界指数。 | EOM079A、GMT32–36 |
| 7 | **EOM079C** | local smoothing 論文の補助PDE・多重尺度の証明機構と、実際に閉じられる主要補題。 | EOM079B |
| 8 | **EOM079** | $n\ge2$ の local smoothing、Kakeya・Bochner–Riesz・restriction 等の厳密な帰結と Lean scope。 | EOM079C、EOM074 |
| 9 | **EOM017** | $\mu(\pi)=2$ の量化、Roth の射程、Flint–Hills と Lean の検証範囲。 | NDA5–8、NT7 |
| 10 | **EOM004A** | $\mathrm{H10}(\mathbb Z)$ と $\mathrm{H10}(\mathbb Q)$、整数の存在的定義可能性を分ける。 | NT9–10、CMP4–6、EC |
| 11 | **EOM004** | 有理数上の非決定可能性主張の算術補題・楕円曲線・帰着の依存構造。 | EOM004A、EC関連章 |
| 12 | **EOM376A** | 有限命令を体積保存の滑らかな流れへ符号化する。 | CMP1–6、CELL1–2、NS1–2 |
| 13 | **EOM376** | 外力付き流れの停止検出・初期値・解クラス・形式化の範囲。 | EOM376A、NS3–8 |
| 14 | **EOM221A** | 希釈模型の cavity 再帰・圧力・階層的試行汎関数。 | TH、SM、SG1–8 |
| 15 | **EOM221** | Panchenko–Talagrand型模型の上下界・比較と極限変分式。 | EOM221A |
| 16 | **EOM268A** | **追加前提⑨** スピン1行列・テンソル積・最近接反強磁性Heisenberg Hamiltonian・ギャップを定義し、AKLTの可解例とLSM型障害を比較。 | 線形代数、量子論・SMの対応正本（着手時に照合） |
| 17 | **EOM268B** | **追加前提⑩** Gibbs作用素・転送作用素・有限サイズスペクトル評価と田崎氏の連続時間/離散時間の解析的ギャップ基準。 | EOM268A、解析・作用素論の対応正本 |
| 18 | **EOM268C** | 偶数長周期 $S=1$ Heisenberg鎖の一様正ギャップ：解析的推論・有限計算証明書の入出力と独立再実行の範囲。 | EOM268B、数値線形代数・誤差評価 |
| 19 | **EOM268D** | 奇数長・端点場付き開放鎖（論文の $h=3/5$）のギャップと境界選択状態。周期鎖との前提・結論の差。 | EOM268B–C |
| 20 | **EOM268E** | **追加前提⑪** 田崎氏の条件付きSPT結論とtwist指数・Ogata指数の $U(1)\rtimes\mathbb Z_2$ 対称下の同値性。 | EOM268A、EOM268D、AQFT/作用素代数の対応正本 |
| 21 | **EOM268** | 田崎氏の無限鎖・小さい $|D|$ の $J$–$D$ 模型：並進不変基底状態の一意性、局所極限、ギャップ/SPTとの接続と証拠評価。 | EOM268C–E、熱力学極限・局所観測量 |
| 22 | **EOM378A** | **追加前提③** NP完全性から fine-grained complexity へ：ETH/SETH、変数数・節数、sparsification、帰着の量的条件。 | CMP1–8、計算量の既習定義（該当正本を着手時に照合） |
| 23 | **EOM378B** | **追加前提④** #SAT・正確計数・多項式補間・疎な parity テストを小模型で計算。 | EOM378A、基礎代数学・線形代数 |
| 24 | **EOM378** | $2^{o(n)}$ 算法の計算量台帳、ETHの反証、Leanで検証した弱い指数と原論文の強い指数を分離。 | EOM378B |
| 25 | **EOMYMA** | **追加前提⑤** コンパクトLie群・Haar測度・Wilson格子接続・plaquette・有限格子のゲージ不変性。 | QFT28–30・46、LIE系、測度論 |
| 26 | **EOMYMB** | **追加前提⑥** Euclid Schwinger関数、反射陽性、Osterwalder–Schrader再構成と Wightman 公理。 | EOMYMA、QFT19–20、AQFT1–12 |
| 27 | **EOMYMC** | **追加前提⑦** 格子間隔→0・体積→∞の二極限、Balaban型多重尺度くりこみとコンパクト性。 | EOMYMB、QFT25–26・42 |
| 28 | **EOMYM** | pure 4D Yang–Mills 存在構成の査定：Wightman・観測量・独立評価と質量ギャップ未解決。 | EOMYMC、AQFT関連章 |
| 29 | **EOMQCDA** | **追加前提⑧** 格子フェルミオン、Grassmann積分、行列式、ゲージ異常と表現の条件。 | EOMYMB、QFT7–8・19・39–41 |
| 30 | **EOMQCD** | QCD・ゲージ場/フェルミオン統一模型の存在主張と pure YM との差、公開証拠・残る未検証箇所。 | EOMQCDA、EOMYM、QFT35–42 |
| 31 | **EOM6** | 定理生成・形式化・独立検証・理論構築・教育の役割分担を9 family で総括。 | EOM0 と全9 family |

内訳：**導入1 + Kakeya(074)3 + local smoothing(079)4 + $\pi$1 + H10(Q)2 + NS計算普遍性2 + スピングラス2 + Haldane–Tasaki(268)6 + ETH3 + YM/QCD6 + 総括1 = 31講**。

橋渡し11講（従来8講 + 268A/B/E）は、既存の HA/GMT/HPDE、CMP、QFT/AQFT・SM等の学習内容と、専門的な研究原論文の間にある未導入概念を埋めるためのもの。未修の全科目をEOMへ再掲するのではなく、各講で必要な直接例・主要中間式と、到達可能な正本リンクに絞る。特に079と074の重複したKakeya基礎、EOMYMとEOMQCDの共通格子構成を二度証明しない。

## 2. 現在の依存関係と着手可否（2026-11-19再設計）

既存8 familyに関する GitHub の系列 manifest は2026-11-18に再確認した。268系の既存canonical接続は執筆前に章本文・manifestの語義まで追加照合する。**GMT1–36、HA1–11、CMP1–8、QFT1–64、AQFT1–34 は completed**。従来の「GMT2–36進行中・074は続講待ち」は旧スナップショットであり、現在の前提充足判定に使わない。既存正本で実際にどの命題まで証明したかは執筆時に章本文・knowledge.yaml・stable anchor を点検する。

| family | 既存 canonical 前提と追加橋渡し | 判定 |
| --- | --- | --- |
| 074 | MT8、HA11、GMT1–8・31–36 | **既存前提の講義は完成**。研究固有補題の再構成が必要 |
| 079 | HA8–11、GMT32–36、HPDE1–2 → EOM079A–C | **橋渡し3講が必要**。局所平滑化の証明に未履修のFIO・新規補助PDEがある |
| 017 | NT7、NDA1–8 | 既存前提から着手可能 |
| 004 | NT9–10、CMP1–8、EC1–11 | 既存前提から着手可能（原論文固有の算術補題を別途確認） |
| 376 | NS1–8A、CMP1–8、CELL1–15 | 既存前提から着手可能 |
| 221 | TH1–8、SM1–8、SG1–8 | 既存前提から着手可能 |
| **268/Haldane–Tasaki** | 有限次元量子論・QFT/SM/作用素論・AQFTの既存正本 → EOM268A/B/E（概念橋渡し）→ EOM268C/D/268（論文読解） | **全31講へ正式採択**。量子スピン鎖・SPTの専門概念と計算機援用評価の独立再実行は未完了であり、別途proof ledgerが必要 |
| 378 | CMP1–8（計算可能性）→ EOM378A–B | **橋渡し2講が必要**。CMP修了をfine-grained complexity修了と取り違えない |
| YM/QCD | QFT1–64、AQFT1–34 + LIE等 → EOMYMA–C、EOMQCDA | **橋渡し4講が必要**。摂動QFT・自由場AQFTから非摂動4D構成を飛躍させない |

**実装推奨順**：EOM0 → 074系 → 079A–079 → 017/004/376/221（各独立）→ 268A–268 → 378A–378 → YMA–YM・QCDA–QCD → EOM6。上の表の順序は学修の依存を表示するもので、別々のfamilyは独立に着手してよい。YM/QCD の論文が非公開・検証中の場合でも**基礎橋渡しは執筆可能**。未公開の主定理を教材として既証明扱いにしない。

**PLAN状態**：EOM固有の本文・検証・監査は未着手のため引き続き plans に置き、今回の変更では EOM.yaml を作成しない。最初の実装を始めた作業単位で plans_progress に移し、EOM系列manifest（全31講・plannedから開始）と path を整合させる。全章・公開導線・検証が揃ってから plan_done に移す。

## 3. 各 family の正確な論点と証明責務

### 3.1 074 Kakeya

- 古典的 Kakeya set conjecture、Lebesgue測度0の Besicovitch 集合、Minkowski 次元、Hausdorff 次元、最大作用素予想を分離する。
- 3次元の原論文の主張は、適切な正規化をした半径 $\delta$ の unit-tube maximal operator の $L^3(\mathbb R^3)\to L^3(S^2)$ ノルムの $O_\varepsilon(\delta^{-\varepsilon})$ 型評価。方向測度・正規化・定数依存を原論文と照合する。
- 4次元の原論文の主張は、各方向の単位線分を含む集合 $K\subset\mathbb R^4$ の Hausdorff 次元が4というもの。3次元最大評価からの論理的帰結と4次元固有の幾何的入力を別々に追う。
- MT8、GMT1–8・GMT31–36、HA11 に canonical owner を置く。tube体積・交差数・方向数・wave-packet の中間計算は再構成する。「多重尺度法で示す」の一言で重要補題を飛ばさない。
- 研究論文全体の独立完全証明を無条件の1講の達成要件とせず、未確認の補題は証明依存台帳で明記する。

### 3.2 017 $\pi$ の無理数度

- $\mu(\alpha)$ の定義において $p/q$ の範囲、$q>0$、近似不等式と「無限個」の量化を明示する。下界の一般論と上界の新規性を分ける。
- 2026年の主張は $\mu(\pi)=2$。任意の $\varepsilon>0$ について、十分大きな分母 $q$ のすべての近似が $|\pi-p/q|\ge q^{-2-\varepsilon}$ を満たす、という上界側の主張を正確に読解する。
- Roth の定理を超越数 $\pi$ に直接適用しない。NDA5–8 の連分数・近似指数・計量的議論と論文固有の仕組みを切り分ける。
- Flint–Hills 級数 $\sum_{n\ge1}1/(n^3\sin^2 n)$ の収束は解析的な帰結として整理し、Lean comparator が選択した theorem の範囲と混同しない。

### 3.3 004 Hilbert第10問題 over $\mathbb Q$

- 入力は変数個数 $n$ も可変な整数係数多項式 $f\in\mathbb Z[X_1,\ldots,X_n]$。$\mathbb Q^n$ に零点があるかを決めるアルゴリズムの不存在が原論文の主張である。
- $\mathrm{H10}(\mathbb Z)$ の非決定可能性、$\mathrm{H10}(\mathbb Q)$ の非決定可能性、$\mathbb Z\subset\mathbb Q$ の存在的定義可能性を同一視しない。整数の存在的定義があれば帰着できることは**十分条件**であり、逆は自動的に出ない。
- 有理数解の列挙、決定と認識、分母の非零性、帰着の方向を主要計算と演習で検証する。
- 2026年原論文の reduction、parity、height、elliptic curves、primes に関する主要補題を入出力ごとに検査する。NT10 と EC の入口だけで全高度算術が既習と主張しない。必要な新概念は導入・出典・証明射程を記す。

### 3.4 376 外力付き Navier–Stokes と計算可能性

- 対象は**外力付き**非圧縮流であり、無外力3次元 Navier–Stokes ミレニアム問題の解決を主張しない。NS8A の特異点構成とも別の問いである。
- 有限の Turing 機械と入力から、滑らかな速度場・外力を有効に記述し、固定粒子の到達や速度場の観測が停止に同値になる構成を追う。
- 領域（トーラス・全空間等）、初期値、粘性 $\nu$、外力のコンパクト支持・減衰・周期性、検出領域、解の一意性クラスを**各原論文・各 theorem ごとに**揃え、別論文の仮定を合成しない。
- 計算機から有限命令、体積保存写像から発散零速度場、軌道から停止判定への帰着を追い、$f=\partial_tu+(u\cdot\nabla)u-\nu\Delta u+\nabla p$ の残差を具体的に計算する。
- Lean は固定粒子、速度場、急減衰外力、box routing など comparator の対象 theorem のみを形式化済みと記す。

### 3.5 221 Mézard–Parisi

- 対象は原論文が仮定する **Panchenko–Talagrand class の希釈・偶数 arity Ising 模型**であり、すべての希釈模型・ランダムCSPへ無条件に広げない。
- 偶数 arity、相互作用密度、独立性・因子分解・可積分性・正値性を、極限圧力と階層的 trial functional の変分等式の仮定として明示する。
- SG7–8 の因子木 BP、Poisson 分枝、RS/1RSB の再帰から、低次階層の trial functional を直接計算する。
- 原論文の tree、upper bound、cavity、perturbation、decorrelation、comparison、reduction を証明の入出力として整理し、上界と下界が合う箇所を特定する。
- dense Sherrington–Kirkpatrick 模型の Parisi 公式と、希釈模型の Mézard–Parisi 公式を区別する。Lean は指定された模型・条件の範囲で照合する。

### 3.6 079 Euclid波動方程式の局所平滑化

- 既存 074 の Kakeya 幾何と異なり、出発点は半波作用素 $e^{it\sqrt{-\Delta}}f$ の**時間平均 $L^p$ ノルム評価**。半波の Fourier 表示、定常位相、Fourier 積分作用素、wave packet の方向・位置・周波数を EOM079A–B で直接構成する。
- [079 公式 Lean scope](https://github.com/openai/math/blob/main/lean/docs/079.md) の主張は、$n\ge2$、$2\le p<\infty$、Schwartz 初期値 $f$、任意の $\varepsilon>0$ に対し $[1,2]$ の半波の $L^p$ を $W^{s,p}$ で評価し、$s=\max(0,(n-1)/2-n/p)+\varepsilon$ とする（$p=2$ は $s=0$ 可）。実際の定数・関数空間・低周波・端点を paper と比較する。
- EOM079B で通常の固定時刻評価と平均時間評価を具体的な波束で比較し、次元・指数・$\delta$ の符号を計算する。EOM079C で原論文固有の**補助PDE**の定義・どの誤差項を制御するか・多重尺度の核心を中間式付きで解剖する。原論文全証明を再構成できない段階では補題の入力・出力・未証明部分を台帳に残す。
- EOM079 では local smoothing → Kakeya maximal/全次元Hausdorff次元 → restriction・Bochner–Riesz・square function の各含意を別の命題とし、論文とComparator双方の**指数・strict range・端点**を照合する。Kakeya full dimension の帰結は 074 の3D/4Dの別証明を置き換えたという宣言ではない。077等の別 catalog IDを類推で追加しない。
- 局所平滑化の証明と、それから得られるすべての解析的帰結が同じ形式化済みであると無条件に主張しない。Lean の theorem名・範囲・対照する自然言語文を固定して検証台帳に記録する。

### 3.7 378 ETH の反証・#SAT

- ETH（固定 $k=3$ の SAT に $2^{o(n)}$ 時間算法がないという仮説）と SETH、NP完全性、$P$ vs $NP$、#SAT の正確計数を定義から区別する。$n$ は変数数、$m$ は節数、$L$ は符号化ビット長である。ETHを反証しても**多項式時間算法や $P=NP$ は従わない**。
- EOM378A は sparsification・定量的帰着で、$n$ の増加・節密度・指数定数を手計算する。多項式時間帰着だけでは $2^{o(n)}$ を他の問題へ移植できないことを反例で扱う。EOM378B は #SAT、疎な parity 制約、局所補間の小例で exact counting の整数演算とビット計算量を追う。
- [原論文](https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026) の主張は固定 $k\ge2$ のCNF exact counting を決定的・多項式空間で行い、一般 $m$ の時間を $(n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})}$、$m\le Dn$ の場合を $(n+m)^{O_{k,D}(1)}2^{O_{k,D}(n/\sqrt{\log n})}$ とする。定数の $k,D$ 依存を落とさない。
- [378 公式 Lean scope](https://github.com/openai/math/blob/main/lean/docs/378.md) で検証したのは、canonical encoding の長さ $L$ に対する $(L+1)^{O_k(1)}2^{O_k(n(\log\log n)^2/\sqrt{\log n})}$ 時間・多項式使用テープ領域の定理。**原論文のより鋭い指数や副次的帰結をすべてLean検証済みとしない**。両方の指数が $o(n)$ となる理由を極限から証明する。
- 2026年10月の OpenAI の発表・Anthropic の別算法公表と、第三者の人間による吟味・再実装・査読の完了を区別する。関連する回路下界は paper 由来の外部既知結果の仮定を明記し、原論文から自動的には出さない。

### 3.8 YM/QCD 4次元構成的量子場理論

- **問題を四段階に分ける**：(1) 有限格子上の確率測度とゲージ不変観測量、(2) 格子間隔 $a\downarrow0$・無限体積の極限の存在、(3) Schwinger / Osterwalder–Schrader 公理から Wightman 場の再構成、(4) Hamiltonian の正の質量ギャップ。**(1)–(3) を主張しても (4) は従わない**。
- EOMYMA ではコンパクト単純 Lie 群 $G$、リンク変数 $U_e\in G$、plaquette $U_\square$、Wilson作用、Haar積分、局所ゲージ変換下の不変性を有限格子で直接計算する。正負符号・正規化・格子間隔・境界条件を示す。
- EOMYMB では Euclid相関関数、反射陽性の不等式、OS再構成とWightman公理の対応を自由スカラー場の有限例から導く。形式的Wick回転だけを公理証明と呼ばない。
- EOMYMC では Balaban に由来する構成的くりこみの発想、スケール分割・ゲージ固定・局所作用・一様評価・tightness / 極限抽出を学ぶ。超高難度の未展開補題を「標準的」として省略せず、具体的な再現可能例と外部原論文依存を分ける。
- EOMYM は [Clay の公式問題](https://www.claymath.org/millennium/yang-mills-the-maths-gap/) と [2026-11-10 Yang–Mills group assessment](https://github.com/yang-mills-group/YM/blob/main/README.md) を比較する。同グループは10月28日提出版について4D Wilson格子から Wightman 公理を満たす相対論的場の構成を肯定的に評価したが、**無限体積極限の一意性・mass gap・Clayの問題全体の解決は評価していない**。同グループの Comparator・Lean の対象外事項や形式化の追加公理も確認する。
- EOMQCDA は非可換群のフェルミオン表現、Grassmann積分、fermion determinant、chirality と anomaly cancellation の有限模型を手で確かめ、pure YMにフェルミオンを加える際の新しい難しさを示す。EOMQCD は QCD と unified completion に関する OpenAI 発表を**pure YM の肯定的査定の延長として認定しない**。対応する公開原資料・別審査・正式な模型定義がない場合は未検証の研究目標として扱い、結論を証明済みとせず入出力と未解決箇所を示す。
- 教科書段階の確立した事実、研究 group の特定版評価、完全未公開の AI 主張の証拠水準を分離し、mass gap と confinement を同じ命題としない。

### 3.9 268/Haldane–Tasaki 量子スピン鎖のギャップ・SPT・一意性

- **有限鎖の対象**：スピン1の $3\times3$ 行列、$H_L=\sum_{j=1}^{L}\boldsymbol S_j\cdot\boldsymbol S_{j+1}$（周期鎖では $\boldsymbol S_{L+1}=\boldsymbol S_1$）、基底エネルギー $E_0(L)$ と次の異なる固有値 $E_1(L)$ の差 $\Delta_L$ を先に定義する。[周期鎖論文](https://github.com/openai/math/tree/main/preprints/The-periodic-spin-one-Haldane-gap-September-24-2026) の **$S=1$、偶数長周期鎖の一様正ギャップ**と、AKLT模型の厳密に証明されたギャップは別定理である。全整数スピン・全境界条件の予想を一挙に解決したと読み替えない。
- **解析的証明と有限計算の分業**：EOM268B–C は transfer/thermal estimate、有限サイズの入力不等式、正の一様ギャップへの推論を **入力 → 中間不等式 → 定数 → 結論** の順に分解する。[周期鎖の再計算スクリプト](https://github.com/openai/math/tree/main/preprints/The-periodic-spin-one-Haldane-gap-September-24-2026/verification) は有限証明書の再計算が可能と説明されているが、本PLANでは**実行・独立検証済みと主張しない**。保持証明書の照合と独立再実行、解析的推論の点検は別の証拠欄とする。
- **開放鎖の別主張**：EOM268D は [境界場付き開放鎖の論文](https://github.com/openai/math/tree/main/preprints/A-boundary-field-gap-for-the-spin-one-Heisenberg-chain-September-24-2026) にある奇数長・端点磁場 $h=3/5$ の模型・一様ギャップ・境界選択状態を扱う。符号、境界場の方向、鎖長の偶奇、有限計算の範囲を周期鎖と混ぜず原論文の定理ごとに固定する。
- **SPTと条件付き定理**：EOM268E は田崎氏の [2025年PRL](https://doi.org/10.1103/PhysRevLett.134.076602) のギャップ等を仮定した非自明SPTの結論と、[twist指数・Ogata指数の同値性（arXiv:2609.34119）](https://arxiv.org/abs/2609.34119) を分離する。$U(1)\rtimes\mathbb Z_2$ の対称性、純粋・局所一意・ギャップ付き状態、局所twistと半鎖回転の定義域・誤差評価を定義してから定理文を述べる。異なる論文を組み合わせる場合は仮定を一点ずつ照合する。
- **無限鎖の射程**：EOM268 では田崎氏の [arXiv:2610.34330](https://arxiv.org/abs/2610.34330) がOpenAIの**解析機構と数値入力に依存して**主張する、無限 $S=1$ Heisenberg鎖と十分小さい $|D|$ の $J$–$D$ 模型における**並進不変基底状態の一意性**、周期鎖・端点場付き開放鎖の局所極限とその収束を追う。すべての非並進不変基底状態の一意性には拡張しない。
- **独立な読解の評価**：田崎氏の [2026-10-18解説](https://haltasaki.github.io/writings/AI/OpenAI_Haldane.html) は解析部分を連続時間版・離散時間版で解説する一方、計算機援用評価は独立には確認していないと明記する。数学者の読解・演算証明書・Lean kernel・査読付き出版は別々の証拠である。
- **完成時の証明責務**：小さな $L$ の行列・スペクトルを直接計算し、AKLTを具体例として示し、周期鎖と開放鎖の定理の仮定・不等式・量化・境界条件を同一表で照合する。計算機の補題を教材内で再現できなければ残る依存を記録し、SPT指数と無限鎖の一意性を自明な帰結としない。

## 4. EOM各章の統一フォーマットと検証状態

各講は次を基本形とする。family の前段講と後段講で不要に重複させない。

1. 既存 canonical 講義でできること、残る問い、必要な新しい道具。
2. 主要定義を通常文で先に導入し、その条件を直接例で確認する。formal statement の使用語を後出しにしない。
3. 原論文の版・定理番号・基準日を固定した exact statement（仮定・量化・結論）。
4. 主要補題ごとの **入力 → 中間式・証明機構 → 結論 → 利用先** の proof ledger。既出結果を使う箇所から実在 stable anchor へリンクする。
5. **announced claim / manuscript・proof artifact / Lean 形式化と対象 theorem / 独立人間査読 / 査読付き出版 / 賞・制度的認定** の6軸を、出典・確認日・未確認事項とともに記録する。
6. 研究の骨格だけで済ませた箇所と、本文・詳細解答で出発点から証明した範囲を明示する。
7. 理由付き例外がなければ Level A 4題・B 3題・C 1題以上。定義、仮定の効き方、誤った推論への反例、計算、statement 読解を練習する。題数の水増しはしない。
8. なぜその主張から別の大問題の解決は導けないか、どの仮定を落とせないかを明示する。

同一担当者の別観点再読を第三者独立査読と呼ばない。AIによる生成、Lean kernel の検証、数学者の独立再検討、査読誌への掲載、賞の認定は異なる証拠である。原論文に疑義が残れば**未確認**とし、後続章の前提には無条件で採用しない。

## 5. 校正した参照資料

標準書は教育上の前提と章割りの確認に用い、2026年の claim は研究原論文・形式化 catalogue を一次資料とする。文献内容を転載しない。

### 標準教科書

- Pertti Mattila, [Geometry of Sets and Measures in Euclidean Spaces](https://www.cambridge.org/core/books/geometry-of-sets-and-measures-in-euclidean-spaces/3E3DDE579ABAEEC863B8964D68DCC72F): Hausdorff測度、energy、射影、rectifiability。GMT科目の入口と停止線。
- Pertti Mattila, [Fourier Analysis and Hausdorff Dimension](https://www.cambridge.org/core/books/fourier-analysis-and-hausdorff-dimension/78A25BED2C6E4F9B911971305DC928B0): Fourier、energy、次元・射影の連結。
- Yuri Matiyasevich, [Hilbert's 10th Problem](https://mitpress.mit.edu/9780262132954/hilberts-10th-problem/): 整数上の非決定可能性。$\mathbb Q$ 上の新主張とは分離。
- Michael Sipser, [Introduction to the Theory of Computation](https://math.mit.edu/~sipser/book/): Turing機械、停止問題、帰着（CMP正本）。
- Dmitry Panchenko, [The Sherrington–Kirkpatrick Model](https://link.springer.com/book/10.1007/978-1-4614-6289-7): dense模型との比較。
- Marc Mézard and Andrea Montanari, [Information, Physics, and Computation](https://academic.oup.com/book/6337): cavity、BP、1RSB。
- Christopher D. Sogge, [Fourier Integrals in Classical Analysis, 2nd ed.](https://www.cambridge.org/core/books/fourier-integrals-in-classical-analysis/B6564D013B4F3C1897BCC052096EE462): 半波作用素、Fourier積分作用素、local smoothing（とくに第4・8章）。079A–Cで導入する中間命題の教科書基準。
- Elias M. Stein, [Harmonic Analysis: Real-Variable Methods, Orthogonality, and Oscillatory Integrals](https://press.princeton.edu/books/hardcover/9780691032160/harmonic-analysis): 振動積分・Fourier積分作用素・曲率と最大作用素の接続。HA11/GMT36の後段を補う。
- Sanjeev Arora and Boaz Barak, [Computational Complexity: A Modern Approach](https://www.cambridge.org/core/books/abs/computational-complexity/about-this-book/2CBF20D317C390A2D465CBD75E557B49): 計算量クラス、NP完全性、帰着とアルゴリズムの時間解析。CMPの計算可能性から378へ移るための標準書。
- Marek Cygan et al., [Parameterized Algorithms](https://link.springer.com/book/10.1007/978-3-319-21275-3): ETH型の条件付き下界、sparsification、パラメータ付き・細粒度の帰着。378Aの停止線。
- István Montvay and Gernot Münster, [Quantum Fields on a Lattice](https://www.cambridge.org/core/books/quantum-fields-on-a-lattice/4401A88CD232B0AEF1409BF6B260883A): 有限格子の gauge fields、Wilson作用、格子QCD。EOMYMA/QCDA の直接例。
- Hal Tasaki, [Physics and Mathematics of Quantum Many-Body Systems](https://haltasaki.github.io/books/pmqmbs/index.html): 有限量子スピン鎖・Haldane/AKLT現象・熱力学極限・SPTへの橋渡し。EOM268A/Eの標準書であり2026年の証明の検証書ではない。
- James Glimm and Arthur Jaffe, [Quantum Physics: A Functional Integral Point of View](https://link.springer.com/book/10.1007/978-1-4612-4728-9): 構成的量子場理論、反射陽性、極限と相関関数。EOMYMB/C の基礎（4D YM の完成証明書と混同しない）。
- Arthur Jaffe and Edward Witten, [Yang–Mills Existence and Mass Gap: Official Problem Description](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf): 存在と正の質量ギャップの同時要請、証拠水準の比較。

### 2026年原資料

- OpenAI, [mathematics release / catalogue / verification history](https://github.com/openai/math): familyとmanuscriptの区別、Lean artefact、更新履歴。公開元も未形式化成果に問題があり得ると明記する。
- 074: [3D Kakeya maximal](https://github.com/openai/math/tree/main/preprints/The-Kakeya-maximal-conjecture-in-three-dimensions-September-23-2026) / [4D Hausdorff dimension](https://github.com/openai/math/tree/main/preprints/Every-four-dimensional-Kakeya-set-has-full-Hausdorff-dimension-September-24-2026)。
- 017: [無理数度原論文](https://github.com/openai/math/tree/main/preprints/The-irrationality-exponent-of-pi-is-2-September-24-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/017.md)。
- 004: [Hilbert's tenth problem over the rational numbers](https://github.com/openai/math/tree/main/preprints/Hilberts-tenth-problem-over-the-rational-numbers-October-6-2026)。
- 376: [Lean scope と関連 manuscript](https://github.com/openai/math/blob/main/lean/docs/376.md)。
- 268/Haldane–Tasaki: [偶数長周期スピン1 Haldane gap論文](https://github.com/openai/math/tree/main/preprints/The-periodic-spin-one-Haldane-gap-September-24-2026) / [境界場付き開放鎖ギャップ論文](https://github.com/openai/math/tree/main/preprints/A-boundary-field-gap-for-the-spin-one-Heisenberg-chain-September-24-2026) / [周期鎖のfinite verification手順](https://github.com/openai/math/blob/main/preprints/The-periodic-spin-one-Haldane-gap-September-24-2026/verification/computations/README.md) / [田崎氏の2026-10-18解析的解説](https://haltasaki.github.io/writings/AI/OpenAI_Haldane.html) / [田崎氏の2025年条件付きSPT定理（PRL）](https://doi.org/10.1103/PhysRevLett.134.076602) / [指数同値性（2026-09、arXiv:2609.34119）](https://arxiv.org/abs/2609.34119) / [並進不変基底状態の一意性（2026-10、arXiv:2610.34330）](https://arxiv.org/abs/2610.34330)。
- 221: [Mézard–Parisi 原論文](https://github.com/openai/math/tree/main/preprints/The-Mezard-Parisi-formula-for-diluted-spin-glasses-September-23-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/221.md)。
- 079: [local smoothing 原論文](https://github.com/openai/math/tree/main/preprints/Local-smoothing-for-the-Euclidean-wave-equation-October-25-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/079.md) / [2026-10-26 release history](https://github.com/openai/math/blob/main/history.md)。074の2026年9月論文とは別。
- 378: [ETH反証 原論文](https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/378.md) / [10月26日公式説明](https://openai.com/index/building-scientific-understanding-with-academic-communities/)。
- YM/QCD: [OpenAI 10月26日発表](https://openai.com/index/building-scientific-understanding-with-academic-communities/) / [Yang–Mills group 現行資料](https://github.com/yang-mills-group/YM)（10月28日提出版に対する11月10日付 first assessment、改訂提出版は別扱い） / [Clay 公式問題](https://www.claymath.org/millennium/yang-mills-the-maths-gap/)。QCDと統一模型はpure YM査定から外挿しない。

資料確認基準日は **2026-11-19**（従来5 familyの記述の起点は2026-11-09、追加3件の前回構成は2026-11-18）。この一覧は全9 family の査読付き出版・証明完了認定ではない。Yang–Mills group の2026-11-10 assessment は明示した版の**限定的な独立評価**であり、他の family やQCDの検証完了を意味しない。本文執筆時は原論文・提出版のSHA・対象 theorem と形式化・評価範囲を再点検する。

## 6. 完成条件

- [ ] EOM manifest に**31講**を順序・ID・prerequisite付きで登録し、実際に完成した章のみ completed とする。
- [ ] 各章の本文・chapter.yaml・knowledge.yaml と prerequisite・stable anchor が対応する。
- [ ] 全主要定義、主定理、核心の中間補題、演習と詳細解答が独習者に再構成可能な粒度にある。
- [ ] **9 family** で主張・証明 artifact・形式化・独立査読・出版・賞を混同せず、基準日と未確認事項を示す。
- [ ] 079A–B・378A–B・YMA–C・QCDA・268A/B/E の**橋渡し11講**で不足する基礎概念を導入し、QFT/AQFT・CMP・HA/GMT・SM等の既存成果は参照・重複抑制する。
- [ ] 079 と074のKakeya重複を解消し、restriction・Bochner–Riesz 等の指数・端点の差を原論文/Leanで照合する。
- [ ] 268A–E・268 の6講で周期鎖と境界場付き開放鎖のギャップ、田崎氏の条件付きSPT/指数同値性、無限鎖の**並進不変**一意性を区別し、証明書の再計算・解析的証明・第三者検証の証拠台帳を付ける。
- [ ] 378 の原論文とLeanで異なる時間指数を照合し、ETH反証とP vs NPを混同しない。
- [ ] 4D pure YMの存在・無限体積極限の一意性・正の質量ギャップ・QCD/統一模型を分離し、2026-11-10 assessmentを過大評価しない。
- [ ] GMT からの canonical prerequisite を満たし、Kakeya の集合版・次元版・最大作用素版とlocal smoothingの論理的帰結を混同しない。
- [ ] 今回確定した9 family の外へEOMを無制限に増やさず、独立した基礎科目は正規PLANで扱う。
- [ ] DREAM THEATER の変更区分別査読、concept / knowledge / exercise / KaTeX / formal statement / Pages link 検証と公開導線を完了する。
- [ ] 未実装章を公開目次へ先行登録せず、PLAN を重複配置しない。

**講義設計の確定、研究成果の数学的検証完了、教材本文の完成は別の状態である。**

## 7. 追加研究候補：ハルデーン予想・田崎晴明の関連研究（2026-11-19）

**採択状態: candidate / 未採択。** 現行の **8 result family・25講・EOM0〜EOM6 の章ID・完成条件は変更しない**。ここは次回の講義再設計で評価する候補台帳であり、family 268 や田崎論文を現行25講に含めたこと、証明を独立検証したことを意味しない。採択時には講数・章ID・manifest・prerequisiteを改めて審査する。

| 候補 | 中心問い・教材上の位置づけ | 主な証拠・未確認事項 |
| --- | --- | --- |
| **268：Haldane予想と $S=1$ Heisenberg反強磁性鎖** | 整数スピンと半奇整数スピンの低エネルギーの違い、周期鎖の一様スペクトルギャップ、開放端の境界場、AKLT模型との差を区別する。 | [OpenAI「The periodic spin-one Haldane gap」（2026-09-24）](https://github.com/openai/math/tree/main/preprints/The-periodic-spin-one-Haldane-gap-September-24-2026) と [「A boundary-field gap for the spin-one Heisenberg chain」（同日）](https://github.com/openai/math/tree/main/preprints/A-boundary-field-gap-for-the-spin-one-Heisenberg-chain-September-24-2026) の二つの主張。数値的補題・計算証明書の独立再実行と形式化範囲は要確認。 |
| **田崎晴明：トポロジカル指数・無限鎖・境界条件** | 有限体積のギャップから何が言え、何が言えないか。SPTの非自明性、twist指数とOgata指数、並進不変基底状態の一意性、異方性への安定性を段階的に読む。 | [2025年PRLの条件付きSPT結果](https://doi.org/10.1103/PhysRevLett.134.076602)、[2026年の指数同値性論文（arXiv:2609.34119）](https://arxiv.org/abs/2609.34119)、[無限鎖の一意性論文（arXiv:2610.34330）](https://arxiv.org/abs/2610.34330)。原論文の版・他の数値的入力への依存・独立検証は個別に点検する。 |

### 7.1 命題を混同しないための研究読解ポイント

- **古典的予想の射程**：1次元・最近接・等方的反強磁性Heisenberg模型 $H_L=\sum_{j=1}^{L}\boldsymbol S_j\cdot\boldsymbol S_{j+1}$ をまず定義する。2026年の周期鎖論文は **$S=1$、偶数長の周期境界条件**で、基底エネルギーと次の異なる固有値の差に対する $L$ に一様な正の下界を主張する。全整数スピン・全境界条件の一挙解決と読み替えない。半奇整数スピン側の Lieb–Schultz–Mattis 型障害も別命題とする。
- **境界場と無限体積の差**：別のOpenAI論文は、両端に場を置いた奇数長の開放鎖に関する一様ギャップを扱う。周期鎖の結果だけから開放端のギャップ、端状態、無限鎖の一意性を機械的に導かない。有限長でのギャップ、熱力学極限における局所極限、局所一意性、すべての基底状態に関する一意性を区別する。
- **田崎氏の2025年結果との接続**：[Phys. Rev. Lett. 134, 076602 (2025)](https://doi.org/10.1103/PhysRevLett.134.076602) は、境界磁場付き開放鎖の一様ギャップなどを**仮定して**非自明なSPT指標を示した条件付き定理である。2026年の境界場論文と組み合わせる際は両論文の仮定を照合し、周期鎖のギャップ証明と同一視しない。
- **田崎氏の指数同値性（2026）**：[arXiv:2609.34119](https://arxiv.org/abs/2609.34119) は $U(1)\rtimes\mathbb Z_2$ 対称性下のtwist指数とOgataの作用素代数的指数の対応を扱い、境界場のギャップ結果を用いた $S=1$ 鎖の非自明な指標（$-1$）へ接続する。指標の定義域（対称性・純粋性・ギャップ・局所一意性等）と定理が要求する仮定を明記する。
- **田崎氏の無限鎖結果（2026）**：[arXiv:2610.34330](https://arxiv.org/abs/2610.34330) はOpenAIの解析手法と数値的入力を利用し、無限 $S=1$ Heisenberg鎖および小さい $|D|$ の $J$–$D$ 模型で**並進不変**基底状態の一意性、周期鎖と境界場付き開放鎖からの局所極限の一致などを主張する。任意の**非**並進不変基底状態までの一意性を証明したと拡張しない。異方性 $D$ の定義、許容範囲と収束の一様性を原文で検査する。
- **研究者による読解と完全な独立検証の差**：田崎氏は[2026年10月18日公開の解説ノート](https://haltasaki.github.io/writings/AI/OpenAI_Haldane.html) で解析的議論を連続時間・離散時間の二方式で説明する一方、**計算機援用の評価を独立には確認していない**と記す。この読解を数値証明書・Lean kernel・査読誌の認定と同一視しない。

### 7.2 採択する場合の最小限の橋渡しと実装判断

- **基礎橋渡し候補**：有限スピン1行列とテンソル積、局所Hamiltonianとスペクトルギャップ、AKLTの厳密可解例、分配関数と転送作用素、有限サイズの指数評価、熱力学極限と局所観測量、作用素代数的基底状態、SPT/twist/Ogata指数。具体例と小サイズの行列計算を優先し、要件を満たさない用語を後出しにしない。
- **既存教材の接続を要照合**：QM系・SM/SG/TH系・線形代数・作用素論／AQFT・トポロジー/SPTに関する既存正本を章本文・knowledge.yaml・manifestで点検する。これらの系の修了が直ちに量子スピン鎖やC*代数の専門定理の既習を意味するとはしない。
- **講義分割は未確定**：採択するなら、(A) Haldane予想とAKLT/LSM、(B) 周期鎖・境界場のギャップ証明と有限計算、(C) 田崎氏のSPT指標の橋渡し、(D) 無限鎖の一意性と$J$–$D$摂動、の順を検討する。**A–Dは検討観点であり4講確定・章ID採番ではない**。
- **採択判定の停止線**：OpenAIの2論文、田崎氏の解説・2025年PRL・2026年2論文それぞれの版と正確な主定理、計算機援用部分の再検証可否、形式化artifactと第三者検証の有無、既存科目との差分を照合してから、family構成・総講数・EOM manifestを改定する。今回は候補の追加のみで、既存25講の完成条件を変更しない。

資料確認基準日: **2026-11-19**。研究成果の要約は論文著者の主張・既存の解説資料に基づく候補整理であり、すべての計算証明書を本PLAN側で独立検証したという意味ではない。
