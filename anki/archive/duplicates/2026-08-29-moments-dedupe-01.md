---
id: dist-poisson-moments
published: true
title: ポアソン分布の平均と分散を求める
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-moments
type: calc_step
difficulty: 1
priority: A
hashtags:
  - ポアソン分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン分布
archive_reason: duplicate
canonical_card: dist-poisson-moments-by-definition
archive_note: ポアソン平均・分散という分布固有の結論は同じ。PGFから階乗モーメントを得る技能は汎用 prob-pgf-moments
  で保持し、分布固有カードは級数からの導出をcanonicalにする。
---
## 問題
ポアソン分布 $X\sim\operatorname{Poisson}(\lambda)$ の平均と分散を答えよ。
## 答え
$$E[X]=\lambda,\qquad \operatorname{Var}(X)=\lambda.$$
## 使用公式・定理
確率母関数は $G_X(s)=\exp\{\lambda(s-1)\}$。したがって $G_X'(1)=E[X]$、$G_X''(1)=E[X(X-1)]$。
## 計算例
$$G_X'(s)=\lambda e^{\lambda(s-1)},
\qquad G_X''(s)=\lambda^2e^{\lambda(s-1)}.$$
ゆえに $E[X]=\lambda$、$E[X^2]=\lambda^2+\lambda$、分散は $\lambda$。
## 一手
ポアソン分布は平均と分散が同じという特徴を使う。
## 注意
同じ平均でも二項・超幾何では分散が一般に異なる。

<!-- CARD -->

---
id: dist-beta-moments
published: true
title: ベータ分布の平均と分散を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: beta-moments
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ベータ分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベータ分布
archive_reason: duplicate
canonical_card: dist-beta-moments-by-definition
archive_note: 平均・分散の公式提示を、B(a+r,b)/B(a,b)から実際に導出するカードへ統合する。公式自体は同一で、導出側の方が再生可能性が高い。
---
## 問題
ベータ分布 $X\sim\operatorname{Beta}(\alpha,\beta)$ の平均と分散を答え、$\alpha=2,\beta=3$ の値を計算せよ。
## 答え
$$E[X]=\frac\alpha{\alpha+\beta},$$
$$\operatorname{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.$$
$\alpha=2,\beta=3$ では平均 $2/5$、分散 $6/(25\times6)=1/25$。
## 使用公式・定理
Beta積分の漸化式
$$\frac{B(\alpha+1,\beta)}{B(\alpha,\beta)}=\frac{\alpha}{\alpha+\beta},\qquad
\frac{B(\alpha+2,\beta)}{B(\alpha,\beta)}
=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}$$
と $\operatorname{Var}(X)=E[X^2]-E[X]^2$ を使う。
## 計算例
一般に
$$E[X]=\frac{B(\alpha+1,\beta)}{B(\alpha,\beta)}=\frac{\alpha}{\alpha+\beta},$$
$$E[X^2]=\frac{B(\alpha+2,\beta)}{B(\alpha,\beta)}
=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}.$$ 
よって
$$\operatorname{Var}(X)=E[X^2]-E[X]^2
=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.$$ 
$\alpha=2,\beta=3$ では
$$E[X]=\frac25,\qquad \operatorname{Var}(X)=\frac{2\cdot3}{5^2\cdot6}=\frac1{25}.$$ 
## 一手
分母を $(\alpha+\beta)^2(\alpha+\beta+1)$ とまとめる。
## 注意
平均は $\alpha/(\alpha+\beta)$ であり、単純に $\alpha/\beta$ ではない。

<!-- CARD -->

---
id: dist-lognormal-moments
published: true
title: 対数正規分布の平均と分散を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: lognormal-moments
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 対数正規分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 対数正規分布
archive_reason: duplicate
canonical_card: dist-lognormal-moments-by-definition
archive_note: 対数正規の平均・分散公式だけのカードを、E[e^{rY}]を平方完成して導くカードへ統合する。公式暗記より導出を正本にする。
---
## 問題
正規分布 $Y\sim N(\mu,\sigma^2)$、$X=e^Y$ の平均と分散を答えよ。
## 答え
$$E[X]=e^{\mu+\sigma^2/2},$$
$$\operatorname{Var}(X)=(e^{\sigma^2}-1)e^{2\mu+\sigma^2},$$
## 使用公式・定理
正規分布のモーメント母関数（積率母関数） $M_Y(t)=e^{\mu t+\sigma^2t^2/2}$ を $t=1,2$ で使う。
## 計算例
$$E[X]=E[e^Y]=M_Y(1)=e^{\mu+\sigma^2/2},$$
$$E[X^2]=M_Y(2)=e^{2\mu+2\sigma^2}.$$
したがって
$$\operatorname{Var}(X)=E[X^2]-E[X]^2
=e^{2\mu+2\sigma^2}-e^{2\mu+\sigma^2}$$
$$=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).$$ 
## 一手
$X=e^Y$ なら $E[X^r]=M_Y(r)$ と置く。
## 注意
平均は単純に $e^\mu$ ではなく、分散パラメータの影響を受ける。

<!-- CARD -->

---
id: dist-binomial-moments
published: true
title: 二項分布の平均と分散を再生する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-moments
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 二項分布
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二項分布
archive_reason: duplicate
canonical_card: dist-binomial-bernoulli-sum
archive_note: どちらも二項変数を独立Bernoulli指示変数の和へ戻して平均np・分散np(1-p)を得る完全同一move。表現そのものを主題にした後者を残す。
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ の平均と分散を求めよ。
## 答え
$$E[X]=np,\qquad \operatorname{Var}(X)=np(1-p).$$
## 使用公式・定理
$X=I_1+\cdots+I_n$ と表し、$I_i\sim\operatorname{Bernoulli}(p)$ が独立であることを使う。
## 計算例
$$E[X]=\sum_{i=1}^nE[I_i]=np,$$
$$\operatorname{Var}(X)=\sum_{i=1}^n\operatorname{Var}(I_i)=np(1-p).$$
$n=10,p=0.3$ なら平均は3、分散は $10\times0.3\times0.7=2.1$ である。
## 一手
二項分布をベルヌーイ指示変数の和へ戻す。
## 注意
分散は $np^2(1-p)^2$ ではない。独立性があるから共分散項が消える。
