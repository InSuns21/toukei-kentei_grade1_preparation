# 基本命題と主要定理

## この章で使う分布の式

本ファイルを単独で読めるよう、定理で使う確率密度関数を先に示す。表の範囲外では密度を0とする。

| 分布 | 母数と台 | 確率密度関数 $f(x)$ |
|---|---|---|
| Unif$(a,b)$ | $a<b$; $a<x<b$ | $f(x)=1/(b-a)$ |
| $N(\mu,\sigma^2)$ | $\mu\in\mathbb R$, $\sigma>0$; $x\in\mathbb R$ | $f(x)=e^{-(x-\mu)^2/(2\sigma^2)}/(\sigma\sqrt{2\pi})$ |
| Exp$(\lambda)$ | $\lambda>0$; $x>0$ | $f(x)=\lambda e^{-\lambda x}$ |
| Gamma$(\alpha,\beta)$ | $\alpha,\beta>0$; $x>0$ | $f(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$ |
| Beta$(\alpha,\beta)$ | $\alpha,\beta>0$; $0<x<1$ | $f(x)=x^{\alpha-1}(1-x)^{\beta-1}/B(\alpha,\beta)$ |
| Cauchy$(x_0,\gamma)$ | $x_0\in\mathbb R$, $\gamma>0$; $x\in\mathbb R$ | $f(x)=1/[\pi\gamma\{1+((x-x_0)/\gamma)^2\}]$ |
| Lognormal$(\mu,\sigma^2)$ | $\mu\in\mathbb R$, $\sigma>0$; $x>0$ | $f(x)=e^{-(\log x-\mu)^2/(2\sigma^2)}/(x\sigma\sqrt{2\pi})$ |
| Weibull$(c,\eta)$ | $c,\eta>0$; $x>0$ | $f(x)=(c/\eta)(x/\eta)^{c-1}e^{-(x/\eta)^c}$ |
| Logistic$(\mu,s)$ | $\mu\in\mathbb R$, $s>0$; $x\in\mathbb R$ | $f(x)=e^{-(x-\mu)/s}/[s\{1+e^{-(x-\mu)/s}\}^2]$ |

モーメント母関数（moment generating function; MGF）は$M_X(t)=E[e^{tX}]$であり、有限となる$t$の範囲も定理の一部である。

## 平均・分散・モーメント母関数一覧

| 分布 | 平均 | 分散 | MGF $M(t)$ と存在範囲 |
|---|---:|---:|---|
| Unif$(a,b)$ | $(a+b)/2$ | $(b-a)^2/12$ | $(e^{tb}-e^{ta})/\{t(b-a)\}$、全$t$（$M(0)=1$） |
| $N(\mu,\sigma^2)$ | $\mu$ | $\sigma^2$ | $e^{\mu t+\sigma^2t^2/2}$、全$t$ |
| Exp$(\lambda)$ | $1/\lambda$ | $1/\lambda^2$ | $\lambda/(\lambda-t)$、$t<\lambda$ |
| Gamma$(\alpha,\beta)$ | $\alpha/\beta$ | $\alpha/\beta^2$ | $\{\beta/(\beta-t)\}^\alpha$、$t<\beta$ |
| Beta$(\alpha,\beta)$ | $\alpha/(\alpha+\beta)$ | $\alpha\beta/\{(\alpha+\beta)^2(\alpha+\beta+1)\}$ | 全$t$で有限。$\sum_{r\geq0}E[X^r]t^r/r!$ |
| Cauchy$(x_0,\gamma)$ | 存在しない | 存在しない | $t\neq0$で発散 |
| Lognormal$(\mu,\sigma^2)$ | $e^{\mu+\sigma^2/2}$ | $e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$ | $t\leq0$で有限、$t>0$で発散。0の開近傍には存在しない |
| Weibull$(c,\eta)$ | $\eta\Gamma(1+1/c)$ | $\eta^2[\Gamma(1+2/c)-\Gamma(1+1/c)^2]$ | $c>1$なら全$t$、$c=1$なら$t<1/\eta$、$0<c<1$なら$t\leq0$ |
| Logistic$(\mu,s)$ | $\mu$ | $\pi^2s^2/3$ | $e^{\mu t}\pi st/\sin(\pi st)$、$|t|<1/s$ |

Beta分布のMGFは積分上は全実数で有限ですが、初等関数だけでは通常書きません。$0<X<1$より
$$
\sum_{r=0}^{\infty}E[X^r]\frac{|t|^r}{r!}
\leq\sum_{r=0}^{\infty}\frac{|t|^r}{r!}=e^{|t|}<\infty.
$$
従って絶対収束により期待値と級数を交換でき、$M_X(t)=\sum_{r\geq0}E[X^r]t^r/r!$です。Cauchy分布では対称性を根拠に平均を0と書いてはいけません。

一様分布では直接積分して
$$
E[X]=\frac1{b-a}\int_a^b x\,dx=\frac{a+b}{2},
$$
$$
E[X^2]=\frac{a^2+ab+b^2}{3},\qquad
\operatorname{Var}(X)=E[X^2]-E[X]^2=\frac{(b-a)^2}{12}.
$$

## P3C-THM-01 正規分布の標準化とMGF

標準正規密度の正規化を確認します。$I=\int_{-\infty}^{\infty}e^{-x^2/2}dx$と置きます。被積分関数は非負なので二重積分を反復積分として計算でき、極座標変換を使うと
$$
I^2=\int_{\mathbb R^2}e^{-(x^2+y^2)/2}\,dx\,dy
=\int_0^{2\pi}\int_0^\infty e^{-r^2/2}r\,dr\,d\theta=2\pi.
$$
$I>0$より$I=\sqrt{2\pi}$です。一般の正規密度も$z=(x-\mu)/\sigma$で標準形へ戻るため積分は1です。

$X\sim N(\mu,\sigma^2)$ なら $Z=(X-\mu)/\sigma\sim N(0,1)$ で
$$
P(X\leq x)=\Phi\left(\frac{x-\mu}{\sigma}\right).
$$
MGFは平方完成により
$$
\begin{aligned}
M_X(t)
&=\int_{-\infty}^{\infty}e^{tx}
\frac{e^{-(x-\mu)^2/(2\sigma^2)}}{\sqrt{2\pi}\sigma}\,dx\\
&=e^{\mu t+\sigma^2t^2/2}
\int_{-\infty}^{\infty}
\frac{1}{\sqrt{2\pi}\sigma}
\exp\left[-\frac{\{x-(\mu+\sigma^2t)\}^2}{2\sigma^2}\right]dx\\
&=e^{\mu t+\sigma^2t^2/2}.
\end{aligned}
$$
従って $M_X'(0)=\mu$、$M_X''(0)=\mu^2+\sigma^2$ から平均と分散が従います。

## P3C-THM-02 Gamma分布のモーメントと再生性

$X\sim\operatorname{Gamma}(\alpha,\beta)$ なら、$r>-\alpha$ に対し
$$
\begin{aligned}
E[X^r]
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty x^{\alpha+r-1}e^{-\beta x}\,dx\\
&=\frac{\Gamma(\alpha+r)}{\Gamma(\alpha)\beta^r}.
\end{aligned}
$$
$r=1,2$ と $\Gamma(z+1)=z\Gamma(z)$ を使えば平均$\alpha/\beta$、分散$\alpha/\beta^2$です。また$t<\beta$で
$$
M_X(t)=\left(\frac{\beta}{\beta-t}\right)^\alpha.
$$
共通の率$\beta$を持つ独立な $X_i\sim\operatorname{Gamma}(\alpha_i,\beta)$ ではMGFを掛けて
$$
\sum_iX_i\sim\operatorname{Gamma}\left(\sum_i\alpha_i,\beta\right)
$$
です。率が異なる場合にはこの結論は使えません。

## P3C-THM-03 Beta分布のモーメント

$X\sim\operatorname{Beta}(\alpha,\beta)$ なら $r>-\alpha$ に対し
$$
E[X^r]=\frac{B(\alpha+r,\beta)}{B(\alpha,\beta)}
=\frac{\Gamma(\alpha+r)\Gamma(\alpha+\beta)}
{\Gamma(\alpha)\Gamma(\alpha+\beta+r)}.
$$
従って
$$
E[X]=\frac\alpha{\alpha+\beta},\qquad
E[X^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)},
$$
であり、$E[X^2]-E[X]^2$ を通分すると表の分散を得ます。

## P3C-THM-04 生存関数・ハザード・変数変換

非負連続変数の生存関数とハザードを
$$
S(x)=P(X>x)=1-F(x),\qquad h(x)=\frac{f(x)}{S(x)}
$$
とします。Exp$(\lambda)$では$x\geq0$で$S(x)=e^{-\lambda x}$、$x>0$で$h(x)=\lambda$です。
すなわち
$$
S(x)=e^{-\lambda x},\qquad h(x)=\lambda,
$$
であり、$x<0$では$F(x)=0$, $S(x)=1$です。従って$s,t\geq0$なら $P(X>s+t\mid X>s)=S(s+t)/S(s)=S(t)$ です。

Weibull$(c,\eta)$では$x\geq0$で$S(x)=e^{-(x/\eta)^c}$、$x>0$で
$$
h(x)=\frac{c}{\eta}\left(\frac{x}{\eta}\right)^{c-1}.
$$
$x<0$では$F(x)=0$, $S(x)=1$です。
従って$c>1$でハザードは増加、$c=1$で一定、$0<c<1$で減少します。また
$$
Y=\left(\frac X\eta\right)^c\sim\operatorname{Exp}(1),
$$
であり、$r>-c$に対して
$$
E[X^r]=\eta^r\Gamma\left(1+\frac rc\right)
$$
です。

MGFの正の側の収束も同じ変換で判定できます。被積分関数の指数部は
$$
t\eta y^{1/c}-y.
$$
$c>1$なら$y$の負の項が優勢なので全$t$で有限、$c=1$なら$t<1/\eta$で有限、$0<c<1$なら任意の$t>0$で正の項が優勢となり発散します。$t\leq0$では常に有限です。

## P3C-THM-05 対数変換と重い裾

$Y\sim N(\mu,\sigma^2)$ かつ $X=e^Y$ なら対数正規分布です。任意の実数$r$について
$$
E[X^r]=E[e^{rY}]=e^{r\mu+r^2\sigma^2/2}.
$$
$r=1,2$から表の平均・分散を得ます。一方、任意の$t>0$で
$$
E[e^{tX}]=\int_0^\infty e^{tx}f_X(x)\,dx=\infty
$$
です。指数$tx$が $(\log x)^2/(2\sigma^2)$ より速く増えるためです。

$t<0$なら$X>0$より$0<e^{tX}\leq1$、$t=0$なら$e^{tX}=1$なので、$M_X(t)$は$t\leq0$で有限です。ただし0を含む開区間上では有限でないため、通常の意味でMGFは存在しません。

標準Cauchy分布では
$$
\int_0^\infty x\frac{dx}{\pi(1+x^2)}=\infty.
$$
正負部分の期待値がともに無限大なので、対称な主値が0でも通常の期待値は存在しません。

一般の$X=x_0+\gamma Z$（$\gamma>0$）でも同様です。$z\geq2|x_0|/\gamma$なら$x_0+\gamma z\geq\gamma z/2$なので正部分の期待値は標準Cauchyの正側一次モーメントで下から評価され、無限大です。$z\leq-2|x_0|/\gamma$では$x_0+\gamma z\leq-\gamma|z|/2$となり、負部分も無限大です。従って任意の位置・尺度のCauchy分布で平均は存在しません。

## 統計推測での用途

| 分布 | 典型的な用途 |
|---|---|
| 一様 | 無情報区間、乱数、順序統計量の基礎 |
| 正規 | 誤差モデル、標本分布、漸近近似 |
| 指数・Weibull | 寿命・待ち時間・信頼性 |
| Gamma | 待ち時間、正値パラメータ、分散成分 |
| Beta | 確率・割合、二項確率の事前分布 |
| Cauchy | 重い裾、平均不在の反例、ロバスト性 |
| 対数正規 | 乗法効果、所得・濃度・寿命 |
| Logistic | 二値応答のリンク、正規に似た対称誤差 |
