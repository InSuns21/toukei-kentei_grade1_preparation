# MFL41 Gauge-equivariant convolution

<!-- definition-example-audit: strict -->

## 1. 異なる接平面の特徴を集めてよいのか

[MFL40の辺輸送](../MFL40/index.md#def-mfl40-edge-transport)を使うと、隣接点 $j$ の接ベクトルを点 $i$ の接平面へ運べる。しかし、輸送後の二成分に学習可能な重みを掛けて足すとき、その層が**各点で独立なフレームの選び直し**に耐えるとは限らない。例えば、右側の成分だけを強調する固定行列は、軸を回転すると違う物理方向を強調してしまう。

この章では有限グラフ上の接ベクトル特徴を対象とする。まず輸送によって足し算の場所を揃え、次に重みが満たす条件を調べ、最後に等変な非線形性へ進む。有限頂点での厳密な代数的等変性を証明することと、メッシュの細分化で連続作用素に収束することは異なる。後者には別の近似誤差の議論が必要になる。

## 2. 輸送付き近傍集約

$(M,g)$ を二次元Riemann多様体、$I$ を有限な頂点集合、$p_i\in M$ を各頂点の点とする。有向辺 $j\to i$ には固定した曲線を割り当て、[MFL40の辺輸送の定義](../MFL40/index.md#def-mfl40-edge-transport)による $T_{ij}\in O(2)$ を用意する。$N(i)$ は点 $i$ に情報を送る頂点 $j$ の集合であり、自分自身を含めてもよい。$c_j\in\mathbb R^2$ は正規直交フレーム $E_j$ による接ベクトル成分である。

各辺の重み $w_{ij}\in\mathbb R$ は、点の距離や面積のように**フレームの選択を変えても同じ数値**であるとする。学習可能な重みでもよいが、成分軸に依存する操作で作った値を無条件に含めてはいけない。

<a id="def-mfl41-transport-aggregate"></a>
<!-- formal-statement-start -->
> **定義（輸送付き近傍集約）**  
> 二次元Riemann多様体上の有限頂点集合 $I$、固定された有向辺集合、各辺に指定した曲線に沿う $T_{ij}\in O(2)$、フレーム不変の実重み $w_{ij}$ を与える。接ベクトル成分の集合 $c=(c_j)_{j\in I}$ に対して、点 $i$ の出力を

$$
(L_Tc)_i=\sum_{j\in N(i)}w_{ij}T_{ij}c_j\in\mathbb R^2
$$

> と定める。空の近傍については零ベクトルとする。自己辺を含める場合は $T_{ii}=I_2$ を指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl41-transport-aggregate -->
**定義の確認：二つの送り手。** 点 $1$ へ $N(1)=\{2,3\}$ から送り、$w_{12}=2$、$w_{13}=1$、$T_{12}=I_2$、$T_{13}=R(\pi/2)$、$c_2=(1,0)^{\mathsf T}$、$c_3=(0,1)^{\mathsf T}$ とする。$R(\theta)$ は平面の角度 $\theta$ の回転行列であり、$R(\pi/2)(0,1)^{\mathsf T}=(-1,0)^{\mathsf T}$ だから

$$
(L_Tc)_1=2(1,0)^{\mathsf T}+(-1,0)^{\mathsf T}=(1,0)^{\mathsf T}.
$$

輸送はどちらも直交行列で、入力は二成分列、重みは数値、各項は**点1のフレーム成分**となる。したがって和が定義できる。これはグラフに付与した直交行列の有限模型であり、任意の数値の組が一つの滑らかな曲面の指定経路から生じると主張するものではない。
<!-- definition-example-end -->

ではフレームを各頂点で別々の $R_i\in O(2)$ に取り替えたとき、この式を評価してみよう。[MFL40の局所ゲージ変更](../MFL40/index.md#def-mfl40-discrete-gauge)では同じ接ベクトルは $\widetilde c_j=R_j^{\mathsf T}c_j$ と表される。さらに[両端の辺輸送変換則](../MFL40/index.md#thm-mfl40-transport-gauge)は $\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j$ を与える。

<a id="thm-mfl41-transport-equivariance"></a>
<!-- formal-statement-start -->
> **定理（輸送付き集約の局所ゲージ等変性）**  
> 上の有限グラフで、頂点、辺、各辺の曲線、近傍集合 $N(i)$ を固定し、すべての $w_{ij}$ をフレーム変更によらない実数とする。任意の独立な $R_i\in O(2)$ によるフレーム変更 $\widetilde E_i=E_iR_i$ の下で、同じ幾何的接ベクトルを表す新成分 $\widetilde c_i=R_i^{\mathsf T}c_i$ と新しい輸送行列 $\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j$ を用いれば

$$
(L_{\widetilde T}\widetilde c)_i
=R_i^{\mathsf T}(L_Tc)_i\qquad(i\in I)
$$

> が成立する。これは出力が到着点のフレーム成分として正しく変換するという意味であり、出力の二成分そのものが不変という意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

各辺で出発点の $R_j$ と入力の $R_j^{\mathsf T}$ が打ち消し合う。すると到着点の $R_i^{\mathsf T}$ だけがすべての和の項に残る。辺と重みが動かないことを確認してから有限和の外へ出す。

<!-- proof-start -->
### 証明

[MFL40の輸送の両端変換則](../MFL40/index.md#thm-mfl40-transport-gauge)と同じ接ベクトルの成分変換を、固定した辺 $j\to i$ に適用すると

$$
\begin{aligned}
\widetilde T_{ij}\widetilde c_j
&=(R_i^{\mathsf T}T_{ij}R_j)(R_j^{\mathsf T}c_j)\\
&=R_i^{\mathsf T}T_{ij}(R_jR_j^{\mathsf T})c_j\\
&=R_i^{\mathsf T}T_{ij}c_j.
\end{aligned}
$$

$N(i)$ と $w_{ij}$ は変わらず、$R_i$ は和の添字 $j$ に依存しない。ゆえに

$$
\begin{aligned}
(L_{\widetilde T}\widetilde c)_i
&=\sum_{j\in N(i)}w_{ij}\widetilde T_{ij}\widetilde c_j\\
&=\sum_{j\in N(i)}w_{ij}R_i^{\mathsf T}T_{ij}c_j\\
&=R_i^{\mathsf T}\sum_{j\in N(i)}w_{ij}T_{ij}c_j.
\end{aligned}
$$

空の近傍なら両辺が零で一致する。$\square$
<!-- proof-end -->

**反例：輸送を消す。** 二点の入力が同じ旧成分 $c_1=c_2=(1,0)^{\mathsf T}$、$N(1)=\{2\}$、$w_{12}=1$、$T_{12}=I$ とする。$R_1=I$、$R_2=R(\pi/2)$ のもとで、輸送を無視した $c_2$ の直和を新フレームで計算すると $\widetilde c_2=(0,-1)^{\mathsf T}$ になる。一方、旧出力を到着点で表し直した値は $(1,0)^{\mathsf T}$ のまま。**出発点のフレーム変更を相殺する機構が欠けた**ことが破綻の原因である。正しくは $\widetilde T_{12}=R(\pi/2)$ として、$\widetilde T_{12}\widetilde c_2=(1,0)^{\mathsf T}$ を得る。

## 3. 行列値のカーネルを使うなら

輸送は向きを揃えるが、単なるスカラー倍だけでは「辺に沿う成分を強調する」などの学習はできない。そこで、点 $j$ の二成分を点 $i$ の二成分へ写す任意の $2\times2$ 行列 $K_{ij}$ に置き換える。入力と出力のフレームが違うので、$K_{ij}$ は点 $j$ の成分から点 $i$ の成分への**線形写像の行列表現**である。これを行列値カーネルと呼ぶ。連続積分核や無限次元作用素を仮定しているわけではない。

<a id="def-mfl41-kernel-covariance"></a>
<!-- formal-statement-start -->
> **定義（有限グラフのゲージ整合カーネル）**  
> 二次元Riemann多様体上の有限有向グラフを固定し、各 $j\to i$ に $K_{ij}\in\mathbb R^{2\times2}$ を与える。任意の各頂点独立な $R_i\in O(2)$ への正規直交フレーム変更に伴って、同じ幾何的線形写像の新表示が

$$
\widetilde K_{ij}=R_i^{\mathsf T}K_{ij}R_j
$$

> となるとき、そのカーネルをゲージ整合とする。このとき有限グラフ畳み込みを

$$
(\mathcal Kc)_i=\sum_{j\in N(i)}K_{ij}c_j
$$

> と定める。$K_{ij}$ は入力特徴や幾何から作ってよいが、その生成規則も上の変換則を満たすものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl41-kernel-covariance -->
**定義の確認：輸送のスカラー倍。** $K_{ij}=w_{ij}T_{ij}$ と選べば、重みがフレーム不変であることと[輸送の変換則](../MFL40/index.md#thm-mfl40-transport-gauge)から

$$
\widetilde K_{ij}
=w_{ij}\widetilde T_{ij}
=R_i^{\mathsf T}(w_{ij}T_{ij})R_j.
$$

$K_{ij}$ は $2\times2$ で、出発側 $R_j$ と到着側 $R_i^{\mathsf T}$ の両方を満たす。したがって和の各項も到着点の二成分となる。自己辺なら $K_{ii}=a_iI_2$ でよく、$R_i^{\mathsf T}(a_iI_2)R_i=a_iI_2$ が成立する。
<!-- definition-example-end -->

<a id="thm-mfl41-kernel-criterion"></a>
<!-- formal-statement-start -->
> **定理（全入力に対するゲージ等変性の必要十分条件）**  
> 頂点集合・有向辺集合・近傍を固定した有限グラフで、各入力 $c_j\in\mathbb R^2$ を独立に変えられ、各フレーム変更 $R_i\in O(2)$ に対して出力を $R_i^{\mathsf T}$ で変換するものとする。元の作用素 $\mathcal K$ と新しい表示の作用素 $\widetilde{\mathcal K}$ が同じ辺集合上の線形和で定まるとする。このときすべての入力 $c$ とすべての局所フレーム変更について

$$
(\widetilde{\mathcal K}\widetilde c)_i
=R_i^{\mathsf T}(\mathcal Kc)_i
$$

> が成り立つことと、各辺について

$$
\widetilde K_{ij}=R_i^{\mathsf T}K_{ij}R_j
$$

> が成り立つことは同値である。ただし、同じ送り手 $j$ から到着点 $i$ への寄与は一つの行列 $K_{ij}$ に合算しておく。
<!-- formal-statement-end -->

### 証明の見取り図

十分性は輸送付き集約と同じ相殺である。必要性では、ある送り手 $j$ だけに任意の二成分入力を置いて他を零にする。全入力での等変性が、個々の行列の一致を強制する。

<!-- proof-start -->
### 証明

整合条件が成立すれば、$\widetilde c_j=R_j^{\mathsf T}c_j$ を代入して

$$
\widetilde K_{ij}\widetilde c_j
=R_i^{\mathsf T}K_{ij}R_jR_j^{\mathsf T}c_j
=R_i^{\mathsf T}K_{ij}c_j.
$$

有限和をとれば十分性を得る。逆に、任意の辺 $j\to i$ と任意の $u\in\mathbb R^2$ を固定し、$c_j=u$、$c_k=0$ ($k\ne j$) とおく。この入力とフレーム変更後の入力を等変性の式に入れると

$$
\widetilde K_{ij}R_j^{\mathsf T}u
=R_i^{\mathsf T}K_{ij}u.
$$

$u$ は任意なので行列として $\widetilde K_{ij}R_j^{\mathsf T}=R_i^{\mathsf T}K_{ij}$。右から $R_j$ を掛け、$R_j^{\mathsf T}R_j=I_2$ を用いると主張が従う。$\square$
<!-- proof-end -->

ここで重要なのは、**数値行列をフレーム変更の前後で同じまま保持すること**と、**同じ幾何的写像を新しい軸で再表示すること**の区別である。固定行列を全頂点で使い回す実装は、一般には上の必要条件を満たさない。

### 幾何が教えてくれる異方性

単なる $aT_{ij}$ のほかに、辺の到着点で意味のある単位接方向 $d_i\in\mathbb R^2$ が分かる場合を考える。出発点には $d_j=T_{ij}^{\mathsf T}d_i$ を逆輸送して作る。$T_{ij}$ は直交だから両方とも単位長である。実数 $a,b$ がフレーム不変なら

$$
K_{ij}=aT_{ij}+b,d_id_j^{\mathsf T}
$$

とできる。後半は送り手の方向 $d_j$ に沿う成分を取り出して到着点の方向 $d_i$ に載せる階数一の写像である。$\widetilde d_i=R_i^{\mathsf T}d_i$ と[輸送の両端則](../MFL40/index.md#thm-mfl40-transport-gauge)から $\widetilde d_j=\widetilde T_{ij}^{\mathsf T}\widetilde d_i=R_j^{\mathsf T}d_j$。よって

$$
\begin{aligned}
\widetilde K_{ij}
&=aR_i^{\mathsf T}T_{ij}R_j
 +b(R_i^{\mathsf T}d_i)(R_j^{\mathsf T}d_j)^{\mathsf T}\\
&=R_i^{\mathsf T}(aT_{ij}+bd_id_j^{\mathsf T})R_j.
\end{aligned}
$$

これは**フレームに依存しない幾何的な方向情報があるから**異方性を許す例である。方向 $d_i$ を「各フレームの第一座標軸」として固定してしまうと、フレーム変更後に同じ物理方向を指さず、証明は成立しない。

## 4. 重み共有、反射、非線形性

一見すると、学習可能な $2\times2$ 行列 $A$ を輸送後へ掛けて $AT_{ij}c_j$ とするだけで豊かな層ができる。しかし $A$ を全フレームで同じ数値に固定すると、新しい表示 $A\widetilde T_{ij}\widetilde c_j$ が正しく変換するには $AR_i^{\mathsf T}=R_i^{\mathsf T}A$ が必要となる。これは**あらゆる** $R_i\in O(2)$ と可換でなければならないという強い制約である。

<a id="prop-mfl41-fixed-channel-matrix"></a>
<!-- formal-statement-start -->
> **命題（O(2)等変な固定チャネル行列）**  
> $A\in\mathbb R^{2\times2}$ を任意の正規直交フレームで同じ数値行列として使うものとする。すべての $R\in O(2)$、$u\in\mathbb R^2$ について $A R^{\mathsf T}u=R^{\mathsf T}Au$ が成り立つための必要十分条件は、ある実数 $a$ によって $A=aI_2$ と書けることである。変換を $SO(2)$ の回転のみに制限すると、必要十分条件は $A=aI_2+bJ$ となる。ただし

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$90$ 度回転 $J$ との可換性が二成分を二係数へ絞る。さらに鏡映 $S=\operatorname{diag}(1,-1)$ との可換性が $J$ の係数を消す。回転のみなら $J$ は全回転と可換である。

<!-- proof-start -->
### 証明

$A=\begin{pmatrix}p&q\\r&s\end{pmatrix}$ とおく。$AJ=JA$ を成分ごとに計算すると

$$
AJ=\begin{pmatrix}q&-p\\s&-r\end{pmatrix},\qquad
JA=\begin{pmatrix}-r&-s\\p&q\end{pmatrix}.
$$

ゆえに $q=-r$、$p=s$ であり、$A=pI_2+rJ$ と書ける。二次元の任意の回転行列は $R(\theta)=\cos\theta I_2+\sin\theta J$ だから、この形の $A$ は任意の回転と可換である。一方、鏡映 $S=\operatorname{diag}(1,-1)$ は $SJ=-JS$ を満たす。$AS=SA$ を $A=pI_2+rJ$ に代入すれば $2rJS=0$、$JS$ は可逆なので $r=0$。逆に $pI_2$ はすべての直交行列と可換である。$\square$
<!-- proof-end -->

**誤実装の小例。** $A=\operatorname{diag}(2,1)$、$u=(1,0)^{\mathsf T}$、$R=R(\pi/2)$ なら

$$
AR^{\mathsf T}u=(0,-1)^{\mathsf T},\qquad
R^{\mathsf T}Au=(0,-2)^{\mathsf T}.
$$

二つは異なる。$T$ を正しく更新しても、到着点で固定 $A$ を掛けたことで、出力のフレーム等変性が壊れた。一方、$J$ を含む $A$ は**回転についてだけ**許される。$O(2)$ を主張するなら鏡映でも試さなければならない。

線形な等変層の後に、特徴ごとの成分別ReLUを付けたらどうだろう。座標軸の回転は成分を混ぜるため一般に失敗する。代わりにベクトル長だけで係数を変えれば方向を保てる。[MFL25の表現に整合する活性化](../MFL25/index.md#def-mfl25-equivariant-activation)の有限メッシュ版である。

<a id="def-mfl41-radial-gate"></a>
<!-- formal-statement-start -->
> **定義（ノルムゲート）**  
> 任意の関数 $\varphi:[0,\infty)\to\mathbb R$ を選び、$u\in\mathbb R^2$ に対して

$$
\sigma_\varphi(u)=\varphi(u^{\mathsf T}u)u
$$

> を定める。$u=0$ では値を零とする。$\varphi$ は全非負実数で定義されていればよく、ここで連続性は仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl41-radial-gate -->
**定義の確認。** $\varphi(s)=1/(1+s)$ なら $u=(3,4)^{\mathsf T}$ に対して $u^{\mathsf T}u=25$ であり、$\sigma_\varphi(u)=(3,4)^{\mathsf T}/26$。$R\in O(2)$ なら $|R^{\mathsf T}u|^2=u^{\mathsf T}RR^{\mathsf T}u=25$ なので、新フレームでは $R^{\mathsf T}(3,4)^{\mathsf T}/26$ となる。内積も零点も定義通りである。
<!-- definition-example-end -->

<a id="thm-mfl41-layer-composition"></a>
<!-- formal-statement-start -->
> **定理（輸送付き畳み込みとノルムゲートの合成）**  
> 有限有向グラフの各辺にゲージ整合カーネル $K_{ij}\in\mathbb R^{2\times2}$ を与え、各点の独立な $O(2)$ フレーム変更で $\widetilde K_{ij}=R_i^{\mathsf T}K_{ij}R_j$ が成り立つとする。$\varphi:[0,\infty)\to\mathbb R$ とし

$$
F(c)_i=\sigma_\varphi\left(\sum_{j\in N(i)}K_{ij}c_j\right)
$$

> と置けば、すべての $c$ とすべての局所ゲージ変更に対して

$$
F_{\widetilde K}(\widetilde c)_i=R_i^{\mathsf T}F_K(c)_i
$$

> が成り立つ。各層のカーネル生成規則もゲージ整合である限り、この形の層を有限回合成しても等変である。
<!-- formal-statement-end -->

### 証明の見取り図

まずカーネル条件により線形集約後の二成分は到着点の $R_i^{\mathsf T}$ で変わる。その直交行列がベクトルの長さを保つため、ゲート係数は変わらない。次層の入力も正しい型になる。

<!-- proof-start -->
### 証明

[カーネルの必要十分条件](#thm-mfl41-kernel-criterion)の十分性を適用し、$z_i=\sum_jK_{ij}c_j$、$\widetilde z_i=\sum_j\widetilde K_{ij}\widetilde c_j$ とおくと $\widetilde z_i=R_i^{\mathsf T}z_i$ である。直交性より

$$
\widetilde z_i^{\mathsf T}\widetilde z_i
=z_i^{\mathsf T}R_iR_i^{\mathsf T}z_i
=z_i^{\mathsf T}z_i.
$$

従ってゲートの定義を各点で用いれば

$$
\begin{aligned}
\sigma_\varphi(\widetilde z_i)
&=\varphi(\widetilde z_i^{\mathsf T}\widetilde z_i)\widetilde z_i\\
&=\varphi(z_i^{\mathsf T}z_i)R_i^{\mathsf T}z_i\\
&=R_i^{\mathsf T}\sigma_\varphi(z_i).
\end{aligned}
$$

これは零ベクトルにも成立する。[MFL25の等変層の合成定理](../MFL25/index.md#thm-mfl25-composition)と同じ論理で、各層の出力が次層で正しい変換型の入力になるため帰納的に有限回合成が成り立つ。$\square$
<!-- proof-end -->

**スカラー読み出し。** 各点で $|F(c)_i|^2$ を測ればゲージ不変な数になる。さらに頂点の重み $\mu_i$ がフレームに依存しなければ $\sum_i\mu_i|F(c)_i|^2$ も不変である。ただし不変量に潰すと方向の情報は失われる。等変な中間特徴と不変な最終出力は用途で区別する。

## 5. 決定論的な検算ラボ

三頂点の直交輸送模型で、すべての入力を独立に回し、一部を鏡映した場合も評価する。各点への線形和とノルムゲートの後に $\widetilde F_i-R_i^{\mathsf T}F_i$ の長さを出す。対照として輸送を省いた場合、固定異方行列 $A=\operatorname{diag}(2,1)$ を掛けた場合の残差を示す。これは**行列恒等式の浮動小数点検査**であって、メッシュ細分化誤差、学習の汎化誤差、曲面上の真の平行移動の精度保証ではない。

~~~python
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL41/gauge_convolution_lab.py
# timeout-ms: 60000
# lab-preset: 独立回転と反射 | --self-test
# lab-preset: 角度を変更した三頂点 | --alpha 0.2 --beta -0.8 --gamma 1.3
~~~

## 6. 演習

### Level A：成分と添字の基礎

<a id="ex-mfl41-a01"></a>
**A01（輸送の順序）。** 二点の辺 $2\to1$ に $T_{12}=R(\pi/2)$、$c_2=(1,2)^{\mathsf T}$、$w_{12}=3$ を与える。$N(1)=\{2\}$ の輸送付き集約を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 回転行列は $R(\pi/2)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$。したがって

$$
T_{12}c_2=(-2,1)^{\mathsf T},\qquad
(L_Tc)_1=3(-2,1)^{\mathsf T}=(-6,3)^{\mathsf T}.
$$

二成分は到着頂点1の軸で表す。出発側の軸で足していないことが重要である。
<!-- solution-end -->

<a id="ex-mfl41-a02"></a>
**A02（両端変換）。** $T_{12}=I_2$、$R_1=R(\pi/2)$、$R_2=R(-\pi/2)$、$c_2=(1,0)^{\mathsf T}$ とする。新輸送行列と新入力成分、およびその積を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [MFL40の両端変換則](../MFL40/index.md#thm-mfl40-transport-gauge)に $T_{12}=I_2$ を代入すると

$$
\widetilde T_{12}=R(-\pi/2)I_2R(-\pi/2)=R(-\pi)=-I_2.
$$

入力の逆変換は $\widetilde c_2=R_2^{\mathsf T}c_2=R(\pi/2)(1,0)^{\mathsf T}=(0,1)^{\mathsf T}$。よって $\widetilde T_{12}\widetilde c_2=(0,-1)^{\mathsf T}$。旧輸送結果は $(1,0)^{\mathsf T}$ で、到着側の $R_1^{\mathsf T}=R(-\pi/2)$ を作用させた値とも一致する。
<!-- solution-end -->

<a id="ex-mfl41-a03"></a>
**A03（必要条件を一入力で読む）。** $N(1)=\{2\}$、$K_{12}=\operatorname{diag}(2,1)$、$R_1=R(\pi/2)$、$R_2=I_2$ とする。同じ幾何的写像の新行列を求めよ。数値行列 $K_{12}$ をそのまま使うことが失敗する入力を一つ示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 同じ写像の新行列は

$$
\widetilde K_{12}=R(-\pi/2)\begin{pmatrix}2&0\\0&1\end{pmatrix}
=\begin{pmatrix}0&1\\-2&0\end{pmatrix}.
$$

$c_2=(1,0)^{\mathsf T}$ とすれば、旧出力は $(2,0)^{\mathsf T}$、到着点の新成分は $(0,-2)^{\mathsf T}$ である。固定したままの $K_{12}$ は $(2,0)^{\mathsf T}$ を返し、相違する。$R_2=I$ のため入力の変換だけではこの違いを直せない。
<!-- solution-end -->

<a id="ex-mfl41-a04"></a>
**A04（ゲートの検算）。** $\sigma(u)=u/(1+|u|^2)$、$u=(1,2)^{\mathsf T}$、$R=\operatorname{diag}(1,-1)$ とする。$\sigma(R^{\mathsf T}u)=R^{\mathsf T}\sigma(u)$ を両辺直接計算して確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $|u|^2=1+4=5$ だから $\sigma(u)=(1,2)^{\mathsf T}/6$。$R^{\mathsf T}u=(1,-2)^{\mathsf T}$ も長さの二乗が5なので

$$
\sigma(R^{\mathsf T}u)=(1,-2)^{\mathsf T}/6
=R^{\mathsf T}(1,2)^{\mathsf T}/6.
$$

直交行列でノルムが変わらず、係数が変わらないことを確認した。
<!-- solution-end -->

### Level B：層の設計条件を調べる

<a id="ex-mfl41-b01"></a>
**B01（フレーム依存重みの落とし穴）。** $N(1)=\{2\}$、$T_{12}=I_2$、$c_2=(1,0)^{\mathsf T}$ とする。$w_{12}=1+(c_2)_1^2$ を「出発側の第一成分」から毎回作る実装を考える。$R_1=I_2$、$R_2=R(\pi/2)$ の下で出力が等変でないことを計算し、代わりに $w_{12}=1+|c_2|^2$ とすればよい理由を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 旧重みは $1+1^2=2$、旧出力は $(2,0)^{\mathsf T}$。新入力は $\widetilde c_2=(0,-1)^{\mathsf T}$ なので新重みは $1+0^2=1$。輸送は[両端則](../MFL40/index.md#thm-mfl40-transport-gauge)で $\widetilde T_{12}=R(\pi/2)$、従って新出力は $1\cdot R(\pi/2)(0,-1)^{\mathsf T}=(1,0)^{\mathsf T}$。到着フレームは不変なので旧出力との不一致は1である。重みが不変という[輸送付き等変性定理](#thm-mfl41-transport-equivariance)の仮定を失ったため、和の外へ同一重みを取り出せない。

一方、$|\widetilde c_2|^2=c_2^{\mathsf T}R_2R_2^{\mathsf T}c_2=|c_2|^2=1$ なので、新旧の重みはいずれも2。この場合、新出力は $(2,0)^{\mathsf T}$ と一致する。
<!-- solution-end -->

<a id="ex-mfl41-b02"></a>
**B02（方向選択核）。** $T_{12}=I_2$、$d_1=(1,0)^{\mathsf T}$、$d_2=T_{12}^{\mathsf T}d_1$、$a=1$、$b=2$ とする。$K_{12}=aT_{12}+bd_1d_2^{\mathsf T}$ を求め、$R_1=R(\pi/2)$、$R_2=I_2$ の後の行列を「方向と輸送を先に変換する方法」と「両端変換則」からそれぞれ求めて一致を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $d_2=(1,0)^{\mathsf T}$ なので

$$
K_{12}=I_2+2\begin{pmatrix}1&0\\0&0\end{pmatrix}
=\begin{pmatrix}3&0\\0&1\end{pmatrix}.
$$

新輸送は $\widetilde T_{12}=R(-\pi/2)$、新方向は $\widetilde d_1=R(-\pi/2)d_1=(0,-1)^{\mathsf T}$ と $\widetilde d_2=(1,0)^{\mathsf T}$ である。よって

$$
\widetilde K_{12}
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
 +2\begin{pmatrix}0&0\\-1&0\end{pmatrix}
=\begin{pmatrix}0&1\\-3&0\end{pmatrix}.
$$

もう一方の方法では $R_1^{\mathsf T}K_{12}R_2=R(-\pi/2)\operatorname{diag}(3,1)$ となり、直接掛けても同じ行列を得る。元の方向が物理的に同じであるという条件を使った。
<!-- solution-end -->

<a id="ex-mfl41-b03"></a>
**B03（回転と鏡映の違い）。** $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ に対し、任意の二次元回転 $R(\theta)$ と $J$ が可換であることを示せ。一方 $S=\operatorname{diag}(1,-1)$ を使い、$JS\ne SJ$ を確かめよ。その結果、固定 $A=I_2+J$ を用いる層は $SO(2)$ と $O(2)$ のどちらに等変か答えよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $J^2=-I_2$ より $R(\theta)=\cos\theta I_2+\sin\theta J$ なので

$$
JR(\theta)=\cos\theta J-\sin\theta I_2
=R(\theta)J.
$$

また $JS=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$SJ=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}=-JS$。従って $AS= S+JS$ と $SA=S+SJ=S-JS$ は異なる。[固定チャネル行列の命題](#prop-mfl41-fixed-channel-matrix)の必要条件に従い、全頂点で独立な回転だけに等変で、鏡映を含む $O(2)$ には一般には等変でない。
<!-- solution-end -->

<a id="ex-mfl41-b04"></a>
**B04（非線形性の反例と修復）。** $u=(-1,1)^{\mathsf T}$ と $R=-I_2$ を用いて成分別ReLUが $O(2)$ 等変でないことを示せ。さらに $\varphi(s)=\max(0,2-s)$ で作ったノルムゲートなら、どのような $R\in O(2)$ に対しても等変であることを一般の $u$ で証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\operatorname{ReLU}(u)=(0,1)^{\mathsf T}$ なので $R^{\mathsf T}\operatorname{ReLU}(u)=(0,-1)^{\mathsf T}$。一方、$R^{\mathsf T}u=(1,-1)^{\mathsf T}$ にReLUを掛けると $(1,0)^{\mathsf T}$ になり異なる。成分ごとの正負判定が基底の変更と整合しないためである。

ノルムゲートの場合は $|R^{\mathsf T}u|^2=u^{\mathsf T}RR^{\mathsf T}u=|u|^2$ だから

$$
\begin{aligned}
\sigma_\varphi(R^{\mathsf T}u)
&=\max(0,2-|R^{\mathsf T}u|^2)R^{\mathsf T}u\\
&=R^{\mathsf T}\max(0,2-|u|^2)u
=R^{\mathsf T}\sigma_\varphi(u).
\end{aligned}
$$

零点でも両辺が零になるため例外はない。
<!-- solution-end -->

### Level C：輸送・方向・ゲートの統合

<a id="ex-mfl41-c01"></a>
**C01（有限メッシュの型付き層を設計する）。** 三頂点 $I=\{1,2,3\}$ について $N(1)=\{2,3\}$、$N(2)=\{1\}$、$N(3)=\{1\}$ とする。辺輸送 $T_{ij}\in O(2)$ と、各到着点の辺ごとの単位方向 $d_{ij}\in\mathbb R^2$ を与え、$d_{ji}=T_{ij}^{\mathsf T}d_{ij}$ が成り立つとする。$a_{ij},b_{ij}$ をフレーム不変な実数として

$$
K_{ij}=a_{ij}T_{ij}+b_{ij}d_{ij}d_{ji}^{\mathsf T},
\qquad F(c)_i=\frac{z_i}{1+|z_i|^2},
\quad z_i=\sum_{j\in N(i)}K_{ij}c_j
$$

と定める。以下を示せ。

1. 任意の各頂点独立な $R_i\in O(2)$ のもとで、幾何的方向の新成分も正しく変換すれば $F$ は等変である。
2. $K_{ij}=T_{ij}$、$T_{12}=T_{13}=I_2$、$c_2=(1,0)^{\mathsf T}$、$c_3=(0,1)^{\mathsf T}$ なら $F(c)_1$ を計算せよ。
3. 第2問の結果のノルム二乗が、頂点1のどの直交フレーム変更でも不変であることを式で確かめよ。

- Level: C

<!-- solution-start -->
**詳細解答。** まずどの点の成分かを固定する。$d_{ij}$ は到着点 $i$、$d_{ji}$ は出発点 $j$ の成分であり、両方が単位長である。各辺で $\widetilde T_{ij}=R_i^{\mathsf T}T_{ij}R_j$、$\widetilde d_{ij}=R_i^{\mathsf T}d_{ij}$ とすると

$$
\begin{aligned}
\widetilde d_{ji}
&=\widetilde T_{ij}^{\mathsf T}\widetilde d_{ij}\\
&=R_j^{\mathsf T}T_{ij}^{\mathsf T}R_iR_i^{\mathsf T}d_{ij}\\
&=R_j^{\mathsf T}d_{ji}.
\end{aligned}
$$

従って

$$
\begin{aligned}
\widetilde K_{ij}
&=a_{ij}R_i^{\mathsf T}T_{ij}R_j
 +b_{ij}(R_i^{\mathsf T}d_{ij})(R_j^{\mathsf T}d_{ji})^{\mathsf T}\\
&=R_i^{\mathsf T}K_{ij}R_j.
\end{aligned}
$$

[カーネルの十分条件](#thm-mfl41-kernel-criterion)を各辺へ適用すると $\widetilde z_i=R_i^{\mathsf T}z_i$ となる。[ノルムゲートの合成定理](#thm-mfl41-layer-composition)で $\widetilde F_i=R_i^{\mathsf T}F_i$ が従い、すべての頂点に成立する。近傍や係数がフレーム不変であることが必要である。

第2問では頂点1に入る二本がともに恒等輸送だから

$$
z_1=c_2+c_3=(1,1)^{\mathsf T},\qquad |z_1|^2=2,
\qquad F(c)_1=(1,1)^{\mathsf T}/3.
$$

第3問では $R_1^{\mathsf T}R_1=I_2$ なので

$$
|\widetilde F(c)_1|^2
=\frac{(1,1)R_1R_1^{\mathsf T}(1,1)^{\mathsf T}}{9}
=\frac29=|F(c)_1|^2.
$$

成分は一般に変わるが、その長さは不変である。これは離散輸送を真の曲面で近似したときの精度を主張しない。
<!-- solution-end -->

## 7. この章から次へ

同じ幾何的な特徴でも、点ごとのフレームを取り替えると表示が変わる。輸送とカーネルの**両端変換**を合わせれば、有限グラフ上の線形層とノルムゲートは厳密に等変になる。反面、任意の固定行列や成分別ReLUを使えば、その性質は破れる。現実のメッシュ上では「輸送行列をどれだけ正確に近似したか」「離散化を細かくすると何へ近づくか」をさらに問わなければならない。
