---
id: asym-mle-exponential-rate-numeric
title: 指数分布の率の最尤推定量について漸近標準誤差を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-exponential-rate
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 最尤推定量の漸近正規性
  - 指数分布
  - 漸近標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: asym-exponential-rate-mle
archive_note: どちらも指数rate lambda の MLE=1/Xbar と ASE=lambda/sqrt(n)
  を得る。同じ結論をFisher情報量で再計算するカードを残さず、CLT→g(x)=1/x→Delta法で導出するcanonicalへ統合する。
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
1観測の対数尤度は
$$\ell_1(\lambda;x)=\log\lambda-\lambda x,$$
したがって
$$\ell_1'(\lambda)=\frac1\lambda-x,
\qquad \ell_1''(\lambda)=-\frac1{\lambda^2}.$$
よって
$$I_1(\lambda)=-E_\lambda[\ell_1''(\lambda)]=\frac1{\lambda^2}.$$
また標本対数尤度のスコア方程式は
$$\frac n\lambda-\sum_i x_i=0
\iff \widehat\lambda=\frac1{\overline x}=\frac1{0.5}=2.$$
$n=64$ なので
$$\widehat{\operatorname{Avar}}(\widehat\lambda)
=\frac1{64I_1(2)}=\frac4{64}=\frac1{16},$$
$$\widehat{\operatorname{SE}}(\widehat\lambda)
=\sqrt{\frac1{16}}=\frac14=0.25.$$

## 注意
ここでの $\lambda$ は率であり、平均は $1/\lambda$。

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
hashtags:
  - 最尤推定量
  - ポアソン分布
  - 漸近標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: asym-mle-poisson-tail-probability
archive_note: Poisson MLE=Xbar、I_1(lambda)=1/lambda、Avar=lambda/n
  まで完全に重複。canonical側はさらに標準化して尾確率を求めるため、1枚で同じmoveを最後まで動かせる。
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
1観測の対数尤度
$$\ell_1(\lambda;x)=x\log\lambda-\lambda-\log(x!)$$
を2回微分すると
$$\ell_1''(\lambda)=-\frac x{\lambda^2}.$$
したがって $E_\lambda[X]=\lambda$ より
$$I_1(\lambda)=-E_\lambda[\ell_1''(\lambda)]=\frac1\lambda.$$
標本対数尤度のスコア方程式から
$$\widehat\lambda=\overline x=4.41.$$
情報量へ最尤推定値を代入して
$$\widehat{\operatorname{SE}}(\widehat\lambda)
=\{100I_1(4.41)\}^{-1/2}
=\sqrt{\frac{4.41}{100}}=0.21.$$
参考に、帰無値 $\lambda_0=4$ からのずれを標準化すると
$$z=\frac{4.41-4}{\sqrt{4/100}}=\frac{0.41}{0.2}=2.05.$$
推定精度の表示ではプラグイン標準誤差 $0.21$ を用いる。

## 注意
検定で帰無仮説下の標準化を行う場合は、分母に帰無値 $\lambda_0$ を使う方式と区別する。
