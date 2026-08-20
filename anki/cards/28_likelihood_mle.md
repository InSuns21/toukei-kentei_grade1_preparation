---
id: mle-likelihood-vs-probability
title: 尤度と確率の違い
category: math-estimation
subcategory: math-likelihood-mle
topic: likelihood-definition
type: condition
difficulty: 2
priority: A
hashtags: [最尤推定, 尤度, 確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度関数 }]
---
## 問題
確率 $P(X=x;\theta)$ と尤度 $L(\theta;x)$ は何が違うか。観測された $x$ を固定したときの $\theta$ の関数とみる視点で説明せよ。
## 答え
確率は $\theta$ を固定した $x$ の関数、尤度は観測値 $x$ を固定した $\theta$ の関数とみる。$L(\theta;x)=P(X=x;\theta)$ と数値は同じだが、変数として見る対象が $\theta$ に移る。尤度の値は確率ではなく、基準化・相対比較（比や対数差）でのみ意味を持つ。
## 使用公式・定理
$$L(\theta;x)=P(X=x;\theta)\quad(\text{離散}),\qquad L(\theta;x)=f(x;\theta)\quad(\text{連続}).$$
$x$ を固定するので $\sum_\theta L(\theta;x)$ は1になるとは限らない。
## 計算例
$X\sim\operatorname{Bernoulli}(p)$ で $x=1$ を観測したとき、$L(p;1)=p$。$p=0.7$ のとき確率は $0.7$ であり値は等しいが、$L(p;1)$ は $p$ の関数 $p$ そのもの。
## 一手
「確率は $\theta$ 固定、尤度は $x$ 固定」と覚える。尤度は $\theta$ の関数として最大化の対象。
<!-- CARD -->
---
id: mle-likelihood-construction
title: 尤度関数の立て方（独立同分布）
category: math-estimation
subcategory: math-likelihood-mle
topic: likelihood-construction
type: strategy
difficulty: 2
priority: A
hashtags: [最尤推定, 尤度関数, 積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度関数 }]
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
$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ なら
$$L(\mu,\sigma^2;x)=\prod_{i=1}^n\frac1{\sqrt{2\pi\sigma^2}}e^{-\frac{(x_i-\mu)^2}{2\sigma^2}}.$$
## 一手
密度を全て掛け合わせる。台が母数に依存する場合は指示関数も因子に含める。
<!-- CARD -->
---
id: mle-log-likelihood
title: 対数尤度への変換
category: math-estimation
subcategory: math-likelihood-mle
topic: log-likelihood
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 対数尤度, 単調変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数尤度関数 }]
---
## 問題
なぜ最尤推定では尤度 $L(\theta;x)$ の代わりに対数尤度 $\ell(\theta;x)=\log L(\theta;x)$ を最大化するのか。
## 答え
対数は単調増加で最大点が変わらない。積を和に変え、微分・最大化を容易にする。
$$\ell(\theta;x)=\sum_{i=1}^n \log f(x_i;\theta).$$
## 使用公式・定理
$\log$ は単調増加なので $\mathop{\rm arg\,max}_\theta L(\theta;x)=\mathop{\rm arg\,max}_\theta \ell(\theta;x)$。独立同分布なら対数で総和に分解する。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ のとき
$\ell(\lambda;x)=\sum_{i=1}^n(x_i\log\lambda-\lambda-\log x_i!)=\log\lambda\sum_i x_i-n\lambda-\sum_i\log x_i!.$
$\theta$ に依存しない項 $\sum_i\log x_i!$ は最大化から落とせる。
## 一手
まず $\log$ を取って積を和に直す。定数項は $\theta$ に依らないので最大化から落とせる。
<!-- CARD -->
---
id: mle-score-equation
title: スコア方程式から最尤推定値を求める
category: math-estimation
subcategory: math-likelihood-mle
topic: score-equation
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, スコア方程式, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
最尤推定で用いるスコア方程式の一般手順を述べよ。密度 $f(x;\theta)$ からの独立同分布ではどう書けるか。
## 答え
対数尤度 $\ell(\theta;x)=\sum_{i=1}^n\log f(x_i;\theta)$ を $\theta$ で微分して0とおく。
$\frac{\partial}{\partial\theta}\ell(\theta;x)=0\;(\text{スコア方程式}),\qquad U(\theta)=\sum_{i=1}^n\frac{\partial}{\partial\theta}\log f(X_i;\theta).$
この解が内部の最尤推定値の候補。最大性は二階導関数が負であることなどで確認する。
## 使用公式・定理
スコア関数 $U(\theta)=\partial\ell(\theta;x)/\partial\theta$。$\theta$ が $k$ 次元なら連立方程式 $\partial\ell/\partial\theta_j=0\;(j=1,\ldots,k)$。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ なら $U(\lambda)=\sum_i x_i/\lambda-n$。$U(\widehat\lambda)=0$ を解くと $\widehat\lambda=\overline x$。
## 一手
積を対数で和にしてから $\theta$ で微分し、0とおいて解く。境界解の有無に注意。
<!-- CARD -->
---
id: mle-normal-mean
title: 正規分布の平均の最尤推定量
category: math-estimation
subcategory: math-likelihood-mle
topic: normal-mean-mle
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 正規分布, 標本平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
正規分布 $X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$（$\sigma^2$ は既知）のとき $\mu$ の最尤推定量 $\widehat\mu$ を求めよ。
## 答え
$$\widehat\mu=\overline X=\frac1n\sum_{i=1}^n X_i.$$
## 使用公式・定理
$$\ell(\mu)\propto-\frac1{2\sigma^2}\sum_i(x_i-\mu)^2,\qquad \ell'(\mu)=\frac1{\sigma^2}\sum_i(x_i-\mu)=0.$$
よって $\sum_i(x_i-\mu)=0$ から $\mu=\overline x$。
## 計算例
$n=5$、観測値 $4,6,5,7,3$ なら $\widehat\mu=(4+6+5+7+3)/5=5$。
## 一手
$-\sum_i(x_i-\mu)^2$ の最小化は $\overline x$ で達成される。平均の最尤推定量は標本平均。
<!-- CARD -->
---
id: mle-normal-variance
title: 正規分布の分散の最尤推定量
category: math-estimation
subcategory: math-likelihood-mle
topic: normal-variance-mle
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 正規分布, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
正規分布 $X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$（$\mu$ は既知）のとき $\sigma^2$ の最尤推定量 $\widehat\sigma^2$ を求めよ。
## 答え
$$\widehat\sigma^2=\frac1n\sum_{i=1}^n(X_i-\mu)^2.$$
不偏推定量は分散を $n-1$ で割る $n$ でなく、最尤推定量は $n$ で割る点に注意（不偏性は保証されない）。
## 使用公式・定理
$$\ell(\sigma^2)=-\frac n2\log\sigma^2-\frac1{2\sigma^2}\sum_i(x_i-\mu)^2.$$
$Q=\sum_i(x_i-\mu)^2$ と置けば
$$\frac{\partial\ell}{\partial\sigma^2}
=-\frac{n}{2\sigma^2}+\frac{Q}{2(\sigma^2)^2}=0.$$
両辺に $2(\sigma^2)^2$ を掛けると $-n\sigma^2+Q=0$ なので
$$\widehat\sigma^2=\frac{Q}{n}=\frac1n\sum_i(x_i-\mu)^2.$$
## 計算例
$\mu=0$、観測値 $-1,2,0,1,-2$ なら $\widehat\sigma^2=(1+4+0+1+4)/5=2$。
## 一手
$\mu$ も未知なら $\widehat\mu=\overline x$ を代入し $\widehat\sigma^2=n^{-1}\sum_i(X_i-\overline X)^2$。これは不偏分散 $s^2$ より小さい（バイアス）。
<!-- CARD -->
---
id: mle-bernoulli-binomial
title: Bernoulli・二項分布の最尤推定量
category: math-estimation
subcategory: math-likelihood-mle
topic: bernoulli-mle
type: strategy
difficulty: 2
priority: A
hashtags: [最尤推定, ベルヌーイ分布, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ の $p$ の最尤推定量を求めよ。また $Y=\sum_i X_i\sim\operatorname{Binomial}(n,p)$ から $p$ の最尤推定量を求めよ。
## 答え
$$\widehat p=\overline X=\frac{Y}{n}=\frac{\text{成功回数}}{n}.$$
## 使用公式・定理
$$\ell(p)=Y\log p+(n-Y)\log(1-p),\qquad \ell'(p)=\frac Yp-\frac{n-Y}{1-p}=0.$$
$$\Rightarrow p=\frac Yn.$$
## 計算例
$n=10$ で成功回数 $Y=7$ なら $\widehat p=7/10=0.7$。
## 一手
$\ell'(p)=0$ を解く。成功回数と試行回数の比が最尤推定量。全成功・全失敗なら境界で最大。
<!-- CARD -->
---
id: mle-poisson
title: ポアソン分布の最尤推定量
category: math-estimation
subcategory: math-likelihood-mle
topic: poisson-mle
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, ポアソン分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ の $\lambda$ の最尤推定量を求めよ。
## 答え
$$\widehat\lambda=\overline X.$$
## 使用公式・定理
密度は $P(X=x)=\lambda^x e^{-\lambda}/x!$。スコア方程式から
$$\ell(\lambda)=\left(\sum_i x_i\right)\log\lambda-n\lambda-\sum_i\log(x_i!),$$
$$\ell'(\lambda)=\frac{\sum_i x_i}{\lambda}-n=0.$$
したがって
$$\widehat\lambda=\frac1n\sum_i x_i=\overline x.$$
## 計算例
$n=4$、観測値 $2,5,3,0$ なら $\widehat\lambda=2.5$（すでに離散分布の最尤推定量カードで算出）。
## 一手
平均 = 分散 $=\lambda$ の分布で、最尤推定量は標本平均。Poisson の再生成性にもつながる。
<!-- CARD -->
---
id: mle-exponential
category: math-estimation
subcategory: math-likelihood-mle
title: 指数分布の最尤推定量
topic: exponential-mle
type: strategy
difficulty: 2
priority: S
hashtags: [最尤推定, 指数分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Exp}(\lambda)$、密度 $f(x)=\lambda e^{-\lambda x}$（$x>0$、$\lambda>0$）の $\lambda$ の最尤推定量を求めよ。
## 答え
$\widehat\lambda=\frac1{\overline X}=\frac n{\sum_i X_i}.$
## 使用公式・定理
$\ell(\lambda)=n\log\lambda-\lambda\sum_i x_i,\qquad \ell'(\lambda)=\frac n\lambda-\sum_i x_i=0.$
$\widehat\lambda=\frac n{\sum_i x_i}=\frac1{\overline x}.$
## 計算例
$n=3$、観測値 $2,4,6$ なら $\widehat\lambda=3/(2+4+6)=0.25$。
## 一手
指数分布のスコアは $n/\lambda-\sum x_i$。逆数なので $\widehat\lambda=1/\overline X$。
<!-- CARD -->
---
id: mle-uniform-endpoint
category: math-estimation
subcategory: math-likelihood-mle
title: 一様分布の端点最尤推定量
topic: uniform-mle
type: condition
difficulty: 3
priority: A
hashtags: [最尤推定, 一様分布, 端点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
一様分布 $X_1,\ldots,X_n\overset{iid}{\sim}U(0,\theta)$、密度 $f(x)=1/\theta$（$0<x<\theta$、$\theta>0$）の $\theta$ の最尤推定量を求めよ。通常の微分はなぜ使えないか。
## 答え
$\widehat\theta=X_{(n)}=\max_i X_i.$
対数尤度 $\ell(\theta)=-n\log\theta$ は単調減少で内点解がなく、微分では最大点が得られない。台が $\theta$ に依存するため指示関数 $1\{0<x<\theta\}$ を尤度に入れる必要がある。
## 使用公式・定理
$L(\theta;x)=\theta^{-n}\prod_i 1\{0<x_i<\theta\}.$
これは $\theta\ge X_{(n)}$ で $\theta^{-n}$ であり、$\theta$ が小さいほど大きい。よって $\widehat\theta=X_{(n)}$。
## 計算例
観測値 $2,5,3,1$ なら $\widehat\theta=5$。
## 注意
台が母数に依存する例。スコア方程式は使えず、指示関数込みで最大化する。
<!-- CARD -->
---
id: mle-constrained
category: math-estimation
subcategory: math-likelihood-mle
title: 制約付きパラメータの最尤推定量
topic: constrained-mle
type: strategy
difficulty: 3
priority: A
hashtags: [最尤推定, 制約, ラグランジュ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
2カテゴリの多項分布（$p_1+p_2=1$、$p_2=1-p_1$）で、$p_1$ の最尤推定量を制約のもとでどう求めるか。一般手順を述べよ。
## 答え
制約付き最適化として、対数尤度を制約のもとで最大化する。等式制約ならラグランジュ乗数法を使う。
## 使用公式・定理
最大化: $\ell(\theta;x)$ を $g(\theta)=0$ のもとで。ラグランジュ関数
$\mathcal L(\theta,\nu)=\ell(\theta;x)-\nu g(\theta).$
$\partial\mathcal L/\partial\theta_j=0$ と $g(\theta)=0$ を連立して解く。
## 計算例
Bernoulli の $p_1,p_2$（$p_1+p_2=1$、単純化）なら制約から $p_2=1-p_1$ を代入して1変数で最大化する。
## 一手
等式制約は代入またはラグランジュ乗数法。不等式制約は境界のチェックを加える。
<!-- CARD -->
---
id: mle-invariance
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の不変性
topic: mle-invariance
type: theorem
difficulty: 2
priority: A
hashtags: [最尤推定, 不変性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
$\widehat\theta$ が $\theta$ の最尤推定量であるとき、関数 $g$ に対する $g(\theta)$ の最尤推定量は何か。単調性は必要か。
## 答え
$\widehat{g(\theta)}=g(\widehat\theta).$
最尤推定量は任意の関数 $g$ に対して変換不変である。単調性は不要。
## 使用公式・定理
$\phi=g(\theta)$ の尤度を $L^*(\phi)=\sup_{\theta:g(\theta)=\phi}L(\theta)$ と定めると、$\widehat\theta$ が $L$ を最大化するため $g(\widehat\theta)$ は $L^*$ を最大化する。したがって $g$ が1対1でなくてもよく、単調性も不要である。最大点が複数ある場合は推定値も集合として扱う。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$、$\widehat\lambda=\overline X$ なら $\sqrt\lambda$ の最尤推定量は $\sqrt{\overline X}$。
## 一手
最尤推定量は関数を適用した形でも保たれる。分散パラメータ化などで有用。
<!-- CARD -->
---
id: mle-consistency
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の一致性（直観と条件）
topic: mle-consistency
type: condition
difficulty: 3
priority: S
hashtags: [最尤推定, 一致性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
最尤推定量 $\widehat\theta_n$ が真値 $\theta_0$ へ確率収束するための直観と条件を述べよ。
## 答え
標本サイズ $n\to\infty$ で対数尤度の1観測当たり平均 $\frac1n\ell(\theta;x)$ が期待値 $E[\log f(X;\theta)]$ へ収束し、その最大点は真値 $\theta_0$ に近づく。よって $\widehat\theta_n\xrightarrow{p}\theta_0$。
## 使用公式・定理
正則条件（密度の微分可能性・台の母数非依存・積分と微分の交換可能など）のもとで、$\theta\ne\theta_0$ に $E_{\theta_0}[\log f(X;\theta)]<E_{\theta_0}[\log f(X;\theta_0)]$（情報不等式）。この識別可能性が一致性の核心。
## 計算例
$X_i\overset{iid}{\sim}U(0,\theta)$ でも $\widehat\theta=X_{(n)}\xrightarrow{p}\theta_0$ が成り立つ（非正則でも一貫性はある）。
## 一手
「1観測当たり対数尤度の極限が最大になるのは真値」という識別可能性を覚える。
<!-- CARD -->
---
id: mle-asymptotic-normality
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の漸近正規性
topic: mle-asymptotic
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
正則条件下で最尤推定量 $\widehat\theta_n$ の漸近分布を述べよ。$I_1(\theta)$ は1観測当たりのフィッシャー情報量。
## 答え
$\sqrt n(\widehat\theta_n-\theta_0)\xrightarrow{d}N\left(0,\frac1{I_1(\theta_0)}\right).$
## 使用公式・定理
スコアの期待値0・分散 $I_n=nI_1$、中心極限定理より $n^{-1/2}U(\theta_0)\xrightarrow{d}N(0,I_1)$。また $-n^{-1}\ell''(\theta_0)\xrightarrow{p}I_1(\theta_0)$ である。スコア方程式を真値のまわりで一次展開して解くと上記を得る。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$、$I_1(\lambda)=1/\lambda$ なので
$\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda).$
## 一手
漸近分散は フィッシャー情報量の逆数 $1/I_1$。標準誤差は $1/\sqrt{nI_1}$。
<!-- CARD -->
---
id: mle-boundary-nonregular
category: math-estimation
subcategory: math-likelihood-mle
title: 尤度の境界解・非正則ケース
topic: mle-boundary
type: condition
difficulty: 3
priority: A
hashtags: [最尤推定, 境界, 非正則]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
最尤推定量が境界解になる場合と、スコア方程式が使えない非正則ケースを例を挙げて説明せよ。
## 答え
成功確率の全成功・全失敗（$\widehat p=1$ や $0$）、台が母数に依存する一様分布 $U(0,\theta)$ の $\widehat\theta=X_{(n)}$ が典型例。正則条件（台の母数非依存、微分可能性）が崩れると漸近正規性も一般には保証されない。
## 使用公式・定理
境界では $\ell'(\theta)=0$ の解が区間外になり、最大は端点。台依存では指示関数を入れて最大化し、収束速度は $O_p(1/n)$ になることもある。
## 計算例
$U(0,\theta)$ の $\widehat\theta=X_{(n)}$ は真値を下から超えない範囲で一致するが、$\sqrt n$ より速い $n(\theta_0-\widehat\theta_n)$ が指数分布に収束する。
## 一手
微分が使えないのは「内部解が存在しない」か「台が母数依存」のとき。非正則では漸近正規性を疑う。
<!-- CARD -->
---
id: suff-statistic-definition
category: math-estimation
subcategory: math-population-sample-statistic
title: 十分統計量の定義
topic: sufficient-definition
type: condition
difficulty: 2
priority: S
hashtags: [十分統計量, 定義, 条件付き分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
母数 $\theta$ を持つ分布からの標本 $X$ について、統計量 $T=T(X)$ が $\theta$ の十分統計量であるとは何か。
## 答え
$T$ を与えたときの $X$ の条件付き分布が $\theta$ に依存しないこと。すなわち $X$ について $\theta$ についての情報は $T$ にすべて含まれる。
## 使用公式・定理
$X\mid T=t\text{ の条件付き分布が }\theta\text{ に依存しない}$
であれば $T$ は十分統計量。
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ の $T=\sum_i X_i$ は十分：$T=t$ のもとでの $X$ の条件付き分布は $p$ に依存しない。
## 一手
「$T$ で要約しても情報を失わない」「$\theta$ について $T$ が全情報」が定義の直観。
<!-- CARD -->
---
id: neyman-factorization
category: math-estimation
subcategory: math-population-sample-statistic
title: Neyman因子分解定理
topic: neyman-factorization
type: theorem
difficulty: 2
priority: S
hashtags: [十分統計量, 因子分解定理, ネイマンの分解定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ネイマンの分解定理 }]
---
## 問題
Neyman（ネイマン）の因子分解定理を述べよ。
## 答え
$T$ が $\theta$ の十分統計量であることと、同時密度が
$f(x;\theta)=g_\theta(T(x))\,h(x)$
と分解できることは同値。$h(x)$ は $\theta$ に依存しない。
## 使用公式・定理
十分統計量の判定を条件付き分布でなく密度の分解に帰着させる（$\text{sufficient}\iff$ 因子分解）。
## 計算例
$\operatorname{Bernoulli}(p)$ の $T=\sum_i x_i$：$p^T(1-p)^{n-T}\cdot1$ と書け、$h(x)=1$、$g_p(T)=p^T(1-p)^{n-T}$。
## 一手
「$\theta$ と $x$ が分離可能な因子 $g_\theta(T(x))$ と $h(x)$ に分解できる」ことを確認する。台が母数に依存しない指示関数だけを $h(x)$ に入れられる。$U(0,\theta)$ の $1\{X_{(n)}\le\theta\}$ のような母数依存の指示関数は $g_\theta(T(x))$ 側へ入れる。
<!-- CARD -->
---
id: suff-bernoulli
category: math-estimation
subcategory: math-population-sample-statistic
title: Bernoulli・二項族の十分統計量
topic: suff-bernoulli
type: strategy
difficulty: 2
priority: S
hashtags: [十分統計量, ベルヌーイ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ の十分統計量を因子分解定理で求めよ。
## 答え
$T=\sum_{i=1}^n X_i\;(\text{成功回数}).$
## 使用公式・定理
$L(p;x)=p^{\sum x_i}(1-p)^{n-\sum x_i}\cdot1=g_p(T(x))\cdot h(x)$
と分解でき、$T=\sum_i x_i$ は十分。
## 計算例
$n=10$ の標本で成功回数 $\sum x_i=7$。十分統計量は $T=7$ で、標本の並び自体は不要。
## 一手
指数 $\sum x_i$ が $p$ の十分統計量。二項分布 $Y=\sum X_i$ も同値。
<!-- CARD -->
---
id: suff-poisson
category: math-estimation
subcategory: math-population-sample-statistic
title: Poisson族の十分統計量
topic: suff-poisson
type: strategy
difficulty: 2
priority: S
hashtags: [十分統計量, ポアソン分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ の十分統計量を求めよ。
## 答え
$T=\sum_{i=1}^n X_i.$
## 使用公式・定理
$L(\lambda;x)=\prod_i\frac{\lambda^{x_i}e^{-\lambda}}{x_i!}=\lambda^{\sum x_i}e^{-n\lambda}\cdot\frac1{\prod_i x_i!}.$
$g_\lambda(T)=\lambda^{\sum x_i}e^{-n\lambda}$、$h(x)=1/\prod_i x_i!$。
## 計算例
観測値 $2,5,3,0$ なら $T=10$ が十分統計量。
## 一手
指数 $\sum x_i$ が $\lambda$ の十分統計量。分母 $\prod x_i!$ は $\lambda$ 非依存で $h(x)$。
<!-- CARD -->
---
id: suff-normal
category: math-estimation
subcategory: math-population-sample-statistic
title: 正規族の十分統計量
topic: suff-normal
type: strategy
difficulty: 2
priority: S
hashtags: [十分統計量, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
正規分布 $X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$（$\theta=(\mu,\sigma^2)$）の十分統計量を求めよ。
## 答え
$T=(\sum_i X_i,\;\sum_i X_i^2).$
平均と2乗和（または $\overline X$ と $\sum_i(X_i-\overline X)^2$）の組。
## 使用公式・定理
$L(\mu,\sigma^2;x)\propto(\sigma^2)^{-n/2}\exp\!\left[-\frac{1}{2\sigma^2}\sum_i x_i^2+\frac{\mu}{\sigma^2}\sum_i x_i\right]$
より $T=(\sum x_i,\sum x_i^2)$ が十分。
## 計算例
$n=5$ で $\sum x_i=25$、$\sum x_i^2=145$ なら十分統計量は $(25,145)$。
## 一手
正規族の指数型では $\sum x_i$ と $\sum x_i^2$ が十分。$\overline X$ と不偏分散の情報と同じ。
<!-- CARD -->
---
id: suff-minimal
category: math-estimation
subcategory: math-population-sample-statistic
title: 最小十分統計量
topic: minimal-sufficient
type: condition
difficulty: 3
priority: S
hashtags: [十分統計量, 最小十分統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
最小十分統計量とは何か。十分統計量の中でも最小とみなす基準を述べよ。
## 答え
どんな十分統計量 $T'$ に対しても $T$ が $T'$ の関数として書ける（$T=\phi(T')$）十分統計量を最小十分統計量と呼ぶ。すなわちデータを最も強く圧縮した十分統計量。
## 使用公式・定理
$T$ が十分かつ任意の十分 $T'$ に対して $T=\phi(T')$ となる関数 $\phi$ が存在するとき最小十分。
## 計算例
$N(\mu,\sigma^2)$ では $(\sum x_i,\sum x_i^2)$ が最小十分。成功回数のみの Bernoulli の $\sum x_i$ も最小十分。
## 一手
十分統計量同士を比べた「最も粗いもの」。一意ではないが関数関係で比較できる。
<!-- CARD -->
---
id: suff-likelihood-ratio-minimal
category: math-estimation
subcategory: math-population-sample-statistic
title: 尤度比による最小十分性判定
topic: likelihood-ratio-sufficient
type: strategy
difficulty: 3
priority: A
hashtags: [十分統計量, 最小十分統計量, 尤度比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
観測値 $x$ と $y$ の対数尤度比が $\theta$ に依存しないことを用いて、$T$ が最小十分統計量であることを判定する方法を述べよ。
## 答え
共通の台を持つ密度族で、任意の標本点 $x,y$ に対し
$$\frac{f_\theta(x)}{f_\theta(y)}\text{ が }\theta\text{ に依存しない}\iff T(x)=T(y)$$
が成り立てば $T$ は最小十分である。
## 使用公式・定理
標本点 $x,y$ の尤度が母数によらない定数倍になることと、$T(x)=T(y)$ が同値になる統計量が最小十分。
## 計算例
Bernoulli では
$$\frac{f_p(x)}{f_p(y)}=\left(\frac{p}{1-p}\right)^{\sum_i x_i-\sum_i y_i}$$
である。これが $p$ に依存しないことと $\sum_i x_i=\sum_i y_i$ は同値なので、$T=\sum_iX_i$ は最小十分である。
## 一手
対数尤度比が $T$ の関数にしか依存しないことを示す。
<!-- CARD -->
---
id: complete-statistic
category: math-estimation
subcategory: math-population-sample-statistic
title: 完備統計量の定義
topic: completeness
type: condition
difficulty: 3
priority: S
hashtags: [完備統計量, 定義]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
完備統計量 $T$ の定義を述べよ。
## 答え
任意の関数 $g$ に対して
$E_\theta[g(T)]=0\;(\forall\theta)\;\Rightarrow\;P_\theta(g(T)=0)=1\;(\forall\theta)$
が成り立つとき $T$ は完備統計量。すなわち $T$ に基づく $\theta$ に依らない可積分関数で期待値が恒等的に0になるものは $0$ だけ。
## 使用公式・定理
完備性は指数型分布族でよく成り立つ（次カード）。完備な十分統計量はUMVU構成の要。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$ の $T=X$ は完備：$E[g(T)]=\sum_{x}g(x)\lambda^x e^{-\lambda}/x!=0$ が全 $\lambda$ で成り立つには $g(x)=0$。
## 一手
「$g(T)$ の期待値が恒等的に0なら $g$ は恒等的に0」という $T$ の性質。
<!-- CARD -->
---
id: exponential-family-completeness
category: math-estimation
subcategory: math-population-sample-statistic
title: 指数型分布族と完備性
topic: exponential-family
type: theorem
difficulty: 3
priority: S
hashtags: [指数型分布族, 完備統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
指数型分布族
$f(x;\theta)=h(x)c(\theta)\exp\!\left(\sum_{j=1}^k w_j(\theta)T_j(x)\right)$
で、$(w_1(\theta),\ldots,w_k(\theta))$ が開集合を取るとき $T=(T_1,\ldots,T_k)$ はどうなるか。
## 答え
$T=(T_1,\ldots,T_k)$ は完備な十分統計量である（自然母数が開集合を張れば）。
## 使用公式・定理
十分性は因子分解、完備性はラプラス変換の一意性に帰着。$k$ 次元指数型で自然母数空間が開集合なら $T$ は完備十分。
## 計算例
$N(\mu,\sigma^2)$ の $(\sum x_i,\sum x_i^2)$、$\operatorname{Poisson}$ の $\sum x_i$、二項の $\sum x_i$ はすべて完備十分。
## 一手
指数型分布族の自然母数が開集合なら十分統計量は自動的に完備。多くの標準分布が該当。
<!-- CARD -->
---
id: suff-complete
category: math-estimation
subcategory: math-population-sample-statistic
title: 十分かつ完備な統計量
topic: complete-sufficient
type: condition
difficulty: 3
priority: S
hashtags: [十分統計量, 完備統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
十分かつ完備な統計量がなぜ重要か。
## 答え
十分かつ完備（complete sufficient）な統計量は、普遍的に最良の不偏推定量（UMVU）を構成する基盤になる。完備性は「$θ$ に依らない偏りのない推定量は一意」を保証し、十分性は情報の損失がないことを保証する。
## 使用公式・定理
完備十分統計量 $T$ に対して、$\theta$ の不偏推定量 $\delta(T)$ は（存在すれば）一意的に定まる。
## 計算例
$\operatorname{Poisson}(\lambda)$ の $T=\sum X_i$ は完備十分。$\overline X$ は $\lambda$ の不偏で、$T$ の関数なので UMVU である。
## 一手
「完備十分」$\Rightarrow$ 一意・最良。$\delta(T)$ を $T$ の関数で見つければ UMVU。
<!-- CARD -->
---
id: rao-blackwell
category: math-estimation
subcategory: math-population-sample-statistic
title: Rao–Blackwellの定理
topic: rao-blackwell
type: theorem
difficulty: 3
priority: S
hashtags: [Rao–Blackwell, 十分統計量, 不偏性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
Rao–Blackwellの定理を述べよ。十分統計量 $T$ と不偏推定量 $\delta(X)$ が与えられたとき、$\delta_T=E[\delta(X)\mid T]$ はどうなるか。
## 答え
$\delta_T=E[\delta(X)\mid T]$ は不偏で、$\operatorname{Var}_\theta(\delta_T)\le\operatorname{Var}_\theta(\delta(X))$（$\forall\theta$）。すなわち条件付き期待値を取る（Rao–Blackwell化）と分散が減る。
## 使用公式・定理
$E_\theta[\delta_T]=E_\theta[\delta]$（条件付き期待値の全期待値）。分散分解
$\operatorname{Var}(\delta)=\operatorname{Var}(E[\delta\mid T])+E[\operatorname{Var}(\delta\mid T)]\ge\operatorname{Var}(E[\delta\mid T]).$
## 計算例
$X_1,X_2$ を $\operatorname{Bernoulli}(p)$ とし、$\delta_1=X_1$（不偏・高分散）を $\delta_2=(X_1+X_2)/2$ へ Rao–Blackwell化すると分散が下がる。
## 一手
不偏なまま $T$ の関数に直すことで分散を下げる。
<!-- CARD -->
---
id: lehmann-scheffe
category: math-estimation
subcategory: math-population-sample-statistic
title: Lehmann–Schefféの定理
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: S
hashtags: [Lehmann–Scheffé, UMVU, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
Lehmann–Schefféの定理を述べよ。
## 答え
$T$ が完備十分統計量であり、$\delta(T)$ が $\theta$ の不偏推定量なら、$\delta(T)$ は $\theta$ の一意な UMVU（一様最小分散不偏）推定量である。
## 使用公式・定理
完備性により $T$ の関数で不偏なものは一意。よってそのような $\delta(T)$ が存在すればこれが最良（UMVU）であり、一意に定まる。
## 計算例
$\operatorname{Poisson}(\lambda)$ の $\overline X$ は完備十分 $T=\sum X_i$ の関数であり不偏なので、$\lambda$ の UMVU。
## 一手
「完備十分 $T$ の不偏な関数 = UMVU」を確認する。存在すれば一意。
<!-- CARD -->
---
id: umvu-construction
category: math-estimation
subcategory: math-population-sample-statistic
title: UMVU推定量の構成
topic: umvu-construction
type: strategy
difficulty: 3
priority: A
hashtags: [UMVU, 推定量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
完備十分統計量 $T$ を使って $g(\theta)$ の UMVU を構成する手順を述べよ。
## 答え
1. $g(\theta)$ の不偏推定量 $\delta(X)$ を見つける。
2. Rao–Blackwell化 $\delta_T=E[\delta(X)\mid T]$ して $T$ の関数にする。
3. $T$ が完備十分なら Lehmann–Scheffé から $\delta_T$ が UMVU になる。
## 使用公式・定理
$\delta_T=E[\delta(X)\mid T]$ は不偏かつ $T$ の関数。完備十分なら一意な UMVU。
## 計算例
$X_1,X_2\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$Y=X_1+X_2\sim\operatorname{Binomial}(2,p)$ は $p$ の完備十分統計量。$p^2$ の不偏推定量
$\delta(Y)=\frac{Y(Y-1)}{2}.$
$E[Y]=2p$、$E[Y^2]=\operatorname{Var}(Y)+E[Y]^2=2p(1-p)+4p^2=2p+2p^2$ より $E[Y(Y-1)]=2p^2$，すなわち $E[\delta]=p^2$。$Y$ の関数で不偏なので Lehmann–Scheffé より UMVU。
## 一手
「不偏な既知推定量 → $T$ で条件付け → 完備十分なら UMVU」の3段。
<!-- CARD -->
---
id: basu-theorem
category: math-estimation
subcategory: math-population-sample-statistic
title: 補助統計量とBasuの定理
topic: basu-theorem
type: theorem
difficulty: 3
priority: A
hashtags: [Basuの定理, 補助統計量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
補助統計量（ancillary）の定義と Basuの定理を述べよ。
## 答え
分布が $\theta$ に依存しない統計量を補助統計量と呼ぶ。Basuの定理：$T$ が完備十分統計量なら、$T$ は$\theta$ に依存しない任意の補助統計量 $V$ から独立である。
## 使用公式・定理
$T$ 完備十分 $\Rightarrow$ $T$ と ancillary な $V$ は独立。
## 計算例
$N(\mu,\sigma^2)$ で $\mu$ のみ未知（$\sigma^2$ 既知）のとき、$S^2=\sum(X_i-\overline X)^2$ の分布は $\mu$ に依存せず補助統計量。完備十分な $\overline X$ は Basuの定理より $S^2$ から独立。これは標本平均と分散の独立性（Cochranの定理）の基礎。
## 一手
完備十分統計量と分布に依らない量は独立。標本平均と分散の独立性に直結。
<!-- CARD -->
---
id: score-function-definition
category: math-estimation
subcategory: math-likelihood-mle
title: 有効スコア関数
topic: score-function
type: condition
difficulty: 3
priority: S
hashtags: [有効スコア関数, 最尤推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効スコア関数 }]
---
## 問題
有効スコア関数（スコア関数）の定義と、その期待値・分散を述べよ。
## 答え
$U(\theta)=\frac{\partial}{\partial\theta}\log f(X;\theta).$
正則条件のもとで $E_\theta[U(\theta)]=0$、$\operatorname{Var}_\theta(U(\theta))=I_1(\theta)$（1観測当たりの Fisher 情報量）。
## 使用公式・定理
$E[U]=0$ は $\int f=1$ を微分して得る。$\operatorname{Var}(U)=I_1$ が Fisher 情報量の定義と一致。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$：$\log f=x\log\lambda-\lambda-\log x!$ より $U(\lambda)=x/\lambda-1$。$E[U]=\lambda/\lambda-1=0$。
## 一手
スコアは Fisher 情報量を生む母数導関数。期待値0が最尤の正則性の要。
<!-- CARD -->
---
id: mle-multiparameter
category: math-estimation
subcategory: math-likelihood-mle
title: 多母数での最尤推定量（連立スコア方程式）
topic: multiparameter-mle
type: strategy
difficulty: 3
priority: A
hashtags: [最尤推定, 多母数, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
$\theta=(\theta_1,\ldots,\theta_k)$ のとき最尤推定量はどう求めるか。
## 答え
対数尤度を各成分で偏微分して0とおく連立スコア方程式を解く：
$\frac{\partial\ell}{\partial\theta_j}=0\quad(j=1,\ldots,k).$
## 使用公式・定理
$\ell=\sum_i\log f(x_i;\theta)$ を $\theta_j$ で微分。多母数の場合は Hessian の負定値性で最大を確認。
## 計算例
$N(\mu,\sigma^2)$：$\partial\ell/\partial\mu=0$ と $\partial\ell/\partial\sigma^2=0$ の連立から $\widehat\mu=\overline x$、$\widehat\sigma^2=n^{-1}\sum(x_i-\overline x)^2$。
## 一手
各母数で偏微分して0とおく。必要なら数値解法（Newton–Raphson）も利用。
<!-- CARD -->
---
id: order-statistic-sufficiency
category: math-estimation
subcategory: math-population-sample-statistic
title: 順序統計量と十分性
topic: order-statistic-sufficiency
type: condition
difficulty: 3
priority: S
hashtags: [順序統計量, 十分統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
順序統計量が常に十分統計量であることを説明せよ。
## 答え
独立同分布標本では、順序統計量全体 $X_{(1)}\le\cdots\le X_{(n)}$ は十分統計量である。観測値に付いた添字の並びは母数についての情報を持たないからである。
## 使用公式・定理
母数の情報は値の集合にのみ含まれ、順列は $\theta$ に依存しない因子 $1/n!$ でしか効かない。
## 計算例
$U(0,\theta)$ の最大値 $X_{(n)}$ は（最小）十分だが、順序統計量全体も十分。
## 一手
「順序統計量は常に十分」という事実を、並びの情報は無意味という視点で覚える。
<!-- CARD -->
---
id: likelihood-regularity
category: math-estimation
subcategory: math-likelihood-mle
title: 正則条件と最尤推定
topic: likelihood-regularity
type: condition
difficulty: 3
priority: A
hashtags: [最尤推定, 正則条件]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
最尤推定量の漸近正規性やスコアの期待値0が成り立つための正則条件を挙げよ。
## 答え
1. 台が母数 $\theta$ に依存しない
2. $\log f(x;\theta)$ が $\theta$ について微分可能
3. 積分と微分の順序交換が可能
4. Fisher 情報量 $I_1(\theta)$ が有限で正
## 使用公式・定理
正則条件が崩れる例：一様分布 $U(0,\theta)$（台依存）ではスコアも漸近正規性も通常の形で成立しない。
## 計算例
正規・Poisson・指数・二項は正則。$U(0,\theta)$ や三角分布は非正則。
## 一手
正則条件を満たすか最初に確認。非正則なら漸近正規性を一般には使えない。
<!-- CARD -->
---
id: mle-normal-both
category: math-estimation
subcategory: math-likelihood-mle
title: 正規分布の平均・分散の同時最尤推定量
topic: normal-mle-both
type: strategy
difficulty: 3
priority: S
hashtags: [最尤推定, 正規分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
正規分布 $X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ で $\mu,\sigma^2$ がともに未知のとき、最尤推定量を求めよ。
## 答え
$\widehat\mu=\overline X,\qquad \widehat\sigma^2=\frac1n\sum_{i=1}^n(X_i-\overline X)^2.$
## 使用公式・定理
$Q(\mu)=\sum_i(x_i-\mu)^2$ と置くと
$$\ell(\mu,\sigma^2)=-\frac n2\log(2\pi)-\frac n2\log\sigma^2-\frac{Q(\mu)}{2\sigma^2}.$$
まず
$$\frac{\partial\ell}{\partial\mu}=\frac1{\sigma^2}\sum_i(x_i-\mu)=0
\quad\Longrightarrow\quad \widehat\mu=\overline x.$$
次に
$$\frac{\partial\ell}{\partial\sigma^2}
=-\frac{n}{2\sigma^2}+\frac{Q(\mu)}{2(\sigma^2)^2}=0
\quad\Longrightarrow\quad \sigma^2=\frac{Q(\mu)}n.$$
$\mu=\widehat\mu=\overline x$ を代入して
$$\widehat\sigma^2=\frac1n\sum_i(x_i-\overline x)^2$$
を得る。
$\widehat\sigma^2$ は不偏分散 $s^2$（分母 $n-1$）より小さい。
## 計算例
$n=5$、$\overline x=5$、$\sum(x_i-5)^2=40$ なら $\widehat\sigma^2=40/5=8$、$\widehat\mu=5$。
## 一手
平均を先に求め、残差平方和を $n$ で割る。$\widehat\sigma^2$ は不偏でない点に注意。
<!-- CARD -->
---
id: mle-information-inequality
category: math-estimation
subcategory: math-likelihood-mle
title: 最尤推定量の情報不等式（識別可能性）
topic: information-inequality
type: condition
difficulty: 3
priority: S
hashtags: [最尤推定, 情報不等式, 識別可能性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有効スコア関数 }]
---
## 問題
$\theta\ne\theta_0$ のとき、真分布 $f_{\theta_0}$ のもとで $E_{\theta_0}[\log f(X;\theta)] < E_{\theta_0}[\log f(X;\theta_0)]$ が成り立つことを説明せよ。
## 答え
Jensenの不等式を $\log$（凹関数）と密度比 $f_\theta/f_{\theta_0}$ に用いる：
$E_{\theta_0}\!\left[\log\frac{f(X;\theta)}{f(X;\theta_0)}\right]\le\log E_{\theta_0}\!\left[\frac{f(X;\theta)}{f(X;\theta_0)}\right]=\log1=0.$
不等式で起こり、$\theta\ne\theta_0$ では真に $<0$（識別可能性）。
## 使用公式・定理
共通の台を持つとき $E_{\theta_0}[f(X;\theta)/f(X;\theta_0)]=1$。$\log$ が狭い意味で凹なので、$f_\theta\ne f_{\theta_0}$ なら期待値は負。台が異なる場合はKL情報量を用いた別扱いが必要になる。
## 計算例
平均のみが異なる2つの正規分布では、真の平均で対数尤度の期待値が最大。
## 一手
「対数尤度比の期待値 ≤ 0、等号は同一分布のみ」が最尤一致性の核心。
<!-- CARD -->
