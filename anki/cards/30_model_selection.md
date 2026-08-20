---
id: ms-overfitting-generalization
title: 過学習と汎化誤差の関係を説明する
category: math-estimation
subcategory: math-model-selection
topic: overfitting-generalization
type: recognition
difficulty: 1
priority: C
hashtags: [過学習, 汎化誤差, モデル評価]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
入れ子になったモデル族で複雑さを増やしたとき、訓練データでの誤差と未知データでの誤差（汎化誤差）がどう変化するか説明せよ。
## 答え
入れ子のモデル族では訓練誤差は非増加だが、汎化誤差は複雑さとともに減少した後、増加に転じることがある。訓練データへ過度に適合して未知データでの誤差が大きくなる状態を過学習という。
## 使用公式・定理
汎化誤差 $= E_{(X,Y)}[L(\widehat f(X),Y)]$。期待は未知データの分布について取る。
## 計算例
多項式回帰で次数を $1,3,9$ と上げると、訓練MSEは $2.0\to0.4\to0.01$ へ減るが、テストMSEは $2.1\to0.9\to5.3$ と増える。次数 $3$ 付近が最小。
## 注意
訓練誤差だけで複雑さを決めると過学習する。

<!-- CARD -->

---
id: ms-train-test-error
title: 訓練誤差と検証誤差を比較してモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: train-test-error
type: formula
difficulty: 2
priority: C
hashtags: [訓練誤差, テスト誤差, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
候補モデルが2つある。訓練MSEと検証MSEがそれぞれ $(0.30,0.55)$ と $(0.50,0.48)$ のとき、未知データへの予測を目的としてどちらを選ぶか。
## 答え
モデル選択に使う検証誤差が小さい方を選ぶ。
## 使用公式・定理
検証誤差 $= \dfrac1{m_{\mathrm{val}}}\sum_{i=1}^{m_{\mathrm{val}}}L(\widehat f(X_i),Y_i)$。学習に使わない検証データで候補を比較する。
## 計算例
モデル1の検証MSE $0.55$ > モデル2の $0.48$。よってモデル2を選ぶ。モデル1は訓練誤差 $0.30$ が小さいが過学習の疑いがある。
## 注意
テストデータはモデル選択に使わず、モデルと調整値を確定した後の最終評価にだけ使う。検証データを繰り返し見て調整すると、検証データにも過学習しうる。

<!-- CARD -->

---
id: ms-kl-divergence
title: Kullback–Leibler情報量（KLダイバージェンス）を定義する
category: math-estimation
subcategory: math-model-selection
topic: kl-divergence
type: formula
difficulty: 2
priority: C
hashtags: [カルバック・ライブラー情報量, 交差エントロピー, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
確率分布 $P,Q$ の間のKullback–Leibler情報量（KLダイバージェンス）を離散・連続の両方で書け。
## 答え
同一の台の上で、対数尤度比の $P$ による期待値として定義する。
## 使用公式・定理
離散なら $D_{\mathrm{KL}}(P\|Q)=\sum_x P(x)\log\dfrac{P(x)}{Q(x)}$、連続なら $D_{\mathrm{KL}}(P\|Q)=\int P(x)\log\dfrac{P(x)}{Q(x)}\,dx$。対数の底は情報量単位（自然対数ならナット）。
## 計算例
$P=(0.5,0.5)$、$Q=(0.25,0.75)$ なら $D_{\mathrm{KL}}(P\|Q)=0.5\log\dfrac{0.5}{0.25}+0.5\log\dfrac{0.5}{0.75}=0.5\log2+0.5\log(2/3)\approx0.144$。
## 注意
KLは非対称で距離ではない。

<!-- CARD -->

---
id: ms-kl-nonnegativity
title: KL情報量の非負性（ギブスの不等式）を確認する
category: math-estimation
subcategory: math-model-selection
topic: kl-nonnegativity
type: theorem
difficulty: 3
priority: C
hashtags: [カルバック・ライブラー情報量, ギブスの不等式, 情報量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
$D_{\mathrm{KL}}(P\|Q)\ge0$ かつ等号は $P=Q$ のときのみ成り立つことを示せ（ギブスの不等式）。
## 答え
凹性 $\log x\le x-1$ を用いて対数尤度比の期待値を上から抑える。
## 使用公式・定理
$\log x\le x-1$（等号は $x=1$ のときのみ）。
## 計算例
$E_P[\log\{Q(X)/P(X)\}]\le E_P[\{Q(X)/P(X)\}-1]=\sum_x Q(x)-\sum_x P(x)=1-1=0$。両辺に $-1$ を掛けて $D_{\mathrm{KL}}(P\|Q)\ge0$。
## 注意
右辺が有限であるには離散なら $P(x)>0$ で $Q(x)>0$ が必要（絶対連続性）。

<!-- CARD -->

---
id: ms-aic-formula
title: AIC（赤池情報量規準）の定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: aic
type: formula
difficulty: 2
priority: B
hashtags: [情報量規準AIC, モデル選択, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: AIC }]
---
## 問題
標本サイズ $n$、最大化対数尤度 $\ell(\widehat\theta)$、推定母数数 $k$ のモデルのAICを定義せよ。
## 答え
正則なモデルで、期待KL損失を定数差を除いて推定する規準である。対数尤度が大きいほど、推定母数数が少ないほど小さくなる。
## 使用公式・定理
$\operatorname{AIC}=-2\ell(\widehat\theta)+2k$。
## 計算例
$\ell(\widehat\theta)=-100$、$k=3$ なら $\operatorname{AIC}=-2(-100)+2\cdot3=206$。$k=7$ なら $-2(-100)+2\cdot7=214$。
## 注意
小さいAICのモデルを選ぶ。ペナルティ $2k$ は自由度に対するもので正則化そのものではない。

<!-- CARD -->

---
id: ms-aic-asymptotic-loo
title: AICがleave-one-out交差検証と漸近的に等価な理由を述べる
category: math-estimation
subcategory: math-model-selection
topic: aic-loo
type: expansion
difficulty: 3
priority: C
hashtags: [情報量規準AIC, クロスバリデーション, 予測誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: AIC }]
---
## 問題
なぜAICはデータの分割をせずに、leave-one-out交差検証（LOOCV）の予測誤差と漸近的に一致するのか。
## 答え
予測対数尤度の期待値と訓練対数尤度の差が $k$ で漸近評価できるため。
## 使用公式・定理
正則なモデルでは、AICとLOOCVの負の予測対数尤度は、モデル比較に共通な定数と尺度を除いて漸近的に同じ評価を与える。すなわち
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k\ \approx\ -2\sum_{i=1}^n\log f(X_i;\widehat\theta_{-i}).$$
$f$ は密度、$\widehat\theta_{-i}$ は $i$ 番目を除いて求めた推定量である。LOOCV側へさらに $2k$ を加えない。
## 計算例
線形回帰・正規誤差モデルでは $\operatorname{AIC}=n\log(\widehat\sigma^2)+2k+C$（$C$ は定数）。これは $\widehat\sigma^2$ によるLOOCV評価と $n\to\infty$ で一致する。
## 注意
一致は大標本・正則性の下の漸近的性質。

<!-- CARD -->

---
id: ms-bic-formula
title: BIC（ベイズ情報量規準）の定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: bic
type: formula
difficulty: 2
priority: C
hashtags: [ベイズ情報量規準, モデル選択, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
標本サイズ $n$、最大化対数尤度 $\ell(\widehat\theta)$、推定母数数 $k$ のモデルのBICを定義せよ。
## 答え
AICと同形だが、母数ペナルティが標本サイズに依存し $\log n$ 倍になる。
## 使用公式・定理
$\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n$。
## 計算例
$\ell(\widehat\theta)=-100$、$k=3$、$n=200$ なら $\operatorname{BIC}=-2(-100)+3\log200\approx200+3\cdot5.30=215.9$。
## 注意
小さいBICを選ぶ。$n>e^2$ なら $\log n>2$ なので、同じ $k$ に対するペナルティはAICより強い。

<!-- CARD -->

---
id: ms-bic-consistency
title: BICが真のモデルを選ぶ一致性を持つことを確認する
category: math-estimation
subcategory: math-model-selection
topic: bic-consistency
type: recognition
difficulty: 3
priority: C
hashtags: [ベイズ情報量規準, 一致性, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
真の分布が候補モデル群に含まれるとき、BICによるモデル選択の大標本極限の性質は何か。
## 答え
正則性などの条件の下で、真のモデル（真の分布を含む最小の候補）を選ぶ確率が $1$ へ収束する。すなわちBICはモデル選択一致性を持つ。
## 使用公式・定理
$n\to\infty$ で $P(\text{BICが真のモデルを選ぶ})\to1$。
## 計算例
真が $k=2$ のモデルなら、過剰な $k=5$ モデルの $-2\ell$ の改善 $O_p(1)$ に対しペナルティ差 $(5-2)\log n\to\infty$ なので過剰モデルは棄却される。
## 注意
AICは一致性を持たず、過剰なモデルを選びうる。

<!-- CARD -->

---
id: ms-info-criterion-likelihood
title: 情報量規準が最大化対数尤度で比較することを確認する
category: math-estimation
subcategory: math-model-selection
topic: info-criterion-likelihood
type: formula
difficulty: 1
priority: C
hashtags: [情報量規準AIC, ベイズ情報量規準, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
AICやBICが、異なるモデル間で何を共通の尺度として比較しているか答えよ。
## 答え
どちらも同一データの最大化対数尤度（あてはめの良さ）を基底とし、母数数のペナルティを加える。
## 使用公式・定理
比較対象は $\ell(\widehat\theta)=\sum_{i=1}^n\log f(X_i;\widehat\theta)$ と $k$ のみ。
## 計算例
母数数の異なる正規線形モデル同士を比べるとき、残差分散が小さい（対数尤度が大きい）ほど良いが、複雑さで減点する。
## 注意
尤度の定義（密度の積）が同一標本で正当であることが前提。

<!-- CARD -->

---
id: ms-variable-selection-stepwise
title: 変数選択の前進・後退・逐次法を説明する
category: math-estimation
subcategory: math-model-selection
topic: variable-selection
type: strategy
difficulty: 2
priority: C
hashtags: [変数選択, 前進選択, 後退消去, ステップワイズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
説明変数が多いとき、どの変数を入れるかを決める前進選択・後退消去・ステップワイズ法を説明せよ。
## 方針
前進は空から1変数ずつ追加、後退は全部から1変数ずつ削除、ステップワイズは両方を許す。各ステップで基準（AIC等）で最良の操作を選ぶ。
## 使用公式・定理
各ステップで $\operatorname{AIC}$ や $C_p$ などを監視し、改善がなくなるまで続ける。
## 計算例
候補10変数。前進では $X_1$ を入れAIC最小、次に $X_3$ を追加してさらに下がる、以降の追加でAICが下がらなければ停止。
## 注意
局所最適に留まる可能性と多重検定の問題がある。

<!-- CARD -->

---
id: ms-cv-model-selection
title: k分割交差検証でモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: cv-model-selection
type: strategy
difficulty: 2
priority: B
hashtags: [クロスバリデーション, k分割交差検証, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
モデルの複雑さパラメータ（多項式次数など）を決めたい。k分割交差検証（k-fold CV）でどう選ぶか。
## 方針
データをk分割し、各分割を一度ずつ検証に回し、残りで学習して検証誤差を出す。その平均が最小の複雑さを選ぶ。
## 使用公式・定理
$\operatorname{CV}_{(k)}=\dfrac1k\sum_{j=1}^k\dfrac1{|I_j|}\sum_{i\in I_j}L(\widehat f_{-j}(X_i),Y_i)$。
## 計算例
$k=5$、次数 $d=1,3,9$ のCV誤差がそれぞれ $2.1,0.9,1.4$。最小の $d=3$ を選ぶ。
## 注意
データは学習と検証で分け、検証誤差は未知データの代わりに使う。

<!-- CARD -->

---
id: ms-cv-loo
title: leave-one-out交差検証（LOOCV）を定義する
category: math-estimation
subcategory: math-model-selection
topic: loo-cv
type: formula
difficulty: 2
priority: C
hashtags: [クロスバリデーション, Leave-One-Out交差検証, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
観測数 $n$ のleave-one-out交差検証（LOOCV）の予測誤差を定義せよ。
## 答え
各 $i$ を一度ずつ検証にし、残り $n-1$ 件で学習したモデルで予測誤差を出し、全件平均する。
## 使用公式・定理
$\operatorname{LOOCV}=\dfrac1n\sum_{i=1}^nL(\widehat f_{-i}(X_i),Y_i)$。
## 計算例
$n=100$。各 $i$ について $\widehat f_{-i}$ を作り、その予測と $Y_i$ の二乗誤差を平均する。$i=1$ で $(0.3)^2=0.09$ など。
## 注意
線形回帰では閉形式 $\operatorname{LOOCV}=n^{-1}\sum_i\{(Y_i-\widehat Y_i)/(1-h_{ii})\}^2$ がある（$h_{ii}$ はレバレッジ）。

<!-- CARD -->

---
id: ms-ridge-regression
title: Ridge回帰（L2正則化）の推定量を書く
category: math-estimation
subcategory: math-model-selection
topic: ridge
type: formula
difficulty: 3
priority: B
hashtags: [Ridge回帰, L2正則化, 多重共線性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 重回帰モデル }]
---
## 問題
線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ のRidge推定量を定義せよ。$\boldsymbol X$ は $n\times p$、ランク $p$、$\lambda\ge0$。
## 答え
係数の二乗和にペナルティを置いた最小化、または制約付き最小二乗の解法として得る。
## 使用公式・定理
$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$。
## 計算例
$p=2$、$\boldsymbol X^{\mathsf T}\boldsymbol X=\begin{pmatrix}1&0.99\\0.99&1\end{pmatrix}$、$\lambda=0.1$ なら $\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I=\begin{pmatrix}1.1&0.99\\0.99&1.1\end{pmatrix}$ となり逆行列が安定する。
## 注意
$\lambda=0$ は最小二乗法推定量に一致する。$\lambda\to\infty$ で、ペナルティ対象の係数は $\boldsymbol0$ へ収束する。通常は説明変数を標準化し、切片はペナルティから除く。

<!-- CARD -->

---
id: ms-ridge-shrinkage
title: Ridgeが係数を一様に縮小することを確認する
category: math-estimation
subcategory: math-model-selection
topic: ridge-shrinkage
type: calc_step
difficulty: 3
priority: C
hashtags: [Ridge回帰, L2正則化, 縮小]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 重回帰モデル }]
---
## 問題
$\boldsymbol X$ の列が直交（$\boldsymbol X^{\mathsf T}\boldsymbol X=\boldsymbol I$）するとき、Ridge推定量が最小二乗法推定量をどう変えるか示せ。
## 答え
各係数を $1/(\lambda+1)$ 倍に縮小する。L2は係数を0にしない。
## 使用公式・定理
$\widehat\beta_j^{\mathrm{LS}}=(\boldsymbol X^{\mathsf T}\boldsymbol Y)_j$、$\widehat\beta_j^{\mathrm{ridge}}=\dfrac1{1+\lambda}\widehat\beta_j^{\mathrm{LS}}$。
## 計算例
$\widehat\beta_1^{\mathrm{LS}}=3$、$\lambda=0.5$ なら $\widehat\beta_1^{\mathrm{ridge}}=3/1.5=2$。符号も大きさも最小二乗法より小さい。
## 注意
縮小は一様だが非零なので変数選択はしない。

<!-- CARD -->

---
id: ms-lasso-regression
title: Lasso回帰（L1正則化）の推定量を書く
category: math-estimation
subcategory: math-model-selection
topic: lasso
type: formula
difficulty: 3
priority: B
hashtags: [Lasso回帰, L1正則化, 変数選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---
## 問題
線形モデルのLasso推定量を定義せよ。ペナルティはL1ノルム。
## 答え
係数の絶対値和にペナルティを置く最小化問題として得る。
## 使用公式・定理
$\widehat{\boldsymbol\beta}_{\mathrm{lasso}}=\arg\min_{\boldsymbol\beta}\left\{\sum_{i=1}^n(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda\sum_{j=1}^p|\beta_j|\right\}$。
## 計算例
$\lambda=1$、$p=3$ なら $\sum|\beta_j|\le s$ の菱形領域で二乗誤差を最小化する。$\beta_2,\beta_3$ がちょうど0になることがある。
## 注意
$\lambda$ が大きいと多くの係数が0になる。通常は説明変数を標準化し、切片はペナルティから除く。

<!-- CARD -->

---
id: ms-l1-l2-difference
title: L1とL2正則化の違い（スパース性）を説明する
category: math-estimation
subcategory: math-model-selection
topic: l1-l2-difference
type: recognition
difficulty: 2
priority: C
hashtags: [L1正則化, L2正則化, スパース性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---
## 問題
Lasso（L1）とRidge（L2）の制約領域の形の違いが、なぜLassoだけ変数選択（スパース性）を生むか説明せよ。
## 答え
L1の制約領域は頂点が軸上にある菱形で、最小化が頂点に留まると係数がぴったり0になる。L2は滑らかな楕円で0にならない。
## 使用公式・定理
L1は $\sum_j|\beta_j|\le s$、L2は $\sum_j\beta_j^2\le s$。
## 計算例
等高線が菱形の角 $(0,\beta_2^*)$ を通ると $\beta_1=0$ となる。Ridgeの円では境界上の点は通常非零。
## 注意
相関の強い変数間ではLassoは片方を選びうる。

<!-- CARD -->

---
id: ms-regularization-bias-variance
title: 正則化がバイアス・バリアンスとどう関係するか説明する
category: math-estimation
subcategory: math-model-selection
topic: regularization-bias-variance
type: recognition
difficulty: 3
priority: C
hashtags: [正則化, バイアス・バリアンス分解, 汎化誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
正則化パラメータ $\lambda$ を大きくすると、汎化誤差のバイアスとバリアンスがどう変化するか。
## 答え
$\lambda$ 増でバイアスは増え、バリアンスは減る。汎化誤差はその和で、最小点を選ぶ。
## 使用公式・定理
$\operatorname{Err}=\operatorname{Bias}^2+\operatorname{Var}+\sigma^2$。
## 計算例
$\lambda=0$（最小二乗法）でバリアンス大・バイアス0、$\lambda$ 大でバイアス大・バリアンス小。中間の $\lambda$ で和が最小。
## 注意
訓練誤差は $\lambda$ 増で悪化するが、汎化誤差はそうとは限らない。

<!-- CARD -->

---
id: ms-lasso-selection
title: Lassoの変数選択性と成立条件を確認する
category: math-estimation
subcategory: math-model-selection
topic: lasso-selection
type: recognition
difficulty: 3
priority: B
hashtags: [Lasso回帰, 変数選択, スパース性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---
## 問題
真の係数がスパース（多くが0）のとき、Lassoが持つ変数選択性と、その限界を述べよ。
## 答え
Lassoは係数を厳密に0にできるため変数選択を同時に行える。ただし、通常のLassoが自動的に選択一致性やオラクル性を持つわけではない。真の変数集合を確率1で回復するには、設計行列に対する条件（irrepresentable conditionなど）、信号強度、$\lambda$ の減少速度に条件が要る。
## 使用公式・定理
直交設計では各最小二乗係数へのsoft-thresholdingとなり、しきい値を超えない係数が0になる。一般の設計では、$\ell_1$ 推定誤差の一致性と、真の変数集合を当てる選択一致性は別の性質である。
## 計算例
真が $\beta=(1,0,0,2,0)$ のとき、適切な条件下で目標となる選択は $j=1,4$ を残し、$j=2,3,5$ を0にすることである。
## 注意
強相関変数があると選択が不安定になり、選択一致性の条件が破れることがある。「Lassoは常に真の変数を選ぶ」とは書かない。

<!-- CARD -->

---
id: ms-elastic-net
title: Elastic Netの定義式を書く
category: math-estimation
subcategory: math-model-selection
topic: elastic-net
type: formula
difficulty: 3
priority: C
hashtags: [Elastic Net, L1正則化, L2正則化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---
## 問題
Elastic Netの推定量を定義せよ。$\alpha\in[0,1]$ は混合比。
## 答え
L1とL2のペナルティを混ぜ、スパース性と相関変数のグループ選択を両立させる。
## 使用公式・定理
$\widehat{\boldsymbol\beta}=\arg\min_{\boldsymbol\beta}\left\{\sum_{i=1}^n(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda\bigl(\alpha\sum_j|\beta_j|+(1-\alpha)\tfrac12\sum_j\beta_j^2\bigr)\right\}$。
## 計算例
$\alpha=0.5$、$\lambda=1$ ならペナルティは $0.5\sum|\beta_j|+0.25\sum\beta_j^2$。$\alpha=0$ はRidge、$\alpha=1$ はLassoに一致。
## 注意
強相関変数をまとめて選びやすい。

<!-- CARD -->

---
id: ms-multicollinearity-ridge
title: 多重共線性があるときRidgeが安定する理由を説明する
category: math-estimation
subcategory: math-model-selection
topic: multicollinearity-ridge
type: recognition
difficulty: 3
priority: B
hashtags: [多重共線性, Ridge回帰, 条件数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重共線性 }]
---
## 問題
説明変数間に強い相関（多重共線性）があるとき、なぜRidge回帰が最小二乗法より安定するか。
## 答え
最小二乗法の係数分散は $(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}$ に比例し、多重共線性でその条件数が大きくなる。Ridgeは対角成分を加え条件数を抑える。
## 使用公式・定理
$\operatorname{Var}(\widehat{\boldsymbol\beta}_{\mathrm{LS}})=\sigma^2(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}$、$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$。
## 計算例
$\boldsymbol X^{\mathsf T}\boldsymbol X$ の最小固有値が $10^{-3}$ なら、その最小固有値方向の最小二乗法推定量の分散が $10^3$ 倍に膨むが、$\lambda=0.1$ を加えると逆行列の当該固有値が $10^{-3}+0.1\approx0.1$ となり安定する。
## 注意
Ridgeは分散を減らす代わりにバイアスを入れる。

<!-- CARD -->

---
id: ms-prediction-vs-inference
title: 予測目的と推測（解釈）目的の違いを説明する
category: math-estimation
subcategory: math-model-selection
topic: prediction-vs-inference
type: recognition
difficulty: 2
priority: C
hashtags: [予測, 推測, モデル評価]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モデル評価基準 }]
---
## 問題
モデル構築で「予測」と「推測（因果・解釈）」の目的が違うと、何を重視すべきか説明せよ。
## 答え
予測なら汎化誤差最小（CV等）を重視し、解釈なら係数の不偏性や有意性、因果構造を重視する。正則化は予測向き。
## 使用公式・定理
予測の評価は $\operatorname{Err}=E[L(\widehat f(X),Y)]$、推測の評価は推定のバイアス・信頼区間。
## 計算例
予測目的ならLassoの係数縮小を許容するが、因果効果を言いたいなら縮小でバイアスが入るため最小二乗法等を選ぶ。
## 注意
目的を混同すると、解釈に使えないモデルを選びかねない。

<!-- CARD -->
