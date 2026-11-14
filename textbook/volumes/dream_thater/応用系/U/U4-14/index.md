# U4-14 多変量共和分と誤差修正表現

<!-- definition-example-audit: strict -->

前講の[2系列の共和分](../U4-13/index.md#def-u4-13-cointegration)では、2本の $I(1)$ 系列から定常な差を1本得ました。3本の系列なら、独立な定常の差が2本見つかることもあります。「どれを被説明変数にするか」より先に、**定常な線形結合の全体の次元**を問わなければなりません。

さらに差が定常だとしても、そのずれが翌期の変化をどちらへ修正するかは自明ではありません。本講では、共和分空間→VARの誤差修正表現（VECM）→Johansenのランク判定へ進みます。価格と対数価格を混ぜず、統計的な共変動を[無裁定利益](../U4-10/index.md#def-u4-10-statewise-arbitrage)と混同しないでください。

以降、$t=0,1,\ldots$、$k$ 次元列ベクトル $x_t$ の各成分は実数値で二次モーメントが有限とします。「定常」は[二次定常性](../../../解析系/TSA/TSA1/index.md#def-tsa1-second-order-stationarity)の意味です。[階差と $I(1)$](../U4-13/index.md#def-u4-13-integration)は前講と同じ定義を使用します。

## 1. 共和分はベクトル1本でなく空間を探す

$S_0=0$、$S_t=\sum_{j=1}^t\varepsilon_j$ とし、$\varepsilon_j,\eta_j,\zeta_j$ は系列間も時点間も独立で平均0・分散1の独立同分布ショックとします。3本の水準を

$$
x_t=\begin{pmatrix}S_t\\S_t+\eta_t\\2S_t+\zeta_t\end{pmatrix}
$$

と作ります。水準分散は順に $t,t+1,4t+1$ で発散し、各階差は二次定常です。従って各成分は $I(1)$ です。しかし

$$
x_{2,t}-x_{1,t}=\eta_t,\qquad x_{3,t}-2x_{1,t}=\zeta_t
$$

はそれぞれ $I(0)$。係数 $(-1,1,0)^\top,(-2,0,1)^\top$ は線形独立です。この例では $\eta_t,\zeta_t$ が**共同で二次定常**なので、その線形結合も二次定常であり、定常な結合の係数全体は線形部分空間をなします。ただし、二つの結合が個別に二次定常でも、その交差共分散が時刻に依存すれば和が二次定常とは限りません。以下では定常な結合同士の共同二次定常性も仮定して、独立な関係の本数を空間の次元で数えます。

<a id="def-u4-14-cointegration-space"></a>

<!-- formal-statement-start -->
> **定義（多変量共和分空間と共和分ランク）**  
> $k\ge2$、$x_t=(x_{1,t},\ldots,x_{k,t})^\top$ の各成分が $I(1)$ であるとする。また、二次定常となる任意の二つの線形結合について、両者の交差共分散も時差のみに依存すると仮定する。共和分空間を

$$
\mathcal C=\{b\in\mathbb R^k:\ b^\top x_t\text{ が }I(0)\}
$$

> とする。その次元 $r=\dim\mathcal C$ を共和分ランクとする。$0<r<k$ なら共和分が存在し、$\mathcal C$ の基底を列に並べた $k\times r$ 行列 $\beta$ を共和分行列と呼ぶ。$\beta^\top x_t$ は $r$ 次元の定常な長期偏差である。
<!-- formal-statement-end -->

**空間になる理由**：$U_t=b^\top x_t$ と $V_t=d^\top x_t$ が定常なら、追加した共同二次定常性の下で、任意の実数 $a,c$ に対する $aU_t+cV_t$ の平均は一定で、自己共分散は

$$
\operatorname{Cov}(aU_t+cV_t,aU_s+cV_s)
=a^2\gamma_{UU}(t-s)+ac\{\gamma_{UV}(t-s)+\gamma_{VU}(t-s)\}
+c^2\gamma_{VV}(t-s)
$$

と時差だけに依存します。零結合も定常なので、$\mathcal C$ は加法・スカラー倍で閉じた部分空間です。次の例の独立な $\eta,\zeta$ は共同二次定常性を満たします。

<!-- definition-example-start: def-u4-14-cointegration-space -->
**定義の確認**：上の3系列に対して任意の $b=(b_1,b_2,b_3)^\top$ を使うと

$$
b^\top x_t=(b_1+b_2+2b_3)S_t+b_2\eta_t+b_3\zeta_t
$$

です。独立性より

$$
\operatorname{Var}(b^\top x_t)
=t(b_1+b_2+2b_3)^2+b_2^2+b_3^2.
$$

これは $b_1+b_2+2b_3=0$ のとき、そしてそのときに限り時点に依らず一定です。その場合の $b^\top x_t$ は独立同分布列の定数倍の和で、二次定常です。従って

$$
\mathcal C=\operatorname{span}\left\{
(-1,1,0)^\top,(-2,0,1)^\top\right\},\qquad r=2.
$$

両ベクトルは線形独立です。各成分が $I(1)$ であること、両ベクトルから作る二つの系列が $I(0)$ であること、空間の次元が2であることをそれぞれ確かめました。
<!-- definition-example-end -->

### 共通トレンドが複数ある場合

$k$ 系列に、$q$ 本の累積ショック $s_t$ が係数行列 $B$ を通して混ざるとします。$B$ の各行は1系列の長期トレンドへの感応度です。$B^\top b=0$ を満たす係数で $b^\top x_t$ を作れば、すべての共通トレンドが消えます。

<a id="prop-u4-14-common-trend-rank"></a>

<!-- formal-statement-start -->
> **命題（共通確率トレンドと共和分ランク）**  
> $1\le q<k$ とし、$q$ 次元の累積ショック $s_t$ を次で定める。

$$
s_0=0,\qquad s_t=\sum_{j=1}^t\varepsilon_j.
$$

> $\varepsilon_j$ は独立同分布で平均0、正定値共分散 $\Sigma$ を持つ。$u_t\in\mathbb R^k$ は二次定常なベクトル過程でショック列全体と独立とする。$B\in\mathbb R^{k\times q}$ は列ランク $q$ で各行が非零とし、

$$
x_t=Bs_t+u_t
$$

> と置く。このとき各成分は $I(1)$、共和分空間は $\ker B^\top$、ランクは $k-q$ である。
<!-- formal-statement-end -->

### 証明の見取り図

系列 $b^\top x_t$ の分散は、累積ショック由来の $t$ 倍の項と定常項に分けられます。前者の係数が0となる条件を正定値共分散で判断します。

<!-- proof-start -->
### 証明

独立なショックの和から $E[s_t]=0$、$\operatorname{Cov}(s_t)=t\Sigma$ です。$u$ と $s$ の独立性、および定常性により

$$
\operatorname{Var}(b^\top x_t)
=t(B^\top b)^\top\Sigma(B^\top b)
+\operatorname{Var}(b^\top u_t).
$$

$\Sigma\succ0$ なので $B^\top b\ne0$ なら第1項は正の係数で発散し、この系列は $I(0)$ でありません。$B^\top b=0$ なら $b^\top x_t=b^\top u_t$ となって二次定常です。従って $\mathcal C=\ker B^\top$ です。

各行 $e_i^\top B$ は非零なので、同じ計算で $x_{i,t}$ の水準分散は発散します。一方 $\Delta x_t=B\varepsilon_t+\Delta u_t$ は二次定常なベクトル過程です。よって各成分は $I(1)$ です。

列ランクが $q$ なので $B^\top$ の像の次元は $q$ です。[階数・退化次数の定理](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)を線形写像 $B^\top:\mathbb R^k\to\mathbb R^q$ に適用すると

$$
\dim\ker B^\top=k-\operatorname{rank}(B^\top)=k-q
$$

が従います。
<!-- proof-end -->

この結論は**指定した共通トレンドモデルの下で**正確です。一般の VECM で $\Pi$ のランクが $r$ なら無条件に単位根が $k-r$ 個と断定できるわけではなく、2階和分や他の不安定根を排除する正則性が必要です。

## 2. VARの水準式を誤差修正に書き換える

VAR（ベクトル自己回帰）は各変数の水準を、過去のすべての変数から予測する式です。例えば $k$ 変量 VAR(2) は

$$
x_t=c+A_1x_{t-1}+A_2x_{t-2}+\varepsilon_t
$$

と書きます。$A_i$ は $k\times k$ 行列、$c$ は定数ベクトルです。両辺から $x_{t-1}$ を引き、$x_{t-2}=x_{t-1}-\Delta x_{t-1}$ を代入すれば、過去の水準と短期階差が現れます。

<a id="def-u4-14-vecm"></a>

<!-- formal-statement-start -->
> **定義（誤差修正表現 VECM）**  
> $p\ge1$、$x_t\in\mathbb R^k$、行列 $\Pi,\Gamma_i\in\mathbb R^{k\times k}$ を用いた

$$
\Delta x_t=c+\Pi x_{t-1}
+\sum_{i=1}^{p-1}\Gamma_i\Delta x_{t-i}+\varepsilon_t
$$

> をベクトル誤差修正表現（VECM）と呼ぶ。$\Pi$ がランク $r$ なら $\Pi=\alpha\beta^\top$ と表せる（$\alpha,\beta$ は $k\times r$、列ランク $r$）。$\beta^\top x_{t-1}$ が定常な長期偏差となるモデルでは、$\alpha\beta^\top x_{t-1}$ はその偏差による調整項である。$\Pi$ のランクだけでは $\beta^\top x_t$ の定常性は保証されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u4-14-vecm -->
**定義の確認**：$\alpha=(0,-1)^\top$、$\beta=(-1,1)^\top$、$c=0$、$p=1$ とすると

$$
\Pi=\alpha\beta^\top=
\begin{pmatrix}0&0\\1&-1\end{pmatrix}.
$$

$S_t=S_{t-1}+\varepsilon_t$、$x_t=(S_t,S_t+\eta_t)^\top$ で、$\varepsilon_t,\eta_t$ は互いにも時点間でも独立な平均0・分散1のショックとします。$\beta^\top x_t=\eta_t$ は二次定常で、

$$
\Delta x_t=
\Pi x_{t-1}+
\begin{pmatrix}\varepsilon_t\\\varepsilon_t+\eta_t\end{pmatrix}.
$$

実際、第2行は $-\eta_{t-1}+\varepsilon_t+\eta_t$ で元の水準の階差と一致します。ショックベクトルは過去から独立です。前期の第2水準が第1水準より高いとき、調整項は第2水準を下げる符号になります。
<!-- definition-example-end -->

<a id="prop-u4-14-var-vecm"></a>

<!-- formal-statement-start -->
> **命題（VAR(p) の誤差修正表現）**  
> $p\ge1$、$A_j\in\mathbb R^{k\times k}$ について $x_t=c+\sum_{j=1}^pA_jx_{t-j}+\varepsilon_t$ が成り立てば、同じ系列は上記 VECM を満たし、

$$
\Pi=\sum_{j=1}^pA_j-I_k,\qquad
\Gamma_i=-\sum_{j=i+1}^pA_j\quad(1\le i<p)
$$

> である。この等式は代数的恒等式であり、定常性の仮定を必要としない。
<!-- formal-statement-end -->

### 証明の見取り図

古い水準は $x_{t-j}=x_{t-1}-\sum_{i=1}^{j-1}\Delta x_{t-i}$。この式を代入し、有限の二重和で同じ差分ラグをまとめます。

<!-- proof-start -->
### 証明

両辺から $x_{t-1}$ を引くと

$$
\Delta x_t=c+(A_1-I_k)x_{t-1}
+\sum_{j=2}^pA_jx_{t-j}+\varepsilon_t.
$$

$j\ge2$ に上の水準の恒等式を代入すると

$$
\begin{aligned}
\Delta x_t
&=c+\left(\sum_{j=1}^pA_j-I_k\right)x_{t-1}
-\sum_{j=2}^pA_j\sum_{i=1}^{j-1}\Delta x_{t-i}+\varepsilon_t\\
&=c+\Pi x_{t-1}
-\sum_{i=1}^{p-1}\left(\sum_{j=i+1}^pA_j\right)
\Delta x_{t-i}+\varepsilon_t.
\end{aligned}
$$

内側の差分 $\Delta x_{t-i}$ が現れるのは $j\ge i+1$ の項に限るので、和の順序を交換できました。$p=1$ なら差分ラグの和は空です。特に VAR(2) は $\Pi=A_1+A_2-I_k$、$\Gamma_1=-A_2$ です。
<!-- proof-end -->

### ランク分解の非一意性

$\Pi$ の列空間の基底を選べば、$\Pi$ を $\alpha\beta^\top$ と分解できます。ただし $\beta$ の列は長期偏差の座標の選び方に依存します。

<a id="prop-u4-14-rank-factorization"></a>

<!-- formal-statement-start -->
> **命題（ランク分解と基底変換の不変性）**  
> $\Pi\in\mathbb R^{k\times k}$ のランクが $0<r<k$ なら、列ランク $r$ の $k\times r$ 行列 $\alpha,\beta$ で $\Pi=\alpha\beta^\top$ と書ける。任意の可逆な $r\times r$ 行列 $H$ に対し

$$
\beta_*=\beta H,\qquad\alpha_*=\alpha H^{-\top}
$$

> と置けば $\Pi=\alpha_*\beta_*^\top$ であり、$\beta_*,\beta$ の列空間は等しい。
<!-- formal-statement-end -->

### 証明の見取り図

$\Pi$ の像の基底を $\alpha$ に選び、各列の係数を $\beta^\top$ にまとめます。基底を変えると逆変換が $\alpha$ に移り、積は不変です。

<!-- proof-start -->
### 証明

$\Pi$ の像の基底を $r$ 列の $\alpha$ に取ります。$\Pi$ の各列を $\alpha$ で表す係数を集めれば $\Pi=\alpha C$ と書けます。$\Pi$ のランクが $r$ なので $C$ の行ランクも $r$ です。$\beta=C^\top$ は列ランク $r$ となります。続いて

$$
\alpha_*\beta_*^\top
=\alpha H^{-\top}(\beta H)^\top
=\alpha H^{-\top}H^\top\beta^\top
=\alpha\beta^\top.
$$

$H$ が可逆だから $\{\beta Hz:z\in\mathbb R^r\}=\{\beta z:z\in\mathbb R^r\}$ で、列空間も同じです。
<!-- proof-end -->

### 3系列のVECMを手計算する

第1節の3系列へ戻り、

$$
\beta=\begin{pmatrix}-1&-2\\1&0\\0&1\end{pmatrix},
\qquad
\alpha=\begin{pmatrix}0&0\\-1&0\\0&-1\end{pmatrix}
$$

とします。$\beta^\top x_{t-1}=(\eta_{t-1},\zeta_{t-1})^\top$ ですから

$$
\Delta x_t=\alpha\beta^\top x_{t-1}+e_t,\qquad
e_t=\begin{pmatrix}\varepsilon_t\\\varepsilon_t+\eta_t\\2\varepsilon_t+\zeta_t\end{pmatrix}
$$

と書けます。右辺の第2行は $\varepsilon_t+\eta_t-\eta_{t-1}$、第3行は $2\varepsilon_t+\zeta_t-\zeta_{t-1}$ で、実際の階差です。$e_t$ の共分散は

$$
\Omega=\begin{pmatrix}1&1&2\\1&2&2\\2&2&5\end{pmatrix}
$$

です。独立で分散1のショックから可逆な行列 $\begin{pmatrix}1&0&0\\1&1&0\\2&0&1\end{pmatrix}$ によって得られ、その[行列式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)は1です。従って $\Omega$ は正定値です。$\alpha\beta^\top x_{t-1}=(0,-\eta_{t-1},-\zeta_{t-1})^\top$ が長期偏差への調整を担います。

## 3. Johansen法が計算する固有値の意味

2系列の[Engle–Granger残差検定](../U4-13/index.md#def-u4-13-engle-granger)では一つの長期回帰から出発しました。ランク2の可能性があるとき、別々の回帰2本の係数が線形独立とは限りません。Johansen法は VECM の $\Pi$ に対してランクを制約し、**正規尤度**を同時に最大化します。

ここでは $\varepsilon_t$ を、平均0、正定値共分散 $\Omega$ の多変量正規独立同分布と仮定します。ショックは過去から独立とします。短期の差分ラグと、**長期係数と独立に推定できる無制約の決定論的項**（例えば差分式の無制約定数）を、今期階差と前期水準の双方から線形回帰で取り除きます。それぞれの残差を $R_{0t}$、$R_{1t}$ とします。共和分関係の内部だけに置く**制限定数**は同じ操作で取り除けません。その仕様では定数を含む長期関係から尤度を組み直す必要があり、以下の単純な残差化の導出とは区別します。有効標本数を $T$ とし、

$$
S_{ij}=\frac1T\sum_tR_{it}R_{jt}^\top,\qquad S_{10}=S_{01}^\top
$$

と置きます。$S_{00}$ は階差残差の共分散、$S_{11}$ は水準残差の共分散、$S_{01}$ は交差共分散です。$S_{00},S_{11}$ と全体のブロック標本共分散が正定値である状況を扱います。正定値な $S_{11}$ の $S_{11}^{1/2}$ は、[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で得られる**正定値対称平方根**で、$S_{11}^{-1/2}$ はその逆行列です。$S_{00}^{\pm1/2}$ も同様です。

<a id="prop-u4-14-johansen-eigen"></a>

<!-- formal-statement-start -->
> **命題（Gaussian VECM の縮約ランク尤度）**  
> 上記の正規 VECM の短期項を除いた残差から作った $S_{ij}$ は仮定した正定値性を満たすとする。$0\le r\le k$、$\operatorname{rank}(\Pi)\le r$ という制約下で正規尤度を最大化する。対称行列

$$
M=S_{11}^{-1/2}S_{10}S_{00}^{-1}S_{01}S_{11}^{-1/2}
$$

> の固有値を大きい順に $\lambda_1\ge\cdots\ge\lambda_k$ とすると $0\le\lambda_i<1$ であり、最大化した残差共分散の行列式は

$$
\det\widehat\Omega_r=\det(S_{00})\prod_{i=1}^{r}(1-\lambda_i)
$$

> である。$r=0$ では空積を1とする。同じ固有値は

$$
S_{10}S_{00}^{-1}S_{01}v=\lambda S_{11}v
$$

> の一般化固有値で、対応する固有ベクトルが推定長期関係の方向を与える。
<!-- formal-statement-end -->

### 証明の見取り図

現在の差分残差 $R_0$ を、$\beta^\top R_1$ に回帰します。正規尤度が大きくなるのは、残差共分散の行列式を小さくできたときです。水準の尺度を $S_{11}$ でそろえると、その削減方向を一般化固有値で選べます。

<!-- proof-start -->
### 証明

$\beta$ の列が独立なら、$\beta^\top R_{1t}$ を説明変数とする行列の正規方程式は

$$
\widehat\alpha(\beta)\,\beta^\top S_{11}\beta=S_{01}\beta
$$

です。$\beta^\top S_{11}\beta$ は可逆なので

$$
\widehat\alpha(\beta)=S_{01}\beta(\beta^\top S_{11}\beta)^{-1}.
$$

残差平方和の積を展開して代入すると

$$
\widehat\Omega(\beta)=S_{00}-S_{01}\beta
(\beta^\top S_{11}\beta)^{-1}\beta^\top S_{10}.
$$

[尤度関数](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-likelihood)の対数を取ると、正規誤差の対数尤度は $\Omega$ に依存する部分が次になります。

$$
\ell(\Omega,\beta)
=-\frac T2\left\{\log\det\Omega+
\operatorname{tr}\!\left[\Omega^{-1}\widehat\Omega(\beta)\right]\right\}
+\mathrm{const}.
$$

ここで $\operatorname{tr}(A)$ は正方行列 $A$ の対角成分の和です。$\widehat\Omega(\beta)\succ0$ はブロック標本共分散の正定値性から従います。$F=\widehat\Omega(\beta)$ と置き、$G=F^{1/2}\Omega^{-1}F^{1/2}$ の正の固有値を $\mu_1,\ldots,\mu_k$ とします。行列式とトレースを順に書き直すと

$$
\log\det\Omega+\operatorname{tr}(\Omega^{-1}F)
=\log\det F+\sum_{j=1}^k(\mu_j-\log\mu_j).
$$

正数 $\mu$ について $\mu-\log\mu\ge1$（導関数 $1-1/\mu$ が $\mu=1$ で符号を変える）なので、右辺の最小値は $\log\det F+k$ です。等号は全 $\mu_j=1$、すなわち $G=I_k$、$\Omega=F$ のときに限ります。したがって最大化した対数尤度は定数を除いて $-T\log\det\widehat\Omega(\beta)/2$ となり、残差共分散の行列式を最小にします。

まず $r\ge1$ とし、$V=S_{11}^{1/2}\beta(\beta^\top S_{11}\beta)^{-1/2}$ と置くと $V^\top V=I_r$ です。次に、水準残差から階差残差への共分散を両側で規格化した $k\times r$ 行列

$$
A=S_{00}^{-1/2}S_{01}\beta(\beta^\top S_{11}\beta)^{-1/2}
$$

を作ります。先ほどの残差式に代入すると

$$
\widehat\Omega(\beta)=S_{00}^{1/2}(I_k-AA^\top)S_{00}^{1/2},
\qquad A^\top A=V^\top MV
$$

です。行列式の積の法則から、ここでは次のブロック行列の第1行側と第2行側をそれぞれ消去する恒等式を使います。

$$
\det\begin{pmatrix}I_k&A\\A^\top&I_r\end{pmatrix}
=\det(I_r-A^\top A)
=\det(I_k-AA^\top).
$$

左上ブロックを固定して下行から $A^\top$ 倍を引けば中央の式、右下ブロックを固定して上行から $A$ 倍を引けば右の式です。従って

$$
\det\widehat\Omega(\beta)=\det(S_{00})\det(I_r-V^\top MV)
$$

が導けます。

$M$ は $S_{00}^{-1/2}S_{01}S_{11}^{-1/2}$ の転置と自身の積なので対称半正定値です。さらに任意の非零 $b$ に対し、ブロック標本共分散の二次形式へ $(a,b)$、$a=-S_{00}^{-1}S_{01}b$ を代入すると

$$
b^\top(S_{11}-S_{10}S_{00}^{-1}S_{01})b>0.
$$

したがって $I_k-M=S_{11}^{-1/2}(S_{11}-S_{10}S_{00}^{-1}S_{01})S_{11}^{-1/2}\succ0$ であり、すべての固有値は $0\le\lambda_i<1$ です。

$V^\top MV$ の固有値を $\theta_1\ge\cdots\ge\theta_r$ とします。$M$ と $V^\top MV$ は実対称なので、[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により正規直交固有基底を取れます。

$i\le r$ を固定します。$V^\top MV$ の上位 $i$ 個の固有ベクトルの張る $i$ 次元空間を $L_i\subset\mathbb R^r$、$M$ の第 $i$ から第 $k$ までの固有ベクトルの張る $(k-i+1)$ 次元空間を $W_i\subset\mathbb R^k$ とします。$V^\top V=I_r$ なので $\dim(VL_i)=i$ です。両空間の次元の和は $k+1$ ですから $VL_i$ と $W_i$ は非零に交わります。交わりから長さ1の $z=Vw$ を取れば、$w\in L_i$ も長さ1であり、

$$
\theta_i\le w^\top(V^\top MV)w=z^\top Mz\le\lambda_i
$$

です。左の不等号は上位 $i$ 固有空間に属すること、右は第 $i$ 以下の固有空間に属することから従います。よって $\theta_i\le\lambda_i$ です。ゆえに

$$
\det(I_r-V^\top MV)=\prod_{i=1}^r(1-\theta_i)
\ge\prod_{i=1}^r(1-\lambda_i).
$$

$V$ の列を最大 $r$ 個の固有値の正規直交固有ベクトルに選ぶと等号となり、結論を得ます。$r=0$ では長期回帰項がなく $\widehat\Omega_0=S_{00}$ です。

最後に $Mv=\lambda v$ で $w=S_{11}^{-1/2}v$ と置き、左から $S_{11}^{1/2}$ を掛けると $S_{10}S_{00}^{-1}S_{01}w=\lambda S_{11}w$ が得られ、一般化固有値表示になります。上位 $r$ 個の正規直交固有ベクトル $v_1,\ldots,v_r$ を列にした $Q_r$ に対し、$\widehat\beta=S_{11}^{-1/2}Q_r$ を選べば $\widehat\beta^\top S_{11}\widehat\beta=I_r$ です。これが縮約尤度を最大にする長期係数空間の一つの基底です。
<!-- proof-end -->

固有値は**残差化した水準と階差の結び付き**を表す量で、利益確率でも無裁定性の確率でもありません。

### トレース統計量と最大固有値統計量

先ほどの残差共分散の行列式から、ランク候補ごとの最大化した対数尤度の差を取ります。この差に2を掛けた統計量を使います。

<a id="def-u4-14-johansen-tests"></a>

<!-- formal-statement-start -->
> **定義（Johansenのランク検定統計量）**  
> 上記の正規 VECM、固定したラグと決定論的項、有効標本数 $T$ に対し、$0\le r<k$ について

$$
\mathrm{LR}_{\mathrm{trace}}(r)
=-T\sum_{i=r+1}^{k}\log(1-\lambda_i),
$$

$$
\mathrm{LR}_{\mathrm{max}}(r)
=-T\log(1-\lambda_{r+1})
$$

> と定める。前者は帰無仮説 $\operatorname{rank}(\Pi)\le r$ と全ランクの代替を、後者はランク $r$ とランク $r+1$ を比較する。これを共和分ランクの検定として使う際は、水準の和分次数と根の安定性などのモデル条件を別に点検する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u4-14-johansen-tests -->
**定義の確認**：$k=2$、$S_{00}=S_{11}=I_2$、$S_{01}=S_{10}=\operatorname{diag}(3/5,1/5)$ とします。$S_{11}^{-1/2}=I_2$ なので $M=S_{10}S_{01}=\operatorname{diag}(9/25,1/25)$ です。ブロック共分散の正定値性も $S_{00}-S_{01}S_{11}^{-1}S_{10}=\operatorname{diag}(16/25,24/25)\succ0$ で確認できます。固有値は大きい順に $9/25,1/25$ です。$T=100$ とすると

$$
\mathrm{LR}_{\mathrm{trace}}(0)
=-100\{\log(16/25)+\log(24/25)\},
$$

$$
\mathrm{LR}_{\mathrm{trace}}(1)
=\mathrm{LR}_{\mathrm{max}}(1)
=-100\log(24/25).
$$

正の統計量を得ても、臨界値を指定していないので5%で棄却できるとは言えません。
<!-- definition-example-end -->

[ADFの非標準帰無分布](../U4-12/index.md#thm-u4-12-df-limit)と同様、Johansenのランク検定では一般のカイ二乗分布を機械的に適用できません。次元・帰無ランク・定数・トレンドの置き方によって臨界値は異なります。ランクが $k$ の場合も、適切な安定性の下で水準が $I(0)$ となる場合を、全成分が $I(1)$ のモデルと混同しないでください。

## 4. 正規化と識別は別の問い

[ランク分解の不変性](#prop-u4-14-rank-factorization)から、$\beta$ を $\beta H$ に変更しても $\Pi$ は同じです。**正規化**は基準の取り方を固定する操作です。例えば $\beta$ の選んだ $r$ 行の $r\times r$ 部分行列が可逆なら、その部分が $I_r$ になるように右から逆行列を掛けます。部分行列が特異なら、その行の組では正規化できません。

一方、**識別**とは特定の長期関係を価格理論・制度的制約などと対応付けるため、別の根拠をもって係数の零制約や比率制約を課すことです。長期関係の空間が推定できただけで、どの基底が唯一の経済的関係かは決まりません。$\alpha$ のある行が零であることも、何を対象パラメータとするかを定めず「絶対的な外生性」を証明するものではありません。

## 5. 合成実験で過大ランクと構造変化を見抜く

実験を再現するため、疑似乱数の初期整数を $20261114$ とします。毎回 $z\leftarrow(1664525z+1013904223)\bmod 2^{32}$ で更新し $U=(z+1/2)/2^{32}$ を得ます。連続2個の一様数から Box–Muller の $\sqrt{-2\log U_1}\cos(2\pi U_2)$ と $\sqrt{-2\log U_1}\sin(2\pi U_2)$ を作り、必要な正規ショックを順番に使用します。数値結果を報告するときは乱数の消費順も保存します。

時点0〜360で次の3モデルをそれぞれ生成します。M1は第1節の $(S,S+\eta,2S+\zeta)$、M2は独立な3本のランダムウォーク、M3は時点240まではM1で時点241以降だけ第3系列の係数を2から3へ変えたものです。理論上M1の共和分ランクは2、M2は0です。M3では全期間を通して固定の共和分係数を適用する前提が壊れます。

推定には時点1〜240を使い、VARラグ $p=1,2$ と「定数なし」「差分式の無制約定数」をそれぞれ試します。共和分関係内にだけ定数を置く場合は、第3節の単純な残差化と別の尤度仕様が必要です。各仕様で固有値、トレース統計量、**その仕様専用の**臨界値、推定 $\beta$、残差自己相関を報告します。階差ラグの数は $p-1$ です。推定係数は固定し、241〜360の偏差を評価します。将来を使った過去の係数の再推定は禁止です。

これは**再現手順**であり、実行していないソフトウェアの棄却率は記しません。実験で見たいのは、ラグ不足による残差相関、決定論的項への感度、M2での過大ランク推定、M3での関係崩壊です。これらは統計的にランクが推定できても取引の利益が確定しない理由にもなります。

## 演習：空間・VECM・ランク判定

<a id="ex-u4-14-a1"></a>
### 演習 U4-14-A1：3系列の共和分空間

- Level: A

$S_t$ は分散1の独立ショックの累積、$\eta_t,\zeta_t$ はそれと独立な平均0・分散1の独立同分布列とする。$x_t=(S_t,2S_t+\eta_t,S_t+\zeta_t)^\top$ について、各水準の和分次数、共和分空間の条件・基底・ランクを求めよ。

<!-- solution-start -->
**詳細解答**：水準分散は $t,4t+1,t+1$ と発散し、階差は定常なので各成分は $I(1)$ です。$b^\top x_t=(b_1+2b_2+b_3)S_t+b_2\eta_t+b_3\zeta_t$ より

$$
\operatorname{Var}(b^\top x_t)
=t(b_1+2b_2+b_3)^2+b_2^2+b_3^2.
$$

定常になる必要十分条件は $b_1+2b_2+b_3=0$ であり、基底は $(-2,1,0)^\top,(-1,0,1)^\top$、ランクは2です。それぞれの基底ベクトルを係数に使うと、系列は $\eta_t,\zeta_t$ となるので、十分性も直接確認できます。
<!-- solution-end -->

<a id="ex-u4-14-a2"></a>
### 演習 U4-14-A2：VAR(2)の変換

- Level: A

$A_1=\operatorname{diag}(6/5,3/2)$、$A_2=\operatorname{diag}(-1/5,-4/5)$、$c=0$ の VAR(2) について、$\Pi,\Gamma_1,\operatorname{rank}(\Pi)$ を求めよ。

<!-- solution-start -->
**詳細解答**：[VARのVECM変換](#prop-u4-14-var-vecm)へ代入して

$$
\begin{aligned}
\Pi&=A_1+A_2-I_2
=\operatorname{diag}(6/5-1/5-1,\ 3/2-4/5-1)\\
&=\operatorname{diag}(0,-3/10),\\
\Gamma_1&=-A_2=\operatorname{diag}(1/5,4/5).
\end{aligned}
$$

$\Pi$ は非零対角成分が1個なのでランク1です。ランクの代数計算だけでは真の水準の和分次数は確定しません。
<!-- solution-end -->

<a id="ex-u4-14-a3"></a>
### 演習 U4-14-A3：修正方向の符号

- Level: A

$\alpha=(-1/5,2/5)^\top$、$\beta=(1,-2)^\top$ に対し $\Pi$ を求めよ。偏差 $\beta^\top x_{t-1}>0$ のときの2成分への調整符号と、偏差自身への平均的な調整を示せ。短期ラグとショックの条件付き平均は0とする。

<!-- solution-start -->
**詳細解答**：

$$
\Pi=\alpha\beta^\top
=\begin{pmatrix}-1/5&2/5\\2/5&-4/5\end{pmatrix}.
$$

$u_{t-1}=\beta^\top x_{t-1}>0$ なら調整は $\alpha u_{t-1}=(-u_{t-1}/5,2u_{t-1}/5)^\top$ で、第1成分は負、第2成分は正です。偏差自身の条件付き平均変化は $\beta^\top\alpha u_{t-1}=(-1/5-4/5)u_{t-1}=-u_{t-1}$ です。従って条件付き平均では、次期の偏差が0に戻ります。
<!-- solution-end -->

<a id="ex-u4-14-a4"></a>
### 演習 U4-14-A4：ランク2の係数ベクトルの組み替え

- Level: A

$\Pi=\alpha\beta^\top$ のランクは2とする。$H=\operatorname{diag}(2,3)$ に対し、同じ $\Pi$ を表す $\alpha_*,\beta_*$ を書き、なぜ2列の張る空間も同じか説明せよ。

<!-- solution-start -->
**詳細解答**：$\beta_*=\beta H$、$\alpha_*=\alpha H^{-\top}=\alpha\operatorname{diag}(1/2,1/3)$ とすれば

$$
\alpha_*\beta_*^\top
=\alpha\operatorname{diag}(1/2,1/3)
\operatorname{diag}(2,3)\beta^\top=\Pi.
$$

各列を0でない数で拡大縮小しただけなので列空間は同じです。経済的識別がなされたわけではありません。
<!-- solution-end -->

<a id="ex-u4-14-a5"></a>
### 演習 U4-14-A5：固有値と行列式

- Level: A

$S_{00}=S_{11}=I_2$、$S_{01}=S_{10}=\operatorname{diag}(3/5,1/5)$、$T=100$ とする。固有値、ランク1の $\det\widehat\Omega_1$、$\mathrm{LR}_{\mathrm{trace}}(1)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$M=S_{10}S_{01}=\operatorname{diag}(9/25,1/25)$ です。大きい固有値は $9/25$、小さい固有値は $1/25$ なので、[縮約ランク尤度](#prop-u4-14-johansen-eigen)から

$$
\det\widehat\Omega_1=1(1-9/25)=16/25,
$$

$$
\mathrm{LR}_{\mathrm{trace}}(1)=-100\log(1-1/25)
=-100\log(24/25).
$$

ランク1で既に説明した第1固有値をトレースの残余和に再加算しないことに注意します。
<!-- solution-end -->

<a id="ex-u4-14-b1"></a>
### 演習 U4-14-B1：二つの共通トレンド

- Level: B

互いに独立で分散1のショックを蓄積した $S_t^{(1)},S_t^{(2)}$ と、それらに独立な定常な3次元 $u_t$ に対し

$$
x_t=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}
\begin{pmatrix}S_t^{(1)}\\S_t^{(2)}\end{pmatrix}+u_t
$$

とする。共和分ランクと基底を示し、外側の係数では定常にならない理由を分散で証明せよ。

<!-- solution-start -->
**詳細解答**：$B^\top b=(b_1+b_3,b_2+b_3)^\top$ なので、[共通トレンドの命題](#prop-u4-14-common-trend-rank)に従い

$$
\operatorname{Var}(b^\top x_t)
=t\{(b_1+b_3)^2+(b_2+b_3)^2\}
+\operatorname{Var}(b^\top u_t).
$$

有限な一定分散には $b_1=-b_3$ と $b_2=-b_3$ が同時に必要で、基底は $(-1,-1,1)^\top$ です。従って $r=1=3-2$。空間外の係数なら波括弧の中が正で、分散は時点とともに増大します。
<!-- solution-end -->

<a id="ex-u4-14-b2"></a>
### 演習 U4-14-B2：3系列VECMを構成する

- Level: B

第1節の $x_t=(S_t,S_t+\eta_t,2S_t+\zeta_t)^\top$ に対し、$\beta$ の列を $(-1,1,0)^\top,(-2,0,1)^\top$ とする。短期ラグなしの VECM の $\alpha$ と $e_t$ を求め、誤差共分散が正定値であることを確かめよ。

<!-- solution-start -->
**詳細解答**：$\beta^\top x_{t-1}=(\eta_{t-1},\zeta_{t-1})^\top$、差分は

$$
\Delta x_t=\begin{pmatrix}
\varepsilon_t\\\varepsilon_t+\eta_t-\eta_{t-1}\\
2\varepsilon_t+\zeta_t-\zeta_{t-1}
\end{pmatrix}.
$$

従って $\alpha=\begin{pmatrix}0&0\\-1&0\\0&-1\end{pmatrix}$ と $e_t=(\varepsilon_t,\varepsilon_t+\eta_t,2\varepsilon_t+\zeta_t)^\top$ で $\Delta x_t=\alpha\beta^\top x_{t-1}+e_t$ と表せます。$e_t=L(\varepsilon_t,\eta_t,\zeta_t)^\top$、$L=\begin{pmatrix}1&0&0\\1&1&0\\2&0&1\end{pmatrix}$ は行列式1の可逆行列です。従って任意の非零 $v$ について $v^\top\Omega v=\|L^\top v\|^2>0$ であり、$\Omega=LL^\top$ は正定値です。
<!-- solution-end -->

<a id="ex-u4-14-b3"></a>
### 演習 U4-14-B3：過大ランクの判断ミス

- Level: B

$k=3$、$T=100$、固有値が降順に $(0.64,0.25,0.04)$ とする。トレース統計量の $r=0,1,2$ と最大固有値統計量の $r=1$ を求めよ。「すべて正だからランク3」「結果を見て切片とラグを選んでよい」という報告の誤りを述べよ。

<!-- solution-start -->
**詳細解答**：

$$
\begin{aligned}
\mathrm{LR}_{\mathrm{trace}}(0)&=-100\{\log(0.36)+\log(0.75)+\log(0.96)\},\\
\mathrm{LR}_{\mathrm{trace}}(1)&=-100\{\log(0.75)+\log(0.96)\},\\
\mathrm{LR}_{\mathrm{trace}}(2)&=-100\log(0.96),\\
\mathrm{LR}_{\mathrm{max}}(1)&=-100\log(0.75).
\end{aligned}
$$

それぞれ約 $135.0,32.9,4.08,28.8$ です。正であることは棄却条件ではなく、帰無ランクと決定論的仕様に合う臨界値が必要です。結果を見てラグやトレンドを反復選択すれば、固定仕様を前提とした名目の第一種過誤率は通常維持されません。残差相関と評価期間の安定性も別途確認します。
<!-- solution-end -->

<a id="ex-u4-14-b4"></a>
### 演習 U4-14-B4：基底と識別を区別する

- Level: B

$r=2$ の $\Pi=\alpha\beta^\top$ に対し $H=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ を使う。新しい長期ベクトルと $\alpha_*$ を求め、経済的な関係が識別されたといえるか論ぜよ。

<!-- solution-start -->
**詳細解答**：$\beta=(\beta_1,\beta_2)$ と書けば $\beta H=(\beta_1,\beta_1+\beta_2)$ です。$H^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ より

$$
\alpha_*=\alpha H^{-\top}
=\alpha\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

$\alpha_*(\beta H)^\top=\alpha H^{-\top}H^\top\beta^\top=\Pi$ となるので、予測式は変わらず張る空間も変わりません。どの列を特定の価格理論へ対応付けるかは、経済的な追加制約がなければ識別されません。
<!-- solution-end -->

<a id="ex-u4-14-c1"></a>
### 演習 U4-14-C1：検定と標本外の崩壊

- Level: C

$S_t=\sum_{j=1}^t\varepsilon_j$、$x_t=(S_t,S_t+\eta_t,2S_t+\zeta_t)^\top$ を時点1〜240で観測する。すべてのショックは平均0・分散1、系列間・時点間で独立同分布とする。ある固定ラグ・定数仕様の Johansen 計算で有効標本数 $T=238$、仮想の固有値 $(0.49,0.16,0.01)$ を得た（これらは**手計算用の仮定値**であり実測結果ではない）。時点241〜360では第3成分だけ $3S_t+\zeta_t$ に変わった。

1. 学習期の真のランクと基底を分散で示せ。
2. 学習期に正確な $\alpha,\beta,e_t$ を構成して VECM を確認せよ。
3. ランク1、ランク2のトレース統計量を導出し、5%での結論に必要な追加情報を述べよ。
4. 学習期の第2共和分ベクトルを固定した評価期の偏差を求め、分散から定常性を判定せよ。
5. この結果が無裁定利益を証明しない理由を取引単位、費用、情報時点から述べよ。

<!-- solution-start -->
**詳細解答**：

(1) 任意の $b$ に対する分散は $t(b_1+b_2+2b_3)^2+b_2^2+b_3^2$ です。従って $b_1+b_2+2b_3=0$ が必要十分で、$(-1,1,0)^\top,(-2,0,1)^\top$ が基底、ランク2です。

(2) 第1節と同じく

$$
\beta=\begin{pmatrix}-1&-2\\1&0\\0&1\end{pmatrix},\qquad
\alpha=\begin{pmatrix}0&0\\-1&0\\0&-1\end{pmatrix}
$$

とし、$e_t=(\varepsilon_t,\varepsilon_t+\eta_t,2\varepsilon_t+\zeta_t)^\top$ と置きます。$\beta^\top x_{t-1}=(\eta_{t-1},\zeta_{t-1})^\top$ だから

$$
\Delta x_t=\alpha\beta^\top x_{t-1}+e_t
$$

は各成分の階差と一致します。$e_t$ の共分散は、可逆な変換行列 $L$ により $LL^\top\succ0$ です。これは推定ではなく、与えられた生成モデルの正確な構成です。

(3) 降順に並べた固有値から、第2・第3固有値を残す $r=1$ と第3だけを残す $r=2$ の統計量は

$$
\begin{aligned}
\mathrm{LR}_{\mathrm{trace}}(1)
&=-238\{\log(0.84)+\log(0.99)\}\approx43.9,\\
\mathrm{LR}_{\mathrm{trace}}(2)
&=-238\log(0.99)\approx2.39.
\end{aligned}
$$

5%で棄却するかは、固定された切片・トレンド配置、検定対象のランクに対応する**専用臨界値**がないと判定できません。ラグ仕様、単位根前提、残差相関も確認が必要です。母集団の真のランク2と、有限標本からの推定は区別します。

(4) 第2ベクトルは $(-2,0,1)^\top$ なので評価期間の偏差は

$$
-2x_{1,t}+x_{3,t}=-2S_t+(3S_t+\zeta_t)=S_t+\zeta_t.
$$

分散は独立性から $t+1$ と増大します。学習期の偏差 $\zeta_t$ は定常でしたが、係数変化により共通トレンドが消えなくなりました。評価期の情報で学習係数を再推定して過去の判断を修正するのは情報漏洩です。

(5) 共和分係数が価格・対数価格の係数であっても、そのまま株数・現金勘定を指定したことにはなりません。借株、bid/ask、手数料、資金調達、約定の可否、どの情報がいつ利用可能かが未検証です。したがってこれは[全状態裁定](../U4-10/index.md#def-u4-10-statewise-arbitrage)の証明ではなく、将来の純利益の保証でもありません。
<!-- solution-end -->

## 6. 次に何を問うか

共和分空間は「定常な関係が何本あるか」、VECMは「そのずれが変化へどう戻るか」、Johansen法は「その本数をデータでどう推定するか」に答えます。しかし統計的な関係の存在は資産の保有数量や取引損益を定めません。次講 U4-15 では、残差を実際に売買できる spread へ変換する条件を検討します。
