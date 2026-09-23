# LIE3 Lie 部分群・古典群

<!-- definition-example-audit: strict -->

LIE1 では Lie 群から単位元の接 Lie 環を取り出し、LIE2 ではその接ベクトルを指数写像で群へ戻しました。本章では、群の中にある部分群と接空間の中にある線形部分空間を対応させます。

主線は

$$
\text{群の方程式}
\longrightarrow
\text{埋め込み部分多様体}
\longrightarrow
T_eH
\longrightarrow
\text{線形条件}
$$

です。

とくに古典群では、非線形な群の条件

$$
\det A=1,\qquad A^\mathsf{T}A=I,\qquad A^*A=I
$$

を単位元で微分すると、

$$
\operatorname{tr}X=0,\qquad X^\mathsf{T}+X=0,\qquad X^*+X=0
$$

という線形条件へ変わります。Lie 理論の便利さが最も目に見える場所の一つです。

> **この章の停止線**
>
> 本章では埋め込み Lie 部分群、閉部分群定理の位置付け、古典群とその接 Lie 環までを扱います。滑らかな群作用・軌道・等質空間・無限小作用・Maurer--Cartan 形式は LIE4 へ送ります。一般表現論、半単純 Lie 環、root system、最高ウェイト理論はさらに後続の独立系列へ送ります。

---

## 1. 部分群に多様体構造を要求する

<a id="def-lie3-lie-subgroup"></a>
<!-- formal-statement-start -->
> **定義（Lie 部分群）**
>
> $G$ を Lie 群とする。部分群 $H\subset G$ が $G$ の埋め込み部分多様体であり、その部分多様体構造に関して Lie 群であるとき、$H$ を $G$ の **Lie 部分群**という。
>
> 包含写像を
>
> $$
> \iota:H\hookrightarrow G
> $$
>
> と書く。
<!-- formal-statement-end -->

埋め込み部分多様体という条件は、単に「集合として部分群」というだけではありません。各点の近くで $H$ が Euclid 空間の座標平面のように見え、接空間 $T_hH$ が $T_hG$ の線形部分空間として入ることを要求しています。

<!-- definition-example-start: def-lie3-lie-subgroup -->
### 例：正の対角行列

**定義の確認**

$GL(n,\mathbb R)$ の中で

$$
D_+
=
\{\operatorname{diag}(a_1,\ldots,a_n):a_i>0\}
$$

を考えます。

積と逆元は

$$
\operatorname{diag}(a_i)\operatorname{diag}(b_i)
=
\operatorname{diag}(a_ib_i),
$$

$$
\operatorname{diag}(a_i)^{-1}
=
\operatorname{diag}(a_i^{-1})
$$

なので $D_+$ は部分群です。

写像

$$
(a_1,\ldots,a_n)
\longmapsto
\operatorname{diag}(a_1,\ldots,a_n)
$$

は $\mathbb R_{>0}^n$ から $M_n(\mathbb R)$ への滑らかな埋め込みで、像が $D_+$ です。したがって $D_+$ は $GL(n,\mathbb R)$ の埋め込み部分多様体です。

群演算は $GL(n,\mathbb R)$ の群演算の制限なので滑らかです。よって $D_+$ は Lie 部分群です。
<!-- definition-example-end -->

### なぜ「群演算の滑らかさ」をもう一度証明しなくてよいのか

$H$ が $G$ の埋め込み部分多様体で部分群なら、$H\times H$ も $G\times G$ の埋め込み部分多様体です。$G$ の乗法 $m_G$ は滑らかで、部分群性により

$$
m_G(H\times H)\subset H.
$$

埋め込み部分多様体への値域制限として $m_H:H\times H\to H$ は滑らかです。逆元も同様です。

したがって、実際の古典群では

1. 部分群であること、
2. 埋め込み部分多様体であること、

を確認すれば Lie 部分群になります。

---

## 2. Lie 部分群を単位元で微分する

<a id="thm-lie3-subgroup-lie-algebra"></a>
<!-- formal-statement-start -->
> **定理（Lie 部分群の接空間は Lie 部分環）**
>
> $H$ を Lie 群 $G$ の Lie 部分群とし、共通の単位元を $e$ とする。
>
> 包含写像
>
> $$
> \iota:H\hookrightarrow G
> $$
>
> の微分
>
> $$
> d\iota_e:T_eH\to T_eG
> $$
>
> は単射な Lie 環準同型である。
>
> したがって $T_eH$ を $T_eG$ の線形部分空間と同一視すると、
>
> $$
> [T_eH,T_eH]\subset T_eH.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

包含写像は Lie 群準同型です。LIE1 の「Lie 群準同型の微分は Lie 環準同型」を適用し、さらに埋め込み部分多様体の包含写像の微分が単射であることを使います。

<!-- proof-start -->
### 証明

包含写像 $\iota:H\to G$ は群準同型です。実際、$h_1,h_2\in H$ に対して

$$
\iota(h_1h_2)=h_1h_2=\iota(h_1)\iota(h_2).
$$

また $H$ は $G$ の埋め込み部分多様体なので、包含写像は滑らかです。従って $\iota$ は Lie 群準同型です。

[LIE1 の Lie 群準同型の微分は Lie 環準同型](../LIE1/index.md#thm-lie1-homomorphism-differential)より、

$$
d\iota_e([X,Y]_{\mathfrak h})
=
[d\iota_eX,d\iota_eY]_{\mathfrak g}.
$$

一方、[GEO3 の部分多様体の包含写像と接空間](../GEO3/index.md#prop-geo3-inclusion-tangent)より $d\iota_e$ は単射です。その像は $T_eH$ を $T_eG$ の中に見たものです。

したがって $X,Y\in T_eH$ なら

$$
[X,Y]_{\mathfrak g}\in T_eH.
$$

よって $T_eH$ は $T_eG$ の Lie 部分環です。$\square$
<!-- proof-end -->

この定理以降、Lie 部分群 $H$ の Lie 環を

$$
\mathfrak h=T_eH\subset\mathfrak g=T_eG
$$

と同一視します。

---

## 3. 指数写像は部分群の中で完結する

<a id="thm-lie3-subgroup-exponential"></a>
<!-- formal-statement-start -->
> **定理（Lie 部分群と指数写像の整合性）**
>
> $H$ を Lie 群 $G$ の Lie 部分群とし、
>
> $$
> \mathfrak h=T_eH\subset\mathfrak g=T_eG
> $$
>
> とする。
>
> このとき任意の $X\in\mathfrak h$ について
>
> $$
> \exp_H(X)=\exp_G(X).
> $$
>
> 特に全ての $t\in\mathbb R$ について
>
> $$
> \exp_G(tX)\in H.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

包含写像 $\iota:H\hookrightarrow G$ は Lie 群準同型です。

[LIE2 の Lie 群準同型と指数写像の自然性](../LIE2/index.md#thm-lie2-exponential-naturality)を $\iota$ に適用すると、

$$
\iota(\exp_H X)
=
\exp_G(d\iota_eX).
$$

$T_eH$ を $T_eG$ の部分空間と同一視しているので $d\iota_eX=X$ です。また $\iota$ は包含写像なので、

$$
\exp_HX=\exp_GX.
$$

$tX\in\mathfrak h$ にも同じ式を適用すれば

$$
\exp_G(tX)=\exp_H(tX)\in H.
$$

$\square$
<!-- proof-end -->

逆向きも曲線を微分するだけです。もし $X\in\mathfrak g$ が

$$
\exp_G(tX)\in H
\qquad(\forall t\in\mathbb R)
$$

を満たすなら、$t\mapsto\exp_G(tX)$ は $H$ 内の滑らかな曲線で、$t=0$ での速度は $X$ です。従って

$$
X\in T_eH=\mathfrak h.
$$

よって

$$
\boxed{
\mathfrak h
=
\{X\in\mathfrak g:\exp_G(tX)\in H\ \text{for all }t\in\mathbb R\}
}
$$

と特徴付けられます。

---

## 4. 「閉じている」だけで滑らかさが出る：閉部分群定理

<a id="thm-lie3-closed-subgroup"></a>
<!-- formal-statement-start -->
> **定理（閉部分群定理）**
>
> 有限次元 Lie 群 $G$ の部分群 $H\subset G$ が $G$ の位相に関して閉集合なら、$H$ には一意な滑らかな多様体構造が入り、その構造で $H$ は $G$ の埋め込み Lie 部分群になる。
<!-- formal-statement-end -->

これは強い定理です。一般の閉部分集合は部分多様体とは限りません。例えば $\mathbb R^2$ の二本の座標軸の和集合は閉集合ですが、原点の近くで一本の Euclid 空間のようには見えません。

閉部分群定理は、**部分群という代数的剛性が特異点を排除する**ことを主張しています。

### 本章での扱い

閉部分群定理の完全証明には、局所座標内で「単位元へ近づく部分群の元」から接方向を抽出し、その方向が局所的な指数像を生成することを示す一連の議論が必要です。これは本章の古典群計算とは独立した大きな論証になります。

したがって本章ではこの定理を **意図的黒箱**として使用可能な一般定理として位置付けます。ただし、以下の古典群については「閉集合だから」で終わらせず、正則値定理を使って埋め込み部分多様体構造と接空間を直接計算します。これにより、古典群の Lie 環を閉部分群定理へ丸投げしません。

---

## 5. 特殊線形群：行列式を1に固定する

<a id="def-lie3-special-linear-group"></a>
<!-- formal-statement-start -->
> **定義（特殊線形群）**
>
> $$
> SL(n,\mathbb R)
> :=
> \{A\in GL(n,\mathbb R):\det A=1\}.
> $$
>
> これを **特殊線形群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie3-special-linear-group -->
### 例：$SL(2,\mathbb R)$

**定義の確認**

$$
A=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

が $SL(2,\mathbb R)$ に入る条件は

$$
ad-bc=1
$$

です。

例えば

$$
\begin{pmatrix}
1&t\\
0&1
\end{pmatrix}
$$

は任意の $t\in\mathbb R$ について行列式が1なので $SL(2,\mathbb R)$ に属します。

二つの行列式1の行列 $A,B$ に対し

$$
\det(AB)=\det A\det B=1,
$$

また

$$
\det(A^{-1})=(\det A)^{-1}=1
$$

なので、$SL(n,\mathbb R)$ は $GL(n,\mathbb R)$ の部分群です。
<!-- definition-example-end -->

<a id="thm-lie3-special-linear"></a>
<!-- formal-statement-start -->
> **定理（特殊線形群とその Lie 環）**
>
> $SL(n,\mathbb R)$ は $GL(n,\mathbb R)$ の埋め込み Lie 部分群で、実次元は
>
> $$
> n^2-1
> $$
>
> である。
>
> その Lie 環は
>
> $$
> \mathfrak{sl}(n,\mathbb R)
> =
> \{X\in M_n(\mathbb R):\operatorname{tr}X=0\}.
> $$
<!-- formal-statement-end -->

### 行列式の微分を単位元で求める

$X=(x_{ij})$ とし、

$$
f(t)=\det(I+tX)
$$

と置きます。

行列式を列に関して多重線形に展開すると、$t$ の一次項は「ちょうど一列だけを $X$ の対応列へ置き換えた行列式」の和です。

第 $j$ 列だけを置き換えた行列式では、単位行列の他の列が標準基底のままなので、生き残る成分は $x_{jj}$ だけです。従って

$$
f'(0)=x_{11}+\cdots+x_{nn}
=
\operatorname{tr}X.
$$

すなわち

$$
d(\det)_I(X)=\operatorname{tr}X.
$$

一般の $A\in GL(n,\mathbb R)$ では

$$
A+tH=A(I+tA^{-1}H)
$$

だから

$$
\det(A+tH)
=
\det A\cdot\det(I+tA^{-1}H).
$$

$t=0$ で微分して

$$
d(\det)_A(H)
=
\det A\operatorname{tr}(A^{-1}H).
$$

<!-- proof-start -->
### 証明

$SL(n,\mathbb R)$ は

$$
\det:GL(n,\mathbb R)\to\mathbb R^\times
$$

のレベル集合 $\det^{-1}(1)$ です。

$A\in SL(n,\mathbb R)$ とします。任意の $r\in\mathbb R$ に対して

$$
H=\frac rn A
$$

と置けば

$$
d(\det)_A(H)
=
\det A\operatorname{tr}\left(A^{-1}\frac rn A\right)
=
\operatorname{tr}\left(\frac rn I\right)
=
r.
$$

従って $d(\det)_A$ は全射で、$1$ は正則値です。

[GEO3 の正則値定理](../GEO3/index.md#thm-geo3-regular-value)より $SL(n,\mathbb R)$ は余次元1の埋め込み部分多様体です。したがって

$$
\dim SL(n,\mathbb R)=n^2-1.
$$

さらに [正則レベル集合の接空間](../GEO3/index.md#thm-geo3-regular-level-tangent)より

$$
T_I SL(n,\mathbb R)
=
\ker d(\det)_I.
$$

上で

$$
d(\det)_I(X)=\operatorname{tr}X
$$

と計算したので、

$$
T_I SL(n,\mathbb R)
=
\{X:\operatorname{tr}X=0\}.
$$

部分群性は定義の確認で示したので、$SL(n,\mathbb R)$ は Lie 部分群です。$\square$
<!-- proof-end -->

括弧についても閉じています。$X,Y$ がトレース0なら

$$
\operatorname{tr}[X,Y]
=
\operatorname{tr}(XY-YX)
=
\operatorname{tr}(XY)-\operatorname{tr}(YX)
=
0.
$$

ここで $\operatorname{tr}(XY)=\operatorname{tr}(YX)$ を使いました。

---

## 6. 直交群：内積を保つ条件を微分する

<a id="def-lie3-orthogonal-groups"></a>
<!-- formal-statement-start -->
> **定義（直交群・特殊直交群）**
>
> $$
> O(n)
> :=
> \{A\in GL(n,\mathbb R):A^\mathsf{T}A=I\}
> $$
>
> を **直交群**といい、
>
> $$
> SO(n)
> :=
> \{A\in O(n):\det A=1\}
> $$
>
> を **特殊直交群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie3-orthogonal-groups -->
### 例：平面回転

**定義の確認**

$$
R_\theta
=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}
$$

とすると、

$$
R_\theta^\mathsf{T}R_\theta
=
I
$$

です。また

$$
\det R_\theta
=
\cos^2\theta+\sin^2\theta
=
1.
$$

従って

$$
R_\theta\in SO(2)\subset O(2).
$$

さらに $A^\mathsf{T}A=I$ なら $A^{-1}=A^\mathsf{T}$ なので $A$ は可逆です。二つの直交行列 $A,B$ について

$$
(AB)^\mathsf{T}(AB)
=
B^\mathsf{T}A^\mathsf{T}AB
=
B^\mathsf{T}B
=
I
$$

であり、逆行列 $A^{-1}=A^\mathsf{T}$ も直交行列です。したがって $O(n)$ は部分群です。
<!-- definition-example-end -->

<a id="thm-lie3-orthogonal"></a>
<!-- formal-statement-start -->
> **定理（直交群・特殊直交群とその Lie 環）**
>
> $O(n)$ と $SO(n)$ は $GL(n,\mathbb R)$ の埋め込み Lie 部分群で、
>
> $$
> \dim O(n)=\dim SO(n)=\frac{n(n-1)}2.
> $$
>
> 両者の Lie 環は同じで、
>
> $$
> \mathfrak o(n)=\mathfrak{so}(n)
> =
> \{X\in M_n(\mathbb R):X^\mathsf{T}+X=0\}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

対称行列全体を $\operatorname{Sym}(n)$ と書き、

$$
F:GL(n,\mathbb R)\to\operatorname{Sym}(n),
\qquad
F(A)=A^\mathsf{T}A
$$

とします。

$A+tH$ を代入すると

$$
\begin{aligned}
F(A+tH)
&=
(A+tH)^\mathsf{T}(A+tH)\\
&=
A^\mathsf{T}A
+t(H^\mathsf{T}A+A^\mathsf{T}H)
+t^2H^\mathsf{T}H.
\end{aligned}
$$

従って

$$
dF_A(H)=H^\mathsf{T}A+A^\mathsf{T}H.
$$

$A\in O(n)$ とし、任意の対称行列 $S$ を取ります。

$$
H=\frac12 AS
$$

と置くと、$A^\mathsf{T}A=I$ と $S^\mathsf{T}=S$ から

$$
\begin{aligned}
dF_A(H)
&=
\frac12 S^\mathsf{T}A^\mathsf{T}A
+
\frac12 A^\mathsf{T}AS\\
&=
\frac12 S+\frac12 S\\
&=S.
\end{aligned}
$$

したがって $dF_A$ は $\operatorname{Sym}(n)$ へ全射です。よって $I$ は正則値で、

$$
O(n)=F^{-1}(I)
$$

は埋め込み部分多様体です。

$\operatorname{Sym}(n)$ の実次元は

$$
\frac{n(n+1)}2
$$

なので

$$
\dim O(n)
=
n^2-\frac{n(n+1)}2
=
\frac{n(n-1)}2.
$$

単位元では

$$
dF_I(X)=X^\mathsf{T}+X.
$$

従って

$$
T_I O(n)
=
\ker dF_I
=
\{X:X^\mathsf{T}+X=0\}.
$$

次に $A\in O(n)$ なら

$$
1=\det(A^\mathsf{T}A)=(\det A)^2
$$

なので

$$
\det A\in\{1,-1\}.
$$

従って $SO(n)$ は $O(n)$ の中で $\det=1$ の部分です。$O(n)$ 上の行列式は値が離散集合 $\{1,-1\}$ に限られるので、$SO(n)$ は $O(n)$ の開かつ閉な部分多様体です。したがって $SO(n)$ は $O(n)$ と同じ次元を持ち、単位元近傍では両者は一致します。

よって

$$
T_I SO(n)=T_I O(n).
$$

部分群性は行列式の乗法性から従うため、両者とも Lie 部分群です。$\square$
<!-- proof-end -->

### 6.1 $SO(2)$ は指数写像まで手で見える

$\mathfrak{so}(2)$ の元は

$$
X=
\begin{pmatrix}
0&-a\\
a&0
\end{pmatrix}
=
aJ,
\qquad
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
$$

$J^2=-I$ なので行列指数を偶数次と奇数次に分けると

$$
e^{tJ}
=
\cos t\,I+\sin t\,J
=
\begin{pmatrix}
\cos t&-\sin t\\
\sin t&\cos t
\end{pmatrix}.
$$

つまり LIE2 の指数写像は

$$
aJ\longmapsto R_a
$$

となります。非線形な円周上の回転が、接 Lie 環では一本の直線 $\mathbb RJ$ へほどけています。

---

## 7. ユニタリ群：複素内積を保つ条件を微分する

複素行列空間 $M_n(\mathbb C)$ は、ここでは実ベクトル空間

$$
M_n(\mathbb C)\cong\mathbb R^{2n^2}
$$

として多様体とみなします。

<a id="def-lie3-unitary-groups"></a>
<!-- formal-statement-start -->
> **定義（ユニタリ群・特殊ユニタリ群）**
>
> 共役転置を $A^*=\overline A^\mathsf{T}$ とする。
>
> $$
> U(n)
> :=
> \{A\in GL(n,\mathbb C):A^*A=I\}
> $$
>
> を **ユニタリ群**といい、
>
> $$
> SU(n)
> :=
> \{A\in U(n):\det A=1\}
> $$
>
> を **特殊ユニタリ群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie3-unitary-groups -->
### 例：$U(1)$ と $SU(1)$

**定義の確認**

$1\times1$ 複素行列は複素数 $z$ そのものです。

$$
z^*z=\overline z z=|z|^2
$$

なので

$$
U(1)=\{z\in\mathbb C:|z|=1\}.
$$

一方、$1\times1$ 行列の行列式は $z$ 自身なので

$$
SU(1)=\{1\}.
$$

また $A^*A=I$ なら $A^{-1}=A^*$ です。直交群と同じ計算で $U(n)$ は部分群になり、行列式1という条件も積と逆元で保たれるため $SU(n)$ も部分群です。
<!-- definition-example-end -->

<a id="thm-lie3-unitary"></a>
<!-- formal-statement-start -->
> **定理（ユニタリ群・特殊ユニタリ群とその Lie 環）**
>
> $U(n)$ と $SU(n)$ は $GL(n,\mathbb C)$ の埋め込み Lie 部分群で、
>
> $$
> \dim_{\mathbb R}U(n)=n^2,
> \qquad
> \dim_{\mathbb R}SU(n)=n^2-1.
> $$
>
> その Lie 環は
>
> $$
> \mathfrak u(n)
> =
> \{X\in M_n(\mathbb C):X^*+X=0\},
> $$
>
> $$
> \mathfrak{su}(n)
> =
> \{X\in M_n(\mathbb C):X^*+X=0,\ \operatorname{tr}X=0\}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Hermitian 行列全体を $\operatorname{Herm}(n)$ とします。これは実ベクトル空間で、実次元は $n^2$ です。実際、対角成分は実数で $n$ 個、上三角の各非対角成分は複素数で $2$ 実自由度を持つので

$$
n+2\frac{n(n-1)}2=n^2.
$$

写像

$$
F:GL(n,\mathbb C)\to\operatorname{Herm}(n),
\qquad
F(A)=A^*A
$$

を考えます。

実変数 $t$ について

$$
F(A+tH)
=
A^*A+t(H^*A+A^*H)+t^2H^*H
$$

なので

$$
dF_A(H)=H^*A+A^*H.
$$

$A\in U(n)$、$S\in\operatorname{Herm}(n)$ とし、

$$
H=\frac12 AS
$$

と置くと

$$
dF_A(H)=S.
$$

従って $I$ は正則値で

$$
U(n)=F^{-1}(I)
$$

は埋め込み部分多様体です。

$GL(n,\mathbb C)$ の実次元は $2n^2$、$\operatorname{Herm}(n)$ の実次元は $n^2$ なので

$$
\dim_{\mathbb R}U(n)=n^2.
$$

単位元で

$$
dF_I(X)=X^*+X
$$

だから

$$
T_IU(n)=\{X:X^*+X=0\}.
$$

次に

$$
\det:U(n)\to U(1)
$$

を考えます。$X\in\mathfrak u(n)$ に対する単位元での微分は、行列式の微分公式から

$$
d(\det)_I(X)=\operatorname{tr}X.
$$

$X^*=-X$ なら

$$
\overline{\operatorname{tr}X}
=
\operatorname{tr}(X^*)
=
-\operatorname{tr}X,
$$

なので $\operatorname{tr}X$ は純虚数で、確かに $T_1U(1)=i\mathbb R$ に入ります。

任意の $is\in i\mathbb R$ に対して

$$
X=\frac{is}{n}I
$$

と置けば $X^*=-X$ かつ $\operatorname{tr}X=is$ です。従って $d(\det)_I:\mathfrak u(n)\to i\mathbb R$ は全射です。

行列式は Lie 群準同型なので、左移動を使えば微分の階数は全ての点で同じです。よって $1\in U(1)$ は正則値で、

$$
SU(n)=\det^{-1}(1)
$$

は $U(n)$ の余次元1の埋め込み部分多様体です。

従って

$$
\dim_{\mathbb R}SU(n)=n^2-1
$$

であり、

$$
T_I SU(n)
=
\ker\left(d(\det)_I|_{\mathfrak u(n)}\right)
=
\{X:X^*+X=0,\ \operatorname{tr}X=0\}.
$$

部分群性は定義の確認で示したので、$U(n),SU(n)$ は Lie 部分群です。$\square$
<!-- proof-end -->

---

## 8. 六つの古典群を一枚で比較する

ここまでの結果をまとめると次の表になります。

| Lie 群 | 定義方程式 | 接 Lie 環 | 実次元 |
|---|---|---|---:|
| $GL(n,\mathbb R)$ | $\det A\ne0$ | $M_n(\mathbb R)$ | $n^2$ |
| $SL(n,\mathbb R)$ | $\det A=1$ | $\operatorname{tr}X=0$ | $n^2-1$ |
| $O(n)$ | $A^\mathsf{T}A=I$ | $X^\mathsf{T}+X=0$ | $n(n-1)/2$ |
| $SO(n)$ | $A^\mathsf{T}A=I,\det A=1$ | $X^\mathsf{T}+X=0$ | $n(n-1)/2$ |
| $U(n)$ | $A^*A=I$ | $X^*+X=0$ | $n^2$ |
| $SU(n)$ | $A^*A=I,\det A=1$ | $X^*+X=0,\operatorname{tr}X=0$ | $n^2-1$ |

重要なのは暗記ではなく、毎回同じ操作が働いていることです。

1. 群を行列方程式のレベル集合として書く。
2. 正則値定理で部分多様体性を確認する。
3. 定義方程式を $I$ で微分する。
4. 微分の核を $T_IG$ と読む。

---

## 9. 指数写像で方程式を逆向きに確認する

### 9.1 歪対称行列の指数は直交行列

$X^\mathsf{T}=-X$ とします。

行列指数では転置と指数が可換するので

$$
(e^X)^\mathsf{T}
=
e^{X^\mathsf{T}}
=
e^{-X}.
$$

$X$ と $-X$ は可換だから

$$
(e^X)^\mathsf{T}e^X
=
e^{-X}e^X
=
I.
$$

また

$$
\det(e^X)=e^{\operatorname{tr}X}=1
$$

です。歪対称行列の対角成分は0なので $\operatorname{tr}X=0$ だからです。

従って

$$
e^X\in SO(n).
$$

これは §3 の一般定理を具体的な行列恒等式で再確認しています。

### 9.2 歪Hermitian行列の指数はユニタリ行列

$X^*=-X$ なら同様に

$$
(e^X)^*e^X=e^{-X}e^X=I.
$$

さらに $\operatorname{tr}X=0$ なら

$$
\det(e^X)=e^{\operatorname{tr}X}=1.
$$

従って

$$
X\in\mathfrak{su}(n)
\Longrightarrow
e^X\in SU(n).
$$

---

## 10. $SU(2)$：3次元の非可換 Lie 環を手で見る

$\mathfrak{su}(2)$ の元は

$$
X=
\begin{pmatrix}
ia&z\\
-\overline z&-ia
\end{pmatrix},
\qquad
a\in\mathbb R,\ z\in\mathbb C.
$$

したがって実次元は $3$ です。

基底として

$$
E_1=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix},
\quad
E_2=
\begin{pmatrix}
0&i\\
i&0
\end{pmatrix},
\quad
E_3=
\begin{pmatrix}
i&0\\
0&-i
\end{pmatrix}
$$

を取れます。

直接掛け算すると

$$
E_1E_2=E_3,
\qquad
E_2E_1=-E_3,
$$

なので

$$
[E_1,E_2]=2E_3.
$$

同様に

$$
[E_2,E_3]=2E_1,
\qquad
[E_3,E_1]=2E_2.
$$

$SO(2)$ の Lie 環が1次元で括弧が自動的に0になるのに対し、$\mathfrak{su}(2)$ は3次元ですでに非可換です。

---

## 11. 演習

### Level A

#### LIE3-A01 Lie 部分群の接空間

$H$ を Lie 群 $G$ の Lie 部分群とする。包含写像 $\iota:H\hookrightarrow G$ について、$d\iota_e$ が単射である理由を説明し、$T_eH$ を $T_eG$ の線形部分空間とみなせることを示せ。

<!-- solution-start -->
**詳細解答**

$H$ は $G$ の埋め込み部分多様体です。埋め込み部分多様体の包含写像の微分は各点で単射なので、

$$
d\iota_e:T_eH\to T_eG
$$

は単射です。

したがって $T_eH$ の各接ベクトルを、その像 $d\iota_e(T_eH)$ と同一視できます。以後

$$
T_eH\subset T_eG
$$

と書けます。

さらに $\iota$ は Lie 群準同型なので、LIE1 の定理により $d\iota_e$ は Lie 環準同型でもあります。よってこの部分空間は Lie 括弧でも閉じます。
<!-- solution-end -->

#### LIE3-A02 $SL(2,\mathbb R)$ の接 Lie 環

$$
X=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

が $\mathfrak{sl}(2,\mathbb R)$ に属するための条件を書き、基底を一組与えよ。

<!-- solution-start -->
**詳細解答**

本文の定理より

$$
\mathfrak{sl}(2,\mathbb R)
=
\{X:\operatorname{tr}X=0\}.
$$

したがって条件は

$$
a+d=0,
\qquad d=-a
$$

です。

従って

$$
X=
a
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
+
b
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
+
c
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}.
$$

よって例えば上の三行列が基底で、実次元は3です。
<!-- solution-end -->

#### LIE3-A03 $\mathfrak{so}(3)$ の一般形

$X^\mathsf{T}+X=0$ を成分ごとに解き、$\mathfrak{so}(3)$ の一般形と実次元を求めよ。

<!-- solution-start -->
**詳細解答**

$X=(x_{ij})$ とすると

$$
X^\mathsf{T}+X=0
$$

は

$$
x_{ji}+x_{ij}=0
$$

を意味します。

$i=j$ では

$$
2x_{ii}=0
$$

なので対角成分は全て0です。

$i\ne j$ では

$$
x_{ji}=-x_{ij}.
$$

したがって

$$
X=
\begin{pmatrix}
0&-a&-b\\
a&0&-c\\
b&c&0
\end{pmatrix},
\qquad
a,b,c\in\mathbb R.
$$

自由な実パラメータが3個なので

$$
\dim\mathfrak{so}(3)=3.
$$
<!-- solution-end -->

#### LIE3-A04 $\mathfrak u(1)$ と $\mathfrak{su}(1)$

$\mathfrak u(1)$ と $\mathfrak{su}(1)$ を求めよ。

<!-- solution-start -->
**詳細解答**

$1\times1$ 複素行列を $z\in\mathbb C$ とみなします。

$\mathfrak u(1)$ の条件は

$$
\overline z+z=0.
$$

これは実部が0であることと同値なので

$$
z=it
\qquad(t\in\mathbb R).
$$

従って

$$
\mathfrak u(1)=i\mathbb R.
$$

一方 $\mathfrak{su}(1)$ ではさらにトレース0、すなわち $z=0$ が必要です。よって

$$
\mathfrak{su}(1)=\{0\}.
$$
<!-- solution-end -->

### Level B

#### LIE3-B01 行列式の微分

行列式の多重線形性だけを使って

$$
d(\det)_I(X)=\operatorname{tr}X
$$

を示せ。その後、任意の $A\in GL(n,\mathbb R)$ について

$$
d(\det)_A(H)
=
\det A\,\operatorname{tr}(A^{-1}H)
$$

を導け。

<!-- solution-start -->
**詳細解答**

$X$ の第 $j$ 列を $x_j$、標準基底を $e_j$ とします。

$$
I+tX
$$

の第 $j$ 列は $e_j+tx_j$ です。行列式の各列に関する多重線形性から、$t$ の一次係数は

$$
\sum_{j=1}^n
\det(e_1,\ldots,e_{j-1},x_j,e_{j+1},\ldots,e_n)
$$

です。

第 $j$ 項では、他の列が全て標準基底なので $x_j$ のうち $e_j$ 方向の成分だけが寄与します。その係数は $x_{jj}$ です。したがって一次係数は

$$
\sum_{j=1}^n x_{jj}
=
\operatorname{tr}X.
$$

よって

$$
d(\det)_I(X)=\operatorname{tr}X.
$$

一般の $A$ では

$$
A+tH=A(I+tA^{-1}H)
$$

なので

$$
\det(A+tH)
=
\det A\cdot\det(I+tA^{-1}H).
$$

$t=0$ で微分すると

$$
d(\det)_A(H)
=
\det A\,\operatorname{tr}(A^{-1}H).
$$
<!-- solution-end -->

#### LIE3-B02 直交群の接空間を任意の点で求める

$A\in O(n)$ とする。$O(n)$ の $A$ における接空間が

$$
T_AO(n)
=
\{AX:X^\mathsf{T}+X=0\}
$$

であることを示せ。

<!-- solution-start -->
**詳細解答**

本文で

$$
F(A)=A^\mathsf{T}A
$$

と置き、

$$
dF_A(H)=H^\mathsf{T}A+A^\mathsf{T}H
$$

を得ました。

正則レベル集合の接空間定理から

$$
T_AO(n)=\ker dF_A.
$$

したがって $H\in T_AO(n)$ であることは

$$
H^\mathsf{T}A+A^\mathsf{T}H=0
$$

と同値です。

ここで

$$
X=A^\mathsf{T}H
$$

と置きます。$A^\mathsf{T}A=I$ なので $H=AX$ です。

さらに

$$
X^\mathsf{T}
=
H^\mathsf{T}A.
$$

従って接空間条件は

$$
X^\mathsf{T}+X=0
$$

となります。

よって

$$
T_AO(n)
=
\{AX:X^\mathsf{T}+X=0\}.
$$

これは左移動 $L_A$ の微分で単位元接空間 $\mathfrak{so}(n)$ を $A$ へ運んだ式でもあります。
<!-- solution-end -->

#### LIE3-B03 $SU(2)$ の括弧表

本文の $E_1,E_2,E_3$ について三つの Lie 括弧を直接計算し、

$$
[E_1,E_2]=2E_3,\qquad
[E_2,E_3]=2E_1,\qquad
[E_3,E_1]=2E_2
$$

を確認せよ。

<!-- solution-start -->
**詳細解答**

まず

$$
E_1E_2
=
\begin{pmatrix}
i&0\\
0&-i
\end{pmatrix}
=
E_3,
$$

$$
E_2E_1
=
\begin{pmatrix}
-i&0\\
0&i
\end{pmatrix}
=
-E_3.
$$

従って

$$
[E_1,E_2]
=
E_1E_2-E_2E_1
=
2E_3.
$$

次に

$$
E_2E_3
=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}
=
E_1,
$$

$$
E_3E_2=-E_1
$$

なので

$$
[E_2,E_3]=2E_1.
$$

同様に直接掛け算すると

$$
E_3E_1=E_2,
\qquad
E_1E_3=-E_2,
$$

よって

$$
[E_3,E_1]=2E_2.
$$

したがって $\mathfrak{su}(2)$ は非可換です。
<!-- solution-end -->

### Level C

#### LIE3-C01 古典群を方程式から再構成する

次の四群について、部分群性、埋め込み部分多様体性、単位元接空間、実次元を一貫した方法で求めよ。

$$
SL(n,\mathbb R),\qquad O(n),\qquad U(n),\qquad SU(n).
$$

正則値定理を使う場合は、対応する微分が全射であることまで示すこと。

<!-- solution-start -->
**詳細解答**

### 1. $SL(n,\mathbb R)$

部分群性は行列式の乗法性

$$
\det(AB)=\det A\det B
$$

と

$$
\det(A^{-1})=(\det A)^{-1}
$$

から従います。

写像

$$
f=\det:GL(n,\mathbb R)\to\mathbb R^\times
$$

を使うと

$$
SL(n,\mathbb R)=f^{-1}(1).
$$

微分は

$$
df_A(H)
=
\det A\,\operatorname{tr}(A^{-1}H).
$$

$A\in SL(n,\mathbb R)$ と任意の $r\in\mathbb R$ に対して $H=(r/n)A$ と置けば $df_A(H)=r$ なので全射です。

従って

$$
\dim SL(n,\mathbb R)=n^2-1
$$

で、

$$
T_I SL(n,\mathbb R)
=
\ker df_I
=
\{X:\operatorname{tr}X=0\}.
$$

### 2. $O(n)$

$A^\mathsf{T}A=I$ は積と逆元で保たれるので部分群です。

$$
F(A)=A^\mathsf{T}A
$$

を対称行列空間へ値を取る写像とすると

$$
dF_A(H)=H^\mathsf{T}A+A^\mathsf{T}H.
$$

$S$ を任意の対称行列とし $H=AS/2$ と置けば $dF_A(H)=S$ なので全射です。

従って

$$
\dim O(n)
=
n^2-\frac{n(n+1)}2
=
\frac{n(n-1)}2,
$$

$$
T_IO(n)
=
\{X:X^\mathsf{T}+X=0\}.
$$

### 3. $U(n)$

複素行列空間を実次元 $2n^2$ の実多様体とみなします。

$$
F(A)=A^*A
$$

を Hermitian 行列空間へ取ると

$$
dF_A(H)=H^*A+A^*H.
$$

任意の Hermitian 行列 $S$ に対し $H=AS/2$ と置けば $dF_A(H)=S$ です。

Hermitian 行列空間の実次元は $n^2$ なので

$$
\dim_{\mathbb R}U(n)=2n^2-n^2=n^2,
$$

$$
T_IU(n)=\{X:X^*+X=0\}.
$$

### 4. $SU(n)$

$SU(n)$ は $U(n)$ 上の行列式

$$
\det:U(n)\to U(1)
$$

の核です。

単位元での微分は

$$
X\mapsto\operatorname{tr}X.
$$

$\mathfrak u(n)$ ではトレースは純虚数です。任意の $is\in i\mathbb R$ に対し

$$
X=\frac{is}{n}I
$$

と置けば $X\in\mathfrak u(n)$ かつ $\operatorname{tr}X=is$ なので微分は全射です。

したがって $SU(n)$ は $U(n)$ の実余次元1の埋め込み部分多様体で、

$$
\dim_{\mathbb R}SU(n)=n^2-1.
$$

また

$$
T_ISU(n)
=
\{X:X^*+X=0,\ \operatorname{tr}X=0\}.
$$

以上、四群はいずれも「定義方程式の微分の核」が接 Lie 環を与えます。
<!-- solution-end -->

---

## 12. まとめ

本章で得た変換は

$$
\boxed{
\text{古典群の非線形な保存条件}
\quad\longrightarrow\quad
\text{単位元での線形条件}
}
$$

です。

具体的には

$$
\det A=1
\quad\rightsquigarrow\quad
\operatorname{tr}X=0,
$$

$$
A^\mathsf{T}A=I
\quad\rightsquigarrow\quad
X^\mathsf{T}+X=0,
$$

$$
A^*A=I
\quad\rightsquigarrow\quad
X^*+X=0.
$$

Lie 部分群 $H\subset G$ では

$$
\mathfrak h=T_eH\subset\mathfrak g=T_eG
$$

が Lie 部分環となり、指数写像は

$$
\exp_H=\exp_G|_{\mathfrak h}
$$

として整合します。

次章 LIE4 では、群そのものを見る立場から「Lie 群が別の多様体へどう作用するか」へ進みます。軌道・安定化群・等質空間を滑らかな世界へ持ち上げ、最後に Maurer--Cartan 形式と Maurer--Cartan 方程式へ到達します。
