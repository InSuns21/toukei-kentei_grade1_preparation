---
id: est-estimator-estimate-parameter
title: 推定量・推定値・母数の区別
category: math-estimation
subcategory: math-point-estimator-properties
topic: terminology
type: condition
difficulty: 1
priority: A
hashtags: [推定量, 推定値, 母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 点推定量の性質 }]
---
## 問題
推定量（estimator）、推定値（estimate）、母数（parameter）を区別して説明せよ。
## 答え
母数 $\theta$ は母集団分布を決める未知の定数。推定量 $\widehat\theta$ は標本の関数 $\widehat\theta=\widehat\theta(X_1,\ldots,X_n)$ で確率変数。推定値は観測後に実現した値 $\widehat\theta(x_1,\ldots,x_n)$ で単なる数である。
## 使用公式・定理
$$T=T(X_1,\ldots,X_n)\;(\text{推定量・確率変数}),\qquad T(x_1,\ldots,x_n)\;(\text{推定値・定数}).$$
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ の平均の推定量 $\widehat\mu=\overline X$ は確率変数。観測値 $x=(1,2,3)$ に対して推定値は $\overline x=2$。
## 一手
推定量は「関数」で確率変数、推定値は「代入した数」。分散・期待値は推定量に対して取る。
<!-- CARD -->
---
id: est-unbiasedness
title: 不偏性の定義
category: math-estimation
subcategory: math-point-estimator-properties
topic: unbiasedness
type: condition
difficulty: 1
priority: S
hashtags: [不偏性, バイアス, 推定量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 不偏性 }]
---
## 問題
推定量 $T$ が $\theta$ の不偏推定量であるとは何か。バイアスも定義せよ。
## 答え
全ての $\theta$ について $E_\theta[T]=\theta$ となるとき不偏という。バイアスは $B_\theta(T)=E_\theta[T]-\theta$。
## 使用公式・定理
$$\operatorname{Bias}_\theta(T)=E_\theta[T]-\theta,\qquad T\text{ 不偏}\iff \operatorname{Bias}_\theta(T)=0\;\forall\theta.$$
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ では $E[\overline X]=\mu$ より不偏。不偏標本分散 $S^2=\frac1{n-1}\sum(X_i-\overline X)^2$ は $E[S^2]=\sigma^2$ で不偏。
## 一手
「期待値を取ると母数に一致する」こと。不偏性は全ての $\theta$ で要求される。
<!-- CARD -->
---
id: est-consistency
title: 一致性の定義
category: math-estimation
subcategory: math-point-estimator-properties
topic: consistency
type: condition
difficulty: 2
priority: S
hashtags: [一致性, 確率収束, 標本サイズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一致性 }]
---
## 問題
推定量列 $T_n$（標本サイズ $n$ の関数）が $\theta$ の一致推定量であるとはどういう意味か。
## 答え
$n\to\infty$ のとき $T_n$ が $\theta$ へ確率収束すること：
$$T_n\xrightarrow{p}\theta,\quad\text{すなわち}\; \forall\epsilon>0,\;\lim_{n\to\infty}P_\theta(|T_n-\theta|\ge\epsilon)=0.$$
## 使用公式・定理
十分条件：$\lim_n E[T_n]=\theta$ かつ $\lim_n\operatorname{Var}(T_n)=0$（平均二乗一致性）。
## 計算例
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ で $T_n=\overline X$ は $E[\overline X]=\mu$、$\operatorname{Var}(\overline X)=\sigma^2/n\to0$ より一致。母分散の最尤推定量 $n^{-1}\sum(X_i-\overline X)^2$ はバイアスがあるが $n\to\infty$ で $\sigma^2$ に一致。
## 一手
不偏性は有限標本、一致性は $n\to\infty$ の性質。バイアスが消えなくても分散が0へ向かえば一致しうる。
<!-- CARD -->
---
id: est-mse-definition
title: 平均二乗誤差MSEの定義
category: math-estimation
subcategory: math-point-estimator-properties
topic: mse
type: condition
difficulty: 1
priority: S
hashtags: [MSE, 平均二乗誤差, リスク]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
---
## 問題
推定量 $T$ の母数 $\theta$ に対する平均二乗誤差 $\operatorname{MSE}_\theta(T)$ を定義せよ。
## 答え
$$\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2].$$
$\theta$ の関数としての損失 $\ell(T,\theta)=(T-\theta)^2$ の期待値（リスク関数）である。
## 使用公式・定理
$$\operatorname{MSE}_\theta(T)=\operatorname{Var}_\theta(T)+\{\operatorname{Bias}_\theta(T)\}^2.$$
## 計算例
$T=\overline X$、$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ では不偏なので $\operatorname{MSE}=\operatorname{Var}(\overline X)=\sigma^2/n$。
## 一手
MSEは「分散＋バイアス²」。不偏推定量では MSE＝分散になる。
<!-- CARD -->
---
id: est-bias-variance-tradeoff
title: バイアス・バリアンス分解の意味
category: math-estimation
subcategory: math-point-estimator-properties
topic: bias-variance-decomposition
type: proof_step
difficulty: 2
priority: A
hashtags: [バイアス, バリアンス, 分解]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
---
## 問題
平均二乗誤差が「分散」と「バイアスの2乗」に分解できることを導け。$T-\theta$ を $T-E[T]$ と $E[T]-\theta$ に分けて示せ。
## 答え
$T-\theta=(T-E[T])+(E[T]-\theta)$ と分解し、交差項の期待値が0になる：
$$E[(T-E[T])(E[T]-\theta)]=(E[T]-\theta)E[T-E[T]]=0.$$
## 使用公式・定理
$$\operatorname{MSE}_\theta(T)=\operatorname{Var}_\theta(T)+\{\operatorname{Bias}_\theta(T)\}^2.$$
## 計算例
$$E[(T-\theta)^2]=E[(T-E[T])^2]+2(E[T]-\theta)E[T-E[T]]+(E[T]-\theta)^2=\operatorname{Var}(T)+\operatorname{Bias}^2.$$
## 一手
交差項は中心化された確率変数の期待値0から消える。バイアスを下げると分散が上がるトレードオフの基礎。
<!-- CARD -->
---
id: est-relative-efficiency
title: 推定量の相対効率
category: math-estimation
subcategory: math-point-estimator-properties
topic: relative-efficiency
type: condition
difficulty: 2
priority: A
hashtags: [相対効率, 分散, 比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の相対効率 }]
---
## 問題
2つの不偏推定量 $T_1,T_2$ の相対効率をどう定義するか。
## 答え
基準 $T_1$ を分母に取る分散の比で定義する：
$\operatorname{eff}(T_1,T_2)=\frac{\operatorname{Var}_\theta(T_2)}{\operatorname{Var}_\theta(T_1)}.$
値が $>1$ なら分母 $T_1$ の分散が小さく、$T_1$ が優れる。分散が小さい方を「より効率的」という。
## 使用公式・定理
不偏推定量では分散が小さくMSEが小さい。バイアスがある場合はMSEで比較する。
## 計算例
$T_1=\overline X$、$T_2=X_1$（正規標本から $\mu$）で $\operatorname{Var}(T_1)=\sigma^2/n<\sigma^2=\operatorname{Var}(T_2)$。$\operatorname{eff}(T_1,T_2)=n>1$。
## 一手
相対効率は「不偏なら分散の逆比」。2つの推定量の良さ比較の指標。
<!-- CARD -->
---
id: est-method-of-moments
title: モーメント法の手順
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments
type: strategy
difficulty: 2
priority: A
hashtags: [モーメント法, 母モーメント, 標本モーメント]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
モーメント法の一般手順を述べよ。母数が $k$ 個のときはどうするか。
## 答え
母モーメント $E[X^j]$（$j=1,\ldots,k$）を母数の関数として表し、対応する標本モーメント $\frac1n\sum_i X_i^j$ に等置して連立方程式を解く。
## 使用公式・定理
$$E[X^j]=\frac1n\sum_{i=1}^n X_i^j,\qquad j=1,\ldots,k.$$
## 計算例
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ なら $\overline X=\mu$、$\frac1n\sum X_i^2=\mu^2+\sigma^2$ から $\widehat\mu=\overline X$、$\widehat\sigma^2=\frac1n\sum(X_i-\overline X)^2$。
## 一手
母モーメントを標本モーメントで置き換えて解く。最尤推定とは一般に異なる。
<!-- CARD -->
---
id: est-unbiased-construction
title: 不偏推定量の構成
category: math-estimation
subcategory: math-point-estimator-properties
topic: unbiased-construction
type: strategy
difficulty: 2
priority: S
hashtags: [不偏推定量, 標本平均, 不偏分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 不偏性 }]
---
## 問題
母平均 $\mu$ と母分散 $\sigma^2$ の不偏推定量を構成せよ。
## 答え
$\overline X$ は $\mu$ の不偏推定量。母分散には自由度補正した $S^2=\frac1{n-1}\sum_i(X_i-\overline X)^2$ を使うと不偏になる。
## 使用公式・定理
$$E[\overline X]=\mu,\qquad E\!\left[\frac1{n-1}\sum_i(X_i-\overline X)^2\right]=\sigma^2.$$
## 計算例
$E[\sum_i(X_i-\overline X)^2]=(n-1)\sigma^2$ より $n-1$ で割ると不偏。
## 一手
最尤推定量（$n$ で割る方）はバイアスがある。不偏分散は $n-1$ で割る。
<!-- CARD -->
---
id: est-plug-in
title: プラグイン推定量
category: math-estimation
subcategory: math-estimation-methods
topic: plug-in
type: condition
difficulty: 2
priority: A
hashtags: [プラグイン, 経験分布, 代入]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: その他の手法 }]
---
## 問題
プラグイン推定量の考え方を説明せよ。
## 答え
母集団の未知母数や汎関数を、経験分布関数 $\widehat F_n$（または標本対応）へ代入して求める。母平均は $\overline X$、母分散の最尤推定量 $n^{-1}\sum(X_i-\overline X)^2$ などが例。
## 使用公式・定理
$$\widehat F_n(x)=\frac1n\sum_{i=1}^n \mathbf 1\{X_i\le x\}.$$
汎関数 $\theta=\theta(F)$ に対し $\widehat\theta=\theta(\widehat F_n)$。
## 計算例
$F$ の平均 $\mu(F)=\int x\,dF(x)$ を経験分布に代入すると $\mu(\widehat F_n)=\overline X$。
## 一手
「母集団分布を経験分布に置き換える」。モーメント法と密接に関係する。
<!-- CARD -->
---
id: est-transform-bias
title: 推定量の変換とバイアス
category: math-estimation
subcategory: math-point-estimator-properties
topic: transform-bias
type: pitfall
difficulty: 2
priority: A
hashtags: [変換, バイアス, 非線形]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 点推定量の性質 }]
---
## 問題
不偏推定量 $T$ の非線形関数 $g(T)$ は一般に不偏にならない。なぜか。例を挙げよ。
## 答え
期待値の線形性は成り立つが $E[g(T)]=g(E[T])$ は非線形 $g$ では一般に不成立。$g$ が凸なら Jensenの不等式で $E[g(T)]\ge g(E[T])$。
## 使用公式・定理
Jensenの不等式（$g$ 凸）：$E[g(T)]\ge g(E[T])$。
## 計算例
$E[\overline X^2]=\mu^2+\sigma^2/n\ne \mu^2$。不偏な $\overline X$ の2乗は $\mu^2$ の不偏推定量ではない。
## 一手
「不偏性は線形変換では保たれ、非線形変換では保たれない」。Jensenで凸側へシフトする。
<!-- CARD -->
---
id: est-rao-blackwell
title: Rao--Blackwell化
category: math-estimation
subcategory: math-point-estimator-properties
topic: rao-blackwell
type: theorem
difficulty: 3
priority: S
hashtags: [Rao-Blackwell, 十分統計量, 分散減少]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
Rao--Blackwellの定理を述べよ。十分統計量 $T$ と不偏推定量 $U$ からどう改善するか。
## 答え
$T$ を $\theta$ の十分統計量、$U$ を不偏推定量とする。$\widehat\theta=E[U\mid T]$ は不偏かつ
$$\operatorname{Var}_\theta(\widehat\theta)\le\operatorname{Var}_\theta(U),$$
等号は $\widehat\theta=U$（a.s.）のときのみ。
## 使用公式・定理
条件付き期待値の全分散公式：
$$\operatorname{Var}(U)=\operatorname{Var}(E[U\mid T])+E[\operatorname{Var}(U\mid T)]\ge\operatorname{Var}(E[U\mid T]).$$
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$U=X_1$ は不偏。$T=\sum_iX_i$ の下で $E[X_1\mid T]=T/n=\overline X$ となり分散が減る。
## 一手
十分統計量の条件付き期待値を取れば不偏性を保ち分散を減らせる。
<!-- CARD -->
---
id: est-umvu-idea
title: UMVU推定量の考え方
category: math-estimation
subcategory: math-point-estimator-properties
topic: umvu
type: condition
difficulty: 3
priority: A
hashtags: [UMVU, 一様最小分散, 十分統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
---
## 問題
一様最小分散不偏推定量（UMVU）とは何か。
## 答え
$\theta$ の全ての不偏推定量の中で、全ての $\theta$ に対して分散が最小となる不偏推定量。存在すれば完備十分統計量の関数として一意に表せる。
## 使用公式・定理
Rao--Blackwell化で十分統計量の関数へ改善し、完備性で一意性（Lehmann--Schefféの定理）を得る。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ では $\overline X$ が $p$ のUMVU。$T=\sum_iX_i$ は完備十分。
## 一手
「不偏の中の分散最小」＋「十分統計量の関数」。完備十分統計量があればUMVUを構成できる。
<!-- CARD -->
---
id: est-loss-risk
title: 損失関数とリスク関数
category: math-estimation
subcategory: math-point-estimator-properties
topic: loss-risk
type: condition
difficulty: 2
priority: A
hashtags: [損失関数, リスク関数, 決定論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
---
## 問題
損失関数 $L(\theta,T)$ とリスク関数 $R(\theta,T)$ を定義せよ。
## 答え
損失は真の母数 $\theta$ に対し推定量 $T$ を使ったときの損失（例：二乗損失 $L=(T-\theta)^2$）。リスクはその期待値：
$$R(\theta,T)=E_\theta[L(\theta,T)].$$
## 使用公式・定理
二乗損失では $R(\theta,T)=\operatorname{MSE}_\theta(T)=\operatorname{Var}_\theta(T)+\operatorname{Bias}^2$。
## 計算例
$L(T,\theta)=(T-\theta)^2$ なら $R=E[(T-\theta)^2]=\operatorname{MSE}$。
## 一手
リスク＝損失の期待値。二乗損失ではMSEと一致する。
<!-- CARD -->
---
id: est-estimator-comparison
title: 推定量比較の典型問題
category: math-estimation
subcategory: math-point-estimator-properties
topic: estimator-comparison
type: strategy
difficulty: 3
priority: A
hashtags: [推定量比較, MSE, バイアス分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の相対効率 }]
---
## 問題
同一母数 $\theta$ の2つの推定量 $T_1,T_2$ を比較するときの典型手順を述べよ。
## 答え
1) それぞれの期待値とバイアス、2) 分散、3) 必要ならMSEを計算し比較する。不偏なら分散（相対効率）で、そうでなければMSEで比較する。
## 使用公式・定理
$$\operatorname{MSE}(T)=\operatorname{Var}(T)+\operatorname{Bias}(T)^2.$$
## 計算例
正規標本で $\widehat\sigma^2_1=\frac1n\sum(X_i-\overline X)^2$（最尤推定量）と $S^2=\frac1{n-1}\sum(X_i-\overline X)^2$：$E[\widehat\sigma^2_1]=\frac{n-1}{n}\sigma^2$（負バイアス）、$S^2$ は不偏。一方、
$$\operatorname{MSE}(\widehat\sigma^2_1)=\frac{2n-1}{n^2}\sigma^4,\qquad \operatorname{MSE}(S^2)=\frac{2}{n-1}\sigma^4,$$
なので $n>1$ では最尤推定量のMSEの方が小さい。不偏性だけで優劣を決めない例である。
## 一手
まず不偏性、次に分散、総合ならMSE。比較は固定した $\theta$ の関数として全母数空間で考える。
<!-- CARD -->
---
id: est-score-mean-zero
title: スコア関数の期待値0
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: proof_step
difficulty: 2
priority: S
hashtags: [スコア関数, 期待値, 正則条件]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効スコア関数 }]
---
## 問題
正則条件の下で、スコア関数（対数密度の母数に関する微分）の期待値が0になることを示せ。
## 答え
$\int f(x;\theta)dx=1$ を $\theta$ で微分する。積分と微分の交換が可能なら
$$\int \frac{\partial}{\partial\theta}f(x;\theta)\,dx=\int U(\theta)f(x;\theta)\,dx=E[U(\theta)]=\frac{\partial}{\partial\theta}\int f(x;\theta)\,dx=0.$$
## 使用公式・定理
$E[U(\theta)]=0$、ただし $\frac{\partial f}{\partial\theta}=U f$ と $\int f=1$ を用いる。ここで $U(\theta)=\partial\log f/\partial\theta$。
## 計算例
$\operatorname{Bernoulli}(p)$：$U(p)=X/p-(1-X)/(1-p)$。$E[U]=p/p-(1-p)/(1-p)=0$。
## 一手
$\int f=1$ を微分して微分を積分の中へ入れる。交換可能が正則条件。
<!-- CARD -->
---
id: est-fisher-information-def
title: フィッシャー情報量（1次元）の定義
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: condition
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, スコア, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
正則条件の下で、1観測当たりのフィッシャー情報量（1次元）を定義せよ。
## 答え
スコア関数の分散（＝期待値0より）：
$$I_1(\theta)=E_\theta[U(\theta)^2],\qquad U(\theta)=\frac{\partial}{\partial\theta}\log f(X;\theta).$$
## 使用公式・定理
$I_1(\theta)=E[U(\theta)^2]=\operatorname{Var}_\theta(U(\theta))$（$E[U]=0$ より）。
## 計算例
$\operatorname{Bernoulli}(p)$：$U(p)=X/p-(1-X)/(1-p)$ から $I_1(p)=1/[p(1-p)]$。
## 一手
フィッシャー情報量（1次元）は「スコアの分散」＝データが $\theta$ について運ぶ情報量の尺度。
<!-- CARD -->
---
id: est-fisher-two-forms
title: フィッシャー情報量（1次元）の2つの表式
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: theorem
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, 2回微分, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
正則条件の下でフィッシャー情報量（1次元）の2つの表式を述べ、同値であることを示せ。
## 答え
$$I_1(\theta)=E_\theta[U(\theta)^2]=-E_\theta\!\left[\frac{\partial^2}{\partial\theta^2}\log f(X;\theta)\right].$$
## 使用公式・定理
$U=\partial\log f/\partial\theta$ と $\partial f/\partial\theta=U f$ を使い、$\int f=1$ の2回微分で $E[U^2+\partial^2\log f/\partial\theta^2]=0$。
## 計算例
$X\sim N(\mu,\sigma^2)$（$\sigma^2$既知）では $\partial^2\ell/\partial\mu^2=-1/\sigma^2$、$-E[\cdot]=1/\sigma^2$。$E[U^2]$ も $1/\sigma^2$ で一致。
## 一手
第1式はスコアの2乗の期待値、第2式は対数密度の2階微分の負の期待値。計算しやすい方を使う。
<!-- CARD -->
---
id: est-fisher-additivity
title: 独立標本での情報量の加法性
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: theorem
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, 加法性, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
独立な観測 $X_1,\ldots,X_n$ が同一分布に従うとき、標本全体のフィッシャー情報量（1次元）はどうなるか。
## 答え
各観測の情報量の和になる：
$$I_n(\theta)=\sum_{i=1}^n I_{X_i}(\theta)=nI_1(\theta).$$
## 使用公式・定理
独立性から対数尤度が和に分解し、スコアの分散が各項の分散の和になる。$E[U]=0$ が各 $i$ で成り立つ。
## 計算例
$\operatorname{Bernoulli}(p)$ 標本なら $I_n(p)=n/[p(1-p)]$。
## 一手
標本全体の情報量＝1観測の情報量×$n$。独立でない場合は共分散の寄与に注意。
<!-- CARD -->
---
id: est-fisher-bernoulli-example
title: Bernoulliのフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-info-bernoulli
type: calc_step
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, Bernoulli, 計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
$X\sim\operatorname{Bernoulli}(p)$ の1観測当たりのフィッシャー情報量（1次元）を求めよ。
## 答え
$I_1(p)=1/[p(1-p)]$。
## 使用公式・定理
$$\ell(p;x)=x\log p+(1-x)\log(1-p),\qquad \ell''(p;x)=-\frac{x}{p^2}-\frac{1-x}{(1-p)^2}.$$
## 計算例
$$I_1(p)=-E[\ell''(p;X)]=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}=\frac1{p(1-p)}.$$
## 一手
2階微分の負の期待値を取る。分母 $p(1-p)$ は分散 $p(1-p)$ の逆数。
<!-- CARD -->
---
id: est-fisher-poisson-example
title: Poissonのフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-info-poisson
type: calc_step
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, Poisson, 計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
$X\sim\operatorname{Poisson}(\lambda)$ の1観測当たりのフィッシャー情報量（1次元）を求めよ。
## 答え
$I_1(\lambda)=1/\lambda$。
## 使用公式・定理
$$f(x;\lambda)=\frac{\lambda^x e^{-\lambda}}{x!},\qquad \ell(\lambda;x)=x\log\lambda-\lambda-\log x!.$$
$$\ell'(\lambda;x)=\frac{x}{\lambda}-1,\qquad \ell''(\lambda;x)=-\frac{x}{\lambda^2}.$$
## 計算例
$$I_1(\lambda)=-E[\ell''(\lambda;X)]=\frac{E[X]}{\lambda^2}=\frac{\lambda}{\lambda^2}=\frac1\lambda.$$
## 一手
$E[X]=\lambda$ を代入。Poissonの情報量は $\lambda$ の逆数。
<!-- CARD -->
---
id: est-fisher-normal-example
title: 正規分布のフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-info-normal
type: calc_step
difficulty: 2
priority: S
hashtags: [フィッシャー情報量（1次元）, 正規分布, 計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$ の $\mu$ についての1観測当たりのフィッシャー情報量（1次元）を求めよ（$\sigma^2$ 既知）。
## 答え
$I_1(\mu)=1/\sigma^2$。
## 使用公式・定理
$$\log f(x;\mu)=-\frac12\log(2\pi\sigma^2)-\frac{(x-\mu)^2}{2\sigma^2},\qquad \frac{\partial^2}{\partial\mu^2}\log f=-\frac1{\sigma^2}.$$
## 計算例
$$I_1(\mu)=-E\!\left[-\frac1{\sigma^2}\right]=\frac1{\sigma^2}.$$
## 一手
2階微分が定数 $-1/\sigma^2$ なので期待値を取る必要もほぼない。標本全体では $n/\sigma^2$。
<!-- CARD -->
---
id: est-cramer-rao-lower-bound
title: Cramer--Rao下界
category: math-estimation
subcategory: math-point-estimator-properties
topic: cramer-rao
type: theorem
difficulty: 3
priority: S
hashtags: [Cramer-Rao, CRLB, フィッシャー情報量（1次元）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
---
## 問題
Cramer--Raoの不等式を述べよ。$g(\theta)$ の不偏推定量 $T$ の分散の下界は何か。
## 答え
正則条件の下で、$E[T]=g(\theta)$ なる $T$ に対し
$$\operatorname{Var}_\theta(T)\ge\frac{\{g'(\theta)\}^2}{I_n(\theta)}.$$
$g(\theta)=\theta$ のときは $\operatorname{Var}_\theta(T)\ge1/I_n(\theta)$。
## 使用公式・定理
Cov$(T,U)^2\le\operatorname{Var}(T)\operatorname{Var}(U)$（Cauchy--Schwarz）にスコア $U$ を代入。
## 計算例
$\operatorname{Bernoulli}(p)$ 標本で $g(p)=p$：$I_n(p)=n/[p(1-p)]$ より $\operatorname{Var}(\overline X)\ge p(1-p)/n$。$\overline X$ は等号で下限を達成。
## 一手
下界は「スコアの分散（情報量）」で割る。等号達成はスコアと $T$ の線形関係で判定。
<!-- CARD -->
---
id: est-crlb-equality
title: CRLBの等号成立条件
category: math-estimation
subcategory: math-point-estimator-properties
topic: cramer-rao
type: theorem
difficulty: 3
priority: A
hashtags: [Cramer-Rao, 等号, 指数型分布族]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
---
## 問題
Cramer--Rao下界の等号が成立する条件を述べよ。
## 答え
$T-g(\theta)$ がスコア $U(\theta)$ と線形関係にあること：
$$T-g(\theta)=a(\theta)U(\theta)\quad\text{(a.s.)}$$
を満たすとき、そしてそのときに限り等号が成立する。
## 使用公式・定理
Cauchy--Schwarzで等号は $T$ と $U$ が線形従属のとき。
## 計算例
$\overline X$（Bernoulliで $p$）は $U(p)=n(\overline X-p)/[p(1-p)]$ と書け、$T-p$ が $U$ に比例するので等号成立。
## 一手
CRLBを達成する推定量は指数型分布族で十分統計量の線形関数になる傾向がある。
<!-- CARD -->
---
id: est-efficient-estimator
title: 有効推定量
category: math-estimation
subcategory: math-point-estimator-properties
topic: efficiency
type: condition
difficulty: 2
priority: A
hashtags: [有効推定量, CRLB, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効性 }]
---
## 問題
有効推定量（efficient estimator）とは何か。
## 答え
$\theta$ の不偏推定量のうち、その分散がCramer--Rao下界に等しいもの：
$$\operatorname{Var}_\theta(T)=\frac1{I_n(\theta)}\quad(\text{または一般の }g(\theta)\text{ では }\{g'(\theta)\}^2/I_n(\theta)).$$
## 使用公式・定理
有効推定量はCRLBを達成するから、不偏推定量の中で最小分散（UMVU）でもある。
## 計算例
正規標本の $\overline X$ は $\operatorname{Var}(\overline X)=\sigma^2/n=1/I_n(\mu)$ で有効。Bernoulli の $\overline X$ も $p$ に対して有効。
## 一手
「CRLBを達成する不偏推定量」＝最小分散不偏。存在しない場合も多い。
<!-- CARD -->
---
id: est-asymptotic-efficiency
title: 漸近効率
category: math-estimation
subcategory: math-point-estimator-properties
topic: asymptotic-efficiency
type: condition
difficulty: 3
priority: A
hashtags: [漸近効率, 漸近分散, 最尤]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効性 }]
---
## 問題
推定量の漸近効率とは何か。
## 答え
標本サイズ $n$ で $\sqrt n(T_n-\theta)\xrightarrow{d}N(0,\sigma^2_\infty)$ のとき、漸近分散 $\sigma^2_\infty$ を比較する。CRLB相当の $1/I_1(\theta)$ に漸近分散が一致すれば漸近有効という。
## 使用公式・定理
漸近分散の逆比で相対漸近効率 $\operatorname{ARE}=\dfrac{\sigma^2_{\infty,2}}{\sigma^2_{\infty,1}}$ を定義。
## 計算例
最尤推定量は正則条件下で $\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,1/I_1(\theta))$ となり漸近有効。
## 一手
有限標本では不偏でも、漸近では最尤推定量が最小漸近分散を達成することが多い。
<!-- CARD -->
---
id: est-mle-fisher-information
title: 最尤推定量とフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: mle-asymptotics
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, フィッシャー情報量（1次元）, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
正則条件下の最尤推定量 $\widehat\theta$ の漸近分布をフィッシャー情報量（1次元）を用いて述べよ。
## 答え
$$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N\!\left(0,\frac1{I_1(\theta)}\right),$$
すなわち $\widehat\theta$ は漸近的に $\theta$ の周りで分散 $1/[nI_1(\theta)]$ の正規分布に従う。
## 使用公式・定理
最尤推定量 $\widehat\theta$ がスコア方程式 $\sum_iU(X_i;\widehat\theta)=0$ を満たすことを使い、左辺を真値 $\theta$ の周りで1次Taylor展開して $\sqrt n(\widehat\theta-\theta)\approx-(n^{-1/2}\sum_iU(X_i;\theta))/((1/n)\sum_iU'(X_i;\theta))$ を得る。スコアの中心極限定理 $n^{-1/2}\sum_iU(X_i;\theta)\xrightarrow{d}N(0,I_1(\theta))$ と $-(1/n)\sum_iU'(X_i;\theta)\xrightarrow{p}I_1(\theta)$ から漸近分散は $1/I_1(\theta)$。
## 計算例
$\operatorname{Poisson}(\lambda)$：$I_1(\lambda)=1/\lambda$ より $\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda)$。
## 一手
最尤推定量の漸近分散は「$1/I_n(\theta)$」＝CRLB。ここが最尤推定量が漸近有効である理由。
<!-- CARD -->
---
id: est-fisher-param-transform
title: パラメータ変換とフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-transform
type: theorem
difficulty: 3
priority: S
hashtags: [フィッシャー情報量（1次元）, 変数変換, 連鎖律]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
---
## 問題
母数を1対1変換 $\eta=\eta(\theta)$ へ変えたとき、フィッシャー情報量（1次元）はどう変わるか。
## 答え
変換の導関数の2乗でスケールされる：
$$I(\eta)=I(\theta)\left(\frac{d\theta}{d\eta}\right)^2,$$
または $\theta$ 基準で $I(\theta)=I(\eta)(d\eta/d\theta)^2$。
## 使用公式・定理
連鎖律 $\dfrac{\partial\log f}{\partial\eta}=\dfrac{\partial\log f}{\partial\theta}\dfrac{d\theta}{d\eta}$ と期待値の性質から導かれる。
## 計算例
$X\sim N(\theta,1)$、$\eta=2\theta$ とすると $I(\theta)=1$、$d\theta/d\eta=1/2$ より $I(\eta)=1/4$。
## 一手
変換で情報量は「逆変換の導関数の2乗」倍になる。最尤推定量の漸近分散と整合する（不変量は $I d\theta^2$）。
<!-- CARD -->
---
id: est-information-matrix
title: 情報行列（多母数）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information-matrix
type: condition
difficulty: 3
priority: A
hashtags: [情報行列, フィッシャー情報量, 多母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量 }]
---
## 問題
$\theta=(\theta_1,\ldots,\theta_k)$ のときの情報行列 $I(\theta)$ を定義せよ。
## 答え
$k\times k$ 行列で、$(i,j)$成分は
$$I(\theta)_{ij}=E_\theta\!\left[\frac{\partial\log f}{\partial\theta_i}\frac{\partial\log f}{\partial\theta_j}\right]=-E_\theta\!\left[\frac{\partial^2\log f}{\partial\theta_i\partial\theta_j}\right].$$
## 使用公式・定理
スコアベクトル $U=\nabla_\theta\log f$ に対し $I(\theta)=E[UU^T]$。正則条件下で対称・半正定値。
## 計算例
$X\sim N(\mu,\sigma^2)$、$\theta=(\mu,\sigma^2)$：$I(\theta)=\begin{pmatrix}1/\sigma^2&0\\0&1/(2\sigma^4)\end{pmatrix}$。
## 一手
多母数では逆行列 $I(\theta)^{-1}$ が漸近共分散行列。対角成分が各母数のCRLB相当。
<!-- CARD -->
---
id: est-normal-information-matrix
title: 正規分布の情報行列の導出
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information-matrix
type: calc_step
difficulty: 3
priority: A
hashtags: [情報行列, 正規分布, 2母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量 }]
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$、$\theta=(\mu,\sigma^2)$ の情報行列を求めよ。
## 答え
$$I(\theta)=\begin{pmatrix}1/\sigma^2&0\\0&1/(2\sigma^4)\end{pmatrix}.$$
## 使用公式・定理
$$\ell=-\frac12\log(2\pi\sigma^2)-\frac{(x-\mu)^2}{2\sigma^2}.$$
$$\frac{\partial^2\ell}{\partial\mu^2}=-\frac1{\sigma^2},\quad \frac{\partial^2\ell}{\partial\sigma^2\partial\mu}=0,\quad \frac{\partial^2\ell}{\partial(\sigma^2)^2}=\frac1{2\sigma^4}-\frac{(x-\mu)^2}{\sigma^6}.$$
## 計算例
$E[(X-\mu)^2]=\sigma^2$ より $-E[\partial^2\ell/\partial(\sigma^2)^2]=-1/(2\sigma^4)+1/\sigma^4=1/(2\sigma^4)$。非対角は0。
## 一手
$\mu$ と $\sigma^2$ は直交（非対角0）。$\sigma^2$ 成分の期待値には $E[(X-\mu)^2]=\sigma^2$ を代入。
<!-- CARD -->
---
id: est-ols-bline
title: 最小二乗法と線形推定量（BLUE）
category: math-estimation
subcategory: math-estimation-methods
topic: least-squares
type: condition
difficulty: 2
priority: A
hashtags: [最小二乗法, BLUE, Gauss-Markov]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最小二乗法 }]
---
## 問題
最小二乗法の考え方と、線形推定量の中での最良性（BLUE）を説明せよ。
## 答え
残差平方和 $\sum_i(Y_i-\mathbf x_i^T\beta)^2$ を最小化して $\beta$ を推定する。Gauss--Markovの定理より、正規性がなくても誤差が期待値0・等分散・無相関なら最小二乗法は線形不偏推定量の中で最小分散（BLUE）。
## 使用公式・定理
$$\widehat\beta=(X^TX)^{-1}X^T\mathbf y.$$
## 計算例
単回帰 $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ で $\widehat\beta_1=\dfrac{\sum(x_i-\overline x)(Y_i-\overline Y)}{\sum(x_i-\overline x)^2}$。
## 一手
最小二乗法は残差二乗和最小。BLUEは「線形・不偏の中で最小分散」。正規性は分布ではなく分散最小化に不要。
<!-- CARD -->
---
id: est-moments-uniform
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments
type: calc_step
difficulty: 3
priority: A
hashtags: [モーメント法, 一様分布, 母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
title: 一様分布のモーメント法推定量
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}U(0,\theta)$（一様分布、台 $0<x<\theta$、密度 $f(x)=1/\theta$）のとき、$\theta$ のモーメント法推定量を求めよ。
## 答え
母平均 $E[X]=\theta/2$ を標本平均 $\overline X$ に等置する：
$\overline X=\frac{\theta}{2}\quad\Rightarrow\quad\widehat\theta_{\mathrm{MM}}=2\overline X.$
## 使用公式・定理
$E[X]=\frac{\theta}{2}.$
## 計算例
$x=(1,2,3)$ なら $\overline x=2$ より $\widehat\theta=4$。
## 一手
1母数なら1次モーメントを等置する。モーメント法は計算が易しく、一般に最尤推定と異なる。
<!-- CARD -->
---
id: est-ols-normal-equations
category: math-estimation
subcategory: math-estimation-methods
topic: least-squares
type: strategy
difficulty: 2
priority: A
hashtags: [最小二乗法, 正規方程式, 残差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最小二乗法 }]
title: 最小二乗正規方程式の導出
---
## 問題
モデル $\mathbf y=X\beta+\varepsilon$ で残差平方和 $\|\mathbf y-X\beta\|^2$ を最小にする $\widehat\beta$ を導け。
## 答え
$\beta$ で微分して0とおくと正規方程式を得る：
$X^T X\widehat\beta=X^T\mathbf y.$
$X^TX$ が正則なら $\widehat\beta=(X^TX)^{-1}X^T\mathbf y$。
## 使用公式・定理
$\frac{\partial}{\partial\beta}\|\mathbf y-X\beta\|^2=-2X^T(\mathbf y-X\beta)=0.$
## 計算例
単回帰 $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$：$\widehat\beta_1=\dfrac{\sum(x_i-\overline x)(Y_i-\overline Y)}{\sum(x_i-\overline x)^2}$、$\widehat\beta_0=\overline Y-\widehat\beta_1\overline x$。
## 一手
残差 $\mathbf y-X\widehat\beta$ が計画行列の列（各 $X_j$）と直交すること $X^T(\mathbf y-X\widehat\beta)=0$ が正規方程式の実体。
<!-- CARD -->
---
id: est-gauss-markov
category: math-estimation
subcategory: math-estimation-methods
topic: least-squares
type: theorem
difficulty: 3
priority: S
hashtags: [Gauss-Markov, BLUE, 最小二乗法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形推定（BLUE） }]
title: Gauss--Markovの定理
---
## 問題
Gauss--Markovの定理を述べよ。どの仮定の下で最小二乗推定量が最良か。
## 答え
$\mathbf y=X\beta+\varepsilon$、$E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\sigma^2I$（等分散・無相関）のとき、$c^T\beta$ の線形不偏推定量の中で最小二乗推定量 $c^T\widehat\beta_{\mathrm{LS}}$ が最小分散（BLUE）。
## 使用公式・定理
$X$ は列フルランクとする。正規性は不要。誤差の正規性がなくても成立。
## 計算例
単回帰で $\widehat\beta_1$ は $\beta_1$ の全ての線形不偏推定量の中で最小分散。
## 一手
BLUEは「線形・不偏の中で最小分散」。等分散・無相関・期待値0が条件で、正規性は不要。
<!-- CARD -->
---
id: est-bias-variance-comparison
category: math-estimation
subcategory: math-point-estimator-properties
topic: estimator-comparison
type: calc_step
difficulty: 3
priority: A
hashtags: [MSE, 推定量比較, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の相対効率 }]
title: 推定量のMSE比較の計算
---
## 問題
正規分布に従う標本 $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ で $\widehat\sigma^2=\frac1n\sum(X_i-\overline X)^2$ と $S^2=\frac1{n-1}\sum(X_i-\overline X)^2$ のMSEを比較せよ。
## 答え
$\widehat\sigma^2$ は $E=\frac{n-1}{n}\sigma^2$（バイアス $=-\sigma^2/n$）、$\operatorname{Var}(\widehat\sigma^2)=2(n-1)\sigma^4/n^2$。$S^2$ は不偏で $\operatorname{Var}(S^2)=2\sigma^4/(n-1)$。MSE比較では
$\operatorname{MSE}(\widehat\sigma^2)=\frac{2n-1}{n^2}\sigma^4<\frac{2}{n-1}\sigma^4=\operatorname{MSE}(S^2)\quad(n>1).$
## 使用公式・定理
$\operatorname{MSE}=\operatorname{Var}+\operatorname{Bias}^2.$
## 計算例
$n=10$ のとき $\operatorname{MSE}(\widehat\sigma^2)=(19/100)\sigma^4=0.19\sigma^4$、$\operatorname{MSE}(S^2)=(2/9)\sigma^4\approx0.222\sigma^4$。最尤推定量の方がMSEが小さい。
## 一手
不偏でも分散が大きいとMSEが大きくなることがある。MSEで総合比較すると最尤推定量（$n$ 分）が勝つ。
<!-- CARD -->
---
id: est-fisher-exponential
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-info-exponential
type: calc_step
difficulty: 2
priority: A
hashtags: [フィッシャー情報量（1次元）, 指数分布, 計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャー情報量（1次元） }]
title: 指数分布のフィッシャー情報量（1次元）
---
## 問題
$X\sim\operatorname{Exp}(\lambda)$（台 $x>0$、密度 $f(x)=\lambda e^{-\lambda x}$）の1観測当たりのフィッシャー情報量（1次元）を求めよ。
## 答え
$I_1(\lambda)=1/\lambda^2$。
## 使用公式・定理
$\ell(\lambda;x)=\log\lambda-\lambda x,\qquad \ell''(\lambda;x)=-\frac1{\lambda^2}.$
## 計算例
$I_1(\lambda)=-E[\ell''(\lambda;X)]=\frac1{\lambda^2}.$
## 一手
2階微分が定数になるので期待値を取る必要がない。標本全体では $n/\lambda^2$。
<!-- CARD -->
---
id: est-crlb-exponential
category: math-estimation
subcategory: math-point-estimator-properties
topic: crlb-exponential
type: calc_step
difficulty: 3
priority: A
hashtags: [CRLB, 指数分布, 不偏推定量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
title: 指数分布のCRLBの利用
---
## 問題
$X_i\overset{iid}{\sim}\operatorname{Exp}(\lambda)$（rate表示、密度 $f(x)=\lambda e^{-\lambda x}$、平均 $\mu=1/\lambda$）の標本から $\mu$ を不偏推定するときのCramer--Rao下界を求めよ。また $\lambda$ 自身の下界も示せ。
## 答え
$I_1(\lambda)=1/\lambda^2$ より標本全体 $I_n(\lambda)=n/\lambda^2$。$\mu=1/\lambda$ は $g(\lambda)=1/\lambda$、$g'(\lambda)=-1/\lambda^2$ だから
$\operatorname{Var}(T)\ge\frac{\{g'(\lambda)\}^2}{I_n(\lambda)}=\frac{1/\lambda^4}{n/\lambda^2}=\frac1{n\lambda^2}.$
$\lambda$ 自身は $\lambda\,\text{のCRLB}\,=\lambda^2/n$。
## 使用公式・定理
$g(\theta)$ に対するCRLB：$\operatorname{Var}_\theta(T)\ge\{g'(\theta)\}^2/I_n(\theta)$。$g(\theta)=\theta$ なら $1/I_n(\theta)$。
## 計算例
$\sum_iX_i\sim\operatorname{Gamma}(n,\lambda)$（rate）より $\overline X\sim\operatorname{Gamma}(n,n\lambda)$，$\operatorname{Var}(\overline X)=n/(n\lambda)^2=1/(n\lambda^2)$ でCRLBと一致。よって $\overline X$ は $\mu$ の有効推定量。$\lambda$ 自身は $\operatorname{Var}(\overline X)=\lambda^2/n$ ではないので注意。
## 一手
$\overline X$（$\mu$ の推定量）はCRLBを達成する有効推定量。$\lambda$ 自身は $1/\overline X$ で推定する（バイアスあり）。$\lambda^2/n$ は $\lambda$ の下界であり $\bar X$ の分散ではない。
<!-- CARD -->
---
id: est-asymptotic-normality-mle
category: math-estimation
subcategory: math-point-estimator-properties
topic: mle-asymptotics
type: calc_step
difficulty: 3
priority: A
hashtags: [最尤推定, 漸近正規性, フィッシャー情報量（1次元）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
title: 最尤推定量の漸近分散の計算
---
## 問題
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ の最尤推定量 $\widehat p=\overline X$ の漸近分布を求めよ。
## 答え
$I_1(p)=1/[p(1-p)]$ より
$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)).$
## 使用公式・定理
$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,1/I_1(\theta))$。
## 計算例
$\operatorname{Var}(\overline X)=p(1-p)/n$ で、有限標本でも漸近分散と一致。
## 一手
$\widehat p=\overline X$ は有限標本でも分散が $p(1-p)/n$ でCRLBを達成する有効・漸近有効。
<!-- CARD -->
---
id: est-consistency-bias
category: math-estimation
subcategory: math-point-estimator-properties
topic: consistency
type: pitfall
difficulty: 2
priority: A
hashtags: [一致性, 不偏性, 収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一致性 }]
title: 不偏性と一致性の混同
---
## 問題
「不偏推定量は一致推定量である」は正しいか。反例を挙げよ。
## 答え
誤り。$T=X_1$（$\mu$ の推定量）は不偏だが $\operatorname{Var}(X_1)=\sigma^2$ のままで $n\to\infty$ でも $\mu$ に収束しない。一致するには分散が0へ向かう必要がある。
## 使用公式・定理
一致の十分条件：$E[T_n]\to\theta$ かつ $\operatorname{Var}(T_n)\to0$。
## 計算例
各 $n$ で $T_n=X_n$（その標本の最後の1観測だけを使う）とすれば $E[T_n]=\mu$ で不偏だが、$\operatorname{Var}(T_n)=\sigma^2$ のままなので一致しない。
## 一手
不偏性は中心、一致性は収束。不偏でも分散が減らないと一致しない。逆に、一致でも有限標本でバイアスがありうる。
<!-- CARD -->
---
id: est-shape-parameter-transform
category: math-estimation
subcategory: math-point-estimator-properties
topic: transform-bias
type: calc_step
difficulty: 3
priority: B
hashtags: [変数変換, バイアス, デルタ法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 点推定量の性質 }]
title: 非線形変換のバイアス補正
---
## 問題
不偏推定量 $\widehat\theta$ に対し $g(\widehat\theta)$（$g$ 凸）の期待値は $g(\theta)$ よりどちら側へずれるか。
## 答え
Jensenの不等式より $E[g(\widehat\theta)]\ge g(E[\widehat\theta])=g(\theta)$。凸関数では上へ凸、つまり正のバイアスが生じる。
## 使用公式・定理
$g$ 凸：$E[g(T)]\ge g(E[T])$。$g$ 凹なら向きが逆。
## 計算例
$g(x)=x^2$、$T=\overline X\sim N(\mu,\sigma^2/n)$ なら $E[T^2]=\mu^2+\sigma^2/n>\mu^2$。
## 一手
凸関数は正バイアス、凹関数は負バイアス。デルタ法で1次のバイアス項まで評価できる。
<!-- CARD -->
---
id: est-sufficiency-completeness
category: math-estimation
subcategory: math-point-estimator-properties
topic: sufficiency
type: condition
difficulty: 3
priority: A
hashtags: [十分統計量, 完備性, 指数型分布族]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
title: 完備十分統計量と指数型分布族
---
## 問題
指数型分布族 $f(x;\theta)=\exp\{\eta(\theta)T(x)-A(\theta)\}\cdot h(x)$ で、$T(x)$ が完備十分統計量になる条件を述べよ。
## 答え
自然母数空間が空でない開集合（内点）を含むとき、$T=\sum_i T(X_i)$ は指数型分布族の完備十分統計量になる。したがってLehmann--Schefféの定理より $T$ の関数で不偏な推定量はUMVU。
## 使用公式・定理
指数型分布族の十分統計量 $T=\sum_i T(X_i)$。自然母数空間に内点（空でない開集合）が存在すれば完備性が成り立つ。
## 計算例
$\operatorname{Bernoulli}(p)$：$T=\sum_i X_i$ は $p$ の完備十分統計量で、$\overline X$ が $p$ のUMVU。
## 一手
指数型分布族＋開集合なら完備十分。完備十分統計量の関数で不偏ならUMVU。
<!-- CARD -->
---
id: est-lehmann-scheffe
category: math-estimation
subcategory: math-point-estimator-properties
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: A
hashtags: [Lehmann-Scheffe, UMVU, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
title: Lehmann--Schefféの定理
---
## 問題
Lehmann--Schefféの定理を述べよ。
## 答え
$T$ を $\theta$ の完備十分統計量とする。$g(T)$ が $\theta$ の不偏推定量ならば、$g(T)$ は $\theta$ の一意なUMVU推定量である。
## 使用公式・定理
完備十分統計量の関数で不偏な推定量は一意（完備性）かつRao--Blackwell化で最小分散。
## 計算例
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$（$\sigma^2$既知）で $\overline X$ は $\mu$ のUMVU。
## 一手
「完備十分統計量の関数」＋「不偏」⇒ UMVU。存在の証明はRao--Blackwell＋完備性。
<!-- CARD -->
---
id: est-posterior-risk
category: math-estimation
subcategory: math-point-estimator-properties
topic: loss-risk
type: condition
difficulty: 2
priority: B
hashtags: [リスク関数, 二乗損失, 事後期待]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の評価 }]
title: 二乗損失での最良推定量
---
## 問題
二乗損失 $L(a,\theta)=(a-\theta)^2$ の下で、事後期待損失を最小にするベイズ推定量は何か。頻度論的リスクとの違いも述べよ。
## 答え
事後分布 $\pi(\theta\mid x)$ の下で $E[(a-\theta)^2\mid x]$ を最小にする作用は事後平均 $a^*(x)=E[\theta\mid x]$ である。一方、頻度論的リスク $R(\theta,T)=E_\theta[(T-	heta)^2]=\operatorname{MSE}_\theta(T)$ は $\theta$ の関数であり、事前分布なしに全ての $\theta$ で一律に最小となる推定量が存在するとは限らない。
## 使用公式・定理
$\arg\min_T E[(T-\theta)^2\mid x]=E[\theta\mid x].$
## 計算例
$X\mid\mu\sim N(\mu,\sigma^2)$、事前 $N(\mu_0,\tau^2)$ なら事後平均が最良予測。
## 一手
二乗損失では事後平均がベイズ推定量。頻度論的にはMSE最小と関連。
<!-- CARD -->
---
id: est-information-inequality-summary
category: math-estimation
subcategory: math-point-estimator-properties
topic: crlb-equality-judgment
type: reverse
difficulty: 3
priority: A
hashtags: [CRLB, 有効性, 判定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
title: CRLB達成の判定
---
## 問題
不偏推定量 $T$ の分散がCRLB $1/I_n(\theta)$ に等しいとき、何が言えるか。
## 答え
$T$ は有効推定量（efficient）であり、不偏推定量の中で一様に最小分散（UMVU）。またスコア $U$ と $T-g(\theta)=a(\theta)U$ で線形関係。
## 使用公式・定理
$\operatorname{Var}_\theta(T)=1/I_n(\theta)$ が等号条件。
## 計算例
正規平均 $\overline X$、Bernoulli の $\overline X$、Poisson の $\overline X$（$\lambda$ の有効推定量）はCRLB達成。
## 一手
「分散＝1/情報量」なら有効かつUMVU。逆は一般に成り立たない（UMVUでもCRLB未達成がありうる）。
<!-- CARD -->
