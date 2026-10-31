# DREAM THEATER 超局所解析・Hadamard条件 I（MICA系列・講数可変）

作成・分冊: 2026-10-11  
改訂: 2026-10-31（標準教科書・原論文との照合、定理の適用条件・証明依存・点分離の再設計）  
状態: planned（設計の推敲のみ。本文実装・series manifest・公開は未着手）

## 中心問いと出口

**「分布がどこで特異か」だけでなく「どの余接方向に特異か」を、どう定義し、計算し、波動方程式と量子場の二点関数へつなぐか。** そして、一般には点 $x=y$ で意味を持たない二点関数から、Hadamard特異部分を差し引くことで、どの範囲の局所観測量を定義できるか。

出発点は「$C^\infty$ でない場所」という特異支持だけでは、分布の積・部分多様体への制限を判定できないこと。出口は次の五つとする。

1. 局所Fourier変換の方向別減衰から波面集合 $WF(u)\subset T^*M\setminus 0$ を定義し、基本例を手で計算する。
2. 分布の積・引き戻しに関する **Hörmanderの十分条件**を、その条件が破れる具体例とともに使う。
3. 擬微分作用素の主シンボル、特性集合、Hamilton流から、波動方程式の特異性が零測地線に沿って伝わる仕組みを理解する。
4. 自由Klein–Gordon場の二点分布について、局所Hadamard形と波面集合による特徴づけの仮定・射程を述べられる。
5. **二点分布そのものの対角制限は一般に不可能**であることを検証し、Hadamard subtraction後の滑らかな差の対角評価、Wick平方、応力テンソルと有限くりこみ自由度を区別する。

「Hadamardであれば何でも有限」「波面集合の条件だけで状態が存在する」「くりこみ後の応力テンソルが一意」という結論にはしない。

## 直接必要な前提・依存と接続

| 既習側の正本 | 本PLANで使用する内容 | 未達の場合の扱い |
|---|---|---|
| [LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) | 時間向き付きLorentz多様体、零測地線、大域双曲性、測地的凸近傍、余接ベクトルの因果方向 | 局所座標・$1+1$次元模型から橋渡しし、一般論の仮定を先に明記 |
| [HPDE](../plan_done/DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md) | normally hyperbolic作用素、Cauchy問題、因果伝播子、Green作用素の支持・双解性 | 既出結果を実在するstable anchorで引用。超局所的特異性伝播の証明は新たに担当 |
| FOU・GPDE・分布／Fourier解析の既習章 | 試験関数、分布、局所化、Fourier変換、微分、Sobolev・弱解の必要部分 | 章ID・正確な定義・正規化を実装時に照合し、未導入語を暗黙前提にしない |
| 多様体・余接束・微分形式・Hamilton力学の既習章 | 余接束、余法束、正準シンプレクティック形式、Hamiltonベクトル場 | 読者が座標表示と幾何学的定義の対応を再現できるよう補題を配置 |
| 自由場の既習QFT／QM／AQFTの関連章 | smeared field、状態の正値性、二点分布、CCR、Klein–Gordon双解 | AQFT全系列を一律必修にしない。本PLAN内で二点分布に必要な最小限の公理を導入し、既習範囲を照合 |

前提の「PLAN名」は証明済みを意味しない。着手時に実在する `chapter.yaml`、`knowledge.yaml`、canonical stable anchorと依存関係を確認する。LORG・HPDE以外の章IDはここで推測固定しない。

**学修ルート:** LORG → HPDE → MICAの解析・Hadamard部分。AQFTは作用素代数側から接続する並行分岐で、MICA全講の一律必修ではない。MICAの後半から曲がった時空の自由場へ進み、MQFC IIの摂動的くりこみへは「分布の延長」という別問題を通じて接続する。

## 所有範囲・定義域と停止線

- **MICAが所有するもの:** $WF$の局所Fourier定義、座標不変性、分布の積・引き戻し条件、余法束、実主型作用素の特異性伝播、自由スカラー場のHadamard条件、局所Hadamard subtraction、Wick平方、点分離による応力テンソル期待値、局所共変な有限項の条件。
- **HPDEが所有するもの:** 大域的Cauchy問題、Green作用素、因果伝播子の構成。Hadamard展開という語が共通でも、HPDEの基本解の局所構成と、状態の二点関数に課すHadamard条件を同一視しない。
- **AQFTが所有するもの:** 局所代数net、Weyl代数・CCR/GNSの体系的構成、Type III、Tomita–Takesaki。MICAでは二点分布と正値性の必要最小限だけを扱う。
- **[MQFC I/II](DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)が所有するもの:** 相互作用の時間順序積を衝突対角へ**延長**するEpstein–Glaser型摂動的くりこみ。MICAの「Hadamard特異部分を引いて滑らかな差を**制限**する」手続きと区別する。
- **曲がった時空の物理状態・粒子検出・Hawking/Unruh効果:** 後続の物理的応用系列へ送る。一般の相互作用場・重力バックリアクションの存在証明、状態の一意的選択を本PLANの完成条件にしない。

基本舞台は、まず $\mathbb R^n$ 上のスカラー分布と滑らかな写像、次に時間向き付きの滑らかな**4次元大域双曲Lorentz時空**上の実自由Klein–Gordon場とする。次元を変えるとHadamard展開の対数項などが変わるため、4次元の公式を全次元に無条件で拡張しない。Fourier変換の符号、計量の符号、未来向き余接ベクトルの規約を本文の冒頭で固定する。

## 講義設計：証明依存に沿う候補テーマ

以下の MICA1–MICA15 は**候補ID**であり15講・15週のノルマではない。主要結果の証明を閉じるために一つのテーマを分割し、補題・演習回を追加してよい。逆に同じ中心問いで自然に連結するテーマは統合してよい。正式ID・講数は実装時に系列manifestと下流参照を照合して確定する。

### A. 特異性の「場所」から「方向」へ

1. **候補MICA1：分布の局所Fourier変換と滑らかさ。** $\chi u$ のFourier変換と局所化、急減少と $C^\infty$ の関係を両方向から説明する。試験関数の選び方、微分のFourier表示、コンパクト支持の役割を証明する。
2. **候補MICA2：錐領域での減衰。** 非零共変ベクトルと開錐、全方向での減衰と一方向での減衰を区別する。cutoffを縮めても評価が引き継がれる根拠を示す。
3. **候補MICA3：波面集合の定義と基本性質。** $WF(u)$、特異支持への射影、滑らかな関数との乗算、微分でWFが増えない性質を直接証明する。空なWFと滑らかさの同値を検証する。
4. **候補MICA4：手で計算するWF。** $\delta_0$、Heaviside関数、超曲面の$\delta$分布、片側境界値分布を少なくとも一つ。Fourierの符号・正負の周波数方向、振動積分の定常位相が効く範囲を分けて扱う。
5. **候補MICA5：座標変換・余法束。** 微分同相でのWFの余接変換、$N^*S$ の定義、局所的に $S=\{x''=0\}$ と書いたときの共変ベクトルの形を導出する。多様体上の定義の貼り合わせを説明する。

### B. 特異な分布を演算できる条件

6. **候補MICA6：分布の積。** $u\otimes v$ と対角引き戻しの関係から、$WF(u)$ と $-WF(v)$ が同一点で衝突しない条件を導く。滑らかな係数との積、片側境界値の積、$\delta^2$の困難を比較する。**条件は十分条件であり、満たさないから全ての意味で積が絶対に存在しないとは言わない。**
7. **候補MICA7：分布の引き戻し・制限。** 滑らかな $f:X\to Y$ に対するnormal set $N_f=\{(f(x),\eta):{}^t df_x\eta=0\}$ を定義してから $WF(u)\cap N_f=\varnothing$ の条件を扱う。部分多様体への制限、対角 $\Delta:M\to M\times M$、$N^*\Delta=\{(x,\xi;x,-\xi)\}$ を座標で再導出する。条件が成立する例・しない例を両方計算する。

### C. 波動方程式へ：特異性はどう伝わるか

8. **候補MICA8：擬微分作用素と主シンボル。** 微分作用素の記号から始め、symbol class、$\Psi^m$、楕円性、microlocal parametrixの最小限を構成する。$WF(Au)\subset WF(u)$ と楕円正則性の二方向の包含を仮定付きで扱う。
9. **候補MICA9：特性集合とHamilton流。** 主シンボル $p$、$\operatorname{Char}(P)=\{p=0\}\setminus 0$、Hamiltonベクトル場 $H_p$、bicharacteristicを座標から定義する。Klein–Gordonの主シンボル $p=g^{ab}\xi_a\xi_b$ と零測地線の射影を計算する。質量項は主シンボルに含まれないことを明示する。
10. **候補MICA10：特異性伝播。** $Pu\in C^\infty$、実主型、非零特性方向などの仮定を記した伝播定理へ進む。定係数波動方程式をFourier法で計算し、その後に正交換子法・擬微分演算の核心補題を段階的に証明する。一般定理を定理名だけで済ませず、完全証明に必要な補題が多ければ独立講へ分割する。

### D. 自由場とHadamard条件

11. **候補MICA11：自由場の二点分布。** smeared field、状態 $\omega$ の線形性・正値性・規格化、$\omega_2(f,h)$ の分布核、双解性と交換子の反対称部分を導入する。Minkowski真空の正周波数二点関数をモデルに、「正のエネルギー」と余接方向の向きの関係を計算する。Hadamard性と状態の存在・正値性は別条件とする。
12. **候補MICA12：局所Hadamard parametrix。** 測地的凸近傍、Synge世界関数 $\sigma$、$i0$境界値、輸送方程式で決まる局所係数 $U,V$、長さスケール $\ell$ を説明する。4次元の特異構造（概念的に $U/\sigma_+ + V\log(\sigma_+/\ell^2)$）と滑らかな状態依存項 $W$ を区別する。有限次の漸近切断だけで余りが自動的に $C^\infty$ になるとしない。
13. **候補MICA13：Radzikowskiの波面集合条件。** 自由Klein–Gordon場、4次元大域双曲時空、二点分布の双解性・CCR・正値性など使う仮定を固定する。$WF(\omega_2)$ が未来向き零共変ベクトルを零測地線に沿って結ぶ関係で与えられることを、符号規約込みで記述する。**局所Hadamard形との同値**について、平坦模型の導出、特異性伝播を使う方向、局所から大域への補題を分ける。原論文の準自由場等の射程を拡大しない。

### E. 点分離・有限な局所量・くりこみ自由度

14. **候補MICA14：対角制限の障害とHadamard subtraction。** $N^*\Delta$ を用い、Hadamard二点分布 $\omega_2$ のWFが対角余法束と交わるので**生の $\Delta^*\omega_2$ には引き戻し定理を適用できない**ことを確認する。同じKlein–Gordon作用素のHadamard二点関数どうしの差が滑らかになる理由を説明し、局所parametrix $H$ に対する $\omega_2-H$ の滑らかな対角制限からWick平方へ進む。状態依存部分と幾何学的な共通特異部分を分ける。
15. **候補MICA15：応力テンソル・局所共変性・総合演習。** 必要な双微分作用素、微分後の対角極限、曲率・平行移動、保存則を検証する。適切な局所幾何項の補正と、質量・曲率・計量に依存する保存的局所テンソルによる有限くりこみ自由度を分ける。$\ell$ の変更、trace anomalyの入口、Wald型公理の役割まで扱う。一般の相互作用理論への延長はMQFC IIへ接続する。

## 必須の数学・計算・証明ゲート

### 1. 超局所解析

- Fourier変換の正規化を固定し、$WF(\delta_0)=\{(0,\xi):\xi\ne0\}$ を定義から再導出する。Heaviside関数、$\delta_S$、片側境界値のうち少なくとも二つを独立に計算し、錐方向と特異支持を混同しない。
- 分布積条件と引き戻し条件を **十分条件** として証明・使用し、成立・不成立・条件不成立でも別の意味で積が定義できる場合を比較する。
- $N^*\Delta$ の導出、波面集合の座標変換、楕円正則性の適用対象と演算子の次数を確認する。

### 2. 伝播・Hadamard

- 主シンボル→特性集合→Hamilton方程式→零測地線の関係を、平坦時空と曲がった時空の局所座標で再導出する。
- 一般の伝播定理、Radzikowski同値定理を使う前に必要補題・仮定・その証明の所有講を列挙する。定係数模型だけの証明で一般定理を証明済みと称しない。核心補題が本文内に収まらなければ候補講を分割し、未証明のまま系列をcompletedにしない。
- 二点分布の $\omega_2(x,y)$ という略記を、点ごとの通常関数と誤読させない。正値性・CCR・双解性と、Hadamardという特異性の条件の役割をそれぞれ検証する。局所Hadamard形の正規化・$i0$処方・符号は使用する文献に合わせて本文で一貫させる。

### 3. 点分離・物理量

- **対角線上で二点関数を「そのまま評価」する課題にはしない。** 一般の引き戻し判定を実行し、何が失敗するかをまず示す。次に局所Hadamard subtraction後の滑らかな余りを引き戻す条件を示す。
- 同じ背景・同じ場の二つのHadamard状態の $\omega_2-\omega'_2$ を使い、少なくともWick平方の期待値差を計算する。微分を含む応力テンソルでは対角極限の前に双微分作用素を作用させ、保存性に必要な局所項を点検する。
- 有限値が出ること、局所共変性、保存性、状態の選択、スケール・有限項の選択は別の条件である。4次元自由スカラー場という設定と採用する公理を記さずに「唯一のくりこみ結果」としない。

## 演習設計（題数ではなく到達目標を覆う）

| 到達目標 | 必ず自力で解く課題 |
|---|---|
| WFを定義から読む | cutoffを含むFourier評価、$\delta_0$・HeavisideのWF、座標変換後の方向判定 |
| 演算の可否を判定する | $WF(u)$ と $-WF(v)$ の衝突、余法束計算、対角制限の成功例・失敗例 |
| 双曲方程式に接続する | $p$ と $H_p$、平坦波動方程式の特性曲線、$Pu$ の滑らかさと $u$ のWF |
| Hadamard条件を使う | Minkowski二点分布の正周波数方向、CCRとWFの区別、局所parametrixの特異項 |
| 物理量への出口を示す | $WF(\omega_2)\cap N^*\Delta$ の判定、滑らかな差の点分離、長さスケール・有限項の違い |

各実装章には現行DREAM THEATER規約に従い原則 Level A 4 / B 3 / C 1 以上と全詳細解答を置く。A4/B3/C1は下限であり、目的を覆うために必要なら追加する。数学的に未定義な式を「計算してみよう」と解かせず、正しく定義する条件の判定を問題にする。正規化・符号・添字・定義域・極限交換・積と制限の順序を詳細解答で再現可能にする。

## 執筆・査読・完了条件

1. **設計と実装を分ける。** 本変更はPLANの推敲であり、本文・series manifestを新設せず `plans/` にとどめる。実装を始めるときだけ `plans_progress/` へ移し、series manifestと直接参照を同時に更新する。
2. 各章で「なぜ必要か→最小例→定義→仮定付き定理→証明の核心→詳細解答」を実現する。初出の専門語はformal statementより前に導入し、既出定理の使用箇所から実在stable anchorへリンクする。
3. 主要定理の数学的射程を固定する。特に非特性的な引き戻しの**十分**条件、実主型の伝播、Hadamard同値の前提、くりこみ有限項の公理依存を査読する。
4. 新規・実質改稿した**当該章自身**の主要証明と全演習解答を再計算し、完成本文を別観点で再読する。別の完了章の追跡監査は**章IDを明示して依頼された場合のみ**行う（過去の一律「直前章追跡監査」は適用しない）。
5. 科目横断で前提の閉包、証明担当、記号規約、Hadamard／HPDE／AQFT／MQFCの責務、公開導線、全詳細解答を検証する。CI greenや候補テーマの消化だけではcompletedとしない。

## 校正用の標準教科書・原論文

次は**構成・適用条件・証明の照合先**であり、本文・演習を転載しない。執筆では各定理について参照箇所（章・節・定理番号）を実際に確認する。

1. Lars Hörmander, [*The Analysis of Linear Partial Differential Operators I: Distribution Theory and Fourier Analysis*](https://link.springer.com/book/10.1007/978-3-642-61497-2), 特に §8（WF、分布の引き戻し・積の定理）。**MICA1–7の基準**。
2. Lars Hörmander, [*The Analysis of Linear Partial Differential Operators III: Pseudo-Differential Operators*](https://link.springer.com/book/10.1007/978-3-540-49938-1), 擬微分演算と特異性伝播。**MICA8–10の証明補題の基準**。
3. Christian Bär, Nicolas Ginoux, Frank Pfäffle, [*Wave Equations on Lorentzian Manifolds and Quantization*](https://ems.press/books/esi/34), 第2–4章（局所Hadamard展開、Green作用素、自由場の量子化）。**HPDEとの境界・自由場の前提の照合先**。
4. Stephen A. Fulling, [*Aspects of Quantum Field Theory in Curved Spacetime*](https://www.cambridge.org/core/books/aspects-of-quantum-field-theory-in-curved-spacetime/D96D902C0432D20FA5F0CC75C5E93FE6), 第4章（二点関数）・第5章（応力テンソル）・第9章（応力テンソルのくりこみ）。**物理的動機・最小例の照合先**。
5. Robert M. Wald, [*Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*](https://press.uchicago.edu/ucp/books/book/chicago/Q/bo3684008.html), 自由場・Hadamard状態・応力テンソル。**MICA11–15の物理と公理の基準**。
6. Marek J. Radzikowski, [“Micro-Local Approach to the Hadamard Condition in Quantum Field Theory on Curved Space-Time”](https://doi.org/10.1007/BF02100096), *Commun. Math. Phys.* **179** (1996), 529–553。**WF条件とHadamard条件の同値の原論文**。
7. Stefan Hollands and Robert M. Wald, [“Local Wick Polynomials and Time Ordered Products of Quantum Fields in Curved Spacetime”](https://arxiv.org/abs/gr-qc/0103074), *Commun. Math. Phys.* **223** (2001), 289–326。**局所共変性・有限くりこみ自由度の条件確認**（摂動的時間順序積の本体はMQFC II）。
8. Romeo Brunetti, Klaus Fredenhagen and Michael Köhler, [“The Microlocal Spectrum Condition and Wick Polynomials of Free Fields on Curved Spacetimes”](https://arxiv.org/abs/gr-qc/9510056), *Commun. Math. Phys.* **180** (1996), 633–652。**microlocal spectrumと自由場Wick多項式の橋渡し**。

候補文献の証明が高次の道具を使う場合、参照を置くだけで完成扱いせず、必要な補題と導入順を本文側で確定する。
