# Advanced 03 特性関数による中心極限定理

- 旧No.: 24
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_1,X_2,\ldots$ はi.i.d.で $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$ とする。特性関数を用いて

$$
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\Rightarrow N(0,1)
$$

を導け。ただし $E[Y]=0$, $E[Y^2]=1$ の変数 $Y$ について

$$
\varphi_Y(t)=1-\frac{t^2}{2}+o(t^2)
$$

を用いてよい。

## 詳細解答

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

とすれば $E[Y_i]=0$, $E[Y_i^2]=1$。標準化和 $S_n=n^{-1/2}\sum Y_i$ の特性関数は独立性から

$$
\varphi_{S_n}(t)
=\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^n.
$$

展開より

$$
\varphi_Y\left(\frac{t}{\sqrt n}\right)
=1-\frac{t^2}{2n}+o(n^{-1}).
$$

従って

$$
\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n
\to e^{-t^2/2}.
$$

右辺は標準正規の特性関数。Lévyの連続性定理より $S_n\Rightarrow N(0,1)$。

重要なのは $o(n^{-1})$ を含む底を $n$ 乗した極限であり、対数を取れば

$$
n\log\left(1-\frac{t^2}{2n}+o(n^{-1})\right)\to-\frac{t^2}{2}.
$$

## 本番答案

$Y_i=(X_i-\mu)/\sigma$ と標準化し、

$$
\varphi_{n^{-1/2}\sum Y_i}(t)
=\left[\varphi_Y(t/\sqrt n)\right]^n
=\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n
\to e^{-t^2/2}.
$$

Lévyの連続性定理により標準正規へ分布収束する。

## 採点基準

- 標準化: 3点
- 特性関数の積: 5点
- 二次展開: 6点
- 極限: 4点
- Lévy定理: 2点
