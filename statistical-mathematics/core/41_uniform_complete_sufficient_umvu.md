# Core 04 一様分布の完備十分統計量・レーマン・シェッフェ

- 旧No.: 41
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{\mathrm{iid}}\sim U(0,\theta)$、$\theta>0$ とし、$M=X_{(n)}$ とする。

1. $M$ が $\theta$ の十分統計量であることを示せ。
2. $M$ が完備であることを示せ。完備性の確認では、期待値を表す積分を上端 $\theta$ で微分してよいものとする。
3. $E[M]$ を求め、$\theta$ の一様最小分散不偏推定量を求めよ。
4. $\theta^2$ の一様最小分散不偏推定量も求めよ。

## 詳細解答

### 1. 十分性：Neyman–フィッシャー因子分解定理

<a id="thm-statmath-core41-neyman-fisher"></a>

<!-- formal-statement-start -->
> **定理（Neyman--Fisher因子分解定理：十分性の向き）**  
> 標本 $X$ の同時確率密度関数または同時確率質量関数を $f_\theta(x)$ とします。ある統計量 $T=T(X)$ と関数 $g_\theta,h$ が存在して

$$
f_\theta(x)=g_\theta(T(x))h(x)
$$

> と書け、$h$ が母数 $\theta$ に依存しないなら、$T$ は $\theta$ の十分統計量です。
<!-- formal-statement-end -->

同時確率密度関数は

$$
\begin{aligned}
f_\theta(x)
&=\theta^{-n}\prod_{i=1}^n\boldsymbol{1}_{\{0<x_i<\theta\}}\\
&=\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}
\prod_{i=1}^n\boldsymbol{1}_{\{x_i>0\}}.
\end{aligned}
$$

ここで使う **Neyman–フィッシャー因子分解定理**は、同時密度または同時確率質量関数が

$$
f_\theta(x)=g_\theta(T(x))h(x)
$$

と書け、$h$ が母数 $\theta$ に依存しないなら $T$ は十分統計量である、という定理である。

本問では

$$
g_\theta(m)=\theta^{-n}\boldsymbol{1}_{\{m<\theta\}},
\qquad
h(x)=\prod_i\boldsymbol{1}_{\{x_i>0\}}
$$

と分解できる。母数依存部分は $M$ を通じてしか現れないので

$$
\boxed{M\text{ は }\theta\text{ の十分統計量}}
$$

である。

### 2. 完備性

まず $M$ の分布を求める。$0<m<\theta$ で

$$
\begin{aligned}
P_\theta(M\le m)
&=P_\theta(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP_\theta(X_i\le m)\\
&=\left(\frac m\theta\right)^n.
\end{aligned}
$$

従って密度は

$$
f_M(m)
=\frac{d}{dm}\left(\frac m\theta\right)^n
=\frac{n m^{n-1}}{\theta^n},
\qquad 0<m<\theta.
$$

完備性の定義を確認する。$E_\theta[|g(M)|]<\infty$ で、すべての $\theta>0$ に対して

$$
E_\theta[g(M)]=0
$$

ならば $g(M)=0$ が確率1で成り立つことを示せばよい。

期待値を密度で書くと

$$
\frac n{\theta^n}
\int_0^\theta g(m)m^{n-1}\,dm=0.
$$

$n/\theta^n>0$ なので

$$
F(\theta)
:=\int_0^\theta g(m)m^{n-1}\,dm
=0
$$

が全ての $\theta>0$ で成り立つ。

問題文の仮定により上端 $\theta$ で微分してよいから、積分の基本定理より

$$
F'(\theta)=g(\theta)\theta^{n-1}=0.
$$

$\theta^{n-1}>0$ なので

$$
g(\theta)=0,
\qquad \theta>0.
$$

従って

$$
\boxed{M\text{ は完備}}
$$

である。

### 3. $\theta$ の一様最小分散不偏推定量

上で求めた密度を使うと、一般に $k>-n$ について

$$
\begin{aligned}
E[M^k]
&=\int_0^\theta
m^k\frac{n m^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}
\int_0^\theta m^{n+k-1}\,dm\\
&=\frac n{\theta^n}
\frac{\theta^{n+k}}{n+k}\\
&=\boxed{\frac{n}{n+k}\theta^k}.
\end{aligned}
$$

$k=1$ とすれば

$$
E[M]=\frac n{n+1}\theta.
$$

従って

$$
\widehat\theta
=\frac{n+1}{n}M
$$

は $\theta$ の不偏推定量である。

ここで **レーマン・シェッフェの定理**を使う。定理は、完備十分統計量 $T$ の関数であり、推定対象に対して不偏な推定量は、その対象の一意な一様最小分散不偏推定量である、というものである。

本問では問1・2より $M$ は完備十分で、$\widehat\theta$ は $M$ の関数かつ不偏だから

$$
\boxed{
\widehat\theta
=\frac{n+1}{n}M
}
$$

が $\theta$ の一様最小分散不偏推定量である。

### 4. $\theta^2$ の一様最小分散不偏推定量

問3で導いた一般式に $k=2$ を入れると

$$
E[M^2]
=\frac n{n+2}\theta^2.
$$

従って

$$
\widehat{\theta^2}
=\frac{n+2}{n}M^2
$$

は $\theta^2$ の不偏推定量である。

これも完備十分統計量 $M$ の関数なので、レーマン・シェッフェの定理から

$$
\boxed{
\widehat{\theta^2}
=\frac{n+2}{n}M^2
}
$$

が $\theta^2$ の一様最小分散不偏推定量である。

問3と問4で同じ定理を使うが、**推定対象が $\theta$ と $\theta^2$ で異なるので、不偏性はそれぞれ別に確認する必要がある**。

## 本番答案

同時密度は

$$
f_\theta(x)
=\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}
\prod_i\boldsymbol{1}_{\{x_i>0\}}
=g_\theta(M)h(x).
$$

よって Neyman–フィッシャー因子分解定理から $M$ は十分。

また

$$
P(M\le m)=\left(\frac m\theta\right)^n,
\qquad
f_M(m)=\frac{nm^{n-1}}{\theta^n}.
$$

全 $\theta>0$ で $E[g(M)]=0$ なら

$$
\int_0^\theta g(m)m^{n-1}dm=0.
$$

上端で微分して

$$
g(\theta)\theta^{n-1}=0,
$$

従って $g(\theta)=0$ であり $M$ は完備。

さらに

$$
E[M^k]
=\frac n{n+k}\theta^k.
$$

したがって

$$
E[M]=\frac n{n+1}\theta,
\qquad
E[M^2]=\frac n{n+2}\theta^2.
$$

完備十分統計量 $M$ の関数として不偏なので、レーマン・シェッフェの定理から

$$
\boxed{
\widehat\theta=\frac{n+1}{n}M
},
\qquad
\boxed{
\widehat{\theta^2}=\frac{n+2}{n}M^2
}
$$

がそれぞれ $\theta$, $\theta^2$ の一様最小分散不偏推定量である。

## 採点基準

- 十分性（因子分解定理・条件確認）: 4点
- 完備性（$M$ の密度と上端微分）: 7点
- $E[M]$ と $\theta$ の一様最小分散不偏推定量: 5点
- $E[M^2]$ と $\theta^2$ の一様最小分散不偏推定量: 4点
