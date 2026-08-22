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
title: ベルヌーイ分布・二項分布の最尤推定量
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
平均 = 分散 $=\lambda$ の分布で、最尤推定量は標本平均。ポアソン分布の再生成性にもつながる。
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
ベルヌーイ分布の $p_1,p_2$（$p_1+p_2=1$、単純化）なら制約から $p_2=1-p_1$ を代入して1変数で最大化する。
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
正則条件下で最尤推定量 $\widehat\theta_n$ の漸近分布を述べよ。$I_1(\theta)$ は1観測当たりのフィッシャー情報量（1次元）。
## 答え
$\sqrt n(\widehat\theta_n-\theta_0)\xrightarrow{d}N\left(0,\frac1{I_1(\theta_0)}\right).$
## 使用公式・定理
スコアの期待値0・分散 $I_n=nI_1$、中心極限定理より $n^{-1/2}U(\theta_0)\xrightarrow{d}N(0,I_1)$。また $-n^{-1}\ell''(\theta_0)\xrightarrow{p}I_1(\theta_0)$ である。スコア方程式を真値のまわりで一次展開して解くと上記を得る。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$、$I_1(\lambda)=1/\lambda$ なので
$\sqrt n(\widehat\lambda-\lambda)\xrightarrow{d}N(0,\lambda).$
## 一手
漸近分散はフィッシャー情報量（1次元）の逆数 $1/I_1$。標準誤差は $1/\sqrt{nI_1}$。
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
id: population-sample-definition
category: math-estimation
subcategory: math-population-sample-statistic
title: 母集団・標本・母数を区別する
topic: population-sample-definition
type: recognition
difficulty: 1
priority: S
hashtags: [母集団, 標本, 母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母集団と標本・統計量 }]
---
## 問題
母集団、標本、母数の違いを、ベルヌーイ分布の例で説明せよ。
## 答え
- 母集団：調べたい対象を生み出す確率分布。例ではベルヌーイ分布 $\operatorname{Bernoulli}(p)$。
- 標本：母集団から取り出す確率変数 $X_1,\ldots,X_n$。観測後の値は $x_1,\ldots,x_n$ と小文字で書く。
- 母数：母集団の分布を定める未知の定数。例では成功確率 $p$。
## 使用公式・定理
ベルヌーイ分布では、台は $\{0,1\}$、母数範囲は $0\le p\le1$、確率質量関数は
$$P_p(X=x)=p^x(1-p)^{1-x}\qquad(x\in\{0,1\})$$
である。
## 計算例
$n=5$ で観測値が $(1,0,1,1,0)$ なら、標本サイズは $5$、成功数は $3$ である。未知の母数 $p$ と、観測から得た比率 $3/5$ は別物である。
## 一手
「母集団＝分布」「標本＝そこから得るデータ」「母数＝分布を決める未知定数」と分ける。
<!-- CARD -->
---
id: random-sample-iid-definition
category: math-estimation
subcategory: math-population-sample-statistic
title: 無作為標本と独立同分布の意味
topic: random-sample-iid
type: recognition
difficulty: 1
priority: S
hashtags: [無作為標本, 独立同分布, 標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母集団と標本・統計量 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}F_\theta$ は何を意味するか。
## 答え
$X_1,\ldots,X_n$ が互いに独立で、すべて同じ分布 $F_\theta$ に従うことを意味する。この組を大きさ $n$ の無作為標本という。
## 使用公式・定理
独立性から、同時確率質量関数または同時確率密度関数は
$$f_\theta(x_1,\ldots,x_n)=\prod_{i=1}^n f_\theta(x_i)$$
と積に分かれる。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ なら
$$P_p(X_1=1,X_2=0,X_3=1)
=p(1-p)p=p^2(1-p).$$
同じ分布に従うだけでは積に分けられず、独立性も必要である。
## 一手
「iid」は independent（独立）と identically distributed（同じ分布）の両方を含む。
<!-- CARD -->
---
id: statistic-definition-basic
category: math-estimation
subcategory: math-population-sample-statistic
title: 統計量の定義と母数を含まない条件
topic: statistic-definition
type: recognition
difficulty: 1
priority: S
hashtags: [統計量, 標本平均, 標本分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母集団と標本・統計量 }]
---
## 問題
統計量とは何か。標本平均と標本分散を例に述べよ。
## 答え
統計量とは、標本 $X_1,\ldots,X_n$ だけの既知の関数 $T(X_1,\ldots,X_n)$ であり、未知の母数を式の中に含まない確率変数である。
## 使用公式・定理
代表例は
$$\overline X=\frac1n\sum_{i=1}^nX_i,\qquad
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2$$
である。
## 計算例
観測値が $(2,4,6)$ なら
$$\overline x=\frac{2+4+6}{3}=4,$$
$$s^2=\frac{(2-4)^2+(4-4)^2+(6-4)^2}{3-1}
=\frac{4+0+4}{2}=4.$$
$\overline X-\mu$ は未知母数 $\mu$ を含むため、$\mu$ が未知の問題では統計量ではない。
## 一手
データを入れる前の $T(X)$ は確率変数、データを入れた後の $T(x)$ は数値である。
<!-- CARD -->
---
id: estimator-estimate-distinction
category: math-estimation
subcategory: math-population-sample-statistic
title: 推定量・推定値・統計量を区別する
topic: estimator-estimate-distinction
type: recognition
difficulty: 1
priority: S
hashtags: [推定量, 推定値, 統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母集団と標本・統計量 }]
---
## 問題
統計量、推定量、推定値の関係を説明せよ。
## 答え
統計量は標本の関数の総称である。そのうち未知量の推定に使うものを推定量と呼ぶ。推定量へ観測値を代入して得た数値が推定値である。
## 使用公式・定理
$$\widehat\theta=T(X_1,\ldots,X_n)\quad\longrightarrow\quad
\widehat\theta_{\rm obs}=T(x_1,\ldots,x_n).$$
左辺は標本を取る前には確率変数、右辺は観測後の数値である。
## 計算例
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ で $\widehat p=\overline X$ は $p$ の推定量。観測値 $(1,0,1,1,0)$ では
$$\widehat p_{\rm obs}=\frac{1+0+1+1+0}{5}=\frac35=0.6$$
が推定値である。
## 一手
「式・確率変数」が推定量、「データを代入した数」が推定値。
<!-- CARD -->
---
id: order-statistic-definition-basic
category: math-estimation
subcategory: math-population-sample-statistic
title: 順序統計量の定義と添字
topic: order-statistic-definition
type: recognition
difficulty: 1
priority: S
hashtags: [順序統計量, 最小値, 最大値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
順序統計量 $X_{(1)},\ldots,X_{(n)}$ を定義し、通常の添字 $X_i$ との違いを説明せよ。
## 答え
標本値を小さい順に並べたものを順序統計量といい、
$$X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)}$$
と書く。丸括弧付き添字は小さい方からの順位を表し、観測した順番を表す $X_i$ とは異なる。
## 使用公式・定理
$$X_{(1)}=\min_iX_i,\qquad X_{(n)}=\max_iX_i.$$
## 計算例
観測値が $(4,1,4,2)$ なら、並べ替えて $(1,2,4,4)$ だから
$$x_{(1)}=1,\quad x_{(2)}=2,\quad x_{(3)}=4,\quad x_{(4)}=4.$$
同じ値があっても順位ごとに数える。
## 一手
$X_{(i)}$ の括弧は「第 $i$ 観測」ではなく「第 $i$ 順位」の印。
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
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とし、$T=\sum_iX_i$ とする。$\sum_i x_i=t$ を満たす各0--1列 $x$ について
$$P_p(X=x\mid T=t)
=\frac{P_p(X=x)}{P_p(T=t)}
=\frac{p^t(1-p)^{n-t}}{\binom ntp^t(1-p)^{n-t}}
=\frac1{\binom nt}.$$
右辺は $p$ に依存しないので、定義から $T$ は $p$ の十分統計量である。
## 一手
「$T$ で要約しても情報を失わない」「$\theta$ について $T$ が全情報」が定義の直観。
<!-- CARD -->
---
id: neyman-factorization
category: math-estimation
subcategory: math-population-sample-statistic
title: ネイマンの分解定理
topic: neyman-factorization
type: theorem
difficulty: 2
priority: S
hashtags: [十分統計量, ネイマンの分解定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ネイマンの分解定理 }]
---
## 問題
ネイマンの分解定理を述べよ。
## 答え
$T$ が $\theta$ の十分統計量であることと、同時密度が
$f(x;\theta)=g_\theta(T(x))\,h(x)$
と分解できることは同値。$h(x)$ は $\theta$ に依存しない。
## 使用公式・定理
十分統計量の判定を条件付き分布でなく密度の分解に帰着させる（十分性 $\iff$ 因子分解）。
## 計算例
$\operatorname{Bernoulli}(p)$ の $T=\sum_i x_i$：$p^T(1-p)^{n-T}\cdot1$ と書け、$h(x)=1$、$g_p(T)=p^T(1-p)^{n-T}$。
## 一手
「$\theta$ と $x$ が分離可能な因子 $g_\theta(T(x))$ と $h(x)$ に分解できる」ことを確認する。台が母数に依存しない指示関数だけを $h(x)$ に入れられる。$U(0,\theta)$ の $1\{X_{(n)}\le\theta\}$ のような母数依存の指示関数は $g_\theta(T(x))$ 側へ入れる。
<!-- CARD -->
---
id: suff-bernoulli
category: math-estimation
subcategory: math-population-sample-statistic
title: ベルヌーイ分布・二項分布族の十分統計量
topic: suff-bernoulli
type: strategy
difficulty: 2
priority: S
hashtags: [十分統計量, ベルヌーイ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ の十分統計量をネイマンの分解定理で求めよ。
## 答え
$T=\sum_{i=1}^n X_i\;(\text{成功回数}).$
## 使用公式・定理
ベルヌーイ分布の確率質量関数を標本について掛けると
$$L(p;x)=\prod_{i=1}^np^{x_i}(1-p)^{1-x_i}
=p^{\sum_i x_i}(1-p)^{n-\sum_i x_i}.$$
$T(x)=\sum_i x_i$ と置けば
$$L(p;x)=\underbrace{p^{T(x)}(1-p)^{n-T(x)}}_{g_p(T(x))}\underbrace{1}_{h(x)}$$
と分解できるので、ネイマンの分解定理から $T$ は十分である。
## 計算例
$n=10$ の標本で成功回数 $\sum x_i=7$。十分統計量は $T=7$ で、標本の並び自体は不要。
## 一手
指数 $\sum x_i$ が $p$ の十分統計量。二項分布 $Y=\sum X_i$ も同値。
<!-- CARD -->
---
id: suff-poisson
category: math-estimation
subcategory: math-population-sample-statistic
title: ポアソン分布族の十分統計量
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
$$L(\mu,\sigma^2;x)
=(2\pi\sigma^2)^{-n/2}
\exp\!\left[-\frac{\sum_i x_i^2-2\mu\sum_i x_i+n\mu^2}{2\sigma^2}\right].$$
したがって母数に依存する部分は標本を $\sum_i x_i$ と $\sum_i x_i^2$ を通じてのみ含み、$T=(\sum_iX_i,\sum_iX_i^2)$ は十分である。
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
また、母数空間の内部で密度が正となる共通の台を持つ密度族では、任意の標本点 $x,y$ に対して
$$\frac{f_\theta(x)}{f_\theta(y)}\text{ が }\theta\text{ に依存しない}
\iff T(x)=T(y)$$
が成り立てば、$T$ は最小十分統計量である。
## 計算例
正規分布 $N(\mu,\sigma^2)$ の2母数族で、標本点 $x,y$ の尤度比を取る。正規化定数は打ち消し合うので
$$\log\frac{f_{\mu,\sigma^2}(x)}{f_{\mu,\sigma^2}(y)}
=-\frac{1}{2\sigma^2}
\left\{\sum_i x_i^2-\sum_i y_i^2
-2\mu\left(\sum_i x_i-\sum_i y_i\right)\right\}.$$
これがすべての $\mu\in\mathbb R,\sigma^2>0$ に依存しないためには
$$\sum_i x_i=\sum_i y_i,\qquad
\sum_i x_i^2=\sum_i y_i^2$$
が必要十分である。したがって
$$T=\left(\sum_iX_i,\sum_iX_i^2\right)$$
は最小十分統計量である。
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
母数空間の内部で密度が正となる共通の台を持つ密度族で、任意の標本点 $x,y$ に対し
$$\frac{f_\theta(x)}{f_\theta(y)}\text{ が }\theta\text{ に依存しない}\iff T(x)=T(y)$$
が成り立てば $T$ は最小十分である。
## 使用公式・定理
標本点 $x,y$ の尤度が母数によらない定数倍になることと、$T(x)=T(y)$ が同値になる統計量が最小十分。
## 計算例
ベルヌーイ分布では $0<p<1$ とすると
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
完備性は指数型分布族でよく成り立つ（次カード）。完備な十分統計量は一様最小分散不偏（UMVU）推定量の構成の要である。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$ とし、すべての $\lambda>0$ について $E_\lambda[g(X)]=0$ と仮定する。このとき
$$0=E_\lambda[g(X)]
=\sum_{x=0}^{\infty}g(x)e^{-\lambda}\frac{\lambda^x}{x!}.$$
両辺に $e^\lambda>0$ を掛けると
$$\sum_{x=0}^{\infty}\frac{g(x)}{x!}\lambda^x=0
\qquad(\forall\lambda>0).$$
左辺は $\lambda$ のべき級数であり、区間上で恒等的に0だから各係数が0である。よって
$$\frac{g(x)}{x!}=0\quad(x=0,1,\ldots),$$
すなわち $P_\lambda(g(X)=0)=1$ である。したがって $X$ は完備統計量である。
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
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$0<p<1$ とする。$T=\sum_iX_i$、自然母数
$$\eta=\log\frac{p}{1-p}\in\mathbb R$$
を使うと、$p=e^\eta/(1+e^\eta)$ なので尤度は
$$L(\eta;x)
=p^T(1-p)^{n-T}
=\exp\!\left\{\eta T-n\log(1+e^\eta)\right\}.$$
したがって $T$ は因子分解により十分統計量である。さらに自然母数空間は実数全体 $\mathbb R$ で開集合だから、指数型分布族の完備性定理により $T$ は完備である。よって $T$ は完備十分統計量である。
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
十分かつ完備（complete sufficient）な統計量は、一様最小分散不偏（UMVU）推定量を構成する基盤になる。完備性は「$\theta$ に依らない偏りのない推定量は一意」を保証し、十分性は情報の損失がないことを保証する。
## 使用公式・定理
完備十分統計量 $T$ に対して、$\theta$ の不偏推定量 $\delta(T)$ は（存在すれば）一意的に定まる。
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ とする。$T=\sum_iX_i$ は完備十分統計量であり、
$$\overline X=\frac Tn$$
は $T$ の関数である。また
$$E_\lambda[\overline X]
=\frac1n\sum_{i=1}^nE_\lambda[X_i]
=\frac1n\cdot n\lambda
=\lambda$$
だから不偏である。レーマン・シェッフェの定理より、$\overline X$ は $\lambda$ の一様最小分散不偏（UMVU）推定量である。
## 一手
「完備十分」$\Rightarrow$ 一意・最良。$\delta(T)$ を $T$ の関数で見つければ一様最小分散不偏（UMVU）推定量になる。
<!-- CARD -->
---
id: rao-blackwell
category: math-estimation
subcategory: math-population-sample-statistic
title: ラオ・ブラックウェルの定理
topic: rao-blackwell
type: theorem
difficulty: 3
priority: S
hashtags: [ラオ・ブラックウェルの定理, 十分統計量, 不偏性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
ラオ・ブラックウェルの定理を述べよ。十分統計量 $T$ と、$E_\theta[\delta(X)^2]<\infty$ を満たす不偏推定量 $\delta(X)$ が与えられたとき、$\delta_T=E[\delta(X)\mid T]$ はどうなるか。
## 答え
$\delta_T=E[\delta(X)\mid T]$ は不偏で、$\operatorname{Var}_\theta(\delta_T)\le\operatorname{Var}_\theta(\delta(X))$（$\forall\theta$）。すなわち条件付き期待値を取る（ラオ・ブラックウェル化）と分散が減る。
## 使用公式・定理
不偏性は条件付き期待値の全期待値から
$$E_\theta[\delta_T]
=E_\theta\!\left[E_\theta[\delta(X)\mid T]\right]
=E_\theta[\delta(X)]
=\theta$$
と確認できる。分散分解から
$$\operatorname{Var}(\delta)
=\operatorname{Var}(E[\delta\mid T])
+E[\operatorname{Var}(\delta\mid T)]
\ge\operatorname{Var}(E[\delta\mid T])$$
である。
## 計算例
$X_1,X_2$ をベルヌーイ分布 $\operatorname{Bernoulli}(p)$ に従う独立同分布標本とし、$T=X_1+X_2$ とする。$T=t$ のもとで成功位置は対称だから
$$P(X_1=1\mid T=t)=\frac t2,$$
$$E[X_1\mid T=t]=1\cdot\frac t2+0\cdot\left(1-\frac t2\right)=\frac t2.$$
よって $E[X_1\mid T]=T/2=(X_1+X_2)/2$。さらに
$$\operatorname{Var}(X_1)=p(1-p),$$
$$\operatorname{Var}\!\left(\frac{X_1+X_2}{2}\right)
=\frac14\{\operatorname{Var}(X_1)+\operatorname{Var}(X_2)\}
=\frac{p(1-p)}2$$
となり、分散は半分になる。
## 一手
不偏なまま $T$ の関数に直すことで分散を下げる。
<!-- CARD -->
---
id: lehmann-scheffe
category: math-estimation
subcategory: math-population-sample-statistic
title: レーマン・シェッフェの定理
topic: lehmann-scheffe
type: theorem
difficulty: 3
priority: S
hashtags: [レーマン・シェッフェの定理, 一様最小分散不偏推定量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
レーマン・シェッフェの定理を述べよ。
## 答え
$T$ が完備十分統計量であり、$\delta(T)$ が $\theta$ の不偏推定量なら、$\delta(T)$ は $\theta$ の一意な一様最小分散不偏（UMVU）推定量である。
## 使用公式・定理
完備性により $T$ の関数で不偏なものは一意。よってそのような $\delta(T)$ が存在すれば、これが一様最小分散不偏（UMVU）推定量であり、一意に定まる。
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ とし、$\sigma^2$ は既知とする。尤度は
$$L(\mu;x)
=h(x)\exp\!\left\{\frac{\mu}{\sigma^2}\sum_i x_i
-\frac{n\mu^2}{2\sigma^2}\right\}$$
と書ける。自然母数 $\eta=\mu/\sigma^2$ は $\mathbb R$ 全体を動くので、$T=\sum_iX_i$ は完備十分統計量である。さらに
$$\overline X=\frac Tn,\qquad
E_\mu[\overline X]=\frac1n\sum_iE_\mu[X_i]=\mu.$$
よってレーマン・シェッフェの定理から、$\overline X$ は $\mu$ の一様最小分散不偏（UMVU）推定量である。
## 一手
「完備十分 $T$ の不偏な関数＝一様最小分散不偏（UMVU）推定量」を確認する。存在すれば一意である。
<!-- CARD -->
---
id: umvu-construction
category: math-estimation
subcategory: math-population-sample-statistic
title: 一様最小分散不偏（UMVU）推定量の構成
topic: umvu-construction
type: strategy
difficulty: 3
priority: A
hashtags: [一様最小分散不偏推定量, 推定量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
完備十分統計量 $T$ を使って $g(\theta)$ の一様最小分散不偏（UMVU）推定量を構成する手順を述べよ。
## 答え
1. $g(\theta)$ の不偏推定量 $\delta(X)$ を見つける。
2. ラオ・ブラックウェル化 $\delta_T=E[\delta(X)\mid T]$ して $T$ の関数にする。
3. $T$ が完備十分ならレーマン・シェッフェの定理から $\delta_T$ が一様最小分散不偏（UMVU）推定量になる。
## 使用公式・定理
$\delta_T=E[\delta(X)\mid T]$ は不偏かつ $T$ の関数である。$T$ が完備十分なら一意な一様最小分散不偏（UMVU）推定量になる。
## 計算例
$X_1,X_2\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$Y=X_1+X_2\sim\operatorname{Binomial}(2,p)$ は $p$ の完備十分統計量。$p^2$ の不偏推定量
$\delta(Y)=\frac{Y(Y-1)}{2}.$
$E[Y]=2p$、$E[Y^2]=\operatorname{Var}(Y)+E[Y]^2=2p(1-p)+4p^2=2p+2p^2$ より $E[Y(Y-1)]=2p^2$，すなわち $E[\delta]=p^2$。$Y$ の関数で不偏なので、レーマン・シェッフェの定理より一様最小分散不偏（UMVU）推定量である。
## 一手
「既知の不偏推定量 → $T$ で条件付け → 完備十分なら一様最小分散不偏（UMVU）推定量」の3段。
<!-- CARD -->
---
id: basu-theorem
category: math-estimation
subcategory: math-population-sample-statistic
title: 補助統計量とバスーの定理
topic: basu-theorem
type: theorem
difficulty: 3
priority: A
hashtags: [バスーの定理, 補助統計量, 完備十分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 十分統計量 }]
---
## 問題
補助統計量（ancillary statistic）の定義とバスーの定理を述べよ。
## 答え
分布が $\theta$ に依存しない統計量を補助統計量と呼ぶ。バスーの定理：$T$ が完備十分統計量なら、$T$ は $\theta$ に依存しない任意の補助統計量 $V$ から独立である。
## 使用公式・定理
$T$ 完備十分 $\Rightarrow$ $T$ と補助統計量 $V$ は独立。
## 計算例
$X_1,\ldots,X_n\overset{iid}{\sim}N(\mu,\sigma^2)$ で $\mu$ のみ未知、$\sigma^2$ は既知とする。上の計算と同様に $T=\sum_iX_i$ は $\mu$ の完備十分統計量である。一方、残差平方和
$$R=\sum_{i=1}^n(X_i-\overline X)^2$$
について
$$\frac{R}{\sigma^2}\sim\chi^2_{n-1}$$
であり、この分布は $\mu$ に依存しない。したがって $R$ は補助統計量である。バスーの定理より
$$T\ \text{と}\ R\ \text{は独立}.$$
$\overline X=T/n$ は $T$ の関数なので、$\overline X$ と $R$ も独立である。
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
正則条件のもとで $E_\theta[U(\theta)]=0$、$\operatorname{Var}_\theta(U(\theta))=I_1(\theta)$（1観測当たりのフィッシャー情報量（1次元））。
## 使用公式・定理
$E[U]=0$ は $\int f=1$ を微分して得る。$\operatorname{Var}(U)=I_1$ がフィッシャー情報量（1次元）の定義と一致。
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$：$\log f=x\log\lambda-\lambda-\log x!$ より $U(\lambda)=x/\lambda-1$。$E[U]=\lambda/\lambda-1=0$。
## 一手
スコアはフィッシャー情報量（1次元）を生む母数導関数。期待値0が最尤の正則性の要。
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
title: 順序統計量全体と十分性
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
独立同分布標本の同時尤度 $\prod_{i=1}^nf_\theta(x_i)$ は標本の並べ替えで変わらない。したがって、順序統計量全体を固定したときに元の観測順序がどの並びになるかという条件付き確率は $\theta$ に依存しない。全値が異なる連続標本では各並びの確率は $1/n!$ であり、同順位がある場合も異なる並びの個数だけが変わる。
## 計算例
$n=3$ とし、離散分布の異なる3点 $a<b<c$ で確率質量 $p_\theta(a),p_\theta(b),p_\theta(c)$ が正とする。独立同分布性から
$$P_\theta(X_1=a,X_2=b,X_3=c)
=p_\theta(a)p_\theta(b)p_\theta(c)$$
であり、6通りの並べ替えはすべて同じ積を持つ。したがって
$$P_\theta\!\left((X_1,X_2,X_3)=(a,b,c)\mid
(X_{(1)},X_{(2)},X_{(3)})=(a,b,c)\right)$$
$$=\frac{p_\theta(a)p_\theta(b)p_\theta(c)}
{6p_\theta(a)p_\theta(b)p_\theta(c)}
=\frac16,$$
となり $\theta$ に依存しない。同順位の例として順序統計量が $(a,a,c)$ なら異なる並べ替えは3通りであり、各条件付き確率は
$$\frac{p_\theta(a)^2p_\theta(c)}
{3p_\theta(a)^2p_\theta(c)}=\frac13$$
となる。したがって同順位があっても母数に依存しない。
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
4. フィッシャー情報量（1次元） $I_1(\theta)$ が有限で正
## 使用公式・定理
正則条件が崩れる例：一様分布 $U(0,\theta)$（台依存）ではスコアも漸近正規性も通常の形で成立しない。
## 計算例
正規分布・ポアソン分布・指数分布・二項分布は正則。$U(0,\theta)$ や三角分布は非正則。
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

---
id: mle-gamma-rate-known-shape
title: shape既知のガンマ分布でrateの最尤推定量を計算する
category: math-estimation
subcategory: math-likelihood-mle
topic: gamma-rate-mle
type: calc_step
difficulty: 3
priority: S
hashtags: [ガンマ分布, 最尤推定量, スコア方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定法 }]
---
## 問題
$X_1,\ldots,X_n$ はshape $\alpha>0$ が既知、rate $\beta>0$ が未知のガンマ分布に従う。$\widehat\beta$ を求め、$\alpha=3,n=5,\sum x_i=12$ で計算せよ。

## 答え
$$\widehat\beta=\frac{n\alpha}{\sum_i x_i}=\frac{\alpha}{\overline x}.$$
数値例では $\widehat\beta=15/12=1.25$。

## 使用公式・定理
shape-rate表記の密度は
$$f(x;\alpha,\beta)=\frac{\beta^\alpha}{\Gamma(\alpha)}
x^{\alpha-1}e^{-\beta x},\qquad x>0.$$
独立標本の対数尤度を微分し、2階微分で最大を確認する。

## 計算例
$\beta$ に依存する項だけ残すと
$$\ell(\beta)=n\alpha\log\beta-\beta\sum_i x_i+C,$$
$$\ell'(\beta)=\frac{n\alpha}{\beta}-\sum_i x_i.$$
$\ell'(\beta)=0$ より $\widehat\beta=n\alpha/\sum_i x_i$。さらに
$$\ell''(\beta)=-\frac{n\alpha}{\beta^2}<0$$
なので一意な最大点である。

## 一手
Gammaのrateは、対数項の係数を標本和で割る。

## 注意
scale母数 $\theta=1/\beta$ の最尤推定量は $\widehat\theta=\overline x/\alpha$ である。

<!-- CARD -->

---
id: mle-exponential-right-censoring
title: 右打切りを含む指数寿命データの最尤推定量を求める
category: math-estimation
subcategory: math-likelihood-mle
topic: censored-exponential-mle
type: calc_step
difficulty: 4
priority: S
hashtags: [打切り, 指数分布, 尤度, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定法 }]
---
## 問題
率 $\lambda$ の指数寿命を観測し、各個体について観測時間 $t_i$ と故障指標 $\delta_i$（故障なら1、右打切りなら0）を得た。$\lambda$ の最尤推定量を求めよ。故障数3、総観測時間12ならいくらか。

## 答え
$$\widehat\lambda=\frac{\sum_i\delta_i}{\sum_i t_i}.$$
故障数3、総観測時間12なら $\widehat\lambda=3/12=0.25$。

## 使用公式・定理
指数分布の密度と生存関数は
$$f(t)=\lambda e^{-\lambda t},\qquad S(t)=e^{-\lambda t}.$$
故障観測は $f(t_i)$、右打切り観測は $S(t_i)$ を尤度へ掛ける。

## 計算例
$$L(\lambda)=\prod_i f(t_i)^{\delta_i}S(t_i)^{1-\delta_i}
=\prod_i\lambda^{\delta_i}e^{-\lambda t_i}
=\lambda^d e^{-\lambda T},$$
ここで $d=\sum_i\delta_i$、$T=\sum_i t_i$。よって
$$\ell(\lambda)=d\log\lambda-\lambda T,\qquad
\ell'(\lambda)=\frac d\lambda-T.$$
$d>0$ なら $\ell'(\lambda)=0$ から $\widehat\lambda=d/T$。

## 一手
打切りは「密度」でなく「その時点まで生存した確率」を尤度へ入れる。

## 注意
$d=0$ なら有限の内部解はなく、尤度は境界 $\lambda=0$ に向かって最大化される。

<!-- CARD -->

---
id: mle-normal-mean-nonnegative
title: 非負制約付き正規平均の最尤推定量を境界まで比較する
category: math-estimation
subcategory: math-likelihood-mle
topic: constrained-normal-mean-mle
type: calc_step
difficulty: 3
priority: A
hashtags: [制約付き最尤推定, 正規分布, 境界解]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定法 }]
---
## 問題
$X_1,\ldots,X_n$ は分散 $\sigma^2$ 既知の正規分布 $N(\mu,\sigma^2)$ に従い、母数空間は $\mu\ge0$ とする。最尤推定量を求め、$\overline x=-0.7$ の場合を判定せよ。

## 答え
$$\widehat\mu=\max(0,\overline X).$$
$\overline x=-0.7$ なら制約なしの解は許されないので、境界解 $\widehat\mu=0$。

## 使用公式・定理
$\mu$ に関する対数尤度は
$$\ell(\mu)=C-\frac{n}{2\sigma^2}(\mu-\overline x)^2.$$
したがって、制約集合 $[0,\infty)$ の中で $\overline x$ に最も近い点を選ぶ。

## 計算例
$$\ell'(\mu)=\frac n{\sigma^2}(\overline x-\mu).$$
$\overline x=-0.7$ ではすべての $\mu\ge0$ に対して $\ell'(\mu)<0$ なので、$\ell(\mu)$ は許容範囲で単調減少する。ゆえに左端 $\mu=0$ が最大点となる。

## 一手
スコア方程式の解が母数空間外なら、境界を含めて尤度を比較する。

## 注意
境界真値 $\mu=0$ では通常の内部点を仮定した漸近正規性をそのまま使えない。

<!-- CARD -->
