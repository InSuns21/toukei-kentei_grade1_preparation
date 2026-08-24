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

### 1. 逆変換とJacobian

$T=X+Y$, $U=X/(X+Y)$ なので

$$
X=UT,
\qquad
Y=(1-U)T.
$$

したがって

$$
\frac{\partial(x,y)}{\partial(t,u)}
=
\begin{pmatrix}
u&t\\
1-u&-t
\end{pmatrix},
$$

その行列式は

$$
-u t-t(1-u)=-t.
$$

よって $t>0$ ではJacobianの絶対値は

$$
\boxed{|J|=t}.
$$

また $x>0,y>0$ は $t>0,0<u<1$ に対応する。

### 2. 同時密度

独立性から元の同時密度は

$$
f_{X,Y}(x,y)
=\frac{x^{a-1}y^{b-1}e^{-(x+y)}}{\Gamma(a)\Gamma(b)}.
$$

$x=ut$, $y=(1-u)t$, $|J|=t$ を代入して

$$
\begin{aligned}
f_{T,U}(t,u)
&=\frac{(ut)^{a-1}\{(1-u)t\}^{b-1}e^{-t}}{\Gamma(a)\Gamma(b)}t\\
&=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}
\cdot
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}u^{a-1}(1-u)^{b-1}.
\end{aligned}
$$

### 3. 周辺分布と独立性

右辺は $t$ だけの密度と $u$ だけの密度の積になっている。したがって

$$
\boxed{T\sim\operatorname{Gamma}(a+b,1)},
$$

$$
\boxed{U\sim\operatorname{Beta}(a,b)},
$$

かつ

$$
\boxed{T\perp U}.
$$

### 4. $E[U]$

Beta密度をそのまま積分すると

$$
\begin{aligned}
E[U]
&=\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}
\int_0^1u^a(1-u)^{b-1}du\\
&=\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}
\frac{\Gamma(a+1)\Gamma(b)}{\Gamma(a+b+1)}\\
&=\boxed{\frac{a}{a+b}},
\end{aligned}
$$

ここで $\Gamma(a+1)=a\Gamma(a)$ を使った。

## 本番答案

$$
X=UT,\quad Y=(1-U)T,
$$

$$
\frac{\partial(x,y)}{\partial(t,u)}
=\begin{pmatrix}u&t\\1-u&-t\end{pmatrix},
\qquad |J|=t.
$$

よって

$$
f_{T,U}(t,u)
=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}u^{a-1}(1-u)^{b-1}.
$$

積に分解されるので $T\sim\Gamma(a+b,1)$, $U\sim Beta(a,b)$, $T\perp U$。さらにBeta積分から $E[U]=a/(a+b)$。

## 採点基準

- 逆変換・Jacobian: 5点
- 同時密度: 7点
- 分布・独立性: 5点
- 平均: 3点
