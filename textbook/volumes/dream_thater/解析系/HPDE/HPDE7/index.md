# HPDE7 エネルギー流と発散恒等式

[HPDE6のCauchyデータ](../HPDE6/index.md#def-hpde6-cauchy-data)によって、波動方程式にどの二つの初期値を与えるかが分かりました。しかし初期面から離れたところで解の大きさを追うには、方程式を直接積分するだけでは見通しが立ちません。必要なのは、**局所的な波動方程式から、時空領域を出入りするエネルギーの収支を作る**ことです。

まず実スカラー場について、二つの一次微分から対称テンソルを組み立てます。これを時間方向に流れるベクトル場へ変換すると、発散の体積積分が初期面・終期面・側面のフラックスに変わります。光的側面では、単なる「境界項」ではなく、伝播速度を見分ける二乗和が現れます。最後に、束値波動で新たに必要になる計量接続と曲率項を検算します。

以下、$(M,g)$ は境界のない時間向き付き $(n+1)$ 次元（$n\ge1$）の滑らかなLorentz時空、符号は $(-,+,\ldots,+)$ です。局所計算には大域双曲性は不要ですが、Cauchy面上のエネルギーを扱うときは、[HPDE6の空間的初期面](../HPDE6/index.md#def-hpde6-cauchy-slice)と[直交時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)を用います。$\nabla$ はLevi-Civita接続、$\Box_g u=\nabla^a\nabla_a u$、$q\in C^\infty(M,\mathbb R)$ は実ポテンシャルとします。

方程式と源の符号を
$$
P=-\Box_g+q,\qquad Pu=f
$$
と固定します。[HPDE5のnormally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)の実スカラー模型です。このとき
$$
\Box_g u-qu=-f
$$
です。以下の局所恒等式は滑らかな実関数 $u,f$ について述べ、弱解への移行は後の評価・近似を要します。

## 1. 一次微分をエネルギーとして数える

Minkowski空間の $q=0$、$X=\partial_t$ であれば、なじみ深い量は
$$
e=\frac12\bigl((\partial_tu)^2+|\nabla_xu|^2\bigr)
$$
です。しかし時空座標を変えた場合、$\partial_t$ と空間勾配の区別は座標だけからは決まりません。先に、どの方向から見ても意味を持つ二階の共変テンソルを作ります。

<a id="def-hpde7-stress-energy"></a>
<!-- formal-statement-start -->
> **定義（実スカラー場の応力エネルギーテンソル）**  
> Lorentz時空 $(M,g)$、滑らかな実関数 $u$、滑らかな実ポテンシャル $q$ に対し、対称 $(0,2)$ テンソル $T=T[u,q]$ を

$$
T_{ab}=(\nabla_a u)(\nabla_b u)
-\frac12 g_{ab}\bigl(\nabla^c u\,\nabla_c u+q u^2\bigr)
$$

> と定める。添字の上げ下げには $g$ と逆計量 $g^{-1}$ を用いる。対称性は $T_{ab}=T_{ba}$ を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde7-stress-energy -->
### 直接例：Minkowskiのエネルギー密度と運動量流

**定義の確認**。$g=-dt^2+\sum_{i=1}^n(dx^i)^2$ とし、$u_t=\partial_tu$、$u_i=\partial_i u$ と置くと、逆計量での縮約は
$$
\nabla^c u\,\nabla_c u=-u_t^2+\sum_i u_i^2.
$$
$g_{tt}=-1$ と $g_{ti}=0$ を代入すると
$$
T_{tt}=\frac12\left(u_t^2+\sum_i u_i^2+qu^2\right),\qquad
T_{ti}=u_tu_i.
$$
一般式は微分の積と対称計量の和なので、$T_{ab}=T_{ba}$ も成分ごとに確認できます。$q\ge0$ なら $T_{tt}\ge0$、一方 $q<0$ ではこの非負性は保証されません。
<!-- definition-example-end -->

例えば $u(t,x)=tx$（$1+1$ 次元、$q=0$）では $u_t=x$、$u_x=t$ なので
$$
T_{tt}=\tfrac12(x^2+t^2),\qquad T_{tx}=xt.
$$
空間方向の流れが零になるとは限りません。あとで $\partial_t$ を乗数に選ぶと、時間成分 $T_{tt}$ と空間フラックス $-T_{tx}$ が一つの保存電流になります。

## 2. 発散すると方程式が出てくる

応力テンソルの使い道は、その発散で波動方程式の左辺が現れることです。ここではポテンシャルを「定数」と置かずに微分します。

<a id="prop-hpde7-stress-divergence"></a>
<!-- formal-statement-start -->
> **命題（応力エネルギーテンソルの発散）**  
> 滑らかなLorentz時空 $(M,g)$ 上の滑らかな実関数 $u,q,f$ が $(-\Box_g+q)u=f$ を満たすとする。このとき

$$
\nabla^aT_{ab}=-f\,\nabla_bu-\frac12(\nabla_bq)u^2.
$$

> 特に $f=0$ かつ $q$ が定数なら $\nabla^aT_{ab}=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分と $\nabla g=0$ を使います。$u$ がスカラーなので二階共変微分が交換でき、$\nabla_b|\nabla u|_g^2$ に含まれる項と $T$ の第一項の微分が打ち消し合います。最後に $Pu=f$ を代入します。

<!-- proof-start -->
### 証明

[Levi-Civita接続の計量互換性](../../../幾何系/GEO/GEO13/index.md#def-geo13-levi-civita)により $\nabla_ag_{bc}=0$、従って $\nabla^ag_{ab}=0$ です。成分を一つずつ微分すると
$$
\begin{aligned}
\nabla^aT_{ab}
&=(\nabla^a\nabla_a u)\nabla_bu
 +(\nabla^a u)\nabla_a\nabla_bu\\
&\quad-\frac12\nabla_b\bigl(\nabla^cu\,\nabla_cu+qu^2\bigr).
\end{aligned}
$$
計量互換性と積の微分から
$$
\nabla_b(\nabla^cu\,\nabla_cu)
=2(\nabla^au)\nabla_b\nabla_au,
$$
また
$$
\nabla_b(qu^2)=(\nabla_bq)u^2+2qu\,\nabla_bu.
$$
スカラーの二階共変微分は $\nabla_a\nabla_bu=\nabla_b\nabla_au$ なので、二行の混合二階微分が相殺され
$$
\begin{aligned}
\nabla^aT_{ab}
&=(\Box_gu)\nabla_bu-qu\,\nabla_bu
-\tfrac12(\nabla_bq)u^2\\
&=(\Box_gu-qu)\nabla_bu
-\tfrac12(\nabla_bq)u^2\\
&=-f\,\nabla_bu-\tfrac12(\nabla_bq)u^2.
\end{aligned}
$$
最後の行だけで、方程式の符号規約 $-\Box_gu+qu=f$ を使用しました。$\square$
<!-- proof-end -->

この恒等式が説明するのは、**源が仕事をし、時間・空間によって変化するポテンシャルもエネルギー収支に寄与する**ことです。発散零を得るには二つの条件を別々に確認する必要があります。

## 3. 乗数で電流を作る

テンソル $T$ だけでは、領域の境界を流れるベクトルは選べません。時間方向を表すベクトル場 $X$ を一つ指定し、$T$ の一つの添字と縮約します。$X$ は必要な領域で滑らかな未来向き時間的ベクトル場とします。

<a id="def-hpde7-energy-current"></a>
<!-- formal-statement-start -->
> **定義（乗数とエネルギー電流）**  
> 滑らかなベクトル場 $X$ を**乗数**と呼び、実スカラー場の応力エネルギーテンソル $T[u,q]$ から次のベクトル場を**エネルギー電流**と定める。

$$
J^a=-T^a{}_{b}X^b.
$$

> 符号は、未来向き単位法線 $N$ に対して $-g(J,N)=T(N,X)$ となるように選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde7-energy-current -->
### 直接例：保存電流でも空間フラックスは非零

**定義の確認**。Minkowski平面で $X=\partial_t$ とすると $X^t=1$ です。添字を上げる操作は $T^a{}_b=g^{ac}T_{cb}$ であり、逆計量の成分 $g^{tt}=-1$、$g^{xx}=1$、$g^{tx}=0$ を代入すると $T^t{}_t=-T_{tt}$、$T^x{}_t=T_{xt}$ です。従って定義から
$$
J^t=T_{tt},\qquad J^x=-T_{xt}=-u_tu_x.
$$
$u=tx$、$q=0$ を代入すると
$$
J^t=\tfrac12(x^2+t^2),\qquad J^x=-xt.
$$
さらに $Pu=u_{tt}-u_{xx}=0$ なので
$$
\partial_tJ^t+\partial_xJ^x=t-t=0.
$$
$-g(J,\partial_t)=J^t=T(\partial_t,\partial_t)$ という符号条件も直接確かめられます。
<!-- definition-example-end -->

$X$ が場所によって変わると、$T$ の発散が零でも電流の発散が零とは限りません。そこで、**$X$ に沿って計量 $g$ がどう変わるか**を測ります。ベクトル場 $Y,Z$ に対する計量の **Lie微分** は
$
(\mathcal L_Xg)(Y,Z)
=X\bigl(g(Y,Z)\bigr)-g([X,Y],Z)-g(Y,[X,Z])
$
で定まり、$X$ の局所的な流れで計量を引き戻したときの変化率です。ここで $[X,Y]$ はベクトル場のLie括弧です。[Levi-Civita接続の計量互換性と無捩率性](../../../幾何系/GEO/GEO13/index.md#def-geo13-levi-civita)を使うと、
$
\begin{aligned}
X\bigl(g(Y,Z)\bigr)
&=g(\nabla_XY,Z)+g(Y,\nabla_XZ),\\
[X,Y]&=\nabla_XY-\nabla_YX,\\
[X,Z]&=\nabla_XZ-\nabla_ZX
\end{aligned}
$
ですから、これらを上の定義へ代入し
$
(\mathcal L_Xg)(Y,Z)
=g(\nabla_YX,Z)+g(Y,\nabla_ZX)
$
を得ます。すなわち座標成分では $(\mathcal L_Xg)_{ab}=\nabla_aX_b+\nabla_bX_a$ です。これが零なら $X$ に沿う計量の変化がなく、そのようなベクトル場を **Killingベクトル場** と呼びます。計量の変化を応力テンソルと縮約するため、次の記号を導入します。

<a id="def-hpde7-deformation-tensor"></a>
<!-- formal-statement-start -->
> **定義（乗数の変形テンソル）**  
> Lorentz時空 $(M,g)$ の滑らかなベクトル場 $X$ に対して、対称 $(0,2)$ テンソル

$$
\pi^X_{ab}=\nabla_a X_b+\nabla_b X_a
$$

> を $X$ の**変形テンソル**と定める。これは計量のLie微分 $(\mathcal L_Xg)_{ab}$ に等しい。$\pi^X=0$ を満たす $X$ はKillingベクトル場である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde7-deformation-tensor -->
### 直接例：時間並進と時間伸縮は異なる

**定義の確認**。Minkowski平面ではChristoffel記号が零なので $\nabla_aX_b=\partial_aX_b$ です。$X=\partial_t$ なら $X_t=-1$、$X_x=0$ は定数で $\pi^X_{ab}=0$ です。一方 $X=t\partial_t$ では $X_t=-t$ なので
$$
\pi^X_{tt}=2\partial_t(-t)=-2,\qquad
\pi^X_{tx}=\pi^X_{xx}=0.
$$
例えば $t>0$ の領域では $t\partial_t$ も未来時間的ですが、$\mathcal L_Xg=\pi^X$ の $tt$ 成分が $-2$ なので計量を保たず、Killingではありません。定義の全成分を計算することで、乗数の変形項が必要になる例を得ました。
<!-- definition-example-end -->

<a id="thm-hpde7-current-divergence"></a>
<!-- formal-statement-start -->
> **定理（乗数電流の発散恒等式）**  
> 滑らかな実関数 $u,q,f$ が $(-\Box_g+q)u=f$ を満たすとする。任意の滑らかな乗数ベクトル場 $X$ と上記 $T,J,\pi^X$ に対して

$$
\nabla_aJ^a=f\,X(u)+\frac12X(q)u^2-\frac12T^{ab}\pi^X_{ab}.
$$

> 特に $f=0$、$X(q)=0$、$\pi^X=0$ が全て成立するとき、$J$ は発散零である。
<!-- formal-statement-end -->

### 証明の見取り図

$J=-T(X,\cdot)^\sharp$ を積の微分で展開し、[応力テンソルの発散命題](#prop-hpde7-stress-divergence)を適用します。$T^{ab}$ の対称性によって $\nabla_aX_b$ の反対称部分は消えます。

<!-- proof-start -->
### 証明

電流を添字で微分すると
$$
\begin{aligned}
\nabla_aJ^a
&=-\nabla_a(T^a{}_{b}X^b)\\
&=-(\nabla_aT^a{}_{b})X^b-T^a{}_{b}\nabla_aX^b\\
&=-(\nabla^aT_{ab})X^b-T^{ab}\nabla_aX_b.
\end{aligned}
$$
第二項について $T^{ab}=T^{ba}$ を用いると
$$
\begin{aligned}
2T^{ab}\nabla_aX_b
&=T^{ab}\nabla_aX_b+T^{ba}\nabla_bX_a\\
&=T^{ab}(\nabla_aX_b+\nabla_bX_a)
=T^{ab}\pi^X_{ab}.
\end{aligned}
$$
第一項へ[発散公式](#prop-hpde7-stress-divergence)を代入すると
$$
-(\nabla^aT_{ab})X^b
=fX^b\nabla_bu+\tfrac12X^b\nabla_bq\,u^2
=fX(u)+\tfrac12X(q)u^2.
$$
二つを合わせて主張の式を得ます。$\square$
<!-- proof-end -->

この式の三つの右辺は別の働きを持ちます。$fX(u)$ は**源の仕事**、$X(q)u^2/2$ は**ポテンシャルの変化**、$-T^{ab}\pi^X_{ab}/2$ は**時空計量や乗数の変形**です。Minkowskiの時間並進を使う場合だけでなく、曲がった時空の非定常性がエネルギーに現れる理由が見えます。

## 4. 初期面のエネルギーはなぜ非負か

[LORG20の未来向き単位法線](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)を $N$、誘導Riemann計量を $h$ とします。$\nabla u$ を法線方向の微分 $Nu$ と、面に接する微分 $D_\Sigma u$ に分けます。$g(N,N)=-1$ と $g(N,Y)=0$（$Y$ は面に接する）より
$$
\nabla^a u\,\nabla_a u=-(Nu)^2+|D_\Sigma u|_h^2.
$$
この式を[実スカラー場の応力エネルギーテンソル](#def-hpde7-stress-energy)に代入すると
$$
\boxed{T(N,N)=\frac12\bigl((Nu)^2+|D_\Sigma u|_h^2+qu^2\bigr).}
$$
$q\ge0$ なら点ごとに非負です。$q=0$ の場合は定数値の場のエネルギーが零になり得るので、エネルギーが零というだけで場の値が零とは限りません。

未来時間的乗数 $X$ を用いる場合は $T(N,X)$ を積分します。特に $X=N$ とするなら上の二乗和そのものになります。直交分割
$$
g=-\alpha^2dt^2+h_t,\qquad N=\alpha^{-1}\partial_t,\qquad \alpha>0
$$
の各スライス $\Sigma_t$ で、積分が存在する範囲（例：コンパクトなスライス部分）に対し
$$
E_X(t;K_t)=\int_{K_t}T(N,X)\,d\mu_{h_t}
$$
をエネルギーと呼びます。$d\mu_{h_t}$ は誘導Riemann計量の正の体積密度です。非コンパクトな面全体に対して、積分が有限であるとは無仮定では言えません。

## 5. 時空領域を通る収支とStokes公式

ここで**領域の向きが符号を決めます**。$t_0<t_1$ の間にある閉包がコンパクトな領域 $\Omega$ を取り、その境界が初期面部分 $\Sigma_0$、終期面部分 $\Sigma_1$、時間的側面 $B$ からなるとします。各部分は滑らかで、角では区分的に滑らかでよいとします。$N$ は両スライスの未来向き単位法線、$\nu$ は時間的側面 $B$ の**外向き空間的単位法線**です。

Lorentz計量での発散定理では、外向き**共法線**を使います。上側スライスでは $-N^\flat$、下側スライスでは $N^\flat$ が外向き共法線です。例えばMinkowskiで $N=\partial_t$ なら $N^\flat=-dt$ なので、上側の $-N^\flat=dt$ が正の時間方向の外向き共法線です。

<a id="thm-hpde7-stokes-balance"></a>
<!-- formal-statement-start -->
> **定理（エネルギーの境界収支）**  
> $(-\Box_g+q)u=f$ を満たす滑らかな実関数 $u$ と滑らかな乗数 $X$ を取る。上記の閉包がコンパクトな区分的滑らかな領域 $\Omega$ において、$E_i=\int_{\Sigma_i}T(N,X)\,d\mu_{h_i}$、時間的側面フラックスを

$$
F_B=\int_B g(J,\nu)\,d\mu_B
$$

> とおく。ここで $d\mu_B$ は誘導Lorentz計量から作る正の密度である。このとき

$$
\begin{aligned}
E_1+F_B
=E_0+\int_\Omega
\left\{fX(u)+\frac12X(q)u^2
-\frac12T^{ab}\pi^X_{ab}\right\}\,d\mu_g.
\end{aligned}
$$

> この恒等式は領域と場が滑らかであれば成立する。$F_B\ge0$ は一般の時間的側面に対しては主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

発散定理の境界共法線を上面・下面・側面に分けます。上下の時間的単位法線の符号を取り違えないことが核心です。

<!-- proof-start -->
### 証明

発散定理を電流 $J$ に適用すると
$$
\int_\Omega\nabla_aJ^a\,d\mu_g
=\int_{\partial\Omega}J^a n_a\,dS
$$
です。上側では $n=-N^\flat$ より
$$
J^an_a=-g(J,N)=T(N,X),
$$
下側では $n=N^\flat$ より
$$
J^an_a=g(J,N)=-T(N,X).
$$
時間的側面では $n=\nu^\flat$ より $J^an_a=g(J,\nu)$ です。三部分を足すと
$$
\int_\Omega\nabla_aJ^a\,d\mu_g=E_1-E_0+F_B.
$$
左辺に[乗数電流の発散恒等式](#thm-hpde7-current-divergence)を代入し、$E_0$ を移項します。$\square$
<!-- proof-end -->

**平坦模型で境界符号を検算**します。$g=-dt^2+dx^2$、$u=tx$、$q=f=0$、$X=\partial_t$、$\Omega=[0,T]\times[-L,L]$（$T,L>0$）とすると
$$
E(t)=\int_{-L}^L\tfrac12(x^2+t^2)\,dx=\frac{L^3}{3}+Lt^2.
$$
右側面 $x=L$ の流出は $J^x=-Lt$、左側面 $x=-L$ では外向きが $-\partial_x$ なので $-J^x=-Lt$。従って
$$
F_B=\int_0^T(-Lt-Lt)\,dt=-LT^2
$$
です。他方 $E(T)-E(0)=LT^2$ なので $E(T)+F_B=E(0)$ となり、源・ポテンシャル変化・変形が全て零の式と一致します。**時間的側面のフラックスは負にもなります**。この例を光的側面の符号の議論へそのまま流用してはいけません。

## 6. 光的側面では何が非負になるか

有限伝播を示す際には、未来に向かって**細くなる**過去向き光円錐の内部を調べます。光的面の法線は長さ零であり、単位法線へ規格化できません。このため[前節の時間的側面の $d\mu_B$](#thm-hpde7-stokes-balance)をそのまま使わず、**外向き共法線とそれに合わせた面測度の積**としてフラックスを定義します。

平坦空間で $r=|x|$、$0\le t\le T<R$、領域を $r\le R-t$ とします（$r=0$ での極座標特異性は $r=R-t>0$ の側面には現れません）。右辺 $F=t+r-R\le0$ の外向き共法線は
$$
dF=dt+dr.
$$
それを逆計量でベクトルにすると $K=g^{-1}(dF,\cdot)=-\partial_t+\partial_r$ で、**過去向き光的**です。$X=\partial_t$ とおき、$u_r$ を半径方向の微分、$\nabla_{\mathbb S}u$ を半径方向に直交する空間勾配とすると
$$
\begin{aligned}
J^a(\partial_aF)
&=J^t+J^r\\
&=\tfrac12\bigl(u_t^2+u_r^2+
|\nabla_{\mathbb S}u|^2+qu^2\bigr)-u_tu_r\\
&=\tfrac12\bigl((u_t-u_r)^2+
|\nabla_{\mathbb S}u|^2+qu^2\bigr).
\end{aligned}
$$
$q\ge0$ なら右辺は非負です。積分を $dt\,dS_{R-t}$ で行うと、光的側面のフラックスはこの非負密度の積分になります。**面の定義関数 $F$ を正の関数倍した場合は共法線と面測度を整合して変える**必要があり、数式中の $dF$ だけを独立に変更してはいけません。

<a id="prop-hpde7-null-flux"></a>
<!-- formal-statement-start -->
> **命題（光的側面の非負フラックス）**  
> 実スカラー場の応力テンソルで $q\ge0$ とする。$X$ が未来向き時間的、$K$ が過去向き光的なベクトルであるなら

$$
g(J,K)=-T(X,K)\ge0.
$$

> 特に、領域の外向き共法線に対応する $K$ が過去向き光的な側面では、整合した正の面密度に対するエネルギーフラックスは非負である。未来向き光的外法線では不等号の向きが逆になり得る。
<!-- formal-statement-end -->

### 証明の見取り図

未来向き時間的 $X$ に合わせたLorentz直交基底で、過去光的 $K$ を時間方向と一つの空間方向の和に規格化します。二乗和を展開すれば符号が決まります。

<!-- proof-start -->
### 証明

[時間的ベクトルの直交補空間の正定値性](../../../幾何系/LORG/LORG1/index.md#lem-lorg1-timelike-orthogonal)により、各点で $X=a e_0$（$a>0$、$e_0$ は未来向き単位時間的）となるLorentz直交基底 $(e_0,e_1,\dots,e_n)$ を取れます。過去向き光的な $K$ は、空間方向を回転して $K=b(-e_0+e_1)$（$b>0$）と書けます。$v_j=e_j(u)$ と書くと
$$
\begin{aligned}
-T(X,K)
&=ab\bigl(T(e_0,e_0)-T(e_0,e_1)\bigr)\\
&=\frac{ab}{2}\left\{(v_0-v_1)^2+
\sum_{i=2}^n v_i^2+qu^2\right\}\ge0.
\end{aligned}
$$
二行目は[実スカラー場の応力エネルギーテンソル](#def-hpde7-stress-energy)の $T(e_0,e_0)=\tfrac12(v_0^2+\sum_{i\ge1}v_i^2+qu^2)$ および $T(e_0,e_1)=v_0v_1$ を代入したものです。$\square$
<!-- proof-end -->

この非負性は $q<0$ の場合にはそのまま使えません。また側面が**外向き未来光的**なら $g(J,K)$ は一般に非正です。どの領域の内外を選んだかを先に確定することが、後の有限伝播の議論に不可欠です。

## 7. 束値の作用素では曲率が残る

[HPDE5の一意分解](../HPDE5/index.md#thm-hpde5-unique-connection)は一般のnormally hyperbolic作用素を接続と零次項へ分けました。しかしそこから自動的に正定値エネルギーは生まれません。[HPDE4の束計量](../HPDE4/index.md#def-hpde4-hermitian-bundle-metric)を**正定値**に選び、接続がその計量と互換であること、零次作用素 $W$ が自己随伴であることを、追加仮定として指定します。

実束では対称正定値内積 $\langle\cdot,\cdot\rangle$、複素束では正定値Hermite内積を用います。複素束では次の積はすべて実部 $\operatorname{Re}\langle\cdot,\cdot\rangle$ を取ると約束します。[HPDE4の計量両立接続](../HPDE4/index.md#def-hpde4-metric-compatible-connection)による計量互換性とは
$$
X\operatorname{Re}\langle v,w\rangle
=\operatorname{Re}\langle\nabla^E_Xv,w\rangle
+\operatorname{Re}\langle v,\nabla^E_Xw\rangle
$$
です。二方向の束接続微分を交換した差として現れる作用素を $R^E$ と書き、
$$
R^E(X,Y)s
=\nabla^E_X\nabla^E_Ys-\nabla^E_Y\nabla^E_Xs-\nabla^E_{[X,Y]}s
$$
で定まります。

ここで $W$ の**自己随伴性**は各点の束内積について
$
\langle Wv,w\rangle=\langle v,Ww\rangle
\qquad(v,w\in E_p)
$
となる条件です。これは[HPDE4での零次束写像の随伴](../HPDE4/index.md#prop-hpde4-adjoint-from-transpose)を同じ束に適用した条件であり、一般の接続の計量互換性とは別です。また $W$ 自身が場所によって変わる量を表すため、自己準同型束上の誘導接続を
$
(\nabla_b^{\mathrm{End}}W)u
:=\nabla_b^E(Wu)-W(\nabla_b^Eu)
$
によって定義します。これは $\nabla_b^E(Wu)=(\nabla_b^{\mathrm{End}}W)u+W\nabla_b^Eu$ という積の微分公式を意味します。$W$ が自己随伴で接続が計量互換なら、$\nabla_b^{\mathrm{End}}W$ も自己随伴です。

この仮定の下で二階束微分の交換による補正項を計算します。スカラーでの二階微分の交換可能性は失われるので、曲率を残した式そのものを次の命題で確認します。

<a id="prop-hpde7-bundle-divergence"></a>
<!-- formal-statement-start -->
> **命題（束値応力テンソルの曲率補正）**  
> $E\to M$ を有限ランクの実・複素ベクトル束とし、正定値束計量に互換な接続 $\nabla^E$ と、自己随伴な滑らかな自己準同型 $W$ を与える。$P=-\Box_g^{\nabla^E}+W$、$Pu=f$ とし、滑らかな切断 $u$ に対し

$$
T_{ab}=\operatorname{Re}\langle\nabla_a^Eu,\nabla_b^Eu\rangle
-\frac12g_{ab}
\bigl(\operatorname{Re}\langle\nabla^{c,E}u,\nabla_c^Eu\rangle+
\langle Wu,u\rangle\bigr)
$$

> と定める。このとき

$$
\begin{aligned}
\nabla^aT_{ab}
&=-\operatorname{Re}\langle f,\nabla_b^Eu\rangle
+\operatorname{Re}\langle\nabla^{a,E}u,R^E_{ab}u\rangle\\
&\quad-\frac12\langle(\nabla_b^{\mathrm{End}}W)u,u\rangle.
\end{aligned}
$$

> 特に一般の束では、実スカラーと違って曲率項を自動的に零にできない。
<!-- formal-statement-end -->

### 証明の見取り図

計量互換性でスカラーの場合と同じ積の微分ができますが、二階束微分は交換できません。交換子がちょうど曲率を作ります。

<!-- proof-start -->
### 証明

$\nabla g=0$ と[束接続の計量互換性](../HPDE4/index.md#def-hpde4-metric-compatible-connection)を使い、まず応力テンソルの第一項を微分します。
$
\begin{aligned}
\nabla^a\operatorname{Re}\langle\nabla_a^Eu,\nabla_b^Eu\rangle
&=\operatorname{Re}\langle\Box_g^{\nabla^E}u,\nabla_b^Eu\rangle\\
&\quad+\operatorname{Re}\langle\nabla^{a,E}u,\nabla_a^E\nabla_b^Eu\rangle.
\end{aligned}
$
計量の逆行列も接続で保存されるので、運動項を微分すると
$
\frac12\nabla_b\operatorname{Re}\langle\nabla^{c,E}u,\nabla_c^Eu\rangle
=\operatorname{Re}\langle\nabla^{a,E}u,\nabla_b^E\nabla_a^Eu\rangle
$
です。この二式を差し引くと
$
\begin{aligned}
\nabla^aT_{ab}
&=\operatorname{Re}\langle\Box_g^{\nabla^E}u,\nabla_b^Eu\rangle\\
&\quad+\operatorname{Re}\langle\nabla^{a,E}u,
\nabla_a^E\nabla_b^Eu-\nabla_b^E\nabla_a^Eu\rangle\\
&\quad-\tfrac12\nabla_b\langle Wu,u\rangle.
\end{aligned}
$$
ここで二階微分は $T^*M\otimes E$ 上の誘導接続で取っています。torsion-free のLevi-Civita接続により、この差は $R^E_{ab}u$ です。$W$ の自己随伴性を使えば
$$
\nabla_b\langle Wu,u\rangle
=\langle(\nabla_b^{\mathrm{End}}W)u,u\rangle
+2\operatorname{Re}\langle Wu,\nabla_b^Eu\rangle.
$$
これを代入し、$Pu=-\Box_g^{\nabla^E}u+Wu=f$ を整理すると主張の式を得ます。$\square$
<!-- proof-end -->

束値で非負の時間エネルギーを得るには、さらに $W\ge0$（各点で $\langle Wv,v\rangle\ge0$）があれば
$$
T(N,N)=\tfrac12\left(
\|\nabla_N^E u\|^2+\|D_\Sigma^Eu\|_h^2+\langle Wu,u\rangle\right)\ge0
$$
です。一方、一般の $P$ の一意な接続 $\nabla^P$ は**任意の正定値束計量と互換であるとは限りません**。非互換な場合は追加の一階誤差が出るため、今の命題をそのまま引用できません。曲率項や係数の誤差を積分で制御するのが次章の仕事です。

## 8. 演習：発散・向き・境界項を一つずつ検算する

式の丸暗記ではなく、どの仮定でどの項が消え、どの面でフラックスがどちらを向くかを判定してください。

<a id="ex-hpde7-a01"></a>
### A1. エネルギー密度の符号
- Level: A
- 問題：$1+2$ 次元Minkowskiで実関数 $u(t,x,y)=t^2+xy$、ポテンシャル $q=4$ とする。$T_{tt}$ と $T_{tx}$ を求め、$T_{tt}\ge0$ を確認せよ。

<!-- solution-start -->
**詳細解答**。$u_t=2t$、$u_x=y$、$u_y=x$、$\nabla^cu\nabla_cu=-4t^2+x^2+y^2$ です。[実スカラー場の応力エネルギーテンソル](#def-hpde7-stress-energy)から
$$
\begin{aligned}
T_{tt}&=(2t)^2+\tfrac12(-4t^2+x^2+y^2+4(t^2+xy)^2)\\
&=2t^2+\tfrac12(x^2+y^2)+2(t^2+xy)^2\ge0,\\
T_{tx}&=u_tu_x=2ty.
\end{aligned}
$$
非負性には $q=4\ge0$ と空間部分の正定値性を使いました。
<!-- solution-end -->

<a id="ex-hpde7-a02"></a>
### A2. 源がある場合の収支
- Level: A
- 問題：Minkowski平面で $q=0$、$X=\partial_t$、$u(t,x)=t^2\sin x$ とする。$f=Pu$ と電流の発散 $\partial_tJ^t+\partial_xJ^x$ を別々に計算し、$fu_t$ と一致することを示せ。

<!-- solution-start -->
**詳細解答**。$P=\partial_t^2-\partial_x^2$ なので
$$
f=2\sin x+t^2\sin x=(2+t^2)\sin x.
$$
$u_t=2t\sin x$、$u_x=t^2\cos x$ から
$$
J^t=\tfrac12(4t^2\sin^2x+t^4\cos^2x),
\qquad J^x=-2t^3\sin x\cos x.
$$
各偏微分を省略せず書くと
$$
\partial_tJ^t=4t\sin^2x+2t^3\cos^2x,
$$
$$
\partial_xJ^x=-2t^3(\cos^2x-\sin^2x).
$$
従って和は $4t\sin^2x+2t^3\sin^2x=(2+t^2)(2t\sin x)=fu_t$ です。
<!-- solution-end -->

<a id="ex-hpde7-a03"></a>
### A3. 時間依存ポテンシャル
- Level: A
- 問題：Minkowski平面で $q=q(t)$ が滑らかな実関数、$X=\partial_t$ とする。$u$ が $(-\Box+q)u=0$ を満たすとき $\partial_aJ^a$ を求めよ。$q(t)=1+t^2$ なら何になるか。

<!-- solution-start -->
**詳細解答**。$f=0$、時間並進はKillingなので $\pi^X=0$ です。[乗数電流の発散定理](#thm-hpde7-current-divergence)に $X(q)=q'(t)$ を代入し
$$
\partial_aJ^a=\tfrac12q'(t)u^2.
$$
$q(t)=1+t^2$ では $q'(t)=2t$ より $\partial_aJ^a=tu^2$ です。$q$ が非負でも時間変化があれば発散は一般に零ではありません。
<!-- solution-end -->

<a id="ex-hpde7-a04"></a>
### A4. Killing条件と変形項
- Level: A
- 問題：Minkowski平面で $X=t\partial_t$ とする。$\pi^X_{tt}$ と $\pi^X_{xx}$ を求め、$T^{ab}\pi^X_{ab}$ を $T_{tt}$ で表せ。

<!-- solution-start -->
**詳細解答**。$X_t=-t$、$X_x=0$ なので $\pi^X_{tt}=-2$、$\pi^X_{xx}=0$、混合項も零です。逆計量で二回添字を上げると $T^{tt}=g^{tt}g^{tt}T_{tt}=T_{tt}$ ですから
$$
T^{ab}\pi^X_{ab}=-2T^{tt}=-2T_{tt}.
$$
従って源もポテンシャル変化もない場合の電流発散には $-\tfrac12T^{ab}\pi^X_{ab}=T_{tt}$ が残ります。
<!-- solution-end -->

<a id="ex-hpde7-b01"></a>
### B1. 長方形の側面フラックス
- Level: B
- 問題：Minkowski平面の $[0,T]\times[-L,L]$（$T,L>0$）で $u=tx$、$q=f=0$、$X=\partial_t$ とする。上下のエネルギーと左右の外向きフラックスをそれぞれ積分し、Stokes収支を検証せよ。

<!-- solution-start -->
**詳細解答**。$u_t=x$、$u_x=t$ なので $J^t=(x^2+t^2)/2$、$J^x=-xt$ です。各水平面のエネルギーは
$$
E(t)=\int_{-L}^L\tfrac12(x^2+t^2)\,dx
=\left[\tfrac{x^3}{6}+\tfrac{t^2x}{2}\right]_{-L}^L
=\tfrac{L^3}{3}+Lt^2.
$$
右側 $x=L$ の外向き空間法線は $\partial_x$ だから $g(J,\nu)=-Lt$、左側 $x=-L$ では法線 $-\partial_x$ なので $g(J,\nu)=-J^x(t,-L)=-Lt$ です。従って
$$
F_B=\int_0^T(-Lt-Lt)\,dt=-LT^2.
$$
時間並進で $\pi^X=0$、$q=f=0$ なので[境界収支定理](#thm-hpde7-stokes-balance)の右辺は $E(0)$ であり、
$$
E(T)+F_B=\tfrac{L^3}{3}+LT^2-LT^2=E(0).
$$
符号の相殺まで確認できました。
<!-- solution-end -->

<a id="ex-hpde7-b02"></a>
### B2. 光的側面の二乗和
- Level: B
- 問題：$1+1$ 次元Minkowskiで $q\ge0$、$\Omega=\{(t,x):0\le t\le T,\ |x|\le R-t\}$（$0<T<R$）、$X=\partial_t$ とする。右側面 $x=R-t$ と左側面 $x=-R+t$ の外向き共法線で $J$ を縮約し、両方の非負性を示せ。

<!-- solution-start -->
**詳細解答**。右側面の領域内側は $t+x-R\le0$、従って外向き共法線 $dt+dx$ を取ります。電流成分は
$$
J^t=\tfrac12(u_t^2+u_x^2+qu^2),\qquad J^x=-u_tu_x
$$
なので
$$
J^a(dt+dx)_a=J^t+J^x
=\tfrac12\bigl((u_t-u_x)^2+qu^2\bigr)\ge0.
$$
左側面では内側が $t-x-R\le0$ なので共法線 $dt-dx$ を取り
$$
J^a(dt-dx)_a=J^t-J^x
=\tfrac12\bigl((u_t+u_x)^2+qu^2\bigr)\ge0.
$$
ともに過去向き光的な外法線に対応します。右側と左側で交差項の符号が逆になるのは、**外向き空間方向が逆**だからです。
<!-- solution-end -->

<a id="ex-hpde7-b03"></a>
### B3. 束接続の曲率項を見つける
- Level: B
- 問題：正定値内積を持つ実ランク2束と計量互換接続を考え、$W=0$、$Pu=-\Box^\nabla u=f$ とする。$(\nabla^a\nabla_b-\nabla_b\nabla^a)u$ から応力テンソルの発散に残る項を書き、平坦接続の場合と比較せよ。

<!-- solution-start -->
**詳細解答**。$T_{ab}=\langle\nabla_a u,\nabla_bu\rangle-\tfrac12g_{ab}\langle\nabla^cu,\nabla_cu\rangle$ とします。積の微分と計量互換性より
$$
\begin{aligned}
\nabla^aT_{ab}
&=\langle\Box^\nabla u,\nabla_bu\rangle
+\langle\nabla^au,\nabla_a\nabla_bu-\nabla_b\nabla_au\rangle.
\end{aligned}
$$
二階の誘導接続の差は $R^E_{ab}u$ ですから
$$
\nabla^aT_{ab}=-\langle f,\nabla_bu\rangle
+\langle\nabla^au,R^E_{ab}u\rangle.
$$
平坦接続なら $R^E_{ab}=0$ で第二項が消えます。計量互換性だけでは第二項は消えず、スカラーの計算をそのまま移せません。
<!-- solution-end -->

<a id="ex-hpde7-c01"></a>
### C1. 縮む光円錐でエネルギーを閉じる
- Level: C
- 問題：$1+1$ 次元Minkowskiで $P=\partial_t^2-\partial_x^2+q$（定数 $q\ge0$）、実関数 $u$ は $Pu=f$ を満たすとする。$0<T<R$、$K_t=[-R+t,R-t]$ とし、
$$
E(t)=\frac12\int_{K_t}(u_t^2+u_x^2+qu^2)\,dx
$$
と定める。(i) $E'(t)$ の式を $fu_t$ と二つの非負の境界二乗和で表せ。(ii) 積分した収支を示せ。(iii) $f=0$、$u(0,x)=u_t(0,x)=0$（$|x|\le R$）なら縮む三角領域で $u=0$ と証明せよ。

<!-- solution-start -->
**詳細解答**。(i) $e=\tfrac12(u_t^2+u_x^2+qu^2)$ と書きます。連鎖律・積の微分より
$$
\begin{aligned}
\partial_te&=u_tu_{tt}+u_xu_{xt}+quu_t\\
&=u_t(u_{tt}-u_{xx}+qu)+\partial_x(u_tu_x)\\
&=fu_t+\partial_x(u_tu_x).
\end{aligned}
$$
積分区間の右端 $b(t)=R-t$ は $b'=-1$、左端 $a(t)=-R+t$ は $a'=1$ です。可動端点の積分微分を両端に適用して
$$
\begin{aligned}
E'(t)
&=\int_{a(t)}^{b(t)}\partial_te\,dx
-e(t,b(t))-e(t,a(t))\\
&=\int_{K_t}fu_t\,dx
+u_tu_x|_{x=b(t)}-u_tu_x|_{x=a(t)}\\
&\qquad-e(t,b(t))-e(t,a(t)).
\end{aligned}
$$
右端と左端の式を平方完成すると
$$
E'(t)=\int_{K_t}fu_t\,dx
-\frac12\bigl((u_t-u_x)^2+qu^2\bigr)\big|_{x=R-t}
-\frac12\bigl((u_t+u_x)^2+qu^2\bigr)\big|_{x=-R+t}.
$$
(ii) 右辺の二つの二乗和を $F_R(t),F_L(t)$ と名付け、$0$ から $T$ まで積分すれば
$$
E(T)+\int_0^T(F_R(t)+F_L(t))\,dt
=E(0)+\int_0^T\int_{K_t}fu_t\,dx\,dt.
$$
これは[Stokes収支](#thm-hpde7-stokes-balance)を二つの光的境界で直接検算した式です。

(iii) 初期データが零なので $E(0)=0$ です。$f=0$ と $q\ge0$ より、(ii) の左辺は非負項の和で零です。特に全ての $0\le t\le T$ で $E(t)=0$。$u_t,u_x$ は連続で、各 $K_t$ の内部でその二乗の積分が零なので点ごとに $u_t=u_x=0$ です。三角領域は連結であり、両偏微分が零だから $u$ は定数です。初期値 $u(0,0)=0$ からこの定数は零で、全領域で $u=0$ となります。$q=0$ でも最後の初期値を使うので結論は変わりません。
<!-- solution-end -->

## 9. 次章へ：恒等式から不等式へ

この章の収支は**滑らかな場に対する等式**です。次のHPDE8では、変形項、時間変化するポテンシャル、束接続の曲率・係数をエネルギーで評価し、積分不等式を作ります。重要なのは、局所的に制御された時空領域で定数を選ぶことであり、非コンパクトな初期面や無限時間のスラブ全体へ一様な定数を無条件に置くことではありません。
