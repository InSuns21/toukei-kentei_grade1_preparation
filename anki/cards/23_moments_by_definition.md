---
id: dist-poisson-moments-by-definition
title: ポアソン分布の平均・分散を定義の級数から導出する
category: math-distributions
subcategory: math-discrete-distributions
topic: poisson-moments-definition
type: calc_step
difficulty: 2
priority: S
hashtags: [ポアソン分布, 平均, 分散, 定義からの導出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン分布 }]
---
## 問題
$X\sim\operatorname{Poisson}(\lambda)$ は確率質量関数 $p_X(k)=e^{-\lambda}\dfrac{\lambda^k}{k!}$（$k=0,1,2,\ldots$）を持つ。期待値の定義式から直接 $E[X]$ と $\operatorname{Var}(X)$ を求めよ。

## 答え
$$E[X]=\lambda,\qquad \operatorname{Var}(X)=\lambda.$$

## 使用公式・定理
定義通りに無限級数を計算する。
$$E[X]=\sum_{k=0}^{\infty}k\,e^{-\lambda}\frac{\lambda^k}{k!}.$$
導出では「$k/k! = 1/(k-1)!$」「指数関数の級数 $\sum_{k=0}^{\infty}\lambda^k/k! = e^{\lambda}$」を使う。分散は $E[X(X-1)]$ を先に計算してから $\operatorname{Var}(X)=E[X^2]-E[X]^2$ と整理する。

## 計算例
$$E[X]=\sum_{k=1}^{\infty}e^{-\lambda}\frac{\lambda^k}{(k-1)!}=\lambda e^{-\lambda}\sum_{j=0}^{\infty}\frac{\lambda^j}{j!}=\lambda e^{-\lambda}e^{\lambda}=\lambda.$$
次に
$$E[X(X-1)]=\sum_{k=2}^{\infty}k(k-1)e^{-\lambda}\frac{\lambda^k}{k!}=\lambda^2e^{-\lambda}\sum_{j=0}^{\infty}\frac{\lambda^j}{j!}=\lambda^2.$$
$E[X^2]=E[X(X-1)]+E[X]=\lambda^2+\lambda$ なので
$$\operatorname{Var}(X)=(\lambda^2+\lambda)-\lambda^2=\lambda.$$

## 一手
分母の $k!$ を $k(k-1)\cdots$ で約分して指数部をずらし、$e^{\lambda}$ の級数へ帰着させる。

## 注意
$k=0$ の項は0なので和を $k=1$ や $k=2$ から始めてよい。ポアソン分布は平均と分散が等しい。本カードは定義の級数からの導出であり、確率母関数を使う既存カード `dist-poisson-moments` とは別の経路である。

<!-- CARD -->

---
id: dist-gamma-moments-by-definition
title: ガンマ分布の平均・分散を密度の積分から求める
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-moments-definition
type: calc_step
difficulty: 3
priority: S
hashtags: [ガンマ分布, 平均, 分散, 積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布 }]
---
## 問題
$X\sim\operatorname{Gamma}(\alpha,\beta)$ が密度 $f_X(x)=\dfrac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}$（$x>0$）を持つ。期待値の定義 $E[X^r]=\int_0^\infty x^r f_X(x)dx$ から $E[X]$ と $E[X^2]$ を求め、分散を導出せよ。

## 答え
$$E[X]=\frac{\alpha}{\beta},\qquad E[X^2]=\frac{\alpha(\alpha+1)}{\beta^2},\qquad \operatorname{Var}(X)=\frac{\alpha}{\beta^2}.$$

## 使用公式・定理
$\Gamma(\alpha)$ の定義
$$\Gamma(\alpha)=\int_0^\infty u^{\alpha-1}e^{-u}du$$
と漸化式 $\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$ を使う。$u=\beta x$ と置くと
$$x=\frac{u}{\beta},\qquad dx=\frac{du}{\beta}.$$ 
このため、一般に
$$\int_0^\infty x^{c-1}e^{-\beta x}dx
=\frac1{\beta^c}\int_0^\infty u^{c-1}e^{-u}du
=\frac{\Gamma(c)}{\beta^c}.$$ 

## 計算例
$$E[X]=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty x^\alpha e^{-\beta x}\,dx$$
$$=\frac{\beta^\alpha}{\Gamma(\alpha)}
\frac{\Gamma(\alpha+1)}{\beta^{\alpha+1}}
=\frac{\alpha\Gamma(\alpha)}{\beta\Gamma(\alpha)}=\frac{\alpha}{\beta}.$$ 
$E[X^2]$ も $u=\beta x$ と置いて同様に
$E[X^2]=\frac{\beta^\alpha}{\Gamma(\alpha)}\int_0^\infty x^{\alpha+1}e^{-\beta x}dx=\frac{\beta^\alpha}{\Gamma(\alpha)}\frac{\Gamma(\alpha+2)}{\beta^{\alpha+2}}=\frac{\alpha(\alpha+1)}{\beta^2}.$
よって
$$\operatorname{Var}(X)=\frac{\alpha(\alpha+1)}{\beta^2}-\frac{\alpha^2}{\beta^2}=\frac{\alpha}{\beta^2}.$$

## 一手
$\int_0^\infty x^{\alpha-1}e^{-\beta x}dx=\Gamma(\alpha)/\beta^\alpha$（ガンマ積分）を基準に、$x^r$ が付くと形状パラメータが $\alpha+r$ に変わる。

## 注意
平均は shape/rate、分散は shape/rate²。$\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$ を繰り返し使う。本カードは密度の積分からの導出であり、公式提示の既存カード `dist-gamma-moments` とは異なる。

<!-- CARD -->

---
id: dist-beta-moments-by-definition
title: ベータ分布の平均・分散を定義の積分から求める
category: math-distributions
subcategory: math-continuous-distributions
topic: beta-moments-definition
type: calc_step
difficulty: 3
priority: A
hashtags: [ベータ分布, 平均, 分散, 定義]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベータ分布 }]
---
## 問題
$X\sim\operatorname{Beta}(a,b)$ は密度 $f_X(x)=\dfrac{x^{a-1}(1-x)^{b-1}}{B(a,b)}$（$0<x<1$）を持つ。$E[X]$ と $E[X^2]$ を定義の積分から求め、$\operatorname{Var}(X)$ を導出せよ。

## 答え
$$E[X]=\frac{a}{a+b},\qquad \operatorname{Var}(X)=\frac{ab}{(a+b)^2(a+b+1)}.$$

## 使用公式・定理
ベータ関数は $B(a,b)=\int_0^1u^{a-1}(1-u)^{b-1}\,du$、さらに $B(a,b)=\dfrac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$ である。$E[X^r]=\int_0^1x^r\dfrac{x^{a-1}(1-x)^{b-1}}{B(a,b)}\,dx=\dfrac{B(a+r,b)}{B(a,b)}$ と書ける。

## 計算例
$$E[X]=\frac{B(a+1,b)}{B(a,b)}=\frac{\Gamma(a+1)\Gamma(b)/\Gamma(a+1+b)}{\Gamma(a)\Gamma(b)/\Gamma(a+b)}=\frac{a}{a+b}.$$
$$E[X^2]=\frac{B(a+2,b)}{B(a,b)}=\frac{a(a+1)}{(a+b)(a+b+1)}.$$
よって第二項を分母 $(a+b)^2(a+b+1)$ に揃えると
$\operatorname{Var}(X)=\frac{a(a+1)(a+b)}{(a+b)^2(a+b+1)}-\frac{a^2(a+b+1)}{(a+b)^2(a+b+1)}=\frac{ab}{(a+b)^2(a+b+1)}.$
## 一手
$E[X^r]=B(a+r,b)/B(a,b)$ に帰着させ、$B$ のガンマ関数表示で分数を約分する。
## 注意
$0<x<1$ の台に注意。$a=b=1$ なら一様分布になり平均 $1/2$、分散 $1/12$ と一致する。本カードはベータ積分の比からの導出であり、導出を省略した既存カード `dist-beta-moments` を補完する。

<!-- CARD -->

---
id: dist-lognormal-moments-by-definition
title: 対数正規分布の平均・分散を定義の積分から求める
category: math-distributions
subcategory: math-continuous-distributions
topic: lognormal-moments-definition
type: calc_step
difficulty: 3
priority: S
hashtags: [対数正規分布, 平均, 分散, 積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 対数正規分布 }]
---
## 問題
$X=e^Y$、正規分布 $Y\sim N(\mu,\sigma^2)$（密度 $f_Y(y)=\frac1{\sqrt{2\pi\sigma^2}}e^{-\frac{(y-\mu)^2}{2\sigma^2}}$）とする。$E[X]$ と $E[X^2]$ を、$E[X^r]=E[e^{rY}]$ を定義の積分から平方完成で求め、分散を導出せよ。

## 答え
$$E[X]=e^{\mu+\sigma^2/2},\qquad \operatorname{Var}(X)=(e^{\sigma^2}-1)e^{2\mu+\sigma^2}.$$

## 使用公式・定理
$$E[e^{rY}]=\int_{-\infty}^{\infty}e^{ry}\frac1{\sqrt{2\pi\sigma^2}}e^{-\frac{(y-\mu)^2}{2\sigma^2}}\,dy.$$
指数部を $-\frac{(y-\mu)^2}{2\sigma^2}+ry=-\frac{(y-(\mu+r\sigma^2))^2}{2\sigma^2}+r\mu+\frac{r^2\sigma^2}{2}$ と平方完成し、正規密度の積分が1であることを使う。

## 計算例
$$E[e^{rY}]=e^{r\mu+r^2\sigma^2/2}\int_{-\infty}^{\infty}\frac1{\sqrt{2\pi\sigma^2}}e^{-\frac{(y-(\mu+r\sigma^2))^2}{2\sigma^2}}\,dy=e^{r\mu+r^2\sigma^2/2}.$$
$r=1$ で $E[X]=e^{\mu+\sigma^2/2}$、$r=2$ で $E[X^2]=e^{2\mu+2\sigma^2}$。よって
$$\operatorname{Var}(X)=e^{2\mu+2\sigma^2}-e^{2\mu+\sigma^2}=(e^{\sigma^2}-1)e^{2\mu+\sigma^2}.$$

## 一手
指数部分を平方完成し、正規密度の積分 が1であることに帰着させる。中心を $\mu$ から $\mu+r\sigma^2$ へずらす。

## 注意
平均は $e^\mu$ ではなく $e^{\mu+\sigma^2/2}$ である。モーメント母関数を使わず、密度の積分の直接計算で導出している。理工学では品質・寿命・収入など正の値を取る量のモデルに多用され、このS優先度の根拠である。
