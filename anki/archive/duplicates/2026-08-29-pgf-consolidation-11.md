---
id: prob-pgf-binomial
title: 二項分布の確率母関数を二項定理で導く
category: math-probability
subcategory: math-distribution-functions
topic: pgf-binomial
type: expansion
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - 二項分布
  - 二項定理
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-independent-sum
archive_note: 二項分布の確率母関数はベルヌーイ独立和の積から(1-p+ps)^nを得るcanonicalで構造的に導出できるため、二項定理だけの分布別カードは独立保持しない。
---
## 問題
$X$ は二項分布 $\operatorname{Binomial}(n,p)$ に従う。台は $0,\ldots,n$、確率質量関数は $P(X=k)=\binom nkp^k(1-p)^{n-k}$ である。$G_X(s)$ を求めよ。

## 答え
定義へ確率質量関数を代入し、二項定理でまとめる。

## 使用公式・定理
$$G_X(s)=\sum_{k=0}^nP(X=k)s^k,$$
$$\sum_{k=0}^n\binom nka^kb^{n-k}=(a+b)^n.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=0}^n\binom nkp^k(1-p)^{n-k}s^k\\&=\sum_{k=0}^n\binom nk(ps)^k(1-p)^{n-k}\\&=(1-p+ps)^n.\end{aligned}$$
$n=2,p=1/2$ なら $G_X(s)=(1+s)^2/4$ である。

## 一手
$p^ks^k$ を $(ps)^k$ にまとめると二項定理が見える。

## 注意
指数 $n$ を落とさない。

<!-- CARD -->

---
id: prob-pgf-geometric
title: 幾何分布の確率母関数を等比級数で求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-geometric
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - 幾何分布
  - 等比級数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-recover-pmf
archive_note: 強化済み確率母関数canonicalへ幾何分布の確率質量から等比級数でps/[1-(1-p)s]を導き、収束条件まで吸収済み。
---
## 問題
$X$ は成功確率 $p$ の幾何分布に従う。台は $1,2,\ldots$、確率質量関数は $P(X=k)=p(1-p)^{k-1}$ である。確率母関数とその収束範囲を求めよ。

## 答え
初項 $ps$、公比 $(1-p)s$ の等比級数として足す。

## 使用公式・定理
$|r|<1$ なら
$$\sum_{j=0}^{\infty}r^j=\frac1{1-r}.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=1}^{\infty}p(1-p)^{k-1}s^k\\&=ps\sum_{j=0}^{\infty}\{(1-p)s\}^j\\&=\frac{ps}{1-(1-p)s}.\end{aligned}$$
収束条件は $|(1-p)s|<1$ である。

## 一手
添字を $j=k-1$ にずらし、等比級数へ寄せる。

## 注意
台が0始まりの別規約と混同しない。

<!-- CARD -->

---
id: prob-pgf-poisson
title: ポアソン分布の確率母関数を指数級数で求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-poisson
type: expansion
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - ポアソン分布
  - 指数級数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-recover-pmf
archive_note: 強化済みcanonicalへポアソン分布の確率質量から指数級数でexp{lambda(s-1)}を導く全計算を吸収済み。
---
## 問題
$X$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ に従う。台は $0,1,\ldots$、確率質量関数は $P(X=k)=e^{-\lambda}\lambda^k/k!$ である。$G_X(s)$ を求めよ。

## 答え
$(\lambda s)^k/k!$ の和を指数関数へまとめる。

## 使用公式・定理
$$e^z=\sum_{k=0}^{\infty}\frac{z^k}{k!}.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=0}^{\infty}e^{-\lambda}\frac{\lambda^k}{k!}s^k\\&=e^{-\lambda}\sum_{k=0}^{\infty}\frac{(\lambda s)^k}{k!}\\&=e^{-\lambda}e^{\lambda s}\\&=\exp\{\lambda(s-1)\}.\end{aligned}$$

## 一手
階乗 $k!$ を見たら指数級数を疑う。

## 注意
モーメント母関数の $\exp\{\lambda(e^t-1)\}$ と変数を混同しない。

<!-- CARD -->

---
id: prob-pgf-factorial-moment
title: 確率母関数の2階微分で階乗モーメントを求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-factorial-moment
type: formula
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - 階乗モーメント
  - ポアソン分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-recover-pmf
archive_note: canonicalへG^(r)(1)が下降階乗モーメントを与える一般式と、ポアソンでE[X(X-1)]=lambda^2、E[X^2]=lambda^2+lambdaまで吸収済み。
---
## 問題
$X$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ に従い、$G_X(s)=\exp\{\lambda(s-1)\}$ である。$E[X(X-1)]$ を求めよ。

## 答え
確率母関数を2回微分して $s=1$ を代入する。

## 使用公式・定理
確率母関数を $r$ 回微分すると
$$G_X^{(r)}(s)=E\left[X(X-1)\cdots(X-r+1)s^{X-r}\right].$$
したがって、対応する階乗モーメントが有限なら
$$E[X(X-1)\cdots(X-r+1)]=G_X^{(r)}(1).$$
$r=2$ では $E[X(X-1)]=G_X''(1)$ となる。

## 計算例
$$G_X'(s)=\lambda e^{\lambda(s-1)},$$
$$G_X''(s)=\lambda^2e^{\lambda(s-1)}.$$
したがって
$$E[X(X-1)]=G_X''(1)=\lambda^2.$$
$\lambda=2$ なら値は4である。

## 一手
確率母関数の $r$ 階微分は下降階乗のモーメントを与える。

## 注意
$E[X^2]=\lambda^2$ ではなく、$E[X^2]=\lambda^2+\lambda$ である。

<!-- CARD -->

---
id: prob-pgf-validity
title: べき級数が確率母関数かを係数で判定する
category: math-probability
subcategory: math-distribution-functions
topic: pgf-validity
type: condition
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - 係数
  - 正規化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-recover-pmf
archive_note: canonicalへ係数非負かつG(1)=1という妥当性判定と、負係数を持つ反例を吸収済み。
---
## 問題
$G(s)=1/2-s/4+3s^2/4$ は非負整数値確率変数の確率母関数になり得るか。

## 答え
$s$ の係数が負なので、確率母関数にはなり得ない。

## 使用公式・定理
確率母関数
$$G(s)=\sum_{k=0}^{\infty}p_ks^k$$
の係数は $p_k\ge0$ かつ $\sum_kp_k=G(1)=1$ を満たす。

## 計算例
この候補は
$$G(1)=\frac12-\frac14+\frac34=1$$
だが、$s$ の係数は $-1/4<0$ である。これは $P(X=1)$ になれないため不適格である。

## 一手
$G(1)=1$ だけでなく、全ての係数が非負か確認する。

## 注意
関数値が一部で正でも、負の係数は許されない。
