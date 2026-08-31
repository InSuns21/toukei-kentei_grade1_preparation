---
id: mle-asymptotic-normality
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の漸近正規性
topic: mle-asymptotic
type: theorem
difficulty: 3
priority: S
hashtags:
  - 最尤推定
  - 漸近正規性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定
archive_reason: duplicate
canonical_card: asym-mle-asymptotic-normality
coverage_card: asym-mle-asymptotic-normality
archive_note: 漸近正規性の一般式、スコア方程式の真値周りTaylor展開、スコアのCLTと観測曲率の情報量収束から
  sqrt(n)(hat(theta)-theta_0) -> N(0,I_1(theta_0)^(-1)) を得る技能は
  asym-mle-asymptotic-normality がより詳細に正本化済み。旧カードのPoisson例で使う
  I_1(lambda)=1/lambda と近似分散 lambda/n は asym-mle-poisson-tail-probability
  が情報量導出から数値確率近似まで保持しているため、旧カード固有の技能は残らない。
---
## 問題
正則条件下で最尤推定量 $\widehat\theta_n$ の漸近分布を述べよ。$I_1(\theta)$ は1観測当たりのフィッシャー情報量（1次元）。
## 答え
$\sqrt n(\widehat\theta_n-\theta_0)\xrightarrow{d}N\left(0,\frac1{I_1(\theta_0)}\right).$
## 使用公式・定理
スコアの期待値0・分散 $I_n=nI_1$、中心極限定理より $n^{-1/2}U(\theta_0)\xrightarrow{d}N(0,I_1)$。また $-n^{-1}\ell''(\theta_0)\xrightarrow{p}I_1(\theta_0)$ である。スコア方程式を真値のまわりで一次展開して解くと上記を得る。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$ の1観測当たりの対数尤度は
$$\ell_1(\lambda)=X\log\lambda-\lambda-\log(X!),
\qquad \ell_1''(\lambda)=-\frac X{\lambda^2}.$$
$E_\lambda[X]=\lambda$ より
$$I_1(\lambda)=-E_\lambda[\ell_1''(\lambda)]
=\frac{E_\lambda[X]}{\lambda^2}=\frac1\lambda.$$
したがって
$$\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N\!\left(0,I_1(\lambda)^{-1}\right)=N(0,\lambda).$$
## 一手
漸近分散はフィッシャー情報量（1次元）の逆数 $1/I_1$。標準誤差は $1/\sqrt{nI_1}$。
