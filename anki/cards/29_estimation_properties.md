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
id: est-bias-variance-tradeoff
title: 平均二乗誤差MSEを定義しバイアス・バリアンス分解を導く
category: math-estimation
subcategory: math-point-estimator-properties
topic: mse-bias-variance-canonical
type: proof_step
difficulty: 2
priority: A
hashtags:
  - MSE
  - 平均二乗誤差
  - バイアス
  - 分散
  - 推定量比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 推定量の評価
---
## 問題
母数 $\theta$ の推定量 $T$ について平均二乗誤差
$$
\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2]
$$
を、分散とバイアスに分解せよ。

さらに $E[\bar X]=\mu$、$\operatorname{Var}(\bar X)=\sigma^2/n$ として、$T=c\bar X$ の $\mu$ に対するMSEを求めよ。

## 答え
$$
\operatorname{MSE}_\theta(T)
=\operatorname{Var}_\theta(T)+\operatorname{Bias}_\theta(T)^2.
$$
$T=c\bar X$ なら
$$
\operatorname{MSE}_\mu(c\bar X)
=\frac{c^2\sigma^2}{n}+(c-1)^2\mu^2.
$$

## 使用公式・定理
$$
\operatorname{Bias}_\theta(T)=E[T]-\theta,
\qquad
T-\theta=(T-E[T])+(E[T]-\theta).
$$

## 計算例
$$
\begin{aligned}
E[(T-\theta)^2]
&=E[(T-E[T])^2]\\
&\quad+2(E[T]-\theta)E[T-E[T]]\\
&\quad+(E[T]-\theta)^2\\
&=\operatorname{Var}(T)+\operatorname{Bias}(T)^2.
\end{aligned}
$$
また $T=c\bar X$ では
$$
\operatorname{Bias}(T)=(c-1)\mu,
\qquad
\operatorname{Var}(T)=\frac{c^2\sigma^2}{n},
$$
なので上式を得る。

## 一手
**誤差を中心化された揺らぎと系統的ずれに分ける。** 交差項は $E[T-E[T]]=0$ で消える。

## 注意
不偏性だけで推定量の良さは決まらない。小さなバイアスを許すことで分散を大きく減らし、MSEを下げられる場合がある。

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
後者は平方和の恒等式
$$\sum_i(X_i-\overline X)^2
=\sum_i(X_i-\mu)^2-n(\overline X-\mu)^2$$
の期待値を取って
$$E\left[\sum_i(X_i-\overline X)^2\right]
=n\sigma^2-n\operatorname{Var}(\overline X)
=n\sigma^2-n\frac{\sigma^2}{n}=(n-1)\sigma^2$$
と得る。
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
$$\widehat F_n(x)=\frac1n\sum_{i=1}^n \boldsymbol{1}_{\{X_i\le x\}}.$$
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
title: ラオ・ブラックウェル化からLehmann–Scheffé定理でUMVUを構成する
category: math-estimation
subcategory: math-point-estimator-properties
topic: rao-blackwell-lehmann-scheffe-umvu
type: theorem
difficulty: 3
priority: S
hashtags:
  - ラオ・ブラックウェルの定理
  - 十分統計量
  - 完備性
  - Lehmann-Scheffe
  - UMVU
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 十分統計量
---
## 問題
母数 $\theta$ の不偏推定量 $U$ と十分統計量 $T$ があるとする。

1. ラオ・ブラックウェル化
$$
U^*(T)=E_\theta[U\mid T]
$$
により不偏性が保たれ、分散が増えないことを示せ。
2. $T$ がさらに完備なら、$U^*(T)$ が一様最小分散不偏推定量となる理由を述べよ。
3. ベルヌーイ分布に従う独立標本 $X_1,\ldots,X_n\sim\operatorname{Bernoulli}(p)$ で、粗い不偏推定量 $U=X_1$ と $T=\sum_iX_i$ を用いて $E[X_1\mid T]$ を計算せよ。

## 答え
$$
U^*=E[U\mid T]
$$
は不偏で
$$
\operatorname{Var}(U^*)\le\operatorname{Var}(U).
$$
$T$ が完備十分なら、$U^*$ はLehmann–Scheffé定理により一意な一様最小分散不偏推定量となる。

ベルヌーイ標本では
$$
E[X_1\mid T=t]=\frac tn,
$$
よって
$$
E[X_1\mid T]=\frac Tn=\bar X.
$$

## 使用公式・定理
$T$ が $\theta$ の十分統計量なら、ラオ・ブラックウェルの定理より
$$
U^*=E[U\mid T]
$$
は $T$ の関数であり、$U$ が不偏なら
$$
E[U^*]=E[E[U\mid T]]=E[U]=\theta.
$$
また全分散公式
$$
\operatorname{Var}(U)
=E[\operatorname{Var}(U\mid T)]
+\operatorname{Var}(E[U\mid T])
$$
から
$$
\operatorname{Var}(U^*)\le\operatorname{Var}(U).
$$

さらに $T$ が完備十分統計量で、$h(T)$ が $g(\theta)$ の不偏推定量なら、Lehmann–Scheffé定理により $h(T)$ は $g(\theta)$ の一意な一様最小分散不偏推定量である。

## 計算例
ベルヌーイ標本で $T=t$ と分かったとき、「$n$ 個のうちちょうど $t$ 個が1」という配置は交換可能である。したがって各 $X_i$ が1である条件付き確率は等しく、
$$
\sum_{i=1}^nP(X_i=1\mid T=t)=t
$$
だから
$$
P(X_1=1\mid T=t)=\frac tn.
$$
$X_1$ は0-1変数なので
$$
E[X_1\mid T=t]=P(X_1=1\mid T=t)=\frac tn.
$$
よって
$$
U^*=E[X_1\mid T]=\frac Tn=\bar X.
$$

分散も
$$
\operatorname{Var}(X_1)=p(1-p),
$$
$$
\operatorname{Var}(\bar X)=\frac{p(1-p)}n
$$
なので、$n>1$ では条件付けにより実際に分散が小さくなる。

さらにベルヌーイ族では $T=\sum_iX_i\sim\operatorname{Binomial}(n,p)$ は完備十分統計量である。したがって $T/n$ は $p$ の不偏推定量であり、Lehmann–Scheffé定理から $p$ の一意な一様最小分散不偏推定量である。

## 一手
**不偏推定量を作る → 十分統計量で条件付ける → 完備性があれば一意なUMVUと結論する。** Rao–Blackwellは「分散を下げる操作」、Lehmann–Schefféは「完備十分統計量の関数なら最適性と一意性まで確定する定理」と役割を分ける。

## 注意
Rao–Blackwell化だけで常に一意性まで得られるわけではない。十分統計量で条件付ければ分散は改善するが、Lehmann–Schefféによる一意なUMVUの結論には完備性が必要である。また「完備」は統計量の分布族について $E_\theta[a(T)]=0$ が全ての $\theta$ で成り立つなら $a(T)=0$ ほとんど確実、という性質である。

<!-- CARD -->

---
id: est-umvu-idea
title: 一様最小分散不偏（一様最小分散不偏推定量）推定量の考え方
category: math-estimation
subcategory: math-point-estimator-properties
topic: umvu
type: condition
difficulty: 3
priority: A
hashtags: [一様最小分散不偏推定量, 十分統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
---
## 問題
一様最小分散不偏推定量（UMVU）とは何か。
## 答え
$\theta$ のすべての不偏推定量の中で、すべての $\theta$ に対して分散が最小となる不偏推定量。完備十分統計量 $T$ が存在し、$T$ の関数として不偏推定量が得られれば、レーマン・シェッフェの定理によりそれが一意な一様最小分散不偏（一様最小分散不偏推定量）推定量となる。
## 使用公式・定理
ラオ・ブラックウェル化で十分統計量の関数へ改善し、完備性で一意性（レーマン・シェッフェの定理）を得る。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ では $\overline X$ が $p$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。$T=\sum_iX_i$ は完備十分である。
## 一手
「不偏の中の分散最小」＋「十分統計量の関数」。完備十分統計量があれば一様最小分散不偏（一様最小分散不偏推定量）推定量を構成できる。

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
リスク＝損失の期待値。二乗損失では平均二乗誤差と一致する。

<!-- CARD -->

---
id: est-estimator-comparison
title: 推定量をバイアス・分散・MSE・相対効率で比較する
category: math-estimation
subcategory: math-point-estimator-properties
topic: estimator-comparison-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 推定量比較
  - 相対効率
  - MSE
  - 不偏性
  - バイアス
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 推定量の相対効率
---
## 問題
同じ母数 $\theta$ を推定する $T_1,T_2$ を比較する手順を述べよ。不偏推定量同士の相対効率も定義せよ。

さらに正規分布からの独立標本で、母分散 $\sigma^2$ の最尤推定量
$$
T_1=\frac1n\sum_{i=1}^n(X_i-\bar X)^2
$$
と不偏標本分散
$$
T_2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2
$$
をMSEで比較せよ。$n=5$ の値も比較せよ。

## 答え
正規標本の分散推定では
$$
\operatorname{MSE}(T_1)=\frac{2n-1}{n^2}\sigma^4,
\qquad
\operatorname{MSE}(T_2)=\frac2{n-1}\sigma^4.
$$
$n=5$ なら
$$
\operatorname{MSE}(T_1)=\frac9{25}\sigma^4=0.36\sigma^4,
$$
$$
\operatorname{MSE}(T_2)=\frac12\sigma^4=0.50\sigma^4,
$$
なので、このMSE基準では有偏な最尤推定量 $T_1$ の方が小さい。

## 使用公式・定理
一般には
$$
\operatorname{MSE}(T)
=\operatorname{Var}(T)+\operatorname{Bias}(T)^2.
$$
不偏推定量同士なら分散だけを比較できる。$T_1$ を基準とする相対効率を
$$
\operatorname{eff}(T_1,T_2)
=\frac{\operatorname{Var}(T_2)}{\operatorname{Var}(T_1)}
$$
と定義するなら、1より大きいほど $T_1$ の分散が小さい。

## 計算例
$Q=\sum_i(X_i-\bar X)^2$ とおく。正規標本では
$$
E[Q]=(n-1)\sigma^2,
\qquad
\operatorname{Var}(Q)=2(n-1)\sigma^4.
$$
したがって
$$
E[T_1]=\frac{n-1}{n}\sigma^2,
$$
バイアスは $-\sigma^2/n$、分散は
$$
\operatorname{Var}(T_1)=\frac{2(n-1)}{n^2}\sigma^4.
$$
よって
$$
\begin{aligned}
\operatorname{MSE}(T_1)
&=\frac{2(n-1)}{n^2}\sigma^4+\frac{1}{n^2}\sigma^4\\
&=\frac{2n-1}{n^2}\sigma^4.
\end{aligned}
$$
$T_2$ は不偏で
$$
\operatorname{Var}(T_2)=\frac2{n-1}\sigma^4,
$$
したがってMSEも同じ値である。

## 一手
**まず期待値を見て不偏かを判定する。不偏同士なら分散・相対効率、有偏を含むならMSEで比較する。**

## 注意
相対効率は文献により比の向きを逆に定義することがあるため、どちらを分母にしたか明記する。不偏性だけでMSE最小を意味しない。

<!-- CARD -->

---
id: est-fisher-information-def
title: スコアからフィッシャー情報量（1次元）の2表式と加法性を導く
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information-canonical
type: condition
difficulty: 2
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - スコア関数
  - 正則条件
  - 加法性
  - ベルヌーイ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
---
## 問題
1母数モデル $f(x;\theta)$ について、スコア
$$
U_1(\theta)=\frac{\partial}{\partial\theta}\log f(X;\theta)
$$
を用いて次を示せ。

1. 正則条件の下で $E_\theta[U_1(\theta)]=0$。
2. 1観測のフィッシャー情報量（1次元）が
$$
I_1(\theta)=E[U_1(\theta)^2]
=-E\left[\frac{\partial^2}{\partial\theta^2}\log f(X;\theta)\right]
$$
と2通りに書ける。
3. 独立同分布標本では $I_n(\theta)=nI_1(\theta)$。

さらにベルヌーイ分布に従う $X\sim\operatorname{Bernoulli}(p)$ について $I_1(p)$ を求め、$p=0.4,n=10$ の標本全体の情報量を計算せよ。

## 答え
正則条件の下で
$$
E[U_1]=0,
\qquad
I_1(\theta)=E[U_1^2]=-E[\ell_1''(\theta)],
\qquad
I_n(\theta)=nI_1(\theta).
$$
ベルヌーイ分布では
$$
I_1(p)=\frac{1}{p(1-p)}.
$$
$p=0.4,n=10$ なら
$$
I_{10}(0.4)=\frac{10}{0.4\cdot0.6}
=\frac{125}{3}\approx41.67.
$$

## 使用公式・定理
微分と積分の交換が許される正則条件の下で
$$
\frac{\partial f}{\partial\theta}
=f\frac{\partial\log f}{\partial\theta}
=fU_1,
\qquad
\int f(x;\theta)\,dx=1.
$$
独立標本では
$$
U_n(\theta)=\sum_{i=1}^nU_i(\theta).
$$

## 計算例
正規化条件を微分すると
$$
\begin{aligned}
0
&=\frac{\partial}{\partial\theta}\int f(x;\theta)\,dx\\
&=\int \frac{\partial f}{\partial\theta}\,dx\\
&=\int U_1(\theta)f(x;\theta)\,dx\\
&=E[U_1(\theta)].
\end{aligned}
$$
さらにもう1回微分すると
$$
E\left[\frac{\partial U_1}{\partial\theta}\right]+E[U_1^2]=0,
$$
よって
$$
E[U_1^2]=-E[\ell_1''(\theta)].
$$

ベルヌーイ分布では
$$
\ell_1(p;X)=X\log p+(1-X)\log(1-p),
$$
$$
\ell_1''(p)=-\frac{X}{p^2}-\frac{1-X}{(1-p)^2}.
$$
したがって
$$
\begin{aligned}
I_1(p)
&=-E[\ell_1''(p)]\\
&=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}\\
&=\frac{1}{p(1-p)}.
\end{aligned}
$$

## 一手
**$\int f=1$ を1回微分してスコア平均0、もう1回微分してフィッシャー情報量（1次元）の2表式を得る。** 独立標本ではスコアの分散を足す。

## 注意
$-E[\ell'']=E[U^2]$ は正則条件なしに常に成立するわけではない。台が母数に依存するモデルでは境界項にも注意する。独立でなければ情報量は単純に $n$ 倍とは限らない。

<!-- CARD -->

---
id: est-cramer-rao-lower-bound
title: クラーメル・ラオの不等式を導き母数と母数関数の下界を計算する
category: math-estimation
subcategory: math-point-estimator-properties
topic: cramer-rao-canonical
type: theorem
difficulty: 3
priority: S
hashtags:
  - クラーメル・ラオの不等式
  - フィッシャー情報量（1次元）
  - 有効推定量
  - ポアソン分布
  - ベルヌーイ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラーメル・ラオの不等式
---
## 問題
正則な1母数モデルで $E_\theta[T]=g(\theta)$ とする。不偏推定量 $T$ に対するクラーメル・ラオの不等式による分散下界を導け。

さらに、ポアソン分布に従う独立標本で $\lambda$ の下界と標本平均の効率性を確認せよ。またベルヌーイ分布に従う独立標本で $p^2$ の不偏推定量の分散下界を求め、$p=0.4,n=100$ を代入せよ。

## 答え
一般に
$$
\operatorname{Var}_\theta(T)
\ge\frac{\{g'(\theta)\}^2}{I_n(\theta)}.
$$
ポアソン分布では $I_n(\lambda)=n/\lambda$ なので下界は $\lambda/n$ で、$\bar X$ が達成する。

ベルヌーイ分布で $g(p)=p^2$ なら
$$
\operatorname{Var}(T)
\ge\frac{(2p)^2}{n/[p(1-p)]}
=\frac{4p^3(1-p)}{n}.
$$
$p=0.4,n=100$ では $0.001536$。

## 使用公式・定理
標本全体のスコア $U_n(\theta)$ について
$$
E[U_n]=0,
\qquad
\operatorname{Var}(U_n)=I_n(\theta).
$$
$E[T]=g(\theta)$ を微分すると
$$
g'(\theta)=E[TU_n]=\operatorname{Cov}(T,U_n).
$$
ここへCauchy--Schwarzの不等式を使う。

## 計算例
一般形は
$$
\begin{aligned}
\{g'(\theta)\}^2
&=\operatorname{Cov}(T,U_n)^2\\
&\le\operatorname{Var}(T)\operatorname{Var}(U_n)\\
&=\operatorname{Var}(T)I_n(\theta).
\end{aligned}
$$

ポアソン分布の1観測では
$$
-E[\ell_1''(\lambda)]
=E\left[\frac{X}{\lambda^2}\right]
=\frac1\lambda,
$$
よって $I_n(\lambda)=n/\lambda$。さらに
$$
E[\bar X]=\lambda,
\qquad
\operatorname{Var}(\bar X)=\frac\lambda n,
$$
なので有限標本で下界に一致する。

ベルヌーイ分布では
$$
I_n(p)=\frac{n}{p(1-p)},
\qquad g'(p)=2p.
$$
$p=0.4,n=100$ なら
$$
\frac{4(0.4)^3(0.6)}{100}=0.001536.
$$

## 一手
**推定対象が $\theta$ か $g(\theta)$ かを最初に判定する。** $g'(\theta)$ を出し、スコアとの共分散にCauchy--Schwarzの不等式を適用する。

## 注意
クラーメル・ラオの不等式は正則条件を要する。不偏性を確認せず「下界を達成する」と言ってはいけない。$g(\theta)$ の推定では $g'(\theta)^2$ を落とさない。

<!-- CARD -->

---
id: est-crlb-equality
title: クラーメル・ラオの不等式の等号成立条件
category: math-estimation
subcategory: math-point-estimator-properties
topic: cramer-rao
type: theorem
difficulty: 3
priority: A
hashtags: [クラーメル・ラオの不等式, 等号, 指数型分布族]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
---
## 問題
クラーメル・ラオの不等式で等号が成立する条件を述べよ。
## 答え
$T-g(\theta)$ がスコア $U(\theta)$ と線形関係にあること：
$$T-g(\theta)=a(\theta)U(\theta)\quad\text{(a.s.)}$$
を満たすとき、そしてそのときに限り等号が成立する。
## 使用公式・定理
Cauchy--Schwarzで等号は $T$ と $U$ が線形従属のとき。
## 計算例
$\overline X$（ベルヌーイ分布で母数 $p$）は $U(p)=n(\overline X-p)/[p(1-p)]$ と書け、$T-p$ が $U$ に比例するので等号成立。
## 一手
クラーメル・ラオの不等式による下界を達成する推定量は、指数型分布族で十分統計量の線形関数になる傾向がある。

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
hashtags: [有効推定量, クラーメル・ラオの不等式, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効性 }]
---
## 問題
有効推定量（efficient estimator）とは何か。
## 答え
$\theta$ の不偏推定量のうち、その分散がクラーメル・ラオの不等式による下界に等しいもの：
$$\operatorname{Var}_\theta(T)=\frac1{I_n(\theta)}\quad(\text{または一般の }g(\theta)\text{ では }\{g'(\theta)\}^2/I_n(\theta)).$$
## 使用公式・定理
有効推定量はクラーメル・ラオの不等式による下界を達成するから、不偏推定量の中で一様最小分散不偏（一様最小分散不偏推定量）推定量でもある。
## 計算例
正規標本の $\overline X$ は $\operatorname{Var}(\overline X)=\sigma^2/n=1/I_n(\mu)$ で有効。ベルヌーイ標本の $\overline X$ も $p$ に対して有効。
## 一手
「クラーメル・ラオの不等式による下界を達成する不偏推定量」＝最小分散不偏。存在しない場合も多い。

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
標本サイズ $n$ で $\sqrt n(T_n-\theta)\xrightarrow{d}N(0,\sigma^2_\infty)$ のとき、漸近分散 $\sigma^2_\infty$ を比較する。クラーメル・ラオの不等式に対応する $1/I_1(\theta)$ に漸近分散が一致すれば漸近有効という。
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
最尤推定量の漸近分散は「$1/I_n(\theta)$」であり、クラーメル・ラオの不等式による下界に一致する。ここが最尤推定量が漸近有効である理由。

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
title: フィッシャー情報行列を定義し正規2母数モデルで計算する
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information-matrix-canonical
type: condition
difficulty: 3
priority: A
hashtags:
  - フィッシャー情報行列
  - 多母数
  - スコアベクトル
  - 正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
---
## 問題
多母数 $\boldsymbol\theta=(\theta_1,\ldots,\theta_k)^{\mathsf T}$ に対するフィッシャー情報行列を定義せよ。

さらに正規分布に従う
$$
X\sim N(\mu,v),\qquad v=\sigma^2>0
$$
について $\boldsymbol\theta=(\mu,v)^{\mathsf T}$ とした1観測の情報行列を導け。$v=4$ の数値も求めよ。

## 答え
$$
\boldsymbol I(\mu,v)
=\begin{pmatrix}
1/v&0\\
0&1/(2v^2)
\end{pmatrix}.
$$
$v=4$ なら
$$
\boldsymbol I(\mu,4)
=\begin{pmatrix}1/4&0\\0&1/32\end{pmatrix}.
$$

## 使用公式・定理
スコアベクトル
$$
\boldsymbol U=\nabla_{\boldsymbol\theta}\ell(\boldsymbol\theta;X)
$$
に対し、正則条件の下で
$$
\boldsymbol I(\boldsymbol\theta)
=E[\boldsymbol U\boldsymbol U^{\mathsf T}]
=-E[\nabla^2_{\boldsymbol\theta}\ell].
$$
正規分布では $E[(X-\mu)^2]=v$。

## 計算例
定数を除く対数密度は
$$
\ell(\mu,v)=-\frac12\log v-\frac{(X-\mu)^2}{2v}.
$$
まず
$$
\frac{\partial^2\ell}{\partial\mu^2}=-\frac1v
$$
なので $I_{\mu\mu}=1/v$。
交差微分は
$$
\frac{\partial^2\ell}{\partial v\partial\mu}
=-\frac{X-\mu}{v^2}
$$
で、期待値が0だから $I_{\mu v}=0$。

また
$$
\frac{\partial^2\ell}{\partial v^2}
=\frac1{2v^2}-\frac{(X-\mu)^2}{v^3}.
$$
よって
$$
\begin{aligned}
I_{vv}
&=-E\left[\frac1{2v^2}-\frac{(X-\mu)^2}{v^3}\right]\\
&=-\frac1{2v^2}+\frac{v}{v^3}\\
&=\frac1{2v^2}.
\end{aligned}
$$

## 一手
多母数では **Hessianを作る → 各成分の負の期待値を取る**。非対角成分が0なら、そのパラメータ化では情報行列が対角になる。

## 注意
$v=\sigma^2$ を母数にした結果である。$\sigma$ を母数に選べば成分は変わる。多母数版のクラーメル・ラオの不等式による下界や漸近分散共分散行列には $I^{-1}$ が現れる。

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
hashtags: [平均二乗誤差, 推定量比較, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 推定量の相対効率 }]
title: 推定量の平均二乗誤差比較の計算
---
## 問題
正規分布に従う標本 $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ で $\widehat\sigma^2=\frac1n\sum(X_i-\overline X)^2$ と $S^2=\frac1{n-1}\sum(X_i-\overline X)^2$ の平均二乗誤差を比較せよ。
## 答え
$\widehat\sigma^2$ は $E=\frac{n-1}{n}\sigma^2$（バイアス $=-\sigma^2/n$）、$\operatorname{Var}(\widehat\sigma^2)=2(n-1)\sigma^4/n^2$。$S^2$ は不偏で $\operatorname{Var}(S^2)=2\sigma^4/(n-1)$。平均二乗誤差比較では
$\operatorname{MSE}(\widehat\sigma^2)=\frac{2n-1}{n^2}\sigma^4<\frac{2}{n-1}\sigma^4=\operatorname{MSE}(S^2)\quad(n>1).$
## 使用公式・定理
$\operatorname{MSE}=\operatorname{Var}+\operatorname{Bias}^2.$
## 計算例
$n=10$ のとき $\operatorname{MSE}(\widehat\sigma^2)=(19/100)\sigma^4=0.19\sigma^4$、$\operatorname{MSE}(S^2)=(2/9)\sigma^4\approx0.222\sigma^4$。最尤推定量の方が平均二乗誤差が小さい。
## 一手
不偏でも分散が大きいと平均二乗誤差が大きくなることがある。平均二乗誤差で総合比較すると最尤推定量（$n$ 分）が勝つ。

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
$\widehat p=\overline X$ は有限標本でも分散が $p(1-p)/n$ でクラーメル・ラオの不等式による下界を達成する有効・漸近有効。

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
自然母数空間が空でない開集合（内点）を含むとき、$T=\sum_i T(X_i)$ は指数型分布族の完備十分統計量になる。したがってレーマン・シェッフェの定理より、$T$ の関数で不偏な推定量は一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 使用公式・定理
指数型分布族の十分統計量 $T=\sum_i T(X_i)$。自然母数空間に内点（空でない開集合）が存在すれば完備性が成り立つ。
## 計算例
$\operatorname{Bernoulli}(p)$：$T=\sum_i X_i$ は $p$ の完備十分統計量で、$\overline X$ が $p$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 一手
指数型分布族＋開集合なら完備十分である。完備十分統計量の関数で不偏なら一様最小分散不偏（一様最小分散不偏推定量）推定量である。

<!-- CARD -->

---
id: est-lehmann-scheffe
category: math-estimation
subcategory: math-point-estimator-properties
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: A
hashtags: [レーマン・シェッフェの定理, 一様最小分散不偏推定量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
title: レーマン・シェッフェの定理
---
## 問題
レーマン・シェッフェの定理を述べよ。
## 答え
$T$ を $\theta$ の完備十分統計量とする。$g(T)$ が $\theta$ の不偏推定量ならば、$g(T)$ は $\theta$ の一意な一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 使用公式・定理
完備十分統計量の関数で不偏な推定量は一意（完備性）であり、ラオ・ブラックウェル化により最小分散となる。
## 計算例
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$（$\sigma^2$既知）で $\overline X$ は $\mu$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 一手
「完備十分統計量の関数」＋「不偏」$\Rightarrow$ 一様最小分散不偏（一様最小分散不偏推定量）推定量。存在の証明はラオ・ブラックウェル化と完備性を使う。

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
$m(x)=E[\theta\mid x]$ と置くと
$$a-\theta=\{a-m(x)\}+\{m(x)-\theta\}.$$
条件付き期待値を取れば交差項は $E[m(x)-\theta\mid x]=0$ により消え、
$$E[(a-\theta)^2\mid x]
=(a-m(x))^2+\operatorname{Var}(\theta\mid x).$$
第2項は $a$ に依存しないので、最小値は $a=m(x)=E[\theta\mid x]$ で達成される。
## 計算例
$X\mid\mu\sim N(\mu,\sigma^2)$、事前 $N(\mu_0,\tau^2)$ なら事後平均が最良予測。
## 一手
二乗損失では事後平均がベイズ推定量。頻度論的には平均二乗誤差最小と関連。

<!-- CARD -->

---
id: est-information-inequality-summary
category: math-estimation
subcategory: math-point-estimator-properties
topic: crlb-equality-judgment
type: reverse
difficulty: 3
priority: A
hashtags: [クラーメル・ラオの不等式, 有効性, 判定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
title: クラーメル・ラオの不等式による下界達成の判定
---
## 問題
不偏推定量 $T$ の分散がクラーメル・ラオの不等式による下界 $1/I_n(\theta)$ に等しいとき、何が言えるか。
## 答え
$T$ は有効推定量（efficient estimator）であり、不偏推定量の中で一様最小分散不偏（一様最小分散不偏推定量）推定量である。またスコア $U$ と $T-g(\theta)=a(\theta)U$ で線形関係にある。
## 使用公式・定理
$\operatorname{Var}_\theta(T)=1/I_n(\theta)$ が等号条件。
## 計算例
正規平均 $\overline X$、ベルヌーイ標本の $\overline X$、ポアソン標本の $\overline X$（$\lambda$ の有効推定量）はクラーメル・ラオの不等式による下界を達成する。
## 一手
「分散＝1/情報量」なら有効かつ一様最小分散不偏（UMVU）推定量である。逆は一般に成り立たない（一様最小分散不偏推定量でもクラーメル・ラオの不等式による下界を達成しない場合がある）。

<!-- CARD -->

---
id: est-rao-blackwell-bernoulli
title: ベルヌーイ標本でラオ・ブラックウェル化を具体的に計算する
category: math-estimation
subcategory: math-point-estimator-properties
topic: rao-blackwell-bernoulli-example
type: calc_step
difficulty: 3
priority: S
hashtags: [ラオ・ブラックウェル化, ベルヌーイ分布, 十分統計量, 分散減少]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量と推定量の改善 }]
---
## 問題
$X_1,\ldots,X_n$ はベルヌーイ分布 $\operatorname{Bernoulli}(p)$ からの独立同分布標本である。不偏推定量 $T=X_1$ を十分統計量 $S=\sum_iX_i$ でラオ・ブラックウェル化し、分散を比較せよ。

## 答え
$$T^*=E[X_1\mid S]=\frac Sn=\overline X.$$
$$\operatorname{Var}(T)=p(1-p),\qquad
\operatorname{Var}(T^*)=\frac{p(1-p)}n.$$

## 使用公式・定理
ラオ・ブラックウェルの定理より、十分統計量 $S$ による条件付き期待値は不偏性を保ち、分散を増加させない。$S=s$ の条件下では成功した位置が対称なので
$$P(X_1=1\mid S=s)=\frac sn.$$

## 計算例
$$E[X_1\mid S=s]=1\cdot\frac sn+0\cdot\left(1-\frac sn\right)=\frac sn.$$
$p=0.4,n=10$ なら
$$\operatorname{Var}(X_1)=0.24,\qquad
\operatorname{Var}(\overline X)=0.024.$$
分散は10分の1になる。

## 一手
条件付き分布を総当たりせず、$S=s$ の下で各観測位置が対称であることを使う。

## 注意
$T=X_1$ は不偏だが、標本の残りを捨てているため非効率である。

<!-- CARD -->

---
id: est-generalized-crlb-poisson-zero
title: ポアソン分布のゼロ確率推定にクラーメル・ラオの不等式を使う
category: math-estimation
subcategory: math-point-estimator-properties
topic: generalized-crlb-function
type: calc_step
difficulty: 4
priority: A
hashtags: [クラーメル・ラオの不等式, ポアソン分布, 母数関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラーメル・ラオの不等式 }]
---
## 問題
$X_1,\ldots,X_n$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ からの独立同分布標本である。$g(\lambda)=P_\lambda(X=0)=e^{-\lambda}$ の任意の不偏推定量 $T$ に対する分散下界を求めよ。

## 答え
$$\operatorname{Var}_\lambda(T)\ge
\frac{\{g'(\lambda)\}^2}{I_n(\lambda)}
=\frac{\lambda e^{-2\lambda}}n.$$

## 使用公式・定理
母数関数 $g(\theta)$ の不偏推定量に対するクラーメル・ラオの不等式は
$$\operatorname{Var}_\theta(T)\ge\frac{\{g'(\theta)\}^2}{I_n(\theta)}.$$
ポアソン分布では $I_n(\lambda)=n/\lambda$。

## 計算例
$$g'(\lambda)=-e^{-\lambda}$$
なので
$$\frac{\{g'(\lambda)\}^2}{I_n(\lambda)}
=\frac{e^{-2\lambda}}{n/\lambda}
=\frac{\lambda e^{-2\lambda}}n.$$
$\lambda=2,n=50$ なら下界は
$$\frac{2e^{-4}}{50}\approx0.000733.$$

## 一手
推定対象が $\theta$ 自身でなければ、分子を1にせず $g'(\theta)^2$ を入れる。

## 注意
下界を求めただけでは、その下界を達成する不偏推定量の存在は保証されない。

<!-- CARD -->

---
id: est-poisson-square-umvu
title: ポアソン母数の2乗の一様最小分散不偏（一様最小分散不偏推定量）推定量を階乗モーメントで作る
category: math-estimation
subcategory: math-point-estimator-properties
topic: poisson-square-umvu
type: calc_step
difficulty: 4
priority: S
hashtags: [一様最小分散不偏推定量, ポアソン分布, 完備十分統計量, 階乗モーメント]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分性 }]
---
## 問題
$X_1,\ldots,X_n$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ からの独立同分布標本で、$S=\sum_iX_i$ とする。$\lambda^2$ の一様最小分散不偏（一様最小分散不偏推定量）推定量を構成せよ。

## 答え
$$T(S)=\frac{S(S-1)}{n^2}$$
が $\lambda^2$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。

## 使用公式・定理
$$S\sim\operatorname{Poisson}(n\lambda),\qquad
E[S(S-1)]=(n\lambda)^2.$$
また、ポアソン1母数指数型分布族では $S$ は完備十分統計量である。レーマン・シェッフェの定理により、$S$ の関数である不偏推定量は一様最小分散不偏（一様最小分散不偏推定量）推定量である。

## 計算例
$$E\left[\frac{S(S-1)}{n^2}\right]
=\frac{E[S(S-1)]}{n^2}
=\frac{(n\lambda)^2}{n^2}
=\lambda^2.$$
$n=5$、観測標本和 $s=8$ なら推定値は
$$\frac{8\cdot7}{5^2}=\frac{56}{25}=2.24.$$

## 一手
ポアソン母数の累乗は、通常のモーメントより階乗モーメントで作る。

## 注意
$S^2/n^2$ は期待値に $\lambda/n$ が余分に入り、不偏ではない。

<!-- CARD -->

---
id: est-moments-normal-numeric
title: 正規分布の2母数を標本モーメントから数値で推定する
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments-normal
type: calc_step
difficulty: 2
priority: S
hashtags: [モーメント法, 正規分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
$X_1,X_2,X_3$ は正規分布 $N(\mu,\sigma^2)$ からの標本で、観測値は $(1,2,4)$ だった。1次・2次モーメントを用いて $(\mu,\sigma^2)$ を推定せよ。
## 答え
$$\widehat\mu_{\mathrm{MM}}=\frac73,\qquad
\widehat\sigma_{\mathrm{MM}}^2=\frac{14}{9}.$$
## 使用公式・定理
$$E[X]=\mu,\qquad E[X^2]=\mu^2+\sigma^2.$$
これらを標本モーメント $\overline X$、$\overline{X^2}$ に等置する。
## 計算例
$$\overline x=\frac{1+2+4}{3}=\frac73,\qquad
\overline{x^2}=\frac{1+4+16}{3}=7.$$
よって
$$\widehat\sigma^2=7-\left(\frac73\right)^2
=\frac{63-49}{9}=\frac{14}{9}.$$
## 一手
2次モーメントから平均の2乗を引いて分散を出す。
## 注意
分母が $n$ の分散になり、不偏分散とは異なる。

<!-- CARD -->

---
id: est-moments-gamma-two-parameter
title: ガンマ分布のshapeとrateをモーメント法で解く
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments-gamma
type: calc_step
difficulty: 3
priority: S
hashtags: [モーメント法, ガンマ分布, shape-rate]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
shape $\alpha$、rate $\beta$ のガンマ分布に対し、標本平均 $m_1=3$、分母 $n$ の標本分散 $m_2=2$ を得た。モーメント法推定値を求めよ。
## 答え
$$\widehat\alpha=\frac{m_1^2}{m_2}=4.5,\qquad
\widehat\beta=\frac{m_1}{m_2}=1.5.$$
## 使用公式・定理
shape-rate表記では
$$E[X]=\frac\alpha\beta,\qquad
\operatorname{Var}(X)=\frac\alpha{\beta^2}.$$
## 計算例
$\alpha/\beta=m_1$ から $\alpha=m_1\beta$。これを $\alpha/\beta^2=m_2$ へ代入すると
$$\frac{m_1\beta}{\beta^2}=m_2
\Rightarrow\beta=\frac{m_1}{m_2}.$$
さらに $\alpha=m_1^2/m_2$。数値を入れて $(4.5,1.5)$。
## 一手
平均式から一方の母数を表し、分散式へ代入する。
## 注意
scale表記なら $\widehat{\text{scale}}=m_2/m_1$ となる。

<!-- CARD -->

---
id: est-moments-beta-two-parameter
title: ベータ分布の2母数を平均と分散から解く
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments-beta
type: calc_step
difficulty: 4
priority: A
hashtags: [モーメント法, ベータ分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
ベータ分布 $\operatorname{Beta}(a,b)$ について標本平均 $m=0.4$、分母 $n$ の標本分散 $v=0.02$ を得た。$(a,b)$ のモーメント法推定値を求めよ。
## 答え
$$\widehat a=4.4,\qquad \widehat b=6.6.$$
## 使用公式・定理
$s=a+b$ とおくと
$$E[X]=\frac as=m,\qquad
\operatorname{Var}(X)=\frac{m(1-m)}{s+1}=v.$$
## 計算例
分散式から
$$s=\frac{m(1-m)}v-1
=\frac{0.4(0.6)}{0.02}-1=12-1=11.$$
したがって
$$a=ms=0.4(11)=4.4,\qquad
b=(1-m)s=0.6(11)=6.6.$$
## 一手
$a,b$ を直接解かず、和 $s=a+b$ を導入する。
## 注意
標本分散が $m(1-m)$ 以上だと正の $a,b$ が得られず、モーメント法が母数空間外へ出る。

<!-- CARD -->

---
id: est-moments-uniform-two-endpoints
title: 一様分布の両端点を平均と分散から推定する
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments-uniform-endpoints
type: calc_step
difficulty: 3
priority: A
hashtags: [モーメント法, 一様分布, 端点母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント法 }]
---
## 問題
一様分布 $U(a,b)$ について標本平均 $m=5$、分母 $n$ の標本分散 $v=3$ を得た。$(a,b)$ のモーメント法推定値を求めよ。
## 答え
$$\widehat a=m-\sqrt{3v}=2,\qquad
\widehat b=m+\sqrt{3v}=8.$$
## 使用公式・定理
$$E[X]=\frac{a+b}{2},\qquad
\operatorname{Var}(X)=\frac{(b-a)^2}{12}.$$
## 計算例
平均式から $a+b=2m$、分散式から $b-a=\sqrt{12v}=2\sqrt{3v}$。加減法により
$$a=m-\sqrt{3v},\qquad b=m+\sqrt{3v}.$$
$m=5,v=3$ では $\sqrt{3v}=3$。
## 一手
端点そのものより、中心 $(a+b)/2$ と幅 $b-a$ を先に解く。
## 注意
推定された区間が実際の標本最小値・最大値を含まない場合があり、最尤法とは性質が異なる。

<!-- CARD -->

---
id: est-ols-simple-numeric
title: 単回帰の切片と傾きを観測値から計算する
category: math-estimation
subcategory: math-estimation-methods
topic: ordinary-least-squares-numeric
type: calc_step
difficulty: 2
priority: S
hashtags: [最小二乗法, 単回帰, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最小二乗法 }]
---
## 問題
データ $(x_i,y_i)=(1,2),(2,3),(3,5)$ に単回帰 $y_i=\beta_0+\beta_1x_i+\varepsilon_i$ を当てはめよ。
## 答え
$$\widehat\beta_1=\frac32,\qquad
\widehat\beta_0=\frac13.$$
## 使用公式・定理
$$\widehat\beta_1=\frac{S_{xy}}{S_{xx}},\quad
\widehat\beta_0=\overline y-\widehat\beta_1\overline x.$$
## 計算例
$$\overline x=2,\qquad\overline y=\frac{10}{3},$$
$$S_{xx}=(-1)^2+0^2+1^2=2,$$
$$S_{xy}=(-1)\left(-\frac43\right)+0+\left(\frac53\right)=3.$$
よって傾きは $3/2$、切片は $10/3-(3/2)2=1/3$。
## 一手
中心化した平方和と積和を表にしてから割る。
## 注意
$S_{xy}$ を $n$ や $n-1$ で割る必要はない。比で相殺される。

<!-- CARD -->

---
id: est-ols-matrix-numeric
title: 行列の正規方程式を解いて最小二乗係数を求める
category: math-estimation
subcategory: math-estimation-methods
topic: ordinary-least-squares-matrix-numeric
type: calc_step
difficulty: 3
priority: S
hashtags: [最小二乗法, 正規方程式, 行列計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最小二乗法 }]
---
## 問題
$$X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\qquad
\boldsymbol y=\begin{pmatrix}1\\2\\2\end{pmatrix}$$
について $\widehat{\boldsymbol\beta}$ を求めよ。
## 答え
$$\widehat{\boldsymbol\beta}
=\begin{pmatrix}7/6\\1/2\end{pmatrix}.$$
## 使用公式・定理
$$X^\top X\widehat{\boldsymbol\beta}=X^\top\boldsymbol y,\qquad
\widehat{\boldsymbol\beta}=(X^\top X)^{-1}X^\top\boldsymbol y.$$
## 計算例
$$X^\top X=\begin{pmatrix}3&3\\3&5\end{pmatrix},\quad
X^\top y=\begin{pmatrix}5\\6\end{pmatrix},$$
$$ (X^\top X)^{-1}=\frac16
\begin{pmatrix}5&-3\\-3&3\end{pmatrix}.$$
したがって
$$\widehat{\boldsymbol\beta}
=\frac16\begin{pmatrix}25-18\\-15+18\end{pmatrix}
=\begin{pmatrix}7/6\\1/2\end{pmatrix}.$$
## 一手
$X^\top X$ と $X^\top y$ を別々に計算してから連立方程式を解く。
## 注意
逆行列を明示せず消去法で正規方程式を解いてもよい。

<!-- CARD -->

---
id: est-ols-slope-standard-error
title: 単回帰の残差から傾きの標準誤差を計算する
category: math-estimation
subcategory: math-estimation-methods
topic: ols-slope-standard-error
type: calc_step
difficulty: 3
priority: S
hashtags: [最小二乗法, 残差分散, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最小二乗法 }]
---
## 問題
データ $(1,2),(2,3),(3,5)$ の最小二乗直線が $\widehat y=1/3+(3/2)x$ である。傾きの標準誤差を求めよ。
## 答え
$$\widehat{\operatorname{SE}}(\widehat\beta_1)
=\sqrt{\frac{\widehat\sigma^2}{S_{xx}}}
=\sqrt{\frac1{12}}\approx0.2887.$$
## 使用公式・定理
切片あり単回帰では
$$\widehat\sigma^2=\frac{\operatorname{SSE}}{n-2},\qquad
\operatorname{Var}(\widehat\beta_1\mid X)=\frac{\sigma^2}{S_{xx}}.$$
## 計算例
予測値は $(11/6,10/3,29/6)$、残差は $(1/6,-1/3,1/6)$。したがって
$$\operatorname{SSE}=\frac1{36}+\frac19+\frac1{36}=\frac16.$$
$n-2=1$ なので $\widehat\sigma^2=1/6$、また $S_{xx}=2$。よって
$$\widehat{\operatorname{SE}}=\sqrt{(1/6)/2}=\sqrt{1/12}.$$
## 一手
係数を求めた後、残差→SSE→誤差分散→係数標準誤差の順に進む。
## 注意
誤差分散の自由度は、推定した切片と傾きの2個を引いた $n-2$。

<!-- CARD -->

---
id: est-wls-through-origin
title: 不均一分散に重み付き最小二乗法を適用する
category: math-estimation
subcategory: math-estimation-methods
topic: weighted-least-squares
type: calc_step
difficulty: 3
priority: S
hashtags: [重み付き最小二乗法, 不均一分散, BLUE]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形推定（BLUE） }]
---
## 問題
$Y_i=\beta x_i+\varepsilon_i$ で $(x_1,x_2)=(1,2)$、$(y_1,y_2)=(1,4)$、誤差分散が $(1,4)$ と既知である。重み付き最小二乗推定値を求めよ。
## 答え
$$\widehat\beta_{\mathrm{WLS}}=1.5.$$
## 使用公式・定理
$w_i=1/\sigma_i^2$ とすると、原点回帰のWLSは
$$\widehat\beta_{\mathrm{WLS}}
=\frac{\sum_iw_ix_iy_i}{\sum_iw_ix_i^2}.$$
## 計算例
$w_1=1,w_2=1/4$ なので
$$\sum_iw_ix_iy_i=1\cdot1\cdot1+\frac14\cdot2\cdot4=3,$$
$$\sum_iw_ix_i^2=1\cdot1^2+\frac14\cdot2^2=2.$$
よって $\widehat\beta=3/2$。参考に通常の最小二乗法では $(1+8)/(1+4)=1.8$。
## 一手
分散が大きい観測ほど重みを小さくする。
## 注意
既知分散に比例する共通定数は重みの比で消える。

<!-- CARD -->

---
id: est-blue-correlated-estimators
title: 相関する2つの不偏推定量を最小分散で結合する
category: math-estimation
subcategory: math-estimation-methods
topic: blue-correlated-estimators
type: calc_step
difficulty: 4
priority: A
hashtags: [BLUE, 線形不偏推定量, 共分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形推定（BLUE） }]
---
## 問題
$T_1,T_2$ は $\theta$ の不偏推定量で、分散が $4,9$、共分散が1である。$T=aT_1+(1-a)T_2$ の分散を最小にせよ。
## 答え
$$a=\frac8{11},\qquad1-a=\frac3{11},\qquad
\operatorname{Var}(T)=\frac{35}{11}\approx3.182.$$
## 使用公式・定理
$$\operatorname{Var}(T)=a^2v_1+(1-a)^2v_2+2a(1-a)c.$$
微分して
$$a=\frac{v_2-c}{v_1+v_2-2c}.$$
## 計算例
$$a=\frac{9-1}{4+9-2}=\frac8{11}.$$
最小分散は
$$\frac{v_1v_2-c^2}{v_1+v_2-2c}
=\frac{36-1}{11}=\frac{35}{11}.$$
## 一手
相関があれば共分散項を残して重みを微分する。
## 注意
独立の場合の単純な逆分散重みをそのまま使わない。

<!-- CARD -->

---
id: est-gls-common-mean
title: 相関誤差の下で一般化最小二乗推定量を計算する
category: math-estimation
subcategory: math-estimation-methods
topic: generalized-least-squares
type: calc_step
difficulty: 4
priority: A
hashtags: [一般化最小二乗法, GLS, BLUE, 相関誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形推定（BLUE） }]
---
## 問題
$\boldsymbol Y=\mu\boldsymbol1+\boldsymbol\varepsilon$、$\boldsymbol y=(2,5)^\top$、誤差分散共分散行列
$$\Sigma=\begin{pmatrix}1&0.5\\0.5&4\end{pmatrix}$$
とする。$\mu$ の一般化最小二乗法推定値と分散を求めよ。
## 答え
$$\widehat\mu_{\mathrm{GLS}}=2.375,\qquad
\operatorname{Var}(\widehat\mu_{\mathrm{GLS}})=0.9375.$$
## 使用公式・定理
$$\widehat\mu_{\mathrm{GLS}}
=\frac{\boldsymbol1^\top\Sigma^{-1}\boldsymbol y}
{\boldsymbol1^\top\Sigma^{-1}\boldsymbol1},\qquad
\operatorname{Var}(\widehat\mu_{\mathrm{GLS}})
=\frac1{\boldsymbol1^\top\Sigma^{-1}\boldsymbol1}.$$
## 計算例
$$\Sigma^{-1}=\frac1{3.75}
\begin{pmatrix}4&-0.5\\-0.5&1\end{pmatrix}.$$
共通因子 $1/3.75$ を約分すると、分子は
$$4(2)-0.5(5)-0.5(2)+1(5)=9.5,$$
分母は $4-0.5-0.5+1=4$。よって $9.5/4=2.375$。分散は $3.75/4=0.9375$。
## 一手
相関・不均一分散を $\Sigma^{-1}$ で重み付けする。
## 注意
$\Sigma=\sigma^2I$ のとき一般化最小二乗法は通常の標本平均へ戻る。

<!-- CARD -->

---
id: est-plugin-survival-probability
title: 経験分布から生存確率をプラグイン推定する
category: math-estimation
subcategory: math-estimation-methods
topic: plugin-survival-function
type: calc_step
difficulty: 2
priority: A
hashtags: [プラグイン法, 経験分布, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: その他の手法 }]
---
## 問題
完全観測された寿命データが $(1,2,2,5,7)$ だった。生存確率 $S(3)=P(X>3)$ を経験分布へプラグインして推定せよ。
## 答え
$$\widehat S(3)=\frac25=0.4.$$
## 使用公式・定理
$$S(t)=1-F(t),\qquad
\widehat F_n(t)=\frac1n\sum_{i=1}^nI(X_i\le t),$$
したがって
$$\widehat S_n(t)=\frac1n\sum_{i=1}^nI(X_i>t).$$
## 計算例
3を超える観測値は5と7の2個なので $\widehat S(3)=2/5$。同じく
$$\widehat F(3)=3/5,\qquad1-\widehat F(3)=2/5.$$
## 一手
未知分布 $F$ を経験分布 $\widehat F_n$ へ置き換える。
## 注意
右打切りがある寿命データでは単純な経験割合でなくKaplan–Meier推定量を使う。

<!-- CARD -->

---
id: est-plugin-coefficient-variation
title: 平均と分散を代入して変動係数を推定する
category: math-estimation
subcategory: math-estimation-methods
topic: plugin-coefficient-of-variation
type: calc_step
difficulty: 2
priority: B
hashtags: [プラグイン法, 変動係数, 経験分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: その他の手法 }]
---
## 問題
データ $(2,4,6)$ から、母変動係数 $\operatorname{CV}=\sigma/\mu$ を経験分布へのプラグインで推定せよ。
## 答え
$$\widehat{\operatorname{CV}}
=\frac{\sqrt{8/3}}4
=\frac1{\sqrt6}\approx0.4082.$$
## 使用公式・定理
経験分布へ代入すると
$$\widehat\mu=\overline X,\qquad
\widehat\sigma^2=\frac1n\sum_i(X_i-\overline X)^2.$$
## 計算例
$$\overline x=4,\qquad
\widehat\sigma^2=\frac{(2-4)^2+(4-4)^2+(6-4)^2}{3}
=\frac83.$$
したがって
$$\widehat{\operatorname{CV}}=\frac{\sqrt{8/3}}4
=\sqrt{\frac16}.$$
## 一手
汎関数の中の未知量を、それぞれ経験分布から得た標本対応量へ置き換える。
## 注意
不偏分散を使う推定法もある。ここでは経験分布への厳密なプラグインなので分母は $n$。
