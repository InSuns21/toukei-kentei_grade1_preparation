# Core 46 棄却法・受理率・乱数生成

- 旧No.: 90
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

目標確率密度関数

$$
f(x)=4x(1-x^2),\qquad 0<x<1
$$

から乱数を生成したい。提案確率密度関数として

$$
g(x)=1,\qquad 0<x<1
$$

を用いる。

1. $f(x)\le Mg(x)$ を満たす最小の $M$ を求めよ。
2. 棄却法の受理条件を具体的に書け。
3. 1回の提案が受理される確率を求めよ。
4. 1個受理されるまでの提案回数の期待値を求めよ。
5. 受理された $X$ が確かに確率密度関数 $f$ を持つことを説明せよ。

## 詳細解答

### 0. 目標関数が確率密度関数であることの確認

まず

$$
f(x)=4x(1-x^2)=4(x-x^3)
$$

は $0<x<1$ で非負である。また

$$
\begin{aligned}
\int_0^1 f(x)\,dx
&=4\int_0^1(x-x^3)\,dx\\
&=4\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_0^1\\
&=4\left(\frac12-\frac14\right)\\
&=1.
\end{aligned}
$$

したがって、確かに確率密度関数になっている。

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

本問では $g(x)=1$ だから

$$
\frac{f(x)}{g(x)}=4x(1-x^2).
$$

ここは端点を見るだけでは決まらないので、微分して最大値を求める。

$$
\frac{d}{dx}\{4x(1-x^2)\}
=4(1-3x^2).
$$

したがって区間内の停留点は

$$
x=\frac1{\sqrt3}.
$$

また

$$
4x(1-x^2)\to0
$$

は $x\to0+,$ $x\to1-$ のいずれでも成り立つので、この停留点で最大値を取る。

よって

$$
\begin{aligned}
M
&=4\cdot\frac1{\sqrt3}
\left(1-\frac13\right)\\
&=\frac{8}{3\sqrt3}.
\end{aligned}
$$

従って

$$
\boxed{M=\frac{8}{3\sqrt3}}.
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
\begin{aligned}
\frac{f(X)}{Mg(X)}
&=\frac{4X(1-X^2)}{8/(3\sqrt3)}\\
&=\frac{3\sqrt3}{2}X(1-X^2).
\end{aligned}
$$

したがって受理条件は

$$
\boxed{
V\le\frac{3\sqrt3}{2}X(1-X^2)
}.
$$

なお $X=1/\sqrt3$ のとき右辺は1になる。これは第1問で $M$ を最小に選んだことと対応している。

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
&=\int_0^1 g(x)\frac{f(x)}{Mg(x)}\,dx\\
&=\frac1M\int_0^1f(x)\,dx\\
&=\frac1M.
\end{aligned}
$$

$f$ は確率密度関数なので積分は1である。第1問より

$$
M=\frac8{3\sqrt3}
$$

だから

$$
\boxed{
P(\text{accept})=\frac{3\sqrt3}{8}
}.
$$

数値では約 $0.650$ である。

受理条件を直接積分しても

$$
\begin{aligned}
P(\text{accept})
&=\int_0^1
\frac{3\sqrt3}{2}x(1-x^2)\,dx\\
&=\frac{3\sqrt3}{2}
\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_0^1\\
&=\frac{3\sqrt3}{8}
\end{aligned}
$$

と確認できる。

### 4. 受理までの提案回数

各提案が独立で、1回ごとの成功確率は

$$
q=\frac{3\sqrt3}{8}
$$

である。1個受理されるまでの提案回数 $N$ は、1から数える幾何分布に従う。

成功確率を $q$ とすると

$$
E[N]=\frac1q.
$$

したがって

$$
\boxed{
E[N]=\frac8{3\sqrt3}
}.
$$

棄却法では一般に、最小包絡定数 $M$ を使えば

$$
P(\text{accept})=\frac1M,
\qquad
E[N]=M
$$

となる。この関係も本問で確認できる。

### 5. 受理後の分布が $f$ になること

微小区間 $[x,x+dx]$ に提案される確率は

$$
g(x)\,dx.
$$

その提案が受理される条件付き確率は

$$
\frac{f(x)}{Mg(x)}.
$$

したがって

$$
\begin{aligned}
P(X\in dx,\text{accept})
&=g(x)\,dx\frac{f(x)}{Mg(x)}\\
&=\frac{f(x)}M\,dx.
\end{aligned}
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
&=\frac{f(x)\,dx/M}{1/M}\\
&=f(x)\,dx.
\end{aligned}
$$

よって受理後の確率密度関数は確かに

$$
\boxed{f(x)}
$$

となる。

## 本番答案

$g(x)=1$ より

$$
M=\sup_{0<x<1}4x(1-x^2).
$$

$$
\frac{d}{dx}\{4x(1-x^2)\}=4(1-3x^2)
$$

だから最大点は $x=1/\sqrt3$ であり

$$
\boxed{M=\frac8{3\sqrt3}}.
$$

$X,V$ を独立な $U(0,1)$ とし

$$
V\le\frac{f(X)}{Mg(X)}
=\frac{3\sqrt3}{2}X(1-X^2)
$$

なら $X$ を受理する。

受理率は

$$
P(\text{accept})
=\int_0^1g(x)\frac{f(x)}{Mg(x)}\,dx
=\frac1M
=\boxed{\frac{3\sqrt3}{8}}.
$$

したがって受理までの提案回数 $N$ は成功確率 $3\sqrt3/8$ の幾何分布で

$$
\boxed{E[N]=\frac8{3\sqrt3}}.
$$

さらに

$$
P(X\in dx,\text{accept})
=\frac{f(x)}M\,dx
$$

を $P(\text{accept})=1/M$ で割れば

$$
P(X\in dx\mid\text{accept})=f(x)\,dx.
$$

## 採点基準

- $M$ を比 $f/g$ の最大値として置き、微分で最大点を求める: 4点
- 具体的な受理条件: 4点
- 受理率 $1/M$ の積分による導出: 4点
- 提案回数の期待値: 3点
- 条件付き確率から受理後密度を示す: 5点
