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
目的関数を
$$Q(\boldsymbol\beta)=\|\boldsymbol Y-\boldsymbol X\boldsymbol\beta\|^2+\lambda\|\boldsymbol\beta\|^2$$
と置く。勾配は
$$\nabla Q(\boldsymbol\beta)
=-2\boldsymbol X^{\mathsf T}(\boldsymbol Y-\boldsymbol X\boldsymbol\beta)+2\lambda\boldsymbol\beta.$$
これを0と置くと
$$\left(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p\right)\widehat{\boldsymbol\beta}
=\boldsymbol X^{\mathsf T}\boldsymbol Y,$$
したがって
$$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
## 計算例
$p=2$、$\boldsymbol X^{\mathsf T}\boldsymbol X=\begin{pmatrix}1&0.99\\0.99&1\end{pmatrix}$、$\lambda=0.1$ なら $\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I=\begin{pmatrix}1.1&0.99\\0.99&1.1\end{pmatrix}$ となり逆行列が安定する。
## 注意
$\lambda=0$ は最小二乗法推定量に一致する。$\lambda\to\infty$ で、ペナルティ対象の係数は $\boldsymbol0$ へ収束する。通常は説明変数を標準化し、切片はペナルティから除く。

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
id: ms-aic-numeric-comparison
title: 対数尤度と母数数からAICを計算して比較する
category: math-estimation
subcategory: math-model-selection
topic: aic-numeric-comparison
type: calc_step
difficulty: 2
priority: S
hashtags: [AIC, 対数尤度, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 赤池情報量規準 }]
---
## 問題
モデルAは最大対数尤度 $-120$、推定母数数3、モデルBは最大対数尤度 $-117.5$、推定母数数6である。AICで選択せよ。

## 答え
$$\operatorname{AIC}_A=246,\qquad \operatorname{AIC}_B=247.$$
小さいモデルAを選ぶ。

## 使用公式・定理
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k,$$
ここで $k$ は推定した自由母数の個数である。AICは小さいほどよい。

## 計算例
$$\operatorname{AIC}_A=-2(-120)+2(3)=240+6=246,$$
$$\operatorname{AIC}_B=-2(-117.5)+2(6)=235+12=247.$$
Bは当てはまりの項を5改善したが、罰則が6増えたため総合的にはAが1だけ小さい。

## 一手
対数尤度は大きいほどよいが、AICへ変換した後は小さい方を選ぶ。

## 注意
全モデルで同じデータと同じ尤度の定義を使って比較する。

<!-- CARD -->

---
id: ms-bic-numeric-comparison
title: AIC・BIC・MallowsのCpでモデルを比較する
category: math-estimation
subcategory: math-model-selection
topic: information-criteria-comparison
type: calc_step
difficulty: 2
priority: S
hashtags:
  - AIC
  - BIC
  - MallowsのCp
  - モデル選択
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
モデル選択で使う AIC、BIC、Mallows の $C_p$ について次を答えよ。

1. AIC と BIC の式を書き、罰則の違いを説明せよ。
2. $n=200$ で、モデルAは $-2\ell(\widehat\theta)=300,k=4$、モデルBは $-2\ell(\widehat\theta)=294,k=7$ である。AIC と BIC で比較せよ。
3. 回帰候補モデルで $SSE_p=80$、完全モデルから得た $\widehat\sigma^2=4$、$n=30$、候補モデルの切片込み係数数 $p=6$ のとき Mallows の $C_p$ を求めよ。

## 答え
数値例では
$$
\operatorname{AIC}_A=308,
\qquad
\operatorname{AIC}_B=308
$$
で同点。

一方
$$
\operatorname{BIC}_A\approx321.19,
\qquad
\operatorname{BIC}_B\approx331.09
$$
なのでBICではモデルAを選ぶ。

Mallows の $C_p$ は
$$
C_p=2.
$$

## 使用公式・定理
AIC と BIC はどちらも
$$
\text{当てはまりの悪さ}+\text{複雑さへの罰則}
$$
の形で、値が小さいモデルを選ぶ。
$$
\operatorname{AIC}=-2\ell(\widehat\theta)+2k,
$$
$$
\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n.
$$
ここで $k$ は推定した自由母数の個数である。

回帰で完全モデルから共通の誤差分散推定値 $\widehat\sigma^2$ を得るとき
$$
C_p=\frac{SSE_p}{\widehat\sigma^2}-n+2p.
$$
適切に指定された候補モデルでは $C_p$ が $p$ 付近になることが一つの目安である。

## 計算例
AICは
$$
\begin{aligned}
\operatorname{AIC}_A
&=300+2(4)\\
&=308,
\end{aligned}
$$
$$
\begin{aligned}
\operatorname{AIC}_B
&=294+2(7)\\
&=308.
\end{aligned}
$$
モデルBは適合度を6改善したが、追加3母数のAIC罰則も $2\times3=6$ 増えたため同点になる。

BICでは
$$
\log200\approx5.2983.
$$
よって
$$
\begin{aligned}
\operatorname{BIC}_A
&=300+4(5.2983)\\
&\approx321.19,
\end{aligned}
$$
$$
\begin{aligned}
\operatorname{BIC}_B
&=294+7(5.2983)\\
&\approx331.09.
\end{aligned}
$$
追加3母数の罰則は約
$$
3\log200\approx15.89
$$
で、適合改善6を上回る。

Mallows の $C_p$ は
$$
\begin{aligned}
C_p
&=\frac{80}{4}-30+2(6)\\
&=20-30+12\\
&=2.
\end{aligned}
$$

## 一手
規準名ごとに別暗記せず、まず
$$
\text{適合改善が追加した複雑さの罰則を上回るか}
$$
を見る。AICは1母数あたり2、BICは1母数あたり $\log n$ を罰する。$n$ が大きいと通常BICの方が追加母数を強く罰する。$C_p$ は回帰の残差平方和を共通の誤差分散で尺度化して複雑さを補正する。

## 注意
AIC・BICは同じデータ、同じ尤度定義のモデル同士で比較する。BICの $\log$ は自然対数。AICは予測的KL損失、BICは正則条件下でのモデル同定・周辺尤度近似との関係が強く、目的が異なるので常に同じモデルを選ぶとは限らない。

$C_p$ の $\widehat\sigma^2$ は候補ごとに作らず、通常は十分大きい共通モデルから得る。$C_p\approx p$ は絶対的な合否判定ではなく候補比較の目安である。

<!-- CARD -->

---
id: ms-kfold-cv-numeric
title: k分割交差検証の損失を平均してモデルを選ぶ
category: math-estimation
subcategory: math-model-selection
topic: kfold-cv-numeric
type: calc_step
difficulty: 2
priority: A
hashtags: [交差検証, 検証誤差, モデル選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交差検証 }]
---
## 問題
5分割交差検証で、モデルAの各foldの平均二乗誤差が $(4.0,5.0,3.5,4.5,3.0)$、モデルBが $(3.8,4.2,4.0,4.1,4.4)$ だった。平均検証誤差で選択せよ。

## 答え
$$\operatorname{CV}_A=4.00,\qquad
\operatorname{CV}_B=4.10.$$
平均検証誤差が小さいモデルAを選ぶ。

## 使用公式・定理
各foldの大きさが等しいとき
$$\operatorname{CV}=\frac1K\sum_{j=1}^K L_j.$$
foldの大きさが異なる場合は、各観測の損失へ戻して標本数で重み付けする。

## 計算例
$$\operatorname{CV}_A=\frac{4.0+5.0+3.5+4.5+3.0}{5}
=\frac{20.0}{5}=4.00,$$
$$\operatorname{CV}_B=\frac{3.8+4.2+4.0+4.1+4.4}{5}
=\frac{20.5}{5}=4.10.$$

## 一手
訓練誤差ではなく、各foldで学習に使わなかったデータの損失を平均する。

## 注意
差が小さい場合は、fold間変動や1標準誤差ルールも考慮する。

<!-- CARD -->

---
id: ms-ridge-lasso-orthogonal-numeric
title: Ridge縮小とLasso零化を導いて計算する
category: math-estimation
subcategory: math-model-selection
topic: regularization-canonical
type: calc_step
difficulty: 3
priority: A
hashtags:
  - Ridge回帰
  - Lasso回帰
  - 正則化
  - 特異値分解
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

## 答え
Ridgeの閉形式解は
$$
\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(X^{\mathsf T}X+\lambda I)^{-1}X^{\mathsf T}\boldsymbol y.
$$
数値例では
$$
\widehat{\boldsymbol\beta}_{\mathrm{ridge}}=(1.6,1.0)^{\mathsf T},
$$
$$
\widehat{\boldsymbol\beta}_{\mathrm{lasso}}=(2,0,-1)^{\mathsf T}.
$$
特異値 $d=2,\lambda=3$ のRidge縮小率は
$$
\frac47.
$$

## 使用公式・定理
Ridgeは
$$
Q(\boldsymbol\beta)
=\|\boldsymbol y-X\boldsymbol\beta\|^2
+\lambda\|\boldsymbol\beta\|^2
$$
を最小にする。勾配は
$$
\nabla Q
=-2X^{\mathsf T}(\boldsymbol y-X\boldsymbol\beta)
+2\lambda\boldsymbol\beta.
$$
よって
$$
(X^{\mathsf T}X+\lambda I)\widehat{\boldsymbol\beta}
=X^{\mathsf T}\boldsymbol y,
$$
$$
\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(X^{\mathsf T}X+\lambda I)^{-1}X^{\mathsf T}\boldsymbol y.
$$

$X=UDV^{\mathsf T}$ と特異値分解すると、Ridgeは右特異ベクトル方向 $j$ を最小二乗法に比べ
$$
\frac{d_j^2}{d_j^2+\lambda}
$$
倍に縮める。小さい特異値方向ほど強く縮小される。

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
一般の設計でもKKT条件から、部分残差 $\boldsymbol r_{-j}$ に対し
$$
|\boldsymbol x_j^{\mathsf T}\boldsymbol r_{-j}|\le\lambda
$$
なら $\widehat\beta_j=0$ が最適条件を満たす。

Elastic Netは
$$
\frac12\|\boldsymbol y-X\boldsymbol\beta\|^2
+\lambda\left\{
\alpha\sum_j|\beta_j|
+\frac{1-\alpha}{2}\sum_j\beta_j^2
\right\}
$$
とL1・L2を併用する。$\alpha=1$ でLasso、$\alpha=0$ でRidge型。

## 計算例
Ridgeの停留条件は
$$
\begin{aligned}
0
&=-2X^{\mathsf T}(y-X\beta)+2\lambda\beta\\
&=-2X^{\mathsf T}y+2X^{\mathsf T}X\beta+2\lambda\beta,
\end{aligned}
$$
したがって
$$
(X^{\mathsf T}X+\lambda I)\beta=X^{\mathsf T}y.
$$

直交対角例では
$$
\widehat\beta_1=\frac8{4+1}=1.6,
\qquad
\widehat\beta_2=\frac2{1+1}=1.0.
$$

Lassoはsoft-thresholdingより
$$
S(3,1)=2,
\qquad
S(0.5,1)=0,
\qquad
S(-2,1)=-1.
$$
中央が0になることはKKTでも
$$
|0.5|\le1=\lambda
$$
と確認できる。

SVD方向では
$$
\begin{aligned}
\text{縮小率}
&=\frac{d^2}{d^2+\lambda}\\
&=\frac{2^2}{2^2+3}\\
&=\frac47.
\end{aligned}
$$
小さい特異値方向ほど分母の $\lambda$ の影響が相対的に大きい。

## 一手
RidgeはL2罰則により**不安定な方向を連続的に縮める**。LassoはL1罰則の非微分点により**小さい係数をちょうど0へ落とす**。同じ「複雑さを罰する」正則化でも、L2の丸い制約境界とL1の角を持つ境界が挙動の違いを生む。

## 注意
Ridgeは分散を下げる代わりにバイアスを導入する。Lassoの閾値やKKT条件の定数は、二乗誤差項に $1/2$ を付けるかなど目的関数の規約で変わる。通常は説明変数を標準化し、切片は罰しない。相関の強い説明変数ではLassoが一部だけを選ぶことがあり、Elastic NetはL2成分により選択を安定化させる場合がある。
