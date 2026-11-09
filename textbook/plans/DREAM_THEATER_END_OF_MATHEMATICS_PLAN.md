# DREAM THEATER THE END OF MATHEMATICS? 計画

作成日: 2026-10-07  
構成確定日: 2026-11-09  
状態: planned（講義設計確定・EOM固有の章本文は未着手）

## 0. 目的と研究上の留保

2026年に公開された数学研究成果のうち、DREAM THEATER で深く追う対象は次の5 result family に限定する。

- **074**: 3次元 Kakeya 最大作用素・4次元 Kakeya 集合の次元
- **017**: $\pi$ の無理数度
- **004**: 有理数体上の Hilbert 第10問題
- **376**: 外力付き Navier–Stokes 流の計算普遍性
- **221**: 希釈スピングラスの Mézard–Parisi 公式

result family は研究成果群の識別子であり、講数ではない。この系列はニュース紹介ではなく、既存の正規講義を辿った読者が**研究最前線の exact theorem statement、主要補題の計算、proof architecture、検証状態**を区別して読めるようにする研究読解科目である。

研究原論文全ページの独立した完全証明と、教材で証明を再構成する主要補題・計算、および原論文を参照して依存構造だけを追う箇所は明確に区分する。公表された主張を自動的に確立済みの定理としない。2026年の研究の状態は基準日付きの記録とし、既存の確立した基礎理論とは分離する。

## 1. 講義数の確定：全12講

**全12講で確定する。** 従来の EOM0 と EOM6 の役割は維持する。各 result family の最終講は従来の EOM074 等の ID を保ち、前段講は A / B を付ける。実装時に EOM series manifest を新設して ID を照合・登録する。講数は証明と学習課題のまとまりによるもので、15週・90分などの時間割制約は課さない。

| 講 | 予定章ID | 中心問い・到達目標 | 前提 |
| --- | --- | --- | --- |
| 1 | **EOM0** | 研究数学の問題・主張・原論文・形式化・査読・出版はどう異なるか。各成果の検証台帳を作る。 | CMP、数学的証明の基礎 |
| 2 | **EOM074A** | Kakeya 集合を tube 最大作用素へどう翻訳するか。方向分離、体積、次元・ノルム指数を検算する。 | MT8、HA11、GMT1–8・GMT31–36 |
| 3 | **EOM074B** | 3次元 Kakeya 最大作用素予想の正確な評価は何か。多重尺度の核心補題を辿る。 | EOM074A |
| 4 | **EOM074** | 4次元 Kakeya 集合の Hausdorff 次元はなぜ4か。3次元評価との含意と追加の幾何を分ける。 | EOM074B、GMT35–36 |
| 5 | **EOM017** | $\mu(\pi)=2$ の量化、Roth の定理の射程、Flint–Hills 級数、Lean の検証範囲を分けて読む。 | NDA5–8、NT7 |
| 6 | **EOM004A** | $\mathrm{H10}(\mathbb Z)$ と $\mathrm{H10}(\mathbb Q)$、整数の存在的定義可能性はどう違うか。 | NT9–10、CMP4–6、EC |
| 7 | **EOM004** | 2026年の有理数上の非決定可能性主張を読み、算術補題・楕円曲線・帰着の依存構造を検査する。 | EOM004A、EC関連章 |
| 8 | **EOM376A** | 有限計算を滑らかな非圧縮流の輸送へどう符号化するか。有限命令と流れの橋を作る。 | CMP1–6、CELL1–2、NS1–2 |
| 9 | **EOM376** | 固定粒子の到達・速度場の検出が停止問題と同値になる条件は何か。外力と形式化の範囲を確認する。 | EOM376A、NS3–8 |
| 10 | **EOM221A** | 希釈模型の cavity 再帰を階層化すると何が変わるか。圧力、試行汎関数、RS/RSBを区別する。 | TH、SM、SG1–8 |
| 11 | **EOM221** | Panchenko–Talagrand型模型の極限圧力と階層的変分値の一致を、上下界・摂動・比較から追う。 | EOM221A |
| 12 | **EOM6** | 「数学の終わり」ではなく、定理生成・検証・重要度判断・理論構築・課題選択・教育の分業はどう変わるか。 | EOM0 と全5 family |

内訳：**導入1 + Kakeya3 + $\pi$1 + Hilbert第10問題2 + Navier–Stokes2 + Mézard–Parisi2 + 総括1 = 12講**。

$\pi$ は独立した Diophantine 近似講義が完成しているので1講に集約する。一方 Kakeya は異なる3D・4Dの長大な原論文とその橋渡しを1講へ圧縮しない。各講の長さは証明と演習の責務で決め、講数を満たすだけの薄い補講は作らない。

## 2. 現在の依存関係と着手可否（2026-11-09）

GitHub の系列 manifest と直接必要な chapter.yaml の完成状態を確認した。ここでの着手可能とは、既習講義を入口として本文を開始できるという意味であり、原論文に現れる全高度補題が既習という意味ではない。

| family | 現在の canonical 前提 | 判定 |
| --- | --- | --- |
| 074 | MT8 完成、HA1–11 完成。GMT1 完成、GMT2–36 は [進行中の幾何学的測度論 PLAN](../plans_progress/DREAM_THEATER_GEOMETRIC_MEASURE_THEORY_PLAN.md) と GMT 系列 manifest で管理 | **GMTの続講待ち**。声明・資料調査は直ちに可。EOM074A–074の本文完成には GMT2–8・GMT31–36 の canonical 化が必要（GMT9–30全講は一律必修ではない） |
| 017 | NT7、NDA1–8 完成 | **着手可能** |
| 004 | NT9–10、CMP1–8、EC1–11 完成 | **着手可能**。原論文固有の算術的橋渡しは EOM004 で精査 |
| 376 | NS1–8A、CMP1–8、CELL1–15 完成 | **着手可能** |
| 221 | TH1–8、SM1–8、SG1–8 完成 | **着手可能** |

**結論**：5 family 全部の資料調査と全12講の設計は開始可能。うち4 family の本文執筆は前提充足。074 も GMT PLAN 自体には着手できるが、EOM074 の完成には GMT1–8・GMT31–36 の実装が必要であり、GMT9–30全講の完成は一律前提にしない。「既存章がある」だけでは EOM の計画自体を実装中とは扱わない。現時点で EOM.yaml は未作成である。

実装推奨順は (1) EOM0 の共通検証枠、(2) EOM017・EOM004A→004・EOM376A→376・EOM221A→221、(3) GMTの必要講義（1–8・31–36）完成後の EOM074A→074B→074、(4) EOM6 と全体整合である。

**PLAN の状態遷移**：最初の EOM 固有の本文・検証・監査を実際に開始したときに本ファイルを plans_progress へ移動し、同じ作業単位で EOM.yaml の plan を更新する。今回は設計改訂だけなので plans に留める。全章・公開導線・横断検証まで完了して初めて plan_done へ移す。

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

### 2026年原資料

- OpenAI, [mathematics release / catalogue / verification history](https://github.com/openai/math): familyとmanuscriptの区別、Lean artefact、更新履歴。公開元も未形式化成果に問題があり得ると明記する。
- 074: [3D Kakeya maximal](https://github.com/openai/math/tree/main/preprints/The-Kakeya-maximal-conjecture-in-three-dimensions-September-23-2026) / [4D Hausdorff dimension](https://github.com/openai/math/tree/main/preprints/Every-four-dimensional-Kakeya-set-has-full-Hausdorff-dimension-September-24-2026)。
- 017: [無理数度原論文](https://github.com/openai/math/tree/main/preprints/The-irrationality-exponent-of-pi-is-2-September-24-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/017.md)。
- 004: [Hilbert's tenth problem over the rational numbers](https://github.com/openai/math/tree/main/preprints/Hilberts-tenth-problem-over-the-rational-numbers-October-6-2026)。
- 376: [Lean scope と関連 manuscript](https://github.com/openai/math/blob/main/lean/docs/376.md)。
- 221: [Mézard–Parisi 原論文](https://github.com/openai/math/tree/main/preprints/The-Mezard-Parisi-formula-for-diluted-spin-glasses-September-23-2026) / [Lean scope](https://github.com/openai/math/blob/main/lean/docs/221.md)。

資料確認基準日は **2026-11-09**。この一覧は査読付き出版・独立人間査読の完了認定ではない。本文執筆時には原論文の版・commit・対象 theorem と実際の形式化範囲を再確認する。

## 6. 完成条件

- [ ] EOM manifest に12講を登録し、実際に完成した章のみ completed とする。
- [ ] 各章の本文・chapter.yaml・knowledge.yaml と prerequisite・stable anchor が対応する。
- [ ] 全主要定義、主定理、核心の中間補題、演習と詳細解答が独習者に再構成可能な粒度にある。
- [ ] 5 family で主張・証明 artifact・形式化・独立査読・出版・賞を混同せず、基準日と未確認事項を示す。
- [ ] GMT からの canonical prerequisite を満たし、Kakeya の集合版・次元版・最大作用素版を混同しない。
- [ ] 5 family 以外へ EOM を無制限に増やさず、独立した基礎科目は正規PLANで扱う。
- [ ] DREAM THEATER の変更区分別査読、concept / knowledge / exercise / KaTeX / formal statement / Pages link 検証と公開導線を完了する。
- [ ] 未実装章を公開目次へ先行登録せず、PLAN を重複配置しない。

**講義設計の確定、研究成果の数学的検証完了、教材本文の完成は別の状態である。**
