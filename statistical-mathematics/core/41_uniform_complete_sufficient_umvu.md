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
3. $E[M]$を求め、$\theta$の一様最小分散不偏推定量を求めよ。
4. $\theta^2$の一様最小分散不偏推定量も求めよ。

## 詳細解答

### 1. 十分性：Neyman–Fisher 因子分解定理

Lebesgue測度に関する同時密度は

$$
\begin{aligned}
f_\theta(x)
&=\theta^{-n}\prod_{i=1}^n\boldsymbol1\{0<x_i<\theta\}\\
&=\theta^{-n}\boldsymbol1\{M<\theta\}
\prod_{i=1}^n\boldsymbol1\{x_i>0\}.
\end{aligned}
$$

**Neyman–Fisher 因子分解定理**を使う。条件は共通の支配測度があり、密度が

$$
f_\theta(x)=g_\theta(M(x))h(x)
$$

と分解できること。本問では全 $\theta>0$ の分布がLebesgue測度で支配され、

$$
g_\theta(m)=\theta^{-n}\boldsymbol1\{m<\theta\},
\qquad
h(x)=\prod_i\boldsymbol1\{x_i>0\}
$$

と取れる。よって

$$
\boxed{M\text{ は }\theta\text{ の十分統計量}}.
$$

### 2. 完備性

$M$ の累積分布関数は $0<m<\theta$ で

$$
P_\theta(M\le m)=\left(\frac m\theta\right)^n,
$$

したがって密度は

$$
f_M(m)=\frac{n m^{n-1}}{\theta^n},\qquad 0<m<\theta.
$$

任意の可積分関数 $g$ について、全ての $\theta>0$ で

$$
E_\theta[g(M)]=0
$$

と仮定する。すると

$$
\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}\,dm=0,
$$

すなわち

$$
F(\theta)=\int_0^\theta g(m)m^{n-1}\,dm=0
$$

が全 $\theta>0$ で成立する。可積分性から $g(m)m^{n-1}$ は各有限区間で局所可積分なので、積分の基本定理により

$$
F'(\theta)=g(\theta)\theta^{n-1}=0
$$

がほとんど至る所で成立する。$\theta^{n-1}>0$ だから $g=0$ a.e.。従って $M$ は完備。

### 3・4. Lehmann–Scheffé定理

まず

$$
E[M^k]
=\int_0^\theta m^k\frac{n m^{n-1}}{\theta^n}dm
=\frac{n}{n+k}\theta^k.
$$

よって

$$
E[M]=\frac n{n+1}\theta,
\qquad
E[M^2]=\frac n{n+2}\theta^2.
$$

ここで **Lehmann–Scheffé の定理**を使う。定理の条件は、

- 統計量が十分かつ完備である。
- その統計量の可積分な関数が推定対象に対して不偏である。

ことである。本問では $M$ が上で完備十分と確認済みで、$M,M^2$ は $0<M<\theta$ なので可積分である。さらに上の期待値から補正後は不偏である。したがって

$$
\boxed{\widehat\theta_{UMVU}=\frac{n+1}{n}M},
$$

$$
\boxed{\widehat{\theta^2}_{UMVU}=\frac{n+2}{n}M^2}
$$

はそれぞれ一意な一様最小分散不偏推定量である。

## 本番答案

同時密度は

$$
f_\theta(x)=
\theta^{-n}\boldsymbol1\{M<\theta\}
\prod_i\boldsymbol1\{x_i>0\}
=g_\theta(M)h(x).
$$

全分布はLebesgue測度で共通に支配されるので **Neyman–Fisher 因子分解定理**から $M$ は十分。

また

$$
E[g(M)]
=\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}dm=0
$$

が全 $\theta$ で成り立てば、局所可積分性と積分の基本定理から $g(\theta)\theta^{n-1}=0$ a.e.、よって完備。

$$
E[M^k]=\frac n{n+k}\theta^k.
$$

したがって補正後の $M,M^2$ は完備十分統計量の可積分な不偏関数なので **Lehmann–Scheffé 定理**を適用でき、

$$
\frac{n+1}{n}M,
\qquad
\frac{n+2}{n}M^2
$$

が一様最小分散不偏推定量。

## 採点基準

- 十分性（因子分解定理・条件確認）: 4点
- 完備性: 7点
- $E[M]$と$\theta$の一様最小分散不偏推定量（Lehmann–Scheffé定理の条件確認）: 5点
- $\theta^2$の一様最小分散不偏推定量: 4点
