# 例題

## 例1 二成分Poisson混合

$P(Z=1)=1/3$、$P(Z=2)=2/3$、
$X\mid Z=1\sim\operatorname{Poisson}(1)$、
$X\mid Z=2\sim\operatorname{Poisson}(4)$ とする。

**方針。** 周辺質量は成分別質量の重み付き和、平均・分散は全期待値・全分散で求める。

$k\in\mathbb N_0$ について
$$
\begin{aligned}
P(X=k)
&=\sum_{j=1}^2P(Z=j)P(X=k\mid Z=j)\\
&=\frac13e^{-1}\frac{1^k}{k!}
+\frac23e^{-4}\frac{4^k}{k!}.
\end{aligned}
$$
平均は
$$
E[X]=\frac13\cdot1+\frac23\cdot4=3.
$$
Poisson分布では条件付き平均と条件付き分散がともに率なので
$$
E\{\operatorname{Var}(X\mid Z)\}
=\frac13\cdot1+\frac23\cdot4=3.
$$
群間分散は
$$
\begin{aligned}
\operatorname{Var}\{E[X\mid Z]\}
&=\frac13(1-3)^2+\frac23(4-3)^2\\
&=\frac43+\frac23=2.
\end{aligned}
$$
従って
$$\operatorname{Var}(X)=3+2=5.$$

**検算。** 分散5は平均3より大きい。これは率が観測ごとに変わる混合による過分散と整合する。

## 例2 Poisson--Gamma混合

$X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)$、
$\Lambda\sim\operatorname{Gamma}(2,3)$ とする。Gamma分布は形状2、率3である。

**方針。** 定理の数値代入だけで終わらせず、周辺質量の積分も一度実行する。

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
9\lambda e^{-3\lambda}\,d\lambda\\
&=\frac9{k!}\int_0^\infty
\lambda^{k+1}e^{-4\lambda}\,d\lambda\\
&=\frac{9\Gamma(k+2)}{k!4^{k+2}}
=\frac{9(k+1)}{4^{k+2}}.
\end{aligned}
$$
全期待値より
$$E[X]=E[\Lambda]=\frac23.$$
全分散より
$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac23+\frac29=\frac89.
$$

**検算。** $\frac89>\frac23$ なのでPoisson単独の平均＝分散から外れ、混合による過分散が現れている。また
$$
\sum_{k=0}^\infty\frac{9(k+1)}{4^{k+2}}
=\frac9{16}\frac1{(1-1/4)^2}=1.
$$

## 例3 正規混合の責務

$P(Z=1)=1/4$、$P(Z=2)=3/4$、
$X\mid Z=1\sim N(0,1)$、
$X\mid Z=2\sim N(3,1)$ とし、$x=1$ を観測したとする。

**方針。** 「事前重み×観測の尤度」を各成分で計算し、最後に正規化する。

標準正規密度を
$$\phi(t)=\frac1{\sqrt{2\pi}}e^{-t^2/2}$$
と書く。成分1の密度は $\phi(1)$、成分2の密度は $\phi(1-3)=\phi(-2)$ なので
$$
\tau_1(1)
=\frac{(1/4)\phi(1)}
{(1/4)\phi(1)+(3/4)\phi(-2)}
=\frac{\phi(1)}{\phi(1)+3\phi(-2)}.
$$
数値を代入すると
$$
\phi(1)=0.24197\ldots,\qquad
\phi(-2)=0.05399\ldots,
$$
$$
\tau_1(1)
=\frac{0.24197}{0.24197+3(0.05399)}
=0.599\ldots.
$$
従って第2成分の責務は $1-\tau_1(1)=0.401\ldots$ である。

**検算。** $x=1$ は平均0に近いため、第1成分の事前確率が1/4と小さくても、観測後の責務は約0.599まで上がる。二つの責務の和も1である。

## 例4 完全データ尤度と観測データ尤度

二成分密度を $f_1,f_2$、混合比を $\pi$ とし、独立な2観測 $x_1,x_2$ を考える。所属が $z_1=1,z_2=2$ と見えている場合、

**方針。** 所属が見える場合は該当成分の因子だけを掛け、見えない場合は各観測で可能な成分を足してから観測間で掛ける。

$$
L_c=\pi f_1(x_1)(1-\pi)f_2(x_2).
$$
所属が見えない場合は各観測で成分を足して
$$
L=\{\pi f_1(x_1)+(1-\pi)f_2(x_1)\}
\{\pi f_1(x_2)+(1-\pi)f_2(x_2)\}.
$$
完全データでは一つの成分因子だけを使い、観測データでは可能な成分を足す、という違いが式に現れる。

**検算。** $\pi=1$ なら観測データ尤度は $f_1(x_1)f_1(x_2)$ となり、全観測が成分1から出る退化した場合と一致する。
