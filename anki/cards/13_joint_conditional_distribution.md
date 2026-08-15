---
id: prob-joint-density-normalization
title: 三角形上の同時密度を正規化する
category: math-probability
subcategory: math-distribution-functions
topic: joint-density-normalization
type: calc_step
difficulty: 2
priority: B
hashtags: [同時確率密度関数, 正規化, 三角形の台]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
---
## 問題
$f_{X,Y}(x,y)=c$（$0<y<x<2$）、それ以外で $0$ が同時確率密度関数となるように $c$ を求めよ。

## 答え
三角形の台全体で二重積分し、1へ等置する。

## 使用公式・定理
同時確率密度関数は非負で
$$\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy\,dx=1$$
を満たす。

## 計算例
$$\begin{aligned}1&=\int_0^2\int_0^x c\,dy\,dx\\&=\int_0^2cx\,dx\\&=c\left[\frac{x^2}{2}\right]_0^2\\&=2c.\end{aligned}$$
したがって $c=1/2$ である。

## 一手
二重積分の前に、不等式 $0<y<x<2$ を内側と外側の積分範囲へ翻訳する。

## 注意
外接する正方形の面積4で割らない。

<!-- CARD -->
---
id: prob-joint-pmf-normalization
title: 同時確率質量関数の定数を二重和で決める
category: math-probability
subcategory: math-distribution-functions
topic: joint-pmf-normalization
type: calc_step
difficulty: 2
priority: B
hashtags: [同時確率質量関数, 正規化, 二重和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
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
priority: B
hashtags: [同時分布, 独立性, 交差積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布と統計的独立 }]
---
## 問題
$X,Y\in\{0,1\}$ の同時確率表が $p_{00}=0.1,p_{01}=0.2,p_{10}=0.3,p_{11}=0.4$ である。$X,Y$ は独立か。

## 答え
2×2表では交差積 $p_{00}p_{11}$ と $p_{01}p_{10}$ を比較できる。

## 使用公式・定理
全セルが同じ周辺分布の積へ分解できるなら独立である。2×2の正の確率表ではこれは
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
id: prob-conditional-equals-marginal
title: 条件付き分布と周辺分布の一致で独立性を確かめる
category: math-probability
subcategory: math-distribution-functions
topic: conditional-independence
type: condition
difficulty: 2
priority: B
hashtags: [条件付き分布, 周辺分布, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布と統計的独立 }]
---
## 問題
$p_{X,Y}(x,y)=1/4$（$x,y\in\{0,1\}$）である。$p_{Y\mid X}(y\mid0)$ と $p_Y(y)$ を求め、独立性を確かめよ。

## 答え
$X=0$ を知っても $Y$ の分布が変わらないことを示す。

## 使用公式・定理
$p_X(x)>0$ の全ての $x$ で
$$p_{Y\mid X}(y\mid x)=p_Y(y)$$
なら $X,Y$ は独立である。

## 計算例
$p_X(0)=1/2$ だから
$$p_{Y\mid X}(y\mid0)=\frac{1/4}{1/2}=\frac12\qquad(y=0,1).$$
また
$$p_Y(y)=\frac14+\frac14=\frac12\qquad(y=0,1).$$
両者が一致し、他の $x$ でも同様なので独立である。

## 一手
独立とは、一方の値を知っても他方の分布が更新されないことである。

## 注意
1つの $x$ だけでなく、正の確率を持つ全ての $x$ で確認する。

<!-- CARD -->
---
id: prob-joint-cdf-independence
title: 同時累積分布関数の積分解で独立性を判定する
category: math-probability
subcategory: math-distribution-functions
topic: joint-cdf-independence
type: theorem
difficulty: 2
priority: B
hashtags: [同時累積分布関数, 独立性, 積分解]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布と統計的独立 }]
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
id: prob-mixture-marginal
title: 潜在クラスを足し上げて混合分布を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixture-marginalization
type: formula
difficulty: 2
priority: A
hashtags: [混合分布, 周辺分布, 全確率]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 周辺分布 }, { type: past_exam, id: MATH-2024-Q4, topic: 経験分布・混合分布 }]
---
## 問題
$P(Z=1)=0.3,P(Z=2)=0.7$ で、$P(X=1\mid Z=1)=0.8,P(X=1\mid Z=2)=0.2$ である。$P(X=1)$ を求めよ。

## 答え
観測しない潜在クラス $Z$ を全て足し上げる。

## 使用公式・定理
離散潜在変数 $Z$ に対し
$$p_X(x)=\sum_z p_{X\mid Z}(x\mid z)P(Z=z).$$

## 計算例
$$\begin{aligned}P(X=1)&=0.8\cdot0.3+0.2\cdot0.7\\&=0.24+0.14\\&=0.38.\end{aligned}$$

## 一手
見えない分類変数は、条件付き分布に混合比を掛けて消去する。

## 注意
条件付き確率だけを単純平均しない。

<!-- CARD -->
---
id: prob-truncated-conditional-density
title: 区間事象で条件付けた密度を正規化する
category: math-probability
subcategory: math-distribution-functions
topic: conditional-density-event
type: calc_step
difficulty: 2
priority: B
hashtags: [条件付き分布, 切断分布, 正規化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }]
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

<!-- CARD -->
---
id: prob-density-bayes-two-class
title: 連続観測にBayesの公式を適用する
category: math-probability
subcategory: math-distribution-functions
topic: density-bayes
type: strategy
difficulty: 2
priority: B
hashtags: [条件付き分布, Bayesの定理, 混合密度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }]
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
id: prob-conditional-cdf-from-density
title: 条件付き密度を積分して条件付き累積分布関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: conditional-cdf
type: calc_step
difficulty: 2
priority: A
hashtags: [条件付き分布, 累積分布関数, 積分]
frequency: { past_exam: 3, textbook: 0, independent_problems: 0, source_confirmations: 3 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }, { type: past_exam, id: MATH-2018-Q4, topic: 条件付き2変量正規分布 }, { type: past_exam, id: MATH-2017-Q4, topic: 正規分布の条件付き分布 }]
---
## 問題
$0<x<1$ を固定すると、$Y\mid X=x$ の条件付き密度が $f_{Y\mid X}(y\mid x)=1/x$（$0<y<x$）である。条件付き累積分布関数を求めよ。

## 答え
固定した $x$ の下で、条件付き密度を台の左端から $y$ まで積分する。

## 使用公式・定理
$$F_{Y\mid X}(y\mid x)=\int_{-\infty}^y f_{Y\mid X}(v\mid x)\,dv.$$

## 計算例
$0\le y<x$ では
$$F_{Y\mid X}(y\mid x)=\int_0^y\frac1x\,dv=\frac yx.$$
したがって
$$F_{Y\mid X}(y\mid x)=\begin{cases}0&(y<0),\\y/x&(0\le y<x),\\1&(y\ge x).\end{cases}$$

## 一手
条件付き累積分布関数でも、条件を固定した後の台の外側を場合分けする。

## 注意
上端は1ではなく、条件に依存する $x$ である。
