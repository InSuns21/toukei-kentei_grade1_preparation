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

### 1. 固有値と正定値条件

$J=\mathbf1\mathbf1^T$ と置く。$\mathbf1$ 方向では $J\mathbf1=p\mathbf1$ なので

$$
R\mathbf1=\{1+(p-1)\rho\}\mathbf1.
$$

一方 $v^T\mathbf1=0$ なら $Jv=0$ だから

$$
Rv=(1-\rho)v.
$$

したがって固有値は

$$
1+(p-1)\rho\quad(1\text{個}),
\qquad
1-\rho\quad(p-1\text{個}).
$$

対称行列が正定値であるためには全固有値が正であればよいので

$$
1+(p-1)\rho>0,
\qquad
1-\rho>0.
$$

従って

$$
\boxed{-\frac1{p-1}<\rho<1}.
$$

### 2. 逆行列を係数比較で求める

rank-one逆行列公式を暗記して使わず、$J^2=pJ$ を利用して

$$
R^{-1}=\alpha I_p+\beta J
$$

と仮定する。積を取ると

$$
\begin{aligned}
R(\alpha I+\beta J)
&=\{(1-\rho)I+\rho J\}(\alpha I+\beta J)\\
&=(1-\rho)\alpha I
+\{(1-\rho)\beta+\rho\alpha+p\rho\beta\}J.
\end{aligned}
$$

これが $I$ に等しいため

$$
(1-\rho)\alpha=1,
$$

$$
\{1+(p-1)\rho\}\beta+\rho\alpha=0.
$$

よって

$$
\alpha=\frac1{1-\rho},
\qquad
\beta=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

したがって

$$
\boxed{
R^{-1}=\frac1{1-\rho}
\left[I_p-\frac{\rho}{1+(p-1)\rho}\mathbf1\mathbf1^T\right]
}.
$$

### 3. 偏相関

$\Omega=R^{-1}$ とすると

$$
\Omega_{ii}=\frac{1+(p-2)\rho}{(1-\rho)\{1+(p-1)\rho\}},
$$

$$
\Omega_{ij}=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}},\qquad i\ne j.
$$

なぜ精度行列から偏相関が出るかも確認する。残りの成分を固定したとき、$(X_i,X_j)$ に関する条件付き正規密度の二次項は

$$
-\frac12
\begin{pmatrix}x_i&x_j\end{pmatrix}
\begin{pmatrix}
\Omega_{ii}&\Omega_{ij}\\
\Omega_{ij}&\Omega_{jj}
\end{pmatrix}
\begin{pmatrix}x_i\\x_j\end{pmatrix}
$$

である。この $2\times2$ 精度行列を逆にすると、対応する相関係数は

$$
-\frac{\Omega_{ij}}{\sqrt{\Omega_{ii}\Omega_{jj}}}.
$$

本問では対角成分が等しいので

$$
\boxed{\rho_{ij\cdot -ij}
=\frac{\rho}{1+(p-2)\rho}}.
$$

## 本番答案

$\mathbf1$ 方向の固有値は $1+(p-1)\rho$、直交補では $1-\rho$ なので正定値条件は $-1/(p-1)<\rho<1$。

$J=\mathbf1\mathbf1^T$, $J^2=pJ$ とし $R^{-1}=\alpha I+\beta J$ と置いて $RR^{-1}=I$ の係数を比較すると

$$
\alpha=\frac1{1-\rho},
\quad
\beta=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

従って上の逆行列を得る。条件付き2変量正規の二次形式から偏相関は $-\Omega_{ij}/\sqrt{\Omega_{ii}\Omega_{jj}}$ なので

$$
\rho_{ij\cdot -ij}=\frac{\rho}{1+(p-2)\rho}.
$$

## 採点基準

- 固有値: 6点
- 正定値条件: 3点
- 逆行列（係数比較を含む）: 6点
- 偏相関（精度行列との関係を含む）: 5点
