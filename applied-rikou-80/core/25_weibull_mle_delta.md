# Core 25 Weibull寿命モデル・MLE・デルタ法

- 安定ID: `RIKOU-CORE-25`
- 80大問 No.: 03
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

形状母数 $k>0$ が既知の Weibull 分布

$$
F(t)=1-\exp\left\{-\left(\frac{t}{\eta}\right)^k\right\},\qquad t>0
$$

から完全データ $T_1,\dots,T_n$ を得る。$\theta=\eta^k$ とおく。

1. $Y_i=T_i^k$ の分布を求めよ。
2. $\theta$ のMLEを求め、それから $\eta$ のMLEを求めよ。
3. $\hat\theta$ の漸近分布を求め、デルタ法により $\hat\eta$ の漸近分散を求めよ。
4. 時刻 $t_0$ における信頼度 $R(t_0)$ の推定量と、その漸近分散をデルタ法で求めよ。

## 詳細解答

### 1. 変換

$y=t^k$ とすると

$$
P(Y_i\le y)=P(T_i\le y^{1/k})
=1-e^{-y/\eta^k}
=1-e^{-y/\theta}.
$$

したがって

$$
\boxed{Y_i\sim\operatorname{Exponential}(\text{mean }\theta)}.
$$

### 2. MLE

指数分布の平均母数 $\theta$ のMLEは標本平均なので

$$
\boxed{\hat\theta=\frac1n\sum_{i=1}^nT_i^k}.
$$

$\eta=\theta^{1/k}$ だからMLEの不変性より

$$
\boxed{\hat\eta=\left(\frac1n\sum T_i^k\right)^{1/k}}.
$$

### 3. 漸近分布

$Y_i$ の平均・分散は $\theta,\theta^2$。中心極限定理から

$$
\sqrt n(\hat\theta-\theta)\xrightarrow{d}N(0,\theta^2).
$$

$g(\theta)=\theta^{1/k}$ とすると

$$
g'(\theta)=\frac1k\theta^{1/k-1}.
$$

したがって

$$
\operatorname{Avar}(\hat\eta)
=\frac1n\{g'(\theta)\}^2\theta^2
=\boxed{\frac{\eta^2}{k^2n}}.
$$

### 4. 信頼度

$$
R(t_0)=\exp(-t_0^k/\theta).
$$

plug-in 推定量は

$$
\hat R(t_0)=\exp(-t_0^k/\hat\theta).
$$

$h'(\theta)=R(t_0)t_0^k/\theta^2$ なので

$$
\operatorname{Avar}(\hat R)
=\frac1n\left(\frac{R(t_0)t_0^k}{\theta^2}\right)^2\theta^2
=\boxed{\frac{R(t_0)^2t_0^{2k}}{n\theta^2}}.
$$

## 本番答案

$Y=T^k$ とおくと

$$
P(Y\le y)=1-e^{-y/\theta},\qquad \theta=\eta^k,
$$

よって $Y\sim\mathrm{Exp}(\text{mean }\theta)$。したがって

$$
\hat\theta=n^{-1}\sum T_i^k,
\qquad
\hat\eta=\hat\theta^{1/k}.
$$

$$
\sqrt n(\hat\theta-\theta)\to N(0,\theta^2),
$$

デルタ法から

$$
\operatorname{Avar}(\hat\eta)=\eta^2/(k^2n).
$$

また

$$
\hat R(t_0)=e^{-t_0^k/\hat\theta},
\quad
\operatorname{Avar}(\hat R)=R(t_0)^2t_0^{2k}/(n\theta^2).
$$

## 採点基準

- 指数分布への変換: 5点
- MLE: 5点
- $\eta$ のデルタ法: 5点
- 信頼度のデルタ法: 5点

25分経過時は $Y=T^k$ への変換を起点に、指数分布の標本平均問題へ帰着する。
