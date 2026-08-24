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

$$
M_X(t)=\int_0^\infty \lambda e^{-(\lambda-t)x}dx
=\frac{\lambda}{\lambda-t},
\qquad t<\lambda.
$$

従って

$$
f_t(x)=e^{tx}\lambda e^{-\lambda x}\frac{\lambda-t}{\lambda}
=(\lambda-t)e^{-(\lambda-t)x}.
$$

つまり $f_t$ は率 $\lambda-t$ の指数分布。よって

$$
E_t[X]=\frac1{\lambda-t},
\qquad
\operatorname{Var}_t(X)=\frac1{(\lambda-t)^2}.
$$

また一般に

$$
\frac{d}{dt}\log M_X(t)=E_t[X],
\qquad
\frac{d^2}{dt^2}\log M_X(t)=\operatorname{Var}_t(X).
$$

## 本番答案

$M_X(t)=\lambda/(\lambda-t)$。指数傾斜後は

$$
f_t(x)=(\lambda-t)e^{-(\lambda-t)x},
$$

従って $E_tX=(\lambda-t)^{-1}$, $\operatorname{Var}_tX=(\lambda-t)^{-2}$。$\log M$ の1階・2階微分は傾斜分布下の平均・分散を与える。

## 採点基準

- MGF: 5点
- 傾斜分布: 6点
- 平均・分散: 5点
- 対数MGFの解釈: 4点
