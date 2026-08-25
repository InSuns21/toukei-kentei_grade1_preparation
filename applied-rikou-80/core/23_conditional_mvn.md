# Core 23 多変量正規分布の条件付き分布

- 安定ID: `RIKOU-CORE-23`
- 80大問 No.: 66
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

$$
\begin{pmatrix}X\\Y\end{pmatrix}
\sim N_2\left(
\begin{pmatrix}1\\2\end{pmatrix},
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\right)
$$

とする。

1. $Y\mid X=x$ の条件付き平均と条件付き分散を求めよ。
2. $X=3$ のときの条件付き分布を求めよ。
3. $Z=Y-2-\frac34(X-1)$ とおく。$Z$ と $X$ が独立であることを示せ。
4. 条件付き期待値が $X$ の線形予測として最小平均二乗誤差を達成することを説明せよ。

## 詳細解答

### 1. 条件付き正規

2変量正規の公式から

$$
E[Y\mid X=x]
=\mu_Y+\frac{\sigma_{YX}}{\sigma_X^2}(x-\mu_X)
=2+\frac34(x-1).
$$

条件付き分散は

$$
\operatorname{Var}(Y\mid X)
=\sigma_Y^2-\frac{\sigma_{YX}^2}{\sigma_X^2}
=9-\frac94
=\frac{27}{4}.
$$

したがって

$$
\boxed{Y\mid X=x\sim N\left(2+\frac34(x-1),\frac{27}{4}\right)}.
$$

### 2. $X=3$

平均は

$$
2+\frac34\cdot2=\frac72.
$$

ゆえに

$$
Y\mid X=3\sim N\left(\frac72,\frac{27}{4}\right).
$$

### 3. 残差の独立性

$Z$ は $(X,Y)$ の線形変換なので $(X,Z)$ は同時正規。共分散は

$$
\operatorname{Cov}(X,Z)
=\operatorname{Cov}(X,Y)-\frac34\operatorname{Var}(X)
=3-\frac34\cdot4=0.
$$

同時正規で無相関だから

$$
\boxed{X\perp Z}.
$$

また $\operatorname{Var}(Z)=27/4$。

### 4. 最小二乗予測

$X$ だけを使って作る予測値を $g(X)$ とし、$E[g(X)^2]<\infty$ とする。ここで

$$
m(X)=E[Y\mid X]
$$

と置くと

$$
Y-g(X)=\{Y-m(X)\}+\{m(X)-g(X)\}.
$$

両辺を2乗して期待値を取ると

$$
\begin{aligned}
E[(Y-g(X))^2]
&=E[(Y-m(X))^2]\\
&\quad+E[(m(X)-g(X))^2]\\
&\quad+2E[(Y-m(X))(m(X)-g(X))].
\end{aligned}
$$

最後の交差項は0になる。実際、$m(X)-g(X)$ は $X$ が決まれば定まるので、まず $X$ を固定して条件付き期待値を取ると

$$
E[Y-m(X)\mid X]
=E[Y\mid X]-m(X)
=0.
$$

したがって

$$
E[(Y-m(X))(m(X)-g(X))]=0.
$$

よって

$$
\boxed{
E[(Y-g(X))^2]
=E[(Y-m(X))^2]
+E[(m(X)-g(X))^2]
}.
$$

第2項は0以上なので、$g(X)=m(X)=E[Y\mid X]$ のとき二乗誤差が最小になる。本問では条件付き期待値そのものが $X$ の一次式だから、線形予測の中でも最良であり、さらに $X$ だけから作る二乗誤差有限の予測値全体の中でも最良である。

## 本番答案

$$
Y\mid X=x\sim N\left(2+\frac34(x-1),\,9-\frac{3^2}{4}\right)
=N\left(2+\frac34(x-1),\frac{27}{4}\right).
$$

$x=3$ なら平均 $7/2$。さらに

$$
Z=Y-2-\frac34(X-1)
$$

について $\operatorname{Cov}(X,Z)=3-(3/4)4=0$。$(X,Z)$ は同時正規なので独立。

$m(X)=E[Y\mid X]$ とすると

$$
E[(Y-g(X))^2]
=E[(Y-m(X))^2]+E[(m(X)-g(X))^2]
$$

で、第2項は0以上。よって条件付き期待値は最小平均二乗誤差予測である。

## 採点基準

- 条件付き平均: 5点
- 条件付き分散: 5点
- 残差独立性: 6点
- 最小平均二乗誤差説明: 4点

25分経過時は一般公式を書き、数値代入で条件付き分布を完成させることを優先する。
