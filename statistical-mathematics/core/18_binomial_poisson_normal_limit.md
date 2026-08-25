# Core 24 二項分布・Poisson分布・正規近似の極限関係

- 旧No.: 18
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

1. $X_n\sim\operatorname{Binomial}(n,\lambda/n)$ とする。固定した $k=0,1,2,\ldots$ に対して

$$
P(X_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!}
$$

を示せ。
2. この極限で二項分布の平均と分散がどうなるか求めよ。
3. 独立な $X\sim\operatorname{Poisson}(\lambda)$、$Y\sim\operatorname{Poisson}(\mu)$ に対して $X+Y$ の分布を確率母関数から示せ。
4. $X_\lambda\sim\operatorname{Poisson}(\lambda)$ とする。$\lambda\to\infty$ のとき

$$
\frac{X_\lambda-\lambda}{\sqrt\lambda}
\xrightarrow{d}N(0,1)
$$

をモーメント母関数を用いて示せ。

## 詳細解答

### 1. 二項分布からPoisson分布への極限

固定した $k$ に対して

$$
\begin{aligned}
P(X_n=k)
&=\binom nk
\left(\frac\lambda n\right)^k
\left(1-\frac\lambda n\right)^{n-k}\\
&=\frac{n(n-1)\cdots(n-k+1)}{k!}
\frac{\lambda^k}{n^k}
\left(1-\frac\lambda n\right)^n
\left(1-\frac\lambda n\right)^{-k}\\
&=\frac{\lambda^k}{k!}
\left\{\prod_{j=0}^{k-1}\left(1-\frac jn\right)\right\}
\left(1-\frac\lambda n\right)^n
\left(1-\frac\lambda n\right)^{-k}.
\end{aligned}
$$

$k$ は固定なので

$$
\prod_{j=0}^{k-1}\left(1-\frac jn\right)\to1,
$$

$$
\left(1-\frac\lambda n\right)^{-k}\to1.
$$

さらに基本極限

$$
\left(1-\frac\lambda n\right)^n\to e^{-\lambda}
$$

を用いると

$$
\boxed{
P(X_n=k)
\to e^{-\lambda}\frac{\lambda^k}{k!}
}.
$$

これは成功確率が小さく、試行回数が大きい二項分布がPoisson分布へ近づく「希少事象の極限」である。

### 2. 平均と分散の極限

二項分布 $\operatorname{Binomial}(n,p)$ について

$$
E[X_n]=np,
\qquad
\operatorname{Var}(X_n)=np(1-p).
$$

本問では $p=\lambda/n$ なので

$$
E[X_n]
=n\frac\lambda n
=\boxed{\lambda}.
$$

また

$$
\operatorname{Var}(X_n)
=n\frac\lambda n
\left(1-\frac\lambda n\right)
=\lambda\left(1-\frac\lambda n\right)
\to\boxed{\lambda}.
$$

極限で平均と分散がともに $\lambda$ となり、Poisson$(\lambda)$ の平均・分散と一致する。

### 3. 独立Poisson変数の和

まず Poisson$(\lambda)$ の確率母関数を定義から求める。

$$
\begin{aligned}
G_X(s)
&=E[s^X]\\
&=\sum_{k=0}^\infty s^k e^{-\lambda}\frac{\lambda^k}{k!}\\
&=e^{-\lambda}
\sum_{k=0}^\infty\frac{(\lambda s)^k}{k!}\\
&=e^{-\lambda}e^{\lambda s}\\
&=\exp\{\lambda(s-1)\}.
\end{aligned}
$$

同様に

$$
G_Y(s)=\exp\{\mu(s-1)\}.
$$

$X,Y$ は独立なので

$$
\begin{aligned}
G_{X+Y}(s)
&=E[s^{X+Y}]\\
&=E[s^Xs^Y]\\
&=E[s^X]E[s^Y]\\
&=G_X(s)G_Y(s)\\
&=\exp\{(\lambda+\mu)(s-1)\}.
\end{aligned}
$$

これは Poisson$(\lambda+\mu)$ の確率母関数だから

$$
\boxed{X+Y\sim\operatorname{Poisson}(\lambda+\mu)}.
$$

### 4. 大きなPoisson平均の正規極限

$$
Z_\lambda
=\frac{X_\lambda-\lambda}{\sqrt\lambda}
$$

と置く。

Poisson$(\lambda)$ のモーメント母関数を定義から求めると

$$
\begin{aligned}
M_{X_\lambda}(t)
&=E[e^{tX_\lambda}]\\
&=\sum_{k=0}^\infty e^{tk}e^{-\lambda}\frac{\lambda^k}{k!}\\
&=e^{-\lambda}\exp(\lambda e^t)\\
&=\exp\{\lambda(e^t-1)\}.
\end{aligned}
$$

従って標準化変数のモーメント母関数は

$$
\begin{aligned}
M_{Z_\lambda}(t)
&=E\left[
\exp\left\{
\frac{t(X_\lambda-\lambda)}{\sqrt\lambda}
\right\}
\right]\\
&=\exp(-t\sqrt\lambda)
M_{X_\lambda}\left(\frac t{\sqrt\lambda}\right)\\
&=\exp\left[
-t\sqrt\lambda
+\lambda\left\{
\exp\left(\frac t{\sqrt\lambda}\right)-1
\right\}
\right].
\end{aligned}
$$

固定した $t$ に対して指数関数を0のまわりで展開すると

$$
\exp\left(\frac t{\sqrt\lambda}\right)
=1+\frac t{\sqrt\lambda}
+\frac{t^2}{2\lambda}
+O(\lambda^{-3/2}).
$$

これを指数部へ代入すると

$$
\begin{aligned}
&-t\sqrt\lambda
+\lambda\left\{
\exp\left(\frac t{\sqrt\lambda}\right)-1
\right\}\\
&\quad=-t\sqrt\lambda
+\lambda\left\{
\frac t{\sqrt\lambda}
+\frac{t^2}{2\lambda}
+O(\lambda^{-3/2})
\right\}\\
&\quad=-t\sqrt\lambda+t\sqrt\lambda+rac{t^2}{2}+O(\lambda^{-1/2})\\
&\quad=\frac{t^2}{2}+O(\lambda^{-1/2}).
\end{aligned}
$$

従って

$$
M_{Z_\lambda}(t)
\to\exp\left(\frac{t^2}{2}\right).
$$

右辺は標準正規分布 $N(0,1)$ のモーメント母関数であり、0の近傍で有限である。モーメント母関数の収束定理から

$$
\boxed{
\frac{X_\lambda-\lambda}{\sqrt\lambda}
\xrightarrow{d}N(0,1)
}.
$$

従って $\lambda$ が大きいとき

$$
X_\lambda\approx N(\lambda,\lambda)
$$

という正規近似が得られる。

## 本番答案

固定した $k$ について

$$
P(X_n=k)
=\frac{\lambda^k}{k!}
\prod_{j=0}^{k-1}\left(1-\frac jn\right)
\left(1-\frac\lambda n\right)^n
\left(1-\frac\lambda n\right)^{-k}.
$$

各因子の極限から

$$
P(X_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!}.
$$

また

$$
E[X_n]=\lambda,
\qquad
\operatorname{Var}(X_n)=\lambda(1-\lambda/n)\to\lambda.
$$

Poisson$(\lambda)$ の確率母関数は

$$
G_X(s)=\exp\{\lambda(s-1)\}.
$$

独立性から

$$
G_{X+Y}(s)
=G_X(s)G_Y(s)
=\exp\{(\lambda+\mu)(s-1)\},
$$

よって $X+Y\sim\operatorname{Poisson}(\lambda+\mu)$。

さらに $Z_\lambda=(X_\lambda-\lambda)/\sqrt\lambda$ なら

$$
M_{Z_\lambda}(t)
=\exp\left[
-t\sqrt\lambda
+\lambda\left\{
e^{t/\sqrt\lambda}-1
\right\}
\right].
$$

$$
e^{t/\sqrt\lambda}
=1+t/\sqrt\lambda+t^2/(2\lambda)+O(\lambda^{-3/2})
$$

より

$$
M_{Z_\lambda}(t)\to e^{t^2/2},
$$

従って $Z_\lambda\xrightarrow{d}N(0,1)$。

## 採点基準

- 二項確率質量関数の因子分解と極限: 5点
- 平均・分散の極限: 3点
- Poisson確率母関数を定義から求め、和の分布を同定: 5点
- モーメント母関数・Taylor展開・収束定理による正規極限: 7点
