# PML1-12 SGDの揺らぎは熱雑音と等しいか

<!-- definition-example-audit: strict -->

[PML1-11のEuler–Maruyama離散化](../PML1-11/index.md#def-pml1-11-euler-maruyama)では、一歩の熱雑音が刻み幅の平方根に比例した。学習でも、データを一部だけ取り出すと更新がランダムに揺れる。この二種類のランダムさを「温度」と呼ぶことがあるが、**同じ確率法則になる条件を計算で判定**しよう。

本講は、有限データのミニバッチ確率的勾配降下法（SGD）を一から定め、条件付き平均と分散共分散行列、抽出方法の違い、Langevin法との時間尺度の差を証明する。最後に「雑音が等方的か」「パラメータによって変わるか」を具体的な損失で検査する。

## 1. 全データ勾配を、一部のデータで置き換える

パラメータを $\theta\in\mathbb R^d$ とする。$N\ge2$ 個のデータにそれぞれ微分可能な実数値損失 $f_i:\mathbb R^d\to\mathbb R$ があり、全データの平均損失を

$$
F(\theta)=\frac1N\sum_{i=1}^N f_i(\theta)
$$

とする。有限和だから項別に微分できる。$g_i(\theta)=\nabla f_i(\theta)$ を**個別勾配**と呼べば、

$$
g(\theta)=\nabla F(\theta)=\frac1N\sum_{i=1}^N g_i(\theta)
$$

が**全データ勾配**である。$g_i,g$ はいずれも $\mathbb R^d$ の列ベクトルとする。

全データ勾配は $N$ 項を必要とする。そこで $1\le b\le N$ 個の添字をランダムに選び、平均で代用したい。まずは毎回、$1,\dots,N$ のどれも同じ確率 $1/N$ で選び、**同じ添字が重複してもよい復元抽出**を考える。$b$ はミニバッチサイズ、$\eta>0$ は学習率（1回の更新幅）である。

<a id="def-pml1-12-minibatch-sgd"></a>

<!-- formal-statement-start -->
> **定義（有限データの復元抽出ミニバッチSGD）**  
> 整数 $N\ge2$、$d\ge1$、$b\in\{1,\ldots,N\}$、学習率 $\eta>0$、微分可能な $f_i:\mathbb R^d\to\mathbb R$、初期値 $\theta_0\in\mathbb R^d$ を与える。各更新時刻 $n\ge0$ で、添字 $I_{n,1},\ldots,I_{n,b}$ を $\{1,\ldots,N\}$ から一様・独立に復元抽出し、過去の添字と初期値からも独立とする。ミニバッチ勾配と更新を

$$
\widehat g_n=\frac1b\sum_{j=1}^{b}g_{I_{n,j}}(\theta_n),
\qquad
\theta_{n+1}=\theta_n-\eta\widehat g_n
$$

> で定める。これを**ミニバッチSGD**と呼ぶ。$n$ は更新回数、$j$ は同一更新内の抽出番号、$i$ はデータ番号である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-12-minibatch-sgd -->
**定義の確認**：一次元で $N=2$、$f_1(\theta)=(\theta-1)^2/2$、$f_2(\theta)=(\theta+1)^2/2$、$b=2$、$\theta_0=2$、$\eta=1/10$ とする。個別勾配と全勾配は

$$
g_1(\theta)=\theta-1,\qquad
g_2(\theta)=\theta+1,\qquad g(\theta)=\theta.
$$

両方の抽出が $1$ なら、許される復元抽出の組 $(I_{0,1},I_{0,2})=(1,1)$ に対して

$$
\widehat g_0=\frac{g_1(2)+g_1(2)}2=1,\qquad
\theta_1=2-\frac1{10}=\frac{19}{10}.
$$

他方、組 $(1,2)$ なら $\widehat g_0=(1+3)/2=2$、$\theta_1=9/5$ となる。いずれも定義に従うが、**$b=N$ でも復元抽出では必ずしも全勾配にならない**。全データを各1回使う方法とは違う。
<!-- definition-example-end -->

このランダム更新が全勾配法からどの程度ずれるかを数値で評価したい。先に、ずれの方向ごとの大きさを表す行列を定義する。

## 2. 個別勾配の散らばりを行列にする

固定した $\theta$ において、個別勾配と全データ勾配の差を

$$
e_i(\theta)=g_i(\theta)-g(\theta)
$$

と書く。平均が定義からゼロとなる。

$$
\sum_{i=1}^{N}e_i(\theta)
=\sum_{i=1}^{N}g_i(\theta)-Ng(\theta)=0.
$$

$e_i(\theta)$ は $d$ 次元の列ベクトルで、標準座標での外積 $e_i e_i^{\mathsf T}$ は $d\times d$ 行列、第 $(r,s)$ 成分は $e_{i,r}e_{i,s}$ である。各方向の分散と方向間の共分散を調べるため、この外積を平均する。$d$ 次元確率変数 $Z$ の分散共分散行列は

$$
\operatorname{Cov}(Z)
=\mathbb E[(Z-\mathbb EZ)(Z-\mathbb EZ)^{\mathsf T}]
$$

である。一様な添字 $I$ を選んで $Z=g_I(\theta)$ と置けば $\mathbb EZ=g(\theta)$ であり、平均外積は $Z$ の分散共分散行列に等しい。

[正定値・半正定値行列](../../../基礎科目/F0/F0-00F1/index.md#def-f0-00f1-positive-semidefinite)のうち、実対称行列 $A$ が**半正定値**である条件は、すべての $v\in\mathbb R^d$ について $v^{\mathsf T}Av\ge0$ となることである。次に、この条件も散布行列で確かめる。

<a id="def-pml1-12-gradient-scatter"></a>

<!-- formal-statement-start -->
> **定義（個別勾配の散布行列）**  
> 整数 $N\ge2$、$d\ge1$、微分可能な $f_i:\mathbb R^d\to\mathbb R$ と平均勾配 $g(\theta)=N^{-1}\sum_i\nabla f_i(\theta)$ に対し、パラメータ $\theta\in\mathbb R^d$ における散布行列を

$$
C(\theta)=\frac1N\sum_{i=1}^N
\bigl(g_i(\theta)-g(\theta)\bigr)
\bigl(g_i(\theta)-g(\theta)\bigr)^{\mathsf T}
$$

> と定める。$C(\theta)$ は $d\times d$ の対称な半正定値行列である。
<!-- formal-statement-end -->

各外積は $(e_ie_i^{\mathsf T})^{\mathsf T}=e_ie_i^{\mathsf T}$ だから $C$ は対称である。また、

$$
v^{\mathsf T}C(\theta)v
=\frac1N\sum_{i=1}^N
\bigl(v^{\mathsf T}e_i(\theta)\bigr)^2\ge0.
$$

さらに $C_{rr}$ は第 $r$ 方向の個別勾配の平均二乗偏差であり、非対角成分 $C_{rs}$ は二方向の偏差の積の平均である。固有値を求めなくても、座標軸方向の揺れの差がこの定義から直接読める。

<!-- definition-example-start: def-pml1-12-gradient-scatter -->
**定義の確認**：$d=2,N=4$ とし、前節までのパラメータ $\theta$ を、ここでは列ベクトル $x=(x_1,x_2)^{\mathsf T}$ と書く。$\nabla f_i(x)$ は $x_1,x_2$ でそれぞれ偏微分した値を縦に並べた列ベクトルである。次の損失を取る。

$$
\begin{aligned}
f_1(x)&=\frac12x_1^2+x_1,&
f_2(x)&=\frac12x_1^2-x_1,\\
f_3(x)&=\frac12x_1^2+2x_2,&
f_4(x)&=\frac12x_1^2-2x_2
\end{aligned}
$$

これらを $x_1,x_2$ について偏微分すると、個別勾配は

$$
\begin{aligned}
g_1(x)&=(x_1+1,0)^{\mathsf T},&g_2(x)&=(x_1-1,0)^{\mathsf T},\\
g_3(x)&=(x_1,2)^{\mathsf T},&g_4(x)&=(x_1,-2)^{\mathsf T}.
\end{aligned}
$$

よって $g(x)=\frac14\sum_{i=1}^4g_i(x)=(x_1,0)^{\mathsf T}$ である。各 $g_i$ からこの $g$ を引くと、偏差ベクトルは

$$
e_1=(1,0)^{\mathsf T},\quad
e_2=(-1,0)^{\mathsf T},\quad
e_3=(0,2)^{\mathsf T},\quad
e_4=(0,-2)^{\mathsf T}.
$$

したがって $\sum_i e_i=0$、外積は対角成分だけを持ち、

$$
C(x)=\frac14
\left[
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}0&0\\0&4\end{pmatrix}
+\begin{pmatrix}0&0\\0&4\end{pmatrix}
\right]
=\begin{pmatrix}1/2&0\\0&2\end{pmatrix}.
$$

任意の $v=(v_1,v_2)^{\mathsf T}$ に対し $v^{\mathsf T}Cv=v_1^2/2+2v_2^2\ge0$。対称性と半正定値性まで直接確認できた。第2方向の分散は第1方向の4倍である。方向によって散らばりの大きさが異なる雑音を**異方的**という。
<!-- definition-example-end -->

## 3. 復元抽出なら雑音の平均はゼロ、共分散は $C/b$

更新 $n$ の**直前**に分かる初期値と過去の抽出番号の情報を

$$
\mathcal F_n=\sigma\!\left(\theta_0,I_{k,j}:0\le k<n,\ 1\le j\le b\right)
$$

と記す。$\sigma(\cdots)$ は括弧内の確率変数から判定できる事象全体を意味する。これから抽出する $I_{n,1},\ldots,I_{n,b}$ は $\mathcal F_n$ に**含めない**。この情報の下では $\theta_n$ は既知であり、新しい添字は条件付きで一様・独立である。$\mathbb E[Z\mid\mathcal F_n]$ は過去の情報の下での**条件付き期待値**である。条件付き分散共分散行列は、条件付き平均からの偏差を用いて

$$
\operatorname{Cov}(Z\mid\mathcal F_n)
=\mathbb E\!\left[
(Z-\mathbb E[Z\mid\mathcal F_n])
(Z-\mathbb E[Z\mid\mathcal F_n])^{\mathsf T}
\mid\mathcal F_n\right]
$$

と定める。サンプルされた勾配の全勾配からの差を $\zeta_{n+1}=\widehat g_n-g(\theta_n)$ とする。添字 $n+1$ は、その雑音が次の更新を生むことを表す。

<a id="prop-pml1-12-replacement-moments"></a>

<!-- formal-statement-start -->
> **命題（復元抽出SGDの条件付き平均・分散共分散行列）**  
> [復元抽出ミニバッチSGD](#def-pml1-12-minibatch-sgd)で、各 $n$ における $g_i(\theta_n)$ が有限なベクトルであるとする。$\zeta_{n+1}=\widehat g_n-g(\theta_n)$ に対し、

$$
\mathbb E[\zeta_{n+1}\mid\mathcal F_n]=0,\qquad
\operatorname{Cov}(\zeta_{n+1}\mid\mathcal F_n)
=\frac{C(\theta_n)}{b}.
$$

> 従って一歩の変化 $\Delta\theta_n=\theta_{n+1}-\theta_n$ の条件付き平均と分散共分散行列は

$$
\mathbb E[\Delta\theta_n\mid\mathcal F_n]
=-\eta g(\theta_n),\qquad
\operatorname{Cov}(\Delta\theta_n\mid\mathcal F_n)
=\frac{\eta^2}{b}C(\theta_n).
$$
<!-- formal-statement-end -->

### 証明の見取り図

新しい添字は過去と独立だから、固定した $\theta_n$ で $e_{I_{n,j}}$ の平均はゼロ。$b$ 個の和の共分散では、独立性によって異なる抽出番号の交差項だけが消える。

<!-- proof-start -->
### 証明

定義を代入すると

$$
\zeta_{n+1}
=\frac1b\sum_{j=1}^{b}
\bigl(g_{I_{n,j}}(\theta_n)-g(\theta_n)\bigr)
=\frac1b\sum_{j=1}^{b}e_{I_{n,j}}(\theta_n).
$$

$\mathcal F_n$ を固定して一様な添字を平均すれば、

$$
\mathbb E[e_{I_{n,j}}(\theta_n)\mid\mathcal F_n]
=\frac1N\sum_{i=1}^N e_i(\theta_n)=0.
$$

よって条件付き平均はゼロ。分散共分散行列について、二重和を対角項 $j=k$ と非対角項 $j\ne k$ に分けると、

$$
\begin{aligned}
\mathbb E[\zeta_{n+1}\zeta_{n+1}^{\mathsf T}
\mid\mathcal F_n]
&=\frac1{b^2}\sum_{j,k=1}^{b}
\mathbb E[e_{I_{n,j}}e_{I_{n,k}}^{\mathsf T}
\mid\mathcal F_n].
\end{aligned}
$$

$e_i$ の引数はここでは $\theta_n$ である。$j\ne k$ なら、条件付き独立性と平均ゼロにより期待値は零行列。$j=k$ なら [散布行列の定義](#def-pml1-12-gradient-scatter)から期待値は $C(\theta_n)$。従って

$$
\operatorname{Cov}(\zeta_{n+1}\mid\mathcal F_n)
=\frac{b}{b^2}C(\theta_n)
=\frac1b C(\theta_n).
$$

最後に $\Delta\theta_n=-\eta g(\theta_n)-\eta\zeta_{n+1}$ を用いる。$\mathcal F_n$ を固定したとき最初の項は定数であり、定数倍の共分散は係数の平方倍だから表示式を得る。
<!-- proof-end -->

**読み方**：ミニバッチサイズを4倍にすると勾配推定の条件付き分散は4分の1、標準偏差は2分の1になる。学習率を2倍にすると、**更新に注入される**雑音の条件付き分散は4倍になる。ここは学習率の1乗ではない。

## 4. 非復元抽出なら有限母集団補正が入る

同じ一歩の中で添字を重複させず、$N$ 個から異なる $b$ 個を一様に選ぶことを**非復元抽出**と呼ぶ。一歩ごとに選び直す場合を考え、異なる一歩どうしの抽出は独立とする。非復元抽出では同じ一歩の $I_1$ と $I_2$ は互いに独立ではない。$b=N$ なら全データを一度ずつ使うので雑音が厳密に消える。

<a id="prop-pml1-12-without-replacement"></a>

<!-- formal-statement-start -->
> **命題（非復元ミニバッチの分散共分散行列）**  
> $N\ge2$、$1\le b\le N$ とし、固定した $\theta\in\mathbb R^d$ で、相異なる $b$ 個の添字を一様に非復元抽出して平均勾配 $\widehat g=b^{-1}\sum_{j=1}^b g_{I_j}(\theta)$ を作る。すると

$$
\mathbb E[\widehat g]=g(\theta),\qquad
\operatorname{Cov}(\widehat g)
=\frac{N-b}{b(N-1)}C(\theta).
$$

> 一歩のSGD更新では、右辺に $\eta^2$ を掛ける。
<!-- formal-statement-end -->

### 証明の見取り図

相異なる二添字の偏差の積は、全偏差和ゼロから負の共分散を持つ。復元抽出の証明でゼロだった交差項が、今回は有限母集団補正を作る。

<!-- proof-start -->
### 証明

$e_i=g_i(\theta)-g(\theta)$ と置くと $\sum_i e_i=0$。一様非復元抽出の一番目は一様なので $\mathbb E[e_{I_j}]=0$、同じ番号の外積平均は $C(\theta)$ である。異なる位置 $j\ne k$ の順序付き添字 $(I_j,I_k)$ は $N(N-1)$ 組が等確率だから、

$$
\begin{aligned}
\mathbb E[e_{I_j}e_{I_k}^{\mathsf T}]
&=\frac1{N(N-1)}\sum_{i\ne\ell}e_i e_\ell^{\mathsf T}\\
&=\frac1{N(N-1)}
\left[
\left(\sum_i e_i\right)
\left(\sum_\ell e_\ell\right)^{\mathsf T}
-\sum_i e_i e_i^{\mathsf T}
\right]\\
&=-\frac{C(\theta)}{N-1}.
\end{aligned}
$$

対角項 $b$ 個と非対角項 $b(b-1)$ 個を数えると、

$$
\begin{aligned}
\operatorname{Cov}(\widehat g)
&=\frac1{b^2}
\left[
bC-\frac{b(b-1)}{N-1}C
\right]\\
&=\frac{N-b}{b(N-1)}C.
\end{aligned}
$$

$\widehat g$ の期待値は $g$、更新の共分散は定数倍の平方により $\eta^2$ 倍となる。
<!-- proof-end -->

**数値例**：第2節の $N=4$ の二次元データで $b=2$ とすると、復元抽出と非復元抽出の勾配共分散はそれぞれ

$$
\frac C2=\begin{pmatrix}1/4&0\\0&1\end{pmatrix},
\qquad
\frac{4-2}{2(4-1)}C
=\begin{pmatrix}1/6&0\\0&2/3\end{pmatrix}.
$$

有限個のデータを一巡させる実装では、**一歩内の非復元性**に加えて**更新をまたぐ抽出の依存**も生じ得る。上の公式は固定パラメータでの一バッチの共分散を主張するもので、何歩にもわたる雑音の独立性を保証しない。

## 5. Langevinの熱雑音との比較：学習率の次数が違う

[PML1-08の熱雑音の整合条件](../PML1-08/index.md#def-pml1-08-thermal-matching)で移動度 $M=I_d$、拡散係数 $\Sigma=\sqrt{2\tau}\,I_d$ を選ぶ。$I_d$ は $d\times d$ 単位行列、$\tau>0$ は温度である。[d次元ブラウン運動](../../../解析系/STO/STO7/index.md#def-sto7-vector-brownian)を $B_t$ とし、幅 $\eta>0$ の増分を $\Delta B_n=B_{(n+1)\eta}-B_{n\eta}$ と定める。この増分は $N_d(0,\eta I_d)$ に従うので、$\xi_{n+1}=\Delta B_n/\sqrt\eta$ と置けば $\Delta B_n=\sqrt\eta\,\xi_{n+1}$ と書ける。ここで $\xi_{n+1}$ は $N_d(0,I_d)$ に従い、過去の増分から独立である。

[PML1-11のEuler–Maruyama離散化](../PML1-11/index.md#def-pml1-11-euler-maruyama)で一次元に行ったのと同じく、ドリフト積分を左端の $g(Y_n)$ と刻み幅 $\eta$ の積で近似し、ブラウン増分はそのまま用いる。$g=\nabla F$ とすると、多次元の一歩は

$$
Y_{n+1}=Y_n-\eta g(Y_n)+\sqrt{2\tau\eta}\,\xi_{n+1}
$$

となる。$\xi_n$ は互いに独立な $d$ 次元標準正規ベクトルで過去からも独立とする。その分散共分散行列は $I_d$ で、一歩の熱雑音の共分散は $2\tau\eta I_d$。一方、復元抽出SGDの一歩の雑音は $-\eta\zeta_{n+1}$ で、共分散は $\eta^2 C/b$ だった。

「熱雑音と等しい」の意味をまず**条件付き共分散が等しい**ことに限定して判定する。これでも十分強い必要条件である。

<a id="prop-pml1-12-thermal-covariance"></a>

<!-- formal-statement-start -->
> **命題（等方的熱雑音との一歩共分散一致条件）**  
> $N\ge2$、$b\in\{1,\ldots,N\}$、$\eta,\tau>0$ とし、有限個の個別損失 $f_i$ は微分可能とする。固定した $\theta\in\mathbb R^d$ で、復元抽出SGDの雑音 $-\eta(\widehat g-g)$ と、独立な $d$ 次元標準正規ベクトル $\xi$ による熱雑音 $\sqrt{2\tau\eta}\,\xi$ の分散共分散行列が等しいための必要十分条件は

$$
C(\theta)=\frac{2\tau b}{\eta}I_d
$$

> である。正の一定温度 $\tau$ で全パラメータ $\theta$ において共分散が一致するには、この等式が全 $\theta$ で成立しなければならない。**共分散一致は確率分布の一致を意味しない。**
<!-- formal-statement-end -->

### 証明の見取り図

第3節の結果と標準正規ベクトルの共分散を比較し、両辺を同じ正の係数で割るだけでよい。「全点で一致」には一点だけの計算では足りない。

<!-- proof-start -->
### 証明

[復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)を固定した $\theta$ に適用すると

$$
\operatorname{Cov}(-\eta\zeta)
=\frac{\eta^2}{b}C(\theta).
$$

標準正規ベクトル $\xi$ は $\operatorname{Cov}(\xi)=I_d$ だから、

$$
\operatorname{Cov}(\sqrt{2\tau\eta}\,\xi)
=2\tau\eta I_d.
$$

$\eta>0,b>0$ の下で、両行列の等式を $\eta^2/b$ で割ることと、命題の $C(\theta)$ の等式は同値である。各 $\theta$ について同じ議論が成立するので、全点一致の条件も従う。

ただし固定 $\theta$ で復元抽出のミニバッチ勾配が取り得る値は高々 $N^b$ 個。したがってSGDの一歩の雑音分布は有限個の点に集中する。他方 $\tau>0$ の多次元正規分布は任意の一点に確率0を割り当てる。ゆえに、**有限データの復元抽出SGDは、共分散が一致しても正温度のGaussian熱雑音と分布として一致しない**。
<!-- proof-end -->

以下、$\operatorname{diag}(a,b)$ は $a,b$ を対角成分に置き、非対角成分を0とする行列を表す。第2節の例の $C=\operatorname{diag}(1/2,2)$ では、どんな正のスカラー $\tau$ でも $C=(2\tau b/\eta)I_2$ は成り立たない。第1方向だけで温度を合わせれば第2方向の分散が4倍ずれる。これは「平均が等しい」だけでは見つからない差である。

| 比較項目 | 復元抽出ミニバッチSGD | 等方的Langevin離散化 |
|---|---|---|
| 一歩の条件付き平均変化 | $-\eta g(\theta)$ | $-\eta g(\theta)$ |
| 一歩の雑音共分散 | $\eta^2 C(\theta)/b$ | $2\tau\eta I_d$ |
| 雑音の一歩の大きさ（標準偏差） | 学習率 $\eta$ に比例 | $\sqrt\eta$ に比例 |
| 雑音分布 | 有限個の値、一般に非Gaussian | Gaussian |
| パラメータ依存 | $C(\theta)$ に依存し得る | 定数 $\tau$ なら依存しない |

ここで時間刻みを学習率と同一視したのは**比較のための選択**である。更新回数そのものを物理時間と解釈するなら刻みの対応を別途定める必要がある。

## 6. 長さ一定の時間区間では揺れがどう蓄積するか

一歩の分散だけでなく、$T>0$ の間に $\eta$ 刻みで $m$ 回進む状況を考える。時刻 $t_n=n\eta$ とし、$m\eta\le T$。各更新の平均ゼロの雑音の和を

$$
M_m=-\eta\sum_{k=0}^{m-1}\zeta_{k+1}
$$

と書く。これは**勾配によるドリフトを取り除いた更新雑音の累積**であり、最終パラメータそのものではない。

<a id="prop-pml1-12-noise-time-scale"></a>

<!-- formal-statement-start -->
> **命題（固定時間内のSGD雑音の二乗平均上界）**  
> [復元抽出ミニバッチSGD](#def-pml1-12-minibatch-sgd)を用い、各 $n$ で $\mathbb E\|\zeta_{n+1}\|^2<\infty$ とする。$m\eta\le T$ とし、到達する各状態でほとんど確実に $\operatorname{tr}C(\theta_n)\le K$ となる定数 $K<\infty$ があると仮定する。すると

$$
\mathbb E[M_m]=0,\qquad
\mathbb E\|M_m\|^2
=\frac{\eta^2}{b}\sum_{k=0}^{m-1}
\mathbb E[\operatorname{tr}C(\theta_k)]
\le \frac{T\eta K}{b}.
$$

> 従って $b$ と $T$ を固定して $\eta\to0$ とすると、累積更新雑音 $M_m$ は二乗平均で $0$ に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

別時刻のミニバッチ雑音は独立とまでは言えないが、後の雑音の**過去を固定した条件付き平均はゼロ**である。これにより異なる時刻の内積の期待値が消え、各時刻の分散を足せる。

<!-- proof-start -->
### 証明

[復元抽出の条件付き平均](#prop-pml1-12-replacement-moments)から $\mathbb E[\zeta_{k+1}\mid\mathcal F_k]=0$。従って $\mathbb E[\zeta_{k+1}]=0$、よって $\mathbb E[M_m]=0$。

$0\le j<k\le m-1$ では $\zeta_{j+1}$ は $\mathcal F_k$ に含まれる過去の確率変数である。期待値の塔の性質を適用して

$$
\begin{aligned}
\mathbb E[\zeta_{j+1}^{\mathsf T}\zeta_{k+1}]
&=\mathbb E\!\left[
\zeta_{j+1}^{\mathsf T}
\mathbb E[\zeta_{k+1}\mid\mathcal F_k]
\right]=0.
\end{aligned}
$$

したがって二乗ノルムを展開すると、交差項の期待値が全てゼロになる。

$$
\mathbb E\|M_m\|^2
=\eta^2\sum_{k=0}^{m-1}\mathbb E\|\zeta_{k+1}\|^2.
$$

一方、条件付き平均ゼロと [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)から、各座標の条件付き二乗平均を足せば

$$
\mathbb E[\|\zeta_{k+1}\|^2\mid\mathcal F_k]
=\operatorname{tr}\!\left(\frac{C(\theta_k)}b\right).
$$

これを代入すると等号の式を得る。最後に仮定 $\operatorname{tr}C(\theta_k)\le K$ と $m\eta\le T$ を使い、

$$
\mathbb E\|M_m\|^2
\le\frac{\eta^2mK}{b}
\le\frac{T\eta K}{b}\longrightarrow0
$$

を得る。
<!-- proof-end -->

一方、定数温度のLangevin離散化で各時刻のGaussian雑音を足すと、$m$ 歩の累積共分散は $2\tau m\eta I_d$ であり、$m\eta\to T>0$ なら $2\tau T I_d$ に近づく。**同じ時間尺度では、固定バッチSGDの雑音だけが $\eta\to0$ で消える**。これは累積雑音に関する比較であり、ドリフトを含むSGDの連続極限全体の収束定理を無条件に述べているわけではない。

## 7. 状態依存の反例：最適点で雑音が消える

異方性とは別の問題として、雑音の強さ自体が $\theta$ に依存し得る。一次元で $N=2$ とし、

$$
f_1(\theta)=\frac12\theta^2,\qquad
f_2(\theta)=\frac32\theta^2
$$

を考える。すると

$$
F(\theta)=\theta^2,\quad
g_1(\theta)=\theta,\quad
g_2(\theta)=3\theta,\quad
g(\theta)=2\theta.
$$

偏差は $e_1=-\theta,e_2=\theta$ だから、

$$
C(\theta)=\frac12(\theta^2+\theta^2)=\theta^2.
$$

$b=1$ では各更新が等確率で $\theta_{n+1}=(1-\eta)\theta_n$ または $\theta_{n+1}=(1-3\eta)\theta_n$ となる。$\theta_n=0$ ではどちらも次の状態はゼロで、雑音は全くない。他方、正の温度 $\tau$ のLangevin更新なら $0$ からでも分散 $2\tau\eta>0$ の雑音が注入される。

この例で失われているのは「正の**定数**温度と同じ揺れ」という仮定であり、[一歩共分散一致条件](#prop-pml1-12-thermal-covariance)の左辺 $C(\theta)$ が $\theta$ とともに変化する。SGDと熱雑音を同一視する議論はここで破綻する。SGDが定常分布をどの条件で持つか、局所的にOU過程で近似できるかは次講で検討する。

## 8. 演習 Level A

<a id="ex-pml1-12-a01"></a>
### PML1-12-A01 個別勾配から散布行列を作る

- Level: A

一次元の個別損失 $f_1(\theta)=(\theta-2)^2/2$、$f_2(\theta)=(\theta+2)^2/2$ について、$g_1,g_2,g$ と $C(\theta)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

それぞれを $\theta$ で微分して

$$
g_1(\theta)=\theta-2,\qquad g_2(\theta)=\theta+2.
$$

平均は $g=((\theta-2)+(\theta+2))/2=\theta$。偏差は $e_1=-2,e_2=2$ だから、[散布行列の定義](#def-pml1-12-gradient-scatter)を一次元の数に適用すると

$$
C(\theta)=\frac12\bigl((-2)^2+2^2\bigr)=4.
$$

$\theta$ に依存しないが、個別勾配が等しくないため散布は消えない。
<!-- solution-end -->

<a id="ex-pml1-12-a02"></a>
### PML1-12-A02 復元抽出の一歩

- Level: A

A01の損失で $\theta_0=3$、$b=2$、$\eta=1/4$ とする。抽出された添字が $(1,1)$ の場合と $(1,2)$ の場合で $\widehat g_0$ と $\theta_1$ を求めよ。

<!-- solution-start -->
#### 詳細解答

A01の結果から $g_1(3)=1$、$g_2(3)=5$。組 $(1,1)$ では $\widehat g_0=(1+1)/2=1$ なので、

$$
\theta_1=3-\frac14\cdot1=\frac{11}{4}.
$$

組 $(1,2)$ では $\widehat g_0=(1+5)/2=3$ なので、

$$
\theta_1=3-\frac14\cdot3=\frac94.
$$

復元抽出では同じ添字を重複して選べることを使った。
<!-- solution-end -->

<a id="ex-pml1-12-a03"></a>
### PML1-12-A03 二方向の分散

- Level: A

第2節の四つの二次元損失に対して、$b=1$、$\eta=1/5$ の復元抽出SGDの一歩の雑音共分散を求めよ。第1成分と第2成分を比較せよ。

<!-- solution-start -->
#### 詳細解答

[第2節の散布行列](#def-pml1-12-gradient-scatter)を直接計算した結果は $C=\operatorname{diag}(1/2,2)$。復元抽出の [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)で $b=1$、$\eta^2=1/25$ を代入すると

$$
\operatorname{Cov}(\Delta\theta\mid\theta)
=\frac1{25}
\begin{pmatrix}1/2&0\\0&2\end{pmatrix}
=\begin{pmatrix}1/50&0\\0&2/25\end{pmatrix}.
$$

第2成分の分散 $2/25$ は第1成分の分散 $1/50$ の4倍。単一の等方的雑音分散では両方向を表せない。
<!-- solution-end -->

<a id="ex-pml1-12-a04"></a>
### PML1-12-A04 一次元の見かけの温度

- Level: A

一次元で $C(\theta)=4$、$b=2$、$\eta=1/10$ が成り立つ点を考える。同じ一歩の雑音共分散を持つLangevin更新の温度 $\tau$ を求めよ。この温度によって雑音分布まで一致するか。

<!-- solution-start -->
#### 詳細解答

SGD側は [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)から

$$
\frac{\eta^2}{b}C
=\frac{(1/10)^2}{2}\cdot4=\frac1{50}.
$$

Langevin側は $2\tau\eta=\tau/5$。よって $\tau/5=1/50$ から

$$
\tau=\frac1{10}.
$$

ただし有限データでのSGD雑音は有限個の値しかとらず、$\tau>0$ のGaussian熱雑音とは分布が等しくない。[共分散一致条件](#prop-pml1-12-thermal-covariance)は分布一致の判定ではない。
<!-- solution-end -->

<a id="ex-pml1-12-a05"></a>
### PML1-12-A05 全データの非復元抽出

- Level: A

$N=4$ の第2節の損失から $b=4$ 個を非復元抽出した場合と復元抽出した場合の勾配共分散を求めよ。

<!-- solution-start -->
#### 詳細解答

$C=\operatorname{diag}(1/2,2)$ である。非復元抽出では4個を全て一度ずつ選ぶので平均は常に $g$、[非復元ミニバッチの分散共分散行列](#prop-pml1-12-without-replacement)の係数も

$$
\frac{N-b}{b(N-1)}=\frac{4-4}{4\cdot3}=0.
$$

従って共分散は零行列。復元抽出では [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)から

$$
\frac C4=\begin{pmatrix}1/8&0\\0&1/2\end{pmatrix}.
$$

$b=N$ という等式だけでは抽出方式を決められない。重複を許すかが違いを生む。
<!-- solution-end -->

## 9. 演習 Level B

<a id="ex-pml1-12-b01"></a>
### PML1-12-B01 有限母集団補正を数値で検査する

- Level: B

固定パラメータで5個の一次元個別勾配の偏差が $(-2,-1,0,1,2)$ である。サイズ $b=3$ のミニバッチについて、復元抽出と非復元抽出それぞれの勾配推定量の分散を求め、比を検算せよ。

<!-- solution-start -->
#### 詳細解答

偏差の総和は $-2-1+0+1+2=0$ なので平均ゼロの条件を満たす。散布は

$$
C=\frac{(-2)^2+(-1)^2+0^2+1^2+2^2}{5}
=\frac{10}{5}=2.
$$

[復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)では $C/b=2/3$。[非復元ミニバッチの分散共分散行列](#prop-pml1-12-without-replacement)では

$$
\frac{N-b}{b(N-1)}C
=\frac{5-3}{3(5-1)}\cdot2=\frac13.
$$

したがって非復元抽出の分散は復元抽出の半分。係数の比も $(N-b)/(N-1)=2/4=1/2$ で一致する。
<!-- solution-end -->

<a id="ex-pml1-12-b02"></a>
### PML1-12-B02 状態依存雑音を一歩まで追う

- Level: B

第7節の $f_1(\theta)=\theta^2/2$、$f_2(\theta)=3\theta^2/2$ に対し、$\theta_0=2$、$b=1$、$\eta=1/4$ とする。二つの可能な $\theta_1$ を列挙し、平均・分散を直接計算して条件付き共分散公式と照合せよ。$\theta_0=0$ では何が変わるか。

<!-- solution-start -->
#### 詳細解答

個別勾配は $g_1(2)=2$、$g_2(2)=6$。添字1なら

$$
\theta_1=2-\frac14\cdot2=\frac32.
$$

添字2なら $\theta_1=2-(1/4)\cdot6=1/2$。両者は各確率 $1/2$ なので

$$
\mathbb E[\theta_1]=\frac12\left(\frac32+\frac12\right)=1
=2-\frac14 g(2)
$$

であり、$g(2)=4$ を使った。平均との差はそれぞれ $1/2,-1/2$ だから

$$
\operatorname{Var}(\theta_1)
=\frac12\left[\left(\frac12\right)^2+
\left(-\frac12\right)^2\right]=\frac14.
$$

他方、$C(2)=2^2=4$ なので [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)から $\eta^2 C(2)/b=(1/16)\cdot4=1/4$ となり一致する。$\theta_0=0$ なら個別勾配も平均勾配もゼロなので、どの添字を引いても $\theta_1=0$ で分散ゼロ。
<!-- solution-end -->

<a id="ex-pml1-12-b03"></a>
### PML1-12-B03 方向ごとに温度を合わせたら

- Level: B

第2節の $C=\operatorname{diag}(1/2,2)$、$b=1$、$\eta=1/5$ のSGDについて、一歩の雑音共分散を計算せよ。各座標だけを見てLangevin共分散 $2\tau\eta I_2$ と等しくする温度をそれぞれ求め、単一の温度が存在するか判定せよ。

<!-- solution-start -->
#### 詳細解答

SGD共分散は [復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)から

$$
\eta^2 C
=\begin{pmatrix}1/50&0\\0&2/25\end{pmatrix}.
$$

Langevin共分散は $2\tau\eta I_2=(2\tau/5)I_2$ なので、第1座標を合わせると

$$
\frac{2\tau_1}{5}=\frac1{50}
\quad\Longrightarrow\quad \tau_1=\frac1{20}.
$$

第2座標を合わせると

$$
\frac{2\tau_2}{5}=\frac2{25}
\quad\Longrightarrow\quad \tau_2=\frac15.
$$

$\tau_1\ne\tau_2$ だから単一の $\tau$ は存在しない。[共分散一致条件](#prop-pml1-12-thermal-covariance)に必要な $C$ のスカラー単位行列性が失われている。
<!-- solution-end -->

<a id="ex-pml1-12-b04"></a>
### PML1-12-B04 固定時間の二乗平均評価

- Level: B

復元抽出SGDで $\operatorname{tr}C(\theta_n)\le8$ が全時刻でほとんど確実に成り立つ。$b=4$、$\eta=1/100$、$m=200$ とすると、累積雑音 $M_m$ の $\mathbb E\|M_m\|^2$ を上から評価せよ。$m\eta=2$ を固定したまま $\eta$ を半分にすると、この上界はどうなるか。

<!-- solution-start -->
#### 詳細解答

$m\eta=200/100=2$ なので $T=2,K=8$ として [固定時間上界](#prop-pml1-12-noise-time-scale)を適用できる。各時刻の二乗平均上界を足して

$$
\mathbb E\|M_{200}\|^2
\le\frac{T\eta K}{b}
=\frac{2\cdot(1/100)\cdot8}{4}
=\frac1{25}.
$$

よって二乗平均平方根は高々 $1/5$。$\eta'=1/200$、$m'=400$ とすれば $m'\eta'=2$ を保てるので同じ仮定の下で

$$
\mathbb E\|M_{400}'\|^2
\le\frac{2\cdot(1/200)\cdot8}{4}=\frac1{50}.
$$

上界は半分、二乗平均平方根の上界は $1/\sqrt2$ 倍になる。これは雑音累積の評価であり、最終パラメータの誤差上界とは限らない。
<!-- solution-end -->

## 10. 演習 Level C

<a id="ex-pml1-12-c01"></a>
### PML1-12-C01 抽出方式・異方性・時間尺度を統合する

- Level: C

二次元の4損失を

$$
\begin{aligned}
f_1(x)&=\frac12x_1^2+x_1,&f_2(x)&=\frac12x_1^2-x_1,\\
f_3(x)&=\frac12x_1^2+2x_2,&f_4(x)&=\frac12x_1^2-2x_2
\end{aligned}
$$

とし、$b=2$、$\eta=1/10$ のSGDを考える。

1. $g$、偏差 $e_i$、散布行列 $C$ を計算し、復元抽出SGDの一歩の雑音共分散を求めよ。
2. 同じサイズの非復元抽出SGDの一歩の雑音共分散を求めよ。
3. 移動度1の等方的Langevin更新に、一定温度 $\tau>0$ を選んで復元抽出SGDの二方向の一歩共分散を同時に合わせられるか。理由を述べよ。
4. 復元抽出を各歩で繰り返し、時間刻みを $\eta$、$m\eta\le T$ とする。$M_m=-\eta\sum_{k<m}\zeta_{k+1}$ の二乗平均を評価し、$\eta\to0$ での熱雑音との違いを述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** 個別勾配を成分ごとに微分すると

$$
\begin{aligned}
g_1&=(x_1+1,0)^{\mathsf T},&
g_2&=(x_1-1,0)^{\mathsf T},\\
g_3&=(x_1,2)^{\mathsf T},&
g_4&=(x_1,-2)^{\mathsf T}.
\end{aligned}
$$

4本を平均して $g=(x_1,0)^{\mathsf T}$、これを各 $g_i$ から引くと

$$
\begin{aligned}
e_1&=(1,0)^{\mathsf T},&e_2&=(-1,0)^{\mathsf T},\\
e_3&=(0,2)^{\mathsf T},&e_4&=(0,-2)^{\mathsf T}.
\end{aligned}
$$

外積の平均をとると

$$
C=\frac14\operatorname{diag}(2,8)
=\operatorname{diag}(1/2,2).
$$

[復元抽出SGDの条件付き平均・分散共分散行列](#prop-pml1-12-replacement-moments)で $b=2$、$\eta^2=1/100$ と置けば、

$$
\frac{\eta^2}{b}C
=\frac1{200}\operatorname{diag}(1/2,2)
=\operatorname{diag}(1/400,1/100).
$$

**2.** 非復元抽出では添字の重複を許さない。[有限母集団補正](#prop-pml1-12-without-replacement)は

$$
\frac{N-b}{b(N-1)}
=\frac{4-2}{2(4-1)}=\frac13.
$$

一歩の更新雑音の共分散は

$$
\eta^2\frac C3
=\operatorname{diag}(1/600,1/150).
$$

復元抽出と比べて各方向とも $2/3$ 倍になった。

**3.** 等方的Langevin法では雑音共分散が $2\tau\eta I_2=(\tau/5)I_2$。これは両対角成分が等しい。一方、1. の結果は $(1/400,1/100)$ と異なるため、一つの正の $\tau$ で両方を合わせることはできない。[一歩共分散一致条件](#prop-pml1-12-thermal-covariance)に必要な $C\propto I_2$ が成立しないためである。

**4.** この模型では $C$ は状態 $x$ に依存せず $\operatorname{tr}C=1/2+2=5/2$。従って [固定時間の上界](#prop-pml1-12-noise-time-scale)を $K=5/2$ として適用でき、

$$
\mathbb E\|M_m\|^2
=\frac{\eta^2m}{b}\operatorname{tr}C
=\frac{5m\eta^2}{4}
\le\frac{5T\eta}{4}.
$$

ここでは各歩の条件付き共分散も一定なので等号まで得られた。$T$ を固定して $\eta\to0$ とすると右辺はゼロに収束する。他方、正の定数温度のLangevin法で $m\eta\to T>0$ なら、累積熱雑音の共分散は $2\tau T I_2$ に近づく。従って、学習率を細かくした固定バッチSGDと、定数温度の熱拡散を同一の時間尺度で同一視できない。
<!-- solution-end -->

## 11. この講で得た判定手順

SGDの揺らぎを熱雑音と比較するときは、まず個別勾配を平均から引いて $C(\theta)$ を作る。次に抽出方式から復元抽出の $C/b$ または非復元抽出の $(N-b)C/(b(N-1))$ を選び、学習率の**平方**を掛けて更新雑音の共分散に変換する。最後に、Langevinの $2\tau\eta I_d$ と、方向・状態・時間尺度・分布形を別々に比較する。

この段階で分かるのは一歩の条件付きモーメントと固定時間の雑音累積である。次講 PML1-13 では、二次近似や局所Gaussian近似が許される場合に、どのような近似的な長時間分布が生じるかを調べる。
