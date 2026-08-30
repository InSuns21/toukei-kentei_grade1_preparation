---
id: ms-kl-nonnegativity
title: KL情報量の非負性（ギブスの不等式）を確認する
category: math-estimation
subcategory: math-model-selection
topic: kl-nonnegativity
type: theorem
difficulty: 3
priority: C
hashtags:
  - カルバック・ライブラー情報量
  - ギブスの不等式
  - 情報量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-kl-divergence
archive_note: KL情報量の非負性とギブスの不等式による確認は定義・数値例を含むKL canonical cardへ統合済み。
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
id: ms-overfitting-generalization
title: 過学習と汎化誤差の関係を説明する
category: math-estimation
subcategory: math-model-selection
topic: overfitting-generalization
type: recognition
difficulty: 1
priority: C
hashtags:
  - 過学習
  - 汎化誤差
  - モデル評価
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-kfold-cv-numeric
archive_note: 訓練誤差が非増加でも汎化誤差が悪化しうる過学習の説明は、交差検証によるモデル選択canonical cardへ統合済み。
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
id: ms-variable-selection-stepwise
title: 変数選択の前進・後退・逐次法を説明する
category: math-estimation
subcategory: math-model-selection
topic: variable-selection
type: strategy
difficulty: 2
priority: C
hashtags:
  - 変数選択
  - 前進選択
  - 後退消去
  - ステップワイズ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: 前進選択・後退消去・ステップワイズ法は、AIC等を局所的に改善する探索として情報量規準canonical cardへ統合済み。
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
hashtags:
  - 正則化
  - バイアス・バリアンス分解
  - 汎化誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: 正則化でバイアスが増えバリアンスが減る関係と予測誤差への影響はRidge/Lasso canonical cardへ統合済み。
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
id: ms-multicollinearity-ridge
title: 多重共線性があるときRidgeが安定する理由を説明する
category: math-estimation
subcategory: math-model-selection
topic: multicollinearity-ridge
type: recognition
difficulty: 3
priority: B
hashtags:
  - 多重共線性
  - Ridge回帰
  - 条件数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多重共線性
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: 多重共線性で小さい固有値方向が不安定になりRidgeが安定化する理由は特異値縮小と数値例を含むcanonical cardへ統合済み。
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
id: ms-lasso-selection
title: Lassoの変数選択性と成立条件を確認する
category: math-estimation
subcategory: math-model-selection
topic: lasso-selection
type: recognition
difficulty: 3
priority: B
hashtags:
  - Lasso回帰
  - 変数選択
  - スパース性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: Lassoのsoft-thresholdingによる零化、変数選択性、選択一致性には追加条件が必要という限界までRidge/Lasso
  canonical cardへ統合済み。
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
