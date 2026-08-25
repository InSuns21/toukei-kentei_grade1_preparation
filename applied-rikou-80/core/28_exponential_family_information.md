# Core 28 指数型分布族・スコア・Fisher情報量

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
2. $E[Y]$ と $\operatorname{Var}(Y)$ を、必要な正則条件を確認して導け。
3. $\theta$ に関する1標本 Fisher 情報量を求めよ。
4. Poisson$(\mu)$ を正準指数型分布族として表し、正準母数、$b(\theta)$、平均、分散を確認せよ。

## 詳細解答

### 1. スコア

対数を取ると

$$
\ell(\theta)
=\log f(Y;\theta,\phi)
=\frac{Y\theta-b(\theta)}{a(\phi)}+c(Y,\phi).
$$

$\phi$ を固定して $\theta$ で微分すると

$$
\begin{aligned}
U(\theta)
&=\frac{\partial\ell}{\partial\theta}\\
&=\frac{Y-b'(\theta)}{a(\phi)}.
\end{aligned}
$$

従って

$$
\boxed{
U(\theta)=\frac{Y-b'(\theta)}{a(\phi)}
}.
$$

### 2. $E[Y]$ と $\operatorname{Var}(Y)$

#### 2-1. なぜ $E[U(\theta)]=0$ としてよいか

ここを単なる既知公式として置かない。必要なのは、代表的には次の正則条件である。

- $Y$ の取り得る範囲が $\theta$ に依存しない。
- $f(y;\theta,\phi)$ を $\theta$ で微分できる。
- 必要な期待値・積分が有限で、微分と積分、または微分と総和を交換できる。

連続分布の場合、全確率が1なので

$$
\int f(y;\theta,\phi)dy=1.
$$

両辺を $\theta$ で微分し、正則条件により微分を積分の中へ入れると

$$
0
=\int \frac{\partial f(y;\theta,\phi)}{\partial\theta}dy.
$$

ここで

$$
\frac{\partial f}{\partial\theta}
=f\frac{\partial\log f}{\partial\theta}
=fU(\theta)
$$

だから

$$
\begin{aligned}
0
&=\int f(y;\theta,\phi)U(\theta)dy\\
&=E[U(\theta)].
\end{aligned}
$$

離散分布でも積分を総和へ置き換えれば同じである。

したがって

$$
E\left[
\frac{Y-b'(\theta)}{a(\phi)}
\right]=0.
$$

$a(\phi)$ は $\theta$ に依存しないので

$$
E[Y]-b'(\theta)=0,
$$

よって

$$
\boxed{E[Y]=b'(\theta)}.
$$

#### 2-2. 情報量恒等式を導く

Fisher情報量をスコアの二乗平均で

$$
I_1(\theta)=E[U(\theta)^2]
$$

と定義する。

同じ正則条件の下で $E[U(\theta)]=0$ をさらに $\theta$ で微分する。

$$
0
=\frac{d}{d\theta}E[U(\theta)]
=\frac{d}{d\theta}\int fU\,dy.
$$

微分を積分の中へ入れると

$$
0
=\int \frac{\partial(fU)}{\partial\theta}dy.
$$

積の微分から

$$
\frac{\partial(fU)}{\partial\theta}
=\frac{\partial f}{\partial\theta}U
+f\frac{\partial U}{\partial\theta}.
$$

$\partial f/\partial\theta=fU$ を使えば

$$
\begin{aligned}
0
&=\int fU^2dy
+\int f\frac{\partial U}{\partial\theta}dy\\
&=E[U^2]
+E\left[\frac{\partial U}{\partial\theta}\right].
\end{aligned}
$$

従って

$$
\boxed{
I_1(\theta)=E[U^2]
=-E\left[\frac{\partial U}{\partial\theta}\right]
=-E\left[\frac{\partial^2\ell}{\partial\theta^2}\right]
}.
$$

これが情報量恒等式であり、正則条件なしに機械的に使うものではない。

本問では

$$
U(\theta)=\frac{Y-b'(\theta)}{a(\phi)}
$$

だから

$$
\frac{\partial U}{\partial\theta}
=-\frac{b''(\theta)}{a(\phi)}.
$$

従って

$$
I_1(\theta)
=\frac{b''(\theta)}{a(\phi)}.
$$

一方、$E[Y]=b'(\theta)$ を使うと

$$
U(\theta)
=\frac{Y-E[Y]}{a(\phi)}.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(U)
&=\frac{\operatorname{Var}(Y)}{a(\phi)^2}.
\end{aligned}
$$

$E[U]=0$ なので

$$
E[U^2]=\operatorname{Var}(U).
$$

これを $I_1(\theta)=b''(\theta)/a(\phi)$ と等置すると

$$
\frac{\operatorname{Var}(Y)}{a(\phi)^2}
=\frac{b''(\theta)}{a(\phi)}.
$$

両辺へ $a(\phi)^2$ を掛けて

$$
\boxed{
\operatorname{Var}(Y)=a(\phi)b''(\theta)
}.
$$

### 3. $\theta$ に関するFisher情報量

第2問で導いた通り

$$
\boxed{
I_1(\theta)=\frac{b''(\theta)}{a(\phi)}
}.
$$

$n$ 個の独立標本なら対数尤度とスコアが標本ごとの和になる。独立性によりスコアの分散は加法的なので

$$
\begin{aligned}
I_n(\theta)
&=\operatorname{Var}\left(\sum_{i=1}^nU_i(\theta)\right)\\
&=\sum_{i=1}^n\operatorname{Var}(U_i(\theta))\\
&=nI_1(\theta).
\end{aligned}
$$

従って

$$
\boxed{I_n(\theta)=n\,b''(\theta)/a(\phi)}.
$$

### 4. Poisson分布を正準指数型分布族として表す

$Y\sim\operatorname{Poisson}(\mu)$ の確率質量関数は

$$
P(Y=y)
=e^{-\mu}\frac{\mu^y}{y!},
\qquad y=0,1,2,\ldots
$$

である。

指数関数の形へ直すと

$$
\begin{aligned}
P(Y=y)
&=\exp\{-\mu+y\log\mu-\log(y!)\}\\
&=\exp\{y\log\mu-\mu-\log(y!)\}.
\end{aligned}
$$

一般形

$$
\exp\left\{
\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)
\right\}
$$

と比較する。

$$
\boxed{\theta=\log\mu},
$$

$$
\boxed{b(\theta)=e^\theta},
\qquad
\boxed{a(\phi)=1},
$$

$$
c(y,\phi)=-\log(y!).
$$

従って第2問の一般結果から

$$
E[Y]
=b'(\theta)
=e^\theta
=\mu,
$$

$$
\operatorname{Var}(Y)
=a(\phi)b''(\theta)
=e^\theta
=\mu.
$$

したがって

$$
\boxed{E[Y]=\operatorname{Var}(Y)=\mu}.
$$

また正準母数 $\theta$ に関する1標本Fisher情報量は

$$
I_1(\theta)
=b''(\theta)
=e^\theta
=\mu.
$$

## 本番答案

$$
\ell(\theta)
=\frac{Y\theta-b(\theta)}{a(\phi)}+c(Y,\phi),
$$

より

$$
U(\theta)
=\frac{Y-b'(\theta)}{a(\phi)}.
$$

標本空間が $\theta$ に依存せず、必要な期待値・積分が有限で、微分と積分または総和を交換できる正則条件の下で

$$
0=\frac d{d\theta}\int fdy
=\int fUdy
=E[U].
$$

従って

$$
E[Y]=b'(\theta).
$$

さらに $E[U]=0$ を微分すると

$$
0=E[U^2]+E[U'],
$$

よって

$$
I_1(\theta)
=E[U^2]
=-E[U']
=\frac{b''(\theta)}{a(\phi)}.
$$

一方

$$
U=\frac{Y-E[Y]}{a(\phi)}
$$

なので

$$
\operatorname{Var}(Y)
=a(\phi)b''(\theta).
$$

Poisson分布では

$$
P(Y=y)
=\exp\{y\log\mu-\mu-\log(y!)\},
$$

したがって

$$
\theta=\log\mu,
\qquad
b(\theta)=e^\theta,
\qquad
a(\phi)=1.
$$

従って平均・分散とも $\mu$。

## 採点基準

- (1) 対数尤度を微分してスコアを得る: 4点
- (2) 正則条件を確認し、全確率1の微分から $E[U]=0$ を導く: 5点
- (2) 情報量恒等式を $E[U]=0$ の微分から導き、分散公式まで得る: 5点
- (3) 1標本・独立 $n$ 標本の情報量を導出: 2点
- (4) Poisson確率質量関数を指数型分布族の形へ書き換え、平均・分散を確認: 4点

25分経過時は $E[U]=0$ と $I=-E\ell''$ を無条件の暗記公式として置かず、少なくとも「標本空間が母数に依存せず、必要な期待値・積分が有限で、微分交換可能」と書く。