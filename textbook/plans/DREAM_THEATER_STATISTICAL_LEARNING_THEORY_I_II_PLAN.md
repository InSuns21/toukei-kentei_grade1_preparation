# DREAM THEATER 統計的学習理論 I・II（SLT1・SLT2）

作成日: 2026-10-11  
改訂日: 2026-11-03（標準教科書・著者講義ノート・現行ML/HDP正本を照合し、証明責務と停止線を具体化）  
状態: planned（本改訂は設計のみ。SLT固有の本文・series manifestは未実装）

## 0. 中心問いと射程

- **統計的学習理論 I：** なぜ有限標本で小さい経験リスクが未知分布での小さいリスクを意味するのか。どの仮説クラス・損失・独立性・複雑度条件なら汎化を証明でき、どの条件を外すと不可能になるのか。
- **統計的学習理論 II：** 過剰パラメータ、補間、カーネル・ニューラルネットの学習力学を、どこまで定量的に理解できるのか。線形・カーネル・無限幅・粒子系の各模型が説明する現象と、説明しない現象を分離する。

予定構成は **SLT1-01〜SLT1-18（18章）、SLT2-01〜SLT2-18（18章）、合計36章**。旧I/II各15テーマを学修上の中心問い・証明・反例・演習のまとまりで再編した。36章は講数・週数のノルマでも上限でもない。実装時の分割・統合は必要な参照・manifestと同時に更新する。**SLT1のPAC/VCとSLT2のNTKを同一一般定理で保証できるかのように接続しない。**

## 1. 市販教科書・公開テキストとの照合

以下は出版社の書誌・目次、著者公開資料を起点にした主題比較である。原著の定理を本講座へ転記せず、既存の数学正本に対して不足する学習上の責務を割り当てる。

| 資料 | 照合する標準的な射程 | 本PLANでの採用 |
|---|---|---|
| Shalev-Shwartz & Ben-David, *Understanding Machine Learning: From Theory to Algorithms*（Cambridge, 2014） | PAC、No-Free-Lunch、VC、正則化と安定性、Rademacher、PAC-Bayesと圧縮 | SLT1の「学習可能性→有限クラス→VC→Rademacher→安定性→事後分布」の骨格。realizable/agnosticを分離 |
| Mohri, Rostamizadeh & Talwalkar, *Foundations of Machine Learning*, 2nd ed.（MIT Press, 2018） | 汎化界、VC/Rademacher、回帰、安定性、構造化クラス | 0–1損失から有界実数損失・線形クラスへ広げ、定理適用の前提と定数を検算 |
| Francis Bach, *Learning Theory from First Principles*（MIT Press, 2024）と著者公開講義 | 過剰リスク、経験過程、正則化、線形・カーネル・NN、lazy regime/NTK、PAC-Bayes | SLT1とSLT2をつなぐ予測リスク・スペクトル表示・有限幅/無限幅の境界。単なる流行トピック集にしない |
| Roman Vershynin, *High-Dimensional Probability*（Cambridge, 2018/2026版） | 集中、被覆数、ランダム行列、共分散推定 | 一般不等式は完成済みHDPを参照し、SLTで関数クラス・設計行列への適用を証明 |
| Martin J. Wainwright, *High-Dimensional Statistics: A Non-Asymptotic Viewpoint*（Cambridge, 2019） | 局所複雑度、非漸近評価、仮説検定によるminimax下界 | SLT1の速い収束率とLe Cam/Fano、SLT2の非漸近線形模型に橋を架ける |
| Hastie, Montanari, Rosset & Tibshirani, *Surprises in High-Dimensional Ridgeless Least Squares Interpolation*（2019/2022） | 高次元最小ノルム補間・risk曲線 | SLT2で設計・雑音・評価リスクを固定し、double descentを「常に生じる法則」としない |
| Jacot, Gabriel & Hongler, *Neural Tangent Kernel*（NeurIPS, 2018） | 無限幅NTK・関数空間の勾配力学 | 有限標本の線形化・核勾配流を先に完全計算し、幅極限には別の仮定を要求 |
| Chizat & Bach, *On the Global Convergence of Gradient Descent for Over-parameterized Models using Optimal Transport*（2018） | 粒子・測度表現と輸送型勾配流 | SLT2のmean-fieldをNTKと別のスケーリングとして扱い、一般の大域最適化を無条件に主張しない |
| Ben-David et al., *Impossibility Theorems for Domain Adaptation*（AISTATS, 2010） | 分布シフト下の不可能性 | SLT2終盤の「保証しないこと」を反例と追加仮定で切り分ける |

参照先（書籍の出版社・著者公開資料と原著）：
- https://www.cambridge.org/core/books/understanding-machine-learning/3059695661405D25673058E43C8BE2A6
- https://mitpress.mit.edu/9780262039406/foundations-of-machine-learning/
- https://mitpress.mit.edu/9780262049443/learning-theory-from-first-principles/
- https://www.di.ens.fr/~fbach/ltfp/
- https://www.math.uci.edu/~rvershyn/papers/HDP-book/HDP-book.html
- https://www.cambridge.org/core/books/highdimensional-statistics/6DEB253AB61B7A4F08609CFF76B9C6A3
- https://arxiv.org/abs/1903.08560
- https://arxiv.org/abs/1806.07572
- https://arxiv.org/abs/1805.09545
- https://proceedings.mlr.press/v9/david10a.html

**設計上の修正点**：
1. 旧案で薄かった「学習可能性の必要性」「realizableとagnostic」「VCの必要十分条件」「速い率の追加仮定」を、個別の証明対象にする。
2. SLT1を単なる上界公式集にしない。上界・下界・算法依存保証の仮定を同じ学習問題で比較する。
3. SLT2で有限次元恒等式、非漸近評価、比例漸近、無限幅極限、mean-field極限を区別する。模型内の定理と現実の深層学習の普遍的説明を混同しない。
4. 議論を定理名で終えず、具体的な2値分類・有限関数クラス・Gaussian設計・2層ネットの計算へ必ず戻す。

## 2. canonical owner・実在する前提と開始条件

2026-11-03のGitHub系列manifestを照合すると、**ML1-01〜21・ML2-01〜25、HDP1〜10、SGT1〜8はすべてcompleted**。ただしstatusだけから特定の定理の存在を推論しない。実装前に必要なchapter.yaml / knowledge.yaml・本文の実在stable anchorを確認する。

| 既習の正本 | 主に必要とするSLT内容 | SLTが新しく所有するもの |
|---|---|---|
| [ML1/ML2](../plan_done/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)・[ML manifest](../dream-theater-series/ML.yaml) | ML1-01/02/03（risk、Bayes、ERM）、ML1-04/05/12/18（回帰、ridge、検証、kernel）、ML2-02/12〜15（Bayes回帰、GP、NN、逆伝播、最適化） | 任意の学習算法に対する統一的な汎化保証、過剰リスク上下界、理想化したNN極限 |
| [HDP](../plan_done/DREAM_THEATER_HIGH_DIMENSIONAL_PROBABILITY_PLAN.md)・[HDP manifest](../dream-theater-series/HDP.yaml) | HDP1 Hoeffding、HDP4有界差分、HDP6/10被覆数、HDP7/8共分散・行列集中 | 関数クラスへ適用したsymmetrization、VC/Rademacher、標本複雑度、設計に応じたリスク |
| OPT / RKHS の完成済み関連章 | 凸性・射影・dual、表現定理・kernel ridge・スペクトル | 統計リスク/安定性/時間発展の評価。一般最適化とRKHS定理は再所有しない |
| 確率論・測度論・INFO | 条件付き期待値、KL、情報不等式、弱収束 | 分布クラス・アルゴリズム出力の確率的な評価 |
| RMT・最適輸送・確率解析（必要な部分のみ） | inverse covariance、Stieltjes変換、Wasserstein、確率微分方程式の関連定理 | SLT2の対象模型で本当に必要な結果だけを接続。未完成なら有限次元/1次元の自足した模型に限定 |

- **入口**：SLT1-01〜04はML1-01〜03・確率論・HDP1程度で開始できる。VCを知らないまま有限クラスの汎化を読める。SLT1-05以降で組合せ論、HDP4/10などの必要結果を順次使用する。
- **SLT2の入口**：ML1-04/05/18とLAのSVDから有限行列模型を始める。NTK・NNGPではML2-12〜14、mean-fieldでは確率測度と勾配流の直接prerequisiteが必要。SLT1全18章をSLT2全章に一律要求しない。
- **学習済みと仮定しないこと**：RMTの大域的極限法則、Donskerの一般定理、輸送距離上の勾配流の存在・一意性、深層非凸問題の大域最適化、分布外学習の普遍保証。章の核心定理に必要なら証明を追加するか限定模型へ絞る。
- 本PLANの編集のみで計画状態を「着手済み」とはしない。実装前に正式ID衝突、直接prerequisiteの所在、knowledge DAGとseries manifestの有無を実確認する。

### 2.1 全章で固定する記号・論理上の区別

- 訓練標本 $S=(Z_1,\ldots,Z_n)\sim P^n$、仮説集合 $\mathcal H$、損失 $\ell(h,z)$、母集団リスク $R_P(h)=\mathbb E_{Z\sim P}\ell(h,Z)$、経験リスク $\widehat R_S(h)=n^{-1}\sum_i\ell(h,Z_i)$ とする。データから選んだ $\widehat h(S)$ と**固定された** $h$ を区別する。
- $\ell\in[0,1]$ は適用する定理の仮定であり、二乗損失や対数損失へ無断で拡張しない。非有界損失ではtail/モーメント条件と別の証明が要る。
- realizableは $R_P(h^\star)=0$ が成立する模型、agnosticは一般に $\inf_{h\in\mathcal H}R_P(h)>0$ を許す模型。Bayes最適、$\mathcal H$ 内最適、ERMの3者を区別し、近似誤差と推定誤差を混同しない。
- 汎化gap、excess risk、高確率境界、期待値境界、uniform/pointwiseを区別する。$O_p$、期待値、ほとんど確実、有限標本、$n,p\to\infty$ の極限モードを明示する。
- SLT2では標本数 $n$、特徴数 $p$、ネット幅 $m$、層数 $L$、時間 $t$、正則化 $\lambda$ を区別。設計行列 $X\in\mathbb R^{n\times p}$ の行・列と $X^TX$ / $XX^T$ の次元を固定する。出力・教師雑音・初期化乱数の各期待値を分離する。

## 3. SLT1：学習可能性と汎化の証明責務（18章）

| 章ID | 中心問い | 本文で再導出する主要結果・反例 |
|---|---|---|
| SLT1-01 | riskと最良予測をどう区別するか | 0–1損失の条件付きBayes則、Bayes risk、excess riskの分解。$\mathcal H$ 制限の近似誤差の例 |
| SLT1-02 | PAC学習可能とは何か | $(\varepsilon,\delta)$、realizable/agnostic、分布自由、サンプル複雑度。無制限クラスのNo-Free-Lunch有限模型 |
| SLT1-03 | 固定/有限仮説ならなぜ保証できるか | HDP1のHoeffding＋union bound。固定$h$からランダムなERMへ移る際の論理の検算 |
| SLT1-04 | 一様収束がERMに何を与えるか | $\sup_h|R-\widehat R|$の事象からERM excess risk $2\varepsilon$、realizableでの$\varepsilon^{-1}$型との比較 |
| SLT1-05 | 有限クラスでなくても複雑度を測れるか | shattering、growth function、VC次元。閾値・区間・軸平行矩形の実計算 |
| SLT1-06 | VCが有限だと何が有限になるか | Sauer–Shelah補題を削除/縮約の再帰から証明、成長関数と多項式界 |
| SLT1-07 | VCから一様汎化界を出すには | ghost sample・symmetrization・組合せ数と集中による有界損失0–1クラスの汎化界 |
| SLT1-08 | VC次元は学習可能性に必要か | 二値分類・iid・分布自由の限定でVC有限性とagnostic PACの同値へ向かう下界。無限VC反例 |
| SLT1-09 | 関数値を直接近似すると何が変わるか | 被覆数・packing・epsilon-net、経験計量と母集団計量の相違、entropyによる有限化 |
| SLT1-10 | 標本符号による複雑度とは何か | ghost sampleを用いるRademacher symmetrizationを全展開、経験/期待Rademacherの定義と界 |
| SLT1-11 | 損失の合成に複雑度を移せるか | contractionのLipschitz・零点条件、線形・margin関数クラスのノルム制約と実計算 |
| SLT1-12 | なぜ標準的な平方根率より速いことがあるか | Bernstein/margin/局所化の追加条件、有限局所クラスでの速い率の模型証明。無条件のfast rateを禁ずる |
| SLT1-13 | モデル選択・正則化の統計的根拠は | penalized ERMのbasic inequalityからoracle inequality。近似/推定/最適化誤差を分離 |
| SLT1-14 | 仮説全体を評価せず算法を保証できるか | replace-oneとleave-one-outを区別しuniform stabilityから**期待**generalization gapへ。高確率は別条件 |
| SLT1-15 | 学習後に分布を選んでも保証できるか | prior/posteriorの違い、change-of-measureとKL、独立なpriorを使う有界損失PAC-Bayes型不等式 |
| SLT1-16 | サンプル複雑度の下限はどう示すか | binary testing、Le Cam、Fanoの有限模型。距離・KL・packingの前提を明示し上界と比較 |
| SLT1-17 | 具体的なモデルで理論はどこまで鋭いか | 有限辞書、線形分離、ridge/線形予測のVC・Rademacher・stability比較。square lossの扱いに注意 |
| SLT1-18 | どの保証をいつ使うべきか | 主要定理の仮定/結論/下界比較、非iid・データ依存クラス・非有界損失で壊れる箇所を再証明 |

**主要証明の下限**：有限仮説のsample complexity、Sauer–Shelah、VC一様界、Rademacher symmetrization・contraction、ERM oracle、uniform stabilityの期待保証、PAC-Bayesの単純な一形式、有限Le Cam/Fano模型を、名称引用だけで完了させない。完全一般論に高度な経験過程が必要なら、証明済みの有限・可算模型を正本にし一般化を停止線として明示する。

## 4. SLT2：高次元・過剰パラメータと深層模型の条件付き理論（18章）

| 章ID | 中心問い | 本文で再導出する主要結果・反例 |
|---|---|---|
| SLT2-01 | パラメータが標本より多いと何が変わるか | rank-nullity、$p>n$の補間可能性の条件、row/null space、標本雑音と非識別性 |
| SLT2-02 | 補間解のうち何が選ばれるか | SVDから最小Euclidノルム解 $X^\dagger y$、full-row-rank時の $X^T(XX^T)^{-1}y$、初期値0のgradient flowが選ぶ解 |
| SLT2-03 | ridgeの正則化が何を抑えるか | spectral filter $\sigma_j/(\sigma_j^2+\lambda)$、固定設計下のbias/variance・prediction riskの分解 |
| SLT2-04 | double descentはいつ現れるか | Gaussian等方設計など限定した模型で補間閾値近傍の逆Gram行列とrisk、非等方・正則化で曲線が変わる反例 |
| SLT2-05 | 高次元ランダム行列評価の前提は | HDP7/8から非漸近特異値・共分散誤差を適用、非漸近/比例漸近、固定$p$/$p/n\to\gamma$を区別 |
| SLT2-06 | 勾配流は何を正則化するか | 線形平方損失の特異モードごとの $1-e^{-t\sigma_j^2}$、early stoppingとridgeの相違 |
| SLT2-07 | kernel補間の統計量は何か | RKHSの有限Gram行列、核勾配流、正則化・有効次元・重複固有値の扱い |
| SLT2-08 | NNをいつ線形化できるか | 2層網のパラメータJacobian、Taylor remainder、初期NTKのGram行列を具体計算 |
| SLT2-09 | kernelが固定なら学習を解けるか | 二乗損失と固定正半定値Gram行列で $\dot f=-K(f-y)$ を解く。零固有値・learning rate・初期出力を明示 |
| SLT2-10 | 無限幅でNTKが固定と言えるのはいつか | 初期化・幅・パラメータ化・入力集合・学習時間の仮定を列挙。証明できる有限入力/浅い網の収束と一般深層定理を区別 |
| SLT2-11 | 無限幅Gaussian processとNTKは同じか | 初期NNGP共分散の有限入力再帰とNTK再帰を別計算、学習中の関数分布を初期GPと混同しない |
| SLT2-12 | 幅の極限と学習時間の極限は交換できるか | 有限幅誤差、学習時間、スペクトルgap依存を対照。極限順序を変えることが許されない反例/限定命題 |
| SLT2-13 | 多数ニューロンを確率測度で表せるか | 2層網の粒子分布と出力の積分表示、$1/m$と$1/\sqrt m$の違い、粒子勾配の連続極限の形式計算 |
| SLT2-14 | mean-field勾配流はいつ成立するか | 連続性方程式・弱形式・Wasserstein勾配の変分計算。存在・一意性・大域収束は十分条件を別に提示 |
| SLT2-15 | SGDを拡散近似してよいのはいつか | 条件付き勾配雑音の共分散、Euler–Maruyamaとの比較、有限step/noise・非Gaussian・時変ミニバッチの停止線 |
| SLT2-16 | flat minimaが汎化を保証するか | Hessianの局所2次近似、スケール変換でsharpnessが変わる具体例、同値な予測関数での座標依存性 |
| SLT2-17 | 情報や圧縮で別の界を作れるか | KL・相互情報・圧縮記述長の模型境界。data-dependent priorと独立性、期待/高確率保証を区別 |
| SLT2-18 | 分布が変わると何が保証されないか | covariate shift、support不一致、同一train分布/異なるtestラベルの不可能例。SLT I/IIの保証表で総括 |

**SLT2の停止線**：一つの線形/Gaussian設計のdouble descentを任意の深層網に移植しない。有限幅でのTaylor近似から無限時間のNTK一定性を推論しない。mean-fieldの形式的方程式から確率測度上の解の存在や非凸目的の大域収束を自動結論しない。SGDの小step近似を任意の学習率・バッチ・長時間へ延長しない。

## 5. 主要な定理の「検算契約」と反例

本章群で少なくとも次を出発点から紙上で計算できるようにする。係数・分母・定義域の異なる流儀を混在させない。

1. **finite PAC**：固定$h$に対し $P(|\widehat R-R|>\varepsilon)\le2e^{-2n\varepsilon^2}$（iid、$[0,1]$）を確認し、有限 $\mathcal H$ では $2|\mathcal H|e^{-2n\varepsilon^2}$。realizableなconsistent ERMの片側boundは別に導き、$\varepsilon^{-2}$と$\varepsilon^{-1}$を混同しない。
2. **ERM**：$\sup_{h\in\mathcal H}|\widehat R-R|\le\varepsilon$ の上で $R(\widehat h)-\inf_{h\in\mathcal H}R(h)\le2\varepsilon$。最小値が達成されない場合は近似最小列で説明。
3. **VC/entropy**：shatter coefficientを数える際の標本重複・実数値クラスへの拡張の違いを確認。VC次元とpseudo-dimension、被覆半径と$(L_1,L_2,L_\infty)$を混ぜない。
4. **symmetrization/Rademacher**：$\mathbb E\sup_h(R-\widehat R)$ の期待値でghost sampleと符号交換を導く。単一関数の集中を標本依存選択へ直接適用しない。contractionのLipschitz・零点調整を明記。
5. **PAC-Bayes**：事前分布は原則訓練標本と独立、事後分布は標本依存可。KLが無限ならその形の界は有益でない。log-moment/Markovとchange-of-measureの向きを検算。
6. **最小ノルム補間**：$XX^T$可逆はfull row rank条件。一般rankではMoore–Penrose擬似逆を用い、任意$y$の完全補間ができるとは言わない。行空間と核が直交することから最小性を証明。
7. **kernel flow**：損失の規格化に応じて $K$ または $K/n$ の因子を固定し、$\dot f=-K(f-y)$ の解で零固有値成分は減衰しないことを直接計算。
8. **反例の分類**：同一training riskでもtest riskが違う有限分布、無限VC、非iid複製、非有界損失、label shift、NTKの小eigengap、層の再パラメータ化を「失った仮定」と対で示す。

## 6. 読順と学修上の枝分かれ

~~~text
ML1-01〜03 + 確率・HDP1 → SLT1-01〜04（有限PAC）
                         ↓
組合せ論 → SLT1-05〜08（VC）
                         ↓
HDP4/6/10 → SLT1-09〜12（entropy/Rademacher/速い率）
                         ↓
OPT/RKHS・INFO → SLT1-13〜18（算法保証・PAC-Bayes・下界）

ML1-04/05・LA → SLT2-01〜06（高次元線形模型）
         ↓
RKHS・ML1-18 → SLT2-07〜09（kernel/有限NN）
         ↓
ML2-12〜14 → SLT2-10〜12（NTK/NNGP）
         ↓
確率測度・必要な最適輸送 → SLT2-13〜15（mean-field/SGD）
         ↓
SLT1の必要結果・INFO → SLT2-16〜18（汎化の限界）
~~~

これは推奨**読順**であって、全てを各chapter.yamlの直接prerequisiteに転写しない。例えばSLT2-02の擬似逆はSLT1-15のPAC-Bayesを要しない。各章が実際に使う結果の所有章を、執筆時にchapter.yaml・knowledge.yaml・stable anchorで確定する。

## 7. 章別演習・実験の設計

- **必須演習下限**：各新規章で理由付き例外がなければLevel A 4題、B 3題、C 1題以上、**全問の詳細解答**。下限を数合わせの目標値とせず、学修目的を網羅するために必要なら増やす。
- **SLT1の手計算**：有限仮説のPAC sample complexity、閾値・区間のVC、Sauerの二項和、簡単なRademacher平均、stabilityの一標本置換、2点prior/posteriorのKL、二分仮説のLe Cam下界。
- **SLT2の手計算**：$2\times3$ 設計の擬似逆と直交射影、ridgeの固有モード、最小ノルム補間の予測、2層網のJacobian/NTK Gram、半正定値核のgradient flow、2粒子mean-field、再パラメータ化前後のHessian。
- **動く比較実験**：有限クラスの$n,|\mathcal H|,\delta$、VCとoverfit、ridge/least-normの$p/n$・雑音・共分散スペクトル、幅$m$・step・seed・時間でNTK driftを再計算する。入力を変えて計算結果が変わる実験のみ対話型と呼ぶ。
- **比較実験の保存条件**：母集団生成式、train/test分割、出力雑音、seed、$n,p,m$、損失正規化、optimizer、step、停止時刻、期待値近似の反復数、定理適用条件、信頼区間/誤差棒。理論boundと実測riskを同じ確率量として混同しない。
- **評価軸**：学習器の予測損失、汎化gap、excess risk、training interpolation、核の固有値、線形化残差、NTK相対変化、反例が壊す仮定。複数seedと失敗ケースを表示し、恣意的な成功例だけを出さない。

共通数値実験基盤は実装済み部分を着手時に確認して利用する。表・図・実験の再現は主要証明の代用にはしない。図を追加する場合はauthoring standardのSVG・アクセシビリティ規約に従う。

## 8. 実装・査読・完了ゲート

1. **本PRはPLAN設計だけ**を改訂する。状態はtextbook/plans/のまま。章本文・chapter.yaml・knowledge.yaml・未存在のSLT系列manifestを捏造しない。
2. 最初のSLT固有章の着手時に本PLAN、ML/HDP/RKHS/OPT/INFO、直接使用するchapter.yaml/knowledge.yaml、knowledge DAG、章IDの衝突・下流依存を確認。series manifestを作り、PLANをtextbook/plans_progress/へ**移動**、manifestのplan参照を同時更新する。
3. 章進行はSLT系列manifestの先頭から連続するcompletedの次のplanned。共通routingや他系列manifestへ単一のactive workを書かない。
4. 新規章/実質改稿はDREAM_THEATER_AUTHORING_STANDARDの区分Cで、主要定義・全主要定理と全演習詳細解答を棚卸しし、**自己再計算と別観点での全体再読**を区別して記録。局所修正B、表示のみAは同規約に従う。同一担当の再読を第三者独立査読とは呼ばない。
5. 本文は動機→通常文の初出導入→formal statement→直接例→仮定と核心証明→反例→演習解答の順を守る。使った既存結果の**使用箇所**に実在するstable anchorリンクを付け、定義語の使用順、量化、測度可能性、極限順序を点検する。
6. 章の内容に応じてchanged-only validation、formal/proof、演習数、concept/knowledge、KaTeX、参照・公開Pages、実表示と実験テストを確認。共通的影響のある変更はfull validationへ昇格。
7. SLT1の完了はPAC→VC→Rademacher→安定性/PAC-Bayes→minimaxの主要証明と反例が閉じた状態。SLT2は線形補間→kernel→NTK/NNGP→mean-field→不可能性を**模型別の適用条件つき**で閉じた状態。下流参照・公開導線・横断査読の残件がゼロになって初めてPLANをplan_done/へ移動する。
8. **別の完成章の追跡監査はユーザーが章IDを指定したときだけ**行い、新章執筆に自動付帯しない。

章数、定理名、形式的marker、CI greenだけを完成証拠としない。
