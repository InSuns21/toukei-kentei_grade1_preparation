# Core 21 指数分布と一様分布の畳み込み

- 旧No.: 9
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim\operatorname{Exp}(1)$、$U\sim U(0,1)$ は独立とし

$$
Y=X+U
$$

とする。

1. $Y$ の支持を求めよ。
2. $Y$ の確率密度関数を畳み込みから求めよ。
3. $\operatorname{Cov}(U,Y)$ を求めよ。
4. $U$ と $Y$ が独立でないことを示せ。

## 詳細解答

### 1. $Y$ の支持

$X>0$、$0<U<1$ なので

$$
Y=X+U>0.
$$

逆に任意の $y>0$ について、

- $0<y<1$ なら例えば $u=y/2$、$x=y/2$、
- $y\ge1$ なら例えば $u=1/2$、$x=y-1/2$

と選べば $x>0,0<u<1$ かつ $x+u=y$ となる。

従って

$$
\boxed{Y\text{ の支持は }(0,\infty)}.
$$

### 2. 畳み込みによる確率密度関数

各密度は

$$
f_X(x)=e^{-x}\boldsymbol{1}_{\{x>0\}},
$$

$$
f_U(u)=\boldsymbol{1}_{\{0<u<1\}}.
$$

独立な確率変数の和の密度は畳み込み

$$
f_Y(y)
=\int_{-\infty}^{\infty}
f_X(y-u)f_U(u)\,du
$$

で与えられる。

積分範囲は2つの条件

$$
0<u<1,
\qquad
y-u>0
$$

を同時に満たす必要がある。第2条件は $u<y$ なので

$$
0<u<\min(1,y).
$$

従って $y>0$ なら

$$
\begin{aligned}
f_Y(y)
&=\int_0^{\min(1,y)}e^{-(y-u)}\,du\\
&=e^{-y}\int_0^{\min(1,y)}e^u\,du.
\end{aligned}
$$

#### $0<y<1$ の場合

このとき上端は $y$ だから

$$
\begin{aligned}
f_Y(y)
&=e^{-y}\int_0^ye^u\,du\\
&=e^{-y}(e^y-1)\\
&=1-e^{-y}.
\end{aligned}
$$

#### $y\ge1$ の場合

このとき上端は1だから

$$
\begin{aligned}
f_Y(y)
&=e^{-y}\int_0^1e^u\,du\\
&=e^{-y}(e-1).
\end{aligned}
$$

従って

$$
\boxed{
f_Y(y)=
\begin{cases}
0,&y\le0,\\
1-e^{-y},&0<y<1,\\
(e-1)e^{-y},&y\ge1.
\end{cases}
}
$$

境界 $y=1$ では両側の式がともに $1-e^{-1}$ となり、連続につながる。

### 3. $\operatorname{Cov}(U,Y)$

$Y=X+U$ なので共分散の双線形性から

$$
\begin{aligned}
\operatorname{Cov}(U,Y)
&=\operatorname{Cov}(U,X+U)\\
&=\operatorname{Cov}(U,X)+\operatorname{Var}(U).
\end{aligned}
$$

$X,U$ は独立で二次モーメントが有限だから

$$
\operatorname{Cov}(U,X)=0.
$$

一様分布について

$$
E[U]=\int_0^1u\,du=\frac12,
$$

$$
E[U^2]=\int_0^1u^2\,du=\frac13.
$$

従って

$$
\operatorname{Var}(U)
=\frac13-\frac14
=\frac1{12}.
$$

よって

$$
\boxed{\operatorname{Cov}(U,Y)=\frac1{12}}.
$$

### 4. 独立でないこと

有限二次モーメントを持つ2変数が独立なら共分散は0である。実際、独立なら

$$
E[UY]=E[U]E[Y]
$$

だから

$$
\operatorname{Cov}(U,Y)
=E[UY]-E[U]E[Y]=0.
$$

しかし第3問で

$$
\operatorname{Cov}(U,Y)=\frac1{12}\ne0
$$

を得た。従って

$$
\boxed{U\text{ と }Y\text{ は独立でない}}.
$$

直観的にも、$Y=X+U$ には $U$ 自身が加わっているため、大きい $U$ が観測されれば $Y$ も大きくなりやすい。

## 本番答案

$X>0,0<U<1$ より $Y>0$。任意の $y>0$ は $x+u=y$ と表せるので支持は $(0,\infty)$。

畳み込みでは

$$
f_Y(y)=\int f_X(y-u)f_U(u)du.
$$

条件 $0<u<1$ と $u<y$ から積分範囲は $0<u<\min(1,y)$。従って

$$
f_Y(y)=
\begin{cases}
0,&y\le0,\\
1-e^{-y},&0<y<1,\\
(e-1)e^{-y},&y\ge1.
\end{cases}
$$

また

$$
\operatorname{Cov}(U,Y)
=\operatorname{Cov}(U,X)+\operatorname{Var}(U)
=0+\left(\frac13-\frac14\right)
=\frac1{12}.
$$

独立なら共分散は0になるはずなので、$U,Y$ は独立でない。

## 採点基準

- 支持を両方向から確認: 3点
- 畳み込みの積分範囲と場合分け: 8点
- 一様分布の分散を含む共分散計算: 5点
- 非独立性の論証: 4点
