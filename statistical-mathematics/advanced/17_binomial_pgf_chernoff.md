# Advanced 01 二項モーメント母関数・Chernoff型評価

- 旧No.: 17
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X\sim\operatorname{Binomial}(n,p)$ とし、$p<a<1$ とする。

1. モーメント母関数 $E[e^{tX}]$ を求めよ。
2. Markovの不等式を用いて $P(X\ge na)$ の上界を $t>0$ で表せ。
3. 上界を最小にする $t^*$ を求めよ。
4. 上界をBernoulliのKL divergence

$$
D(a\Vert p)=a\log\frac ap+(1-a)\log\frac{1-a}{1-p}
$$

で表せ。

## 詳細解答

### 1. モーメント母関数を定義から計算する

二項分布の確率質量関数を使うと

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\sum_{k=0}^ne^{tk}\binom nkp^k(1-p)^{n-k}\\
&=\sum_{k=0}^n\binom nk(pe^t)^k(1-p)^{n-k}.
\end{aligned}
$$

ここで二項定理

$$
\sum_{k=0}^n\binom nkA^kB^{n-k}=(A+B)^n
$$

を $A=pe^t$, $B=1-p$ に適用して

$$
\boxed{M_X(t)=(1-p+pe^t)^n}.
$$

この小問ではこの和からの導出が採点対象であり、モーメント母関数を暗記公式として置かない。

### 2. Markovの不等式

$t>0$ なら $x\mapsto e^{tx}$ は単調増加なので

$$
\{X\ge na\}=\{e^{tX}\ge e^{tna}\}.
$$

$e^{tX}\ge0$ にMarkovの不等式を使うと

$$
\begin{aligned}
P(X\ge na)
&=P(e^{tX}\ge e^{tna})\\
&\le\frac{E[e^{tX}]}{e^{tna}}\\
&=e^{-tna}(1-p+pe^t)^n.
\end{aligned}
$$

したがって

$$
P(X\ge na)
\le\left[e^{-at}(1-p+pe^t)\right]^n.
$$

### 3. $t$ に関する最小化

$n$ 乗と指数関数は単調なので、1標本当たりの対数上界

$$
\psi(t)=-at+\log(1-p+pe^t)
$$

を最小化すればよい。微分すると

$$
\psi'(t)=-a+\frac{pe^t}{1-p+pe^t}.
$$

$\psi'(t)=0$ より

$$
a(1-p+pe^t)=pe^t,
$$

したがって

$$
a(1-p)=p(1-a)e^t.
$$

よって

$$
\boxed{e^{t^*}=\frac{a(1-p)}{p(1-a)}},
\qquad
\boxed{t^*=\log\frac{a(1-p)}{p(1-a)}}.
$$

$a>p$ なので比は1より大きく、確かに $t^*>0$。また

$$
\psi''(t)
=\frac{p(1-p)e^t}{(1-p+pe^t)^2}>0
$$

だからこれは最小点である。

### 4. KL divergenceへの整理

$t=t^*$ のとき

$$
1-p+pe^{t^*}
=1-p+\frac{a(1-p)}{1-a}
=\frac{1-p}{1-a}.
$$

したがって

$$
\begin{aligned}
\psi(t^*)
&=-a\log\frac{a(1-p)}{p(1-a)}
+\log\frac{1-p}{1-a}\\
&=-a\log\frac ap
-a\log\frac{1-p}{1-a}
+\log\frac{1-p}{1-a}\\
&=-a\log\frac ap
+(1-a)\log\frac{1-p}{1-a}\\
&=-D(a\Vert p).
\end{aligned}
$$

よって

$$
\boxed{P(X\ge na)\le\exp\{-nD(a\Vert p)\}}.
$$

## 本番答案

まず定義から

$$
\begin{aligned}
M_X(t)
&=\sum_{k=0}^ne^{tk}\binom nkp^k(1-p)^{n-k}\\
&=\sum_{k=0}^n\binom nk(pe^t)^k(1-p)^{n-k}\\
&=(1-p+pe^t)^n.
\end{aligned}
$$

$t>0$ でMarkovより

$$
P(X\ge na)\le[e^{-at}(1-p+pe^t)]^n.
$$

$\psi(t)=-at+\log(1-p+pe^t)$ と置くと

$$
\psi'(t)=0
\iff e^{t^*}=\frac{a(1-p)}{p(1-a)}.
$$

$a>p$ より $t^*>0$、また $\psi''(t)>0$。さらに

$$
1-p+pe^{t^*}=\frac{1-p}{1-a}
$$

を代入して $\psi(t^*)=-D(a\Vert p)$。従って

$$
P(X\ge na)\le e^{-nD(a\Vert p)}.
$$

## 採点基準

- モーメント母関数（定義の和から二項定理まで）: 4点
- Markov上界: 5点
- 最適化（停留条件と最小性）: 6点
- KL表現への代入整理: 5点
