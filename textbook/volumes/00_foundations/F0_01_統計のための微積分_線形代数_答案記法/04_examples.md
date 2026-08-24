# 典型例と完全な導出

## 例1：密度の正規化と期待値

$\theta>0$ とし、

$$
f_\theta(x)=c(\theta)x^{\theta-1}(1-x)\boldsymbol{1}_{(0,1)}(x)
$$

が密度となる $c(\theta)$ と $E_\theta[X]$ を求めます。

### 観察と方針

台は $(0,1)$ です。$x=0$ 付近の積分が有限であるために $\theta-1>-1$、すなわち $\theta>0$ が必要です。まず全確率が1という条件から $c(\theta)$ を定め、その値を期待値の積分へ代入します。

### 正規化

$$
\begin{aligned}
\int_0^1x^{\theta-1}(1-x)\,dx
&=\int_0^1x^{\theta-1}\,dx-\int_0^1x^\theta\,dx\\
&=\frac{1}{\theta}-\frac{1}{\theta+1}\\
&=\frac{1}{\theta(\theta+1)}.
\end{aligned}
$$

したがって

$$
c(\theta)=\theta(\theta+1).
$$

### 期待値

被積分関数は非負で、区間 $(0,1)$ 上で積分可能です。よって

$$
\begin{aligned}
E_\theta[X]
&=\theta(\theta+1)\int_0^1x^\theta(1-x)\,dx\\
&=\theta(\theta+1)
\left(\frac{1}{\theta+1}-\frac{1}{\theta+2}\right)\\
&=\frac{\theta}{\theta+2}.
\end{aligned}
$$

### 検算と採点上の注意

$0<X<1$ なので $0<E[X]<1$ であるべきです。$\theta/(\theta+2)$ は $\theta>0$ でこの範囲にあります。正規化定数を求めず、比例記号のまま期待値を計算しないことが重要です。

## 例2：正規分布の最尤推定

$X_1,\ldots,X_n$ は独立に $N(\mu,\sigma^2)$ に従い、$n\geq2$ とします。観測値を $x_1,\ldots,x_n$ とし、$\mu\in\mathbb{R}$、$\sigma^2>0$ の最尤推定値を求めます。

### 尤度と対数尤度

$$
L(\mu,\sigma^2)
=(2\pi\sigma^2)^{-n/2}
\exp\left\{-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2\right\}.
$$

$L>0$ なので対数を取って最大化してよく、

$$
\ell(\mu,\sigma^2)
=-\frac{n}{2}\log(2\pi)-\frac{n}{2}\log\sigma^2
-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2.
$$

### $\mu$ の最大化

$\sigma^2$ を固定して $\mu$ で偏微分すると、

$$
\frac{\partial\ell}{\partial\mu}
=\frac{1}{\sigma^2}\sum_{i=1}^n(x_i-\mu)
=\frac{n}{\sigma^2}(\overline{x}-\mu).
$$

したがって停留点は $\widehat{\mu}=\overline{x}$ です。また

$$
\frac{\partial^2\ell}{\partial\mu^2}=-\frac{n}{\sigma^2}<0
$$

なので、固定した $\sigma^2$ に対する一意な最大点です。

### $\sigma^2$ の最大化

$s_n^2=n^{-1}\sum_{i=1}^n(x_i-\overline{x})^2$ とおきます。$s_n^2>0$、すなわち観測値が全て同じではない場合を先に扱います。$v=\sigma^2$ と書くと、$\mu=\overline{x}$ における対数尤度は定数項を除いて

$$
-\frac{n}{2}\log v-\frac{ns_n^2}{2v}
$$

です。微分すると

$$
\begin{aligned}
\frac{d\ell(\overline{x},v)}{dv}
&=-\frac{n}{2v}+\frac{ns_n^2}{2v^2}\\
&=\frac{n(s_n^2-v)}{2v^2}.
\end{aligned}
$$

分母は正なので、導関数は $0<v<s_n^2$ で正、$v>s_n^2$ で負です。よって一意な最大点は

$$
\widehat{\sigma^2}=s_n^2=\frac{1}{n}\sum_{i=1}^n(x_i-\overline{x})^2
$$

です。分母は $n-1$ ではありません。最尤推定量と不偏分散を区別します。

全観測値が同じなら $s_n^2=0$ です。この場合、$v\downarrow0$ で尤度が発散し、パラメータ空間 $v>0$ の内部に最大点は存在しません。この例外を記すことで、形式的な停留点計算の限界が分かります。

## 例3：二つの指数変数の変換

$X,Y$ は独立に率 $\lambda>0$ の指数分布に従うとします。

$$
U=X+Y,
\qquad
V=\frac{X}{X+Y}
$$

の同時密度を求めます。

### 逆変換と像の範囲

$X,Y>0$ なので $U>0$ かつ $0<V<1$ です。定義式から

$$
X=UV,
\qquad
Y=U(1-V).
$$

この逆変換は $u>0$, $0<v<1$ 上で一意です。

### Jacobian

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\begin{pmatrix}
v & u\\
1-v & -u
\end{pmatrix}
$$

なので、

$$
\det\frac{\partial(x,y)}{\partial(u,v)}
=-uv-u(1-v)=-u.
$$

絶対値は $u$ です。

### 密度

独立性から $f_{X,Y}(x,y)=\lambda^2e^{-\lambda(x+y)}$ です。よって

$$
f_{U,V}(u,v)
=\lambda^2ue^{-\lambda u}
\boldsymbol{1}_{(0,\infty)}(u)
\boldsymbol{1}_{(0,1)}(v).
$$

右辺は $u$ の関数と $v$ の関数の積に分かれます。また

$$
\int_0^\infty\lambda^2ue^{-\lambda u}\,du=1,
\qquad
\int_0^1 1\,dv=1.
$$

したがって $U$ と $V$ は独立で、$V$ は $(0,1)$ 上の一様分布に従います。

### 採点上の注意

Jacobianだけを計算して領域を書かない答案は不完全です。この問題では領域が長方形になることが、独立性の結論にも必要です。

## 例4：最小二乗法と射影

$\boldsymbol{Y}\in\mathbb{R}^n$、$\boldsymbol{X}\in\mathbb{R}^{n\times p}$、$\boldsymbol{\beta}\in\mathbb{R}^p$ とし、$\operatorname{rank}(\boldsymbol{X})=p$ とします。残差平方和

$$
Q(\boldsymbol{\beta})
=\lVert\boldsymbol{Y}-\boldsymbol{X}\boldsymbol{\beta}\rVert^2
$$

を最小化します。

### 展開と微分

$$
\begin{aligned}
Q(\boldsymbol{\beta})
&=(\boldsymbol{Y}-\boldsymbol{X}\boldsymbol{\beta})^{\mathsf T}
(\boldsymbol{Y}-\boldsymbol{X}\boldsymbol{\beta})\\
&=\boldsymbol{Y}^{\mathsf T}\boldsymbol{Y}
-2\boldsymbol{\beta}^{\mathsf T}\boldsymbol{X}^{\mathsf T}\boldsymbol{Y}
+\boldsymbol{\beta}^{\mathsf T}\boldsymbol{X}^{\mathsf T}\boldsymbol{X}\boldsymbol{\beta}.
\end{aligned}
$$

$\boldsymbol{X}^{\mathsf T}\boldsymbol{X}$ は対称なので、勾配は

$$
\nabla Q(\boldsymbol{\beta})
=-2\boldsymbol{X}^{\mathsf T}\boldsymbol{Y}
+2\boldsymbol{X}^{\mathsf T}\boldsymbol{X}\boldsymbol{\beta}.
$$

正規方程式 $\nabla Q=\boldsymbol{0}$ を解くと、列フルランク性により $\boldsymbol{X}^{\mathsf T}\boldsymbol{X}$ は正定値で可逆なので、

$$
\widehat{\boldsymbol{\beta}}
=(\boldsymbol{X}^{\mathsf T}\boldsymbol{X})^{-1}
\boldsymbol{X}^{\mathsf T}\boldsymbol{Y}.
$$

Hessianは $2\boldsymbol{X}^{\mathsf T}\boldsymbol{X}$ で正定値です。したがって停留点は一意な大域的最小点です。

### 射影行列

当てはめ値は

$$
\widehat{\boldsymbol{Y}}
=\boldsymbol{X}\widehat{\boldsymbol{\beta}}
=\boldsymbol{H}\boldsymbol{Y},
$$

ただし

$$
\boldsymbol{H}
=\boldsymbol{X}(\boldsymbol{X}^{\mathsf T}\boldsymbol{X})^{-1}
\boldsymbol{X}^{\mathsf T}
$$

です。転置を取ると $\boldsymbol{H}^{\mathsf T}=\boldsymbol{H}$、積を取ると

$$
\boldsymbol{H}^2
=\boldsymbol{X}(\boldsymbol{X}^{\mathsf T}\boldsymbol{X})^{-1}
\boldsymbol{X}^{\mathsf T}\boldsymbol{X}
(\boldsymbol{X}^{\mathsf T}\boldsymbol{X})^{-1}\boldsymbol{X}^{\mathsf T}
=\boldsymbol{H}
$$

です。よって $\boldsymbol{H}$ は $\operatorname{col}(\boldsymbol{X})$ への直交射影行列です。
