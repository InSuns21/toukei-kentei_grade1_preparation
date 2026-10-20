# ML1-18 カーネル回帰と正則化経路

線形回帰では特徴量の係数を求め、[Ridge回帰](../ML1-05/index.md#def-ml1-05-ridge)では係数を縮めて過適合を抑えた。一方、入力と予測値の関係が非線形になると、使いたい特徴量そのものを事前に列挙するのは難しい。[RKHS1の再生核](../../RKHS/RKHS1/index.md#def-rkhs1-reproducing-kernel)は入力間の内積を関数空間で表し、[RKHS2の表現定理](../../RKHS/RKHS2/index.md#thm-rkhs2-representer)は無限次元の最適化を有限個の係数へ還元する。[RKHS3のカーネルリッジ回帰](../../RKHS/RKHS3/index.md#def-rkhs3-kernel-ridge-regression)でその解法はすでに確立している。

この章では、その一般定理を**実際の標本に代入して予測し、正則化係数を動かしたとき何が連続的に変わるか**を調べる。特に、Gram行列が特異でも予測が定まる理由、学習誤差だけで係数を決められない理由を数値で追う。

## 1. 核の値から予測を作る

入力空間を $\mathcal X$、実数値の正半定値核を $K:\mathcal X\times\mathcal X\to\mathbb R$、対応する実RKHSを $\mathcal H$ とする。訓練標本 $(x_i,y_i)_{i=1}^n$ は固定し、$n\ge1$ とする。核が正半定値とは、対称性 $K(x,z)=K(z,x)$ と、任意の有限個の入力および係数に対する二次形式の非負性を要求する条件である（[RKHS1の定義](../../RKHS/RKHS1/index.md#def-rkhs1-psd-kernel)）。

[RKHS2のGram表示](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)に従って標本点ごとの核切片を足し合わせると、関数と訓練点での値は

$$
f_\alpha(\cdot)=\sum_{i=1}^n\alpha_iK(x_i,\cdot),\qquad
f_\alpha(x_j)=\sum_{i=1}^n\alpha_iK(x_i,x_j)
$$

と表される。後者の係数 $K(x_i,x_j)$ を行・列に並べたものがGram行列である。つまり行列は新しい条件ではなく、**各訓練点で関数を評価する操作**の座標表示である。

<a id="def-ml1-18-kernel-prediction"></a>

<!-- formal-statement-start -->
> **定義（Gram行列と核予測）**  
> 訓練標本 $x_1,\ldots,x_n\in\mathcal X$、核 $K$、係数 $\alpha\in\mathbb R^n$ に対し、$n\times n$ のGram行列 $G$、新しい入力 $x$ の核ベクトル $k(x)$ と予測 $f_\alpha(x)$ を次で定める。

$$
G_{ij}=K(x_i,x_j),\qquad
k(x)=\bigl(K(x_1,x),\ldots,K(x_n,x)\bigr)^{\mathsf T},
\qquad f_\alpha(x)=k(x)^{\mathsf T}\alpha.
$$
<!-- formal-statement-end -->

これは[RKHS2の有限次元表示](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)と[RKHS3の核ベクトル](../../RKHS/RKHS3/index.md#def-rkhs3-kernel-vector)を標本で使うための書き方である。訓練点 $x_j$ の核ベクトルは $G$ の第 $j$ 列なので、訓練値を縦に並べると $\widehat y=G\alpha$ となる。

<!-- definition-example-start: def-ml1-18-kernel-prediction -->
**定義の確認**：核値・Gram行列・予測を直接計算する。 $\mathcal X=\mathbb R^2$、$K(x,z)=4x_1z_1+x_2z_2$、標本入力 $x^{(1)}=(1,0)$、$x^{(2)}=(0,1)$ とする。特徴写像 $\phi(x)=(2x_1,x_2)$ により $K(x,z)=\phi(x)^{\mathsf T}\phi(z)$ である。内積の対称性から $K(x,z)=K(z,x)$。さらに任意の $m\ge1$、$z_1,\ldots,z_m\in\mathbb R^2$、$c\in\mathbb R^m$ に対して

$$
\sum_{i,j=1}^m c_ic_jK(z_i,z_j)
=\left(\sum_i c_i\phi(z_i)\right)^{\mathsf T}
 \left(\sum_j c_j\phi(z_j)\right)
=\left\|\sum_i c_i\phi(z_i)\right\|_2^2\ge0
$$

なので、正半定値核の二条件をともに満たす。訓練入力を $x^{(1)},x^{(2)}$ の順に並べ、$G_{ij}=K(x^{(i)},x^{(j)})$ を計算すると

$$
G=\begin{pmatrix}4&0\\0&1\end{pmatrix}.
$$

新しい入力 $x_*=(1/4,1)$ では $k(x_*)=(1,1)^{\mathsf T}$。例えば $\alpha=(2/5,1/2)^{\mathsf T}$ なら、訓練予測は $(8/5,1/2)^{\mathsf T}$、未知点予測は $2/5+1/2=9/10$ である。「核ベクトルの二成分」と「特徴ベクトルの二成分」は、数が同じでも別の対象である。
<!-- definition-example-end -->

## 2. 正則化係数を固定して学習する

応答ベクトルを $y=(y_1,\ldots,y_n)^{\mathsf T}\in\mathbb R^n$ とする。損失と罰則の規約をそろえないと、異なる資料の $\lambda$ が同じ強さを表さない。この章では切片を独立には置かず、正則化係数を $\lambda>0$ として次を用いる。

<a id="def-ml1-18-krr-training"></a>

<!-- formal-statement-start -->
> **定義（標本に対するカーネル回帰の学習）**  
> 実RKHS $\mathcal H$、標本 $(x_i,y_i)_{i=1}^n$、$\lambda>0$ の下で、二乗損失とRKHSノルムを用いて

$$
J_\lambda(f)=\frac1n\sum_{i=1}^n(y_i-f(x_i))^2+\lambda\|f\|_{\mathcal H}^2
$$

> を最小にする関数 $f_\lambda\in\mathcal H$ を学習結果とする。その訓練予測を $\widehat y_\lambda=(f_\lambda(x_i))_{i=1}^n$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-18-krr-training -->
**定義の確認**：定数核の1点学習。 $n=1$、定数核 $K(x,z)=1$、応答 $y_1=2$、$\lambda=1$ とする。この核のRKHSの関数は定数 $f(x)=c$ であり、$\|f\|_{\mathcal H}^2=c^2$ である。従って目的関数は

$$
J_1(f)=(2-c)^2+c^2=2(c-1)^2+2.
$$

全ての $c\in\mathbb R$ に対し第1項は非負なので、最小値2を達成する唯一の関数は $f_1(x)=1$ である。ここでは関数を直接最小化したので、まだ係数の解公式を仮定していない。
<!-- definition-example-end -->

[RKHS3の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)の前提は正半定値核、二乗損失、$\lambda>0$ である。そこへ $n$ と $\lambda$ を代入すると、**一つの標準的な係数表示**として

$$
\alpha_\lambda=(G+n\lambda I_n)^{-1}y,\qquad
\widehat y_\lambda=G(G+n\lambda I_n)^{-1}y,
\qquad f_\lambda(x)=k(x)^{\mathsf T}\alpha_\lambda
$$

を得る。直前の定数核の例にもこの公式を適用すると、$G=(1)$、$n=\lambda=1$、$y=(2)$ だから $\alpha_1=(1+1)^{-1}2=1$ となり、関数を直接最小化した結果と一致する。

なぜ逆行列が存在するかも確認する。任意の $v\ne0$ について $v^{\mathsf T}Gv\ge0$ なので

$$
v^{\mathsf T}(G+n\lambda I_n)v
=v^{\mathsf T}Gv+n\lambda\|v\|_2^2>0.
$$

すなわち $G+n\lambda I_n$ は正定値である。ここで $n\lambda$ を $\lambda$ と書き換えるのは、別の規約に変えることを意味する。

<a id="prop-ml1-18-two-direction-fit"></a>

<!-- formal-statement-start -->
> **命題（2方向の標本と正則化経路）**  
> 核 $K(x,z)=4x_1z_1+x_2z_2$、訓練入力 $(1,0),(0,1)$、応答 $y=(2,1)^{\mathsf T}$、$\lambda>0$ に対し、学習係数、訓練予測、入力 $(1/4,1)$ での予測は

$$
\alpha_\lambda=
\begin{pmatrix}2/(4+2\lambda)\\1/(1+2\lambda)\end{pmatrix},\qquad
\widehat y_\lambda=
\begin{pmatrix}8/(4+2\lambda)\\1/(1+2\lambda)\end{pmatrix},
$$

$$
f_\lambda(1/4,1)=\frac2{4+2\lambda}+\frac1{1+2\lambda}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

この標本のGram行列は対角なので、$G+2\lambda I_2$ の各対角成分で応答を割ればよい。未知点では先に確認した核ベクトル $(1,1)^{\mathsf T}$ を掛ける。

<!-- proof-start -->
### 証明

$n=2$、$G=\operatorname{diag}(4,1)$ なので

$$
G+2\lambda I_2=
\begin{pmatrix}4+2\lambda&0\\0&1+2\lambda\end{pmatrix}.
$$

$\lambda>0$ から両対角成分は正であり、逆行列は逆数を並べた対角行列になる。従って

$$
(G+2\lambda I_2)^{-1}\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}2/(4+2\lambda)\\1/(1+2\lambda)\end{pmatrix}.
$$

訓練値はこれに $G$ を左から掛ける。未知点 $x_*=(1/4,1)$ について $K((1,0),x_*)=1$、$K((0,1),x_*)=1$ であるから、$k(x_*)^{\mathsf T}\alpha_\lambda$ は二成分の和となる。$\square$
<!-- proof-end -->

実際に代入すると、$\lambda=1/4$ で $\widehat y=(16/9,2/3)$、$f(x_*)=10/9$、$\lambda=1/2$ で $(8/5,1/2)$、$f(x_*)=9/10$、$\lambda=1$ で $(4/3,1/3)$、$f(x_*)=2/3$。正則化を強めると両方向の訓練予測は縮むが、縮み方は同じではない。

## 3. 特異Gram行列：係数が大きくても関数は小さい

二つの標本が同じ入力なら、異なる係数の組が同じ関数を表すことがある。これを「逆行列が存在しないから学習不能」と理解すると誤る。[RKHS2のGram表示](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)では、係数の差 $v$ が $Gv=0$ を満たすなら、差に対応する関数 $h=\sum_i v_iK(x_i,\cdot)$ のノルム二乗は $v^{\mathsf T}Gv=0$ である。したがって $h$ は零関数となる。

<a id="prop-ml1-18-singular-example"></a>

<!-- formal-statement-start -->
> **命題（相反する応答と特異Gram行列）**  
> 任意の非空集合 $\mathcal X$ 上で $K(x,z)=1$ とし、二標本の応答を $y=(1,-1)^{\mathsf T}$ とする。入力は任意とする。すべての $\lambda>0$ に対し、

$$
G=\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
\alpha_\lambda=\frac1{2\lambda}\begin{pmatrix}1\\-1\end{pmatrix},
\qquad f_\lambda(x)=0\quad(x\in\mathcal X)
$$

> が成立する。$\lambda\downarrow0$ で係数のEuclidノルムは発散するが、RKHS関数と全入力の予測値は恒等的に零である。
<!-- formal-statement-end -->

### 証明の見取り図

応答 $(1,-1)$ は $G$ の零固有値方向にあり、正則化はその係数を $2\lambda$ で割る。一方、核切片二つは同じ定数関数であり、係数の和が0なら関数は零になる。

<!-- proof-start -->
### 証明

任意の二標本について $G(1,-1)^{\mathsf T}=0$ である。よって

$$
(G+2\lambda I_2)\frac1{2\lambda}\begin{pmatrix}1\\-1\end{pmatrix}
=\frac1{2\lambda}\left(G\begin{pmatrix}1\\-1\end{pmatrix}
+2\lambda\begin{pmatrix}1\\-1\end{pmatrix}\right)
=\begin{pmatrix}1\\-1\end{pmatrix}=y.
$$

$\lambda>0$ により行列が正定値なので、表示された係数が標準解である。すべての $x$ で $k(x)=(1,1)^{\mathsf T}$ なので $f_\lambda(x)=1/(2\lambda)-1/(2\lambda)=0$。さらに $\|\alpha_\lambda\|_2=\sqrt2/(2\lambda)\to\infty$、しかし $\|f_\lambda\|_{\mathcal H}^2=\alpha_\lambda^{\mathsf T}G\alpha_\lambda=0$ である。$\square$
<!-- proof-end -->

ここで壊れたのは、核が二つの観測点・相反する応答を区別できるという期待である。正則化を消しても、データを表す関数の自由度は増えない。反対に $\lambda>0$ の学習**関数**は[RKHS3の一意性](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)により定まる。上の $\alpha_\lambda$ は線形系の唯一の標準係数だが、同じ関数を表す任意の係数列まで唯一という意味ではない。

## 4. 経路を固有値方向に分ける

[RKHS3の平滑化行列](../../RKHS/RKHS3/index.md#def-rkhs3-smoother-matrix)を用い、次のように置く。

$$
S_\lambda=G(G+n\lambda I_n)^{-1}.
$$

$G$ が実対称正半定値なので、[RKHS3のスペクトル表示](../../RKHS/RKHS3/index.md#prop-rkhs3-spectral-smoother)が適用できる。固有値は非負であり、ある直交行列 $Q$ を用いて

$$
G=Q\operatorname{diag}(\mu_1,\ldots,\mu_n)Q^{\mathsf T},
\qquad Q^{\mathsf T}Q=I_n,\qquad \mu_j\ge0
$$

と書ける。応答をその固有方向へ回して $z=Q^{\mathsf T}y$ とすると、$j$ 番目の訓練予測成分は

$$
\frac{\mu_j}{\mu_j+n\lambda}z_j
$$

となる。

<a id="def-ml1-18-path-diagnostics"></a>

<!-- formal-statement-start -->
> **定義（正則化経路の三つの診断量）**  
> 標本数 $n\ge1$、正半定値Gram行列 $G$、応答 $y$、$\lambda>0$ に対し、訓練残差平方和 $R_\lambda$、関数ノルム二乗 $N_\lambda$、平滑化の有効自由度 $d_\lambda$ を

$$
R_\lambda=\|y-S_\lambda y\|_2^2,\qquad
N_\lambda=\|f_\lambda\|_{\mathcal H}^2,\qquad
d_\lambda=\operatorname{tr}(S_\lambda)
$$

> で定める。$d_\lambda$ は平滑化行列の固有値の和であり、標本数そのものとは区別する。
<!-- formal-statement-end -->

定義した三量を行列から計算する手順を確かめる。残差は $y-G\alpha_\lambda$ であり、関数ノルムについては[RKHS2のGram行列による表示](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)をこの関数 $f_\lambda=\sum_i\alpha_{\lambda,i}K(x_i,\cdot)$ に適用して

$$
N_\lambda=\alpha_\lambda^{\mathsf T}G\alpha_\lambda
$$

を得る。また、$S_\lambda$ の跡は対角成分の和なので、対角行列ではその二成分を足せばよい。

<!-- definition-example-start: def-ml1-18-path-diagnostics -->
**定義の確認**：第2節の2方向例では、$n=2$、$\lambda=1/2$、$G=\operatorname{diag}(4,1)$、$y=(2,1)^{\mathsf T}$ である。$n\lambda=1$ を解公式に代入して

$$
\alpha_\lambda=\begin{pmatrix}2/5\\1/2\end{pmatrix},\qquad
S_\lambda=G(G+I_2)^{-1}=\operatorname{diag}(4/5,1/2)
$$

となる。したがって訓練値は $(8/5,1/2)^{\mathsf T}$、残差は $(2/5,1/2)^{\mathsf T}$ だから

$$
R_\lambda=\left(\frac25\right)^2+\left(\frac12\right)^2
=\frac4{25}+\frac14=\frac{41}{100}.
$$

関数ノルムはGram表示により

$$
N_\lambda
=\begin{pmatrix}2/5&1/2\end{pmatrix}
\begin{pmatrix}4&0\\0&1\end{pmatrix}
\begin{pmatrix}2/5\\1/2\end{pmatrix}
=\frac{16}{25}+\frac14=\frac{89}{100}.
$$

跡は

$$
d_\lambda=\operatorname{tr}(S_\lambda)=\frac45+\frac12=\frac{13}{10}.
$$

ここで $R_\lambda$ は残差**平方和**なので $1/n$ を掛けない。
<!-- definition-example-end -->

<a id="thm-ml1-18-path-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（カーネル回帰の正則化経路の単調性）**  
> $G\in\mathbb R^{n\times n}$ が実対称正半定値、$y\in\mathbb R^n$、$\lambda>0$ とする。$G$ の固有値を $\mu_j\ge0$、対応する応答成分を $z_j$ とすると、

$$
R_\lambda=\sum_{j=1}^n\left(\frac{n\lambda}{\mu_j+n\lambda}\right)^2z_j^2,\qquad
N_\lambda=\sum_{j=1}^n\frac{\mu_j}{(\mu_j+n\lambda)^2}z_j^2,
\qquad d_\lambda=\sum_{j=1}^n\frac{\mu_j}{\mu_j+n\lambda}.
$$

> このとき $\lambda$ の増加に対し $R_\lambda$ は非減少、$N_\lambda$ と $d_\lambda$ は非増加である。特に $\lambda\downarrow0$ で $\widehat y_\lambda$ は $\operatorname{Im}(G)$ への直交射影 $P_{\operatorname{Im}(G)}y$ に収束し、$\lambda\to\infty$ で $\widehat y_\lambda\to0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

固有ベクトルごとの縮小率を使えば、残差成分も関数ノルムも有限和で書ける。各項を $\lambda$ で微分して符号を調べる。零固有値方向は、全ての $\lambda$ で予測されない。

<!-- proof-start -->
### 証明

[RKHS3の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)に $G=Q\operatorname{diag}(\mu_j)Q^{\mathsf T}$ を代入し、直交性を使うと

$$
Q^{\mathsf T}\alpha_\lambda
=\operatorname{diag}\left(\frac1{\mu_j+n\lambda}\right)z,\qquad
Q^{\mathsf T}\widehat y_\lambda
=\operatorname{diag}\left(\frac{\mu_j}{\mu_j+n\lambda}\right)z.
$$

よって残差の $j$ 成分は

$$
z_j-\frac{\mu_j}{\mu_j+n\lambda}z_j
=\frac{n\lambda}{\mu_j+n\lambda}z_j
$$

であり、直交行列 $Q$ による変換は長さを保つので、その二乗和が $R_\lambda$ となる。さらに[RKHS2のGram行列による有限次元表示](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)より、$N_\lambda=\alpha_\lambda^{\mathsf T}G\alpha_\lambda$ であり、固有座標へ変換すると

$$
N_\lambda
=(Q^{\mathsf T}\alpha_\lambda)^{\mathsf T}
 \operatorname{diag}(\mu_j)(Q^{\mathsf T}\alpha_\lambda)
=\sum_j\frac{\mu_jz_j^2}{(\mu_j+n\lambda)^2}
$$

となる。最後に $S_\lambda=Q\operatorname{diag}(\mu_j/(\mu_j+n\lambda))Q^{\mathsf T}$ の跡はその固有値の和だから、$d_\lambda$ の表示式を得る。

有限和なので各項を微分でき、$\mu_j,\lambda\ge0$ を用いると

$$
\frac{dR_\lambda}{d\lambda}
=\sum_j\frac{2n^2\lambda\mu_j z_j^2}{(\mu_j+n\lambda)^3}\ge0,
\qquad
\frac{dN_\lambda}{d\lambda}
=-\sum_j\frac{2n\mu_j z_j^2}{(\mu_j+n\lambda)^3}\le0,
$$

$$
\frac{dd_\lambda}{d\lambda}
=-\sum_j\frac{n\mu_j}{(\mu_j+n\lambda)^2}\le0.
$$

$\mu_j>0$ の縮小率は $\lambda\downarrow0$ で1、$\mu_j=0$ の縮小率は全 $\lambda>0$ で0であるから、極限は正固有値の固有空間（$\operatorname{Im}(G)$）への直交射影となる。$\lambda\to\infty$ では各縮小率が0になる。$\square$
<!-- proof-end -->

**読み違えに注意。** 訓練残差が $\lambda$ とともに増えることから、未知データの誤差まで単調増加とは結論できない。零固有値に沿う $y$ の成分は正則化を弱めても訓練残差として残る。$G$ が特異で $y\notin\operatorname{Im}(G)$ のとき、$\alpha_\lambda$ のその成分は $z_j/(n\lambda)$ と発散しうるが、訓練予測には $G$ が掛かるので消える。

## 5. 学習誤差ではなく検証誤差で係数を選ぶ

[ML1-12の三分割](../ML1-12/index.md#def-ml1-12-three-way-split)の役割を、2方向例に適用しよう。訓練に使わなかった入力 $x_*=(1/4,1)$ と観測応答 $y_*=1$ を**検証標本**とする。平方検証誤差 $(y_*-f_\lambda(x_*))^2$ は次の通り。

| $\lambda$ | 未知点の予測 | 平方検証誤差 |
| ---: | ---: | ---: |
| $1/4$ | $10/9$ | $1/81$ |
| $1/2$ | $9/10$ | $1/100$ |
| $1$ | $2/3$ | $1/9$ |

候補集合を $\{1/4,1/2,1\}$ と**事前固定**すれば、この検証標本については $\lambda=1/2$ が最良である。しかし一つの検証点が母集団リスクの最小を保証するわけではない。核の種類も同時に選ぶなら、核・係数の組を検証し、独立なテスト標本は選択後の最終評価に残す（[ML1-12の独立評価](../ML1-12/index.md#thm-ml1-12-independent-holdout)）。

通常の[Ridge回帰の縮小](../ML1-05/index.md#thm-ml1-05-svd-shrink)と同様、固定した核では $\lambda$ が係数ノルムを抑える。一方、核の変更は $G$ 自体と、その固有ベクトル・固有値を変える。**同じ $\lambda$ の数値でも核を変えれば同じ予測にはならない。**

この章は切片を罰しない設定を扱っていない。切片 $b$ を別に加える場合は $\sum_i(y_i-b-f(x_i))^2/n+\lambda\|f\|_{\mathcal H}^2$ を最適化し直す必要があり、ここでの $G+n\lambda I$ をそのまま適用して $b=0$ と扱ってはいけない。

## 6. 計算ラボ：正則化経路と特異例

以下は乱数を使わない決定論的な全計算である。2点の線形核模型は $G$、係数、訓練誤差、検証誤差を毎回求め直す。グラフは表示用の架空曲線ではなく、実際に計算した予測と誤差で描く。入力は上の2方向例で固定し、正則化係数の一覧を変更して挙動を確かめよう。

~~~python-lab
# lab-id: ml1-18-krr-path
# lab-title: 実際のGram行列で学習・予測・検証する
# lab-mode: demo
# timeout-ms: 10000
import numpy as np
import matplotlib.pyplot as plt

x_train = np.array([[1., 0.], [0., 1.]])
y_train = np.array([2., 1.])
x_val = np.array([.25, 1.])
y_val = 1.
weights = np.diag([4., 1.])
def kernel(a, b):
    return float(a @ weights @ b)
G = np.array([[kernel(a,b) for b in x_train] for a in x_train])
k_val = np.array([kernel(a,x_val) for a in x_train])
grid = np.array([.01,.05,.1,.25,.5,1.,2.,5.])
n = len(y_train)
train_mse, val_sqerr, norm_sq, dof = [], [], [], []
for lam in grid:
    alpha = np.linalg.solve(G+n*lam*np.eye(n), y_train)
    fitted = G @ alpha
    prediction = k_val @ alpha
    train_mse.append(float(np.mean((y_train-fitted)**2)))
    val_sqerr.append(float((y_val-prediction)**2))
    norm_sq.append(float(alpha @ G @ alpha))
    dof.append(float(sum(np.diag(np.linalg.solve(G+n*lam*np.eye(n),G)))))
    print("lambda",lam,"alpha",alpha,"train",fitted,
          "val",round(prediction,6),"val error",round(val_sqerr[-1],6))
best = int(np.argmin(val_sqerr))
print("selected lambda on this grid:",grid[best])
G_singular = np.ones((2,2))
y_singular = np.array([1.,-1.])
for lam in [1.,.1,.01]:
    a = np.linalg.solve(G_singular+2*lam*np.eye(2),y_singular)
    print("singular:",lam,"coeff norm",np.linalg.norm(a),
          "prediction",G_singular@a)
fig, axes = plt.subplots(1,2,figsize=(10,4))
axes[0].plot(grid,train_mse,"o-",label="train MSE")
axes[0].plot(grid,val_sqerr,"s-",label="validation squared error")
axes[0].set(xscale="log",xlabel="lambda",ylabel="squared error")
axes[0].legend()
axes[1].plot(grid,norm_sq,"o-",label="RKHS norm squared")
axes[1].plot(grid,dof,"s-",label="d(lambda)")
axes[1].set(xscale="log",xlabel="lambda")
axes[1].legend()
plt.tight_layout()
plt.show()
~~~

~~~python-test
assert np.allclose(G,[[4,0],[0,1]])
assert np.allclose(k_val,[1,1])
a = np.linalg.solve(G+np.eye(2),y_train)
assert np.allclose(a,[.4,.5])
assert abs(k_val@a-.9)<1e-12
assert abs(train_mse[4]-.205)<1e-12
assert abs(val_sqerr[4]-.01)<1e-12
assert all(train_mse[i]<=train_mse[i+1]+1e-12 for i in range(len(grid)-1))
assert all(norm_sq[i]>=norm_sq[i+1]-1e-12 for i in range(len(grid)-1))
assert all(dof[i]>=dof[i+1]-1e-12 for i in range(len(grid)-1))
~~~

観測 $y$ と核、学習・検証分割、評価量を固定しているので各行の差は $\lambda$ だけに由来する。ただしこの単一標本の選択結果を一般の最適係数と呼ぶことはできない。

## 7. 演習

### ML1-18-A01 Gram行列から未知点を予測する
- Level: A

$K(x,z)=x_1z_1+2x_2z_2$、訓練入力 $e_1=(1,0),e_2=(0,1)$、応答 $y=(1,2)^{\mathsf T}$、$\lambda=1/2$ とする。$G$、$\alpha_\lambda$、訓練予測、$x_*=(1,1)$ の予測を求めよ。

<!-- solution-start -->
#### 詳細解答

特徴写像 $\phi(x)=(x_1,\sqrt2x_2)$ から $K(x,z)=\phi(x)^{\mathsf T}\phi(z)$ となるため、この核は対称・正半定値である。訓練入力の順に核値を並べると

$$
G=\begin{pmatrix}1&0\\0&2\end{pmatrix},\qquad
G+2\lambda I_2=\begin{pmatrix}2&0\\0&3\end{pmatrix}.
$$

二乗損失と $\lambda>0$ なので[RKHS3の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)を $n=2$ へ適用でき、

$$
\alpha_\lambda=\begin{pmatrix}1/2\\2/3\end{pmatrix},\qquad
\widehat y_\lambda=G\alpha_\lambda=\begin{pmatrix}1/2\\4/3\end{pmatrix}
$$

を得る。新しい入力 $x_*=(1,1)$ の核ベクトルは $k(x_*)=(1,2)^{\mathsf T}$ である。ゆえに

$$
f_\lambda(x_*)=k(x_*)^{\mathsf T}\alpha_\lambda
=1\cdot\frac12+2\cdot\frac23=\frac{11}{6}.
$$
<!-- solution-end -->

### ML1-18-A02 正則化の強さと規約
- Level: A

$G=I_2$、$y=(3,-1)^{\mathsf T}$ とする。$\lambda=1/2$ および $\lambda=3/2$ の係数と訓練予測を求めよ。$G+\lambda I$ としてはいけない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

本章の損失は標本平均 $n^{-1}\sum_i(y_i-f(x_i))^2$、罰則は $\lambda\|f\|^2$ である。したがって[RKHS3の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)を $n=2$ に適用すると、逆行列の対象は

$$
G+2\lambda I_2=(1+2\lambda)I_2
$$

となり、$G+\lambda I_2$ ではない。各値を代入して

$$
\begin{aligned}
\lambda=\frac12:\quad&\alpha_\lambda=\widehat y_\lambda
=\frac12y=\begin{pmatrix}3/2\\-1/2\end{pmatrix},\\
\lambda=\frac32:\quad&\alpha_\lambda=\widehat y_\lambda
=\frac14y=\begin{pmatrix}3/4\\-1/4\end{pmatrix}.
\end{aligned}
$$

両者で係数と訓練予測が一致するのは、ここでは $G=I_2$ だからである。
<!-- solution-end -->

### ML1-18-A03 特異な核と係数の区別
- Level: A

定数核 $K=1$、二標本応答 $(1,-1)$、$\lambda=1/4$ とする。$G$、標準係数、任意の入力の予測、係数ノルムと関数ノルムを求めよ。

<!-- solution-start -->
#### 詳細解答

すべての核値が1なので

$$
G=\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
G\begin{pmatrix}1\\-1\end{pmatrix}=0.
$$

[特異例の命題](#prop-ml1-18-singular-example)に $2\lambda=1/2$ を代入すると

$$
\alpha_\lambda=\frac1{2\lambda}\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}2\\-2\end{pmatrix}.
$$

任意の入力の核ベクトルは $(1,1)^{\mathsf T}$ なので、予測は $2-2=0$。しかし係数ノルムと関数ノルムは異なり、

$$
\|\alpha_\lambda\|_2=\sqrt{2^2+(-2)^2}=2\sqrt2,\qquad
\|f_\lambda\|_{\mathcal H}^2
=\alpha_\lambda^{\mathsf T}G\alpha_\lambda=0.
$$

関数ノルムは0である。
<!-- solution-end -->

### ML1-18-A04 平滑化の有効自由度
- Level: A

$G=\operatorname{diag}(3,0)$、$n=2$、$\lambda=1/2$、$y=(4,2)$ について、$S_\lambda$、$\widehat y_\lambda$、$R_\lambda$、$d_\lambda$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$n\lambda=1$ である。平滑化行列を定義どおり計算すると

$$
S_\lambda=G(G+I_2)^{-1}
=\operatorname{diag}(3/4,0),\qquad
\widehat y_\lambda=S_\lambda y=\begin{pmatrix}3\\0\end{pmatrix}.
$$

残差は $(4-3,2-0)=(1,2)$ なので

$$
R_\lambda=1^2+2^2=5,\qquad
d_\lambda=\operatorname{tr}(S_\lambda)=\frac34+0=\frac34.
$$

第2成分は零固有値方向なので、$\lambda$ を下げてもその方向を訓練値として表現できない。
<!-- solution-end -->

### ML1-18-B01 正則化経路の微分
- Level: B

$G$ を実対称正半定値、$\mu_j\ge0$ を固有値、$z_j$ を応答の固有方向成分とし、$R_\lambda=\|y-G(G+n\lambda I)^{-1}y\|^2$ とする。$dR_\lambda/d\lambda$ を導き、等号の条件を述べよ。

<!-- solution-start -->
#### 詳細解答

[スペクトル表示](../../RKHS/RKHS3/index.md#prop-rkhs3-spectral-smoother)で $j$ 成分の残差は $r_j=n\lambda z_j/(\mu_j+n\lambda)$。商の微分より

$$
r_j'=\frac{nz_j(\mu_j+n\lambda)-n\lambda z_j\cdot n}{(\mu_j+n\lambda)^2}
=\frac{n\mu_j z_j}{(\mu_j+n\lambda)^2}.
$$

有限和を微分すると

$$
R_\lambda'=2\sum_jr_jr_j'
=\sum_j\frac{2n^2\lambda\mu_j z_j^2}{(\mu_j+n\lambda)^3}\ge0.
$$

$\lambda>0$ で各分母は正なので、等号はすべての $\mu_j>0$ の方向で $z_j=0$、すなわち $y\in\ker G$ のとき、かつそのときに限る。
<!-- solution-end -->

### ML1-18-B02 雑音に矛盾がある定数核
- Level: B

$K=1$、二標本応答 $y=(2,0)$ とする。$\lambda>0$ で $\alpha_\lambda$、任意の入力の予測、$\lambda=1/2$ での訓練残差平方和を求め、$\lambda\downarrow0$ の係数の挙動を述べよ。

<!-- solution-start -->
#### 詳細解答

$y=(1,1)+(1,-1)$ と分解すると、$G$ は前者へ固有値2、後者へ固有値0を持つ。従って $G+2\lambda I$ の逆をそれぞれに適用して

$$
\alpha_\lambda=\frac1{2+2\lambda}\begin{pmatrix}1\\1\end{pmatrix}
+\frac1{2\lambda}\begin{pmatrix}1\\-1\end{pmatrix}.
$$

任意の入力の核ベクトルは $(1,1)$ なので予測は係数の和 $2/(2+2\lambda)=1/(1+\lambda)$。$\lambda=1/2$ で予測は2点とも $2/3$、残差平方和は $(2-2/3)^2+(0-2/3)^2=16/9+4/9=20/9$。$\lambda\downarrow0$ で第2項が $1/(2\lambda)$ 倍となり係数は発散するが、関数は定数1へ収束する。これは零空間方向の係数が同一の関数値に寄与しないためである。
<!-- solution-end -->

### ML1-18-B03 検証データで係数を選ぶ
- Level: B

2方向核 $K(x,z)=4x_1z_1+x_2z_2$、訓練入力 $e_1,e_2$、応答 $(2,1)$、検証点 $x_*=(1/4,1)$、検証応答1とする。候補 $\lambda\in\{1/4,1/2,1\}$ の平方検証誤差を比較し最良候補を答えよ。選択した値から言えること・言えないことを区別せよ。

<!-- solution-start -->
#### 詳細解答

[2方向の標本と正則化経路](#prop-ml1-18-two-direction-fit)を、この問題の核・入力・応答へ適用する。未知点の予測は

$$
f_\lambda(x_*)=\frac2{4+2\lambda}+\frac1{1+2\lambda}.
$$

$\lambda=1/4$ では、二つの項をそれぞれ計算して

$$
f_{1/4}(x_*)=\frac49+\frac23=\frac{10}{9},\qquad
(1-f_{1/4}(x_*))^2=\frac1{81}.
$$

$\lambda=1/2$ では

$$
f_{1/2}(x_*)=\frac25+\frac12=\frac9{10},\qquad
(1-f_{1/2}(x_*))^2=\frac1{100}.
$$

$\lambda=1$ では

$$
f_1(x_*)=\frac13+\frac13=\frac23,\qquad
(1-f_1(x_*))^2=\frac19.
$$

三候補の誤差は $1/100<1/81<1/9$ なので、固定した候補集合と検証標本では $\lambda=1/2$ を選ぶ。一方、母集団予測リスクや独立テストの誤差までは確定しない。最終選択後には[独立テスト](../ML1-12/index.md#thm-ml1-12-independent-holdout)を別に実施する。
<!-- solution-end -->

### ML1-18-B04 線形核と係数による直接最小化の照合
- Level: B

$X=\operatorname{diag}(2,1)$、応答 $y=(2,1)$、線形核 $K(x,z)=x^{\mathsf T}z$、$\lambda=1/2$ とする。訓練点を $X$ の行として、カーネル係数 $\alpha$ と、[ML1-05のRidge回帰](../ML1-05/index.md#def-ml1-05-ridge)で特徴係数を直接最小化したときの $w$ をそれぞれ求め、両予測が一致することを確かめよ。切片は用いない。

<!-- solution-start -->
#### 詳細解答

訓練点は $X$ の二つの行 $(2,0),(0,1)$ である。したがって線形核のGram行列は

$$
G_{ij}=x_i^{\mathsf T}x_j,\qquad
G=XX^{\mathsf T}=\operatorname{diag}(4,1).
$$

$n\lambda=1$ なので、核側の係数は $\alpha_\lambda=(G+I_2)^{-1}y=(2/5,1/2)^{\mathsf T}$ となる。一方、[ML1-05のRidge回帰](../ML1-05/index.md#def-ml1-05-ridge)で特徴係数を直接求めると

$$
\begin{aligned}
X^{\mathsf T}X+I_2&=\operatorname{diag}(5,2),\\
X^{\mathsf T}y&=\begin{pmatrix}4\\1\end{pmatrix},\\
w&=(X^{\mathsf T}X+I_2)^{-1}X^{\mathsf T}y
=\begin{pmatrix}4/5\\1/2\end{pmatrix}.
\end{aligned}
$$

ここで $X^{\mathsf T}\alpha_\lambda=(4/5,1/2)^{\mathsf T}=w$。カーネル表示は訓練点の線形結合を係数に戻すので、任意の $x\in\mathbb R^2$ に対して

$$
f_\lambda(x)
=\sum_{i=1}^2\alpha_{\lambda,i}x_i^{\mathsf T}x
=(X^{\mathsf T}\alpha_\lambda)^{\mathsf T}x
=w^{\mathsf T}x
$$

となり、両者の予測は一致する。
<!-- solution-end -->

### ML1-18-C01 訓練誤差・核・検証・特異性の総合問題
- Level: C

訓練入力 $e_1,e_2$、応答 $(2,1)$、$n=2$、$\lambda=1/2$ とする。二つの核 $K_A(x,z)=4x_1z_1+x_2z_2$、$K_B(x,z)=x_1z_1+4x_2z_2$ はいずれも正半定値である。
1. 両核のGram行列、訓練予測、訓練残差平方和を求めよ。
2. 検証点 $(1/4,1)$ の応答が1であるとき、両核の検証平方誤差を比較し、訓練誤差だけで選ぶ場合との差を述べよ。
3. 別実験として、核を定数核 $K=1$、応答を $(1,-1)$ に変えたとき、$\lambda\downarrow0$ での係数と関数の極限が異なる理由を証明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** $K_A$ は特徴写像 $(2x_1,x_2)$、$K_B$ は $(x_1,2x_2)$ の内積なのでいずれも正半定値。$G_A=\operatorname{diag}(4,1)$、$G_B=\operatorname{diag}(1,4)$。$n\lambda=1$ を[解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)へ入れると

$$
\alpha_A=(2/5,1/2),\quad\widehat y_A=(8/5,1/2),\qquad
\alpha_B=(1,1/5),\quad\widehat y_B=(1,4/5).
$$

従って残差平方和は $R_A=(2-8/5)^2+(1-1/2)^2=4/25+1/4=41/100$、$R_B=(2-1)^2+(1-4/5)^2=1+1/25=26/25$。訓練残差はAの方が小さい。

**2.** 検証点での核ベクトルをそれぞれ計算すると $k_A=(1,1)$、$k_B=(1/4,4)$。予測は

$$
f_A(x_*)=(1,1)\cdot(2/5,1/2)=9/10,\qquad
f_B(x_*)=(1/4,4)\cdot(1,1/5)=1/4+4/5=21/20.
$$

検証平方誤差は $(1-9/10)^2=1/100$ と $(1-21/20)^2=1/400$。この検証点ではBが良い。訓練誤差による順位と逆転するのは、両核が未知点への外挿の仕方を変えるためである。最終性能は[ML1-12の独立テスト](../ML1-12/index.md#thm-ml1-12-independent-holdout)で再評価する。

**3.** 定数核で $G(1,-1)^{\mathsf T}=0$、$n=2$ である。[特異例](#prop-ml1-18-singular-example)から $\alpha_\lambda=(1,-1)/(2\lambda)$ なので係数ノルムは $\sqrt2/(2\lambda)\to\infty$。しかし全ての $x$ で $k(x)=(1,1)$ だから $f_\lambda(x)=0$、さらに $\|f_\lambda\|_{\mathcal H}^2=\alpha_\lambda^{\mathsf T}G\alpha_\lambda=0$。係数発散は予測関数の発散を意味しない。
<!-- solution-end -->

## まとめ

核回帰の予測には $G$ と $k(x)$ の役割の違いを押さえる。固定した核の下で $\lambda$ を増やすと訓練残差平方和は非減少、関数ノルムと有効自由度は非増加になるが、未知点の誤差について同じ単調性は出ない。特異Gram行列では零空間方向の係数が大きくなる場合もあるが、その方向は関数を変えない。したがってモデル選択は独立検証に基づき、最後の性能確認は未使用テストに分ける。
