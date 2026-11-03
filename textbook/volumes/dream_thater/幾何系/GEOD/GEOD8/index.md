# GEOD8 測量網の平差・datum の拘束・不確かさ

[GEOD7の観測方程式](../GEOD7/index.md#def-geod7-observation-equation)では、読値と未知の位置・高さの関係を、偶然誤差・系統偏りと区別して表しました。[水準閉路の閉合差](../GEOD7/index.md#def-geod7-level-closure)も一般には零になりません。では、食い違う複数の観測から一組の座標をどう選び、その精度をどう説明するのでしょうか。

**平差**では、観測ごとの不確かさを考慮して食い違いを配分します。一方、距離のみを測った三角形は平行移動・回転しても読値が変わりません。**観測から決まる形と、座標の基準をどこに置くかは別の問題**です。本章では次を紙上で追います。

1. 距離などの非線形観測式の Jacobian を作り、一次近似する。
2. 共分散から重みを定め、最小二乗解と残差を導出する。
3. datum の不足を行列の核で示し、外部基準・自由網の拘束を区別する。
4. 高低差の閉路を数値平差し、共分散・平面精度の方向差・残差診断を計算する。

水平座標の例は[GEOD5の局所 ENU](../GEOD5/index.md#def-geod5-enu)、高さの例は[GEOD6の正標高の基準](../GEOD6/index.md#def-geod6-orthometric-height)を揃えた短距離近似に限ります。観測に未補正の系統偏りがあれば、後の平均零モデルは成立しません。

<!-- definition-example-audit: strict -->

---

## 1. 観測式の線形化：なぜ Jacobian を作るか

ある基準点から新点までの水平距離の理想値は $f(x,y)=\sqrt{x^2+y^2}$ です。暫定位置 $(3,4)$ mでの予測は5 mですが、実測が5.010 mなら、新点を東へ動かすか北へ動かすかは観測一本からは決まりません。偏微分を計算すると、座標の小さな修正が予測距離をどれだけ変えるかが分かります。

既知補正を引いた $m$ 個の観測値を $\boldsymbol l\in\mathbb R^m$、未知パラメータを $\boldsymbol x\in U\subset\mathbb R^n$、その理想的予測を微分可能な $\boldsymbol f:U\to\mathbb R^m$ とします。暫定値 $\boldsymbol x_0\in U$ を定め、修正量を $\boldsymbol\delta=\boldsymbol x-\boldsymbol x_0$ と書きます。$j$ 番目の観測が未知量 $x_k$ の変化でどれだけ動くかを並べた $m\times n$ 行列が設計行列です。

<a id="def-geod8-linearization"></a>
<!-- formal-statement-start -->
> **定義（線形化した観測方程式）**
> $\boldsymbol f:U\subset\mathbb R^n\to\mathbb R^m$ が $\boldsymbol x_0\in U$ で微分可能であるとき、観測差 $\boldsymbol b=\boldsymbol l-\boldsymbol f(\boldsymbol x_0)$、設計行列 $A$、残差 $\boldsymbol v$ を

$$
A_{jk}=\left.\frac{\partial f_j}{\partial x_k}\right|_{\boldsymbol x_0},
\qquad \boldsymbol v=A\boldsymbol\delta-\boldsymbol b
$$

> と定める。一次の線形化観測方程式は $\boldsymbol b=A\boldsymbol\delta+\boldsymbol\varepsilon$ であり、厳密な関数は

$$
\boldsymbol f(\boldsymbol x_0+\boldsymbol\delta)
=\boldsymbol f(\boldsymbol x_0)+A\boldsymbol\delta+o(\|\boldsymbol\delta\|)
$$

> を満たす。$\boldsymbol\varepsilon$ は偶然誤差で、系統偏りは既に補正したと仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod8-linearization -->
**定義の確認**。 $f(x,y)=\sqrt{x^2+y^2}$ は $(3,4)$ で微分可能です。連鎖律から $\partial f/\partial x=x/f$、$\partial f/\partial y=y/f$ となるため、暫定点で $A=(3/5,\ 4/5)$、観測差は $b=5.010-5=0.010$ mです。一次式は

$$
0.010=\frac35\delta_x+\frac45\delta_y+\varepsilon.
$$

$(\delta_x,\delta_y)=(0.006,0.008)$ mとすると右辺の予測差は $0.0036+0.0064=0.010$ mで、残差0です。一方 $A(4,-3)^{\mathsf T}=0$ なので、その方向への小修正は一次では読値を変えません。1行2列の行列は階数1であり、これだけで位置を一意に決定できません。
<!-- definition-example-end -->

近似点から遠く離れた推定に一回の一次化を使い続けてはいけません。得られた $\widehat{\boldsymbol\delta}$ を暫定座標に加え、観測式と Jacobian を更新して反復します。二階連続微分可能なら局所の打切り誤差は $O(\|\boldsymbol\delta\|^2)$ ですが、反復収束は保証されません。最後は**元の非線形式で**残差を再計算します。水平角を含む場合には一周の折返しを済ませ、角度の微分にはラジアンを使います。

---

## 2. 重み付き最小二乗の式を出発点から導く

同じ長さを $1.000$ mと $1.040$ mと測った場合、両者の標準偏差が $0.020$ mと $0.040$ mなら、単純平均より前者に寄せた値が望まれます。「標準偏差の逆数」でなく「**分散の逆数**」を使う理由は、二乗誤差を各測定のばらつきの二乗で割るためです。

偶然誤差 $\boldsymbol\varepsilon$ に平均0と有限な二次モーメントがあると仮定します。ここでは [F0-00P2A の二次モーメント](../../../解析系/F0/F0-00P2A/index.md#def-f0-00p2a-moment)と [F0-00P3 の共分散](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を用います。共分散行列 $\Sigma$ の対角成分は各観測の分散、非対角成分は観測間の共分散です。独立なら非対角成分は零ですが、器械や環境を共有すれば相関を考慮します。

<a id="def-geod8-weight"></a>
<!-- formal-statement-start -->
> **定義（観測共分散と重み行列）**
> 誤差 $\boldsymbol\varepsilon\in\mathbb R^m$ の平均が0、共分散 $\Sigma=E[\boldsymbol\varepsilon\boldsymbol\varepsilon^{\mathsf T}]$ が対称正定値であるとする。基準分散 $\sigma_0^2>0$ と正定値行列 $Q$ により $\Sigma=\sigma_0^2Q$ と分け、

$$
P=Q^{-1}=\sigma_0^2\Sigma^{-1}
$$

> を重み行列とする。独立観測で標準偏差 $\sigma_j>0$ なら $P_{jj}=\sigma_0^2/\sigma_j^2$、非対角成分は零となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod8-weight -->
**定義の確認**。 二つの観測の誤差が独立、標準偏差が $(0.020,0.040)$ m、$\sigma_0=0.020$ mの場合、

$$
\Sigma=\begin{pmatrix}0.0004&0\\0&0.0016\end{pmatrix}\ \mathrm m^2,\quad
Q=\begin{pmatrix}1&0\\0&4\end{pmatrix},\quad
P=\begin{pmatrix}1&0\\0&1/4\end{pmatrix}.
$$

対角要素が正で $\det Q=4>0$ なので逆行列は存在し、精度が高い第1観測の重みは第2観測の4倍です。全重みを同じ正数倍しても最小位置は変わりませんが、推定共分散には元の $\sigma_0$ の尺度が必要です。
<!-- definition-example-end -->

[線形化した観測式](#def-geod8-linearization)の残差 $\boldsymbol v=A\boldsymbol\delta-\boldsymbol b$ について、$S(\boldsymbol\delta)=\boldsymbol v^{\mathsf T}P\boldsymbol v$ を小さくします。別単位の観測（距離m・角度rad）が混在する場合も、**その単位に対応する共分散**を使う必要があります。

<a id="thm-geod8-weighted-normal"></a>
<!-- formal-statement-start -->
> **定理（重み付き最小二乗と正規方程式）**
> $A\in\mathbb R^{m\times n}$ が列階数 $n$（$m\ge n$）を持ち、$P\in\mathbb R^{m\times m}$ は対称正定値であるとする。$S(\boldsymbol\delta)=(A\boldsymbol\delta-\boldsymbol b)^{\mathsf T}P(A\boldsymbol\delta-\boldsymbol b)$ を最小化する解は一意であり、$N=A^{\mathsf T}PA$、$\boldsymbol u=A^{\mathsf T}P\boldsymbol b$ と置くと

$$
N\widehat{\boldsymbol\delta}=\boldsymbol u,\qquad
\widehat{\boldsymbol\delta}=N^{-1}\boldsymbol u
$$

> を満たす。この**正規方程式**の行列 $N$ は対称正定値である。
<!-- formal-statement-end -->

**証明の見取り図。** 二乗式を展開して微分し、正規方程式を得ます。さらに解からずらしたときの二乗和の増加を計算して、一意の最小値であると確かめます。

<!-- proof-start -->
### 証明

$P=P^{\mathsf T}$ より

$$
S(\boldsymbol\delta)
=\boldsymbol\delta^{\mathsf T}N\boldsymbol\delta
-2\boldsymbol\delta^{\mathsf T}\boldsymbol u+\boldsymbol b^{\mathsf T}P\boldsymbol b.
$$

第 $k$ 成分で微分すれば $\partial S/\partial\delta_k=2(N\boldsymbol\delta-\boldsymbol u)_k$ です。非零 $\boldsymbol h\in\mathbb R^n$ では列階数の仮定から $A\boldsymbol h\ne0$、したがって

$$
\boldsymbol h^{\mathsf T}N\boldsymbol h
=(A\boldsymbol h)^{\mathsf T}P(A\boldsymbol h)>0.
$$

よって $N$ は正定値で可逆です。正規方程式の唯一の解 $\widehat{\boldsymbol\delta}$ について $\boldsymbol r=A\widehat{\boldsymbol\delta}-\boldsymbol b$ とすれば $A^{\mathsf T}P\boldsymbol r=0$。任意の $\boldsymbol h$ に対し

$$
\begin{aligned}
S(\widehat{\boldsymbol\delta}+\boldsymbol h)
&=(\boldsymbol r+A\boldsymbol h)^{\mathsf T}P(\boldsymbol r+A\boldsymbol h)\\
&=S(\widehat{\boldsymbol\delta})+
2\boldsymbol h^{\mathsf T}A^{\mathsf T}P\boldsymbol r+
\boldsymbol h^{\mathsf T}N\boldsymbol h\\
&=S(\widehat{\boldsymbol\delta})+\boldsymbol h^{\mathsf T}N\boldsymbol h.
\end{aligned}
$$

非零の $\boldsymbol h$ では厳密に増えるため、解は唯一の最小点です。
<!-- proof-end -->

**異精度の2観測。** $A=(1,1)^{\mathsf T}$、$\boldsymbol b=(1.000,1.040)^{\mathsf T}$ m、$P=\operatorname{diag}(1,1/4)$ とすると、$N=1.25$、$u=1.260$ m。よって

$$
\widehat x=1.260/1.25=1.008\ \mathrm m,\qquad
\boldsymbol v=(0.008,-0.032)^{\mathsf T}\ \mathrm m.
$$

$A^{\mathsf T}P\boldsymbol v=0.008-0.032/4=0$ で正規方程式を検算できます。正規方程式は手計算の原理であり、数値計算では明示的逆行列より重み付きQR分解などが安定なことがあります。行列 $N$ の条件数は $P^{1/2}A$ の条件数の二乗になり得るため、悪条件を隠してはいけません。

---

## 3. datum の欠損：三角形が自由に動く

測距だけの三角形は、全点を同じだけ平行移動・回転しても辺の長さが変わりません。[GEOD2で定義したdatum](../GEOD2/index.md#def-geod2-datum)は位置と方向の基準の指定にも関わります。観測の重みを無限に増やしても、この基準が未定なら絶対座標は決まりません。

<a id="def-geod8-datum-deficiency"></a>
<!-- formal-statement-start -->
> **定義（datum欠損と不定方向）**
> 線形観測の設計行列 $A\in\mathbb R^{m\times n}$ に対し、$A\boldsymbol h=0$ を満たす非零ベクトル $\boldsymbol h\in\mathbb R^n$ を**観測から決まらない不定方向**という。空間 $\ker A$ の次元

$$
d=n-\operatorname{rank}A
$$

> を datum 欠損数という。$d>0$ なら観測のみで全未知量を一意には定められない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod8-datum-deficiency -->
**定義の確認**。 2点の未知標高を $(H_A,H_B)$ とすると[GEOD7の水準高低差](../GEOD7/index.md#prop-geod7-leveling-telescope)に対応する行は $A=(-1,1)$ です。$A(1,1)^{\mathsf T}=0$、一方行階数は1なので核は $\operatorname{span}\{(1,1)^{\mathsf T}\}$、欠損数は $2-1=1$ です。両点へ同じ $c$ mを足しても観測差は変わりません。
<!-- definition-example-end -->

3点の水平座標を $\boldsymbol x=(x_A,y_A,x_B,y_B,x_C,y_C)^{\mathsf T}$ とし、観測は3辺の距離

$$
\ell_{ij}=\sqrt{(x_j-x_i)^2+(y_j-y_i)^2}
$$

とします。両端が異なるとき、$\ell_{ij}$ の座標偏微分は辺の単位方向ベクトルの符号付き成分となります。

<a id="prop-geod8-triangle-gauge"></a>
<!-- formal-statement-start -->
> **命題（三角測距網の三つのdatum欠損）**
> 同一直線上にない平面上の3点 $A,B,C$ の6座標を未知量とし、正の3辺長 $AB,AC,BC$ を観測する。3本の長さ関数の $3\times6$ Jacobian は階数3であり、その核は東西並進・南北並進・微小回転の3方向で張られる。従って datum 欠損数は3である。
<!-- formal-statement-end -->

**証明の見取り図。** まず剛体移動が距離を変えないことを微分して核の候補を作ります。その後、三角形を便利な座標へ置いて設計行列の3行が独立であると示します。

<!-- proof-start -->
### 証明

全点の座標に同じ $(t_x,t_y)$ を足すと差 $(x_j-x_i,y_j-y_i)$ は変わらないので

$$
\boldsymbol t_x=(1,0,1,0,1,0)^{\mathsf T},\quad
\boldsymbol t_y=(0,1,0,1,0,1)^{\mathsf T}
$$

が核に入ります。角 $\theta$ の回転の微分は $(x,y)\mapsto(-y,x)$ なので

$$
\boldsymbol r=(-y_A,x_A,-y_B,x_B,-y_C,x_C)^{\mathsf T}
$$

も核に入ります。辺ベクトル $\boldsymbol d=(p,q)$ の回転微分は $(-q,p)$ であり、距離の微分は $(p,q)\cdot(-q,p)/\sqrt{p^2+q^2}=0$ だからです。

剛体移動後に $A=(0,0), B=(a,0), C=(u,v)$、$a>0,v\ne0$ と置けます。3行の線形関係を $\alpha A_{AB}+\beta A_{AC}+\gamma A_{BC}=0$ とすると、$y_B$ 列には $BC$ 行の $-v/\ell_{BC}$ のみ現れるため $\gamma=0$。次に $y_A$ 列に $AC$ 行の $-v/\ell_{AC}$ のみ残り $\beta=0$。$x_B$ 列の $AB$ 行は1だから $\alpha=0$。従って行階数は3です。

核の次元は $6-3=3$。非共線配置では上記の二並進と回転は独立なので、核をちょうど張ります。
<!-- proof-end -->

**直接計算。** $A=(0,0), B=(1,0), C=(0,1)$ mで

$$
A=\begin{pmatrix}
-1&0&1&0&0&0\\
0&-1&0&0&0&1\\
0&0&1/\sqrt2&-1/\sqrt2&-1/\sqrt2&1/\sqrt2
\end{pmatrix}.
$$

この $A$ に並進2方向と回転 $(0,0,0,1,-1,0)^{\mathsf T}$ を掛けると零です。距離3本で決まるのは非退化な三角形の**形状の3自由度**であり、絶対位置・方向は別に指定します。直線上に3点が並ぶ場合は上の $v\ne0$ による行独立性の証明が壊れ、別の退化が生じます。

---

## 4. 拘束条件と自由網

基準点 $A=(0,0)$ と、$B$ が $x$ 軸の正側にあるという条件 $y_B=0,\ x_B>0$ を与えれば、非退化な三角形の $(x_B,x_C,y_C)$ は3辺から局所的に決まります。しかしこの操作は距離観測の精度を増やすのではなく、**観測から区別できなかった座標表示の自由度を固定する**ものです。

条件を一次式 $C\boldsymbol\delta=\boldsymbol d$（$C$ は $q\times n$）で表します。既知基準点を誤差なしで固定する操作と、基準点なしで平均移動・回転だけを消す操作とは異なります。

<a id="def-geod8-constraints"></a>
<!-- formal-statement-start -->
> **定義（厳密拘束と自由網の内的拘束）**
> 線形化した未知修正量 $\boldsymbol\delta\in\mathbb R^n$ に課す $C\boldsymbol\delta=\boldsymbol d$ を**厳密拘束**という。外部の採用基準点・方向を固定するものは外部 datum 拘束である。外部の座標値を用いず、$\ker A$ の自由度だけを除く整合的な条件を**自由網の内的拘束**という。どちらも条件を満たす修正量の中で残差二乗和を最小化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod8-constraints -->
**定義の確認**。 2点標高 $(H_A,H_B)$ を暫定値 $(50.000,50.300)$ mから修正し、$H_A=50.000$ mを厳密に固定するなら $C=(1,0)$、$d=0$ です。$C(1,1)^{\mathsf T}=1\ne0$ より[平均高さの不定性](#def-geod8-datum-deficiency)を除けます。外部高さを使わず $C=(1,1)$、$d=0$ として修正の和を0にするのも、$C(1,1)^{\mathsf T}=2\ne0$ で核方向を除く内的条件です。ただし後者の絶対標高は外部基準で確定しません。
<!-- definition-example-end -->

<a id="thm-geod8-constrained"></a>
<!-- formal-statement-start -->
> **定理（制約付き平差の一意性）**
> $P$ が対称正定値、$A\in\mathbb R^{m\times n}$、$C\in\mathbb R^{q\times n}$ は行階数 $q$、かつ $\ker A\cap\ker C=\{\boldsymbol0\}$ であるとする。任意の $\boldsymbol b\in\mathbb R^m$、$\boldsymbol d\in\mathbb R^q$ に対し、拘束 $C\boldsymbol\delta=\boldsymbol d$ 下の重み付き残差二乗和には唯一の最小点があり、乗数 $\boldsymbol\lambda\in\mathbb R^q$ とともに

$$
\begin{pmatrix}A^{\mathsf T}PA&C^{\mathsf T}\\C&0\end{pmatrix}
\begin{pmatrix}\widehat{\boldsymbol\delta}\\\boldsymbol\lambda\end{pmatrix}
=\begin{pmatrix}A^{\mathsf T}P\boldsymbol b\\\boldsymbol d\end{pmatrix}
$$

> を満たす。このブロック行列は可逆である。
<!-- formal-statement-end -->

**証明の見取り図。** 拘束の集合上で、どの非零方向にも観測が変化することを示します。さらに斉次の乗数方程式に非零解がないことを確認します。

<!-- proof-start -->
### 証明

$C$ は行階数 $q$ なので任意の $\boldsymbol d$ に対して $C\boldsymbol\delta_0=\boldsymbol d$ を満たす点が存在します。全可行点は $\boldsymbol\delta=\boldsymbol\delta_0+\boldsymbol z$、$\boldsymbol z\in\ker C$ です。非零の $\boldsymbol z\in\ker C$ なら共通核の条件より $A\boldsymbol z\ne0$、従って $\boldsymbol z^{\mathsf T}A^{\mathsf T}PA\boldsymbol z>0$。制約空間の二次式は正定値で最小点が一意にあります。

その点で $\ker C$ 内の任意方向に微分すると、$A^{\mathsf T}PA\widehat{\boldsymbol\delta}-A^{\mathsf T}P\boldsymbol b$ は $\ker C$ と直交します。直交補空間は $\operatorname{im}C^{\mathsf T}$ なので、上段にある乗数 $\boldsymbol\lambda$ が存在し、下段は拘束式です。

ブロック行列の斉次解 $(\boldsymbol h,\boldsymbol\mu)$ は $C\boldsymbol h=0$ と $A^{\mathsf T}PA\boldsymbol h+C^{\mathsf T}\boldsymbol\mu=0$ を満たします。後式に $\boldsymbol h^{\mathsf T}$ を掛けると $(A\boldsymbol h)^{\mathsf T}P(A\boldsymbol h)=0$ なので、正定値性から $A\boldsymbol h=0$。共通核の仮定により $\boldsymbol h=0$、残りは $C^{\mathsf T}\boldsymbol\mu=0$ で、$C$ が行独立だから $\boldsymbol\mu=0$。従って可逆です。
<!-- proof-end -->

**失敗する拘束。** 2点の高低差観測 $A=(-1,1)$ に $C=(-2,2)$ を足しても、$\ker A=\ker C=\operatorname{span}\{(1,1)^{\mathsf T}\}$ です。階数は増えず、一意の絶対標高は得られません。また厳密基準点が実際には動いたり誤っていれば、その誤りは座標へ持ち込まれます。不確かな基準点を扱う場合は、その不確かさを含めた有限の重みの観測や共分散伝播へ模型を変える必要があります。

---

## 5. 推定共分散と残差は何を教えるか

先ほどの[最小二乗定理](#thm-geod8-weighted-normal)は、何を採用値にするかを決めました。しかし、同じ採用値でも一度きりの観測と千回の観測では信頼性が違います。誤差が実際にどの程度ばらつくと仮定したかを、推定座標へ伝えます。

以下では **線形化の誤差が無視でき、設計行列 $A$ は固定、列階数 $n$、重み行列 $P=Q^{-1}$、誤差の平均0・共分散 $\sigma_0^2Q$ が正しく指定されている** とします。制約によって欠損を解いた場合は、自由座標だけに減らしたフルランクの設計行列に同じ計算を適用します。外部基準点を厳密に固定した共分散は、その基準点の不確かさを**含みません**。

<a id="prop-geod8-adjustment-covariance"></a>
<!-- formal-statement-start -->
> **命題（推定共分散と残差共分散）**
> $A\in\mathbb R^{m\times n}$ は列階数 $n$、$P=Q^{-1}$ は対称正定値、$\boldsymbol b=A\boldsymbol\delta_*+\boldsymbol\varepsilon$ で $E[\boldsymbol\varepsilon]=0$、$\operatorname{Cov}(\boldsymbol\varepsilon)=\sigma_0^2Q$、$\sigma_0>0$ とする。[最小二乗解](#thm-geod8-weighted-normal)の共分散と、モデル予測値から観測値を引いた残差 $\boldsymbol v=A\widehat{\boldsymbol\delta}-\boldsymbol b$ の共分散は

$$
\begin{aligned}
\operatorname{Cov}(\widehat{\boldsymbol\delta})
&=\sigma_0^2(A^{\mathsf T}PA)^{-1},\\
\operatorname{Cov}(\boldsymbol v)
&=\sigma_0^2\left(Q-A(A^{\mathsf T}PA)^{-1}A^{\mathsf T}\right).
\end{aligned}
$$

> さらに $E[\boldsymbol v^{\mathsf T}P\boldsymbol v]=\sigma_0^2(m-n)$。$m>n$ の場合、$\widehat{\sigma}_0^2=\boldsymbol v^{\mathsf T}P\boldsymbol v/(m-n)$ は基準分散の不偏推定量である。
<!-- formal-statement-end -->

**証明の見取り図。** 真の修正量と推定量の差は、観測誤差の線形変換です。その係数行列を残差にも代入して共分散を計算します。二乗和の平均は共分散の対角成分の総和で得られます。

<!-- proof-start -->
### 証明

$N=A^{\mathsf T}PA$、$K=N^{-1}A^{\mathsf T}P$ とすれば $KA=I_n$ なので

$$
\widehat{\boldsymbol\delta}=K\boldsymbol b
=\boldsymbol\delta_*+K\boldsymbol\varepsilon.
$$

よって $E[\widehat{\boldsymbol\delta}]=\boldsymbol\delta_*$、誤差共分散の線形変換から

$$
\begin{aligned}
\operatorname{Cov}(\widehat{\boldsymbol\delta})
&=K(\sigma_0^2Q)K^{\mathsf T}\\
&=\sigma_0^2N^{-1}A^{\mathsf T}PQPAN^{-1}\\
&=\sigma_0^2N^{-1}NN^{-1}=\sigma_0^2N^{-1}.
\end{aligned}
$$

ここで $PQ=I_m$、$P=P^{\mathsf T}$ を使いました。残差は

$$
\boldsymbol v=(AK-I_m)\boldsymbol\varepsilon.
$$

従って共分散の左・右から係数を掛けると

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol v)/\sigma_0^2
&=(AK-I_m)Q(AK-I_m)^{\mathsf T}\\
&=AKQK^{\mathsf T}A^{\mathsf T}
-AKQ-QK^{\mathsf T}A^{\mathsf T}+Q\\
&=AN^{-1}A^{\mathsf T}
-AN^{-1}A^{\mathsf T}-AN^{-1}A^{\mathsf T}+Q\\
&=Q-AN^{-1}A^{\mathsf T}.
\end{aligned}
$$

また $E[\boldsymbol v]=0$、$E[\boldsymbol v^{\mathsf T}P\boldsymbol v]=\operatorname{tr}(P\operatorname{Cov}(\boldsymbol v))$ なので

$$
\begin{aligned}
E[\boldsymbol v^{\mathsf T}P\boldsymbol v]
&=\sigma_0^2\{\operatorname{tr}(PQ)
-\operatorname{tr}(PAN^{-1}A^{\mathsf T})\}\\
&=\sigma_0^2\{m-\operatorname{tr}(N^{-1}A^{\mathsf T}PA)\}\\
&=\sigma_0^2(m-n).
\end{aligned}
$$

$m>n$ でこの値を $m-n$ で割れば不偏性が従います。正規分布はこの共分散計算と不偏性には不要です。
<!-- proof-end -->

### 5.1 三角水準閉路を最後まで平差する

既知点 $A$ の高さを厳密に $H_A=50.000$ mと採用します。[GEOD7の閉路式](../GEOD7/index.md#prop-geod7-leveling-telescope)に従い、$A\to B$、$B\to C$、$C\to A$ の観測高低差を順に

$$
\boldsymbol l=(+0.300,\ -0.350,\ +0.060)^{\mathsf T}\ \mathrm m
$$

とします。独立な測定で、事前標準偏差が $(0.005,0.005,0.0025)$ mと評価されているとします。基準分散を $\sigma_0^2=(0.005\ \mathrm m)^2$ とすれば $P=\operatorname{diag}(1,1,4)$ です。ここでは高低差の線形式そのものを使うため、一次化の打切りはありません。

未知量を $\boldsymbol x=(H_B-H_A,H_C-H_A)^{\mathsf T}$ とします。各観測は $x_1,x_2-x_1,-x_2$ を予測するので

$$
A=\begin{pmatrix}1&0\\-1&1\\0&-1\end{pmatrix},
\quad
N=A^{\mathsf T}PA=\begin{pmatrix}2&-1\\-1&5\end{pmatrix},
\quad
\boldsymbol u=A^{\mathsf T}P\boldsymbol l
=\begin{pmatrix}0.650\\-0.590\end{pmatrix}\ \mathrm m.
$$

$\det N=10-1=9>0$、$N^{-1}=\frac19\begin{pmatrix}5&1\\1&2\end{pmatrix}$ なので

$$
\widehat{\boldsymbol x}
=\frac19\begin{pmatrix}5(0.650)-0.590\\0.650-2(0.590)\end{pmatrix}
=\begin{pmatrix}0.2955556\\-0.0588889\end{pmatrix}\ \mathrm m.
$$

従って $H_B=50.2955556$ m、$H_C=49.9411111$ mです。予測値から観測値を引いた残差は

$$
\boldsymbol v
=A\widehat{\boldsymbol x}-\boldsymbol l
=\begin{pmatrix}-0.0044444\\-0.0044444\\-0.0011111\end{pmatrix}\ \mathrm m.
$$

観測閉合差は $w=0.300-0.350+0.060=+0.010$ mで、残差は $v_1+v_2+v_3=-0.010$ m。補正後の区間差は閉じます。重みが4倍の第3観測の補正は、第1・第2観測の4分の1に抑えられました。

[推定共分散と残差共分散の命題](#prop-geod8-adjustment-covariance)から

$$
\operatorname{Cov}(\widehat{\boldsymbol x})
=\frac{(0.005)^2}{9}
\begin{pmatrix}5&1\\1&2\end{pmatrix}\ \mathrm m^2.
$$

従って $H_B$ の標準偏差は $0.005\sqrt{5/9}=0.003727$ m、$H_C$ は $0.005\sqrt{2/9}=0.002357$ mです。この標準偏差は**固定した $H_A$ に誤差がないという条件付き**です。高さ差の共分散も非零なので、2点を独立とみなして差の精度を計算してはいけません。

$m-n=1$、重み付き二乗和は

$$
\begin{aligned}
\boldsymbol v^{\mathsf T}P\boldsymbol v
&=0.0044444^2+0.0044444^2+4(0.0011111)^2\\
&\simeq0.0000444444\ \mathrm m^2.
\end{aligned}
$$

残差から推定した基準標準偏差は $\widehat\sigma_0=\sqrt{0.0000444444}=0.006667$ mです。ただし自由度1しかなく、これだけで事前の5 mmを否定したり、粗大誤差の箇所を断定したりはできません。

### 5.2 残差を標準化して検査する

この閉路では $Q=\operatorname{diag}(1,1,1/4)$ です。[残差共分散の式](#prop-geod8-adjustment-covariance)に数値を代入すると

$$
\operatorname{Cov}(\boldsymbol v)
=\frac{\sigma_0^2}{2.25}
\begin{pmatrix}
1&1&1/4\\
1&1&1/4\\
1/4&1/4&1/16
\end{pmatrix}.
$$

例えば第1・第2残差の標準偏差は $\sigma_0/1.5=0.003333$ m、第3残差の標準偏差は $\sigma_0/6=0.0008333$ mです。各残差を**その残差自身の標準偏差**で割ると、3本とも絶対値 $1.333$ になります。残差は強く相関しており、「第3の残差が小さいから第3観測だけ正しい」とは言えません。

未補正の系統偏りが設計行列の列空間に入ると、残差だけからは検出できないことがあります。例えば2回の観測がともに $l_j=x+c+\varepsilon_j$ で、未知量 $x$ と共通偏り $c$ を同時に推定する設計行列の2列はどちらも $(1,1)^{\mathsf T}$ で階数1です。$c$ を無視して $x$ のみを推定すれば、共通偏りは座標へ取り込まれます。**小さな残差は正しいdatumや系統誤差なしの証明ではありません。**

---

## 6. 平面位置の方向別の不確かさと条件数

2次元の座標推定では、東西・南北の標準偏差を別々に並べるだけでは方向による精度差を表せません。共分散の非対角成分は「東にずれたとき北にもずれる傾向」を表します。座標誤差の二次形式が一定となる点を考えると、長軸と短軸のある楕円になります。

<a id="def-geod8-error-ellipse"></a>
<!-- formal-statement-start -->
> **定義（誤差楕円）**
> 平面位置の推定値 $\widehat{\boldsymbol p}\in\mathbb R^2$ と、その対称正定値な共分散 $C_p\in\mathbb R^{2\times2}$ が与えられたとする。係数 $k>0$ の誤差楕円を

$$
E_k=\left\{\boldsymbol p\in\mathbb R^2:
(\boldsymbol p-\widehat{\boldsymbol p})^{\mathsf T}
C_p^{-1}(\boldsymbol p-\widehat{\boldsymbol p})\le k^2\right\}
$$

> と定める。これは採用した確率・座標・datumの模型で定義される集合であり、図に描いた長さだけで絶対位置の正確さを保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod8-error-ellipse -->
**定義の確認**。 $C_p=\operatorname{diag}(9,4)$ mm²なら、両対角要素は正で行列式は36 mm⁴なので逆行列が存在します。東西ずれを $u$ mm、南北ずれを $v$ mmとすれば $u^2/9+v^2/4\le k^2$ となり、$k=1$ の軸半径は3 mmと2 mmです。$(u,v)=(3,0)$ は境界、$(0,0)$ は内部で、二次形式の条件を実際に満たします。
<!-- definition-example-end -->

<a id="prop-geod8-ellipse-axes"></a>
<!-- formal-statement-start -->
> **命題（誤差楕円の主軸と確率）**
> 対称正定値共分散 $C_p$ の固有値を $\lambda_1\ge\lambda_2>0$、対応する正規直交固有ベクトルを $\boldsymbol e_1,\boldsymbol e_2$ とする。[誤差楕円](#def-geod8-error-ellipse) $E_k$ の主軸方向はこれらの固有ベクトルで、半軸長は $k\sqrt{\lambda_1},k\sqrt{\lambda_2}$ である。さらに $\widehat{\boldsymbol p}-\boldsymbol p_*$ が平均0、共分散 $C_p$ の2次元正規分布に従い、$C_p$ が既知なら、真の位置 $\boldsymbol p_*$ が $E_k$ に入る確率は $1-\exp(-k^2/2)$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 固有ベクトルを座標軸にすると、二次形式は二つの平方の和です。確率は標準正規変数2個の二乗和を極座標で積分します。

<!-- proof-start -->
### 証明

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)を、実対称かつ正定値な $2\times2$ 行列 $C_p$ に適用します。固有値は正で、正規直交固有ベクトルを列に持つ直交行列 $R=(\boldsymbol e_1,\boldsymbol e_2)$ を用いて $C_p=R\operatorname{diag}(\lambda_1,\lambda_2)R^{\mathsf T}$ と分解できます。$\boldsymbol p-\widehat{\boldsymbol p}=R\boldsymbol z$ と置くと、

$$
(R\boldsymbol z)^{\mathsf T}C_p^{-1}(R\boldsymbol z)
=\frac{z_1^2}{\lambda_1}+\frac{z_2^2}{\lambda_2}.
$$

従って楕円は $z_1^2/(k^2\lambda_1)+z_2^2/(k^2\lambda_2)\le1$ です。正規分布を仮定すれば標準化変数 $Z_i=z_i/\sqrt{\lambda_i}$ は互いに独立な標準正規変数です。極座標でその同時密度 $(2\pi)^{-1}e^{-(z_1^2+z_2^2)/2}$ を半径 $0\le r\le k$、角度 $0\le\theta<2\pi$ に積分すると

$$
\frac1{2\pi}\int_0^{2\pi}\!\int_0^k
e^{-r^2/2}r\,dr\,d\theta
=\left[-e^{-r^2/2}\right]_0^k=1-e^{-k^2/2}.
$$

これが真の位置を含む確率です。
<!-- proof-end -->

例えば単位を cm²として

$$
C_p=\begin{pmatrix}4&1\\1&1\end{pmatrix}
$$

なら $\det C_p=3>0$、固有値は $\lambda_{1,2}=(5\pm\sqrt{13})/2$ です。半軸長は $k=1$ で約 $2.074$ cmと $0.835$ cm、長軸の東軸からの角度は $\frac12\arctan(2/3)\simeq16.85^\circ$ です。正規模型の**95%楕円**を描くには $1-e^{-k^2/2}=0.95$ を解いて $k=\sqrt{-2\log0.05}\simeq2.448$ とします。$k=1$ の2次元楕円は95%ではなく約39.3%を含むだけです。

誤差楕円の形状は、観測網の配置・精度・拘束・単位に依存します。小さい固有値があっても、もう一方が極端に大きければ一方向の位置が不確かです。$\operatorname{cond}_2(A)$ は列の尺度を合わせた後で評価し、フルランクの場合 $\operatorname{cond}_2(A^{\mathsf T}A)=\operatorname{cond}_2(A)^2$ です。欠損網の正規行列は特異で、逆行列もそのままの絶対座標共分散も定義できません。自由網ではゲージを固定した後の**形・距離の推定精度**と、外部基準そのものの信頼性を区別します。

---

## 7. 演習：観測の幾何・datum・精度を接続する

### Level A：一つずつの操作

#### A1. 水平距離の設計行列

固定点 $A=(1,2)$ mから未知点 $(x,y)$ mまでの水平距離を観測する。暫定点 $(4,6)$ m、補正済み観測値 $5.005$ mである。暫定点の予測値、設計行列、観測差を求め、$\boldsymbol\delta=(0.003,0.004)$ mの一次残差を求めよ。

- Level: A
- ID: GEOD8-A1

<!-- solution-start -->
**詳細解答。** [線形化の定義](#def-geod8-linearization)に従い $f(x,y)=\sqrt{(x-1)^2+(y-2)^2}$ とします。暫定点から固定点への差は $(3,4)$ で、予測は $\sqrt{3^2+4^2}=5$ mです。両成分で偏微分すると

$$
A=\left(\frac{x-1}{f},\frac{y-2}{f}\right)_{\!(4,6)}
=\left(\frac35,\frac45\right),\qquad b=5.005-5=0.005\ \mathrm m.
$$

修正による予測差は $(3/5)(0.003)+(4/5)(0.004)=0.0018+0.0032=0.005$ m。従って残差は $v=A\boldsymbol\delta-b=0$ mです。実際の非線形残差とは高次の差があり、厳密に0と断定するのは一次模型の中だけです。
<!-- solution-end -->

#### A2. 異なる精度の平均

同一の未知長さ $x$ を独立に $12.0$ cm、$12.4$ cmと測り、標準偏差をそれぞれ $0.2$ cm、$0.4$ cmと評価した。観測誤差の平均0を仮定し、重み付き最小二乗で $x$ と二つの残差を求めよ。両標準偏差が既知なら $x$ の標準偏差も求めよ。

- Level: A
- ID: GEOD8-A2

<!-- solution-start -->
**詳細解答。** [重みの定義](#def-geod8-weight)で $\sigma_0=0.2$ cmを選び、$P=\operatorname{diag}(1,1/4)$ です。設計行列は $A=(1,1)^{\mathsf T}$、観測ベクトルは $(12.0,12.4)^{\mathsf T}$ cmです。[正規方程式](#thm-geod8-weighted-normal)の左係数と右辺は

$$
N=1+\frac14=\frac54,\qquad u=12.0+\frac14(12.4)=15.1\ \mathrm{cm}.
$$

従って $\widehat x=15.1/(5/4)=12.08$ cm、残差は $(+0.08,-0.32)$ cmです。$A^{\mathsf T}P\boldsymbol v=0.08-0.32/4=0$ で検算できます。[推定共分散](#prop-geod8-adjustment-covariance)より $\operatorname{Var}(\widehat x)=0.2^2/(5/4)=0.032$ cm²、標準偏差は $\sqrt{0.032}\simeq0.179$ cmです。
<!-- solution-end -->

#### A3. 標高の基準なしの観測網

3点 $A,B,C$ の標高 $H_A,H_B,H_C$ を未知とし、$A\to B$ と $B\to C$ の高低差だけを測る。観測行列の階数、核、datum 欠損数を求めよ。$H_A=0$ を固定した場合の自由座標の設計行列の階数も示せ。

- Level: A
- ID: GEOD8-A3

<!-- solution-start -->
**詳細解答。** 予測値は $H_B-H_A,H_C-H_B$ なので

$$
A=\begin{pmatrix}-1&1&0\\0&-1&1\end{pmatrix}.
$$

2行は独立で階数2です。$A\boldsymbol h=0$ は $h_B=h_A$、$h_C=h_B$ から $\boldsymbol h=c(1,1,1)^{\mathsf T}$、したがって[datum 欠損](#def-geod8-datum-deficiency)は $3-2=1$ です。$H_A=0$ を固定し未知を $(H_B,H_C)$ に減らすと $A_{\mathrm{free}}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}$、行列式1なので階数2で一意に解けます。固定した高さの正しさはこれだけでは保証されません。
<!-- solution-end -->

#### A4. 等精度の閉合差補正

閉路 $A\to B\to C\to A$ の高低差を $+0.100,+0.200,-0.294$ mと測った。独立かつ等精度、各区間差を同じ分散で評価するとき、最小二乗によって加える3つの残差と補正後の区間差を求めよ。

- Level: A
- ID: GEOD8-A4

<!-- solution-start -->
**詳細解答。** [閉合差](../GEOD7/index.md#def-geod7-level-closure)は $w=0.100+0.200-0.294=+0.006$ mです。補正後の3差が零となる条件は $v_1+v_2+v_3=-w$。等重みの二乗和を最小にするには、固定された和に対して3残差が等しい必要があります。例えば $(v_1-v_2)^2+(v_2-v_3)^2+(v_3-v_1)^2\ge0$ を展開して確認でき、$v_i=-w/3=-0.002$ mです。補正後は $(0.098,0.198,-0.296)$ m、その和は0です。これは等精度の条件がある場合の結論です。
<!-- solution-end -->

#### A5. 誤差楕円の確率

ある平面位置推定の共分散を $C_p=\operatorname{diag}(4,1)$ mm²とする。$k=1$ と正規誤差模型の95%誤差楕円について、東西・南北の半軸長を求めよ。$k=1$ が「約68%の位置を含む」という主張は正しいか。

- Level: A
- ID: GEOD8-A5

<!-- solution-start -->
**詳細解答。** $C_p$ は正定値で固有値4,1 mm²、固有方向は東西・南北です。[主軸の命題](#prop-geod8-ellipse-axes)より $k=1$ の半軸は2 mmと1 mm。95%には $k=\sqrt{-2\log0.05}\simeq2.448$ を用いて半軸は約4.896 mmと2.448 mmです。$k=1$ の包含確率は $1-e^{-1/2}\simeq0.393$、すなわち約39.3%です。68%は一次元の「平均±1標準偏差」に関する近似で、二次元楕円にはそのまま移せません。
<!-- solution-end -->

### Level B：定理と反例を再構成する

#### B1. 正規方程式と分散の再導出

同一未知量 $x$ の独立な3観測を $(2,4,6)$（長さの単位はm）、重みを $(1,1,2)$ とする。最小二乗の出発式から正規方程式、推定値、残差を求めよ。誤差共分散が $\sigma_0^2\operatorname{diag}(1,1,1/2)$ なら推定値の分散も示せ。

- Level: B
- ID: GEOD8-B1

<!-- solution-start -->
**詳細解答。** 設計行列が $A=(1,1,1)^{\mathsf T}$ なので、二乗和を未知 $x$ の関数として

$$
S(x)=(x-2)^2+(x-4)^2+2(x-6)^2
$$

と立てます。微分すると $S'(x)=2(x-2)+2(x-4)+4(x-6)=8x-36$、$S''(x)=8>0$。従って $4\widehat x=18$、$\widehat x=4.5$ mです。これは[正規方程式](#thm-geod8-weighted-normal)の $A^{\mathsf T}PA=4$、$A^{\mathsf T}P\boldsymbol l=18$ と一致します。残差は $(2.5,0.5,-1.5)$ mで、$A^{\mathsf T}P\boldsymbol v=2.5+0.5+2(-1.5)=0$ です。

推定量は誤差の重み付き和 $\widehat x-x_*=(\varepsilon_1+\varepsilon_2+2\varepsilon_3)/4$。独立性を用いて分散は $\sigma_0^2(1+1+4\cdot1/2)/16=\sigma_0^2/4$ です。[推定共分散の公式](#prop-geod8-adjustment-covariance)の $N^{-1}=1/4$ と一致します。
<!-- solution-end -->

#### B2. 三角測距網の階数と拘束

3点の暫定位置を $A=(0,0),B=(2,0),C=(0,2)$ mとし、観測するのは3辺長だけである。未知座標順を $(x_A,y_A,x_B,y_B,x_C,y_C)$ として全Jacobianを作れ。並進2方向と回転1方向がその核に入ることを実際に掛け算で確かめよ。さらに $x_A=y_A=y_B=0$ を厳密に固定すると、残る3列の階数が3になることを示せ。

- Level: B
- ID: GEOD8-B2

<!-- solution-start -->
**詳細解答。** 距離 $\ell_{ij}$ は両端点の差の長さです。例えば $AB$ では $x_A$ 微分が $(x_A-x_B)/\ell_{AB}=-1$、$x_B$ 微分が1です。他の辺も同じように微分して

$$
A=\begin{pmatrix}
-1&0&1&0&0&0\\
0&-1&0&0&0&1\\
0&0&1/\sqrt2&-1/\sqrt2&-1/\sqrt2&1/\sqrt2
\end{pmatrix}.
$$

並進方向 $\boldsymbol t_x=(1,0,1,0,1,0)^{\mathsf T}$ を掛けると各行は $-1+1=0$、$0$、$1/\sqrt2-1/\sqrt2=0$。$\boldsymbol t_y=(0,1,0,1,0,1)^{\mathsf T}$ でも第2行 $-1+1=0$、第3行 $-1/\sqrt2+1/\sqrt2=0$ です。回転方向は $\boldsymbol r=(0,0,0,2,-2,0)^{\mathsf T}$ で、第3行は $-2/\sqrt2+2/\sqrt2=0$、他行は0となります。[三角測距網の命題](#prop-geod8-triangle-gauge)の3方向を数値検証できました。

固定条件後の列は $(x_B,x_C,y_C)$ の順に取り、

$$
A_{\mathrm{free}}=\begin{pmatrix}1&0&0\\0&0&1\\1/\sqrt2&-1/\sqrt2&1/\sqrt2\end{pmatrix}.
$$

行列式は $1/\sqrt2\ne0$ なので階数3です。ただし $y_C$ の符号をさらに固定しなければ、距離だけから三角形の上下反転の離散的な別解が残り得ます。これは局所的な Jacobian の階数欠損とは別です。
<!-- solution-end -->

#### B3. 異精度閉路と2点の共分散

既知点 $H_A=0$ mを厳密に固定する。$A\to B$、$B\to C$、$C\to A$ の独立な高低差を $(+0.120,-0.070,-0.042)$ mと測り、相対重みが $(1,4,1)$ と分かっている。最小二乗による残差と採用標高 $H_B,H_C$ を求め、基準標準偏差を $\sigma_0=0.003$ mとするとき共分散行列を求めよ。

- Level: B
- ID: GEOD8-B3

<!-- solution-start -->
**詳細解答。** 観測閉合差は $w=0.120-0.070-0.042=+0.008$ mです。補正は $v_1+v_2+v_3=-w$ を満たします。相対重み $(p_1,p_2,p_3)=(1,4,1)$ に対し、二乗和の最小値は、乗数法で $2p_iv_i+\lambda=0$ とすると

$$
v_i=-w\frac{1/p_i}{1/p_1+1/p_2+1/p_3}.
$$

分母は $1+1/4+1=9/4$ なので、残差は $(-0.0035556,-0.0008889,-0.0035556)$ mです。補正後の差は $(0.1164444,-0.0708889,-0.0455556)$ mで、和は0です。$H_A=0$ から $H_B=0.1164444$ m、$H_C=0.1164444-0.0708889=0.0455556$ m。

未知量 $(H_B,H_C)$ への設計行列は $\begin{pmatrix}1&0\\-1&1\\0&-1\end{pmatrix}$ です。[共分散命題](#prop-geod8-adjustment-covariance)へ $P=\operatorname{diag}(1,4,1)$ を入れると

$$
N=\begin{pmatrix}5&-4\\-4&5\end{pmatrix},\quad
N^{-1}=\frac19\begin{pmatrix}5&4\\4&5\end{pmatrix},\quad
\operatorname{Cov}(\widehat{\boldsymbol x})=
\frac{0.003^2}{9}\begin{pmatrix}5&4\\4&5\end{pmatrix}\ \mathrm m^2.
$$

$\det N=25-16=9>0$ なので正定値です。非対角成分は正であり、$H_B$ と $H_C$ の推定誤差は独立ではありません。
<!-- solution-end -->

#### B4. 残差から検出できない共通偏り

未知の真の長さ $x_*=1.000$ mを2回測ると、偶然誤差が零で、両観測に共通の未補正偏り $c=+0.010$ mが入って $(1.010,1.010)$ mとなった。偏りを無視して長さ一つを平差した結果と残差を求めよ。次に $x,c$ の両方を未知とすると設計行列の階数と識別できない方向はどうなるか説明せよ。

- Level: B
- ID: GEOD8-B4

<!-- solution-start -->
**詳細解答。** $l_1=l_2=x+c$ ですが、$c=0$ だと誤って仮定して最小二乗を解けば、等重みでは $\widehat x=(1.010+1.010)/2=1.010$ mで残差は $(0,0)$ mです。残差が零なのに真値より0.010 m大きいので、残差0は系統偏り0の証拠ではありません。

$x$ と $c$ を同時に推定するモデルなら $\boldsymbol l=A(x,c)^{\mathsf T}$、$A=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ で階数1、核は $(1,-1)^{\mathsf T}$ が張ります。[datum 欠損の考え方](#def-geod8-datum-deficiency)と同じ可識別性の問題で、$x$ を $t$ 増やし $c$ を $t$ 減らしても観測は同じです。独立の較正観測など、異なる情報がなければ両者を分離できません。
<!-- solution-end -->

### Level C：観測網の全工程

#### C1. 追加観測を含む水準網の平差と診断

3点 $A,B,C$ の高さの基準に $H_A=50.000$ mを誤差なしで採用する。順に $A\to B$、$B\to C$、$C\to A$、再測した $A\to B$ の高低差が

$$
\boldsymbol l=(0.300,-0.350,0.060,0.298)^{\mathsf T}\ \mathrm m
$$

で、4観測の偶然誤差は独立・平均0、標準偏差は $(0.005,0.005,0.0025,0.005)$ mである。線形高低差模型は正しいと仮定する。以下を一続きで計算せよ。

1. 未知量 $(H_B-H_A,H_C-H_A)$ の設計行列、重み、正規行列とその階数。
2. 採用高さと4残差。閉路の閉合と再測との差を確認する。
3. 推定された2標高の共分散と標準偏差。
4. 事前基準分散 $\sigma_0^2=(0.005\ \mathrm m)^2$ に対する重み付き二乗和の比と自由度、残差診断の限界。

- Level: C
- ID: GEOD8-C1

<!-- solution-start -->
**詳細解答。** まず datum を固定しないまま逆行列を取らないよう、$H_A$ を取り除いた2未知量で進めます。

1. 各観測が予測する高さ差は $x_1,x_2-x_1,-x_2,x_1$ です。基準分散を指定した[重みの定義](#def-geod8-weight)から $P=\operatorname{diag}(1,1,4,1)$ となります。

   $$
   A=\begin{pmatrix}1&0\\-1&1\\0&-1\\1&0\end{pmatrix},
   \quad N=A^{\mathsf T}PA=\begin{pmatrix}3&-1\\-1&5\end{pmatrix}.
   $$

   $\det N=15-1=14>0$、$N$ は2次の正定値行列で階数2です。**既知点拘束後**なので正規方程式の一意性条件が満たされます。

2. [正規方程式](#thm-geod8-weighted-normal)の右辺と逆行列は

   $$
   \boldsymbol u=A^{\mathsf T}P\boldsymbol l
   =\begin{pmatrix}0.300+0.350+0.298\\-0.350-4(0.060)\end{pmatrix}
   =\begin{pmatrix}0.948\\-0.590\end{pmatrix}\ \mathrm m,
   \quad N^{-1}=\frac1{14}\begin{pmatrix}5&1\\1&3\end{pmatrix}.
   $$

   従って

   $$
   \widehat{\boldsymbol x}
   =\frac1{14}\begin{pmatrix}5(0.948)-0.590\\0.948+3(-0.590)\end{pmatrix}
   =\begin{pmatrix}0.29642857\\-0.05871429\end{pmatrix}\ \mathrm m.
   $$

   採用標高は $H_B=50.29642857$ m、$H_C=49.94128571$ mです。観測と予測の差を各行で引き算すると

   $$
   \boldsymbol v=A\widehat{\boldsymbol x}-\boldsymbol l
   \simeq(-0.00357143,-0.00514286,-0.00128571,-0.00157143)^{\mathsf T}\ \mathrm m.
   $$

   最初の3区間の補正後の閉路和は
   $$
   (0.300+v_1)+(-0.350+v_2)+(0.060+v_3)
   =0.010-0.00357143-0.00514286-0.00128571=0.
   $$
   さらに2本の $A\to B$ の補正後差は $0.300+v_1=0.29642857$ m、$0.298+v_4=0.29642857$ mで一致します。第4残差を閉路補正へ混ぜて単純四等分してはいけません。

3. [共分散命題](#prop-geod8-adjustment-covariance)のフルランク条件を満たすため、

   $$
   \operatorname{Cov}(\widehat{\boldsymbol x})
   =\frac{0.005^2}{14}\begin{pmatrix}5&1\\1&3\end{pmatrix}\ \mathrm m^2.
   $$

   対角成分の平方根を取ると $\sigma_{H_B}=0.005\sqrt{5/14}\simeq0.002988$ m、$\sigma_{H_C}=0.005\sqrt{3/14}\simeq0.002315$ mです。非対角の共分散は $0.005^2/14\simeq1.786\times10^{-6}$ m²です。固定 $H_A$ 自身の不確かさは含みません。

4. 各残差を二乗し、重みを掛けて足すと

   $$
   \begin{aligned}
   S&=v_1^2+v_2^2+4v_3^2+v_4^2\\
   &\simeq0.0000482857\ \mathrm m^2.
   \end{aligned}
   $$

   事前 $\sigma_0^2=0.000025$ m²で割ると $S/\sigma_0^2\simeq1.93143$、冗長度は $m-n=4-2=2$ です。残差からの基準分散推定は $\widehat\sigma_0^2=S/2\simeq0.0000241429$ m²、標準偏差は約0.0049135 m。正規模型なら $S/\sigma_0^2$ は自由度2の $\chi^2$ 分布に従いますが、値が平均2に近いだけで誤差模型が証明されたわけではありません。自由度が少なく、残差は互いに相関するため、最大の生残差だけで測定を除外しません。器械較正、再測独立性、固定点datumの妥当性も確認します。
<!-- solution-end -->

---

## 8. 読み終えたときの確認

- 非線形な観測は暫定座標で偏微分し、反復後は**元の観測式**へ戻って残差を確認する。
- 正規方程式を解ける条件は単に「観測数が未知数以上」でなく、適切な重みと**列階数**である。
- 測距だけの非共線三角網は並進2・回転1の欠損を持つ。拘束はこの核を除くが、外部datumの正しさを保証しない。
- 推定共分散は観測共分散を座標へ伝播したもの。残差共分散は推定座標の共分散と異なり、残差同士は相関する。
- 誤差楕円の軸は共分散の固有値・固有ベクトルで決まり、正規模型の95%楕円では $k\simeq2.448$ を用いる。
- 残差が小さくても共通の偏りは潜み得る。外れ値の判定には別観測・較正・冗長度・datum・時点の確認が要る。

次章 GEOD9 では、衛星からの擬似距離をこの観測・設計行列の考え方につなぎ、位置と時計差を同時に推定します。
