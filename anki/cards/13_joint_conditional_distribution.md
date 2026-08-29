---
id: prob-joint-density-normalization
title: 三角形上の同時密度を正規化する
category: math-probability
subcategory: math-distribution-functions
topic: joint-density-normalization
type: calc_step
difficulty: 2
priority: A
hashtags: [同時分布, 正規化, 三角形の台]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布 }]
---
## 問題
$f_{X,Y}(x,y)=c$（$0<y<x<2$）、それ以外で $0$ が同時確率密度関数となるように $c$ を求めよ。

## 答え
$f_{X,Y}(x,y)=c$（$0<y<x<2$）では
$$c=\frac12.$$

## 使用公式・定理
正規化の原理は次元や離散・連続によらず
$$
\text{台全体の確率}=1
$$
である。

離散型では
$$
\sum_{x\in\mathcal S}p_X(x)=1,
$$
連続型では
$$
\int_{\mathcal S}f_X(x)\,dx=1.
$$
2変量なら、それぞれ二重和・二重積分に置き換わる。
先に台 $\mathcal S$ を確定し、その台だけを総和または積分する。

## 計算例
離散1変量で
$$p_X(x)=c(x+1),\qquad x=0,1,2$$
なら
$$
1=c+2c+3c=6c,
$$
よって
$$c=\frac16.$$

連続1変量で
$$f_X(x)=cx,\qquad0<x<2$$
なら
$$
1=\int_0^2cx\,dx=2c,
$$
したがって
$$c=\frac12.$$

同時密度では台が三角形なので
$$
\begin{aligned}
1
&=\int_0^2\int_0^x c\,dy\,dx\\
&=\int_0^2cx\,dx\\
&=2c,
\end{aligned}
$$
よってやはり
$$c=\frac12.$$

## 一手
未知定数を見たら、まず台を列挙または図示し、その台全体で総確率を1にする。離散なら足し、連続なら積分する。

## 注意
確率密度関数は各点で1以下である必要はない。必要なのは非負性と、台全体の積分が1になることである。

<!-- CARD -->

---
id: prob-conditional-equals-marginal
title: 条件付き分布と周辺分布の一致で独立性を確かめる
category: math-probability
subcategory: math-distribution-functions
topic: conditional-independence
type: condition
difficulty: 2
priority: S
hashtags: [条件付き分布, 周辺分布, 統計的独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布と統計的独立 }]
---
## 問題
$p_{X,Y}(x,y)=1/4$（$x,y\in\{0,1\}$）である。$p_{Y\mid X}(y\mid0)$ と $p_Y(y)$ を求め、独立性を確かめよ。

## 答え
$p_{X,Y}(x,y)=1/4$（$x,y\in\{0,1\}$）では
$$p_{Y\mid X}(y\mid0)=p_Y(y)=\frac12,$$
したがって $X,Y$ は独立である。

## 使用公式・定理
$X,Y$ の独立性は、分布の表し方に応じて次の同値な形で確認できる。

離散型では
$$p_{X,Y}(x,y)=p_X(x)p_Y(y),$$
連続型で密度が存在すれば
$$f_{X,Y}(x,y)=f_X(x)f_Y(y),$$
一般には累積分布関数で
$$F_{X,Y}(x,y)=F_X(x)F_Y(y)$$
が全ての $x,y$ で成り立つことと独立性は同値である。

また周辺確率・密度が正の範囲では
$$p_{Y\mid X}(y\mid x)=p_Y(y)$$
または
$$f_{Y\mid X}(y\mid x)=f_Y(y)$$
と「条件を知っても分布が変わらない」と表せる。

総和が1の $2\times2$ 確率表では、独立性は交差積
$$p_{00}p_{11}=p_{01}p_{10}$$
とも同値である。

## 計算例
一様な $2\times2$ 表では
$$p_X(0)=\frac12,$$
したがって
$$
p_{Y\mid X}(y\mid0)
=\frac{p_{X,Y}(0,y)}{p_X(0)}
=\frac{1/4}{1/2}
=\frac12.
$$
一方
$$p_Y(y)=\frac14+\frac14=\frac12,$$
なので条件付き分布と周辺分布が一致する。

反例として
$$p_{00}=0.1,\quad p_{01}=0.2,\quad p_{10}=0.3,\quad p_{11}=0.4$$
なら
$$
p_{00}p_{11}=0.04,
\qquad
p_{01}p_{10}=0.06,
$$
で一致しないから独立ではない。

累積分布関数で独立性が分かっており $F_X(1)=0.6,F_Y(2)=0.5$ なら
$$
P(X\le1,Y\le2)
=F_X(1)F_Y(2)
=0.30.
$$

## 一手
独立性は「同時分布＝周辺分布の積」が本体である。条件付き分布の不変性や2×2表の交差積は、その同じ条件を計算しやすい形にしたものと捉える。

## 注意
1つの点や1つの条件値で偶然一致しただけでは独立性を結論しない。必要な全ての値で積分解または条件付き分布の一致を確認する。

<!-- CARD -->

---
id: prob-mixture-marginal
title: 潜在クラスを足し上げて混合分布を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixture-marginalization
type: formula
difficulty: 2
priority: S
hashtags: [混合分布, 周辺分布, 全確率]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 周辺分布 }, { type: past_exam, id: MATH-2024-Q4, topic: 経験分布・混合分布 }]
---
## 問題
$P(Z=1)=0.3,P(Z=2)=0.7$ で、$P(X=1\mid Z=1)=0.8,P(X=1\mid Z=2)=0.2$ である。$P(X=1)$ を求めよ。

## 答え
$P(Z=1)=0.3,P(Z=2)=0.7$、
$P(X=1\mid Z=1)=0.8,P(X=1\mid Z=2)=0.2$ なら
$$P(X=1)=0.38.$$

## 使用公式・定理
潜在クラス $Z$ を観測しないとき、$X$ の周辺分布は全確率で
$$
p_X(x)=\sum_z p_{X\mid Z}(x\mid z)P(Z=z)
$$
と得る。連続観測なら確率質量を条件付き密度へ置き換えて
$$
f_X(x)=\sum_z f_{X\mid Z}(x\mid z)P(Z=z).
$$

観測 $X=x$ から潜在クラスへ逆向きに更新するにはベイズの定理を使い、
$$
P(Z=k\mid X=x)
=\frac{P(Z=k)f_{X\mid Z}(x\mid k)}
{\sum_jP(Z=j)f_{X\mid Z}(x\mid j)}.
$$
分母はまさに周辺密度 $f_X(x)$ である。

## 計算例
離散観測の周辺化では
$$
\begin{aligned}
P(X=1)
&=P(X=1\mid Z=1)P(Z=1)\\
&\quad+P(X=1\mid Z=2)P(Z=2)\\
&=0.8\cdot0.3+0.2\cdot0.7\\
&=0.38.
\end{aligned}
$$

逆向きの連続観測例として
$$P(Z=1)=P(Z=2)=\frac12,$$
$$f_{X\mid Z}(x\mid1)=0.6,\qquad f_{X\mid Z}(x\mid2)=0.2$$
とする。まず周辺密度は
$$
f_X(x)=0.5\cdot0.6+0.5\cdot0.2=0.4.
$$
よってベイズの定理から
$$
\begin{aligned}
P(Z=1\mid X=x)
&=\frac{0.5\cdot0.6}{0.4}\\
&=0.75.
\end{aligned}
$$

## 一手
潜在クラスを消すときは「条件付き分布×混合比を足す」。観測後にクラスへ戻るときは同じ各項を作り、その総和で割って正規化する。

## 注意
連続観測では $P(X=x)=0$ なので点確率の比を使わず、条件付き密度と周辺密度でベイズの定理を書く。

<!-- CARD -->

---
id: prob-conditional-cdf-from-density
title: 条件付き密度を積分して条件付き累積分布関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: conditional-cdf
type: calc_step
difficulty: 2
priority: S
hashtags: [条件付き分布, 累積分布関数, 積分]
frequency: { past_exam: 3, textbook: 0, independent_problems: 0, source_confirmations: 3 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }, { type: past_exam, id: MATH-2018-Q4, topic: 条件付き2変量正規分布 }, { type: past_exam, id: MATH-2017-Q4, topic: 正規分布の条件付き分布 }]
---
## 問題
$0<x<1$ を固定すると、$Y\mid X=x$ の条件付き密度が $f_{Y\mid X}(y\mid x)=1/x$（$0<y<x$）である。条件付き累積分布関数を求めよ。

## 答え
$0<x<1$ を固定し、$f_{Y\mid X}(y\mid x)=1/x$（$0<y<x$）なら
$$
F_{Y\mid X}(y\mid x)
=\begin{cases}
0,&y<0,\\
y/x,&0\le y<x,\\
1,&y\ge x.
\end{cases}
$$

## 使用公式・定理
事象 $B$ で条件付ける場合、$P(X\in B)>0$ なら
$$
f_{X\mid X\in B}(x)
=\frac{f_X(x)\mathbf 1_{B}(x)}{P(X\in B)}.
$$
つまり元の台を $B$ に切り、残った確率で割り直す。

一般に条件付き密度 $f_{Y\mid X}(y\mid x)$ が得られた後は、$x$ を固定して
$$
F_{Y\mid X}(y\mid x)
=\int_{-\infty}^{y}f_{Y\mid X}(v\mid x)\,dv
$$
と積分すれば条件付き累積分布関数を得る。

## 計算例
まず事象で条件付ける例として $X\sim U(0,2)$ を $X>1$ で切断する。元の密度は $1/2$ で
$$
P(X>1)=\int_1^2\frac12\,dx=\frac12.
$$
よって
$$
f_{X\mid X>1}(x)
=\frac{1/2}{1/2}=1,
\qquad 1<x<2.
$$
条件付け後に積分が1へ戻ることが分かる。

次に $Y\mid X=x$ の例では、$0\le y<x$ で
$$
\begin{aligned}
F_{Y\mid X}(y\mid x)
&=\int_0^y\frac1x\,dv\\
&=\frac yx.
\end{aligned}
$$
台の外では0または1を付けて累積分布関数を完成させる。

## 一手
条件付けは「台を切る→確率1になるよう割り直す」、累積分布関数化は「条件を固定したまま左端から積分する」の順で考える。

## 注意
条件付き分布でも台は条件値に依存し得る。$Y\mid X=x$ の上端が固定値1とは限らず、この例では $x$ である。
