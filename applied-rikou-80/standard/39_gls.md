# Standard 39 一般化最小二乗 一般化最小二乗法

- 安定ID: `RIKOU-STANDARD-39`
- 80大問 No.: 39
- 演習価値: A
- 難度: S
- 目安時間: 25〜30分

## 問題

線形モデル $y=X\beta+\varepsilon$ で $E\varepsilon=0$, $\operatorname{Var}(\varepsilon)=\sigma^2\Omega$、$\Omega$ は既知正定値とする。

1. 一般化最小二乗法推定量を求めよ。
2. その分散を求めよ。
3. $\Omega=L L^\top$ と分解したとき、変換後通常最小二乗法として説明せよ。
4. $\Omega=I$ で通常最小二乗法へ戻ることを確認せよ。
5. 通常最小二乗法がこの状況でも不偏だが最良線形不偏推定量とは限らない理由を述べよ。

## 詳細解答

重み付き二乗和

$$
(y-X\beta)^\top\Omega^{-1}(y-X\beta)
$$

を微分すると

$$
\boxed{\hat\beta_G=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}y}.
$$

分散は

$$
\boxed{\operatorname{Var}(\hat\beta_G)=\sigma^2(X^\top\Omega^{-1}X)^{-1}}.
$$

$L^{-1}y=L^{-1}X\beta+L^{-1}\varepsilon$ とすれば誤差共分散は $\sigma^2I$ で、変換後通常最小二乗法が一般化最小二乗法に一致する。通常最小二乗法は $E\varepsilon=0$ だけで不偏だが、球対称誤差でないためGauss–Markovの通常形による最小分散性は保証されない。

## 本番答案

一般化最小二乗法は $(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}y$、分散は $\sigma^2(X^\top\Omega^{-1}X)^{-1}$。$L^{-1}$ で白色化すれば通常最小二乗法へ帰着する。

## 採点基準

- 一般化最小二乗法導出: 7点
- 分散: 5点
- 白色化: 5点
- 通常最小二乗法との関係: 3点

25分経過時は目的関数と正規方程式を必ず書く。
