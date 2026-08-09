# 定義と記法

Gamma関数とBeta関数を
$$
\Gamma(a)=\int_0^\infty x^{a-1}e^{-x}\,dx\quad(a>0),
$$
$$
B(a,b)=\int_0^1x^{a-1}(1-x)^{b-1}\,dx
=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}\quad(a,b>0)
$$
とします。指示関数は共通記法 $\boldsymbol{1}$ を使います。

## P3C-DEF-01 一様分布

$a<b$ のとき $X\sim\operatorname{Unif}(a,b)$ とは、台 $(a,b)$ 上で
$$
f(x)=\frac{1}{b-a}\boldsymbol{1}_{(a,b)}(x)
$$
となる分布です。端点の含め方は確率を変えません。区間長を掛ければ積分は1です。

## P3C-DEF-02 正規分布

$\mu\in\mathbb R$, $\sigma>0$ のとき $X\sim N(\mu,\sigma^2)$ とは
$$
f(x)=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\},
\qquad x\in\mathbb R
$$
となる分布です。第2パラメータは標準偏差でなく分散です。標準正規分布の密度とCDFを $\phi$, $\Phi$ と書きます。

## P3C-DEF-03 指数分布とGamma分布

$\lambda>0$ のとき $X\sim\operatorname{Exp}(\lambda)$ は率$\lambda$の指数分布で、
$$
f(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x).
$$

$\alpha>0$, $\beta>0$ のとき $X\sim\operatorname{Gamma}(\alpha,\beta)$ は形状$\alpha$、率$\beta$のGamma分布で、
$$
f(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}
\boldsymbol{1}_{(0,\infty)}(x).
$$
$u=\beta x$ と置けば密度の積分は1です。Exp$(\lambda)$はGamma$(1,\lambda)$です。

## P3C-DEF-04 Beta分布

$\alpha>0$, $\beta>0$ のとき $X\sim\operatorname{Beta}(\alpha,\beta)$ とは
$$
f(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}
\boldsymbol{1}_{(0,1)}(x)
$$
となる分布です。Beta関数の定義そのものから正規化されます。

## P3C-DEF-05 Cauchy分布

$x_0\in\mathbb R$, $\gamma>0$ のとき $X\sim\operatorname{Cauchy}(x_0,\gamma)$ とは
$$
f(x)=\frac{1}{\pi\gamma}
\frac{1}{1+\{(x-x_0)/\gamma\}^2},
\qquad x\in\mathbb R
$$
となる分布です。$u=(x-x_0)/\gamma$ と置けば積分は $\pi^{-1}[\arctan u]_{-\infty}^{\infty}=1$ です。位置$x_0$は中央値ですが、期待値ではありません。

## P3C-DEF-06 対数正規分布

$\mu\in\mathbb R$, $\sigma>0$ とします。$\log X\sim N(\mu,\sigma^2)$ のとき $X\sim\operatorname{Lognormal}(\mu,\sigma^2)$ といい、
$$
f(x)=\frac{1}{x\sigma\sqrt{2\pi}}
\exp\left\{-\frac{(\log x-\mu)^2}{2\sigma^2}\right\}
\boldsymbol{1}_{(0,\infty)}(x).
$$
$y=\log x$ により正規密度へ戻るので正規化されます。

## P3C-DEF-07 Weibull分布

形状$c>0$、尺度$\eta>0$ とします。$X\sim\operatorname{Weibull}(c,\eta)$ とは
$$
f(x)=\frac{c}{\eta}\left(\frac{x}{\eta}\right)^{c-1}
\exp\left\{-\left(\frac{x}{\eta}\right)^c\right\}
\boldsymbol{1}_{(0,\infty)}(x)
$$
となる分布です。$u=(x/\eta)^c$ と置くと $f(x)dx=e^{-u}du$ なので積分は1です。$c=1$ではExp$(1/\eta)$です。

## P3C-DEF-08 Logistic分布

$\mu\in\mathbb R$, $s>0$ のとき $X\sim\operatorname{Logistic}(\mu,s)$ とはCDFが
$$
F(x)=\frac{1}{1+e^{-(x-\mu)/s}}
$$
となる分布です。微分して
$$
f(x)=\frac{e^{-(x-\mu)/s}}{s\{1+e^{-(x-\mu)/s}\}^2},
\qquad x\in\mathbb R.
$$
$F(-\infty)=0$, $F(\infty)=1$ なので密度の積分は1です。
