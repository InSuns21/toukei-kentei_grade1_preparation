# GEO7 幾何学 VII

[GEO2](../GEO2/index.md) では接空間・余接空間と写像の微分を、[LA3E](../LA3E/index.md) ではテンソル積・外積代数を有限次元線形代数として構成しました。[GEO5](../GEO5/index.md) では滑らかなベクトル場・Lie 括弧・局所流を導入しています。

本章では、各点の接空間・余接空間上の線形代数を、点を動かしたときにも滑らかにつながる幾何対象へ持ち上げます。まず一般のテンソルを点ごとに滑らかに割り当て、次に交代的な共変テンソルへ絞ります。その上で、積・滑らかな写像による引き戻し・次数を1つ上げる微分を構成し、座標変換と整合することを証明します。

さらに、次数を1つ下げる操作と局所流に沿う変化率を導入し、これら三つの作用素を結ぶ恒等式まで進みます。次の GEO8 では、ここで構成した交代形式を多様体上で積分する理論へ進みます。

---

## 1. 点ごとのテンソルを滑らかに動かす

<a id="def-geo7-tensor-field"></a>
<!-- formal-statement-start -->
> **定義（テンソル場）**  
> $M$ を滑らかな多様体とする。非負整数 $r,s$ に対して、各点 $p\in M$ に
>
$$
T_p
\in
(T_pM)^{\otimes r}\otimes(T_p^*M)^{\otimes s}
$$
>
> を対応させる族 $T$ を $(r,s)$ 型テンソル場という。
>
> 局所座標 $(x^1,\dots,x^n)$ において
>
$$
T
=
\sum
T^{i_1\cdots i_r}_{j_1\cdots j_s}
\frac{\partial}{\partial x^{i_1}}
\otimes\cdots\otimes
\frac{\partial}{\partial x^{i_r}}
\otimes
dx^{j_1}\otimes\cdots\otimes dx^{j_s}
$$
>
> と書いたとき、全ての成分関数
>
$$
T^{i_1\cdots i_r}_{j_1\cdots j_s}
$$
>
> が滑らかであるなら、$T$ を **滑らかなテンソル場**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-tensor-field -->
**定義の確認**

$\mathbb R^2$ の標準座標 $(x,y)$ で

$$
T
=
x\,\partial_x\otimes dx
+
e^y\,\partial_y\otimes dy
$$

と置きます。これは $(1,1)$ 型テンソル場です。

成分は

$$
T^1{}_1=x,
\qquad
T^2{}_2=e^y,
\qquad
T^1{}_2=T^2{}_1=0
$$

で、全て滑らかです。したがって $T$ は滑らかな $(1,1)$ 型テンソル場です。
<!-- definition-example-end -->

「成分が滑らか」という条件は座標に依存しません。座標変換では基底ベクトルと双対基底が Jacobi 行列およびその逆行列で変換されるため、新しい成分は古い成分と滑らかな座標変換の偏導関数の有限和・積として表されます。

特に、

- $(1,0)$ 型テンソル場は滑らかなベクトル場
- $(0,1)$ 型テンソル場は1形式
- $(0,2)$ 型テンソル場には後で Riemann 計量が入る

という位置関係になります。

---

## 2. 交代的な共変テンソル

<a id="def-geo7-differential-form"></a>
<!-- formal-statement-start -->
> **定義（微分形式）**  
> $M$ を滑らかな多様体とする。各点 $p\in M$ に
>
$$
\omega_p\in\Lambda^k(T_p^*M)
$$
>
> を滑らかに対応させるものを **$k$ 次微分形式**、または単に **$k$ 形式**という。
>
> $M$ 上の滑らかな $k$ 形式全体を
>
$$
\Omega^k(M)
$$
>
> と書く。特に
>
$$
\Omega^0(M)=C^\infty(M)
$$
>
> と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-differential-form -->
**定義の確認**

$\mathbb R^3$ で

$$
\omega
=
z\,dx\wedge dy
+
x\,dy\wedge dz
$$

とします。

各点で $dx\wedge dy$ と $dy\wedge dz$ は交代的な2重線形形式であり、係数 $z,x$ は滑らかです。したがって

$$
\omega\in\Omega^2(\mathbb R^3).
$$

例えば

$$
\omega(\partial_x,\partial_y)=z,
\qquad
\omega(\partial_y,\partial_x)=-z
$$

となり、交代性が直接確認できます。
<!-- definition-example-end -->

局所座標 $(x^1,\dots,x^n)$ では、[LA3E の外冪の標準基底](../LA3E/index.md#thm-la3e-exterior-basis-dimension)から任意の $k$ 形式は一意に

$$
\omega
=
\sum_{1\le i_1<\cdots<i_k\le n}
a_{i_1\cdots i_k}
\,dx^{i_1}\wedge\cdots\wedge dx^{i_k}
$$

と書けます。

したがって $k>n$ なら

$$
\Omega^k(M)=\{0\}.
$$

これは各点で $\Lambda^k(T_p^*M)=0$ だからです。

---

## 3. 交代形式を掛け合わせる

[LA3E](../LA3E/index.md#def-la3e-wedge-product) では一つのベクトル空間上で外積を定義しました。多様体上では、それを各点で行います。

<a id="def-geo7-form-wedge"></a>
<!-- formal-statement-start -->
> **定義（微分形式の外積）**  
> $\alpha\in\Omega^k(M)$、$\beta\in\Omega^\ell(M)$ に対して
>
$$
(\alpha\wedge\beta)_p
:=
\alpha_p\wedge\beta_p
$$
>
> と定める。このとき
>
$$
\alpha\wedge\beta\in\Omega^{k+\ell}(M)
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-form-wedge -->
**定義の確認**

$\mathbb R^3$ で

$$
\alpha=x\,dy,
\qquad
\beta=dz+y\,dx
$$

とすると

$$
\alpha\wedge\beta
=
x\,dy\wedge dz
+
xy\,dy\wedge dx.
$$

$dy\wedge dx=-dx\wedge dy$ なので

$$
\alpha\wedge\beta
=
x\,dy\wedge dz
-
xy\,dx\wedge dy.
$$

係数は滑らかで、各点で2次交代形式なので、これは滑らかな2形式です。
<!-- definition-example-end -->

<a id="prop-geo7-wedge-laws"></a>
<!-- formal-statement-start -->
> **命題（微分形式の外積の基本則）**  
> $\alpha\in\Omega^k(M)$、$\beta\in\Omega^\ell(M)$、$\gamma\in\Omega^m(M)$ とする。このとき
>
$$
(\alpha\wedge\beta)\wedge\gamma
=
\alpha\wedge(\beta\wedge\gamma),
$$
>
$$
\alpha\wedge\beta
=
(-1)^{k\ell}\beta\wedge\alpha.
$$
<!-- formal-statement-end -->

これは各点で [LA3E の外積の結合性と次数付き交換則](../LA3E/index.md#thm-la3e-wedge-algebra-laws) を適用すれば従います。

重要なのは、1形式どうしでは

$$
\alpha\wedge\beta=-\beta\wedge\alpha
$$

ですが、2形式どうしでは

$$
\alpha\wedge\beta=\beta\wedge\alpha
$$

となることです。符号は「形式の次数の積」で決まります。

---

## 4. 微分形式は滑らかな写像で引き戻せる

滑らかなベクトル場は一般の滑らかな写像で押し出せるとは限りません。異なる点が同じ点へ写ると、どのベクトルを採用するかが一意に決まらないからです。

一方、共変テンソルは写像の微分へベクトルを入れてから評価すればよいので、任意の滑らかな写像に沿って自然に引き戻せます。

<a id="def-geo7-pullback-form"></a>
<!-- formal-statement-start -->
> **定義（微分形式の引き戻し）**  
> $F:M\to N$ を滑らかな写像、$\omega\in\Omega^k(N)$ とする。
>
> $p\in M$ と $v_1,\dots,v_k\in T_pM$ に対して
>
$$
(F^*\omega)_p(v_1,\dots,v_k)
:=
\omega_{F(p)}
\bigl(
dF_p(v_1),\dots,dF_p(v_k)
\bigr)
$$
>
> と定める。この $k$ 形式 $F^*\omega\in\Omega^k(M)$ を $\omega$ の **引き戻し**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-pullback-form -->
**定義の確認**

$$
F:\mathbb R^2\to\mathbb R^2,
\qquad
F(u,v)=(u^2,uv)
$$

とし、標的側の座標を $(x,y)$ とします。

$$
F^*dx=d(u^2)=2u\,du,
$$

$$
F^*dy=d(uv)=v\,du+u\,dv.
$$

したがって

$$
F^*(dx\wedge dy)
=
(2u\,du)\wedge(v\,du+u\,dv)
=
2u^2\,du\wedge dv.
$$

定義から直接計算しても、

$$
dF(\partial_u)
=
2u\,\partial_x+v\,\partial_y,
$$

$$
dF(\partial_v)
=
u\,\partial_y
$$

なので

$$
(F^*(dx\wedge dy))(\partial_u,\partial_v)
=
\det
\begin{pmatrix}
2u&0\\
v&u
\end{pmatrix}
=
2u^2
$$

となり一致します。
<!-- definition-example-end -->

<a id="prop-geo7-pullback-wedge"></a>
<!-- formal-statement-start -->
> **命題（引き戻しと外積）**  
> $F:M\to N$ を滑らかな写像とし、$\alpha\in\Omega^k(N)$、$\beta\in\Omega^\ell(N)$ とする。このとき
>
$$
F^*(\alpha\wedge\beta)
=
F^*\alpha\wedge F^*\beta.
$$
>
> また $G:N\to P$ が滑らかなら
>
$$
(G\circ F)^*
=
F^*\circ G^*.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各点で、引き戻しは線形写像 $dF_p$ を微分形式の全ての引数へ入れる操作です。外積は引数の置換和で定義されるため、この代入と可換します。合成則は GEO2 の連鎖律を各引数へ適用します。

<!-- proof-start -->
### 証明

まず外積との可換性を示します。$p\in M$ と $v_1,\dots,v_{k+\ell}\in T_pM$ を取ります。[LA3E の外積](../LA3E/index.md#def-la3e-wedge-product)の置換和による定義を使うと、

$$
\bigl(F^*(\alpha\wedge\beta)\bigr)_p
(v_1,\dots,v_{k+\ell})
=
(\alpha\wedge\beta)_{F(p)}
(dF_pv_1,\dots,dF_pv_{k+\ell}).
$$

右辺の外積を展開すると、各項は $\alpha$ に $k$ 本、$\beta$ に $\ell$ 本の $dF_pv_i$ を入れた積です。これは同じ置換ごとに

$$
(F^*\alpha)_p(v_{\sigma(1)},\dots,v_{\sigma(k)})
(F^*\beta)_p(v_{\sigma(k+1)},\dots,v_{\sigma(k+\ell)})
$$

となるので、置換和を戻せば

$$
F^*(\alpha\wedge\beta)
=
F^*\alpha\wedge F^*\beta.
$$

次に $G:N\to P$ と $\eta\in\Omega^k(P)$ を取ります。$p\in M$ と $v_1,\dots,v_k\in T_pM$ に対して

$$
\begin{aligned}
\bigl((G\circ F)^*\eta\bigr)_p(v_1,\dots,v_k)
&=
\eta_{G(F(p))}
\bigl(
d(G\circ F)_pv_1,\dots,d(G\circ F)_pv_k
\bigr).
\end{aligned}
$$

[GEO2 の多様体上の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)から

$$
d(G\circ F)_p
=
dG_{F(p)}\circ dF_p.
$$

これを各引数へ代入すると

$$
\begin{aligned}
\bigl((G\circ F)^*\eta\bigr)_p(v_1,\dots,v_k)
&=
(G^*\eta)_{F(p)}
(dF_pv_1,\dots,dF_pv_k)\\
&=
\bigl(F^*(G^*\eta)\bigr)_p(v_1,\dots,v_k).
\end{aligned}
$$

$p$ と $v_i$ は任意なので

$$
(G\circ F)^*=F^*\circ G^*.
$$

$\square$
<!-- proof-end -->

---

## 5. 次数を1つ上げる微分を座標から作る

まず一つの座標近傍 $U$ と局所座標 $(x^1,\dots,x^n)$ を固定します。

$$
\omega
=
\sum_I a_I\,dx^I
$$

と書きます。ここで

$$
I=(i_1<\cdots<i_k),
\qquad
dx^I=dx^{i_1}\wedge\cdots\wedge dx^{i_k}
$$

です。

<a id="def-geo7-exterior-derivative"></a>
<!-- formal-statement-start -->
> **定義（外微分）**  
> $\omega\in\Omega^k(M)$ に対して、局所座標で
>
$$
\omega
=
\sum_I a_I\,dx^I
$$
>
> と書き、
>
$$
d\omega
:=
\sum_I da_I\wedge dx^I
=
\sum_{I,j}
\frac{\partial a_I}{\partial x^j}
dx^j\wedge dx^I
$$
>
> と定める。
>
> 後述の座標不変性により、これは座標近傍ごとに貼り合わさって大域的な作用素
>
$$
d:\Omega^k(M)\to\Omega^{k+1}(M)
$$
>
> を定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-exterior-derivative -->
**定義の確認**

$\mathbb R^3$ で

$$
\omega
=
x^2\,dy
+
yz\,dz
$$

とします。

第一項について

$$
d(x^2)\wedge dy
=
2x\,dx\wedge dy.
$$

第二項について

$$
d(yz)\wedge dz
=
(z\,dy+y\,dz)\wedge dz
=
z\,dy\wedge dz
$$

です。$dz\wedge dz=0$ を使いました。

したがって

$$
d\omega
=
2x\,dx\wedge dy
+
z\,dy\wedge dz.
$$
<!-- definition-example-end -->

しかし、この式を「ある座標で定義した」だけでは大域的な演算になったとは言えません。座標を変えても同じ $(k+1)$ 形式になることを示す必要があります。

<a id="thm-geo7-exterior-invariant-formula"></a>
<!-- formal-statement-start -->
> **定理（外微分の座標に依らない表示）**  
> $\omega\in\Omega^k(M)$ とし、$X_0,\dots,X_k$ を滑らかなベクトル場とする。このとき
>
$$
\begin{aligned}
d\omega(X_0,\dots,X_k)
&=
\sum_{i=0}^k
(-1)^i
X_i
\bigl(
\omega(X_0,\dots,\widehat{X_i},\dots,X_k)
\bigr)
\\
&\quad+
\sum_{0\le i<j\le k}
(-1)^{i+j}
\omega
\bigl(
[X_i,X_j],
X_0,\dots,\widehat{X_i},\dots,\widehat{X_j},\dots,X_k
\bigr).
\end{aligned}
$$
>
> 右辺は座標を用いないので、局所座標で定義した $d\omega$ は座標変換に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

座標滑らかなベクトル場

$$
\partial_i=\frac{\partial}{\partial x^i}
$$

では

$$
[\partial_i,\partial_j]=0
$$

です。したがって右辺は、係数関数の偏微分を交代化した式になります。まず座標滑らかなベクトル場に対して局所定義と一致することを確認し、その後 $C^\infty$ 線形性を使って一般の滑らかなベクトル場へ拡張します。

<!-- proof-start -->
### 証明

局所座標 $(x^1,\dots,x^n)$ 上で

$$
\omega
=
\frac1{k!}
\sum_{i_1,\dots,i_k}
\omega_{i_1\cdots i_k}
dx^{i_1}\wedge\cdots\wedge dx^{i_k}
$$

と書きます。係数 $\omega_{i_1\cdots i_k}$ は添字について交代的です。

局所定義から

$$
d\omega
=
\frac1{k!}
\sum_{j,i_1,\dots,i_k}
\partial_j\omega_{i_1\cdots i_k}
\,dx^j\wedge dx^{i_1}\wedge\cdots\wedge dx^{i_k}.
$$

これを座標滑らかなベクトル場

$$
\partial_{a_0},\dots,\partial_{a_k}
$$

へ評価すると、外積の交代性から

$$
d\omega
(\partial_{a_0},\dots,\partial_{a_k})
=
\sum_{m=0}^k
(-1)^m
\partial_{a_m}
\omega
(
\partial_{a_0},\dots,\widehat{\partial_{a_m}},\dots,\partial_{a_k}
).
$$

一方、座標滑らかなベクトル場どうしは可換なので

$$
[\partial_{a_i},\partial_{a_j}]=0.
$$

従って定理の右辺も全く同じ式になります。

次に一般の滑らかなベクトル場に対して右辺が各 $X_i$ について $C^\infty$ 線形であることを確認します。第一変数を $fX_0$ に置き換えます。

第一和の $i=0$ の項は

$$
fX_0\bigl(\omega(X_1,\dots,X_k)\bigr).
$$

$i>0$ の項では

$$
X_i\bigl(
\omega(fX_0,\dots)
\bigr)
=
X_i(f)\omega(X_0,\dots)
+
fX_i\bigl(\omega(X_0,\dots)\bigr)
$$

となり、$X_i(f)$ を含む余分な項が生じます。

第二和で $i=0<j$ の項には

$$
[fX_0,X_j]
=
f[X_0,X_j]-X_j(f)X_0
$$

が現れます。ここから出る

$$
-X_j(f)X_0
$$

の項は、第一和で生じた $X_j(f)$ の項と符号込みでちょうど相殺します。残る全ての項には共通因子 $f$ が付きます。

したがって右辺は第一変数について $C^\infty$ 線形です。他の変数についても同じ積の法則と Lie 括弧の関数倍公式を使えば、同様に余分な微分項が相殺します。よって右辺は各変数について $C^\infty$ 線形であり、座標滑らかなベクトル場上で局所定義と一致するため交代性も従い、$(k+1)$ 形式です。

座標滑らかなベクトル場上で局所定義と一致し、両辺とも各変数について $C^\infty$ 線形なので、任意の

$$
X_i=\sum_a X_i^a\partial_a
$$

に対しても一致します。

右辺は座標を使わず、$\omega$・滑らかなベクトル場の作用・Lie 括弧だけで記述されています。従って二つの座標系の重なり上でどちらの局所定義も同じ右辺に等しく、互いに一致します。よって局所的に定義した $d\omega$ は大域的な微分形式へ貼り合わさります。$\square$
<!-- proof-end -->

この定理で、外微分は座標計算で作れる一方、その結果は座標の選び方に依存しないことが確定しました。

---

## 6. 外微分は次数付き Leibniz 則を満たす

<a id="thm-geo7-graded-leibniz"></a>
<!-- formal-statement-start -->
> **定理（外微分の次数付き Leibniz 則）**  
> $\alpha\in\Omega^k(M)$、$\beta\in\Omega^\ell(M)$ とする。このとき
>
$$
d(\alpha\wedge\beta)
=
d\alpha\wedge\beta
+
(-1)^k
\alpha\wedge d\beta.
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所座標で

$$
\alpha=\sum_I a_I dx^I,
\qquad
\beta=\sum_J b_J dx^J
$$

と書けば、積の微分

$$
d(a_Ib_J)
=
b_J\,da_I+a_I\,db_J
$$

を使うだけです。ただし $db_J$ を $k$ 次形式 $dx^I$ の前へ動かすときに $(-1)^k$ が出ます。

<!-- proof-start -->
### 証明

局所座標で単項

$$
\alpha=a\,dx^I,
\qquad
\beta=b\,dx^J,
\qquad
|I|=k
$$

について計算すれば、線形性から一般の場合が従います。

$$
\alpha\wedge\beta
=
ab\,dx^I\wedge dx^J
$$

なので

$$
d(\alpha\wedge\beta)
=
d(ab)\wedge dx^I\wedge dx^J.
$$

通常の積の微分則から

$$
d(ab)
=
b\,da+a\,db.
$$

従って

$$
d(\alpha\wedge\beta)
=
b\,da\wedge dx^I\wedge dx^J
+
a\,db\wedge dx^I\wedge dx^J.
$$

第一項は

$$
d\alpha\wedge\beta.
$$

第二項では1形式 $db$ を $k$ 本の1形式からなる $dx^I$ の右へ移します。1回交換するごとに符号が反転するため

$$
db\wedge dx^I
=
(-1)^k dx^I\wedge db.
$$

よって第二項は

$$
(-1)^k
a\,dx^I\wedge db\wedge dx^J
=
(-1)^k\alpha\wedge d\beta.
$$

以上より

$$
d(\alpha\wedge\beta)
=
d\alpha\wedge\beta
+
(-1)^k\alpha\wedge d\beta.
$$

$\square$
<!-- proof-end -->

---

## 7. 外微分を二回すると0になる

外微分の最重要な構造は

$$
d^2=0
$$

です。

<a id="thm-geo7-d-square-zero"></a>
<!-- formal-statement-start -->
> **定理（外微分の二乗は0）**  
> 任意の $\omega\in\Omega^k(M)$ に対して
>
$$
d(d\omega)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所座標で

$$
\omega=\sum_I a_I dx^I
$$

と書くと、

$$
d^2\omega
=
\sum_{I,j,\ell}
\frac{\partial^2a_I}{\partial x^\ell\partial x^j}
dx^\ell\wedge dx^j\wedge dx^I.
$$

二階偏導関数は $j,\ell$ を入れ替えても同じですが、外積は $dx^\ell\wedge dx^j=-dx^j\wedge dx^\ell$ と符号が反転します。この対称性と反対称性が打ち消し合います。

<!-- proof-start -->
### 証明

局所座標で

$$
\omega
=
\sum_I a_I dx^I
$$

とします。外微分の定義から

$$
d\omega
=
\sum_{I,j}
\partial_j a_I
\,dx^j\wedge dx^I.
$$

もう一度外微分を取ると

$$
d^2\omega
=
\sum_{I,j,\ell}
\partial_\ell\partial_j a_I
\,dx^\ell\wedge dx^j\wedge dx^I.
$$

$j=\ell$ の項は

$$
dx^j\wedge dx^j=0
$$

なので0です。

$j\ne\ell$ の項は $(j,\ell)$ と $(\ell,j)$ を対にします。対応する二項の和は

$$
\partial_\ell\partial_j a_I
\,dx^\ell\wedge dx^j\wedge dx^I
+
\partial_j\partial_\ell a_I
\,dx^j\wedge dx^\ell\wedge dx^I.
$$

係数関数 $a_I$ は滑らかなので混合偏導関数が交換でき、

$$
\partial_\ell\partial_j a_I
=
\partial_j\partial_\ell a_I.
$$

一方、

$$
dx^j\wedge dx^\ell
=
-dx^\ell\wedge dx^j.
$$

したがって二項は相殺します。

全ての項がこのように0になるので

$$
d^2\omega=0.
$$

$\square$
<!-- proof-end -->

ここで使ったのは、係数の二階偏導関数の **対称性** と外積の **反対称性** です。どちらか一方だけでは $d^2=0$ は出ません。

---

## 8. 外微分は引き戻しと可換する

<a id="thm-geo7-pullback-commutes-d"></a>
<!-- formal-statement-start -->
> **定理（外微分の自然性）**  
> $F:M\to N$ を滑らかな写像、$\omega\in\Omega^k(N)$ とする。このとき
>
$$
d(F^*\omega)
=
F^*(d\omega).
$$
<!-- formal-statement-end -->

### 証明の見取り図

標的側の局所座標 $(y^1,\dots,y^m)$ で

$$
\omega
=
\sum_I a_I\,dy^I
$$

とします。引き戻すと

$$
F^*\omega
=
\sum_I
(a_I\circ F)
\,d(y^{i_1}\circ F)\wedge\cdots\wedge d(y^{i_k}\circ F).
$$

ここで Leibniz 則と $d^2=0$ を使うと、外微分は係数 $a_I\circ F$ にだけ作用します。

<!-- proof-start -->
### 証明

$F(p)$ の近くで $N$ の局所座標 $(y^1,\dots,y^m)$ を取り、

$$
\omega
=
\sum_I a_I\,dy^{i_1}\wedge\cdots\wedge dy^{i_k}
$$

と書きます。

引き戻しと外積の可換性から

$$
F^*\omega
=
\sum_I
(a_I\circ F)
\,d(y^{i_1}\circ F)\wedge\cdots\wedge d(y^{i_k}\circ F).
$$

これに外微分を作用させます。次数付き Leibniz 則を繰り返すと、各 $d(y^{i_r}\circ F)$ に外微分が当たる項も現れますが、

$$
d(d(y^{i_r}\circ F))=0
$$

なので全て消えます。従って

$$
d(F^*\omega)
=
\sum_I
d(a_I\circ F)
\wedge
d(y^{i_1}\circ F)\wedge\cdots\wedge d(y^{i_k}\circ F).
$$

0形式に対する外微分は通常の微分なので、GEO2 の連鎖律から

$$
d(a_I\circ F)
=
F^*(da_I).
$$

したがって

$$
d(F^*\omega)
=
\sum_I
F^*(da_I)
\wedge
F^*(dy^{i_1})
\wedge\cdots\wedge
F^*(dy^{i_k}).
$$

引き戻しと外積の可換性を逆向きに使えば

$$
d(F^*\omega)
=
F^*
\left(
\sum_I
da_I\wedge dy^{i_1}\wedge\cdots\wedge dy^{i_k}
\right).
$$

括弧内は $d\omega$ なので

$$
d(F^*\omega)=F^*(d\omega).
$$

$\square$
<!-- proof-end -->

この定理が、外微分が「座標に依存しない微分」であることを強く示しています。写像で座標やパラメータを変えてから微分しても、先に微分してから引き戻しても同じです。

---

## 9. 内部積はベクトルを一つ差し込む操作

<a id="def-geo7-interior-product"></a>
<!-- formal-statement-start -->
> **定義（微分形式の内部積）**  
> $X$ を滑らかなベクトル場、$\omega\in\Omega^k(M)$、$k\ge1$ とする。
>
$$
(\iota_X\omega)_p(v_1,\dots,v_{k-1})
:=
\omega_p(X_p,v_1,\dots,v_{k-1})
$$
>
> と定める。
>
> これを $\omega$ の $X$ による **内部積**という。
>
> $k=0$ では
>
$$
\iota_Xf=0
$$
>
> と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-interior-product -->
**定義の確認**

$\mathbb R^3$ で

$$
\omega=dx\wedge dy,
\qquad
X=x\partial_x+\partial_y
$$

とします。

任意のベクトル $V$ に対して

$$
(\iota_X\omega)(V)
=
\omega(X,V).
$$

外積の評価公式から

$$
\iota_X(dx\wedge dy)
=
dx(X)\,dy-dy(X)\,dx.
$$

ここで

$$
dx(X)=x,
\qquad
dy(X)=1
$$

なので

$$
\iota_X\omega
=
x\,dy-dx.
$$
<!-- definition-example-end -->

<a id="prop-geo7-interior-wedge"></a>
<!-- formal-statement-start -->
> **命題（内部積の符号付き積の法則）**  
> $\alpha\in\Omega^k(M)$、$\beta\in\Omega^\ell(M)$ とする。このとき
>
$$
\iota_X(\alpha\wedge\beta)
=
(\iota_X\alpha)\wedge\beta
+
(-1)^k
\alpha\wedge(\iota_X\beta).
$$
<!-- formal-statement-end -->

これは各点で [LA3E の内部積の基本恒等式](../LA3E/index.md#thm-la3e-interior-product-identities) を適用すれば従います。

---

## 10. Lie 微分は流れに沿う変化率

[GEO5 の最大流](../GEO5/index.md#thm-geo5-maximal-flow) によって、滑らかなベクトル場 $X$ は局所流 $\Phi_t$ を持ちます。微分形式を $\Phi_t$ で引き戻せば、流れに沿って形式がどう変化するかを同じ点で比較できます。

<a id="def-geo7-lie-derivative"></a>
<!-- formal-statement-start -->
> **定義（微分形式の Lie 微分）**  
> $X$ を滑らかなベクトル場、$\Phi_t$ をその局所流、$\omega\in\Omega^k(M)$ とする。
>
$$
\mathcal L_X\omega
:=
\left.
\frac{d}{dt}
\right|_{t=0}
\Phi_t^*\omega
$$
>
> と定める。これを $\omega$ の $X$ による **Lie 微分**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo7-lie-derivative -->
**定義の確認**

$\mathbb R$ 上で

$$
X=\partial_x
$$

とすると局所流は平行移動

$$
\Phi_t(x)=x+t
$$

です。

1形式

$$
\omega=f(x)\,dx
$$

に対して

$$
\Phi_t^*\omega
=
f(x+t)\,d(x+t)
=
f(x+t)\,dx.
$$

従って

$$
\mathcal L_X\omega
=
f'(x)\,dx.
$$

これは「$\partial_x$ 方向に係数を微分する」という期待どおりの結果です。
<!-- definition-example-end -->

Lie 微分は引き戻しの微分なので、外積に対して通常の Leibniz 則を満たします。

$$
\mathcal L_X(\alpha\wedge\beta)
=
(\mathcal L_X\alpha)\wedge\beta
+
\alpha\wedge(\mathcal L_X\beta).
$$

---

## 11. 三つの作用素を結ぶ恒等式

内部積は次数を1下げ、外微分は次数を1上げます。その組合せが Lie 微分になります。

<a id="thm-geo7-cartan-formula"></a>
<!-- formal-statement-start -->
> **定理（Cartan の公式）**  
> $X$ を滑らかなベクトル場、$\omega\in\Omega^k(M)$ とする。このとき
>
$$
\boxed{
\mathcal L_X\omega
=
d(\iota_X\omega)
+
\iota_X(d\omega)
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

両辺は微分形式の次数を変えない演算です。さらにどちらも外積に対する次数0の導分です。したがって局所的には、微分形式を生成する

- 滑らかな関数 $f$
- 座標1形式 $dx^i$

に対して一致することを示せば十分です。

関数では

$$
\iota_Xf=0,
\qquad
\iota_Xdf=Xf
$$

なので右辺は $Xf$ です。これは Lie 微分の定義と一致します。

座標1形式では

$$
d(dx^i)=0,
\qquad
\iota_Xdx^i=X^i
$$

なので右辺は $dX^i$ になります。流れによる定義から左辺も同じになります。

<!-- proof-start -->
### 証明

作用素

$$
C_X:=d\iota_X+\iota_Xd
$$

と置きます。

まず $C_X$ が外積に対する次数0の導分であることを確認します。$\alpha\in\Omega^k(M)$ とすると、

$$
\iota_X(\alpha\wedge\beta)
=
\iota_X\alpha\wedge\beta
+
(-1)^k\alpha\wedge\iota_X\beta
$$

および

$$
d(\alpha\wedge\beta)
=
d\alpha\wedge\beta
+
(-1)^k\alpha\wedge d\beta
$$

を用いて展開します。

まず

$$
d\iota_X(\alpha\wedge\beta)
$$

は

$$
d(\iota_X\alpha)\wedge\beta
+
(-1)^{k-1}
\iota_X\alpha\wedge d\beta
+
(-1)^k
d\alpha\wedge\iota_X\beta
+
\alpha\wedge d\iota_X\beta
$$

となります。

一方、

$$
\iota_Xd(\alpha\wedge\beta)
$$

は

$$
\iota_Xd\alpha\wedge\beta
+
(-1)^{k+1}
d\alpha\wedge\iota_X\beta
+
(-1)^k
\iota_X\alpha\wedge d\beta
+
\alpha\wedge\iota_Xd\beta
$$

となります。

ここで

$$
(-1)^{k-1}+(-1)^k=0,
$$

$$
(-1)^k+(-1)^{k+1}=0
$$

なので交差項が相殺し、

$$
C_X(\alpha\wedge\beta)
=
C_X\alpha\wedge\beta
+
\alpha\wedge C_X\beta
$$

を得ます。

次に Lie 微分も次数0の導分です。各 $t$ について引き戻しが

$$
\Phi_t^*(\alpha\wedge\beta)
=
\Phi_t^*\alpha\wedge\Phi_t^*\beta
$$

を満たすので、$t=0$ で微分して

$$
\mathcal L_X(\alpha\wedge\beta)
=
\mathcal L_X\alpha\wedge\beta
+
\alpha\wedge\mathcal L_X\beta.
$$

従って、局所的に微分形式代数を生成する滑らかな関数と座標1形式で両作用素が一致することを示せば十分です。

滑らかな関数 $f$ に対して

$$
C_Xf
=
d(\iota_Xf)+\iota_X(df)
=
0+df(X)
=
Xf.
$$

一方、

$$
\mathcal L_Xf
=
\left.
\frac{d}{dt}
\right|_{0}
(f\circ\Phi_t)
=
Xf.
$$

よって関数上で一致します。

局所座標 $(x^1,\dots,x^n)$ を取り、

$$
X=\sum_i X^i\partial_i
$$

とします。座標1形式 $dx^i$ に対して

$$
C_X(dx^i)
=
d(\iota_Xdx^i)+\iota_X(d\,dx^i).
$$

ここで

$$
\iota_Xdx^i=X^i,
\qquad
d\,dx^i=d^2x^i=0
$$

なので

$$
C_X(dx^i)=dX^i.
$$

一方、

$$
\Phi_t^*(dx^i)
=
d(x^i\circ\Phi_t)
$$

です。$t$ で微分すると、有限次元の局所座標表示で偏微分と $t$ 微分を交換できるため

$$
\mathcal L_X(dx^i)
=
d
\left(
\left.
\frac{d}{dt}
\right|_0
x^i(\Phi_t(\cdot))
\right).
$$

流れの定義から

$$
\left.
\frac{d}{dt}
\right|_0
x^i(\Phi_t(p))
=
dx^i_p(X_p)
=
X^i(p).
$$

従って

$$
\mathcal L_X(dx^i)
=
dX^i
=
C_X(dx^i).
$$

局所的に任意の微分形式は関数と $dx^i$ の外積の有限和で書け、両辺は次数0の導分として一致するので

$$
\mathcal L_X
=
d\iota_X+\iota_Xd.
$$

$\square$
<!-- proof-end -->

Cartan の公式の利点は、流れを明示的に解かなくても Lie 微分を $d$ と $\iota_X$ だけで計算できることです。

---

## 12. 何が座標依存で、何が座標不変なのか

本章の式を整理すると次のようになります。

局所座標は計算のために使います。

$$
\omega
=
\sum_I a_I dx^I,
$$

$$
d\omega
=
\sum_{I,j}
\partial_j a_I\,dx^j\wedge dx^I.
$$

しかし対象そのものは座標に依存しません。

- $\omega_p$ は $T_pM$ 上の交代多重線形形式
- $F^*\omega$ は $dF_p$ を各引数へ入れることで定義
- $d\omega$ は Lie 括弧を使う座標不変式を持つ
- $\iota_X\omega$ は $X$ を第一引数へ差し込む操作
- $\mathcal L_X\omega$ は流れによる引き戻しの変化率

です。

この「座標で計算できるが、定義された対象は座標に依存しない」という構造が、微分幾何で局所計算を大域的に使える理由です。

---

## 13. 演習

### GEO7-A01 2形式の評価

$\mathbb R^3$ 上で

$$
\omega
=
x\,dx\wedge dy
+
z\,dy\wedge dz
$$

とする。

1. $\omega(\partial_x,\partial_y)$ を求めよ。
2. $\omega(\partial_y,\partial_x)$ を求めよ。
3. $\omega(\partial_y,\partial_z)$ を求めよ。
4. $\omega(\partial_x+\partial_y,\partial_y+\partial_z)$ を求めよ。

- Level: A
- 狙い: 微分形式を単なる記号ではなく交代多重線形形式として評価する

<!-- solution-start -->
**詳細解答**

外積1項ずつ評価します。

$$
(dx\wedge dy)(\partial_x,\partial_y)
=
dx(\partial_x)dy(\partial_y)
-
dx(\partial_y)dy(\partial_x)
=
1.
$$

一方

$$
(dy\wedge dz)(\partial_x,\partial_y)=0
$$

なので

$$
\omega(\partial_x,\partial_y)=x.
$$

交代性から

$$
\omega(\partial_y,\partial_x)=-x.
$$

また

$$
(dx\wedge dy)(\partial_y,\partial_z)=0,
$$

$$
(dy\wedge dz)(\partial_y,\partial_z)=1
$$

なので

$$
\omega(\partial_y,\partial_z)=z.
$$

最後は双線形性を使います。

$$
\begin{aligned}
\omega(\partial_x+\partial_y,\partial_y+\partial_z)
&=
\omega(\partial_x,\partial_y)
+\omega(\partial_x,\partial_z)\\
&\quad+
\omega(\partial_y,\partial_y)
+\omega(\partial_y,\partial_z).
\end{aligned}
$$

交代性から

$$
\omega(\partial_y,\partial_y)=0
$$

であり、各項を計算すると

$$
\omega(\partial_x,\partial_y)=x,
\qquad
\omega(\partial_x,\partial_z)=0,
\qquad
\omega(\partial_y,\partial_z)=z.
$$

従って

$$
\boxed{x+z}.
$$
<!-- solution-end -->

### GEO7-A02 外積の符号

$\mathbb R^4$ で

$$
\alpha=dx+dy,
\qquad
\beta=dz,
\qquad
\gamma=dw
$$

とする。

1. $\alpha\wedge\beta$ を展開せよ。
2. $\beta\wedge\alpha$ と比較せよ。
3. $(\alpha\wedge\beta)\wedge\gamma$ を求めよ。
4. 2形式 $dx\wedge dy$ と $dz\wedge dw$ の交換では符号が変わらないことを確認せよ。

- Level: A
- 狙い: 次数付き交換則を具体計算で確認する

<!-- solution-start -->
**詳細解答**

分配法則から

$$
\alpha\wedge\beta
=
(dx+dy)\wedge dz
=
dx\wedge dz+dy\wedge dz.
$$

1形式どうしの交換では符号が反転するので

$$
\beta\wedge\alpha
=
dz\wedge dx+dz\wedge dy
=
-dx\wedge dz-dy\wedge dz.
$$

従って

$$
\beta\wedge\alpha
=
-\alpha\wedge\beta.
$$

次に

$$
(\alpha\wedge\beta)\wedge\gamma
=
dx\wedge dz\wedge dw
+
dy\wedge dz\wedge dw.
$$

最後に2形式どうしを交換します。次数付き交換則では符号は

$$
(-1)^{2\cdot2}=1
$$

なので

$$
(dx\wedge dy)\wedge(dz\wedge dw)
=
(dz\wedge dw)\wedge(dx\wedge dy).
$$

実際、$dz,dw$ をそれぞれ $dx,dy$ の前へ移すには合計4回の1形式交換が必要で、符号は

$$
(-1)^4=1
$$

です。
<!-- solution-end -->

### GEO7-A03 外微分の計算

$\mathbb R^3$ で

$$
\alpha
=
xy\,dx
+
x^2\,dy
+
yz\,dz
$$

とする。$d\alpha$ を求めよ。

- Level: A
- 狙い: 係数だけを微分し、外積の反対称性で整理する

<!-- solution-start -->
**詳細解答**

各項を別々に微分します。

まず

$$
d(xy\,dx)
=
d(xy)\wedge dx.
$$

$$
d(xy)=y\,dx+x\,dy
$$

なので

$$
d(xy\,dx)
=
(y\,dx+x\,dy)\wedge dx
=
x\,dy\wedge dx
=
-x\,dx\wedge dy.
$$

次に

$$
d(x^2\,dy)
=
2x\,dx\wedge dy.
$$

最後に

$$
d(yz\,dz)
=
(z\,dy+y\,dz)\wedge dz
=
z\,dy\wedge dz.
$$

従って

$$
d\alpha
=
(-x+2x)\,dx\wedge dy
+
z\,dy\wedge dz.
$$

よって

$$
\boxed{
d\alpha
=
x\,dx\wedge dy
+
z\,dy\wedge dz
}.
$$
<!-- solution-end -->

### GEO7-A04 引き戻し

$$
F:\mathbb R^2\to\mathbb R^3,
\qquad
F(u,v)=(u,v,u^2+v^2)
$$

とする。$\mathbb R^3$ 上の2形式

$$
\omega
=
dz\wedge dx
+
x\,dx\wedge dy
$$

について $F^*\omega$ を求めよ。

- Level: A
- 狙い: 座標1形式を先に引き戻してから外積を計算する

<!-- solution-start -->
**詳細解答**

標的座標 $(x,y,z)$ に対して

$$
F^*x=u,
\qquad
F^*y=v,
\qquad
F^*z=u^2+v^2.
$$

従って

$$
F^*dx=du,
$$

$$
F^*dy=dv,
$$

$$
F^*dz=2u\,du+2v\,dv.
$$

第一項は

$$
F^*(dz\wedge dx)
=
(2u\,du+2v\,dv)\wedge du.
$$

$du\wedge du=0$ なので

$$
F^*(dz\wedge dx)
=
2v\,dv\wedge du
=
-2v\,du\wedge dv.
$$

第二項は

$$
F^*(x\,dx\wedge dy)
=
u\,du\wedge dv.
$$

したがって

$$
\boxed{
F^*\omega
=
(u-2v)\,du\wedge dv
}.
$$
<!-- solution-end -->

### GEO7-B01 $d^2=0$ を具体式で追う

$\mathbb R^3$ 上の1形式

$$
\alpha
=
P\,dx+Q\,dy+R\,dz
$$

を考える。$P,Q,R$ は滑らかな関数とする。

1. $d\alpha$ を $dx\wedge dy,dy\wedge dz,dz\wedge dx$ の係数で書け。
2. $d(d\alpha)=0$ を、混合偏導関数の交換を明示して確認せよ。

- Level: B
- 狙い: $d^2=0$ の一般証明を3次元の係数計算へ落とす

<!-- solution-start -->
**詳細解答**

まず

$$
d(P\,dx)=dP\wedge dx.
$$

$$
dP=P_xdx+P_ydy+P_zdz
$$

なので

$$
d(P\,dx)
=
-P_y\,dx\wedge dy
+
P_z\,dz\wedge dx.
$$

同様に

$$
d(Q\,dy)
=
Q_x\,dx\wedge dy
-
Q_z\,dy\wedge dz,
$$

$$
d(R\,dz)
=
R_y\,dy\wedge dz
-
R_x\,dz\wedge dx.
$$

従って

$$
d\alpha
=
(Q_x-P_y)\,dx\wedge dy
+
(R_y-Q_z)\,dy\wedge dz
+
(P_z-R_x)\,dz\wedge dx.
$$

もう一度 $d$ を取ります。

第一項から $dx\wedge dy$ に重複しない $dz$ 成分だけが残るので

$$
d\bigl((Q_x-P_y)dx\wedge dy\bigr)
=
(Q_{xz}-P_{yz})\,dz\wedge dx\wedge dy.
$$

これは循環置換なので

$$
dz\wedge dx\wedge dy
=
dx\wedge dy\wedge dz.
$$

第二項は

$$
d\bigl((R_y-Q_z)dy\wedge dz\bigr)
=
(R_{yx}-Q_{zx})
dx\wedge dy\wedge dz.
$$

第三項は

$$
d\bigl((P_z-R_x)dz\wedge dx\bigr)
=
(P_{zy}-R_{xy})
dy\wedge dz\wedge dx.
$$

こちらも循環置換なので

$$
dy\wedge dz\wedge dx
=
dx\wedge dy\wedge dz.
$$

したがって係数は

$$
Q_{xz}-P_{yz}
+
R_{yx}-Q_{zx}
+
P_{zy}-R_{xy}.
$$

滑らかさから

$$
Q_{xz}=Q_{zx},
\qquad
P_{yz}=P_{zy},
\qquad
R_{yx}=R_{xy}
$$

なので全て相殺し、

$$
\boxed{d(d\alpha)=0}.
$$
<!-- solution-end -->

### GEO7-B02 引き戻しと外微分

$$
F:\mathbb R^2\to\mathbb R^2,
\qquad
F(u,v)=(u^2-v^2,2uv)
$$

とし、標的座標を $(x,y)$ とする。

$$
\alpha
=
x\,dy-y\,dx
$$

について、次の二通りを別々に計算し、一致することを確認せよ。

1. $d(F^*\alpha)$
2. $F^*(d\alpha)$

- Level: B
- 狙い: 外微分の自然性を具体的な非線形写像で検証する

<!-- solution-start -->
**詳細解答**

まず

$$
F^*x=u^2-v^2,
\qquad
F^*y=2uv.
$$

したがって

$$
F^*dx=2u\,du-2v\,dv,
$$

$$
F^*dy=2v\,du+2u\,dv.
$$

よって

$$
F^*\alpha
=
(u^2-v^2)(2v\,du+2u\,dv)
-
2uv(2u\,du-2v\,dv).
$$

$du$ の係数は

$$
2v(u^2-v^2)-4u^2v
=
-2v(u^2+v^2),
$$

$dv$ の係数は

$$
2u(u^2-v^2)+4uv^2
=
2u(u^2+v^2).
$$

従って

$$
F^*\alpha
=
-2v(u^2+v^2)\,du
+
2u(u^2+v^2)\,dv.
$$

外微分を取ると

$$
d(F^*\alpha)
=
d[-2v(u^2+v^2)]\wedge du
+
d[2u(u^2+v^2)]\wedge dv.
$$

第一係数の $dv$ 微分は

$$
-2u^2-6v^2,
$$

第二係数の $du$ 微分は

$$
6u^2+2v^2.
$$

従って

$$
d(F^*\alpha)
=
(2u^2+6v^2)\,du\wedge dv
+
(6u^2+2v^2)\,du\wedge dv.
$$

よって

$$
d(F^*\alpha)
=
8(u^2+v^2)\,du\wedge dv.
$$

次に

$$
d\alpha
=
d(x\,dy)-d(y\,dx)
=
dx\wedge dy-dy\wedge dx
=
2dx\wedge dy.
$$

したがって

$$
F^*(d\alpha)
=
2F^*dx\wedge F^*dy.
$$

$$
(2u\,du-2v\,dv)\wedge(2v\,du+2u\,dv)
=
4(u^2+v^2)\,du\wedge dv
$$

なので

$$
F^*(d\alpha)
=
8(u^2+v^2)\,du\wedge dv.
$$

従って

$$
\boxed{
d(F^*\alpha)=F^*(d\alpha)
}.
$$
<!-- solution-end -->

### GEO7-B03 [Cartan の公式](#thm-geo7-cartan-formula)の具体計算

$\mathbb R^2$ 上で

$$
X=x\partial_x+y\partial_y,
\qquad
\omega=x\,dy-y\,dx
$$

とする。

1. $\iota_X\omega$ を求めよ。
2. $d\omega$ を求めよ。
3. [Cartan の公式](#thm-geo7-cartan-formula)から $\mathcal L_X\omega$ を求めよ。
4. $X$ の流れ
   $$
   \Phi_t(x,y)=(e^tx,e^ty)
   $$
   を使って定義から同じ結果を確認せよ。

- Level: B
- 狙い: 内部積・外微分・Lie 微分を一つの計算で接続する

<!-- solution-start -->
**詳細解答**

まず

$$
\omega(X)
=
x\,dy(X)-y\,dx(X).
$$

$$
dy(X)=y,
\qquad
dx(X)=x
$$

なので

$$
\iota_X\omega
=
xy-yx
=
0.
$$

次に

$$
d\omega
=
d(x\,dy)-d(y\,dx)
=
dx\wedge dy-dy\wedge dx
=
2dx\wedge dy.
$$

従って

$$
\iota_X(d\omega)
=
2\iota_X(dx\wedge dy).
$$

内部積の公式から

$$
\iota_X(dx\wedge dy)
=
dx(X)\,dy-dy(X)\,dx
=
x\,dy-y\,dx
=
\omega.
$$

したがって

$$
\iota_X(d\omega)=2\omega.
$$

[Cartan の公式](#thm-geo7-cartan-formula)より

$$
\mathcal L_X\omega
=
d(\iota_X\omega)+\iota_X(d\omega)
=
0+2\omega.
$$

よって

$$
\boxed{
\mathcal L_X\omega=2\omega
}.
$$

流れからも確認します。

$$
\Phi_t^*x=e^tx,
\qquad
\Phi_t^*y=e^ty,
$$

$$
\Phi_t^*dx=e^tdx,
\qquad
\Phi_t^*dy=e^tdy.
$$

従って

$$
\Phi_t^*\omega
=
(e^tx)(e^tdy)
-
(e^ty)(e^tdx)
=
e^{2t}\omega.
$$

$t=0$ で微分すると

$$
\mathcal L_X\omega
=
\left.\frac{d}{dt}\right|_0 e^{2t}\omega
=
2\omega.
$$

[Cartan の公式](#thm-geo7-cartan-formula)から得た結果と一致します。
<!-- solution-end -->

### GEO7-C01 [Cartan の公式](#thm-geo7-cartan-formula)から可換子恒等式を導く

$X,Y$ を滑らかなベクトル場とする。任意の微分形式 $\omega$ に対して

$$
[\mathcal L_X,\iota_Y]\omega
:=
\mathcal L_X(\iota_Y\omega)
-
\iota_Y(\mathcal L_X\omega)
$$

を考える。

次を示せ。

$$
\boxed{
[\mathcal L_X,\iota_Y]
=
\iota_{[X,Y]}
}.
$$

必要なら、まず0形式と1形式で確認し、その後外積に対する導分性を使ってよい。

- Level: C
- 狙い: [Cartan の公式](#thm-geo7-cartan-formula)・Lie 括弧・内部積が同じ微分形式代数上で整合することを証明する

<!-- solution-start -->
**詳細解答**

両辺は次数を1下げる演算です。局所的に微分形式代数は滑らかな関数と座標1形式で生成されるので、両辺が外積に対する同じ次数の導分であることを確認した上で、0形式と1形式で一致を示します。

まず0形式 $f$ では

$$
\iota_Yf=0
$$

なので

$$
[\mathcal L_X,\iota_Y]f=0.
$$

右辺も

$$
\iota_{[X,Y]}f=0
$$

です。

次に1形式 $\alpha$ を取ります。$\iota_Y\alpha=\alpha(Y)$ は関数なので

$$
\mathcal L_X(\iota_Y\alpha)
=
X(\alpha(Y)).
$$

一方、[Cartan の公式](#thm-geo7-cartan-formula)から1形式に対する Lie 微分は

$$
\mathcal L_X\alpha
=
d(\alpha(X))+\iota_X(d\alpha).
$$

しかしここでは、外微分の座標不変式から得られる1形式の場合の公式

$$
d\alpha(X,Y)
=
X(\alpha(Y))
-
Y(\alpha(X))
-
\alpha([X,Y])
$$

を使う方が直接的です。

[Cartan の公式](#thm-geo7-cartan-formula)を $Y$ に評価すると

$$
(\mathcal L_X\alpha)(Y)
=
d(\alpha(X))(Y)+(\iota_Xd\alpha)(Y).
$$

第一項は

$$
Y(\alpha(X)).
$$

第二項は

$$
d\alpha(X,Y)
=
X(\alpha(Y))
-
Y(\alpha(X))
-
\alpha([X,Y]).
$$

従って

$$
(\mathcal L_X\alpha)(Y)
=
X(\alpha(Y))
-
\alpha([X,Y]).
$$

よって

$$
\begin{aligned}
[\mathcal L_X,\iota_Y]\alpha
&=
X(\alpha(Y))
-
(\mathcal L_X\alpha)(Y)\\
&=
\alpha([X,Y])\\
&=
\iota_{[X,Y]}\alpha.
\end{aligned}
$$

1形式で一致しました。

最後に導分性を確認します。$\iota_Y$ は次数 $-1$ の導分、$\mathcal L_X$ は次数0の導分なので、その可換子

$$
[\mathcal L_X,\iota_Y]
$$

も次数 $-1$ の導分です。右辺 $\iota_{[X,Y]}$ も内部積なので次数 $-1$ の導分です。

局所的に任意の微分形式は関数と1形式の外積の有限和で生成されます。両作用素は生成元上で一致し、同じ次数の導分なので全ての微分形式上で一致します。

したがって

$$
\boxed{
[\mathcal L_X,\iota_Y]
=
\iota_{[X,Y]}
}.
$$
<!-- solution-end -->

---

## 14. 次章への橋

本章で

$$
\Omega^0(M)
\xrightarrow{d}
\Omega^1(M)
\xrightarrow{d}
\Omega^2(M)
\xrightarrow{d}
\cdots
$$

という列ができ、

$$
d^2=0
$$

を証明しました。

次の GEO8 では、向き付けられた多様体上で最高次形式を積分し、

$$
\int_M d\omega
=
\int_{\partial M}\omega
$$

という一般 Stokes の定理へ進みます。

その後の GEO9 では、$d\omega=0$ なのに $\omega=d\eta$ と書けないことがある、という「局所微分と大域位相のずれ」を de Rham コホモロジーとして整理します。
