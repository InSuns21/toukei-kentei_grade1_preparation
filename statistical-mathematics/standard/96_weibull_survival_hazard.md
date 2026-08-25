# Standard 32 Weibull・生存関数・ハザード

- 旧No.: 96
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

Weibull分布の累積分布関数を

$$
F(t)=1-\exp\left[-\left(\frac t\lambda\right)^k\right],
\qquad t\ge0,
$$

$k,\lambda>0$ とする。

1. 生存関数 $S(t)$ を求めよ。
2. 密度 $f(t)$、ハザード $h(t)$、累積ハザード $H(t)$ を求めよ。
3. $k<1,k=1,k>1$ でハザード形状を分類せよ。
4. $\lambda$ の解釈を述べよ。

## 詳細解答

$$
S(t)=1-F(t)=\exp[-(t/\lambda)^k].
$$

微分して

$$
f(t)=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1}
\exp[-(t/\lambda)^k].
$$

従って

$$
h(t)=\frac{f(t)}{S(t)}
=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1},
$$

$$
H(t)=-\log S(t)=\left(\frac t\lambda\right)^k.
$$

$k<1$ なら減少ハザード、$k=1$ なら一定ハザードで指数分布、$k>1$ なら増加ハザード。

$t=\lambda$ では $S(\lambda)=e^{-1}$ なので、$\lambda$ は生存率が $e^{-1}$ になる代表時間尺度。

## 本番答案

$$
S=e^{-(t/\lambda)^k},
\quad
f=\frac{k}{\lambda}(t/\lambda)^{k-1}S,
$$

$$
h=\frac{k}{\lambda}(t/\lambda)^{k-1},
\quad
H=(t/\lambda)^k.
$$

$k<1$ 減少、$k=1$ 一定、$k>1$ 増加。$S(\lambda)=e^{-1}$。

## 採点基準

- 生存関数・密度: 6点
- ハザード: 5点
- 累積ハザード: 3点
- 形状母数・尺度母数の解釈: 6点
