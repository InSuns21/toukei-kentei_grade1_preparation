# Core 29 重回帰・分散拡大係数・欠落変数バイアス・平均二乗誤差

- 旧No.: 77
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

切片を除いて中心化済みの重回帰

$$
y_i=\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i,
\qquad
\operatorname{Var}(\varepsilon_i)=\sigma^2
$$

を考える。説明変数は

$$
\sum x_{1i}^2=\sum x_{2i}^2=n,
\qquad
\sum x_{1i}x_{2i}=n\rho
$$

を満たす。

1. フルモデルでの$\widehat\beta_1$の分散を求めよ。
2. $x_1$の分散拡大係数を求めよ。
3. $x_2$を落として$y$を$x_1$だけに回帰したとき、傾き推定量の$\beta_1$に対するバイアスを求めよ。
4. $\rho=1/2,\beta_2=2$のとき分散拡大係数と欠落変数バイアスを求めよ。

## 詳細解答

説明変数部分のGram行列は

$$
X^TX=n
\begin{pmatrix}
1&\rho\\
\rho&1
\end{pmatrix}.
$$

逆行列は

$$
(X^TX)^{-1}
=\frac1{n(1-\rho^2)}
\begin{pmatrix}
1&-\rho\\
-\rho&1
\end{pmatrix}.
$$

従って

$$
\boxed{
\operatorname{Var}(\widehat\beta_1)
=\frac{\sigma^2}{n(1-\rho^2)}
}.
$$

$x_1$を$x_2$で回帰した決定係数は$R_1^2=\rho^2$なので

$$
\boxed{VIF_1=\frac1{1-\rho^2}}.
$$

$x_2$を省略した単回帰傾きは

$$
\widetilde\beta_1
=\frac{\sum x_{1i}y_i}{\sum x_{1i}^2}.
$$

期待値を取ると

$$
E[\widetilde\beta_1]
=\beta_1+\beta_2\frac{\sum x_{1i}x_{2i}}{\sum x_{1i}^2}
=\beta_1+\rho\beta_2.
$$

従ってバイアスは

$$
\boxed{\rho\beta_2}.
$$

$\rho=1/2$では

$$
分散拡大係数=\frac1{1-1/4}=\frac43,
$$

$\beta_2=2$ならバイアスは$1$。

## 本番答案

$$
X^TX=n\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}
$$

より

$$
Var(\hat\beta_1)=\frac{\sigma^2}{n(1-\rho^2)},
\qquad
分散拡大係数=\frac1{1-\rho^2}.
$$

$x_2$を省略すると

$$
E[\tilde\beta_1]
=\beta_1+\rho\beta_2,
$$

よって欠落変数バイアスは$\rho\beta_2$。

$\rho=1/2,\beta_2=2$では$分散拡大係数=4/3$、バイアス$=1$。

## 採点基準

- フルモデル分散: 6点
- 分散拡大係数: 4点
- 欠落変数バイアス: 7点
- 数値例: 3点
