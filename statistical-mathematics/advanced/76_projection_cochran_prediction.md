# Advanced 15 射影・Cochran・予測誤差

- 旧No.: 76
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I),
$$

$\operatorname{rank}(X)=p$ とする。$H=X(X^TX)^{-1}X^T$。

1. $Hy$ と $(I-H)y$ が独立であることを示せ。
2. $SSE=y^T(I-H)y$ の分布を求めよ。
3. 新しい説明変数 $x_0$ に対する独立な将来観測 $Y_0=x_0^T\beta+\varepsilon_0$ を考える。予測誤差 $Y_0-x_0^T\hat\beta$ の分散を求めよ。
4. $\sigma^2$ を $S^2=SSE/(n-p)$ で推定したときのStudent化を述べよ。

## 詳細解答

$H$ と $I-H$ は直交射影で

$$
H(I-H)=0.
$$

$(Hy,(I-H)y)$ は同時正規で、共分散は

$$
\sigma^2H(I-H)=0.
$$

従って独立。

$I-H$ のランクは $n-p$ なので

$$
\boxed{SSE/\sigma^2\sim\chi^2_{n-p}}.
$$

$\hat\beta-\beta=(X^TX)^{-1}X^T\varepsilon$ より

$$
Var(x_0^T\hat\beta)=\sigma^2x_0^T(X^TX)^{-1}x_0.
$$

$\varepsilon_0$ は学習標本と独立なので

$$
\boxed{
Var(Y_0-x_0^T\hat\beta)
=\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}
}.
$$

さらに $S^2$ は $\hat\beta$ と独立で

$$
\frac{Y_0-x_0^T\hat\beta}
{S\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim t_{n-p}.
$$

## 本番答案

射影直交性 $H(I-H)=0$ と同時正規性から適合値と残差は独立。$rank(I-H)=n-p$ より $SSE/\sigma^2\sim\chi^2_{n-p}$。将来観測の予測誤差分散は

$$
\sigma^2[1+x_0^T(X^TX)^{-1}x_0].
$$

$S$ でStudent化すると $t_{n-p}$。

## 採点基準

- 射影独立性: 5点
- SSE分布: 5点
- 予測誤差分散: 6点
- Student化: 4点
