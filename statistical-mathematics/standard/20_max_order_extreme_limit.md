# Standard 08 最大順序統計量・極値極限

- 旧No.: 20
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U_1,\ldots,U_n\overset{iid}\sim U(0,1)$ とし $M_n=\max_iU_i$ とする。

1. $M_n$ のCDFを求めよ。
2. $n(1-M_n)$ の極限分布を求めよ。
3. $E[M_n]$ を求めよ。

## 詳細解答

$0<m<1$ で

$$
P(M_n\le m)=m^n.
$$

$x\ge0$ に対し

$$
P\{n(1-M_n)>x\}
=P(M_n<1-x/n)
=(1-x/n)^n\to e^{-x}.
$$

従って

$$
\boxed{n(1-M_n)\Rightarrow\operatorname{Exp}(1)}.
$$

また $M_n\sim\operatorname{Beta}(n,1)$ より

$$
E[M_n]=\frac{n}{n+1}.
$$

## 本番答案

$F_{M_n}(m)=m^n$。従って

$$
P\{n(1-M_n)>x\}=(1-x/n)^n\to e^{-x},
$$

ゆえに $n(1-M_n)\Rightarrow Exp(1)$。また $E[M_n]=n/(n+1)$。

## 採点基準

- 最大値CDF: 6点
- 極限計算: 8点
- 極限分布の同定: 3点
- 期待値: 3点
