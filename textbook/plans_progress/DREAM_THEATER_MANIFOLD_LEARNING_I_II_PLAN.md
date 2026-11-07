# DREAM THEATER 多様体学習 I・幾何的深層学習 II（MFL1〜MFL43）

分冊: 2026-10-11  
改訂日: 2026-11-08（MFL12のLaplace–Beltramiへの橋まで執筆）
状態: in_progress（MFL1〜MFL12 完成、MFL13〜MFL43 は未実装）

## 0. 中心問いと具体的な講義規模

- **多様体学習 I（MFL1〜MFL21）**：高次元の有限点群から低次元幾何の何を推定できるか。接空間・内在次元・測地距離・Laplace–Beltrami作用素の推定を、標本、ノイズ、密度、境界、スペクトル収束の仮定まで含めて導く。
- **幾何的深層学習 II（MFL22〜MFL43）**：群作用・頂点の付け替え・座標系の変換を尊重するモデルをどう数学的に構成し、何を表現でき、何を原理的に識別できないか。有限群、GNN、E(n)/SE(3)、多様体の場、ゲージ等変性を一続きの問いとして扱う。

**執筆予定章を MFL1〜MFL21（21章）・MFL22〜MFL43（22章）、計43章に決定する。** これは主要定義・証明・数値実験・演習を独習で再現できるまとまりから決めた章数であり、**15講・15週・90分×15回の制約は一切ない**。43章も上限やノルマではない。実装時に数学的に妥当な分割・統合が必要なら、PLAN・series manifest・直接参照を同時に改訂して変更する。旧15候補テーマは範囲棚卸しとして吸収し、着手時に1テーマ＝1講へ機械的変換しない。

## 1. 標準教科書・原著との比較（2026-11-03照合）

| 比較文献 | 照合した主題 | 改訂への反映 |
|---|---|---|
| John A. Lee & Michel Verleysen, *Nonlinear Dimensionality Reduction* (Springer, 2007) | 内在次元、距離保存と位相保存、手法比較 | MFL6/08〜11/20〜21：幾何を推定する目標と可視化評価を区別 |
| Benyamin Ghojogh et al., *Elements of Dimensionality Reduction and Manifold Learning* (Springer, 2023) | PCA/MDS、Isomap、LLE、Laplacian法、確率法、UMAP | 古典法の目的関数、行列構成、退化・識別不能性を個別の章で証明。PPCA/VAE一般論はML正本 |
| Tenenbaum, de Silva & Langford, *Science* (2000); Roweis & Saul, *Science* (2000) | Isomapの測地距離、LLEの再構成重み | MFL9/10：局所近似の成立条件とshortcut・特異近傍の反例 |
| Belkin & Niyogi, *Neural Computation* (2003), *JCSS* (2008) | Laplacian Eigenmaps、点群からLaplace–Beltramiへの極限 | MFL11〜MFL14：有限graph変分問題とcontinuum極限を分離して計算 |
| Coifman & Lafon, *Applied and Computational Harmonic Analysis* (2006) | diffusion maps、密度正規化、diffusion distance | MFL15/16：normalization・drift・Markov時間の違いを明示 |
| García Trillos & Slepčev, *Applied and Computational Harmonic Analysis* (2018) | graphエネルギーの変分収束、spectral clustering一致性 | MFL18/19：離散円周の完全証明と一般収束の追加要件を区別 |
| Aamari & Levrard, *Annals of Statistics* (2019) | reach、接空間・曲率・多様体の非漸近推定 | MFL3〜MFL6：定量化した標本/ノイズ仮定と不識別 |
| Bronstein, Bruna, Cohen & Veličković, *Geometric Deep Learning*（著者公開教材と2021年proto-book） | 群、格子、グラフ、幾何的グラフ、ゲージの統一 | 幾何的深層学習 II を対称性・表現力・局所フレームの一貫した構成に再編 |
| Xu et al., *How Powerful are Graph Neural Networks?* (2019) | 近傍集約の1-WL型識別限界 | MFL31：具体的な区別不能例を証明 |
| Cohen et al., *ICML* (2019); Satorras et al., *ICML* (2021) | gauge-equivariant CNN、E(n)-equivariant GNN | MFL35/18〜21：群変換・frame変更の等変性を式と計算で検証 |
| Singer & Wu, *Vector Diffusion Maps and the Connection Laplacian* (*CPAM*, 2012) | scalarのdiffusion mapsから接ベクトル場・connection Laplacianへの拡張 | MFL39〜MFL42：frame間の輸送が必要な理由を小規模離散例から示し、単なるscalar graph filterと分離 |
| McInnes, Healy & Melville, *UMAP*（原著、2018） | 局所近傍のfuzzy構造と低次元表現の最適化 | MFL20：近傍構成・cross-entropy・低次元距離の意味を分離し、位相保証へ飛躍しない |

参考文献の確認先:
- https://link.springer.com/book/10.1007/978-0-387-39351-3
- https://link.springer.com/book/10.1007/978-3-031-10602-6
- https://doi.org/10.1126/science.290.5500.2319
- https://pubmed.ncbi.nlm.nih.gov/11125150/
- https://doi.org/10.1162/089976603321780317
- https://www.sciencedirect.com/science/article/pii/S0022000007001274
- https://doi.org/10.1016/j.acha.2006.04.006
- https://www.sciencedirect.com/science/article/pii/S106352031630063X
- https://arxiv.org/abs/1705.00989
- https://geometricdeeplearning.com/book/
- https://arxiv.org/abs/1810.00826
- https://proceedings.mlr.press/v97/cohen19d.html
- https://proceedings.mlr.press/v139/satorras21a.html
- https://doi.org/10.1002/cpa.21395
- https://arxiv.org/abs/1802.03426

**主要設計判断**：

1. 多様体学習 I を次元削減アルゴリズムの羅列で終えず、何を推定するか・どの距離を保つか・どの作用素に収束するかを中心に構成する。
2. 「点ごとの作用素整合性」「二次形式の収束」「固有値/固有空間の収束」「クラスタ分割の一致性」は異なる結論。前段から後段への無条件な飛躍を禁止する。
3. 幾何的深層学習 II はGNN実装と群畳み込みだけでなく、表現限界、ベクトル/テンソル変換、局所ゲージ変換、メッシュ離散化誤差まで扱う。
4. 科目横断の既存正本を参照し、図や実験だけで証明の代用をしない。

## 2. canonical owner・直接前提と停止線

| 数学対象 | canonical owner／現行状態 | MFL側が所有すること |
|---|---|---|
| LA/RA、固有値・SVD・多変数微分 | 完成済みの該当章を実装時に確認 | PCA、MDS、近傍行列の数値問題への適用 |
| 滑らかな多様体、接空間、接続、曲率、群作用 | GEO/LIEの実在する該当章 | 観測点群・雑音・標本密度の下での幾何推定 |
| graph Laplacian、Cheeger、random walk、固有空間摂動 | **完成済みSGT1〜SGT8**。[SGT PLAN](../plan_done/DREAM_THEATER_SPECTRAL_GRAPH_THEORY_PLAN.md)、series/SGT.yaml | 点群上で得たgraphからcontinuumへ近似するための条件と誤差 |
| Laplace–Beltrami、熱半群・熱核・manifold Sobolev | **GA1〜GA9 completed**。[幾何解析GA PLAN](../plan_done/DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md)、[GA系列manifest](../dream-theater-series/GA.yaml) | GA1の座標表示、GA4のスペクトル、GA5の熱半群を必要箇所から参照。点群による統計的推定の誤差はMFLで新たに証明 |
| 確率・集中・有限標本上界 | 基礎確率、HDPの実在する該当章 | サンプルの測度モデル・核平均のbias/variance・幾何回復 |
| 予測・NN・逆伝播・PCA・検証一般論 | **ML1-01〜21・ML2-01〜25 completed**。[ML1/ML2 PLAN](../plan_done/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)、[ML系列manifest](../dream-theater-series/ML.yaml) | 数理アルゴリズムと学習一般論はMLの実在定理へ接続し、MFLでは幾何推定・等変構成・失敗条件を新規所有 |
| SO(3)の一般表現論、Peter–Weyl、主束一般論 | GEO/LIE、LREP/GBGなど実在する完成章を確認 | MFL22〜MFL43 では有限群、SO(2)、低階ベクトル表現と局所frame計算を直接閉じる。一般大定理の無証明引用は禁止 |
| 非線形PDE、情報幾何、物理モデルの解法 | GPDE/GA/IG/PMLの該当正本 | 幾何データ・等変性・数値誤差の検証への接続のみ |

**入口を過剰に重くしない**。MFL1〜MFL4はLA/RA・基礎確率・GEOの必要部分から始められる。MFL5以降のPCA・近傍法にはML1の必要章、SGTはgraph章から、GAは連続作用素章から利用する。MFL22〜MFL24の群作用・有限表現はNN未習でも学べるが、**MFL25以降で学習層を構成する段階ではML2-13/14/16の必要結果に明確に依存する**。後半の各章に前半全21章を一律必修としない一方、場・mesh章はGEO/GAや前半の必要結果も明示する。

### 2.1 機械学習I/IIとの章別依存（ML PLANとの双方向の責務境界）

[機械学習I/IIの現行PLAN](../plan_done/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md) と [ML系列manifest](../dream-theater-series/ML.yaml) を基準にした**具体的な設計依存**を次に固定する。2026-11-03時点でML1-01〜21・ML2-01〜25は**すべてcompleted**。GA1〜GA9もcompletedである。ただし系列statusは個々の定理・定義・stable anchorの存在証明ではない。以下の「主要前提」は必要な内容に対応する章IDであり、執筆時にはその章のchapter.yaml/knowledge.yaml・実際の本文証明・stable anchorと直接prerequisiteを確認する。

| MFL側（導入章・利用章） | 対応するML章 | 利用する数学・手法 | 必須とする時点・重複を防ぐ境界 |
|---|---|---|---|
| MFL1〜MFL4 | ML1-01（学習問題・標本） | データ生成・標本/母集団の区別 | **概念的な接続**。MFL1の幾何的標本モデルは基礎確率から自立して導入可能。ML1全体を開始前提としない |
| MFL5、MFL8 | **ML1-19**（PCA・SVD） | 中心化、Gram/covariance、主成分・低ランク近似 | PCAの一般原理はML1-19または完成済みLAの同内容を参照。MFLは**局所接空間の推定誤差**・幾何への適用だけを新規所有 |
| MFL6〜MFL7 | **ML1-11**（k近傍・核密度） | kNN、半径/bandwidth、近傍探索、密度の概念 | ML1-11の一般算法とMFLのreach・幾何被覆・グラフ近傍を区別。既習のkNN定義を使用箇所でリンクし、幾何近傍と統計近傍の違いを説明 |
| MFL20 | **ML2-01**（KL）、**ML1-09/10**（最適化） | t-SNEのKL損失、確率重み、勾配学習・反復 | KLの数学は完成済みINFOの該当結果でも代替可能。最適化の一般定理はML/OPTを参照し、MFLは可視化目的・非保存例を扱う |
| MFL21 | **ML1-12**（検証分割・モデル選択）、必要に応じML1-21 | train/test、パラメータ調整、分布シフト | 一般的検証法はML、幾何推定の誤差指標・対照点群はMFL |
| MFL22〜MFL24 | ML2-13（後続への接続） | 等変性の問題設定、有限群と有限表現 | **NNの前段となる数学**なので、ここでML2-13のニューラルネット結果を無条件必須としない |
| MFL25、MFL29 | **ML2-13**（多層perceptron） | 層の合成、特徴・活性化、集合NN | 有限群平均・置換等変層の**証明**はMFL、新規NNの一般構成はML |
| MFL26〜MFL28 | **ML2-16**（CNN・平行移動等変） | 離散畳み込み、padding、stride、重み共有 | ML2-16の**平行移動の証明**から有限群畳み込み・等質空間・steerable層へ拡張し、単なるCNNを再執筆しない |
| MFL30〜MFL33 | **ML2-13/14**（NN・逆伝播）、SGT | message/aggregate/updateと学習可能な写像、スペクトル | GNNの置換等変性・1-WL限界・oversmoothingはMFL所有。**一般の微分・自動微分の証明はML2-14** |
| MFL34〜MFL37 | **ML2-13/14**、学習実験にはML2-15 | E(n)等変座標更新・計算グラフ、学習の最適化 | 厳密な等変性はMFLの群変換から証明し、訓練・逆伝播の一般手順はMLから引く |
| MFL38〜MFL42 | **ML2-13/14**、GEO/GAの直接必要章 | 多様体場/mesh上の学習可能な線形層・局所frame | 接続・ゲージ変換の幾何はGEO/GA、層構成とgauge-equivarianceはMFL、一般NN/backpropはML |
| MFL43 | **ML1-12、ML2-15** | 訓練/検証、seed、正則化、比較実験 | 通常NNとの公平な比較と、等変残差・幾何的帰納バイアスの効果の切り分け。MLのモデル評価一般論は重複所有しない |

**実装時の判断**：ML・GAは完成済み系列なので、MFLは必要な結果の本文・証明・stable anchorを利用できる。ただし「ML/Ga完成」を一般の幾何学習の有限標本保証、graph spectral convergence、gauge-equivarianceの証明と取り違えない。GA1/4/5は連続作用素の幾何・スペクトル・熱の正本、MFL13〜MFL19は**ランダムな点群からその作用素へ近づく統計的証明**の所有者である。もし必要なML/GA定理が該当本文に実在しなければ、(A) canonical ownerを局所修正するか、(B) MFLの証明を自足する有限模型に限定し、その根拠を章冒頭に明記する。未証明の一般主張は採らない。


### 2.2 幾何・標本・学習の三つの主張を分離する

| 主張の種類 | 代表的な対象 | 新たに必要となる仮定と証明 |
|---|---|---|
| 決定論的な幾何 | 滑らかな $M$ 上の距離、接空間、$L_g$、熱半群 | GEO/GAの既出定義・定理を確認。ここには標本誤差はまだない |
| 標本からの推定 | $\widehat T_{n,\varepsilon}$ が $T_\varepsilon$ や $L_g$ を近似 | 標本密度の下界、独立性、帯域、正規化の分母、確率界、境界とノイズ |
| 表現/学習 | 埋め込みが距離・近傍を保存する、GNNが等変である | 距離・固有空間の近似にはspectral gap等が必要。等変性の代数的証明と汎化・識別力は別 |

**頻出する誤接続**：局所PCAが接線を推定することは大域Isomapの測地距離を保証しない。$T_\varepsilon f\to f+\varepsilon c\Delta_gf$ を固定滑らかな$f$について示しても、固有関数全体やクラスタ分割の収束は直ちに従わない。有限グラフでGNNが頂点置換等変であっても、異なるグラフを識別できるとは限らない。

**数学的な試験ケース**：同じ円周で(1)均一点群、(2)一部に偏る密度、(3)半径が近い二重円、(4)正の固定観測ノイズを比較し、どの段階の仮定が失われるかを明示する。これはMFL3〜MFL19の共通反例系列として使える。曲率の大きさとreachの小ささは同値でない。

### 採用する標準模型と記法

多様体学習 I では、滑らかなコンパクト埋め込み多様体 $M\subset\mathbb R^D$、内在次元 $d<D$、標本点 $X_1,\dots,X_n$ が体積測度 $dV_g$ に関する密度 $p$ から独立同分布、とする章を標準模型にする。定理ごとに境界なし・連結性、$0<p_{\min}\le p\le p_{\max}$、曲率・reach、密度の滑らかさ、ノイズ模型 $Y_i=X_i+\xi_i$ の条件を明記する。

ambient次元 $D$、内在次元 $d$、出力埋め込み次元 $m$、点数 $n$ を区別する。kernelの二乗距離のbandwidth $\varepsilon$ と幾何的半径 $\sqrt{\varepsilon}$ を取り違えない。continuumの $\Delta_g=\operatorname{div}_g\nabla_g\le0$、$L_g=-\Delta_g\ge0$ をGAの符号と揃え、finite graph上の $L$、Markov作用素 $P$ との等式・正規化を固定する。固有ベクトルの符号・多重固有値内の回転不定性を明示する。

幾何的深層学習 II では $G$ の入力/出力表現を $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ とし、
$$
\Phi(\rho_{\mathrm{in}}(g)x)=\rho_{\mathrm{out}}(g)\Phi(x)
$$
を等変性の定義とする。augmentationと数学的等変性、global群作用と局所frameの変更は別。$E(n)=O(n)\ltimes\mathbb R^n$ は鏡映を含むが $SE(3)=SO(3)\ltimes\mathbb R^3$ は含まない。スカラー・ベクトル・擬ベクトル・テンソルの変換型を明示する。

## 3. 多様体学習I：章別の執筆・証明責務（21章）

| 章ID | 主題 | 本文で必ず再構成できる証明・計算・反例 |
|---|---|---|
| MFL1 | 多様体仮説・観測標本の数学模型 | 曲線・円・トーラスの $D,d,m$ と標本密度を定式化、noiseの支持集合反例 |
| MFL2 | 内在/外在幾何・接空間と埋め込み | 円弧/螺旋のchord・測地距離・接平面の局所展開、GEOへの適用リンク |
| MFL3 | Reach・曲率・近傍の識別可能性 | 円のreach・最近点射影・遠隔部分のshortcut例、曲率と自己接近の区別 |
| MFL4 | 密度・標本被覆・観測ノイズ | 有限被覆とunion boundによる標本近接の確率評価、固定ノイズ・不均一密度の失敗例 |
| MFL5 | Local PCAと接空間推定 | 局所covarianceの主成分、曲率bias・eigengap・sample noiseの角度評価 |
| MFL6 | 内在次元・曲率の推定 | 小球の質量の $r^d$ 則とlog-slope、局所PCA/近傍比、境界・密度のbias |
| MFL7 | 近傍グラフの構築 | radius/kNN/mutual kNN・対称化・零次数/非連結とshortcut、SGT結果への適用 |
| MFL8 | Classical MDS・線形基準モデル | 距離二乗の二重中心化からGram行列、負固有値・Euclid距離の復元 |
| MFL9 | Isomapと測地距離 | 最短路距離→MDS、円弧の経路長誤差、近すぎる遠隔枝のshortcut反例 |
| MFL10 | Locally Linear Embedding | 重み制約 $\sum_jw_{ij}=1$ の最小二乗、特異局所Gramの正則化、$(I-W)^T(I-W)$ の核 |
| MFL11 | Laplacian Eigenmaps | graph Dirichlet energyと固有値緩和をSGTから導出し、次数正規化・孤立点を検討 |
| MFL12 | Laplace–Beltramiへの橋 | GA1の座標式・Green公式とGA4のスペクトルを使用箇所から参照し、円周・球面の計量/体積・符号を再計算。再掲と新規のgraph推定を区別 |
| MFL13 | Kernel積分作用素のbias | 固定点・内部・境界なしの正規座標Taylor、Gaussian偶奇モーメント・密度/体積展開。$O(\varepsilon)$主項とremainder、$p$の正則性を明記 |
| MFL14 | Kernel標本平均のvariance・集中 | 独立なtest点でのkernel標本平均とsample点でのleave-one-outを区別。分母の非零・有限標本variance、$n,\varepsilon$同時極限の十分条件 |
| MFL15 | 密度補正・極限generator | row normalizationと $\alpha$-correctionで密度由来のdriftが残る条件・消える条件を計算 |
| MFL16 | Diffusion Mapsと熱の幾何 | finite Markov作用素の固有分解、diffusion distanceと時間、GA熱半群との一致条件 |
| MFL17 | 境界・adaptive近傍・density shift | 区間端で切断Gaussian積分を計算し$O(\sqrt\varepsilon)$の片側項を確認。反射・Neumann・Dirichletの境界条件は算法ごとに区別 |
| MFL18 | 円周の離散→連続スペクトル | 等間隔周期差分Laplacianの固有値とFourier固有ベクトルを厳密計算、固定波数極限 |
| MFL19 | spectral consistencyへ必要な橋 | 点wise作用素整合性≠固有空間収束の反例。周期1Dで補間・二次形式・compactness/min–maxの模型証明を閉じる。高次元一般定理は追加仮定・証明範囲を明示し、無証明で完成したとは称しない |
| MFL20 | t-SNE・UMAPと可視化の意味 | t-SNEの条件付き近傍確率とKL、UMAPの対称化した近傍重みとcross-entropyを**異なる目的**として計算。trustworthiness/continuityと偽のcluster分離例 |
| MFL21 | near-manifold・stratified data・横断実験 | 交差線、二重螺旋、Swiss roll、外れ値で全手法を比較、仮定・推定誤差・失敗を総括 |

**多様体学習 I の停止線**：任意の層化空間での特異Laplacian、一般random graphでの固有関数一様評価、reach/minimaxの完全一般理論、一般Gamma収束の全証明を単章へ無条件に詰め込まない。採用するなら必要な新たな証明章・直接prerequisiteを追加する。点wise一致からスペクトル・クラスタ一致への飛躍は禁止。

## 4. 幾何的深層学習II：章別の執筆・証明責務（22章）

| 章ID | 主題 | 本文で必ず再構成できる証明・計算・反例 |
|---|---|---|
| MFL22 | 幾何的帰納バイアスと不変/等変 | 可換等式・変換前後の予測、augmentationとの違い |
| MFL23 | 群作用・軌道・安定化群 | 有限群のorbit–stabilizerと商空間で失う情報の具体例 |
| MFL24 | 群表現・intertwiner・特徴型 | 有限次元行列表現と線形等変写像の交換条件、有限群の分解例 |
| MFL25 | 不変化・等変層の構成原理 | 有限群平均、等変層の合成・非線形性が等変性を保つ条件 |
| MFL26 | 格子対称性と群畳み込み | 循環・二面体群のconvolutionの等変性、padding/strideが壊す例 |
| MFL27 | 等質空間とstabilizerの核制約 | 有限 $G/H$ 上の群作用とkernelの制約を添字で証明 |
| MFL28 | 円周Fourier・SO(2)の低次表現 | $\sin,\cos$ の回転表現、周波数モード・steerable kernelを直接計算 |
| MFL29 | 集合・点群の置換対称性 | pooling・DeepSets型の有限例、置換不変/等変の証明と限界 |
| MFL30 | Graph message passing | message/aggregate/updateの頂点再ラベル等変性を全層帰納法で証明 |
| MFL31 | GNNの表現力・1-WL | 6-cycleと三角形2個の和など同一初期特徴で区別不能な具体例と条件 |
| MFL32 | Graph spectral convolution | $p(L)$-filter・Chebyshev近似・固有空間の有限計算、SGT理論の正本を参照 |
| MFL33 | Oversmoothing・長距離ボトルネック | lazy diffusionのspectral decayでfeature collapse、oversquashingとは別であることを例証 |
| MFL34 | 幾何的グラフと不変量 | 距離・角・相対位置の直交変換則、O(n)とSO(n)の違い |
| MFL35 | E(n)等変GNN座標更新 | $(x_i-x_j)$ と不変scalarを用いる更新で平行移動・回転・鏡映の等変性を直接証明 |
| MFL36 | E(3) / SE(3)とchirality | 内積・外積・signed volumeの変換、鏡像を区別できない場合の反例 |
| MFL37 | Steerableなベクトル/テンソル特徴 | 低階回転表現、型を守る線形作用・非線形性、成分混合の誤実装 |
| MFL38 | 多様体上のscalar fieldと作用素 | chart pullbackと基本スペクトルフィルタの座標独立性を限定模型で証明 |
| MFL39 | 接ベクトル場とchart/frameの変更 | 基底変更・成分変換の逆向き関係、球面局所例で接続が要る理由 |
| MFL40 | Gauge変換・moving frame | 局所frameを取り替えたときの特徴・kernel変換則を添字で計算 |
| MFL41 | Gauge-equivariant convolution | 隣接frame間の輸送を含むconvolutionの等変性を有限メッシュで検証 |
| MFL42 | Mesh離散化・幾何数値安定性 | mesh細分化・frame変更・離散輸送の誤差を計測し理論上の等変性と区別 |
| MFL43 | 分子・物理・点群の統合実験 | 通常NN/GNNと幾何的等変層の比較、剛体運動/鏡映・座標frameの対照、学習/計算量の監査 |

**幾何的深層学習 II の停止線**：全Lie群の表現分類・Peter–Weyl一般証明、任意のGNNのuniversality/汎化保証、非コンパクト多様体での一般ゲージ理論、物理方程式の数値解の厳密性を前提なしに含めない。必要なら既存の正本へ接続するか、明示的な新章を設計する。


### 4.1 幾何的深層学習で証明すべき「等変」と「識別」の差

1. **群作用/型**：特徴の表現 $\rho(g)$ を固定し、スカラー・極ベクトル・軸ベクトルを同じ型として扱わない。特に反射 $Q$ で外積は $(Qu)\times(Qv)=\det(Q)Q(u\times v)$。回転だけの実験ではE(3)等変性を確認したことにならない。
2. **局所座標/frame**：$e'_a=e_bR^b{}_a$ と変えたとき、同じベクトル場の成分は逆向きに変換する。離散的な辺の輸送行列も両端で対応する変換が必要。局所frameを各頂点でランダムに回し、出力が正しく変換する検算を含める。
3. **graph近傍集約**：permutation-equivarianceの帰納法は、同型頂点への再ラベルと特徴の追従を仮定する。一方1-WLとの比較は、同じ初期特徴・同じ反復回数・aggregationの制約をそろえる。大域情報を持つ追加特徴や高次メッセージ法まで不可能とはしない。
4. **幾何的識別**：距離のみを入力するE(n)不変模型は鏡像対を区別できない。signed volumeはSO(3)不変だがO(3)不変でない。入力対称性・出力表現・タスクの真の対称性を先に宣言する。
5. **連続/離散の差**：有限メッシュでの厳密な変換等変性、メッシュ細分化時の離散化一致性、学習済み模型のテスト精度は別の3条件。数値誤差を「近似的な理論証明」とは呼ばない。

MFL39〜MFL42の補助的な接続として、Singer–Wuのvector diffusion maps/connection Laplacianを比較例に用いる。一般の主束理論を先取りするためではなく、**なぜ辺にscalar weightだけでなくframe間の輸送が要るか**を有限メッシュから説明するためである。

## 5. 読順と前提関係

~~~text
LA/RA・基礎確率・GEO（必要部分）
      ↓
MFL1〜MFL4   統計的幾何模型（基礎確率/GEOから開始）
      ↓
ML1-19 → MFL5〜MFL6（局所PCA・内在次元）
      ↓
ML1-11 + SGT1〜8 → MFL7〜MFL11（graph・埋め込み）
      ↓
MFL12〜MFL19   GAの必要部分・kernel極限・spectral consistency
      ↓
ML1-09/10/12・ML2-01（またはINFOのKL）
      ↓
MFL20〜MFL21   可視化とnear-manifoldの総合検証

群作用・有限表現 → MFL22〜MFL24（NN不要な数学導入）
      ↓
ML2-13 → MFL25（等変層）
      ↓
ML2-16 → MFL26〜MFL28（group convolution）
      ↓
ML2-13 → MFL29（集合NN）
      ↓
ML2-13/14 + SGT → MFL30〜MFL33（GNNと表現力）
      ↓
ML2-13/14 → MFL34〜MFL37（E(n)/SE(3)等変層）
      ↓
ML2-13/14 + GEO/GA → MFL38〜MFL42（manifold field・gauge）
      ↓
ML1-12 + ML2-15 → MFL43（対照実験）
~~~

上図は読順であり、**全前講を各章の直接prerequisiteに機械的追加しない**。各chapter.yaml/knowledge.yamlは証明に必要な直接結果を所有する実在章・stable anchorから確定する。MFL30のpermutation equivarianceにMFL19の一般spectral convergenceは不要。**GA1〜9とML1/2の全章はcompleted**だが、MFL12以降・MFL38以降は必要なGA/ML本文の個別定理・stable anchorと使用条件を確認する。完成済みの連続作用素の定理は、標本から作用素が収束することを自動保証しない。

## 6. 章別数値実験・対話シミュレーション

**静的SVGや録画フレームのアニメーションを、動く数値実験と称しない。** 入力変更→アルゴリズムの再計算→新しい計算結果の表示を必須とする。証明を数値結果だけで済ませない。理論中心の章はPythonラボ、操作によって理解が変わる実験はブラウザで動く対話型計算を優先する。

| 実験群 | 主な対象 | 操作する量 | 実際に計算・比較する量 |
|---|---|---|---|
| 局所幾何ラボ | MFL3〜MFL6 | 点数、近傍半径、noise、曲率、密度 | 接平面角度、推定次元、bias–variance、near-self-intersection |
| 古典埋め込み法 | MFL7〜MFL11/20 | kNN/radius、Isomap/LLE/Laplacian/MDS、可視化hyperparameter | 最短路、固有分解、再構成誤差、trustworthiness/continuity、非連結の失敗 |
| kernel・連続極限 | MFL12〜MFL19 | $n,\varepsilon,\alpha,p$、円周・区間 | 作用素誤差・boundary bias・固有値・subspace angle・収束率 |
| 群作用・格子・集合 | MFL22〜MFL29 | 入力回転/鏡映/置換、層・kernel | 等変残差、paddingによる破れ、通常NNとの比較 |
| GNN表現力 | MFL30〜MFL33 | graph、層数、近傍集約、seed | 1-WL区別不能例、層が深いときのfeature collapse、長距離依存 |
| 幾何的GNN・ゲージ | MFL34〜MFL42 | 剛体移動、鏡映、局所frame、mesh細分化 | 等変残差・鏡像の区別・離散輸送誤差・計算量 |
| 横断ベンチマーク | MFL21 / MFL43 | train/test分割、seed、真の対称性の有無、noise | 推定誤差・予測誤差・等変誤差・計算時間と失敗条件 |

対話UI・Workerプロトコル・実験記録は[共通シミュレーション基盤](../plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md)を実装済み範囲で利用し、数値核はMFLで所有する。基盤PLANの進捗・パスは着手時に再確認する。UI未実装時は動くPythonラボを別成果物として追加し、対話体験が完了したとは称しない。

**再現可能性**：合成データの真の生成模型・$D,d,p$・noise分布・乱数seed・分割・bandwidth・固有値solver・数値閾値・評価指標を保存。固有ベクトルの符号/縮退時の基底回転にはsubspace distance/Procrustes整列を使う。円周Fourierと有限群の厳密値を単体テストにし、離散化誤差・浮動小数誤差と理論的対称性違反を分ける。成功例だけを残す恣意的なseed/近傍の選択は禁止する。

## 7. 演習・詳細解答と重点査読

変更章には理由付き例外がない限り**Level A 4題、B 3題、C 1題以上**を全問の詳細解答とともに置く。これは下限であって目標値や上限ではない。主要なlearning objectiveが不足するなら問題を足す。問題数だけの水増しは禁止する。

最低限、系列を通じて独習者が紙上で検算する項目：
- 円の接線・曲率・chord/geodesic差・reach、局所PCAの角度。
- 被覆確率、kernel平均のbias/variance・bandwidth同時極限の十分条件。
- 小規模グラフのMDS/LLE/Eigenmapsと零固有値・正規化。
- 密度補正による極限driftと、円周周期差分の固有値/固有空間収束。
- t-SNE/UMAPの近傍目的と連結性・距離保存を混同しない反例。
- 有限群平均・畳み込み・graph message passingの等変等式を添字から導出。
- 1-WLの区別不能な有限graph、lazy diffusionのfeature collapse。
- EGNNの平行移動/回転/鏡映の検算、signed volumeのchirality反例。
- 球面局所frameの変更とベクトル成分、gauge-equivariant kernelの変換則。

**重点的に排除する誤り**：
1. ノイズが一定なのに標本を増やせば必ず真の多様体を回復できる、と断定する。
2. reach/曲率/密度下界なしでEuclid近傍が測地近傍を近似すると断定する。
3. kernelの正規化係数、bandwidth二乗、$\nabla\log p$ によるdrift、境界項を省略する。
4. graph operatorの点wise一致だけでeigenfunctionやclusteringの一致を結論する。
5. 可視化の離れたclusterを元の連結成分と同一視する。
6. GNNの頂点置換等変性を任意のグラフ構造の識別可能性と取り違える。
7. E(3)とSE(3)、接ベクトルと座標成分、global回転とgauge変更を混同する。

各新概念の動機→通常文による導入→formal definition→条件を確認する直接例→定理・仮定→核心証明→反例→演習・詳細解答という導線を守る。定理の適用対象、点、scale、添字、主要中間計算を記載し、prerequisite外の2〜4手を丸投げしない。**実際に既出結果を援用する本文・見取り図・証明・詳細解答のその使用箇所**から実在するcanonical stable anchorへリンクする。

## 8. series manifest・実装・完了ゲート

1. MFL1 の着手に伴い PLAN を textbook/plans_progress/ へ移動し、実在する完成章のみを公開索引へ登録する。未執筆章の本文・metadata は作らない。
2. 着手前にGitHub上の本PLAN、SGT.yaml、**完成済みML・GAの系列manifestと必要なchapter.yaml/knowledge.yaml・本文stable anchor**、直接必要なGEO/LA/RA/HDP、知識DAG、MFL1〜MFL21・MFL22〜MFL43のID衝突を確認する。
3. MFL1 の実装と同じ作業単位で MFL.yaml を作成し、manifest の plan 参照を plans_progress/ の新パスへ合わせる。PLAN を二重配置しない。
4. manifestの上から連続するcompletedの次の最初のplannedを進め、完了時には**MFLのmanifestだけ**を更新。common routingへ単一active seriesを置かない。
5. 新章はDREAM_THEATER_AUTHORING_STANDARDの変更区分Cに従い、全主要証明・全演習/詳細解答の出発点からの再計算と別観点再読を行う。局所数学変更は区分Bの波及先、表示のみの変更は区分Aの意味内容同値・レンダリング確認を使う。
6. 章別の演習/knowledge/concept/KaTeX/proof-formal/Pages link・実表示と実験テストを変更範囲に応じて検証する。global-impact変更はfull validationへ昇格。CI成功だけで数学的完成と判定しない。
7. 多様体学習 I の完了は局所推定→graph→continuum極限→spectral模型→失敗診断、幾何的深層学習 II の完了は対称性→等変層→GNN限界→E(n)→gauge/meshまで、主要定義・証明・演習・対照実験を独習者が再構成できることで判定する。
8. 系列横断で直接依存・stable anchor・公開導線・章ID・数値ラボを確認し、残タスクゼロの場合にのみPLANを plan_done/ へ**移動**しmanifestのplanを同時更新する。
9. **別の完了章の追跡監査は章IDを明示したユーザー依頼があるときだけ**。通常の新章着手に「直前完了章の追跡監査」を自動追加しない。

**章数到達、形式的marker、未確認の一般定理、CI greenだけを完了証拠とはしない。**

## 9. 実装進捗（2026-11-07）

- **MFL1 completed**：多様体標本模型、次元・密度・支持・独立標本の欠落確率、観測ノイズと識別不能性。主要命題4件と A4/B3/C1 の詳細解答を実装。
- **MFL2 completed**：円・螺旋の外在/内在距離、接空間と Gram 行列、直交射影、接平面の二次局所近似。主要命題5件と A4/B3/C1 の詳細解答を実装。
- **MFL3 completed**：最近点射影とreach、円・二重円のreach、弧長曲率、螺旋のshortcut、短弦の内在距離上界、射影可能性と潜在点の非識別。主要命題5件と A4/B3/C1 の詳細解答を実装。
- **MFL4 completed**：標本被覆半径と有限被覆数、密度・局所体積下界、円周の定量的被覆確率、Hausdorff誤差、有界・Gaussianノイズ、観測模型の非識別。主要命題6件と A4/B4/C2 の詳細解答、再現可能な円周被覆実験を実装。
- **MFL5 completed**：局所PCAと射影距離、曲率による共分散摂動、固有値ギャップと射影誤差、標本集中・有界ノイズ・観測近傍の選択誤差。主要命題6件と A4/B4/C2 の詳細解答、放物線の再現可能なPython実験を実装。
- **MFL7〜MFL8 completed**：近傍グラフ、二重中心化とClassical MDSを章別に実装。後続章との直接 prerequisite・数値実験・査読は各章の正本に従う。
- **MFL9 completed**：非負辺長の最短路距離、有限Isomap、距離の条件付き比較、等間隔円弧の二次誤差、U字shortcut、四点サイクルの負固有値、再現可能なPython実験を実装。
- **MFL10 completed**：局所再構成重み、ridge正則化、LLE固有値問題と退化を実装。
- **MFL11 completed**：グラフDirichletエネルギーの最小化、正規化一般化固有値問題、非連結・孤立点を含む失敗診断、Python実験を実装。
- **MFL12 completed**：GA1/GA4への直接参照、半径付き円周・球面の計量・体積・作用素、Greenの境界項、周期差分の剛性/質量と次数正規化の尺度差、固定滑らかな周期関数の $O(h^2)$ 誤差、Python実験を実装。
- **MFL13〜MFL43 planned**：引き続き章別の直接 prerequisite、数学的完全性、数値実験・査読を確認する。
- 進捗の機械的正本は `textbook/dream-theater-series/MFL.yaml`。PLAN 全体の横断監査・数値ラボは未完了なので `plans_progress/` に維持する。
