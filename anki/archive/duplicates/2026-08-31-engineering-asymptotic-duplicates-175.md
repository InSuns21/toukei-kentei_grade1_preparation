---
id: engasym-proportion-standardization
title: 標本比率を中心極限定理で標準化する
category: applied-engineering
subcategory: engineering-asymptotics
topic: clt-proportion
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 標本比率
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: asym-mle-asymptotic-normality
coverage_card: asym-mle-asymptotic-normality
archive_note: 一般側正本がベルヌーイのフィッシャー情報量を導出し、sqrt(n)(p_hat-p)→N(0,p(1-p))、p=0.4,n=100で標準誤差約0.0490まで含むため、標本比率CLT単独カードは完全重複。
---
## 問題
独立なベルヌーイ分布 $X_i\sim\operatorname{Bernoulli}(p)$ の標本比率 $\widehat p=\overline X$ を標準化し、極限分布を書け。
## 記号・用語
$0<p<1$ とし、$\widehat p$ は成功数を標本数で割った量である。
## 使用公式・定理
ベルヌーイ分布の平均は $p$、分散は $p(1-p)$。標本平均に中心極限定理を適用する。
## 一手／方針
標本平均の標準誤差 $\sqrt{p(1-p)/n}$ で中心化した差を割る。
## 答え
$$\frac{\widehat p-p}{\sqrt{p(1-p)/n}}\xrightarrow{d}N(0,1).$$
## 計算例
$p=0.2,n=100$ なら $\widehat p$ の近似標準誤差は0.04。
## 注意
Wald型の実用標準誤差では未知の $p$ を $\widehat p$ で置換する。

<!-- CARD -->

---
id: engasym-mle-asymptotic-normality
title: 最尤推定量の漸近正規性を公式として再生する
category: applied-engineering
subcategory: engineering-asymptotics
topic: mle-asymptotic-normality
type: recognition
difficulty: 2
priority: S
hashtags:
  - 最尤推定量の漸近正規性
  - フィッシャー情報量（1次元）
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: asym-mle-asymptotic-normality
coverage_card: asym-mle-asymptotic-normality
archive_note: 一般側正本がスコア方程式のTaylor展開、Slutskyの定理、情報量逆数の極限分散、ベルヌーイ数値例まで含み、理工学側の公式再生カードを包含する。
---
## 問題
1次元正則モデルにおける最尤推定量の漸近正規性を、1観測当たりフィッシャー情報量（1次元）で書け。
## 記号・用語
$I_1(\theta)$ は1観測当たりフィッシャー情報量（1次元）、$\theta_0$ は真値である。
## 使用公式・定理
正則性、一致性、識別可能性、$0<I_1(\theta_0)<\infty$ のもとで最尤推定量は漸近正規。
## 一手／方針
$\sqrt n$ 標準化と情報量の逆数を対応させる。
## 答え
$$\sqrt n(\widehat\theta_{\mathrm{ML}}-\theta_0)\xrightarrow{d}
N\left(0,I_1(\theta_0)^{-1}\right).$$
同値に $\widehat\theta_{\mathrm{ML}}\dot\sim N(\theta_0,\{nI_1(\theta_0)\}^{-1})$。
## 計算例
標準誤差は観測数を4倍にすると約半分になる。
## 注意
境界母数、非識別、混合モデルなどでは通常形が崩れ得る。

<!-- CARD -->

---
id: engasym-bernoulli-fisher-information
title: ベルヌーイ母数のフィッシャー情報量（1次元）を導く
category: applied-engineering
subcategory: engineering-asymptotics
topic: fisher-information
type: calc_step
difficulty: 3
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - ベルヌーイ分布
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: asym-mle-asymptotic-normality
coverage_card: asym-mle-asymptotic-normality
archive_note: 一般側正本の計算例でベルヌーイ対数尤度を2回微分し I_1(p)=1/[p(1-p)] を導出済み。p=0,1の境界注意も正則条件の注意に含まれる。
---
## 問題
$X\sim\operatorname{Bernoulli}(p)$、$0<p<1$ の1観測当たりフィッシャー情報量（1次元）を求めよ。
## 記号・用語
フィッシャー情報量（1次元）は $I_1(p)=-E[\partial^2\ell(p;X)/\partial p^2]$ で定義する。
## 使用公式・定理
$\ell=X\log p+(1-X)\log(1-p)$、$E[X]=p$。
## 一手／方針
対数尤度を2回微分して期待値を取る。
## 答え
$$\ell''(p)=-\frac X{p^2}-\frac{1-X}{(1-p)^2},$$
$$I_1(p)=\frac p{p^2}+\frac{1-p}{(1-p)^2}=\frac1{p(1-p)}.$$
## 計算例
標本比率自体の近似分散 $\operatorname{Avar}(\widehat p)$ は $I_1(p)^{-1}/n=p(1-p)/n$。
## 注意
$p=0,1$ は母数空間の境界で通常の正則性が成立しない。

<!-- CARD -->

---
id: engasym-poisson-mle-variance
title: ポアソン平均の最尤推定量の漸近分散を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: poisson-mle-asymptotic-variance
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 最尤推定量の漸近正規性
  - 漸近分散
  - ポアソン分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: asym-mle-poisson-tail-probability
coverage_card: asym-mle-poisson-tail-probability
archive_note: 一般側正本がポアソン分布の情報量 I_1(lambda)=1/lambda
  を対数尤度から導出し、Avar(lambda_hat)=lambda/n、lambda=4,n=100でSE=0.2、さらに確率近似まで扱うため上位互換。
---
## 問題
$X_i\overset{\mathrm{iid}}\sim\operatorname{Poisson}(\lambda)$ のとき、$\widehat\lambda=\overline X$ の漸近分散を求めよ。
## 記号・用語
$\lambda>0$ は1観測当たり平均件数である。
## 使用公式・定理
1観測当たりフィッシャー情報量（1次元）は $I_1(\lambda)=1/\lambda$。
## 一手／方針
最尤推定量の漸近分散 $I_1^{-1}/n$ へ代入する。
## 答え
$$\widehat\lambda\dot\sim N\left(\lambda,\frac\lambda n\right),$$
したがって推定量自体の近似分散 $\operatorname{Avar}(\widehat\lambda)$ は $\lambda/n$。
## 計算例
$n=100,\widehat\lambda=4$ なら推定標準誤差は $\sqrt{4/100}=0.2$。
## 注意
この例では標本平均の分散が厳密にも $\lambda/n$ である。

<!-- CARD -->

---
id: engasym-relative-efficiency
title: 漸近分散から相対効率を比較する
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-efficiency
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 漸近分散
  - 相対効率
  - 推定量比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近分散
archive_reason: duplicate
canonical_card: asym-asymptotic-relative-efficiency
coverage_card: asym-asymptotic-relative-efficiency
archive_note: 一般側正本がクラーメル・ラオ下界、最尤推定量の漸近効率、ARE(T,U)=v_U/v_T、v_T=4,v_U=9で2.25、比の向きの規約注意まで含むため完全重複。
---
## 問題
推定量AとBの漸近分散がそれぞれ $4/n$ と $6/n$ である。Bに対するAの漸近相対効率を求めよ。
## 記号・用語
Bに対するAの効率を、同精度に必要な標本数の比として $\operatorname{ARE}(A,B)=V_B/V_A$ と定義する。
## 使用公式・定理
漸近分散が $V_A/n,V_B/n$ なら $\operatorname{ARE}(A,B)=V_B/V_A$。
## 一手／方針
比較対象Bの分散定数をAの分散定数で割る。
## 答え
$$\operatorname{ARE}(A,B)=6/4=1.5.$$
Aの方が漸近的に効率的である。
## 計算例
Aの100標本と同程度の分散に、Bは約150標本を要する。
## 注意
相対効率の分子・分母の定義規約を明記する。
