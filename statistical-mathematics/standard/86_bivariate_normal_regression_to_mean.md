# Standard 29 2変量正規・平均への回帰

- 旧No.: 86
- 層: Standard
- 演習価値: B
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$(X,Y)$ は2変量正規で平均 $(\mu_X,\mu_Y)$、標準偏差 $(\sigma_X,\sigma_Y)$、相関 $\rho$ とする。

1. $E[Y\mid X=x]$ を求めよ。
2. 標準化変数 $Z_X,Z_Y$ を用いて条件付き平均を書け。
3. $Z_X=2$, $\rho=0.6$ のとき $E[Z_Y\mid Z_X=2]$ を求め、「平均への回帰」を説明せよ。

## 詳細解答

### 1. 条件付き平均を2変量正規密度から導く

まず

$$
Z_X=\frac{X-\mu_X}{\sigma_X},
\qquad
Z_Y=\frac{Y-\mu_Y}{\sigma_Y}
$$

と標準化する。$(Z_X,Z_Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布なので、その同時密度は

$$
f(z_x,z_y)
=\frac{1}{2\pi\sqrt{1-\rho^2}}
\exp\left\{-\frac{z_x^2-2\rho z_xz_y+z_y^2}{2(1-\rho^2)}\right\}.
$$

$Z_X=z$ を固定したとき、$z_y$ に依存する部分を平方完成する。

$$
\begin{aligned}
z^2-2\rho z z_y+z_y^2
&=(z_y-\rho z)^2+z^2-\rho^2z^2\\
&=(z_y-\rho z)^2+(1-\rho^2)z^2.
\end{aligned}
$$

したがって条件付き密度は、$z_y$ に依存しない定数を正規化定数へまとめれば

$$
f_{Z_Y\mid Z_X}(z_y\mid z)
\propto
\exp\left\{-\frac{(z_y-\rho z)^2}{2(1-\rho^2)}\right\}.
$$

よって

$$
Z_Y\mid Z_X=z
\sim N\left(\rho z,\,1-\rho^2\right),
$$

特に

$$
\boxed{E[Z_Y\mid Z_X=z]=\rho z}.
$$

元の尺度では

$$
Y=\mu_Y+\sigma_YZ_Y,
\qquad
Z_X=\frac{x-\mu_X}{\sigma_X}
$$

だから

$$
\begin{aligned}
E[Y\mid X=x]
&=\mu_Y+\sigma_YE[Z_Y\mid Z_X=(x-\mu_X)/\sigma_X]\\
&=\mu_Y+\sigma_Y\rho\frac{x-\mu_X}{\sigma_X}.
\end{aligned}
$$

従って

$$
\boxed{
E[Y\mid X=x]
=\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X)
}.
$$

### 2. 標準化した条件付き平均

第1問の導出から直接

$$
\boxed{E[Z_Y\mid Z_X=z]=\rho z}.
$$

つまり説明変数が平均から $z$ 標準偏差だけ離れたとき、目的変数の条件付き平均は平均から $\rho z$ 標準偏差だけ離れる。

ここで $|\rho|<1$ なら

$$
|\rho z|<|z|
$$

なので、条件付き平均は説明変数ほど極端な位置には来ない。

### 3. 数値例と平均への回帰

$Z_X=2$, $\rho=0.6$ を代入すると

$$
E[Z_Y\mid Z_X=2]
=0.6\times2
=\boxed{1.2}.
$$

$Z_X=2$ は平均から2標準偏差上にある極端な観測だが、それに対応する $Z_Y$ の条件付き平均は1.2標準偏差であり、0に近い。

これは

$$
E[Z_Y\mid Z_X=z]=\rho z
$$

で $|\rho|<1$ のとき絶対値が縮むためである。極端な観測に対応する次の変数・再測定の**期待値**が母平均寄りになる現象を平均への回帰という。

なお「必ず次の観測値が平均へ近づく」という意味ではない。条件付き平均が平均寄りになるという確率的な主張である。

## 本番答案

標準化して

$$
Z_X=\frac{X-\mu_X}{\sigma_X},
\qquad
Z_Y=\frac{Y-\mu_Y}{\sigma_Y}
$$

とする。2変量標準正規密度の指数部を、$Z_X=z$ を固定して平方完成すると

$$
z^2-2\rho zz_y+z_y^2
=(z_y-\rho z)^2+(1-\rho^2)z^2.
$$

よって

$$
Z_Y\mid Z_X=z
\sim N(\rho z,1-\rho^2),
$$

したがって

$$
E[Z_Y\mid Z_X=z]=\rho z.
$$

元の尺度へ戻せば

$$
\boxed{
E[Y\mid X=x]
=\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X)
}.
$$

$z=2,\rho=0.6$ では条件付き平均は1.2。$|\rho|<1$ なら $|\rho z|<|z|$ なので、極端な $X$ に対応する $Y$ の条件付き平均は母平均寄りになる。

## 採点基準

- 標準化と2変量正規密度: 3点
- 平方完成から条件付き正規分布を導出: 5点
- 元尺度の条件付き平均: 4点
- 標準化表示: 3点
- 数値例: 2点
- 平均への回帰を「条件付き平均の収縮」として説明: 3点
