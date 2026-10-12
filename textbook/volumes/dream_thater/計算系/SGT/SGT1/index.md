# SGT1 重み付きグラフと組合せLaplacian

有限個の頂点と辺からなるグラフを調べるとき、隣接しているかどうかだけでなく、「頂点に値を置いたとき、隣り合う値がどれほど違うか」を測りたい場面があります。例えば通信網の隣接地点の温度、道路網の標高、ネットワーク上の信号を考えると、辺の両端の差を大きくしない配置には意味があります。

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)から、対称行列は直交固有ベクトルで理解できます。しかし、任意の行列の固有値から、どの頂点同士が辺で結ばれているかまで読み取れるわけではありません。そこで辺の情報を、差の二乗の和が自然に現れる行列に組み直します。

本章では有限・無向・非負重みのグラフに限定し、孤立頂点も許します。行列の構成、二次形式、半正定値性、零固有値とグラフの分断との対応を、自分で計算して証明します。頂点の次数に合わせた正規化や確率遷移行列は次章以降で導入します。

## 1. 辺に重みをつける

頂点集合は $V=\{1,\ldots,n\}$、$n\geq1$ とします。頂点 $i,j$ の接続の強さを $w_{ij}$ と書き、無向性を $w_{ij}=w_{ji}$ で表します。重みが零なら辺がないものとし、自己ループは扱いません。

<a id="def-sgt1-weighted-graph"></a>

<!-- formal-statement-start -->
> **定義（有限無向重み付きグラフ）**  
> 有限集合 $V=\{1,\ldots,n\}$ と実行列 $W=(w_{ij})_{i,j=1}^n$ の組を考える。すべての $i,j$ に対し
>
$$
w_{ij}=w_{ji}\geq0,\qquad w_{ii}=0
$$
>
> を満たすとき、$(V,W)$ を有限無向重み付きグラフという。$w_{ij}>0$ の組 $\{i,j\}$ を辺と呼び、その重みを $w_{ij}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-weighted-graph -->
### 例：重み2と1を持つ三頂点の道

**定義の確認**：$V=\{1,2,3\}$ とし、$\{1,2\}$ の重みを2、$\{2,3\}$ の重みを1とします。行列は

$$
W=\begin{pmatrix}0&2&0\\2&0&1\\0&1&0\end{pmatrix}.
$$

転置しても変わらず、成分はすべて非負、対角成分は零です。したがって定義を満たします。$w_{13}=0$ なので頂点1と3を直接結ぶ辺はありません。
<!-- definition-example-end -->

同じ頂点数でも、どこを強く結ぶかで行列の固有値は変わります。まず各頂点に接続する重みの総和を取ります。

<a id="def-sgt1-degree-volume"></a>

<!-- formal-statement-start -->
> **定義（重み付き次数・体積）**  
> 有限無向重み付きグラフ $(V,W)$ について、頂点 $i$ の重み付き次数 $d_i$、部分集合 $S\subseteq V$ の体積 $\operatorname{vol}(S)$ を
>
$$
d_i=\sum_{j=1}^n w_{ij},\qquad
\operatorname{vol}(S)=\sum_{i\in S}d_i
$$
>
> とする。次数行列を $D=\operatorname{diag}(d_1,\ldots,d_n)$ と定める。$d_i=0$ の頂点を孤立頂点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-degree-volume -->
### 例：次数は辺の本数とは限らない

**定義の確認**：先ほどの道では $d_1=2$、$d_2=2+1=3$、$d_3=1$ です。$S=\{1,2\}$ なら $\operatorname{vol}(S)=2+3=5$、全頂点なら体積は6です。無重みの道なら次数は $1,2,1$ ですが、ここでは辺の重みを合計しています。孤立頂点を一つ追加すれば、その次数は0です。
<!-- definition-example-end -->

重みを持つ辺を一度だけ数えるときは $i<j$ に限定します。すると全体積と辺の重みの関係は

$$
\sum_{i=1}^n d_i
=\sum_{i=1}^n\sum_{j=1}^n w_{ij}
=2\sum_{1\leq i<j\leq n}w_{ij}
$$

です。最後の等号では、対称性によって各辺が $(i,j)$ と $(j,i)$ の二回登場し、対角成分は零であることを使いました。

## 2. 頂点上の値を二次形式で測る

頂点 $i$ に実数 $f_i$ を置き、$f=(f_1,\ldots,f_n)^{\mathsf T}$ とします。隣接する二点に同じ値を置くなら、その辺は変化に寄与しないようにしたいのです。差 $f_i-f_j$ を二乗し、辺の重みで重み付けします。

<a id="def-sgt1-laplacian"></a>

<!-- formal-statement-start -->
> **定義（組合せLaplacian）**  
> 有限無向重み付きグラフ $(V,W)$ の次数行列を $D$ とするとき、組合せLaplacianを
>
$$
L=D-W
$$
>
> と定める。すなわち $L_{ii}=d_i$、$i\ne j$ なら $L_{ij}=-w_{ij}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-laplacian -->
### 例：三頂点の道を行列にする

**定義の確認**：前節の $W$ と $D=\operatorname{diag}(2,3,1)$ に対して、成分を引けば

$$
L=\begin{pmatrix}
2&-2&0\\
-2&3&-1\\
0&-1&1
\end{pmatrix}.
$$

対角成分は重み付き次数、非対角成分は重みの負号です。各行の和が零なので $L\mathbf1=0$ です。ただしこの等式だけでは零固有値の重複度はまだ分かりません。
<!-- definition-example-end -->

次に、辺の差の二乗の和が本当にこの行列の二次形式に一致することを計算します。ここが本章の証明を支える式です。

<a id="thm-sgt1-dirichlet"></a>

<!-- formal-statement-start -->
> **定理（Dirichletエネルギーの辺表示）**  
> 有限無向非負重み付きグラフの組合せLaplacian $L=D-W$ と任意の $f\in\mathbb R^n$ に対して、
>
$$
f^{\mathsf T}Lf
=\sum_{1\leq i<j\leq n}w_{ij}(f_i-f_j)^2
=\frac12\sum_{i,j=1}^n w_{ij}(f_i-f_j)^2
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず $D-W$ をそのまま展開します。$w_{ij}=w_{ji}$ により、$f_i^2$ と $f_j^2$ の寄与を半分ずつ分配すると差の二乗が現れます。係数 $1/2$ は無向辺を二回数えた補正です。

<!-- proof-start -->
### 証明

次数の定義を代入して

$$
\begin{aligned}
f^{\mathsf T}Lf
&=f^{\mathsf T}Df-f^{\mathsf T}Wf\\
&=\sum_i d_if_i^2-\sum_{i,j}w_{ij}f_if_j\\
&=\sum_{i,j}w_{ij}f_i^2-\sum_{i,j}w_{ij}f_if_j.
\end{aligned}
$$

対称性と添字の入替えから

$$
\sum_{i,j}w_{ij}f_i^2
=\sum_{i,j}w_{ij}f_j^2
$$

です。したがって第一項を同じ値の二つの和に分けると

$$
\begin{aligned}
f^{\mathsf T}Lf
&=\frac12\sum_{i,j}w_{ij}f_i^2
+\frac12\sum_{i,j}w_{ij}f_j^2
-\sum_{i,j}w_{ij}f_if_j\\
&=\frac12\sum_{i,j}w_{ij}(f_i^2-2f_if_j+f_j^2)\\
&=\frac12\sum_{i,j}w_{ij}(f_i-f_j)^2.
\end{aligned}
$$

対角項 $i=j$ は零です。$i\ne j$ の各組は $(i,j)$ と $(j,i)$ が同じ重み・同じ差の二乗を持つため、その半分は $i<j$ の和に一致します。
<!-- proof-end -->

**手で検算します。** 重み2、1の道と $f=(1,0,-1)^{\mathsf T}$ について、辺から計算すると

$$
2(1-0)^2+1(0-(-1))^2=3.
$$

行列側では $Lf=(2,-1,-1)^{\mathsf T}$ なので

$$
f^{\mathsf T}Lf=(1,0,-1)(2,-1,-1)^{\mathsf T}=2+1=3
$$

です。両方で係数が一致しました。

<a id="thm-sgt1-psd"></a>

<!-- formal-statement-start -->
> **定理（組合せLaplacianの半正定値性）**  
> 有限無向非負重み付きグラフの $L=D-W$ は実対称かつ半正定値であり、すべての固有値は非負である。また $L\mathbf1=0$ だから、最小固有値は $0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

対称性は $D^{\mathsf T}=D$ と $W^{\mathsf T}=W$ から分かります。二次形式が非負である理由と、固有値が非負である理由を分けて確認します。

<!-- proof-start -->
### 証明

$L^{\mathsf T}=D^{\mathsf T}-W^{\mathsf T}=D-W=L$ です。[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)に $f\in\mathbb R^n$ を代入すると、各 $w_{ij}\geq0$ なので

$$
f^{\mathsf T}Lf=\sum_{i<j}w_{ij}(f_i-f_j)^2\geq0.
$$

よって半正定値です。実対称行列には[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)を適用でき、実固有値 $\lambda$ に属する非零固有ベクトル $u$ を取れます。固有方程式から

$$
0\leq u^{\mathsf T}Lu
=\lambda u^{\mathsf T}u
=\lambda\sum_i u_i^2
$$

を得ます。$u\ne0$ より $\sum_i u_i^2>0$ なので $\lambda\geq0$ です。一方、$L\mathbf1=(D-W)\mathbf1=0$ は各成分 $d_i-\sum_jw_{ij}=0$ によります。$\mathbf1\ne0$ だから0は固有値であり、非負性から最小です。
<!-- proof-end -->

重みを負にするなら、この証明の二次形式の各項が非負であるという段階が壊れます。例えば二頂点を重み $-1$ で結ぶ形式では $f=(1,-1)$ に対してエネルギーは $-4$ であり、半正定値ではありません。本章で非負重みを明示するのはこのためです。

## 3. 零固有値は何を数えるか

各行の和が零であるため、頂点すべてに一定値を置けば $Lf=0$ です。グラフが分断されていれば、互いに結びつかない頂点の集まりごとに異なる定数を置いても、辺の両端の差は零です。それ以外の零ベクトルがないことを証明します。まず、辺をたどれることを正確に定義します。

<a id="def-sgt1-path"></a>

<!-- formal-statement-start -->
> **定義（グラフの道）**  
> 有限無向重み付きグラフ $(V,W)$ において、頂点 $i$ から頂点 $j$ への道とは、ある整数 $m\geq0$ を取り、頂点を順に並べた

$$
i=v_0,v_1,\ldots,v_m=j
$$

> が次の条件を満たすものをいう。

$$
w_{v_{k-1}v_k}>0\qquad (1\leq k\leq m)
$$

> $m=0$ の場合には辺の条件は空で、始点と終点が同じである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-path -->
### 例：重みが正の辺だけをたどる

**定義の確認**：重み2、1の三頂点道では、頂点の並び $(1,2,3)$ の隣接重みは $w_{12}=2>0$、$w_{23}=1>0$ なので頂点1から3への道です。重み0の組だけを一歩として $(1,3)$ と並べても、$w_{13}=0$ のため道にはなりません。
<!-- definition-example-end -->

頂点間に道があるかどうかは、互いに結びついた頂点のまとまりを分けます。ここでは頂点間の道で関係を定義し、一般の空間に対する議論は必要としません。

<a id="def-sgt1-component"></a>

<!-- formal-statement-start -->
> **定義（グラフの連結成分）**  
> 有限無向重み付きグラフ $(V,W)$ において、二頂点の間に正重みの道があるとき、両頂点は連結であるという。互いに連結である頂点からなる極大集合をグラフの連結成分という。全頂点が互いに連結ならグラフは連結という。孤立頂点は一頂点だけの連結成分を作る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-component -->
### 例：孤立頂点を含むグラフ

**定義の確認**：$V=\{1,2,3,4\}$ で唯一の辺が $\{1,2\}$（重み3）なら、正重みの道で結ばれるのは1と2です。成分は $\{1,2\}$、$\{3\}$、$\{4\}$ の三つです。重み0の組 $\{2,3\}$ は道の一歩になりません。
<!-- definition-example-end -->

<a id="thm-sgt1-kernel-components"></a>

<!-- formal-statement-start -->
> **定理（核と連結成分）**  
> 有限無向非負重み付きグラフの連結成分を $C_1,\ldots,C_c$ とすると、組合せLaplacian $L$ に対して
>
$$
\ker L
=\operatorname{span}\{\mathbf1_{C_1},\ldots,\mathbf1_{C_c}\},
\qquad \dim\ker L=c
$$
>
> が成り立つ。ここで $\mathbf1_C$ は $i\in C$ で1、それ以外で0のベクトルである。とくに0固有値の重複度は $c$ であり、グラフが連結であることと0固有値が単純であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

必要条件では $Lf=0$ を二次形式に代入して、正重みの各辺で値が一致することを取り出します。道に沿って値が一致し、成分ごとに定数になります。十分条件は、成分内の差が零であることを $L$ の各座標で検証します。

<!-- proof-start -->
### 証明

まず $f\in\ker L$ とします。すると $Lf=0$ なので

$$
0=f^{\mathsf T}Lf
=\sum_{i<j}w_{ij}(f_i-f_j)^2
$$

です。第二の等号には[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)を使いました。和の各項は非負です。非負の有限個の数の和が零なら、各項も零です。特に $w_{ij}>0$ の辺では $(f_i-f_j)^2=0$、したがって $f_i=f_j$ です。

同じ成分にある $i,j$ には正重みの道 $i=v_0,\ldots,v_m=j$ が存在します。各辺について

$$
f_{v_0}=f_{v_1},\quad f_{v_1}=f_{v_2},\quad\ldots,\quad f_{v_{m-1}}=f_{v_m}
$$

だから $f_i=f_j$ です。成分 $C_k$ 上での共通値を $a_k$ とすれば

$$
f=\sum_{k=1}^c a_k\mathbf1_{C_k}
$$

を得ます。

逆に、この形の $f$ を取ります。任意の頂点 $i$ について

$$
(Lf)_i=d_if_i-\sum_j w_{ij}f_j
=\sum_j w_{ij}(f_i-f_j).
$$

$w_{ij}=0$ の項は零、$w_{ij}>0$ の項では $i,j$ は同じ成分に属するので $f_i=f_j$ です。したがって全項が零で、$Lf=0$ です。

最後に $\mathbf1_{C_k}$ たちの一次独立性を確認します。$\sum_k a_k\mathbf1_{C_k}=0$ として $i\in C_\ell$ の座標を見ると、成分は互いに交わらず全頂点を分割するため $a_\ell=0$ です。$\ell$ は任意なので全係数が零です。従って核の次元は $c$ です。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)で対角化できるので、零固有値の代数的重複度も核の次元 $c$ に一致します。
<!-- proof-end -->

**大事な区別**：$L\mathbf1=0$ という一つの等式だけからは、零固有値が単純かどうかは分かりません。必要なのは、正重みの辺が全頂点をつなぐかどうかです。孤立頂点はそれ自体で零固有ベクトルを一つ増やします。

## 4. 小さなグラフのスペクトルを直接求める

$L$ は実対称ですから、全固有値を重複度込みで

$$
0=\lambda_1\leq\lambda_2\leq\cdots\leq\lambda_n
$$

と並べられます。グラフの形が固有値にどう表れるか、三種類の例を比べましょう。

### 三頂点の道 $P_3$

各辺の重みが1なら

$$
L_{P_3}=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

実際に掛けると

$$
\begin{aligned}
L_{P_3}(1,1,1)^{\mathsf T}&=(0,0,0)^{\mathsf T},\\
L_{P_3}(1,0,-1)^{\mathsf T}&=(1,0,-1)^{\mathsf T},\\
L_{P_3}(1,-2,1)^{\mathsf T}&=3(1,-2,1)^{\mathsf T}.
\end{aligned}
$$

三本は互いに直交する非零ベクトルで、$\mathbb R^3$ の基底です。したがって固有値は $0,1,3$ のすべてであり、成分は一つです。

### 四頂点のサイクル $C_4$

頂点 $1,2,3,4$ を順に結び、さらに $4$ と $1$ を結びます。すべての辺の重みは1です。

$$
L_{C_4}=\begin{pmatrix}
2&-1&0&-1\\
-1&2&-1&0\\
0&-1&2&-1\\
-1&0&-1&2
\end{pmatrix}.
$$

次の四本を掛け算で調べます。

$$
\begin{aligned}
u_0&=(1,1,1,1)^{\mathsf T},& Lu_0&=0,\\
u_1&=(1,0,-1,0)^{\mathsf T},& Lu_1&=2u_1,\\
u_2&=(0,1,0,-1)^{\mathsf T},& Lu_2&=2u_2,\\
u_3&=(1,-1,1,-1)^{\mathsf T},& Lu_3&=4u_3.
\end{aligned}
$$

互いに直交する四本なので固有値は $0,2,2,4$ です。$P_3$ と異なり、正の固有値に重複が生じています。

### 完全グラフ $K_n$

$n\geq2$ の異なる二頂点間をすべて重み1で結びます。全次数は $n-1$ で、全成分が1の行列を $J=\mathbf1\mathbf1^{\mathsf T}$ と書くと、$W=J-I$ だから

$$
L=(n-1)I-(J-I)=nI-J.
$$

$\mathbf1$ には $J\mathbf1=n\mathbf1$ なので $L\mathbf1=0$ です。一方 $\mathbf1^{\mathsf T}f=0$ なら $Jf=\mathbf1(\mathbf1^{\mathsf T}f)=0$ です。よって

$$
Lf=nf\qquad(f\perp\mathbf1).
$$

$\mathbf1$ に直交する空間の次元は $n-1$ なので、固有値は0が一つ、$n$ が $n-1$ 個です。すべての頂点が直接つながる場合、非定数方向のエネルギーが大きくなることが見えます。

## 5. Cutの重みも同じ二次形式になる

成分を分割したいとき、部分集合 $S$ と補集合 $V\setminus S$ の間を通る辺の重みを測ります。後続のCheeger不等式では、この量が固有値とつながります。

<a id="def-sgt1-cut"></a>

<!-- formal-statement-start -->
> **定義（Cutの重み）**  
> 有限無向重み付きグラフの部分集合 $S\subseteq V$ に対し、
>
$$
\operatorname{cut}(S,V\setminus S)
=\sum_{i\in S}\sum_{j\notin S}w_{ij}
$$
>
> を境界を横切る辺の重みとする。各無向辺はこの二重和で一度だけ数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt1-cut -->
### 例：道の途中で切る

**定義の確認**：辺の重みが2と1の道で $S=\{1,2\}$ とすれば、外側の頂点は3だけです。$w_{13}=0$、$w_{23}=1$ だから

$$
\operatorname{cut}(S,\{3\})=w_{13}+w_{23}=0+1=1.
$$

一方、$S=\{2\}$ なら境界に重み2と1の両辺が入り、cutは3です。
<!-- definition-example-end -->

<a id="prop-sgt1-cut-energy"></a>

<!-- formal-statement-start -->
> **命題（Cutと指示ベクトルのエネルギー）**  
> 有限無向非負重み付きグラフ $(V,W)$ とその組合せLaplacian $L=D-W$ について、任意の $S\subseteq V$ と指示ベクトル $\mathbf1_S$ を取ると
>
$$
\mathbf1_S^{\mathsf T}L\mathbf1_S
=\operatorname{cut}(S,V\setminus S)
$$
>
> が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)の $f$ に $\mathbf1_S$ を代入すると

$$
\mathbf1_S^{\mathsf T}L\mathbf1_S
=\sum_{i<j}w_{ij}\bigl((\mathbf1_S)_i-(\mathbf1_S)_j\bigr)^2.
$$

二つの端点が共に $S$ 内、または共に外なら差は零です。一方、一方だけ $S$ 内なら差は $1$ または $-1$ で二乗は1です。したがって残るのはちょうど境界をまたぐ辺の重みの和です。
<!-- proof-end -->

### 最初の正の固有値へつなぐ

次に、連結グラフの零固有値の次に来る固有値を求める方法を考えます。頂点上の値から定数部分を除き、辺のエネルギーをノルムで割った比の最小値を調べます。固有値を全て計算できなくても、適当な試験ベクトルを代入すれば上界を作れます。

<a id="prop-sgt1-gap-variational"></a>

<!-- formal-statement-start -->
> **命題（非正規化Laplacianの変分表示）**  
> 頂点数 $n\geq2$ の有限連結無向非負重み付きグラフ $(V,W)$ の組合せLaplacianを $L=D-W$ とする。固有値を昇順に
>
$$
0=\lambda_1<\lambda_2\leq\cdots\leq\lambda_n
$$
>
> と並べる。このとき

$$
\lambda_2
=\min_{\substack{f\in\mathbb R^n\setminus\{0\}\\f\perp\mathbf1}}
\frac{\sum_{i<j}w_{ij}(f_i-f_j)^2}{\sum_i f_i^2}
$$

> が成立する。$\lambda_2$ は**組合せLaplacian**の第二固有値であり、後続の正規化Laplacianの第二固有値とは一般に異なる。
<!-- formal-statement-end -->

### 証明の見取り図

グラフが連結であるため零固有値は単純です。定数方向を除く正規直交固有基底で任意の試験ベクトルを展開し、比を固有値の重み付き平均として書きます。二番目の固有ベクトルで下界を達成します。

<!-- proof-start -->
### 証明

グラフは連結かつ $n\geq2$ なので、[核と連結成分の定理](#thm-sgt1-kernel-components)と[半正定値性](#thm-sgt1-psd)から $\lambda_1=0<\lambda_2$ です。[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)を実対称行列 $L$ に適用し、正規直交固有基底 $u_1=\mathbf1/\sqrt n,u_2,\ldots,u_n$ を選びます。$f\perp\mathbf1$ なら $u_1^{\mathsf T}f=0$ なので

$$
f=\sum_{k=2}^n a_ku_k,\qquad
f^{\mathsf T}Lf=\sum_{k=2}^n\lambda_k a_k^2,\qquad
f^{\mathsf T}f=\sum_{k=2}^n a_k^2.
$$

最後の二式は $Lu_k=\lambda_k u_k$ と $u_j^{\mathsf T}u_k=\delta_{jk}$ を二重和に代入したものです。$f\ne0$ のとき $\sum_{k=2}^na_k^2>0$ だから

$$
\frac{f^{\mathsf T}Lf}{f^{\mathsf T}f}
=\frac{\sum_{k=2}^n\lambda_ka_k^2}{\sum_{k=2}^na_k^2}
\geq\lambda_2
$$

となります。ここで各 $\lambda_k\geq\lambda_2$（$k\geq2$）を使いました。$f=u_2$ は $\mathbf1$ に直交し、ノルム1、かつ $u_2^{\mathsf T}Lu_2=\lambda_2$ なので等号を達成します。分子を[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)に置き換えれば結論の式です。
<!-- proof-end -->

この変分式の分母は普通の Euclid 内積です。正規化版では次数を用いた内積と正規化が問題になり、同じ「第二固有値」という呼び名だけで数値を比較してはいけません。

## 6. 演習：辺と行列を行き来する

### Level A：定義と直接計算

#### A1. 重み付き道の行列とエネルギー

頂点 $1,2,3$ に辺 $\{1,2\}$（重み2）、$\{2,3\}$（重み1）だけを置く。$W,D,L$ を書き、$f=(1,0,-1)^{\mathsf T}$ について $f^{\mathsf T}Lf$ を行列から、辺の差の二乗からそれぞれ求めよ。

- Level: A
- ID: SGT1-A1

<!-- solution-start -->
**詳細解答**　定義から

$$
W=\begin{pmatrix}0&2&0\\2&0&1\\0&1&0\end{pmatrix},\quad
D=\begin{pmatrix}2&0&0\\0&3&0\\0&0&1\end{pmatrix},\quad
L=\begin{pmatrix}2&-2&0\\-2&3&-1\\0&-1&1\end{pmatrix}.
$$

まず $Lf=(2,-1,-1)^{\mathsf T}$ です。従って $f^{\mathsf T}Lf=1\cdot2+0\cdot(-1)+(-1)\cdot(-1)=3$。辺からは $2(1-0)^2+1(0+1)^2=2+1=3$ で一致します。
<!-- solution-end -->

#### A2. 孤立頂点と核

四頂点のグラフで唯一の辺を $\{1,2\}$、重み3とする。$L$ を求め、$\ker L$ の基底を直接示せ。

- Level: A
- ID: SGT1-A2

<!-- solution-start -->
**詳細解答**　次数は $(3,3,0,0)$ なので

$$
L=\begin{pmatrix}3&-3&0&0\\-3&3&0&0\\0&0&0&0\\0&0&0&0\end{pmatrix}.
$$

$Lf=0$ は $3(f_1-f_2)=0$ と $3(f_2-f_1)=0$ で、従って $f_1=f_2$ です。$f_3,f_4$ は自由ですから

$$
\ker L=\operatorname{span}\{(1,1,0,0)^{\mathsf T},(0,0,1,0)^{\mathsf T},(0,0,0,1)^{\mathsf T}\}.
$$

三本のベクトルは独立で、成分も三つなので[核と連結成分の定理](#thm-sgt1-kernel-components)と一致します。
<!-- solution-end -->

#### A3. $P_3$ の固有値を行列積で判定する

無重み三頂点道の組合せLaplacian $L$ について、$u=(1,1,1)^{\mathsf T}$、$v=(1,0,-1)^{\mathsf T}$、$z=(1,-2,1)^{\mathsf T}$ がそれぞれどの固有値の固有ベクトルか確かめよ。これらですべての固有値が求まる理由も述べよ。

- Level: A
- ID: SGT1-A3

<!-- solution-start -->
**詳細解答**　行列は $L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}$ です。行ごとに掛けると

$$
Lu=(0,0,0)^{\mathsf T},\quad Lv=(1,0,-1)^{\mathsf T},\quad Lz=(3,-6,3)^{\mathsf T}.
$$

よって固有値は順に $0,1,3$ です。$u^{\mathsf T}v=u^{\mathsf T}z=v^{\mathsf T}z=0$ で、いずれも非零です。三本は互いに直交して一次独立、$\mathbb R^3$ の基底になるため、他の固有値はありません。
<!-- solution-end -->

#### A4. Cutの重みと体積を区別する

A1のグラフで $S=\{1,2\}$ とする。$\operatorname{cut}(S,V\setminus S)$、$\operatorname{vol}(S)$、$\mathbf1_S^{\mathsf T}L\mathbf1_S$ を求めよ。

- Level: A
- ID: SGT1-A4

<!-- solution-start -->
**詳細解答**　境界を横切るのは $\{2,3\}$ のみなので cut は1です。次数 $(2,3,1)$ より体積は $2+3=5$。指示ベクトル $h=(1,1,0)^{\mathsf T}$ について

$$
Lh=(0,1,-1)^{\mathsf T},\qquad
h^{\mathsf T}Lh=1\cdot0+1\cdot1+0\cdot(-1)=1.
$$

同じ値は[Cutのエネルギー表示](#prop-sgt1-cut-energy)でも確認できます。cutの値1と体積5は異なる量です。
<!-- solution-end -->

#### A5. トレースと全辺重み

自己ループのない有限無向重み付きグラフで、$\operatorname{tr}L=2\sum_{i<j}w_{ij}$ を示せ。A1で検算せよ。

- Level: A
- ID: SGT1-A5

<!-- solution-start -->
**詳細解答**　$L_{ii}=d_i$ より $\operatorname{tr}L=\sum_i d_i$ です。次数の定義を使い

$$
\sum_i d_i=\sum_i\sum_jw_{ij}
=\sum_{i<j}(w_{ij}+w_{ji})+\sum_iw_{ii}
=2\sum_{i<j}w_{ij}.
$$

A1では $\operatorname{tr}L=2+3+1=6$、辺の重みからも $2(2+1)=6$ です。
<!-- solution-end -->

### Level B：証明とスペクトルの計算

#### B1. 正重みの道が零エネルギーを縛る

グラフは連結で、すべての辺の重みが正とする。$f^{\mathsf T}Lf=0$ なら $f$ は定数ベクトルとなることを、成分ごとの差と道を用いて証明せよ。重みが零の組を道として数えられない理由も述べよ。

- Level: B
- ID: SGT1-B1

<!-- solution-start -->
**詳細解答**　[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)により

$$
0=\sum_{i<j}w_{ij}(f_i-f_j)^2.
$$

すべての項は非負なので和が零なら各項も零です。辺 $\{i,j\}$ では $w_{ij}>0$ なので $f_i-f_j=0$ です。グラフが連結なので任意の $s,t$ を結ぶ正重みの道 $s=v_0,\ldots,v_m=t$ があり、各辺の等式を連ねて $f_s=f_t$ と結論できます。重みが零なら $w_{ij}(f_i-f_j)^2=0$ は値の等しさを強制しないので、その組を道の一歩にはできません。
<!-- solution-end -->

#### B2. 完全グラフの固有値と固有ベクトル

単位重みの完全グラフ $K_4$ で $L$ を求め、固有値と重複度を答えよ。また $f=(1,-1,0,0)^{\mathsf T}$ の二次形式を行列と辺の両側から検算せよ。

- Level: B
- ID: SGT1-B2

<!-- solution-start -->
**詳細解答**　$D=3I$、$W=J-I$ なので $L=4I-J$ です。$\mathbf1$ 上では $J\mathbf1=4\mathbf1$ より $L\mathbf1=0$。$\mathbf1^{\mathsf T}g=0$ なら $Jg=\mathbf1(\mathbf1^{\mathsf T}g)=0$ より $Lg=4g$ です。直交補の次元は3なので固有値は $0$（1重）、$4$（3重）です。

$f$ の座標和は零だから $Lf=4f$ で、$f^{\mathsf T}Lf=4(1^2+(-1)^2)=8$ です。辺ごとの和では、値が $(1,-1)$ の辺から4、1と二つの零頂点の二辺から各1、$-1$ と二つの零頂点の二辺から各1、零同士の辺から0、合計 $4+1+1+1+1=8$ です。
<!-- solution-end -->

#### B3. 重みを変えた三頂点道

頂点1と2の間の重みを $a>0$、頂点2と3の間の重みを $b>0$ とする三頂点の道を考える。行列 $L$ の特性多項式を計算し、三つの固有値を求めよ。$a=2,b=1$ で数値を示せ。

- Level: B
- ID: SGT1-B3

<!-- solution-start -->
**詳細解答**　次数と辺重みから組合せLaplacianは

$$
L=\begin{pmatrix}a&-a&0\\-a&a+b&-b\\0&-b&b\end{pmatrix}.
$$

対角和は $\operatorname{tr}L=a+(a+b)+b=2(a+b)$ です。$\det(tI-L)$ の $t^2$ の係数は $-\operatorname{tr}L=-2(a+b)$ です。一方、$t$ の係数に現れる $2\times2$ の主小行列式を三つ計算すると

$$
\begin{aligned}
\det\begin{pmatrix}a&-a\\-a&a+b\end{pmatrix}&=ab,\\
\det\begin{pmatrix}a&0\\0&b\end{pmatrix}&=ab,\\
\det\begin{pmatrix}a+b&-b\\-b&b\end{pmatrix}&=ab.
\end{aligned}
$$

また $L\mathbf1=0$ なので $\det L=0$ です。上の計算から $t^2$ の係数は $-2(a+b)$、$t$ の係数は $ab+ab+ab=3ab$、定数項は零になるはずです。これを[行列式のLeibniz公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)から直接展開して確かめます。まず

$$
tI-L=\begin{pmatrix}
t-a&a&0\\
a&t-a-b&b\\
0&b&t-b
\end{pmatrix}
$$

です。第1行の非零成分に対応する項を取り出し、二次行列式まで展開すると

$$
\begin{aligned}
\det(tI-L)
&=(t-a)\{(t-a-b)(t-b)-b^2\}-a^2(t-b)\\
&=(t-a)\{t^2-(a+2b)t+ab\}-a^2(t-b)\\
&=t^3-2(a+b)t^2+(a^2+3ab)t-a^2b-a^2t+a^2b\\
&=t^3-2(a+b)t^2+3ab\,t\\
&=t\{t^2-2(a+b)t+3ab\}.
\end{aligned}
$$

これで、対角和が $t^2$ の係数、二次主小行列式の和が $t$ の係数になることも確認できました。

非零の二根は二次方程式の解なので

$$
t=(a+b)\pm\sqrt{(a+b)^2-3ab}
=(a+b)\pm\sqrt{a^2-ab+b^2}.
$$

$a=2,b=1$ では $0,\,3-\sqrt3,\,3+\sqrt3$ です。$a,b>0$ より根号内は $(a-b)^2+ab>0$ です。さらに $(a+b)^2-(a^2-ab+b^2)=3ab>0$ かつ $a+b>0$ なので、$0<\sqrt{a^2-ab+b^2}<a+b$ です。ゆえに二つの非零根はいずれも正です。
<!-- solution-end -->

#### B4. サイクルでの固有値の重複

単位重みの $C_4$ で、$u=(1,0,-1,0)^{\mathsf T}$ と $v=(0,1,0,-1)^{\mathsf T}$ が同じ固有値に属することを確認し、その固有値の固有空間の次元を求めよ。

- Level: B
- ID: SGT1-B4

<!-- solution-start -->
**詳細解答**　$L_{C_4}$ の各行と $u,v$ をそれぞれ掛けると

$$
\begin{aligned}
L_{C_4}u&=(2,0,-2,0)^{\mathsf T}=2u,\\
L_{C_4}v&=(0,2,0,-2)^{\mathsf T}=2v.
\end{aligned}
$$

二つのベクトルは互いに直交する非零ベクトルなので一次独立です。よって固有値2の固有空間は少なくとも二次元です。一方、$\mathbf1=(1,1,1,1)$ は固有値0の固有ベクトル、$z=(1,-1,1,-1)$ は固有値4の固有ベクトルです。四本は直交して $\mathbb R^4$ の基底を作ります。従って固有値2の固有空間の次元はちょうど2です。
<!-- solution-end -->

### Level C：細い橋とスペクトルギャップ

#### C1. 二つの三角形を一本の辺で結ぶ

$V=\{1,2,3,4,5,6\}$ とする。$\{1,2,3\}$ と $\{4,5,6\}$ のそれぞれの内部は三角形の三辺（各重み1）で結び、さらに $\{3,4\}$ を重み $t>0$ で結ぶ。それ以外の辺はない。次を求めよ。

1. 各頂点の次数、成分数、および $\operatorname{cut}(\{1,2,3\},\{4,5,6\})$。
2. $g=(1,1,1,-1,-1,-1)^{\mathsf T}$ の $g^{\mathsf T}Lg$ と $g^{\mathsf T}g$。
3. このグラフの組合せLaplacianの第二固有値 $\lambda_2$ に対し $0<\lambda_2\leq 2t/3$ を示せ。
4. 橋の重みを $t=0$ に変更した場合、零固有値の重複度を求め、(3)で成立した厳密な正値性が失われる理由を述べよ。

- Level: C
- ID: SGT1-C1

<!-- solution-start -->
**詳細解答**

**(1)**　各三角形内部では各頂点に重み1の辺が二本接続します。頂点3と4にはさらに橋の重み $t$ が加わるため

$$
(d_1,d_2,d_3,d_4,d_5,d_6)=(2,2,2+t,2+t,2,2).
$$

$t>0$ なので両三角形を橋が結び、全体が一つの成分になります。境界をまたぐのは $\{3,4\}$ のみなので cut は $t$ です。

**(2)**　各三角形内部では $g_i$ がすべて一致するので、その六辺の差の二乗は零です。橋だけで $g_3-g_4=1-(-1)=2$ です。[Dirichletエネルギーの辺表示](#thm-sgt1-dirichlet)に代入して

$$
g^{\mathsf T}Lg=t(2)^2=4t,\qquad
g^{\mathsf T}g=1+1+1+1+1+1=6
$$

です。

**(3)**　$g$ は前半三つが1、後半三つが $-1$ なので $\mathbf1^{\mathsf T}g=3-3=0$、また $g\ne0$ です。[非正規化Laplacianの変分表示](#prop-sgt1-gap-variational)の最小値を取るための試験ベクトルとして使用できます。したがって

$$
\lambda_2
\leq\frac{g^{\mathsf T}Lg}{g^{\mathsf T}g}
=\frac{4t}{6}=\frac{2t}{3}.
$$

一方、$t>0$ でグラフは連結です。[核と連結成分の定理](#thm-sgt1-kernel-components)により零固有値は単純で、[半正定値性](#thm-sgt1-psd)により残りの固有値は正です。従って $0<\lambda_2\leq2t/3$ です。

**(4)**　$t=0$ では二つの三角形を結ぶ正重みの道がなく、成分は二つになります。[核と連結成分の定理](#thm-sgt1-kernel-components)により零固有値は二重で、$\lambda_2=0$ です。(3)の正値性を導くために使った「連結」という仮定が失われました。

このとき $g$ は各成分上で一定の非零零固有ベクトルなので、

$$
\frac{g^{\mathsf T}Lg}{g^{\mathsf T}g}=\frac06=0
$$

です。ただし、連結性を仮定する[非正規化Laplacianの変分表示](#prop-sgt1-gap-variational)を $t=0$ に直接適用してはいけません。第二固有値が零になるのは、零固有値の重複度が二つに増えたことから判断します。
<!-- solution-end -->

## 7. 次章への問い

組合せLaplacianは辺の差の二乗を測り、零固有値がグラフの成分数を数えることまで証明できました。一方、各頂点の次数が大きく違うグラフで固有値を比べると、次数そのものの影響が混ざります。そこで次章では次数を使った正規化を導入します。ただし $d_i=0$ の孤立頂点で逆数を取る操作には意味がないため、定義域から丁寧に整理します。
