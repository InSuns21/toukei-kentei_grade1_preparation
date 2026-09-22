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

<a id="def-pde12-hamilton-jacobi"></a>
<!-- formal-statement-start -->
> **定義（Hamilton--Jacobi 方程式）**  
> Hamiltonian $H(x,p)$ に対する

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
> $H\in C^2$ とし、$p=\nabla u$ と置くと、特性は

$$
\dot x=H_p(x,p),
\qquad
\dot p=-H_x(x,p),
$$

$$
\dot z=p\cdot H_p-H
$$

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

> であり、$u$ は局所的に

$$
u_t+H(x,\nabla_xu)=0
$$

> と初期条件 $u(0,x)=u_0(x)$ を満たす古典解である。
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

$t=0$ では $A(0,x)=x$、$Z(0,x)=u_0(x)$ なので初期条件も満たします。
<!-- proof-end -->

## 5. 特性写像が退化する場所

<a id="def-pde12-caustic"></a>
<!-- formal-statement-start -->
> **定義（特性 caustic）**  
> 特性写像 $a\mapsto X(t,a)$ の Jacobian

$$
\det D_aX(t,a)
$$

> が0になる点の像を、本章では特性 caustic と呼ぶ。そこでは初期ラベルから現在位置への局所逆写像が失われ、古典解の再構成が破綻し得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-caustic -->
**定義の確認**：以下で定義の条件を直接確認します。

自由 Hamiltonian $H(p)=p^2/2$ の一次元では

$$
X(t,a)=a+t u_0'(a),
\qquad
X_a=1+t u_0''(a).
$$

この量が0になる時刻が古典解破綻の候補です。
<!-- definition-example-end -->

## 6. Hamilton--Jacobi と Burgers

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

PDE1 で見た Burgers の特性交差と、Hamilton--Jacobi の caustic は同じ幾何を勾配側とポテンシャル側から見ています。

## 7. 勾配の大きさを指定する方程式

<a id="def-pde12-eikonal"></a>
<!-- formal-statement-start -->
> **定義（eikonal 方程式）**  
> 正の関数 $c(x)$ に対し

$$
|\nabla u(x)|=c(x)
$$

> を eikonal 方程式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pde12-eikonal -->
**定義の確認**：$c(x)\equiv1$ とし $u(x)=x_1$ と取ると

$$
\nabla u=(1,0,\ldots,0),
\qquad
|\nabla u|=1=c(x).
$$

したがって $u(x)=x_1$ は全空間で滑らかな eikonal 方程式の古典解です。
<!-- definition-example-end -->

幾何光学では $u$ は位相、$\nabla u$ は波面に垂直な方向を表します。$c=1$ なら距離関数 $u(x)=|x|$ が原点外で解ですが、原点では滑らかでありません。

## 8. 停止線：viscosity solution

特性が交差すると $\nabla u$ が多価になり、古典解は続けられません。Hamilton--Jacobi 方程式では順序比較による一意性を保つ viscosity solution が自然な後続理論です。

本章では

- Charpit の特性系
- Hamilton の正準方程式
- 局所再構成
- Jacobian 消失による古典解破綻
- Burgers との接続

までを正本化します。

viscosity subsolution / supersolution、順序比較による一意性、Perron 法、HJB は Graduate PDE 後続系列へ送ります。

## 演習

### Level A

#### PDE12-A01 Charpit 系
- Level: A

Charpit 系を $dF/ds$ へ代入し、$F$ が保存されることを確認せよ。

<!-- solution-start -->
##### 詳細解答

$$
\frac d{ds}F
=
F_x\cdot F_p
+
F_z(p\cdot F_p)
+
F_p\cdot(-F_x-pF_z)=0.
$$

同じ項が正負で打ち消されます。
<!-- solution-end -->

#### PDE12-A02 自由粒子
- Level: A

$H(p)=p^2/2$ の一次元 Hamilton--Jacobi 方程式で特性方程式を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
\dot x=p,\qquad
\dot p=0,\qquad
\dot z=\frac12p^2.
$$

従って $p$ は一定で、$x(t)=a+tp_0$ です。
<!-- solution-end -->

#### PDE12-A03 Burgers
- Level: A

$u_t+u_x^2/2=0$ を $x$ で微分せよ。

<!-- solution-start -->
##### 詳細解答

$$
u_{tx}+u_xu_{xx}=0.
$$

$v=u_x$ と置けば $v_t+vv_x=0$ です。
<!-- solution-end -->

#### PDE12-A04 eikonal
- Level: A

$u(x)=|x|$ が $x\ne0$ で $|\nabla u|=1$ を満たすことを確認せよ。

<!-- solution-start -->
##### 詳細解答

$$
\nabla|x|=\frac{x}{|x|}
$$

なので、そのノルムは1です。原点では勾配が存在しません。
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

初期ラベル $a$ に対して $p_0=a$。従って

$$
X(t,a)=(1+t)a.
$$

$a=x/(1+t)$ です。また

$$
Z(t,a)
=
\frac{a^2}{2}
+
\frac{t a^2}{2}
=
\frac{1+t}{2}a^2.
$$

よって

$$
u(t,x)=\frac{x^2}{2(1+t)}.
$$
<!-- solution-end -->

#### PDE12-B02 caustic の時刻
- Level: B

初期値 $u_0(x)=-x^2/2$ のとき、自由 Hamiltonian の特性写像がいつ退化するか求めよ。

<!-- solution-start -->
##### 詳細解答

$p_0=-a$ なので

$$
X(t,a)=(1-t)a.
$$

従って $X_a=1-t$ で、$t=1$ に退化します。全特性が $x=0$ へ集まるため古典解再構成が壊れます。
<!-- solution-end -->

#### PDE12-B03 調和振動子 Hamiltonian
- Level: B

$$
H(x,p)=\frac12(p^2+x^2)
$$

の Hamilton 特性を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
\dot x=p,\qquad
\dot p=-x.
$$

従って $x''+x=0$。また $dH/dt=0$ なので位相平面ではエネルギー一定の楕円軌道を描きます。
<!-- solution-end -->

### Level C

#### PDE12-C01 caustic と Burgers の勾配の無限大化
- Level: C

自由 Hamilton--Jacobi 方程式で

$$
X(t,a)=a+t u_0'(a)
$$

とする。古典解が失われる条件と、$v=u_x$ が満たす Burgers 方程式の勾配が無限大化する機構を同じ式から説明せよ。

<!-- solution-start -->
##### 詳細解答

特性写像の Jacobian は

$$
X_a=1+t u_0''(a).
$$

これが0になると逆写像 $a=A(t,x)$ が作れず、Hamilton--Jacobi の古典解再構成が破綻します。

一方 $v_0(a)=u_0'(a)$ とすれば Burgers 特性も同じ $X(t,a)$ で、

$$
v(t,X(t,a))=v_0(a).
$$

$x$ 微分すると

$$
v_x
=
\frac{v_0'(a)}{X_a}
=
\frac{u_0''(a)}
{1+t u_0''(a)}.
$$

従って $X_a\to0$ と同時に $|v_x|$ が無限大へ増大します。caustic と Burgers の古典解破綻は同じ特性交差です。
<!-- solution-end -->

## 9. 章末チェック

- Charpit 特性系を一般一階 PDE から導ける。
- Hamilton の正準方程式を Hamilton--Jacobi から導ける。
- 特性写像の局所逆写像の存在から古典解を再構成できる。
- caustic と Burgers の特性交差を同じ Jacobian で説明できる。
- viscosity solution が必要になる境界を説明できる。
