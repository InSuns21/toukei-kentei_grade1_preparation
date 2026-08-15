---
id: dist-basic-discrete-uniform
published: true
title: 離散一様分布の確率質量関数と特性値
category: math-distributions
subcategory: math-discrete-distributions
topic: discrete-uniform
type: recognition
difficulty: 1
priority: B
hashtags: [離散一様分布, 台, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
$X$ が $\{1,2,\ldots,m\}$ 上の離散一様分布に従うとき、確率質量関数を答えよ。

## 答え
$p_X(k)=\frac1m,\qquad k=1,\ldots,m.$

## 使用公式・定理
$$E[X]=\sum_{k=1}^m k p_X(k),\qquad \sum_{k=1}^m k=\frac{m(m+1)}2,$$
$$\sum_{k=1}^m k^2=\frac{m(m+1)(2m+1)}6.$$ 
## 計算例
$\sum_{k=1}^m p_X(k)=\sum_{k=1}^m\frac1m=1.$

## 一手
台が連続区間ではなく、等確率な有限個の整数であることを先に確認する。
## 注意
連続一様分布 $U(a,b)$ の密度と混同しない。

<!-- CARD -->
---
id: dist-bernoulli-definition
published: true
title: ベルヌーイ分布の確率質量関数を記述する
category: math-distributions
subcategory: math-discrete-distributions
topic: bernoulli
type: recognition
difficulty: 1
priority: B
hashtags: [ベルヌーイ分布, PMF, 成功確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベルヌーイ分布 }]
---
## 問題
成功確率 $p\in[0,1]$ のベルヌーイ分布に従う $X$ の台と確率質量関数を答えよ。
## 答え
台は $\{0,1\}$、確率質量関数は
$$p_X(x)=p^x(1-p)^{1-x},\qquad x\in\{0,1\}.$$
## 使用公式・定理
$$P(X=1)=p,\qquad P(X=0)=1-p.$$
## 計算例
$x=1$ なら $p_X(1)=p$、$x=0$ なら $p_X(0)=1-p$ となる。よって
$$\sum_{x=0}^1p_X(x)=p+(1-p)=1.$$
## 一手
0-1値の成功・失敗を見たらベルヌーイ分布を候補にする。
## 注意
$p$ は確率なので $0\le p\le1$。台を $\{1,2\}$ とする定義ではない。

<!-- CARD -->
---
id: dist-bernoulli-moments
published: true
title: ベルヌーイ分布の平均と分散を計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: bernoulli-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [ベルヌーイ分布, 期待値, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベルヌーイ分布 }]
---
## 問題
Bernoulli分布 $X\sim\operatorname{Bernoulli}(p)$ の $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
## 答え
$$E[X]=p,\qquad \operatorname{Var}(X)=p(1-p).$$
## 使用公式・定理
$$\operatorname{Var}(X)=E[X^2]-E[X]^2.$$
また $X\in\{0,1\}$ なので $X^2=X$。
## 計算例
$$E[X]=0(1-p)+1p=p,$$
$$E[X^2]=E[X]=p,$$
よって
$$\operatorname{Var}(X)=p-p^2=p(1-p).$$
例えば $p=0.2$ なら平均は $0.2$、分散は $0.2\times0.8=0.16$ である。
## 一手
0-1値なら $X^2=X$ を使って二次モーメントを一行で落とす。
## 注意
分散を $p^2(1-p)^2$ としない。標準偏差が $\sqrt{p(1-p)}$ である。

<!-- CARD -->
---
id: dist-binomial-definition
published: true
title: 二項分布の確率質量関数と試行条件
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial
type: recognition
difficulty: 1
priority: B
hashtags: [二項分布, PMF, 独立試行]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
独立なベルヌーイ試行を $n$ 回行い、各回の成功確率が $p$ である。成功回数 $X$ の分布を記述せよ。
## 答え
二項分布 $X\sim\operatorname{Binomial}(n,p)$、台は $\{0,1,\ldots,n\}$、
$$P(X=k)=\binom nkp^k(1-p)^{n-k}.$$
## 使用公式・定理
特定の $k$ 回が成功する確率は $p^k(1-p)^{n-k}$、その選び方が $\binom nk$ 通りある。
## 計算例
$n=4,p=1/2$ で $P(X=2)$ は
$$\binom42(1/2)^2(1/2)^2=6/16=3/8.$$
## 一手
「固定回数」「独立」「同じ成功確率」「成功回数」の4条件を確認する。
## 注意
試行回数がランダム、または非復元抽出なら二項分布ではない。

<!-- CARD -->
---
id: dist-binomial-moments
published: true
title: 二項分布の平均と分散を再生する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [二項分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ の平均と分散を求めよ。
## 答え
$$E[X]=np,\qquad \operatorname{Var}(X)=np(1-p).$$
## 使用公式・定理
$X=I_1+\cdots+I_n$ と表し、$I_i\sim\operatorname{Bernoulli}(p)$ が独立であることを使う。
## 計算例
$$E[X]=\sum_{i=1}^nE[I_i]=np,$$
$$\operatorname{Var}(X)=\sum_{i=1}^n\operatorname{Var}(I_i)=np(1-p).$$
$n=10,p=0.3$ なら平均は3、分散は $10\times0.3\times0.7=2.1$ である。
## 一手
二項分布をベルヌーイ指示変数の和へ戻す。
## 注意
分散は $np^2(1-p)^2$ ではない。独立性があるから共分散項が消える。

<!-- CARD -->
---
id: dist-binomial-ratio
published: true
title: 二項分布の隣接確率比から最頻値を判定する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-mode
type: calc_step
difficulty: 2
priority: B
hashtags: [二項分布, 最頻値, 隣接比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
二項分布 $n\ge1$、$0<p<1$ とし、二項分布 $X\sim\operatorname{Binomial}(n,p)$ とする。$P(X=k+1)/P(X=k)$ を求め、最頻値を判定する規則を述べよ。
## 答え
$$\frac{P(X=k+1)}{P(X=k)}=\frac{n-k}{k+1}\frac{p}{1-p}.$$
通常の一意な最頻値は $\lfloor(n+1)p\rfloor$。$(n+1)p$ が整数 $m$ のときは $m-1$ と $m$ の2つが最頻値である。
## 使用公式・定理
$$\frac{\binom n{k+1}}{\binom nk}=\frac{n-k}{k+1}.$$
## 計算例
比が1以上の範囲では確率が増加し、1未満では減少する。比を1以上とすると
$$\frac{n-k}{k+1}\frac p{1-p}\ge1
\Longleftrightarrow k\le(n+1)p-1.$$
したがって確率が頂点を越える位置を確認できる。
## 一手
最頻値は微分でなく、隣接確率比と1の比較で決める。
## 注意
二項分布の平均 $np$ と最頻値は一般に一致しない。

<!-- CARD -->
---
id: dist-binomial-complement-tail
published: true
title: 二項分布の上側確率を補集合で計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-tail
type: calc_step
difficulty: 1
priority: B
hashtags: [二項分布, 上側確率, 補集合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(10,0.2)$ に対し $P(X\ge2)$ を求めよ。
## 答え
$$P(X\ge2)=1-P(X=0)-P(X=1)=1-0.8^{10}-10(0.2)(0.8)^9.$$
## 使用公式・定理
$$P(X\ge r)=1-P(X\le r-1).$$
## 計算例
$P(X=0)=0.8^{10}$、$P(X=1)=10(0.2)(0.8)^9$ なので上式になる。数値はおよそ $0.6242$ である。
## 一手
小さい側の項数が少ないときは、上側確率を補集合にする。
## 注意
$P(X\ge2)$ と $P(X>2)$ は異なる。整数値では $P(X\ge2)=1-P(X\le1)$。

<!-- CARD -->
---
id: dist-binomial-bernoulli-sum
published: true
title: 二項分布をベルヌーイ分布の和として扱う
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-representation
type: expansion
difficulty: 2
priority: B
hashtags: [二項分布, ベルヌーイ分布, 指示変数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
成功回数 $X$ を独立なベルヌーイ指示変数の和で表し、この表現から平均・分散を説明せよ。
## 答え
$$X=\sum_{i=1}^nI_i,\qquad I_i\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Bernoulli}(p).$$
したがって $E[X]=np$、$\operatorname{Var}(X)=np(1-p)$。
## 使用公式・定理
期待値の線形性と、独立変数の和の分散公式
$$\operatorname{Var}\left(\sum_iI_i\right)=\sum_i\operatorname{Var}(I_i)$$
を使う。
## 計算例
各 $I_i$ は成功なら1、失敗なら0なので和が成功回数になる。独立性より
$$E[X]=nE[I_1]=np,$$
$$\operatorname{Var}(X)=n\operatorname{Var}(I_1)=np(1-p).$$
## 一手
分布名を覚えるだけでなく、指示変数の和へ分解して計算する。
## 注意
独立でなければ分散に共分散項が残る。

<!-- CARD -->
---
id: dist-hypergeometric-definition
published: true
title: 超幾何分布の確率質量関数を記述する
category: math-distributions
subcategory: math-discrete-distributions
topic: hypergeometric
type: recognition
difficulty: 2
priority: B
hashtags: [超幾何分布, 非復元抽出, PMF]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 超幾何分布 }]
---
## 問題
$N$ 個中 $K$ 個が成功である母集団から、非復元で $n$ 個を抽出する。成功個数 $X$ の確率質量関数を答えよ。
## 答え
$$P(X=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn},$$
$$\max(0,n-(N-K))\le k\le\min(n,K).$$
## 使用公式・定理
分母は全ての $n$ 個の組合せ、分子は成功 $k$ 個と失敗 $n-k$ 個の組合せである。
## 計算例
$N=10,K=4,n=3$ のとき $P(X=2)$ は
$$\frac{\binom42\binom63}{\binom{10}3}=\frac{6\times20}{120}=\frac12.$$
## 一手
非復元抽出なら、成功側と失敗側を組合せで数える。
## 注意
復元抽出で各回の成功確率が一定なら二項分布になる。

<!-- CARD -->
---
id: dist-hypergeometric-moments
published: true
title: 超幾何分布の平均と有限母集団補正
category: math-distributions
subcategory: math-discrete-distributions
topic: hypergeometric-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [超幾何分布, 平均, 有限母集団補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 超幾何分布 }]
---
## 問題
$X\sim\operatorname{Hypergeometric}(N,K,n)$ の平均と分散を答えよ。
## 答え
$$E[X]=n\frac KN,$$
$$\operatorname{Var}(X)=n\frac KN\left(1-\frac KN\right)\frac{N-n}{N-1}.$$
## 使用公式・定理
非復元抽出では、二項分布の分散に有限母集団補正 $(N-n)/(N-1)$ が掛かる。
## 計算例
$N=100,K=30,n=10$ なら
$$E[X]=10(0.3)=3,$$
$$\operatorname{Var}(X)=10(0.3)(0.7)\frac{90}{99}=\frac{21}{11}\approx1.909.$$
## 一手
成功割合 $K/N$ をまず置き、最後に有限母集団補正を掛ける。
## 注意
$N\to\infty$ では補正が1に近づき、二項分布の分散に近づく。

<!-- CARD -->
---
id: dist-hypergeometric-binomial-choice
published: true
title: 超幾何分布と二項分布の使い分けを判定する
category: math-distributions
subcategory: math-discrete-distributions
topic: hypergeometric-vs-binomial
type: recognition
difficulty: 2
priority: B
hashtags: [超幾何分布, 二項分布, 復元抽出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 超幾何分布 }]
---
## 問題
次の抽出を二項分布または超幾何分布に分類せよ。A: 毎回独立に戻す。B: 一度取り出した個体を戻さない。
## 答え
A は二項分布、B は超幾何分布。
## 使用公式・定理
二項分布は各試行で成功確率が一定の独立試行。超幾何分布は有限母集団からの非復元抽出。
## 計算例
A では各回の成功確率が $K/N$ で変わらず、$X\sim\operatorname{Binomial}(n,K/N)$。B では残りの構成が変わり、$X\sim\operatorname{Hypergeometric}(N,K,n)$。
## 一手
「戻すか戻さないか」を最初に確認する。
## 注意
抽出率が小さいと超幾何分布を二項分布で近似できるが、厳密には別分布である。

<!-- CARD -->
---
id: dist-geometric-definition
published: true
title: 幾何分布の台と確率質量関数を再生する
category: math-distributions
subcategory: math-discrete-distributions
topic: geometric
type: recognition
difficulty: 1
priority: B
hashtags: [幾何分布, 初成功, 台]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 幾何分布 }]
---
## 問題
成功確率 $p\in(0,1]$ の独立試行で、初めて成功するまでの試行回数を $X$ とする。$X$ の分布を答えよ。
## 答え
台は $\{1,2,\ldots\}$、
$$P(X=k)=(1-p)^{k-1}p,\qquad k=1,2,\ldots.$$
## 使用公式・定理
最初の $k-1$ 回が失敗し、$k$ 回目が成功する確率を掛ける。
## 計算例
$p=0.25$ なら $P(X=3)=0.75^2\times0.25=0.140625$。
## 一手
「初めての成功までの試行回数」は台が1始まりの幾何分布。
## 注意
失敗回数を数える流儀では台が $\{0,1,\ldots\}$ になり、式が1つずれる。この教材では1始まりで統一する。

<!-- CARD -->
---
id: dist-geometric-memoryless
published: true
title: 幾何分布の無記憶性を確率計算に使う
category: math-distributions
subcategory: math-discrete-distributions
topic: geometric-memoryless
type: calc_step
difficulty: 2
priority: B
hashtags: [幾何分布, 無記憶性, 条件付き確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 幾何分布 }]
---
## 問題
$X\sim\operatorname{Geometric}(p)$（台は1始まり）について、$P(X>m+n\mid X>m)$ を求めよ。
## 答え
$$P(X>m+n\mid X>m)=(1-p)^n=P(X>n).$$
## 使用公式・定理
$$P(X>r)=(1-p)^r,
\qquad P(A\mid B)=\frac{P(A\cap B)}{P(B)}.$$
## 計算例
$m,n\ge0$ として
$$P(X>m+n\mid X>m)=\frac{(1-p)^{m+n}}{(1-p)^m}=(1-p)^n.$$
## 一手
条件 $X>m$ は「最初の $m$ 回が失敗」と読み替える。
## 注意
無記憶性は全ての離散分布にある性質ではなく、幾何分布の特徴である。

<!-- CARD -->
---
id: dist-geometric-moments
published: true
title: 幾何分布の平均と分散を計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: geometric-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [幾何分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 幾何分布 }]
---
## 問題
台を $\{1,2,\ldots\}$ とする $X\sim\operatorname{Geometric}(p)$ の平均と分散を答えよ。
## 答え
$$E[X]=\frac1p,\qquad \operatorname{Var}(X)=\frac{1-p}{p^2}.$$
## 使用公式・定理
$$\sum_{k=1}^{\infty}kr^{k-1}=\frac1{(1-r)^2},\qquad
\sum_{k=1}^{\infty}k^2r^{k-1}=\frac{1+r}{(1-r)^3}.$$
## 計算例
$r=1-p$ と置くと
$$E[X]=p\sum_{k=1}^{\infty}k(1-p)^{k-1}=p\frac1{p^2}=\frac1p.$$
二次モーメントから整理すると $E[X^2]=(2-p)/p^2$ なので
$$\operatorname{Var}(X)=\frac{2-p}{p^2}-\frac1{p^2}=\frac{1-p}{p^2}.$$
## 一手
台の定義を確認してから、平均が $1/p$ か $(1-p)/p$ かを決める。
## 注意
失敗回数版の幾何分布は平均・台が異なる。

<!-- CARD -->
---
id: dist-negative-binomial-definition
published: true
title: 負の二項分布を成功回数までの失敗回数で定義する
category: math-distributions
subcategory: math-discrete-distributions
topic: negative-binomial
type: recognition
difficulty: 2
priority: B
hashtags: [負の二項分布, PMF, 成功回数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 負の二項分布 }]
---
## 問題
成功確率 $p$ の独立試行を $r$ 回成功するまで続け、失敗回数を $Y$ とする。$Y$ の確率質量関数を答えよ。
## 答え
台は $\{0,1,\ldots\}$、
$$P(Y=k)=\binom{k+r-1}{k}p^r(1-p)^k.$$
## 使用公式・定理
最後の試行を成功と固定し、それ以前の $k+r-1$ 回に成功 $r-1$ 回・失敗 $k$ 回を配置する。
## 計算例
$r=2,k=1$ なら
$$P(Y=1)=\binom21p^2(1-p)=2p^2(1-p).$$
## 一手
「$r$ 回目の成功が最後」「それまでに失敗 $k$ 回」と分解する。
## 注意
負の二項分布には、成功回数を数える流儀など別のパラメータ化がある。ここでは失敗回数を数える。

<!-- CARD -->
---
id: dist-negative-binomial-moments
published: true
title: 負の二項分布の平均と分散を再生する
category: math-distributions
subcategory: math-discrete-distributions
topic: negative-binomial-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [負の二項分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 負の二項分布 }]
---
## 問題
成功確率 $0<p<1$ の独立試行を $r\in\mathbb N$ 回成功するまで続け、失敗回数を $Y$ とする。この $Y$ の平均と分散を求めよ。
## 答え
$$E[Y]=\frac{r(1-p)}p,\qquad \operatorname{Var}(Y)=\frac{r(1-p)}{p^2}.$$
## 使用公式・定理
$Y$ を、$r$ 個の独立な「成功までの失敗回数」の和として表す。
## 計算例
$G_i$ を台1始まりの幾何分布とすると
$$Y=\sum_{i=1}^r(G_i-1).$$
よって
$$E[Y]=r\left(\frac1p-1\right)=\frac{r(1-p)}p,$$
$$\operatorname{Var}(Y)=r\frac{1-p}{p^2}.$$
## 一手
負の二項分布を幾何分布の和へ分解する。
## 注意
試行回数全体 $Y+r$ の平均は $r/p$ であり、失敗回数 $Y$ の平均とは違う。

<!-- CARD -->
---
id: dist-poisson-definition
published: true
title: ポアソン分布の確率質量関数と台を記述する
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson
type: recognition
difficulty: 1
priority: B
hashtags: [ポアソン分布, PMF, 発生回数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
強度 $\lambda>0$ のポアソン分布の台と確率質量関数を答えよ。
## 答え
台は $\{0,1,2,\ldots\}$、
$$P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots.$$
## 使用公式・定理
指数級数
$$\sum_{k=0}^{\infty}\frac{\lambda^k}{k!}=e^\lambda$$
により正規化される。
## 計算例
$\lambda=2$ なら
$$P(X=0)=e^{-2},\qquad P(X=1)=2e^{-2},\qquad P(X=2)=2e^{-2}.$$
## 一手
単位区間・単位時間の「まれな発生回数」で、平均発生率が一定なら候補にする。
## 注意
$\lambda$ は確率ではなく、平均発生回数（強度）である。

<!-- CARD -->
---
id: dist-poisson-moments
published: true
title: ポアソン分布の平均と分散を求める
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [ポアソン分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
Poisson分布 $X\sim\operatorname{Poisson}(\lambda)$ の平均と分散を答えよ。
## 答え
$$E[X]=\lambda,\qquad \operatorname{Var}(X)=\lambda.$$
## 使用公式・定理
確率母関数は $G_X(s)=\exp\{\lambda(s-1)\}$。したがって $G_X'(1)=E[X]$、$G_X''(1)=E[X(X-1)]$。
## 計算例
$$G_X'(s)=\lambda e^{\lambda(s-1)},
\qquad G_X''(s)=\lambda^2e^{\lambda(s-1)}.$$
ゆえに $E[X]=\lambda$、$E[X^2]=\lambda^2+\lambda$、分散は $\lambda$。
## 一手
ポアソン分布は平均と分散が同じという特徴を使う。
## 注意
同じ平均でも二項・超幾何では分散が一般に異なる。

<!-- CARD -->
---
id: dist-poisson-ratio-mode
published: true
title: ポアソン分布の隣接確率比から最頻値を判定する
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-mode
type: calc_step
difficulty: 2
priority: B
hashtags: [ポアソン分布, 最頻値, 隣接比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
Poisson分布 $X\sim\operatorname{Poisson}(\lambda)$ について $P(X=k+1)/P(X=k)$ を求め、最頻値を述べよ。
## 答え
$$\frac{P(X=k+1)}{P(X=k)}=\frac{\lambda}{k+1}.$$
$\lambda$ が整数でなければ最頻値は $\lfloor\lambda\rfloor$、$\lambda$ が整数なら $\lambda-1$ と $\lambda$ の2つである。
## 使用公式・定理
$$\frac{e^{-\lambda}\lambda^{k+1}/(k+1)!}{e^{-\lambda}\lambda^k/k!}=\frac{\lambda}{k+1}.$$
## 計算例
$k+1<\lambda$ なら比は1より大きく、$k+1>\lambda$ なら1より小さい。したがって確率列は $\lambda$ の近くで最大になる。
## 一手
階乗の比を消去して隣接比だけを見る。
## 注意
$\lambda$ が整数のときの2峰性を落とさない。

<!-- CARD -->
---
id: dist-poisson-splitting
published: true
title: ポアソン分布の分割性を使う
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-splitting
type: theorem
difficulty: 2
priority: B
hashtags: [ポアソン分布, 分割, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
Poisson分布 $N\sim\operatorname{Poisson}(\lambda)$ の各発生を確率 $q$ で種類1、確率 $1-q$ で種類2に独立に分類する。分類後の個数の分布を答えよ。
## 答え
$$N_1\sim\operatorname{Poisson}(\lambda q),\qquad N_2\sim\operatorname{Poisson}(\lambda(1-q)),$$
しかも $N_1,N_2$ は独立である。
## 使用公式・定理
ポアソン分布の確率母関数 $G_N(s)=e^{\lambda(s-1)}$ と、独立な thinning の母関数を使う。
## 計算例
同時確率は
$$P(N_1=i,N_2=j)=e^{-\lambda}\frac{\lambda^{i+j}}{(i+j)!}\binom{i+j}{i}q^i(1-q)^j,$$
$$=e^{-\lambda q}\frac{(\lambda q)^i}{i!}\,e^{-\lambda(1-q)}\frac{(\lambda(1-q))^j}{j!}.$$
積に分解するので独立である。
## 一手
全体の発生を独立に分類する場合は、強度を確率で割り振る。
## 注意
分割前の合計は $N_1+N_2=N$。独立なのはPoisson分布の分割後の成分である。

<!-- CARD -->
---
id: dist-multinomial-definition
published: true
title: 多項分布の確率質量関数を記述する
category: math-distributions
subcategory: math-discrete-distributions
topic: multinomial
type: recognition
difficulty: 2
priority: B
hashtags: [多項分布, PMF, カテゴリー]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布 }]
---
## 問題
$n$ 回の独立試行を $d$ カテゴリーに分類し、カテゴリー $i$ の確率を $p_i$ とする。個数ベクトルの確率質量関数を答えよ。
## 答え
$p_i\ge0$、$\sum_{i=1}^dp_i=1$、$k_i\in\mathbb Z_{\ge0}$、$\sum_i k_i=n$ の下で（確率変数は $\sum_iX_i=n$ を満たす）、
$$P(X_1=k_1,\ldots,X_d=k_d)=\frac{n!}{\prod_{i=1}^dk_i!}\prod_{i=1}^dp_i^{k_i}.$$
## 使用公式・定理
同じ個数ベクトルを生む順序の数が $n!/(k_1!\cdots k_d!)$ 通り。
## 計算例
$n=3,d=3,(k_1,k_2,k_3)=(1,1,1)$ なら確率は
$$\frac{3!}{1!1!1!}p_1p_2p_3=6p_1p_2p_3.$$
## 一手
「カテゴリーごとの個数」と「合計が $n$」を確認して多項係数を付ける。
## 注意
各 $X_i$ は独立ではない。合計制約があるため共分散が負になる。

<!-- CARD -->
---
id: dist-multinomial-moments
published: true
title: 多項分布の分散と共分散を計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: multinomial-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [多項分布, 分散, 共分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布 }]
---
## 問題
$(X_1,\ldots,X_d)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_d)$ について $E[X_i]$、$\operatorname{Var}(X_i)$、$\operatorname{Cov}(X_i,X_j)$ $(i\ne j)$ を答えよ。
## 答え
$$E[X_i]=np_i,$$
$$\operatorname{Var}(X_i)=np_i(1-p_i),$$
$$\operatorname{Cov}(X_i,X_j)=-np_ip_j\quad(i\ne j).$$
## 使用公式・定理
各試行のカテゴリー指示変数を使う。異なるカテゴリーの同一試行では積が0になる。
## 計算例
$n=10,p_1=0.3,p_2=0.2$ なら
$$\operatorname{Var}(X_1)=10(0.3)(0.7)=2.1,$$
$$\operatorname{Cov}(X_1,X_2)=-10(0.3)(0.2)=-0.6.$$
## 一手
多項分布の各成分は二項分布だが、成分間は負に相関する。
## 注意
$\operatorname{Cov}(X_i,X_j)=0$ としない。合計が固定されている。

<!-- CARD -->
---
id: dist-multinomial-binomial-reduction
published: true
title: 多項分布の1カテゴリーを二項分布へ周辺化する
category: math-distributions
subcategory: math-discrete-distributions
topic: multinomial-reduction
type: calc_step
difficulty: 2
priority: B
hashtags: [多項分布, 二項分布, 周辺分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布 }]
---
## 問題
多項分布のカテゴリー1の個数 $X_1$ の周辺分布を求めよ。
## 答え
$$X_1\sim\operatorname{Binomial}(n,p_1).$$
## 使用公式・定理
カテゴリー1以外を「その他」にまとめると、各試行はカテゴリー1確率 $p_1$ の二値試行になる。
## 計算例
残りの確率は $1-p_1$ なので
$$P(X_1=k)=\binom nkp_1^k(1-p_1)^{n-k}.$$
多項確率を $k_2+\cdots+k_d=n-k$ について足し上げても同じ式になる。
## 一手
不要なカテゴリーをまとめて二値化する。
## 注意
複数カテゴリーの個数を同時に見る場合は独立な二項分布にはならない。

<!-- CARD -->
---
id: dist-discrete-identification
published: true
title: 離散型分布を状況から選択する
category: math-distributions
subcategory: math-discrete-distributions
topic: discrete-identification
type: recognition
difficulty: 1
priority: B
hashtags: [離散型分布, 分布選択, 条件判定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 離散型分布 }]
---
## 問題
次の状況に対応する分布を選べ。
1. 固定 $n$ 回の独立試行の成功回数。
2. 有限母集団から非復元で $n$ 個を取り出した成功回数。
3. まれな発生の一定区間内の回数。
4. 初めて成功するまでの試行回数。
## 答え
1. 二項分布、2. 超幾何分布、3. ポアソン分布、4. 幾何分布。
## 使用公式・定理
二項は固定回数、超幾何は非復元、ポアソンは発生回数、幾何は初成功までの待ち回数という対応を使う。
## 計算例
「戻さない」なら試行が独立でなくなるので超幾何。「何回目に初成功か」なら値の上限がなく幾何である。
## 一手
回数の上限、復元の有無、待ち時間か発生数かを順に確認する。
## 注意
分布名だけでなく台を確認すると誤選択が減る。

<!-- CARD -->
---
id: dist-bernoulli-complement
published: true
title: ベルヌーイ分布の補集合確率を使う
category: math-distributions
subcategory: math-discrete-distributions
topic: bernoulli-complement
type: calc_step
difficulty: 1
priority: B
hashtags: [ベルヌーイ分布, 補集合, 確率計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベルヌーイ分布 }]
---
## 問題
Bernoulli分布 $X\sim\operatorname{Bernoulli}(p)$ に対し、$P(X=0)$、$P(X\ge1)$、$P(X=1\mid X\ge1)$ を求めよ。
## 答え
$$P(X=0)=1-p,\qquad P(X\ge1)=p,\qquad P(X=1\mid X\ge1)=1.$$
## 使用公式・定理
台が $\{0,1\}$ なので $X\ge1$ は $X=1$ と同じ事象である。
## 計算例
$$P(X=1\mid X\ge1)=\frac{P(X=1)}{P(X\ge1)}=\frac p p=1\quad(p>0).$$
## 一手
0-1値では不等式を台の事象へ置き換える。
## 注意
$p=0$ のとき条件付き確率の分母が0になり、条件付き確率は定義しない。

<!-- CARD -->
---
id: dist-binomial-factorial-moment
published: true
title: 二項分布の階乗モーメントを計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: binomial-factorial-moment
type: calc_step
difficulty: 2
priority: B
hashtags: [二項分布, 階乗モーメント, 期待値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布 }]
---
## 問題
二項分布 $X\sim\operatorname{Binomial}(n,p)$ に対して $E[X(X-1)]$ を求めよ。
## 答え
$$E[X(X-1)]=n(n-1)p^2.$$
## 使用公式・定理
$X=\sum_{i=1}^nI_i$ とすると
$$X(X-1)=\sum_{i\ne j}I_iI_j.$$
## 計算例
異なる2試行がともに成功する確率は $p^2$ で、その順序付き組が $n(n-1)$ 個ある。したがって
$$E[X(X-1)]=\sum_{i\ne j}E[I_iI_j]=n(n-1)p^2.$$
## 一手
$X(X-1)$ は成功した順序付き2組を数えると解釈する。
## 注意
$E[X^2]$ ではなく階乗モーメントである。$E[X^2]=n(n-1)p^2+np$。

<!-- CARD -->
---
id: dist-continuous-uniform-definition
published: true
title: 連続一様分布の確率密度関数を記述する
category: math-distributions
subcategory: math-continuous-distributions
topic: continuous-uniform
type: recognition
difficulty: 1
priority: B
hashtags: [連続一様分布, PDF]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
$a<b$ の連続一様分布 $U(a,b)$ の確率密度関数を答えよ。

## 答え
$f_X(x)=\frac1{b-a}\boldsymbol{1}_{[a,b]}(x).$

## 使用公式・定理
密度の積分が1になること：$\int_a^b(b-a)^{-1}dx=1$。
## 計算例
$\int_{-\infty}^{\infty}f_X(x)dx=\int_a^b\frac{dx}{b-a}=1.$

## 一手
台の外では密度0、台の内では一定と分けて書く。
## 注意
離散一様分布の確率質量関数と区別する。

<!-- CARD -->
---
id: dist-continuous-uniform-moments
published: true
title: 連続一様分布の平均と分散を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: continuous-uniform-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [連続一様分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
一様分布 $X\sim U(a,b)$ の平均と分散を求めよ。
## 答え
$$E[X]=\frac{a+b}{2},\qquad \operatorname{Var}(X)=\frac{(b-a)^2}{12}.$$
## 使用公式・定理
$$E[X]=\int_a^bx\frac{dx}{b-a},\qquad E[X^2]=\int_a^bx^2\frac{dx}{b-a}.$$
## 計算例
$$E[X]=\frac{b^2-a^2}{2(b-a)}=\frac{a+b}{2},$$
$$E[X^2]=\frac{b^3-a^3}{3(b-a)}=\frac{a^2+ab+b^2}{3}.$$
差を取ると $(b-a)^2/12$ になる。
## 一手
一次・二次モーメントを積分してから分散公式に入れる。
## 注意
第2引数は分散である正規分布の記法とは無関係で、ここでは区間端点 $a,b$ を使う。

<!-- CARD -->
---
id: dist-continuous-uniform-interval
published: true
title: 連続一様分布の区間確率を長さで求める
category: math-distributions
subcategory: math-continuous-distributions
topic: continuous-uniform-probability
type: calc_step
difficulty: 1
priority: B
hashtags: [連続一様分布, 区間確率, 長さ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
一様分布 $X\sim U(0,10)$ に対し $P(2<X\le7)$ を求めよ。
## 答え
$$P(2<X\le7)=\frac{7-2}{10}=\frac12.$$
## 使用公式・定理
連続一様分布では、台の中の区間確率は区間長を全体の長さで割る。
## 計算例
区間 $(2,7]$ の長さは5、台 $[0,10]$ の長さは10。端点の確率は0なので開閉は結果を変えない。
## 一手
区間の長さを先に計算する。
## 注意
区間が台の外にはみ出すときは、台との共通部分で計算する。

<!-- CARD -->
---
id: dist-normal-definition
published: true
title: 正規分布の密度とパラメータを記述する
category: math-distributions
subcategory: math-continuous-distributions
topic: normal
type: recognition
difficulty: 1
priority: B
hashtags: [正規分布, ガウス分布, PDF]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
正規分布 $N(\mu,\sigma^2)$ の密度、台、パラメータ条件を答えよ。

## 答え
台は $\mathbb R$、$\sigma>0$、$f_X(x)=\frac1{\sqrt{2\pi}\sigma}\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.$

## 使用公式・定理
$$\int_{-\infty}^{\infty}e^{-z^2/2}dz=\sqrt{2\pi}.$$
## 計算例
$N(3,4)$ は $\mu=3$、$\sigma^2=4$、したがって $\sigma=2$ である。

## 一手
第2引数は標準偏差でなく分散 $\sigma^2$ と確認する。
## 注意
正規分布の密度は全実数で正であり、台を有限区間としない。

<!-- CARD -->
---
id: dist-normal-standardize
published: true
title: 正規分布を標準化して確率を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-standardization
type: calc_step
difficulty: 1
priority: B
hashtags: [正規分布, 標準化, 標準正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$ に対し $P(a<X\le b)$ を標準正規分布のCDF $\Phi$ で表せ。
## 答え
$$P(a<X\le b)=\Phi\left(\frac{b-\mu}{\sigma}\right)-\Phi\left(\frac{a-\mu}{\sigma}\right).$$
## 使用公式・定理
$$Z=\frac{X-\mu}{\sigma}\sim N(0,1).$$
## 計算例
正規分布 $X\sim N(10,4)$ で $P(8<X\le12)$ は
$$\Phi(1)-\Phi(-1)=2\Phi(1)-1.$$
## 一手
両端から平均を引き、標準偏差で割る。
## 注意
分散4で割らず標準偏差2で割る。

<!-- CARD -->
---
id: dist-normal-symmetry
published: true
title: 正規分布の対称性で両側確率を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-symmetry
type: calc_step
difficulty: 1
priority: B
hashtags: [正規分布, 対称性, 両側確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$、$c\ge0$ に対し $P(|X-\mu|\le c)$ を求めよ。
## 答え
$$P(|X-\mu|\le c)=2\Phi(c/\sigma)-1.$$
## 使用公式・定理
標準正規分布の対称性 $\Phi(-z)=1-\Phi(z)$ を使う。
## 計算例
$$P(|X-\mu|\le c)=P(-c/\sigma\le Z\le c/\sigma)$$
$$=\Phi(c/\sigma)-\Phi(-c/\sigma)=2\Phi(c/\sigma)-1.$$
## 一手
中心からの距離を標準化してから対称性を使う。
## 注意
$P(X\le\mu+c)$ だけでは両側確率にならない。

<!-- CARD -->
---
id: dist-normal-linear-transform
published: true
title: 正規分布の線形変換後の分布を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-linear-transform
type: calc_step
difficulty: 1
priority: B
hashtags: [正規分布, 線形変換, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$、$a\ne0$、$Y=aX+b$ の分布を答えよ。
## 答え
$Y\sim N(a\mu+b,a^2\sigma^2).$
$a=0$ のときは $Y=b$ という退化分布になる。
## 使用公式・定理
期待値の線形性と $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$。
## 計算例
正規分布 $X\sim N(2,9)$、$Y=-X+4$ なら
$$Y\sim N(2,9).$$
平均は $-2+4=2$、分散は $(-1)^2\times9=9$。
## 一手
平均は $a\mu+b$、分散は $a^2\sigma^2$ と別々に計算する。
## 注意
分散に $b$ は入らず、係数 $a$ は二乗される。

<!-- CARD -->
---
id: dist-normal-sum
published: true
title: 独立な正規分布の和の分布を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-sum
type: theorem
difficulty: 2
priority: B
hashtags: [正規分布, 和, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
独立な正規分布 $X_i\sim N(\mu_i,\sigma_i^2)$ $(i=1,\ldots,n)$ について $\sum_i a_iX_i$ の分布を答えよ。
## 答え
$$\sum_{i=1}^na_iX_i\sim N\left(\sum_{i=1}^na_i\mu_i,\sum_{i=1}^na_i^2\sigma_i^2\right).$$
## 使用公式・定理
独立なら和の分散は分散の和であり、正規分布は線形結合で閉じている。
## 計算例
正規分布 $X\sim N(1,4),Y\sim N(3,9)$ 独立なら $X-2Y$ は
$$N(1-6,4+4\times9)=N(-5,40).$$
## 一手
係数を平均には1乗、分散には2乗で入れる。
## 注意
独立性がないと分散に $2a_ia_j\operatorname{Cov}(X_i,X_j)$ が加わる。

<!-- CARD -->
---
id: dist-exponential-definition
published: true
title: 指数分布の密度・CDF・生存関数
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential
type: recognition
difficulty: 1
priority: B
hashtags: [指数分布, PDF, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布 }]
---
## 問題
率 $\lambda>0$ の指数分布の確率密度関数を答えよ。

## 答え
台は $x\ge0$、$x<0$ では $f_X(x)=0$、$f_X(x)=\lambda e^{-\lambda x}\quad(x\ge0).$

## 使用公式・定理
$$F_X(x)=\int_0^x\lambda e^{-\lambda u}du.$$
## 計算例
$\int_0^\infty\lambda e^{-\lambda x}dx=1.$

## 一手
指数分布では生存関数が最も簡単な形 $e^{-\lambda x}$ になる。
## 注意
率 $\lambda$ と平均 $1/\lambda$ を逆にしない。

<!-- CARD -->
---
id: dist-exponential-moments
published: true
title: 指数分布の平均と分散を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [指数分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布 }]
---
## 問題
指数分布 $X\sim\operatorname{Exponential}(\lambda)$ の平均と分散を求めよ。
## 答え
$$E[X]=\frac1\lambda,\qquad \operatorname{Var}(X)=\frac1{\lambda^2}.$$
## 使用公式・定理
$$\int_0^\infty xe^{-\lambda x}dx=\frac1{\lambda^2},\qquad
\int_0^\infty x^2e^{-\lambda x}dx=\frac2{\lambda^3}.$$
## 計算例
$$E[X]=\int_0^\infty x\lambda e^{-\lambda x}dx=\frac1\lambda,$$
$$E[X^2]=\lambda\frac2{\lambda^3}=\frac2{\lambda^2},$$
ゆえに分散は $2/\lambda^2-1/\lambda^2=1/\lambda^2$。
## 一手
率の逆数が平均、率の二乗の逆数が分散。
## 注意
標準偏差も $1/\lambda$ だが、分散は $1/\lambda^2$。

<!-- CARD -->
---
id: dist-exponential-memoryless
published: true
title: 指数分布の無記憶性を確率計算に使う
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential-memoryless
type: theorem
difficulty: 2
priority: B
hashtags: [指数分布, 無記憶性, 条件付き確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布 }]
---
## 問題
指数分布 $X\sim\operatorname{Exponential}(\lambda)$ について $P(X>s+t\mid X>s)$ を求めよ。
## 答え
$$P(X>s+t\mid X>s)=e^{-\lambda t}=P(X>t).$$
## 使用公式・定理
$$P(X>s+t\mid X>s)=\frac{S_X(s+t)}{S_X(s)}.$$
## 計算例
$$\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}.$$
## 一手
生存関数の比を取る。
## 注意
無記憶性は指数分布と幾何分布に共通するが、一般の寿命分布にはない。

<!-- CARD -->
---
id: dist-exponential-hazard
published: true
title: 指数分布の危険率が一定であることを確認する
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential-hazard
type: calc_step
difficulty: 2
priority: B
hashtags: [指数分布, 危険率, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布 }]
---
## 問題
指数分布の危険率 $h_X(x)$ を求めよ。
## 答え
$$h_X(x)=\lambda.$$
## 使用公式・定理
$$h_X(x)=\frac{f_X(x)}{S_X(x)}.$$
## 計算例
$$h_X(x)=\frac{\lambda e^{-\lambda x}}{e^{-\lambda x}}=\lambda.$$
## 一手
密度を生存関数で割る。
## 注意
危険率は確率そのものではなく、単位時間あたりの瞬間的な発生率である。

<!-- CARD -->
---
id: dist-gamma-definition
published: true
title: Gamma分布のshape-rate密度を記述する
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma
type: recognition
difficulty: 2
priority: B
hashtags: [Gamma分布, shape-rate, PDF]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布 }]
---
## 問題
shape-rate表示 $\operatorname{Gamma}(\alpha,\beta)$ の密度と台を答えよ。
## 答え
台は $x>0$（$x\le0$ では $f_X(x)=0$）、
$$f_X(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x},\qquad \alpha,\beta>0,$$
## 使用公式・定理
$$\Gamma(\alpha)=\int_0^\infty u^{\alpha-1}e^{-u}du.$$
## 計算例
$\alpha=1$ なら $f_X(x)=\beta e^{-\beta x}$ となり、率 $\beta$ の指数分布に一致する。
## 一手
この教材では第2引数をrate $\beta$ と固定する。
## 注意
scale表示では第2引数が $1/\beta$ になるため、文献の表示を確認する。

<!-- CARD -->
---
id: dist-gamma-moments
published: true
title: Gamma分布の平均と分散からshape-rateを読み取る
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [Gamma分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布 }]
---
## 問題
$X\sim\operatorname{Gamma}(\alpha,\beta)$ について $E[X]$ と $\operatorname{Var}(X)$ を使い、$\alpha=3,\beta=2$ の値を求めよ。
## 答え
$$E[X]=\frac32,\qquad \operatorname{Var}(X)=\frac34.$$
## 使用公式・定理
$$E[X]=\frac\alpha\beta,\qquad \operatorname{Var}(X)=\frac\alpha{\beta^2}.$$
## 計算例
$$E[X]=3/2,\qquad \operatorname{Var}(X)=3/2^2=3/4.$$
## 一手
平均はrateで1回割り、分散はrateで2回割る。
## 注意
第2引数をscaleと誤読すると平均が6になってしまう。

<!-- CARD -->
---
id: dist-gamma-sum-exponential
published: true
title: 同率指数分布の和をGamma分布に結び付ける
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-sum
type: theorem
difficulty: 2
priority: B
hashtags: [Gamma分布, 指数分布, 和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布 }]
---
## 問題
独立な $X_i\sim\operatorname{Exponential}(\beta)$ $(i=1,\ldots,r)$ の和 $T=\sum_iX_i$ の分布を答えよ。
## 答え
$$T\sim\operatorname{Gamma}(r,\beta)$$
（shape-rate表示）。
## 使用公式・定理
指数分布のモーメント母関数は $M_X(t)=\beta/(\beta-t)$ $(t<\beta)$。独立和では母関数を掛ける。
## 計算例
$$M_T(t)=\left(\frac\beta{\beta-t}\right)^r,$$
これは $\operatorname{Gamma}(r,\beta)$ の母関数である。
## 一手
同じrateの指数待ち時間を足したらshapeが個数分だけ増える。
## 注意
rateが異なる指数分布の和は一般に単純なGamma分布ではない。

<!-- CARD -->
---
id: dist-beta-definition
published: true
title: Beta分布の密度と台を記述する
category: math-distributions
subcategory: math-continuous-distributions
topic: beta
type: recognition
difficulty: 2
priority: B
hashtags: [Beta分布, PDF, 台]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベータ分布 }]
---
## 問題
Beta分布 $\operatorname{Beta}(\alpha,\beta)$ の密度と台を答えよ。
## 答え
台は $0<x<1$（$x\notin(0,1)$ では $f_X(x)=0$）、
$$f_X(x)=\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1},\qquad \alpha,\beta>0.$$
## 使用公式・定理
Beta関数
$$B(\alpha,\beta)=\int_0^1x^{\alpha-1}(1-x)^{\beta-1}dx=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}.$$
## 計算例
$\alpha=\beta=1$ なら密度は1で、$U(0,1)$ に一致する。
## 一手
台が $(0,1)$ の比率・確率・確率パラメータならBeta分布を候補にする。
## 注意
Beta分布の第2パラメータはrateではなく、もう一つのshapeである。

<!-- CARD -->
---
id: dist-beta-moments
published: true
title: Beta分布の平均と分散を計算する
category: math-distributions
subcategory: math-continuous-distributions
topic: beta-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [Beta分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベータ分布 }]
---
## 問題
Beta分布 $X\sim\operatorname{Beta}(\alpha,\beta)$ の平均と分散を答え、$\alpha=2,\beta=3$ の値を計算せよ。
## 答え
$$E[X]=\frac\alpha{\alpha+\beta},$$
$$\operatorname{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.$$
$\alpha=2,\beta=3$ では平均 $2/5$、分散 $6/(25\times6)=1/25$。
## 使用公式・定理
Beta積分の比から $E[X]$ と $E[X^2]$ を得て分散公式を使う。
## 計算例
$$E[X]=2/5,\qquad \operatorname{Var}(X)=\frac{2\cdot3}{5^2\cdot6}=\frac1{25}.$$
## 一手
分母を $(\alpha+\beta)^2(\alpha+\beta+1)$ とまとめる。
## 注意
平均は $\alpha/(\alpha+\beta)$ であり、単純に $\alpha/\beta$ ではない。

<!-- CARD -->
---
id: dist-cauchy-no-moments
published: true
title: Cauchy分布で平均・分散が存在しないことを判定する
category: math-distributions
subcategory: math-continuous-distributions
topic: cauchy
type: recognition
difficulty: 2
priority: B
hashtags: [Cauchy分布, 平均, 分散, 存在性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: コーシー分布 }]
---
## 問題
標準Cauchy分布の密度
$f(x)=\frac1{\pi(1+x^2)}$
について、平均と分散の存在を判定せよ。
## 答え
平均も分散も存在しない。$E[|X|]$ が有限でなく、したがって通常の平均が定義できない。
## 使用公式・定理
$|x|f(x)$ は大きい $|x|$ で $1/(\pi|x|)$ に近く、その積分は発散する。
## 計算例
$$\int_1^\infty xf(x)dx=\frac1\pi\int_1^\infty\frac{x}{1+x^2}dx$$
$$=\frac1{2\pi}[\log(1+x^2)]_1^\infty=\infty.$$
## 一手
特性値を計算する前に、絶対可積分性を確認する。
## 注意
対称性による主値0を期待値の存在と取り違えない。

<!-- CARD -->
---
id: dist-lognormal-transformation
published: true
title: 対数正規分布を正規分布の指数変換として記述する
category: math-distributions
subcategory: math-continuous-distributions
topic: lognormal
type: expansion
difficulty: 2
priority: B
hashtags: [対数正規分布, 変数変換, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数正規分布 }]
---
## 問題
正規分布 $Y\sim N(\mu,\sigma^2)$、$X=e^Y$ とする。$X$ の密度を求めよ。
## 答え
台は $x>0$、
$$f_X(x)=\frac1{x\sigma\sqrt{2\pi}}\exp\left\{-\frac{(\log x-\mu)^2}{2\sigma^2}\right\}.$$
## 使用公式・定理
単調変換 $y=\log x$ のJacobianは $dy/dx=1/x$。
## 計算例
$$f_X(x)=f_Y(\log x)\left|\frac{d}{dx}\log x\right|$$
$$=\frac1{\sigma\sqrt{2\pi}}e^{-(\log x-\mu)^2/(2\sigma^2)}\frac1x.$$
## 一手
指数変換では逆変換 $y=\log x$ とJacobian $1/x$ を書く。
## 注意
台は全実数ではなく正の実数である。

<!-- CARD -->
---
id: dist-lognormal-moments
published: true
title: 対数正規分布の平均と分散を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: lognormal-moments
type: calc_step
difficulty: 2
priority: B
hashtags: [対数正規分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数正規分布 }]
---
## 問題
正規分布 $Y\sim N(\mu,\sigma^2)$、$X=e^Y$ の平均と分散を答えよ。
## 答え
$$E[X]=e^{\mu+\sigma^2/2},$$
$$\operatorname{Var}(X)=(e^{\sigma^2}-1)e^{2\mu+\sigma^2},$$
## 使用公式・定理
正規分布のMGF $M_Y(t)=e^{\mu t+\sigma^2t^2/2}$ を $t=1,2$ で使う。
## 計算例
$$E[X]=E[e^Y]=M_Y(1)=e^{\mu+\sigma^2/2},$$
$$E[X^2]=M_Y(2)=e^{2\mu+2\sigma^2}.$$
差を取ると分散式になる。
## 一手
$X=e^Y$ なら $E[X^r]=M_Y(r)$ と置く。
## 注意
平均は単純に $e^\mu$ ではなく、分散パラメータの影響を受ける。

<!-- CARD -->
---
id: dist-weibull-survival-hazard
published: true
title: Weibull分布の生存関数と危険率を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: weibull
type: calc_step
difficulty: 2
priority: B
hashtags: [Weibull分布, 生存関数, 危険率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Weibull分布 }]
---
## 問題
shape $k>0$、scale $\lambda>0$ のWeibull分布のCDF、生存関数、危険率を答えよ。
## 答え
$$F(x)=1-e^{-(x/\lambda)^k},\qquad S(x)=e^{-(x/\lambda)^k},\quad x\ge0,$$
$$h(x)=\frac{k}{\lambda}\left(\frac{x}{\lambda}\right)^{k-1}.$$
## 使用公式・定理
$$h(x)=-\frac{d}{dx}\log S(x).$$
## 計算例
$$-\frac{d}{dx}\log S(x)=-\frac{d}{dx}\left[-(x/\lambda)^k\right]
=\frac{k}{\lambda}(x/\lambda)^{k-1}.$$
## 一手
まず生存関数を書き、対数微分して危険率を出す。
## 注意
$k=1$ なら指数分布、$k>1$ なら危険率増加、$k<1$ なら減少。

<!-- CARD -->
---
id: dist-weibull-mean
published: true
title: Weibull分布の平均をGamma関数で表す
category: math-distributions
subcategory: math-continuous-distributions
topic: weibull-moment
type: calc_step
difficulty: 2
priority: C
hashtags: [Weibull分布, 平均, Gamma関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ワイブル分布 }]
---
## 問題
shape $k>0$、scale $\lambda>0$ の密度 $f(x)=\frac{k}{\lambda}(x/\lambda)^{k-1}e^{-(x/\lambda)^k}$ $(x\ge0)$ を持つWeibull分布の平均を答えよ。
## 答え
$$E[X]=\lambda\Gamma\left(1+\frac1k\right).$$
## 使用公式・定理
$$\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}du.$$
## 計算例
密度は $f(x)=\frac{k}{\lambda}(x/\lambda)^{k-1}e^{-(x/\lambda)^k}$。$u=(x/\lambda)^k$ と置くと
$$E[X]=\lambda\int_0^\infty u^{1/k}e^{-u}du
=\lambda\Gamma(1+1/k).$$
## 一手
$u=(x/\lambda)^k$ の置換でGamma積分へ寄せる。
## 注意
$\lambda$ は平均ではなくscale。$k=1$ なら平均は $\lambda$ になる。

<!-- CARD -->
---
id: dist-logistic-definition
published: true
title: ロジスティック分布のCDF・密度・分位点
category: math-distributions
subcategory: math-continuous-distributions
topic: logistic
type: recognition
difficulty: 2
priority: C
hashtags: [ロジスティック分布, CDF, 分位点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ロジスティック分布 }]
---
## 問題
位置 $\mu$、scale $s>0$ のロジスティック分布のCDFと密度を答えよ。

## 答え
$F(x)=\frac1{1+e^{-(x-\mu)/s}},$
$f(x)=\frac{e^{-(x-\mu)/s}}{s\{1+e^{-(x-\mu)/s}\}^2}.$

## 使用公式・定理
$F(q_p)=p$ を解く。
## 計算例
$F(x)$ を微分すると $f(x)$ が得られる。

## 一手
ロジット変換 $\log\frac p{1-p}$ を使う。
## 注意
scale $s$ は分散ではない。分散は $\pi^2s^2/3$。

<!-- CARD -->
---
id: dist-multivariate-normal-density
published: true
title: 多変量正規分布の密度と共分散行列条件
category: math-distributions
subcategory: math-continuous-distributions
topic: multivariate-normal
type: recognition
difficulty: 2
priority: B
hashtags: [多変量正規分布, 密度, 共分散行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
正規分布 $X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ の密度を記述するために必要な条件と式を答えよ。
## 答え
$\boldsymbol\Sigma$ は $p\times p$ の対称正定値行列で、
$$f_X(\boldsymbol x)=\frac1{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}}
\exp\left\{-\frac12(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\right\}.$$
## 使用公式・定理
正定値なら $|\boldsymbol\Sigma|>0$、逆行列 $\boldsymbol\Sigma^{-1}$ が存在する。
## 計算例
$p=1$ では $|\boldsymbol\Sigma|=\sigma^2$ となり、通常の $N(\mu,\sigma^2)$ の密度に戻る。
## 一手
次元、行列式、逆行列、二次形式の4点を確認する。
## 注意
半正定値で特異な場合は、この通常のLebesgue密度式をそのまま使えない。

<!-- CARD -->
---
id: dist-multivariate-normal-conditional
published: true
title: 二変量正規分布の条件付き平均と分散
category: math-distributions
subcategory: math-continuous-distributions
topic: multivariate-normal-conditional
type: calc_step
difficulty: 2
priority: B
hashtags: [多変量正規分布, 条件付き分布, 回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
$(X,Y)$ が平均 $(\mu_X,\mu_Y)$、分散 $\sigma_X^2,\sigma_Y^2$、共分散 $\sigma_{XY}$、$\sigma_Y^2>0$ の二変量正規分布に従う。$X\mid Y=y$ の分布を答えよ。
## 答え
$$X\mid Y=y\sim N\left(\mu_X+\frac{\sigma_{XY}}{\sigma_Y^2}(y-\mu_Y),
\sigma_X^2-\frac{\sigma_{XY}^2}{\sigma_Y^2}\right).$$
## 使用公式・定理
多変量正規のブロック条件付き分布公式
$$\boldsymbol\mu_{X\mid Y}=\boldsymbol\mu_X+\boldsymbol\Sigma_{XY}\boldsymbol\Sigma_{YY}^{-1}(y-\boldsymbol\mu_Y),$$
$$\boldsymbol\Sigma_{X\mid Y}=\boldsymbol\Sigma_{XX}-\boldsymbol\Sigma_{XY}\boldsymbol\Sigma_{YY}^{-1}\boldsymbol\Sigma_{YX}.$$
## 計算例
$\mu_X=1,\mu_Y=2,\sigma_X^2=4,\sigma_Y^2=9,\sigma_{XY}=3$ なら $Y=5$ のとき平均は $1+(3/9)3=2$、分散は $4-9/9=3$。
## 一手
条件付き平均は線形、条件付き分散はSchur補の形で書く。
## 注意
条件付き分散は元の分散以下であり、共分散を0とすれば元の分散に戻る。


<!-- CARD -->
---
id: dist-basic-discrete-uniform-moments
published: true
title: 離散一様分布の平均と分散を計算する
category: math-distributions
subcategory: math-discrete-distributions
topic: discrete-uniform-moments
type: calc_step
difficulty: 1
priority: B
hashtags: [離散一様分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
$X$ が $\{1,2,\ldots,m\}$ 上の離散一様分布に従うとき、平均と分散を求めよ。
## 答え
$$E[X]=\frac{m+1}{2},\qquad \operatorname{Var}(X)=\frac{m^2-1}{12}.$$
## 使用公式・定理
$$E[X]=\frac1m\sum_{k=1}^m k,\qquad \operatorname{Var}(X)=E[X^2]-E[X]^2.$$
## 計算例
$$E[X]=\frac{m+1}{2},\qquad E[X^2]=\frac{(m+1)(2m+1)}6,$$
したがって
$$\operatorname{Var}(X)=\frac{(m+1)(2m+1)}6-\frac{(m+1)^2}4=\frac{m^2-1}{12}.$$
## 一手
等確率な有限整数の和へ直ちに戻す。
## 注意
連続一様分布の分散 $(b-a)^2/12$ と形が似ているが、台の個数が異なる。

<!-- CARD -->
---
id: dist-continuous-uniform-cdf
published: true
title: 連続一様分布の累積分布関数を区分的に書く
category: math-distributions
subcategory: math-continuous-distributions
topic: continuous-uniform-cdf
type: recognition
difficulty: 1
priority: B
hashtags: [連続一様分布, CDF, 区分関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様分布 }]
---
## 問題
$a<b$ の連続一様分布 $U(a,b)$ の累積分布関数を求めよ。
## 答え
$$F_X(x)=\begin{cases}0 & x<a,\\ (x-a)/(b-a) & a\le x\le b,\\ 1 & x>b.\end{cases}$$
## 使用公式・定理
$$F_X(x)=\int_{-\infty}^x f_X(u)\,du.$$
## 計算例
$x\in[a,b]$ なら
$$F_X(x)=\int_a^x\frac{du}{b-a}=\frac{x-a}{b-a}.$$
台の左では0、右では全質量1になる。
## 一手
台の左・内部・右の3領域に分ける。
## 注意
$F_X$ は非減少で、$F_X(a)=0$、$F_X(b)=1$ である。

<!-- CARD -->
---
id: dist-normal-moments
published: true
title: 正規分布の平均と分散をパラメータから読む
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-moments
type: recognition
difficulty: 1
priority: B
hashtags: [正規分布, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規分布（ガウス分布） }]
---
## 問題
正規分布 $N(\mu,\sigma^2)$ の平均と分散を答えよ。
## 答え
$$E[X]=\mu,\qquad \operatorname{Var}(X)=\sigma^2.$$
## 使用公式・定理
正規分布の第1パラメータは平均、第2パラメータは分散である。
## 計算例
$X\sim N(3,4)$ なら $E[X]=3$、$\operatorname{Var}(X)=4$、標準偏差は $2$。
## 一手
第2引数を標準偏差ではなく分散として読む。
## 注意
標準化で割る量は $\sigma=\sqrt{\sigma^2}$ である。

<!-- CARD -->
---
id: dist-exponential-cdf-survival
published: true
title: 指数分布のCDFと生存関数を密度から求める
category: math-distributions
subcategory: math-continuous-distributions
topic: exponential-cdf-survival
type: calc_step
difficulty: 1
priority: B
hashtags: [指数分布, CDF, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布 }]
---
## 問題
指数分布 $\operatorname{Exponential}(\lambda)$ $(\lambda>0)$ のCDFと生存関数を求めよ。
## 答え
$$F_X(x)=1-e^{-\lambda x},\qquad S_X(x)=e^{-\lambda x},\qquad x\ge0.$$
## 使用公式・定理
$$F_X(x)=\int_0^x\lambda e^{-\lambda u}du,\qquad S_X(x)=1-F_X(x).$$
## 計算例
$$F_X(x)=\left[-e^{-\lambda u}\right]_0^x=1-e^{-\lambda x},$$
したがって $S_X(x)=e^{-\lambda x}$。
## 一手
密度を0から$x$まで積分してから補集合を取る。
## 注意
$x<0$ では $F_X(x)=0$、$S_X(x)=1$ とする。

<!-- CARD -->
---
id: dist-logistic-quantile
published: true
title: ロジスティック分布の分位点を逆算する
category: math-distributions
subcategory: math-continuous-distributions
topic: logistic-quantile
type: calc_step
difficulty: 2
priority: C
hashtags: [ロジスティック分布, 分位点, ロジット]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ロジスティック分布 }]
---
## 問題
位置 $\mu$、scale $s>0$ のロジスティック分布について、$0<p<1$ の第$p$分位点を求めよ。
## 答え
$$q_p=\mu+s\log\frac p{1-p}.$$
## 使用公式・定理
$$F_X(q_p)=p,\qquad F_X(x)=\frac1{1+e^{-(x-\mu)/s}}.$$
## 計算例
$$p=\frac1{1+e^{-(q_p-\mu)/s}}$$
より
$$e^{-(q_p-\mu)/s}=\frac{1-p}{p},$$
したがって $q_p=\mu+s\log(p/(1-p))$。
## 一手
確率をlogit変換して位置尺度式へ戻す。
## 注意
$p=0,1$ では有限の分位点にならず、公式は $0<p<1$ で使う。

<!-- CARD -->
---
id: dist-lognormal-median
published: true
title: 対数正規分布の中央値を変換で求める
category: math-distributions
subcategory: math-continuous-distributions
topic: lognormal-median
type: calc_step
difficulty: 2
priority: B
hashtags: [対数正規分布, 中央値, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数正規分布 }]
---
## 問題
正規分布 $Y\sim N(\mu,\sigma^2)$ に対し $X=e^Y$ とする。$X$ の中央値を求めよ。
## 答え
$\operatorname{Median}(X)=e^\mu.$
## 使用公式・定理
指数関数は単調増加で、正規分布の中央値は $\mu$ である。
## 計算例
$$P(X\le e^\mu)=P(e^Y\le e^\mu)=P(Y\le\mu)=\frac12.$$
よって $e^\mu$ が中央値である。
## 一手
単調変換では分位点を変換する。
## 注意
平均 $e^{\mu+\sigma^2/2}$ とは異なり、$\sigma>0$ では中央値の方が小さい。

<!-- CARD -->
