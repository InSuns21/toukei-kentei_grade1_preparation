# 例題

## 例1 二成分Poisson混合

$P(Z=1)=1/3$、$P(Z=2)=2/3$、$X\mid Z=1\sim\operatorname{Poisson}(1)$、$X\mid Z=2\sim\operatorname{Poisson}(4)$ とする。$k\in\mathbb N_0$ で
$$
P(X=k)=\frac13e^{-1}\frac{1^k}{k!}+\frac23e^{-4}\frac{4^k}{k!}.
$$
全期待値より $E[X]=\frac13+\frac23\cdot4=3$。全分散より
$$
\operatorname{Var}(X)=\frac13\cdot1+\frac23\cdot4+\frac13\cdot\frac23(1-4)^2=5.
$$

## 例2 Poisson--Gamma混合

$\alpha=2,\beta=3$ のとき、P3L-THM-02から $E[X]=2/3$、$\operatorname{Var}(X)=2/3+2/9=8/9$。Poisson単独なら平均と分散が等しいが、Gamma混合では $8/9>2/3$ となり過分散が生じる。

## 例3 正規混合の責務

$\pi=1/4$、$X\mid Z=1\sim N(0,1)$、$X\mid Z=2\sim N(3,1)$ とする。観測 $x=1$ の責務は
$$
\tau_1(1)=\frac{\tfrac14\phi(1)}{\tfrac14\phi(1)+\tfrac34\phi(-2)},
$$
ここで $\phi(t)=(2\pi)^{-1/2}e^{-t^2/2}$。値を代入してから比較し、事前確率だけで成分を決めてはいけない。
数値的には $\phi(1)\approx0.24197$、$\phi(-2)\approx0.05399$ なので $\tau_1(1)\approx0.599$ である。
