# AFR14 球Hecke代数とSatakeパラメータ

前講で、単数群上自明な二つの指標から作る主系列には、$K$ に固定される一次元空間があることを学びました。個々の群元による移動はこの空間を保ちません。そこで移動先をまとめて足し、固定空間に戻る作用を作ります。最終目標は、その作用の二つの固有値から局所 $L$ 因子を復元することです。

## 1. 行列の二重剰余類

素数 $p$ を固定し、$F=\mathbb Q_p$、$O=\mathbb Z_p$、$G=GL_2(F)$、$K=GL_2(O)$ とします。付値を $v_p$ とし、$v_p(0)=+\infty$ と約束します。非零元 $a$ の絶対値は $|a|_p=p^{-v_p(a)}$ です。整数環の単元で行・列を操作しても格子の本質は変わりません。左右の $K$ による操作をまとめましょう。

<a id="def-afr14-double-coset"></a>

<!-- formal-statement-start -->
> **定義（局所二重剰余類）**
> $G=GL_2(\mathbb Q_p)$、$K=GL_2(\mathbb Z_p)$ とする。$g\in G$ に対する二重剰余類は
$$
KgK=\{k_1gk_2:k_1,k_2\in K\}
$$
> である。右に $K$ を掛けた集合 $gK$ を左剰余類と呼び、これらの集合を $G/K$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr14-double-coset -->
**定義の確認**

$t=\operatorname{diag}(p,1)$、$w=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とすると $w$ の行列式は $-1$ なので $w\in K$ です。

$$
wtw^{-1}=\operatorname{diag}(1,p)\in KtK.
$$

一方 $t^{-1}wt$ の右上成分は $1/p$ なので $K$ に属しません。従って $wtK\ne tK$ です。同じ二重剰余類の中に異なる左剰余類が存在します。
<!-- definition-example-end -->

二重剰余類の代表元を二つの整数だけで指定できます。

<a id="thm-afr14-cartan"></a>

<!-- formal-statement-start -->
> **定理（局所Cartan分解）**
> $G=GL_2(\mathbb Q_p)$、$K=GL_2(\mathbb Z_p)$ とする。任意の $g\in G$ は一意な整数の組 $a\ge b$ に対して
$$
g\in K\operatorname{diag}(p^a,p^b)K
$$
> を満たす。ここで $b$ は全行列成分の付値の最小値、$a+b=v_p(\det g)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

全成分に共通する最小の $p$ の冪を取り除きます。残った行列には単元があるので、その成分を軸に行と列を消去できます。行列式がもう一方の指数を決めます。

<!-- proof-start -->
### 証明

$b=\min_{i,j}v_p(g_{ij})$ と置き、$h=p^{-b}g$ とします。$h$ の成分はすべて $O$ にあり、少なくとも一つは単元です。行・列の交換で単元を左上に置き、その行を単元の逆数倍して左上を1にします。途中の行列を

$$
\begin{pmatrix}1&u\\v&w_0\end{pmatrix}
$$

と書くと、以下の左乗算と右乗算で対角化できます。

$$
\begin{pmatrix}1&0\\-v&1\end{pmatrix}
\begin{pmatrix}1&u\\v&w_0\end{pmatrix}
\begin{pmatrix}1&-u\\0&1\end{pmatrix}
=\operatorname{diag}(1,w_0-vu).
$$

両操作行列は $K$ に属します。$w_0-vu$ は非零の整数環の元なので $p^m$ と単元の積であり、$m\ge0$ です。単元を除いて対角を交換し、最初の $p^b$ を戻すと $a=b+m$ の代表が得られます。

一意性について、$k_1gk_2$ の成分は $g$ の成分の $O$ 係数線形結合なので、最小付値は減りません。逆行列 $k_i^{-1}\in K$ で戻すと逆向きの不等式が得られ、最小付値は等しいことが分かります。行列式の付値も $\det k_i$ が単元なので変わりません。よって $b$ と $a=v_p(\det g)-b$ は一意です。
<!-- proof-end -->

例えば $p=3$ のとき $\operatorname{diag}(9,3)$ の二指数は $(2,1)$ です。右から $K$ を掛けても左から $K$ を掛けてもこの組は不変です。

## 2. 一段だけ格子を縮める操作

$O^2$ を列ベクトルの加群とします。格子 $gO^2$ は $g$ の二列の整数環係数線形結合全体です。二つの行列の格子が等しいことと $gK=hK$ であることは同値です。実際 $h^{-1}g$ とその逆がともに $O^2$ を自分の中に写す条件が $h^{-1}g\in K$ だからです。

<a id="thm-afr14-p-cosets"></a>

<!-- formal-statement-start -->
> **定理（指数pの二重剰余類分解）**
> $K=GL_2(\mathbb Z_p)$、$t=\operatorname{diag}(p,1)$ とする。$KtK$ は次の $p+1$ 個の左剰余類の非交和である。
$$
KtK=\coprod_{u=0}^{p-1}r_uK\ \sqcup\ r_\infty K,
$$
$$
r_u=\begin{pmatrix}p&u\\0&1\end{pmatrix},
\qquad r_\infty=\operatorname{diag}(1,p).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$tO^2$ は $pO^2$ を含み、法 $p$ で一次元だけ残ります。法 $p$ の平面の直線は、第二座標が1の形と第二座標が0の形に分ければ $p+1$ 本です。

<!-- proof-start -->
### 証明

格子 $ktO^2$ は $k\in K$ によって $pO^2$ と $O^2$ の間に移され、法 $p$ で一次元部分空間になります。逆に、$\mathbb F_p^2$ の任意の直線は非零ベクトルを第二列とする可逆剰余行列を選べば $\mathbb F_p(0,1)$ から得られます。その剰余行列を $O$ に持ち上げた行列は行列式が法 $p$ で非零なので $K$ に属します。法 $p$ での直線の逆像はしたがって $ktO^2$ です。

第二座標が非零の直線は一意に $\mathbb F_p(u,1)$ と書けます。$r_uO^2$ の元は $(px+uy,y)$ であり、法 $p$ で $(uy,y)$ になります。逆にその直線の逆像に属する $(z,y)$ なら $z-uy\in pO$ なので $x=(z-uy)/p\in O$ と置けます。第二座標が零の直線の逆像は $r_\infty O^2=O\times pO$ です。

これらは異なる直線の逆像なので異なる格子です。格子と左剰余類の対応により、主張した非交和になります。
<!-- proof-end -->

$p=2$ なら直線は $(0,1),(1,1),(1,0)$ が張る三本です。三つの移動を足すことが次節の作用になります。

## 3. 球Hecke代数と固定空間への作用

$K$ の左乗算は $G/K$ の点を移します。$K$ の軌道ごとに一定で、有限個の点でのみ非零となる複素関数を用いると、移動を有限和として合成できます。二重剰余類はそれぞれ有限個の左剰余類からなります。実際、$KgK/K$ はコンパクトな $K$ の連続像であり、$K$ が開なので離散空間 $G/K$ のコンパクト集合、すなわち有限集合です。

<a id="def-afr14-hecke-algebra"></a>

<!-- formal-statement-start -->
> **定義（球Hecke代数）**
> $G=GL_2(\mathbb Q_p)$、$K=GL_2(\mathbb Z_p)$ とする。$\mathcal H$ は $G$ 上の複素関数 $h$ で、左右の $K$ で不変かつ有限個の二重剰余類に台を持つものの空間である。積（畳み込み）は
$$
(h_1*h_2)(g)=\sum_{xK\in G/K}h_1(x)h_2(x^{-1}g)
$$
> で定める。単位元は $K$ の指示関数 $1_K$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr14-hecke-algebra -->
**定義の確認**

$T=1_{KtK}$ は左右の $K$ で不変です。実際、$k_1(KtK)k_2=KtK$ であり、台は一つの二重剰余類です。[指数pの二重剰余類分解](#thm-afr14-p-cosets) より非零となる左剰余類は $p+1$ 個です。$1_K*T$ では $xK=K$ の一項しか残らず、値は $T(g)$ です。
<!-- definition-example-end -->

和は有限で、代表元を $xk$ に替えても二つの関数の不変性から値は変わりません。積の台は有限個の $xyK$ に含まれます。左から $k\in K$ を掛けた場合は $xK=kyK$ と置換でき、右不変性は第二因子から従います。右単位元の確認では $x^{-1}g\in K$ となるただ一つの $xK=gK$ が残ります。結合則は有限二重和の変数 $yK=xzK$ の置換で得られます。

$$
((h_1*h_2)*h_3)(g)
=\sum_{xK,zK}h_1(x)h_2(z)h_3(z^{-1}x^{-1}g)
=(h_1*(h_2*h_3))(g).
$$

これは $K$ の体積を1とする左Haar測度での畳み込みに対応します。本講では有限和の式を直接使用します。

<a id="prop-afr14-action"></a>

<!-- formal-statement-start -->
> **命題（球Hecke作用）**
> $(\pi,V)$ を $G=GL_2(\mathbb Q_p)$ の滑らかな複素表現とし、$K=GL_2(\mathbb Z_p)$ とする。球Hecke代数 $\mathcal H$ は固定空間 $V^K$ に
$$
\pi(h)v=\sum_{xK\in G/K}h(x)\pi(x)v
$$
> で単位元を保つ代数作用を与える。
<!-- formal-statement-end -->

### 証明の見取り図

左から $K$ の元を作用させると和の項を並べ替えるだけです。二度作用させた和は畳み込みの積と一致します。

<!-- proof-start -->
### 証明

$v\in V^K$ なので $\pi(xk)v=\pi(x)v$ です。$k_0\in K$ に対して

$$
\pi(k_0)\pi(h)v=\sum_{xK}h(x)\pi(k_0x)v.
$$

$yK=k_0xK$ と置くと $h(x)=h(k_0^{-1}y)=h(y)$ なので、これは $\pi(h)v$ です。よって作用後も固定空間に属します。$1_K$ の作用は $\pi(I_2)$ です。

二つの作用の合成は有限和

$$
\sum_{xK,yK}h_1(x)h_2(y)\pi(xy)v
$$

です。各 $x$ に対して $gK=xyK$ と置換すると

$$
\sum_{gK}\left(\sum_{xK}h_1(x)h_2(x^{-1}g)\right)\pi(g)v
=\pi(h_1*h_2)v.
$$

以上で代数作用の条件が成立します。
<!-- proof-end -->

自明表現なら $T$ の作用は $p+1$ 倍です。一般の表現では同じ $p+1$ 項にそれぞれ異なる変換係数が現れます。

## 4. 二つの生成元

$Z=1_{pI_2K}$ と置きます。$pI_2$ は中心に属するので

$$
(Z*h)(g)=h(p^{-1}g)=(h*Z)(g).
$$

$1_{p^{-1}I_2K}$ が逆元です。従って $Z$ は可逆で、全ての元と可換です。以下では積記号を省略して $T^n$ を畳み込みの冪として書きます。

<a id="thm-afr14-generators"></a>

<!-- formal-statement-start -->
> **定理（球Hecke代数の生成）**
> $G=GL_2(\mathbb Q_p)$、$K=GL_2(\mathbb Z_p)$ の球Hecke代数は
$$
T=1_{K\operatorname{diag}(p,1)K},
\qquad Z=1_{pI_2K},\qquad Z^{-1}
$$
> で生成され、可換である。
<!-- formal-statement-end -->

### 証明の見取り図

$T^n$ は行列式の付値が $n$ の整数行列だけを台に持ちます。その中で最小付値が0の二重剰余類が必ず出現します。他の類は中心の冪を外せば、より小さい指数の計算に帰着します。

<!-- proof-start -->
### 証明

$C_n=1_{K\operatorname{diag}(p^n,1)K}$（$n\ge0$）とします。[局所Cartan分解](#thm-afr14-cartan) により二重剰余類の指示関数はすべて $Z^b C_{a-b}$ と書けます。これらは台が互いに素で、$\mathcal H$ の基底です。

$T^n$ の値は非負整数です。畳み込みの定義を繰り返すと、非零の項は $n$ 個の $KtK$ の元の積を与えます。各因子は整数行列で、行列式の付値は1です。その積も整数行列で、行列式の付値は $n$ です。[局所Cartan分解](#thm-afr14-cartan) よりその指数 $(a,b)$ は

$$
a+b=n,\qquad a\ge b\ge0.
$$

従ってある非負整数 $c_{n,b}$ によって

$$
T^n=\sum_{b=0}^{\lfloor n/2\rfloor}c_{n,b}Z^b C_{n-2b}.
$$

$x=t$ を畳み込みの和で選び続けると $T^n(t^n)\ge1$ です。つまり $c_{n,0}\ne0$ です。

$C_0=1_K$、$C_1=T$ は生成されます。$C_j$ が $j<n$ で生成されたと仮定すると

$$
C_n=c_{n,0}^{-1}
\left(T^n-\sum_{b=1}^{\lfloor n/2\rfloor}c_{n,b}Z^b C_{n-2b}\right)
$$

も生成されます。帰納法で全 $C_n$ が生成され、中心の冪を掛ければ全基底を得ます。$Z$ とその逆は中心に属し、$T$ は自分自身と可換なので代数全体が可換です。
<!-- proof-end -->

この証明では係数を全部求める必要はありません。ただし二乗の係数は具体的に数えることができ、演習で確かめます。

## 5. 主系列の球ベクトルで固有値を計算する

[主系列の球固定空間](../AFR13/index.md#thm-afr13-spherical) より、単数上自明な指標 $\chi_1,\chi_2:F^\times\to\mathbb C^\times$ に対して、正規化主系列 $I(\chi_1,\chi_2)$ の $K$ 固定空間は一次元です。その基底 $f_0$ を $f_0(I_2)=1$ と規格化します。任意の $g=bk$ に対し、$b$ の対角成分を $a,d$ とすれば

$$
f_0(g)=|a/d|_p^{1/2}\chi_1(a)\chi_2(d).
$$

ここで $\alpha=\chi_1(p)$、$\beta=\chi_2(p)$ と置きます。

<a id="thm-afr14-eigenvalues"></a>

<!-- formal-statement-start -->
> **定理（主系列の球Hecke固有値）**
> $F=\mathbb Q_p$ とし、単数群上自明な指標 $\chi_1,\chi_2$ による正規化主系列を考える。$f_0$ を単位元で1となる球ベクトルとし、$\alpha=\chi_1(p)$、$\beta=\chi_2(p)$ とする。
$$
\pi(T)f_0=p^{1/2}(\alpha+\beta)f_0,
\qquad
\pi(Z)f_0=\alpha\beta f_0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一次元空間への作用はスカラー倍です。単位元での値を求めればスカラーが分かります。$T$ には上三角の $p$ 個と残り一個の移動があり、正規化因子がその個数の非対称性を相殺します。

<!-- proof-start -->
### 証明

[球Hecke作用](#prop-afr14-action) により $\pi(T)f_0$ は $K$ 固定です。[主系列の球固定空間](../AFR13/index.md#thm-afr13-spherical) により $f_0$ のスカラー倍で、その係数は単位元での値です。

[指数pの二重剰余類分解](#thm-afr14-p-cosets) の各 $r_u$ は上三角で、対角成分は $p,1$ です。[p進正規化主系列](../AFR13/index.md#def-afr13-principal) の左変換係数に代入すると

$$
f_0(r_u)=|p|_p^{1/2}\chi_1(p)\chi_2(1)
=p^{-1/2}\alpha.
$$

残りの代表は対角成分 $1,p$ なので

$$
f_0(r_\infty)=|1/p|_p^{1/2}\chi_1(1)\chi_2(p)
=p^{1/2}\beta.
$$

右移動の定義を用いると

$$
(\pi(T)f_0)(I_2)=\sum_{u=0}^{p-1}f_0(r_u)+f_0(r_\infty)
=p^{1/2}(\alpha+\beta).
$$

中心 $pI_2$ はただ一つの左剰余類を与え、対角成分の比が1なので

$$
(\pi(Z)f_0)(I_2)=f_0(pI_2)=\alpha\beta.
$$
<!-- proof-end -->

例えば $p=5$、$\alpha=2,\beta=3$ なら $T$ の固有値は $5\sqrt5$、$Z$ は6です。指標の順番を交換しても二つの固有値は変わりません。

## 6. 固有値の組からSatakeパラメータへ

前節の計算を代数全体に広げます。変数 $X,Y$ の整数冪の有限線形結合をLaurent多項式といいます。$X,Y$ の交換で変わらないものを対称とします。

<a id="thm-afr14-satake"></a>

<!-- formal-statement-start -->
> **定理（GL_2のSatake同型）**
> $G=GL_2(\mathbb Q_p)$、$K=GL_2(\mathbb Z_p)$ の球Hecke代数 $\mathcal H$ に対し、次の対応は複素代数同型を定める。
$$
\mathcal H\simeq\mathbb C[X^{\pm1},Y^{\pm1}]^{S_2},
$$
$$
T\longmapsto p^{1/2}(X+Y),\qquad
Z\longmapsto XY.
$$
> 右辺は二変数の交換群 $S_2$ で不変なLaurent多項式の代数である。
<!-- formal-statement-end -->

### 証明の見取り図

生成元の間に余分な関係がないことを、前節の主系列で任意の非零の二数を実現して確かめます。対称Laurent多項式は和と積、積の逆数だけから作れます。

<!-- proof-start -->
### 証明

[球Hecke代数の生成](#thm-afr14-generators) から、可換Laurent多項式代数 $\mathbb C[U,W,W^{-1}]$ から $\mathcal H$ への全射が $U\mapsto T,W\mapsto Z$ で定まります。核の元を $P(U,W)$ とします。

任意の $x,y\in\mathbb C^\times$ に対して、$\chi_1(p^mu)=x^m,\chi_2(p^mu)=y^m$（$u\in O^\times$）は局所定数な乗法指標です。[主系列の球Hecke固有値](#thm-afr14-eigenvalues) により核の元の作用は

$$
P(p^{1/2}(x+y),xy)=0.
$$

任意の $u_0\in\mathbb C,w_0\in\mathbb C^\times$ に対して二次方程式

$$
z^2-p^{-1/2}u_0z+w_0=0
$$

は二根 $x,y$ を持ち、積が非零なので両根とも非零です。従って $P(u_0,w_0)=0$ です。適当な非負整数 $m$ を選んで $W^m P$ を通常の多項式にすれば、各 $w_0\ne0$ で $U$ の多項式として恒等的に零なので全係数が零です。その各係数も $W$ の多項式で無限個の根を持つため恒等的に零です。よって $P=0$ となり全射は単射でもあります。

次に対称Laurent多項式 $Q$ に $(XY)^m$ を掛け、指数を非負にすれば対称多項式になります。対称多項式は単項式 $(XY)^i$ と、$i>j\ge0$ に対する

$$
X^iY^j+X^jY^i=(XY)^j(X^{i-j}+Y^{i-j})
$$

の線形結合です。$e_1=X+Y$、$e_2=XY$、$s_n=X^n+Y^n$ と置くと $s_0=2,s_1=e_1$ であり

$$
s_n=e_1s_{n-1}-e_2s_{n-2}\quad(n\ge2)
$$

が展開して確認できます。従って全ての $s_n$ は $e_1,e_2$ の多項式です。最初に掛けた $(XY)^m$ を割り戻せば $Q$ は $e_1,e_2,e_2^{-1}$ で生成されます。この三つに余分な関係がないことも先ほどの二次方程式による議論で従います。$U=p^{1/2}e_1,W=e_2$ と対応させれば同型を得ます。
<!-- proof-end -->

例えば $X^2+Y^2$ に対応する元は $p^{-1}T^2-2Z$ です。二根を個別に選ばなくても対称な量はHecke代数から復元できます。

固定空間が一次元の場合、単位元を保つ代数作用は複素数への代数準同型になります。より一般に、既約かつ許容的な不分岐表現でも固定空間は一次元です。その理由を確認します。

<a id="prop-afr14-spherical-line"></a>

<!-- formal-statement-start -->
> **命題（既約許容表現の球固定直線）**
> $G=GL_2(\mathbb Q_p)$ の既約な滑らかな許容的複素表現 $(\pi,V)$ と $K=GL_2(\mathbb Z_p)$ を考える。$V^K\ne0$ なら $\dim_{\mathbb C}V^K=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

群作用で非零の固定ベクトルから全表現を生成し、$K$ による有限平均で固定空間へ戻すと、球Hecke作用で固定空間全体を生成できます。可換作用素の共通固有ベクトルから生成できる空間は直線だけです。

<!-- proof-start -->
### 証明

滑らかさにより各 $v$ はある主合同部分群 $K_n$ に固定されます。$K_n$ は $K$ の有限指数正規部分群なので

$$
E(v)=\frac{1}{[K:K_n]}\sum_{kK_n\in K/K_n}\pi(k)v
$$

と置きます。より小さい $K_m$ を選んでも各項が同数ずつ反復されるだけなので値は変わりません。共通の十分小さい部分群を使えば $E$ の線形性が従います。左乗算で和が並べ替わるので $E(v)\in V^K$ であり、固定ベクトルには恒等作用です。

$0\ne w\in V^K$ とします。既約性より $\pi(g)w$（$g\in G$）の線形包は $V$ です。$H_g=K\cap gKg^{-1}$ は開部分群で、$K$ 内の指数は有限です。$\pi(g)w$ は $H_g$ に固定されるので、平均は $K/H_g$ の代表元 $k_i$ を用いて

$$
E(\pi(g)w)=\frac1{[K:H_g]}\sum_i\pi(k_i g)w
$$

と書けます。実際 $H_g$ はある $K_n$ を含み、各 $H_g$ の剰余類には同数の $K_n$ の剰余類が入ります。$k_i gK=k_j gK$ と $k_j^{-1}k_i\in H_g$ は同値なので、$k_i gK$ は $KgK$ の左剰余類をちょうど一度ずつ走ります。[球Hecke作用](#prop-afr14-action) により右辺は $[K:H_g]^{-1}\pi(1_{KgK})w$ です。

従って $V^K=E(V)$ は任意の非零 $w\in V^K$ から球Hecke作用で生成されます。許容性により $V^K$ は有限次元で、[球Hecke代数の生成](#thm-afr14-generators) により $\pi(T),\pi(Z)$ は可換です。$\pi(T)$ の非零の固有空間を選ぶと、それは $\pi(Z)$ で不変です。その空間内で $\pi(Z)$ の固有ベクトル $w$ を選べます（複素有限次元空間上の作用素は固有値を持ちます）。$\pi(Z)$ は可逆なので逆も $w$ の直線を保ちます。三生成元全てがこの直線を保つ以上、$w$ から生成される $V^K$ はこの直線です。
<!-- proof-end -->

既約性を外すと、例えば自明表現二つの直和の固定空間は二次元です。上の証明では任意の非零ベクトルから群作用で全表現を生成する段階が成立しません。

<a id="def-afr14-satake-parameter"></a>

<!-- formal-statement-start -->
> **定義（GL_2のSatakeパラメータ）**
> $\pi$ を $GL_2(\mathbb Q_p)$ の既約許容的な滑らかな不分岐複素表現とする。$K=GL_2(\mathbb Z_p)$ の固定直線における $T,Z$ の固有値を $\tau,\zeta$ とする。Satakeパラメータは次の多項式の根の順序を区別しない組（重複を許す）である。
$$
q(z)=z^2-p^{-1/2}\tau z+\zeta.
$$
> 同値な行列表現は $\operatorname{diag}(\alpha,\beta)$ の $GL_2(\mathbb C)$ における共役類である。ここで $\alpha,\beta$ は二根である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr14-satake-parameter -->
**定義の確認**

自明表現は一次元で既約、許容的かつ $K$ 固定です。[球Hecke作用](#prop-afr14-action) より $\tau=p+1$、$\zeta=1$ なので

$$
q(z)=z^2-(p^{1/2}+p^{-1/2})z+1
=(z-p^{1/2})(z-p^{-1/2}).
$$

二根は非零であり、対角行列は可逆です。順序を替えた対角行列は交換行列による共役で移り合います。
<!-- definition-example-end -->

$\zeta$ は可逆な作用素の固有値なので零ではありません。主系列が既約なら [主系列の球Hecke固有値](#thm-afr14-eigenvalues) により二根は $\chi_1(p),\chi_2(p)$ です。主系列が可約でも球固定直線に対する同じ多項式の計算自体は成立します。ここでは全既約局所表現の分類を必要としません。

## 7. 局所Euler因子を復元する

[Tateの不分岐局所ゼータ因子](../AFR10/index.md#thm-afr10-unramified-factor) は一つの指標値から $(1-\alpha p^{-s})^{-1}$ を与えました。二次のSatakeパラメータでは二つの指標値に対応する因子を掛けます。

<a id="def-afr14-local-l-factor"></a>

<!-- formal-statement-start -->
> **定義（GL_2の不分岐局所L因子）**
> $\pi$ を $GL_2(\mathbb Q_p)$ の既約許容的な滑らかな不分岐複素表現とし、Satakeパラメータを $\{\alpha,\beta\}$ とする。$s\in\mathbb C$ に対して局所因子は有理式の代入として
$$
L_p(s,\pi)=\frac1{(1-\alpha p^{-s})(1-\beta p^{-s})}
$$
> で定める。ただし $p^{-s}=\exp(-s\log p)$ とし、分母の零点は極として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr14-local-l-factor -->
**定義の確認**

自明表現の二根は前節で計算した $p^{1/2},p^{-1/2}$ です。従って

$$
L_p(s,1)=\frac1{(1-p^{1/2-s})(1-p^{-1/2-s})}.
$$

例えば実数 $s=2$ では両因子とも正で非零です。二根の順序を交換しても分母は変わりません。
<!-- definition-example-end -->

<a id="thm-afr14-euler-recovery"></a>

<!-- formal-statement-start -->
> **定理（Hecke固有値からのEuler因子復元）**
> $\pi$ を $GL_2(\mathbb Q_p)$ の既約許容的な滑らかな不分岐複素表現とし、$T,Z$ の球固定直線での固有値を $\tau,\zeta$ とする。
$$
L_p(s,\pi)=\frac1{1-p^{-1/2}\tau p^{-s}+\zeta p^{-2s}}.
$$
> $A=p^{-1/2}\tau$ と置く。$|X|<\min(|\alpha|^{-1},|\beta|^{-1})$ では
$$
\frac1{1-AX+\zeta X^2}=\sum_{n=0}^{\infty}c_n X^n,
$$
$$
c_0=1,\quad c_1=A,\quad c_n=Ac_{n-1}-\zeta c_{n-2}\ (n\ge2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

二次方程式の根と係数の関係を分母に代入します。二つの幾何級数を掛ければ係数が得られ、分母を掛け直せば漸化式になります。

<!-- proof-start -->
### 証明

[GL_2のSatakeパラメータ](#def-afr14-satake-parameter) の定義より $\alpha+\beta=A$、$\alpha\beta=\zeta$ です。分母を展開すると

$$
(1-\alpha X)(1-\beta X)=1-AX+\zeta X^2.
$$

$X=p^{-s}$ を代入して第一の式を得ます。

指定した範囲では $|\alpha X|,|\beta X|<1$ なので、両幾何級数は絶対収束します。積を総次数ごとにまとめられ、

$$
c_n=\sum_{j=0}^n\alpha^{n-j}\beta^j.
$$

分母を掛けて得られる定数項は $c_0$、一次係数は $c_1-Ac_0$、$n\ge2$ の係数は $c_n-Ac_{n-1}+\zeta c_{n-2}$ です。積が1なので定数項は1、他は0です。よって漸化式が従います。
<!-- proof-end -->

この計算は二根が一致していても成立します。例えば $\alpha=\beta=2$ なら $A=4,\zeta=4$ で $c_2=16-4=12$ です。和の式からも $4+4+4=12$ が得られます。根の差で割る公式を使う必要はありません。

ここでは各素点で局所因子を作るまでを扱いました。分岐の場合は $K$ 固定空間がなく、同じ二つの固有値から出発できません。次講ではより小さい部分群で固定されるベクトルを探します。

## 8. 演習と詳細解答

<a id="ex-afr14-a1"></a>

### A1. 二指数の復元

$p=3$ として $g=\begin{pmatrix}3&6\\0&27\end{pmatrix}$ の局所Cartan分解の二指数を求めよ。

- Level: A
- ID: AFR14-A1

<!-- solution-start -->
**詳細解答**

非零成分の付値は $1,1,3$ です。行列式は $3\cdot27=3^4$ です。[局所Cartan分解](#thm-afr14-cartan) により

$$
b=1,\qquad a=4-1=3.
$$

右から $\begin{pmatrix}1&-2\\0&1\end{pmatrix}\in K$ を掛けると $\operatorname{diag}(3,27)$ となり、二行と二列の交換で $\operatorname{diag}(27,3)$ になります。
<!-- solution-end -->

<a id="ex-afr14-a2"></a>

### A2. 剰余類を区別する

$p=3$ のとき $r_0,r_1,r_2,r_\infty$ の格子を法3の直線で区別せよ。

- Level: A
- ID: AFR14-A2

<!-- solution-start -->
**詳細解答**

[指数pの二重剰余類分解](#thm-afr14-p-cosets) の行列を法3で作用させると、$r_u$ の第一列は零、第二列は $(u,1)$ になります。$r_\infty$ の第一列は $(1,0)$、第二列は零です。直線は

$$
\mathbb F_3(0,1),\quad \mathbb F_3(1,1),\quad
\mathbb F_3(2,1),\quad \mathbb F_3(1,0).
$$

最初の三本は第二成分を1にする規格化で異なり、最後は第二成分が0です。従って四つの左剰余類はすべて異なります。
<!-- solution-end -->

<a id="ex-afr14-a3"></a>

### A3. 主系列の固有値

$p=7$、単数上自明な指標の値を $\alpha=1,\beta=-1$ とする。正規化主系列の球固定空間で $T,Z$ の固有値を求めよ。

- Level: A
- ID: AFR14-A3

<!-- solution-start -->
**詳細解答**

[主系列の球Hecke固有値](#thm-afr14-eigenvalues) により七つの $r_u$ の各寄与は $7^{-1/2}$、残りは $-\sqrt7$ です。

$$
\tau=7\cdot7^{-1/2}-\sqrt7=0,
\qquad \zeta=1\cdot(-1)=-1.
$$

従って二次多項式は $z^2-1$ です。$T$ の固有値が0でも $Z$ の固有値は非零です。
<!-- solution-end -->

<a id="ex-afr14-a4"></a>

### A4. 固有値から二根を求める

$p=2$ で $\tau=5\sqrt2,\zeta=6$ とする。二根と局所因子の有理式を求めよ。

- Level: A
- ID: AFR14-A4

<!-- solution-start -->
**詳細解答**

[GL_2のSatakeパラメータ](#def-afr14-satake-parameter) の多項式は

$$
z^2-5z+6=(z-2)(z-3).
$$

従って二根は2と3です。[Hecke固有値からのEuler因子復元](#thm-afr14-euler-recovery) により

$$
L_p(s)=\frac1{1-5\cdot2^{-s}+6\cdot2^{-2s}}.
$$

これは二根の順番には依存しません。
<!-- solution-end -->

<a id="ex-afr14-b1"></a>

### B1. 二段の移動

$C_2=1_{K\operatorname{diag}(p^2,1)K}$ とする。$T^2=C_2+(p+1)Z$ を証明せよ。

- Level: B
- ID: AFR14-B1

<!-- solution-start -->
**詳細解答**

[球Hecke代数の生成](#thm-afr14-generators) の証明で $n=2$ としたとき、台の候補は指数 $(2,0),(1,1)$ だけです。それぞれの代表で畳み込みを数えます。

$T^2(g)$ は $xK\subset KtK$ で $x^{-1}g\in KtK$ となるものの数です。格子で言い換えると

$$
gO^2\subset xO^2\subset O^2
$$

で両段の指数が $p$ となる中間格子の数です。この同値性は [指数pの二重剰余類分解](#thm-afr14-p-cosets) を最初の段と $x^{-1}gO^2$ に適用すれば従います。

$g=\operatorname{diag}(p^2,1)$ の格子は法 $p$ で第二座標の直線になります。中間格子はその直線の逆像 $pO\times O$ しかありません。実際二段の指数は各々 $p$ です。よって係数は1です。

$g=pI_2$ なら $gO^2=pO^2$ で、法 $p$ の任意の直線の逆像が中間格子です。各直線の逆像と $pO^2$ の指数は $p$ です。よって係数は $p+1$ です。

$$
T^2=C_2+(p+1)Z.
$$
<!-- solution-end -->

<a id="ex-afr14-b2"></a>

### B2. 対称多項式をHecke元に戻す

$X^3+Y^3$ と $X^{-1}+Y^{-1}$ に対応する球Hecke代数の元を求めよ。

- Level: B
- ID: AFR14-B2

<!-- solution-start -->
**詳細解答**

和を $e_1$、積を $e_2$ とすると

$$
e_1^3=X^3+3X^2Y+3XY^2+Y^3
=X^3+Y^3+3e_1e_2.
$$

従って $X^3+Y^3=e_1^3-3e_1e_2$ です。また

$$
X^{-1}+Y^{-1}=\frac{X+Y}{XY}=e_1e_2^{-1}.
$$

[GL_2のSatake同型](#thm-afr14-satake) で $e_1\leftrightarrow p^{-1/2}T$、$e_2\leftrightarrow Z$ と代入すると、それぞれ

$$
p^{-3/2}T^3-3p^{-1/2}TZ,
\qquad p^{-1/2}TZ^{-1}
$$

です。
<!-- solution-end -->

<a id="ex-afr14-b3"></a>

### B3. 重根の係数

$p=3$、$\tau=4\sqrt3,\zeta=4$ とする。二根、$c_0$ から $c_3$、級数の絶対収束域を求めよ。

- Level: B
- ID: AFR14-B3

<!-- solution-start -->
**詳細解答**

二次多項式は $z^2-4z+4=(z-2)^2$ です。[Hecke固有値からのEuler因子復元](#thm-afr14-euler-recovery) の漸化式に $A=4,\zeta=4$ を代入します。

$$
c_0=1,\quad c_1=4,\quad
c_2=4\cdot4-4=12,
$$

$$
c_3=4\cdot12-4\cdot4=32.
$$

一般の係数和では $n+1$ 個の項がすべて $2^n$ なので $c_n=(n+1)2^n$ です。従って $X=3^{-s}$ での絶対収束は $2|X|<1$ のとき成立します。境界以上では項の絶対値 $(n+1)(2|X|)^n$ が0へ収束しません。従って厳密な収束域は

$$
\operatorname{Re}s>\frac{\log 2}{\log 3}.
$$
<!-- solution-end -->

<a id="ex-afr14-c1"></a>

### C1. 二段のHecke作用とEuler係数を接続する

$p=5$ とする。単数上自明な二指標の値が $\alpha=2,\beta=3$ である正規化主系列を考える。球固定直線上で $T,Z,C_2$ の固有値を計算し、二根から作るEuler因子の第二係数 $c_2$ と $C_2$ の固有値の関係を求めよ。

- Level: C
- ID: AFR14-C1

<!-- solution-start -->
**詳細解答**

[主系列の球Hecke固有値](#thm-afr14-eigenvalues) より

$$
\tau=\sqrt5(2+3)=5\sqrt5,\qquad \zeta=6.
$$

[二段の移動の計算](#ex-afr14-b1) より $C_2=T^2-6Z$ です。固定直線で積はスカラーの積になるので、$C_2$ の固有値を $\gamma$ とすると

$$
\gamma=(5\sqrt5)^2-6\cdot6=125-36=89.
$$

二根から得られる幾何級数の積の第二係数は

$$
c_2=\alpha^2+\alpha\beta+\beta^2=4+6+9=19.
$$

一般の $p$ では $\tau^2=p(\alpha+\beta)^2$ なので

$$
\gamma=p(\alpha+\beta)^2-(p+1)\alpha\beta
=p c_2-\zeta.
$$

従って $c_2=(\gamma+\zeta)/p=(89+6)/5=19$ と一致します。二重剰余類の指示関数の固有値はEuler級数の係数そのものではなく、正規化と中心項の補正が必要です。
<!-- solution-end -->

<a id="ex-afr14-c2"></a>

### C2. 固定空間が一次元でない場合

$G=GL_2(\mathbb Q_p)$ の自明表現と、一次元表現 $\pi_2(g)=|\det g|_p$ の直和を考える。固定空間の次元、$T,Z$ の固有値を各直線で求め、全空間に一つのSatakeパラメータを割り当てられない理由を説明せよ。

- Level: C
- ID: AFR14-C2

<!-- solution-start -->
**詳細解答**

両表現は $K$ で自明なので固定空間は二次元です。有限次元で全ベクトルが $K$ 固定だから滑らかかつ許容的ですが、二つの直線が不変なので既約ではありません。

[指数pの二重剰余類分解](#thm-afr14-p-cosets) の各代表の行列式の絶対値は $p^{-1}$ です。中心代表 $pI_2$ の行列式の絶対値は $p^{-2}$ です。[球Hecke作用](#prop-afr14-action) を適用すると自明直線の固有値は $(p+1,1)$、第二直線の固有値は

$$
\big((p+1)p^{-1},p^{-2}\big)
$$

です。$p\ge2$ なので二組は異なり、$T$ は全固定空間上でスカラー倍ではありません。従って [GL_2のSatakeパラメータ](#def-afr14-satake-parameter) の定義を直和全体へそのまま適用できません。各直線ではそれぞれ二根を復元できます。
<!-- solution-end -->
