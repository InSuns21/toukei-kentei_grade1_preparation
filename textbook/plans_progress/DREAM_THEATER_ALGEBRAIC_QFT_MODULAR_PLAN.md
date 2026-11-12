# DREAM THEATER 代数的量子場理論・モジュラー理論（AQFT系列・全34講）

作成・分冊: 2026-10-11  
改訂: 2026-11-13（AQFT11の正エネルギー管領域解析性・一意性を実装）  
状態: in_progress（AQFT1–11本文・系列manifest・公開を実装。次講AQFT12–34と最終横断監査は未完了）

## 中心問いと出口

**時空領域ごとに観測可能な量を割り当てるだけで、因果性・真空・熱・情報の何を厳密に言えるのか。** 有限次元量子情報で使う「領域ごとのHilbert空間のテンソル分解」や密度行列は、連続体QFTの鋭い局所領域へそのまま持ち込めるとは限らない。そこで、**局所可観測量の代数netとその状態**を出発点に、次の問いを順に解く。

1. **局所性:** 時空領域の包含・空間的分離・Poincaré変換を、代数間の包含・可換性・自己同型でどう表すか。
2. **自由場からの構成:** Klein–Gordonの因果伝播子からWeyl代数・状態・GNS表現・局所von Neumann環をどう得るか。
3. **真空の驚くべき性質:** 正エネルギーと局所性の下でReeh–Schlieder性がなぜ生じ、局所環の型・テンソル分解に何が起こるか。
4. **モジュラー時間:** 巡回分離ベクトルからTomita作用素・モジュラー流・KMS条件をどう作り、特別なwedgeではLorentz boostとどう結び付くか。
5. **量子情報への出口:** Type III環で密度行列による部分系エントロピーが一般には使えないとき、相対モジュラー作用素・Araki相対エントロピー・split propertyで何を比較できるか。

本PLANは**Minkowski時空の実自由スカラー場を通し模型**とし、その上で一般の局所netの構造定理を仮定付きで学ぶ。全てのnetが自由場に由来する、あるいは一般の相互作用模型が既に厳密構成された、と仮定しない。ブラックホール熱力学・情報問題は応用先であり、重力理論の定理を本PLANで証明したと扱わない。

## 直接必要な前提・証明の所有先

| 既習側の正本 | 本PLANで必要なもの | 実装時の確認事項 |
|---|---|---|
| `QM5–8`、`OA3–5`、`VN1–7`（[QMOA系列manifest](../dream-theater-series/QMOA.yaml)） | 自己共役作用素・Stone定理・C*環・正汎関数とGNS・可換子・正規状態・factor分類の入口 | **GNSはOA5が所有**する。AQFTでは局所netへの適用と非同値表現の現象を扱い、一般定理を重複証明しない |
| `HPDE18–24`（[HPDE系列manifest](../dream-theater-series/HPDE.yaml)） | 先進／遅延Green作用素・因果伝播子・実Klein–Gordon解のシンプレクティック形式 | どの商空間上の形式が非退化かを照合してWeyl関係の符号へ接続する |
| `SREL`・[LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)の必要部分 | Minkowski因果構造・空間的分離・wedge・Lorentz boost | 最初は平坦時空に限定する。大域双曲性一般論は必要箇所にだけ接続する |
| `QFT4–6`、`QINF1–3/17/20`（[QFT](../dream-theater-series/QFT.yaml)・[QINF](../dream-theater-series/QINF.yaml)系列manifest） | 自由場・二点関数・Fock表現、有限次元のテンソル積・密度行列・相対エントロピー | 有限次元計算を比較模型に使うが、QFT・QINF全講を一律必修にしない |
| [MICA](../plan_done/DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md) | 曲がった時空でのHadamard状態、二点分布のmicrolocal条件 | **基本のMinkowski AQFTには全講を要求しない**。曲がった時空への拡張・局所共変性の発展課題で必要部分を指定する |

`OA/VN/QM`の一般結果、`HPDE23`のシンプレクティック形式、`QINF20`の有限次元量子相対エントロピーが既習側の正本。章IDがmanifest上で`completed`でも、対応する定理・定義がどのstable anchorにあり、どこまで証明されているかは**執筆着手時に実本文で確認**する。実在しない定理を既習扱いしない。

学修主線は **OA/VN・QM + HPDEの必要部分 → AQFTの局所netと自由場 → Reeh–Schlieder／局所環 → モジュラー理論 → 相対エントロピー**。QINFは有限次元比較、MICAは曲がった時空の発展分岐とし、両者の全科目を前提にしない。

## 対象・規約・canonical ownership

- **AQFTが所有:** Haag–Kastler型局所net、状態・表現と局所von Neumann環、無限自由度の非同値表現、Reeh–Schlieder、局所環の型の条件付き結果、split property、標準対からのTomita–Takesaki理論・KMS・Bisognano–Wichmann、相対モジュラー作用素とAraki相対エントロピー。
- **既存OA/VNが所有:** 一般のC*環・von Neumann環、GNS、作用素位相、極分解、factorと射影比較の基礎。AQFT固有の物理的適用と必要な追加補題だけを新たに証明する。
- **[MQFC I/II](../plans/DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)が所有:** Wightman／Schwinger／Osterwalder–Schrader再構成、構成的相互作用模型、Epstein–Glaser型の対角延長・摂動くりこみ。AQFTでは必要なWightman仮定を述べるが、その再構成定理は再執筆しない。
- **MICAが所有:** 波面集合、Hadamard条件、自由場の点分離・局所くりこみ。AQFTのquasifree状態の正値性・CCRと、MICAのmicrolocal Hadamard条件を別の要件として扱う。
- **QINFが所有:** Type Iの有限次元量子相対エントロピーとデータ処理。AQFTはType IIIを含む正規状態への拡張、局所環包含での単調性を所有する。重力双対・island・Page曲線の物理的議論はHOLO/BHIの正本に委ねる。

最初の厳密な舞台は、時間向きと計量符号を固定した**4次元Minkowski時空**、有界なdouble cone、非有界wedgeとその因果補集合、実自由Klein–Gordon場とする。一般の局所netに移る際は、領域族、含める公理、表現・状態、非有界場から有界Weyl作用素への移行を明記する。netのC*代数 $\mathfrak A(O)$ と、選んだ表現での $\mathcal M_\omega(O)=\pi_\omega(\mathfrak A(O))''$ を区別する。

以下を**一律の公理と見なさない**。

- 基本: isotony、Einstein局所性、Poincaré共変性。スペクトル条件、真空の存在・不変性・一意性、弱加法性等は、定理ごとに明記する追加仮定。
- time-slice、additivity、Haag duality、wedge duality、split property、nuclearity、局所factor性、Type III$_1$性は互いに異なる条件・結論。特に局所性からHaag dualityやsplit propertyは自動的に出ない。
- vacuumの巡回性と分離性、全代数の純粋性、局所環がfactorであることは別の主張。領域の非空な空間的補集合など必要条件を落とさない。

## 確定講義構成：全34講

**講義数は全34講（第I部10講・第II部7講・第III部10講・第IV部7講）と確定する。** 旧AQFT1–15と前版の19候補テーマは以下へ再編する。番号は**AQFT系列の通算講義番号**であり、実装開始時に系列manifestへ全34講をこの順に登録し、正式章ID・pathを照合する。これは34週・34時間という時間割ではない。講数は証明の自然な切れ目と独習者の再現可能性から定め、数合わせによる統合・引き延ばしをしない。AQFT1実装時に系列manifestへ全34講を登録し、AQFT1をcompleted、AQFT2–34をplannedとした。

### I. 局所netと自由場の構成（第1–10講、10講）

| 通算 | 講義題目・中心問い | 本文で閉じる主要構成・証明／直接例 |
|---:|---|---|
| 1 | **Minkowskiの領域と因果補集合**：局所性の「局所」とは何か | 計量符号 $(-+++)$、double cone・右/左wedge・因果補集合、包含と空間的分離を具体座標で判定。補集合と通常の集合論的補集合の差を確認 |
| 2 | **Haag–Kastler net**：因果関係を代数にどう移すか | isotony、Einstein局所性、Poincaré共変性の定義と各独立性。可換net／有限次元代数の小模型を実際に判定 |
| 3 | **状態・共変表現・正エネルギー真空**：何を追加仮定するか | 状態の引き戻し、共変GNS、平行移動の同時スペクトルと前方光円錐、真空の存在・不変性・一意性の違い。加法性・time-sliceは別条件 |
| 4 | **Klein–GordonのGreen作用素と試験関数の商**：方程式の零元をどう除くか | HPDE18–22の正本から $E=E_{\mathrm{ret}}-E_{\mathrm{adv}}$ などの符号を定義し、$C_c^\infty(M)/P C_c^\infty(M)$ と解空間の対応・核・支持を検算 |
| 5 | **因果伝播子とシンプレクティック形式**：空間的分離はなぜ可換性を生むか | HPDE23の非退化交代形式と試験関数商の式を照合し、$\sigma([f],[g])=0$ を因果支持から証明。商の代表元への非依存性 |
| 6 | **Weyl CCRと局所C*net**：非有界場から有界観測量へ | $W(F)W(G)=e^{-i\sigma(F,G)/2}W(F+G)$、$W(F)^*=W(-F)$ を固定。Weyl関係から可換子・isotony・局所性を証明。規則的表現とsmeared fieldを区別 |
| 7 | **quasifree状態と二点形式**：正値な状態をどう作るか | 共分散の対称部・CCRの反対称部・不確定性条件を実二次元模型で計算し、Weyl特性汎関数の正値性と規則性を示す。Hadamard条件は含まない |
| 8 | **Minkowski真空とFock二点関数**：一般構成が既習の自由場とどう一致するか | QFT4–6との符号・規格化照合、正周波数分解、二点関数、真空quasifree状態、Fock表現の一致を直接計算 |
| 9 | **GNSから局所von Neumann環へ**：何を弱閉包するか | OA5のGNSを適用し、$\mathcal M_\omega(O)=\pi_\omega(\mathfrak A(O))''$、局所性・可換子包含・正規状態を示す。C*netと表現依存のW*netを区別 |
| 10 | **無限自由度と非同値表現**：Stone–von Neumannはなぜ足りないか | 有限モードのユニタリ同値とvan Hove型の無限モード極限を比較し、どの極限で同値性が破れるかを追う。一般の相互作用理論の存在は仮定しない |

### II. 真空の局所構造（第11–17講、7講）

| 通算 | 講義題目・中心問い | 本文で閉じる主要構成・証明／直接例 |
|---:|---|---|
| 11 | **正エネルギーと解析性**：局所的な真空情報が全域に届く準備 | 平行移動のスペクトル条件からベクトル値分布の解析接続／一意性へ至る必要補題を証明。境界値、稠密な解析的試験ベクトル、仮定を明記 |
| 12 | **Reeh–Schlieder定理**：局所代数はなぜ真空を稠密に生成できるか | 採用する加法性・スペクトル・真空条件を固定し、直交ベクトルを零とする解析的一意性の証明を閉じる。正エネルギーだけではないことを検査 |
| 13 | **巡回性・分離性・局所性**：真空がseparatingになる条件 | 非空な空間的補領域の巡回性と局所性から分離性を証明。$\mathcal M(O')\subset\mathcal M(O)'$ の包含と等号の違いを確認 |
| 14 | **Haag双対性・wedge双対性・factor性**：どの等号が公理ではないか | 双対net、相対可換子、中心の意味を計算し、局所性・dual・factor・真空純粋性の非同値性を小模型で判定 |
| 15 | **Type I/II/III因子**：鋭い領域の部分トレースはなぜ危険か | VN7の射影比較から有限/無限射影とType IIIの定義を検算。Type III環には内在的な忠実正規半有限traceがないことと、周囲の $B(\mathcal H)$ での状態表示とを区別 |
| 16 | **split propertyと緩衝領域**：どこまでテンソル積的に分けられるか | $O_1\Subset O_2$ のType I中間因子と分離する表現を構成し、緩衝領域がある場合のテンソル積包含・独立性を導く。局所性だけでsplitを仮定しない |
| 17 | **splitの帰結とnuclearityへの入口**：独立な状態はどう延長されるか | splitの下で正規積状態の延長を証明。自由場での位相空間／エネルギー減衰の例を計算。nuclearity⇒splitの一般定理は採用する正確な仮定と文献を掲げた発展命題とし、この章の既証明結果には数えない |

### III. Tomita–Takesakiと幾何学的モジュラー流（第18–27講、10講）

| 通算 | 講義題目・中心問い | 本文で閉じる主要構成・証明／直接例 |
|---:|---|---|
| 18 | **標準対とTomita作用素**：$S_0(A\Omega)=A^*\Omega$ は意味を持つか | $\Omega$ の巡回・分離から定義域の稠密性、well-defined性、可閉性と閉包の構成を証明。可換子側の対応も構成 |
| 19 | **反線形極分解とモジュラー対象**：$J,\Delta$ はどう生じるか | 閉反線形作用素の極分解 $S=J\Delta^{1/2}$ と $S^2\subset1$ の関係を、定義域・核・稠密値域込みで証明 |
| 20 | **Hilbert–Schmidt標準表現の全計算**：有限次元では何が見えるか | 忠実な $\rho$ に対し $\Omega=\rho^{1/2}$、$S(X)=\rho^{-1/2}X^*\rho^{1/2}$、$J(X)=X^*$、$\Delta=L_\rho R_{\rho^{-1}}$ を行列単位から導出。自然表現との違い |
| 21 | **モジュラーHilbert環の準備補題**：有限次元計算のどこが一般化しにくいか | 左右乗算・可換子・解析ベクトル・閉包と解析的coreの必要補題を定義域に注意して証明。以後の一般定理に用いる補題を列挙 |
| 22 | **Tomitaの可換子定理**：なぜ $J\mathcal M J=\mathcal M'$ か | 第18–21講の補題を用い、左右の作用の閉包と可換子の両方向の包含を証明。有限行列での一致だけを一般証明としない |
| 23 | **Takesakiのモジュラー不変性**：$\Delta^{it}\mathcal M\Delta^{-it}=\mathcal M$ はなぜ成り立つか | 解析的coreを介した不変性・自己同型群・強連続性を閉じ、標準対に対する一般Tomita–Takesaki定理をここで完成 |
| 24 | **Gibbs状態とKMSの帯解析**：熱平衡はトレースなしで表せるか | $F_{A,B}(z)=\omega(\sigma_z(A)B)$ の帯 $0\leq\operatorname{Im}z\leq1$ を採用し、$\sigma_t(A)=\rho^{it}A\rho^{-it}$ と境界条件 $F(t+i)=\omega(B\sigma_t(A))$ を有限行列で証明。物理時間との符号変換を固定 |
| 25 | **一般モジュラーKMS定理**：Type IIIにも熱的時間はあるか | 解析的元の稠密性、境界条件の連続延長、標準対に対するKMS性を一般形で証明。$-\log\Delta$ と $-\log\rho$ を同一視しない |
| 26 | **Rindler wedgeとboostの解析性**：$2\pi$ はどこから来るか | 右wedge、boostのrapidity、自由スカラー場の二点関数の解析接続を直接検算。計量 $(-+++)$ とモジュラー流の向きを整合 |
| 27 | **Bisognano–Wichmann（自由スカラー場）**：モジュラー時間はいつ幾何学的か | 一粒子標準実部分空間・第二量子化を介する自由場の核心証明を閉じ、採用規約で $\sigma_t=\operatorname{Ad}U(\Lambda_W(-2\pi t))$ を照合。一般Wightman場での定理は原論文の仮定付き紹介にとどめる |

### IV. 局所環の型・相対モジュラー理論・情報（第28–34講、7講）

| 通算 | 講義題目・中心問い | 本文で閉じる主要構成・証明／直接例 |
|---:|---|---|
| 28 | **局所Type III$_1$性の適用境界**：どの模型でどの型になるか | Type III$_1$・Connes不変量の定義と、wedgeのモジュラースペクトルの具体計算を区別。double coneのType III$_1$性・hyperfinite性・普遍性はYngvason等に依拠する**条件付き発展定理**であり、自由場のwedge計算から全局所環へ無条件には推論しない |
| 29 | **相対Tomita作用素**：二つの状態の順序をどう固定するか | 忠実な正規状態 $\rho,\sigma$ と標準形で $S_{\sigma\mid\rho}(A\rho^{1/2})=A^*\sigma^{1/2}$、$\Delta_{\sigma\mid\rho}=L_\sigma R_{\rho^{-1}}$ を導き、定義域・随伴・向きを検算 |
| 30 | **Araki相対エントロピーの有限次元還元**：何を比較しているか | $S(\rho\Vert\sigma)=-\langle\rho^{1/2},\log\Delta_{\sigma\mid\rho}\,\rho^{1/2}\rangle=\operatorname{Tr}\rho(\log\rho-\log\sigma)$ を非可換な $2\times2$ 例で再導出 |
| 31 | **非忠実状態・支持射影・無限値**：$\log0$ をどう扱うか | 支持 $s(\rho)\leq s(\sigma)$ の条件と不成立時の $+\infty$、正規汎関数の標準形への拡張・極限を扱う。Araki I/IIの定義の射程を混同しない |
| 32 | **相対エントロピーの正値性**：Type IIIで何が残るか | 忠実状態からの非負性・一致時の零条件をoperator convexity等の必要補題とともに導き、支持極限へ拡張。有限次元QINF20の証明を一般形の代わりにしない |
| 33 | **部分環制限と単調性**：局所情報は捨てると増えないのか | $\mathcal N\subset\mathcal M$ に対する相対Tomita作用素の比較、収縮写像・作用素単調性を用いたAraki単調性の核心証明、非忠実の場合の近似を段階化。必要な解析補題が閉じなければ未完了扱い |
| 34 | **同一自由場模型の総合演習と次の理論**：net・真空・流・情報をつなぐ | Weyl net→GNS→Reeh–Schlieder→wedge modular flow→二状態の相対情報を同じ記法で検証。splitの緩衝領域と鋭い境界を比較。DHR・局所共変AQFT・MICA・HOLO/BHIは次科目への導線 |

### 証明責務と意図的な到達境界

- **本系列の核として証明する:** 自由場の局所netと状態、Reeh–Schlieder（採用したnetと明記した仮定の下）、巡回性から分離性への推論、splitの**定義からの**テンソル積的帰結、一般標準対のTomita–Takesaki定理、一般モジュラーKMS、自由スカラー場のBisognano–Wichmann、相対モジュラー作用素の有限次元計算、Araki相対エントロピーの非負性・部分環単調性（必要補題を含む）。
- **仮定と文献を添えるが「証明した」に含めない:** 任意のnetに対するsplit、nuclearity⇒splitの一般判定定理、あらゆる局所環のType III$_1$性・hyperfinite性、任意の相互作用Wightman理論のBisognano–Wichmann、DHR再構成、曲がった時空の局所共変性。これらを学修目標の主要定理として証明する方針に変更する場合は、先に新たな補題と講義を明示し、講数を見直す。
- **証明の循環を避ける:** 局所Type III$_1$性の説明に第27講のwedge結果を用いるため第28講へ置く。ただしwedgeの型からdouble coneの型は直ちには出ない。第11–12講では第18講以降のモジュラー理論を仮定しない。第32–33講は有限次元結果だけからの無根拠な一般化をしない。
- **記法の固定:** $E=E_{\mathrm{ret}}-E_{\mathrm{adv}}$ と $\sigma$ の符号をHPDE本文と突き合わせ、Weyl位相を第6講で固定。$\sigma_t=\operatorname{Ad}\Delta^{it}$、相対作用素の添字は $\sigma\mid\rho$、相対エントロピーは $S(\rho\Vert\sigma)$ と固定。KMS解析帯・右wedge boostの符号は第24・26・27講をまたいで直接計算する。

### 図の予定配置（設計のみ）

| 講 | 図と数学的役割 | 静的／動的の判断 |
|---|---|---|
| 1–2 | 光円錐、double cone、右/左wedge、因果補集合、2領域の包含と空間的分離 | 静的SVG。境界線は実線・破線でも識別 |
| 4–6 | Green作用素の因果支持、試験関数商→シンプレクティック空間→Weyl net | 静的SVG。矢印に数学的写像名を近接表示 |
| 13–14 | 局所代数と可換子、dualityでのみ等号となる包含 | 静的包含図。包含と等号を区別 |
| 16–17 | $O_1\Subset O_2$ のcollarとType I中間因子 | 静的SVG。鋭い境界と緩衝領域を明示 |
| 20–23 | Hilbert–Schmidt空間の左乗算／右乗算と $J,\Delta$ | 静的交換図。行列例を本文と対応 |
| 26–27 | Rindler wedge内のboost軌道、rapidityとモジュラー時間 | 静的SVGを基準とし、パラメータ・符号の理解を改善する場合だけ任意のSVGアニメーション |
| 29–33 | 相対モジュラー作用素の向きと局所包含に伴う情報の単調性 | 静的可換図／包含図。$S(\rho\Vert\sigma)$ の順序に注意 |

図を実装する際は [執筆規約](../DREAM_THEATER_AUTHORING_STANDARD.md) のSVG・可読性・実レンダリング規約に従う。色だけに意味を持たせず、負の時間・boost方向・境界の位置を図中文字と近接ラベルで判読可能にする。図は本PLAN更新では生成しない。

## 必須の定義・計算・証明ゲート

| 主眼 | 執筆・査読で実際に確認すること |
|---|---|
| 局所netとCCR | 2つの領域の包含・空間的分離を座標から判定し、Weyl積の位相因子、$\sigma(f,g)=0$からの可換性、GNS下での局所包含を計算する。場の非有界性とWeyl作用素の有界性を混同しない |
| 状態と表現 | 二点形式の正値性・CCR反対称部分・規則性を有限モードで確かめる。有限自由度と無限自由度で表現の一意性の射程が変わる理由を示す |
| Reeh–Schlieder | 正エネルギーから解析性へ至る主要補題と局所稠密性の論理を再導出し、分離性は局所性と補集合側の巡回性を**別の段階**で使う。一般定理に必要な補題が未証明なら、章を分割して解消する |
| Type III・split | Type I・IIIの射影比較を例で確かめ、Type III$_1$性の**十分な仮定**と一般netの公理を分ける。splitのType I中間因子を導入してから「緩衝領域つきの独立性」を説明する |
| Tomita–Takesaki | $B(\mathbb C^2)$のHilbert–Schmidt表現で $S,J,\Delta,\sigma_t$ を行列単位から再計算し、一般の $S_0$ の定義域・閉包・反線形極分解と $J\mathcal M J=\mathcal M'$・モジュラー不変性の証明を分離せず閉じる |
| KMS・wedge | 採用した時間・計量・boostの符号に沿ってKMS帯条件と $2\pi$係数を直接検算する。Bisognano–Wichmannの定理を使う場合は模型・共変性・真空・領域などの仮定と証明済み範囲を記す |
| 相対エントロピー | $2\times2$の忠実な密度行列（必要なら非可換な組）で相対モジュラー作用素と $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ を一致させ、支持が含まれない場合の無限値を判定する。一般の単調性は追加補題まで閉じる |

**証明の扱い:** Reeh–Schlieder、一般Tomita–Takesaki、Bisognano–Wichmann、局所環のType III$_1$性、split property、Araki単調性は**それぞれ別の定理**であり、前提・一般性・証明コストが異なる。有限次元模型の検算、自由場での特別な証明、一般定理の完全証明を明示的に分ける。学修目標の主要定理を一般形で教えるなら核心証明に必要な補題の所有講を確定し、重い証明を「標準的」の一語で省略しない。完全証明を提供できない一般形は、証明済み到達目標に含めず、仮定・文献・未解決の証明負債を明記した発展紹介へ下げる。

## 演習設計：概念の差を自力で使う

| 到達目標 | 必須の演習課題の型 |
|---|---|
| netの公理を読む | double cone・wedgeの包含と空間的分離、isotonyと局所性を満たす／破る小模型、dualityを追加公理とする理由 |
| 自由場を構成する | $HPDE23$の交代形式→Weyl関係の交換位相→局所可換性、有限モードのquasifree状態・GNS計算 |
| 真空の非古典性を説明する | cyclicとseparatingの違い、補集合から分離性を導く証明、Type IとType IIIで不可能になる操作 |
| モジュラー対象を計算する | Hilbert–Schmidt空間の行列単位から $S,J,\Delta$、$\rho^{it}A\rho^{-it}$、忠実でない場合の失敗 |
| 熱と幾何をつなぐ | Gibbs状態のKMS境界条件、wedge boostのパラメータと温度の正規化、一般領域への誤った拡張の反例判定 |
| 相対情報を扱う | 非可換な $2\times2$ 密度行列の相対エントロピー、部分環への制限、splitの緩衝領域の役割 |

各実装章には現行規約に従い、理由付き例外がなければ **Level A 4 / B 3 / C 1以上**と全詳細解答を置く。A4/B3/C1は下限であり、核心の仮定・計算・反例・複数概念の接続が不足すれば必要なだけ追加する。無限次元の一般定理を有限次元の数値例だけで「証明した」問題・解答にしない。

## 校正に使う標準教科書・講義ノート・原論文

以下は**テーマの選択、定理の適用条件、証明の所在の照合先**。実際の執筆時は参照する版の章・節・定理番号まで確認し、本文・演習を転載しない。

1. Rudolf Haag, [*Local Quantum Physics: Fields, Particles, Algebras*](https://link.springer.com/book/10.1007/978-3-642-97306-2)。局所net・局所性・熱状態・モジュラー自己同型・superselectionの古典的な主線。**A–Cの基本設計**。
2. Christopher J. Fewster and Kasia Rejzner, [*Algebraic Quantum Field Theory -- an introduction*](https://arxiv.org/abs/1904.04051) (2019)。GNS・非同値表現・単純なnet模型・スペクトル条件・Reeh–Schlieder・split・局所環の型・超選択セクターを演習付きで扱う。**A–Bと初学者への説明粒度**。
3. Masamichi Takesaki, [*Theory of Operator Algebras II*](https://link.springer.com/book/10.1007/978-3-662-10451-4)。モジュラー自己同型・非可換作用素環の一般論。**Cの定義域・証明の厳密性**。
4. Stephen J. Summers, [*Tomita–Takesaki Modular Theory*](https://arxiv.org/abs/math-ph/0511034) (2005)。モジュラー作用素と物理応用の短い整理。**Cの導入順、一般定理と応用の境界**。
5. Ola Bratteli and Derek W. Robinson, [*Operator Algebras and Quantum Statistical Mechanics II*](https://link.springer.com/book/10.1007/978-3-662-03444-6)。KMS条件と平衡状態の数学的扱い。**KMSの解析的定義と符号・正規化の照合先**。
6. Jakob Yngvason, [*The Role of Type III Factors in Quantum Field Theory*](https://arxiv.org/abs/math-ph/0411058) (2005)。局所Type IIIの物理的意味と成立範囲。**Bの過剰一般化防止**。
7. Edward Witten, [*Notes on Some Entanglement Properties of Quantum Field Theory*](https://arxiv.org/abs/1803.04993) (2018)。局所環・量子もつれ・モジュラー理論の理解。**splitと情報の比較模型**。
8. Huzihiro Araki, [*Relative Entropy of States of von Neumann Algebras*](https://ems.press/journals/prims/articles/2800), *Publ. RIMS* **11** (1976), 809–833、および[第II論文](https://ems.press/journals/prims/articles/2844) (1977)。相対モジュラー作用素・相対エントロピーと非忠実状態の射程。**Dの定義・支持条件の原典**。

9. Daniele Guido, [*Modular theory for the von Neumann algebras of Local Quantum Physics*](https://arxiv.org/abs/0812.1511) (2008)。自由Bosonの第二量子化とBisognano–Wichmannの証明導線。**第26–27講の一粒子標準部分空間・第二量子化**。
10. Joseph J. Bisognano and Eyvind H. Wichmann, [*On the Duality Condition for a Hermitian Scalar Field*](https://doi.org/10.1063/1.522605), *J. Math. Phys.* **16** (1975), 985–1007、および[*On the Duality Condition for Quantum Fields*](https://doi.org/10.1063/1.522898), *J. Math. Phys.* **17** (1976), 303–321。**自由scalarと一般Wightman場の仮定・結論の境界**。
11. Kasia Rejzner, [*Algebraic Quantum Field Theory*](https://arxiv.org/abs/2610.37904) (2026)。自由スカラー場、局所構造、split、測定・情報・相互作用への近年の総説。**第1–17講と発展分岐の新しい照合先**。
12. Rainer Verch, [*Lecture Notes on Operator Algebras and Quantum Field Theory*](https://arxiv.org/abs/2507.00900) (2025)。モジュラー理論、Bisognano–Wichmann/Borchers、局所共変QFTと熱・地平線への接続。**第18–27講と応用の境界**。

一般のwedgeにおける幾何学的モジュラー作用、DHR再構成、局所環のType III$_1$を各々一般定理として採る場合は、上記の概説だけで完結させず、採用する**模型・仮定に対応する原論文・証明補題**を実装章の参照表へ追加する。

## 執筆・査読・完了条件

1. **設計と実装を混同しない。** 全34講の講数・順序は本PLANで確定した。AQFT1–5の章本文・series manifest・公開導線を実装したので、本PLANは`plans_progress/`へ移動した。AQFT12–34と系列横断監査は残るため、全PLANを完了扱いしない。
2. 最初に`chapter.yaml`/`knowledge.yaml`の直接prerequisiteと実在stable anchorを確認する。初出専門語はformal statementより前に通常文と直接例で導入し、既習定理の実際の使用箇所から根拠リンクを付ける。
3. 各章で**動機→定義の直接例→仮定付きの定理→証明の核心→演習・全詳細解答**を閉じる。作用素の定義域、位相、支持、二点関数の正値性、factorの型の追加条件、相対エントロピーの向き・支持条件を重点監査する。
4. 新規・実質改稿した**変更章自身**の主要証明と全演習解答を再計算し、完成本文を別観点で再読する。**別の完了章の追跡監査は明示的な章ID指定があった場合だけ**行い、過去の「直前章の一律追跡監査」は適用しない。
5. 最後に同一自由場模型・記号の一貫性、証明依存、MICA/MQFC/QINF/HOLOとの所有境界、文献照合・全詳細解答・公開導線を横断査読する。候補テーマを消化したことやCI greenだけをもって`completed`としない。
