# Standard 37 Frisch–Waugh–Lovell定理

- 安定ID: `RIKOU-STANDARD-37`
- 80大問 No.: 37
- 演習価値: S
- 難度: A
- 目安時間: 25〜30分

## 問題

重回帰 $y=X_1\beta_1+x_2\beta_2+\varepsilon$ を考え、$M_1=I-P_1$, $P_1=X_1(X_1^\top X_1)^{-1}X_1^\top$ とする。

1. 正規方程式から $\hat\beta_2$ を求めよ。
2. $M_1y$ を $M_1x_2$ に単回帰した係数が $\hat\beta_2$ に等しいことを示せ。
3. 「他の説明変数を固定した効果」の意味を残差化で説明せよ。
4. $x_2$ が $X_1$ の列空間に近いと標準誤差が増える理由を説明せよ。

## 詳細解答

### 1. 正規方程式からブロック消去する

最小二乗の正規方程式は

$$
\begin{pmatrix}
X_1^TX_1&X_1^Tx_2\\
x_2^TX_1&x_2^Tx_2
\end{pmatrix}
\begin{pmatrix}\hat\beta_1\\\hat\beta_2\end{pmatrix}
=
\begin{pmatrix}X_1^Ty\\x_2^Ty\end{pmatrix}.
$$

第1行から

$$
\hat\beta_1
=(X_1^TX_1)^{-1}X_1^T(y-x_2\hat\beta_2).
$$

これを第2行

$$
x_2^TX_1\hat\beta_1+x_2^Tx_2\hat\beta_2=x_2^Ty
$$

へ代入すると

$$
\begin{aligned}
x_2^TP_1(y-x_2\hat\beta_2)+x_2^Tx_2\hat\beta_2
&=x_2^Ty,\\
x_2^T(I-P_1)x_2\hat\beta_2
&=x_2^T(I-P_1)y.
\end{aligned}
$$

従って

$$
\boxed{\hat\beta_2=(x_2^TM_1x_2)^{-1}x_2^TM_1y}.
$$

### 2. 残差回帰

$\tilde y=M_1y$, $\tilde x_2=M_1x_2$ とする。$M_1$ は対称冪等なので

$$
\tilde x_2^T\tilde y=x_2^TM_1^TM_1y=x_2^TM_1y,
$$

$$
\tilde x_2^T\tilde x_2=x_2^TM_1x_2.
$$

従って切片なし単回帰の係数は

$$
\frac{\tilde x_2^T\tilde y}{\tilde x_2^T\tilde x_2}
=\frac{x_2^TM_1y}{x_2^TM_1x_2}
=\hat\beta_2.
$$

### 3. 解釈

$M_1y$ は $y$ から $X_1$ で説明できる射影成分を除いた残差、$M_1x_2$ は $x_2$ から同じく $X_1$ で説明できる成分を除いた残差である。したがって $\hat\beta_2$ は「$X_1$ と重ならない $x_2$ の変動」が「$X_1$ と重ならない $y$ の変動」とどう関係するかを測る。

### 4. 共線性と標準誤差

真のモデルを代入すると

$$
\hat\beta_2-\beta_2
=(x_2^TM_1x_2)^{-1}x_2^TM_1\varepsilon.
$$

$M_1^2=M_1$ より

$$
\begin{aligned}
Var(\hat\beta_2)
&=(x_2^TM_1x_2)^{-2}
 x_2^TM_1(\sigma^2I)M_1x_2\\
&=\boxed{\frac{\sigma^2}{x_2^TM_1x_2}}.
\end{aligned}
$$

$x_2$ が $\mathcal C(X_1)$ に近いほど残差 $M_1x_2$ が小さく、$x_2^TM_1x_2=\|M_1x_2\|^2$ が小さくなるため標準誤差が増える。

## 本番答案

正規方程式の第1行から

$$
\hat\beta_1=(X_1^TX_1)^{-1}X_1^T(y-x_2\hat\beta_2)
$$

を得て第2行へ代入すると

$$
x_2^TM_1x_2\hat\beta_2=x_2^TM_1y.
$$

従って

$$
\hat\beta_2=(x_2^TM_1x_2)^{-1}x_2^TM_1y.
$$

$M_1^TM_1=M_1$ なので、これは $M_1y$ を $M_1x_2$ に回帰した係数と同じ。さらに $Var(\hat\beta_2)=\sigma^2/(x_2^TM_1x_2)$ だから、$x_2$ が $X_1$ の列空間に近いほど標準誤差が大きい。

## 採点基準

- ブロック消去: 6点
- 残差回帰: 6点
- 解釈: 4点
- 共線性: 4点

25分経過時は $M_1X_1=0$ を使って一気に消去する。
