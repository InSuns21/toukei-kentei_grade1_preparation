# Core 46 棄却法・受理率・乱数生成

- 旧No.: 90
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

目標確率密度関数

$$
f(x)=2x,\qquad0<x<1
$$

から乱数を生成したい。提案確率密度関数として

$$
g(x)=1,\qquad0<x<1
$$

を用いる。

1. $f(x)\le Mg(x)$ を満たす最小の $M$ を求めよ。
2. 棄却法の受理条件を具体的に書け。
3. 1回の提案が受理される確率を求めよ。
4. 1個受理されるまでの提案回数の期待値を求めよ。
5. 受理された $X$ が確かに確率密度関数 $f$ を持つことを説明せよ。

## 詳細解答

### 1. 包絡定数 $M$

棄却法では、提案分布の確率密度関数 $g$ に定数 $M$ を掛けた $Mg$ が目標確率密度関数 $f$ を全域で上から覆うようにする。

つまり

$$
f(x)\le Mg(x)
$$

が必要であり、$g(x)>0$ の範囲では

$$
M\ge\frac{f(x)}{g(x)}.
$$

従って最小の $M$ は

$$
M=\sup_{0<x<1}\frac{f(x)}{g(x)}.
$$

本問では

$$
\frac{f(x)}{g(x)}=2x
$$

だから上限は2であり

$$
\boxed{M=2}.
$$

### 2. 受理条件

まず提案分布 $g$ から

$$
X\sim U(0,1)
$$

を生成する。さらに独立に

$$
V\sim U(0,1)
$$

を生成する。

一般の棄却法では

$$
V\le\frac{f(X)}{Mg(X)}
$$

なら提案 $X$ を受理する。

本問では

$$
\frac{f(X)}{Mg(X)}
=\frac{2X}{2\cdot1}=X
$$

だから

$$
\boxed{V\le X}
$$

なら受理する。

### 3. 受理確率

$X=x$ を固定したとき

$$
P(\text{accept}\mid X=x)
=\frac{f(x)}{Mg(x)}.
$$

提案分布 $g$ について平均すると

$$
\begin{aligned}
P(\text{accept})
&=\int g(x)\frac{f(x)}{Mg(x)}dx\\
&=\frac1M\int f(x)dx\\
&=\frac1M.
\end{aligned}
$$

$f$ は確率密度関数なので積分は1である。本問では $M=2$ より

$$
\boxed{P(\text{accept})=\frac12}.
$$

同じことは幾何的にも

$$
P(V\le X)=\int_0^1P(V\le x\mid X=x)dx
=\int_0^1x\,dx=\frac12
$$

と確認できる。

### 4. 受理までの提案回数

各提案が独立で、1回ごとの成功確率は $1/2$ である。1個受理されるまでの提案回数 $N$ は、1から数える幾何分布に従う。

成功確率を $q$ とすると

$$
E[N]=\frac1q.
$$

ここでは $q=1/2$ だから

$$
\boxed{E[N]=2}.
$$

### 5. 受理後の分布が $f$ になること

微小区間 $[x,x+dx]$ に提案される確率は

$$
g(x)dx.
$$

その提案が受理される条件付き確率は

$$
\frac{f(x)}{Mg(x)}.
$$

したがって

$$
P(X\in dx,\text{accept})
=g(x)dx\frac{f(x)}{Mg(x)}
=\frac{f(x)}Mdx.
$$

一方、第3問より

$$
P(\text{accept})=\frac1M.
$$

従って受理されたという条件の下では

$$
\begin{aligned}
P(X\in dx\mid\text{accept})
&=\frac{P(X\in dx,\text{accept})}{P(\text{accept})}\\
&=\frac{f(x)dx/M}{1/M}\\
&=f(x)dx.
\end{aligned}
$$

よって受理後の確率密度関数は確かに

$$
\boxed{f(x)}
$$

となる。

## 本番答案

$$
M=\sup_{0<x<1}\frac{f(x)}{g(x)}
=\sup_{0<x<1}2x=2.
$$

$X,V$ を独立な $U(0,1)$ とし

$$
V\le\frac{f(X)}{Mg(X)}=X
$$

なら $X$ を受理する。

受理率は

$$
P(\text{accept})
=\int g(x)\frac{f(x)}{Mg(x)}dx
=\frac1M
=\frac12.
$$

したがって受理までの提案回数は成功確率 $1/2$ の幾何分布で

$$
E[N]=2.
$$

さらに

$$
P(X\in dx,\text{accept})
=\frac{f(x)}Mdx
$$

を $P(\text{accept})=1/M$ で割れば

$$
P(X\in dx\mid\text{accept})=f(x)dx.
$$

## 採点基準

- $M$ の上限としての導出: 4点
- 具体的な受理条件: 4点
- 受理率 $1/M$ の積分による導出: 4点
- 提案回数の期待値: 3点
- 条件付き確率から受理後密度を示す: 5点
