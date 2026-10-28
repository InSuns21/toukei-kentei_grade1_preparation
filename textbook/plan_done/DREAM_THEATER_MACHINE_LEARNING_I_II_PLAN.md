# DREAM THEATER 機械学習 I・II（ML1・ML2）

改訂日: 2026-10-14  
状態: completed（2026-10-28。全46章・ラボ要件・最終横断確認を実装し、系列manifestと公開導線を照合）

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
- https://www.cambridge.org/core/books/understanding-machine-learning/3059695661405D25673058E43C8BE2A6
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
| ML2-23 | Score matchingとノイズ除去 | 部分積分の境界条件からscore matching恒等式を導き、Gaussianノイズ付加時のdenoising関係を検算 | ML2-01/21・多変数微分/積分 |
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

## 5A. 章別のシミュレーション・可視化仕様（2026-10-14追補）

**目的は図の枚数でなく、実際に学習・最適化・推論を動かしたときの理解である。** 本文の証明を計算機実験で代用しない。章ごとの学習目標に対応する計算・観測を具体化し、描画しても理解が増えない場合は静的補助図の水増しをしない。

### 5A.1 採用する2つの実装モード

- **対話**（優先する体験型教材）：学習者がパラメータを変更し、最適化・標本抽出・推論などの**数値カーネルを再実行**して、計算された結果をグラフ/点群/密度/決定境界/反復ログへ反映する。再生/一時停止/1反復送り/リセットは反復模型に設ける。事前に保存したフレームのアニメーションや、パラメータだけ変わる飾りSVGをシミュレーションと称しない。
- **計算**（通常の計算実験＋可視化）：式を手動実装または既存正本から呼び出し、乱数seed/入力を変更したときに実行結果の値・図が変わるPythonラボを基本とする。理論の導出が核心なら既存`python-lab` / `python-solution` / `python-test`（NUMERICAL_LAB_AUTHORING_STANDARD）に準拠する。計算に必然性のない箇所は静的図でよい。
- これらは**設計時に決めた目標モード**であり、46章分が既に実装されているという表示ではない。初版で対話UIが未完成なら、動く計算ラボを別成果物として追加し、必要な対話ラボは未完了として明記する。全章一律に大規模UIを新造せず、同一のサンプリング・最適化・グラフ部品を再利用する。

### 5A.2 機械学習 I の計算・観測対応表

| 章 | モード | 動かせる量 | 数値的に観測するもの |
|---|---|---|---|
| ML1-01 | 対話 | 母集団の有限分布、標本数 n、仮説・乱数seed | 標本点・経験リスクと正確に列挙した母集団リスク、反復標本間の変動 |
| ML1-02 | 計算 | 誤分類費用・クラス事前確率・条件付き確率 | 条件付きリスク曲線とBayes閾値、費用変更時の決定領域 |
| ML1-03 | 計算 | 仮説集合・正則化係数 | 訓練リスクと正則化目的の比較、仮説選択の変化 |
| ML1-04 | 対話 | 点群配置・外れ値・列の線形従属性 | 直線/平面フィット、残差・階数、退化時の非一意性 |
| ML1-05 | 対話 | ノイズ強度・ridge係数・相関 | 係数経路、真の係数と推定係数、反復時のbias/variance |
| ML1-06 | 計算 | 直交デザイン・L1係数 | soft-thresholdingと係数消滅、L2との比較 |
| ML1-07 | 計算 | クラス平均・共分散・事前確率 | Naive Bayes/LDA/QDAの決定境界と仮定の差 |
| ML1-08 | 対話 | 分類点群・学習率・正則化・完全分離の切替 | logisticの境界、損失・パラメータノルム、分離時の発散傾向 |
| ML1-09 | 対話 | 初期値・ステップ幅・Hessian固有値 | 二次損失の等高線上の勾配軌道と目的値、安定/不安定歩幅 |
| ML1-10 | 対話 | batch size・seed・学習率 | SGDの経路のばらつきとfull-batch比較、勾配分散 |
| ML1-11 | 計算 | 近傍数k・核bandwidth・外れ値 | 決定境界・密度曲線・近傍距離、過平滑/過適合 |
| ML1-12 | 対話 | 前処理方法・モデル候補・分割・再利用回数 | CV/holdout誤差の揺れと独立test、漏洩による楽観バイアス |
| ML1-13 | 対話 | 予測確率・閾値・不均衡率 | 校正図、ROC/PR、混同行列とBrier/log損失 |
| ML1-14 | 計算 | 点群・木の深さ・分割点 | 分割領域、Gini/entropy減少と訓練/検証誤差 |
| ML1-15 | 計算 | 再標本化seed・木の数・相関 | bagging前後の予測分散、木ごとの予測・分散減少の限界 |
| ML1-16 | 計算 | 弱学習器・反復数・分類点群 | 重み更新・margin分布・指数損失の推移 |
| ML1-17 | 計算 | 分離可能性・C・カーネル幅 | margin・サポートベクトル・分類境界（最適化はRKHS正本へ） |
| ML1-18 | 計算 | 核関数・λ・訓練点配置 | カーネル予測曲線、Gram固有値と係数経路 |
| ML1-19 | 対話 | 回転楕円点群・ノイズ・保持次元 | PCA軸、射影/復元、特異値と再構成誤差 |
| ML1-20 | 対話 | k・初期重心・seed・反復 | k-means重心移動、目的値の非増加、局所解の差 |
| ML1-21 | 対話 | 訓練/テスト分布の移動、欠測機構・seed | 予測誤差・校正・漏洩有無・適用外分布の変化 |

### 5A.3 機械学習 II の計算・観測対応表

| 章 | モード | 動かせる量 | 数値的に観測するもの |
|---|---|---|---|
| ML2-01 | 計算 | 真の確率分布・予測分布（零確率も許す） | 交差エントロピー・KL・log lossの台条件と値 |
| ML2-02 | 対話 | 事前分散・観測雑音・観測点 | Bayes線形回帰の事後平均/信用帯、予測区間の分散分解 |
| ML2-03 | 計算 | Bernoulli/Gaussianの自然母数 | log-partitionと一階・二階導関数の数値照合 |
| ML2-04 | 計算 | 有限BayesネットのCPT | 因子グラフ・条件付き独立・周辺化前後の確率表 |
| ML2-05 | 計算 | 混合比・平均・共分散 | 混合密度・responsibility・ラベル入替不識別 |
| ML2-06 | 対話 | 初期混合中心・成分数・seed | GMMのEM責務、平均移動、各反復log likelihood、局所停留点 |
| ML2-07 | 計算 | 潜在次元・観測雑音・回転 | PPCA再構成・共分散楕円と潜在回転不識別 |
| ML2-08 | 計算 | 単純な離散潜在模型と変分分布q | ELBO・log evidence・KLの恒等式を直接照合 |
| ML2-09 | 対話 | 初期q・座標更新順序・変分族 | mean-fieldの更新・ELBOと近似事後密度 |
| ML2-10 | 計算 | 提案分布・標本数・尾の重さ・seed | importance weights、推定値/分散、ESS指標の限界 |
| ML2-11 | 対話 | 提案幅・チェーン初期値・seed | MCMC trace、自己相関、受理率・burn-in/独立鎖比較 |
| ML2-12 | 対話 | kernel・長さ尺度・観測雑音・追加観測点 | GP事後平均・信用帯・共分散と外挿不確実性 |
| ML2-13 | 計算 | ReLU層数・幅・区分線形目標 | 関数近似・折点・訓練誤差（普遍近似定理とは区別） |
| ML2-14 | 対話 | 小型ネットの重み・入力・微小摂動 | 計算グラフと層ごとのJacobian/勾配、有限差分との差 |
| ML2-15 | 計算 | weight decay・early stopping・ノイズ・seed | 学習/検証曲線、ノルム、過適合と停止時刻 |
| ML2-16 | 計算 | 入力信号・畳み込み核・padding/stride | feature mapと平行移動前後の差分 |
| ML2-17 | 計算 | RNNの反復係数・系列長・入力 | 状態軌道・勾配ノルムの減衰/増大 |
| ML2-18 | 対話 | tokenベクトル・Q/K/V・mask・位置埋込み | attention行列・出力ベクトル・位置入替前後の応答 |
| ML2-19 | 計算 | 正例/負例・温度・augmentation | 対照損失・埋め込み配置とデータ漏洩の例 |
| ML2-20 | 対話 | 2次元潜在変数・事前分布・KL重み・seed | VAEのサンプリング/再構成、ELBO各項と潜在空間 |
| ML2-21 | 計算 | 可逆変換・スケール・初期密度 | 密度のpushforward、Jacobian補正と正規化確認 |
| ML2-22 | 計算 | 離散生成分布・識別器更新 | 生成/真の分布、識別器、JS divergenceとmode collapse例 |
| ML2-23 | 計算 | ノイズ強度・データ分布・seed | score場、denoisingベクトル場と密度勾配 |
| ML2-24 | 対話 | 拡散ステップ数・noise schedule・seed | 実計算した順/逆過程の標本雲、各時刻分布・再構成品質 |
| ML2-25 | 対話 | 生成方式・モデルseed・評価用別seed・データシフト | log likelihood可否・分布距離・品質/多様性・計算時間の比較 |

### 5A.4 共通実装の方針と既存基盤の利用

**共通Runtimeの正本：** [DREAM THEATER 対話型数値シミュレーション共通基盤](../plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md)。実行制御・Workerプロトコル・描画アダプター・実験の保存/export・ブラウザ試験は共通PLANを再利用し、本PLANは学習模型・サンプラー/最適化/推論・損失/校正/正確な観測指標を所有する。Phase 0/1のWorker基盤とML固有のJS数値モジュール/対話UIが実装された。全ラボが同じWorkerを利用するという意味ではなく、軽量な8模型はページ内JSで再計算する。

1. **Python数値カーネルを第一候補**：既存`pages/numerical-lab-worker.mjs`のPyodide、`pages/numerical-lab-runtime.js`のPythonラボを、アルゴリズム構成・勾配検査・一回の収束実験・Matplotlib図表で再利用する。既存UIは一回実行とPNG出力の契約であり、連続対話を実装済みと誤認しない。
2. **対話用UIは共通基盤の描画アダプターを利用**：入力→数値カーネルの再計算→実結果→表示の経路を共通化し、Canvas 2D / SVG / HTMLグラフ等は**計算結果の表示**にのみ使う。軽量な有限離散模型や2次元二次最適化はJSのML固有数値モジュールを許す。大きな行列計算・反復推論は計測の上でPyodide/NumPy Workerを使い、PythonとJSの混在時は固定模型で数値照合する。
3. **対話反復は共通WorkerホストにMLアダプターを接続**：共通PLANの`computeOnce` / `runBatch` / `pause` / `reset` / `dispose`、世代管理・例外・資源上限を利用する。Pythonラボの一回実行形式は維持する。SGD/EM/MCMCはそれぞれML固有の状態更新と観測値を実装し、ML固有の反復を物理時間と混同しない。
4. **複数章の再利用**：共通の`dataset generator`（真の生成分布と固定seed）、`model/optimizer stepper`（パラメータと診断列）、`plot adapter`（散布図・損失/精度曲線・密度・ヒートマップ）、`experiment record`（設定・seed・データ分割・バージョン）を分離。UIと学習カーネルの双方を独立にテストする。
5. **実験の保存・持ち運び**：seedと生成分布を固定して「同じ実験を再現」でき、別seedで「確率的変動を観測」できるようにする。JSON設定・CSV時系列・（必要時）静止画像のexportを想定し、個人データを既定で送信しない。まず小規模合成データでブラウザ単体動作とし、大容量学習/GPU/サーバーAPIは必須としない。
6. **資源とアクセス**：計算量、最大標本数、更新回数、Web Workerメモリ、ブラウザ応答性を制限。適切な停止/中断と処理中表示、キーボード操作、色以外の系列区別、数学記号・軸ラベル・単位・凡例、タブレット/狭幅でも図と操作が衝突しないことを確認する。表示FPSは学習ステップ数/数学的時間とは独立であり、隠れた間引きや補間を精度として見せない。
7. **再利用する固定検証模型**：ML1-01の有限母集団の厳密リスク、ML1-04の正規方程式、ML1-09の正定値二次関数、ML1-20のk-means目的値、ML2-06のEM単調非減少（数値誤差/退化例の扱いは別）、ML2-08のELBO恒等式、ML2-14の有限差分勾配、ML2-24の正方向Gaussian分布を、それぞれ解析/独立コードと照合する。

### 5A.5 章・ラボごとの受け入れ試験と停止線

- **動作実証**：同一seed・同一設定で再現し、入力パラメータを変えると実際のモデル結果（係数、損失、予測、サンプル列、posterior等）が変わる。表示だけ差し替える固定動画/静止画像の疑似再生は不可。シミュレーターの計算関数をヘッドレスに呼び、ブラウザUIの同じ計算結果と比較する。
- **数学検算**：小規模例の手計算/解析解/基準実装と誤差許容値を明示して照合する。勾配は中央差分、確率は正規化・support・有限性、行列は次元とPSD、最適化は損失と制約違反、Monte Carloは不偏性が成り立つ条件を検査する。丸め誤差・反復打切り・ランダム変動による差を記録し、実験結果を一般定理の証明として扱わない。
- **失敗も教材化**：学習率過大での発散、完全分離でlogistic係数発散、ランク欠損、k-meansの初期値依存、MCMCの混合不良、VAEの表現の崩れ、拡散生成品質の劣化などを、選択可能な対照設定と正しい警告/停止にする。対話画面内で「失われた仮定・壊れた機構」を説明する。
- **ブラウザ試験**：Playwright等で入力操作、再計算、軸・ラベル、stop/reset、旧ジョブ結果の遮断、モバイルレイアウト、初回起動/再訪、Service Workerキャッシュ、Pyodide unavailable時の失敗表示を確認する。性能が課題なら、起動時間・計算時間・入力遅延・メモリ・CPUを測ってからJS/WASM等へ局所置換する。
- **完了管理**：章の学習目標として**対話または計算ラボを指定した場合、その実動作と数値テストを章の完成条件に含める**。主要な実験の理論へのstable anchorリンク、操作・観測・数値の限界に関する詳細解答、実装状況を記録する。演習A4/B3/C1は別に満たし、空のラボ・装飾SVGで数合わせしない。純粋な概念説明に有効な可視化がないときの例外は教育上の理由を記録する。

### 5A.6 最初の章 ML1-01 の最小対話ラボ（着手時必須）

- **対象**：有限特徴集合 X={0,1}・二値ラベル Y={0,1} の明示した結合分布（4セルの確率和1）。まず最小例とその真の母集団リスクを手計算する。
- **操作**：セル確率の変更（合計1への正規化をUIで明示）、訓練標本数、予測器 f、seed、再抽出・反復回数、0–1損失。分布の変更と標本seedの変更を分ける。
- **数値エンジン**：セル確率から独立に標本を抽出し、経験リスクを直接計算。全4セルの和から母集団リスクを厳密計算しておき、反復ごとの経験リスクを比較する。期待値の証明は本文で閉じ、標本のヒストグラムは証明と区別する。
- **描画**：母集団の4セル確率、採択された標本、標本数別の経験リスク分布・厳密母集団リスク線。nやseedを変えたら数値カーネルを再実行し、グラフと表を同時更新する。
- **受け入れ**：固定seedで同値、4セルの確率和1、経験リスク/真のリスクが[0,1]、空標本や無効な確率を拒否、小標本での変動を観測可能とする。n増大で**すべての個別反復の誤差が単調減少する**とは主張しない。UIパラメータ変更が実再計算を生むテストを通す。

## 6. 着手時手順（2026-10-14の初期設計記録）

1. series manifest textbook/dream-theater-series/ML.yaml の先頭未完了ML1-01を読み、パス textbook/volumes/dream_thater/応用系/ML/ML1-01 に章を作る。予定章を本文や公開索引へ事前登録しない。
2. DREAM_THEATER_AUTHORING_STANDARD.md、対象に近いAGENTS.md、既存の確率・線形代数のchapter.yaml/knowledge.yamlを確認し、ML1-01のprerequisites・learning objectives・新規concept ownerを実在IDで確定する。
3. ML1-01では**§5A.6の最小対話ラボも同時に実装する**。共通基盤PLANのPhase 0/1で定めるAPIと実動作を確認し、有限4セル模型・数理テスト・学習者向け結果解釈は本PLANで完成させる。有限特徴空間/二値分類の例から始め、(i)観測分布P(X,Y)、(ii)独立な訓練標本、(iii)仮説f、(iv)損失l、(v)母集団リスクと経験リスク、(vi)その差の意味を定義・直接計算する。確率的保証は次章以降の見通しとして区別し、SLTの定理を先取りしない。
4. 書籍の本文やコード断片の無断転載は禁止。標準のformal statement・proof・A/B/C詳細解答を整え、変更区分Cとして全主要証明・全演習を再計算した自己査読と別観点の再読を実施する。
5. 実装完了後は当該章・knowledge metadata・系列manifest（その章だけcompleted）・公開導線を同一PRで更新する。通常のleaf chapterはchanged-only検証、globalに波及する変更はfull validationへ昇格する。**別の完成済み章の追跡監査は明示依頼時のみ**で、直前章だからといって自動追加しない。

## 7. 完了判定・最終横断査読（2026-10-28）

### 7.1 成果物と監査範囲

- 系列manifestの46章（ML1-01〜ML1-21、ML2-01〜ML2-25）は全件`completed`。各章の`index.md`、`chapter.yaml`、`knowledge.yaml`、学習目標・直接prerequisiteを照合した。
- 46章の形式的な全件棚卸しで、主要証明ブロック201件（開始/終了対）、formal結果stable anchor 357件、演習と詳細解答412組（A189/B177/C46）を確認。全章A4/B3/C1以上、演習IDの重複・解答不足なし。これらの個数・整合は`node scripts/validate-ml-plan-completion.mjs`で継続検査する。**個数の一致を個々の数学的証明の正しさと取り違えない**。
- §5A.2/5A.3のモード指定を全章と照合し、対話21章・計算25章の動作先を確認。完了段階で不足していた8つの対話章（ML1-08/12/13/19/20/21、ML2-09/20）は`pages/simulation/ml-completion.html?chapter=<章ID>`へ接続し、各章に説明・理論anchorへのリンク・限界を加えた。JSカーネルは`ml-completion-models.mjs`で実計算し、入力・seed・反例設定によって数値が変化する。ML2-01には台条件とKLのPython計算ラボを追加した。
- 既存の対話/計算ラボ、[シリーズ索引](../dream-theater-series/ML.yaml)、Pages内のラボ一覧と46章の公開章リンクを照合。Python計算例だけを対話UIとして数えない。既存章の正本定義・結果anchorを移動・改名せず、直接prerequisiteを変えていない。

### 7.2 数学的な横断確認の再導出例

各章の既存の個別査読と別に、ML I→IIの概念の受け渡し、台・正規化・線形代数・最適化・標本独立性を横断して照合した。特に新しいラボの数値核と次の主要結果を、定義から独立に導出・計算した。

1. **Logistic（ML1-08）**：[勾配・Hessian](../volumes/dream_thater/応用系/ML/ML1-08/index.md#thm-ml1-08-binary-derivatives)について、$z_i=wx_i+b$、$q_i=(1+e^{-z_i})^{-1}$ から $\partial\ell_i/\partial z_i=q_i-y_i$、$\partial^2\ell_i/\partial z_i^2=q_i(1-q_i)$ を得る。したがって $\nabla^2L=n^{-1}\sum_iq_i(1-q_i)(x_i,1)^{\mathsf T}(x_i,1)+\lambda I_2$ は半正定値。[完全分離](../volumes/dream_thater/応用系/ML/ML1-08/index.md#thm-ml1-08-separation-no-mle)の方向では係数ノルムが増えて損失が下がる設定と、$\lambda>0$ の有界な対照設定を別々に検算した。
2. **PCA（ML1-19）**：[中心化標本の再構成](../volumes/dream_thater/応用系/ML/ML1-19/index.md#thm-ml1-19-pca-reconstruction)は $C=X^{\mathsf T}X/n$ の固有値 $\lambda_j=\sigma_j^2/n$ と直交射影から $\|X-X_q\|_F^2/n=\sum_{j>q}\lambda_j$。2次元の$q=0,1,2$で全分散・第二固有値・0をそれぞれ独立計算した。固有値の縮退時は軸の一意性を主張しない。
3. **k-means（ML1-20）**：[平均の最小化](../volumes/dream_thater/応用系/ML/ML1-20/index.md#prop-ml1-20-centroid-identity)は $\sum_{i\in C}\|x_i-c\|^2=\sum_{i\in C}\|x_i-\bar x_C\|^2+|C|\|c-\bar x_C\|^2$。[Lloydの非増加](../volumes/dream_thater/応用系/ML/ML1-20/index.md#thm-ml1-20-lloyd-descent)は割当の最小化と平均更新の二段で成立する。初期群サイズ30と30のWard併合増分は $30\cdot30/(30+30)\|\bar x_1-\bar x_2\|^2=15\|\bar x_1-\bar x_2\|^2$。
4. **Mean-field（ML2-09）**：[座標更新](../volumes/dream_thater/応用系/ML/ML2-09/index.md#thm-ml2-09-coordinate)は $f(z_1,z_2)=\exp(cz_1z_2)$、$q=q_1q_2$ と置いて $\mathcal L=cab+H(a)+H(b)$（$a=q_1(1),b=q_2(1)$）、正規化定数 $Z=3+e^c$ と列挙できる。$a\leftarrow\operatorname{sigmoid}(cb)$、$b\leftarrow\operatorname{sigmoid}(ca)$ の各更新でELBOは非減少、$\log Z-\mathcal L=\mathrm{KL}(q\|p)$。$c=0$では一度の更新で両因子が1/2となりELBO=$\log4$。
5. **VAE（ML2-20）**：[ELBO](../volumes/dream_thater/応用系/ML/ML2-20/index.md#thm-ml2-20-elbo)を2次元潜在 $p(z)=N(m\mathbf1,vI_2)$、$p(x\mid z)=N(w^{\mathsf T}z,\tau^2)$、$q=N(\mu,\operatorname{diag}(s_1^2,s_2^2))$ で照合。$D=\tau^2+v\|w\|^2$と置けば真の事後平均は $m\mathbf1+vw(x-w^{\mathsf T}m\mathbf1)/D$、共分散は $vI_2-v^2ww^{\mathsf T}/D$。再構成項は $-\tfrac12[\log(2\pi\tau^2)+((x-w^{\mathsf T}\mu)^2+\sum_jw_j^2s_j^2)/\tau^2]$。事前KLは $\tfrac12\sum_j[\log(v/s_j^2)+(s_j^2+(\mu_j-m)^2)/v-1]$。真の事後とのKLはこの共分散行列の逆行列・行列式を用いて独立計算し、$\log p(x)-\mathcal L$に一致することを検算した。$v=\tau=x=w_1=1,w_2=m=\mu_2=0,\mu_1=1/2,s_1^2=1/2,s_2^2=1$で厳密な等号を確認。$\beta\ne1$ は通常ELBOと分けている。
6. **支持条件（ML2-01→ML2-25）**：[有限対数損失とKL](../volumes/dream_thater/応用系/ML/ML2-01/index.md#thm-ml2-01-conditional-kl-regret)では $p_i>0$ の添字だけで $L_p(q)=-\sum p_i\log q_i$ と $D(p\|q)=\sum p_i\log(p_i/q_i)$ を計算し、$q_i=0$ なら双方$+\infty$。零確率項を`0log0`で評価しない。[ML2-25の評価](../volumes/dream_thater/応用系/ML/ML2-25/index.md#prop-ml2-25-heldout-logloss)でも独立評価・台条件を区別した。

**定義・記法・リンクの初出実例：** ML1-19では中心化$X=A-\mathbf1\bar x^{\mathsf T}$を定義してから共分散$C=X^{\mathsf T}X/n$と固有値を導入し、$\sigma_j^2/n=\lambda_j$を再構成判定へ橋渡しする。ML1-08では得点$z_i$を係数$(w,b)$の線形結合で定めてから、$d\ell/dz_i$と$\partial\ell/\partial w$を $\partial\ell/\partial w=(q_i-y_i)x_i$ の連鎖律で結ぶ。ML2-20ではencoder標準偏差$s$とdecoder雑音$\tau$を別母数とし、分散$s^2$、$\tau^2$を混同しない。該当する定理名は上記の各実在anchorへ直接リンクした。レイアウト・リンクは表示とPages検証で確認し、計算例の図を証明の代用品にしない。

### 7.3 最終ゲートと査読主体

- 数値テスト：`node pages/simulation/ml-completion-models.test.mjs`の10群に加え既存ML数値モジュール群。再現性、入力差分、logisticの初期損失、3-fold CVと独立test、混同行列とBrier、PCAの特異値・残差、Lloyd非増加、シフト母集団率、ELBO単調性とKL、VAEの事後と下界の等号を照合する。
- 実ブラウザ受け入れ：`node scripts/validate-ml-completion-browser.mjs`をPages CIでblocking実行。8ラボすべてで入力変更・UI表示値とheadlessカーネル・描画、反復章の再生/停止/リセット、375px画面、Service Workerのオフライン再訪を検査する。資源上限は各模型の入力範囲で制限し、Pythonを使わない8ラボにPyodide未起動の問題はない。
- 横断検証：`npm run validate:pages`（formal・参照anchor・画像・数式・Pages offlineを含む）、DREAM THEATER概念・演習・work stateを通す。PLANの移動に伴う直接参照、系列manifestの`plan`と公開ラボ一覧を同じ作業単位で更新する。
- 査読主体：ChatGPTが数理再導出・コード数値テスト・読者導線の別観点再読を実施。**独立第三者査読ではない**。章ごとの旧PRの査読実施主体もここで第三者と読み替えない。全201証明をこの最終横断作業だけで個別再計算したとは主張せず、46章の形式・依存・演習・ラボ整合と上記の横断代表結果を再導出した。
- 未確認事項：実ブラウザ受け入れはGitHub ActionsのChromiumで最終実行し、失敗した場合はplan_doneへの移動をマージしない。公開後のPagesデプロイとsmokeを確認して完了とする。
