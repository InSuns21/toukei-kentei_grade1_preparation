# FEM3 有限要素補間とメッシュ

FEM2 では、適合三角形分割の上に連続一次有限要素空間

$$
V_h\subset H_0^1(\Omega)
$$

を作り、局所基底から大域行列を組み立てました。

しかし、FEM1 の [Céa の補題](../FEM1/index.md#thm-fem1-cea)が教えるのは

$$
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
\|u-v_h\|_V
$$

までです。

したがって次に答えるべき問いは、

> **有限要素空間 $V_h$ は、滑らかな関数を実際にどれだけよく近似できるのか。**

です。

本章では、FEM2 の [重心座標](../FEM2/index.md#def-fem2-barycentric-basis)と [アフィン要素写像](../FEM2/index.md#def-fem2-reference-affine-map)を使って、

$$
\boxed{
\text{節点補間}
\longrightarrow
\text{基準要素上の誤差}
\longrightarrow
\text{要素形状の制御}
\longrightarrow
\text{局所誤差}
\longrightarrow
\text{領域全体の誤差}
}
$$

という有限要素近似論の骨格を作ります。

中心結果は、形状正則な一次三角形メッシュで

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}
\le
C h^2 |u|_{H^2(\Omega)}
}
$$

および

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}
\le
C h |u|_{H^2(\Omega)}
}
$$

となることです。

ここで $I_hu$ は節点補間です。

> **この章の停止線**  
> 本章では有限要素空間そのものの近似能力を評価します。Céa の補題と組み合わせて有限要素解 $u_h$ の $H^1$ 誤差を評価し、さらに Aubin--Nitsche 型双対論法で $L^2$ 誤差を評価するのは FEM4 です。

---

## 0. まず一つの三角形で補間する

三角形

$$
K=\operatorname{conv}\{z_1,z_2,z_3\}
$$

を固定します。

FEM2 で構成した重心座標を

$$
\lambda_1,\lambda_2,\lambda_3
$$

とします。

これらは

$$
\lambda_i(z_j)=\delta_{ij}
$$

を満たします。

<a id="def-fem3-local-interpolation"></a>

<!-- formal-statement-start -->
### 定義（一次三角形要素の局所節点補間）

$u\in C(\overline K)$ とする。

$$
\boxed{
I_Ku
=
\sum_{i=1}^3
u(z_i)\lambda_i
}
$$

で定まる

$$
I_Ku\in P_1(K)
$$

を、$u$ の $K$ 上の **局所節点補間**という。
<!-- formal-statement-end -->

この定義から直ちに

$$
(I_Ku)(z_j)
=
\sum_{i=1}^3
u(z_i)\lambda_i(z_j)
=
u(z_j)
$$

です。

つまり

$$
\boxed{
I_Ku
\text{ は三頂点で }u\text{ と一致する}
}
$$

ように作られています。

<!-- definition-example-start: def-fem3-local-interpolation -->
**定義の確認**

### 例：基準三角形で二次関数を補間する

基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

と

$$
u(x,y)=x^2+y^2
$$

を考えます。

三頂点での値は

$$
u(0,0)=0,
$$

$$
u(1,0)=1,
$$

$$
u(0,1)=1.
$$

基準三角形の重心座標は

$$
\widehat\lambda_1=1-x-y,
\qquad
\widehat\lambda_2=x,
\qquad
\widehat\lambda_3=y
$$

なので

$$
I_{\widehat K}u
=
0\cdot(1-x-y)
+
1\cdot x
+
1\cdot y.
$$

従って

$$
\boxed{
I_{\widehat K}u=x+y
}.
$$

実際、三頂点では $u$ と $I_{\widehat K}u$ が一致します。

一方、たとえば

$$
(x,y)=\left(\frac14,\frac14\right)
$$

では

$$
u=\frac18,
\qquad
I_{\widehat K}u=\frac12
$$

なので、要素内部では一般に一致しません。
<!-- definition-example-end -->

節点補間は「頂点では正確だが内部では近似」です。

その内部誤差を $h_K$ と $u$ の二階微分で測るのが本章の目的です。

---

## 1. 一次関数なら補間誤差は完全に 0

局所節点補間の最重要な代数的性質は、一次多項式を完全再現することです。

<a id="prop-fem3-reproduction-affine"></a>

<!-- formal-statement-start -->
### 命題（節点補間の一次多項式再現性とアフィン可換性）

三角形 $K$ 上の局所節点補間作用素を $I_K$ とする。

1. 任意の $p\in P_1(K)$ に対して

$$
\boxed{
I_Kp=p
}
$$

が成り立つ。

2. FEM2 のアフィン要素写像

$$
F_K:\widehat K\to K
$$

を用い、

$$
\widehat u=u\circ F_K
$$

と置く。

基準三角形上の補間作用素を $\widehat I$ とすると

$$
\boxed{
(I_Ku)\circ F_K
=
\widehat I\widehat u
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一次多項式再現性は、$I_Kp$ と $p$ が

- どちらも $P_1(K)$ に属し、
- 三頂点で同じ値を取る

ことから FEM2 の [頂点値自由度の一意可解性](../FEM2/index.md#thm-fem2-p1-unisolvence)を使えば終わります。

アフィン可換性も同じです。

両辺は基準三角形上の一次多項式で、三頂点で同じ値を取ります。

<!-- proof-start -->
### 証明

まず $p\in P_1(K)$ とします。

定義から

$$
I_Kp\in P_1(K).
$$

また各頂点 $z_j$ で

$$
(I_Kp)(z_j)=p(z_j).
$$

FEM2 の [一次三角形要素の頂点値自由度の一意可解性](../FEM2/index.md#thm-fem2-p1-unisolvence)により、三頂点で同じ値を持つ $P_1(K)$ の二関数は一致します。

従って

$$
I_Kp=p.
$$

次に

$$
\widehat u=u\circ F_K
$$

とします。

$F_K$ はアフィン写像なので、

$$
(I_Ku)\circ F_K
$$

は $\widehat K$ 上の一次多項式です。

基準頂点を $\widehat z_i$ とすると

$$
F_K(\widehat z_i)=z_i.
$$

したがって

$$
\bigl((I_Ku)\circ F_K\bigr)(\widehat z_i)
=
(I_Ku)(z_i)
=
u(z_i).
$$

一方、

$$
(\widehat I\widehat u)(\widehat z_i)
=
\widehat u(\widehat z_i)
=
u(F_K(\widehat z_i))
=
u(z_i).
$$

よって二つの一次多項式は三基準頂点で同じ値を取ります。

再び頂点値の一意可解性から

$$
(I_Ku)\circ F_K
=
\widehat I\widehat u.
$$
<!-- proof-end -->

この命題が重要なのは、補間誤差作用素

$$
E_K:=I-I_K
$$

が

$$
E_Kp=0
\qquad
(\forall p\in P_1(K))
$$

を満たすからです。

つまり補間誤差は

$$
\text{定数項}
\quad\text{と}\quad
\text{一次項}
$$

を全く見ません。

最初に見えるのは二階微分です。

これが

$$
|u|_{H^2}
$$

が誤差評価へ現れる理由です。

---

## 2. 小さい三角形なら何でもよいわけではない

FEM2 では要素直径

$$
h_K=\operatorname{diam}K
$$

と大域メッシュ幅

$$
h=\max_{K\in\mathcal T_h}h_K
$$

を導入しました。

しかし、$h_K$ が小さいだけでは補間誤差を一様に制御できません。

三角形が極端に細長くつぶれると、基準要素からのアフィン写像の逆行列が巨大になります。

その形状劣化を測るために内接円半径を使います。

<a id="def-fem3-shape-regularity"></a>

<!-- formal-statement-start -->
### 定義（要素形状比と形状正則なメッシュ族）

三角形 $K$ の直径を

$$
h_K=\operatorname{diam}K
$$

とし、$K$ の内接円半径を

$$
\rho_K
$$

とする。

比

$$
\boxed{
\gamma_K
=
\frac{h_K}{\rho_K}
}
$$

を $K$ の **要素形状比**とする。

三角形分割の族

$$
\{\mathcal T_h\}
$$

が **形状正則**であるとは、ある定数

$$
\sigma<\infty
$$

が存在し、族に属する全てのメッシュの全ての要素について

$$
\boxed{
\frac{h_K}{\rho_K}
\le
\sigma
}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

形状正則性は

$$
\boxed{
\text{要素が小さいか}
}
$$

ではなく

$$
\boxed{
\text{要素がつぶれていないか}
}
$$

を制御します。

同じ形の三角形を縮小しただけなら、$h_K$ と $\rho_K$ は同じ倍率で縮むので比は変わりません。

<!-- definition-example-start: def-fem3-shape-regularity -->
**定義の確認**

### 例：相似な直角三角形族

$$
K_h
=
\operatorname{conv}\{(0,0),(h,0),(0,h)\}
$$

を考えます。

斜辺長は

$$
\sqrt2\,h
$$

なので

$$
h_{K_h}=\sqrt2\,h.
$$

直角三角形の内接円半径は

$$
\rho
=
\frac{a+b-c}{2}
$$

だから

$$
\rho_{K_h}
=
\frac{h+h-\sqrt2h}{2}
=
\frac{2-\sqrt2}{2}h.
$$

従って

$$
\frac{h_{K_h}}{\rho_{K_h}}
=
\frac{\sqrt2}
{(2-\sqrt2)/2}
$$

であり、$h$ に依存しません。

したがって、この相似三角形だけからなるメッシュ族は、細分化して $h\to0$ としても形状正則性を失いません。
<!-- definition-example-end -->

### 形状正則性と準一様性は別物

形状正則性は、局所細分化を禁止しません。

大きい三角形の隣に非常に小さい三角形があっても、各要素がつぶれていなければ形状正則です。

一方、

$$
h_K
\asymp
h
$$

を全要素で要求する条件は **準一様性**と呼ばれ、より強い条件です。

本章の基本的な補間誤差評価には準一様性は必要ありません。

局所適合細分化を許したまま、

$$
h_K
$$

ごとの誤差を足し合わせればよいからです。

---

## 3. アフィン写像の逆行列が形状を記憶する

FEM2 のアフィン要素写像を

$$
F_K(\widehat x)
=
B_K\widehat x+z_1
$$

とします。

ここで

$$
B_K
=
\begin{pmatrix}
|&|\\
z_2-z_1&z_3-z_1\\
|&|
\end{pmatrix}.
$$

$\|B_K\|$ は要素の大きさを、$\|B_K^{-1}\|$ は要素のつぶれ方を反映します。

<a id="lem-fem3-affine-geometry"></a>

<!-- formal-statement-start -->
### 補題（アフィン要素写像の幾何評価）

三角形

$$
K=\operatorname{conv}\{z_1,z_2,z_3\}
$$

と、そのアフィン要素写像の行列 $B_K$ を考える。

Euclid 作用素ノルムについて、普遍定数 $C_1,C_2>0$ が存在して

$$
\boxed{
\|B_K\|
\le
C_1 h_K
}
$$

および

$$
\boxed{
\|B_K^{-1}\|
\le
\frac{C_2}{\rho_K}
}
$$

が成り立つ。

従って形状正則な族では

$$
\boxed{
\|B_K\|\,\|B_K^{-1}\|
\le
C\sigma
}
$$

が全要素で一様に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$B_K$ の二列は三角形の二辺です。

したがって各列の長さは $h_K$ 以下なので、$\|B_K\|$ は $h_K$ で抑えられます。

逆行列は最小特異値の逆数です。

二次元では

$$
s_{\min}(B_K)
=
\frac{|\det B_K|}{s_{\max}(B_K)}
$$

であり、

$$
|\det B_K|=2|K|
$$

です。

さらに三角形の面積を周長 $P_K$ と内接円半径 $\rho_K$ で書くと

$$
|K|=\frac12\rho_KP_K.
$$

この三つを結べば $\rho_K$ が現れます。

<!-- proof-start -->
### 証明

$B_K$ の列ベクトルは

$$
z_2-z_1,
\qquad
z_3-z_1
$$

です。

どちらの長さも三角形の直径以下なので

$$
|z_2-z_1|\le h_K,
\qquad
|z_3-z_1|\le h_K.
$$

Frobenius ノルムを使えば

$$
\|B_K\|
\le
\|B_K\|_{\mathrm F}
=
\sqrt{
|z_2-z_1|^2
+
|z_3-z_1|^2
}
\le
\sqrt2\,h_K.
$$

従って

$$
C_1=\sqrt2
$$

と取れます。

次に $B_K$ の最大・最小特異値を

$$
s_{\max},
\qquad
s_{\min}
$$

とします。

二次元正方行列なので

$$
|\det B_K|
=
s_{\max}s_{\min}.
$$

従って

$$
s_{\min}
=
\frac{|\det B_K|}{s_{\max}}
\ge
\frac{|\det B_K|}{\|B_K\|}.
$$

三角形の面積と行列式の関係から

$$
|\det B_K|=2|K|.
$$

一方、内接円の中心から三辺へ垂線を下ろすと、三角形は高さ $\rho_K$ を持つ三つの小三角形へ分かれるので

$$
|K|
=
\frac12\rho_KP_K.
$$

したがって

$$
|\det B_K|
=
\rho_KP_K.
$$

$h_K$ は最長辺の長さです。

三角不等式から残り二辺の和は最長辺以上なので

$$
P_K\ge2h_K.
$$

従って

$$
|\det B_K|
\ge
2\rho_Kh_K.
$$

先ほどの

$$
\|B_K\|\le\sqrt2h_K
$$

と合わせると

$$
s_{\min}
\ge
\frac{2\rho_Kh_K}{\sqrt2h_K}
=
\sqrt2\,\rho_K.
$$

よって

$$
\|B_K^{-1}\|
=
\frac1{s_{\min}}
\le
\frac1{\sqrt2\,\rho_K}.
$$

最後に

$$
\|B_K\|\|B_K^{-1}\|
\le
\sqrt2h_K
\frac1{\sqrt2\rho_K}
=
\frac{h_K}{\rho_K}.
$$

形状正則性から

$$
\frac{h_K}{\rho_K}
\le
\sigma
$$

なので、一様評価が得られます。
<!-- proof-end -->

この補題は、形状正則性の役割をほぼ言い切っています。

$$
B_K^{-1}
$$

は勾配変換

$$
\nabla_x v
=
B_K^{-\mathsf T}
\nabla_{\widehat x}\widehat v
$$

に現れます。

したがって三角形がつぶれて $\rho_K\to0$ すると、勾配誤差が増幅され得ます。

---

## 4. 基準三角形では誤差は二階微分だけで決まる

一般要素へ行く前に、固定された基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

だけを考えます。

ここでは幾何が固定されているので、メッシュ幅や形状比は出てきません。

二階 Sobolev 半ノルムを

$$
|\widehat u|_{H^2(\widehat K)}^2
=
\|\partial_{\xi\xi}\widehat u\|_2^2
+
\|\partial_{\xi\eta}\widehat u\|_2^2
+
\|\partial_{\eta\eta}\widehat u\|_2^2
$$

と書きます。

### 点値を使うための解析学上の入力

節点補間は頂点値を使います。

したがって一般の $L^2$ 同値類では定義できません。

二次元の固定 Lipschitz 三角形では

$$
H^2(\widehat K)
\hookrightarrow
C(\overline{\widehat K})
$$

であり、頂点評価

$$
\widehat u\mapsto\widehat u(\widehat z_i)
$$

は $H^2$ ノルムに関して連続です。

これは Sobolev--Morrey 型の連続性評価の一例です。

GPDE5 では $p>d$ で点ごとの連続性が現れることを説明しました。本章ではその一般証明を再展開せず、この固定三角形上の点値評価の連続性だけを解析学上の入力として使います。

有限要素補間の核心は、その後の

$$
\text{一次多項式再現}
+
\text{アフィン尺度変換}
+
\text{形状正則性}
$$

にあります。

<a id="thm-fem3-reference-error"></a>

<!-- formal-statement-start -->
### 定理（基準三角形上の一次補間誤差評価）

基準三角形 $\widehat K$ 上の一次節点補間作用素を $\widehat I$ とする。

ある定数 $C_{\widehat K}>0$ が存在し、任意の

$$
\widehat u\in H^2(\widehat K)
$$

に対して

$$
\boxed{
\|\widehat u-\widehat I\widehat u\|_{L^2(\widehat K)}
\le
C_{\widehat K}
|\widehat u|_{H^2(\widehat K)}
}
$$

および

$$
\boxed{
|\widehat u-\widehat I\widehat u|_{H^1(\widehat K)}
\le
C_{\widehat K}
|\widehat u|_{H^2(\widehat K)}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

誤差作用素を

$$
\widehat E=I-\widehat I
$$

とします。

[一次多項式再現性](#prop-fem3-reproduction-affine)から

$$
\widehat E q=0
\qquad
(\forall q\in P_1(\widehat K)).
$$

したがって $\widehat u$ から適切な一次多項式 $q$ を引いても誤差は変わりません。

$q$ を

- $\widehat u-q$ の平均が 0
- $\nabla(\widehat u-q)$ の平均も 0

となるように選べば、Poincaré--Wirtinger 型評価を二回使って

$$
\|\widehat u-q\|_{H^2}
\le
C|\widehat u|_{H^2}
$$

とできます。

あとは固定三角形上で $\widehat I:H^2\to H^1$ が有界であることを使います。

### 固定三角形上の平均値 Poincaré 評価について

以下で使う

$$
\|w-w_{\widehat K}\|_{L^2(\widehat K)}
\le
C
\|\nabla w\|_{L^2(\widehat K)}
$$

は平均値版 Poincaré 不等式です。

固定された有界 Lipschitz 三角形では、GPDE5 の extension と translation compactness の議論から得られます。

実際、これが偽なら

$$
\int_{\widehat K}w_n=0,
\qquad
\|w_n\|_2=1,
\qquad
\|\nabla w_n\|_2\to0
$$

という列を取れます。

compactness で $L^2$ 強収束部分列を取り、極限 $w$ は弱微分 0 なので定数、平均 0 なので $w=0$ です。

しかし $\|w\|_2=1$ となり矛盾します。

<!-- proof-start -->
### 証明

$\widehat K$ の面積を $|\widehat K|$ とし、

$$
\overline{\nabla\widehat u}
=
\frac1{|\widehat K|}
\int_{\widehat K}
\nabla\widehat u\,d\widehat x
$$

と置きます。

また $\widehat x$ の平均を

$$
\overline{\widehat x}
=
\frac1{|\widehat K|}
\int_{\widehat K}
\widehat x\,d\widehat x
$$

とし、

$$
\overline{\widehat u}
=
\frac1{|\widehat K|}
\int_{\widehat K}
\widehat u\,d\widehat x
$$

とします。

一次多項式

$$
q(\widehat x)
=
\overline{\widehat u}
+
\overline{\nabla\widehat u}
\cdot
(\widehat x-\overline{\widehat x})
$$

を取ります。

このとき

$$
\nabla q
=
\overline{\nabla\widehat u}.
$$

したがって

$$
\frac1{|\widehat K|}
\int_{\widehat K}
\nabla(\widehat u-q)\,d\widehat x
=
0.
$$

さらに

$$
\int_{\widehat K}
(\widehat x-\overline{\widehat x})\,d\widehat x
=
0
$$

なので

$$
\frac1{|\widehat K|}
\int_{\widehat K}
(\widehat u-q)\,d\widehat x
=
0.
$$

各一階微分

$$
\partial_j(\widehat u-q)
$$

は平均 0 です。

平均値版 Poincaré 不等式を各成分へ使うと

$$
\|\nabla(\widehat u-q)\|_{L^2}
\le
C
|\,\widehat u-q\,|_{H^2}.
$$

$q$ は一次多項式なので二階微分は全て 0 です。

従って

$$
|\,\widehat u-q\,|_{H^2}
=
|\widehat u|_{H^2}.
$$

よって

$$
\|\nabla(\widehat u-q)\|_{L^2}
\le
C|\widehat u|_{H^2}.
$$

また $\widehat u-q$ 自身も平均 0 なので、もう一度平均値版 Poincaré 不等式を使って

$$
\|\widehat u-q\|_{L^2}
\le
C
\|\nabla(\widehat u-q)\|_{L^2}
\le
C|\widehat u|_{H^2}.
$$

以上から

$$
\|\widehat u-q\|_{H^2}
\le
C|\widehat u|_{H^2}.
$$

次に、固定三角形上で節点評価は $H^2$ 上の連続線形汎関数です。

したがって

$$
|\widehat u(\widehat z_i)|
\le
C\|\widehat u\|_{H^2}.
$$

基準重心座標 $\widehat\lambda_i$ は固定された一次関数なので、

$$
\|\widehat I\widehat u\|_{H^1}
=
\left\|
\sum_{i=1}^3
\widehat u(\widehat z_i)\widehat\lambda_i
\right\|_{H^1}
\le
C\|\widehat u\|_{H^2}.
$$

同様に

$$
\|\widehat I\widehat u\|_{L^2}
\le
C\|\widehat u\|_{H^2}.
$$

従って誤差作用素

$$
\widehat E=I-\widehat I
$$

は

$$
H^2(\widehat K)
\to
H^1(\widehat K)
$$

および

$$
H^2(\widehat K)
\to
L^2(\widehat K)
$$

の有界線形作用素です。

一方 $q\in P_1(\widehat K)$ なので、[一次多項式再現性](#prop-fem3-reproduction-affine)から

$$
\widehat E q=0.
$$

よって

$$
\widehat E\widehat u
=
\widehat E(\widehat u-q).
$$

したがって

$$
\|\widehat u-\widehat I\widehat u\|_{L^2}
\le
C
\|\widehat u-q\|_{H^2}
\le
C|\widehat u|_{H^2},
$$

$$
|\widehat u-\widehat I\widehat u|_{H^1}
\le
C
\|\widehat u-q\|_{H^2}
\le
C|\widehat u|_{H^2}.
$$

これで両方の評価が得られました。
<!-- proof-end -->

### どこが本質か

この定理の核心は

$$
\boxed{
\widehat E|_{P_1}=0
}
$$

です。

補間誤差作用素が一次多項式を完全に消すため、誤差は二階微分だけで制御できます。

この「低次多項式を再現する作用素の誤差は、その次の階の微分で制御される」という構造は、高次有限要素でも繰り返し現れます。

---

## 5. 基準要素から一般要素へ尺度を戻す

一般の三角形 $K$ に対し

$$
x
=
F_K(\widehat x)
=
B_K\widehat x+z_1
$$

とします。

関数 $u$ の pullback を

$$
\widehat u
=
u\circ F_K
$$

と置きます。

[アフィン可換性](#prop-fem3-reproduction-affine)により

$$
\widehat I\widehat u
=
(I_Ku)\circ F_K.
$$

したがって誤差も

$$
\widehat e
=
\widehat u-\widehat I\widehat u
=
(u-I_Ku)\circ F_K
$$

と対応します。

### $L^2$ の尺度

変数変換から

$$
\|u-I_Ku\|_{L^2(K)}^2
=
|\det B_K|
\|\widehat e\|_{L^2(\widehat K)}^2.
$$

従って

$$
\|u-I_Ku\|_{L^2(K)}
=
|\det B_K|^{1/2}
\|\widehat e\|_{L^2(\widehat K)}.
$$

### $H^1$ の尺度

FEM2 の [勾配変換](../FEM2/index.md#prop-fem2-affine-transform)から

$$
\nabla_x e
=
B_K^{-\mathsf T}
\nabla_{\widehat x}\widehat e.
$$

よって

$$
|e|_{H^1(K)}
\le
|\det B_K|^{1/2}
\|B_K^{-1}\|
|\widehat e|_{H^1(\widehat K)}.
$$

### 二階微分の尺度

$\widehat u=u\circ F_K$ を二回微分すると、各二階微分には $B_K$ の成分が二つ掛かります。

したがって次元だけに依存する定数 $C$ により

$$
|\widehat u|_{H^2(\widehat K)}
\le
C
\|B_K\|^2
|\det B_K|^{-1/2}
|u|_{H^2(K)}.
$$

これで、基準要素上の定理を一般要素へ戻す準備ができました。

<a id="thm-fem3-local-error"></a>

<!-- formal-statement-start -->
### 定理（一般三角形上の局所一次補間誤差評価）

三角形 $K$ 上の一次節点補間作用素を $I_K$ とする。

任意の

$$
u\in H^2(K)
$$

に対して、普遍定数 $C>0$ が存在し、

$$
\boxed{
\|u-I_Ku\|_{L^2(K)}
\le
C h_K^2
|u|_{H^2(K)}
}
$$

が成り立つ。

また

$$
\boxed{
|u-I_Ku|_{H^1(K)}
\le
C
\frac{h_K}{\rho_K}
h_K
|u|_{H^2(K)}
}
$$

が成り立つ。

従って形状比が

$$
h_K/\rho_K\le\sigma
$$

で抑えられていれば

$$
\boxed{
|u-I_Ku|_{H^1(K)}
\le
C_\sigma
h_K
|u|_{H^2(K)}
}
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

基準三角形上では

$$
\|\widehat e\|_{L^2}
+
|\widehat e|_{H^1}
\le
C|\widehat u|_{H^2}.
$$

一般要素へ戻すと、

- $L^2$ 誤差では $|\det B_K|^{1/2}$ が pullback の $|\det B_K|^{-1/2}$ と相殺し、$\|B_K\|^2$ だけが残る。
- $H^1$ 誤差ではさらに $\|B_K^{-1}\|$ が残る。

この逆行列が、形状正則性を必要とする場所です。

<!-- proof-start -->
### 証明

誤差を

$$
e=u-I_Ku
$$

とし、

$$
\widehat e=e\circ F_K
$$

とします。

[アフィン可換性](#prop-fem3-reproduction-affine)から

$$
\widehat e
=
\widehat u-\widehat I\widehat u.
$$

まず $L^2$ 誤差です。

変数変換と [基準三角形上の補間誤差評価](#thm-fem3-reference-error)から

$$
\begin{aligned}
\|e\|_{L^2(K)}
&=
|\det B_K|^{1/2}
\|\widehat e\|_{L^2(\widehat K)}\\
&\le
C
|\det B_K|^{1/2}
|\widehat u|_{H^2(\widehat K)}.
\end{aligned}
$$

二階微分の変換評価を入れると

$$
\|e\|_{L^2(K)}
\le
C
|\det B_K|^{1/2}
\|B_K\|^2
|\det B_K|^{-1/2}
|u|_{H^2(K)}.
$$

従って

$$
\|e\|_{L^2(K)}
\le
C
\|B_K\|^2
|u|_{H^2(K)}.
$$

[アフィン要素写像の幾何評価](#lem-fem3-affine-geometry)から

$$
\|B_K\|\le C h_K
$$

なので

$$
\boxed{
\|u-I_Ku\|_{L^2(K)}
\le
C h_K^2|u|_{H^2(K)}
}.
$$

次に $H^1$ 半ノルムです。

勾配変換から

$$
|e|_{H^1(K)}
\le
|\det B_K|^{1/2}
\|B_K^{-1}\|
|\widehat e|_{H^1(\widehat K)}.
$$

基準三角形上の評価を入れると

$$
|e|_{H^1(K)}
\le
C
|\det B_K|^{1/2}
\|B_K^{-1}\|
|\widehat u|_{H^2(\widehat K)}.
$$

さらに二階微分の変換から

$$
|e|_{H^1(K)}
\le
C
\|B_K^{-1}\|
\|B_K\|^2
|u|_{H^2(K)}.
$$

幾何評価

$$
\|B_K^{-1}\|
\le
\frac{C}{\rho_K},
\qquad
\|B_K\|
\le
Ch_K
$$

を使えば

$$
|e|_{H^1(K)}
\le
C
\frac{h_K^2}{\rho_K}
|u|_{H^2(K)}.
$$

すなわち

$$
\boxed{
|u-I_Ku|_{H^1(K)}
\le
C
\frac{h_K}{\rho_K}
h_K
|u|_{H^2(K)}
}.
$$

形状正則性

$$
\frac{h_K}{\rho_K}\le\sigma
$$

の下では

$$
|u-I_Ku|_{H^1(K)}
\le
C\sigma h_K|u|_{H^2(K)}.
$$

定数へ $\sigma$ を吸収すれば

$$
\boxed{
|u-I_Ku|_{H^1(K)}
\le
C_\sigma h_K|u|_{H^2(K)}
}.
$$
<!-- proof-end -->

### なぜ $L^2$ と $H^1$ で次数が一つ違うのか

一次補間では

$$
u-I_Ku
$$

そのものは

$$
h_K^2
$$

程度です。

しかし勾配を一回取ると、空間尺度が一つ失われます。

したがって

$$
L^2:
\quad
h_K^2,
$$

$$
H^1:
\quad
h_K
$$

という差が現れます。

これは単なる暗記ではなく、

$$
\text{二階微分}
\longrightarrow
\text{関数誤差なら }h^2
\longrightarrow
\text{一階微分誤差なら }h
$$

という尺度計算です。

---

## 6. つぶれた三角形では何が壊れるか

形状正則性を「技術的仮定」として流してはいけません。

実際に外すと勾配補間が壊れます。

$$
K_\varepsilon
=
\operatorname{conv}
\left\{
(0,0),
(1,0),
\left(\frac12,\varepsilon\right)
\right\}
$$

を考えます。

$\varepsilon\downarrow0$ で、直径は

$$
h_{K_\varepsilon}\to1
$$

程度のままですが、高さが $\varepsilon$ へ潰れます。

関数

$$
u(x,y)=x^2
$$

を補間します。

補間一次関数を

$$
p(x,y)=a+bx+cy
$$

と置きます。

頂点条件から

$$
p(0,0)=0
$$

なので

$$
a=0.
$$

また

$$
p(1,0)=1
$$

なので

$$
b=1.
$$

第三頂点では

$$
u\left(\frac12,\varepsilon\right)
=
\frac14.
$$

従って

$$
\frac12+c\varepsilon
=
\frac14,
$$

よって

$$
c=-\frac1{4\varepsilon}.
$$

したがって

$$
\boxed{
I_{K_\varepsilon}u
=
x-\frac{y}{4\varepsilon}
}
$$

です。

その勾配は

$$
\nabla I_{K_\varepsilon}u
=
\begin{pmatrix}
1\\
-1/(4\varepsilon)
\end{pmatrix}.
$$

一方

$$
\nabla u
=
\begin{pmatrix}
2x\\
0
\end{pmatrix}.
$$

したがって誤差勾配の $y$ 成分だけで

$$
|\nabla(u-I_{K_\varepsilon}u)|
\ge
\frac1{4\varepsilon}
$$

です。

要素面積は

$$
|K_\varepsilon|
=
\frac{\varepsilon}{2}.
$$

よって

$$
|u-I_{K_\varepsilon}u|_{H^1(K_\varepsilon)}
\ge
\frac1{4\varepsilon}
\sqrt{\frac{\varepsilon}{2}}
=
\frac1{4\sqrt2}
\varepsilon^{-1/2}.
$$

一方、$u=x^2$ の二階微分は

$$
u_{xx}=2,
\qquad
u_{xy}=u_{yy}=0.
$$

従って

$$
|u|_{H^2(K_\varepsilon)}
=
2\sqrt{|K_\varepsilon|}
=
\sqrt{2\varepsilon}.
$$

比を取ると

$$
\frac{
|u-I_{K_\varepsilon}u|_{H^1(K_\varepsilon)}
}{
h_{K_\varepsilon}|u|_{H^2(K_\varepsilon)}
}
\gtrsim
\frac1{\varepsilon}.
$$

つまり

$$
\boxed{
|u-I_Ku|_{H^1}
\le
C h_K|u|_{H^2}
}
$$

を全三角形で同じ $C$ で成立させることはできません。

失った仮定は形状正則性です。

壊れた証明機構は

$$
\|B_K^{-1}\|
\le
C/\rho_K
$$

の後で

$$
h_K/\rho_K
$$

を一様定数へ吸収する部分です。

---

## 7. 局所補間を大域的に貼り合わせる

適合三角形分割

$$
\mathcal T_h
$$

を固定します。

FEM2 の連続一次有限要素空間を

$$
S_h
=
\left\{
v\in C(\overline\Omega):
v|_K\in P_1(K)
\quad
(\forall K\in\mathcal T_h)
\right\}
$$

とします。

<a id="def-fem3-global-interpolation"></a>

<!-- formal-statement-start -->
### 定義（大域節点補間）

$u\in C(\overline\Omega)$ とする。

全ての大域頂点 $z$ に対して

$$
\boxed{
(I_hu)(z)=u(z)
}
$$

を満たし、各要素 $K\in\mathcal T_h$ 上で

$$
(I_hu)|_K\in P_1(K)
$$

となる一意な関数

$$
I_hu\in S_h
$$

を $u$ の **大域節点補間**という。
<!-- formal-statement-end -->

各要素上では

$$
\boxed{
(I_hu)|_K
=
I_K(u|_K)
}
$$

です。

なぜ局所補間を別々に作っても連続になるのでしょうか。

隣接する二三角形 $K,L$ が辺 $E$ を共有するとします。

$E$ の両端を $z_a,z_b$ とします。

$I_Ku$ と $I_Lu$ を辺 $E$ へ制限すると、どちらも $E$ 上の一次関数です。

しかも両端で

$$
u(z_a),
\qquad
u(z_b)
$$

という同じ値を取ります。

区間上の一次関数は両端値で一意に決まるので、辺全体で一致します。

したがって局所補間は適合メッシュ上で自動的に連続に貼り合わさります。

<!-- definition-example-start: def-fem3-global-interpolation -->
**定義の確認**

### 例：正方形を二三角形へ分ける

単位正方形を対角線で

$$
K_1
=
\operatorname{conv}\{(0,0),(1,0),(1,1)\},
$$

$$
K_2
=
\operatorname{conv}\{(0,0),(1,1),(0,1)\}
$$

へ分けます。

$$
u(x,y)=x^2+y^2
$$

とします。

共通辺は

$$
E=\operatorname{conv}\{(0,0),(1,1)\}.
$$

両要素の局所補間は、共通辺の両端で

$$
u(0,0)=0,
\qquad
u(1,1)=2
$$

を取ります。

したがって $E$ 上ではどちらも

$$
2t
\qquad
(0\le t\le1)
$$

という同じ一次関数になります。

よって二つの局所補間は共通辺上で一致し、大域関数 $I_hu$ は連続です。
<!-- definition-example-end -->

### 零境界条件も保たれる

もし

$$
u(z)=0
$$

が全ての境界頂点で成り立つなら、

$$
(I_hu)(z)=0
$$

も全境界頂点で成り立ちます。

従って FEM2 の零 Dirichlet 有限要素空間

$$
V_h
=
\{
v_h\in S_h:
v_h(z)=0
\text{ for all boundary vertices}
\}
$$

に対して

$$
\boxed{
I_hu\in V_h
}
$$

です。

特に $u\in H^2(\Omega)$ が連続代表元を持ち、零 Dirichlet 境界値を持つとき、$I_hu$ は FEM1 の Céa 評価へ入れる具体的な候補 $v_h$ になります。

---

## 8. 局所誤差を二乗して足せば領域全体の誤差になる

要素内部は互いに交わらないので、

$$
\|u-I_hu\|_{L^2(\Omega)}^2
=
\sum_{K\in\mathcal T_h}
\|u-I_Ku\|_{L^2(K)}^2.
$$

同様に

$$
|u-I_hu|_{H^1(\Omega)}^2
=
\sum_{K\in\mathcal T_h}
|u-I_Ku|_{H^1(K)}^2.
$$

局所評価をそのまま二乗和できます。

<a id="thm-fem3-global-error"></a>

<!-- formal-statement-start -->
### 定理（形状正則メッシュ上の大域一次補間誤差評価）

$\Omega\subset\mathbb R^2$ を有界多角形領域とし、

$$
\{\mathcal T_h\}
$$

を形状正則な適合三角形分割の族とする。

形状正則性定数を $\sigma$ とし、

$$
h
=
\max_{K\in\mathcal T_h}h_K
$$

とする。

大域節点補間作用素を $I_h$ とする。

このとき定数 $C>0$ が存在し、任意の

$$
u\in H^2(\Omega)
$$

に対して

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}
\le
C h^2
|u|_{H^2(\Omega)}
}
$$

および

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}
\le
C h
|u|_{H^2(\Omega)}
}
$$

が成り立つ。

定数 $C$ は $h$ には依存せず、基準要素と形状正則性定数 $\sigma$ にのみ依存する。
<!-- formal-statement-end -->

### 証明の見取り図

各要素で

$$
\|u-I_Ku\|_{L^2(K)}
\le
C h_K^2|u|_{H^2(K)}
$$

です。

二乗して和を取り、

$$
h_K\le h
$$

を使えば

$$
h^4
$$

を外へ出せます。

$H^1$ も同じです。

重要なのは、全ての $h_K$ が $h$ と同程度である必要はないことです。

<!-- proof-start -->
### 証明

まず $L^2$ 誤差を考えます。

局所評価から

$$
\|u-I_Ku\|_{L^2(K)}^2
\le
C^2
h_K^4
|u|_{H^2(K)}^2.
$$

全要素で和を取ると

$$
\|u-I_hu\|_{L^2(\Omega)}^2
\le
C^2
\sum_{K\in\mathcal T_h}
h_K^4
|u|_{H^2(K)}^2.
$$

各要素で

$$
h_K\le h
$$

なので

$$
\|u-I_hu\|_{L^2(\Omega)}^2
\le
C^2h^4
\sum_{K\in\mathcal T_h}
|u|_{H^2(K)}^2.
$$

要素内部は互いに素なので

$$
\sum_{K\in\mathcal T_h}
|u|_{H^2(K)}^2
=
|u|_{H^2(\Omega)}^2.
$$

従って

$$
\|u-I_hu\|_{L^2(\Omega)}^2
\le
C^2h^4|u|_{H^2(\Omega)}^2.
$$

平方根を取って

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}
\le
Ch^2|u|_{H^2(\Omega)}
}.
$$

次に $H^1$ 半ノルムです。

形状正則性により局所評価の定数は全要素で一様です。

したがって

$$
|u-I_Ku|_{H^1(K)}^2
\le
C^2
h_K^2
|u|_{H^2(K)}^2.
$$

和を取ると

$$
|u-I_hu|_{H^1(\Omega)}^2
\le
C^2
\sum_K
h_K^2
|u|_{H^2(K)}^2.
$$

再び $h_K\le h$ から

$$
|u-I_hu|_{H^1(\Omega)}^2
\le
C^2h^2
\sum_K
|u|_{H^2(K)}^2.
$$

よって

$$
|u-I_hu|_{H^1(\Omega)}^2
\le
C^2h^2
|u|_{H^2(\Omega)}^2.
$$

平方根を取って

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}
\le
Ch|u|_{H^2(\Omega)}
}.
$$
<!-- proof-end -->

### 非一様メッシュでは局所版の方が情報量が多い

証明途中の

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}^2
\le
C
\sum_K
h_K^4|u|_{H^2(K)}^2
}
$$

および

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}^2
\le
C
\sum_K
h_K^2|u|_{H^2(K)}^2
}
$$

は、大域最大値 $h$ へ潰した評価より強い情報を持っています。

$|D^2u|$ が大きい領域だけ要素を細かくする局所細分化では、こちらの式が自然です。

つまり

$$
\boxed{
\text{曲がりが大きい場所を細かくする}
}
$$

という適合メッシュの思想が、すでに誤差評価の式に現れています。

---

## 9. FEM1 の最良近似性へどう接続するか

FEM1 の Céa の補題は

$$
\|u-u_h\|_V
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
\|u-v_h\|_V
$$

でした。

本章では、零境界条件を保つ場合に具体的な

$$
v_h=I_hu
$$

を作り、

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}
$$

を得ました。

従って次章では

$$
\inf_{v_h\in V_h}
|u-v_h|_{H^1}
\le
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}
$$

と評価できます。

これを Céa へ入れると

$$
\text{有限要素解の }H^1\text{ 誤差}
$$

が得られます。

本章が担当したのは

$$
\boxed{
\text{近似可能性}
}
$$

です。

FEM4 では

$$
\boxed{
\text{Galerkin 安定性}
+
\text{近似可能性}
}
$$

を合流させます。

---

# 演習

## Level A

<a id="ex-fem3-a01"></a>
### FEM3-A01 基準三角形の節点補間
- Level: A

基準三角形

$$
\widehat K
=
\operatorname{conv}\{(0,0),(1,0),(0,1)\}
$$

上で

$$
u(x,y)=x^2+xy+2y^2
$$

とする。

局所節点補間

$$
I_{\widehat K}u
$$

を求めよ。

<!-- solution-start -->
**詳細解答**

三頂点での値を計算します。

$$
u(0,0)=0.
$$

$$
u(1,0)=1.
$$

$$
u(0,1)=2.
$$

基準三角形の重心座標は

$$
\widehat\lambda_1=1-x-y,
$$

$$
\widehat\lambda_2=x,
$$

$$
\widehat\lambda_3=y.
$$

したがって定義から

$$
I_{\widehat K}u
=
0\cdot\widehat\lambda_1
+
1\cdot\widehat\lambda_2
+
2\cdot\widehat\lambda_3.
$$

よって

$$
\boxed{
I_{\widehat K}u=x+2y
}.
$$

確認として三頂点へ代入すると

$$
I_{\widehat K}u(0,0)=0,
$$

$$
I_{\widehat K}u(1,0)=1,
$$

$$
I_{\widehat K}u(0,1)=2,
$$

であり、元の関数値と一致します。
<!-- solution-end -->

<a id="ex-fem3-a02"></a>
### FEM3-A02 一次多項式の完全再現
- Level: A

三角形 $K$ 上で

$$
p(x,y)=3-2x+5y
$$

とする。

局所節点補間作用素 $I_K$ に対して

$$
I_Kp=p
$$

であることを、頂点値自由度の一意可解性を使って説明せよ。

<!-- solution-start -->
**詳細解答**

$p$ は一次多項式なので

$$
p\in P_1(K).
$$

一方、[局所節点補間](#def-fem3-local-interpolation)の構成から

$$
I_Kp\in P_1(K)
$$

です。

また各頂点 $z_i$ で

$$
(I_Kp)(z_i)=p(z_i).
$$

したがって $p$ と $I_Kp$ は

- どちらも $P_1(K)$ に属し、
- 三頂点で同じ値を取る

二つの関数です。

FEM2 の頂点値自由度の一意可解性により、そのような一次多項式は一意です。

従って

$$
\boxed{
I_Kp=p
}.
$$

係数 $3,-2,5$ の具体値は本質ではありません。

任意の $p\in P_1(K)$ で同じ議論が成立します。
<!-- solution-end -->

<a id="ex-fem3-a03"></a>
### FEM3-A03 相似三角形と形状比
- Level: A

$$
K_h
=
\operatorname{conv}\{(0,0),(2h,0),(0,h)\}
$$

とする。

1. $h_{K_h}$ を求めよ。
2. 面積 $|K_h|$ と周長 $P_{K_h}$ から内接円半径 $\rho_{K_h}$ を求めよ。
3. $h_{K_h}/\rho_{K_h}$ が $h$ に依存しないことを示せ。

<!-- solution-start -->
**詳細解答**

三辺長は

$$
2h,
\qquad
h,
\qquad
\sqrt{(2h)^2+h^2}
=
\sqrt5\,h.
$$

最大は $\sqrt5\,h$ なので

$$
\boxed{
h_{K_h}=\sqrt5\,h
}.
$$

面積は直角三角形なので

$$
|K_h|
=
\frac12(2h)(h)
=
h^2.
$$

周長は

$$
P_{K_h}
=
(2+1+\sqrt5)h
=
(3+\sqrt5)h.
$$

三角形では

$$
|K|
=
\frac12\rho_KP_K
$$

なので

$$
\rho_{K_h}
=
\frac{2|K_h|}{P_{K_h}}
=
\frac{2h^2}{(3+\sqrt5)h}.
$$

従って

$$
\boxed{
\rho_{K_h}
=
\frac{2}{3+\sqrt5}h
}.
$$

よって

$$
\frac{h_{K_h}}{\rho_{K_h}}
=
\frac{\sqrt5 h}
{2h/(3+\sqrt5)}
=
\boxed{
\frac{\sqrt5(3+\sqrt5)}2
}.
$$

$h$ は消えました。

したがって相似な縮小は要素を細かくしますが、形状比は悪化させません。
<!-- solution-end -->

<a id="ex-fem3-a04"></a>
### FEM3-A04 共通辺で局所補間が一致する理由
- Level: A

二つの三角形 $K$ と $L$ が共通辺

$$
E=\operatorname{conv}\{z_a,z_b\}
$$

を持つとする。

$u\in C(\overline{K\cup L})$ とする。

$$
I_Ku
$$

と

$$
I_Lu
$$

の $E$ への制限が一致することを示せ。

<!-- solution-start -->
**詳細解答**

$I_Ku$ は $K$ 上の一次多項式なので、その辺 $E$ への制限は一変数の一次関数です。

同様に $I_Lu$ の $E$ への制限も一次関数です。

辺の端点 $z_a,z_b$ では節点補間の定義から

$$
(I_Ku)(z_a)=u(z_a),
$$

$$
(I_Ku)(z_b)=u(z_b).
$$

同様に

$$
(I_Lu)(z_a)=u(z_a),
$$

$$
(I_Lu)(z_b)=u(z_b).
$$

したがって二つの一次関数は、区間 $E$ の両端で同じ二値を取ります。

一次関数は異なる二点での値によって一意に決まるので

$$
\boxed{
(I_Ku)|_E=(I_Lu)|_E
}.
$$

この一致が、局所補間を貼り合わせた $I_hu$ の大域連続性を保証します。
<!-- solution-end -->

## Level B

<a id="ex-fem3-b01"></a>
### FEM3-B01 つぶれた三角形で勾配誤差が増幅する
- Level: B

$$
K_\varepsilon
=
\operatorname{conv}
\left\{
(0,0),
(1,0),
\left(\frac12,\varepsilon\right)
\right\},
\qquad
0<\varepsilon<\frac12
$$

とし、

$$
u(x,y)=x^2
$$

とする。

1. $I_{K_\varepsilon}u$ を求めよ。
2. $\partial_y(I_{K_\varepsilon}u)$ を求めよ。
3. $|u-I_{K_\varepsilon}u|_{H^1(K_\varepsilon)}$ が少なくとも定数倍の $\varepsilon^{-1/2}$ になることを示せ。
4. $|u|_{H^2(K_\varepsilon)}$ は定数倍の $\varepsilon^{1/2}$ であることを示し、形状正則性なしでは
   $$
   |u-I_Ku|_{H^1(K)}
   \le
   Ch_K|u|_{H^2(K)}
   $$
   の定数 $C$ を一様に取れないことを説明せよ。

<!-- solution-start -->
**詳細解答**

補間一次関数を

$$
p(x,y)=a+bx+cy
$$

と置きます。

第一頂点 $(0,0)$ で

$$
u(0,0)=0
$$

なので

$$
a=0.
$$

第二頂点 $(1,0)$ で

$$
u(1,0)=1
$$

なので

$$
b=1.
$$

第三頂点では

$$
u\left(\frac12,\varepsilon\right)
=
\frac14.
$$

したがって

$$
\frac12+c\varepsilon
=
\frac14.
$$

よって

$$
c=-\frac1{4\varepsilon}.
$$

従って

$$
\boxed{
I_{K_\varepsilon}u
=
x-\frac{y}{4\varepsilon}
}.
$$

したがって

$$
\boxed{
\partial_y(I_{K_\varepsilon}u)
=
-\frac1{4\varepsilon}
}.
$$

一方 $u=x^2$ は $y$ に依存しないので

$$
\partial_yu=0.
$$

従って誤差の $y$ 微分は要素全体で

$$
\partial_y(u-I_{K_\varepsilon}u)
=
\frac1{4\varepsilon}.
$$

よって $H^1$ 半ノルムは、この成分だけを使っても

$$
|u-I_{K_\varepsilon}u|_{H^1}^2
\ge
\int_{K_\varepsilon}
\frac1{16\varepsilon^2}
\,dx.
$$

要素面積は

$$
|K_\varepsilon|
=
\frac12\cdot1\cdot\varepsilon
=
\frac{\varepsilon}{2}.
$$

したがって

$$
|u-I_{K_\varepsilon}u|_{H^1}^2
\ge
\frac1{16\varepsilon^2}
\frac{\varepsilon}{2}
=
\frac1{32\varepsilon}.
$$

平方根を取って

$$
\boxed{
|u-I_{K_\varepsilon}u|_{H^1}
\ge
\frac1{4\sqrt2}
\varepsilon^{-1/2}
}.
$$

次に $u=x^2$ の二階微分は

$$
u_{xx}=2,
\qquad
u_{xy}=0,
\qquad
u_{yy}=0.
$$

従って

$$
|u|_{H^2(K_\varepsilon)}^2
=
\int_{K_\varepsilon}4\,dx
=
4\frac{\varepsilon}{2}
=
2\varepsilon.
$$

よって

$$
\boxed{
|u|_{H^2(K_\varepsilon)}
=
\sqrt{2\varepsilon}
}.
$$

一方 $h_{K_\varepsilon}$ は $\varepsilon\to0$ でも 1 程度です。

したがって

$$
\frac{
|u-I_{K_\varepsilon}u|_{H^1}
}{
h_{K_\varepsilon}|u|_{H^2}
}
$$

は定数倍の

$$
\frac{\varepsilon^{-1/2}}{\varepsilon^{1/2}}
=
\frac1\varepsilon
$$

へ発散します。

よって

$$
|u-I_Ku|_{H^1}
\le
Ch_K|u|_{H^2}
$$

を全三角形に同じ $C$ で適用することはできません。

形状正則性は、まさにこの $\varepsilon^{-1}$ 型の幾何増幅を排除します。
<!-- solution-end -->

<a id="ex-fem3-b02"></a>
### FEM3-B02 アフィン尺度変換から局所誤差を導く
- Level: B

基準三角形から一般三角形へのアフィン写像を

$$
F_K(\widehat x)=B_K\widehat x+z_1
$$

とする。

基準要素上で

$$
\|\widehat u-\widehat I\widehat u\|_{L^2}
\le
C|\widehat u|_{H^2}
$$

および

$$
|\widehat u-\widehat I\widehat u|_{H^1}
\le
C|\widehat u|_{H^2}
$$

が既知とする。

さらに

$$
\|B_K\|\le Ch_K,
\qquad
\|B_K^{-1}\|\le C/\rho_K
$$

を使って、

$$
\|u-I_Ku\|_{L^2(K)}
\le
Ch_K^2|u|_{H^2(K)}
$$

および

$$
|u-I_Ku|_{H^1(K)}
\le
C\frac{h_K}{\rho_K}h_K|u|_{H^2(K)}
$$

を導け。

<!-- solution-start -->
**詳細解答**

誤差を

$$
e=u-I_Ku
$$

とし、

$$
\widehat e=e\circ F_K
$$

と置きます。

アフィン可換性により

$$
\widehat e
=
\widehat u-\widehat I\widehat u.
$$

まず $L^2$ です。

変数変換から

$$
\|e\|_{L^2(K)}
=
|\det B_K|^{1/2}
\|\widehat e\|_{L^2(\widehat K)}.
$$

基準要素評価を使うと

$$
\|e\|_{L^2(K)}
\le
C
|\det B_K|^{1/2}
|\widehat u|_{H^2(\widehat K)}.
$$

二階微分の変換から

$$
|\widehat u|_{H^2(\widehat K)}
\le
C
\|B_K\|^2
|\det B_K|^{-1/2}
|u|_{H^2(K)}.
$$

したがって行列式因子が相殺して

$$
\|e\|_{L^2(K)}
\le
C\|B_K\|^2|u|_{H^2(K)}.
$$

$$
\|B_K\|\le Ch_K
$$

より

$$
\boxed{
\|u-I_Ku\|_{L^2(K)}
\le
Ch_K^2|u|_{H^2(K)}
}.
$$

次に $H^1$ 半ノルムです。

勾配変換から

$$
|e|_{H^1(K)}
\le
|\det B_K|^{1/2}
\|B_K^{-1}\|
|\widehat e|_{H^1(\widehat K)}.
$$

基準要素評価と二階微分の変換を順に使うと

$$
|e|_{H^1(K)}
\le
C
|\det B_K|^{1/2}
\|B_K^{-1}\|
\|B_K\|^2
|\det B_K|^{-1/2}
|u|_{H^2(K)}.
$$

よって

$$
|e|_{H^1(K)}
\le
C
\|B_K^{-1}\|
\|B_K\|^2
|u|_{H^2(K)}.
$$

幾何評価を代入して

$$
|e|_{H^1(K)}
\le
C
\frac1{\rho_K}
h_K^2
|u|_{H^2(K)}.
$$

従って

$$
\boxed{
|u-I_Ku|_{H^1(K)}
\le
C
\frac{h_K}{\rho_K}
h_K
|u|_{H^2(K)}
}.
$$

この導出で $L^2$ には $B_K^{-1}$ が残らず、$H^1$ には残ることが重要です。
<!-- solution-end -->

<a id="ex-fem3-b03"></a>
### FEM3-B03 非一様メッシュで局所評価を大域化する
- Level: B

形状正則メッシュ $\mathcal T_h$ 上で

$$
\|u-I_Ku\|_{L^2(K)}
\le
C h_K^2 |u|_{H^2(K)}
$$

および

$$
|u-I_Ku|_{H^1(K)}
\le
C h_K |u|_{H^2(K)}
$$

が全要素で成り立つとする。

1. 
   $$
   \|u-I_hu\|_{L^2(\Omega)}^2
   \le
   C
   \sum_K
   h_K^4|u|_{H^2(K)}^2
   $$
   を示せ。
2.
   $$
   |u-I_hu|_{H^1(\Omega)}^2
   \le
   C
   \sum_K
   h_K^2|u|_{H^2(K)}^2
   $$
   を示せ。
3. この二式には準一様性が不要である理由を説明せよ。

<!-- solution-start -->
**詳細解答**

要素内部は互いに重ならず、各要素上で

$$
(I_hu)|_K=I_Ku
$$

です。

したがって

$$
\|u-I_hu\|_{L^2(\Omega)}^2
=
\sum_K
\|u-I_Ku\|_{L^2(K)}^2.
$$

局所評価を二乗すると

$$
\|u-I_Ku\|_{L^2(K)}^2
\le
C^2h_K^4|u|_{H^2(K)}^2.
$$

よって

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}^2
\le
C
\sum_K
h_K^4|u|_{H^2(K)}^2
}.
$$

同様に

$$
|u-I_hu|_{H^1(\Omega)}^2
=
\sum_K
|u-I_Ku|_{H^1(K)}^2.
$$

局所評価を二乗して

$$
|u-I_Ku|_{H^1(K)}^2
\le
C^2h_K^2|u|_{H^2(K)}^2.
$$

従って

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}^2
\le
C
\sum_K
h_K^2|u|_{H^2(K)}^2
}.
$$

ここでは各要素の $h_K$ をそのまま残しています。

したがって

$$
h_K\asymp h
$$

を全要素で要求していません。

必要なのは局所評価の定数 $C$ を全要素で共通にできることです。

これは形状正則性が保証します。

要素サイズは局所的に大きく異なっていてよいので、準一様性は不要です。
<!-- solution-end -->

## Level C

<a id="ex-fem3-c01"></a>
### FEM3-C01 零境界関数の補間誤差を最後まで評価する
- Level: C

$$
\Omega=(0,1)^2
$$

とし、

$$
u(x,y)
=
x(1-x)y(1-y)
$$

とする。

$\{\mathcal T_h\}$ を単位正方形の形状正則な適合三角形分割族とし、大域節点補間を $I_hu$ とする。

1. $u=0$ on $\partial\Omega$ を確認し、$I_hu\in V_h$ であることを説明せよ。
2. 二階微分
   $$
   u_{xx},
   \quad
   u_{xy},
   \quad
   u_{yy}
   $$
   を求めよ。
3. 本章の規約
   $$
   |u|_{H^2(\Omega)}^2
   =
   \|u_{xx}\|_2^2
   +
   \|u_{xy}\|_2^2
   +
   \|u_{yy}\|_2^2
   $$
   に従って $|u|_{H^2(\Omega)}^2$ を求めよ。
4. 大域補間誤差評価から
   $$
   \|u-I_hu\|_{L^2(\Omega)}
   \le
   C h^2
   $$
   および
   $$
   |u-I_hu|_{H^1(\Omega)}
   \le
   C h
   $$
   を具体的に導け。
5. メッシュ幅を $h$ から $h/2$ へ下げたとき、理論上の上界は $L^2$ と $H^1$ でそれぞれ何倍になるか。

<!-- solution-start -->
**詳細解答**

まず

$$
u(x,y)
=
x(1-x)y(1-y)
$$

です。

境界では少なくとも一つの因子が 0 になります。

$x=0$ または $x=1$ なら

$$
x(1-x)=0.
$$

$y=0$ または $y=1$ なら

$$
y(1-y)=0.
$$

したがって

$$
\boxed{
u=0
\quad\text{on }\partial\Omega
}.
$$

特に全ての境界頂点 $z$ で

$$
u(z)=0.
$$

大域節点補間は頂点値を保存するので

$$
(I_hu)(z)=0
$$

が全境界頂点で成り立ちます。

従って [FEM2 の連続一次有限要素空間](../FEM2/index.md#def-fem2-conforming-p1-space)で定めた零 Dirichlet 空間に

$$
\boxed{
I_hu\in V_h
}.
$$

次に微分します。

$$
u(x,y)
=
(x-x^2)(y-y^2).
$$

$x$ で一回微分すると

$$
u_x
=
(1-2x)(y-y^2).
$$

もう一回微分して

$$
\boxed{
u_{xx}
=
-2(y-y^2)
}.
$$

同様に

$$
\boxed{
u_{yy}
=
-2(x-x^2)
}.
$$

混合微分は

$$
u_{xy}
=
(1-2x)(1-2y).
$$

従って

$$
\boxed{
u_{xy}
=
(1-2x)(1-2y)
}.
$$

まず

$$
\int_0^1
(t-t^2)^2\,dt
=
\int_0^1
(t^2-2t^3+t^4)\,dt.
$$

各項を積分して

$$
\frac13-\frac12+\frac15
=
\frac{10-15+6}{30}
=
\frac1{30}.
$$

したがって

$$
\|u_{xx}\|_2^2
=
\int_0^1\int_0^1
4(y-y^2)^2
\,dx\,dy.
$$

$x$ 積分は 1 なので

$$
\|u_{xx}\|_2^2
=
4\frac1{30}
=
\frac2{15}.
$$

同様に

$$
\|u_{yy}\|_2^2
=
\frac2{15}.
$$

次に

$$
\int_0^1
(1-2t)^2\,dt
=
\int_0^1
(1-4t+4t^2)\,dt.
$$

よって

$$
1-2+\frac43
=
\frac13.
$$

したがって積の形から

$$
\|u_{xy}\|_2^2
=
\left(
\int_0^1(1-2x)^2dx
\right)
\left(
\int_0^1(1-2y)^2dy
\right)
=
\frac19.
$$

従って

$$
|u|_{H^2(\Omega)}^2
=
\frac2{15}
+
\frac19
+
\frac2{15}.
$$

$$
\frac4{15}
+
\frac19
=
\frac{12}{45}
+
\frac5{45}
=
\boxed{
\frac{17}{45}
}.
$$

よって

$$
\boxed{
|u|_{H^2(\Omega)}
=
\sqrt{\frac{17}{45}}
}.
$$

形状正則メッシュ上の大域補間誤差評価から

$$
\|u-I_hu\|_{L^2(\Omega)}
\le
C h^2
|u|_{H^2(\Omega)}.
$$

したがって

$$
\boxed{
\|u-I_hu\|_{L^2(\Omega)}
\le
C
\sqrt{\frac{17}{45}}
\,h^2
}.
$$

同様に

$$
|u-I_hu|_{H^1(\Omega)}
\le
C h
|u|_{H^2(\Omega)}
$$

なので

$$
\boxed{
|u-I_hu|_{H^1(\Omega)}
\le
C
\sqrt{\frac{17}{45}}
\,h
}.
$$

最後に $h$ を $h/2$ へ置き換えます。

$L^2$ 上界は $h^2$ に比例するので

$$
\left(\frac h2\right)^2
=
\frac14h^2.
$$

従って理論上の上界は

$$
\boxed{
1/4
}
$$

倍です。

$H^1$ 半ノルム上界は $h$ に比例するので

$$
\frac h2
$$

となり、

$$
\boxed{
1/2
}
$$

倍です。

この問題では、

$$
\text{零境界}
\to
\text{補間が }V_h\text{ に入る}
\to
\text{二階微分}
\to
\text{補間誤差率}
$$

という FEM3 の全工程を一度通しました。
<!-- solution-end -->

---

## 10. まとめ

本章では、FEM2 で構成した一次三角形有限要素空間が滑らかな関数をどれだけよく近似できるかを定量化しました。

流れは次です。

1. 一要素上で
   $$
   I_Ku
   =
   \sum_i u(z_i)\lambda_i
   $$
   と節点補間を定義する。
2. 節点補間は
   $$
   P_1(K)
   $$
   を完全再現する。
3. 基準要素上では補間誤差が二階微分だけで制御される。
4. 一般要素へ戻すと
   $$
   B_K
   $$
   と
   $$
   B_K^{-1}
   $$
   が現れる。
5. 
   $$
   \|B_K\|
   \lesssim
   h_K,
   \qquad
   \|B_K^{-1}\|
   \lesssim
   1/\rho_K
   $$
   なので、$H^1$ 誤差には
   $$
   h_K/\rho_K
   $$
   が現れる。
6. 形状正則性により、その形状因子を一様定数へ吸収できる。
7. 局所評価を二乗和すると
   $$
   \|u-I_hu\|_{L^2}
   \lesssim
   h^2|u|_{H^2},
   $$
   $$
   |u-I_hu|_{H^1}
   \lesssim
   h|u|_{H^2}
   $$
   を得る。
8. 準一様性は不要で、局所細分化を許したまま評価できる。
9. つぶれた三角形では勾配補間誤差が増幅し、形状正則性の役割が実際に見える。

FEM1 は

$$
\text{Galerkin 解は最良近似と同程度によい}
$$

と教えました。

FEM3 は

$$
\text{一次有限要素空間には }O(h)\text{ の }H^1\text{ 近似が実際に存在する}
$$

ことを示しました。

次の FEM4 では両者を接続し、

$$
\boxed{
\text{Céa}
+
\text{補間誤差}
\Longrightarrow
\text{有限要素解の }H^1\text{ 誤差}
}
$$

を導きます。

さらに補助的な楕円型問題を使って $L^2$ 誤差を一段改善する Aubin--Nitsche 型論法へ進みます。
