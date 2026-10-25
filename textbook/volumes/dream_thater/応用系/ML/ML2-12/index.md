# ML2-12 Gaussian process回帰と不確実性

[Bayes線形回帰の事後予測](../ML2-02/index.md#thm-ml2-02-predictive-variance)では、係数の不確実性が予測平均の不確実性を作り、そこへ観測雑音が加わることを学んだ。しかし直線の係数が何個あっても、あらかじめ選んだ特徴の形に予測が制限される。近くの観測点の情報は強く、遠い点の情報は弱く使うような関数の事前分布を作れるだろうか。

**Gaussian process（ガウス過程）回帰**では、関数全体を有限個の係数で表す代わりに、任意の有限個の入力点での関数値を同時Gaussian分布で記述する。入力間の共分散を決める「核」が、どこへ情報を伝えるかを制御する。ここで必要なのは、予測曲線を一つ出すだけではない。**観測から未観測関数値について何が分かり、何が分からないまま残るか**を計算できることだ。

## 1. 核から関数値の同時分布を作る

入力の集合を $\mathcal X$（本講の計算例では $\mathbb R$）とする。未知の実数値関数を確率的に表すとき、各入力 $x$ に確率変数 $F(x)$ を対応させる。平均関数 $m(x)=E[F(x)]$ は中心となる予測、共分散関数 $k(x,x')=\operatorname{Cov}(F(x),F(x'))$ は二点の連動を表す。

例えば異なる二点 $a,b$ の関数値に、平均0、分散1、共分散 $\rho$ を指定したい。二点での共分散行列は

$$
K=\begin{pmatrix}1&\rho\\ \rho&1\end{pmatrix}.
$$

両点を任意の実係数 $u,v$ で足した量の分散は

$$
\operatorname{Var}\{uF(a)+vF(b)\}
=u^2+2\rho uv+v^2
=(u+\rho v)^2+(1-\rho^2)v^2.
$$

ゆえに $|\rho|\le1$ が必要であり、このとき十分でもある。実際 $|\rho|\le1$ なら独立な標準正規変数 $Z_1,Z_2$ に対し

$$
F(a)=Z_1,\qquad F(b)=\rho Z_1+\sqrt{1-\rho^2}\,Z_2
$$

で同じ共分散が実現できる。$\rho=1$ では両値がほぼ確実に一致し、行列は特異だが分布は存在する。**密度がないことと、確率分布がないことは別**である。

[正半定値核の定義](../../RKHS/RKHS1/index.md#def-rkhs1-psd-kernel)によれば、対称関数 $k:\mathcal X^2\to\mathbb R$ が正半定値であるとは、任意の $n\ge1$、任意の入力 $x_1,\ldots,x_n$（重複も可）、任意の実数 $c_1,\ldots,c_n$ について

$$
\sum_{i=1}^n\sum_{j=1}^n c_ic_j k(x_i,x_j)\ge0
$$

となることだ。行列 $K_{ij}=k(x_i,x_j)$ を Gram 行列と呼ぶ。これは $\sum_i c_iF(x_i)$ の分散として必要な条件そのものである。再生核 Hilbert 空間でも同じ核が現れるが、本講ではまず**確率変数の共分散**として使う。

ここで既習の[Gaussian processの定義](../../../解析系/STO/STO3/index.md#def-sto3-gaussian-process)を、回帰に使う形に固定しよう。

<a id="def-ml2-12-gp-prior"></a>

<!-- formal-statement-start -->
> **定義（回帰のGaussian process事前モデル）**  
> 集合 $\mathcal X$ 上の平均関数 $m:\mathcal X\to\mathbb R$ と対称正半定値核 $k:\mathcal X^2\to\mathbb R$ を与える。
> 任意の有限列 $x_1,\ldots,x_n\in\mathcal X$ に対し、関数値ベクトル $(F(x_1),\ldots,F(x_n))^\mathsf T$ の平均・共分散がそれぞれ

$$
m_X=(m(x_i))_{i=1}^n,\qquad
K_X=(k(x_i,x_j))_{i,j=1}^n
$$

> で、これらの多変量Gaussian法則に従う確率過程 $F$ を回帰のGaussian process事前モデルという。$F\sim\operatorname{GP}(m,k)$ と書く。共分散行列は特異でもよく、密度の存在を要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-12-gp-prior -->
**定義の確認**。有限入力集合 $\mathcal X=\{a,b\}$、$m=0$、$k(a,a)=k(b,b)=1$、$k(a,b)=k(b,a)=1/2$ とする。核は対称であり、任意の係数 $c=(u,v)$ に対し

$$
c^\mathsf TKc=(u+v/2)^2+3v^2/4\ge0.
$$

上で構成した $F(a)=Z_1,\ F(b)=Z_1/2+\sqrt3 Z_2/2$ は平均0、分散1、共分散 $1/2$ である。重複入力 $(a,a)$ なら関数値は同じ $F(a)$ を二度並べるため、共分散は $\left(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\right)$ となり、これも正半定値である。

二点に限らず、任意の有限列 $x_1,\ldots,x_n\in\{a,b\}$（重複を含む）と係数 $c_i$ に対し、$C_a=\sum_{i:x_i=a}c_i$、$C_b=\sum_{i:x_i=b}c_i$ とまとめれば

$$
\begin{aligned}
\sum_{i,j=1}^n c_ic_jk(x_i,x_j)
&=\operatorname{Var}\left(\sum_{i=1}^n c_iF(x_i)\right)\\
&=C_a^2+C_aC_b+C_b^2\\
&=(C_a+C_b/2)^2+3C_b^2/4\ge0.
\end{aligned}
$$

したがって有限列の長さ・順序・反復のどの場合にも、定義で要求された正半定値性とGaussian性がこの具体的構成から確かめられる。
<!-- definition-example-end -->

任意個の点を選ぶたびにGaussian分布を勝手に指定すると、三点の分布を二点へ周辺化したものと、最初に指定した二点の分布が食い違うかもしれない。平均と核を共通にすることがこの矛盾を防ぐ。

<a id="thm-ml2-12-consistency"></a>

<!-- formal-statement-start -->
> **定理（正半定値核からの有限次元整合構成）**  
> 任意の集合 $\mathcal X$、実数値関数 $m$、対称正半定値核 $k$ を与える。任意の有限列 $x_1,\ldots,x_n\in\mathcal X$ に対し、平均ベクトルと共分散行列を

$$
m_X=(m(x_i))_{i=1}^n,\qquad
K_X=(k(x_i,x_j))_{i,j=1}^n
$$

> とする。この平均・共分散の（退化も許す）多変量Gaussian法則は存在し、点の順列変更・座標の削除・同一入力の反復について整合的である。したがって $\mathcal X$ 上に $F\sim\operatorname{GP}(m,k)$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

正半定値行列の固有値は非負なので平方根行列を作れる。標準正規ベクトルへ作用させると必要な平均・共分散が得られる。座標を削ると平均と共分散も対応する成分だけに縮むことを確認し、最後に[Kolmogorov拡張定理](../../../解析系/STO/STO3/index.md#thm-sto3-kolmogorov-extension)を適用する。

<!-- proof-start -->
### 証明

異なる入力からなる有限集合 $I=\{x_1,\ldots,x_n\}$ を固定し、$K_I$ の実対称性と正半定値性より、ある直交行列 $Q$ と非負固有値 $\lambda_1,\ldots,\lambda_n$ があって

$$
K_I=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_n)Q^\mathsf T.
$$

$A=Q\operatorname{diag}(\sqrt{\lambda_1},\ldots,\sqrt{\lambda_n})$ と置けば $AA^\mathsf T=K_I$ である。独立な標準正規成分のベクトル $Z$ に対し $Y=m_I+AZ$ とすれば

$$
E[Y]=m_I,\qquad
\operatorname{Cov}(Y)=AE[ZZ^\mathsf T]A^\mathsf T
=AIA^\mathsf T=K_I.
$$

この特性関数は任意の $t\in\mathbb R^n$ で

$$
E[e^{it^\mathsf TY}]
=\exp\{it^\mathsf Tm_I-\tfrac12t^\mathsf TK_It\}
$$

であるから、平均と共分散が同じGaussian法則は一意である。$I\subset J$ で $J$ の法則の座標を $I$ へ射影すると、射影後もGaussianで、その平均と共分散は $m_I,K_I$ になる。したがって今作った $I$ 上の法則と一致する。座標の並べ替えも、平均の成分と共分散の行・列を同時に並べ替えるだけなので整合する。

同一入力 $x$ を二度並べたときは

$$
\operatorname{Var}\{F(x)-F(x)\}
=k(x,x)+k(x,x)-2k(x,x)=0
$$

であり、同じ確率変数を複写すればよい。ゆえに反復点を含む有限列でも同じ法則が決まる。

以上の有限集合に対する射影整合性を確認したので、[Kolmogorov拡張定理](../../../解析系/STO/STO3/index.md#thm-sto3-kolmogorov-extension)を添字集合 $\mathcal X$、有限次元法則の族 $(\mu_I)$ へ適用すると、それらを座標法則とする確率過程 $F$ が存在する。$\square$
<!-- proof-end -->

重要なのは、この存在定理は任意の標本路が連続・微分可能とまでは言っていないことだ。核の滑らかさから標本路の性質を得るには別の仮定と定理が必要になる。回帰の計算自体は有限個の観測点・予測点だけで完結する。

## 2. 距離によって連動の強さを決める

入力が実数のとき、近い点の関数値はよく連動する、という先入観を核で表したい。正の振幅 $a>0$ と長さ尺度 $\ell>0$ を用い、**平方指数核**を

$$
k_{\mathrm{SE}}(x,x')
=a^2\exp\left\{-\frac{(x-x')^2}{2\ell^2}\right\}
$$

と定める。対角値は常に $a^2$、離れた二点間の値は0に近づく。長さ尺度 $\ell$ が小さいほど、離れた点は速く無相関になる。ただし「見た目が滑らかだから」では核の正半定値性は保証できない。

<a id="prop-ml2-12-se-psd"></a>

<!-- formal-statement-start -->
> **命題（平方指数核の正半定値性）**  
> $\mathcal X=\mathbb R$、$a>0$、$\ell>0$ とする。次の関数は対称正半定値核である。

$$
k_{\mathrm{SE}}(x,x')=a^2\exp\left(-\frac{(x-x')^2}{2\ell^2}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数の平方を展開すると、変数 $x$ にだけ依存する因子と $x'$ にだけ依存する因子、さらに $xx'$ の指数に分かれる。後者を冪級数で展開すると各項が「係数の二乗」になる。

<!-- proof-start -->
### 証明

$(x-x')^2=x^2+(x')^2-2xx'$ なので

$$
\begin{aligned}
k_{\mathrm{SE}}(x,x')
&=a^2e^{-x^2/(2\ell^2)}e^{-(x')^2/(2\ell^2)}e^{xx'/\ell^2}\\
&=a^2e^{-x^2/(2\ell^2)}e^{-(x')^2/(2\ell^2)}
\sum_{r=0}^{\infty}\frac{x^r(x')^r}{r!\ell^{2r}}.
\end{aligned}
$$

有限個の $x_i$ と実数 $c_i$ を固定する。和は有限個の $(i,j)$ にわたり、各組の指数級数は絶対収束するため、有限和と級数の順を入れ替えられる。すると

$$
\begin{aligned}
\sum_{i,j}c_ic_jk_{\mathrm{SE}}(x_i,x_j)
&=a^2\sum_{r=0}^\infty\frac1{r!\ell^{2r}}
\sum_{i,j}
\bigl(c_ie^{-x_i^2/(2\ell^2)}x_i^r\bigr)
\bigl(c_je^{-x_j^2/(2\ell^2)}x_j^r\bigr)\\
&=a^2\sum_{r=0}^\infty\frac1{r!\ell^{2r}}
\left(\sum_i c_ie^{-x_i^2/(2\ell^2)}x_i^r\right)^2
\ge0.
\end{aligned}
$$

対称性は $(x-x')^2=(x'-x)^2$ より成立する。$\square$
<!-- proof-end -->

**直接計算**。$x_1=0,x_2=\ell$ なら $K=a^2\left(\begin{smallmatrix}1&r\\r&1\end{smallmatrix}\right)$、$r=e^{-1/2}$ である。任意の $(u,v)$ に対し

$$
(u,v)K(u,v)^\mathsf T
=a^2\{(u+rv)^2+(1-r^2)v^2\}\ge0.
$$

$r\in(0,1)$ なので行列はこの二点では正定値だが、同じ入力を二度置けば行列が特異になる。それでも核としては適格である。

反例も押さえる。二点の対角値を1、非対角値を2とする「似ている度合い」は

$$
K_{\mathrm{bad}}=\begin{pmatrix}1&2\\2&1\end{pmatrix},
\qquad
(1,-1)K_{\mathrm{bad}}(1,-1)^\mathsf T=-2.
$$

これを共分散とすると $F(a)-F(b)$ の分散が負になり、Gaussian分布を作る最初の段階で破綻する。

## 3. 観測後の平均と分散を同時に更新する

未知の関数値 $F(x_i)$ を直接見られるとは限らない。測定器のゆらぎを含む応答を $y_i$ と書き、測定値が独立なGaussian雑音を足して得られると仮定する。[Bayes線形回帰の観測模型](../ML2-02/index.md#def-ml2-02-gaussian-linear-model)と違い、係数ベクトルを先に固定せず、入力点ごとの関数値に事前分布を置く。

<a id="def-ml2-12-observation"></a>

<!-- formal-statement-start -->
> **定義（Gaussian process回帰の観測模型）**  
> $F\sim\operatorname{GP}(m,k)$ とし、観測入力 $x_1,\ldots,x_n\in\mathcal X$ は固定（重複を許す）、$n\ge1$ とする。$F$ と独立な雑音 $\varepsilon_1,\ldots,\varepsilon_n$ を互いに独立な $N(0,\sigma^2)$ とし、**雑音分散 $\sigma^2>0$** の下で

$$
Y_i=F(x_i)+\varepsilon_i,\qquad i=1,\ldots,n
$$

> により観測する。実現した応答ベクトルを $y=(y_1,\ldots,y_n)^\mathsf T$ とする。$K=(k(x_i,x_j))_{i,j}$、$m_X=(m(x_i))_i$ と書くと、観測ベクトル $Y$ は

$$
Y\sim N(m_X,K+\sigma^2I_n)
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-12-observation -->
**定義の確認**。一つの点 $x_1=0$ に対し $m=0$、$k(0,0)=1$、$\sigma^2=1$ なら $Y_1=F(0)+\varepsilon_1$ である。独立性から $E[Y_1]=0$、

$$
\operatorname{Var}(Y_1)
=\operatorname{Var}(F(0))+\operatorname{Var}(\varepsilon_1)
+2\operatorname{Cov}(F(0),\varepsilon_1)
=1+1+0=2.
$$

両項が独立Gaussianなので和もGaussianであり、$Y_1\sim N(0,2)$ を得る。単に核の対角分散だけを観測分散として使わない。

同じ点を二度測定すると、$Y_i=F(0)+\varepsilon_i$（$i=1,2$）であり、$F(0),\varepsilon_1,\varepsilon_2$ の独立性から、異なる測定雑音の交差項も消える。よって

$$
\begin{aligned}
\operatorname{Cov}(Y_1,Y_2)
&=\operatorname{Var}(F(0))
 +\operatorname{Cov}(\varepsilon_1,\varepsilon_2)=1,\\
\operatorname{Cov}(Y)
&=\begin{pmatrix}2&1\\1&2\end{pmatrix}
 =\begin{pmatrix}1&1\\1&1\end{pmatrix}+I_2.
\end{aligned}
$$

これは $K+\sigma^2I_2$ の意味を各成分から確認したものであり、雑音分散を非対角にも足してはいけない。
<!-- definition-example-end -->

新入力 $x_*$ を1点固定し、潜在関数値 $F_*=F(x_*)$ の事後分布を知りたい。$k_*=(k(x_1,x_*),\ldots,k(x_n,x_*))^\mathsf T$ と $k_{**}=k(x_*,x_*)$ を置く。独立な雑音は $F_*$ との共分散には寄与しないから

$$
\operatorname{Cov}(Y_i,F_*)
=\operatorname{Cov}(F(x_i)+\varepsilon_i,F_*)
=k(x_i,x_*).
$$

したがって $(Y^\mathsf T,F_*)^\mathsf T$ の同時共分散は

$$
\begin{pmatrix}
K+\sigma^2I_n & k_*\\
k_*^\mathsf T & k_{**}
\end{pmatrix}.
$$

$K$ は正半定値なので、任意の零でない $v\in\mathbb R^n$ に対し

$$
v^\mathsf T(K+\sigma^2I_n)v
=v^\mathsf TKv+\sigma^2\|v\|^2>0.
$$

ゆえに $A:=K+\sigma^2I_n$ は必ず正定値で可逆である。**同じ入力を二回観測しても $\sigma^2>0$ なら逆行列が存在する**。観測値がない場所でどんな値を採るかを、この逆行列と $k_*$ から推測できる。

<a id="def-ml2-12-prediction"></a>

<!-- formal-statement-start -->
> **定義（GP事後予測と点ごとの信用区間）**  
> [Gaussian process回帰の観測模型](#def-ml2-12-observation)の下で、入力 $x_*\in\mathcal X$ を固定する。観測ベクトル $Y=y$ を条件とする潜在関数値 $F(x_*)$ の条件付き法則をGP事後予測と呼ぶ。その条件付き平均を $\mu_*(y)$、分散を $v_*(y)$ と記す。この法則がGaussianで $v_*(y)>0$ の場合、点 $x_*$ における約95%信用区間を

$$
[\mu_*(y)-1.96\sqrt{v_*(y)},\
 \mu_*(y)+1.96\sqrt{v_*(y)}]
$$

> と呼ぶ。$v_*(y)=0$ なら区間は一点 $\{\mu_*(y)\}$ とする。この区間は、指定した核・雑音・入力・観測値を条件としたモデル内の確率を表し、全入力点を同時に覆う保証ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-12-prediction -->
**定義の確認**。$F(0)\sim N(0,1)$、$\varepsilon\sim N(0,1)$ を独立とし、$Y=F(0)+\varepsilon$ の実現値 $y=2$ を観測した。まず $\operatorname{Var}(Y)=2$、$\operatorname{Cov}(F(0),Y)=1$ である。$R=F(0)-Y/2$ と置くと

$$
\operatorname{Cov}(R,Y)=1-\frac12\cdot2=0,
\qquad
\operatorname{Var}(R)=1-2\cdot\frac12\cdot1+\frac14\cdot2=\frac12.
$$

$(R,Y)$ は同時Gaussianなので無相関から独立となり、$F(0)=Y/2+R$ を $Y=2$ で条件付けると

$$
F(0)\mid Y=2\sim N(1,1/2),\qquad
[\mu_*-1.96\sqrt{v_*},\mu_*+1.96\sqrt{v_*}]
=\left[1-\frac{1.96}{\sqrt2},\ 1+\frac{1.96}{\sqrt2}\right].
$$

これは観測模型から条件付き分布を求め、定義した信用区間まで確認した直接例である。標準正規分布の対称性により、この区間へ $F(0)$ が入る条件付き確率は約95%となる。一点の条件付き確率であり、異なる100点を同時に覆う確率が95%とは主張していない。
<!-- definition-example-end -->

<a id="thm-ml2-12-posterior"></a>

<!-- formal-statement-start -->
> **定理（Gaussian process回帰の事後予測公式）**  
> $F\sim\operatorname{GP}(m,k)$ とし、固定入力 $x_1,\ldots,x_n$ で独立な $N(0,\sigma^2)$ 雑音を加えて $Y_i=F(x_i)+\varepsilon_i$ と観測する。$\sigma^2>0$、$n\ge1$ とし、$K=(k(x_i,x_j))$、$A=K+\sigma^2I_n$、$m_X=(m(x_i))$ とする。任意の新入力 $x_*$ に対して $k_*=(k(x_i,x_*))$、$k_{**}=k(x_*,x_*)$ とすると、$A$ は正定値で

$$
\begin{aligned}
E[F(x_*)\mid Y=y]
&=m(x_*)+k_*^\mathsf TA^{-1}(y-m_X)=:\mu_*,\\
\operatorname{Var}(F(x_*)\mid Y=y)
&=k_{**}-k_*^\mathsf TA^{-1}k_*=:v_* \ge0.
\end{aligned}
$$

> 条件付き分布は退化も許す $N(\mu_*,v_*)$ である。さらに $Y_*=F(x_*)+\varepsilon_*$ で新しい独立雑音 $\varepsilon_*\sim N(0,\sigma^2)$ を加えるなら

$$
Y_*\mid Y=y\sim N(\mu_*,v_*+\sigma^2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

関数値の同時Gaussian性と独立雑音から同時共分散のブロック行列を作る。$F_*$ から $Y$ の線形予測を引いた残差が $Y$ と無相関になるよう係数を決める。**同時Gaussianなら無相関と独立が一致する**ので、この残差の分散がそのまま条件付き分散になる。

<!-- proof-start -->
### 証明

$k$ の正半定値性と $\sigma^2>0$ により、任意の $u\ne0$ で

$$
u^\mathsf TAu=u^\mathsf TKu+\sigma^2u^\mathsf Tu>0
$$

なので $A^{-1}$ が存在する。[Gaussian過程の有限次元Gaussian法則](#thm-ml2-12-consistency)に独立なGaussian雑音を加えた $(Y,F_*)$ は、平均 $(m_X^\mathsf T,m(x_*))^\mathsf T$、共分散 $\left(\begin{smallmatrix}A&k_*\\k_*^\mathsf T&k_{**}\end{smallmatrix}\right)$ の同時Gaussian分布に従う。

線形残差

$$
R=F_*-m(x_*)-k_*^\mathsf TA^{-1}(Y-m_X)
$$

を作る。$E[R]=0$、さらに $A$ は対称なので

$$
\begin{aligned}
\operatorname{Cov}(R,Y)
&=\operatorname{Cov}(F_*,Y)
 -k_*^\mathsf TA^{-1}\operatorname{Cov}(Y,Y)\\
&=k_*^\mathsf T-k_*^\mathsf TA^{-1}A
=0^\mathsf T.
\end{aligned}
$$

$(R,Y)$ は同時Gaussianだから無相関性により独立である。残差分散は二次形式を展開して

$$
\begin{aligned}
\operatorname{Var}(R)
&=k_{**}-2k_*^\mathsf TA^{-1}k_*
 +k_*^\mathsf TA^{-1}AA^{-1}k_*\\
&=k_{**}-k_*^\mathsf TA^{-1}k_*=:v_*.
\end{aligned}
$$

分散であるから $v_*\ge0$ が従う。元の関数値を

$$
F_*
=m(x_*)+k_*^\mathsf TA^{-1}(Y-m_X)+R
$$

と書き直せる。$Y=y$ と条件付けると第1・第2項は定数、第3項 $R$ は $Y$ から独立な $N(0,v_*)$ のままだから、条件付き平均・分散の式を得る。最後に独立な $\varepsilon_*$ を足すと平均は変わらず、条件付き共分散は0なので、分散だけ $\sigma^2$ 増す。$\square$
<!-- proof-end -->

ここで $v_*$ の行列としての意味も確かめよう。$A$ は対称正定値だから、任意の $u\in\mathbb R^n$ と $t\in\mathbb R$ に対して、同時共分散行列の二次形式を平方完成できる。

$$
\begin{aligned}
&\begin{pmatrix}u^\mathsf T&t\end{pmatrix}
\begin{pmatrix}A&k_*\\k_*^\mathsf T&k_{**}\end{pmatrix}
\begin{pmatrix}u\\t\end{pmatrix}\\
&\quad=u^\mathsf TAu+2t\,u^\mathsf Tk_*+t^2k_{**}\\
&\quad=(u+tA^{-1}k_*)^\mathsf TA(u+tA^{-1}k_*)
+t^2(k_{**}-k_*^\mathsf TA^{-1}k_*).
\end{aligned}
$$

最後の括弧 $k_{**}-k_*^\mathsf TA^{-1}k_*$ を、ブロック $A$ に関する **Schur補完**という。$u=-tA^{-1}k_*$ を選ぶと第1項が0になるので、元の共分散行列の正半定値性から Schur補完は非負でなければならない。これが条件付き分散 $v_*$ と同じ量になる理由であり、単なる行列式の符号判定ではない。

**ここで分けた三つの量**を混同しない。

1. $\mu_*$ はデータを条件とする潜在関数値の平均である。
2. $v_*$ は潜在関数値そのものについて残る不確実性である。
3. $v_*+\sigma^2$ は未来の新しい測定値についての予測分散である。

$\sigma^2>0$ なら $v_*$ は応答 $y$ に依存しない。これは核・平均関数・雑音分散を既知と固定したGaussian模型の性質であり、核の長さ尺度等まで未知として学習する場合に一般化できる断言ではない。

### 一つの観測からどこまで予測できるか

平均0で $k(0,0)=k(1,1)=1$、$k(0,1)=1/2$ のGPを考え、$x_1=0$、$\sigma^2=1$、実現値 $y_1=2$ を観測したとする。この二点の核は第1節で正半定値性を確認済みである。$A=(1+1)=(2)$、$A^{-1}=(1/2)$。新入力 $x_*=1$ では $k_*=(1/2)$、$k_{**}=1$ なので

$$
\begin{aligned}
\mu_*&=(1/2)(1/2)(2)=1/2,\\
v_*&=1-(1/2)(1/2)(1/2)=7/8,\\
\operatorname{Var}(Y_*\mid Y_1=2)&=7/8+1=15/8.
\end{aligned}
$$

同じ観測点 $x_*=0$ なら $k_*=(1)$ なので、$\mu_*=1$、$v_*=1/2$、未来の観測分散は $3/2$ になる。測定点の近くで潜在分散は減るが、観測誤差は新たに発生する。値が高かった観測を関数値そのものと決めつけず、平均を0と2の中間へ縮めることも分かる。

複数の予測点 $z_1,\ldots,z_q$ を一度に扱うときは、$K_{ZX}=(k(z_a,x_i))_{a,i}$、$K_{ZZ}=(k(z_a,z_b))_{a,b}$、$m_Z=(m(z_a))_a$ とする。同じ残差の議論をベクトルへ適用すると

$$
F_Z\mid Y=y\sim
N\left(m_Z+K_{ZX}A^{-1}(y-m_X),\
K_{ZZ}-K_{ZX}A^{-1}K_{XZ}\right).
$$

対角成分が各点の $v_*$ であり、非対角成分は予測点どうしに残る相関である。**点ごとの95%区間を並べても曲線全体について95%の同時帯にはならない**ことが、この相関を残す意味の一つである。

## 4. 観測を増やすと不確実性はどう変わるか

同じ核・同じ雑音分散を保って独立な観測を追加したとき、潜在関数値の分散は増えない。これは「どんなデータでも予測平均が真値に近づく」という主張ではない。**事後分散だけ**について成立するGaussian条件付けの性質である。

既存観測 $Y=y$ を固定した上で、これから新しい位置 $z$ で $W=F(z)+\eta$、$\eta\sim N(0,\sigma^2)$ を独立に観測するとする。既存データを条件とする潜在分散を $v_y(x)$、二点の条件付き共分散を $c_y(x,z)$ と書く。複数点版の公式から

$$
\begin{aligned}
v_y(x)&=k(x,x)-k_{xX}A^{-1}k_{Xx},\\
c_y(x,z)&=k(x,z)-k_{xX}A^{-1}k_{Xz}.
\end{aligned}
$$

<a id="prop-ml2-12-variance-reduction"></a>

<!-- formal-statement-start -->
> **命題（観測追加による条件付き分散の非増加）**  
> [Gaussian process回帰の観測模型](#def-ml2-12-observation)で $\sigma^2>0$ を固定する。既存観測 $Y$ に独立なGaussian雑音 $\eta\sim N(0,\sigma^2)$ を用いた $W=F(z)+\eta$ を追加すると、任意の予測位置 $x$ で

$$
\operatorname{Var}(F(x)\mid Y,W)
=v_y(x)-\frac{c_y(x,z)^2}{v_y(z)+\sigma^2}
\le v_y(x).
$$

> 分母は正であり、この分散は実現観測値 $y,w$ に依存しない。分散が減らないのは $c_y(x,z)=0$ の場合である。
<!-- formal-statement-end -->

### 証明の見取り図

既存データで条件付けた後の二変量Gaussian分布に対して、[事後予測公式](#thm-ml2-12-posterior)の一観測版をもう一度使う。新しい観測の雑音は条件付き共分散の分子には現れず、分母の分散を正にする。

<!-- proof-start -->
### 証明

既存 $Y=y$ の下で $(F(x),F(z))$ は二変量Gaussianであり、潜在分散は $v_y(x),v_y(z)$、共分散は $c_y(x,z)$ である。$W=F(z)+\eta$ について独立性より

$$
\operatorname{Cov}(F(x),W\mid Y=y)=c_y(x,z),
$$

$$
\operatorname{Var}(W\mid Y=y)=v_y(z)+\sigma^2>0.
$$

二変量に対し[事後予測公式の残差構成](#thm-ml2-12-posterior)を、先ほどの $Y$ に代えて $W$、$F_*$ に代えて $F(x)$、事前（ここでは $Y=y$ 条件付き）共分散に代えて上の三量を使って適用すると、残差

$$
F(x)-E[F(x)\mid Y=y]
-\frac{c_y(x,z)}{v_y(z)+\sigma^2}
\{W-E[W\mid Y=y]\}
$$

は $W$ と条件付きで独立なGaussianになる。その分散を二次展開すると

$$
v_y(x)-2\frac{c_y(x,z)^2}{v_y(z)+\sigma^2}
+\frac{c_y(x,z)^2}{v_y(z)+\sigma^2}
=v_y(x)-\frac{c_y(x,z)^2}{v_y(z)+\sigma^2}.
$$

平方と正の分母によって引く量は非負である。$\square$
<!-- proof-end -->

### 同じ点を何度も測る場合

ある一点 $z$ で $F(z)\sim N(0,a^2)$ とし、同じ $z$ を独立雑音 $N(0,\sigma^2)$ で $r$ 回測るとする。観測値を $y_1,\ldots,y_r$ とする。[Bayes線形回帰での平方完成](../ML2-02/index.md#thm-ml2-02-gaussian-posterior)を、未知係数を $F(z)$、設計行列を1の列ベクトルにして適用すると、事後精度と平均は

$$
\frac1{v_r}=\frac1{a^2}+\frac r{\sigma^2},
\qquad
\mu_r=v_r\frac{\sum_{i=1}^r y_i}{\sigma^2}.
$$

$a^2=\sigma^2=1$ なら $v_r=1/(1+r)$。$r$ が増えると潜在関数値の不確実性は0へ近づくが、次の測定値には依然として分散 $\sigma^2$ が残る。独立な雑音という仮定が壊れ、すべての測定に同じ共通誤差が乗るなら、この $r/\sigma^2$ の情報加算は成立しない。

雑音分散を0にする操作には注意が必要だ。互いに異なる入力でGram行列 $K$ が正定値なら、$\sigma^2\downarrow0$ で訓練点の潜在分散は0へ向かう。一方、同じ入力に異なる応答が記録されている場合、完全な無雑音模型はそのデータへ正の確率を与えない。特異な $K$ に $K^{-1}$ を機械的に代入するのは不適切である。

## 5. カーネルリッジ回帰とは何が同じで何が違うか

同じ核は、[カーネルリッジ回帰の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)にも現れた。あちらはRKHS内の一つの関数を、データへの二乗誤差と関数ノルムの和を最小にして選ぶ。こちらは確率過程を条件付け、関数値の**分布**を更新する。その二つの予測平均はある条件で一致する。

<a id="prop-ml2-12-krr"></a>

<!-- formal-statement-start -->
> **命題（GP事後平均とカーネルリッジ予測の一致）**  
> $\mathcal X$ 上の正半定値核 $k$ と固定入力 $x_1,\ldots,x_n$、応答 $y\in\mathbb R^n$ を与える。平均0のGP事前分布と独立雑音分散 $\sigma^2>0$ で得る事後平均 $\mu(x)$ を考える。一方、同じ核のRKHS $\mathcal H_k$ で

$$
\widehat g_\lambda
=\operatorname*{argmin}_{g\in\mathcal H_k}
\left\{\frac1n\sum_{i=1}^n(y_i-g(x_i))^2
+\lambda\|g\|_{\mathcal H_k}^2\right\}
$$

> を $\lambda>0$ で最小化する。このとき $\lambda=\sigma^2/n$ とすれば全ての $x\in\mathcal X$ で

$$
\mu(x)=\widehat g_\lambda(x)
=k_x^\mathsf T(K+\sigma^2I_n)^{-1}y.
$$

> ただしこの等号だけから、カーネルリッジ回帰に事後分散が備わるとは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

カーネルリッジの係数解では逆行列に $n\lambda I$ が足される。GPでは $\sigma^2I$ が足されるので、目的関数の $1/n$ という正規化を照合すれば一致する。核行列が特異でも、正の正則化項が逆行列を保証する。

<!-- proof-start -->
### 証明

[カーネルリッジ回帰の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)を、同じGram行列 $K$、上の $\lambda>0$、応答 $y$ に適用すると、最適関数の係数ベクトルの標準表示は

$$
\alpha=(K+n\lambda I_n)^{-1}y,
\qquad
\widehat g_\lambda(x)=k_x^\mathsf T\alpha.
$$

ここで $n\lambda=n(\sigma^2/n)=\sigma^2$ を代入すると $\alpha=(K+\sigma^2I_n)^{-1}y$ である。他方、[GP事後予測公式](#thm-ml2-12-posterior)で $m\equiv0$ とすると、$\mu(x)=k_x^\mathsf T(K+\sigma^2I_n)^{-1}y$。したがって両関数が一致する。$\sigma^2>0$ により双方の逆行列は存在する。$\square$
<!-- proof-end -->

平均関数 $m\not\equiv0$ を使うGPでは、$y-m_X$ にカーネルリッジを適用して最後に $m(x)$ を足せば対応する。単に $m$ がRKHSに属するとは仮定していない。

| 比較 | GP回帰 | カーネルリッジ回帰 |
|---|---|---|
| 核の役割 | 関数値間の事前共分散 | RKHSの内積・評価と罰則 |
| 目的 | 観測後の確率分布 | 罰則付き誤差の最小化 |
| 共通するもの | $m=0,\ n\lambda=\sigma^2$ なら予測平均 | 同じ予測平均 |
| 不確実性 | $v_*$ と $v_*+\sigma^2$ を区別 | 最適化問題だけでは区間を定義しない |

そもそもGaussian過程の標本路がその核に対応するRKHSの元であるとは一般には限らない。例えば無限可算集合 $\mathcal X=\mathbb N$ の核 $k(i,j)=\boldsymbol1_{\{i=j\}}$ に対応するRKHSは二乗総和が有限な数列空間だが、GPの各 $F(i)$ を独立な $N(0,1)$ とすれば、確率1で $\sum_iF(i)^2=\infty$ となる（$F(i)^2$ の平均1に大数の法則を適用）。**予測平均の数式が一致すること**を、**事前分布の標本関数が最適化空間に入ること**と混同しない。

## 6. 核・長さ尺度・観測点を操作する

[Gaussian process回帰の対話ラボ](../../../../../../simulation/ml2-12.html)では、一つの固定された合成データ候補を用い、平方指数核・線形核・定数核、長さ尺度、核の振幅、観測雑音分散、観測点の追加を操作できる。各操作ごとにGram行列を作り直して線形方程式を解き、**実際に計算した**予測平均、潜在関数値の点ごとの約95%信用区間、未来の観測値の約95%予測区間を描く。核が退化しても雑音分散を正に保ち、Cholesky分解で逆行列を明示的に作らず解く。

観察の順は次が有用である。

1. 平方指数核で長さ尺度を小さくし、観測点から離れた場所で潜在分散が事前分散に戻る様子を見る。
2. 同じ入力へ観測を追加し、潜在分散の減少と未来の観測雑音の残りを比較する。
3. 定数核へ替え、どの入力点でも同じ潜在量を共有するという仮定が、遠い位置の区間を強く縮めることを確認する。
4. 観測雑音を大きくして区間が広がるとき、単なる計算誤差ではなく**模型が仮定した測定不確かさ**に由来することを確かめる。

ラボは固定の数値列を描き替えるだけではなく、操作ごとに予測の行列計算を実行する。95%区間は選んだ核と雑音分散が正しいと仮定した条件付きの**各点の区間**であり、未知の真の曲線を必ず覆う区間や、全入力点に対する同時95%帯ではない。核・雑音・平均関数をデータから選んだ場合、その選択の不確実性は本講の固定ハイパーパラメータ公式には含まれない。

## 7. 演習

### ML2-12-A01 二点共分散の可否

- Level: A

二点 $a,b$ で平均0、分散1、共分散 $r\in\mathbb R$ のGaussian過程を考えたい。候補共分散行列を $K=\left(\begin{smallmatrix}1&r\\r&1\end{smallmatrix}\right)$ とする。

1. 全実数 $u,v$ に対して $(u,v)K(u,v)^\mathsf T\ge0$ となる $r$ の範囲を求めよ。
2. $r=1$ で分布が存在する理由と、$r=2$ で存在しない理由を示せ。

<!-- solution-start -->
#### 詳細解答

二次形式を平方完成すると

$$
u^2+2ruv+v^2=(u+rv)^2+(1-r^2)v^2.
$$

$|r|\le1$ なら右辺の各項は非負なので十分。逆に $|r|>1$ なら $v=1,u=-r$ と置くと右辺は $1-r^2<0$ となるので必要でもある。[正半定値核の条件](../../RKHS/RKHS1/index.md#def-rkhs1-psd-kernel)と一致する。

$r=1$ なら標準正規変数 $Z$ に対し $F(a)=F(b)=Z$ と置けば所望の同時Gaussian分布が存在する。このとき $\operatorname{Var}(F(a)-F(b))=0$ であり、密度が2次元Lebesgue測度に対して存在しないだけである。$r=2$ では $u=1,v=-1$ により二次形式 $1-4+1=-2$ となり、分散が負になるため確率分布を構成できない。
<!-- solution-end -->

### ML2-12-A02 平方指数核の距離とGram行列

- Level: A

$\mathcal X=\mathbb R$ 上の核 $k(x,x')=4\exp(-(x-x')^2/8)$ を考える。

1. 振幅 $a$ と長さ尺度 $\ell$ を求めよ。
2. 入力 $0,2$ のGram行列を書き、任意の係数ベクトルに対して正半定値であることを直接確認せよ。

<!-- solution-start -->
#### 詳細解答

[平方指数核](#prop-ml2-12-se-psd)の表示では $a^2=4$、$2\ell^2=8$ なので $a=2,\ell=2$。距離は $|0-2|=2$ だから非対角の相関係数は $r=e^{-4/8}=e^{-1/2}$。よって

$$
K=4\begin{pmatrix}1&r\\r&1\end{pmatrix}.
$$

任意の実数 $u,v$ で

$$
(u,v)K(u,v)^\mathsf T
=4\{(u+rv)^2+(1-r^2)v^2\}\ge0,
$$

ここで $0<r<1$ である。各条件を確かめたので、この二点での共分散行列は正定値、したがって正半定値である。
<!-- solution-end -->

### ML2-12-A03 一観測の平均と二種類の分散

- Level: A

平均0、$k(a,a)=k(b,b)=1$、$k(a,b)=1/2$ のGPを考える。$a$ で独立な雑音分散 $\sigma^2=1$ の観測 $y_a=2$ を得た。$b$ の潜在関数値の事後平均・分散と、$b$ で将来もう一度雑音付き測定した値の予測分散を求めよ。核が有効であることはA01を使ってよい。

<!-- solution-start -->
#### 詳細解答

$n=1$ で $K=(1)$、$A=K+\sigma^2I=(2)$、$A^{-1}=(1/2)$。$k_b=(1/2)$、$k(b,b)=1$ だから[GP事後予測公式](#thm-ml2-12-posterior)を入力 $b$ に適用して

$$
\mu_b=(1/2)(1/2)2=1/2,\qquad
v_b=1-(1/2)(1/2)(1/2)=7/8.
$$

将来の測定雑音は学習時の雑音とも潜在関数値とも独立なので、共分散の交差項は0であり、予測分散は

$$
v_b+\sigma^2=7/8+1=15/8.
$$

この加算を忘れると潜在関数値の区間を新観測の予測区間と誤認する。
<!-- solution-end -->

### ML2-12-A04 点ごとの区間

- Level: A

ある固定入力 $x_*$ におけるGP事後分布が $F(x_*)\mid Y=y\sim N(2,3/4)$ と判明した。未来の独立雑音は $N(0,1/4)$ とする。潜在関数値および新観測の点ごとの約95%区間をそれぞれ書き、半幅を比較せよ。

<!-- solution-start -->
#### 詳細解答

正規分布の平均と分散がそれぞれ $2,3/4$ なので、潜在値の半幅は $1.96\sqrt{3/4}=0.98\sqrt3$。区間は

$$
[2-0.98\sqrt3,\ 2+0.98\sqrt3].
$$

新観測では独立雑音の分散 $1/4$ を加えるため $3/4+1/4=1$、平均は2のままである。[予測公式](#thm-ml2-12-posterior)より半幅は $1.96$ なので区間は $[0.04,3.96]$。$1.96>0.98\sqrt3$ であり、未来の測定値の区間が広い。どちらもこの1点の条件付き確率であって、同時帯ではない。
<!-- solution-end -->

### ML2-12-B01 二観測と行列の次元

- Level: B

平均0のGPの観測点を $x_1,x_2$、予測点を $z$ とする。観測点の核行列は $K=I_2$、予測点との核ベクトルは $k_z=(1/2,1/2)^\mathsf T$、$k(z,z)=1$ とする。独立雑音分散を $\sigma^2=1$、観測値を $y=(2,0)^\mathsf T$ とする。

1. この3点の核共分散行列が正半定値であることを確認せよ。
2. 潜在関数値 $F(z)$ の事後平均・分散、新観測の予測分散を求めよ。

<!-- solution-start -->
#### 詳細解答

3点の核行列は

$$
G=\begin{pmatrix}1&0&1/2\\0&1&1/2\\1/2&1/2&1\end{pmatrix}.
$$

任意の実数 $u,v,w$ で

$$
(u,v,w)G(u,v,w)^\mathsf T
=(u+w/2)^2+(v+w/2)^2+\frac12w^2\ge0.
$$

よって対称かつ正半定値であり、指定は有効な有限次元Gaussian模型になる。観測の雑音を加えると $A=K+I_2=2I_2$、逆行列は $A^{-1}=\frac12I_2$ である。したがって

$$
\begin{aligned}
\mu_z&=(1/2,1/2)(\tfrac12I_2)(2,0)^\mathsf T=1/2,\\
v_z&=1-(1/2,1/2)(\tfrac12I_2)(1/2,1/2)^\mathsf T\\
&=1-\tfrac12(\tfrac14+\tfrac14)=3/4.
\end{aligned}
$$

新観測の雑音は独立だから予測分散は $3/4+1=7/4$。行列積は $1\times2$、$2\times2$、$2\times1$ を順に掛けている。
<!-- solution-end -->

### ML2-12-B02 同じ点を二度観測する

- Level: B

一つの入力 $z$ で $F(z)\sim N(0,1)$ とする。同じ点を独立な $N(0,1)$ 雑音で二度観測し、$y=(2,0)^\mathsf T$ を得た。

1. 観測共分散行列 $A$ とその逆行列を求め、GP事後平均と潜在分散を計算せよ。
2. 先頭の観測1個だけを用いる場合との潜在分散の差を求め、分散非増加命題と照合せよ。

<!-- solution-start -->
#### 詳細解答

両観測点は同じ $z$ だから $K=\left(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\right)$ となる。雑音は各測定で独立なので対角にだけ1を加える。

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\quad
\det A=4-1=3,\quad
A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

予測点も $z$ とすれば $k_z=(1,1)^\mathsf T$。ゆえに

$$
\begin{aligned}
A^{-1}y&=\frac13(4,-2)^\mathsf T,\\
\mu_z&=(1,1)\frac13(4,-2)^\mathsf T=2/3,\\
A^{-1}k_z&=(1/3,1/3)^\mathsf T,\\
v_z&=1-(1,1)(1/3,1/3)^\mathsf T=1/3.
\end{aligned}
$$

先頭1個だけなら $A=(2)$、$v_z=1-1/2=1/2$。差は $1/2-1/3=1/6$ で正である。[分散非増加命題](#prop-ml2-12-variance-reduction)の分子は、新しい観測と潜在値の条件付き共分散の二乗 $(1/2)^2$、分母は既存の潜在分散 $1/2$ と追加雑音1の和 $3/2$ だから $(1/4)/(3/2)=1/6$ と一致する。
<!-- solution-end -->

### ML2-12-B03 核の仮定が壊れるとき

- Level: B

二点 $a,b$ で $k(a,a)=k(b,b)=1$、$k(a,b)=k(b,a)=2$ という候補核を考える。観測雑音分散を正にすれば $K+\sigma^2I$ がたまたま可逆になることはある。このことだけでGaussian process回帰が定義できると主張するのは誤りである。何が破綻するか、$F(a)-F(b)$ の分散と行列式を用いて示せ。また非対角を $1/2$ に直した場合を確認せよ。

<!-- solution-start -->
#### 詳細解答

候補の核行列は $K=\left(\begin{smallmatrix}1&2\\2&1\end{smallmatrix}\right)$ である。例えば $c=(1,-1)^\mathsf T$ で

$$
c^\mathsf TKc=1-2-2+1=-2<0.
$$

同じ式は $\operatorname{Var}(F(a)-F(b))$ に当たるので、雑音を加える前の関数値の同時確率分布自体が存在しない。$\det K=1-4=-3$ で負であり、固有値 $3,-1$ のうち一つが負である。$\sigma^2=2$ を足すと $K+2I=\left(\begin{smallmatrix}3&2\\2&3\end{smallmatrix}\right)$ は可逆だが、存在しない潜在事前分布を救済しない。

非対角を $r=1/2$ に直せば

$$
c^\mathsf TKc=(u+v/2)^2+3v^2/4\ge0
$$

が任意の $c=(u,v)$ に対して成立し、有効な核となる。これは[有限次元整合構成](#thm-ml2-12-consistency)の前提を回復する操作である。
<!-- solution-end -->

### ML2-12-B04 GPとカーネルリッジの係数を照合

- Level: B

平均0のGPで訓練Gram行列 $K=\operatorname{diag}(2,1)$、観測値 $y=(3,2)^\mathsf T$、雑音分散 $\sigma^2=1$、$n=2$ とする。予測点 $z$ に対し $k_z=(1,1)^\mathsf T$、$k(z,z)=2$ とする。

1. GPの事後予測平均と潜在分散を求めよ。
2. RKHSのカーネルリッジ目的関数を $(1/n)\sum_i(y_i-g(x_i))^2+\lambda\|g\|_{\mathcal H_k}^2$ としたとき、同じ平均を生む $\lambda$ と係数ベクトルを計算せよ。

<!-- solution-start -->
#### 詳細解答

$K=\operatorname{diag}(2,1)$ は対角成分が正なので正定値だが、それだけでは予測点を加えた三点の核の正半定値性は決まらない。三点の核行列を

$$
G=\begin{pmatrix}2&0&1\\0&1&1\\1&1&2\end{pmatrix}
$$

と書き、任意の実数 $u,v,w$ に対して二次形式を平方完成すると

$$
\begin{aligned}
(u,v,w)G(u,v,w)^\mathsf T
&=2u^2+v^2+2uw+2vw+2w^2\\
&=2(u+w/2)^2+(v+w)^2+w^2/2\ge0.
\end{aligned}
$$

よって対称性と併せて三点の核も正半定値である。第3節のSchur補完で判定するなら、最後の $w^2/2$ の係数が $2-(1,1)\operatorname{diag}(1/2,1)(1,1)^\mathsf T=1/2$ に対応する。

$A=K+I_2=\operatorname{diag}(3,2)$ より

$$
A^{-1}y=\operatorname{diag}(1/3,1/2)(3,2)^\mathsf T=(1,1)^\mathsf T.
$$

したがって[事後予測公式](#thm-ml2-12-posterior)は

$$
\mu_z=(1,1)(1,1)^\mathsf T=2,
\qquad
v_z=2-(1,1)\operatorname{diag}(1/3,1/2)(1,1)^\mathsf T
=2-\frac13-\frac12=\frac76.
$$

[GPとカーネルリッジの一致](#prop-ml2-12-krr)により $\lambda=\sigma^2/n=1/2$。[RKHSの解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)に $n\lambda=1$ を代入すれば係数 $\alpha=(K+I_2)^{-1}y=(1,1)^\mathsf T$ なので $\widehat g_\lambda(z)=2$。カーネルリッジの目的関数だけから $7/6$ という不確実性が決まるわけではない。
<!-- solution-end -->

### ML2-12-C01 重複観測から遠方へ情報を伝える

- Level: C

平均0、$k(0,0)=k(1,1)=1$、$k(0,1)=k(1,0)=1/2$ のGPと、各測定に独立な $N(0,1)$ 雑音を考える。最初に $x_1=x_2=0$ で $y_1=1,y_2=-1$ を観測した。さらに $x_3=1$ で $y_3=2$ を得る。

1. 最初の2観測で $F(0)$ の事後平均・分散を計算せよ。
2. 最初の2観測の下で $F(1)$ の事後分散と $F(0),F(1)$ の事後共分散を計算せよ。
3. 3番目の観測を追加したとき、$F(0)$ の事後平均・分散を逐次更新で求めよ。事後平均と分散の変化を別々に解釈せよ。
4. 最初の2観測について、同じ平均を得るカーネルリッジの $\lambda$ を答えよ。

<!-- solution-start -->
#### 詳細解答

最初の二点は重複するので $K=\left(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\right)$、$A=K+I_2=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$ とする。行列式は3、逆行列は

$$
A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

$k_0=(1,1)^\mathsf T$、$y=(1,-1)^\mathsf T$ なので

$$
A^{-1}y=(1,-1)^\mathsf T,\qquad
A^{-1}k_0=(1/3,1/3)^\mathsf T.
$$

これより

$$
\mu_0=k_0^\mathsf TA^{-1}y=1-1=0,\qquad
v_0=1-k_0^\mathsf TA^{-1}k_0=1-2/3=1/3.
$$

2点目の予測位置1では $k_1=(1/2,1/2)^\mathsf T$。従って

$$
\begin{aligned}
\mu_1&=k_1^\mathsf TA^{-1}y=0,\\
v_1&=1-k_1^\mathsf TA^{-1}k_1
=1-\tfrac14(2/3)=5/6,\\
c_{01}&=k(0,1)-k_0^\mathsf TA^{-1}k_1\\
&=\tfrac12-\tfrac12(2/3)=1/6.
\end{aligned}
$$

追加観測 $W=F(1)+\eta$ の既存データ下での平均は $\mu_1=0$、分散は $v_1+1=11/6$、$F(0)$ との共分散は $c_{01}=1/6$。よって[観測追加の条件付きGaussian公式](#prop-ml2-12-variance-reduction)の残差構成を平均にも適用すると

$$
\mu_0^{\mathrm{new}}
=\mu_0+\frac{c_{01}}{v_1+1}(y_3-\mu_1)
=0+\frac{1/6}{11/6}(2-0)=\frac2{11}.
$$

分散は

$$
v_0^{\mathrm{new}}
=\frac13-\frac{(1/6)^2}{11/6}
=\frac13-\frac1{66}
=\frac7{22}.
$$

平均は正方向へ動いたが、これは $y_3=2$ という観測値に依存する。一方、分散の低下 $1/66$ は位置・核・雑音分散で決まり、同じ位置で別の数値を観測しても変わらない。

最後に最初の2観測について $n=2,\sigma^2=1$ なので[GPとカーネルリッジの対応](#prop-ml2-12-krr)から $\lambda=\sigma^2/n=1/2$。重複によって $K$ は特異だが $K+2\lambda I=K+I$ は正定値なので、カーネルリッジ予測も事後平均も一意である。
<!-- solution-end -->

## 8. 何を理解できたか

正半定値核は関数値の共分散を矛盾なく指定する条件である。独立Gaussian雑音を加えると観測共分散に正の対角項が乗り、重複点を含む観測でも条件付き予測を計算できる。観測点・長さ尺度・核選択で変わるのは平均曲線だけでなく、未知の関数値について残る分散である。一方で**その不確実性は核と雑音の仮定を条件としたもの**である。次の多層perceptronでは、関数の柔軟性を確率的な核でなく層と非線形変換の合成から作る。
