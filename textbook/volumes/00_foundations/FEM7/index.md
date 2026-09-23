# FEM7 移流拡散・安定化有限要素法

<!-- definition-example-audit: strict -->

FDM4 では、一次元の移流拡散問題に対して中心差分が移流卓越時に振動し、風上差分が数値拡散を加えることで単調性を回復することを見ました。

有限要素法でも、まったく同じ問題が現れます。

Poisson 方程式では、適合 Galerkin 法は Céa の補題により自然に安定でした。しかし移流拡散方程式

$$
-\varepsilon \Delta u+\boldsymbol b\cdot\nabla u=f
$$

では、拡散係数 $\varepsilon$ が小さいと解に薄い境界層が生じます。メッシュがその層を解像できないまま標準 Galerkin 法を使うと、節点値が交互に振動することがあります。

本章の狙いは、これを「有限要素法だから特殊」と扱うことではありません。

$$
\boxed{
\text{移流卓越}
\to
\text{標準 Galerkin の中心型離散化}
\to
\text{非物理振動}
\to
\text{流線方向へ安定化}
}
$$

という機構を、FDM4 と同じ一次元模型から再構成します。

最後に、強形式残差を用いる流線方向安定化を定式化し、

- 強形式の残差を用いるので整合性を壊さないこと
- 一次要素では流線方向の人工拡散として読めること
- 一次元一様格子で $\tau=h/(2b)$ とすると風上差分と完全に一致すること
- より精密な $\tau$ の選択では一次元指数解を節点上で正確に再現できること

まで示します。

> **この章の停止線**
>
> 本章は線形定常移流拡散問題と残差型の流線方向安定化の基本機構に集中します。非線形移流、Navier--Stokes、DG 法、CIP 法、衝撃捕獲法（shock-capturing）、流線直交方向拡散（crosswind diffusion）、層適合メッシュの本格的誤差解析は扱いません。

---

## 0. 設定：定常移流拡散問題

$\Omega\subset\mathbb R^d$ を有界 Lipschitz 領域とし、

$$
V=H_0^1(\Omega)
$$

とします。

定数拡散係数 $\varepsilon>0$、十分滑らかな移流場 $\boldsymbol b$ を用いて

$$
\boxed{
-\varepsilon\Delta u
+
\boldsymbol b\cdot\nabla u
=
f
\qquad
\text{in }\Omega,
\qquad
u=0
\qquad
\text{on }\partial\Omega
}
$$

を考えます。

まず反応項を入れない模型に固定します。移流卓越と SUPG の機構を最も透明に見るためです。

弱形式は

$$
a(u,v)=\ell(v)
\qquad
(\forall v\in V),
$$

ただし

$$
a(w,v)
=
\varepsilon(\nabla w,\nabla v)_{L^2}
+
(\boldsymbol b\cdot\nabla w,v)_{L^2},
$$

$$
\ell(v)
=
(f,v)_{L^2}
$$

です。

$\nabla\cdot\boldsymbol b=0$ とし、$v\in H_0^1(\Omega)$ なら

$$
(\boldsymbol b\cdot\nabla v,v)
=
\frac12
\int_\Omega
\boldsymbol b\cdot\nabla(v^2)\,dx
=
0
$$

です。

従って

$$
a(v,v)
=
\varepsilon
\|\nabla v\|_{L^2}^2.
$$

連続問題はこの意味で強圧的です。しかし強圧性定数は $\varepsilon$ です。

$\varepsilon\to0$ では、この評価だけでは離散解の細かな振動を十分に制御できません。

---

## 1. メッシュは境界層を解像しているか

FDM4 では格子 Péclet 数

$$
Pe_h
=
\frac{|b|h}{2\varepsilon}
$$

が中心差分の振動を支配しました。

有限要素法では要素ごとに同じ尺度を使います。

<a id="def-fem7-element-peclet"></a>

<!-- formal-statement-start -->
### 定義（要素 Péclet 数）

$\varepsilon>0$、$\boldsymbol b\in L^\infty(\Omega)^d$ とする。

要素 $K$ の代表長さを $h_K$ とするとき、

$$
\boxed{
Pe_K
=
\frac{\|\boldsymbol b\|_{L^\infty(K)} h_K}{2\varepsilon}
}
$$

を要素 $K$ の Péclet 数と呼ぶ。
<!-- formal-statement-end -->

$Pe_K$ は

- 分子：要素を一つ進む移流の強さ
- 分母：同じ要素幅で平滑化する拡散の強さ

の比です。

おおまかには

$$
Pe_K\ll1
$$

なら拡散優勢、

$$
Pe_K\gg1
$$

なら移流卓越です。

<!-- definition-example-start: def-fem7-element-peclet -->
**定義の確認**

### 例：同じ PDE でもメッシュ幅で支配領域が変わる

一次元で

$$
b=1,
\qquad
\varepsilon=0.01
$$

とします。

$h=0.1$ なら

$$
Pe_h
=
\frac{1\cdot0.1}{2\cdot0.01}
=
5.
$$

かなり移流卓越です。

一方、同じ PDE でも $h=0.01$ まで細分すると

$$
Pe_h
=
\frac{1\cdot0.01}{2\cdot0.01}
=
0.5.
$$

つまり Péclet 数は PDE だけの量ではありません。

$$
\boxed{
\text{同じ連続問題でも、メッシュが細かければ離散的には拡散を解像できる}
}
$$

ことを表します。
<!-- definition-example-end -->

---

## 2. 標準 Galerkin 法

$\mathcal T_h$ を適合三角形分割、$V_h\subset H_0^1(\Omega)$ を FEM2 の連続一次有限要素空間とします。

<a id="def-fem7-standard-galerkin"></a>

<!-- formal-statement-start -->
### 定義（移流拡散問題の標準 Galerkin 有限要素法）

$\varepsilon>0$、$\boldsymbol b\in L^\infty(\Omega)^d$、$f\in L^2(\Omega)$ とし、$V_h\subset H_0^1(\Omega)$ を有限要素空間とする。

$$
a(w,v)
=
\varepsilon(\nabla w,\nabla v)_{L^2}
+
(\boldsymbol b\cdot\nabla w,v)_{L^2}
$$

と置く。

$$
\boxed{
a(u_h,v_h)
=
(f,v_h)
\qquad
(\forall v_h\in V_h)
}
$$

を満たす $u_h\in V_h$ を、移流拡散問題の標準 Galerkin 有限要素解とする。
<!-- formal-statement-end -->

試験空間と近似空間が同じなので、FEM1 の適合 Galerkin 法そのものです。

<!-- definition-example-start: def-fem7-standard-galerkin -->
**定義の確認**

### 例：一つの帽子関数を試験すると何が入るか

一次元 $\Omega=(0,1)$、一様格子 $x_i=ih$、定数 $b>0$ とします。

節点 $x_i$ の帽子関数を $\phi_i$ とし、

$$
u_h
=
\sum_jU_j\phi_j
$$

と書きます。

$v_h=\phi_i$ とすると、拡散項は

$$
\varepsilon(u_h',\phi_i')
=
\frac{\varepsilon}{h}
\left(
-U_{i-1}+2U_i-U_{i+1}
\right).
$$

移流項は

$$
b(u_h',\phi_i)
=
\frac b2
\left(
U_{i+1}-U_{i-1}
\right).
$$

したがって標準 Galerkin 法は節点 $i$ で

$$
\boxed{
\frac{\varepsilon}{h}
(-U_{i-1}+2U_i-U_{i+1})
+
\frac b2
(U_{i+1}-U_{i-1})
=
F_i
}
$$

を作ります。

ここですでに、移流項が左右対称な中心型になっていることが見えています。
<!-- definition-example-end -->

---

## 3. 一次元 P1 Galerkin は中心差分と同じ内部方程式を作る

前節の計算を定理としてまとめます。

<a id="thm-fem7-galerkin-centered"></a>

<!-- formal-statement-start -->
### 定理（一次元一次有限要素 Galerkin 法と中心差分の対応）

$\Omega=(0,1)$、$b>0$、$\varepsilon>0$ とし、

$$
-\varepsilon u''+bu'=f,
\qquad
u(0)=u(1)=0
$$

を考える。

一様格子 $x_i=ih$ 上の連続区分一次有限要素空間を $V_h$ とする。

標準 Galerkin 解

$$
u_h=\sum_jU_j\phi_j
$$

は各内部節点 $i$ で

$$
\boxed{
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}
=
\frac{F_i}{h}
}
$$

を満たす。

したがって左辺は FDM4 の中心差分型移流拡散作用素と一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v_h=\phi_i$ と取ります。

帽子関数の微分は

$$
\phi_i'
=
\frac1h
\quad
\text{on }(x_{i-1},x_i),
$$

$$
\phi_i'
=
-\frac1h
\quad
\text{on }(x_i,x_{i+1})
$$

です。

まず拡散項です。

区分一次関数 $u_h$ の微分は

$$
u_h'
=
\frac{U_i-U_{i-1}}h
\quad
\text{on }(x_{i-1},x_i),
$$

$$
u_h'
=
\frac{U_{i+1}-U_i}h
\quad
\text{on }(x_i,x_{i+1}).
$$

従って

$$
\begin{aligned}
\varepsilon(u_h',\phi_i')
&=
\varepsilon
\frac{U_i-U_{i-1}}h
\frac1h
h
\\
&\quad
+
\varepsilon
\frac{U_{i+1}-U_i}h
\left(-\frac1h\right)
h
\\
&=
\frac{\varepsilon}{h}
(-U_{i-1}+2U_i-U_{i+1}).
\end{aligned}
$$

次に移流項です。

左要素では

$$
\int_{x_{i-1}}^{x_i}\phi_i\,dx
=
\frac h2,
$$

右要素でも

$$
\int_{x_i}^{x_{i+1}}\phi_i\,dx
=
\frac h2.
$$

よって

$$
\begin{aligned}
b(u_h',\phi_i)
&=
b
\frac{U_i-U_{i-1}}h
\frac h2
+
b
\frac{U_{i+1}-U_i}h
\frac h2
\\
&=
\frac b2
(U_{i+1}-U_{i-1}).
\end{aligned}
$$

Galerkin 方程式

$$
\varepsilon(u_h',\phi_i')
+
b(u_h',\phi_i)
=
(f,\phi_i)
=
F_i
$$

へ代入し、全体を $h$ で割れば

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}
=
\frac{F_i}{h}.
$$

これは中心差分の左辺そのものです。
<!-- proof-end -->

### 何が重要か

FEM と FDM は見た目が違います。

- FDM：微分を差分商へ置き換える。
- FEM：弱形式を有限次元空間へ制限する。

しかし一次元一様格子・一次要素では、標準 Galerkin 法の内部節点方程式は中心差分と同じになります。

したがって FDM4 で見た中心差分の問題は、そのまま FEM に戻ってきます。

---

## 4. 移流卓越時に何が壊れるか

前節の内部方程式で左隣、中央、右隣の係数は

$$
-\frac{\varepsilon}{h}-\frac b2,
\qquad
\frac{2\varepsilon}{h},
\qquad
-\frac{\varepsilon}{h}+\frac b2
$$

です。

右隣係数が非正であるためには

$$
-\frac{\varepsilon}{h}+\frac b2
\le0,
$$

すなわち

$$
\boxed{
Pe_h
=
\frac{bh}{2\varepsilon}
\le1
}
$$

が必要です。

$Pe_h>1$ では右隣係数が正に変わります。

FDM4 で示した通り、これは中心差分型スキームの単調性を支える隣接係数の符号構造を壊し、交互振動を許します。

### 連続問題は強圧的なのに、なぜ振動するのか

$\nabla\cdot\boldsymbol b=0$ なら

$$
a(v,v)
=
\varepsilon\|\nabla v\|_2^2.
$$

したがって各固定 $\varepsilon>0$ では連続問題も有限次元 Galerkin 問題も一意に解けます。

しかし制御される量は

$$
\sqrt{\varepsilon}\|\nabla v\|_2
$$

です。

$\varepsilon$ が小さいと、このノルムは流線方向の高周波な変化を弱くしか罰しません。

つまり

$$
\boxed{
\text{存在一意性}
\neq
\text{移流卓越時の良好な節点挙動}
}
$$

です。

「Galerkin 法は理論上解ける」ことと「粗いメッシュでも非物理振動を出さない」ことは別問題です。

---

## 5. 試験関数を流線方向へ傾ける

標準 Galerkin 法では試験関数は $v_h$ です。

ここでは各要素で

$$
v_h
+
\tau_K\boldsymbol b\cdot\nabla v_h
$$

という流線方向の補正を加えた効果を、強形式残差を通じて弱形式へ入れます。

要素 $K$ 上の強形式残差を

$$
R_K(w)
=
-\varepsilon\Delta w
+
\boldsymbol b\cdot\nabla w
-
f
$$

とします。

<a id="def-fem7-supg"></a>

<!-- formal-statement-start -->
### 定義（流線風上 Petrov--Galerkin 法）

$\mathcal T_h$ を $\Omega$ の適合分割、$V_h\subset H_0^1(\Omega)$ を有限要素空間とし、各要素 $K\in\mathcal T_h$ に安定化係数 $\tau_K\ge0$ を与える。

$\varepsilon>0$、移流場 $\boldsymbol b$、$f\in L^2(\Omega)$ に対して、$u_h\in V_h$ が任意の $v_h\in V_h$ について

$$
\boxed{
a(u_h,v_h)
+
\sum_{K\in\mathcal T_h}
\tau_K
\left(
-\varepsilon\Delta u_h
+
\boldsymbol b\cdot\nabla u_h,
\boldsymbol b\cdot\nabla v_h
\right)_K
}
$$

$$
\boxed{
=
(f,v_h)
+
\sum_{K\in\mathcal T_h}
\tau_K
(f,\boldsymbol b\cdot\nabla v_h)_K
}
$$

を満たすとき、$u_h$ を流線風上 Petrov--Galerkin 解と呼ぶ。
<!-- formal-statement-end -->

以下、この方法を **SUPG** と略します。

これは同値に

$$
a(u_h,v_h)
+
\sum_K
\tau_K
(R_K(u_h),\boldsymbol b\cdot\nabla v_h)_K
=
(f,v_h)
$$

と書けます。

「流線風上」という名前は、追加項が

$$
\boldsymbol b\cdot\nabla v_h
$$

を通して移流方向だけを特別に扱うことから来ています。

<!-- definition-example-start: def-fem7-supg -->
**定義の確認**

### 例：一次元 P1 要素では追加項は人工拡散になる

一次元、定数 $b>0$、区分一次 $u_h,v_h$ を考えます。

各要素内部では

$$
u_h''=0.
$$

したがって SUPG の追加左辺は

$$
\sum_K
\tau_K
(bu_h',bv_h')_K
=
\sum_K
\tau_Kb^2
(u_h',v_h')_K.
$$

つまり各要素で

$$
\boxed{
\varepsilon
\longmapsto
\varepsilon+\tau_Kb^2
}
$$

としたのと同じ拡散項が、**流線方向にだけ**追加されます。

標準 Galerkin の中心型離散化に、必要な方向だけ人工拡散を加えるのが SUPG の基本像です。
<!-- definition-example-end -->

---

## 6. SUPG は整合性を保つ

人工拡散だけを PDE に直接足すと、元の方程式そのものを変えてしまいます。

SUPG の重要な点は、追加項が強形式残差を通じて入ることです。

<a id="thm-fem7-supg-consistency"></a>

<!-- formal-statement-start -->
### 定理（SUPG の強整合性）

正確解 $u$ が各要素 $K$ 上で

$$
u|_K\in H^2(K)
$$

を満たし、

$$
-\varepsilon\Delta u
+
\boldsymbol b\cdot\nabla u
=
f
$$

がほとんど至る所で成り立つとする。

このとき任意の $v_h\in V_h$ に対して、正確解 $u$ は SUPG 方程式を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正確解は通常の弱形式を満たすので

$$
a(u,v_h)
=
(f,v_h).
$$

また各要素で強形式が成り立つため

$$
-\varepsilon\Delta u
+
\boldsymbol b\cdot\nabla u
-
f
=
0.
$$

したがって

$$
\tau_K
\left(
-\varepsilon\Delta u
+
\boldsymbol b\cdot\nabla u
-f,
\boldsymbol b\cdot\nabla v_h
\right)_K
=
0.
$$

全要素について和を取れば

$$
a(u,v_h)
+
\sum_K
\tau_K
\left(
-\varepsilon\Delta u
+
\boldsymbol b\cdot\nabla u,
\boldsymbol b\cdot\nabla v_h
\right)_K
$$

$$
=
(f,v_h)
+
\sum_K
\tau_K
(f,\boldsymbol b\cdot\nabla v_h)_K.
$$

よって正確解は SUPG 方程式を満たします。
<!-- proof-end -->

### 何を意味するか

安定化項は

$$
R_K(u)=0
$$

なら消えます。

したがって SUPG は

$$
\boxed{
\text{離散解には安定化を加えるが、正確解の方程式は変えない}
}
$$

という残差型安定化です。

---

## 7. 一次要素では流線方向ノルムが直接制御される

SUPG の安定化が何を制御するかを、仮定を絞って完全に計算します。

<a id="thm-fem7-supg-stability"></a>

<!-- formal-statement-start -->
### 定理（一次要素 SUPG の流線方向安定性）

$\boldsymbol b$ を定数ベクトル、$\varepsilon>0$ とし、$V_h\subset H_0^1(\Omega)$ を連続区分一次有限要素空間とする。

各 $\tau_K\ge0$ に対して

$$
a_{\mathrm{SUPG}}(w_h,v_h)
=
a(w_h,v_h)
+
\sum_K
\tau_K
\left(
-\varepsilon\Delta w_h
+
\boldsymbol b\cdot\nabla w_h,
\boldsymbol b\cdot\nabla v_h
\right)_K
$$

と置く。

このとき任意の $v_h\in V_h$ に対して

$$
\boxed{
a_{\mathrm{SUPG}}(v_h,v_h)
=
\varepsilon
\|\nabla v_h\|_{L^2}^2
+
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v_h$ は各要素上で一次関数なので

$$
\Delta v_h=0
\qquad
\text{in each }K.
$$

従って安定化項は

$$
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2.
$$

通常の双線形形式について

$$
a(v_h,v_h)
=
\varepsilon\|\nabla v_h\|_2^2
+
(\boldsymbol b\cdot\nabla v_h,v_h).
$$

$\boldsymbol b$ は定数なので $\nabla\cdot\boldsymbol b=0$ です。

さらに $v_h=0$ on $\partial\Omega$ だから

$$
\begin{aligned}
(\boldsymbol b\cdot\nabla v_h,v_h)
&=
\frac12
\int_\Omega
\boldsymbol b\cdot\nabla(v_h^2)\,dx
\\
&=
\frac12
\int_{\partial\Omega}
v_h^2
\boldsymbol b\cdot\boldsymbol n\,ds
-
\frac12
\int_\Omega
(\nabla\cdot\boldsymbol b)v_h^2\,dx
\\
&=
0.
\end{aligned}
$$

したがって

$$
a_{\mathrm{SUPG}}(v_h,v_h)
=
\varepsilon
\|\nabla v_h\|_2^2
+
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2.
$$
<!-- proof-end -->

標準 Galerkin では

$$
\varepsilon\|\nabla v_h\|^2
$$

しか見えませんでした。

SUPG ではさらに

$$
\sum_K\tau_K
\|\boldsymbol b\cdot\nabla v_h\|^2
$$

が現れます。

これはまさに流線方向の変化を追加で罰する項です。

---

## 8. 一次元では SUPG が風上差分になる

ここが FDM4 と FEM7 の最も重要な接続点です。

一次元、一様格子、$b>0$、区分一次要素を考えます。

前節の通り、SUPG は拡散係数へ

$$
\tau b^2
$$

を追加します。

つまり標準 Galerkin の節点方程式で

$$
\varepsilon
$$

を

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\tau b^2
$$

へ置き換えればよいことになります。

<a id="thm-fem7-supg-upwind"></a>

<!-- formal-statement-start -->
### 定理（一次元 SUPG と風上差分の一致）

$\Omega=(0,1)$、$b>0$、一様格子幅 $h$、連続区分一次有限要素空間を考える。

各要素で

$$
\boxed{
\tau
=
\frac{h}{2b}
}
$$

とする。

このとき SUPG の内部節点方程式の左辺は

$$
\boxed{
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_i-U_{i-1}}{h}
}
$$

となり、FDM4 の一次風上差分型移流拡散作用素と一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\tau=h/(2b)$ なので追加拡散は

$$
\tau b^2
=
\frac{bh}{2}.
$$

したがって有効拡散係数は

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\frac{bh}{2}.
$$

標準 Galerkin の内部節点方程式にこれを代入すると

$$
-\varepsilon_{\mathrm{eff}}
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}.
$$

$\varepsilon_{\mathrm{eff}}$ を展開すると

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
-
\frac{bh}{2}
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}.
$$

後ろ二項をまとめます。

$$
-\frac b{2h}
(U_{i-1}-2U_i+U_{i+1})
+
\frac b{2h}
(U_{i+1}-U_{i-1})
$$

$$
=
\frac b{2h}
(-U_{i-1}+2U_i-U_{i+1}+U_{i+1}-U_{i-1})
$$

$$
=
\frac b h
(U_i-U_{i-1}).
$$

従って全体は

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_i-U_{i-1}}h.
$$

これは $b>0$ に対する風上差分です。
<!-- proof-end -->

### 有効 Péclet 数

SUPG 後の有効 Péclet 数は

$$
Pe_h^{\mathrm{eff}}
=
\frac{bh}{2(\varepsilon+bh/2)}
=
\frac{Pe_h}{1+Pe_h}.
$$

したがって

$$
Pe_h^{\mathrm{eff}}<1
$$

です。

標準 Galerkin で壊れていた中心型係数の符号条件が、風上化により回復します。

---

## 9. 安定化係数 $\tau$ をどう選ぶか

$\tau=h/(2b)$ は大きな $Pe_h$ で自然な風上量です。

しかし拡散優勢で同じ人工拡散を入れると、必要以上に解をなまらせます。

一次元定係数問題では、より精密な選択を導けます。

$$
Pe
=
\frac{bh}{2\varepsilon}
$$

と置き、

双曲線余接を

$$
\coth z
=
\frac{\cosh z}{\sinh z}
$$

と書き、

$$
\boxed{
\tau_{\mathrm{opt}}
=
\frac{h}{2b}
\left(
\coth Pe-\frac1{Pe}
\right)
}
$$

とします。

このとき追加拡散

$$
\delta
=
\tau_{\mathrm{opt}}b^2
$$

は

$$
\delta
=
\frac{bh}{2}
\left(
\coth Pe-\frac1{Pe}
\right)
$$

です。

したがって

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\delta.
$$

$bh/2=\varepsilon Pe$ を使うと

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon Pe\coth Pe.
$$

よって有効 Péclet 数は

$$
\frac{bh}{2\varepsilon_{\mathrm{eff}}}
=
\tanh Pe.
$$

中心型三項漸化式の非定数特性根は

$$
r
=
\frac{1+\tanh Pe}{1-\tanh Pe}
=
e^{2Pe}
=
e^{bh/\varepsilon}.
$$

これは連続方程式の指数モードが一格子幅進んだときの倍率そのものです。

つまりこの $\tau_{\mathrm{opt}}$ は、一次元定係数問題で指数境界層を節点上に正確に合わせる「指数フィッティング」になっています。

### 二つの極限

$Pe\ll1$ では

$$
\coth Pe-\frac1{Pe}
\sim
\frac{Pe}{3},
$$

なので $\tau_{\mathrm{opt}}$ は小さくなり、標準 Galerkin へ近づきます。

$Pe\gg1$ では

$$
\coth Pe\to1,
\qquad
\frac1{Pe}\to0,
$$

なので

$$
\tau_{\mathrm{opt}}
\to
\frac{h}{2b}.
$$

つまり強い移流卓越では風上差分相当へ近づきます。

---

## 10. 多次元で SUPG は何をしているか

一次元では「人工拡散」と言えば方向は一つしかありません。

多次元では違います。

SUPG の安定化項は主要部だけ見れば

$$
\sum_K
\tau_K
(\boldsymbol b\cdot\nabla u_h,
\boldsymbol b\cdot\nabla v_h)_K.
$$

これは

$$
\boldsymbol b
$$

方向の微分だけを強く制御します。

したがって等方的人工拡散

$$
\delta(\nabla u_h,\nabla v_h)
$$

と違い、流線に直交する方向まで一様にぼかすわけではありません。

この点が SUPG の重要な設計思想です。

一方で、急峻な層が流線に直交する方向へ現れる場合や、内部層・不連続に近い構造では、SUPG だけで十分とは限りません。

本章ではそこから先へは進まず、

$$
\boxed{
\text{SUPG は万能な「振動除去器」ではなく、流線方向安定化}
}
$$

という境界を押さえます。

---

## 11. 行列から見る標準 Galerkin と SUPG

Poisson 問題の剛性行列は対称正定値でした。

移流拡散問題では

$$
A
=
\varepsilon K+C
$$

となり、移流行列 $C$ のため一般に非対称です。

SUPG を入れると

$$
A_{\mathrm{SUPG}}
=
\varepsilon K+C+S
$$

となります。

$S$ は一次要素・定数移流なら流線方向拡散に対応します。

ここで重要なのは、FEM6 の熱方程式で現れた SPD 行列とは性質が違うことです。

したがって線形ソルバを選ぶときも、

- 対称性
- 正定値性
- 非対称移流項の強さ

を確認する必要があります。

「FEM だから対称正定値問題向けの解法」と機械的に決めてはいけません。

---

## 12. 本章の論理を一本につなぐ

本章の流れは次です。

$$
\boxed{
Pe_K
=
\frac{|\boldsymbol b|h_K}{2\varepsilon}
}
$$

が大きいと、メッシュ上では移流が拡散より強く見えます。

一次元 P1 標準 Galerkin は

$$
\text{中心差分}
$$

と同じ節点方程式を作るため、

$$
Pe_h>1
$$

で係数符号が崩れ、非物理振動を起こし得ます。

SUPG は強形式残差を使って

$$
\boldsymbol b\cdot\nabla v_h
$$

方向に安定化を加えます。

一次要素では

$$
\tau b^2
$$

の流線方向人工拡散となり、

$$
\tau=\frac h{2b}
$$

なら一次元で風上差分に一致します。

したがって FDM4 と FEM7 は別の話ではありません。

$$
\boxed{
\text{中心型離散化の不足}
\to
\text{流れの向きを使った安定化}
}
$$

という同じ数値解析原理を、二つの離散化言語で見ています。

---

# 演習

## Level A

### A1. 要素 Péclet 数を計算する

- Level: A
- ID: FEM7-A1

一次元移流拡散問題で

$$
b=2,
\qquad
\varepsilon=0.02
$$

とする。

(1) $h=0.1$ のときの $Pe_h$ を求めよ。

(2) $Pe_h\le1$ とするために必要な $h$ の上限を求めよ。

<!-- solution-start -->
### 詳細解答

定義から

$$
Pe_h
=
\frac{|b|h}{2\varepsilon}.
$$

(1) $h=0.1$ を代入すると

$$
Pe_h
=
\frac{2\cdot0.1}{2\cdot0.02}
=
\frac{0.2}{0.04}
=
5.
$$

したがって

$$
\boxed{Pe_h=5}
$$

であり、移流卓越です。

(2)

$$
\frac{2h}{0.04}\le1
$$

なので

$$
2h\le0.04.
$$

従って

$$
\boxed{h\le0.02}.
$$

同じ PDE でもメッシュを十分細かくすれば $Pe_h\le1$ にできます。
<!-- solution-end -->

### A2. 一次元 Galerkin の移流項

- Level: A
- ID: FEM7-A2

一様格子上の帽子関数 $\phi_i$ と区分一次関数

$$
u_h=\sum_jU_j\phi_j
$$

について、定数 $b$ に対し

$$
b(u_h',\phi_i)
=
\frac b2
(U_{i+1}-U_{i-1})
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$\phi_i$ の台は

$$
[x_{i-1},x_{i+1}]
$$

です。

左要素では

$$
u_h'
=
\frac{U_i-U_{i-1}}h,
$$

右要素では

$$
u_h'
=
\frac{U_{i+1}-U_i}h.
$$

また帽子関数の面積は各半分で

$$
\int_{x_{i-1}}^{x_i}\phi_i\,dx
=
\int_{x_i}^{x_{i+1}}\phi_i\,dx
=
\frac h2.
$$

従って

$$
\begin{aligned}
b(u_h',\phi_i)
&=
b\frac{U_i-U_{i-1}}h\frac h2
+
b\frac{U_{i+1}-U_i}h\frac h2
\\
&=
\frac b2
\left[
U_i-U_{i-1}+U_{i+1}-U_i
\right]
\\
&=
\boxed{
\frac b2(U_{i+1}-U_{i-1})
}.
\end{aligned}
$$

中央の $U_i$ が消えるため、移流項は中心型になります。
<!-- solution-end -->

### A3. SUPG の追加拡散

- Level: A
- ID: FEM7-A3

一次元、区分一次要素、定数 $b=3$、$\tau=0.02$ とする。

SUPG が加える有効拡散係数

$$
\delta=\tau b^2
$$

を求めよ。

もとの $\varepsilon=0.01$ のとき $\varepsilon_{\mathrm{eff}}$ も求めよ。

<!-- solution-start -->
### 詳細解答

区分一次要素では要素内部で

$$
u_h''=0
$$

なので、SUPG 追加項は

$$
\tau b^2(u_h',v_h')
$$

です。

したがって追加拡散は

$$
\delta
=
\tau b^2
=
0.02\cdot3^2
=
0.18.
$$

よって

$$
\boxed{\delta=0.18}.
$$

有効拡散係数は

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\delta
=
0.01+0.18
=
0.19.
$$

したがって

$$
\boxed{\varepsilon_{\mathrm{eff}}=0.19}.
$$
<!-- solution-end -->

### A4. 風上相当の $\tau$

- Level: A
- ID: FEM7-A4

一次元で

$$
b=4,
\qquad
h=0.08
$$

とする。

$$
\tau=\frac h{2b}
$$

を計算し、追加拡散 $\tau b^2$ が $bh/2$ に一致することを数値で確認せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\tau
=
\frac{0.08}{2\cdot4}
=
\frac{0.08}{8}
=
0.01.
$$

したがって

$$
\boxed{\tau=0.01}.
$$

追加拡散は

$$
\tau b^2
=
0.01\cdot16
=
0.16.
$$

一方

$$
\frac{bh}{2}
=
\frac{4\cdot0.08}{2}
=
0.16.
$$

よって

$$
\boxed{
\tau b^2
=
\frac{bh}{2}
=
0.16
}
$$

が直接確認できました。
<!-- solution-end -->

## Level B

### B1. P1 Galerkin が中心差分になることを導く

- Level: B
- ID: FEM7-B1

一次元問題

$$
-\varepsilon u''+bu'=f
$$

を一様格子の連続一次有限要素で離散化する。

内部節点 $i$ の帽子関数 $\phi_i$ を用いて

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}
=
\frac{F_i}{h}
$$

を導け。

さらに右隣係数が非正である条件が $Pe_h\le1$ と同値であることを示せ。

<!-- solution-start -->
### 詳細解答

拡散項は

$$
\varepsilon(u_h',\phi_i')
=
\frac{\varepsilon}{h}
(-U_{i-1}+2U_i-U_{i+1}).
$$

移流項は A2 から

$$
b(u_h',\phi_i)
=
\frac b2
(U_{i+1}-U_{i-1}).
$$

したがって

$$
\frac{\varepsilon}{h}
(-U_{i-1}+2U_i-U_{i+1})
+
\frac b2
(U_{i+1}-U_{i-1})
=
F_i.
$$

両辺を $h$ で割ると

$$
\boxed{
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_{i+1}-U_{i-1}}{2h}
=
\frac{F_i}{h}
}.
$$

右隣 $U_{i+1}$ の係数は

$$
-\frac{\varepsilon}{h^2}
+
\frac b{2h}.
$$

これが非正である条件は

$$
\frac b{2h}
\le
\frac{\varepsilon}{h^2}.
$$

$h>0$ なので

$$
\frac{bh}{2\varepsilon}
\le1.
$$

すなわち

$$
\boxed{Pe_h\le1}.
$$

従って $Pe_h>1$ では中心型係数の符号構造が崩れます。
<!-- solution-end -->

### B2. SUPG の流線方向安定性

- Level: B
- ID: FEM7-B2

$\boldsymbol b$ を定数ベクトル、$V_h\subset H_0^1(\Omega)$ を連続区分一次有限要素空間とする。

$$
a_{\mathrm{SUPG}}(v_h,v_h)
=
\varepsilon\|\nabla v_h\|_2^2
+
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2
$$

を、次の二点を明示して導け。

1. 要素内部で $\Delta v_h=0$ となる理由。
2. $(\boldsymbol b\cdot\nabla v_h,v_h)=0$ となる理由。

<!-- solution-start -->
### 詳細解答

$v_h$ は各要素 $K$ 上で一次関数です。

したがって各一次偏微分は定数であり、二階微分は $0$ です。

よって

$$
\boxed{
\Delta v_h=0
\quad\text{on each }K
}.
$$

SUPG 追加項は

$$
\sum_K
\tau_K
(-\varepsilon\Delta v_h+\boldsymbol b\cdot\nabla v_h,
\boldsymbol b\cdot\nabla v_h)_K
$$

なので

$$
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2
$$

になります。

次に通常の移流項を調べます。

$$
(\boldsymbol b\cdot\nabla v_h,v_h)
=
\frac12
\int_\Omega
\boldsymbol b\cdot\nabla(v_h^2)\,dx.
$$

$\boldsymbol b$ は定数なので

$$
\nabla\cdot\boldsymbol b=0.
$$

発散定理から

$$
\frac12
\int_\Omega
\boldsymbol b\cdot\nabla(v_h^2)\,dx
=
\frac12
\int_{\partial\Omega}
v_h^2\boldsymbol b\cdot\boldsymbol n\,ds.
$$

$v_h\in H_0^1(\Omega)$ なので境界で $v_h=0$ です。

従って

$$
(\boldsymbol b\cdot\nabla v_h,v_h)=0.
$$

以上から

$$
\boxed{
a_{\mathrm{SUPG}}(v_h,v_h)
=
\varepsilon\|\nabla v_h\|_2^2
+
\sum_K
\tau_K
\|\boldsymbol b\cdot\nabla v_h\|_{L^2(K)}^2
}.
$$
<!-- solution-end -->

### B3. 指数フィッティング型 $\tau$ を導く

- Level: B
- ID: FEM7-B3

一次元定係数問題で

$$
Pe=\frac{bh}{2\varepsilon},
\qquad
b>0
$$

とする。

SUPG による有効拡散係数を

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\tau b^2
$$

とする。

中心型三項漸化式の非定数特性根が連続指数モードの格子倍率

$$
e^{bh/\varepsilon}
=
e^{2Pe}
$$

に一致するよう $\tau$ を選び、

$$
\boxed{
\tau
=
\frac h{2b}
\left(
\coth Pe-\frac1{Pe}
\right)
}
$$

を導け。

<!-- solution-start -->
### 詳細解答

有効拡散係数に対する Péclet 数を

$$
Pe_{\mathrm{eff}}
=
\frac{bh}{2\varepsilon_{\mathrm{eff}}}
$$

とします。

中心型三項漸化式の非定数特性根は

$$
r
=
\frac{1+Pe_{\mathrm{eff}}}
{1-Pe_{\mathrm{eff}}}.
$$

これを

$$
e^{2Pe}
$$

に一致させます。

方程式

$$
\frac{1+q}{1-q}
=
e^{2Pe}
$$

を $q$ について解くと

$$
q
=
\frac{e^{2Pe}-1}{e^{2Pe}+1}
=
\tanh Pe.
$$

従って

$$
Pe_{\mathrm{eff}}
=
\tanh Pe.
$$

すなわち

$$
\frac{bh}{2\varepsilon_{\mathrm{eff}}}
=
\tanh Pe.
$$

$bh/2=\varepsilon Pe$ だから

$$
\frac{\varepsilon Pe}{\varepsilon_{\mathrm{eff}}}
=
\tanh Pe.
$$

よって

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon
\frac{Pe}{\tanh Pe}
=
\varepsilon Pe\coth Pe.
$$

一方

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\tau b^2.
$$

したがって

$$
\tau b^2
=
\varepsilon
(Pe\coth Pe-1).
$$

ここで

$$
\varepsilon
=
\frac{bh}{2Pe}
$$

なので

$$
\tau b^2
=
\frac{bh}{2}
\left(
\coth Pe-\frac1{Pe}
\right).
$$

$b^2$ で割れば

$$
\boxed{
\tau
=
\frac h{2b}
\left(
\coth Pe-\frac1{Pe}
\right)
}.
$$
<!-- solution-end -->

## Level C

### C1. 標準 Galerkin から SUPG 風上化までを一つの問題で追う

- Level: C
- ID: FEM7-C1

一次元問題

$$
-\varepsilon u''+bu'=0,
\qquad
0<x<1,
$$

$$
u(0)=0,
\qquad
u(1)=1
$$

を考える。

$b>0$、一様格子幅 $h$ とし、

$$
Pe_h
=
\frac{bh}{2\varepsilon}
=
2
$$

とする。

(1) 標準 P1 Galerkin 法の内部節点方程式を

$$
\alpha U_{i-1}
+
\beta U_i
+
\gamma U_{i+1}
=
0
$$

の形に書き、$\gamma>0$ となることを示せ。

(2) 同次方程式の特性根を求め、非定数根が負になることを示せ。

(3)

$$
\tau=\frac h{2b}
$$

の SUPG を入れたとき、左辺が風上差分

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_i-U_{i-1}}h
$$

になることを示せ。

(4) SUPG 後の三項係数で両隣の係数が非正になることを確認し、標準 Galerkin と何が変わったか説明せよ。

<!-- solution-start -->
### 詳細解答

#### (1) 標準 Galerkin の係数

内部節点方程式へ $h$ を掛けると

$$
\left(
-\frac{\varepsilon}{h}-\frac b2
\right)U_{i-1}
+
\frac{2\varepsilon}{h}U_i
+
\left(
-\frac{\varepsilon}{h}+\frac b2
\right)U_{i+1}
=
0.
$$

$Pe_h=2$ なので

$$
\frac{bh}{2\varepsilon}=2.
$$

従って

$$
\frac b2
=
\frac{2\varepsilon}{h}.
$$

よって

$$
\alpha
=
-\frac{\varepsilon}{h}
-
\frac{2\varepsilon}{h}
=
-\frac{3\varepsilon}{h},
$$

$$
\beta
=
\frac{2\varepsilon}{h},
$$

$$
\gamma
=
-\frac{\varepsilon}{h}
+
\frac{2\varepsilon}{h}
=
\frac{\varepsilon}{h}.
$$

したがって

$$
\boxed{\gamma>0}.
$$

中心型スキームの単調性を支える「両隣係数が非正」という構造が壊れています。

#### (2) 特性根

共通因子 $\varepsilon/h$ を除くと

$$
-3U_{i-1}+2U_i+U_{i+1}=0.
$$

$$
U_i=r^i
$$

を代入すると

$$
-3r^{i-1}+2r^i+r^{i+1}=0.
$$

$r^{i-1}$ で割れば

$$
r^2+2r-3=0.
$$

因数分解して

$$
(r-1)(r+3)=0.
$$

従って

$$
\boxed{
r_1=1,
\qquad
r_2=-3
}.
$$

非定数根が負なので、対応する離散モードは節点ごとに符号を交互に変えます。

これが非物理振動の代数的機構です。

#### (3) SUPG の風上化

$\tau=h/(2b)$ なら追加拡散は

$$
\tau b^2
=
\frac{bh}{2}.
$$

したがって

$$
\varepsilon_{\mathrm{eff}}
=
\varepsilon+\frac{bh}{2}.
$$

標準 Galerkin の中心型移流項と、この追加拡散を組み合わせると

$$
-\varepsilon
\frac{U_{i-1}-2U_i+U_{i+1}}{h^2}
+
b
\frac{U_i-U_{i-1}}h.
$$

よって

$$
\boxed{
\text{SUPG}
=
\text{一次風上差分}
}
$$

がこの設定では厳密に成り立ちます。

#### (4) 係数符号

風上式を展開すると

$$
\left(
-\frac{\varepsilon}{h^2}
-\frac b h
\right)U_{i-1}
+
\left(
\frac{2\varepsilon}{h^2}
+\frac b h
\right)U_i
-
\frac{\varepsilon}{h^2}
U_{i+1}
=
0.
$$

両隣係数は

$$
-\frac{\varepsilon}{h^2}
-\frac b h<0,
$$

$$
-\frac{\varepsilon}{h^2}<0.
$$

したがって標準 Galerkin で正に変わっていた右隣係数が再び非正になりました。

変化の本質は

$$
\boxed{
\text{流線方向へ } \frac{bh}{2}
\text{ の数値拡散を追加した}
}
$$

ことです。

これにより中心型の交互振動モードを抑える係数構造が回復します。

ただし数値拡散を加えるため、層は実際より広く見えることがあります。

したがって安定化は

$$
\boxed{
\text{振動抑制}
\quad\text{と}\quad
\text{過剰拡散}
}
$$

のトレードオフです。
<!-- solution-end -->

---

## 参考接続

- FDM4：中心差分、風上差分、格子 Péclet 数、数値拡散、隣接係数の符号と単調性
- FEM1：適合 Galerkin 法、Galerkin 直交性、Céa の補題
- FEM2：連続一次有限要素空間、局所基底、組立て
- FEM4：適合楕円型 FEM の誤差解析
- GPDE7：Lax--Milgram の定理

SUPG の原型は Brooks--Hughes の streamline-upwind/Petrov--Galerkin 法です。本章ではその一般理論を網羅せず、移流拡散方程式に対する残差型・流線方向安定化という核心だけを扱いました。
