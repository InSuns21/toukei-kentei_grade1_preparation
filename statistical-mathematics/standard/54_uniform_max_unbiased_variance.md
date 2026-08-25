# Standard 17 一様分布最大値・不偏推定・分散比較

- 旧No.: 54
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim U(0,\theta)$ とする。$\bar X$ と $M=X_{(n)}$ から

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

$X_i\sim U(0,\theta)$ なので積分から

$$
E[X_i]=\frac1\theta\int_0^\theta x\,dx=\frac\theta2,
$$

$$
E[X_i^2]=\frac1\theta\int_0^\theta x^2dx=\frac{\theta^2}{3}.
$$

従って

$$
Var(X_i)=\frac{\theta^2}{3}-\frac{\theta^2}{4}=\frac{\theta^2}{12}.
$$

よって

$$
E[T_1]=2E[\bar X]=\theta,
$$

$$
\boxed{Var(T_1)=4\frac{\theta^2}{12n}=\frac{\theta^2}{3n}}.
$$

### 最大値 $M$ の分布を定義から求める

$0\le m\le\theta$ について、独立性より

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

ここから平均を積分すると

$$
\begin{aligned}
E[M]
&=\int_0^\theta m\frac{nm^{n-1}}{\theta^n}dm\\
&=\frac n{\theta^n}\frac{\theta^{n+1}}{n+1}\\
&=\frac n{n+1}\theta.
\end{aligned}
$$

同様に

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta m^2\frac{nm^{n-1}}{\theta^n}dm\\
&=\frac n{\theta^n}\frac{\theta^{n+2}}{n+2}\\
&=\frac n{n+2}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
Var(M)
&=\frac n{n+2}\theta^2-\left(\frac n{n+1}\theta\right)^2\\
&=\boxed{\frac{n\theta^2}{(n+1)^2(n+2)}}.
\end{aligned}
$$

よって

$$
E[T_2]=\frac{n+1}{n}E[M]=\theta,
$$

$$
\begin{aligned}
Var(T_2)
&=\left(\frac{n+1}{n}\right)^2Var(M)\\
&=\boxed{\frac{\theta^2}{n(n+2)}}.
\end{aligned}
$$

### 3. 比較と解釈

$n>1$ では

$$
\frac1{n(n+2)}<\frac1{3n}
$$

だから $T_2$ の方が小分散である。

このモデルでは $\theta$ が密度の形だけでなく支持集合の右端を決める。最大値はその端点へ直接近づく統計量なので、標本平均より母数情報を強く持つ。これは通常の正則モデルとは異なる端点母数の特徴である。

## 本番答案

$E[X]=\theta/2$, $Var(X)=\theta^2/12$ から

$$
E[T_1]=\theta,
\qquad
Var(T_1)=\frac{\theta^2}{3n}.
$$

最大値について

$$
F_M(m)=P(X_1\le m,\ldots,X_n\le m)=\left(\frac m\theta\right)^n,
$$

したがって

$$
f_M(m)=\frac{nm^{n-1}}{\theta^n}.
$$

これを積分して

$$
E[M]=\frac n{n+1}\theta,
\quad
E[M^2]=\frac n{n+2}\theta^2,
$$

$$
Var(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

よって $E[T_2]=\theta$, $Var(T_2)=\theta^2/[n(n+2)]$。$n>1$ で $T_2$ の方が小分散。

## 採点基準

- $T_1$ の不偏性・分散: 5点
- 最大値累積分布関数・密度: 5点
- $T_2$ の不偏性・分散: 6点
- 比較・解釈: 4点
