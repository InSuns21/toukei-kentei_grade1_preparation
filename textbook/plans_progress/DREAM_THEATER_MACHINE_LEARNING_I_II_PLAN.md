# DREAM THEATER 機械学習 I・II（ML1・ML2）

改訂日: 2026-10-14  
状態: in_progress（科目固有の着手準備・前提照合・series manifest初期化済。全46章の本文は未執筆）

## 0. 中心問い・学習範囲

**機械学習I：** 有限の観測からどの予測問題を定式化し、損失・最適化・モデル選択・検証をどう正当化するか。  
**機械学習II：** 確率分布と潜在変数で予測・推論・不確実性・表現・生成をどう統一し、どの仮定なら算法の式を保証できるか。

主線は **ML1-01〜ML1-21（21章）→ML2-01〜ML2-25（25章）、合計46章**。これは今回確定した執筆予定章数であって、15週/90分/セメスターへの数合わせではない。章を執筆して教育上の不整合が判明した場合はPLANとseries manifestを同時に改訂し、正式な章ID・数を黙って変えない。

ML I/IIは「学習の問題設定、予測モデル、確率推論、計算の数理」を所有する。**PAC/VC/Rademacherによる一般的な学習可能性・汎化界はSLT I/II**、一般の集中不等式はHDP、SVM双対/カーネル表現定理は既存RKHS、凸最適化の一般定理はOPT、多様体点群と等変学習はMFL、物理法則やPINNはPMLを正本とする。MLは**必要な定義・適用仮定・具体的な代入/実験**を所有し、既存正本を丸ごと再証明しない。

## 1. 教科書との照合と改訂根拠

| 比較資料（版/出版社） | 確認した射程 | 本改訂に反映した点 |
|---|---|---|
| Kevin P. Murphy, Probabilistic Machine Learning: An Introduction (MIT Press, 2022) | 決定理論、線形模型、ニューラルネット、非パラメトリック法、アンサンブル、PCA/クラスタリング | ML Iの生成的分類・kNN・model selection・評価体系、ML IIへの予測確率の橋渡し |
| Kevin P. Murphy, Probabilistic Machine Learning: Advanced Topics (MIT Press, 2023) | グラフィカルモデル、EM、VI、Monte Carlo/MCMC、確率的深層モデル | ML IIでELBO前の潜在構造、importance/MCMC、確率的予測を明示 |
| Hastie, Tibshirani, Friedman, The Elements of Statistical Learning, 2nd ed. (Springer, 2009) | 線形回帰/分類、正則化、平滑化、評価・選択、木/boosting | ML Iのlasso、bias–variance、検証、アンサンブル・非線形手法を補強 |
| Shalev-Shwartz & Ben-David, Understanding Machine Learning (Cambridge, 2014) | 学習問題、正則化・SGD・検証、PAC/VC/Rademacher | MLで算法/反例を扱い、一般理論の証明はSLTへ切り分け |
| Mohri, Rostamizadeh & Talwalkar, Foundations of Machine Learning, 2nd ed. (MIT Press, 2018) | 汎化、SVM、カーネル、boosting、安定性 | 正本重複を防ぎSLT/RKHSへ接続 |
| Christopher M. Bishop & Hugh Bishop, Deep Learning: Foundations and Concepts (Springer, 2024) | 逆伝播、正則化、CNN、Transformer、latent models、flow | ML IIのNN→系列→attention/Transformer→生成モデルの不足を補強 |

出版社/著者の確認先：
- https://mitpress.mit.edu/9780262046824/probabilistic-machine-learning/
- https://probml.github.io/pml-book/book2.html
- https://link.springer.com/book/10.1007/978-0-387-84858-7
- https://www.cambridge.org/core/books/understanding-machine-learning/30597C90E85C1D0A91AEBB610F19CB4F
- https://mitpress.mit.edu/9780262039406/foundations-of-machine-learning/
- https://link.springer.com/book/10.1007/978-3-031-45468-4

比較の結果、旧15項目を単純に増やすのではなく、**証明・直接例・数値実験の単位で46章へ具体化**した。特に過去案の「普遍近似」「拡散」「校正」の名前だけで数理仮定を済ませる運用は採らない。

## 2. 前提照合・canonical ownershipと停止線

着手準備として現行GitHubの章metadataと既存正本を照合済み：OPT1（凸性）、OPT2（射影・分離）、OPT6（KKT）、RKHS1（再生核）、RKHS2（表現定理）、RKHS3（カーネルリッジ）、RKHS4/5（SVM）、INFO2（KL・Gibbs）、HDP1（Hoeffding）ならびに系列の配置を確認した。これらは実在するが、本PLANの章が存在することを意味しない。

- **最初の着手ML1-01：** 有限ラベル/有限標本の学習問題から開始。集合・写像、確率変数・期待値、有限次元ベクトルの既習結果だけを用いる。無限次元条件付き期待値やPAC/VCを入口の暗黙前提にしない。個々のstable anchorとprerequisites IDは執筆開始時に対象の最新chapter.yaml・knowledge.yamlで確定する。
- **OPT/LA：** 一般最適化・SVD・近接法の定理は既存正本が証明所有者。ML1-04〜10は設計行列・データ集合への適用、階数・歩幅・凸性条件を明示する。
- **RKHS：** RKHS1〜5が核構成、表現定理、KRR、最大マージン、ソフトマージンの証明正本。ML1-17/18とML2-12は固有の学習問題・確率解釈・検証を担当する。
- **INFO：** INFO2/INFO10のKL・対数損失の既出結果を使い、ML1/ML2の対数損失・ELBOに適用する。連続密度の台や有限性が必要なら現行の正本と照合し、不足範囲は局所的に証明する。
- **確率解析/MC：** MCMCのMarkov核・詳細釣合いは本PLANで必要模型を導出する。MCや確率論・STOの既出結果は再利用し、連続時間の時間反転SDEを初歩的な離散拡散から無条件には結論しない。
- **SLT/HDP/MFL/PML：** 高次元一様収束・PAC-Bayes・NTK一般保証はSLT、幾何的等変模型はMFL、Langevinの物理的解釈やPINNはPMLへ送る。未実装科目は証明済みとして使用しない。

## 3. 確定章立て：機械学習 I（21章）

| 章ID | 主題 | 本文で必ず閉じる核心計算・証明/実験 | 主な前提 |
|---|---|---|---|
| ML1-01 | 学習問題・標本・予測器 | 訓練標本・特徴量・目的変数・仮説クラス・母集団/経験リスクを有限例で構成し、独立標本と非独立標本を区別 | 確率変数と期待値・有限次元線形代数 |
| ML1-02 | Bayes決定則と損失関数 | 有限ラベルの0–1損失・非対称損失の条件付きリスクを直接最小化し、Bayes分類則と誤分類費用の閾値を導出 | ML1-01・基礎確率 |
| ML1-03 | 経験リスク最小化と正則化 | ERMと母集団リスクを区別し、正則化目的・制約形式・モデル容量を二次模型で比較；汎化保証はSLTへ | ML1-02・OPT1 |
| ML1-04 | 最小二乗法・正規方程式・非一意性 | 勾配から正規方程式を導き、フルランク解・退化時の解集合と最小ノルム解を区別 | ML1-03・LAの直交射影/SVD |
| ML1-05 | Ridge回帰・縮小・bias–variance | λ>0の一意性と特異値方向の縮小を証明し、固定デザインでbias–variance分解を計算 | ML1-04・LAのスペクトル分解 |
| ML1-06 | Lasso・疎性・近接写像 | 1次元/直交デザインのsoft-thresholdingを劣微分から導き、ridgeとの差を解析 | ML1-05・OPTの劣微分/近接法の必要結果 |
| ML1-07 | 生成的分類・Naive Bayes・LDA/QDA | Bayes公式で識別則を構成し、共分散共有で線形・非共有で二次判別境界になることを計算 | ML1-02・多変量正規分布 |
| ML1-08 | Logistic/softmax回帰・対数損失 | 負の対数尤度の勾配/Hessianと凸性を導出し、完全分離時に有限最適解がない例を示す | ML1-02・ML1-07・OPT1 |
| ML1-09 | 滑らかな凸損失と勾配法 | L-Lipschitz勾配の下降補題から適切な歩幅の単調性と凸の場合の関数値上界を証明 | ML1-08・OPTの勾配法 |
| ML1-10 | 確率的勾配法・ミニバッチ | 一様抽出時の勾配推定の不偏性と分散を有限和で導き、定数歩幅と誤差床の境界を区別 | ML1-09・確率の分散計算 |
| ML1-11 | k近傍法・核密度推定 | 距離・近傍・bandwidthの効果を具体データで計算し、高次元における距離集中の簡単な反例を扱う | ML1-02・有限次元距離 |
| ML1-12 | 検証分割・交差検証・モデル選択 | train/validation/testの用途、k-fold/nested CVの手順を明示し、テスト再利用と前処理漏洩を反例化 | ML1-03・ML1-10 |
| ML1-13 | 分類評価・適切なスコア・校正 | Brier/log scoreの真の分布に対する最適性、ROC/PR・閾値・校正を区別し、クラス不均衡例を計算 | ML1-02・ML1-08・INFO2/INFO10の必要結果 |
| ML1-14 | 決定木・分割不純度 | 条件付き頻度からGini/entropy減少を計算し、木の深さと訓練誤差・予測安定性を比較 | ML1-12・ML1-13 |
| ML1-15 | Bagging・random forest・bootstrap | ブートストラップ標本と平均化を構成し、分散削減が予測間共分散に依存する式を導出 | ML1-14・分散/共分散 |
| ML1-16 | Boosting・加法モデル | AdaBoostの指数損失・正規化定数・学習訓練誤差上界を有限標本で導出 | ML1-14・指数関数/対数 |
| ML1-17 | SVMの予測とマージンの適用 | マージン、ヒンジ損失、ソフト/ハードマージンをデータで計算；双対・KKT本体はRKHS4/5を参照 | ML1-08・RKHS4/5・OPTの該当結果 |
| ML1-18 | カーネル回帰と正則化経路 | 表現定理とGram行列をRKHS2/3から引用し、予測・λ依存・特異Gramの意味を再計算 | ML1-05・RKHS1–3 |
| ML1-19 | PCA・SVD・低ランク近似 | 中心化標本から主成分を導き、残差平方和と特異値の関係・ランク制限による損失を計算 | ML1-04・LAのSVD |
| ML1-20 | k-means・階層クラスタリング | 割当/重心更新が目的を非増加にすることを証明し、初期値と非凸性・階層法との差を示す | ML1-19・有限次元距離 |
| ML1-21 | 分布シフト・欠測・総合検証実験 | covariate/label shift、MCAR/MAR/MNAR、訓練・検証時の前処理を区別し、固定seedの合成データで全手法を統制比較 | ML1-12/13/15/20・基礎確率 |

## 4. 確定章立て：機械学習 II（25章）

| 章ID | 主題 | 本文で必ず閉じる核心計算・証明/実験 | 主な前提 |
|---|---|---|---|
| ML2-01 | 確率的予測・対数損失・KL | 有限/密度模型のsupport条件を付し、期待対数損失とKLの差を導出して確率校正の基礎を作る | ML1-02/13・INFO2/INFO10 |
| ML2-02 | Bayes線形回帰・事後予測 | 正規共役模型の平方完成で事後平均/共分散を求め、予測分散をパラメータ/観測雑音へ分解 | ML1-05・条件付き正規分布 |
| ML2-03 | 指数型分布族と共役性 | 対数分配関数の微分を期待値・共分散に対応づけ、正則性と台が固定である条件を検査 | ML2-02・積分微分交換の条件 |
| ML2-04 | 確率的グラフィカルモデル | 有限Bayesネットの同時分布因子分解、条件付き独立、簡単な周辺化とsum-productを計算 | ML2-03・条件付き確率 |
| ML2-05 | 潜在変数・混合モデル・識別不能性 | 潜在カテゴリを周辺化して混合尤度を作り、responsibilityとラベル交換の不識別を具体化 | ML2-04・多変量正規分布 |
| ML2-06 | EM算法と尤度の単調改善 | Jensen不等式と補助関数からE/Mステップ、厳密な改善条件・停留点と大域最適の違いを証明 | ML2-05・Jensen不等式 |
| ML2-07 | 連続潜在因子・因子分析・PPCA | 線形Gaussian潜在変数の積分で観測共分散を導出し、回転不識別とPCAとの関係を整理 | ML2-02/05・ML1-19 |
| ML2-08 | 変分推論の基礎・ELBO恒等式 | log evidence = ELBO + KLの正確な恒等式、有限/連続のsupport条件と等号条件を導出 | ML2-01/05・INFO2 |
| ML2-09 | Mean-field変分Bayes・再パラメータ化 | coordinate最適更新式を正規化まで導き、Gaussian再パラメータ勾配の交換条件を確認 | ML2-08・条件付き期待値/微分積分交換 |
| ML2-10 | Monte Carlo・重要度サンプリング | 重み付き推定の期待値・分散、自己正規化の偏りとeffective sample sizeの限界を例示 | ML2-08・MC既存正本の必要章 |
| ML2-11 | MCMC・Metropolis–Hastings・Gibbs | 受理率から詳細釣合いと不変分布を直接証明し、既約性/非周期性・混合診断の限界を区別 | ML2-10・Markov連鎖基礎 |
| ML2-12 | Gaussian process回帰と不確実性 | PSD共分散の有限次元整合性とGaussian条件付けから予測平均/分散を導出；RKHSとの違いを明示 | ML2-02・RKHS1/3 |
| ML2-13 | 多層perceptron・表現力と限界 | ReLUネットの構成を具体化し、1変数区分線形補間による近似を証明；一般の普遍近似を無条件に主張しない | ML1-08・RAの連続性 |
| ML2-14 | 逆伝播・自動微分・Jacobian | ベクトル/行列の次元を追って連鎖律と逆モード微分を導出し、有限差分で勾配を検算 | ML2-13・LA/多変数微分 |
| ML2-15 | 深層最適化・正則化・汎化検証 | 学習率・weight decay・early stopping・dropout・train/evalの差を模型で検証；非凸収束と汎化を混同しない | ML2-14・ML1-09/10/12 |
| ML2-16 | 畳み込みネットワークと等変性 | 離散畳み込みの重み共有と平行移動等変性を証明し、padding/stride/境界での破れを例示 | ML2-14・離散信号/線形作用 |
| ML2-17 | 系列模型・再帰ネットワーク | 状態更新・展開計算グラフを構成し、反復Jacobian積から勾配消失/爆発の例を導出 | ML2-14/16 |
| ML2-18 | Attention・Transformerの演算 | scaled dot-product attention、mask、multi-head、位置情報、residualを次元付きで導き、位置情報なしの置換同変性を示す | ML2-14/17 |
| ML2-19 | 自己教師あり表現学習 | 対照損失・正例/負例の選択・augmentation不変性を数式化し、InfoNCEの情報界を仮定抜きで引用しない | ML2-18・INFOの必要結果 |
| ML2-20 | 変分autoencoder | encoder/decoderからVAEのELBOを導出し、Gaussian再パラメータと再構成項・KLを計算 | ML2-08/09/14 |
| ML2-21 | 正規化flow・密度変換 | 微分同相の変数変換とlog Jacobianを適用し、可逆層の限界・supportの違いを説明 | ML2-01・多変数積分 |
| ML2-22 | 敵対的生成モデルと分布比較 | 固定生成分布で最適識別器を計算し、密度/support条件下のJensen–Shannonとの関係を導く | ML2-01・ML2-14 |
| ML2-23 | Score matchingとノイズ除去 | 積分部品の境界条件からscore matching恒等式を導き、Gaussianノイズ付加時のdenoising関係を検算 | ML2-01/21・多変数微分/積分 |
| ML2-24 | 離散拡散模型と逆向き推論 | 正方向Gaussian noising・条件付き事後分布・学習損失を導出；連続時間逆SDEはSTOを満たす発展節に限定 | ML2-20/23・Gaussian条件付け |
| ML2-25 | 生成評価・不確実性・統合実験 | log likelihood・サンプル品質・校正・OOD・計算量を別指標で比較し、seed/分割/再計算可能な結論をまとめる | ML2-06/12/18/20/21/22/24 |

## 5. 実装順・演習・再現可能な実験

**読順はseries manifestの上から。ML2-01はML1-21の後に着手する**。原則同系列の前講を自然な前提とし、章ごとに必要な直接prerequisitesだけをchapter.yamlへ登録する。ML Iの全章をML IIの全章に形式的な直接前提として列挙しない。

全章で導入→定義の直接例→仮定付き命題→核心証明→詳細解答を備える。演習は**原則A4/B3/C1を最低数**として主要learning objectivesに十分な題数を足す。非自明な二段以上の代数変形、勾配/Jacobian、対数密度の支持条件、独立性、極限・期待値交換を読者に丸投げしない。完了本文には適用箇所でcanonical stable anchorへリンクする。計画段階の表の「証明」は自動チェック済みという意味ではない。

計算実験は書式だけの図やSVGアニメではなく、**実際の損失・学習・推論・推定値を更新するプログラム**にする。少なくとも以下をシリーズを通じて再利用する：

1. 同じ固定seedの合成データ、真の生成パラメータ、train/validation/test固定分割を用いて線形・非線形予測を比較。検証データをモデル選択へ使った場合は独立testへ再評価する。
2. rank欠損、完全分離、正則化係数0付近、非凸初期値依存、クラス不均衡、欠測/分布シフトなど**証明の仮定を失わせた対照実験**を入れる。
3. ML IIではEMの尤度推移、VIのELBO、MCMCの自己相関、GP予測分散、逆伝播の有限差分検査、VAE/flow/diffusionのサンプル・対数尤度可能性を区別する。
4. 各実験にseed・分布・ハイパーパラメータ・乱数と分割の固定・評価指標・基準実装・計算量/失敗条件を残す。ブラウザ実装時は既存サイトの検証規約に従い実際の数値計算でテストする。特定言語をPLAN段階で強制しない。

## 6. 着手手順（次担当が追加設計なしでML1-01を書ける状態）

1. series manifest textbook/dream-theater-series/ML.yaml の先頭未完了ML1-01を読み、パス textbook/volumes/dream_thater/応用系/ML/ML1-01 に章を作る。予定章を本文や公開索引へ事前登録しない。
2. DREAM_THEATER_AUTHORING_STANDARD.md、対象に近いAGENTS.md、既存の確率・線形代数のchapter.yaml/knowledge.yamlを確認し、ML1-01のprerequisites・learning objectives・新規concept ownerを実在IDで確定する。
3. ML1-01では有限特徴空間/二値分類の例から始め、(i)観測分布P(X,Y)、(ii)独立な訓練標本、(iii)仮説f、(iv)損失l、(v)母集団リスクと経験リスク、(vi)その差の意味を定義・直接計算する。確率的保証は次章以降の見通しとして区別し、SLTの定理を先取りしない。
4. 書籍の章題写しやコード断片の転載は禁止。標準のformal statement・proof・A/B/C詳細解答を整え、変更区分Cとして全主要証明・全演習を再計算した自己査読と別観点の再読を実施する。
5. 実装完了後は当該章・knowledge metadata・系列manifest（その章だけcompleted）・公開導線を同一PRで更新する。通常のleaf chapterはchanged-only検証、globalに波及する変更はfull validationへ昇格する。**別の完成済み章の追跡監査は明示依頼時のみ**で、直前章だからといって自動追加しない。

## 7. 現時点の完了判定

- 完了：教科書比較、対象章IDと順序の決定、既存canonical章の存在確認、ML series manifestの初期化・PLAN経路の整合。
- 未完了：ML1-01〜ML2-25の46章すべての本文・演習・詳細解答、章単位metadata、公開index、全章横断査読。予定章はどれも公開済/実装済と扱わない。
- PLANは実装開始準備に着手したためplans_progress/に移し、章執筆が始まるまで全章plannedとする。最初の次作業は一意に**ML1-01**。

完了条件は全46章の内容/証明/演習と学習目標、既出結果リンク、最終検証・横断監査、公開導線の整合で判定する。講数だけを満たしたら完了とする運用は採らない。
