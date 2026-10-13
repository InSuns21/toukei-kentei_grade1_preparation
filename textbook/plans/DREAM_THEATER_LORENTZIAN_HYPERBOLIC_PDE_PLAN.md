# DREAM THEATER ローレンツ多様体上の双曲型PDE I（HPDE系列・講数可変）

作成・分冊: 2026-10-11  
改訂: 2026-10-14（標準教科書・論文との範囲照合、局所→大域の証明系列と支持空間の補強）  
状態: planned（設計のみ。本文実装・公開は未着手）

## 中心問いと出口

平坦な波動方程式の解法を、曲がった時空上でどのように定式化し直すか。**幾何学的な双曲性・大域双曲性・エネルギー評価から、初期値問題の存在一意性、有限伝播、遅延/先進Green作用素、因果伝播子のexact sequenceまで**を、関数空間と支持条件を含めて導く。

出口は、滑らかな大域双曲時空上のベクトル束値normally hyperbolic作用素について、Cauchy問題・Green作用素の主定理を正しく述べ、その証明の局所→大域の核を再構成でき、実スカラーKlein–Gordon場の古典的なシンプレクティック解空間を構成できること。相互作用QFTや量子真空・Hawking放射そのものは扱わない。

## 前提・境界・設定

- 必須：[LORG](DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)の時間向き・因果集合・Cauchy超曲面・大域双曲性・滑らかな時間分割。[GPDE1–10](../plan_done/DREAM_THEATER_ENCORE_III_GRAD_PDE_RESTRUCTURE_PLAN.md)の分布・Sobolev・弱解、PDE I、FOU、EVOLの必要節を**実在章・stable anchorで確認して**再利用する。前提PLANの未実装結果を既知としない。
- HPDEが所有：滑らかなベクトル束と束値微分作用素の波動問題に必要な部分、normally hyperbolic作用素、エネルギー評価、Cauchy問題、有限伝播、局所/大域基本解、advanced/retarded Green作用素、因果伝播子、古典的実KG解のシンプレクティック構造。
- [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)が所有：波面集合、擬微分・伝播の微局所理論、Hadamard**二点関数**の特異構造、点分離と応力テンソル。HPDEでは局所基本解の構成に必要な**古典的Hadamard係数・transport equationの入口**だけを扱い、二点関数のHadamard条件は先取りしない。
- [AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)が所有：CCR代数・状態・モジュラー理論の精密な構成。HPDEの解空間は量子化に渡すデータであり、量子論としてのCCRの詳細は移さない。[QCURV](DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)は粒子数・Bogoliubov係数・量子状態・物理観測を所有。
- [GR](DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md)の非線形Einstein方程式の制約・ゲージ固定・最大Cauchy発展と、境界条件付き時空の一般理論はHPDEの本編から区別する。対称双曲系・Dirac型のGreen-hyperbolic作用素は必要に応じて発展節とし、normally hyperbolicに対する定理を無条件に流用しない。

**共通の正確な設定**：時空 (M,g) は時間向き付き滑らかなLorentz多様体（符号 (-,+,…,+)）、標準定理では大域双曲・境界なし。E→M は有限ランク滑らかな実/複素ベクトル束とし、接続・束計量・向きを必要な命題で指定する。微分作用素の記号の規約を固定し、基本模型は P=-Box_g+m²（m²≥0、Box_g=g^{ab}∇_a∇_b）とする。一般のnormally hyperbolic Pの2次主シンボルは σ₂(P)(x,ξ)=-g_x^{-1}(ξ,ξ) id_{E_x} と定義する（フーリエの i による符号流儀と混同しない）。形式的自己随伴性は一般のPに自動では成立しない。

## 比較した標準テキストと採否

| 文献 | 出版物の扱い | このPLANでの対応 |
| --- | --- | --- |
| C. Bär, N. Ginoux, F. Pfäffle, *Wave Equations on Lorentzian Manifolds and Quantization* (2007), ch. 1–3 | 予備事項→**局所基本解とHadamard展開**→**大域基本解・Green作用素・Cauchy問題**という構成 | 旧案の局所Cauchy解→大域解の間に基本解の構成・patchingの道筋を追加 |
| N. Ginoux, “Linear Wave Equations”, *Quantum Field Theory on Curved Spacetimes* (2009) | Lorentz時空上の線形波動方程式をQFT向けに解説 | 幾何と場の関数空間の橋渡し |
| H. Ringström, *The Cauchy Problem in General Relativity* (2009), ch. 5–12 | Sobolev埋込み→対称双曲系→線形・非線形波動→大域双曲性・一意性 | エネルギー法・正則性の確認、非線形Einstein問題との責務の境界 |
| C. Bär, “Green-hyperbolic operators on globally hyperbolic spacetimes” (2015) | normally hyperbolicより広いGreen-hyperbolic作用素と対称双曲系 | Dirac等への任意発展、Green作用素が存在するクラスの区別 |

参照：
- https://ems.press/books/esi/34/contents
- https://nicolas-ginoux.perso.math.cnrs.fr/waveeqandquantiz.html
- https://link.springer.com/book/10.1007/978-3-642-02780-2
- https://ems.press/books/esi/66/contents
- https://doi.org/10.1007/s00220-014-2097-7

**構成上の判断**：Bär–Ginoux–Pfäffleに合わせて「局所基本解/Hadamardの古典的入口→大域解」を証明上の主線に追加する。ただし一つの大定理を定義だけで済ませず、Minkowskiと局所模型で計算を閉じてから一般論へ進む。MICAの波面集合によるHadamard状態論までHPDEへ取り込まない。

## 学修構造：局所的な存在・評価から大域理論へ

以下は**章番号・講数を決めた一覧ではなく、証明で必要になる論点の束と依存順序**である。1項目を1講へ割り当てない。とくに局所基本解、エネルギー評価、正則性、Green作用素の構成は必要な補題・計算量に合わせて独立章へ分ける。正式な章ID・総章数・参照・manifestは、先行成果物の実在とproof closureを確認したうえで執筆着手時に確定する。

### A. 平坦波動から幾何学的な作用素へ

- **平坦波動の解と伝播**：1+1次元のd'Alembert公式と3+1次元のKirchhoff型公式、初期値の代入検算、Huygens原理の成立条件と空間次元・質量・曲率による差。
- **分布・密度・試験切断**：多様体上の試験切断、体積密度、分布・形式的転置、コンパクト支持 Γ_c と台の定義。Lorentz計量の符号と正の密度を区別する。
- **束上の接続と共変微分**：有限ランク束と滑らかな切断、束接続、束値微分作用素、局所表示、既存GPDE/EVOLの関数解析との接続。
- **主シンボルとnormally hyperbolic性**：2次主シンボル、作用素を接続＋零次項で表す分解、低階項、形式的随伴 P* と P の違いを例で示す。

### B. Cauchy問題を支える局所理論

- **初期面と関数空間**：滑らかなCauchy面、誘導計量、未来向き単位法線、(u₀,u₁)、源 f、非斉次問題、Sobolev・滑らかな初期値、支持の仮定。
- **エネルギー流とStokes**：乗数法と発散恒等式、エネルギーの面積分、境界項、時間依存計量の下での非保存性を導く。
- **一意性・連続依存・高階正則性**：Grönwall評価、零データ零源の一意性、高階Sobolevエネルギー、正則性の伝播と滑らかな解への移行の条件。
- **有限伝播と領域依存**：因果ダイヤモンドへのエネルギー法、法線流束の符号、支持の因果的包含をLORGの円錐・D(S)の定義から検算する。
- **局所Cauchy解の構成**：局所座標・対称双曲系への還元または積分構成、non-characteristic初期面、存在・一意性と貼り合わせの適用条件。

### C. 局所基本解から大域Cauchy問題・Green作用素へ

- **Minkowski基本解**：デルタ源、遅延/先進核の作用域・支持と、空間次元・massによる特異支持の相違を明示する。
- **局所parametrixの構成**：古典的Hadamard係数のtransport方程式、誤差項、局所的な近似逆と真正の基本解の違いを計算する。二点関数のHadamard条件はMICA。
- **局所解・基本解の補正機構**：誤差を除去する手順、局所エネルギー評価と初期値解法を適用する場所、正規近傍の制限を説明する。
- **局所から大域への貼り合わせ**：因果的凸被覆、時間スライス、partition of unity、重なりでの一意性を使い、大域双曲性が必要な一歩を特定する。
- **大域Cauchy問題**：滑らかなコンパクト初期値と源から、解の存在一意性・連続依存・因果的支持を証明し、非コンパクト初期データへ拡張する追加条件を分離する。
- **遅延・先進Green作用素**：G_ret, G_adv : Γ_c(E)→Γ(E)、P G_±f=f と G_± P f=f（f∈Γ_c(E)）、supp(G_ret f)⊂J⁺(supp f)、supp(G_adv f)⊂J⁻(supp f)。存在・一意性と作用域の違いを証明する。
- **因果伝播子とexact sequence**：E_cau=G_ret−G_adv、P E_cau=E_cau P=0、Γ_sc(E)と随伴関係を定義する。列
  Γ_c(E) --P→ Γ_c(E) --E_cau→ {u∈Γ_sc(E): Pu=0} → 0
  のker/im、Pの単射性、空間コンパクトな斉次解への全射性をそれぞれ示す。

### D. 支持条件の拡張・古典場・反例

- **支持空間と延長**：Γ_c・Γ_sc・過去コンパクト/未来コンパクト支持を分け、Green作用素の入力域の延長に必要な条件と、時間有界性・空間コンパクト性の違いを整理する。
- **実Klein–Gordon場の保存電流**：形式的自己随伴な実スカラー作用素で j^a(u,v)=u∇^a v−v∇^a u の発散零、ω_Σ=∫_Σ j^aν_a dΣ の面独立性、積分収束、非退化性、Green作用素による双線形形式を導く。量子化はAQFTへ引き渡す。
- **境界事例と反例**：massless/massive、静的/時間依存計量、除去点時空、時間的境界付き時空で、局所双曲性・大域双曲性・境界条件・Green存在の条件を切り分ける。
- **発展分岐との境界**：対称双曲系・Dirac型Green-hyperbolic作用素へ進む際に、normally hyperbolic専用の証明を流用できない箇所を確認する。非線形Einstein初期値問題はGR、量子二点関数の超局所的性質はMICAへ渡す。

## 支持空間・定理の精密化ゲート

- Γ_c(E) はコンパクト支持の滑らかな切断、Γ_sc(E) はあるコンパクトKについて支持が J(K)=J⁺(K)∪J⁻(K) に含まれる滑らかな切断。**解の支持は通常コンパクトではなく空間コンパクト**。過去/未来コンパクト・時刻方向有界など別の支持条件とは等置しない。
- G_ret, G_advの入力はまず Γ_c(E) とし、出力は一般に Γ_c(E) でない。演算子等式は定義域を表示する。PはGreen作用素を持つという仮定だけで自己随伴とは限らない。
- exact sequenceは大域双曲時空上のnormally hyperbolic P、適切な支持と滑らかさの下で証明し、冒頭の0→Γ_c(E) --P→… の単射性も別途一意性から導く。
- 波動作用素の主シンボルがLorentz計量の逆であることと、幾何の因果円錐・有限伝播の関係を主計算で示す。
- 一般の非大域双曲時空にretarded/advanced Green作用素を無条件に仮定しない。大域双曲でなくても特定の作用素・境界条件によって存在する場合は「存在しない」と断定せず、**一般定理が保証しなくなる**と表現する。
- 初期値の滑らかさとSobolev解・分布解は明示的に区別し、弱解から滑らかな解への格上げには正則性の仮定と証明を置く。

## 計算・証明・演習の必須ゲート

1. **平坦時空**：1+1 d'Alembert公式から初期値を代入して検算。3+1 massless模型でGreen核の支持を検算し、1+1・3+1のHuygens性の差を明確にする。
2. **エネルギーから一意性・有限伝播**：P u=fに乗数を掛け、発散恒等式→領域積分→境界項→Grönwallまでの中間式を省略しない。LORGの因果領域定義のどこを使うか特定する。
3. **局所→大域の存在**：局所parametrix/局所解の存在機構、誤差の解消、パッチの一致、大域的な時間分割の利用を分解する。Bär–Ginoux–Pfäffleの一般定理を結果先行にする場合は明記し、モデル証明だけを一般証明と偽らない。
4. **Greenとexactness**：P G_± = id、G_± P = id、P E_cau=E_cau P=0を作用域付きで示し、ker E_cau =PΓ_c(E) と im E_cau={Pu=0, u∈Γ_sc(E)} を別々に証明。後者の分解にはCauchy時間関数とcutoffを具体的に使う。
5. **KG保存電流**：∇_a j^a = u Box_g v − v Box_g u を計算し、KG方程式から零、StokesによるCauchy面独立性と初期値による非退化性を証明。束値の一般化には束計量と形式的自己随伴の追加条件を要求する。
6. **反例**：除去点時空・時間的境界などで「局所双曲性はあるが大域一意性/Green存在の一般定理の仮定が欠ける」ことを因果ダイヤモンド・未指定境界条件の具体例で確認する。

## 独習の構成・実装・完了条件

- 定義→直接例→主要定理（対象・仮定・結論）→2〜4手の省略なしの核心論証→演習A4/B3/C1以上と全詳細解答。証明に必要なformal adjoint、Stokes、束接続、微分幾何の記号は使用箇所で導入する。
- 図ではCauchy面、光円錐、ソースの支持、retarded/advancedの像、解の空間コンパクト支持を**異なる輪郭/線種**で識別し、座標と支持集合の包含式で照合する。SVGの図だけで存在定理や支持の包含を証明しない。
- 既出結果を援用する使用箇所へstable anchorリンクを付け、前提PLANが未完成なら証明済みと宣言しない。新規章・実質改稿は現行DREAM THEATER standardの区分Cに従って全主要証明・全演習/解答を再計算し、別観点で再査読する。**無指定の直前章追跡監査は行わない。**
- 全候補論点と必要な追加講、数学的証明閉包、科目内の横断依存・リンク・検証・公開導線が完成して初めてPLANをcompletedとする。現時点は設計段階であり、章ID・manifest・公開は未確定のまま。
