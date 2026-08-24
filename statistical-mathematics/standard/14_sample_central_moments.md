# Standard 04 標本中心モーメント・不偏補正

- 旧No.: 14
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$i.i.d.$ 標本 $X_1,\ldots,X_n$ の母平均を $\mu$、母分散を $\sigma^2$、三次中心モーメントを $\mu_3$ とする。

$$
m_2=\frac1n\sum_{i=1}^n(X_i-\bar X)^2,
\qquad
m_3=\frac1n\sum_{i=1}^n(X_i-\bar X)^3
$$

とする。

1. $E[m_2]$ を求めよ。
2. $E[m_3]$ を求めよ。
3. $\sigma^2,\mu_3$ の不偏推定量を作れ。

## 詳細解答

$Y_i=X_i-\mu$, $\bar Y=\bar X-\mu$ と置く。すると

$$
E[Y_i]=0,\qquad E[Y_i^2]=\sigma^2,\qquad E[Y_i^3]=\mu_3.
$$

### 1. $E[m_2]$

$$
\sum_{i=1}^n(Y_i-\bar Y)^2
=\sum_{i=1}^nY_i^2-n\bar Y^2
$$

だから

$$
m_2=\frac1n\sum_iY_i^2-\bar Y^2.
$$

期待値を取ると

$$
E[m_2]=\sigma^2-\operatorname{Var}(\bar Y)
=\sigma^2-\frac{\sigma^2}{n}
=\boxed{\frac{n-1}{n}\sigma^2}.
$$

### 2. $E[m_3]$

展開すると

$$
\sum_i(Y_i-\bar Y)^3
=\sum_iY_i^3-3\bar Y\sum_iY_i^2+2n\bar Y^3.
$$

各項の期待値を順に計算する。まず

$$
E\left[\sum_iY_i^3\right]=n\mu_3.
$$

次に $S_1=\sum_iY_i$, $S_2=\sum_iY_i^2$ とすれば

$$
E[\bar YS_2]
=\frac1nE[S_1S_2]
=\frac1n\sum_{i,j}E[Y_iY_j^2].
$$

$i\ne j$ では独立性と $E[Y_i]=0$ から $E[Y_iY_j^2]=0$、$i=j$ では $E[Y_i^3]=\mu_3$。したがって

$$
E[\bar YS_2]=\frac1n\cdot n\mu_3=\mu_3.
$$

さらに

$$
E[\bar Y^3]
=\frac1{n^3}E\left[\left(\sum_iY_i\right)^3\right].
$$

三重和を展開したとき、添字が全て等しい項以外は少なくとも1個の一次モーメント $E[Y_j]=0$ を含むため消える。よって

$$
E\left[\left(\sum_iY_i\right)^3\right]=n\mu_3,
$$

したがって

$$
E[\bar Y^3]=\frac{\mu_3}{n^2}.
$$

以上を代入して

$$
\begin{aligned}
E[m_3]
&=\frac1n\left(n\mu_3-3\mu_3+2n\frac{\mu_3}{n^2}\right)\\
&=\left(1-\frac3n+\frac2{n^2}\right)\mu_3\\
&=\boxed{\frac{(n-1)(n-2)}{n^2}\mu_3}.
\end{aligned}
$$

### 3. 不偏化

したがって

$$
\boxed{S^2=\frac{n}{n-1}m_2},
\qquad
\boxed{\widehat\mu_3=\frac{n^2}{(n-1)(n-2)}m_3}
$$

が不偏である。三次については $n\ge3$ が必要。

## 本番答案

$Y_i=X_i-\mu$ と置くと

$$
m_2=\frac1n\sum_iY_i^2-\bar Y^2,
$$

より

$$
E[m_2]=\sigma^2-\frac{\sigma^2}{n}=\frac{n-1}{n}\sigma^2.
$$

また

$$
\sum_i(Y_i-\bar Y)^3
=\sum_iY_i^3-3\bar Y\sum_iY_i^2+2n\bar Y^3,
$$

かつ

$$
E\sum_iY_i^3=n\mu_3,
\quad
E\left[\bar Y\sum_iY_i^2\right]=\mu_3,
\quad
E[\bar Y^3]=\frac{\mu_3}{n^2}.
$$

したがって

$$
E[m_3]=\frac{(n-1)(n-2)}{n^2}\mu_3.
$$

よって不偏推定量は $nm_2/(n-1)$ と $n^2m_3/[(n-1)(n-2)]$。

## 採点基準

- 二次中心モーメント: 5点
- 三次の展開: 6点
- 三次の期待値: 5点
- 不偏化: 4点
