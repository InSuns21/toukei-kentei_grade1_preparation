# CM2-07 正則ベクトル束と正則切断

<!-- definition-example-audit: strict -->

## 1. 一本の基底から、複数本の基底へ

前章の[正則線束と局所自明化](../CM2-06/index.md#def-cm2-06-holomorphic-line-bundle)では、繊維が複素一次元であるため、各領域で選んだ基準ベクトルの取り替えは非零正則関数の掛け算だった。複素接束のように各点へ複数次元のベクトル空間を載せると、局所的な基底を複数本選ぶ必要がある。基底の変更は一つの数でなく**可逆行列**で表す。

行列には乗法の順序がある。線束の式を無造作に置き換えると、行列の余輪条件や切断係数の向きを間違える。ここではまず列ベクトルと枠の約束を固定し、行列から束を貼り合わせ、さらに「大域切断があること」と「大域枠があること」の差を調べる。具体例には前章の[射影直線上の線束](../CM2-06/index.md#prop-cm2-06-ok-sections)を使う。

## 2. 階数 $r$ の正則ベクトル束

局所的な座標は $U\times\mathbb C^r$ である。しかし、異なる $U$ で選んだ座標が一つの大域座標につながるとは限らない。

<a id="def-cm2-07-holomorphic-vector-bundle"></a>

<!-- formal-statement-start -->
> **定義（正則ベクトル束と局所自明化）**  
> 複素多様体 $X$ 上の階数 $r\ge1$ の正則ベクトル束とは、複素多様体 $E$、正則写像 $\pi:E\to X$、各繊維 $E_x=\pi^{-1}(x)$ の複素 $r$ 次元ベクトル空間構造であって、開被覆 $(U_i)$ と正則同型

$$
\Phi_i:\pi^{-1}(U_i)\longrightarrow U_i\times\mathbb C^r
$$

> が存在し、$\operatorname{pr}_1\circ\Phi_i=\pi$ かつ各 $x\in U_i$ で $\Phi_i|_{E_x}$ が複素線形同型となるものをいう。$\Phi_i$ を局所自明化という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-07-holomorphic-vector-bundle -->
**定義の確認**。$X=\mathbb C$、$E=X\times\mathbb C^2$、$\pi(z,(a,b))=z$ とし、$U_0=U_1=X$ で $\Phi_0(z,v)=(z,v)$、$\Phi_1(z,v)=(z,A(z)^{-1}v)$ と置く。ただし

$$
A(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix},
\qquad
A(z)^{-1}=\begin{pmatrix}1&-z\\0&1\end{pmatrix}.
$$

> 二つの $\Phi_i$ は正則で逆も正則、各繊維の作用は可逆複素線形であり、射影と可換である。したがって同じ自明束に二通りの局所自明化を与える。
<!-- definition-example-end -->

各 $U_i$ で標準基底を逆写像で引き戻し、正則な局所切断 $e_{i1},\ldots,e_{ir}$ を得る。これらを横に並べて

$$
\mathcal E_i=(e_{i1},\ldots,e_{ir})
$$

と書く。各点でこの $r$ 本は $E_x$ の基底である。$\mathcal E_i$ は行ベクトル状に並んだ**枠**、係数 $v_i$ は縦の $r$ 成分列ベクトルとし、ベクトル $s(x)$ を $\mathcal E_i(x)v_i(x)$ と表す。行・列の向きを明記しておくと、式の順序が曖昧にならない。

## 3. 遷移行列と余輪

重なり $U_i\cap U_j$ では基底同士を比べることができる。一意な行列 $G_{ij}(x)$ があって

$$
\mathcal E_j=\mathcal E_iG_{ij}
$$

となる。各列は $e_{jk}$ の $\mathcal E_i$ 基底に関する係数である。行列の各成分は正則で、基底から基底への変換なので行列式は零にならない。

<a id="def-cm2-07-transition-matrices"></a>

<!-- formal-statement-start -->
> **定義（遷移行列と行列値余輪）**  
> 複素多様体 $X$ の開被覆 $(U_i)$ に対し、各 $U_i\cap U_j$ 上の正則写像 $G_{ij}:U_i\cap U_j\to GL_r(\mathbb C)$ が次を満たすとき、階数 $r$ の正則な遷移行列系という。

$$
G_{ii}=I_r,\qquad G_{ij}G_{ji}=I_r,\qquad
G_{ij}G_{jk}=G_{ik}
\quad\text{on }U_i\cap U_j\cap U_k.
$$

> この章では、領域間の基底変更を $\mathcal E_j=\mathcal E_iG_{ij}$ の向きで記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-07-transition-matrices -->
**定義の確認**。上の自明束で $\mathcal E_0=(\varepsilon_1,\varepsilon_2)$、$\mathcal E_1=(\varepsilon_1,\varepsilon_2)A(z)$ と置くと $G_{01}=A(z)$、$G_{10}=A(z)^{-1}$、$G_{00}=G_{11}=I_2$ である。$\det A=1$ なので全平面で可逆であり、$G_{01}G_{10}=I_2$ を直接計算できる。三重重なりを調べるには $\mathcal E_2=\mathcal E_1B$ の枠を追加し、$G_{02}=AB$ と取ればよい。ここで $AB$ の順序を逆にできない。
<!-- definition-example-end -->

<a id="prop-cm2-07-frames-cocycle"></a>

<!-- formal-statement-start -->
> **命題（局所枠からの行列値余輪）**  
> 階数 $r$ の正則ベクトル束 $E\to X$ に正則な局所基底 $(\mathcal E_i)$ を取る。次の基底変更式で定まる行列は正則 $GL_r(\mathbb C)$ 値であり、定義した三つの余輪条件を満たす。

$
\mathcal E_j=\mathcal E_iG_{ij}.
$
<!-- formal-statement-end -->

### 証明の見取り図

ある枠で別の枠の全列を成分表示し、三重重なりで基底変更を二段階行う。結果の順序は $G_{ij}G_{jk}$ である。

<!-- proof-start -->
### 証明

$\Phi_i(e_{jk}(x))$ の第二成分は $G_{ij}$ の第 $k$ 列である。$\Phi_i$ と $e_{jk}$ が正則だから全成分が正則で、同じ繊維の二組の基底を結ぶ行列なので $\det G_{ij}(x)\ne0$。さらに

$$
\mathcal E_i=\mathcal E_iG_{ii}
\quad\Longrightarrow\quad G_{ii}=I_r,
$$

$$
\mathcal E_i=\mathcal E_jG_{ji}
=\mathcal E_iG_{ij}G_{ji}
\quad\Longrightarrow\quad G_{ij}G_{ji}=I_r.
$$

三重重なりでは

$$
\mathcal E_k=\mathcal E_jG_{jk}
=\mathcal E_i(G_{ij}G_{jk})
=\mathcal E_iG_{ik}.
$$

$\mathcal E_i$ が基底なので各列の係数の一意性から $G_{ij}G_{jk}=G_{ik}$ が従う。$ \square$
<!-- proof-end -->

**順序の反例**。$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ とすると

$$
AB=\begin{pmatrix}2&1\\1&1\end{pmatrix},
\qquad
BA=\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

三枚の枠に $G_{01}=A,G_{12}=B$ を選んだら、$G_{02}=AB$ としなければならない。$BA$ への置換は三重重なりで一つの繊維ベクトルに異なる係数を割り当ててしまう。

## 4. 余輪から束を構成する

行列が与えられただけでは、各点の繊維はまだ別々の $\mathbb C^r$ に存在する。線束の場合の[余輪からの貼り合わせ](../CM2-06/index.md#thm-cm2-06-gluing)を、今度は行列積の順序に注意して実行する。

<a id="thm-cm2-07-gluing"></a>

<!-- formal-statement-start -->
> **定理（正則遷移行列からの貼り合わせ）**  
> 複素多様体 $X$ の開被覆 $(U_i)$ に正則な $GL_r(\mathbb C)$ 値の行列系 $(G_{ij})$ が与えられ、以下の余輪条件を満たすとする。

$
G_{ii}=I_r,\qquad G_{ij}G_{ji}=I_r,\qquad
G_{ij}G_{jk}=G_{ik}.
$

> このとき階数 $r$ の正則ベクトル束 $E\to X$ を構成でき、各 $U_i$ 上の正則な局所基底は次の変換式を満たすように選べる。

$
\mathcal E_j=\mathcal E_iG_{ij}.
$
<!-- formal-statement-end -->

### 証明の見取り図

各 $U_i\times\mathbb C^r$ を用意し、$j$ 側の係数 $v_j$ を $i$ 側へ移すとき $v_i=G_{ij}v_j$ とする。同値関係と正則な局所座標を別々に確認する。

<!-- proof-start -->
### 証明

互いに区別した直和的な集合 $D=\coprod_i(U_i\times\mathbb C^r)_i$ 上で、$x\in U_i\cap U_j$ のとき

$$
(x,v_i)_i\sim(x,v_j)_j
\quad\Longleftrightarrow\quad
v_i=G_{ij}(x)v_j
$$

と置く。反射性は $G_{ii}=I_r$、対称性は $G_{ji}=G_{ij}^{-1}$ による。推移性は

$$
v_i=G_{ij}v_j=G_{ij}G_{jk}v_k
=G_{ik}v_k
$$

による。従って同値関係である。商集合 $E=D/{\sim}$ の各同値類の基点 $x$ は一定なので、$\pi:E\to X$ を定義できる。$U_i$ 上で

$$
\Phi_i([(x,v_j)_j])=(x,G_{ij}(x)v_j)
$$

と置く（$x\in U_i\cap U_j$）。代表の変更で値が不変なのは余輪条件による。この写像の逆は $(x,v)\mapsto[(x,v)_i]$ であり、従って各 $\Phi_i$ は全単射である。$E$ にこれらの局所写像が同相となる位相を入れると、重なりの座標変換は

$$
\Phi_i\Phi_j^{-1}(x,v)=(x,G_{ij}(x)v)
$$

で、行列の成分が正則だから正則であり、逆も $G_{ji}$ によって正則である。重なりの整合から複素多様体のアトラスが定まる。異なる基点の二点は $X$ のHausdorff性で分離でき、同じ基点の異なる二点は一つの自明化の中で分離できるので $E$ はHausdorff。第二可算性は $X$ の可算基と各自明化の可算基から得られる（開被覆は第二可算性により可算部分被覆へ縮められる）。各繊維の線形構造は局所同型の貼り合わせで矛盾なく定まる。

局所基底を $\mathcal E_i(x)a=[(x,a)_i]$ と定めると、$[(x,a)_j]=[(x,G_{ij}a)_i]$ なので $\mathcal E_j=\mathcal E_iG_{ij}$。$ \square$
<!-- proof-end -->

## 5. 切断の係数と枠の変更

束があれば、各点で繊維の中のベクトルを一つ選ぶ写像を考えられる。局所表示同士が一致するかを確かめることが、大域切断を構成する基本操作となる。

<a id="def-cm2-07-holomorphic-section"></a>

<!-- formal-statement-start -->
> **定義（正則ベクトル束の正則切断）**  
> 正則ベクトル束 $\pi:E\to X$ の正則切断とは、正則写像 $s:X\to E$ で $\pi\circ s=\operatorname{id}_X$ を満たすものをいう。局所基底 $\mathcal E_i$ に関して $s|_{U_i}=\mathcal E_i v_i$ と表したとき、$v_i:U_i\to\mathbb C^r$ は正則であり、重なりでは

$$
v_i=G_{ij}v_j
$$

> が成り立つ。逆にこの条件を満たす正則係数列 $(v_i)$ は一意な大域正則切断を定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-07-holomorphic-section -->
**定義の確認**。$X=\mathbb C$ の自明束で $G_{01}(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ とし、$v_1(z)=\binom{z}{1}$ と置くと

$$
v_0(z)=G_{01}(z)v_1(z)
=\begin{pmatrix}1&z\\0&1\end{pmatrix}
\binom z1
=\binom{2z}{1}.
$$

> どちらの係数も全平面で正則であり、重なりで $\mathcal E_0v_0=\mathcal E_1v_1$ だから大域切断が定まる。
<!-- definition-example-end -->

重なりで $s=\mathcal E_iv_i=\mathcal E_jv_j=\mathcal E_iG_{ij}v_j$ と書き、基底係数の一意性を使えば変換式が出る。「枠は $G_{ij}$ 倍」「係数は逆行列倍」という言い方をすると、どちらの座標から見た式なのかが曖昧になる。上の $v_i=G_{ij}v_j$ を直接使う方が確実である。

新たな枠を $\mathcal E'_i=\mathcal E_iH_i$（$H_i:U_i\to GL_r(\mathbb C)$ は正則）とする。すると

$$
\mathcal E'_j=\mathcal E_jH_j
=\mathcal E_iG_{ij}H_j
=\mathcal E'_i(H_i^{-1}G_{ij}H_j).
$$

<a id="prop-cm2-07-gauge-frame-change"></a>

<!-- formal-statement-start -->
> **命題（枠の変更と係数行列）**  
> 階数 $r$ の正則ベクトル束で、正則可逆行列 $H_i$ により局所基底を $\mathcal E'_i=\mathcal E_iH_i$ と取り替える。新しい遷移行列 $G'_{ij}$ と切断係数 $v'_i$ は

$$
G'_{ij}=H_i^{-1}G_{ij}H_j,
\qquad v'_i=H_i^{-1}v_i
$$

> を満たす。これらは行列積の順序を保ったまま計算する。
<!-- formal-statement-end -->

### 証明の見取り図

枠を変えた等式と、同じ切断の新旧成分表示をそれぞれ比較する。二つの公式を混同しない。

<!-- proof-start -->
### 証明

第一式は直前の $\mathcal E'_j$ の展開から、$\mathcal E'_i$ の列が基底であることにより従う。第二式は

$$
\mathcal E_iv_i=s=\mathcal E'_iv'_i
=\mathcal E_iH_iv'_i
$$

より $v_i=H_iv'_i$、従って $v'_i=H_i^{-1}v_i$。新しい成分の貼り合わせも

$$
G'_{ij}v'_j
=H_i^{-1}G_{ij}H_jH_j^{-1}v_j
=H_i^{-1}G_{ij}v_j
=H_i^{-1}v_i=v'_i
$$

と直接検証できる。$ \square$
<!-- proof-end -->

## 6. 何本の大域切断があれば自明か

線束では[零でない大域切断が一つあること](../CM2-06/index.md#prop-cm2-06-frame-change)が正則自明性と同値だった。階数 $r$ の場合には、切断が $r$ 本あっても、同じ点で線形従属になれば基底ではない。全点で独立という条件が必要になる。

<a id="def-cm2-07-global-frame"></a>

<!-- formal-statement-start -->
> **定義（大域正則枠）**  
> 階数 $r$ の正則ベクトル束 $E\to X$ に対する大域正則枠とは、正則切断 $s_1,\ldots,s_r$ の組で、任意の $x\in X$ において $s_1(x),\ldots,s_r(x)$ が繊維 $E_x$ の複素ベクトル空間としての基底になるものをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-07-global-frame -->
**定義の確認**。自明束 $E=X\times\mathbb C^2$ では $s_1(x)=(x,(1,0))$、$s_2(x)=(x,(0,1))$ が正則切断である。各点の二本を列に並べた行列は $I_2$ で行列式は $1$。従って全点で独立であり大域枠となる。一方 $(s_1,2s_1)$ の行列式は $0$ で、二本あっても枠にならない。
<!-- definition-example-end -->

<a id="thm-cm2-07-global-frame-triviality"></a>

<!-- formal-statement-start -->
> **定理（大域正則枠と正則自明性の同値）**  
> 複素多様体 $X$ 上の階数 $r$ の正則ベクトル束 $E$ が正則に自明であるための必要十分条件は、$r$ 本の大域正則切断からなる大域正則枠が存在することである。局所基底 $\mathcal E_i$ で切断の成分を列に並べた行列を $S_i$ とすると、条件は全 $x\in U_i$ で $\det S_i(x)\ne0$ となることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

切断を列に並べた $S_i$ が可逆なら、各局所基底を同じ大域切断の組へ取り替えられる。反対方向では自明束の標準基底を引き戻す。

<!-- proof-start -->
### 証明

$s_a|_{U_i}=\mathcal E_iv_{ia}$ と書き、$S_i=(v_{i1},\ldots,v_{ir})$ と置く。切断の貼り合わせから

$$
S_i=G_{ij}S_j
$$

である。$S_i$ の列は $\mathcal E_i$ 基底に関する切断の座標列なので、各点の独立性と $\det S_i\ne0$ は同値。全 $S_i$ が可逆なら $\mathcal E'_i=\mathcal E_iS_i$ と取り替えると、[枠変更の公式](#prop-cm2-07-gauge-frame-change)より

$$
G'_{ij}=S_i^{-1}G_{ij}S_j
=S_i^{-1}S_i=I_r.
$$

ゆえに $\mathcal E'_i$ は全域で同じ $r$ 本の切断を表す。この枠を使って

$$
F:X\times\mathbb C^r\longrightarrow E,\qquad
F(x,a)=\sum_{k=1}^ra_ks_k(x)
$$

と定義する。$U_i$ 上では $\Phi_i(F(x,a))=(x,S_i(x)a)$。$S_i$ の各成分が正則で $\det S_i\ne0$ だから、逆行列 $S_i^{-1}=\operatorname{adj}(S_i)/\det S_i$ も正則である。従って $F$ は繊維線形な正則同型。逆に正則同型 $X\times\mathbb C^r\cong E$ があれば、定数標準基底 $e_1,\ldots,e_r$ の正則切断の像が全点で基底をなし、大域正則枠となる。$ \square$
<!-- proof-end -->

## 7. 具体例：線束を二本並べても大域枠になるとは限らない

正則線束 $L,M$ の各繊維を直和にした $L\oplus M$ は階数二の正則ベクトル束になる。前章で使った線束の貼り合わせ係数が $g_{ij},h_{ij}$ なら

$$
G_{ij}=\begin{pmatrix}g_{ij}&0\\0&h_{ij}\end{pmatrix}.
$$

ブロック行列の積は $\operatorname{diag}(g_{ij}g_{jk},h_{ij}h_{jk})$ だから、双方の余輪条件を満たせば[貼り合わせ定理](#thm-cm2-07-gluing)を適用できる。正則切断は二成分に分かれ、切断の整合式はそれぞれ $f_i=g_{ij}f_j$、$h_i=h_{ij}h_j$ となる。

<a id="prop-cm2-07-direct-sum-sections"></a>

<!-- formal-statement-start -->
> **命題（射影直線上の直和束の正則切断）**  
> 整数 $a,b$ に対し、$\mathbb{CP}^1$ 上の階数二の正則ベクトル束 $E=\mathcal O(a)\oplus\mathcal O(b)$ を、二チャートの遷移行列

$$
G_{0\infty}(z)=\begin{pmatrix}z^a&0\\0&z^b\end{pmatrix}
\qquad (z\in\mathbb C^\times)
$$

> で構成する。このとき大域正則切断全体は、両成分それぞれの線束の大域切断全体の直和に同型であり、その次元は

$$
\dim_{\mathbb C}H^0(\mathbb{CP}^1,E)
=\max(a+1,0)+\max(b+1,0)
$$

> である。ここで $H^0$ は本命題では大域正則切断の複素ベクトル空間を表す記号とする。
<!-- formal-statement-end -->

### 証明の見取り図

対角行列は二つの係数を混ぜないので、前章の $\mathcal O(k)$ の切断分類を成分ごとに適用する。

<!-- proof-start -->
### 証明

$U_0$、$U_\infty$ 上の係数を $v_0=(f_0,h_0)^T$、$v_\infty=(f_\infty,h_\infty)^T$ とすると

$$
v_0(z)=G_{0\infty}(z)v_\infty(1/z)
\quad\Longleftrightarrow\quad
\begin{cases}
f_0(z)=z^af_\infty(1/z),\\
h_0(z)=z^bh_\infty(1/z).
\end{cases}
$$

両式の間には追加の制約がない。[射影直線上のねじれ線束の切断分類](../CM2-06/index.md#prop-cm2-06-ok-sections)を第一式の整数 $a$ と第二式の整数 $b$ にそれぞれ代入する。$a<0$ なら $f_0=f_\infty=0$、$a\ge0$ なら $f_0$ は次数高々 $a$ の任意多項式で次元 $a+1$。$h$ 側も $b$ で同様だから、成分を独立に選べ、次元式が従う。$ \square$
<!-- proof-end -->

たとえば $E=\mathcal O(-1)\oplus\mathcal O(1)$ なら、大域切断は $U_0$ で $(0,a+bz)^T$ と書ける。$a,b$ の二つのパラメータがあるので切断空間の次元は $2$ だが、どの切断も各点で第一成分が $0$ である。二本選んでも繊維の二次元空間を張れず、[大域枠による自明性判定](#thm-cm2-07-global-frame-triviality)から $E$ は正則に自明でない。**切断空間の次元が階数に等しいことは、大域枠の存在を意味しない。**

もう一つ、$E=\mathcal O(1)\oplus\mathcal O(0)$ なら大域切断の次元は $2+1=3$ だが、任意の二本の切断の行列式は $\mathcal O(1)$ の切断に対応する。前章の[正則切断の分類](../CM2-06/index.md#prop-cm2-06-ok-sections)によれば非零の $\mathcal O(1)$ 切断には必ず零点があるから、大域枠にはならない。切断がたくさんあっても十分ではない。

## 8. 演習：行列積・局所係数・大域障害

### Level A

<a id="ex-cm2-07-a01"></a>
#### CM2-07-A01 三重重なりの行列積
- Level: A

三枚の同じ複素平面の被覆で

$$
G_{01}(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix},
\quad
G_{12}(z)=\begin{pmatrix}1&0\\z&1\end{pmatrix}
$$

とする。$G_{02}$ を求め、$G_{12}G_{01}$ では代用できないことを $z=1$ で確かめよ。

<!-- solution-start -->
**詳細解答**。[行列値余輪](#def-cm2-07-transition-matrices)の三重重なり条件から

$$
G_{02}=G_{01}G_{12}
=\begin{pmatrix}1+z^2&z\\z&1\end{pmatrix}.
$$

$G_{01}G_{12}$ の $(1,1)$ 成分は $1+z\cdot z$、$(2,2)$ 成分は $1$ である。一方

$$
G_{12}G_{01}
=\begin{pmatrix}1&z\\z&1+z^2\end{pmatrix}.
$$

$z=1$ では前者の $(1,1)$ 成分が $2$、後者が $1$。両者は等しくない。$\det G_{01}=\det G_{12}=1$ なので積も全点で可逆である。
<!-- solution-end -->

<a id="ex-cm2-07-a02"></a>
#### CM2-07-A02 切断係数の移し替え
- Level: A

$G_{01}(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix}$、$v_1(z)=(z,1)^T$ とする。$v_0$ を求めよ。

<!-- solution-start -->
**詳細解答**。切断の[局所係数の整合式](#def-cm2-07-holomorphic-section)は $v_0=G_{01}v_1$ なので

$$
v_0(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix}
\begin{pmatrix}z\\1\end{pmatrix}
=\begin{pmatrix}z+z\\1\end{pmatrix}
=\begin{pmatrix}2z\\1\end{pmatrix}.
$$

二つの係数はともに正則で、同じ切断の局所表示である。
<!-- solution-end -->

<a id="ex-cm2-07-a03"></a>
#### CM2-07-A03 枠の変更の順序
- Level: A

$G_{01}=\begin{pmatrix}1&z\\0&1\end{pmatrix}$、$H_0=\operatorname{diag}(2,1)$、$H_1=\operatorname{diag}(1,3)$ によって枠を変更する。新しい遷移行列を求めよ。

<!-- solution-start -->
**詳細解答**。[枠の変更公式](#prop-cm2-07-gauge-frame-change)は $G'_{01}=H_0^{-1}G_{01}H_1$ である。まず

$$
G_{01}H_1
=\begin{pmatrix}1&3z\\0&3\end{pmatrix},
\qquad
H_0^{-1}=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}.
$$

従って

$$
G'_{01}=\begin{pmatrix}1/2&3z/2\\0&3\end{pmatrix}.
$$

行列式は $3/2\ne0$ で、新しい局所基底の遷移として可逆である。
<!-- solution-end -->

<a id="ex-cm2-07-a04"></a>
#### CM2-07-A04 対角余輪の確認
- Level: A

$\mathbb{CP}^1$ の二枚のチャート上で $G_{0\infty}(z)=\operatorname{diag}(z,z^{-1})$ とする。逆行列を $w=1/z$ の式で表し、正則遷移の条件を確かめよ。

<!-- solution-start -->
**詳細解答**。$z\in\mathbb C^\times$ 上では行列式が $z\cdot z^{-1}=1$ なので可逆で、逆は $\operatorname{diag}(z^{-1},z)$。逆向きの座標 $w=1/z$ で書けば

$$
G_{\infty0}(w)=\begin{pmatrix}w&0\\0&w^{-1}\end{pmatrix}.
$$

重なりでは $G_{0\infty}(z)G_{\infty0}(1/z)=\operatorname{diag}(1,1)=I_2$。対角成分は $\mathbb C^\times$ 上で正則であり、対角要素ごとに余輪を満たすので[貼り合わせ定理](#thm-cm2-07-gluing)で階数二の束を構成できる。
<!-- solution-end -->

<a id="ex-cm2-07-a05"></a>
#### CM2-07-A05 直和束の切断を無限遠で読む
- Level: A

$E=\mathcal O(1)\oplus\mathcal O(0)$ の $U_0$ における切断係数が $v_0(z)=(1+2z,3)^T$ のとき、$U_\infty$ における係数 $v_\infty(w)$ を求めよ。

<!-- solution-start -->
**詳細解答**。遷移行列は $G_{0\infty}(z)=\operatorname{diag}(z,1)$ である。$v_0(z)=G_{0\infty}(z)v_\infty(1/z)$ から

$$
v_\infty(w)
=G_{0\infty}(1/w)^{-1}v_0(1/w)
=\begin{pmatrix}w&0\\0&1\end{pmatrix}
\binom{1+2/w}{3}
=\binom{w+2}{3}.
$$

$w=0$ でも正則なので、大域切断になる。
<!-- solution-end -->

### Level B

<a id="ex-cm2-07-b01"></a>
#### CM2-07-B01 余輪条件が破れた場合
- Level: B

三枚の同じ円板上で $G_{01}=A$、$G_{12}=B$ とし、第3節の定数行列 $A,B$ を使う。$G_{02}=BA$ と誤って置くと何が壊れるか、添字 $2$ の係数 $v_2=(1,0)^T$ から二つの経路で示せ。

<!-- solution-start -->
**詳細解答**。$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ と置く。$2\to1\to0$ では

$$
v_1=Bv_2=\binom11,\qquad
v_0=Av_1=\binom21.
$$

直接の $2\to0$ は $G_{02}=BA=\begin{pmatrix}1&1\\1&2\end{pmatrix}$ としたので

$$
v_0'=G_{02}v_2=\binom11.
$$

同じ点・同じベクトルの $0$ 側の係数が $(2,1)^T$ と $(1,1)^T$ に分かれ、[貼り合わせ定理](#thm-cm2-07-gluing)の推移性が破れる。$G_{02}=AB$ に直せば二経路は一致する。
<!-- solution-end -->

<a id="ex-cm2-07-b02"></a>
#### CM2-07-B02 非対角遷移でも自明な例
- Level: B

$\mathbb{CP}^1$ の二チャートで $G_{0\infty}(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix}$ とする。この束が正則に自明であることを、各チャート上の枠変更行列を明示して示せ。

<!-- solution-start -->
**詳細解答**。$U_0\cong\mathbb C$ に

$$
H_0(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix},
$$

$U_\infty\cong\mathbb C$ に $H_\infty(w)=I_2$ と取る。$H_0$ の行列式は全 $z$ で $1$、逆行列も $U_0$ 全体で正則。$H_\infty$ も同様。[枠変更の公式](#prop-cm2-07-gauge-frame-change)から

$$
G'_{0\infty}
=H_0^{-1}G_{0\infty}H_\infty
=\begin{pmatrix}1&-z\\0&1\end{pmatrix}
\begin{pmatrix}1&z\\0&1\end{pmatrix}
=I_2.
$$

従って新しい局所基底は重なりで一致し、大域正則枠を作る。[大域枠と自明性の同値](#thm-cm2-07-global-frame-triviality)によって束は自明。非定数かつ非対角の遷移行列があっても、それだけでは非自明性を示さない。
<!-- solution-end -->

<a id="ex-cm2-07-b03"></a>
#### CM2-07-B03 切断は二次元でも枠がない
- Level: B

$E=\mathcal O(-1)\oplus\mathcal O(1)$ に対し、全大域正則切断を $U_0$ 上の係数で求め、$\dim H^0(E)$ と自明性を判定せよ。

<!-- solution-start -->
**詳細解答**。[直和束の切断命題](#prop-cm2-07-direct-sum-sections)の $a=-1,b=1$ を代入する。第一成分は負の次数なので恒等的に零、第二成分は次数高々一の多項式だから

$$
v_0(z)=\binom{0}{a+bz},\qquad a,b\in\mathbb C.
$$

無限遠側は $v_\infty(w)=(0,aw+b)^T$ であり、零でない切断が二次元のパラメータを持つため $\dim H^0(E)=2$。しかし二本の切断を選んでも、局所係数行列の第一行がどこでも零なので行列式が恒等的に零。[大域枠判定](#thm-cm2-07-global-frame-triviality)の条件を満たさず、$E$ は正則に自明ではない。
<!-- solution-end -->

<a id="ex-cm2-07-b04"></a>
#### CM2-07-B04 切断が三本分あっても自明でない
- Level: B

$E=\mathcal O(1)\oplus\mathcal O(0)$ について $\dim H^0(E)$ を求め、任意の二つの大域正則切断の行列式がどこかで零になることを両チャートの式から示せ。

<!-- solution-start -->
**詳細解答**。[直和束の切断分類](#prop-cm2-07-direct-sum-sections)から次元は $2+1=3$。二つの大域切断を $U_0$ 上で

$$
v_0^{(1)}=\binom{a+bz}{c},\qquad
v_0^{(2)}=\binom{d+ez}{f}
$$

と書く。係数行列の行列式は

$$
\Delta_0(z)=(a+bz)f-(d+ez)c
=(af-cd)+(bf-ce)z.
$$

$U_\infty$ では $v_\infty=\operatorname{diag}(w,1)v_0(1/w)$ なので、その行列式は

$$
\Delta_\infty(w)=w\Delta_0(1/w)
=(af-cd)w+(bf-ce).
$$

$bf-ce\ne0$ なら $\Delta_0$ が $z=-(af-cd)/(bf-ce)$ で零になる。$bf-ce=0$ なら $\Delta_\infty(0)=0$。$\Delta_0$ が恒等的に零の場合も枠ではない。従ってどの二本も全域で独立にはならず、[大域枠による判定](#thm-cm2-07-global-frame-triviality)から $E$ は正則に非自明。
<!-- solution-end -->

### Level C

<a id="ex-cm2-07-c01"></a>
#### CM2-07-C01 引き戻しと大域枠の障害
- Level: C

$F:\mathbb{CP}^1\to\mathbb{CP}^1$ を $F([Z_0:Z_1])=[Z_0^2:Z_1^2]$ とし、$E=\mathcal O(1)\oplus\mathcal O(-1)$ とする。引き戻し束 $F^*E$ は各 $x$ に目標点 $F(x)$ 上の繊維を載せ、局所基底を $F$ と合成して構成する。

1. $F$ は正則で、二チャートの局所座標がともに二乗写像であることを示せ。
2. $F^*E$ の $G_{0\infty}$ とその逆を求めよ。
3. $F^*E$ の全大域正則切断を $U_0$ で書き、その次元を求めよ。
4. 切断空間の次元が束の階数より大きくても、正則自明化ができない理由を証明せよ。

<!-- solution-start -->
**詳細解答**。(1) 同次座標を零でない複素数倍すると、その像も同じ射影点を表す。

$
F([\lambda Z_0:\lambda Z_1])
=[\lambda^2 Z_0^2:\lambda^2 Z_1^2]
=[Z_0^2:Z_1^2].
$

$Z_0,Z_1$ が同時に零でなければ、平方した二つも同時に零にならないから、写像は全ての射影点で定義される。二枚のチャートにおける局所表示は、それぞれ

$
z=\frac{Z_1}{Z_0}\longmapsto z^2,
\qquad
w=\frac{Z_0}{Z_1}\longmapsto w^2.
$

いずれも正則である。[正則写像の座標判定](../CM1-02/index.md#def-cm1-02-holomorphic-map)から $F$ は正則である。また複素数の平方が零となるのは元が零の場合だけなので、両チャートの逆像は元のチャートそのものになる。

(2) $E$ の遷移行列は $G_{0\infty}(z)=\operatorname{diag}(z,z^{-1})$。局所基底 $\mathcal E_\infty(y)=\mathcal E_0(y)G_{0\infty}(y)$ を $y=F(x)$ に代入すると、引き戻し枠では

$$
G^{F}_{0\infty}(z)
=G_{0\infty}(F(z))
=\begin{pmatrix}z^2&0\\0&z^{-2}\end{pmatrix}.
$$

$w=1/z$ 側の逆行列は

$$
G^{F}_{\infty0}(w)
=\begin{pmatrix}w^2&0\\0&w^{-2}\end{pmatrix}.
$$

積は $I_2$ で、両行列の成分は重なりの $\mathbb C^\times$ 上で正則である。

(3) [射影直線の線束の大域切断分類](../CM2-06/index.md#prop-cm2-06-ok-sections)を二つの対角成分へそれぞれ適用する。第一成分は $\mathcal O(2)$ なので次数二以下の任意多項式、第二成分は $\mathcal O(-2)$ なので零のみ。従って

$$
v_0(z)=\binom{a+bz+cz^2}{0},\qquad
v_\infty(w)=\binom{aw^2+bw+c}{0}.
$$

後者は $v_\infty(w)=(G^{F}_{0\infty}(1/w))^{-1}v_0(1/w)$ から直接得られ、$w=0$ でも正則である。自由係数が三つなので $\dim H^0(F^*E)=3$。

(4) 任意の二本の大域切断 $s,t$ を選んでも、その $U_0$ 側の係数列はどちらも第二成分が恒等的に零である。従って係数行列

$$
S_0(z)=
\begin{pmatrix}p(z)&q(z)\\0&0\end{pmatrix}
$$

は全 $z$ で行列式が零。$U_\infty$ でも同じである。[大域枠と正則自明性の同値](#thm-cm2-07-global-frame-triviality)の全点独立条件を満たす切断の組がないから、引き戻し束は正則に非自明である。切断数と点ごとの階数を取り違えてはならない。
<!-- solution-end -->

## 9. 次章への接続

これで階数 $r$ の束を正則遷移行列から構成し、切断を貼り合わせ、大域枠の有無で自明性を判定できるようになった。次章では自然に現れる接束や余接束などの標準的な束、双対、テンソル積を扱う。対角行列以外の操作でも行列の向きを一貫して管理する。