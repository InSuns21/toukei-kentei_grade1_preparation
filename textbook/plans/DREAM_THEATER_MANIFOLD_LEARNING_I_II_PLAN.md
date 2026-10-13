# DREAM THEATER 多様体学習 I・幾何的深層学習 II（MFL1・MFL2）

分冊: 2026-10-11  
改訂日: 2026-10-14（標準教科書・原著論文・現行正本照合、ML章依存の具体化）  
状態: planned（本PLAN設計改訂のみ。MFL固有の教材本文・series manifestは未実装）

## 0. 中心問いと具体的な講義規模

- **多様体学習 I（MFL1）**：高次元の有限点群から低次元幾何の何を推定できるか。接空間・内在次元・測地距離・Laplace–Beltrami作用素の推定を、標本、ノイズ、密度、境界、スペクトル収束の仮定まで含めて導く。
- **幾何的深層学習 II（MFL2）**：群作用・頂点の付け替え・座標系の変換を尊重するモデルをどう数学的に構成し、何を表現でき、何を原理的に識別できないか。有限群、GNN、E(n)/SE(3)、多様体の場、ゲージ等変性を一続きの問いとして扱う。

**執筆予定章を MFL1-01〜MFL1-21（21章）・MFL2-01〜MFL2-22（22章）、計43章に決定する。** これは主要定義・証明・数値実験・演習を独習で再現できるまとまりから決めた章数であり、**15講・15週・90分×15回の制約は一切ない**。43章も上限やノルマではない。実装時に数学的に妥当な分割・統合が必要なら、PLAN・series manifest・直接参照を同時に改訂して変更する。旧15候補テーマは範囲棚卸しとして吸収し、着手時に1テーマ＝1講へ機械的変換しない。

## 1. 標準教科書・原著との比較（2026-10-14）

| 比較文献 | 照合した主題 | 改訂への反映 |
|---|---|---|
| John A. Lee & Michel Verleysen, *Nonlinear Dimensionality Reduction* (Springer, 2007) | 内在次元、距離保存と位相保存、手法比較 | MFL1-06/08〜11/20〜21：幾何を推定する目標と可視化評価を区別 |
| Benyamin Ghojogh et al., *Elements of Dimensionality Reduction and Manifold Learning* (Springer, 2023) | PCA/MDS、Isomap、LLE、Laplacian法、確率法、UMAP | 古典法の目的関数、行列構成、退化・識別不能性を個別の章で証明。PPCA/VAE一般論はML正本 |
| Tenenbaum, de Silva & Langford, *Science* (2000); Roweis & Saul, *Science* (2000) | Isomapの測地距離、LLEの再構成重み | MFL1-09/10：局所近似の成立条件とshortcut・特異近傍の反例 |
| Belkin & Niyogi, *Neural Computation* (2003), *JCSS* (2008) | Laplacian Eigenmaps、点群からLaplace–Beltramiへの極限 | MFL1-11〜14：有限graph変分問題とcontinuum極限を分離して計算 |
| Coifman & Lafon, *Applied and Computational Harmonic Analysis* (2006) | diffusion maps、密度正規化、diffusion distance | MFL1-15/16：normalization・drift・Markov時間の違いを明示 |
| García Trillos & Slepčev, *Applied and Computational Harmonic Analysis* (2018) | graphエネルギーの変分収束、spectral clustering一致性 | MFL1-18/19：離散円周の完全証明と一般収束の追加要件を区別 |
| Aamari & Levrard, *Annals of Statistics* (2019) | reach、接空間・曲率・多様体の非漸近推定 | MFL1-03〜06：定量化した標本/ノイズ仮定と不識別 |
| Bronstein, Bruna, Cohen & Veličković, *Geometric Deep Learning*（著者公開教材と2021年proto-book） | 群、格子、グラフ、幾何的グラフ、ゲージの統一 | MFL2を対称性・表現力・局所フレームの一貫した構成に再編 |
| Xu et al., *How Powerful are Graph Neural Networks?* (2019) | 近傍集約の1-WL型識別限界 | MFL2-10：具体的な区別不能例を証明 |
| Cohen et al., *ICML* (2019); Satorras et al., *ICML* (2021) | gauge-equivariant CNN、E(n)-equivariant GNN | MFL2-14/18〜21：群変換・frame変更の等変性を式と計算で検証 |

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

**主要設計判断**：

1. MFL1を次元削減アルゴリズムの羅列で終えず、何を推定するか・どの距離を保つか・どの作用素に収束するかを中心に構成する。
2. 「点ごとの作用素整合性」「二次形式の収束」「固有値/固有空間の収束」「クラスタ分割の一致性」は異なる結論。前段から後段への無条件な飛躍を禁止する。
3. MFL2はGNN実装と群畳み込みだけでなく、表現限界、ベクトル/テンソル変換、局所ゲージ変換、メッシュ離散化誤差まで扱う。
4. 科目横断の既存正本を参照し、図や実験だけで証明の代用をしない。

## 2. canonical owner・直接前提と停止線

| 数学対象 | canonical owner／現行状態 | MFL側が所有すること |
|---|---|---|
| LA/RA、固有値・SVD・多変数微分 | 完成済みの該当章を実装時に確認 | PCA、MDS、近傍行列の数値問題への適用 |
| 滑らかな多様体、接空間、接続、曲率、群作用 | GEO/LIEの実在する該当章 | 観測点群・雑音・標本密度の下での幾何推定 |
| graph Laplacian、Cheeger、random walk、固有空間摂動 | **完成済みSGT1〜SGT8**。[SGT PLAN](../plan_done/DREAM_THEATER_SPECTRAL_GRAPH_THEORY_PLAN.md)、series/SGT.yaml | 点群上で得たgraphからcontinuumへ近似するための条件と誤差 |
| Laplace–Beltrami、熱半群・熱核・manifold Sobolev | [幾何解析 GA PLAN](DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md)。改訂時点でplanned | 実装済みGA結果へリンクし、未実装なら必要な局所表示・円周モデルに限って導く。一般理論の定理は既知扱いしない |
| 確率・集中・有限標本上界 | 基礎確率、HDPの実在する該当章 | サンプルの測度モデル・核平均のbias/variance・幾何回復 |
| 予測・NN・逆伝播・PCA・検証一般論 | [ML1/ML2 PLAN](../plans_progress/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)。必要章のstatus確認 | 等変性・点群による学習への適用。ML未実装の結果を既習扱いしない |
| SO(3)の一般表現論、Peter–Weyl、主束一般論 | GEO/LIE、LREP/GBGなど実在する完成章を確認 | MFL2では有限群、SO(2)、低階ベクトル表現と局所frame計算を直接閉じる。一般大定理の無証明引用は禁止 |
| 非線形PDE、情報幾何、物理モデルの解法 | GPDE/GA/IG/PMLの該当正本 | 幾何データ・等変性・数値誤差の検証への接続のみ |

**入口を過剰に重くしない**。MFL1-01〜04はLA/RA・基礎確率・GEOの必要部分から始められる。MFL1-05以降のPCA・近傍法にはML1の必要章、SGTはgraph章から、GAは連続作用素章から利用する。MFL2-01〜03の群作用・有限表現はNN未習でも学べるが、**MFL2-04以降で学習層を構成する段階ではML2-13/14/16の必要結果に明確に依存する**。MFL2にMFL1全21章を一律必修としない一方、場・mesh章はGEO/GAやMFL1の必要結果も明示する。

### 2.1 機械学習I/IIとの章別依存（ML PLANとの双方向の責務境界）

[機械学習I/IIの現行PLAN](../plans_progress/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md) と [ML系列manifest](../dream-theater-series/ML.yaml) を基準にした**具体的な設計依存**を次に固定する。2026-10-14時点でML1-01〜21・ML2-01〜25はすべてplannedであり、**PLANに記されたML結果を、証明済みの定理としては使用しない**。以下の「主要前提」は必要な数学的内容に対応する章IDであり、執筆時には完成status、使用定理のstable anchor、実際の直接prerequisiteを再確認する。

| MFL側（導入章・利用章） | 対応するML章 | 利用する数学・手法 | 必須とする時点・重複を防ぐ境界 |
|---|---|---|---|
| MFL1-01〜04 | ML1-01（学習問題・標本） | データ生成・標本/母集団の区別 | **概念的な接続**。MFL1の幾何的標本モデルは基礎確率から自立して導入可能。ML1全体を開始前提としない |
| MFL1-05、MFL1-08 | **ML1-19**（PCA・SVD） | 中心化、Gram/covariance、主成分・低ランク近似 | PCAの一般原理はML1-19または完成済みLAの同内容を参照。MFLは**局所接空間の推定誤差**・幾何への適用だけを新規所有 |
| MFL1-06〜07 | **ML1-11**（k近傍・核密度） | kNN、半径/bandwidth、近傍探索、密度の概念 | ML1-11の一般算法とMFLのreach・幾何被覆・グラフ近傍を区別。直接のkNN定義は前提未実装時に必要範囲を説明 |
| MFL1-20 | **ML2-01**（KL）、**ML1-09/10**（最適化） | t-SNEのKL損失、確率重み、勾配学習・反復 | KLの数学は完成済みINFOの該当結果でも代替可能。最適化の一般定理はML/OPTを参照し、MFLは可視化目的・非保存例を扱う |
| MFL1-21 | **ML1-12**（検証分割・モデル選択）、必要に応じML1-21 | train/test、パラメータ調整、分布シフト | 一般的検証法はML、幾何推定の誤差指標・対照点群はMFL |
| MFL2-01〜03 | ML2-13（後続への接続） | 等変性の問題設定、有限群と有限表現 | **NNの前段となる数学**なので、ここでML2-13のニューラルネット結果を無条件必須としない |
| MFL2-04、MFL2-08 | **ML2-13**（多層perceptron） | 層の合成、特徴・活性化、集合NN | 有限群平均・置換等変層の**証明**はMFL、新規NNの一般構成はML |
| MFL2-05〜07 | **ML2-16**（CNN・平行移動等変） | 離散畳み込み、padding、stride、重み共有 | ML2-16の**平行移動の証明**から有限群畳み込み・等質空間・steerable層へ拡張し、単なるCNNを再執筆しない |
| MFL2-09〜12 | **ML2-13/14**（NN・逆伝播）、SGT | message/aggregate/updateと学習可能な写像、スペクトル | GNNの置換等変性・1-WL限界・oversmoothingはMFL所有。**一般の微分・自動微分の証明はML2-14** |
| MFL2-13〜16 | **ML2-13/14**、学習実験にはML2-15 | E(n)等変座標更新・計算グラフ、学習の最適化 | 厳密な等変性はMFLの群変換から証明し、訓練・逆伝播の一般手順はMLから引く |
| MFL2-17〜21 | **ML2-13/14**、GEO/GAの直接必要章 | 多様体場/mesh上の学習可能な線形層・局所frame | 接続・ゲージ変換の幾何はGEO/GA、層構成とgauge-equivarianceはMFL、一般NN/backpropはML |
| MFL2-22 | **ML1-12、ML2-15** | 訓練/検証、seed、正則化、比較実験 | 通常NNとの公平な比較と、等変残差・幾何的帰納バイアスの効果の切り分け。MLのモデル評価一般論は重複所有しない |

**実装時の判断**：対象ML章が未執筆なら、(A) 先にML側の当該章を実装する、(B) MFL本文で自立して証明できる有限・局所模型に対象を限定し、一般ML定理は既知とせず、完成後に正本リンクへ接続する、のいずれかを章の着手前に明示する。必須の一般ML理論を数行の無証明引用へ置き換えてはいけない。MLの予定章へ直接prerequisiteを機械的登録しない。**MFL1の前半をML2完了まで不必要に停止させず、MFL2の深層部分をMLなしで完成扱いしない**。

### 採用する標準模型と記法

MFL1では、滑らかなコンパクト埋め込み多様体 $M\subset\mathbb R^D$、内在次元 $d<D$、標本点 $X_1,\dots,X_n$ が体積測度 $dV_g$ に関する密度 $p$ から独立同分布、とする章を標準模型にする。定理ごとに境界なし・連結性、$0<p_{\min}\le p\le p_{\max}$、曲率・reach、密度の滑らかさ、ノイズ模型 $Y_i=X_i+\xi_i$ の条件を明記する。

ambient次元 $D$、内在次元 $d$、出力埋め込み次元 $m$、点数 $n$ を区別する。kernelの二乗距離のbandwidth $\varepsilon$ と幾何的半径 $\sqrt{\varepsilon}$ を取り違えない。continuumの $\Delta_g=\operatorname{div}_g\nabla_g\le0$、$L_g=-\Delta_g\ge0$ をGAの符号と揃え、finite graph上の $L$、Markov作用素 $P$ との等式・正規化を固定する。固有ベクトルの符号・多重固有値内の回転不定性を明示する。

MFL2では $G$ の入力/出力表現を $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ とし、
$$
\Phi(\rho_{\mathrm{in}}(g)x)=\rho_{\mathrm{out}}(g)\Phi(x)
$$
を等変性の定義とする。augmentationと数学的等変性、global群作用と局所frameの変更は別。$E(n)=O(n)\ltimes\mathbb R^n$ は鏡映を含むが $SE(3)=SO(3)\ltimes\mathbb R^3$ は含まない。スカラー・ベクトル・擬ベクトル・テンソルの変換型を明示する。

## 3. 多様体学習I：章別の執筆・証明責務（21章）

| 章ID | 主題 | 本文で必ず再構成できる証明・計算・反例 |
|---|---|---|
| MFL1-01 | 多様体仮説・観測標本の数学模型 | 曲線・円・トーラスの $D,d,m$ と標本密度を定式化、noiseの支持集合反例 |
| MFL1-02 | 内在/外在幾何・接空間と埋め込み | 円弧/螺旋のchord・測地距離・接平面の局所展開、GEOへの適用リンク |
| MFL1-03 | Reach・曲率・近傍の識別可能性 | 円のreach・最近点射影・遠隔部分のshortcut例、曲率と自己接近の区別 |
| MFL1-04 | 密度・標本被覆・観測ノイズ | 有限被覆とunion boundによる標本近接の確率評価、固定ノイズ・不均一密度の失敗例 |
| MFL1-05 | Local PCAと接空間推定 | 局所covarianceの主成分、曲率bias・eigengap・sample noiseの角度評価 |
| MFL1-06 | 内在次元・曲率の推定 | 小球の質量の $r^d$ 則とlog-slope、局所PCA/近傍比、境界・密度のbias |
| MFL1-07 | 近傍グラフの構築 | radius/kNN/mutual kNN・対称化・零次数/非連結とshortcut、SGT結果への適用 |
| MFL1-08 | Classical MDS・線形基準モデル | 距離二乗の二重中心化からGram行列、負固有値・Euclid距離の復元 |
| MFL1-09 | Isomapと測地距離 | 最短路距離→MDS、円弧の経路長誤差、近すぎる遠隔枝のshortcut反例 |
| MFL1-10 | Locally Linear Embedding | 重み制約 $\sum_jw_{ij}=1$ の最小二乗、特異局所Gramの正則化、$(I-W)^T(I-W)$ の核 |
| MFL1-11 | Laplacian Eigenmaps | graph Dirichlet energyと固有値緩和をSGTから導出し、次数正規化・孤立点を検討 |
| MFL1-12 | Laplace–Beltramiへの橋 | 局所計量/体積要素から $L_g$ の式を既存GAへ接続。未実装時は円周モデル・限定局所式を完全導出 |
| MFL1-13 | Kernel積分作用素のbias | 正規座標Taylor・Gaussian moment・密度/体積展開の主項、正規化定数の確認 |
| MFL1-14 | Kernel標本平均のvariance・集中 | 固定滑らかな試験関数と固定点で平均・分散・集中界を導き、$n$ とbandwidthの同時極限の十分条件 |
| MFL1-15 | 密度補正・極限generator | row normalizationと $\alpha$-correctionで密度由来のdriftが残る条件・消える条件を計算 |
| MFL1-16 | Diffusion Mapsと熱の幾何 | finite Markov作用素の固有分解、diffusion distanceと時間、GA熱半群との一致条件 |
| MFL1-17 | 境界・adaptive近傍・density shift | 区間端の核積分を直接計算しboundary biasを示す。Dirichlet/Neumann条件の違い |
| MFL1-18 | 円周の離散→連続スペクトル | 等間隔周期差分Laplacianの固有値とFourier固有ベクトルを厳密計算、固定波数極限 |
| MFL1-19 | 一般spectral consistencyの証明構造 | 点wise作用素収束≠spectral convergenceの反例。1D補間・Dirichlet energy・compactness/min–maxの模型証明。一般高次元理論を無証明のまま完了扱いしない |
| MFL1-20 | t-SNE・UMAPと可視化の意味 | 近傍重み・目的関数の有限計算、距離/位相/クラスタが自動保存されない例 |
| MFL1-21 | near-manifold・stratified data・横断実験 | 交差線、二重螺旋、Swiss roll、外れ値で全手法を比較、仮定・推定誤差・失敗を総括 |

**MFL1の停止線**：任意の層化空間での特異Laplacian、一般random graphでの固有関数一様評価、reach/minimaxの完全一般理論、一般Gamma収束の全証明を単章へ無条件に詰め込まない。採用するなら必要な新たな証明章・直接prerequisiteを追加する。点wise一致からスペクトル・クラスタ一致への飛躍は禁止。

## 4. 幾何的深層学習II：章別の執筆・証明責務（22章）

| 章ID | 主題 | 本文で必ず再構成できる証明・計算・反例 |
|---|---|---|
| MFL2-01 | 幾何的帰納バイアスと不変/等変 | 可換等式・変換前後の予測、augmentationとの違い |
| MFL2-02 | 群作用・軌道・安定化群 | 有限群のorbit–stabilizerと商空間で失う情報の具体例 |
| MFL2-03 | 群表現・intertwiner・特徴型 | 有限次元行列表現と線形等変写像の交換条件、有限群の分解例 |
| MFL2-04 | 不変化・等変層の構成原理 | 有限群平均、等変層の合成・非線形性が等変性を保つ条件 |
| MFL2-05 | 格子対称性と群畳み込み | 循環・二面体群のconvolutionの等変性、padding/strideが壊す例 |
| MFL2-06 | 等質空間とstabilizerの核制約 | 有限 $G/H$ 上の群作用とkernelの制約を添字で証明 |
| MFL2-07 | 円周Fourier・SO(2)の低次表現 | $\sin,\cos$ の回転表現、周波数モード・steerable kernelを直接計算 |
| MFL2-08 | 集合・点群の置換対称性 | pooling・DeepSets型の有限例、置換不変/等変の証明と限界 |
| MFL2-09 | Graph message passing | message/aggregate/updateの頂点再ラベル等変性を全層帰納法で証明 |
| MFL2-10 | GNNの表現力・1-WL | 6-cycleと三角形2個の和など同一初期特徴で区別不能な具体例と条件 |
| MFL2-11 | Graph spectral convolution | $p(L)$-filter・Chebyshev近似・固有空間の有限計算、SGT理論の正本を参照 |
| MFL2-12 | Oversmoothing・長距離ボトルネック | lazy diffusionのspectral decayでfeature collapse、oversquashingとは別であることを例証 |
| MFL2-13 | 幾何的グラフと不変量 | 距離・角・相対位置の直交変換則、O(n)とSO(n)の違い |
| MFL2-14 | E(n)等変GNN座標更新 | $(x_i-x_j)$ と不変scalarを用いる更新で平行移動・回転・鏡映の等変性を直接証明 |
| MFL2-15 | E(3) / SE(3)とchirality | 内積・外積・signed volumeの変換、鏡像を区別できない場合の反例 |
| MFL2-16 | Steerableなベクトル/テンソル特徴 | 低階回転表現、型を守る線形作用・非線形性、成分混合の誤実装 |
| MFL2-17 | 多様体上のscalar fieldと作用素 | chart pullbackと基本スペクトルフィルタの座標独立性を限定模型で証明 |
| MFL2-18 | 接ベクトル場とchart/frameの変更 | 基底変更・成分変換の逆向き関係、球面局所例で接続が要る理由 |
| MFL2-19 | Gauge変換・moving frame | 局所frameを取り替えたときの特徴・kernel変換則を添字で計算 |
| MFL2-20 | Gauge-equivariant convolution | 隣接frame間の輸送を含むconvolutionの等変性を有限メッシュで検証 |
| MFL2-21 | Mesh離散化・幾何数値安定性 | mesh細分化・frame変更・離散輸送の誤差を計測し理論上の等変性と区別 |
| MFL2-22 | 分子・物理・点群の統合実験 | 通常NN/GNNと幾何的等変層の比較、剛体運動/鏡映・座標frameの対照、学習/計算量の監査 |

**MFL2の停止線**：全Lie群の表現分類・Peter–Weyl一般証明、任意のGNNのuniversality/汎化保証、非コンパクト多様体での一般ゲージ理論、物理方程式の数値解の厳密性を前提なしに含めない。必要なら既存の正本へ接続するか、明示的な新章を設計する。

## 5. 読順と前提関係

~~~text
LA/RA・基礎確率・GEO（必要部分）
      ↓
MFL1-01〜04   統計的幾何模型（基礎確率/GEOから開始）
      ↓
ML1-19 → MFL1-05〜06（局所PCA・内在次元）
      ↓
ML1-11 + SGT1〜8 → MFL1-07〜11（graph・埋め込み）
      ↓
MFL1-12〜19   GAの必要部分・kernel極限・spectral consistency
      ↓
ML1-09/10/12・ML2-01（またはINFOのKL）
      ↓
MFL1-20〜21   可視化とnear-manifoldの総合検証

群作用・有限表現 → MFL2-01〜03（NN不要な数学導入）
      ↓
ML2-13 → MFL2-04（等変層）・MFL2-08（集合NN）
      ↓
ML2-16 → MFL2-05〜07（group convolution）
      ↓
ML2-13/14 + SGT → MFL2-09〜12（GNNと表現力）
      ↓
ML2-13/14 → MFL2-13〜16（E(n)/SE(3)等変層）
      ↓
ML2-13/14 + GEO/GA → MFL2-17〜21（manifold field・gauge）
      ↓
ML1-12 + ML2-15 → MFL2-22（対照実験）
~~~

上図は読順であり、**全前講を各章の直接prerequisiteに機械的追加しない**。各chapter.yaml/knowledge.yamlは証明に必要な直接結果を所有する実在章・stable anchorから確定する。MFL2-09のpermutation equivarianceにMFL1-19の一般spectral convergenceは不要。MFL1-12以降が使うGAはplannedであれば未証明として扱い、一般結果が必要な章の実装を保留または局所模型へ限定する。**MLのplanned章も同様であり、章IDを書いただけでは定理の前提を満たさない**。MFL2-17以降も同様にGEO/GAの実在結果を照合する。

## 6. 章別数値実験・対話シミュレーション

**静的SVGや録画フレームのアニメーションを、動く数値実験と称しない。** 入力変更→アルゴリズムの再計算→新しい計算結果の表示を必須とする。証明を数値結果だけで済ませない。理論中心の章はPythonラボ、操作によって理解が変わる実験はブラウザで動く対話型計算を優先する。

| 実験群 | 主な対象 | 操作する量 | 実際に計算・比較する量 |
|---|---|---|---|
| 局所幾何ラボ | MFL1-03〜06 | 点数、近傍半径、noise、曲率、密度 | 接平面角度、推定次元、bias–variance、near-self-intersection |
| 古典埋め込み法 | MFL1-07〜11/20 | kNN/radius、Isomap/LLE/Laplacian/MDS、可視化hyperparameter | 最短路、固有分解、再構成誤差、trustworthiness/continuity、非連結の失敗 |
| kernel・連続極限 | MFL1-12〜19 | $n,\varepsilon,\alpha,p$、円周・区間 | 作用素誤差・boundary bias・固有値・subspace angle・収束率 |
| 群作用・格子・集合 | MFL2-01〜08 | 入力回転/鏡映/置換、層・kernel | 等変残差、paddingによる破れ、通常NNとの比較 |
| GNN表現力 | MFL2-09〜12 | graph、層数、近傍集約、seed | 1-WL区別不能例、層が深いときのfeature collapse、長距離依存 |
| 幾何的GNN・ゲージ | MFL2-13〜21 | 剛体移動、鏡映、局所frame、mesh細分化 | 等変残差・鏡像の区別・離散輸送誤差・計算量 |
| 横断ベンチマーク | MFL1-21 / MFL2-22 | train/test分割、seed、真の対称性の有無、noise | 推定誤差・予測誤差・等変誤差・計算時間と失敗条件 |

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

1. 本改訂は**設計のみ**のためPLANを textbook/plans/ に留める。章が存在するかのようにmanifest、chapter.yaml、knowledge.yamlや公開indexを捏造しない。
2. 着手前に GitHub上の本PLAN、SGT.yaml、**ML系列manifestとML1-11/12/19・ML2-13/14/15/16等の実装status**、直接必要なGEO/GA/MLの現行chapter.yaml/knowledge.yaml（未実装なら存在しないこと）、知識DAG、MFL1-01〜21・MFL2-01〜22のID衝突を確認する。
3. MFL固有の本文・検証・系列manifestの着手時にPLANを plans_progress/ へ**移動**し、同じ作業単位で適切なseries manifest（MFL.yaml等）を実際に作成する。manifestのplan参照を新パスへ揃える。PLANを二重配置しない。
4. manifestの上から連続するcompletedの次の最初のplannedを進め、完了時には**MFLのmanifestだけ**を更新。common routingへ単一active seriesを置かない。
5. 新章はDREAM_THEATER_AUTHORING_STANDARDの変更区分Cに従い、全主要証明・全演習/詳細解答の出発点からの再計算と別観点再読を行う。局所数学変更は区分Bの波及先、表示のみの変更は区分Aの意味内容同値・レンダリング確認を使う。
6. 章別の演習/knowledge/concept/KaTeX/proof-formal/Pages link・実表示と実験テストを変更範囲に応じて検証する。global-impact変更はfull validationへ昇格。CI成功だけで数学的完成と判定しない。
7. MFL1の完了は局所推定→graph→continuum極限→spectral模型→失敗診断、MFL2の完了は対称性→等変層→GNN限界→E(n)→gauge/meshまで、主要定義・証明・演習・対照実験を独習者が再構成できることで判定する。
8. 系列横断で直接依存・stable anchor・公開導線・章ID・数値ラボを確認し、残タスクゼロの場合にのみPLANを plan_done/ へ**移動**しmanifestのplanを同時更新する。
9. **別の完了章の追跡監査は章IDを明示したユーザー依頼があるときだけ**。通常の新章着手に「直前完了章の追跡監査」を自動追加しない。

**章数到達、形式的marker、未確認の一般定理、CI greenだけを完了証拠とはしない。**
