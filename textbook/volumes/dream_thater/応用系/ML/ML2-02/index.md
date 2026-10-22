# ML2-02 Bayes線形回帰・事後予測

<!-- definition-example-audit: strict -->

[ML1-05のRidge回帰](../ML1-05/index.md#def-ml1-05-ridge)では、係数の二乗ノルムに罰則を付けて一つの推定値を選んだ。しかし、同じ予測値を持つ係数が複数あるとき、何をどこまで推定できたのかを一点だけで表すのは難しい。さらに、未観測の入力では、測定誤差だけでなく係数の推定不足も予測を揺らす。そこで係数を確率変数として扱い、**データを見た後に係数について分かったこと**と、**次の応答の分布**を別々に計算する。

本講の入力行列は観測済み・固定で、係数の事前分布と雑音分散を既知として出発する。[前講の密度予測](../ML2-01/index.md#def-ml2-01-density-log-loss)とは違い、予測する密度の形までGaussian模型から構成する。まず最も簡単な例を見よう。係数が一つ、事前に平均0・分散1、観測値が一つ $x=1,y=2$、雑音分散1なら、データから係数が2と確定するわけではない。実際、後で係数の事後平均1・事後分散 $1/2$ を導く。

## 1. どの確率変数を推定するのか

観測数を $n\ge1$、特徴量次元を $p\ge1$ とする。[設計行列](../ML1-04/index.md#def-ml1-04-design-matrix) $X\in\mathbb R^{n\times p}$ の第 $i$ 行を $x_i^{\mathsf T}$、応答ベクトルを $y=(y_1,\ldots,y_n)^{\mathsf T}$ とする。係数ベクトル $\beta\in\mathbb R^p$ が決まっても、各 $y_i$ は測定雑音で変動する。事前分布は観測前の $\beta$ の不確実性、尤度は固定した $\beta$ のもとでデータが現れる密度、事後分布は観測後の係数の条件付き分布である。

<a id="def-ml2-02-gaussian-linear-model"></a>

<!-- formal-statement-start -->
> **定義（既知雑音分散のGaussian線形回帰模型）**  
> $X\in\mathbb R^{n\times p}$ を固定し、$\sigma^2>0$ を既知とする。係数 $\beta\in\mathbb R^p$ に条件付けて、応答は

$$
Y=X\beta+\varepsilon,\qquad
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

> に従う。$\varepsilon$ は係数とは独立で、成分は独立な $N(0,\sigma^2)$ に従う。観測 $Y=y$ に対する尤度は

$$
L(\beta;y,X)=(2\pi\sigma^2)^{-n/2}
\exp\left(-\frac{\|y-X\beta\|_2^2}{2\sigma^2}\right).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-02-gaussian-linear-model -->
**定義の確認**。 $n=p=1,X=(1),\beta=2,\sigma^2=1$ とする。$X\beta=2$、$\varepsilon\sim N(0,1)$ で $\sigma^2>0$、したがって $Y\mid\beta=2\sim N(2,1)$。密度は $(2\pi)^{-1/2}\exp(-(y-2)^2/2)$ となり、残差 $y-X\beta$ を代入した定義の尤度と一致する。標本が二つなら独立性により各密度を掛け、残差平方和の指数が現れる。
<!-- definition-example-end -->

[非退化多変量正規密度](../ML1-07/index.md#def-ml1-07-gaussian)は、平均ベクトルと正定値共分散行列により決まる。この知識を係数側にも適用する。事前平均 $m_0$ は信じている係数の中心、事前共分散 $S_0$ はその不確実性の方向と大きさを表す。共分散の定義を係数の線形結合に展開すると、方向 $v\in\mathbb R^p$ の分散は

$$
\operatorname{Var}(v^{\mathsf T}\beta)
=\sum_{j,k}v_jv_k\operatorname{Cov}(\beta_j,\beta_k)
=v^{\mathsf T}S_0v
$$

である。従って $S_0$ の正定値性は、すべての非零方向の分散が正であることに対応する。次の対角行列は係数の各方向の分散を直接指定した例である。

<a id="def-ml2-02-gaussian-prior"></a>

<!-- formal-statement-start -->
> **定義（非退化Gaussian事前分布）**  
> $m_0\in\mathbb R^p$、実対称正定値 $S_0\in\mathbb R^{p\times p}$ を固定する。[Gaussian線形回帰模型](#def-ml2-02-gaussian-linear-model)の係数に事前密度

$$
\pi_0(\beta)=(2\pi)^{-p/2}(\det S_0)^{-1/2}
\exp\left(-\frac12(\beta-m_0)^{\mathsf T}S_0^{-1}(\beta-m_0)\right)
$$

> を与える。これは $\beta\sim N_p(m_0,S_0)$ と表す。雑音 $\varepsilon$ は $\beta$ と独立とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-02-gaussian-prior -->
**定義の確認**。 $p=2,m_0=(0,0)^{\mathsf T},S_0=\operatorname{diag}(1,4)$ を取る。任意の非零 $v=(a,b)^{\mathsf T}$ について

$$
v^{\mathsf T}S_0v=a^2+4b^2>0
$$

だから実対称正定値であり、非退化性の条件を満たす。対角成分を掛けて $\det S_0=4>0$、各成分の逆数を取って $S_0^{-1}=\operatorname{diag}(1,1/4)$ を得る。これらを密度の定義へ代入すると

$$
\pi_0(\beta)=\frac1{4\pi}\exp\left[-\frac12\left(\beta_1^2+\frac{\beta_2^2}{4}\right)\right].
$$

二つの一次元正規密度の積なので非負・積分1であることも[正規密度の正規化補題](../ML1-07/index.md#lem-ml1-07-gaussian-normalization)から確認できる。第2係数方向は第1係数方向より分散が4倍大きい。
<!-- definition-example-end -->

ここで $Y=y$ は連続型観測なので、事後密度は点の確率 $P(Y=y)$ で割るのではなく、周辺密度

$$
p(y\mid X)=\int_{\mathbb R^p}L(b;y,X)\pi_0(b)\,db
$$

で正規化する。積分は正で有限である。実際、正値な二つの正規密度の積分で、$L(b;y,X)\le(2\pi\sigma^2)^{-n/2}$、$\int\pi_0=1$ だから上から有限に抑えられる。

## 2. 平方完成から事後分布を求める

観測値を得る前には事前分布だけで係数の不確実性を記した。観測値 $y$ を得た後は、どの係数がこのデータを生みやすいかを尤度で重み付けする必要がある。そこで、尤度と事前密度の積を周辺密度で割って正規化した、**観測後の係数の確率密度**を導入する。

<a id="def-ml2-02-posterior"></a>

<!-- formal-statement-start -->
> **定義（係数の事後密度）**  
> 上記模型で $X$ と観測値 $y$ を固定し、周辺密度 $p(y\mid X)>0$ とする。係数の事後密度を

$$
\pi(\beta\mid y,X)=\frac{L(\beta;y,X)\pi_0(\beta)}{p(y\mid X)}
$$

> で定める。これは $\mathbb R^p$ 上の非負で積分1の確率密度である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-02-posterior -->
**定義の確認**。 $p=n=1,X=(1),m_0=0,S_0=(1),\sigma^2=1,y=2$ とする。尤度と事前密度はどちらも非負であり、その積は $\exp[-(\beta^2+(2-\beta)^2)/2]/(2\pi)$。指数部を変形すると

$$
\beta^2+(2-\beta)^2=2(\beta-1)^2+2.
$$

尤度と事前密度の積は $e^{-1}e^{-(\beta-1)^2}/(2\pi)$ である。$\int_{\mathbb R}e^{-(b-1)^2}\,db=\sqrt\pi$ で割ると、正規化後は

$$
\pi(\beta\mid y=2,X=(1))=\frac1{\sqrt\pi}e^{-(\beta-1)^2}.
$$

これは $N(1,1/2)$ の密度で、非負・積分1を直接確認できる。この計算から事後平均が1に移るが、分散 $1/2$ は残ることが分かる。
<!-- definition-example-end -->

正規密度の指数は二次式である。事前の二次式と残差平方和を足すと、新しい正規密度の二次式になる。この平方完成こそ、Gaussian事前分布を使う理由である。

<a id="thm-ml2-02-gaussian-posterior"></a>

<!-- formal-statement-start -->
> **定理（Gaussian線形回帰の事後平均と共分散）**  
> [模型](#def-ml2-02-gaussian-linear-model)と[正定値事前分布](#def-ml2-02-gaussian-prior)を仮定する。$X$ は列フルランクでなくてもよい。行列

$$
\Lambda_n=S_0^{-1}+\sigma^{-2}X^{\mathsf T}X,\qquad
S_n=\Lambda_n^{-1}
$$

> とベクトル

$$
m_n=S_n(S_0^{-1}m_0+\sigma^{-2}X^{\mathsf T}y)
$$

> が定義でき、[事後密度](#def-ml2-02-posterior)は $N_p(m_n,S_n)$ の密度に等しい。とくに $S_n$ は正定値である。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ 次元係数に関する二次式の係数を $\Lambda_n$、一次式の係数を $h_n$ として集める。$\Lambda_n$ は正定値なので逆行列を持ち、$m_n=\Lambda_n^{-1}h_n$ を中心に平方完成できる。行列 $X^{\mathsf T}X$ が特異でも、正定値の $S_0^{-1}$ が全方向に正の大きさを加える。

<!-- proof-start -->
### 証明

[事後密度の定義](#def-ml2-02-posterior)の分子を取る。正規化係数は $\beta$ に依存しないから、指数の負の2倍に現れる二次式を調べる。

$$
\begin{aligned}
Q(\beta)
&=(\beta-m_0)^{\mathsf T}S_0^{-1}(\beta-m_0)
 +\sigma^{-2}(y-X\beta)^{\mathsf T}(y-X\beta)\\
&=\beta^{\mathsf T}(S_0^{-1}+\sigma^{-2}X^{\mathsf T}X)\beta\\
&\quad-2\beta^{\mathsf T}(S_0^{-1}m_0+\sigma^{-2}X^{\mathsf T}y)
 +m_0^{\mathsf T}S_0^{-1}m_0+\sigma^{-2}y^{\mathsf T}y.
\end{aligned}
$$

ここで $h_n=S_0^{-1}m_0+\sigma^{-2}X^{\mathsf T}y$ と置く。$v\ne0$ なら

$$
v^{\mathsf T}\Lambda_nv
=v^{\mathsf T}S_0^{-1}v+\sigma^{-2}\|Xv\|_2^2>0.
$$

第1項が正であることも確認する。実対称正定値 $S_0$ は、正の固有値 $d_j$ と正規直交固有ベクトル $q_j$ を用いて $S_0=Q\operatorname{diag}(d_j)Q^{\mathsf T}$ と書ける。従って

$$
v^{\mathsf T}S_0^{-1}v
=\sum_{j=1}^p\frac{(q_j^{\mathsf T}v)^2}{d_j}>0\qquad(v\ne0).
$$

よって $\Lambda_n$ は実対称正定値で、同じ固有値の議論により $S_n=\Lambda_n^{-1}$ も実対称正定値。$m_n=S_nh_n$ とすれば $\Lambda_nm_n=h_n$ であり、

$$
\begin{aligned}
(\beta-m_n)^{\mathsf T}\Lambda_n(\beta-m_n)
&=\beta^{\mathsf T}\Lambda_n\beta-2\beta^{\mathsf T}\Lambda_nm_n
 +m_n^{\mathsf T}\Lambda_nm_n\\
&=\beta^{\mathsf T}\Lambda_n\beta-2\beta^{\mathsf T}h_n
 +m_n^{\mathsf T}\Lambda_nm_n.
\end{aligned}
$$

したがって $Q(\beta)=(\beta-m_n)^{\mathsf T}\Lambda_n(\beta-m_n)+c$、$c$ は $\beta$ に依存しない。積分1への正規化では $e^{-c/2}$ が消え、[多変量正規密度](../ML1-07/index.md#def-ml1-07-gaussian)により、残る密度は正確に

$$
(2\pi)^{-p/2}(\det S_n)^{-1/2}
\exp[-(\beta-m_n)^{\mathsf T}S_n^{-1}(\beta-m_n)/2]
$$

である。$\square$
<!-- proof-end -->

**計算例。** 上の $n=p=1$ の模型では $\Lambda_1=1+1=2$、$S_1=1/2$、$h_1=0+2=2$、$m_1=1$。事後分布は $N(1,1/2)$ となる。これは定義直後の平方完成と一致し、事後平均だけを正規方程式の解として報告するのとは違う。

観測が弱い方向と、観測が全くない方向も区別できる。例えば $X=(1,1)$、$S_0=I_2$、$\sigma^2=1$ なら

$$
\Lambda_1=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
S_1=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

任意の非零 $v=(a,b)^{\mathsf T}$ に対して

$$
v^{\mathsf T}\Lambda_1v=a^2+b^2+(a+b)^2>0
$$

だから正定値であり、$\det\Lambda_1=3>0$ を使って上の逆行列も検算できる。一方、$X(1,-1)^{\mathsf T}=0$ なので、係数の差の方向をデータだけでは学べない。**事後分布の存在と係数の識別可能性は別**である。

## 3. Ridge回帰との接続

[Ridgeの一意な最小解](../ML1-05/index.md#thm-ml1-05-unique)は、正定値事前分布の事後密度を最大にする点としても現れる。ただし、標本数 $n$ に対する正規化を揃える必要がある。

<a id="thm-ml2-02-ridge-map"></a>

<!-- formal-statement-start -->
> **定理（等方Gaussian事前分布とRidgeの一致）**  
> $\sigma^2>0$、$\lambda>0$、$X\in\mathbb R^{n\times p}$、$n,p\ge1$ を固定する。[Gaussian線形回帰模型](#def-ml2-02-gaussian-linear-model)に

$$
m_0=0,\qquad S_0=\frac{\sigma^2}{n\lambda}I_p
$$

> を用いる。このとき事後平均と事後密度の唯一の最大点は

$$
m_n=(X^{\mathsf T}X+n\lambda I_p)^{-1}X^{\mathsf T}y
$$

> であり、これは $J(\beta)=\|y-X\beta\|_2^2/(2n)+\lambda\|\beta\|_2^2/2$ の唯一の最小点と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussian密度は平均を中心に指数が減るため最大点は平均にある。事後密度の負の対数から $\beta$ に依存しない項を除くと、尤度の残差平方と事前分布の二乗罰則が残る。

<!-- proof-start -->
### 証明

$S_0^{-1}=(n\lambda/\sigma^2)I_p$ を[事後公式](#thm-ml2-02-gaussian-posterior)へ代入すると

$$
\begin{aligned}
S_n&=\sigma^2(X^{\mathsf T}X+n\lambda I_p)^{-1},\\
m_n&=S_n\sigma^{-2}X^{\mathsf T}y
=(X^{\mathsf T}X+n\lambda I_p)^{-1}X^{\mathsf T}y.
\end{aligned}
$$

正定値 $S_n$ のGaussian密度は $(\beta-m_n)^{\mathsf T}S_n^{-1}(\beta-m_n)$ が唯一0になる $\beta=m_n$ で最大である。また[尤度](#def-ml2-02-gaussian-linear-model)と[事前密度](#def-ml2-02-gaussian-prior)の積の負の対数で $\beta$ に依存する部分は

$$
\frac{\|y-X\beta\|_2^2}{2\sigma^2}
+\frac{n\lambda}{2\sigma^2}\|\beta\|_2^2
=\frac n{\sigma^2}J(\beta).
$$

正の係数 $n/\sigma^2$ を掛けても最小点は不変であり、[Ridgeの一意解定理](../ML1-05/index.md#thm-ml1-05-unique)と一致する。$\square$
<!-- proof-end -->

この対応では $n$ と $\lambda$ を固定して事前分散を選んでいる。標本数が変わっても同じ事前分布を保ちたいとき、$\lambda$ を不変とするなら $S_0=\sigma^2/(n\lambda)I$ という同じ式は保てない。ここを区別しないと「Ridgeの調整係数は事前分散そのもの」という誤解が生じる。

## 4. 次の応答まで予測する

未知の入力 $x_*\in\mathbb R^p$ で真に観測するのは係数ではなく応答 $Y_*$ である。$x_*^{\mathsf T}\beta$ は雑音のない平均応答、$Y_*$ はそこへ新しい雑音を加えた観測値だ。二種類の不確実性を混ぜずに定義しよう。

<a id="def-ml2-02-posterior-predictive"></a>

<!-- formal-statement-start -->
> **定義（事後予測密度と潜在平均応答）**  
> [Gaussian回帰模型](#def-ml2-02-gaussian-linear-model)で $x_*\in\mathbb R^p$ を固定する。$Y_*=x_*^{\mathsf T}\beta+\varepsilon_*$ とし、$\varepsilon_*\sim N(0,\sigma^2)$ は $\beta$ および既観測データと独立とする。事後予測密度は

$$
p(y_*\mid y,X,x_*)=
\int_{\mathbb R^p}p(y_*\mid\beta,x_*)\pi(\beta\mid y,X)\,d\beta
$$

> と定める。$f_*=x_*^{\mathsf T}\beta$ を潜在平均応答と呼び、$f_*$ の事後分布と、雑音を含む $Y_*$ の事後予測分布を区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-02-posterior-predictive -->
**定義の確認**。 $p=n=1$、既観測後に $\beta\mid y,X\sim N(1,1/2)$、$\sigma^2=1$、新入力 $x_*=2$ とする。新雑音 $\varepsilon_*$ を係数・データから独立に生成し、$Y_*=2\beta+\varepsilon_*$ とするので、条件付き密度 $p(y_*\mid\beta,x_*)$ は正規密度で積分1、事後密度も積分1である。非負関数への[Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を用いると

$$
\begin{aligned}
\int_{\mathbb R}p(y_*\mid y,X,x_*)\,dy_*
&=\int_{\mathbb R}\pi(\beta\mid y,X)
 \left\{\int_{\mathbb R}p(y_*\mid\beta,x_*)\,dy_*\right\}d\beta\\
&=\int_{\mathbb R}\pi(\beta\mid y,X)\,d\beta=1.
\end{aligned}
$$

よって事後予測密度は非負で積分1となり、確率密度の条件を満たす。
<!-- definition-example-end -->

<a id="thm-ml2-02-predictive-variance"></a>

<!-- formal-statement-start -->
> **定理（Gaussian事後予測と分散の二項分解）**  
> 固定した $X\in\mathbb R^{n\times p}$ と観測 $y\in\mathbb R^n$（$n,p\ge1$）に対して、[事後公式](#thm-ml2-02-gaussian-posterior)の条件を満たし、$\beta\mid y,X\sim N_p(m_n,S_n)$ とする。$x_*\in\mathbb R^p$ を固定し、$\varepsilon_*\sim N(0,\sigma^2)$（$\sigma^2>0$）は係数と既観測データの双方から独立とする。[潜在平均と新観測](#def-ml2-02-posterior-predictive)を $f_*=x_*^{\mathsf T}\beta$、$Y_*=f_*+\varepsilon_*$ とおけば、その条件付き分布は

$$
\begin{aligned}
f_*\mid y,X&\sim N(x_*^{\mathsf T}m_n,\ x_*^{\mathsf T}S_nx_*),\\
Y_*\mid y,X,x_*&\sim N(x_*^{\mathsf T}m_n,\ \sigma^2+x_*^{\mathsf T}S_nx_*).
\end{aligned}
$$

> ただし $x_*=0$ なら $f_*$ は0に集中する退化分布である。予測分散の $\sigma^2$ は新観測の雑音、$x_*^{\mathsf T}S_nx_*$ は係数の事後不確実性を表す。
<!-- formal-statement-end -->

### 証明の見取り図

$\beta$ の事後分布はGaussianだから、線形写像 $x_*^{\mathsf T}\beta$ もGaussianである。新雑音を独立に足すと、平均が足され、共分散項が0なので分散は加算される。予測値と係数の推定値を同じ分散で評価してはいけない。

<!-- proof-start -->
### 証明

[事後公式](#thm-ml2-02-gaussian-posterior)から、観測データを固定した下で $\mathbb E[\beta\mid y,X]=m_n$、$\operatorname{Cov}(\beta\mid y,X)=S_n$ である。線形性により

$$
\mathbb E[f_*\mid y,X]=x_*^{\mathsf T}m_n,
$$

また $f_*-x_*^{\mathsf T}m_n=x_*^{\mathsf T}(\beta-m_n)$ なので

$$
\begin{aligned}
\operatorname{Var}(f_*\mid y,X)
&=\mathbb E[x_*^{\mathsf T}(\beta-m_n)(\beta-m_n)^{\mathsf T}x_*\mid y,X]\\
&=x_*^{\mathsf T}S_nx_*.
\end{aligned}
$$

[正規密度の正規化補題](../ML1-07/index.md#lem-ml1-07-gaussian-normalization)の対角化を使って正規性も確かめる。$S_n=Q\operatorname{diag}(d_j)Q^{\mathsf T}$（$d_j>0$）とおくと、独立な標準正規成分を持つ $Z$ により $\beta=m_n+Q\operatorname{diag}(\sqrt{d_j})Z$ と表せる。$c=\operatorname{diag}(\sqrt{d_j})Q^{\mathsf T}x_*$ とすれば

$$
f_*=x_*^{\mathsf T}m_n+\sum_jc_jZ_j,
\qquad \sum_jc_j^2=x_*^{\mathsf T}S_nx_*.
$$

$c\ne0$ なら $c/\|c\|_2$ を第1行とする直交行列 $U$ を取り、$W=UZ$ とする。直交変換は二乗ノルムと体積要素の絶対値を保つので、$W$ の同時密度は $Z$ と同じ独立標準正規密度の積である。従って

$$
\sum_jc_jZ_j=\|c\|_2W_1\sim N(0,\|c\|_2^2).
$$

$c=0$ ならこの和は0に集中する。$S_n$ が正定値なので、これは $x_*=0$ と同値である。さらに $\varepsilon_*$ は係数と観測データから独立、平均0、分散 $\sigma^2$ だから

$$
\begin{aligned}
\mathbb E[Y_*\mid y,X,x_*]
&=x_*^{\mathsf T}m_n+\mathbb E[\varepsilon_*]=x_*^{\mathsf T}m_n,\\
\operatorname{Var}(Y_*\mid y,X,x_*)
&=\operatorname{Var}(f_*\mid y,X)+\operatorname{Var}(\varepsilon_*)\\
&\quad+2\operatorname{Cov}(f_*,\varepsilon_*\mid y,X)\\
&=x_*^{\mathsf T}S_nx_*+\sigma^2.
\end{aligned}
$$

$\varepsilon_*/\sigma$ を $Z$ に追加した独立標準正規ベクトルに、係数 $(c_1,\ldots,c_p,\sigma)$ で同じ直交変換の議論を適用できる。その係数の二乗和は $\sum_jc_j^2+\sigma^2$ だから、$Y_*$ も表示された平均・分散の正規分布となる。積分表示もこの密度に一致する。$\square$
<!-- proof-end -->

**同じ例の予測。** $\beta\mid y,X\sim N(1,1/2)$、$\sigma^2=1$、$x_*=2$ なら、潜在平均 $f_*=2\beta$ は平均2・分散2、新観測 $Y_*$ は平均2・分散3である。正規分布の両側約95%区間はそれぞれ $2\pm1.96\sqrt2$ と $2\pm1.96\sqrt3$ になる。前者は固定した $x_*$ における潜在平均の事後信用区間、後者は新観測の予測区間である。後者の方が広いのは未来の観測雑音を含むためで、いずれもすべての入力に対する同時95%帯を意味しない。

この予測密度は、平均を固定して $N(x_*^{\mathsf T}m_n,\sigma^2)$ で予測するプラグイン法とは違う。事後平均だけを使って係数の不確実性を消してしまうと、特に観測の少ない入力で新観測の条件付き正規分布を過度に狭く見積もりやすい。

## 5. 一つずつ観測するとどう更新されるか

すべてのデータを保存して毎回行列 $X$ を組み直さなくても、現在の事後平均と共分散を新観測へ更新できる。新しい一件を $(x,z)$、条件付き雑音分散を同じ $\sigma^2>0$ とする。

<a id="thm-ml2-02-sequential-update"></a>

<!-- formal-statement-start -->
> **定理（単一観測のGaussian事後逐次更新）**  
> 既観測データ $D$ に条件付けた係数分布が $N_p(m,S)$ で、$S$ は実対称正定値とする。固定した入力 $x\in\mathbb R^p$ に新観測 $z=x^{\mathsf T}\beta+\epsilon$ を得る。雑音 $\epsilon\sim N(0,\sigma^2)$ は係数と既観測データの双方から独立で、$\sigma^2>0$ とする。
>
> このとき正の量

$$
v=\sigma^2+x^{\mathsf T}Sx>0
$$

> を用いると、観測後の係数分布は $N_p(m^+,S^+)$ で

$$
\begin{aligned}
m^+&=m+\frac{Sx}{v}(z-x^{\mathsf T}m),\\
S^+&=S-\frac{Sxx^{\mathsf T}S}{v}.
\end{aligned}
$$

> 特に $S^+$ は正定値であり、同じ観測を全件一括で[事後公式](#thm-ml2-02-gaussian-posterior)に入れた結果と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

新一件を加えると精度行列には $xx^{\mathsf T}/\sigma^2$ が、一次項には $xz/\sigma^2$ が加わる。逆行列の候補を元の精度行列へ掛けて確認し、平均の差を残差 $z-x^{\mathsf T}m$ で表す。

<!-- proof-start -->
### 証明

[事後公式](#thm-ml2-02-gaussian-posterior)を「現在の分布を事前分布」「一件を新データ」として適用する。新精度行列と新一次項は

$$
(S^+)^{-1}=S^{-1}+\sigma^{-2}xx^{\mathsf T},
\qquad
(S^+)^{-1}m^+=S^{-1}m+\sigma^{-2}xz.
$$

$B=S-Sxx^{\mathsf T}S/v$ と置く。$a=x^{\mathsf T}Sx$ として直接積を展開すると

$$
\begin{aligned}
B(S^{-1}+\sigma^{-2}xx^{\mathsf T})
&=I_p-\frac{Sxx^{\mathsf T}}v
+\frac{Sxx^{\mathsf T}}{\sigma^2}
-\frac{Sx(x^{\mathsf T}Sx)x^{\mathsf T}}{v\sigma^2}\\
&=I_p+Sxx^{\mathsf T}
\left(-\frac1v+\frac1{\sigma^2}-\frac a{v\sigma^2}\right)\\
&=I_p
\end{aligned}
$$

である。最後は $v=\sigma^2+a$ を使った。新精度行列は正定値なので $B$ はその逆行列に等しく、$S^+=B$ は正定値。さらに

$$
\begin{aligned}
m^+&=B(S^{-1}m+\sigma^{-2}xz)\\
&=m-\frac{Sx(x^{\mathsf T}m)}v
+\frac{Sxz}{\sigma^2}-\frac{Sx(x^{\mathsf T}Sx)z}{v\sigma^2}\\
&=m+\frac{Sx}{v}(z-x^{\mathsf T}m),
\end{aligned}
$$

となる。これは一括公式に新しい行を付加して得られる精度行列・一次項と一致するので、逐次処理と一括処理は同じ分布を与える。$\square$
<!-- proof-end -->

補正係数 $Sx/v$ は、新入力方向をどの程度確かめたかで変わる。残差が0なら平均は変わらないが、共分散は一般に減少する。$x=0$ なら新観測は係数に依存しないため、$m^+=m,S^+=S$ である。

## 6. 事後予測を動かして確かめる

[Bayes線形回帰の対話ラボ](../../../../../../simulation/ml2-02.html)では、一係数の模型 $Y=\beta x+\varepsilon$ を使う。事前分散、観測雑音分散、観測数を変えると、観測されたデータに対する事後平均・事後分散を毎回新しく計算し、**潜在平均の区間**と**次の観測の予測区間**を別々に描く。表示する数値は上の平方完成・分散公式に基づく。95%区間はモデルが正しい場合の条件付きGaussian区間であり、任意のデータに対する無条件の保証ではない。

一係数模型で事後分散 $S_n$ を固定したまま新入力の絶対値 $|x_*|$ を大きくすると、潜在平均の分散 $x_*^2S_n$ は大きくなる。「既観測点からの距離」だけで決まる量ではない。観測数が少なく $S_n$ が大きい場合にも、この係数の不確実性が予測に強く現れる。一方、観測を増やしても $\sigma^2$ は残り、未来の観測雑音まで消えるわけではない。

## 7. 演習

### ML2-02-A01 一観測の事後分布

- Level: A

一係数模型 $Y=\beta+\varepsilon$、$\varepsilon\sim N(0,1)$、独立な事前分布 $\beta\sim N(0,1)$ を仮定する。$Y=2$ を観測した後の事後平均・分散を平方完成で求めよ。

<!-- solution-start -->
#### 詳細解答

事前密度と尤度の積の指数は

$$
-\frac12\{\beta^2+(2-\beta)^2\}.
$$

括弧を展開して

$$
\beta^2+(2-\beta)^2
=2\beta^2-4\beta+4
=2(\beta-1)^2+2.
$$

観測値に依存する定数部分を正規化すると、係数 $\beta$ の事後密度は $\exp[-(\beta-1)^2]$ に比例する。正規密度の標準形 $\exp[-(\beta-m)^2/(2S)]$ と係数を比較すれば、$m=1,S=1/2$。よって $N(1,1/2)$ である。
<!-- solution-end -->

### ML2-02-A02 事前平均が0でない例

- Level: A

$\beta\sim N(1,4)$、$Y=\beta+\varepsilon$、$\varepsilon\sim N(0,1)$ は独立とする。$Y=3$ を観測した後の事後分布を求めよ。

<!-- solution-start -->
#### 詳細解答

$S_0^{-1}=1/4$、$X^{\mathsf T}X=1$、$\sigma^{-2}=1$。したがって[事後公式](#thm-ml2-02-gaussian-posterior)より

$$
\Lambda_1=\frac14+1=\frac54,\qquad
S_1=\frac45.
$$

一次項は $h_1=(1/4)\cdot1+1\cdot3=13/4$ だから

$$
m_1=S_1h_1=\frac45\frac{13}{4}=\frac{13}{5}.
$$

事後分布は $N(13/5,4/5)$ である。事前平均1と観測3の間に平均が来ることも確かめられる。
<!-- solution-end -->

### ML2-02-A03 階数不足でも事後は存在する

- Level: A

$p=2$、$X=(1\ \ 1)$、$y=2$、$S_0=I_2$、$m_0=0$、$\sigma^2=1$ とする。精度行列、事後共分散、事後平均を求めよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ だから

$$
\Lambda_1=I_2+X^{\mathsf T}X
=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

この行列が表す二次形式は、任意の $v=(a,b)^{\mathsf T}\ne0$ について

$$
v^{\mathsf T}\Lambda_1v=a^2+b^2+(a+b)^2>0
$$

となるので、正定値の定義を直接満たす。行列式は $2\cdot2-1=3>0$ である。次の候補を左から $\Lambda_1$ に掛けると単位行列になる：

$$
S_1=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

実際、

$$
\Lambda_1S_1=\frac13\begin{pmatrix}3&0\\0&3\end{pmatrix}=I_2
$$

であり、これが逆行列である。

$X^{\mathsf T}y=(2,2)^{\mathsf T}$ を掛けると

$$
m_1=S_1(2,2)^{\mathsf T}
=\left(\frac23,\frac23\right)^{\mathsf T}.
$$

$X(1,-1)^{\mathsf T}=0$ で設計行列は階数1だが、事前精度が加わるため事後共分散は正定値となる。
<!-- solution-end -->

### ML2-02-A04 二つの予測区間

- Level: A

$\beta\mid D\sim N(1,1/2)$、新応答 $Y_*=2\beta+\varepsilon_*$、$\varepsilon_*\sim N(0,1)$ は事後係数と独立とする。潜在平均 $f_*=2\beta$ と新観測 $Y_*$ の平均・分散を求めよ。

<!-- solution-start -->
#### 詳細解答

[予測分散の定理](#thm-ml2-02-predictive-variance)で $x_*=2$、$m_n=1$、$S_n=1/2$ を代入すると

$$
\mathbb E[f_*]=2,\quad
\operatorname{Var}(f_*)=2^2\cdot\frac12=2.
$$

新雑音は独立で平均0・分散1なので

$$
\mathbb E[Y_*]=2+0=2,\quad
\operatorname{Var}(Y_*)=2+1=3.
$$

正規分布に基づく両側約95%の区間は $f_*$ で $2\pm1.96\sqrt2$、$Y_*$ で $2\pm1.96\sqrt3$ となる。
<!-- solution-end -->

### ML2-02-B01 Ridgeと事前分布の正規化

- Level: B

$n=2,p=1,X=(1,2)^{\mathsf T},y=(1,2)^{\mathsf T}$、$\sigma^2=1,\lambda=1/2$ とする。$m_0=0,S_0=\sigma^2/(n\lambda)$ としたとき、事後平均・分散とRidge係数を求めて比較せよ。

<!-- solution-start -->
#### 詳細解答

$n\lambda=2(1/2)=1$、$S_0=1$。$X^{\mathsf T}X=1^2+2^2=5$、$X^{\mathsf T}y=1\cdot1+2\cdot2=5$ だから

$$
\Lambda_2=1+5=6,\quad
S_2=\frac16,\quad
m_2=\frac16\cdot5=\frac56.
$$

[Ridgeとの一致](#thm-ml2-02-ridge-map)では最小化問題の正規方程式は $(X^{\mathsf T}X+n\lambda)\widehat\beta=X^{\mathsf T}y$ なので $(5+1)\widehat\beta=5$。よって $\widehat\beta=5/6=m_2$。ただしRidge係数自体には、事後分散 $1/6$ という情報は含まれない。
<!-- solution-end -->

### ML2-02-B02 逐次更新を一括式と照合する

- Level: B

$\beta\sim N(0,1)$、雑音分散1で $(x_1,y_1)=(1,2)$、$(x_2,y_2)=(2,1)$ を独立に観測する。[逐次更新](#thm-ml2-02-sequential-update)で二観測後の事後平均・分散を求め、行列をまとめる方法で検算せよ。

<!-- solution-start -->
#### 詳細解答

最初の一件は $v_1=1+1^2\cdot1=2$、補正係数は $K_1=S_0x_1/v_1=1/2$ である。[逐次更新公式](#thm-ml2-02-sequential-update)へ代入すると

$$
m_1=0+\frac12(2-0)=1,\qquad
S_1=1-\frac{1^2}{2}=\frac12.
$$

二件目は、更新後の $S_1=1/2$ を事前分散として使う。入力 $x_2=2$ に対して

$$
v_2=1+2^2\frac12=3,\quad
K_2=\frac{(1/2)\cdot2}{3}=\frac13,\quad
y_2-x_2m_1=1-2=-1.
$$

よって

$$
m_2=1+\frac13(-1)=\frac23,\qquad
S_2=\frac12-\frac{((1/2)\cdot2)^2}{3}=\frac16.
$$

一括式では $X=(1,2)^{\mathsf T}$、$y=(2,1)^{\mathsf T}$ なので

$$
\Lambda_2=1+(1^2+2^2)=6,\quad
h_2=1\cdot2+2\cdot1=4.
$$

従って $S_2=1/6,m_2=h_2/6=2/3$ と一致する。
<!-- solution-end -->

### ML2-02-B03 観測されていない係数方向

- Level: B

A03の二次元模型について、未観測の入力 $x_a=(1,1)^{\mathsf T}$ と $x_b=(1,-1)^{\mathsf T}$ に対する潜在平均の事後分散、および雑音分散1を加えた予測分散を求めよ。

<!-- solution-start -->
#### 詳細解答

A03の $S_1=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ を使う。まず

$$
S_1x_a=\frac13(1,1)^{\mathsf T},\qquad
x_a^{\mathsf T}S_1x_a=\frac23.
$$

同じ計算を差の方向に行うと

$$
S_1x_b=(1,-1)^{\mathsf T},\qquad
x_b^{\mathsf T}S_1x_b=2.
$$

[分散の分解](#thm-ml2-02-predictive-variance)から予測分散はそれぞれ $1+2/3=5/3$ と $1+2=3$。データの行 $(1,1)$ に直交する $x_b$ 方向には係数の差の不確実性が残り、事前の分散2から縮小していない。
<!-- solution-end -->

### ML2-02-B04 プラグイン予測と対数損失

- Level: B

係数の事後分布が $N(1,1/2)$、新入力 $x_*=1$、観測雑音分散1とする。正確な事後予測 $N(1,3/2)$ と事後平均を代入するプラグイン予測 $N(1,1)$ について、$y_*=1$ と $y_*=4$ それぞれの負の対数密度を比較せよ。

<!-- solution-start -->
#### 詳細解答

分散 $v>0$、平均1の正規密度の負の自然対数は[正規密度](../ML1-07/index.md#def-ml1-07-gaussian)から

$$
\ell_v(y_*)=\frac12\ln(2\pi v)+\frac{(y_*-1)^2}{2v}
$$

となる。$y_*=1$ なら二乗項は0なので、$\ell_{3/2}(1)-\ell_1(1)=\frac12\ln(3/2)>0$。中心ちょうどの点では、幅の狭いプラグイン予測の方が小さな損失を出す。

一方 $y_*=4$ なら残差平方は9なので

$$
\ell_1(4)-\ell_{3/2}(4)
=\frac12\ln\frac{1}{3/2}
+\frac92-\frac9{3}
=\frac32-\frac12\ln\frac32>0.
$$

最後は $\ln(3/2)<1/2$ から正と分かる。事後予測の方が裾の大きい観測に高い密度を与え、この点では損失が小さい。**どの実現値でも損失が必ず小さくなる**という主張ではない。
<!-- solution-end -->

### ML2-02-C01 多変量事後・予測・追加観測

- Level: C

$p=n=2$、$X=\operatorname{diag}(1,2)$、$y=(1,0)^{\mathsf T}$、$\beta\sim N_2(0,I_2)$、雑音共分散 $I_2$ の独立なGaussian模型を考える。

1. 事後平均 $m_2$ と共分散 $S_2$ を求めよ。
2. 新入力 $x_*=(1,1)^{\mathsf T}$ に対する潜在平均と次の観測の平均・分散を求めよ。
3. この入力で $z=1$ を追加観測したときの新しい事後平均・共分散を逐次更新で求め、一括公式と照合せよ。
4. この係数の事後平均と $\lambda=1/2$ のRidge解の関係を説明せよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $X^{\mathsf T}X=\operatorname{diag}(1,4)$、$X^{\mathsf T}y=(1,0)^{\mathsf T}$ である。これらを[Gaussian事後分布の定理](#thm-ml2-02-gaussian-posterior)へ代入すると

$$
\Lambda_2=I_2+X^{\mathsf T}X=\operatorname{diag}(2,5),\quad
S_2=\operatorname{diag}(1/2,1/5).
$$

一次項 $h_2=(1,0)^{\mathsf T}$ を左から掛けて $m_2=(1/2,0)^{\mathsf T}$。

**（2）** $x_*^{\mathsf T}m_2=1/2$、事後係数による分散は

$$
x_*^{\mathsf T}S_2x_*=\frac12+\frac15=\frac7{10}.
$$

[予測分散の定理](#thm-ml2-02-predictive-variance)から潜在平均 $f_*\sim N(1/2,7/10)$、次の観測 $Y_*\sim N(1/2,17/10)$。

**（3）** 観測 $z=1$ を追加すると残差は $1-x_*^{\mathsf T}m_2=1/2$、$v=1+7/10=17/10$。係数修正ベクトルは

$$
\frac{S_2x_*}{v}
=\frac{(1/2,1/5)^{\mathsf T}}{17/10}
=\left(\frac5{17},\frac2{17}\right)^{\mathsf T}.
$$

よって

$$
m_3=m_2+\left(\frac5{17},\frac2{17}\right)^{\mathsf T}\frac12
=\left(\frac{11}{17},\frac1{17}\right)^{\mathsf T}.
$$

共分散の補正を成分ごとに求めると

$$
\begin{aligned}
S_3&=\begin{pmatrix}1/2&0\\0&1/5\end{pmatrix}
-\frac{10}{17}
\begin{pmatrix}1/4&1/10\\1/10&1/25\end{pmatrix}\\
&=\frac1{17}\begin{pmatrix}6&-1\\-1&3\end{pmatrix}.
\end{aligned}
$$

一括公式では精度行列は

$$
\Lambda_3=I_2+X^{\mathsf T}X+x_*x_*^{\mathsf T}
=\begin{pmatrix}3&1\\1&6\end{pmatrix},
$$

$\det\Lambda_3=18-1=17$ で逆行列は上の $S_3$。一次項は $X^{\mathsf T}y+x_*z=(2,1)^{\mathsf T}$ なので

$$
S_3(2,1)^{\mathsf T}=\frac1{17}(12-1,-2+3)^{\mathsf T}
=(11/17,1/17)^{\mathsf T}.
$$

逐次更新と一致した。

**（4）** $n=2,\sigma^2=1,\lambda=1/2$ とすると $\sigma^2/(n\lambda)=1$ なので事前共分散 $I_2$ と一致する。[Ridgeとの一致](#thm-ml2-02-ridge-map)により、最初の二観測に対するRidgeの唯一解は $m_2=(1/2,0)^{\mathsf T}$ である。追加観測後も**同じ**事前を保持するなら $n$ は3へ変わるため、Ridgeの $\lambda$ を同じ $1/2$ に固定するのではなく、等価な係数は $n\lambda=\sigma^2$ より $\lambda=1/3$ となる。
<!-- solution-end -->

## 8. まとめ

Gaussian線形回帰では、事前精度にデータの $X^{\mathsf T}X/\sigma^2$ が足され、線形項に $X^{\mathsf T}y/\sigma^2$ が足される。平方完成から求めた事後平均は適切な事前分散を選ぶとRidge推定値に一致するが、事後共分散も保持する点が異なる。新しい観測の予測分散には、係数の不確実性と将来の観測雑音の両方が必要になる。次講では、このGaussianの閉じた計算を手がかりに、より広い分布族でどのように事前・事後の形が保たれるかを調べる。
