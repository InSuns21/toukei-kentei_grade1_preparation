---
id: bayes-beta-equal-tail-interval
title: ベータ事後分布の等裾信用区間を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: credible-interval-beta
type: formula
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 信用区間
  - ベータ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信用区間と信頼区間の違い
archive_reason: reference_only
canonical_card: bayes-normal-credible-interval
archive_note: 等裾信用区間は事後分布の下側・上側分位点を取る同一操作であり、Beta分布だけの式を独立カードとして残さない。信用区間の数値操作は正規事後分布のcanonicalで保持する。
---
## 問題
$p\mid x\sim\operatorname{Beta}(\alpha,\beta)$ の等裾 $100(1-\gamma)$%信用区間を書け。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後分布の分位点定義。

## 答え
事後分布の分位点を $q_u$ とすると
$$[q_{\gamma/2},q_{1-\gamma/2}],$$
かつ
$$P(p<q_{\gamma/2}\mid x)=P(p>q_{1-\gamma/2}\mid x)=\frac\gamma2.$$

## 計算例
95%区間なら2.5%点と97.5%点。

## 注意
正規近似で台 $[0,1]$ を外れる場合はBeta分位点を直接使う。

<!-- CARD -->

---
id: bayes-nig-update
title: 正規–逆ガンマ共役更新を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-inverse-gamma
type: formula
difficulty: 5
priority: B
hashtags:
  - ベイズ統計
  - 正規分布
  - 逆ガンマ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共役事前分布
archive_reason: reference_only
canonical_card: bayes-gamma-exponential-update
archive_note: 正規–逆ガンマの4超母数更新式は600枚正本では参照式寄り。共役性の操作は正規–正規、ガンマ–指数、Dirichlet–多項などの代表例で保持し、詳細式はactiveカードから外す。
---
## 問題
観測モデルが正規分布 $X_i\mid\mu,\sigma^2\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$、条件付き事前分布が正規分布 $\mu\mid\sigma^2\sim N(m_0,\sigma^2/\kappa_0)$、$\sigma^2\sim\operatorname{InvGamma}(\alpha_0,\beta_0)$ とする。事後超母数を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

平方和分解と正規–逆Gamma共役性。

## 答え
$$\kappa_n=\kappa_0+n,\qquad
m_n=\frac{\kappa_0m_0+n\bar x}{\kappa_n},$$
$$\alpha_n=\alpha_0+\frac n2,$$
$$\beta_n=\beta_0+\frac12\sum_i(x_i-\bar x)^2
+\frac{\kappa_0n}{2\kappa_n}(\bar x-m_0)^2.$$
事後も $\mu\mid\sigma^2,\boldsymbol x\sim N(m_n,\sigma^2/\kappa_n)$、$\sigma^2\mid\boldsymbol x\sim\operatorname{InvGamma}(\alpha_n,\beta_n)$。

## 計算例
最後の項は事前平均と標本平均の不一致を分散更新へ反映する。

## 注意
逆ガンマ分布の母数化を密度 $\propto(\sigma^2)^{-\alpha-1}e^{-\beta/\sigma^2}$ と明記する。
