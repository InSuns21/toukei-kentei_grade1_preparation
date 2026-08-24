# 定義と記法

## この章で先取りする確率・推定の最小定義

本章には前提章がないため、演習に必要な用語をここで定義します。連続確率変数の確率密度関数（probability density function; PDF）$f_X$は非負で全体積分が1となる関数で、
$$
P(a<X\leq b)=\int_a^bf_X(x)\,dx
$$
により区間確率を与えます。累積分布関数（cumulative distribution function; CDF）は$F_X(x)=P(X\leq x)$です。

$E[|X|]=\int|x|f_X(x)dx<\infty$なら
$$
E[X]=\int xf_X(x)\,dx,
\qquad
\operatorname{Var}(X)=E[(X-E[X])^2]
$$
を期待値と分散と呼びます。$X_1,\ldots,X_n$が独立同分布とは、各変数が同じ分布をもち、同時確率または同時密度が各分布の積へ分解することです。

$X_1,\ldots,X_n$が独立同分布で、各変数が母数$\theta$をもつ密度$f_\theta$に従うとします。観測値$x_1,\ldots,x_n$に対し、母数$\theta$の関数
$$
L(\theta;x_1,\ldots,x_n)=\prod_{i=1}^nf_\theta(x_i)
$$
を尤度と呼びます。これをパラメータ範囲内で最大にする統計量を最尤推定量（maximum likelihood estimator; MLE）と呼びます。推定量$T$が$E[T]=\theta$を満たすとき、$T$は$\theta$の不偏推定量です。これらは後続章で体系的に学び、本章では微積分と行列計算の入力として使います。

## F0-DEF-01 台

確率変数 $X$ の確率質量関数または確率密度関数を $f_X$ とします。この章では、

$$
\mathcal{X}=\{x:f_X(x)>0\}
$$

を $X$ の台と呼びます。境界上で密度が0になるかどうかが本質でない場合は、閉包を含めて台と呼ぶ流儀もあります。答案では、積分範囲または指示関数によって実際に使う範囲を明示すれば曖昧さを避けられます。

たとえば指数分布の密度を

$$
f_\lambda(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{[0,\infty)}(x),
\qquad \lambda>0
$$

と書けば、観測値についての台は $[0,\infty)$、パラメータ空間は $(0,\infty)$ です。両者を混同してはいけません。

台がパラメータに依存する例として、一様分布

$$
f_\theta(x)=\frac{1}{\theta}\boldsymbol{1}_{[0,\theta]}(x),
\qquad \theta>0
$$

があります。このとき尤度には $\theta\geq \max_i x_i$ という制約が現れます。対数尤度を形式的に微分するだけでは最尤推定量を得られません。

## 積分可能性と期待値の存在

連続型確率変数 $X$ について、$E[g(X)]$ が有限な実数として存在するための十分な確認方法は

$$
\int_{\mathcal{X}} |g(x)|f_X(x)\,dx<\infty
$$

を示すことです。このとき

$$
E[g(X)]=\int_{\mathcal{X}}g(x)f_X(x)\,dx
$$

と定義します。正の部分と負の部分がともに無限大になる積分を、対称性によって相殺してはいけません。

## F0-DEF-02 勾配とヘッセ行列

$g:\mathbb{R}^p\to\mathbb{R}$ が各変数について偏微分可能であるとき、勾配を列ベクトル

$$
\nabla g(\boldsymbol{x})=
\begin{pmatrix}
\dfrac{\partial g}{\partial x_1}(\boldsymbol{x})\\
\vdots\\
\dfrac{\partial g}{\partial x_p}(\boldsymbol{x})
\end{pmatrix}
$$

と定めます。二階偏微分が存在するとき、ヘッセ行列（Hessian）を

$$
\nabla^2 g(\boldsymbol{x})=
\left(
\frac{\partial^2 g}{\partial x_i\partial x_j}(\boldsymbol{x})
\right)_{1\leq i,j\leq p}
$$

と定めます。勾配が0であることは内部の極値の必要条件ですが、それだけでは最大・最小を判定できません。

$g$ が点 $\boldsymbol{x}_0$ の近傍で二階連続微分可能で、$\nabla g(\boldsymbol{x}_0)=\boldsymbol{0}$ であるとします。このとき $\nabla^2g(\boldsymbol{x}_0)$ が負定値なら $\boldsymbol{x}_0$ は狭義局所最大点、正定値なら狭義局所最小点です。Hessianの符号だけでは不十分です。たとえば $g(x)=x-x^2$ は $g''(0)<0$ ですが $g'(0)\neq0$ なので、0は局所最大点ではありません。

## F0-DEF-03 ヤコビ行列とヤコビアン

写像 $T:\mathbb{R}^p\to\mathbb{R}^p$ を

$$
T(\boldsymbol{x})=
\begin{pmatrix}
T_1(\boldsymbol{x})\\
\vdots\\
T_p(\boldsymbol{x})
\end{pmatrix}
$$

とします。$T$のヤコビ行列（Jacobian matrix）は

$$
D T(\boldsymbol{x})=
\left(
\frac{\partial T_i}{\partial x_j}(\boldsymbol{x})
\right)_{1\leq i,j\leq p}
$$

です。その行列式$\det D T(\boldsymbol{x})$をヤコビアン（ヤコビ行列式）と呼びます。

確率密度の変換では、通常は逆変換$\boldsymbol{x}=T^{-1}(\boldsymbol{y})$のヤコビアンの絶対値

$$
\left|\det D T^{-1}(\boldsymbol{y})\right|
$$

を使います。絶対値を落とすこと、順変換と逆変換のヤコビアンを混同することが典型的な誤りです。

## ベクトルと行列の次元

ベクトルは列ベクトルを既定とします。$\boldsymbol{x}\in\mathbb{R}^p$ と $\boldsymbol{A}\in\mathbb{R}^{p\times p}$ に対し、

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
$$

は $1\times p$、$p\times p$、$p\times1$ の順に積を取るのでスカラーです。積の順序は一般には交換できません。

## F0-DEF-04 正定値行列と半正定値行列

実対称行列 $\boldsymbol{A}\in\mathbb{R}^{p\times p}$ が正定値であるとは、任意の $\boldsymbol{x}\neq\boldsymbol{0}$ に対して

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}>0
$$

が成り立つことです。半正定値であるとは、任意の $\boldsymbol{x}$ に対して

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}\geq0
$$

が成り立つことです。

正定値なら半正定値ですが、逆は成り立ちません。零行列は半正定値ですが正定値ではありません。共分散行列は常に半正定値ですが、確率変数間に線形従属があると正定値になりません。

## 固有値と固有ベクトル

零でないベクトル $\boldsymbol{v}$ が

$$
\boldsymbol{A}\boldsymbol{v}=\lambda\boldsymbol{v}
$$

を満たすとき、$\lambda$ を固有値、$\boldsymbol{v}$ を対応する固有ベクトルと呼びます。固有ベクトルに零ベクトルを許さない点が重要です。

## F0-DEF-05 直交射影行列

行列 $\boldsymbol{P}\in\mathbb{R}^{n\times n}$ が

$$
\boldsymbol{P}^{\mathsf T}=\boldsymbol{P},
\qquad
\boldsymbol{P}^2=\boldsymbol{P}
$$

を満たすとき、$\boldsymbol{P}$ を直交射影行列と呼びます。対称性だけ、または冪等性だけでは直交射影行列の条件として不十分です。

$\boldsymbol{P}\boldsymbol{y}$ は射影先の成分、$(\boldsymbol{I}_n-\boldsymbol{P})\boldsymbol{y}$ はそれに直交する残差成分を表します。

## F0-DEF-06 Landau記号

数列 $a_n$ と正の数列 $b_n$ に対し、$n\to\infty$ で

$$
a_n=O(b_n)
$$

とは、ある定数 $C>0$ と $N\in\mathbb{N}$ が存在し、任意の $n\geq N$ について $|a_n|\leq Cb_n$ が成り立つことです。また

$$
a_n=o(b_n)
$$

とは $a_n/b_n\to0$ が成り立つことです。確率的Landau記号 $O_p$ と $o_p$ は I2-01 で定義します。通常の $O$ と無断で混同しません。

## 答案で使う論理規約

### 必要条件と十分条件

$A\Longrightarrow B$ が成り立つとき、$A$ は $B$ の十分条件、$B$ は $A$ の必要条件です。必要十分条件を主張するには、$A\Longrightarrow B$ と $B\Longrightarrow A$ の両方が必要です。

### 同値変形

式変形の各段階が可逆なときだけ $\Longleftrightarrow$ を使います。たとえば両辺を $c$ で割る操作は $c\neq0$ のときだけ可逆です。両辺を二乗する操作は符号条件なしには一般に可逆ではありません。

### 量化順序

$$
\forall\theta\in\Theta\;\exists c_\theta
$$

と

$$
\exists c\;\forall\theta\in\Theta
$$

は異なります。前者では $c_\theta$ が $\theta$ に依存してよく、後者では一つの $c$ が全ての $\theta$ に共通でなければなりません。

## 詳細解答と本番答案

詳細解答は、第三者が途中計算を再現できる記録です。本番答案は、詳細解答から採点に必要な要素を残して圧縮したものです。圧縮してよいのは反復的な算術であり、次は削りません。

- モデルと台
- 使用した定理と主要な仮定
- 主要な立式
- 最大・最小または分布を確定する根拠
- 問われた量への明示的な結論
