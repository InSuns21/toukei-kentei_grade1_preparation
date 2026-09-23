# FEM6 放物型方程式の有限要素法

<!-- definition-example-audit: strict -->

FEM1--FEM4 では、時間に依存しない楕円型問題に対して

$$
\text{変分形式}
\to
\text{有限要素空間}
\to
\text{Galerkin 直交性}
\to
\text{空間誤差}
$$

という流れを作りました。

一方、熱方程式では未知関数が

$$
u=u(t,x)
$$

となり、空間離散だけでは計算は終わりません。

有限要素空間 $V_h$ を固定しても、係数は時間とともに動きます。

したがって計算は二段階になります。

$$
\boxed{
\text{空間を有限要素法で離散化}
\quad\Longrightarrow\quad
\text{時間について連立 ODE}
}
$$

さらに時間も離散化すると、

$$
\boxed{
\text{各時刻で連立一次方程式を解く}
}
$$

という全離散法になります。

本章の中心は、単に離散式を書くことではありません。

時間依存問題では

- 空間近似が作る誤差
- 時間離散が作る誤差
- 離散解の安定性

を分けて追う必要があります。

そこで本章では、零 Dirichlet 熱方程式

$$
u_t-\Delta u=f
\qquad
\text{in }(0,T)\times\Omega
$$

を軸に、

1. 空間半離散 Galerkin 法を連立 ODE として導く。
2. 質量行列と剛性行列の役割を確認する。
3. 離散解自身を試験関数にしてエネルギー評価を導く。
4. 楕円型エネルギーに関する射影を使って、空間誤差を「純粋な近似誤差」と「離散解の動的誤差」に分ける。
5. 後退 Euler 法で時間離散し、全離散法の無条件エネルギー安定性を示す。
6. 最後に空間一次有限要素と後退 Euler 法を組み合わせ、$L^2$ 誤差を空間項と時間項へ分離する。

という順に進みます。

GPDE10 では Galerkin 法を「時間発展 PDE の弱解を作る存在証明」として用いました。本章では同じ骨格を、FEM2--FEM4 で構成した計算可能な有限要素空間へ固定し、**数値近似としてどれだけ安定で、どれだけ正確か**を調べます。

> **この章の停止線**
>
> 本章では線形な強圧型放物問題を扱います。Stokes の鞍点構造は FEM5、移流卓越と SUPG などの安定化は FEM7 の担当です。非線形放物問題、Navier--Stokes、時間適応、指数積分法はここでは扱いません。

---

## 0. 設定：熱方程式を変分形式で書く

$\Omega\subset\mathbb R^2$ を有界多角形領域、$T>0$ とし、

$$
V=H_0^1(\Omega),
\qquad
H=L^2(\Omega)
$$

とします。

$V$ のノルムは

$$
\|v\|_V
=
\|\nabla v\|_{L^2(\Omega)}
$$

とします。

[Poincaré の不等式](../GPDE4/index.md#thm-gpde4-poincare)により、これは $H_0^1(\Omega)$ 上で通常の $H^1$ ノルムと同値です。

双線形形式を

$$
a(w,v)
=
\int_\Omega
\nabla w\cdot\nabla v\,dx
$$

と置きます。

熱方程式の弱形式は

$$
\langle u_t(t),v\rangle_{V^*,V}
+
a(u(t),v)
=
\langle f(t),v\rangle_{V^*,V}
$$

です。

GPDE10 の [時間発展問題のエネルギー弱解](../GPDE10/index.md#def-gpde10-energy-solution)では

$$
u\in L^2(0,T;V),
\qquad
u_t\in L^2(0,T;V^*)
$$

という自然な解空間を扱いました。

本章では誤差評価の節だけ、必要に応じて

$$
u(t)\in H^2(\Omega)
$$

や

$$
u_t(t)\in H^2(\Omega)
$$

などの追加正則性を明示して仮定します。

---

## 1. 空間だけを離散化する

FEM2 の適合一次有限要素空間を

$$
V_h\subset V
$$

とします。

時間 $t$ はまだ連続のまま残します。

<a id="def-fem6-semidiscrete-galerkin"></a>

<!-- formal-statement-start -->
### 定義（熱方程式の空間半離散 Galerkin 法）

$V_h\subset H_0^1(\Omega)$ を有限次元部分空間、$u_{h,0}\in V_h$、$f\in L^2(0,T;V^*)$ とする。

$u_h:[0,T]\to V_h$ が

$$
u_h\in H^1(0,T;V_h)
$$

を満たし、ほとんどすべての $t\in(0,T)$ について

$$
\boxed{
(\partial_tu_h(t),v_h)_{L^2}
+
a(u_h(t),v_h)
=
\langle f(t),v_h\rangle
\qquad
(\forall v_h\in V_h)
}
$$

および

$$
\boxed{
u_h(0)=u_{h,0}
}
$$

を満たすとき、$u_h$ を熱方程式の空間半離散 Galerkin 解とする。
<!-- formal-statement-end -->

時間方向は離散化していないため「半離散」です。

<!-- definition-example-start: def-fem6-semidiscrete-galerkin -->
**定義の確認**

### 例：一つの正弦モードだけを残す

$\Omega=(0,\pi)$ とし、

$$
V_h
=
\operatorname{span}\{\sin x\}
$$

とします。

外力を $f=0$、初期値を

$$
u_{h,0}(x)=c_0\sin x
$$

とします。

半離散解を

$$
u_h(t,x)
=
c(t)\sin x
$$

と置きます。

試験関数も $v_h=\sin x$ と取ると

$$
c'(t)
\int_0^\pi
\sin^2x\,dx
+
c(t)
\int_0^\pi
\cos^2x\,dx
=
0.
$$

二つの積分はいずれも $\pi/2$ なので

$$
c'(t)+c(t)=0.
$$

従って

$$
\boxed{
c(t)=c_0e^{-t}
}
$$

であり、

$$
u_h(t,x)
=
c_0e^{-t}\sin x.
$$

この例では有限要素空間の代わりに一つの正弦モードを使いましたが、定義の構造は同じです。

$$
\boxed{
\text{空間を有限次元化すると、PDE が時間 ODE になる}
}
$$

ことを直接確認できます。
<!-- definition-example-end -->

---

## 2. 基底を選ぶと質量行列と剛性行列が現れる

$V_h$ の基底を

$$
\phi_1,\ldots,\phi_m
$$

とし、

$$
u_h(t)
=
\sum_{j=1}^m
U_j(t)\phi_j
$$

と書きます。

各 $\phi_i$ を試験関数に取ると

$$
\sum_{j=1}^m
U_j'(t)
(\phi_j,\phi_i)_{L^2}
+
\sum_{j=1}^m
U_j(t)
a(\phi_j,\phi_i)
=
\langle f(t),\phi_i\rangle.
$$

そこで

$$
M_{ij}
=
(\phi_j,\phi_i)_{L^2},
$$

$$
K_{ij}
=
a(\phi_j,\phi_i)
$$

と置きます。

<a id="prop-fem6-mass-stiffness"></a>

<!-- formal-statement-start -->
### 命題（有限要素の質量行列と剛性行列）

$V_h\subset H_0^1(\Omega)$ の基底を $\phi_1,\ldots,\phi_m$ とし、

$$
M_{ij}
=
(\phi_j,\phi_i)_{L^2},
\qquad
K_{ij}
=
\int_\Omega
\nabla\phi_j\cdot\nabla\phi_i\,dx
$$

と定める。

このとき熱方程式の空間半離散 Galerkin 法は係数ベクトル

$$
U(t)
=
(U_1(t),\ldots,U_m(t))^\mathsf T
$$

に対する

$$
\boxed{
M U'(t)+K U(t)=F(t)
}
$$

と同値である。

さらに $M$ と $K$ はともに実対称正定値行列である。
<!-- formal-statement-end -->

### 証明の見取り図

行列表示は上の基底展開そのものです。

正定値性は、任意の係数ベクトル $c\ne0$ に対して

$$
v_h
=
\sum_jc_j\phi_j
$$

と置けば、

$$
c^\mathsf TMc
=
\|v_h\|_{L^2}^2,
$$

$$
c^\mathsf TKc
=
\|\nabla v_h\|_{L^2}^2
$$

となることから分かります。

<!-- proof-start -->
### 証明

$c=(c_1,\ldots,c_m)^\mathsf T\in\mathbb R^m$ とし、

$$
v_h=\sum_{j=1}^mc_j\phi_j
$$

と置きます。

基底は線形独立なので $c\ne0$ なら $v_h\ne0$ です。

まず

$$
\begin{aligned}
c^\mathsf TMc
&=
\sum_{i,j}
c_iM_{ij}c_j
\\
&=
\sum_{i,j}
c_i(\phi_j,\phi_i)c_j
\\
&=
(v_h,v_h)_{L^2}
\\
&=
\|v_h\|_{L^2}^2
>
0.
\end{aligned}
$$

従って $M$ は正定値です。

同様に

$$
\begin{aligned}
c^\mathsf TKc
&=
\sum_{i,j}
c_i
\int_\Omega
\nabla\phi_j\cdot\nabla\phi_i\,dx
\,c_j
\\
&=
\int_\Omega
\left|
\nabla\left(\sum_jc_j\phi_j\right)
\right|^2
dx
\\
&=
\|\nabla v_h\|_{L^2}^2.
\end{aligned}
$$

もしこれが $0$ なら $v_h$ はほとんど至る所で定数です。

しかし $v_h\in H_0^1(\Omega)$ なので [Poincaré の不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v_h\|_{L^2}
\le
C_P\|\nabla v_h\|_{L^2}
=
0.
$$

従って $v_h=0$ となり、基底の線形独立性から $c=0$ です。

ゆえに $K$ も正定値です。

対称性は内積と $a(w,v)=a(v,w)$ から直ちに従います。

最後に半離散方程式へ基底展開を代入すれば各 $i$ について

$$
\sum_jM_{ij}U_j'
+
\sum_jK_{ij}U_j
=
F_i
$$

を得るので、

$$
M U'+KU=F
$$

です。
<!-- proof-end -->

### なぜ質量行列が必要なのか

楕円型の定常 FEM では主役は剛性行列 $K$ でした。

時間発展では

$$
(\partial_tu_h,v_h)
$$

があるため、係数微分 $U'(t)$ の前に

$$
M
$$

が付きます。

これは連続問題で $L^2$ 内積が時間微分を受け止めていることの離散版です。

---

## 3. 半離散解は存在し、一様なエネルギー評価を持つ

質量行列 $M$ が正定値なので

$$
U'(t)
=
-M^{-1}KU(t)
+
M^{-1}F(t)
$$

と書けます。

従って有限次元 ODE として解けます。

しかし数値解析でより重要なのは、解の大きさがメッシュ細分化で勝手に増幅しないことです。

<a id="thm-fem6-semidiscrete-energy"></a>

<!-- formal-statement-start -->
### 定理（半離散 Galerkin 解の存在一意性とエネルギー評価）

$V_h\subset H_0^1(\Omega)$ を任意の有限次元部分空間とし、

$$
f\in L^2(0,T;H^{-1}(\Omega)),
\qquad
u_{h,0}\in V_h
$$

とする。

このとき [熱方程式の空間半離散 Galerkin 法](#def-fem6-semidiscrete-galerkin)は一意な解

$$
u_h\in H^1(0,T;V_h)
$$

を持つ。

さらに任意の $t\in[0,T]$ に対して

$$
\boxed{
\|u_h(t)\|_{L^2}^2
+
\int_0^t
\|\nabla u_h(s)\|_{L^2}^2\,ds
\le
\|u_{h,0}\|_{L^2}^2
+
\int_0^t
\|f(s)\|_{H^{-1}}^2\,ds
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

存在一意性は質量行列が正定値なので有限次元 ODE に帰着します。

エネルギー評価では半離散方程式へ

$$
v_h=u_h(t)
$$

を代入します。

すると

$$
(\partial_tu_h,u_h)
=
\frac12
\frac{d}{dt}
\|u_h\|_{L^2}^2
$$

となり、剛性項は

$$
a(u_h,u_h)
=
\|\nabla u_h\|_{L^2}^2
$$

です。

右辺を双対ノルムと [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で半分吸収します。

<!-- proof-start -->
### 証明

[有限要素の質量行列と剛性行列](#prop-fem6-mass-stiffness)から、基底係数は

$$
MU'(t)+KU(t)=F(t)
$$

を満たします。

$M$ は正定値なので可逆です。

従って

$$
U'(t)
=
-M^{-1}KU(t)+M^{-1}F(t)
$$

です。

右辺は $U$ に関して線形で、$F\in L^2(0,T;\mathbb R^m)$ なので、有限次元線形 ODE の標準理論から一意な絶対連続解 $U$ が存在します。したがって

$$
u_h\in H^1(0,T;V_h)
$$

です。

次に半離散方程式で

$$
v_h=u_h(t)
$$

と取ります。

すると

$$
(\partial_tu_h,u_h)
+
\|\nabla u_h\|_2^2
=
\langle f,u_h\rangle.
$$

有限次元解は時間について絶対連続なので

$$
(\partial_tu_h,u_h)
=
\frac12
\frac{d}{dt}
\|u_h\|_2^2.
$$

また $H^{-1}=V^*$ の双対ノルムの定義から

$$
|\langle f,u_h\rangle|
\le
\|f\|_{H^{-1}}
\|\nabla u_h\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)

$$
ab\le\frac12a^2+\frac12b^2
$$

を使うと

$$
|\langle f,u_h\rangle|
\le
\frac12
\|f\|_{H^{-1}}^2
+
\frac12
\|\nabla u_h\|_2^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u_h\|_2^2
+
\frac12
\|\nabla u_h\|_2^2
\le
\frac12
\|f\|_{H^{-1}}^2.
$$

2倍して $0$ から $t$ まで積分すると

$$
\|u_h(t)\|_2^2
-
\|u_{h,0}\|_2^2
+
\int_0^t
\|\nabla u_h(s)\|_2^2\,ds
\le
\int_0^t
\|f(s)\|_{H^{-1}}^2\,ds.
$$

移項して主張を得ます。
<!-- proof-end -->

### この評価で重要なこと

右辺に

$$
h^{-1}
$$

や

$$
h^{-2}
$$

は現れません。

したがって空間メッシュを細かくしても、連続時間の半離散解そのものは同じエネルギー機構で制御されます。

これは後で時間離散を選ぶときの基準になります。

---

## 4. 楕円型エネルギー射影で空間近似だけを取り出す

時間依存誤差を直接

$$
u-u_h
$$

で扱うと、

- 有限要素空間が $u$ を近似できないこと
- 離散方程式が時間発展を完全には再現しないこと

が混ざります。

そこでまず各時刻の $u(t)$ を「同じ楕円型エネルギーに関して」$V_h$ へ射影します。

<a id="def-fem6-ritz-projection"></a>

<!-- formal-statement-start -->
### 定義（Ritz 射影）

$V_h\subset H_0^1(\Omega)$ とし、

$$
a(w,v)
=
\int_\Omega
\nabla w\cdot\nabla v\,dx
$$

とする。

任意の $w\in H_0^1(\Omega)$ に対し、

$$
\boxed{
a(R_hw,v_h)
=
a(w,v_h)
\qquad
(\forall v_h\in V_h)
}
$$

を満たす一意な $R_hw\in V_h$ を $w$ の Ritz 射影とする。
<!-- formal-statement-end -->

存在一意性は $V_h$ 上の Lax--Milgram、あるいは剛性行列の正定値性から従います。

<!-- definition-example-start: def-fem6-ritz-projection -->
**定義の確認**

### 例：二つの正弦モードから一つだけ残す

$\Omega=(0,\pi)$、

$$
V_h=\operatorname{span}\{\sin x\}
$$

とし、

$$
w(x)=\sin x+\sin2x
$$

を考えます。

$$
R_hw=c\sin x
$$

と置きます。

定義から

$$
a(c\sin x,\sin x)
=
a(\sin x+\sin2x,\sin x).
$$

左辺は

$$
c\int_0^\pi\cos^2x\,dx
=
c\frac\pi2.
$$

右辺は

$$
\int_0^\pi
(\cos x+2\cos2x)\cos x\,dx.
$$

直交性から

$$
\int_0^\pi
\cos2x\cos x\,dx
=
0
$$

なので、右辺は $\pi/2$ です。

従って

$$
c=1
$$

であり、

$$
\boxed{
R_hw=\sin x
}.
$$

Ritz 射影は「関数値の $L^2$ 最小二乗」ではなく、勾配内積

$$
a(w,v)
$$

に関する直交射影です。
<!-- definition-example-end -->

<a id="prop-fem6-ritz-error"></a>

<!-- formal-statement-start -->
### 命題（一次有限要素 Ritz 射影の近似評価）

$\Omega\subset\mathbb R^2$ を凸多角形領域とし、$\{\mathcal T_h\}$ を形状正則な適合三角形分割族、$V_h$ を連続一次有限要素空間とする。

$w\in H^2(\Omega)\cap H_0^1(\Omega)$ なら、$h$ に依存しない定数 $C$ が存在して

$$
\boxed{
\|\nabla(w-R_hw)\|_{L^2}
\le
Ch|w|_{H^2}
}
$$

および

$$
\boxed{
\|w-R_hw\|_{L^2}
\le
Ch^2|w|_{H^2}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### なぜ FEM4 の結果をそのまま使えるか

$R_hw$ は

$$
a(w-R_hw,v_h)=0
\qquad
(\forall v_h\in V_h)
$$

を満たします。

これは Poisson 型 Galerkin 解の直交性そのものです。

従って第一式は FEM4 の [一次有限要素解の H1 誤差評価](../FEM4/index.md#thm-fem4-h1-error)、第二式は [一次有限要素法の標準 H1・L2 誤差評価](../FEM4/index.md#cor-fem4-standard-rates)を、右辺を $w$ が生成する楕円型問題とみなして適用すれば得られます。

凸多角形という仮定は、FEM4 で説明した大域 $H^2$ 正則性を使って $L^2$ 評価を二次にするために置いています。

---

## 5. 半離散誤差を二つに分ける

正確解 $u(t)$ と半離散解 $u_h(t)$ の誤差を

$$
e(t)
=
u(t)-u_h(t)
$$

とします。

Ritz 射影を挟んで

$$
\boxed{
e
=
\underbrace{u-R_hu}_{\eta}
+
\underbrace{R_hu-u_h}_{\theta}
}
$$

と分解します。

$\eta$ は有限要素空間の **純粋な空間近似誤差**です。

$\theta$ は、Ritz 射影した連続解と実際の半離散解の差です。

この分解の利点は

$$
a(\eta,v_h)=0
$$

なので、誤差方程式から剛性項の近似誤差が消えることです。

<a id="thm-fem6-semidiscrete-l2-error"></a>

<!-- formal-statement-start -->
### 定理（半離散 Galerkin 法の L2 誤差評価）

$\Omega\subset\mathbb R^2$ を凸多角形領域とし、$\{\mathcal T_h\}$ を形状正則な一次三角形分割族、$V_h$ を連続一次有限要素空間とする。

熱方程式の正確解 $u$ が

$$
u\in C([0,T];H^2(\Omega)\cap H_0^1(\Omega))
$$

および

$$
u_t\in L^2(0,T;H^2(\Omega)\cap H_0^1(\Omega))
$$

を満たすとする。

半離散初期値を

$$
u_h(0)=R_hu(0)
$$

とする。

このとき $h$ に依存しない定数 $C$ が存在して

$$
\boxed{
\max_{0\le t\le T}
\|u(t)-u_h(t)\|_{L^2}
\le
Ch^2
\left[
\max_{0\le t\le T}|u(t)|_{H^2}
+
\|u_t\|_{L^2(0,T;H^2)}
\right]
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$$
e=\eta+\theta
$$

とします。

正確解と半離散解の方程式を引くと

$$
(e_t,v_h)+a(e,v_h)=0.
$$

Ritz 直交性

$$
a(\eta,v_h)=0
$$

を使うと

$$
(\theta_t,v_h)+a(\theta,v_h)
=
-(\eta_t,v_h).
$$

ここで

$$
v_h=\theta
$$

と取れば、半離散解のエネルギー評価と同じ構造になります。

右辺は

$$
\eta_t
=
u_t-R_hu_t
$$

なので、Ritz 射影の $L^2$ 近似評価から二次の $h$ が出ます。

<!-- proof-start -->
### 証明

$$
\eta(t)
=
u(t)-R_hu(t),
\qquad
\theta(t)
=
R_hu(t)-u_h(t)
$$

と置きます。

メッシュと $R_h$ は時間に依存しないので、$u_t$ に仮定した正則性の下で

$$
\partial_t(R_hu)
=
R_hu_t
$$

です。

従って

$$
\eta_t
=
u_t-R_hu_t.
$$

正確解は任意の $v_h\in V_h$ に対して

$$
(u_t,v_h)+a(u,v_h)
=
\langle f,v_h\rangle
$$

を満たします。

半離散解は

$$
(u_{h,t},v_h)+a(u_h,v_h)
=
\langle f,v_h\rangle.
$$

二式を引くと

$$
(e_t,v_h)+a(e,v_h)=0.
$$

$e=\eta+\theta$ を代入し、

$$
a(\eta,v_h)=0
$$

を使うと

$$
(\theta_t,v_h)+a(\theta,v_h)
=
-(\eta_t,v_h).
$$

$v_h=\theta$ と取れば

$$
\frac12
\frac{d}{dt}
\|\theta\|_2^2
+
\|\nabla\theta\|_2^2
=
-(\eta_t,\theta).
$$

Cauchy--Schwarz と Poincaré から

$$
|(\eta_t,\theta)|
\le
\|\eta_t\|_2\|\theta\|_2
\le
C_P
\|\eta_t\|_2
\|\nabla\theta\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)により

$$
|(\eta_t,\theta)|
\le
\frac12
\|\nabla\theta\|_2^2
+
\frac{C_P^2}{2}
\|\eta_t\|_2^2.
$$

従って

$$
\frac{d}{dt}
\|\theta\|_2^2
+
\|\nabla\theta\|_2^2
\le
C_P^2
\|\eta_t\|_2^2.
$$

初期値は

$$
\theta(0)
=
R_hu(0)-u_h(0)
=
0
$$

です。

よって $0$ から $t$ まで積分して

$$
\|\theta(t)\|_2^2
\le
C_P^2
\int_0^t
\|\eta_t(s)\|_2^2\,ds.
$$

[一次有限要素 Ritz 射影の近似評価](#prop-fem6-ritz-error)を $u_t(s)$ に適用すると

$$
\|\eta_t(s)\|_2
=
\|u_t(s)-R_hu_t(s)\|_2
\le
Ch^2|u_t(s)|_{H^2}.
$$

従って

$$
\max_t
\|\theta(t)\|_2
\le
Ch^2
\|u_t\|_{L^2(0,T;H^2)}.
$$

一方、同じ Ritz 射影評価から

$$
\max_t
\|\eta(t)\|_2
\le
Ch^2
\max_t
|u(t)|_{H^2}.
$$

最後に三角不等式

$$
\|e(t)\|_2
\le
\|\eta(t)\|_2+\|\theta(t)\|_2
$$

を使えば

$$
\max_t
\|u(t)-u_h(t)\|_2
\le
Ch^2
\left[
\max_t|u(t)|_{H^2}
+
\|u_t\|_{L^2(H^2)}
\right].
$$
<!-- proof-end -->

### 仮定をどこで使ったか

- 凸多角形・形状正則性：Ritz 射影の $L^2$ 二次近似。
- $u\in C(H^2)$：各時刻の $\eta$ を $Ch^2$ で抑える。
- $u_t\in L^2(H^2)$：$\eta_t$ を $Ch^2$ で抑える。
- $u_h(0)=R_hu(0)$：動的誤差 $\theta$ の初期項を消す。

初期値を別の射影で取る場合は、その初期射影誤差が右辺へ追加されます。

---

## 6. 時間も離散化する：後退 Euler 法を組み合わせる

時間刻みを

$$
\tau=\frac{T}{N},
\qquad
t_n=n\tau
$$

とします。

$$
D_\tau U^n
=
\frac{U^n-U^{n-1}}{\tau}
$$

と書きます。

<a id="def-fem6-backward-euler-fem"></a>

<!-- formal-statement-start -->
### 定義（後退 Euler 有限要素法）

$V_h\subset H_0^1(\Omega)$、時間刻み $\tau=T/N$、初期値 $U_h^0\in V_h$ を与える。

各 $n=1,\ldots,N$ について、$U_h^n\in V_h$ が

$$
\boxed{
(D_\tau U_h^n,v_h)_{L^2}
+
a(U_h^n,v_h)
=
\langle f(t_n),v_h\rangle
\qquad
(\forall v_h\in V_h)
}
$$

を満たすとき、$\{U_h^n\}_{n=0}^N$ を後退 Euler 有限要素解とする。
<!-- formal-statement-end -->

基底表示では

$$
\boxed{
(M+\tau K)U^n
=
MU^{n-1}
+
\tau F^n
}
$$

です。

$M$ と $K$ はともに正定値なので

$$
M+\tau K
$$

も任意の $\tau>0$ で正定値です。

従って各時刻で一意に解けます。

<!-- definition-example-start: def-fem6-backward-euler-fem -->
**定義の確認**

### 例：一つの熱モードを後退 Euler で進める

第1節と同じく

$$
V_h=\operatorname{span}\{\sin x\},
\qquad
f=0
$$

とし、

$$
U_h^n(x)=c^n\sin x
$$

と置きます。

定義へ代入すると

$$
\frac{c^n-c^{n-1}}{\tau}
\frac\pi2
+
c^n
\frac\pi2
=
0.
$$

従って

$$
\frac{c^n-c^{n-1}}{\tau}+c^n=0,
$$

すなわち

$$
\boxed{
c^n
=
\frac{1}{1+\tau}
c^{n-1}
}.
$$

よって

$$
c^n
=
(1+\tau)^{-n}c^0.
$$

増幅係数は

$$
\frac1{1+\tau}
$$

で、任意の $\tau>0$ について絶対値が $1$ 未満です。

時間刻みを小さくしないと直ちに発散する、という種類の CFL 制約はここにはありません。
<!-- definition-example-end -->

---

## 7. 後退 Euler 法の離散エネルギー評価

連続時間では

$$
(\partial_tu_h,u_h)
=
\frac12
\frac{d}{dt}\|u_h\|_2^2
$$

を使いました。

離散時間では代わりに恒等式

$$
2(a-b,a)
=
\|a\|^2-\|b\|^2+\|a-b\|^2
$$

を使います。

<a id="thm-fem6-backward-euler-energy"></a>

<!-- formal-statement-start -->
### 定理（後退 Euler 有限要素法の離散エネルギー評価）

[後退 Euler 有限要素法](#def-fem6-backward-euler-fem)で

$$
f(t_n)\in H^{-1}(\Omega)
$$

とする。

このとき任意の $m=1,\ldots,N$ に対して

$$
\boxed{
\|U_h^m\|_2^2
+
\sum_{n=1}^m
\|U_h^n-U_h^{n-1}\|_2^2
+
\tau
\sum_{n=1}^m
\|\nabla U_h^n\|_2^2
\le
\|U_h^0\|_2^2
+
\tau
\sum_{n=1}^m
\|f(t_n)\|_{H^{-1}}^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

離散方程式で

$$
v_h=U_h^n
$$

と取ります。

時間差分項に

$$
2(U_h^n-U_h^{n-1},U_h^n)
$$

の恒等式を使うと、時刻 $n$ と $n-1$ のエネルギー差が現れます。

最後に $n$ について和を取ると中間時刻の項が望遠鏡和で消えます。

<!-- proof-start -->
### 証明

$v_h=U_h^n$ と取ると

$$
(D_\tau U_h^n,U_h^n)
+
\|\nabla U_h^n\|_2^2
=
\langle f(t_n),U_h^n\rangle.
$$

時間差分項は

$$
\begin{aligned}
(D_\tau U_h^n,U_h^n)
&=
\frac1\tau
(U_h^n-U_h^{n-1},U_h^n)
\\
&=
\frac{1}{2\tau}
\left[
\|U_h^n\|_2^2
-
\|U_h^{n-1}\|_2^2
+
\|U_h^n-U_h^{n-1}\|_2^2
\right].
\end{aligned}
$$

一方、

$$
|\langle f(t_n),U_h^n\rangle|
\le
\|f(t_n)\|_{H^{-1}}
\|\nabla U_h^n\|_2
$$

なので [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
|\langle f(t_n),U_h^n\rangle|
\le
\frac12
\|f(t_n)\|_{H^{-1}}^2
+
\frac12
\|\nabla U_h^n\|_2^2.
$$

従って

$$
\begin{aligned}
&
\frac{1}{2\tau}
\left[
\|U_h^n\|_2^2
-
\|U_h^{n-1}\|_2^2
+
\|U_h^n-U_h^{n-1}\|_2^2
\right]
\\
&\qquad
+
\frac12
\|\nabla U_h^n\|_2^2
\le
\frac12
\|f(t_n)\|_{H^{-1}}^2.
\end{aligned}
$$

$2\tau$ を掛けると

$$
\begin{aligned}
&
\|U_h^n\|_2^2
-
\|U_h^{n-1}\|_2^2
+
\|U_h^n-U_h^{n-1}\|_2^2
\\
&\qquad
+
\tau
\|\nabla U_h^n\|_2^2
\le
\tau
\|f(t_n)\|_{H^{-1}}^2.
\end{aligned}
$$

$n=1,\ldots,m$ について和を取ると

$$
\sum_{n=1}^m
\left(
\|U_h^n\|_2^2-\|U_h^{n-1}\|_2^2
\right)
=
\|U_h^m\|_2^2-\|U_h^0\|_2^2.
$$

従って

$$
\begin{aligned}
&
\|U_h^m\|_2^2
+
\sum_{n=1}^m
\|U_h^n-U_h^{n-1}\|_2^2
+
\tau
\sum_{n=1}^m
\|\nabla U_h^n\|_2^2
\\
&\qquad
\le
\|U_h^0\|_2^2
+
\tau
\sum_{n=1}^m
\|f(t_n)\|_{H^{-1}}^2.
\end{aligned}
$$

これで示されました。
<!-- proof-end -->

### 「無条件安定」とは何を意味するか

上の証明では

$$
\tau\le Ch^2
$$

のような条件を一度も使っていません。

従ってエネルギー安定性のための CFL 条件は不要です。

ただし、

> 大きな $\tau$ でも安定である

ことと

> 大きな $\tau$ でも正確である

ことは別です。

後退 Euler 法の時間誤差は一次なので、精度を上げるには結局 $\tau\to0$ が必要です。

---

## 8. 前進 Euler ではなぜ CFL 型制約が戻るのか

半離散系

$$
MU'+KU=0
$$

を考えます。

一般化固有値問題

$$
Kz=\lambda Mz
$$

の一つのモードだけを見ると、係数 $c(t)$ は

$$
c'(t)+\lambda c(t)=0
$$

を満たします。

前進 Euler 法なら

$$
c^n
=
(1-\tau\lambda)c^{n-1}.
$$

従ってモードが増幅しないためには

$$
|1-\tau\lambda|
\le1,
$$

すなわち

$$
0\le\tau\lambda\le2
$$

が必要です。

最も大きい一般化固有値を $\lambda_{\max}$ とすると

$$
\boxed{
\tau\lambda_{\max}\le2
}
$$

が必要になります。

準一様な一次有限要素メッシュ族では、参照要素から各要素への affine scaling を全要素で一様に評価すると、ある $h$ に依存しない定数 $C_{\mathrm{inv}}$ に対して

$$
\|\nabla v_h\|_{L^2}
\le
C_{\mathrm{inv}}h^{-1}
\|v_h\|_{L^2}
\qquad
(\forall v_h\in V_h)
$$

が得られます。

一般化固有対 $Kz=\lambda Mz$ に対応する有限要素関数を $v_h$ とすると

$$
\lambda
=
\frac{z^{\mathsf T}Kz}{z^{\mathsf T}Mz}
=
\frac{\|\nabla v_h\|_2^2}{\|v_h\|_2^2}
\le
C_{\mathrm{inv}}^2h^{-2}.
$$

したがって

$$
\tau
\le
\frac{2}{C_{\mathrm{inv}}^2}h^2
$$

と取れば

$$
\tau\lambda_{\max}\le2
$$

を保証できます。これが一次有限要素半離散化で現れる熱方程式型の

$$
\tau
\lesssim
h^2
$$

という CFL スケーリングです。

準一様性を外すと、単一の代表メッシュ幅 $h$ だけでは最小要素の影響を表せないため、この簡潔な形の条件をそのまま使うことはできません。

一方、後退 Euler 法の同じモードの増幅係数は

$$
\frac1{1+\tau\lambda}
$$

で、任意の $\tau>0$ に対して $1$ 以下です。

これは NA7 で扱った線形テスト方程式の安定性解析を、有限要素半離散系の各固有モードへ適用したものです。

---

## 9. 後退差分の時間打切り誤差を積分表示する

全離散誤差を出す前に、時間方向だけの誤差を確認します。

滑らかな $H$ 値関数 $w(t)$ に対して

$$
D_\tau w^n
=
\frac{w(t_n)-w(t_{n-1})}{\tau}
$$

とします。

<a id="lem-fem6-backward-difference-residual"></a>

<!-- formal-statement-start -->
### 補題（後退差分の時間残差評価）

$H$ を実完備内積空間とし、

$$
w\in H^2(0,T;H)
$$

とする。すなわち、本補題では $w,w_t,w_{tt}$ が時間について $H$ 値二乗可積分であるという意味でこの記法を用いる。

$$
\rho^n
=
D_\tau w^n-w_t(t_n)
$$

と置く。

このとき

$$
\boxed{
\rho^n
=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
(s-t_{n-1})w_{tt}(s)\,ds
}
$$

であり、

$$
\boxed{
\tau
\sum_{n=1}^N
\|\rho^n\|_H^2
\le
\frac{\tau^2}{3}
\|w_{tt}\|_{L^2(0,T;H)}^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
D_\tau w^n
=
\frac1\tau
\int_{t_{n-1}}^{t_n}
w_t(s)\,ds.
$$

従って

$$
\begin{aligned}
\rho^n
&=
\frac1\tau
\int_{t_{n-1}}^{t_n}
\bigl(
w_t(s)-w_t(t_n)
\bigr)\,ds
\\
&=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
\left[
\int_s^{t_n}
w_{tt}(r)\,dr
\right]ds.
\end{aligned}
$$

積分順序を交換すると、固定した $r$ に対して $s$ は

$$
t_{n-1}\le s\le r
$$

を動くので

$$
\rho^n
=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
(r-t_{n-1})w_{tt}(r)\,dr.
$$

積分変数を $s$ と書き直せば第一式です。

Cauchy--Schwarz から

$$
\begin{aligned}
\|\rho^n\|_H^2
&\le
\frac1{\tau^2}
\left[
\int_{t_{n-1}}^{t_n}
(s-t_{n-1})^2\,ds
\right]
\left[
\int_{t_{n-1}}^{t_n}
\|w_{tt}(s)\|_H^2\,ds
\right]
\\
&=
\frac{\tau}{3}
\int_{t_{n-1}}^{t_n}
\|w_{tt}(s)\|_H^2\,ds.
\end{aligned}
$$

両辺に $\tau$ を掛けて $n$ について和を取ると

$$
\tau
\sum_{n=1}^N
\|\rho^n\|_H^2
\le
\frac{\tau^2}{3}
\int_0^T
\|w_{tt}(s)\|_H^2\,ds.
$$
<!-- proof-end -->

この補題で

$$
\boxed{
\text{後退 Euler の時間誤差は一次}
}
$$

という事実が、Taylor 展開の記号だけでなく再現可能な積分評価として得られます。

---

## 10. 全離散誤差：空間二次 + 時間一次

ここまでで必要な部品が揃いました。

- Ritz 射影の $L^2$ 空間誤差は $h^2$。
- 離散エネルギー評価は時間刻みに無条件。
- 後退差分の時間残差は $\tau$ の一次。

これらを一つの誤差方程式へ入れます。

<a id="thm-fem6-fully-discrete-l2-error"></a>

<!-- formal-statement-start -->
### 定理（後退 Euler 有限要素法の L2 全離散誤差評価）

$\Omega\subset\mathbb R^2$ を凸多角形領域とし、$\{\mathcal T_h\}$ を形状正則な一次三角形分割族、$V_h$ を連続一次有限要素空間とする。

熱方程式の正確解 $u$ が

$$
u\in C([0,T];H^2(\Omega)\cap H_0^1(\Omega)),
$$

$$
u_t\in L^2(0,T;H^2(\Omega)\cap H_0^1(\Omega)),
$$

$$
u_{tt}\in L^2(0,T;L^2(\Omega))
$$

を満たすとする。

[後退 Euler 有限要素法](#def-fem6-backward-euler-fem)の初期値を

$$
U_h^0=R_hu(0)
$$

とする。

このとき $h,\tau$ に依存しない定数 $C$ が存在して

$$
\boxed{
\max_{0\le n\le N}
\|u(t_n)-U_h^n\|_{L^2}
\le
C
\left[
h^2
\left(
\max_t|u(t)|_{H^2}
+
\|u_t\|_{L^2(0,T;H^2)}
\right)
+
\tau
\|u_{tt}\|_{L^2(0,T;L^2)}
\right]
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各時刻で

$$
u^n-U_h^n
=
\underbrace{u^n-R_hu^n}_{\eta^n}
+
\underbrace{R_hu^n-U_h^n}_{\theta^n}
$$

と分けます。

空間項 $\eta^n$ は Ritz 射影評価で $h^2$ です。

$\theta^n$ の誤差方程式は

$$
(D_\tau\theta^n,v_h)
+
a(\theta^n,v_h)
=
-(D_\tau\eta^n,v_h)
+
(\rho^n,v_h),
$$

ただし

$$
\rho^n
=
D_\tau u^n-u_t(t_n)
$$

です。

したがって右辺は

- 空間射影の時間差分
- 後退 Euler の時間残差

の二つだけになります。

<!-- proof-start -->
### 証明

略記として

$$
u^n=u(t_n)
$$

とします。

$$
\eta^n=u^n-R_hu^n,
\qquad
\theta^n=R_hu^n-U_h^n
$$

と置きます。

正確解の弱形式を時刻 $t_n$ で書くと

$$
(u_t(t_n),v_h)+a(u^n,v_h)
=
\langle f(t_n),v_h\rangle.
$$

全離散法は

$$
(D_\tau U_h^n,v_h)+a(U_h^n,v_h)
=
\langle f(t_n),v_h\rangle.
$$

二式を引きます。

Ritz 射影の定義から

$$
a(R_hu^n,v_h)
=
a(u^n,v_h).
$$

また

$$
U_h^n
=
R_hu^n-\theta^n
$$

なので

$$
a(u^n-U_h^n,v_h)
=
a(\theta^n,v_h).
$$

時間項について

$$
u_t(t_n)-D_\tau U_h^n
=
u_t(t_n)-D_\tau R_hu^n
+
D_\tau\theta^n.
$$

従って

$$
(D_\tau\theta^n,v_h)
+
a(\theta^n,v_h)
=
(D_\tau R_hu^n-u_t(t_n),v_h).
$$

さらに

$$
R_hu^n
=
u^n-\eta^n
$$

なので

$$
D_\tau R_hu^n
=
D_\tau u^n-D_\tau\eta^n.
$$

よって

$$
(D_\tau\theta^n,v_h)
+
a(\theta^n,v_h)
=
-(D_\tau\eta^n,v_h)
+
(\rho^n,v_h),
$$

ただし

$$
\rho^n
=
D_\tau u^n-u_t(t_n).
$$

ここで

$$
v_h=\theta^n
$$

と取ります。

恒等式

$$
2(a-b,a)
=
\|a\|^2-\|b\|^2+\|a-b\|^2
$$

を $a=\theta^n$, $b=\theta^{n-1}$ に適用すると

$$
\begin{aligned}
&
\frac{1}{2\tau}
\left[
\|\theta^n\|_2^2
-
\|\theta^{n-1}\|_2^2
+
\|\theta^n-\theta^{n-1}\|_2^2
\right]
+
\|\nabla\theta^n\|_2^2
\\
&\qquad
=
-(D_\tau\eta^n,\theta^n)
+
(\rho^n,\theta^n).
\end{aligned}
$$

Poincaré と [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から、ある領域依存定数 $C$ に対して

$$
|(D_\tau\eta^n,\theta^n)|
+
|(\rho^n,\theta^n)|
\le
\frac12
\|\nabla\theta^n\|_2^2
+
C
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right).
$$

従って正の差分項を捨てても

$$
\frac{1}{2\tau}
\left(
\|\theta^n\|_2^2-\|\theta^{n-1}\|_2^2
\right)
+
\frac12
\|\nabla\theta^n\|_2^2
\le
C
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right).
$$

$2\tau$ を掛け、$n=1,\ldots,m$ について和を取ると

$$
\|\theta^m\|_2^2
\le
C\tau
\sum_{n=1}^m
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right)
$$

です。

初期値の選び方から

$$
\theta^0
=
R_hu(0)-U_h^0
=
0
$$

を使いました。

まず $\eta$ の時間差分を評価します。

$$
D_\tau\eta^n
=
\frac1\tau
\int_{t_{n-1}}^{t_n}
\eta_t(s)\,ds.
$$

Cauchy--Schwarz により

$$
\|D_\tau\eta^n\|_2^2
\le
\frac1\tau
\int_{t_{n-1}}^{t_n}
\|\eta_t(s)\|_2^2\,ds.
$$

従って

$$
\tau
\sum_{n=1}^N
\|D_\tau\eta^n\|_2^2
\le
\int_0^T
\|\eta_t(s)\|_2^2\,ds.
$$

[一次有限要素 Ritz 射影の近似評価](#prop-fem6-ritz-error)から

$$
\|\eta_t(s)\|_2
=
\|u_t(s)-R_hu_t(s)\|_2
\le
Ch^2|u_t(s)|_{H^2}.
$$

よって

$$
\tau
\sum_{n=1}^N
\|D_\tau\eta^n\|_2^2
\le
Ch^4
\|u_t\|_{L^2(0,T;H^2)}^2.
$$

次に [後退差分の時間残差評価](#lem-fem6-backward-difference-residual)から

$$
\tau
\sum_{n=1}^N
\|\rho^n\|_2^2
\le
\frac{\tau^2}{3}
\|u_{tt}\|_{L^2(0,T;L^2)}^2.
$$

従って

$$
\max_m
\|\theta^m\|_2
\le
C
\left[
h^2
\|u_t\|_{L^2(0,T;H^2)}
+
\tau
\|u_{tt}\|_{L^2(0,T;L^2)}
\right].
$$

一方、

$$
\|\eta^m\|_2
\le
Ch^2|u(t_m)|_{H^2}.
$$

三角不等式

$$
\|u^m-U_h^m\|_2
\le
\|\eta^m\|_2+\|\theta^m\|_2
$$

を使えば主張が従います。
<!-- proof-end -->

### 誤差の読み方

最終式は

$$
\boxed{
\text{全誤差}
\le
\text{空間誤差}
+
\text{時間誤差}
}
$$

を具体化しています。

一次三角形有限要素 + 後退 Euler 法では、十分滑らかな解に対して

$$
\boxed{
L^2\text{ 誤差}
\sim
h^2+\tau
}
$$

という次数が標準です。

したがって両者を同程度にするなら、例えば

$$
\tau
\approx
h^2
$$

と選ぶ考え方があります。

ここで重要なのは、これは **安定性のための CFL 条件ではなく、誤差を釣り合わせる精度設計**だという点です。

後退 Euler 法では $\tau$ をもっと大きくしても離散エネルギーは暴走しませんが、その場合は時間誤差が支配します。

---

## 11. 行列の立場から見る一時刻ステップ

実装上は各時刻で

$$
(M+\tau K)U^n
=
MU^{n-1}
+
\tau F^n
$$

を解きます。

左辺行列

$$
A_\tau
=
M+\tau K
$$

は実対称正定値です。

従って NA8 の Cholesky 分解や NA9 の共役勾配法を適用できます。

時間刻みが一定なら $A_\tau$ は各時刻で同じなので、

- 直接法なら分解を一度作って再利用する。
- 反復法なら前処理を再利用する。

という実装上の利点があります。

一方、$\tau$ を時刻ごとに変えると

$$
M+\tau_nK
$$

が変わるため、再利用方法も変わります。

本章の解析では一定時間刻みに固定しましたが、この行列構造は時間適応法へ進むときにも重要です。

---

## 12. よくある混同

### 12.1 半離散と全離散

空間だけ有限次元にした

$$
MU'(t)+KU(t)=F(t)
$$

は半離散です。

時間も差分化した

$$
(M+\tau K)U^n
=
MU^{n-1}
+
\tau F^n
$$

が全離散です。

### 12.2 安定性と精度

後退 Euler 法は任意の $\tau>0$ でエネルギー安定です。

しかし時間一次精度なので、$\tau$ が大きいままでは正確解へ収束しません。

### 12.3 Ritz 射影と $L^2$ 直交射影

Ritz 射影は

$$
a(w-R_hw,v_h)=0
$$

です。

$L^2$ 射影の

$$
(w-P_hw,v_h)_{L^2}=0
$$

とは別物です。

本章で Ritz 射影を使った理由は、誤差方程式の剛性項を消すためです。

### 12.4 $\tau\approx h^2$ の二つの意味

前進 Euler 法では

$$
\tau\lesssim h^2
$$

が安定性のために必要になります。

後退 Euler 法で

$$
\tau\approx h^2
$$

と選ぶのは、空間 $h^2$ 誤差と時間 $\tau$ 誤差を同程度にするためです。

同じ形の式でも意味が違います。

---

# 演習

## Level A

### A1. 一モード半離散熱方程式

- Level: A
- ID: FEM6-A1

$\Omega=(0,\pi)$、

$$
V_h=\operatorname{span}\{\sin x\}
$$

とする。

$$
u_h(t,x)=c(t)\sin x
$$

が

$$
(\partial_tu_h,v_h)
+
(u_{h,x},v_{h,x})
=
0
\qquad
(\forall v_h\in V_h)
$$

を満たし、

$$
c(0)=2
$$

とする。

$c(t)$ と $u_h(t,x)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$V_h$ は一次元なので

$$
v_h=\sin x
$$

だけを試験すれば十分です。

$$
\partial_tu_h
=
c'(t)\sin x,
\qquad
u_{h,x}
=
c(t)\cos x.
$$

従って

$$
c'(t)
\int_0^\pi\sin^2x\,dx
+
c(t)
\int_0^\pi\cos^2x\,dx
=
0.
$$

$$
\int_0^\pi\sin^2x\,dx
=
\int_0^\pi\cos^2x\,dx
=
\frac\pi2
$$

なので

$$
\frac\pi2c'(t)
+
\frac\pi2c(t)
=
0.
$$

両辺を $\pi/2$ で割ると

$$
c'(t)+c(t)=0.
$$

初期値 $c(0)=2$ から

$$
\boxed{
c(t)=2e^{-t}
}.
$$

したがって

$$
\boxed{
u_h(t,x)
=
2e^{-t}\sin x
}.
$$
<!-- solution-end -->

### A2. 質量行列と剛性行列の正定値性

- Level: A
- ID: FEM6-A2

$V_h\subset H_0^1(\Omega)$ の基底を $\phi_1,\ldots,\phi_m$ とし、

$$
M_{ij}=(\phi_j,\phi_i)_{L^2},
$$

$$
K_{ij}
=
(\nabla\phi_j,\nabla\phi_i)_{L^2}
$$

とする。

任意の $c\in\mathbb R^m$ に対して

$$
c^\mathsf TMc
=
\left\|
\sum_jc_j\phi_j
\right\|_{L^2}^2
$$

および

$$
c^\mathsf TKc
=
\left\|
\nabla\sum_jc_j\phi_j
\right\|_{L^2}^2
$$

を示し、$M,K$ が正定値であることを確認せよ。

<!-- solution-start -->
### 詳細解答

$$
v_h
=
\sum_{j=1}^m
c_j\phi_j
$$

と置きます。

まず

$$
\begin{aligned}
c^\mathsf TMc
&=
\sum_{i=1}^m\sum_{j=1}^m
c_iM_{ij}c_j
\\
&=
\sum_{i,j}
c_i(\phi_j,\phi_i)c_j
\\
&=
\left(
\sum_jc_j\phi_j,
\sum_ic_i\phi_i
\right)
\\
&=
(v_h,v_h)
\\
&=
\|v_h\|_2^2.
\end{aligned}
$$

$c\ne0$ なら基底の線形独立性から $v_h\ne0$ なので

$$
c^\mathsf TMc>0.
$$

従って $M$ は正定値です。

同様に

$$
\begin{aligned}
c^\mathsf TKc
&=
\sum_{i,j}
c_i
(\nabla\phi_j,\nabla\phi_i)c_j
\\
&=
(\nabla v_h,\nabla v_h)
\\
&=
\|\nabla v_h\|_2^2.
\end{aligned}
$$

これが $0$ なら [Poincaré の不等式](../GPDE4/index.md#thm-gpde4-poincare)から

$$
\|v_h\|_2
\le
C_P\|\nabla v_h\|_2
=
0.
$$

従って $v_h=0$、よって $c=0$ です。

したがって $c\ne0$ なら

$$
c^\mathsf TKc>0
$$

であり、$K$ も正定値です。
<!-- solution-end -->

### A3. Ritz 射影を直接計算する

- Level: A
- ID: FEM6-A3

$\Omega=(0,\pi)$、

$$
V_h=\operatorname{span}\{\sin x\}
$$

とする。

$$
w(x)
=
3\sin x-2\sin2x
$$

に対する Ritz 射影 $R_hw$ を求めよ。

<!-- solution-start -->
### 詳細解答

$$
R_hw=c\sin x
$$

と置きます。

Ritz 射影の定義から

$$
\int_0^\pi
(R_hw)'(\sin x)'\,dx
=
\int_0^\pi
w'(\sin x)'\,dx.
$$

左辺は

$$
c\int_0^\pi\cos^2x\,dx
=
c\frac\pi2.
$$

一方

$$
w'
=
3\cos x-4\cos2x.
$$

従って右辺は

$$
3\int_0^\pi\cos^2x\,dx
-
4\int_0^\pi\cos2x\cos x\,dx.
$$

異なる cosine モードは直交するので第二項は $0$ です。

したがって

$$
\frac\pi2c
=
3\frac\pi2.
$$

よって

$$
c=3.
$$

従って

$$
\boxed{
R_hw=3\sin x
}.
$$

$\sin2x$ 成分が消えるのは、勾配内積に関して $\sin x$ と直交しているためです。
<!-- solution-end -->

### A4. 後退 Euler の一モード増幅

- Level: A
- ID: FEM6-A4

スカラー方程式

$$
c'(t)+\lambda c(t)=0,
\qquad
\lambda>0
$$

へ後退 Euler 法を適用せよ。

増幅係数を求め、任意の $\tau>0$ について

$$
|c^n|\le|c^{n-1}|
$$

を示せ。

<!-- solution-start -->
### 詳細解答

後退 Euler 法は

$$
\frac{c^n-c^{n-1}}{\tau}
+
\lambda c^n
=
0.
$$

両辺に $\tau$ を掛けると

$$
c^n-c^{n-1}
+
\tau\lambda c^n
=
0.
$$

従って

$$
(1+\tau\lambda)c^n
=
c^{n-1}.
$$

よって

$$
\boxed{
c^n
=
\frac1{1+\tau\lambda}
c^{n-1}
}.
$$

増幅係数は

$$
G(\tau\lambda)
=
\frac1{1+\tau\lambda}.
$$

$\tau>0,\lambda>0$ なので

$$
0<G(\tau\lambda)<1.
$$

したがって

$$
|c^n|
=
G(\tau\lambda)|c^{n-1}|
\le
|c^{n-1}|.
$$

時間刻みに上限制約は不要です。
<!-- solution-end -->

## Level B

### B1. 半離散エネルギー評価を導く

- Level: B
- ID: FEM6-B1

$f\in L^2(0,T;H^{-1}(\Omega))$ とし、$u_h$ が

$$
(\partial_tu_h,v_h)
+
(\nabla u_h,\nabla v_h)
=
\langle f,v_h\rangle
$$

を満たすとする。

$v_h=u_h$ を用いて

$$
\|u_h(t)\|_2^2
+
\int_0^t
\|\nabla u_h\|_2^2\,ds
\le
\|u_h(0)\|_2^2
+
\int_0^t
\|f\|_{H^{-1}}^2\,ds
$$

を導け。

<!-- solution-start -->
### 詳細解答

試験関数として

$$
v_h=u_h(t)
$$

を選びます。

すると

$$
(\partial_tu_h,u_h)
+
\|\nabla u_h\|_2^2
=
\langle f,u_h\rangle.
$$

左辺第一項は

$$
(\partial_tu_h,u_h)
=
\frac12
\frac{d}{dt}
\|u_h\|_2^2.
$$

右辺は双対ノルムから

$$
|\langle f,u_h\rangle|
\le
\|f\|_{H^{-1}}
\|\nabla u_h\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)で

$$
\|f\|_{H^{-1}}
\|\nabla u_h\|_2
\le
\frac12\|f\|_{H^{-1}}^2
+
\frac12\|\nabla u_h\|_2^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u_h\|_2^2
+
\frac12
\|\nabla u_h\|_2^2
\le
\frac12
\|f\|_{H^{-1}}^2.
$$

2倍して

$$
\frac{d}{dt}
\|u_h\|_2^2
+
\|\nabla u_h\|_2^2
\le
\|f\|_{H^{-1}}^2.
$$

$0$ から $t$ まで積分すると

$$
\|u_h(t)\|_2^2
-
\|u_h(0)\|_2^2
+
\int_0^t
\|\nabla u_h(s)\|_2^2\,ds
\le
\int_0^t
\|f(s)\|_{H^{-1}}^2\,ds.
$$

初期値項を右へ移して

$$
\boxed{
\|u_h(t)\|_2^2
+
\int_0^t
\|\nabla u_h\|_2^2\,ds
\le
\|u_h(0)\|_2^2
+
\int_0^t
\|f\|_{H^{-1}}^2\,ds
}.
$$
<!-- solution-end -->

### B2. Ritz 分解から半離散 L2 誤差を出す

- Level: B
- ID: FEM6-B2

正確解 $u$ と半離散解 $u_h$ に対し

$$
\eta=u-R_hu,
\qquad
\theta=R_hu-u_h
$$

と置く。

$$
u_h(0)=R_hu(0)
$$

とし、

$$
\|\eta_t(t)\|_2
\le
Ch^2|u_t(t)|_{H^2}
$$

を仮定する。

次を示せ。

$$
\boxed{
\max_{0\le t\le T}
\|\theta(t)\|_2
\le
Ch^2
\|u_t\|_{L^2(0,T;H^2)}
}
$$

<!-- solution-start -->
### 詳細解答

正確解と半離散解の差から

$$
((u-u_h)_t,v_h)
+
a(u-u_h,v_h)
=
0.
$$

$$
u-u_h=\eta+\theta
$$

なので

$$
(\eta_t+\theta_t,v_h)
+
a(\eta+\theta,v_h)
=
0.
$$

Ritz 射影の定義から

$$
a(\eta,v_h)=0.
$$

従って

$$
(\theta_t,v_h)
+
a(\theta,v_h)
=
-(\eta_t,v_h).
$$

$v_h=\theta$ と取ると

$$
\frac12
\frac{d}{dt}
\|\theta\|_2^2
+
\|\nabla\theta\|_2^2
=
-(\eta_t,\theta).
$$

Cauchy--Schwarz と Poincaré により

$$
|(\eta_t,\theta)|
\le
C_P
\|\eta_t\|_2
\|\nabla\theta\|_2.
$$

[Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)から

$$
|(\eta_t,\theta)|
\le
\frac12
\|\nabla\theta\|_2^2
+
C
\|\eta_t\|_2^2.
$$

従って

$$
\frac{d}{dt}
\|\theta\|_2^2
\le
C
\|\eta_t\|_2^2.
$$

初期値条件から

$$
\theta(0)
=
R_hu(0)-u_h(0)
=
0.
$$

したがって

$$
\|\theta(t)\|_2^2
\le
C
\int_0^t
\|\eta_t(s)\|_2^2\,ds.
$$

仮定

$$
\|\eta_t(s)\|_2
\le
Ch^2|u_t(s)|_{H^2}
$$

を代入すると

$$
\|\theta(t)\|_2^2
\le
Ch^4
\int_0^T
|u_t(s)|_{H^2}^2\,ds.
$$

平方根を取って

$$
\boxed{
\max_t
\|\theta(t)\|_2
\le
Ch^2
\|u_t\|_{L^2(0,T;H^2)}
}.
$$
<!-- solution-end -->

### B3. 後退差分の時間残差

- Level: B
- ID: FEM6-B3

実 Hilbert 空間 $H$ に値を取る

$$
w\in H^2(0,T;H)
$$

について

$$
\rho^n
=
\frac{w(t_n)-w(t_{n-1})}{\tau}
-
w_t(t_n)
$$

とする。

次を示せ。

$$
\rho^n
=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
(s-t_{n-1})w_{tt}(s)\,ds,
$$

$$
\tau
\sum_{n=1}^N
\|\rho^n\|_H^2
\le
\frac{\tau^2}{3}
\|w_{tt}\|_{L^2(0,T;H)}^2.
$$

<!-- solution-start -->
### 詳細解答

基本定理から

$$
w(t_n)-w(t_{n-1})
=
\int_{t_{n-1}}^{t_n}
w_t(s)\,ds.
$$

従って

$$
\rho^n
=
\frac1\tau
\int_{t_{n-1}}^{t_n}
\left[
w_t(s)-w_t(t_n)
\right]ds.
$$

さらに

$$
w_t(s)-w_t(t_n)
=
-\int_s^{t_n}
w_{tt}(r)\,dr.
$$

したがって

$$
\rho^n
=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
\int_s^{t_n}
w_{tt}(r)\,dr\,ds.
$$

積分領域は

$$
t_{n-1}\le s\le r\le t_n
$$

です。

$r$ を外側にすると

$$
t_{n-1}\le r\le t_n,
\qquad
t_{n-1}\le s\le r
$$

なので

$$
\rho^n
=
-\frac1\tau
\int_{t_{n-1}}^{t_n}
(r-t_{n-1})w_{tt}(r)\,dr.
$$

積分変数を $s$ に戻せば第一式です。

次に Cauchy--Schwarz を使うと

$$
\begin{aligned}
\|\rho^n\|_H^2
&\le
\frac1{\tau^2}
\left[
\int_{t_{n-1}}^{t_n}
(s-t_{n-1})^2ds
\right]
\left[
\int_{t_{n-1}}^{t_n}
\|w_{tt}(s)\|_H^2ds
\right]
\\
&=
\frac{\tau}{3}
\int_{t_{n-1}}^{t_n}
\|w_{tt}(s)\|_H^2ds.
\end{aligned}
$$

両辺に $\tau$ を掛けて和を取ると

$$
\tau
\sum_{n=1}^N
\|\rho^n\|_H^2
\le
\frac{\tau^2}{3}
\sum_{n=1}^N
\int_{t_{n-1}}^{t_n}
\|w_{tt}(s)\|_H^2ds.
$$

区間が $[0,T]$ を分割するので

$$
\boxed{
\tau
\sum_{n=1}^N
\|\rho^n\|_H^2
\le
\frac{\tau^2}{3}
\|w_{tt}\|_{L^2(0,T;H)}^2
}.
$$
<!-- solution-end -->

## Level C

### C1. 空間誤差と時間誤差を分離する

- Level: C
- ID: FEM6-C1

$\Omega\subset\mathbb R^2$ を凸多角形領域、$V_h$ を形状正則な一次三角形有限要素空間とする。

正確解 $u$ が

$$
u\in C([0,T];H^2\cap H_0^1),
$$

$$
u_t\in L^2(0,T;H^2\cap H_0^1),
$$

$$
u_{tt}\in L^2(0,T;L^2)
$$

を満たすとする。

後退 Euler 有限要素解 $U_h^n$ の初期値を

$$
U_h^0=R_hu(0)
$$

とする。

各時刻で

$$
u^n-U_h^n
=
\eta^n+\theta^n,
$$

$$
\eta^n=u^n-R_hu^n,
\qquad
\theta^n=R_hu^n-U_h^n
$$

と置き、次の評価を導け。

$$
\boxed{
\max_n
\|u^n-U_h^n\|_2
\le
C
\left[
h^2
\left(
\max_t|u(t)|_{H^2}
+
\|u_t\|_{L^2(H^2)}
\right)
+
\tau
\|u_{tt}\|_{L^2(L^2)}
\right]
}
$$

<!-- solution-start -->
### 詳細解答

出発点は正確解と全離散解の弱形式です。

正確解は

$$
(u_t(t_n),v_h)+a(u^n,v_h)
=
\langle f(t_n),v_h\rangle.
$$

全離散解は

$$
(D_\tau U_h^n,v_h)+a(U_h^n,v_h)
=
\langle f(t_n),v_h\rangle.
$$

二式を引きます。

Ritz 射影の定義

$$
a(R_hu^n,v_h)=a(u^n,v_h)
$$

を使うと

$$
(D_\tau\theta^n,v_h)
+
a(\theta^n,v_h)
=
-(D_\tau\eta^n,v_h)
+
(\rho^n,v_h),
$$

ただし

$$
\rho^n
=
D_\tau u^n-u_t(t_n)
$$

です。

ここで

$$
v_h=\theta^n
$$

と取ります。

離散恒等式

$$
2(\theta^n-\theta^{n-1},\theta^n)
=
\|\theta^n\|_2^2
-
\|\theta^{n-1}\|_2^2
+
\|\theta^n-\theta^{n-1}\|_2^2
$$

から

$$
\begin{aligned}
&
\frac{1}{2\tau}
\left[
\|\theta^n\|_2^2
-
\|\theta^{n-1}\|_2^2
+
\|\theta^n-\theta^{n-1}\|_2^2
\right]
+
\|\nabla\theta^n\|_2^2
\\
&\qquad
=
-(D_\tau\eta^n,\theta^n)
+
(\rho^n,\theta^n).
\end{aligned}
$$

Poincaré と [Young の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#lem-f0-00d2d-01)を二つの右辺項へ使うと

$$
|(D_\tau\eta^n,\theta^n)|
+
|(\rho^n,\theta^n)|
\le
\frac12
\|\nabla\theta^n\|_2^2
+
C
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right).
$$

従って正の項を捨てて

$$
\frac{1}{2\tau}
\left(
\|\theta^n\|_2^2
-
\|\theta^{n-1}\|_2^2
\right)
\le
C
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right).
$$

$2\tau$ を掛けて $n=1,\ldots,m$ について和を取ります。

初期値から

$$
\theta^0
=
R_hu(0)-U_h^0
=
0.
$$

従って

$$
\|\theta^m\|_2^2
\le
C\tau
\sum_{n=1}^m
\left(
\|D_\tau\eta^n\|_2^2
+
\|\rho^n\|_2^2
\right).
$$

まず

$$
D_\tau\eta^n
=
\frac1\tau
\int_{t_{n-1}}^{t_n}
\eta_t(s)\,ds.
$$

Cauchy--Schwarz から

$$
\|D_\tau\eta^n\|_2^2
\le
\frac1\tau
\int_{t_{n-1}}^{t_n}
\|\eta_t(s)\|_2^2\,ds.
$$

従って

$$
\tau
\sum_n
\|D_\tau\eta^n\|_2^2
\le
\int_0^T
\|\eta_t(s)\|_2^2\,ds.
$$

Ritz 射影の $L^2$ 近似評価から

$$
\|\eta_t(s)\|_2
\le
Ch^2|u_t(s)|_{H^2}.
$$

よって

$$
\tau
\sum_n
\|D_\tau\eta^n\|_2^2
\le
Ch^4
\|u_t\|_{L^2(H^2)}^2.
$$

次に B3 の時間残差評価から

$$
\tau
\sum_n
\|\rho^n\|_2^2
\le
\frac{\tau^2}{3}
\|u_{tt}\|_{L^2(L^2)}^2.
$$

従って

$$
\max_m
\|\theta^m\|_2
\le
C
\left[
h^2
\|u_t\|_{L^2(H^2)}
+
\tau
\|u_{tt}\|_{L^2(L^2)}
\right].
$$

一方、

$$
\|\eta^m\|_2
=
\|u^m-R_hu^m\|_2
\le
Ch^2|u^m|_{H^2}.
$$

したがって

$$
\max_m
\|\eta^m\|_2
\le
Ch^2
\max_t|u(t)|_{H^2}.
$$

最後に

$$
u^m-U_h^m
=
\eta^m+\theta^m
$$

なので

$$
\|u^m-U_h^m\|_2
\le
\|\eta^m\|_2+\|\theta^m\|_2.
$$

以上を合わせて

$$
\boxed{
\max_m
\|u^m-U_h^m\|_2
\le
C
\left[
h^2
\left(
\max_t|u(t)|_{H^2}
+
\|u_t\|_{L^2(H^2)}
\right)
+
\tau
\|u_{tt}\|_{L^2(L^2)}
\right]
}.
$$

ここで $h^2$ は空間近似、$\tau$ は時間離散から来ています。

後退 Euler 法では $\tau\approx h^2$ は安定性の条件ではなく、二つの誤差を同程度にするための精度上の選択です。
<!-- solution-end -->

---

## 13. まとめ

本章で得た構造は

$$
\boxed{
\text{熱方程式}
\to
\text{空間半離散}
\to
MU'+KU=F
}
$$

から始まりました。

半離散系では

$$
v_h=u_h
$$

を試験関数に取るだけで、メッシュ幅に依存しないエネルギー評価が得られます。

誤差解析では

$$
u-u_h
=
(u-R_hu)
+
(R_hu-u_h)
$$

という Ritz 分解により、

$$
\boxed{
\text{空間の近似能力}
}
$$

と

$$
\boxed{
\text{離散時間発展の誤差}
}
$$

を分離しました。

さらに後退 Euler 法を入れると

$$
(M+\tau K)U^n
=
MU^{n-1}
+
\tau F^n
$$

となり、離散エネルギー評価から時間刻みによる CFL 制約なしで安定です。

十分滑らかな解に対しては

$$
\boxed{
\max_n
\|u(t_n)-U_h^n\|_{L^2}
\le
C(h^2+\tau)
}
$$

という標準的な次数が得られます。

ここで最も重要なのは、単に「FEM は $h^2$、Euler は $\tau$」と暗記することではありません。

$$
\boxed{
\text{Ritz 直交性}
+
\text{エネルギー評価}
+
\text{時間残差}
}
$$

が、それぞれ空間項・安定性・時間項を担当していることです。

次の FEM7 では、拡散が弱く移流が強いとき、この標準 Galerkin の安定性機構だけでは非物理振動を抑えられない状況へ進みます。
