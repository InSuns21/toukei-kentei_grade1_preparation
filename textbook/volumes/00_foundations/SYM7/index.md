# SYM7 Moserの方法とシンプレクティック変形

[SYM5のDarbouxの定理](../SYM5/index.md#thm-sym5-darboux)では、一点の近くで2形式を標準形へ変えるために時間依存ベクトル場を作りました。その証明では近傍を小さくして流れを時刻1まで存在させました。しかし、二つのシンプレクティック形式が**多様体全体で**与えられたとき、同じ方法で大域的な座標変換を作れるのでしょうか。

局所的には閉2形式の差を原始形式で表せました。大域的には閉形式の差に原始形式が存在するとは限りません。また、各時刻の2形式が非退化であることと、その途中の形式もすべて非退化であることは違います。さらに局所流が途中で定義域から逃げない保証も必要です。本章では、**原始形式・経路中の非退化性・流れの時間1までの存在**という三つの条件を切り分けて、大域的なMoser安定性を証明します。

## 1. 二つの形式の間を動くとはどういうことか

以後、$M$ は滑らかな実 $2n$ 次元多様体、時間区間は $I=[0,1]$ とします。明示しない限り $M$ に境界はありません。[シンプレクティック多様体の定義](../SYM2/index.md#def-sym2-symplectic-manifold)によって、各2形式が閉じて非退化であることを別々に確認します。

<a id="def-sym7-symplectic-path"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック形式の滑らかな経路）**  
> $M$ 上の族 $(\omega_t)_{0\le t\le1}$ がシンプレクティック形式の滑らかな経路であるとは、局所座標で $\omega_t$ の全係数が $(t,x)$ に滑らかに依存し、すべての $t\in[0,1]$ で $d\omega_t=0$ かつ各点で $\omega_t$ が非退化であることをいう。端点での滑らかさは時間区間の外側への局所的な滑らかな延長として理解する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym7-symplectic-path -->
### 直接例：トーラス上の正の係数

$\mathbb T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ で角度座標 $x,y$ の微分 $dx,dy$ は大域的な1形式です。$|a|<1$ として

$$
\omega_t=(1+ta\cos x)\,dx\wedge dy
$$

と置きます。係数は滑らかで、$1+ta\cos x\ge1-|a|>0$ なので全時刻・全点で非退化です。2次元では3形式が零だから $d\omega_t=0$ です。従ってこれは定義を満たします。一方、係数の正性を確かめず「端点が非退化だから途中も非退化」とは言えません。
<!-- definition-example-end -->

大域的な座標変換の代わりに、各時刻に多様体の点を動かす微分同相を求めます。

<a id="def-sym7-moser-isotopy"></a>

<!-- formal-statement-start -->
> **定義（Moser型の同位変形）**  
> $M$ 上のシンプレクティック形式の滑らかな経路 $(\omega_t)$ に対し、滑らかな微分同相の族 $\varphi_t:M\to M$ が $\varphi_0=\mathrm{id}_M$ および
>
$$
\varphi_t^*\omega_t=\omega_0
\qquad(0\le t\le1)
$$
>
> を満たすとき、この章ではその族をMoser型の同位変形という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym7-moser-isotopy -->
### 直接例：平面の一定倍率を打ち消す

$\mathbb R^2$ 上の $\omega_t=(1+t)\,dx\wedge dy$ に対し、

$$
\varphi_t(x,y)=\left(\frac{x}{1+t},y\right)
$$

と置きます。$1+t>0$ なので逆写像は $(u,v)\mapsto((1+t)u,v)$ であり、各 $\varphi_t$ は全域微分同相です。さらに $\varphi_0=\mathrm{id}$ で、

$$
\begin{aligned}
\varphi_t^*\omega_t
&=(1+t)\,d\left(\frac{x}{1+t}\right)\wedge dy\\
&=(1+t)\frac{dx}{1+t}\wedge dy
=dx\wedge dy=\omega_0.
\end{aligned}
$$

時間 $t$ は引き戻しを計算する際には固定している点に注意してください。この非コンパクトな例では変換を明示的に構成できていますが、一般の非コンパクト多様体での大域存在を意味しません。
<!-- definition-example-end -->

## 2. コホモロジー条件が必要になる理由

[SYM5の動径原始形式](../SYM5/index.md#lem-sym5-radial-primitive)は局所球上で差を外微分に戻す方法でした。多様体全体で同じことをするには、閉2形式の差が大域的に完全でなければなりません。そこで「コホモロジー的に同じ」の意味をまず固定します。

<a id="def-sym7-cohomologous-forms"></a>

<!-- formal-statement-start -->
> **定義（コホモロジー的に等しい閉2形式）**  
> $M$ 上の二つの滑らかな閉2形式 $\omega_0,\omega_1$ がコホモロジー的に等しいとは、ある大域的な滑らかな1形式 $\sigma$ が存在して
>
$$
\omega_1-\omega_0=d\sigma
$$
>
> となることをいう。これをde Rhamコホモロジー類の記法で $[\omega_0]=[\omega_1]$ と書く。ここでの等号は2形式そのものの一致ではなく、差が完全形式であることを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym7-cohomologous-forms -->
### 直接例：トーラスで平均は変えず係数だけを変える

第1節の族に対し $\sigma= a\sin x\,dy$ とすれば

$$
\begin{aligned}
d\sigma
&=a\,d(\sin x)\wedge dy+a\sin x\,d(dy)\\
&=a\cos x\,dx\wedge dy
=\omega_1-\omega_0.
\end{aligned}
$$

ここで $d(dy)=0$ には[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)を使いました。従って両端点はコホモロジー的に等しく、$\omega_t-\omega_0=d(ta\sin x\,dy)$ も成り立ちます。
<!-- definition-example-end -->

**閉性と完全性は違います。** 例えばトーラス上の $dx\wedge dy$ は閉形式ですが、$d\sigma=dx\wedge dy$ となる大域的な1形式はありません。実際、境界のないトーラスに[Stokesの定理](../GEO8/index.md#thm-geo8-stokes)を適用すると $\int_{\mathbb T^2}d\sigma=0$ ですが、

$$
\int_{\mathbb T^2}dx\wedge dy
=\int_0^{2\pi}\int_0^{2\pi}dx\,dy
=4\pi^2\ne0
$$

となり矛盾するからです。

<a id="prop-sym7-cohomology-necessary"></a>

<!-- formal-statement-start -->
> **命題（Moser型同位変形に必要な完全性）**  
> $M$ を境界のない滑らかな多様体、$(\omega_t)$ をシンプレクティック形式の滑らかな経路とする。滑らかな微分同相の族 $\varphi_t$ が $\varphi_0=\mathrm{id}_M$ と $\varphi_t^*\omega_t=\omega_0$ を満たすなら、各 $\dot\omega_t=\partial_t\omega_t$ は大域的な完全2形式であり、すべての $t$ で $[\omega_t]=[\omega_0]$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

引き戻した形式が一定なら、その時間微分は零です。時間微分の公式を展開し、[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)と閉性を使うと $\dot\omega_t$ が外微分として書けます。

<!-- proof-start -->
### 証明

$\varphi_t$ の時刻 $t$ の速度を、動いた先で

$$
Y_t=\dot\varphi_t\circ\varphi_t^{-1}
$$

と定義します。$\varphi_t$ は微分同相なので $Y_t$ は大域的な滑らかなベクトル場です。[SYM5の時間依存引き戻しの微分公式](../SYM5/index.md#thm-sym5-darboux)で使った式を $\varphi_t$ と $\omega_t$ に適用すると、

$$
0=\frac{d}{dt}(\varphi_t^*\omega_t)
=\varphi_t^*(\dot\omega_t+\mathcal L_{Y_t}\omega_t).
$$

微分同相の引き戻しは逆写像の引き戻しによって打ち消せるので

$$
\dot\omega_t=-\mathcal L_{Y_t}\omega_t.
$$

[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)と $d\omega_t=0$ により、

$$
\begin{aligned}
\dot\omega_t
&=-\bigl(d(\iota_{Y_t}\omega_t)+\iota_{Y_t}d\omega_t\bigr)\\
&=d(-\iota_{Y_t}\omega_t).
\end{aligned}
$$

よって $\alpha_t=-\iota_{Y_t}\omega_t$ とすれば $\dot\omega_t=d\alpha_t$ です。時間積分し、固定区間上で外微分と積分を交換すると

$$
\begin{aligned}
\omega_t-\omega_0
&=\int_0^t\dot\omega_s\,ds
=\int_0^td\alpha_s\,ds\\
&=d\left(\int_0^t\alpha_s\,ds\right).
\end{aligned}
$$

最後の括弧は大域的な滑らかな1形式なので、定義により $[\omega_t]=[\omega_0]$ です。
<!-- proof-end -->

この命題は**必要条件**です。コホモロジー類が一致するだけで、どんな経路でもMoser型同位変形が存在するという主張ではありません。経路中の非退化性と流れの存在も必要になります。

## 3. 大域的なMoser安定性

形式が変化する速さ $\dot\omega_t$ を打ち消すための1形式 $\alpha_t$ が滑らかに選べて

$$
\dot\omega_t=d\alpha_t
$$

であれば、[SYM5の局所Moser法](../SYM5/index.md#thm-sym5-darboux)と同じ符号で

$$
\iota_{Y_t}\omega_t=-\alpha_t
$$

を解くのが自然です。非退化性から毎時刻の $Y_t$ は一意です。コンパクト性は、このベクトル場の解が有限時間内に無限遠へ逃げないために使います。

<a id="thm-sym7-moser-stability"></a>

<!-- formal-statement-start -->
> **定理（Moserの安定性定理：滑らかな原始形式を明示した形）**  
> $M$ を**コンパクトで境界のない**滑らかな $2n$ 次元多様体とし、$(\omega_t)_{0\le t\le1}$ を $M$ 上のシンプレクティック形式の滑らかな経路とする。大域的な滑らかな1形式の族 $(\alpha_t)$ が存在し、
>
$$
\dot\omega_t=d\alpha_t
\qquad(0\le t\le1)
$$
>
> が成立すると仮定する。このとき滑らかな微分同相の族 $\varphi_t:M\to M$ が存在し、すべての $t$ で
>
$$
\varphi_0=\mathrm{id}_M,\qquad
\varphi_t^*\omega_t=\omega_0
$$
>
> を満たす。特に $\varphi_1:(M,\omega_0)\to(M,\omega_1)$ はシンプレクティック微分同相である。
<!-- formal-statement-end -->

### 証明の見取り図

非退化性で方程式 $\iota_{Y_t}\omega_t=-\alpha_t$ を点ごとに解きます。次にコンパクトな $M$ と時間の有限区間を使って、流れの存在を全点で時刻1まで延長します。最後に引き戻しを微分し、$\dot\omega_t=d\alpha_t$ と $d\omega_t=0$ の二条件で打ち消します。ここで局所的に球を縮める[SYM5の議論](../SYM5/index.md#thm-sym5-darboux)との違いは、**解の存在域をコンパクト性で大域化する**一点です。

<!-- proof-start -->
### 証明

**(1) ベクトル場の構成。** 点 $x$ と時刻 $t$ を固定します。非退化な交代2形式は

$$
T_xM\longrightarrow T_x^*M,\qquad
v\longmapsto\iota_v\omega_{t,x}
$$

という線形同型を与えます。[SYM1の非退化性](../SYM1/index.md#def-sym1-symplectic-vector-space)を各接空間へ適用したものです。従って

$$
\iota_{Y_t}\omega_t=-\alpha_t
$$

は $Y_t(x)$ を一意に決めます。局所座標で $\omega_t=\tfrac12\sum_{i,j}\Omega_{t,ij}dx^i\wedge dx^j$、$\alpha_t=\sum_j a_{t,j}dx^j$ と書くと、

$$
\Omega_t^{\mathsf T}Y_t=-a_t,\qquad
Y_t=-(\Omega_t^{\mathsf T})^{-1}a_t.
$$

$\det\Omega_t\ne0$ が全時刻・全点で成り立ち、係数は滑らかなので、余因子表示からこの解も $(t,x)$ に滑らかに依存します。座標で得たベクトルは同じ内積方程式の一意解ですから、重なりで一致して大域的な $Y_t$ を定めます。

**(2) 時刻1までの流れ。** 時間を座標に追加し、局所的に区間の外へ滑らかに延長したベクトル場

$$
Z(s,x)=(1,Y_s(x))
$$

を $(-\varepsilon,1+\varepsilon)\times M$ 上で考えます。コンパクトな $M$ では、$s\in[0,1]$ の間に解が取り得る点は

$$
K=[0,1]\times M
$$

というコンパクト集合の中にあります。[局所解の一意性](../ODE1/index.md#thm-ode1-picard-lindelof)で作った解が仮に $t<1$ で延長不能になれば、[最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)を拡大系 $Z$ とコンパクト集合 $K$ に適用した結論に反します。従って全ての初期点 $x\in M$ で $\varphi_t(x)$ が $0\le t\le1$ にわたり存在します。

同じ拡大系の初期値を $(t,z)$ として時刻0まで逆向きに解けるのも、時間区間と $M$ がコンパクトだからです。正向きの解と逆向きの解の合成は[解の一意性と流れの合成則](../ODE8/index.md#prop-ode8-flow-law)によって恒等写像になります。初期値への滑らかな依存は[流れの初期値微分](../ODE8/index.md#lem-ode8-flow-variational)から得られるので、各 $\varphi_t$ とその逆は滑らかです。よって $\varphi_t$ は $M$ 全体の微分同相です。

**(3) 引き戻しの時間微分。** [Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)および[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)から

$$
\begin{aligned}
\frac{d}{dt}(\varphi_t^*\omega_t)
&=\varphi_t^*(\dot\omega_t+\mathcal L_{Y_t}\omega_t)\\
&=\varphi_t^*\bigl(d\alpha_t+d(\iota_{Y_t}\omega_t)
+\iota_{Y_t}d\omega_t\bigr)\\
&=\varphi_t^*\bigl(d\alpha_t+d(-\alpha_t)+0\bigr)\\
&=0.
\end{aligned}
$$

2行目の最初は定理の $\dot\omega_t=d\alpha_t$、最後は各 $\omega_t$ の閉性です。3行目でベクトル場を定義した符号を使いました。従って引き戻しは $t$ に依存せず、初期条件 $\varphi_0=\mathrm{id}$ を入れると

$$
\varphi_t^*\omega_t=\varphi_0^*\omega_0=\omega_0.
$$

時刻1で微分同相の条件と形式保存がともに成立するので、最後の主張も得ます。
<!-- proof-end -->

**仮定を取り違えないこと。** 定理は「すべての $\omega_t$ が非退化」を仮定しています。「$\omega_0,\omega_1$ だけが非退化」では途中で逆行列を作れません。また、コホモロジー類が一定という記述だけから滑らかな $\alpha_t$ を暗黙に作るのではなく、上の定理では**滑らかな原始形式の族**を明示的な仮定としました。端点の差が一つの完全形式として与えられる場合には、次の系で原始形式を実際に構成できます。

## 4. 同じコホモロジー類の二形式を結ぶ

大域的な形式の差が $d\sigma$ と書ける場合、最も単純な経路は線形補間です。$d\sigma$ は閉形式だから、端点の閉性は途中の閉性にも引き継がれます。難所は非退化性です。

<a id="cor-sym7-cohomologous-affine"></a>

<!-- formal-statement-start -->
> **系（コホモロジー的に等しい端点の線形経路による変形）**  
> $M$ をコンパクトで境界のない多様体、$\omega_0,\omega_1$ をその上のシンプレクティック形式とする。$\omega_1-\omega_0=d\sigma$ を満たす大域的な滑らかな1形式 $\sigma$ が存在し、さらにすべての $t\in[0,1]$ に対して
>
$$
\omega_t=(1-t)\omega_0+t\omega_1
$$
>
> が非退化であると仮定する。このとき $\varphi_0=\mathrm{id}_M$、$\varphi_1^*\omega_1=\omega_0$ を満たす微分同相の滑らかな族が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega_t=\omega_0+td\sigma$ と書けば $\dot\omega_t=d\sigma$。この経路の原始形式は時間に依存しない $\alpha_t=\sigma$ で足ります。

<!-- proof-start -->
### 証明

仮定の等式を用いて

$$
\begin{aligned}
\omega_t&=(1-t)\omega_0+t(\omega_0+d\sigma)=\omega_0+td\sigma,\\
d\omega_t&=d\omega_0+t\,d(d\sigma)=0,\\
\dot\omega_t&=d\sigma
\end{aligned}
$$

です。第2行は[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)によります。非退化性は**この系の別の仮定**として各時刻で確保されています。ゆえに $\alpha_t=\sigma$ を選んで[大域Moser安定性定理](#thm-sym7-moser-stability)を適用でき、所要の $\varphi_t$ を得ます。
<!-- proof-end -->

この系は「同じコホモロジー類なら自動的に線形補間できる」とは言いません。例えば $\mathbb R^2$ 上の $\omega_0=dx\wedge dy$ と $\omega_1=-dx\wedge dy$ は双方とも完全形式なのでコホモロジー的に等しいのですが、

$$
(1-t)\omega_0+t\omega_1=(1-2t)\,dx\wedge dy
$$

は $t=1/2$ で零となります。従ってこの経路にはMoserの方法を適用できません。そもそも $\mathbb R^2$ は非コンパクトであるため、上の系のコンパクト性仮定も満たしていません。この例が示しているのは**線形補間が非退化性を保つとは限らない**ことであって、コンパクトな場合の存在定理への反例ではありません。

## 5. トーラス上で変形を最後まで計算する

第1節の $\mathbb T^2$ の例を再び扱います。$|a|<1$ として

$$
\omega_t=(1+ta\cos x)\,dx\wedge dy,\qquad
\sigma=a\sin x\,dy.
$$

第2節の計算から $\dot\omega_t=d\sigma=a\cos x\,dx\wedge dy$ です。未知のベクトル場を $Y_t=u_t\partial_x+v_t\partial_y$ と置き、[内部積の定義](../GEO7/index.md#def-geo7-interior-product)で成分を計算します。

$$
\iota_{Y_t}\omega_t
=(1+ta\cos x)(u_t\,dy-v_t\,dx).
$$

これを $-\sigma=-a\sin x\,dy$ と係数比較すると

$$
u_t=-\frac{a\sin x}{1+ta\cos x},
\qquad v_t=0.
$$

分母は $1-|a|>0$ で下から押さえられるので、全時刻で滑らかです。この方程式は実際に積分できます。円周上の写像

$$
F_t(u)=u+ta\sin u
$$

を考えると

$$
F_t'(u)=1+ta\cos u>0,\qquad
F_t(u+2\pi)=F_t(u)+2\pi.
$$

従って $F_t$ は円周の微分同相です。初期値 $x_0$ に対し $F_t(u_t)=x_0$ とおいて微分すると、

$$
\begin{aligned}
0&=\frac{d}{dt}\{u_t+ta\sin u_t\}\\
&=(1+ta\cos u_t)\dot u_t+a\sin u_t,\\
\dot u_t&=-\frac{a\sin u_t}{1+ta\cos u_t}.
\end{aligned}
$$

これは先ほどの $Y_t$ の $x$ 成分です。従って実際の流れは

$$
\varphi_t(x_0,y_0)=\bigl(F_t^{-1}(x_0),y_0\bigr).
$$

$u=F_t^{-1}(x_0)$ なら $dx_0=F_t'(u)\,du$ です。よって引き戻しを直接検算すると

$$
\begin{aligned}
\varphi_t^*\omega_t
&=(1+ta\cos u)\,du\wedge dy_0\\
&=\frac{1+ta\cos u}{F_t'(u)}\,dx_0\wedge dy_0\\
&=dx_0\wedge dy_0=\omega_0.
\end{aligned}
$$

**面積の保存も確認できます。** 各時刻の総面積は

$$
\int_{\mathbb T^2}\omega_t
=\int_0^{2\pi}\int_0^{2\pi}(1+ta\cos x)\,dy\,dx
=4\pi^2.
$$

係数は変わっても総面積が変わらず、その変化を点の移動で吸収できています。また $x=0,\pi$ では $\sigma=0$ が余ベクトルとして成立し、非退化性から $Y_t=0$ です。したがってこれら二つの円周は点ごとに固定されます。

## 6. コンパクト性が果たす仕事と、相対的な結論

### コンパクトでないと流れは途中で逃げ得る

非コンパクトな $\mathbb R^2$ 上で

$$
\omega_t=(1-t+te^{-(x^2+y^2)})\,dx\wedge dy
$$

を考えます。係数は $(1-t)+te^{-r^2}>0$ なので全時刻でシンプレクティックです。差も完全形式で、例えば

$$
\sigma=\left(\int_0^x(e^{-(s^2+y^2)}-1)\,ds\right)dy
$$

を微分すれば、基本定理により

$$
d\sigma=(e^{-(x^2+y^2)}-1)\,dx\wedge dy
=\dot\omega_t.
$$

従って局所Moser方程式は解けます。それでも、$\varphi_1^*\omega_1=\omega_0$ を満たす**全域微分同相**はありません。仮に存在したら、正の2形式の積分は変数変換により等しいはずですが、

$$
\int_{\mathbb R^2}\omega_0=+\infty
$$

であるのに対し、極座標で

$$
\begin{aligned}
\int_{\mathbb R^2}\omega_1
&=\int_0^{2\pi}\int_0^\infty e^{-r^2}r\,dr\,d\theta\\
&=2\pi\left[-\frac12e^{-r^2}\right]_{0}^{\infty}
=\pi.
\end{aligned}
$$

矛盾します。正の2形式を保つ微分同相は向きを保つため、絶対値を付けた変数変換でもこの矛盾は消えません。**完全形式の差と非退化な経路があっても、非コンパクト空間では大域的な流れの存在を結論できない**ことを示す例です。

### 原始形式が零になる点は動かさずに済む

<a id="prop-sym7-relative-fixed-set"></a>

<!-- formal-statement-start -->
> **命題（点wiseに零の原始形式が与える固定集合）**  
> [大域Moser安定性定理](#thm-sym7-moser-stability)の仮定を満たし、$S\subset M$ を部分集合とする。さらに各 $x\in S$、全 $t\in[0,1]$ で、**$T_x^*M$ の元として** $\alpha_t(x)=0$ と仮定する。このとき定理のベクトル場が生成する同位変形は $\varphi_t(x)=x$ を全 $x\in S$ と全 $t$ で満たす。
<!-- formal-statement-end -->

### 証明の見取り図

右辺が零なら非退化性から速度が零になります。定数曲線と流れの解の一意性を比較します。

<!-- proof-start -->
### 証明

$x\in S$ を固定します。仮定 $\alpha_t(x)=0$ と $\iota_{Y_t(x)}\omega_{t,x}=-\alpha_t(x)$ を合わせると

$$
\iota_{Y_t(x)}\omega_{t,x}=0.
$$

$\omega_{t,x}$ は非退化なので $Y_t(x)=0$ です。従って曲線 $c(t)=x$ は

$$
\dot c(t)=0=Y_t(c(t)),\qquad c(0)=x
$$

を満たします。[初期値問題の一意性](../ODE1/index.md#thm-ode1-picard-lindelof)により、同じ初期値から出る解 $\varphi_t(x)$ は $c(t)$ に一致します。
<!-- proof-end -->

注意すべきは、$S$ が部分多様体である場合に**引き戻し $\iota_S^*\alpha_t=0$ という弱い条件だけでは足りない**ことです。引き戻しの零は $S$ に接する方向にしか作用させていないため、接空間に垂直な余ベクトル成分が残り得ます。その成分に対応する $Y_t(x)$ は零であるとは限りません。

## 7. 演習：条件を選び、式を最後まで検算する

### Level A：定義・符号・必要条件

#### A1. 平面のMoser方程式を直接解く

$\mathbb R^2$ 上の $\omega_t=(1+t)\,dx\wedge dy$ について、$\dot\omega_t=d\alpha_t$ を満たす $\alpha_t=x\,dy$ を確認し、$\iota_{Y_t}\omega_t=-\alpha_t$ を解いてその流れを求めよ。

- Level: A
- ID: SYM7-A1

<!-- solution-start -->
**詳細解答**　$\dot\omega_t=dx\wedge dy$ であり、[外微分の積の法則](../GEO7/index.md#prop-geo7-leibniz)から

$$
d(x\,dy)=dx\wedge dy+x\,d(dy)=dx\wedge dy
$$

となります。$Y_t=u\partial_x+v\partial_y$ とすると

$$
\iota_{Y_t}\omega_t=(1+t)(u\,dy-v\,dx).
$$

$-x\,dy$ と係数比較して $u=-x/(1+t),v=0$ です。初期値 $(x_0,y_0)$ の解は $\dot y=0$ より $y=y_0$、また

$$
\frac{d}{dt}((1+t)x(t))
=x(t)+(1+t)\dot x(t)=x(t)-x(t)=0.
$$

従って $(1+t)x(t)=x_0$ であり、$\varphi_t(x_0,y_0)=(x_0/(1+t),y_0)$ です。これは第1節で直接検算した変換と一致します。
<!-- solution-end -->

#### A2. 閉2形式の差が完全なら積分は変わらない

コンパクトで境界のない向き付き2次元多様体 $M$ と、閉2形式 $\eta_0,\eta_1$ が $\eta_1-\eta_0=d\sigma$ を満たすとする。$\int_M\eta_1=\int_M\eta_0$ を示せ。

- Level: A
- ID: SYM7-A2

<!-- solution-start -->
**詳細解答**　積分の線形性から

$$
\int_M\eta_1-\int_M\eta_0
=\int_M(\eta_1-\eta_0)
=\int_Md\sigma.
$$

[Stokesの定理](../GEO8/index.md#thm-geo8-stokes)を $M$ と1形式 $\sigma$ に適用すると $\int_Md\sigma=\int_{\partial M}\sigma$ です。仮定 $\partial M=\varnothing$ から右辺は零となり、従って二つの積分は等しいです。
<!-- solution-end -->

#### A3. 非退化な両端だけでは不十分

$\mathbb R^2$ で $\omega_0=dx\wedge dy$、$\omega_1=-dx\wedge dy$ とする。両端が閉・非退化で、差が完全形式であることを確認した後、線形補間が破綻する時刻を求めよ。

- Level: A
- ID: SYM7-A3

<!-- solution-start -->
**詳細解答**　係数が $\pm1$ の2形式はどちらも非退化です。2次元で3形式は零なのでどちらも閉じています。差は

$$
\omega_1-\omega_0=-2\,dx\wedge dy=d(-2x\,dy)
$$

なので完全です。しかし

$$
\omega_t=(1-2t)\,dx\wedge dy
$$

の係数は $t=1/2$ に零です。この時刻では任意の非零ベクトル $v$ に対し $\iota_v\omega_{1/2}=0$ となり、非退化性を失うためMoser方程式の一意解を構成できません。壊れたのは差の完全性ではなく経路の非退化性です。
<!-- solution-end -->

#### A4. トーラスで大域的な原始形式を探す

$\mathbb T^2$ 上の $\eta=\cos x\,dx\wedge dy$ について、滑らかな大域1形式 $\sigma$ で $d\sigma=\eta$ となるものを求めよ。また $\int_{\mathbb T^2}\eta=0$ を直接確かめよ。

- Level: A
- ID: SYM7-A4

<!-- solution-start -->
**詳細解答**　$\sigma=\sin x\,dy$ を選びます。角度の変化が $2\pi$ の倍数でも $\sin x$ と $dy$ の値は変わらないので、大域的に定義できます。成分計算で

$$
d\sigma=\cos x\,dx\wedge dy+\sin x\,d(dy)
=\cos x\,dx\wedge dy.
$$

また

$$
\int_{\mathbb T^2}\eta
=\int_0^{2\pi}\int_0^{2\pi}\cos x\,dy\,dx
=2\pi[\sin x]_0^{2\pi}=0.
$$

完全性は原始形式を構成することで確認し、積分の零はそれと独立に検算しました。
<!-- solution-end -->

#### A5. 固定集合の条件は余ベクトル全体で見る

$\mathbb R^2$ の部分多様体 $S=\{(x,0):x\in\mathbb R\}$、1形式 $\alpha=y\,dx+dy$ と包含 $\iota_S:S\hookrightarrow\mathbb R^2$ を考える。$\iota_S^*\alpha$ と $\alpha_{(x,0)}$ を比較し、「引き戻しが零」から「各点の原始形式が零」とは言えないことを示せ。

- Level: A
- ID: SYM7-A5

<!-- solution-start -->
**詳細解答**　$S$ の接ベクトルは $\partial_x$ の倍数であり、$y=0$、$dy(\partial_x)=0$ です。従って

$$
\iota_S^*\alpha
=(y|_S)\,d(x|_S)+d(y|_S)=0\,dx+d0=0.
$$

一方、周囲の余接空間 $T^*_{(x,0)}\mathbb R^2$ では

$$
\alpha_{(x,0)}=dy\ne0
$$

です。実際、法方向 $\partial_y$ に作用させると $dy(\partial_y)=1$ です。従って[固定集合の命題](#prop-sym7-relative-fixed-set)で必要な強い条件は、この例では成立していません。
<!-- solution-end -->

### Level B：仮定の適用と失敗機構

#### B1. 非線形な時間依存から原始形式を構成する

コンパクトで境界のない $M$ 上のシンプレクティック形式 $\omega_0$ と滑らかな1形式 $\sigma$ について、$\omega_t=\omega_0+t^2d\sigma$ が $0\le t\le1$ の全時刻で非退化と仮定する。Moser定理を適用するための全条件を確かめ、ベクトル場の方程式を求めよ。

- Level: B
- ID: SYM7-B1

<!-- solution-start -->
**詳細解答**　各 $\omega_t$ は滑らかです。閉性は

$$
d\omega_t=d\omega_0+t^2d(d\sigma)=0
$$

です。非退化性は問題文で全時刻に仮定されています。時間微分すると

$$
\dot\omega_t=2t\,d\sigma=d(2t\,\sigma),
$$

ここで $t$ は空間外微分に対して定数です。よって $\alpha_t=2t\sigma$ は滑らかな大域1形式の族です。[Moser安定性定理](#thm-sym7-moser-stability)へ $(M,\omega_t,\alpha_t)$ を入力すると、求めるベクトル場は

$$
\iota_{Y_t}(\omega_0+t^2d\sigma)=-2t\sigma
$$

の一意解となります。コンパクト・境界なしの仮定で流れは時刻1まで定義され、$\varphi_t^*(\omega_0+t^2d\sigma)=\omega_0$ です。$t=0$ では右辺が零なので $Y_0=0$ となる点も確認できます。
<!-- solution-end -->

#### B2. 正準変形で二つの円周が固定される

$M=\mathbb T^2$、$|b|<1$ とし、$\omega_t=(1+t^2b\cos x)\,dx\wedge dy$ とする。Moser方程式を具体化し、$x=0$ と $x=\pi$ の円周が点ごとに固定されることを証明せよ。

- Level: B
- ID: SYM7-B2

<!-- solution-start -->
**詳細解答**　$\omega_t$ の係数は $1-|b|>0$ 以上で、閉性は次元から成立します。また

$$
\dot\omega_t=2tb\cos x\,dx\wedge dy=d(2tb\sin x\,dy)
$$

なので $\alpha_t=2tb\sin x\,dy$ です。$Y_t=u_t\partial_x+v_t\partial_y$ に対し

$$
(1+t^2b\cos x)(u_t\,dy-v_t\,dx)
=-2tb\sin x\,dy.
$$

係数比較から

$$
u_t=-\frac{2tb\sin x}{1+t^2b\cos x},
\qquad v_t=0.
$$

$x=0,\pi$ では $\sin x=0$ なので $Y_t=0$ です。定数解と[初期値解の一意性](../ODE1/index.md#thm-ode1-picard-lindelof)により、これらの円周の各点は動きません。単に $\iota_S^*\alpha_t=0$ を使ったのではなく、周囲の余ベクトルとして $\alpha_t=0$ を確認しています。
<!-- solution-end -->

#### B3. 非コンパクトな場合の反例を最後まで検証する

$\mathbb R^2$ 上の

$$
\omega_t=(1-t+te^{-(x^2+y^2)})\,dx\wedge dy
$$

について、(i) 全時刻でシンプレクティック、(ii) 差が完全、(iii) 時刻0と1の間に全域微分同相 $\varphi$ で $\varphi^*\omega_1=\omega_0$ を満たすものはない、を示せ。

- Level: B
- ID: SYM7-B3

<!-- solution-start -->
**詳細解答**　(i) $0\le t<1$ なら係数は $1-t>0$ 以上、$t=1$ でも $e^{-(x^2+y^2)}>0$ です。2次元で3形式が零なので閉性も成立します。

(ii) 大域1形式

$$
\sigma=\left(\int_0^x(e^{-(s^2+y^2)}-1)\,ds\right)dy
$$

を選びます。係数は滑らかな被積分関数の有限区間積分なので滑らかです。$d\sigma$ の $dx\wedge dy$ 成分は、上限 $x$ に関する微分であり、

$$
d\sigma=(e^{-(x^2+y^2)}-1)\,dx\wedge dy
=\dot\omega_t.
$$

(iii) もし全域微分同相が存在すれば、$\omega_0,\omega_1$ は正の面積形式なので変数変換は正の面積測度の総量を保存します。しかし

$$
\int_{\mathbb R^2}\omega_0=+\infty,\qquad
\int_{\mathbb R^2}\omega_1
=2\pi\int_0^\infty e^{-r^2}r\,dr
=\pi.
$$

両者は等しくありません。従って微分同相は存在せず、Moser法の不足していた仮定がコンパクト性（またはそれを代替する完備性・存在域の保証）だと分かります。
<!-- solution-end -->

#### B4. 積多様体にMoser法を適用する

コンパクトで境界のない $M,N$ 上に、シンプレクティック経路 $\omega_t$ と $\eta_t$ があり、それぞれ $\dot\omega_t=d\alpha_t$、$\dot\eta_t=d\beta_t$ を満たすとする。$M\times N$ 上の形式

$$
\Omega_t=\pi_M^*\omega_t+\pi_N^*\eta_t
$$

がMoser定理の仮定を満たすことを示し、対応するベクトル場が $(Y_t^M,Y_t^N)$ であることを証明せよ。

- Level: B
- ID: SYM7-B4

<!-- solution-start -->
**詳細解答**　$\pi_M,\pi_N$ は射影です。[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)により

$$
d\Omega_t=\pi_M^*d\omega_t+\pi_N^*d\eta_t=0.
$$

接空間 $T_{(x,y)}(M\times N)=T_xM\oplus T_yN$ で、任意の $(v,w)$ について $\Omega_t((v,w),(\cdot,0))=0$ なら非退化な $\omega_t$ により $v=0$、同様に $(0,\cdot)$ を代入すれば $w=0$ です。よって $\Omega_t$ は非退化です。$M\times N$ はコンパクトで境界がありません。

時間微分は

$$
\begin{aligned}
\dot\Omega_t
&=\pi_M^*\dot\omega_t+\pi_N^*\dot\eta_t\\
&=\pi_M^*d\alpha_t+\pi_N^*d\beta_t\\
&=d(\pi_M^*\alpha_t+\pi_N^*\beta_t).
\end{aligned}
$$

ここで $\Gamma_t=\pi_M^*\alpha_t+\pi_N^*\beta_t$ と置きます。各因子で $\iota_{Y_t^M}\omega_t=-\alpha_t$、$\iota_{Y_t^N}\eta_t=-\beta_t$ を解けば、積の接ベクトル場 $Y_t=(Y_t^M,Y_t^N)$ は

$$
\iota_{Y_t}\Omega_t
=-\pi_M^*\alpha_t-\pi_N^*\beta_t=-\Gamma_t
$$

を満たします。非退化性による一意性から、これが積空間のMoserベクトル場です。[Moser安定性定理](#thm-sym7-moser-stability)で積空間の同位変形が得られます。
<!-- solution-end -->

### Level C：具体的な流れと幾何的な意味を統合する

#### C1. トーラスの変形を全項目から再導出する

$\mathbb T^2$ 上で $|a|<1$、$\omega_t=(1+ta\cos x)\,dx\wedge dy$ とする。次を全て示せ。

1. 全時刻の非退化性と閉性、$\dot\omega_t=d\sigma$ を満たす大域1形式 $\sigma$。
2. Moserベクトル場の成分式および $F_t(u)=u+ta\sin u$ が円周微分同相である理由。
3. 流れ $\varphi_t(x,y)=(F_t^{-1}(x),y)$ と引き戻しの検算。
4. 変形で固定される円周と、各時刻の総面積。

- Level: C
- ID: SYM7-C1

<!-- solution-start -->
**詳細解答**

**(1)**　2次元の3形式は零であり、$d\omega_t=0$ です。$1+ta\cos x\ge1-|a|>0$ なので各時刻の形式は非退化です。$\sigma=a\sin x\,dy$ は角度座標の周期的な係数からなる大域形式で、

$$
d\sigma=a\cos x\,dx\wedge dy=\dot\omega_t
$$

です。

**(2)**　$Y_t=u\partial_x+v\partial_y$ として

$$
\iota_{Y_t}\omega_t
=(1+ta\cos x)(u\,dy-v\,dx)
=-a\sin x\,dy
$$

を比較すると

$$
u=-\frac{a\sin x}{1+ta\cos x},\qquad v=0.
$$

$F_t'(u)=1+ta\cos u>0$ であり $F_t(u+2\pi)=F_t(u)+2\pi$ です。従って $F_t$ は実直線上の厳密増加な全単射（$F_t(u)-u$ は有界）で、円周の滑らかな微分同相を誘導します。

**(3)**　$u_t=F_t^{-1}(x_0)$ を $F_t(u_t)=x_0$ に代入して微分すると

$$
0=(1+ta\cos u_t)\dot u_t+a\sin u_t,\qquad
\dot u_t=-\frac{a\sin u_t}{1+ta\cos u_t}.
$$

初期条件 $F_0(u)=u$ により $u_0=x_0$ です。$y$ 方向の速度は零なので、解の一意性から $\varphi_t(x_0,y_0)=(u_t,y_0)$ となります。$x_0=F_t(u_t)$ から

$$
du_t=\frac{dx_0}{1+ta\cos u_t}.
$$

よって

$$
\begin{aligned}
\varphi_t^*\omega_t
&=(1+ta\cos u_t)\,du_t\wedge dy_0\\
&=dx_0\wedge dy_0=\omega_0.
\end{aligned}
$$

**(4)**　$Y_t$ の分子 $\sin x$ は $x=0,\pi$ で零です。従ってそこで速度は零となり、初期値の一意性によりそれぞれの円周の全点が固定されます。総面積は

$$
\begin{aligned}
\int_{\mathbb T^2}\omega_t
&=\int_0^{2\pi}\int_0^{2\pi}(1+ta\cos x)\,dy\,dx\\
&=2\pi(2\pi+ta[\sin x]_0^{2\pi})
=4\pi^2.
\end{aligned}
$$

固定点・局所的な係数の変化・大域面積の不変性が同じ流れで整合しています。
<!-- solution-end -->

## 8. 次章への接続

SYM5では形式の差を**一点近傍で**消し、本章では**コンパクト多様体全体で**消しました。同じMoser方程式が働くものの、局所では近傍の縮小、大域では経路中の非退化性と流れの完備性が鍵です。コホモロジー条件だけで同位変形を即断しない、という区別が重要です。

次のSYM8では、シンプレクティック形式と適合する概複素構造 $J$ を調べます。形式を保つ変換の存在を追った本章から、形式に追加の幾何構造を組み合わせる問題へ移ります。