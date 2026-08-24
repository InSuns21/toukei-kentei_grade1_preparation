# Advanced 01 二項PGF・Chernoff型評価

- 旧No.: 17
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X\sim\operatorname{Binomial}(n,p)$ とし、$p<a<1$ とする。

1. MGF $E[e^{tX}]$ を求めよ。
2. Markovの不等式を用いて $P(X\ge na)$ の上界を $t>0$ で表せ。
3. 上界を最小にする $t^*$ を求めよ。
4. 上界をBernoulliのKL divergence

$$
D(a\Vert p)=a\log\frac ap+(1-a)\log\frac{1-a}{1-p}
$$

で表せ。

## 詳細解答

二項MGFは

$$
E[e^{tX}]=(1-p+pe^t)^n.
$$

$t>0$ で

$$
P(X\ge na)
=P(e^{tX}\ge e^{tna})
\le e^{-tna}(1-p+pe^t)^n.
$$

1標本あたりの対数上界

$$
\psi(t)=-at+\log(1-p+pe^t)
$$

を微分すると

$$
\psi'(t)=-a+\frac{pe^t}{1-p+pe^t}.
$$

よって

$$
e^{t^*}=\frac{a(1-p)}{p(1-a)},
\qquad
\boxed{t^*=\log\frac{a(1-p)}{p(1-a)}}.
$$

代入整理して

$$
\boxed{P(X\ge na)\le\exp\{-nD(a\Vert p)\}}.
$$

対数の数値化は不要で、最適化構造の導出が本質。

## 本番答案

$$
M_X(t)=(1-p+pe^t)^n.
$$

Markovより

$$
P(X\ge na)\le[e^{-at}(1-p+pe^t)]^n.
$$

微分して $e^{t^*}=a(1-p)/[p(1-a)]$。代入すると

$$
P(X\ge na)\le e^{-nD(a\Vert p)}.
$$

## 採点基準

- MGF: 4点
- Markov上界: 5点
- 最適化: 6点
- KL表現: 5点
