# MQFC6 Gaussian測度をどう作るか

[MQFC5](../MQFC5/index.md) では、質量 $m>0$ の自由場について、試験関数の組から数値 $B_m(f,g)$ を求めました。分散共分散行列が与えられれば有限個の正規確率変数を作れます。しかし、すべての試験関数について同時に測定結果が定まり、しかも各実現が連続な線形汎関数になるでしょうか。今回は有限格子から始め、最後に緩増加分布の上に確率測度を構成します。

直接の前提は [MQFC1](../MQFC1/index.md)、[MQFC5](../MQFC5/index.md)、[F0-00P6](../../../解析系/F0/F0-00P6/index.md)、[STO3](../../../解析系/STO/STO3/index.md)、[GCT1](../../../計算系/GCT/GCT1/index.md) です。以下 $d\ge1$、$m>0$ とし、[Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) の実数値部分を $S$、その連続実線形双対を $S'$ とします。実線形汎関数は $f+ig$ に対して $T(f)+iT(g)$ と拡張でき、[緩増加分布](../MQFC1/index.md#def-mqfc1-tempered) の実数値版と対応します。

## 1. 有限次元の正規化

まず $n$ 個の場の値を $x\in\mathbb R^n$ で表します。作用を $x^TAx/2$ とし、その指数重みの積分が有限なら、積分の逆数を掛けて確率密度にできます。

実対称行列 $A$ が[正定値](../../../基礎科目/F0/F0-00F1/index.md#def-f0-00f1-positive-semidefinite)とは、すべての非零実ベクトル $v$ について $v^TAv>0$ となることです。上付きの $T$ は転置を表し、$x,t,v$ は列ベクトルとします。

$\operatorname{diag}$ は対角行列、$I$ はその場の次元の単位行列です。

[確率ベクトルの特性関数](../../../解析系/F0/F0-00P6/index.md#def-f0-00p6-vector-characteristic-function) は $X$ に対する次の写像です。

$$
t\mapsto E[e^{it^TX}].
$$

<a id="thm-mqfc6-finite-gaussian"></a>

<!-- formal-statement-start -->
> **定理（有限次元Gaussian積分と特性関数）**
> $A$ を実対称正定値 $n\times n$ 行列とする。$dx$ を $\mathbb R^n$ のLebesgue測度とすると、

$$
Z_A=\int_{\mathbb R^n}e^{-x^TAx/2}\,dx
=(2\pi)^{n/2}(\det A)^{-1/2}.
$$

> 密度 $Z_A^{-1}e^{-x^TAx/2}$ を持つ確率ベクトル $X$ の平均は零、分散共分散行列は $A^{-1}$ で、任意の $t\in\mathbb R^n$ に対して

$$
E[e^{it^TX}]=e^{-t^TA^{-1}t/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

直交座標に移って作用を独立な一次元の二乗に分けます。固有値が正だから各積分が収束し、変数変換が逆行列を生みます。

<!-- proof-start -->
### 証明

[実対称行列の直交対角化定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral) を実対称行列 $A$ に適用し、単位固有ベクトルを列に持つ直交行列 $U$ を取ります。

$A=U\operatorname{diag}(\lambda_1,\ldots,\lambda_n)U^T$ と書きます。$U$ の第 $j$ 列を $u_j$ とすると、$Au_j=\lambda_j u_j$ と $u_j^Tu_j=1$ より

$$
0<u_j^TAu_j=\lambda_j.
$$

$\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$ と置き、座標を $y=\Lambda^{1/2}U^Tx$ に変えます。全固有値が正なので逆変換は $x=U\Lambda^{-1/2}y$ です。$dx,dy$ は各座標のLebesgue測度を表します。変数変換の係数は逆変換のJacobianの行列式の絶対値であり、$|\det U|=1$ なので

$$
x^TAx=\sum_j y_j^2,\qquad
dx=\left(\prod_j\lambda_j^{-1/2}\right)dy.
$$

一次元積分を $I_0=\int_{\mathbb R}e^{-y^2/2}dy$ と書きます。非負積分を二乗し、平面の極座標を用いると

$$
\begin{aligned}
I_0^2&=\int_{\mathbb R^2}e^{-(u^2+v^2)/2}\,du\,dv\\
&=2\pi\int_0^\infty re^{-r^2/2}\,dr\\
&=2\pi[-e^{-r^2/2}]_{0}^{\infty}=2\pi.
\end{aligned}
$$

よって積の積分は $I_0^n$ となり、$\det A=\prod_j\lambda_j$ から正規化定数が得られます。

変換後の各 $Y_j$ は独立な標準正規変数です。一次元では奇関数の積分で $E[Y_j]=0$、部分積分により

$$
E[Y_j^2]=(2\pi)^{-1/2}
\int_{\mathbb R} y^2 e^{-y^2/2}dy=1.
$$

ここでは $y e^{-y^2/2}$ の両端での極限が零なので境界項が消えます。一次元の特性関数を $h(s)=E[e^{isY_j}]$ と置きます。$h'(s)=dh/ds$ は実パラメータ $s$ による微分で、積分変数 $y$ は固定して差商を取ります。実数 $\eta\ne0$ に対し

$$
\left|\frac{e^{i(s+\eta)y}-e^{isy}}{\eta}\right|
\le |y|
$$

です（指数関数を $s$ から $s+\eta$ まで積分する）。$|y|e^{-y^2/2}$ は可積分なので、実部・虚部に[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用して積分内で微分できます。

次に $y$ に関する部分積分を行います。$d(e^{-y^2/2})/dy=-ye^{-y^2/2}$ で、境界項 $e^{-y^2/2}e^{isy}$ は両端で零です。

$$
\begin{aligned}
h'(s)
&=\frac{i}{\sqrt{2\pi}}\int y e^{-y^2/2}e^{isy}\,dy\\
&=\frac{i}{\sqrt{2\pi}}\int e^{-y^2/2}is e^{isy}\,dy\\
&=-s h(s).
\end{aligned}
$$

$h(0)=1$ より $(e^{s^2/2}h(s))'=0$ なので $h(s)=e^{-s^2/2}$ です。

$L=U\operatorname{diag}(\lambda_j^{-1/2})$ とすれば $X=LY$、$LL^T=A^{-1}$ です。従って $E[X]=0$、$E[XX^T]=LIL^T=A^{-1}$ です。独立性を使って

$$
E[e^{it^TLY}]=\prod_j h((L^Tt)_j)
=e^{-|L^Tt|^2/2}=e^{-t^TA^{-1}t/2}.
$$

<!-- proof-end -->

正半定値な実対称行列 $K$（$v^TKv\ge0$）からも、[半正定値行列の平方根](../../../基礎科目/F0/F0-00F1/index.md#thm-f0-00f1-psd-square-root)で $K^{1/2}$ を作り、$X=K^{1/2}Y$ とすれば平均零、分散共分散行列 $K$、特性関数 $e^{-t^TKt/2}$ の分布を得ます。零固有値方向では $X$ が常に零なので、一般には全空間上の密度を持ちません。この場合もGaussian分布に含めます。

## 2. 格子自由場

有限な頂点集合 $V$ と、異なる頂点を結ぶ無向辺の集合 $E$ を持つ格子を考えます。各辺は一度だけ数え、格子間隔を1とします（境界から外への辺は入れません）。$x_v$ を各頂点の実数値とし、

$$
S_V(x)=\frac12\sum_{\{u,v\}\in E}(x_u-x_v)^2
+\frac{m^2}{2}\sum_{v\in V}x_v^2.
$$

[隣接行列](../../../計算系/GCT/GCT1/index.md#def-gct1-adjacency) を $J$（隣接なら1、それ以外0）、次数行列を $D=\operatorname{diag}(\deg v)$ とすると、辺ごとの二乗を展開して

$$
2S_V(x)=x^T A x,\qquad A=D-J+m^2 I.
$$

実際 $x^TDx=\sum_{\{u,v\}}(x_u^2+x_v^2)$、$x^TJx=2\sum_{\{u,v\}}x_ux_v$ です。$x^TAx\ge m^2|x|^2>0$（$x\ne0$）だから [有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) を適用でき、$Z_A^{-1}e^{-S_V(x)}dx$ が確率測度になります。

2頂点を1辺で結ぶと

$$
A=\begin{pmatrix}m^2+1&-1\\-1&m^2+1\end{pmatrix},
\qquad
A^{-1}=\frac1{m^2(m^2+2)}
\begin{pmatrix}m^2+1&1\\1&m^2+1\end{pmatrix}.
$$

例えば $m=1$ では

$$
\det A=3,\qquad Z_A=2\pi/\sqrt3,\qquad
A^{-1}=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

各分散は $2/3$、共分散は $1/3$ です。差と和の分散を比較すると

$$
\begin{aligned}
\operatorname{Var}(X_1-X_2)&=2/3+2/3-2(1/3)=2/3,\\
\operatorname{Var}(X_1+X_2)&=2/3+2/3+2(1/3)=2.
\end{aligned}
$$

差の分散の方が小さくなります。辺の作用が差を抑える機構を数値で確認できます。$m=0$ では定数ベクトル方向に作用が変化せず、正規化積分は発散します。

## 3. すべての試験関数を同時に測る

$\omega\in S'$ を一つの場の実現とします。$X_f(\omega)=\langle\omega,f\rangle$ は実数です。点ごとの値ではなく、この線形測定の値を観測します。

有限個の観測から決まる集合を集めて、測度の定義域を選びます。[標準経路空間の円筒集合](../../../解析系/STO/STO3/index.md#def-sto3-canonical-trajectory-space) と同じ発想ですが、標本点を任意の写像ではなく連続実線形汎関数に制限します。$\sigma$ 加法族とは全空間を含み、補集合と可算和で閉じた集合族です。実数空間のBorel集合は開集合から生成される $\sigma$ 加法族の元です。

<a id="def-mqfc6-characteristic-functional"></a>

<!-- formal-statement-start -->
> **定義（場の特性汎関数）**
> $S'$ 上で、すべての有限族 $f_1,\ldots,f_n\in S$ とBorel集合 $D\subset\mathbb R^n$ から作る集合

$$
\{\omega:(X_{f_1}(\omega),\ldots,X_{f_n}(\omega))\in D\}
$$

> の生成する $\sigma$ 加法族を円筒 $\sigma$ 加法族とする。その上の確率測度 $\mu$ の特性汎関数は

$$
\chi_\mu(f)=\int_{S'}e^{iX_f(\omega)}\,d\mu(\omega)
\qquad(f\in S)
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc6-characteristic-functional -->
### 直接例

**定義の確認**。原点の[Diracのデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) $\delta_0$ は $f\mapsto f(0)$ です。実数 $a,b$ に対し $(af+bg)(0)=af(0)+bg(0)$ なので実線形であり、$|f(0)|\le p_{0,0}(f)$ なので[緩増加分布の連続性条件](../MQFC1/index.md#def-mqfc1-tempered)を満たします。

標準正規変数 $Y$ に対し $\omega=Y\delta_0$ とすると、有限族の観測は次の連続な写像で与えられます。

$$
Y\mapsto Y(f_1(0),\ldots,f_n(0)).
$$

したがって写像 $F(y)=y\delta_0$ は円筒 $\sigma$ 加法族に関して可測です。実際、任意の円筒集合の逆像は連続な実ベクトル値写像によるBorel集合の逆像なのでBorel集合です。$Y$ の分布を $\nu$ とすると、[押し出し測度](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-pushforward)を任意の円筒 $\sigma$ 加法族の元 $C$ に対して

$$
\mu(C)=\nu(F^{-1}(C))
$$

で定める測度です。逆像は補集合・可算和を保ち、$F^{-1}(S')=\mathbb R$ なので[押し出しによる確率測度の構成](../../../解析系/F0/F0-00P1/index.md#thm-f0-00p1-pushforward-probability)の条件を満たします。

[有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) の一次元の場合に $t=f(0)$ を入れれば

$$
\chi_\mu(f)=e^{-f(0)^2/2}.
$$

特に $\chi_\mu(0)=1$ です。
<!-- definition-example-end -->

特性汎関数には、各点での関数値の符号とは異なる制約があります。一般に特性汎関数は複素数値であり、正値型は関数値そのものが非負であることを要求しません。有限個の位相因子の線形結合の絶対値二乗を積分すると、必ず非負になるからです。

<a id="def-mqfc6-positive-type"></a>

<!-- formal-statement-start -->
> **定義（特性汎関数の正値型条件）**
> 実線形空間 $S$ 上の複素数値写像 $\chi$ が、すべての $n\ge1$、$f_j\in S$、$c_j\in\mathbb C$ に対して

$$
\sum_{j,k=1}^n\bar c_j c_k\,\chi(f_k-f_j)\ge0
$$

> を満たすとき正値型という。不等式は左辺が実数で非負であることを要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc6-positive-type -->
### 直接例

**定義の確認**。[場の特性汎関数](#def-mqfc6-characteristic-functional) の直接例に対し $a_j=f_j(0)$ と置きます。$e^{-(a_k-a_j)^2/2}=E[e^{iY(a_k-a_j)}]$ なので、任意の複素係数に対する左辺は

$$
E\left[\left|\sum_k c_k e^{iYa_k}\right|^2\right]\ge0.
$$

有限和なので期待値と和を交換でき、絶対値二乗は実数で非負です。これで全有限族と全係数に対する条件が確認できました。
<!-- definition-example-end -->

一般の $\mu$ でも $X_{f_k-f_j}=X_{f_k}-X_{f_j}$ なので同じ絶対値二乗の論証が成立します。

## 4. 共分散から有限族の分布を組み立てる

[試験関数共分散の正値性と連続性](../MQFC5/index.md#thm-mqfc5-positivity) により、実の $f,g$ 上で $B=B_m$ は対称双線形で $B(f,f)\ge0$ です。そこで候補を

$$
\chi(f)=\exp[-B(f,f)/2]
$$

と選びます。[有限次元分布と整合性](../../../解析系/STO/STO3/index.md#def-sto3-fdd-consistency) では座標の削除に関する両立性を学びました。ここでは試験関数の線形関係にも両立することを確かめます。正値型条件は指数の中身の符号だけでは確認できません。有限次元分布を実際に構成して確かめます。

<a id="thm-mqfc6-gaussian-characteristic"></a>

<!-- formal-statement-start -->
> **定理（Gaussian型特性汎関数の有限次元整合性）**
> $S$ を実線形空間、$B:S\times S\to\mathbb R$ を対称双線形形式で $B(f,f)\ge0$ を満たすものとする。$\chi(f)=e^{-B(f,f)/2}$ は $\chi(0)=1$ かつ [正値型](#def-mqfc6-positive-type) である。任意の有限族 $f_1,\ldots,f_n$ に対し $K_{jk}=B(f_j,f_k)$ とすると、

$$
\chi\left(\sum_j t_jf_j\right)=e^{-t^TKt/2}
\qquad(t\in\mathbb R^n)
$$

> は平均零、分散共分散行列 $K$ のGaussian分布の特性関数である。有限族に実行列 $M$ による線形結合を施した分布は、元の分布の $M$ による像と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の試験関数に対してはGram型の行列を作り、その平方根で標準正規ベクトルを変換します。これが座標の削除・入替え・線形結合と両立します。

<!-- proof-start -->
### 証明

$B(0,0)=0$ より $\chi(0)=1$ です。$K^T=K$ であり、任意の $v\in\mathbb R^n$ について

$$
v^TKv=\sum_{j,k}v_jv_kB(f_j,f_k)
=B\left(\sum_jv_jf_j,\sum_kv_kf_k\right)\ge0.
$$

[有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) の直後の正半定値の場合の構成で $X=K^{1/2}Y$ と置きます。$K^{1/2}$ は実対称で、その二乗が $K$ なので $E[XX^T]=K$ です。双線形性から

$$
\chi\left(\sum_jt_jf_j\right)=e^{-t^TKt/2}=E[e^{it^TX}].
$$

特に $f_k-f_j$ には $\mathbb R^n$ の標準基底 $e_j$ を用いて $t=e_k-e_j$ を代入すれば $\chi(f_k-f_j)=E[e^{i(X_k-X_j)}]$ となります。従って

$$
\sum_{j,k}\bar c_jc_k\chi(f_k-f_j)
=E\left[\left|\sum_k c_ke^{iX_k}\right|^2\right]\ge0.
$$

次に $M$ を実 $r\times n$ 行列、$g_a=\sum_jM_{aj}f_j$ とします。新しい行列は

$$
B(g_a,g_b)=\sum_{j,k}M_{aj}K_{jk}M_{bk}
=(MKM^T)_{ab}.
$$

また $s\in\mathbb R^r$ に対して

$$
E[e^{is^TMX}]=e^{-s^TMKM^Ts/2}.
$$

有限次元の特性関数の一意性を次のように使います。特性関数が等しい二つの確率ベクトル $V,W$ に対し、[確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector) に定数列 $V_\ell=V$ と極限候補 $W$ を代入すると、すべての有界Lipschitz関数の期待値が一致します。

空でない閉集合 $F$ に対して次の関数を取ります。

$$
h_\ell(x)=\max(0,1-\ell\operatorname{dist}(x,F)).
$$

これは有界Lipschitzで $1_F$ へ点ごとに収束します。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) により両分布は閉集合上で一致します。閉集合は有限交叉で閉じBorel集合を生成します。二つの確率測度が一致する集合族は全空間を含み、補集合と互いに素な可算和に閉じるDynkin族なので、[π–λ定理](../../../解析系/F0/F0-00D3A/index.md#thm-f0-00d3a-pi-lambda)により分布全体も一致します。

従って $MX$ の分布が新しい族のGaussian分布と一致します。
<!-- proof-end -->

例えば $(f,2f)$ では $b=B(f,f)>0$ として

$$
K=b\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

行列式は零ですが、$(Y\sqrt b,2Y\sqrt b)$ という分布が存在します。測定の線形関係を破らないことが整合性の具体的な意味です。

## 5. 核空間から測度へ

有限族の分布が整合していても、無限個の測定を同時に連続な線形汎関数として実現できることは別の問題です。ここで試験関数空間の位相が重要になります。

内積から来るノルムで完備化したHilbert空間の間の線形作用素 $J$ について、正規直交基底 $(e_j)$ に対し $\sum_j\|Je_j\|^2<\infty$ となるとき Hilbert–Schmidt 作用素といいます。この和は基底に依らず、像の大きさの二乗を全方向で足しても有限であることを表します。

本講で使う核空間（nuclear space）は、増加する可算個のHilbertノルムで位相を定めた空間について、各完備化へのより強いノルムからの包含がある段階でHilbert–Schmidtになる、という十分条件を満たすものです。一般の局所凸空間の核性の定義までは必要ありません。

Schwartz空間の核性を確認する道具として実Hermite関数の標準事実を用います。一次元の $e^{-x^2/2}$ に直交多項式を掛けて正規化し、$d$ 次元では各座標の積を取ったものを $h_\alpha$（$\alpha\in\mathbb N_0^d$）とします。ここで $|\alpha|=\alpha_1+\cdots+\alpha_d$ は多重指数の総次数です。

これらは $L^2(\mathbb R^d)$ の正規直交基底で、内積 $\langle h_\alpha,f\rangle_{L^2}=\int h_\alpha(x)f(x)\,dx$ は実関数のHermite係数を表します。Schwartz位相は次のHilbertノルム族と同値です。

$$
q_s(f)^2=\sum_\alpha(1+|\alpha|)^{2s}
|\langle h_\alpha,f\rangle_{L^2}|^2,\qquad s=0,1,\ldots
$$

このHermite展開によるSchwartz空間の特徴付けは外部の標準定理として用います（下記文献1）。特に $q_0(f)=\|f\|_2$ です。核性の判定自体は次で計算できます。

<a id="prop-mqfc6-schwartz-nuclear"></a>

<!-- formal-statement-start -->
> **命題（Schwartz空間の核性の確認）**
> 実Schwartz空間 $S=\mathcal S(\mathbb R^d;\mathbb R)$ と実Hermite正規直交基底 $(h_\alpha)$ を考える。Schwartz位相と同値なノルムを

$$
q_s(f)^2=\sum_{\alpha}(1+|\alpha|)^{2s}|\langle h_\alpha,f\rangle_{L^2}|^2
\qquad(s=0,1,\ldots)
$$

> とし、$H_s$ をその完備化とする。整数 $r>d/2$ に対して包含

$$
H_{s+r}\longrightarrow H_s
$$

> はHilbert–Schmidtである。従って $S$ は核空間である。
<!-- formal-statement-end -->

### 証明の見取り図

強いノルムで単位長にした高次Hermite関数は、弱いノルムでは短くなります。その二乗和を次数ごとに数えます。

<!-- proof-start -->
### 証明

$H_{s+r}$ の正規直交基底は $(1+|\alpha|)^{-(s+r)}h_\alpha$ です。有限Hermite和が各重み付き二乗可和列空間で稠密なため、これが完備化全体の基底です。正規直交性から、$h_\alpha$ のHermite係数は添字 $\alpha$ で1、他で0です。したがって包含による像のノルムの二乗は

$$
q_s((1+|\alpha|)^{-(s+r)}h_\alpha)^2
=(1+|\alpha|)^{2s}(1+|\alpha|)^{-2(s+r)}
=(1+|\alpha|)^{-2r}.
$$

これを全基底について足すのがHilbert–Schmidt条件です。$|\alpha|=k$ の非負整数 $d$ 組は $\binom{k+d-1}{d-1}$ 個あり、これは定数倍の $(1+k)^{d-1}$ 以下です。よって

$$
\sum_{\alpha}(1+|\alpha|)^{-2r}
=\sum_{k=0}^\infty\binom{k+d-1}{d-1}(1+k)^{-2r}
<\infty.
$$

最後の級数は指数 $d-1-2r<-1$ により収束します。これは各 $s$ でHilbert–Schmidt包含が存在することを示すので、上の核性の十分条件を満たします。
<!-- proof-end -->

<a id="thm-mqfc6-minlos"></a>

<!-- formal-statement-start -->
> **定理（Bochner–Minlosの定理：実Schwartz空間の場合）**
> $S=\mathcal S(\mathbb R^d;\mathbb R)$ とする。写像 $\chi:S\to\mathbb C$ が次の条件を満たすとする。
>
> 1. $\chi(0)=1$。
> 2. [正値型](#def-mqfc6-positive-type) である。
> 3. Schwartz位相で連続である。
>
> このとき円筒 $\sigma$ 加法族を備えた連続実線形双対 $S'$ 上に、$\chi$ を [特性汎関数](#def-mqfc6-characteristic-functional) とする確率測度がただ一つ存在する。
<!-- formal-statement-end -->

一般の核空間版は文献2の定理を使います。本講の目標は一般定理の証明ではなく、自由場への適用とそのGaussianの場合の構成です。定理の入力は有限次元の正値型条件と試験関数位相での連続性、出力は連続双対上の測度です。

一意性は本講でも確認できます。同じ $\chi$ を持つ二つの確率測度に対し、有限族 $(f_1,\ldots,f_n)$ の同時特性関数は $\chi(\sum_jt_jf_j)$ で一致します。[確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector) による第4節の一意性の論証から、有限次元分布も一致します。

二つの円筒集合の共通部分は、両方の観測を連結した有限族とBorel集合の直積で表せる円筒集合です。よって円筒集合は有限交叉で閉じ、両確率測度が一致するDynkin族に含まれます。[π–λ定理](../../../解析系/F0/F0-00D3A/index.md#thm-f0-00d3a-pi-lambda)により生成する $\sigma$ 加法族上で測度も一致します。次節ではGaussianの場合について存在の具体的な仕組みも示します。

## 6. Euclid自由場のGaussian測度

有限次元分布が整合するだけでなく、核空間上の連続性を確かめれば、自由場の全観測が一つの確率測度から得られます。

<a id="thm-mqfc6-free-measure"></a>

<!-- formal-statement-start -->
> **定理（質量付きEuclid自由場のGaussian測度の構成）**
> $d\ge1$、$m>0$ とし、$B_m$ を [Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) とする。実Schwartz空間の連続双対 $S'$ 上に一意な確率測度 $\mu_m$ が存在し、

$$
\int_{S'}e^{i\langle\omega,f\rangle}\,d\mu_m(\omega)
=e^{-B_m(f,f)/2}
\qquad(f\in S)
$$

> が成り立つ。任意の有限族 $f_j$ の線形測定 $(X_{f_j})$ は平均零のGaussian分布で、その分散共分散行列は $(B_m(f_j,f_k))_{j,k}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

共分散の正値性で有限次元分布を作り、連続性を確認し、核性を使って分布を値に取る確率測度にします。点ごとの場を仮定しません。

<!-- proof-start -->
### 証明

[試験関数共分散の正値性と連続性](../MQFC5/index.md#thm-mqfc5-positivity) によれば、実の $S$ 上で $B_m$ は対称双線形で $B_m(f,f)\ge0$ かつ

$$
|B_m(f,g)|\le m^{-2}\|f\|_2\|g\|_2.
$$

[Gaussian型特性汎関数の有限次元整合性](#thm-mqfc6-gaussian-characteristic) により $\chi(0)=1$ と正値型が成立します。連続性について、$N>d/2$ なら

$$
\|h\|_2^2\le p_{N,0}(h)^2
\int_{\mathbb R^d}(1+|x|)^{-2N}dx.
$$

右の積分は無限遠で半径の $d-1-2N$ 乗により収束します。したがって $f_\ell\to f$ in $S$ なら $\|f_\ell-f\|_2\to0$、$\|f_\ell\|_2$ は有界です。対称双線形性から

$$
|B_m(f_\ell,f_\ell)-B_m(f,f)|
\le m^{-2}\|f_\ell-f\|_2(\|f_\ell\|_2+\|f\|_2)\to0.
$$

この評価は近傍による連続性も直接与え、指数関数の連続性で $\chi$ は連続です。[Schwartz空間の核性の確認](#prop-mqfc6-schwartz-nuclear) と [Bochner–Minlosの定理](#thm-mqfc6-minlos) の全条件が揃い、$\mu_m$ が存在します。有限族について線形性を使えば

$$
E_{\mu_m}[e^{i\sum_jt_jX_{f_j}}]
=\chi\left(\sum_jt_jf_j\right)=e^{-\sum_{j,k}t_jt_kB_m(f_j,f_k)/2}.
$$

[Gaussian型特性汎関数の有限次元整合性](#thm-mqfc6-gaussian-characteristic) と [確率ベクトルの特性関数収束定理](../../../解析系/F0/F0-00P6/index.md#thm-f0-00p6-levy-continuity-vector) による一意性から主張を得ます。
<!-- proof-end -->

### Gaussianの場合の連続双対への具体的な着地

上の存在をより具体的に追うため、Hermite基底を $h_1,h_2,\ldots$ と列挙します。[試験関数共分散の正値性と連続性](../MQFC5/index.md#thm-mqfc5-positivity)により、実の $S$ 上で $B_m$ は対称双線形かつ正定値なので内積になります。その内積で[Gram–Schmidt直交化法](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-gram-schmidt)を各有限段階に適用して $u_1,u_2,\ldots$ を作れます。具体的には

$$
v_j=h_j-\sum_{k<j}B_m(u_k,h_j)u_k,\qquad
u_j=\frac{v_j}{\sqrt{B_m(v_j,v_j)}}.
$$

$h_j$ は先行する $h_k$ の線形結合でないので $v_j\ne0$、分母は正です。

ここで $\delta_{jk}$ はKroneckerのデルタ（$j=k$ で1、それ以外で0）です。直交化の式から、帰納法で

$$
B_m(u_j,u_k)=\delta_{jk},\qquad
h_j=\sum_{k\le j}B_m(u_k,h_j)u_k
$$

が成立します。

可算個の独立標準正規変数 $Y_k$ を用意します。これは [Kolmogorov拡張定理](../../../解析系/STO/STO3/index.md#thm-sto3-kolmogorov-extension) を添字集合 $\mathbb N$ と各有限集合上の標準正規分布の積に適用すれば得られます。各周辺化で捨てる密度の積分が1なので整合条件が成り立ちます。これらの変数から

$$
W_j=\sum_{k\le j}B_m(u_k,h_j)Y_k
$$

を作ります。係数は実数であり、独立性と標準正規変数の平均・分散より $E[Y_kY_l]=\delta_{kl}$ です。したがって

$$
\begin{aligned}
E[W_iW_j]
&=\sum_{k\le i,\,l\le j}B_m(u_k,h_i)B_m(u_l,h_j)E[Y_kY_l]\\
&=\sum_{k\le\min(i,j)}B_m(u_k,h_i)B_m(u_k,h_j)\\
&=B_m(h_i,h_j).
\end{aligned}
$$

最後は上の $h_i,h_j$ の直交展開に双線形性を適用したものです。$h_j$ に対応する多重指数を $\alpha(j)$ とし、整数 $r>d/2$ を取ります。

$$
E\sum_j(1+|\alpha(j)|)^{-2r}W_j^2
\le m^{-2}\sum_j(1+|\alpha(j)|)^{-2r}<\infty.
$$

非負の部分和の [単調収束定理](../../../解析系/F0/F0-00D2B/index.md#ref-limit-integral-exchange) と $B_m(h_j,h_j)\le m^{-2}$ を使いました。従ってこの級数は確率1で有限です。その事象の各実現に対して

$$
T(f)=\sum_j W_j\langle h_j,f\rangle_{L^2}
$$

と置けば、Cauchy–Schwarz不等式で絶対和は

$$
\sum_j|W_j\langle h_j,f\rangle|
\le
\left(\sum_j(1+|\alpha(j)|)^{-2r}W_j^2\right)^{1/2}q_r(f).
$$

よって全 $f\in S$ に同時に連続実線形汎関数が定まります。例外事象では $T=0$ と置きます。各評価は級数が収束する可測事象では有限和の可測な極限、その補集合では零なので、$T$ は円筒 $\sigma$ 加法族に関して可測です。

有限Hermite和を

$$
f_N=\sum_{j\le N}\langle h_j,f\rangle_{L^2}h_j
$$

と置きます。正規直交基底の展開なので $f_N\to f$ が $L^2$ で成立し、絶対収束する級数の部分和なので $T(f_N)\to T(f)$ が確率1で成立します。

$T(f_N)$ は確率1で有限個の独立正規変数の線形結合に等しくなります。$a_j=\langle h_j,f\rangle_{L^2}$ とすると、その平均は零で、分散は

$$
E[T(f_N)^2]=\sum_{i,j\le N}a_i a_jB_m(h_i,h_j)
=B_m(f_N,f_N).
$$

従って[有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian)の線形変換の計算を適用できます。$|e^{iT(f_N)}|=1$ なので [優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) により

$$
E[e^{iT(f)}]=\lim_{N\to\infty}e^{-B_m(f_N,f_N)/2}
=e^{-B_m(f,f)/2}.
$$

最後の等号は先ほどの $L^2$ 評価から従います。したがって $T$ による[押し出し測度](../../../解析系/F0/F0-00P1/index.md#thm-f0-00p1-pushforward-probability)が目的の測度であることを、Gaussianの場合には直接確認できました。

有限格子の密度は有限個の実数上のLebesgue測度を基準とします。一方、連続場の測度は $S'$ 上に構成され、形式的な無限次元の $D\omega$ を基準とする密度を仮定していません。次講ではこの確率測度からモーメントを求めます。

## 7. 演習

### 演習 MQFC6-A1：一次元正規化

- Level: A

$a>0$ に対して $e^{-ax^2/2}$ の正規化定数と、正規化した分布の特性関数を求めよ。

<!-- solution-start -->
**詳細解答**

$y=\sqrt a x$ と置くと $dx=a^{-1/2}dy$ なので

$$
Z_a=a^{-1/2}\int e^{-y^2/2}dy=\sqrt{2\pi/a}.
$$

[有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) の一次元計算に $s=t/\sqrt a$ を入れると

$$
E[e^{itX}]=E[e^{i(t/\sqrt a)Y}]=e^{-t^2/(2a)}.
$$

$X=Y/\sqrt a$ より平均零、分散 $1/a$ です。
<!-- solution-end -->

### 演習 MQFC6-A2：2頂点の格子

- Level: A

2頂点を1辺で結ぶ格子で $m^2=2$ とする。正規化定数、分散共分散行列、差の分散を求めよ。

<!-- solution-start -->
**詳細解答**

辺の二乗と質量項を展開すると

$$
A=\begin{pmatrix}3&-1\\-1&3\end{pmatrix},\qquad
x^TAx=(x_1-x_2)^2+2(x_1^2+x_2^2).
$$

非零の $x$ では右辺が正なので正定値です。$\det A=9-1=8$ から [有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) を適用できます。

$$
Z_A=\frac{2\pi}{\sqrt8},\qquad
A^{-1}=\frac18\begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

差の分散は $3/8+3/8-2(1/8)=1/2$ です。
<!-- solution-end -->

### 演習 MQFC6-A3：特性汎関数の正値型

- Level: A

実Schwartz空間の $S'$ 上の確率測度の特性汎関数について、$f_1=0,f_2=f$ とした正値型条件から $|\chi(f)|\le1$ を示せ。

<!-- solution-start -->
**詳細解答**

[場の特性汎関数](#def-mqfc6-characteristic-functional) の定義から $\chi(0)=1$、$\chi(-f)=\overline{\chi(f)}$ です。[正値型](#def-mqfc6-positive-type) の式に $c_1=-\chi(f),c_2=1$ を代入すると

$$
|\chi(f)|^2+1-\overline{\chi(f)}\chi(f)-\chi(f)\overline{\chi(f)}
=1-|\chi(f)|^2\ge0.
$$

従って $|\chi(f)|\le1$ です。
<!-- solution-end -->

### 演習 MQFC6-A4：線形従属な測定

- Level: A

$B_m(f,f)=3$ とし、$(f,-2f)$ の分散共分散行列と同時特性関数を求めよ。

<!-- solution-start -->
**詳細解答**

[Gaussian型特性汎関数の有限次元整合性](#thm-mqfc6-gaussian-characteristic) で双線形性を用いると

$$
K=\begin{pmatrix}3&-6\\-6&12\end{pmatrix}.
$$

$t^TKt=3t_1^2-12t_1t_2+12t_2^2=3(t_1-2t_2)^2$ です。従って同時特性関数は $e^{-3(t_1-2t_2)^2/2}$ です。零固有値があっても $(\sqrt3Y,-2\sqrt3Y)$ と実現できます。
<!-- solution-end -->

### 演習 MQFC6-B1：3頂点の格子

- Level: B

3頂点の道グラフ、$m=1$ について作用行列と正規化定数を求め、$(1,1,1)$ 方向の測定の分散を計算せよ。

<!-- solution-start -->
**詳細解答**

2辺の二乗と質量項を足すと

$$
A=\begin{pmatrix}2&-1&0\\-1&3&-1\\0&-1&2\end{pmatrix}.
$$

$x^TAx=|x|^2+(x_1-x_2)^2+(x_2-x_3)^2$ なので正定値です。第1行で展開すると

$$
\det A=2(6-1)-2=8.
$$

[有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) より $Z_A=(2\pi)^{3/2}/\sqrt8$ です。$v=(1,1,1)^T$ について $Av=v$、よって $A^{-1}v=v$ です。測定 $v^TX$ の分散は $v^TA^{-1}v=v^Tv=3$ です。
<!-- solution-end -->

### 演習 MQFC6-B2：点評価による退化Gaussian場

- Level: B

固定点 $a,b\in\mathbb R^d$ と独立標準正規変数 $Y,Z$ に対して $T=Y\delta_a+2Z\delta_b$ とする。$T\in S'$ と可測性を示し、特性汎関数および $X_f,X_g$ の共分散を求めよ。

<!-- solution-start -->
**詳細解答**

各実現で $T(f)=Yf(a)+2Zf(b)$ は実線形です。$|T(f)|\le(|Y|+2|Z|)p_{0,0}(f)$ となり、[緩増加分布](../MQFC1/index.md#def-mqfc1-tempered) の連続性条件を満たす実線形汎関数です。有限族の測定は $(Y,Z)$ の実行列による線形写像なのでBorel可測であり、[場の特性汎関数](#def-mqfc6-characteristic-functional) の円筒 $\sigma$ 加法族への可測性を得ます。

独立性と [有限次元Gaussian積分と特性関数](#thm-mqfc6-finite-gaussian) の一次元の場合より

$$
\chi(f)=E[e^{iYf(a)}]E[e^{2iZf(b)}]
=e^{-(f(a)^2+4f(b)^2)/2}.
$$

平均は零です。積を展開すると交差項は $E[YZ]=E[Y]E[Z]=0$、対角項は $E[Y^2]=E[Z^2]=1$ なので

$$
E[X_fX_g]=f(a)g(a)+4f(b)g(b).
$$

<!-- solution-end -->

### 演習 MQFC6-B3：核性の次数と連続性

- Level: B

$d=2$ で $H_{s+1}\to H_s$ と $H_{s+2}\to H_s$ のHilbert–Schmidt条件を比較せよ。後者の和を収束級数に直せ。

<!-- solution-start -->
**詳細解答**

[Schwartz空間の核性の確認](#prop-mqfc6-schwartz-nuclear) で、$|\alpha|=k$ の組は $(0,k),\ldots,(k,0)$ の $k+1$ 個です。$r=1$ のとき二乗和は

$$
\sum_{k=0}^\infty(k+1)(k+1)^{-2}
=\sum_{k=0}^\infty(k+1)^{-1}
$$

で発散します。$r=2$ では

$$
\sum_{k=0}^\infty(k+1)(k+1)^{-4}
=\sum_{k=0}^\infty(k+1)^{-3}<\infty.
$$

従って前者では不足し、後者で核性の判定に必要な包含を得ます。
<!-- solution-end -->

### 演習 MQFC6-C1：自由場の測定の近似

- Level: C

$f_\ell\to f$ in $S$、$g\in S$ とする。構成した $\mu_m$ に対して以下を示せ。

1. $E_{\mu_m}[(X_{f_\ell}-X_f)^2]\to0$。
2. $E_{\mu_m}[X_{f_\ell}X_g]\to E_{\mu_m}[X_fX_g]$。
3. $f\ne0$ なら $X_f$ は非退化である。
4. $\chi_m(f_\ell)\to\chi_m(f)$ を、測定の二乗平均収束からも導け。

<!-- solution-start -->
**詳細解答**

[質量付きEuclid自由場のGaussian測度の構成](#thm-mqfc6-free-measure) により全有限族の平均は零、分散共分散は $B_m$ です。$\omega$ は線形汎関数だから $X_{f_\ell}-X_f=X_{f_\ell-f}$ です。

**1.** [試験関数共分散の正値性と連続性](../MQFC5/index.md#thm-mqfc5-positivity) より

$$
0\le E[(X_{f_\ell}-X_f)^2]
=B_m(f_\ell-f,f_\ell-f)
\le m^{-2}\|f_\ell-f\|_2^2\to0.
$$

Schwartz収束が $L^2$ 収束を含意することは [自由場測度の構成](#thm-mqfc6-free-measure) の証明で示した $p_{N,0}$ による評価から従います。

**2.** 差は $B_m(f_\ell-f,g)$ なので

$$
|E[X_{f_\ell}X_g]-E[X_fX_g]|
\le m^{-2}\|f_\ell-f\|_2\|g\|_2\to0.
$$

**3.** [試験関数共分散の正値性と連続性](../MQFC5/index.md#thm-mqfc5-positivity)により $f\ne0$ では $B_m(f,f)>0$ です。平均零の一次元Gaussianで分散が正なので一点に集中せず、非退化です。

**4.** 実数 $a,b$ について $e^{ia}-e^{ib}=\int_b^a i e^{iu}du$ から $|e^{ia}-e^{ib}|\le|a-b|$ です。よって

$$
\begin{aligned}
|\chi_m(f_\ell)-\chi_m(f)|
&\le E|X_{f_\ell}-X_f|\\
&\le \sqrt{E[(X_{f_\ell}-X_f)^2]}\to0.
\end{aligned}
$$

最後は確率測度上のCauchy–Schwarz不等式と1の結論です。この収束は点評価の存在を仮定せず、試験関数による測定について成立します。
<!-- solution-end -->

## 8. 次の講義と参考文献

MQFC7では特性汎関数を有限個の実パラメータで微分して、Schwinger関数とGaussianの全モーメントを求めます。

1. J. Becnel and A. Sengupta, [The Schwartz Space: Tools for Quantum Mechanics and Infinite Dimensional Analysis](https://doi.org/10.3390/math3020527), Mathematics 3 (2015), 527–562. Hermite展開とHilbertノルムによるSchwartz空間の記述。
2. J. Velhinho, [Topics of Measure Theory on Infinite Dimensional Spaces](https://doi.org/10.3390/math5030044), Mathematics 5 (2017), 44. Bochner–Minlosの定理と円筒測度。
