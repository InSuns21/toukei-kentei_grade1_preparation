# Advanced 16 非斉次Poisson過程

- 安定ID: `RIKOU-ADVANCED-16`
- 80大問 No.: 16
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分
- 電卓: 指数関数の数値化不要

## 問題

強度関数

$$
\lambda(t)=2t,\qquad t\ge0
$$

の非斉次Poisson過程を考える。

1. 累積強度 $\Lambda(t)$ を求めよ。
2. $N(t)$ の分布を求めよ。
3. 第1到着時刻 $T_1$ の生存関数と確率密度関数を求めよ。
4. $P\{N(2)-N(1)=k\}$ を表せ。
5. $N(T)=n$ の条件下で、$[0,T]$ 内から1つ選んだ到着時刻の条件付き確率密度関数が $\lambda(t)/\Lambda(T)$ となることを述べ、本問で求めよ。

## 詳細解答

### 1. 累積強度

非斉次Poisson過程では、時刻0から $t$ までの期待到着件数を表す累積強度を

$$
\Lambda(t)=\int_0^t\lambda(u)\,du
$$

と定義する。

本問では $\lambda(u)=2u$ なので

$$
\begin{aligned}
\Lambda(t)
&=\int_0^t2u\,du\\
&=\left[u^2\right]_0^t\\
&=\boxed{t^2}.
\end{aligned}
$$

### 2. $N(t)$ の分布

非斉次Poisson過程では、任意の $0\le s<t$ に対して増分

$$
N(t)-N(s)
$$

は平均

$$
\Lambda(t)-\Lambda(s)
$$

のPoisson分布に従う。

特に $s=0$、$N(0)=0$ とすれば

$$
N(t)\sim\operatorname{Poisson}(\Lambda(t)).
$$

第1問より $\Lambda(t)=t^2$ だから

$$
\boxed{N(t)\sim\operatorname{Poisson}(t^2)}.
$$

したがって

$$
P\{N(t)=k\}
=e^{-t^2}\frac{t^{2k}}{k!},
\qquad k=0,1,2,\ldots
$$

である。

### 3. 第1到着時刻

$T_1>t$ であることは、時刻 $t$ までに一度も到着していないことと同値である。

$$
\{T_1>t\}=\{N(t)=0\}.
$$

従って

$$
\begin{aligned}
P(T_1>t)
&=P\{N(t)=0\}\\
&=e^{-\Lambda(t)}\\
&=\boxed{e^{-t^2}}.
\end{aligned}
$$

これが $T_1$ の生存関数である。

累積分布関数は

$$
F_{T_1}(t)=1-e^{-t^2},
\qquad t\ge0.
$$

よって微分して

$$
\begin{aligned}
f_{T_1}(t)
&=\frac{d}{dt}F_{T_1}(t)\\
&=-\frac{d}{dt}e^{-t^2}\\
&=\boxed{2te^{-t^2}},
\qquad t>0.
\end{aligned}
$$

一般には

$$
f_{T_1}(t)=\lambda(t)e^{-\Lambda(t)}
$$

となる。

### 4. 区間 $(1,2]$ の到着件数

独立増分性より

$$
N(2)-N(1)
\sim\operatorname{Poisson}\{\Lambda(2)-\Lambda(1)\}.
$$

累積強度は

$$
\Lambda(2)=4,
\qquad
\Lambda(1)=1
$$

だから

$$
\Lambda(2)-\Lambda(1)=3.
$$

従って

$$
\boxed{
P\{N(2)-N(1)=k\}
=e^{-3}\frac{3^k}{k!}
},
\qquad k=0,1,2,\ldots
$$

である。

### 5. 総数を条件とした到着時刻の分布

$N(T)=n$ と分かった後では、$[0,T]$ にある $n$ 個の到着点は、強度の大きい時刻ほど多く現れる。

微小区間 $[t,t+dt]$ に1個の到着が入る確率は1次の項で

$$
\lambda(t)dt
$$

に比例する。$[0,T]$ 全体で正規化すると、1つ選んだ到着時刻の条件付き確率密度関数は

$$
\boxed{
g(t)=\frac{\lambda(t)}{\Lambda(T)},
\qquad0<t<T
}.
$$

実際、

$$
\int_0^Tg(t)\,dt
=\frac1{\Lambda(T)}\int_0^T\lambda(t)\,dt
=1
$$

となる。

本問では

$$
\lambda(t)=2t,
\qquad
\Lambda(T)=T^2
$$

だから

$$
\boxed{
g(t)=\frac{2t}{T^2},
\qquad0<t<T}.
$$

より厳密には、$N(T)=n$ を条件とした $n$ 個の**順序を付ける前の**到着時刻は、この確率密度関数 $g$ に従う独立同分布標本と同じ分布を持ち、実際の到着順 $T_1<\cdots<T_n$ はその順序統計量になる。

## 本番答案

累積強度は

$$
\Lambda(t)=\int_0^t2u\,du=t^2.
$$

非斉次Poisson過程の増分分布より

$$
N(t)\sim\operatorname{Poisson}(t^2).
$$

また

$$
P(T_1>t)=P\{N(t)=0\}=e^{-t^2},
$$

したがって

$$
f_{T_1}(t)=2te^{-t^2}.
$$

$(1,2]$ の累積強度は

$$
\Lambda(2)-\Lambda(1)=4-1=3
$$

なので

$$
P\{N(2)-N(1)=k\}=e^{-3}\frac{3^k}{k!}.
$$

$N(T)=n$ の条件下で、1つ選んだ到着時刻の確率密度関数は

$$
g(t)=\frac{\lambda(t)}{\Lambda(T)}
=\frac{2t}{T^2},
\qquad0<t<T.
$$

## 採点基準

- 累積強度を積分から導出: 4点
- 増分分布から $N(t)$ を同定: 4点
- $T_1>t\iff N(t)=0$ から生存関数・密度を導出: 5点
- 区間増分の平均とPoisson確率: 3点
- 総数条件付き到着時刻の正規化密度: 4点

25分経過時は、全てを $\Lambda(t)$ に帰着させる。
