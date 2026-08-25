# Core 06 Cramér–Rao下限・効率性

- 旧No.: 42
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は互いに独立に、平均 $\mu$、既知の分散 $\sigma^2$ の正規分布に従うとする。すなわち各 $X_i$ の確率密度関数は

$$
f(x;\mu)
=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\},
\qquad -\infty<x<\infty
$$

である。$\mu$ を未知母数とする。

1. 上の確率密度関数から、1標本および $n$ 標本の $\mu$ に関するフィッシャー情報量を求めよ。
2. $\mu$ の不偏推定量に対する Cramér–Rao 下限を求め、$\bar X$ が効率的であることを示せ。
3. $\mu^2$ を推定する不偏推定量

$$
T=\bar X^2-\frac{\sigma^2}{n}
$$

について、$\operatorname{Var}(T)$ を求めよ。
4. $\mu^2$ を推定する場合の Cramér–Rao 下限と比較せよ。

## 詳細解答

### 1. 確率密度関数からフィッシャー情報量を求める

まず「密度」「尤度」「対数尤度」を順に作る。

観測値を $X=x$ とする。問題文で与えられた確率密度関数は

$$
f(x;\mu)
=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.
$$

$x$ を固定して、これを未知母数 $\mu$ の関数として見たものが1標本の尤度である。したがって

$$
L_1(\mu;x)
=f(x;\mu)
=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.
$$

対数を取ると

$$
\begin{aligned}
\ell_1(\mu)
&=\log L_1(\mu;x)\\
&=\log\left(\frac{1}{\sqrt{2\pi\sigma^2}}\right)
-\frac{(x-\mu)^2}{2\sigma^2}\\
&=-\frac12\log(2\pi\sigma^2)
-\frac{(x-\mu)^2}{2\sigma^2}.
\end{aligned}
$$

ここで初めて、第1項 $-\frac12\log(2\pi\sigma^2)$ は $\mu$ を含まないことが分かる。したがって $\mu$ で微分するとこの項は0になる。

スコア、すなわち対数尤度を $\mu$ で微分したものは

$$
U_1(\mu)
=\frac{\partial}{\partial\mu}\ell_1(\mu).
$$

二乗項を丁寧に微分すると

$$
\begin{aligned}
\frac{\partial}{\partial\mu}
\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}
&=-\frac{1}{2\sigma^2}\cdot 2(x-\mu)\cdot(-1)\\
&=\frac{x-\mu}{\sigma^2}.
\end{aligned}
$$

よって

$$
\boxed{
U_1(\mu)=\frac{X-\mu}{\sigma^2}
}.
$$

フィッシャー情報量の定義

$$
I_1(\mu)
=E_\mu\left[U_1(\mu)^2\right]
$$

を使う。正規分布の平均と分散から

$$
E_\mu[(X-\mu)^2]=\sigma^2
$$

なので

$$
\begin{aligned}
I_1(\mu)
&=E_\mu\left[
\frac{(X-\mu)^2}{\sigma^4}
\right]\\
&=\frac{1}{\sigma^4}E_\mu[(X-\mu)^2]\\
&=\boxed{\frac1{\sigma^2}}.
\end{aligned}
$$

次に $n$ 標本を考える。独立性から同時確率密度関数、したがって尤度は各密度の積である。

$$
\begin{aligned}
L_n(\mu;x_1,\ldots,x_n)
&=\prod_{i=1}^n f(x_i;\mu)\\
&=(2\pi\sigma^2)^{-n/2}
\exp\left\{
-\frac{1}{2\sigma^2}
\sum_{i=1}^n(x_i-\mu)^2
\right\}.
\end{aligned}
$$

したがって対数尤度は

$$
\ell_n(\mu)
=-\frac n2\log(2\pi\sigma^2)
-\frac{1}{2\sigma^2}
\sum_{i=1}^n(x_i-\mu)^2.
$$

1回微分すると

$$
U_n(\mu)
=\frac{1}{\sigma^2}
\sum_{i=1}^n(X_i-\mu),
$$

さらにもう1回微分すると

$$
\frac{\partial^2\ell_n(\mu)}{\partial\mu^2}
=-\frac n{\sigma^2}.
$$

正規モデルでは

$$
I_n(\mu)
=-E_\mu\left[
\frac{\partial^2\ell_n(\mu)}{\partial\mu^2}
\right]
$$

としてもよいので

$$
\boxed{
I_n(\mu)=\frac n{\sigma^2}
}.
$$

### 2. Cramér–Rao 下限と $\bar X$ の効率性

使うのは **Cramér–Rao 不等式**である。$W$ が $g(\mu)$ の不偏推定量、すなわち

$$
E_\mu[W]=g(\mu)
$$

を満たすとき、通常の正則条件の下で

$$
\operatorname{Var}_\mu(W)
\ge
\frac{\{g'(\mu)\}^2}{I_n(\mu)}
$$

となる。

本問では確率密度関数の支持は常に $\mathbb R$ で $\mu$ に依存せず、密度は $\mu$ について何回でも微分できる。また上で

$$
I_n(\mu)=\frac n{\sigma^2}>0
$$

を確認しているので、この正規モデルでは Cramér–Rao 不等式を適用できる。

まず $g(\mu)=\mu$ とする。このとき

$$
g'(\mu)=1
$$

だから

$$
\operatorname{Var}(W)
\ge
\frac{1}{n/\sigma^2}
=\boxed{\frac{\sigma^2}{n}}.
$$

一方、標本平均について

$$
E[\bar X]
=\frac1n\sum_{i=1}^nE[X_i]
=\mu
$$

なので $\bar X$ は不偏である。また独立性から

$$
\begin{aligned}
\operatorname{Var}(\bar X)
&=\operatorname{Var}\left(
\frac1n\sum_{i=1}^nX_i
\right)\\
&=\frac1{n^2}
\sum_{i=1}^n\operatorname{Var}(X_i)\\
&=\frac1{n^2}\cdot n\sigma^2\\
&=\frac{\sigma^2}{n}.
\end{aligned}
$$

これは Cramér–Rao 下限そのものなので

$$
\boxed{
\bar X\text{ は }\mu\text{ の効率的な不偏推定量である}
}.
$$

### 3. $\mu^2$ の不偏推定量の分散

独立な正規変数の平均なので

$$
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

ここで

$$
v=\frac{\sigma^2}{n}
$$

と置く。すると

$$
E[\bar X^2]
=\operatorname{Var}(\bar X)+\{E[\bar X]\}^2
=v+\mu^2.
$$

したがって

$$
T=\bar X^2-v
$$

について

$$
E[T]=\mu^2
$$

となり、確かに $\mu^2$ の不偏推定量である。

次に分散を求める。

$$
\operatorname{Var}(T)
=\operatorname{Var}(\bar X^2)
$$

なので、$E[\bar X^4]$ が必要になる。

一般に $Y\sim N(\mu,v)$ とし、

$$
Y=\mu+\sqrt v\,Z,
\qquad Z\sim N(0,1)
$$

と書く。標準正規分布では

$$
E[Z]=0,
\qquad E[Z^2]=1,
\qquad E[Z^3]=0.
$$

さらに標準正規分布の確率密度関数を $\phi(z)$ とすると

$$
\phi'(z)=-z\phi(z)
$$

だから、部分積分により

$$
\begin{aligned}
E[Z^4]
&=\int_{-\infty}^{\infty}z^4\phi(z)\,dz\\
&=-\int_{-\infty}^{\infty}z^3\phi'(z)\,dz\\
&=3\int_{-\infty}^{\infty}z^2\phi(z)\,dz\\
&=3.
\end{aligned}
$$

これを使って

$$
\begin{aligned}
E[Y^4]
&=E[(\mu+\sqrt v\,Z)^4]\\
&=\mu^4
+4\mu^3\sqrt v\,E[Z]
+6\mu^2vE[Z^2]
+4\mu v^{3/2}E[Z^3]
+v^2E[Z^4]\\
&=\mu^4+6\mu^2v+3v^2.
\end{aligned}
$$

また

$$
E[Y^2]=\mu^2+v
$$

なので

$$
\begin{aligned}
\operatorname{Var}(Y^2)
&=E[Y^4]-\{E[Y^2]\}^2\\
&=\mu^4+6\mu^2v+3v^2-(\mu^2+v)^2\\
&=4\mu^2v+2v^2.
\end{aligned}
$$

$Y=\bar X$、$v=\sigma^2/n$ を戻せば

$$
\boxed{
\operatorname{Var}(T)
=\frac{4\mu^2\sigma^2}{n}
+\frac{2\sigma^4}{n^2}
}.
$$

### 4. $\mu^2$ を推定するときの Cramér–Rao 下限

今度は

$$
g(\mu)=\mu^2
$$

なので

$$
g'(\mu)=2\mu.
$$

したがって Cramér–Rao 不等式から

$$
\begin{aligned}
\operatorname{Var}(W)
&\ge
\frac{(2\mu)^2}{n/\sigma^2}\\
&=\boxed{\frac{4\mu^2\sigma^2}{n}}.
\end{aligned}
$$

一方、上で求めた $T$ の分散は

$$
\operatorname{Var}(T)
=\frac{4\mu^2\sigma^2}{n}
+\frac{2\sigma^4}{n^2}.
$$

よって Cramér–Rao 下限との差は

$$
\operatorname{Var}(T)
-\frac{4\mu^2\sigma^2}{n}
=\frac{2\sigma^4}{n^2}>0.
$$

したがって $T$ はこの下限を達成しない。

なお $\mu=0$ では

$$
g'(0)=0
$$

なので Cramér–Rao 下限は0になる。しかし $\operatorname{Var}(T)=2\sigma^4/n^2>0$ であり、この点では下限が0というだけで有用な比較にならない。

## 本番答案

問題文の密度から1標本の尤度は

$$
L_1(\mu;x)
=\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.
$$

したがって

$$
\ell_1(\mu)
=-\frac12\log(2\pi\sigma^2)
-\frac{(x-\mu)^2}{2\sigma^2},
$$

$$
U_1(\mu)=\frac{X-\mu}{\sigma^2},
$$

$$
I_1(\mu)
=E\left[\frac{(X-\mu)^2}{\sigma^4}\right]
=\frac1{\sigma^2}.
$$

独立な $n$ 標本では

$$
I_n(\mu)=\frac n{\sigma^2}.
$$

よって $\mu$ の不偏推定量の Cramér–Rao 下限は $\sigma^2/n$。また

$$
E[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}
$$

なので $\bar X$ は下限を達成し、効率的である。

$v=\sigma^2/n$ と置けば $\bar X\sim N(\mu,v)$ で、標準正規分布の4次モーメント $E[Z^4]=3$ を部分積分から求めることで

$$
\operatorname{Var}(\bar X^2)
=4\mu^2v+2v^2.
$$

従って

$$
\operatorname{Var}(T)
=\frac{4\mu^2\sigma^2}{n}
+\frac{2\sigma^4}{n^2}.
$$

$g(\mu)=\mu^2$ では $g'(\mu)=2\mu$ なので Cramér–Rao 下限は

$$
\frac{4\mu^2\sigma^2}{n}.
$$

$T$ はこれより $2\sigma^4/n^2$ だけ大きい。$\mu=0$ では下限0となり、この下限だけでは有用な比較にならない。

## 採点基準

- 確率密度関数から1標本・$n$標本の尤度、対数尤度、フィッシャー情報量を導く: 5点
- Cramér–Rao不等式を適用し、$\bar X$の不偏性・分散・効率性を示す: 5点
- $T$の不偏性と分散を、正規分布の4次モーメントを含めて導く: 6点
- $\mu^2$のCramér–Rao下限との比較・$\mu=0$での退化の説明: 4点
