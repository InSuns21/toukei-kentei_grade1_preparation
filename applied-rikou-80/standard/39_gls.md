# Standard 39 一般化最小二乗法

- 安定ID: `RIKOU-STANDARD-39`
- 80大問 No.: 39
- 演習価値: A
- 難度: S
- 目安時間: 25〜30分

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
E[\varepsilon]=0,
\qquad
\operatorname{Var}(\varepsilon)=\sigma^2\Omega
$$

を考える。$X$ は列フルランク、$\Omega$ は既知の対称正定値行列とする。

1. 重み付き残差平方和

$$
Q(\beta)=(y-X\beta)^\top\Omega^{-1}(y-X\beta)
$$

を最小化して一般化最小二乗推定量を導け。
2. その分散を求めよ。
3. $\Omega=LL^\top$ と分解したとき、変換後の通常最小二乗法として説明せよ。
4. $\Omega=I$ で通常最小二乗法へ戻ることを確認せよ。
5. 通常最小二乗推定量がこの状況でも不偏だが、一般には最良線形不偏推定量とは限らない理由を述べよ。

## 詳細解答

### 1. 重み付き残差平方和から推定量を導く

まず

$$
Q(\beta)=(y-X\beta)^\top\Omega^{-1}(y-X\beta)
$$

を展開する。$\Omega$ は対称正定値なので $\Omega^{-1}$ も対称である。したがって

$$
y^\top\Omega^{-1}X\beta
$$

はスカラーであり、その転置

$$
\beta^\top X^\top\Omega^{-1}y
$$

と等しい。よって

$$
\begin{aligned}
Q(\beta)
&=y^\top\Omega^{-1}y
-y^\top\Omega^{-1}X\beta
-\beta^\top X^\top\Omega^{-1}y
+\beta^\top X^\top\Omega^{-1}X\beta\\
&=y^\top\Omega^{-1}y
-2\beta^\top X^\top\Omega^{-1}y
+\beta^\top X^\top\Omega^{-1}X\beta.
\end{aligned}
$$

ここで行列微分の公式を暗記していることを前提にせず、$\beta$ を微小量 $h$ だけ動かしたときの差を見る。

$$
\begin{aligned}
Q(\beta+h)-Q(\beta)
&=-2h^\top X^\top\Omega^{-1}y\\
&\quad+2h^\top X^\top\Omega^{-1}X\beta
+h^\top X^\top\Omega^{-1}Xh.
\end{aligned}
$$

$h$ の1次の項は

$$
2h^\top\{X^\top\Omega^{-1}X\beta-X^\top\Omega^{-1}y\}
$$

である。最小点では任意の方向 $h$ に対して1次の変化が0になるので

$$
X^\top\Omega^{-1}X\widehat\beta_G
=X^\top\Omega^{-1}y.
$$

これが一般化最小二乗法の正規方程式である。$X$ は列フルランク、$\Omega^{-1}$ は正定値なので、$a\ne0$ に対し

$$
a^\top X^\top\Omega^{-1}Xa
=(Xa)^\top\Omega^{-1}(Xa)>0.
$$

したがって $X^\top\Omega^{-1}X$ は正定値で可逆であり、

$$
\boxed{
\widehat\beta_G
=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}y
}.
$$

### 2. 分散

モデル $y=X\beta+\varepsilon$ を代入すると

$$
\begin{aligned}
\widehat\beta_G
&=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}(X\beta+\varepsilon)\\
&=\beta+(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}\varepsilon.
\end{aligned}
$$

よって $E[\varepsilon]=0$ から $E[\widehat\beta_G]=\beta$ である。また

$$
\begin{aligned}
\operatorname{Var}(\widehat\beta_G)
&=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}
(\sigma^2\Omega)
\Omega^{-1}X(X^\top\Omega^{-1}X)^{-1}\\
&=\sigma^2(X^\top\Omega^{-1}X)^{-1}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat\beta_G)
=\sigma^2(X^\top\Omega^{-1}X)^{-1}
}.
$$

### 3. 白色化して通常最小二乗法へ帰着する

$\Omega=LL^\top$ とし、両辺に $L^{-1}$ を掛ける。

$$
L^{-1}y=L^{-1}X\beta+L^{-1}\varepsilon.
$$

$$
y^*=L^{-1}y,
\qquad
X^*=L^{-1}X,
\qquad
\varepsilon^*=L^{-1}\varepsilon
$$

と置くと

$$
y^*=X^*\beta+\varepsilon^*.
$$

誤差の共分散行列は

$$
\begin{aligned}
\operatorname{Var}(\varepsilon^*)
&=L^{-1}(\sigma^2\Omega)(L^{-1})^\top\\
&=\sigma^2L^{-1}LL^\top L^{-\top}\\
&=\sigma^2I.
\end{aligned}
$$

したがって変換後のモデルでは通常最小二乗法を使える。変換後の推定量は

$$
\begin{aligned}
\widehat\beta
&=\{(X^*)^\top X^*\}^{-1}(X^*)^\top y^*\\
&=(X^\top L^{-\top}L^{-1}X)^{-1}X^\top L^{-\top}L^{-1}y.
\end{aligned}
$$

$L^{-\top}L^{-1}=(LL^\top)^{-1}=\Omega^{-1}$ なので

$$
\widehat\beta
=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}y
=\widehat\beta_G.
$$

### 4. $\Omega=I$ の場合

$\Omega=I$ なら $\Omega^{-1}=I$ だから

$$
\widehat\beta_G
=(X^\top X)^{-1}X^\top y,
$$

となり、通常最小二乗推定量に一致する。

### 5. 通常最小二乗推定量との違い

通常最小二乗推定量

$$
\widehat\beta_{\mathrm{OLS}}=(X^\top X)^{-1}X^\top y
$$

について、$E[y]=X\beta$ なので

$$
E[\widehat\beta_{\mathrm{OLS}}]
=(X^\top X)^{-1}X^\top X\beta
=\beta.
$$

したがって誤差共分散が $\sigma^2I$ でなくても不偏性は残る。一方、通常形の Gauss–Markov 定理が最小分散性を保証するには誤差共分散が $\sigma^2I$ であることが必要である。本問では $\operatorname{Var}(\varepsilon)=\sigma^2\Omega$ なので、一般には通常最小二乗推定量が最良線形不偏推定量とは限らない。

## 本番答案

$$
Q(\beta)
=y^\top\Omega^{-1}y
-2\beta^\top X^\top\Omega^{-1}y
+\beta^\top X^\top\Omega^{-1}X\beta.
$$

1次条件より

$$
X^\top\Omega^{-1}X\widehat\beta_G=X^\top\Omega^{-1}y,
$$

したがって

$$
\widehat\beta_G=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}y.
$$

また

$$
\widehat\beta_G-\beta
=(X^\top\Omega^{-1}X)^{-1}X^\top\Omega^{-1}\varepsilon
$$

より

$$
\operatorname{Var}(\widehat\beta_G)
=\sigma^2(X^\top\Omega^{-1}X)^{-1}.
$$

$\Omega=LL^\top$ とし $L^{-1}$ を掛けると誤差共分散は $\sigma^2I$ となるので、変換後の通常最小二乗法に一致する。$\Omega=I$ では通常最小二乗法へ戻る。通常最小二乗推定量は $E[\varepsilon]=0$ から不偏だが、$\Omega\ne I$ では通常形の Gauss–Markov 定理による最小分散性は保証されない。

## 採点基準

- 目的関数の展開・正規方程式・一般化最小二乗推定量: 7点
- 分散の導出: 5点
- 白色化と通常最小二乗法への帰着: 5点
- $\Omega=I$ と不偏性・最小分散性の説明: 3点

25分経過時は目的関数の展開と正規方程式を必ず残す。
