# Advanced 04 等相関行列・逆分散共分散行列・偏相関

- 旧No.: 31
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：対称行列の固有値と正定値性、多変量正規分布、2変量正規分布の相関係数
- **この問題で導入**：分散共分散行列 $\Sigma$ の逆行列 $\Omega=\Sigma^{-1}$ を**精度行列**と呼ぶこと、精度行列から条件付き相関が読めること
- **1級での扱い**：$-\Omega_{ij}/\sqrt{\Omega_{ii}\Omega_{jj}}$ を無条件に暗記するのではなく、2変量の条件付き正規密度の二次形式から導けることを重視する
- **関連Core**：[条件付き正規・偏相関・条件付き独立](../core/26_conditional_normal_partial_correlation.md)

本問では「精度行列」という名前を知っていることを前提にしない。まず逆分散共分散行列を計算し、その意味を条件付き分布から確認した後で名前を付ける。

## 問題

$p\ge2$ とし、等相関行列

$$
R=(1-\rho)I_p+\rho\mathbf1\mathbf1^T
$$

を考える。

1. 固有値を求め、正定値条件を求めよ。
2. $R^{-1}$ を求めよ。
3. $X\sim N_p(0,R)$ とする。残りの成分を固定したときの $X_i,X_j$ の条件付き相関を、$R^{-1}$ の成分から導け。最後に $R^{-1}$ が精度行列と呼ばれることを確認せよ。

## 詳細解答

### 1. 固有値と正定値条件

$J=\mathbf1\mathbf1^T$ と置く。$\mathbf1$ 方向では

$$
J\mathbf1=p\mathbf1
$$

なので

$$
R\mathbf1
=\{1+(p-1)\rho\}\mathbf1.
$$

一方、$v^T\mathbf1=0$ なら

$$
Jv=\mathbf1(\mathbf1^Tv)=0
$$

だから

$$
Rv=(1-\rho)v.
$$

したがって固有値は

$$
1+(p-1)\rho\quad(1\text{個}),
\qquad
1-\rho\quad(p-1\text{個}).
$$

実対称行列が正定値であるための必要十分条件は全固有値が正であることなので

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

rank-one逆行列公式を暗記して使わず、$J^2=pJ$ を利用する。

$R$ が $I$ と $J$ の線形結合なので、逆行列も

$$
R^{-1}=\alpha I_p+\beta J
$$

の形を仮定する。積を取ると

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
\left[
I_p-\frac{\rho}{1+(p-1)\rho}\mathbf1\mathbf1^T
\right]
}.
$$

### 3. 逆分散共分散行列から条件付き相関を導く

ここで初めて

$$
\Omega=R^{-1}
$$

と置く。分散共分散行列の逆行列 $\Omega$ を**精度行列（precision matrix）**という。

ただし、本問で重要なのは名称ではなく、なぜ $\Omega$ が条件付き相関に現れるかである。

$X\sim N_p(0,R)$ の密度は、定数倍を除けば

$$
f(x)\propto
\exp\left(-\frac12x^T\Omega x\right).
$$

$i,j$ 以外の成分を固定する。$x_i,x_j$ に関する2次の項だけを抜き出すと

$$
-\frac12
\begin{pmatrix}x_i&x_j\end{pmatrix}
\begin{pmatrix}
\Omega_{ii}&\Omega_{ij}\\
\Omega_{ij}&\Omega_{jj}
\end{pmatrix}
\begin{pmatrix}x_i\\x_j\end{pmatrix}.
$$

固定した他成分との交差項は $x_i,x_j$ に関する1次項になるので、**条件付き平均は動かすが条件付き共分散には影響しない**。

従って、$(X_i,X_j)$ の条件付き2変量正規分布の精度行列は

$$
K=
\begin{pmatrix}
a&c\\c&b
\end{pmatrix}
=
\begin{pmatrix}
\Omega_{ii}&\Omega_{ij}\\
\Omega_{ij}&\Omega_{jj}
\end{pmatrix}.
$$

この逆行列は

$$
K^{-1}
=\frac1{ab-c^2}
\begin{pmatrix}
b&-c\\-c&a
\end{pmatrix}.
$$

したがって条件付き相関係数は

$$
\frac{-c/(ab-c^2)}
{\sqrt{\{b/(ab-c^2)\}\{a/(ab-c^2)\}}}
=-\frac{c}{\sqrt{ab}}.
$$

よって一般に

$$
\boxed{
\rho_{ij\cdot -ij}
=-\frac{\Omega_{ij}}
{\sqrt{\Omega_{ii}\Omega_{jj}}}
}.
$$

ここまでが、よく使われる「精度行列から偏相関が読める」公式の導出である。

本問では問2の逆行列から

$$
\Omega_{ii}
=\frac{1+(p-2)\rho}
{(1-\rho)\{1+(p-1)\rho\}},
$$

$$
\Omega_{ij}
=-\frac{\rho}
{(1-\rho)\{1+(p-1)\rho\}},
\qquad i\ne j.
$$

対角成分はすべて等しいので

$$
\boxed{
\rho_{ij\cdot -ij}
=\frac{\rho}{1+(p-2)\rho}
}.
$$

### 何を覚えるべきか

本問では

$$
\boxed{
\text{多変量正規の密度の二次形式}
\to
\text{条件付き2変量の精度行列}
\to
2\times2\text{逆行列}
\to
\text{偏相関}
}
$$

という流れが本体である。

「精度行列」という言葉や偏相関公式だけを独立に暗記する必要はない。

## 本番答案

$J=\mathbf1\mathbf1^T$ とする。$\mathbf1$ 方向の固有値は $1+(p-1)\rho$、$\mathbf1^\perp$ では $1-\rho$ なので

$$
-\frac1{p-1}<\rho<1.
$$

$J^2=pJ$ を使い $R^{-1}=\alpha I+\beta J$ と置いて係数比較すると

$$
\alpha=\frac1{1-\rho},
\qquad
\beta=-\frac{\rho}{(1-\rho)\{1+(p-1)\rho\}}.
$$

従って

$$
R^{-1}
=\frac1{1-\rho}
\left[I-
\frac{\rho}{1+(p-1)\rho}\mathbf1\mathbf1^T
\right].
$$

$\Omega=R^{-1}$ とする。$i,j$ 以外を固定した条件付き正規密度の2次項の精度行列は

$$
\begin{pmatrix}
\Omega_{ii}&\Omega_{ij}\\
\Omega_{ij}&\Omega_{jj}
\end{pmatrix}.
$$

この $2\times2$ 行列を逆にすれば条件付き相関は

$$
-\frac{\Omega_{ij}}{\sqrt{\Omega_{ii}\Omega_{jj}}}.
$$

各成分を代入して

$$
\boxed{
\rho_{ij\cdot -ij}
=\frac{\rho}{1+(p-2)\rho}
}.
$$

## 採点基準

- 固有空間を分けて固有値を導出: 5点
- 正定値条件: 3点
- 逆行列を係数比較から導出: 5点
- 条件付き密度の二次形式から $2\times2$ 精度行列を取り出す: 3点
- 逆行列から偏相関公式と本問の値を導く: 4点
