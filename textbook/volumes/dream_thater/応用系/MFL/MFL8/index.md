# MFL8 Classical MDS・距離から座標を復元する

点群の座標が既知なら点間距離はすぐ計算できる。逆に、点と点の距離だけを渡されたら、元の点群の形を復元できるだろうか。[MFL2で区別した外在距離と内在距離](../MFL2/index.md#def-mfl2-distances)のうち、まず **有限個の Euclid 距離**を扱う。次の MFL9 では、[MFL7の近傍グラフ](../MFL7/index.md#def-mfl7-radius-graph)から作る最短路距離を同じ手順へ入力する。その際「座標に戻せる距離か」を診断する基準が必要になる。

Classical multidimensional scaling（古典的多次元尺度構成法、以下 Classical MDS）は、距離の二乗を**二重に中心化**して内積の行列へ変え、固有分解から座標を作る方法である。点数を $n$、埋め込み後の次元を $q$ とする。到達点は次の三つである。

1. 与えた距離を完全に実現できるかは、復元した内積行列が正半定値かどうかで決まる。
2. 完全実現できる場合の最小次元は、その内積行列の階数で決まる。
3. 次元を小さくする場合は内積行列の誤差を最小化する。ただし**元の距離の誤差を直接最小化しているわけではない**。

## 1. 距離から内積を作りたい

三点 $x_1,x_2,x_3$ を平面上に置き、その三辺の長さだけを記録したとする。平行移動や回転で座標値を変えても距離は同じだ。したがって距離から絶対的な原点や向きを一意に決めることはできない。そこで平均を原点にする。[ML1-19の中心化標本行列](../../../応用系/ML/ML1-19/index.md#def-ml1-19-centered-data)と同じ操作である。

$n\ge2$、点番号 $1,\ldots,n$ に対して対称な非負数 $d_{ij}=d_{ji}\ge0$、$d_{ii}=0$ を与える。まだ三角不等式は仮定しない。$\Delta=(d_{ij}^2)_{i,j=1}^n$ は**距離の二乗の候補**を並べた行列である。$\boldsymbol1=(1,\ldots,1)^{\mathsf T}\in\mathbb R^n$ を用い、平均を引く行列を

$$
J=I_n-\frac1n\boldsymbol1\boldsymbol1^{\mathsf T}
$$

とする。$J\boldsymbol1=0$、$J^{\mathsf T}=J$、$J^2=J$ だから、行列 $X$ の各行から列ごとの平均を引いた行列は $JX$ である。両側から $J$ を掛けるのは、$\Delta$ の行方向と列方向の平均をともに取り除くためである。

<a id="def-mfl8-double-centered-gram"></a>

<!-- formal-statement-start -->
> **定義（二乗非類似度行列と二重中心化Gram行列）**
> 整数 $n\ge2$ と、対称・対角零・非負成分の $D=(d_{ij})\in\mathbb R^{n\times n}$ に対し、$\Delta_{ij}=d_{ij}^2$、$J=I_n-\boldsymbol1\boldsymbol1^{\mathsf T}/n$ とする。二重中心化Gram行列の候補を

$$
B=-\frac12J\Delta J
$$

> と定める。$B$ は実対称行列で $B\boldsymbol1=0$ だが、一般には正半定値とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl8-double-centered-gram -->
**定義の確認**。数直線上の二点 $0,a$（$a>0$）なら

$$
\Delta=\begin{pmatrix}0&a^2\\a^2&0\end{pmatrix},
\quad J=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\quad B=\frac{a^2}{4}\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

実際に $J\Delta J$ を掛けると $-a^2J$ になる。$B\boldsymbol1=0$ で、任意の $u=(u_1,u_2)^{\mathsf T}$ について $u^{\mathsf T}Bu=a^2(u_1-u_2)^2/4\ge0$。この例では中心化座標 $(-a/2,a/2)$ の内積を並べた行列そのものである。
<!-- definition-example-end -->

行列の各成分も検算できる。$r_i=n^{-1}\sum_kd_{ik}^2$ を第 $i$ 行の平均、$m=n^{-2}\sum_{k,\ell}d_{k\ell}^2$ を全成分の平均とすると、

$$
B_{ij}=-\frac12(d_{ij}^2-r_i-r_j+m),\qquad
B_{ii}=r_i-\frac m2.
$$

後者では $d_{ii}=0$ を使った。この式は後の**距離の復元**で重要になる。

## 2. なぜ二重中心化で内積が戻るのか

Euclid 空間の点 $x_i\in\mathbb R^p$ が実在するとき、平均 $\bar x=n^{-1}\sum_ix_i$ を引いた $y_i=x_i-\bar x$ を行に持つ $Y\in\mathbb R^{n\times p}$ を考える。内積の表 $G=YY^{\mathsf T}$ を Gram 行列と呼ぶ。$G_{ij}=y_i^{\mathsf T}y_j$ であり、$G$ が正半定値なのは任意の $u\in\mathbb R^n$ に対して $u^{\mathsf T}Gu=\|Y^{\mathsf T}u\|^2\ge0$ だからである。

<a id="prop-mfl8-centering-identity"></a>

<!-- formal-statement-start -->
> **命題（中心化Euclid点群の二重中心化公式）**
> $n\ge2$、$x_1,\ldots,x_n\in\mathbb R^p$（$p\ge1$）から $d_{ij}=\|x_i-x_j\|$ と $B=-J\Delta J/2$ を作る。$Y$ の第 $i$ 行を $(x_i-\bar x)^{\mathsf T}$ とすると

$$
B=YY^{\mathsf T}.
$$

> 従って $B$ は正半定値、$B\boldsymbol1=0$、$\operatorname{rank}B\le\min\{p,n-1\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

距離の二乗を「各点の長さの二乗二つ − 内積の2倍」に展開する。左右から $J$ を掛けると、長さの二乗だけを並べた項が消える。

<!-- proof-start -->
### 証明

$X$ の第 $i$ 行を $x_i^{\mathsf T}$ と置き、$K=XX^{\mathsf T}$、$s_i=\|x_i\|^2$ とする。内積展開から

$$
d_{ij}^2=\|x_i\|^2+\|x_j\|^2-2x_i^{\mathsf T}x_j,
\quad
\Delta=s\boldsymbol1^{\mathsf T}+\boldsymbol1s^{\mathsf T}-2K.
$$

$J\boldsymbol1=0$ と $J^{\mathsf T}=J$ を両項へ代入すると

$$
\begin{aligned}
-\tfrac12J\Delta J
&=-\tfrac12(Js\boldsymbol1^{\mathsf T}J+
J\boldsymbol1s^{\mathsf T}J-2JKJ)\\
&=JKJ=(JX)(JX)^{\mathsf T}=YY^{\mathsf T}.
\end{aligned}
$$

$JX$ の第 $i$ 行は $x_i^{\mathsf T}-n^{-1}\sum_jx_j^{\mathsf T}$ だから確かに $Y$ である。$B=YY^{\mathsf T}$ は正半定値、$Y^{\mathsf T}\boldsymbol1=0$ から $B\boldsymbol1=0$。$Y$ の列は $\boldsymbol1^\perp$ に属するので $\operatorname{rank}B=\operatorname{rank}Y\le\min\{p,n-1\}$。$\square$
<!-- proof-end -->

距離が持つのは点群の相対配置の情報である。座標の各列を中心化した後の Gram 行列までは、距離から一意に得られる。

## 3. その距離は本当にEuclid空間へ置けるか

入力した数値 $d_{ij}$ は「距離のつもり」であっても、三角不等式を破るかもしれない。また三角不等式を満たす任意の距離空間が、有限次元Euclid空間の直線距離として表せるわけでもない。ここで **Euclid距離の実現**を明確にする。

<a id="def-mfl8-distance-realization"></a>

<!-- formal-statement-start -->
> **定義（Euclid距離の実現と最小実現次元）**
> $n\ge2$、対称・対角零・非負の数値 $d_{ij}$ を与える。ある整数 $p\ge0$ と点 $x_1,\ldots,x_n\in\mathbb R^p$ が存在し、すべての組で

$$
d_{ij}=\|x_i-x_j\|
$$

> が成り立つとき、$D=(d_{ij})$ は Euclid距離として実現可能という。可能な $p$ の最小値を最小実現次元とする。$\mathbb R^0$ は一点だけの空間とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl8-distance-realization -->
**定義の確認**。三点間の距離 $d_{12}=1,d_{13}=1,d_{23}=\sqrt2$（対角は零、対称に補完）なら、$x_1=(0,0),x_2=(1,0),x_3=(0,1)$ で三組とも確認できる。一方、一直線上では $1^2+1^2=(\sqrt2)^2$ となる直角三角形を実現できない。より直接には、最長距離が他二距離の和と等しくなければ三点は一直線上にない。したがって最小実現次元は2である。次の固有値判定でこの結論を行列から再確認する。
<!-- definition-example-end -->

<a id="thm-mfl8-euclidean-criterion"></a>

<!-- formal-statement-start -->
> **定理（Euclid距離行列の正半定値判定）**
> $n\ge2$、$D=(d_{ij})$ を実対称・対角零・非負成分の行列とし、$\Delta_{ij}=d_{ij}^2$、$B=-J\Delta J/2$ とする。このとき $D$ がEuclid距離として実現可能であることと、$B$ が正半定値であることは同値である。実現可能なとき最小実現次元は $\operatorname{rank}B\le n-1$ であり、$B$ の正の固有値 $\lambda_1,\ldots,\lambda_r$ と対応する正規直交固有ベクトル $u_1,\ldots,u_r$ から

$$
Y=(\sqrt{\lambda_1}u_1,\ldots,\sqrt{\lambda_r}u_r)
\in\mathbb R^{n\times r}
$$

> を作れば、その各行が平均零の実現座標となる（$r=0$ では全点を $\mathbb R^0$ の一点へ送る）。
<!-- formal-statement-end -->

### 証明の見取り図

実現できるなら先の命題により正半定値。逆向きは[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で $B=YY^{\mathsf T}$ と分解し、$B_{ii}+B_{jj}-2B_{ij}$ が**入力した** $d_{ij}^2$ に戻ることまで確かめる。単に固有分解をするだけでは逆向きの証明は終わらない。

<!-- proof-start -->
### 証明

実現可能なら[中心化Euclid点群の二重中心化公式](#prop-mfl8-centering-identity)で $B=YY^{\mathsf T}$、従って正半定値である。

逆に $B$ が正半定値なら、実対称行列のスペクトル定理で正の固有値を $r$ 個取り、指定した $Y$ により $B=YY^{\mathsf T}$ と書ける。$B\boldsymbol1=0$ だから $\|Y^{\mathsf T}\boldsymbol1\|^2=\boldsymbol1^{\mathsf T}B\boldsymbol1=0$、すなわち行ベクトルの平均は零。

第 $i$ 行を $y_i^{\mathsf T}$ とすると

$$
\|y_i-y_j\|^2=B_{ii}+B_{jj}-2B_{ij}.
$$

第1節の行平均公式を代入し、$d_{ii}=0$ を使うと

$$
\begin{aligned}
B_{ii}+B_{jj}-2B_{ij}
&=(r_i-\tfrac m2)+(r_j-\tfrac m2)
 +(d_{ij}^2-r_i-r_j+m)\\
&=d_{ij}^2.
\end{aligned}
$$

両辺が非負なので平方根を取って $\|y_i-y_j\|=d_{ij}$。従って $Y$ は実現である。

最後に任意の $\mathbb R^p$ 内の実現を中心化すれば、[中心化Euclid点群の二重中心化公式](#prop-mfl8-centering-identity)により $B=ZZ^{\mathsf T}$ なので $\operatorname{rank}B=\operatorname{rank}Z\le p$。上の構成は $p=r$ で実現するから最小である。$B\boldsymbol1=0$ より $r\le n-1$。$\square$
<!-- proof-end -->

**正の例を数値で確認**。上の直角三角形では

$$
\Delta=\begin{pmatrix}0&1&1\\1&0&2\\1&2&0\end{pmatrix},
\quad
B=\frac19\begin{pmatrix}2&-1&-1\\-1&5&-4\\-1&-4&5\end{pmatrix}.
$$

$u_1=(0,1,-1)^{\mathsf T}/\sqrt2$ に固有値1、$u_2=(-2,1,1)^{\mathsf T}/\sqrt6$ に固有値 $1/3$ が対応し、残る $\boldsymbol1/\sqrt3$ の固有値は零。よって $B$ は正半定値で階数2、元の三点は $\mathbb R^2$ へ置けるが $\mathbb R^1$ へは置けない。復元座標は元の軸と異なっても距離は一致する。

**負の例を数値で確認**。三点間の距離を $d_{12}=d_{23}=1,d_{13}=3$ とすると、三角不等式 $3\le1+1$ が破れる。このとき

$$
B=\begin{pmatrix}19/9&5/18&-43/18\\5/18&-5/9&5/18\\-43/18&5/18&19/9\end{pmatrix}
$$

で、固有値は $9/2,0,-5/6$。負固有値は丸め誤差ではなく、三点の距離がEuclid空間に同時実現できないことを示す。三角不等式に違反しない別の非Euclid距離でも負固有値が現れ得るので、三角不等式のチェックだけで本定理を置き換えられない。

## 4. 復元できる「形」と決められない「向き」

中心化は平行移動の自由度を消しただけである。$Y$ を直交行列 $Q$ で回しても $(YQ)(YQ)^{\mathsf T}=YY^{\mathsf T}$。反射も同じ。異なる次元の空間へ埋め込む場合には零座標を付け加えてよい。

<a id="prop-mfl8-rigid-ambiguity"></a>

<!-- formal-statement-start -->
> **命題（距離が決める座標の直交同値性）**
> $n\ge2$、$p\ge1$ とし、二組の点 $x_i,z_i\in\mathbb R^p$ がすべての組で同じ二点距離を持つとする。すなわち

$$
\|x_i-x_j\|=\|z_i-z_j\|\quad(1\le i,j\le n).
$$

> このとき一つの直交行列 $Q\in\mathbb R^{p\times p}$ と並進ベクトル $a\in\mathbb R^p$ が存在し、行ベクトルを使う規約で

$$
z_i^{\mathsf T}=x_i^{\mathsf T}Q+a^{\mathsf T}\quad(1\le i\le n)
$$

> と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

両点群を中心化すれば同じ Gram 行列を持つ。点群が張る部分空間の対応を「同じ線形結合を同じ線形結合へ送る」と定めると内積が保存され、直交基底を補えば全空間の直交変換になる。

<!-- proof-start -->
### 証明

中心化した行を $y_i^{\mathsf T}$ と $w_i^{\mathsf T}$ とする。[中心化Euclid点群の二重中心化公式](#prop-mfl8-centering-identity)から $y_i^{\mathsf T}y_j=w_i^{\mathsf T}w_j$ が全 $i,j$ で成り立つ。$V=\operatorname{span}\{y_i\}$ 上に

$$
T\Big(\sum_i c_i y_i\Big)=\sum_i c_iw_i
$$

を定める。もし左の線形結合が零なら、その長さの二乗は $\sum_{i,j}c_ic_jy_i^{\mathsf T}y_j=0$。同じGram成分を持つ右の線形結合の長さの二乗も零だから、右も零であり $T$ は well-defined である。さらに任意の二つの係数列 $c,d$ に対して

$$
\left\langle T\sum_i c_iy_i,T\sum_jd_jy_j\right\rangle
=\sum_{i,j}c_id_jw_i^{\mathsf T}w_j
=\sum_{i,j}c_id_jy_i^{\mathsf T}y_j.
$$

従って $T$ は部分空間の等長線形同型。$V$ と $T(V)$ の正規直交基底をそれぞれ $\mathbb R^p$ の正規直交基底へ補えば、$T$ を全空間の直交変換へ拡張できる。行ベクトルの右作用を $Q$ と記すと $w_i^{\mathsf T}=y_i^{\mathsf T}Q$。元の平均へ戻し $z_i^{\mathsf T}=x_i^{\mathsf T}Q+(\bar z^{\mathsf T}-\bar x^{\mathsf T}Q)$。最後の括弧が $a^{\mathsf T}$ である。$\square$
<!-- proof-end -->

**読み違いを避ける**：MDS の出力軸の符号、重複固有値の中の基底、全体の回転・反射に幾何学的意味はない。違う座標表を得ても、再構成距離と内積を比べる。

## 5. 次元を制限した Classical MDS

入力のGram候補 $B$ が正半定値でも、二次元や三次元だけを画面に描きたいことがある。負固有値がある入力なら、そもそも全距離をEuclid空間に実現できない。そこで **正半定値かつ階数 $q$ 以下の行列**で $B$ を近似する。

[ML1-19の最良低ランク近似](../../../応用系/ML/ML1-19/index.md#thm-ml1-19-eckart-young)では中心化データの Frobenius 誤差を考えた。ここでは負固有値もあり得る $B$ を、座標から作れるGram行列 $YY^{\mathsf T}$ に近づける。$M=(m_{ij})$ の Frobenius ノルムは $\|M\|_F^2=\sum_{i,j}m_{ij}^2$ である。

<a id="def-mfl8-classical-mds"></a>

<!-- formal-statement-start -->
> **定義（Classical MDSの座標とGramひずみ）**
> $n\ge2$、対称・対角零・非負の $D$ から $B=-J\Delta J/2$ を作る。$B$ の固有値を大きい順に $\lambda_1\ge\cdots\ge\lambda_n$、対応する正規直交固有ベクトルを $u_1,\ldots,u_n$ とし、$0\le q\le n-1$ とする。$\lambda_i^+=\max\{\lambda_i,0\}$ とおき、Classical MDSの $q$ 次元座標を

$$
Y_q=(\sqrt{\lambda_1^+}u_1,\ldots,\sqrt{\lambda_q^+}u_q)
\in\mathbb R^{n\times q}
$$

> と定める。$q=0$ なら列を持たない行列とする。Gramひずみ（strain）を $\|B-Y_qY_q^{\mathsf T}\|_F^2$ と呼ぶ。座標が再現する距離を $\widehat d_{ij}=\|(Y_q)_{i,:}-(Y_q)_{j,:}\|$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl8-classical-mds -->
**定義の確認**。直角三角形の例で $q=1$ なら、最大固有値1と $u_1=(0,1,-1)^{\mathsf T}/\sqrt2$ を選び、

$$
Y_1=(0,1/\sqrt2,-1/\sqrt2)^{\mathsf T}.
$$

各行の平均は零、Gram行列は $u_1u_1^{\mathsf T}$ で正半定値・階数1。捨てた固有方向は固有値 $1/3$ のため Gramひずみは $(1/3)^2=1/9$ である。復元距離は $(\widehat d_{12},\widehat d_{13},\widehat d_{23})=(1/\sqrt2,1/\sqrt2,\sqrt2)$。元の距離 $(1,1,\sqrt2)$ とは二辺でずれるが、一番長い辺は残る。
<!-- definition-example-end -->

<a id="thm-mfl8-best-gram"></a>

<!-- formal-statement-start -->
> **定理（Classical MDSの最良Gram近似）**
> $n\ge2$、$B\in\mathbb R^{n\times n}$ は実対称、$B\boldsymbol1=0$ とし、固有値を $\lambda_1\ge\cdots\ge\lambda_n$ とする。$0\le q\le n-1$ について、中心化された行列 $Z\in\mathbb R^{n\times q}$（$\boldsymbol1^{\mathsf T}Z=0$）の中で

$$
\min_Z\|B-ZZ^{\mathsf T}\|_F^2
=\sum_{i=1}^n\lambda_i^2-\sum_{i=1}^q(\lambda_i^+)^2
$$

> であり、[Classical MDSの座標](#def-mfl8-classical-mds) $Z=Y_q$ がこの最小値を達成する。$q$ が正固有値の個数以上なら残差は負固有値の二乗和に等しい。固有値の重複時には最適座標は一般に一意でない。
<!-- formal-statement-end -->

### 証明の見取り図

任意の座標のGram行列は非負固有値を高々 $q$ 個しか持たない。$B$ の大きな固有方向から順に合わせるのが最良で、負固有方向は座標のGram行列として再現できない。固有値の大小と正規直交性から、同じ主張を不等式として証明する。

<!-- proof-start -->
### 証明

$q=0$ は $Z$ が零列で、両辺が $\|B\|_F^2=\sum_i\lambda_i^2$ だから成立。$1\le q\le n-1$ とする。任意の $C=ZZ^{\mathsf T}$ は正半定値で階数 $s\le q$、正の固有値を $c_1\ge\cdots\ge c_s>0$、対応する正規直交固有ベクトルを $v_1,\ldots,v_s$ と書ける。$C$ の残りは零固有値なので

$$
\begin{aligned}
\|B-C\|_F^2
&=\operatorname{tr}(B^2)+\operatorname{tr}(C^2)-2\operatorname{tr}(BC)\\
&=\sum_{i=1}^n\lambda_i^2+\sum_{k=1}^sc_k^2
-2\sum_{k=1}^sc_k\,v_k^{\mathsf T}Bv_k.
\end{aligned}
$$

ここで任意の $1\le k\le s$ について、$B$ の正規直交固有基底 $u_i$ へ $v_\ell$ を展開すると

$$
\sum_{\ell=1}^k v_\ell^{\mathsf T}Bv_\ell
=\sum_{i=1}^n\lambda_iw_i,\quad
w_i=\sum_{\ell=1}^k|u_i^{\mathsf T}v_\ell|^2,\quad
0\le w_i\le1,\quad\sum_iw_i=k.
$$

重み $k$ 単位を大きい $\lambda_i$ から配分すれば最大になるため $\sum_i\lambda_iw_i\le\sum_{i=1}^k\lambda_i$。より明示的には

$$
\sum_i\lambda_iw_i-\sum_{i=1}^k\lambda_i
=\sum_{i\le k}(\lambda_i-\lambda_k)(w_i-1)
+\sum_{i>k}(\lambda_i-\lambda_k)w_i\le0.
$$

$c_{s+1}=0$ とし、$c_\ell=\sum_{k=\ell}^s(c_k-c_{k+1})$ を使って上の部分和不等式を非負係数 $c_k-c_{k+1}$ で足すと

$$
\sum_{\ell=1}^sc_\ell v_\ell^{\mathsf T}Bv_\ell
\le\sum_{\ell=1}^sc_\ell\lambda_\ell.
$$

したがって

$$
\begin{aligned}
\|B-C\|_F^2
&\ge\sum_{i=1}^n\lambda_i^2+\sum_{\ell=1}^s(c_\ell^2-2c_\ell\lambda_\ell)\\
&\ge\sum_{i=1}^n\lambda_i^2-\sum_{\ell=1}^q(\lambda_\ell^+)^2.
\end{aligned}
$$

最後の不等式は $c_\ell\ge0$ に対する平方完成で、$\min_{c\ge0}(c^2-2c\lambda)=-(\lambda^+)^2$ を使う。$C=Y_qY_q^{\mathsf T}=\sum_{i=1}^q\lambda_i^+u_iu_i^{\mathsf T}$ ならすべて等号となる。正の固有値に対応する $u_i$ は $B\boldsymbol1=0$ により $\boldsymbol1$ と直交するので、$Y_q$ は中心化済みである。$\square$
<!-- proof-end -->

この最適性は **Gramひずみ**に対するものである。例えば元の二乗距離との平方誤差 $\sum_{i<j}(d_{ij}^2-\widehat d_{ij}^2)^2$ や、距離そのものの誤差 $\sum_{i<j}(d_{ij}-\widehat d_{ij})^2$ は別の目的関数である。$B$ に対するFrobenius最適性だけから、それらの最小化を結論してはいけない。

### 負固有値が残る例

$d_{12}=d_{23}=1,d_{13}=3$ の例は正固有値が $9/2$、負固有値が $-5/6$ である。$q=1$ にすると正固有ベクトル $(1,0,-1)^{\mathsf T}/\sqrt2$ から

$$
Y_1=(3/2,0,-3/2)^{\mathsf T}
$$

を得る。新しい距離は $(3/2,3/2,3)$。負固有値は捨てたままなので Gramひずみの最小値は $(-5/6)^2=25/36$ であり、$q$ を2に増やしても零にはできない。**負固有値を絶対値にして平方根を取る**操作は、元の距離を再現するClassical MDSとは別の問題を解いてしまう。

## 6. 計算実験：固有値の符号を確認する

付属の [classical_mds_lab.py](classical_mds_lab.py) は標準 Python のみを用い、小規模な実対称行列のJacobi固有値法で二重中心化を数値計算する。三角形・非Euclid三点・直線標本を切り替え、埋め込み次元 $q$、零判定の許容差を変えられる。入力は各例の距離行列であり、出力 JSON には二乗距離、Gram、固有値、座標、再構成距離、Gramひずみ、元距離とのずれをすべて含める。

リポジトリのルートから実行する例：

    python3 textbook/volumes/dream_thater/応用系/MFL/MFL8/classical_mds_lab.py --case triangle --dim 1
    python3 textbook/volumes/dream_thater/応用系/MFL/MFL8/classical_mds_lab.py --case non_euclidean --dim 2

小さい負固有値が数値誤差か、理論上の負固有値かは大きさを見て判断する。スクリプトでは $|\lambda|\le\text{tol}\,\max(1,\max_i|\lambda_i|)$ を数値的零とする。許容差を大きくすれば「実現可能性の証明」が得られるわけではない。大きな点群の高速・高精度計算は専用の数値線形代数ライブラリに委ね、本ラボは理論式を手元で検算する目的に限る。

## 7. 演習

### MFL8-A01 中心化行列の条件

- Level: A
- 問題: $n=3$、$\boldsymbol1=(1,1,1)^{\mathsf T}$、$J=I_3-\boldsymbol1\boldsymbol1^{\mathsf T}/3$ とする。$J$ を成分表示し、$J\boldsymbol1=0$、$J^2=J$ を直接示せ。

**詳細解答**。$J$ は

$$
J=\frac13\begin{pmatrix}2&-1&-1\\-1&2&-1\\-1&-1&2\end{pmatrix}.
$$

各行和は $2/3-1/3-1/3=0$ なので $J\boldsymbol1=0$。$P=\boldsymbol1\boldsymbol1^{\mathsf T}/3$ と置けば $P^2=\boldsymbol1(\boldsymbol1^{\mathsf T}\boldsymbol1)\boldsymbol1^{\mathsf T}/9=P$（$\boldsymbol1^{\mathsf T}\boldsymbol1=3$）。従って $J^2=(I-P)^2=I-2P+P^2=I-P=J$。

### MFL8-A02 二点からの復元

- Level: A
- 問題: 二点間距離 $d_{12}=a>0$、対角零・対称の $D$ に対して $B$ の固有値と最小実現次元、平均零の座標を求めよ。

**詳細解答**。[二乗非類似度行列と二重中心化Gram行列の定義](#def-mfl8-double-centered-gram)より $B=(a^2/4)\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$。$\boldsymbol1/\sqrt2$ が零固有ベクトル、$(1,-1)^{\mathsf T}/\sqrt2$ に対して

$$
B(1,-1)^{\mathsf T}=\frac{a^2}{2}(1,-1)^{\mathsf T}.
$$

従って固有値は $a^2/2,0$、階数1。[Euclid距離行列の正半定値判定](#thm-mfl8-euclidean-criterion)から最小次元1。正固有値の平方根を掛けると座標は $(a/2,-a/2)$、この二点差の絶対値は $a$、平均は零である。全体の反射で $(-a/2,a/2)$ にしても同じ距離となる。

### MFL8-A03 直角三角形の行平均

- Level: A
- 問題: $D$ の非対角要素を $d_{12}=d_{13}=1,d_{23}=\sqrt2$ とする。$r_i$、$m$ を求め、$B_{12}$ と $B_{23}$ を[行平均公式](#def-mfl8-double-centered-gram)から計算せよ。

**詳細解答**。$\Delta$ の行和は $(2,3,3)$ なので $r=(2/3,1,1)$、全和8だから $m=8/9$。従って

$$
\begin{aligned}
B_{12}&=-\tfrac12(1-\tfrac23-1+\tfrac89)=-\tfrac1{9},\\
B_{23}&=-\tfrac12(2-1-1+\tfrac89)=-\tfrac4{9}.
\end{aligned}
$$

どちらも第3節の $B$ の該当成分と一致する。行平均を二回引いて全平均を一度足し戻す符号に注意する。

### MFL8-A04 負固有値の直接確認

- Level: A
- 問題: $d_{12}=d_{23}=1,d_{13}=3$ の三点距離について、$v=(1,-2,1)^{\mathsf T}$ が $B$ の負固有ベクトルであることと、距離がEuclid実現できない理由を示せ。

**詳細解答**。第3節の $B$ に $v$ を掛けると第1成分は $19/9-10/18-43/18=-5/6$、第2成分は $5/18+10/9+5/18=5/3$、第3成分も $-5/6$。従って $Bv=(-5/6)v$。$v^{\mathsf T}Bv=(-5/6)\|v\|^2=-5<0$ なので正半定値ではない。[Euclid距離行列の正半定値判定](#thm-mfl8-euclidean-criterion)より実現不能。三角不等式でも $d_{13}=3>d_{12}+d_{23}=2$ と矛盾する。

### MFL8-B01 平行移動・回転と内積の不変性

- Level: B
- 問題: $x_1=(0,0),x_2=(1,0),x_3=(0,1)$ を $Q=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で行ベクトルとして右から回し、各行へ $a^{\mathsf T}=(4,-2)$ を足した $z_i^{\mathsf T}=x_i^{\mathsf T}Q+a^{\mathsf T}$ を作る。二点距離、中心化Gramが変わらないことを式で示せ。

**詳細解答**。$Q Q^{\mathsf T}=I_2$ である。任意の $i,j$ で $z_i^{\mathsf T}-z_j^{\mathsf T}=(x_i^{\mathsf T}-x_j^{\mathsf T})Q$ なので

$$
\|z_i-z_j\|^2=(x_i-x_j)^{\mathsf T}QQ^{\mathsf T}(x_i-x_j)=\|x_i-x_j\|^2.
$$

さらに $\bar z^{\mathsf T}=\bar x^{\mathsf T}Q+a^{\mathsf T}$、中心化行列 $Z_c=X_cQ$。よって $Z_cZ_c^{\mathsf T}=X_cQQ^{\mathsf T}X_c^{\mathsf T}=X_cX_c^{\mathsf T}$。これは[直交同値性](#prop-mfl8-rigid-ambiguity)の具体計算である。

### MFL8-B02 一次元近似で失われる距離

- Level: B
- 問題: 直角三角形 $d_{12}=d_{13}=1,d_{23}=\sqrt2$ を Classical MDS の $q=1$ で復元する。座標、三辺の復元距離、Gramひずみ、二乗距離の非対角三組の平方誤差和を求めよ。

**詳細解答**。$B$ の正固有値は $1,1/3$、最大固有ベクトルは $(0,1,-1)/\sqrt2$。従って $Y_1=(0,1/\sqrt2,-1/\sqrt2)^{\mathsf T}$。差を取ると $\widehat d_{12}=\widehat d_{13}=1/\sqrt2$、$\widehat d_{23}=\sqrt2$。直交固有成分を捨てたので

$$
\|B-Y_1Y_1^{\mathsf T}\|_F^2=(1/3)^2=1/9.
$$

元の二乗距離は $(1,1,2)$、復元二乗距離は $(1/2,1/2,2)$。非対角の異なる三組だけを数えた平方誤差和は $(1-1/2)^2+(1-1/2)^2+(2-2)^2=1/2$。$1/9$ と $1/2$ は別の量である。

### MFL8-B03 直線三点と最小次元

- Level: B
- 問題: $x_1=0,x_2=2,x_3=5\in\mathbb R$ の距離行列に対し $B$ の階数、唯一の正固有値、最小実現次元を求めよ。$n-1=2$ だから次元2が必要、という主張を評価せよ。

**詳細解答**。平均は $\bar x=7/3$、中心化列は $y=(-7/3,-1/3,8/3)^{\mathsf T}$。[中心化Euclid点群の二重中心化公式](#prop-mfl8-centering-identity)で $B=yy^{\mathsf T}$、従って階数1。$y^{\mathsf T}y=(49+1+64)/9=114/9=38/3$ が唯一の正固有値である。[Euclid距離行列の正半定値判定](#thm-mfl8-euclidean-criterion)から次元1で十分。$n-1$ は階数の**上限**であり、必ず必要な次元ではない。

### MFL8-B04 対角零の仮定が必要な理由

- Level: B
- 問題: $n=2$、$\Delta=\begin{pmatrix}4&1\\1&4\end{pmatrix}$ を二重中心化した $B$ は正半定値だ、とある人が主張した。この主張は正しいか。また $\Delta$ を「二乗距離として実現可能」と判定してよいか。$B_{ii}+B_{jj}-2B_{ij}$ の非対角成分も計算せよ。

**詳細解答**。$J=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ だから、$\Delta J=3J$、$B=-\frac32J$ となり、固有値は $0,-3/2$。従って**正半定値にはならない**。そもそも $\Delta_{11}=\Delta_{22}=4$ は距離の二乗の対角零条件に反しており、[判定定理](#thm-mfl8-euclidean-criterion)の仮定を満たさない。形式的に $B_{ii}+B_{jj}-2B_{ij}$ を作れば非対角は $-3$ となり距離の二乗ではない。問題文の「正半定値になる」という主張は誤りである。行列の符号と前提条件を両方確認する。

### MFL8-C01 非Euclid入力への最良近似

- Level: C
- 問題: 三点距離 $d_{12}=d_{23}=1,d_{13}=3$ を $q=1$ または2で Classical MDS する。固有値から最小 Gramひずみを求め、復元距離を具体的に示し、次元を増やしても入力距離を完全実現できない理由を説明せよ。

**詳細解答**。第3節で $B$ の固有値は $9/2,0,-5/6$、最大固有ベクトルは $u=(1,0,-1)^{\mathsf T}/\sqrt2$ と計算済みである。[最良Gram近似定理](#thm-mfl8-best-gram)に従って正固有値だけを残すと

$$
Y_1=\sqrt{9/2}\,u=(3/2,0,-3/2)^{\mathsf T}.
$$

よって $\widehat d_{12}=\widehat d_{23}=3/2$、$\widehat d_{13}=3$。残差の固有値は $-5/6$ なので Gramひずみは $25/36$。$q=2$ で増やせる非負固有値は零だけで、同じ座標に零列を足す結果となりひずみは変わらない。任意の Euclid座標のGram行列は正半定値だから負固有方向を再現できず、さらに三角不等式 $3>1+1$ の違反がある。これらは同じ実現不能性の二つの診断である。

### MFL8-C02 正負の固有値と次元の選択

- Level: C
- 問題: 中心化された実対称 $4\times4$ 行列 $B$ の固有値を大きい順に $(4,1,0,-1)$ とし、零固有ベクトルに $\boldsymbol1$ があるとする。$q=1,2,3$ に対する最小 Gramひずみを求めよ。$B$ が対称・対角零の二乗距離行列の二重中心化として与えられた場合、入力はEuclid実現可能かも判定せよ。

**詳細解答**。[最良Gram近似定理](#thm-mfl8-best-gram)では正の固有値を大きい順に保持し、負の固有値は保持しない。$\sum_i\lambda_i^2=4^2+1^2+0^2+(-1)^2=18$ だから

$$
\begin{aligned}
q=1:\quad&18-4^2=2,\\
q=2:\quad&18-4^2-1^2=1,\\
q=3:\quad&18-4^2-1^2-0^2=1.
\end{aligned}
$$

$q=2$ で二つの正固有方向をすべて保持した後、零方向を追加しても改善しない。さらに負固有値 $-1$ が存在するので $B$ は正半定値でなく、入力 $D$ が定理の対称・対角零・非負条件を満たす場合、[Euclid実現可能性の判定](#thm-mfl8-euclidean-criterion)により実現不能である。$q$ を3や4にしても負固有値を非負のGramとして再現できない。

## 8. 次章へ

Classical MDS は、距離がEuclid的なら元の配置を剛体運動を除いて復元できる。しかし多様体上の近さを表したいとき、[MFL2の測地距離](../MFL2/index.md#def-mfl2-distances)と空間内の直線距離が異なる。MFL9 の Isomap では、[MFL7のグラフ](../MFL7/index.md#def-mfl7-radius-graph)で最短路距離を近似し、このMDSへ渡す。グラフの非連結・shortcut、距離の非Euclid性、低次元切断の誤差は互いに別の問題として検査する。
