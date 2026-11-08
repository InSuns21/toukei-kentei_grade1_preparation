# OTR14 Gaussian分布間のW2はどう計算するか

[OTR13 の Brenier 定理](../OTR13/index.md#thm-otr13-brenier)は、出発測度に密度があれば二次費用の最適結合が凸関数の勾配写像で表せると保証しました。しかし、その写像を具体的に計算するには、出発分布と到着分布の形を利用する必要があります。

平均と共分散で形が決まる Gaussian 分布は、最初に手で計算できる多次元の例です。一次元では分位点を使えましたが、多次元では共分散行列の向きが異なるため、各座標の標準偏差を引き算するだけでは済みません。本章では次を目指します。

1. 正定値な二つの共分散行列から、凸勾配となる線形輸送写像を構成する。
2. **どの結合よりもその写像の費用が小さい**ことを二乗ノルムの非負性から証明する。
3. 行列の平方根を使った $W_2$ 公式を非可換な行列で検算し、退化共分散では極限と一意性を分けて考える。

## 1. Gaussian分布を平均と共分散で表す

以下 $d\ge1$、ベクトルは $\mathbb R^d$ の列ベクトル、$x^{\mathsf T}y$ は標準内積とします。$d\times d$ 実対称行列 $A$ の**半正定値**条件は、すべての $v\in\mathbb R^d$ について

$$
v^{\mathsf T}Av\ge0
$$

となることです。さらに零ベクトル以外で厳密に正なら**正定値**です。これは [LA6 の Hermitian 半正定値の定義](../../../基礎科目/LA/LA6/index.md#def-la6-psd)を実対称行列へ制限したものです。

[Hermitian半正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)により、半正定値 $A$ には、半正定値で $A^{1/2}A^{1/2}=A$ を満たす唯一の平方根 $A^{1/2}$ があります。具体的には正規直交固有基底で $A=Q\operatorname{diag}(\lambda_1,\ldots,\lambda_d)Q^{\mathsf T}$（$\lambda_i\ge0$）とすれば、平方根は同じ基底で固有値を $\sqrt{\lambda_i}$ にした行列です。$A$ が正定値なら $A^{-1/2}$ も存在します。

確率ベクトル $Z=(Z_1,\ldots,Z_d)^{\mathsf T}$ の成分が互いに独立な平均 $0$・分散 $1$ の標準正規分布に従うとします。$Z$ の平均は $0$、分散共分散行列は $I_d$ です。退化分布も含めるため、次の平方根表示を採用します。

<a id="def-otr14-gaussian-law"></a>

<!-- formal-statement-start -->
> **定義（多変量Gaussian分布の平方根表示）**
> $d\ge1$、$m\in\mathbb R^d$、$A\in\mathbb R^{d\times d}$ は実対称半正定値とする。独立標準正規成分からなる $Z\in\mathbb R^d$ に対する次の確率ベクトルを考える。

$$
X=m+A^{1/2}Z.
$$

> この $X$ の分布を $\mathcal N_d(m,A)$ と書く。$A$ が正定値の場合を非退化といい、零固有値を持つ場合には分布が退化しているという。$A$ は $X$ の分散共分散行列であり、標準偏差の行列ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr14-gaussian-law -->
**定義の確認**。$d=2$、$m=(1,-1)^{\mathsf T}$、$A=\operatorname{diag}(4,0)$ とすると $A^{1/2}=\operatorname{diag}(2,0)$ です。従って $X=(1+2Z_1,-1)^{\mathsf T}$ であり、

$$
\mathbb E[X]=m,\qquad
\mathbb E[(X-m)(X-m)^{\mathsf T}]
=A^{1/2}I_2A^{1/2}=A.
$$

$A$ の固有値は $4,0$ なので半正定値ですが正定値ではありません。質量は直線 $x_2=-1$ 上に集中し、$\mathbb R^2$ の Lebesgue 密度を持ちません。一方、$A=\operatorname{diag}(4,9)$ なら両固有値が正で、全平面上の非退化 Gaussian 分布になります。
<!-- definition-example-end -->

Gaussian の特徴は、任意の行列 $L$ とベクトル $b$ で $Y=b+LX$ としても Gaussian であり、

$$
\mathbb E[Y]=b+Lm,\qquad
\operatorname{Cov}(Y)=LAL^{\mathsf T}
$$

となることです。平均は線形性から、共分散は $Y-\mathbb E[Y]=L(X-m)$ の両側から期待値を取って得ます。分布がこの二つの量で決まることも確かめましょう。

別の行列 $K$ が $KK^{\mathsf T}=A$ を満たす場合を考えます。[LA6 の極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)を $K^{\mathsf T}$ に適用すると、ある実直交行列 $Q$ により

$$
K=A^{1/2}Q
$$

と書けます。独立標準正規成分からなる $Z$ の同時密度は

$$
f_Z(z)=(2\pi)^{-d/2}e^{-\lVert z\rVert^2/2}
$$

です。直交変換 $z=Qw$ では $\lVert Qw\rVert=\lVert w\rVert$、$|\det Q|=1$ です。従って $QZ$ は $Z$ と同じ分布を持ち、$m+KZ=m+A^{1/2}QZ$ は定義した $\mathcal N_d(m,A)$ に従います。$K=LA^{1/2}$ とすれば先ほどの線形変換則も得られます。

以後 $\operatorname{tr}A=\sum_i A_{ii}$ を行列の跡とし、共分散の跡が $\mathbb E\lVert X-m\rVert^2$ になることを使います。

## 2. 正定値共分散から輸送行列を構成する

出発 $\mu=\mathcal N_d(m_0,A)$ と到着 $\nu=\mathcal N_d(m_1,B)$ を考え、まず $A,B$ がともに対称正定値と仮定します。平均の移動は $m_1-m_0$ の平行移動で実現できます。形の変更には $Y=m_1+M(X-m_0)$ を試します。

この $Y$ の共分散は $MAM^{\mathsf T}$ です。$M$ が対称正定値なら $T(x)=m_1+M(x-m_0)$ は、二次関数

$$
\varphi(x)=\frac12(x-m_0)^{\mathsf T}M(x-m_0)+m_1^{\mathsf T}x
$$

の勾配です。実際 $\nabla\varphi(x)=m_1+M(x-m_0)$、$v^{\mathsf T}Mv>0$ より凸であり、[凸勾配輸送写像の定義](../OTR13/index.md#def-otr13-convex-gradient-map)に適合します。そこで **$MAM=B$ を満たす対称正定値 $M$** を探すのが自然です。

<a id="lem-otr14-positive-transport-matrix"></a>

<!-- formal-statement-start -->
> **補題（正定値共分散を結ぶ対称輸送行列）**
> $d\ge1$ とし、$A,B\in\mathbb R^{d\times d}$ を実対称正定値行列とする。このとき $MAM=B$ を満たす実対称正定値行列 $M$ はただ一つであり、次式で与えられる。

$$
S=(A^{1/2}BA^{1/2})^{1/2},\qquad
M=A^{-1/2}SA^{-1/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$MAM=B$ を $A^{1/2}$ で左右から挟むと、$A^{1/2}MA^{1/2}$ の二乗が $A^{1/2}BA^{1/2}$ に等しくなります。正定値平方根の一意性で中身を決め、逆に戻します。

<!-- proof-start -->
### 証明

$A$ が正定値なので $A^{1/2}$ と $A^{-1/2}$ は可逆です。また $v\ne0$ なら

$$
v^{\mathsf T}(A^{1/2}BA^{1/2})v
=(A^{1/2}v)^{\mathsf T}B(A^{1/2}v)>0
$$

となり、$S$ は [LA6 の平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)で決まる正定値平方根です。定義した $M$ は対称で、

$$
v^{\mathsf T}Mv=(A^{-1/2}v)^{\mathsf T}S(A^{-1/2}v)>0
\quad(v\ne0)
$$

より正定値です。さらに

$$
\begin{aligned}
MAM
&=A^{-1/2}SA^{-1/2}AA^{-1/2}SA^{-1/2}\\
&=A^{-1/2}S^2A^{-1/2}
=A^{-1/2}(A^{1/2}BA^{1/2})A^{-1/2}=B.
\end{aligned}
$$

一意性のため、別の正定値対称解 $N$ があるとします。$R=A^{1/2}NA^{1/2}$ は正定値で、$R^2=A^{1/2}BA^{1/2}$。平方根の一意性から $R=S$、よって $N=A^{-1/2}SA^{-1/2}=M$ です。$\square$
<!-- proof-end -->

行列 $A$ と $B$ が可換なら同じ正規直交基底で対角化でき、各固有方向で標準偏差の比を取れば十分です。しかし一般には $A^{1/2}$ と $B^{1/2}$ を交換できません。上の式で **$A^{1/2}BA^{1/2}$ を一つの対称行列として平方根にする**理由がここにあります。

## 3. どの結合よりも費用が小さいことを証明する

[Wasserstein距離の定義](../OTR8/index.md#def-otr8-wasserstein)では、$W_2^2(\mu,\nu)$ は結合 $(X,Y)$ 全体についての $\mathbb E\lVert X-Y\rVert^2$ の最小値です。$\frac12\lVert x-y\rVert^2$ を使う [Brenier 定理](../OTR13/index.md#thm-otr13-brenier)と比較すると、最小化する結合は同じで、$W_2^2$ の値には係数 $1/2$ を付けません。

<a id="thm-otr14-gaussian-w2-spd"></a>

<!-- formal-statement-start -->
> **定理（非退化Gaussian分布間の最適写像とWasserstein距離）**
> $d\ge1$、$m_0,m_1\in\mathbb R^d$、$A,B\in\mathbb R^{d\times d}$ を実対称正定値行列とする。$\mu=\mathcal N_d(m_0,A)$、$\nu=\mathcal N_d(m_1,B)$ と置き、前補題の正定値輸送行列を

$$
M=A^{-1/2}(A^{1/2}BA^{1/2})^{1/2}A^{-1/2}
$$

> とする。このとき唯一の最適結合は次の写像による $Y=T(X)$ で与えられる。

$$
T(x)=m_1+M(x-m_0).
$$

> 特に距離は次の公式で計算できる。

$$
\boxed{W_2^2(\mu,\nu)
=\lVert m_0-m_1\rVert^2+\operatorname{tr}A+\operatorname{tr}B
-2\operatorname{tr}\!\left((A^{1/2}BA^{1/2})^{1/2}\right).}
$$

> また $T=\nabla\varphi$ は凸二次関数の勾配であり、最適写像は $\mu$-ほとんど至る所で一意である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の結合で共分散の相関項だけが変化します。$M$ が正定値なので、$M^{1/2}(X-m_0)-M^{-1/2}(Y-m_1)$ の二乗の期待値は非負です。この平方を展開すると相関項の最大値が分かり、等号条件が $Y=T(X)$ そのものになります。

<!-- proof-start -->
### 証明

**(1) 候補写像は到着分布を作る。** $X\sim\mathcal N_d(m_0,A)$ とし、$Y_*=m_1+M(X-m_0)$ とします。第1節で求めた線形像の平均・共分散の式に、[正定値共分散を結ぶ対称輸送行列](#lem-otr14-positive-transport-matrix)の関係 $MAM=B$ を代入すると

$$
\mathbb E[Y_*]=m_1,\qquad
\operatorname{Cov}(Y_*)=MAM^{\mathsf T}=MAM=B.
$$

従って $Y_*\sim\nu$ であり、$(X,Y_*)$ は許される結合です。

**(2) 任意の結合の下界。** 任意の $X\sim\mu$、$Y\sim\nu$ を同じ確率空間上に取ります。$U=X-m_0$、$V=Y-m_1$ はともに中心化され、$\mathbb E[UU^{\mathsf T}]=A$、$\mathbb E[VV^{\mathsf T}]=B$ です。$C=\mathbb E[UV^{\mathsf T}]$ と置けば、平方展開により

$$
\begin{aligned}
\mathbb E\lVert X-Y\rVert^2
&=\lVert m_0-m_1\rVert^2+\mathbb E\lVert U-V\rVert^2\\
&=\lVert m_0-m_1\rVert^2+\operatorname{tr}A+\operatorname{tr}B
-2\operatorname{tr}C.
\end{aligned}
$$

交差項に平均差が出ないのは $\mathbb E[U]=\mathbb E[V]=0$ だからです。さらに $M$ は正定値なので、その平方根と逆平方根を使い

$$
\begin{aligned}
0&\le\mathbb E\lVert M^{1/2}U-M^{-1/2}V\rVert^2\\
&=\operatorname{tr}(MA)+\operatorname{tr}(M^{-1}B)-2\operatorname{tr}C\\
&=2\operatorname{tr}(MA)-2\operatorname{tr}C.
\end{aligned}
$$

最後の等号は $B=MAM$ から $M^{-1}B=AM$ となり、跡が巡回不変であるためです。従って $\operatorname{tr}C\le\operatorname{tr}(MA)$。$S=A^{1/2}MA^{1/2}$ と [輸送行列補題](#lem-otr14-positive-transport-matrix)から

$$
\operatorname{tr}(MA)=\operatorname{tr}(A^{1/2}MA^{1/2})
=\operatorname{tr}S
=\operatorname{tr}\!\left((A^{1/2}BA^{1/2})^{1/2}\right).
$$

これを前の費用式に代入すれば、定理の右辺は**すべての結合の費用の下界**です。

**(3) 達成と一意性。** 第(1)段階で作った $Y_*$ では $V=MU$ なので、非負とした二乗ノルムは $0$ です。従って下界が達成され、公式が成立します。逆に任意の最適結合で等号なら

$$
\mathbb E\lVert M^{1/2}U-M^{-1/2}V\rVert^2=0.
$$

非負確率変数の期待値が $0$ なので、括弧の中はほとんど確実に $0$。$M^{1/2}$ を掛けて $V=MU$、すなわち $Y=T(X)$ がほとんど確実に従います。これで最適**結合**の一意性も示せました。最後に第2節の二次関数 $\varphi$ は、任意の $x,h$ に対して $\varphi(x+h)-\varphi(x)-\nabla\varphi(x)^{\mathsf T}h=h^{\mathsf T}Mh/2\ge0$ を満たすため凸で、$T=\nabla\varphi$ です。$\square$
<!-- proof-end -->

この証明では、下界の段階では二つの分布が Gaussian である必要はありません。**平均と共分散が同じ任意の分布にも下界は有効**ですが、候補の線形写像が指定された到着分布を作るとは限りません。Gaussian なら平均と共分散だけで分布が確定するため、等号を達成できるのです。

### 一次元・対角行列ではどう見えるか

一次元で分散が $a^2,b^2$（$a,b>0$）なら、$M=b/a$ です。したがって

$$
T(x)=m_1+\frac ba(x-m_0),\qquad
W_2^2=(m_0-m_1)^2+(a-b)^2.
$$

これは [OTR11 の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)から得る結果とも一致します。多次元で $A,B$ が共通の正規直交固有基底を持てば、その基底で $A=\operatorname{diag}(a_i^2)$、$B=\operatorname{diag}(b_i^2)$ として

$$
W_2^2=\lVert m_0-m_1\rVert^2+\sum_{i=1}^d(a_i-b_i)^2
$$

です。次の非可換例は、この座標ごとの引き算をむやみに使えないことを示します。

## 4. 非可換な共分散行列を手計算する

平均はともに $0$、出発共分散 $A$ と対称正定値の候補輸送 $M$ を

$$
A=\begin{pmatrix}4&0\\0&1\end{pmatrix},\qquad
M=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

とします。$M$ の固有値は $3,1$ で正です。行列積を順に計算すると

$$
MA=\begin{pmatrix}8&1\\4&2\end{pmatrix},\qquad
B=MAM=\begin{pmatrix}17&10\\10&8\end{pmatrix}.
$$

$AB$ と $BA$ の $(1,2)$ 成分はそれぞれ $40,10$ なので、両者は可換ではありません。にもかかわらず、平方根の公式から正しい $M$ を復元できます。$A^{1/2}=\operatorname{diag}(2,1)$ だから

$$
D=A^{1/2}BA^{1/2}=\begin{pmatrix}68&20\\20&8\end{pmatrix}.
$$

ここで $S=\begin{pmatrix}8&2\\2&2\end{pmatrix}$ を直接二乗すると

$$
S^2=\begin{pmatrix}68&20\\20&8\end{pmatrix}=D.
$$

$S$ の主座小行列式は $8>0$、$\det S=12>0$ なので正定値です。[平方根の一意性](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)により $S=D^{1/2}$ です。従って

$$
A^{-1/2}SA^{-1/2}
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}8&2\\2&2\end{pmatrix}
\begin{pmatrix}1/2&0\\0&1\end{pmatrix}=M.
$$

最後に $\operatorname{tr}A=5$、$\operatorname{tr}B=25$、$\operatorname{tr}S=10$ なので

$$
W_2^2(\mathcal N_2(0,A),\mathcal N_2(0,B))=5+25-2(10)=10.
$$

写像 $Y=MX$ の直接費用も $(I-M)X=(-X_1-X_2,-X_1-X_2)^{\mathsf T}$ から

$$
\mathbb E\lVert X-MX\rVert^2
=2\mathbb E(X_1+X_2)^2=2(4+1)=10
$$

となり一致します。行列の向きの違いは、平方根を「成分ごと」に取る計算では表せません。

## 5. 共分散が退化しているとき

実際のデータは低次元部分空間に乗ることもあります。この場合にも距離の公式自体は残りますが、正定値の場合の $M^{-1/2}$ は使えず、最適結合の一意性を同じ証明で主張できません。そこで正定値行列で近似して極限を取ります。

<a id="prop-otr14-degenerate-gaussian"></a>

<!-- formal-statement-start -->
> **命題（半正定値共分散へのGaussian距離公式の拡張）**
> $d\ge1$、$m_0,m_1\in\mathbb R^d$、$A,B\in\mathbb R^{d\times d}$ を実対称半正定値行列とする。$\mu=\mathcal N_d(m_0,A)$、$\nu=\mathcal N_d(m_1,B)$ なら、非退化の場合と同じ次式が成立する。

$$
W_2^2(\mu,\nu)
=\lVert m_0-m_1\rVert^2+\operatorname{tr}A+\operatorname{tr}B
-2\operatorname{tr}\!\left((A^{1/2}BA^{1/2})^{1/2}\right).
$$

> さらに $A$ が正定値で $B$ が半正定値なら、次の行列 $M$ は半正定値であり、この $T$ が唯一の最適結合を与える。

$$
M=A^{-1/2}(A^{1/2}BA^{1/2})^{1/2}A^{-1/2},\qquad
T(x)=m_1+M(x-m_0).
$$

> $A$ が特異な一般の場合には写像の存在・最適結合の一意性を結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

$A_\varepsilon=A+\varepsilon I$、$B_\varepsilon=B+\varepsilon I$ は正定値です。共通の標準 Gaussian $Z$ で実現した分布を比較すると、行列平方根の連続性から $W_2$ 距離で元の分布へ収束します。[p-Wasserstein距離の距離公理](../OTR8/index.md#thm-otr8-metric)の三角不等式で距離の極限を扱い、[非退化Gaussian分布間の最適写像とWasserstein距離](#thm-otr14-gaussian-w2-spd)の公式を極限へ移します。

<!-- proof-start -->
### 証明

$\varepsilon>0$ とし、$A_\varepsilon=A+\varepsilon I_d$、$B_\varepsilon=B+\varepsilon I_d$ を定めます。正定値であることは、$v\ne0$ に対して $v^{\mathsf T}A_\varepsilon v=v^{\mathsf T}Av+\varepsilon\lVert v\rVert^2>0$ から従います。

まず $X=m_0+A^{1/2}Z$、$X_\varepsilon=m_0+A_\varepsilon^{1/2}Z$ を同一の標準 Gaussian $Z$ で作ります。$A$ の正規直交固有基底では

$$
\begin{aligned}
\mathbb E\lVert X_\varepsilon-X\rVert^2
&=\operatorname{tr}\!\left((A_\varepsilon^{1/2}-A^{1/2})^2\right)\\
&=\sum_{i=1}^d(\sqrt{\lambda_i+\varepsilon}-\sqrt{\lambda_i})^2\longrightarrow0.
\end{aligned}
$$

従って結合の定義から $W_2(\mu_\varepsilon,\mu)\to0$。同様に $W_2(\nu_\varepsilon,\nu)\to0$ です。[OTR8 の三角不等式](../OTR8/index.md#thm-otr8-metric)を二度使うと

$$
|W_2(\mu_\varepsilon,\nu_\varepsilon)-W_2(\mu,\nu)|
\le W_2(\mu_\varepsilon,\mu)+W_2(\nu_\varepsilon,\nu)\longrightarrow0.
$$

次に行列平方根の連続性を確認します。半正定値対称行列列 $D_n\to D$ の平方根を $R_n=D_n^{1/2}$ とします。$R_n$ は半正定値で、その作用素ノルムの二乗は $D_n$ の最大固有値に等しいので、列は有界です。

有限次元だから任意の収束部分列の極限 $R$ は半正定値であり、積の連続性により

$$
R^2=\lim_{k\to\infty}R_{n_k}^2
=\lim_{k\to\infty}D_{n_k}=D.
$$

[Hermitian半正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)の一意性から $R=D^{1/2}$ です。任意の収束部分列がこの極限を持つので、全列 $R_n\to D^{1/2}$ と分かります。

これを $A_\varepsilon$ と $B_\varepsilon$ の各平方根、および $A_\varepsilon^{1/2}B_\varepsilon A_\varepsilon^{1/2}$ の平方根へ順に適用します。[非退化Gaussian分布間の最適写像とWasserstein距離](#thm-otr14-gaussian-w2-spd)の右辺は元の半正定値行列に連続に近づくので、極限を取ると表示式が得られます。

次に $A$ が正定値で $B$ のみ半正定値なら、$B_\varepsilon=B+\varepsilon I$ として前補題の $M_\varepsilon$ を取ります。平方根の連続性より $M_\varepsilon\to M$、$M$ は半正定値で $MAM=B$ です。$X\sim\mu$ に対し $Y=m_1+M(X-m_0)$ は Gaussian で共分散 $B$ を持つので、到着分布は $\nu$ です。また

$$
\mathbb E\lVert X-(m_1+M_\varepsilon(X-m_0))\rVert^2
\longrightarrow
\mathbb E\lVert X-Y\rVert^2
$$

となります。左辺は [非退化Gaussian分布間の最適写像とWasserstein距離](#thm-otr14-gaussian-w2-spd)の公式による $\mu$ と $\mathcal N_d(m_1,B_\varepsilon)$ の最適費用であり、その極限はすでに示した $W_2^2(\mu,\nu)$ です。ゆえに $Y=T(X)$ は最適です。$A$ が正定値なら $\mu$ は Lebesgue 絶対連続なので、[Brenierの最適写像定理](../OTR13/index.md#thm-otr13-brenier)から最適結合は一意です。$\square$
<!-- proof-end -->

### 失われる一意性を具体的に見る

$Z$ を一次元標準正規変数とし、$\mu=\mathcal N_2(0,\operatorname{diag}(1,0))$、$\nu=\mathcal N_2(0,\operatorname{diag}(0,1))$ とします。$X=(Z,0)$、$Y_+=(0,Z)$、$Y_-=(0,-Z)$ は、どちらも指定された周辺分布を持ちます。すべての組で $X$ と $Y_\pm$ は直交し、

$$
\mathbb E\lVert X-Y_\pm\rVert^2=\mathbb E(2Z^2)=2.
$$

一方 $A^{1/2}BA^{1/2}=0$ なので、公式の右辺は $1+1=2$ です。**異なる二つの写像結合がともに最適**になりました。$A$ が特異で、[Brenier 定理](../OTR13/index.md#thm-otr13-brenier)の出発測度の絶対連続性が失われたことが一意性の証明を壊します。また、$\mu=\delta_0$ と $\nu=\mathcal N_1(0,1)$ の場合は、$\delta_0$ から $\nu$ へ押し出す写像そのものが存在しません。結合はあっても Monge 写像があるとは限らないのです。

## 6. 演習

### OTR14-A01 平均だけを移動する

- Level: A

$d\ge1$、$m_0,m_1\in\mathbb R^d$、$A$ を実対称正定値とする。$\mu=\mathcal N_d(m_0,A)$、$\nu=\mathcal N_d(m_1,A)$ の最適写像と $W_2^2$ を求め、任意の結合の下界を確かめよ。

<!-- solution-start -->
### 詳細解答

[輸送行列補題](#lem-otr14-positive-transport-matrix)に $B=A$ を代入します。$A^{1/2}AA^{1/2}=A^2$ で、$A$ は $A^2$ の正定値平方根なので、$S=A$、$M=A^{-1/2}AA^{-1/2}=I_d$。従って

$$
T(x)=x+(m_1-m_0).
$$

任意の結合で $U=X-m_0$、$V=Y-m_1$ と置くと $\mathbb E(U-V)=0$ であり、

$$
\mathbb E\lVert X-Y\rVert^2
=\lVert m_0-m_1\rVert^2+\mathbb E\lVert U-V\rVert^2
\ge\lVert m_0-m_1\rVert^2.
$$

平行移動写像では $U=V$ なので下界を達成します。ゆえに $W_2^2=\lVert m_0-m_1\rVert^2$ です。
<!-- solution-end -->

### OTR14-A02 一次元で平均と標準偏差を分離する

- Level: A

$\mu=\mathcal N_1(1,4)$、$\nu=\mathcal N_1(4,9)$ とする。最適写像 $T$ と $W_2^2$ を求め、$X\sim\mu$ の下で費用を直接計算せよ。第2引数は**分散**である。

<!-- solution-start -->
### 詳細解答

標準偏差は $a=\sqrt4=2$、$b=\sqrt9=3$ です。[Gaussian公式](#thm-otr14-gaussian-w2-spd)の一次元形から $M=b/a=3/2$ なので

$$
T(x)=4+\frac32(x-1),\qquad
W_2^2=(1-4)^2+(2-3)^2=10.
$$

直接には $X=1+2Z$、$Z\sim\mathcal N_1(0,1)$ と置きます。$T(X)=4+3Z$ は到着分布を持ち、

$$
\mathbb E|X-T(X)|^2
=\mathbb E|-3-Z|^2
=9+6\mathbb E Z+\mathbb E Z^2=10.
$$

公式と一致しました。
<!-- solution-end -->

### OTR14-A03 対角共分散と平均差

- Level: A

$\mu=\mathcal N_2((0,0)^{\mathsf T},\operatorname{diag}(1,9))$、$\nu=\mathcal N_2((1,2)^{\mathsf T},\operatorname{diag}(4,1))$ とする。最適写像と $W_2^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$A^{1/2}=\operatorname{diag}(1,3)$、$B^{1/2}=\operatorname{diag}(2,1)$ は可換なので、各方向の伸長比から $M=\operatorname{diag}(2,1/3)$ です。実際、

$$
MAM=\operatorname{diag}(2,1/3)\operatorname{diag}(1,9)
\operatorname{diag}(2,1/3)=\operatorname{diag}(4,1)=B.
$$

よって $T(x_1,x_2)=(1+2x_1,\,2+x_2/3)$。平均差の二乗は $1^2+2^2=5$、標準偏差差の二乗和は $(1-2)^2+(3-1)^2=5$ です。従って

$$
W_2^2=5+5=10.
$$
<!-- solution-end -->

### OTR14-A04 一次元の結合で相関を最大化する

- Level: A

平均 $0$、分散 $a^2,b^2$（$a,b>0$）を持つ実確率変数 $X,Y$ の任意の結合について $\mathbb E(X-Y)^2\ge(a-b)^2$ を示せ。等号となる条件を求め、両周辺分布が Gaussian の場合に等号を達成できることも確かめよ。

<!-- solution-start -->
### 詳細解答

非負平方を展開して

$$
0\le\mathbb E\left(\sqrt{b/a}\,X-\sqrt{a/b}\,Y\right)^2
=\frac ba\mathbb E X^2+\frac ab\mathbb E Y^2-2\mathbb E[XY]
=2ab-2\mathbb E[XY].
$$

従って $\mathbb E[XY]\le ab$ であり、

$$
\mathbb E(X-Y)^2=a^2+b^2-2\mathbb E[XY]\ge(a-b)^2.
$$

等号は最初の非負平方の期待値が $0$ のとき、すなわち $Y=(b/a)X$ がほとんど確実に成り立つときに限ります。$X=aZ$、$Y=bZ$ として共通の $Z\sim\mathcal N_1(0,1)$ を使えば指定された Gaussian 周辺分布と等号条件を満たします。
<!-- solution-end -->

### OTR14-A05 点質量から広がったGaussianへ

- Level: A

$m,n\in\mathbb R^d$、$B$ を実対称半正定値行列とする。$\mu=\delta_m$、$\nu=\mathcal N_d(n,B)$ の $W_2^2$ を求めよ。$B\ne0$ のとき $T_{\#}\mu=\nu$ となる可測写像が存在しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

任意の結合で第一成分 $X=m$ がほとんど確実に固定され、第二成分 $Y\sim\nu$ です。従って費用はどの結合でも

$$
\begin{aligned}
\mathbb E\lVert m-Y\rVert^2
&=\mathbb E\lVert(m-n)-(Y-n)\rVert^2\\
&=\lVert m-n\rVert^2+\mathbb E\lVert Y-n\rVert^2
=\lVert m-n\rVert^2+\operatorname{tr}B.
\end{aligned}
$$

$\mathbb E(Y-n)=0$ で交差項が消えます。公式に $A=0$ を代入しても同じ値です。また任意の可測写像では $T_{\#}\delta_m=\delta_{T(m)}$ と一点にしか質量がありません。$B\ne0$ なら少なくとも一方向に正の分散があり、到着分布は点質量ではないので、押し出し写像は不可能です。
<!-- solution-end -->

### OTR14-B01 非可換行列から最適写像を復元する

- Level: B

$\mu=\mathcal N_2(0,A)$、$\nu=\mathcal N_2(0,B)$ とし、$A=\operatorname{diag}(9,4)$、$B=\begin{pmatrix}40&30\\30&45\end{pmatrix}$ とする。

1. $A$ と $B$ は正定値だが可換でないことを示せ。
2. $(A^{1/2}BA^{1/2})^{1/2}$ と輸送行列 $M$ を求め、$MAM=B$ を検算せよ。
3. 最適輸送費用 $W_2^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

**(1)** $A$ は対角成分が正なので正定値です。$B$ は対称で $B_{11}=40>0$、$\det B=40\cdot45-30^2=900>0$ なので正定値です。一方

$$
AB=\begin{pmatrix}360&270\\120&180\end{pmatrix},\quad
BA=\begin{pmatrix}360&120\\270&180\end{pmatrix}
$$

は一致しません。

**(2)** $A^{1/2}=\operatorname{diag}(3,2)$ を使うと

$$
D=A^{1/2}BA^{1/2}=\begin{pmatrix}360&180\\180&180\end{pmatrix}.
$$

$S=\begin{pmatrix}18&6\\6&12\end{pmatrix}$ は $S_{11}=18>0$、$\det S=180>0$ で正定値です。二乗して

$$
S^2=\begin{pmatrix}18^2+6^2&18\cdot6+6\cdot12\\18\cdot6+6\cdot12&6^2+12^2\end{pmatrix}
=\begin{pmatrix}360&180\\180&180\end{pmatrix}=D.
$$

よって [平方根の一意性](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)から $S=D^{1/2}$ です。$A^{-1/2}=\operatorname{diag}(1/3,1/2)$ を左右から掛ければ

$$
M=A^{-1/2}SA^{-1/2}=\begin{pmatrix}2&1\\1&3\end{pmatrix}.
$$

$MA=\begin{pmatrix}18&4\\9&12\end{pmatrix}$、$MAM=\begin{pmatrix}40&30\\30&45\end{pmatrix}=B$ と検算できます。

**(3)** $\operatorname{tr}A=13$、$\operatorname{tr}B=85$、$\operatorname{tr}S=30$ より [Gaussian公式](#thm-otr14-gaussian-w2-spd)を適用し、

$$
W_2^2=13+85-2(30)=38.
$$

最適写像は $T(x)=Mx$ です。
<!-- solution-end -->

### OTR14-B02 到着分布だけが退化する場合

- Level: B

$\mu=\mathcal N_2(0,\operatorname{diag}(4,1))$、$\nu=\mathcal N_2((1,-2)^{\mathsf T},\operatorname{diag}(0,9))$ とする。半正定値輸送行列 $M$ と $W_2^2$ を求め、最適結合が一意となる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

出発共分散 $A=\operatorname{diag}(4,1)$ は正定値で、到着共分散 $B=\operatorname{diag}(0,9)$ は半正定値です。平方根の比を各方向で取ると $M=\operatorname{diag}(0,3)$ であり、

$$
MAM=\operatorname{diag}(0,3)\operatorname{diag}(4,1)\operatorname{diag}(0,3)
=\operatorname{diag}(0,9)=B.
$$

第1成分は定数 $1$ になり、第2成分は $3$ 倍して $-2$ だけ移動するので、$T(x_1,x_2)=(1,-2+3x_2)$ です。平均差の二乗は $1^2+(-2)^2=5$、標準偏差差の二乗和は $(2-0)^2+(1-3)^2=8$。[半正定値共分散へのGaussian距離公式の拡張](#prop-otr14-degenerate-gaussian)から

$$
W_2^2=5+8=13.
$$

到着分布は直線上ですが、出発分布 $\mu$ は正定値共分散を持ち Lebesgue 絶対連続です。そのため [Brenier 定理](../OTR13/index.md#thm-otr13-brenier)を適用でき、最適結合は一意です。到着側も密度を持つという仮定は不要です。
<!-- solution-end -->

### OTR14-B03 Gaussian以外に対する共分散下界

- Level: B

確率測度 $\mu,\nu\in\mathcal P_2(\mathbb R^d)$ の平均を $m_0,m_1$、共分散をそれぞれ正定値行列 $A,B$ とする。両測度が Gaussian とは仮定しない。

1. 第3節の行列 $M$ を使い、$W_2^2(\mu,\nu)$ が [Gaussian公式](#thm-otr14-gaussian-w2-spd)の右辺以上となることを証明せよ。
2. 等号が成立するなら、どの最適結合でも $Y=m_1+M(X-m_0)$ がほとんど確実に成立することを示せ。
3. $d=1$、$\mu=\mathcal N_1(0,1)$、$\nu=(\delta_{-1}+\delta_1)/2$ のとき、下界が $0$ でも等号でない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**(1)** $\mu,\nu$ は有限二次モーメントを持ち、任意の結合 $(X,Y)$ で $U=X-m_0$、$V=Y-m_1$ の二乗期待値は有限です。[輸送行列補題](#lem-otr14-positive-transport-matrix)で $MAM=B$ の正定値解を作ると

$$
0\le\mathbb E\lVert M^{1/2}U-M^{-1/2}V\rVert^2
=2\operatorname{tr}(MA)-2\mathbb E[U^{\mathsf T}V].
$$

従って $\mathbb E[U^{\mathsf T}V]\le\operatorname{tr}(MA)$。費用を展開して

$$
W_2^2(\mu,\nu)\ge\lVert m_0-m_1\rVert^2
+\operatorname{tr}A+\operatorname{tr}B-2\operatorname{tr}(MA).
$$

また $\operatorname{tr}(MA)=\operatorname{tr}S$、$S=(A^{1/2}BA^{1/2})^{1/2}$ は [補題](#lem-otr14-positive-transport-matrix)から従います。

**(2)** 最適結合の存在は [OTR3 の存在定理](../OTR3/index.md#thm-otr3-polish)を二次費用に適用して得られます。もし下界と最適値が等しければ、非負平方の期待値は $0$。従って $M^{1/2}U=M^{-1/2}V$ がほとんど確実で、正定値 $M$ を用いて $V=MU$、すなわち $Y=m_1+M(X-m_0)$ です。

**(3)** 両者は平均 $0$、分散 $1$ なので下界は $0+1+1-2=0$ です。しかし $\mu$ は連続分布、$\nu$ は $\pm1$ に原子を持ち、同じ測度ではありません。[Wasserstein距離の正値性](../OTR8/index.md#thm-otr8-metric)より $W_2(\mu,\nu)>0$。仮に等号なら $M=1$ から $Y=X$ がほとんど確実となり同じ周辺分布を持つはずだ、という形でも矛盾します。
<!-- solution-end -->

### OTR14-B04 正定値近似の一意性は極限で残るか

- Level: B

$0<\varepsilon\le1$ とし、$\mu_\varepsilon=\mathcal N_2(0,\operatorname{diag}(1,\varepsilon))$、$\nu_\varepsilon=\mathcal N_2(0,\operatorname{diag}(\varepsilon,1))$ とする。

1. $W_2^2(\mu_\varepsilon,\nu_\varepsilon)$ と唯一の最適行列 $M_\varepsilon$ を求めよ。
2. $\varepsilon\downarrow0$ の極限距離を求め、極限で最適結合が複数あることを具体的に示せ。

<!-- solution-start -->
### 詳細解答

**(1)** 正定値な対角共分散なので各方向の伸長比は $\sqrt\varepsilon$ と $1/\sqrt\varepsilon$ です。従って $M_\varepsilon=\operatorname{diag}(\sqrt\varepsilon,1/\sqrt\varepsilon)$ であり、$M_\varepsilon\operatorname{diag}(1,\varepsilon)M_\varepsilon=\operatorname{diag}(\varepsilon,1)$ と検算できます。[非退化Gaussian分布間の最適写像とWasserstein距離](#thm-otr14-gaussian-w2-spd)によって結合は一意であり、費用は

$$
W_2^2=(1-\sqrt\varepsilon)^2+(\sqrt\varepsilon-1)^2
=2(1-\sqrt\varepsilon)^2.
$$

**(2)** 極限は $2$ です。$\varepsilon\downarrow0$ で両周辺分布は、それぞれ $\mu_0=\mathcal N_2(0,\operatorname{diag}(1,0))$、$\nu_0=\mathcal N_2(0,\operatorname{diag}(0,1))$ へ $W_2$ 収束します。$Z\sim\mathcal N_1(0,1)$ とすると

$$
(X,Y_+)=((Z,0),(0,Z)),\qquad
(X,Y_-)=((Z,0),(0,-Z))
$$

は異なる二つの結合です。どちらも費用 $\mathbb E(2Z^2)=2$ を持ち、[退化公式](#prop-otr14-degenerate-gaussian)の値を達成します。$M_\varepsilon$ の第2対角成分は発散するため、**正定値段階の一意性を特異な極限へそのまま持ち越せない**と分かります。
<!-- solution-end -->

### OTR14-C01 最も近い等方Gaussianを設計する

- Level: C

$\mu=\mathcal N_2(m,A)$、$m=(1,2)^{\mathsf T}$、$A=\begin{pmatrix}5&4\\4&5\end{pmatrix}$ とする。平均を $n=(-1,0)^{\mathsf T}$ に固定した等方 Gaussian の族 $\nu_t=\mathcal N_2(n,t^2I_2)$（$t\ge0$）を考える。$t=0$ は点質量とする。

1. $A$ の正定値平方根と逆平方根を求めよ。
2. $t>0$ の最適写像 $T_t$ と距離 $W_2^2(\mu,\nu_t)$ を導け。
3. 全ての $t\ge0$ で距離を最小にする $t$ と最小値を求めよ。$t=0$ での写像・費用も直接計算して確かめよ。

<!-- solution-start -->
### 詳細解答

**(1)** $A$ の固有ベクトル $(1,1)^{\mathsf T}/\sqrt2$、$(1,-1)^{\mathsf T}/\sqrt2$ に対応する固有値は $9,1$ です。直交行列 $Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ で対角化すると、[Hermitian半正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)より

$$
\begin{aligned}
A^{1/2}&=Q\operatorname{diag}(3,1)Q^{\mathsf T}
=\begin{pmatrix}2&1\\1&2\end{pmatrix},\\
A^{-1/2}&=Q\operatorname{diag}(1/3,1)Q^{\mathsf T}
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\end{aligned}
$$

掛け合わせて $A^{1/2}A^{1/2}=A$、$A^{1/2}A^{-1/2}=I_2$ と検算できます。

**(2)** $B=t^2I_2$ と置きます。$t>0$ なら正定値で、$A^{1/2}BA^{1/2}=t^2A$ の正定値平方根は $tA^{1/2}$ です。[輸送行列補題](#lem-otr14-positive-transport-matrix)から

$$
M_t=A^{-1/2}(tA^{1/2})A^{-1/2}=tA^{-1/2},
\quad T_t(x)=n+tA^{-1/2}(x-m).
$$

$\operatorname{tr}A=10$、$\operatorname{tr}B=2t^2$、$\operatorname{tr}(tA^{1/2})=4t$、$\lVert m-n\rVert^2=2^2+2^2=8$ です。従って [非退化Gaussian分布間の最適写像とWasserstein距離](#thm-otr14-gaussian-w2-spd)の公式から

$$
W_2^2(\mu,\nu_t)=8+10+2t^2-8t
=2(t-2)^2+10.
$$

**(3)** 最後の平方完成から $t\ge0$ の一意な最小点は $t=2$、最小値は $10$。そのとき最適写像の線形部分は

$$
M_2=\frac23\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
=\begin{pmatrix}4/3&-2/3\\-2/3&4/3\end{pmatrix}.
$$

$t=0$ では $\nu_0=\delta_n$ なので、全ての $x$ を $n$ に送る定数写像が唯一の結合を作ります。その直接費用は

$$
\mathbb E\lVert X-n\rVert^2
=\lVert m-n\rVert^2+\operatorname{tr}A=8+10=18.
$$

距離公式に $t=0$ を代入しても $18$ で、最小値 $10$ より大きいことが確かめられます。
<!-- solution-end -->

## 7. まとめと次への接続

- 非退化 Gaussian 間では平均を平行移動し、共分散に対して $MAM=B$ を満たす唯一の対称正定値行列 $M$ を使う。$M$ は凸二次関数の勾配を定め、二乗ノルムの下界を達成する。
- $W_2^2$ は平均差の二乗と、共分散の跡・**対称に挟んだ行列の平方根の跡**で計算できる。共分散が非可換なら座標別の標準偏差差は使えない。
- 退化共分散にも距離公式は連続に拡張するが、出発分布の絶対連続性が失われると最適写像の存在や結合の一意性を一般には保証できない。

次の OTR15 では、ここで得た二つの分布の最適結合を中間時刻で補間し、$W_2$ 空間の最短経路を構成します。
