# 例題

## 例1 Pareto

**問題。** $X\sim\operatorname{Pareto}(1,3)$ について、$P(X>2)$、平均、分散を求める。

**方針。** 生存関数とモーメント公式へ数値を代入する。ただし、分散を計算する前に二次モーメントの存在条件を確認する。

$$P(X>2)=\left(\frac12\right)^3=\frac18.$$
$3>1$ なので平均は存在し、
$$E[X]=\frac{3}{3-1}=\frac32.$$
$3>2$ なので二次モーメントも存在し、
$$E[X^2]=\frac{3}{3-2}=3.$$
したがって
$$\operatorname{Var}(X)=E[X^2]-E[X]^2=3-\left(\frac32\right)^2=\frac34.$$

**検算。** 分散 $3/4$ は正であり、重い右尾のため平均 $3/2$ は下端1より大きい。

## 例2 右打切り

**問題。** 率 $\lambda>0$ の指数分布を時刻 $c$ で右打切りし、故障時刻 $t_1,t_2$ と、時刻 $c$ まで故障しなかった1個体を観測した。尤度と最尤推定量を求める。

**方針。** 故障2件には密度、打切り1件には生存確率を掛ける。

$$
\begin{aligned}
L(\lambda)
&=f_\lambda(t_1)f_\lambda(t_2)S_\lambda(c)\\
&=(\lambda e^{-\lambda t_1})(\lambda e^{-\lambda t_2})e^{-\lambda c}\\
&=\lambda^2e^{-\lambda(t_1+t_2+c)}.
\end{aligned}
$$
$T=t_1+t_2+c$ と置くと
$$\ell(\lambda)=2\log\lambda-\lambda T,\qquad
\ell'(\lambda)=\frac2\lambda-T.$$
よって $\ell'(\lambda)=0$ から
$$\widehat\lambda=\frac2{t_1+t_2+c}.$$
また $\ell''(\lambda)=-2/\lambda^2<0$ なので極大である。

**検算。** 分子2は故障件数である。打切り個体を故障と誤認すると分子が3となり、率を過大推定する。

## 例3 Weibullのハザード

**問題。** $X\sim\operatorname{Weibull}(2,5)$ について、ハザード、累積ハザード、$S(5)$、$m(5)$ を求めて解釈する。

$$
h(x)=\frac{2x}{25},\qquad
H(x)=\left(\frac{x}{5}\right)^2,\qquad
S(5)=e^{-H(5)}=e^{-1}.
$$
$h'(x)=2/25>0$ なので故障率は増加する。平均残存寿命は
$$
\begin{aligned}
m(5)
&=\frac{\int_5^\infty e^{-(u/5)^2}\,du}{e^{-1}}\\
&=e\int_5^\infty e^{-(u/5)^2}\,du.
\end{aligned}
$$
$v=u/5$、$du=5\,dv$ と置けば
$$m(5)=5e\int_1^\infty e^{-v^2}\,dv\approx1.895.$$

**解釈と検算。** 時刻5まで生きた後の平均寿命は約1.895で、無条件平均 $E[X]=5\Gamma(3/2)\approx4.431$ より短い。増加ハザードの寿命分布として整合する。
