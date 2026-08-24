# Core 05 指数分布の十分性・完備性・UMVU

- 旧No.: 55
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Exp}(\lambda)$ とし、$T=\sum X_i$ とする。固定した$c>0$に対し

$$
\tau(\lambda)=P_\lambda(X_1>c)=e^{-\lambda c}
$$

を推定したい。

1. $T$が$\lambda$の十分統計量であることを示せ。
2. $T$が完備であることを示せ。
3. $Y=\boldsymbol1\{X_1>c\}$ が$\tau(\lambda)$の不偏推定量であることを示せ。
4. $E[Y\mid T]$を求め、$\tau(\lambda)$のUMVU推定量を与えよ。

## 詳細解答

尤度は

$$
L(\lambda)=\lambda^n e^{-\lambda T}\boldsymbol1\{x_i>0\ \forall i\},
$$

よって$T$は十分。

また

$$
T\sim\operatorname{Gamma}(n,\lambda)
$$

であり、この1母数Gamma族は完全指数型分布族なので$T$は完備である。積分で示すなら、$E_\lambda[g(T)]=0$が全$\lambda>0$で成り立つと

$$
\int_0^\infty g(t)t^{n-1}e^{-\lambda t}dt=0
$$

が全$\lambda$で成立し、Laplace変換の一意性から$g(t)=0$ a.e.。

$Y$について

$$
E[Y]=P(X_1>c)=e^{-\lambda c}=\tau(\lambda).
$$

条件付きで、$T=t$の下では

$$
\frac{X_1}{T}\sim\operatorname{Beta}(1,n-1).
$$

したがって$t>c$なら

$$
P(X_1>c\mid T=t)
=P\left(\frac{X_1}{T}>\frac ct\right)
=\left(1-\frac ct\right)^{n-1}.
$$

$t\le c$なら確率0。従って

$$
\boxed{
E[Y\mid T]
=\boldsymbol1\{T>c\}
\left(1-\frac cT\right)^{n-1}
}.
$$

これは完備十分統計量$T$の関数で不偏なので、Lehmann–SchefféによりUMVU。

## 本番答案

尤度は$\lambda^ne^{-\lambda T}$だから$T$は十分。$T\sim\Gamma(n,\lambda)$で、Laplace変換の一意性より完備。

$Y=1\{X_1>c\}$は$E[Y]=e^{-\lambda c}$で不偏。$T=t$の下で$X_1/T\sim\mathrm{Beta}(1,n-1)$だから

$$
E[Y\mid T]
=1\{T>c\}\left(1-\frac cT\right)^{n-1}.
$$

よってこれがUMVU推定量。

## 採点基準

- 十分性: 4点
- 完備性: 5点
- 元の不偏推定量: 3点
- 条件付き分布: 4点
- UMVU結論: 4点
