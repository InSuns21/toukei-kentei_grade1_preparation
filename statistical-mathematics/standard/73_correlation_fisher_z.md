# Standard 23 母相関係数・Fisher z変換

- 旧No.: 73
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・修正済（$\operatorname{atanh}$ の数値は与値使用）

## 問題

2変量正規標本から標本相関係数 $r$ を得た。大標本で

$$
z(r)=\operatorname{atanh}(r)
=\frac12\log\frac{1+r}{1-r}
$$

を用いる。

1. $z(r)$ の近似分布を書け。
2. $H_0:\rho=\rho_0$ の検定統計量を書け。
3. $n=30,r=0.5,\rho_0=0$ とし、$\operatorname{atanh}(0.5)=0.5493$ が与えられたとき統計量を求めよ。
4. $\rho$ の近似信頼区間の作り方を述べよ。

## 詳細解答

2変量正規の下で

$$
z(r)\approx N\left(z(\rho),\frac1{n-3}\right).
$$

従って

$$
Z=\sqrt{n-3}\{z(r)-z(\rho_0)\}
\approx N(0,1).
$$

例では $z(0)=0$ なので

$$
Z=\sqrt{27}\times0.5493\approx2.85.
$$

信頼区間はまず z尺度で

$$
z(r)\pm z_{1-\alpha/2}\frac1{\sqrt{n-3}}
$$

を作り、両端を $\tanh$ で戻す。$\tanh$ の数値評価は表・与値または計算機側の処理でよく、導出の本質ではない。

## 本番答案

$$
z(r)\approx N(z(\rho),1/(n-3)).
$$

よって帰無下の統計量は $\sqrt{n-3}[z(r)-z(\rho_0)]$。例では約2.85。区間は z尺度で作って $\tanh$ で逆変換する。

## 採点基準

- Fisher zの近似分布: 6点
- 検定統計量: 5点
- 数値例: 4点
- 信頼区間: 5点
