# Core 18 逆分散重み付き推定・最良線形不偏推定量・最尤推定量・クラーメル・ラオ下限

- 旧No.: 57
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立な $X_i$ の確率密度関数を

$$
f_i(x;\mu)
=\frac{1}{\sqrt{2\pi\sigma_i^2}}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma_i^2}\right\},
\qquad -\infty<x<\infty
$$

とする。各 $\sigma_i^2>0$ は既知で、共通平均 $\mu$ が未知である。

1. 線形推定量 $T=\sum_iw_iX_i$ が $\mu$ の不偏推定量となる条件を述べよ。
2. その条件の下で $\operatorname{Var}(T)$ を最小にする重みを、Lagrange 乗数法の計算を示して求めよ。
3. 上の確率密度関数から尤度・対数尤度を作り、この推定量が最尤推定量でもあることを示せ。
4. $(\sigma_1^2,\sigma_2^2,\sigma_3^2)=(1,4,9)$ のとき重みと分散を求め、クラーメル・ラオ下限と一致することを、フィッシャー情報量の導出と定理の適用条件も含めて確認せよ。

## 詳細解答

### 1. 不偏条件

線形推定量を

$$
T=\sum_iw_iX_i
$$

とする。期待値の線形性から

$$
\begin{aligned}
E[T]
&=E\left[\sum_iw_iX_i\right]\\
&=\sum_iw_iE[X_i]\\
&=\mu\sum_iw_i.
\end{aligned}
$$

全ての $\mu$ に対して $E[T]=\mu$ とするための必要十分条件は

$$
\boxed{\sum_iw_i=1}.
$$

### 2. 分散を最小にする重み

独立性から $i\ne j$ では $\operatorname{Cov}(X_i,X_j)=0$ なので

$$
\begin{aligned}
\operatorname{Var}(T)
&=\operatorname{Var}\left(\sum_iw_iX_i\right)\\
&=\sum_iw_i^2\operatorname{Var}(X_i)
+2\sum_{i<j}w_iw_j\operatorname{Cov}(X_i,X_j)\\
&=\sum_iw_i^2\sigma_i^2.
\end{aligned}
$$

制約 $\sum_iw_i=1$ の下でこの分散を最小化する。Lagrange 関数を

$$
\mathcal L(w_1,\ldots,w_n,\lambda)
=\sum_iw_i^2\sigma_i^2
-\lambda\left(\sum_iw_i-1\right)
$$

と置く。各 $w_i$ で偏微分すると

$$
\frac{\partial\mathcal L}{\partial w_i}
=2w_i\sigma_i^2-\lambda.
$$

1次条件から

$$
2w_i\sigma_i^2-\lambda=0,
$$

したがって

$$
w_i=\frac{\lambda}{2\sigma_i^2}.
$$

これを制約へ代入すると

$$
1=\sum_iw_i
=\frac\lambda2\sum_i\sigma_i^{-2}.
$$

よって

$$
\lambda
=\frac{2}{\sum_j\sigma_j^{-2}}.
$$

したがって

$$
\boxed{
w_i
=\frac{\sigma_i^{-2}}
{\sum_j\sigma_j^{-2}}
}.
$$

目的関数の Hessian は対角行列

$$
2\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)
$$

で、全ての $\sigma_i^2>0$ だから正定値である。したがって上の停留点は制約集合上の唯一の最小点である。

最小分散そのものも計算する。$A=\sum_j\sigma_j^{-2}$ と置くと

$$
\begin{aligned}
\operatorname{Var}(T)
&=\sum_i\left(\frac{\sigma_i^{-2}}{A}\right)^2\sigma_i^2\\
&=\frac1{A^2}\sum_i\sigma_i^{-2}\\
&=\boxed{\frac1A
=\left(\sum_i\sigma_i^{-2}\right)^{-1}}.
\end{aligned}
$$

これで、線形不偏推定量の中で最小分散を持つことを直接示した。

### 3. 確率密度関数から最尤推定量を導く

観測値を $x_1,\ldots,x_n$ とする。独立性から同時確率密度関数、したがって尤度は

$$
\begin{aligned}
L(\mu;x_1,\ldots,x_n)
&=\prod_i f_i(x_i;\mu)\\
&=\prod_i
\frac{1}{\sqrt{2\pi\sigma_i^2}}
\exp\left\{-\frac{(x_i-\mu)^2}{2\sigma_i^2}\right\}.
\end{aligned}
$$

対数を取ると

$$
\begin{aligned}
\ell(\mu)
&=\sum_i\log f_i(x_i;\mu)\\
&=-\frac12\sum_i\log(2\pi\sigma_i^2)
-\frac12\sum_i\frac{(x_i-\mu)^2}{\sigma_i^2}.
\end{aligned}
$$

第1項は既知の $\sigma_i^2$ と定数だけからなり、未知母数 $\mu$ を含まないので、$\mu$ で微分すると0になる。

第2項を1項ずつ微分すると

$$
\begin{aligned}
\frac{d}{d\mu}
\left[-\frac12\frac{(x_i-\mu)^2}{\sigma_i^2}\right]
&=-\frac{1}{2\sigma_i^2}\cdot2(x_i-\mu)(-1)\\
&=\frac{x_i-\mu}{\sigma_i^2}.
\end{aligned}
$$

したがって

$$
\ell'(\mu)
=\sum_i\frac{x_i-\mu}{\sigma_i^2}.
$$

1次条件 $\ell'(\mu)=0$ は

$$
\sum_i\frac{x_i}{\sigma_i^2}
-\mu\sum_i\frac1{\sigma_i^2}=0.
$$

よって

$$
\boxed{
\widehat\mu
=\frac{\sum_i x_i/\sigma_i^2}
{\sum_i1/\sigma_i^2}
}.
$$

さらに

$$
\ell''(\mu)
=-\sum_i\frac1{\sigma_i^2}<0
$$

なので、この停留点は唯一の最大点である。これは第2問で求めた重み付き推定量と一致する。

### 4. フィッシャー情報量・クラーメル・ラオ下限・数値例

1観測 $X_i$ に対応する対数尤度は

$$
\ell_i(\mu)
=-\frac12\log(2\pi\sigma_i^2)
-\frac{(X_i-\mu)^2}{2\sigma_i^2}.
$$

したがってスコアは

$$
U_i(\mu)
=\frac{X_i-\mu}{\sigma_i^2}.
$$

フィッシャー情報量の定義から

$$
\begin{aligned}
I_i(\mu)
&=E[U_i(\mu)^2]\\
&=\frac{E[(X_i-\mu)^2]}{\sigma_i^4}\\
&=\frac{\sigma_i^2}{\sigma_i^4}\\
&=\frac1{\sigma_i^2}.
\end{aligned}
$$

独立性から全標本のスコアは $U(\mu)=\sum_iU_i(\mu)$。各 $U_i$ の期待値は0で、異なる観測のスコア同士も独立なので

$$
\begin{aligned}
I(\mu)
&=E\left[\left(\sum_iU_i\right)^2\right]\\
&=\sum_iE[U_i^2]
+2\sum_{i<j}E[U_i]E[U_j]\\
&=\boxed{\sum_i\frac1{\sigma_i^2}}.
\end{aligned}
$$

ここでクラーメル・ラオ不等式を使う。本問では

- 各確率密度関数の支持は $\mathbb R$ で $\mu$ に依存しない。
- 正規密度は $\mu$ について滑らかである。
- $\mu\in\mathbb R$ は開母数空間の内部点である。
- 必要な微分と積分の交換が許される通常の正則条件を満たす。
- 各 $\sigma_i^2>0$ だから $0<I(\mu)<\infty$ である。
- 第1問で $\widehat\mu$ の不偏性を確認している。

したがって

$$
\operatorname{Var}(\widehat\mu)
\ge\frac1{I(\mu)}
=\left(\sum_i\sigma_i^{-2}\right)^{-1}.
$$

第2問で求めた分散はちょうどこの値なので、クラーメル・ラオ下限を達成する。

数値例では

$$
\sum_i\sigma_i^{-2}
=1+\frac14+\frac19
=\frac{36+9+4}{36}
=\frac{49}{36}.
$$

したがって

$$
w_1=\frac{1}{49/36}=\frac{36}{49},
$$

$$
w_2=\frac{1/4}{49/36}=\frac9{49},
$$

$$
w_3=\frac{1/9}{49/36}=\frac4{49}.
$$

よって

$$
\boxed{(w_1,w_2,w_3)
=\left(\frac{36}{49},\frac9{49},\frac4{49}\right)}
$$

であり、分散は

$$
\boxed{
\operatorname{Var}(\widehat\mu)
=\left(\frac{49}{36}\right)^{-1}
=\frac{36}{49}
}.
$$

## 本番答案

$$
E\left[\sum_iw_iX_i\right]
=\mu\sum_iw_i
$$

より不偏条件は $\sum_iw_i=1$。また独立性から

$$
\operatorname{Var}\left(\sum_iw_iX_i\right)
=\sum_iw_i^2\sigma_i^2.
$$

Lagrange 関数を微分すると

$$
2w_i\sigma_i^2-\lambda=0,
$$

したがって

$$
w_i=\frac{\sigma_i^{-2}}{\sum_j\sigma_j^{-2}}.
$$

問題文の正規密度から

$$
\ell(\mu)
=-\frac12\sum_i\log(2\pi\sigma_i^2)
-\frac12\sum_i\frac{(x_i-\mu)^2}{\sigma_i^2},
$$

$$
\ell'(\mu)
=\sum_i\frac{x_i-\mu}{\sigma_i^2}=0,
$$

より同じ推定量を得る。

また

$$
U_i(\mu)=\frac{X_i-\mu}{\sigma_i^2},
\qquad
I_i(\mu)=\frac1{\sigma_i^2},
$$

だから

$$
I(\mu)=\sum_i\sigma_i^{-2}.
$$

支持は母数非依存、密度は滑らか、$\mu$ は内部点、情報量は有限正なのでクラーメル・ラオ不等式を適用でき、下限は $1/I(\mu)$。本推定量の分散はこれに一致する。

$(1,4,9)$ なら

$$
(w_1,w_2,w_3)=\frac1{49}(36,9,4),
\qquad
\operatorname{Var}(\widehat\mu)=\frac{36}{49}.
$$

## 採点基準

- 不偏条件と独立性からの分散: 3点
- Lagrange乗数法の途中式・最適重み・最小分散: 6点
- 確率密度関数から尤度・対数尤度・微分・最尤推定量: 5点
- フィッシャー情報量の導出・クラーメル・ラオ条件確認・数値例: 6点
