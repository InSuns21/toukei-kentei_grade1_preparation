# SGT2 正規化Laplacianとランダムウォーク

[SGT1のDirichletエネルギーの辺表示](../SGT1/index.md#thm-sgt1-dirichlet)から、組合せLaplacianは頂点上の値の変化を測る行列であると分かりました。しかし次数が100の頂点と次数が1の頂点では、同じ値を置いても多くの辺を持つ前者が二次形式に強く影響します。次数の異なるグラフを比較するには、各頂点の次数で大きさをそろえたいところです。

もう一つの見方があります。頂点にいる粒子が辺の重みに比例して次の頂点へ移るとき、その一歩の規則は確率行列になります。次数で補正した行列とこの遷移行列は、座標の取り方を変えた同じ演算子です。本章では孤立頂点で逆数を取らないよう定義域を先に確定し、固有値・定常分布・変分表示まで証明します。収束速度や混合時間の一般論は後の章で扱います。

## 1. 次数ゼロの頂点を先に分ける

[SGT1の重み付き次数・体積の定義](../SGT1/index.md#def-sgt1-degree-volume)を使います。$W=(w_{ij})$ は有限無向グラフの非負対称な隣接行列で、$w_{ii}=0$ とします。次数 $d_i=\sum_jw_{ij}$ が零である頂点では、その行の重みはすべて零です。したがってその頂点を除いても、残る頂点間の重みは変わりません。

<a id="def-sgt2-positive-degree"></a>

<!-- formal-statement-start -->
> **定義（正次数頂点集合）**  
> 有限無向非負重み付きグラフ $(V,W)$ に対して
>
$$
V_+=\{i\in V:d_i>0\},\qquad V_0=V\setminus V_+
$$
>
> と定める。$V_+\ne\varnothing$ のとき、$V_+$ 上の主小行列を $W_+$ とし、その次数行列を $D_+=\operatorname{diag}(d_i:i\in V_+)$ とする。$D_+^{-1}$ と $D_+^{-1/2}$ はこの空間上で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt2-positive-degree -->
### 例：孤立頂点を含む道

**定義の確認**：頂点1と2の間を重み2、頂点2と3の間を重み1で結び、頂点4を孤立させます。このとき
$$
(d_1,d_2,d_3,d_4)=(2,3,1,0),\quad
V_+=\{1,2,3\},\quad V_0=\{4\}.
$$

$D=\operatorname{diag}(2,3,1,0)$ に逆行列はありません。一方、$D_+=\operatorname{diag}(2,3,1)$ には逆行列があります。以下の正規化はこの三頂点上で行い、孤立頂点の扱いを暗黙の $0/0$ に任せません。
<!-- definition-example-end -->

$V_+=\varnothing$ なら全ての重みは零で、辺に沿う一歩の遷移確率を定義できません。その場合も元の組合せLaplacianは零行列ですが、本章の確率行列と正規化Laplacianは定義しません。以降は **$V_+\ne\varnothing$** を仮定し、行列の添字は $V_+$ 上で取ります。この集合には必ず二つ以上の頂点があります。実際、$d_i>0$ なら、$w_{ii}=0$ より $w_{ij}>0$ となる別の頂点 $j$ が存在し、その $d_j$ も正です。

## 2. 二通りの正規化とエネルギー

次数の平方根を使えば対称行列の利点を保てます。一方、次数そのもので割れば行和が零になり、確率とのつながりが見えます。まず両方を定義します。

<a id="def-sgt2-normalized"></a>

<!-- formal-statement-start -->
> **定義（対称正規化Laplacianとrandom-walk Laplacian）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフについて、$L_+=D_+-W_+$ とし、$V_+$ 上の二行列を
>
$$
\mathcal L= D_+^{-1/2}L_+D_+^{-1/2}
=I-D_+^{-1/2}W_+D_+^{-1/2},
$$
$$
L_{\mathrm{rw}}=D_+^{-1}L_+=I-D_+^{-1}W_+
$$
>
> で定義する。前者を対称正規化Laplacian、後者をrandom-walk Laplacianという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt2-normalized -->
### 例：重み2と1の道

**定義の確認**：三頂点道の次数 $(2,3,1)$ に対して
$$
D_+^{-1/2}W_+D_+^{-1/2}
=\begin{pmatrix}
0&\sqrt{2/3}&0\\
\sqrt{2/3}&0&1/\sqrt3\\
0&1/\sqrt3&0
\end{pmatrix}.
$$

従って $\mathcal L$ はこの行列を $I$ から引いた対称行列です。他方、$D_+^{-1}W_+$ の第2行は $(2/3,0,1/3)$ です。両者の成分は一致しませんが、固有値は一致することを次で確かめます。
<!-- definition-example-end -->

<a id="prop-sgt2-similarity"></a>

<!-- formal-statement-start -->
> **命題（正規化Laplacianの相似性）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフでは
>
$$
\mathcal L=D_+^{1/2}L_{\mathrm{rw}}D_+^{-1/2}.
$$
>
> 特に $\mathcal L$ と $L_{\mathrm{rw}}$ は同じ固有値を重複度込みで持つ。$L_{\mathrm{rw}}f=\lambda f$ と $u=D_+^{1/2}f$ は $\mathcal Lu=\lambda u$ に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

定義式の間に $D_+^{1/2}$ と $D_+^{-1/2}$ を挿入します。$d_i>0$ とした理由は、これらが互いに逆であることを保証するためです。

<!-- proof-start -->
### 証明

$D_+^{1/2}D_+^{-1}=D_+^{-1/2}$ なので
$$
\begin{aligned}
D_+^{1/2}L_{\mathrm{rw}}D_+^{-1/2}
&=D_+^{1/2}(I-D_+^{-1}W_+)D_+^{-1/2}\\
&=I-D_+^{1/2}D_+^{-1}W_+D_+^{-1/2}\\
&=I-D_+^{-1/2}W_+D_+^{-1/2}
=\mathcal L.
\end{aligned}
$$

$L_{\mathrm{rw}}f=\lambda f$ の両辺に $D_+^{1/2}$ を掛け、$f=D_+^{-1/2}u$ と置くと
$$
\mathcal Lu
=D_+^{1/2}L_{\mathrm{rw}}D_+^{-1/2}u
=\lambda D_+^{1/2}f
=\lambda u.
$$

逆向きも $D_+^{-1/2}$ を掛ければ成り立ちます。さらに相似変換は特性多項式を保つため、固有値と代数的重複度が一致します。
<!-- proof-end -->

正規化しても、辺の差の二乗という核心は失われません。何を「頂点の値」とみなすかが変わるだけです。

<a id="thm-sgt2-energy"></a>

<!-- formal-statement-start -->
> **定理（正規化Dirichletエネルギー）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフについて、全ての $u\in\mathbb R^{V_+}$ に対し
>
$$
u^{\mathsf T}\mathcal Lu
=\sum_{\substack{i<j\\i,j\in V_+}}
w_{ij}\left(\frac{u_i}{\sqrt{d_i}}-\frac{u_j}{\sqrt{d_j}}\right)^2
\geq0.
$$
>
> また全ての $f\in\mathbb R^{V_+}$ に対し
>
$$
f^{\mathsf T}L_+f
=\sum_{i<j}w_{ij}(f_i-f_j)^2,\qquad
f^{\mathsf T}D_+f=\sum_i d_if_i^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$u$ を $g=D_+^{-1/2}u$ と書き換えると、正規化の二次形式はもとの組合せLaplacianの二次形式です。したがって[SGT1の辺表示](../SGT1/index.md#thm-sgt1-dirichlet)を $g$ に適用できます。

<!-- proof-start -->
### 証明

$D_+^{-1/2}$ は対角で対称です。従って $g=D_+^{-1/2}u$ とおけば
$$
u^{\mathsf T}\mathcal Lu
=u^{\mathsf T}D_+^{-1/2}L_+D_+^{-1/2}u
=g^{\mathsf T}L_+g.
$$

[組合せLaplacianのDirichletエネルギー公式](../SGT1/index.md#thm-sgt1-dirichlet)を $V_+$ 上の $g$ に用いると
$$
g^{\mathsf T}L_+g
=\sum_{i<j}w_{ij}(g_i-g_j)^2
=\sum_{i<j}w_{ij}
\left(\frac{u_i}{\sqrt{d_i}}-\frac{u_j}{\sqrt{d_j}}\right)^2.
$$

各 $w_{ij}\geq0$ なので非負です。二番目の表示は同じ公式に $f$ を代入したものです。最後の式は対角行列 $D_+$ の行列積を成分表示して得られます。
<!-- proof-end -->

<a id="thm-sgt2-spectrum-kernel"></a>

<!-- formal-statement-start -->
> **定理（正規化スペクトルの範囲と核）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフの $\mathcal L$ の固有値はすべて実数で、区間 $[0,2]$ に含まれる。$V_+$ が正重みの道で定まるグラフの連結成分を $k$ 個持てば、零固有値の重複度は $k$ である。各成分 $C$ に対応する核のベクトルは
>
$$
u^{(C)}_i=
\begin{cases}
\sqrt{d_i}&(i\in C),\\
0&(i\notin C)
\end{cases}
$$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

非負性はエネルギー表示から得られます。上界2には $(a-b)^2\leq2(a^2+b^2)$ を辺ごとに使います。核については、エネルギー零が各成分で $u_i/\sqrt{d_i}$ を一定にすることに注意します。

<!-- proof-start -->
### 証明

$\mathcal L$ は実対称なので、[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により実固有値と直交固有ベクトルを持ちます。任意の $u$ に対し[正規化Dirichletエネルギー](#thm-sgt2-energy)は $u^{\mathsf T}\mathcal Lu\geq0$ を与えます。

$g_i=u_i/\sqrt{d_i}$ とします。実数 $a,b$ について
$$
2(a^2+b^2)-(a-b)^2=(a+b)^2\geq0
$$
です。ゆえに
$$
\begin{aligned}
u^{\mathsf T}\mathcal Lu
&=\sum_{i<j}w_{ij}(g_i-g_j)^2\\
&\leq2\sum_{i<j}w_{ij}(g_i^2+g_j^2)\\
&=2\sum_i d_ig_i^2
=2\sum_i u_i^2.
\end{aligned}
$$

最後から二番目では頂点 $i$ の $g_i^2$ が、接続する全ての辺の重みの合計 $d_i$ だけ現れることを使いました。固有ベクトル $u\ne0$ に対し $u^{\mathsf T}\mathcal Lu=\lambda\lVert u\rVert^2$ だから、両側の評価を $\lVert u\rVert^2$ で割って $0\leq\lambda\leq2$ が出ます。

核について、$\mathcal Lu=0$ なら $u^{\mathsf T}\mathcal Lu=0$ です。各辺の寄与は非負で、その和が零なので、$w_{ij}>0$ の各辺に対し $g_i=g_j$ です。[SGT1の核とグラフの連結成分の定理](../SGT1/index.md#thm-sgt1-kernel-components)と同じ正重みの道をたどれば、$g$ は各成分で一定です。従って $u_i=c_C\sqrt{d_i}$ と書けます。

逆にこの形の $u$ では各辺の両端で $g_i=g_j$ なので $L_+g=0$、ゆえに $\mathcal Lu=D_+^{-1/2}L_+g=0$ です。各 $u^{(C)}$ は互いに台が交わらず零でないため一次独立で、任意の核ベクトルはそれらの一次結合です。従って核の次元は $k$ です。実対称行列は対角化可能なので、零固有値の重複度も $k$ です。
<!-- proof-end -->

正重みの辺が二つの頂点を結ぶだけのグラフなら
$$
\mathcal L=
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

固有ベクトル $(1,1)^{\mathsf T}$ と $(1,-1)^{\mathsf T}$ に対し固有値はそれぞれ0と2です。従って上界2は実際に達成され、単なる粗い評価ではありません。

## 3. 重み付きの一歩を確率へ変える

次数 $d_i$ は、頂点 $i$ から出る辺重みの合計でした。各辺重みをその合計で割れば、移動先の確率の合計は1になります。

<a id="def-sgt2-transition"></a>

<!-- formal-statement-start -->
> **定義（重み付きランダムウォークの遷移行列）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフで
>
$$
P=D_+^{-1}W_+,\qquad
P_{ij}=\frac{w_{ij}}{d_i}\quad (i,j\in V_+)
$$
>
> を遷移行列とする。確率を行ベクトル $q=(q_i)$ としたとき、一歩後の分布を $qP$ と定める。確率行ベクトル $\pi$ が $\pi P=\pi$ を満たすとき、$\pi$ を定常分布という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt2-transition -->
### 例：道の中央から次の頂点へ

**定義の確認**：重み2と1の三頂点道では
$$
P=\begin{pmatrix}
0&1&0\\
2/3&0&1/3\\
0&1&0
\end{pmatrix}.
$$

各成分は非負で、全ての行和が1です。中央の頂点2からは重み2の辺へ確率 $2/3$、重み1の辺へ確率 $1/3$ で移ります。$q=(0,1,0)$ を代入すると、一歩後は $qP=(2/3,0,1/3)$ です。
<!-- definition-example-end -->

定義から直ちに $L_{\mathrm{rw}}=I-P$ です。したがって $Pf=\rho f$ なら $L_{\mathrm{rw}}f=(1-\rho)f$ であり、[正規化Laplacianの相似性](#prop-sgt2-similarity)を合わせると、確率遷移と対称行列のスペクトルを行き来できます。

無向グラフには、辺の往復が同じ重みであるという対称性があります。定常分布は各頂点の次数に比例するはずですが、移動確率自体は一般に対称ではありません。釣り合いを式で確認します。

<a id="def-sgt2-detailed-balance"></a>

<!-- formal-statement-start -->
> **定義（詳細釣合い）**  
> 行確率遷移行列 $P$ と確率行ベクトル $\pi$ に対し、全ての $i,j$ について
>
$$
\pi_iP_{ij}=\pi_jP_{ji}
$$
>
> が成り立つとき、$(P,\pi)$ は詳細釣合いを満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt2-detailed-balance -->
### 例：左右で遷移確率は違っても釣り合う

**定義の確認**：三頂点道の体積は $2+3+1=6$ なので $\pi=(1/3,1/2,1/6)$ を考えます。辺 $\{1,2\}$ では
$$
\pi_1P_{12}=\frac13\cdot1=\frac13,\qquad
\pi_2P_{21}=\frac12\cdot\frac23=\frac13.
$$

辺 $\{2,3\}$ でも両辺は $1/6$、辺のない組では両辺は零です。このように $P_{ij}$ と $P_{ji}$ が異なっても、確率の流量は釣り合います。
<!-- definition-example-end -->

<a id="thm-sgt2-stationary"></a>

<!-- formal-statement-start -->
> **定理（次数分布の詳細釣合いと定常性）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフについて、全体積
>
$$
M=\sum_{i\in V_+}d_i>0
$$
>
> と $\pi_i=d_i/M$ を定めると、$\pi$ は確率分布で、$P=D_+^{-1}W_+$ に関する詳細釣合いと定常性 $\pi P=\pi$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

次数を遷移確率の分母に置くと、$\pi_i$ の次数と打ち消し合います。その結果は無向辺の重み $w_{ij}$ だけになります。詳細釣合いを移動元について足せば定常性になります。

<!-- proof-start -->
### 証明

全ての $d_i>0$ なので $\pi_i>0$ です。定義から
$$
\sum_i\pi_i=\frac1M\sum_i d_i=1.
$$

任意の $i,j\in V_+$ に対して
$$
\pi_iP_{ij}
=\frac{d_i}{M}\frac{w_{ij}}{d_i}
=\frac{w_{ij}}M
=\frac{w_{ji}}M
=\frac{d_j}{M}\frac{w_{ji}}{d_j}
=\pi_jP_{ji}.
$$

ここで $w_{ij}=w_{ji}$ は無向性によります。次に、任意の $j$ に対し
$$
(\pi P)_j
=\sum_i\pi_iP_{ij}
=\sum_i\pi_jP_{ji}
=\pi_j\sum_iP_{ji}
=\pi_j
$$
となります。最後の和は「出発点 $j$」の行和なので1です。従って $\pi P=\pi$ です。
<!-- proof-end -->

定常分布の一意性を示すには、どの二頂点も正重みの道で結ばれることが重要です。例えば互いにつながらない二つの成分があれば、そのどちらにどれだけ確率質量を置くかを自由に選べます。そこで連結な場合の一意性を、Markov連鎖の一般定理を使わずに示します。

<a id="thm-sgt2-unique-stationary"></a>

<!-- formal-statement-start -->
> **定理（連結グラフの定常分布の一意性）**  
> $V_+\ne\varnothing$ 上の正重みの辺からなるグラフが連結なら、$P=D_+^{-1}W_+$ の定常確率分布は
>
$$
\pi_i=\frac{d_i}{\sum_jd_j}
$$
>
> に限られる。複数のグラフの連結成分がある場合、各成分に正規化された次数分布へ非負の係数を掛け、係数の総和を1にした分布が定常分布の全体である。
<!-- formal-statement-end -->

### 証明の見取り図

別の定常分布 $\nu$ を一つ仮定し、$h_i=\nu_i/d_i$ と置きます。定常性は $h=Ph$ と同値です。$Ph$ は隣接頂点の値の重み付き平均なので、最大値を取る点では隣接する全ての点も同じ最大値となります。

<!-- proof-start -->
### 証明

$\nu P=\nu$ を満たす確率行ベクトル $\nu$ を取ります。$d_i>0$ なので $h_i=\nu_i/d_i$ と置けます。成分 $j$ における定常性は
$$
\nu_j
=\sum_i\nu_iP_{ij}
=\sum_i(d_ih_i)\frac{w_{ij}}{d_i}
=\sum_iw_{ij}h_i
=\sum_iw_{ji}h_i.
$$

両辺を $d_j$ で割れば
$$
h_j=\sum_i\frac{w_{ji}}{d_j}h_i
=\sum_iP_{ji}h_i.
$$

$h$ の最大値を $H$ とし、$h_j=H$ となる頂点 $j$ を選びます。全ての $h_i\leq H$、$P_{ji}\geq0$、$\sum_iP_{ji}=1$ なので
$$
0=H-h_j=\sum_iP_{ji}(H-h_i).
$$

右辺は非負項の和です。従って $P_{ji}>0$ の全ての $i$ で $h_i=H$ です。$P_{ji}>0$ と $w_{ji}>0$ は同値だから、正重みの道をたどって、連結成分の全ての点で $h=H$ となります。連結なら $h_i=c$ が全点で成り立ち、
$$
\nu_i=cd_i,\qquad 1=\sum_i\nu_i=cM,\qquad c=1/M.
$$

これで一意性が示されました。非連結の場合は同じ最大値の議論を各成分に別々に適用すると、$\nu_i=c_Cd_i$（$i\in C$）となります。各成分の確率質量を $\alpha_C=c_C\sum_{i\in C}d_i$ と書けば $\alpha_C\geq0$、$\sum_C\alpha_C=1$ です。逆に各成分は外へ遷移しないため、成分別次数分布を非負係数で加え（係数和を1とする）、得られる分布も定常です。
<!-- proof-end -->

## 4. 次数付き内積と変分表示

$P$ は対称とは限りません。普通の内積で $P$ の固有ベクトルを直交させようとすると困ります。一方、次数行列で重み付けした内積
$$
\langle f,g\rangle_D=f^{\mathsf T}D_+g=\sum_i d_if_ig_i
$$
を使うと、辺の無向性が自己随伴性として現れます。$d_i>0$ なのでこれは正定値な内積です。

<a id="prop-sgt2-weighted-adjoint"></a>

<!-- formal-statement-start -->
> **命題（遷移行列の重み付き自己随伴性）**  
> $V_+\ne\varnothing$ の有限無向非負重み付きグラフについて、任意の $f,g\in\mathbb R^{V_+}$ に対し
>
$$
\langle f,Pg\rangle_D=\langle Pf,g\rangle_D.
$$
>
> 特に $L_{\mathrm{rw}}=I-P$ もこの内積で自己随伴である。
<!-- formal-statement-end -->

### 証明の見取り図

$D_+P=W_+$ という式の左右からベクトルを掛け、$W_+^{\mathsf T}=W_+$ を使います。

<!-- proof-start -->
### 証明

$D_+P=W_+$ なので
$$
\langle f,Pg\rangle_D
=f^{\mathsf T}D_+Pg
=f^{\mathsf T}W_+g.
$$

対称性より $f^{\mathsf T}W_+g=(W_+f)^{\mathsf T}g$ です。また $W_+f=D_+Pf$ なので
$$
f^{\mathsf T}W_+g
=(D_+Pf)^{\mathsf T}g
=(Pf)^{\mathsf T}D_+g
=\langle Pf,g\rangle_D.
$$

$I-P$ に関する等式は、内積の対称性と線形性から従います。
<!-- proof-end -->

普通の平均 $\sum_i f_i/|V_+|$ を零にするのでなく、次数を重みにした平均を零にする理由もここにあります。$L_{\mathrm{rw}}\mathbf1=0$ なので、次数付き内積に関して $\mathbf1$ に直交する条件が $\sum_i d_if_i=0$ です。

<a id="thm-sgt2-rayleigh"></a>

<!-- formal-statement-start -->
> **定理（正規化第二固有値の変分表示）**  
> 正重みの辺で連結な有限無向非負重み付きグラフを考え、全頂点の次数が正とする。対称正規化Laplacianの固有値を
>
$$
0=\mu_1<\mu_2\leq\cdots\leq\mu_n\leq2
$$
>
> と昇順に数える（$n=|V|\geq2$）。このとき
>
$$
\mu_2=
\min_{\substack{f\in\mathbb R^n,\ f\ne0\\
\sum_i d_if_i=0}}
\frac{\sum_{i<j}w_{ij}(f_i-f_j)^2}
{\sum_i d_if_i^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[SGT1の第二固有値の変分表示](../SGT1/index.md#prop-sgt1-gap-variational)と同じ固有ベクトルへの展開を、今度は対称行列 $\mathcal L$ へ適用します。零固有ベクトルは定数ベクトルではなく $\sqrt d=(\sqrt{d_i})$ です。$u_i=\sqrt{d_i}f_i$ と置けば、直交条件と商が重み付きの形へ変わります。

<!-- proof-start -->
### 証明

連結なので[正規化スペクトルと核の定理](#thm-sgt2-spectrum-kernel)により $\ker\mathcal L=\operatorname{span}\{\sqrt d\}$ で、零固有値は単純です。$\mathcal L$ は実対称なので[スペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)により、$\sqrt d/\lVert\sqrt d\rVert$ を第一ベクトルとする正規直交固有基底 $v_1,\ldots,v_n$ を取れます。

$u\perp\sqrt d$、$u\ne0$ とすると、$u=\sum_{r=2}^na_rv_r$ です。直交性と固有値方程式から
$$
u^{\mathsf T}\mathcal Lu=\sum_{r=2}^n\mu_ra_r^2,\qquad
u^{\mathsf T}u=\sum_{r=2}^na_r^2.
$$

$\mu_r\geq\mu_2$ だから商は $\mu_2$ 以上であり、$u=v_2$ で等号が実現します。従って
$$
\mu_2=\min_{\substack{u\ne0\\u\perp\sqrt d}}
\frac{u^{\mathsf T}\mathcal Lu}{u^{\mathsf T}u}.
$$

ここで可逆な座標変換 $u=D_+^{1/2}f$ を行います。直交条件は
$$
u^{\mathsf T}\sqrt d
=\sum_i(\sqrt{d_i}f_i)\sqrt{d_i}
=\sum_i d_if_i=0
$$
です。また[正規化エネルギー公式](#thm-sgt2-energy)の $g=f$ により
$$
u^{\mathsf T}\mathcal Lu=f^{\mathsf T}L_+f
=\sum_{i<j}w_{ij}(f_i-f_j)^2,
\qquad
u^{\mathsf T}u=\sum_i d_if_i^2.
$$

この変換は非零ベクトルも保つため、主張の最小値を取る範囲と商が得られます。
<!-- proof-end -->

### 例：周期2の往復は定常分布への収束を意味しない

二頂点間に一本の正重みの辺がある場合、重みに関係なく
$$
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\pi=(1/2,1/2).
$$

$\pi P=\pi$ は確かに成り立ちます。しかし頂点1から始めた分布 $(1,0)$ は一歩後 $(0,1)$、二歩後 $(1,0)$ に戻り、その後も交互に動きます。つまり**定常分布の存在・一意性と、任意の初期分布からの収束は別問題**です。この例では $P$ に固有値 $-1$、$\mathcal L$ に固有値2があり、周期的な振動を説明します。収束を論じるときには周期性を取り除く工夫が要ります。

## 5. 演習：行列・確率・固有値を往復する

### Level A：定義を手で確認する

#### A1. 重み付き三頂点道の二つの正規化

頂点1と2を重み2、頂点2と3を重み1で結ぶ。$D_+$、$P$、$\mathcal L$ を求め、$P$ の各行和が1であることを確認せよ。

- Level: A
- ID: SGT2-A1

<!-- solution-start -->
**詳細解答**　次数は順に $2,3,1$ です。よって
$$
D_+=\operatorname{diag}(2,3,1),\quad
P=\begin{pmatrix}0&1&0\\2/3&0&1/3\\0&1&0\end{pmatrix}.
$$

行和は $1,\ 2/3+1/3=1,\ 1$ です。$D_+^{-1/2}=\operatorname{diag}(1/\sqrt2,1/\sqrt3,1)$ により、辺 $\{1,2\}$ の非対角成分は $-2/(\sqrt2\sqrt3)=-\sqrt{2/3}$、辺 $\{2,3\}$ は $-1/\sqrt3$ です。従って
$$
\mathcal L=
\begin{pmatrix}
1&-\sqrt{2/3}&0\\
-\sqrt{2/3}&1&-1/\sqrt3\\
0&-1/\sqrt3&1
\end{pmatrix}.
$$
<!-- solution-end -->

#### A2. 孤立頂点と逆行列

A1の道に孤立頂点4を追加する。全次数行列 $D$ が可逆でない理由と、$V_+$ 上では $D_+^{-1}$ が定義できる理由を述べよ。元の組合せLaplacianの零固有値の重複度を求めよ。

- Level: A
- ID: SGT2-A2

<!-- solution-start -->
**詳細解答**　次数は $(2,3,1,0)$ なので $\det D=2\cdot3\cdot1\cdot0=0$ です。$D^{-1}$ は存在しません。一方 $V_+=\{1,2,3\}$ では $\det D_+=6>0$ なので $D_+^{-1}=\operatorname{diag}(1/2,1/3,1)$ です。

元のグラフには道の成分 $\{1,2,3\}$ と孤立成分 $\{4\}$ の二成分があります。[SGT1の核と連結成分の定理](../SGT1/index.md#thm-sgt1-kernel-components)より組合せLaplacianの零固有値は二重です。一方、本章で定義した $\mathcal L$ は三頂点上だけの行列であり、その核は一次元です。別の行列の零固有値重複度を混同してはいけません。
<!-- solution-end -->

#### A3. 一歩後の分布

A1の遷移行列で、初期分布 $q=(0,1,0)$ から一歩後と二歩後の分布を計算せよ。各分布の成分が非負で和が1であることを確認せよ。

- Level: A
- ID: SGT2-A3

<!-- solution-start -->
**詳細解答**　初めに中央の頂点2に確率1でいるので
$$
qP=(0,1,0)P=(2/3,0,1/3).
$$

もう一歩では第1行と第3行がともに $(0,1,0)$ だから
$$
qP^2=(2/3,0,1/3)P
=\frac23(0,1,0)+\frac13(0,1,0)
=(0,1,0).
$$

両者とも成分は非負で、成分和は $2/3+1/3=1$ および1です。二歩で初期状態に戻り、定常性とは異なる性質を示しています。
<!-- solution-end -->

#### A4. 三角形の定常候補

三頂点の三角形で $w_{12}=2$、$w_{23}=1$、$w_{31}=1$、対角成分は零とする。次数、$P$、次数に比例する確率分布 $\pi$ を計算し、辺 $\{1,2\}$ の詳細釣合いを確認せよ。

- Level: A
- ID: SGT2-A4

<!-- solution-start -->
**詳細解答**　各次数は $d_1=2+1=3$、$d_2=2+1=3$、$d_3=1+1=2$、体積は8です。従って
$$
P=\begin{pmatrix}
0&2/3&1/3\\
2/3&0&1/3\\
1/2&1/2&0
\end{pmatrix},\qquad
\pi=(3/8,3/8,1/4).
$$

辺 $\{1,2\}$ で
$$
\pi_1P_{12}=\frac38\cdot\frac23=\frac14,\qquad
\pi_2P_{21}=\frac38\cdot\frac23=\frac14.
$$

[次数分布の定常性の定理](#thm-sgt2-stationary)に従い、残りの組も重みを8で割った流量となるため詳細釣合いが成り立ちます。
<!-- solution-end -->

#### A5. 正規化エネルギーの直接計算

A1の三頂点道で $f=(1,0,-2)^{\mathsf T}$、$u=D_+^{1/2}f$ とする。$f^{\mathsf T}L_+f$ と $u^{\mathsf T}\mathcal Lu$ をそれぞれ辺表示で計算せよ。

- Level: A
- ID: SGT2-A5

<!-- solution-start -->
**詳細解答**　$u=(\sqrt2,0,-2)^{\mathsf T}$ です。組合せLaplacianについて[SGT1のエネルギー表示](../SGT1/index.md#thm-sgt1-dirichlet)に代入すると
$$
f^{\mathsf T}L_+f
=2(1-0)^2+1(0-(-2))^2=2+4=6.
$$

正規化では $u_i/\sqrt{d_i}=f_i$ なので、[正規化エネルギー公式](#thm-sgt2-energy)から
$$
u^{\mathsf T}\mathcal Lu
=2\left(\frac{\sqrt2}{\sqrt2}-0\right)^2
+\left(0-\frac{-2}{1}\right)^2
=2+4=6.
$$

座標変換後も同じエネルギーとなることが数値で確認できました。
<!-- solution-end -->

### Level B：行列の構造を証明する

#### B1. 重み付き自己随伴性と実固有値

$D_+$ は正対角、$W_+$ は実対称で $P=D_+^{-1}W_+$ とする。$\langle f,Pg\rangle_D=\langle Pf,g\rangle_D$ を成分和で証明し、$P$ の固有値が実数である理由を述べよ。

- Level: B
- ID: SGT2-B1

<!-- solution-start -->
**詳細解答**　定義に沿って
$$
\langle f,Pg\rangle_D
=\sum_i d_if_i\sum_j\frac{w_{ij}}{d_i}g_j
=\sum_{i,j}w_{ij}f_ig_j.
$$

$i$ と $j$ を交換し $w_{ij}=w_{ji}$ を使うと
$$
\sum_{i,j}w_{ij}f_ig_j
=\sum_{j,i}w_{ji}g_jf_i
=\sum_jd_jg_j\sum_i\frac{w_{ji}}{d_j}f_i
=\langle Pf,g\rangle_D.
$$

さらに[正規化行列の相似性](#prop-sgt2-similarity)により $P$ は実対称行列 $D_+^{-1/2}W_+D_+^{-1/2}=I-\mathcal L$ と相似です。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)によって $I-\mathcal L$ は実固有値のみを持ち、相似な $P$ も実固有値のみを持ちます。
<!-- solution-end -->

#### B2. 連結でない場合の定常分布

互いに辺を持たない二つの二頂点成分 $C_1=\{1,2\}$、$C_2=\{3,4\}$ があり、前者の辺重みは2、後者は5である。全ての定常確率分布を求めよ。

- Level: B
- ID: SGT2-B2

<!-- solution-start -->
**詳細解答**　各成分は二頂点の往復なので
$$
P=\begin{pmatrix}
0&1&0&0\\1&0&0&0\\
0&0&0&1\\0&0&1&0
\end{pmatrix}.
$$

$\nu=(a,b,c,d)$ が $\nu P=\nu$ を満たす条件は $(b,a,d,c)=(a,b,c,d)$ だから $a=b$、$c=d$ です。確率条件から $2a+2c=1$、非負性から $0\leq a,c\leq1/2$ です。$\alpha=2a$ と置くと
$$
\nu=\left(\frac\alpha2,\frac\alpha2,
\frac{1-\alpha}2,\frac{1-\alpha}2\right),
\qquad 0\leq\alpha\leq1.
$$

[定常分布の一意性に関する定理](#thm-sgt2-unique-stationary)の非連結の場合と一致し、成分内の辺重みが違っても各成分の正規化次数分布は $(1/2,1/2)$ です。
<!-- solution-end -->

#### B3. 完全グラフの変分商

全辺重み1の完全グラフ $K_3$ について $\mathcal L$ の固有値を求め、$f=(1,-1,0)^{\mathsf T}$ を[正規化第二固有値の変分表示](#thm-sgt2-rayleigh)に代入して $\mu_2$ を検算せよ。

- Level: B
- ID: SGT2-B3

<!-- solution-start -->
**詳細解答**　各次数は2で $D_+=2I$、$W_+=J-I$（$J$ は全成分1の行列）です。よって
$$
\mathcal L=I-\frac12(J-I)
=\frac32I-\frac12J.
$$

定数ベクトル上では $J\mathbf1=3\mathbf1$ だから固有値は0です。座標和が零の二次元部分空間では $Jg=0$ となるので固有値は $3/2$、重複度2です。従って $\mu_2=3/2$。

$f$ について重み付き平均条件は $2(1-1+0)=0$ です。辺ごとに分子を計算すると
$$
(1-(-1))^2+((-1)-0)^2+(0-1)^2
=4+1+1=6.
$$

分母は $2(1^2+(-1)^2+0^2)=4$ なので商は $6/4=3/2$ です。$f$ は $\mu_2$ の固有空間に属しており、最小値を達成します。
<!-- solution-end -->

#### B4. 二頂点の周期性と固有値2

二頂点間に重み $a>0$ の辺が一本あるグラフで、$P$、$\mathcal L$、各固有値を求めよ。初期分布 $(1,0)$ が定常分布へ収束しないことを示せ。また $Q=(I+P)/2$ で一歩移動した場合を計算せよ。

- Level: B
- ID: SGT2-B4

<!-- solution-start -->
**詳細解答**　$D_+=aI$、$W_+=\begin{pmatrix}0&a\\a&0\end{pmatrix}$ だから
$$
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\mathcal L=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

$(1,1)^{\mathsf T}$ と $(1,-1)^{\mathsf T}$ を掛けると $P$ の固有値は $1,-1$、$\mathcal L=I-P$ の固有値は $0,2$ です。$q_0=(1,0)$ に対して $q_{2m}=(1,0)$、$q_{2m+1}=(0,1)$ が全ての非負整数 $m$ で成り立つので、定常分布 $(1/2,1/2)$ に収束しません。

$Q=(I+P)/2$ は二行とも $(1/2,1/2)$ であるため $q_0Q=(1/2,1/2)$ です。この例では一歩で定常分布になりますが、一般のグラフの混合速度については別の議論が必要です。
<!-- solution-end -->

### Level C：孤立頂点・周期・変分値を一体で確認する

#### C1. 非一様重みの道と孤立頂点

頂点集合 $V=\{1,2,3,4\}$ に対し、$w_{12}=w_{21}=2$、$w_{23}=w_{32}=1$ とし、残りの重みは全て零とする。次を求めよ。

1. $V_+$ と $V_0$、$D_+$、$P$、$\mathcal L$ を求め、元の組合せLaplacianと $\mathcal L$ の零固有値重複度の違いを説明せよ。
2. $\pi$ を求め、$P$ の全固有値と $\mathcal L$ の全固有値を求めよ。$D_+^{-1/2}W_+D_+^{-1/2}$ の特性多項式を示すこと。
3. $\mu_2$ の変分式を $f=(1,0,-2)^{\mathsf T}$ で検算せよ。
4. 頂点1から始めた分布の一歩後・二歩後・三歩後を計算し、定常分布が一意でも通常の歩行が収束しない理由を述べよ。

- Level: C
- ID: SGT2-C1

<!-- solution-start -->
**詳細解答**

**(1)**　次数は $(2,3,1,0)$ なので $V_+=\{1,2,3\}$、$V_0=\{4\}$、$D_+=\operatorname{diag}(2,3,1)$ です。成分ごとに割ると
$$
P=\begin{pmatrix}0&1&0\\2/3&0&1/3\\0&1&0\end{pmatrix},
\quad
\mathcal L=
\begin{pmatrix}
1&-\sqrt{2/3}&0\\
-\sqrt{2/3}&1&-1/\sqrt3\\
0&-1/\sqrt3&1
\end{pmatrix}.
$$

元のグラフは道と孤立頂点の二成分なので[SGT1の核と連結成分の定理](../SGT1/index.md#thm-sgt1-kernel-components)から元の $4\times4$ の組合せLaplacianの零固有値は二重です。一方、正次数頂点上の道は連結なので[正規化スペクトルの定理](#thm-sgt2-spectrum-kernel)から $\mathcal L$ の零固有値は単純です。

**(2)**　体積は6です。[次数分布の定常性](#thm-sgt2-stationary)から
$$
\pi=(2/6,3/6,1/6)=(1/3,1/2,1/6).
$$

$a=\sqrt{2/3}$、$b=1/\sqrt3$ と置けば
$$
B=D_+^{-1/2}W_+D_+^{-1/2}
=\begin{pmatrix}0&a&0\\a&0&b\\0&b&0\end{pmatrix},
\qquad a^2+b^2=1.
$$

行列式を第一行で展開すると
$$
\begin{aligned}
\det(tI-B)
&=t\det\begin{pmatrix}t&-b\\-b&t\end{pmatrix}
-(-a)\det\begin{pmatrix}-a&-b\\0&t\end{pmatrix}\\
&=t(t^2-b^2)-a^2t\\
&=t(t^2-a^2-b^2)=t(t^2-1).
\end{aligned}
$$

従って $B$ の固有値は $1,0,-1$ です。$P=D_+^{-1/2}BD_+^{1/2}$ なので $P$ の固有値も $1,0,-1$、$\mathcal L=I-B$ の固有値は $0,1,2$ です。

**(3)**　重み付き平均は $2\cdot1+3\cdot0+1\cdot(-2)=0$ なので $f$ は[変分表示](#thm-sgt2-rayleigh)の制約を満たします。分子・分母は
$$
\sum_{i<j}w_{ij}(f_i-f_j)^2
=2(1-0)^2+(0+2)^2=6,
$$
$$
\sum_i d_if_i^2=2\cdot1^2+3\cdot0^2+1\cdot(-2)^2=6.
$$

商は1です。(2)で $\mu_2=1$ を求めたので、この試験ベクトルは最小値を実現します。

**(4)**　$q_0=(1,0,0)$ とすると、第1行から
$$
q_1=q_0P=(0,1,0).
$$

第2行から
$$
q_2=q_1P=(2/3,0,1/3).
$$

第1行と第3行がともに $(0,1,0)$ なので
$$
q_3=q_2P=\frac23(0,1,0)+\frac13(0,1,0)=(0,1,0).
$$

従って以後も $q_{2m+1}=(0,1,0)$、$q_{2m}=(2/3,0,1/3)$（$m\geq1$）と交互に動きます。グラフは連結なので[定常分布の一意性](#thm-sgt2-unique-stationary)は成立しています。しかし $\pi=(1/3,1/2,1/6)$ と等しくない二つの分布を行き来するので、$q_t$ は $\pi$ に収束しません。固有値 $-1$ に対応する振動を抑える条件が必要です。
<!-- solution-end -->

## 6. 次章への問い

正規化によって、次数の違いを吸収したエネルギー、零固有値、定常分布、重み付き平均に直交する変分式が一つにつながりました。次はグラフを二つに切るとき、境界の重みをどのように体積で割るべきかを定義し、その切れやすさを $\mu_2$ で両側から評価します。
