# Standard 03 指数分布モーメント母関数・指数傾斜

- 旧No.: 13
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X$ は率母数 $\lambda>0$ の指数分布に従い、その確率密度関数を

$$
f(x;\lambda)=
\begin{cases}
\lambda e^{-\lambda x},&x>0,\\
0,&x\le0
\end{cases}
$$

とする。

1. モーメント母関数 $M_X(t)=E[e^{tX}]$ を、存在範囲とともに求めよ。
2. $t<\lambda$ に対し

$$
f_t(x)=\frac{e^{tx}f(x;\lambda)}{M_X(t)}
$$

で定める指数傾斜分布を求め、確率密度関数になっていることを確認せよ。
3. $f_t$ の平均・分散を求めよ。
4. $d\log M_X(t)/dt$ および $d^2\log M_X(t)/dt^2$ の確率的意味を述べよ。

## 詳細解答

### 1. モーメント母関数

定義から

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\int_0^\infty e^{tx}\lambda e^{-\lambda x}dx\\
&=\lambda\int_0^\infty e^{-(\lambda-t)x}dx.
\end{aligned}
$$

この広義積分が有限になるためには

$$
\lambda-t>0,
$$

すなわち $t<\lambda$ が必要である。そのとき

$$
\int_0^\infty e^{-(\lambda-t)x}dx
=\frac1{\lambda-t}
$$

だから

$$
\boxed{M_X(t)=\frac{\lambda}{\lambda-t}},
\qquad t<\lambda.
$$

$t\ge\lambda$ では積分は発散するので、モーメント母関数の有限な存在範囲は $(-\infty,\lambda)$ である。

### 2. 指数傾斜分布

定義へ代入すると

$$
\begin{aligned}
f_t(x)
&=\frac{e^{tx}\lambda e^{-\lambda x}}
{\lambda/(\lambda-t)}\\
&=(\lambda-t)e^{-(\lambda-t)x},
\qquad x>0.
\end{aligned}
$$

$t<\lambda$ なので $\lambda-t>0$ であり、これは率 $\lambda-t$ の指数分布の密度である。

また

$$
\begin{aligned}
\int_0^\infty f_t(x)dx
&=(\lambda-t)\int_0^\infty e^{-(\lambda-t)x}dx\\
&=1,
\end{aligned}
$$

よって確かに確率密度関数になっている。

したがって

$$
\boxed{X\text{ under }f_t\sim\operatorname{Exp}(\lambda-t)}.
$$

### 3. 平均・分散

率 $r$ の指数分布では平均 $1/r$、分散 $1/r^2$ なので、ここでは $r=\lambda-t$ として

$$
\boxed{E_t[X]=\frac1{\lambda-t}},
\qquad
\boxed{\operatorname{Var}_t(X)=\frac1{(\lambda-t)^2}}.
$$

以下の第4問からも同じ結果を導ける。

### 4. 対数モーメント母関数の確率的意味

$t<\lambda$ の内部では指数重み付きの積分が有限であり、微分と積分を交換できる。すると

$$
M_X'(t)
=\int_0^\infty x e^{tx}f(x;\lambda)dx.
$$

したがって

$$
\begin{aligned}
\frac{d}{dt}\log M_X(t)
&=\frac{M_X'(t)}{M_X(t)}\\
&=\int_0^\infty x
\frac{e^{tx}f(x;\lambda)}{M_X(t)}dx\\
&=\boxed{E_t[X]}.
\end{aligned}
$$

さらに

$$
M_X''(t)
=\int_0^\infty x^2e^{tx}f(x;\lambda)dx
$$

なので

$$
\begin{aligned}
\frac{d^2}{dt^2}\log M_X(t)
&=\frac{M_X''(t)}{M_X(t)}
-\left(\frac{M_X'(t)}{M_X(t)}\right)^2\\
&=E_t[X^2]-E_t[X]^2\\
&=\boxed{\operatorname{Var}_t(X)}.
\end{aligned}
$$

本問では

$$
\log M_X(t)=\log\lambda-\log(\lambda-t)
$$

だから

$$
\frac{d}{dt}\log M_X(t)=\frac1{\lambda-t},
$$

$$
\frac{d^2}{dt^2}\log M_X(t)=\frac1{(\lambda-t)^2},
$$

となり第3問と一致する。

これは指数傾斜の一般論で、**対数モーメント母関数の一階微分が傾斜後の平均、二階微分が傾斜後の分散**を与える。

## 本番答案

$$
M_X(t)
=\int_0^\infty\lambda e^{-(\lambda-t)x}dx
=\frac{\lambda}{\lambda-t},
\qquad t<\lambda.
$$

したがって

$$
f_t(x)
=\frac{e^{tx}\lambda e^{-\lambda x}}{M_X(t)}
=(\lambda-t)e^{-(\lambda-t)x},
$$

より $f_t$ は率 $\lambda-t$ の指数分布。従って

$$
E_t[X]=\frac1{\lambda-t},
\qquad
\operatorname{Var}_t(X)=\frac1{(\lambda-t)^2}.
$$

また

$$
(\log M)'=\frac{M'}M=E_t[X],
$$

$$
(\log M)''
=\frac{M''}M-\left(\frac{M'}M\right)^2
=\operatorname{Var}_t(X).
$$

## 採点基準

- モーメント母関数と存在範囲: 5点
- 傾斜分布と正規化確認: 5点
- 平均・分散: 4点
- 対数モーメント母関数の微分の導出: 6点
