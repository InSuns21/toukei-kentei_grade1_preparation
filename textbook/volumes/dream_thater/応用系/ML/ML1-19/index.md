# ML1-19 主成分分析・特異値分解・低ランク近似

特徴量が多いデータでも、観測点のばらつきが少数の方向へ集中することがある。[最小二乗法](../ML1-04/index.md#thm-ml1-04-existence-fit-uniqueness)は「与えた目的変数をどの列の組合せで説明するか」を考えた。ここでは目的変数を置かず、**データ自体を少数の方向から再構成する**。その際、平均位置とばらつく方向を混同しないために中心化を行い、[実特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)を標本へ適用する。

主成分分析（PCA）は、ばらつきを大きく保つ直交方向を選ぶ方法である。重要なのは、最大分散と最小二乗再構成誤差がなぜ同じ方向を選ぶのか、また特異値を幾つ捨てると損失が幾ら増えるのかを説明できることである。

## 1. 中心化と分散を行列にする

$n\ge2$ 個の観測 $x_1,\ldots,x_n\in\mathbb R^p$（$p\ge1$）を、**行が観測・列が特徴量**の行列 $A\in\mathbb R^{n\times p}$ に並べる。平均ベクトル $\bar x$ を引いた各行を $z_i^{\mathsf T}$ と書き、中心化行列を $X$ とする。平均を引くのは、例えば観測が $(100,1)$ と $(100,-1)$ なら、座標の大きな第1成分ではなく、第2成分だけが変動していると見抜くためである。各列の偏差を掛け合わせて標本全体で足せば、同じ特徴量の分散と、異なる特徴量が一緒に変動する共分散を一つの行列にまとめられる。

<a id="def-ml1-19-centered-data"></a>

<!-- formal-statement-start -->
> **定義（中心化標本行列と標本共分散行列）**  
> $A\in\mathbb R^{n\times p}$ の第 $i$ 行を $x_i^{\mathsf T}$ とし、$n\ge2$ とする。平均、中心化行列、標本共分散行列を

$$
\bar x=\frac1n\sum_{i=1}^n x_i,\qquad
X_{i\cdot}=(x_i-\bar x)^{\mathsf T},\qquad
C=\frac1{n-1}X^{\mathsf T}X\in\mathbb R^{p\times p}
$$

> で定める。$C_{jk}$ は第 $j,k$ 特徴量の偏差積和を $n-1$ で割った量である。
<!-- formal-statement-end -->

この $C$ は実対称であり、任意の $w\in\mathbb R^p$ について

$$
w^{\mathsf T}Cw=\frac1{n-1}\|Xw\|_2^2\ge0.
$$

ゆえに [半正定値の定義](../../../基礎科目/F0/F0-00F1/index.md#def-f0-00f1-positive-semidefinite) を満たす。$Xw$ の第 $i$ 成分は、中心化した観測を方向 $w$ に射影した座標 $z_i^{\mathsf T}w$ である。この中間式によって、行列の二次形式と「その方向の標本分散」が結び付く。

<!-- definition-example-start: def-ml1-19-centered-data -->
**定義の確認**：$x_1=(2,0)$、$x_2=(-2,0)$、$x_3=(0,1)$、$x_4=(0,-1)$ とする。$\sum_i x_i=(0,0)$ より $\bar x=0$、したがって

$$
X=\begin{pmatrix}2&0\\-2&0\\0&1\\0&-1\end{pmatrix},
\qquad
X^{\mathsf T}X=\begin{pmatrix}8&0\\0&2\end{pmatrix},
\qquad C=\begin{pmatrix}8/3&0\\0&2/3\end{pmatrix}.
$$

任意の $w=(a,b)^{\mathsf T}$ に対し $w^{\mathsf T}Cw=(8a^2+2b^2)/3\ge0$ となり、正半定値を直接確認できる。$w=e_1$ なら射影得点は $(2,-2,0,0)^{\mathsf T}$ で、標本分散は $(4+4)/3=8/3$。$n$ で割る規約を使う場合は固有ベクトルは変わらないが、固有値は $3/4$ 倍になる。
<!-- definition-example-end -->

## 2. 第一主成分は最もばらつく方向

原点からの距離の大きい方向を任意の倍率で選べば分散も無制限に増える。そこで方向ベクトルの長さを1に固定する。第1主成分の方向は、中心化データの射影得点の標本分散を最大にする単位ベクトルとする。複数方向を選ぶときは互いに直交させる。

正規直交な $q$ 本の方向 $w_1,\ldots,w_q$ を列に並べた行列を $W_q=(w_1,\ldots,w_q)$ とする。行列の跡 $\operatorname{tr}$ は対角成分の和を表すので、各方向の標本分散の合計は

$$
\operatorname{tr}(W_q^{\mathsf T}CW_q)
=\sum_{k=1}^q w_k^{\mathsf T}Cw_k
=\frac1{n-1}\sum_{k=1}^q\|Xw_k\|_2^2
$$

となる。この量を最大化するのは、各方向へ投影した偏差平方和をできるだけ多く残すためである。$q=0$ なら空和を0とする。

<a id="def-ml1-19-pca-loading"></a>

<!-- formal-statement-start -->
> **定義（主成分の方向・得点・再構成）**  
> $X\in\mathbb R^{n\times p}$ を中心化行列、$0\le q\le p$ とする。$W_q\in\mathbb R^{p\times q}$ の列が正規直交し、$\operatorname{tr}(W_q^{\mathsf T}CW_q)$ を最大にするとき、その列を $q$ 個の主成分方向（負荷ベクトル）とする。$q=0$ は列を持たない行列と約束する。対応する得点行列、元の尺度での再構成行列を

$$
T_q=XW_q,\qquad
\widehat A_q=\boldsymbol 1_n\bar x^{\mathsf T}+XW_qW_q^{\mathsf T}
$$

> と定める。$q=0$ では $\widehat A_0=\boldsymbol 1_n\bar x^{\mathsf T}$ とする。符号や、同じ固有値を持つ方向間の基底の選び方は一般には一意でない。
<!-- formal-statement-end -->

$W_qW_q^{\mathsf T}$ が選んだ部分空間への [直交射影](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-orthogonal-projection) である理由も確かめよう。$W_q^{\mathsf T}W_q=I_q$ より、この行列は対称で、その二乗は

$$
(W_qW_q^{\mathsf T})^2
=W_q(W_q^{\mathsf T}W_q)W_q^{\mathsf T}
=W_qW_q^{\mathsf T}.
$$

さらに任意の $z\in\mathbb R^p$ について

$$
W_q^{\mathsf T}(z-W_qW_q^{\mathsf T}z)
=W_q^{\mathsf T}z-I_qW_q^{\mathsf T}z=0
$$

となる。したがって残差は選んだ列空間の全方向に直交し、$W_qW_q^{\mathsf T}z$ は元の点からその空間に下ろした垂線の足になっている。$T_q$ の行は観測ごとの低次元座標であり、$\widehat A_q$ では平均を必ず戻す。

<!-- definition-example-start: def-ml1-19-pca-loading -->
**定義の確認**：先ほどの $C=\operatorname{diag}(8/3,2/3)$ に $q=1$ を適用する。$w=(a,b)$、$a^2+b^2=1$ に対し

$$
w^{\mathsf T}Cw=\frac83a^2+\frac23b^2
=\frac23+2a^2\le\frac83.
$$

最大値は $w=\pm e_1$ で達成される。$W_1=e_1$ を選ぶと $W_1^{\mathsf T}W_1=1$ で、得点と平均を戻した再構成は

$$
T_1=Xe_1=(2,-2,0,0)^{\mathsf T},
\qquad
\widehat A_1=
\begin{pmatrix}
2&0\\-2&0\\0&0\\0&0
\end{pmatrix}
$$

となる。ここでは平均が零なので $\widehat A_1=Xe_1e_1^{\mathsf T}$ である。残差には第2成分の $1,-1$ だけが残り、再構成平方誤差は $1^2+(-1)^2=2$。元の総偏差平方和は $8+2=10$ なので、保持分散比は $8/10=4/5$ である。
<!-- definition-example-end -->

<a id="thm-ml1-19-pca-spectral"></a>

<!-- formal-statement-start -->
> **定理（主成分分析と共分散の固有空間）**  
> $X\in\mathbb R^{n\times p}$ を中心化行列とし、$C=X^{\mathsf T}X/(n-1)$ とする。$C$ の固有値を $\lambda_1\ge\cdots\ge\lambda_p\ge0$、対応する正規直交固有ベクトルを $v_1,\ldots,v_p$ とすると、$0\le q\le p$ に対して $W_q=(v_1,\ldots,v_q)$ は主成分方向の条件を満たし、

$$
\max_{W^{\mathsf T}W=I_q}\operatorname{tr}(W^{\mathsf T}CW)
=\sum_{j=1}^q\lambda_j.
$$

> 特に $q=1$ では、第1主成分方向は最大固有値の固有ベクトルである。$1\le q<p$ で $\lambda_q=\lambda_{q+1}$ の場合、$q$ 次元の最適部分空間が一意とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)を正半定値行列 $C$ へ適用する。直交座標に移すと、保持できる分散は $\lambda_j$ の重み付き和となる。$q$ 個の方向は合計で $q$ 単位分の重みしか持てないので、大きい固有値から選ぶ。

<!-- proof-start -->
### 証明

$C=V\operatorname{diag}(\lambda_1,\ldots,\lambda_p)V^{\mathsf T}$、$V=(v_1,\ldots,v_p)$ とする。任意の列直交行列 $W\in\mathbb R^{p\times q}$ に対し $M=V^{\mathsf T}W$ と置くと $M^{\mathsf T}M=I_q$ である。$M$ の第 $j$ 行の長さの二乗を $t_j=\sum_{k=1}^q M_{jk}^2$ とすると、

$$
\operatorname{tr}(W^{\mathsf T}CW)=
\sum_{k=1}^q\sum_{j=1}^p\lambda_jM_{jk}^2
=\sum_{j=1}^p\lambda_jt_j.
$$

$W W^{\mathsf T}$ は直交射影だから $0\le t_j=\|W^{\mathsf T}v_j\|_2^2\le\|v_j\|_2^2=1$。さらに

$$
\sum_{j=1}^pt_j=\operatorname{tr}(M^{\mathsf T}M)=q.
$$

$q=0$ の場合は両辺0、$q=p$ の場合は全固有値の和である。$1\le q<p$ の場合は $\lambda_q$ を境界に用いると、

$$
\sum_{j=1}^p\lambda_jt_j
=\lambda_q q+\sum_{j=1}^p(\lambda_j-\lambda_q)t_j
\le\lambda_q q+\sum_{j=1}^q(\lambda_j-\lambda_q)
=\sum_{j=1}^q\lambda_j.
$$

ここで $j\le q$ では係数が非負で $t_j\le1$、$j>q$ では係数が非正で $t_j\ge0$ を使った。$W=(v_1,\ldots,v_q)$ なら $t_j=1$（$j\le q$）、それ以外は0となり等号を達成する。$\square$
<!-- proof-end -->

符号を反転しても射影空間は同じである。また、同一の固有値に対応する複数の直交軸は回転できる。PCAが必ず一意の「第1の向き」を発見するわけではない。

## 3. 特異値と再構成平方誤差

$X$ を入力から出力への線形写像とみなすと、[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)は

$$
X=U_r\operatorname{diag}(s_1,\ldots,s_r)V_r^{\mathsf T}
=\sum_{j=1}^r s_ju_jv_j^{\mathsf T},
\qquad s_1\ge\cdots\ge s_r>0
$$

と書く。$r=\operatorname{rank}X$、$u_j\in\mathbb R^n$、$v_j\in\mathbb R^p$ はそれぞれ正規直交である。$X^{\mathsf T}Xv_j=s_j^2v_j$ を代入すると、$C$ の非零固有値は $s_j^2/(n-1)$ である。したがって主成分方向は右特異ベクトル、得点は $Xv_j=s_ju_j$ である。

再構成精度を数えるために、行列の各成分の平方を合計した量を使う。

<a id="def-ml1-19-frobenius-error"></a>

<!-- formal-statement-start -->
> **定義（Frobeniusノルムと保持分散比）**  
> 実行列 $B=(B_{ij})\in\mathbb R^{n\times p}$ のFrobeniusノルムを

$$
\|B\|_F^2=\sum_{i=1}^n\sum_{k=1}^p B_{ik}^2
=\operatorname{tr}(B^{\mathsf T}B)
$$

> とする。中心化行列 $X\in\mathbb R^{n\times p}$ が $X\ne0$ で、階数を $r=\operatorname{rank}X\ge1$、正の特異値を $s_1\ge\cdots\ge s_r>0$ とする。$0\le q\le p$ 個の主成分を保持したとき、保持分散比を

$$
\rho_q=\frac{\sum_{j=1}^{\min(q,r)}s_j^2}{\|X\|_F^2}
$$

> と定める。$X=0$ のとき比 $\rho_q$ は定義せず、再構成誤差はすべて0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-19-frobenius-error -->
**定義の確認**：第1節の $X$ は非零で、成分の平方和と積行列の対角成分の和はともに

$$
\|X\|_F^2=2^2+(-2)^2+1^2+(-1)^2
=8+2=\operatorname{tr}(X^{\mathsf T}X)=10
$$

である。$X^{\mathsf T}X=\operatorname{diag}(8,2)$ だから、[特異値の定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors) より $s_1=2\sqrt2$、$s_2=\sqrt2$。したがって

$$
\rho_1=\frac{s_1^2}{s_1^2+s_2^2}
=\frac8{8+2}=\frac45.
$$

$q=0$ では保持比0、$q=2$ では1である。$X=0$ なら分母も0になるため、比を無理に $0/0$ と計算しない。
<!-- definition-example-end -->

<a id="thm-ml1-19-pca-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（主成分再構成と捨てた特異値）**  
> $X\in\mathbb R^{n\times p}$ を中心化行列とし、階数を $r$、正の特異値を $s_1\ge\cdots\ge s_r>0$ とする。$0\le q\le p$ として、上位 $q$ 個の右特異ベクトルの張る空間への射影を $P_q$ とする（$q\ge r$ では零特異値方向を任意に補う）。このとき

$$
X P_q=\sum_{j=1}^{\min(q,r)}s_ju_jv_j^{\mathsf T},
\qquad
\|X-XP_q\|_F^2=\sum_{j=q+1}^{r}s_j^2.
$$

> 空和は0とする。したがって $\rho_q=1-\|X-XP_q\|_F^2/\|X\|_F^2$ が $X\ne0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

上位の右特異ベクトルだけを通すと、SVDの和から下位の項が消える。異なる $u_jv_j^{\mathsf T}$ はFrobenius内積で直交するため、誤差の平方は捨てた特異値の二乗和になる。

<!-- proof-start -->
### 証明

[実特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)により、$P_qv_j=v_j$（$j\le q$）、$P_qv_j=0$（$q<j\le r$）である。よって

$$
X-XP_q=\sum_{j=q+1}^r s_ju_jv_j^{\mathsf T}.
$$

行列成分ごとに内積を取ると、$j,k$ に対応する二項について

$$
\operatorname{tr}\bigl((u_jv_j^{\mathsf T})^{\mathsf T}
(u_kv_k^{\mathsf T})\bigr)
=(u_j^{\mathsf T}u_k)(v_j^{\mathsf T}v_k)
=\begin{cases}1&j=k,\\0&j\ne k.\end{cases}
$$

したがって平方ノルムで交差項がすべて消え、$\|X-XP_q\|_F^2=\sum_{j=q+1}^rs_j^2$。同じ計算を $X$ 自体へ適用すると $\|X\|_F^2=\sum_{j=1}^rs_j^2$ なので保持分散比の式も従う。$\square$
<!-- proof-end -->

## 4. PCAは最良の低ランク近似にもなる

主成分の再構成は $XP_q$ という階数が高々 $q$ の行列である。しかし、もっと自由に任意の階数 $q$ 以下の行列 $B$ を選べば、さらに誤差を小さくできるかもしれない。この問いに答えるのが次の結果である。

<a id="thm-ml1-19-eckart-young"></a>

<!-- formal-statement-start -->
> **定理（Frobenius誤差に対する最良低ランク近似）**  
> $X\in\mathbb R^{n\times p}$ の特異値を $s_1\ge\cdots\ge s_r>0$ とし、$r=\operatorname{rank}X$ とする。整数 $0\le q\le\min(n,p)$ に対し、

$$
\min_{\operatorname{rank}(B)\le q}\|X-B\|_F^2
=\sum_{j=q+1}^{r}s_j^2.
$$

> 最小値は、上位 $q$ 項を保持した打切り特異値分解 $X_q=\sum_{j=1}^{\min(q,r)}s_ju_jv_j^{\mathsf T}$ で達成される。$q\ge r$ なら $X_q=X$ である。
<!-- formal-statement-end -->

### 証明の見取り図

候補 $B$ の列空間への直交射影 $P$ を考えると、各列に対して $PB$ は $B$ 自身なので、$X-B$ には $P$ から外れた成分 $(I-P)X$ が必ず含まれる。$P$ の階数が $q$ 以下である以上、$XX^{\mathsf T}$ の上位 $q$ 固有値の和より多くの平方長を保持できない。これは第2節の重み付き和と同じ仕組みである。

<!-- proof-start -->
### 証明

$B$ を階数が高々 $q$ の任意の実行列とし、$B$ の列空間 $\operatorname{Im}B\subseteq\mathbb R^n$ への直交射影を $P$ とする。[直交射影の構成](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-orthogonal-projection)から、$P^2=P=P^{\mathsf T}$、$\operatorname{rank}P=\operatorname{rank}B\le q$、$PB=B$ である。行列を列ごとに直交分解すると

$$
X-B=P(X-B)+(I-P)(X-B)
=(PX-B)+(I-P)X.
$$

二項の各列は直交し、Frobeniusノルムの平方について

$$
\|X-B\|_F^2=\|PX-B\|_F^2+\|(I-P)X\|_F^2
\ge\|(I-P)X\|_F^2.
$$

さらに $P$ の直交性から

$$
\|(I-P)X\|_F^2=\|X\|_F^2-\|PX\|_F^2.
$$

$X=\sum_{j=1}^r s_ju_jv_j^{\mathsf T}$ を $PX$ に代入する。右特異ベクトルの直交性によって交差項が消えるため、

$$
\|PX\|_F^2=\sum_{j=1}^r s_j^2\|Pu_j\|_2^2
$$

となる。$t_j=\|Pu_j\|_2^2$ と置くと、直交射影は長さを増やさないので $0\le t_j\le1$。さらに $u_1,\ldots,u_r$ を $\mathbb R^n$ の正規直交基底 $u_1,\ldots,u_n$ まで延長すると、

$$
\sum_{j=1}^r t_j
\le\sum_{j=1}^n\|Pu_j\|_2^2
=\sum_{j=1}^n u_j^{\mathsf T}Pu_j
=\operatorname{tr}P
=\operatorname{rank}P\le q.
$$

最後の等号では、$P^2=P=P^{\mathsf T}$ に [実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral) を適用した。$P$ の固有値は0または1であり、その1の個数が像の次元なので、跡は階数に等しい。

$0<q<r$ なら、$s_q^2$ を境界として、$j>q$ の係数が非正となることから

$$
\sum_{j=1}^r s_j^2t_j
\le s_q^2q+\sum_{j=1}^q(s_j^2-s_q^2)
=\sum_{j=1}^q s_j^2.
$$

$q=0$ なら $P=0$ なので保持平方長は0である。$q\ge r$ なら $\|PX\|_F^2\le\|X\|_F^2=\sum_{j=1}^r s_j^2$。したがって全場合で

$$
\|X-B\|_F^2\ge\|X\|_F^2-\sum_{j=1}^{\min(q,r)}s_j^2
=\sum_{j=q+1}^rs_j^2.
$$

[主成分再構成と捨てた特異値](#thm-ml1-19-pca-reconstruction)により、$B=X_q$ が右辺を達成する。$\square$
<!-- proof-end -->

この定理は**Frobenius誤差と階数制約**についての主張である。未知データに対する予測誤差や、特徴量の意味の保存を自動的に保証するものではない。

## 5. 退化・中心化漏れ・検証の注意

**固有値の重複**：$X^{\mathsf T}X=4I_2$ なら任意の単位ベクトルの分散は同じである。$q=1$ では任意の軸が最適で、どれを返すかは数値計算の選択に依存する。壊れているのは「唯一の軸を推定できる」という期待であり、最小誤差が定まらないわけではない。

**中心化漏れ**：二点 $(10,1),(10,-1)$ なら中心化後の行は $(0,1),(0,-1)$ なので、PCAの方向は $e_2$。一方、中心化前の $A^{\mathsf T}A=\operatorname{diag}(200,2)$ の最大固有方向は $e_1$ である。平均が巨大であることを変動の大きさと誤認したのであり、中心化を忘れると別の最適化問題になる。

**ゼロ分散**：全点が同じなら $X=0$ である。全特異値は0、どんな主成分方向も最適となり、再構成は常に平均点。保持分散比は分母0なので未定義である。

**未知データへの適用**：観測を訓練・検証へ分ける場合、平均 $\bar x$ と主成分方向は訓練データだけから推定する。検証点 $x_*$ の得点は $W_q^{\mathsf T}(x_*-\bar x)$、再構成は $\bar x+W_qW_q^{\mathsf T}(x_*-\bar x)$。検証データを使って平均や方向を再推定すると情報漏洩になる。[分割・前処理漏洩の議論](../ML1-12/index.md#thm-ml1-12-independent-holdout)と同じ問題である。訓練再構成誤差が $q$ とともに下がっても、独立した未知分布での汎化が保証されるわけではない。

## 6. 計算ラボ：軸と保持次元を動かす

下のPythonは $n=4,p=2$ の固定例を中心化し、SVDによる得点と再構成を計算する。保持次元 $q$ を0・1・2へ、また $A$ の行を別の点群へ変えて再実行できる。出力する誤差は訓練標本のFrobenius誤差であり、未知分布の誤差ではない。

~~~python
import numpy as np

A = np.array([[2., 0.], [-2., 0.], [0., 1.], [0., -1.]])
q = 1  # 0, 1, 2
assert A.ndim == 2 and A.shape[0] >= 2
n, p = A.shape
assert 0 <= q <= p
mean = A.mean(axis=0)
X = A - mean
U, s, VT = np.linalg.svd(X, full_matrices=False)
# q > min(n,p) のときは零特異値方向を使わなくても再構成は同じ
k = min(q, len(s))
scores = X @ VT[:k].T
recovered = mean + scores @ VT[:k]
total = np.sum(X ** 2)
error = np.sum((A - recovered) ** 2)
theory = np.sum(s[k:] ** 2)
print("mean", mean, "singular values", s)
print("q", q, "scores", scores, "recovered", recovered)
print("Frobenius error", error, "discarded spectrum", theory)
print("explained ratio", None if total == 0 else 1 - error / total)
assert np.allclose(error, theory, atol=1e-10)
~~~

$A$ を原点から平行移動しても $X$ と特異値は変わらず、復元結果が同じだけ移動する。対して、中心化処理を消すと数値が変わる。$q=1$ で誤差2、$q=0$ で10、$q=2$ で0となることを確かめられる。ここでの計算は[最良低ランク近似定理](#thm-ml1-19-eckart-young)の例示であり、数値一致だけで一般定理を証明したわけではない。

## 7. 演習

### ML1-19-A01 平均と中心化を一から計算する
- Level: A

観測 $(1,1),(3,1)$ の平均、中心化行列、標本共分散行列、第一主成分の単位方向、得点と一方向再構成を求めよ。

<!-- solution-start -->
#### 詳細解答

$n=2$ で平均は $\bar x=((1+3)/2,(1+1)/2)=(2,1)$。偏差は $(-1,0),(1,0)$ なので

$$
X=\begin{pmatrix}-1&0\\1&0\end{pmatrix},
\quad X^{\mathsf T}X=\begin{pmatrix}2&0\\0&0\end{pmatrix},
\quad C=\frac{X^{\mathsf T}X}{2-1}=\operatorname{diag}(2,0).
$$

[主成分分析と共分散の固有空間](#thm-ml1-19-pca-spectral)から第一方向は $e_1$（符号反転も可）。得点は $Xe_1=(-1,1)^{\mathsf T}$、復元は平均 $(2,1)$ に得点倍の $e_1$ を加え、元の二点に一致する。残差平方和は0である。
<!-- solution-end -->

### ML1-19-A02 分散と特異値の倍率
- Level: A

中心化された四標本の行列 $X=\begin{pmatrix}3&0\\0&2\\0&-2\\-3&0\end{pmatrix}$ に対し、標本共分散の固有値、特異値、$q=1$ の保持分散比と再構成誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

各列の和は0で中心化済み。$X^{\mathsf T}X=\operatorname{diag}(18,8)$、$n-1=3$ なので $C=\operatorname{diag}(6,8/3)$ である。固有値は $6,8/3$。[特異値の定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-singular-values-right-vectors) に $C=X^{\mathsf T}X/(n-1)$ を代入すると $s_j^2=(n-1)\lambda_j$ となるから、

$$
s_1=\sqrt{3\cdot6}=3\sqrt2,\qquad
s_2=\sqrt{3\cdot(8/3)}=2\sqrt2.
$$

[再構成定理](#thm-ml1-19-pca-reconstruction)から第一方向 $e_1$ を残すと再構成平方誤差は捨てた $s_2^2=8$、保持分散比は $18/(18+8)=9/13$ である。
<!-- solution-end -->

### ML1-19-A03 保持次元が0・全次元の場合
- Level: A

中心化行列 $X=\begin{pmatrix}1&0\\-1&0\end{pmatrix}$ に対し $q=0,1,2$ の再構成平方誤差と保持分散比を求めよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(2,0)$ なので、正の特異値は $\sqrt2$ が1個で階数は1。総平方和は2である。$q=0$ は零行列へ近似し誤差2、保持比0。$q=1$ で $e_1$ を保持すると $X$ がそのまま復元されるため誤差0、保持比1。$q=2$ も誤差0、保持比1。第2方向の固有値は0であるため、次元を増やしても改善しない。
<!-- solution-end -->

### ML1-19-A04 第一軸を特異値の順番で選ぶ
- Level: A

$X=\begin{pmatrix}1&0\\0&2\\-1&0\\0&-2\end{pmatrix}$ で最大特異値の右特異ベクトルを求め、$q=1$ の復元行列と誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(2,8)$ なので、特異値は大きい順に $2\sqrt2,\sqrt2$、対応する右特異ベクトルは $e_2,e_1$。第1方向へ射影する行列は $e_2e_2^{\mathsf T}=\operatorname{diag}(0,1)$ なので

$$
Xe_2e_2^{\mathsf T}=
\begin{pmatrix}0&0\\0&2\\0&0\\0&-2\end{pmatrix}.
$$

捨てた第1列は $(1,0,-1,0)^{\mathsf T}$、その平方長は $1+1=2$。小さい方の特異値の二乗 $s_2^2=2$ と一致する。
<!-- solution-end -->

### ML1-19-B01 同じ固有値と軸の非一意性
- Level: B

中心化行列 $X=\begin{pmatrix}1&1\\-1&-1\\1&-1\\-1&1\end{pmatrix}$ に対し、$X^{\mathsf T}X$ を計算し、任意の単位方向が $q=1$ の最適主成分となること、および最小再構成平方誤差を証明せよ。

<!-- solution-start -->
#### 詳細解答

2列の平方和はそれぞれ4で、内積は $1+1-1-1=0$。従って、共分散を作る前の積行列は

$$
X^{\mathsf T}X=4I_2
$$

となる。標本数は4なので、標本共分散行列は $C=(4/3)I_2$ である。任意の単位方向 $w=(a,b)^{\mathsf T}$ は $a^2+b^2=1$ を満たすから、

$$
w^{\mathsf T}Cw=\frac43(a^2+b^2)=\frac43.
$$

従って、[主成分分析と共分散の固有空間](#thm-ml1-19-pca-spectral)の最大値をすべての方向が達成する。特異値は両方2である。[最良低ランク近似](#thm-ml1-19-eckart-young)により、1方向だけを残す場合の再構成平方誤差は、捨てた特異値の二乗 $2^2=4$ となる。最適値は一定でも最適軸は一意でない。
<!-- solution-end -->

### ML1-19-B02 最良近似の下界を再構成する
- Level: B

実行列 $X$ の正の特異値が $s_1=3,s_2=2$ で、それ以外は0とする。階数1以下のどの行列 $B$ も $\|X-B\|_F^2\ge4$ を満たすことを、列空間への射影 $P$ を使って示せ。等号を達成する行列も書け。

<!-- solution-start -->
#### 詳細解答

$P$ を $\operatorname{Im}B$ への直交射影とすると $PB=B$、$\operatorname{rank}P\le1$。[直交射影](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-orthogonal-projection)では $P^{\mathsf T}=P$ と $P^2=P$ が成り立つ。$P(I-P)=P-P^2=0$ より、$PX-B$ の各列は $(I-P)X$ の対応する列と垂直である。そこで各列の平方ノルムを加えると

$$
\|X-B\|_F^2=\|PX-B\|_F^2+\|(I-P)X\|_F^2
\ge\|X\|_F^2-\|PX\|_F^2.
$$

左特異ベクトル $u_1,u_2$ に対し $t_i=\|Pu_i\|^2$ は非負で $t_1+t_2\le\operatorname{rank}P\le1$。そこで

$$
\|PX\|_F^2=9t_1+4t_2
\le9(t_1+t_2)\le9.
$$

$\|X\|_F^2=9+4=13$ なので下界は $13-9=4$。$B=3u_1v_1^{\mathsf T}$ を選べば $X-B=2u_2v_2^{\mathsf T}$ となり、誤差平方は4で等号になる。
<!-- solution-end -->

### ML1-19-B03 中心化を省いた場合の誤選択
- Level: B

二点 $(10,1),(10,-1)$ を使い、中心化前後の第1固有方向を比較せよ。誤差最小化の対象がどう変わったのかを説明せよ。

<!-- solution-start -->
#### 詳細解答

観測行列 $A=\begin{pmatrix}10&1\\10&-1\end{pmatrix}$ の平均は $(10,0)$。中心化行列 $X=\begin{pmatrix}0&1\\0&-1\end{pmatrix}$ なので $X^{\mathsf T}X=\operatorname{diag}(0,2)$、真の変動方向は $e_2$ である。しかし $A^{\mathsf T}A=\operatorname{diag}(200,2)$ を対角化すると最大固有方向は $e_1$ になる。未中心化の射影は「原点からの平方距離」を近似するため、平行移動しただけの大きな平均を優先する。一方PCAは平均 $\bar x$ を別に保持し、偏差 $x_i-\bar x$ の平方再構成誤差を最小化する。第1主成分の意味が異なるので中心化は単なる数値上の好みではない。
<!-- solution-end -->

### ML1-19-B04 回転した主成分で各点を復元する
- Level: B

中心化標本 $X=\begin{pmatrix}1&0\\0&1\\-1&-1\end{pmatrix}$ の第1主成分方向、得点、三点の一方向再構成、再構成平方誤差を計算せよ。

<!-- solution-start -->
#### 詳細解答

列和は0で中心化されている。積は

$$
X^{\mathsf T}X=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

この行列を二つの独立な方向へ作用させると、

$$
\begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix}
=3\begin{pmatrix}1\\1\end{pmatrix},
\qquad
\begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix}.
$$

このため固有値は $3,1$、最大固有値の単位固有ベクトルは $v_1=(1,1)^{\mathsf T}/\sqrt2$ である。得点 $Xv_1=(1/\sqrt2,1/\sqrt2,-\sqrt2)^{\mathsf T}$ だから、各得点へ $v_1^{\mathsf T}$ を掛けて

$$
Xv_1v_1^{\mathsf T}=
\begin{pmatrix}
1/2&1/2\\
1/2&1/2\\
-1&-1
\end{pmatrix}.
$$

残差の行は $(1/2,-1/2),(-1/2,1/2),(0,0)$。その平方和は $1/4+1/4+1/4+1/4=1$。捨てた特異値は $\sqrt1=1$ なので、[再構成定理](#thm-ml1-19-pca-reconstruction)の値とも一致する。
<!-- solution-end -->

### ML1-19-C01 平均の復元・軸選択・検証の総合問題
- Level: C

訓練データを $(3,1),(1,1),(2,3),(2,-1)$ とし、保持次元の候補を $q\in\{0,1,2\}$ とする。
1. 訓練平均、中心化行列、共分散の固有値と特異値を求めよ。
2. $q=1$ の主成分方向・訓練再構成点・平方誤差・保持分散比を求めよ。$q=0,2$ の訓練誤差も求めよ。
3. 未使用の検証点 $x_*=(4,1)$ に対し、訓練時の平均・軸を固定したまま各 $q$ の再構成平方誤差を求めよ。検証点を主成分の再推定に使ってはならない理由と、選ばれた $q$ について言える範囲を述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $\bar x=((3+1+2+2)/4,(1+1+3-1)/4)=(2,1)$。従って

$$
X=\begin{pmatrix}1&0\\-1&0\\0&2\\0&-2\end{pmatrix},
\quad X^{\mathsf T}X=\operatorname{diag}(2,8),
\quad C=\operatorname{diag}(2/3,8/3).
$$

共分散の固有値は大きい順に $8/3,2/3$、特異値は $2\sqrt2,\sqrt2$ である。

**2.** 第1方向は $e_2$ で、得点は $(0,0,2,-2)^{\mathsf T}$。平均を戻した再構成点は $(2,1),(2,1),(2,3),(2,-1)$。最初の二点の $x$ 座標の残差が $1,-1$ なので誤差平方は $1+1=2$。保持分散比は $8/(8+2)=4/5$。[捨てた特異値の定理](#thm-ml1-19-pca-reconstruction)では $s_2^2=2$ と一致する。$q=0$ は全点を平均で置き換えて誤差 $2+8=10$、$q=2$ は全て再構成して誤差0となる。

**3.** 検証点の訓練平均からの偏差は $x_*-\bar x=(2,0)$。前問で求めた訓練平均と主成分方向は変更せず、保持次元ごとの復元点を比較する。

- $q=0$：平均だけを残すので復元点は $(2,1)$、平方誤差は $2^2=4$。
- $q=1$：第1主成分方向 $e_2$ への射影得点は0。復元点は $(2,1)$ のままで、平方誤差は4。
- $q=2$：偏差 $(2,0)$ を全て保持する。復元点は元の $(4,1)$ となり、平方誤差は0。

したがって、この検証点と候補集合に対しては $q=2$ が最良である。しかし検証点込みで平均や固有ベクトルを求め直すと、評価対象の点の情報を再構成規則の学習に使ってしまう。[独立テストの原則](../ML1-12/index.md#thm-ml1-12-independent-holdout)に照らし、この一点で選ばれた次元が母集団でも最適だとは言えない。
<!-- solution-end -->

## まとめ

中心化したデータの右特異ベクトルが主成分方向であり、特異値の二乗が保持・破棄する偏差平方和を表す。主成分を $q$ 個残す射影再構成は、全ての階数 $q$ 以下の行列の中でもFrobenius誤差を最小にする。ただし、軸の一意性、保持分散比の定義可能性、中心化の規約、未知データでの性能は別々に判断する。次章のクラスタリングでは、連続した直交方向による要約ではなく、各点を有限個の群に割り当てる要約を扱う。
