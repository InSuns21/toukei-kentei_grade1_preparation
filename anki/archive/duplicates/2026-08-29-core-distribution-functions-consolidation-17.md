---
id: prob-cdf-from-pmf
title: 確率質量関数から累積分布関数を作る
category: math-probability
subcategory: math-distribution-functions
topic: cdf
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 累積分布関数
  - 確率関数
  - 確率変数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数と分布関数
archive_reason: duplicate
canonical_card: prob-cdf-from-density
archive_note: 強化済み累積分布関数canonicalへ離散型F(x)=sum_{u<=x}p(u)と2点分布の区分表示を吸収済み。
---
## 問題
$P(X=0)=1/4$, $P(X=1)=3/4$ のとき累積分布関数 $F_X(x)=P(X\le x)$ を求めよ。
## 答え
点 $x$ 以下の確率質量を累積する。
## 使用公式・定理
$$F_X(x)=P(X\le x)=\sum_{u\le x}p_X(u).$$
## 計算例
$$F_X(x)=\begin{cases}0&(x<0),\\1/4&(0\le x<1),\\1&(x\ge1).\end{cases}$$
## 一手
台の点を境に場合分けする。
## 注意
右連続なので $F_X(0)=1/4$ である。

<!-- CARD -->

---
id: prob-density-from-cdf-derivative
title: 累積分布関数を微分して確率密度関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: density-from-cdf
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 累積分布関数
  - 確率密度関数
  - 微分
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 累積分布関数・確率密度関数
  - type: past_exam
    id: MATH-2018-Q5
    topic: 順序統計量の確率密度
archive_reason: duplicate
canonical_card: prob-cdf-from-density
archive_note: 累積分布関数canonicalへ絶対連続部分でf=F'とする逆変換、区分的累積分布関数x^2から密度2xを復元する例を吸収済み。
---
## 問題
累積分布関数が
$$F_X(x)=\begin{cases}0&(x\le0),\\x^2&(0<x<1),\\1&(x\ge1)\end{cases}$$
である。確率密度関数 $f_X(x)$ を求めよ。

## 答え
累積分布関数が微分可能な区間で微分し、定数区間では0とする。

## 使用公式・定理
絶対連続な分布では、累積分布関数が微分可能な点で
$$f_X(x)=F_X'(x).$$

## 計算例
$0<x<1$ では
$$f_X(x)=\frac{d}{dx}x^2=2x.$$
$x<0$ と $x>1$ では $F_X$ が定数だから $f_X(x)=0$ である。従って
$$f_X(x)=\begin{cases}2x&(0<x<1),\\0&\text{それ以外}.
\end{cases}$$
確認すると
$$\int_{-\infty}^{\infty}f_X(x)\,dx=\int_0^1 2x\,dx=[x^2]_0^1=1.$$

## 一手
区分ごとに微分し、最後に密度の積分が1になることを確認する。

## 注意
累積分布関数に跳びがある場合、その点質量は通常の微分だけでは回収できない。

<!-- CARD -->

---
id: prob-cdf-jump-mass
title: 累積分布関数の跳びから点確率を求める
category: math-probability
subcategory: math-distribution-functions
topic: cdf-jump
type: formula
difficulty: 2
priority: A
hashtags:
  - 累積分布関数
  - 点確率
  - 左極限
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 累積分布関数
archive_reason: duplicate
canonical_card: prob-cdf-from-density
archive_note: 累積分布関数canonicalへ点質量P(X=a)=F(a)-F(a-)と跳び0.2から0.5で質量0.3を回収する例を吸収済み。
---
## 問題
累積分布関数 $F_X$ が $F_X(2)=0.7$、左極限 $F_X(2-)=0.4$ を満たす。$P(X=2)$ を求めよ。

## 答え
点 $2$ にある確率質量は、累積分布関数の跳びの大きさである。

## 使用公式・定理
$$P(X=a)=F_X(a)-F_X(a-),$$
ここで $F_X(a-)=\lim_{x\uparrow a}F_X(x)$ である。

## 計算例
$$\begin{aligned}P(X=2)&=F_X(2)-F_X(2-)\\&=0.7-0.4\\&=0.3.\end{aligned}$$

## 一手
累積分布関数の不連続点を見たら、右側の値から左極限を引く。

## 注意
$F_X(2)=P(X\le2)$ そのものを $P(X=2)$ としない。

<!-- CARD -->

---
id: prob-pmf-normalization
title: 確率質量関数の定数を総和1で決める
category: math-probability
subcategory: math-distribution-functions
topic: pmf-normalization
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 確率関数
  - 正規化
  - 総和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率関数
archive_reason: duplicate
canonical_card: prob-joint-density-normalization
archive_note: 正規化canonicalへ離散1変量の総和1とp_X(x)=c(x+1), x=0,1,2からc=1/6を求める例を吸収済み。
---
## 問題
$p_X(x)=c(x+1)$（$x=0,1,2$）、それ以外で $0$ が確率質量関数となるように $c$ を求めよ。

## 答え
台上の確率質量を全て足して1へ等置する。

## 使用公式・定理
確率質量関数は $p_X(x)\ge0$ かつ
$$\sum_xp_X(x)=1$$
を満たす。

## 計算例
$$\begin{aligned}1&=c(0+1)+c(1+1)+c(2+1)\\&=c+2c+3c\\&=6c.\end{aligned}$$
したがって $c=1/6$ である。

## 一手
未知定数を見たら、まず台を列挙して総和1を使う。

## 注意
台の外の値は総和へ入れない。

<!-- CARD -->

---
id: prob-density-normalization
title: 確率密度関数の定数を正規化で決める
category: math-probability
subcategory: math-distribution-functions
topic: density-normalization
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 確率密度関数
  - 正規化
  - 積分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率密度関数
archive_reason: duplicate
canonical_card: prob-joint-density-normalization
archive_note: 正規化canonicalへ連続1変量の積分1とf_X(x)=cx, 0<x<2からc=1/2を求める例を吸収済み。
---
## 問題
$f_X(x)=cx^2$（$0<x<1$）、それ以外で $0$ が確率密度関数となるように、定数 $c$ を求めよ。

## 答え
確率密度関数の全積分が1になる条件を使う。

## 使用公式・定理
確率密度関数は非負であり
$$\int_{-\infty}^{\infty}f_X(x)\,dx=1$$
を満たす。

## 計算例
$$\begin{aligned}1&=\int_0^1cx^2\,dx\\&=c\left[\frac{x^3}{3}\right]_0^1\\&=\frac{c}{3}.\end{aligned}$$
したがって
$$c=3.$$

## 一手
未知定数を含む密度では、まず台全体で積分して1へ等置する。

## 注意
$f_X(x)\le1$ は密度の必要条件ではない。

<!-- CARD -->

---
id: prob-discrete-marginal
title: 同時確率表を行方向に足して周辺分布を求める
category: math-probability
subcategory: math-distribution-functions
topic: discrete-marginal
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 同時分布
  - 周辺分布
  - 離散分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 同時分布と周辺分布
archive_reason: duplicate
canonical_card: prob-marginal-density
archive_note: 周辺化canonicalへ離散型p_X(x)=sum_y p_XY(x,y)と2×2表の具体計算を吸収済み。
---
## 問題
同時確率質量関数が $p_{X,Y}(0,0)=0.1$、$p_{X,Y}(0,1)=0.2$、$p_{X,Y}(1,0)=0.3$、$p_{X,Y}(1,1)=0.4$ である。$X$ の周辺確率質量関数を求めよ。

## 答え
$x$ を固定し、取り得る全ての $y$ について同時確率を足す。

## 使用公式・定理
離散分布の周辺確率質量関数は
$$p_X(x)=\sum_y p_{X,Y}(x,y)$$
である。

## 計算例
$$\begin{aligned}p_X(0)&=p_{X,Y}(0,0)+p_{X,Y}(0,1)\\&=0.1+0.2=0.3,\\p_X(1)&=p_{X,Y}(1,0)+p_{X,Y}(1,1)\\&=0.3+0.4=0.7.\end{aligned}$$
検算すると $p_X(0)+p_X(1)=1$ である。

## 一手
周辺化では、残す変数を固定して、消す変数の方向へ合計する。

## 注意
表の行と列のどちらが $X$ かを先に確認する。

<!-- CARD -->

---
id: prob-discrete-conditional
title: 同時確率表から条件付き確率質量関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: discrete-conditional
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 条件付き分布
  - 同時分布
  - 離散分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 条件付き分布
archive_reason: duplicate
canonical_card: prob-conditional-density
archive_note: 条件付き分布canonicalへ離散型p_Y|X=p_XY/p_Xと2×2表で3/7,4/7を得る具体例を吸収済み。
---
## 問題
$p_{X,Y}(0,0)=0.1$、$p_{X,Y}(0,1)=0.2$、$p_{X,Y}(1,0)=0.3$、$p_{X,Y}(1,1)=0.4$ である。$Y\mid X=1$ の条件付き確率質量関数を求めよ。

## 答え
$X=1$ の行を、その行の合計 $p_X(1)$ で割る。

## 使用公式・定理
$p_X(x)>0$ のとき
$$p_{Y\mid X}(y\mid x)=\frac{p_{X,Y}(x,y)}{p_X(x)}.$$

## 計算例
まず
$$p_X(1)=0.3+0.4=0.7.$$
したがって
$$p_{Y\mid X}(0\mid1)=\frac{0.3}{0.7}=\frac37,$$
$$p_{Y\mid X}(1\mid1)=\frac{0.4}{0.7}=\frac47.$$
検算すると $3/7+4/7=1$ である。

## 一手
条件として固定した部分だけを取り出し、その部分内で確率が1になるように割り直す。

## 注意
分母は全確率1ではなく、条件側の周辺確率 $p_X(1)$ である。

<!-- CARD -->

---
id: prob-joint-factorization-independence
title: 同時密度の積分解で独立性を判定する
category: math-probability
subcategory: math-distribution-functions
topic: joint-independence
type: recognition
difficulty: 2
priority: A
hashtags:
  - 同時分布
  - 統計的独立
  - 周辺密度
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
archive_note: 独立性canonicalで同時確率質量関数・同時確率密度関数・累積分布関数の積分解と条件付き分布の不変性を統合済み。
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=4xy$（$0<x<1$, $0<y<1$）、それ以外で $0$ である。$X$ と $Y$ は独立か。

## 答え
両方の周辺密度を求め、その積が長方形の台全体で同時密度に一致するか確かめる。

## 使用公式・定理
$X,Y$ が独立であるための密度による条件は、ほとんどすべての $(x,y)$ について
$$f_{X,Y}(x,y)=f_X(x)f_Y(y)$$
が成り立つことである。

## 計算例
$0<x<1$ では
$$f_X(x)=\int_0^1 4xy\,dy=4x\left[\frac{y^2}{2}\right]_0^1=2x.$$
同様に $f_Y(y)=2y$ なので
$$f_X(x)f_Y(y)=(2x)(2y)=4xy=f_{X,Y}(x,y).$$
台も $(0,1)\times(0,1)$ と積に分かれるため、$X,Y$ は独立である。

## 一手
式の積分解だけでなく、同時分布の台も直積に分かれているか確認する。

## 注意
三角形など変数同士を結び付ける台では、式だけが積の形でも独立とは限らない。

<!-- CARD -->

---
id: prob-pgf-moments
title: 確率母関数を微分して平均と分散を求める
category: math-probability
subcategory: math-distribution-functions
topic: probability-generating-function
type: formula
difficulty: 2
priority: S
hashtags:
  - 確率母関数
  - モーメント
  - ベルヌーイ分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率母関数
archive_reason: duplicate
canonical_card: prob-pgf-recover-pmf
archive_note: 強化済み確率母関数canonicalへG'(1), G''(1)による階乗モーメントとE[X^2],分散への変換まで吸収済み。旧ベルヌーイ専用カードは重複。
---
## 問題
$X$ は成功確率 $1/3$ のベルヌーイ分布に従う。すなわち $P(X=0)=2/3$、$P(X=1)=1/3$ である。確率母関数から $E[X]$ と $\operatorname{Var}(X)$ を求めよ。

## 答え
確率母関数を微分し、$s=1$ を代入して階乗モーメントを得る。

## 使用公式・定理
非負整数値の $X$ について
$$G_X(s)=E[s^X],\quad E[X]=G_X'(1),\quad E[X(X-1)]=G_X''(1),$$
$$\operatorname{Var}(X)=G_X''(1)+G_X'(1)-G_X'(1)^2.$$

## 計算例
$$G_X(s)=\frac23s^0+\frac13s^1=\frac23+\frac13s.$$
したがって
$$G_X'(s)=\frac13,\qquad G_X''(s)=0.$$
公式へ代入すると
$$E[X]=\frac13,$$
$$\operatorname{Var}(X)=0+\frac13-\left(\frac13\right)^2=\frac29.$$

## 一手
2階微分から直接得るのは $E[X^2]$ ではなく $E[X(X-1)]$ である。

## 注意
$G_X''(1)$ だけを二次モーメントと誤認しない。

<!-- CARD -->

---
id: prob-mgf-independent-sum
title: 独立な和のモーメント母関数を積で求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-independent-sum
type: formula
difficulty: 2
priority: S
hashtags:
  - モーメント母関数（積率母関数）
  - 統計的独立
  - 確率変数の和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント母関数
archive_reason: duplicate
canonical_card: prob-mgf-affine-transform
archive_note: 強化済みモーメント母関数canonicalへ独立和の積則、iidなら累乗、一般線形結合のモーメント母関数まで統合済み。
---
## 問題
$X,Y$ は独立で、それぞれ成功確率 $1/2$ のベルヌーイ分布に従う。すなわち $P(X=0)=P(X=1)=1/2$ で、$Y$ も同様である。$S=X+Y$ のモーメント母関数を求め、$S$ の確率質量を読み取れ。

## 答え
独立性により和のモーメント母関数を積へ分解し、$e^{kt}$ の係数を $P(S=k)$ として読む。

## 使用公式・定理
モーメント母関数は $M_X(t)=E[e^{tX}]$ であり、独立な $X,Y$ では
$$M_{X+Y}(t)=M_X(t)M_Y(t)$$
である。

## 計算例
まず
$$M_X(t)=M_Y(t)=\frac12+\frac12e^t.$$
したがって
$$\begin{aligned}M_S(t)&=\left(\frac12+\frac12e^t\right)^2\\&=\frac14+\frac12e^t+\frac14e^{2t}.\end{aligned}$$
一方、$M_S(t)=\sum_{k=0}^2P(S=k)e^{kt}$ だから
$$P(S=0)=\frac14,\qquad P(S=1)=\frac12,\qquad P(S=2)=\frac14.$$

## 一手
和と独立性を見たら、母関数では積へ変換する。

## 注意
独立でなければ $E[e^{tX}e^{tY}]$ を期待値の積へ分解できない。
