# GBG22 接続を変えても特性類が変わらないのはなぜか

[Chern–Weil形式の閉性](../GBG21/index.md#thm-gbg21-chern-weil-closed)により、曲率から作った Chern–Weil形式は de Rham コホモロジー類を与える。しかし、閉形式であることだけでは、**接続の選択を変えても同じ類になる**とは分からない。例えば円周上の閉1形式はすべて完全形式というわけではない。

解決の鍵は、二つの接続の間を連続的に結び、曲率多項式の変化率を外微分として表すことである。[GBG12の接続全体のアフィン空間構造](../GBG12/index.md#thm-gbg12-connections-affine)が補間を可能にし、[GBG20のAd不変性の無限小条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)と[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)が、変化率を外微分へ変える。

**本講の共通設定**。$M$ は Hausdorff・第二可算で境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\mathfrak g$ はその実 Lie 環とする。$G$ の連結性・行列群性を仮定しない。

$\pi:P\to M$ を滑らかな右主 $G$ 束とし、$\omega_0,\omega_1$ は $P$ 上の二つの接続1形式、$\Omega_0,\Omega_1$ はその曲率とする。

整数 $k\ge1$ を固定する。$p:\mathfrak g^k\to\mathbb C$ は実多重線形、対称、Ad不変な形式である。複素値の微分形式には外微分・外積を複素線形に拡張する。計量、向き、コンパクト性は主定理に不要である。

<!-- definition-example-audit: strict -->

## 1. 二つの接続をつなぐ

[GBG12の接続差の定理](../GBG12/index.md#thm-gbg12-connection-difference)によると、$\alpha=\omega_1-\omega_0$ は、基本垂直ベクトル場 $\xi_P$ 上で $\alpha(\xi_P)=0$ を満たし、右作用に関して $R_g^*\alpha=\operatorname{Ad}(g^{-1})\alpha$ と変換する。すなわち水平・随伴同変な $\mathfrak g$ 値1形式である。したがって、接続を混ぜた

$$
\omega_t=\omega_0+t\alpha,\qquad 0\le t\le1
$$

も再生条件 $\omega_t(\xi_P)=\xi$ と右作用同変条件を満たす。これは[アフィン空間としての接続の定理](../GBG12/index.md#thm-gbg12-connections-affine)の具体的な使用である。

局所 section $s_i:U_i\to P$ を一つ固定すると、$A_{r,i}=s_i^*\omega_r$、$a_i=A_{1,i}-A_{0,i}$（$r=0,1$）として

$$
A_{t,i}=A_{0,i}+t a_i,\qquad
F_{t,i}=dA_{t,i}+\frac12[A_{t,i}\wedge A_{t,i}]
$$

となる。$\dot A_{t,i}=a_i$ は $t$ に依存しない。別の局所 section $s_j=s_i g_{ij}$ を使うと[GBG8の接続変換則](../GBG8/index.md#thm-gbg8-local-transform)により、両端の非斉次項が引き算で消える。

$$
a_j=\operatorname{Ad}(g_{ij}^{-1})a_i,\qquad
F_{t,j}=\operatorname{Ad}(g_{ij}^{-1})F_{t,i}.
$$

よって $a_i$ は一般に大域的な $\mathfrak g$ 値1形式ではないが、両者から作る Ad不変な数値形式は貼り合わさる。この区別が最後まで重要となる。

### 曲率を補間パラメータで微分する

[GBG12の曲率変化公式](../GBG12/index.md#prop-gbg12-curvature-variation)は二接続の差を記述する。ここではそれを補間曲線に沿って微分して、後の証明に使える形へ導き直す。

<a id="lem-gbg22-curvature-variation"></a>

<!-- formal-statement-start -->
> **補題（補間接続の曲率変化率）**  
> 上の滑らかな右主 $G$ 束上で、$\omega_t=\omega_0+t\alpha$、$\alpha=\omega_1-\omega_0$ とする。曲率 $\Omega_t=d\omega_t+\frac12[\omega_t\wedge\omega_t]$ は

$$
\frac{d}{dt}\Omega_t=d\alpha+[\omega_t\wedge\alpha].
$$

> 特に任意の局所 section に対して、$A_t=s^*\omega_t$、$a=s^*\alpha$、$F_t=s^*\Omega_t$ とすれば

$$
\dot F_t=da+[A_t\wedge a].
$$

> 行列 Lie 群では、最後の式の括弧項は $A_t\wedge a+a\wedge A_t$ である。
<!-- formal-statement-end -->

**証明の見取り図**。曲率の二次項を微分すると二項が現れる。Lie環値形式の括弧は次数1同士に対して対称になり、二項をまとめられる。行列積そのものを交換するわけではない。

<!-- proof-start -->
### 証明

$\dot\omega_t=\alpha$ と $d$ と $t$ 微分の交換から

$$
\begin{aligned}
\dot\Omega_t
&=d\alpha+\frac12\bigl(
[\alpha\wedge\omega_t]+[\omega_t\wedge\alpha]\bigr)\\
&=d\alpha+[\omega_t\wedge\alpha].
\end{aligned}
$$

Lie環値形式の括弧について $[u\wedge v]=-(-1)^{\deg u\deg v}[v\wedge u]$ であり、ここでは双方が次数1なので $[\alpha\wedge\omega_t]=[\omega_t\wedge\alpha]$ である。局所 section で引き戻すと $d$ および括弧付き外積と可換だから $\dot F_t=da+[A_t\wedge a]$。行列表現なら

$$
[A_t\wedge a]
=A_t\wedge a-(-1)^{1\cdot1}a\wedge A_t
=A_t\wedge a+a\wedge A_t.
$$

ここで $a$ が水平・同変であることは、この式が局所式として整合するための条件でもある。
<!-- proof-end -->

**直接計算**。積主 $U(1)$ 束上で $A_0=ix\,dy$、$A_1=i(x\,dy+z\,dw)$ とすれば $a=iz\,dw$、$F_t=i(dx\wedge dy+t\,dz\wedge dw)$ である。$U(1)$ は可換なので括弧項は零、上の補題の両辺はともに $i\,dz\wedge dw$ となる。

## 2. 変化率が外微分になる理由

局所式にある $a$ は次数1、$F_t$ は次数2である。[GBG20の曲率多項式の規則](../GBG20/index.md#def-gbg20-curvature-polynomial-form)を、曲率以外の Lie環値形式にも同じ多重線形・外積規則で拡張して $p(a,F_t^{k-1})$ と書く。次数は $1+2(k-1)=2k-1$ である。

まず外微分の符号を確かめる。[GEO7の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を各項へ適用すると、最初の次数1の因子を越えて $F_t$ を微分する際に負号が付く。

$$
d\,p(a,F_t^{k-1})
=p(da,F_t^{k-1})-(k-1)p(a,dF_t,F_t^{k-2})
$$

（$k=1$ では第二項を置かない）。[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)から $dF_t=-[A_t\wedge F_t]$ なので、右辺は

$$
p(da,F_t^{k-1})+
(k-1)p(a,[A_t\wedge F_t],F_t^{k-2})
$$

となる。この第二項を $p([A_t\wedge a],F_t^{k-1})$ に変えるのが核心である。

<a id="lem-gbg22-invariant-derivative"></a>

<!-- formal-statement-start -->
> **補題（Ad不変性と次数1の因子の外微分）**  
> $U$ 上の $\mathfrak g$ 値1形式 $A,a$ と $\mathfrak g$ 値2形式 $F$ が $dF+[A\wedge F]=0$ を満たすとする。$p:\mathfrak g^k\to\mathbb C$ を対称Ad不変な実 $k$ 重線形形式とすると、$k\ge1$ について

$$
d\,p(a,F^{k-1})
=p(da+[A\wedge a],F^{k-1}).
$$

<!-- formal-statement-end -->

**証明の見取り図**。Ad不変性の無限小条件を、係数 $A^b$、$a^c$、$F^{d}$ に適用する。$A$ を左端に動かすとき、$a$ の次数が1であるため負号が一つ生じる。その負号が外微分の Leibniz 則の負号と組み合わさる。

<!-- proof-start -->
### 証明

実基底 $(e_b)$ に対して $A=\sum_b e_b A^b$、$a=\sum_c e_c a^c$、$F=\sum_d e_d F^d$ と展開する。[Ad不変性の無限小条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)を $Y=e_b$、$X_1=e_c$、$X_2,\ldots,X_k$ を $F$ の係数基底にして適用する。

$$
p([e_b,e_c],e_{d_2},\ldots,e_{d_k})
+\sum_{j=2}^k
p(e_c,e_{d_2},\ldots,[e_b,e_{d_j}],\ldots,e_{d_k})=0.
$$

この係数に $A^b\wedge a^c\wedge F^{d_2}\wedge\cdots\wedge F^{d_k}$ を掛けて和を取る。第二項の形式表現 $p(a,[A\wedge F],F^{k-2})$ では $A^b$ が $a^c$ の右側にあるので、左端へ動かすと $(-1)^{1\cdot1}=-1$。$F$ を横切る符号は $(-1)^{1\cdot2}=1$。従って

$$
p([A\wedge a],F^{k-1})
-(k-1)p(a,[A\wedge F],F^{k-2})=0.
$$

この等式を前述の Leibniz 則と $dF=-[A\wedge F]$ へ代入すると

$$
\begin{aligned}
d\,p(a,F^{k-1})
&=p(da,F^{k-1})+(k-1)p(a,[A\wedge F],F^{k-2})\\
&=p(da+[A\wedge a],F^{k-1}).
\end{aligned}
$$

$k=1$ では Ad不変性から $p([A\wedge a])=0$ が直接従い、$d\,p(a)=p(da)$ なので同じ式が成立する。
<!-- proof-end -->

ここで「共変外微分の形」を使う必要性が見える。一般には $dF_t$ は零ではないが、曲率であるため Bianchi 恒等式が使える。また $p$ を Ad不変と仮定しなければ、Lie括弧の相殺は保証されない。

## 3. Transgression と接続非依存性

二つの接続の間で現れる次数 $2k-1$ の形式を積分すると、曲率多項式の**差を外微分として表す形式**を作れる。これを transgression（推移形式）と呼ぶ。積分するのは基底多様体の点ではなく、有限区間 $0\le t\le1$ のパラメータについてである。

<a id="def-gbg22-transgression"></a>

<!-- formal-statement-start -->
> **定義（Chern–Weil の transgression 形式）**  
> 共通設定の滑らかな右主 $G$ 束、二接続 $\omega_0,\omega_1$、対称Ad不変 $k$ 重線形形式 $p$ に対し、$\alpha=\omega_1-\omega_0$、$\omega_t=\omega_0+t\alpha$ とする。各局所 section $s_i$ について $a_i=s_i^*\alpha$、$F_{t,i}=s_i^*\Omega_t$ と置く。次の局所式が貼り合わさって定まる大域的な $(2k-1)$ 形式を transgression 形式とする。

$$
T_p(\omega_1,\omega_0)|_{U_i}
=k\int_0^1 p(a_i,F_{t,i}^{k-1})\,dt.
$$

> これは二つの接続を**同じ束の上で**比較して得られる形式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg22-transgression -->
**定義の確認**。$U(1)$ の積主束上で $A_0=0$、$A_1=ix\,dy$ とし、$k=1$、$p(iu)=u$ を取る。$p$ は実線形かつ Ad不変（可換群なので随伴作用は恒等）である。$a=ix\,dy$ は Lie環値1形式、$F_t=it\,dx\wedge dy$ は曲率である。$k=1$ では $F_t^0$ に因子がなく、

$$
T_p(A_1,A_0)
=\int_0^1p(ix\,dy)\,dt=x\,dy.
$$

次数は $2k-1=1$、$dT_p=dx\wedge dy$ となる。積主束なのでこの式は全域で定義されている。一般の束で同じ貼り合わせが成立する理由は次の定理で示す。
<!-- definition-example-end -->

<a id="thm-gbg22-transgression"></a>

<!-- formal-statement-start -->
> **定理（Chern–Weil の transgression 恒等式）**  
> $M$ を境界のない滑らかな有限次元多様体、$P\to M$ を有限次元 Lie 群 $G$ の滑らかな右主束とする。任意の二つの接続 $\omega_0,\omega_1$ と、任意の対称Ad不変実 $k$ 重線形形式 $p:\mathfrak g^k\to\mathbb C$（$k\ge1$）に対し、[transgression 形式](#def-gbg22-transgression)は基底上で大域的に定義され、[Chern–Weil形式](../GBG21/index.md#def-gbg21-chern-weil-form)について

$$
\boxed{\beta_p(\omega_1)-\beta_p(\omega_0)
=dT_p(\omega_1,\omega_0)}
$$

> が成立する。$G$ の連結性、向き、計量、コンパクト性を必要としない。
<!-- formal-statement-end -->

**証明の見取り図**。接続の差 $a_i$ はゲージ変換で共役するため、$p(a_i,F_{t,i}^{k-1})$ は重なりで一致する。次に曲率の $t$ 微分を補題で求め、不変性の補題を使って外微分に書き換える。最後に区間 $[0,1]$ で積分する。

<!-- proof-start -->
### 証明

最初に大域性を確認する。重なり $U_i\cap U_j$ では、上で導いた $a_j=\operatorname{Ad}(g_{ij}^{-1})a_i$ と $F_{t,j}=\operatorname{Ad}(g_{ij}^{-1})F_{t,i}$ を使う。$p$ の Ad不変性より

$$
p(a_j,F_{t,j}^{k-1})
=p(a_i,F_{t,i}^{k-1}).
$$

よって局所的な $2k-1$ 形式が貼り合わさり、パラメータ積分後も同様である。

次に局所 $U_i$ を固定して計算する。$t$ 微分は $p$ の各引数に作用し、$F_t$ は次数2、$p$ は対称なので、$k$ 個の項は一致する。

$$
\frac{d}{dt}p(F_{t,i}^{k})
=k\,p(\dot F_{t,i},F_{t,i}^{k-1}).
$$

[補間接続の曲率変化率](#lem-gbg22-curvature-variation)から $\dot F_{t,i}=da_i+[A_{t,i}\wedge a_i]$ であり、[Ad不変性と次数1の因子の外微分](#lem-gbg22-invariant-derivative)の仮定 $dF_{t,i}+[A_{t,i}\wedge F_{t,i}]=0$ は[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)で満たされる。従って

$$
\begin{aligned}
\frac{d}{dt}p(F_{t,i}^{k})
&=k\,p(da_i+[A_{t,i}\wedge a_i],F_{t,i}^{k-1})\\
&=d\bigl(k\,p(a_i,F_{t,i}^{k-1})\bigr).
\end{aligned}
$$

区間はコンパクトで係数は $t$ と $x\in U_i$ に滑らかに依存するため、$d$ と $t$ 積分を交換できる。微積分学の基本定理を各係数に用いると

$$
\begin{aligned}
p(F_{1,i}^{k})-p(F_{0,i}^{k})
&=\int_0^1\frac{d}{dt}p(F_{t,i}^{k})\,dt\\
&=d\left(k\int_0^1p(a_i,F_{t,i}^{k-1})\,dt\right).
\end{aligned}
$$

左辺は[大域への降下定理](../GBG20/index.md#thm-gbg20-basic-descent)で定まる $\beta_p(\omega_1)-\beta_p(\omega_0)$ の制限、右辺は $dT_p$ の制限である。すべての開集合 $U_i$ で成立するので大域的に成立する。$2k>\dim M$ では両辺は零の $2k$ 形式となる。
<!-- proof-end -->

前節の曲率変化率を「積分すれば何とかなる」とするだけでなく、**変化率が厳密に外微分に等しい**ことが証明の内容である。

<a id="cor-gbg22-class-independence"></a>

<!-- formal-statement-start -->
> **系（Chern–Weil の de Rham 類の接続非依存性）**  
> 上の定理の仮定の下で、二接続に対する Chern–Weil形式は $H_{\mathrm{dR}}^{2k}(M;\mathbb C)$ の同じ類を表す。

$$
[\beta_p(\omega_1)]=[\beta_p(\omega_0)].
$$

> 特に、この類は固定した主束 $P$ と不変多重線形形式 $p$ から決まる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Chern–Weil形式の閉性](../GBG21/index.md#thm-gbg21-chern-weil-closed)により両形式は閉じている。一方、[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)により差は完全形式である。[GEO9の de Rham コホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)は閉形式を完全形式で割るので、二つの類は等しい。
<!-- proof-end -->

本系の「不変」は**同じ主束の接続を変更することに対する不変性**であり、任意の別の主束まで同じ類になるという意味ではない。また、複素数値 de Rham 類が得られたことだけから整数係数特性類や積分値の整数性を結論できない。正規化と整数性は GBG23 以降で区別して扱う。

## 4. 数値例・境界と不変性を照合する

### $U(1)$ の四次形式を手計算する

$M=\mathbb R^4$、座標 $(x,y,z,w)$ の積主 $U(1)$ 束を取る。局所表示が全域の表示となり、

$$
A_0=ix\,dy,\quad A_1=i(x\,dy+z\,dw),\quad
a=iz\,dw,\quad
F_t=i(dx\wedge dy+t\,dz\wedge dw).
$$

$p(iu,iv)=uv$ と置くと、$p$ は対称双線形かつAd不変である。$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$ として、2形式の交換符号は $(-1)^{2\cdot2}=+1$ だから

$$
p(F_t,F_t)=(\eta+t\zeta)^2=2t\,\eta\wedge\zeta.
$$

一方、$a=iz\,dw$ において $dw\wedge\zeta=0$ なので

$$
\begin{aligned}
T_p(A_1,A_0)
&=2\int_0^1p(a,F_t)\,dt\\
&=2\int_0^1z\,dw\wedge(\eta+t\zeta)\,dt\\
&=2z\,dw\wedge dx\wedge dy.
\end{aligned}
$$

従って

$$
dT_p=2\,dz\wedge dw\wedge dx\wedge dy
=2\,dx\wedge dy\wedge dz\wedge dw
=p(F_1,F_1)-p(F_0,F_0).
$$

一般定理の次数 $2k-1=3$、係数2、外積の符号を一度に検算できた。

### 閉多様体上の積分と境界付き領域

$M$ が向き付けられた**コンパクトな境界なし** $2k$ 次元多様体なら、[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)と Stokes の定理により

$$
\int_M\beta_p(\omega_1)-\int_M\beta_p(\omega_0)
=\int_MdT_p=0.
$$

しかし、境界付きの部分領域 $N\subset M$ では

$$
\int_N(\beta_p(\omega_1)-\beta_p(\omega_0))
=\int_{\partial N}T_p.
$$

実際、$\mathbb R^2$ の単位円板 $D^2$ 上で $A_0=0$、$A_1=ix\,dy$、$p(iu)=u$ とすると $T_p=x\,dy$、$\beta_p(A_1)-\beta_p(A_0)=dx\wedge dy$ である。正の向きの境界 $x=\cos\theta,y=\sin\theta$ を使えば

$$
\int_{D^2}dx\wedge dy=\pi,\qquad
\int_{\partial D^2}x\,dy
=\int_0^{2\pi}\cos^2\theta\,d\theta=\pi.
$$

これは接続非依存性への反例ではない。**de Rham 類が同じ**ことと、**境界付き領域での積分が同じ**ことは別の主張である。

### 非自明な束では差だけが大域的

$S^2$ 上の任意の右主 $U(1)$ 束に二つの接続を取る。大域1形式 $\lambda$ に対して、二接続の差を $i\pi^*\lambda$ とすれば、局所表示では $A_{1,i}=A_{0,i}+i\lambda|_{U_i}$ となる。$k=1$、$p(iu)=u$ なら

$$
T_p=\lambda,\qquad \beta_p(\omega_1)-\beta_p(\omega_0)=d\lambda.
$$

例えば $S^2\subset\mathbb R^3$ 上で $\lambda=\varepsilon(x\,dy-y\,dx)|_{S^2}$ と取れば

$$
d\lambda=2\varepsilon\,dx\wedge dy|_{S^2}
$$

は一般に零ではない。しかし $\int_{S^2}d\lambda=0$ である。局所接続 $A_{r,i}$ の個々は非自明束で全域の1形式として貼り合わさらないのに、その**差**は貼り合わさる。

## 5. 局所 Chern–Simons 形式との区別

前節の transgression は、**同じ束上に二つの実在する接続**を用意したので大域的だった。これに対して一つの局所接続 $A$ だけから、その曲率多項式の局所的な原始形式を作ることもできる。

局所自明化した $U$ の積主束には「接続表示が零」の参照接続 $A_{\mathrm{ref}}=0$ を取れる。$A_t=tA$ と置けば $F_t=t\,dA+\frac12t^2[A\wedge A]$ なので、[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)の計算をこの局所積主束に適用できる。

<a id="def-gbg22-local-chern-simons"></a>

<!-- formal-statement-start -->
> **定義（局所 Chern–Simons 型形式）**  
> 開集合 $U$ 上の積主 $G$ 束の接続表示 $A\in\Omega^1(U;\mathfrak g)$ と対称Ad不変実 $k$ 重線形形式 $p$ に対し、$A_t=tA$、$F_t=t\,dA+\frac12t^2[A\wedge A]$ を用いて局所 $(2k-1)$ 形式を次で定める。

$$
\operatorname{CS}_p(A)
=k\int_0^1p(A,F_t^{k-1})\,dt.
$$

> これは選んだ局所自明化に依存する表示である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg22-local-chern-simons -->
**定義の確認**。$G=U(1)$、$k=1$、$p(iu)=u$ とすると、$F_t^0$ は空積であり $\operatorname{CS}_p(A)=p(A)$ である。$A=ix\,dy$ なら局所1形式は $x\,dy$、その外微分は $p(F)=dx\wedge dy$。$k=2$ で行列群の $p(X,Y)=\operatorname{tr}(XY)$ を取ると、$p$ は対称（$\operatorname{tr}(XY)=\operatorname{tr}(YX)$）かつAd不変（共役でtrace不変）であり、次の具体式が得られる。
<!-- definition-example-end -->

<a id="prop-gbg22-local-cs-primitive"></a>

<!-- formal-statement-start -->
> **命題（局所 Chern–Simons 形式の外微分）**  
> 上の定義の仮定の下で

$$
d\,\operatorname{CS}_p(A)=p(F^k),\qquad
F=dA+\frac12[A\wedge A].
$$

> 特に行列 Lie 群で $p(X,Y)=\operatorname{tr}(XY)$、$k=2$ なら

$$
\operatorname{CS}_p(A)
=\operatorname{tr}\left(A\wedge dA+\frac23 A\wedge A\wedge A\right).
$$

<!-- formal-statement-end -->

**証明の見取り図**。局所自明化の内部で零接続と $A$ を比較する。$F_0=0$ なので差は $p(F^k)$ そのものになる。行列二次の場合はパラメータ積分 $\int_0^1t\,dt=1/2$、$\int_0^1t^2\,dt=1/3$ から係数が決まる。

<!-- proof-start -->
### 証明

[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)を、積主束の二接続 $0,A$ に適用する。$A_t=tA$、$F_0=0$ なので

$$
p(F^k)-p(F_0^k)=p(F^k)=
d\left(k\int_0^1p(A,F_t^{k-1})\,dt\right).
$$

$k=2$、行列群なら $[A\wedge A]=2A\wedge A$ だから $F_t=t\,dA+t^2A\wedge A$。従って

$$
\begin{aligned}
\operatorname{CS}_p(A)
&=2\int_0^1\operatorname{tr}\bigl(A\wedge
(t\,dA+t^2 A\wedge A)\bigr)\,dt\\
&=2\left(\frac12\operatorname{tr}(A\wedge dA)
+\frac13\operatorname{tr}(A\wedge A\wedge A)\right),
\end{aligned}
$$

となり、係数 $2/3$ を得る。
<!-- proof-end -->

**なぜこの形式を全域で貼り合わせられないのか。** 重なりでの[局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)は

$$
A_j=\operatorname{Ad}(g_{ij}^{-1})A_i+g_{ij}^{-1}dg_{ij}.
$$

零表示を両パッチに置いても、一般には $0=\operatorname{Ad}(g^{-1})0+g^{-1}dg$ とならない。よって各パッチの「零接続」は同じ大域接続の制限ではない。したがって $\operatorname{CS}_p(A_i)$ がそのまま一致して貼り合わさるとは限らない。一方、二つの**大域接続**の差 $A_{1,i}-A_{0,i}$ では非斉次項が消えるため、前節の $T_p(\omega_1,\omega_0)$ は大域的だった。

さらに $p(F^k)$ が大域で閉じることは、大域的な $(2k-1)$ 形式 $Q$ で $dQ=p(F^k)$ とできることは意味しない。存在すれば de Rham 類は零となるので、非零の Chern–Weil類を持つ束では大域的に外微分すると当該形式となる微分形式は存在しない。局所 Chern–Simons 形式はこの事実と矛盾しない。

## 6. 演習と詳細解答

### Level A：曲率・次数・パラメータ積分

<a id="ex-gbg22-a01"></a>
#### GBG22-A01 補間した接続の曲率
- Level: A

積主 $U(1)$ 束の局所接続 $A_0=ix\,dy$、$A_1=i(x\,dy+z\,dw)$ を $\mathbb R^4$ 上で補間する。$a$、$A_t$、$F_t$、$\dot F_t$ を求め、[補間接続の曲率変化率](#lem-gbg22-curvature-variation)と一致することを確認せよ。

<!-- solution-start -->
**詳細解答**。$a=A_1-A_0=iz\,dw$ である。従って $A_t=ix\,dy+it z\,dw$。$U(1)$ では Lie 括弧が零で、[曲率の局所式](../GBG10/index.md#thm-gbg10-local-formula)は $F_t=dA_t$ となる。係数を微分して

$$
F_t=i\,dx\wedge dy+it\,dz\wedge dw,\qquad
\dot F_t=i\,dz\wedge dw.
$$

補題の右辺 $da+[A_t\wedge a]$ は $d(iz\,dw)+0=i\,dz\wedge dw$ であるから一致する。
<!-- solution-end -->

<a id="ex-gbg22-a02"></a>
#### GBG22-A02 微分の負号の位置
- Level: A

$\mathfrak g$ 値1形式 $a$ と2形式 $F$、対称双線形形式 $p$ に対して、$d\,p(a,F)$ を展開し、$dF=-[A\wedge F]$ のときの形を示せ。符号の理由を述べよ。

<!-- solution-start -->
**詳細解答**。[次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を係数形式へ適用する。$a$ は次数1なので、$F$ を微分する項には $(-1)^1=-1$ が付く。

$$
d\,p(a,F)=p(da,F)-p(a,dF).
$$

[Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)の $dF=-[A\wedge F]$ を右辺に代入すれば

$$
d\,p(a,F)=p(da,F)+p(a,[A\wedge F]).
$$

ここまでで $dF=0$ は使っていない。次に Ad不変性を仮定すれば、[Ad不変性と次数1の因子の外微分](#lem-gbg22-invariant-derivative)に従い第二項を $p([A\wedge a],F)$ と書ける。
<!-- solution-end -->

<a id="ex-gbg22-a03"></a>
#### GBG22-A03 一次の transgression
- Level: A

任意の二つの $U(1)$ 接続に対して、$p(iu)=u$ とする。$a_i=A_{1,i}-A_{0,i}$ が $i\lambda|_{U_i}$ と書けるとき、$k=1$ の $T_p$ と曲率差を求めよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ の随伴作用は恒等なので、接続差の局所形式が重なりで一致する。仮定から実1形式 $\lambda$ が大域に定まり、$p(a_i)=\lambda|_{U_i}$。定義では $k=1$ の $F_t^{0}$ は空積である。

$$
T_p=\int_0^1p(a_i)\,dt=\lambda,\qquad
dT_p=d\lambda.
$$

曲率は $F_{r,i}=dA_{r,i}$ なので $p(F_{1,i})-p(F_{0,i})=p(d a_i)=d\lambda|_{U_i}$。すなわち[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)の一次の場合を直接確認できる。
<!-- solution-end -->

<a id="ex-gbg22-a04"></a>
#### GBG22-A04 行列の局所 Chern–Simons 係数
- Level: A

行列 Lie 群と $p(X,Y)=\operatorname{tr}(XY)$、$k=2$ に対し、$A_t=tA$ を使って $\operatorname{CS}_p(A)$ の二つの係数を積分から求めよ。

<!-- solution-start -->
**詳細解答**。$A$ は行列値1形式だから[曲率の局所式](../GBG10/index.md#thm-gbg10-local-formula)より

$$
F_t=d(tA)+(tA)\wedge(tA)=t\,dA+t^2A\wedge A.
$$

[局所 Chern–Simons の定義](#def-gbg22-local-chern-simons)へ $k=2$ を代入し、各積分を別々に計算する。

$$
\begin{aligned}
\operatorname{CS}_p(A)
&=2\int_0^1\operatorname{tr}\bigl(t A\wedge dA+t^2 A\wedge A\wedge A\bigr)\,dt\\
&=2\left(\frac12\operatorname{tr}(A\wedge dA)
+\frac13\operatorname{tr}(A\wedge A\wedge A)\right)\\
&=\operatorname{tr}(A\wedge dA)+\frac23\operatorname{tr}(A\wedge A\wedge A).
\end{aligned}
$$

$\operatorname{tr}(A\wedge A\wedge A)$ を零と置かない。次数付き巡回性では3つの1形式をまとめた循環移動の符号は $(-1)^{1\cdot2}=+1$ であり、項は一般に残る。
<!-- solution-end -->

### Level B：大域性と二次形式の検算

<a id="ex-gbg22-b01"></a>
#### GBG22-B01 ゲージ変換で差が貼り合わさる
- Level: B

二つの接続の局所表示が $A_{r,j}=\operatorname{Ad}(g^{-1})A_{r,i}+g^{-1}dg$（$r=0,1$）で変換することを前提に、$p(a_i,F_{t,i}^{k-1})$ が重なりで一致する理由を全ての変換について示せ。

<!-- solution-start -->
**詳細解答**。$a_i=A_{1,i}-A_{0,i}$ とすると、二つの非斉次項の差は零である。

$$
\begin{aligned}
a_j&=A_{1,j}-A_{0,j}\\
&=\operatorname{Ad}(g^{-1})(A_{1,i}-A_{0,i})\\
&=\operatorname{Ad}(g^{-1})a_i.
\end{aligned}
$$

また $A_{t,j}=A_{0,j}+ta_j=\operatorname{Ad}(g^{-1})A_{t,i}+g^{-1}dg$ だから、[曲率の共変変換](../GBG10/index.md#thm-gbg10-local-formula)により $F_{t,j}=\operatorname{Ad}(g^{-1})F_{t,i}$。[Ad不変多重線形形式の定義](../GBG20/index.md#def-gbg20-invariant-polynomial)を $k$ 引数に同時適用して

$$
p(a_j,F_{t,j}^{k-1})
=p(\operatorname{Ad}(g^{-1})a_i,
(\operatorname{Ad}(g^{-1})F_{t,i})^{k-1})
=p(a_i,F_{t,i}^{k-1})
$$

を得る。この等号は各 $t$ に成立するので、区間積分した $T_p$ も貼り合わさる。
<!-- solution-end -->

<a id="ex-gbg22-b02"></a>
#### GBG22-B02 4形式とその原始形式
- Level: B

$\mathbb R^4$ の $U(1)$ 接続 $A_0=ix\,dy$、$A_1=i(x\,dy+z\,dw)$、$p(iu,iv)=uv$ について、曲率多項式の差と transgression 形式を別々に計算して、外微分が一致することを示せ。

<!-- solution-start -->
**詳細解答**。$F_t=i(\eta+t\zeta)$、$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$。$\eta^2=\zeta^2=0$ かつ2形式同士の交換符号は正なので

$$
p(F_1,F_1)-p(F_0,F_0)
=(\eta+\zeta)^2-\eta^2=2\eta\wedge\zeta.
$$

一方 $a=iz\,dw$ より、$p(a,F_t)=z\,dw\wedge(\eta+t\zeta)=z\,dw\wedge\eta$ であり

$$
T_p=2\int_0^1z\,dw\wedge\eta\,dt=2z\,dw\wedge\eta.
$$

ここで $d\eta=0$、$d(dw)=0$ なので

$$
dT_p=2\,dz\wedge dw\wedge\eta
=2\eta\wedge\zeta.
$$

後の等号は次数 $2\cdot2$ が偶数であることによる。$2$ と符号を独立の方法で検算できた。
<!-- solution-end -->

<a id="ex-gbg22-b03"></a>
#### GBG22-B03 境界項は消えるとは限らない
- Level: B

単位円板 $D^2$ に $A_0=0$、$A_1=ix\,dy$、$p(iu)=u$ を与える。内部の積分と境界線積分を計算し、どの仮定を付加すれば Chern–Weil形式の積分が接続に依らないか述べよ。

<!-- solution-start -->
**詳細解答**。$F_0=0$、$F_1=i\,dx\wedge dy$ だから $\int_{D^2}(p(F_1)-p(F_0))=\int_{D^2}dx\wedge dy=\pi$。$T_p=x\,dy$ であり、反時計回りの境界 $\gamma(\theta)=(\cos\theta,\sin\theta)$ に沿って $dy=\cos\theta\,d\theta$ なので

$$
\int_{\partial D^2}T_p
=\int_0^{2\pi}\cos^2\theta\,d\theta=\pi.
$$

[Chern–Weil の transgression 恒等式](#thm-gbg22-transgression)と Stokes の定理は両積分が等しいことを意味し、両者が零であることは意味しない。全ての接続について積分が一致すると言うには、例えば積分領域が向き付けられたコンパクトな**境界なし** $2k$ 次元多様体であると仮定すれば十分である。境界がある場合は $\int_{\partial M}T_p=0$ となる追加条件が必要である。
<!-- solution-end -->

<a id="ex-gbg22-b04"></a>
#### GBG22-B04 零接続を全局所パッチで選ぶ誤り
- Level: B

主 $G$ 束の局所 section が $s_j=s_i g_{ij}$ で結ばれるとする。各パッチで参照接続表示を $A_{\mathrm{ref},i}=0$ と選んだとき、どの条件でこれらが同じ大域接続を表せるか示せ。また、そこから各局所 Chern–Simons 形式の無条件の貼り合わせを結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[GBG8の局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)で二つの局所表示が一つの大域接続を表すには

$$
A_{\mathrm{ref},j}
=\operatorname{Ad}(g_{ij}^{-1})A_{\mathrm{ref},i}
+g_{ij}^{-1}dg_{ij}
$$

が必要である。両者を零と置けば $g_{ij}^{-1}dg_{ij}=0$、すなわち $dg_{ij}=0$ が必要になる。重なりの各連結成分上で遷移関数が局所定数となる場合には、零表示が整合する。しかし一般の主束の遷移関数にこの条件はない。

[局所 Chern–Simons 形式の定義](#def-gbg22-local-chern-simons)は各パッチで別々の参照零接続を使うため、定義の $A_i$ と $A_j$ は一つの大域補間の両端になっていない。$d\operatorname{CS}_p(A_i)=p(F_i^k)$ が貼り合わさっても、各パッチの $(2k-1)$ 形式の一致は導けない。
<!-- solution-end -->

### Level C：主要定理を自力で再構成する

<a id="ex-gbg22-c01"></a>
#### GBG22-C01 一般次数の transgression とその射程
- Level: C

滑らかな右主 $G$ 束上の二接続 $\omega_0,\omega_1$、対称Ad不変実 $k$ 重線形形式 $p$（$k\ge1$）について、次を順に証明せよ。

- (a) 補間接続の局所曲率の変化率を求める。
- (b) 変化率 $\frac d{dt}p(F_t^k)$ を外微分として表し、符号の理由を示す。
- (c) 局所的な $(2k-1)$ 形式を大域に貼り合わせ、de Rham 類の非依存性を結論する。
- (d) 同じ議論だけでは整数性と境界付き領域の積分非依存性を言えない理由を説明する。

<!-- solution-start -->
**詳細解答**。(1) [主束接続全体のアフィン空間構造](../GBG12/index.md#thm-gbg12-connections-affine)より $\alpha=\omega_1-\omega_0$ は水平・随伴同変である。固定した局所 section で $a=s^*\alpha$、$A_t=A_0+ta$ と置く。$F_t=dA_t+\frac12[A_t\wedge A_t]$ を微分する。次数1同士の括弧は $[a\wedge A_t]=[A_t\wedge a]$ だから

$$
\dot F_t=da+\frac12([a\wedge A_t]+[A_t\wedge a])
=da+[A_t\wedge a].
$$

(2) $F_t$ の次数は2なので、多重線形性・対称性と偶数次数の交換則から

$$
\frac d{dt}p(F_t^k)=k\,p(\dot F_t,F_t^{k-1}).
$$

一方、[Leibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)と $dF_t=-[A_t\wedge F_t]$ から

$$
d\,p(a,F_t^{k-1})
=p(da,F_t^{k-1})
+(k-1)p(a,[A_t\wedge F_t],F_t^{k-2}).
$$

[Ad不変性の無限小条件](../GBG20/index.md#prop-gbg20-infinitesimal-condition)では、$A_t$ を $a$ より左へ出した際に $(-1)^{1\cdot1}=-1$ が付く。これは[Ad不変性と次数1の因子の外微分](#lem-gbg22-invariant-derivative)で厳密に表され、

$$
(k-1)p(a,[A_t\wedge F_t],F_t^{k-2})
=p([A_t\wedge a],F_t^{k-1})
$$

（$k=1$ ではこの項は無く、$p([A_t\wedge a])=0$）。従って

$$
\frac d{dt}p(F_t^k)
=k\,d\,p(a,F_t^{k-1}).
$$

(3) 重なりで $a_j=\operatorname{Ad}(g_{ij}^{-1})a_i$、$F_{t,j}=\operatorname{Ad}(g_{ij}^{-1})F_{t,i}$ であり、Ad不変性が両方に作用するから $p(a_i,F_{t,i}^{k-1})$ は貼り合わさる。そこで

$$
T_p=k\int_0^1p(a,F_t^{k-1})\,dt
$$

は大域的な $(2k-1)$ 形式になる。パラメータ微分を積分して

$$
p(F_1^k)-p(F_0^k)
=\int_0^1\frac d{dt}p(F_t^k)\,dt
=dT_p
$$

を得る。[Chern–Weil形式の閉性](../GBG21/index.md#thm-gbg21-chern-weil-closed)と[de Rham 類の定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)より、差が完全形式の二つの閉形式は同じ類を表す。

(4) de Rham 類は実数・複素数係数の閉形式の商であり、整数係数コホモロジーへ持ち上がるかどうかは別の条件である。たとえば $p$ に任意の実定数を掛けても本証明は成立するので、整数性はこの証明から従わない。また境界付き領域 $N$ では Stokes の定理によって

$$
\int_N\bigl(\beta_p(\omega_1)-\beta_p(\omega_0)\bigr)
=\int_{\partial N}T_p
$$

であり、右辺が非零であり得る。境界が無い場合には右辺が消えるが、境界のある場合には条件が必要である。
<!-- solution-end -->

## 7. 次の講義へ

本講で、固定された主束と Ad不変多項式から得る**複素 de Rham コホモロジー類が接続に依存しない**ことを証明した。[GBG21の閉性](../GBG21/index.md#thm-gbg21-chern-weil-closed)、本講の完全形式による差、整数係数特性類という三段階は区別できる。

次の GBG23 では複素ベクトル束の Chern 類と Chern 指標を、$\det(I+\frac{i}{2\pi}F)$ と $\operatorname{tr}\exp(\frac{i}{2\pi}F)$ の低次係数から具体的に計算する。そこでは正規化と整数性を、今回の接続非依存性だけから飛躍させない。