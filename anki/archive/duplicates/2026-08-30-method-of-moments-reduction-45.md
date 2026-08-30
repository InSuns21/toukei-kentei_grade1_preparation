---
id: est-moments-uniform
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments
type: calc_step
difficulty: 3
priority: A
hashtags:
  - モーメント法
  - 一様分布
  - 母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント法
title: 一様分布のモーメント法推定量
archive_reason: duplicate
canonical_card: est-method-of-moments
archive_note: 一様分布U(0,theta)のモーメント法推定を、一般手順・最尤推定との違い・数値例を含む正本へ統合済み。
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}U(0,\theta)$（一様分布、台 $0<x<\theta$、密度 $f(x)=1/\theta$）のとき、$\theta$ のモーメント法推定量を求めよ。
## 答え
母平均 $E[X]=\theta/2$ を標本平均 $\overline X$ に等置する：
$\overline X=\frac{\theta}{2}\quad\Rightarrow\quad\widehat\theta_{\mathrm{MM}}=2\overline X.$
## 使用公式・定理
$E[X]=\frac{\theta}{2}.$
## 計算例
$x=(1,2,3)$ なら $\overline x=2$ より $\widehat\theta=4$。
## 一手
1母数なら1次モーメントを等置する。モーメント法は計算が易しく、一般に最尤推定と異なる。

<!-- CARD -->

---
id: est-moments-uniform-two-endpoints
title: 一様分布の両端点を平均と分散から推定する
category: math-estimation
subcategory: math-estimation-methods
topic: method-of-moments-uniform-endpoints
type: calc_step
difficulty: 3
priority: A
hashtags:
  - モーメント法
  - 一様分布
  - 端点母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント法
archive_reason: duplicate
canonical_card: est-method-of-moments
archive_note: 一様分布U(a,b)の2母数モーメント方程式と端点推定を、第1・第2標本モーメントから逐次導出する正本へ統合済み。
---
## 問題
一様分布 $U(a,b)$ について標本平均 $m=5$、分母 $n$ の標本分散 $v=3$ を得た。$(a,b)$ のモーメント法推定値を求めよ。
## 答え
$$\widehat a=m-\sqrt{3v}=2,\qquad
\widehat b=m+\sqrt{3v}=8.$$
## 使用公式・定理
$$E[X]=\frac{a+b}{2},\qquad
\operatorname{Var}(X)=\frac{(b-a)^2}{12}.$$
## 計算例
平均式から $a+b=2m$、分散式から $b-a=\sqrt{12v}=2\sqrt{3v}$。加減法により
$$a=m-\sqrt{3v},\qquad b=m+\sqrt{3v}.$$
$m=5,v=3$ では $\sqrt{3v}=3$。
## 一手
端点そのものより、中心 $(a+b)/2$ と幅 $b-a$ を先に解く。
## 注意
推定された区間が実際の標本最小値・最大値を含まない場合があり、最尤法とは性質が異なる。
