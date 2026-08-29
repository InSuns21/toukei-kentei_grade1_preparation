---
id: samp-continuity-correction
title: 二項分布の正規近似と連続修正
category: math-distributions
subcategory: math-sampling-distributions
topic: normal-approx-binomial
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 二項分布
  - 正規近似
  - 連続修正
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: dist-continuity-correction-interval
archive_note: 二項分布の正規近似で整数区間を±0.5修正する同一操作。標本分布名前空間で反復しない。
---
## 問題
$X\sim\operatorname{Binomial}(n,p)$ の $P(X\le k)$ を正規近似するとき、連続修正を入れた式を書け。

## 答え
$$P(X\le k)\approx\Phi\left(\frac{k+0.5-np}{\sqrt{np(1-p)}}\right).$$

## 使用公式・定理
平均 $np$、分散 $np(1-p)$ の正規分布で近似し、離散と連続の境界を0.5ずらす。

## 計算例
$n=100,p=0.5$ では $P(X\le40)\approx\Phi((40.5-50)/5)=\Phi(-1.9)$。

## 一手
離散値を連続で近似するときは ±0.5 の補正を入れる。

## 注意
$P(X\ge k)$ は $k-0.5$ を使う。

<!-- CARD -->

---
id: engasym-binomial-continuity-correction
title: 二項分布を連続性補正付きで正規近似する
category: applied-engineering
subcategory: engineering-asymptotics
topic: normal-approximation-binomial
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 中心極限定理
  - 二項分布
  - 連続性補正
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-continuity-correction-interval
archive_note: 工学設定でも二項分布の連続性補正は同じ±0.5操作。engineering-asymptotics にはCLT・Slutsky等の別論点を残す。
---
## 問題
$X\sim\operatorname{Binomial}(100,0.1)$ に対し $P(X\le15)$ を連続性補正付きで正規近似せよ。
## 記号・用語
連続性補正は離散境界15を連続境界15.5へ置き換える操作である。
## 使用公式・定理
二項分布の平均は $np$、分散は $np(1-p)$。
## 一手／方針
$X\le15$ を正規変数の $Y\le15.5$ として標準化する。
## 答え
$$\mu=10,\qquad \sigma=3,$$
$$z=\frac{15.5-10}{3}=1.833,$$
よって $P(X\le15)\approx\Phi(1.833)\approx0.9666$。
## 計算例
補正なしでは $z=5/3=1.667$ となる。
## 注意
$X<15$ なら整数では $X\le14$ なので境界は14.5。
