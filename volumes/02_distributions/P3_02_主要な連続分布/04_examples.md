# 典型例と完全な導出

## 例1：正規標準化

$X\sim N(10,2^2)$ の $P(8<X\leq13)$ は
$$
P\left(-1<\frac{X-10}{2}\leq1.5\right)
=\Phi(1.5)-\Phi(-1).
$$
分散4を標準偏差として割らないことが採点上の要点です。

## 例2：Gammaの率と尺度

$X\sim\operatorname{Gamma}(3,2)$を率表示とすれば平均$3/2$、分散$3/4$です。尺度表示Gamma$(3,2)$なら平均6となるため、答案には密度の指数部 $e^{-2x}$ を書いて規約を固定します。

## 例3：Beta積分

$X\sim\operatorname{Beta}(2,3)$ なら $B(2,3)=1!2!/4!=1/12$ なので
$$
f(x)=12x(1-x)^2\boldsymbol{1}_{(0,1)}(x),
\quad E[X]=\frac25,
\quad\operatorname{Var}(X)=\frac{2\cdot3}{5^2\cdot6}=\frac1{25}.
$$

## 例4：重い裾

標準Cauchyの $P(|X|>a)$ は
$$
1-\frac2\pi\arctan a
$$
です。尾確率は正規分布より遅く減少し、$E[|X|]$は発散します。

## 例5：Weibullハザード

$X\sim\operatorname{Weibull}(2,10)$ では
$$
S(x)=e^{-(x/10)^2},\qquad h(x)=\frac{x}{50}.
$$
ハザードが時間とともに増えるので摩耗故障のモデルに対応します。

## 例6：対数尺度とLogistic分位点

$X\sim\operatorname{Lognormal}(\mu,\sigma^2)$ の中央値は $e^\mu$ です。平均 $e^{\mu+\sigma^2/2}$ とは一致しません。

$Y\sim\operatorname{Logistic}(\mu,s)$ では $F(y)=u$ を解いて
$$
F^{-1}(u)=\mu+s\log\frac{u}{1-u},\qquad0<u<1.
$$
対数オッズが位置尺度変換になることがLogistic回帰との接点です。
