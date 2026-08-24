# Advanced 04 等相関行列・精度行列・偏相関

- 旧No.: 31
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$p\ge2$ とし、等相関行列

$$
R=(1-\rho)I_p+\rho\mathbf1\mathbf1^T
$$

を考える。

1. 固有値を求め、正定値条件を求めよ。
2. $R^{-1}$ を求めよ。
3. $N_p(0,R)$ における任意の2変数の、残り全変数を固定した偏相関を求めよ。

## 詳細解答

$\mathbf1$ 方向では

$$
R\mathbf1=\{1+(p-1)\rho\}\mathbf1.
$$

$\mathbf1$ に直交する方向では固有値 $1-\rho$。従って固有値は

$$
1+(p-1)\rho\quad(1\text{個}),
\qquad
1-\rho\quad(p-1\text{個}).
$$

正定値条件は

$$
\boxed{-\frac1{p-1}<\rho<1}.
$$

rank-one逆行列公式より

$$
\boxed{
R^{-1}=\frac1{1-\rho}
\left[I_p-\frac{\rho}{1+(p-1)\rho}\mathbf1\mathbf1^T\right]
}.
$$

精度行列 $\Omega=R^{-1}$ の対角成分と非対角成分は

$$
\Omega_{ii}=\frac{1+(p-2)\rho}{(1-\rho)\{1+(p-1)\rho\}},
$$

$$
\Omega_{ij}=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

従って偏相関は

$$
\boxed{
-\frac{\Omega_{ij}}{\sqrt{\Omega_{ii}\Omega_{jj}}}
=\frac{\rho}{1+(p-2)\rho}
}.
$$

## 本番答案

固有値は $1+(p-1)\rho$ と $1-\rho$（重複度 $p-1$）なので正定値条件は $-1/(p-1)<\rho<1$。

$$
R^{-1}=\frac1{1-\rho}\left[I-\frac{\rho}{1+(p-1)\rho}11^T\right].
$$

精度行列から偏相関は $\rho/[1+(p-2)\rho]$。

## 採点基準

- 固有値: 6点
- 正定値条件: 3点
- 逆行列: 6点
- 偏相関: 5点
