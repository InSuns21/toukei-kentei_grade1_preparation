# Standard 17 一様分布最大値・不偏推定・分散比較

- 旧No.: 54
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で区間 $(0,\theta)$ 上の一様分布に従う。$\theta>0$ は未知とし、確率密度関数は

$$
f(x;\theta)=
\begin{cases}
\dfrac1\theta,&0<x<\theta,\\
0,&\text{otherwise}
\end{cases}
$$

である。標本平均 $\bar X$ と最大順序統計量 $M=X_{(n)}$ から

$$
T_1=2\bar X,
\qquad
T_2=\frac{n+1}{n}M
$$

を考える。

1. 両者が $\theta$ の不偏推定量であることを示せ。
2. 分散を求め比較せよ。
3. なぜ最大値を使う推定量が有利なのか説明せよ。

## 詳細解答

### 1. $T_1,T_2$ の不偏性

まず1標本 $X_i$ の平均を密度から求める。

$$
\begin{aligned}
E[X_i]
&=\int_0^\theta x\frac1\theta\,dx\\
&=\frac1\theta\left[\frac{x^2}{2}\right]_0^\theta\\
&=\frac\theta2.
\end{aligned}
$$

従って

$$
E[\bar X]=\frac\theta2
$$

であり、

$$
\boxed{E[T_1]=2E[\bar X]=\theta}.
$$

次に最大値 $M$ の分布を定義から求める。$0\le m\le\theta$ では

$$
P(X_i\le m)
=\int_0^m\frac1\theta\,dx
=\frac m\theta.
$$

最大値が $m$ 以下であることは、全観測値が $m$ 以下であることと同値である。独立性より

$$
\begin{aligned}
F_M(m)
&=P(M\le m)\\
&=P(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP(X_i\le m)\\
&=\left(\frac m\theta\right)^n.
\end{aligned}
$$

従って密度は

$$
f_M(m)
=\frac{d}{dm}F_M(m)
=\frac{nm^{n-1}}{\theta^n},
\qquad 0<m<\theta.
$$

よって

$$
\begin{aligned}
E[M]
&=\int_0^\theta m\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}
\left[\frac{m^{n+1}}{n+1}\right]_0^\theta\\
&=\frac n{n+1}\theta.
\end{aligned}
$$

したがって

$$
\begin{aligned}
E[T_2]
&=\frac{n+1}{n}E[M]\\
&=\frac{n+1}{n}\frac n{n+1}\theta\\
&=\theta.
\end{aligned}
$$

従って

$$
\boxed{T_1,T_2\text{ はともに }\theta\text{ の不偏推定量}}.
$$

### 2. 分散を求めて比較する

#### $T_1$ の分散

まず

$$
\begin{aligned}
E[X_i^2]
&=\int_0^\theta x^2\frac1\theta\,dx\\
&=\frac1\theta\left[\frac{x^3}{3}\right]_0^\theta\\
&=\frac{\theta^2}{3}.
\end{aligned}
$$

従って

$$
\begin{aligned}
\operatorname{Var}(X_i)
&=E[X_i^2]-E[X_i]^2\\
&=\frac{\theta^2}{3}-\frac{\theta^2}{4}\\
&=\frac{\theta^2}{12}.
\end{aligned}
$$

独立性から

$$
\operatorname{Var}(\bar X)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)
=\frac{\theta^2}{12n}.
$$

よって

$$
\boxed{
\operatorname{Var}(T_1)
=4\operatorname{Var}(\bar X)
=\frac{\theta^2}{3n}
}.
$$

#### $T_2$ の分散

問1で求めた $M$ の密度から

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta m^2\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}
\left[\frac{m^{n+2}}{n+2}\right]_0^\theta\\
&=\frac n{n+2}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M)
&=E[M^2]-E[M]^2\\
&=\frac n{n+2}\theta^2
-\left(\frac n{n+1}\theta\right)^2\\
&=\theta^2\left\{
\frac{n(n+1)^2-n^2(n+2)}{(n+2)(n+1)^2}
\right\}\\
&=\theta^2\frac{n}{(n+1)^2(n+2)}.
\end{aligned}
$$

ここで分子は

$$
n(n+1)^2-n^2(n+2)
=n\{(n+1)^2-n(n+2)\}=n
$$

と整理した。

よって

$$
\begin{aligned}
\operatorname{Var}(T_2)
&=\left(\frac{n+1}{n}\right)^2\operatorname{Var}(M)\\
&=\left(\frac{n+1}{n}\right)^2
\frac{n\theta^2}{(n+1)^2(n+2)}\\
&=\boxed{\frac{\theta^2}{n(n+2)}}.
\end{aligned}
$$

$n>1$ では

$$
\frac1{n(n+2)}<\frac1{3n}
$$

だから

$$
\boxed{\operatorname{Var}(T_2)<\operatorname{Var}(T_1)}.
$$

さらに

$$
\operatorname{Var}(T_1)=O(n^{-1}),
\qquad
\operatorname{Var}(T_2)=O(n^{-2}).
$$

したがって標本数が増えたとき、最大値に基づく $T_2$ の方が急速に精度が上がる。

### 3. なぜ最大値を使う推定量が有利なのか

本問では未知母数 $\theta$ が単に平均や分散を変えるだけでなく、確率密度が正になる範囲

$$
0<x<\theta
$$

の **右端そのもの** を決めている。

標本平均は標本全体の中心位置を見る統計量である。一方、最大値

$$
M=X_{(n)}
$$

は未知の右端 $\theta$ のすぐ近くまで直接到達する統計量である。

実際、$0<t<1$ に対して

$$
P\left(\frac M\theta\le t\right)
=t^n.
$$

従って任意の $\varepsilon\in(0,1)$ について

$$
P\left(\theta-M>\varepsilon\theta\right)
=P\left(\frac M\theta<1-\varepsilon\right)
=(1-\varepsilon)^n,
$$

これは $n$ とともに指数的に0へ減る。

さらに $T_2$ の分散が $O(n^{-2})$ であることから、典型的な誤差の大きさは $O(n^{-1})$ である。通常の標本平均型推定量の典型的誤差 $O(n^{-1/2})$ より速い。

このような速い収束が可能なのは、支持集合 $(0,\theta)$ が未知母数に依存する **非正則モデル**だからである。通常の正則モデルの「最尤推定量は $n^{-1/2}$ スケール」という直感を、そのまま端点母数へ適用してはいけない。

## 本番答案

密度から

$$
E[X]=\frac\theta2,
\qquad
E[X^2]=\frac{\theta^2}{3},
\qquad
\operatorname{Var}(X)=\frac{\theta^2}{12}.
$$

従って

$$
E[T_1]=\theta,
\qquad
\operatorname{Var}(T_1)=\frac{\theta^2}{3n}.
$$

また $0\le m\le\theta$ で

$$
F_M(m)
=P(X_1\le m,\ldots,X_n\le m)
=\left(\frac m\theta\right)^n,
$$

したがって

$$
f_M(m)=\frac{nm^{n-1}}{\theta^n}.
$$

積分から

$$
E[M]=\frac n{n+1}\theta,
\qquad
E[M^2]=\frac n{n+2}\theta^2.
$$

よって

$$
E[T_2]=\theta,
$$

$$
\operatorname{Var}(T_2)
=\left(\frac{n+1}{n}\right)^2
\left\{
\frac n{n+2}\theta^2-rac{n^2}{(n+1)^2}\theta^2
\right\}
=\frac{\theta^2}{n(n+2)}.
$$

$n>1$ では

$$
\operatorname{Var}(T_2)<\operatorname{Var}(T_1).
$$

$\theta$ は支持の右端を決めるため最大値が端点情報を直接使え、$T_2$ は $O(n^{-2})$ の分散を持つ。

## 採点基準

- $T_1$ の不偏性と $T_2$ の不偏性（最大値の分布導出を含む）: 6点
- $T_1$ の分散: 4点
- $T_2$ の二次モーメント・分散・比較: 6点
- 分散オーダーと端点母数・非正則性の解釈: 4点
