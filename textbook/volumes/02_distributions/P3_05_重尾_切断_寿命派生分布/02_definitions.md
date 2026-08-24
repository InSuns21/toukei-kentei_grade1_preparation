# 定義

## Pareto分布

$X\sim\operatorname{Pareto}(x_m,\alpha)$ は $x_m>0,\alpha>0$、台 $x\geq x_m$ で
$$
f(x)=\frac{\alpha x_m^\alpha}{x^{\alpha+1}},\;
F(x)=1-\left(\frac{x_m}{x}\right)^\alpha,\;
S(x)=\left(\frac{x_m}{x}\right)^\alpha.
$$

## Laplace分布

$X\sim\operatorname{Laplace}(\mu,b)$ は $\mu\in\mathbb R,b>0$、台 $x\in\mathbb R$ で
$$f(x)=\frac1{2b}\exp\left(-\frac{|x-\mu|}{b}\right).$$
左右に分けて積分すると $E[X]=\mu$、$\operatorname{Var}(X)=2b^2$ となる。

## Rayleigh分布

$X\sim\operatorname{Rayleigh}(\sigma)$ は $\sigma>0$、台 $x\geq0$ で
$$f(x)=\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)},\;
F(x)=1-e^{-x^2/(2\sigma^2)}.$$

## 切断と打切り

右切断 $X\mid(X\leq c)$ の密度は $x\leq c$ で
$$f_{\mathrm{tr}}(x)=\frac{f(x)}{F(c)}.$$
右打切りでは、$X\leq c$ のとき故障時刻 $X$ を観測し、$X>c$ のときは「$X>c$」だけを観測する。後者の尤度寄与は $S(c)$ であり、密度 $f(c)$ ではない。

## 生存関数・ハザード・平均残存寿命

$F(x)=P(X\leq x)$、$S(x)=1-F(x)$ とする。$f(x)$ が存在し $S(x)>0$ の範囲で
$$h(x)=\frac{f(x)}{S(x)},\; H(x)=\int_0^x h(u)\,du=-\log S(x).$$
平均残存寿命は
$$m(x)=\frac{\int_x^\infty S(u)\,du}{S(x)}$$
である（積分が有限な範囲で定義する）。
### 以下で使う条件

右切断では $F(c)>0$ とし、密度の式は元の台と $x\le c$ の共通部分で使う。非負寿命では $S(0)=1$ とし、$H(x)=-\log S(x)$ は $S(x)>0$ の範囲で使う。
### Laplaceの分布関数

Laplace$(\mu,b)$ のCDFは
$$F(x)=\begin{cases}\tfrac12e^{(x-\mu)/b},&x\le\mu,\\1-\tfrac12e^{-(x-\mu)/b},&x>\mu.\end{cases}$$
したがって $F(\mu)=1/2$ である。
