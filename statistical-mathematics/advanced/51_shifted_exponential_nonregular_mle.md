# Advanced 11 位置母数付き指数分布・非正則2母数最尤推定

- 旧No.: 51
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$n\ge2$ とし、$X_1,\ldots,X_n$ は

$$
f(x;\theta,\lambda)
=\lambda e^{-\lambda(x-\theta)}\boldsymbol{1}_{\{x\ge\theta\}},
\qquad \lambda>0
$$

に独立同分布に従う。

1. 尤度を書け。
2. $(\theta,\lambda)$ の最尤推定量を求めよ。
3. このモデルが通常の正則最尤推定量理論から外れる理由を説明せよ。
4. $X_{(1)}-\theta$ の分布を求めよ。

## 詳細解答

### 1. 尤度

独立性から

$$
L(\theta,\lambda)
=\prod_{i=1}^n
\lambda e^{-\lambda(X_i-\theta)}\boldsymbol{1}_{\{X_i\ge\theta\}}.
$$

指数部分をまとめると

$$
\prod_{i=1}^ne^{-\lambda(X_i-\theta)}
=\exp\left[-\lambda\sum_{i=1}^n(X_i-\theta)\right].
$$

また指示関数の積について

$$
\prod_{i=1}^n\boldsymbol{1}_{\{X_i\ge\theta\}}
=\boldsymbol{1}_{\{\theta\le\min_iX_i\}}
=\boldsymbol{1}_{\{\theta\le X_{(1)}\}}.
$$

したがって

$$
\boxed{
L(\theta,\lambda)
=\lambda^n
\exp\left[-\lambda\sum_{i=1}^n(X_i-\theta)\right]
\boldsymbol{1}_{\{\theta\le X_{(1)}\}}
}.
$$

### 2. $\theta$ と $\lambda$ の最尤推定量

まず $\lambda>0$ を固定する。$\theta\le X_{(1)}$ の範囲では

$$
\begin{aligned}
L(\theta,\lambda)
&=\lambda^n
\exp\left[-\lambda\sum_iX_i+n\lambda\theta\right].
\end{aligned}
$$

$\theta$ に依存するのは $e^{n\lambda\theta}$ であり、$n\lambda>0$ だから $\theta$ が大きいほど尤度は大きい。

ただし許される範囲は

$$
\theta\le X_{(1)}.
$$

したがって最大値は境界で達成され

$$
\boxed{\widehat\theta=X_{(1)}}.
$$

次にこれを尤度へ代入する。$\lambda$ に関する対数尤度は

$$
\ell(\lambda)
=n\log\lambda
-\lambda\sum_{i=1}^n(X_i-X_{(1)}).
$$

微分すると

$$
\ell'(\lambda)
=\frac n\lambda-
\sum_{i=1}^n(X_i-X_{(1)}).
$$

$\ell'(\lambda)=0$ より

$$
\boxed{
\widehat\lambda
=\frac{n}{\displaystyle\sum_{i=1}^n(X_i-X_{(1)})}
}.
$$

さらに

$$
\ell''(\lambda)=-\frac n{\lambda^2}<0
$$

なので最大点である。連続分布なので $n\ge2$ なら分母が0となる確率は0である。

### 3. なぜ非正則か

通常の最尤推定量の漸近正規性では、少なくとも真値の近傍で支持集合が母数に依存せず、対数尤度を母数で滑らかに微分できることが重要である。

しかし本問の密度には

$$
\boldsymbol{1}_{\{x\ge\theta\}}
$$

があり、支持集合は

$$
[\theta,\infty)
$$

である。$\theta$ を動かすと、密度が正になる $x$ の範囲そのものが動く。

実際、$\widehat\theta$ はスコア方程式から得られる内部解ではなく

$$
\widehat\theta=X_{(1)}
$$

という標本最小値、すなわち支持の境界で決まる。

このため通常の正則モデルで現れる

$$
\sqrt n(\widehat\theta-\theta)
$$

という尺度ではなく、次問で見るように

$$
n(\widehat\theta-\theta)
$$

が非退化な極限を持つ。

### 4. $X_{(1)}-\theta$ の分布

各 $X_i-\theta$ は率 $\lambda$ の指数分布に従う。

$t\ge0$ に対して

$$
\begin{aligned}
P(X_{(1)}-\theta>t)
&=P(X_1-\theta>t,\ldots,X_n-\theta>t)\\
&=\prod_{i=1}^nP(X_i-\theta>t)
\end{aligned}
$$

である。独立性と指数分布の上側確率

$$
P(X_i-\theta>t)=e^{-\lambda t}
$$

を用いると

$$
P(X_{(1)}-\theta>t)
=(e^{-\lambda t})^n
=e^{-n\lambda t}.
$$

したがって

$$
\boxed{
X_{(1)}-\theta
\sim\operatorname{Exp}(n\lambda)
}.
$$

さらに $z\ge0$ に対して

$$
\begin{aligned}
P\{n(X_{(1)}-\theta)>z\}
&=P\left(X_{(1)}-\theta>\frac zn\right)\\
&=e^{-n\lambda(z/n)}\\
&=e^{-\lambda z}.
\end{aligned}
$$

よって

$$
\boxed{
n(\widehat\theta-\theta)
\sim\operatorname{Exp}(\lambda)
}
$$

が各 $n$ で厳密に成り立つ。これが $n^{-1}$ スケールで収束することの具体的な意味である。

## 本番答案

独立性より

$$
L(\theta,\lambda)
=\lambda^n
\exp\left[-\lambda\sum_i(X_i-\theta)\right]
\boldsymbol{1}_{\{\theta\le X_{(1)}\}}.
$$

固定した $\lambda$ では、許容範囲 $\theta\le X_{(1)}$ で尤度は $\theta$ に単調増加だから

$$
\widehat\theta=X_{(1)}.
$$

代入後

$$
\ell(\lambda)
=n\log\lambda-\lambda\sum_i(X_i-X_{(1)}),
$$

$$
\ell'(\lambda)=\frac n\lambda-\sum_i(X_i-X_{(1)})=0
$$

より

$$
\widehat\lambda
=\frac n{\sum_i(X_i-X_{(1)})}.
$$

支持集合 $[\theta,\infty)$ が $\theta$ に依存するため非正則である。

また

$$
P(X_{(1)}-\theta>t)
=(e^{-\lambda t})^n=e^{-n\lambda t},
$$

したがって

$$
X_{(1)}-\theta\sim\operatorname{Exp}(n\lambda),
\qquad
n(\widehat\theta-\theta)\sim\operatorname{Exp}(\lambda).
$$

## 採点基準

- 尤度の指示関数を $X_{(1)}$ でまとめる: 5点
- $\widehat\theta$ の境界最大化: 5点
- $\widehat\lambda$ の微分計算: 4点
- 非正則性の理由: 3点
- 最小値分布と $n^{-1}$ スケール: 3点
