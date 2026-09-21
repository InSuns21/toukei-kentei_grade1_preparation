# VC9 保存則から流体・電磁気へ

VC1--VC8 では、勾配・発散・回転から始め、線積分・曲面積分、Green・Gauss--Ostrogradsky・Kelvin--Stokes の各定理、デカルトテンソル、Helmholtz 分解までを組み立てました。

最終章では、それらが数理物理でどのように同じ構造として現れるかを確認します。

本章の主題は物理学の公式を大量に覚えることではありません。

- 保存される量には密度と流束がある。
- 発散定理は、局所的な収支を境界流束へ変える。
- Kelvin--Stokes の定理は、局所的な回転を境界循環へ変える。
- 二階テンソルの発散は、表面力を体積力密度へ変える。
- Maxwell 方程式の積分形と微分形は、まさにこれらの積分定理で結ばれる。

直接の前提は [VC7 の二階テンソル場・応力テンソル](../VC7/index.md#def-vc7-stress) と [VC8 の Helmholtz 分解・渦度再構成](../VC8/index.md#cor-vc8-biot-savart) です。保存則そのものの一般論は [VC4 の局所保存則](../VC4/index.md#def-vc4-local-conservation) を正本として再利用し、本章で重複定義しません。

---

## 1. 保存則の正本を質量へ適用する

VC4 では、密度 $q$、流束 $J$、生成項 $s$ に対する一般の局所保存則

$$
\partial_t q+\operatorname{div}J=s
$$

と、その積分形

$$
\frac{d}{dt}\int_\Omega q\,dV
=
-\int_{\partial\Omega}J\cdot n\,dS
+
\int_\Omega s\,dV
$$

を既に証明しました。

流体の質量保存では、保存される量が質量です。質量密度を $\rho(t,x)$、速度場を $u(t,x)$ とします。

<a id="def-vc9-mass-flux"></a>

<!-- formal-statement-start -->
> **定義（質量流束）**  
> 質量密度 $\rho$ と速度場 $u$ に対し
>
$$
J_m:=\rho u
$$
>
> を **質量流束**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-mass-flux -->
**定義の確認**

$$
\rho=2,
\qquad
u=(3,-1,0)
$$

なら

$$
J_m
=
\rho u
=
(6,-2,0).
$$

法線 $n=e_1$ の面では

$$
J_m\cdot n=6
$$

なので、単位面積・単位時間あたり 6 の質量が正の $x$ 方向へ通過します。
<!-- definition-example-end -->

質量生成率を $q_m$ と書けば、VC4 の一般保存則へ $q=\rho$、$J=\rho u$、$s=q_m$ を代入するだけで次を得ます。

<a id="prop-vc9-continuity"></a>

<!-- formal-statement-start -->
> **命題（質量保存の連続の式）**  
> 十分滑らかな質量密度 $\rho$、速度場 $u$、質量生成率 $q_m$ が VC4 の局所保存則に従うとする。このとき
>
$$
\boxed{
\partial_t\rho
+
\operatorname{div}(\rho u)
=
q_m
}
$$
>
> が成り立つ。特に質量生成がなければ
>
$$
\boxed{
\partial_t\rho
+
\operatorname{div}(\rho u)
=
0
}
$$
>
> である。
<!-- formal-statement-end -->

これは新しい積分定理ではなく、[VC4 の局所保存則](../VC4/index.md#def-vc4-local-conservation)を「質量」という具体的な対象へ特殊化したものです。

例えば

$$
u(t,x)
=
\frac{\alpha}{3}x,
\qquad
\rho(t,x)
=
\rho_0e^{-\alpha t}
$$

とすると

$$
\partial_t\rho=-\alpha\rho
$$

であり、$\rho$ は空間的に一定なので

$$
\operatorname{div}(\rho u)
=
\rho\operatorname{div}u
=
\rho\alpha.
$$

従って

$$
\partial_t\rho+\operatorname{div}(\rho u)=0
$$

です。空間が膨張する速度場の中で、密度がちょうどその分だけ低下しています。

---

## 2. 流れと一緒に量を見る：物質微分

固定した点 $x$ での時間微分 $\partial_t f$ と、流体粒子が動きながら観測する変化率は同じではありません。

<a id="def-vc9-material-derivative"></a>

<!-- formal-statement-start -->
> **定義（物質微分）**  
> スカラー場 $f(t,x)$ と速度場 $u(t,x)$ に対し
>
$$
\boxed{
\frac{Df}{Dt}
:=
\partial_t f
+
u\cdot\nabla f
}
$$
>
> を $f$ の **物質微分**と呼ぶ。
>
> ベクトル場 $v=(v_1,v_2,v_3)$ については成分ごとに
>
$$
\frac{Dv}{Dt}
:=
\partial_t v
+
(u\cdot\nabla)v
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-material-derivative -->
**定義の確認**

$$
f(t,x,y,z)=t+x^2,
\qquad
u=(1,0,0)
$$

なら

$$
\partial_t f=1,
\qquad
\nabla f=(2x,0,0)
$$

なので

$$
\frac{Df}{Dt}
=
1+2x.
$$

固定点での変化率は 1 ですが、流れに乗る観測者は $x$ 方向へ移動するため、空間勾配から $2x$ が追加されます。
<!-- definition-example-end -->

この定義が本当に粒子に沿う微分になっていることを確認します。粒子の経路 $X(t)$ が

$$
\dot X(t)=u(t,X(t))
$$

を満たすなら、連鎖律から

$$
\frac{d}{dt}f(t,X(t))
=
\partial_t f(t,X(t))
+
\nabla f(t,X(t))\cdot\dot X(t)
$$

なので

$$
\frac{d}{dt}f(t,X(t))
=
\frac{Df}{Dt}(t,X(t)).
$$

<a id="prop-vc9-continuity-material"></a>

<!-- formal-statement-start -->
> **命題（連続の式の物質微分形）**  
> $\rho,u$ が十分滑らかなら
>
$$
\partial_t\rho+\operatorname{div}(\rho u)=q_m
$$
>
> と
>
$$
\boxed{
\frac{D\rho}{Dt}
+
\rho\,\operatorname{div}u
=
q_m
}
$$
>
> は同値である。
<!-- formal-statement-end -->

### 証明の核心

[VC1 の積の微分則](../VC1/index.md#prop-vc1-product-rules)から

$$
\operatorname{div}(\rho u)
=
u\cdot\nabla\rho
+
\rho\,\operatorname{div}u.
$$

従って

$$
\partial_t\rho
+
\operatorname{div}(\rho u)
=
\left(
\partial_t\rho+u\cdot\nabla\rho
\right)
+
\rho\,\operatorname{div}u
$$

であり、括弧内が $D\rho/Dt$ です。

---

## 3. 非圧縮性は何を意味するか

<a id="def-vc9-incompressible"></a>

<!-- formal-statement-start -->
> **定義（非圧縮速度場）**  
> 速度場 $u$ が
>
$$
\boxed{
\operatorname{div}u=0
}
$$
>
> を満たすとき、$u$ を **非圧縮速度場**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-incompressible -->
**定義の確認**

一定の角速度 $\Omega$ に対する剛体回転

$$
u=(-\Omega y,\Omega x,0)
$$

では

$$
\operatorname{div}u
=
\partial_x(-\Omega y)
+
\partial_y(\Omega x)
=
0.
$$

従ってこの速度場は非圧縮です。
<!-- definition-example-end -->

生成項のない連続の式では

$$
\frac{D\rho}{Dt}
+
\rho\operatorname{div}u
=
0.
$$

従って非圧縮速度場なら

$$
\frac{D\rho}{Dt}=0.
$$

つまり密度は各粒子の経路に沿って一定です。

逆に、$\rho$ が正の定数であり質量生成がないなら

$$
0+\rho\operatorname{div}u=0
$$

なので

$$
\operatorname{div}u=0.
$$

ただし

$$
\operatorname{div}u=0
$$

だけから「空間のどこでも密度が同じ定数」とは限りません。言えるのは、生成項のない質量保存と組み合わせたときに **各粒子が自分の密度を運ぶ**ことです。

---

## 4. 渦度：速度場の局所的な回転

<a id="def-vc9-vorticity"></a>

<!-- formal-statement-start -->
> **定義（渦度）**  
> $C^1$ 級速度場 $u$ に対し
>
$$
\boxed{
\omega
:=
\nabla\times u
}
$$
>
> を **渦度**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-vorticity -->
**定義の確認**

剛体回転

$$
u=(-\Omega y,\Omega x,0)
$$

では

$$
\omega
=
\nabla\times u
=
(0,0,2\Omega).
$$

角速度が $\Omega$ であるのに渦度が $2\Omega$ になる点が重要です。渦度は角速度そのものではなく、局所循環密度として定義されています。
<!-- definition-example-end -->

[VC5 の「回転は局所循環密度」](../VC5/index.md#prop-vc5-curl-circulation-density)を速度場へ適用すれば、渦度はそのまま速度の局所循環密度です。

<a id="cor-vc9-circulation-vorticity"></a>

<!-- formal-statement-start -->
> **系（循環と渦度）**  
> Kelvin--Stokes の定理を適用できる向き付けられた曲面 $S$ と、その誘導向きを持つ境界 $\partial S$ に対し
>
$$
\boxed{
\oint_{\partial S}u\cdot dr
=
\int_S\omega\cdot n\,dS
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

これは [VC5 の Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)で $F=u$ と置いただけです。しかし流体力学では、左辺が速度の循環、右辺が面を貫く渦度流束という物理的な読み替えを持ちます。

---

## 5. 二次元非圧縮流と流れ関数

二次元では、非圧縮条件を一つのスカラー関数へ吸収できます。

<a id="def-vc9-stream-function"></a>

<!-- formal-statement-start -->
> **定義（二次元の流れ関数）**  
> 平面速度場
>
$$
u=(u_1(x,y),u_2(x,y),0)
$$
>
> に対し、スカラー関数 $\psi(x,y)$ が
>
$$
\boxed{
u_1=\partial_y\psi,
\qquad
u_2=-\partial_x\psi
}
$$
>
> を満たすとき、$\psi$ を **流れ関数**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-stream-function -->
**定義の確認**

$$
\psi(x,y)
=
\frac{x^2+y^2}{2}
$$

なら

$$
u_1=\partial_y\psi=y,
\qquad
u_2=-\partial_x\psi=-x.
$$

従って

$$
u=(y,-x,0).
$$

直接計算すると

$$
\operatorname{div}u
=
\partial_x y+\partial_y(-x)
=
0.
$$
<!-- definition-example-end -->

<a id="thm-vc9-stream-function"></a>

<!-- formal-statement-start -->
> **定理（非圧縮平面流の流れ関数）**  
> $D\subset\mathbb R^2$ を領域とし、ある $a\in D$ が存在して、すべての $x\in D$ と $0\le t\le1$ に対し
>
$$
(1-t)a+tx\in D
$$
>
> が成り立つとする。また
>
$$
u=(u_1,u_2,0)\in C^1(D;\mathbb R^3)
$$
>
> が
>
$$
\partial_xu_1+\partial_yu_2=0
$$
>
> を満たすとする。このとき流れ関数 $\psi$ が存在して
>
$$
u_1=\psi_y,
\qquad
u_2=-\psi_x.
$$
>
> さらに $u\in C^2$ なら
>
$$
\boxed{
\omega_3
=
-\Delta\psi
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

速度場そのものにポテンシャルを求めるのではなく、

$$
F=(-u_2,u_1)
$$

という 90 度回転した場を考えます。$u$ の発散 0 が $F$ の平面回転 0 に変わるため、VC2 の保存場の理論を使えます。

<!-- proof-start -->
### 証明

$$
F=(-u_2,u_1)
$$

と置きます。平面回転は

$$
\partial_xF_2-\partial_yF_1
=
\partial_xu_1+\partial_yu_2
=
0.
$$

上で仮定した線分条件と平面回転が 0 であることから、[VC2 の初等 Poincaré の補題](../VC2/index.md#thm-vc2-poincare-star)を適用でき、ある $\psi$ が存在して

$$
\nabla\psi=F.
$$

従って

$$
\psi_x=-u_2,
\qquad
\psi_y=u_1.
$$

すなわち

$$
u_1=\psi_y,
\qquad
u_2=-\psi_x.
$$

次に

$$
\omega_3
=
\partial_xu_2-\partial_yu_1.
$$

流れ関数表示を代入すると

$$
\omega_3
=
-\psi_{xx}-\psi_{yy}
=
-\Delta\psi.
$$
<!-- proof-end -->

二次元では

$$
\text{渦度}
\longleftrightarrow
-\Delta\psi
\longleftrightarrow
\text{流れ関数}
$$

という Poisson 方程式が現れます。三次元での対応物が、VC8 の [Biot--Savart 型の渦度再構成](../VC8/index.md#cor-vc8-biot-savart)です。

---

## 6. 運動量はスカラー保存則ではなくベクトル保存則

質量保存では対象となる量がスカラーでした。運動量密度は

$$
\rho u
$$

というベクトルです。

流体が境界を通過すると、速度方向の運動量を速度自身が運びます。[VC7 の二項積](../VC7/index.md#def-vc7-dyadic)を用いると、移流による運動量流束は

$$
\rho u\otimes u
$$

です。実際、

$$
(\rho u\otimes u)n
=
\rho u(u\cdot n).
$$

一方、境界面に働く力は [VC7 の応力テンソル](../VC7/index.md#def-vc7-stress)により

$$
\sigma n
$$

と書けます。

<a id="principle-vc9-momentum-integral"></a>

<!-- formal-statement-start -->
> **原理（固定検査体積の運動量収支）**  
> 固定された検査体積 $\Omega$ に対し、質量密度を $\rho$、速度を $u$、応力テンソルを $\sigma$、単位質量あたりの体積力を $b$ とする。運動量収支を
>
$$
\boxed{
\frac{d}{dt}\int_\Omega \rho u\,dV
=
-\int_{\partial\Omega}
\rho u(u\cdot n)\,dS
+
\int_{\partial\Omega}\sigma n\,dS
+
\int_\Omega\rho b\,dV
}
$$
>
> とする。
<!-- formal-statement-end -->

これはベクトル解析だけから証明される定理ではなく、**運動量保存を物理原理として置いた式**です。ベクトル解析の役割は、ここから局所式を正確に取り出すことです。

<a id="thm-vc9-momentum-local"></a>

<!-- formal-statement-start -->
> **定理（局所運動量収支）**  
> $\rho,u,\sigma,b$ が十分滑らかで、上の運動量収支が任意の十分小さい固定検査体積で成り立つとする。このとき
>
$$
\boxed{
\partial_t(\rho u)
+
\operatorname{div}(\rho u\otimes u)
=
\operatorname{div}\sigma
+
\rho b
}
$$
>
> が成り立つ。
>
> さらに質量生成のない連続の式
>
$$
\partial_t\rho+\operatorname{div}(\rho u)=0
$$
>
> が成り立つなら
>
$$
\boxed{
\rho\frac{Du}{Dt}
=
\operatorname{div}\sigma+\rho b
}
$$
>
> と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

境界上の移流項は二階テンソル $\rho u\otimes u$ の流束です。VC7 のテンソル版発散定理で体積積分へ戻し、任意の小領域で成り立つことから被積分関数を一致させます。その後、質量保存を使うと余分な $u$ 倍の項が消えます。

<!-- proof-start -->
### 証明

[VC7 の二階テンソル版 Gauss--Ostrogradsky の発散定理](../VC7/index.md#thm-vc7-tensor-divergence)から

$$
\int_{\partial\Omega}
\rho u(u\cdot n)\,dS
=
\int_\Omega
\operatorname{div}(\rho u\otimes u)\,dV,
$$

また

$$
\int_{\partial\Omega}
\sigma n\,dS
=
\int_\Omega
\operatorname{div}\sigma\,dV.
$$

時間微分を積分内へ入れられるとすると、積分形は

$$
\int_\Omega
\left[
\partial_t(\rho u)
+
\operatorname{div}(\rho u\otimes u)
-
\operatorname{div}\sigma
-
\rho b
\right]dV
=
0.
$$

各成分について [VC4 の局所化の命題](../VC4/index.md#prop-vc4-integral-to-local)と同じ連続性の議論を使えば

$$
\partial_t(\rho u)
+
\operatorname{div}(\rho u\otimes u)
=
\operatorname{div}\sigma
+
\rho b.
$$

次に第 $i$ 成分を展開します。

$$
\partial_t(\rho u_i)
+
\partial_j(\rho u_i u_j)
$$

$$
=
\rho\partial_tu_i
+
u_i\partial_t\rho
+
\rho u_j\partial_ju_i
+
u_i\partial_j(\rho u_j).
$$

従って

$$
\partial_t(\rho u_i)
+
\partial_j(\rho u_i u_j)
$$

$$
=
\rho
\left(
\partial_tu_i+u_j\partial_ju_i
\right)
+
u_i
\left(
\partial_t\rho+\partial_j(\rho u_j)
\right).
$$

最後の括弧は連続の式により 0 なので

$$
\partial_t(\rho u)
+
\operatorname{div}(\rho u\otimes u)
=
\rho\frac{Du}{Dt}.
$$

よって

$$
\rho\frac{Du}{Dt}
=
\operatorname{div}\sigma+\rho b.
$$
<!-- proof-end -->

ここで現れた

$$
\rho\frac{Du}{Dt}
$$

は「質量密度 $\times$ 流体粒子の加速度」です。Newton の運動方程式が連続体の各点へ移された形と読めます。

---

## 7. 角運動量保存が応力の対称性を要求する

VC7 では、応力テンソル $\sigma$ の定義だけから

$$
\sigma=\sigma^T
$$

とは言えないことを確認しました。対称性には追加の物理原理が必要です。

<a id="prop-vc9-stress-symmetry"></a>

<!-- formal-statement-start -->
> **命題（古典連続体における応力テンソルの対称性）**  
> 十分滑らかな古典連続体を考える。偶力応力と体積偶力がなく、任意の固定検査体積で
>
> 1. 局所運動量収支
> 2. 角運動量保存
>
> が成り立つとする。このとき
>
$$
\boxed{
\sigma=\sigma^T
}
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

角運動量収支から、位置ベクトル $x$ と線形運動量収支の外積に相当する部分を引きます。残るのは応力の反対称成分だけです。

<!-- proof-start -->
### 証明

表面力によるトルクの第 $i$ 成分は

$$
\int_{\partial\Omega}
\varepsilon_{ijk}x_j
\sigma_{k\ell}n_\ell\,dS.
$$

[Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)を適用すると

$$
\int_\Omega
\partial_\ell
\left(
\varepsilon_{ijk}x_j\sigma_{k\ell}
\right)dV.
$$

積の微分則から

$$
\partial_\ell
\left(
\varepsilon_{ijk}x_j\sigma_{k\ell}
\right)
=
\varepsilon_{ijk}\sigma_{kj}
+
\varepsilon_{ijk}x_j
\partial_\ell\sigma_{k\ell}.
$$

第二項は $x\times\operatorname{div}\sigma$ の第 $i$ 成分です。角運動量保存から、線形運動量収支に $x\times$ を作用させた式を差し引くと、体積力と加速度に対応する項は相殺し、

$$
\int_\Omega
\varepsilon_{ijk}\sigma_{kj}\,dV
=
0
$$

が任意の十分小さい $\Omega$ で成り立ちます。従って局所化により

$$
\varepsilon_{ijk}\sigma_{kj}=0.
$$

例えば $i=1$ なら

$$
\sigma_{32}-\sigma_{23}=0.
$$

$i=2,3$ でも同様に

$$
\sigma_{13}=\sigma_{31},
\qquad
\sigma_{21}=\sigma_{12}.
$$

従って

$$
\sigma=\sigma^T.
$$
<!-- proof-end -->

偶力応力を持つ Cosserat 連続体などではこの議論の前提が変わります。本章では古典 Cauchy 連続体だけを扱います。

---

## 8. Newton 流体から Navier--Stokes の形へ

流体の運動量式を閉じるには、応力 $\sigma$ が速度場からどう決まるかという **構成則**が必要です。

<a id="def-vc9-newtonian-stress"></a>

<!-- formal-statement-start -->
> **定義（変形速度テンソルと Newton 流体の応力）**  
> 速度場 $u$ に対し
>
$$
D(u)
:=
\frac12
\left(
\nabla u+(\nabla u)^T
\right)
$$
>
> を **変形速度テンソル**と呼ぶ。
>
> 定数 $\mu\ge0$、$\lambda\in\mathbb R$ を用いて
>
$$
\boxed{
\sigma
=
-pI
+
2\mu D(u)
+
\lambda(\operatorname{div}u)I
}
$$
>
> と表される流体を、本章では **Newton 流体**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc9-newtonian-stress -->
**定義の確認：単純せん断**

$$
u=(\gamma y,0,0)
$$

とします。このとき

$$
\nabla u
=
\begin{pmatrix}
0&\gamma&0\\
0&0&0\\
0&0&0
\end{pmatrix},
$$

したがって

$$
D(u)
=
\frac12
\begin{pmatrix}
0&\gamma&0\\
\gamma&0&0\\
0&0&0
\end{pmatrix}.
$$

また

$$
\operatorname{div}u=0.
$$

従って

$$
\sigma
=
\begin{pmatrix}
-p&\mu\gamma&0\\
\mu\gamma&-p&0\\
0&0&-p
\end{pmatrix}.
$$

速度勾配 $\gamma$ に比例するせん断応力 $\mu\gamma$ が現れます。
<!-- definition-example-end -->

<a id="prop-vc9-incompressible-navier-stokes"></a>

<!-- formal-statement-start -->
> **命題（非圧縮 Navier--Stokes 方程式への橋）**  
> 密度 $\rho>0$ と粘性係数 $\mu$ が定数で、
>
$$
\operatorname{div}u=0
$$
>
> とする。Newton 流体の局所運動量収支は
>
$$
\boxed{
\rho
\left(
\partial_tu+(u\cdot\nabla)u
\right)
=
-\nabla p
+
\mu\Delta u
+
\rho b
}
$$
>
> となる。
<!-- formal-statement-end -->

### 証明の核心

非圧縮条件により Newton 応力は

$$
\sigma=-pI+2\mu D(u)
$$

です。

まず

$$
\operatorname{div}(-pI)
=
-\nabla p.
$$

次に成分で

$$
[2\mu\operatorname{div}D(u)]_i
=
\mu\partial_j
\left(
\partial_ju_i+\partial_iu_j
\right).
$$

$\mu$ は定数なので

$$
[2\mu\operatorname{div}D(u)]_i
=
\mu\Delta u_i
+
\mu\partial_i(\operatorname{div}u).
$$

非圧縮条件から第二項は 0 で、

$$
\operatorname{div}\sigma
=
-\nabla p+\mu\Delta u.
$$

これを [局所運動量収支](#thm-vc9-momentum-local)へ代入すれば結論を得ます。

本章ではここまでです。Navier--Stokes 方程式の弱解、存在・一意性、正則性、乱流は後続の PDE 系列の問題であり、ベクトル解析の章へ逆輸入しません。

---

## 9. Maxwell 方程式：積分形を先に読む

ここから電磁気へ移ります。真空中の SI 単位系を用い、

- $E$：電場
- $B$：磁束密度
- $\rho_e$：電荷密度
- $j$：電流密度
- $\varepsilon_0$：真空の誘電率
- $\mu_0$：真空の透磁率

とします。

<a id="principle-vc9-maxwell-integral"></a>

<!-- formal-statement-start -->
> **原理（Maxwell 方程式の積分形）**  
> 十分滑らかな電磁場について、任意の固定された適切な体積 $\Omega$ と、任意の固定された向き付けられた曲面 $S$ に対し
>
> **Gauss の法則**
>
$$
\boxed{
\int_{\partial\Omega}E\cdot n\,dS
=
\frac1{\varepsilon_0}
\int_\Omega\rho_e\,dV
}
$$
>
> **磁束に対する Gauss の法則**
>
$$
\boxed{
\int_{\partial\Omega}B\cdot n\,dS
=
0
}
$$
>
> **Faraday の法則**
>
$$
\boxed{
\oint_{\partial S}E\cdot dr
=
-
\frac{d}{dt}
\int_SB\cdot n\,dS
}
$$
>
> **Ampère--Maxwell の法則**
>
$$
\boxed{
\oint_{\partial S}B\cdot dr
=
\mu_0\int_Sj\cdot n\,dS
+
\mu_0\varepsilon_0
\frac{d}{dt}
\int_SE\cdot n\,dS
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

ここでは Maxwell 方程式を電磁気学の物理原理として置いています。ベクトル解析が行う仕事は、積分形と局所的な微分形の間をつなぐことです。

Faraday の式では、$S$ の向きと $\partial S$ の向きは [VC5 の誘導境界向き](../VC5/index.md#def-vc5-boundary-orientation)に従います。$S$ は固定されているので、十分な時間正則性の下で

$$
\frac{d}{dt}
\int_SB\cdot n\,dS
=
\int_S\partial_tB\cdot n\,dS
$$

とできます。

---

## 10. Maxwell の積分形と微分形は同じ局所法則

<a id="thm-vc9-maxwell-differential"></a>

<!-- formal-statement-start -->
> **定理（Maxwell 方程式の積分形と微分形）**  
> $E,B$ は空間変数について $C^1$ 級、時間について必要な一階微分を持ち、$\rho_e,j$ は連続とする。
>
> Maxwell 方程式の積分形が任意の十分小さい体積・曲面について成り立つことと、
>
$$
\boxed{
\operatorname{div}E
=
\frac{\rho_e}{\varepsilon_0}
}
$$
>
$$
\boxed{
\operatorname{div}B=0
}
$$
>
$$
\boxed{
\nabla\times E
=
-\partial_tB
}
$$
>
$$
\boxed{
\nabla\times B
=
\mu_0j
+
\mu_0\varepsilon_0\partial_tE
}
$$
>
> が各点で成り立つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

閉曲面を含む二本は Gauss--Ostrogradsky の発散定理、境界曲線を含む二本は Kelvin--Stokes の定理で体積・面積積分へ変えます。「任意の小領域で積分が 0」なら被積分関数自身が 0 です。

<!-- proof-start -->
### 証明

Gauss の法則へ [VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)を使うと

$$
\int_\Omega
\left(
\operatorname{div}E
-
\frac{\rho_e}{\varepsilon_0}
\right)dV
=
0.
$$

これが任意の十分小さい $\Omega$ で成り立つので、VC4 の局所化と同じ議論から

$$
\operatorname{div}E
=
\frac{\rho_e}{\varepsilon_0}.
$$

同様に磁束に対する Gauss の法則から

$$
\operatorname{div}B=0.
$$

次に Faraday の法則へ [VC5 の Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)を使うと

$$
\int_S
(\nabla\times E)\cdot n\,dS
=
-
\int_S
\partial_tB\cdot n\,dS.
$$

従って

$$
\int_S
\left(
\nabla\times E+\partial_tB
\right)\cdot n\,dS
=
0.
$$

任意の十分小さい向き付けられた面に対して成り立つので

$$
\nabla\times E
=
-\partial_tB.
$$

Ampère--Maxwell の法則も同様に

$$
\int_S
\left(
\nabla\times B
-
\mu_0j
-
\mu_0\varepsilon_0\partial_tE
\right)\cdot n\,dS
=
0
$$

から

$$
\nabla\times B
=
\mu_0j
+
\mu_0\varepsilon_0\partial_tE.
$$

逆向きは、四本の微分形をそれぞれ体積・曲面上で積分し、Gauss--Ostrogradsky と Kelvin--Stokes の各定理を適用すれば積分形へ戻ります。
<!-- proof-end -->

四本の式は二種類に分かれています。

- 発散の式は **源がどれだけあるか**を測る。
- 回転の式は **循環が何によって生じるか**を測る。

VC1 から積み上げてきた発散と回転が、そのまま電磁気の局所法則になっています。

---

## 11. Ampère--Maxwell の補正項は電荷保存と整合する

Maxwell 方程式の四本は独立にばらばらな式ではありません。発散と回転の恒等式を通じて、電荷保存を含んでいます。

<a id="thm-vc9-charge-conservation"></a>

<!-- formal-statement-start -->
> **定理（Maxwell 方程式から電荷保存）**  
> 十分滑らかな Maxwell 方程式の解は
>
$$
\boxed{
\partial_t\rho_e
+
\operatorname{div}j
=
0
}
$$
>
> を満たす。
>
> 従って固定領域 $\Omega$ では
>
$$
\boxed{
\frac{d}{dt}
\int_\Omega\rho_e\,dV
=
-
\int_{\partial\Omega}j\cdot n\,dS
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Ampère--Maxwell の式の両辺へ発散を取ります。左辺は「回転の発散は 0」で消えます。右辺の電場の発散を Gauss の法則で電荷密度へ置き換えると、連続の式が残ります。

<!-- proof-start -->
### 証明

Ampère--Maxwell の微分形

$$
\nabla\times B
=
\mu_0j
+
\mu_0\varepsilon_0\partial_tE
$$

の発散を取ります。

[VC1 の「回転の発散は 0」](../VC1/index.md#thm-vc1-div-curl)から

$$
0
=
\mu_0\operatorname{div}j
+
\mu_0\varepsilon_0
\partial_t(\operatorname{div}E).
$$

Gauss の法則

$$
\operatorname{div}E
=
\frac{\rho_e}{\varepsilon_0}
$$

を代入すると

$$
0
=
\mu_0\operatorname{div}j
+
\mu_0\partial_t\rho_e.
$$

$\mu_0\ne0$ なので

$$
\partial_t\rho_e+\operatorname{div}j=0.
$$

さらに [VC4 の局所保存則から積分保存則](../VC4/index.md#thm-vc4-local-to-integral)を $q=\rho_e$、$J=j$、$s=0$ に適用すれば

$$
\frac{d}{dt}
\int_\Omega\rho_e\,dV
=
-
\int_{\partial\Omega}j\cdot n\,dS.
$$
<!-- proof-end -->

もし Ampère の法則を

$$
\nabla\times B=\mu_0j
$$

だけにして時間変化する電場の項を削ると、発散を取った結果は

$$
\operatorname{div}j=0
$$

を強制してしまい、一般の時間依存する電荷密度と整合しません。

$\mu_0\varepsilon_0\partial_tE$ という Maxwell の補正項は、電荷保存との整合性を回復する構造になっています。

---

## 12. 界面条件は薄い箱と細い長方形から出る

異なる領域の境界では、場そのものが不連続になる場合があります。積分形は、その跳び方を直接制約します。

界面の単位法線 $n$ を媒質 1 から媒質 2 へ向けて取ります。界面上の表面電荷密度を $\sigma_s$、表面電流密度を $K$ とします。

<a id="prop-vc9-maxwell-interface"></a>

<!-- formal-statement-start -->
> **命題（真空 Maxwell 方程式の界面跳躍条件）**  
> 界面の両側で $E,B$ が区分的に滑らかで、界面以外では通常の Maxwell 方程式を満たすとする。界面に表面電荷 $\sigma_s$ と接線方向の表面電流 $K$ があり、薄い箱・細い長方形を潰す極限で通常の面積項が消えるだけの有界性を仮定する。
>
> このとき
>
$$
\boxed{
n\cdot(E_2-E_1)
=
\frac{\sigma_s}{\varepsilon_0}
}
$$
>
$$
\boxed{
n\cdot(B_2-B_1)=0
}
$$
>
$$
\boxed{
n\times(E_2-E_1)=0
}
$$
>
$$
\boxed{
n\times(B_2-B_1)
=
\mu_0K
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

法線成分には界面をまたぐ薄い円柱状の箱を使い、Gauss 型の二式を適用します。接線成分には界面をまたぐ細い長方形のループを使い、Faraday と Ampère--Maxwell の二式を適用します。

<!-- proof-start -->
### 証明

まず底面積 $A$、厚さ $2h$ の薄い箱を界面にまたがせます。$h\to0$ とすると側面流束は 0 へ行き、上下面だけが残ります。

電場について Gauss の法則を使うと

$$
A\,E_2\cdot n
-
A\,E_1\cdot n
=
\frac{\sigma_sA}{\varepsilon_0}.
$$

$A$ で割って

$$
n\cdot(E_2-E_1)
=
\frac{\sigma_s}{\varepsilon_0}.
$$

磁場について同じ箱を使えば右辺は 0 なので

$$
n\cdot(B_2-B_1)=0.
$$

次に、接線方向の単位ベクトル $\tau$ と法線 $n$ が張る細い長方形を考えます。界面に平行な辺の長さを $L$、法線方向の幅を $2h$ とし、$h\to0$ とします。

Faraday の法則では、磁束を通る面積が $2hL$ なので、$\partial_tB$ が有界なら右辺は 0 へ行きます。線積分の主要項だけが残り、

$$
L(E_2-E_1)\cdot\tau=0.
$$

任意の接線 $\tau$ について成立するので

$$
n\times(E_2-E_1)=0.
$$

Ampère--Maxwell の法則では、変位電流の面積項は同様に 0 へ行きます。一方、界面に集中する表面電流は細い長方形を横切って $K$ の寄与を残します。その結果

$$
L(B_2-B_1)\cdot\tau
=
\mu_0L\,K\cdot(n\times\tau)
$$

となります。任意の接線 $\tau$ について整理すると

$$
n\times(B_2-B_1)=\mu_0K.
$$
<!-- proof-end -->

ここでは真空中の $E,B$ を使いました。誘電体・磁性体で $D,H$ を導入する構成則、分極・磁化、分布としての表面源は電磁気学側の後続内容です。

---

## 13. 三つの物理分野を同じ図式で読む

ここまでの式を並べると、ベクトル解析が担う共通構造が見えます。

### 質量

$$
\partial_t\rho+\operatorname{div}(\rho u)=0
$$

発散が、境界を通る質量流出と局所密度変化を結びます。

### 運動量

$$
\partial_t(\rho u)
+
\operatorname{div}(\rho u\otimes u)
=
\operatorname{div}\sigma+\rho b
$$

ベクトル量の輸送は二階テンソルの発散として現れ、表面力も応力テンソルの発散へ移されます。

### 電荷

$$
\partial_t\rho_e+\operatorname{div}j=0
$$

質量保存と全く同じ保存則の骨格です。

### 電磁場

$$
\operatorname{div}E
=
\frac{\rho_e}{\varepsilon_0},
\qquad
\operatorname{div}B=0,
$$

$$
\nabla\times E=-\partial_tB,
\qquad
\nabla\times B
=
\mu_0j+\mu_0\varepsilon_0\partial_tE.
$$

発散が源と流束を、回転が循環と時間変化を結びます。

つまり VC1--VC8 の各道具は別々の技巧ではありません。

$$
\boxed{
\text{局所微分}
\longleftrightarrow
\text{積分定理}
\longleftrightarrow
\text{大域的な収支・循環}
}
$$

という一つの辞書です。

---

## 14. 本章と系列の停止線

本章では、ベクトル解析の道具が後続理論へ入る入口までを扱いました。

ここから先は別系列です。

- 移動・変形する検査体積に対する Reynolds 輸送定理
- 圧縮性流体の熱力学とエネルギー保存
- Navier--Stokes の弱解・存在・一意性・正則性
- Euler 方程式の渦度輸送・Kelvin 循環定理
- 境界層・乱流
- Maxwell 方程式からの電磁波方程式
- 時間依存する電磁ポテンシャルと Lorenz ゲージ
- 誘電体・磁性体の構成則
- 相対論的な四元テンソル形式
- 微分形式による一般 Stokes の定理

これらを VC9 に詰め込むと、ベクトル解析と後続の物理理論の正本が混ざります。

VC9 の役割は、**後続理論で現れる式を見たとき、どのベクトル解析の構造が働いているかを読める状態にすること**です。

---

## 15. 演習

#### VC9-A01 膨張流と質量保存
- Level: A
- 目安時間: 18分

定数 $\alpha,\rho_0>0$ に対し

$$
u=\frac{\alpha}{3}(x,y,z),
\qquad
\rho=\rho_0e^{-\alpha t}
$$

とする。

1. $\operatorname{div}u$ を求めよ。
2. $\partial_t\rho+\operatorname{div}(\rho u)=0$ を確認せよ。
3. $D\rho/Dt+\rho\operatorname{div}u=0$ も直接確認せよ。
4. $\alpha\ne0$ のとき、この流れが非圧縮でない理由を述べよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\operatorname{div}u
=
\frac{\alpha}{3}
+
\frac{\alpha}{3}
+
\frac{\alpha}{3}
=
\boxed{\alpha}.
$$

2. $\rho$ は空間変数に依存しないので

$$
\partial_t\rho
=
-\alpha\rho.
$$

また

$$
\operatorname{div}(\rho u)
=
\rho\operatorname{div}u
=
\alpha\rho.
$$

従って

$$
\boxed{
\partial_t\rho+\operatorname{div}(\rho u)=0
}.
$$

3.

$$
\nabla\rho=0
$$

なので

$$
\frac{D\rho}{Dt}
=
\partial_t\rho+u\cdot\nabla\rho
=
-\alpha\rho.
$$

従って

$$
\frac{D\rho}{Dt}
+
\rho\operatorname{div}u
=
-\alpha\rho+\alpha\rho
=
\boxed{0}.
$$

4. 非圧縮条件は

$$
\operatorname{div}u=0
$$

です。しかし 1 より

$$
\operatorname{div}u=\alpha.
$$

従って $\alpha\ne0$ なら非圧縮ではありません。$\alpha>0$ なら体積が局所的に膨張し、その分だけ密度が低下しています。
<!-- solution-end -->

#### VC9-A02 剛体回転での物質微分
- Level: A
- 目安時間: 15分

$$
u=(-y,x,0),
\qquad
f=x^2+y^2
$$

とする。

1. $\partial_t f$ と $\nabla f$ を求めよ。
2. $Df/Dt$ を求めよ。
3. 結果の幾何的意味を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $f$ は時間に依存しないので

$$
\partial_t f=0.
$$

また

$$
\nabla f=(2x,2y,0).
$$

2.

$$
u\cdot\nabla f
=
(-y)(2x)+x(2y)
=
0.
$$

従って

$$
\boxed{
\frac{Df}{Dt}=0
}.
$$

3. $f=x^2+y^2$ は原点からの距離の二乗です。速度場 $u=(-y,x,0)$ は円周方向なので、粒子は原点からの距離を変えずに回転します。そのため粒子に沿った $f$ の変化率が 0 になります。
<!-- solution-end -->

#### VC9-A03 流れ関数と渦度
- Level: A
- 目安時間: 20分

$$
\psi=x^2y
$$

とし、

$$
u_1=\psi_y,
\qquad
u_2=-\psi_x
$$

で速度場を定める。

1. $u=(u_1,u_2,0)$ を求めよ。
2. $\operatorname{div}u=0$ を確認せよ。
3. 渦度の $z$ 成分 $\omega_3$ を求めよ。
4. $\omega_3=-\Delta\psi$ を直接確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
u_1
=
\partial_y(x^2y)
=
x^2,
$$

$$
u_2
=
-\partial_x(x^2y)
=
-2xy.
$$

従って

$$
\boxed{
u=(x^2,-2xy,0)
}.
$$

2.

$$
\operatorname{div}u
=
\partial_x(x^2)
+
\partial_y(-2xy)
=
2x-2x
=
\boxed{0}.
$$

3.

$$
\omega_3
=
\partial_xu_2-\partial_yu_1
=
\partial_x(-2xy)-\partial_y(x^2)
=
-2y.
$$

従って

$$
\boxed{\omega_3=-2y}.
$$

4.

$$
\Delta\psi
=
\partial_{xx}(x^2y)
+
\partial_{yy}(x^2y)
=
2y+0
=
2y.
$$

よって

$$
-\Delta\psi=-2y=\omega_3.
$$
<!-- solution-end -->

#### VC9-A04 Faraday の法則を円板で確認する
- Level: A
- 目安時間: 22分

定数 $\beta>0$ とし、

$$
E=
\left(
-\frac{\beta y}{2},
\frac{\beta x}{2},
0
\right),
$$

$$
B(t)
=
(0,0,B_0-\beta t)
$$

とする。$xy$ 平面上の半径 $R$ の円板 $S_R$ を上向きに向き付ける。

1. $\nabla\times E$ を求め、Faraday の微分形を確認せよ。
2. $\partial S_R$ に沿う $E$ の循環を求めよ。
3. $S_R$ を通る磁束の時間微分を求め、Faraday の積分形を確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla\times E
=
\left(
0,0,
\partial_x\frac{\beta x}{2}
-
\partial_y\left(-\frac{\beta y}{2}\right)
\right)
=
(0,0,\beta).
$$

一方

$$
-\partial_tB
=
-(0,0,-\beta)
=
(0,0,\beta).
$$

従って

$$
\boxed{
\nabla\times E=-\partial_tB
}.
$$

2. [Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)から

$$
\oint_{\partial S_R}E\cdot dr
=
\int_{S_R}
(\nabla\times E)\cdot e_z\,dS.
$$

被積分関数は $\beta$ なので

$$
\oint_{\partial S_R}E\cdot dr
=
\beta\pi R^2.
$$

従って

$$
\boxed{
\oint_{\partial S_R}E\cdot dr
=
\beta\pi R^2
}.
$$

3. 磁束は

$$
\Phi_B(t)
=
\int_{S_R}B\cdot e_z\,dS
=
(B_0-\beta t)\pi R^2.
$$

従って

$$
-\frac{d\Phi_B}{dt}
=
\beta\pi R^2.
$$

これは 2 の循環と一致するので

$$
\boxed{
\oint_{\partial S_R}E\cdot dr
=
-\frac{d}{dt}
\int_{S_R}B\cdot n\,dS
}
$$

を確認できました。
<!-- solution-end -->

#### VC9-B01 剛体回転の流れ関数・渦度・循環
- Level: B
- 目安時間: 28分

$$
u=(-\Omega y,\Omega x,0)
$$

とする。

1. 流れ関数 $\psi$ を一つ求めよ。
2. 渦度 $\omega$ を求めよ。
3. 半径 $R$ の円周 $C_R$ に沿う循環を直接求めよ。
4. Kelvin--Stokes の定理で 3 と同じ結果を得よ。

<!-- solution-start -->
### 詳細解答

1. 流れ関数は

$$
u_1=\psi_y=-\Omega y,
\qquad
u_2=-\psi_x=\Omega x
$$

を満たせばよいので

$$
\boxed{
\psi
=
-\frac{\Omega}{2}(x^2+y^2)
}
$$

と取れます。

2.

$$
\omega
=
\nabla\times u
=
\boxed{(0,0,2\Omega)}.
$$

3. 円周上で

$$
x=R\cos\theta,
\qquad
y=R\sin\theta,
$$

$$
dr
=
(-R\sin\theta,R\cos\theta,0)d\theta.
$$

また

$$
u
=
(-\Omega R\sin\theta,\Omega R\cos\theta,0).
$$

従って

$$
u\cdot dr
=
\Omega R^2d\theta.
$$

よって

$$
\oint_{C_R}u\cdot dr
=
\int_0^{2\pi}\Omega R^2d\theta
=
\boxed{
2\pi\Omega R^2
}.
$$

4. 円板 $S_R$ で

$$
\omega\cdot e_z
=
2\Omega.
$$

したがって [Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)から

$$
\oint_{C_R}u\cdot dr
=
\int_{S_R}2\Omega\,dS
=
2\Omega\pi R^2.
$$

3 と一致します。
<!-- solution-end -->

#### VC9-B02 単純せん断の応力と運動量収支
- Level: B
- 目安時間: 32分

一定密度 $\rho>0$、一定粘性係数 $\mu>0$ の非圧縮 Newton 流体で

$$
u=(\gamma y,0,0),
\qquad
p=p_0,
\qquad
b=0
$$

とする。

1. $\operatorname{div}u=0$ を確認せよ。
2. $D(u)$ と $\sigma$ を求めよ。
3. 法線 $n=e_2$ の面に働く表面力 $\sigma n$ を求めよ。
4. $(u\cdot\nabla)u$ と $\Delta u$ を求め、定常 Navier--Stokes 方程式を満たすことを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\operatorname{div}u
=
\partial_x(\gamma y)
=
0.
$$

従って非圧縮です。

2.

$$
\nabla u
=
\begin{pmatrix}
0&\gamma&0\\
0&0&0\\
0&0&0
\end{pmatrix},
$$

したがって

$$
D(u)
=
\frac12
\begin{pmatrix}
0&\gamma&0\\
\gamma&0&0\\
0&0&0
\end{pmatrix}.
$$

非圧縮なので

$$
\sigma
=
-p_0I+2\mu D(u)
$$

より

$$
\boxed{
\sigma
=
\begin{pmatrix}
-p_0&\mu\gamma&0\\
\mu\gamma&-p_0&0\\
0&0&-p_0
\end{pmatrix}
}.
$$

3.

$$
\sigma e_2
=
\boxed{
(\mu\gamma,-p_0,0)^T
}.
$$

法線方向の圧力 $-p_0$ に加え、$x$ 方向のせん断力 $\mu\gamma$ が働きます。

4. $u$ は $y$ にしか依存せず、$u_2=0$ なので

$$
(u\cdot\nabla)u
=
(\gamma y)\partial_xu
=
0.
$$

また $u$ は $y$ の一次関数なので

$$
\Delta u=0.
$$

$p$ も定数なので

$$
-\nabla p+\mu\Delta u=0.
$$

従って定常 Navier--Stokes 方程式

$$
\rho(u\cdot\nabla)u
=
-\nabla p+\mu\Delta u
$$

の両辺は 0 です。
<!-- solution-end -->

#### VC9-B03 Maxwell 方程式から電荷保存を再構成する
- Level: B
- 目安時間: 30分

1. Ampère--Maxwell の微分形と Gauss の法則から
   $$
   \partial_t\rho_e+\operatorname{div}j=0
   $$
   を導け。
2. 固定領域 $\Omega$ に対する積分保存則を導け。
3.
   $$
   \rho_e=e^{-t},
   \qquad
   j=\frac{e^{-t}}{3}(x,y,z)
   $$
   が電荷保存の連続の式を満たすことを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\nabla\times B
=
\mu_0j
+
\mu_0\varepsilon_0\partial_tE
$$

の発散を取ります。

$$
\operatorname{div}(\nabla\times B)=0
$$

なので

$$
0
=
\mu_0\operatorname{div}j
+
\mu_0\varepsilon_0
\partial_t(\operatorname{div}E).
$$

Gauss の法則

$$
\operatorname{div}E
=
\frac{\rho_e}{\varepsilon_0}
$$

を使うと

$$
0
=
\mu_0
\left(
\operatorname{div}j+\partial_t\rho_e
\right).
$$

よって

$$
\boxed{
\partial_t\rho_e+\operatorname{div}j=0
}.
$$

2. VC4 の積分保存則から

$$
\boxed{
\frac{d}{dt}
\int_\Omega\rho_e\,dV
=
-
\int_{\partial\Omega}j\cdot n\,dS
}.
$$

3.

$$
\partial_t\rho_e
=
-e^{-t}.
$$

一方

$$
\operatorname{div}j
=
\frac{e^{-t}}{3}
\operatorname{div}(x,y,z)
=
\frac{e^{-t}}{3}\cdot3
=
e^{-t}.
$$

従って

$$
\partial_t\rho_e+\operatorname{div}j
=
-e^{-t}+e^{-t}
=
\boxed{0}.
$$

この確認は電荷保存との整合性を示すものであり、この $\rho_e,j$ だけから電磁場 $E,B$ 全体を構成したという意味ではありません。
<!-- solution-end -->

#### VC9-C01 剛体回転流をベクトル解析で統合する
- Level: C
- 目安時間: 50分

一定密度 $\rho_0>0$、一定粘性係数 $\mu>0$ の流体について

$$
u=(-\Omega y,\Omega x,0),
\qquad
b=0
$$

とする。

1. 非圧縮条件を確認せよ。
2. 流れ関数を一つ求めよ。
3. 渦度を求めよ。
4. 半径 $R$ の円周で循環を求め、Kelvin--Stokes の定理で照合せよ。
5. $(u\cdot\nabla)u$ を求めよ。
6. $\Delta u$ を求めよ。
7. 定常非圧縮 Navier--Stokes 方程式を満たす圧力 $p(x,y)$ を求めよ。
8. 得られた圧力勾配が何を支えているか説明せよ。

<!-- solution-start -->
### 詳細解答

1.

$$
\operatorname{div}u
=
\partial_x(-\Omega y)
+
\partial_y(\Omega x)
=
0.
$$

従って

$$
\boxed{\operatorname{div}u=0}.
$$

2.

$$
u_1=\psi_y=-\Omega y,
\qquad
u_2=-\psi_x=\Omega x
$$

なので

$$
\boxed{
\psi
=
-\frac{\Omega}{2}(x^2+y^2)
}
$$

と取れます。

3.

$$
\omega
=
\nabla\times u
=
\boxed{(0,0,2\Omega)}.
$$

4. 円周を

$$
r(\theta)
=
(R\cos\theta,R\sin\theta,0)
$$

とおくと

$$
r'(\theta)
=
(-R\sin\theta,R\cos\theta,0),
$$

$$
u(r(\theta))
=
(-\Omega R\sin\theta,\Omega R\cos\theta,0).
$$

従って

$$
u\cdot r'
=
\Omega R^2.
$$

よって

$$
\oint_{C_R}u\cdot dr
=
\int_0^{2\pi}\Omega R^2\,d\theta
=
\boxed{2\pi\Omega R^2}.
$$

一方、円板上で

$$
\omega\cdot e_z=2\Omega
$$

なので

$$
\int_{S_R}\omega\cdot e_z\,dS
=
2\Omega\pi R^2,
$$

一致します。

5. 成分ごとに

$$
(u\cdot\nabla)u_1
=
(-\Omega y)\partial_x(-\Omega y)
+
(\Omega x)\partial_y(-\Omega y)
$$

$$
=
0-\Omega^2x
=
-\Omega^2x.
$$

同様に

$$
(u\cdot\nabla)u_2
=
(-\Omega y)\partial_x(\Omega x)
+
(\Omega x)\partial_y(\Omega x)
$$

$$
=
-\Omega^2y+0
=
-\Omega^2y.
$$

従って

$$
\boxed{
(u\cdot\nabla)u
=
(-\Omega^2x,-\Omega^2y,0)
}.
$$

6. $u$ は $x,y$ の一次関数なので

$$
\boxed{
\Delta u=0
}.
$$

7. 定常 Navier--Stokes 方程式は

$$
\rho_0(u\cdot\nabla)u
=
-\nabla p+\mu\Delta u.
$$

6 より粘性項は 0 なので

$$
-\nabla p
=
\rho_0
(-\Omega^2x,-\Omega^2y,0).
$$

従って

$$
\nabla p
=
\rho_0\Omega^2(x,y,0).
$$

積分して

$$
\boxed{
p(x,y)
=
p_0
+
\frac{\rho_0\Omega^2}{2}
(x^2+y^2)
}
$$

です。

8. 剛体回転する粒子には中心向きの加速度

$$
(-\Omega^2x,-\Omega^2y,0)
$$

が必要です。外側ほど圧力を高くすることで、圧力勾配による力 $-\nabla p$ が内向きとなり、この向心加速度を支えています。
<!-- solution-end -->

---

## 16. まとめ

VC9 で新しく得た式を個別に暗記するより、どの積分定理がどこで働くかを押さえることが重要です。

- 質量保存は VC4 の一般保存則を $J=\rho u$ へ特殊化した連続の式になる。
- 物質微分は固定点の時間変化と移流による空間変化を合成する。
- 非圧縮条件は $\operatorname{div}u=0$ であり、生成項なしの質量保存と組み合わせると $D\rho/Dt=0$ になる。
- 渦度 $\omega=\nabla\times u$ は局所循環密度であり、Kelvin--Stokes の定理で循環へ積分される。
- 二次元非圧縮流では流れ関数が存在し、$\omega_3=-\Delta\psi$ が成り立つ。
- 運動量輸送は $\rho u\otimes u$、表面力は $\sigma n$、局所表面力密度は $\operatorname{div}\sigma$ で表される。
- 角運動量保存を加えると、古典連続体の応力テンソルは対称になる。
- Newton 流体の構成則を運動量収支へ入れると、非圧縮 Navier--Stokes 方程式の標準形が得られる。
- Maxwell 方程式の積分形と微分形は Gauss--Ostrogradsky と Kelvin--Stokes の定理で相互に移る。
- Maxwell 方程式から電荷保存の連続の式が必然的に従う。
- 界面跳躍条件は、積分形を薄い箱・細いループへ適用することで得られる。

これで VC1--VC9 は、ユークリッド空間の局所微分から積分定理、ポテンシャル、テンソル、保存則、流体・電磁気への橋までを一つの標準ベクトル解析系列として閉じます。
