# Standard 07 平均余命関数とハザード

- 安定ID: `RIKOU-STANDARD-07`
- 80大問 No.: 07
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 問題

非負寿命 $T$ の平均余命関数を

$$
m(t)=E[T-t\mid T>t]
$$

とする。

1. $m(t)=S(t)^{-1}\int_t^\infty S(u)\,du$ を示せ。
2. 微分して $m'(t)=h(t)m(t)-1$ を示せ。
3. $m(t)=c$ が一定ならハザードを求めよ。
4. そのときの寿命分布を求めよ。
5. $m(t)=a+bt$ のとき $h(t)$ を表せ。

## 詳細解答

### 1. 平均余命の尾積分表示

$T>t$ の条件下で残り寿命

$$
Y=T-t
$$

は非負確率変数である。非負確率変数 $Y$ について

$$
E[Y]=\int_0^\infty P(Y>x)\,dx
$$

という尾積分表示が使える。

これを条件付き分布に適用すると

$$
\begin{aligned}
m(t)
&=E[T-t\mid T>t]\\
&=\int_0^\infty
P(T-t>x\mid T>t)\,dx.
\end{aligned}
$$

$x\ge0$ では $T>t+x$ なら必ず $T>t$ なので

$$
P(T-t>x\mid T>t)
=\frac{P(T>t+x)}{P(T>t)}
=\frac{S(t+x)}{S(t)}.
$$

従って

$$
\begin{aligned}
m(t)
&=\frac1{S(t)}
\int_0^\infty S(t+x)\,dx.
\end{aligned}
$$

$u=t+x$ と変数を置けば $du=dx$、$x=0$ で $u=t$ なので

$$
\boxed{
m(t)=\frac1{S(t)}\int_t^\infty S(u)\,du
}.
$$

### 2. $m'(t)=h(t)m(t)-1$ の導出

分子を

$$
A(t)=\int_t^\infty S(u)\,du
$$

と置くと

$$
m(t)=\frac{A(t)}{S(t)}.
$$

微積分の基本定理から

$$
A'(t)=-S(t).
$$

またハザードの定義

$$
h(t)=\frac{f(t)}{S(t)}
$$

と $S'(t)=-f(t)$ から

$$
S'(t)=-h(t)S(t).
$$

商の微分を使うと

$$
\begin{aligned}
m'(t)
&=\frac{A'(t)S(t)-A(t)S'(t)}{S(t)^2}\\
&=\frac{-S(t)^2-A(t)\{-h(t)S(t)\}}{S(t)^2}\\
&=-1+h(t)\frac{A(t)}{S(t)}\\
&=-1+h(t)m(t).
\end{aligned}
$$

従って

$$
\boxed{m'(t)=h(t)m(t)-1}.
$$

### 3. 平均余命が一定の場合のハザード

$m(t)=c$ がすべての $t$ で一定なら

$$
m'(t)=0.
$$

第2問の関係式へ代入すると

$$
0=h(t)c-1.
$$

したがって

$$
\boxed{h(t)=\frac1c}.
$$

時間に依存しない一定ハザードである。

### 4. 寿命分布の同定

ハザードと生存関数には

$$
h(t)=-\frac{d}{dt}\log S(t)
$$

の関係がある。$h(t)=1/c$ だから

$$
-\frac{d}{dt}\log S(t)=\frac1c.
$$

0から $t$ まで積分し、寿命分布なので $S(0)=1$ を使うと

$$
\begin{aligned}
-\{\log S(t)-\log S(0)\}
&=\frac tc,\\
-\log S(t)&=\frac tc.
\end{aligned}
$$

従って

$$
\boxed{S(t)=e^{-t/c}}.
$$

これは率 $1/c$、平均 $c$ の指数分布の生存関数である。平均余命が年齢に依存しないことは指数分布の無記憶性と一致する。

### 5. $m(t)=a+bt$ の場合

第2問の式

$$
m'(t)=h(t)m(t)-1
$$

を $h(t)$ について解くと

$$
h(t)=\frac{m'(t)+1}{m(t)}.
$$

$m(t)=a+bt$ なら

$$
m'(t)=b.
$$

従って

$$
\boxed{
h(t)=\frac{1+b}{a+bt}
}.
$$

なお、実際に平均余命関数として成立するには $m(t)>0$ などの条件が必要であり、任意の $a,b$ が許されるわけではない。

## 本番答案

非負変数の尾積分表示より

$$
\begin{aligned}
m(t)
&=\int_0^\infty P(T>t+x\mid T>t)dx\\
&=\frac1{S(t)}\int_0^\infty S(t+x)dx\\
&=\frac1{S(t)}\int_t^\infty S(u)du.
\end{aligned}
$$

$A(t)=\int_t^\infty S(u)du$ とすると $A'=-S$。また $S'=-hS$ なので

$$
\begin{aligned}
m'
&=\frac{A'S-AS'}{S^2}\\
&=-1+h\frac AS\\
&=hm-1.
\end{aligned}
$$

$m=c$ なら $m'=0$ より $h=1/c$。したがって

$$
S(t)=\exp\left(-\int_0^t\frac1cdu\right)=e^{-t/c},
$$

すなわち平均 $c$ の指数分布。

$m=a+bt$ なら

$$
h(t)=\frac{m'(t)+1}{m(t)}=\frac{1+b}{a+bt}.
$$

## 採点基準

- 条件付き尾確率から尾積分表示を導出: 5点
- $A'=-S$, $S'=-hS$ を明示して商を微分: 6点
- 一定平均余命から一定ハザードを導く: 3点
- ハザードを積分して指数分布を同定: 4点
- 線形平均余命を微分してハザードへ代入: 2点

25分経過時は $m'=hm-1$ の導出を最優先する。
