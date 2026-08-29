# Core 36 正規線形観測・Bayes・条件付き正規

- 旧No.: 30
- 演習価値: A
- 難度: B
- 目安時間: 20分
- 手計算監査: ◎

## 問題

事前分布と観測モデルを

$$
\Theta\sim N(0,\tau^2),
\qquad
Y=\Theta+\varepsilon,
\qquad
\varepsilon\sim N(0,\sigma^2)
$$

とし、$\Theta$ と $\varepsilon$ は独立とする。

1. $(\Theta,Y)$ の分散共分散行列を求めよ。
2. Bayesの公式と平方完成を用いて $\Theta\mid Y=y$ の事後分布を求めよ。
3. 二乗損失のBayes推定量を求めよ。
4. $\tau^2=4,\sigma^2=1$ のとき事後平均と事後分散を求めよ。

## 詳細解答

### 1. $(\Theta,Y)$ の分散共分散行列

まず

$$
E[\Theta]=0,
\qquad
E[\varepsilon]=0
$$

なので

$$
E[Y]
=E[\Theta+\varepsilon]
=0.
$$

$\Theta$ と $\varepsilon$ は独立だから共分散は0であり、

$$
\begin{aligned}
\operatorname{Var}(Y)
&=\operatorname{Var}(\Theta+\varepsilon)\\
&=\operatorname{Var}(\Theta)+\operatorname{Var}(\varepsilon)
+2\operatorname{Cov}(\Theta,\varepsilon)\\
&=\tau^2+\sigma^2.
\end{aligned}
$$

また

$$
\begin{aligned}
\operatorname{Cov}(\Theta,Y)
&=\operatorname{Cov}(\Theta,\Theta+\varepsilon)\\
&=\operatorname{Var}(\Theta)+\operatorname{Cov}(\Theta,\varepsilon)\\
&=\tau^2.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Cov}
\begin{pmatrix}
\Theta\\Y
\end{pmatrix}
=
\begin{pmatrix}
\tau^2&\tau^2\\
\tau^2&\tau^2+\sigma^2
\end{pmatrix}
}.
$$

### 2. $\Theta\mid Y=y$ の事後分布

ここでは条件付き正規分布の公式をそのまま置かず、Bayesの公式から導く。

$\Theta=\theta$ が与えられたとき

$$
Y=\theta+\varepsilon
$$

だから

$$
Y\mid\Theta=\theta
\sim N(\theta,\sigma^2).
$$

したがって、$\theta$ に関係する部分だけ書けば尤度は

$$
L(\theta;y)
\propto
\exp\left[-\frac{(y-\theta)^2}{2\sigma^2}\right].
$$

一方、事前密度は

$$
\pi(\theta)
\propto
\exp\left[-\frac{\theta^2}{2\tau^2}\right].
$$

Bayesの公式より事後密度は

$$
\pi(\theta\mid y)
\propto
L(\theta;y)\pi(\theta),
$$

したがって

$$
\pi(\theta\mid y)
\propto
\exp\left[
-\frac12\left\{
\frac{\theta^2}{\tau^2}
+\frac{(y-\theta)^2}{\sigma^2}
\right\}
\right].
$$

括弧内を $\theta$ について展開すると

$$
\begin{aligned}
\frac{\theta^2}{\tau^2}
+\frac{(y-\theta)^2}{\sigma^2}
&=
\frac{\theta^2}{\tau^2}
+\frac{y^2-2y\theta+\theta^2}{\sigma^2}\\
&=
\left(\frac1{\tau^2}+\frac1{\sigma^2}\right)\theta^2
-\frac{2y}{\sigma^2}\theta
+\frac{y^2}{\sigma^2}.
\end{aligned}
$$

ここで

$$
A=\frac1{\tau^2}+\frac1{\sigma^2}
=\frac{\tau^2+\sigma^2}{\tau^2\sigma^2}
$$

と置く。平方完成の中心 $m$ は

$$
2Am=\frac{2y}{\sigma^2}
$$

を満たすので

$$
m
=\frac{y/\sigma^2}{A}
=\frac{\tau^2}{\tau^2+\sigma^2}y.
$$

したがって

$$
A\theta^2-\frac{2y}{\sigma^2}\theta
=A(\theta-m)^2-Am^2.
$$

$-Am^2+y^2/\sigma^2$ は $\theta$ に依存しないから、事後密度の形は

$$
\pi(\theta\mid y)
\propto
\exp\left[-\frac A2(\theta-m)^2\right].
$$

正規分布の確率密度関数

$$
\exp\left[-\frac{(\theta-m)^2}{2v}\right]
$$

と比較すると $1/v=A$ だから

$$
v
=\frac1A
=\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}.
$$

よって

$$
\boxed{
\Theta\mid Y=y
\sim
N\left(
\frac{\tau^2}{\tau^2+\sigma^2}y,
\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
\right)
}.
$$

第1問の分散共分散行列に条件付き正規分布の公式を適用しても同じ結果になるが、本問では平方完成によって公式の中身まで確認した。

### 3. 二乗損失のBayes推定量

作用を $a$ とし、事後平均を

$$
m_y=E[\Theta\mid Y=y]
$$

と置く。事後期待損失は

$$
E[(a-\Theta)^2\mid Y=y].
$$

$a-\Theta=(a-m_y)+(m_y-\Theta)$ と分けると

$$
\begin{aligned}
E[(a-\Theta)^2\mid Y=y]
&=(a-m_y)^2
+E[(\Theta-m_y)^2\mid Y=y],
\end{aligned}
$$

となる。交差項は

$$
E[m_y-\Theta\mid Y=y]=0
$$

なので消える。第2項は $a$ に依存しないから、最小にするのは

$$
a=m_y.
$$

したがってBayes推定量は

$$
\boxed{
\widehat\Theta_{\mathrm{Bayes}}(y)
=E[\Theta\mid Y=y]
=\frac{\tau^2}{\tau^2+\sigma^2}y
}.
$$

係数は0と1の間にあり、観測 $y$ を事前平均0の方向へ縮小している。

### 4. $\tau^2=4,\sigma^2=1$ の場合

事後平均は

$$
\frac{\tau^2}{\tau^2+\sigma^2}y
=\frac4{4+1}y
=\boxed{\frac45y}.
$$

事後分散は

$$
\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
=\frac{4\cdot1}{4+1}
=\boxed{\frac45}.
$$

## 本番答案

独立性から

$$
\operatorname{Var}(Y)=\tau^2+\sigma^2,
\qquad
\operatorname{Cov}(\Theta,Y)=\tau^2,
$$

よって

$$
\operatorname{Cov}
\begin{pmatrix}\Theta\\Y\end{pmatrix}
=
\begin{pmatrix}
\tau^2&\tau^2\\
\tau^2&\tau^2+\sigma^2
\end{pmatrix}.
$$

また

$$
\pi(\theta\mid y)
\propto
\exp\left[-\frac12\left\{
\frac{\theta^2}{\tau^2}
+\frac{(y-\theta)^2}{\sigma^2}
\right\}\right].
$$

$\theta$ について平方完成すると

$$
\Theta\mid Y=y
\sim
N\left(
\frac{\tau^2}{\tau^2+\sigma^2}y,
\frac{\tau^2\sigma^2}{\tau^2+\sigma^2}
\right).
$$

二乗損失の事後期待損失は

$$
(a-E[\Theta\mid y])^2+\operatorname{Var}(\Theta\mid y)
$$

なのでBayes推定量は事後平均。

$\tau^2=4,\sigma^2=1$ では

$$
\widehat\Theta_{\mathrm{Bayes}}=\frac45y,
\qquad
\operatorname{Var}(\Theta\mid y)=\frac45.
$$

## 採点基準

- 分散共分散行列（独立性から分散・共分散を導出）: 5点
- 事後分布（Bayesの公式・展開・平方完成）: 7点
- 二乗損失のBayes推定量（事後期待損失の最小化）: 4点
- 数値代入: 4点
