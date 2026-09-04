# Core 22 ポアソン最尤推定量・Fisher情報・信頼区間

- 旧No.: 49
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_1,\ldots,X_n$ は独立にポアソン分布に従い、その確率質量関数を

$$
P_\lambda(X_i=x)
=\frac{e^{-\lambda}\lambda^x}{x!},
\qquad x=0,1,2,\ldots,
\qquad \lambda\ge0
$$

とする。フィッシャー情報量・漸近分布・Wald信頼区間については真値 $\lambda>0$ を仮定する。

1. 上の確率質量関数から尤度を作り、$\lambda$ の最尤推定量を求めよ。
2. $\lambda$ に関する1標本および $n$ 標本のフィッシャー情報量を求めよ。
3. 最尤推定量の漸近分布を求めよ。
4. $n=100$, $\sum_{i=1}^nX_i=400$ のとき、$z_{0.975}=1.96$ を用いた95% Wald信頼区間を求めよ。

## 詳細解答

### 1. 確率質量関数から最尤推定量を求める

観測値を $x_1,\ldots,x_n$ とする。各観測の確率質量関数は

$$
P_\lambda(X_i=x_i)
=\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}.
$$

観測値を固定して未知母数 $\lambda$ の関数として見ると、独立性から尤度は各確率の積である。

$$
\begin{aligned}
L(\lambda;x_1,\ldots,x_n)
&=\prod_{i=1}^n
\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}\\
&=\frac{e^{-n\lambda}\lambda^{\sum_{i=1}^n x_i}}
{\prod_{i=1}^n x_i!}.
\end{aligned}
$$

$\lambda>0$ で対数を取ると

$$
\begin{aligned}
\ell(\lambda)
&=\log L(\lambda)\\
&=-n\lambda
+\left(\sum_{i=1}^n x_i\right)\log\lambda
-\sum_{i=1}^n\log(x_i!).
\end{aligned}
$$

最後の項

$$
-\sum_{i=1}^n\log(x_i!)
$$

は観測値だけで決まり、未知母数 $\lambda$ を含まない。したがって $\lambda$ で微分すると0になるが、詳細解答ではこの確認をしてから省略する。

1回微分すると

$$
\ell'(\lambda)
=-n+\frac{\sum_{i=1}^n x_i}{\lambda}.
$$

$\sum x_i>0$ のとき、内部の停留点は

$$
-n+\frac{\sum x_i}{\lambda}=0
$$

から

$$
\lambda=\frac1n\sum_{i=1}^nx_i=\bar x.
$$

さらに

$$
\ell''(\lambda)
=-\frac{\sum_{i=1}^n x_i}{\lambda^2}<0
$$

なので、この停留点は最大点である。

一方、$\sum x_i=0$ なら全ての $x_i=0$ であり、尤度は

$$
L(\lambda)=e^{-n\lambda}
$$

となる。これは $\lambda\ge0$ で単調減少なので、最大値は境界 $\lambda=0$ で取る。この場合も $\bar x=0$ である。

したがって全標本について

$$
\boxed{\widehat\lambda=\bar X}.
$$

ここで「最尤推定では境界を含む母数空間 $\lambda\ge0$」と、「通常の正則漸近論では真値を内部点 $\lambda>0$ に置く」ことを区別する。

### 2. フィッシャー情報量

以下は $\lambda>0$ とする。1標本 $X$ について

$$
P_\lambda(X=x)
=\frac{e^{-\lambda}\lambda^x}{x!}
$$

なので、1標本の対数尤度は

$$
\ell_1(\lambda)
=-\lambda+X\log\lambda-\log(X!).
$$

これを $\lambda$ で微分すると、スコアは

$$
\begin{aligned}
U_1(\lambda)
&=\frac{\partial\ell_1(\lambda)}{\partial\lambda}\\
&=-1+\frac{X}{\lambda}\\
&=\frac{X-\lambda}{\lambda}.
\end{aligned}
$$

フィッシャー情報量を

$$
I_1(\lambda)=E_\lambda[U_1(\lambda)^2]
$$

で計算する。ポアソン分布では

$$
E[X]=\lambda,
\qquad
\operatorname{Var}(X)=\lambda
$$

だから

$$
E[(X-\lambda)^2]=\lambda.
$$

したがって

$$
\begin{aligned}
I_1(\lambda)
&=E_\lambda\left[
\frac{(X-\lambda)^2}{\lambda^2}
\right]\\
&=\frac{1}{\lambda^2}E_\lambda[(X-\lambda)^2]\\
&=\frac{\lambda}{\lambda^2}\\
&=\boxed{\frac1\lambda}.
\end{aligned}
$$

独立な $n$ 標本ではスコアが各標本のスコアの和になり、各スコアの期待値は0なので、独立性から情報量は加法的である。したがって

$$
\boxed{I_n(\lambda)=\frac n\lambda}.
$$

ポアソン分布の支持 $\{0,1,2,\ldots\}$ は $\lambda$ に依存せず、真値は内部点 $\lambda>0$ にあり、必要な微分と和の交換が許される通常の正則条件を満たす。

### 3. 漸近分布：中心極限定理と Slutsky の定理を使う

本問では

$$
\widehat\lambda=\bar X
$$

なので、一般の最尤推定量の漸近正規性定理を使わず、標本平均の中心極限定理を直接使える。

$X_i$ は独立同分布で

$$
E[X_i]=\lambda,
\qquad
\operatorname{Var}(X_i)=\lambda<\infty
$$

だから、Lindeberg–Lévy の中心極限定理より

$$
\frac{\sqrt n(\bar X-\lambda)}{\sqrt\lambda}
\xrightarrow{d}N(0,1).
$$

同値な形で

$$
\boxed{
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda)
}.
$$

また大数の法則から

$$
\widehat\lambda=\bar X\xrightarrow{p}\lambda.
$$

$\lambda>0$ なので $\sqrt{x}$ は真値の近くで連続であり、

$$
\sqrt{\widehat\lambda}\xrightarrow{p}\sqrt\lambda.
$$

よって Slutsky の定理により、未知の $\lambda$ を標準誤差の中で $\widehat\lambda$ に置き換えてよい。

真値が境界 $\lambda=0$ の場合、ポアソン分布は0に退化するため、この通常の正規漸近近似の設定ではない。

### 4. Wald信頼区間

与えられたデータでは

$$
\widehat\lambda
=\frac{400}{100}=4.
$$

漸近分散は $\lambda/n$ なので、$\lambda$ を $\widehat\lambda$ で置き換えた標準誤差は

$$
\widehat{\operatorname{SE}}
=\sqrt{\frac{\widehat\lambda}{n}}
=\sqrt{\frac4{100}}
=0.2.
$$

したがって95% Wald信頼区間は

$$
\begin{aligned}
\widehat\lambda
\pm z_{0.975}\widehat{\operatorname{SE}}
&=4\pm1.96\times0.2\\
&=4\pm0.392.
\end{aligned}
$$

よって

$$
\boxed{(3.608,4.392)}.
$$

これは漸近的な ワルド信頼区間であり、有限標本での正確区間ではない。標本が小さい、または $\lambda$ が小さいと、対称な ワルド信頼区間が0未満へはみ出すことがある。

## 本番答案

独立性から

$$
L(\lambda)
=\prod_{i=1}^n\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}
=\frac{e^{-n\lambda}\lambda^{\sum x_i}}{\prod x_i!}.
$$

したがって $\lambda>0$ では

$$
\ell(\lambda)
=-n\lambda+(\sum x_i)\log\lambda-\sum\log(x_i!),
$$

$$
\ell'(\lambda)=-n+\frac{\sum x_i}{\lambda}.
$$

$\sum x_i>0$ では $\widehat\lambda=\bar x$、全観測0では尤度 $e^{-n\lambda}$ が境界0で最大なので、常に

$$
\boxed{\widehat\lambda=\bar X}.
$$

1標本のスコアは

$$
U_1(\lambda)=\frac{X-\lambda}{\lambda},
$$

したがって

$$
I_1(\lambda)
=\frac{E[(X-\lambda)^2]}{\lambda^2}
=\frac1\lambda,
\qquad
I_n(\lambda)=\frac n\lambda.
$$

また中心極限定理より

$$
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda).
$$

$n=100$, $\widehat\lambda=4$ では

$$
\widehat{\operatorname{SE}}
=\sqrt{4/100}=0.2,
$$

よって95% Wald信頼区間は

$$
4\pm1.96(0.2)
=\boxed{(3.608,4.392)}.
$$

## 採点基準

- 確率質量関数から尤度・対数尤度を作り、最尤推定量を導く（内部点と境界の区別を含む）: 5点
- スコアからフィッシャー情報量を導く: 5点
- 中心極限定理・Slutsky の定理の条件確認と漸近分布: 5点
- Wald信頼区間: 5点
