---
id: samp-f-ratio-of-variances
title: 2母分散比とF分布
category: math-distributions
subcategory: math-sampling-distributions
topic: f-variance-ratio
type: theorem
difficulty: 2
priority: A
hashtags:
  - F分布
  - 分散比
  - 正規標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: F分布
archive_reason: duplicate
canonical_card: samp-f-distribution-definition
coverage_card: samp-f-distribution-definition
archive_note: F分布正本へ、独立な正規2標本について (n_i-1)S_i^2/sigma_i^2 ~ chi-square_{n_i-1}
  から各自由度で割って比を取り、(S_1^2/sigma_1^2)/(S_2^2/sigma_2^2) ~ F_{n_1-1,n_2-1}
  を導く流れを統合済み。n_1=6,n_2=9 で F_{5,8}、等分散帰無仮説下で S_1^2/S_2^2 ~ F_{5,8}
  となる旧カードと同じ数値例まで含むため、独立カードとしての技能は残らない。
---
## 問題
独立標本 $X_1,\ldots,X_{n_1}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_1,\sigma_1^2)$、$Y_1,\ldots,Y_{n_2}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_2,\sigma_2^2)$ に対し、不偏標本分散を $S_1^2,S_2^2$ とする。$\dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ はどの分布に従うか。

## 答え
$$\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}\sim F_{n_1-1,n_2-1}.$$

## 使用公式・定理
$(n_1-1)S_1^2/\sigma_1^2\sim\chi^2_{n_1-1}$、$(n_2-1)S_2^2/\sigma_2^2\sim\chi^2_{n_2-1}$、独立標本なので2標本は独立。自由度で割って比を取る。

## 計算例
$n_1=6,n_2=9$ では不偏分散の母分散比は2つの $\chi^2$ を自由度で割った比で $F_{5,8}$。

## 一手
各自由度は対応する標本の $n_i-1$。比の分子・分母の順に注意。

## 注意
$\sigma_1=\sigma_2$ の帰無仮説下では $S_1^2/S_2^2\sim F_{n_1-1,n_2-1}$。分散比検定に使える。
