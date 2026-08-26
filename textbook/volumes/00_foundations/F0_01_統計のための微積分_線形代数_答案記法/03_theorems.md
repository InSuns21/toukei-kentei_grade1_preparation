# 基本命題と主要定理

## 対数を取ってよい理由

### 命題 F0-PROP-01

$D$ を集合とし、$L:D\to(0,\infty)$ とする。このとき $\widehat{\theta}\in D$ について

$$
L(\widehat{\theta})\geq L(\theta)
\quad\text{for all }\theta\in D
$$

であることと

$$
\log L(\widehat{\theta})\geq\log L(\theta)
\quad\text{for all }\theta\in D
$$

であることは同値である。

#### 証明

対数関数は $(0,\infty)$ 上で狭義単調増加です。したがって、各 $\theta\in D$ について

$$
L(\widehat{\theta})\geq L(\theta)
\Longleftrightarrow
\log L(\widehat{\theta})\geq\log L(\theta)
$$

です。この同値関係が全ての $\theta\in D$ について成り立つため、二つの最大化条件は同値です。

正値性が仮定に必要です。尤度が0になる点では $\log L$ は有限な実数として定義されません。その点を除外してよいかは、元の尤度とパラメータ空間から別途確認します。

## F0-THM-01 多変数変換の密度公式

$\mathcal{X},\mathcal{Y}$を$\mathbb{R}^p$の開集合とし、$\boldsymbol{X}$が$\mathcal{X}$上で密度$f_{\boldsymbol{X}}$をもつとします。$T:\mathcal{X}\to\mathcal{Y}$は一対一かつ全射で、$T$と逆変換$T^{-1}$がともに連続微分可能であるとします。さらに全ての$\boldsymbol{y}\in\mathcal{Y}$で$\det D T^{-1}(\boldsymbol{y})\neq0$とします。このとき$\boldsymbol{Y}=T(\boldsymbol{X})$の密度は

$$
f_{\boldsymbol{Y}}(\boldsymbol{y})
=
\begin{cases}
f_{\boldsymbol{X}}\left(T^{-1}(\boldsymbol{y})\right)
\left|\det D T^{-1}(\boldsymbol{y})\right|,
&\boldsymbol{y}\in\mathcal{Y},\\
0,&\boldsymbol{y}\notin\mathcal{Y}
\end{cases}
$$

で与えられます。

### 証明方針

確率を積分で表せる任意の領域$A\subset\mathcal{Y}$に対し、$P(\boldsymbol{Y}\in A)$を$\boldsymbol{X}$の密度で表し、通常の多変数積分の変数変換公式を適用します。

### 証明

$\boldsymbol{Y}=T(\boldsymbol{X})$ と $T$ の一対一性から、

$$
\{\boldsymbol{Y}\in A\}
=\{T(\boldsymbol{X})\in A\}
=\{\boldsymbol{X}\in T^{-1}(A)\}
$$

です。よって

$$
P(\boldsymbol{Y}\in A)
=\int_{T^{-1}(A)}f_{\boldsymbol{X}}(\boldsymbol{x})\,d\boldsymbol{x}.
$$

ここで $\boldsymbol{x}=T^{-1}(\boldsymbol{y})$ と変数変換すると、

$$
P(\boldsymbol{Y}\in A)
=\int_A
f_{\boldsymbol{X}}\left(T^{-1}(\boldsymbol{y})\right)
\left|\det D T^{-1}(\boldsymbol{y})\right|
\,d\boldsymbol{y}.
$$

確率が任意の $A\subset\mathcal{Y}$ に対してこの積分で表され、$\boldsymbol{Y}$ は $\mathcal{Y}$ の外に値を取らないので、上の区分表示が $\boldsymbol{Y}$ の密度です。

一対一でない変換では、逆像の各枝からの寄与を足す必要があります。この定理をそのまま適用できません。

## F0-THM-02 対称行列のスペクトル分解

実対称行列 $\boldsymbol{A}\in\mathbb{R}^{p\times p}$ に対し、ある直交行列 $\boldsymbol{Q}$ と実数 $\lambda_1,\ldots,\lambda_p$ が存在して

$$
\boldsymbol{A}
=\boldsymbol{Q}
\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
\boldsymbol{Q}^{\mathsf T}
$$

と表せます。$\boldsymbol{Q}$ の列は、$\boldsymbol{A}$ の正規直交固有ベクトルです。

この有限次元実対称行列のスペクトル定理は、本章では既知の線形代数の結果として用います。統計で重要なのは、分解後に二次形式が

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
=\sum_{i=1}^p\lambda_i z_i^2,
\qquad
\boldsymbol{z}=\boldsymbol{Q}^{\mathsf T}\boldsymbol{x}
$$

となることです。実際、$\boldsymbol{x}=\boldsymbol{Q}\boldsymbol{z}$ と $\boldsymbol{Q}^{\mathsf T}\boldsymbol{Q}=\boldsymbol{I}_p$ を順に代入すると

$$
\begin{aligned}
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
&=(\boldsymbol{Q}\boldsymbol{z})^{\mathsf T}
\boldsymbol{Q}\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
\boldsymbol{Q}^{\mathsf T}(\boldsymbol{Q}\boldsymbol{z})\\
&=\boldsymbol{z}^{\mathsf T}
\operatorname{diag}(\lambda_1,\ldots,\lambda_p)\boldsymbol{z}\\
&=\sum_{i=1}^p\lambda_i z_i^2
\end{aligned}
$$

を得ます。

## F0-THM-03 二次形式による正定値性の判定

実対称行列 $\boldsymbol{A}$ が正定値であるための必要十分条件は、その全ての固有値が正であることです。半正定値であるための必要十分条件は、全ての固有値が非負であることです。

### 証明

まず全ての固有値が正であると仮定します。$\boldsymbol{x}\neq\boldsymbol{0}$ に対して、直交行列はノルムを保つので $\boldsymbol{z}=\boldsymbol{Q}^{\mathsf T}\boldsymbol{x}\neq\boldsymbol{0}$ です。したがって少なくとも一つの $z_i$ は非零であり、

$$
\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x}
=\sum_{i=1}^p\lambda_i z_i^2>0.
$$

よって $\boldsymbol{A}$ は正定値です。

逆に $\boldsymbol{A}$ が正定値であるとします。固有値 $\lambda_i$ に対応する単位固有ベクトルを $\boldsymbol{q}_i$ とすると、$\boldsymbol{q}_i\neq\boldsymbol{0}$ なので

$$
0<\boldsymbol{q}_i^{\mathsf T}\boldsymbol{A}\boldsymbol{q}_i
=\boldsymbol{q}_i^{\mathsf T}(\lambda_i\boldsymbol{q}_i)
=\lambda_i\boldsymbol{q}_i^{\mathsf T}\boldsymbol{q}_i
=\lambda_i.
$$

よって全ての固有値が正です。半正定値の場合も、不等号 $>$ を $\geq$ に置き換えた同じ議論で両方向が示されます。

### 正定値なら逆行列が存在する

正定値行列では全固有値が正なので、0は固有値ではありません。したがって行列式は0でなく、逆行列が存在します。このため、多変量正規分布で正定値な分散共分散行列 $\Sigma$ を仮定すると $\Sigma^{-1}$ を使えます。

### 共分散行列が半正定値になる理由

確率ベクトル $\boldsymbol X$ の分散共分散行列を $\Sigma$ とすると、任意のベクトル $\boldsymbol a$ に対して

$$
\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a
=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)
\geq0.
$$

したがって分散共分散行列は常に半正定値です。さらに、$\boldsymbol a\neq\boldsymbol0$ に対して $\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)>0$ が常に成り立つなら正定値です。

### 2次対称行列の実用判定

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

について、$A$ が正定値であるための必要十分条件は

$$
a>0,\qquad ac-b^2>0
$$

です。これは2次のSylvester判定であり、共分散行列やGram行列の確認に使えます。

## F0-THM-04 直交射影行列の基本性質

$\boldsymbol{P}^{\mathsf T}=\boldsymbol{P}$ かつ $\boldsymbol{P}^2=\boldsymbol{P}$ とします。このとき任意の $\boldsymbol{y}\in\mathbb{R}^n$ について、$\boldsymbol{P}\boldsymbol{y}$ と $(\boldsymbol{I}_n-\boldsymbol{P})\boldsymbol{y}$ は直交します。また $\boldsymbol{P}$ の固有値は0または1です。

### 証明

内積を直接計算します。対称性と冪等性から

$$
\begin{aligned}
(\boldsymbol{P}\boldsymbol{y})^{\mathsf T}
(\boldsymbol{I}_n-\boldsymbol{P})\boldsymbol{y}
&=\boldsymbol{y}^{\mathsf T}\boldsymbol{P}^{\mathsf T}
(\boldsymbol{I}_n-\boldsymbol{P})\boldsymbol{y}\\
&=\boldsymbol{y}^{\mathsf T}
(\boldsymbol{P}-\boldsymbol{P}^2)\boldsymbol{y}\\
&=0.
\end{aligned}
$$

次に $\lambda$ を固有値、$\boldsymbol{v}\neq\boldsymbol{0}$ を対応する固有ベクトルとします。$\boldsymbol{P}\boldsymbol{v}=\lambda\boldsymbol{v}$ の両辺に $\boldsymbol{P}$ を作用させると

$$
\boldsymbol{P}^2\boldsymbol{v}=\lambda\boldsymbol{P}\boldsymbol{v}=\lambda^2\boldsymbol{v}.
$$

一方、冪等性から $\boldsymbol{P}^2\boldsymbol{v}=\boldsymbol{P}\boldsymbol{v}=\lambda\boldsymbol{v}$ です。したがって

$$
(\lambda^2-\lambda)\boldsymbol{v}=\boldsymbol{0}.
$$

$\boldsymbol{v}\neq\boldsymbol{0}$ なので $\lambda^2-\lambda=0$、すなわち $\lambda\in\{0,1\}$ です。
