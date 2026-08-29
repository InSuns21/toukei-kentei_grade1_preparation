# Core 29 重回帰・分散拡大係数・欠落変数バイアス・平均二乗誤差

- 旧No.: 77
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

切片を除いて中心化済みの重回帰

$$
y_i=\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i
$$

を考える。誤差は

$$
E[\varepsilon_i]=0,
\qquad
\operatorname{Var}(\varepsilon_i)=\sigma^2,
\qquad
\operatorname{Cov}(\varepsilon_i,\varepsilon_j)=0\quad(i\ne j)
$$

を満たすとする。説明変数は

$$
\sum_i x_{1i}^2=\sum_i x_{2i}^2=n,
\qquad
\sum_i x_{1i}x_{2i}=n\rho,
\qquad |\rho|<1
$$

を満たす。

1. $X^\top X$ の逆行列を2次行列の逆行列公式から求め、フルモデルでの $\widehat\beta_1$ の分散を求めよ。
2. $x_1$ を $x_2$ だけで回帰した残差平方和から、$x_1$ の分散拡大係数を求めよ。
3. $x_2$ を落として $y$ を $x_1$ だけに回帰したとき、傾き推定量をモデル式へ代入し、$\beta_1$ に対するバイアスを求めよ。
4. $\rho=1/2,\beta_2=2$ のとき分散拡大係数と欠落変数バイアスを求めよ。

## 詳細解答

### 1. Gram 行列・逆行列・$\widehat\beta_1$ の分散

設計行列を

$$
X=
\begin{pmatrix}
x_{11}&x_{21}\\
\vdots&\vdots\\
x_{1n}&x_{2n}
\end{pmatrix}
$$

とすると、問題文の和から

$$
X^\top X
=
\begin{pmatrix}
\sum_i x_{1i}^2&\sum_i x_{1i}x_{2i}\\
\sum_i x_{1i}x_{2i}&\sum_i x_{2i}^2
\end{pmatrix}
=n
\begin{pmatrix}
1&\rho\\
\rho&1
\end{pmatrix}.
$$

ここで逆行列を結果だけ置かずに計算する。一般に

$$
\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}
=\frac1{ad-bc}
\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

だから、

$$
\det
\begin{pmatrix}
1&\rho\\
\rho&1
\end{pmatrix}
=1-\rho^2.
$$

$|\rho|<1$ なので $1-\rho^2>0$ で可逆であり、

$$
\begin{aligned}
(X^\top X)^{-1}
&=\frac1n
\begin{pmatrix}
1&\rho\\
\rho&1
\end{pmatrix}^{-1}\\
&=\boxed{
\frac1{n(1-\rho^2)}
\begin{pmatrix}
1&-\rho\\
-\rho&1
\end{pmatrix}
}.
\end{aligned}
$$

通常最小二乗推定量は

$$
\widehat\beta
=(X^\top X)^{-1}X^\top y.
$$

モデル $y=X\beta+\varepsilon$ を代入すると

$$
\widehat\beta-\beta
=(X^\top X)^{-1}X^\top\varepsilon.
$$

誤差の分散共分散行列は $\sigma^2I$ だから

$$
\begin{aligned}
\operatorname{Var}(\widehat\beta)
&=(X^\top X)^{-1}X^\top
(\sigma^2I)X(X^\top X)^{-1}\\
&=\sigma^2(X^\top X)^{-1}X^\top X(X^\top X)^{-1}\\
&=\sigma^2(X^\top X)^{-1}.
\end{aligned}
$$

したがって第1対角成分から

$$
\boxed{
\operatorname{Var}(\widehat\beta_1)
=\frac{\sigma^2}{n(1-\rho^2)}
}.
$$

$x_1$ と $x_2$ が無相関なら $\rho=0$ なので分散は $\sigma^2/n$ である。相関があると $1/(1-\rho^2)$ 倍に膨らむ。

### 2. 分散拡大係数を残差化から求める

$x_1$ を $x_2$ だけで切片なし回帰する。傾きを $a$ とすると、残差平方和は

$$
R(a)=\sum_i(x_{1i}-ax_{2i})^2.
$$

展開すると

$$
\begin{aligned}
R(a)
&=\sum_i x_{1i}^2
-2a\sum_i x_{1i}x_{2i}
+a^2\sum_i x_{2i}^2\\
&=n-2an\rho+a^2n.
\end{aligned}
$$

$a$ で微分して

$$
R'(a)=-2n\rho+2an.
$$

これを0と置くと

$$
\widehat a=\rho.
$$

したがって最小残差平方和は

$$
\begin{aligned}
R(\widehat a)
&=n-2n\rho^2+n\rho^2\\
&=n(1-\rho^2).
\end{aligned}
$$

中心化済みで $\sum_i x_{1i}^2=n$ だから、この補助回帰の決定係数は

$$
\begin{aligned}
R_1^2
&=1-\frac{\text{残差平方和}}{\sum_i x_{1i}^2}\\
&=1-\frac{n(1-\rho^2)}{n}\\
&=\rho^2.
\end{aligned}
$$

分散拡大係数の定義

$$
\frac1{1-R_1^2}
$$

へ代入して

$$
\boxed{
\text{分散拡大係数}
=\frac1{1-\rho^2}
}.
$$

これは第1問で得た

$$
\operatorname{Var}(\widehat\beta_1)
=\frac{\sigma^2}{n}
\frac1{1-\rho^2}
$$

の膨張倍率と一致する。

### 3. 欠落変数バイアス

$x_2$ を省略して $y$ を $x_1$ だけに回帰したときの傾き推定量は

$$
\widetilde\beta_1
=\frac{\sum_i x_{1i}y_i}{\sum_i x_{1i}^2}.
$$

ここに真のモデル

$$
y_i=\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i
$$

を代入する。

$$
\begin{aligned}
\widetilde\beta_1
&=\frac{
\sum_i x_{1i}
(\beta_1x_{1i}+\beta_2x_{2i}+\varepsilon_i)
}{\sum_i x_{1i}^2}\\
&=\beta_1
+\beta_2\frac{\sum_i x_{1i}x_{2i}}{\sum_i x_{1i}^2}
+\frac{\sum_i x_{1i}\varepsilon_i}{\sum_i x_{1i}^2}.
\end{aligned}
$$

説明変数を固定して誤差について期待値を取る。$E[\varepsilon_i]=0$ なので

$$
E\left[\sum_i x_{1i}\varepsilon_i\right]
=\sum_i x_{1i}E[\varepsilon_i]
=0.
$$

したがって

$$
\begin{aligned}
E[\widetilde\beta_1]
&=\beta_1
+\beta_2\frac{n\rho}{n}\\
&=\beta_1+\rho\beta_2.
\end{aligned}
$$

よって $\beta_1$ を推定するときのバイアスは

$$
\begin{aligned}
\operatorname{Bias}(\widetilde\beta_1)
&=E[\widetilde\beta_1]-\beta_1\\
&=\boxed{\rho\beta_2}.
\end{aligned}
$$

ここから、欠落した説明変数の効果 $\beta_2$ が0であるか、$x_1$ と $x_2$ が無相関 $\rho=0$ なら、このバイアスは生じないことも分かる。

### 4. 数値例

$\rho=1/2$ なので

$$
\begin{aligned}
\text{分散拡大係数}
&=\frac1{1-(1/2)^2}\\
&=\frac1{1-1/4}\\
&=\boxed{\frac43}.
\end{aligned}
$$

また $\beta_2=2$ だから

$$
\operatorname{Bias}(\widetilde\beta_1)
=\rho\beta_2
=\frac12\cdot2
=\boxed{1}.
$$

## 本番答案

$$
X^\top X
=n\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix},
\qquad
\det\begin{pmatrix}1&\rho\\\rho&1\end{pmatrix}
=1-\rho^2.
$$

したがって

$$
(X^\top X)^{-1}
=\frac1{n(1-\rho^2)}
\begin{pmatrix}1&-\rho\\-\rho&1\end{pmatrix},
$$

$$
\operatorname{Var}(\widehat\beta_1)
=\frac{\sigma^2}{n(1-\rho^2)}.
$$

$x_1$ を $x_2$ で回帰すると、残差平方和

$$
R(a)=n-2an\rho+a^2n
$$

を最小にする傾きは $a=\rho$、残差平方和は $n(1-\rho^2)$。よって $R_1^2=\rho^2$ で

$$
\text{分散拡大係数}=\frac1{1-\rho^2}.
$$

また

$$
\begin{aligned}
\widetilde\beta_1
&=\frac{\sum_i x_{1i}y_i}{\sum_i x_{1i}^2}\\
&=\beta_1
+\beta_2\frac{\sum_i x_{1i}x_{2i}}{\sum_i x_{1i}^2}
+\frac{\sum_i x_{1i}\varepsilon_i}{\sum_i x_{1i}^2}.
\end{aligned}
$$

$E[\varepsilon_i]=0$ より

$$
E[\widetilde\beta_1]=\beta_1+\rho\beta_2,
$$

したがって欠落変数バイアスは $\rho\beta_2$。$\rho=1/2,\beta_2=2$ では分散拡大係数 $4/3$、バイアス $1$。

## 採点基準

- Gram行列・行列式・逆行列・$\widehat\beta_1$ の分散: 6点
- 補助回帰の残差平方和から分散拡大係数を導く: 5点
- モデル代入・期待値計算・欠落変数バイアス: 6点
- 数値例: 3点
