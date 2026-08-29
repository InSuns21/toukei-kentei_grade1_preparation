---
id: dist-mgf-poisson
title: ポアソン分布のモーメント母関数から平均を取り出す
category: math-probability
subcategory: math-distribution-functions
topic: moment-generating-function
type: calc_step
difficulty: 2
priority: S
hashtags:
  - モーメント母関数（積率母関数）
  - ポアソン分布
  - 微分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 母関数
archive_reason: duplicate
canonical_card: prob-mgf-mean-variance
archive_note: ポアソン分布の既知MGFを1回微分して平均を出す操作は、MGFの微分から平均・分散を求める一般canonicalの特殊例。Poisson固有公式は参照知識として独立カード化しない。
---
## 問題
$X$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ に従うとする。台は $\mathbb N_0$、$\lambda>0$、$P(X=x)=e^{-\lambda}\lambda^x/x!$ である。モーメント母関数（積率母関数）から $E[X]$ を求めよ。
## 答え
モーメント母関数 $M_X(t)=E[e^{tX}]$ を1回微分して $t=0$ を代入する。
## 使用公式・定理
$$E[X]=M_X'(0),\qquad M_X(t)=\exp\{\lambda(e^t-1)\}.$$
## 計算例
$$\begin{aligned}M_X'(t)&=\lambda e^t\exp\{\lambda(e^t-1)\},\\M_X'(0)&=\lambda\cdot1\cdot e^0=\lambda.\end{aligned}$$
## 注意
モーメント母関数が0の近傍で有限であることを確認する。

<!-- CARD -->

---
id: est-moments-exponential
title: 指数分布のモーメント法推定量を求める
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments
type: strategy
difficulty: 2
priority: S
hashtags:
  - モーメント法
  - 指数分布
  - 標本平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント法
archive_reason: duplicate
canonical_card: est-method-of-moments
archive_note: 指数分布で母平均と標本平均を等置するだけの1母数モーメント法は一般手順の直接例であり、分布別カードを残さない。
---
## 問題
$X_i$ は独立同分布に指数分布 $\operatorname{Exp}(\lambda)$ に従うとする。台は $x>0$、$\lambda>0$、密度は $f(x)=\lambda e^{-\lambda x}$。$\lambda$ のモーメント法推定量を求めよ。
## 方針
母平均と標本平均を等置して母数について解く。
## 使用公式・定理
$$E[X]=\frac1\lambda,\qquad \overline X=\frac1n\sum_{i=1}^nX_i.$$
## 計算例
$$\begin{aligned}\overline X&=\frac1\lambda,\\\lambda\overline X&=1,\\\widehat\lambda_{\mathrm{MM}}&=\frac1{\overline X}.\end{aligned}$$
$x=(1,2,3)$ なら $\overline x=2$ より推定値は $1/2$。
## 注意
rate母数化を使っている。

<!-- CARD -->

---
id: est-fisher-bernoulli
title: ベルヌーイ分布のフィッシャー情報量（1次元）を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: fisher-information
type: calc_step
difficulty: 3
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - ベルヌーイ分布
  - スコア
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
archive_reason: duplicate
canonical_card: est-fisher-bernoulli-example
coverage_card: asym-mle-poisson-tail-probability
archive_note: Bernoulli 1観測の対数尤度を2回微分して I_1(p)=1/[p(1-p)]
  を得る同一計算。後発canonicalの方を残す。漸近推定subcategoryのフィッシャー情報量coverageは、実際に I_1(λ)
  を導出してMLEの漸近分散へ接続するPoissonカードへ付け替える。
---
## 問題
$X$ はベルヌーイ分布 $\operatorname{Bernoulli}(p)$ に従い、$X\in\{0,1\}$、$0<p<1$、$P(X=x)=p^x(1-p)^{1-x}$ とする。1観測当たりのフィッシャー情報量（1次元）を求めよ。
## 答え
対数尤度を2回微分し、負の期待値を取る。
## 使用公式・定理
正則条件の下で $I_1(p)=-E[\ell''(p;X)]$。
## 計算例
まず対数尤度は
$$\ell(p;X)=X\log p+(1-X)\log(1-p).$$
これを2回微分すると
$$\ell''(p;X)=-\frac X{p^2}-\frac{1-X}{(1-p)^2}.$$
$E_p[X]=p$、$E_p[1-X]=1-p$ を代入して
$$I_1(p)=-E_p[\ell''(p;X)]
=\frac p{p^2}+\frac{1-p}{(1-p)^2}
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.$$
## 注意
標本全体なら $I_n(p)=nI_1(p)$。

<!-- CARD -->

---
id: est-cramer-rao-bernoulli
title: クラーメル・ラオの不等式へ情報量を代入する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: cramer-rao
type: formula
difficulty: 2
priority: S
hashtags:
  - クラーメル・ラオの不等式
  - フィッシャー情報量（1次元）
  - 不偏性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラーメル・ラオの不等式
archive_reason: duplicate
canonical_card: est-crlb-bernoulli-square
archive_note: g(p)=p に対するCRLBは、母数関数 g(p) の一般形を扱うcanonicalで g'(p)=1
  と置いた特殊例。Bernoulli Fisher情報量の再導出も重複する。
---
## 問題
ベルヌーイ標本 $X_1,\ldots,X_n$ から $p$ を不偏推定する。クラーメル・ラオの不等式による分散の下限を求めよ。
## 答え
1観測当たりの情報量 $I_1(p)=1/[p(1-p)]$ を標本全体の情報量へ直す。
## 使用公式・定理
$g(p)=p$ の不偏推定量 $T$ に対し、正則条件の下で
$$\operatorname{Var}_p(T)\ge\frac{\{g'(p)\}^2}{I_n(p)}.$$
## 計算例
1観測の対数尤度
$$\ell_1(p;X)=X\log p+(1-X)\log(1-p)$$
を2回微分すると
$$\ell_1''(p;X)=-\frac X{p^2}-\frac{1-X}{(1-p)^2}.$$
$E_p[X]=p$ を代入して
$$-E_p[\ell_1''(p;X)]=\frac1{p(1-p)}$$
なので、独立な $n$ 観測では
$$I_n(p)=nI_1(p)=\frac n{p(1-p)}.$$
$g(p)=p$ だから $g'(p)=1$ であり、クラーメル・ラオの不等式へ代入すると
$$\operatorname{Var}_p(T)\ge\frac{\{g'(p)\}^2}{I_n(p)}
=\frac{p(1-p)}n.$$
一方、$T=\overline X$ は
$$E_p[\overline X]=p,
\qquad \operatorname{Var}_p(\overline X)=\frac{p(1-p)}n$$
なので、この下限を達成する。
## 注意
不偏性と正則条件が必要である。

<!-- CARD -->

---
id: est-aic-choice
title: AICでモデルを比較する
category: math-estimation
subcategory: math-model-selection
topic: aic
type: formula
difficulty: 1
priority: B
hashtags:
  - 情報量規準AIC
  - モデル選択
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: AIC
archive_reason: duplicate
canonical_card: ms-aic-numeric-comparison
archive_note: 最大対数尤度と母数数からAICを計算して小さいモデルを選ぶ同一操作。モデル選択canonicalへ統合する。
---
## 問題
モデルAは最大対数尤度 $-100$、母数数3、モデルBは $-97$、母数数7である。AICで選べ。
## 答え
AICが小さいモデルを選ぶ。
## 使用公式・定理
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k.$$
## 計算例
$$\operatorname{AIC}_A=-2(-100)+2\cdot3=206,$$
$$\operatorname{AIC}_B=-2(-97)+2\cdot7=208.$$
$206<208$ なのでAを選ぶ。
## 注意
母数数のペナルティを忘れない。
