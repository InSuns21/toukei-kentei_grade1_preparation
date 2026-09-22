# GEO5 ベクトル場・積分曲線・局所流・Lie 括弧

[GEO2](../GEO2/index.md) では、各点 $p$ の一次方向を接ベクトル $v\in T_pM$ として定義しました。本章では、その接ベクトルを各点へ**滑らかに割り当てる**ところから始めます。

一つのベクトル場 $X$ は、各点で「今この方向へ進め」という速度を指定します。したがって、曲線 $\gamma(t)$ に

$$
\gamma'(t)=X_{\gamma(t)}
$$

を課すと、ベクトル場そのものが時間発展を生みます。これが積分曲線と流れです。

さらに二つのベクトル場 $X,Y$ を順番に作用させたとき、

$$
X(Yf)-Y(Xf)
$$

が一般には0にならないことから、二つの方向の「非可換性」を測る Lie 括弧が現れます。本章の主線は

$$
\text{ベクトル場}
\longrightarrow
\text{積分曲線}
\longrightarrow
\text{最大積分曲線}
\longrightarrow
\text{局所流}
\longrightarrow
\text{Lie 括弧}
$$

です。

ODE の局所存在・一意性そのものは再証明しません。[ODE1 の Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)と、[ODE4 の自律系](../ODE4/index.md)を使います。一方、多様体上で局所座標を変えても解が同じ幾何学的曲線を表すこと、最大積分曲線が一意に貼り合わさること、最大流の局所群則、Lie 括弧の座標公式と Jacobi 恒等式は本章で閉じます。

<!-- definition-example-audit: strict -->

---

## 1. ベクトル場は接束の滑らかな切断である

<a id="def-geo5-vector-field"></a>
<!-- formal-statement-start -->
> **定義（滑らかなベクトル場）**  
> $M$ を滑らかな多様体、$\pi:TM\to M$ を接束の射影とする。滑らかな写像
>
> $$
> X:M\to TM
> $$
>
> が
>
> $$
> \pi\circ X=\operatorname{id}_M
> $$
>
> を満たすとき、$X$ を $M$ 上の **滑らかなベクトル場**という。
>
> 各 $p\in M$ に対して
>
> $$
> X_p:=X(p)\in T_pM
> $$
>
> と書く。
<!-- formal-statement-end -->

[GEO2 の接束](../GEO2/index.md#def-geo2-tangent-bundle)では、接束の点は $(p,v)$、$v\in T_pM$ と考えられました。切断という条件 $\pi(X(p))=p$ は、$X$ が「点 $p$ に別の点の接ベクトルを割り当てない」ことを表します。

座標 $x=(x^1,\dots,x^n)$ 上では

$$
X
=
\sum_{i=1}^n X^i\frac{\partial}{\partial x^i}
$$

と一意に書けます。$X$ が滑らかであることは、各成分関数 $X^i$ が滑らかであることと同値です。

<!-- definition-example-start: def-geo5-vector-field -->
**定義の確認：球面上の回転ベクトル場**

$S^2\subset\mathbb R^3$ 上で

$$
X_{(x,y,z)}
=
(-y,x,0)
$$

と置きます。$p=(x,y,z)\in S^2$ に対して

$$
\langle p,X_p\rangle
=
x(-y)+yx+z\cdot0
=
0.
$$

[GEO3 の球面の接空間](../GEO3/index.md#thm-geo3-level-tangent-kernel)から

$$
T_pS^2=p^\perp
$$

なので $X_p\in T_pS^2$ です。また成分は $(x,y,z)$ の多項式なので滑らかです。従って $X$ は $S^2$ 上の滑らかなベクトル場です。

北極と南極では $X=0$、それ以外では緯線方向を向きます。後でこのベクトル場の流れは $z$ 軸回りの回転になることが分かります。
<!-- definition-example-end -->

---

## 2. ベクトル場は滑らかな関数を方向微分する

<a id="def-geo5-vector-field-derivation"></a>
<!-- formal-statement-start -->
> **定義（ベクトル場が定める導分）**  
> $X$ を $M$ 上の滑らかなベクトル場、$f\in C^\infty(M)$ とする。
>
> $$
> Xf:M\to\mathbb R,
> \qquad
> (Xf)(p):=X_p(f)
> $$
>
> と定める。ここで $X_p$ は [GEO2](../GEO2/index.md#def-geo2-tangent-derivation) の意味で点 $p$ における微分作用素である。
<!-- formal-statement-end -->

座標表示

$$
X=\sum_iX^i\frac{\partial}{\partial x^i}
$$

を使えば

$$
Xf
=
\sum_iX^i\frac{\partial f}{\partial x^i}.
$$

従って $Xf$ は滑らかです。

<a id="prop-geo5-vector-field-derivation"></a>
<!-- formal-statement-start -->
> **命題（ベクトル場は $C^\infty(M)$ 上の導分を定める）**  
> 任意の $f,g\in C^\infty(M)$ と $a,b\in\mathbb R$ に対して
>
> $$
> X(af+bg)=aXf+bXg
> $$
>
> および
>
> $$
> X(fg)=f\,Xg+g\,Xf
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $p\in M$ で $X_p$ は接ベクトル、すなわち点 $p$ における導分です。従って

$$
X_p(af+bg)
=
aX_p(f)+bX_p(g),
$$

$$
X_p(fg)
=
f(p)X_p(g)+g(p)X_p(f).
$$

これはそれぞれ

$$
(X(af+bg))(p)
=
(aXf+bXg)(p),
$$

$$
(X(fg))(p)
=
(f\,Xg+g\,Xf)(p)
$$

ということです。$p$ は任意なので関数として等しい。$\square$
<!-- proof-end -->

ここでは「ベクトル場から導分を作る」向きだけを使います。任意の大域導分 $D:C^\infty(M)\to C^\infty(M)$ からベクトル場を復元する定理もありますが、その大域的な局所化を最短で示すには隆起関数が便利です。本章の prerequisite には GEO4 を入れていないため、その同値性を本章の証明依存にはしません。

---

## 3. 積分曲線はベクトル場の矢印に接し続ける

<a id="def-geo5-integral-curve"></a>
<!-- formal-statement-start -->
> **定義（積分曲線）**  
> $X$ を $M$ 上の滑らかなベクトル場とする。区間 $I\subset\mathbb R$ 上の滑らかな曲線
>
> $$
> \gamma:I\to M
> $$
>
> が
>
> $$
> \gamma'(t)=X_{\gamma(t)}
> \qquad(t\in I)
> $$
>
> を満たすとき、$\gamma$ を $X$ の **積分曲線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo5-integral-curve -->
**定義の確認：実直線上の $X=x\,\partial_x$**

$M=\mathbb R$ で

$$
X_x=x\frac{\partial}{\partial x}
$$

とします。曲線 $\gamma(t)=x(t)$ が積分曲線である条件は

$$
x'(t)=x(t)
$$

です。初期値 $x(0)=a$ なら

$$
x(t)=ae^t.
$$

実際、

$$
x'(t)=ae^t=x(t)
$$

なので定義を直接満たします。$a=0$ なら定数曲線、$a\neq0$ なら0を横切らず指数的に移動します。
<!-- definition-example-end -->

座標 $x=(x^1,\dots,x^n)$ で

$$
X
=
\sum_{i=1}^nX^i(x)\frac{\partial}{\partial x^i}
$$

なら、$\gamma(t)$ の座標表示 $u(t)=x(\gamma(t))$ は

$$
\frac{du^i}{dt}
=
X^i(u(t)),
\qquad
i=1,\dots,n
$$

を満たします。つまり、多様体上の積分曲線問題は局所座標では通常の自律 ODE です。

---

## 4. 局所存在・一意性は座標を通して多様体へ移る

<a id="thm-geo5-local-integral-curve"></a>
<!-- formal-statement-start -->
> **定理（積分曲線の局所存在・一意性）**  
> $M$ を滑らかな多様体、$X$ を $M$ 上の滑らかなベクトル場、$p\in M$ とする。
>
> このとき、ある $\varepsilon>0$ と積分曲線
>
> $$
> \gamma:(-\varepsilon,\varepsilon)\to M
> $$
>
> が存在して
>
> $$
> \gamma(0)=p
> $$
>
> となる。
>
> また、$\gamma_1,\gamma_2$ がともに $p$ を時刻0に通る積分曲線なら、両者の定義区間の共通部分上で
>
> $$
> \gamma_1=\gamma_2
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

座標を一枚取り、その中では

$$
u'=F(u)
$$

という Euclid 空間の自律系になります。$F$ は滑らかなので局所 Lipschitz です。[Picard--Lindelöf](../ODE1/index.md#thm-ode1-picard-lindelof)で局所解を作り、座標の逆写像で多様体へ戻します。

一意性によって、別の座標で作った解も重なるところでは同じ曲線になります。したがって構成は座標の選択に依存しません。

<!-- proof-start -->
### 証明

$p$ を含む座標近傍

$$
x:U\to x(U)\subset\mathbb R^n
$$

を取ります。$U$ 上で

$$
X
=
\sum_{i=1}^nX^i\frac{\partial}{\partial x^i}
$$

と書き、

$$
F:x(U)\to\mathbb R^n,
\qquad
F(u)
=
(X^1(x^{-1}(u)),\dots,X^n(x^{-1}(u)))
$$

と置きます。

$X$ は滑らかなので $F$ は滑らか、特に $C^1$ です。従って $F$ は $x(p)$ の十分小さい閉球上で Lipschitz です。ODE4 で用いた自律系の局所存在・一意性、すなわち [Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)を成分ごとに同じ縮小評価で適用すると、

$$
u'(t)=F(u(t)),
\qquad
u(0)=x(p)
$$

は十分小さい $|t|<\varepsilon$ で一意な解を持ちます。

$$
\gamma(t)=x^{-1}(u(t))
$$

と置きます。連鎖律から

$$
dx_{\gamma(t)}(\gamma'(t))
=
u'(t)
=
F(u(t))
=
dx_{\gamma(t)}(X_{\gamma(t)}).
$$

$dx_{\gamma(t)}$ は線形同型なので

$$
\gamma'(t)=X_{\gamma(t)}.
$$

よって $\gamma$ は積分曲線です。

次に $\gamma_1,\gamma_2$ がともに $\gamma_i(0)=p$ を満たす積分曲線とします。0の近くで両曲線は同じ座標近傍 $U$ に入り、その座標表示は同じ初期値問題

$$
u'=F(u),
\qquad
u(0)=x(p)
$$

を満たします。一意性から0の近くで一致します。

一致する時刻全体を共通定義区間 $J$ の中で考えます。ある時刻 $t_0$ で $\gamma_1(t_0)=\gamma_2(t_0)$ なら、時刻を $t_0$ だけ平行移動して同じ局所一意性を適用できるので $t_0$ の近くでも一致します。従って一致時刻集合は $J$ で開です。

一方、曲線の連続性と Hausdorff 性から一致時刻集合は閉です。$J$ は区間なので連結であり、0を含む空でない開閉集合は $J$ 全体です。したがって $\gamma_1=\gamma_2$ が共通定義区間全体で成り立ちます。$\square$
<!-- proof-end -->

この一意性が、後で「局所解を継ぎ足して一つの最大解にする」ことと「流れに群則が現れる」ことの共通の原因です。

---

## 5. 初期値を少し動かしても解は滑らかに動く

局所流を単なる点ごとの解の集合ではなく滑らかな写像として扱うには、初期値依存性が必要です。

<a id="lem-geo5-smooth-dependence"></a>
<!-- formal-statement-start -->
> **補題（自律系の解の初期値への滑らかな依存）**  
> $U\subset\mathbb R^n$ を開集合、$F:U\to\mathbb R^n$ を滑らかな写像とする。$a_0\in U$ に対し、ある $h>0$ と $a_0$ の開近傍 $V\subset U$ が存在して、各 $a\in V$ に対する初期値問題
>
> $$
> u'(t)=F(u(t)),
> \qquad
> u(0)=a
> $$
>
> の解が $|t|<h$ で存在し、
>
> $$
> \Psi:(-h,h)\times V\to U,
> \qquad
> \Psi(t,a)=u_a(t)
> $$
>
> は滑らかである。
<!-- formal-statement-end -->

### なぜこの補題が必要か

点 $a$ ごとに解が存在するだけでは、

$$
(t,a)\longmapsto u_a(t)
$$

が連続、まして滑らかとは限りません。局所流では「時間方向」と「初期点方向」の両方を同時に動かすので、この補題が橋になります。

<!-- proof-start -->
### 証明

$a_0$ を中心とする閉球 $\overline B(a_0,r)$ が $U$ に含まれるように $r>0$ を取ります。さらに少し小さい閉球

$$
K=\overline B(a_0,r/2)
$$

を初期値集合として使います。

$\overline B(a_0,r)$ はコンパクトで $F,DF$ は連続なので、ある $M,L>0$ が存在して

$$
\|F(x)\|\le M,
\qquad
\|DF(x)\|\le L
$$

が $\overline B(a_0,r)$ 上で成り立ちます。$h>0$ を

$$
Mh<\frac r2,
\qquad
Lh<1
$$

となるように取ります。

各 $a\in K$ に対して

$$
(T_av)(t)
=
a+\int_0^tF(v(s))\,ds
$$

を考えます。ODE1 の Picard 反復と同じ評価により、$T_a$ は「$a$ から距離 $r/2$ 以内に留まる連続曲線」の集合を自分自身へ写し、縮小率 $Lh<1$ の縮小写像になります。従って一意な不動点 $u_a$ が存在します。

まず初期値に関する連続性を得ます。$u_a,u_b$ の積分方程式を引くと

$$
u_a(t)-u_b(t)
=
a-b
+
\int_0^t
\{F(u_a(s))-F(u_b(s))\}\,ds.
$$

従って

$$
\|u_a-u_b\|_\infty
\le
\|a-b\|+Lh\|u_a-u_b\|_\infty,
$$

すなわち

$$
\|u_a-u_b\|_\infty
\le
\frac{1}{1-Lh}\|a-b\|.
$$

よって $a\mapsto u_a$ は一様ノルムで連続です。

次に $a$ 微分を調べます。候補となる行列値関数 $J_a(t)$ を

$$
J_a(t)
=
I
+
\int_0^t
DF(u_a(s))J_a(s)\,ds
$$

で定めます。右辺の線形積分作用素の縮小率も $Lh<1$ なので $J_a$ は一意に存在します。

単位ベクトル $e_j$ と小さい $\eta$ に対し

$$
Q_\eta(t)
=
\frac{u_{a+\eta e_j}(t)-u_a(t)}{\eta}
$$

と置きます。積分方程式を差し引いて平均値表示を使うと

$$
Q_\eta(t)
=
e_j
+
\int_0^t
A_\eta(s)Q_\eta(s)\,ds,
$$

ここで

$$
A_\eta(s)
=
\int_0^1
DF\!\left(
u_a(s)+\theta\{u_{a+\eta e_j}(s)-u_a(s)\}
\right)d\theta.
$$

初期値に関する一様連続性から $u_{a+\eta e_j}\to u_a$ が一様に成り立ちます。$DF$ はコンパクト集合上で一様連続なので

$$
A_\eta\to DF(u_a)
$$

も一様です。

$J_a(t)e_j$ の積分方程式と引き算し、$Lh<1$ を使って左辺の差を吸収すると

$$
\|Q_\eta-J_ae_j\|_\infty\to0.
$$

従って

$$
D_a u_a(t)=J_a(t)
$$

が存在し、$a$ について $C^1$ です。また

$$
\frac{\partial u_a}{\partial t}=F(u_a)
$$

なので $t$ 方向の微分も連続です。

高階微分は帰納法で得られます。積分方程式を $a$ で $k$ 回微分すると、最高階微分 $D_a^ku_a$ は

$$
D_a^ku_a(t)
=
\int_0^t
DF(u_a(s))D_a^ku_a(s)\,ds
+
R_k(t)
$$

という線形積分方程式を満たします。$R_k$ は $D^jF$ と $D_a^\ell u_a$ のうち $j\le k$, $\ell<k$ の有限和・積だけから作られます。帰納法の仮定により $R_k$ は連続で、同じ縮小評価によって $D_a^ku_a$ が一意に存在し連続です。

従って全ての階数について微分でき、

$$
\Psi(t,a)=u_a(t)
$$

は滑らかです。$K$ の内部 $V=B(a_0,r/2)$ に制限すれば主張を得ます。$\square$
<!-- proof-end -->

この補題では「滑らかな ODE なら解も初期値に滑らかに依存する」を黒箱にせず、Picard 反復と同じ縮小機構から初期値微分が出る場所を明示しました。

---

## 6. 最大積分曲線は局所解を一意性で貼り合わせて作る

<a id="def-geo5-maximal-integral-curve"></a>
<!-- formal-statement-start -->
> **定義（最大積分曲線）**  
> $X$ を $M$ 上の滑らかなベクトル場、$p\in M$ とする。
>
> $0\in I_p\subset\mathbb R$ を満たす区間上の積分曲線
>
> $$
> \gamma_p:I_p\to M,
> \qquad
> \gamma_p(0)=p
> $$
>
> が **最大**であるとは、同じ初期条件を持つ積分曲線
>
> $$
> \widetilde\gamma:J\to M
> $$
>
> に対して常に
>
> $$
> J\subseteq I_p,
> \qquad
> \widetilde\gamma=\gamma_p|_J
> $$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo5-maximal-integral-curve -->
**定義の確認：有限時刻で発散する $X=x^2\partial_x$**

$M=\mathbb R$ で

$$
X=x^2\frac{\partial}{\partial x}
$$

とします。初期値 $x(0)=a$ に対する解は、$a\neq0$ なら

$$
x(t)=\frac{a}{1-at}.
$$

$a>0$ なら $t\uparrow1/a$ で $x(t)\to+\infty$ なので

$$
I_a=(-\infty,1/a).
$$

$a<0$ なら $t\downarrow1/a$ で発散し、

$$
I_a=(1/a,\infty).
$$

$a=0$ では $x(t)\equiv0$ なので $I_0=\mathbb R$ です。

ベクトル場自体は $\mathbb R$ 全体で滑らかでも、積分曲線が全時間存在するとは限りません。
<!-- definition-example-end -->

<a id="thm-geo5-maximal-integral-curve"></a>
<!-- formal-statement-start -->
> **定理（最大積分曲線の存在・一意性）**  
> 任意の $p\in M$ に対して、$p$ を時刻0に通る最大積分曲線
>
> $$
> \gamma_p:I_p\to M
> $$
>
> が一意に存在する。
>
> その定義域 $I_p$ は0を含む開区間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p$ を時刻0に通る全ての積分曲線

$$
\gamma_\alpha:I_\alpha\to M
$$

を考えます。局所存在定理により少なくとも一つ存在します。

$$
I_p
=
\bigcup_\alpha I_\alpha
$$

と置きます。各 $I_\alpha$ は0を含む開区間なので、その合併 $I_p$ も0を含む開区間です。

$t\in I_p$ に対し、$t\in I_\alpha$ となる $\alpha$ を一つ取り

$$
\gamma_p(t)=\gamma_\alpha(t)
$$

と定めます。別の $\beta$ でも $t\in I_\beta$ なら、局所一意性定理から

$$
\gamma_\alpha=\gamma_\beta
$$

が $I_\alpha\cap I_\beta$ 上で成り立つので、この定義は選択に依存しません。

各 $t$ の近くでは $\gamma_p$ はある $\gamma_\alpha$ と一致するため滑らかで、積分曲線です。明らかに全ての $\gamma_\alpha$ を延長しています。

もしさらに大きな区間 $J\supsetneq I_p$ 上へ同じ初期条件の積分曲線として延長できれば、その曲線も最初に集めた族の一員なので $J\subseteq I_p$ でなければならず矛盾です。従って $\gamma_p$ は最大です。

一意性も、二つの最大積分曲線があれば共通部分で一致し、一方が他方を延長することから従います。$\square$
<!-- proof-end -->

---

## 7. 最大流は「時間発展をまとめた一つの写像」である

<a id="def-geo5-maximal-flow"></a>
<!-- formal-statement-start -->
> **定義（最大流）**  
> $X$ の点 $p$ を通る最大積分曲線を $\gamma_p:I_p\to M$ とする。
>
> $$
> \mathcal D_X
> =
> \{(t,p)\in\mathbb R\times M:t\in I_p\}
> $$
>
> と置き、
>
> $$
> \Phi:\mathcal D_X\to M,
> \qquad
> \Phi(t,p)=\gamma_p(t)
> $$
>
> と定める。この $\Phi$ を $X$ の **最大流**という。
>
> 固定した $t$ に対して定義できる範囲では
>
> $$
> \Phi_t(p):=\Phi(t,p)
> $$
>
> と書く。
<!-- formal-statement-end -->

<a id="def-geo5-local-flow"></a>
<!-- formal-statement-start -->
> **定義（局所流）**  
> $M$ の開集合 $\mathcal D\subset\mathbb R\times M$ が $\{0\}\times M$ を含み、滑らかな写像
>
> $$
> \Phi:\mathcal D\to M
> $$
>
> が
>
> $$
> \Phi_0(p)=p
> $$
>
> および、両辺が定義される全ての $s,t,p$ について
>
> $$
> \Phi_t(\Phi_s(p))
> =
> \Phi_{t+s}(p)
> $$
>
> を満たすとき、$\Phi$ を **局所流**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo5-maximal-flow, def-geo5-local-flow -->
**定義の確認：平行移動**

$\mathbb R^n$ 上の定ベクトル場

$$
X=\sum_{i=1}^na^i\frac{\partial}{\partial x^i}
$$

では

$$
\Phi_t(x)=x+ta.
$$

従って

$$
\Phi_t(\Phi_s(x))
=
x+sa+ta
=
\Phi_{t+s}(x).
$$

全ての $t\in\mathbb R$ で定義できるので、これは局所流であるだけでなく大域的な流れです。
<!-- definition-example-end -->

<a id="thm-geo5-maximal-flow"></a>
<!-- formal-statement-start -->
> **定理（最大流の滑らかさと局所群則）**  
> $X$ を滑らかなベクトル場とする。その最大流
>
> $$
> \Phi:\mathcal D_X\to M
> $$
>
> について次が成り立つ。
>
> 1. $\mathcal D_X$ は $\mathbb R\times M$ の開集合である。
> 2. $\Phi$ は滑らかである。
> 3. $\Phi_0=\operatorname{id}_M$。
> 4. 両辺が定義されるとき
>
> $$
> \Phi_t(\Phi_s(p))
> =
> \Phi_{t+s}(p).
> $$
>
> 5. $\Phi_t$ はその定義域から像への微分同相写像で、逆写像は $\Phi_{-t}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

4の群則は、一意性を一度使えば出ます。

滑らかさは少し慎重です。時刻0の近くでは前節の「初期値への滑らかな依存」で得られます。一般の時刻 $t_0$ まで進みたいときは、$[0,t_0]$ を有限個の短い時間区間へ分割し、短時間流を有限回合成します。有限回の滑らかな写像の合成なので、$(t_0,p)$ の近くでも流れは滑らかです。

<!-- proof-start -->
### 証明

まず $p\in M$ を固定します。座標近傍で前節の補題を適用すると、ある $\varepsilon>0$ と $p$ の開近傍 $V$ が存在して

$$
(-\varepsilon,\varepsilon)\times V
\subseteq
\mathcal D_X
$$

となり、$\Phi$ はこの集合上で滑らかです。従って $\mathcal D_X$ は $\{0\}\times M$ の近くでは開です。

次に群則を示します。$s\in I_p$ とし、$q=\Phi_s(p)$ と置きます。$t$ が0の近くで定義されるとき

$$
\eta(t)=\Phi_t(q)
$$

は $\eta(0)=q$ を満たす $X$ の積分曲線です。一方

$$
\widetilde\eta(t)=\Phi_{t+s}(p)
$$

も

$$
\widetilde\eta(0)=\Phi_s(p)=q
$$

を満たす積分曲線です。一意性から、共通して定義される範囲で

$$
\Phi_t(\Phi_s(p))
=
\Phi_{t+s}(p)
$$

となります。最大性により、この等式は両辺が定義される全範囲へ延びます。

任意の $(t_0,p)\in\mathcal D_X$ を取ります。$t_0>0$ の場合を考えます。コンパクト区間 $[0,t_0]$ に沿う軌道

$$
\gamma_p([0,t_0])
$$

を有限個の座標近傍で覆い、それぞれで短時間の滑らかな解写像を取ります。時間分割

$$
0=t_0^{(0)}<t_0^{(1)}<\cdots<t_0^{(m)}=t_0
$$

を十分細かく取れば、各小区間で一つの短時間流を使えます。

初期点を $p$ の近くで少し動かしても、解の初期値への連続依存性により各段階の終点は次の局所流の定義域に残ります。従って $p$ のある近傍 $W$ と $t_0$ のある近傍 $J$ で

$$
J\times W\subseteq\mathcal D_X
$$

となり、そこで $\Phi$ は有限個の短時間流の合成として表されます。各短時間流は滑らかなので $\Phi$ も滑らかです。

$t_0<0$ でも時間を逆向きにして同じ議論が使えます。従って $\mathcal D_X$ は全体として開で、$\Phi$ は滑らかです。

$\Phi_0=\operatorname{id}_M$ は初期条件から明らかです。また群則に $s=-t$ を入れると

$$
\Phi_{-t}(\Phi_t(p))=p,
\qquad
\Phi_t(\Phi_{-t}(q))=q
$$

が定義可能な範囲で成り立ちます。従って $\Phi_{-t}$ は $\Phi_t$ の逆写像であり、両者は滑らかなので $\Phi_t$ は微分同相写像です。$\square$
<!-- proof-end -->

---

## 8. 完備ベクトル場は全時間の運動を生む

<a id="def-geo5-complete-vector-field"></a>
<!-- formal-statement-start -->
> **定義（完備ベクトル場）**  
> 滑らかなベクトル場 $X$ が **完備**であるとは、全ての $p\in M$ に対して最大積分曲線の定義域が
>
> $$
> I_p=\mathbb R
> $$
>
> となることをいう。
>
> 同値に、最大流の定義域が
>
> $$
> \mathcal D_X=\mathbb R\times M
> $$
>
> となる。
<!-- formal-statement-end -->

<a id="prop-geo5-compact-complete"></a>
<!-- formal-statement-start -->
> **命題（コンパクト多様体上の滑らかなベクトル場は完備）**  
> $M$ がコンパクトな滑らかな多様体なら、$M$ 上の任意の滑らかなベクトル場は完備である。
<!-- formal-statement-end -->

### 証明の見取り図

各点では短時間解が存在します。コンパクト性を使うと「存在時間の下限」を正の一定値 $\varepsilon$ にできます。すると、$\varepsilon/2$ ずつ解を継ぎ足して任意の有限時刻まで進めます。

<!-- proof-start -->
### 証明

各 $p\in M$ に対して、最大流の局所構成から開近傍 $V_p$ と $\varepsilon_p>0$ が存在して

$$
(-\varepsilon_p,\varepsilon_p)\times V_p
\subseteq
\mathcal D_X
$$

となります。

$(V_p)_{p\in M}$ は $M$ の開被覆です。$M$ はコンパクトなので有限個

$$
V_{p_1},\dots,V_{p_N}
$$

で覆えます。

$$
\varepsilon
=
\min_{1\le i\le N}\varepsilon_{p_i}
>0
$$

と置きます。任意の $q\in M$ はどれか $V_{p_i}$ に属するため、$q$ から出発する積分曲線は少なくとも

$$
(-\varepsilon,\varepsilon)
$$

だけ存在します。

いま任意の $q$ から時刻 $\varepsilon/2$ まで進んだ点を $q_1$ とします。$q_1$ も $M$ の点なので、そこからさらに $\varepsilon/2$ 進めます。一意性により、これは元の積分曲線の延長になっています。

この操作を有限回繰り返せば任意の正の時刻 $T$ まで到達できます。負の時刻も同様です。従って全ての $q$ について

$$
I_q=\mathbb R.
$$

よって $X$ は完備です。$\square$
<!-- proof-end -->

この命題で重要なのは「ベクトル場が有界」という座標依存の言い方ではなく、**コンパクト性によって有限個の局所存在時間から一様な正の時間を取り出せる**ことです。

---

## 9. 微分同相写像はベクトル場を別の多様体へ運ぶ

<a id="def-geo5-pushforward-vector-field"></a>
<!-- formal-statement-start -->
> **定義（微分同相写像によるベクトル場の押し出し）**  
> $F:M\to N$ を微分同相写像、$X$ を $M$ 上の滑らかなベクトル場とする。
>
> $N$ 上のベクトル場 $F_*X$ を
>
> $$
> (F_*X)_q
> =
> dF_{F^{-1}(q)}
> \left(
> X_{F^{-1}(q)}
> \right)
> $$
>
> で定める。
<!-- formal-statement-end -->

一般の滑らかな写像 $F:M\to N$ では、同じ $q\in N$ に複数の $p$ が写る可能性があるため、この式だけから $N$ 上の一意なベクトル場を作れるとは限りません。微分同相写像なら $F^{-1}(q)$ が一意なので問題が消えます。

<a id="def-geo5-related-vector-fields"></a>
<!-- formal-statement-start -->
> **定義（$F$-関連なベクトル場）**  
> 滑らかな写像 $F:M\to N$、$M$ 上のベクトル場 $X$、$N$ 上のベクトル場 $Y$ が
>
> $$
> dF_p(X_p)=Y_{F(p)}
> \qquad(p\in M)
> $$
>
> を満たすとき、$X$ と $Y$ は **$F$-関連**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo5-pushforward-vector-field, def-geo5-related-vector-fields -->
**定義の確認：座標変換でベクトル場を押し出す**

$$
F:\mathbb R^2\to\mathbb R^2,
\qquad
F(x,y)=(u,v)=(x,e^xy)
$$

とします。逆写像は

$$
x=u,
\qquad
y=e^{-u}v
$$

なので $F$ は微分同相写像です。

$$
dF_{(x,y)}
\left(
\frac{\partial}{\partial x}
\right)
=
\frac{\partial}{\partial u}
+
e^xy\frac{\partial}{\partial v}
=
\frac{\partial}{\partial u}
+
v\frac{\partial}{\partial v}.
$$

従って

$$
F_*
\left(
\frac{\partial}{\partial x}
\right)
=
\frac{\partial}{\partial u}
+
v\frac{\partial}{\partial v}.
$$

同じ幾何学的な方向が、座標を変えると成分を変えることが直接確認できます。
<!-- definition-example-end -->

<a id="prop-geo5-flow-conjugacy"></a>
<!-- formal-statement-start -->
> **命題（押し出しと流れの共役）**  
> $F:M\to N$ を微分同相写像、$X$ を $M$ 上のベクトル場、$Y=F_*X$ とする。$X,Y$ の最大流をそれぞれ $\Phi,\Psi$ とする。
>
> 両辺が定義される範囲で
>
> $$
> F\circ\Phi_t
> =
> \Psi_t\circ F
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\in M$ を固定し、

$$
\eta(t)=F(\Phi_t(p))
$$

と置きます。連鎖律と $Y=F_*X$ から

$$
\eta'(t)
=
dF_{\Phi_t(p)}
\left(
X_{\Phi_t(p)}
\right)
=
Y_{F(\Phi_t(p))}
=
Y_{\eta(t)}.
$$

また

$$
\eta(0)=F(p).
$$

従って $\eta$ は $Y$ の初期点 $F(p)$ を通る積分曲線です。一意性から

$$
\eta(t)=\Psi_t(F(p)).
$$

すなわち

$$
F(\Phi_t(p))
=
\Psi_t(F(p)).
$$

$p$ は任意なので主張を得ます。$\square$
<!-- proof-end -->

---

## 10. Lie 括弧は二つの方向微分の非可換性である

<a id="def-geo5-lie-bracket"></a>
<!-- formal-statement-start -->
> **定義（Lie 括弧）**  
> $X,Y$ を $M$ 上の滑らかなベクトル場とする。
>
> 各 $f\in C^\infty(M)$ に対して
>
> $$
> [X,Y]f
> :=
> X(Yf)-Y(Xf)
> $$
>
> と定める。
>
> この作用で定まるベクトル場 $[X,Y]$ を $X,Y$ の **Lie 括弧**という。
<!-- formal-statement-end -->

まず、右辺が本当にベクトル場になることを確認します。

<a id="prop-geo5-bracket-derivation"></a>
<!-- formal-statement-start -->
> **命題（導分の可換子は再び導分）**  
> $X,Y$ がベクトル場なら、
>
> $$
> [X,Y](fg)
> =
> f[X,Y]g+g[X,Y]f
> $$
>
> が成り立つ。
>
> 従って各 $p$ で
>
> $$
> f\longmapsto([X,Y]f)(p)
> $$
>
> は点 $p$ における導分を定める。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Leibniz 則を二度使うと

$$
\begin{aligned}
X(Y(fg))
&=
X(f\,Yg+g\,Yf)\\
&=
Xf\,Yg
+
f\,X(Yg)
+
Xg\,Yf
+
g\,X(Yf),
\end{aligned}
$$

同様に

$$
\begin{aligned}
Y(X(fg))
&=
Y(f\,Xg+g\,Xf)\\
&=
Yf\,Xg
+
f\,Y(Xg)
+
Yg\,Xf
+
g\,Y(Xf).
\end{aligned}
$$

差を取ると交差項

$$
Xf\,Yg-Yg\,Xf,
\qquad
Xg\,Yf-Yf\,Xg
$$

が相殺し、

$$
[X,Y](fg)
=
f[X,Y]g+g[X,Y]f.
$$

よって各点で Leibniz 則を満たす導分です。[GEO2 の接ベクトルの定義](../GEO2/index.md#def-geo2-tangent-derivation)から各点で接ベクトルを定めます。$\square$
<!-- proof-end -->

---

## 11. Lie 括弧の座標公式は「係数を互いに微分する」

<a id="thm-geo5-bracket-coordinate"></a>
<!-- formal-statement-start -->
> **定理（Lie 括弧の座標公式）**  
> 局所座標 $x=(x^1,\dots,x^n)$ で
>
> $$
> X
> =
> \sum_{i=1}^nX^i\frac{\partial}{\partial x^i},
> \qquad
> Y
> =
> \sum_{j=1}^nY^j\frac{\partial}{\partial x^j}
> $$
>
> とする。このとき
>
> $$
> [X,Y]
> =
> \sum_{j=1}^n
> \left(
> \sum_{i=1}^n
> \left[
> X^i\frac{\partial Y^j}{\partial x^i}
> -
> Y^i\frac{\partial X^j}{\partial x^i}
> \right]
> \right)
> \frac{\partial}{\partial x^j}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in C^\infty(M)$ に対して

$$
Yf
=
\sum_jY^j\partial_jf
$$

なので

$$
X(Yf)
=
\sum_{i,j}
X^i
\partial_i(Y^j\partial_jf).
$$

積の微分則から

$$
X(Yf)
=
\sum_{i,j}
X^i(\partial_iY^j)\partial_jf
+
\sum_{i,j}
X^iY^j\partial_i\partial_jf.
$$

同様に

$$
Y(Xf)
=
\sum_{i,j}
Y^i(\partial_iX^j)\partial_jf
+
\sum_{i,j}
Y^iX^j\partial_i\partial_jf.
$$

第二項の二階微分部分は、添字 $i,j$ を交換し

$$
\partial_i\partial_jf
=
\partial_j\partial_if
$$

を使うと完全に相殺します。従って

$$
[X,Y]f
=
\sum_j
\left(
\sum_i
X^i\partial_iY^j
-
Y^i\partial_iX^j
\right)\partial_jf.
$$

よって主張の座標公式を得ます。係数は滑らかなので $[X,Y]$ は滑らかなベクトル場です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-geo5-lie-bracket -->
**定義の確認：$\partial_x$ と $x\partial_y$ は可換でない**

$\mathbb R^2$ 上で

$$
X=\frac{\partial}{\partial x},
\qquad
Y=x\frac{\partial}{\partial y}
$$

とします。座標公式から

$$
[X,Y]
=
\frac{\partial x}{\partial x}
\frac{\partial}{\partial y}
=
\frac{\partial}{\partial y}.
$$

実際、任意の $f$ に対して

$$
X(Yf)
=
\partial_x(x\partial_yf)
=
\partial_yf+x\partial_x\partial_yf,
$$

$$
Y(Xf)
=
x\partial_y\partial_xf,
$$

なので差は $\partial_yf$ です。

「まず $x$ 方向へ動いてから $Y$ を使う」と、$Y$ の係数 $x$ 自体が変化するため、その差が $\partial_y$ として残ります。
<!-- definition-example-end -->

定義は $X(Yf)-Y(Xf)$ という座標を使わない式だったので、この座標公式は**座標変換しても同じベクトル場を表します**。座標公式そのものから不変性を確認するより、intrinsic な定義から不変性が自動的に従う点が重要です。

---

## 12. Lie 括弧の代数法則と Jacobi 恒等式

<a id="thm-geo5-bracket-identities"></a>
<!-- formal-statement-start -->
> **定理（Lie 括弧の基本恒等式）**  
> ベクトル場 $X,Y,Z$ と $f\in C^\infty(M)$ に対して次が成り立つ。
>
> 1. 双線形性
>
> $$
> [aX+bY,Z]
> =
> a[X,Z]+b[Y,Z].
> $$
>
> 2. 反対称性
>
> $$
> [X,Y]=-[Y,X].
> $$
>
> 3. 関数倍との積の法則
>
> $$
> [X,fY]
> =
> f[X,Y]+X(f)Y.
> $$
>
> 4. Jacobi 恒等式
>
> $$
> [X,[Y,Z]]
> +
> [Y,[Z,X]]
> +
> [Z,[X,Y]]
> =
> 0.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1と2は可換子の定義

$$
[X,Y]=XY-YX
$$

から直ちに従います。

3は任意の滑らかな関数 $g$ に作用させて計算します。

$$
\begin{aligned}
[X,fY]g
&=
X(fYg)-fY(Xg)\\
&=
X(f)Yg+fX(Yg)-fY(Xg)\\
&=
\{X(f)Y+f[X,Y]\}g.
\end{aligned}
$$

よって

$$
[X,fY]
=
f[X,Y]+X(f)Y.
$$

4では、ベクトル場を $C^\infty(M)$ 上の線形作用素として合成します。

$$
\begin{aligned}
[X,[Y,Z]]
&=
XYZ-XZY-YZX+ZYX,\\
[Y,[Z,X]]
&=
YZX-YXZ-ZXY+XZY,\\
[Z,[X,Y]]
&=
ZXY-ZYX-XYZ+YXZ.
\end{aligned}
$$

三式を足すと、$XYZ,XZY,YZX,ZYX,YXZ,ZXY$ が全て一度ずつ正負で現れて相殺します。従って総和は0です。$\square$
<!-- proof-end -->

Jacobi 恒等式は係数を大量に微分して証明する必要はありません。**線形作用素の可換子は結合的な合成から作られるため Jacobi 恒等式を満たす**、というのが機構です。

---

## 13. 流れから見る Lie 括弧

Lie 括弧は単なる座標計算ではありません。ベクトル場 $X$ の流れで $Y$ を運んだときの一次変化率です。

まず関数について、$\Phi_t$ を $X$ の流れとすると

$$
\frac{d}{dt}
f(\Phi_t(p))
=
Xf(\Phi_t(p)).
$$

引き戻し

$$
\Phi_t^*f=f\circ\Phi_t
$$

を使えば

$$
\frac{d}{dt}\Phi_t^*f
=
\Phi_t^*(Xf).
$$

<a id="thm-geo5-bracket-flow"></a>
<!-- formal-statement-start -->
> **定理（流れによる Lie 括弧の解釈）**  
> $X$ の局所流を $\Phi_t$ とし、$Y$ を別の滑らかなベクトル場とする。
>
> $t$ が0の近くで定義される範囲で
>
> $$
> Y_t
> :=
> (\Phi_{-t})_*Y
> $$
>
> と置く。このとき、両辺が定義される各時刻 $t$ で
>
> $$
> \frac{d}{dt}Y_t
> =
> (\Phi_{-t})_*[X,Y].
> $$
>
> 特に
>
> $$
> \left.
> \frac{d}{dt}
> \right|_{t=0}
> Y_t
> =
> [X,Y].
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $t=0$ での式を示します。$p\in M$ と $f\in C^\infty(M)$ を固定します。押し出しの定義から

$$
(Y_t f)(p)
=
Y_{\Phi_t(p)}
(f\circ\Phi_{-t}).
$$

関数の引き戻しで書けば

$$
Y_tf
=
\Phi_t^*
\left(
Y(\Phi_{-t}^*f)
\right).
$$

流れの定義から

$$
\left.
\frac{d}{dt}
\right|_{t=0}
\Phi_t^*g
=
Xg,
$$

時間を反転すると

$$
\left.
\frac{d}{dt}
\right|_{t=0}
\Phi_{-t}^*f
=
-Xf.
$$

従って合成と積の微分則から

$$
\begin{aligned}
\left.
\frac{d}{dt}
\right|_{t=0}
Y_tf
&=
X(Yf)+Y(-Xf)\\
&=
X(Yf)-Y(Xf)\\
&=
[X,Y]f.
\end{aligned}
$$

任意の $f$ に対して一致するので

$$
\left.
\frac{d}{dt}
\right|_{t=0}
Y_t
=
[X,Y].
$$

次に一般の時刻 $t_0$ を取ります。流れの群則から

$$
\Phi_{-(t_0+h)}
=
\Phi_{-t_0}\circ\Phi_{-h}
$$

であり、押し出しは合成と両立するので

$$
Y_{t_0+h}
=
(\Phi_{-t_0})_*
\left(
(\Phi_{-h})_*Y
\right).
$$

$h$ で微分して $h=0$ と置きます。$(\Phi_{-t_0})_*$ は $h$ に依存しないため、すでに示した時刻0の式から

$$
\left.
\frac{d}{dh}
\right|_{h=0}
Y_{t_0+h}
=
(\Phi_{-t_0})_*[X,Y].
$$

左辺は $dY_t/dt$ の $t=t_0$ における値です。従って

$$
\frac{d}{dt}Y_t
=
(\Phi_{-t})_*[X,Y].
$$

$\square$
<!-- proof-end -->

つまり $[X,Y]=0$ とは、「$X$ の流れで $Y$ を運んでも一次の変化がない」という意味です。

<a id="cor-geo5-commuting-flows"></a>
<!-- formal-statement-start -->
> **系（Lie 括弧が0なら局所流は可換）**  
> $X,Y$ の局所流をそれぞれ $\Phi_t,\Psi_s$ とする。
>
> $$
> [X,Y]=0
> $$
>
> なら、両辺が定義される十分小さい $s,t$ に対して
>
> $$
> \Phi_t\circ\Psi_s
> =
> \Psi_s\circ\Phi_t
> $$
>
> が成り立つ。
>
> 逆に、局所流が全ての十分小さい $s,t$ で可換なら
>
> $$
> [X,Y]=0.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$[X,Y]=0$ とします。前定理の一般時刻の公式から

$
\frac{d}{dt}
(\Phi_{-t})_*Y
=
(\Phi_{-t})_*[X,Y]
=
0
$

が局所的に成り立つため、

$$
(\Phi_{-t})_*Y=Y.
$$

同値に

$$
(\Phi_t)_*Y=Y.
$$

従って $\Phi_t$ は $Y$ の積分曲線を $Y$ の積分曲線へ送ります。

$p$ を固定すると

$$
s\longmapsto
\Phi_t(\Psi_s(p))
$$

は $s=0$ で $\Phi_t(p)$ を通る $Y$ の積分曲線です。一方

$$
s\longmapsto
\Psi_s(\Phi_t(p))
$$

も同じ初期点を通る $Y$ の積分曲線です。一意性から

$$
\Phi_t(\Psi_s(p))
=
\Psi_s(\Phi_t(p)).
$$

逆に局所流が可換なら

$$
(\Phi_t)_*Y=Y
$$

です。$t=0$ で微分し、流れによる Lie 括弧の解釈を使えば

$$
[X,Y]=0.
$$

$\square$
<!-- proof-end -->

---

## 14. 非零ベクトル場は局所座標で一本の座標方向に直せる

GEO6 の Frobenius の定理では、複数のベクトル場を同時に座標方向へ直せる条件を調べます。その前に、**一本だけなら非零である限り必ず直せる**ことを証明します。

<a id="thm-geo5-flow-box"></a>
<!-- formal-statement-start -->
> **定理（ベクトル場の直線化定理・flow-box theorem）**  
> $X$ を $n$ 次元滑らかな多様体 $M$ 上の滑らかなベクトル場とし、
>
> $$
> X_p\neq0
> $$
>
> とする。
>
> このとき $p$ のある局所座標
>
> $$
> (u^1,\dots,u^n)
> $$
>
> が存在して、その座標近傍上で
>
> $$
> X
> =
> \frac{\partial}{\partial u^1}
> $$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ を通り $X_p$ に横断する $(n-1)$ 次元の小片を一つ取ります。その小片の各点を $X$ の流れで時間 $t$ だけ動かす写像

$$
F(t,z)=\Phi_t(z)
$$

を作ります。

$t$ 方向の微分は $X_p$、$z$ 方向の微分は横断面の接方向です。合わせて $T_pM$ の基底になるので、逆関数定理から $F$ は局所座標になります。この座標では時間 $t$ がそのまま第一座標です。

<!-- proof-start -->
### 証明

$p$ を含む座標 $x=(x^1,\dots,x^n)$ を取ります。必要なら $\mathbb R^n$ 側で可逆な線形座標変換を行い、

$$
dx_p(X_p)
=
\frac{\partial}{\partial x^1}\bigg|_{x(p)}
$$

となるようにします。また平行移動して $x(p)=0$ としてよい。

座標内の横断面を

$$
S
=
\{x^1=0\}
$$

とし、$z=(z^2,\dots,z^n)$ に対して

$$
\sigma(z)
=
x^{-1}(0,z^2,\dots,z^n)
$$

と置きます。

$X$ の局所流を $\Phi_t$ とし、

$$
F(t,z)
=
\Phi_t(\sigma(z))
$$

を考えます。$(0,0)$ における微分は

$$
dF_{(0,0)}
\left(
\frac{\partial}{\partial t}
\right)
=
X_p,
$$

また $j=2,\dots,n$ について

$$
dF_{(0,0)}
\left(
\frac{\partial}{\partial z^j}
\right)
=
d\sigma_0
\left(
\frac{\partial}{\partial z^j}
\right).
$$

後者は横断面 $S$ の $n-1$ 本の座標方向です。$X_p$ は第一座標方向を持つため、これら $n$ 本は $T_pM$ の基底になります。従って

$$
dF_{(0,0)}
$$

は線形同型です。

[GEO1/RA6A で用いた逆関数定理](../RA6A/index.md)から、$F$ は $(0,0)$ の近くから $p$ の近くへの微分同相写像です。その逆写像が局所座標

$$
(u^1,\dots,u^n)
=
F^{-1}
$$

を与えます。

流れの群則から

$$
\Phi_s(F(t,z))
=
\Phi_s(\Phi_t(\sigma(z)))
=
F(t+s,z).
$$

従ってこの座標では、$X$ の積分曲線は

$$
s\longmapsto(t+s,z)
$$

です。その速度は第一座標方向なので

$$
X
=
\frac{\partial}{\partial u^1}.
$$

$\square$
<!-- proof-end -->

### 仮定 $X_p\neq0$ はどこで使ったか

$X_p=0$ なら

$$
dF_{(0,0)}
\left(
\frac{\partial}{\partial t}
\right)
=
0
$$

となり、$dF_{(0,0)}$ は線形同型になれません。従って逆関数定理の機構が壊れます。

実際、零点で $X=\partial/\partial u^1$ となる座標は存在しません。右辺はどの点でも非零だからです。

---

## 15. 演習

### GEO5-A01 積分曲線と流れを直接求める

$\mathbb R^2$ 上のベクトル場

$$
X
=
\frac{\partial}{\partial x}
+
y\frac{\partial}{\partial y}
$$

を考える。

1. 初期点 $(x_0,y_0)$ を通る積分曲線を求めよ。
2. 最大流 $\Phi_t$ を求めよ。
3. $X$ が完備であることを示せ。
4. 局所群則を直接確認せよ。

- Level: A
- 狙い: ベクトル場から自律 ODE を立て、流れと群則を具体計算する

<!-- solution-start -->
**詳細解答**

積分曲線を

$$
\gamma(t)=(x(t),y(t))
$$

と置きます。条件 $\gamma'(t)=X_{\gamma(t)}$ は

$$
x'(t)=1,
\qquad
y'(t)=y(t)
$$

です。

初期条件

$$
x(0)=x_0,
\qquad
y(0)=y_0
$$

から

$$
x(t)=x_0+t,
\qquad
y(t)=y_0e^t.
$$

従って

$$
\boxed{
\Phi_t(x_0,y_0)
=
(x_0+t,y_0e^t)
}.
$$

この式は全ての $t\in\mathbb R$ で定義されるため、任意の初期点について最大積分曲線の定義域は $\mathbb R$ です。従って $X$ は完備です。

最後に

$$
\begin{aligned}
\Phi_t(\Phi_s(x,y))
&=
\Phi_t(x+s,ye^s)\\
&=
(x+s+t,ye^{s+t})\\
&=
\Phi_{s+t}(x,y).
\end{aligned}
$$

よって群則を直接確認できました。
<!-- solution-end -->

### GEO5-A02 最大積分曲線と有限時刻発散

$\mathbb R$ 上で

$$
X=x^2\frac{\partial}{\partial x}
$$

とする。

1. 初期値 $x(0)=a$ の解を求めよ。
2. $a>0$, $a=0$, $a<0$ のそれぞれについて最大存在区間を求めよ。
3. $X$ が完備でないことを説明せよ。
4. ベクトル場が $\mathbb R$ 全体で滑らかなことと、完備性が別問題である理由を述べよ。

- Level: A
- 狙い: 最大積分曲線と完備性を有限時刻発散から区別する

<!-- solution-start -->
**詳細解答**

積分曲線は

$$
x'=x^2
$$

を満たします。$a\neq0$ なら変数分離して

$$
\frac{dx}{x^2}=dt.
$$

積分すると

$$
-\frac1x=t+C.
$$

$t=0$ で $x=a$ なので $C=-1/a$。従って

$$
-\frac1x
=
t-\frac1a,
$$

$$
\boxed{
x(t)=\frac{a}{1-at}
}.
$$

$a>0$ では分母が $t=1/a$ で0となるため、

$$
I_a=(-\infty,1/a).
$$

$a<0$ では $1/a<0$ なので

$$
I_a=(1/a,\infty).
$$

$a=0$ では定数解 $x(t)\equiv0$ が全時間存在し、

$$
I_0=\mathbb R.
$$

例えば $a=1$ なら $t\uparrow1$ で $x(t)\to+\infty$ となり、時刻1を越えて $\mathbb R$ 内の有限値を取る滑らかな解として延長できません。したがって少なくとも一つの初期点で $I_a\neq\mathbb R$ なので $X$ は完備ではありません。

$X=x^2\partial_x$ の係数 $x^2$ は全実直線上で滑らかです。しかし滑らかさが保証するのは各有限点の近くでの局所存在・一意性です。解自身が有限時間で無限遠へ逃げることまでは防ぎません。
<!-- solution-end -->

### GEO5-A03 Lie 括弧を二通りで計算する

$\mathbb R^2$ 上で

$$
X=\frac{\partial}{\partial x},
\qquad
Y=x\frac{\partial}{\partial y}
$$

とする。

1. 座標公式から $[X,Y]$ を求めよ。
2. 任意の滑らかな関数 $f$ に作用させて同じ答えを得よ。
3. $[Y,X]$ を求めよ。

- Level: A
- 狙い: Lie 括弧を座標公式と導分の可換子の両方から計算する

<!-- solution-start -->
**詳細解答**

$X$ の成分は

$$
(X^x,X^y)=(1,0),
$$

$Y$ の成分は

$$
(Y^x,Y^y)=(0,x).
$$

$x$ 成分は

$$
X(Y^x)-Y(X^x)=0-0=0.
$$

$y$ 成分は

$$
X(Y^y)-Y(X^y)
=
\partial_xx-0
=
1.
$$

従って

$$
\boxed{
[X,Y]=\frac{\partial}{\partial y}
}.
$$

次に任意の $f$ に対して

$$
Yf=x\partial_yf
$$

なので

$$
X(Yf)
=
\partial_x(x\partial_yf)
=
\partial_yf+x\partial_x\partial_yf.
$$

また

$$
Y(Xf)
=
x\partial_y\partial_xf.
$$

混合偏微分が一致するため

$$
[X,Y]f
=
\partial_yf.
$$

よって同じ結論を得ます。

反対称性から

$$
\boxed{
[Y,X]=-\frac{\partial}{\partial y}
}.
$$
<!-- solution-end -->

### GEO5-A04 微分同相写像による押し出し

$$
F:\mathbb R^2\to\mathbb R^2,
\qquad
F(x,y)=(u,v)=(x,e^xy)
$$

とする。

1. $F$ の逆写像を求め、$F$ が微分同相写像であることを確認せよ。
2. $F_*(\partial_x)$ を求めよ。
3. $F_*(\partial_y)$ を求めよ。
4. $X=\partial_x+y\partial_y$ の押し出し $F_*X$ を求めよ。

- Level: A
- 狙い: 押し出しを微分 $dF$ から具体計算する

<!-- solution-start -->
**詳細解答**

$u=x$ なので

$$
x=u.
$$

また $v=e^xy$ だから

$$
y=e^{-u}v.
$$

従って

$$
F^{-1}(u,v)=(u,e^{-u}v),
$$

これは滑らかです。$F$ 自身も滑らかなので微分同相写像です。

微分は

$$
du=dx,
$$

$$
dv=e^xy\,dx+e^x\,dy.
$$

従って

$$
dF(\partial_x)
=
\partial_u+e^xy\,\partial_v
=
\partial_u+v\partial_v.
$$

また

$$
dF(\partial_y)
=
e^x\partial_v
=
e^u\partial_v.
$$

よって

$$
F_*(\partial_x)
=
\partial_u+v\partial_v,
$$

$$
F_*(\partial_y)
=
e^u\partial_v.
$$

最後に押し出しの線形性から

$$
F_*X
=
F_*(\partial_x)
+
(y\circ F^{-1})F_*(\partial_y).
$$

ここで

$$
y\circ F^{-1}=e^{-u}v
$$

なので

$$
\begin{aligned}
F_*X
&=
\partial_u+v\partial_v
+
(e^{-u}v)(e^u\partial_v)\\
&=
\boxed{
\partial_u+2v\partial_v
}.
\end{aligned}
$$
<!-- solution-end -->

### GEO5-B01 関数倍と Lie 括弧

ベクトル場 $X,Y$ と滑らかな関数 $f,g$ に対して次を証明せよ。

1.
   $$
   [X,fY]=f[X,Y]+X(f)Y.
   $$
2.
   $$
   [fX,Y]=f[X,Y]-Y(f)X.
   $$
3.
   $$
   [fX,gY]
   =
   fg[X,Y]
   +
   fX(g)Y
   -
   gY(f)X.
   $$

- Level: B
- 狙い: Lie 括弧が関数係数に対して単純な双線形ではないことを導出する

<!-- solution-start -->
**詳細解答**

任意の $h\in C^\infty(M)$ に作用させます。

まず

$$
\begin{aligned}
[X,fY]h
&=
X(fYh)-fY(Xh)\\
&=
X(f)Yh+fX(Yh)-fY(Xh)\\
&=
\{X(f)Y+f[X,Y]\}h.
\end{aligned}
$$

従って

$$
\boxed{
[X,fY]=f[X,Y]+X(f)Y
}.
$$

次に反対称性を使うと

$$
\begin{aligned}
[fX,Y]
&=
-[Y,fX]\\
&=
-\{f[Y,X]+Y(f)X\}\\
&=
f[X,Y]-Y(f)X.
\end{aligned}
$$

よって

$$
\boxed{
[fX,Y]=f[X,Y]-Y(f)X
}.
$$

最後に1を $fX$ と $gY$ に適用して

$$
[fX,gY]
=
g[fX,Y]+(fX)(g)Y.
$$

2より

$$
[fX,Y]
=
f[X,Y]-Y(f)X,
$$

また

$$
(fX)(g)=fX(g).
$$

従って

$$
\begin{aligned}
[fX,gY]
&=
g\{f[X,Y]-Y(f)X\}+fX(g)Y\\
&=
\boxed{
fg[X,Y]
+
fX(g)Y
-
gY(f)X
}.
\end{aligned}
$$

この式から、Lie 括弧は実数係数では双線形ですが、滑らかな関数係数については微分項が追加されることが分かります。
<!-- solution-end -->

### GEO5-B02 流れが可換でないことを直接見る

$\mathbb R^2$ 上で

$$
X=\partial_x,
\qquad
Y=x\partial_y
$$

とする。

1. $X$ の流れ $\Phi_t$ を求めよ。
2. $Y$ の流れ $\Psi_s$ を求めよ。
3. $\Phi_t\circ\Psi_s$ と $\Psi_s\circ\Phi_t$ を計算し、その差を求めよ。
4. その差と $[X,Y]=\partial_y$ の関係を説明せよ。

- Level: B
- 狙い: Lie 括弧を流れの非可換性として具体的に読む

<!-- solution-start -->
**詳細解答**

$X=\partial_x$ の積分方程式は

$$
x'=1,
\qquad
y'=0.
$$

従って

$$
\boxed{
\Phi_t(x,y)=(x+t,y)
}.
$$

$Y=x\partial_y$ では

$$
x'=0,
\qquad
y'=x.
$$

$x$ は一定なので

$$
\boxed{
\Psi_s(x,y)=(x,y+sx)
}.
$$

まず $\Psi_s$ の後に $\Phi_t$ を作用させると

$$
\Phi_t(\Psi_s(x,y))
=
\Phi_t(x,y+sx)
=
(x+t,y+sx).
$$

逆順では

$$
\begin{aligned}
\Psi_s(\Phi_t(x,y))
&=
\Psi_s(x+t,y)\\
&=
(x+t,y+s(x+t))\\
&=
(x+t,y+sx+st).
\end{aligned}
$$

従って $y$ 座標に

$$
st
$$

だけ差が出ます。

一方

$$
[X,Y]=\partial_y.
$$

つまり「$t$ だけ $X$ 方向へ動いたことで $Y=x\partial_y$ の係数 $x$ が $t$ 増え、その状態で時間 $s$ だけ $Y$ に沿うと追加で $st$ だけ $y$ 方向へ進む」ということです。

Lie 括弧が一次の微分作用素として $\partial_y$ を与え、二つの小時間 $s,t$ を使った流れの交換差ではその効果が $st$ の二次量として現れます。
<!-- solution-end -->

### GEO5-B03 具体的にベクトル場を直線化する

$\mathbb R^2$ 上で

$$
X
=
\partial_x
+
y\partial_y
$$

とする。

1. $X$ の流れを求めよ。
2. 新しい座標
   $$
   u=x,
   \qquad
   v=ye^{-x}
   $$
   が $\mathbb R^2$ 全体の滑らかな座標になることを示せ。
3. この座標で $X=\partial_u$ となることを示せ。
4. $v$ が $X$ の流れに沿って一定であることを確認せよ。

- Level: B
- 狙い: flow-box theorem を具体的な座標変換として再現する

<!-- solution-start -->
**詳細解答**

積分方程式は

$$
x'=1,
\qquad
y'=y.
$$

従って

$$
\Phi_t(x_0,y_0)
=
(x_0+t,y_0e^t).
$$

新座標を

$$
u=x,
\qquad
v=ye^{-x}
$$

とします。逆変換は

$$
x=u,
\qquad
y=ve^u.
$$

両方向とも滑らかなので、これは $\mathbb R^2$ 全体の微分同相座標変換です。

$X$ を新座標関数へ作用させます。

$$
X(u)
=
\partial_xx+y\partial_yx
=
1.
$$

また

$$
\begin{aligned}
X(v)
&=
\partial_x(ye^{-x})
+
y\partial_y(ye^{-x})\\
&=
-ye^{-x}
+
ye^{-x}\\
&=
0.
\end{aligned}
$$

従って新座標で

$$
X
=
X(u)\partial_u+X(v)\partial_v
=
\boxed{\partial_u}.
$$

流れに沿って直接確認しても

$$
v(\Phi_t(x_0,y_0))
=
(y_0e^t)e^{-(x_0+t)}
=
y_0e^{-x_0}
$$

で時間に依存しません。

つまり $u$ は流れに沿って速度1で増え、$v$ は軌道を識別する横方向の座標になっています。
<!-- solution-end -->

### GEO5-C01 回転と拡大の二つの完備流

$$
M=\mathbb R^2\setminus\{(0,0)\}
$$

上で

$$
X
=
-y\partial_x+x\partial_y,
$$

$$
Y
=
x\partial_x+y\partial_y
$$

を考える。

1. $X$ と $Y$ の最大流を求め、両方が完備であることを示せ。
2. $[X,Y]$ を座標公式から計算せよ。
3. 二つの流れが可換することを直接確認せよ。
4. 任意の単連結な角度座標領域で
   $$
   x=r\cos\theta,\qquad y=r\sin\theta
   $$
   と考え、$s=\log r$ を用いると
   $$
   X=\partial_\theta,\qquad Y=\partial_s
   $$
   となることを示せ。
5. この例が「Lie 括弧が0であること」と「二つの方向を同時に座標方向へ直せること」の関係をどう示唆するか説明せよ。

- Level: C
- 狙い: 完備流・Lie 括弧・可換流・局所座標を一つの例で統合し、GEO6 の Frobenius へ接続する

<!-- solution-start -->
**詳細解答**

まず $X$ の積分方程式は

$$
x'=-y,
\qquad
y'=x.
$$

二階微分すると

$$
x''=-x,
\qquad
y''=-y.
$$

初期値 $(x_0,y_0)$ から

$$
\boxed{
\Phi_t(x_0,y_0)
=
(x_0\cos t-y_0\sin t,\,
x_0\sin t+y_0\cos t)
}.
$$

これは原点からの距離を保存する回転なので、初期点が $M$ にあれば全時刻で $M$ に留まります。従って $X$ は完備です。

次に $Y$ では

$$
x'=x,
\qquad
y'=y,
$$

なので

$$
\boxed{
\Psi_s(x_0,y_0)
=
(e^sx_0,e^sy_0)
}.
$$

有限の $s$ では $e^s>0$ なので原点へ到達せず、全ての $s\in\mathbb R$ で $M$ 内にあります。従って $Y$ も完備です。

Lie 括弧を計算します。成分を

$$
X=(-y,x),
\qquad
Y=(x,y)
$$

とします。

$x$ 成分は

$$
X(Y^x)-Y(X^x)
=
X(x)-Y(-y).
$$

ここで

$$
X(x)=-y,
\qquad
Y(-y)=-y,
$$

なので0です。

$y$ 成分は

$$
X(Y^y)-Y(X^y)
=
X(y)-Y(x).
$$

ここで

$$
X(y)=x,
\qquad
Y(x)=x,
$$

なので0です。従って

$$
\boxed{[X,Y]=0}.
$$

流れの可換性も直接分かります。$\Phi_t$ は回転、$\Psi_s$ は正のスカラー倍なので

$$
\Phi_t(e^s(x,y))
=
e^s\Phi_t(x,y).
$$

従って

$$
\boxed{
\Phi_t\circ\Psi_s
=
\Psi_s\circ\Phi_t
}.
$$

次に原点を除く平面全体では角度 $\theta$ を一価に取れませんが、例えば負の $x$ 軸を除く領域など、角度を滑らかに選べる局所領域を取ります。

極座標で

$$
x=r\cos\theta,
\qquad
y=r\sin\theta.
$$

回転流 $\Phi_t$ は

$$
(r,\theta)\longmapsto(r,\theta+t)
$$

なので

$$
X=\partial_\theta.
$$

拡大流 $\Psi_s$ は

$$
(r,\theta)\longmapsto(e^sr,\theta).
$$

ここで

$$
\rho=\log r
$$

と置けば

$$
\rho\longmapsto \rho+s.
$$

従って

$$
Y=\partial_\rho.
$$

よって局所座標 $(\theta,\rho)$ で

$$
\boxed{
X=\partial_\theta,
\qquad
Y=\partial_\rho
}.
$$

座標ベクトル場は混合偏微分の交換から

$$
[\partial_\theta,\partial_\rho]=0
$$

です。この例では

$$
[X,Y]=0
$$

という可換性が、二つの流れの可換性と、二つのベクトル場を同時に座標方向へ直せることの両方に現れています。

GEO6 では、この現象を $k$ 次元のベクトル場族へ一般化します。ただし一般には「個々のベクトル場が非零」だけでは足りず、生成する線形分布が Lie 括弧で閉じることが必要になります。
<!-- solution-end -->

---

## 16. まとめ

本章では、GEO2 の点ごとの接ベクトルを滑らかに束ねてベクトル場

$$
X:M\to TM
$$

を作り、それを時間発展へ変換しました。

局所座標では積分曲線は

$$
u'=F(u)
$$

という通常の自律 ODE です。Picard--Lindelöf の局所存在・一意性から、多様体上でも積分曲線が局所的に一意に存在します。

一意性によって局所解を貼り合わせると最大積分曲線が得られ、全ての初期点をまとめると最大流

$$
\Phi:\mathcal D_X\to M
$$

になります。流れは

$$
\Phi_t\circ\Phi_s=\Phi_{t+s}
$$

という局所群則を満たし、完備ベクトル場では全時間の一パラメータ微分同相写像族になります。

二つのベクトル場の非可換性は

$$
[X,Y]f
=
X(Yf)-Y(Xf)
$$

で測られます。座標表示では

$$
[X,Y]^j
=
\sum_i
\left(
X^i\partial_iY^j
-
Y^i\partial_iX^j
\right),
$$

そして作用素の可換子として見ることで Jacobi 恒等式が自然に出ます。

さらに

$$
\left.
\frac{d}{dt}
\right|_{t=0}
(\Phi_{-t})_*Y
=
[X,Y]
$$

により、Lie 括弧は $X$ の流れで $Y$ を運んだときの一次変化率でもあります。

最後に、$X_p\neq0$ なら局所座標を選んで

$$
X=\partial_{u^1}
$$

と直線化できることを示しました。

次の GEO6 では、一本のベクトル場ではなく $k$ 次元の接方向の族を考えます。そこで問題になるのは、

$$
\text{どの線形分布が実際の }k\text{ 次元部分多様体の接空間になるか}
$$

です。その判定条件が、Lie 括弧で閉じるという involutive 性と Frobenius の定理です。
