# Standard 11 二値化正規・相関減衰

- 旧No.: 29
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(X,Y)$ は平均0、分散1、相関係数 $\rho$（$|\rho|<1$）の2変量正規分布とし、その同時確率密度関数を

$$
f_{X,Y}(x,y)
=
\frac{1}{2\pi\sqrt{1-\rho^2}}
\exp\left[
-\frac{x^2-2\rho xy+y^2}{2(1-\rho^2)}
\right]
$$

とする。さらに

$$
A=\boldsymbol1_{\{X>0\}},
\qquad
B=\boldsymbol1_{\{Y>0\}}
$$

とする。

1. $E[A]$, $\operatorname{Var}(A)$ を求めよ。
2. 次の2変量正規の四分円確率公式を用いて $\operatorname{Corr}(A,B)$ を求めよ。

$$
P(X>0,Y>0)
=\frac14+\frac{1}{2\pi}\arcsin\rho.
$$

3. $\rho=1/2$ の場合を求め、元の相関と二値化後の相関を比較せよ。

## 詳細解答

### 1. 指示変数 $A$ の平均と分散

$X\sim N(0,1)$ は0について対称なので

$$
P(X>0)=\frac12.
$$

$A$ は $X>0$ のとき1、それ以外で0を取るから

$$
A\sim\operatorname{Bernoulli}\left(\frac12\right).
$$

したがって

$$
E[A]=\frac12.
$$

また指示変数では $A^2=A$ なので

$$
E[A^2]=E[A]=\frac12.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(A)
&=E[A^2]-E[A]^2\\
&=\frac12-\frac14\\
&=\boxed{\frac14}.
\end{aligned}
$$

$Y$ についても同様に

$$
E[B]=\frac12,
\qquad
\operatorname{Var}(B)=\frac14.
$$

### 2. 二値化後の相関係数

まず

$$
AB
=\boldsymbol1_{\{X>0\}}\boldsymbol1_{\{Y>0\}}
=\boldsymbol1_{\{X>0,Y>0\}}.
$$

したがって

$$
E[AB]=P(X>0,Y>0).
$$

よって共分散は

$$
\begin{aligned}
\operatorname{Cov}(A,B)
&=E[AB]-E[A]E[B]\\
&=P(X>0,Y>0)-\frac14.
\end{aligned}
$$

与えられた四分円確率公式を代入すると

$$
\operatorname{Cov}(A,B)
=\frac{1}{2\pi}\arcsin\rho.
$$

一方、相関係数の分母は

$$
\sqrt{\operatorname{Var}(A)\operatorname{Var}(B)}
=\sqrt{\frac14\cdot\frac14}
=\frac14.
$$

したがって

$$
\begin{aligned}
\operatorname{Corr}(A,B)
&=\frac{(2\pi)^{-1}\arcsin\rho}{1/4}\\
&=\boxed{\frac{2}{\pi}\arcsin\rho}.
\end{aligned}
$$

ここで「元の連続変数の相関 $\rho$」と「符号だけ残した二値変数の相関」は同じではないことが分かる。

### 3. $\rho=1/2$ の場合

$$
\arcsin\left(\frac12\right)=\frac\pi6
$$

なので

$$
\operatorname{Corr}(A,B)
=\frac2\pi\cdot\frac\pi6
=\boxed{\frac13}.
$$

元の相関係数は

$$
\rho=\frac12
$$

だったのに対し、二値化後は

$$
\frac13
$$

まで小さくなった。$A,B$ は $X,Y$ の大きさを捨てて「正か負か」だけを残しているため、線形関係に関する情報の一部が失われる。

なお一般にも

$$
\operatorname{Corr}(A,B)=\frac2\pi\arcsin\rho
$$

は $\rho$ と同符号である。特に $\rho=0$ なら二値化後も相関0である。

## 本番答案

対称性から

$$
A,B\sim\operatorname{Bernoulli}(1/2),
$$

したがって

$$
E[A]=E[B]=\frac12,
\qquad
\operatorname{Var}(A)=\operatorname{Var}(B)=\frac14.
$$

また

$$
AB=\boldsymbol1_{\{X>0,Y>0\}}
$$

だから

$$
\begin{aligned}
\operatorname{Cov}(A,B)
&=P(X>0,Y>0)-\frac14\\
&=\frac{1}{2\pi}\arcsin\rho.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Corr}(A,B)
=\frac{2}{\pi}\arcsin\rho
}.
$$

$\rho=1/2$ では

$$
\operatorname{Corr}(A,B)
=\frac2\pi\cdot\frac\pi6
=\boxed{\frac13}.
$$

元の $1/2$ より小さく、符号への二値化で情報が失われる。

## 採点基準

- 指示変数が Bernoulli になる理由・モーメント: 5点
- $AB$ と四分円事象の対応: 4点
- 共分散から相関への計算: 7点
- $\rho=1/2$ の特殊値と解釈: 4点
