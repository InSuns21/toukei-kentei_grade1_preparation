# Standard 08 最大順序統計量・極値極限

- 旧No.: 20
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
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

であり、累積分布関数は $0\le u\le1$ で $F_U(u)=u$ である。最大値・最小値を

$$
M_n=\max_{1\le i\le n}U_i,
\qquad
L_n=\min_{1\le i\le n}U_i
$$

とする。

1. $M_n$ の累積分布関数と確率密度関数を求めよ。
2. $E[M_n]$ と $\operatorname{Var}(M_n)$ を求め、$1-M_n$ の典型的な大きさが $1/n$ 程度であることを説明せよ。
3. 第2問を参考に、$1-M_n$ に対して非退化な極限分布を得るための正規化を選び、その極限分布を求めよ。
4. $0<q<1$ とする。$M_n$ の $q$ 分位点 $m_{n,q}$、すなわち $P(M_n\le m_{n,q})=q$ を満たす $m_{n,q}$ を求め、

$$
n(1-m_{n,q})
$$

の極限を求めよ。
5. $x,y\ge0$ に対して

$$
P\{nL_n>x,\ n(1-M_n)>y\}
$$

の極限を求め、$(nL_n,n(1-M_n))$ の同時極限分布を同定せよ。

## 詳細解答

### 1. $M_n$ の累積分布関数と密度

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

$0<m<1$ で微分すれば

$$
\boxed{f_{M_n}(m)=nm^{n-1},\qquad0<m<1}.
$$

ここで使っている一般則は、独立同分布標本の最大値 $M_n$ に対して

$$
P(M_n\le m)=F(m)^n
$$

である。

### 2. 平均・分散から端点までの距離のスケールを読む

第1問の密度から

$$
\begin{aligned}
E[M_n]
&=\int_0^1m\,nm^{n-1}\,dm\\
&=n\int_0^1m^n\,dm\\
&=\boxed{\frac{n}{n+1}}.
\end{aligned}
$$

同様に

$$
\begin{aligned}
E[M_n^2]
&=\int_0^1m^2\,nm^{n-1}\,dm\\
&=n\int_0^1m^{n+1}\,dm\\
&=\frac{n}{n+2}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M_n)
&=\frac{n}{n+2}-\left(\frac{n}{n+1}\right)^2\\
&=\boxed{\frac{n}{(n+1)^2(n+2)}}.
\end{aligned}
$$

特に

$$
E[1-M_n]=\frac1{n+1}\sim\frac1n,
$$

また

$$
\sqrt{\operatorname{Var}(M_n)}
=\sqrt{\frac{n}{(n+1)^2(n+2)}}
\sim\frac1n.
$$

したがって、最大値と上端1との差 $1-M_n$ は典型的に $1/n$ 程度である。よって非退化な極限を得るには、この差を $n$ 倍することが自然である。

### 3. 正規化を選んで極限分布を求める

第2問より $1-M_n$ は $1/n$ 程度なので

$$
Y_n=n(1-M_n)
$$

と置く。

$x\ge0$ に対して生存関数を求めると

$$
\begin{aligned}
P(Y_n>x)
&=P\{n(1-M_n)>x\}\\
&=P\left(M_n<1-\frac xn\right).
\end{aligned}
$$

固定した $x\ge0$ に対し、十分大きい $n$ では $1-x/n\in[0,1]$ なので、第1問より

$$
P(Y_n>x)
=\left(1-\frac xn\right)^n.
$$

基本極限

$$
\left(1-\frac xn\right)^n\longrightarrow e^{-x}
$$

を使えば

$$
P(Y_n>x)\longrightarrow e^{-x}.
$$

右辺は率1の指数分布の生存関数である。したがって

$$
\boxed{n(1-M_n)\Rightarrow\operatorname{Exp}(1)}.
$$

$x<0$ では $P(Y_n\le x)=0$ なので、極限分布の支持は $[0,\infty)$ である。

この問題で重要なのは、最初から $n(1-M_n)$ を暗記することではなく、第2問の有限標本での大きさから「端点までの距離は $1/n$ 程度だから $n$ 倍する」と正規化を選べることである。

### 4. 分位点の有限標本公式と極限

$q$ 分位点 $m_{n,q}$ は

$$
P(M_n\le m_{n,q})=q
$$

を満たす。第1問より

$$
m_{n,q}^n=q
$$

だから

$$
\boxed{m_{n,q}=q^{1/n}}.
$$

したがって

$$
\begin{aligned}
n(1-m_{n,q})
&=n\left(1-q^{1/n}\right)\\
&=n\left(1-\exp\left(\frac{\log q}{n}\right)\right).
\end{aligned}
$$

$t\to0$ で $e^t=1+t+o(t)$ だから

$$
1-\exp\left(\frac{\log q}{n}\right)
=-\frac{\log q}{n}+o\left(\frac1n\right).
$$

よって

$$
\boxed{n(1-m_{n,q})\longrightarrow-\log q}.
$$

これは第3問の極限分布とも整合する。実際、$Y\sim\operatorname{Exp}(1)$ なら

$$
P(Y\ge x)=e^{-x},
$$

なので $e^{-x}=q$ を解けば $x=-\log q$ となる。

### 5. 最小値と最大値の端点距離の同時極限

固定した $x,y\ge0$ を考える。十分大きい $n$ では $x/n<1-y/n$ である。

事象

$$
\{nL_n>x,\ n(1-M_n)>y\}
$$

は

$$
L_n>\frac xn,
\qquad
M_n<1-\frac yn
$$

と同値であり、これは全ての $U_i$ が区間

$$
\left(\frac xn,1-\frac yn\right)
$$

に入ることを意味する。

一つの $U_i$ がこの区間に入る確率は

$$
1-\frac{x+y}{n}
$$

なので、独立性より

$$
\begin{aligned}
P\{nL_n>x,\ n(1-M_n)>y\}
&=\left(1-\frac{x+y}{n}\right)^n\\
&\longrightarrow e^{-(x+y)}\\
&=e^{-x}e^{-y}.
\end{aligned}
$$

$e^{-x}$ と $e^{-y}$ はそれぞれ率1の指数分布の生存関数であり、その積になっている。したがって

$$
\boxed{
(nL_n,n(1-M_n))
\Rightarrow
(E_1,E_2)
}
$$

ただし

$$
E_1,E_2\overset{\mathrm{ind}}\sim\operatorname{Exp}(1).
$$

有限の $n$ では $L_n$ と $M_n$ は独立ではないが、端点から $1/n$ スケールで拡大して見ると、左端と右端の極値は極限では独立になる。

## 本番答案

$0\le m\le1$ で

$$
F_{M_n}(m)
=P(U_1\le m,\ldots,U_n\le m)
=m^n,
$$

したがって

$$
f_{M_n}(m)=nm^{n-1}.
$$

よって

$$
E[M_n]=n\int_0^1m^n\,dm=\frac{n}{n+1},
$$

$$
E[M_n^2]=n\int_0^1m^{n+1}\,dm=\frac{n}{n+2},
$$

したがって

$$
\operatorname{Var}(M_n)
=\frac{n}{(n+1)^2(n+2)}.
$$

従って $1-M_n$ は $1/n$ 程度なので $Y_n=n(1-M_n)$ とおく。固定 $x\ge0$ に対して

$$
P(Y_n>x)
=\left(1-\frac xn\right)^n
\to e^{-x},
$$

ゆえに

$$
n(1-M_n)\Rightarrow\operatorname{Exp}(1).
$$

また $q$ 分位点は

$$
m_{n,q}=q^{1/n}
$$

であり、

$$
n(1-m_{n,q})
=n\left(1-e^{(\log q)/n}\right)
\to-\log q.
$$

さらに固定 $x,y\ge0$ に対して

$$
\begin{aligned}
P\{nL_n>x,\ n(1-M_n)>y\}
&=\left(1-\frac{x+y}{n}\right)^n\\
&\to e^{-(x+y)}\\
&=e^{-x}e^{-y}.
\end{aligned}
$$

したがって

$$
(nL_n,n(1-M_n))
\Rightarrow(E_1,E_2),
\qquad
E_1,E_2\overset{\mathrm{ind}}\sim\operatorname{Exp}(1).
$$

## 採点基準

- 最大値の事象分解、累積分布関数・密度: 4点
- 平均・2次モーメント・分散と $1/n$ スケールの説明: 4点
- 正規化の選択と指数分布への極限: 5点
- 分位点の有限標本公式と漸近展開: 3点
- 最小値・最大値の同時極限と漸近独立性: 4点
