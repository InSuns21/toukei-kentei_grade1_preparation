# Standard 02 カイ二乗・Cauchy・逆関数法

- 旧No.: 12
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（逆三角関数の数値評価不要）

## 問題

$Z_1,Z_2$ は独立な標準正規変数とし、標準正規分布の確率密度関数を

$$
\phi(z)=\frac1{\sqrt{2\pi}}e^{-z^2/2},
\qquad -\infty<z<\infty
$$

とする。さらに

$$
X=\frac{Z_1}{Z_2}
$$

とする。

1. 変数変換を用いて $X$ の分布を求めよ。
2. $W=\arctan X$ の分布を求めよ。
3. $U\sim U(0,1)$ から標準Cauchy乱数を生成する式を求めよ。
4. $Z^2\sim\chi_1^2$ を用いて $t_1$ とCauchyの関係を説明せよ。

## 詳細解答

### 1. 正規変数の比からCauchy密度を導く

$Z_1,Z_2$ は独立なので、同時確率密度関数は周辺密度の積で

$$
\begin{aligned}
f_{Z_1,Z_2}(z_1,z_2)
&=\phi(z_1)\phi(z_2)\\
&=\frac1{2\pi}\exp\left\{-\frac{z_1^2+z_2^2}{2}\right\}.
\end{aligned}
$$

変数変換

$$
X=\frac{Z_1}{Z_2},
\qquad
V=Z_2
$$

を用いる。逆変換は

$$
z_1=xv,
\qquad
z_2=v.
$$

ヤコビアンは

$$
\left|\frac{\partial(z_1,z_2)}{\partial(x,v)}\right|
=\left|\begin{matrix}v&x\\0&1\end{matrix}\right|
=|v|.
$$

したがって変数変換公式から

$$
f_{X,V}(x,v)
=\frac1{2\pi}\exp\left\{-\frac{(1+x^2)v^2}{2}\right\}|v|.
$$

$v$ を積分して $X$ の周辺密度を求めると

$$
\begin{aligned}
f_X(x)
&=\frac1{2\pi}\int_{-\infty}^{\infty}|v|e^{-(1+x^2)v^2/2}\,dv\\
&=\frac1\pi\int_0^{\infty}v e^{-(1+x^2)v^2/2}\,dv.
\end{aligned}
$$

ここで

$$
\frac{d}{dv}e^{-(1+x^2)v^2/2}
=-(1+x^2)v e^{-(1+x^2)v^2/2}
$$

だから

$$
\int_0^{\infty}v e^{-(1+x^2)v^2/2}\,dv
=\frac1{1+x^2}.
$$

従って

$$
\boxed{f_X(x)=\frac1{\pi(1+x^2)}},
\qquad -\infty<x<\infty.
$$

これは標準Cauchy分布の密度である。

### 2. $W=\arctan X$ の分布

$-\pi/2<w<\pi/2$ で逆変換は

$$
x=\tan w,
$$

また

$$
\frac{dx}{dw}=\sec^2w.
$$

したがって1変量の変数変換公式から

$$
\begin{aligned}
f_W(w)
&=f_X(\tan w)\left|\frac{dx}{dw}\right|\\
&=\frac1{\pi(1+\tan^2w)}\sec^2w\\
&=\frac1\pi.
\end{aligned}
$$

よって

$$
\boxed{W\sim U(-\pi/2,\pi/2)}.
$$

### 3. 一様乱数から標準Cauchy乱数を生成する

$U\sim U(0,1)$ なら線形変換

$$
W=\pi\left(U-\frac12\right)
$$

は $U(-\pi/2,\pi/2)$ に従う。第2問の逆変換 $X=\tan W$ を使えば

$$
\boxed{X=\tan\left\{\pi\left(U-\frac12\right)\right\}}
$$

は標準Cauchy分布に従う。

### 4. $t_1$ とCauchyの関係

$V=Z_2^2$ とおくと

$$
V\sim\chi_1^2.
$$

また $Z_1$ と $Z_2$ は独立なので、$Z_1$ と $V=Z_2^2$ も独立である。Studentの $t$ 分布の定義から

$$
\frac{Z_1}{\sqrt{V/1}}
=\frac{Z_1}{|Z_2|}
\sim t_1.
$$

一方、$Z_2$ の符号を $S\in\{-1,1\}$ とすれば

$$
Z_2=S|Z_2|,
$$

したがって

$$
\frac{Z_1}{Z_2}
=\frac{SZ_1}{|Z_2|}.
$$

標準正規分布は符号反転に対して対称であり、$S$ は $Z_1$ と独立なので

$$
SZ_1\overset d=Z_1.
$$

従って

$$
\frac{Z_1}{Z_2}
\overset d=
\frac{Z_1}{|Z_2|}.
$$

第1問で左辺は標準Cauchy分布だったから

$$
\boxed{t_1=\text{標準Cauchy分布}}.
$$

## 本番答案

独立性から

$$
f_{Z_1,Z_2}(z_1,z_2)
=\frac1{2\pi}e^{-(z_1^2+z_2^2)/2}.
$$

$(X,V)=(Z_1/Z_2,Z_2)$ と置くと $z_1=xv,z_2=v$、ヤコビアンは $|v|$。よって

$$
f_X(x)
=\frac1{2\pi}\int_{-\infty}^{\infty}|v|e^{-(1+x^2)v^2/2}dv
=\frac1{\pi(1+x^2)}.
$$

さらに $W=\arctan X$ では

$$
f_W(w)=f_X(\tan w)\sec^2w=\frac1\pi,
$$

より $W\sim U(-\pi/2,\pi/2)$。したがって

$$
X=\tan\{\pi(U-1/2)\}.
$$

また $Z_2^2\sim\chi_1^2$ と標準正規分布の符号対称性から $t_1$ は標準Cauchy分布である。

## 採点基準

- 同時正規密度と変数変換からCauchy密度を導出: 6点
- $\arctan$ 変換: 5点
- 逆関数法: 5点
- $t_1$ との接続: 4点
