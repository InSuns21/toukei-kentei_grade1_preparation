# VC7 添字記法・直交基底・成分変換

VC1 では勾配・発散・回転を デカルト座標の成分で定義しました。本章では、その成分計算を **添字記法**で組み直し、基底を回しても意味が変わらない量と、基底に応じて成分だけが変わる量を区別します。

主役は、三次元ユークリッド空間で直交基底を取り替えたときに一定の変換則へ従う二階の成分量です。第4節でこの対象を正式に定義します。一般の多様体上のテンソル、共変・反変成分、Christoffel 記号、共変微分は扱いません。直交デカルト基底の間の変換に限定することで、連続体力学・流体・電磁気で使う計算言語を、線形代数とベクトル解析だけから構成します。

直接の前提は [VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) と [正規直交系](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) です。VC4 までの prerequisite 経路に VC1 の勾配・発散・回転、VC3 の曲面・法線、LA3C の行列式が含まれるため、それらを重複して direct prerequisite にはしません。

---

## 1. 添字記法の基本

三次元では添字

$$
i,j,k,\ell,p,q,r
$$

は原則として $1,2,3$ を走るものとします。

<a id="def-vc7-einstein"></a>

<!-- formal-statement-start -->
> **定義（Einstein の総和規約と自由添字・ダミー添字）**  
> 一つの項の中で同じ添字がちょうど 2 回現れたとき、その添字について $1,2,3$ の和を取るものとする。これを **Einstein の総和規約**という。
>
> 2 回現れて総和される添字を **ダミー添字**、各項に 1 回ずつ現れて等式の両辺で一致しなければならない添字を **自由添字**という。
<!-- formal-statement-end -->

例えば

$$
a_i b_i
=
\sum_{i=1}^3 a_i b_i
=
a\cdot b
$$

です。$i$ はダミー添字なので、文字自体に意味はありません。

$$
a_i b_i=a_jb_j
$$

と書き換えても同じ量です。

一方

$$
c_i=A_{ij}b_j
$$

では $j$ がダミー添字、$i$ が自由添字です。これは 3 本の式

$$
c_1=A_{11}b_1+A_{12}b_2+A_{13}b_3,
$$

$$
c_2=A_{21}b_1+A_{22}b_2+A_{23}b_3,
$$

$$
c_3=A_{31}b_1+A_{32}b_2+A_{33}b_3
$$

を一行で表しています。

<!-- definition-example-start: def-vc7-einstein -->
**定義の確認**

$$
A=
\begin{pmatrix}
1&2&0\\
0&-1&3\\
2&0&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\2\\-1
\end{pmatrix}
$$

とすると

$$
c_i=A_{ij}b_j
$$

から

$$
c_1=1\cdot1+2\cdot2+0\cdot(-1)=5,
$$

$$
c_2=0\cdot1-1\cdot2+3\cdot(-1)=-5,
$$

$$
c_3=2\cdot1+0\cdot2+1\cdot(-1)=1.
$$

従って $c=(5,-5,1)^T$ です。
<!-- definition-example-end -->

### 添字の文法

次は正しい式です。

$$
c_i=A_{ij}b_j+d_i.
$$

各項の自由添字が $i$ で揃っています。

一方

$$
c_i=A_{ij}b_i
$$

は通常の Einstein 記法としては不正です。右辺で $i$ が 2 回現れて総和される一方、左辺では $i$ が自由添字になっているからです。

また

$$
A_{ii}b_i
$$

のように同じ添字が 1 項中に 3 回現れる式も標準的な Einstein 記法では使いません。

**添字記法は短いぶん、自由添字とダミー添字の型検査が最重要です。**

<a id="def-vc7-contraction"></a>

<!-- formal-statement-start -->
> **定義（縮約）**  
> 同じ項に現れる一組の添字について総和し、その添字を消去する操作を **縮約** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-contraction -->
**定義の確認**

二階の成分配列 $A_{ij}$ に対し

$$
A_{ii}
=
A_{11}+A_{22}+A_{33}
$$

は $i$ についての縮約です。例えば

$$
A=
\begin{pmatrix}
2&1&0\\
3&-1&4\\
0&2&5
\end{pmatrix}
$$

なら

$$
A_{ii}=2-1+5=6.
$$
<!-- definition-example-end -->

---

## 2. 添字をつなぐ恒等記号

<a id="def-vc7-delta"></a>

<!-- formal-statement-start -->
> **定義（Kronecker のデルタ）**  
> $i,j\in\{1,2,3\}$ に対し
>
> $$
> \delta_{ij}
> =
> \begin{cases}
> 1,&i=j,\\
> 0,&i\ne j
> \end{cases}
> $$
>
> と定義する。
<!-- formal-statement-end -->

$\delta_{ij}$ は単位行列の成分です。

したがって

$$
\delta_{ij}a_j=a_i.
$$

実際、$i$ を固定すると

$$
\delta_{i1}a_1+\delta_{i2}a_2+\delta_{i3}a_3
$$

のうち $j=i$ の項だけが残ります。

同様に

$$
\delta_{ij}\delta_{jk}=\delta_{ik},
$$

$$
\delta_{ii}=3.
$$

<!-- definition-example-start: def-vc7-delta -->
**定義の確認**

$i=2$ とすると

$$
\delta_{2j}a_j
=
0\cdot a_1+1\cdot a_2+0\cdot a_3
=
a_2.
$$

$\delta_{ij}$ は「添字をつなぎ替える恒等写像」として働きます。
<!-- definition-example-end -->

---

## 3. 置換の符号と外積

<a id="def-vc7-epsilon"></a>

<!-- formal-statement-start -->
> **定義（Levi--Civita 記号）**  
> $\varepsilon_{ijk}$ を
>
> $$
> \varepsilon_{ijk}
> =
> \begin{cases}
> +1,&(i,j,k)\text{ が }(1,2,3)\text{ の偶置換},\\
> -1,&(i,j,k)\text{ が }(1,2,3)\text{ の奇置換},\\
> 0,&i,j,k\text{ のどれか二つが等しい}
> \end{cases}
> $$
>
> と定義する。
<!-- formal-statement-end -->

例えば

$$
\varepsilon_{123}
=
\varepsilon_{231}
=
\varepsilon_{312}
=
1,
$$

$$
\varepsilon_{132}
=
\varepsilon_{321}
=
\varepsilon_{213}
=
-1.
$$

外積は

$$
(a\times b)_i
=
\varepsilon_{ijk}a_jb_k
$$

と書けます。

<!-- definition-example-start: def-vc7-epsilon -->
**定義の確認**

第 1 成分では

$$
(a\times b)_1
=
\varepsilon_{1jk}a_jb_k.
$$

非零なのは $(j,k)=(2,3),(3,2)$ だけなので

$$
(a\times b)_1
=
a_2b_3-a_3b_2.
$$

通常の外積公式が再現されます。
<!-- definition-example-end -->

<a id="prop-vc7-epsilon-contraction"></a>

<!-- formal-statement-start -->
> **命題（Levi--Civita 記号の縮約公式）**  
> 三次元で
>
> $$
> \boxed{
> \varepsilon_{ijk}\varepsilon_{imn}
> =
> \delta_{jm}\delta_{kn}
> -
> \delta_{jn}\delta_{km}
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左辺は $i$ について和を取ります。$(j,k)$ または $(m,n)$ に重複があれば両辺とも 0 です。重複がない場合は、二つの順序対が同じ向きなら $+1$、逆なら $-1$、それ以外なら 0 になることを右辺が正確に表します。

<!-- proof-start -->
### 証明

まず $j=k$ なら $\varepsilon_{ijk}=0$ なので左辺は 0 です。右辺も

$$
\delta_{jm}\delta_{jn}
-
\delta_{jn}\delta_{jm}
=
0.
$$

$m=n$ の場合も同様です。

以下 $j\ne k$ かつ $m\ne n$ とします。

左辺が非零になるには、ある $i$ について $(i,j,k)$ と $(i,m,n)$ がともに $1,2,3$ の並べ替えでなければなりません。そのためには順序対 $(m,n)$ が $(j,k)$ または $(k,j)$ のどちらかである必要があります。

$(m,n)=(j,k)$ なら、非零となる唯一の $i$ で

$$
\varepsilon_{ijk}\varepsilon_{ijk}=1.
$$

右辺も

$$
\delta_{jj}\delta_{kk}-\delta_{jk}\delta_{kj}
=
1.
$$

$(m,n)=(k,j)$ なら

$$
\varepsilon_{ijk}\varepsilon_{ikj}
=
-1,
$$

右辺も

$$
\delta_{jk}\delta_{kj}-\delta_{jj}\delta_{kk}
=
-1.
$$

それ以外では両辺とも 0 です。従ってすべての添字について主張が成り立ちます。
<!-- proof-end -->

この一式から

$$
\varepsilon_{ijk}\varepsilon_{imk}
=
2\delta_{jm},
$$

$$
\varepsilon_{ijk}\varepsilon_{ijk}
=
6
$$

も得られます。

---

## 4. 直交基底変換と二階成分量

二つの右手系とは限らない正規直交デカルト基底

$$
(e_1,e_2,e_3),
\qquad
(e'_1,e'_2,e'_3)
$$

を考えます。

$$
e'_i=Q_{ij}e_j
$$

と書くと、正規直交性から

$$
Q_{ip}Q_{jp}=\delta_{ij},
$$

すなわち

$$
QQ^T=I.
$$

従って $Q$ は直交行列です。

ベクトル $v=v_je_j=v'_ie'_i$ の成分は

$$
v'_i
=
Q_{ij}v_j
$$

と変換します。

<a id="def-vc7-cartesian-tensor"></a>

<!-- formal-statement-start -->
> **定義（二階デカルトテンソル）**  
> 三次元 ユークリッド空間上の線形写像 $T:\mathbb R^3\to\mathbb R^3$ を考える。正規直交デカルト基底での成分を $T_{ij}$ とし、
>
> $$
> T(v)_i=T_{ij}v_j
> $$
>
> と書く。
>
> 直交基底変換 $e'_i=Q_{ij}e_j$ の下で成分が
>
> $$
> \boxed{
> T'_{ij}
> =
> Q_{ip}Q_{jq}T_{pq}
> }
> $$
>
> と変換する量を、本章では **二階デカルトテンソル**と呼ぶ。行列表記では
>
> $$
> T'=QTQ^T.
> $$
<!-- formal-statement-end -->

これは「行列がテンソル」という意味ではありません。**テンソルは基底に依存しない線形写像であり、行列 $[T_{ij}]$ はその基底表示**です。

<!-- definition-example-start: def-vc7-cartesian-tensor -->
**定義の確認**

$$
T=
\begin{pmatrix}
2&0&0\\
0&1&0\\
0&0&1
\end{pmatrix}
$$

とし、$z$ 軸まわりに $90^\circ$ 回す直交行列

$$
Q=
\begin{pmatrix}
0&1&0\\
-1&0&0\\
0&0&1
\end{pmatrix}
$$

を使います。

すると

$$
T'=QTQ^T
=
\begin{pmatrix}
1&0&0\\
0&2&0\\
0&0&1
\end{pmatrix}.
$$

成分表は変わりますが、同じ線形写像を回転後の基底で見ているだけです。
<!-- definition-example-end -->

### スカラー・ベクトル・二階テンソル

直交基底変換に対し

$$
s'=s
$$

ならスカラー、

$$
v'_i=Q_{ij}v_j
$$

ならベクトル、

$$
T'_{ij}=Q_{ip}Q_{jq}T_{pq}
$$

なら二階テンソルです。

添字の個数が変換行列 $Q$ の個数に対応します。

---

## 5. 二つのベクトルから二階量を作る

<a id="def-vc7-dyadic"></a>

<!-- formal-statement-start -->
> **定義（二項積）**  
> ベクトル $a,b\in\mathbb R^3$ に対し、線形写像
>
> $$
> (a\otimes b)v
> :=
> a(b\cdot v)
> $$
>
> を **二項積（dyadic product）** と呼ぶ。その成分は
>
> $$
> (a\otimes b)_{ij}
> =
> a_i b_j.
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-dyadic -->
**定義の確認**

$$
a=(1,2,0)^T,
\qquad
b=(0,1,3)^T
$$

なら

$$
a\otimes b
=
\begin{pmatrix}
0&1&3\\
0&2&6\\
0&0&0
\end{pmatrix}.
$$

$v=(x,y,z)^T$ に作用させると

$$
(a\otimes b)v
=
a(y+3z),
$$

となり、定義 $a(b\cdot v)$ と一致します。
<!-- definition-example-end -->

<a id="def-vc7-trace-double-contraction"></a>

<!-- formal-statement-start -->
> **定義（跡・二重縮約）**  
> 二階テンソル $T$ の一重縮約
>
> $$
> \operatorname{tr}T
> :=
> T_{ii}
> $$
>
> を **跡** と呼ぶ。
>
> 二つの二階テンソル $A,B$ の全成分について縮約した
>
> $$
> A:B
> :=
> A_{ij}B_{ij}
> $$
>
> を **二重縮約** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-trace-double-contraction -->
**定義の確認**

$$
T=
\begin{pmatrix}
1&2&0\\
0&-1&3\\
4&0&2
\end{pmatrix}
$$

なら

$$
\operatorname{tr}T
=
T_{11}+T_{22}+T_{33}
=
1-1+2
=
2.
$$

単位テンソルを $\delta=(\delta_{ij})$ と書けば

$$
\delta:T
=
\delta_{ij}T_{ij}
=
T_{ii}
=
2.
$$

Kronecker のデルタとの二重縮約が跡を取り出しています。
<!-- definition-example-end -->

行列表記では二重縮約は Frobenius 内積

$$
A:B
=
\operatorname{tr}(A^TB)
$$

に一致します。

---

## 6. 転置で分ける二つの部分

任意の二階テンソル $T$ に対して

$$
S=\frac12(T+T^T),
$$

$$
W=\frac12(T-T^T)
$$

と置きます。

<a id="prop-vc7-symmetric-skew"></a>

<!-- formal-statement-start -->
> **命題（二階テンソルの対称・反対称分解）**  
> 任意の実二階テンソル $T$ は
>
> $$
> T=S+W
> $$
>
> と一意に分解できる。ここで
>
> $$
> S^T=S,
> \qquad
> W^T=-W.
> $$
>
> さらに対称テンソルと反対称テンソルは二重縮約に関して直交し、
>
> $$
> S:W=0
> $$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から

$$
S+W
=
\frac12(T+T^T)+\frac12(T-T^T)
=
T.
$$

また

$$
S^T
=
\frac12(T^T+T)
=
S,
$$

$$
W^T
=
\frac12(T^T-T)
=
-W.
$$

一意性を示します。$T=S_1+W_1$ も対称部分と反対称部分の分解だとします。転置して

$$
T^T=S_1-W_1.
$$

従って

$$
S_1
=
\frac12(T+T^T)=S,
$$

$$
W_1
=
\frac12(T-T^T)=W.
$$

最後に

$$
S:W
=
S_{ij}W_{ij}.
$$

ダミー添字 $i,j$ を交換すると

$$
S_{ij}W_{ij}
=
S_{ji}W_{ji}
=
S_{ij}(-W_{ij})
=
-S:W.
$$

よって $S:W=0$ です。
<!-- proof-end -->

三次元の反対称テンソルは 3 成分しか独立ではありません。あるベクトル $\omega$ に対し

$$
W_{ij}
=
-\varepsilon_{ijk}\omega_k
$$

と書けます。

---

## 7. 跡・行列式と基底不変量

基底変換 $T'=QTQ^T$ に対し

$$
\operatorname{tr}T'
=
\operatorname{tr}(QTQ^T)
=
\operatorname{tr}(TQ^TQ)
=
\operatorname{tr}T.
$$

従って跡は基底に依存しません。

行列式も

$$
\det T'
=
\det Q\,\det T\,\det Q^T
=
(\det Q)^2\det T
=
\det T
$$

です。直交行列では $\det Q=\pm1$ を使いました。

Levi--Civita 記号を使えば

$$
\det A
=
\varepsilon_{ijk}A_{1i}A_{2j}A_{3k}
$$

とも書けます。

さらに直交変換について

$$
Q_{ip}Q_{jq}Q_{kr}\varepsilon_{pqr}
=
(\det Q)\varepsilon_{ijk}.
$$

したがって $\varepsilon_{ijk}$ は鏡映を含む一般の直交変換では通常の三階テンソルのようには振る舞いません。

このため外積は

$$
(Qa)\times(Qb)
=
(\det Q)\,Q(a\times b)
$$

と変換します。

<a id="def-vc7-axial-vector"></a>

<!-- formal-statement-start -->
> **定義（軸性ベクトル）**  
> 直交変換 $Q\in O(3)$ の下で成分が
>
> $$
> w'
> =
> (\det Q)Qw
> $$
>
> と変換する三成分量 $w$ を **軸性ベクトル** と呼ぶ。これに対し通常のベクトルは $v'=Qv$ と変換する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-axial-vector -->
**定義の確認**

$x$ 軸だけを反転する鏡映

$$
Q=\operatorname{diag}(-1,1,1),
\qquad
\det Q=-1
$$

を考えます。$a=e_2,\ b=e_3$ なら

$$
a\times b=e_1.
$$

鏡映後も

$$
(Qa)\times(Qb)
=
e_2\times e_3
=
e_1.
$$

一方、通常のベクトルとして変換すれば

$$
Qe_1=-e_1
$$

ですが、軸性ベクトルの変換則では

$$
(\det Q)Qe_1
=
(-1)(-e_1)
=
e_1.
$$

外積に鏡映時の追加符号が必要なことを直接確認できます。
<!-- definition-example-end -->

---

## 8. ベクトル場の勾配を二階テンソルとして読む

ベクトル場

$$
u=(u_1,u_2,u_3)
$$

に対して、本章では

$$
(\nabla u)_{ij}
:=
\frac{\partial u_i}{\partial x_j}
$$

と約束します。

<a id="prop-vc7-vector-gradient"></a>

<!-- formal-statement-start -->
> **命題（ベクトル場の勾配・発散・回転の添字表示）**  
> $u\in C^1(\Omega;\mathbb R^3)$ に対し
>
> $$
> (\nabla u)_{ij}
> =
> \partial_j u_i,
> $$
>
> $$
> \operatorname{div}u
> =
> \partial_i u_i
> =
> \operatorname{tr}(\nabla u),
> $$
>
> $$
> (\operatorname{curl}u)_i
> =
> \varepsilon_{ijk}\partial_j u_k.
> $$
>
> 直交座標変換 $x'=Qx,\ u'=Qu$ の下で
>
> $$
> \nabla' u'
> =
> Q(\nabla u)Q^T.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x=Q^Tx'$ なので連鎖律から

$$
\partial'_j
=
Q_{jq}\partial_q.
$$

また

$$
u'_i=Q_{ip}u_p.
$$

$Q$ は定数行列だから

$$
\partial'_j u'_i
=
Q_{jq}\partial_q(Q_{ip}u_p)
=
Q_{ip}Q_{jq}\partial_q u_p.
$$

従って

$$
(\nabla'u')_{ij}
=
Q_{ip}Q_{jq}(\nabla u)_{pq},
$$

すなわち

$$
\nabla'u'=Q(\nabla u)Q^T.
$$

発散と回転の式は VC1 のデカルト座標での成分定義を添字で書き直したものです。
<!-- proof-end -->

### 速度勾配の対称・反対称分解

流速 $u$ では

$$
D
=
\frac12(\nabla u+\nabla u^T),
$$

$$
W
=
\frac12(\nabla u-\nabla u^T)
$$

と分けます。

$D$ は局所変形率、$W$ は局所剛体回転に対応する部分です。回転ベクトル

$$
\omega
=
\frac12\operatorname{curl}u
$$

を使えば

$$
W_{ij}
=
-\varepsilon_{ijk}\omega_k.
$$

---

## 9. 添字記法でベクトル恒等式を一行ずつ追う

VC1 で成分計算した恒等式を $\varepsilon$ の縮約で再構成できます。

例えば

$$
\operatorname{curl}(\operatorname{curl}u)
$$

の第 $i$ 成分は

$$
\varepsilon_{ijk}\partial_j
\left(
\varepsilon_{k\ell m}\partial_\ell u_m
\right).
$$

$\varepsilon_{ijk}=\varepsilon_{kij}$ なので縮約公式から

$$
\varepsilon_{ijk}\varepsilon_{k\ell m}
=
\delta_{i\ell}\delta_{jm}
-
\delta_{im}\delta_{j\ell}.
$$

従って

$$
[\operatorname{curl}(\operatorname{curl}u)]_i
=
\partial_i(\partial_j u_j)
-
\partial_j\partial_j u_i.
$$

つまり

$$
\boxed{
\operatorname{curl}(\operatorname{curl}u)
=
\nabla(\operatorname{div}u)
-
\Delta u
}.
$$

デカルト基底では

$$
(\Delta u)_i=\partial_j\partial_j u_i
$$

です。

VC6 で見たように、曲線座標で物理成分へこの式をそのまま機械適用してはいけません。本章の添字計算は **一定の デカルト基底**を前提にしています。

---

## 10. 二階成分場からベクトル場を作る

<a id="def-vc7-tensor-divergence"></a>

<!-- formal-statement-start -->
> **定義（二階テンソル場の発散）**  
> $T=(T_{ij})\in C^1(\Omega;\mathbb R^{3\times3})$ に対し、
>
> $$
> \boxed{
> (\operatorname{div}T)_i
> :=
> \partial_jT_{ij}
> }
> $$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-tensor-divergence -->
**定義の確認**

$$
T(x,y,z)
=
\begin{pmatrix}
x^2 & y & 0\\
0 & xy & z\\
x & 0 & yz
\end{pmatrix}
$$

とすると

$$
(\operatorname{div}T)_1
=
\partial_x(x^2)+\partial_y y+\partial_z0
=
2x+1,
$$

$$
(\operatorname{div}T)_2
=
\partial_x0+\partial_y(xy)+\partial_z z
=
x+1,
$$

$$
(\operatorname{div}T)_3
=
\partial_xx+\partial_y0+\partial_z(yz)
=
1+y.
$$

したがって

$$
\operatorname{div}T
=
(2x+1,x+1,y+1)^T.
$$
<!-- definition-example-end -->

行ごとに通常のベクトル場の発散を取る約束です。

例えば $T=a\otimes b$ なら

$$
T_{ij}=a_i b_j
$$

なので積の微分則から

$$
(\operatorname{div}(a\otimes b))_i
=
\partial_j(a_i b_j)
$$

$$
=
(\partial_ja_i)b_j
+
a_i\partial_jb_j.
$$

従って

$$
\boxed{
\operatorname{div}(a\otimes b)
=
(b\cdot\nabla)a
+
a\,\operatorname{div}b
}.
$$

<a id="thm-vc7-tensor-divergence"></a>

<!-- formal-statement-start -->
> **定理（二階テンソル版 Gauss--Ostrogradsky の発散定理）**  
> $\Omega\subset\mathbb R^3$ を VC4 の [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) を適用できる有界領域とし、$T\in C^1(\overline\Omega;\mathbb R^{3\times3})$ とする。外向き単位法線を $n$ とすると
>
> $$
> \boxed{
> \int_{\partial\Omega}Tn\,dS
> =
> \int_\Omega\operatorname{div}T\,dV
> }.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

新しい積分定理ではありません。$T$ の各行を一つのベクトル場とみなし、VC4 の発散定理を 3 回適用します。

<!-- proof-start -->
### 証明

第 $i$ 成分を固定します。ベクトル場

$$
F^{(i)}
=
(T_{i1},T_{i2},T_{i3})
$$

を考えると

$$
F^{(i)}\cdot n
=
T_{ij}n_j
=
(Tn)_i.
$$

また

$$
\operatorname{div}F^{(i)}
=
\partial_jT_{ij}
=
(\operatorname{div}T)_i.
$$

$T$ の各行は $C^1$ 級なので VC4 の [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)を適用でき、

$$
\int_{\partial\Omega}(Tn)_i\,dS
=
\int_\Omega(\operatorname{div}T)_i\,dV.
$$

$i=1,2,3$ について成り立つのでベクトル等式

$$
\int_{\partial\Omega}Tn\,dS
=
\int_\Omega\operatorname{div}T\,dV
$$

を得ます。
<!-- proof-end -->

---

## 11. 面に働く力の線形表示

<a id="def-vc7-stress"></a>

<!-- formal-statement-start -->
> **定義（応力テンソルと表面力）**  
> 各点 $x$ に二階テンソル $\sigma(x)$ が与えられているとする。単位法線 $n$ を持つ微小面に作用する単位面積あたりの表面力を
>
> $$
> t(n)
> =
> \sigma n,
> $$
>
> すなわち
>
> $$
> t_i(n)
> =
> \sigma_{ij}n_j
> $$
>
> と表すとき、$\sigma$ を **応力テンソル**、$t(n)$ をその面に作用する **表面力ベクトル**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-stress -->
**定義の確認**

$$
\sigma
=
\begin{pmatrix}
2&1&0\\
1&3&0\\
0&0&4
\end{pmatrix}
$$

とします。

$x$ 面の法線 $n=e_1$ では

$$
t(e_1)
=
\sigma e_1
=
\begin{pmatrix}
2\\1\\0
\end{pmatrix}.
$$

法線方向成分 2 に加えて、接線方向成分 1 もあります。

$z$ 面 $n=e_3$ では

$$
t(e_3)
=
\begin{pmatrix}
0\\0\\4
\end{pmatrix}.
$$
<!-- definition-example-end -->

上の [二階テンソル版 Gauss--Ostrogradsky の発散定理](#thm-vc7-tensor-divergence) から

$$
\int_{\partial\Omega}\sigma n\,dS
=
\int_\Omega\operatorname{div}\sigma\,dV.
$$

したがって $\operatorname{div}\sigma$ は、表面力を体積密度へ変換する局所量です。

**注意**：$\sigma=\sigma^T$ は二階テンソルの定義から自動的に従うわけではありません。古典連続体で応力が対称になるのは角運動量保存など追加の物理仮定によります。この点は VC9 で扱います。

---

## 12. 質量分布と回転慣性

質量密度 $\rho(x)\ge0$ を持つ物体を、原点まわりで考えます。

<a id="def-vc7-inertia"></a>

<!-- formal-statement-start -->
> **定義（慣性テンソル）**  
> $x=(x_1,x_2,x_3)$、$r^2=x_ix_i$ とする。原点まわりの **慣性テンソル**を
>
> $$
> I_{ij}
> =
> \int_\Omega
> \rho(x)
> \left(
> r^2\delta_{ij}
> -
> x_i x_j
> \right)
> dV
> $$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc7-inertia -->
**定義の確認**

直方体

$$
\Omega=[-a,a]\times[-b,b]\times[-c,c]
$$

に一定密度 $\rho_0$ が分布するとします。全質量は

$$
M=8\rho_0abc.
$$

非対角成分では、例えば

$$
I_{12}
=
-\rho_0\int_\Omega xy\,dV
=
0
$$

です。積分領域が $x\mapsto -x$ に関して対称で、被積分関数 $xy$ が $x$ の奇関数だからです。他の非対角成分も同様に 0 です。

対角成分は

$$
I_{11}
=
\rho_0\int_\Omega(y^2+z^2)\,dV
=
\frac{M}{3}(b^2+c^2),
$$

同様に

$$
I_{22}
=
\frac{M}{3}(a^2+c^2),
\qquad
I_{33}
=
\frac{M}{3}(a^2+b^2).
$$

従って

$$
I
=
\frac{M}{3}
\begin{pmatrix}
b^2+c^2&0&0\\
0&a^2+c^2&0\\
0&0&a^2+b^2
\end{pmatrix}.
$$

定義から、対称性と回転軸からの距離が慣性へどう入るかを直接確認できます。
<!-- definition-example-end -->

明らかに

$$
I_{ij}=I_{ji}
$$

なので $I$ は対称です。

<a id="prop-vc7-inertia-psd"></a>

<!-- formal-statement-start -->
> **命題（慣性テンソルの半正定値性）**  
> $\rho\ge0$ とする。任意の $a\in\mathbb R^3$ に対し
>
> $$
> a_iI_{ij}a_j
> =
> \int_\Omega
> \rho(x)|x\times a|^2\,dV
> \ge0.
> $$
>
> 従って慣性テンソルは半正定値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義を代入すると

$$
a_iI_{ij}a_j
=
\int_\Omega
\rho
\left[
r^2a_i\delta_{ij}a_j
-
a_i x_i x_j a_j
\right]dV.
$$

Kronecker のデルタで縮約して

$$
a_i\delta_{ij}a_j
=
|a|^2,
$$

また

$$
a_ix_i=x\cdot a.
$$

従って

$$
a_iI_{ij}a_j
=
\int_\Omega
\rho
\left(
|x|^2|a|^2-(x\cdot a)^2
\right)dV.
$$

Lagrange の恒等式

$$
|x\times a|^2
=
|x|^2|a|^2-(x\cdot a)^2
$$

より

$$
a_iI_{ij}a_j
=
\int_\Omega\rho|x\times a|^2\,dV.
$$

$\rho\ge0$ なので右辺は非負です。
<!-- proof-end -->

---

## 13. 方向を変えても不変な二階量

どの方向を選んでも見え方が変わらないテンソルを考えます。

<a id="thm-vc7-isotropic"></a>

<!-- formal-statement-start -->
> **定理（二階等方テンソルの形）**  
> 実二階テンソル $T$ が、すべての直交行列 $Q\in O(3)$ に対して
>
> $$
> QTQ^T=T
> $$
>
> を満たすとする。このとき、ある実数 $\lambda$ が存在して
>
> $$
> \boxed{
> T=\lambda I
> }
> $$
>
> である。逆に $\lambda I$ はすべての直交変換で不変である。
<!-- formal-statement-end -->

### 証明の見取り図

まず座標軸の符号を一つだけ反転する鏡映を使い、非対角成分を消します。次に座標軸を入れ替える直交変換を使い、三つの対角成分が等しいことを示します。

<!-- proof-start -->
### 証明

$$
Q_1=\operatorname{diag}(-1,1,1)
$$

とします。仮定 $Q_1TQ_1^T=T$ を成分で見ると、第 1 行または第 1 列のどちらか一方だけに属する成分は符号が反転します。従って

$$
T_{12}=T_{13}=T_{21}=T_{31}=0.
$$

同様に

$$
Q_2=\operatorname{diag}(1,-1,1),
\qquad
Q_3=\operatorname{diag}(1,1,-1)
$$

を使えば、すべての非対角成分が 0 と分かります。従って

$$
T=
\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3).
$$

次に第 1 軸と第 2 軸を入れ替える直交行列 $P_{12}$ を使います。$P_{12}TP_{12}^T=T$ だから

$$
\lambda_1=\lambda_2.
$$

第 2 軸と第 3 軸を入れ替える変換から

$$
\lambda_2=\lambda_3.
$$

よって

$$
\lambda_1=\lambda_2=\lambda_3=\lambda
$$

であり

$$
T=\lambda I.
$$

逆向きは

$$
Q(\lambda I)Q^T
=
\lambda QQ^T
=
\lambda I
$$

から直ちに従います。
<!-- proof-end -->

これは等方的な二階構成則の基本形です。四階等方テンソルまで進むと弾性・Newton 流体の構成則へつながりますが、本章では二階までに留めます。

---

## 14. どこまでが「デカルト」なのか

本章の公式

$$
\partial_j u_i,
\qquad
\partial_jT_{ij},
\qquad
\varepsilon_{ijk}\partial_j u_k
$$

では、基底 $e_i$ が空間中で一定です。

VC6 の円柱・球座標では基底自身が位置で変化しました。その場合

$$
\partial_j(T_{ik}e_i\otimes e_k)
$$

を計算すると、成分の微分だけでなく基底の微分も現れます。

一般曲線座標でこの補正を体系化するのが共変微分や Christoffel 記号ですが、それは本系列の停止線の外です。

**VC7 は「ユークリッド空間で一定の直交デカルト基底を回す」範囲だけを完成させます。**

---

## 15. 演習

#### VC7-A01 Einstein の総和規約と Kronecker のデルタ
- Level: A
- 目安時間: 15分

$$
a=(1,-2,3)^T
$$

とする。

1. $\delta_{ij}a_j$ を求めよ。
2. $\delta_{ii}$ を求めよ。
3. $\delta_{ij}\delta_{jk}a_k$ を簡約せよ。
4. $a_i a_i$ を求めよ。

<!-- solution-start -->
### 詳細解答

1.

Kronecker のデルタは恒等写像なので

$$
\delta_{ij}a_j=a_i.
$$

従ってベクトルとして

$$
\boxed{(1,-2,3)^T}.
$$

2.

$$
\delta_{ii}
=
\delta_{11}+\delta_{22}+\delta_{33}
=
1+1+1
=
\boxed{3}.
$$

3.

まず

$$
\delta_{ij}\delta_{jk}
=
\delta_{ik}.
$$

従って

$$
\delta_{ij}\delta_{jk}a_k
=
\delta_{ik}a_k
=
\boxed{a_i}.
$$

4.

$$
a_i a_i
=
1^2+(-2)^2+3^2
=
\boxed{14}.
$$
<!-- solution-end -->

#### VC7-A02 Levi--Civita 記号と外積
- Level: A
- 目安時間: 18分

$$
a=(1,2,0)^T,
\qquad
b=(0,1,3)^T
$$

とする。

1. $\varepsilon_{ijk}a_jb_k$ を成分ごとに計算せよ。
2. 通常の外積 $a\times b$ と一致することを確認せよ。
3. $\varepsilon_{ijk}\varepsilon_{imk}$ を簡約せよ。

<!-- solution-start -->
### 詳細解答

1. 第 1 成分は

$$
\varepsilon_{1jk}a_jb_k
=
a_2b_3-a_3b_2
=
2\cdot3-0\cdot1
=
6.
$$

第 2 成分は

$$
a_3b_1-a_1b_3
=
0\cdot0-1\cdot3
=
-3.
$$

第 3 成分は

$$
a_1b_2-a_2b_1
=
1\cdot1-2\cdot0
=
1.
$$

従って

$$
\varepsilon_{ijk}a_jb_k
=
\boxed{(6,-3,1)^T}.
$$

2.

行列式による通常の外積計算でも

$$
a\times b
=
(6,-3,1)^T
$$

となり一致します。

3. [Levi--Civita 記号の縮約公式](#prop-vc7-epsilon-contraction)で $n=k$ として $k$ についてさらに縮約すると

$$
\varepsilon_{ijk}\varepsilon_{imk}
=
\delta_{jm}\delta_{kk}
-
\delta_{jk}\delta_{km}.
$$

ここで

$$
\delta_{kk}=3,
$$

$$
\delta_{jk}\delta_{km}=\delta_{jm}.
$$

よって

$$
\boxed{
\varepsilon_{ijk}\varepsilon_{imk}
=
2\delta_{jm}
}.
$$
<!-- solution-end -->

#### VC7-A03 直交基底変換
- Level: A
- 目安時間: 20分

$$
Q=
\begin{pmatrix}
0&1&0\\
-1&0&0\\
0&0&1
\end{pmatrix},
\qquad
v=
\begin{pmatrix}
2\\1\\3
\end{pmatrix},
$$

$$
T=
\begin{pmatrix}
2&1&0\\
1&3&0\\
0&0&4
\end{pmatrix}
$$

とする。

1. $v'=Qv$ を求めよ。
2. $T'=QTQ^T$ を求めよ。
3. $\operatorname{tr}T'=\operatorname{tr}T$ を確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
v'
=
Qv
=
\begin{pmatrix}
1\\
-2\\
3
\end{pmatrix}.
$$

2. まず

$$
QT
=
\begin{pmatrix}
1&3&0\\
-2&-1&0\\
0&0&4
\end{pmatrix}.
$$

さらに

$$
Q^T
=
\begin{pmatrix}
0&-1&0\\
1&0&0\\
0&0&1
\end{pmatrix}
$$

なので

$$
T'
=
QTQ^T
=
\boxed{
\begin{pmatrix}
3&-1&0\\
-1&2&0\\
0&0&4
\end{pmatrix}
}.
$$

3.

$$
\operatorname{tr}T
=
2+3+4
=
9,
$$

$$
\operatorname{tr}T'
=
3+2+4
=
9.
$$

従って確かに

$$
\boxed{
\operatorname{tr}T'=\operatorname{tr}T
}.
$$
<!-- solution-end -->

#### VC7-A04 対称部分・反対称部分
- Level: A
- 目安時間: 20分

$$
T=
\begin{pmatrix}
1&2&-1\\
0&3&4\\
1&-2&0
\end{pmatrix}
$$

とする。

1. $S=(T+T^T)/2$ を求めよ。
2. $W=(T-T^T)/2$ を求めよ。
3. $S:W=0$ を直接確認せよ。

<!-- solution-start -->
### 詳細解答

転置は

$$
T^T
=
\begin{pmatrix}
1&0&1\\
2&3&-2\\
-1&4&0
\end{pmatrix}.
$$

1.

$$
S
=
\frac12(T+T^T)
=
\boxed{
\begin{pmatrix}
1&1&0\\
1&3&1\\
0&1&0
\end{pmatrix}
}.
$$

2.

$$
W
=
\frac12(T-T^T)
=
\boxed{
\begin{pmatrix}
0&1&-1\\
-1&0&3\\
1&-3&0
\end{pmatrix}
}.
$$

3. 二重縮約は成分ごとの積の総和です。

対角成分では $W_{ii}=0$ なので寄与はありません。

非対角成分は対になって

$$
S_{12}W_{12}+S_{21}W_{21}
=
1\cdot1+1\cdot(-1)
=
0,
$$

$$
S_{13}W_{13}+S_{31}W_{31}
=
0,
$$

$$
S_{23}W_{23}+S_{32}W_{32}
=
1\cdot3+1\cdot(-3)
=
0.
$$

従って

$$
\boxed{S:W=0}.
$$
<!-- solution-end -->

#### VC7-B01 回転の回転恒等式を添字で導く
- Level: B
- 目安時間: 25分

$u\in C^2(\Omega;\mathbb R^3)$ とする。

Levi--Civita 記号の縮約公式だけを使い、

$$
\operatorname{curl}(\operatorname{curl}u)
=
\nabla(\operatorname{div}u)-\Delta u
$$

を導け。

<!-- solution-start -->
### 詳細解答

第 $i$ 成分から始めます。

$$
[\operatorname{curl}(\operatorname{curl}u)]_i
=
\varepsilon_{ijk}
\partial_j
(\operatorname{curl}u)_k.
$$

回転の添字表示を代入して

$$
=
\varepsilon_{ijk}
\partial_j
(
\varepsilon_{k\ell m}\partial_\ell u_m
).
$$

$\varepsilon_{k\ell m}$ は定数なので

$$
=
\varepsilon_{ijk}\varepsilon_{k\ell m}
\partial_j\partial_\ell u_m.
$$

[縮約公式](#prop-vc7-epsilon-contraction)から

$$
\varepsilon_{ijk}\varepsilon_{k\ell m}
=
\delta_{i\ell}\delta_{jm}
-
\delta_{im}\delta_{j\ell}.
$$

したがって

$$
[\operatorname{curl}(\operatorname{curl}u)]_i
=
\delta_{i\ell}\delta_{jm}
\partial_j\partial_\ell u_m
-
\delta_{im}\delta_{j\ell}
\partial_j\partial_\ell u_m.
$$

第一項は

$$
\partial_j\partial_i u_j
=
\partial_i(\partial_j u_j),
$$

第二項は

$$
\partial_j\partial_j u_i.
$$

$u\in C^2$ なので偏微分順序を交換できます。

従って

$$
[\operatorname{curl}(\operatorname{curl}u)]_i
=
[\nabla(\operatorname{div}u)]_i
-
(\Delta u)_i.
$$

すべての $i$ について成り立つため

$$
\boxed{
\operatorname{curl}(\operatorname{curl}u)
=
\nabla(\operatorname{div}u)-\Delta u
}.
$$
<!-- solution-end -->

#### VC7-B02 二階テンソル場の発散を積分で照合
- Level: B
- 目安時間: 30分

単位立方体

$$
\Omega=[0,1]^3
$$

上で

$$
T(x,y,z)
=
\begin{pmatrix}
x&0&0\\
0&2y&0\\
0&0&3z
\end{pmatrix}
$$

とする。

1. $\operatorname{div}T$ を求めよ。
2. $\int_\Omega\operatorname{div}T\,dV$ を求めよ。
3. 六つの面で $Tn$ を積分し、$\int_{\partial\Omega}Tn\,dS$ を直接求めよ。
4. 二つが一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 定義より

$$
(\operatorname{div}T)_1
=
\partial_x x
+
\partial_y0
+
\partial_z0
=
1,
$$

$$
(\operatorname{div}T)_2
=
0+\partial_y(2y)+0
=
2,
$$

$$
(\operatorname{div}T)_3
=
0+0+\partial_z(3z)
=
3.
$$

従って

$$
\boxed{
\operatorname{div}T=(1,2,3)^T
}.
$$

2. 単位立方体の体積は 1 なので

$$
\int_\Omega\operatorname{div}T\,dV
=
\boxed{(1,2,3)^T}.
$$

3. $x=1$ 面では $n=e_1$ なので

$$
Tn=(1,0,0)^T.
$$

面積は 1 だから寄与は $(1,0,0)^T$ です。

$x=0$ 面では $n=-e_1$ ですが $x=0$ で第一列が 0 なので寄与は 0 です。

同様に $y=1$ 面の寄与は

$$
(0,2,0)^T,
$$

$y=0$ 面は 0、

$z=1$ 面の寄与は

$$
(0,0,3)^T,
$$

$z=0$ 面は 0 です。

従って

$$
\int_{\partial\Omega}Tn\,dS
=
\boxed{(1,2,3)^T}.
$$

4.

$$
\boxed{
\int_{\partial\Omega}Tn\,dS
=
\int_\Omega\operatorname{div}T\,dV
}
$$

が直接確認できました。
<!-- solution-end -->

#### VC7-B03 慣性テンソル
- Level: B
- 目安時間: 30分

質量 $m$ の点質量が

$$
(a,0,0),\quad(-a,0,0),\quad(0,a,0),\quad(0,-a,0)
$$

に一つずつあるとする。

離散版

$$
I_{ij}
=
\sum_\alpha
m
\left(
|x^{(\alpha)}|^2\delta_{ij}
-
x_i^{(\alpha)}x_j^{(\alpha)}
\right)
$$

を使って原点まわりの慣性テンソルを求めよ。

<!-- solution-start -->
### 詳細解答

$x$ 軸上の点 $(\pm a,0,0)$ 一つについて

$$
|x|^2=a^2
$$

であり

$$
|x|^2I-xx^T
=
\begin{pmatrix}
0&0&0\\
0&a^2&0\\
0&0&a^2
\end{pmatrix}.
$$

二点分で

$$
2m
\begin{pmatrix}
0&0&0\\
0&a^2&0\\
0&0&a^2
\end{pmatrix}.
$$

$y$ 軸上の点 $(0,\pm a,0)$ 一つについては

$$
|x|^2I-xx^T
=
\begin{pmatrix}
a^2&0&0\\
0&0&0\\
0&0&a^2
\end{pmatrix}.
$$

二点分を加えると

$$
I
=
\begin{pmatrix}
2ma^2&0&0\\
0&2ma^2&0\\
0&0&4ma^2
\end{pmatrix}.
$$

従って

$$
\boxed{
I
=
2ma^2
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&2
\end{pmatrix}
}.
$$

$x,y$ 方向の回転慣性が等しいのは配置が $x$ 軸と $y$ 軸の交換で不変だからです。
<!-- solution-end -->

#### VC7-C01 速度勾配・応力・表面力・発散の統合
- Level: C
- 目安時間: 45分

流速場

$$
u(x,y,z)
=
(\gamma y,0,0)
$$

を考える。$\gamma$ は定数とする。

二階テンソル場

$$
\sigma
=
-p(x,y,z)I
+
\mu
\left(
\nabla u+\nabla u^T
\right)
$$

を与える。$\mu>0$ は定数であり、この式自体はここでは構成則として与えられたものとする。

1. $\nabla u$、その対称部分 $D$、反対称部分 $W$ を求めよ。
2. $\operatorname{curl}u$ を求め、$W_{ij}=-\varepsilon_{ijk}\omega_k$、$\omega=\frac12\operatorname{curl}u$ を確認せよ。
3. $\sigma$ を成分表示せよ。
4. 法線 $n=e_2$ の面に作用する表面力 $t(n)=\sigma n$ を求めよ。
5. $\operatorname{div}\sigma$ を求めよ。
6. $p$ が定数なら $\operatorname{div}\sigma=0$ となる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. 本章の約束では

$$
(\nabla u)_{ij}
=
\partial_j u_i.
$$

$u_1=\gamma y$、$u_2=u_3=0$ だから

$$
\nabla u
=
\begin{pmatrix}
0&\gamma&0\\
0&0&0\\
0&0&0
\end{pmatrix}.
$$

従って

$$
D
=
\frac12(\nabla u+\nabla u^T)
=
\boxed{
\begin{pmatrix}
0&\gamma/2&0\\
\gamma/2&0&0\\
0&0&0
\end{pmatrix}
},
$$

$$
W
=
\frac12(\nabla u-\nabla u^T)
=
\boxed{
\begin{pmatrix}
0&\gamma/2&0\\
-\gamma/2&0&0\\
0&0&0
\end{pmatrix}
}.
$$

2. VC1 の回転公式から

$$
\operatorname{curl}u
=
(0,0,-\gamma).
$$

従って

$$
\omega
=
\frac12\operatorname{curl}u
=
(0,0,-\gamma/2).
$$

例えば $(i,j)=(1,2)$ では

$$
-\varepsilon_{123}\omega_3
=
-1\cdot(-\gamma/2)
=
\gamma/2
=
W_{12}.
$$

$(i,j)=(2,1)$ でも

$$
-\varepsilon_{213}\omega_3
=
-(-1)(-\gamma/2)
=
-\gamma/2
=
W_{21}.
$$

他の成分も 0 で一致します。

3.

$$
\nabla u+\nabla u^T
=
\begin{pmatrix}
0&\gamma&0\\
\gamma&0&0\\
0&0&0
\end{pmatrix}.
$$

従って

$$
\boxed{
\sigma
=
\begin{pmatrix}
-p&\mu\gamma&0\\
\mu\gamma&-p&0\\
0&0&-p
\end{pmatrix}
}.
$$

4. $n=e_2$ なので $\sigma$ の第 2 列を取ります。

$$
\boxed{
t(e_2)
=
\begin{pmatrix}
\mu\gamma\\
-p\\
0
\end{pmatrix}
}.
$$

$\mu\gamma$ が接線方向成分、$-p$ が法線方向成分です。

5. $\mu\gamma$ は定数なので、その微分は 0 です。

$$
(\operatorname{div}\sigma)_1
=
\partial_x(-p)
+
\partial_y(\mu\gamma)
+
\partial_z0
=
-\partial_xp,
$$

$$
(\operatorname{div}\sigma)_2
=
\partial_x(\mu\gamma)
+
\partial_y(-p)
+
\partial_z0
=
-\partial_yp,
$$

$$
(\operatorname{div}\sigma)_3
=
-\partial_zp.
$$

従って

$$
\boxed{
\operatorname{div}\sigma
=
-\nabla p
}.
$$

6. $p$ が定数なら

$$
\nabla p=0.
$$

また速度勾配由来のせん断成分も空間的に一定なので、その発散も 0 です。従って

$$
\boxed{
\operatorname{div}\sigma=0
}.
$$

この問題は、ベクトル場の勾配、対称・反対称分解、回転、応力テンソル、表面力、テンソルの発散が一つの計算体系でつながることを示しています。
<!-- solution-end -->

---

## 16. この章で得た計算言語

本章で

$$
a_i b_i,
\qquad
\delta_{ij},
\qquad
\varepsilon_{ijk},
\qquad
T'_{ij}=Q_{ip}Q_{jq}T_{pq},
$$

$$
(\nabla u)_{ij}=\partial_j u_i,
\qquad
(\operatorname{div}T)_i=\partial_jT_{ij}
$$

を一つの体系として使えるようになりました。

VC8 では、この記法を必要に応じて使いながら

$$
F=-\nabla\phi+\operatorname{curl}A
$$

という Helmholtz 分解へ進みます。VC9 ではさらに、応力の発散、運動量流束、非圧縮流、Maxwell 方程式の積分形・微分形を同じベクトル解析の言葉で結びます。
