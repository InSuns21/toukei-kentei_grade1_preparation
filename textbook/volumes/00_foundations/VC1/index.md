# VC1 ベクトル場と微分演算子

ベクトル解析では、各点に数を割り当てる **スカラー場** と、各点にベクトルを割り当てる **ベクトル場** を微分して、局所的な増加、湧き出し、回転を読み取ります。

本章の出発点は [RA6A の多変数微分・正則レベル集合](../RA6A/index.md#cor-ra6a-regular-level-set) です。偏微分や連鎖律そのものは再構築せず、

$$
\nabla f,\qquad \operatorname{div}F,\qquad \operatorname{curl}F,\qquad \Delta f
$$

を「座標公式」ではなく、何を測る演算子なのかまで含めて正本化します。

本章ではユークリッド空間 $\mathbb R^2,\mathbb R^3$ に限定します。曲線積分は VC2、曲面積分と流束は VC3、積分定理は VC4--VC5 で扱います。

---

## 1. スカラー場とベクトル場

<a id="def-vc1-fields"></a>

<!-- formal-statement-start -->
> **定義（スカラー場・ベクトル場）**  
> 開集合 $\Omega\subset\mathbb R^n$ 上の写像
>
$$
f:\Omega\to\mathbb R
$$
>
> を **スカラー場**、写像
>
$$
F:\Omega\to\mathbb R^n
$$
>
> を **ベクトル場** と呼ぶ。
<!-- formal-statement-end -->

温度 $T(x)$ はスカラー場、流速 $u(x)$ や力 $F(x)$ はベクトル場の典型です。

<!-- definition-example-start: def-vc1-fields -->
**定義の確認**

$$
f(x,y,z)=x^2+y^2+z^2
$$

は各点へ実数を割り当てます。一方

$$
F(x,y,z)=(-y,x,z)
$$

は各点へ 3 成分ベクトルを割り当てます。前者がスカラー場、後者がベクトル場です。
<!-- definition-example-end -->

---

## 2. 方向微分を一つのベクトルでまとめる：勾配

<a id="def-vc1-gradient"></a>

<!-- formal-statement-start -->
> **定義（勾配）**  
> $f\in C^1(\Omega)$ とする。点 $x\in\Omega$ における **勾配** を
>
$$
\nabla f(x)
=
\left(
\frac{\partial f}{\partial x_1}(x),
\ldots,
\frac{\partial f}{\partial x_n}(x)
\right)
$$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc1-gradient -->
**定義の確認**

$$
f(x,y,z)=x^2+2y^2+3z
$$

なら

$$
\nabla f=(2x,4y,3).
$$

点 $(1,1,0)$ で方向 $v=(1,0,0)$ を選ぶと

$$
D_vf=2
=
\nabla f(1,1,0)\cdot v.
$$

定義どおり、勾配との内積が方向微分を再現します。
<!-- definition-example-end -->

単位ベクトル $v$ を固定します。[方向微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-directional-derivative)の定義は

$$
D_vf(x)
=
\lim_{t\to0}
\frac{f(x+tv)-f(x)}{t}
$$

です。一方、$f$ が $x$ で [Fréchet 微分可能](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#def-f0-02c3-frechet-derivative) なら

$$
f(x+h)
=
f(x)+Df(x)[h]+r(h),
\qquad
\frac{|r(h)|}{\|h\|}\to0
$$

と書けます。ここで $h=tv$ と置くと、$Df(x)$ の線形性から

$$
\frac{f(x+tv)-f(x)}{t}
=
Df(x)[v]
+
\frac{r(tv)}{t}.
$$

$v$ は単位ベクトルなので $\|tv\|=|t|$ です。したがって $r(tv)/t\to0$ となり、

$$
D_vf(x)=Df(x)[v]
$$

を得ます。

さらに $f:\Omega\to\mathbb R$ では、Fréchet 微分 $Df(x)$ は各偏微分を係数にもつ線形写像なので

$$
Df(x)[v]
=
\sum_{j=1}^n
\frac{\partial f}{\partial x_j}(x)v_j
=
\nabla f(x)\cdot v.
$$

従って

$$
\boxed{
D_vf(x)=\nabla f(x)\cdot v
}
$$

です。[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|D_vf(x)|
=
|\nabla f(x)\cdot v|
\le
\|\nabla f(x)\|\,\|v\|
=
\|\nabla f(x)\|
$$

となります。特に $\nabla f(x)\neq0$ なら

$$
v
=
\frac{\nabla f(x)}{\|\nabla f(x)\|}
$$

と選ぶことで

$$
D_vf(x)=\|\nabla f(x)\|
$$

となります。つまり **勾配は最も急に増加する単位方向を向き、その最大増加率は $\|\nabla f(x)\|$** です。反対向き $-\nabla f(x)/\|\nabla f(x)\|$ では最も急に減少します。

### 例：球面の法線が勾配になる

$$
f(x,y,z)=x^2+y^2+z^2
$$

なら

$$
\nabla f=(2x,2y,2z).
$$

[レベル曲面](../RA6A/index.md#def-ra6a-level-set) $f=c$ は半径 $\sqrt c$ の球面で、勾配は半径方向を向きます。

<a id="thm-vc1-level-normal"></a>

<!-- formal-statement-start -->
> **定理（正則レベル曲面と勾配の直交）**  
> $f\in C^1(\Omega)$、$x_0\in\Omega$ とし、
>
$$
\nabla f(x_0)\neq0
$$
>
> とする。$f(x)=f(x_0)$ の正則レベル曲面上の任意の $C^1$ 曲線 $\gamma$ が $\gamma(0)=x_0$ を満たすなら
>
$$
\nabla f(x_0)\cdot\gamma'(0)=0.
$$
>
> 従って $\nabla f(x_0)$ はレベル曲面の接方向すべてに直交する。
<!-- formal-statement-end -->

### 証明の見取り図

レベル曲面上では $f(\gamma(t))$ が定数です。連鎖律で微分すると、その一次変化が 0 になります。

<!-- proof-start -->
### 証明

$\gamma(t)$ がレベル曲面上にあるので

$$
f(\gamma(t))=f(x_0)
$$

です。両辺を $t$ で微分し、$t=0$ を代入すると

$$
0
=
\frac{d}{dt}f(\gamma(t))\bigg|_{t=0}
=
Df(x_0)[\gamma'(0)]
=
\nabla f(x_0)\cdot\gamma'(0).
$$

よって主張が従います。
<!-- proof-end -->

---

## 3. 発散：微小体積からの正味の湧き出し

3 次元ベクトル場

$$
F=(F_1,F_2,F_3)
$$

を考えます。

<a id="def-vc1-divergence"></a>

<!-- formal-statement-start -->
> **定義（発散）**  
> $F\in C^1(\Omega;\mathbb R^3)$ に対し
>
$$
\operatorname{div}F
=
\frac{\partial F_1}{\partial x}
+
\frac{\partial F_2}{\partial y}
+
\frac{\partial F_3}{\partial z}
$$
>
> と定義する。二次元では第三成分を除いた式を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc1-divergence -->
**定義の確認**

放射状ベクトル場

$$
F(x,y,z)=(x,y,z)
$$

では

$$
\operatorname{div}F=1+1+1=3.
$$

どの点でも正なので、局所的には湧き出し源のように外へ押し出す場です。
<!-- definition-example-end -->

微小直方体

$$
[x,x+h]\times[y,y+k]\times[z,z+\ell]
$$

を考えると、$x$ 方向の二面からの正味の外向き流束は一次近似で

$$
\left(F_1(x+h,y,z)-F_1(x,y,z)\right)k\ell
=
F_{1x}(x,y,z)hk\ell+o(hk\ell).
$$

$y,z$ 方向も加えると

$$
\text{正味流束}
=
(\operatorname{div}F)\,hk\ell+o(hk\ell).
$$

したがって発散は「単位体積あたりの正味流出率」の局所密度です。これを有限領域へ積分した正確な等式が VC4 の Gauss--Ostrogradsky 定理です。

---

## 4. 回転（curl）：微小循環の軸と強さ

<a id="def-vc1-curl"></a>

<!-- formal-statement-start -->
> **定義（回転）**  
> $F=(P,Q,R)\in C^1(\Omega;\mathbb R^3)$ に対し
>
$$
\operatorname{curl}F
=
\nabla\times F
=
\left(
R_y-Q_z,\,
P_z-R_x,\,
Q_x-P_y
\right)
$$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc1-curl -->
**定義の確認**

剛体回転場

$$
F(x,y,z)=(-y,x,0)
$$

では

$$
\nabla\times F=(0,0,2).
$$

$xy$ 平面内で反時計回りに回る場の回転軸が $z$ 軸で、回転ベクトルも $+z$ 方向を向きます。
<!-- definition-example-end -->

なぜ第 3 成分が $Q_x-P_y$ なのかを、小長方形の循環で確認します。$xy$ 平面の

$$
[x,x+h]\times[y,y+k]
$$

の境界を反時計回りに一周すると、線積分の一次近似は

$$
Q_xhk-P_yhk+o(hk).
$$

面積 $hk$ で割ると

$$
Q_x-P_y
$$

が残ります。したがって回転の法線成分は「単位面積あたりの局所循環」を測ります。厳密な面積分との関係は VC5 の Stokes 定理で閉じます。

---

## 5. ラプラシアン：勾配の発散

<a id="def-vc1-laplacian"></a>

<!-- formal-statement-start -->
> **定義（スカラー・ラプラシアン）**  
> $f\in C^2(\Omega)$ に対し
>
$$
\Delta f
:=
\operatorname{div}(\nabla f)
=
\sum_{j=1}^n
\frac{\partial^2f}{\partial x_j^2}
$$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc1-laplacian -->
**定義の確認**

$$
f(x,y,z)=x^2+y^2+z^2
$$

では

$$
\nabla f=(2x,2y,2z)
$$

なので

$$
\Delta f
=
\operatorname{div}(\nabla f)
=
2+2+2
=
6.
$$
<!-- definition-example-end -->

例えば

$$
f(x,y,z)=x^2+y^2-2z^2
$$

なら

$$
\Delta f=2+2-4=0.
$$

このように $\Delta f=0$ を満たす関数が PDE5 で扱う調和関数です。

ベクトル場 $F=(F_1,F_2,F_3)$ に対するベクトル・ラプラシアンは本系列では成分ごとに

$$
\Delta F=(\Delta F_1,\Delta F_2,\Delta F_3)
$$

と置きます。曲線座標でのベクトル・ラプラシアンは VC6 で扱います。

---

## 6. 二つの基本恒等式

<a id="thm-vc1-curl-grad"></a>

<!-- formal-statement-start -->
> **定理（勾配の回転は 0）**  
> $f\in C^2(\Omega)$ なら
>
$$
\nabla\times(\nabla f)=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\nabla f=(f_x,f_y,f_z)
$$

なので

$$
\nabla\times\nabla f
=
(f_{zy}-f_{yz},\,f_{xz}-f_{zx},\,f_{yx}-f_{xy}).
$$

$f\in C^2$ では混合偏微分が交換できるため、各成分は 0 です。
<!-- proof-end -->

<a id="thm-vc1-div-curl"></a>

<!-- formal-statement-start -->
> **定理（回転の発散は 0）**  
> $F\in C^2(\Omega;\mathbb R^3)$ なら
>
$$
\operatorname{div}(\nabla\times F)=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F=(P,Q,R)$ とすると

$$
\begin{aligned}
\operatorname{div}(\nabla\times F)
&=
\partial_x(R_y-Q_z)
+\partial_y(P_z-R_x)
+\partial_z(Q_x-P_y)\\
&=
R_{yx}-R_{xy}
-Q_{zx}+Q_{xz}
+P_{zy}-P_{yz}\\
&=0.
\end{aligned}
$$

ここでも $C^2$ 正則性が混合偏微分の交換を保証しています。
<!-- proof-end -->

この二つは単なる記号上の偶然ではありません。後で

- 勾配場の任意の閉曲線に沿う循環が 0
- 回転場の任意の閉曲面を通る流束が 0

という積分的事実と対応します。

---

## 7. 積の微分則

ベクトル場 $F=(F_1,F_2,F_3)$ と $G=(G_1,G_2,G_3)$ に対し、

$$
((G\cdot\nabla)F)_i
:=
\sum_{j=1}^3
G_j\frac{\partial F_i}{\partial x_j}
$$

と書きます。これは「$G$ 方向へ $F$ の各成分を微分して得るベクトル」です。

<a id="prop-vc1-product-rules"></a>

<!-- formal-statement-start -->
> **命題（主要な積の微分則）**  
> $f\in C^1(\Omega)$、$F,G\in C^1(\Omega;\mathbb R^3)$ とする。このとき
>
$$
\operatorname{div}(fF)
=
\nabla f\cdot F
+
f\,\operatorname{div}F,
$$
>
$$
\nabla\times(fF)
=
\nabla f\times F
+
f(\nabla\times F),
$$
>
$$
\operatorname{div}(F\times G)
=
G\cdot(\nabla\times F)
-
F\cdot(\nabla\times G),
$$
>
$$
\nabla\times(F\times G)
=
F\,\operatorname{div}G
-
G\,\operatorname{div}F
+
(G\cdot\nabla)F
-
(F\cdot\nabla)G
$$
>
> が成り立つ。
<!-- formal-statement-end -->

最初の式は PDE6 の Green 第一恒等式の出発点になります。最後の式は流体力学で渦度方程式を展開するときにも現れます。

<!-- proof-start -->
### 証明

$F=(P,Q,R)$ とすると

$$
\begin{aligned}
\operatorname{div}(fF)
&=(fP)_x+(fQ)_y+(fR)_z\\
&=f_xP+f_yQ+f_zR
+f(P_x+Q_y+R_z)\\
&=\nabla f\cdot F+f\,\operatorname{div}F.
\end{aligned}
$$

次に

$$
\nabla\times(fF)
=
\left(
\partial_y(fR)-\partial_z(fQ),\,
\partial_z(fP)-\partial_x(fR),\,
\partial_x(fQ)-\partial_y(fP)
\right).
$$

積の微分を各成分へ使うと

$$
\begin{aligned}
\nabla\times(fF)
&=
(f_yR-f_zQ,\,
 f_zP-f_xR,\,
 f_xQ-f_yP)\\
&\quad
+
f(R_y-Q_z,\,
  P_z-R_x,\,
  Q_x-P_y)\\
&=
\nabla f\times F
+
f(\nabla\times F).
\end{aligned}
$$

続いて $G=(A,B,C)$ と置きます。

$$
F\times G
=
(QC-RB,\,
 RA-PC,\,
 PB-QA).
$$

したがって

$$
\begin{aligned}
\operatorname{div}(F\times G)
&=
\partial_x(QC-RB)
+\partial_y(RA-PC)
+\partial_z(PB-QA)\\
&=
A(R_y-Q_z)
+B(P_z-R_x)
+C(Q_x-P_y)\\
&\quad
+P(B_z-C_y)
+Q(C_x-A_z)
+R(A_y-B_x)\\
&=
G\cdot(\nabla\times F)
-
F\cdot(\nabla\times G).
\end{aligned}
$$

最後に $H=F\times G$ と置きます。curl の第一成分は

$$
\begin{aligned}
(\nabla\times H)_1
&=
\partial_y(PB-QA)
-
\partial_z(RA-PC)\\
&=
P_yB+PB_y-Q_yA-QA_y\\
&\quad
-R_zA-RA_z+P_zC+PC_z.
\end{aligned}
$$

一方、主張する右辺の第一成分は

$$
\begin{aligned}
&
P(A_x+B_y+C_z)
-A(P_x+Q_y+R_z)\\
&\quad
+(AP_x+BP_y+CP_z)
-(PA_x+QA_y+RA_z)\\
&=
P_yB+PB_y-Q_yA-QA_y\\
&\quad
-R_zA-RA_z+P_zC+PC_z.
\end{aligned}
$$

よって第一成分は一致します。第二・第三成分は、上の式で

$$
(x,y,z),\qquad
(P,Q,R),\qquad
(A,B,C)
$$

を同時に巡回置換した同一の展開です。従って三成分すべてで

$$
\nabla\times(F\times G)
=
F\,\operatorname{div}G
-
G\,\operatorname{div}F
+
(G\cdot\nabla)F
-
(F\cdot\nabla)G
$$

が成立します。
<!-- proof-end -->

---

## 8. 何を意味する演算子か

三つの一次微分演算子を並べると役割が違います。

- $\nabla f$：スカラー場の最急増加方向
- $\operatorname{div}F$：ベクトル場の湧き出し・吸い込みの密度
- $\nabla\times F$：ベクトル場の循環密度

したがって

$$
\nabla
\quad\text{を付ければ全部同じ}
$$

ではありません。入力と出力の型も

$$
\text{スカラー}\xrightarrow{\nabla}\text{ベクトル},
$$

$$
\text{ベクトル}\xrightarrow{\operatorname{div}}\text{スカラー},
$$

$$
\text{ベクトル}\xrightarrow{\operatorname{curl}}\text{ベクトル}
$$

と異なります。

---

## 9. 演習

#### VC1-A01 勾配とレベル曲面
- Level: A
- 目安時間: 12分

$$
f(x,y,z)=x^2+2y^2+3z^2
$$

について $(1,1,1)$ での勾配を求め、レベル曲面の接方向

$$
v=(2,-1,0)
$$

と直交するか確認せよ。

<!-- solution-start -->
### 詳細解答

$$
\nabla f=(2x,4y,6z)
$$

なので

$$
\nabla f(1,1,1)=(2,4,6).
$$

内積は

$$
(2,4,6)\cdot(2,-1,0)=4-4=0.
$$

従って $v$ はレベル曲面の接方向として勾配と直交しています。
<!-- solution-end -->

#### VC1-A02 発散の計算
- Level: A
- 目安時間: 10分

$$
F=(x^2y,\ yz,\ zx)
$$

の発散を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\operatorname{div}F
=
\partial_x(x^2y)+\partial_y(yz)+\partial_z(zx)
=
2xy+z+x.
$$

したがって

$$
\boxed{\operatorname{div}F=2xy+z+x}.
$$
<!-- solution-end -->

#### VC1-A03 回転の計算
- Level: A
- 目安時間: 10分

$$
F=(-2y,2x,z)
$$

の回転を求め、回転軸を説明せよ。

<!-- solution-start -->
### 詳細解答

$P=-2y,Q=2x,R=z$ なので

$$
\nabla\times F
=
(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y)
=
(0,0,2-(-2)).
$$

よって

$$
\boxed{\nabla\times F=(0,0,4)}.
$$

回転ベクトルは $+z$ 方向なので、局所循環の軸は $z$ 軸方向です。
<!-- solution-end -->

#### VC1-A04 ラプラシアンと調和性
- Level: A
- 目安時間: 12分

$$
f(x,y,z)=x^2-y^2+xyz
$$

について $\Delta f$ を求めよ。

<!-- solution-start -->
### 詳細解答

$$
f_{xx}=2,\qquad
f_{yy}=-2,\qquad
f_{zz}=0.
$$

したがって

$$
\Delta f=2-2+0=0.
$$

よって $f$ は $\mathbb R^3$ 上で調和です。
<!-- solution-end -->

#### VC1-B01 積の微分則を直接確認する
- Level: B
- 目安時間: 20分

$$
f=x+y+z,\qquad
F=(x,y,z)
$$

について

$$
\operatorname{div}(fF)
=
\nabla f\cdot F+f\,\operatorname{div}F
$$

を両辺別々に計算して確認せよ。

<!-- solution-start -->
### 詳細解答

左辺では

$$
fF=(xf,yf,zf).
$$

したがって

$$
\begin{aligned}
\operatorname{div}(fF)
&=\partial_x(xf)+\partial_y(yf)+\partial_z(zf)\\
&=(f+x)+(f+y)+(f+z)\\
&=3f+x+y+z\\
&=4(x+y+z).
\end{aligned}
$$

右辺では

$$
\nabla f=(1,1,1),
\qquad
\operatorname{div}F=3.
$$

よって

$$
\nabla f\cdot F+f\,\operatorname{div}F
=
x+y+z+3f
=
4(x+y+z).
$$

両辺が一致しました。
<!-- solution-end -->

#### VC1-B02 「勾配の回転は 0」の仮定
- Level: B
- 目安時間: 20分

$f\in C^2$ で $\nabla\times\nabla f=0$ となる証明で、$C^2$ 仮定がどこに使われるか説明せよ。また $f(x,y,z)=xyz$ で直接確認せよ。

<!-- solution-start -->
### 詳細解答

証明では

$$
f_{xy}=f_{yx},\quad
f_{yz}=f_{zy},\quad
f_{zx}=f_{xz}
$$

という混合偏微分の交換を使います。連続な二階偏微分を仮定する $C^2$ 条件が、この交換を保証します。

$f=xyz$ では

$$
\nabla f=(yz,xz,xy).
$$

従って

$$
\nabla\times\nabla f
=
(\partial_y(xy)-\partial_z(xz),\,
\partial_z(yz)-\partial_x(xy),\,
\partial_x(xz)-\partial_y(yz))
=
(0,0,0).
$$
<!-- solution-end -->

#### VC1-B03 発散ゼロと回転ゼロは別物
- Level: B
- 目安時間: 20分

次の二つを計算し、発散が 0 であることと回転が 0 であることが異なる条件であることを示せ。

$$
F=(-y,x,0),\qquad
G=(x,y,-2z).
$$

<!-- solution-start -->
### 詳細解答

$F$ について

$$
\operatorname{div}F=0+0+0=0,
$$

一方

$$
\nabla\times F=(0,0,2)\neq0.
$$

したがって $F$ は発散が 0 ですが、回転は 0 ではありません。

$G$ について

$$
\operatorname{div}G=1+1-2=0,
$$

また

$$
\nabla\times G=0.
$$

こちらは両方 0 です。

この比較だけでも、$\operatorname{div}$ と $\operatorname{curl}$ が同じ情報を測っていないことが分かります。
<!-- solution-end -->

#### VC1-C01 局所情報を全部つなぐ
- Level: C
- 目安時間: 35分

$$
F(x,y,z)=(-y,x,z),
\qquad
f(x,y,z)=x^2+y^2+z^2
$$

とする。

1. $\nabla f,\operatorname{div}F,\nabla\times F,\Delta f$ を求めよ。
2. 単位球面 $f=1$ 上で $\nabla f$ が法線方向を向くことを説明せよ。
3. $F$ の水平成分 $(-y,x,0)$ が局所回転を、鉛直成分 $(0,0,z)$ が湧き出しを持つことを発散と回転から説明せよ。
4. $\operatorname{div}(fF)$ を積の微分則で求めよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla f=(2x,2y,2z),
$$

$$
\operatorname{div}F
=
\partial_x(-y)+\partial_y(x)+\partial_z z
=
1,
$$

$$
\nabla\times F
=
(0,0,2),
$$

$$
\Delta f=2+2+2=6.
$$

2. 単位球面は $f=1$ という[レベル曲面](../RA6A/index.md#def-ra6a-level-set)です。[正則レベル曲面と勾配の直交](#thm-vc1-level-normal) より、$\nabla f$ はすべての接方向に直交します。実際

$$
\nabla f=2(x,y,z)
$$

なので半径方向です。

3. 水平成分 $(-y,x,0)$ は

$$
\nabla\times(-y,x,0)=(0,0,2)
$$

を持ち、$z$ 軸まわりの循環を表します。鉛直成分 $(0,0,z)$ は

$$
\operatorname{div}(0,0,z)=1
$$

で、局所的な正味流出を持ちます。

4. 積の微分則より

$$
\operatorname{div}(fF)
=
\nabla f\cdot F
+
f\,\operatorname{div}F.
$$

ここで

$$
\nabla f\cdot F
=
(2x,2y,2z)\cdot(-y,x,z)
=
-2xy+2xy+2z^2
=
2z^2.
$$

また $\operatorname{div}F=1$ なので

$$
\boxed{
\operatorname{div}(fF)
=
x^2+y^2+3z^2
}.
$$
<!-- solution-end -->

---

## 10. 次章への接続

VC1 では局所微分だけを扱いました。次の VC2 では、ベクトル場を曲線に沿って積分し、

$$
\nabla\phi
\quad\Longleftrightarrow\quad
\text{経路独立性}
$$

という局所微分と大域的な積分の対応へ進みます。
