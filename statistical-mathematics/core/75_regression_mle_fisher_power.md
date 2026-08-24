# Core 12 回帰係数のMLE・Fisher情報・検定・検出力

- 旧No.: 75
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 手計算監査: 表・修正済（CDFの数値評価不要）

## 問題

単回帰

$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,4)
$$

を考える。$x_i$は固定で

$$
\sum x_i=0,
\qquad
\sum x_i^2=20
$$

とする。

1. $\beta_1$のMLEを求めよ。
2. $\beta_1$に関するFisher情報量と$\widehat\beta_1$の分散を求めよ。
3. $H_0:\beta_1=0$の両側5%検定統計量を構成せよ。
4. 真値$\beta_1=1$のときの検出力を$\Phi$を用いて表せ。$z_{0.975}=1.96$としてよい。数値化は不要。

## 詳細解答

$\sum x_i=0$なので切片と傾きは直交し

$$
\boxed{
\widehat\beta_1=\frac{\sum x_iY_i}{\sum x_i^2}
=\frac1{20}\sum x_iY_i
}.
$$

既知分散$\sigma^2=4$だから

$$
I(\beta_1)=\frac1{\sigma^2}\sum x_i^2=\frac{20}{4}=5.
$$

したがって

$$
\operatorname{Var}(\widehat\beta_1)=I^{-1}=\frac15.
$$

$H_0$下では

$$
Z=\frac{\widehat\beta_1}{\sqrt{1/5}}
=\sqrt5\,\widehat\beta_1
\sim N(0,1).
$$

よって$|Z|>1.96$で棄却。

真値$\beta_1=1$なら

$$
Z\sim N(\sqrt5,1).
$$

したがって検出力は

$$
\boxed{
P(Z<-1.96)+P(Z>1.96)
=\Phi(-1.96-\sqrt5)
+1-\Phi(1.96-\sqrt5)
}.
$$

CDF値の手計算は不要。

## 本番答案

$$
\hat\beta_1=\frac{\sum x_iY_i}{20}.
$$

$$
I(\beta_1)=20/4=5,
\qquad
\operatorname{Var}(\hat\beta_1)=1/5.
$$

$H_0$では

$$
Z=\sqrt5\hat\beta_1\sim N(0,1),
$$

よって$|Z|>1.96$で棄却。

$\beta_1=1$なら$Z\sim N(\sqrt5,1)$なので検出力は

$$
\Phi(-1.96-\sqrt5)+1-\Phi(1.96-\sqrt5).
$$

## 採点基準

- MLE: 5点
- Fisher情報・分散: 5点
- 検定統計量: 5点
- 検出力: 5点
