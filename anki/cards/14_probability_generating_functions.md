---
id: prob-pgf-recover-pmf
title: 確率母関数の係数から確率質量を読む
category: math-probability
subcategory: math-distribution-functions
topic: pgf-coefficients
type: recognition
difficulty: 1
priority: S
hashtags: [確率母関数, 確率関数, 係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
非負整数値確率変数 $X$ の確率母関数が $G_X(s)=0.2+0.5s+0.3s^2$ である。確率質量関数を求めよ。

## 答え
$s^k$ の係数が $P(X=k)$ である。

## 使用公式・定理
$$G_X(s)=E[s^X]=\sum_{k=0}^{\infty}P(X=k)s^k.$$
べき級数を $k$ 回微分して $s=0$ を代入すると、$s^k$ の項だけが残るので
$$G_X^{(k)}(0)=k!P(X=k),\qquad
P(X=k)=\frac{G_X^{(k)}(0)}{k!}.$$ 

## 計算例
係数を比較すると
$$P(X=0)=0.2,\quad P(X=1)=0.5,\quad P(X=2)=0.3,$$
それ以外で0である。検算は
$$G_X(1)=0.2+0.5+0.3=1.$$

## 一手
確率母関数は確率質量をべき級数の係数として保存している。

## 注意
$G_X(0)=P(X=0)$ だが、$G_X(k)$ が $P(X=k)$ なのではない。

<!-- CARD -->
---
id: prob-pgf-binomial
title: 二項分布の確率母関数を二項定理で導く
category: math-probability
subcategory: math-distribution-functions
topic: pgf-binomial
type: expansion
difficulty: 2
priority: S
hashtags: [確率母関数, 二項分布, 二項定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X$ は二項分布 $\operatorname{Binomial}(n,p)$ に従う。台は $0,\ldots,n$、確率質量関数は $P(X=k)=\binom nkp^k(1-p)^{n-k}$ である。$G_X(s)$ を求めよ。

## 答え
定義へ確率質量関数を代入し、二項定理でまとめる。

## 使用公式・定理
$$G_X(s)=\sum_{k=0}^nP(X=k)s^k,$$
$$\sum_{k=0}^n\binom nka^kb^{n-k}=(a+b)^n.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=0}^n\binom nkp^k(1-p)^{n-k}s^k\\&=\sum_{k=0}^n\binom nk(ps)^k(1-p)^{n-k}\\&=(1-p+ps)^n.\end{aligned}$$
$n=2,p=1/2$ なら $G_X(s)=(1+s)^2/4$ である。

## 一手
$p^ks^k$ を $(ps)^k$ にまとめると二項定理が見える。

## 注意
指数 $n$ を落とさない。

<!-- CARD -->
---
id: prob-pgf-geometric
title: 幾何分布の確率母関数を等比級数で求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-geometric
type: calc_step
difficulty: 2
priority: S
hashtags: [確率母関数, 幾何分布, 等比級数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X$ は成功確率 $p$ の幾何分布に従う。台は $1,2,\ldots$、確率質量関数は $P(X=k)=p(1-p)^{k-1}$ である。確率母関数とその収束範囲を求めよ。

## 答え
初項 $ps$、公比 $(1-p)s$ の等比級数として足す。

## 使用公式・定理
$|r|<1$ なら
$$\sum_{j=0}^{\infty}r^j=\frac1{1-r}.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=1}^{\infty}p(1-p)^{k-1}s^k\\&=ps\sum_{j=0}^{\infty}\{(1-p)s\}^j\\&=\frac{ps}{1-(1-p)s}.\end{aligned}$$
収束条件は $|(1-p)s|<1$ である。

## 一手
添字を $j=k-1$ にずらし、等比級数へ寄せる。

## 注意
台が0始まりの別規約と混同しない。

<!-- CARD -->
---
id: prob-pgf-poisson
title: ポアソン分布の確率母関数を指数級数で求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-poisson
type: expansion
difficulty: 2
priority: S
hashtags: [確率母関数, ポアソン分布, 指数級数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ に従う。台は $0,1,\ldots$、確率質量関数は $P(X=k)=e^{-\lambda}\lambda^k/k!$ である。$G_X(s)$ を求めよ。

## 答え
$(\lambda s)^k/k!$ の和を指数関数へまとめる。

## 使用公式・定理
$$e^z=\sum_{k=0}^{\infty}\frac{z^k}{k!}.$$

## 計算例
$$\begin{aligned}G_X(s)&=\sum_{k=0}^{\infty}e^{-\lambda}\frac{\lambda^k}{k!}s^k\\&=e^{-\lambda}\sum_{k=0}^{\infty}\frac{(\lambda s)^k}{k!}\\&=e^{-\lambda}e^{\lambda s}\\&=\exp\{\lambda(s-1)\}.\end{aligned}$$

## 一手
階乗 $k!$ を見たら指数級数を疑う。

## 注意
モーメント母関数の $\exp\{\lambda(e^t-1)\}$ と変数を混同しない。

<!-- CARD -->
---
id: prob-pgf-independent-sum
title: 独立な和の確率母関数を積へ変える
category: math-probability
subcategory: math-distribution-functions
topic: pgf-independent-sum
type: formula
difficulty: 2
priority: S
hashtags: [確率母関数, 独立和, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X_1,X_2,X_3$ は独立で、それぞれ成功確率 $p$ のベルヌーイ分布に従う。$S=X_1+X_2+X_3$ の確率母関数を求めよ。

## 答え
各確率母関数を掛け、二項分布の形を得る。

## 使用公式・定理
独立な非負整数値確率変数について
$$G_{X_1+\cdots+X_n}(s)=\prod_{i=1}^nG_{X_i}(s).$$

## 計算例
ベルヌーイ分布の確率母関数は
$$G_{X_i}(s)=1-p+ps.$$
したがって
$$G_S(s)=(1-p+ps)^3.$$
これは二項分布 $\operatorname{Binomial}(3,p)$ の確率母関数である。

## 一手
独立和を見たら、畳み込みの代わりに母関数の積で処理できる。

## 注意
積への分解には独立性が必要である。

<!-- CARD -->
---
id: prob-pgf-thinning
title: 確率母関数の合成で二項間引きを表す
category: math-probability
subcategory: math-distribution-functions
topic: pgf-thinning
type: strategy
difficulty: 3
priority: S
hashtags: [確率母関数, 二項間引き, 合成]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
個数 $N$ の各要素を独立に確率 $q$ で残し、残った個数を $Y$ とする。$G_Y(s)$ を $G_N$ で表せ。さらに $N$ がポアソン分布 $\operatorname{Poisson}(\lambda)$ のときを求めよ。

## 答え
$N=n$ の下で $Y$ は二項分布なので、条件付き確率母関数を $N$ について平均する。

## 使用公式・定理
$$G_{Y\mid N=n}(s)=(1-q+qs)^n,$$
したがって
$$G_Y(s)=G_N(1-q+qs).$$

## 計算例
$G_N(u)=\exp\{\lambda(u-1)\}$ だから
$$\begin{aligned}G_Y(s)&=\exp[\lambda\{(1-q+qs)-1\}]\\&=\exp\{\lambda q(s-1)\}.\end{aligned}$$
よって $Y$ はポアソン分布 $\operatorname{Poisson}(\lambda q)$ に従う。

## 一手
ランダム個の独立な選別では、元の確率母関数へ1要素分の確率母関数を代入する。

## 注意
$N$ と各選別結果の独立性を暗黙にしない。

<!-- CARD -->
---
id: prob-pgf-factorial-moment
title: 確率母関数の2階微分で階乗モーメントを求める
category: math-probability
subcategory: math-distribution-functions
topic: pgf-factorial-moment
type: formula
difficulty: 2
priority: S
hashtags: [確率母関数, 階乗モーメント, ポアソン分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X$ はポアソン分布 $\operatorname{Poisson}(\lambda)$ に従い、$G_X(s)=\exp\{\lambda(s-1)\}$ である。$E[X(X-1)]$ を求めよ。

## 答え
確率母関数を2回微分して $s=1$ を代入する。

## 使用公式・定理
確率母関数を $r$ 回微分すると
$$G_X^{(r)}(s)=E\left[X(X-1)\cdots(X-r+1)s^{X-r}\right].$$
したがって、対応する階乗モーメントが有限なら
$$E[X(X-1)\cdots(X-r+1)]=G_X^{(r)}(1).$$
$r=2$ では $E[X(X-1)]=G_X''(1)$ となる。

## 計算例
$$G_X'(s)=\lambda e^{\lambda(s-1)},$$
$$G_X''(s)=\lambda^2e^{\lambda(s-1)}.$$
したがって
$$E[X(X-1)]=G_X''(1)=\lambda^2.$$
$\lambda=2$ なら値は4である。

## 一手
確率母関数の $r$ 階微分は下降階乗のモーメントを与える。

## 注意
$E[X^2]=\lambda^2$ ではなく、$E[X^2]=\lambda^2+\lambda$ である。

<!-- CARD -->
---
id: prob-pgf-validity
title: べき級数が確率母関数かを係数で判定する
category: math-probability
subcategory: math-distribution-functions
topic: pgf-validity
type: condition
difficulty: 2
priority: S
hashtags: [確率母関数, 係数, 正規化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$G(s)=1/2-s/4+3s^2/4$ は非負整数値確率変数の確率母関数になり得るか。

## 答え
$s$ の係数が負なので、確率母関数にはなり得ない。

## 使用公式・定理
確率母関数
$$G(s)=\sum_{k=0}^{\infty}p_ks^k$$
の係数は $p_k\ge0$ かつ $\sum_kp_k=G(1)=1$ を満たす。

## 計算例
この候補は
$$G(1)=\frac12-\frac14+\frac34=1$$
だが、$s$ の係数は $-1/4<0$ である。これは $P(X=1)$ になれないため不適格である。

## 一手
$G(1)=1$ だけでなく、全ての係数が非負か確認する。

## 注意
関数値が一部で正でも、負の係数は許されない。
