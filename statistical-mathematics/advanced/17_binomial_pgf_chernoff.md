# Advanced 01 二項モーメント母関数・Chernoff型評価

- 旧No.: 17
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X$ の確率質量関数を

$$
P(X=k)=\binom nkp^k(1-p)^{n-k},
\qquad k=0,1,\ldots,n,
$$

とする。すなわち $X$ は二項分布に従う。$p<a<1$ とする。

1. モーメント母関数 $E[e^{tX}]$ を、上の確率質量関数と期待値の定義から求めよ。
2. Markovの不等式を用いて $P(X\ge na)$ の上界を $t>0$ で表せ。
3. 上界を最小にする $t^*$ を求めよ。
4. 上界を Bernoulli 分布の Kullback–Leibler ダイバージェンス

$$
D(a\Vert p)=a\log\frac ap+(1-a)\log\frac{1-a}{1-p}
$$

で表せ。

## 詳細解答

### 1. モーメント母関数を定義から計算する

モーメント母関数の定義は

$$
M_X(t)=E[e^{tX}].
$$

$X$ は $0,1,\ldots,n$ の値を取るので、離散型確率変数の期待値の定義から

$$
E[e^{tX}]
=\sum_{k=0}^ne^{tk}P(X=k).
$$

問題文で与えられた確率質量関数を代入すると

$$
\begin{aligned}
M_X(t)
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

$e^{tX}\ge0$ に Markov の不等式を使うと

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

を最小化すればよい。

第1項の微分は $-a$。第2項は合成関数なので

$$
\frac{d}{dt}\log(1-p+pe^t)
=\frac{1}{1-p+pe^t}\cdot pe^t.
$$

したがって

$$
\psi'(t)
=-a+\frac{pe^t}{1-p+pe^t}.
$$

$\psi'(t)=0$ より

$$
a(1-p+pe^t)=pe^t.
$$

左辺を展開すると

$$
a(1-p)+ape^t=pe^t,
$$

よって

$$
a(1-p)=p(1-a)e^t.
$$

したがって

$$
\boxed{e^{t^*}=\frac{a(1-p)}{p(1-a)}},
\qquad
\boxed{t^*=\log\frac{a(1-p)}{p(1-a)}}.
$$

$a>p$ なので

$$
a(1-p)>p(1-a),
$$

したがって $e^{t^*}>1$ で、確かに $t^*>0$ である。

最小点であることも確認する。もう1回微分すると

$$
\begin{aligned}
\psi''(t)
&=\frac{pe^t(1-p+pe^t)-pe^t\cdot pe^t}
{(1-p+pe^t)^2}\\
&=\frac{p(1-p)e^t}{(1-p+pe^t)^2}>0.
\end{aligned}
$$

よって $t^*$ は最小点である。

### 4. Kullback–Leibler ダイバージェンスへの整理

$t=t^*$ のとき

$$
pe^{t^*}
=p\frac{a(1-p)}{p(1-a)}
=\frac{a(1-p)}{1-a}.
$$

したがって

$$
\begin{aligned}
1-p+pe^{t^*}
&=1-p+\frac{a(1-p)}{1-a}\\
&=(1-p)\left(1+\frac{a}{1-a}\right)\\
&=(1-p)\frac{1}{1-a}\\
&=\frac{1-p}{1-a}.
\end{aligned}
$$

これを

$$
\psi(t^*)=-at^*+\log(1-p+pe^{t^*})
$$

へ代入すると

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
&=-\left[
a\log\frac ap
+(1-a)\log\frac{1-a}{1-p}
\right]\\
&=-D(a\Vert p).
\end{aligned}
$$

よって

$$
\boxed{P(X\ge na)\le\exp\{-nD(a\Vert p)\}}.
$$

## 本番答案

期待値の定義と問題文の確率質量関数から

$$
\begin{aligned}
M_X(t)
&=\sum_{k=0}^ne^{tk}\binom nkp^k(1-p)^{n-k}\\
&=\sum_{k=0}^n\binom nk(pe^t)^k(1-p)^{n-k}\\
&=(1-p+pe^t)^n.
\end{aligned}
$$

$t>0$ で Markov の不等式より

$$
P(X\ge na)
\le[e^{-at}(1-p+pe^t)]^n.
$$

$\psi(t)=-at+\log(1-p+pe^t)$ と置くと

$$
\psi'(t)
=-a+\frac{pe^t}{1-p+pe^t}.
$$

したがって

$$
\psi'(t^*)=0
\iff
e^{t^*}=\frac{a(1-p)}{p(1-a)}.
$$

$a>p$ より $t^*>0$、また $\psi''(t)>0$。さらに

$$
1-p+pe^{t^*}=\frac{1-p}{1-a}
$$

を代入すると $\psi(t^*)=-D(a\Vert p)$。従って

$$
P(X\ge na)\le e^{-nD(a\Vert p)}.
$$

## 採点基準

- モーメント母関数（期待値の定義・確率質量関数の代入・二項定理）: 4点
- Markov 上界: 5点
- 最適化（微分・停留条件・最小性）: 6点
- Kullback–Leibler 表現への代入整理: 5点
