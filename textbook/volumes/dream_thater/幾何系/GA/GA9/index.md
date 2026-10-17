# GA9 幾何的非線形楕円PDEと臨界現象

## 1. 幾何から生まれた方程式はどこで線形理論を離れるか

[VAR7の極小グラフ方程式](../../../解析系/VAR/VAR7/index.md#thm-var7-minimal-graph-equation)では、グラフの面積を停留させると未知関数の勾配が係数にも現れました。一方、[GA8の調和写像](../GA8/index.md#def-ga8-tension)では値域制約が非線形性を作りました。どちらも「二階微分を含む」というだけでは、線形Poisson方程式の存在・正則性定理をそのまま適用できません。

本章では、まず係数行列を自分で計算して楕円性を判定します。次に、[GA2のSobolev埋め込み](../GA2/index.md#thm-ga2-embedding)の指数が最大値に達すると、収束するはずの列が一点へ集中してしまう様子を計算します。最後に、その臨界指数を持つYamabe型の変分方程式を導きます。

極小グラフの議論では $d\ge2$、$\Omega\subset\mathbb R^d$ を有界な連結Lipschitz領域とし、$u$ は指定した箇所では $C^2(\Omega)$、境界を論じるときは必要に応じて $C^1(\overline\Omega)$ とします。$D$ はEuclid勾配、$\operatorname{div}$ はEuclid発散です。多様体の集中列を扱う節では別に滑らかなコンパクト・境界なし $d$ 次元Riemann多様体を指定します。

## 2. 極小グラフの線形化と楕円性

高さ関数 $u$ のグラフの面積密度は $\sqrt{1+|Du|^2}$ です。ここでは面積変分そのものは再証明せず、上記の[VAR7の定理](../../../解析系/VAR/VAR7/index.md#thm-var7-minimal-graph-equation)を出発点とします。微分方程式は

$$
\operatorname{div}F(Du)=0,\qquad
F(p)=\frac{p}{\sqrt{1+|p|^2}}\quad(p\in\mathbb R^d).
$$

$F$ は勾配を流束へ変える写像です。線形方程式なら流束は $Ap$ と一定の行列で表されますが、ここでは勾配 $p$ 自身によって流束の変化率が変わります。そこで $F$ を $p$ で微分します。

<a id="def-ga9-flux-jacobian"></a>

<!-- formal-statement-start -->
> **定義（極小グラフ流束の線形化係数）**  
> $d\ge2$、$F:\mathbb R^d\to\mathbb R^d$ を $F(p)=p/\sqrt{1+|p|^2}$ とする。流束のJacobian行列 $A(p)=DF(p)$ を、成分表示で

$$
A_{ij}(p)=\frac{\partial F_i}{\partial p_j}(p)
=\frac{\delta_{ij}}{\sqrt{1+|p|^2}}
-\frac{p_i p_j}{(1+|p|^2)^{3/2}}
$$

> と定める。これは対称な $d\times d$ 行列である。
<!-- formal-statement-end -->

この式は計算結果をただ置いたものではありません。$w(p)=\sqrt{1+|p|^2}$ とおくと

$$
\partial_{p_j}w=\frac{p_j}{w},\qquad
\partial_{p_j}\bigl(p_iw^{-1}\bigr)
=\delta_{ij}w^{-1}-p_iw^{-2}\frac{p_j}{w}
$$

となり、上の二項が出ます。$p$ が変化する方向 $\xi$ への $F$ の一次変化は $DF(p)\xi=A(p)\xi$ です。

<!-- definition-example-start: def-ga9-flux-jacobian -->
**定義の確認**（傾いた平面）：$d=2$、$p=(a,0)$ なら行列は対角となり、

$$
A(a,0)=
\begin{pmatrix}
(1+a^2)^{-3/2}&0\\
0&(1+a^2)^{-1/2}
\end{pmatrix}.
$$

実際、第一成分 $F_1(a,0)=a(1+a^2)^{-1/2}$ の $a$ 微分は $(1+a^2)^{-3/2}$ です。横方向へ $p_2$ を動かすと第一成分の一次変化は零、第二成分の変化率は $(1+a^2)^{-1/2}$。従ってJacobianの各成分を直接検証できます。
<!-- definition-example-end -->

### 楕円性は勾配の大きさで変わる

「楕円型」という語を判定に使うため、まず二階作用素の最高階部分の係数を調べます。対称行列 $B(x)$ が、ある定数 $0<\lambda\le\Lambda<\infty$ に対して全ての点 $x$ と $\xi\in\mathbb R^d$ で

$$
\lambda|\xi|^2\le \xi^{\mathsf T}B(x)\xi
\le\Lambda|\xi|^2
$$

を満たすとき、その係数を**一様楕円的**と判定します。これは係数行列による二次形式が、全方向で同じ正の下界を持つという条件です。点ごとの正定値性だけでは一様性は出ません。

<a id="thm-ga9-ellipticity"></a>

<!-- formal-statement-start -->
> **定理（極小グラフ流束の楕円性）**  
> $d\ge2$、$F(p)=p/\sqrt{1+|p|^2}$、$A(p)=DF(p)$ とする。$A(p)$ の固有値は $p\ne0$ に平行な方向で $(1+|p|^2)^{-3/2}$、直交方向で $(1+|p|^2)^{-1/2}$ である。$p=0$ ではすべての固有値が $1$ である。従って全 $p,\xi\in\mathbb R^d$ について

$$
(1+|p|^2)^{-3/2}|\xi|^2
\le \xi^{\mathsf T}A(p)\xi
\le(1+|p|^2)^{-1/2}|\xi|^2.
$$

> 特に $|Du(x)|\le K$ が $\Omega$ 全域で成り立てば $A(Du(x))$ は下界 $(1+K^2)^{-3/2}$、上界 $1$ で一様楕円的である。$p$ を全 $\mathbb R^d$ に動かした場合は正の一様下界は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

勾配と平行な方向と直交する方向に分ければ、行列の全成分から固有方程式を解く必要はありません。最も小さい固有値が $|p|\to\infty$ で零へ近づくことが、線形理論との差です。

<!-- proof-start -->
### 証明

$p\ne0$ とし、$e=p/|p|$ を単位ベクトルとします。任意の $\xi\in\mathbb R^d$ を

$$
\xi=\alpha e+\eta,\qquad e\cdot\eta=0
$$

と一意に分解します。[線形化係数の定義](#def-ga9-flux-jacobian)を使うと

$$
A(p)\xi
=\frac{\alpha e+\eta}{\sqrt{1+|p|^2}}
-\frac{|p|^2\alpha e}{(1+|p|^2)^{3/2}}.
$$

$e$ にかかる係数を同じ分母にそろえると

$$
\frac1{\sqrt{1+|p|^2}}
-\frac{|p|^2}{(1+|p|^2)^{3/2}}
=\frac1{(1+|p|^2)^{3/2}}.
$$

従って

$$
A(p)\xi
=(1+|p|^2)^{-3/2}\alpha e
+(1+|p|^2)^{-1/2}\eta.
$$

ここで $\xi\cdot\eta=|\eta|^2$、$\xi\cdot e=\alpha$ を用いると

$$
\xi^{\mathsf T}A(p)\xi
=(1+|p|^2)^{-3/2}\alpha^2
+(1+|p|^2)^{-1/2}|\eta|^2.
$$

$\alpha^2+|\eta|^2=|\xi|^2$ だから主張の上下界を得ます。$p=0$ は $A(0)=I$ より従います。

$|Du|\le K$ なら最小固有値は $(1+|Du|^2)^{-3/2}\ge(1+K^2)^{-3/2}$、最大固有値は $1$ 以下です。逆に $p=Re_1$、$\xi=e_1$ と置くと二次形式の値は $(1+R^2)^{-3/2}\to0$。どの正の一様下界も破られます。
<!-- proof-end -->

### 方程式とその線形化を区別する

$u\in C^2(\Omega)$ に対して連鎖律を使うと

$$
\begin{aligned}
\operatorname{div}F(Du)
&=\sum_{i=1}^d\partial_i F_i(Du)\\
&=\sum_{i,j=1}^d\frac{\partial F_i}{\partial p_j}(Du)\,\partial_i\partial_j u\\
&=\sum_{i,j=1}^d A_{ij}(Du)\,u_{ij}.
\end{aligned}
$$

従って非発散形では、最高階微分の係数は $A(Du)$ です。ただし**非発散形の係数と、線形化作用素そのものは同一ではありません**。解 $u$ を $u+t\varphi$ に動かすと、

$$
\begin{aligned}
\left.\frac{d}{dt}\operatorname{div}F(Du+tD\varphi)\right|_{t=0}
&=\operatorname{div}\bigl(DF(Du)D\varphi\bigr)\\
&=\operatorname{div}\bigl(A(Du)D\varphi\bigr).
\end{aligned}
$$

この発散形を展開すれば係数 $A(Du)$ の微分による一階項も現れます。定数勾配の解 $u(x)=a\cdot x+b$ なら $A(a)$ は定数なので、その線形化は $\sum_{ij}A_{ij}(a)\varphi_{ij}$ です。

<a id="thm-ga9-linearization"></a>

<!-- formal-statement-start -->
> **定理（極小グラフ方程式の線形化）**  
> $\Omega\subset\mathbb R^d$ を開集合、$u\in C^3(\Omega)$、$\varphi\in C_c^\infty(\Omega)$ とする。非線形作用素 $\mathcal M(u)=\operatorname{div}F(Du)$ の $u$ における方向微分は

$$
D\mathcal M(u)[\varphi]
=\operatorname{div}\!\left(A(Du)D\varphi\right).
$$

> $|Du|\le K$ が成り立つ領域では、その二階主係数は一様楕円的である。
<!-- formal-statement-end -->

この定理の微分計算は上に示しました。$u$ が解であるかどうかは線形化公式自体には不要です。解に沿って摂動を調べる場合に $D\mathcal M(u)[\varphi]=0$ が一次近似の方程式となります。

## 3. 弱形式と境界条件で残る非線形性

滑らかな解の方程式は、発散形なので試験関数との積分へ移せます。ここで試験関数を境界で零にする理由は、境界項を消すためです。$H_0^1(\Omega)$ は[GPDE5で定義した零トレース型の空間](../../../解析系/GPDE/GPDE5/index.md#def-gpde5-w01p)であり、$C_c^\infty(\Omega)$ の $H^1$ 閉包です。

<a id="def-ga9-weak-minimal-graph"></a>

<!-- formal-statement-start -->
> **定義（極小グラフの弱解）**  
> $\Omega\subset\mathbb R^d$ を有界Lipschitz領域とする。$u\in W^{1,2}(\Omega)$ が極小グラフ方程式の弱解であるとは、任意の $\varphi\in C_c^\infty(\Omega)$ に対して

$$
\int_\Omega\frac{Du\cdot D\varphi}{\sqrt{1+|Du|^2}}\,dx=0
$$

> が成り立つことをいう。Dirichlet境界値 $h\in W^{1,2}(\Omega)$ を指定するときは、さらに $u-h\in H_0^1(\Omega)$ を課す。
<!-- formal-statement-end -->

$|F(p)|\le1$ なので、$\Omega$ が有界なら $F(Du)$ は $L^2$ に属します。従って試験空間を $H_0^1(\Omega)$ まで広げても内積の積分は有限であり、密度から同じ等式が成立します。滑らかな $u$ の場合は積分を部分積分し、[VAR7の方程式](../../../解析系/VAR/VAR7/index.md#thm-var7-minimal-graph-equation)と同値です。

<!-- definition-example-start: def-ga9-weak-minimal-graph -->
**定義の確認**（傾いた平面）：$u(x)=a\cdot x+b$ とし、$h=u$ と置きます。$u-h=0\in H_0^1(\Omega)$ でDirichlet条件を満たします。任意の $\varphi\in C_c^\infty(\Omega)$ に対して $F(Du)=F(a)$ は定数だから

$$
\int_\Omega F(a)\cdot D\varphi\,dx
=\sum_i F_i(a)\int_\Omega\partial_i\varphi\,dx=0.
$$

最後の各積分は試験関数を零延長して一変数ごとに積分すれば零です。弱解の**全試験関数に対する積分条件**と境界条件の両方を確認しました。
<!-- definition-example-end -->

<a id="prop-ga9-weak-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（同じDirichlet値を持つ弱極小グラフの一意性）**  
> $\Omega\subset\mathbb R^d$ を有界な連結Lipschitz領域とする。$u,v\in W^{1,2}(\Omega)$ がそれぞれ上の弱形式を満たし、$u-v\in H_0^1(\Omega)$ なら、$u=v$ がほとんど至る所で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

流束 $F$ は非線形ですが、$F$ のJacobianがすべての有限 $p$ で正定値なので、二点間の差に沿って積分すれば厳密な単調性が出ます。二つの弱方程式を引き算するのが要点です。

<!-- proof-start -->
### 証明

任意の $p,q\in\mathbb R^d$ に対し $s\mapsto F(q+s(p-q))$ を $0\le s\le1$ で微分し、微積分の基本定理を使います。

$$
F(p)-F(q)
=\int_0^1 A(q+s(p-q))(p-q)\,ds.
$$

従って $p\ne q$ なら[楕円性の定理](#thm-ga9-ellipticity)により

$$
(F(p)-F(q))\cdot(p-q)
=\int_0^1(p-q)^{\mathsf T}A(q+s(p-q))(p-q)\,ds>0.
$$

$w=u-v\in H_0^1(\Omega)$ を試験関数にします。定義直後に説明した密度を用い、二つの弱形式を差し引くと

$$
0=\int_\Omega \bigl(F(Du)-F(Dv)\bigr)\cdot(Du-Dv)\,dx.
$$

被積分関数は非負、しかも $Du\ne Dv$ なら正です。よって $Du=Dv$ がほとんど至る所で成り立ちます。$w\in H_0^1(\Omega)$ に[GPDE5のPoincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)を適用すれば $\|w\|_{L^2}\le C\|Dw\|_{L^2}=0$。従って $u=v$ です。
<!-- proof-end -->

一意性と存在は別です。面積の被積分関数は $|p|\to\infty$ で $\sqrt{1+|p|^2}\sim|p|$ と**一次成長**します。そのため $\int_\Omega\sqrt{1+|Du|^2}$ の有界性だけから $\|Du\|_{L^2}$ の一様有界性は得られません。線形楕円問題で使った $H^1$ の強制性を、何も確認せず流用するのは誤りです。存在論には別の関数空間・障害の検討が必要になります。

**境界条件の違い。** $u\in C^2(\overline\Omega)$、$\varphi\in C^1(\overline\Omega)$ に対しては

$$
\int_\Omega F(Du)\cdot D\varphi\,dx
=-\int_\Omega\operatorname{div}F(Du)\,\varphi\,dx
+\int_{\partial\Omega}\varphi\,F(Du)\cdot\nu\,dS.
$$

境界の高さを固定すると $\varphi|_{\partial\Omega}=0$。高さを自由に動かすなら自然境界条件 $F(Du)\cdot\nu=0$ が必要です。後者は任意の幾何学的自由境界条件と同一ではなく、**グラフの高さ変分を許した**場合の条件です。

## 4. Sobolev指数の端点で何が壊れるか

次は方程式の係数ではなく、非線形の変分問題で極限を取る際の障害です。$d\ge3$ の[GA2の埋め込み定理](../GA2/index.md#thm-ga2-embedding)は $H^1(M)$ から $L^q(M)$ への連続埋め込みを $2\le q\le 2d/(d-2)$ まで保証します。しかしその端点で強収束部分列を取れるとは言っていません。

臨界指数を覚える代わりに、どの指数で縮尺変換がノルムを変えなくなるか計算します。$\eta\in C_c^\infty(B_1(0))$ を零でない実数値関数とし、$x_0\in\mathbb R^d$、$\varepsilon>0$ に対して

$$
v_\varepsilon(x)
=\varepsilon^{-(d-2)/2}\eta\!\left(\frac{x-x_0}{\varepsilon}\right)
$$

とします。台は $B_\varepsilon(x_0)$ に入ります。

<a id="def-ga9-critical-exponent"></a>

<!-- formal-statement-start -->
> **定義（Sobolev臨界指数）**  
> 次元 $d\ge3$ に対して

$$
2^*=\frac{2d}{d-2}
$$

> を $H^1$ に対するSobolev臨界指数と呼ぶ。$\mathbb R^d$ の微分を二乗するノルムに合わせた拡大縮小 $v_\varepsilon(x)=\varepsilon^{-(d-2)/2}\eta((x-x_0)/\varepsilon)$ では、$L^{2^*}$ ノルムと $\dot H^1$ の勾配ノルムがともに変わらない。
<!-- formal-statement-end -->

**直接計算による確認。** $y=(x-x_0)/\varepsilon$ と置くと、各 $i$ について連鎖律から

$$
\partial_i v_\varepsilon(x)
=\varepsilon^{-d/2}(\partial_i\eta)(y),\qquad dx=\varepsilon^d\,dy.
$$

従って

$$
\int_{\mathbb R^d}|Dv_\varepsilon|^2\,dx
=\varepsilon^{-d}\varepsilon^d\int_{\mathbb R^d}|D\eta|^2\,dy
=\int_{\mathbb R^d}|D\eta|^2\,dy.
$$

一方、任意の $q\ge1$ について

$$
\int_{\mathbb R^d}|v_\varepsilon|^q\,dx
=\varepsilon^{d-q(d-2)/2}\int_{\mathbb R^d}|\eta|^q\,dy.
$$

指数が零になる条件 $d-q(d-2)/2=0$ を解くと、ちょうど $q=2d/(d-2)$ です。$L^2$ ノルムの二乗には $\varepsilon^2$ が掛かります。この**勾配は失われないが質量の台は縮む**という両立が集中の原因です。

<!-- definition-example-start: def-ga9-critical-exponent -->
**定義の確認**：$d=3$ では $2^*=6$、$v_\varepsilon=\varepsilon^{-1/2}\eta((x-x_0)/\varepsilon)$ です。$\int|v_\varepsilon|^6=\int|\eta|^6$、$\int|Dv_\varepsilon|^2=\int|D\eta|^2$、$\int|v_\varepsilon|^2=\varepsilon^2\int|\eta|^2$ をそれぞれ変数変換で得ます。$d=4$ では $2^*=4$、同様に振幅は $\varepsilon^{-1}$ となります。
<!-- definition-example-end -->

<a id="thm-ga9-concentration"></a>

<!-- formal-statement-start -->
> **定理（臨界Sobolev埋め込みの非コンパクト性）**  
> $d\ge3$、$(M^d,g)$ を滑らかなコンパクト・境界なしRiemann多様体とする。任意の点 $x_0\in M$ の周りに、$H^1(M)$ で有界かつ弱収束先が $0$ である滑らかな関数列 $(v_n)$ で、$\|v_n\|_{L^{2^*}(M)}$ が零へ収束しないものが存在する。従って埋め込み $H^1(M)\hookrightarrow L^{2^*}(M)$ はコンパクトではない。
<!-- formal-statement-end -->

### 証明の見取り図

小さな座標球の中に先ほどの $\eta$ を置き、台を一点へ縮小します。計量と体積密度が座標中心ではEuclid計量に近づくことを計算すれば、端点ノルムが残ることを確認できます。

<!-- proof-start -->
### 証明

$x_0$ を中心とする滑らかな正規座標 $x=(x^1,\ldots,x^d)$ を取り、$x_0$ が原点、$g^{ij}(0)=\delta^{ij}$、$\sqrt{\det g(0)}=1$ となるようにします。十分小さい $\varepsilon>0$ で $B_\varepsilon(0)$ が座標近傍に含まれるとき、この球内で

$$
v_\varepsilon(x)=\varepsilon^{-(d-2)/2}\eta(x/\varepsilon)
$$

とし、球外は零に延長します。$\eta$ の台は $B_1$ の内部にコンパクトに含まれるため、延長後も $M$ 上滑らかです。

座標式 $|Dv|_g^2=g^{ij}\partial_i v\,\partial_jv$、$dV_g=\sqrt{\det g(x)}\,dx$ と上の連鎖律を代入して

$$
\begin{aligned}
\int_M|Dv_\varepsilon|_g^2\,dV_g
&=\int_{B_1}g^{ij}(\varepsilon y)
\,\partial_i\eta(y)\partial_j\eta(y)
\sqrt{\det g(\varepsilon y)}\,dy,\\
\int_M|v_\varepsilon|^{2^*}\,dV_g
&=\int_{B_1}|\eta(y)|^{2^*}
\sqrt{\det g(\varepsilon y)}\,dy,\\
\int_M|v_\varepsilon|^2\,dV_g
&=\varepsilon^2\int_{B_1}|\eta(y)|^2
\sqrt{\det g(\varepsilon y)}\,dy.
\end{aligned}
$$

$g^{ij}$ と $\sqrt{\det g}$ は座標球上で連続であり、小球で一様に有界です。$y\in B_1$ に対して $\varepsilon y\to0$ は一様ですから、各積分で極限を取ることができ、

$$
\begin{aligned}
\int_M|Dv_\varepsilon|_g^2\,dV_g&\longrightarrow\int_{B_1}|D\eta|^2\,dy,\\
\int_M|v_\varepsilon|^{2^*}\,dV_g&\longrightarrow\int_{B_1}|\eta|^{2^*}\,dy>0,\\
\int_M|v_\varepsilon|^2\,dV_g&\longrightarrow0.
\end{aligned}
$$

従って $v_\varepsilon$ は $H^1(M)$ で有界です。$v_\varepsilon\rightharpoonup0$ も確認します。$H^1(M)$ はHilbert空間なので有界列の各部分列から弱収束部分列を選べます。弱極限は $L^2$ にも弱収束しますが、上式では全列が $L^2$ 強収束しているため、弱極限は必ず $0$ です。もし全列の弱収束が成立しないなら、ある連続線形汎関数と差が零から離れる部分列があり、その部分列に弱収束部分列を取ると矛盾します。従って任意の $\varepsilon_n\downarrow0$ で $v_{\varepsilon_n}\rightharpoonup0$ です。

もし端点埋め込みがコンパクトなら $L^{2^*}$ 強収束部分列が取れます。その極限は $L^2$ 強収束の極限と両立しなければならず、有限体積の $M$ 上で $L^{2^*}\hookrightarrow L^2$ だから零です。しかし $L^{2^*}$ ノルムは正の極限を持ち矛盾します。
<!-- proof-end -->

$d=2$ では $2^*$ を有限の数として定義できません。第4節の振幅 $\varepsilon^{-(d-2)/2}$ は $1$ となり、勾配ノルムは不変でも、任意の有限 $q$ で $L^q$ ノルムは縮小とともに零へ向かいます。二次元の指数的な端点問題は本章の射程外です。

## 5. 臨界指数を持つYamabe型方程式への入口

極小グラフでは非線形性が**最高階微分の係数**を変えました。これに対し、Riemann多様体上のスカラー曲率問題では、最高階は線形のLaplace作用素のままでも、**べき乗非線形性と臨界埋め込み**が極限操作を難しくします。

ここで $d\ge3$ の滑らかなコンパクト・境界なし多様体 $(M,g)$ を固定します。$R_g$ は[GEO16で定義したスカラー曲率](../../GEO/GEO16/index.md#def-geo16-ricci-scalar)、すなわちRicci曲率の計量による跡です。$R_g$ はこの節では固定した連続関数として扱います。正の滑らかな関数 $v$ を変数に取り、$c_d=4(d-1)/(d-2)$ と置きます。

<a id="def-ga9-yamabe-quotient"></a>

<!-- formal-statement-start -->
> **定義（Yamabe型変分商）**  
> $d\ge3$、$(M,g)$ を滑らかなコンパクト・境界なしRiemann多様体、$R_g$ をそのスカラー曲率とする。正の滑らかな関数 $v$ に対して

$$
Q_g(v)=
\frac{\displaystyle\int_M
\left(c_d|Dv|_g^2+R_gv^2\right)\,dV_g}
{\displaystyle\left(\int_Mv^{2^*}\,dV_g\right)^{2/2^*}},
\qquad c_d=\frac{4(d-1)}{d-2}
$$

> をYamabe型変分商と呼ぶ。ここで $2^*=2d/(d-2)$ は前節の臨界指数である。
<!-- formal-statement-end -->

分母は $v>0$ なので正です。$R_g$ は符号を変えることがあるため、$Q_g(v)\ge0$ と一般には断定しません。$Q_g(av)=Q_g(v)$（$a>0$）なので、この商は関数の全体的な倍率に依存しません。

<!-- definition-example-start: def-ga9-yamabe-quotient -->
**定義の確認**（定数関数）：$v(x)=a>0$ なら $Dv=0$ です。$V=\operatorname{Vol}_g(M)$、$S=\int_MR_g\,dV_g$ と置くと

$$
Q_g(a)=\frac{a^2S}{(a^{2^*}V)^{2/2^*}}
=\frac{S}{V^{(d-2)/d}}.
$$

$a$ が消え、倍率不変性を直接確認できます。特に $R_g$ が定数 $R_0$ なら $Q_g(a)=R_0V^{2/d}$ です。
<!-- definition-example-end -->

<a id="prop-ga9-yamabe-euler"></a>

<!-- formal-statement-start -->
> **命題（Yamabe型変分商の停留方程式）**  
> $d\ge3$、$(M,g)$ を滑らかなコンパクト・境界なしRiemann多様体とする。正の滑らかな $v$ が上の $Q_g$ のあらゆる滑らかな変分に対して停留するなら、ある実数 $\lambda$ が存在して

$$
-c_d\Delta_gv+R_gv=\lambda v^{(d+2)/(d-2)}
$$

> が各点で成立する。逆にこの方程式を満たす正の滑らかな $v$ は $Q_g$ の停留点である。$\Delta_g=\operatorname{div}_g\nabla_g$ は非正符号とする。
<!-- formal-statement-end -->

### 証明の見取り図

分子は二次式、分母は $2^*$ 次の積分を $2/2^*$ 乗した式です。それぞれ方向微分し、[GA1のGreen公式](../GA1/index.md#thm-ga1-green-first)で勾配項を部分積分します。未知の定数は商の値を吸収します。

<!-- proof-start -->
### 証明

$N(v)=\int_M(c_d|Dv|^2+R_gv^2)\,dV_g$、$I(v)=\int_Mv^{2^*}\,dV_g>0$ と置き、任意の $\varphi\in C^\infty(M)$ に対する $v+t\varphi$ を考えます。$v$ は正、$M$ はコンパクトなので十分小さい $t$ では $v+t\varphi>0$ が保たれます。直接微分して

$$
\begin{aligned}
N'(v)[\varphi]
&=2\int_M(c_d\langle Dv,D\varphi\rangle_g+R_gv\varphi)\,dV_g\\
&=2\int_M(-c_d\Delta_gv+R_gv)\varphi\,dV_g,\\
I'(v)[\varphi]
&=2^*\int_Mv^{2^*-1}\varphi\,dV_g.
\end{aligned}
$$

二行目は閉多様体で境界項がない[GA1のGreen第一公式](../GA1/index.md#thm-ga1-green-first)です。商 $Q_g=N I^{-2/2^*}$ の積・連鎖律を展開すると

$$
\begin{aligned}
Q'_g(v)[\varphi]
&=I^{-2/2^*}N'
-\frac2{2^*}N I^{-2/2^*-1}I'\\
&=2I^{-2/2^*}\int_M
\left[-c_d\Delta_gv+R_gv-\frac{N(v)}{I(v)}v^{2^*-1}\right]\varphi\,dV_g.
\end{aligned}
$$

任意の滑らかな $\varphi$ で零なら、角括弧内は連続であることから各点で零です。ここで

$$
\lambda=\frac{N(v)}{I(v)},\qquad
2^*-1=\frac{2d-(d-2)}{d-2}=\frac{d+2}{d-2}
$$

を代入して方程式を得ます。逆にこの形の方程式を満たす $v$ に両辺 $v$ を掛けて積分すると $N(v)=\lambda I(v)$ です。これを方向微分の式に戻せば $Q'_g(v)[\varphi]=0$ を得ます。
<!-- proof-end -->

この変分商が実際の定数スカラー曲率計量と結び付くには、共形計量 $\widetilde g=v^{4/(d-2)}g$ の曲率変換公式が必要です。ここでは**その変換公式の完全導出、最小値達成、正の解の存在、一意性を証明していません**。本節で証明したのは、この臨界指数を持つ変分商のEuler--Lagrange方程式です。集中列の存在から「連続埋め込みがあるから最小化列も強収束する」という推論が許されないことが分かります。

## 6. 幾何学的流れへ進むときに変わる対象

[VAR8の平均曲率線形化](../../../解析系/VAR/VAR8/index.md#prop-var8-jacobi-linearization)は、曲面を法線方向へ動かしたときの作用素を与えました。曲面の時間発展では、例えばグラフの平均曲率流を（時間・法線の符号をこの表示に合わせて）次のように書きます。

$$
\partial_tu=\sqrt{1+|Du|^2}\,
\operatorname{div}\left(\frac{Du}{\sqrt{1+|Du|^2}}\right).
$$

二階微分の主係数は $wA(Du)$（$w=\sqrt{1+|Du|^2}$）となるため、方向 $Du$ に平行な固有値は $(1+|Du|^2)^{-1}$、直交方向の固有値は $1$ です。$|Du|$ を一様に抑えられれば放物型の一様性が得られますが、大勾配では退化し得ます。この計算だけでは流れの一般短時間存在や特異点分類は証明できません。

Ricci流は高さ関数でなく計量テンソル $g(t)$ を未知量とし、$\partial_tg=-2\operatorname{Ric}(g)$ を考えます。座標変換（微分同相）で同じ幾何を異なる成分として表せるため、楕円方程式の係数計算だけでは解決しないゲージの問題が生じます。完全なRicci流の存在理論も本章では扱いません。

ここまでの区別は三つです。極小グラフは**勾配依存の主係数**、Yamabe型問題は**臨界べき乗と非コンパクト性**、幾何学的流れは**時間発展と座標自由度**が、線形の楕円型方程式にはない新しい障害です。

## 7. 演習

### Level A：定義と係数を自分の手で判定する

<a id="ex-ga9-a01"></a>
#### GA9-A01 二方向の固有値
- Level: A

$d=2$、$p=(3,0)$ とする。$A(p)$ と固有値、最小・最大固有値を求めよ。

<!-- solution-start -->
**詳細解答**

[流束Jacobianの定義](#def-ga9-flux-jacobian)へ $1+|p|^2=10$ を代入すると

$$
A(3,0)=
\begin{pmatrix}
10^{-1/2}-9\cdot10^{-3/2}&0\\
0&10^{-1/2}
\end{pmatrix}
=
\begin{pmatrix}
10^{-3/2}&0\\
0&10^{-1/2}
\end{pmatrix}.
$$

従って $e_1$ 方向の固有値が $10^{-3/2}$、$e_2$ 方向は $10^{-1/2}$ です。$10>1$ なので前者が最小、後者が最大です。正定値ですが、傾斜を増やすと最小固有値は小さくなります。
<!-- solution-end -->

<a id="ex-ga9-a02"></a>
#### GA9-A02 平坦な解の線形化
- Level: A

$\Omega\subset\mathbb R^2$ で $u(x,y)=ax+b$ とする。$u$ が極小グラフ方程式を満たすことを確認し、線形化 $D\mathcal M(u)[\varphi]$ を求めよ。

<!-- solution-start -->
**詳細解答**

$Du=(a,0)$ は定数なので $F(Du)$ も定数で、$\operatorname{div}F(Du)=0$ です。[線形化の定理](#thm-ga9-linearization)で $A(Du)$ は定数行列だから

$$
D\mathcal M(u)[\varphi]
=\partial_x\!\left((1+a^2)^{-3/2}\varphi_x\right)
+\partial_y\!\left((1+a^2)^{-1/2}\varphi_y\right).
$$

係数を微分の外へ出すと

$$
D\mathcal M(u)[\varphi]
=(1+a^2)^{-3/2}\varphi_{xx}
+(1+a^2)^{-1/2}\varphi_{yy}.
$$

$a=0$ のときのみ表示はそのまま $\Delta\varphi$ です。
<!-- solution-end -->

<a id="ex-ga9-a03"></a>
#### GA9-A03 固定境界と自然境界
- Level: A

単位円板 $\Omega=B_1(0)\subset\mathbb R^2$、$u(x,y)=x$ を考える。内部の弱方程式と自然境界条件 $F(Du)\cdot\nu=0$ をそれぞれ判定せよ。

<!-- solution-start -->
**詳細解答**

$Du=(1,0)$、$F(Du)=(1/\sqrt2,0)$ は定数です。従って $\operatorname{div}F(Du)=0$ であり、コンパクト台の試験関数に対しても積分は零です。

一方、円周の外向き法線は $\nu=(x,y)$ なので

$$
F(Du)\cdot\nu=\frac{x}{\sqrt2}.
$$

これは例えば $(1,0)\in\partial\Omega$ で $1/\sqrt2$ です。従って自然境界条件は満たしません。$u|_{\partial\Omega}=x$ を固定するDirichlet問題の解ではあります。境界の許容変分を指定することが必要です。
<!-- solution-end -->

<a id="ex-ga9-a04"></a>
#### GA9-A04 臨界指数を縮尺から求める
- Level: A

$d=3$、$v_\varepsilon(x)=\varepsilon^{-1/2}\eta(x/\varepsilon)$（$\eta\in C_c^\infty(B_1)$）とする。$\|Dv_\varepsilon\|_2^2$、$\|v_\varepsilon\|_2^2$、$\|v_\varepsilon\|_6^6$ を $\eta$ の積分で表せ。

<!-- solution-start -->
**詳細解答**

$y=x/\varepsilon$ で $dx=\varepsilon^3dy$、$Dv_\varepsilon=\varepsilon^{-3/2}D\eta(y)$ です。従って

$$
\int|Dv_\varepsilon|^2dx
=\varepsilon^{-3}\varepsilon^3\int|D\eta|^2dy
=\int|D\eta|^2dy.
$$

一方

$$
\int|v_\varepsilon|^2dx
=\varepsilon^{-1}\varepsilon^3\int|\eta|^2dy
=\varepsilon^2\int|\eta|^2dy,
$$

$$
\int|v_\varepsilon|^6dx
=\varepsilon^{-3}\varepsilon^3\int|\eta|^6dy
=\int|\eta|^6dy.
$$

従って $6=2^*$ は勾配と同時にノルムが保たれる指数です。
<!-- solution-end -->

### Level B：線形化・弱形式・集中を接続する

<a id="ex-ga9-b01"></a>
#### GA9-B01 固定境界の弱解は一つか
- Level: B

有界連結Lipschitz領域 $\Omega$ で、同じDirichlet境界値を持つ二つの $W^{1,2}$ 極小グラフ弱解 $u,v$ を考える。$F$ の単調性を積分表示から導き、一意性を証明せよ。

<!-- solution-start -->
**詳細解答**

$p\ne q$ なら、$F$ の線分上の導関数を積分して

$$
(F(p)-F(q))\cdot(p-q)
=\int_0^1(p-q)^{\mathsf T}A(q+t(p-q))(p-q)\,dt>0
$$

となります。不等号は[楕円性の定理](#thm-ga9-ellipticity)によるものです。$u-v\in H_0^1(\Omega)$ を試験関数にできるのは、$F(Du)$、$F(Dv)$ が有界で $\Omega$ の体積が有限、かつ滑らかなコンパクト台関数が $H_0^1$ に稠密だからです。

二つの弱方程式を引き算して

$$
0=\int_\Omega(F(Du)-F(Dv))\cdot(Du-Dv)\,dx
$$

です。被積分関数は非負、勾配が異なる場所では正なので $Du=Dv$ がほとんど至る所です。[零境界Poincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)から $\|u-v\|_2\le C\|Du-Dv\|_2=0$、従って $u=v$ です。存在まで証明したわけではありません。
<!-- solution-end -->

<a id="ex-ga9-b02"></a>
#### GA9-B02 調和関数が極小グラフとは限らない
- Level: B

$\Omega=(-1,1)^2$ で $u(x,y)=xy$ とする。$\Delta u=0$ を検証し、$\operatorname{div}F(Du)$ が恒等的に零でないことを示せ。差が生じる項を特定せよ。

<!-- solution-start -->
**詳細解答**

$u_x=y$、$u_y=x$、$u_{xx}=u_{yy}=0$、$u_{xy}=1$ なので $\Delta u=0$ です。[VAR7の非発散形](../../../解析系/VAR/VAR7/index.md#thm-var7-minimal-graph-equation)の分子は

$$
(1+x^2)u_{xx}-2xyu_{xy}+(1+y^2)u_{yy}
=0-2xy+0=-2xy.
$$

従って

$$
\operatorname{div}F(Du)
=-\frac{2xy}{(1+x^2+y^2)^{3/2}},
$$

例えば $(1/2,1/2)$ では零ではありません。$\Delta u$ は交差微分の項を含まず、極小グラフ方程式は $Du\otimes Du$ が最高階微分に結び付くため $-2xyu_{xy}$ が残ります。
<!-- solution-end -->

<a id="ex-ga9-b03"></a>
#### GA9-B03 収束するのに端点ノルムが残る
- Level: B

$d\ge3$、$\eta\in C_c^\infty(B_1)$ を非零とし、$v_\varepsilon(x)=\varepsilon^{-(d-2)/2}\eta(x/\varepsilon)$ を $B_2$ 上の関数とする。$H_0^1(B_2)$ で有界、$L^2$ で零へ強収束するが $L^{2^*}$ では強収束しないことを示せ。

<!-- solution-start -->
**詳細解答**

$0<\varepsilon<1$ なら台は $B_\varepsilon$ に含まれ、$v_\varepsilon\in C_c^\infty(B_2)\subset H_0^1(B_2)$ です。$y=x/\varepsilon$ で

$$
\|Dv_\varepsilon\|_2^2=\|D\eta\|_2^2,\qquad
\|v_\varepsilon\|_2^2=\varepsilon^2\|\eta\|_2^2.
$$

従って $H_0^1$ で有界かつ $L^2$ では零へ強収束します。一方

$$
\|v_\varepsilon\|_{2^*}^{2^*}
=\varepsilon^{d-(d-2)2^*/2}\|\eta\|_{2^*}^{2^*}
=\|\eta\|_{2^*}^{2^*}>0.
$$

もし $L^{2^*}$ の強収束部分列があれば、有限体積の $B_2$ で $L^{2^*}$ 強収束は $L^2$ 強収束を含意します。極限は零でなければならないのに、端点ノルムは一定の正数です。従って強収束部分列は存在しません。
<!-- solution-end -->

<a id="ex-ga9-b04"></a>
#### GA9-B04 Yamabe型商の倍率と停留条件
- Level: B

閉多様体 $(M^d,g)$（$d\ge3$）で $Q_g$ を第5節の商とする。$a>0$ に対して $Q_g(av)=Q_g(v)$ を検証し、$Q'_g(v)[\varphi]=0$ の方程式に現れるべき指数を求めよ。

<!-- solution-start -->
**詳細解答**

分子 $N(av)=a^2N(v)$、分母に使う積分は $I(av)=a^{2^*}I(v)$ なので

$$
Q_g(av)=\frac{a^2N(v)}
{(a^{2^*}I(v))^{2/2^*}}
=\frac{a^2N(v)}{a^2I(v)^{2/2^*}}
=Q_g(v).
$$

方向微分では $N'(v)[\varphi]=2\int(-c_d\Delta_gv+R_gv)\varphi$、$I'(v)[\varphi]=2^*\int v^{2^*-1}\varphi$ です。[停留方程式の命題](#prop-ga9-yamabe-euler)の導出と同じ積・連鎖律によって

$$
-c_d\Delta_gv+R_gv=\lambda v^{2^*-1}
$$

となります。指数は

$$
2^*-1=\frac{2d}{d-2}-1=\frac{d+2}{d-2}.
$$

$d=3$ なら $5$、$d=4$ なら $3$ です。これは二階の最高階係数が未知勾配に依存する極小グラフとは別の非線形性です。
<!-- solution-end -->

### Level C：二つの非線形問題の障害を比較する

<a id="ex-ga9-c01"></a>
#### GA9-C01 極小グラフと臨界変分の対比
- Level: C

$\Omega=B_2(0)\subset\mathbb R^3$、$\eta\in C_c^\infty(B_1)$ は非零とする。

1. 極小グラフ流束 $F(p)=p/\sqrt{1+|p|^2}$ について、$p=Re_1$ で最小固有値を計算し、$R\to\infty$ で何を失うか述べよ。
2. $w_\varepsilon(x)=\varepsilon^{-1/2}\eta(x/\varepsilon)$ の $H^1$ 有界性と $L^6$ 非コンパクト性を証明せよ。
3. 極小グラフ面積 $\int_\Omega\sqrt{1+|Du|^2}$ と臨界Yamabe型商をそれぞれ最小化しようとするとき、これら二つの計算が示す障害を分けて説明せよ。
4. $d=3$ におけるYamabe型停留方程式の未知関数の冪を求め、極小グラフ方程式との非線形性の位置の違いを述べよ。

<!-- solution-start -->
**詳細解答**

**1.** [極小グラフ流束の楕円性](#thm-ga9-ellipticity)の平行方向固有値は

$$
\lambda_{\min}(A(Re_1))=(1+R^2)^{-3/2}.
$$

$R\to\infty$ で零へ近づきます。従って全勾配に共通する正の楕円性下界は存在しません。有限 $R$ の正定値性と、全 $R$ にわたる一様楕円性を混同してはいけません。

**2.** 台が $B_\varepsilon$ へ縮むので、$\varepsilon<1$ では $w_\varepsilon\in C_c^\infty(\Omega)$ です。変数 $y=x/\varepsilon$ により

$$
\|Dw_\varepsilon\|_2^2=\|D\eta\|_2^2,\quad
\|w_\varepsilon\|_2^2=\varepsilon^2\|\eta\|_2^2,\quad
\|w_\varepsilon\|_6^6=\|\eta\|_6^6>0.
$$

よって $H^1$ は有界で $L^2$ では零へ強収束します。しかし $L^6$ 強収束部分列があるなら $L^2$ でも同じ極限になるので零へ収束するはずです。$L^6$ ノルムが一定の正数なので矛盾します。

**3.** 面積密度は $|p|\to\infty$ で $\sqrt{1+|p|^2}/|p|\to1$ です。例えば $Du$ の大きい場所を作ったとき、面積汎関数の値の制御は $\int|Du|^2$ の制御を保証しません。[弱解の一意性](#prop-ga9-weak-uniqueness)は成立しても、$H^1$ での最小化列の有界性や解の存在は別問題です。

一方Yamabe型商では、$H^1$ が仮に有界でも、上で作った列のように端点の $L^6$ ノルムは集中により残り得ます。従って非線形分母を強収束で連続に扱うためのコンパクト性は自動ではありません。前者は**汎関数の一次成長・勾配依存係数**、後者は**臨界埋め込みの非コンパクト性**に由来します。

**4.** $d=3$ では $2^*=6$、$c_3=8$、$2^*-1=5$ なので[停留方程式](#prop-ga9-yamabe-euler)は

$$
-8\Delta_gv+R_gv=\lambda v^5.
$$

Yamabe型では最高階微分の係数 $-8$ は未知関数 $v$ に依存せず、右辺が非線形です。極小グラフでは $\operatorname{div}F(Du)$ を展開した最高階微分の係数 $A_{ij}(Du)$ が未知勾配に依存します。ともに「非線形楕円型」でも、線形解析を転用する際に確認すべき点が異なります。
<!-- solution-end -->

## 8. 何ができるようになったか

[VAR7の面積方程式](../../../解析系/VAR/VAR7/index.md#thm-var7-minimal-graph-equation)に現れた流束を微分し、勾配が有界なら一様楕円的であること、全勾配では一様下界を失うことを数式で判定しました。弱形式では流束の単調性からDirichlet解の一意性を証明しましたが、一次成長の面積汎関数から自動的に存在を導くことはしていません。

さらに $d\ge3$ の臨界指数 $2^*$ をスケーリングから導き、閉多様体上でも集中列がコンパクト性を壊すことを証明しました。Yamabe型のEuler--Lagrange方程式に現れる $2^*-1$ はこの指数から決まります。

この章は幾何解析の出口です。一般の非線形楕円方程式の完全な正則性、Yamabe問題の解決、平均曲率流・Ricci流の存在論は、ここまでの計算から自動的には従いません。