# Core 04 一様分布の完備十分統計量・Lehmann–Scheffé

- 旧No.: 41
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{\mathrm{iid}}\sim U(0,\theta)$、$\theta>0$ とし、$M=X_{(n)}$ とする。

1. $M$が$\theta$の十分統計量であることを示せ。
2. $M$が完備であることを示せ。完備性の確認では、期待値を表す積分を上端 $\theta$ で微分してよいものとする。
3. $E[M]$を求め、$\theta$の一様最小分散不偏推定量を求めよ。
4. $\theta^2$の一様最小分散不偏推定量も求めよ。

## 詳細解答

### 1. 十分性：Neyman–Fisher 因子分解定理

同時確率密度関数は

$$
\begin{aligned}
f_\theta(x)
&=\theta^{-n}\prod_{i=1}^n\boldsymbol{1}_{\{0<x_i<\theta\}}\\
&=\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}
\prod_{i=1}^n\boldsymbol{1}_{\{x_i>0\}}.
\end{aligned}
$$

**Neyman–Fisher 因子分解定理**を使う。同時確率密度関数または同時確率質量関数が

$$
f_\theta(x)=g_\theta(M(x))h(x)
$$

と書け、$h$ が母数に依存しないなら $M$ は十分統計量である。本問では

$$
g_\theta(m)=\theta^{-n}\boldsymbol{1}_{\{m<\theta\}},
\qquad
h(x)=\prod_i\boldsymbol{1}_{\{x_i>0\}}
$$

と分解できる。よって

$$
\boxed{M\text{ は }\theta\text{ の十分統計量}}.
$$

### 2. 完備性

$M$ の累積分布関数は $0<m<\theta$ で

$$
P_\theta(M\le m)=\left(\frac m\theta\right)^n,
$$

したがって確率密度関数は

$$
f_M(m)=\frac{n m^{n-1}}{\theta^n},\qquad 0<m<\theta.
$$

$E_\theta[|g(M)|]$ が有限で、全ての $\theta>0$ について

$$
E_\theta[g(M)]=0
$$

とする。すると

$$
\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}\,dm=0,
$$

したがって

$$
F(\theta)=\int_0^\theta g(m)m^{n-1}\,dm=0
$$

が全 $\theta>0$ で成立する。

問題文で積分を上端 $\theta$ について微分してよいとしているので、積分の基本定理から

$$
F'(\theta)=g(\theta)\theta^{n-1}=0.
$$

$\theta^{n-1}>0$ だから

$$
g(\theta)=0
$$

である。したがって、期待値が0になる関数は0でなければならず、

$$
\boxed{M\text{ は完備}}
$$

と確認できる。

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
- その統計量から作った推定量の期待値が有限で、推定対象に対して不偏である。

ことである。本問では $M$ が上で完備十分と確認済みで、$0<M<\theta$ だから $M$ と $M^2$ の期待値は有限である。さらに上の期待値から補正後は不偏である。したがって

$$
\boxed{\widehat\theta_{UMVU}=\frac{n+1}{n}M},
$$

$$
\boxed{\widehat{\theta^2}_{UMVU}=\frac{n+2}{n}M^2}
$$

はそれぞれ一意な一様最小分散不偏推定量である。

## 本番答案

同時確率密度関数は

$$
f_\theta(x)=
\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}
\prod_i\boldsymbol{1}_{\{x_i>0\}}
=g_\theta(M)h(x).
$$

母数依存部分が $M$ だけを通じて現れるので **Neyman–Fisher 因子分解定理**から $M$ は十分。

また

$$
E[g(M)]
=\frac n{\theta^n}\int_0^\theta g(m)m^{n-1}dm=0
$$

が全 $\theta$ で成り立つなら、問題文の条件の下で上端 $\theta$ について微分して

$$
g(\theta)\theta^{n-1}=0.
$$

従って $g(\theta)=0$ で、$M$ は完備。

$$
E[M^k]=\frac n{n+k}\theta^k.
$$

したがって補正後の $M,M^2$ は完備十分統計量から作られる不偏推定量なので **Lehmann–Scheffé 定理**を適用でき、

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
