# DREAM THEATER ローレンツ多様体上の双曲型PDE I（HPDE系列・全24講）

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

## 講義計画（**全24講：HPDE1〜HPDE24**）

**本PLANの執筆単位は24章に確定する。** 章IDは `HPDE1` から `HPDE24` を連番で使用する。平坦波動の具体計算、エネルギー法、局所基本解の構成、局所→大域への論証、Green作用素とexact sequenceを、証明機構の違いに合わせて分けた結果の24講であり旧15講からの増講枠ではない。章内の補題・例・演習の分量は必要に応じて増やす。後から新しい主要章が必要となる場合はPLANと下流のID参照を変更するが、**現時点で講数・章IDを未決定として着手を止めない。**

### 第I部：平坦波動と幾何学的作用素（HPDE1〜HPDE5、5講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| HPDE1 | 1+1次元波動方程式の初期値解 | d'Alembert公式を導き、初期変位・初期速度を代入検算し、因果的支持を計算する。 |
| HPDE2 | 高次元平坦波動とHuygens現象 | 3+1次元Kirchhoff型公式と伝播核の支持を調べ、空間次元・mass・曲率によるHuygens原理の成立範囲を分ける。 |
| HPDE3 | 時空上の分布・試験切断・密度 | 体積密度と分布の双対性、束値試験切断、支持Γ_cと微分作用素の形式的転置を定義して計算する。 |
| HPDE4 | ベクトル束・接続・形式的随伴 | 切断と束接続、作用素の局所表示、形式的随伴P*の積分恒等式を構成し、一般のPとP*が異なる例を示す。 |
| HPDE5 | 主シンボルとnormally hyperbolic作用素 | 主シンボルの符号と特性集合、波動作用素の接続+零次項表示、束の曲率と低階項の役割を計算する。 |

### 第II部：Cauchyデータとエネルギー法（HPDE6〜HPDE11、6講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| HPDE6 | Cauchy超曲面・初期データ・関数空間 | LORGの時間分割を用いて単位法線、誘導計量、初期値(u₀,u₁)・源f、滑らか/ Sobolevのデータ空間を定める。 |
| HPDE7 | エネルギー流と発散恒等式 | 乗数と応力エネルギー流を構成し、時空領域のStokes公式からエネルギー収支・境界項を導く。 |
| HPDE8 | エネルギー不等式と一意性 | 係数・スライスの条件を明示してGrönwall評価を導き、零データからの一意性と連続依存を示す。 |
| HPDE9 | 高階Sobolev評価と正則性の伝播 | 共変微分した方程式の交換子・高階エネルギーの中間式を計算し、滑らかな初期値からの正則性回復条件を示す。 |
| HPDE10 | 有限伝播と依存領域の評価 | 因果ダイヤモンドへのエネルギー積分から支持制約を証明し、LORGのD(S)・光円錐と比較する。 |
| HPDE11 | 局所Cauchy問題の存在 | 局所座標での波動系の還元・適切な近似構成を示し、non-characteristicな初期面・滑らかな係数で局所存在を証明する。 |

### 第III部：局所基本解から大域Green理論へ（HPDE12〜HPDE20、9講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| HPDE12 | Minkowskiの先進・遅延基本解 | デルタ源の方程式と支持条件を分布の意味で検算し、平坦模型でG_ret/G_advの区別を示す。 |
| HPDE13 | Hadamard係数とtransport方程式 | 局所parametrixの係数が満たす測地線上の輸送方程式を導き、初期条件・計量符号・特異支持を確認する。 |
| HPDE14 | 局所parametrixの誤差補正 | 局所近似逆と真の基本解を区別し、残差の正則性・補正操作・適用領域に必要な条件を追う。 |
| HPDE15 | 局所解から大域解への貼り合わせ | 因果的凸被覆・時間スライス・partition of unityを構成し、重なり上の一意性を利用する手順を明示する。 |
| HPDE16 | 大域Cauchy問題の存在一意性 | 大域双曲性と局所理論を結び、滑らかなコンパクト初期データと源に対する大域解の存在・一意性を証明する。 |
| HPDE17 | 大域安定性と因果的な解の支持 | 高階評価・連続依存・有限伝播を大域定理の仮定へ整合させ、非コンパクト初期データへの拡張境界を示す。 |
| HPDE18 | 遅延・先進Green作用素の構成 | Γ_c(E)→Γ(E)としてG_ret/G_advをCauchy問題から構成し、因果的支持包含を証明する。 |
| HPDE19 | Green作用素の恒等式と一意性 | PG±=G±P=idの作用域、一意性、形式的随伴のGreen作用素との関係を途中式付きで示す。 |
| HPDE20 | 空間コンパクト・時間的支持空間 | Γ_scと未来/過去コンパクト支持を区別し、Green作用素の延長の定義域・収束・因果的支持を検査する。 |

### 第IV部：因果伝播子・古典場・反例（HPDE21〜HPDE24、4講）

| 章ID | 章題 | この講で閉じる数学 |
| --- | --- | --- |
| HPDE21 | 因果伝播子とexact sequenceの核 | E_cau=G_ret−G_adv、PE_cau=E_cau P=0を示し、ker E_cau=PΓ_c(E)を支持の議論で証明する。 |
| HPDE22 | exact sequenceの全射性と切断 | Cauchy時間関数とcutoffを使い、空間コンパクト斉次解がE_cauの像に属することを証明し、列全体のexactnessを閉じる。 |
| HPDE23 | 実Klein–Gordon解のシンプレクティック構造 | 保存電流の発散零、Cauchy面積分の独立性・非退化性を証明し、E_cauからの双線形形式と照合する。 |
| HPDE24 | 反例・模型・AQFT/MICAへの橋 | 平坦massless/massive・時間依存計量・点除去・時間的境界の模型を検算し、Green存在・境界条件・自己随伴性の仮定と後続で必要な結果を整理する。 |

### 初回実装・講間依存

- **HPDEの最初の章は `HPDE1`**。既存の平坦波動方程式・偏微分と初期値計算を出発点とし、LORGの幾何は必要になった箇所から厳密な結果へリンクする。科目全体としてLORGを先行数学基盤とする。
- HPDE3〜5は分布・束・主シンボルの使用準備、HPDE6〜11はエネルギー法と局所存在、HPDE12〜17は基本解・大域解、HPDE18〜22はGreenとexactness、HPDE23以降は古典場と後続科目の受け渡し、という順を保持する。
- `textbook/plans/` に置くのは**本文未着手の状態**を示すためであり、24講の数・順序・章IDは決定済み。着手時はPLANを `plans_progress/` へ移動して系列manifestと必要な直接依存・公開導線を追加する。実在の前提結果とstable anchorのみを引用し、後続章の証明を前提にしない。

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
- HPDE1〜HPDE24の全24章と数学的証明閉包、科目内の横断依存・リンク・検証・公開導線が完成して初めてPLANをcompletedとする。現時点は設計段階であり、章ID・全24講の範囲は確定済みだが、manifest・本文公開は未着手である。
