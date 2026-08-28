# Standard 08 最大順序統計量・極値極限

- 旧No.: 20
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U_1,\ldots,U_n$ は独立同分布で一様分布 $U(0,1)$ に従う。すなわち

$$
f_U(u)=
\begin{cases}
1,&0<u<1,\\
0,&\text{otherwise}
\end{cases}
$$

であり、累積分布関数は $0\le u\le1$ で $F_U(u)=u$ である。最大順序統計量を

$$
M_n=\max_{1\le i\le n}U_i
$$

とする。

1. $M_n$ の累積分布関数を求めよ。
2. $n(1-M_n)$ の極限分布を求めよ。
3. $E[M_n]$ を求めよ。

## 詳細解答

### 1. $M_n$ の累積分布関数

$0\le m\le1$ では

$$
\{M_n\le m\}
=\{U_1\le m,\ldots,U_n\le m\}.
$$

独立性より

$$
\begin{aligned}
P(M_n\le m)
&=\prod_{i=1}^nP(U_i\le m)\\
&=\{F_U(m)\}^n\\
&=m^n.
\end{aligned}
$$

したがって

$$
\boxed{
F_{M_n}(m)=
\begin{cases}
0,&m<0,\\
m^n,&0\le m\le1,\\
1,&m>1.
\end{cases}}
$$

ここで使っている一般則は、独立同分布標本の最大値 $M_n$ に対して

$$
P(M_n\le m)=F(m)^n
$$

である。

### 2. 極限分布

$$
Y_n=n(1-M_n)
$$

と置く。$Y_n\ge0$ なので、$x\ge0$ に対して生存関数を求める。

$$
\begin{aligned}
P(Y_n>x)
&=P\{n(1-M_n)>x\}\\
&=P\left(M_n<1-\frac xn\right).
\end{aligned}
$$

固定した $x\ge0$ に対し、十分大きい $n$ では $1-x/n\in[0,1]$ なので第1問の結果を使えて

$$
P(Y_n>x)
=\left(1-\frac xn\right)^n.
$$

基本極限

$$
\left(1-\frac xn\right)^n\longrightarrow e^{-x}
$$

より

$$
P(Y_n>x)\longrightarrow e^{-x}.
$$

右辺は率1の指数分布の生存関数であるから

$$
\boxed{n(1-M_n)\Rightarrow\operatorname{Exp}(1)}.
$$

なお $x<0$ では $P(Y_n\le x)=0$ なので、極限分布の支持も $[0,\infty)$ である。

### 3. $E[M_n]$

$0<m<1$ で累積分布関数を微分すると

$$
f_{M_n}(m)=\frac{d}{dm}m^n=nm^{n-1}.
$$

したがって定義から

$$
\begin{aligned}
E[M_n]
&=\int_0^1m f_{M_n}(m)\,dm\\
&=n\int_0^1m^n\,dm\\
&=n\left[\frac{m^{n+1}}{n+1}\right]_0^1\\
&=\boxed{\frac{n}{n+1}}.
\end{aligned}
$$

Beta分布の平均公式を暗記して使う必要はなく、最大値の累積分布関数から直接導ける。

また

$$
1-E[M_n]=\frac1{n+1}
$$

なので、最大値が上端1へ近づく典型的なずれの大きさが $1/n$ 程度であることも、第2問の正規化 $n(1-M_n)$ と整合する。

## 本番答案

独立性より

$$
F_{M_n}(m)
=P(U_1\le m,\ldots,U_n\le m)
=m^n,
\qquad0\le m\le1.
$$

よって固定 $x\ge0$ に対し

$$
P\{n(1-M_n)>x\}
=\left(1-\frac xn\right)^n
\to e^{-x},
$$

したがって

$$
n(1-M_n)\Rightarrow\operatorname{Exp}(1).
$$

また

$$
f_{M_n}(m)=nm^{n-1}
$$

なので

$$
E[M_n]
=n\int_0^1m^n dm
=\frac{n}{n+1}.
$$

## 採点基準

- 最大値の事象分解と累積分布関数: 6点
- 生存関数を用いた極限計算: 7点
- 極限分布の同定: 3点
- 密度から期待値を導出: 4点
