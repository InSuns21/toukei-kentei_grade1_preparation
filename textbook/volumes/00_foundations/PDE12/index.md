# PDE12 一般一階 PDE と特性法

<!-- definition-example-audit: strict -->

PDE1 では輸送方程式と Burgers 方程式を特性曲線で解きました。本章ではその考えを

$$
F(x,u,\nabla u)=0
$$

という一般の一階の形へ拡張し、力学から現れる一階方程式

$$
u_t+H(x,\nabla u)=0
$$

へ接続します。

主役は位置 $x$ だけでなく、関数値 $z=u(x)$ と勾配 $p=\nabla u(x)$ も同時に運ぶ特性 ODE 系です。

## 1. 最も一般的な一階の形

PDE1 の輸送方程式では $u_x,u_t$ が線形に現れ、Burgers 方程式では係数自身が未知関数に依存しました。さらに、勾配の大きさを指定する方程式のように、各偏微分が非線形な組合せで現れる場合もあります。

それらを個別の形のまま扱うと、方程式ごとに特性法を作り直すことになります。そこで、位置 $x$、関数値 $z$、勾配 $p$ を独立な入力として一つの関数 $F(x,z,p)$ にまとめます。こうすると「解のグラフ上で $F=0$ を保つには、$x,z,p$ をどう動かせばよいか」という共通の問いに変えられます。

<a id="def-pde12-first-order"></a>
<!-- formal-statement-start -->
> **定義（一般一階非線形 PDE）**  
> 開集合 $\Omega\subset\mathbb R^n$ と滑らかな

$$
F:\Omega\times\mathbb R\times\mathbb R^n\to\mathbb R
$$

> に対し、$u\in C^1(\Omega)$ が

$$
F(x,u(x),\nabla u(x))=0
$$

> を満たすとき、$u$ を古典解という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-first-order -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：勾配の大きさを固定する

$$
|\nabla u|=1
$$

は $F(x,z,p)=|p|^2-1$ と書けます。$u(x)=|x|$ は $x\ne0$ で $\nabla u=x/|x|$ なので古典解ですが、原点では微分不能です。
<!-- definition-example-end -->

## 2. 位置・関数値・勾配を同時に運ぶ

輸送方程式では位置 $x(s)$ だけを特性曲線として追えば、$u$ の値はその曲線上で運べました。しかし一般の

$$
F(x,u,\nabla u)=0
$$

では、進む方向そのものが $F_p$ を通じて勾配 $p=\nabla u$ に依存します。したがって位置だけを追っても方程式が閉じません。

そこで特性上の

$$
x(s),\qquad
z(s)=u(x(s)),\qquad
p(s)=\nabla u(x(s))
$$

を同時に未知量として扱います。PDEを $x$ で微分して Hessian を消去できるように速度を $\dot x=F_p$ と選ぶと、三つの量だけで閉じた ODE 系が得られます。

<a id="thm-pde12-charpit"></a>
<!-- formal-statement-start -->
> **定理（Charpit の特性系）**  
> $F\in C^2$ とし、$u\in C^2(\Omega)$ が $F(x,u,\nabla u)=0$ を満たすとする。解のグラフ上で

$$
z=u(x),\qquad p=\nabla u(x)
$$

> と置く。特性曲線を

$$
\dot x=F_p(x,z,p)
$$

> に沿って取ると

$$
\dot z=p\cdot F_p,
\qquad
\dot p=-F_x-pF_z
$$

> が成り立つ。従って

$$
\boxed{
\dot x=F_p,\qquad
\dot z=p\cdot F_p,\qquad
\dot p=-F_x-pF_z
}
$$

> が特性 ODE 系である。また、この系に沿って $F$ は一定である。
<!-- formal-statement-end -->

### 証明の見取り図

$\dot z$ は連鎖律から出ます。$\dot p$ は PDE を $x$ で微分して Hessian と $F_p$ の積を取り出します。最後に $dF/ds$ へ特性式を代入すると全項が打ち消されます。

<!-- proof-start -->
### 証明

まず

$$
\dot z
=
\nabla u\cdot\dot x
=
p\cdot F_p.
$$

恒等式

$$
F(x,u(x),\nabla u(x))=0
$$

を $x_j$ で微分すると

$$
(F_x)_j+F_zp_j+\sum_k(F_p)_ku_{x_kx_j}=0.
$$

従ってベクトル表示で

$$
D^2u\,F_p=-F_x-pF_z.
$$

一方 $p=\nabla u$ なので

$$
\dot p=D^2u\,\dot x=D^2u\,F_p=-F_x-pF_z.
$$

さらに

$$
\frac d{ds}F
=
F_x\cdot\dot x+F_z\dot z+F_p\cdot\dot p.
$$

ここへ三本の特性式を代入すると

$$
F_x\cdot F_p
+
F_z(p\cdot F_p)
+
F_p\cdot(-F_x-pF_z)
=0.
$$
<!-- proof-end -->

## 3. 力学から現れる一階方程式

一般 Charpit 系は $(x,z,p)$ の全てを含みますが、重要な特別形では大きく簡約されます。時間 $t$ を一つの独立変数として分け、

$$
u_t+H(x,\nabla_xu)=0
$$

とすると、方程式は $u$ 自身には依存せず、空間勾配 $p=\nabla_xu$ をハミルトニアン $H(x,p)$ へ入れる形になります。

この構造を Charpit 系へ代入すると、$(x,p)$ の運動は Hamilton の正準方程式そのものになります。つまり一階 PDE の特性曲線と力学系の軌道が同じ方程式で記述されます。

<a id="def-pde12-hamilton-jacobi"></a>
<!-- formal-statement-start -->
> **定義（Hamilton--Jacobi 方程式）**  
> ハミルトニアン（Hamiltonian） $H(x,p)$ に対する

$$
u_t+H(x,\nabla_xu)=0
$$

> を Hamilton--Jacobi 方程式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-hamilton-jacobi -->
**定義の確認**：以下で定義の条件を直接確認します。

### 具体例：自由粒子

$$
H(p)=\frac12|p|^2
$$

なら

$$
u_t+\frac12|\nabla u|^2=0.
$$
<!-- definition-example-end -->

<a id="thm-pde12-hamilton-characteristics"></a>
<!-- formal-statement-start -->
> **定理（Hamilton--Jacobi の特性方程式）**  
> $H\in C^2$ とし、$u\in C^2$ が
>
$$
u_t+H(x,\nabla_xu)=0
$$
>
> を満たすとする。$p=\nabla_xu$、$z=u$ と置くと、特性は
>
$$
\dot x=H_p(x,p),
\qquad
\dot p=-H_x(x,p),
$$
>
$$
\dot z=p\cdot H_p-H
$$
>
> を満たす。$H$ が時刻に陽に依存しなければ、特性に沿って $H(x(t),p(t))$ は一定である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

独立変数を $(t,x)\in\mathbb R^{1+n}$、その勾配を

$$
(q,p)=(u_t,\nabla_xu)
$$

とまとめ、

$$
F(t,x,z,q,p)
=
q+H(x,p)
$$

と置きます。一般 Charpit 系をこの $(1+n)$ 次元の独立変数へ適用します。

まず

$$
F_q=1,
\qquad
F_p=H_p,
\qquad
F_z=0,
\qquad
F_t=0,
\qquad
F_x=H_x.
$$

従って特性パラメータを $s$ とすると

$$
\frac{dt}{ds}=F_q=1.
$$

よって定数をずらせば $s=t$ と取れます。空間勾配成分については

$$
\dot x=H_p,
\qquad
\dot p=-H_x.
$$

時間方向の勾配 $q$ についても

$$
\dot q
=
-F_t-qF_z
=
0
$$

です。さらに関数値 $z$ は

$$
\dot z
=
qF_q+p\cdot F_p
=
q+p\cdot H_p.
$$

PDE 自身から $q=-H$ なので

$$
\dot z
=
p\cdot H_p-H.
$$

最後に $H$ は時刻に陽に依存しないから

$$
\frac d{dt}H(x(t),p(t))
=
H_x\cdot\dot x+H_p\cdot\dot p
=
H_x\cdot H_p
+
H_p\cdot(-H_x)
=
0.
$$
<!-- proof-end -->

## 4. 初期値から局所古典解を再構成する

初期値 $u(0,x)=u_0(x)$ に対し、初期ラベル $a$ から

$$
X(0,a)=a,\qquad
P(0,a)=\nabla u_0(a),\qquad
Z(0,a)=u_0(a)
$$

として Hamilton 特性を解きます。

<a id="thm-pde12-reconstruction"></a>
<!-- formal-statement-start -->
> **定理（Hamilton 特性からの局所古典解の再構成）**  
> $H\in C^2(\mathbb R^n\times\mathbb R^n)$、$u_0\in C^2(U)$ とする。初期ラベル $a\in U$ に対し

$$
\dot X=H_p(X,P),
\qquad
\dot P=-H_x(X,P),
$$

$$
\dot Z=P\cdot H_p(X,P)-H(X,P)
$$

> を

$$
X(0,a)=a,
\qquad
P(0,a)=\nabla u_0(a),
\qquad
Z(0,a)=u_0(a)
$$

> から解く。ある $(t_0,a_0)$ の近くでこの特性解が存在し、

$$
\det D_aX(t_0,a_0)\ne0
$$

> とする。このとき $(t_0,x_0)$、$x_0=X(t_0,a_0)$ の近くで初期ラベルを

$$
a=A(t,x)
$$

> と一意な $C^1$ 級関数として解ける。さらに

$$
u(t,x)
=
Z(t,A(t,x))
$$

> と定めると

$$
\nabla_xu(t,x)
=
P(t,A(t,x))
$$

> であり、$u$ は $(t_0,x_0)$ の近くで

$$
u_t+H(x,\nabla_xu)=0
$$

> を満たす古典解である。また $t=0$ で同じ再構成を行えば $A(0,x)=x$ なので、構成は初期値 $u(0,x)=u_0(x)$ と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

核心は二つです。

1. 特性に沿って

$$
D_aZ=P^\top D_aX
$$

が保存される。
2. $\det D_aX\ne0$ なら $(t,a)\mapsto(t,X(t,a))$ が局所可逆なので、特性上の量 $(X,P,Z)$ を $(t,x)$ の関数へ戻せる。

1 により、戻した $Z$ の空間勾配が本当に $P$ になることが保証されます。

<!-- proof-start -->
### 証明

Hamilton 系

$$
\frac d{dt}
\begin{pmatrix}
X\\
P
\end{pmatrix}
=
\begin{pmatrix}
H_p(X,P)\\
-H_x(X,P)
\end{pmatrix}
$$

の右辺は $H\in C^2$ により $C^1$ 級です。従って ODE8 の [流れの初期値微分と変分方程式](../ODE8/index.md#lem-ode8-flow-variational) を $(X,P)$ 系へ適用でき、$X(t,a),P(t,a)$ は初期ラベル $a$ について $C^1$ 級です。さらに

$$
Z(t,a)
=
u_0(a)
+
\int_0^t
\{P\cdot H_p-H\}(X(s,a),P(s,a))\,ds
$$

なので $Z$ も $a$ について $C^1$ 級です。以下の $a$ 微分はこれで正当化されます。

まず

$$
W(t,a)
=
D_aZ(t,a)
-
P(t,a)^\top D_aX(t,a)
$$

と置きます。初期時刻では

$$
D_aZ(0,a)
=
\nabla u_0(a)^\top
=
P(0,a)^\top D_aX(0,a)
$$

なので

$$
W(0,a)=0.
$$

Hamilton 方程式を $a$ で微分すると

$$
\partial_tD_aX
=
H_{px}D_aX+H_{pp}D_aP,
$$

$$
\partial_tD_aP
=
-H_{xx}D_aX-H_{xp}D_aP.
$$

次に

$$
\dot Z
=
P^\top H_p-H
$$

を $a$ で微分します。積の微分を省略せず書くと

$$
\begin{aligned}
\partial_tD_aZ
&=
H_p^\top D_aP
+
P^\top
\left(
H_{px}D_aX+H_{pp}D_aP
\right)\\
&\qquad
-
H_x^\top D_aX
-
H_p^\top D_aP.
\end{aligned}
$$

最初と最後の項が打ち消されるので

$$
\partial_tD_aZ
=
P^\top H_{px}D_aX
+
P^\top H_{pp}D_aP
-
H_x^\top D_aX.
$$

一方、

$$
\begin{aligned}
\partial_t(P^\top D_aX)
&=
(\partial_tP)^\top D_aX
+
P^\top\partial_tD_aX\\
&=
(-H_x)^\top D_aX
+
P^\top
\left(
H_{px}D_aX+H_{pp}D_aP
\right),
\end{aligned}
$$

で、これは $\partial_tD_aZ$ と一致します。従って

$$
\partial_tW=0.
$$

$W(0,a)=0$ だったので

$$
\boxed{
D_aZ=P^\top D_aX
}.
$$

次に「固定した $t$ ごとの逆写像」だけでなく、$(t,x)$ に対して初期ラベルが滑らかに決まることを確認します。

$$
\Psi(t,a)
=
(t,X(t,a))
$$

と置くと、その微分行列はブロック形

$$
D\Psi
=
\begin{pmatrix}
1&0\\
\partial_tX&D_aX
\end{pmatrix}
$$

なので

$$
\det D\Psi(t_0,a_0)
=
\det D_aX(t_0,a_0)
\ne0.
$$

従って [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) により、$(t_0,a_0)$ の近くで $\Psi$ は $C^1$ 級の局所逆写像を持ちます。時間成分はそのままなので、この逆写像を

$$
(t,x)\longmapsto(t,A(t,x))
$$

と書けます。

そこで

$$
u(t,x)
=
Z(t,A(t,x))
$$

と定めます。固定した $t$ で

$$
X(t,A(t,x))=x
$$

を $x$ 微分すると

$$
D_aX\,D_xA=I,
$$

従って

$$
D_xA=(D_aX)^{-1}.
$$

よって

$$
\begin{aligned}
D_xu
&=
D_aZ\,D_xA\\
&=
P^\top D_aX(D_aX)^{-1}\\
&=
P^\top.
\end{aligned}
$$

すなわち

$$
\nabla_xu(t,x)
=
P(t,A(t,x)).
$$

最後に、任意の固定ラベル $a$ に沿って

$$
u(t,X(t,a))
=
Z(t,a).
$$

両辺を $t$ で微分すると

$$
u_t(t,X)
+
\nabla_xu(t,X)\cdot\dot X
=
\dot Z.
$$

すでに $\nabla_xu=P$、$\dot X=H_p$、$\dot Z=P\cdot H_p-H$ を示したので

$$
u_t+P\cdot H_p
=
P\cdot H_p-H.
$$

従って

$$
u_t
=
-H(X,P)
=
-H(X,\nabla_xu),
$$

すなわち

$$
u_t+H(x,\nabla_xu)=0.
$$

特に $t=0$ では

$$
X(0,a)=a
$$

なので $A(0,x)=x$ です。従って再構成が $t=0$ の近くで行われるとき

$$
u(0,x)
=
Z(0,A(0,x))
=
Z(0,x)
=
u_0(x),
$$

となり、与えた初期値と一致します。
<!-- proof-end -->

## 5. 特性写像が退化する場所

前節の再構成では、初期ラベル $a$ から現在位置 $X(t,a)$ への写像を逆に解き、

$$
a=A(t,x)
$$

を作れることが決定的でした。したがって古典解が壊れる最初の候補は、特性 ODE 自体が存在しなくなる場所ではなく、**異なる初期ラベルを現在位置から区別できなくなる場所**です。

逆関数定理の条件を思い出すと、その局所可逆性は $D_aX$ の行列式が0でないことに支えられています。そこで、この行列式が0になる像を、次で古典解再構成の退化集合として定義します。

<a id="def-pde12-caustic"></a>
<!-- formal-statement-start -->
> **定義（特性焦散（caustic））**  
> 特性写像 $a\mapsto X(t,a)$ の Jacobian

$$
\det D_aX(t,a)
$$

> が0になる点の像を、本章では特性焦散 と呼ぶ。そこでは初期ラベルから現在位置への局所逆写像が失われ、古典解の再構成が破綻し得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-caustic -->
**定義の確認**：以下で定義の条件を直接確認します。

自由ハミルトニアン $H(p)=p^2/2$ の一次元では

$$
X(t,a)=a+t u_0'(a),
\qquad
X_a=1+t u_0''(a).
$$

この量が0になる時刻が古典解破綻の候補です。
<!-- definition-example-end -->

## 6. Hamilton--Jacobi と Burgers

自由粒子型

$$
u_t+\frac12u_x^2=0
$$

では、特性速度は $p=u_x$ 自身です。そこでポテンシャル $u$ ではなく勾配

$$
v=u_x
$$

を直接未知関数として見れば、PDE1 の Burgers 方程式が現れます。これにより「Hamilton--Jacobi 側の焦散」と「Burgers 側の特性交差」が同じ退化を表していることを式で比較できます。

<a id="prop-pde12-burgers"></a>
<!-- formal-statement-start -->
> **命題（Hamilton--Jacobi から Burgers 方程式）**  
> 一次元で $u\in C^2$ が

$$
u_t+\frac12u_x^2=0
$$

> を満たすとする。$v=u_x$ と置けば

$$
v_t+vv_x=0
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x$ で微分して

$$
u_{tx}+u_xu_{xx}=0.
$$

$v=u_x$ と置けば主張を得ます。
<!-- proof-end -->

PDE1 で見た Burgers の特性交差と、Hamilton--Jacobi の焦散は同じ幾何を勾配側とポテンシャル側から見ています。

## 7. 勾配の大きさを指定する方程式

ここまでは時間発展を持つ Hamilton--Jacobi 方程式を中心に見ました。一方、時間変数がなくても「各点で勾配の大きさだけを指定する」という一階非線形 PDE が現れます。

方向まで指定するのではなく

$$
|\nabla u(x)|
$$

だけを与えるため、各点での関数値の変化率の大きさだけが指定されます。距離関数や幾何光学の位相を考えるとき、この形を一つの基本方程式として扱います。

<a id="def-pde12-eikonal"></a>
<!-- formal-statement-start -->
> **定義（アイコナール方程式（eikonal equation））**  
> 正の関数 $c(x)$ に対し

$$
|\nabla u(x)|=c(x)
$$

> を アイコナール方程式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-eikonal -->
**定義の確認**：$c(x)\equiv1$ とし $u(x)=x_1$ と取ると

$$
\nabla u=(1,0,\ldots,0),
\qquad
|\nabla u|=1=c(x).
$$

したがって $u(x)=x_1$ は全空間で滑らかな アイコナール方程式の古典解です。
<!-- definition-example-end -->

幾何光学では $u$ は位相、$\nabla u$ は波面に垂直な方向を表します。$c=1$ なら距離関数 $u(x)=|x|$ が原点外で解ですが、原点では滑らかでありません。

## 8. 古典解が壊れた後に必要になる考え方

特性が交差すると、同じ $(t,x)$ に複数の初期ラベルが到達し、$\nabla u$ を一価な滑らかな関数として保てなくなります。ここまで使ってきた古典解の再構成は、その時点で続けられません。

Hamilton--Jacobi 方程式では、このような特性交差の後も解を一意に選ぶために **粘性解（viscosity solution）** という、古典解より広い解概念を使います。そこで重要になるのは、微分方程式を各点で等号として満たすことだけではなく、上から触れる試験関数・下から触れる試験関数を通じた不等式と比較原理です。

本章で準備した

- Charpit の特性系
- Hamilton の正準方程式
- 局所古典解の再構成
- 特性写像の行列式消失による古典解破綻
- Burgers 方程式との接続

は、古典解が存在する範囲の構造を説明します。粘性劣解・粘性優解、比較原理、Perron 法、Hamilton--Jacobi--Bellman 方程式は、これらの古典解が壊れた後を扱う発展理論として後続章で導入します。

## 演習

### Level A

#### PDE12-A01 Charpit 系
- Level: A

Charpit 系を $dF/ds$ へ代入し、$F$ が保存されることを確認せよ。

<!-- solution-start -->
##### 詳細解答

特性系は

$$
\dot x=F_p,
\qquad
\dot z=p\cdot F_p,
\qquad
\dot p=-F_x-pF_z.
$$

特性に沿った $F(x(s),z(s),p(s))$ の全微分は、連鎖律から

$$
\frac d{ds}F
=
F_x\cdot\dot x
+
F_z\dot z
+
F_p\cdot\dot p.
$$

三本の特性式をそれぞれ代入すると

$$
\begin{aligned}
\frac d{ds}F
&=
F_x\cdot F_p
+
F_z(p\cdot F_p)
+
F_p\cdot(-F_x-pF_z)\\
&=
F_x\cdot F_p
+
F_zp\cdot F_p
-
F_p\cdot F_x
-
F_zF_p\cdot p\\
&=
0.
\end{aligned}
$$

内積の対称性から第1項と第3項、第2項と第4項がそれぞれ打ち消されます。従って

$$
\boxed{F=\text{特性に沿って一定}}
$$

です。
<!-- solution-end -->

#### PDE12-A02 自由粒子
- Level: A

$H(p)=p^2/2$ の一次元 Hamilton--Jacobi 方程式で特性方程式を求めよ。

<!-- solution-start -->
##### 詳細解答

一次元で

$$
H(p)=\frac12p^2
$$

なら

$$
H_p=p,
\qquad
H_x=0.
$$

[Hamilton--Jacobi の特性方程式](#thm-pde12-hamilton-characteristics)へ代入すると

$$
\dot x=p,
\qquad
\dot p=0.
$$

さらに

$$
\dot z
=
pH_p-H
=
p^2-\frac12p^2
=
\frac12p^2.
$$

初期値を

$$
x(0)=a,
\qquad
p(0)=p_0,
\qquad
z(0)=z_0
$$

とすれば $p(t)=p_0$ は一定なので

$$
\boxed{
x(t)=a+tp_0
},
$$

また

$$
\boxed{
z(t)=z_0+\frac12p_0^2t
}.
$$

自由粒子では特性は位置空間で直線になります。
<!-- solution-end -->

#### PDE12-A03 Burgers
- Level: A

$u_t+u_x^2/2=0$ を $x$ で微分せよ。

<!-- solution-start -->
##### 詳細解答

元の方程式は

$$
u_t+\frac12u_x^2=0.
$$

両辺を $x$ で微分します。第一項は

$$
\partial_xu_t=u_{tx}.
$$

第二項には一変数の連鎖律を使い、

$$
\partial_x\left(\frac12u_x^2\right)
=
u_xu_{xx}.
$$

従って

$$
u_{tx}+u_xu_{xx}=0.
$$

ここで

$$
v=u_x
$$

と置けば

$$
v_t=u_{tx},
\qquad
v_x=u_{xx}.
$$

よって

$$
\boxed{
v_t+vv_x=0
},
$$

すなわち非粘性 Burgers 方程式を得ます。
<!-- solution-end -->

#### PDE12-A04 アイコナール方程式
- Level: A

$u(x)=|x|$ が $x\ne0$ で $|\nabla u|=1$ を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答

$x\ne0$ とし

$$
u(x)=|x|
=
\left(
\sum_{i=1}^nx_i^2
\right)^{1/2}
$$

と置きます。各成分について

$$
\partial_{x_i}u
=
\frac{x_i}{|x|}.
$$

従って

$$
\nabla u
=
\frac{x}{|x|}.
$$

その Euclid ノルムは

$$
|\nabla u|
=
\frac{|x|}{|x|}
=
\boxed{1}.
$$

したがって $x\ne0$ ではアイコナール方程式 $|\nabla u|=1$ を満たします。

一方、原点では方向によって $|x|$ の一次変化率が異なり、勾配を一つのベクトルとして定められません。従って原点では古典解ではありません。
<!-- solution-end -->

### Level B

#### PDE12-B01 二次初期値
- Level: B

$$
u_t+\frac12u_x^2=0,
\qquad
u(0,x)=\frac{x^2}{2}
$$

を特性法で解け。

<!-- solution-start -->
##### 詳細解答

自由ハミルトニアン

$$
H(p)=\frac12p^2
$$

では

$$
\dot X=P,
\qquad
\dot P=0,
\qquad
\dot Z=\frac12P^2.
$$

初期値

$$
u_0(a)=\frac{a^2}{2}
$$

から

$$
P(0,a)=u_0'(a)=a.
$$

従って

$$
P(t,a)=a,
$$

$$
X(t,a)
=
a+ta
=
(1+t)a.
$$

$t>-1$ では

$$
X_a=1+t\ne0
$$

なので特性写像を逆に解けて

$$
a=A(t,x)
=
\frac{x}{1+t}.
$$

また

$$
\begin{aligned}
Z(t,a)
&=
Z(0,a)
+
\int_0^t\frac12a^2\,ds\\
&=
\frac{a^2}{2}
+
\frac{ta^2}{2}\\
&=
\frac{1+t}{2}a^2.
\end{aligned}
$$

$a=x/(1+t)$ を代入すると

$$
\boxed{
u(t,x)
=
\frac{x^2}{2(1+t)}
}.
$$

検算として

$$
u_t
=
-\frac{x^2}{2(1+t)^2},
\qquad
u_x
=
\frac{x}{1+t},
$$

なので

$$
u_t+\frac12u_x^2=0.
$$

$t=0$ では $u(0,x)=x^2/2$ です。
<!-- solution-end -->

#### PDE12-B02 焦散の時刻
- Level: B

初期値 $u_0(x)=-x^2/2$ のとき、自由ハミルトニアンの特性写像がいつ退化するか求めよ。

<!-- solution-start -->
##### 詳細解答

初期値

$$
u_0(a)=-\frac{a^2}{2}
$$

から

$$
p_0(a)=u_0'(a)=-a.
$$

自由ハミルトニアンでは $P$ は特性に沿って一定なので

$$
P(t,a)=-a.
$$

従って

$$
X(t,a)
=
a+tP
=
(1-t)a.
$$

一次元では特性写像の行列式は単に

$$
X_a(t,a)=1-t
$$

です。したがって

$$
\boxed{t=1}
$$

で初めて0になります。

実際 $t=1$ では

$$
X(1,a)=0
$$

となり、全ての初期ラベル $a$ が同じ位置 $x=0$ へ集まります。よって $x$ から $a$ を一意に復元できず、逆関数定理を使った古典解再構成が破綻します。
<!-- solution-end -->

#### PDE12-B03 調和振動子のハミルトニアン
- Level: B

$$
H(x,p)=\frac12(p^2+x^2)
$$

の Hamilton 特性を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
H(x,p)
=
\frac12(p^2+x^2)
$$

に対して

$$
H_p=p,
\qquad
H_x=x.
$$

従って Hamilton の正準方程式は

$$
\dot x=p,
\qquad
\dot p=-x.
$$

第一式を時間微分して第二式を代入すると

$$
x''=\dot p=-x,
$$

すなわち

$$
x''+x=0.
$$

初期値を

$$
x(0)=x_0,
\qquad
p(0)=p_0
$$

とすれば

$$
\boxed{
x(t)
=
x_0\cos t+p_0\sin t
},
$$

$$
\boxed{
p(t)
=
-x_0\sin t+p_0\cos t
}.
$$

さらに

$$
\frac d{dt}H
=
H_x\dot x+H_p\dot p
=
xp+p(-x)
=
0,
$$

なので

$$
x(t)^2+p(t)^2
=
x_0^2+p_0^2
$$

が保たれます。従って位相平面では原点を中心とするエネルギー一定の円軌道を描きます。
<!-- solution-end -->

### Level C

#### PDE12-C01 焦散と Burgers の勾配の無限大化
- Level: C

自由 Hamilton--Jacobi 方程式で

$$
X(t,a)=a+t u_0'(a)
$$

とする。古典解が失われる条件と、$v=u_x$ が満たす Burgers 方程式の勾配が無限大化する機構を同じ式から説明せよ。

<!-- solution-start -->
##### 詳細解答

自由 Hamilton--Jacobi 方程式では初期運動量は

$$
P(0,a)=u_0'(a)
$$

で、$P$ は特性に沿って一定です。従って

$$
X(t,a)
=
a+t u_0'(a).
$$

初期ラベルで微分すると

$$
\boxed{
X_a(t,a)
=
1+t u_0''(a)
}.
$$

古典解を再構成するには $x=X(t,a)$ から $a$ を局所的に解く必要があります。したがって

$$
X_a=0
$$

になると逆関数定理の仮定が失われ、$a=A(t,x)$ を局所的に一価な滑らかな関数として作れなくなります。これが Hamilton--Jacobi 側の焦散です。

一方

$$
v=u_x
$$

と置くと、本文の命題から

$$
v_t+vv_x=0
$$

を満たします。初期値は

$$
v_0(a)=u_0'(a).
$$

Burgers の特性は

$$
X(t,a)=a+t v_0(a)
$$

なので、Hamilton--Jacobi と全く同じ特性写像です。特性上では

$$
v(t,X(t,a))=v_0(a).
$$

この式を $a$ で微分すると

$$
v_x(t,X(t,a))X_a(t,a)
=
v_0'(a).
$$

$X_a\ne0$ の範囲では

$$
\begin{aligned}
v_x(t,X(t,a))
&=
\frac{v_0'(a)}{X_a(t,a)}\\
&=
\frac{u_0''(a)}
{1+t u_0''(a)}.
\end{aligned}
$$

したがって最初に

$$
1+t u_0''(a)=0
$$

へ近づく場所では分母が0へ近づき、分子 $u_0''(a)$ はそこで $-1/t\ne0$ なので

$$
|v_x|\to\infty.
$$

従って

$$
\boxed{
\text{Hamilton--Jacobi の焦散}
\quad\Longleftrightarrow\quad
\text{Burgers の特性交差・勾配発散}
}
$$

であり、同じ $X_a$ の退化を二つの未知関数 $u$ と $v=u_x$ から見ています。
<!-- solution-end -->

## 9. 章末チェック

- Charpit 特性系を一般一階 PDE から導ける。
- Hamilton の正準方程式を Hamilton--Jacobi から導ける。
- 特性写像の局所逆写像の存在から古典解を再構成できる。
- 焦散と Burgers の特性交差を同じ Jacobian で説明できる。
- 粘性解が必要になる境界を説明できる。
