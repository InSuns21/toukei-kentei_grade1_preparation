# ML2-07 連続潜在因子・因子分析・PPCA

<!-- definition-example-audit: strict -->

[ML2-05の混合模型](../ML2-05/index.md#def-ml2-05-finite-mixture)では、見えないカテゴリ $Z$ を足し合わせて観測分布を作った。カテゴリの代わりに連続した少数の座標を使えば、多数の観測変数が**少数の共通原因により連動する**状況を表せる。例えば二つのテストの得点は、観測ごとの誤差が独立でも、共通する潜在能力のため正に相関しうる。

[ML1-19の主成分分析（PCA）](../ML1-19/index.md#def-ml1-19-pca-loading)は、与えられたデータの変動の大きい方向と低ランク再構成を求めた。一方、それだけでは「観測の揺らぎを生成する確率分布」や「得点を見た後に潜在因子をどれだけ確信できるか」は決まらない。本講ではPCAと接続できる確率模型を構成し、似ている部分と異なる部分を数式で区別する。

## 1. 少数の因子が観測を動かす

観測値 $X$ は $p$ 次元、見えない因子 $Z$ は $q$ 次元で、$1\le q\le p$ とする。観測 $j$ と因子 $a$ の結び付く強さを行列 $W$ の成分 $W_{ja}$ として持つ。観測固有の誤差 $\varepsilon$ がそこへ加わる。$W$ の列を**負荷ベクトル**、その成分を**因子負荷量**という。列の数 $q$ が潜在次元である。

二因子なら、観測の第 $j$ 成分は $X_j=\mu_j+W_{j1}Z_1+W_{j2}Z_2+\varepsilon_j$ と書ける。各因子が標準正規分布に従い、観測誤差もGaussianで独立という仮定を足すと、積分や条件付き推論を行列計算に還元できる。

<a id="def-ml2-07-factor-model"></a>

<!-- formal-statement-start -->
> **定義（連続潜在Gaussian因子模型）**
> 整数 $p\ge1$、$1\le q\le p$、$\mu\in\mathbb R^p$、$W\in\mathbb R^{p\times q}$、実対称正定値 $\Psi\in\mathbb R^{p\times p}$ を固定する。独立な確率ベクトル

$$
Z\sim N_q(0,I_q),\qquad \varepsilon\sim N_p(0,\Psi)
$$

> を用い、観測ベクトルを $X=\mu+WZ+\varepsilon$ で生成する模型を連続潜在Gaussian因子模型という。$Z=z$ を固定した条件付き分布は $X\mid Z=z\sim N_p(\mu+Wz,\Psi)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-07-factor-model -->
**定義の確認**。$p=2,q=1$、$\mu=0$、$W=(2,1)^{\mathsf T}$、$\Psi=\operatorname{diag}(1,4)$ とする。$W$ は $2\times1$、$Z$ は1次元なので $WZ$ は2次元であり、$X_1=2Z+\varepsilon_1$、$X_2=Z+\varepsilon_2$ となる。$\Psi$ は対称で、任意の非零 $v=(a,b)^{\mathsf T}$ に対し

$$
v^{\mathsf T}\Psi v=a^2+4b^2>0
$$

だから[非退化Gaussian密度の正定値条件](../ML1-07/index.md#def-ml1-07-gaussian)を満たす。$Z$ と $\varepsilon$ は独立と設定してあるので、条件付きの平均は $(2z,z)^{\mathsf T}$、共分散は $\Psi$ である。この段階で $X_1$ と $X_2$ が無条件にも独立とは言えない。
<!-- definition-example-end -->

観測誤差の分散を観測座標ごとに異なる値にするか、すべて同じ値にするかで二つの模型を区別する。$\operatorname{diag}(\psi_1,\ldots,\psi_p)$ は対角成分がそれぞれ $\psi_j$ の行列、$I_p$ は単位行列である。

<a id="def-ml2-07-fa-ppca"></a>

<!-- formal-statement-start -->
> **定義（因子分析と確率的主成分分析）**
> [連続潜在Gaussian因子模型](#def-ml2-07-factor-model)で $\Psi=\operatorname{diag}(\psi_1,\ldots,\psi_p)$、すべて $\psi_j>0$ とするものを、ここでは**Gaussian因子分析**（FA）と呼ぶ。特に $\Psi=\sigma^2I_p$、$\sigma^2>0$ に制限した模型を**確率的主成分分析**（PPCA）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-07-fa-ppca -->
**定義の確認**。前例の $\Psi=\operatorname{diag}(1,4)$ は、二つの対角要素が正なのでFAの仮定をすべて満たす。しかしPPCAの $\sigma^2I_2$ と等しくするには同じ $\sigma^2$ が同時に1と4でなければならず、不可能である。$\Psi=I_2$ に置き換えれば、正値 $\sigma^2=1$ を持つPPCAになり、FAにも含まれる。この差は後で共分散の固有値に現れる。
<!-- definition-example-end -->

## 2. 見えない因子を積分すると共分散に何が残るか

$Z$ が動くことで生まれるばらつきと、$\varepsilon$ 自身のばらつきを分離しよう。[ML2-05での混合平均・共分散](../ML2-05/index.md#prop-ml2-05-moments)に対応する連続版である。ただしここではGaussianの線形変換まで利用でき、周辺分布全体が求まる。

<a id="thm-ml2-07-marginal"></a>

<!-- formal-statement-start -->
> **定理（因子模型の周辺Gaussian分布と共分散）**
> [連続潜在Gaussian因子模型](#def-ml2-07-factor-model)の $Z$ を周辺化した観測分布は

$$
X\sim N_p(\mu,C),\qquad C=WW^{\mathsf T}+\Psi
$$

> である。$C$ は正定値で、$WW^{\mathsf T}$ は正半定値かつ階数が高々 $q$ である。特に非対角成分は

$$
C_{jk}=\sum_{a=1}^q W_{ja}W_{ka}+\Psi_{jk}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

平均を引いて二乗を展開すると、独立性によって交差項が消える。さらに独立Gaussianベクトルの線形結合はGaussianであり、その平均と共分散で分布が確定する。

<!-- proof-start -->
### 証明

$E[Z]=0$、$E[\varepsilon]=0$ より $E[X]=\mu$。中心化した列ベクトルとその転置行ベクトルの行列積を展開すると

$$
\begin{aligned}
(X-\mu)(X-\mu)^{\mathsf T}
={}&WZZ^{\mathsf T}W^{\mathsf T}
+WZ\varepsilon^{\mathsf T}\\
&+\varepsilon Z^{\mathsf T}W^{\mathsf T}
+\varepsilon\varepsilon^{\mathsf T}.
\end{aligned}
$$

独立性と平均0から $E[Z\varepsilon^{\mathsf T}]=E[Z]E[\varepsilon]^{\mathsf T}=0$。また $E[ZZ^{\mathsf T}]=I_q$、$E[\varepsilon\varepsilon^{\mathsf T}]=\Psi$。ゆえに

$$
\operatorname{Cov}(X)=WI_qW^{\mathsf T}+\Psi=WW^{\mathsf T}+\Psi.
$$

任意の非零 $v\in\mathbb R^p$ に対し

$$
v^{\mathsf T}Cv=\|W^{\mathsf T}v\|_2^2+v^{\mathsf T}\Psi v>0
$$

なので $C$ は正定値である。$WW^{\mathsf T}$ の像は $W$ の列空間に含まれるので階数は高々 $q$、二次形式も非負となる。

Gaussian性を確かめるには、任意の $t\in\mathbb R^p$ に対し $t^{\mathsf T}(X-\mu)=(W^{\mathsf T}t)^{\mathsf T}Z+t^{\mathsf T}\varepsilon$ とする。右辺は独立な一次元Gaussianの和であり、平均0、分散 $t^{\mathsf T}Ct$ のGaussianである。したがって多変量Gaussianの線形結合による特徴付けから $X\sim N_p(\mu,C)$。成分式は行列積 $(WW^{\mathsf T})_{jk}=\sum_a W_{ja}W_{ka}$ を展開すれば得られる。$\square$
<!-- proof-end -->

前節のFA例では

$$
WW^{\mathsf T}=\begin{pmatrix}4&2\\2&1\end{pmatrix},\qquad
C=\begin{pmatrix}5&2\\2&5\end{pmatrix}.
$$

非対角の2は共通因子に由来し、$\det C=25-4=21>0$、固有値は7と3である。各誤差は独立でも観測成分には共分散2が残る。逆に**観測の共分散だけを見て、どの潜在座標が原因かまで一意に決まるわけではない**。

## 3. 観測から潜在因子を逆向きに推定する

新たな観測値 $x$ を得たとき、$Z$ のもっともらしい値を求めたい。[ML2-02のGaussian事後密度](../ML2-02/index.md#def-ml2-02-posterior)と同じく、事前密度と尤度の積を正規化する。ここで固定されるのは模型の $\mu,W,\Psi$ と観測値 $x$ であり、変数は $z\in\mathbb R^q$ である。

事後平均 $m(x)=E[Z\mid X=x]$ をもとに $\widehat x=\mu+Wm(x)$ と置く。これは観測値から推定した**雑音を除いた信号の条件付き平均**である。$x$ 自身を完全に再現するとは限らず、標本全体のPCA射影とも一般には違う。

<a id="def-ml2-07-posterior-reconstruction"></a>

<!-- formal-statement-start -->
> **定義（潜在因子の条件付き事後分布と再構成）**
> [連続潜在Gaussian因子模型](#def-ml2-07-factor-model)で $C$ が正定値であるとし、$x\in\mathbb R^p$ を観測する。事前密度 $\phi_q(z;0,I_q)$、条件付き尤度 $\phi_p(x;\mu+Wz,\Psi)$ を用い、事後密度を

$$
p(z\mid x)=\frac{\phi_p(x;\mu+Wz,\Psi)\phi_q(z;0,I_q)}{\phi_p(x;\mu,C)}
$$

> と定める。事後平均 $m(x)=\int z p(z\mid x)\,dz$、再構成 $\widehat x=\mu+Wm(x)$ を定める。分母は正の周辺密度であり、条件付き密度の積分は1である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-07-posterior-reconstruction -->
**定義の確認**。$p=2,q=1$、$\mu=0$、$W=(2,1)^{\mathsf T}$、$\Psi=I_2$、$x=(2,1)^{\mathsf T}$ とする。正のGaussian密度が分子・分母に現れ、$C=\left(\begin{smallmatrix}5&2\\2&2\end{smallmatrix}\right)$ は正定値（行列式6）である。後の[平方完成定理](#thm-ml2-07-posterior)で $m(x)=5/6$ と確認するので、再構成は $(5/3,5/6)^{\mathsf T}$。観測点 $(2,1)^{\mathsf T}$ とのずれは雑音を考慮した縮小である。
<!-- definition-example-end -->

<a id="thm-ml2-07-posterior"></a>

<!-- formal-statement-start -->
> **定理（潜在Gaussian事後分布の平方完成）**
> [連続潜在Gaussian因子模型](#def-ml2-07-factor-model)において $\Psi$ を実対称正定値とする。観測値 $x$ に対して

$$
M=I_q+W^{\mathsf T}\Psi^{-1}W,\qquad
V=M^{-1},\qquad m=VW^{\mathsf T}\Psi^{-1}(x-\mu)
$$

> と置くと、$M,V$ は実対称正定値であり、$Z\mid X=x\sim N_q(m,V)$ が成り立つ。$V$ は $x$ の値に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussianの事前密度と尤度の負の対数を足し、潜在座標 $z$ の二次項・一次項にまとめる。正定値行列で平方完成すれば事後平均と共分散が読み取れる。

<!-- proof-start -->
### 証明

$y=x-\mu\in\mathbb R^p$ と置く。事後密度の分子で $z$ に依存する指数部分は

$$
-\frac12\left[z^{\mathsf T}z+(y-Wz)^{\mathsf T}\Psi^{-1}(y-Wz)\right].
$$

積を順に展開すると、$z^{\mathsf T}W^{\mathsf T}\Psi^{-1}y$ と $y^{\mathsf T}\Psi^{-1}Wz$ は同じ実数なので

$$
\begin{aligned}
z^{\mathsf T}z+(y-Wz)^{\mathsf T}\Psi^{-1}(y-Wz)
={}&z^{\mathsf T}(I_q+W^{\mathsf T}\Psi^{-1}W)z\\
&-2z^{\mathsf T}W^{\mathsf T}\Psi^{-1}y+y^{\mathsf T}\Psi^{-1}y.
\end{aligned}
$$

任意の非零 $u\in\mathbb R^q$ について

$$
u^{\mathsf T}Mu=\|u\|_2^2+(Wu)^{\mathsf T}\Psi^{-1}(Wu)>0
$$

となるので $M$ は可逆・正定値であり、$V=M^{-1}$ も正定値である。$Mm=W^{\mathsf T}\Psi^{-1}y$ を用いれば

$$
\begin{aligned}
z^{\mathsf T}Mz-2z^{\mathsf T}W^{\mathsf T}\Psi^{-1}y
={}&(z-m)^{\mathsf T}M(z-m)-m^{\mathsf T}Mm.
\end{aligned}
$$

$z$ に依存しない部分を周辺密度による正規化に吸収すると、事後密度は $N_q(m,M^{-1})$ に比例する。正定値だから[Gaussian密度の正規化](../ML1-07/index.md#lem-ml1-07-gaussian-normalization)によって積分を1にする定数が存在し、事後分布が確定する。$M$ は $W,\Psi$ のみから構成されるため、$V$ は観測値に依存しない。$\square$
<!-- proof-end -->

**数値例**。先ほどの $\Psi=I_2$ の模型では

$$
W^{\mathsf T}W=2^2+1^2=5,\quad M=1+5=6,\quad
m=\frac16(2\cdot2+1\cdot1)=\frac56,\quad V=\frac16.
$$

つまり $Z\mid X=(2,1)^{\mathsf T}\sim N(5/6,1/6)$ である。信号の最尤な単一点を残すだけでは、分散 $1/6$ という事後の不確実性が消えてしまう。推定値の再構成は

$$
\widehat x=Wm=\begin{pmatrix}2\\1\end{pmatrix}\frac56
=\begin{pmatrix}5/3\\5/6\end{pmatrix}.
$$

## 4. 観測だけでは潜在軸を特定できない

[混合模型のラベル交換](../ML2-05/index.md#thm-ml2-05-label-switch)では、見えないラベルの番号を入れ替えても観測分布が変わらなかった。連続潜在模型ではより広く、標準Gaussianの潜在座標を直交回転しても同じ現象が起こる。

<a id="def-ml2-07-rotation-nonidentifiability"></a>

<!-- formal-statement-start -->
> **定義（観測分布に関する潜在回転不識別）**
> [因子模型](#def-ml2-07-factor-model)で $q\ge1$ とし、次の条件を満たす実直交行列 $R\in\mathbb R^{q\times q}$ を考える。

$$
R^{\mathsf T}R=RR^{\mathsf T}=I_q.
$$

> $W$ と $WR$ が異なるにもかかわらず同一の観測分布を生成する場合、潜在因子の向きが観測分布から識別できないという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-07-rotation-nonidentifiability -->
**定義の確認**。$q=p=2$、$W=\operatorname{diag}(2,1)$、$R=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$ とする。$R^{\mathsf T}R=I_2$ を行列積で確かめられ、$WR=\left(\begin{smallmatrix}0&-2\\1&0\end{smallmatrix}\right)\ne W$。しかし

$$
WW^{\mathsf T}=\begin{pmatrix}4&0\\0&1\end{pmatrix}
=(WR)(WR)^{\mathsf T}
$$

であり、同じ $\mu,\Psi$ を使えば観測共分散が等しい。この例は「行列成分が異なる」条件と「観測分布が等しい」条件をともに確認している。$q=1$ の直交変換は符号反転 $R=-1$ も含む。
<!-- definition-example-end -->

<a id="thm-ml2-07-rotation"></a>

<!-- formal-statement-start -->
> **定理（直交回転による観測分布の不変性）**
> [連続潜在Gaussian因子模型](#def-ml2-07-factor-model)の $W$ と任意の直交行列 $R\in O(q)$ に対し、$W'=WR$ とする。$W'$ の模型は元の $W$ の模型と同じ $N_p(\mu,WW^{\mathsf T}+\Psi)$ を観測分布に持つ。また潜在座標を $Z'=R^{\mathsf T}Z$ と変えれば $Z'\sim N_q(0,I_q)$、$W'Z'=WZ$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

回転後も標準Gaussianの共分散は単位行列であり、負荷行列の積 $WW^{\mathsf T}$ は直交行列の相殺で保存される。

<!-- proof-start -->
### 証明

$E[Z']=R^{\mathsf T}E[Z]=0$、$\operatorname{Cov}(Z')=R^{\mathsf T}I_qR=I_q$。Gaussianの線形変換なので $Z'$ は標準 $q$ 変量Gaussianであり、$Z$ に独立だった $\varepsilon$ とも独立である。さらに

$$
W'Z'=WRR^{\mathsf T}Z=WZ,
$$

$$
W'W'^{\mathsf T}=WRR^{\mathsf T}W^{\mathsf T}=WW^{\mathsf T}.
$$

よって[周辺分布定理](#thm-ml2-07-marginal)に $W'$ を適用しても平均・共分散が一致し、多変量Gaussian分布が等しい。$\square$
<!-- proof-end -->

不識別は「推定手法が悪い」からではなく、異なる潜在座標が数学的に同じ観測分布を作るから生じる。$q=2$ 以上では回転角が連続に変わる。$W$ の列空間など、回転しても変わらない量に解釈を寄せる必要がある。ただし別種の識別不能性が絶対にない、とは主張していない。

## 5. PPCAの雑音床と主成分方向

PPCAでは $C=WW^{\mathsf T}+\sigma^2I_p$ となる。雑音を表す $\sigma^2$ が全座標で共通だから、潜在因子の張らない方向の分散は同じ値となる。これを**雑音床**と呼ぶ。

<a id="prop-ml2-07-spectrum"></a>

<!-- formal-statement-start -->
> **命題（PPCA共分散の固有値構造）**
> $p\ge1$、$1\le q\le p$、$W\in\mathbb R^{p\times q}$、$\sigma^2>0$ とする。PPCAの観測共分散を

$$
C=WW^{\mathsf T}+\sigma^2I_p
$$

> と置く。この行列の固有値はすべて $\sigma^2$ 以上である。$\sigma^2$ より大きい固有値の数（重複込み）は $\operatorname{rank}W\le q$ であり、対応する固有空間を合わせたものは $\operatorname{im}W$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

$WW^{\mathsf T}$ は正半定値であり、その零固有空間は $W^{\mathsf T}v=0$ の全体。単位行列を足すと固有ベクトルは変わらず、固有値だけが $\sigma^2$ ずれる。

<!-- proof-start -->
### 証明

任意の $v$ について $v^{\mathsf T}WW^{\mathsf T}v=\|W^{\mathsf T}v\|_2^2\ge0$。実対称行列の[固有空間によるPCAの表現](../ML1-19/index.md#thm-ml1-19-pca-spectral)と同じ直交対角化を $WW^{\mathsf T}$ に行う。固有値を $d_j\ge0$ とすれば $C$ の固有値は $d_j+\sigma^2$。核は $\ker(WW^{\mathsf T})=\ker W^{\mathsf T}$ だから、正の固有空間の直和はその直交補空間 $\operatorname{im}W$ であり、次元は $\operatorname{rank}W$。$\square$
<!-- proof-end -->

例として $W=(2,1)^{\mathsf T}$、$\sigma^2=1$ なら $W$ と直交する方向では潜在分散0、$W$ 方向では分散 $\|W\|^2=5$ が加わる。ゆえに $C=\left(\begin{smallmatrix}5&2\\2&2\end{smallmatrix}\right)$ の固有値は6と1。FAの例の7と3とは異なる。$\sigma^2$ を小さくするだけで「必ずPCAと一致する」というわけではなく、どの値をデータから推定するかが重要となる。

### PPCAの最尤解を計算する

独立観測 $x_1,\ldots,x_n\in\mathbb R^p$ に対し、標本平均 $\bar x=n^{-1}\sum_i x_i$、分母 $n$ の標本共分散

$$
S=\frac1n\sum_{i=1}^n(x_i-\bar x)(x_i-\bar x)^{\mathsf T}
$$

を作る。これは[ML1-19の中心化行列と共分散](../ML1-19/index.md#def-ml1-19-centered-data)で、最尤法に合わせた $1/n$ の規約である。$S$ は正半定値で、固有値を $\lambda_1\ge\cdots\ge\lambda_p\ge0$、直交固有ベクトルを $u_1,\ldots,u_p$ とする。$1\le q<p$ とし、先頭 $q$ 本の固有ベクトル行列を $U_q=(u_1,\ldots,u_q)$ と書く。

<a id="thm-ml2-07-ppca-mle"></a>

<!-- formal-statement-start -->
> **定理（PPCA最尤共分散とPCA部分空間）**
> 上記の独立標本のPPCAを $q<p$、$\sigma^2>0$、$W\in\mathbb R^{p\times q}$、$\mu\in\mathbb R^p$ について最尤推定する。$S$ の固有値について

$$
s_*^2=\frac1{p-q}\sum_{j=q+1}^p\lambda_j>0,\qquad
\lambda_q>s_*^2
$$

> を仮定する。このとき $\widehat\mu=\bar x$、$\widehat\sigma^2=s_*^2$、任意の直交 $R\in O(q)$ に対して

$$
\widehat W=U_q\operatorname{diag}
\bigl(\sqrt{\lambda_1-s_*^2},\ldots,\sqrt{\lambda_q-s_*^2}\bigr)R
$$

> は全域最尤解を与える。対応する観測共分散は

$$
\widehat C=\sum_{j=1}^q\lambda_j u_ju_j^{\mathsf T}
+s_*^2\sum_{j=q+1}^pu_ju_j^{\mathsf T}.
$$

> 特に $\widehat W$ の列空間は、標本PCAの上位 $q$ 次元主部分空間に等しい（固有値が重複すると軸の選び方は非一意）。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussian対数尤度から、共分散 $C$ について $\log\det C+\operatorname{tr}(C^{-1}S)$ を最小化する。同じ固有値を持つ $C$ の中では大きい標本固有値を大きい模型固有値へ対応させると有利である。上位 $q$ 個の固有値を自由に合わせ、残りの固有値を一つの雑音床で平均する。

<!-- proof-start -->
### 証明

固定した正定値 $C$ に対する負の対数尤度の2倍は、定数 $np\log(2\pi)$ を除き

$$
n\log\det C+\sum_{i=1}^n(x_i-\mu)^{\mathsf T}C^{-1}(x_i-\mu).
$$

各 $x_i-\mu=(x_i-\bar x)+(\bar x-\mu)$ と分解して足すと交差項は $\sum_i(x_i-\bar x)=0$ より消え、二次項は

$$
n\operatorname{tr}(C^{-1}S)+n(\bar x-\mu)^{\mathsf T}C^{-1}(\bar x-\mu).
$$

$C^{-1}$ は正定値だから、$\mu=\bar x$ が唯一の最小点である。残る目的関数は $F(C)=\log\det C+\operatorname{tr}(C^{-1}S)$。

$C$ の固有値を $c_1\ge\cdots\ge c_p>0$、対応する単位直交固有ベクトルを $v_1,\ldots,v_p$ とし、$r_i=v_i^{\mathsf T}Sv_i$、$a_i=1/c_i$ と置く。$a_1\le\cdots\le a_p$ であり、$\sum_i r_i=\operatorname{tr}S$。ここで各 $k$ に対して

$$
\sum_{i=1}^k r_i\le\sum_{j=1}^k\lambda_j
$$

が成り立つ。実際、$v_i=\sum_j(u_j^{\mathsf T}v_i)u_j$ と展開して $b_j=\sum_{i=1}^k(u_j^{\mathsf T}v_i)^2$ とすれば、直交射影の性質から $0\le b_j\le1$、$\sum_jb_j=k$。よって $\sum_i r_i=\sum_j\lambda_jb_j$ は、大きい順の $\lambda_j$ に重みを1ずつ割り当てた $\sum_{j\le k}\lambda_j$ を超えない。

係数 $a_i$ を差分で表示すると

$$
\begin{aligned}
\operatorname{tr}(C^{-1}S)
&=\sum_{i=1}^pa_ir_i\\
&=a_p\operatorname{tr}S-\sum_{k=1}^{p-1}(a_{k+1}-a_k)\sum_{i=1}^kr_i\\
&\ge a_p\sum_j\lambda_j-\sum_{k=1}^{p-1}(a_{k+1}-a_k)\sum_{j=1}^k\lambda_j\\
&=\sum_{j=1}^p\frac{\lambda_j}{c_j}.
\end{aligned}
$$

等号は $v_j=u_j$ と選べば達成できる。従って固有値だけの目的関数 $\sum_j(\log c_j+\lambda_j/c_j)$ を最小化すればよい。

[PPCA共分散の固有値構造](#prop-ml2-07-spectrum)より、ある $\sigma^2>0$ に対して $c_j\ge\sigma^2$、$j>q$ では $c_j=\sigma^2$ である。各 $\lambda_j>0$ に対し $g_j(c)=\log c+\lambda_j/c$ は

$$
g'_j(c)=\frac{c-\lambda_j}{c^2}
$$

を持ち、全 $c>0$ 上で $c=\lambda_j$ を唯一の最小点とする。$\lambda_j=0$ の場合も $g_j(c)=\log c$ として以下の下界を考えられる。従って上位 $q$ 項には $\log\lambda_j+1$ が個別の下界となる（仮定から $\lambda_j\ge\lambda_q>0$）。残りの項の和は

$$
H(t)=(p-q)\log t+\frac{\sum_{j>q}\lambda_j}{t},\qquad t>0
$$

であり、$H'(t)=((p-q)t-\sum_{j>q}\lambda_j)/t^2$ から $t=s_*^2$ で大域最小となる。実際、$t\downarrow0$ では正の尾部和により $H\to+\infty$、$t\to\infty$ でも $H\to+\infty$。仮定 $\lambda_q>s_*^2$ により $c_j=\lambda_j$（$j\le q$）、$c_j=s_*^2$（$j>q$）は順序条件と $c_j\ge s_*^2$ を同時に満たす。したがって個別下界をすべて一度に達成し、全域最小である。

$\widehat C-s_*^2I_p=\sum_{j\le q}(\lambda_j-s_*^2)u_ju_j^{\mathsf T}$ は正半定値で階数 $q$。提示した $\widehat W$ は $\widehat W\widehat W^{\mathsf T}=\widehat C-s_*^2I_p$ を満たすため許されるPPCA母数である。各 $\lambda_j-s_*^2>0$ なので $\operatorname{im}\widehat W=\operatorname{span}\{u_1,\ldots,u_q\}$。$\square$
<!-- proof-end -->

**具体例**。$p=2,q=1$、$S=\operatorname{diag}(9,1)$ とする。$\lambda_1=9,\lambda_2=1$、$s_*^2=1>0$、$9>1$ なので定理の条件が成り立つ。$U_1=e_1$ を選ぶと $\widehat W=(\sqrt8,0)^{\mathsf T}$、$\widehat C=\operatorname{diag}(9,1)=S$。PCAの主軸は $e_1$ と一致するが、以下で再構成の係数は1ではなく $8/9$ になる。

**条件が破れるとき**。$S=\operatorname{diag}(1,1)$、$q=1$ なら $s_*^2=1$、$\lambda_q=1$ で厳密不等式が破れ、$W=0$ も最尤解になる。潜在軸を推定できない。さらに $S=\operatorname{diag}(9,0)$ なら $s_*^2=0$ で模型の $\sigma^2>0$ という条件から外れる。$C=\operatorname{diag}(9,t)$、$t\downarrow0$ とすると $F(C)=\log9+1+\log t\to-\infty$、尤度は上に非有界で、有限の最尤推定値が存在しない。数値計算の丸めで零分散を許してよいわけではない。

## 6. PCA射影とPPCA再構成の差

最尤解の**主部分空間は**PCAと一致するが、観測点をそこへ直交射影する処理と、因子の事後平均から信号を再構成する処理は別である。

<a id="prop-ml2-07-shrinkage"></a>

<!-- formal-statement-start -->
> **命題（PPCA事後平均再構成の縮小）**
> [PPCA最尤定理](#thm-ml2-07-ppca-mle)の $q<p$、$s_*^2>0$、$\lambda_q>s_*^2$ の仮定の下、$y=x-\bar x$ に対する事後平均再構成は

$$
\widehat x_{\mathrm{PPCA}}=\bar x+
\sum_{j=1}^q\left(1-\frac{s_*^2}{\lambda_j}\right)u_ju_j^{\mathsf T}y.
$$

> 一方、標本PCAの $q$ 次元直交射影再構成は $\widehat x_{\mathrm{PCA}}=\bar x+\sum_{j=1}^qu_ju_j^{\mathsf T}y$ である。$s_*^2>0$ かつ $y$ の主部分空間成分が非零なら、両者は一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

回転による事後座標の違いは再構成で打ち消される。最尤 $W$ の固有軸成分ごとに[事後公式](#thm-ml2-07-posterior)を入れると、信号の各成分に雑音分散由来の縮小率が掛かる。

<!-- proof-start -->
### 証明

$D=\operatorname{diag}(\sqrt{\lambda_1-s_*^2},\ldots,\sqrt{\lambda_q-s_*^2})$ とし、$\widehat W=U_qDR$。$\Psi=s_*^2I_p$ なので

$$
M=I_q+s_*^{-2}R^{\mathsf T}D^2R
=R^{\mathsf T}\operatorname{diag}(\lambda_j/s_*^2)R.
$$

$R^{-1}=R^{\mathsf T}$ より

$$
M^{-1}=R^{\mathsf T}\operatorname{diag}(s_*^2/\lambda_j)R.
$$

[事後平均定理](#thm-ml2-07-posterior)に入れると

$$
\begin{aligned}
\widehat Wm(x)
&=\widehat WM^{-1}\widehat W^{\mathsf T}s_*^{-2}y\\
&=U_qDR\,R^{\mathsf T}\operatorname{diag}(s_*^2/\lambda_j)RR^{\mathsf T}DU_q^{\mathsf T}s_*^{-2}y\\
&=U_q\operatorname{diag}((\lambda_j-s_*^2)/\lambda_j)U_q^{\mathsf T}y.
\end{aligned}
$$

各係数は $0<1-s_*^2/\lambda_j<1$。PCAの係数は1なので、主空間への射影成分が非零なら一致しない。$\square$
<!-- proof-end -->

$S=\operatorname{diag}(9,1)$、$x-\bar x=(3,2)^{\mathsf T}$ ならPCA再構成は $\bar x+(3,0)^{\mathsf T}$。PPCAは $\bar x+(8/3,0)^{\mathsf T}$。雑音分散が正のとき、潜在信号の事後平均は観測方向の得点をやや縮める。なおデータの標本主成分を推定する問題と、個々の潜在信号を事後推定する問題を混同しないことが重要である。

## 7. 計算ラボ：潜在次元・雑音・回転を動かす

[PPCAの共分散・事後推論ラボ](../../../../../../simulation/ml2-07.html)では、観測2次元の固定模型を用い、潜在次元 $q=1,2$、等方雑音分散、$q=2$ の潜在回転角、観測値を動かせる。変更後の $W$、$WW^{\mathsf T}$、$C$、事後平均・事後共分散、再構成を毎回計算する。共分散楕円は $C$ の固有値・固有ベクトルから描き直し、点群を貼り替えるだけの描画ではない。

特に $q=2$ で回転角を変えると、$W$ の成分と潜在事後平均の座標は変わるが、$C$ と $\widehat x$ は数値誤差を除き不変となる。$q=1$ では連続回転がなく、符号反転だけが直交変換である。$q=2$ で $W$ が正方の場合も、雑音が正なので再構成は一般に観測値と一致しない。

数値一致は[共分散定理](#thm-ml2-07-marginal)と[回転定理](#thm-ml2-07-rotation)の例示に過ぎない。最尤推定を実行するラボではなく、固定模型の生成と推論を可視化するラボである。

## 8. 演習

### ML2-07-A01 二次元因子の共分散を一から求める

- Level: A

$Z\sim N(0,1)$、$\varepsilon\sim N_2(0,\operatorname{diag}(2,3))$ が独立で、$X=(1,-1)^{\mathsf T}+(1,2)^{\mathsf T}Z+\varepsilon$ とする。$E[X]$、$\operatorname{Cov}(X)$、$\operatorname{Cov}(X_1,X_2)$ を求め、正定値性を確認せよ。

<!-- solution-start -->
#### 詳細解答

$E[Z]=E[\varepsilon]=0$ だから平均は $(1,-1)^{\mathsf T}$。$W=(1,2)^{\mathsf T}$ を[周辺共分散定理](#thm-ml2-07-marginal)へ入れると

$$
WW^{\mathsf T}=\begin{pmatrix}1&2\\2&4\end{pmatrix},\qquad
C=\begin{pmatrix}3&2\\2&7\end{pmatrix}.
$$

従って共分散は $C_{12}=2$。$3>0$ かつ $\det C=21-4=17>0$ なので二次の実対称行列の正定値条件を満たす。独立なのは $Z$ と $\varepsilon$ であり、観測の二成分ではない。
<!-- solution-end -->

### ML2-07-A02 FAかPPCAかを判別する

- Level: A

$p=3,q=1$ とし、雑音行列が (i) $\operatorname{diag}(1,1,1)$、(ii) $\operatorname{diag}(1,2,1)$、(iii) $\left(\begin{smallmatrix}1&1/2&0\\1/2&1&0\\0&0&2\end{smallmatrix}\right)$ である。各行列がFAまたはPPCAの仮定を満たすか、理由を示せ。

<!-- solution-start -->
#### 詳細解答

[模型の定義](#def-ml2-07-fa-ppca)を使う。(i)は全対角が正で等しいのでFAかつPPCA（$\sigma^2=1$）。(ii)は対角成分がすべて正だからFAだが、同じ正数の単位行列倍ではないのでPPCAではない。(iii) は非対角成分 $1/2$ が非零なのでFAの「対角雑音」に違反し、PPCAにも違反する。なお左上 $2\times2$ ブロックの固有値は $3/2,1/2$、残りは2だから正定値ではある。正定値だけでは対角という条件を代替できない。
<!-- solution-end -->

### ML2-07-A03 潜在事後平均と再構成

- Level: A

$p=q=1$、$\mu=0,W=(2),\Psi=(1)$、観測 $x=3$ に対する事後分散、事後平均、再構成を求めよ。

<!-- solution-start -->
#### 詳細解答

$\Psi^{-1}=1$、$W^{\mathsf T}\Psi^{-1}W=4$ より[事後公式](#thm-ml2-07-posterior)の $M=1+4=5$、$V=1/5$。右辺の一次項は $W^{\mathsf T}\Psi^{-1}(x-\mu)=2\cdot3=6$ だから $m=6/5$。再構成は $\mu+Wm=2\cdot(6/5)=12/5$。$x=3$ を完全再現せず、事後分散 $1/5$ も零ではない。
<!-- solution-end -->

### ML2-07-A04 固有値と雑音床

- Level: A

$p=3,q=1$、$W=(2,0,0)^{\mathsf T}$、$\sigma^2=2$ のPPCAで $C$ の固有値と雑音床を求めよ。$C$ の各固有値が $2$ 以上になる理由も示せ。

<!-- solution-start -->
#### 詳細解答

$WW^{\mathsf T}=\operatorname{diag}(4,0,0)$、$\sigma^2I_3=\operatorname{diag}(2,2,2)$ なので $C=\operatorname{diag}(6,2,2)$。固有値は $6,2,2$、雑音床は $2$。任意の固有ベクトル $v$ について[固有値構造命題](#prop-ml2-07-spectrum)により $v^{\mathsf T}Cv=\|W^{\mathsf T}v\|^2+2\|v\|^2\ge2\|v\|^2$。従って単位固有ベクトルに対する固有値は2以上になる。
<!-- solution-end -->

### ML2-07-B01 直交回転と事後座標の変換

- Level: B

$p=q=2$、$W=\operatorname{diag}(2,1)$、$\Psi=I_2$、$R=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$、$x=(2,1)^{\mathsf T}$、$\mu=0$ とする。回転前後の観測共分散を求め、事後平均が $m'=R^{\mathsf T}m$ に変換されても再構成が不変となることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$WW^{\mathsf T}=\operatorname{diag}(4,1)$ である。[因子模型の周辺Gaussian分布と共分散](#thm-ml2-07-marginal)により $C=\operatorname{diag}(5,2)$。[事後公式](#thm-ml2-07-posterior)に $M=I+W^{\mathsf T}W=\operatorname{diag}(5,2)$ を代入すると

$$
m=M^{-1}W^{\mathsf T}x
=\begin{pmatrix}1/5&0\\0&1/2\end{pmatrix}\begin{pmatrix}4\\1\end{pmatrix}
=\begin{pmatrix}4/5\\1/2\end{pmatrix}.
$$

$W'=WR=\left(\begin{smallmatrix}0&-2\\1&0\end{smallmatrix}\right)$、$W'W'^{\mathsf T}=WW^{\mathsf T}$ で同じ $C$。回転後は $M'=R^{\mathsf T}MR$、$(M')^{-1}=R^{\mathsf T}M^{-1}R$、$W'^{\mathsf T}x=R^{\mathsf T}W^{\mathsf T}x$ だから

$$
m'=(M')^{-1}W'^{\mathsf T}x=R^{\mathsf T}m
=\begin{pmatrix}1/2\\-4/5\end{pmatrix}.
$$

再構成は $W'm'=WRR^{\mathsf T}m=Wm=(8/5,1/2)^{\mathsf T}$。潜在成分は違っても観測上の結果は同一である。
<!-- solution-end -->

### ML2-07-B02 PPCAの最尤解と縮小係数

- Level: B

平均0の標本の分母 $n$ 共分散が $S=\operatorname{diag}(16,4,1)$、$p=3,q=1$ であるとする。PPCAの $\widehat\sigma^2$、負荷行列の一例、$\widehat C$ を求め、$y=(2,3,4)^{\mathsf T}$ のPCA射影とPPCA事後平均再構成を比較せよ。

<!-- solution-start -->
#### 詳細解答

固有値は $16\ge4\ge1$、$s_*^2=(4+1)/(3-1)=5/2>0$、$16>5/2$ なので[PPCA最尤定理](#thm-ml2-07-ppca-mle)を適用できる。上位固有ベクトルを $e_1$ とすれば

$$
\widehat W=\begin{pmatrix}\sqrt{16-5/2}\\0\\0\end{pmatrix}
=\begin{pmatrix}\sqrt{27/2}\\0\\0\end{pmatrix},\qquad
\widehat C=\operatorname{diag}(16,5/2,5/2).
$$

PCA射影は $(2,0,0)^{\mathsf T}$。一方[縮小命題](#prop-ml2-07-shrinkage)の係数は $1-(5/2)/16=27/32$ なので、PPCA再構成は $(27/16,0,0)^{\mathsf T}$。後者は $(2,0,0)$ の第1成分を $27/32$ 倍したものである。
<!-- solution-end -->

### ML2-07-B03 境界での尤度発散を説明する

- Level: B

$p=2,q=1$、平均0、標本共分散 $S=\operatorname{diag}(4,0)$ の場合、$C_t=\operatorname{diag}(4,t)$ を $0<t<4$ と置く。各 $C_t$ がPPCAで実現可能なことを示し、$t\downarrow0$ における対数尤度の挙動と「最尤推定値が存在するか」を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\sigma^2=t$、$W_t=(\sqrt{4-t},0)^{\mathsf T}$ とすれば $W_tW_t^{\mathsf T}+tI_2=\operatorname{diag}(4,t)=C_t$。$t>0$ だから各模型は正定値で許される。[最尤定理の証明](#thm-ml2-07-ppca-mle)に現れた中心化後の目的関数は

$$
F(C_t)=\log\det C_t+\operatorname{tr}(C_t^{-1}S)
=\log4+\log t+\frac44+\frac0t.
$$

$t\downarrow0$ で $F(C_t)\to-\infty$、従って負の対数尤度は際限なく減少し、尤度は非有界となる。極限の $t=0$ は $\sigma^2>0$ を破るため模型に含まれず、有限の最尤値を与える母数は存在しない。零方向に標本変動がないことが原因である。
<!-- solution-end -->

### ML2-07-B04 回転と非識別の限界を見分ける

- Level: B

$p=q=2$ の模型で $W=I_2$、$\Psi=I_2$ とする。(i) $R=\operatorname{diag}(1,-1)$、(ii) $A=\operatorname{diag}(2,1/2)$ に右から掛ける。$WR$ と $WA$ について、元の観測共分散を保つかそれぞれ検証せよ。$Z\sim N_2(0,I_2)$ の事前分布は変更しない。

<!-- solution-start -->
#### 詳細解答

元の $C=I_2+I_2=2I_2$。(i)は $R^{\mathsf T}R=I_2$、$RR^{\mathsf T}=I_2$ を満たす。[直交回転による観測分布の不変性](#thm-ml2-07-rotation)を適用すると $(WR)(WR)^{\mathsf T}=I_2$ で、新しい $C'=2I_2$ は元と等しい。(ii)は $AA^{\mathsf T}=\operatorname{diag}(4,1/4)\ne I_2$ だから

$$
C''=(WA)(WA)^{\mathsf T}+I_2
=\operatorname{diag}(5,5/4)\ne2I_2.
$$

同じ標準正規事前を保つ限り、任意の可逆変換が不識別を生むわけではない。非直交変換を扱うなら潜在事前共分散の変更も必要となり、本設問の模型とは別である。
<!-- solution-end -->

### ML2-07-C01 因子分析・PPCA・PCAを一つの模型で照合する

- Level: C

$p=2,q=1$、$W=(2,1)^{\mathsf T}$、$\mu=0$ とし、二つの雑音模型 (A) $\Psi_A=\operatorname{diag}(1,4)$、(B) $\Psi_B=I_2$ を考える。観測値は $x=(2,1)^{\mathsf T}$ とする。

1. 各模型の観測共分散を求め、FA/PPCAの分類と、観測固有の誤差が独立でも相関が残る理由を述べよ。
2. 各模型で $Z\mid X=x$ の平均・分散と再構成 $\widehat x$ を求めよ。
3. (B)の $C_B$ を標本共分散 $S$ とみなしたとき、$p=2,q=1$ のPPCA最尤条件を確認し、PCAの射影と(B)の再構成を比較せよ。また $W$ を $-W$ にしたら何が変わるか説明せよ。

<!-- solution-start -->
#### 詳細解答

（1）[因子模型の周辺Gaussian分布と共分散](#thm-ml2-07-marginal)へ $W$ を代入すると $WW^{\mathsf T}=\left(\begin{smallmatrix}4&2\\2&1\end{smallmatrix}\right)$。従って

$$
C_A=\begin{pmatrix}5&2\\2&5\end{pmatrix},\qquad
C_B=\begin{pmatrix}5&2\\2&2\end{pmatrix}.
$$

(A)は対角雑音が正で互いに異なるのでFAだがPPCAではない。(B)は $\sigma^2=1$ のPPCAでFAでもある。どちらも $C_{12}=2$ であり、共通潜在 $Z$ から $W_{11}W_{21}\operatorname{Var}(Z)=2\cdot1\cdot1=2$ が出るため、誤差の独立性は観測間の独立性を保証しない。

（2）[事後公式](#thm-ml2-07-posterior)をそれぞれ適用する。(A)では $\Psi_A^{-1}=\operatorname{diag}(1,1/4)$ だから

$$
M_A=1+4+\frac14=\frac{21}4,\qquad
W^{\mathsf T}\Psi_A^{-1}x=4+\frac14=\frac{17}4.
$$

ゆえに(A)の事後分散・平均・再構成は順に

$$
V_A=\frac4{21},\qquad m_A=\frac4{21}\frac{17}4=\frac{17}{21},\qquad
\widehat x_A=\begin{pmatrix}34/21\\17/21\end{pmatrix}.
$$

(B)では $M_B=1+5=6$、$W^{\mathsf T}x=5$ を事後公式へ代入し、

$$
V_B=\frac16,\qquad m_B=\frac56,\qquad
\widehat x_B=\begin{pmatrix}5/3\\5/6\end{pmatrix}.
$$

雑音分散の割り当てが潜在座標の精度と再構成の両方を変える。

（3）$C_B=I_2+WW^{\mathsf T}$ で $\|W\|^2=5$ だから、単位ベクトル $u=W/\sqrt5$ 方向の固有値は6、直交方向の固有値は1。$S=C_B$ と置けば $s_*^2=1>0$、$\lambda_1=6>1$ なので[最尤定理](#thm-ml2-07-ppca-mle)の仮定が成立する。$\widehat W=\sqrt{6-1}\,u=W$ は最尤解の一つ。

$x=W$ は主部分空間上にあるので、[PCA射影](../ML1-19/index.md#def-ml1-19-pca-loading)は $x$ 自身を返す。一方、[縮小命題](#prop-ml2-07-shrinkage)の係数は $1-1/6=5/6$。従って

$$
\widehat x_B=\frac56x
=\begin{pmatrix}5/3\\5/6\end{pmatrix},
$$

であり、（2）と一致する。負荷を $-W$ に変えても観測共分散は

$$
(-W)(-W)^{\mathsf T}=WW^{\mathsf T}
$$

のままである。[直交回転による観測分布の不変性](#thm-ml2-07-rotation)で $R=-1$ と置いた場合であり、潜在事後平均は $-5/6$ に符号反転する。しかし再構成は $(-W)(-5/6)=W(5/6)$ なので変わらない。
<!-- solution-end -->

## まとめ

連続潜在Gaussian因子を積分すると観測共分散は $WW^{\mathsf T}+\Psi$ になり、事後因子は平方完成で計算できる。FAは観測別雑音、PPCAは等方雑音を用いる。PPCAの最尤負荷の列空間は条件付きでPCAの主部分空間と一致するが、事後平均再構成は雑音分散に応じて縮小される。潜在軸を回転しても観測分布が不変という非識別性も、表現を解釈する際に忘れてはならない。
