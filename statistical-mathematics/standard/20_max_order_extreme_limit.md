# Standard 08 最大順序統計量・極値極限

- 旧No.: 20
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U_1,\ldots,U_n\overset{iid}\sim U(0,1)$ とし $M_n=\max_iU_i$ とする。

1. $M_n$ の累積分布関数を求めよ。
2. $n(1-M_n)$ の極限分布を求めよ。
3. $E[M_n]$ を求めよ。

## 詳細解答

### 1. $M_n$ の累積分布関数

$0\le m\le1$ では

$$
\begin{aligned}
P(M_n\le m)
&=P(U_1\le m,\ldots,U_n\le m)\\
&=\prod_{i=1}^nP(U_i\le m)\\
&=m^n,
\end{aligned}
$$

独立性を使った。したがって

$$
F_{M_n}(m)=
\begin{cases}
0,&m<0,\\
m^n,&0\le m\le1,\\
1,&m>1.
\end{cases}
$$

### 2. 極限分布

$x\ge0$ を固定する。十分大きい $n$ では $1-x/n\in[0,1]$ なので

$$
\begin{aligned}
P\{n(1-M_n)>x\}
&=P\left(M_n<1-\frac xn\right)\\
&=\left(1-\frac xn\right)^n\\
&\longrightarrow e^{-x}.
\end{aligned}
$$

右辺は率1の指数分布の生存関数だから

$$
\boxed{n(1-M_n)\Rightarrow\operatorname{Exp}(1)}.
$$

### 3. $E[M_n]$

累積分布関数を微分して、$0<m<1$ で

$$
f_{M_n}(m)=nm^{n-1}.
$$

したがってBeta分布の平均を暗記する必要はなく、定義から

$$
\begin{aligned}
E[M_n]
&=\int_0^1m\,nm^{n-1}dm\\
&=n\int_0^1m^n dm\\
&=\boxed{\frac{n}{n+1}}.
\end{aligned}
$$

## 本番答案

独立性より

$$
F_{M_n}(m)=P(U_1\le m,\ldots,U_n\le m)=m^n,\qquad0\le m\le1.
$$

よって固定 $x\ge0$ に対し

$$
P\{n(1-M_n)>x\}=\left(1-\frac xn\right)^n\to e^{-x},
$$

したがって $n(1-M_n)\Rightarrow Exp(1)$。また $f_{M_n}(m)=nm^{n-1}$ なので

$$
E[M_n]=n\int_0^1m^n dm=\frac{n}{n+1}.
$$

## 採点基準

- 最大値累積分布関数: 6点
- 極限計算: 8点
- 極限分布の同定: 3点
- 期待値: 3点
