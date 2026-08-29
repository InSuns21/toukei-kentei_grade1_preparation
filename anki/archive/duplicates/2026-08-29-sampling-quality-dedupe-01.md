---
id: samp-chisq-mean-variance
title: 正規標本の標本分散とカイ二乗分布
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-sample-variance
type: theorem
difficulty: 2
priority: S
hashtags:
  - 不偏標本分散
  - カイ二乗分布
  - 正規標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: samp-chisq-mean-var-indep
archive_note: 両カードとも正規標本で (n-1)S^2/sigma^2 ~ chi^2_{n-1}
  を扱う。canonical側をCochran分解・独立性・観測Qの具体計算まで補強済みなので、公式再掲中心の重複側を統合する。
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ とし、不偏標本分散を $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline X)^2$ とする。$\dfrac{(n-1)S^2}{\sigma^2}$ はどの分布に従うか答えよ。

## 答え
$$\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.$$

## 使用公式・定理
自由度は $n$ ではなく $n-1$。標本平均に1個の線形制約があり自由度が1減る。$\overline X$ と $S^2$ は独立である。

## 計算例
$n=10$ の正規標本では $9S^2/\sigma^2\sim\chi^2_9$。

## 一手
「平均を既に使った分だけ自由は減る」と読み、自由度 $n-1$ を書く。

## 注意
正規性が不可欠。$\overline X$ と $S^2$ の独立性は一定条件の下での特殊な性質。

<!-- CARD -->

---
id: samp-max-distribution
title: 標本最大値の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: max-distribution
type: theorem
difficulty: 2
priority: A
hashtags:
  - 最大値
  - 順序統計量
  - 累積分布関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 順序統計量
archive_reason: duplicate
canonical_card: dist-order-max
archive_note: どちらも最大値について M<=m iff 全Xi<=m から F_M(m)=F_X(m)^n
  を作り微分する同一move。canonical側はU(0,1),
  n=2でCDF→密度→support→積分1の確認まで実行しており、一般式を再掲するだけのsampling側より計算例が強い。
---
## 問題
独立同分布標本 $X_1,\ldots,X_n$ の最大値 $M=\max_iX_i$ の累積分布関数と密度を求めよ。

## 答え
$$F_M(m)=F_X(m)^n.$$
$f_X$ が連続なら
$$f_M(m)=nF_X(m)^{n-1}f_X(m).$$

## 使用公式・定理
$M\le m$ は全標本が $m$ 以下と同値なので
$$F_M(m)=P(X_1\le m,\ldots,X_n\le m)=F_X(m)^n.$$

## 計算例
標準正規分布 $n=3$ では $F_M(m)=\Phi(m)^3$。

## 一手
最大値が $m$ 以下 = 全部 $m$ 以下。独立ゆえ分布関数の積。

## 注意
最小値は $1-\{1-F_X(x)\}^n$。最大値との違いに注意。
