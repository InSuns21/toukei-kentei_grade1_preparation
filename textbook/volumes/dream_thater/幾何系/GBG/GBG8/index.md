# GBG8 局所ゲージポテンシャルはどう変換するか

[GBG7 の主束接続形式](../GBG7/index.md#def-gbg7-connection-form)は主束 $P$ 全体に定義される。しかし、物理の式で見る $A=\sum_\mu A_\mu\,dx^\mu$ は基底多様体上の1形式である。ここで $(x^\mu)$ は局所座標、$A_\mu$ はその座標方向の Lie 環値係数で、$\mu$ について和を取っている。非自明な主束では「一つの $A$ が全空間にある」と最初から考えることはできない。それでも、各パッチで基準となる [局所section](../GBG3/index.md#def-gbg3-local-section) を選べば、接続形式を基底へ引き戻して計算できる。

問題は、別のsectionを選んだときに同じ接続をどう表すかである。普通のベクトルの座標変換と違い、ポテンシャルには群値関数の**微分**が加わる。本講ではその出所を接ベクトルの分解から導き、重なりの整合条件だけから大域的な接続を復元する。最後に「局所座標の変更」と「ゲージ自己同型による接続そのものの変換」を区別する。

$M$ は Hausdorff・第二可算、境界のない有限次元滑らかな多様体とする。$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束である。

Lie 環を $\mathfrak g=T_eG$、右作用を $R_k(p)=pk$ と記す。開被覆上のsectionは $s_j=s_i g_{ij}$、重なりは $U_{ij}=U_i\cap U_j$、遷移関数は $g_{ij}g_{jk}=g_{ik}$ とする。

[GBG6 の基本ベクトル場](../GBG6/index.md#def-gbg6-fundamental-field)と [GBG7 の主束接続形式](../GBG7/index.md#def-gbg7-connection-form) は、それぞれ次の関係を満たす。

$$
\xi_P(p)=\left.\frac{d}{dt}\right|_0p\exp(t\xi),
\qquad
\omega(\xi_P)=\xi,
\qquad
R_k^*\omega=\operatorname{Ad}_{k^{-1}}\omega.
$$

群の逆元の向きは、この**右主作用**に従う。

<!-- definition-example-audit: strict -->

---

## 1. 大域の接続から局所ポテンシャルを読む

接続形式 $\omega$ は $TP$ 上にあり、基底の点 $x$ に直接入力することはできない。一方、section $s:U\to P$ の微分は $v\in T_xM$ を $(ds)_xv\in T_{s(x)}P$ へ移す。そこで、$\omega$ がこのベクトルをどう測るかを基底上に記録する。

<a id="def-gbg8-local-potential"></a>

<!-- formal-statement-start -->
> **定義（局所ゲージポテンシャル）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ の[主束接続形式](../GBG7/index.md#def-gbg7-connection-form) $\omega$ と、開集合 $U\subset M$ 上の滑らかな局所section $s:U\to P$ に対し、[Lie 環値1形式](../../../代数系/LIE/LIE4/index.md#def-lie4-lie-algebra-valued-one-form)

$$
A_s:=s^*\omega\in\Omega^1(U;\mathfrak g),\qquad
(A_s)_x(v)=\omega_{s(x)}((ds)_xv)
$$

> を $s$ に関する **局所ゲージポテンシャル**（局所接続形式）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg8-local-potential -->
**定義の確認**。$P=\mathbb R^2\times GL(2,\mathbb R)$ とし、座標を $(x,y)$、section を $s(x,y)=((x,y),I)$ とする。$GL(2,\mathbb R)$ の Lie 環は実 $2\times2$ 行列全体 $\mathfrak{gl}_2(\mathbb R)=M_2(\mathbb R)$ である。$(1,2)$ 成分だけが $1$ の行列 $E_{12}$ を $B$ と置き、基底多様体上の1形式 $b=B\,dy$ を選ぶ。座標接ベクトルと $b$ の対応は

$$
B=E_{12}=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
v=v_x\partial_x+v_y\partial_y,\qquad
b_{(x,y)}(v)=v_yB.
$$

これは $v$ に線形で係数が定数の、滑らかな $\mathfrak{gl}_2(\mathbb R)$ 値1形式である。[GBG7 の積主束接続形式](../GBG7/index.md#prop-gbg7-product-form)にこの $b$ を代入すると、点 $((x,y),K)$ の接ベクトル $(v,W)$ に対して

$$
\omega_{((x,y),K)}(v,W)=K^{-1}b(v)K+K^{-1}W
$$

となる。これは既習の命題により滑らかで、再生条件と右同変条件の双方を満たす。$ds(v)=(v,0)$ だから

$$
(s^*\omega)_{(x,y)}(v)
=\omega_{((x,y),I)}(v,0)
=I^{-1}b(v)I+I^{-1}0=b(v).
$$

すなわち $A_s=B\,dy$ である。$B$ が定数行列なので、これは各接空間から $\mathfrak{gl}_2$ への線形写像を滑らかに与える。元の $\omega$ が主束上の接続であることと、$A_s$ が基底上の1形式であることを、別々に確かめた。
<!-- definition-example-end -->

この例では積束を使ったが、局所sectionさえあれば非自明な主束でも $A_s$ を定められる。違うsectionで書いた $A$ を比較するのが次の課題である。

## 2. section を取り替えたときの非斉次項

同じ開集合 $U$ 上の二つのsectionには、[局所section変更関数](../GBG3/index.md#def-gbg3-section-change) $g:U\to G$ が一意に存在し、$s'=sg$ と書ける。$g$ が $x$ とともに動くため、$(ds')_xv$ は $(dR_{g(x)})_{s(x)}(ds)_xv$ だけではない。**基準点を同じファイバー内で動かす方向**が追加される。

ここで $g^{-1}dg$ は群値写像 $g$ に[左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)を引き戻した $\mathfrak g$ 値1形式である。任意の $x\in U$、$v\in T_xU$ に対して

$$
(g^{-1}dg)_x(v):=(d\ell_{g(x)^{-1}})_{g(x)}(dg)_xv.
$$

行列群では $g(x)^{-1}(dg)_xv$ という通常の行列積で計算する。この微分の値は $T_eG=\mathfrak g$ にあるので、$A$ と加えることができる。

<a id="thm-gbg8-local-transform"></a>

<!-- formal-statement-start -->
> **定理（局所ゲージポテンシャルの変換則）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\omega$ を主束接続形式、$s,s':U\to P$ を同じ開集合上の滑らかな局所section とする。滑らかな $g:U\to G$ が $s'=sg$ を満たすとき、$A=s^*\omega$ と $A'=(s')^*\omega$ は

$$
\boxed{\displaystyle
A'=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg
}
$$

> を満たす。特に $s_j=s_i g_{ij}$ と書く重なり $U_{ij}$ では

$$
A_j=\operatorname{Ad}_{g_{ij}^{-1}}A_i+g_{ij}^{-1}dg_{ij}.
$$

> $G$ が行列 Lie 群なら随伴作用の項は $g^{-1}Ag$ である。
<!-- formal-statement-end -->

### 証明の見取り図

曲線に沿った $s(x(t))g(x(t))$ の速度を、$g(x)$ を固定して $s$ だけ動かした部分と、$s(x)$ を固定して $g$ だけ動かした部分に分ける。前者へ接続形式の右同変条件、後者へ基本ベクトル場の再生条件を適用する。

<!-- proof-start -->
### 証明

$x\in U$ と $v\in T_xU$ を任意に固定し、$x(0)=x$、$\dot x(0)=v$ を満たす滑らかな曲線 $x(t)$ を取る。$p=s(x)$、$k=g(x)$ と置き、

$$
q(t)=s(x(t))g(x(t))
$$

を微分する。積の微分を、二つの曲線の速度の和に分けると

$$
\dot q(0)
=(dR_k)_p(ds)_xv+
\left.\frac d{dt}\right|_0 p\,g(x(t)).
$$

第二項の Lie 環ラベルを求める。$c(t)=k^{-1}g(x(t))$ と置けば $c(0)=e$ であり、

$$
p\,g(x(t))=pk\,c(t),\qquad
\dot c(0)=(d\ell_{k^{-1}})_k(dg)_xv
=(g^{-1}dg)_x(v).
$$

$T_eG=\mathfrak g$ の元 $\xi=\dot c(0)$ は、指数曲線 $\exp(t\xi)$ と時刻0で同じ速度を持つ。ゆえに[基本ベクトル場の定義](../GBG6/index.md#def-gbg6-fundamental-field)から第二項は $\xi_P(pk)$ である。したがって

$$
(ds')_xv
=(dR_k)_p(ds)_xv+\bigl((g^{-1}dg)_x(v)\bigr)_P(pk).
$$

ここへ $\omega_{pk}$ を適用する。[接続形式の右同変条件と再生条件](../GBG7/index.md#def-gbg7-connection-form)をそれぞれの項に適用すると

$$
\begin{aligned}
(A')_x(v)
&=\omega_{pk}\bigl((ds')_xv\bigr)\\
&=\omega_{pk}\bigl((dR_k)_p(ds)_xv\bigr)
 +\omega_{pk}(\xi_P(pk))\\
&=\operatorname{Ad}_{k^{-1}}
   \bigl(\omega_p((ds)_xv)\bigr)+\xi\\
&=\operatorname{Ad}_{g(x)^{-1}}A_x(v)+(g^{-1}dg)_x(v).
\end{aligned}
$$

$x,v$ は任意なので1形式としての等式が成立する。$U=U_{ij}$、$s=s_i$、$s'=s_j$、$g=g_{ij}$ と置けば最後の式も従う。
<!-- proof-end -->

この証明には曲率も共変微分も使っていない。非斉次項は、**基準点 $s(x)$ 自身がファイバー方向に動く速度**を再生条件で読み取ったものである。

### 可換例：$U(1)$ なら差が微分になる

$G=U(1)$ の Lie 環は $i\mathbb R$。可換なので随伴作用は恒等である。$g=e^{i\phi}$ と**局所的に実数値の滑らかな** $\phi$ を選べる場所では

$$
dg=i e^{i\phi}d\phi,\qquad
g^{-1}dg=e^{-i\phi}i e^{i\phi}d\phi=i\,d\phi,
$$

従って $A'=A+i\,d\phi$。たとえば $U=\mathbb R^2$、$A=i x\,dy$、$g(x,y)=e^{ixy}$ なら

$$
d(xy)=y\,dx+x\,dy,\qquad
A'=iy\,dx+2ix\,dy.
$$

$U(1)$ 値関数に大域的な一価の $\phi$ が存在するとは限らない。その場合にも $g^{-1}dg$ 自体は定義される。差の式を全基底で書くには、そこに大域sectionがあるかを別に確認しなければならない。

### 非可換例：$SU(2)$ で行列を掛ける

$SU(2)$ は $K^\dagger K=I$、$\det K=1$ を満たす $2\times2$ 複素行列の群、Lie 環 $\mathfrak{su}(2)$ は反 Hermite で跡が零の行列全体である。$U=\mathbb R^2$ に

$$
T_1=\begin{pmatrix}0&i\\i&0\end{pmatrix},
\qquad
T_3=\begin{pmatrix}i&0\\0&-i\end{pmatrix},
\qquad A=T_1\,dy
$$

を選ぶ。両行列は $T_a^\dagger=-T_a$ かつ $\operatorname{tr}T_a=0$ を満たすから Lie 環値である。$g(x,y)=\operatorname{diag}(e^{ix},e^{-ix})$ はユニタリ、行列式が1で、逆行列は $\operatorname{diag}(e^{-ix},e^{ix})$。よって $SU(2)$ 値の滑らかな関数である。

一方、$dg=\operatorname{diag}(ie^{ix},-ie^{-ix})\,dx$ なので

$$
g^{-1}dg=\begin{pmatrix}i&0\\0&-i\end{pmatrix}dx=T_3\,dx.
$$

随伴項は行列積を左から順に取って

$$
g^{-1}T_1g
=\begin{pmatrix}e^{-ix}&0\\0&e^{ix}\end{pmatrix}
\begin{pmatrix}0&i\\i&0\end{pmatrix}
\begin{pmatrix}e^{ix}&0\\0&e^{-ix}\end{pmatrix}
=\begin{pmatrix}0&i e^{-2ix}\\i e^{2ix}&0\end{pmatrix}.
$$

従って

$$
\boxed{\displaystyle
A'=
\begin{pmatrix}0&i e^{-2ix}\\i e^{2ix}&0\end{pmatrix}dy
+\begin{pmatrix}i&0\\0&-i\end{pmatrix}dx
}
$$

となる。$x=\pi/4$ では $g^{-1}T_1g=\left(\begin{smallmatrix}0&1\\-1&0\end{smallmatrix}\right)$ で、元の $T_1$ と異なる。非可換群では $A'=A+g^{-1}dg$ と簡略化してはいけない。上式の二係数行列も、反 Hermite・跡零なので確かに $\mathfrak{su}(2)$ 値である。

## 3. 三つのパッチでも矛盾しない理由

section を $s\mapsto sg\mapsto sgh$ と二度取り替えた結果は、最初から $s\mapsto s(gh)$ と取り替えた結果と同じでなければならない。これを数式で確かめれば、[GBG1 の遷移関数の三重重なり条件](../GBG1/index.md#def-gbg1-cocycle)に対して接続の局所表示が整合する理由も分かる。

<a id="prop-gbg8-transform-composition"></a>

<!-- formal-statement-start -->
> **命題（局所変換則の合成）**  
> $U$ 上の滑らかな $\mathfrak g$ 値1形式 $A$ と、滑らかな $G$ 値関数 $g,h:U\to G$ に対して

$$
T_g(A):=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg
$$

> と置くと

$$
T_h(T_g(A))=T_{gh}(A)
$$

> が成立する。したがって $g_{ij}g_{jk}=g_{ik}$ を満たす遷移関数のもと、$A_j=T_{g_{ij}}(A_i)$ なら三重重なりで $A_k=T_{g_{ik}}(A_i)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

非斉次項の積の微分公式が核心である。$d(gh)=dg\,h+g\,dh$ を左から $(gh)^{-1}=h^{-1}g^{-1}$ で掛け、二回の変換に現れる二つの項と照合する。

<!-- proof-start -->
### 証明

まず[随伴表現の積の規則](../../../代数系/LIE/LIE2/index.md#thm-lie2-adjoint-homomorphism)から

$$
\operatorname{Ad}_{h^{-1}}\circ\operatorname{Ad}_{g^{-1}}
=\operatorname{Ad}_{h^{-1}g^{-1}}
=\operatorname{Ad}_{(gh)^{-1}}.
$$

また $g,h$ が行列群なら積の微分則、一般の Lie 群なら左右乗法の微分の連鎖律から

$$
\begin{aligned}
(gh)^{-1}d(gh)
&=h^{-1}g^{-1}(dg\,h+g\,dh)\\
&=h^{-1}(g^{-1}dg)h+h^{-1}dh\\
&=\operatorname{Ad}_{h^{-1}}(g^{-1}dg)+h^{-1}dh.
\end{aligned}
$$

これは一般の Lie 群では $g^{-1}dg$ を左 Maurer–Cartan 形式の引き戻しと解釈した等式である。この二式を使って

$$
\begin{aligned}
T_h(T_g(A))
&=\operatorname{Ad}_{h^{-1}}
 (\operatorname{Ad}_{g^{-1}}A+g^{-1}dg)+h^{-1}dh\\
&=\operatorname{Ad}_{(gh)^{-1}}A
 +\operatorname{Ad}_{h^{-1}}(g^{-1}dg)+h^{-1}dh\\
&=\operatorname{Ad}_{(gh)^{-1}}A+(gh)^{-1}d(gh)\\
&=T_{gh}(A).
\end{aligned}
$$

三重重なりで $A_k=T_{g_{jk}}(A_j)$、$A_j=T_{g_{ij}}(A_i)$ を代入し、$g_{ij}g_{jk}=g_{ik}$ を使えば主張が従う。
<!-- proof-end -->

$g_{ij}^{-1}A_i g_{ij}$ だけを変換則とすると、群積の整合は形式上保てても、次節の**基本ベクトル場の再生と局所自明化の微分**を同時に表現できない。非斉次項は飾りではない。

## 4. 局所データを貼って大域接続を復元する

ここまでは大域接続 $\omega$ から局所形式を取り出した。逆に、各パッチに $A_i$ を書き、重なりで変換則を課すだけで $\omega$ を構成できるかを確かめる。

[局所sectionと同変自明化の対応](../GBG3/index.md#thm-gbg3-section-trivialization)から、$p\in\pi^{-1}(U_i)$ は一意に $p=s_i(x)k$ と表せる。この座標で $\omega$ の基底方向の値は $A_i$、群方向の値は[左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form) $\theta_k$ であるはずだ。[GBG7 の積主束の式](../GBG7/index.md#prop-gbg7-product-form)が、その両方を合わせる候補を与える。

<a id="thm-gbg8-local-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（局所ポテンシャルからの大域接続の再構成）**  
> $P\to M$ を滑らかな右主 $G$ 束とし、開被覆 $(U_i)$ 上の滑らかな局所section $s_i$ と $s_j=s_i g_{ij}$ を固定する。各 $U_i$ に滑らかな $\mathfrak g$ 値1形式 $A_i$ を与える。これらから $s_i^*\omega=A_i$ を満たす滑らかな主束接続形式 $\omega$ が **一意に** 存在するための必要十分条件は、すべての $U_{ij}$ 上で

$$
A_j=\operatorname{Ad}_{g_{ij}^{-1}}A_i+g_{ij}^{-1}dg_{ij}
$$

> が成立することである。存在するとき、座標 $p=s_i(x)k$ における形式は

$$
\omega_i=\operatorname{Ad}_{k^{-1}}A_i+\theta_k
$$

> で与えられる。ここで $\theta$ は $G$ の左 Maurer–Cartan 形式であり、上式は局所積 $U_i\times G$ の接ベクトルへ作用する1形式の等式である。
<!-- formal-statement-end -->

### 証明の見取り図

各積表示で[GBG7 の積主束接続形式](../GBG7/index.md#prop-gbg7-product-form)を使う。重なりでは $k_i=g_{ij}k_j$ のため、Maurer–Cartan項に $g_{ij}^{-1}dg_{ij}$ が現れる。変換則を用いるとそれがちょうど $A_j$ の一部になり、両パッチの形式が一致する。

<!-- proof-start -->
### 証明

**必要性**。$\omega$ が存在すれば、[局所変換定理](#thm-gbg8-local-transform)を $s_j=s_i g_{ij}$ へ適用して重なり条件を得る。

**十分性**。各 $U_i$ で $p=s_i(x)k_i$ と表し、積座標の接ベクトルを $(v,W_i)\in T_xU_i\oplus T_{k_i}G$ とする。[GBG7 の積主束接続形式の具体式](../GBG7/index.md#prop-gbg7-product-form)から

$$
(\omega_i)_{(x,k_i)}(v,W_i)
=\operatorname{Ad}_{k_i^{-1}}(A_i)_x(v)+\theta_{k_i}(W_i)
$$

は滑らかで、局所的な再生条件（C1）と右同変条件（C2）を満たす。

二つの積座標の重なりで同じ $p$ を表すと、$s_i(x)k_i=s_j(x)k_j=s_i(x)g_{ij}(x)k_j$ だから、自由性により $k_i=g_{ij}k_j$。この座標変換を曲線に沿って微分すると

$$
dk_i=(dg_{ij})\,k_j+g_{ij}\,dk_j.
$$

左 Maurer–Cartan 形式へ代入する。行列群の計算を先に書けば

$$
\begin{aligned}
k_i^{-1}dk_i
&=(g_{ij}k_j)^{-1}d(g_{ij}k_j)\\
&=k_j^{-1}g_{ij}^{-1}\bigl((dg_{ij})k_j+g_{ij}dk_j\bigr)\\
&=\operatorname{Ad}_{k_j^{-1}}(g_{ij}^{-1}dg_{ij})
 +k_j^{-1}dk_j.
\end{aligned}
$$

一般の Lie 群についても[前節の積の微分公式](#prop-gbg8-transform-composition)が同じ式を与える。また随伴表現の合成から

$$
\operatorname{Ad}_{k_i^{-1}}A_i
=\operatorname{Ad}_{k_j^{-1}}\bigl(
   \operatorname{Ad}_{g_{ij}^{-1}}A_i\bigr).
$$

二式を足すと、仮定した重なり条件を用いて

$$
\begin{aligned}
\omega_i
&=\operatorname{Ad}_{k_j^{-1}}
  \bigl(\operatorname{Ad}_{g_{ij}^{-1}}A_i+g_{ij}^{-1}dg_{ij}\bigr)
  +\theta_{k_j}\\
&=\operatorname{Ad}_{k_j^{-1}}A_j+\theta_{k_j}
=\omega_j.
\end{aligned}
$$

したがって局所形式は $P$ 上で矛盾なく貼り合わさり、一つの滑らかな $\mathfrak g$ 値1形式 $\omega$ になる。（C1）と（C2）は各ファイバーの局所積表示で成り立つため、大域の $\omega$ にも成立する。[主束接続形式の定義](../GBG7/index.md#def-gbg7-connection-form)より $\omega$ は主束接続である。単位元を代入すると $s_i(x)$ で $k_i=e$、$dk_i=0$ なので $s_i^*\omega=A_i$。

**一意性**。別の接続 $\widetilde\omega$ が同じ $A_i$ を与えたとする。任意の $p=s_i(x)k$ の接ベクトルは、$(ds_i)_xv$ を右移動したものと基本ベクトル場の和へ分解できる。[右同変条件と再生条件](../GBG7/index.md#def-gbg7-connection-form)はその二成分の値をそれぞれ $\operatorname{Ad}_{k^{-1}}A_i(v)$ と $\theta_k(W)$ に一意に決める。従って $\widetilde\omega=\omega_i$ がすべてのパッチで成り立ち、$\widetilde\omega=\omega$。
<!-- proof-end -->

**結果の読み方**。主束が非自明でも大域的に存在するのは $P$ 上の $\omega$ である。各 $A_i$ はその局所表示であって、一般には基底 $M$ 全体の $\mathfrak g$ 値1形式へ貼り合わさらない。貼り合わさる条件は「$A_i=A_j$」ではなく、この定理の**非斉次な関係**である。

## 5. ゲージ自己同型による変換との関係

これまで $\omega$ を固定し、section だけを替えた。一方、[GBG5 のゲージ変換](../GBG5/index.md#def-gbg5-gauge-automorphism)は右作用と可換な束自己同型 $F:P\to P$ である。$F$ により**接続形式自体を引き戻す**場合、$F^*\omega$ は別の接続形式となる。その局所式は同じ見かけだが、何を固定しているかが異なる。

<a id="prop-gbg8-gauge-pullback"></a>

<!-- formal-statement-start -->
> **命題（ゲージ自己同型による接続の引き戻し）**  
> 滑らかな右主 $G$ 束 $P\to M$、その接続形式 $\omega$、ゲージ自己同型 $F:P\to P$ を取る。$F(s_i)=s_i a_i$ で定めた局所関数は重なりで $a_j=g_{ij}^{-1}a_i g_{ij}$ を満たす。このとき $F^*\omega$ は主束接続形式であり、固定した section $s_i$ に関する局所ポテンシャルは

$$
s_i^*(F^*\omega)=
\operatorname{Ad}_{a_i^{-1}}A_i+a_i^{-1}da_i,
\qquad A_i=s_i^*\omega
$$

> となる。ここでは接続への作用を $F^*$ と定義した。$(F^{-1})^*$ を作用として採用すると、局所関数の逆元が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ は基本ベクトル場を同じ $\xi$ で写し、右作用と可換である。この二事実から $F^*\omega$ も接続形式になる。固定した $s_i$ から見た引き戻しは $(F\circ s_i)^*\omega$ だから、既に証明したsectionの変換公式を使える。

<!-- proof-start -->
### 証明

$F(pg)=F(p)g$ から $F\circ R_g=R_g\circ F$ である。微分すれば $(dF)_p(\xi_P(p))=\xi_P(F(p))$ となる。従って

$$
(F^*\omega)_p(\xi_P(p))
=\omega_{F(p)}((dF)_p\xi_P(p))=\xi.
$$

また引き戻しの合成則と $F\circ R_g=R_g\circ F$ を用いると

$$
R_g^*(F^*\omega)
=(F\circ R_g)^*\omega
=(R_g\circ F)^*\omega
=F^*(R_g^*\omega)
=\operatorname{Ad}_{g^{-1}}(F^*\omega).
$$

最後の等号は $g$ が定数で随伴作用が値空間の線形写像であることによる。したがって[接続形式の二条件](../GBG7/index.md#def-gbg7-connection-form)が成立する。

[GBG5 の局所ゲージ関数整合条件](../GBG5/index.md#thm-gbg5-local-gauge)から $a_j=g_{ij}^{-1}a_i g_{ij}$。さらに $F\circ s_i=s_i a_i$ なので、[局所変換定理](#thm-gbg8-local-transform)を $s_i$ と $F\circ s_i$ に適用して

$$
s_i^*(F^*\omega)=(F\circ s_i)^*\omega
=(s_i a_i)^*\omega
=\operatorname{Ad}_{a_i^{-1}}A_i+a_i^{-1}da_i
$$

を得る。
<!-- proof-end -->

**二つの操作の違い**。$s'_i=s_i h_i$ は任意の局所的な表示変更であり、一般には遷移関数が [GBG3 の公式](../GBG3/index.md#thm-gbg3-transition-change) に従って変わる。これに対し $F(s_i)=s_i a_i$ の $a_i$ は [GBG5 の整合条件](../GBG5/index.md#thm-gbg5-local-gauge)を満たすため元の遷移関数を保ち、$F$ が一つの大域的自己同型になる。どちらも局所的な式 $T_g(A)$ が登場するが、前者は**固定した接続の別表示**、後者は**固定した表示での接続の引き戻し**である。局所式が似ているからといって、二つの操作を同一視しない。

---

## 6. 演習と詳細解答

<a id="ex-gbg8-a01"></a>
#### GBG8-A01 引き戻しの計算
- Level: A

$P=\mathbb R^2\times GL(2,\mathbb R)$、$B=E_{12}$ とし、$\omega_{(x,K)}(v,W)=K^{-1}(B\,dx(v))K+K^{-1}W$ を考える。標準section $s(x,y)=((x,y),I)$ に対して $A_s$ を計算し、1形式の定義を確認せよ。

<!-- solution-start -->
**詳細解答**。[積主束接続の公式](../GBG7/index.md#prop-gbg7-product-form)へ $b=B\,dx$ を代入しているので $\omega$ は接続である。$ds(v)=(v,0)$ だから

$$
A_s(v)=\omega_{(x,I)}(v,0)
=I^{-1}B\,dx(v)I+I^{-1}0
=B\,dx(v).
$$

任意の $v,w\in T_{(x,y)}\mathbb R^2$ と $a,b\in\mathbb R$ で $A_s(av+bw)=aB\,dx(v)+bB\,dx(w)$。係数行列 $B$ は定数なので滑らかである。よって $A_s=B\,dx$ は定義通り $\mathfrak{gl}_2$ 値1形式である。
<!-- solution-end -->

<a id="ex-gbg8-a02"></a>
#### GBG8-A02 $U(1)$ の位相関数
- Level: A

$U=\mathbb R^2$、$A=i x\,dy$、$g(x,y)=e^{2ix}$ とする。変換後の $A'$ を求め、$\operatorname{Ad}_{g^{-1}}$ の項をどのように評価したか説明せよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ は可換なので任意の $X\in i\mathbb R$ について $\operatorname{Ad}_{g^{-1}}X=X$。一方

$$
dg=2i e^{2ix}\,dx,\qquad
g^{-1}dg=e^{-2ix}(2i e^{2ix})\,dx=2i\,dx.
$$

従って[局所変換則](#thm-gbg8-local-transform)から

$$
A'=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg
=i x\,dy+2i\,dx.
$$

非斉次項を落とした $A'=A$ は、$g$ が位置依存であるため誤りとなる。
<!-- solution-end -->

<a id="ex-gbg8-a03"></a>
#### GBG8-A03 $SU(2)$ の共役を数値で判定する
- Level: A

$T_1=\left(\begin{smallmatrix}0&i\\i&0\end{smallmatrix}\right)$、$g=\operatorname{diag}(e^{ix},e^{-ix})$ とする。$g^{-1}T_1g$ を求め、$x=\pi/4$ で $T_1$ と一致しないことを確かめよ。

<!-- solution-start -->
**詳細解答**。$\det g=e^{ix}e^{-ix}=1$ で $g^\dagger g=I$ より $g\in SU(2)$。逆行列を左から掛けると

$$
g^{-1}T_1
=\begin{pmatrix}0&i e^{-ix}\\i e^{ix}&0\end{pmatrix},
\quad
g^{-1}T_1g
=\begin{pmatrix}0&i e^{-2ix}\\i e^{2ix}&0\end{pmatrix}.
$$

$x=\pi/4$ では $e^{-2ix}=-i$、$e^{2ix}=i$ だから

$$
g^{-1}T_1g=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\ne\begin{pmatrix}0&i\\i&0\end{pmatrix}=T_1.
$$

非可換群では $g^{-1}Ag=A$ とは限らず、変換則の随伴項が本質的である。
<!-- solution-end -->

<a id="ex-gbg8-a04"></a>
#### GBG8-A04 定数の表示変更と非斉次項
- Level: A

$G=GL(2,\mathbb R)$、$A=E_{12}\,dx$、$g=\operatorname{diag}(2,1)$ は定数とする。$T_g(A)$ を求め、位置依存 $g(x)$ の場合と何が異なるか述べよ。

<!-- solution-start -->
**詳細解答**。定数関数なので $dg=0$。$g^{-1}=\operatorname{diag}(1/2,1)$ であり、

$$
g^{-1}E_{12}g
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}0&1\\0&0\end{pmatrix}
\begin{pmatrix}2&0\\0&1\end{pmatrix}
=\frac12E_{12}.
$$

従って $T_g(A)=\frac12E_{12}\,dx$。位置依存の $g(x)$ では $dg$ が一般に零でなく、加法項 $g^{-1}dg$ が必要になる。定数の場合も $g^{-1}Ag$ が元の $A$ と等しいとは限らない。
<!-- solution-end -->

<a id="ex-gbg8-a05"></a>
#### GBG8-A05 積の微分の向き
- Level: A

行列群の滑らかな $g,h:U\to G$ について、$(gh)^{-1}d(gh)$ を $g^{-1}dg$ と $h^{-1}dh$ で表せ。$g^{-1}dg+h^{-1}dh$ と書ける条件を述べよ。

<!-- solution-start -->
**詳細解答**。積の微分は $d(gh)=(dg)h+g(dh)$。左から逆行列を掛けると

$$
\begin{aligned}
(gh)^{-1}d(gh)
&=h^{-1}g^{-1}\bigl((dg)h+g(dh)\bigr)\\
&=h^{-1}(g^{-1}dg)h+h^{-1}dh.
\end{aligned}
$$

$h$ が $g^{-1}dg$ の各値と可換なら第1項を $g^{-1}dg$ と簡略化できる。特に $G$ が可換なら常に成り立つ。非可換群では、$g$ と $h$ がそれぞれ群値であるという条件だけでは簡略化できない。
<!-- solution-end -->

<a id="ex-gbg8-b01"></a>
#### GBG8-B01 三重重なりと合成の計算
- Level: B

$U=\mathbb R$、$G=GL(2,\mathbb R)$、$g(x)=I+xE_{12}$、$h(x)=\operatorname{diag}(e^x,1)$ とする。$A=0$ から順に $T_g,T_h$ を施した結果と、$T_{gh}(0)$ を直接計算した結果を比較せよ。

<!-- solution-start -->
**詳細解答**。$E_{12}^2=0$ より $g^{-1}=I-xE_{12}$、$dg=E_{12}\,dx$ だから

$$
T_g(0)=g^{-1}dg=E_{12}\,dx.
$$

$h^{-1}=\operatorname{diag}(e^{-x},1)$、$h^{-1}dh=E_{11}\,dx$、$h^{-1}E_{12}h=e^{-x}E_{12}$ である。よって

$$
T_h(T_g(0))=(e^{-x}E_{12}+E_{11})\,dx.
$$

一方、$gh=\left(\begin{smallmatrix}e^x&x\\0&1\end{smallmatrix}\right)$ であり、その逆は

$$
(gh)^{-1}=\begin{pmatrix}e^{-x}&-xe^{-x}\\0&1\end{pmatrix}.
$$

したがって

$$
(gh)^{-1}d(gh)
=\begin{pmatrix}e^{-x}&-xe^{-x}\\0&1\end{pmatrix}
\begin{pmatrix}e^x&1\\0&0\end{pmatrix}dx
=\begin{pmatrix}1&e^{-x}\\0&0\end{pmatrix}dx.
$$

これは先の結果 $E_{11}\,dx+e^{-x}E_{12}\,dx$ と一致する。[合成命題](#prop-gbg8-transform-composition)の積順を具体的に検算した。
<!-- solution-end -->

<a id="ex-gbg8-b02"></a>
#### GBG8-B02 二つの自明化から接続を復元する
- Level: B

$\mathbb R$ を二つの開集合 $U_0=U_1=\mathbb R$ で覆い、$G=GL(2,\mathbb R)$、$g_{01}(x)=I+xE_{12}$ とする。$A_0=0$ のとき $A_1$ を決めて大域接続を構成せよ。点を第1座標で $k_1=\operatorname{diag}(2,1)$ と表示した場合、$v=\partial_x$、$dk_1(v)=0$ での接続値が第0座標と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**。$g_{01}^{-1}=I-xE_{12}$ かつ $dg_{01}=E_{12}\,dx$ なので、[局所変換則](#thm-gbg8-local-transform)より

$$
A_1=g_{01}^{-1}A_0g_{01}+g_{01}^{-1}dg_{01}
=E_{12}\,dx.
$$

[局所再構成定理](#thm-gbg8-local-reconstruction)で両積座標の形式を $\omega_i=k_i^{-1}A_i k_i+k_i^{-1}dk_i$ と定めれば大域接続が存在する。

第1座標では $k_1=\operatorname{diag}(2,1)$ が $x$ に関して一定なので

$$
\omega_1(\partial_x,0)
=k_1^{-1}E_{12}k_1
=\frac12E_{12}.
$$

第0座標では同じ点の群座標は $k_0=g_{01}k_1=\left(\begin{smallmatrix}2&x\\0&1\end{smallmatrix}\right)$ である。よって $dk_0(\partial_x)=E_{12}$、$k_0^{-1}=\left(\begin{smallmatrix}1/2&-x/2\\0&1\end{smallmatrix}\right)$、$A_0=0$ を使い

$$
\omega_0(\partial_x,dk_0(\partial_x))
=k_0^{-1}E_{12}=\frac12E_{12}.
$$

両座標の値は一致する。$A_0=0$ と $A_1\ne0$ が、別の大域接続を表しているわけではない。
<!-- solution-end -->

<a id="ex-gbg8-b03"></a>
#### GBG8-B03 表示変更かゲージ自己同型か
- Level: B

主束 $P$ に局所section $s_i$ と遷移関数 $g_{ij}$ があり、任意の局所関数 $h_i:U_i\to G$ で $s'_i=s_i h_i$ とする。

1. 新しい遷移関数を計算せよ。
2. $h_i$ が一つの大域ゲージ自己同型 $F$ の局所関数となる必要十分条件を述べよ。
3. この条件を満たす $F$ について、元のsectionを固定した $F^*\omega$ の局所式を書け。

<!-- solution-start -->
**詳細解答**。$s'_j=s_jh_j=s_i g_{ij}h_j=s_i h_i(h_i^{-1}g_{ij}h_j)$ だから

$$
g'_{ij}=h_i^{-1}g_{ij}h_j.
$$

これが[GBG3 の遷移変換則](../GBG3/index.md#thm-gbg3-transition-change)である。[GBG5 の局所ゲージ関数の整合条件と再構成](../GBG5/index.md#thm-gbg5-local-gauge)によれば、滑らかな $(h_i)$ が一つの $F$ を定める必要十分条件は

$$
h_j=g_{ij}^{-1}h_i g_{ij}.
$$

実際、この条件なら $g'_{ij}=h_i^{-1}g_{ij}(g_{ij}^{-1}h_i g_{ij})=g_{ij}$。逆に $g'_{ij}=g_{ij}$ を左から $h_i$、右から $g_{ij}^{-1}$ で解くと同じ条件が出る。

このとき $F(s_i)=s_i h_i$ なので、[本章のゲージ自己同型による接続の引き戻し](#prop-gbg8-gauge-pullback)より

$$
s_i^*(F^*\omega)=
\operatorname{Ad}_{h_i^{-1}}A_i+h_i^{-1}dh_i.
$$

ここでは $s_i$ を固定し、$\omega$ を $F^*\omega$ に替えた。第1問では $\omega$ を固定して局所座標を替えたので、同じ変換公式でも操作の意味は異なる。
<!-- solution-end -->

<a id="ex-gbg8-b04"></a>
#### GBG8-B04 なぜ斉次変換だけでは接続を表せないか
- Level: B

$G=U(1)$、$U=\mathbb R$ 上の積主束の標準sectionで $A=0$ とする。$s'=s\,e^{ix}$ で得られる局所ポテンシャルを計算せよ。誤った規則 $A'=\operatorname{Ad}_{g^{-1}}A$ が失敗する理由を、sectionの微分に戻って説明せよ。

<!-- solution-start -->
**詳細解答**。$g(x)=e^{ix}$ に対して $g^{-1}dg=i\,dx$ なので

$$
A'=A+i\,dx=i\,dx.
$$

誤った規則なら $A'=0$ となる。実際、積主束の標準接続は[GBG7 の公式](../GBG7/index.md#prop-gbg7-product-form)で $\omega_{(x,k)}(v,W)=k^{-1}W$。新sectionは $s'(x)=(x,e^{ix})$ なので

$$
(ds')_x(\partial_x)=(1,ie^{ix}),\qquad
(s'^*\omega)_x(\partial_x)
=e^{-ix}(ie^{ix})=i.
$$

従って直接の引き戻しは $i\,dx$ である。誤った規則は、$s'=sg(x)$ を微分する際の $(dg)_xv$ を捨てている。右同変条件は一定の群元による移動を扱うが、基底に依存する $g(x)$ の微分は[再生条件](../GBG7/index.md#def-gbg7-connection-form)により必ず現れる。
<!-- solution-end -->

<a id="ex-gbg8-c01"></a>
#### GBG8-C01 三つの $SU(2)$ ゲージで同じ大域接続を記述する
- Level: C

$M=\mathbb R^2$ を $U_1=U_2=U_3=M$ で覆い、$P=M\times SU(2)$ を考える。標準sectionを $s_1(x,y)=((x,y),I)$ とする。$T_1,T_3$ は第2節の行列とし、

$$
g_{12}(x,y)=\exp(xT_3),\qquad
g_{23}(x,y)=\exp(yT_1),\qquad
g_{13}=g_{12}g_{23}
$$

と定め、$s_2=s_1g_{12}$、$s_3=s_2g_{23}$ とする。$A_1=T_1\,dy$ から次を示せ。

1. $g_{12},g_{23},g_{13}$ が滑らかな $SU(2)$ 値関数で、三重重なり条件を満たすこと。
2. $A_2$ の行列表示と、$A_3=T_{g_{23}}(A_2)$ および $A_3=T_{g_{13}}(A_1)$ の一致。
3. 原点での $A_1,A_2,A_3$ の値と、三つが同じ大域接続を表す理由。

<!-- solution-start -->
**詳細解答**。第2節の行列について $T_1^2=T_3^2=-I$ である。行列指数を偶数次と奇数次に分けると

$$
g_{12}=\begin{pmatrix}e^{ix}&0\\0&e^{-ix}\end{pmatrix},\qquad
g_{23}=\cos y\,I+\sin y\,T_1
=\begin{pmatrix}\cos y&i\sin y\\i\sin y&\cos y\end{pmatrix}.
$$

両者とも随伴行列との積が $I$ で、行列式はそれぞれ $e^{ix}e^{-ix}=1$、$\cos^2y+\sin^2y=1$ である。したがって $g_{12},g_{23}$ は滑らかな $SU(2)$ 値関数であり、積 $g_{13}=g_{12}g_{23}$ も同様である。また $s_3=s_1g_{12}g_{23}=s_1g_{13}$ なので、主束の自由性から三重重なり条件が確かめられる。

[局所変換定理](#thm-gbg8-local-transform)を $g_{12}$ に適用する。$g_{12}=\operatorname{diag}(e^{ix},e^{-ix})$ だから、第2節と同じ中間行列積により

$$
A_2=
\begin{pmatrix}0&i e^{-2ix}\\i e^{2ix}&0\end{pmatrix}dy
+T_3\,dx.
$$

$g_{23}=e^{yT_1}$ は $T_1$ と可換なので、$dg_{23}=g_{23}T_1\,dy$、$g_{23}^{-1}dg_{23}=T_1\,dy$ である。共役の行列計算を示すため

$$
T_2:=\begin{pmatrix}0&1\\-1&0\end{pmatrix},\qquad
g_{12}^{-1}T_1g_{12}=\cos(2x)T_1+\sin(2x)T_2
$$

と置く。$g_{23}^{-1}=\cos y\,I-\sin y\,T_1$ と、行列積 $T_1T_2=-T_3$、$T_2T_1=T_3$、$T_1T_3=T_2$、$T_3T_1=-T_2$ を使って両側から掛けると

$$
\begin{aligned}
g_{23}^{-1}T_2g_{23}&=\cos(2y)T_2+\sin(2y)T_3,\\
g_{23}^{-1}T_3g_{23}&=\cos(2y)T_3-\sin(2y)T_2.
\end{aligned}
$$

よって $A_3=\operatorname{Ad}_{g_{23}^{-1}}A_2+T_1\,dy$ の係数行列まで展開すると

$$
\begin{aligned}
A_3
={}&\begin{pmatrix}
i\cos(2y)&-\sin(2y)\\
\sin(2y)&-i\cos(2y)
\end{pmatrix}dx\\
&+\begin{pmatrix}
i\sin(2x)\sin(2y)&i(1+\cos(2x))+\sin(2x)\cos(2y)\\
i(1+\cos(2x))-\sin(2x)\cos(2y)&-i\sin(2x)\sin(2y)
\end{pmatrix}dy.
\end{aligned}
$$

各係数は反 Hermite で跡が零なので $A_3$ も $\mathfrak{su}(2)$ 値1形式である。

他方、[変換合成命題](#prop-gbg8-transform-composition)を $g=g_{12}$、$h=g_{23}$ へ適用すると

$$
\begin{aligned}
T_{g_{13}}(A_1)
&=\operatorname{Ad}_{(g_{12}g_{23})^{-1}}A_1
  +(g_{12}g_{23})^{-1}d(g_{12}g_{23})\\
&=\operatorname{Ad}_{g_{23}^{-1}}
  \bigl(\operatorname{Ad}_{g_{12}^{-1}}A_1+g_{12}^{-1}dg_{12}\bigr)
  +g_{23}^{-1}dg_{23}\\
&=\operatorname{Ad}_{g_{23}^{-1}}A_2+T_1\,dy=A_3.
\end{aligned}
$$

これは $g_{12}$ と $g_{23}$ が可換だと仮定しない計算である。原点では $g_{12}(0,0)=g_{23}(0,0)=I$ であり、

$$
A_1|_0=T_1\,dy,\quad
A_2|_0=T_3\,dx+T_1\,dy,\quad
A_3|_0=T_3\,dx+2T_1\,dy.
$$

三つの局所形式は一致しないが、いずれも滑らかで、$g_{12},g_{23},g_{13}$ に対する重なり条件を満たす。[局所再構成定理](#thm-gbg8-local-reconstruction)の十分性から、三つを局所表示として持つ主束接続 $\omega$ が一意に存在する。よってこれは三つの異なる接続ではなく、同じ $\omega$ の三つの基準による表示である。
<!-- solution-end -->

---

## 7. この講義で得た道具

大域の主束接続形式 $\omega$ を局所section $s_i$ で引き戻すと $A_i=s_i^*\omega$ になる。section を取り替えれば、基底方向の共役に加えて、動く基準点の垂直速度から生じる非斉次項が必要である。

$$
A_j=\operatorname{Ad}_{g_{ij}^{-1}}A_i+g_{ij}^{-1}dg_{ij}.
$$

この規則は三重重なりで合成に関して整合し、逆にこの規則を満たす局所形式族から大域接続が一意に再構成できる。可換群では微分項が目立ち、非可換群では共役項も不可欠になる。

次の **GBG9** では、ここで作った局所形式 $A_i$ が、結合束上の場を微分する際にどのように現れるかを扱う。
