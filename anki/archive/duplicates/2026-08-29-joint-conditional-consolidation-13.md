---
id: prob-joint-pmf-normalization
title: 同時確率質量関数の定数を二重和で決める
category: math-probability
subcategory: math-distribution-functions
topic: joint-pmf-normalization
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 同時分布
  - 正規化
  - 二重和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 同時分布
archive_reason: duplicate
canonical_card: prob-joint-density-normalization
archive_note: 強化済みcanonicalで同時分布の正規化を離散の二重和と連続の二重積分の共通原理として扱い、2×2確率質量関数の具体例も吸収済み。
---
## 問題
$p_{X,Y}(x,y)=c(x+y+1)$（$x,y\in\{0,1\}$）、それ以外で $0$ が同時確率質量関数となるように $c$ を求めよ。

## 答え
4個の格子点で確率質量を足し、1へ等置する。

## 使用公式・定理
$$\sum_x\sum_y p_{X,Y}(x,y)=1.$$

## 計算例
4点の係数は
$$1,\ 2,\ 2,\ 3$$
なので
$$1=c(1+2+2+3)=8c.$$
したがって $c=1/8$ である。

## 一手
有限台では、可能な組 $(x,y)$ を漏れなく表にして足す。

## 注意
$(0,1)$ と $(1,0)$ は別の標本点である。

<!-- CARD -->

---
id: prob-discrete-independence-cross-product
title: 2×2同時確率表を交差積で独立判定する
category: math-probability
subcategory: math-distribution-functions
topic: discrete-independence
type: recognition
difficulty: 2
priority: A
hashtags:
  - 同時分布
  - 統計的独立
  - 交差積
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 同時分布と統計的独立
archive_reason: duplicate
canonical_card: prob-conditional-equals-marginal
archive_note: 独立性canonicalへ2×2表の交差積条件と数値反例を吸収済み。交差積だけを独立カードにしない。
---
## 問題
$X,Y\in\{0,1\}$ の同時確率表が $p_{00}=0.1,p_{01}=0.2,p_{10}=0.3,p_{11}=0.4$ である。$X,Y$ は独立か。

## 答え
2×2表では交差積 $p_{00}p_{11}$ と $p_{01}p_{10}$ を比較できる。

## 使用公式・定理
独立の定義は、周辺確率 $p_{i\cdot}=P(X=i)$、$p_{\cdot j}=P(Y=j)$ を用いて
$$p_{ij}=p_{i\cdot}p_{\cdot j}\quad(i,j\in\{0,1\})$$
である。総和が1の2×2確率表では、これは
$$p_{00}p_{11}=p_{01}p_{10}$$
と同値である。

## 計算例
$$p_{00}p_{11}=0.1\cdot0.4=0.04,$$
$$p_{01}p_{10}=0.2\cdot0.3=0.06.$$
一致しないため $X,Y$ は独立ではない。

## 一手
2×2表の独立判定では、まず交差積で素早く反証する。

## 注意
共分散を計算しなくても独立性を反証できる。

<!-- CARD -->

---
id: prob-joint-cdf-independence
title: 同時累積分布関数の積分解で独立性を判定する
category: math-probability
subcategory: math-distribution-functions
topic: joint-cdf-independence
type: theorem
difficulty: 2
priority: A
hashtags:
  - 同時分布
  - 統計的独立
  - 積分解
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 同時分布と統計的独立
archive_reason: duplicate
canonical_card: prob-conditional-equals-marginal
archive_note: 独立性canonicalへ同時累積分布関数F_XY=F_X F_Yという一般条件と数値例を吸収済み。
---
## 問題
$F_{X,Y}(x,y)=F_X(x)F_Y(y)$ が全ての実数 $x,y$ で成り立つとき、何が結論できるか。$F_X(1)=0.6,F_Y(2)=0.5$ の例も計算せよ。

## 答え
$X,Y$ は独立であり、$P(X\le1,Y\le2)=0.3$ である。

## 使用公式・定理
$X,Y$ が独立であることと
$$F_{X,Y}(x,y)=F_X(x)F_Y(y)$$
が全ての $x,y$ で成り立つことは同値である。

## 計算例
$$\begin{aligned}P(X\le1,Y\le2)&=F_{X,Y}(1,2)\\&=F_X(1)F_Y(2)\\&=0.6\cdot0.5=0.3.\end{aligned}$$

## 一手
密度が存在しない場合でも、累積分布関数なら同じ積条件で独立性を表せる。

## 注意
1点だけで積が一致しても独立性は結論できない。

<!-- CARD -->

---
id: prob-density-bayes-two-class
title: 連続観測にベイズの定理の公式を適用する
category: math-probability
subcategory: math-distribution-functions
topic: density-bayes
type: strategy
difficulty: 2
priority: A
hashtags:
  - 条件付き分布
  - ベイズの定理
  - 混合密度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き分布
archive_reason: duplicate
canonical_card: prob-marginal-density
archive_note: 潜在クラスcanonicalへ周辺化とベイズの定理による逆向き更新を統合し、連続観測の事前確率×条件付き密度の計算まで吸収済み。
---
## 問題
$P(Z=1)=P(Z=2)=1/2$、観測 $X$ の条件付き密度が点 $x$ で $f_{X\mid Z}(x\mid1)=0.6$、$f_{X\mid Z}(x\mid2)=0.2$ である。観測値 $x$ に対する $P(Z=1\mid X=x)$ を求めよ。

## 答え
各クラスの「事前確率×条件付き密度」を作り、その合計で正規化する。

## 使用公式・定理
$$P(Z=k\mid X=x)=\frac{P(Z=k)f_{X\mid Z}(x\mid k)}{\sum_jP(Z=j)f_{X\mid Z}(x\mid j)}.$$

## 計算例
$$\begin{aligned}P(Z=1\mid X=x)&=\frac{0.5\cdot0.6}{0.5\cdot0.6+0.5\cdot0.2}\\&=\frac{0.3}{0.4}\\&=0.75.\end{aligned}$$

## 一手
連続観測では点の確率ではなく、その点での条件付き密度を尤度として使う。

## 注意
$P(X=x)=0$ なので点確率の比は使わない。周辺密度が正の点では、上の密度による表示を用いる。

<!-- CARD -->

---
id: prob-truncated-conditional-density
title: 区間事象で条件付けた密度を正規化する
category: math-probability
subcategory: math-distribution-functions
topic: conditional-density-event
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 条件付き分布
  - 切断分布
  - 正規化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き分布
archive_reason: duplicate
canonical_card: prob-conditional-cdf-from-density
archive_note: 条件付き分布canonicalへ事象で台を切って残存確率で正規化する切断密度の計算と、その後の累積分布関数化を統合済み。
---
## 問題
$X$ は区間 $(0,2)$ の一様分布に従い、確率密度関数は $f_X(x)=1/2$ である。$X>1$ の条件下の密度を求めよ。

## 答え
元の密度を事象 $X>1$ の確率で割り、台を $(1,2)$ に切る。

## 使用公式・定理
$P(X\in B)>0$ のとき
$$f_{X\mid X\in B}(x)=\frac{f_X(x)\boldsymbol1_B(x)}{P(X\in B)}.$$

## 計算例
$$P(X>1)=\int_1^2\frac12\,dx=\frac12.$$
よって
$$f_{X\mid X>1}(x)=\frac{1/2}{1/2}=1\qquad(1<x<2),$$
それ以外で0である。

## 一手
事象で条件付けると、台を切って残った確率で割り直す。

## 注意
元の密度 $1/2$ のままでは条件付き密度の積分が1にならない。
