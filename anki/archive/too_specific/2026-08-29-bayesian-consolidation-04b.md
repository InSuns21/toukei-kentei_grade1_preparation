---
id: bayes-gamma-poisson-predictive
title: ガンマ–ポアソン事後予測分布を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gamma-poisson-predictive
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - ガンマ分布
  - 負の二項分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ガンマ分布・ポアソン分布
archive_reason: too_specific
canonical_card: bayes-posterior-predictive-canonical
archive_note: Gamma-Poisson混合から負の二項分布を得る関係は有用だが、600枚デッキでは事後予測の一般積分moveを優先し、分布固有の派生はformula/reference側へ寄せる。
---
## 問題
$\lambda\mid x\sim\operatorname{Gamma}(\alpha,\beta)$（shape–rate）で、$Y\mid\lambda\sim\operatorname{Poisson}(\lambda)$。Yの事後予測確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\int_0^\infty\lambda^{r-1}e^{-c\lambda}\,d\lambda=\Gamma(r)/c^r$。

## 答え
$$P(Y=y\mid x)=\int_0^\infty
\frac{e^{-\lambda}\lambda^y}{y!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda$$
$$=\frac{\Gamma(\alpha+y)}{\Gamma(\alpha)y!}
\left(\frac{\beta}{\beta+1}\right)^\alpha
\left(\frac1{\beta+1}\right)^y.$$

## 計算例
これは成功確率 $\beta/(\beta+1)$ の負の二項分布。

## 注意
ガンマ分布の第2母数がrateであることを明記する。

<!-- CARD -->

---
id: bayes-exponential-predictive
title: ガンマ–指数事後予測密度を求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: exponential-predictive
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - 事後予測分布
  - Lomax分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: too_specific
canonical_card: bayes-posterior-predictive-canonical
archive_note: Gamma-指数混合からLomax分布を得る派生は、事後予測の一般積分moveと同型。独立カードとしては優先度が低い。
---
## 問題
$\lambda\mid\boldsymbol x\sim\operatorname{Gamma}(\alpha,\beta)$（shape–rate）、$Y\mid\lambda\sim\operatorname{Exp}(\lambda)$ の事後予測密度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$。

## 答え
$y\ge0$ で
$$p(y\mid\boldsymbol x)=\int_0^\infty
\lambda e^{-\lambda y}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda$$
$$=\frac{\alpha\beta^\alpha}{(\beta+y)^{\alpha+1}}.$$

## 計算例
予測生存関数は $\{\beta/(\beta+y)\}^{\alpha}$。

## 注意
母数を固定した指数分布より右裾が重いLomax分布になる。

<!-- CARD -->

---
id: bayes-dirichlet-predictive
title: Dirichlet事後予測確率を計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: dirichlet-predictive
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - Dirichlet分布
  - 事後予測分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: too_specific
canonical_card: bayes-posterior-predictive-canonical
archive_note: Dirichlet事後平均を次カテゴリ確率に使う操作はBeta-Bernoulli予測の多カテゴリ版で、同じ一手を分布別に増やさない。
---
## 問題
$\boldsymbol p\mid\boldsymbol n\sim\operatorname{Dirichlet}(3,5,2)$ のとき、次の観測がカテゴリ2となる事後予測確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Dirichlet平均 $E[p_k]=\alpha_k/\sum_j\alpha_j$。

## 答え
$$P(Y=2\mid\boldsymbol n)
=E[p_2\mid\boldsymbol n]
=\frac5{3+5+2}=\frac12.$$

## 計算例
3カテゴリの予測確率は $(0.3,0.5,0.2)$。

## 注意
事後超母数を分子・分母に使う。

<!-- CARD -->

---
id: bayes-normal-normal-predictive
title: 正規–正規事後予測分布を求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-predictive
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 事後予測分布
  - 正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: too_specific
canonical_card: bayes-posterior-predictive-canonical
archive_note: 正規事後予測で分散を加える特殊形も、一般事後予測公式の派生。正規分布の和は別カード群で学習できるためBayes側で専用カードを重ねない。
---
## 問題
事後分布が正規分布 $\mu\mid\boldsymbol x\sim N(m_n,s_n^2)$、条件付き分布が正規分布 $Y\mid\mu\sim N(\mu,\sigma^2)$ とする。Yの事後予測分布を求めよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立な正規変数の和は正規分布で、分散は加算される。

## 答え
$Y=\mu+\varepsilon$、$\varepsilon\sim N(0,\sigma^2)$ が事後の $\mu$ と独立なので
$$Y\mid\boldsymbol x\sim N(m_n,\sigma^2+s_n^2).$$

## 計算例
$m_n=2.4,s_n^2=0.8,\sigma^2=9$ なら $N(2.4,9.8)$。

## 注意
予測分散には新観測の分散と母数不確実性の両方が入る。

<!-- CARD -->

---
id: bayes-nig-student-predictive
title: 正規–逆ガンマの事後予測分布を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-inverse-gamma-predictive
type: formula
difficulty: 5
priority: B
hashtags:
  - ベイズ統計
  - 事後予測分布
  - t分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: too_specific
canonical_card: bayes-posterior-predictive-canonical
archive_note: 正規-逆ガンマ混合からt分布となる高度な派生は通常デッキ600枚枠では過剰。必要な分布関係はformula/reference側へ残す。
---
## 問題
正規–逆Gamma更新後の超母数を $(m_n,\kappa_n,\alpha_n,\beta_n)$ とする。新観測Yの事後予測分布を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規分布を逆ガンマ分布で分散混合するとStudentのt分布になる。

## 答え
$$Y\mid\boldsymbol x\sim
t_{2\alpha_n}\left(
m_n,\ \frac{\beta_n(\kappa_n+1)}{\alpha_n\kappa_n}
\right).$$
ここで第2母数は尺度の二乗。

## 計算例
自由度は $2\alpha_n$。

## 注意
t分布の第2母数を分散とするか尺度とするかを明示する。
