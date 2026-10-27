# ML2-20 変分autoencoder

これまで[ELBO恒等式](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)を使って、潜在変数模型の事後分布を近似する方法を学んだ。しかし新しい観測が来るたびに変分分布を一から最適化するのは高価である。さらに高次元の観測分布を学習し、そこから標本を生成したい場合、推論の仕組みと生成模型を一緒に訓練できると便利である。

**変分autoencoder（VAE）** は、潜在変数から観測を作る **decoder** と、観測から潜在変数の近似事後密度を返す **encoder** を組み合わせる。ただしencoderはdecoderの逆関数ではなく、生成模型そのものにも含まれない。ELBOを数式から導き、どの誤差を減らしているのか、Gaussianの再パラメータ化による勾配がなぜ計算できるのかを確認しよう。

## 1. 生成と推論を別々に定める

観測を $x\in\mathcal X$、潜在ベクトルを $z\in\mathbb R^k$ とする。潜在事前密度 $p(z)$ から $Z$ を採り、条件付き分布 $p_\theta(x\mid z)$ から $X$ を採る。$\theta$ は生成側のパラメータである。固定した観測の周辺尤度は

$$
p_\theta(x)=\int_{\mathbb R^k}p(z)p_\theta(x\mid z)\,dz
$$

であり、一般には計算が難しい。別のパラメータ $\phi$ を持つencoderが $x$ から密度 $q_\phi(z\mid x)$ を指定する。観測ごとに独立な変分分布のパラメータを保存するのでなく、同じ $\phi$ を共有することを **償却推論** と呼ぶ。

<a id="def-ml2-20-vae"></a>

<!-- formal-statement-start -->
> **定義（変分autoencoderの生成模型とencoder）**
> 潜在空間 $\mathbb R^k$ に確率密度 $p(z)$、観測空間 $\mathcal X$ に条件付き確率質量関数または密度関数 $p_\theta(x\mid z)$ を置く。後者は各 $z$ を固定すると観測全体で正規化される。同時分布の潜在変数に関する密度を

$$
p_\theta(x,z)=p(z)p_\theta(x\mid z)
$$

> と定める。さらに各観測 $x$ から正規化された密度 $q_\phi(z\mid x)$ を与える写像を **encoder**、条件付き観測分布 $p_\theta(x\mid z)$ を **decoder** と呼ぶ。この組を変分autoencoderという。
>
> $\theta$ と $\phi$ は別の役割のパラメータであり、encoderは周辺分布 $p_\theta(x)$ の定義には入らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-20-vae -->
**定義の確認**。潜在・観測とも一次元とし、$a,b\in\mathbb R$、$\tau>0$、$\theta=(a,b,\tau)$ に対し

$$
p(z)=\frac{e^{-z^2/2}}{\sqrt{2\pi}},\qquad
p_\theta(x\mid z)=\frac{e^{-(x-az-b)^2/(2\tau^2)}}{\sqrt{2\pi\tau^2}}
$$

と置く。encoderを $q_\phi(z\mid x)=N(\mu_\phi(x),s_\phi(x)^2)$ の密度とし、$s_\phi(x)>0$ とする。三密度は非負で、$p$ と $q_\phi$ はそれぞれ全実数上で積分1、decoderは **$z$ を固定して $x$ で積分**すると1である。従って

$$
\int_{\mathbb R}\int_{\mathbb R}p_\theta(x,z)\,dx\,dz
=\int_{\mathbb R}p(z)\cdot1\,dz=1.
$$

encoderを変更しても周辺密度の積分式は変わらない。これで生成と推論が別の構成であることを直接確認できた。
<!-- definition-example-end -->

生成方向は $Z\to X$、近似推論方向は $x\to q_\phi(\cdot\mid x)$ である。encoderは一点の潜在値でなく **分布** を出す。

## 2. VAEの下界と等号条件

観測 $x$ とパラメータを固定し、$0<p_\theta(x)<\infty$ とする。encoder密度 $q=q_\phi(\cdot\mid x)$ の正の台では $p(z)p_\theta(x\mid z)>0$ とし、$E_q|\log p_\theta(x\mid Z)|<\infty$ と $D(q\|p)<\infty$ を仮定する。台を外れる場合は[ELBOの台条件](../ML2-08/index.md#prop-ml2-08-support)を別途使う。

**再構成項** を条件付き対数尤度の期待値、**事前KL** をencoderから事前分布への相対エントロピーと呼び、次を学習目標とする。

$$
\mathcal L_{\theta,\phi}(x)
=E_{q_\phi(z\mid x)}[\log p_\theta(x\mid Z)]
-D(q_\phi(\cdot\mid x)\|p).
$$

<a id="thm-ml2-20-elbo"></a>

<!-- formal-statement-start -->
> **定理（VAEのELBOと事後KL恒等式）**
> 上記の密度・正の台・有限性の条件が満たされるとき、事後密度を $p_\theta(z\mid x)=p(z)p_\theta(x\mid z)/p_\theta(x)$ と定めれば

$$
\boxed{\log p_\theta(x)=\mathcal L_{\theta,\phi}(x)
+D(q_\phi(\cdot\mid x)\|p_\theta(\cdot\mid x))}
$$

> が成立する。従って $\mathcal L_{\theta,\phi}(x)\le\log p_\theta(x)$。等号は両事後密度がほとんど至る所で一致するとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

[連続版ELBO恒等式](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)に同時密度を代入することに相当する。ここではBayes公式の密度比から導出を追う。

<!-- proof-start -->
### 証明

$q(z)>0$ の場所で

$$
\frac{q(z)}{p_\theta(z\mid x)}
=\frac{q(z)}{p(z)}\frac{p_\theta(x)}{p_\theta(x\mid z)}
$$

が成り立つ。対数を取り、$q$ で積分する。各比の対数の期待値は仮定により有限であるから

$$
\begin{aligned}
D(q\|p_\theta(\cdot\mid x))
&=\int q(z)\log\frac{q(z)}{p_\theta(z\mid x)}\,dz\\
&=\int q(z)\log\frac{q(z)}{p(z)}\,dz
-\int q(z)\log p_\theta(x\mid z)\,dz
+\log p_\theta(x)\int q(z)\,dz\\
&=D(q\|p)-E_q[\log p_\theta(x\mid Z)]
+\log p_\theta(x)\\
&=\log p_\theta(x)-\mathcal L_{\theta,\phi}(x).
\end{aligned}
$$

第三行で $\int q=1$ を用いた。事後KLは非負で、[連続版ELBOの等号条件](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)により0になるのは二密度が一致するときに限る。$\square$
<!-- proof-end -->

一つのencoderを多くの観測で使う場合、通常は

$$
\frac1n\sum_{i=1}^n\mathcal L_{\theta,\phi}(x_i)
\le\frac1n\sum_{i=1}^n\log p_\theta(x_i)
$$

を最大化する。各観測に専用の最適変分分布を選ぶ場合と、共通の $\phi$ で全観測を推論する場合では最大値が異なりうる。これを **償却推論の制約によるずれ** と呼び、生成模型の尤度の変化と区別する。

## 3. 対角Gaussian encoderとKLの閉形式

encoderは平均 $\mu_\phi(x)\in\mathbb R^k$ と正の標準偏差を出力できる。観測 $x$ を固定し、$\rho_{\phi,j}(x)=\log\sigma_j$ とすれば $\sigma_j=e^{\rho_{\phi,j}(x)}>0$ となる。

[Gaussian再パラメータ化](../ML2-09/index.md#def-ml2-09-reparam)を各成分に適用し、独立な標準正規乱数 $\varepsilon_1,\ldots,\varepsilon_k$ から $Z_j=\mu_{\phi,j}(x)+e^{\rho_{\phi,j}(x)}\varepsilon_j$ を作る。このとき $E\varepsilon_j=0$、$E(\varepsilon_i\varepsilon_j)=\delta_{ij}$（同じ添字なら1、異なる添字なら0）なので、

$$
E[Z_j]=\mu_{\phi,j}(x),\qquad
\operatorname{Cov}(Z_i,Z_j)
=e^{\rho_{\phi,i}(x)+\rho_{\phi,j}(x)}\delta_{ij}.
$$

従って共分散行列の $(i,j)$ 成分は、$i=j$ なら $e^{2\rho_{\phi,j}(x)}$、そうでなければ0となる。$\operatorname{diag}(c_1,\ldots,c_k)$ は $c_j$ を対角成分に置き、他の成分を0にした行列である。共分散が対角というのは **近似事後に置いた独立性の仮定** であり、真の事後分布の性質ではない。以下、$q=N_k(\mu,\Sigma)$ は「$q$ が $N_k(\mu,\Sigma)$ の密度である」の略記とする。

<a id="def-ml2-20-diagonal-encoder"></a>

<!-- formal-statement-start -->
> **定義（対角Gaussian encoder）**
> 各観測 $x$ で $\mu_\phi(x),\rho_\phi(x)\in\mathbb R^k$ を出力し、次の密度を指定するencoderを対角Gaussian encoderという。

$$
q_\phi(z\mid x)=N_k\!\left(
\mu_\phi(x),\operatorname{diag}
(e^{2\rho_{\phi,1}(x)},\ldots,e^{2\rho_{\phi,k}(x)})\right).
$$

> 各成分の標準偏差は $\sigma_j=e^{\rho_j}$、分散は $\sigma_j^2=e^{2\rho_j}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-20-diagonal-encoder -->
**定義の確認**。$k=2$、$\mu=(1,-1)$、$\sigma=(2,1/2)$ とすると $\rho=(\log2,-\log2)$ で、直前の共分散成分の式から $\operatorname{diag}(4,1/4)$ を得る。任意の非零ベクトル $v=(v_1,v_2)^T\in\mathbb R^2$ に対し

$$
v^T\operatorname{diag}(4,1/4)v=4v_1^2+v_2^2/4>0
\qquad(v\ne0).
$$

従って行列は対称正定値で逆行列を持ち、正規密度が存在する。独立な標準正規 $\varepsilon_1,\varepsilon_2$ を使った $Z=(1+2\varepsilon_1,-1+\varepsilon_2/2)$ は平均 $\mu$、各分散 $4,1/4$、共分散0なので指定の密度に従う。
<!-- definition-example-end -->

事前分布を $N_k(0,I_k)$ とすればKLは各成分の密度比から直接求まる。

<a id="thm-ml2-20-gaussian-kl"></a>

<!-- formal-statement-start -->
> **定理（対角Gaussianの事前KL公式）**
> $q=N_k(\mu,\operatorname{diag}(\sigma_1^2,\ldots,\sigma_k^2))$、$p=N_k(0,I_k)$、$\mu\in\mathbb R^k$、$\sigma_j>0$ とする。このとき

$$
\boxed{D(q\|p)=\frac12\sum_{j=1}^k
(\mu_j^2+\sigma_j^2-1-\log\sigma_j^2)}
$$

> が成り立つ。$\rho_j=\log\sigma_j$ を使えば各項は $(\mu_j^2+e^{2\rho_j}-1-2\rho_j)/2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

二つのGaussianの対数密度を引いてから、平均と分散を代入する。正の標準偏差により両密度は全実数上で正である。

<!-- proof-start -->
### 証明

正規密度の積表示から

$$
\begin{aligned}
\log q(z)&=-\frac{k}{2}\log(2\pi)-\sum_j\log\sigma_j
-\frac12\sum_j\frac{(z_j-\mu_j)^2}{\sigma_j^2},\\
\log p(z)&=-\frac{k}{2}\log(2\pi)-\frac12\sum_jz_j^2.
\end{aligned}
$$

両者の差を $q$ で平均する。二次モーメントは有限で、
$E_q(Z_j-\mu_j)^2=\sigma_j^2$ と $E_qZ_j^2=\mu_j^2+\sigma_j^2$ だから

$$
\begin{aligned}
D(q\|p)
&=\sum_j\left[-\log\sigma_j
-\frac{E_q(Z_j-\mu_j)^2}{2\sigma_j^2}
+\frac{E_qZ_j^2}{2}\right]\\
&=\sum_j\left[-\log\sigma_j-\frac12
+\frac{\sigma_j^2+\mu_j^2}{2}\right]\\
&=\frac12\sum_j(\mu_j^2+\sigma_j^2-1-\log\sigma_j^2).
\end{aligned}
$$

$\log\sigma_j^2=2\rho_j$ と $\sigma_j^2=e^{2\rho_j}$ を使えば第二の表記も得られる。$\square$
<!-- proof-end -->

定義例の $\mu=(1,-1)$、$\sigma=(2,1/2)$ なら対数分散が相殺して $D(q\|p)=17/8$ となる。$t>0$ に対し $g(t)=t-1-\log t$ は $g'(t)=1-1/t$ だから $t=1$ で唯一の最小値0を取る。よって各項 $\mu_j^2+g(\sigma_j^2)$ は非負であり、KLが0になるのはすべての成分で $\mu_j=0$、$\sigma_j=1$ となるときに限る。

## 4. 再構成項はdecoderの尤度が決める

**Gaussian decoder** では $x\in\mathbb R^d$、平均写像 $f_\theta:\mathbb R^k\to\mathbb R^d$、固定の $\tau>0$ を使い、$X\mid Z=z\sim N_d(f_\theta(z),\tau^2I_d)$ とする。対数密度は

$$
\log p_\theta(x\mid z)
=-\frac d2\log(2\pi\tau^2)
-\frac{\|x-f_\theta(z)\|^2}{2\tau^2}.
$$

つまり二乗誤差には $1/(2\tau^2)$ の係数が付く。$\tau$ 自体を学習するなら正規化定数も落とせない。一次元で $f_\theta(z)=az+b$、$q=N(\mu,\sigma^2)$ とすれば

$$
\begin{aligned}
E_q(x-aZ-b)^2
&=E_q[(x-a\mu-b)-a(Z-\mu)]^2\\
&=(x-a\mu-b)^2+a^2\sigma^2.
\end{aligned}
$$

交差項は $E_q(Z-\mu)=0$ で消える。decoderへ単に平均を代入するのでは、$a^2\sigma^2$ を落としてしまう。

**Bernoulli decoder** では $x\in\{0,1\}^d$、条件付き独立な成分の成功確率を $s_{\theta,j}(z)\in(0,1)$ とすると

$$
\log p_\theta(x\mid z)=
\sum_{j=1}^d\{x_j\log s_{\theta,j}(z)
+(1-x_j)\log[1-s_{\theta,j}(z)]\}.
$$

これは二値交差エントロピーに負号を付けた形で、Gaussianの二乗誤差とは別の観測模型から生じる。観測雑音と潜在変数の不確実性を混同しない。

## 5. Gaussian再パラメータ化と勾配

[Gaussian再パラメータ化](../ML2-09/index.md#def-ml2-09-reparam)を使い、$\varepsilon\sim N_k(0,I_k)$ をencoderのパラメータと独立に採る。

$$
Z=T_\phi(x,\varepsilon)=\mu_\phi(x)
+e^{\rho_\phi(x)}\odot\varepsilon.
$$

$\odot$ と指数は成分ごとの演算である。乱数 $\varepsilon$ を固定してdecoderとの合成を微分し、最後に平均する。

<a id="thm-ml2-20-gradient"></a>

<!-- formal-statement-start -->
> **定理（Gaussian VAEの経路勾配）**
> 観測 $x$ を固定し、事前は $N_k(0,I_k)$、encoderは対角Gaussianとする。$h_\theta(z)=\log p_\theta(x\mid z)$ は $z,\theta$ で連続微分可能、$\mu_\phi(x),\rho_\phi(x)$ は $\phi$ で連続微分可能とする。
>
> $\theta\in\mathbb R^r$、$\phi\in\mathbb R^m$ を別々のパラメータ群とする。パラメータ近傍で $h_\theta(T_\phi(x,\varepsilon))$ とその偏微分を同じ可積分関数で支配でき、微分と期待値を交換できると仮定する。$J_\phi\mu,J_\phi\rho\in\mathbb R^{k\times m}$ は行を出力成分、列を $\phi$ の成分とするJacobian、$\boldsymbol1\in\mathbb R^k$ は全成分が1の列ベクトルとする。勾配も列ベクトルとして書く。このとき

$$
\begin{aligned}
\nabla_\theta\mathcal L
&=E_\varepsilon[\nabla_\theta h_\theta(T_\phi)],\\
\nabla_\phi\mathcal L
&=(J_\phi\mu)^T
\{E_\varepsilon[\nabla_zh_\theta(T_\phi)]-\mu\}\\
&\quad+(J_\phi\rho)^T
\{E_\varepsilon[(e^\rho\odot\varepsilon)
\odot\nabla_zh_\theta(T_\phi)]-(e^{2\rho}-\boldsymbol1)\}.
\end{aligned}
$$

<!-- formal-statement-end -->

### 証明の見取り図

[Gaussian経路勾配](../ML2-09/index.md#thm-ml2-09-pathwise)と[逆モード連鎖律](../ML2-14/index.md#thm-ml2-14-reverse-chain)を合わせ、事前KLの微分を引く。encoderの平均と対数標準偏差に戻る二つの経路を区別する。

<!-- proof-start -->
### 証明

[KL公式](#thm-ml2-20-gaussian-kl)を $K(\mu,\rho)$ と書けば

$$
K(\mu,\rho)=\frac12\sum_j(\mu_j^2+e^{2\rho_j}-1-2\rho_j),
$$

$$
\nabla_\mu K=\mu,\qquad \nabla_\rho K=e^{2\rho}-\boldsymbol1.
$$

一方、$z_j=\mu_j+e^{\rho_j}\varepsilon_j$ なので

$$
\frac{\partial z_j}{\partial\mu_l}=\delta_{jl},
\qquad
\frac{\partial z_j}{\partial\rho_l}
=\delta_{jl}e^{\rho_j}\varepsilon_j.
$$

従って連鎖律から

$$
\nabla_\mu h_\theta(T_\phi)=\nabla_zh_\theta(T_\phi),
$$

$$
\nabla_\rho h_\theta(T_\phi)
=(e^\rho\odot\varepsilon)\odot\nabla_zh_\theta(T_\phi).
$$

局所支配条件で微分と期待値を交換し、$K$ の微分を引く。最後に[層のJacobian積](../ML2-14/index.md#thm-ml2-14-layer-jacobian)を $\phi\mapsto(\mu,\rho)\mapsto\mathcal L$ に適用する。$\theta$ には $K$ もencoderも依存しないので、再構成項の微分だけが残る。$\square$
<!-- proof-end -->

Gaussian decoderで $J_zf_\theta$ が $d\times k$ 行列なら

$$
\nabla_zh_\theta(z)
=\frac{(J_zf_\theta(z))^T(x-f_\theta(z))}{\tau^2}
\in\mathbb R^k.
$$

サンプル平均で期待値を近似する勾配は、仮定した交換条件の下で不偏である。ただし各サンプルが真の勾配と一致するわけではない。

## 6. 線形Gaussian模型でELBOの等号を検算

$Z\sim N(0,1)$、$X\mid Z=z\sim N(z,1)$ とする。独立な標準正規 $E$ を使えば $X=Z+E\sim N(0,2)$。観測 $x=1$ を固定する。

<a id="prop-ml2-20-linear-tight"></a>

<!-- formal-statement-start -->
> **命題（線形Gaussian VAEの下界一致）**
> $Z\sim N(0,1)$、$X\mid Z=z\sim N(z,1)$、観測 $x=1$ の模型でencoderを $q(z\mid1)=N(\mu,s^2)$、$\mu\in\mathbb R$、$s>0$ とすると、真の事後は $N(1/2,1/2)$ であり、ELBOは $\mu=1/2,s^2=1/2$ で最大になる。その最大値は

$$
\log p(1)=-\frac12\log(4\pi)-\frac14
$$

> に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

事後密度を平方完成し、再構成とKLを別々に評価する。分散を正の変数として最適化する。

<!-- proof-start -->
### 証明

Bayes公式の指数部分は

$$
-\frac{z^2+(1-z)^2}{2}
=-\left(z-\frac12\right)^2-\frac14
$$

なので事後は $N(1/2,1/2)$。$q=N(\mu,s^2)$ では

$$
E_q(1-Z)^2=(1-\mu)^2+s^2,
$$

$$
\mathcal L(\mu,s^2)=-\frac12\log(2\pi)
-\frac12\{(1-\mu)^2+s^2+\mu^2+s^2-1-\log s^2\}.
$$

$v=s^2>0$ とすると、最小化すべき括弧は

$$
2(\mu-\tfrac12)^2+\tfrac12+2v-\log v-1.
$$

平均については $\mu=1/2$ が唯一の最小点。$2v-\log v$ の導関数は $2-1/v$ で、$v=1/2$ を境に負から正へ変わり、両端で発散する。従って唯一の最大化encoderは指定の値である。代入すると

$$
\begin{aligned}
\mathcal L(\tfrac12,\tfrac12)
&=-\tfrac12\log(2\pi)
-\tfrac12(\tfrac14+\tfrac12+\tfrac14+\tfrac12-1+\log2)\\
&=-\tfrac12\log(4\pi)-\tfrac14=\log p(1).
\end{aligned}
$$

周辺分布 $N(0,2)$ の密度の評価と一致した。$\square$
<!-- proof-end -->

encoderを事前 $N(0,1)$ に固定すると

$$
\mathcal L(0,1)=-\tfrac12\log(2\pi)-1,\qquad
\log p(1)-\mathcal L(0,1)=\tfrac34-\tfrac12\log2>0.
$$

この差は[VAEのELBOと事後KL恒等式](#thm-ml2-20-elbo)により真の事後へのKLである。真の事後を表現できるencoder族でも、誤ったencoderパラメータなら下界は緩むことを示す。

## 7. 潜在変数を無視するdecoderとサンプル推定値

decoderが潜在変数を使わなければ、KLを0にしても生成模型が潜在表現を活用しているとはいえない。

<a id="prop-ml2-20-collapse"></a>

<!-- formal-statement-start -->
> **命題（潜在変数を使わないdecoderとposterior collapse）**
> $p_\theta(x\mid z)=r_\theta(x)$ が全ての $z$ で成立し、$r_\theta$ は正規化された観測分布、$r_\theta(x)>0$ とする。すると $p_\theta(z\mid x)=p(z)$ であり、任意の許容encoder $q$ に対して

$$
\mathcal L_{\theta,q}(x)=\log r_\theta(x)-D(q\|p).
$$

> $q=p$ を選べるなら事前KLが0でも下界は厳密な対数周辺尤度に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

周辺化しても $r_\theta(x)$ が変わらないことから、事後密度を直接計算する。

<!-- proof-start -->
### 証明

$$
p_\theta(x)=\int p(z)r_\theta(x)\,dz
=r_\theta(x)\int p(z)\,dz=r_\theta(x).
$$

このため $p_\theta(z\mid x)=p(z)r_\theta(x)/r_\theta(x)=p(z)$。再構成項は $E_q\log r_\theta(x)=\log r_\theta(x)$ だから、[VAEのELBO恒等式](#thm-ml2-20-elbo)で使用した再構成項・事前KLの差に代入して主張の式が得られる。$\square$
<!-- proof-end -->

例えば $X$ が二値、$r_\theta(1)=3/4$、$r_\theta(0)=1/4$ なら、事前を $N(0,1)$ にして $q=p$ とすれば観測 $x=1$ に対するELBOは $\log(3/4)$。**KLの小ささは潜在表現の良さの証拠ではない。**

さらに、サンプル $z$ に対する

$$
\widehat\ell(z)=\log p_\theta(x\mid z)+\log p(z)
-\log q_\phi(z\mid x)
$$

は、期待値を取ればELBOとなるが、**一回ごとの値が $\log p_\theta(x)$ 以下という保証はない**。前節の模型で $q=p=N(0,1)$、$x=1$、$z=1$ における標本値を評価すると

$$
\widehat\ell(1)=-\tfrac12\log(2\pi),\qquad
\widehat\ell(1)-\log p(1)=\tfrac12\log2+\tfrac14>0.
$$

連続性により $z=1$ の近傍にも同じ不等式の点がある。下界は期待値についての主張である。

## 8. 再計算ラボ

NumPyで第6節の一次元模型を再計算する。$\rho$ は **標準偏差の対数** であり、分散の対数ではない。

```python
import numpy as np

rng = np.random.default_rng(20261027)
x = 1.0
mu, rho = 0.5, -0.5 * np.log(2.0)
sigma = np.exp(rho)
eps = rng.standard_normal(200_000)
z = mu + sigma * eps

log_lik = -0.5 * np.log(2.0 * np.pi) - 0.5 * (x - z)**2
kl = 0.5 * (mu**2 + sigma**2 - 1.0 - 2.0 * rho)
elbo_mc = log_lik.mean() - kl
log_evidence = -0.5 * np.log(4.0 * np.pi) - 0.25
grad_mu_mc = np.mean(x - z) - mu
grad_rho_mc = np.mean((x - z) * sigma * eps) - (sigma**2 - 1.0)
print(elbo_mc, log_evidence, grad_mu_mc, grad_rho_mc)
```

固定seedではELBO推定値は約 $-1.51674$、真値は約 $-1.51551$ となる。二つの勾配推定値は0付近。$\mu=0,\rho=0$ に替えると厳密ELBOは約 $-1.919$ に下がる。サンプル数やencoderを変え、再構成とKLの値を別々に比較せよ。

## 9. 演習

### Level A

**ML2-20-A01（生成と推論の分離）**
- Level: A
- 問題: $p(z)=N(0,1)$、$p_\theta(x\mid z)=N(2z,1)$ の密度、$q_\phi(z\mid x)=N(x/3,1)$ の密度を考える。$p_\theta(x)$ を定める式を書き、$q_\phi$ を $N(0,1)$ に取り替えたときの影響を説明せよ。
<!-- solution-start -->
**詳細解答**。生成模型の周辺密度は

$$
p_\theta(x)=\int_{\mathbb R}
\frac{e^{-z^2/2}}{\sqrt{2\pi}}
\frac{e^{-(x-2z)^2/2}}{\sqrt{2\pi}}\,dz.
$$

$X=2Z+E$（$Z,E$ は独立な標準正規）と構成できるため、$E[X]=0$、$\operatorname{Var}(X)=4+1=5$ で、$p_\theta=N(0,5)$ の密度となる。周辺密度の式にencoderは現れないので、$q_\phi$ を取り替えても生成分布は変わらない。ただしELBOと近似事後は一般に変わる。
<!-- solution-end -->

**ML2-20-A02（事前KL）**
- Level: A
- 問題: $q=N(1,4)$、$p=N(0,1)$ の確率密度についてKLを求め、平均差と分散差の寄与を区別せよ。
<!-- solution-start -->
**詳細解答**。[対角GaussianのKL公式](#thm-ml2-20-gaussian-kl)へ $\mu=1$、$\sigma^2=4$ を代入すると

$$
D(q\|p)=\frac12(1+4-1-\log4)=2-\log2.
$$

平均の寄与は $\mu^2/2=1/2$、分散の寄与は $(4-1-\log4)/2=3/2-\log2$。両者の和が上式となる。$\log\sigma^2$ を $\log\sigma$ と誤って代入しない。
<!-- solution-end -->

**ML2-20-A03（Bernoulli再構成）**
- Level: A
- 問題: 二値観測 $x=(1,0)$ に対し、decoderが独立な二成分の成功確率 $(3/4,1/4)$ を返した。条件付き対数尤度と負の対数尤度を求めよ。
<!-- solution-start -->
**詳細解答**。条件付き独立の仮定から $p_\theta(x\mid z)=P(X_1=1\mid z)P(X_2=0\mid z)=(3/4)(1-1/4)=9/16$。よって

$$
\log p_\theta(x\mid z)=\log(9/16),\qquad
-\log p_\theta(x\mid z)=\log(16/9).
$$

第二成分は0なので成功確率 $1/4$ でなく補確率 $3/4$ を掛ける。
<!-- solution-end -->

**ML2-20-A04（Gaussian再構成の分散寄与）**
- Level: A
- 問題: 観測 $x=2$、decoder $X\mid Z=z\sim N(2z,1)$、encoder $q=N(1/2,1/4)$ とする。再構成項を計算せよ。
<!-- solution-start -->
**詳細解答**。$E_qZ=1/2$、$\operatorname{Var}_qZ=1/4$ であり

$$
E_q(2-2Z)^2=(2-2\cdot\tfrac12)^2+2^2\cdot\tfrac14=2.
$$

Gaussian対数密度 $-\log(2\pi)/2-(2-2z)^2/2$ を平均すれば

$$
E_q\log p_\theta(2\mid Z)=-\tfrac12\log(2\pi)-1.
$$

平均値をdecoderへ代入するだけでは分散による誤差1を落とす。
<!-- solution-end -->

### Level B

**ML2-20-B01（線形模型の事後とELBO gap）**
- Level: B
- 問題: $Z\sim N(0,1)$、$X\mid Z=z\sim N(z,1)$、$x=1$ とする。次を求めよ。

  1. 真の事後分布。
  2. $q=N(0,1)$ のELBO。
  3. 対数周辺尤度とELBOの差が事後KLに等しいことの数値式による検算。
<!-- solution-start -->
**詳細解答**。(1) 事後の核は $\exp[-(z^2+(1-z)^2)/2]$。平方完成

$$
z^2+(1-z)^2=2(z-\tfrac12)^2+\tfrac12
$$

により事後は $N(1/2,1/2)$。

(2) $q=N(0,1)$ では $E(1-Z)^2=2$、事前KLは0だから

$$
\mathcal L=-\tfrac12\log(2\pi)-1.
$$

(3) $X=Z+E\sim N(0,2)$ の密度を $x=1$ で評価すると $\log p(1)=-\log(4\pi)/2-1/4$。差は

$$
\log p(1)-\mathcal L=\tfrac34-\tfrac12\log2.
$$

同じ差を二つのGaussianの密度比から直接計算すると

$$
\begin{aligned}
D(N(0,1)\|N(\tfrac12,\tfrac12))
&=\frac12\left[\frac{1+(0-1/2)^2}{1/2}
-1+\log\frac{1/2}{1}\right]\\
&=\tfrac34-\tfrac12\log2.
\end{aligned}
$$

分散比と対数の向きを含めて一致する。
<!-- solution-end -->

**ML2-20-B02（経路勾配の符号）**
- Level: B
- 問題: B01の模型で $q=N(\mu,e^{2\rho})$ とする。ELBOを $\mu,\rho$ で微分し、一意の最大点を求めよ。再パラメータ化で再構成項の勾配も検算せよ。
<!-- solution-start -->
**詳細解答**。$v=e^{2\rho}$ として

$$
\mathcal L=-\tfrac12\log(2\pi)
-\tfrac12[(1-\mu)^2+v+\mu^2+v-1-2\rho].
$$

各偏微分は

$$
\partial_\mu\mathcal L=1-2\mu,\qquad
\partial_\rho\mathcal L=1-2e^{2\rho}.
$$

零点は $\mu=1/2,v=1/2,\rho=-\log2/2$。二階偏微分はそれぞれ $-2$ と $-4e^{2\rho}<0$、交差項は0。さらに両端でELBOが低下するため一意の大域最大点である。

再パラメータ化 $Z=\mu+e^\rho\varepsilon$ において $\partial_z\log p(1\mid z)=1-z$。再構成項の $\mu$ 勾配は $E(1-Z)=1-\mu$、$\rho$ 勾配は

$$
E[(1-Z)e^\rho\varepsilon]
=e^\rho[(1-\mu)E\varepsilon-e^\rho E\varepsilon^2]
=-e^{2\rho}.
$$

これらからKL勾配 $\mu$ と $e^{2\rho}-1$ を引くと同じ二式になる。
<!-- solution-end -->

**ML2-20-B03（Monte Carlo標本値は下界ではない）**
- Level: B
- 問題: B01の模型で $q=p=N(0,1)$、$x=1$ とする。標本 $z=1$ における $\log p(1\mid z)+\log p(z)-\log q(z\mid1)$ を求め、真の $\log p(1)$ と比較せよ。ELBOの下界性と矛盾しない理由を述べよ。
<!-- solution-start -->
**詳細解答**。$q=p$ なので後二項は相殺する。$z=1$ では $p(1\mid1)=1/\sqrt{2\pi}$、従って標本値は $-\log(2\pi)/2$。真の対数周辺尤度は $-\log(4\pi)/2-1/4$ である。差は

$$
\frac12\log2+\frac14>0.
$$

ELBOはこの標本値を $q$ で**平均した量**の下界性であり、各点での不等式を主張しない。$z=1$ の近傍でも標本値の方が大きい。
<!-- solution-end -->

**ML2-20-B04（posterior collapse）**
- Level: B
- 問題: $p(z)=N(0,1)$、$X\in\{0,1\}$、$p_\theta(X=1\mid z)=3/4$ が全ての $z$ で成立する。観測 $x=1$ について次を求めよ。

  1. 周辺確率。
  2. 真の事後密度。
  3. $q=N(\mu,\sigma^2)$ のELBOと最大点、KLが0の意味。
<!-- solution-start -->
**詳細解答**。(1) $p_\theta(1)=\int (3/4)p(z)\,dz=3/4$。(2) 事後密度は同時密度を周辺確率で割ったものなので $p_\theta(z\mid1)=p(z)(3/4)/(3/4)=p(z)$。

(3) 再構成項は $\log(3/4)$ で一定であるから

$$
\mathcal L=\log(3/4)
-\tfrac12(\mu^2+\sigma^2-1-\log\sigma^2).
$$

KLの非負性と等号条件から $\mu=0,\sigma^2=1$ で最大となり、ELBOは $\log(3/4)$ に一致する。しかし観測分布は $z$ に依存しない。KLの0は良い潜在表現の証明ではない。
<!-- solution-end -->

### Level C

**ML2-20-C01（償却推論の制約）**
- Level: C
- 問題: $Z\sim N(0,1)$、$X\mid Z=z\sim N(z,1)$ とし、二観測 $x_1=-1,x_2=1$ を等重みで扱う。次を示せ。

  1. 各観測の真の事後と対数周辺尤度。
  2. 全観測で同じ $q(z\mid x)=N(m,v)$ に制限したときの平均ELBOの最大点と、平均対数周辺尤度との差。$m\in\mathbb R,v>0$ は共通とする。
  3. encoder平均を $m(x)=ax$、分散を共通 $v$ としたとき、差を0にする設定。
  4. この比較で固定されている対象。
<!-- solution-start -->
**詳細解答**。(1) 一般の $x$ に対するBayes公式の核を平方完成すると

$$
-\tfrac12[z^2+(x-z)^2]
=-\left(z-\frac{x}{2}\right)^2-\frac{x^2}{4}.
$$

従って $p(z\mid x)=N(x/2,1/2)$、$p(x)=N(0,2)$ の密度である。両観測で $x_i^2=1$ だから平均対数周辺尤度は $-\log(4\pi)/2-1/4$。

(2) [VAEのELBOと事後KL恒等式](#thm-ml2-20-elbo) を各観測へ適用する。平均対数周辺尤度から平均ELBOを引いた値は、各事後へのKLの平均である。$r_i=N(x_i/2,1/2)$ とすれば

$$
\begin{aligned}
\overline D(m,v)
&=\frac12\sum_{i=1}^2\frac12\left[
\frac{v+(m-x_i/2)^2}{1/2}-1+\log\frac{1/2}{v}\right]\\
&=v+m^2+\frac14-\frac12+\frac12\log\frac{1/2}{v}\\
&=m^2+v-\frac14+\frac12\log\frac{1/2}{v}.
\end{aligned}
$$

偏微分は $\partial_m\overline D=2m$、$\partial_v\overline D=1-1/(2v)$ であり、$v\to0$ と $v\to\infty$ では目的が発散する。従って最小点は $m=0,v=1/2$、値は

$$
\overline D(0,\tfrac12)=\frac14.
$$

つまり共通の定数encoderでは最良の平均ELBOでも平均対数周辺尤度より $1/4$ 小さい。

(3) $a=1/2,v=1/2$ とすれば $q(z\mid x)=N(x/2,1/2)$ が各観測で真の事後と一致し、両方のKLが0となる。

(4) **生成模型と二つの観測を固定**し、encoder族だけを変えている。下界が上がっても生成模型自体の対数周辺尤度が増加したことにはならない。
<!-- solution-end -->

## まとめ

- VAEは生成模型 $p(z)p_\theta(x\mid z)$ と、観測ごとの近似事後を返すencoderを組み合わせる。
- ELBOは再構成対数尤度の期待値から事前KLを引いた量で、真の対数周辺尤度との差は事後KLである。
- 対角GaussianのKLは密度比から閉じた式で求まり、再パラメータ化と連鎖律でencoderに勾配を戻せる。
- KLが0でも潜在変数を無視したdecoderはあり、Monte Carloの単発値が対数尤度以下とも限らない。

次講では可逆変換のJacobianを追う正規化flowを扱う。
