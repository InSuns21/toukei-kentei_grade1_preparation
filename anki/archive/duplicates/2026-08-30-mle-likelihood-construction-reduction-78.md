---
id: mle-likelihood-construction
title: 尤度関数の立て方（独立同分布）
category: math-estimation
subcategory: math-likelihood-mle
topic: likelihood-construction
type: strategy
difficulty: 2
priority: A
hashtags:
  - 最尤推定
  - 尤度関数
  - 積
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 尤度関数
archive_reason: duplicate
canonical_card: mle-score-equation
archive_note: 独立標本から尤度を積で立てる操作と、台が母数に依存するとき指示条件・境界を確認する注意は mle-score-equation
  正本の「尤度→対数尤度→スコア方程式→最大性・境界確認」に統合済み。途中工程だけを単独で反復するカードは重複のため隔離する。
---
## 問題
$X_1,\ldots,X_n$ が互いに独立で密度 $f(x;\theta)$ に従うとき、観測値 $x_1,\ldots,x_n$ の尤度 $L(\theta;x_1,\ldots,x_n)$ をどう立てるか。
## 答え
独立性から同時密度は積になる。よって
$$L(\theta;x)=\prod_{i=1}^n f(x_i;\theta).$$
## 使用公式・定理
独立同分布（i.i.d.）なら同時密度は各周辺密度の積：
$$f(x_1,\ldots,x_n;\theta)=\prod_{i=1}^n f(x_i;\theta).$$
## 計算例
$X_1,X_2\overset{iid}{\sim}N(\mu,1)$ で観測値が $(1,3)$ とする。独立性から
$$L(\mu;1,3)
=f_\mu(1)f_\mu(3)$$
$$=\frac1{\sqrt{2\pi}}e^{-(1-\mu)^2/2}
\frac1{\sqrt{2\pi}}e^{-(3-\mu)^2/2}$$
$$=\frac1{2\pi}
\exp\!\left[-\frac{(1-\mu)^2+(3-\mu)^2}{2}\right].$$
ここで
$$\frac{(1-\mu)^2+(3-\mu)^2}{2}
=(\mu-2)^2+1$$
だから
$$L(\mu;1,3)=\frac{e^{-1}}{2\pi}e^{-(\mu-2)^2}.$$
観測値を代入した後は、これを $\mu$ の関数として扱う。
## 一手
密度を全て掛け合わせる。台が母数に依存する場合は指示関数も因子に含める。
