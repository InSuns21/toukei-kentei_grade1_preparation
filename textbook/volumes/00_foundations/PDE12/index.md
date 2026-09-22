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
> $F\in C^2$ とし、古典解 $u$ の上で

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

$F(t,x,z,q,p)=q+H(x,p)$ と置き、$q=u_t$ とします。Charpit 系で $F_q=1$ なので時間そのものを特性パラメータに取れます。

空間成分は

$$
\dot x=H_p,\qquad
\dot p=-H_x.
$$

また

$$
\dot z=u_t+\nabla u\cdot\dot x=-H+p\cdot H_p.
$$

最後に

$$
\frac d{dt}H
=
H_x\cdot H_p+H_p\cdot(-H_x)=0.
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
> 特性解 $(X(t,a),P(t,a),Z(t,a))$ が存在し、ある点で

$$
\det D_aX(t,a)\ne0
$$

> とする。[逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)により近傍で $a=A(t,x)$ と解ける。このとき

$$
u(t,x)=Z(t,A(t,x))
$$

> は局所古典解で、

$$
\nabla_xu(t,x)=P(t,A(t,x))
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

核心は

$$
D_aZ=P^\top D_aX
$$

が特性に沿って保存されることです。これにより $P$ が再構成した $u$ の勾配であることが保証されます。

<!-- proof-start -->
### 証明

$W=D_aZ-P^\top D_aX$ と置きます。初期時刻では

$$
D_aZ(0,a)=\nabla u_0(a)^\top
=P(0,a)^\top D_aX(0,a)
$$

なので $W(0,a)=0$。

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

また $\dot Z=P\cdot H_p-H$ を $a$ で微分すると

$$
\partial_tD_aZ
=
P^\top H_{px}D_aX
+
P^\top H_{pp}D_aP
-
H_x^\top D_aX.
$$

右辺は $\partial_t(P^\top D_aX)$ と一致するので $\partial_tW=0$。従って

$$
D_aZ=P^\top D_aX.
$$

$\det D_aX\ne0$ なら局所逆写像 $a=A(t,x)$ が存在し、連鎖律から

$$
\nabla_xu
=
D_aZ(D_aX)^{-1}
=
P^\top.
$$

さらに特性上で

$$
\frac d{dt}u(t,X(t,a))
=
u_t+\nabla u\cdot\dot X
=
u_t+P\cdot H_p.
$$

左辺は $\dot Z=P\cdot H_p-H$ なので $u_t=-H$。よって Hamilton--Jacobi 方程式を満たします。
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
