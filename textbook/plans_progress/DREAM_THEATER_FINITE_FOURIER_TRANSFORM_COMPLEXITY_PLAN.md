# DREAM THEATER 有限Fourier変換・高速アルゴリズム・計算量の最適対数指数（FFT1〜FFT36）

構成確定日: 2026-11-28 JST  
状態: **進行中・全36講の設計確定**（既存前提およびEOM横断講を含まない）。FFT1〜5を実装、FFT6〜36はplanned。進捗の正本は `textbook/dream-theater-series/FFT.yaml`。  
系列ID: FFT（実装前に全章IDと配置を再照合）。分類: 計算系・独立研究講読。

## 1. 中心問いと到達点

有限Abel群の文字表による厳密なFourier変換を、任意の係数を使える二入力線形回路で計算するとき、なぜ古典的な $N\log N$ より少ないゲートで済み、なぜ $N\sqrt{\log N}$ より本質的には小さくできないと主張されるのか。古典FFTの具体的計算から、2026-11-24の41頁の原論文の上下界・頑健下界・多項式乗算までを再構成する。

基準版: OpenAI, *The logarithmic exponent of finite Fourier transforms*, 2026-11-24, [本文・Leanへの入口](https://mathcommunity.github.io/oai-math-revised/papers/The-logarithmic-exponent-of-finite-Fourier-transforms-November-24-2026/) / [原著者版](https://github.com/openai/math/tree/main/preprints/The-logarithmic-exponent-of-finite-Fourier-transforms-November-24-2026). 同日版の *Euclidean geometry in the asymptotic spectrum of tensors* の必要部分を入力とする。

- Theorem 1.1: $N\ge2$、$J\ge1$、位数 $N$ の有限Abel群 $G_j$、$N$ が体 $K$ で可逆、各 $\exp(G_j)$ 次原始1の根が $K$ に存在。各ブロックは順変換または正規化された逆変換、$T$ はその直和。二入力線形ゲート $au+bv$ を数え、出力の単一値の選択・スカラー倍・零は無料とする。絶対定数 $c>0$ と任意の $\epsilon>0$ に対し $\epsilon$ のみ依存の $C_\epsilon$ で
  $$cJN\sqrt{\log_2 N}\le C_K(T)\le C_\epsilon JN(1+\log_2 N)^{1/2+\epsilon}.$$
  ブロック間で混合してよい下界であり、上界はブロック別の構成で足りる。対数指数の確定と $\epsilon=0$ の上界（未解決）を区別する。
- Theorem 1.2: 一意可解な二入力feedback線形系（状態数 $s$）と低階数補正 $B$、疎補正 $Z$ の和のZariski閉包に対する頑健な下界。$h=JN$、$\operatorname{rank}B\le\beta h$、$|\operatorname{supp}Z|\le\eta h\,2^{\sqrt{\log_2 N}/8}$ のもと $s\ge c h\sqrt{\log_2 N}$。三者の同時退化、全行列のsupport、体上の閉包と代数閉包での操作を明示する。
- Theorem 5.1: 固定素数radix $\ell$ のテンソル冪について、$R_\ell=\mathbb Z[1/\ell,\zeta_\ell]$ 上で構成可能な回路と算術・indexingの主張。固定 $\ell,\alpha>1/2$ における定数と全体の一様定数を区別する。Proposition 5.2のbit layout・正規化Walsh変換の安定性はその仮定の範囲で扱う。
- Theorem 7.1・Corollaries 7.5, 8.2: 任意の体での形式的多項式乗算（除算なし、加減乗算のゲートを数える）と固定畳み込み・Toeplitzへの帰結。$J$ 独立積の下界・上界は $Jn(\log n)^{1/2+o(1)}$。有限体上で点ごとに一致する多項式関数と形式多項式の一致は別。
- Theorem 8.1: 相異なる等比数列の評価点における評価／補間と可逆三角Toeplitzのテンソル積に対する一様上界を経て任意の有限Abel群に戻る。
- 厳密線形回路の非一様ゲート数・一様RAM・Turing機械上のビット時間・浮動小数点の誤差・GPU実時間を別々に扱う。多項式乗算と整数の桁上がりを含む整数乗算は同一命題でない。整数乗算 on tapes の同日別論文（下界のWeak ETH等を含む）は別の研究課題として参照するだけで、本36講にはその証明を含めない。

公開原稿の主張を学ぶ研究講読であり、設計時点では全証明の再計算、Lean kernelの独立再実行、statement matching、査読済みの確認は行っていない。形式化の公開と検証済みを分ける。

## 2. 既存資産との分担と履修順

- [ACOMP](../plan_done/DREAM_THEATER_ALGEBRAIC_COMPLEXITY_I_II_PLAN.md) 1–5（形式多項式・算術回路・体・次数切断）、21–22（付値・退化・Zariski閉包）、[TSP](../plan_done/DREAM_THEATER_TENSOR_ASYMPTOTIC_SPECTRUM_PLAN.md) 1–6, 8–13, 15–16（テンソル・直和・階数・スペクトル）。これらは現行manifestでcompleted。一般論の重複証明を避け、FFTで使う形と具体例を担当する。
- [MMX](../plans_progress/DREAM_THEATER_MATRIX_MULTIPLICATION_EXPONENT_PROOF_STUDY_PLAN.md) 8–10 のEuclid price・wire・共有ラベル・compatible spectral systemを再利用（2026-11-28確認時にcompleted）。必要な仮定を同日companionの原文と照合。FFTの矩形price、weighted swap、射影リスト、feedbackの時間展開はFFT7–13が所有する。MMXの残り全講、VNP全講、行列積9/4の下界は必修でない。MMXのPLAN移動時は参照を追従する。
- [HDP](../plan_done/DREAM_THEATER_HIGH_DIMENSIONAL_PROBABILITY_PLAN.md) 1（Hoeffding）と必要な基礎線形代数・群環体・合同式・補間を再利用。HDP1はcompleted。FFT固有のshift平均と正標数に耐える補間は新規。FOUなど連続Fourier解析との接続は任意で、連続解析全体やHA全講は必修としない。既存基礎章の実在anchorと概念DAGの到達性は着手時に照合する（FOUの独立manifestは存在を確認できていないため仮の章リンクを置かない）。
- [FML](../plan_done/DREAM_THEATER_FORMAL_MATHEMATICS_LEAN_PLAN.md) 1–3, 5–7 を形式検証で使用（completed）。LVT全講を一律必修にしない。
- [EOM](../plans/DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md) は横断的な証拠評価の正本。FFTの証明は本系列が所有する。既存EOM107（MMX）との比較をFFT36で行うが、EOM講数・familyの再編は別の編集単位とする。
- 入門（FFT1–6）から、下界（7–13）と構成（14–32）に分岐し、33–36で合流する。実装は通算順。前提の一般定義が未導入なら担当講の冒頭で直接例とともに導入し、後続章を前提にしない。

## 3. 全36講：中心問い・証明責務・直接前提

### I. 古典FFTと線形複雑性（6講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT1 | DFT・逆変換・正規化・文字の直交性、根の条件と $N=4$ の手計算。実数信号の共役対称は複素数の場合のみ。 | 基礎線形代数・群環体、Stein–Shakarchi ch.7 |
| FFT2 | 有限Abel群の巡回群分解、双対群、文字表のテンソル積、分裂体。Walsh–Hadamardを標数2で使えない理由を確認。 | FFT1、MOD2（構造定理）、TSP1,5、Stein–Shakarchi ch.7 |
| FFT3 | Cooley–Tukeyの添字分解・twiddle・radix-2再帰、Goodの互いに素な分解、4/6/8点の置換と計算量。 | FFT1–2、Van Loan ch.1–2 |
| FFT4 | 畳み込み定理・ゼロ詰め・Bluesteinの整数chirp恒等式・固定多項式との乗算。小さい有限体でNTTの条件を検算。 | FFT1–3、Modern Computer Algebra ch.8,10 |
| FFT5 | 二入力線形回路のreadout・fanout・直和、算術回路の一次成分抽出、非一様性と対数指数の量化。 | FFT2–4、ACOMP1–5、BCS linear complexity |
| FFT6 | Morgensternの行列式ポテンシャル、正規化と有界係数・Ailonの制限、rigidity/nonrigidityとAlman–Raoの節約、2026年の小さい指数改善をモデル別に比較。 | FFT3,5、Morgenstern、Ailon、Alman–Rao、原論文§1.2 |

### II. 頑健な下界：階数とsupportの同時テスト（7講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT7 | 平面上の脚配置とprice、半周長・コピー・wire・局所縮約、Theorem 2.1の全入力をcompanionと照合。 | FFT2,5、MMX8–10、TSP10–13,15–16、原論文§2 |
| FFT8 | 行列の四脚テンソル、矩形の高さ・幅を潰したときの階数/support、中心でのコピーによる上界。具体的な2×2行列。 | FFT7、§2 |
| FFT9 | 対称非退化bicharacter、controlled additionと文字基底、二つのphaseによるweighted swap（Lemma 2.3）。 | FFT2,8、§2 |
| FFT10 | swapのprice等号・極限の力の釣合い・同じラベルのコピー・遠方への移動でProposition 2.4とTheorem 2.2を導く。 | FFT7–9、ACOMP21–22、§2 |
| FFT11 | ほぼ全階数の射影をかけた $[I,H]$ のリスト評価、三角形・矩形の指数の選び方、Lemma 3.1の定数と例外範囲。 | FFT10、§3.1 |
| FFT12 | 独立ブロックのechelon quotient、退化で混合ブロックを消す操作、疎な行のスペクトル値、Lemma 3.2の同時階数・support評価。 | FFT11、TSP5,8、ACOMP22、§3.2 |
| FFT13 | feedbackの一意解と時間展開（Lemma 3.3）、rank予算・行support・小さいNの処理、Theorem 1.2の矛盾からTheorem 1.1下界。 | FFT5,12、§3.3 |

### III. 低次数予測と厳密なスペクトル修復（6講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT14 | 固定素数radix、共通固有基底・可換query、全shiftを均等割当する理由と整数countの集中幅・例外率。 | FFT2,5、HDP1、§4.1 |
| FFT15 | 指示関数の文字展開、二項係数の形式級数、整数係数の補間でLemma 4.2を示す。標数が次数以下でも成立する理由。 | FFT14、ACOMP21、§4.1 |
| FFT16 | 行列pencilの定義、有限自由円分拡大、行列冪による多項式のfull-rate評価と独立入力を維持するLemma 4.3。 | FFT15、TSP5、§4.2 |
| FFT17 | 例外行を線形チェックから復元する符号・Vandermonde部分行列・周波数依存の例外集合、rank条件の小例。 | FFT14–16、§4.3 |
| FFT18 | 一次予測では固定liftができない理由、Hermite型の二重零点、Lemma 4.4の二つの変換と補正行列を全展開。 | FFT17、§4.3 |
| FFT19 | Theorem 4.1を組み立て、batch幅・修復率・pencil段数・基底変換・係数環を台帳化。奇標数でのswap（Cor.4.5）と停止線。 | FFT16–18、§4 |

### IV. 固定素数radixの再帰アルゴリズム（4講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT20 | addressの二分・補助軸・query積、有限体の直交和を展開して積の核から $D_\ell^{\otimes k}$ を取り出す。 | FFT2,19、§5 |
| FFT21 | 行のrouting・free/charged rectangleの分解、部分変換・complementを用いた再帰呼出数、indexと線形演算の費用。 | FFT20、§5 |
| FFT22 | batchのpacking・padding・定数選択、再帰不等式で任意の $\alpha>1/2$ の上界、有限自由拡大から $R_\ell$ へ戻す費用（Theorem 5.1）。 | FFT19–21、§5 |
| FFT23 | Walsh変換のbit layout・偶数幅・正規化4点蝶、Proposition 5.2の係数集合と誤差蓄積。一般DFTの安定性への外挿禁止。 | FFT22、§5.5、Higham ch.24 |

### V. テンソル積上で異種の演算を同期（4講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT24 | shearのテンソル冪・置換・固定radix、標数2でradix3を選ぶ理由と基礎体への降下（Lemma 6.1）。 | FFT19,22、§6.1 |
| FFT25 | 等比格子上の評価・Newton基底・Vandermondeと三角Toeplitzへの分解（Lemma 6.2）、逆変換の積の順序。 | FFT4,24、§6 |
| FFT26 | 短いFourier wordを用いたToeplitz/幾何評価・scratch復元、三角Toeplitzの形式級数共役、Lemma 6.3の条件。 | FFT25、ACOMP21、§6.3 |
| FFT27 | fiber間でscratchを借りる操作、word同期（Lemma 6.4）のアドレス・メモリ・ゲートの台帳、異なる軸長の積。 | FFT24–26、§6.4 |

### VI. 任意の体の多項式乗算（5講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT28 | 有限拡大・jet・巡回代数の三軸packing、折り返し回避とcarryを含むgather、$8n\le erN\le9n$ の選択。 | FFT4,27、§7.1 |
| FFT29 | 素数軸の選定・拡大次数・根の確保、標数による場合分けと $\log(6er)$ の劣線形評価。必要な数論補題の入力を明示。 | FFT28、§7.2 |
| FFT30 | 基礎体上のjet乗算・平行移動、係数表現・二変数から一変数へ、標数0でのshiftと階乗、Lemma 7.2。 | FFT28–29、ACOMP4–5、§7.3 |
| FFT31 | 正標数の分裂軸による乗算、標数0のprime cyclic algebraのbinomial座標（Lemma 7.3）・基底変換とCRT、具体的な$p=3$。 | FFT27,29–30、§7.3–4 |
| FFT32 | 共通変形パラメータによるsplit blockの乗算（Lemma 7.4）、jet長と復元次数、費用再帰を閉じTheorem 7.1・Corollary 7.5を導く。 | FFT30–31、§7 |

### VII. 全長の上界・帰結・検証（4講）

| ID | 中心問い・再現すべき結果 | 直接前提・資料 |
| --- | --- | --- |
| FFT33 | geometric grid・大軸と小軸のgrouping、補助Fourier長の根・標数回避・体拡大・同期wordの費用を証明しTheorem 8.1。 | FFT25–27,32、§8 |
| FFT34 | 任意有限Abel群の順逆変換の上界をTheorem 8.1から導きFFT13の下界と合成。Bluestein固定入力への特殊化と一次成分抽出でCor.8.2のbatch下界、全定数の量化。 | FFT2,4–5,13,33、§8.1 |
| FFT35 | 実験：古典FFT/NTT・直接行列積との厳密比較、予測・修復の小規模核の一致検査、数値誤差・準備・メモリ・SIMD/GPU・bit complexityの限界。FFT畳み込み・PDE・画像/GIS・暗号の適用条件、実測と漸近比を分離。 | FFT23,34、Van Loan、Higham |
| FFT36 | 研究証明監査：原論文の定理・補題台帳、companionの入力、Leanの単独・batch上下界・公理・固定版・独立kernel照合、未確認項目・$\epsilon=0$ 問題・MMX/EOM/整数乗算とのモデル比較。 | FFT13,22,32,34–35、FML5–7 |

配分は **6 + 7 + 6 + 4 + 4 + 5 + 4 = 36講**。古典的理論は6講、原論文の証明と構成は28講、実験・総合監査は2講。暫定16講では§2–3の幾何的下界、§4のfull-rate修復、§5の呼出数、§6の同期、§7の体と標数の分岐が各1講に圧縮されてしまう。一般的テンソル幾何や算術回路を重複計上せず、41頁の論文の論証の節目と演習可能性で確定した。各講の上限時間は固定しない。

## 4. 標準書・一次資料と使い分け

書籍は出版社の公開目次・章概要、論文は公開原稿の定理と節構成を設計根拠とした。書籍全巻の精読や全研究証明の検算を済ませたという意味ではない。

| 資料 | 対応と役割 |
| --- | --- |
| E. M. Stein, R. Shakarchi, *Fourier Analysis: An Introduction* (2003), [Princeton](https://press.princeton.edu/books/ebook/9781400831234/fourier-analysis-0), ch.7 | FFT1–2、有限群の文字・反転・直交性。連続理論は別系列。 |
| C. Van Loan, *Computational Frameworks for the Fast Fourier Transform* (1992), [Cornell](https://www.cs.cornell.edu/courses/cs621/Books/FFT/), [SIAM](https://doi.org/10.1137/1.9781611970999), ch.1–3 | FFT3–4,35、radix、行列分解、実装と効率。 |
| P. Bürgisser, M. Clausen, M. A. Shokrollahi, *Algebraic Complexity Theory* (1997), [Springer](https://doi.org/10.1007/978-3-662-03338-8), linear complexity | FFT5–6、線形計算モデルと古典的下界。ACOMP/TSPとの共通基礎。 |
| R. O'Donnell, *Analysis of Boolean Functions* (2014), [Cambridge](https://www.cambridge.org/core/books/analysis-of-boolean-functions/B05A66E4DCC778E02B84C16376F4D1FD), ch.1–2 | FFT2,14–15、Boolean立方体・Walsh展開と低次数の直感。原論文の整数補間そのものの代替にはしない。 |
| J. von zur Gathen, J. Gerhard, *Modern Computer Algebra*, 3rd ed. (2013), [ch.8](https://www.cambridge.org/core/books/abs/modern-computer-algebra/fast-multiplication/D3F25E526A75187A1917F91A992DB4C6), [ch.10](https://www.cambridge.org/core/books/abs/modern-computer-algebra/fast-polynomial-evaluation-and-interpolation/7E7AF0E32AB217547BA83B7F6BF06CAA) | FFT4,25–34、剰余環・高速乗算・評価補間の古典基盤。 |
| N. J. Higham, *Accuracy and Stability of Numerical Algorithms*, 2nd ed. (2002), [ch.24](https://doi.org/10.1137/1.9780898718027.ch24) | FFT23,35、丸め誤差と安定性。 |
| J. W. Cooley, J. W. Tukey (1965), *An Algorithm for the Machine Calculation of Complex Fourier Series*; I. J. Good (1958); L. Bluestein (1970) | FFT3–4。原論文参考文献と書籍のradix・chirp導出を比較。 |
| J. Morgenstern (1973), [linear complexity lower bound](https://doi.org/10.1145/321752.321761); N. Ailon (2013,2016), unitary / well-conditioned lower bounds（原論文文献[1,2]） | FFT6、係数制限・正規化・condition numberの区別。 |
| J. Alman, K. Rao (2023), [Faster Walsh–Hadamard and discrete Fourier transforms from matrix non-rigidity](https://doi.org/10.1145/3564246.3585188) | FFT6、先行定数改善の仕組み。 |
| OpenAI (2026-09-25), [Finite tensor savings and exact Fourier circuits](https://github.com/openai/math/tree/main/preprints/Finite-tensor-savings-and-exact-Fourier-circuits-September-25-2026), [An explicit power saving for the exact discrete Fourier transform](https://github.com/openai/math/tree/main/preprints/An-explicit-power-saving-for-the-exact-discrete-Fourier-transform-September-25-2026) | FFT6,22,36、先行sub-$N\log N$結果と算術・indexingのモデル比較。 |
| OpenAI (2026-11-24), [Euclidean geometry in the asymptotic spectrum of tensors](https://mathcommunity.github.io/oai-math-revised/papers/Euclidean-geometry-in-the-asymptotic-spectrum-of-tensors-November-24-2026/), [The logarithmic exponent of finite Fourier transforms](https://mathcommunity.github.io/oai-math-revised/papers/The-logarithmic-exponent-of-finite-Fourier-transforms-November-24-2026/) | FFT7–34の原著。§2–8と上表の対応を証明台帳で追跡する。 |
| OpenAI (2026-11-24), [The logarithmic exponent of integer multiplication on tapes](https://mathcommunity.github.io/oai-math-revised/papers/The-logarithmic-exponent-of-integer-multiplication-on-tapes-November-24-2026/) | FFT36で比較のみ。ビット計算の定理を本系列から無条件には導かない。 |

## 5. 主要証明の閉包・独習成果物

- FFT1–6は直接計算・小さい群の文字表・回路のゲート数の照合。係数制限を外した下界にMorgensternを流用しない。
- FFT7–13は原論文§2–3の全主要命題と証明を棚卸しする。priceの存在の外部入力をMMXとcompanionへ追跡し、射影・独立ブロック・時間展開の仮定を確認する。単独の下界からbatch下界を自動的に推論しない。
- FFT14–23は§4–5の各lemma、exactnessと費用を別々に追う。修復率は確率的に誤答するアルゴリズムという意味ではない。有限自由拡大のランク、係数準備、固定パラメータ依存とuniform性を台帳化する。
- FFT24–34は§6–8の補題、標数別の構成、再帰閉包、補助拡大の降下と一様定数を閉じる。§7の乗算上界を§8に使用する順を守り、一般Fourier上界を先取りして§7を証明しない。
- FFT35は再現可能なコードと期待値／実測値を分けた表を置く。小規模の修復核や古典FFT/NTTが合うことを検査しても全理論・大規模性能の検証とはしない。原論文の全算法の動作実装が困難なら未実装部分と数値検証の境界を明記し、実測高速化を宣言しない。
- FFT36は[公開形式化の入口](https://mathcommunity.github.io/oai-math-revised/papers/The-logarithmic-exponent-of-finite-Fourier-transforms-November-24-2026/)から実ファイル・scope noteを固定SHAで確認する。単独／batch Fourier上下界、頑健下界、多項式乗算、正規化Walsh安定性の各行で、命題の量化・仮定・計算モデル・依存公理・sorry有無・再ビルド・独立kernel・自然言語証明・外部査読の状況を分ける。公開ページが明記するLean範囲を越えて形式化済みとしない。未照合の定理は未照合と記録する。 2026-11-28に確認した公開scope note [family 379](https://github.com/mathcommunity/oai-math-revised/blob/main/lean/docs/379.md)・[family 130](https://github.com/mathcommunity/oai-math-revised/blob/main/lean/docs/130.md) は、単独・batchのFourier上下界とfeedback/低階数/疎誤差を含む下界、および整数係数回路による任意体の多項式乗算上界を形式化の対象とする一方、**多項式乗算の下界（単独もbatchも）は未形式化**と明記する。したがってFFT34の乗算下界の自然言語証明の独立検算は必須とし、Fourierの形式化をその代用にしない。Walshの数値安定性については当該noteだけから形式化済みと判断しない。

## 6. 着手・完了条件

現行の [執筆・査読統合規約](../DREAM_THEATER_AUTHORING_STANDARD.md) と [演習規約](../DREAM_THEATER_EXERCISE_POLICY.md) に従う。着手時にPLANをplans_progressへ移し、FFT系列manifestを全36講で初期化、章ID・既存依存・stable anchorを実ファイルで確認する。未実装章はplanned、本文の全主要証明・全演習詳細解答の再計算、別観点再読、必要なCI・公開目次・knowledge DAG・manifest更新を完了した章だけcompletedにする。各講Level A4/B3/C1以上（最低数、到達目標によって追加）、36講で最低288題・詳細解答。定義の直接例と反例、典型的誤り、定理の適用条件を練習できるよう設計する。

全36講完成後、原論文Theorems 1.1, 1.2, 2.1, 2.2, 4.1, 5.1, 7.1, 8.1と関連補題・系・Proposition 5.2の証明責務台帳、既存依存、実験、形式化の照合結果、残る数学的未確認事項を横断監査し、直接必要なrouting/index/manifestと公開を確認してからplan_doneへ移す。未検証の外部研究を既知の定理として教えない。原論文に欠陥が判明した場合は証明を創作せず、当該命題と依存先の状態を改訂する。
