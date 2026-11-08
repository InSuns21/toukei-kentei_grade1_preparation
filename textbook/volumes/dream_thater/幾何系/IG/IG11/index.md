# IG11 最尤法・最大エントロピーと情報射影

<!-- definition-example-audit: strict -->

[IG10 の情報射影](../IG10/index.md#def-ig10-information-projections)では、制約集合へ向かう二種類の KL 最小化を学びました。しかし、なぜ統計推定でその二種類が現れるのでしょうか。観測データからモデルを選ぶ**最尤法**と、平均などの制約から分布を選ぶ**最大エントロピー法**は、似た指数関数の式を返します。両方とも「KL を最小化する」とだけ覚えると、引数の向きと射影先を逆にします。

本講の中心は、次の二つを別々に証明してから接続することです。

- **最尤法**：観測から作った経験分布 $\widehat q$ を固定し、指数型モデル $p_\theta$ を動かして $D_{\mathrm{KL}}(\widehat q\Vert p_\theta)$ を小さくする。
- **最大エントロピー**：線形モーメントを固定した分布 $p$ を動かし、基準分布 $r$ からの $D_{\mathrm{KL}}(p\Vert r)$ を小さくする。一様な $r$ では Shannon エントロピーを最大にする。

まず有限標本空間で支持・境界の問題を明示し、正の最適分布が存在するときに限り Lagrange 乗数の指数表示へ進みます。最後に[IG9 の KL と Bregman の対応](../IG9/index.md#thm-ig9-exponential-kl)と[IG10 の Pythagoras](../IG10/index.md#thm-ig10-pythagoras)へ戻ります。連続分布、無限次元の最大エントロピー、EM や IPF の一般収束定理はここでは主張しません。

## 0. 有限モデル、零度数、KL の約束

標本空間を $S=\{1,\ldots,m\}$（$m\ge2$）とし、独立同分布な観測 $X_1,\ldots,X_n$（$n\ge1$）を取ります。値 $i$ の観測回数を $N_i$ とします。各度数を標本数で割ると、経験分布になります。

$$
N_i\ge0,\qquad \sum_iN_i=n,\qquad
\widehat q_i=N_i/n.
$$

モデル $\mathcal M$ は、当面すべての成分が正で総和1の確率ベクトルからなる非空集合とします。一般の統計モデルの正則性は[IG1 の有限正パラメータ表示](../IG1/index.md#def-ig1-finite-parametrization)、score の意味は[IG1 の方向スコア](../IG1/index.md#def-ig1-directional-score)、指数型表示は[IG4 の自然座標](../IG4/index.md#def-ig4-natural-chart)を参照してください。

分布 $q$ には $q_i=0$ を許し、$0\log 0=0$、$0\log(0/p_i)=0$（$p_i>0$）と約束します。したがって

$$
D_{\mathrm{KL}}(q\Vert p)
=\sum_{i:q_i>0}q_i\log\frac{q_i}{p_i}
$$

は、$p$ がすべて正なら有限です。以下 $D(q\Vert p)$ は $D_{\mathrm{KL}}(q\Vert p)$ の略記です。$p_i=0$ かつ $q_i>0$ を許す場合の KL は $+\infty$ とします。これは[IG3 の KL divergence](../IG3/index.md#thm-ig3-kl-fisher-hessian)を有限単体の境界まで拡張した約束です。

<a id="def-ig11-empirical-mle"></a>

<!-- formal-statement-start -->
> **定義（経験分布と有限モデルの最尤推定）**
> $S=\{1,\ldots,m\}$ 上の独立同分布標本 $x_1,\ldots,x_n$ と正の分布からなるモデル $\mathcal M$ に対し、経験分布 $\widehat q$ と尤度 $L$ を次で定める。

$$
\widehat q_i=\frac{N_i}{n},\qquad
L(p;x_1,\ldots,x_n)=\prod_{r=1}^n p_{x_r}
=\prod_{i=1}^m p_i^{N_i}.
$$

> $L(p;x_1,\ldots,x_n)$ を $\mathcal M$ 上で最大にする $p$ が存在するとき、それを **最尤推定分布** とする。この最大化を **最尤推定**（Maximum Likelihood Estimation; MLE）という。最大点が存在しないときは、上限値だけがあっても MLE が存在するとは呼ばない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig11-empirical-mle -->
**定義の確認**。$m=3$、標本 $(1,1,3,1,2)$ なら $(N_1,N_2,N_3)=(3,1,1)$、$\widehat q=(3/5,1/5,1/5)$ です。全成分が正の $p=(1/2,1/3,1/6)$ では $L(p)=(1/2)^3(1/3)(1/6)=1/144$ です。$N_i$ の和は5、$\widehat q$ の和は1で、尤度は標本順序の置換では変わりません。同じモデルで観測されなかった値があれば、その成分の度数は零であり、尤度の因子は $p_i^0=1$ になります。
<!-- definition-example-end -->

## 1. 最尤推定はどちら向きの KL か

対数を取ると積が和に変わります。経験分布だけに依存する項を差し引けば、パラメータに依存する部分はちょうど KL の**第2引数**の変化です。

<a id="thm-ig11-mle-kl"></a>

<!-- formal-statement-start -->
> **定理（最尤推定と KL 最小化の同値）**
> 第0節の有限標本、経験分布 $\widehat q$、正の有限モデル $\mathcal M$ に対し、任意の $p\in\mathcal M$ について

$$
\frac1n\log L(p)
=\sum_{i:\widehat q_i>0}\widehat q_i\log\widehat q_i
-D_{\mathrm{KL}}(\widehat q\Vert p).
$$

> 従って $\mathcal M$ 上での最尤推定分布の集合と、$D_{\mathrm{KL}}(\widehat q\Vert p)$ の最小点集合は等しい。いずれも空集合の可能性があり、モデルの閉性や正則性を仮定せず存在を結論してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

$N_i=n\widehat q_i$ を対数尤度へ代入し、$\widehat q_i\log p_i$ に $\widehat q_i\log\widehat q_i$ を加減するだけです。零度数は和から外します。

<!-- proof-start -->
### 証明

$p_i>0$ なので $L(p)>0$ で対数が取れます。[経験分布の定義](#def-ig11-empirical-mle)から

$$
\begin{aligned}
\frac1n\log L(p)
&=\frac1n\sum_iN_i\log p_i
=\sum_{i:\widehat q_i>0}\widehat q_i\log p_i\\
&=\sum_{i:\widehat q_i>0}\widehat q_i\log\widehat q_i
-\sum_{i:\widehat q_i>0}\widehat q_i
\log\frac{\widehat q_i}{p_i}.
\end{aligned}
$$

最後の和は $D_{\mathrm{KL}}(\widehat q\Vert p)$ です。最初の和はデータを固定すると $p$ に依存しません。従って、任意の二点 $p,p'\in\mathcal M$ で $\log L(p)\ge\log L(p')$ となる条件と $D_{\mathrm{KL}}(\widehat q\Vert p)\le D_{\mathrm{KL}}(\widehat q\Vert p')$ は同値です。上限・下限の達成も同時に起こるため、最適点集合が一致します。
<!-- proof-end -->

**境界に逃げる反例**。Bernoulli の成功確率を $0<p<1$ に制限し、$n$ 回すべて成功なら $L(p)=p^n$ です。$p\uparrow1$ で上限1へ近づきますが、$p=1$ はモデル外なので最尤推定値は**存在しません**。経験分布 $(0,1)$ の零成分を落とすことと、境界をモデルへ追加することは別の操作です。

正の全カテゴリカルモデルで経験分布に零成分がある場合も同様に、最適点は閉単体の境界にあり、正の開単体上では一般に達成されません。逆に $\widehat q$ が全成分正なら、正の単体上で $f(x)=\sum_i x_i\log x_i$ と置きます。このとき

$$
\frac{\partial f}{\partial x_i}(x)=\log x_i+1,\qquad
\nabla^2 f(x)=\operatorname{diag}(1/x_1,\ldots,1/x_m)>0
$$

です。各成分が正なので Hessian は正定値です。さらに両分布の成分和は1なので、[IG9 の Bregman divergence の定義](../IG9/index.md#def-ig9-bregman)に従って

$$
\begin{aligned}
D_f(\widehat q:p)
&=f(\widehat q)-f(p)-\nabla f(p)\cdot(\widehat q-p)\\
&=\sum_i\widehat q_i\log\frac{\widehat q_i}{p_i}
-\sum_i(\widehat q_i-p_i)
=D_{\mathrm{KL}}(\widehat q\Vert p).
\end{aligned}
$$

従って [IG9 の Bregman 非負性と零点判定](../IG9/index.md#thm-ig9-bregman-positive)を、正の領域・厳密凸性という仮定を満たして適用でき、$D_{\mathrm{KL}}(\widehat q\Vert p)\ge0$ の唯一の零点 $p=\widehat q$ がモデル内にあります。

## 2. 指数型モデルの最尤法：モーメント一致と存在条件

有限モデルで $h_i>0$ と $F(i)=(F_1(i),\ldots,F_d(i))\in\mathbb R^d$ を固定します。自然母数 $\theta\in\mathbb R^d$ に対し

$$
p_\theta(i)=h_i\exp\{\theta\cdot F(i)-\psi(\theta)\},
\qquad
\psi(\theta)=\log\sum_{j=1}^m h_j e^{\theta\cdot F(j)}
$$

と置きます。有限和なので任意の自然母数 $\theta$ で正規化され、微分と和の交換ができます。ここで

$$
\theta\cdot F=\sum_a\theta^aF_a,\qquad
\partial_a=\frac{\partial}{\partial\theta^a},\quad
\partial_{ab}=\frac{\partial^2}{\partial\theta^a\partial\theta^b}
$$

とし、他の自然母数成分を固定して微分します。[IG4 の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)から

$$
\nabla\psi(\theta)=E_\theta F,\qquad
\nabla^2\psi(\theta)=\operatorname{Cov}_\theta(F).
$$

観測の統計量平均を**経験モーメント**、特徴量の凸包を $K$ と呼びます。

$$
\overline F=\sum_i\widehat q_iF(i),\qquad
K=\operatorname{conv}\{F(1),\ldots,F(m)\}.
$$

この有限凸包は閉集合です。通常の $\mathbb R^d$ での内部を $\operatorname{int}K$、境界を $\partial K=K\setminus\operatorname{int}K$ と書きます。

$F(i)$ がアファインに $\mathbb R^d$ を張るとは、$v\cdot F(i)$ が全ての $i$ で一定となる $v$ は零ベクトルに限る、という条件です。これにより非零方向 $v$ の下で $\operatorname{Var}_\theta(v\cdot F)>0$ となり、Hessian が正定値になります。

<a id="thm-ig11-exponential-mle"></a>

<!-- formal-statement-start -->
> **定理（有限指数型分布族のモーメント一致と内点 MLE）**
> 有限集合 $S=\{1,\ldots,m\}$ 上で重み $h_i>0$ と、$\mathbb R^d$ をアファインに張る特徴量 $F(i)$ を取る。自然母数の定義域が $\mathbb R^d$ 全体の第2節の指数型モデルを考え、経験モーメントと特徴量の凸包を次で表す。

$$
t=\overline F=\sum_i\widehat q_iF(i),\qquad
K=\operatorname{conv}\{F(1),\ldots,F(m)\}.
$$
>
> 1. 対数尤度の勾配は $n\{t-\nabla\psi(\theta)\}$、Hessian は $-n\nabla^2\psi(\theta)$ で負定値である。したがって内点の MLE が存在するなら一意で、$\nabla\psi(\widehat\theta)=t$ を満たす。
> 2. $t\in\operatorname{int}K$ なら、有限な一意の $\widehat\theta\in\mathbb R^d$ が存在し、それが MLE となる。
> 3. $t\in\partial K$ なら、有限な自然母数で MLE は達成されない。
<!-- formal-statement-end -->

### 証明の見取り図

まず score が「観測の平均−モデルの平均」になることを直接計算します。存在には単なる極値条件では足りません。$t$ が凸包の内部なら、目的関数 $\psi(\theta)-\theta\cdot t$ は無限遠で発散するため最小値を取ります。境界では、すべて正の $p_\theta$ の平均が凸包の内部にあることが障害になります。

<!-- proof-start -->
### 証明

定義の $\log p_\theta(i)=\log h_i+\theta\cdot F(i)-\psi(\theta)$ を標本について足すと

$$
\ell(\theta)=\log L(p_\theta)
=n\theta\cdot t-n\psi(\theta)+\sum_iN_i\log h_i.
$$

従って

$$
\partial_a\ell=n(t_a-\partial_a\psi),\qquad
\partial_{ab}\ell=-n\operatorname{Cov}_\theta(F_a,F_b).
$$

非零 $v$ について

$$
v^\mathsf T\nabla^2\psi\,v
=\operatorname{Var}_\theta(v\cdot F)>0
$$

です。実際、全 $p_\theta(i)>0$ なので分散が零なら $v\cdot F(i)$ は全 $i$ で一定となり、アファイン全次元性に反します。ゆえに $\ell$ は厳密凹で、停留点があれば唯一の大域最大点です。

$t\in\operatorname{int}K$ なら、ある $\rho>0$ が存在して $t+\rho B\subset K$ です。ここで $B=\{v:\|v\|\le1\}$ です。任意の $\theta\ne0$ に対して $t+\rho\theta/\|\theta\|\in K$ なので、線形関数の凸結合の最大値を使うと

$$
\max_i\theta\cdot(F(i)-t)\ge \rho\|\theta\|.
$$

$h_{\min}=\min_i h_i>0$ と置き、対数和の最大項を残せば

$$
\begin{aligned}
\psi(\theta)-\theta\cdot t
&=\log\sum_i h_i e^{\theta\cdot(F(i)-t)}\\
&\ge\log h_{\min}+\max_i\theta\cdot(F(i)-t)
\ge\log h_{\min}+\rho\|\theta\|.
\end{aligned}
$$

よって連続な $\psi(\theta)-\theta\cdot t$ は無限遠で発散し、十分大きな閉球内で最小値を持ちます。定義域は全 $\mathbb R^d$ なので最小点で勾配が零、すなわち $\nabla\psi(\widehat\theta)=t$ です。厳密凸性から一意です。

最後に $t\in\partial K$ を考えます。ここで使う境界の分離も有限次元で確認します。$K$ の外の点 $x_k$ を $t$ へ近づけ、それぞれ $K$ 内の最短点 $y_k$ を取ります。$K$ はコンパクトなので最短点が存在し、

$$
\|y_k-t\|\le\|y_k-x_k\|+\|x_k-t\|
\le2\|x_k-t\|\to0
$$

です。$v_k=(x_k-y_k)/\|x_k-y_k\|$ と置きます。任意の $z\in K$ と $0\le s\le1$ に対して $y_k+s(z-y_k)\in K$ です。$y_k$ が最短点であることから、距離二乗を $s=0$ で右微分して

$$
0\le\left.\frac{d}{ds}
\|x_k-y_k-s(z-y_k)\|^2\right|_{s=0+}
=-2\|x_k-y_k\|\,v_k\cdot(z-y_k)
$$

を得ます。単位ベクトル $v_k$ の収束部分列を取れば非零の極限 $v$ があり、$y_k\to t$ と合わせて $v\cdot(z-t)\le0$（全 $z\in K$）です。従って $c=v\cdot t$ と置くと $v\cdot F(i)\le c$（全 $i$）。アファイン全次元性により少なくとも一つは真の不等号です。しかし $p_\theta(i)>0$ なので

$$
v\cdot E_\theta F
=\sum_i p_\theta(i)\,v\cdot F(i)<c=v\cdot t.
$$

従ってどの有限 $\theta$ も score 方程式を満たせません。もし最大点があれば開いた定義域の内点で勾配が零になるはずなので矛盾します。
<!-- proof-end -->

**何が学べたか**。第2節の対数尤度を積の形に戻すと

$$
L(p_\theta;x_1,\ldots,x_n)
=\left(\prod_{r=1}^n h_{x_r}\right)
\exp\left\{\theta\cdot\sum_{r=1}^n F(x_r)-n\psi(\theta)\right\}.
$$

共通の台 $S$ は自然母数 $\theta$ に依存しません。前の積は標本だけに依存し、指数因子は標本を次の統計量でのみ区別します。

$$
T(X_1,\ldots,X_n)=\sum_{r=1}^n F(X_r).
$$

従って、前の積を標本のみの因子、指数因子を $T$ のみに依存する因子に対応させると、[S1-02 の十分性判定](../../../../03_inference/S1_02_統計量_十分性_分解定理/index.md#thm-s1-02-01)の条件を満たします。これにより $T$ は十分統計量です。[IG4 の指数型表示](../IG4/index.md#def-ig4-natural-chart)とも整合します。

有限指数型の内点 MLE は経験モーメントだけから決まります。ただし凸包の境界では、モーメント一致を形式的に書いても有限解は生まれません。Bernoulli の全成功例は $K=[0,1]$、$t=1$ に当たります。

## 3. 最大エントロピーは別の向きの射影

ここからは自然母数でなく、**確率ベクトルそのもの**を動かします。基準分布 $r_i>0$（成分和1）と特徴量 $F(i)\in\mathbb R^d$ を固定し、$E_pF=t$ だけを知っている状況を考えます。

確率ベクトルの条件 $p_i\ge0$、$\sum_i p_i=1$ の下では

$$
E_pF=\sum_i p_iF(i)\in\operatorname{conv}\{F(i)\}
$$

となります。逆に凸結合の係数を成分 $p_i$ とすれば、指定モーメントを持つ分布が作れます。従って許容分布が存在する条件は、この節の特徴量について $t\in\operatorname{conv}\{F(1),\ldots,F(m)\}$ であることです。候補が複数なら、基準分布 $r$ からの KL を最小にする分布を選びます。

一方、**Shannon エントロピー**は $H(p)=-\sum_i p_i\log p_i$（$0\log0=0$）です。一様基準分布 $u_i=1/m$ なら

$$
D_{\mathrm{KL}}(p\Vert u)=\sum_i p_i\log p_i+\log m=\log m-H(p).
$$

よって一様基準からの KL 最小化は Shannon エントロピー最大化と一致します。一般の非一様 $r$ ではこの同値は成立せず、基準分布の重みが最適化に効きます。

<a id="def-ig11-moment-entropy"></a>

<!-- formal-statement-start -->
> **定義（モーメント制約と相対エントロピー最小化）**
> 有限集合 $S$、正の基準分布 $r$、写像 $F:S\to\mathbb R^d$ と $t\in\mathbb R^d$ に対し、線形モーメント制約集合を

$$
C_t=\left\{p\in[0,1]^m:
\sum_i p_i=1,\quad\sum_i p_iF(i)=t\right\}
$$

> とする。$C_t$ が空でないとき、$D_{\mathrm{KL}}(p\Vert r)$ を $C_t$ 上で最小にする分布を **相対エントロピー最小化分布** とする。$r_i=1/m$ の場合、同じ分布を **最大 Shannon エントロピー分布** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig11-moment-entropy -->
**定義の確認**。$S=\{1,2,3\}$、$F(1)=F(2)=1$、$F(3)=0$、$t=1/2$ とします。$C_{1/2}$ は次の線分です。

$$
p_1+p_2=1/2,\qquad p_3=1/2,\qquad
p_1,p_2\ge0.
$$

$p=(1/4,1/4,1/2)$ は全成分正で属し、端点 $(1/2,0,1/2)$ も属します。従って集合は非空・凸・コンパクトで、境界も含みます。正の基準分布 $r=(1/2,1/3,1/6)$ に対して、全ての許容分布の KL は有限です。

この集合上の最小点まで定義に従って確認します。$p=(s,1/2-s,1/2)$（$0\le s\le1/2$）と書くと、内部の目的関数 $J(s)=D(p\Vert r)$ は

$$
J'(s)=\log\frac{s/r_1}{(1/2-s)/r_2},
\qquad J''(s)=\frac1s+\frac1{1/2-s}>0.
$$

従って $J'(s)=0$ は $s=(1/2)r_1/(r_1+r_2)=3/10$ であり、連続性と厳密凸性から端点を含めた唯一の最小点は $p^*=(3/10,1/5,1/2)$ です。全成分非負、総和1、$E_{p^*}F=1/2$ も確認できます。
<!-- definition-example-end -->

この例で一様基準分布に替えれば、最大 Shannon エントロピー点は対称な $(1/4,1/4,1/2)$ です。非一様な $r$ の相対エントロピー最小点とは区別します。

<a id="thm-ig11-maxent"></a>

<!-- formal-statement-start -->
> **定理（線形制約下の相対エントロピー最小化）**
> $S$ は有限、$r_i>0$、$\sum_i r_i=1$、$F:S\to\mathbb R^d$ とする。$C_t$ が非空なら $D_{\mathrm{KL}}(p\Vert r)$ の最小点 $p^*$ は一意に存在する。さらに $C_t$ にすべての成分が正である分布が一つでも存在するなら $p_i^*>0$（全 $i$）で、ある $\lambda\in\mathbb R^d$ により

$$
p_i^*
=r_i\exp\{\lambda\cdot F(i)-\psi_r(\lambda)\},
\qquad
\psi_r(\lambda)=\log\sum_j r_j e^{\lambda\cdot F(j)}
$$

> と表される。このとき $\sum_i p_i^*F(i)=t$ であり、すべての $p\in C_t$ について

$$
D_{\mathrm{KL}}(p\Vert r)
=D_{\mathrm{KL}}(p\Vert p^*)+D_{\mathrm{KL}}(p^*\Vert r)
$$

> が成り立つ。$p^*$ は一意だが、$F$ に冗長な方向がある場合は $\lambda$ の一意性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

最初に閉単体と連続性で存在、$x\log x$ の厳密凸性で一意性を証明します。正の許容点があれば境界解からその点へ少し動かすと $t\log t$ 項が減るため、最適解も正です。内部では Lagrange 乗数（正確には線形制約の接方向に対する直交）から指数表示を得ます。

<!-- proof-start -->
### 証明

$C_t$ は閉単体と有限個の線形等式の共通部分で、非空ならコンパクトかつ凸です。関数 $x\mapsto x\log(x/r_i)$ は $x\ge0$ で連続（$0\log0=0$）であり、$x>0$ では二階微分 $1/x>0$ です。境界を含めても厳密凸であるため、$D(p\Vert r)$ は $C_t$ 上で唯一の最小点 $p^*$ を持ちます。

全成分正の $q\in C_t$ があるとします。仮に $p_i^*=0$ となる成分があれば、$p(s)=(1-s)p^*+sq$（$0<s<1$）は $C_t$ に残ります。零だった成分の KL 項は

$$
sq_i\log\frac{sq_i}{r_i}
=sq_i\log s+sq_i\log\frac{q_i}{r_i}
$$

であり、$(D(p(s)\Vert r)-D(p^*\Vert r))/s$ には $q_i\log s\to-\infty$ が現れます。他の零成分も同じ負の発散を持ち、元から正の成分の差商は有限です。十分小さな $s$ で目的関数は減少し、最小性に矛盾します。従って $p^*>0$ です。

制約の接方向は

$$
T=\left\{v\in\mathbb R^m:
\sum_i v_i=0,\quad\sum_i v_iF(i)=0\right\}
$$

です。$p^*>0$ なら、任意の $v\in T$ に対し十分小さな正負の $s$ で $p^*+sv\in C_t$ です。最小性から方向微分が零となるので

$$
\sum_i v_i\left(\log\frac{p_i^*}{r_i}+1\right)=0
\qquad(v\in T).
$$

この直交補の形も確認します。線形写像 $A:\mathbb R^m\to\mathbb R^{d+1}$ を

$$
Av=\left(\sum_i v_i,\sum_i v_iF_1(i),\ldots,\sum_i v_iF_d(i)\right)
$$

と置くと $T=\ker A$ であり、転置は $A^{\mathsf T}(a,\lambda)=(a+\lambda\cdot F(i))_i$ です。有限次元の $\ker A$ と行空間の直交性から $(\ker A)^\perp=\operatorname{im}A^{\mathsf T}$ なので、$T^\perp$ はベクトル $(1,\ldots,1)$ と $(F_a(i))_i$ の張る空間です。従ってある $a\in\mathbb R,\lambda\in\mathbb R^d$ が存在して

$$
\log\frac{p_i^*}{r_i}+1=a+\lambda\cdot F(i).
$$

正規化を使うと $e^{a-1}=(\sum_i r_i e^{\lambda\cdot F(i)})^{-1}$、すなわち $a-1=-\psi_r(\lambda)$ です。これが指数表示です。モーメント一致は $p^*\in C_t$ から従います。

最後に任意の $p\in C_t$ について（零成分には $0\log0=0$ を用い）

$$
\begin{aligned}
&D(p\Vert r)-D(p\Vert p^*)-D(p^*\Vert r)\\
&\quad=\sum_i(p_i-p_i^*)\log\frac{p_i^*}{r_i}\\
&\quad=\lambda\cdot\sum_i(p_i-p_i^*)F(i)
-\psi_r(\lambda)\sum_i(p_i-p_i^*)=0.
\end{aligned}
$$

二つの和はどちらも制約により零です。[IG10 の凸射影定理](../IG10/index.md#thm-ig10-convex-projection)の情報幾何学的な等式を、境界も許す有限和で直接証明しました。
<!-- proof-end -->

**条件を失うとどうなるか**。$S=\{0,1\}$、$F(x)=x$、$E_pF=1$ なら許容集合は $(p_0,p_1)=(0,1)$ だけです。KL の最小点は存在しますが正ではありません。指数表示 $p_\lambda(1)=r_1e^\lambda/(r_0+r_1e^\lambda)$ は有限な $\lambda$ で常に1未満なので、有限な乗数は存在しません。**最適分布の存在**と**有限な指数パラメータの存在**を区別するために、正の許容点という仮定が必要でした。

## 4. 二つの射影が一致する条件と Pythagoras

第2節の指数型モデルで重みを正規化して $r_i>0$、$\sum r_i=1$ とし、$h_i=r_i$ を採用します。$F(i)$ の凸包が全次元で、観測モーメント $t=\sum_i\widehat q_iF(i)$ が内部にあるとします。このとき第2節で得た $\widehat\theta$ は、モデル分布のモーメントをちょうど $t$ にします。第3節のモーメント制約集合 $C_t$ にも同じモデル分布が入るため、二つの最適化が接続されます。

幾何の向きは[IG10 の e/m 射影の定義](../IG10/index.md#def-ig10-information-projections)に従い、**指数型モデルへの MLE は m-射影**（$D(\widehat q\Vert p_\theta)$）、**モーメント制約への相対エントロピー最小化は e-射影**（$D(p\Vert r)$）です。$\widehat q$ の零成分は正の単体の外側にあるため、その場合の「m-射影」は有限 KL での境界拡張として読むことにします。測地線が境界上で通常どおり定義されると主張していません。

<a id="thm-ig11-dual-projections"></a>

<!-- formal-statement-start -->
> **定理（MLE と最大エントロピーの共通解と双方向 Pythagoras）**
> 有限集合 $S$、正の確率分布 $r$、$F:S\to\mathbb R^d$ を取り、$F(i)$ が $\mathbb R^d$ をアファインに張るとする。$\widehat q$ は零成分を許す経験分布、$t=\sum_i\widehat q_iF(i)\in\operatorname{int}\operatorname{conv}\{F(i)\}$ とする。
>
> 指数型族 $p_\theta(i)=r_i e^{\theta\cdot F(i)-\psi_r(\theta)}$ 上の一意の MLE $p^*=p_{\widehat\theta}$ は、$C_t$ 上の一意の $D(p\Vert r)$ 最小点と一致する。さらに任意の $p\in C_t$ と任意の $\theta\in\mathbb R^d$ について、次の二つの等式が成り立つ。

$$
\begin{aligned}
D(p\Vert r)&=D(p\Vert p^*)+D(p^*\Vert r),\\
D(\widehat q\Vert p_\theta)
&=D(\widehat q\Vert p^*)+D(p^*\Vert p_\theta).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

[有限指数型分布族のモーメント一致と内点 MLE](#thm-ig11-exponential-mle)から $\nabla\psi_r(\widehat\theta)=t$ を得ます。凸包内部の $t$ は正の許容分布からも表せるので、[相対エントロピー最小化定理](#thm-ig11-maxent)が適用できます。両者を同定した後、KL の差から $\sum_i(p_i-p_i^*)F(i)=0$ をくくり出します。

<!-- proof-start -->
### 証明

$t$ が凸包の内部にあるので、[有限指数型分布族のモーメント一致と内点 MLE](#thm-ig11-exponential-mle)を適用できます。有限で一意の $\widehat\theta$ が存在し、$E_{p^*}F=t$ です。

また、基準分布の全成分が正なので $p_i^*>0$ です。よって $p^*\in C_t$ は正の許容分布であり、[相対エントロピー最小化定理](#thm-ig11-maxent)の仮定も満たします。この分布が実際に最適であることを、任意の $p\in C_t$ に対して次の等式で確認します。

$$
D(p\Vert r)-D(p\Vert p^*)-D(p^*\Vert r)
=\sum_i(p_i-p_i^*)\{\widehat\theta\cdot F(i)-\psi_r(\widehat\theta)\}=0
$$

であり、KL 非負性から $p^*$ が一意の最小点です。

次に $\theta$ を任意に固定します。指数族の対数比は

$$
\log\frac{p^*(i)}{p_\theta(i)}
=(\widehat\theta-\theta)\cdot F(i)
-\psi_r(\widehat\theta)+\psi_r(\theta).
$$

三つの KL を差し引くと

$$
\begin{aligned}
&D(\widehat q\Vert p_\theta)
-D(\widehat q\Vert p^*)-D(p^*\Vert p_\theta)\\
&\quad=\sum_i(\widehat q_i-p_i^*)
\log\frac{p^*(i)}{p_\theta(i)}\\
&\quad=(\widehat\theta-\theta)\cdot
\left(\sum_i\widehat q_iF(i)-\sum_i p_i^*F(i)\right)
-\{\psi_r(\widehat\theta)-\psi_r(\theta)\}
\left(\sum_i\widehat q_i-\sum_i p_i^*\right)=0.
\end{aligned}
$$

経験分布に零成分があっても、対数比の分母・分子はともに正なので計算は有効です。$D(p^*\Vert p_\theta)\ge0$ から MLE の最適性も再確認できます。
<!-- proof-end -->

**重要な非対称性**。第1式は任意の**モーメント制約分布** $p$ について、第2式は**指数型族の候補** $p_\theta$ について成り立ちます。制約集合を交換したり KL の引数を裏返したりした等式は一般に成立しません。対応する座標は[IG8 の e/m 測地線](../IG8/index.md#def-ig8-em-geodesic)と[IG10 の情報射影](../IG10/index.md#def-ig10-information-projections)で学んだ二種類です。

### 三状態カテゴリカル分布を手で計算する

$r=(1/2,1/3,1/6)$、$F(1)=F(2)=1,F(3)=0$ として $t=1/2$ を与えます。$\psi_r(\theta)=\log\{(5/6)e^\theta+1/6\}$ なので

$$
E_\theta F=\frac{(5/6)e^\theta}{(5/6)e^\theta+1/6}=\frac12
\quad\Longleftrightarrow\quad e^\theta=\frac15.
$$

従って $\widehat\theta=-\log5$、正規化因子は $(5/6)(1/5)+1/6=1/3$、最適分布は

$$
p^*=\left(\frac3{10},\frac15,\frac12\right).
$$

$p_1^*+p_2^*=1/2$、$\sum p_i^*=1$、全成分正であり、[IG10 の群和制約への e-射影](../IG10/index.md#thm-ig10-categorical-e-projection)とも一致します。例えば標本からの $\widehat q=(1/4,1/4,1/2)$ は同じモーメントを持ちますが、$p^*\ne\widehat q$ です。モデル族の中での MLE と、モーメントを保った最小相対エントロピー解が一致する一方、経験分布自体とは一般に一致しません。

## 5. 反復射影は「一回ごとの最適性」と「収束」を分ける

複数のモーメント制約を一度に扱えないとき、線形制約集合へ順に $D(p\Vert\text{直前の分布})$ を最小化する方法が考えられます。これは反復比例調整（IPF）の有限カテゴリカル版へつながる発想ですが、**一回ごとに最適**という事実だけでは全制約への収束を導けません。

上の $r=(1/2,1/3,1/6)$ に二つの集合

$$
C_1=\{p:p_1+p_2=1/2\},\qquad
C_2=\{p:p_2+p_3=2/3\}
$$

を考え、どちらも単体内の確率分布とします。第1の射影は

$$
q^{(1)}=(3/10,1/5,1/2)\in C_1.
$$

$C_2$ への次の前向き KL 射影では第1成分を $1/3$ に固定し、残りを $q^{(1)}_2:q^{(1)}_3=2:5$ で配分するので

$$
q^{(2)}=(1/3,4/21,10/21)\in C_2,\qquad
q^{(2)}_1+q^{(2)}_2=11/21\ne1/2.
$$

この第2射影の比も確認できます。$p_1=1/3$、$p_2=s$、$p_3=2/3-s$ と置くと、$D(p\Vert q^{(1)})$ の $s$ 微分は

$$
\log\frac{s/q_2^{(1)}}{(2/3-s)/q_3^{(1)}}
$$

です。零条件から $s/(2/3-s)=q_2^{(1)}/q_3^{(1)}=2/5$ が出ます。$C_1,C_2$ は境界を含みますが、各段階で基準分布が正で正の許容点もあるので、[相対エントロピー最小化定理](#thm-ig11-maxent)がそれぞれ一意の全域最小点を保証します。二回の射影後に $C_1$ の制約が壊れています。これだけで反復法の非収束が証明されたわけでもありません。収束には、集合の可行性・境界・反復順序・目的関数の変化などを別に検討する必要があります。

## 6. 演習：尤度・凸包・二種類の KL

### IG11-A01 零度数を含む経験 KL

標本空間 $S=\{1,2,3\}$ の標本 $(1,3,1,1)$ と正の分布 $p=(1/2,1/3,1/6)$ を取る。経験分布、尤度、$D(\widehat q\Vert p)$ と第1節の恒等式を求めよ。

- Level: A
- 狙い: 経験分布の零成分を正しく扱う

<!-- solution-start -->
**詳細解答**

$(N_1,N_2,N_3)=(3,0,1)$、$n=4$ なので $\widehat q=(3/4,0,1/4)$ です。尤度は

$$
L(p)=(1/2)^3(1/3)^0(1/6)=1/48.
$$

零成分の KL 項は零であり

$$
D(\widehat q\Vert p)
=\frac34\log\frac{3/4}{1/2}
+\frac14\log\frac{1/4}{1/6}
=\log\frac32.
$$

経験エントロピー項は $(3/4)\log(3/4)+(1/4)\log(1/4)$ なので、[最尤と KL の同値](#thm-ig11-mle-kl)の右辺は

$$
\frac34\log\frac34+\frac14\log\frac14-\log\frac32
=\frac14\log\frac1{48}=\frac14\log L(p).
$$
<!-- solution-end -->

### IG11-A02 Bernoulli の内点と境界

Bernoulli($p$)、$0<p<1$ の標本で成功2回・失敗3回の場合の MLE を求めよ。成功5回・失敗0回なら何が変わるか。

- Level: A
- 狙い: 停留点と境界の非存在を区別する

<!-- solution-start -->
**詳細解答**

最初の標本では $\ell(p)=2\log p+3\log(1-p)$、$\ell'(p)=2/p-3/(1-p)$ です。$\ell'(p)=0$ は $2(1-p)=3p$、すなわち $p=2/5$ です。二階微分 $-2/p^2-3/(1-p)^2<0$ より唯一の MLE です。次の標本では $\ell(p)=5\log p$、$\ell'(p)=5/p>0$ なので開区間の最大点はなく、$p\uparrow1$ で上限0に近づくだけです。[内点 MLE 定理](#thm-ig11-exponential-mle)では $t=1\in\partial[0,1]$ に相当します。
<!-- solution-end -->

### IG11-A03 score と標本モーメント

$S=\{0,1\}$、$h_0=h_1=1$、$F(x)=x$、$p_\theta(x)=e^{\theta x}/(1+e^\theta)$ とする。成功割合が $2/5$ の標本で、score を計算し $\widehat\theta$ を求めよ。

- Level: A
- 狙い: モーメント一致を勾配から導く

<!-- solution-start -->
**詳細解答**

$\psi(\theta)=\log(1+e^\theta)$ なので $\psi'(\theta)=e^\theta/(1+e^\theta)$ です。$\ell'(\theta)=n\{2/5-\psi'(\theta)\}$ であり、零条件は

$$
\frac{e^{\widehat\theta}}{1+e^{\widehat\theta}}=\frac25
\quad\Longleftrightarrow\quad
5e^{\widehat\theta}=2+2e^{\widehat\theta}
\quad\Longleftrightarrow\quad
\widehat\theta=\log\frac23.
$$

$\psi''(\theta)=e^\theta/(1+e^\theta)^2>0$ なので $\ell''<0$、一意の MLE です。
<!-- solution-end -->

### IG11-A04 一様基準分布での最大エントロピー

3点分布に $p_3=1/2$ を課す。Shannon エントロピー $H(p)$ の最大点を求めよ。

- Level: A
- 狙い: 一様基準分布の KL と Shannon エントロピーを結ぶ

<!-- solution-start -->
**詳細解答**

$p_1=s,p_2=1/2-s$、$0\le s\le1/2$ です。境界の $0\log0=0$ を用いて $H$ は連続で、内部では

$$
H'(s)=-\log s+\log(1/2-s),\quad
H''(s)=-1/s-1/(1/2-s)<0.
$$

$H'(s)=0$ は $s=1/4$ なので唯一の最大点は $(1/4,1/4,1/2)$ です。$D(p\Vert(1/3,1/3,1/3))=\log3-H(p)$ からも同じ結論です。[相対エントロピー最小化定理](#thm-ig11-maxent)の正の許容点条件も満たします。
<!-- solution-end -->

### IG11-A05 非一様基準分布での最大エントロピーとの違い

$r=(1/2,1/3,1/6)$、$p_1+p_2=1/2$ を課す。$D(p\Vert r)$ の最小点を求め、前問との違いを述べよ。

- Level: A
- 狙い: 基準分布が非一様なときの最小化を計算する

<!-- solution-start -->
**詳細解答**

正の候補を求めるため [IG10 のカテゴリカル e-射影](../IG10/index.md#thm-ig10-categorical-e-projection)へ $a=1/2$、$r_1+r_2=5/6$ を代入すると

$$
p^*=\left(\frac{(1/2)(1/2)}{5/6},
\frac{(1/2)(1/3)}{5/6},\frac12\right)
=(3/10,1/5,1/2).
$$

各成分正、総和1、群和1/2を確認できます。第1、2成分の比は $3:2=r_1:r_2$ です。境界を含む制約集合全体での一意の最適性は、正の許容点があるため適用できる[本章の相対エントロピー最小化定理](#thm-ig11-maxent)でも保証されます。前問の $(1/4,1/4,1/2)$ と違い、これは **$D(p\Vert r)$ の最小点**であって一般に $H(p)$ の最大点ではありません。
<!-- solution-end -->

### IG11-B01 線形制約の乗数式を自力で導く

$r_i>0$ と線形制約 $\sum_i p_i=1$、$\sum_i p_iF(i)=t$ を満たす正の内点極小点 $p^*$ を仮定する。Lagrange 乗数から指数表示を導き、乗数の一意性に必要な条件を説明せよ。

- Level: B
- 狙い: Lagrange 乗数と正規化を省略せず導く

<!-- solution-start -->
**詳細解答**

関数

$$
\mathcal L(p,a,\lambda)
=\sum_i p_i\log(p_i/r_i)
-a\left(\sum_i p_i-1\right)
-\lambda\cdot\left(\sum_i p_iF(i)-t\right)
$$

を正の成分 $p_i$ で微分します。停留条件は

$$
\partial_{p_i}\mathcal L
=\log(p_i/r_i)+1-a-\lambda\cdot F(i)=0
$$

なので

$$
p_i=r_i e^{a-1+\lambda\cdot F(i)}.
$$

$\sum_i p_i=1$ を入れると $e^{a-1}=1/\sum_j r_j e^{\lambda\cdot F(j)}$ です。従って[相対エントロピー最小化定理](#thm-ig11-maxent)と同じ正規化済みの指数表示になります。$F$ に、$v\cdot F(i)$ が全 $i$ で一定となる非零 $v$ があれば、$\lambda$ をその方向へ動かしても正規化後の分布は不変です。アファイン全次元性なら $\nabla^2\psi_r=\operatorname{Cov}(F)>0$ により $\lambda$ は一意です。
<!-- solution-end -->

### IG11-B02 MLE 側の Pythagoras を数値検算

$r=(1/2,1/3,1/6)$、$F=(1,1,0)$、$\widehat q=(1/4,1/4,1/2)$ とする。指数型族 $p_\theta\propto r_i e^{\theta F(i)}$ の MLE $p^*$ を求め、$D(\widehat q\Vert r)=D(\widehat q\Vert p^*)+D(p^*\Vert r)$ を対数式で検算せよ。

- Level: B
- 狙い: m-射影の KL の向きと分解を照合する

<!-- solution-start -->
**詳細解答**

$t=1/2$ なので第4節と同じ計算で $\widehat\theta=-\log5$、$p^*=(3/10,1/5,1/2)$ です。左辺は

$$
D(\widehat q\Vert r)
=\frac14\log\frac12+\frac14\log\frac34+\frac12\log3
=\frac14\log\frac{27}{8}.
$$

右辺の第1項は

$$
D(\widehat q\Vert p^*)
=\frac14\log\frac{5}{6}+\frac14\log\frac54
=\frac14\log\frac{25}{24},
$$

第2項は

$$
D(p^*\Vert r)
=\left(\frac3{10}+\frac15\right)\log\frac35+\frac12\log3
=\frac12\log\frac95.
$$

和は $\frac14\log\{(25/24)(9/5)^2\}=\frac14\log(27/8)$ です。[双方向 Pythagoras 定理](#thm-ig11-dual-projections)の第2式を $\theta=0$ で検算しました。
<!-- solution-end -->

### IG11-B03 境界と有限 Lagrange 乗数

$S=\{0,1\}$、$r=(1/2,1/2)$、$F(x)=x$ に対して $E_pF=1$ を課す。最適分布と相対エントロピーを求め、有限な指数パラメータで表せない理由を述べよ。

- Level: B
- 狙い: KL 最適解の存在と有限パラメータの存在を分ける

<!-- solution-start -->
**詳細解答**

制約 $p_1=1$ と正規化から $p=(0,1)$ しかありません。従ってこれが唯一の最適分布で、$D(p\Vert r)=\log(1/(1/2))=\log2$ です。指数表示なら

$$
p_\lambda(1)=\frac{e^\lambda}{1+e^\lambda}<1
\qquad(\lambda\in\mathbb R).
$$

どの有限 $\lambda$ も制約を満たさず、$\lambda\to+\infty$ の極限でのみ $(0,1)$ を得ます。正の許容点が存在しないため、[相対エントロピー最小化定理](#thm-ig11-maxent)の指数表示の追加仮定は満たされません。
<!-- solution-end -->

### IG11-B04 二回の交互射影で何が崩れるか

$r=(1/2,1/3,1/6)$ から $C_1=\{p:p_1+p_2=1/2\}$、次に $C_2=\{p:p_2+p_3=2/3\}$ へ、それぞれ $D(p\Vert\text{直前の分布})$ を最小化する。二回の結果を求め、両制約の成否を判定せよ。

- Level: B
- 狙い: 一回ごとの Pythagoras と全制約の同時達成を混同しない

<!-- solution-start -->
**詳細解答**

[IG10 の群和制約射影](../IG10/index.md#thm-ig10-categorical-e-projection)で正の候補を求めます。境界を含む一意の最小性は[本章の相対エントロピー最小化定理](#thm-ig11-maxent)で保証され、最初の結果は

$$
q^{(1)}=(3/10,1/5,1/2).
$$

次の制約は第1成分を $1/3$ に固定し、残りの合計を $2/3$ にします。直前の第2・3成分の和は $7/10$、比は $2:5$ ですから

$$
q^{(2)}=\left(\frac13,\frac23\frac27,\frac23\frac57\right)
=\left(\frac13,\frac4{21},\frac{10}{21}\right).
$$

$q_2^{(2)}+q_3^{(2)}=14/21=2/3$ は成立しますが、$q_1^{(2)}+q_2^{(2)}=11/21\ne1/2$ です。各射影は対応する制約には最適でも、二回後に両方の制約を満たすとは限りません。この一例だけで反復の極限については何も結論できません。
<!-- solution-end -->

### IG11-C01 3点指数族で二種類の射影を同時に証明する

$S=\{0,1,2\}$、$r_i=1/3$、$F(i)=i$ とする。標本の度数が $(N_0,N_1,N_2)=(2,0,5)$ のとき、次を求めよ。

1. 経験分布とモーメント $t$、指数族 $p_\theta(i)=e^{\theta i}/(1+e^\theta+e^{2\theta})$ の一意の MLE。
2. $E_pF=t$ を満たす全分布の Shannon エントロピー最大点と、それが MLE と一致する理由。
3. 任意の $\theta$ に対する $D(\widehat q\Vert p_\theta)=D(\widehat q\Vert p^*)+D(p^*\Vert p_\theta)$ の証明。
4. 度数を $(0,0,7)$ に変えたときに、どの結論が有限自然母数では壊れるか。

- Level: C
- 狙い: 零度数・凸包内点・score・最大エントロピー・射影の向きを統合する

<!-- solution-start -->
**詳細解答**

標本数は7なので $\widehat q=(2/7,0,5/7)$ です。$t=0(2/7)+1(0)+2(5/7)=10/7$ は $K=[0,2]$ の内部にあります。$z=e^\theta>0$ と置くと

$$
E_\theta F=\frac{z+2z^2}{1+z+z^2}.
$$

$z=2$ を代入すれば $(2+8)/(1+2+4)=10/7=t$ です。[内点 MLE 定理](#thm-ig11-exponential-mle)で自然母数が一意に存在するため、$\widehat\theta=\log2$、$p^*=(1/7,2/7,4/7)$ が一意の MLE です。$\widehat q$ の零度数は尤度の第1・3成分だけへの依存を意味しますが、モデル分布 $p^*$ は全成分正です。

エントロピー最大化では $D(p\Vert r)=\log3-H(p)$ です。$p^*$ は全成分正で $E_{p^*}F=t$ を満たすので、[共通解と双方向 Pythagoras の定理](#thm-ig11-dual-projections)の第1式をこの一様基準分布へ適用できます。任意の制約分布 $p$ について

$$
\log3-H(p)
=D(p\Vert p^*)+\log3-H(p^*).
$$

従って $H(p^*)-H(p)=D(p\Vert p^*)\ge0$ であり、零点は $p=p^*$ に限ります。$p^*$ は唯一の最大エントロピー分布です。これは $\widehat q$ をエントロピー最大にしたのではありません。

任意の $\theta$ について

$$
\log\frac{p^*(i)}{p_\theta(i)}
=(\log2-\theta)i-\log7+\log(1+e^\theta+e^{2\theta}).
$$

従って三つの KL の差は

$$
\begin{aligned}
&D(\widehat q\Vert p_\theta)-D(\widehat q\Vert p^*)
-D(p^*\Vert p_\theta)\\
&\quad=\sum_i(\widehat q_i-p_i^*)\log\frac{p_i^*}{p_\theta(i)}\\
&\quad=(\log2-\theta)(E_{\widehat q}F-E_{p^*}F)
+\{\log(1+e^\theta+e^{2\theta})-\log7\}
(\sum_i\widehat q_i-\sum_i p_i^*)=0.
\end{aligned}
$$

さらに $D(\widehat q\Vert p^*)=(2/7)\log2+(5/7)\log(5/4)$ です。零成分は寄与しません。

最後に度数 $(0,0,7)$ なら $t=2\in\partial K$ です。エントロピー最大点は制約から $(0,0,1)$ と決まりますが、有限 $\theta$ では $p_\theta(0)>0,p_\theta(1)>0$ なので $E_\theta F<2$ です。$\theta\to+\infty$ の極限でだけ境界分布へ近づき、有限の MLE と有限の乗数表示は存在しません。問題は一意性の計算でなく、内点仮定の喪失です。
<!-- solution-end -->

---

## この講のまとめ

- データを固定した MLE は $D(\widehat q\Vert p_\theta)$ の最小化です。指数型族では score 方程式が経験モーメントとモデルモーメントの一致になります。
- モーメントを固定した最大エントロピーは、一様基準分布からの $D(p\Vert u)$ 最小化です。一般の $r$ なら相対エントロピー最小化で、Shannon エントロピー最大化とは異なります。
- 内点かつ同じ基準分布・特徴量を使うと二つの射影の解は一致しますが、**射影先と KL の向きは別**です。境界では有限 MLE・有限乗数が存在しない場合があります。

次の IG12 では、この KL の局所二次形を使い、最小化を更新則として動かす自然勾配へ進みます。
