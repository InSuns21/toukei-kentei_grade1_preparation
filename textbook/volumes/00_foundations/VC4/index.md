# VC4 Green・Gauss--Ostrogradsky と保存則

VC3 までで、曲線積分・曲面積分・流束 の定義がそろいました。本章では、内部の微分量を境界積分へ移す二つの基本定理を証明します。

二次元では Green の定理、

$$
\int_{\partial D}P\,dx+Q\,dy
=
\iint_D(Q_x-P_y)\,dA,
$$

三次元では Gauss--Ostrogradsky の発散定理、

$$
\int_{\partial\Omega}F\cdot n\,dS
=
\iiint_\Omega\operatorname{div}F\,dV
$$

です。

この二つは単なる積分計算の裏技ではありません。湧き出し密度、流束、局所保存則、PDE の Green 恒等式をつなぐ共通骨格です。

---

## 1. Green の定理：まず x-simple / y-simple で証明する

平面領域

$$
D
=
\{(x,y):a\le x\le b,\ \alpha(x)\le y\le\beta(x)\}
$$

を $y$-simple とします。境界を正向き、すなわち領域を左手側に見る向きで回るとします。

<a id="thm-vc4-green-circulation"></a>

<!-- formal-statement-start -->
> **定理（Green の定理：循環形）**  
> $D\subset\mathbb R^2$ を有界領域とし、境界 $\partial D$ が有限本の区分的 $C^1$ 曲線からなり、有限分割により $x$-simple かつ $y$-simple な部分領域へ分解できるとする。
>
> $P,Q\in C^1(\overline D)$ なら、正向き境界に沿って
>
$$
\boxed{
\int_{\partial D}P\,dx+Q\,dy
=
\iint_D
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)dA
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$-P_y$ は上下の境界の $P\,dx$ を作り、$Q_x$ は左右の境界の $Q\,dy$ を作ります。一般領域は 単純領域 に有限分割し、人工的な内部境界が逆向きに二度現れて相殺することを使います。

<!-- proof-start -->
### 証明

まず $y$-simple な

$$
D
=
\{(x,y):a\le x\le b,\ \alpha(x)\le y\le\beta(x)\}
$$

を考えます。[矩形上の反復積分定理](../RA7/index.md#thm-ra7-iterated-integral) と [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) から

$$
\begin{aligned}
-\iint_D P_y\,dA
&=
-\int_a^b
\int_{\alpha(x)}^{\beta(x)}
P_y(x,y)\,dy\,dx\\
&=
\int_a^b
P(x,\alpha(x))\,dx
-
\int_a^b
P(x,\beta(x))\,dx.
\end{aligned}
$$

正向き境界では下側 グラフ は $x=a$ から $b$ へ、上側 グラフ は $x=b$ から $a$ へ進みます。従って右辺はちょうど

$$
\int_{\partial D}P\,dx
$$

です。左右の鉛直辺では $dx=0$ なので寄与しません。

同様に $x$-simple な

$$
D
=
\{(x,y):c\le y\le d,\ \gamma(y)\le x\le\delta(y)\}
$$

に対して

$$
\begin{aligned}
\iint_DQ_x\,dA
&=
\int_c^d
\left[
Q(\delta(y),y)-Q(\gamma(y),y)
\right]dy\\
&=
\int_{\partial D}Q\,dy.
\end{aligned}
$$

二式を足せば 単純領域 で

$$
\int_{\partial D}P\,dx+Q\,dy
=
\iint_D(Q_x-P_y)\,dA
$$

です。

一般の $D$ を有限個のこの種の領域 $D_1,\ldots,D_m$ に分けます。各内部境界弧は、一方の部分領域では一向き、隣の部分領域では逆向きに現れるので、

$$
\int_\Gamma P\,dx+Q\,dy
+
\int_{-\Gamma}P\,dx+Q\,dy
=
0.
$$

従って部分領域の公式を全部足すと内部境界は消え、元の $\partial D$ だけが残ります。
<!-- proof-end -->

この「内部境界の相殺」は、Gauss 定理 でも同じ構造で現れます。

---

## 2. Green の定理 の 流束形

二次元 ベクトル場

$$
F=(P,Q)
$$

の外向き 流束 を考えます。

正向き境界曲線を

$$
\gamma(t)=(x(t),y(t))
$$

とすると、接ベクトルは

$$
T\propto(x',y')
$$

で、外向き法線に弧長を掛けた vector は

$$
n\,ds=(y',-x')\,dt.
$$

従って

$$
F\cdot n\,ds
=
P\,dy-Q\,dx.
$$

<a id="cor-vc4-green-flux"></a>

<!-- formal-statement-start -->
> **系（Green の定理：流束形）**  
> [Green の定理](#thm-vc4-green-circulation) と同じ仮定の下で
>
$$
\boxed{
\int_{\partial D}F\cdot n\,ds
=
\iint_D\operatorname{div}F\,dA
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

循環形 に

$$
\widetilde P=-Q,\qquad
\widetilde Q=P
$$

を代入すると

$$
\int_{\partial D}(-Q)\,dx+P\,dy
=
\iint_D(P_x+Q_y)\,dA.
$$

左辺は上の計算から $\int_{\partial D}F\cdot n\,ds$、右辺は $\iint_D\operatorname{div}F\,dA$ です。
<!-- proof-end -->

---

## 3. 例：円周積分を面積分へ変える

$$
F=(-y,x)
$$

を単位円板 $D$ 上で考えます。

直接一周すれば VC2 で

$$
\oint_{\partial D}F\cdot dr=2\pi
$$

でした。

Green の定理 では

$$
Q_x-P_y
=
1-(-1)
=
2
$$

なので

$$
\oint_{\partial D}F\cdot dr
=
\iint_D2\,dA
=
2\pi.
$$

境界を細かく積分する代わりに、内部の一定 回転密度 を積分しただけです。

---

## 4. 三次元：まず直方体で 発散定理 を見る

直方体

$$
B=[a,b]\times[c,d]\times[e,f]
$$

と

$$
F=(P,Q,R)\in C^1(B)
$$

を考えます。

$x$ 方向の二面だけを足すと

$$
\begin{aligned}
\int_{x=b}F\cdot n\,dS
+
\int_{x=a}F\cdot n\,dS
&=
\int_c^d\int_e^f
\left[
P(b,y,z)-P(a,y,z)
\right]dz\,dy\\
&=
\iiint_BP_x\,dV.
\end{aligned}
$$

$y$ 方向の二面については

$$
\int_{y=d}F\cdot n\,dS
+
\int_{y=c}F\cdot n\,dS
=
\iiint_B Q_y\,dV,
$$

$z$ 方向の二面については

$$
\int_{z=f}F\cdot n\,dS
+
\int_{z=e}F\cdot n\,dS
=
\iiint_B R_z\,dV.
$$

三方向の六面を足すと

$$
\int_{\partial B}F\cdot n\,dS
=
\iiint_B(P_x+Q_y+R_z)\,dV.
$$

つまり 直方体 では一変数 微積分学の基本定理 の三方向の和にすぎません。

---

## 5. グラフ領域 へ拡張する

例えば

$$
\Omega
=
\{(x,y,z):(x,y)\in D,\ \alpha(x,y)\le z\le\beta(x,y)\}
$$

を考えます。

$R_z$ を積分すると

$$
\iiint_\Omega R_z\,dV
=
\iint_D
\left[
R(x,y,\beta)-R(x,y,\alpha)
\right]dA.
$$

上面

$$
z=\beta(x,y)
$$

の外向き ベクトル面積要素 は VC3 の グラフ formula から

$$
n\,dS
=
(-\beta_x,-\beta_y,1)\,dx\,dy
$$

なので、その $z$ 成分は $+1$ です。

下面

$$
z=\alpha(x,y)
$$

では外向き向きが逆なので $z$ 成分は $-1$ です。

従って $R_z$ の体積積分が上下境界からの $R n_z$ の 流束 になります。$x$-simple 表示では左右面の 外向きベクトル面積要素 の $x$ 成分がそれぞれ $+1,-1$ となるため

$$
\iiint_\Omega P_x\,dV
=
\int_{\partial\Omega}P n_x\,dS,
$$

$y$-simple 表示でも前後面の $y$ 成分を使って

$$
\iiint_\Omega Q_y\,dV
=
\int_{\partial\Omega}Q n_y\,dS
$$

を得ます。三式を足すことが 発散定理 の局所計算です。

---

## 6. Gauss--Ostrogradsky の発散定理

<a id="thm-vc4-gauss-divergence"></a>

<!-- formal-statement-start -->
> **定理（Gauss--Ostrogradsky の発散定理）**  
> $\Omega\subset\mathbb R^3$ を有界領域とし、$\partial\Omega$ が有限個の $C^1$ 曲面パッチ からなる区分的に滑らかな閉曲面であるとする。
>
> さらに $\Omega$ が有限分割により、各座標方向について グラフ領域 として扱える有限個の部分領域へ分解できるとする。
>
> $F\in C^1(\overline\Omega;\mathbb R^3)$ なら
>
$$
\boxed{
\int_{\partial\Omega}F\cdot n\,dS
=
\iiint_\Omega\operatorname{div}F\,dV
}
$$
>
> が成り立つ。$n$ は外向き単位法線である。
<!-- formal-statement-end -->

### 証明の見取り図

直方体 の証明を各座標方向に グラフ領域 へ伸ばし、最後に有限分割を足します。人工的な内部面では法線が互いに逆向きなので 流束 が完全に相殺します。

<!-- proof-start -->
### 証明

まず一つの部分領域 $\Omega_j$ が $x$-simple、$y$-simple、$z$-simple な グラフ領域 として扱えるとします。

前節の $z$-simple 計算から

$$
\iiint_{\Omega_j}R_z\,dV
=
\int_{\partial\Omega_j}R\,n_z\,dS.
$$

$x$-simple 表示では

$$
\iiint_{\Omega_j}P_x\,dV
=
\int_{\partial\Omega_j}P\,n_x\,dS,
$$

$y$-simple 表示から

$$
\iiint_{\Omega_j}Q_y\,dV
=
\int_{\partial\Omega_j}Q\,n_y\,dS.
$$

三式を足すと

$$
\iiint_{\Omega_j}
(P_x+Q_y+R_z)\,dV
=
\int_{\partial\Omega_j}
(Pn_x+Qn_y+Rn_z)\,dS.
$$

すなわち

$$
\iiint_{\Omega_j}\operatorname{div}F\,dV
=
\int_{\partial\Omega_j}F\cdot n\,dS.
$$

次に

$$
\overline\Omega
=
\bigcup_{j=1}^m\overline{\Omega_j}
$$

となる有限分割を取ります。

体積積分は内部の重なりが境界集合だけなので足し合わせられ、

$$
\sum_j
\iiint_{\Omega_j}\operatorname{div}F\,dV
=
\iiint_\Omega\operatorname{div}F\,dV.
$$

一方、隣接する二領域 $\Omega_i,\Omega_j$ が共有する内部面 $\Sigma$ では、それぞれの外向き法線が

$$
n_j=-n_i
$$

です。したがって

$$
F\cdot n_i+F\cdot n_j=0
$$

で、共有面の 流束 は相殺します。

すべての内部面を消した後に残るのは元の外部境界 $\partial\Omega$ だけなので、

$$
\sum_j
\int_{\partial\Omega_j}F\cdot n_j\,dS
=
\int_{\partial\Omega}F\cdot n\,dS.
$$

よって主張が従います。
<!-- proof-end -->

この証明で 領域 仮定が必要なのは、「グラフ領域 で一変数 微積分学の基本定理 を使えること」と「有限分割で内部境界を相殺できること」です。一般の非常に粗い境界まで拡張するのは測度論的 Gauss--Green の定理 の仕事であり、本章では扱いません。

---

## 7. 例：球の 流束 を一行で計算する

$$
F(x,y,z)=(x,y,z)
$$

なら

$$
\operatorname{div}F=3.
$$

半径 $R$ の球 $B_R$ に対し

$$
\int_{\partial B_R}F\cdot n\,dS
=
\iiint_{B_R}3\,dV
=
3\cdot\frac43\pi R^3
=
\boxed{4\pi R^3}.
$$

VC3 で球面を直接パラメータ表示して得た値と一致します。

---

## 8. 場 が未定義の点を含むと 定理 はそのまま使えない

$$
F(x)
=
\frac{x}{|x|^3}
$$

は $\mathbb R^3\setminus\{0\}$ で

$$
\operatorname{div}F=0
$$

です。

ところが原点を囲む半径 $R$ の球面では VC3 で

$$
\int_{S_R}F\cdot n\,dS
=
4\pi.
$$

「発散 が 0 なのに 流束 が 0 でない」ように見えますが、矛盾ではありません。

[Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) の仮定

$$
F\in C^1(\overline\Omega)
$$

が原点で壊れています。

原点を小球 $B_\varepsilon$ でくり抜いた 球殻領域

$$
B_R\setminus\overline{B_\varepsilon}
$$

に 定理 を適用すると、外球の 流束 $4\pi$ と内球境界の外向き 流束 $-4\pi$ が相殺し、体積積分 0 と一致します。

この「場 が定義されない点をくり抜いて内側境界を追う」考え方は PDE6 の 基本解 で再登場します。

---

## 9. 湧き出し密度 と total 湧き出し

発散定理 は

$$
\operatorname{div}F
$$

を局所 湧き出し密度 と呼ぶ理由を正確にします。

任意の適切な領域 $\Omega$ について

$$
\text{境界から外へ出る total flux}
=
\text{内部の source density の総和}.
$$

つまり

$$
\int_{\partial\Omega}F\cdot n\,dS
=
\iiint_\Omega\operatorname{div}F\,dV.
$$

発散 が正の領域では 正味の流出、負の領域では正味の流入が生じます。

---

## 10. 局所保存則から積分保存則へ

時間依存する密度 $\rho(t,x)$ と 流束 $J(t,x)$ を考えます。

<a id="def-vc4-local-conservation"></a>

<!-- formal-statement-start -->
> **定義（局所保存則）**  
> 十分滑らかな $\rho,J$ が
>
$$
\frac{\partial\rho}{\partial t}
+
\operatorname{div}J
=
s
$$
>
> を満たすとき、これを 生成項 $s$ を持つ局所保存則と呼ぶ。
>
> $s=0$ のとき 生成項のない保存則 である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc4-local-conservation -->
**定義の確認**

$$
\rho(t,x,y,z)=e^{-3t},
\qquad
J(t,x,y,z)=e^{-3t}(x,y,z),
\qquad
s=0
$$

とします。このとき

$$
\partial_t\rho=-3e^{-3t},
\qquad
\operatorname{div}J=3e^{-3t},
$$

なので

$$
\partial_t\rho+\operatorname{div}J=0=s.
$$

したがってこの組は 生成項なし の局所保存則を実際に満たします。
<!-- definition-example-end -->

<a id="thm-vc4-local-to-integral"></a>

<!-- formal-statement-start -->
> **定理（局所保存則から積分保存則）**  
> 固定された有界領域 $\Omega$ に対して、$\rho$ の時間微分を積分記号の中へ入れられ、$J(t,\cdot)\in C^1(\overline\Omega)$ とする。
>
$$
\partial_t\rho+\operatorname{div}J=s
$$
>
> なら
>
$$
\boxed{
\frac{d}{dt}\iiint_\Omega\rho\,dV
=
-\int_{\partial\Omega}J\cdot n\,dS
+
\iiint_\Omega s\,dV
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

局所式を $\Omega$ 全体で積分し、発散 の体積積分だけを Gauss 定理 で境界 流束 に移します。

<!-- proof-start -->
### 証明

$$
\partial_t\rho+\operatorname{div}J=s
$$

を $\Omega$ 上で積分すると

$$
\iiint_\Omega\partial_t\rho\,dV
+
\iiint_\Omega\operatorname{div}J\,dV
=
\iiint_\Omega s\,dV.
$$

仮定より

$$
\iiint_\Omega\partial_t\rho\,dV
=
\frac{d}{dt}\iiint_\Omega\rho\,dV.
$$

また [Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) より

$$
\iiint_\Omega\operatorname{div}J\,dV
=
\int_{\partial\Omega}J\cdot n\,dS.
$$

移項して

$$
\frac{d}{dt}\iiint_\Omega\rho\,dV
=
-\int_{\partial\Omega}J\cdot n\,dS
+
\iiint_\Omega s\,dV.
$$
<!-- proof-end -->

符号の意味は明快です。外向き 流束 が正なら、固定領域の内部に残る量は減ります。

---

## 11. 積分保存則から局所式へ戻す

物理ではしばしば積分形の方が先に現れます。

<a id="prop-vc4-integral-to-local"></a>

<!-- formal-statement-start -->
> **命題（任意の小領域での積分保存則から局所式）**  
> 連続関数
>
$$
g(t,x)
:=
\partial_t\rho(t,x)
+
\operatorname{div}J(t,x)
-
s(t,x)
$$
>
> を考える。
>
> ある時刻 $t$ を固定し、任意の十分小さい直方体 $B$ について
>
$$
\iiint_Bg(t,x)\,dV=0
$$
>
> が成り立つなら
>
$$
g(t,x)=0
$$
>
> が各点で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

もし $g(x_0)>0$ なら連続性により $x_0$ の十分小さい近傍で $g>0$ が続き、その小 直方体 の積分は正になってしまいます。負の場合も同様です。

<!-- proof-start -->
### 証明

ある点 $x_0$ で

$$
g(t,x_0)>0
$$

と仮定します。連続性から、ある $\varepsilon>0$ と $x_0$ を含む十分小さい直方体 $B$ が存在して

$$
g(t,x)\ge\varepsilon
\qquad(x\in B)
$$

となります。

すると

$$
\iiint_Bg(t,x)\,dV
\ge
\varepsilon\,\operatorname{Vol}(B)
>0,
$$

これは仮定に反します。

$g(t,x_0)<0$ も $-g$ に同じ議論を適用して排除できます。従って全点で

$$
g(t,x)=0.
$$
<!-- proof-end -->

ここで重要なのは **任意の領域** で積分形が成立することです。一つの固定領域について 総収支 が成立するだけでは、点ごとの局所式は導けません。

---

## 12. PDE6 への 標準的な接続

[PDE6](../PDE6/index.md) では Green 第一恒等式を

$$
\operatorname{div}(u\nabla v)
=
\nabla u\cdot\nabla v
+
u\Delta v
$$

から導きます。

VC1 の [積の微分則](../VC1/index.md#prop-vc1-product-rules) と、本章の [Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) を使えば

$$
\iiint_\Omega
\left(
\nabla u\cdot\nabla v
+
u\Delta v
\right)dV
=
\int_{\partial\Omega}
u\frac{\partial v}{\partial n}\,dS
$$

へ直行できます。

したがって PDE6 が発散定理そのものを再証明する必要はありません。PDE6 の主役は Green の恒等式、基本解、Green 関数 です。

---

## 13. 演習

#### VC4-A01 Green の定理 で循環を求める
- Level: A
- 目安時間: 15分

単位円板 $D$ と

$$
P=-y,\qquad Q=x
$$

について

$$
\int_{\partial D}P\,dx+Q\,dy
$$

を Green の定理 で求めよ。

<!-- solution-start -->
### 詳細解答

$$
Q_x-P_y
=
1-(-1)
=
2.
$$

従って

$$
\int_{\partial D}P\,dx+Q\,dy
=
\iint_D2\,dA
=
2\operatorname{Area}(D)
=
\boxed{2\pi}.
$$
<!-- solution-end -->

#### VC4-A02 Green 流束形
- Level: A
- 目安時間: 15分

長方形

$$
D=[0,a]\times[0,b]
$$

と

$$
F=(x,y)
$$

について 総外向き流束 を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\operatorname{div}F=1+1=2.
$$

Green の定理 の 流束形 から

$$
\int_{\partial D}F\cdot n\,ds
=
\iint_D2\,dA
=
2ab.
$$

従って

$$
\boxed{2ab}.
$$
<!-- solution-end -->

#### VC4-A03 直方体 の 発散定理
- Level: A
- 目安時間: 18分

$$
\Omega=[0,a]\times[0,b]\times[0,c],
\qquad
F=(x,y,z)
$$

について [Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) を使って 総流束 を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\operatorname{div}F=3.
$$

直方体 の体積は $abc$ なので

$$
\int_{\partial\Omega}F\cdot n\,dS
=
\iiint_\Omega3\,dV
=
\boxed{3abc}.
$$
<!-- solution-end -->

#### VC4-A04 生成項のない保存
- Level: A
- 目安時間: 15分

$$
\partial_t\rho+\operatorname{div}J=0
$$

を満たすとする。固定領域 $\Omega$ の境界上で

$$
J\cdot n=0
$$

なら、$\int_\Omega\rho\,dV$ が時間に依らないことを示せ。

<!-- solution-start -->
### 詳細解答

[局所保存則から積分保存則](#thm-vc4-local-to-integral) で $s=0$ とすると

$$
\frac{d}{dt}\iiint_\Omega\rho\,dV
=
-\int_{\partial\Omega}J\cdot n\,dS.
$$

境界上で $J\cdot n=0$ なので右辺は 0 です。

従って

$$
\boxed{
\frac{d}{dt}\iiint_\Omega\rho\,dV=0
}
$$

であり、総量 は保存されます。
<!-- solution-end -->

#### VC4-B01 球対称 場 の 流束
- Level: B
- 目安時間: 22分

$$
F(x)=x
$$

について、半径 $R$ の球で 総外向き流束 を

1. VC3 の直接計算
2. 発散定理

の二通りで求めて一致を確認せよ。

<!-- solution-start -->
### 詳細解答

1. 球面上で $x=Rn$ なので

$$
F\cdot n=R.
$$

球面積は $4\pi R^2$ だから

$$
\int_{S_R}F\cdot n\,dS
=
4\pi R^3.
$$

2.

$$
\operatorname{div}F=3.
$$

球体積は

$$
\frac43\pi R^3
$$

なので

$$
\iiint_{B_R}\operatorname{div}F\,dV
=
3\cdot\frac43\pi R^3
=
4\pi R^3.
$$

従って両者は

$$
\boxed{4\pi R^3}
$$

で一致します。
<!-- solution-end -->

#### VC4-B02 特異場とくり抜き
- Level: B
- 目安時間: 28分

$$
F(x)=\frac{x}{|x|^3}
$$

について、球殻領域

$$
\Omega_{\varepsilon,R}
=
\{x:\varepsilon<|x|<R\}
$$

で 発散定理 を適用し、外球と内球の 流束 が相殺することを確認せよ。

<!-- solution-start -->
### 詳細解答

原点を除けば

$$
\operatorname{div}F=0.
$$

従って

$$
\int_{\partial\Omega_{\varepsilon,R}}F\cdot n\,dS=0.
$$

外球 $|x|=R$ では外向き法線が 放射方向外向き なので 流束 は

$$
4\pi.
$$

内球 $|x|=\varepsilon$ は 球殻領域 から見た外向き法線が **原点方向**、すなわち通常の球の外向き法線の逆です。

通常の radial 外向き流束 は $4\pi$ なので、annulus の内側境界としては

$$
-4\pi.
$$

従って

$$
4\pi-4\pi=0,
$$

体積積分と一致します。
<!-- solution-end -->

#### VC4-B03 保存則の 生成項
- Level: B
- 目安時間: 25分

$$
\partial_t\rho+\operatorname{div}J=s
$$

を満たすとする。ある固定領域 $\Omega$ について

$$
\int_{\partial\Omega}J\cdot n\,dS=5,
\qquad
\iiint_\Omega s\,dV=8
$$

なら、領域内 総量 の時間変化率を求め、その意味を説明せよ。

<!-- solution-start -->
### 詳細解答

積分保存則より

$$
\frac{d}{dt}\iiint_\Omega\rho\,dV
=
-5+8
=
\boxed{3}.
$$

境界から毎単位時間 5 が流出しますが、内部 湧き出し が毎単位時間 8 を生成するため、差し引き 3 だけ 総量 が増加します。
<!-- solution-end -->

#### VC4-C01 Green・Gauss・保存則を一つにつなぐ
- Level: C
- 目安時間: 45分

$$
J(x,y,z)=(x,y,z)
$$

とし、密度 $\rho$ が

$$
\partial_t\rho+\operatorname{div}J=0
$$

を満たすとする。半径 $R$ の固定球 $B_R$ について次を行え。

1. $\operatorname{div}J$ を求めよ。
2. [Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) から境界 流束 を求めよ。
3. $\frac{d}{dt}\int_{B_R}\rho\,dV$ を求めよ。
4. $R$ を小さくしたとき「局所的に密度が減る」ことと $\operatorname{div}J>0$ の関係を説明せよ。
5. 同じ $J$ を $z=0$ 平面に制限した二次元 場 $(x,y)$ について、Green 流束形 で半径 $R$ の円板から出る 流束 を求めよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\operatorname{div}J=1+1+1=3.
$$

2. [Gauss--Ostrogradsky の発散定理](#thm-vc4-gauss-divergence) より

$$
\int_{\partial B_R}J\cdot n\,dS
=
\iiint_{B_R}3\,dV
=
3\cdot\frac43\pi R^3
=
\boxed{4\pi R^3}.
$$

3. 生成項のない保存則 なので

$$
\frac{d}{dt}\iiint_{B_R}\rho\,dV
=
-\int_{\partial B_R}J\cdot n\,dS
=
\boxed{-4\pi R^3}.
$$

4. $\operatorname{div}J=3>0$ は各点の近くで 正味の外向き流束密度が正であることを表します。生成項 がないため、その分だけ固定された小領域内部の 総量 は減少します。小球の体積で割ると平均変化率は

$$
\frac{-4\pi R^3}{(4/3)\pi R^3}
=
-3,
$$

局所式

$$
\partial_t\rho=-\operatorname{div}J=-3
$$

と一致します。

5. 二次元 場 $F=(x,y)$ では

$$
\operatorname{div}F=2.
$$

Green 流束形 から

$$
\int_{\partial D_R}F\cdot n\,ds
=
\iint_{D_R}2\,dA
=
2\pi R^2.
$$

従って

$$
\boxed{2\pi R^2}.
$$

二次元でも三次元でも「内部 発散 の総和 = 境界 外向き流束」という同じ構造が働いています。
<!-- solution-end -->

---

## 14. まとめ

VC4 で得た二つの積分定理は

$$
\text{局所微分}
\quad\longrightarrow\quad
\text{境界の総量}
$$

という同じ原理です。

- Green の定理：二次元で 循環 / 流束 と内部 curl / 発散 を結ぶ。
- Gauss--Ostrogradsky の発散定理：三次元で 境界流束 と volume 発散 を結ぶ。
- conservation law：発散定理 を時間発展へ適用したもの。

次の VC5 では、残るもう一つの積分定理 [Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes) を扱います。そこで

$$
\operatorname{curl}
\quad\longleftrightarrow\quad
\text{boundary circulation}
$$

という対応を曲面上で正本化します。
