# Core 28 指数型分布族・Score・Fisher情報量

- 安定ID: `RIKOU-CORE-28`
- 80大問 No.: 71
- 演習価値: A
- 難度: A
- 目安時間: 30分

## 問題

1標本の密度または確率質量関数が

$$
f(y;\theta,\phi)
=\exp\left\{\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}
$$

と書けるとする。

1. $\theta$ に関するスコアを求めよ。
2. $E[Y]$ と $\operatorname{Var}(Y)$ を導け。
3. $\theta$ に関する1標本 Fisher 情報量を求めよ。
4. Poisson$(\mu)$ を正準指数型分布族として表し、正準母数、$b(\theta)$、平均、分散を確認せよ。

## 詳細解答

### 1. スコア

$$
U(\theta)=\frac{\partial}{\partial\theta}\log f
=\frac{y-b'(\theta)}{a(\phi)}.
$$

正則条件の下で $E[U]=0$ だから

$$
\boxed{E[Y]=b'(\theta)}.
$$

### 2. 分散

スコアの分散と情報量の恒等式を使う。2階微分は

$$
\frac{\partial^2\log f}{\partial\theta^2}
=-\frac{b''(\theta)}{a(\phi)}.
$$

したがって

$$
I_1(\theta)=\frac{b''(\theta)}{a(\phi)}.
$$

一方

$$
\operatorname{Var}(U)
=\frac{\operatorname{Var}(Y)}{a(\phi)^2}.
$$

両者を等置すると

$$
\boxed{\operatorname{Var}(Y)=a(\phi)b''(\theta)}.
$$

### 3. Fisher情報

上で得た通り

$$
\boxed{I_1(\theta)=b''(\theta)/a(\phi)}.
$$

$n$ 独立標本なら $I_n=nI_1$。

### 4. Poisson

$$
P(Y=y)=\exp\{y\log\mu-\mu-\log(y!)\}.
$$

したがって

$$
\theta=\log\mu,
\qquad
b(\theta)=e^\theta,
\qquad
a(\phi)=1.
$$

ゆえに

$$
E[Y]=b'(\theta)=e^\theta=\mu,
$$

$$
\operatorname{Var}(Y)=b''(\theta)=e^\theta=\mu.
$$

## 本番答案

$$
U(\theta)=\frac{Y-b'(\theta)}{a(\phi)}.
$$

$E[U]=0$ より $E[Y]=b'(\theta)$。また

$$
- E\left[\frac{\partial^2\ell}{\partial\theta^2}\right]
=\frac{b''(\theta)}{a(\phi)}
=\operatorname{Var}(U),
$$

だから

$$
\operatorname{Var}(Y)=a(\phi)b''(\theta),
\quad I_1(\theta)=b''(\theta)/a(\phi).
$$

Poissonでは $\theta=\log\mu$, $b=e^\theta$, よって平均・分散とも $\mu$。

## 採点基準

- スコア: 4点
- 平均導出: 4点
- 分散・情報量: 7点
- Poisson例: 5点

25分経過時は $E[U]=0$ と $I=-E\ell''$ の2本だけで導出する。
