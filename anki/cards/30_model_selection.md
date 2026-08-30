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
多項式回帰で次数を $1,3,9$ と上げると、訓練平均二乗誤差は $2.0\to0.4\to0.01$ へ減るが、テスト平均二乗誤差は $2.1\to0.9\to5.3$ と増える。次数 $3$ 付近が最小。
## 注意
訓練誤差だけで複雑さを決めると過学習する。

<!-- CARD -->

---
id: ms-kl-divergence
title: KL情報量を定義し非負性まで確認する
category: math-estimation
subcategory: math-model-selection
topic: kl-divergence-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - カルバック・ライブラー情報量
  - ギブスの不等式
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
---
## 問題
確率分布 $P,Q$ のKullback–Leibler情報量（KLダイバージェンス）を離散・連続の場合に定義せよ。また $D_{\mathrm{KL}}(P\|Q)\ge0$ を示し、$P=(0.5,0.5)$、$Q=(0.25,0.75)$ の値を求めよ。

## 一手
KL情報量は「真の分布 $P$ から見た対数尤度比の期待値」と捉える。距離のように見えても対称ではない点に注意する。

## 答え
数値例では
$$
\begin{aligned}
D_{\mathrm{KL}}(P\|Q)
&=\frac12\log\frac{0.5}{0.25}
  +\frac12\log\frac{0.5}{0.75}\\
&=\frac12\log2+\frac12\log\frac23\\
&\approx0.1438.
\end{aligned}
$$
また一般に $D_{\mathrm{KL}}(P\|Q)\ge0$ である。

## 使用公式・定理
離散分布では
$$
D_{\mathrm{KL}}(P\|Q)
=\sum_x P(x)\log\frac{P(x)}{Q(x)},
$$
連続分布では
$$
D_{\mathrm{KL}}(P\|Q)
=\int p(x)\log\frac{p(x)}{q(x)}\,dx.
$$
$P$ が $Q$ に対して絶対連続でない場合は $+\infty$ とする。

非負性には
$$
\log u\le u-1
$$
を用いる。離散の場合、
$$
E_P\left[\log\frac{Q(X)}{P(X)}\right]
\le E_P\left[\frac{Q(X)}{P(X)}-1\right]
=\sum_xQ(x)-1=0,
$$
よって
$$
D_{\mathrm{KL}}(P\|Q)\ge0.
$$
適切な正則条件の下で等号は $P=Q$ のときに限る。

## 計算例
$D_{\mathrm{KL}}(P\|P)=0$ だが、一般には
$$
D_{\mathrm{KL}}(P\|Q)\ne D_{\mathrm{KL}}(Q\|P).
$$
したがってKL情報量は距離関数ではない。

## 注意
AICは期待対数尤度、したがって予測的なKL損失との関係から導かれる。KL情報量の定義とギブスの不等式を別カードで反復暗記する必要はない。

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

---
id: ms-bic-numeric-comparison
title: AIC・BIC・Cpでモデルを比較し変数選択する
category: math-estimation
subcategory: math-model-selection
topic: information-criteria-selection-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - AIC
  - BIC
  - MallowsのCp
  - 変数選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズ情報量規準
---
## 問題
モデル選択について次を答えよ。

1. AICとBICの式を書き、罰則の違いを説明せよ。
2. $n=200$ で、モデルAは $-2\ell(\widehat\theta)=300,k=4$、モデルBは $-2\ell(\widehat\theta)=294,k=7$ である。AICとBICで比較せよ。
3. 回帰候補モデルで $SSE_p=80$、完全モデルから得た $\widehat\sigma^2=4$、$n=30$、候補モデルの切片込み係数数 $p=6$ のとき Mallows の $C_p$ を求めよ。
4. 前進選択・後退消去・ステップワイズ法をAIC等と組み合わせる手順と限界を説明せよ。

## 答え
AICは
$$
\operatorname{AIC}_A=300+2(4)=308,
\qquad
\operatorname{AIC}_B=294+2(7)=308
$$
で同点。

$\log200\approx5.2983$ より
$$
\operatorname{BIC}_A\approx321.19,
\qquad
\operatorname{BIC}_B\approx331.09,
$$
なのでBICではモデルAを選ぶ。

$$
C_p=\frac{80}{4}-30+2(6)=2.
$$

## 使用公式・定理
$$
\operatorname{AIC}=-2\ell(\widehat\theta)+2k,
\qquad
\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n.
$$
値が小さいモデルを選ぶ。$n$ が十分大きければ1母数当たりのBIC罰則 $\log n$ はAICの2より大きくなる。

Mallows の $C_p$ は、完全モデルから得た共通の誤差分散推定値を使い
$$
C_p=\frac{SSE_p}{\widehat\sigma^2}-n+2p.
$$

前進選択は空モデルから変数を追加、後退消去は完全モデルから削除、ステップワイズ法は追加と削除の両方を許し、各段階でAIC等を最も改善する操作を選ぶ。

## 計算例
モデルBはAより $-2\ell$ を6改善するが、追加3母数のAIC罰則も $2\times3=6$ 増えるためAICでは同点になる。一方BICの追加罰則は
$$
3\log200\approx15.89
$$
なのでモデルAが有利になる。

変数候補が10個ある前進選択なら、空モデルから各1変数追加後のAICを比較して最良を採用し、次の追加でAICが改善しなくなるまで続ける。

## 一手
どの基準でも「適合度の改善が、追加した複雑さへの罰則を上回るか」を見る。変数選択法はこの比較を全モデルでなく局所的に繰り返す探索法と捉える。

## 注意
AIC・BICは同じデータ・同じ尤度定義のモデル同士で比較する。AICは予測的KL損失との関係が強く、BICは正則条件下でモデル同定・周辺尤度近似との関係が強いので、常に同じモデルを選ぶとは限らない。

ステップワイズ法は探索した近傍の中での局所最適に留まりうる。また選択後に通常のP値や信頼区間をそのまま解釈すると、選択を無視した推測になる点に注意する。

<!-- CARD -->

---
id: ms-kfold-cv-numeric
title: 交差検証で過学習を避けモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: cross-validation-generalization-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 交差検証
  - 汎化誤差
  - 過学習
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交差検証
---
## 問題
入れ子になったモデルを複雑にすると訓練誤差は通常どう変化し、なぜ訓練誤差だけでモデルを選べないか説明せよ。

さらに5分割交差検証で、モデルAの各foldの平均二乗誤差が $(4.0,5.0,3.5,4.5,3.0)$、モデルBが $(3.8,4.2,4.0,4.1,4.4)$ だった。平均検証誤差でモデルを選択せよ。

## 答え
$$
\operatorname{CV}_A
=\frac{4.0+5.0+3.5+4.5+3.0}{5}
=4.00,
$$
$$
\operatorname{CV}_B
=\frac{3.8+4.2+4.0+4.1+4.4}{5}
=4.10.
$$
平均検証誤差が小さいモデルAを選ぶ。

## 使用公式・定理
入れ子モデルでは複雑さを増やすと訓練誤差は非増加だが、未知データに対する汎化誤差は途中から増えることがある。この現象が過学習である。

各foldの大きさが等しい $K$ 分割交差検証なら
$$
\operatorname{CV}=\frac1K\sum_{j=1}^K L_j.
$$
foldの大きさが異なる場合は、各観測の検証損失へ戻して標本数で重み付けする。

## 計算例
例えば多項式回帰で次数を $1,3,9$ と増やしたとき、訓練平均二乗誤差が $2.0,0.4,0.01$ と下がっても、検証誤差が $2.1,0.9,5.3$ なら次数9は過学習しており、次数3を選ぶのが自然である。

## 一手
モデル選択では訓練に使わなかったデータで損失を測る。訓練誤差の最小化ではなく、未知データでの誤差を近似する検証誤差を比較する。

## 注意
交差検証の差が小さいときはfold間変動や1標準誤差ルールも考える。同じデータをモデル選択と最終性能評価の両方に繰り返し使うと、評価自体へ過適合しうる。

<!-- CARD -->

---
id: ms-ridge-lasso-orthogonal-numeric
title: RidgeとLassoを導出し縮小・零化の意味まで判断する
category: math-estimation
subcategory: math-model-selection
topic: regularization-canonical
type: strategy
difficulty: 4
priority: S
hashtags:
  - Ridge回帰
  - Lasso回帰
  - 正則化
  - 多重共線性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正則化
---
## 問題
線形回帰の正則化について次を答えよ。

1. Ridgeの目的関数から閉形式解を導け。
2. $X^{\mathsf T}X=\operatorname{diag}(4,1)$、$X^{\mathsf T}y=(8,2)^{\mathsf T}$、$\lambda=1$ のRidge推定量を求めよ。
3. $X^{\mathsf T}X=I$、$X^{\mathsf T}y=(3,0.5,-2)^{\mathsf T}$、$\lambda=1$ のLasso推定量を求めよ。
4. 特異値 $d=2$ の方向にRidge罰則 $\lambda=3$ を掛けたとき、最小二乗法に対する縮小率を求めよ。
5. 多重共線性があるとRidgeが安定する理由と、$\lambda$ を増やしたときのバイアス・バリアンスの変化を説明せよ。
6. Lassoが係数を0にできる理由と、変数選択の限界を述べよ。

## 答え
Ridge数値例は
$$
X^{\mathsf T}X+I
=\operatorname{diag}(5,2),
$$
よって
$$
\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(8/5,2/2)^{\mathsf T}
=(1.6,1.0)^{\mathsf T}.
$$

Lassoはsoft-thresholdingより
$$
(S(3,1),S(0.5,1),S(-2,1))
=(2,0,-1)^{\mathsf T}.
$$

特異値方向のRidge縮小率は
$$
\frac{2^2}{2^2+3}=\frac47.
$$

$\lambda$ を増やすと一般にバイアスは増え、バリアンスは減る。多重共線性では小さい固有値方向の大きな係数分散をRidgeが抑える。

## 使用公式・定理
Ridgeは
$$
Q(\boldsymbol\beta)
=\|\boldsymbol y-X\boldsymbol\beta\|^2
+\lambda\|\boldsymbol\beta\|^2
$$
を最小化する。勾配を0と置けば
$$
(X^{\mathsf T}X+\lambda I)\widehat{\boldsymbol\beta}
=X^{\mathsf T}\boldsymbol y,
$$
$$
\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(X^{\mathsf T}X+\lambda I)^{-1}X^{\mathsf T}\boldsymbol y.
$$

$X=UDV^{\mathsf T}$ と特異値分解すると、特異値 $d_j$ の方向は最小二乗法に比べ
$$
\frac{d_j^2}{d_j^2+\lambda}
$$
倍に縮む。小さい特異値方向ほど強く縮小されるため、多重共線性で不安定な方向を抑えられる。

Lassoを
$$
\frac12\|\boldsymbol y-X\boldsymbol\beta\|^2
+\lambda\sum_j|\beta_j|
$$
と定義すると、直交設計では
$$
\widehat\beta_j=S(z_j,\lambda),
\qquad
S(z,\lambda)=\operatorname{sign}(z)(|z|-\lambda)_+.
$$
したがって $|z_j|\le\lambda$ なら係数は厳密に0となる。

## 計算例
$X^{\mathsf T}X$ の最小固有値が $10^{-3}$ なら、最小二乗法ではその方向の逆固有値が $10^3$ と大きい。$\lambda=0.1$ のRidgeでは分母が $0.101$ となり、同方向の不安定性を大幅に抑える。

予測誤差を
$$
\operatorname{Err}=\operatorname{Bias}^2+\operatorname{Var}+\sigma^2
$$
と見ると、$\lambda=0$ から少し正則化することでバリアンス低下がバイアス増加を上回れば汎化誤差が改善する。

## 一手
Ridgeは「小さい固有値・特異値方向を連続的に縮めて安定化」、Lassoは「L1の角により一部係数を厳密に0化」と整理する。正則化はバイアスを導入してバリアンスを下げ、予測誤差を改善しうる。

## 注意
Ridgeは通常係数を厳密に0にはしない。Lassoは0化できるため変数選択を同時に行えるが、「常に真の変数集合を回復する」わけではない。選択一致性には設計行列、信号強度、$\lambda$ の減少速度など追加条件が必要で、強く相関した説明変数では選択が不安定になりやすい。

Elastic NetはL1とL2を組み合わせ、強相関変数群に対するLassoの不安定性を緩和する選択肢になる。
