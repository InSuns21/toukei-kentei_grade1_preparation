---
id: est-rao-blackwell-bernoulli
title: ベルヌーイ標本でラオ・ブラックウェル化を具体的に計算する
category: math-estimation
subcategory: math-point-estimator-properties
topic: rao-blackwell-bernoulli-example
type: calc_step
difficulty: 3
priority: S
hashtags:
  - ラオ・ブラックウェル化
  - ベルヌーイ分布
  - 十分統計量
  - 分散減少
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 十分統計量と推定量の改善
archive_reason: duplicate
canonical_card: est-rao-blackwell
archive_note: Bernoulli標本でE[X1|T=t]=t/nから標本平均を得る具体計算と分散改善をRao-Blackwell正本へ統合済み。
---
## 問題
$X_1,\ldots,X_n$ はベルヌーイ分布 $\operatorname{Bernoulli}(p)$ からの独立同分布標本である。不偏推定量 $T=X_1$ を十分統計量 $S=\sum_iX_i$ でラオ・ブラックウェル化し、分散を比較せよ。

## 答え
$$T^*=E[X_1\mid S]=\frac Sn=\overline X.$$
$$\operatorname{Var}(T)=p(1-p),\qquad
\operatorname{Var}(T^*)=\frac{p(1-p)}n.$$

## 使用公式・定理
ラオ・ブラックウェルの定理より、十分統計量 $S$ による条件付き期待値は不偏性を保ち、分散を増加させない。$S=s$ の条件下では成功した位置が対称なので
$$P(X_1=1\mid S=s)=\frac sn.$$

## 計算例
$$E[X_1\mid S=s]=1\cdot\frac sn+0\cdot\left(1-\frac sn\right)=\frac sn.$$
$p=0.4,n=10$ なら
$$\operatorname{Var}(X_1)=0.24,\qquad
\operatorname{Var}(\overline X)=0.024.$$
分散は10分の1になる。

## 一手
条件付き分布を総当たりせず、$S=s$ の下で各観測位置が対称であることを使う。

## 注意
$T=X_1$ は不偏だが、標本の残りを捨てているため非効率である。

<!-- CARD -->

---
id: est-lehmann-scheffe
category: math-estimation
subcategory: math-point-estimator-properties
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: A
hashtags:
  - レーマン・シェッフェの定理
  - 一様最小分散不偏推定量
  - 完備十分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 十分性
title: レーマン・シェッフェの定理
archive_reason: duplicate
canonical_card: est-rao-blackwell
archive_note: 完備十分統計量の関数で不偏なら一意なUMVUとなるLehmann-Scheffe定理をRao-Blackwellからの構成手順へ統合済み。
---
## 問題
レーマン・シェッフェの定理を述べよ。
## 答え
$T$ を $\theta$ の完備十分統計量とする。$g(T)$ が $\theta$ の不偏推定量ならば、$g(T)$ は $\theta$ の一意な一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 使用公式・定理
完備十分統計量の関数で不偏な推定量は一意（完備性）であり、ラオ・ブラックウェル化により最小分散となる。
## 計算例
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$（$\sigma^2$既知）で $\overline X$ は $\mu$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。
## 一手
「完備十分統計量の関数」＋「不偏」$\Rightarrow$ 一様最小分散不偏（一様最小分散不偏推定量）推定量。存在の証明はラオ・ブラックウェル化と完備性を使う。

<!-- CARD -->

---
id: est-umvu-idea
title: 一様最小分散不偏（一様最小分散不偏推定量）推定量の考え方
category: math-estimation
subcategory: math-point-estimator-properties
topic: umvu
type: condition
difficulty: 3
priority: A
hashtags:
  - 一様最小分散不偏推定量
  - 十分統計量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 十分性
archive_reason: duplicate
canonical_card: est-rao-blackwell
archive_note: UMVUの概念と、十分統計量での条件付け・完備性による一意性を同じ正本で説明済み。
---
## 問題
一様最小分散不偏推定量（UMVU）とは何か。
## 答え
$\theta$ のすべての不偏推定量の中で、すべての $\theta$ に対して分散が最小となる不偏推定量。完備十分統計量 $T$ が存在し、$T$ の関数として不偏推定量が得られれば、レーマン・シェッフェの定理によりそれが一意な一様最小分散不偏（一様最小分散不偏推定量）推定量となる。
## 使用公式・定理
ラオ・ブラックウェル化で十分統計量の関数へ改善し、完備性で一意性（レーマン・シェッフェの定理）を得る。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ では $\overline X$ が $p$ の一様最小分散不偏（一様最小分散不偏推定量）推定量である。$T=\sum_iX_i$ は完備十分である。
## 一手
「不偏の中の分散最小」＋「十分統計量の関数」。完備十分統計量があれば一様最小分散不偏（一様最小分散不偏推定量）推定量を構成できる。
