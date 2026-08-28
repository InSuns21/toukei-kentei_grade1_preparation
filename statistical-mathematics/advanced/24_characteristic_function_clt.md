# Advanced 03 特性関数による中心極限定理

- 旧No.: 24
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_1,X_2,\ldots$ は独立同分布で $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$ とする。特性関数を用いて

$$
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\xrightarrow{d} N(0,1)
$$

を導け。ただし $E[Y]=0$, $E[Y^2]=1$ の変数 $Y$ について

$$
\varphi_Y(t)=1-\frac{t^2}{2}+o(t^2)
$$

を用いてよい。

## 詳細解答

### 1. 標準化と特性関数の積

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

と置くと $Y_i$ は独立同分布で

$$
E[Y_i]=0,
\qquad
E[Y_i^2]=1.
$$

標準化和を

$$
S_n=\frac1{\sqrt n}\sum_{i=1}^nY_i
$$

とする。固定した $t$ に対し、独立性から

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E\left[\exp\left\{\frac{it}{\sqrt n}\sum_{j=1}^nY_j\right\}\right]\\
&=E\left[\prod_{j=1}^n e^{itY_j/\sqrt n}\right]\\
&=\prod_{j=1}^nE[e^{itY_j/\sqrt n}]\\
&=\left[\varphi_Y\left(\frac t{\sqrt n}\right)\right]^n.
\end{aligned}
$$

### 2. $o(t^2)$ を $o(n^{-1})$ へ移す

仮定された展開を

$$
\varphi_Y(u)=1-\frac{u^2}{2}+r(u),
\qquad
\frac{r(u)}{u^2}\to0
$$

と書く。$u=t/\sqrt n$ を代入すると

$$
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}+r\left(\frac t{\sqrt n}\right).
$$

$t\ne0$ なら

$$
\frac{r(t/\sqrt n)}{1/n}
=t^2\frac{r(t/\sqrt n)}{t^2/n}\to0,
$$

したがって

$$
r\left(\frac t{\sqrt n}\right)=o(n^{-1}).
$$

$t=0$ では特性関数は常に1なので自明である。よって固定 $t$ について

$$
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}+o(n^{-1}).
$$

### 3. $n$ 乗極限

$$
u_n=-\frac{t^2}{2n}+o(n^{-1})
$$

と置くと

$$
u_n\to0,
\qquad
n u_n\to-\frac{t^2}{2},
\qquad
u_n=O(n^{-1}).
$$

$u_n$ は0へ行くので

$$
\log(1+u_n)=u_n+O(u_n^2).
$$

したがって

$$
\begin{aligned}
n\log(1+u_n)
&=n u_n+O(nu_n^2)\\
&\longrightarrow-\frac{t^2}{2},
\end{aligned}
$$

なぜなら $nu_n^2=O(n^{-1})\to0$ だからである。従って

$$
\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n
\longrightarrow e^{-t^2/2}.
$$

つまり

$$
\varphi_{S_n}(t)\to e^{-t^2/2}.
$$

右辺は標準正規分布の特性関数であり、0で連続である。Lévyの連続性定理より

$$
S_n\xrightarrow{d} N(0,1).
$$

$S_n=(\sum X_i-n\mu)/(\sigma\sqrt n)$ だから求める中心極限定理を得る。

## 本番答案

$Y_i=(X_i-\mu)/\sigma$ と置くと

$$
S_n=n^{-1/2}\sum_iY_i,
\qquad
\varphi_{S_n}(t)=\left[\varphi_Y(t/\sqrt n)\right]^n.
$$

仮定より

$$
\varphi_Y(t/\sqrt n)
=1-\frac{t^2}{2n}+r(t/\sqrt n),
$$

かつ $r(u)=o(u^2)$ なので $r(t/\sqrt n)=o(n^{-1})$。従って $u_n=-t^2/(2n)+o(n^{-1})$ と置けば

$$
n\log(1+u_n)=nu_n+O(nu_n^2)\to-\frac{t^2}{2},
$$

よって

$$
\varphi_{S_n}(t)\to e^{-t^2/2}.
$$

Lévyの連続性定理から $S_n\xrightarrow{d} N(0,1)$。

## 採点基準

- 標準化: 3点
- 特性関数の積（独立性まで）: 5点
- 二次展開と $o(n^{-1})$ の確認: 6点
- $n$ 乗極限の正当化: 4点
- Lévy定理: 2点
