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
$E[X_n]=\theta$、$\operatorname{Var}(X_n)=\sigma_n^2$ なら $P(|X_n-\theta|>\varepsilon)\le\sigma_n^2/\varepsilon^2$。標本平均は $E[\overline X_n]=\mu$、$\operatorname{Var}(\overline X_n)=\sigma^2/n\to0$ なので $\overline X_n\xrightarrow{p}\mu$。

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
標準化値は $(4.3-4)/\sqrt{4/100}=1.5$ なので、上側確率は約 $0.0668$。

## 注意
$1/I_1(\theta)$ は $\sqrt n(\widehat\theta-\theta)$ の極限分散であり、$\widehat\theta$ 自身の分散は $1/[nI_1(\theta)]$。
<!-- CARD -->

---
id: asym-mle-exponential-rate-numeric
title: 指数分布の率の最尤推定量について漸近標準誤差を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-exponential-rate
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定量の漸近正規性, 指数分布, 漸近標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Exp}(\lambda)$、密度 $f(x)=\lambda e^{-\lambda x}$（$x>0$）とする。$n=64,\overline x=0.5$ のとき、$\widehat\lambda_{\mathrm{ML}}$ とその漸近標準誤差を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\widehat\theta_{\mathrm{ML}}\ \dot\sim\ N\left(\theta,\frac1{nI_1(\theta)}\right).$$

## 一手
未知母数を含む標準誤差は最尤推定値を代入して推定する。

## 答え
$$\widehat\lambda_{\mathrm{ML}}=\frac1{\overline x}=2.$$
$I_1(\lambda)=1/\lambda^2$ なので
$$\operatorname{Avar}(\widehat\lambda)=\frac1{nI_1(\lambda)}=\frac{\lambda^2}{n}.$$
$\lambda$ を $\widehat\lambda=2$ で置き換えると
$$\widehat{\operatorname{SE}}(\widehat\lambda)
=\frac{\widehat\lambda}{\sqrt n}=\frac2{8}=0.25.$$

## 計算例
$n=64$、$\widehat\lambda=2$ なら推定漸近分散は $2^2/64=1/16$、標準誤差は $1/4$。

## 注意
ここでの $\lambda$ は率であり、平均は $1/\lambda$。
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
1観測の対数密度について
$$\frac{\partial^2\ell}{\partial\tau^2}
=\frac1{2\tau^2}-\frac{(X-\mu)^2}{\tau^3}.$$
$E[(X-\mu)^2]=\tau$ より
$$I_1(\tau)=-E[\ell''(\tau;X)]=\frac1{2\tau^2}.$$
したがって
$$\sqrt n(\widehat\tau-\tau)\xrightarrow{d}N(0,2\tau^2),$$
すなわち $\widehat\tau\ \dot\sim\ N(\tau,2\tau^2/n)$。

## 計算例
$\tau=4,n=100$ なら漸近分散は $2\cdot16/100=0.32$、漸近標準誤差は $\sqrt{0.32}\approx0.566$。

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
$\lambda=2$、$n=100$ なら $\mu=1/2$ であり、$\widehat\mu$ の漸近標準誤差は $\mu/\sqrt n=0.05$。

## 注意
最尤推定量の不変性だけでは分散は出ない。分散計算にはデルタ法を使う。
<!-- CARD -->

---
id: asym-delta-bernoulli-odds
title: デルタ法でベルヌーイ確率のオッズの漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-odds
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, ベルヌーイ分布, オッズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\widehat p=\overline X$、$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とする。オッズ $g(p)=p/(1-p)$ の推定量 $g(\widehat p)$ の漸近分散を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

1次元デルタ法：極限分散を $V$ とすると、変換後は $\{g'(p)\}^2V$。

## 一手
$g'(p)$ を商の微分で求めてから二乗する。

## 答え
$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p)),$$
$$g'(p)=\frac1{(1-p)^2}.$$
したがって
$$\sqrt n\{g(\widehat p)-g(p)\}
\xrightarrow{d}N\left(0,\frac{p}{(1-p)^3}\right).$$
よって $g(\widehat p)$ 自身の漸近分散は $p/[n(1-p)^3]$。

## 計算例
$p=0.4,n=100$ なら漸近分散は $0.4/[100(0.6)^3]\approx0.01852$、漸近標準誤差は約 $0.1361$。

## 注意
$p$ が0または1に近いと微分が大きくなり、正規近似は不安定になる。
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
$p=0.36$、$n=100$ でも、変換後の漸近標準誤差は $\sqrt{1/(4n)}=0.05$ と $p$ に依存しない。

## 注意
$p=0,1$ では微分が発散するため、通常のデルタ法をそのまま適用できない。
<!-- CARD -->

---
id: asym-delta-two-sample-log-risk-ratio
title: 多変量デルタ法で二標本の対数リスク比の分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: multivariate-delta-risk-ratio
type: calc_step
difficulty: 4
priority: A
hashtags: [デルタ法, 二標本, リスク比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
独立な2群で $Y_1\sim\operatorname{Binomial}(n_1,p_1)$、$Y_2\sim\operatorname{Binomial}(n_2,p_2)$ とし、$\widehat p_j=Y_j/n_j$ とする。$\log(\widehat p_1/\widehat p_2)$ の漸近分散を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

多変量デルタ法の分散公式：
$$\operatorname{Avar}\{g(\widehat{\boldsymbol\theta})\}
\approx\nabla g(\boldsymbol\theta)^T
\operatorname{Cov}(\widehat{\boldsymbol\theta})
\nabla g(\boldsymbol\theta).$$

## 一手
独立二標本なら共分散行列が対角になり、2項の和になる。

## 答え
$g(p_1,p_2)=\log p_1-\log p_2$ だから
$$\nabla g=\begin{pmatrix}1/p_1\\-1/p_2\end{pmatrix}.$$
独立性から共分散は0であり、
$$\operatorname{Avar}(\widehat p_j)=\frac{p_j(1-p_j)}{n_j}.$$
よって
$$\operatorname{Avar}\left\{\log\frac{\widehat p_1}{\widehat p_2}\right\}
\approx
\frac{1-p_1}{n_1p_1}+\frac{1-p_2}{n_2p_2}.$$

## 計算例
$n_1=n_2=100$、$\widehat p_1=0.4$、$\widehat p_2=0.2$ を代入すると、推定分散は $0.6/40+0.8/20=0.055$、標準誤差は $\sqrt{0.055}\approx0.2345$。

## 注意
成功数が0なら対数を取れないため、この近似をそのまま使えない。
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
$\sigma=3,n=200$ なら $\widehat\sigma$ の漸近分散は $9/(2\cdot200)=0.0225$、漸近標準誤差は $0.15$。

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
id: asym-poisson-mle-numeric
title: ポアソン率の最尤推定量に漸近標準誤差を付ける
category: math-estimation
subcategory: math-asymptotic-estimation
topic: poisson-mle-asymptotic-se
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定量, ポアソン分布, 漸近標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近分布 }]
---

## 問題
$X_1,\ldots,X_{100}$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ からの独立同分布標本で、$\overline x=4.41$ だった。$\widehat\lambda$ とその漸近標準誤差を求めよ。

## 記号・用語
- SE：標準誤差（standard error）
- フィッシャー情報量（1次元）：スコアの分散。正則条件下では対数尤度の負の2階微分の期待値に等しい
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ポアソン分布の1観測当たりのフィッシャー情報量（1次元）は $I_1(\lambda)=1/\lambda$ なので
$$\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda),\qquad
\operatorname{Avar}(\widehat\lambda)=\frac{\lambda}{n}.$$
未知の $\lambda$ は一致推定量 $\widehat\lambda$ で置き換える。

## 一手
漸近分散 $I_n(\lambda)^{-1}$ を出し、未知母数を最尤推定量でプラグインする。

## 答え
$$\widehat\lambda=\overline x=4.41,\qquad
\widehat{\operatorname{SE}}(\widehat\lambda)
=\sqrt{\frac{\widehat\lambda}{n}}
=\sqrt{\frac{4.41}{100}}=0.21.$$

## 計算例
帰無値 $\lambda_0=4$ からのずれを漸近的に標準化すると
$$z=\frac{4.41-4}{\sqrt{4/100}}=\frac{0.41}{0.2}=2.05.$$
推定精度の表示ではプラグイン標準誤差 $0.21$ を用いる。

## 注意
検定で帰無仮説下の標準化を行う場合は、分母に帰無値 $\lambda_0$ を使う方式と区別する。
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
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近分布 }]
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
デルタ法の極限分散は
$$\{g'(1/\lambda)\}^2\frac1{\lambda^2}
=\lambda^4\frac1{\lambda^2}=\lambda^2.$$
したがって推定量自体の漸近分散は $\lambda^2/n$ となる。

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
title: 2標本平均の比に多変量デルタ法を使う
category: math-estimation
subcategory: math-asymptotic-estimation
topic: ratio-estimator-multivariate-delta
type: calc_step
difficulty: 4
priority: S
hashtags: [多変量デルタ法, 比推定量, 2標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
独立な2標本について、各標本サイズを $n$、母平均を $\mu_X,\mu_Y$、母分散を $\sigma_X^2,\sigma_Y^2$ とする。$\mu_Y\ne0$ のとき、$R=\overline X/\overline Y$ の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$g(x,y)=x/y$ の勾配は
$$\nabla g(\mu_X,\mu_Y)
=\left(\frac1{\mu_Y},-\frac{\mu_X}{\mu_Y^2}\right)^\top.$$
2標本は独立なので極限共分散行列は
$$\Sigma=\begin{pmatrix}\sigma_X^2&0\\0&\sigma_Y^2\end{pmatrix}.$$
多変量デルタ法では $V=\nabla g^\top\Sigma\nabla g$ となる。

## 一手
比の分母が確率変数なら、分子だけでなく分母方向の微分も含める。

## 答え
$$\sqrt n\left(R-\frac{\mu_X}{\mu_Y}\right)
\xrightarrow{d}N(0,V),$$
$$V=\frac{\sigma_X^2}{\mu_Y^2}
+\frac{\mu_X^2\sigma_Y^2}{\mu_Y^4}.$$

## 計算例
$\mu_X=4,\mu_Y=2,\sigma_X^2=4,\sigma_Y^2=1$ なら
$$V=\frac4{2^2}+\frac{4^2\cdot1}{2^4}=1+1=2.$$
$n=100$ では比推定量の漸近標準誤差は
$$\sqrt{\frac Vn}=\sqrt{\frac2{100}}\approx0.1414.$$

## 注意
$\mu_Y$ が0に近いと比の正規近似は不安定になる。
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
標準化標本平均 $Z_n=\sqrt n(\overline X_n-\mu)/\sigma$ は、正規分布 $N(0,1)$ へ分布収束する（$Z_n\xrightarrow{d}N(0,1)$）。

## 注意
分布収束は極限の分布の形だけをいい、確率変数同士の近さを要求しない。
<!-- CARD -->

---
id: asym-convergence-ms
title: 平均二乗収束の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-mean-square
type: formula
difficulty: 2
priority: A
hashtags: [平均二乗収束, 分散, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n\xrightarrow{qm}\theta$（平均二乗収束）の定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$E[(X_n-\theta)^2]\to0\quad(n\to\infty).$$

## 答え
ずれの2乗の期待値が0へ収束することをいう。

## 計算例
$\operatorname{Var}(X_n)\to0$ かつ $E[X_n]\to\theta$ なら $E[(X_n-\theta)^2]=\operatorname{Var}(X_n)+(E[X_n]-\theta)^2\to0$。

## 注意
平均二乗収束は確率収束を含意する。
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
title: Slutskyの定理を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky
type: theorem
difficulty: 3
priority: S
hashtags: [Slutskyの定理, 分布収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
Slutsky（スルツキー）の定理を述べよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$（定数）なら $X_n+Y_n\xrightarrow{d}X+c$、$X_nY_n\xrightarrow{d}cX$、$X_n/Y_n\xrightarrow{d}X/c\ (c\ne0)$。

## 答え
分布収束する列と、定数へ確率収束する列の和・積・商は、極限分布の対応する演算の分布へ収束する。

## 計算例
$Z_n\xrightarrow{d}N(0,1)$、$S_n^2\xrightarrow{p}\sigma^2>0$ なら $Z_n/(S_n/\sigma)=(\overline X_n-\mu)/(S_n/\sqrt n)\xrightarrow{d}N(0,1)$。

## 注意
$Y_n$ が定数でない確率変数へ確率収束する場合、積の極限は一般に成り立たない。
<!-- CARD -->

---
id: asym-continuous-mapping
title: 連続写像定理を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: continuous-mapping-theorem
type: theorem
difficulty: 2
priority: A
hashtags: [連続写像定理, 分布収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
連続写像定理（連続写像定理）を述べよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X_n\xrightarrow{d}X$ かつ $g$ が連続なら $g(X_n)\xrightarrow{d}g(X)$。

## 答え
分布収束する列に連続関数を施したものは、極限分布に同じ関数を施した分布へ収束する。

## 計算例
$Z_n\xrightarrow{d}N(0,1)$ なら $g(x)=x^2$ として $Z_n^2\xrightarrow{d}\chi^2_1$。

## 注意
多変量でも連続写像 $g$ について同じことが成り立つ。
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
$g'(\theta)=0$ のときは $\sqrt n$ の次数では収束せず、第2次デルタ法が必要になる。
<!-- CARD -->

---
id: asym-sample-mean-normality
title: 標本平均の漸近正規性を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-mean-asymptotic
type: calc_step
difficulty: 2
priority: S
hashtags: [標本平均, 中心極限定理, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---

## 問題
独立同分布標本 $X_i$ の平均 $\mu$、分散 $\sigma^2$ が既知とする。$\overline X_n$ の近似95%区間の半幅を $n=100$、$\sigma=4$ で求めよ。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1),$$
したがって大標本では $\overline X_n\mathrel{\dot\sim}N(\mu,\sigma^2/n)$、標準誤差は $SE=\sigma/\sqrt n$。

## 答え
中心極限定理より $\overline X_n\approx N(\mu,\sigma^2/n)$ として、標準誤差 $\sigma/\sqrt n$ に95%点を掛ける。

## 計算例
$SE=4/\sqrt{100}=0.4$。95%点 $z_{0.975}\approx1.96$ より半幅 $1.96\times0.4\approx0.784$。

## 注意
漸近近似なので標本サイズが十分大きいことが前提。
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

正則条件の下で最尤推定量 $\widehat\theta\xrightarrow{p}\theta_0$。

## 答え
識別可能性と正則性（尤度が真値で一意に最大、モデルが滑らか等）の下で、標本サイズ増大とともに真の母数へ確率収束する。

## 計算例
正規平均の最尤推定量 $\overline X_n$ は大数の弱法則から $\xrightarrow{p}\mu$。ベルヌーイの最尤推定量 $\widehat p$ も $\xrightarrow{p}p$。

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
$$-\frac1nU_n'(\widetilde\theta)\xrightarrow{p}I_1(\theta_0),qquad
\frac{U_n(\theta_0)}{\sqrt n}\xrightarrow{d}N(0,I_1(\theta_0)).$$
よってSlutskyの定理から
$$\sqrt n(\widehat\theta-\theta_0)\xrightarrow{d}N(0,I_1(\theta_0)^{-1}).$$

## 答え
標準化した最尤推定量は標準正規分布へ分布収束し、漸近分散は1観測当たりのフィッシャー情報量（1次元）の逆数になる。

## 計算例
ベルヌーイなら $I_1(p)=1/\{p(1-p)\}$ なので $\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p))$。

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
$\overline X_n$ に対し $v=\sigma^2$ なら漸近標準誤差 $\sigma/\sqrt n$；不偏分散 $S^2$ で $S/\sqrt n$。

## 注意
標本分散そのものではなく $1/\sqrt n$ のオーダーである。
<!-- CARD -->

---
id: asym-asymptotic-relative-efficiency
title: 漸近相対効率を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: asymptotic-relative-efficiency
type: formula
difficulty: 3
priority: A
hashtags: [漸近相対効率, 有効性, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---

## 問題
二つの漸近正規推定量 $T_n,U_n$ の漸近相対効率を定義せよ。

## 記号・用語
- ARE：漸近相対効率（asymptotic relative efficiency）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\operatorname{ARE}(T,U)=\frac{v_U}{v_T},\qquad v_T=\operatorname{AVar}(\sqrt n\,T_n),\ v_U=\operatorname{AVar}(\sqrt n\,U_n).$$

## 答え
極限分散の逆数の比として定義する。

## 計算例
正規母集団で $T_n=$ 標本中央値、$U_n=$ 標本平均とすると、$v_T=\pi\sigma^2/2$、$v_U=\sigma^2$ なので $\operatorname{ARE}(T,U)=2/\pi\approx0.637$。

## 注意
1より小さいほど相対的に情報量が少ない。
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
title: Chebyshev不等式で確率収束を計算する
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
id: asym-ms-conv-prob
title: 平均二乗収束が確率収束を含意することを確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: qm-implies-p
type: proof_step
difficulty: 2
priority: A
hashtags: [平均二乗収束, 確率収束, チェビシェフの不等式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$X_n\xrightarrow{qm}\theta$ なら $X_n\xrightarrow{p}\theta$ となることを示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$P(|X_n-\theta|>\varepsilon)\le\frac{E[(X_n-\theta)^2]}{\varepsilon^2}.$$

## 答え
Markov（Chebyshev）不等式を二乗平均に適用する。

## 計算例
$E[(X_n-\theta)^2]=1/n$ なら上界は $1/(n\varepsilon^2)\to0$。

## 注意
平均二乗収束の直接な含意である。
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
$\sigma^2=4$、$\mu=9$ なら漸近分散 $4/(4\cdot9)=1/9$、漸近標準誤差 $\sqrt{1/(9n)}=1/(3\sqrt n)$。

## 注意
$\mu>0$ が必要（平方根の定義域）。
<!-- CARD -->

---
id: asym-mle-av-binomial
title: 最尤推定量の漸近分散を情報量から出す（ベルヌーイ）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-binomial
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定, フィッシャー情報量（1次元）, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
ベルヌーイ標本の最尤推定量 $\widehat p$ の漸近分散をフィッシャー情報量（1次元）から求めよ。

## 記号・用語
- フィッシャー情報量（1次元）：スコアの分散。正則条件下では対数尤度の負の2階微分の期待値に等しい

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$I_1(p)=\frac1{p(1-p)},\qquad \operatorname{AVar}(\sqrt n\,\widehat p)=p(1-p),\qquad \operatorname{AVar}(\widehat p)=\frac{p(1-p)}{n}.$$

## 答え
漸近分散は1観測当たりの情報量の逆数を標本サイズで割ったもの。

## 計算例
$p=0.5$ なら $\operatorname{AVar}(\widehat p)=0.25/n$、漸近標準誤差 $0.5/\sqrt n$。

## 注意
標本比率の中心極限定理の分散と一致する。
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
$\sigma^2=9$ なら $\operatorname{AVar}(\overline X_n)=9/n$、漸近標準誤差 $3/\sqrt n$。

## 注意
正規母集団では正確にもこの分散になる。
<!-- CARD -->

---
id: asym-slutsky-example
title: Slutskyの定理でt統計量の漸近分布を出す
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky-example
type: calc_step
difficulty: 3
priority: A
hashtags: [Slutskyの定理, 分布収束, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---

## 問題
$\overline X_n$、$S_n^2$ が独立同分布標本から作られるとする。$(\overline X_n-\mu)/(S_n/\sqrt n)$ の漸近分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Z_n=\sqrt n(\overline X_n-\mu)/\sigma\xrightarrow{d}N(0,1)$、$S_n^2\xrightarrow{p}\sigma^2$ ゆえ $Z_n/(S_n/\sigma)\xrightarrow{d}N(0,1)$。

## 答え
分子の標準化を $N(0,1)$ へ、分母の $S_n/\sigma$ を1へ、Slutskyで割る。

## 計算例
$\sigma=2$、$S_n^2=4.1$ でも $n$ 大で $S_n^2/\sigma^2\to1$ なので極限は標準正規。

## 注意
正規性を仮定しない大標本のt統計量の根拠。
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
title: 標本分散の漸近分散を4次中心モーメントから求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-variance-asymptotic-normality
type: calc_step
difficulty: 4
priority: S
hashtags: [標本分散, 4次中心モーメント, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近的性質 }]
---

## 問題
$E[(X_i-\mu)^4]=\mu_4<\infty$ とし
$$V_n=\frac1n\sum_{i=1}^n(X_i-\overline X)^2$$
とする。$V_n$ の漸近分布を求め、正規分布で $\sigma^2=4,n=100$ の漸近標準誤差を計算せよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

恒等式
$$V_n=\frac1n\sum_{i=1}^n(X_i-\mu)^2-(\overline X-\mu)^2$$
を使う。第1項には確率変数 $(X_i-\mu)^2$ の中心極限定理を適用し、第2項は $O_p(n^{-1})$ なので $\sqrt n$ 尺度では消える。

## 一手
標本平均からの平方和を、真の平均からの平方和と平均誤差の2乗へ分解する。

## 答え
$$\sqrt n(V_n-\sigma^2)
\xrightarrow{d}N(0,\mu_4-\sigma^4).$$
正規分布では $\mu_4=3\sigma^4$ なので、漸近標準誤差は
$$\sqrt{\frac{2\sigma^4}{n}}
=\sqrt{\frac{2\cdot16}{100}}\approx0.5657.$$

## 計算例
$$\operatorname{Var}\{(X_i-\mu)^2\}
=E[(X_i-\mu)^4]-\{E[(X_i-\mu)^2]\}^2
=\mu_4-\sigma^4.$$
したがって第1項の $\sqrt n$ 極限分散が $\mu_4-\sigma^4$ となる。

## 注意
4次中心モーメントの有限性が必要であり、有限分散だけではこの結論は保証されない。
<!-- CARD -->

---
id: asym-exponential-sample-median
title: 指数分布の標本中央値の漸近分布を数値化する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-median-asymptotic-example
type: calc_step
difficulty: 3
priority: A
hashtags: [標本中央値, 指数分布, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近的性質 }]
---

## 問題
$X_1,\ldots,X_n$ は率1の指数分布からの独立同分布標本で、標本中央値を $M_n$ とする。$M_n$ の漸近分布を求め、$n=100$ での漸近標準誤差を計算せよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続分布の母中央値 $m$ で $f(m)>0$ なら
$$\sqrt n(M_n-m)
\xrightarrow{d}N\left(0,\frac1{4f(m)^2}\right).$$
率1の指数分布では $F(x)=1-e^{-x}$、$f(x)=e^{-x}$（$x>0$）。

## 一手
まず母中央値を $F(m)=1/2$ から求め、その点の密度を公式へ代入する。

## 答え
母中央値は $m=\log2$ であり
$$\sqrt n(M_n-\log2)\xrightarrow{d}N(0,1).$$
したがって $n=100$ での漸近標準誤差は $1/\sqrt{100}=0.1$。

## 計算例
中央値は
$$F(m)=\frac12
\Rightarrow1-e^{-m}=\frac12
\Rightarrow m=\log2.$$
さらに $f(m)=e^{-\log2}=1/2$ だから
$$\frac1{4f(m)^2}=\frac1{4(1/2)^2}=1.$$
$M_{100}=0.80$ なら標準化値は
$$\frac{0.80-\log2}{0.1}\approx1.07.$$

## 注意
中央値の漸近分散には母分散ではなく、中央値における密度 $f(m)$ が入る。
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

## 注意
最尤推定量 $X_{(n)}$ は異なる $n$ 尺度の非正規極限を持つため、同じ扱いをしない。
<!-- CARD -->
