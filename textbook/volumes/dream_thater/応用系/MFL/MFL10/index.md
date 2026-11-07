# MFL10 Locally Linear Embedding

<!-- definition-example-audit: strict -->

## 1. 距離ではなく「近傍からの再構成」を持ち運ぶ

[MFL9のIsomap](../MFL9/index.md#def-mfl9-isomap)は近傍グラフの辺をつないで大域距離を作り、[Classical MDS](../MFL8/index.md#def-mfl8-classical-mds)で座標にした。曲がった点群の大域距離が信用しにくい場合、各点が**周囲の点のどんな組合せで表せるか**という局所関係だけを保存する別の選択がある。それが Locally Linear Embedding（LLE）である。

例えば直線上の $-1,0,1$ では、中点0は両端の平均 $(-1)/2+1/2=0$ になる。これを平行移動して $9,10,11$ にしても、平均を作る係数は同じである。一方、端の点を他の二点で正確に再構成するには負の係数が必要になる。LLEは重みの符号を先験的に非負へ制限しない。

本章の入力は、添字で区別した $n\ge3$ 個の点と、各点の近傍添字集合である。周囲空間の次元を $D\ge1$ とし、条件を明示すると

$$
z_1,\ldots,z_n\in\mathbb R^D,\qquad
\varnothing\ne N_i\subset\{1,\ldots,n\}\setminus\{i\}.
$$

近傍は[MFL7の方向付き $k$ 近傍](../MFL7/index.md#def-mfl7-knn-symmetrization)や[半径近傍](../MFL7/index.md#def-mfl7-radius-graph)から決められる。近傍関係は対称でなくてよく、点が一致する場合も添字は別に扱う。出力次元は $1\le m\le n-1$ とする。

手順は二段階である。

1. 各 $z_i$ をその近傍のアフィン結合で再構成し、重み行列 $W$ を作る。
2. 同じ $W$ を低次元座標へ移し、中心化と尺度の制約の下で残差の和を最小化する。

**注意**：ここで最小化するのは測地距離でも二点間距離の二乗誤差でもない。近傍の選び方、特異な局所行列、固有値の重複を別々に吟味する。

## 2. 局所アフィン再構成とGram行列

係数 $w_{ij}$ を用いて $z_i$ を $\sum_{j\in N_i}w_{ij}z_j$ で近似する。**アフィン結合**とは係数の和が1である線形結合のこと。平行移動で座標原点がずれてもこの制約のおかげで残差は変わらない。近傍外の係数は0と固定する。

<a id="def-mfl10-affine-weights"></a>

<!-- formal-statement-start -->
> **定義（局所アフィン再構成重み）**
> $z_1,\ldots,z_n\in\mathbb R^D$ と各 $i$ の非空近傍 $N_i$ を与える。実数係数 $w_{ij}$（$j\in N_i$）について

$$
\sum_{j\in N_i}w_{ij}=1,\qquad
E_i(w)=\left\|z_i-\sum_{j\in N_i}w_{ij}z_j\right\|^2
$$

> とする。$E_i$ を行和1の下で最小にする重みを局所アフィン再構成重みと呼ぶ。近傍外を $w_{ij}=0$ として $n\times n$ 行列 $W=(w_{ij})$ に拡張する。したがって $W\boldsymbol1=\boldsymbol1$ であり、$w_{ii}=0$ である。重みは負でもよく、最小化解が一意とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl10-affine-weights -->
**定義の確認**。$z_1=-1,z_2=0,z_3=1$ とし、$N_2=\{1,3\}$ とする。$w_{21}+w_{23}=1$ の下で

$$
E_2=|0-(-w_{21}+w_{23})|^2=(w_{21}-w_{23})^2.
$$

$w_{21}=w_{23}=1/2$ なら行和1、近傍外0、再構成誤差0を満たす。誤差は非負だから最小値0である。さらに誤差0は $w_{21}=w_{23}$ を強制するので、この行の最小化解は一意である。これを $+10$ 平行移動しても、$10=(9+11)/2$ となり重みは変わらない。
<!-- definition-example-end -->

係数を求めるには点 $z_i$ を基準にして近傍を差へ変える。$N_i=\{j_1,\ldots,j_k\}$（順序を一度固定）と書き、列を並べた $D\times k$ 行列

$$
Z_i=\bigl[z_{j_1}-z_i\ \cdots\ z_{j_k}-z_i\bigr]
$$

を作る。列の内積を並べた $k\times k$ 行列 $C_i=Z_i^{\mathsf T}Z_i$ を局所Gram行列と呼ぶ。[MFL8のGram行列の考え方](../MFL8/index.md#def-mfl8-double-centered-gram)と同じく、$C_i$ の $(a,b)$ 成分は差ベクトル同士の内積である。ただし本章の $C_i$ は**近傍差のGram行列**で、MDSの二重中心化行列とは異なる。

<a id="prop-mfl10-local-gram"></a>

<!-- formal-statement-start -->
> **命題（局所Gram形式と正定値重みの公式）**
> $D\ge1$、$N_i=\{j_1,\ldots,j_k\}$、$k\ge1$ とし、列重み $w=(w_{ij_1},\ldots,w_{ij_k})^{\mathsf T}\in\mathbb R^k$ を考える。$\boldsymbol1_k^{\mathsf T}w=1$ の下で

$$
E_i(w)=w^{\mathsf T}C_iw,\qquad C_i=Z_i^{\mathsf T}Z_i
$$

> が成立する。特に $C_i$ が正定値なら最小化重みは一意であり、

$$
w_*=\frac{C_i^{-1}\boldsymbol1_k}
{\boldsymbol1_k^{\mathsf T}C_i^{-1}\boldsymbol1_k}.
$$

> 分母は正である。$C_i$ が特異でも、上の制約付き最小化問題には解が存在するが、逆行列による公式は使用できず、一意性も自動的には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

行和1を使って $z_i-\sum_jw_jz_j=-\sum_jw_j(z_j-z_i)=-Z_iw$ とする。正定値の場合は、候補 $w_*$ と制約を満たす別の $w_*+h$ の差を計算して、交差項が消え、残りが正になることから一意性を示す。

<!-- proof-start -->
### 証明

$\boldsymbol1_k^{\mathsf T}w=1$ より、

$$
\begin{aligned}
z_i-\sum_{a=1}^kw_az_{j_a}
&=\left(\sum_{a=1}^kw_a\right)z_i-\sum_{a=1}^kw_az_{j_a}\\
&=-\sum_{a=1}^kw_a(z_{j_a}-z_i)=-Z_iw.
\end{aligned}
$$

ノルムの二乗を内積へ戻せば $\|Z_iw\|^2=w^{\mathsf T}Z_i^{\mathsf T}Z_iw$ である。正定値 $C_i$ は可逆であり、$u=C_i^{-1}\boldsymbol1_k$ に対して

$$
s=\boldsymbol1_k^{\mathsf T}u
=\boldsymbol1_k^{\mathsf T}C_i^{-1}\boldsymbol1_k>0.
$$

最後の不等式は次のように確かめられる。任意の非零 $x$ に対し $y=C_i^{-1}x\ne0$ とおけば、

$$
x^{\mathsf T}C_i^{-1}x=(C_iy)^{\mathsf T}y=y^{\mathsf T}C_iy>0
$$

であり、逆行列も正定値である。$w_*=u/s$ は制約を満たし、$C_iw_*=\boldsymbol1_k/s$。任意の別の可行重みを $w_*+h$ と書けば $\boldsymbol1_k^{\mathsf T}h=0$ であり、

$$
\begin{aligned}
(w_*+h)^{\mathsf T}C_i(w_*+h)-w_*^{\mathsf T}C_iw_*
&=2h^{\mathsf T}C_iw_*+h^{\mathsf T}C_ih\\
&=\frac2s h^{\mathsf T}\boldsymbol1_k+h^{\mathsf T}C_ih\\
&=h^{\mathsf T}C_ih.
\end{aligned}
$$

これは $h\ne0$ なら正なので $w_*$ が唯一の最小点である。

特異な場合は $w_0=\boldsymbol1_k/k$ とし、$\boldsymbol1_k^{\mathsf T}h=0$ を満たす部分空間の基底を列に並べた $k\times(k-1)$ 行列を $H$ とする（$k=1$ なら空行列）。可行重みを $w=w_0+Ht$ と書くと、$t\in\mathbb R^{k-1}$ について

$$
E_i(w_0+Ht)=\|Z_iw_0+(Z_iH)t\|^2.
$$

これは点 $-Z_iw_0$ と有限次元部分空間 $\operatorname{im}(Z_iH)$ との距離二乗を最小化する問題である。部分空間への直交射影が存在するため最小値は達成される。ただし $Z_iH$ に核があれば、同じ残差を作る異なる $t$ が存在して一意性が失われる。$\square$
<!-- proof-end -->

**正定値は十分条件で、必要条件ではない**。中心点0、近傍 $-1,1$ の局所Gramは

$$
C=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\qquad \det C=0.
$$

しかし制約 $w_1+w_2=1$ により $E=(2w_1-1)^2$ となり、唯一の解は $(1/2,1/2)$ である。反対に点0の二つの近傍がともに点1なら

$$
C=\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
E=(w_1+w_2)^2=1
$$

で、行和1を満たす**すべて**の重みが最小化解になる。重なった標本は行列だけでなく推定すべき係数の識別可能性を壊す。

## 3. 特異近傍を正則化する

$k>D$ なら $Z_i$ の列は線形従属で $C_i$ は必ず特異になる。小さな固有値があるだけでも逆行列による係数は大きくなり得る。そこで再構成誤差に重みの二乗の罰則を加える。これは最小二乗問題そのものを変更する操作であり、「逆行列の計算だけを安定させる」操作ではない。

<a id="def-mfl10-ridge-weights"></a>

<!-- formal-statement-start -->
> **定義（ridge正則化局所重み）**
> 局所Gram行列 $C_i=Z_i^{\mathsf T}Z_i$ と正数 $\lambda_i>0$ を与える。$\boldsymbol1_k^{\mathsf T}w=1$ の下で

$$
E_{i,\lambda}(w)=w^{\mathsf T}C_iw+\lambda_i\|w\|^2
$$

> を最小にする重みをridge正則化局所重みと呼ぶ。$A_i=C_i+\lambda_iI_k$ と置く。尺度適応型の一例は $\operatorname{tr}C_i>0$ のとき $\lambda_i=\gamma\operatorname{tr}C_i$（$\gamma>0$）である。$\operatorname{tr}C_i=0$ なら別途正の値を選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl10-ridge-weights -->
**定義の確認**。中心点0、近傍1,2なら $Z=(1,2)$、$C=\left(\begin{smallmatrix}1&2\\2&4\end{smallmatrix}\right)$ は特異である。$\lambda=2>0$ とし、$w=(1-t,t)$ とおくと、

$$
E_{\lambda}(1-t,t)=(1+t)^2+2((1-t)^2+t^2)
=3-2t+5t^2.
$$

導関数 $-2+10t=0$ から唯一の最小点は $t=1/5$、すなわち $w=(4/5,1/5)$。行和は1、近傍外は0、入力再構成誤差は $(6/5)^2$。正則化なしなら $w=(2,-1)$ で再構成誤差0となる。**正則化は重みの大きさを抑える代わりに局所再構成を犠牲にする**。
<!-- definition-example-end -->

ridgeの式でなぜ $C_i+\lambda_iI_k$ を使えるかも、二乗ノルムへ戻して確認できる。差行列 $Z_i$ の下に $\sqrt{\lambda_i}I_k$ を縦に並べた $(D+k)\times k$ 行列を

$$
\widetilde Z_i=\begin{pmatrix}Z_i\\\sqrt{\lambda_i}I_k\end{pmatrix}
$$

とすると、制約 $\boldsymbol1_k^{\mathsf T}w=1$ の下で

$$
\widetilde Z_i^{\mathsf T}\widetilde Z_i=C_i+\lambda_iI_k=A_i,
\qquad E_{i,\lambda}(w)=\|\widetilde Z_iw\|^2=w^{\mathsf T}A_iw
$$

となる。つまり正則化後も[局所Gram形式と正定値重みの公式](#prop-mfl10-local-gram)を適用できる形だが、元の点群の再構成誤差 $E_i$ 自体が小さくなるとは限らない。

<a id="prop-mfl10-ridge"></a>

<!-- formal-statement-start -->
> **命題（ridge重みの一意性と変換則）**
> 任意の $D\times k$ 行列 $Z_i$、$\lambda_i>0$ に対して $A_i=C_i+\lambda_iI_k$ は正定値である。よってridge重みは唯一で、

$$
w_\lambda=\frac{A_i^{-1}\boldsymbol1_k}
{\boldsymbol1_k^{\mathsf T}A_i^{-1}\boldsymbol1_k}.
$$

> 入力の全点を同じ $b\in\mathbb R^D$ だけ平行移動し、または同じ直交行列 $Q$ で変換しても、近傍添字集合と $\lambda_i$ を固定すれば重みは不変である。$\operatorname{tr}C_i>0$ で $\lambda_i=\gamma\operatorname{tr}C_i$ を用い、全点を $aQz_j+b$（$a\ne0$）へ変換する場合も重みは不変である。任意の可逆線形変換に対する不変性は一般には成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

$v^{\mathsf T}A_iv=\|Z_iv\|^2+\lambda_i\|v\|^2$ は非零 $v$ で正。公式は前の[Gram重み公式](#prop-mfl10-local-gram)に正定値行列 $A_i$ を代入する。差行列の変換を直接追えば、不変性の範囲が分かる。

<!-- proof-start -->
### 証明

$v\ne0$ について

$$
v^{\mathsf T}A_iv=v^{\mathsf T}Z_i^{\mathsf T}Z_iv+\lambda_i v^{\mathsf T}v
=\|Z_iv\|^2+\lambda_i\|v\|^2>0.
$$

従って $A_i$ は正定値で、[正定値重みの一意性](#prop-mfl10-local-gram)の証明を $C_i$ から $A_i$ へ置き換えて公式を得る。

平行移動では $(z_j+b)-(z_i+b)=z_j-z_i$ なので $Z_i$ が変わらない。直交変換では $Z_i'=QZ_i$ だから

$$
C_i'=(QZ_i)^{\mathsf T}(QZ_i)=Z_i^{\mathsf T}Q^{\mathsf T}QZ_i=C_i.
$$

尺度 $a$ も加えれば、

$$
Z_i'=aQZ_i,\quad C_i'=a^2C_i,\quad
\operatorname{tr}C_i'=a^2\operatorname{tr}C_i.
$$

尺度適応型では $\lambda_i'=a^2\lambda_i$ なので $A_i'=a^2A_i$ である。重み公式の分子・分母はともに $a^{-2}$ 倍になり、比は同じ。一方、一般の可逆行列 $T$ では

$$
C_i'=Z_i^{\mathsf T}T^{\mathsf T}TZ_i
$$

となり、$T^{\mathsf T}T$ がスカラー倍の単位行列でない限り一様な尺度倍とは限らない。$\square$
<!-- proof-end -->

例えば二つの直交方向に差ベクトル $(1,0),(0,1)$ を取った中心点では、非正則化の正定値重みは $(1/2,1/2)$ である。第一座標だけを2倍に変換すれば $C=\operatorname{diag}(4,1)$ となり、公式は $(1/5,4/5)$ を与える。行和1は保たれても重みは変わる。なお正則化後は、$w_\lambda$ が元の $E_i$ の最小化解とは限らない。

## 4. 低次元で同じ重みを保つ

局所重みを並べた $W$ は一般に非対称で、負の成分もある。低次元座標 $y_i\in\mathbb R^m$ を行とする $n\times m$ 行列 $Y$ を作り、$y_i$ と $\sum_jw_{ij}y_j$ の差を小さくする。何も制約しないと全点 $y_i=0$ が自明な最小解になるため、中心化と大きさの規格化を課す。

<a id="def-mfl10-embedding"></a>

<!-- formal-statement-start -->
> **定義（LLEの埋め込み変分問題）**
> $n\ge3$、$1\le m\le n-1$、$W\in\mathbb R^{n\times n}$ が $W\boldsymbol1=\boldsymbol1$ を満たすとする。$Y=(y_i^{\mathsf T})_{i=1}^n\in\mathbb R^{n\times m}$ について

$$
\Phi(Y)=\sum_{i=1}^n\left\|y_i-\sum_{j=1}^nw_{ij}y_j\right\|^2
$$

> を

$$
Y^{\mathsf T}\boldsymbol1=0,\qquad Y^{\mathsf T}Y=nI_m
$$

> の下で最小化する。この問題をLLEの埋め込み変分問題と呼ぶ。$\boldsymbol1$ は全成分1の $n$ 次元列ベクトルである。規格化の $n$ は慣例によるもので、最小化方向は変えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl10-embedding -->
**定義の確認**。3点に対して

$$
W=\begin{pmatrix}0&1&0\\1/2&0&1/2\\0&1&0\end{pmatrix},
\quad Y=\sqrt{\frac32}\begin{pmatrix}1\\0\\-1\end{pmatrix}.
$$

すべての行和は1、対角は0であり、$Y$ の成分和は0、平方和は $(3/2)(1+0+1)=3$。第一・第三行の再構成残差はそれぞれ $\sqrt{3/2}$、$-\sqrt{3/2}$、中央行は0。よって $\Phi(Y)=3$ で、**零への崩壊を禁止した可行座標**になっている。これが最小解であることは次の固有値定理で確認する。
<!-- definition-example-end -->

$B=I_n-W$ と置けば第 $i$ 行の残差は $BY$ の第 $i$ 行であり、二乗和は

$$
\Phi(Y)=\|BY\|_F^2
=\operatorname{tr}(Y^{\mathsf T}B^{\mathsf T}BY).
$$

ここで $\|A\|_F^2$ は行列の全成分の二乗和であり、$\operatorname{tr}$ は対角成分の和である。以後

$$
M=(I_n-W)^{\mathsf T}(I_n-W)=B^{\mathsf T}B
$$

と書く。$M$ は実対称かつ正半定値で、$W\boldsymbol1=\boldsymbol1$ から $B\boldsymbol1=0$、従って $M\boldsymbol1=0$。$W$ 自身の固有値を選ぶのではなく、**対称行列 $M$ の固有値**を選ぶことに注意する。

次の $\lambda_1,\ldots,\lambda_n$ は $M$ の固有値であり、第3節の $\lambda_i$（点 $i$ のridge罰則係数）とは別の量を表す。

<a id="thm-mfl10-spectral"></a>

<!-- formal-statement-start -->
> **定理（LLE二次形式の固有値最小化）**
> $n\ge3$、$1\le m\le n-1$、$W\in\mathbb R^{n\times n}$、$W\boldsymbol1=\boldsymbol1$ とする。$M=(I_n-W)^{\mathsf T}(I_n-W)$ の固有値を重複込みで

$$
0=\lambda_1\le\lambda_2\le\cdots\le\lambda_n
$$

> と並べ、$\boldsymbol1/\sqrt n$ を第一固有ベクトルとする正規直交固有基底 $u_1,\ldots,u_n$ を選ぶ。このとき[埋め込み変分問題](#def-mfl10-embedding)の最小値は

$$
\min\Phi(Y)=n\sum_{a=2}^{m+1}\lambda_a
$$

> であり、$Y=\sqrt n[u_2\ \cdots\ u_{m+1}]$ が最小解の一つである。零固有値が重複する場合、$\boldsymbol1$ 以外の零固有方向も残り、単に「最小固有値を一つ捨てれば一意」とは言えない。
<!-- formal-statement-end -->

### 証明の見取り図

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)による正規直交固有基底への展開を使う。中心化により $u_1$ の係数は0になる。残りの各固有方向に配分する列の平方和は一定で、最小化では小さい固有値から $m$ 個を選ぶ。

<!-- proof-start -->
### 証明

まず任意の $v\in\mathbb R^n$ で $v^{\mathsf T}Mv=\|Bv\|^2\ge0$ なので全固有値は非負。$B\boldsymbol1=0$ より $M\boldsymbol1=0$ だから $\lambda_1=0$、$u_1=\boldsymbol1/\sqrt n$ を選べる。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により、これを含む正規直交固有基底が存在する。

$Y$ の各列を固有ベクトルに展開し、$Y=\sqrt n\,UQ$ と書く。$U=[u_1,\ldots,u_n]$ は直交行列で、$Q\in\mathbb R^{n\times m}$ である。$e_1$ を第一標準基底ベクトルとすると、$U^{\mathsf T}U=I_n$、$U^{\mathsf T}\boldsymbol1=\sqrt n\,e_1$ より

$$
Y^{\mathsf T}Y=nQ^{\mathsf T}Q,\qquad
Y^{\mathsf T}\boldsymbol1=nQ^{\mathsf T}e_1.
$$

従って制約は

$$
Q^{\mathsf T}Q=I_m,\qquad Q_{1a}=0\quad(1\le a\le m).
$$

$U^{\mathsf T}MU=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$ より

$$
\Phi(Y)=n\operatorname{tr}(Q^{\mathsf T}\operatorname{diag}(\lambda)Q)
=n\sum_{r=2}^n\lambda_r p_r,\quad
p_r=\sum_{a=1}^m Q_{ra}^2.
$$

$Q$ の列は正規直交だから $\sum_{r=2}^np_r=m$。さらに $QQ^{\mathsf T}$ は直交射影なので、$e_r$ を第 $r$ 標準基底ベクトルとして

$$
p_r=e_r^{\mathsf T}QQ^{\mathsf T}e_r
=\|Q^{\mathsf T}e_r\|^2,\qquad 0\le p_r\le1.
$$

この制約の下で、$r<s$ なのに $p_r<1$、$p_s>0$ なら、$\delta=\min(1-p_r,p_s)$ だけ $p_s$ から $p_r$ へ移すと目的値の変化は

$$
\delta(\lambda_r-\lambda_s)\le0
$$

である。従って最小値の下界は、小さい固有値に対応する $m$ 個へ1ずつ配分した

$$
\sum_{r=2}^n\lambda_r p_r\ge\sum_{r=2}^{m+1}\lambda_r.
$$

$Q$ の第 $a$ 列を $e_{a+1}$ とすれば等号が達成され、$Y=\sqrt n[u_2,\ldots,u_{m+1}]$ となる。固有値重複時は同じ固有空間内の基底選択が残る。$\square$
<!-- proof-end -->

**三点の固有値を手で確認する**。先ほどの $W$ から

$$
M=\begin{pmatrix}
5/4&-3/2&1/4\\
-3/2&3&-3/2\\
1/4&-3/2&5/4
\end{pmatrix}.
$$

次の三つの正規直交ベクトルに $M$ を作用させると、固有値は順に $0,1,9/2$ となる。

$$
u_1=\frac{(1,1,1)^{\mathsf T}}{\sqrt3},\qquad
u_2=\frac{(1,0,-1)^{\mathsf T}}{\sqrt2},\qquad
u_3=\frac{(1,-2,1)^{\mathsf T}}{\sqrt6}.
$$

$m=1$ の最小座標は $Y=\sqrt3u_2$、最小値は $3\lambda_2=3$ で、定義例と一致する。平行移動や全体の符号反転は規格化後の固有方向に影響しないが、固有値が等しい方向の選択には非一意性がある。

## 5. 核の大きさは連結性だけでは決まらない

$Mv=0$ なら $v^{\mathsf T}Mv=\|Bv\|^2=0$、よって $Wv=v$ である。逆も成立するので、

$$
\ker M=\ker(I_n-W).
$$

行和1は定数方向が核にあることだけを保証する。グラフが非連結なら成分ごとの定数も核に入る。さらにLLEの重みは負になり得るので、無向の隣接構造が連結でも核が増えることがある。

<a id="prop-mfl10-disconnected"></a>

<!-- formal-statement-start -->
> **命題（非連結近傍と追加零固有方向）**
> $W$ が行和1で、添字集合 $V$ が空でない $r\ge2$ 個の集合 $V_1,\ldots,V_r$ に分かれ、$i\in V_a,j\notin V_a$ なら $w_{ij}=0$ とする。各集合の指示ベクトル $\boldsymbol1_{V_a}\in\mathbb R^n$ は $M=(I-W)^{\mathsf T}(I-W)$ の核に入り、

$$
\dim\ker M\ge r.
$$

> ただしこの下界は等号とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

行和1を成分内へ制限すると、各成分を1、他を0とするベクトルが $W$ の固定点になる。これらは互いに直交し、一次独立である。

<!-- proof-start -->
### 証明

$i\in V_a$ なら $(W\boldsymbol1_{V_a})_i=\sum_{j\in V_a}w_{ij}=\sum_jw_{ij}=1$ である。$i\notin V_a$ なら、$i$ の所属集合から外へ出る係数が0なので $(W\boldsymbol1_{V_a})_i=0$。従って $W\boldsymbol1_{V_a}=\boldsymbol1_{V_a}$ で、$(I-W)\boldsymbol1_{V_a}=0$、さらに $M\boldsymbol1_{V_a}=0$。指示ベクトルの支持集合は互いに素で、各集合は空でないから $r$ 本は一次独立。$\square$
<!-- proof-end -->

四点を二つのペアに分け、各点が相方だけを重み1で参照すると

$$
W=\begin{pmatrix}
0&1&0&0\\1&0&0&0\\0&0&0&1\\0&0&1&0
\end{pmatrix},
\qquad \operatorname{spec}(M)=\{0,0,4,4\}.
$$

平均を0にする制約は全体の定数方向だけを除くため、二成分の間にはまだ零エネルギーの自由度が残る。

<a id="prop-mfl10-signed"></a>

<!-- formal-statement-start -->
> **命題（符号付き重みの連結グラフでも核が増える例）**
> 一次元の相異なる3点 $z=(-1,0,1)$ について、各点の近傍を他の2点すべてとし、正則化なしで局所アフィン再構成を誤差0にする重みを取ると

$$
W=\begin{pmatrix}
0&2&-1\\
1/2&0&1/2\\
-1&2&0
\end{pmatrix}
$$

> が得られる。近傍グラフは連結だが、$\ker M=\operatorname{span}\{\boldsymbol1,z\}$ は2次元であり、$M$ の固有値は $0,0,27/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各行は行和1と元の点の再構成 $Wz=z$ を直接満たす。二つの一次独立な固定ベクトルがあるので核は少なくとも2次元。$I-W$ の全行が同一ベクトルの倍数になることから階数を求める。

<!-- proof-start -->
### 証明

一行目は $2z_2-z_3=-1=z_1$、二行目は $(z_1+z_3)/2=0=z_2$、三行目は $-z_1+2z_2=1=z_3$。それぞれ重みの和は $0+2-1=1$、$1/2+0+1/2=1$、$-1+2+0=1$ で、誤差0が実現される。他の2点の座標は相異なるので、各行の行和1と再構成値の二つの一次方程式からこの重みは一意である。

$v=(1,-2,1)^{\mathsf T}$ とすると

$$
I-W=\begin{pmatrix}v^{\mathsf T}\\-v^{\mathsf T}/2\\v^{\mathsf T}\end{pmatrix},
\qquad
M=\left(1+\frac14+1\right)vv^{\mathsf T}=\frac94vv^{\mathsf T}.
$$

$v^{\mathsf T}v=6$ なので $M$ の階数は1で、唯一の正固有値は $(9/4)6=27/2$。$\boldsymbol1$ と $z$ は $v$ に直交する一次独立な二ベクトルであり、核を張る。すべての異なる頂点対に係数があるので近傍グラフは連結。$\square$
<!-- proof-end -->

この例では $m=1$ で零固有値方向 $z/\sqrt2$ を埋め込みへ取ればエネルギー0である。しかしこれは単純な一次元の特例であり、一般の曲がった多様体について大域的な距離を保証するものではない。正則化すると通常この追加の零方向は持ち上がるが、固有値の小ささや間隔は数値安定性に直接関係する。

## 6. Isomap・MDSとの違いと破綻の診断

- [Isomapの測地距離構成](../MFL9/index.md#def-mfl9-isomap)はグラフ上の遠距離を定義してからMDSへ渡す。LLEは遠距離の値を直接使わず、局所アフィン重みを低次元に持ち運ぶ。
- [MDSの二重中心化Gram](../MFL8/index.md#def-mfl8-double-centered-gram)とLLEの $M$ はどちらも対称行列だが、前者には負固有値が現れ得る一方、後者は必ず正半定値。**正半定値だから測地距離を保存する**という推論は誤りである。
- $k>D$、重複点、ほぼ同一直線上の近傍では局所Gramが特異または悪条件になりやすい。正則化の強さはその近傍の形状をどれほど変えるかという選択である。
- 入力が別々の成分へ割れれば定数方向が増える。負の重みを持つ場合は、連結という見た目の条件だけでは零固有値が一つとは言えない。微小な固有値を丸める閾値も結果を左右する。
- 出力は規格化された固有ベクトルで、全体の直交変換と固有値重複による基底の不定性を持つ。標本密度や近傍の条件なしに、多様体の位相・測地距離・次元を回復する一般定理はここから従わない。

原著は Roweis & Saul, [Nonlinear Dimensionality Reduction by Locally Linear Embedding](https://doi.org/10.1126/science.290.5500.2323) (2000)。本章では有限行列に関する結論を直接証明した。連続極限や統計的収束の一般保証は仮定を追加して初めて議論できる。

## 7. 計算実験

付属の [lle_lab.py](lle_lab.py) はPython標準ライブラリだけで局所Gram、ridge重み、$M$、対称Jacobi固有分解を計算する。例は直線点群、すべて一致する点、正則化なしで符号付き重みを手計算できる3点である。重みの行和、入力再構成残差、零固有値の数に加え、中心化・規格化した一次元埋め込みとその残差二乗和をJSONで出す。

以下で入力点群と一次元埋め込みを比較できる。重みの `--gamma` は引数欄で変更できるが、`signed` 例は正則化しない設定である。

```python-file-lab
# lab-id: MFL10-LLE-FILE
# lab-title: LLE・再構成重みと一次元埋め込み
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL10/lle_lab.py
# timeout-ms: 15000
# lab-preset: 直線点群 | --case line --gamma 0.01
# lab-preset: 一致する点群 | --case coincident
# lab-preset: 符号付き重み | --case signed
```

ローカル環境ではリポジトリのルートから実行する。

    python3 textbook/volumes/dream_thater/応用系/MFL/MFL10/lle_lab.py --case line --gamma 0.01
    python3 textbook/volumes/dream_thater/応用系/MFL/MFL10/lle_lab.py --case coincident
    python3 textbook/volumes/dream_thater/応用系/MFL/MFL10/lle_lab.py --case signed
    python3 -m unittest discover -s textbook/volumes/dream_thater/応用系/MFL/MFL10 -p 'test_*.py'

line は各行の局所Gramを計算して尺度適応型ridgeを適用する。coincident では $\operatorname{tr}C_i=0$ なので正の絶対ridgeを使い、各近傍が均等重みになる。signed だけは正則化なしの手計算の $W$ を使用し、零固有値二個を確認する。数値の閾値による零判定は数学的な厳密零とは別に扱う。

## 8. 演習

### MFL10-A01 中点の重みを制約から導く

- Level: A
- 問題: 中心点 $z_i=0$、近傍 $z_a=-2,z_b=2$ に対し、行和1と[局所再構成誤差](#def-mfl10-affine-weights)を使い重みを求めよ。最小誤差も答えよ。

**詳細解答**。$w_a=t,w_b=1-t$ と置くと、再構成は $-2t+2(1-t)=2-4t$ であり、

$$
E_i(t)=|0-(2-4t)|^2=(4t-2)^2.
$$

非負の平方の最小値0は $4t-2=0$ のときだけ達成する。よって $w_a=w_b=1/2$。行和は $1/2+1/2=1$、両点とも近傍内で、最小誤差は0。

### MFL10-A02 特異行列と非一意性

- Level: A
- 問題: 中心点0の近傍二点がどちらも座標1であるとする。局所Gram行列を作り、正則化なしの最小化解が一意でないことを示せ。また $\lambda=2$ のridge解を求めよ。

**詳細解答**。差ベクトルの列はどちらも1だから

$$
C=\begin{pmatrix}1&1\\1&1\end{pmatrix},\quad \det C=0.
$$

$w=(t,1-t)$ とすると再構成値は $t+(1-t)=1$ で、$E_i=1$ は $t$ に依存しない。従って任意の実数 $t$ が最小化解。ridge項を加えると

$$
E_{i,2}=1+2(t^2+(1-t)^2)
=2+4(t-1/2)^2.
$$

よって唯一のridge解は $(1/2,1/2)$、最小正則化目的値は2である。元の再構成誤差の最小値1とは区別する。

### MFL10-A03 ridgeの具体計算

- Level: A
- 問題: 中心点0、近傍1,2、$\lambda=2$ に対し、$A=C+2I_2$ を作って [ridge重みの一意性と変換則](#prop-mfl10-ridge)の公式の分子と分母を計算せよ。

**詳細解答**。$Z=(1,2)$ より

$$
A=\begin{pmatrix}3&2\\2&6\end{pmatrix},\quad
\det A=18-4=14,\quad
A^{-1}=\frac1{14}\begin{pmatrix}6&-2\\-2&3\end{pmatrix}.
$$

従って $A^{-1}\boldsymbol1=(4,1)^{\mathsf T}/14$、分母は $5/14$。割って $w=(4/5,1/5)$。和1を確認し、再構成値 $4/5+2/5=6/5$、元の誤差 $(6/5)^2=36/25$ を得る。

### MFL10-A04 二つの非連結ペア

- Level: A
- 問題: 四点で $w_{12}=w_{21}=w_{34}=w_{43}=1$、他は0とする。行和と $\ker(I-W)$ の二つの独立なベクトルを求めよ。

**詳細解答**。各行は非零成分が一つだけで1なので行和1。$u=(1,1,0,0)^{\mathsf T}$、$v=(0,0,1,1)^{\mathsf T}$ について $Wu=u,Wv=v$。支持が互いに素でともに非零だから一次独立で、[非連結核の命題](#prop-mfl10-disconnected)により $\dim\ker M\ge2$。実際各ペア内で $Wx=x$ は $x_1=x_2$、$x_3=x_4$ を強制するので核の次元はちょうど2。

### MFL10-B01 正定値な近傍

- Level: B
- 問題: 二次元の中心点 $(0,0)$ の近傍を $(1,0),(0,2)$ とする。局所Gramが正定値であることを確かめ、正則化なしの重みと最小誤差を求めよ。

**詳細解答**。差行列 $Z=\left(\begin{smallmatrix}1&0\\0&2\end{smallmatrix}\right)$ から $C=\operatorname{diag}(1,4)$。非零 $v=(v_1,v_2)$ なら $v^{\mathsf T}Cv=v_1^2+4v_2^2>0$ なので正定値。逆行列は $\operatorname{diag}(1,1/4)$ で、[局所Gram形式と正定値重みの公式](#prop-mfl10-local-gram)より

$$
w=\frac{(1,1/4)^{\mathsf T}}{1+1/4}
=\begin{pmatrix}4/5\\1/5\end{pmatrix}.
$$

再構成値は $(4/5,2/5)$、二乗誤差は $(4/5)^2+(2/5)^2=20/25=4/5$。原点はこの二近傍のアフィン直線上にないので、誤差0にはできない。

### MFL10-B02 尺度適応型ridge

- Level: B
- 問題: 中心点0の近傍を1,2とし、$\gamma=2/5$、$\lambda=\gamma\operatorname{tr}C$ とする。重みを求める。入力をすべて3倍したとき $\lambda$、$A$、重みがどう変わるか計算せよ。

**詳細解答**。$C=\left(\begin{smallmatrix}1&2\\2&4\end{smallmatrix}\right)$、$\operatorname{tr}C=5$ なので $\lambda=(2/5)5=2$。前問とは違い元の局所行列は特異だが、[ridge重みの一意性と変換則](#prop-mfl10-ridge)の公式から $w=(4/5,1/5)$ となる。入力を3倍すると差行列は $3Z$、$C'=9C$、$\operatorname{tr}C'=45$、$\lambda'=(2/5)45=18$。従って

$$
A'=C'+18I_2=9(C+2I_2)=9A.
$$

逆行列は $A'^{-1}=A^{-1}/9$。重み公式の分子・分母がともに $1/9$ 倍され、重みは $(4/5,1/5)$ のまま。絶対ridge $\lambda=2$ を固定する場合にはこの結論を無条件に使えない。

### MFL10-B03 三点道のLLE固有分解

- Level: B
- 問題: $W=\left(\begin{smallmatrix}0&1&0\\1/2&0&1/2\\0&1&0\end{smallmatrix}\right)$ とする。$M=(I-W)^{\mathsf T}(I-W)$ を作り、固有値と $m=1$ の最小値、制約を満たす最小座標を求めよ。

**詳細解答**。$I-W$ の各行は $(1,-1,0)$、$(-1/2,1,-1/2)$、$(0,-1,1)$ である。列同士の内積を取ると

$$
M=\begin{pmatrix}
5/4&-3/2&1/4\\
-3/2&3&-3/2\\
1/4&-3/2&5/4
\end{pmatrix}.
$$

$\boldsymbol1$ に作用すると0、$(1,0,-1)$ に作用すると自身、$(1,-2,1)$ に作用すると $(9/2)(1,-2,1)$。三つのベクトルは互いに直交し非零なので固有値は $0,1,9/2$ で尽くされる。[LLE二次形式の固有値最小化](#thm-mfl10-spectral)により $Y=\sqrt{3/2}(1,0,-1)^{\mathsf T}$、最小値 $3\cdot1=3$。成分和0、平方和3も直接確認できる。

### MFL10-B04 連結でも重複する零固有値

- Level: B
- 問題: $z=(-1,0,1)$ で各点が他の2点を用い再構成誤差0になるよう重みを求め、$\ker M$ の次元と、どの仮定が「連結なら核1次元」という推測を破るか説明せよ。

**詳細解答**。端点 $-1$ の再構成は、行和1と

$$
w_2\cdot0+w_3\cdot1=-1,\qquad w_2+w_3=1
$$

から $(w_2,w_3)=(2,-1)$。中点0は $(w_1,w_3)=(1/2,1/2)$、右端1は $(w_1,w_2)=(-1,2)$ である。

従って [符号付き重みの連結グラフでも核が増える例](#prop-mfl10-signed)の $W$ に一致し、$\boldsymbol1,z$ は二つの独立な固定ベクトルである。同命題の計算から $I-W$ の各行は $(1,-2,1)$ の非零な倍数なので、$\ker(I-W)$ は一つの方程式で決まる。実際、$x_2=s,x_3=t$ と自由に置けば

$$
x_1-2x_2+x_3=0
\quad\Longleftrightarrow\quad
x=(2s-t,s,t)^{\mathsf T}.
$$

二つの自由変数があるので、$\ker M=\ker(I-W)$ は2次元である。

近傍グラフは完全に連結だが、端点の**負の係数**を許したため、非負の平均による固定点の議論は使えない。非負で行和1の $W$ なら、$Wx=x$ の最大成分 $c$ は非負重み付き平均 $c=\sum_jw_{ij}x_j$ でもある。従って正の重みで結ばれた隣接点も同じ最大値を取る。これを連結グラフ上で伝播させれば $x$ は定数になるが、負の重みがあると「平均が最大値なら各項も最大値」という推論が破れる。

### MFL10-C01 ridgeで符号が変わる境界

- Level: C
- 問題: 中心点0、近傍1,2、任意の $\lambda>0$ について [ridge正則化](#def-mfl10-ridge-weights)の最小重みを $\lambda$ の式で導け。また $\lambda\downarrow0$、$\lambda\to\infty$ の極限と重みが負になる領域を調べ、局所誤差と罰則の競合を説明せよ。

**詳細解答**。$w=(1-t,t)$ と置けば再構成値は $1+t$、罰則の二乗和は $(1-t)^2+t^2$ なので

$$
E_\lambda(t)=(1+t)^2+\lambda((1-t)^2+t^2)
=1+\lambda+(2-2\lambda)t+(1+2\lambda)t^2.
$$

二次係数 $1+2\lambda>0$ なので唯一の最小点は導関数を零にして

$$
t=\frac{\lambda-1}{1+2\lambda},\qquad
w=\left(\frac{\lambda+2}{1+2\lambda},
\frac{\lambda-1}{1+2\lambda}\right).
$$

二つの重みの和は $(2\lambda+1)/(1+2\lambda)=1$ である。さらに

$$
\lim_{\lambda\downarrow0}w=(2,-1),\qquad
\lim_{\lambda\to\infty}w=(1/2,1/2).
$$

前者では再構成誤差0となる。第二重みが負なのは $0<\lambda<1$ のときで、$\lambda=1$ で零、$\lambda>1$ で正となる。$E_\lambda$ の再構成項と罰則項は異なり、正則化を強めるほど再構成残差は必ず小さくなるという主張はできない。

### MFL10-C02 弱い接続と小さい正固有値

- Level: C
- 問題: 四点について $W_0$ は二ペアの交換行列（A04）、$W_1$ は道 $1-2-3-4$ の重み

$$
W_1=\begin{pmatrix}
0&1&0&0\\
1/2&0&1/2&0\\
0&1/2&0&1/2\\
0&0&1&0
\end{pmatrix}
$$

とする。$0<\delta\le1$、$W_\delta=(1-\delta)W_0+\delta W_1$ と置く。行和1、$\ker(I-W_\delta)$ が定数方向のみであることを示せ。さらに可行ベクトル $Y=(1,1,-1,-1)^{\mathsf T}$ の埋め込み誤差から $\lambda_2(M_\delta)$ の上界を導け。

**詳細解答**。$W_0,W_1$ の各行和は1、成分は非負だから、その凸結合も非負・行和1。$W_\delta$ の非零遷移は $1\leftrightarrow2$、$2\leftrightarrow3$、$3\leftrightarrow4$ を含む。特に中央の辺の重みは $\delta/2>0$ であり、任意の頂点から他へ正重みの辺を辿れる。

$W_\delta v=v$ とし、$v$ の最大成分を $v_i=c$ とすると、行和1と重みの非負性から

$$
c=\sum_jw_{ij}v_j\le\sum_jw_{ij}c=c.
$$

差 $\sum_jw_{ij}(c-v_j)=0$ の各項は非負なので、$w_{ij}>0$ のすべての $j$ で $v_j=c$ が必要である。正の辺を辿って全頂点へ伝播するので $v$ は定数。従って $\ker(I-W_\delta)=\operatorname{span}\{\boldsymbol1\}$、正固有値は $\lambda_2>0$。

一方 $Y^{\mathsf T}\boldsymbol1=1+1-1-1=0$、$Y^{\mathsf T}Y=4$。$W_0Y=Y$ で、$W_1Y=(1,0,0,-1)^{\mathsf T}$ だから

$$
(I-W_\delta)Y=\delta(Y-W_1Y)
=\delta(0,1,-1,0)^{\mathsf T},
\quad \Phi(Y)=2\delta^2.
$$

[LLE二次形式の固有値最小化](#thm-mfl10-spectral)を $n=4,m=1$ に適用すると $4\lambda_2$ が最小値なので、

$$
0<4\lambda_2(M_\delta)\le\Phi(Y)=2\delta^2,
\qquad 0<\lambda_2(M_\delta)\le\frac{\delta^2}{2}.
$$

各 $\delta>0$ でグラフが連結でも、$\delta\downarrow0$ で正固有値が0へ近づく。**連結性は固有値間隔の一様下界ではない**。近傍の少数の弱い接続が埋め込みの数値的不安定性につながる理由である。
