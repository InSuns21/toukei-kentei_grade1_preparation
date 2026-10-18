# HPDE2 高次元平坦波動とHuygens現象

[HPDE1の一次元波動方程式](../HPDE1/index.md#def-hpde1-flat-wave-operator)では、初期速度の積分が光円錐の内部に残りました。例えば変位を零、初速度を非負のコンパクト台関数にすると、波の通過後にも固定点で値が残り得ます。ところが、三次元空間の自由な波動では状況が違います。**音源から離れた観測点で、直接波が通り過ぎた後に「尾」が残るのでしょうか。**

この章では[PDE9で導入した球面平均](../../PDE/PDE9/index.md#def-pde9-spherical-mean)からKirchhoff公式を導き直し、初期情報が**球面**だけに現れることを証明します。さらに、二次元へ次元降下させて**円板内部**が寄与するPoisson公式を得ます。最後に、空間次元・質量項・時空の曲率を別の要因として整理します。

時間を $t\ge0$、空間を $x\in\mathbb R^n$、波速を $c>0$ とします。平坦時空の計量は

$$
-dt^2+c^{-2}\sum_{j=1}^n dx_j^2
$$

です。[LORG6のMinkowski因果条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)によれば、初期点 $(0,y)$ から $(t,x)$ に光またはそれ以下の速度で到達できる条件は

$$
|x-y|\le ct
$$

です。等号部分が半径 $ct$ の球面、不等号全体が閉球を表します。

以下の主要な公式では初期変位 $f\in C_c^\infty(\mathbb R^n)$、初速度 $h\in C_c^\infty(\mathbb R^n)$ とします。ここで $C_c^\infty$ は、すべての階数の導関数が存在し、非零となる点の閉包（支持）がコンパクトである関数の空間です。この仮定の下では、以下で使う球面積分と微分を交換できます。一般のベクトル束値作用素や曲がった計量のGreen作用素は、後続の章で構成します。

## 1. 球面を平均する理由

一つの空間方向だけを通る一次元の進行波に対し、三次元では原点から同じ速さで進む光があらゆる方向へ広がります。時刻 $t$ に位置 $x$ へ到達する初期位置は、半径 $ct$ の球面に並びます。そこで、[PDE9の球面平均](../../PDE/PDE9/index.md#def-pde9-spherical-mean)を時間発展に合わせて書き換えます。

$S^2=\{\omega\in\mathbb R^3:|\omega|=1\}$ とし、$d\omega$ は単位球面の面積要素（全表面積 $4\pi$）です。半径を表す変数 $r\ge0$ と時間を区別しながら、既習の平均を時間変数に適合させる記法を導入します。

<a id="def-hpde2-spherical-mean"></a>

<!-- formal-statement-start -->
> **定義（時間に沿った球面平均の記法）**  
> $g\in C^2(\mathbb R^3)$、$x\in\mathbb R^3$、$r\ge0$ に対し、

$$
A_g(r,x)=\frac{1}{4\pi}\int_{S^2}g(x+r\omega)\,d\omega
$$

> と置く。$A_g(0,x)=g(x)$ とし、時間に沿った平均を $M_g(t,x)=A_g(ct,x)$（$t\ge0$）と書く。面積表示では $r>0$ に対して

$$
A_g(r,x)=\frac{1}{4\pi r^2}
\int_{|y-x|=r}g(y)\,dS_y
$$

> である。
<!-- formal-statement-end -->

この二つの積分が同じなのは、半径 $r>0$ の球面を $y=x+r\omega$（$\omega\in S^2$）と表示したとき、二つの接方向の長さがともに $r$ 倍になるため、面積要素が $dS_y=r^2d\omega$ となるからです。従って $1/(4\pi r^2)$ は球面の面積による正規化であり、体積積分の係数ではありません。

<!-- definition-example-start: def-hpde2-spherical-mean -->
### 直接例：二次関数の平均

**定義の確認**：正規化と半径の効果を手で確かめます。$g(y)=|y|^2$ とすると $g(x+r\omega)=|x|^2+2r x\cdot\omega+r^2$ です。球面の点 $\omega$ と $-\omega$ が対になり、$\int_{S^2}\omega\,d\omega=0$ となるので、

$$
A_g(r,x)=|x|^2+r^2,\qquad M_g(t,x)=|x|^2+c^2t^2.
$$

実際に $A_g(0,x)=g(x)$、正規化した平均の係数 $4\pi$、半径 $r$ の二乗の寄与を検算できました。なおこの多項式は後の初期値定理のコンパクト台の仮定を満たしませんが、球面平均の定義と局所計算には使えます。
<!-- definition-example-end -->

[PDE9のEuler--Poisson--Darboux関係](../../PDE/PDE9/index.md#lem-pde9-epd)は、球面平均を使って空間のLaplace作用素を**半径に関する一変数微分**へ変換するものです。ここでは時間への代入もできる形に整理し、後で使う微分恒等式を計算し直します。以下、$\Delta_x=\partial_{x_1}^2+\partial_{x_2}^2+\partial_{x_3}^2$ とします。

<a id="lem-hpde2-spherical-mean-identity"></a>

<!-- formal-statement-start -->
> **補題（波速付き球面平均の微分恒等式）**  
> $g\in C^2(\mathbb R^3)$、$r>0$、$x\in\mathbb R^3$ とする。球面平均について

$$
\partial_r^2A_g+\frac2r\partial_rA_g
=A_{\Delta g}(r,x)=\Delta_x A_g(r,x)
$$

> が成り立つ。さらに $\partial_rA_g(0,x)=0$ である。$M_g(t,x)=A_g(ct,x)$ と置くと $t>0$ で

$$
\partial_t^2M_g+\frac2t\partial_tM_g=c^2\Delta_xM_g
$$

> も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

球面平均の半径微分は球面を貫く勾配の流束です。発散定理で流束を球内部の積分に変え、半径で再微分すれば平均されたLaplacianが出ます。$\Delta_x$ との交換は積分領域を単位球面へ固定してから行います。

<!-- proof-start -->
### 証明

まず $r>0$ に対して被積分関数を微分すると

$$
\partial_r A_g(r,x)
=\frac1{4\pi}\int_{S^2}\nabla g(x+r\omega)\cdot\omega\,d\omega.
$$

両辺へ $r^2$ を掛け、$y=x+r\omega$ と置くと

$$
r^2\partial_r A_g(r,x)
=\frac1{4\pi}\int_{|y-x|=r}
\nabla g(y)\cdot\frac{y-x}{r}\,dS_y.
$$

球 $B_r(x)$ は滑らかな境界を持ち、$g\in C^2$ なので $\nabla g\in C^1$ です。従って[Gauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を、外向き単位法線 $n(y)=(y-x)/r$ とベクトル場 $F=\nabla g$ に適用して

$$
r^2\partial_r A_g(r,x)=\frac1{4\pi}
\int_{|y-x|<r}\Delta g(y)\,dy
$$

を得ます。両辺を $r$ で微分すると、球殻の厚みを $dr$ だけ増やした積分の微分で

$$
\partial_r(r^2\partial_r A_g)
=\frac1{4\pi}\int_{|y-x|=r}\Delta g(y)\,dS_y
=r^2 A_{\Delta g}(r,x).
$$

左辺を $2r A_{g,r}+r^2 A_{g,rr}$ と展開し、$r^2>0$ で割れば第一の等式です。さらに $g\in C^2$ なので $x$ に関する微分は単位球面のコンパクトな積分と交換でき、

$$
\Delta_x A_g(r,x)
=\frac1{4\pi}\int_{S^2}\Delta g(x+r\omega)\,d\omega
=A_{\Delta g}(r,x)
$$

となります。最後に $r\downarrow0$ とすると

$$
\partial_r A_g(0,x)=\frac1{4\pi}\int_{S^2}
\nabla g(x)\cdot\omega\,d\omega=0
$$

です。最後に $M_g(t,x)=A_g(ct,x)$ へ連鎖律を適用すると

$$
\partial_tM_g=cA_{g,r}(ct,x),\quad
\partial_t^2M_g=c^2A_{g,rr}(ct,x),\quad
\frac2t\partial_tM_g=c^2\frac2{ct}A_{g,r}(ct,x).
$$

この三つを先ほどの半径に関する等式へ代入して、波速付きの時間微分恒等式を得ます。
<!-- proof-end -->

先ほどの $g(y)=|y|^2$ を代入すると、$\Delta g=6$ なので

$$
A_{g,rr}+\frac2rA_{g,r}=2+\frac2r(2r)=6=A_{\Delta g}.
$$

これは定義例が補題にも適合する、手で追える検算です。

## 2. 三次元Kirchhoff公式を導出する

一次元では[光的座標での因子分解](../HPDE1/index.md#prop-hpde1-null-factorization)が決め手でした。三次元では補題の $2/r$ の項が邪魔に見えます。しかし平均に半径を掛けると、この項が消えます。

$g\in C_c^\infty(\mathbb R^3)$ に対して $V_g(t,x)=tM_g(t,x)$ と置きます。連鎖律と[波速付き球面平均の微分恒等式](#lem-hpde2-spherical-mean-identity)から、

$$
\begin{aligned}
\partial_t^2 V_g
&=2\partial_t M_g+t\partial_t^2M_g\\
&=2c\,A_{g,r}(ct,x)+tc^2A_{g,rr}(ct,x)\\
&=c^2t\left(A_{g,rr}(ct,x)+\frac{2}{ct}A_{g,r}(ct,x)\right)\\
&=c^2t\,\Delta_xA_g(ct,x)=c^2\Delta_x V_g.
\end{aligned}
$$

$t=0$ でも連続性からこの方程式は成立します。$M_g(0,x)=g(x)$、$\partial_tM_g(0,x)=0$ なので

$$
V_g(0,x)=0,\quad (V_g)_t(0,x)=g(x),\quad
(V_g)_{tt}(0,x)=0.
$$

これは既習の[Kirchhoff公式](../../PDE/PDE9/index.md#thm-pde9-kirchhoff)を導く基本計算でもあります。ここではさらに、解の一意性を有限時間帯のエネルギーで確認します。

これにより $V_h$ は「初期変位は零・初速度は $h$」の解です。また時間微分は定係数波動作用素 $\partial_t^2-c^2\Delta_x$ と交換するため、$\partial_t V_f$ は「初期変位 $f$・初速度零」の解になります。二つを足すと任意の組 $(f,h)$ に対応できます。

<a id="thm-hpde2-kirchhoff"></a>

<!-- formal-statement-start -->
> **定理（三次元Kirchhoff公式とエネルギー一意性）**  
> $c>0$、$f,h\in C_c^\infty(\mathbb R^3)$ とする。時空 $[0,\infty)\times\mathbb R^3$ 上の斉次波動方程式

$$
u_{tt}-c^2\Delta_xu=0,\quad u(0,x)=f(x),\quad u_t(0,x)=h(x)
$$

> の滑らかな解は次式で与えられる。

$$
\boxed{u(t,x)=\partial_t\{tM_f(t,x)\}+tM_h(t,x).}
$$

> 各有限時間区間で空間支持が一様にコンパクトな滑らかな解のクラスで、この解は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

すでに $V_g=tM_g$ が波動方程式を満たすことと、零変位・指定速度の初期条件を検算しました。$g=f$ の時間微分と $g=h$ の式を重ねます。一意性は差のエネルギーが増えないことを積分で確認します。

<!-- proof-start -->
### 証明

$u=(V_f)_t+V_h$ と置けば、時間と空間の微分が可換なので

$$
(\partial_t^2-c^2\Delta_x)u
=\partial_t\{(\partial_t^2-c^2\Delta_x)V_f\}
+(\partial_t^2-c^2\Delta_x)V_h=0.
$$

初期時刻では

$$
u(0,x)=(V_f)_t(0,x)+V_h(0,x)=f(x)
$$

および

$$
u_t(0,x)=(V_f)_{tt}(0,x)+(V_h)_t(0,x)=0+h(x)
$$

です。$f,h$ は滑らかなので微分交換は正当化されます。

次に同じ初期条件を持ち、各 $[0,T]$ 上で空間支持が一つのコンパクト集合へ収まる二つの滑らかな解の差を $w$ とします。$w(0,\cdot)=w_t(0,\cdot)=0$、$w_{tt}=c^2\Delta w$ です。エネルギー

$$
E(t)=\frac12\int_{\mathbb R^3}\bigl(w_t^2+c^2|\nabla_xw|^2\bigr)\,dx
$$

は有限です。コンパクト支持から部分積分の境界項が零となり、

$$
\begin{aligned}
E'(t)
&=\int_{\mathbb R^3}\bigl(w_t w_{tt}
+c^2\nabla w\cdot\nabla w_t\bigr)\,dx\\
&=\int_{\mathbb R^3}w_t(w_{tt}-c^2\Delta w)\,dx=0.
\end{aligned}
$$

$E(0)=0$ だから $E(t)=0$。非負な連続関数の積分が零であるため $w_t(t,x)=0$ で、$w(0,x)=0$ から $w\equiv0$ です。構成した公式自身もコンパクトな初期支持を半径 $ct$ の球面で参照するだけなので、有限時間帯の空間支持は一様に有界です。
<!-- proof-end -->

実際に時間微分を行うと、初期変位 $f$ の寄与は

$$
\partial_t\{tM_f\}=M_f(t,x)
+\frac{ct}{4\pi}\int_{S^2}\nabla f(x+ct\omega)\cdot\omega\,d\omega.
$$

この式を使えば $t=0$ への極限も明示的に $f(x)$ になります。初速度の項は $tM_h$ です。**初期速度の寄与にも球の内側の体積積分は現れません。**

### 直接計算：球面上だけの速度

$c=1$、$f=0$、$h(y)=|y|^2$ を一時的な多項式模型とすると、平均の直接計算から

$$
u(t,x)=t(|x|^2+t^2).
$$

よって

$$
u_{tt}=6t,\qquad\Delta_xu=t\Delta_x|x|^2=6t,
$$

かつ $u(0,x)=0$、$u_t(0,x)=|x|^2$ です。非コンパクトな模型でも公式の微分恒等式が確かに成立することを確認できます。

## 3. Huygens現象――球面だけで決まるということ

[初期支持の因果的包含](../HPDE1/index.md#prop-hpde1-causal-support)は「光円錐の**外側**で解が零になる」と主張するものでした。その弱い意味の有限伝播だけでは、内側に尾が残るかどうかは判定できません。

強いHuygens原理では、観測点 $(t,x)$ に影響する初期情報が、過去光円錐と初期面の交わりである**球面**上の値と必要な空間微分だけに限られます。内側を変えても球面上のデータが変わらなければ、観測点の値が変わらないという性質です。

<a id="def-hpde2-strong-huygens"></a>

<!-- formal-statement-start -->
> **定義（強いHuygens性：初期値問題の形式）**  
> $c>0$、空間次元 $n\ge1$ とする。平坦な斉次線形波動型方程式のコンパクト台・滑らかなCauchyデータ $(f,h)$ に対して、任意の $t>0$、$x\in\mathbb R^n$ で、解 $u(t,x)$ が半径 $ct$ の球面

$$
S_{ct}(x)=\{y\in\mathbb R^n:|y-x|=ct\}
$$

> の近傍におけるデータだけで決定され、閉球の内部だけでデータを変えても $u(t,x)$ が変わらないとき、ここでは**強いHuygens性**が成り立つという。微分を含む公式では、球面上の必要な有限階微分もデータに含める。
<!-- formal-statement-end -->

「近傍」としたのは、初期変位の法線微分を含む公式も正しく扱うためです。データの差が球面近傍で零なら観測点での解の差も零、という形に読み替えると計算に直結します。

<!-- definition-example-start: def-hpde2-strong-huygens -->
### 直接例：三次元では球面の外にある初期速度を変えても値は同じ

**定義の確認**：球面近傍のデータが零なら観測値が変わらない条件を具体的に検証します。$h\in C_c^\infty(\mathbb R^3)$ が $B_R(0)$ に支持され、$f=0$ とします。$ct>R$ なら、観測点 $(t,0)$ の球面 $S_{ct}(0)$ に $h$ の非零点はありません。従って[PDE9のKirchhoff公式](../../PDE/PDE9/index.md#thm-pde9-kirchhoff)から

$$
u(t,0)=\frac{t}{4\pi}\int_{S^2}h(ct\omega)\,d\omega=0.
$$

内部の $B_R(0)$ 上で $h$ をどのように変えても、この値は零のままです。一方、球面が支持に交わる時刻には一般に非零となり得ます。これが定義の「球面のみ」の条件の直接確認です。
<!-- definition-example-end -->

<a id="prop-hpde2-three-dimensional-huygens"></a>

<!-- formal-statement-start -->
> **命題（三次元massless波動の強いHuygens性）**  
> $c>0$、$f,h\in C_c^\infty(\mathbb R^3)$ に対する $\partial_t^2-c^2\Delta_x$ の斉次Cauchy解は強いHuygens性を満たす。また $K=\operatorname{supp}f\cup\operatorname{supp}h\subset \overline B_R(0)$ なら、任意の固定点 $x$ で

$$
t>\frac{|x|+R}{c}\quad\Longrightarrow\quad u(t,x)=0
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

球面平均は球面上の値しか用いず、時間微分は球面の法線方向の一階微分しか付け加えません。さらに十分大きな半径の球面は初期データの支持から完全に離れます。

<!-- proof-start -->
### 証明

[Kirchhoff公式](#thm-hpde2-kirchhoff)とその直後に展開した $\partial_t(tM_f)$ の式より、$u(t,x)$ は $S_{ct}(x)$ 上の $f$、$\nabla f$、$h$ から決まります。球面の近傍で二組の初期データが一致すれば、そこで差の $f,\nabla f,h$ が零となるため、解の差も零です。

次に $t>(|x|+R)/c$ なら、球面上の任意の $y=x+ct\omega$ に対して[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から

$$
|y|=|x+ct\omega|\ge ct-|x|>R.
$$

よって $f(y)=h(y)=0$ であり、開集合 $|y|>R$ 上では $\nabla f(y)=0$ です。公式に戻せば $u(t,x)=0$ が従います。
<!-- proof-end -->

この結論は「波が無限に速く伝わる」という意味ではありません。$t$ が小さすぎて球面が支持へ到達しなければ零、球面が通過している間に値が現れ、球面が遠ざかれば再び零になるのです。

## 4. 二次元では、球面を投影すると円板になる

三次元の球面にある情報だけが寄与するなら、二次元の波でも同じでしょうか。三次元の解を第3座標に依存しない初期データで作り、三次元の球面を二次元平面へ投影すると、**投影先は円周でなく円板**です。この違いが残響を生みます。

$g:\mathbb R^2\to\mathbb R$ に対し、三次元への拡張を $\tilde g(x_1,x_2,x_3)=g(x_1,x_2)$ と定めます。この拡張は第3方向にコンパクト台ではありませんが、球面平均は各固定時刻に有限範囲の値しか使わないため定義できます。$\partial_{x_3}\tilde g=0$、従って $(\Delta_{\mathbb R^3}\tilde g)(x_1,x_2,x_3)=(\Delta_{\mathbb R^2}g)(x_1,x_2)$ です。球面平均の微分恒等式とKirchhoff構成は、コンパクト支持を使わず局所的な微分と球面積分で成立するため、この拡張にも適用できます。

[PDE9の二次元Poisson公式](../../PDE/PDE9/index.md#thm-pde9-poisson-wave)に現れる平方根重みを、球面を投影するJacobianから導出し、加えて一意性を確認します。

単位球面を $(z_1,z_2)$ 平面へ投影すると、上下半球のそれぞれは $z_3=\pm\sqrt{1-|z|^2}$（$|z|<1$）と書けます。各グラフの勾配は

$
\nabla_z z_3=\mp\frac{z}{\sqrt{1-|z|^2}}
$

なので、グラフ面積の倍率は

$
\sqrt{1+|\nabla_z z_3|^2}
=\sqrt{1+\frac{|z|^2}{1-|z|^2}}
=\frac1{\sqrt{1-|z|^2}}
$$

です。赤道 $|z|=1$ は球面上で面積零であり、倍率の境界での特異性は積分可能です。上下二枚を足すので

$
\int_{S^2}g(x+ct(\omega_1,\omega_2))\,d\omega
=2\int_{|z|<1}\frac{g(x+ctz)}{\sqrt{1-|z|^2}}\,dz.
$$

次に $y=x+ctz$ と置きます。二次元の面積要素は $dy=c^2t^2dz$ であり、

$$
\sqrt{1-|z|^2}
=\frac{\sqrt{c^2t^2-|y-x|^2}}{ct}
$$

です。したがって三次元の $tM_g$ は二次元の円板積分に変わります。

<a id="thm-hpde2-poisson-descent"></a>

<!-- formal-statement-start -->
> **定理（二次元Poisson公式とコンパクト支持解の一意性）**  
> $c>0$、$f,h\in C_c^\infty(\mathbb R^2)$ とする。$t>0$、$x\in\mathbb R^2$ で

$$
Q_g(t,x)=\frac1{2\pi c}
\int_{|y-x|<ct}
\frac{g(y)}{\sqrt{c^2t^2-|y-x|^2}}\,dy
$$

> と置く。このとき $u(t,x)=\partial_t Q_f(t,x)+Q_h(t,x)$ は二次元波動方程式

$$
u_{tt}-c^2\Delta_xu=0,\quad u(0,x)=f(x),\quad u_t(0,x)=h(x)
$$

> の滑らかな解である（$t=0$ には連続・滑らかに延長する）。各有限時間区間で空間支持が一様にコンパクトな滑らかな解のクラスでは一意である。
<!-- formal-statement-end -->

### 証明の見取り図

円板の重み $1/\sqrt{c^2t^2-|y-x|^2}$ は球面投影のJacobianから来ます。式を直接境界で微分すると見かけの発散が出るため、**固定した単位円板へ戻してから**微分します。初期条件と方程式は上で構成した三次元の解から従います。

<!-- proof-start -->
### 証明

第3座標に依存しない $\tilde g$ に対して、上の投影式と $y=x+ctz$ を使うと

$$
\begin{aligned}
tM_{\tilde g}(t,(x,0))
&=\frac t{4\pi}\cdot2
\int_{|z|<1}\frac{g(x+ctz)}{\sqrt{1-|z|^2}}\,dz\\
&=\frac{1}{2\pi c}
\int_{|y-x|<ct}
\frac{g(y)}{\sqrt{c^2t^2-|y-x|^2}}\,dy
=Q_g(t,x).
\end{aligned}
$$

$\tilde f,\tilde h$ を用いて三次元のKirchhoff構成を行えば、その解は第3座標に依存せず、

$$
u_{tt}-c^2(\partial_{x_1}^2+\partial_{x_2}^2+\partial_{x_3}^2)u
=u_{tt}-c^2\Delta_xu=0
$$

です。$t=0$ の値は三次元の初期値検算から $f,h$ になります。球面上の滑らかな関数の積分表示に戻せば、時刻微分が存在することも分かります。一意性はコンパクトな時間帯での差の二次元エネルギーに対し、[Kirchhoff公式の一意性証明](#thm-hpde2-kirchhoff)と同じ部分積分を二次元で行えば従います。この際、実際に使用する恒等式は

$$
\frac{d}{dt}\frac12\int_{\mathbb R^2}
(w_t^2+c^2|\nabla w|^2)\,dx
=\int_{\mathbb R^2}w_t(w_{tt}-c^2\Delta w)\,dx=0
$$

で、初期値零から $w=0$ と結論します。
<!-- proof-end -->

### 直接例：二次元の光円錐内部の尾

$f=0$、$h\in C_c^\infty(\mathbb R^2)$ が非負で恒等的零でなく、支持が $\overline B_R(0)$ に入るとします。$t>R/c$ なら特異な境界 $|y|=ct$ は支持に触れません。従って

$$
u(t,0)=Q_h(t,0)=
\frac1{2\pi c}\int_{|y|\le R}
\frac{h(y)}{\sqrt{c^2t^2-|y|^2}}\,dy>0.
$$

分母は支持上で正かつ有限であり、$h$ はある開集合で正なので積分が厳密に正です。三次元では同じ支持の内側に初速度を置いても $ct>R$ なら $u(t,0)=0$ でしたが、二次元では正の値が残ります。

ここでは波の伝わる速さ自体は依然として $c$ です。円板の**外**のデータは寄与しません。しかし円板の**内**のデータは寄与するため、強いHuygens性は成り立ちません。

## 5. 次元と質量項――「尾」の原因を区別する

比較の対象を同一にするため、まず平坦・massless・斉次Cauchy問題だけを並べます。

| 空間次元 | 観測値に寄与する初期位置 | 強いHuygens性 |
| --- | --- | --- |
| $n=1$ | 両端点の変位と区間内部の速度 | 成立しない |
| $n=2$ | 円板内部の初期データ | 成立しない |
| $n=3$ | 球面上の変位・法線微分・速度 | 成立する |

一次元の内部寄与は[HPDE1のd'Alembert再導出](../HPDE1/index.md#prop-hpde1-null-factorization)と[内部残響の例](../HPDE1/index.md#prop-hpde1-causal-support)に続く計算から分かり、二次元と三次元は本章で導きました。より高次元では自由な波動方程式について、奇数空間次元 $n\ge3$ で強いHuygens性が成立し、偶数空間次元で成立しないという分類が知られています。ここではその一般次元への帰納的導出を未証明の補足結果として区別し、**本章で証明した結論は $n=1,2,3$ に限ります**。

次に、空間次元を三次元のまま固定し、下位項 $m^2u$ を加えます。$m>0$ は定数とし、方程式は

$$
u_{tt}-c^2\Delta_xu+m^2u=0
$$

です。主な二階微分は同じなので光円錐を決める速度は $c$ のままですが、内部の残響が出ることを具体的に確かめます。

非斉次massless波動方程式 $v_{tt}-c^2\Delta v=F$ の初期値を零にしたとき、時刻 $s$ に発生した源 $F(s,\cdot)$ の寄与は残り時間 $t-s$ の球面平均で与えられます。$F$ が滑らかで有限時間帯の空間支持がコンパクトなら、積分と時間微分を交換して

$$
(TF)(t,x)=\int_0^t(t-s)M_{F(s,\cdot)}(t-s,x)\,ds
$$

が $P_0(TF)=F$、$(TF)|_{t=0}=(TF)_t|_{t=0}=0$ を満たします。実際、$V_{F(s)}(\tau,x)=\tau M_{F(s)}(\tau,x)$ と書けば $V_{F(s)}(0,x)=0$、$\partial_\tau V_{F(s)}(0,x)=F(s,x)$ であり、積分を二回微分すると

$$
(TF)_{tt}(t,x)=F(t,x)+\int_0^t
\partial_\tau^2V_{F(s)}(t-s,x)\,ds
=F(t,x)+c^2\Delta_x(TF)(t,x).
$$

これが**源項を持つ平坦な模型**のDuhamel表示です。後の一般時空のGreen作用素と混同せず、ここでは明示的な球面平均だけから確認できました。

<a id="prop-hpde2-massive-tail"></a>

<!-- formal-statement-start -->
> **命題（質量項が作る三次元の内部残響）**  
> $c>0$、$R>0$ とし、$h\in C_c^\infty(\mathbb R^3)$ は $h\ge0$ かつ原点の近傍で $h>0$、$\operatorname{supp}h\subset\overline B_R(0)$ とする。初期変位 $f=0$ とする。任意の $t_*>R/c$ に対し、十分小さい正の $m$ を選ぶと、方程式

$$
u_{tt}-c^2\Delta_xu+m^2u=0,\qquad u(0,x)=0,\quad u_t(0,x)=h(x)
$$

> の滑らかな解は $u(t_*,0)\ne0$ となる。従って三次元でも質量項を入れれば、一般には強いHuygens性が成り立たない。
<!-- formal-statement-end -->

### 証明の見取り図

質量項を右辺へ移せば源 $F=-m^2u$ です。massless解 $u_0=tM_h$ は時刻 $t_*$ に原点で零ですが、途中で生じた $u_0$ の波をもう一度球面平均した $Tu_0$ は正になります。小さい $m$ について差の一次項 $-m^2Tu_0$ が零でないことを示します。

<!-- proof-start -->
### 証明

$u_0(t,x)=tM_h(t,x)$ と置きます。先に示したDuhamel表示から、質量付き方程式は有限区間 $0\le t\le t_*$ で

$$
u_m=u_0-m^2Tu_m
$$

と同値です。ここで有界連続関数の一様ノルムを取ると、球面平均の絶対値は元の関数の一様ノルム以下なので

$$
\|Tw\|_{\infty,[0,t_*]}
\le\int_0^{t_*}(t_*-s)\,ds\,\|w\|_{\infty,[0,t_*]}
=\frac{t_*^2}{2}\|w\|_{\infty,[0,t_*]}.
$$

$m^2t_*^2/2<1$ なら $u\mapsto u_0-m^2Tu$ は縮小写像です。繰り返し代入により

$$
u_m=u_0-m^2Tu_0+m^4T^2u_m
$$

であり、上のノルム評価と $\|u_m\|\le\|u_0\|/(1-m^2t_*^2/2)$ から、末項は $m\downarrow0$ で $O(m^4)$ です。ここで縮小写像による連続解が滑らかであることも確かめます。球面積分の領域を $S^2$ に固定してあるので、非負整数の組 $\alpha=(\alpha_1,\alpha_2,\alpha_3)$ に対し $\partial_x^\alpha=\partial_{x_1}^{\alpha_1}\partial_{x_2}^{\alpha_2}\partial_{x_3}^{\alpha_3}$ と記せば

$
\partial_x^\alpha(Tw)=T(\partial_x^\alpha w),\qquad
\|\partial_x^\alpha u_m\|_\infty
\le\frac{\|\partial_x^\alpha u_0\|_\infty}{1-m^2t_*^2/2}.
$

実際、滑らかな $u_0$ から作る反復列の各空間微分は同じ縮小評価で一様収束するため、極限 $u_m$ は空間変数について任意回微分できます。さらに $T$ の積分を時間で微分すると、上で導いた $(Tw)_{tt}=w+c^2\Delta_x(Tw)$ と初期値零が使えます。従ってまず $u_m$ の時間二階微分が連続で、方程式 $u_{m,tt}=c^2\Delta_xu_m-m^2u_m$ と空間微分の評価を繰り返せば、混合微分を含めて滑らかになります。

$u_0(t_*,0)=0$ は[三次元massless波動の強いHuygens性](#prop-hpde2-three-dimensional-huygens)によります。他方、$u_0(s,y)=sM_h(s,y)\ge0$ です。$s=t_*/2$、$y=c(t_*-s)\omega$ と置くと $|y|=cs$ であり、半径 $cs$、中心 $y$ の球面は原点を通ります。$h$ は原点の近傍で正なので $M_h(s,y)>0$ です。この正値性は $s$ と $\omega$ の小さな変化に対して保たれるため、

$$
(Tu_0)(t_*,0)=
\int_0^{t_*}(t_*-s)
M_{u_0(s,\cdot)}(t_*-s,0)\,ds>0.
$$

ゆえに

$$
u_m(t_*,0)=-m^2(Tu_0)(t_*,0)+O(m^4)<0
$$

が十分小さい $m>0$ に対して成立します。$ct_*>R$ で初期データは球面の近傍で零なのに値が非零なので、強いHuygens性が破れます。
<!-- proof-end -->

質量のない三次元波動の公式を、$m>0$ の方程式へそのまま使ってはいけません。低階項は光円錐の形を変えずとも、**光円錐の内部の応答**を変えます。

### 曲率があるときの範囲

Lorentz計量の曲率が非零なら、係数が位置に依存する波動作用素 $\Box_g$ を考えます。一般に曲率や低階ポテンシャルによって内部の尾が生じ得ますが、**曲率が非零なら必ず強いHuygens性が破れる**という主張は正しくありません。特別な幾何・作用素で成立する場合もあります。また、masslessであることだけでも成立は保証されません。曲がった時空での作用素・因果的支持・基本解の正確な定義と構成は、後続の講義で扱います。

---

## 6. 演習：球面・円板・質量項を使い分ける

以下では特記しない限り $c>0$ です。解は滑らかな古典解とし、前節までで示した積分表示を使う場合はその滑らかさの仮定を確認してください。

### A1. 球面平均の正規化

- Level: A
- 問題：$\mathbb R^3$ の $g(y)=a+b\cdot y$（$a\in\mathbb R$、$b\in\mathbb R^3$）について $A_g(r,x)$ を求め、$A_{g,r}(0,x)$ を確認せよ。

<!-- solution-start -->
**詳細解答**

定義の被積分関数は $a+b\cdot(x+r\omega)=a+b\cdot x+r\,b\cdot\omega$ です。$S^2$ は $\omega\mapsto-\omega$ で対称だから $\int_{S^2}\omega\,d\omega=0$、また $\int_{S^2}1\,d\omega=4\pi$ です。従って

$$
A_g(r,x)=\frac{4\pi(a+b\cdot x)}{4\pi}=a+b\cdot x.
$$

$r$ に依存しないので $A_{g,r}(0,x)=0$ です。$g$ は非コンパクト台ですが球面平均の定義には問題ありません。
<!-- solution-end -->

### A2. 二次関数での補題検算

- Level: A
- 問題：$g(y)=y_1^2$ について $A_g(r,x)$ を求め、球面平均の微分恒等式の両辺を照合せよ。

<!-- solution-start -->
**詳細解答**

$g(x+r\omega)=x_1^2+2rx_1\omega_1+r^2\omega_1^2$ です。対称性から $\int\omega_1\,d\omega=0$。三座標の二乗平均は等しく、$\sum_{j=1}^3\omega_j^2=1$ なので、各々の平均は $1/3$ です。よって

$$
A_g(r,x)=x_1^2+\frac{r^2}{3}.
$$

左辺は $A_{g,rr}+(2/r)A_{g,r}=2/3+(2/r)(2r/3)=2$。右辺は $\Delta g=2$ の球面平均で $2$ です。$r>0$ で両辺が一致します。
<!-- solution-end -->

### A3. Kirchhoff公式の初速度

- Level: A
- 問題：$f=0$、$h\in C_c^\infty(\mathbb R^3)$ について $u=tM_h$ と置き、$u(0,x)$ と $u_t(0,x)$ を直接確かめよ。

<!-- solution-start -->
**詳細解答**

$u(0,x)=0\cdot M_h(0,x)=0$ です。積の微分より

$$
u_t=M_h+t(M_h)_t.
$$

連続性と球面平均の定義から $\lim_{t\downarrow0}M_h(t,x)=h(x)$ です。また $(M_h)_t$ は単位球面上の $c\nabla h\cdot\omega$ の積分として有限なので $t(M_h)_t\to0$。従って $u_t(0,x)=h(x)$ です。
<!-- solution-end -->

### A4. 光円錐を通過した後の支持

- Level: A
- 問題：$c=2$、$f,h\in C_c^\infty(\mathbb R^3)$ の支持が $\overline B_3(0)$ に入る。$|x|=5$ の観測点で、$t>4$ のとき必ず解が零になることを示せ。また $t<1$ の場合も考えよ。

<!-- solution-start -->
**詳細解答**

$t>4$ のとき $ct=2t>8=|x|+R$ です。[三次元massless波動の強いHuygens性](#prop-hpde2-three-dimensional-huygens)から $u(t,x)=0$ です。$t<1$ なら $ct<2=|x|-R$ となるので、球面上の任意の $y=x+ct\omega$ は

$$
|y|\ge|x|-ct>3.
$$

したがって $f,h,\nabla f$ がそこで零となり、[Kirchhoff公式](#thm-hpde2-kirchhoff)で $u(t,x)=0$ です。短時間では未到達、十分後では通過済みという二種類の零です。
<!-- solution-end -->

### B1. 球面の投影が作る係数

- Level: B
- 問題：$\mathbb R^2$ の滑らかな関数 $g$ の第3座標に依存しない拡張を考える。三次元の $tM_g$ を $|y-x|<ct$ 上の積分へ変換し、係数が $1/(2\pi c)$ となる理由を示せ。

<!-- solution-start -->
**詳細解答**

上下半球は $z_3=\pm\sqrt{1-|z|^2}$ で、一枚の面積倍率は $1/\sqrt{1-|z|^2}$ です。二枚合わせた面積積分を使い、

$$
tM_g(t,x)=\frac t{2\pi}
\int_{|z|<1}\frac{g(x+ctz)}{\sqrt{1-|z|^2}}\,dz.
$$

$y=x+ctz$ は二次元の変換なので $dz=dy/(c^2t^2)$、また $\sqrt{1-|z|^2}=\sqrt{c^2t^2-|y-x|^2}/(ct)$ です。代入後の係数は

$$
\frac t{2\pi}\cdot\frac1{c^2t^2}\cdot ct=\frac1{2\pi c}
$$

となります。これが[Poisson公式](#thm-hpde2-poisson-descent)の $Q_g$ です。
<!-- solution-end -->

### B2. 二次元での厳密な残響

- Level: B
- 問題：$c=1$、$f=0$、$h\in C_c^\infty(\mathbb R^2)$ は非負で零でなく、$\operatorname{supp}h\subset\overline B_2(0)$ とする。$t>2$ のとき $u(t,0)>0$ を示し、同じ半径の支持を持つ三次元の初速度では何が異なるか述べよ。

<!-- solution-start -->
**詳細解答**

[二次元Poisson公式とコンパクト支持解の一意性](#thm-hpde2-poisson-descent)から

$$
u(t,0)=\frac1{2\pi}\int_{|y|\le2}
\frac{h(y)}{\sqrt{t^2-|y|^2}}\,dy.
$$

$t>2$ なので分母は支持上で $0<\sqrt{t^2-|y|^2}\le t$ です。$h$ は連続・非負で恒等的零でないから、ある開球内で厳密に正です。よって積分も正です。一方、三次元では半径 $t>2$ の球面は支持へ触れず、[Kirchhoff公式](#thm-hpde2-kirchhoff)の球面積分は零です。円板と球面の違いが結論を分けます。
<!-- solution-end -->

### B3. 質量項による時間発展の変化

- Level: B
- 問題：空間的に一定の関数 $u(t,x)=a(t)$ を $\partial_t^2-c^2\Delta_x+m^2$（$m>0$）へ代入する。初期値 $a(0)=0$、$a'(0)=1$ の解を求め、$m\to0$ でmassless解と比較せよ。この例だけでは強いHuygens性の反例にならない理由も述べよ。

<!-- solution-start -->
**詳細解答**

空間微分が零なので $a''+m^2a=0$ です。一般解 $a=A\cos(mt)+B\sin(mt)$ に初期条件を入れると $A=0$、$Bm=1$。従って

$$
a(t)=\frac{\sin(mt)}m
=t-\frac{m^2t^3}{6}+O(m^4t^5)
$$

です。$m\to0$ で $a(t)\to t$、massless方程式の空間一定初速度解と一致します。ただし初速度 $h\equiv1$ はコンパクト台でなく、観測球面上でも非零です。「球面の近くが零なのに観測値が非零」という反例にはなっていません。本当の内部尾は[質量項の命題](#prop-hpde2-massive-tail)のようにコンパクト台データで検証します。
<!-- solution-end -->

### C1. Huygens性を三つの模型で判定する

- Level: C
- 問題：$c=1$、$R>0$、$f=0$ とし、それぞれの $\mathbb R^n$ 上の $h\in C_c^\infty$ が $h\ge0$、原点近傍で $h>0$、$\operatorname{supp}h\subset\overline B_R(0)$ を満たすとする。

  1. $n=1$ で $t>R$ の $u(t,0)$ を求め、尾の有無を判定せよ。
  2. $n=2$ で同じ時刻の $u(t,0)$ を積分で示し、符号を決定せよ。
  3. $n=3$ のmassless模型で $u(t,0)$ を求めよ。
  4. $n=3$ のmassive模型では、$u_m=u_0-m^2Tu_m$ と球面平均の幾何を用い、$m>0$ が十分小さいときの $u_m(t,0)$ の符号を論証せよ。

<!-- solution-start -->
**詳細解答**

(1) [HPDE1のd'Alembert公式の導出](../HPDE1/index.md#prop-hpde1-null-factorization)で $f=0$ とすれば、$t>R$ に対して

$$
u(t,0)=\frac12\int_{-t}^th(y)\,dy
=\frac12\int_{-R}^Rh(y)\,dy>0.
$$

$h$ は正となる開区間を持つので積分は正です。固定点で内部尾が残ります。

(2) [二次元Poisson公式とコンパクト支持解の一意性](#thm-hpde2-poisson-descent)より

$$
u(t,0)=\frac1{2\pi}\int_{|y|\le R}
\frac{h(y)}{\sqrt{t^2-|y|^2}}\,dy>0.
$$

$t>R$ より分母は正で有限、正値性は (1) と同じ理由です。ただし時間が増すと重みが変わる点は、一次元の一定の尾とは異なります。

(3) [三次元Kirchhoff公式](#thm-hpde2-kirchhoff)では

$$
u_0(t,0)=\frac{t}{4\pi}\int_{S^2}h(t\omega)\,d\omega=0,
$$

なぜなら $|t\omega|=t>R$ で、球面全体が支持の外にあるからです。

(4) $u_0(s,y)=sM_h(s,y)\ge0$ です。源項の積分演算 $T$ を用いると、

$$
u_m(t,0)=u_0(t,0)-m^2(Tu_0)(t,0)+m^4(T^2u_m)(t,0).
$$

ここで $s=t/2$、$y=(t-s)\omega$ のとき半径 $s$ の球面 $S_s(y)$ は原点を通り、$h$ は原点近傍で正だから $M_h(s,y)>0$。この性質は $s$ の近傍で継続し、$(Tu_0)(t,0)>0$ です。一方、本文の評価 $\|T\|\le t^2/2$ と $m^2t^2/2<1$ を使うと $m^4(T^2u_m)(t,0)=O(m^4)$ です。(3) から $u_0(t,0)=0$ であるため

$$
u_m(t,0)=-m^2(Tu_0)(t,0)+O(m^4)<0
$$

が十分小さい正の $m$ で成立します。二階の最高階微分項・伝播速度は変わらなくても、質量項が内部尾を生じることが分かります。
<!-- solution-end -->

---

## 7. 次の理論への接続

三次元の平坦なmassless模型では、波の支持が過去光円錐の**面**に集中するという、有限伝播より強い性質を具体的に証明しました。二次元・一次元では円錐内部の情報が効き、三次元でも質量項によりこの性質は失われ得ます。したがって幾何的な光円錐と、作用素の解がどこに非零値を持つかを同一視してはいけません。

この章の球面平均は初期値解を与えましたが、後の**基本解**では点状の源をどう扱い、分布の意味で作用素を逆にするかが問題になります。そこへ進むため、次章では時空上の分布・試験切断・体積密度と、支持条件を正確に整えます。
