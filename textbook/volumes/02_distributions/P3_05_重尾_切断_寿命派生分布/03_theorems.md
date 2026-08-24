# 定理

## P3T-THM-01 Paretoのモーメント

$X\sim\operatorname{Pareto}(x_m,\alpha)$、$x_m>0,\alpha>0$ とする。$r>0$ について
$$
\begin{aligned}
E[X^r]
&=\int_{x_m}^\infty x^r\frac{\alpha x_m^\alpha}{x^{\alpha+1}}\,dx\\
&=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx.
\end{aligned}
$$
ここで、無限遠で原始関数が0へ収束する条件は $r-\alpha<0$、すなわち $r<\alpha$ である。$0<r<\alpha$ なら
$$
\begin{aligned}
E[X^r]
&=\alpha x_m^\alpha
\left[\frac{x^{r-\alpha}}{r-\alpha}\right]_{x_m}^{\infty}\\
&=\alpha x_m^\alpha
\left(0-\frac{x_m^{r-\alpha}}{r-\alpha}\right)
=\frac{\alpha x_m^r}{\alpha-r}.
\end{aligned}
$$
$r=\alpha$ では被積分関数が $\alpha x_m^\alpha/x$ となって対数発散し、$r>\alpha$ ではべき積分が発散する。したがって平均は $\alpha>1$、二次モーメントと分散は $\alpha>2$ のときだけ有限である。

## P3T-THM-02 Laplace・Rayleigh

Laplace$(\mu,b)$ は $\mu\in\mathbb R,b>0$、台 $x\in\mathbb R$、密度
$$f(x)=\frac1{2b}e^{-|x-\mu|/b}$$
をもつ。$Y=X-\mu$ の密度は0について対称だから $E[Y]=0$ である。また
$$
\begin{aligned}
E[Y^2]
&=2\int_0^\infty y^2\frac1{2b}e^{-y/b}\,dy\\
&=b^2\int_0^\infty z^2e^{-z}\,dz
=b^2\Gamma(3)=2b^2,
\end{aligned}
$$
ただし $z=y/b$ と置いた。よって $E[X]=\mu$、$\operatorname{Var}(X)=2b^2$ である。

Rayleigh$(\sigma)$ は $\sigma>0$、台 $x\geq0$、密度
$$f(x)=\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}$$
をもつ。$U=X^2/(2\sigma^2)$ と置くと、$u\geq0$ について
$$
P(U\leq u)
=P(X\leq\sigma\sqrt{2u})
=\int_0^{\sigma\sqrt{2u}}\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}\,dx
=1-e^{-u}.
$$
$u<0$ では確率は0だから、$U\sim\operatorname{Exp}(1)$ である。

## P3T-THM-03 切断密度と打切り尤度

まず、密度 $f_\theta$ をもつ $X$ について、$P_\theta(X\leq c)=F_\theta(c)>0$ とする。$X\leq c$ の個体だけを標本へ入れる右切断では、条件付き確率の定義から
$$
f_\theta(x\mid X\leq c)
=\frac{f_\theta(x)}{F_\theta(c)}\boldsymbol{1}_{\{x\leq c\}}.
$$
実際、
$$
\int_{-\infty}^c\frac{f_\theta(x)}{F_\theta(c)}\,dx
=\frac{F_\theta(c)}{F_\theta(c)}=1
$$
なので、分母は切断後の密度を再正規化する役割をもつ。

次に右打切りを考える。$X_1,\ldots,X_n$ が独立同分布で、打切り時刻 $c_i$ は固定されているか、寿命 $X_i$ と独立に決まるとする。観測値を $y_i=\min(X_i,c_i)$、故障指標を $\delta_i=\boldsymbol{1}_{\{X_i\leq c_i\}}$ とする。

- $\delta_i=1$ なら $X_i=y_i$ を観測したので寄与は $f_\theta(y_i)$。
- $\delta_i=0$ なら分かるのは $X_i>c_i$ だけなので寄与は $P_\theta(X_i>c_i)=S_\theta(c_i)$。

したがって第 $i$ 個体の寄与は
$$f_\theta(y_i)^{\delta_i}S_\theta(c_i)^{1-\delta_i}$$
と一つの式にまとめられる。個体間の独立性により、全尤度は
$$L(\theta)=\prod_{i=1}^n f_\theta(y_i)^{\delta_i}S_\theta(c_i)^{1-\delta_i}.$$
打切り時刻を故障時刻として $f_\theta(c_i)$ を掛けると、観測していない故障を1件増やすことになる。

## P3T-THM-04 ハザードと累積ハザード

$S(x)>0$ かつ微分可能なら $S(x)=1-F(x)$ から $S'(x)=-f(x)$ である。したがって
$$
h(x)=\frac{f(x)}{S(x)}=-\frac{S'(x)}{S(x)}=-\frac{d}{dx}\log S(x).
$$
累積ハザードを $H(x)=\int_0^x h(u)\,du$ と定め、$S(0)=1$ を仮定すると
$$
H(x)=-\log S(x)+\log S(0)=-\log S(x),
\qquad S(x)=e^{-H(x)}.
$$
ハザードが増加すれば、既に長く生きた個体ほど直ちに故障しやすいという解釈になる。

## P3T-THM-05 Weibullの寿命量

$X\sim\operatorname{Weibull}(c,\eta)$、$c,\eta>0$、$x>0$ とする。生存関数を微分すると
$$
f(x)=-S'(x)
=\frac{c x^{c-1}}{\eta^c}e^{-(x/\eta)^c},
$$
したがって
$$
h(x)=\frac{f(x)}{S(x)}=\frac{c x^{c-1}}{\eta^c},
\qquad H(x)=-\log S(x)=\left(\frac{x}{\eta}\right)^c.
$$
$h'(x)=c(c-1)x^{c-2}/\eta^c$ の符号から、$c>1$ なら増加、$c=1$ なら一定、$0<c<1$ なら減少である。

時刻 $x$ まで生存した個体の残存寿命を $X-x$ とすると、尾積分公式より
$$
\begin{aligned}
m(x)
&=E[X-x\mid X>x]\\
&=\int_0^\infty P(X-x>t\mid X>x)\,dt\\
&=\frac1{S(x)}\int_0^\infty S(x+t)\,dt
=\frac{\int_x^\infty S(u)\,du}{S(x)}.
\end{aligned}
$$
よって Weibull 分布では
$$m(x)=\frac{\int_x^\infty e^{-(u/\eta)^c}\,du}{e^{-(x/\eta)^c}}.$$
$c=1$ なら $m(x)=\eta$、指数分布の無記憶性を再現する。
