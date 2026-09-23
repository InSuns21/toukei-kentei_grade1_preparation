# FEM2 三角形分割・局所基底・組立て

<a id="def-fem2-finite-element"></a>

<!-- formal-statement-start -->
### 定義（有限要素）

$K\subset\mathbb R^d$ を要素、$P$ を $K$ 上の有限次元関数空間とする。

$P$ 上の線形汎関数の集合

$
\mathcal N
=
\{N_1,\ldots,N_m\}
$

が $P^*$ の基底をなし、従って各

$
p\in P
$

が値

$
N_1(p),\ldots,N_m(p)
$

によって一意に定まるとする。

このとき三つ組

$
\boxed{
(K,P,\mathcal N)
}
$

を **有限要素**という。

$N_i$ を **自由度**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem2-finite-element -->
**定義の確認**

### 例：区間上の一次要素

$
K=[0,1],
\qquad
P=\{p(x)=a+bx:a,b\in\mathbb R\}
$

とし、

$
N_1(p)=p(0),
\qquad
N_2(p)=p(1)
$

とします。

$
N_1(p)=c_1,
\qquad
N_2(p)=c_2
$

を指定すると

$
a=c_1,
\qquad
a+b=c_2
$

なので

$
a=c_1,
\qquad
b=c_2-c_1.
$

従って

$
\boxed{
p(x)=c_1+(c_2-c_1)x
}
$

と一意に復元できます。

つまり二つの自由度 $N_1,N_2$ は $P$ の関数を一意に決め、$(K,P,\{N_1,N_2\})$ は有限要素です。
<!-- definition-example-end -->


FEM1 では、Poisson 方程式を変分問題へ移し、有限次元部分空間

$$
V_h\subset H_0^1(\Omega)
$$

を選べば Galerkin 法が定義できることを確認しました。

しかし、そこでは最も重要な問いを一つ保留していました。

> **その有限次元空間 $V_h$ を、複雑な領域上で実際にどう作るのか。**

有限要素法の答えは、

$$
\boxed{
\text{領域を小さな要素へ分ける}
\longrightarrow
\text{各要素上で低次多項式を使う}
\longrightarrow
\text{自由度を共有して貼り合わせる}
}
$$

です。

本章では二次元 Poisson 問題に対する最も基本的な **一次三角形要素**に集中し、

- 三角形分割の適合条件
- 有限要素と自由度
- 重心座標
- 基準三角形
- アフィン写像
- 連続な区分一次空間
- 頂点値から作る大域基底
- 局所剛性行列
- 組立て
- 疎性

を一つの流れで構成します。

[FEM1 の Galerkin 行列表現](../FEM1/index.md#prop-fem1-basis-system)を抽象論の入口として使います。

> **この章の停止線**  
> 本章では有限要素空間を「作る」ところまで扱います。補間作用素、形状正則性、局所・大域補間誤差、メッシュ幅 $h$ に対する近似次数は FEM3、Céa の補題と組み合わせた $H^1$・$L^2$ 誤差評価は FEM4 で扱います。

---

## 0. なぜ大域多項式ではなく「小さく分けて貼る」のか

FEM1 では例として

$$
V_h
=
\operatorname{span}\{\phi_1,\phi_2\}
$$

のような大域的な有限次元空間を使いました。

理論上はこれでも Galerkin 法です。

しかし実際の計算では、領域全体にまたがる基底よりも、**局所的な台を持つ基底**の方が有利です。

基底関数 $\phi_i,\phi_j$ の台が重ならなければ、Poisson の剛性行列成分

$$
A_{ij}
=
\int_\Omega
\nabla\phi_j\cdot\nabla\phi_i\,dx
$$

は 0 になります。

したがって、各基底が近くの要素にしか存在しないように作れば、大域行列の大半の成分が 0 になります。

これが有限要素法で疎行列が自然に現れる理由です。

---

## 1. まず領域を三角形へ分ける

以後、$\Omega\subset\mathbb R^2$ を有界な多角形領域とします。

各三角形は面積が正、すなわち三頂点が一直線上にないものとします。

<a id="def-fem2-conforming-triangulation"></a>

<!-- formal-statement-start -->
### 定義（適合三角形分割）

有限個の閉三角形の族

$$
\mathcal T_h
=
\{K\}
$$

が $\Omega$ の **適合三角形分割**であるとは、次を満たすことをいう。

1. 被覆条件：

$$
\overline\Omega
=
\bigcup_{K\in\mathcal T_h} K.
$$

2. 異なる二要素 $K,L\in\mathcal T_h$ の内部は交わらない。

3. $K\ne L$ に対して $K\cap L$ は

- 空集合
- 両者に共通する一頂点
- 両者に共通する一辺

のいずれかである。

各 $K$ の直径を

$$
h_K=\operatorname{diam}K
$$

とし、

$$
h=\max_{K\in\mathcal T_h}h_K
$$

をメッシュ幅という。
<!-- formal-statement-end -->

3 番目の条件が重要です。

ある三角形の頂点が、隣の三角形の辺の途中へ突き刺さるような分割は、ここでは適合と呼びません。

この「辺は辺として丸ごと共有する」という条件が、後で連続な区分多項式を素直に貼り合わせることを可能にします。

<!-- definition-example-start: def-fem2-conforming-triangulation -->
**定義の確認**

### 例：単位正方形を二つへ分ける

$$
\Omega=(0,1)^2
$$

の閉包を、対角線 $(0,0)$ から $(1,1)$ で二つに分けます。

$$
K_1
=
\operatorname{conv}\{(0,0),(1,0),(1,1)\},
$$

$$
K_2
=
\operatorname{conv}\{(0,0),(1,1),(0,1)\}.
$$

二要素の共通部分は

$$
K_1\cap K_2
=
\operatorname{conv}\{(0,0),(1,1)\}
$$

であり、両者に共通する一辺です。

したがって

$$
\mathcal T_h=\{K_1,K_2\}
$$

は適合三角形分割です。
<!-- definition-example-end -->

本章では $h$ を定義しますが、「三角形が極端につぶれていない」という形状正則性はまだ仮定しません。

それは FEM3 の補間誤差で必要になります。

---

## 2. 一つの三角形の上で何を保存するか

三角形 $K$ 上の一次多項式空間を

$$
P_1(K)
=
\{
p(x,y)=a+bx+cy
:
a,b,c\in\mathbb R
\}
$$

とします。

次元は 3 です。

したがって、三つの独立な情報を与えれば $p\in P_1(K)$ を一意に決められるはずです。

一次三角形要素では、その情報として **三頂点での値**を使います。

ここで「自由度」は単なる係数の個数ではなく、関数から数を取り出す線形汎関数です。

一次三角形要素では、

$
K=\operatorname{conv}\{z_1,z_2,z_3\},
$

$
P=P_1(K),
$

$
N_i(p)=p(z_i)
\qquad
(i=1,2,3)
$

と取ります。

本当に三つの頂点値だけで一次多項式が一意に決まることを確認します。

<a id="thm-fem2-p1-unisolvence"></a>

<!-- formal-statement-start -->
### 定理（一次三角形要素の頂点値自由度の一意可解性）

$K$ を一直線上にない三頂点

$$
z_1,z_2,z_3\in\mathbb R^2
$$

を持つ三角形とする。

任意の

$$
c_1,c_2,c_3\in\mathbb R
$$

に対して、一意な

$$
p\in P_1(K)
$$

が存在し、

$$
\boxed{
p(z_i)=c_i
\qquad
(i=1,2,3)
}
$$

を満たす。

従って

$$
\left(
K,
P_1(K),
\{p\mapsto p(z_1),p\mapsto p(z_2),p\mapsto p(z_3)\}
\right)
$$

は有限要素である。
<!-- formal-statement-end -->

### 証明の見取り図

$P_1(K)$ は 3 次元です。

したがって頂点評価写像が単射であることを示せば、同じ 3 次元空間の間の線形写像なので全単射です。

核心は、

> 三頂点で 0 になるアフィン関数は 0 関数しかない

ことです。

<!-- proof-start -->
### 証明

線形写像

$$
E:P_1(K)\to\mathbb R^3
$$

を

$$
E(p)
=
\bigl(p(z_1),p(z_2),p(z_3)\bigr)
$$

で定めます。

まず $E$ が単射であることを示します。

$$
E(p)=0
$$

とし、

$$
p(x)=a+g\cdot x,
\qquad
g\in\mathbb R^2
$$

と書きます。

三頂点で 0 なので

$$
p(z_1)=p(z_2)=p(z_3)=0.
$$

差を取ると

$$
g\cdot(z_2-z_1)=0,
$$

$$
g\cdot(z_3-z_1)=0.
$$

$z_1,z_2,z_3$ は一直線上にないので、

$$
z_2-z_1,
\qquad
z_3-z_1
$$

は $\mathbb R^2$ の基底です。

従って、この二ベクトルの両方に直交する $g$ は

$$
g=0
$$

しかありません。

よって $p$ は定数関数です。

さらに

$$
p(z_1)=0
$$

なので

$$
p\equiv0.
$$

従って

$$
\ker E=\{0\},
$$

すなわち $E$ は単射です。

一方

$$
\dim P_1(K)=3
=
\dim\mathbb R^3.
$$

有限次元線形空間の同次元間の単射は全単射なので、任意の

$$
(c_1,c_2,c_3)\in\mathbb R^3
$$

に対して一意な $p\in P_1(K)$ が存在し、

$$
E(p)=(c_1,c_2,c_3)
$$

を満たします。
<!-- proof-end -->

### どの仮定が働いたか

三頂点が一直線上にないことが本質です。

もし三点が一直線上に並べば、

$$
z_2-z_1,
\qquad
z_3-z_1
$$

は一次独立でなくなり、二方向の情報から勾配 $g$ を決められません。

「三角形の面積が正」という幾何条件が、自由度の一意可解性を支えています。

---

## 3. 頂点値を直接表す重心座標

各頂点だけで 1、他の二頂点で 0 になる一次関数を作ります。

<a id="def-fem2-barycentric-basis"></a>

<!-- formal-statement-start -->
### 定義（重心座標と局所節点基底）

三角形

$$
K=\operatorname{conv}\{z_1,z_2,z_3\}
$$

に対し、[頂点値自由度の一意可解性](#thm-fem2-p1-unisolvence)によって一意に定まる

$$
\lambda_i\in P_1(K)
$$

で

$$
\boxed{
\lambda_i(z_j)=\delta_{ij}
}
$$

を満たすものを $K$ の **重心座標**という。

$$
\lambda_1,\lambda_2,\lambda_3
$$

は $P_1(K)$ の局所節点基底をなす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem2-barycentric-basis -->
**定義の確認**

### 例：基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

では

$$
\widehat\lambda_1(\xi,\eta)
=
1-\xi-\eta,
$$

$$
\widehat\lambda_2(\xi,\eta)
=
\xi,
$$

$$
\widehat\lambda_3(\xi,\eta)
=
\eta.
$$

たとえば

$$
\widehat\lambda_1(0,0)=1,
$$

$$
\widehat\lambda_1(1,0)=0,
$$

$$
\widehat\lambda_1(0,1)=0.
$$

他の二関数も同様に、対応する頂点で 1、残りの頂点で 0 という節点条件を満たします。
<!-- definition-example-end -->

さらに

$$
c_1\lambda_1+c_2\lambda_2+c_3\lambda_3=0
$$

と仮定し、頂点 $z_j$ で評価すると

$$
c_j=0
\qquad
(j=1,2,3).
$$

従って三つの重心座標関数は一次独立です。

一方

$$
\dim P_1(K)=3
$$

なので、

$$
\lambda_1,\lambda_2,\lambda_3
$$

は確かに $P_1(K)$ の基底です。

重心座標には二つの基本恒等式があります。

まず

$$
\lambda_1+\lambda_2+\lambda_3
$$

は三頂点で全て 1 を取る一次関数です。

定数関数 1 も同じ頂点値を持つので、一意性から

$$
\boxed{
\lambda_1+\lambda_2+\lambda_3=1
}.
$$

また恒等写像 $x\mapsto x$ の各成分は一次関数なので、

$$
\boxed{
x
=
\lambda_1(x)z_1
+
\lambda_2(x)z_2
+
\lambda_3(x)z_3
}.
$$

つまり点 $x\in K$ 自身を三頂点の重み付き和として表す係数が $\lambda_i(x)$ です。

---

## 4. 基準三角形から全部の三角形を作る

要素ごとに別々の公式を一から作るのは非効率です。

そこで、全要素を一つの基準三角形からアフィン写像で生成します。

<a id="def-fem2-reference-affine-map"></a>

<!-- formal-statement-start -->
### 定義（基準三角形とアフィン要素写像）

基準三角形を

$$
\widehat K
=
\operatorname{conv}
\{
\widehat z_1,\widehat z_2,\widehat z_3
\}
$$

ただし

$$
\widehat z_1=(0,0),
\qquad
\widehat z_2=(1,0),
\qquad
\widehat z_3=(0,1)
$$

とする。

一般の三角形

$$
K
=
\operatorname{conv}\{z_1,z_2,z_3\}
$$

に対し、

$$
B_K
=
\begin{pmatrix}
|&|\\
z_2-z_1&z_3-z_1\\
|&|
\end{pmatrix}
$$

と置く。

アフィン写像

$$
\boxed{
F_K(\widehat x)
=
B_K\widehat x+z_1
}
$$

を基準三角形から $K$ への **アフィン要素写像**という。
<!-- formal-statement-end -->

三頂点が一直線上にないので

$$
\det B_K\ne0.
$$

従って $F_K$ は可逆で、

$$
F_K(\widehat z_i)=z_i
$$

を満たします。

<!-- definition-example-start: def-fem2-reference-affine-map -->
**定義の確認**

### 例：横 2、縦 3 の直角三角形

$$
z_1=(1,1),
\qquad
z_2=(3,1),
\qquad
z_3=(1,4)
$$

なら

$$
B_K
=
\begin{pmatrix}
2&0\\
0&3
\end{pmatrix},
$$

したがって

$$
F_K(\xi,\eta)
=
(1+2\xi,1+3\eta).
$$

実際、

$$
F_K(0,0)=z_1,
$$

$$
F_K(1,0)=z_2,
$$

$$
F_K(0,1)=z_3.
$$

また

$$
|\det B_K|=6
$$

なので、面積は基準三角形の

$$
|\widehat K|=\frac12
$$

の 6 倍、

$$
|K|=3
$$

です。
<!-- definition-example-end -->

---

## 5. 関数・勾配・積分はどう変換されるか

基準三角形上の関数

$$
\widehat v:\widehat K\to\mathbb R
$$

から一般要素上の関数を

$$
v
=
\widehat v\circ F_K^{-1}
$$

で作ります。

このとき、値だけでなく勾配の変換を正しく追う必要があります。

<a id="prop-fem2-affine-transform"></a>

<!-- formal-statement-start -->
### 命題（アフィン要素写像による勾配と積分の変換）

$F_K(\widehat x)=B_K\widehat x+z_1$ を可逆なアフィン要素写像とする。

$$
v(x)
=
\widehat v(F_K^{-1}(x))
$$

とすると、

$$
\boxed{
\nabla_x v(x)
=
B_K^{-\mathsf T}
\nabla_{\widehat x}
\widehat v(\widehat x)
}
$$

ただし

$$
x=F_K(\widehat x)
$$

である。

また可積分関数 $g$ に対して

$$
\boxed{
\int_K g(x)\,dx
=
|\det B_K|
\int_{\widehat K}
g(F_K(\widehat x))
\,d\widehat x
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

勾配変換は多変数の連鎖律です。

積分変換は $F_K$ の Jacobian が定数行列 $B_K$ であることから出ます。

<!-- proof-start -->
### 証明

$$
x=F_K(\widehat x)
=
B_K\widehat x+z_1
$$

なので

$$
\widehat x
=
F_K^{-1}(x)
=
B_K^{-1}(x-z_1).
$$

各成分について連鎖律を使うと、

$$
\frac{\partial v}{\partial x_j}
=
\sum_{\ell=1}^2
\frac{\partial\widehat v}{\partial\widehat x_\ell}
\frac{\partial\widehat x_\ell}{\partial x_j}.
$$

一方

$$
D_x\widehat x
=
B_K^{-1}.
$$

従って列ベクトルとして勾配を並べれば

$$
\nabla_xv
=
(B_K^{-1})^{\mathsf T}
\nabla_{\widehat x}\widehat v
=
B_K^{-\mathsf T}
\nabla_{\widehat x}\widehat v.
$$

次に変数変換公式を使います。

$F_K$ の Jacobian 行列は各点で

$$
DF_K=B_K
$$

なので Jacobian の絶対値は

$$
|\det B_K|
$$

です。

したがって

$$
\int_Kg(x)\,dx
=
\int_{\widehat K}
g(F_K(\widehat x))
|\det B_K|
\,d\widehat x.
$$

$B_K$ は $\widehat x$ に依存しないので、

$$
\int_Kg(x)\,dx
=
|\det B_K|
\int_{\widehat K}
g(F_K(\widehat x))
\,d\widehat x.
$$
<!-- proof-end -->

基準三角形の重心座標を

$$
\widehat\lambda_i
$$

とすると、一般要素上では

$$
\lambda_i
=
\widehat\lambda_i\circ F_K^{-1}.
$$

従って

$$
\nabla\lambda_i
=
B_K^{-\mathsf T}
\nabla\widehat\lambda_i.
$$

一次要素では $\widehat\lambda_i$ が一次関数なので、その勾配は要素内で一定です。

つまり Poisson の局所剛性行列は、各三角形ごとに定数ベクトルの内積を取るだけで計算できます。

---

## 6. 局所要素を大域空間へ貼り合わせる

適合三角形分割 $\mathcal T_h$ を固定します。

<a id="def-fem2-conforming-p1-space"></a>

<!-- formal-statement-start -->
### 定義（連続一次有限要素空間）

適合三角形分割 $\mathcal T_h$ に対し、

$$
\boxed{
S_h
=
\left\{
v\in C(\overline\Omega)
:
v|_K\in P_1(K)
\quad
(\forall K\in\mathcal T_h)
\right\}
}
$$

を **連続一次有限要素空間**という。

さらに零 Dirichlet 条件を課した空間を

$$
\boxed{
V_h
=
\left\{
v\in S_h:
v(z)=0
\text{ for every boundary vertex }z
\right\}
}
$$

とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem2-conforming-p1-space -->
**定義の確認**

### 例：中心節点の帽子関数は $V_h$ に入る

単位正方形に中心点

$$
z_5=(1/2,1/2)
$$

を加え、中心と四隅を結んで四つの三角形

$$
K_1,K_2,K_3,K_4
$$

へ分けます。下・右・上・左の三角形の順に、関数 $v_h$ を

$$
v_h|_{K_1}=2y,
$$

$$
v_h|_{K_2}=2(1-x),
$$

$$
v_h|_{K_3}=2(1-y),
$$

$$
v_h|_{K_4}=2x
$$

と定めます。

各式は一次関数なので

$$
v_h|_{K_r}\in P_1(K_r)
\qquad
(r=1,2,3,4).
$$

たとえば $K_1$ と $K_2$ の共通辺は

$$
y=1-x
$$

なので、その上では

$$
2y=2(1-x).
$$

他の共通辺でも同じように両側の式が一致するため、

$$
v_h\in C(\overline\Omega).
$$

従って

$$
v_h\in S_h.
$$

さらに四隅では全て 0 であり、境界頂点はこの四点だけなので

$$
v_h\in V_h.
$$

中心点では

$$
v_h(z_5)=1
$$

です。これは中心節点に対応する大域帽子関数の最小例です。
<!-- definition-example-end -->

境界辺上では $v$ は一次関数です。

その両端の境界頂点で 0 なら、辺全体で 0 です。

したがって $V_h$ の関数は境界上で 0 になります。

しかし FEM1 の適合 Galerkin 法へ入れるには、単に「連続だからよさそう」では足りません。

本当に

$$
V_h\subset H_0^1(\Omega)
$$

であることを確認する必要があります。

---

## 7. 連続区分一次なら弱微分に辺上の delta が出ない

区分一次関数は、要素内部では滑らかです。

問題は要素境界です。

GPDE3 で見たように、関数そのものが jump を持つと distribution 微分に delta が現れ、$H^1$ から外れます。

有限要素関数では、まさにこの jump を連続性で消します。

<a id="thm-fem2-h1-conformity"></a>

<!-- formal-statement-start -->
### 定理（連続区分一次関数の H^1 適合性）

$\Omega\subset\mathbb R^2$ を有界多角形領域、$\mathcal T_h$ をその適合三角形分割とする。

このとき

$$
\boxed{
S_h\subset H^1(\Omega)
}
$$

である。

さらに $v_h\in S_h$ が全ての境界頂点で 0 なら、

$$
\boxed{
v_h\in H_0^1(\Omega)
}
$$

である。

従って

$$
\boxed{
V_h\subset H_0^1(\Omega)
}
$$

であり、$V_h$ は FEM1 の適合 Galerkin 空間として使える。
<!-- formal-statement-end -->

### 証明の見取り図

各要素上では $\partial_jv_h$ は定数です。

弱微分を確認するため、滑らかな試験関数 $\psi$ に対して要素ごとに部分積分します。

内部辺では

- 隣接二要素の法線が反対向き
- $v_h$ の両側の値が同じ

なので境界項が相殺します。

これが「連続性が delta を消す」機構です。

<!-- proof-start -->
### 証明

$v_h\in S_h$ とします。

各 $K\in\mathcal T_h$ 上で $v_h|_K\in P_1(K)$ なので、古典勾配

$$
\nabla(v_h|_K)
$$

は定数ベクトルです。

従って要素ごとに定義した関数

$$
g_j|_K
=
\partial_j(v_h|_K)
$$

は有限個の要素上で区分的に定数であり、

$$
g_j\in L^2(\Omega).
$$

$g_j$ が $v_h$ の弱微分であることを示します。

任意の

$$
\psi\in C_c^\infty(\Omega)
$$

を取ります。

要素ごとの部分積分により

$$
\int_K
v_h\,\partial_j\psi\,dx
=
\int_{\partial K}
v_h\psi\,n_{K,j}\,ds
-
\int_K
g_j\psi\,dx.
$$

全要素について和を取ると

$$
\int_\Omega
v_h\,\partial_j\psi\,dx
=
\sum_{K\in\mathcal T_h}
\int_{\partial K}
v_h\psi\,n_{K,j}\,ds
-
\int_\Omega
g_j\psi\,dx.
$$

内部辺 $E=K\cap L$ を一つ取ります。

$K$ から見た外向き法線と $L$ から見た外向き法線は

$$
n_L=-n_K.
$$

また $v_h\in C(\overline\Omega)$ なので、辺 $E$ 上で両要素からの値は一致します。

従って $E$ から出る二つの境界項は

$$
\int_E
v_h\psi\,n_{K,j}\,ds
+
\int_E
v_h\psi\,n_{L,j}\,ds
=
0.
$$

全ての内部辺で同じ相殺が起こります。

一方 $\psi$ は $\Omega$ の内部にコンパクトな台を持つので、$\partial\Omega$ 上では $\psi=0$ です。

したがって外側境界の項も 0 です。

よって

$$
\int_\Omega
v_h\,\partial_j\psi\,dx
=
-
\int_\Omega
g_j\psi\,dx.
$$

これは $g_j$ が $v_h$ の第 $j$ 弱微分であることを意味します。

$v_h$ は有界領域上の連続区分一次関数なので

$$
v_h\in L^2(\Omega),
$$

かつ

$$
g_1,g_2\in L^2(\Omega).
$$

従って

$$
v_h\in H^1(\Omega).
$$

次に $v_h$ が全境界頂点で 0 とします。

各境界辺上で $v_h$ は一次関数で、その両端値が 0 なので辺全体で 0 です。

従って境界上の値は 0 です。

多角形領域は有界 Lipschitz 領域なので、[GPDE4 の $H_0^1$ と零境界値の同一視](../GPDE4/index.md#thm-gpde4-h01-trace-kernel)を適用でき、

$$
v_h\in H_0^1(\Omega).
$$

したがって

$$
V_h\subset H_0^1(\Omega).
$$
<!-- proof-end -->

### 連続性を失うと何が壊れるか

隣接二三角形で別々の一次関数を使い、共通辺上で値が跳ぶとします。

すると上の証明で内部辺の二つの境界項が相殺しません。

残った辺積分は distribution 微分に集中項を生みます。

つまり

$$
\boxed{
\text{要素間連続性}
\Longrightarrow
\text{内部辺の境界項が消える}
\Longrightarrow
H^1\text{ 適合}
}
$$

という構造です。

---

## 8. 大域自由度は頂点値になる

$\mathcal T_h$ の全頂点を

$$
z_1,\ldots,z_N
$$

とします。

各頂点 $z_i$ に対して、

$$
\phi_i(z_j)=\delta_{ij}
$$

となる連続区分一次関数を作ります。

<a id="thm-fem2-global-nodal-basis"></a>

<!-- formal-statement-start -->
### 定理（大域節点基底）

適合三角形分割 $\mathcal T_h$ の全頂点を

$$
z_1,\ldots,z_N
$$

とする。

各 $i$ に対して一意な

$$
\phi_i\in S_h
$$

が存在し、

$$
\boxed{
\phi_i(z_j)=\delta_{ij}
\qquad
(1\le j\le N)
}
$$

を満たす。

さらに

$$
\boxed{
S_h
=
\operatorname{span}\{\phi_1,\ldots,\phi_N\}
}
$$

であり、この表示は一意である。

特に任意の $v_h\in S_h$ は

$$
\boxed{
v_h
=
\sum_{i=1}^N
v_h(z_i)\phi_i
}
$$

と書ける。

零 Dirichlet 空間 $V_h$ の基底は、内部頂点に対応する $\phi_i$ だけで与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

各三角形上では、三頂点の値が決まれば一次関数は一意です。

したがって「全頂点で 0 または 1」というデータを各要素へ制限し、その要素上で局所一次関数を作ります。

共通辺では二つの一次関数が両端で同じ値を持つので、辺全体で一致します。

このため局所関数が連続に貼り合わさります。

<!-- proof-start -->
### 証明

$i$ を固定します。

各三角形

$$
K=\operatorname{conv}\{z_{i_1},z_{i_2},z_{i_3}\}
$$

上で、三頂点値を

$$
\delta_{i,i_1},
\qquad
\delta_{i,i_2},
\qquad
\delta_{i,i_3}
$$

と指定します。

[一次三角形要素の一意可解性](#thm-fem2-p1-unisolvence)により、これらの値を持つ一意な一次関数

$$
\phi_i|_K\in P_1(K)
$$

が存在します。

次に隣接二要素 $K,L$ が共通辺

$$
E=\operatorname{conv}\{z_r,z_s\}
$$

を持つとします。

$\phi_i|_K$ と $\phi_i|_L$ を辺 $E$ へ制限すると、どちらも辺上の一次関数であり、端点 $z_r,z_s$ で同じ値

$$
\delta_{ir},
\qquad
\delta_{is}
$$

を取ります。

一変数一次関数は二点の値で一意に決まるので、

$$
\phi_i|_K
=
\phi_i|_L
\qquad
\text{on }E.
$$

従って要素ごとの定義は連続に貼り合わさり、

$$
\phi_i\in S_h.
$$

また構成から

$$
\phi_i(z_j)=\delta_{ij}.
$$

次に任意の $v_h\in S_h$ に対し

$$
w_h
=
v_h
-
\sum_{i=1}^N
v_h(z_i)\phi_i
$$

と置きます。

各頂点 $z_j$ で

$$
w_h(z_j)
=
v_h(z_j)
-
\sum_{i=1}^N
v_h(z_i)\delta_{ij}
=
0.
$$

任意の要素 $K$ 上で $w_h|_K\in P_1(K)$ であり、その三頂点で 0 です。

[一意可解性](#thm-fem2-p1-unisolvence)から

$$
w_h|_K=0.
$$

全要素で 0 なので

$$
w_h=0
$$

です。

従って

$$
v_h
=
\sum_{i=1}^N
v_h(z_i)\phi_i.
$$

最後に

$$
\sum_{i=1}^N c_i\phi_i=0
$$

とします。

頂点 $z_j$ で評価すると

$$
c_j=0
$$

です。

従って $\phi_1,\ldots,\phi_N$ は一次独立であり、$S_h$ の基底です。

零 Dirichlet 空間では境界頂点の係数

$$
v_h(z_i)
$$

が 0 なので、内部頂点の基底関数だけが残ります。
<!-- proof-end -->

### 局所台

$\phi_i$ は頂点 $z_i$ を含まない要素上では、三頂点値が全て 0 です。

従ってその要素上で

$$
\phi_i=0.
$$

つまり

$$
\operatorname{supp}\phi_i
$$

は $z_i$ を共有する三角形の集まりだけです。

この頂点まわりの小さな台が疎行列を生みます。

---

## 9. 二三角形メッシュで帽子関数を手で作る

再び単位正方形を

$$
K_1
=
\operatorname{conv}\{z_1,z_2,z_3\},
$$

$$
K_2
=
\operatorname{conv}\{z_1,z_3,z_4\}
$$

と分けます。

頂点を

$$
z_1=(0,0),
\quad
z_2=(1,0),
\quad
z_3=(1,1),
\quad
z_4=(0,1)
$$

とします。

$z_1$ に対応する大域基底 $\phi_1$ を求めます。

$K_1$ 上では

$$
\phi_1(z_1)=1,
\qquad
\phi_1(z_2)=\phi_1(z_3)=0.
$$

一次関数を解くと

$$
\phi_1|_{K_1}=1-x.
$$

$K_2$ 上では

$$
\phi_1(z_1)=1,
\qquad
\phi_1(z_3)=\phi_1(z_4)=0,
$$

なので

$$
\phi_1|_{K_2}=1-y.
$$

共通対角線は

$$
x=y
$$

です。

その上で

$$
1-x=1-y
$$

なので、二つの局所式は確かに連続に貼り合わさります。

したがって

$$
\boxed{
\phi_1(x,y)
=
\begin{cases}
1-x,&(x,y)\in K_1,\\
1-y,&(x,y)\in K_2.
\end{cases}
}
$$

です。

一つの大域基底関数が、各要素上では単なる重心座標になっていることが見えます。

---

## 10. Poisson の局所剛性行列

FEM1 の Poisson Galerkin 法では

$$
A_{ij}
=
\int_\Omega
\nabla\phi_j\cdot\nabla\phi_i\,dx
$$

でした。

積分領域を要素へ分けると

$$
A_{ij}
=
\sum_{K\in\mathcal T_h}
\int_K
\nabla\phi_j\cdot\nabla\phi_i\,dx.
$$

各要素ごとの寄与を、まず正式に定義します。

<a id="def-fem2-local-stiffness"></a>

<!-- formal-statement-start -->
### 定義（Poisson の局所剛性行列と局所荷重ベクトル）

要素

$
K=\operatorname{conv}\{z_{i_1},z_{i_2},z_{i_3}\}
$

上の局所節点基底を

$
\lambda_1^K,\lambda_2^K,\lambda_3^K
$

とする。

Poisson 方程式の双線形形式に対し、

$
\boxed{
A^K_{ab}
=
\int_K
\nabla\lambda_b^K\cdot
\nabla\lambda_a^K
\,dx
}
\qquad
(a,b=1,2,3)
$

で定まる 3 行 3 列行列 $A^K$ を **局所剛性行列**という。

また右辺 $f$ に対して

$
\boxed{
b_a^K
=
\int_K
f\lambda_a^K\,dx
}
$

で定まるベクトル $b^K$ を **局所荷重ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fem2-local-stiffness -->
**定義の確認**

### 例：基準三角形の局所剛性行列

基準三角形では

$$
\nabla\widehat\lambda_1
=
\begin{pmatrix}
-1\\
-1
\end{pmatrix},
\qquad
\nabla\widehat\lambda_2
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
\nabla\widehat\lambda_3
=
\begin{pmatrix}
0\\
1
\end{pmatrix}.
$$

[アフィン変換公式](#prop-fem2-affine-transform)から

$$
\nabla\lambda_a^K
=
B_K^{-\mathsf T}
\nabla\widehat\lambda_a.
$$

したがって

$$
\boxed{
A^K_{ab}
=
|\det B_K|
\int_{\widehat K}
\left(
B_K^{-\mathsf T}
\nabla\widehat\lambda_b
\right)
\cdot
\left(
B_K^{-\mathsf T}
\nabla\widehat\lambda_a
\right)
\,d\widehat x
}
$$

です。

一次要素では被積分関数が定数なので、

$$
|\widehat K|=\frac12
$$

を使えば

$
\boxed{
A^K_{ab}
=
\frac{|\det B_K|}{2}
\left(
B_K^{-\mathsf T}
\nabla\widehat\lambda_b
\right)
\cdot
\left(
B_K^{-\mathsf T}
\nabla\widehat\lambda_a
\right)
}.
$

特に $K=\widehat K$ なら $B_K=I$ なので

$
A^{\widehat K}
=
\begin{pmatrix}
1&-1/2&-1/2\\
-1/2&1/2&0\\
-1/2&0&1/2
\end{pmatrix}.
$

これは定義どおり、局所節点基底の勾配同士の内積を要素上で積分した行列です。
<!-- definition-example-end -->

局所荷重ベクトルも基準要素へ移せば

$
b_a^K
=
|\det B_K|
\int_{\widehat K}
f(F_K(\widehat x))
\widehat\lambda_a(\widehat x)
\,d\widehat x.
$

---

## 11. 局所行列から大域行列へ組み立てる

各要素で 3 行 3 列の局所行列を計算しても、それだけでは大域 Galerkin 方程式になりません。

同じ大域頂点を共有する自由度を、同じ大域未知量として足し合わせます。

<a id="prop-fem2-assembly-sparsity"></a>

<!-- formal-statement-start -->
### 命題（Poisson 剛性行列の局所組立てと疎性）

大域節点基底を

$$
\phi_1,\ldots,\phi_N
$$

とする。

要素

$$
K=\operatorname{conv}\{z_{i_1},z_{i_2},z_{i_3}\}
$$

の局所節点基底を

$$
\lambda_1^K,\lambda_2^K,\lambda_3^K
$$

とする。

Poisson 剛性行列

$$
A_{ij}
=
\int_\Omega
\nabla\phi_j\cdot\nabla\phi_i\,dx
$$

は、各要素の局所剛性行列

$$
A^K_{ab}
=
\int_K
\nabla\lambda_b^K\cdot\nabla\lambda_a^K\,dx
$$

を、大域添字対応

$$
a\mapsto i_a
$$

に従って加算することで得られる。

すなわち各 $K$ について

$$
\boxed{
A_{i_ai_b}
\mathrel{+}=
A^K_{ab}
\qquad
(a,b=1,2,3)
}
$$

とすればよい。

さらに二頂点 $z_i,z_j$ を同時に含む三角形が存在しなければ

$$
\boxed{
A_{ij}=0
}.
$$

従って一次三角形要素の剛性行列は疎である。
<!-- formal-statement-end -->

### 証明の見取り図

大域基底 $\phi_i$ を一要素へ制限すると、

- $z_i$ がその要素の頂点なら対応する局所重心座標
- 頂点でなければ 0

になります。

従って大域積分を要素ごとの積分へ分ければ、局所行列成分を対応位置へ足す式がそのまま出ます。

<!-- proof-start -->
### 証明

大域成分を要素ごとに分けると

$$
A_{ij}
=
\sum_{K\in\mathcal T_h}
\int_K
\nabla\phi_j\cdot\nabla\phi_i\,dx.
$$

要素

$$
K=\operatorname{conv}\{z_{i_1},z_{i_2},z_{i_3}\}
$$

を固定します。

大域節点基底の構成から、

$$
\phi_{i_a}|_K
=
\lambda_a^K
\qquad
(a=1,2,3).
$$

一方、$z_i$ が $K$ の頂点でなければ

$$
\phi_i|_K=0.
$$

したがって要素 $K$ の寄与は、局所添字 $a,b$ に対応する大域成分

$$
(i_a,i_b)
$$

へ

$$
A^K_{ab}
=
\int_K
\nabla\lambda_b^K\cdot\nabla\lambda_a^K\,dx
$$

を足したものです。

全要素について加算すれば

$$
A_{i_ai_b}
\mathrel{+}=
A^K_{ab}
$$

という組立て規則を得ます。

次に、$z_i,z_j$ を同時に含む要素が存在しないとします。

任意の $K$ について、少なくとも一方の基底関数は $K$ 上で 0 です。

従って

$$
\nabla\phi_i\cdot\nabla\phi_j=0
$$

が各要素上で成り立ち、

$$
A_{ij}=0.
$$

よって各行で非零になり得るのは、その頂点と同じ要素を共有する近傍頂点に対応する成分だけです。
<!-- proof-end -->

### 「隣接なら必ず非零」ではない

上の命題は

$$
\text{共通要素なし}
\Longrightarrow
A_{ij}=0
$$

を言っています。

逆は一般に成り立ちません。

同じ要素を共有していても、幾何配置によって勾配が直交し、局所寄与が 0 になることがあります。

疎性は「どこが必ず 0 か」を局所台から保証する構造です。

---

## 12. 二三角形メッシュを実際に組み立てる

単位正方形を前節と同じ二三角形へ分けます。

$K_1$ 上の局所基底は

$$
\lambda_1^1=1-x,
\qquad
\lambda_2^1=x-y,
\qquad
\lambda_3^1=y.
$$

その勾配は

$$
\nabla\lambda_1^1
=
\begin{pmatrix}
-1\\
0
\end{pmatrix},
$$

$$
\nabla\lambda_2^1
=
\begin{pmatrix}
1\\
-1
\end{pmatrix},
$$

$$
\nabla\lambda_3^1
=
\begin{pmatrix}
0\\
1
\end{pmatrix}.
$$

$|K_1|=1/2$ なので

$$
A^{K_1}
=
\begin{pmatrix}
1/2&-1/2&0\\
-1/2&1&-1/2\\
0&-1/2&1/2
\end{pmatrix}.
$$

$K_2$ の頂点順を $(z_1,z_3,z_4)$ とすると、

$$
A^{K_2}
=
\begin{pmatrix}
1/2&0&-1/2\\
0&1/2&-1/2\\
-1/2&-1/2&1
\end{pmatrix}.
$$

$K_1$ は大域添字 $(1,2,3)$ へ、$K_2$ は $(1,3,4)$ へ加算します。

その結果、

$$
\boxed{
A
=
\begin{pmatrix}
1&-1/2&0&-1/2\\
-1/2&1&-1/2&0\\
0&-1/2&1&-1/2\\
-1/2&0&-1/2&1
\end{pmatrix}
}.
$$

各局所行列の情報が、大域頂点番号を介して重ね合わされています。

これが **組立て**（assembly）です。

ここで得た $A$ は、まだ境界条件を課していない $S_h$ 上の行列です。

実際、各行の和は 0 なので

$$
A
\begin{pmatrix}
1\\
1\\
1\\
1
\end{pmatrix}
=
0.
$$

これは定数有限要素関数の勾配が 0 であることに対応します。

したがって、この 4 行 4 列行列自体は正定値ではありません。

[FEM1 の剛性行列の正定値性](../FEM1/index.md#prop-fem1-basis-system)と矛盾しないのは、FEM1 では

$$
V_h\subset H_0^1(\Omega)
$$

という零 Dirichlet 空間へ制限していたからです。

この二三角形メッシュでは全四頂点が境界頂点なので、零 Dirichlet 条件を課すと

$$
V_h=\{0\}
$$

になります。非自明な内部自由度を持つ例は Level C で扱います。

---

## 13. 零 Dirichlet 条件では境界自由度を消す

FEM1 では

$$
V_h\subset H_0^1(\Omega)
$$

を仮定しました。

本章の一次三角形要素では、$V_h$ は内部頂点だけの大域基底で張られます。

全頂点を

$$
\mathcal N_h
=
\mathcal N_h^\circ
\cup
\mathcal N_h^\partial
$$

と内部頂点と境界頂点へ分けると、

$$
v_h
=
\sum_{z_i\in\mathcal N_h^\circ}
c_i\phi_i
$$

です。

境界頂点の係数を未知量として持つ必要はありません。

したがって 零 Dirichlet 問題では、

1. 全要素で局所行列を計算する。
2. 大域頂点番号へ組み立てる。
3. 境界自由度を 0 として、内部自由度に対応する連立方程式を解く。

という流れになります。

非零 Dirichlet 条件では境界値の寄与を右辺へ移す処理が必要ですが、本章では零境界条件に集中します。

---

## 14. ここまでで FEM1 の抽象空間が具体化された

FEM1 では

$$
V_h\subset H_0^1(\Omega)
$$

を抽象的に置きました。

本章でそれは

$$
\boxed{
V_h
=
\left\{
v\in C(\overline\Omega):
v|_K\in P_1(K),
\ v|_{\partial\Omega}=0
\right\}
}
$$

として具体化されました。

さらに未知関数は

$$
u_h
=
\sum_{i=1}^{N_0}
c_i\phi_i
$$

と内部節点基底で展開され、

$$
A\mathbf c=\mathbf b
$$

の係数は

$$
A_{ij}
=
\sum_{K\in\mathcal T_h}
\int_K
\nabla\phi_j\cdot\nabla\phi_i\,dx
$$

を局所行列から組み立てて得られます。

有限要素法の計算構造を一行でまとめると、

$$
\boxed{
\text{基準要素}
\to
\text{各実要素}
\to
\text{局所基底}
\to
\text{局所行列}
\to
\text{大域組立て}
}
$$

です。

ただし、まだ

$$
\inf_{v_h\in V_h}
\|u-v_h\|_{H^1}
$$

が $h$ に対してどれだけ速く小さくなるかは示していません。

それには

- 節点補間
- 要素の形状
- 解の二階微分
- 局所誤差の大域化

が必要です。

それが FEM3 の主題です。

---

## 15. 演習

### Level A

<a id="ex-fem2-a01"></a>
#### FEM2-A01 重心座標を求める
- Level: A

三角形

$$
K
=
\operatorname{conv}
\{
(0,0),(2,0),(0,1)
\}
$$

の重心座標

$$
\lambda_1,\lambda_2,\lambda_3
$$

を求めよ。

さらに

$$
\lambda_1+\lambda_2+\lambda_3=1
$$

を直接確認せよ。

<!-- solution-start -->
**詳細解答**

頂点を

$$
z_1=(0,0),
\qquad
z_2=(2,0),
\qquad
z_3=(0,1)
$$

とします。

$\lambda_2$ は

$$
\lambda_2(z_1)=0,
\qquad
\lambda_2(z_2)=1,
\qquad
\lambda_2(z_3)=0
$$

を満たす一次関数です。

$x$ 座標だけで

$$
\lambda_2(x,y)=\frac{x}{2}
$$

とすれば三条件を満たします。

同様に

$$
\lambda_3(x,y)=y.
$$

最後に

$$
\lambda_1=1-\lambda_2-\lambda_3
$$

なので

$$
\boxed{
\lambda_1(x,y)
=
1-\frac{x}{2}-y
},
$$

$$
\boxed{
\lambda_2(x,y)
=
\frac{x}{2}
},
$$

$$
\boxed{
\lambda_3(x,y)
=
y
}.
$$

各頂点で確認すると、

$$
\lambda_1(z_1)=1,
\quad
\lambda_1(z_2)=0,
\quad
\lambda_1(z_3)=0,
$$

など、対応する頂点で 1、残りの頂点で 0 という節点条件を満たします。

また

$$
\lambda_1+\lambda_2+\lambda_3
=
\left(1-\frac{x}{2}-y\right)
+\frac{x}{2}+y
=
1.
$$

よって重心座標の分割単位性を直接確認できました。
<!-- solution-end -->

<a id="ex-fem2-a02"></a>
#### FEM2-A02 基準三角形からのアフィン写像
- Level: A

基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

から

$$
K
=
\operatorname{conv}\{(1,1),(3,1),(1,4)\}
$$

へのアフィン要素写像 $F_K$ を求めよ。

さらに

1. $B_K$ と $\det B_K$ を求める。
2. $\widehat v(\xi,\eta)=\xi+2\eta$ に対する $v=\widehat v\circ F_K^{-1}$ の勾配を求める。
3. $|K|$ を変数変換公式から求める。

<!-- solution-start -->
**詳細解答**

頂点を

$$
z_1=(1,1),
\qquad
z_2=(3,1),
\qquad
z_3=(1,4)
$$

とします。

列ベクトル

$$
z_2-z_1
=
\begin{pmatrix}
2\\
0
\end{pmatrix},
\qquad
z_3-z_1
=
\begin{pmatrix}
0\\
3
\end{pmatrix}
$$

から

$$
\boxed{
B_K
=
\begin{pmatrix}
2&0\\
0&3
\end{pmatrix}
}.
$$

従って

$$
\boxed{
F_K(\xi,\eta)
=
\begin{pmatrix}
1+2\xi\\
1+3\eta
\end{pmatrix}
}.
$$

行列式は

$$
\boxed{
\det B_K=6
}.
$$

次に

$$
\nabla_{\widehat x}\widehat v
=
\begin{pmatrix}
1\\
2
\end{pmatrix}.
$$

また

$$
B_K^{-\mathsf T}
=
\begin{pmatrix}
1/2&0\\
0&1/3
\end{pmatrix}.
$$

したがって勾配変換公式から

$$
\nabla_xv
=
B_K^{-\mathsf T}
\nabla_{\widehat x}\widehat v
=
\begin{pmatrix}
1/2\\
2/3
\end{pmatrix}.
$$

よって

$$
\boxed{
\nabla v
=
(1/2,2/3)^{\mathsf T}
}.
$$

最後に $g\equiv1$ として積分変換を使います。

$$
|K|
=
\int_K1\,dx
=
|\det B_K|
\int_{\widehat K}1\,d\widehat x.
$$

基準三角形の面積は $1/2$ なので

$$
|K|
=
6\cdot\frac12
=
\boxed{3}.
$$
<!-- solution-end -->

<a id="ex-fem2-a03"></a>
#### FEM2-A03 基準三角形の局所剛性行列
- Level: A

基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

に対して

$$
A_{ij}^{\widehat K}
=
\int_{\widehat K}
\nabla\widehat\lambda_j
\cdot
\nabla\widehat\lambda_i
\,d\widehat x
$$

を計算せよ。

<!-- solution-start -->
**詳細解答**

基準三角形の重心座標は

$$
\widehat\lambda_1=1-\xi-\eta,
$$

$$
\widehat\lambda_2=\xi,
$$

$$
\widehat\lambda_3=\eta.
$$

従って

$$
g_1
=
\nabla\widehat\lambda_1
=
\begin{pmatrix}
-1\\
-1
\end{pmatrix},
$$

$$
g_2
=
\nabla\widehat\lambda_2
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
$$

$$
g_3
=
\nabla\widehat\lambda_3
=
\begin{pmatrix}
0\\
1
\end{pmatrix}.
$$

これらは要素内で一定です。

したがって

$$
A_{ij}^{\widehat K}
=
|\widehat K|\,g_j\cdot g_i.
$$

面積は

$$
|\widehat K|=\frac12.
$$

内積を計算すると

$$
g_1\cdot g_1=2,
$$

$$
g_1\cdot g_2=-1,
\qquad
g_1\cdot g_3=-1,
$$

$$
g_2\cdot g_2=1,
\qquad
g_2\cdot g_3=0,
$$

$$
g_3\cdot g_3=1.
$$

従って

$$
\boxed{
A^{\widehat K}
=
\begin{pmatrix}
1&-1/2&-1/2\\
-1/2&1/2&0\\
-1/2&0&1/2
\end{pmatrix}
}.
$$

各行和が 0 であることにも注意します。

これは

$$
\widehat\lambda_1
+
\widehat\lambda_2
+
\widehat\lambda_3
=
1
$$

なので

$$
\nabla\widehat\lambda_1
+
\nabla\widehat\lambda_2
+
\nabla\widehat\lambda_3
=
0
$$

であることに対応しています。
<!-- solution-end -->

<a id="ex-fem2-a04"></a>
#### FEM2-A04 二三角形上の大域帽子関数
- Level: A

単位正方形の頂点を

$$
z_1=(0,0),
\quad
z_2=(1,0),
\quad
z_3=(1,1),
\quad
z_4=(0,1)
$$

とし、

$$
K_1=\operatorname{conv}\{z_1,z_2,z_3\},
$$

$$
K_2=\operatorname{conv}\{z_1,z_3,z_4\}
$$

とする。

$z_1$ に対応する大域節点基底 $\phi_1$ を各要素上で求め、共通辺上で連続であることを確認せよ。

<!-- solution-start -->
**詳細解答**

$K_1$ 上では $\phi_1$ は一次関数で

$$
\phi_1(z_1)=1,
\qquad
\phi_1(z_2)=0,
\qquad
\phi_1(z_3)=0
$$

を満たします。

$$
p(x,y)=a+bx+cy
$$

と置きます。

$z_1=(0,0)$ から

$$
a=1.
$$

$z_2=(1,0)$ から

$$
1+b=0,
$$

したがって

$$
b=-1.
$$

$z_3=(1,1)$ から

$$
1-1+c=0,
$$

したがって

$$
c=0.
$$

よって

$$
\boxed{
\phi_1|_{K_1}=1-x
}.
$$

次に $K_2$ 上では

$$
\phi_1(z_1)=1,
\qquad
\phi_1(z_3)=0,
\qquad
\phi_1(z_4)=0.
$$

同様に $p=a+bx+cy$ と置くと、

$$
a=1.
$$

$z_4=(0,1)$ から

$$
1+c=0
$$

なので

$$
c=-1.
$$

$z_3=(1,1)$ から

$$
1+b-1=0
$$

なので

$$
b=0.
$$

したがって

$$
\boxed{
\phi_1|_{K_2}=1-y
}.
$$

共通辺 $z_1z_3$ は

$$
x=y
$$

です。

この辺上で

$$
\phi_1|_{K_1}
=
1-x
=
1-y
=
\phi_1|_{K_2}.
$$

従って局所式は共通辺上で一致し、大域関数は連続です。
<!-- solution-end -->

### Level B

<a id="ex-fem2-b01"></a>
#### FEM2-B01 なぜ連続区分一次関数は H^1 に入るのか
- Level: B

$\mathcal T_h$ を多角形領域 $\Omega$ の適合三角形分割とし、

$$
v_h\in C(\overline\Omega),
\qquad
v_h|_K\in P_1(K)
$$

とする。

任意の

$$
\psi\in C_c^\infty(\Omega)
$$

に対して要素ごとの部分積分を行い、内部辺の境界項が相殺することを示して

$$
v_h\in H^1(\Omega)
$$

を証明せよ。

さらに、要素間連続性を外すと証明のどこが壊れるか説明せよ。

<!-- solution-start -->
**詳細解答**

座標方向 $j\in\{1,2\}$ を固定します。

各要素 $K$ 上では $v_h|_K$ は一次関数なので

$$
g_j|_K
=
\partial_j(v_h|_K)
$$

は定数です。

要素数は有限なので、この区分定数関数は

$$
g_j\in L^2(\Omega)
$$

です。

これが弱微分であることを示します。

各要素で部分積分すると

$$
\int_Kv_h\partial_j\psi\,dx
=
\int_{\partial K}
v_h\psi n_{K,j}\,ds
-
\int_Kg_j\psi\,dx.
$$

全要素で和を取ると

$$
\int_\Omega
v_h\partial_j\psi\,dx
=
\sum_K
\int_{\partial K}
v_h\psi n_{K,j}\,ds
-
\int_\Omega
g_j\psi\,dx.
$$

内部辺 $E=K\cap L$ を考えます。

$K,L$ の外向き法線は互いに反対なので

$$
n_L=-n_K.
$$

また $v_h$ は大域的に連続なので、$E$ 上の関数値は両側から同じです。

したがって

$$
\int_Ev_h\psi n_{K,j}\,ds
+
\int_Ev_h\psi n_{L,j}\,ds
=
\int_Ev_h\psi(n_{K,j}+n_{L,j})\,ds
=
0.
$$

内部辺の寄与は全て消えます。

外部境界では $\psi$ の台が $\Omega$ 内部にコンパクトに含まれるため

$$
\psi=0
$$

です。

よって外部境界項も 0 です。

従って

$$
\int_\Omega
v_h\partial_j\psi\,dx
=
-
\int_\Omega
g_j\psi\,dx.
$$

これは $g_j$ が $v_h$ の弱微分であることを示します。

また $v_h$ 自身も有界領域上の連続区分一次関数なので

$$
v_h\in L^2(\Omega).
$$

したがって

$$
v_h\in H^1(\Omega).
$$

連続性を外すと、内部辺上で $K$ 側の値と $L$ 側の値が一致しません。

すると内部辺の和は

$$
\int_E
\bigl(
v_h|_K-v_h|_L
\bigr)
\psi n_{K,j}\,ds
$$

として残ります。

この項は通常の $L^2$ 関数による体積積分ではなく、辺上に集中した distribution を表します。

従って区分勾配だけを $L^2$ 弱微分として採用できなくなります。

つまり証明の核心は

$$
\boxed{
\text{要素間連続性}
\Longrightarrow
\text{内部辺項の相殺}
}
$$

です。
<!-- solution-end -->

<a id="ex-fem2-b02"></a>
#### FEM2-B02 二三角形メッシュの剛性行列を組み立てる
- Level: B

単位正方形を

$$
K_1=(z_1,z_2,z_3),
\qquad
K_2=(z_1,z_3,z_4)
$$

で分ける。

局所剛性行列が

$$
A^{K_1}
=
\begin{pmatrix}
1/2&-1/2&0\\
-1/2&1&-1/2\\
0&-1/2&1/2
\end{pmatrix},
$$

$$
A^{K_2}
=
\begin{pmatrix}
1/2&0&-1/2\\
0&1/2&-1/2\\
-1/2&-1/2&1
\end{pmatrix}
$$

であるとする。

局所添字から大域添字への対応を明示して、4 行 4 列の大域剛性行列を組み立てよ。

また $z_1,z_3$ は同じ二要素を共有するのに $A_{13}=0$ となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$K_1$ の局所頂点順は

$$
(z_1,z_2,z_3)
$$

なので局所添字

$$
(1,2,3)
$$

はそのまま大域添字

$$
(1,2,3)
$$

へ対応します。

従ってまず零行列へ $A^{K_1}$ を左上の $(1,2,3)$ 成分へ加えると

$$
A^{(1)}
=
\begin{pmatrix}
1/2&-1/2&0&0\\
-1/2&1&-1/2&0\\
0&-1/2&1/2&0\\
0&0&0&0
\end{pmatrix}.
$$

次に $K_2$ の局所頂点順は

$$
(z_1,z_3,z_4)
$$

なので

$$
(1,2,3)_{\rm local}
\mapsto
(1,3,4)_{\rm global}.
$$

したがって

$$
A^{K_2}_{11}=\frac12
$$

を $A_{11}$ へ、

$$
A^{K_2}_{22}=\frac12
$$

を $A_{33}$ へ、

$$
A^{K_2}_{33}=1
$$

を $A_{44}$ へ加えます。

また

$$
A^{K_2}_{13}
=
A^{K_2}_{31}
=
-\frac12
$$

は大域成分

$$
(1,4),(4,1)
$$

へ、

$$
A^{K_2}_{23}
=
A^{K_2}_{32}
=
-\frac12
$$

は

$$
(3,4),(4,3)
$$

へ入ります。

結果は

$$
\boxed{
A
=
\begin{pmatrix}
1&-1/2&0&-1/2\\
-1/2&1&-1/2&0\\
0&-1/2&1&-1/2\\
-1/2&0&-1/2&1
\end{pmatrix}
}.
$$

$z_1,z_3$ は確かに両三角形を共有します。

しかし $K_1$ では対応する局所成分が

$$
A^{K_1}_{13}=0,
$$

$K_2$ でも

$$
A^{K_2}_{12}=0
$$

です。

したがって加算後も

$$
A_{13}=0.
$$

局所台が重なることは「非零になり得る」ための必要条件ですが、「必ず非零」を意味しません。

この例では対応する局所基底の勾配が直交しているため積分が 0 になっています。
<!-- solution-end -->

<a id="ex-fem2-b03"></a>
#### FEM2-B03 二次元一次要素のスケーリング
- Level: B

$$
K_h
=
\operatorname{conv}
\{
(0,0),(h,0),(0,h)
\}
$$

を考える。

基準三角形からの写像が

$$
F_h(\widehat x)=h\widehat x
$$

であることを使い、Poisson の局所剛性行列

$$
A^{K_h}
$$

が $h$ に依存しないことを示せ。

一方、局所質量行列

$$
M_{ij}^{K_h}
=
\int_{K_h}
\lambda_i\lambda_j\,dx
$$

は $h^2$ に比例することを示せ。

<!-- solution-start -->
**詳細解答**

写像

$$
F_h(\widehat x)=h\widehat x
$$

では

$$
B_h=hI.
$$

したがって

$$
|\det B_h|=h^2,
$$

$$
B_h^{-\mathsf T}
=
\frac1hI.
$$

局所剛性行列は

$$
A_{ij}^{K_h}
=
|\det B_h|
\int_{\widehat K}
\left(
B_h^{-\mathsf T}\nabla\widehat\lambda_j
\right)
\cdot
\left(
B_h^{-\mathsf T}\nabla\widehat\lambda_i
\right)
\,d\widehat x.
$$

ここへ

$$
|\det B_h|=h^2
$$

と

$$
B_h^{-\mathsf T}=\frac1hI
$$

を代入すると

$$
A_{ij}^{K_h}
=
h^2
\int_{\widehat K}
\frac1h\nabla\widehat\lambda_j
\cdot
\frac1h\nabla\widehat\lambda_i
\,d\widehat x.
$$

二つの $1/h$ から $1/h^2$ が出るので

$$
A_{ij}^{K_h}
=
\int_{\widehat K}
\nabla\widehat\lambda_j
\cdot
\nabla\widehat\lambda_i
\,d\widehat x.
$$

従って

$$
\boxed{
A^{K_h}=A^{\widehat K}
}
$$

であり、$h$ に依存しません。

次に質量行列では勾配がありません。

重心座標は

$$
\lambda_i(F_h(\widehat x))
=
\widehat\lambda_i(\widehat x)
$$

なので

$$
M_{ij}^{K_h}
=
|\det B_h|
\int_{\widehat K}
\widehat\lambda_i
\widehat\lambda_j
\,d\widehat x.
$$

従って

$$
\boxed{
M_{ij}^{K_h}
=
h^2
M_{ij}^{\widehat K}
}.
$$

つまり二次元では

- 面積要因が $h^2$
- 各勾配が $h^{-1}$

なので Poisson 剛性では

$$
h^2\cdot h^{-1}\cdot h^{-1}=1
$$

となります。

一方、質量行列は勾配を含まないので面積要因 $h^2$ がそのまま残ります。
<!-- solution-end -->

### Level C

<a id="ex-fem2-c01"></a>
#### FEM2-C01 中心一点メッシュで Poisson 問題を最後まで組み立てる
- Level: C

$$
\Omega=(0,1)^2
$$

とし、四隅を

$$
z_1=(0,0),
\quad
z_2=(1,0),
\quad
z_3=(1,1),
\quad
z_4=(0,1)
$$

とする。

中心点

$$
z_5=(1/2,1/2)
$$

を加え、四三角形

$$
K_1=\operatorname{conv}\{z_1,z_2,z_5\},
$$

$$
K_2=\operatorname{conv}\{z_2,z_3,z_5\},
$$

$$
K_3=\operatorname{conv}\{z_3,z_4,z_5\},
$$

$$
K_4=\operatorname{conv}\{z_4,z_1,z_5\}
$$

で分割する。

零 Dirichlet Poisson 問題

$$
-\Delta u=1
\quad\text{in }\Omega,
$$

$$
u=0
\quad\text{on }\partial\Omega
$$

を一次三角形有限要素で離散化せよ。

1. 離散空間 $V_h$ の次元と基底を答えよ。
2. 中心節点基底 $\phi_5$ について、各要素から
   $$
   \int_{K_r}|\nabla\phi_5|^2\,dx
   $$
   を求めよ。
3. 大域剛性成分 $A_{55}$ を求めよ。
4. 荷重
   $$
   b_5=\int_\Omega\phi_5\,dx
   $$
   を求めよ。
5. 有限要素解
   $$
   u_h=c_5\phi_5
   $$
   の係数 $c_5$ を求めよ。

<!-- solution-start -->
**詳細解答**

四隅 $z_1,\ldots,z_4$ は全て境界頂点です。

零 Dirichlet 条件により、それらに対応する係数は 0 です。

内部頂点は

$$
z_5=(1/2,1/2)
$$

だけなので

$$
\boxed{
\dim V_h=1
}
$$

であり、

$$
\boxed{
V_h=\operatorname{span}\{\phi_5\}
}
$$

です。

まず $K_1$ を考えます。

$$
K_1
=
\operatorname{conv}
\{
(0,0),(1,0),(1/2,1/2)
\}.
$$

$\phi_5|_{K_1}$ は底辺 $y=0$ の両端で 0、中心点で 1 です。

一次関数

$$
p(x,y)=a+bx+cy
$$

と置くと、

$$
p(0,0)=0
$$

から

$$
a=0.
$$

$$
p(1,0)=0
$$

から

$$
b=0.
$$

$$
p(1/2,1/2)=1
$$

から

$$
\frac c2=1,
$$

従って

$$
c=2.
$$

よって

$$
\phi_5|_{K_1}=2y,
$$

$$
\nabla\phi_5|_{K_1}
=
\begin{pmatrix}
0\\
2
\end{pmatrix}.
$$

したがって

$$
|\nabla\phi_5|^2=4.
$$

$K_1$ の面積は

$$
|K_1|
=
\frac12\cdot1\cdot\frac12
=
\frac14.
$$

よって

$$
\int_{K_1}
|\nabla\phi_5|^2\,dx
=
4\cdot\frac14
=
1.
$$

残りの三角形は $K_1$ を正方形の中心まわりに $90^\circ$ ずつ回転したものです。

各要素で $\phi_5$ は中心点で 1、外側辺の両端で 0 です。

回転は長さと面積を保つので、各要素でも同じ値

$$
\int_{K_r}
|\nabla\phi_5|^2\,dx
=
1
\qquad
(r=1,2,3,4)
$$

を得ます。

従って大域剛性成分は要素寄与の和として

$$
A_{55}
=
\sum_{r=1}^4
\int_{K_r}
|\nabla\phi_5|^2\,dx
=
4.
$$

よって

$$
\boxed{
A_{55}=4
}.
$$

次に荷重を求めます。

各 $K_r$ 上で $\phi_5$ は、その要素の中心頂点に対応する重心座標です。

三角形上の重心座標の平均値は $1/3$ なので

$$
\int_{K_r}\phi_5\,dx
=
\frac{|K_r|}{3}
=
\frac{1/4}{3}
=
\frac1{12}.
$$

これを直接確認するなら、たとえば $K_1$ では

$$
\phi_5=2y.
$$

$x$ を固定した積分よりも基準三角形への変換を使う方が簡潔ですが、面積 $1/4$ と一次関数の頂点値 $(0,0,1)$ の平均から同じ

$$
\frac1{12}
$$

が得られます。

四要素を足して

$$
b_5
=
4\cdot\frac1{12}
=
\boxed{
\frac13
}.
$$

離散 Galerkin 方程式は未知係数が一つなので

$$
A_{55}c_5=b_5.
$$

従って

$$
4c_5=\frac13,
$$

$$
\boxed{
c_5=\frac1{12}
}.
$$

したがって有限要素解は

$$
\boxed{
u_h
=
\frac1{12}\phi_5
}.
$$

この一問の中で、

$$
\text{三角形分割}
\to
\text{内部自由度}
\to
\text{大域節点基底}
\to
\text{局所剛性}
\to
\text{組立て}
\to
\text{Galerkin 連立方程式}
$$

という FEM2 の全工程を一度通しました。
<!-- solution-end -->

---

## 16. まとめ

本章では、FEM1 で抽象的に置いた

$$
V_h\subset H_0^1(\Omega)
$$

を、一次三角形有限要素として具体的に構成しました。

中心となる構造は次です。

1. $\Omega$ を適合三角形分割 $\mathcal T_h$ へ分ける。
2. 各要素で $P_1(K)$ と頂点値自由度を使う。
3. 頂点値の一意可解性から重心座標を得る。
4. 基準三角形からアフィン写像で各要素へ移す。
5. 局所一次関数を頂点値共有により連続に貼り合わせる。
6. 連続性により内部辺項が相殺し、$S_h\subset H^1$ となる。
7. 境界頂点を 0 にして $V_h\subset H_0^1$ を得る。
8. 大域節点基底は局所的な台を持つ。
9. 局所剛性行列を大域頂点番号へ加算して組み立てる。
10. 局所台により大域剛性行列は疎になる。

FEM1 の

$$
\text{変分問題}
\to
\text{Galerkin 法}
$$

に、本章で

$$
\text{メッシュ}
\to
\text{有限要素空間}
\to
\text{局所基底}
\to
\text{組立て}
$$

が加わりました。

次の FEM3 では、この $V_h$ が滑らかな関数をどれだけよく近似できるかを、

$$
\boxed{
\text{節点補間}
+
\text{形状正則性}
+
\text{局所誤差評価}
}
$$

によって定量化します。
