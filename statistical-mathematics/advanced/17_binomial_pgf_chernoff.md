# Advanced 01 二項モーメント母関数・Chernoff型評価

- 旧No.: 17
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## この問題の前提と到達点

- **既知としてよい**：期待値の定義、二項定理、Markovの不等式、1変数関数の微分
- **この問題で導出する**：二項分布のモーメント母関数、指数関数を使った確率上界、その最適化
- **この問題で初めて名前を付ける概念**：得られる指数型上界をChernoff型評価と呼ぶこと、最適化後の指数がBernoulli分布のKullback--Leiblerダイバージェンスになること
- **1級での扱い**：Chernoff型上界や Kullback--Leibler ダイバージェンスの公式を暗記していることを前提にしない。問題文で定義された量まで自力で導くことを主眼とする

つまり本問は「Chernoff公式を使う問題」ではなく、**Markovの不等式からChernoff型上界を作る問題**である。

## 問題

$X$ の確率質量関数を

$$
P(X=k)=\binom nkp^k(1-p)^{n-k},
\qquad k=0,1,\ldots,n,
$$

とする。すなわち $X$ は二項分布に従う。$p<a<1$ とする。

1. モーメント母関数 $E[e^{tX}]$ を、上の確率質量関数と期待値の定義から求めよ。
2. $t>0$ とし、Markovの不等式を $e^{tX}$ に適用して $P(X\ge na)$ の上界を求めよ。
3. 得られた上界を $t$ について最小化し、最適な $t^*$ を求めよ。
4. Bernoulli分布のKullback--Leiblerダイバージェンスを
   $$
   D(a\Vert p)
   =a\log\frac ap+(1-a)\log\frac{1-a}{1-p}
   $$
   と定義する。最適化後の上界を $D(a\Vert p)$ を用いて表せ。

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

二項定理

$$
\sum_{k=0}^n\binom nkA^kB^{n-k}=(A+B)^n
$$

を $A=pe^t$, $B=1-p$ に適用して

$$
\boxed{M_X(t)=(1-p+pe^t)^n}.
$$

この小問ではこの和からの導出が採点対象であり、モーメント母関数を暗記公式として置かない。

### 2. Markovの不等式から指数型上界を作る

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
\boxed{
P(X\ge na)
\le\left[e^{-at}(1-p+pe^t)\right]^n
\qquad(t>0)
}.
$$

ここで重要なのは、**任意の $t>0$ について上界が得られたので、あとから最も良い $t$ を選べる**ことである。この「指数関数を掛けてMarkovの不等式を使い、補助母数を最適化する」考え方がChernoff型評価の核になる。

### 3. $t$ に関する最小化

$n$ 乗と指数関数は単調なので、1標本当たりの対数上界

$$
\psi(t)=-at+\log(1-p+pe^t)
$$

を最小化すればよい。

微分すると

$$
\psi'(t)
=-a+\frac{pe^t}{1-p+pe^t}.
$$

$\psi'(t)=0$ より

$$
a(1-p+pe^t)=pe^t.
$$

整理して

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

従って $e^{t^*}>1$、すなわち $t^*>0$ である。

最小点であることも確認する。

$$
\begin{aligned}
\psi''(t)
&=\frac{p(1-p)e^t}{(1-p+pe^t)^2}>0.
\end{aligned}
$$

従って $t^*$ は一意な最小点である。

### 4. Kullback--Leiblerダイバージェンスへの整理

$t=t^*$ のとき

$$
pe^{t^*}
=\frac{a(1-p)}{1-a},
$$

従って

$$
\begin{aligned}
1-p+pe^{t^*}
&=1-p+\frac{a(1-p)}{1-a}\\
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
+(1-a)\log\frac{1-p}{1-a}\\
&=-\left[
a\log\frac ap
+(1-a)\log\frac{1-a}{1-p}
\right]\\
&=-D(a\Vert p).
\end{aligned}
$$

従って

$$
\boxed{
P(X\ge na)
\le\exp\{-nD(a\Vert p)\}
}.
$$

この形まで導いて初めて、得られた上界を**Chernoff型上界**と呼べる。ここでKullback--Leiblerダイバージェンスは外から突然持ち込んだ公式ではなく、指数型上界を最適化した結果として自然に現れている。

## 本番答案

期待値の定義と二項定理から

$$
\begin{aligned}
M_X(t)
&=\sum_{k=0}^ne^{tk}\binom nkp^k(1-p)^{n-k}\\
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

従って

$$
e^{t^*}=\frac{a(1-p)}{p(1-a)}.
$$

$a>p$ より $t^*>0$、かつ $\psi''(t)>0$。また

$$
1-p+pe^{t^*}=\frac{1-p}{1-a}
$$

なので

$$
\psi(t^*)=-D(a\Vert p).
$$

よって

$$
\boxed{P(X\ge na)\le e^{-nD(a\Vert p)}}.
$$

## 採点基準

- モーメント母関数を期待値の定義から導出: 4点
- Markovの不等式から指数型上界を構成: 5点
- 補助母数 $t$ の最適化: 6点
- Kullback--Leibler表現への代入整理とChernoff型上界の完成: 5点
