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

## 学修順序（HPDE1–HPDE15は仮テーマ番号）

**旧15項目は固定15講・15週ではない。** 必須論点の追加により一テーマを複数章へ分ける場合は、正式IDを着手時に定め、必要な下流参照を直す。15章へ詰め込んで核心証明を薄めない。

### A. 平坦時空の確実な計算と幾何学的場

1. **候補HPDE1：平坦波動方程式の復習と伝播の次元差**。1+1次元のd'Alembert公式、3+1次元のKirchhoff型公式、支持の広がり、Huygens原理の成立範囲（次元・質量・曲率に依存）。
2. **候補HPDE2：時空上の分布・密度・試験切断**。試験関数/束値試験切断、分布と形式的転置、体積密度、台、コンパクト支持 Γ_c、時空計量の測度に対する符号依存の注意。
3. **候補HPDE3：ベクトル束・接続・作用素・主シンボル**。束値切断、normally hyperbolicの定義、一般波動作用素を接続+零次項として表す分解、曲率/低階項の影響、形式的随伴 P* とPの相違。

### B. エネルギー法と局所問題

4. **候補HPDE4：滑らかなCauchy面と初期値の幾何**。誘導Riemann計量、法線 ν、初期値 (u₀,u₁)、非斉次源 f、時間分割 g=-βdt²+h_t、関数空間・支持を設定。
5. **候補HPDE5：応力エネルギー流とエネルギー恒等式**。スカラー/束値の場に対して発散と境界流を定義し、積分領域とStokesの仮定を示す。非静的時空ではエネルギーが一般に厳密保存しない。
6. **候補HPDE6：エネルギー不等式・一意性と連続依存**。Cauchy面上のエネルギー制御、係数の有界性とGrönwall評価、零データ零源から零解。正則性・Sobolev指数ごとの境界を明記。
7. **候補HPDE7：有限伝播速度・domain of dependence**。因果ダイヤモンド上の局所エネルギー法から支持制約を導き、伝播速度をgの光円錐と比較する。大域双曲性の仮定を不要なところまで強くせず、使うところでは明示する。
8. **候補HPDE8：局所Cauchy解の存在**。局所座標での波動/対称双曲系への還元または適切な積分構成、滑らかな係数・正則性・初期面のnon-characteristic条件、局所解の貼り合わせ可能性。既存EVOLとの役割分担を示す。

### C. 局所基本解から大域Green作用素へ

9. **候補HPDE9：Minkowski基本解と局所parametrix**。デルタ源、遅延/先進支持、偶奇空間次元の差。古典的Hadamard係数のtransport方程式と局所特異支持（全Hadamard二点関数条件はMICA）。局所近似解と正確な基本解の違い。
10. **候補HPDE10：局所から大域への構成**。正規近傍・局所解、因果的凸被覆、時間スライス・partition of unityによるpatching、エネルギー一意性で重なりの一致を確認。大域双曲性が何を保証するかを論理的に分離。
11. **候補HPDE11：大域Cauchy問題の存在・一意性・安定性**。大域双曲時空で滑らかなコンパクト初期データとコンパクト源を出発点に、解の存在一意性、因果的支持、連続依存をまとめ、適切な非コンパクトデータへの延長条件を区別する。
12. **候補HPDE12：遅延・先進Green作用素**。G_ret, G_adv : Γ_c(E)→Γ(E)、P G_±f=f と G_± P f=f（f∈Γ_c(E)）、supp(G_ret f)⊂J⁺(supp f)、supp(G_adv f)⊂J⁻(supp f)。存在・一意性の証明に使用する大域Cauchy結果を明記。
13. **候補HPDE13：因果伝播子とexact sequence**。E_cau=G_ret−G_adv（このPLANの符号規約を固定）、P E_cau=0、E_cau P=0、随伴関係、Γ_sc(E)の定義。exact sequence
   Γ_c(E) --P→ Γ_c(E) --E_cau→ {u∈Γ_sc(E):Pu=0} → 0
   の各段の核・像を証明し、先頭の0と全体の exactness を必要な定理として扱う。符号と定義域の不一致を禁止する。

### D. 古典場への出口と総合検証

14. **候補HPDE14：実Klein–Gordon場・保存電流とシンプレクティック形式**。実スカラーでPが形式的自己随伴である仮定から、j^a(u,v)=u∇^a v−v∇^a u の発散零、ω_Σ=∫_Σ j^aν_a dΣ の面独立性、空間コンパクト支持の積分収束、非退化性の証明。Green作用素からの双線形形式と照合し、CCRへ渡す。
15. **候補HPDE15：総合演習と失敗例**。Minkowskiのmassless/massive、時間依存計量・静的積時空、Minkowski点除去（非大域双曲）、時間的境界を持つ領域（境界条件が別途必要）を比較。Green作用素・支持・Cauchy一意性のどの仮定を欠くか切り分ける。

**分割時に独立章として増補する必須論点**：高階Sobolevエネルギーと滑らかさ回復、束値作用素の接続表示・随伴、局所基本解のtransport方程式と誤差項処理、Green作用素の関数空間の延長（過去コンパクト/未来コンパクト・空間コンパクトの区別）。これらを「HPDE15まで」という枠で削除しない。

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
