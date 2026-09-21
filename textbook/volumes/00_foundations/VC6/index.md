# VC6 曲線座標の幾何と微分演算子

Cartesian 座標では基底ベクトル $e_x,e_y,e_z$ がどこでも同じ向きを向くため、勾配・発散・回転 の公式は簡単です。

しかし理論物理や PDE では、

- 円柱対称なら 円柱座標
- 球対称なら 球座標

を使いたくなります。このとき基底ベクトル 自身が位置によって回転し、座標の一目盛りの物理的長さも場所によって変わります。

本章では公式を暗記せず、

$$
\text{coordinate tangent}
\to
\text{scale factor}
\to
\text{線素・面素・体積要素}
\to
\text{grad・div・curl・Laplacian}
$$

の順に再構成します。

---

## 1. 曲線座標と 座標接ベクトル

開領域 $Q\subset\mathbb R^3$ から Euclidean 空間への $C^1$ 座標写像

$$
r=r(q_1,q_2,q_3)
$$

を考えます。

各座標だけを動かしたときの接ベクトル は

$$
a_i
:=
\frac{\partial r}{\partial q_i}
\qquad(i=1,2,3)
$$

です。

<a id="def-vc6-orthogonal-curvilinear"></a>

<!-- formal-statement-start -->
> **定義（直交曲線座標）**  
> $C^1$ 座標写像
>
$$
r:Q\to\mathbb R^3
$$
>
> が各点で正則、すなわち
>
$$
\det Dr\ne0
$$
>
> を満たし、さらに 座標接ベクトル
>
$$
a_i=\frac{\partial r}{\partial q_i}
$$
>
> が
>
$$
a_i\cdot a_j=0
\qquad(i\ne j)
$$
>
> を満たすとき、$(q_1,q_2,q_3)$ をその領域の **直交曲線座標** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc6-orthogonal-curvilinear -->
**定義の確認**

例：円柱座標

$\rho>0$ で

$$
r(\rho,\phi,z)
=
(\rho\cos\phi,\rho\sin\phi,z)
$$

とします。座標接ベクトル は

$$
r_\rho=(\cos\phi,\sin\phi,0),
$$

$$
r_\phi=(-\rho\sin\phi,\rho\cos\phi,0),
$$

$$
r_z=(0,0,1).
$$

三本は互いに直交し、

$$
\det(r_\rho,r_\phi,r_z)=\rho\ne0.
$$

したがって $\rho>0$ の領域では、$(\rho,\phi,z)$ は定義の正則性と直交性を実際に満たす直交曲線座標です。
<!-- definition-example-end -->

直交性は「座標曲線が交わるときに直角」という意味です。ただし各 $a_i$ の長さは 1 とは限りません。

---

## 2. 座標方向の長さ補正と位置依存 正規直交基底

<a id="def-vc6-scale-factor"></a>

<!-- formal-statement-start -->
> **定義（尺度因子と位置依存正規直交基底）**  
> 直交曲線座標に対して
>
$$
h_i
:=
\left|
\frac{\partial r}{\partial q_i}
\right|
=
|a_i|
>0
$$
>
> を **尺度因子** とし、
>
$$
e_i
:=
\frac{a_i}{h_i}
$$
>
> と置く。
>
> このとき $e_1,e_2,e_3$ は各点で 正規直交基底 をなす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc6-scale-factor -->
**定義の確認**

例：円柱座標

$$
r(\rho,\phi,z)
=
(\rho\cos\phi,\rho\sin\phi,z)
$$

では

$$
r_\rho
=
(\cos\phi,\sin\phi,0),
$$

$$
r_\phi
=
(-\rho\sin\phi,\rho\cos\phi,0),
$$

$$
r_z=(0,0,1).
$$

互いの内積は 0 で、

$$
h_\rho=1,
\qquad
h_\phi=\rho,
\qquad
h_z=1.
$$

したがって

$$
e_\rho=(\cos\phi,\sin\phi,0),
$$

$$
e_\phi=(-\sin\phi,\cos\phi,0),
$$

$$
e_z=(0,0,1).
$$

ここで $e_\rho,e_\phi$ は $\phi$ とともに回転します。Cartesian 基底 と違い、**成分が一定でも ベクトル場 自体が一定とは限りません。**
<!-- definition-example-end -->

---

## 3. 線素・面素・体積要素

微小変位は

$$
dr
=
a_1\,dq_1+a_2\,dq_2+a_3\,dq_3
=
h_1e_1\,dq_1+h_2e_2\,dq_2+h_3e_3\,dq_3.
$$

<a id="prop-vc6-elements"></a>

<!-- formal-statement-start -->
> **命題（線素・面素・体積要素）**  
> 右手系をなす直交曲線座標で、
>
$$
ds^2
=
h_1^2dq_1^2+h_2^2dq_2^2+h_3^2dq_3^2.
$$
>
> $q_i=\text{const}$ の座標面について、$\{i,j,k\}=\{1,2,3\}$ とすれば
>
$$
dS_i
=
h_jh_k\,dq_j\,dq_k.
$$
>
> また体積要素は
>
$$
\boxed{
dV
=
h_1h_2h_3\,dq_1dq_2dq_3
}
$$
>
> であり、
>
$$
|\det Dr|
=
h_1h_2h_3.
$$
<!-- formal-statement-end -->

### 証明の見取り図

直交しているので、微小 座標直方体 の三辺の長さは

$$
h_1dq_1,\quad h_2dq_2,\quad h_3dq_3
$$

です。面積は二辺の積、体積は三辺の積になります。Jacobian は三つの 座標接ベクトル の スカラー三重積 です。

<!-- proof-start -->
### 証明

直交性から

$$
dr\cdot dr
=
\sum_{i=1}^3
h_i^2dq_i^2,
$$

なので線素公式を得ます。

$q_1=\text{const}$ の座標面の二つの 接ベクトル は

$$
a_2=h_2e_2,
\qquad
a_3=h_3e_3.
$$

したがって

$$
|a_2\times a_3|
=
h_2h_3|e_2\times e_3|
=
h_2h_3.
$$

よって

$$
dS_1=h_2h_3\,dq_2dq_3.
$$

他の座標面も巡回的に同様です。

最後に

$$
|\det Dr|
=
|a_1\cdot(a_2\times a_3)|.
$$

右手系では

$$
e_1\cdot(e_2\times e_3)=1
$$

なので

$$
|\det Dr|
=
h_1h_2h_3.
$$

RA7 の [多変数変数変換定理](../RA7/index.md#thm-ra7-change-of-variables) から

$$
dV
=
|\det Dr|\,dq_1dq_2dq_3
=
h_1h_2h_3\,dq_1dq_2dq_3.
$$
<!-- proof-end -->

尺度因子 は単なる補助記号ではなく、幾何学的な長さ・面積・体積の倍率そのものです。

---

## 4. 勾配 は全微分から出る

スカラー場 $f$ を $q$ の関数として書くと

$$
df
=
\frac{\partial f}{\partial q_1}dq_1
+
\frac{\partial f}{\partial q_2}dq_2
+
\frac{\partial f}{\partial q_3}dq_3.
$$

一方、勾配 の定義から

$$
df
=
\nabla f\cdot dr.
$$

<a id="prop-vc6-gradient"></a>

<!-- formal-statement-start -->
> **命題（直交曲線座標の勾配）**  
> $f$ が $C^1$ なら
>
$$
\boxed{
\nabla f
=
\sum_{i=1}^3
\frac{1}{h_i}
\frac{\partial f}{\partial q_i}
e_i
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
dr
=
\sum_i h_ie_i\,dq_i
$$

なので

$$
\nabla f\cdot dr
=
\sum_i
h_i(\nabla f\cdot e_i)\,dq_i.
$$

これを

$$
df
=
\sum_i f_{q_i}\,dq_i
$$

と係数比較すると

$$
\nabla f\cdot e_i
=
\frac1{h_i}f_{q_i}.
$$

従って

$$
\nabla f
=
\sum_i
\frac1{h_i}f_{q_i}e_i.
$$
<!-- proof-end -->

勾配 の公式は 暗記 ではなく、**一目盛りの物理長さが $h_i\,dq_i$ であることの補正**です。

---

## 5. 発散 は微小 座標直方体 の 流束収支

ベクトル場 を 正規直交基底 で

$$
A
=
A_1e_1+A_2e_2+A_3e_3
$$

と書きます。

$q_1$ 方向の向かい合う二面の面積は局所的に

$$
h_2h_3\,dq_2dq_3.
$$

そこを通る 正味の外向き 流束 は一次まで

$$
\frac{\partial}{\partial q_1}
(h_2h_3A_1)
\,dq_1dq_2dq_3
$$

です。

<a id="prop-vc6-divergence"></a>

<!-- formal-statement-start -->
> **命題（直交曲線座標の発散）**  
> $A=A_1e_1+A_2e_2+A_3e_3$ が $C^1$ なら
>
$$
\boxed{
\nabla\cdot A
=
\frac{1}{h_1h_2h_3}
\left[
\frac{\partial}{\partial q_1}(h_2h_3A_1)
+
\frac{\partial}{\partial q_2}(h_3h_1A_2)
+
\frac{\partial}{\partial q_3}(h_1h_2A_3)
\right]
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

微小 座標直方体 の六面 流束 を足し、体積

$$
h_1h_2h_3\,dq_1dq_2dq_3
$$

で割ります。VC1 で見た「単位体積あたりの 正味の外向き 流束」という 発散 の意味を曲線座標へ移したものです。

<!-- proof-start -->
### 証明

$q_1$ 方向の面に現れる量を

$$
B_1(q_1,q_2,q_3)
:=
h_2h_3A_1
$$

と置きます。

微小 座標直方体 の $q_1$ 正側の面では 外向き 流束 が

$$
B_1(q_1+dq_1,q_2,q_3)\,dq_2dq_3,
$$

負側の面では 外向き法線 が逆なので

$$
-B_1(q_1,q_2,q_3)\,dq_2dq_3
$$

です。

したがってこの二面の和は

$$
\left[
B_1(q_1+dq_1,q_2,q_3)-B_1(q_1,q_2,q_3)
\right]dq_2dq_3.
$$

一次まで展開すると

$$
\frac{\partial B_1}{\partial q_1}
\,dq_1dq_2dq_3
+
o(dq_1dq_2dq_3).
$$

同じ計算を残り二方向へ行うと、正味の 流束 は

$$
\left[
\partial_{q_1}(h_2h_3A_1)
+
\partial_{q_2}(h_3h_1A_2)
+
\partial_{q_3}(h_1h_2A_3)
\right]
dq_1dq_2dq_3
$$

に高次の項を加えたものです。

一方、座標直方体 の体積は主項として

$$
h_1h_2h_3\,dq_1dq_2dq_3
$$

です。

正味の 流束 を体積で割って直方体を一点へ縮めると高次項が消え、

$$
\nabla\cdot A
=
\frac{1}{h_1h_2h_3}
\left[
\partial_{q_1}(h_2h_3A_1)
+
\partial_{q_2}(h_3h_1A_2)
+
\partial_{q_3}(h_1h_2A_3)
\right].
$$
<!-- proof-end -->

Cartesian 座標では $h_1=h_2=h_3=1$ なので通常公式へ戻ります。

---

## 6. 回転 は微小 座標長方形 の 循環

$(\nabla\times A)\cdot e_1$ を求めるには、$q_1=\text{const}$ の微小長方形を考えます。

その面積は

$$
h_2h_3\,dq_2dq_3.
$$

境界循環の一次項は

$$
\left[
\frac{\partial}{\partial q_2}(h_3A_3)
-
\frac{\partial}{\partial q_3}(h_2A_2)
\right]dq_2dq_3.
$$

<a id="prop-vc6-curl"></a>

<!-- formal-statement-start -->
> **命題（直交曲線座標の回転）**  
> $A=A_1e_1+A_2e_2+A_3e_3$ が $C^1$ なら
>
$$
\boxed{
(\nabla\times A)_1
=
\frac{1}{h_2h_3}
\left[
\frac{\partial}{\partial q_2}(h_3A_3)
-
\frac{\partial}{\partial q_3}(h_2A_2)
\right]
}
$$
>
> であり、残り二成分は添字を巡回置換して
>
$$
(\nabla\times A)_2
=
\frac{1}{h_3h_1}
\left[
\frac{\partial}{\partial q_3}(h_1A_1)
-
\frac{\partial}{\partial q_1}(h_3A_3)
\right],
$$
>
$$
(\nabla\times A)_3
=
\frac{1}{h_1h_2}
\left[
\frac{\partial}{\partial q_1}(h_2A_2)
-
\frac{\partial}{\partial q_2}(h_1A_1)
\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

VC5 で 回転 は単位面積あたりの循環密度でした。各辺の線素は $h_i\,dq_i$ なので、四辺の 循環 を足して $h_jh_k\,dq_jdq_k$ で割れば公式が出ます。

<!-- proof-start -->
### 証明

$q_1$ を固定し、$(q_2,q_3)$ 平面の正向き微小長方形を考えます。

基点を $(q_2,q_3)$ とすると、四辺の 循環 の主項は

$$
h_2A_2(q_2,q_3)\,dq_2
+
h_3A_3(q_2+dq_2,q_3)\,dq_3
$$

$$
-
h_2A_2(q_2,q_3+dq_3)\,dq_2
-
h_3A_3(q_2,q_3)\,dq_3.
$$

ここで $h_iA_i$ の他の固定座標は省略して書いています。

第二辺と第四辺の差は

$$
\partial_{q_2}(h_3A_3)\,dq_2dq_3
+
o(dq_2dq_3),
$$

第一辺と第三辺の差は

$$
-\partial_{q_3}(h_2A_2)\,dq_2dq_3
+
o(dq_2dq_3).
$$

よって全循環は

$$
\left[
\partial_{q_2}(h_3A_3)
-
\partial_{q_3}(h_2A_2)
\right]
dq_2dq_3
+
o(dq_2dq_3).
$$

一方、この 座標長方形 の面積は主項として

$$
h_2h_3\,dq_2dq_3
$$

です。

VC5 の [回転 の循環密度](../VC5/index.md#prop-vc5-curl-density) により、循環を面積で割って長方形を一点へ縮めた極限が $(\nabla\times A)\cdot e_1$ です。

したがって

$$
(\nabla\times A)_1
=
\frac1{h_2h_3}
\left[
\partial_{q_2}(h_3A_3)
-
\partial_{q_3}(h_2A_2)
\right].
$$

他の二成分は座標を巡回置換して同様に得られます。
<!-- proof-end -->

---

## 7. スカラー・ラプラシアンは勾配の発散

<a id="prop-vc6-scalar-laplacian"></a>

<!-- formal-statement-start -->
> **命題（直交曲線座標のスカラー・ラプラシアン）**  
> $f\in C^2$ なら
>
$$
\boxed{
\Delta f
=
\frac{1}{h_1h_2h_3}
\sum_{i=1}^3
\frac{\partial}{\partial q_i}
\left(
\frac{h_1h_2h_3}{h_i^2}
\frac{\partial f}{\partial q_i}
\right)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[直交曲線座標の勾配](#prop-vc6-gradient) から

$$
(\nabla f)_i
=
\frac1{h_i}f_{q_i}.
$$

これを [直交曲線座標の発散](#prop-vc6-divergence) に代入します。

第一項は

$$
\frac{1}{h_1h_2h_3}
\frac{\partial}{\partial q_1}
\left(
h_2h_3\frac1{h_1}f_{q_1}
\right)
=
\frac{1}{h_1h_2h_3}
\frac{\partial}{\partial q_1}
\left(
\frac{h_1h_2h_3}{h_1^2}f_{q_1}
\right).
$$

他の二項も同様なので主張を得ます。
<!-- proof-end -->

---

## 8. 円柱座標

$$
x=\rho\cos\phi,
\qquad
y=\rho\sin\phi,
\qquad
z=z
$$

とします。

すでに確認した通り

$$
h_\rho=1,
\qquad
h_\phi=\rho,
\qquad
h_z=1.
$$

<a id="prop-vc6-円柱座標"></a>

<!-- formal-statement-start -->
> **命題（円柱座標の公式）**  
> $\rho>0$ で
>
$$
\nabla f
=
e_\rho\frac{\partial f}{\partial\rho}
+
e_\phi\frac1\rho\frac{\partial f}{\partial\phi}
+
e_z\frac{\partial f}{\partial z},
$$
>
$$
\nabla\cdot A
=
\frac1\rho
\frac{\partial}{\partial\rho}(\rho A_\rho)
+
\frac1\rho
\frac{\partial A_\phi}{\partial\phi}
+
\frac{\partial A_z}{\partial z},
$$
>
$$
\nabla\times A
=
e_\rho
\left(
\frac1\rho\frac{\partial A_z}{\partial\phi}
-
\frac{\partial A_\phi}{\partial z}
\right)
+
e_\phi
\left(
\frac{\partial A_\rho}{\partial z}
-
\frac{\partial A_z}{\partial\rho}
\right)
$$
>
$$
\qquad\qquad
+
e_z
\left[
\frac1\rho
\frac{\partial}{\partial\rho}(\rho A_\phi)
-
\frac1\rho
\frac{\partial A_\rho}{\partial\phi}
\right],
$$
>
$$
\Delta f
=
\frac1\rho
\frac{\partial}{\partial\rho}
\left(
\rho\frac{\partial f}{\partial\rho}
\right)
+
\frac1{\rho^2}
\frac{\partial^2 f}{\partial\phi^2}
+
\frac{\partial^2 f}{\partial z^2}.
$$
<!-- formal-statement-end -->

これらは一般公式へ

$$
(h_1,h_2,h_3)=(1,\rho,1)
$$

を代入しただけです。

### 基底 自身が回る

$$
e_\rho=(\cos\phi,\sin\phi,0),
$$

$$
e_\phi=(-\sin\phi,\cos\phi,0)
$$

なので

$$
\frac{\partial e_\rho}{\partial\phi}
=
e_\phi,
\qquad
\frac{\partial e_\phi}{\partial\phi}
=
-e_\rho.
$$

この項があるため、ベクトル場 の微分では「物理成分だけを微分」してはいけません。

---

## 9. 例：軸対称方位角方向場

$$
A=A_\phi(\rho)e_\phi
$$

とし、$\phi,z$ に依存しないとします。

発散 は

$$
\nabla\cdot A=0.
$$

回転 は $z$ 成分だけが残り、

$$
\nabla\times A
=
e_z
\frac1\rho
\frac{d}{d\rho}
(\rho A_\phi).
$$

特に 剛体回転型

$$
A_\phi(\rho)=\Omega\rho
$$

では

$$
\nabla\times A
=
e_z
\frac1\rho
\frac{d}{d\rho}(\Omega\rho^2)
=
2\Omega e_z.
$$

VC1 の Cartesian 計算 $(-\Omega y,\Omega x,0)$ と一致します。

---

## 10. 球座標

本章では

$$
x=r\sin\theta\cos\phi,
$$

$$
y=r\sin\theta\sin\phi,
$$

$$
z=r\cos\theta
$$

を使います。

$\theta$ は $+z$ 軸から測る 極角、$\phi$ は $xy$ 平面内の 方位角 です。

微分すると

$$
h_r=1,
\qquad
h_\theta=r,
\qquad
h_\phi=r\sin\theta.
$$

したがって体積要素は

$$
dV
=
r^2\sin\theta\,dr\,d\theta\,d\phi.
$$

これは RA7 の球座標 Jacobian と一致します。

<a id="prop-vc6-球座標"></a>

<!-- formal-statement-start -->
> **命題（球座標の公式）**  
> $r>0$ かつ $0<\theta<\pi$ で
>
$$
\nabla f
=
e_r\frac{\partial f}{\partial r}
+
e_\theta\frac1r\frac{\partial f}{\partial\theta}
+
e_\phi\frac1{r\sin\theta}\frac{\partial f}{\partial\phi},
$$
>
$$
\nabla\cdot A
=
\frac1{r^2}
\frac{\partial}{\partial r}(r^2A_r)
+
\frac1{r\sin\theta}
\frac{\partial}{\partial\theta}(\sin\theta A_\theta)
+
\frac1{r\sin\theta}
\frac{\partial A_\phi}{\partial\phi},
$$
>
$$
\nabla\times A
=
e_r
\frac1{r\sin\theta}
\left[
\frac{\partial}{\partial\theta}(\sin\theta A_\phi)
-
\frac{\partial A_\theta}{\partial\phi}
\right]
$$
>
$$
\qquad
+
e_\theta
\frac1r
\left[
\frac1{\sin\theta}
\frac{\partial A_r}{\partial\phi}
-
\frac{\partial}{\partial r}(rA_\phi)
\right]
+
e_\phi
\frac1r
\left[
\frac{\partial}{\partial r}(rA_\theta)
-
\frac{\partial A_r}{\partial\theta}
\right],
$$
>
$$
\Delta f
=
\frac1{r^2}
\frac{\partial}{\partial r}
\left(
r^2\frac{\partial f}{\partial r}
\right)
+
\frac1{r^2\sin\theta}
\frac{\partial}{\partial\theta}
\left(
\sin\theta\frac{\partial f}{\partial\theta}
\right)
+
\frac1{r^2\sin^2\theta}
\frac{\partial^2f}{\partial\phi^2}.
$$
<!-- formal-statement-end -->

### 球座標基底 の位置依存

$$
e_r
=
(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta),
$$

$$
e_\theta
=
(\cos\theta\cos\phi,\cos\theta\sin\phi,-\sin\theta),
$$

$$
e_\phi
=
(-\sin\phi,\cos\phi,0).
$$

従って

$$
\partial_\theta e_r=e_\theta,
\qquad
\partial_\theta e_\theta=-e_r,
\qquad
\partial_\theta e_\phi=0,
$$

$$
\partial_\phi e_r
=
\sin\theta\,e_\phi,
$$

$$
\partial_\phi e_\theta
=
\cos\theta\,e_\phi,
$$

$$
\partial_\phi e_\phi
=
-\sin\theta\,e_r
-
\cos\theta\,e_\theta.
$$

これが 球座標でのベクトル解析 に現れる追加項の源です。

---

## 11. 放射対称スカラー場

$f=f(r)$ だけに依存するなら 角度方向の微分項 は消えて

$$
\nabla f=f'(r)e_r,
$$

$$
\boxed{
\Delta f
=
\frac1{r^2}
\frac{d}{dr}
\left(
r^2f'(r)
\right)
=
f''(r)+\frac2r f'(r)
}.
$$

例えば

$$
f(r)=\frac1r
$$

では $r>0$ で

$$
f'(r)=-\frac1{r^2},
\qquad
f''(r)=\frac2{r^3},
$$

なので

$$
\Delta\frac1r
=
\frac2{r^3}
-
\frac2{r^3}
=
0.
$$

ただし $r=0$ では $1/r$ 自体が未定義です。PDE6 の 基本解 と同じく、**原点を含む領域へこの計算をそのまま延長してはいけません。**

---

## 12. 逆二乗放射状場

$$
A
=
\frac{C}{r^2}e_r
$$

とします。

$r>0$ では

$$
\nabla\cdot A
=
\frac1{r^2}
\frac{d}{dr}
\left(
r^2\frac{C}{r^2}
\right)
=
0.
$$

一方、半径 $R$ の球面では

$$
A\cdot n
=
\frac{C}{R^2},
$$

したがって

$$
\int_{S_R}A\cdot n\,dS
=
\frac{C}{R^2}
4\pi R^2
=
4\pi C.
$$

これは VC4 の特異場と同じ現象です。原点を含む球へ [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) を直接適用できないのは、$A$ が $r=0$ で $C^1$ どころか未定義だからです。

---

## 13. 座標の退化と 場自体の未定義性は別物

円柱座標 では $\rho=0$ で $\phi$ が定まりません。

球座標 では

- $r=0$
- $\theta=0,\pi$

で一部の座標や 基底 が退化します。

これは **座標表示の退化** であり、元の ベクトル場 が未定義だとは限りません。

例えば Cartesian 座標で表した場

$$
F=(1,0,0)
$$

は原点で完全に滑らかですが、球座標成分 は角度に依存し、$r=0$ で 球座標基底 自体が定まりません。

逆に

$$
\frac{1}{r^2}e_r
$$

は原点で 場自体が未定義で、長さも発散します。

この区別は PDE・電磁気・流体で重要です。

---

## 14. ベクトル・ラプラシアン：成分ごとの スカラー・ラプラシアン ではない

Euclidean 三次元で ベクトル・ラプラシアン は

$$
\boxed{
\Delta A
=
\nabla(\nabla\cdot A)
-
\nabla\times(\nabla\times A)
}
$$

として扱えます。

Cartesian 基底 は一定なので

$$
\Delta A
=
(\Delta A_x,\Delta A_y,\Delta A_z)
$$

です。

しかし曲線座標では 基底 が位置依存なので、物理成分 $A_i$ に スカラー・ラプラシアン を一つずつかけるだけでは不足します。

円柱座標 では、右辺の $\Delta$ を スカラー・ラプラシアン として

$$
(\Delta A)_\rho
=
\Delta A_\rho
-
\frac{A_\rho}{\rho^2}
-
\frac{2}{\rho^2}
\frac{\partial A_\phi}{\partial\phi},
$$

$$
(\Delta A)_\phi
=
\Delta A_\phi
-
\frac{A_\phi}{\rho^2}
+
\frac{2}{\rho^2}
\frac{\partial A_\rho}{\partial\phi},
$$

$$
(\Delta A)_z
=
\Delta A_z.
$$

例えば

$$
A=e_\rho
$$

は 物理成分 が

$$
A_\rho=1,\qquad A_\phi=A_z=0
$$

なので成分だけ見れば定数ですが、

$$
\Delta A
=
-\frac1{\rho^2}e_\rho
\qquad(\rho>0).
$$

基底 自身が $\phi$ とともに回るためです。

球座標 でも同じ原理で、必要なら

$$
\nabla(\nabla\cdot A)-\nabla\times(\nabla\times A)
$$

から構成します。本章では長い成分公式を暗記表として追加せず、**基底の変化 を含めて再構成できる方法**を正本とします。

---

## 15. 演習

#### VC6-A01 円柱座標の尺度因子
- Level: A
- 目安時間: 15分

$$
r(\rho,\phi,z)
=
(\rho\cos\phi,\rho\sin\phi,z)
$$

について 座標接ベクトル を計算し、

$$
h_\rho=1,\qquad
h_\phi=\rho,\qquad
h_z=1
$$

を導け。

<!-- solution-start -->
### 詳細解答

各変数で偏微分すると

$$
r_\rho
=
(\cos\phi,\sin\phi,0),
$$

$$
r_\phi
=
(-\rho\sin\phi,\rho\cos\phi,0),
$$

$$
r_z=(0,0,1).
$$

長さは

$$
|r_\rho|
=
\sqrt{\cos^2\phi+\sin^2\phi}
=
1,
$$

$$
|r_\phi|
=
\rho\sqrt{\sin^2\phi+\cos^2\phi}
=
\rho
$$

で、$\rho>0$ を考えています。また

$$
|r_z|=1.
$$

従って

$$
\boxed{
h_\rho=1,\quad h_\phi=\rho,\quad h_z=1
}.
$$

さらに内積

$$
r_\rho\cdot r_\phi
=
-\rho\cos\phi\sin\phi
+
\rho\sin\phi\cos\phi
=
0
$$

で、$r_z$ は他の二本と直交するので直交曲線座標であることも確認できます。
<!-- solution-end -->

#### VC6-A02 円柱座標の勾配
- Level: A
- 目安時間: 15分

$$
f(\rho,\phi,z)
=
\rho^2z+\sin\phi
$$

について $\nabla f$ を 円柱座標 で求めよ。

<!-- solution-start -->
### 詳細解答

偏微分は

$$
f_\rho=2\rho z,
\qquad
f_\phi=\cos\phi,
\qquad
f_z=\rho^2.
$$

[円柱座標の公式](#prop-vc6-円柱座標) から

$$
\nabla f
=
e_\rho f_\rho
+
e_\phi\frac1\rho f_\phi
+
e_zf_z.
$$

したがって

$$
\boxed{
\nabla f
=
2\rho z\,e_\rho
+
\frac{\cos\phi}{\rho}e_\phi
+
\rho^2e_z
}.
$$
<!-- solution-end -->

#### VC6-A03 球座標の体積要素
- Level: A
- 目安時間: 18分

球座標 の 尺度因子

$$
h_r=1,\qquad
h_\theta=r,\qquad
h_\phi=r\sin\theta
$$

から体積要素を求め、半径 $R$ の球体積を積分して確認せよ。

<!-- solution-start -->
### 詳細解答

一般公式

$$
dV=h_1h_2h_3\,dq_1dq_2dq_3
$$

へ代入すると

$$
dV
=
r^2\sin\theta\,dr\,d\theta\,d\phi.
$$

球では

$$
0\le r\le R,
\qquad
0\le\theta\le\pi,
\qquad
0\le\phi<2\pi.
$$

したがって

$$
\begin{aligned}
\operatorname{Vol}(B_R)
&=
\int_0^R
\int_0^\pi
\int_0^{2\pi}
r^2\sin\theta
\,d\phi\,d\theta\,dr\\
&=
\left(\int_0^Rr^2dr\right)
\left(\int_0^\pi\sin\theta\,d\theta\right)
\left(\int_0^{2\pi}d\phi\right)\\
&=
\frac{R^3}{3}\cdot2\cdot2\pi\\
&=
\boxed{\frac43\pi R^3}.
\end{aligned}
$$
<!-- solution-end -->

#### VC6-A04 放射状 スカラー・ラプラシアン
- Level: A
- 目安時間: 18分

三次元で

$$
f(r)=r^m
$$

とする。$r>0$ で $\Delta f$ を求めよ。

<!-- solution-start -->
### 詳細解答

放射状 関数 なので

$$
\Delta f
=
f''(r)+\frac2r f'(r).
$$

$$
f'(r)=mr^{m-1},
$$

$$
f''(r)=m(m-1)r^{m-2}.
$$

従って

$$
\begin{aligned}
\Delta r^m
&=
m(m-1)r^{m-2}
+
2mr^{m-2}\\
&=
m(m+1)r^{m-2}.
\end{aligned}
$$

よって

$$
\boxed{
\Delta r^m
=
m(m+1)r^{m-2}
}
\qquad(r>0).
$$

$m=-1$ なら $\Delta(1/r)=0$ が再現されます。
<!-- solution-end -->

#### VC6-B01 円柱座標の発散と回転
- Level: B
- 目安時間: 25分

$$
A
=
\rho^2e_\rho
+
\rho z\,e_\phi
+
z^2e_z
$$

とする。$\phi$ には依存しない。

1. $\nabla\cdot A$
2. $\nabla\times A$

を求めよ。

<!-- solution-start -->
### 詳細解答

成分は

$$
A_\rho=\rho^2,
\qquad
A_\phi=\rho z,
\qquad
A_z=z^2.
$$

1. 発散 は

$$
\nabla\cdot A
=
\frac1\rho\partial_\rho(\rho A_\rho)
+
\frac1\rho\partial_\phi A_\phi
+
\partial_zA_z.
$$

$\phi$ 依存がないので第二項は 0 です。

$$
\frac1\rho\partial_\rho(\rho^3)
=
\frac1\rho(3\rho^2)
=
3\rho,
$$

$$
\partial_z(z^2)=2z.
$$

したがって

$$
\boxed{
\nabla\cdot A=3\rho+2z
}.
$$

2. 回転 は

$$
(\nabla\times A)_\rho
=
-\partial_zA_\phi
=
-\rho,
$$

$$
(\nabla\times A)_\phi
=
\partial_zA_\rho-\partial_\rho A_z
=
0-0
=
0,
$$

$$
(\nabla\times A)_z
=
\frac1\rho\partial_\rho(\rho A_\phi)
=
\frac1\rho\partial_\rho(\rho^2z)
=
2z.
$$

よって

$$
\boxed{
\nabla\times A
=
-\rho e_\rho+2ze_z
}.
$$
<!-- solution-end -->

#### VC6-B02 軸対称旋回流の渦度
- Level: B
- 目安時間: 25分

$$
u=U(\rho)e_\phi
$$

とする。

1. $\nabla\cdot u=0$ を示せ。
2. $\nabla\times u$ を求めよ。
3. $U(\rho)=\Omega\rho$ のとき 回転 を求めよ。

<!-- solution-start -->
### 詳細解答

成分は

$$
u_\rho=0,
\qquad
u_\phi=U(\rho),
\qquad
u_z=0
$$

で、$\phi,z$ に依存しません。

1.

$$
\nabla\cdot u
=
\frac1\rho\partial_\rho(\rho\cdot0)
+
\frac1\rho\partial_\phi U(\rho)
+
\partial_z0
=
\boxed{0}.
$$

2. 回転 の $\rho,\phi$ 成分は 0 で、

$$
(\nabla\times u)_z
=
\frac1\rho
\frac{d}{d\rho}
(\rho U(\rho)).
$$

したがって

$$
\boxed{
\nabla\times u
=
\frac1\rho
\frac{d}{d\rho}
(\rho U(\rho))
e_z
}.
$$

3. $U(\rho)=\Omega\rho$ なら

$$
\rho U(\rho)=\Omega\rho^2
$$

なので

$$
\nabla\times u
=
\frac1\rho(2\Omega\rho)e_z
=
\boxed{2\Omega e_z}.
$$
<!-- solution-end -->

#### VC6-B03 逆二乗場 と [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)
- Level: B
- 目安時間: 30分

$$
A=\frac{C}{r^2}e_r
$$

について、

1. $r>0$ で $\nabla\cdot A=0$ を示せ。
2. 半径 $R$ の球面 流束 を求めよ。
3. 1. と 2. が [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) と矛盾しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. 放射状場 なので

$$
\nabla\cdot A
=
\frac1{r^2}
\frac{d}{dr}(r^2A_r).
$$

ここで

$$
A_r=\frac{C}{r^2}
$$

だから

$$
r^2A_r=C.
$$

従って

$$
\boxed{
\nabla\cdot A=0
}
\qquad(r>0).
$$

2. 球面上では $n=e_r$ なので

$$
A\cdot n
=
\frac{C}{R^2}.
$$

したがって

$$
\int_{S_R}A\cdot n\,dS
=
\frac{C}{R^2}
4\pi R^2
=
\boxed{4\pi C}.
$$

3. [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) は球内部を含む閉領域上で $A\in C^1$ であることを要求します。しかし $A=C e_r/r^2$ は $r=0$ で未定義です。

従って原点を含む球へ [Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) を直接適用できません。

原点を半径 $\varepsilon$ の小球でくり抜けば、外球の 流束 $4\pi C$ と内球境界の 外向き 流束 $-4\pi C$ が相殺し、発散 の体積積分 0 と一致します。
<!-- solution-end -->

#### VC6-C01 放射対称な Laplace 方程式の解と原点での未定義性
- Level: C
- 目安時間: 40分

三次元の 放射状 関数

$$
f=f(r)
$$

が $r>0$ で

$$
\Delta f=0
$$

を満たすとする。

1. 一般解が
   $$
   f(r)=a+\frac br
   $$
   であることを導け。
2. $\nabla f$ を求めよ。
3. 半径 $R$ の球面で $\nabla f$ の 外向き 流束 を求めよ。
4. $b\ne0$ のとき、$\Delta f=0$ なのに 流束 が 0 でない理由を、正則性 と領域の観点から説明せよ。

<!-- solution-start -->
### 詳細解答

1. 放射状 ラプラシアン 公式から

$$
\Delta f
=
\frac1{r^2}
\frac{d}{dr}(r^2f'(r)).
$$

したがって $\Delta f=0$ は

$$
\frac{d}{dr}(r^2f'(r))=0
$$

と同値です。

よってある定数 $c$ が存在して

$$
r^2f'(r)=c.
$$

従って

$$
f'(r)=\frac{c}{r^2}.
$$

積分すると

$$
f(r)
=
a-\frac{c}{r}.
$$

$b=-c$ と置けば

$$
\boxed{
f(r)=a+\frac br
}.
$$

2.

$$
f'(r)
=
-\frac{b}{r^2}.
$$

$f=f(r)$ なので、[球座標 の 勾配 公式](#prop-vc6-球座標) では角度微分項が消え

$$
\boxed{
\nabla f
=
-\frac{b}{r^2}e_r
}.
$$

3. 半径 $R$ の球面では

$$
\nabla f\cdot n
=
-\frac{b}{R^2}.
$$

従って

$$
\int_{S_R}\nabla f\cdot n\,dS
=
-\frac{b}{R^2}
4\pi R^2
=
\boxed{-4\pi b}.
$$

4. $r>0$ では確かに

$$
\nabla\cdot\nabla f
=
\Delta f
=
0.
$$

しかし $b\ne0$ なら $f=a+b/r$ も $\nabla f=-b e_r/r^2$ も $r=0$ で未定義で、絶対値が発散します。

[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence) を半径 $R$ の球全体へ適用するには、場 $\nabla f$ が閉球上で $C^1$ である必要があります。この仮定が原点で壊れています。

したがって

$$
\iiint_{B_R}\Delta f\,dV=0
$$

と書いて 流束 が 0 だと結論することはできません。

原点をくり抜いた領域では内側境界 流束 が現れ、外側の $-4\pi b$ と相殺します。

これは 球座標 の計算、VC4 の 穴あき領域の議論、PDE6 の 基本解 が同じ構造を持つことを示しています。
<!-- solution-end -->
