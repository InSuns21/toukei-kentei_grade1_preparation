# 詳細解答集

## P3C-A01 解答

### 詳細解答

$$
F(x)=
\begin{cases}
0,&x\leq2,\\
(x-2)/4,&2<x<6,\\
1,&x\geq6.
\end{cases}
$$
従って $P(3<X\leq5)=(5-3)/4=1/2$、平均は$(2+6)/2=4$、分散は$(6-2)^2/12=4/3$です。

### 本番答案

$F(x)=0$（$x\leq2$）、$(x-2)/4$（$2<x<6$）、1（$x\geq6$）。$P(3<X\leq5)=1/2$、$E[X]=4$、$\operatorname{Var}(X)=4/3$。

### 採点基準

CDF4点、確率2点、平均・分散各2点。

## P3C-A02 解答

### 詳細解答

生存関数は$S(x)=e^{-0.5x}$（$x\geq0$）、$S(x)=1$（$x<0$）です。従って
$$
P(X>4)=e^{-2},\qquad
P(X>6\mid X>2)=\frac{e^{-3}}{e^{-1}}=e^{-2}.
$$
平均は$1/0.5=2$、分散は$1/(0.5)^2=4$です。

### 本番答案

$S(x)=e^{-x/2}$（$x\geq0$）、$S(x)=1$（$x<0$）より、二つの確率はともに$e^{-2}$。$E[X]=2$、$\operatorname{Var}(X)=4$。

### 採点基準

生存関数2点、確率各2点、平均・分散各2点。

## P3C-A03 解答

### 詳細解答

$Z=(X-10)/2$ と標準化すると
$$
P(8<X\leq13)=P(-1<Z\leq1.5)=\Phi(1.5)-\Phi(-1).
$$
平均10、分散4です。

### 本番答案

$Z=(X-10)/2\sim N(0,1)$ より $P(8<X\leq13)=\Phi(1.5)-\Phi(-1)$。平均10、分散4。

### 採点基準

標準化4点、確率2点、平均・分散各2点。

## P3C-A04 解答

### 詳細解答

積分して
$$
F(x)=\frac12+\frac1\pi\arctan x.
$$
よって
$$
P(|X|\leq1)=F(1)-F(-1)=\frac12.
$$
一方、正部分の一次モーメントは
$$
\int_0^R\frac{x}{\pi(1+x^2)}\,dx
=\frac{1}{2\pi}\log(1+R^2)\longrightarrow\infty.
$$
負部分も絶対値で発散するため、対称性にかかわらず期待値は存在しません。

### 本番答案

$F(x)=1/2+\pi^{-1}\arctan x$ より $P(|X|\leq1)=1/2$。また $\int_0^R x\{\pi(1+x^2)\}^{-1}dx=(2\pi)^{-1}\log(1+R^2)\to\infty$ なので期待値は存在しない。

### 採点基準

CDF3点、確率2点、発散積分4点、結論1点。

## P3C-B01 解答

### 詳細解答

$$
\int_0^\infty x^2e^{-2x}\,dx=\frac{\Gamma(3)}{2^3}=\frac14
$$
なので$c=4$です。これはGamma$(3,2)$（形状3、率2）で、
$$
E[X]=\frac32,\qquad \operatorname{Var}(X)=\frac34,
\qquad M_X(t)=\left(\frac2{2-t}\right)^3\quad(t<2).
$$

### 本番答案

Gamma積分より$c=4$。密度はGamma$(3,2)$の率表示で、平均$3/2$、分散$3/4$、$M_X(t)=\{2/(2-t)\}^3$（$t<2$）。

### 採点基準

正規化3点、分布同定2点、平均分散各1点、MGFと範囲3点。

## P3C-B02 解答

### 詳細解答

$$
\int_0^1x(1-x)^2dx=B(2,3)=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}=\frac1{12}.
$$
従って$c=12$、分布はBeta$(2,3)$です。
$$
E[X]=\frac25,
\qquad
\operatorname{Var}(X)=\frac{2\cdot3}{5^2\cdot6}=\frac1{25}.
$$

### 本番答案

$B(2,3)=1/12$より$c=12$。Beta$(2,3)$で、平均$2/5$、分散$1/25$。

### 採点基準

正規化4点、分布同定2点、平均分散各2点。

## P3C-B03 解答

### 詳細解答

$$
S(x)=e^{-(x/3)^2}\quad(x\geq0),\qquad
h(x)=\frac{f(x)}{S(x)}=\frac{2x}{9}\quad(x>0).
$$
$S(m)=1/2$を解くと$m=3\sqrt{\log2}$です。$y\geq0$で
$$
P(Y\leq y)=P(X\leq3\sqrt y)=1-e^{-y},
$$
なので$Y\sim\operatorname{Exp}(1)$です。なお$x<0$では$S(x)=1$です。

### 本番答案

$S(x)=e^{-(x/3)^2}$（$x\geq0$）、$S(x)=1$（$x<0$）、$h(x)=2x/9$（$x>0$）。中央値は$3\sqrt{\log2}$。$P(Y\leq y)=1-e^{-y}$（$y\geq0$）より$Y\sim\operatorname{Exp}(1)$。

### 採点基準

生存関数2点、ハザード3点、中央値2点、変換分布3点。

## P3C-B04 解答

### 詳細解答

対数正規分布の中央値は$e^0=1$、平均は$e^{1/2}$、分散は$e(e-1)$です。Logistic分布の分位点は
$$
Q(u)=\mu+s\log\frac{u}{1-u}.
$$
従って中央値は$\mu$、第1・第3四分位点は$\mu-s\log3$, $\mu+s\log3$です。

### 本番答案

(1) 中央値1、平均$e^{1/2}$、分散$e(e-1)$。(2) $Q(u)=\mu+s\log\{u/(1-u)\}$より、中央値$\mu$、四分位点$\mu\mp s\log3$。

### 採点基準

対数正規5点、分位点式3点、四分位点2点。

## P3C-C01 解答

### 時間配分

初動3分、(1)7分、(2)(3)各3分、(4)5分、(5)3分、見直し3分。

### 詳細解答

$s>0$で畳込みを取ると
$$
\begin{aligned}
f_S(s)
&=\int_0^s\lambda e^{-\lambda x}\lambda e^{-\lambda(s-x)}dx\\
&=\lambda^2e^{-\lambda s}\int_0^s dx
=\lambda^2s e^{-\lambda s}.
\end{aligned}
$$
また$s\leq0$では$f_S(s)=0$です。従って$S\sim\operatorname{Gamma}(2,\lambda)$で、平均$2/\lambda$、分散$2/\lambda^2$です。$x\geq0$では部分積分により
$$
\begin{aligned}
P(S>x)
&=\int_x^\infty\lambda^2s e^{-\lambda s}ds\\
&=\left[-(\lambda s+1)e^{-\lambda s}\right]_{s=x}^{s=\infty}\\
&=e^{-\lambda x}(1+\lambda x).
\end{aligned}
$$
$x<0$では$P(S>x)=1$です。
よってハザードは
$$
h(x)=\frac{\lambda^2x}{1+\lambda x},
$$
で一定でないため、指数分布でなく無記憶性も持ちません。

### 本番答案

$s>0$で
$$
f_S(s)=\int_0^s\lambda^2e^{-\lambda s}dx=\lambda^2s e^{-\lambda s}.
$$
$s\leq0$では$f_S(s)=0$。ゆえに$S\sim\operatorname{Gamma}(2,\lambda)$、$E[S]=2/\lambda$、$\operatorname{Var}(S)=2/\lambda^2$。部分積分より
$$
P(S>x)=
\begin{cases}
1,&x<0,\\
e^{-\lambda x}(1+\lambda x),&x\geq0.
\end{cases}
$$
$x>0$で$h(x)=\lambda^2x/(1+\lambda x)$は一定でない。従って指数分布でない。

### 採点基準と選択判断

畳込み8点、同定4点、平均分散4点、生存関数5点、非指数性4点。3分で積分区間$0<x<s$が見えれば選択し、15分で密度と分布同定まで進めば継続します。25分では生存関数を残し、ハザードの式または「一定でない」と結論して閉じます。

## P3C-C02 解答

### 時間配分

初動3分、(1)3分、(2)6分、(3)5分、(4)5分、(5)3分。

### 詳細解答

Beta関数の定義から
$$
\int_0^1\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}dx=1.
$$
モーメントは
$$
E[X^r]=\frac{B(\alpha+r,\beta)}{B(\alpha,\beta)}.
$$
従って
$$
E[X]=\frac\alpha{\alpha+\beta},\qquad
E[X^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)},
$$
$$
\begin{aligned}
\operatorname{Var}(X)
&=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}
-\frac{\alpha^2}{(\alpha+\beta)^2}\\
&=\frac{\alpha\{(\alpha+1)(\alpha+\beta)-\alpha(\alpha+\beta+1)\}}
{(\alpha+\beta)^2(\alpha+\beta+1)}\\
&=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.
\end{aligned}
$$
対数密度を微分すると
$$
\frac{d}{dx}\log f(x)=\frac{\alpha-1}{x}-\frac{\beta-1}{1-x}.
$$
$\alpha,\beta>1$では端点の密度が0で、唯一の停留点
$$
x=\frac{\alpha-1}{\alpha+\beta-2}
$$
が最頻値です。実際、対数密度の二階微分は
$$
-\frac{\alpha-1}{x^2}-\frac{\beta-1}{(1-x)^2}<0
$$
なので大域的な最大点です。$Y=1-X$では $f_Y(y)=f_X(1-y)$ より$Y\sim\operatorname{Beta}(\beta,\alpha)$です。

### 本番答案

Beta関数の定義で正規化され、$E[X^r]=B(\alpha+r,\beta)/B(\alpha,\beta)$。従って
$$
E[X]=\frac\alpha{\alpha+\beta},\quad
E[X^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)},\quad
\operatorname{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.
$$
$d\log f/dx=(\alpha-1)/x-(\beta-1)/(1-x)=0$より最頻値は$(\alpha-1)/(\alpha+\beta-2)$。密度変換から$1-X\sim\operatorname{Beta}(\beta,\alpha)$。

### 採点基準と選択判断

正規化3点、二モーメント7点、分散5点、最頻値6点、変換4点。3分でBeta関数比が見えれば選択し、15分で分散まで得られれば継続します。25分では最頻値の仮定$\alpha,\beta>1$と$1-X$のパラメータ交換を残して閉じます。

## P3C-C03 解答

### 時間配分

初動3分、(1)6分、(2)5分、(3)5分、(4)2分、(5)5分、見直し2分。

### 詳細解答

$x=e^y$は単調増加で$dy/dx=1/x$なので、台は$(0,\infty)$、
$$
f_X(x)=\frac{1}{x\sigma\sqrt{2\pi}}
\exp\left\{-\frac{(\log x-\mu)^2}{2\sigma^2}\right\}.
$$
任意の$r\in\mathbb R$で正規MGFを使い
$$
E[X^r]=E[e^{rY}]=e^{r\mu+r^2\sigma^2/2}.
$$
従って
$$
E[X]=e^{\mu+\sigma^2/2},\qquad
\operatorname{Var}(X)=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).
$$
$P(X\leq e^\mu)=P(Y\leq\mu)=1/2$なので中央値は$e^\mu$です。$t>0$では
$$
E[e^{tX}]=\frac1{\sigma\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left\{te^y-\frac{(y-\mu)^2}{2\sigma^2}\right\}dy.
$$
$te^y/(y-\mu)^2\to\infty$なので、十分大きな$y$では指数部が正かつ無限大へ向かい、被積分関数は0へ収束しません。よって積分は発散します。

### 本番答案

$x=e^y$とJacobian$1/x$より、$x>0$で
$$
f_X(x)=\frac{1}{x\sigma\sqrt{2\pi}}e^{-(\log x-\mu)^2/(2\sigma^2)}.
$$
$E[X^r]=E[e^{rY}]=e^{r\mu+r^2\sigma^2/2}$なので、平均$e^{\mu+\sigma^2/2}$、分散$e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$、中央値$e^\mu$。$t>0$では変数$y=\log x$で指数部$te^y-(y-\mu)^2/(2\sigma^2)\to\infty$となり、MGF積分は発散する。

### 採点基準と選択判断

密度7点、一般モーメント5点、平均分散5点、中央値3点、MGF発散5点。3分で対数変換が見えれば選択し、15分で一般モーメントまで進めば継続します。25分では発散積分と指数部の比較を必ず残して閉じます。

## P3C-C04 解答

### 時間配分

初動3分、(1)4分、(2)4分、(3)4分、(4)4分、(5)6分。

### 詳細解答

$$
F(x)=
\begin{cases}
0,&x<0,\\
1-e^{-(x/\eta)^c},&x\geq0,
\end{cases}
\qquad
S(x)=
\begin{cases}
1,&x<0,\\
e^{-(x/\eta)^c},&x\geq0.
\end{cases}
$$
従って$x>0$で
$$
h(x)=\frac{f(x)}{S(x)}=\frac c\eta\left(\frac x\eta\right)^{c-1}.
$$
$c>1$で増加、$c=1$で一定、$0<c<1$で減少します。$F(q_u)=u$を解くと
$$
q_u=\eta\{-\log(1-u)\}^{1/c}.
$$
$z=(x/\eta)^c$ と置けば
$$
x=\eta z^{1/c},\qquad
dx=\frac\eta c z^{1/c-1}dz,
\qquad f_X(x)dx=e^{-z}dz.
$$
従って
$$
\begin{aligned}
E[X^r]
&=\int_0^\infty \eta^r z^{r/c}e^{-z}dz\\
&=\eta^r\Gamma\left(1+\frac rc\right),
\end{aligned}
$$
です。原点近傍では被積分関数が$z^{r/c}$の定数倍なので、$\int_0^1z^{r/c}dz<\infty$、すなわち$r/c>-1$より$r>-c$が必要十分です。

### 本番答案

$x<0$では$F(x)=0$, $S(x)=1$。$x\geq0$では$F(x)=1-e^{-(x/\eta)^c}$、$S(x)=e^{-(x/\eta)^c}$。$x>0$で
$$
h(x)=\frac c\eta(x/\eta)^{c-1}.
$$
従って$c>1$で増加、$c=1$で一定、$0<c<1$で減少。$q_u=\eta\{-\log(1-u)\}^{1/c}$。$z=(x/\eta)^c$では$f_X(x)dx=e^{-z}dz$なので $E[X^r]=\eta^r\int_0^\infty z^{r/c}e^{-z}dz=\eta^r\Gamma(1+r/c)$。原点で$r/c>-1$が必要なため、存在条件は$r>-c$。

### 採点基準と選択判断

CDF・生存5点、ハザード5点、増減4点、分位点4点、モーメントと条件7点。3分で生存関数が書ければ選択し、15分で増減分類まで進めば継続します。25分では置換式と$r>-c$を残して閉じます。

## P3C-C05 解答

### 時間配分

初動3分、各項2分、台・平均の補完4分、見直し2分。

### 詳細解答

1. Unif$(a,b)$、台$(a,b)$、平均$(a+b)/2$。
2. $N(\mu,\sigma^2)$、台$\mathbb R$、平均$\mu$。
3. Exp$(\lambda)$、台$(0,\infty)$、平均$1/\lambda$。
4. Gamma$(r,\lambda)$（形状$r$、率$\lambda$）、台$(0,\infty)$、平均$r/\lambda$。
5. Beta$(\alpha,\beta)$、台$(0,1)$、平均$\alpha/(\alpha+\beta)$。
6. Cauchy$(0,1)$、台$\mathbb R$、平均は存在しない。
7. Lognormal$(\mu,\sigma^2)$、台$(0,\infty)$、平均$e^{\mu+\sigma^2/2}$。
8. Weibull$(c,\eta)$、台$(0,\infty)$、平均$\eta\Gamma(1+1/c)$。
9. Logistic$(\mu,s)$、台$\mathbb R$、平均$\mu$。

根拠は順に、区間一様性、Gaussian誤差、Poisson過程の待ち時間、共通率Gamma再生性、Beta型密度、独立標準正規の比、対数変換、Weibull生存関数、Logistic CDFです。

### 本番答案

1. Unif$(a,b)$、$(a,b)$、平均$(a+b)/2$。
2. $N(\mu,\sigma^2)$、$\mathbb R$、平均$\mu$。
3. Exp$(\lambda)$、$(0,\infty)$、平均$1/\lambda$。
4. 共通率の再生性よりGamma$(r,\lambda)$、$(0,\infty)$、平均$r/\lambda$。
5. Beta$(\alpha,\beta)$、$(0,1)$、平均$\alpha/(\alpha+\beta)$。
6. 正規比なのでCauchy$(0,1)$、$\mathbb R$、平均なし。
7. Lognormal$(\mu,\sigma^2)$、$(0,\infty)$、平均$e^{\mu+\sigma^2/2}$。
8. Weibull$(c,\eta)$、$(0,\infty)$、平均$\eta\Gamma(1+1/c)$。
9. Logistic$(\mu,s)$、$\mathbb R$、平均$\mu$。

### 採点基準と選択判断

各項の分布名1点・パラメータ1点で18点、台と平均の全体整合に7点の計25点。3分で9項中7項以上を識別できれば選択し、15分で全分布名を書ければ継続します。25分ではCauchyの平均不存在とGammaの率表示を優先して補い、27分で閉じます。

## P3C-D01 解答

### 時間配分

一様変換6分、逆変換5分、Beta積分10分、Gamma恒等式6分、展開とモーメント8分、見直し5分。

### 詳細解答

$F$は連続かつ狭義増加なので、$0<u<1$に対し
$$
P(F(X)\leq u)=P(X\leq F^{-1}(u))=u.
$$
従って$U=F(X)\sim\operatorname{Unif}(0,1)$です。$u=F(x)$を解くと
$$
x=F^{-1}(u)=\mu+s\log\frac{u}{1-u}.
$$
よって$|st|<1$のとき
$$
\begin{aligned}
M_X(t)
&=e^{\mu t}\int_0^1\left(\frac{u}{1-u}\right)^{st}du\\
&=e^{\mu t}\int_0^1u^{st}(1-u)^{-st}du\\
&=e^{\mu t}B(1+st,1-st).
\end{aligned}
$$
Beta積分の両端での収束条件は$1+st>0$, $1-st>0$、すなわち$|t|<1/s$です。Gamma恒等式に$z=st$を入れると
$$
M_X(t)=e^{\mu t}\Gamma(1+st)\Gamma(1-st)
=e^{\mu t}\frac{\pi st}{\sin(\pi st)}.
$$
$z/\sin z=1+z^2/6+O(z^4)$より
$$
M_X(t)=1+\mu t+\left(\frac{\mu^2}{2}+\frac{\pi^2s^2}{6}\right)t^2+O(t^3).
$$
従って$E[X]=\mu$、$E[X^2]=\mu^2+\pi^2s^2/3$、分散は$\pi^2s^2/3$です。平均は密度が$\mu$について対称であることとも一致します。

### 本番答案

$F$の連続狭義単調性から$P(F(X)\leq u)=u$で、$U=F(X)\sim\operatorname{Unif}(0,1)$。逆関数は$X=\mu+s\log\{U/(1-U)\}$。従って$|t|<1/s$で
$$
\begin{aligned}
M_X(t)
&=e^{\mu t}\int_0^1u^{st}(1-u)^{-st}du\\
&=e^{\mu t}B(1+st,1-st)
=e^{\mu t}\frac{\pi st}{\sin(\pi st)}.
\end{aligned}
$$
$z/\sin z=1+z^2/6+O(z^4)$を用いて$E[X]=\mu$、$\operatorname{Var}(X)=\pi^2s^2/3$。

### 採点基準と選択判断

一様化6点、逆変換5点、MGF積分8点、収束条件5点、Gamma恒等式5点、展開と平均分散6点。3分で確率積分変換が見えなければ後回しにします。15分で逆変換まで得られれば継続し、25分でBeta積分と$|t|<1/s$まで書けなければそこまでを提出答案として閉じます。進める場合はGamma恒等式と二次展開で完答します。
