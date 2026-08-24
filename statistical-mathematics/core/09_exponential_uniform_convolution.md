# Core 42 指数分布＋一様分布：畳み込み・支持集合・依存

- 旧No.: 09
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立に

$$
X\sim\operatorname{Exp}(1),
\qquad
U\sim U(0,1)
$$

とし

$$
Y=X+U
$$

とする。

1. $Y$の支持集合を求めよ。
2. 畳み込みにより$Y$の密度を求めよ。
3. $\operatorname{Cov}(U,Y)$を求めよ。
4. $U$と$Y$が独立でないことを示せ。

## 詳細解答

$X>0$、$0<U<1$なので$Y>0$で、上側に制限はない。

畳み込みは

$$
f_Y(y)=\int f_X(y-u)f_U(u)du.
$$

$0<y<1$では$0<u<y$だから

$$
\begin{aligned}
f_Y(y)
&=\int_0^y e^{-(y-u)}du\\
&=1-e^{-y}.
\end{aligned}
$$

$y\ge1$では$0<u<1$なので

$$
\begin{aligned}
f_Y(y)
&=\int_0^1e^{-(y-u)}du\\
&=(e-1)e^{-y}.
\end{aligned}
$$

従って

$$
\boxed{
f_Y(y)=
\begin{cases}
1-e^{-y},&0<y<1,\\
(e-1)e^{-y},&y\ge1,\\
0,&\text{otherwise}.
\end{cases}
}.
$$

また

$$
Cov(U,Y)=Cov(U,X+U)=Cov(U,X)+Var(U)=0+\frac1{12}.
$$

従って

$$
\boxed{Cov(U,Y)=1/12\ne0},
$$

よって独立ではない。

## 本番答案

$Y>0$。

$$
f_Y(y)=\int e^{-(y-u)}1\{0<u<1,\ u<y\}du
$$

より

$$
f_Y(y)=
\begin{cases}
1-e^{-y},&0<y<1,\\
(e-1)e^{-y},&y\ge1.
\end{cases}
$$

さらに

$$
Cov(U,Y)=Cov(U,X)+Var(U)=1/12\ne0,
$$

したがって$U,Y$は独立でない。

## 採点基準

- 支持集合: 3点
- 畳み込み範囲: 5点
- 密度: 7点
- 共分散・独立判定: 5点
