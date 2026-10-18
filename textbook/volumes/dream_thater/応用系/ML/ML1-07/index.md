# ML1-07 生成的分類・Naive Bayes・LDA/QDA

<!-- definition-example-audit: strict -->

## 1. 回帰係数から、クラスの確率分布へ

これまでは、標本から予測器の係数を選ぶ方法を学んだ。しかし分類では、入力 $x$ が与えられたとき「各クラスがどれほどありそうか」を比較する別の道筋がある。[0–1損失のBayes分類則](../ML1-02/index.md#thm-ml1-02-zero-one-bayes)は、事後確率が最大のクラスを予測すれば条件付き誤分類確率を最小にできると教える。ならば、各クラスのもとで入力がどのように分布するかを組み立て、事後確率を求めよう。

この章は $K\ge2$ 個のクラス $\mathcal Y=\{0,\ldots,K-1\}$ と、特徴量 $X\in\mathbb R^p$（$p\ge1$）を基本設定とする。クラスの出現確率を $\pi_k=P(Y=k)>0$、$\sum_k\pi_k=1$ とし、$Y=k$ のもとでの $X$ のLebesgue密度を $f_k(x)\ge0$（$\int_{\mathbb R^p}f_k(x)\,dx=1$）とする。密度は一点の「確率」ではなく、小領域の確率を積分で決める関数である。離散特徴の場合は以下の積分を和、密度を確率質量関数に置き換える。

## 2. 生成模型の予測はBayes公式で完成する

先にクラス $Y$ を $\pi$ に従って選び、次に選ばれたクラスの分布 $f_Y$ から $X$ を生成する、と考える。この「クラス $\to$ 特徴」の向きで同時分布を指定するものが生成的分類の基本である。予測では向きを逆にし、観測した $x$ から $Y$ を推定する。

<a id="def-ml1-07-generative"></a>

<!-- formal-statement-start -->
> **定義（生成的分類模型）**  
> クラス集合 $\mathcal Y=\{0,\ldots,K-1\}$、正の事前確率 $\pi_k$（総和1）、非負で積分1のクラス条件付き密度 $f_k:\mathbb R^p\to[0,\infty)$ の組を生成的分類模型という。同時分布は任意の可測集合 $A$ に対し
>
$$
P(Y=k,X\in A)=\pi_k\int_A f_k(x)\,dx
$$
>
> と定める。$m(x)=\sum_j\pi_j f_j(x)$ を入力の周辺密度とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-07-generative -->
**定義の確認**。$p=1,K=2$ とし、$\pi_0=2/3,\pi_1=1/3$、$f_0(x)=1$（$0\le x\le1$、それ以外0）、$f_1(x)=2x$（$0\le x\le1$、それ以外0）とする。積分はそれぞれ1であり、$P(Y=1,X\in[0,1/2])=(1/3)\int_0^{1/2}2x\,dx=1/12$。したがって $m(x)=2/3+2x/3$（$0\le x\le1$）で、その積分も1である。事前確率と条件付き密度の双方が必要なことを確認できる。
<!-- definition-example-end -->

<a id="thm-ml1-07-posterior"></a>

<!-- formal-statement-start -->
> **定理（密度から事後確率と最適分類則を得る）**  
> [生成的分類模型](#def-ml1-07-generative)のもとで、$m(x)>0$ の点における条件付きクラス確率の一つの版は
>
$$
\eta_k(x)=P(Y=k\mid X=x)
=\frac{\pi_k f_k(x)}{\sum_{j=0}^{K-1}\pi_j f_j(x)}
$$
>
> である。0–1損失では $\pi_kf_k(x)$ を最大化するクラスを選べば、Bayes分類則となる。同点では任意の最大化クラスを選んでよい。
<!-- formal-statement-end -->

### 証明の見取り図

同時密度を「周辺密度 × 条件付き確率」に分解する。分母はすべてのクラスから来た入力の密度で、分類順位だけなら共通分母を消せる。

<!-- proof-start -->
### 証明

$m(x)>0$ で右辺の比を $\eta_k(x)$ と定める。各値は非負、総和は1である。任意の可測集合 $A$ について

$$
\int_A\eta_k(x)m(x)\,dx
=\int_{A\cap\{m>0\}}\pi_k f_k(x)\,dx
=\pi_k\int_A f_k(x)\,dx.
$$

最後の等号は、$m=0$ なら $\pi_k>0$ と各 $f_j\ge0$ より $f_k=0$ だから成立する。この積分一致性で $\eta_k$ は条件付き確率の版を与える。$m=0$ の点では入力が周辺分布のもとで確率0しか持たず、事後確率の値は任意に補える。さらに $m>0$ では $m$ は $k$ に依存しない。したがって $\eta_k$ と $\pi_k f_k$ の最大化集合は一致し、[0–1損失のBayes分類則](../ML1-02/index.md#thm-ml1-02-zero-one-bayes)を適用できる。$\square$
<!-- proof-end -->

前の例の $x=1/2$ では $\pi_0 f_0=2/3$、$\pi_1f_1=1/3$。事後確率は $(2/3,1/3)$ でクラス0を選ぶ。**密度 $f_1(1/2)=1$ だけを見て事前確率を忘れると誤る**。また、パラメータを標本から推定する場合は真のBayes分類則ではなく、推定した模型に対する*プラグイン分類則*となる。

## 3. Naive Bayes：特徴ごとの積へ分解する

高次元の $f_k(x_1,\ldots,x_p)$ をそのまま推定するのは難しい。[条件付き独立性](../../../../解析系/F0/F0-00P3/index.md#def-f0p3-conditional-independence)に相当する仮定をクラスごとに課せば、一次元の分布を掛けるだけで同時分布が書ける。ここではその意味を式で定義し、仮定が失敗する例も調べる。

<a id="def-ml1-07-naive-bayes"></a>

<!-- formal-statement-start -->
> **定義（Naive Bayes模型）**  
> クラス $k$ のもとで各特徴 $X_1,\ldots,X_p$ が相互に条件付き独立であり、共通の基準測度に関する各座標の条件付き密度（離散なら確率質量関数）を $f_{kj}$ とするとき、
>
$$
f_k(x)=\prod_{j=1}^p f_{kj}(x_j)
$$
>
> とする生成的分類模型をNaive Bayes模型という。これはクラスで条件付けた後の独立性であって、無条件の独立性ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-07-naive-bayes -->
**定義の確認**。$K=2,p=2$、$\pi_0=\pi_1=1/2$ とし、$Y=0$ で $P(X_1=1\mid Y=0)=0.2$、$P(X_2=1\mid Y=0)=0.6$、$Y=1$ で対応する値を $0.8,0.3$ とする。各クラス内で2特徴が独立なBernoulli変数であると**模型として仮定**する。例えば $x=(1,0)$ には

$$
\pi_0f_0(1,0)=\frac12(0.2)(0.4)=0.04,\quad
\pi_1f_1(1,0)=\frac12(0.8)(0.7)=0.28.
$$

周辺確率は $0.32$、事後確率は $\eta_1(1,0)=0.28/0.32=7/8$、$\eta_0=1/8$。両座標とも各クラスの条件付きBernoulli分布を持ち、4通りの同時確率の和は $(\theta_{k1}+(1-\theta_{k1}))(\theta_{k2}+(1-\theta_{k2}))=1$ となるため、定義の積が実際に確率分布を作っている。
<!-- definition-example-end -->

<a id="prop-ml1-07-nb-score"></a>

<!-- formal-statement-start -->
> **命題（Bernoulli Naive Bayesの対数得点）**  
> $\pi_k>0$、$X_j\in\{0,1\}$、各クラスにおける成功確率 $0<\theta_{kj}<1$ とし、条件付き独立を仮定する。観測値 $x\in\{0,1\}^p$ に対し、0–1損失の分類は
>
$$
s_k(x)=\log\pi_k+\sum_{j=1}^p
\{x_j\log\theta_{kj}+(1-x_j)\log(1-\theta_{kj})\}
$$
>
> が最大の $k$ を選ぶことで実行できる。
<!-- formal-statement-end -->

### 証明の見取り図

積のままでは確率が小さくなり数値的に不便なので、正値を仮定して対数で和へ直す。

<!-- proof-start -->
### 証明

Bernoulli確率質量関数は $P(X_j=x_j\mid Y=k)=\theta_{kj}^{x_j}(1-\theta_{kj})^{1-x_j}$ である。条件付き独立と[事後確率の定理](#thm-ml1-07-posterior)より最大化すべき重みは

$$
w_k(x)=\pi_k\prod_{j=1}^p
\theta_{kj}^{x_j}(1-\theta_{kj})^{1-x_j}.
$$

各因子が正なので単調増加な対数を取り、$\log w_k=\log\pi_k+\sum_j[x_j\log\theta_{kj}+(1-x_j)\log(1-\theta_{kj})]$ となる。従って得点の最大化は重みの最大化と一致する。$\square$
<!-- proof-end -->

**独立性を誤ると何が壊れるか**。二クラスは等確率とし、クラス0では $(X_1,X_2)$ が $(0,0)$ または $(1,1)$ に各確率 $1/2$、クラス1では $(0,1)$ または $(1,0)$ に各確率 $1/2$ とする。各クラスで各座標の成功確率はすべて $1/2$ なので、独立モデルはどの組にも両クラス同じ重み $1/8$ を与える。しかし真の同時分布では $(0,0)$ は必ずクラス0、$(0,1)$ は必ずクラス1で、誤分類なしに区別できる。失った仮定は条件付き独立であり、**周辺確率の積が同時分布を表す**という機構が壊れた。Naive Bayesが実務で働くことと、独立仮定が現実に成立することは別である。

## 4. 多変量正規分布をクラスの密度にする

連続特徴では、平均だけでなく「どちらの方向へ散らばるか」を記す必要がある。ベクトル $\mu\in\mathbb R^p$ は中心、実対称行列 $\Sigma\in\mathbb R^{p\times p}$ は共分散を表す。任意の $v\ne0$ に $v^{\mathsf T}\Sigma v>0$ が成り立つとき、$\Sigma$ を正定値と呼ぶ。この条件なら逆行列と正の行列式が存在する。[正定値・平方根](../../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)の既習結果により、直交座標で正の固有値へ分解できる。具体的には $\Sigma=Q\operatorname{diag}(d_1,\ldots,d_p)Q^{\mathsf T}$、$d_j>0$ である。

<a id="def-ml1-07-gaussian"></a>

<!-- formal-statement-start -->
> **定義（非退化多変量正規密度）**  
> $p\ge1$、$\mu\in\mathbb R^p$、実対称正定値 $\Sigma\in\mathbb R^{p\times p}$ に対し、
>
$$
\phi_p(x;\mu,\Sigma)
=\frac{\exp\!\left[-\frac12(x-\mu)^{\mathsf T}
\Sigma^{-1}(x-\mu)\right]}
{(2\pi)^{p/2}\sqrt{\det\Sigma}},\qquad x\in\mathbb R^p
$$
>
> を多変量正規密度とし、対応する分布を $N_p(\mu,\Sigma)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-07-gaussian -->
**定義の確認**。$p=2$、$\mu=(1,-1)^{\mathsf T}$、$\Sigma=\operatorname{diag}(1,4)$ とする。任意の $(u,v)\ne(0,0)$ に対して $(u,v)\Sigma(u,v)^{\mathsf T}=u^2+4v^2>0$ であるから正定値。$\det\Sigma=4$、$\Sigma^{-1}=\operatorname{diag}(1,1/4)$ であり、定義から

$$
\phi_2(x;\mu,\Sigma)=\frac1{4\pi}
\exp\!\left[-\frac{(x_1-1)^2}{2}-\frac{(x_2+1)^2}{8}\right].
$$

$z_1=x_1-1,z_2=(x_2+1)/2$ に変数変換するとJacobianの絶対値が2なので、積分は $(1/(4\pi))\cdot2\cdot(2\pi)=1$。中心だけでなく、二方向の標準偏差が1と2であることも確認できる。
<!-- definition-example-end -->

<a id="lem-ml1-07-gaussian-normalization"></a>

<!-- formal-statement-start -->
> **補題（正規密度の正規化）**  
> 実対称正定値 $\Sigma$ に対し、上記 $\phi_p$ は非負で $\int_{\mathbb R^p}\phi_p(x;\mu,\Sigma)\,dx=1$ を満たす。またその平均は $\mu$、共分散行列は $\Sigma$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正定値性が「回転・尺度変更で独立な標準正規の積へ戻せる」ことを保証する。特異行列では行列式が0となり、この密度表示は使えない。

<!-- proof-start -->
### 証明

$\Sigma=QDQ^{\mathsf T}$、$D=\operatorname{diag}(d_j)$、$d_j>0$、$Q^{\mathsf T}Q=I$ と対角化する。$x=\mu+QD^{1/2}z$ と置くと

$$
(x-\mu)^{\mathsf T}\Sigma^{-1}(x-\mu)
=z^{\mathsf T}D^{1/2}Q^{\mathsf T}QD^{-1}Q^{\mathsf T}QD^{1/2}z
=\sum_jz_j^2.
$$

Jacobianの絶対値は $|\det(QD^{1/2})|=\prod_j\sqrt{d_j}=\sqrt{\det\Sigma}$。よって密度と体積要素の積は $\prod_j e^{-z_j^2/2}\,dz_j/\sqrt{2\pi}$ となる。一変数積分の値を確認するため $I=\int_{\mathbb R}e^{-t^2/2}dt>0$ とおくと、非負関数の重積分を極座標に変え

$$
I^2=\int_{\mathbb R^2}e^{-(u^2+v^2)/2}\,du\,dv
=2\pi\int_0^\infty e^{-r^2/2}r\,dr=2\pi.
$$

従って $I=\sqrt{2\pi}$ であり積分は1。標準正規の各 $Z_j$ は対称性から平均0、部分積分で $\int z_j^2e^{-z_j^2/2}\,dz_j=I$ だから分散1、異なる $i,j$ の積の期待値は0である。$X=\mu+QD^{1/2}Z$ へ戻せば

$$
E[X]=\mu,\quad
\operatorname{Cov}(X)
=QD^{1/2}E[ZZ^{\mathsf T}]D^{1/2}Q^{\mathsf T}
=QDQ^{\mathsf T}=\Sigma.
$$

$\square$
<!-- proof-end -->

## 5. LDA：クラスが同じ共分散なら線形になる

各クラスが $N_p(\mu_k,\Sigma_k)$ に従う模型を考える。事後確率の比には共通因子 $(2\pi)^{-p/2}$ が消える。小さい数値の積を避けるため、正の事前確率と正定値共分散のもとで対数を取る。

<a id="thm-ml1-07-gaussian-score"></a>

<!-- formal-statement-start -->
> **定理（正規生成模型の判別得点）**  
> $\pi_k>0$、$\sum_k\pi_k=1$、$X\mid Y=k\sim N_p(\mu_k,\Sigma_k)$、各 $\Sigma_k$ は実対称正定値とする。0–1損失のBayes分類則は
>
$$
\delta_k(x)=\log\pi_k-\frac12\log\det\Sigma_k
-\frac12(x-\mu_k)^{\mathsf T}\Sigma_k^{-1}(x-\mu_k)
$$
>
> を最大にするクラスを選ぶ。同点はいずれでもよい。
<!-- formal-statement-end -->

### 証明の見取り図

確率模型から分類則を構成する[事後確率の定理](#thm-ml1-07-posterior)に、今定めた正規密度を代入する。

<!-- proof-start -->
### 証明

$\pi_k\phi_p(x;\mu_k,\Sigma_k)>0$ なので対数を取っても最大化するクラスは変わらない。定義の密度から

$$
\log\{\pi_k\phi_p(x;\mu_k,\Sigma_k)\}
=\log\pi_k-\frac p2\log(2\pi)
-\frac12\log\det\Sigma_k
-\frac12(x-\mu_k)^{\mathsf T}\Sigma_k^{-1}(x-\mu_k).
$$

$p\log(2\pi)/2$ はすべての $k$ に共通であるから除去でき、表示の $\delta_k$ を得る。$\square$
<!-- proof-end -->

**線形判別分析（LDA）**では $\Sigma_k=\Sigma$ を全クラスで共有する。同じ二次形式が差で相殺されることが鍵である。

<a id="def-ml1-07-lda"></a>

<!-- formal-statement-start -->
> **定義（LDA生成模型）**  
> 各クラスの密度が $N_p(\mu_k,\Sigma)$ で、すべてのクラスが同一の正定値共分散 $\Sigma$ を共有する生成的分類模型をLDA模型という。$\mu_k$ と $\pi_k$ はクラスで異なってよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-07-lda -->
**定義の確認**。$p=1$、$\mu_0=0,\mu_1=2$、$\Sigma=(1)$、事前確率を各 $1/2$ とする。両密度は分散1で正定値、平均だけ異なるのでLDAの各条件を満たす。後の定理を使うと境界は $x=1$ である。$\pi_1=4/5,\pi_0=1/5$ に変えると共分散は変わらないまま境界は $x=1-\frac12\log4$ へ移る。
<!-- definition-example-end -->

<a id="thm-ml1-07-lda-affine"></a>

<!-- formal-statement-start -->
> **定理（LDA判別境界のアフィン性）**  
> [LDA模型](#def-ml1-07-lda)の得点は、全クラス共通項を除くと
>
$$
a_k(x)=x^{\mathsf T}\Sigma^{-1}\mu_k
-\frac12\mu_k^{\mathsf T}\Sigma^{-1}\mu_k+\log\pi_k
$$
>
> となる。任意の2クラス $i,j$ の得点差 $a_i-a_j$ は $x$ のアフィン関数であり、その同点集合は（係数が非零なら）超平面である。実際の多クラス決定境界は、各同点集合のうち他クラスの得点以上となる部分からなる。
<!-- formal-statement-end -->

### 証明の見取り図

$(x-\mu_k)$ の二次形式を三項へ展開する。$x^{\mathsf T}\Sigma^{-1}x$ がクラスに依存しなくなるのは、共分散を共有した**その場所だけ**である。

<!-- proof-start -->
### 証明

$\Sigma^{-1}$ は対称なので

$$
(x-\mu_k)^{\mathsf T}\Sigma^{-1}(x-\mu_k)
=x^{\mathsf T}\Sigma^{-1}x
-2x^{\mathsf T}\Sigma^{-1}\mu_k
+\mu_k^{\mathsf T}\Sigma^{-1}\mu_k.
$$

[正規判別得点](#thm-ml1-07-gaussian-score)に代入すると

$$
\delta_k(x)=
-\frac12x^{\mathsf T}\Sigma^{-1}x
-\frac12\log\det\Sigma
+x^{\mathsf T}\Sigma^{-1}\mu_k
-\frac12\mu_k^{\mathsf T}\Sigma^{-1}\mu_k
+\log\pi_k.
$$

最初の二項は全クラス共通だから、比較から消せる。$a_i-a_j$ の $x$ の係数は $\Sigma^{-1}(\mu_i-\mu_j)$ で、残りは定数。$\mu_i\ne\mu_j$ なら可逆な $\Sigma^{-1}$ により係数は非零で、零集合は超平面である。$\mu_i=\mu_j$ なら定数差のみなので同点集合は全空間または空集合となる。$K>2$ の場合は $a_i=a_j$ でも第三クラスが大きければ決定境界にならない。$\square$
<!-- proof-end -->

二クラスなら、クラス1を選ぶ条件を定数と特徴量の部分へ分けて

$$
(\mu_1-\mu_0)^{\mathsf T}\Sigma^{-1}x
\ge
\frac12\bigl(\mu_1^{\mathsf T}\Sigma^{-1}\mu_1
-\mu_0^{\mathsf T}\Sigma^{-1}\mu_0\bigr)
-\log\frac{\pi_1}{\pi_0}
$$

と書ける。先ほどの1次元の例では左辺 $2x$、右辺 $2-\log(\pi_1/\pi_0)$ であり、境界 $x=1-\frac12\log(\pi_1/\pi_0)$ を得る。事前確率が変わると「直線の傾き」は変わらず、判定する位置が移動する。

## 6. QDA：共分散が異なると二次項が残る

クラスによって楕円の幅・向きが変わるなら、共通の $\Sigma$ を仮定するのは無理がある。そこでクラスごとに正定値 $\Sigma_k$ を認める。

<a id="def-ml1-07-qda"></a>

<!-- formal-statement-start -->
> **定義（QDA生成模型）**  
> 各クラスの密度が $N_p(\mu_k,\Sigma_k)$ で、各 $\Sigma_k$ が実対称正定値だがクラス間で等しいとは仮定しない生成的分類模型をQDA模型という。LDAは $\Sigma_k=\Sigma$ の特別な場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-07-qda -->
**定義の確認**。$p=1$、$\mu_0=\mu_1=0$、$\Sigma_0=(1)$、$\Sigma_1=(4)$、$\pi_0=\pi_1=1/2$ とする。両分散は正で共分散が異なるのでQDAの条件を満たすが、同一共分散を要するLDAの条件は満たさない。中心では分散の小さいクラス0の密度が高く、十分離れた尾部では分散の大きいクラス1が優勢となる。
<!-- definition-example-end -->

<a id="thm-ml1-07-qda-quadratic"></a>

<!-- formal-statement-start -->
> **定理（QDA判別差の二次式）**  
> [QDA模型](#def-ml1-07-qda)におけるクラス $i,j$ の[判別得点](#thm-ml1-07-gaussian-score)の差は
>
$$
\begin{aligned}
\delta_i(x)-\delta_j(x)
={}&-\frac12x^{\mathsf T}(\Sigma_i^{-1}-\Sigma_j^{-1})x\\
&+x^{\mathsf T}(\Sigma_i^{-1}\mu_i-\Sigma_j^{-1}\mu_j)\\
&-\frac12(\mu_i^{\mathsf T}\Sigma_i^{-1}\mu_i-\mu_j^{\mathsf T}\Sigma_j^{-1}\mu_j)\\
&-\frac12\log\frac{\det\Sigma_i}{\det\Sigma_j}
+\log\frac{\pi_i}{\pi_j}.
\end{aligned}
$$
>
> 従って同点集合は二次方程式で表される。二次項が消えれば線形または定数へ退化するため、必ず曲線になるわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

LDAと同じ平方の展開を行うが、行列 $\Sigma_i^{-1},\Sigma_j^{-1}$ が異なるので $x$ の二次項を消せない。

<!-- proof-start -->
### 証明

各 $k$ に対し

$$
-\frac12(x-\mu_k)^{\mathsf T}\Sigma_k^{-1}(x-\mu_k)
=-\frac12x^{\mathsf T}\Sigma_k^{-1}x
+x^{\mathsf T}\Sigma_k^{-1}\mu_k
-\frac12\mu_k^{\mathsf T}\Sigma_k^{-1}\mu_k.
$$

[正規判別得点](#thm-ml1-07-gaussian-score)の $\delta_i$ から $\delta_j$ を引くと、二次項は $-\frac12x^{\mathsf T}\Sigma_i^{-1}x+\frac12x^{\mathsf T}\Sigma_j^{-1}x$、一次項・定数項はそれぞれ表示の差となる。対数の差は $\log\pi_i-\log\pi_j=\log(\pi_i/\pi_j)$ と $-(\log\det\Sigma_i-\log\det\Sigma_j)/2$ である。$x$ の二次までしか現れない。$\square$
<!-- proof-end -->

上の1次元例でクラス1と0の得点差を直接求めると

$$
\delta_1(x)-\delta_0(x)
=-\log2-\frac{x^2}{8}+\frac{x^2}{2}
=-\log2+\frac{3x^2}{8}.
$$

クラス1を選ぶのは $|x|>\sqrt{8\log2/3}$（等号は同点）となる。左の尾でも右の尾でも1を選ぶため、1本の閾値によるLDAとは異なる。**共分散を共有しないこと**がこの例で二次項を残す直接の原因である。

## 7. 推定・特異行列・特徴間相関

未知の $\pi_k,\mu_k,\Sigma_k$ は訓練標本 $(x_i,y_i)_{i=1}^n$ から推定する。クラス $k$ の標本数を $n_k$ とし、$n_k>0$ とする。次は経験頻度、標本平均、標本共分散の最尤型正規化（$1/n_k$）によるプラグイン推定である。

$$
\widehat\pi_k=\frac{n_k}{n},\quad
\widehat\mu_k=\frac1{n_k}\sum_{i:y_i=k}x_i,\quad
S_k=\frac1{n_k}\sum_{i:y_i=k}(x_i-\widehat\mu_k)(x_i-\widehat\mu_k)^{\mathsf T}.
$$

QDAには $S_k$ を、LDAには同じクラス内散布をまとめた $\widehat\Sigma_{\rm pool}=\sum_kn_kS_k/n$ を使う（いずれも逆行列が存在する場合）。これは不偏共分散の $1/(n_k-1)$ と**同じ正規化ではない**。$n_k$ 個の中心化ベクトルは和が0なので、$S_k$ の階数は高々 $\min(p,n_k-1)$。例えば $n_k\le p$ なら必ず特異で、[正規判別得点](#thm-ml1-07-gaussian-score)の行列式の対数と逆行列がそのままでは定義できない。プール行列も階数は高々 $n-K$ である。

この問題を避ける簡単な方法は、正則化 $S_k+\tau I_p$（$\tau>0$）を使うことだ。$S_k$ は外積の和だから任意の $v$ で $v^{\mathsf T}S_kv=\sum_i[v^{\mathsf T}(x_i-\widehat\mu_k)]^2/n_k\ge0$。したがって $v\ne0$ なら

$$
v^{\mathsf T}(S_k+\tau I_p)v\ge\tau\|v\|_2^2>0
$$

となり、正定値かつ可逆になる。ただしこれは**推定方法を変更**する操作であり、真の共分散を同定できた証明ではない。

また、連続特徴に対するGaussian Naive Bayesは、座標がクラス内で独立な正規分布に従う模型なので、$\Sigma_k$ が対角行列であるQDAの特別な場合に一致する。多変量正規密度で対角共分散なら指数部と正規化定数が座標ごとの積へ分かれる。逆に特徴間の相関を含む非対角共分散を、分散だけの積で再現することはできない。共通の対角行列ならさらにLDAにも該当するが、Naive Bayesという名前だけでLDAともQDAとも決まるわけではない。

## 8. 計算ラボ：共分散・平均・事前確率を変える

次のPythonラボは2クラス・2次元のGaussian Naive Bayes（各クラスの共分散を対角化）、LDA（共通共分散）、QDA（クラス別共分散）の3模型で、**毎回密度得点を再計算**して領域を描く。クラス中心や事前確率を変えると領域がどう変わるか、先に[線形境界](#thm-ml1-07-lda-affine)と[二次境界](#thm-ml1-07-qda-quadratic)で予測しよう。描画は数値分類器の表示であって、学習標本からの共分散推定を自動実行するものではない。

~~~python-lab
# lab-id: ml1-07-gaussian-boundaries
# lab-title: 事前確率と共分散から三種類の境界を計算
# lab-mode: exercise
# timeout-ms: 15000
import numpy as np
import matplotlib.pyplot as plt

prior = np.array([0.5, 0.5])
means = np.array([[-1.0, 0.0], [1.0, 0.0]])
covs = np.array([[[1.0, 0.65], [0.65, 1.0]],
                 [[1.8, -0.45], [-0.45, 0.7]]])
assert prior.shape == (2,) and np.all(prior > 0)
assert abs(prior.sum() - 1) < 1e-12
assert np.all(np.linalg.eigvalsh(covs) > 0)
shared = (covs[0] + covs[1]) / 2
model_covs = [
    np.array([np.diag(np.diag(c)) for c in covs]),
    np.array([shared, shared]),
    covs
]
labels = ["Gaussian Naive Bayes", "LDA", "QDA"]
xx, yy = np.meshgrid(np.linspace(-4, 4, 150), np.linspace(-3, 3, 120))
grid = np.stack([xx.ravel(), yy.ravel()], axis=1)

def score(x, mu, cov, log_prior):
    sign, logdet = np.linalg.slogdet(cov)
    assert sign > 0
    z = x - mu
    q = np.sum(z * np.linalg.solve(cov, z.T).T, axis=1)
    return log_prior - 0.5 * (logdet + q)

fig, axes = plt.subplots(1, 3, figsize=(12, 3.5), sharex=True, sharey=True)
for ax, cov_pair, label in zip(axes, model_covs, labels):
    values = np.column_stack([
        score(grid, means[k], cov_pair[k], np.log(prior[k]))
        for k in range(2)
    ])
    # 学習課題: 得点を最大化したクラスを各格子点へ割り当てる
    prediction = ___
    ax.contourf(xx, yy, prediction.reshape(xx.shape),
                levels=[-0.5, 0.5, 1.5], alpha=0.4)
    ax.scatter(means[:, 0], means[:, 1], marker="x")
    ax.set_title(label)
plt.tight_layout()
plt.show()
~~~

~~~python-solution
import numpy as np
import matplotlib.pyplot as plt
prior = np.array([0.5, 0.5])
means = np.array([[-1.0, 0.0], [1.0, 0.0]])
covs = np.array([[[1.0, 0.65], [0.65, 1.0]],
                 [[1.8, -0.45], [-0.45, 0.7]]])
assert prior.shape == (2,) and np.all(prior > 0)
assert abs(prior.sum() - 1) < 1e-12
assert np.all(np.linalg.eigvalsh(covs) > 0)
shared = (covs[0] + covs[1]) / 2
model_covs = [np.array([np.diag(np.diag(c)) for c in covs]),
              np.array([shared, shared]), covs]
labels = ["Gaussian Naive Bayes", "LDA", "QDA"]
xx, yy = np.meshgrid(np.linspace(-4, 4, 150), np.linspace(-3, 3, 120))
grid = np.stack([xx.ravel(), yy.ravel()], axis=1)
def score(x, mu, cov, log_prior):
    sign, logdet = np.linalg.slogdet(cov)
    assert sign > 0
    z = x - mu
    q = np.sum(z * np.linalg.solve(cov, z.T).T, axis=1)
    return log_prior - 0.5 * (logdet + q)
fig, axes = plt.subplots(1, 3, figsize=(12, 3.5), sharex=True, sharey=True)
for ax, cov_pair, label in zip(axes, model_covs, labels):
    values = np.column_stack([
        score(grid, means[k], cov_pair[k], np.log(prior[k]))
        for k in range(2)
    ])
    prediction = np.argmax(values, axis=1)
    ax.contourf(xx, yy, prediction.reshape(xx.shape),
                levels=[-0.5, 0.5, 1.5], alpha=0.4)
    ax.scatter(means[:, 0], means[:, 1], marker="x")
    ax.set_title(label)
plt.tight_layout()
plt.show()
~~~

~~~python-test
assert len(model_covs) == 3
assert all(np.all(np.linalg.eigvalsh(c) > 0)
           for pair in model_covs for c in pair)
for pair in model_covs:
    s = np.column_stack([score(grid, means[k], pair[k], np.log(prior[k]))
                         for k in range(2)])
    assert s.shape == (len(grid), 2) and np.all(np.isfinite(s))
    assert np.all((np.argmax(s, axis=1) == 0) |
                  (np.argmax(s, axis=1) == 1))
assert np.allclose(model_covs[1][0], model_covs[1][1])
assert np.allclose(model_covs[0][0], np.diag(np.diag(covs[0])))
~~~

試しに $\pi=(0.2,0.8)$、二つの平均を近付けた設定、共分散の非対角要素を0にした設定を比較せよ。任意の編集では各 $\Sigma_k$ が正定値である必要があり、負の固有値を生む設定は模型外である。図のクラス色はモデルの真偽や標本外誤差を表さない。

## 演習

### ML1-07-A01 混合密度の正規化
- Level: A
- 目安時間: 10分

第2節の $\pi_0=2/3,\pi_1=1/3$、$f_0(x)=1$、$f_1(x)=2x$（ともに $0\le x\le1$ 以外0）について、$m(x)$ を積分して1となることと、$x=3/4$ における $\eta_1(x)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$m(x)=(2+2x)/3$（$0\le x\le1$）なので $\int_0^1(2+2x)/3\,dx=(2+1)/3=1$。$x=3/4$ で $w_1=(1/3)\cdot(3/2)=1/2$、$w_0=2/3$。従って $\eta_1=(1/2)/(1/2+2/3)=(1/2)/(7/6)=3/7$。事後確率は密度単独ではなく事前確率を掛けた重みから作る。
<!-- solution-end -->

### ML1-07-A02 Bernoulli Naive Bayesの事後確率
- Level: A
- 目安時間: 10分

第3節の模型で $x=(1,0)$ を観測したときの両クラスの事後確率と分類結果を求め、積に使った4因子を列挙せよ。

<!-- solution-start -->
#### 詳細解答

クラス0は事前確率 $1/2$、第一特徴の成功確率 $0.2$、第二特徴の失敗確率 $1-0.6=0.4$ の積で $w_0=0.04$。クラス1は $1/2\cdot0.8\cdot(1-0.3)=0.28$。和 $0.32$ で割ると $\eta_0=1/8,\eta_1=7/8$。0–1損失の[分類則](#thm-ml1-07-posterior)から1を選ぶ。
<!-- solution-end -->

### ML1-07-A03 正規密度と共分散の確認
- Level: A
- 目安時間: 10分

$\mu=(0,0)^{\mathsf T}$、$\Sigma=\operatorname{diag}(1,9)$ とする。正定値性、行列式、逆行列を求め、$x=(1,3)^{\mathsf T}$ での正規密度を計算せよ。

<!-- solution-start -->
#### 詳細解答

任意の $(u,v)\ne0$ に対し $u^2+9v^2>0$ だから正定値。$\det\Sigma=9,\ \Sigma^{-1}=\operatorname{diag}(1,1/9)$ である。指数部の二次形式は $1^2+3^2/9=2$、規格化係数は $1/((2\pi)\cdot3)=1/(6\pi)$。従って $\phi_2((1,3);0,\Sigma)=e^{-1}/(6\pi)$。
<!-- solution-end -->

### ML1-07-A04 事前確率によるLDAの閾値
- Level: A
- 目安時間: 10分

一次元で $\mu_0=0,\mu_1=2$、両クラスの分散は1、$\pi_0=1/5,\pi_1=4/5$ とする。クラス1を選ぶ $x$ の範囲を求めよ。

<!-- solution-start -->
#### 詳細解答

[線形判別の式](#thm-ml1-07-lda-affine)で左辺は $2x$、右辺は $2-\log4$。従って $2x\ge2-\log4$、すなわち $x\ge1-\frac12\log4$。等号は同点。$\pi_1$ が大きいので等事前確率の閾値1より左へ動く。
<!-- solution-end -->

### ML1-07-A05 二次判別の二つの尾
- Level: A
- 目安時間: 12分

$\mu_0=\mu_1=0$、$\sigma_0^2=1,\sigma_1^2=4$、事前確率は各 $1/2$ とする。QDAでクラス1を選ぶ範囲を求めよ。

<!-- solution-start -->
#### 詳細解答

[正規判別得点](#thm-ml1-07-gaussian-score)で $\delta_1-\delta_0=-\frac12\log4-\frac12(x^2/4-x^2)=-\log2+3x^2/8$。これが非負になる条件は $x^2\ge8\log2/3$。従って $x\le-\sqrt{8\log2/3}$ または $x\ge\sqrt{8\log2/3}$（等号は同点）である。
<!-- solution-end -->

### ML1-07-B01 Naive Bayesが見落とす依存
- Level: B
- 目安時間: 18分

二クラスの事前確率は等しい。$Y=0$ では $(0,0),(1,1)$ に各 $1/2$、$Y=1$ では $(0,1),(1,0)$ に各 $1/2$ の条件付き確率を与える。各座標だけを学習するNaive Bayesと、真の同時分布による分類を比べ、失敗する仮定を説明せよ。

<!-- solution-start -->
#### 詳細解答

どのクラスでも $P(X_1=1\mid Y=k)=P(X_2=1\mid Y=k)=1/2$ である。積を取るNaive Bayesは全4点で $f_0=f_1=(1/2)^2=1/4$、事前確率を掛けた重みは各 $1/8$。事後確率は $(1/2,1/2)$ で判別できない。一方、真の模型では $(0,0),(1,1)$ はクラス0の条件付き確率が $1/2$、クラス1では0、残り二点は逆である。よって観測点での事後確率は0か1となり誤分類確率は0。クラス内で $X_1,X_2$ が独立なら $P((0,0)\mid Y=0)=(1/2)(1/2)=1/4$ のはずだが、実際は $1/2$。独立性が成立しないため周辺分布の積が同時分布を復元しない。
<!-- solution-end -->

### ML1-07-B02 二次元LDAの境界
- Level: B
- 目安時間: 18分

$\mu_0=(0,0)^{\mathsf T}$、$\mu_1=(2,2)^{\mathsf T}$、共有共分散 $\Sigma=\operatorname{diag}(1,4)$、両クラス同事前確率とする。クラス1を選ぶ不等式を求め、$(1,0)$ と $(1,2)$ を分類せよ。

<!-- solution-start -->
#### 詳細解答

$\Sigma$ は正定値で $\Sigma^{-1}=\operatorname{diag}(1,1/4)$。従って $\Sigma^{-1}(\mu_1-\mu_0)=(2,1/2)^{\mathsf T}$、$\mu_1^{\mathsf T}\Sigma^{-1}\mu_1=4+1=5$、$\mu_0$ の二次形式は0。事前確率比の対数は0。[LDA境界の式](#thm-ml1-07-lda-affine)は $2x_1+\frac12x_2\ge5/2$ となる。$(1,0)$ の左辺は2なのでクラス0、$(1,2)$ は3なのでクラス1と判定する。
<!-- solution-end -->

### ML1-07-B03 不均等な事前確率のQDA
- Level: B
- 目安時間: 18分

一次元で $\mu_0=\mu_1=0$、$\sigma_0^2=1,\sigma_1^2=4$、$\pi_0=4/5,\pi_1=1/5$ とする。QDAのクラス1を選ぶ領域を求め、事前確率が等しい場合と比較せよ。

<!-- solution-start -->
#### 詳細解答

[QDAの得点差](#thm-ml1-07-qda-quadratic)に $i=1,j=0$ を代入する。二次係数は $-\frac12(1/4-1)=3/8$、共分散行列式比の項は $-\frac12\log4=-\log2$、事前確率比は $\log(1/4)=-\log4$。従って $\delta_1-\delta_0=3x^2/8-\log8$。クラス1の領域は $|x|\ge\sqrt{8\log8/3}$（等号は同点）。$\log8>\log2$ だから同事前確率の場合より外側へ広がる必要がある。
<!-- solution-end -->

### ML1-07-B04 共分散が特異になるとき
- Level: B
- 目安時間: 20分

二次元のあるクラスの訓練点が $(0,0),(1,1)$ だけである。$1/n_k$ 型の共分散 $S_k$ を求め、なぜQDAの対数得点に直接代入できないか示せ。$S_k+\tau I_2$（$\tau>0$）ならどうか。

<!-- solution-start -->
#### 詳細解答

$n_k=2$、平均は $(1/2,1/2)$、中心化ベクトルは $(-1/2,-1/2)$ と $(1/2,1/2)$。外積はどちらも全成分 $1/4$ の行列だから

$$
S_k=\frac12\left[
\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}
+\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}
\right]
=\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}.
$$

行列式は $(1/4)^2-(1/4)^2=0$ で逆行列がなく、$\log\det S_k$ も定義できない。正則化した行列は $\begin{pmatrix}1/4+\tau&1/4\\1/4&1/4+\tau\end{pmatrix}$ で、行列式は $\tau/2+\tau^2>0$。任意の非零 $v$ に対し $v^{\mathsf T}(S_k+\tau I)v=v^{\mathsf T}S_kv+\tau\|v\|^2>0$ なので正定値であり、正規密度の式に使用できる。
<!-- solution-end -->

### ML1-07-C01 生成模型の比較と尾部の逆転
- Level: C
- 目安時間: 30分

二クラスで $\pi_0=2/3,\pi_1=1/3$、$\mu_0=(-1,0)^{\mathsf T}$、$\mu_1=(1,0)^{\mathsf T}$ とする。

1. 共有共分散 $\Sigma=I_2$ のLDAでクラス1を選ぶ領域を導出せよ。
2. QDAで $\Sigma_0=I_2,\Sigma_1=\operatorname{diag}(4,1)$ とした場合、得点差 $\delta_1-\delta_0$ を $x_1$ の二次式に展開せよ。
3. $x=(0,0),(1,0),(-5,0)$ の分類を両模型で比較せよ。最後の点の判定差の原因を説明せよ。
4. 2のQDA設定はGaussian Naive Bayesとしても表現できるか、独立仮定を確かめよ。

<!-- solution-start -->
#### 詳細解答

（1）共有 $\Sigma=I_2$ なので[線形判別](#thm-ml1-07-lda-affine)の左辺は $(\mu_1-\mu_0)^{\mathsf T}x=2x_1$。二つの平均のノルム二乗はともに1で差0、$\log(\pi_1/\pi_0)=\log(1/2)=-\log2$。従って $2x_1\ge\log2$、つまり $x_1\ge(\log2)/2$ がクラス1の領域である。

（2）[正規判別得点](#thm-ml1-07-gaussian-score)で $\det\Sigma_1=4$、$\det\Sigma_0=1$。$x=(t,u)$ と書くと二次形式はクラス1で $(t-1)^2/4+u^2$、クラス0で $(t+1)^2+u^2$ となる。従って

$$
\begin{aligned}
\delta_1-\delta_0
&=-\log2-\log2-\frac12
\left\{\frac{(t-1)^2}{4}-(t+1)^2\right\}\\
&=-\log4-\frac12
\left\{\frac{t^2-2t+1-4t^2-8t-4}{4}\right\}\\
&=-\log4+\frac38t^2+\frac54t+\frac38.
\end{aligned}
$$

（3）LDAは $t=0,-5$ でクラス0、$t=1$ でクラス1。QDAの得点差は $t=0$ で $3/8-\log4<0$、$t=1$ で $2-\log4>0$、$t=-5$ で $9.375-6.25+0.375-\log4=3.5-\log4>0$。従って順に0、1、1を選ぶ。QDAではクラス1の第一座標の分散が4と大きく、平均よりずっと左の尾でも減衰が遅いため優勢になる。共有共分散を課すLDAにはその二次項がない。

（4）両 $\Sigma_k$ は対角行列で、正規分布の密度は第一座標と第二座標の一変量正規密度の積に分解する。従ってクラスで条件付けた二座標は独立であり、このQDAはGaussian Naive Bayesとしても表せる。ただし一般の非対角共分散のQDAにはこの結論を流用できない。
<!-- solution-end -->

## 9. この章の結論と次の問い

生成的分類は $P(Y=k)$ と $P(X\mid Y=k)$ をモデル化し、事後確率の比較から決定を作る。Naive Bayesはクラス条件付き独立で高次元の密度を積にし、LDAは共分散の共有で二次項を消して線形境界にする。QDAは共分散の違いを許し、二次境界まで表現する。どの仮定も予測性能の保証ではなく、検証用データで比較する必要がある。

次のML1-08では、クラス条件付き密度を指定せずに $P(Y\mid X=x)$ を直接パラメータ化するlogistic・softmax回帰へ進む。
