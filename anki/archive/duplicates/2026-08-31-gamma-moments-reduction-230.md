---
id: dist-gamma-moments
published: true
title: ガンマ分布の平均と分散からshape-rateを読み取る
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-moments
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ガンマ分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ガンマ分布
archive_reason: duplicate
canonical_card: dist-gamma-moments-by-definition
coverage_card: dist-gamma-moments-by-definition
archive_note: 正本はshape-rateのガンマ分布について密度積分からE[X]=alpha/beta、E[X^2]=alpha(alpha+1)/beta^2、Var(X)=alpha/beta^2を導出し、旧カードと同じalpha=3,beta=2の数値例E[X]=3/2、Var(X)=3/4まで統合済み。公式代入だけの旧カードは不要。
---
## 問題
$X\sim\operatorname{Gamma}(\alpha,\beta)$ について $E[X]$ と $\operatorname{Var}(X)$ を使い、$\alpha=3,\beta=2$ の値を求めよ。
## 答え
$$E[X]=\frac32,\qquad \operatorname{Var}(X)=\frac34.$$
## 使用公式・定理
$$E[X]=\frac\alpha\beta,\qquad \operatorname{Var}(X)=\frac\alpha{\beta^2}.$$
## 計算例
$$E[X]=3/2,\qquad \operatorname{Var}(X)=3/2^2=3/4.$$
## 一手
平均はrateで1回割り、分散はrateで2回割る。
## 注意
第2引数をscaleと誤読すると平均が6になってしまう。

<!-- CARD -->

---
id: dist-exponential-moments
published: true
title: 指数分布の平均と分散を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential-moments
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 指数分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 指数分布
archive_reason: duplicate
canonical_card: dist-gamma-moments-by-definition
coverage_card: dist-gamma-moments-by-definition
archive_note: 正本にGamma(1,lambda)=Exponential(lambda)を明示し、一般ガンマ分布の導出式へalpha=1,beta=lambdaを代入してE[X]=1/lambda、E[X^2]=2/lambda^2、Var(X)=1/lambda^2まで求めている。指数分布だけの旧モーメントカードは一般導出の特殊ケース。
---
## 問題
指数分布 $X\sim\operatorname{Exponential}(\lambda)$ の平均と分散を求めよ。
## 答え
$$E[X]=\frac1\lambda,\qquad \operatorname{Var}(X)=\frac1{\lambda^2}.$$
## 使用公式・定理
$$\int_0^\infty xe^{-\lambda x}dx=\frac1{\lambda^2},\qquad
\int_0^\infty x^2e^{-\lambda x}dx=\frac2{\lambda^3}.$$
## 計算例
$$E[X]=\int_0^\infty x\lambda e^{-\lambda x}dx=\frac1\lambda,$$
$$E[X^2]=\lambda\frac2{\lambda^3}=\frac2{\lambda^2},$$
ゆえに分散は $2/\lambda^2-1/\lambda^2=1/\lambda^2$。
## 一手
率の逆数が平均、率の二乗の逆数が分散。
## 注意
標準偏差も $1/\lambda$ だが、分散は $1/\lambda^2$。
