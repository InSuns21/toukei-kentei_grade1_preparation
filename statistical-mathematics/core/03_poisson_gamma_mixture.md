# Core 27 Poisson–Gamma混合・負の二項

- 旧No.: 03
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$$
\Lambda\sim\operatorname{Gamma}(r,\beta)
$$

をshape-rate表示とし、条件付きで

$$
X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)
$$

とする。

1. $X$の周辺確率質量関数を求めよ。
2. 負の二項分布としてパラメータを同定せよ。
3. 全期待値の公式で$E[X]$を求めよ。
4. 全分散の公式で$\operatorname{Var}(X)$を求めよ。

## 詳細解答

混合して

$$
\begin{aligned}
P(X=x)
&=\int_0^\infty
\frac{e^{-\lambda}\lambda^x}{x!}
\frac{\beta^r}{\Gamma(r)}\lambda^{r-1}e^{-\beta\lambda}
\,d\lambda\\
&=\frac{\beta^r}{x!\Gamma(r)}
\int_0^\infty
\lambda^{x+r-1}e^{-(\beta+1)\lambda}d\lambda\\
&=\frac{\Gamma(x+r)}{\Gamma(r)x!}
\left(\frac\beta{\beta+1}\right)^r
\left(\frac1{\beta+1}\right)^x.
\end{aligned}
$$

従って「$r$回成功するまでの失敗回数」型の負の二項分布で、成功確率を

$$
p=\frac\beta{\beta+1}
$$

とすればよい。

全期待値より

$$
E[X]=E[E[X\mid\Lambda]]=E[\Lambda]=\boxed{\frac r\beta}.
$$

全分散より

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[\operatorname{Var}(X\mid\Lambda)]
+\operatorname{Var}(E[X\mid\Lambda])\\
&=E[\Lambda]+\operatorname{Var}(\Lambda)\\
&=\boxed{\frac r\beta+\frac r{\beta^2}}.
\end{aligned}
$$

Poissonより分散が大きくなる過分散も読み取れる。

## 本番答案

$$
P(X=x)
=\frac{\Gamma(x+r)}{\Gamma(r)x!}
\left(\frac\beta{\beta+1}\right)^r
\left(\frac1{\beta+1}\right)^x.
$$

よって$NB(r,p)$で$p=\beta/(\beta+1)$。

$$
E[X]=E[\Lambda]=r/\beta,
$$

$$
Var(X)=E[\Lambda]+Var(\Lambda)=r/\beta+r/\beta^2.
$$

## 採点基準

- 混合積分: 8点
- NB同定: 4点
- 平均: 4点
- 分散: 4点
