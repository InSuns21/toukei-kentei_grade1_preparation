# DREAM THEATER 機械学習と物理学 I・II（PML1・PML2）

分冊: 2026-10-11  
講義構成確定: 2026-11-13  
状態: planned（科目固有の実装・監査・公開は未着手）  
**確定講義数: PML I 22講（PML1-01〜PML1-22）、PML II 26講（PML2-01〜PML2-26）、全48講**

## 0. 中心問い・講数の確定理由

**機械学習と物理学 I：** 統計力学の自由エネルギー、確率過程、勾配流、物理的対称性・保存則を、機械学習の損失関数・学習ダイナミクス・構造保存モデルと**どの条件で**結び付けられるか。

**機械学習と物理学 II：** PDE の forward / inverse problem、数値解、PINN、Neural Operator、微分可能シミュレーションを、**残差、真の解誤差、安定性、計算資源、データ分割**を区別して評価できるか。

従来の各15テーマは範囲の棚卸しであり、1テーマ=1講ではなかった。下記の教科書・原論文の構成と、独習者が証明・計算・実験を再現できる区切りを照合し、**I は 6+8+8=22講、II は 5+8+7+4+2=26講**に確定した。15週・90分×15回などの形式的制約や、他科目との章数合わせによる決定ではない。

- **I の分割根拠**：有限状態 Gibbs 計算と変分原理、Langevin の不変測度と SGD の局所近似、Noether の適用条件と Hamiltonian/Lagrangian NN、連続力学と離散積分の保存性をそれぞれ別の証明・反例単位とする。スピングラスの全理論・汎化界を再講義しない。
- **II の分割根拠**：古典数値解法と PINN をまず同一 PDE で比較し、残差の小ささと解誤差を分離する。PINN の強形式・学習不良・安定性、Neural Operator/FNO/DeepONet の作用素としての定義と離散化、PDE 逆問題・微分可能解法・評価手順を混同しない。
- **講数の停止線**：各章の中心問い・主要証明/計算・反例・全演習が閉じるまで章内を充実させ、単に題数や流行手法を増やすために講義を追加しない。範囲変更が必要なら、PLANと系列manifestを同じ作業単位で再審査する。

章IDは**計画上の正式候補**として上記の範囲を使用し、実装時に最新 GitHub の既存ID、対象ディレクトリ、series manifest の競合を再確認する。PLANのみ確定した時点では実在する講義・公開講義として表示しない。

## 1. 市販教科書・公開テキスト・原論文との照合

出版社・学術誌・著者の公開目次・概要を参照した。著者の叙述や演習問題を転載せず、本科目の**数学的な論証単位と不足領域**を校正する。

| 文献 | 章構成・確認した射程 | 本PLANでの採否 |
|---|---|---|
| A. Engel & C. Van den Broeck, *Statistical Mechanics of Learning* (Cambridge University Press, 2001), [目次](https://www.cambridge.org/core/books/statistical-mechanics-of-learning/contents/9B3FDA3BEA1EB8AEA94BED49DD2E4666) | perceptron、teacher–student、storage、統計力学的定式化、on-line learning | PML1-04〜06。容量・相転移は**指定した有限/極限模型**で判定し、一般のニューラルネットへ無条件に外挿しない |
| M. Mézard & A. Montanari, *Information, Physics, and Computation* (Oxford University Press, 2009), [出版社](https://academic.oup.com/book/6337) | Gibbs/確率、REM、因子グラフ、スピングラス、推論との接続 | PML1-02〜06の参照。REM/SK/Parisi/cavityの主定理は既存SGが正本 |
| S. L. Brunton & J. N. Kutz, *Data-Driven Science and Engineering*, 2nd ed. (Cambridge University Press, 2022), [出版社目次](https://www.cambridge.org/highereducation/books/data-driven-science-and-engineering/6F9A730B7A9A9F43F68CF21A24BEC339/physics-informed-machine-learning/2F54B4BC99066DB8D2EB76126EE3E5D8) | data-driven dynamics、Koopman、ROM、physics-informed ML、PINN | PML1-21とPML2-03〜05、06〜13、25〜26。一般SINDy/Koopman理論やROMの網羅は停止線外 |
| N. Thuerey ほか, *Physics-based Deep Learning*（著者公開オンラインテキスト）, [目次](https://www.physicsbaseddeeplearning.org/intro.html), [Differentiable Physics](https://www.physicsbaseddeeplearning.org/diffphys.html) | physical loss、hybrid/differentiable simulation、数値実装と学習の接続 | PML2-22〜24の数値解法内の微分・積分誤差・実行可能な実験を補強 |
| G. E. Karniadakis ほか, “Physics-informed machine learning,” *Nature Reviews Physics* 3 (2021), [論文](https://doi.org/10.1038/s42254-021-00314-5) | forward/inverse、物理制約・学習の分類と限界 | II全体の分類の基準。手法の有効性を無条件の定理にはしない |
| M. Raissi, P. Perdikaris & G. E. Karniadakis, “Physics-informed neural networks,” *Journal of Computational Physics* 378 (2019), [論文](https://doi.org/10.1016/j.jcp.2018.10.045) | 連続/離散 PINN、PDE residual、forward/inverse | PML2-06〜09、21。自動微分による残差を真値誤差と同一視しない |
| S. Wang, Y. Teng & P. Perdikaris, “Understanding and Mitigating Gradient Flow Pathologies in PINNs,” *SIAM J. Sci. Comput.* 43 (2021), [論文](https://doi.org/10.1137/20M1318043)；A. Krishnapriyan ほか, “Characterizing possible failure modes,” *NeurIPS* (2021), [論文](https://papers.neurips.cc/paper_files/paper/2021/hash/df438e5206f31600e6ae4af72f2725f1-Abstract.html) | composite loss の勾配不均衡、PDEによる条件悪化 | PML2-09〜13を「解けない例」から設計し、失敗と対策を数値再現する |
| N. Kovachki ほか, “Neural Operator: Learning Maps Between Function Spaces,” *JMLR* 24 (2023), [論文](https://www.jmlr.org/papers/v24/21-1524.html)；Z. Li ほか, “Fourier Neural Operator,” *ICLR* (2021), [論文](https://mlanthology.org/iclr/2021/li2021iclr-fourier/) | 関数空間上の作用素、積分核型・Fourier型ネットワーク、離散化への設計 | PML2-14〜17。**パラメータ共有**と**任意格子での精度保証**は別の主張 |
| L. Lu ほか, “Learning nonlinear operators via DeepONet,” *Nature Machine Intelligence* 3 (2021), [論文](https://doi.org/10.1038/s42256-021-00302-5) | sensor inputs、branch/trunk、作用素近似 | PML2-18〜20。センサ数・配置・入力関数クラスを仮定として確認 |
| S. Mandt, M. D. Hoffman & D. M. Blei, “Stochastic Gradient Descent as Approximate Bayesian Inference,” *JMLR* 18 (2017), [論文](https://jmlr.org/beta/papers/v18/17-214.html) | constant SGD の局所近似、OU型・近似posterior、有限step誤差 | PML1-12〜14。一般SGD=厳密なGibbs標本化とは書かない |
| S. Greydanus ほか, “Hamiltonian Neural Networks,” *NeurIPS* (2019), [論文](https://proceedings.neurips.cc/paper_files/paper/2019/file/26cd8ecadce0d4efd6cc8a8725cbd1f8-Paper.pdf)；M. Cranmer ほか, “Lagrangian Neural Networks,” (2020), [著者解説](https://greydanus.github.io/2020/03/10/lagrangian-nns/) | Hamilton/Lagrange の構造をモデルに組み込む | PML1-18〜20。連続系の構造と離散時間学習・数値積分の誤差を分離 |

**資料の種別**：Engel・Mézard・Bruntonは刊行教科書、Thuereyは公開オンラインテキスト、それ以外は学術誌・会議論文。全テキストを頁ごとに精読したとの主張ではなく、公開された目次・要旨・必要な論文の主張と照合した設計である。

## 2. prerequisite と canonical ownership

### 2.1 全体の履修導線

- **共通**：既存 [ML I・II](../plan_done/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md) の損失・確率モデル・自動微分・最適化、LA/RA/確率論、OPT、数値計算。PML1-01は有限状態模型から始め、物理統計力学の高度理論を一度に要求しない。
- **PML I 前半**：TH/SM の分配関数・自由エネルギー、必要な確率微分方程式・Fokker–Planckは STO/GPDE の実在する先行結果を照合。SG の REM/SK、INFOのKL、OTRの勾配流一般論は必要講のみ利用。
- **PML I 後半**：力学系・Hamilton/Lagrange力学（MECH/AMECH）、SYM/GMECH、MFL2の群作用・同変学習。既存正本の一般Noether・表現論を再証明せず、モデルへの代入と保存性の条件を本講義で示す。
- **PML II**：PML I の必要な構造、PDE/GPDE/NPDE、Fourier・関数解析、[INV1〜INV18](../plan_done/DREAM_THEATER_INVERSE_PROBLEMS_PLAN.md) の直接必要な逆問題・Bayes・PDE感度。実装時に前提章のcompleted status・stable anchorを確定する。
- **数値PDEとFEM**：「FEM」という科目名だけで別の完成済み系列を仮定しない。既存NA/GPDE/関連章で証明済みの範囲を探し、足りない1次元Galerkin/有限要素の直接計算はPML2-03に局所導入する。本格的な有限要素解析の全理論は本科目の正本にしない。

### 2.2 他科目との所有範囲

| 既存正本 | 本科目が新たに負うこと | 本科目で再構築しないこと |
|---|---|---|
| ML1/ML2・OPT・INFO | エネルギー尺度と学習目的の関係、物理的条件のある損失とノイズ | 一般のNN・ELBO・SGD基礎・KLの全理論 |
| TH/SM/SG・確率過程 | 学習模型へのGibbs/quenched/capacityの代入、SGDとLangevinの条件付き比較 | REM/SK/Parisiの研究級証明、一般熱力学 |
| MFL2・MECH/AMECH・SYM/GMECH | 物理量の群作用、学習ダイナミクスでのNoether条件、HNN/LNNの例 | 一般の群表現論、力学・シンプレクティック幾何 |
| PDE/GPDE/NA/INV | PINN/Neural Operatorの残差・識別・離散化・学習誤差の具体解析 | 一般PDE存在論、逆問題の正則化/随伴法の全理論 |
| OTR/ML2の生成モデル | 必要に応じて流れ・拡散と学習の対応を適用 | Wasserstein勾配流一般論、拡散生成モデルの再講義 |
| 数値シミュレーション基盤 | 再現可能な計算実験、学習側の評価指標・パラメータ記録 | 共有UI/Workerの独自実装・別科目アルゴリズムの複製 |

初出用語・canonical stable anchorは章執筆時に**使用箇所で実在照合**する。未完成の別PLANや未証明結果を既知の定理扱いしない。研究級の一般定理を参照する場合は、証明済み部分と外部結果/条件付き利用の境界を明記する。

## 3. PML I：統計力学・学習ダイナミクス・物理構造（22講）

### A. エネルギー・自由エネルギー・学習容量（6講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML1-01 | 損失と物理エネルギーは何が同じで何が違うか | 状態・パラメータ・単位、物理的温度と人工的温度、データ依存損失の区別 |
| PML1-02 | 有限状態からGibbs分布を構成できるか | 分配関数・正規化・2状態模型の期待値と温度微分 |
| PML1-03 | 自由エネルギー最小化とKLはどう結び付くか | 有限状態のGibbs変分恒等式、等号条件、温度0の極限の注意 |
| PML1-04 | エネルギーベース学習は統計力学とどこまで共通か | Boltzmann型模型の対数尤度勾配、正相/負相、有限スピン計算 |
| PML1-05 | perceptronの記憶容量は何に依存するか | 有限標本の制約・線形分離の直接例、独立性/極限順序の識別 |
| PML1-06 | 無秩序・相転移を学習へ持ち込める条件は何か | quenchedとannealed平均の差、SGのREM等を指定条件で援用、反例 |

### B. 勾配流・確率過程・SGD（8講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML1-07 | 最適化を連続時間の散逸過程として見られるか | gradient flowのエネルギー微分、停留点と収束の区別 |
| PML1-08 | Langevin方程式に何のノイズが必要か | 過減衰SDEのdrift/diffusion、生成作用素・二次模型 |
| PML1-09 | Gibbs密度が不変なのはどの条件か | Fokker–Planckに代入、境界流束・正規化・非爆発性条件 |
| PML1-10 | 不変分布と詳細釣合いは同じか | 確率流、散逸、可逆/非可逆模型の比較 |
| PML1-11 | Langevinの数値離散化はどこで偏るか | Euler–Maruyamaと線形模型の定常分散、step size依存 |
| PML1-12 | SGDの揺らぎは熱雑音と等しいか | ミニバッチ共分散、状態依存・非等方性、次数と時間尺度 |
| PML1-13 | SGDを局所OU過程で近似できるのはいつか | 二次近似、Lyapunov共分散方程式、局所Gaussian近似 |
| PML1-14 | SGD=熱平衡という比喩が壊れる例は何か | 異方性雑音・有限step・非勾配確率流を示す反例 |

### C. 対称性・保存構造・物理モデルの評価（8講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML1-15 | 物理的な対称性を群作用としてどう記述するか | 回転・並進の直接例、不変性と同変性の定義を実際に検査 |
| PML1-16 | 群平均はどのように不変モデルを作るか | 有限群での群平均と射影・誤差の変化、MFL2の結果を援用 |
| PML1-17 | Noetherの保存則は学習器に自動で移るか | 連続Lagrangianの仮定、変分・保存量、学習損失/離散実装との区別 |
| PML1-18 | Hamiltonian NNは何を構造として固定するか | 正準Hamilton方程式、反対称行列、理想連続系のエネルギー微分 |
| PML1-19 | Lagrangian NNに可逆な質量行列が必要なのはなぜか | Euler–Lagrangeから加速度を解く条件、退化例 |
| PML1-20 | 連続系の保存則と数値積分での保存は同じか | symplectic Euler/通常Euler、位相体積・エネルギードリフト |
| PML1-21 | データから動力学を同定すると何が失われるか | 有限辞書のSINDy/Koopman適用例、同定可能性・近似誤差 |
| PML1-22 | 物理制約付きモデルは本当に優れるか | 同一データ・step・初期値でHNN/LNN/通常NNを比較する総合実験 |

**Iの必須到達点**：有限状態Gibbs変分恒等式、LangevinのGibbs不変性、SGD局所OU近似の仮定、Hamiltonianモデルの連続時間保存性を独立に導出する。連続時間の「保存則」を、学習済み離散モデルの「長時間誤差ゼロ」に置き換えない。

## 4. PML II：PDE・PINN・Neural Operator・科学計算（26講）

### A. PDEの設定と数値ベースライン（5講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML2-01 | 何を「PDEを解く」と呼ぶか | 初期/境界条件、強解/弱解、適切な解空間とwell-posedness |
| PML2-02 | forwardとinverseはどこで問題が変わるか | パラメータ→解→観測写像、識別可能性・ノイズ、INVとの接続 |
| PML2-03 | 機械学習なしでどう解くか | 1次元Poissonの差分・弱形式・有限要素の小規模計算 |
| PML2-04 | 計算された値の何を「誤差」と呼ぶか | 近似・離散化・最適化・統計誤差、整合性と安定性の役割 |
| PML2-05 | 学習用のPDEデータはどう作り検証するか | 製造解、境界条件、分割、ノイズ、格子・時刻外挿の規則 |

### B. PINNの導出・失敗・誤差（8講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML2-06 | PINNの強形式残差はどう定義されるか | PDE作用素・collocation点・データ/物理損失の具体的展開 |
| PML2-07 | 自動微分で必要な導関数を本当に計算できるか | 連鎖律・二階微分・activationの正則性、微分と離散近似の区別 |
| PML2-08 | 初期/境界条件を強制する二つの方法は何か | hard ansatzとsoft penalty、trial functionの条件確認 |
| PML2-09 | 物理残差の重みは何を変えるか | 次元・正規化・損失間の勾配不均衡の計算 |
| PML2-10 | PINNはなぜ学習失敗することがあるか | stiffness・周波数・初期化を固定した失敗再現と対策 |
| PML2-11 | 残差から解誤差を評価できるのはいつか | 1次元PoissonのDirichletエネルギー評価と必要な境界条件 |
| PML2-12 | 点上の残差ゼロで解が正しいと言えるか | collocation点をすり抜ける非零関数、連続ノルムとの差 |
| PML2-13 | collocation点の増加や領域分割で何が改善するか | sampling・holdout残差・domain decomposition、計算コスト |

### C. 関数から関数への学習（7講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML2-14 | 単一のPDE解と「解作用素」の学習は何が違うか | 係数/初期値関数から解関数への写像、関数空間・ノルム |
| PML2-15 | Neural Operatorの層をどう構成するか | 積分核と非線形写像、作用素入力の離散表示 |
| PML2-16 | Fourier Neural OperatorはなぜFourier係数を用いるか | 畳み込み・モード切断・FFTの有限格子計算 |
| PML2-17 | 解像度を変えても同じ精度が出るのか | パラメータ共有と精度保証の区別、aliasing・境界処理 |
| PML2-18 | DeepONetは観測点からどう作用素を近似するか | branch/trunkの有限sensor計算、センサ配置の条件 |
| PML2-19 | Neural Operatorの近似定理は何を保証しないか | コンパクト入力集合・連続性・関数ノルム、学習・汎化との違い |
| PML2-20 | PINNとoperator learningは組み合わせられるか | physics-informed operator損失、訓練/未見パラメータでの比較 |

### D. 逆問題と微分可能シミュレーション（4講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML2-21 | PDEパラメータを学習すると識別性は保てるか | data+physicsの逆問題、正則化・観測ノイズ・INVの適用 |
| PML2-22 | 数値ソルバを通じた勾配はどう求めるか | differentiation-through-solverと随伴法の比較、離散化の位置 |
| PML2-23 | 時間発展を微分すると勾配はどこで狂うか | tangent/adjointの線形例、step size・安定性・勾配誤差 |
| PML2-24 | データ同化を単発の逆問題とどう区別するか | 時間逐次観測の有限次元線形Gaussian例、更新・不確実性 |

### E. 物理的妥当性と総合比較（2講）

| ID | 中心問い・内容 | 講義内で再現する核心 |
|---|---|---|
| PML2-25 | 何を比較すれば科学計算として信頼できるか | 保存量・境界誤差・校正・計算時間・メッシュ変化・外挿失敗 |
| PML2-26 | PINN・FNO・古典解法はどんな条件で勝敗が変わるか | Poisson/Burgers/係数付きPDEから難度に応じ選び、同条件ベースラインで総合再現実験 |

**IIの必須到達点**：Poissonの強/弱形式と数値ベースライン、1次元のPDE残差→誤差評価の十分条件、経験点で残差0でも解誤差が大きい反例、FNO/DeepONetの有限次元実装例、PDE同定における識別可能性の確認、微分可能ソルバの勾配計算を再現する。

## 5. 数学的な必須中間式と反例

本PLANで以下を**検算可能な目標**として採用する。完成済み講義の証明がここに存在するという意味ではない。

1. **有限状態 Gibbs の変分恒等式**：エネルギーを $E_i$、温度尺度を $\tau=k_BT>0$、$Z=\sum_i e^{-E_i/\tau}$、$p_i=e^{-E_i/\tau}/Z$ とする。確率ベクトル $q$ に対し
   $$
   \sum_i q_iE_i+\tau\sum_i q_i\log q_i=-\tau\log Z+\tau D_{\mathrm{KL}}(q\|p)
   $$
   を$0\log0=0$の規約で導く。最小値と等号条件を独立に検査する。
2. **Langevinの不変分布**：$dX_t=-\nabla U(X_t)\,dt+\sqrt{2\tau}\,dW_t$ の形式的定常密度 $p\propto e^{-U/\tau}$ をFokker–Planckへ代入するだけで終わらせず、$Z<\infty$、境界流束、非爆発性・定常分布の存在/一意性の区別を明示する。
3. **SGDとの非同値**：ミニバッチ勾配の共分散がパラメータ依存・非等方的である例を与え、局所OU近似の導出条件（一定step、二次近似、線形安定性等）と有限stepでの差を示す。
4. **Noetherと数値解の差**：連続時間で $dH/dt=0$ となる正準系を導き、通常Eulerの一段更新で$H$が一般に不変でない具体例を計算する。
5. **残差と真の誤差**：$-u''=f$、$u(0)=u(1)=0$ で境界を満たす滑らかな近似$v$について、$e=v-u$ と $r=-v''-f$ により $\|e'\|_{L^2}\le C_P\|r\|_{L^2}$ を導く（Poincaré定数と正則性を明記）。
6. **collocation反例**：$f=0$、真解$u=0$とし、整数$N\ge1$に対して$v(x)=\sin(2\pi N x)$を取ると、Dirichlet境界を満たし、格子点$x_j=j/N$では残差$-v''(x_j)=0$である。しかし$\|v-u\|_{L^2(0,1)}=1/\sqrt2$。有限点の残差0から関数ノルムの解誤差0は従わない。
7. **Neural Operatorの注意**：同じ重みで別格子を処理できる設計と、離散化収束・誤差上界・汎化保証を区別する。Fourier切断・aliasing・非周期境界・入力センサ分布を固定する。

## 6. 計算実験・演習・査読・公開の完了条件

- **数値再現**：PML1は二状態Gibbs、Langevin/SGD二次模型、振動子の通常/構造保存積分、HNN/LNNの制約あり/なしを少なくとも扱う。PML2は1次元Poisson（解析解で誤差を検証）、Burgers等の時間依存例、パラメータを変える作用素学習、ノイズ付き逆問題を扱う。**1講1巨大実験は要求しない**が、実装主体の講義では動く計算コードと検証結果を同じ作業単位に含める。
- **比較条件**：データ生成方法、乱数種、学習/検証/テスト分割、格子/刻み、境界/初期条件、collocation数、パラメータ数、最適化反復、実行時間、装置条件、数値精度を記録。PML2ではPINN vs FD/FEM、Neural Operator vs 古典solverに少なくとも一つの統制比較を置き、精度だけで計算コストを無視しない。
- **誤差分類**：training loss、holdout residual、解誤差、保存量ドリフト、統計的汎化、離散化/モデル誤差を別指標で示す。安定性・収束・普遍近似・相転移・熱平衡を成立条件抜きで断言しない。
- **本文の最低要件**：現行DREAM THEATER authoring standardに従い、動機→初出定義→直接例→条件付き定理/算法→途中式付き論証→Level A 4題・B 3題・C 1題**以上**と全詳細解答。主要learning objectiveが不足するなら必要な問題を増やし、穴埋めで題数のみ増やさない。
- **査読**：新規/実質改稿は各講の全主要証明・全演習・全詳細解答を出発点から再計算する自己査読と、同一執筆者による別観点再読を区別する。別の完了章の追跡監査は**明示された章IDへの依頼があるときだけ**実施する。
- **進捗と公開**：実装開始時にPML系列manifest、対象chapter/knowledge、直接依存・stable anchor、目次カテゴリを作成・照合し、計画に着手した時点でPLANを `plans_progress/` へ**移動**する（元を複製しない）。manifestのplan参照も同じ変更で更新する。planned章を公開目次に載せず、completedのみ登録する。全48講の実装後、連続するprerequisites、実験再現性、公開導線、必要な検証・横断監査を確かめ、残作業がなくなった時点で `plan_done/` に移す。
- **変更時の検証**：leaf chapterの通常変更はchanged-only、global index/validator/共通依存等の変更はfull auditとし、CI greenだけで数学的正しさを宣言しない。

本改訂は**PLAN設計の確定**であり、PML1-01〜PML2-26の執筆・実装・独立査読・公開が完了したとは主張しない。
