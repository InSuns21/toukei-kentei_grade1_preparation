# 30分ドリル

- 制限時間: 30分
- 目標: 一つの標本モデルで変数変換、尤度、最大化、共分散行列をつなぐ
- level: C

## 過去問傾向との対応

MATH-2024-Q1とMATH-2021-Q5に現れる微分、尤度、線形変換、共分散行列の答案部品を、一つのデータ生成モデルで連結する。分布、数値、設問は独自であり、過去問原文の再現ではない。基礎章なので、必要な確率公式は設問内で与え、導出と再利用を問う。

## F0-DRILL-01 問題

$\theta>0$とし、確率変数$X$の密度を
$$
f_\theta(x)=\theta x^{\theta-1}\boldsymbol{1}_{(0,1)}(x)
$$
とする。$n\geq2$とし、$X_1,\ldots,X_n$は独立同分布標本であり、$Y_i=-\log X_i$とおく。

1. $f_\theta$が密度であることを確認せよ。（10点）
2. $Y_i$の密度を変数変換で求め、$E[Y_i]=1/\theta$、$\operatorname{Var}(Y_i)=1/\theta^2$を積分で示せ。（25点）
3. $Y_1,\ldots,Y_n$の尤度と対数尤度を書き、$\theta$の最尤推定量を求めよ。（20点）
4. 得られた停留点が一意な大域的最大点であることを示せ。（15点）
5. $\boldsymbol Z=(Y_1,Y_1+Y_2)^{\mathsf T}$の共分散行列を求め、その固有値が
$$
\frac{3+\sqrt5}{2\theta^2},\qquad \frac{3-\sqrt5}{2\theta^2}
$$
であることを示し、正定値性を確認せよ。（30点）

## 詳細解答

### (1)

$\theta>0$なので$x^{\theta-1}$は0の近くで可積分であり、
$$
\int_{\mathbb R}f_\theta(x)\,dx
=\theta\int_0^1x^{\theta-1}\,dx
=\theta\left[\frac{x^\theta}{\theta}\right]_0^1=1.
$$
非負性も成り立つから$f_\theta$は密度である。

### (2)

$y=-\log x$の逆変換は$x=e^{-y}$、像は$y>0$、Jacobian絶対値は$e^{-y}$である。従って
$$
f_Y(y)=\theta(e^{-y})^{\theta-1}e^{-y}\boldsymbol{1}_{(0,\infty)}(y)
=\theta e^{-\theta y}\boldsymbol{1}_{(0,\infty)}(y).
$$
部分積分により
$$
E[Y]=\int_0^\infty y\theta e^{-\theta y}\,dy
=\left[-ye^{-\theta y}\right]_0^\infty+\int_0^\infty e^{-\theta y}\,dy
=\frac1\theta.
$$
同様に
$$
\begin{aligned}
E[Y^2]
&=\int_0^\infty y^2\theta e^{-\theta y}\,dy\\
&=\left[-y^2e^{-\theta y}\right]_0^\infty+2\int_0^\infty ye^{-\theta y}\,dy\\
&=\frac{2}{\theta^2}.
\end{aligned}
$$
よって
$$
\operatorname{Var}(Y)=E[Y^2]-E[Y]^2=\frac1{\theta^2}.
$$

### (3)

観測値$y_i>0$に対し
$$
L(\theta)=\prod_{i=1}^n\theta e^{-\theta y_i}
=\theta^n\exp\left(-\theta\sum_{i=1}^ny_i\right).
$$
従って
$$
\ell(\theta)=n\log\theta-\theta\sum_{i=1}^ny_i,
\qquad
\ell'(\theta)=\frac n\theta-\sum_{i=1}^ny_i.
$$
各$y_i>0$なので、停留点はパラメータ空間内の
$$
\widehat\theta=\frac n{\sum_{i=1}^ny_i}
=-\frac n{\sum_{i=1}^n\log x_i}
$$
である。

### (4)

$$
\ell''(\theta)=-\frac n{\theta^2}<0
$$
なので、$\ell$は$(0,\infty)$上で狭義凹である。従って停留点$\widehat\theta$は一意な大域的最大点である。

### (5)

$Y_1,Y_2$は独立で分散$1/\theta^2$だから
$$
\begin{aligned}
\operatorname{Var}(Y_1)&=\frac1{\theta^2},\\
\operatorname{Cov}(Y_1,Y_1+Y_2)&=\operatorname{Var}(Y_1)=\frac1{\theta^2},\\
\operatorname{Var}(Y_1+Y_2)&=\frac2{\theta^2}.
\end{aligned}
$$
従って
$$
\operatorname{Cov}(\boldsymbol Z)
=\frac1{\theta^2}
\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$
$\boldsymbol A=\begin{pmatrix}1&1\\1&2\end{pmatrix}$とおくと
$$
\det(\boldsymbol A-\lambda\boldsymbol I_2)
=(1-\lambda)(2-\lambda)-1
=\lambda^2-3\lambda+1.
$$
従って$\boldsymbol A$の固有値は$(3\pm\sqrt5)/2$であり、共分散行列の固有値は設問の二値である。$\theta>0$かつ$3>\sqrt5$なので両固有値は正であり、共分散行列は正定値である。

## 完成形の本番答案

$$
\int_{\mathbb R}f_\theta(x)\,dx
=\theta\int_0^1x^{\theta-1}\,dx=1.
$$
$x=e^{-y}$、$y>0$、$|dx/dy|=e^{-y}$より
$$
f_Y(y)=\theta e^{-\theta y}\boldsymbol{1}_{(0,\infty)}(y).
$$
部分積分から$E[Y]=1/\theta$、$E[Y^2]=2/\theta^2$、従って$\operatorname{Var}(Y)=1/\theta^2$。

また
$$
\ell(\theta)=n\log\theta-\theta\sum_i y_i,
\qquad
\widehat\theta=\frac n{\sum_i y_i}=-\frac n{\sum_i\log x_i}.
$$
$\ell''(\theta)=-n/\theta^2<0$より、これは一意な大域的最大点である。

独立性と前問の分散から
$$
\operatorname{Cov}(\boldsymbol Z)
=\frac1{\theta^2}\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$
括弧内の特性多項式は$\lambda^2-3\lambda+1$なので、固有値は$(3\pm\sqrt5)/(2\theta^2)$。両方正であるから正定値である。

## 採点基準・時間配分・選択判断

正規化10点、変換と2モーメント25点、尤度とMLE20点、最大性15点、共分散行列・固有値・正定値性30点。初動3分、(1)2分、(2)7分、(3)5分、(4)3分、(5)7分、見直し3分。3分で逆変換と台が見えれば選択する。15分で指数密度と2モーメントまで得られれば継続する。25分で固有値計算が残った場合も、共分散行列と特性多項式を答案に残して部分点を確保する。

## 復習カード

1. 密度は非負性と全体積分1を確認する。
2. 変数変換は逆変換、像、Jacobianの順に書く。
3. 部分積分では境界項の極限を確認する。
4. 対数尤度にはパラメータ空間を書く。
5. スコア方程式だけでは最大性を保証しない。
6. 二階微分の符号から大域的な凹性を確認する。
7. 前問のモーメントを共分散行列へ再利用する。
8. 独立なら共分散は0である。
9. 対称行列の正定値性は固有値で判定できる。
10. 25分時点では特性多項式までを必ず残す。
