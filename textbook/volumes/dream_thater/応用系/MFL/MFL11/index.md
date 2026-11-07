# MFL11 Laplacian Eigenmaps

<!-- definition-example-audit: strict -->

## 1. 近い点を近く置く、という問いを式にする

[Isomap](../MFL9/index.md#def-mfl9-isomap)はグラフの最短路を座標化し、[LLE](../MFL10/index.md#def-mfl10-embedding)は近傍の再構成係数を保存した。それに対し Laplacian Eigenmaps は、**重みの大きな辺で結ばれた点同士を、低次元でもできるだけ近く置く**という目的を直接最小化する。これは元の長い距離を復元する命題ではない。

例えば点1と2、点2と3だけが結ばれていれば、座標 $y_1,y_2,y_3\in\mathbb R$ に対して $(y_1-y_2)^2+(y_2-y_3)^2$ を小さくしたい。しかし全部を0に置けば常に最小値0になる。そこで、座標の平均を0にし、大きさを1へ規格化する制約が要る。**どの平均と大きさを使うか**が次数正規化の要点である。

入力は $n\ge2$ 個の観測点 $z_1,\ldots,z_n\in\mathbb R^D$ とする。添字集合を $V=\{1,\ldots,n\}$ と置き、[MFL7の半径・$k$ 近傍](../MFL7/index.md#def-mfl7-knn-symmetrization)を使って、非負対称重みを作る。重みには次の条件を課す。

$$
w_{ij}=w_{ji}\ge0,\qquad w_{ii}=0.
$$

例えば半径内の辺に重み1を置く方法、または辺のある二点に $\exp(-\|z_i-z_j\|^2/\varepsilon)$ を置く方法がある。ここで $\varepsilon>0$ は距離二乗の尺度である。近傍を対称化しない有向行列には、以下の実対称行列の議論をそのまま適用できない。

[SGT1の次数・Laplacian](../../../計算系/SGT/SGT1/index.md#def-sgt1-laplacian)に従い、$d_i=\sum_j w_{ij}$、$W=(w_{ij})$、$D_g=\operatorname{diag}(d_1,\ldots,d_n)$、$L=D_g-W$ と置く。ここでは周囲空間の次元 $D$ と次数行列 $D_g$ を区別する。$L$ は $n\times n$ 対称行列であり、$L\boldsymbol1=0$ である。

## 2. グラフの滑らかさを座標全体へ拡張する

既習の[Dirichletエネルギーの辺表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)は、頂点上の一つの実数値関数 $f$ に対して $f^{\mathsf T}Lf=\sum_{i<j}w_{ij}(f_i-f_j)^2$ を与えた。低次元の各座標をそのような関数とみなせば、何を最小にするかが決まる。

出力の次元を $1\le m\le n-1$ とし、各点の行ベクトルを $y_i=(y_i^{(1)},\ldots,y_i^{(m)})\in\mathbb R^m$ とする。それらを行に並べた $n\times m$ 行列を $Y$ と記す。

<a id="def-mfl11-variational"></a>

<!-- formal-statement-start -->
> **定義（Laplacian Eigenmapsの変分問題）**  
> $n\ge2$ の有限無向非負対称重み付きグラフ $W$、$w_{ii}=0$、$d_i>0$（すべての $i$）と出力次元 $1\le m\le n-1$ を与える。$L=D_g-W$ として、$Y\in\mathbb R^{n\times m}$ の目的関数を

$$
\mathcal E(Y)=\sum_{i<j}w_{ij}\|y_i-y_j\|^2
$$

> とし、次数付き中心化・規格化の条件

$$
Y^{\mathsf T}D_g\boldsymbol1=0,\qquad Y^{\mathsf T}D_gY=I_m
$$

> の下で $\mathcal E(Y)$ を最小化する問題を、次数正規化したLaplacian Eigenmapsの変分問題とする。$I_m$ は $m$ 次単位行列である。各列の次数付き平均は0、次数付きノルムは1、異なる列は次数付き直交となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl11-variational -->
**定義の確認**。三点道 $1-2-3$ に辺重み1を付けると $d=(1,2,1)$ である。$m=1$ として

$$
f=(1,0,-1)^{\mathsf T}/\sqrt2
$$

を試す。次数付き中心化は $1/\sqrt2+2\cdot0-1/\sqrt2=0$、規格化は $1/2+2\cdot0+1/2=1$。したがって可行であり、各辺の差の二乗を足すと $\mathcal E(f)=1/2+1/2=1$ となる。単に同じ値を三点に置くとエネルギー0だが、規格化と中心化を同時には満たせない。
<!-- definition-example-end -->

<a id="prop-mfl11-matrix-energy"></a>

<!-- formal-statement-start -->
> **命題（埋め込みエネルギーの行列表示）**  
> $W$ が $n\times n$ 非負対称、$w_{ii}=0$、$L=D_g-W$ であるとき、任意の $Y\in\mathbb R^{n\times m}$ について

$$
\mathcal E(Y)=\operatorname{tr}(Y^{\mathsf T}LY)
=\sum_{a=1}^{m}(Y_{\cdot a})^{\mathsf T}L Y_{\cdot a}\ge0.
$$

> ここで $Y_{\cdot a}$ は第 $a$ 列、$\operatorname{tr}$ は対角和である。
<!-- formal-statement-end -->

### 証明の見取り図

座標成分ごとに[SGT1の辺表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)を適用し、和の順序を交換する。非負性は各辺の差の平方から分かる。

<!-- proof-start -->
### 証明

列 $f^{(a)}=Y_{\cdot a}$（$a=1,\ldots,m$）とすると、各辺について

$$
\|y_i-y_j\|^2=\sum_{a=1}^m(f_i^{(a)}-f_j^{(a)})^2.
$$

有限和だから順序を交換でき、[Dirichletエネルギー公式](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)を各 $f^{(a)}$ へ適用して

$$
\begin{aligned}
\mathcal E(Y)
&=\sum_{a=1}^m\sum_{i<j}w_{ij}(f_i^{(a)}-f_j^{(a)})^2\\
&=\sum_{a=1}^m(f^{(a)})^{\mathsf T}Lf^{(a)}
=\operatorname{tr}(Y^{\mathsf T}LY).
\end{aligned}
$$

各 $w_{ij}\ge0$ なので非負である。$\square$
<!-- proof-end -->

## 3. 孤立点を除いて、固有値問題に変える

次数付き制約では $D_g$ が正定値でなければ、$D_g^{1/2}$ の逆を取れない。[SGT2の正次数頂点集合](../../../計算系/SGT/SGT2/index.md#def-sgt2-positive-degree)を使い、この問題を定義できる頂点を先に確定する。$V_+=\{i:d_i>0\}$、$V_0=V\setminus V_+$ とし、$V_+$ 上の主小行列を $W_+,D_+,L_+$ と書く。

<a id="def-mfl11-positive-degree"></a>

<!-- formal-statement-start -->
> **定義（正次数集合上のEigenmaps）**  
> $V_+\ne\varnothing$ なら、正次数頂点だけを添字に持つ $N=|V_+|$ 行の座標行列 $Y_+$ を考える。$1\le m\le N-1$ とし、[Laplacian Eigenmapsの変分問題](#def-mfl11-variational)の $D_g,L$ を $D_+,L_+$ に置き換えて解く。$V_0$ の孤立点には、この規則だけでは座標を割り当てない。$V_+=\varnothing$ または $N\le m$ の場合、この規則では指定次元の埋め込みを定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl11-positive-degree -->
**定義の確認**。辺 $(1,2)$、$(2,3)$ の重みを1、点4を孤立とすると、$d=(1,2,1,0)$、$V_+=\{1,2,3\}$、$N=3$ となる。$D_+=\operatorname{diag}(1,2,1)$ は正定値なので $m=1,2$ が許される。一方4行目では正規化因子 $1/\sqrt{d_4}$ が未定義である。点4に原点や点1の座標を勝手に割り当てても、それはこの変分問題の帰結ではない。
<!-- definition-example-end -->

以下の主要定理では、$V_+$ が**連結**であるとする。これは出力座標が一意になるという仮定ではなく、零固有値を一つにするための仮定である。

<a id="thm-mfl11-spectral"></a>

<!-- formal-statement-start -->
> **定理（Laplacian Eigenmapsの固有値最小化）**  
> $N\ge2$ の有限無向非負対称重み付きグラフが正重み辺で連結し、全頂点の次数が正であるとする。$D_g$ と $L$ をその次数行列と組合せLaplacianとし、

$$
\mathcal L=D_g^{-1/2}LD_g^{-1/2}
$$

> の固有値を $0=\mu_1<\mu_2\le\cdots\le\mu_N$ と数える。$1\le m\le N-1$ のとき、[変分問題](#def-mfl11-variational)の最小値は $\mu_2+\cdots+\mu_{m+1}$ である。$\mathcal L$ の正規直交固有ベクトル $u_2,\ldots,u_{m+1}$ を選べば

$$
Y=D_g^{-1/2}[u_2\ \cdots\ u_{m+1}]
$$

> は最小点となり、その各列 $f$ は一般化固有値問題 $Lf=\mu D_gf$ を満たす。選んだ固有値が重複すると、最小化座標の選択にはさらに自由度がある。
<!-- formal-statement-end -->

### 証明の見取り図

$U=D_g^{1/2}Y$ へ変数変換すると規格化条件が通常の直交条件になる。零固有ベクトル $D_g^{1/2}\boldsymbol1$ を避け、[SGT2の正規化スペクトル](../../../計算系/SGT/SGT2/index.md#thm-sgt2-spectrum-kernel)の低い固有値から $m$ 本を選べばよい。固有ベクトルで展開して下界と達成を示す。

<!-- proof-start -->
### 証明

次数は正なので $D_g^{1/2}$ は可逆である。$U=D_g^{1/2}Y$ と置くと

$$
U^{\mathsf T}U=Y^{\mathsf T}D_gY=I_m,
\quad U^{\mathsf T}D_g^{1/2}\boldsymbol1=Y^{\mathsf T}D_g\boldsymbol1=0.
$$

[行列エネルギー](#prop-mfl11-matrix-energy)を代入すれば

$$
\mathcal E(Y)
=\operatorname{tr}(U^{\mathsf T}\mathcal LU).
$$

[正規化Laplacianの核](../../../計算系/SGT/SGT2/index.md#thm-sgt2-spectrum-kernel)は連結性より $\operatorname{span}\{D_g^{1/2}\boldsymbol1\}$ である。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で、この正規化された核ベクトルを $u_1$ とする正規直交固有基底 $u_1,\ldots,u_N$ を選ぶ。

$U$ の各列を $u_r$ で展開すると、$u_1$ との直交性から

$$
U_{\cdot a}=\sum_{r=2}^N c_{ra}u_r,\qquad
\sum_{r=2}^N c_{ra}c_{rb}=\delta_{ab}.
$$

$\alpha_r=\sum_{a=1}^m c_{ra}^2$ と置く。$U$ の列が正規直交なので、$\alpha_r$ は $u_r$ の $m$ 次元列空間への射影の長さの二乗であり $0\le\alpha_r\le1$、$\sum_{r=2}^N\alpha_r=m$ である。また

$$
\mathcal E(Y)=\sum_{r=2}^N\mu_r\alpha_r.
$$

$\sum_{r=2}^{m+1}(1-\alpha_r)=\sum_{r=m+2}^N\alpha_r$ を使い、$\mu_r\le\mu_{m+1}$（$r\le m+1$）、$\mu_r\ge\mu_{m+1}$（$r>m+1$）を適用すると

$$
\begin{aligned}
\mathcal E(Y)-\sum_{r=2}^{m+1}\mu_r
&=\sum_{r=m+2}^N(\mu_r-\mu_{m+1})\alpha_r\\
&\quad+\sum_{r=2}^{m+1}(\mu_{m+1}-\mu_r)(1-\alpha_r)\ge0.
\end{aligned}
$$

二番目の和と最初の和はともに非負である。$U=[u_2\ \cdots\ u_{m+1}]$ を取れば $\alpha_2=\cdots=\alpha_{m+1}=1$、その他は0となり等号が達成される。このとき $Y=D_g^{-1/2}U$ は両制約を満たす。

最後に $\mathcal Lu=\mu u$、$u=D_g^{1/2}f$ を左から $D_g^{1/2}$ 倍して

$$
D_g^{1/2}(D_g^{-1/2}LD_g^{-1/2})D_g^{1/2}f
=Lf=\mu D_gf
$$

を得る。重複固有値内では正規直交基底の選択が固定されない。$\square$
<!-- proof-end -->

### 三点道を最後まで計算する

辺 $(1,2)$、$(2,3)$ の重みを1とすると

$$
L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix},
\quad D_g=\operatorname{diag}(1,2,1).
$$

$Lf=\mu D_gf$ を調べると、互いに次数付き直交する三本

$$
f_1=\tfrac12(1,1,1)^{\mathsf T},\quad
f_2=\tfrac1{\sqrt2}(1,0,-1)^{\mathsf T},\quad
f_3=\tfrac12(1,-1,1)^{\mathsf T}
$$

を取れる。$Lf_1=0$、$Lf_2=f_2=D_gf_2$、$Lf_3=2D_gf_3$ である。例えば $f_3$ について $Lf_3=(1,-2,1)^{\mathsf T}$、$2D_gf_3=(1,-2,1)^{\mathsf T}$ と一致する。各ベクトルの $D_g$ ノルムは1で、$f_1^{\mathsf T}D_gf_2=(1-1)/(2\sqrt2)=0$ 等も確かめられる。ゆえに固有値は $0,1,2$。一次元解は $y=f_2$、最小エネルギーは1となる。**中央の点は0、両端が反対符号**になるが、出力の符号は反転可能である。

## 4. 正規化の選択が何を変えるか

同じ目的関数でも、通常の中心化 $Y^{\mathsf T}\boldsymbol1=0$ と $Y^{\mathsf T}Y=I_m$ に変えることができる。この場合、次数の大きい頂点を規格化で重く扱わない。

<a id="prop-mfl11-unnormalized"></a>

<!-- formal-statement-start -->
> **命題（非正規化Eigenmapsとの比較）**  
> $N\ge2$ の連結な非負対称重み付きグラフで、$L$ の固有値を昇順に $0=\lambda_1<\lambda_2\le\cdots\le\lambda_N$ とする。$1\le m\le N-1$ とし、制約

$$
Y^{\mathsf T}\boldsymbol1=0,\qquad Y^{\mathsf T}Y=I_m
$$

> の下で $\operatorname{tr}(Y^{\mathsf T}LY)$ の最小値は $\sum_{r=2}^{m+1}\lambda_r$ であり、対応する通常の $L$ の直交固有ベクトルで達成する。次数正規化の場合は、一般化固有値問題 $Lf=\mu D_gf$ を使う。
<!-- formal-statement-end -->

### 証明の見取り図

[SGT1の核と連結成分](../../../計算系/SGT/SGT1/index.md#thm-sgt1-kernel-components)から定数ベクトルが単純な零固有ベクトルと分かる。あとは[上の固有値最小化](#thm-mfl11-spectral)の証明で $D_g=I$ と置いた直交展開を行う。

<!-- proof-start -->
### 証明

$v_1=\boldsymbol1/\sqrt N$ を $L$ の第一の正規化固有ベクトルとする。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で、正規直交固有基底 $v_1,\ldots,v_N$ へ延長できる。

中心化条件で各列の $v_1$ 成分は0になる。$Y$ の第 $a$ 列を $Y_{\cdot a}$ と書けば、規格化条件は次の係数の直交性となる。

$$
Y_{\cdot a}=\sum_{r=2}^N c_{ra}v_r,\qquad
\sum_{r=2}^N c_{ra}c_{rb}=\delta_{ab}.
$$

$\alpha_r=\sum_{a=1}^m c_{ra}^2$ とすると、直交射影の性質より $0\le\alpha_r\le1$、$\sum_{r=2}^N\alpha_r=m$ である。エネルギーは固有ベクトルの直交性から

$$
\operatorname{tr}(Y^{\mathsf T}LY)=\sum_{r=2}^N\lambda_r\alpha_r
$$

となる。[固有値最小化](#thm-mfl11-spectral)で導いた質量移動の不等式を $\mu$ から $\lambda$ へ置き換えると、これは $\sum_{r=2}^{m+1}\lambda_r$ 以上である。$Y=[v_2\ \cdots\ v_{m+1}]$ なら等号になる。$\square$
<!-- proof-end -->

三点道では $L(1,0,-1)^{\mathsf T}=(1,0,-1)^{\mathsf T}$ なので、非正規化の一次元座標も偶然同じである。一方、次数付き規格化は $D_g$、通常の規格化は $I$ を使うので、**この例での一致を一般の一致と誤解してはいけない**。例えば重み付き三点道で左辺重み2、右辺重み1とすれば、$D_g=\operatorname{diag}(2,3,1)$ は定数倍の単位行列でなく、二つの固有問題は異なる。

## 5. 退化を結果の一部として読む

グラフの連結性と孤立点の有無は、単なる実装上の例外ではない。とくに「固有値0を一つ飛ばして次の $m$ 本を取る」という操作は、連結性を前提にしている。

<a id="prop-mfl11-degenerate"></a>

<!-- formal-statement-start -->
> **命題（非連結・孤立点の埋め込み不定性）**  
> 非負対称重み付きグラフの正次数集合 $V_+$ が $k\ge1$ 個の連結成分を持つとする。$V_+$ 上の一般化固有値問題

$$
L_+f=\mu D_+f
$$

> で、固有値0の重複度は $k$ である。したがって $k>1$ なら、全体の定数方向を一つ除いても $k-1$ 個の零エネルギー方向が残る。また $d_i=0$ の孤立点は $D_+^{-1/2}$ の定義域になく、その頂点の座標は正次数集合上の変分問題からは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

[SGT2の核の定理](../../../計算系/SGT/SGT2/index.md#thm-sgt2-spectrum-kernel)では $u$ の成分が各連結成分上で $\sqrt{d_i}$ に比例する。$f=D_+^{-1/2}u$ に戻せば、各成分上で定数になる。孤立点ではその逆行列が存在しない。

<!-- proof-start -->
### 証明

$V_+$ の各成分を $C_1,\ldots,C_k$ とし、$f^{(a)}$ を $C_a$ 上1、他で0のベクトルとする。成分をまたぐ正重み辺はないから、[SGT1のエネルギー](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)より

$$
(f^{(a)})^{\mathsf T}L_+f^{(a)}
=\sum_{i<j}w_{ij}(f_i^{(a)}-f_j^{(a)})^2=0.
$$

$L_+$ は正半定値なので $L_+f^{(a)}=0$ である。[核と連結成分](../../../計算系/SGT/SGT1/index.md#thm-sgt1-kernel-components)により、これら $k$ 本は核の基底をなす。$D_+$ は可逆なので、一般化固有値 $\mu=0$ の条件も $L_+f=0$ と同値であり、その重複度は $k$ となる。

定数ベクトルは $\boldsymbol1=\sum_af^{(a)}$ と表され、零モードのうち一本を占める。したがってそれと次数付き直交する零エネルギー方向が、なお $k-1$ 次元残る。

$d_i=0$ の頂点では $w_{ij}=0$ が全 $j$ に対して成り立ち、元の $L$ の第 $i$ 行・列は零である。エネルギーはその座標に依存せず、同時に $d_i^{-1/2}$ が定義できないため、正規化変分問題はこの座標を制約しない。$\square$
<!-- proof-end -->

例えば重み1の二本の独立な辺 $(1,2),(3,4)$ では $D_g=I$、$L$ の固有値は $0,0,2,2$。一次元の $f=(1,1,-1,-1)^{\mathsf T}/2$ は中心化・規格化を満たしエネルギー0である。同じ成分内の点は重なるが、**二成分間の距離は観測された辺から制約されない**。この零モードによる座標だけから、元の離れ方を復元したとはいえない。

### 微小な橋と、見かけ上の分離

二つの強いまとまりを重み $\delta>0$ の一本の辺でつなぐと、連結ではあるが、二つのまとまりにほぼ一定の座標を置くとエネルギーを小さくできる。[SGT2の第二固有値の変分表示](../../../計算系/SGT/SGT2/index.md#thm-sgt2-rayleigh)により、次数付き平均0の試験ベクトルが与えるRayleigh商は第二固有値の**上界**になる。$\delta\to0$ でその上界が0へ行く例では、固有値が近接して座標が不安定になる。小さい固有値それ自体は、点群が二つの真の多様体成分に分かれる証明ではない。

<a id="prop-mfl11-invariance"></a>

<!-- formal-statement-start -->
> **命題（スケーリングと直交変換の不変性）**  
> [変分問題](#def-mfl11-variational)で、すべての辺重みを同じ $c>0$ 倍すると、一般化固有値は変わらず、可行な最小座標 $Y$ は $c^{-1/2}Y$ に対応する。また任意の $m\times m$ 直交行列 $Q$ に対し $YQ$ も同じエネルギーを持つ可行な最小座標である。
<!-- formal-statement-end -->

### 証明の見取り図

重みを掛けると次数行列とLaplacianがともに $c$ 倍になる。座標は制約の規格化分だけ縮む。座標軸の回転は距離と直交条件を保つ。

<!-- proof-start -->
### 証明

$W'=cW$、$D_g'=cD_g$、$L'=cL$ より、$Lf=\mu D_gf$ と $L'f=\mu D_g'f$ は同値で、固有値は変わらない。$Y'=c^{-1/2}Y$ に対し

$$
(Y')^{\mathsf T}D_g'Y'=Y^{\mathsf T}D_gY=I_m,
\quad (Y')^{\mathsf T}D_g'\boldsymbol1=\sqrt c,Y^{\mathsf T}D_g\boldsymbol1=0.
$$

さらに $\operatorname{tr}((Y')^{\mathsf T}L'Y')=\operatorname{tr}(Y^{\mathsf T}LY)$ となる。直交 $Q$ については $(YQ)^{\mathsf T}D_g(YQ)=Q^{\mathsf T}I_mQ=I_m$、$(YQ)^{\mathsf T}D_g\boldsymbol1=Q^{\mathsf T}0=0$、$\|y_iQ-y_jQ\|=\|y_i-y_j\|$ より目的関数も不変である。$\square$
<!-- proof-end -->

一次元では $Q=\pm1$ なので出力符号を変えても同じ結果となる。固有値が重複した場合には、同じ固有空間で異なる基底を選ぶ自由も生じる。**座標の絶対方向や符号で二つの実行結果を比較せず、距離や部分空間を比較する**のが適切である。

## 6. 何を保存し、何を保証しないか

- [MFL7の近傍の対称化](../MFL7/index.md#def-mfl7-knn-symmetrization)や重みの帯域幅が変われば $W$ 自体が変わる。遠く離れた枝を誤って結ぶshortcutは、離れて置きたい二点を近づける力になる。
- 正規化では重みの**相対比と次数分布**が埋め込みを決める。一定の倍率で全重みを変える操作は上の命題の対象だが、頂点ごとの重み変更では固有ベクトルが一般に変わる。
- この章で得たのは有限グラフの変分最小値である。標本数を増やしたときの連続微分作用素への近似やスペクトルの収束は、密度・帯域・境界・スペクトルギャップ等の仮定と別の証明を要する。
- 小さい固有値や見た目に離れた埋め込みを、元の測地距離、クラスタ、位相の保存保証と取り違えない。

## 7. 再現実験

[laplacian_eigenmaps_lab.py](laplacian_eigenmaps_lab.py) はPython標準ライブラリだけで $W,D_g,L,\mathcal L$ とJacobi法による対称固有分解を作り、一般化固有残差、次数付き中心化・規格化、辺エネルギーをJSONに出す。三点道、二本の非連結辺、孤立頂点、弱い橋を含む四点道を切り替え、非連結時の零固有値の重複と孤立点の除外も確認できる。

    python3 textbook/volumes/dream_thater/応用系/MFL/MFL11/laplacian_eigenmaps_lab.py --case path3 --dim 1
    python3 textbook/volumes/dream_thater/応用系/MFL/MFL11/laplacian_eigenmaps_lab.py --case disconnected --dim 1
    python3 textbook/volumes/dream_thater/応用系/MFL/MFL11/laplacian_eigenmaps_lab.py --case weak-bridge --bridge 0.01 --dim 1
    python3 -m unittest discover -s textbook/volumes/dream_thater/応用系/MFL/MFL11 -p 'test_*.py'

数値固有値の零判定は有限精度の閾値による。理論上の連結成分数は正重み辺から別途計算し、小さい正固有値を無条件に零へ丸めない。

## 8. 演習

<a id="ex-mfl11-a01"></a>

### MFL11-A01 三点道の行列

- Level: A
- 問題: 頂点1–2、2–3の辺重みをともに1とする。$W,D_g,L$ を書き、$f=(1,0,-1)^{\mathsf T}/\sqrt2$ が[変分問題](#def-mfl11-variational)で可行であることとエネルギーを確認せよ。

**詳細解答**。$W_{12}=W_{21}=W_{23}=W_{32}=1$、残りは0だから

$$
W=\begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix},\quad
D_g=\operatorname{diag}(1,2,1),\quad
L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

$f^{\mathsf T}D_g\boldsymbol1=(1-1)/\sqrt2=0$、$f^{\mathsf T}D_gf=1/2+1/2=1$。辺の差は両方 $1/\sqrt2$ なので $\mathcal E(f)=1$。

<a id="ex-mfl11-a02"></a>

### MFL11-A02 係数を数え違えない

- Level: A
- 問題: 二頂点の間の重みが3で、一次元座標が $a,b$ のとき $f^{\mathsf T}Lf$ と $\sum_{i,j}w_{ij}(f_i-f_j)^2$ を求め、両者の係数の違いを説明せよ。

**詳細解答**。Laplacianは

$$
L=\begin{pmatrix}3&-3\\-3&3\end{pmatrix}
$$

だから $f^{\mathsf T}Lf=3(a-b)^2$。全順序対の和では $(1,2)$ と $(2,1)$ がそれぞれ $3(a-b)^2$ を寄与し、合計 $6(a-b)^2$。前者は後者の $1/2$ で、[SGT1の辺表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)と整合する。

<a id="ex-mfl11-a03"></a>

### MFL11-A03 孤立点を先に検出する

- Level: A
- 問題: 辺 $(1,2)$ だけに重み2を付け、頂点3を孤立させる。$V_+,D_+$ を作り、なぜ $3\times3$ の $D_g^{-1/2}$ が存在しないか説明せよ。

**詳細解答**。次数は $(2,2,0)$、$V_+=\{1,2\}$、$D_+=\operatorname{diag}(2,2)$。$D_g=\operatorname{diag}(2,2,0)$ は零固有値を持ち、逆行列が存在しない。$1/\sqrt{d_3}$ は零除算である。したがって[正次数集合](#def-mfl11-positive-degree)で二頂点の座標を求めても点3の座標は定義されない。

<a id="ex-mfl11-a04"></a>

### MFL11-A04 出力符号は情報ではない

- Level: A
- 問題: 可行な一次元最小解 $f$ があるとき、$-f$ も同じ値を持つ最小解であることを、制約とエネルギーから検算せよ。

**詳細解答**。$(-f)^{\mathsf T}D_g\boldsymbol1=-f^{\mathsf T}D_g\boldsymbol1=0$、$(-f)^{\mathsf T}D_g(-f)=f^{\mathsf T}D_gf=1$。辺差は $(-f_i)-(-f_j)=-(f_i-f_j)$ で、平方は等しい。よって $\mathcal E(-f)=\mathcal E(f)$ である。

<a id="ex-mfl11-b01"></a>

### MFL11-B01 三点道の一般化固有値

- Level: B
- 問題: [A01の三点道](#ex-mfl11-a01)について、$f_1=(1,1,1)^{\mathsf T}/2$、$f_2=(1,0,-1)^{\mathsf T}/\sqrt2$、$f_3=(1,-1,1)^{\mathsf T}/2$ の一般化固有値を直接調べよ。三本の次数付き直交性も確認せよ。

**詳細解答**。$Lf_1=0$。$Lf_2=(1,0,-1)^{\mathsf T}/\sqrt2=D_gf_2$。$Lf_3=(1,-2,1)^{\mathsf T}=2D_gf_3$。したがって固有値は $0,1,2$。$f_1^{\mathsf T}D_gf_2=(1-1)/(2\sqrt2)=0$、$f_1^{\mathsf T}D_gf_3=(1-2+1)/4=0$、$f_2^{\mathsf T}D_gf_3=(1-1)/(2\sqrt2)=0$。各二乗ノルムは順に $(1+2+1)/4=1$、$(1+1)/2=1$、$(1+2+1)/4=1$。ゆえに三本は次数付き正規直交基底である。

<a id="ex-mfl11-b02"></a>

### MFL11-B02 非正規化では何が変わるか

- Level: B
- 問題: 重みなし三点道の通常のLaplacian $L$ の固有値を求め、次数正規化の固有値との違いを説明せよ。

**詳細解答**。$L(1,1,1)^{\mathsf T}=0$、$L(1,0,-1)^{\mathsf T}=(1,0,-1)^{\mathsf T}$、$L(1,-2,1)^{\mathsf T}=3(1,-2,1)^{\mathsf T}$ である。三本は一次独立なので通常固有値は $0,1,3$。一方[B01の一般化問題](#ex-mfl11-b01)は $0,1,2$。第三の固有値が違うのは $L f=\lambda f$ と $L f=\mu D_gf$ で右辺に掛ける行列が異なるからである。

<a id="ex-mfl11-b03"></a>

### MFL11-B03 二成分の零モード

- Level: B
- 問題: 重み1の独立な二本の辺 $(1,2),(3,4)$ について、零固有値の重複度、全体の定数方向に直交する単位零モード、最小エネルギーを計算せよ。

**詳細解答**。$D_g=I_4$ で $L$ は二つのブロック

$$
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
$$

からなる。各ブロックの固有値は0と2なので、全体では $0,0,2,2$。$f=(1,1,-1,-1)^{\mathsf T}/2$ は $f^{\mathsf T}\boldsymbol1=0$、$f^{\mathsf T}f=1$、各辺で差0だから $\mathcal E(f)=0$。この最小値は成分間の距離を決めない。

<a id="ex-mfl11-b04"></a>

### MFL11-B04 全重みの倍率

- Level: B
- 問題: 二点間重み1のグラフで、一次元最小解と固有値を求めよ。重みを9にしたとき座標の倍率と固有値を求め、[不変性命題](#prop-mfl11-invariance)を検証せよ。

**詳細解答**。初めは $D_g=I_2$ で

$$
L=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

定数方向に直交する $f=(1,-1)^{\mathsf T}/\sqrt2$ の固有値は2、エネルギーは $(\sqrt2)^2=2$。重み9なら $D_g'=9I_2$、$L'=9L$ で、$f'=f/3=(1,-1)^{\mathsf T}/(3\sqrt2)$ とすれば $(f')^{\mathsf T}D_g'f'=1$。$L'f'=2D_g'f'$、エネルギーは $9(2/(3\sqrt2))^2=2$。固有値は2のままで座標だけ $1/3$ 倍となる。

<a id="ex-mfl11-c01"></a>

### MFL11-C01 弱い橋のRayleigh商

- Level: C
- 問題: 四点道 $1-2-3-4$ の辺重みを順に $1,\delta,1$（$\delta>0$）とする。左右の成分の候補座標 $f=(a,a,-a,-a)^{\mathsf T}$ が次数付き中心化されることを確認し、規格化したときのエネルギーと第二一般化固有値 $\mu_2$ の上界を求めよ。$\delta\to0$ の意味を説明せよ。

**詳細解答**。次数は $(1,1+\delta,1+\delta,1)$。左右の次数和はいずれも $2+\delta$ だから、$f^{\mathsf T}D_g\boldsymbol1=a(2+\delta)-a(2+\delta)=0$。二乗ノルムは $2(2+\delta)a^2$ なので、$a=1/\sqrt{2(2+\delta)}$ とすると1になる。端の二辺では差0、中央の橋だけ差 $2a$。ゆえに

$$
\mathcal E(f)=\delta(2a)^2=\frac{2\delta}{2+\delta}.
$$

[SGT2の変分表示](../../../計算系/SGT/SGT2/index.md#thm-sgt2-rayleigh)では $\mu_2$ は全可行 $f$ の商の最小なので、$0<\mu_2\le2\delta/(2+\delta)$。$\delta\to0$ で上界が0へ行くが、任意の $\delta>0$ ならグラフは連結で[核の定理](../../../計算系/SGT/SGT2/index.md#thm-sgt2-spectrum-kernel)により $\mu_2>0$。極限 $\delta=0$ では二成分になり零固有値が二重になる。正の小さい固有値を厳密零と混同しない。

<a id="ex-mfl11-c02"></a>

### MFL11-C02 制約と固有値緩和を同時に証明する

- Level: C
- 問題: $n$ 頂点の連結・全正次数グラフで $m=2\le n-1$ とする。$Y^{\mathsf T}D_gY=I_2$、$Y^{\mathsf T}D_g\boldsymbol1=0$ の下で最小エネルギーが $\mu_2+\mu_3$ になる理由を、固有基底展開から証明せよ。また $\mu_3=\mu_4$ の場合、二つ目の座標方向の不定性を説明せよ。

**詳細解答**。$U=D_g^{1/2}Y$ とし、$\mathcal L=D_g^{-1/2}LD_g^{-1/2}$ の直交固有基底 $u_1,\ldots,u_n$ を取る。$u_1$ は $D_g^{1/2}\boldsymbol1$ と平行だから、二列 $U_{\cdot a}=\sum_{r=2}^nc_{ra}u_r$（$a=1,2$）と書ける。$U^{\mathsf T}U=I_2$ により $\alpha_r=c_{r1}^2+c_{r2}^2$ は $0\le\alpha_r\le1$、$\sum_{r=2}^n\alpha_r=2$。エネルギーは $\sum_{r=2}^n\mu_r\alpha_r$。$\mu_3$ を基準にすると

$$
\begin{aligned}
\mathcal E(Y)-\mu_2-\mu_3
&=(\mu_3-\mu_2)(1-\alpha_2)
+\sum_{r=4}^n(\mu_r-\mu_3)\alpha_r\ge0.
\end{aligned}
$$

ここで $\alpha_2+\alpha_3+\sum_{r=4}^n\alpha_r=2$ を使った。$U=[u_2,u_3]$ で等号になる。$\mu_3=\mu_4$ の場合は $u_3$ の代わりに $\operatorname{span}\{u_3,u_4\}$ 内の任意の単位ベクトルで $u_2$ に直交するものを選べ、等エネルギーの別座標が生じる。従って座標軸が固有値重複内で一意とすることはできない。

## 9. 次章へ

有限グラフ上では、エネルギー最小化と固有値問題は厳密に結び付いた。しかしグラフが標本点から作られたとき、その $L$ がどの連続的な微分作用素を近似するかはまだ答えていない。次のMFL12では、連続多様体のLaplace–Beltrami作用素とその符号・体積を確認し、有限問題と連続問題を区別する。
