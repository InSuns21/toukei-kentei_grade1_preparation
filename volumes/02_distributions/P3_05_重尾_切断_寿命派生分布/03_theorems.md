# 定理

## P3T-THM-01 Paretoのモーメント

$X\sim\operatorname{Pareto}(x_m,\alpha)$、$x_m>0,\alpha>0$ とする。$r>0$ について
$$
E[X^r]=\int_{x_m}^\infty x^r\frac{\alpha x_m^\alpha}{x^{\alpha+1}}dx
=\frac{\alpha x_m^r}{\alpha-r}\;(0<r<\alpha).
$$
$r\geq\alpha$ では積分が発散する。したがって平均は $\alpha>1$、分散は $\alpha>2$ のときだけ有限である。

## P3T-THM-02 Laplace・Rayleigh

Laplace密度は $\mu$ の左右で指数関数を積分する。$E[X-\mu]=0$、$E[(X-\mu)^2]=2b^2$ より平均・分散が得られる。Rayleighでは $U=X^2/(2\sigma^2)$ と置くと $U\sim\operatorname{Exp}(1)$ であり、$F(x)=1-e^{-x^2/(2\sigma^2)}$ を得る。

## P3T-THM-03 切断密度と打切り尤度

$X_1,\ldots,X_n$ が独立同分布で、右打切り点を $c_i$、観測値を $t_i=\min(X_i,c_i)$、故障指標を $\delta_i=\boldsymbol{1}_{\{X_i\leq c_i\}}$ とする。尤度は
$$L(\theta)=\prod_{i=1}^n f_\theta(t_i)^{\delta_i}S_\theta(c_i)^{1-\delta_i}.$$
故障を観測した項は密度、打切り項は生存確率である。

## P3T-THM-04 ハザードと累積ハザード

$S(x)>0$ かつ微分可能なら $S'(x)=-f(x)$ なので
$$h(x)=-\frac{S'(x)}{S(x)}=-\frac{d}{dx}\log S(x),\; H(x)=-\log S(x).$$
ハザードが増加すれば、既に長く生きた個体ほど直ちに故障しやすいという解釈になる。

## P3T-THM-05 Weibullの寿命量

$X\sim\operatorname{Weibull}(c,\eta)$、$c,\eta>0$、$x>0$ とする。$S(x)=e^{-(x/\eta)^c}$、$h(x)=c x^{c-1}/\eta^c$ である。従って $c>1$ なら故障率増加、$c=1$ なら一定、$0<c<1$ なら減少である。平均残存寿命は
$$m(x)=\frac{\int_x^\infty e^{-(u/\eta)^c}du}{e^{-(x/\eta)^c}}.$$
$c=1$ なら $m(x)=\eta$、指数分布の無記憶性を再現する。
### 導出の補足

Laplaceでは $y=x-\mu$ と置き、$y<0$ と $y\ge0$ を分ける。奇関数の積分は0なので $E[X-\mu]=0$、偶関数について
$$E[(X-\mu)^2]=2\int_0^\infty y^2\frac{1}{2b}e^{-y/b}\,dy=2b^2.$$
Rayleighでは $u=x^2/(2\sigma^2)$、$du=x\,dx/\sigma^2$ より
$$P(U\le u)=\int_0^{\sigma\sqrt{2u}}\frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}dx=1-e^{-u}\quad(u\ge0),$$
また $P(U\le u)=0$ ($u<0$) である。

右打切り尤度は、$\delta_i=1$ なら観測した故障時刻の密度 $f_\theta(t_i)$、$\delta_i=0$ なら $X_i>c_i$ という生存情報の確率 $S_\theta(c_i)$ を掛け合わせることで得られる。
