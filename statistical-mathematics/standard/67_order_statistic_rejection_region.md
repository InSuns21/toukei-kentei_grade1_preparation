# Standard 21 順序統計量で棄却域を設計

- 旧No.: 67
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim U(0,\theta)$ とする。

$$
H_0:\theta=1,
\qquad
H_1:\theta<1
$$

を有意水準 $\alpha$ で検定したい。$M=X_{(n)}$ を用いる。

1. $H_0$ 下の $M$ の累積分布関数を求めよ。
2. 棄却域 $M\le c$ の $c$ を決めよ。
3. 対立母数 $\theta<1$ 下の検出力を求めよ。

## 詳細解答

$H_0$ 下で

$$
P(M\le m)=m^n,
\qquad0<m<1.
$$

サイズ条件 $P_0(M\le c)=\alpha$ より

$$
\boxed{c=\alpha^{1/n}}.
$$

$H_1$ で $M/\theta\sim Beta(n,1)$。従って

$$
\pi(\theta)=P_\theta(M\le c)
=
\begin{cases}
(c/\theta)^n,&c<\theta<1,\\
1,&0<\theta\le c.
\end{cases}
$$

$\theta$ が小さいほど最大値も小さくなるため、左側棄却が自然である。

## 本番答案

$F_M(m)=m^n$ under $H_0$。従って $c^n=\alpha$ から $c=\alpha^{1/n}$。検出力は $c<\theta$ なら $(c/\theta)^n$、$\theta\le c$ なら1。

## 採点基準

- 帰無分布: 6点
- 臨界値: 5点
- 検出力: 6点
- 棄却方向の説明: 3点
