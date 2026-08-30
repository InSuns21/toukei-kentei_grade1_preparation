# Advanced 03 特性関数による中心極限定理

- 旧No.: 24
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_1,X_2,\ldots$ は独立同分布で

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)
$$

とする。特性関数を用いて中心極限定理を導く。

$$
Y_i=\frac{X_i-\mu}{\sigma},
\qquad
S_n=\frac1{\sqrt n}\sum_{i=1}^nY_i
$$

と置く。また、$E[Y]=0$, $E[Y^2]=1$ を満たす確率変数 $Y$ の特性関数について

$$
\varphi_Y(u)=1-\frac{u^2}{2}+o(u^2)
\qquad (u\to0)
$$

を用いてよい。

1. $Y_i$ の平均と分散を求め、$S_n$ を $X_1,\ldots,X_n$ を用いて表せ。
2. 独立性を用いて、$S_n$ の特性関数が
   $$
   \varphi_{S_n}(t)
   =\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^n
   $$
   と書けることを示せ。
3. 固定した $t\in\mathbb R$ に対し、
   $$
   \varphi_Y\left(\frac{t}{\sqrt n}\right)
   =1-\frac{t^2}{2n}+o(n^{-1})
   $$
   を示し、さらに
   $$
   \varphi_{S_n}(t)\longrightarrow e^{-t^2/2}
   $$
   を示せ。$n$ 乗極限は対数を用いて正当化せよ。
4. $e^{-t^2/2}$ がどの分布の特性関数であるかを答え、Lévyの連続性定理を用いて
   $$
   \frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
   \xrightarrow{d}N(0,1)
   $$
   を結論せよ。

## 詳細解答

### 1. 標準化

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

だから

$$
E[Y_i]
=\frac{E[X_i]-\mu}{\sigma}
=0,
$$

また

$$
\operatorname{Var}(Y_i)
=\frac{\operatorname{Var}(X_i)}{\sigma^2}
=1.
$$

したがって

$$
E[Y_i]=0,
\qquad
E[Y_i^2]=1.
$$

さらに

$$
\begin{aligned}
S_n
&=\frac1{\sqrt n}\sum_{i=1}^n\frac{X_i-\mu}{\sigma}\\
&=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}.
\end{aligned}
$$

よって、$S_n\xrightarrow{d}N(0,1)$ を示せばよい。

### 2. 標準化和の特性関数

固定した $t\in\mathbb R$ に対し、

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E\left[e^{itS_n}\right]\\
&=E\left[\exp\left\{\frac{it}{\sqrt n}\sum_{j=1}^nY_j\right\}\right]\\
&=E\left[\prod_{j=1}^n e^{itY_j/\sqrt n}\right].
\end{aligned}
$$

$Y_1,\ldots,Y_n$ は独立なので、積の期待値は期待値の積に分解できる。

$$
\begin{aligned}
\varphi_{S_n}(t)
&=\prod_{j=1}^nE\left[e^{itY_j/\sqrt n}\right]\\
&=\prod_{j=1}^n\varphi_Y\left(\frac t{\sqrt n}\right)\\
&=\boxed{\left[\varphi_Y\left(\frac t{\sqrt n}\right)\right]^n}.
\end{aligned}
$$

ここで、同分布性により各因子が同じ特性関数 $\varphi_Y$ になっている。

### 3. 二次展開と $n$ 乗極限

仮定された展開を

$$
\varphi_Y(u)
=1-\frac{u^2}{2}+r(u),
\qquad
\frac{r(u)}{u^2}\to0
$$

と書く。

$u=t/\sqrt n$ を代入すると

$$
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}+r\left(\frac t{\sqrt n}\right).
$$

$t\neq0$ のとき

$$
\frac{r(t/\sqrt n)}{1/n}
=t^2
\frac{r(t/\sqrt n)}{t^2/n}
\longrightarrow0,
$$

したがって

$$
r\left(\frac t{\sqrt n}\right)=o(n^{-1}).
$$

$t=0$ では特性関数は常に1なので自明である。よって固定した $t$ に対して

$$
\boxed{
\varphi_Y\left(\frac t{\sqrt n}\right)
=1-\frac{t^2}{2n}+o(n^{-1})
}.
$$

ここで

$$
u_n=-\frac{t^2}{2n}+o(n^{-1})
$$

と置けば

$$
u_n\to0,
\qquad
n u_n\to-\frac{t^2}{2},
\qquad
u_n=O(n^{-1}).
$$

$u_n\to0$ より

$$
\log(1+u_n)
=u_n+O(u_n^2).
$$

したがって

$$
\begin{aligned}
n\log(1+u_n)
&=n u_n+O(nu_n^2)\\
&\longrightarrow-\frac{t^2}{2},
\end{aligned}
$$

なぜなら

$$
nu_n^2=O(n^{-1})\to0
$$

だからである。

従って

$$
\begin{aligned}
\varphi_{S_n}(t)
&=\left[1-\frac{t^2}{2n}+o(n^{-1})\right]^n\\
&\longrightarrow\boxed{e^{-t^2/2}}.
\end{aligned}
$$

### 4. Lévyの連続性定理による結論

標準正規分布 $Z\sim N(0,1)$ の特性関数は

$$
\varphi_Z(t)=e^{-t^2/2}.
$$

第3問より、すべての $t\in\mathbb R$ に対して

$$
\varphi_{S_n}(t)\to\varphi_Z(t).
$$

極限関数 $e^{-t^2/2}$ は $t=0$ で連続であるから、Lévyの連続性定理より

$$
S_n\xrightarrow{d}Z\sim N(0,1).
$$

第1問で

$$
S_n
=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
$$

であったから、

$$
\boxed{
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\xrightarrow{d}N(0,1)
}
$$

を得る。

## 本番答案

### (1)

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

と置けば

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=1,
$$

かつ

$$
S_n=\frac1{\sqrt n}\sum_{i=1}^nY_i
=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}.
$$

### (2)

独立性より

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E\left[\prod_{i=1}^ne^{itY_i/\sqrt n}\right]\\
&=\prod_{i=1}^nE[e^{itY_i/\sqrt n}]\\
&=\left[\varphi_Y(t/\sqrt n)\right]^n.
\end{aligned}
$$

### (3)

$r(u)=o(u^2)$ とすると

$$
\varphi_Y(t/\sqrt n)
=1-\frac{t^2}{2n}+o(n^{-1}).
$$

したがって

$$
u_n=-\frac{t^2}{2n}+o(n^{-1})
$$

と置けば

$$
n\log(1+u_n)
=nu_n+O(nu_n^2)
\to-\frac{t^2}{2}.
$$

ゆえに

$$
\varphi_{S_n}(t)	o e^{-t^2/2}.
$$

### (4)

$e^{-t^2/2}$ は $N(0,1)$ の特性関数であり、0で連続である。Lévyの連続性定理より

$$
S_n\xrightarrow{d}N(0,1).
$$

従って

$$
\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}
\xrightarrow{d}N(0,1).
$$

## 採点基準

- 小問1（標準化、平均・分散、$S_n$ の表示）: 4点
- 小問2（特性関数の積、独立性・同分布性）: 5点
- 小問3（二次展開、$o(n^{-1})$、$n$ 乗極限の正当化）: 8点
- 小問4（標準正規の特性関数、Lévyの連続性定理）: 3点
