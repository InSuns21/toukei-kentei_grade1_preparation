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

### 1. $T_1$ の平均と 2. 分散

問題文の密度から

$$
E[X_i]=\int_0^\theta x\frac1\theta\,dx
=\frac\theta2,
$$

$$
E[X_i^2]=\int_0^\theta x^2\frac1\theta\,dx
=\frac{\theta^2}{3}.
$$

従って

$$
\operatorname{Var}(X_i)
=E[X_i^2]-E[X_i]^2
=\frac{\theta^2}{3}-\frac{\theta^2}{4}
=\frac{\theta^2}{12}.
$$

独立性から

$$
E[\bar X]=\frac\theta2,
\qquad
\operatorname{Var}(\bar X)=\frac{\theta^2}{12n}.
$$

よって

$$
E[T_1]=2E[\bar X]=\theta,
$$

$$
\boxed{\operatorname{Var}(T_1)=\frac{\theta^2}{3n}}.
$$

### 最大値 $M$ の分布を定義から求める

$0\le m\le\theta$ では、1標本の累積分布関数は

$$
P(X_i\le m)=\int_0^m\frac1\theta\,dx
=\frac m\theta.
$$

最大値が $m$ 以下であることは全観測値が $m$ 以下であることと同値なので、独立性より

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
f_M(m)=\frac{d}{dm}F_M(m)
=\frac{n m^{n-1}}{\theta^n},
\qquad0<m<\theta.
$$

ここから

$$
\begin{aligned}
E[M]
&=\int_0^\theta m\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}\frac{\theta^{n+1}}{n+1}\\
&=\frac n{n+1}\theta,
\end{aligned}
$$

また

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta m^2\frac{nm^{n-1}}{\theta^n}\,dm\\
&=\frac n{\theta^n}\frac{\theta^{n+2}}{n+2}\\
&=\frac n{n+2}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M)
&=E[M^2]-E[M]^2\\
&=\frac n{n+2}\theta^2-
\left(\frac n{n+1}\theta\right)^2\\
&=\boxed{\frac{n\theta^2}{(n+1)^2(n+2)}}.
\end{aligned}
$$

よって

$$
E[T_2]
=\frac{n+1}{n}E[M]
=\theta,
$$

$$
\begin{aligned}
\operatorname{Var}(T_2)
&=\left(\frac{n+1}{n}\right)^2\operatorname{Var}(M)\\
&=\boxed{\frac{\theta^2}{n(n+2)}}.
\end{aligned}
$$

### 3. 比較と解釈

$n>1$ では

$$
\frac1{n(n+2)}<\frac1{3n}
$$

だから

$$
\operatorname{Var}(T_2)<\operatorname{Var}(T_1).
$$

さらにオーダーを見ると

$$
\operatorname{Var}(T_1)=O(n^{-1}),
\qquad
\operatorname{Var}(T_2)=O(n^{-2}).
$$

このモデルでは $\theta$ が密度の係数だけでなく支持集合の右端そのものを決める。最大値 $M$ はその端点へ直接近づくため、標本平均より $\theta$ に関する情報を強く持つ。

通常の正則モデルでは支持集合が母数に依存しないことが多いが、本問では支持が $\theta$ に依存する。この非正則性が、最大値による $O(n^{-2})$ の分散という速い収束と関係している。

## 本番答案

密度 $f(x;\theta)=1/\theta$（$0<x<\theta$）から

$$
E[X]=\frac\theta2,
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
\quad
E[M^2]=\frac n{n+2}\theta^2,
$$

$$
\operatorname{Var}(M)
=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

よって

$$
E[T_2]=\theta,
\qquad
\operatorname{Var}(T_2)=\frac{\theta^2}{n(n+2)}.
$$

$n>1$ で $T_2$ の方が小分散であり、支持の端点が未知母数であるため最大値が強い情報を持つ。

## 採点基準

- 密度から $T_1$ の不偏性・分散を導出: 5点
- 最大値の累積分布関数・密度: 5点
- $T_2$ の不偏性・分散: 6点
- 分散オーダーと端点母数の解釈: 4点
