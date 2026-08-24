# Core 26 Gamma–Beta関係・Jacobian・独立

- 旧No.: 02
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立に

$$
X\sim\operatorname{Gamma}(a,1),
\qquad
Y\sim\operatorname{Gamma}(b,1)
$$

とする。shape-rate表示を用いる。

$$
T=X+Y,
\qquad
U=\frac{X}{X+Y}
$$

とおく。

1. 逆変換$(X,Y)$を$(T,U)$で表し、Jacobianを求めよ。
2. $(T,U)$の同時密度を求めよ。
3. $T$と$U$の分布および独立性を示せ。
4. $E[U]$を求めよ。

## 詳細解答

逆変換は

$$
X=UT,
\qquad
Y=(1-U)T.
$$

Jacobianの絶対値は

$$
\left|
\frac{\partial(x,y)}{\partial(t,u)}
\right|=t.
$$

元の同時密度は

$$
\frac{x^{a-1}y^{b-1}e^{-(x+y)}}{\Gamma(a)\Gamma(b)}.
$$

変換すると

$$
\begin{aligned}
f_{T,U}(t,u)
&=\frac{(ut)^{a-1}\{(1-u)t\}^{b-1}e^{-t}}{\Gamma(a)\Gamma(b)}t\\
&=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}
\cdot
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}u^{a-1}(1-u)^{b-1}.
\end{aligned}
$$

$t>0,0<u<1$。積の形に分解できるので

$$
\boxed{T\sim\Gamma(a+b,1)},
$$

$$
\boxed{U\sim\operatorname{Beta}(a,b)},
$$

かつ$T\perp U$。

Beta分布の平均から

$$
\boxed{E[U]=\frac a{a+b}}.
$$

## 本番答案

$$
X=UT,\quad Y=(1-U)T,\quad |J|=T.
$$

したがって

$$
f_{T,U}(t,u)
=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}u^{a-1}(1-u)^{b-1}.
$$

よって

$$
T\sim\Gamma(a+b,1),
\quad
U\sim Beta(a,b),
\quad
T\perp U.
$$

さらに$E[U]=a/(a+b)$。

## 採点基準

- 逆変換・Jacobian: 5点
- 同時密度: 7点
- 分布・独立性: 5点
- 平均: 3点
