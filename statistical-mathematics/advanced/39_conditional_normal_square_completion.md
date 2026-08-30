# Advanced 10 条件付き正規公式の平方完成導出

- 旧No.: 39
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N\left(
\begin{pmatrix}\mu_X\\\mu_Y\end{pmatrix},
\begin{pmatrix}
\Sigma_{XX}&\Sigma_{XY}\\
\Sigma_{YX}&\Sigma_{YY}
\end{pmatrix}
\right)
$$

とする。全体の分散共分散行列 $\Sigma$ は正定値とする。このとき主部分行列 $\Sigma_{YY}$ も正定値であり逆行列を持つ。

条件付き分布 $X\mid Y=y$ の平均・共分散を、条件付き正規分布の公式を引用せず、ブロック行列の分解と平方完成から導け。

## 詳細解答

中心化して

$$
u=x-\mu_X,
\qquad
v=y-\mu_Y
$$

とする。また

$$
B=\Sigma_{XY}\Sigma_{YY}^{-1},
$$

$$
S=\Sigma_{XX}
-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

と置く。

この $S$ は $\Sigma_{YY}$ に関する **Schur補行列** と呼ばれる。ただし本問では名称や公式を暗記して使うのではなく、まずなぜこの行列が現れ、なぜ逆行列を持つかを確認する。

### 1. $S$ が正定値であることを確認する

後で $S^{-1}$ を使うため、先に $S$ が正定値であることを示す。

任意の $z\neq0$ に対し

$$
w=-\Sigma_{YY}^{-1}\Sigma_{YX}z
$$

と置く。このとき

$$
\begin{pmatrix}z\\w\end{pmatrix}\neq0
$$

であり、$\Sigma$ は正定値だから

$$
\begin{pmatrix}z\\w\end{pmatrix}^T
\Sigma
\begin{pmatrix}z\\w\end{pmatrix}>0.
$$

左辺を展開すると

$$
\begin{aligned}
&z^T\Sigma_{XX}z
+z^T\Sigma_{XY}w
+w^T\Sigma_{YX}z
+w^T\Sigma_{YY}w.
\end{aligned}
$$

$w=-\Sigma_{YY}^{-1}\Sigma_{YX}z$ を代入する。$\Sigma_{YY}$ は対称なので $\Sigma_{YY}^{-1}$ も対称であり、

$$
z^T\Sigma_{XY}w
=-z^T\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}z,
$$

$$
w^T\Sigma_{YX}z
=-z^T\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}z,
$$

$$
w^T\Sigma_{YY}w
=z^T\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}z.
$$

したがって全体は

$$
z^T
\left(
\Sigma_{XX}
-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
\right)z
=z^TSz.
$$

よって任意の $z\neq0$ について

$$
z^TSz>0.
$$

従って

$$
\boxed{S\text{ は正定値}}
$$

であり、特に $S^{-1}$ が存在する。

### 2. 分散共分散行列をブロック分解する

$B\Sigma_{YY}=\Sigma_{XY}$ であり、

$$
\begin{aligned}
B\Sigma_{YY}B^T
&=\Sigma_{XY}\Sigma_{YY}^{-1}
\Sigma_{YY}
\Sigma_{YY}^{-1}\Sigma_{YX}\\
&=\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
\end{aligned}
$$

したがって $S$ の定義から

$$
S+B\Sigma_{YY}B^T=\Sigma_{XX}.
$$

ここで

$$
R=
\begin{pmatrix}I&B\\0&I\end{pmatrix},
\qquad
D=
\begin{pmatrix}S&0\\0&\Sigma_{YY}\end{pmatrix}
$$

と置く。$R$ はブロック上三角行列で、

$$
R^T=
\begin{pmatrix}I&0\\B^T&I\end{pmatrix}.
$$

実際に掛けると

$$
\begin{aligned}
RDR^T
&=
\begin{pmatrix}
S+B\Sigma_{YY}B^T&B\Sigma_{YY}\\
\Sigma_{YY}B^T&\Sigma_{YY}
\end{pmatrix}\\
&=
\begin{pmatrix}
\Sigma_{XX}&\Sigma_{XY}\\
\Sigma_{YX}&\Sigma_{YY}
\end{pmatrix}\\
&=\Sigma.
\end{aligned}
$$

従って

$$
\boxed{\Sigma=RDR^T}.
$$

また

$$
R^{-1}
=
\begin{pmatrix}I&-B\\0&I\end{pmatrix}.
$$

### 3. 指数部を平方完成する

$S$ と $\Sigma_{YY}$ はともに正定値なので $D^{-1}$ が存在する。上の分解から

$$
\Sigma^{-1}=R^{-T}D^{-1}R^{-1}.
$$

したがって同時正規密度の二次形式は

$$
\begin{aligned}
\begin{pmatrix}u\\v\end{pmatrix}^T
\Sigma^{-1}
\begin{pmatrix}u\\v\end{pmatrix}
&=
\left(
R^{-1}\begin{pmatrix}u\\v\end{pmatrix}
\right)^T
D^{-1}
\left(
R^{-1}\begin{pmatrix}u\\v\end{pmatrix}
\right)\\
&=
\begin{pmatrix}u-Bv\\v\end{pmatrix}^T
\begin{pmatrix}S^{-1}&0\\0&\Sigma_{YY}^{-1}\end{pmatrix}
\begin{pmatrix}u-Bv\\v\end{pmatrix}\\
&=(u-Bv)^TS^{-1}(u-Bv)
+v^T\Sigma_{YY}^{-1}v.
\end{aligned}
$$

つまり $u$ について見れば、交差項を含んでいた二次形式が

$$
\boxed{(u-Bv)^TS^{-1}(u-Bv)}
$$

という平方完成された形になった。

### 4. 条件付き密度を読む

$Y=y$ を固定すると $v=y-\mu_Y$ は定数である。したがって

$$
v^T\Sigma_{YY}^{-1}v
$$

は $x$ に依存せず、条件付き密度の正規化定数へ吸収される。

従って $u$ に依存する部分は

$$
\exp\left[
-\frac12(u-Bv)^TS^{-1}(u-Bv)
\right].
$$

これは平均 $Bv$、共分散 $S$ の多変量正規密度の指数部そのものであるから

$$
u\mid v\sim N(Bv,S).
$$

元の変数へ戻せば

$$
\boxed{
E[X\mid Y=y]
=\mu_X
+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y)
},
$$

$$
\boxed{
\operatorname{Cov}(X\mid Y=y)
=\Sigma_{XX}
-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
}.
$$

条件付き共分散 $S$ が観測値 $y$ に依存しないことも、平方完成後の二次形式から直接分かる。

## 本番答案

$u=x-\mu_X$, $v=y-\mu_Y$ とし

$$
B=\Sigma_{XY}\Sigma_{YY}^{-1},
\qquad
S=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}
$$

と置く。

任意の $z\neq0$ に対して

$$
w=-\Sigma_{YY}^{-1}\Sigma_{YX}z
$$

と選べば、$\Sigma>0$ より

$$
0<
\begin{pmatrix}z\\w\end{pmatrix}^T
\Sigma
\begin{pmatrix}z\\w\end{pmatrix}
=z^TSz,
$$

従って $S$ は正定値。

さらに

$$
\Sigma=
\begin{pmatrix}I&B\\0&I\end{pmatrix}
\begin{pmatrix}S&0\\0&\Sigma_{YY}\end{pmatrix}
\begin{pmatrix}I&0\\B^T&I\end{pmatrix}.
$$

よって

$$
\begin{pmatrix}u\\v\end{pmatrix}^T
\Sigma^{-1}
\begin{pmatrix}u\\v\end{pmatrix}
=(u-Bv)^TS^{-1}(u-Bv)
+v^T\Sigma_{YY}^{-1}v.
$$

$Y=y$ を固定すると後項は定数なので

$$
u\mid v\sim N(Bv,S).
$$

従って

$$
E[X\mid Y=y]
=\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y),
$$

$$
\operatorname{Cov}(X\mid Y=y)
=\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}.
$$

## 採点基準

- 中心化・$B,S$ の設定: 3点
- $S$ の正定値性の確認: 4点
- ブロック分解と平方完成: 7点
- 条件付き平均: 3点
- 条件付き共分散・解釈: 3点
