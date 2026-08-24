# Standard 03 指数分布MGF・指数傾斜

- 旧No.: 13
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim\operatorname{Exp}(\lambda)$, $\lambda>0$ とする。

1. MGF $M_X(t)$ を求めよ。
2. $t<\lambda$ に対し

$$
f_t(x)=\frac{e^{tx}f(x)}{M_X(t)}
$$

で定める指数傾斜分布を求めよ。
3. $f_t$ の平均・分散を求めよ。
4. $d\log M_X(t)/dt$ の確率的意味を述べよ。

## 詳細解答

### 1. MGF

指数分布の密度 $f(x)=\lambda e^{-\lambda x}$, $x>0$ から定義通り

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\int_0^\infty e^{tx}\lambda e^{-\lambda x}dx\\
&=\lambda\int_0^\infty e^{-(\lambda-t)x}dx.
\end{aligned}
$$

この積分が有限になるのは $t<\lambda$ のときで、

$$
\int_0^\infty e^{-(\lambda-t)x}dx=\frac1{\lambda-t}
$$

だから

$$
\boxed{M_X(t)=\frac{\lambda}{\lambda-t}},\qquad t<\lambda.
$$

### 2. 指数傾斜分布

定義へ代入して

$$
\begin{aligned}
f_t(x)
&=\frac{e^{tx}\lambda e^{-\lambda x}}{\lambda/(\lambda-t)}\\
&=(\lambda-t)e^{-(\lambda-t)x},\qquad x>0.
\end{aligned}
$$

したがって率 $\lambda-t$ の指数分布である。

### 3. 平均・分散と 4. 対数MGFの意味

まず一般に

$$
M_X'(t)=\int x e^{tx}f(x)dx
$$

なので

$$
\frac{d}{dt}\log M_X(t)
=\frac{M_X'(t)}{M_X(t)}
=\int x\frac{e^{tx}f(x)}{M_X(t)}dx
=E_t[X].
$$

さらにもう一度微分すると

$$
\begin{aligned}
\frac{d^2}{dt^2}\log M_X(t)
&=\frac{M_X''(t)}{M_X(t)}-\left(\frac{M_X'(t)}{M_X(t)}\right)^2\\
&=E_t[X^2]-E_t[X]^2\\
&=\operatorname{Var}_t(X).
\end{aligned}
$$

本問では

$$
\log M_X(t)=\log\lambda-\log(\lambda-t)
$$

だから

$$
\boxed{E_t[X]=\frac1{\lambda-t}},
\qquad
\boxed{\operatorname{Var}_t(X)=\frac1{(\lambda-t)^2}}.
$$

## 本番答案

$$
M_X(t)=\int_0^\infty \lambda e^{-(\lambda-t)x}dx
=\frac{\lambda}{\lambda-t},\qquad t<\lambda.
$$

したがって

$$
f_t(x)=\frac{e^{tx}\lambda e^{-\lambda x}}{M_X(t)}
=(\lambda-t)e^{-(\lambda-t)x}.
$$

また

$$
(\log M)'=M'/M=E_t[X],
\qquad
(\log M)''=\operatorname{Var}_t(X),
$$

より平均は $(\lambda-t)^{-1}$、分散は $(\lambda-t)^{-2}$。

## 採点基準

- MGF: 5点
- 傾斜分布: 6点
- 平均・分散: 5点
- 対数MGFの解釈: 4点
