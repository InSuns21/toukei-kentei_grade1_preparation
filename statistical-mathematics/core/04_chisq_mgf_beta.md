# Core 38 非心カイ二乗分布：正規変数の二乗和・モーメント母関数・Poisson混合

- 旧No.: 04
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$Z_1,\ldots,Z_r$ は独立で

$$
Z_i\sim N(\mu_i,1)
\qquad(i=1,\ldots,r)
$$

に従うとする。また

$$
Q=\sum_{i=1}^r Z_i^2,
\qquad
\lambda=\sum_{i=1}^r\mu_i^2
$$

とおく。

1. $Z\sim N(\mu,1)$ に対し、$Z^2$ のモーメント母関数を定義から求めよ。
2. $Q$ のモーメント母関数を求め、$Q$ が自由度 $r$、非心度 $\lambda$ の非心カイ二乗分布に従うことを示せ。
3. $E[Q]$ と $\operatorname{Var}(Q)$ を求めよ。
4. $K\sim\operatorname{Poisson}(\lambda/2)$ とし、条件付きで

$$
Q\mid K=k\sim\chi^2_{r+2k}
$$

とするとき、この混合分布が $\chi^2_r(\lambda)$ と一致することをモーメント母関数から示せ。

## 詳細解答

### 1. $Z^2$ のモーメント母関数

$Z\sim N(\mu,1)$ の確率密度関数は

$$
f_Z(z)=\frac{1}{\sqrt{2\pi}}
\exp\left\{-\frac{(z-\mu)^2}{2}\right\}.
$$

したがって、$t<1/2$ として

$$
\begin{aligned}
E[e^{tZ^2}]
&=\frac{1}{\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left\{tz^2-\frac{(z-\mu)^2}{2}\right\}dz.
\end{aligned}
$$

指数部を整理する。

$$
\begin{aligned}
tz^2-\frac{(z-\mu)^2}{2}
&=-\frac{1-2t}{2}z^2+\mu z-\frac{\mu^2}{2}\\
&=-\frac{1-2t}{2}
\left(z-\frac{\mu}{1-2t}\right)^2
+\frac{\mu^2t}{1-2t}.
\end{aligned}
$$

よって

$$
\begin{aligned}
E[e^{tZ^2}]
&=\exp\left(\frac{\mu^2t}{1-2t}\right)
\frac{1}{\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left\{-\frac{1-2t}{2}
\left(z-\frac{\mu}{1-2t}\right)^2\right\}dz.
\end{aligned}
$$

ここで正規積分

$$
\int_{-\infty}^{\infty}
\exp\left\{-\frac{a}{2}(z-b)^2\right\}dz
=\sqrt{\frac{2\pi}{a}}
\qquad(a>0)
$$

を使うと

$$
\boxed{
E[e^{tZ^2}]
=(1-2t)^{-1/2}
\exp\left(\frac{\mu^2t}{1-2t}\right),
\qquad t<\frac12
}.
$$

$\mu=0$ なら

$$
E[e^{tZ^2}]=(1-2t)^{-1/2},
$$

すなわち $Z^2\sim\chi^2_1$ のモーメント母関数になる。

### 2. $Q$ の分布

$Z_1,\ldots,Z_r$ は独立なので、$Z_1^2,\ldots,Z_r^2$ も独立である。従って

$$
\begin{aligned}
M_Q(t)
&=\prod_{i=1}^r E[e^{tZ_i^2}]\\
&=\prod_{i=1}^r
\left[
(1-2t)^{-1/2}
\exp\left(\frac{\mu_i^2t}{1-2t}\right)
\right]\\
&=(1-2t)^{-r/2}
\exp\left(
\frac{t}{1-2t}\sum_{i=1}^r\mu_i^2
\right).
\end{aligned}
$$

$\lambda=\sum_i\mu_i^2$ だから

$$
\boxed{
M_Q(t)
=(1-2t)^{-r/2}
\exp\left(\frac{\lambda t}{1-2t}\right)
}.
$$

これは自由度 $r$、非心度 $\lambda$ の非心カイ二乗分布のモーメント母関数である。従って

$$
\boxed{Q\sim\chi^2_r(\lambda)}.
$$

特に全ての $\mu_i=0$ なら $\lambda=0$ であり、通常の中心カイ二乗分布

$$
Q\sim\chi^2_r
$$

に戻る。

### 3. 平均と分散

モーメント母関数を直接2回微分してもよいが、対数を取ると計算が簡単になる。キュムラント母関数を

$$
K_Q(t)=\log M_Q(t)
$$

とすると

$$
K_Q(t)
=-\frac r2\log(1-2t)
+\frac{\lambda t}{1-2t}.
$$

1階微分は

$$
K_Q'(t)
=\frac{r}{1-2t}
+\frac{\lambda}{(1-2t)^2},
$$

したがって

$$
\boxed{E[Q]=K_Q'(0)=r+\lambda}.
$$

2階微分は

$$
K_Q''(t)
=\frac{2r}{(1-2t)^2}
+\frac{4\lambda}{(1-2t)^3},
$$

よって第2キュムラント、すなわち分散は

$$
\boxed{
\operatorname{Var}(Q)
=K_Q''(0)
=2r+4\lambda
=2(r+2\lambda)
}.
$$

中心カイ二乗分布 $\lambda=0$ では

$$
E[Q]=r,
\qquad
\operatorname{Var}(Q)=2r
$$

が得られる。

### 4. Poisson混合表示

$K\sim\operatorname{Poisson}(\lambda/2)$ とする。条件付きで

$$
Q\mid K=k\sim\chi^2_{r+2k}
$$

だから、その条件付きモーメント母関数は

$$
E[e^{tQ}\mid K=k]
=(1-2t)^{-(r+2k)/2}.
$$

全期待値を取ると

$$
\begin{aligned}
E[e^{tQ}]
&=E\left[E[e^{tQ}\mid K]\right]\\
&=E\left[(1-2t)^{-(r+2K)/2}\right]\\
&=(1-2t)^{-r/2}
E\left[\left\{(1-2t)^{-1}\right\}^{K}\right].
\end{aligned}
$$

Poisson変数の確率母関数

$$
E[s^K]
=\exp\left\{\frac{\lambda}{2}(s-1)\right\}
$$

に

$$
s=(1-2t)^{-1}
$$

を代入すると

$$
\begin{aligned}
E\left[\left\{(1-2t)^{-1}\right\}^{K}\right]
&=\exp\left[
\frac{\lambda}{2}
\left\{\frac1{1-2t}-1\right\}
\right]\\
&=\exp\left(\frac{\lambda t}{1-2t}\right).
\end{aligned}
$$

従って

$$
E[e^{tQ}]
=(1-2t)^{-r/2}
\exp\left(\frac{\lambda t}{1-2t}\right),
$$

これは第2問で得た $\chi^2_r(\lambda)$ のモーメント母関数と一致する。したがって

$$
\boxed{
\chi^2_r(\lambda)
\text{ は }
K\sim\operatorname{Poisson}(\lambda/2)
\text{ による }
\chi^2_{r+2K}
\text{ の混合分布として表せる}
}.
$$

この表示から、非心度 $\lambda$ が大きいほど「実効的な自由度」が大きい中心カイ二乗分布へ重みが移る、と解釈できる。

## 本番答案

$Z\sim N(\mu,1)$ に対して

$$
\begin{aligned}
E[e^{tZ^2}]
&=\frac1{\sqrt{2\pi}}\int
\exp\left\{tz^2-\frac{(z-\mu)^2}{2}\right\}dz\\
&=(1-2t)^{-1/2}
\exp\left(\frac{\mu^2t}{1-2t}\right),
\qquad t<\frac12,
\end{aligned}
$$

ここでは平方完成を用いた。独立性より

$$
M_Q(t)
=(1-2t)^{-r/2}
\exp\left(\frac{\lambda t}{1-2t}\right),
\qquad
\lambda=\sum_{i=1}^r\mu_i^2.
$$

従って

$$
Q\sim\chi^2_r(\lambda).
$$

また

$$
K_Q(t)=\log M_Q(t)
=-\frac r2\log(1-2t)+\frac{\lambda t}{1-2t}
$$

より

$$
E[Q]=r+\lambda,
\qquad
\operatorname{Var}(Q)=2(r+2\lambda).
$$

さらに $K\sim\operatorname{Poisson}(\lambda/2)$、$Q\mid K=k\sim\chi^2_{r+2k}$ とすると

$$
\begin{aligned}
E[e^{tQ}]
&=(1-2t)^{-r/2}
E[(1-2t)^{-K}]\\
&=(1-2t)^{-r/2}
\exp\left(\frac{\lambda t}{1-2t}\right),
\end{aligned}
$$

となり、非心カイ二乗分布のモーメント母関数と一致する。

## 採点基準

- $Z^2$ のモーメント母関数を平方完成から導出: 6点
- 非心カイ二乗分布のモーメント母関数と同定: 5点
- 平均・分散: 4点
- Poisson混合表示: 5点
