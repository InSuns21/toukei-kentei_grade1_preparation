---
id: asym-convergence-probability
title: 確率収束の定義とChebyshevによる判定
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-probability
type: formula
difficulty: 2
priority: S
hashtags: [確率収束, チェビシェフの不等式, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n$ が $\theta$ に確率収束するとは何か。定義を書き、分散が評価できるときの判定法を示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$X_n\xrightarrow{p}\theta\iff\forall\varepsilon>0,\ P(|X_n-\theta|>\varepsilon)\to0\quad(n\to\infty).$$

## 答え
任意の正の $\varepsilon$ に対し $P(|X_n-\theta|>\varepsilon)\to0$ と定義する。分散既知なら Chebyshev（チェビシェフ）不等式で上界をとる。

## 計算例
$E[X_i]=\mu$、$\operatorname{Var}(X_i)=4$ の独立同分布標本を考える。$n=400$、$\varepsilon=0.5$ なら
$$E[\overline X_{400}]=\mu,
\qquad \operatorname{Var}(\overline X_{400})=\frac4{400}=0.01.$$
チェビシェフの不等式より
$$P(|\overline X_{400}-\mu|>0.5)
\le\frac{0.01}{0.5^2}=0.04.$$
一般の $n$ では上界が $4/(n\varepsilon^2)\to0$ なので、$\overline X_n\xrightarrow{p}\mu$ である。

## 注意
確率収束は「確率1の例外を除いて値が近づく」ことではなく、確率の極限をいう。

<!-- CARD -->

---
id: asym-mle-poisson-tail-probability
title: ポアソン最尤推定量の漸近正規分布で確率を近似する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-asymptotic-probability
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定量の漸近正規性, ポアソン分布, 確率近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$、$n=100$、$\lambda=4$ とする。最尤推定量 $\widehat\lambda=\overline X$ について $P(\widehat\lambda>4.3)$ を漸近近似せよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数
- $I_1(\theta)$：1観測当たりのフィッシャー情報量（1次元）
- $\dot\sim$：有限標本で厳密に同じ分布という意味ではなく、標本数が大きいときの近似分布を表す記号

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正則条件の下で
$$\widehat\theta_{\mathrm{ML}}\ \dot\sim\ N\left(\theta,\frac1{nI_1(\theta)}\right).$$
したがって標準誤差は $\{nI_1(\theta)\}^{-1/2}$ であり、しきい値 $c$ に対して
$$P(\widehat\theta_{\mathrm{ML}}>c)
\approx1-\Phi\left(
\frac{c-\theta}{\{nI_1(\theta)\}^{-1/2}}
\right).$$

## 一手
情報量から分散を出し、標準誤差で標準化する。

## 答え
$I_1(\lambda)=1/\lambda$ なので
$$\widehat\lambda\ \dot\sim\ N\left(\lambda,\frac1{nI_1(\lambda)}\right)
=N\left(4,\frac4{100}\right).$$
標準誤差は $0.2$。よって
$$P(\widehat\lambda>4.3)
\approx1-\Phi\left(\frac{4.3-4}{0.2}\right)
=1-\Phi(1.5)\approx0.0668.$$

## 計算例
まず1観測の対数尤度を作る：
$$\ell_1(\lambda;x)=x\log\lambda-\lambda-\log(x!).$$
したがって
$$\ell_1'(\lambda)=\frac x\lambda-1,
\qquad \ell_1''(\lambda)=-\frac x{\lambda^2}.$$
$E_\lambda[X]=\lambda$ より
$$I_1(\lambda)=-E_\lambda[\ell_1''(\lambda)]
=\frac{E_\lambda[X]}{\lambda^2}=\frac1\lambda.$$
$\lambda=4,n=100$ を代入すると
$$\operatorname{Avar}(\widehat\lambda)
=\frac1{nI_1(4)}=\frac4{100}=0.04,$$
よって標準誤差は $\sqrt{0.04}=0.2$。最後に
$$z=\frac{4.3-4}{0.2}=1.5,
\qquad P(\widehat\lambda>4.3)\approx1-\Phi(1.5)=0.0668.$$

## 注意
$1/I_1(\theta)$ は $\sqrt n(\widehat\theta-\theta)$ の極限分散であり、$\widehat\theta$ 自身の分散は $1/[nI_1(\theta)]$。

<!-- CARD -->

---
id: asym-mle-normal-variance-known-mean
title: 正規分散の最尤推定量の漸近分布を情報量から求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-normal-variance
type: calc_step
difficulty: 3
priority: A
hashtags: [最尤推定量の漸近正規性, 正規分布, 分散母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
正規分布 $X_i\overset{iid}{\sim}N(\mu,\tau)$ で平均 $\mu$ は既知、分散母数 $\tau>0$ は未知とする。$\widehat\tau=n^{-1}\sum_i(X_i-\mu)^2$ の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\widehat\theta_{\mathrm{ML}}-\theta)
\xrightarrow{d}N\left(0,I_1(\theta)^{-1}\right).$$

## 一手
分散そのものを母数 $\tau$ と置くと微分の混乱が減る。

## 答え
1観測の対数尤度は
$$\ell_1(\tau;x)
=-\frac12\log(2\pi)-\frac12\log\tau
-\frac{(x-\mu)^2}{2\tau}.$$
これを $\tau$ で2回微分すると
$$\frac{\partial^2\ell}{\partial\tau^2}
=\frac1{2\tau^2}-\frac{(X-\mu)^2}{\tau^3}.$$
$E[(X-\mu)^2]=\tau$ より
$$I_1(\tau)=-E[\ell''(\tau;X)]=\frac1{2\tau^2}.$$
したがって
$$\sqrt n(\widehat\tau-\tau)\xrightarrow{d}N(0,2\tau^2),$$
すなわち $\widehat\tau\ \dot\sim\ N(\tau,2\tau^2/n)$。

## 計算例
$X\sim N(\mu,\tau)$ で $\mu$ は既知とする。1観測の対数尤度は
$$\ell_1(\tau;X)=C-\frac12\log\tau-\frac{(X-\mu)^2}{2\tau}.$$
2回微分すると
$$\ell_1''(\tau)=\frac1{2\tau^2}-\frac{(X-\mu)^2}{\tau^3}.$$
$E[(X-\mu)^2]=\tau$ より
$$I_1(\tau)=-E[\ell_1''(\tau)]=\frac1{2\tau^2}.$$
$\tau=4,n=100$ を代入すると
$$I_1(4)=\frac1{2\cdot4^2}=\frac1{32}.$$
したがって
$$\operatorname{Avar}(\widehat\tau)
=\frac1{100I_1(4)}=\frac{32}{100}=0.32,$$
$$\operatorname{ASE}(\widehat\tau)=\sqrt{0.32}\approx0.566.$$

## 注意
$\tau=\sigma^2$ である。標準偏差 $\sigma$ の漸近分布にはさらにデルタ法が必要。

<!-- CARD -->

---
id: asym-delta-exponential-mean
title: デルタ法で指数分布の平均の最尤推定量を扱う
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-mle-invariance
type: calc_step
difficulty: 3
priority: S
hashtags: [デルタ法, 最尤推定量の漸近正規性, 指数分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Exp}(\lambda)$（率表示）とする。$\widehat\lambda=1/\overline X$ から平均 $\mu=1/\lambda$ を $\widehat\mu=1/\widehat\lambda$ で推定するとき、その漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,V)
\Rightarrow
\sqrt n\{g(T_n)-g(\theta)\}\xrightarrow{d}N(0,\{g'(\theta)\}^2V).$$

## 一手
変換の微分を二乗し、元の極限分散に掛ける。

## 答え
$$\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda^2).$$
$g(\lambda)=1/\lambda$、$g'(\lambda)=-1/\lambda^2$ なので、デルタ法より
$$\sqrt n(\widehat\mu-\mu)
\xrightarrow{d}N\left(0,\frac1{\lambda^4}\lambda^2\right)
=N(0,\mu^2).$$
実際、$\widehat\mu=1/(1/\overline X)=\overline X$ であり、中心極限定理の結果と一致する。

## 計算例
$g(\lambda)=1/\lambda$ だから
$$g'(\lambda)=-\frac1{\lambda^2}.$$
元の極限分散 $\lambda^2$ に微分の二乗を掛けると
$$\{g'(\lambda)\}^2\lambda^2
=\frac1{\lambda^4}\lambda^2
=\frac1{\lambda^2}=\mu^2.$$
$\lambda=2,n=100$ なら $\mu=1/2$ なので
$$\operatorname{Avar}(\widehat\mu)=\frac{(1/2)^2}{100}=0.0025,
\qquad \operatorname{ASE}(\widehat\mu)=0.05.$$

## 注意
最尤推定量の不変性だけでは分散は出ない。分散計算にはデルタ法を使う。

<!-- CARD -->

---
id: asym-delta-arcsine-proportion
title: デルタ法で標本比率の分散安定化変換を導く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-variance-stabilizing
type: calc_step
difficulty: 4
priority: A
hashtags: [デルタ法, 分散安定化, ベルヌーイ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\widehat p=\overline X$、$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とする。$g(p)=\arcsin\sqrt p$ の漸近分散が $p$ に依存しないことを示せ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\operatorname{Avar}\{g(T_n)\}=\{g'(\theta)\}^2\operatorname{Avar}(T_n).$$

## 一手
微分の二乗が元の分散 $p(1-p)$ を打ち消すことを確認する。

## 答え
連鎖律より
$$g'(p)=\frac1{\sqrt{1-p}}\cdot\frac1{2\sqrt p}
=\frac1{2\sqrt{p(1-p)}}.$$
また $\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p))$。デルタ法から
$$\sqrt n\{g(\widehat p)-g(p)\}
\xrightarrow{d}N\left(0,
\frac1{4p(1-p)}p(1-p)\right)
=N\left(0,\frac14\right).$$
したがって $g(\widehat p)$ の漸近分散は $1/(4n)$。

## 計算例
$p=0.36$ では
$$g'(0.36)=\frac1{2\sqrt{0.36\cdot0.64}}
=\frac1{0.96}.$$
元の極限分散 $0.36\cdot0.64=0.2304$ を掛けると
$$\{g'(0.36)\}^2(0.2304)
=\frac{0.2304}{0.96^2}=\frac14.$$
$n=100$ では漸近分散が $1/(4\cdot100)=0.0025$、漸近標準誤差が $0.05$ となる。

## 注意
$p=0,1$ では微分が発散するため、通常のデルタ法をそのまま適用できない。

<!-- CARD -->

---
id: asym-delta-normal-standard-deviation
title: デルタ法で正規分布の標準偏差推定量の漸近分布を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-standard-deviation
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, 正規分布, 標準偏差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
正規分布の分散の最尤推定量 $\widehat\tau$ が
$$\sqrt n(\widehat\tau-\tau)\xrightarrow{d}N(0,2\tau^2)$$
を満たすとする。標準偏差 $\sigma=\sqrt\tau$ の推定量 $\widehat\sigma=\sqrt{\widehat\tau}$ の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

1次元デルタ法を $g(\tau)=\sqrt\tau$ に適用する。

## 一手
極限分散 $\sigma^2/2$ を推定量自身の分散と読むときは $n$ で割る。

## 答え
$g(\tau)=\sqrt\tau$ と置くと
$$g'(\tau)=\frac1{2\sqrt\tau}=\frac1{2\sigma}.$$
デルタ法より極限分散は
$$\{g'(\tau)\}^2\,2\tau^2
=\frac1{4\tau}\,2\tau^2
=\frac\tau2=\frac{\sigma^2}{2}.$$
したがって
$$\sqrt n(\widehat\sigma-\sigma)
\xrightarrow{d}N\left(0,\frac{\sigma^2}{2}\right).$$

## 計算例
$g(\tau)=\sqrt\tau$ だから $g'(\tau)=1/(2\sqrt\tau)$。$\sigma=3$ なら $\tau=9$ なので
$$g'(9)=\frac16.$$
元の極限分散 $2\tau^2=2\cdot9^2=162$ に微分の二乗を掛けると
$$\left(\frac16\right)^2 162=\frac92.$$
$n=200$ では $\widehat\sigma$ の漸近分散は
$$\frac{9/2}{200}=0.0225,$$
したがって漸近標準誤差は $\sqrt{0.0225}=0.15$ である。

## 注意
分散母数を $\tau=\sigma^2$ と置いてから平方根変換すると追いやすい。

<!-- CARD -->

---
id: asym-exponential-mean-tail
title: 指数標本平均の上側確率を中心極限定理で近似する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: exponential-sample-mean-clt
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 指数分布, 標本平均, 確率近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近的性質 }]
---

## 問題
$X_1,\ldots,X_{100}$ は率 $\lambda=1/2$ の指数分布からの独立同分布標本である。$P(\overline X>2.4)$ を中心極限定理で近似せよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

率 $\lambda$ の指数分布では
$$E[X_i]=\frac1\lambda,\qquad \operatorname{Var}(X_i)=\frac1{\lambda^2}.$$
有限分散を持つ独立同分布標本に対する中心極限定理より
$$\frac{\sqrt n(\overline X-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$

## 一手
分布名から平均・分散を出し、標本平均の標準誤差 $\sigma/\sqrt n$ を作る。

## 答え
指数分布の平均は $2$、分散は $4$ なので
$$P(\overline X>2.4)\approx P(Z>2)\approx0.0228.$$

## 計算例
ここでは $\mu=2$、$\sigma=2$、$n=100$ だから
$$\frac{2.4-2}{2/\sqrt{100}}=\frac{0.4}{0.2}=2.$$
したがって
$$P(\overline X>2.4)\approx P(Z>2)=1-\Phi(2)\approx0.0228.$$

## 注意
指数分布自体は右に歪むが、標本平均は大標本で正規近似できる。

<!-- CARD -->

---
id: asym-exponential-rate-mle
title: 指数分布の率の最尤推定量をデルタ法で標準化する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: exponential-rate-mle-asymptotics
type: calc_step
difficulty: 3
priority: S
hashtags: [指数分布, 最尤推定量, デルタ法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
$X_1,\ldots,X_n$ は率 $\lambda$ の指数分布からの独立同分布標本である。$\widehat\lambda=1/\overline X$ の漸近分布を求め、$n=100$、$\overline x=0.4$ の漸近標準誤差を計算せよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

指数分布では $E[X]=1/\lambda$、$\operatorname{Var}(X)=1/\lambda^2$ だから
$$\sqrt n\left(\overline X-\frac1\lambda\right)
\xrightarrow{d}N\left(0,\frac1{\lambda^2}\right).$$
$g(x)=1/x$ に対するデルタ法を使い、$g'(1/\lambda)=-\lambda^2$ とする。

## 一手
$1/\overline X$ を直接扱わず、まず $\overline X$ の中心極限定理に $g(x)=1/x$ を適用する。

## 答え
$$\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda^2).$$
観測値から $\widehat\lambda=2.5$ なので
$$\widehat{\operatorname{SE}}(\widehat\lambda)
=\frac{\widehat\lambda}{\sqrt n}=\frac{2.5}{10}=0.25.$$

## 計算例
$E[X]=1/\lambda$、$\operatorname{Var}(X)=1/\lambda^2$ だから中心極限定理より
$$\sqrt n\left(\overline X-\frac1\lambda\right)
\xrightarrow{d}N\left(0,\frac1{\lambda^2}\right).$$
$g(x)=1/x$ とおけば $\widehat\lambda=g(\overline X)$ であり
$$g'(1/\lambda)=-\frac1{(1/\lambda)^2}=-\lambda^2.$$
デルタ法の極限分散は
$$\{g'(1/\lambda)\}^2\frac1{\lambda^2}
=\lambda^4\frac1{\lambda^2}=\lambda^2.$$
したがって推定量自体の漸近分散は $\lambda^2/n$ となる。
$n=100,\overline x=0.4$ なら $\widehat\lambda=1/0.4=2.5$ なので
$$\widehat{\operatorname{SE}}(\widehat\lambda)
=\frac{2.5}{\sqrt{100}}=0.25.$$

## 注意
率 $\lambda$ と平均 $1/\lambda$ を取り違えない。

<!-- CARD -->

---
id: asym-logit-proportion-delta
title: 標本比率のロジット変換へデルタ法を適用する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: logit-proportion-delta-method
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, 標本比率, ロジット変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$X\sim\operatorname{Binomial}(n,p)$、$\widehat p=X/n$ とする。$g(p)=\log\{p/(1-p)\}$ のプラグイン推定量 $g(\widehat p)$ の漸近分散を求め、$n=200$、$\widehat p=0.30$ で標準誤差を計算せよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)),$$
$$g'(p)=\frac1p+\frac1{1-p}=\frac1{p(1-p)}.$$
デルタ法の極限分散は $\{g'(p)\}^2p(1-p)$ である。

## 一手
変換後の分散は「変換の微分の2乗×変換前の分散」で作る。

## 答え
$$\sqrt n\{g(\widehat p)-g(p)\}
\xrightarrow{d}N\left(0,\frac1{p(1-p)}\right).$$
したがって
$$\widehat{\operatorname{SE}}\{g(\widehat p)\}
=\sqrt{\frac1{n\widehat p(1-\widehat p)}}\approx0.1543.$$

## 計算例
$$\{g'(p)\}^2p(1-p)
=\frac{1}{p^2(1-p)^2}p(1-p)
=\frac1{p(1-p)}.$$
$\widehat p=0.30$ なら
$$\sqrt{\frac1{200(0.30)(0.70)}}=\sqrt{\frac1{42}}\approx0.1543.$$
点推定値は $g(0.30)=\log(3/7)\approx-0.8473$。

## 注意
$\widehat p=0$ または1ではロジットが発散し、この近似をそのまま使えない。

<!-- CARD -->

---
id: asym-ratio-two-means-delta
title: 多変量デルタ法で比推定量の漸近分散を共分散込みで求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: ratio-estimator-multivariate-delta-canonical
type: strategy
difficulty: 4
priority: S
hashtags:
  - 多変量デルタ法
  - 比推定量
  - 漸近分散
  - 共分散
  - 2標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
---

## 問題
2つの推定量について、正規分布への漸近収束
$$
\sqrt n\left\{
\begin{pmatrix}\widehat a\\\widehat b\end{pmatrix}
-
\begin{pmatrix}a\\b\end{pmatrix}
\right\}
\xrightarrow{d}N_2(0,\Sigma),
\qquad b\ne0
$$
が成り立つとする。次を解け。

1. $R_n=\widehat a/\widehat b$ の漸近分散定数を、$\Sigma_{11},\Sigma_{22},\Sigma_{12}$ で表せ。
2. 独立な2標本平均 $\overline X,\overline Y$ で、母平均が $\mu_X=4,\mu_Y=2$、母分散が $\sigma_X^2=4,\sigma_Y^2=1$、両標本サイズが $n=100$ のとき、$\overline X/\overline Y$ の漸近標準誤差を求めよ。
3. 分母の母数 $b$ が0に近いとき、この近似に注意が必要な理由を述べよ。

## 記号・用語
$\Sigma$ は $\sqrt n$ 倍した2推定量の極限分散共分散行列である。多変量デルタ法では、滑らかな関数 $g(a,b)$ の一次近似を勾配 $\nabla g(a,b)$ で表し、その方向の分散を計算する。

## 使用公式・定理
多変量デルタ法より
$$
\sqrt n\{g(\widehat a,\widehat b)-g(a,b)\}
\xrightarrow{d}
N\left(0,\nabla g(a,b)^{\mathsf T}\Sigma\nabla g(a,b)\right),
$$
ここで右辺の $N$ は正規分布を表す。

比では
$$
g(a,b)=\frac ab,
\qquad
\nabla g(a,b)
=\begin{pmatrix}1/b\\-a/b^2\end{pmatrix}.
$$
したがって
$$
V_R
=\frac{\Sigma_{11}}{b^2}
+\frac{a^2\Sigma_{22}}{b^4}
-\frac{2a\Sigma_{12}}{b^3}.
$$

## 一手／方針
**比を見たら $g(a,b)=a/b$ の勾配を先に作り、$\nabla g^{\mathsf T}\Sigma\nabla g$ を計算する。** 独立なら共分散項だけが0になり、一般式から独立2標本の公式が直ちに出る。

## 答え
1. 漸近分散定数は
$$
\boxed{
V_R
=\frac{\Sigma_{11}}{b^2}
+\frac{a^2\Sigma_{22}}{b^4}
-\frac{2a\Sigma_{12}}{b^3}}
$$
である。したがって $R_n$ 自身の大標本での分散はおよそ $V_R/n$。

2. 独立なので $\Sigma_{12}=0$。また
$$
\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}.
$$
よって
$$
V_R
=\frac4{2^2}+\frac{4^2\cdot1}{2^4}
=1+1=2.
$$
$n=100$ だから
$$
\operatorname{ASE}(R_n)
=\sqrt{\frac2{100}}
\approx\boxed{0.1414}.
$$

3. 勾配には $1/b$ と $1/b^2$ が含まれるため、$b$ が0に近いと一次近似の係数が非常に大きくなり、比の分布が強く歪んで正規近似が不安定になりやすい。

## 計算例
共分散がある例として $a=2,b=1$、
$$
\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}
$$
なら
$$
V_R
=4+4\cdot9-2\cdot2\cdot1
=36.
$$
共分散項を落としてしまうと $40$ となるため、同じ標本から作った2推定量では $\Sigma_{12}$ を無視しない。

## 注意
独立2標本では共分散項は0だが、同一標本から計算した2推定量では一般に0ではない。分母が0または0に近い場合、比の推定にはデルタ法による対称な正規近似よりFieller型区間など別の扱いが適することがある。

<!-- CARD -->

---
id: asym-convergence-almost-sure
title: 概収束（ほとんど確実な収束）の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-almost-sure
type: formula
difficulty: 2
priority: A
hashtags: [概収束, 収束の概念, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n\xrightarrow{a.s.}\theta$ の定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$P\left(\lim_{n\to\infty}X_n=\theta\right)=1.$$

## 答え
確率1の集合上で極限が $\theta$ になることをいう。

## 計算例
非負な $Y_n\ge0$ で $\sum_{n=1}^\infty E[Y_n]<\infty$ なら単調収束定理から $E[\sum_{n=1}^\infty Y_n]<\infty$ となる。よって $\sum_{n=1}^\infty Y_n<\infty$ がほとんど確実に成り立ち、特に $Y_n\to0$ は概収束する。独立性は不要である。

## 注意
概収束は確率収束より強い含意関係にある。

<!-- CARD -->

---
id: asym-convergence-distribution
title: 分布収束の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-distribution
type: formula
difficulty: 2
priority: S
hashtags: [分布収束, 累積分布関数, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n\xrightarrow{d}X$ の定義を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

極限分布 $X$ の累積分布関数 $F_X$ の全ての連続点 $x$ で $\lim_{n\to\infty}F_{X_n}(x)=F_X(x)$。

## 答え
極限分布の累積分布関数の連続点ですべての点で、累積分布関数が一致する極限をとる。

## 計算例
$X_n\sim N(0,1+1/n)$、$X\sim N(0,1)$ とする。累積分布関数は
$$F_{X_n}(x)=\Phi\left(\frac{x}{\sqrt{1+1/n}}\right).$$
任意の実数 $x$ で $x/\sqrt{1+1/n}\to x$ であり、$\Phi$ は連続だから
$$F_{X_n}(x)\longrightarrow\Phi(x)=F_X(x).$$
よって定義から $X_n\xrightarrow{d}N(0,1)$ である。

## 注意
分布収束は極限の分布の形だけをいい、確率変数同士の近さを要求しない。

<!-- CARD -->

---
id: asym-convergence-ms
title: 平均二乗収束からMarkovの不等式で一致性を示す
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mean-square-convergence-consistency-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 平均二乗収束
  - 一致性
  - 平均二乗誤差
  - Markovの不等式
  - 確率収束
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 収束の概念
---

## 問題
推定量 $T_n$ と母数 $\theta$ について次を答えよ。

1. $T_n\xrightarrow{qm}\theta$（平均二乗収束）の定義を書け。
2. $E[(T_n-\theta)^2]\to0$ なら $T_n\xrightarrow{p}\theta$ であることを、Markovの不等式を使って示せ。
3. 平均二乗誤差をバイアスと分散に分解せよ。
4. $E[T_n]-\theta=1/n$、$\operatorname{Var}(T_n)=4/n$ のとき、平均二乗誤差が0へ収束することを確認せよ。

## 記号・用語
$T_n\xrightarrow{qm}\theta$ は平均二乗収束、$T_n\xrightarrow{p}\theta$ は確率収束を表す。一致推定量とは $T_n\xrightarrow{p}\theta$ を満たす推定量である。

平均二乗誤差（MSE）は
$$
\operatorname{MSE}(T_n)=E[(T_n-\theta)^2]
$$
である。

## 使用公式・定理
平均二乗収束の定義は
$$
E[(T_n-\theta)^2]\longrightarrow0.
$$

Markovの不等式を非負確率変数 $(T_n-\theta)^2$ に適用すると、任意の $\varepsilon>0$ について
$$
P(|T_n-\theta|>\varepsilon)
=P((T_n-\theta)^2>\varepsilon^2)
\le
\frac{E[(T_n-\theta)^2]}{\varepsilon^2}.
$$

また
$$
\operatorname{MSE}(T_n)
=\operatorname{Var}(T_n)
+\{E[T_n]-\theta\}^2.
$$

## 一手／方針
**平均二乗誤差が与えられたら、ずれの二乗を非負確率変数としてMarkovの不等式へ入れる。** これで確率収束の定義に現れる外側確率を直接0へ押さえられる。

## 答え
1.
$$
T_n\xrightarrow{qm}\theta
\iff
E[(T_n-\theta)^2]\to0.
$$

2. 任意の $\varepsilon>0$ に対して
$$
P(|T_n-\theta|>\varepsilon)
\le
\frac{E[(T_n-\theta)^2]}{\varepsilon^2}
\longrightarrow0.
$$
よって
$$
\boxed{T_n\xrightarrow{p}\theta}.
$$
したがって平均二乗収束は確率収束を含意する。

3.
$$
\boxed{
E[(T_n-\theta)^2]
=\operatorname{Var}(T_n)
+\operatorname{Bias}(T_n)^2}.
$$

4.
$$
\operatorname{MSE}(T_n)
=\frac4n+\frac1{n^2}
\longrightarrow0.
$$
したがって $T_n$ は平均二乗収束し、特に一致推定量である。

## 計算例
$n=100$ なら
$$
\operatorname{MSE}(T_{100})
=\frac4{100}+\frac1{10000}
=0.0401.
$$
例えば $\varepsilon=0.5$ に対してMarkovの不等式から
$$
P(|T_{100}-\theta|>0.5)
\le\frac{0.0401}{0.25}=0.1604.
$$
この上界自体は有限標本では粗くても、$n\to\infty$ で0へ収束することが一致性の証明には十分である。

## 注意
平均二乗収束は確率収束より強い。逆に $T_n\xrightarrow{p}\theta$ だけから平均二乗収束は一般には従わない。MSEが小さいことはバイアスと分散の両方を同時に制御している。

<!-- CARD -->

---
id: asym-convergence-relations
title: 収束概念の包含関係をまとめる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-hierarchy
type: recognition
difficulty: 2
priority: A
hashtags: [収束の概念, 包含関係, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
概収束、平均二乗収束、確率収束、分布収束の強弱関係を述べよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$X_n\xrightarrow{a.s.}\theta\Rightarrow X_n\xrightarrow{p}\theta,\qquad X_n\xrightarrow{qm}\theta\Rightarrow X_n\xrightarrow{p}\theta,\qquad X_n\xrightarrow{p}\theta\Rightarrow X_n\xrightarrow{d}\theta.$$

## 答え
概収束と平均二乗収束はそれぞれ確率収束を含意し、確率収束は分布収束を含意する。

## 計算例
$\overline X_n\xrightarrow{a.s.}\mu$（強法則）なら自動的に $\xrightarrow{p}\mu$ および $\xrightarrow{d}\mu$ も成り立つ。

## 注意
逆方向は一般に成り立たない。平均二乗収束と概収束の間の包含関係はない。

<!-- CARD -->

---
id: asym-wlln
title: 大数の弱法則（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: weak-law-of-large-numbers
type: theorem
difficulty: 2
priority: A
hashtags: [大数の弱法則, 標本平均, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---

## 問題
独立同分布標本に対する大数の弱法則を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X_i\overset{\mathrm{i.i.d.}}{\sim}P$、$E[X_i]=\mu\in\mathbb R$ なら $\overline X_n\xrightarrow{p}\mu$。

## 答え
有限な平均を持つ独立同分布標本では、標本平均が真の平均へ確率収束する。

## 計算例
コイン投げ $X_i\in\{0,1\}$、$P(X_i=1)=p$ のとき $\overline X_n\xrightarrow{p}p$。

## 注意
弱法則は確率収束を主張し、収束速度は与えない。

<!-- CARD -->

---
id: asym-slln
title: 大数の強法則（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: strong-law-of-large-numbers
type: theorem
difficulty: 3
priority: A
hashtags: [大数の強法則, 標本平均, 概収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の強法則 }]
---

## 問題
独立同分布標本に対する大数の強法則を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[|X_i|]<\infty$、$E[X_i]=\mu$ なら $\overline X_n\xrightarrow{a.s.}\mu$。

## 答え
1乗可積分な平均を持つ独立同分布標本では、標本平均が真の平均へほとんど確実に収束する。

## 計算例
コイン投げで $n\to\infty$ に伴い表の出る割合は、確率1で $p$ へ収束する。

## 注意
強法則は弱法則より強い含意を与える。

<!-- CARD -->

---
id: asym-clt
title: 中心極限定理（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: central-limit-theorem
type: theorem
difficulty: 3
priority: S
hashtags: [中心極限定理, 正規分布（ガウス分布）, 分布収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---

## 問題
独立同分布標本に対する中心極限定理を述べよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[X_i]=\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ なら $\dfrac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1)$。

## 答え
有限な分散を持つ独立同分布標本の標準化標本平均は、標準正規分布へ分布収束する。

## 計算例
$X_i$ がベルヌーイ分布 $\operatorname{Bernoulli}(p)$ なら $E[X_i]=p$、$\operatorname{Var}(X_i)=p(1-p)$。$\sqrt n(\overline X_n-p)/\sqrt{p(1-p)}\xrightarrow{d}N(0,1)$。

## 注意
収束の種類は分布収束。標本サイズが十分大きいときの近似に使う。

<!-- CARD -->

---
id: asym-slutsky
title: Slutskyの定理で未知量を一致推定量へ置き換え標準化する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - Slutskyの定理
  - 分布収束
  - 確率収束
  - 標準化
  - 漸近理論
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 収束の概念
---

## 問題
Slutsky（スルツキー）の定理について次を答えよ。
1. $X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$ のとき、和・積・商の極限を述べよ。
2. $X_n$ が正規分布 $N(0,4)$ へ分布収束し、$Y_n\xrightarrow{p}2$ のとき $X_n/Y_n$ の極限分布を求めよ。
3. 独立同分布標本で、$\sqrt n(\overline X_n-\mu)/\sigma$ が標準正規分布 $N(0,1)$ へ分布収束し、$S_n^2\xrightarrow{p}\sigma^2$、$\sigma>0$ とする。$(\overline X_n-\mu)/(S_n/\sqrt n)$ の極限分布を示せ。

## 記号・用語
$\xrightarrow{d}$ は分布収束、$\xrightarrow{p}$ は確率収束。Slutskyの定理は、主要な確率変数に掛かる・足される量が定数へ確率収束するとき、その量を漸近的に定数へ置き換えられることをいう。

## 使用公式・定理
$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$ なら
$$X_n+Y_n\xrightarrow{d}X+c,\qquad X_nY_n\xrightarrow{d}cX.$$
$c\ne0$ なら
$$\frac{X_n}{Y_n}\xrightarrow{d}\frac Xc.$$
また $S_n^2\xrightarrow{p}\sigma^2$、$\sigma>0$ なら連続写像定理により $S_n/\sigma\xrightarrow{p}1$。

## 一手／方針
分布収束する「主役」と、定数へ確率収束する「置換量」に分ける。未知標準偏差の置換では $S_n/\sigma\to_p1$ を作る。

## 答え
1. 和・積は上式、商は $c\ne0$ のとき $X/c$ へ分布収束する。
2. $X\sim N(0,4)$ を2で割るので $X/2\sim N(0,1)$、したがって標準正規分布へ収束する。
3. $Z_n=\sqrt n(\overline X_n-\mu)/\sigma\to_dN(0,1)$、$S_n/\sigma\to_p1$ だから
$$\frac{\overline X_n-\mu}{S_n/\sqrt n}=\frac{Z_n}{S_n/\sigma}\xrightarrow{d}N(0,1).$$

## 計算例
$X_n\to_dN(0,4)$、$Y_n\to_p2$ なら、分散は $4/2^2=1$ となり $X_n/Y_n\to_dN(0,1)$。

## 注意
商では分母の極限が0でないことが必要。有限標本で推定標準偏差へ置換した統計量が厳密に同じ分布になることを主張する定理ではない。

<!-- CARD -->

---
id: asym-continuous-mapping
title: 連続写像定理で変換後の収束とプラグイン推定量の一致性を示す
category: math-estimation
subcategory: math-asymptotic-estimation
topic: continuous-mapping-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 連続写像定理
  - 分布収束
  - 確率収束
  - 一致性
  - プラグイン法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 収束の概念
---

## 問題
1. $X_n\to_dX$ と $X_n\to_p\theta$ のそれぞれについて、連続関数 $g$ を作用させた結論を述べよ。
2. $Z_n$ が標準正規分布 $N(0,1)$ へ分布収束するとき $Z_n^2$ の極限分布を求めよ。
3. $\widehat p\to_pp$、$0<p<1$ のとき、$\widehat p(1-\widehat p)$ が $p(1-p)$ の一致推定量であることを示せ。

## 記号・用語
プラグイン法は、未知母数の関数 $g(\theta)$ を $g(\widehat\theta)$ で推定する考え方である。

## 使用公式・定理
$g$ が極限値で連続なら
$$X_n\xrightarrow{d}X\Rightarrow g(X_n)\xrightarrow{d}g(X),$$
$$X_n\xrightarrow{p}\theta\Rightarrow g(X_n)\xrightarrow{p}g(\theta).$$

## 一手／方針
元の推定量の収束を確認し、次に変換 $g$ が極限値で連続か確認する。

## 答え
1. 分布収束・確率収束とも連続関数を通して保存される。
2. $g(z)=z^2$ は連続なので $Z_n^2\to_d\chi_1^2$。
3. $g(x)=x(1-x)$ は連続なので $\widehat p(1-\widehat p)\to_pp(1-p)$。

## 計算例
$\widehat p=0.36,n=400$ なら $\widehat p(1-\widehat p)=0.2304$、標本比率の推定標準誤差は
$$\sqrt{0.2304/400}=0.024.$$

## 注意
連続写像定理だけでは収束速度や漸近分散は与えない。変換後の $\sqrt n$ 尺度の極限にはデルタ法などを使う。

<!-- CARD -->

---
id: asym-delta-method
title: デルタ法で漸近分布を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method
type: formula
difficulty: 3
priority: A
hashtags: [デルタ法, 漸近分布, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\sqrt n(T_n-\theta)$ が正規分布（ガウス分布） $N(0,\sigma^2)$ へ分布収束するとし、微分可能な $g$ に対し $g(T_n)$ の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

1次のTaylor展開より、$T_n\xrightarrow{p}\theta$ の下で
$$g(T_n)-g(\theta)=g'(\theta)(T_n-\theta)+o_p(|T_n-\theta|).$$
$T_n-\theta=O_p(n^{-1/2})$ なので両辺に $\sqrt n$ を掛けると
$$\sqrt n\{g(T_n)-g(\theta)\}
=g'(\theta)\sqrt n(T_n-\theta)+o_p(1).$$
右辺にSlutskyの定理を適用して
$$\sqrt n(g(T_n)-g(\theta))\xrightarrow{d}N(0,\{g'(\theta)\}^2\sigma^2).$$

## 答え
導関数 $g'(\theta)$ を漸近分散に掛けて $\{g'(\theta)\}^2\sigma^2$ にする。

## 計算例
$T_n=\overline X_n$、$\theta=\mu$、$g(x)=e^x$ なら $\sqrt n(e^{\overline X_n}-e^\mu)\xrightarrow{d}N(0,e^{2\mu}\sigma^2)$（$\sigma^2=\operatorname{Var}(X_i)$）。

## 注意
$g'(\theta)=0$ のとき $\sqrt n$ 尺度では0への退化極限となる。非退化な極限を得るには第2次デルタ法を検討する。

<!-- CARD -->

---
id: asym-sample-proportion-normality
title: 標本比率の漸近正規性を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-proportion-asymptotic
type: calc_step
difficulty: 2
priority: S
hashtags: [標本比率, 中心極限定理, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---

## 問題
成功確率 $p$ の独立同分布ベルヌーイ標本で、標本比率 $\widehat p$ の近似標準誤差を $n=400$、$p=0.3$ で求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\frac{\sqrt n(\widehat p-p)}{\sqrt{p(1-p)}}\xrightarrow{d}N(0,1),$$
したがって大標本では $\widehat p\mathrel{\dot\sim}N(p,p(1-p)/n)$、標準誤差は $\sqrt{p(1-p)/n}$。

## 答え
中心極限定理より $\widehat p\approx N(p,p(1-p)/n)$ として、標準誤差を出す。

## 計算例
$\sqrt{0.3\times0.7/400}=\sqrt{0.21/400}=\sqrt{0.000525}\approx0.0229$。

## 注意
$np$、$n(1-p)$ がともに5以上程度あることが目安。

<!-- CARD -->

---
id: asym-mle-consistency
title: 最尤推定量の一致性を確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-consistency
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, 一致性, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---

## 問題
最尤推定量が一致性（確率収束）を持つ条件を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

代表的なargmax条件は、(1) 識別可能性により期待対数尤度が真値 $\theta_0$ で一意に最大、(2) $n^{-1}\ell_n(\theta)$ が期待対数尤度へ母数について一様収束、(3) 母数空間がコンパクト、または遠方での最大化を防ぐ外側制御があること、である。通常は $\theta_0$ が内部点であることも仮定する。

## 答え
期待対数尤度の一意最大性と標本対数尤度の一様収束により、標本対数尤度の最大点が真値へ近づく。点ごとの大数の法則だけでは、移動する最大点の収束は保証できない。

## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ では最尤推定量は $\widehat p=\overline X$ である。$E[\widehat p]=p$、$\operatorname{Var}(\widehat p)=p(1-p)/n$ だから、任意の $\varepsilon>0$ に対して
$$P_p(|\widehat p-p|>\varepsilon)
\le\frac{p(1-p)}{n\varepsilon^2}
\le\frac1{4n\varepsilon^2}\longrightarrow0.$$
例えば $n=400,\varepsilon=0.1$ なら上界は
$$\frac1{4\cdot400\cdot0.1^2}=0.0625.$$
よって $\widehat p\xrightarrow{p}p$ である。

## 注意
境界解などの非正則な場合は一致性が崩れることがある。

<!-- CARD -->

---
id: asym-mle-asymptotic-normality
title: 最尤推定量の漸近正規性を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-asymptotic-normality
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, 漸近正規性, フィッシャー情報量（1次元）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
正則条件の下での最尤推定量の漸近分布を述べよ。

## 記号・用語
- フィッシャー情報量（1次元）：スコアの分散。正則条件下では対数尤度の負の2階微分の期待値に等しい
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

スコア方程式 $U_n(\widehat\theta)=0$ を真値 $\theta_0$ の周りでTaylor展開すると
$$0=U_n(\theta_0)+U_n'(\widetilde\theta)(\widehat\theta-\theta_0),$$
したがって
$$\sqrt n(\widehat\theta-\theta_0)
=\left\{-\frac1nU_n'(\widetilde\theta)\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}.$$
正則条件の下で
$$-\frac1nU_n'(\widetilde\theta)\xrightarrow{p}I_1(\theta_0),\qquad
\frac{U_n(\theta_0)}{\sqrt n}\xrightarrow{d}N(0,I_1(\theta_0)).$$
よってSlutskyの定理から
$$\sqrt n(\widehat\theta-\theta_0)\xrightarrow{d}N(0,I_1(\theta_0)^{-1}).$$

## 答え
標準化した最尤推定量は標準正規分布へ分布収束し、漸近分散は1観測当たりのフィッシャー情報量（1次元）の逆数になる。

## 計算例
ベルヌーイ1観測の対数尤度は
$$\ell_1(p;X)=X\log p+(1-X)\log(1-p).$$
したがって
$$\ell_1''(p)=-\frac X{p^2}-\frac{1-X}{(1-p)^2}.$$
$E_p[X]=p$ を使うと
$$I_1(p)=-E_p[\ell_1''(p)]
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.$$
よって正則条件の下で
$$\sqrt n(\widehat p-p)
\xrightarrow{d}N\left(0,I_1(p)^{-1}\right)
=N(0,p(1-p)).$$
$p=0.4,n=100$ なら $\widehat p$ の漸近標準誤差は
$$\sqrt{\frac{0.4(0.6)}{100}}\approx0.0490.$$

## 注意
偏差スコアの期待値0とフィッシャー情報量（1次元）の加法性を用いる。

<!-- CARD -->

---
id: asym-asymptotic-variance-se
title: 漸近分散と漸近標準誤差を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: asymptotic-variance
type: formula
difficulty: 2
priority: S
hashtags: [漸近分散, 標準誤差, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---

## 問題
推定量 $T_n$ の漸近分散と漸近標準誤差を定義せよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

漸近分散 $=v$、漸近標準誤差 $=\sqrt{v/n}$（$v$ を $\widehat v$ で置換）。

## 答え
$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,v)$ のとき $v$ を $\sqrt n(T_n-\theta)$ の漸近分散と呼ぶ。したがって $T_n$ の分散は大標本で $v/n$、漸近標準誤差は $\sqrt{v/n}$ と近似する。

## 計算例
$\sqrt n(\overline X_n-\mu)\xrightarrow{d}N(0,\sigma^2)$ だから、$\overline X_n$ 自身の漸近標準誤差は $\sigma/\sqrt n$。$\sigma^2=4,n=100$ なら
$$\operatorname{ASE}(\overline X_n)=\frac2{10}=0.2.$$
$\sigma$ は未知なので、例えば観測された不偏分散が $S^2=4.41$ なら $S=2.1$ を代入して
$$\widehat{\operatorname{ASE}}(\overline X_n)
=\frac{S}{\sqrt n}=\frac{2.1}{10}=0.21.$$

## 注意
標本分散そのものではなく $1/\sqrt n$ のオーダーである。

<!-- CARD -->

---
id: asym-asymptotic-relative-efficiency
title: クラーメル・ラオの不等式から漸近効率と漸近相対効率を整理する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: cramer-rao-asymptotic-efficiency
type: formula
difficulty: 3
priority: A
hashtags:
  - クラーメル・ラオの不等式
  - フィッシャー情報量（1次元）
  - 漸近効率
  - 漸近相対効率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近理論
---

## 問題
正則な1母数モデルで1観測当たりのフィッシャー情報量（1次元）を $I_1(\theta)$ とする。

1. $E_\theta[T_n]=\theta$ を満たす不偏推定量に対するクラーメル・ラオの不等式を書け。
2. 正則な最尤推定量の漸近分布と、フィッシャー情報量（1次元）との関係を述べよ。
3. 二つの漸近正規推定量 $T_n,U_n$ の漸近相対効率を定義せよ。

数値例として
$$
\operatorname{AVar}(\sqrt n\,T_n)=4,
\qquad
\operatorname{AVar}(\sqrt n\,U_n)=9
$$
のとき $T_n$ の $U_n$ に対する漸近相対効率を求めよ。

## 記号・用語
- ARE：漸近相対効率（asymptotic relative efficiency）

## 使用公式・定理
独立同分布標本では標本全体の情報量は
$$
I_n(\theta)=nI_1(\theta).
$$
クラーメル・ラオの不等式より、正則条件の下で不偏推定量 $T_n$ は
$$
\operatorname{Var}_\theta(T_n)
\ge \frac{1}{I_n(\theta)}
=\frac{1}{nI_1(\theta)}.
$$

また正則な最尤推定量は通常
$$
\sqrt n(\widehat\theta_{\mathrm{ML}}-\theta)
\xrightarrow{d}
N\left(0,I_1(\theta)^{-1}\right)
$$
を満たし、有限標本の不偏性とは別概念だが、漸近分散が情報下界に対応する。

漸近正規推定量について
$$
\sqrt n(T_n-\theta)\xrightarrow{d}N(0,v_T),
\qquad
\sqrt n(U_n-\theta)\xrightarrow{d}N(0,v_U)
$$
なら、ここでは
$$
\operatorname{ARE}(T,U)=\frac{v_U}{v_T}
$$
と定義する。

## 一手
**有限標本では分散を $1/I_n$ と比較し、漸近理論では $\sqrt n$ 倍した推定誤差の極限分散を $I_1^{-1}$ と比較する。** その上で二つの極限分散の比を取れば漸近相対効率になる。

## 答え
不偏推定量には
$$
\operatorname{Var}(T_n)\ge\frac{1}{nI_1(\theta)}.
$$
正則な最尤推定量は
$$
\sqrt n(\widehat\theta_{\mathrm{ML}}-\theta)
\xrightarrow{d}N(0,I_1(\theta)^{-1})
$$
となるのが基本である。

数値例では
$$
\operatorname{ARE}(T,U)=\frac94=2.25.
$$
したがって同じ標本サイズなら $T_n$ の方が小さい極限分散を持つ。

## 計算例
例えば $I_1(\theta)=1/4$ なら、$n=100$ に対するクラーメル・ラオの分散下界は
$$
\frac{1}{100(1/4)}=0.04.
$$
一方、漸近分布の尺度では
$$
I_1(\theta)^{-1}=4
$$
なので
$$
\sqrt n(\widehat\theta-\theta)
$$
の極限分散4と、$\widehat\theta$ 自身の漸近分散 $4/n$ を混同しない。

また $v_T=4,v_U=9$ なら
$$
\operatorname{ARE}(T,U)=\frac{9}{4}=2.25.
$$
これは $T_n$ の極限分散が $U_n$ の $4/9$ であることを表す。

## 注意
クラーメル・ラオの不等式は有限標本の不偏推定量に対する正則条件付き下界であり、最尤推定量の漸近効率とは同一の主張ではない。漸近相対効率は文献によって比の向きが逆の場合があるため定義を確認する。

<!-- CARD -->

---
id: asym-order-notation
title: オーダー記号 Op・op を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: order-notation
type: formula
difficulty: 2
priority: A
hashtags: [オーダー記号, 確率収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---

## 問題
確率論的オーダー記号 $O_p$、$o_p$ を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X_n=O_p(a_n)$ とは、任意の $\varepsilon>0$ に対して、ある $M>0$ と $N$ が存在し、すべての $n\ge N$ で $P(|X_n/a_n|>M)<\varepsilon$ となること。$X_n=o_p(a_n)$ とは $X_n/a_n\xrightarrow{p}0$ となることであり、特に $X_n=o_p(1)\iff X_n\xrightarrow{p}0$。

## 答え
確率的有界 $O_p$ と、確率収束して0になる $o_p$ を定義する。

## 計算例
$\overline X_n-\mu=O_p(n^{-1/2})$、$\sqrt n(\overline X_n-\mu)=O_p(1)$。また $E|X_i|^3<\infty$ なら、$m_3=E[(X_i-\mu)^3]$ として $n^{-1}\sum_{i=1}^n(X_i-\mu)^3-m_3=o_p(1)$。

## 注意
$O_p$ は確率的有界、$o_p$ は確率収束して0。

<!-- CARD -->

---
id: asym-prob-conv-chebyshev
title: チェビシェフの不等式で確率収束を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: chebyshev-convergence
type: calc_step
difficulty: 2
priority: S
hashtags: [チェビシェフの不等式, 確率収束, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$E[X_n]=\theta$、$\operatorname{Var}(X_n)=1/n$ とする。$P(|X_n-\theta|>0.1)$ の上界を $n=100$ で求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$P(|X_n-\theta|>\varepsilon)\le\frac{\operatorname{Var}(X_n)}{\varepsilon^2}.$$

## 答え
Chebyshev（チェビシェフ）不等式で分散を $\varepsilon^2$ で割る。

## 計算例
$(1/100)/(0.1)^2=0.01/0.01=1$。$n=400$ なら $0.0025/0.01=0.25$。$n\to\infty$ で0へ。

## 注意
これは上界であり確率そのものではない。

<!-- CARD -->

---
id: asym-as-conv-prob
title: 概収束が確率収束を含意することを確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: as-implies-p
type: proof_step
difficulty: 3
priority: A
hashtags: [概収束, 確率収束, 含意]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n\xrightarrow{a.s.}\theta$ なら $X_n\xrightarrow{p}\theta$ となることを示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E_\varepsilon=\{|X_n-\theta|>\varepsilon\}$、$A=\{\lim_{k\to\infty}X_k=\theta\}$ とおくと $P(A)=1$ より $P(E_\varepsilon)\to0$。

## 答え
ほとんど確実に収束する集合を用い、任意の $\varepsilon$ について確率が0へ行くことを示す。

## 計算例
$A=\{\lim_{k\to\infty}X_k=\theta\}$ とおくと $P(A)=1$。$B_n=\bigcup_{k\ge n}\{|X_k-\theta|>\varepsilon\}$ は減少列で、その極限 $B$ は $A^c$ の部分集合である。よって $P(B)=0$ かつ上からの連続性により $P(B_n)\to0$。

## 注意
逆は一般に成り立たない。

<!-- CARD -->

---
id: asym-clt-binomial-normal
title: 二項分布を正規分布で近似する計算
category: math-estimation
subcategory: math-asymptotic-estimation
topic: binomial-normal-approx
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 二項分布, 連続修正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---

## 問題
$X$ は二項分布 $\operatorname{Binomial}(n=100,p=0.4)$ に従うとする。$P(X\le46)$ を正規近似（連続修正付き）で求めよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[X]=np=40$、$\operatorname{Var}(X)=np(1-p)=24$、標準偏差 $SE=\sqrt{24}\approx4.90$。

## 答え
中心極限定理で $X\approx N(np,np(1-p))$ とし、連続修正 $X\le46.5$ を標準化する。

## 計算例
$z=(46.5-40)/4.90\approx1.33$、標準正規の累積分布関数 $\Phi(1.33)\approx0.908$。

## 注意
離散への連続修正を忘れない。

<!-- CARD -->

---
id: asym-delta-method-sqrt
title: デルタ法で平方根変換の漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method-sqrt
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, 漸近分散, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\sqrt n(\overline X_n-\mu)$ が正規分布（ガウス分布） $N(0,\sigma^2)$ へ分布収束するとする。$g(x)=\sqrt x$ として $\sqrt{\overline X_n}$（$\mu>0$）の漸近分散を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\sqrt{\overline X_n}-\sqrt\mu)\xrightarrow{d}N\left(0,\frac{\sigma^2}{4\mu}\right).$$

## 答え
$g'(\mu)=1/(2\sqrt\mu)$ を漸近分散に掛ける。

## 計算例
$g(x)=\sqrt x$ だから
$$g'(\mu)=\frac1{2\sqrt\mu}.$$
$\sigma^2=4,\mu=9$ なら変換後の極限分散は
$$\{g'(9)\}^2\sigma^2
=\left(\frac16\right)^2 4
=\frac19.$$
したがって $\sqrt{\overline X_n}$ 自身の漸近分散は $1/(9n)$、漸近標準誤差は $1/(3\sqrt n)$ である。

## 注意
$\mu>0$ が必要（平方根の定義域）。

<!-- CARD -->

---
id: asym-mle-av-normal
title: 最尤推定量の漸近分散を情報量から出す（正規平均）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-normal
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定, フィッシャー情報量（1次元）, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
正規分布 $N(\mu,\sigma^2)$（$\sigma^2$ 既知）の平均の最尤推定量 $\overline X_n$ の漸近分散を情報量から求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$I_1(\mu)=\frac1{\sigma^2},\qquad \operatorname{AVar}(\sqrt n\,\overline X_n)=\sigma^2,\qquad \operatorname{AVar}(\overline X_n)=\frac{\sigma^2}{n}.$$

## 答え
1観測当たりの情報量の逆数を標本サイズで割る。

## 計算例
1観測 $X\sim N(\mu,\sigma^2)$ の対数尤度は
$$\ell_1(\mu;X)=C-\frac{(X-\mu)^2}{2\sigma^2}.$$
よって
$$\ell_1'(\mu)=\frac{X-\mu}{\sigma^2},
\qquad \ell_1''(\mu)=-\frac1{\sigma^2},$$
したがって
$$I_1(\mu)=-E_\mu[\ell_1''(\mu)]=\frac1{\sigma^2}.$$
$\sigma^2=9$ なら
$$\operatorname{Avar}(\overline X_n)
=\frac1{nI_1(\mu)}=\frac9n,$$
漸近標準誤差は $3/\sqrt n$ である。

## 注意
正規母集団では正確にもこの分散になる。

<!-- CARD -->

---
id: asym-are-median-mean
title: 漸近相対効率（標本中央値／平均）を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: are-median-mean
type: calc_step
difficulty: 3
priority: A
hashtags: [漸近相対効率, 有効性, 標本中央値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---

## 問題
正規母集団で、標本平均と標本中央値の漸近相対効率を求めよ。

## 記号・用語
- ARE：漸近相対効率（asymptotic relative efficiency）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{AVar}(\sqrt n\,\overline X)=\sigma^2$、$\operatorname{AVar}(\sqrt n\,\widetilde X)=\pi\sigma^2/2$。

## 答え
極限分散の逆数比を取る。標本中央値の極限分散は $\pi\sigma^2/(2n)$。

## 計算例
$\operatorname{ARE}(\widetilde X,\overline X)=\sigma^2/(\pi\sigma^2/2)=2/\pi\approx0.637$。

## 注意
正規では平均がより効率的。裾が重い分布では逆転しうる。

<!-- CARD -->

---
id: asym-second-order-delta-square
title: 1階微分が0のとき2次デルタ法で極限分布を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: second-order-delta-method
type: calc_step
difficulty: 4
priority: A
hashtags: [2次デルタ法, カイ二乗分布, 標本平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$ の独立同分布標本について、$n(\overline X-\mu)^2$ の極限分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

中心極限定理から
$$\sqrt n(\overline X-\mu)\xrightarrow{d}Z,\qquad Z\sim N(0,\sigma^2).$$
連続写像定理で両辺を2乗する。また $Z/\sigma\sim N(0,1)$ なので $(Z/\sigma)^2\sim\chi_1^2$ である。

## 一手
$g(x)=(x-\mu)^2$ は $g'(\mu)=0$ なので、通常の $\sqrt n$ デルタ法ではなく尺度 $n$ を疑う。

## 答え
$$n(\overline X-\mu)^2\xrightarrow{d}\sigma^2\chi_1^2.$$

## 計算例
$$n(\overline X-\mu)^2
=\{\sqrt n(\overline X-\mu)\}^2
\xrightarrow{d}Z^2
=\sigma^2\left(\frac Z\sigma\right)^2.$$
$\sigma^2=4$ なら極限分布は $4\chi_1^2$。したがって
$$P\{n(\overline X-\mu)^2>15.37\}
\to P(\chi_1^2>15.37/4)
\approx P(\chi_1^2>3.842)\approx0.05.$$

## 注意
1階デルタ法を形式的に使うと分散0の退化分布しか得られない。

<!-- CARD -->

---
id: asym-sample-variance-fourth-moment
title: 標本分散の漸近分布を4次モーメントと正規標本のカイ二乗分布から導く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-variance-asymptotic-canonical
type: strategy
difficulty: 4
priority: S
hashtags:
  - 標本分散
  - 4次中心モーメント
  - 漸近正規性
  - カイ二乗分布
  - Slutskyの定理
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近的性質
---

## 問題
独立同分布標本 $X_1,\ldots,X_n$ について、$E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2$、4次中心モーメント $\mu_4=E[(X_i-\mu)^4]<\infty$ とする。
$$
V_n=\frac1n\sum_{i=1}^n(X_i-\overline X)^2,
\qquad
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2
$$
とおく。次を解け。

1. $V_n$ の漸近分布を4次中心モーメントを使って導け。
2. $S^2$ も同じ漸近分布を持つことを説明せよ。
3. さらに母集団が正規分布 $N(\mu,\sigma^2)$ のとき、$(n-1)S^2/\sigma^2$ の厳密分布から同じ結論を別ルートで導け。
4. $\sigma^2=4,n=100$ のとき標本分散の漸近標準誤差を求めよ。また標本分散の観測値が9なら、正規分布を仮定したプラグイン標準誤差を求めよ。

## 記号・用語
$V_n$ は分母 $n$ の標本分散、$S^2$ は不偏標本分散である。有限標本では異なるが
$$
S^2=\frac{n}{n-1}V_n
$$
なので大標本の $\sqrt n$ 尺度では同じ漸近分布を持つ。

$\mu_4$ は4次中心モーメントである。正規分布では
$$
\mu_4=3\sigma^4.
$$

## 使用公式・定理
恒等式
$$
V_n
=\frac1n\sum_{i=1}^n(X_i-\mu)^2-(\overline X-\mu)^2
$$
を使う。

確率変数 $(X_i-\mu)^2$ の平均は $\sigma^2$、分散は
$$
\operatorname{Var}\{(X_i-\mu)^2\}
=\mu_4-\sigma^4.
$$
したがって中心極限定理より
$$
\sqrt n\left\{
\frac1n\sum_{i=1}^n(X_i-\mu)^2-\sigma^2
\right\}
\xrightarrow{d}
\text{正規分布 }N(0,\mu_4-\sigma^4).
$$
また $\overline X-\mu=O_p(n^{-1/2})$ なので
$$
\sqrt n(\overline X-\mu)^2=o_p(1).
$$

正規標本なら厳密に
$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$
自由度 $\nu\to\infty$ で
$$
\frac{\chi^2_\nu-\nu}{\sqrt{2\nu}}
\xrightarrow{d}\text{正規分布 }N(0,1).
$$

## 一手／方針
**一般分布では「真の平均からの平方和」に直して中心極限定理、正規分布ならカイ二乗分布から別解。** 2つのルートが正規分布で同じ $2\sigma^4$ に合流することを確認する。

## 答え
1. 恒等式より
$$
\sqrt n(V_n-\sigma^2)
=
\sqrt n\left\{
\frac1n\sum_{i=1}^n(X_i-\mu)^2-\sigma^2
\right\}
-\sqrt n(\overline X-\mu)^2.
$$
第1項は中心極限定理、第2項は $o_p(1)$ なので
$$
\boxed{
\sqrt n(V_n-\sigma^2)
\xrightarrow{d}
\text{正規分布 }N(0,\mu_4-\sigma^4)}.
$$

2.
$$
S^2=\frac{n}{n-1}V_n,
\qquad \frac{n}{n-1}\to1
$$
であり、$\sqrt n\{(n/(n-1))-1\}=O(n^{-1/2})\to0$ だから
$$
\boxed{
\sqrt n(S^2-\sigma^2)
\xrightarrow{d}
\text{正規分布 }N(0,\mu_4-\sigma^4)}.
$$

3. 正規分布では
$$
U_n=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$
よって
$$
\frac{U_n-(n-1)}{\sqrt{2(n-1)}}
=
\frac{\sqrt{n-1}(S^2-\sigma^2)}{\sqrt2\,\sigma^2}
\xrightarrow{d}\text{正規分布 }N(0,1).
$$
$\sqrt n/\sqrt{n-1}\to1$ とSlutskyの定理から
$$
\boxed{
\sqrt n(S^2-\sigma^2)
\xrightarrow{d}
\text{正規分布 }N(0,2\sigma^4)}.
$$
一般式でも正規分布では $\mu_4=3\sigma^4$ なので
$$
\mu_4-\sigma^4=2\sigma^4
$$
となり一致する。

4. $\sigma^2=4$ なら $\sigma^4=16$ なので
$$
\operatorname{ASE}(S^2)
\approx\sqrt{\frac{2\sigma^4}{n}}
=\sqrt{\frac{32}{100}}
\approx\boxed{0.5657}.
$$
観測された標本分散9を $\sigma^2$ にプラグインするなら $\widehat\sigma^4=9^2=81$ なので
$$
\widehat{\operatorname{ASE}}(S^2)
=\sqrt{\frac{2\cdot81}{100}}
\approx\boxed{1.273}.
$$

## 計算例
非正規分布では正規分布の $2\sigma^4$ を機械的に使わない。例えば $\sigma^2=2$、$\mu_4=20$ なら
$$
\mu_4-\sigma^4=20-4=16.
$$
$n=100$ では標本分散の漸近標準誤差は
$$
\sqrt{16/100}=0.4.
$$
一方、正規分布だと同じ $\sigma^2=2$ でも極限分散定数は $2\sigma^4=8$ となる。

## 注意
一般式には4次中心モーメントの有限性が必要であり、有限分散だけでは十分でない。正規標本のカイ二乗関係は厳密な有限標本結果だが、非正規分布では成立しない。また $V_n$ と $S^2$ は漸近的には同じでも有限標本では分母が異なるため、問題文の定義を確認する。

<!-- CARD -->

---
id: asym-exponential-sample-median
title: 標本分位点の漸近分散を一般式から指数分布の中央値まで求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-quantile-asymptotic-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - 標本分位点
  - 標本中央値
  - 漸近正規性
  - 経験分布
  - 逆関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近的性質
---

## 問題
独立同分布な連続標本について、母分布関数を $F$、密度を $f$ とする。$0<p<1$ に対し母 $p$ 分位点 $q_p$ が
$$
F(q_p)=p
$$
を満たし、$q_p$ の近傍で $F$ は微分可能、$f$ は連続かつ $f(q_p)>0$ とする。次を解け。

1. 標本 $p$ 分位点 $\widehat q_p$ の漸近分布を述べよ。
2. なぜ分散に $1/f(q_p)^2$ が現れるのか、経験分布 $F_n$ の揺らぎと逆関数の一次近似から説明せよ。
3. 率1の指数分布で標本中央値 $M_n$ の漸近分布を求め、$n=100$ の漸近標準誤差を計算せよ。
4. $M_{100}=0.80$ が観測されたとき、母中央値を中心とした標準化値を求めよ。

## 記号・用語
$\widehat q_p$ は経験分布 $F_n$ に基づく標本 $p$ 分位点である。標本中央値は $p=1/2$ の特別な場合である。

$\xrightarrow{d}$ は分布収束を表す。漸近分散定数 $v$ とは
$$
\sqrt n(T_n-\theta)\xrightarrow{d}\text{正規分布 }N(0,v)
$$
の $v$ をいうので、$T_n$ 自身の大標本分散はおよそ $v/n$ である。

## 使用公式・定理
標本分位点の漸近正規性は
$$
\sqrt n(\widehat q_p-q_p)
\xrightarrow{d}
\text{正規分布 }N\left(0,\frac{p(1-p)}{f(q_p)^2}\right).
$$

直観的には、$F_n(q_p)$ はベルヌーイ指標の平均なので
$$
\sqrt n\{F_n(q_p)-p\}
\xrightarrow{d}
\text{正規分布 }N(0,p(1-p)).
$$
また $F(q_p+h)\approx p+f(q_p)h$ より、逆関数の一次近似として
$$
\widehat q_p-q_p
\approx
-\frac{F_n(q_p)-p}{f(q_p)}.
$$
したがって分散は $1/f(q_p)^2$ 倍される。

## 一手／方針
**まず母分位点 $q_p$ を求め、その点での密度 $f(q_p)$ を評価して公式へ代入する。** 公式暗記だけでなく、経験分布の縦方向の揺らぎ $F_n(q_p)-p$ を、逆関数の傾き $1/f(q_p)$ で横方向の分位点誤差へ変換すると理解する。

## 答え
1.
$$
\boxed{
\sqrt n(\widehat q_p-q_p)
\xrightarrow{d}
\text{正規分布 }N\left(0,\frac{p(1-p)}{f(q_p)^2}\right)}.
$$
よって $\widehat q_p$ 自身の漸近分散は
$$
\frac{p(1-p)}{n f(q_p)^2}.
$$

2. $F_n(q_p)$ の $\sqrt n$ 尺度での分散定数は $p(1-p)$。一方、$F$ を逆に解いて分位点へ戻すときの局所的な傾きは $1/f(q_p)$ なので、分散にはその二乗 $1/f(q_p)^2$ が掛かる。

3. 率1の指数分布では
$$
F(x)=1-e^{-x},\qquad f(x)=e^{-x}\quad(x>0).
$$
母中央値 $m$ は
$$
1-e^{-m}=\frac12
\quad\Longrightarrow\quad
m=\log2.
$$
また
$$
f(m)=e^{-\log2}=\frac12.
$$
$p=1/2$ だから極限分散定数は
$$
\frac{(1/2)(1/2)}{(1/2)^2}=1.
$$
したがって
$$
\boxed{
\sqrt n(M_n-\log2)
\xrightarrow{d}\text{正規分布 }N(0,1)}.
$$
$n=100$ での漸近標準誤差は
$$
\boxed{1/\sqrt{100}=0.1}.
$$

4.
$$
z=\frac{0.80-\log2}{0.1}
\approx\boxed{1.07}.
$$

## 計算例
$p=0.25$、$f(q_{0.25})=0.4$ とする。このとき極限分散定数は
$$
\frac{0.25\cdot0.75}{0.4^2}
=\frac{0.1875}{0.16}
=1.171875.
$$
$n=200$ なら標本25%分位点の漸近標準誤差は
$$
\sqrt{\frac{1.171875}{200}}
\approx0.0765.
$$

## 注意
$f(q_p)>0$ が重要である。分位点付近の密度が小さいほど、経験分布の小さな縦揺れが大きな横方向の分位点誤差に変換される。裾の分位点や密度が非常に小さい領域では有限標本の正規近似が不安定になりやすい。また、ここで扱うのは固定した1つの $p$ に対する結果であり、分位点関数全体の一様収束とは別である。

<!-- CARD -->

---
id: asym-bernoulli-plugin-se
title: 標本比率の標準誤差へ一致推定量をプラグインする
category: math-estimation
subcategory: math-asymptotic-estimation
topic: plugin-standard-error-consistency
type: calc_step
difficulty: 2
priority: S
hashtags: [標本比率, プラグイン法, 標準誤差, Slutskyの定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近標準誤差 }]
---

## 問題
ベルヌーイ標本の標本比率を $\widehat p$ とする。未知の $p$ を含まない漸近標準誤差を作り、$n=400$、$\widehat p=0.36$ で計算せよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)),$$
かつ大数の法則により $\widehat p\xrightarrow{p}p$。連続写像定理から
$$\widehat p(1-\widehat p)\xrightarrow{p}p(1-p).$$
よってSlutskyの定理により
$$\frac{\widehat p-p}{\sqrt{\widehat p(1-\widehat p)/n}}
\xrightarrow{d}N(0,1).$$

## 一手
未知の漸近分散に一致推定量を代入し、Slutskyの定理で正当化する。

## 答え
$$\widehat{\operatorname{SE}}(\widehat p)
=\sqrt{\frac{\widehat p(1-\widehat p)}n}
=\sqrt{\frac{0.36\cdot0.64}{400}}=0.024.$$

## 計算例
$$\widehat p(1-\widehat p)=0.36(0.64)=0.2304,$$
$$\frac{0.2304}{400}=0.000576,\qquad
\sqrt{0.000576}=0.024.$$

## 注意
$n\widehat p$ または $n(1-\widehat p)$ が小さいと、正規近似の精度が悪い。

<!-- CARD -->

---
id: asym-uniform-moment-estimator
title: 一様分布のモーメント法推定量の漸近分布を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: uniform-moment-estimator-asymptotics
type: calc_step
difficulty: 3
priority: A
hashtags: [モーメント法, 一様分布, 中心極限定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近的性質 }]
---

## 問題
$X_1,\ldots,X_n$ は一様分布 $U(0,\theta)$ からの独立同分布標本である。モーメント法推定量 $\widetilde\theta=2\overline X$ の漸近分布を求め、$n=75$、$\overline x=3.1$ で漸近標準誤差を計算せよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一様分布 $U(0,\theta)$ では
$$E[X_i]=\frac\theta2,\qquad \operatorname{Var}(X_i)=\frac{\theta^2}{12}.$$
中心極限定理と定数倍の分散公式を使う。

## 一手
モーメント法の式を標本平均の線形変換として読み、中心極限定理をそのまま移す。

## 答え
$$\sqrt n(\widetilde\theta-\theta)
\xrightarrow{d}N\left(0,\frac{\theta^2}{3}\right).$$
$\widetilde\theta=6.2$ をプラグインすると
$$\widehat{\operatorname{SE}}(\widetilde\theta)
=\frac{\widetilde\theta}{\sqrt{3n}}
=\frac{6.2}{\sqrt{225}}\approx0.4133.$$

## 計算例
$$\sqrt n(2\overline X-\theta)
=2\sqrt n\left(\overline X-\frac\theta2\right).$$
右辺の極限分散は
$$2^2\frac{\theta^2}{12}=\frac{\theta^2}{3}.$$
推定量自体の漸近分散は $\theta^2/(3n)$ である。
$n=75,\overline x=3.1$ なら $\widetilde\theta=2\overline x=6.2$。未知の $\theta$ を $\widetilde\theta$ で置き換えて
$$\widehat{\operatorname{SE}}(\widetilde\theta)
=\sqrt{\frac{6.2^2}{3\cdot75}}
=\frac{6.2}{15}
\approx0.4133.$$

## 注意
最尤推定量 $X_{(n)}$ は異なる $n$ 尺度の非正規極限を持つため、同じ扱いをしない。
