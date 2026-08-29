---
id: bayes-squared-loss-mean
title: 二乗損失のベイズ推定量を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-squared-loss
type: calc_step
difficulty: 3
priority: A
hashtags:
  - ベイズ統計
  - 二乗損失
  - 事後平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二乗損失→事後平均
archive_reason: duplicate
canonical_card: bayes-loss-decision-canonical
archive_note: 二乗損失だけを独立カードにせず、事後期待損失を最小化する一般原理から平均・中央値・分位点・MAPを同じカードで導くcanonicalへ統合する。
---
## 問題
損失 $L(\theta,a)=(\theta-a)^2$ の下でベイズ推定量が事後平均になることを示せ。

## 記号・用語
- MAP：最大事後確率（maximum a posteriori）推定
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

条件付き平方完成、または事後期待損失をaで微分する。

## 答え
$m=E[\theta\mid x]$ とすると
$$E[(\theta-a)^2\mid x]
=E[(\theta-m)^2\mid x]+(m-a)^2.$$
第1項はaに依存しないため、$a=m$ で最小。

## 計算例
事後分布が $\operatorname{Beta}(9,6)$ ならベイズ推定値は0.6。

## 注意
最尤推定値やMAPとは一般に異なる。

<!-- CARD -->

---
id: bayes-absolute-loss-median
title: 絶対損失のベイズ推定量を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-absolute-loss
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - 絶対損失
  - 事後中央値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 絶対損失→事後中央値
archive_reason: duplicate
canonical_card: bayes-loss-decision-canonical
archive_note: 絶対損失→事後中央値は一般Bayes決定カードの一ケースとして扱う。左右に積分を分ける考え方もcanonical側へ吸収した。
---
## 問題
連続な事後分布関数をFとする。$R(a)=E[|\theta-a|\mid x]$ を最小にするaを求めよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

絶対偏差の期待値をaの左右に分けて微分する。

## 答え
微分可能な点で
$$R'(a)=P(\theta<a\mid x)-P(\theta>a\mid x)
=2F(a)-1.$$
したがって $F(a)=1/2$ を満たす事後中央値が最小化する。

## 計算例
事後分布が左右対称なら平均＝中央値となる。

## 注意
中央値が区間をなす場合、その区間内の任意のaが最適。

<!-- CARD -->

---
id: bayes-zero-one-map
title: 0-1損失とMAPの関係を説明する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-zero-one-loss
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 0-1損失
  - MAP
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 0-1損失→MAP
archive_reason: duplicate
canonical_card: bayes-loss-decision-canonical
archive_note: 0-1損失→MAPも同じ「事後期待損失を最小化」の一ケースであり、損失関数ごとにカードを増殖させない。
---
## 問題
離散母数に対する0-1損失 $L(\theta,a)=\boldsymbol1_{\{\theta\ne a\}}$ のベイズ推定量を求めよ。

## 記号・用語
- MAP：最大事後確率（maximum a posteriori）推定

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベイズ推定量は事後期待損失を最小にする決定。

## 答え
$$E[L(\theta,a)\mid x]
=1-P(\theta=a\mid x).$$
よって事後確率を最大にするMAP推定量
$$a_{\mathrm{MAP}}\in\arg\max_aP(\theta=a\mid x)$$
が最適。

## 計算例
事後確率が $(0.2,0.5,0.3)$ なら第2状態を選ぶ。

## 注意
連続母数では一点の確率が0なので、密度の最頻値との対応は微小区間損失の極限として理解する。

<!-- CARD -->

---
id: bayes-asymmetric-loss-quantile
title: 非対称絶対損失から事後分位点を求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-quantile-loss
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - 非対称損失
  - 事後分位点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズ推定量と損失関数
archive_reason: duplicate
canonical_card: bayes-loss-decision-canonical
archive_note: 非対称絶対損失→事後分位点を一般Bayes決定canonicalへ統合する。c1/(c1+c2) の分位点条件までcanonicalで再現する。
---
## 問題
過小評価の損失を $c_1(\theta-a)$、過大評価の損失を $c_2(a-\theta)$ とする。最適なaが満たす事後分位点を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

非対称絶対損失のベイズ決定は対応する事後分位点。

## 答え
事後期待損失の微分を0と置くと
$$-c_1P(\theta>a\mid x)+c_2P(\theta<a\mid x)=0.$$
よって
$$F(a\mid x)=\frac{c_1}{c_1+c_2}.$$

## 計算例
$c_1=3,c_2=1$ なら75%事後分位点。

## 注意
過小評価の損失が大きいほど高い分位点を選ぶ。

<!-- CARD -->

---
id: bayes-posterior-risk-numeric
title: 事後期待損失から行動を選ぶ
category: math-data-analysis
subcategory: math-bayesian-methods
topic: posterior-risk
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ベイズ統計
  - 事後期待損失
  - 意思決定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズ推定量と損失関数
archive_reason: duplicate
canonical_card: bayes-loss-decision-canonical
archive_note: 行動ごとの事後期待損失を比較する数値判断は一般Bayes決定カードの基本操作そのものなので独立反復しない。
---
## 問題
事後確率が $P(\theta_1\mid x)=0.7,\ P(\theta_0\mid x)=0.3$。行動 $a_1$ の損失が $(0,4)$、$a_0$ の損失が $(2,0)$（順に $\theta_1,\theta_0$）ならどちらを選ぶか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\rho(a\mid x)=E[L(\theta,a)\mid x]$。

## 答え
$$\rho(a_1\mid x)=0(0.7)+4(0.3)=1.2,$$
$$\rho(a_0\mid x)=2(0.7)+0(0.3)=1.4.$$
したがって事後期待損失の小さい $a_1$。

## 計算例
最大事後確率だけでなく誤判定費用を反映できる。

## 注意
損失表の行動と状態の向きを確認する。

<!-- CARD -->

---
id: bayes-beta-binomial-predictive
title: ベータ–二項事後予測確率を求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: beta-binomial-predictive
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 事後予測分布
  - ベータ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 事後予測分布
archive_reason: duplicate
canonical_card: bayes-posterior-predictive-canonical
archive_note: 事後予測=新観測尤度を事後分布で積分する一般原理とBeta-Bernoulliの数値例をcanonical側で扱うため重複。
---
## 問題
$p\mid x\sim\operatorname{Beta}(\alpha,\beta)$ のとき、次のベルヌーイ試行 $Y$ が成功する事後予測確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後予測分布 $p(y\mid x)=\int p(y\mid\theta)\pi(\theta\mid x)\,d\theta$。

## 答え
$$P(Y=1\mid x)
=\int_0^1P(Y=1\mid p)\pi(p\mid x)\,dp$$
$$=\int_0^1p\,\pi(p\mid x)\,dp
=E[p\mid x]=\frac{\alpha}{\alpha+\beta}.$$

## 計算例
$\operatorname{Beta}(9,6)$ なら次回成功確率は0.6。

## 注意
プラグイン値だけでなく母数の事後不確実性を積分している。
