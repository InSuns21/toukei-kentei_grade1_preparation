# Core 04 一様分布の完備十分統計量・Lehmann–Scheffé

- 旧No.: 41
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{\mathrm{iid}}\sim U(0,\theta)$、$\theta>0$ とし、$M=X_{(n)}$ とする。

1. $M$が$\theta$の十分統計量であることを示せ。
2. $M$が完備であることを示せ。
3. $E[M]$を求め、$\theta$のUMVU推定量を求めよ。
4. $\theta^2$のUMVU推定量も求めよ。

## 詳細解答

尤度は

$$
L(\theta)=\theta^{-n}\boldsymbol1\{0<M<\theta\}.
$$

標本への依存は$M$を通じてのみ現れるので、Neymanの分解定理より$M$は十分。

$M$の密度は

$$
f_M(m)=\frac{n m^{n-1}}{\theta^n},\qquad 0<m<\theta.
$$

いま任意の可積分関数$g$について、全ての$\theta>0$で$E_\theta[g(M)]=0$とする。すると

$$
\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}\,dm=0.
$$

したがって

$$
\int_0^\theta g(m)m^{n-1}\,dm=0
$$

が全ての$\theta$で成立。$\theta$で微分すれば

$$
g(\theta)\theta^{n-1}=0
$$

ゆえに$g=0$ a.e.。よって$M$は完備。

また

$$
E[M^k]=\frac{n}{n+k}\theta^k.
$$

特に

$$
E[M]=\frac n{n+1}\theta,
\qquad
E[M^2]=\frac n{n+2}\theta^2.
$$

完備十分統計量の関数で不偏なのでLehmann–Schefféより

$$
\boxed{\widehat\theta_{UMVU}=\frac{n+1}{n}M},
$$

$$
\boxed{\widehat{\theta^2}_{UMVU}=\frac{n+2}{n}M^2}.
$$

## 本番答案

$$
L(\theta)=\theta^{-n}\boldsymbol1\{M<\theta\}
$$

より$M$は十分。さらに

$$
E[g(M)]
=\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}dm=0
$$

が全$\theta$で成り立てば、微分して$g(\theta)\theta^{n-1}=0$。したがって完備。

$$
E[M^k]=\frac n{n+k}\theta^k
$$

なので

$$
\frac{n+1}{n}M,
\qquad
\frac{n+2}{n}M^2
$$

がそれぞれ$\theta,\theta^2$のUMVU推定量。

## 採点基準

- 十分性: 4点
- 完備性: 7点
- $E[M]$と$\theta$のUMVU: 5点
- $\theta^2$のUMVU: 4点
