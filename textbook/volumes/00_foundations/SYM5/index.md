# SYM5 Darbouxの定理

[SYM1の線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)は、一つの接空間にある非退化交代形式を標準形に直しました。[SYM2のシンプレクティック多様体](../SYM2/index.md#def-sym2-symplectic-manifold)では、そのような形式が各点で滑らかに変化し、さらに閉じていることを要求しました。前章の[Hamiltonベクトル場の正準座標式](../SYM4/index.md#thm-sym4-existence-coordinate)は、標準形を持つ座標の上では使えました。

しかし、**各点の接空間に標準基底があること**と、**ある開集合全体でその基底を座標ベクトルとして実現できること**は違います。点ごとに勝手に作った基底は、隣接点との微分の整合性を保証しないからです。本章で証明する結果は、閉性と非退化性がそろえば、どの点の近くでもその障害を取り除けるというものです。

ここでは線形代数で一点の形を合わせ、2形式の差の局所原始形式を実際に構成し、その差を時間依存ベクトル場の流れで消します。**流れが時刻1まで同じ近傍で存在するか**も証明の一部です。局所での結果であって、多様体全体に一つの正準座標系があるという主張ではありません。

## 1. 目指す座標と最初の直接例

$(M,\omega)$ を滑らかな実シンプレクティック多様体、$\dim M=2n$ とします。局所座標を新しく作る問題なので、まず標準的な座標の意味を決めます。

<a id="def-sym5-darboux-chart"></a>

<!-- formal-statement-start -->
> **定義（Darboux座標）**  
> $(M,\omega)$ を $2n$ 次元シンプレクティック多様体、$U\subset M$ を開集合とする。$U$ 上の滑らかな座標
>
$$
(q^1,\ldots,q^n,p_1,\ldots,p_n)
$$
>
> が
>
$$
\omega|_U=\sum_{i=1}^{n}dq^i\wedge dp_i
$$
>
> を満たすとき、この座標を **Darboux座標** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym5-darboux-chart -->
### 直接例：平面と座標の作り替え

**定義の確認**：座標が微分同相であることと、2形式が正準表示になることを別々に判定します。

$M=\mathbb R^2$ の $(x,y)$ 座標で

$$
\omega=(1+x^2)\,dx\wedge dy
$$

とします。係数 $1+x^2$ は正なので、この2形式は非退化です。また2次元多様体の3形式は零なので $d\omega=0$ です。新しい関数を

$$
q=x,\qquad p=(1+x^2)y
$$

で定義すると、逆変換は $x=q$、$y=p/(1+q^2)$ で滑らかです。微分して

$$
dp=2xy\,dx+(1+x^2)\,dy,
$$

$$
\begin{aligned}
dq\wedge dp
&=dx\wedge\bigl(2xy\,dx+(1+x^2)\,dy\bigr)\\
&=(1+x^2)\,dx\wedge dy
=\omega.
\end{aligned}
$$

従って $(q,p)$ は実際にDarboux座標です。この例は全平面で成り立ちますが、一般の定理が保証するのは一点の近傍です。
<!-- definition-example-end -->

平面では座標を積分で探せました。高次元では複数の2形式の係数が互いに結び付くため、係数を一つずつ積分するだけでは足りません。代わりに、**2形式そのものを連続的に動かしながら座標も動かす**方法を使います。

## 2. 一点で標準化し、差を外微分に戻す

点 $m\in M$ を固定します。[SYM1の線形シンプレクティック標準形](../SYM1/index.md#thm-sym1-linear-normal-form)を $(T_mM,\omega_m)$ に適用し、標準的な対をなす基底 $(e_1,\ldots,e_n,f_1,\ldots,f_n)$ を取ります。ただし「この基底を座標ベクトルにする」には、一つ座標変換が必要です。

まず任意の局所座標 $y$ で $y(m)=0$ とします。$dy_m(e_1),\ldots,dy_m(e_n),dy_m(f_1),\ldots,dy_m(f_n)$ を列とする $2n$ 次正方行列を $A$ と置きます。$dy_m$ は線形同型で、選んだ接ベクトルも基底なので $A$ は可逆です。そこで新しい局所座標を

$$
x=A^{-1}y
$$

と定めます。連鎖律から $dx_m=A^{-1}dy_m$ なので、例えば

$$
dx_m(e_i)=A^{-1}dy_m(e_i)=\mathbf e_i,
\qquad
dx_m(f_i)=A^{-1}dy_m(f_i)=\mathbf e_{n+i}.
$$

従って原点の座標ベクトルが選んだシンプレクティック基底となり、$m$ は $0\in\mathbb R^{2n}$ に写ります。ここでは微分形式を原点の一点で標準化しただけで、近傍全体で一定にしたわけではありません。

座標を $(x^1,\ldots,x^{2n})=(q^1,\ldots,q^n,p_1,\ldots,p_n)$ と書くと、原点における形式は

$$
\omega_0=\sum_{i=1}^n dq^i\wedge dp_i
$$

です。この $\omega_0$ を近傍全体で**係数が一定の2形式**としても用います。元の形式を同じ座標で $\omega$ と書き、差を

$$
\beta=\omega-\omega_0
$$

と置きます。[シンプレクティック形式の閉性](../SYM2/index.md#def-sym2-symplectic-manifold)と[外微分の二乗零・線形性](../GEO7/index.md#thm-geo7-d-square-zero)から

$$
d\beta=d\omega-d\omega_0=0,
\qquad
\beta(0)=0.
$$

近傍を原点中心の開球 $B_R$ に縮めます。線分 $tx$ が $0\le t\le1$ のすべてで $B_R$ に入るので、次の積分が定義できます。

<a id="lem-sym5-radial-primitive"></a>

<!-- formal-statement-start -->
> **補題（閉2形式の動径原始形式の具体式）**  
> $B_R\subset\mathbb R^m$ を原点中心の開球、$\beta=\frac12\sum_{i,j}\beta_{ij}(x)\,dx^i\wedge dx^j$ を滑らかな閉2形式とする。このとき1形式
>
$$
\sigma_x(v)=\int_0^1 t\,\beta_{tx}(x,v)\,dt
$$
>
> は滑らかで $d\sigma=\beta$ を満たす。さらに $\beta(0)=0$ なら $\sigma(0)=0$ であり、十分小さい球上で $\lVert\sigma_x\rVert\le C\lVert x\rVert^2$ とできる。
<!-- formal-statement-end -->

### 証明の見取り図

これは[微分形式のPoincaréの補題](../GEO9/index.md#thm-geo9-poincare-lemma)の2形式についての動径構成です。ただし結果を引用するだけでなく、座標で偏微分を行い、閉性によって積分の中身が全微分になる場所を確かめます。

<!-- proof-start -->
### 証明

成分で $\sigma=\sum_j\sigma_j\,dx^j$ と書くと

$$
\sigma_j(x)=\sum_i\int_0^1t\,x^i\beta_{ij}(tx)\,dt.
$$

積分区間は固定で被積分関数が滑らかなので、球内の小さなコンパクト集合上では微分と積分を交換できます。したがって任意の添字 $j,k$ について

$$
\begin{aligned}
\partial_k\sigma_j
&=\int_0^1\left(
t\beta_{kj}(tx)+t^2x^i(\partial_k\beta_{ij})(tx)
\right)dt,\\
\partial_j\sigma_k
&=\int_0^1\left(
t\beta_{jk}(tx)+t^2x^i(\partial_j\beta_{ik})(tx)
\right)dt.
\end{aligned}
$$

ここおよび以下、繰り返す $i$ について和を取ります。交代性は $\beta_{jk}=-\beta_{kj}$ です。また閉性 $d\beta=0$ の $(i,j,k)$ 成分は

$$
\partial_i\beta_{jk}
+\partial_j\beta_{ki}
+\partial_k\beta_{ij}=0.
$$

よって $\partial_j\beta_{ki}=-\partial_j\beta_{ik}$ を代入し、

$$
\partial_k\beta_{ij}-\partial_j\beta_{ik}
=\partial_i\beta_{kj}.
$$

これらを引き算に戻すと

$$
\begin{aligned}
\partial_k\sigma_j-\partial_j\sigma_k
&=\int_0^1
\left(2t\beta_{kj}(tx)+t^2x^i\partial_i\beta_{kj}(tx)\right)dt\\
&=\int_0^1\frac{d}{dt}
\left(t^2\beta_{kj}(tx)\right)dt\\
&=\beta_{kj}(x)-\lim_{t\downarrow0}t^2\beta_{kj}(tx)\\
&=\beta_{kj}(x).
\end{aligned}
$$

最後の極限が零なのは $\beta_{kj}$ が原点付近で有界だからです。これが全ての $j,k$ で成り立ち、$d\sigma=\beta$ が従います。

さらに $\beta(0)=0$ の場合、小球の閉包上で係数の一階微分に一様上界 $C_1$ を取れます。$s\mapsto\beta_{ij}(stx)$ に一変数の微積分の基本定理を使うと

$$
\begin{aligned}
\beta_{ij}(tx)-\beta_{ij}(0)
&=\int_0^1\frac{d}{ds}\beta_{ij}(stx)\,ds\\
&=\int_0^1D\beta_{ij}(stx)[tx]\,ds,
\end{aligned}
$$

よって $|\beta_{ij}(tx)|\le C_1t|x|$ です。ここで $0\le t\le1$ かつ原点中心の球は線分に関して凸なので、積分中の点は球内にあります。従って各成分について

$$
|\sigma_j(x)|
\le \sum_i\int_0^1t\,|x^i|C_1t|x|\,dt
\le C_2|x|^2\int_0^1t^2dt
=\frac{C_2}{3}|x|^2.
$$

有限個の成分を合わせれば所要のノルム評価を得ます。特に $\sigma(0)=0$ です。
<!-- proof-end -->

**閉性がどこで必要だったか。** 途中の

$$
\partial_k\beta_{ij}-\partial_j\beta_{ik}
=\partial_i\beta_{kj}
$$

は閉性がなければ成立しません。形式の差を原始形式で表すことが、次の時間発展の打消しに必要なのです。

### 小さな例：積分公式を実際に使う

$\mathbb R^2$ で $\beta=x\,dx\wedge dy$ とすれば

$$
\begin{aligned}
\sigma
&=\int_0^1t\,\beta_{(tx,ty)}
\bigl((x,y),\cdot\bigr)\,dt\\
&=\int_0^1t^2x\,(x\,dy-y\,dx)\,dt\\
&=\frac{x^2}{3}\,dy-\frac{xy}{3}\,dx.
\end{aligned}
$$

そこで

$$
\begin{aligned}
d\sigma
&=\frac{2x}{3}\,dx\wedge dy
-\frac13(y\,dx+x\,dy)\wedge dx\\
&=\left(\frac{2x}{3}+\frac{x}{3}\right)dx\wedge dy\\
&=x\,dx\wedge dy=\beta.
\end{aligned}
$$

係数 $1/3$ は単なる暗記公式でなく、動径積分 $\int_0^1t^2dt$ から出ています。

## 3. 形式の経路を作り、非退化性を同時に守る

二つの2形式 $\omega_0,\omega$ の間を

$$
\omega_t=\omega_0+t(\omega-\omega_0)
=\omega_0+t\beta,\qquad 0\le t\le1
$$

で結びます。[外微分の線形性と二乗零](../GEO7/index.md#thm-geo7-d-square-zero)を使い、$t$ を空間座標とは独立なパラメータとして固定すれば

$$
d\omega_t=(1-t)d\omega_0+t\,d\omega=0
$$

です。ただし**非退化性は線形補間だけからは出ません**。そこで原点に近い範囲に制限します。

<a id="lem-sym5-uniform-nondegeneracy"></a>

<!-- formal-statement-start -->
> **補題（経路全体に共通する非退化近傍）**  
> 滑らかな2形式 $\omega$ が原点 $0$ で非退化で、$\omega_0$ をその原点値から作った定係数2形式とする。このとき、十分小さな $R>0$ が存在し、
>
$$
\omega_t=\omega_0+t(\omega-\omega_0),
\qquad (t,x)\in[0,1]\times B_R
$$
>
> は全ての $t,x$ で非退化となる。
<!-- formal-statement-end -->

### 証明の見取り図

原点では全ての $t$ で同一の可逆行列になります。その行列式と、$t$ を含む係数の連続性を使い、一つの球を選びます。

<!-- proof-start -->
### 証明

各形式の交代係数行列を $\Omega(x),\Omega_0,\Omega_t(x)$ とします。原点で $\Omega(0)=\Omega_0$ なので

$$
\Omega_t(0)=(1-t)\Omega_0+t\Omega_0=\Omega_0.
$$

$\det\Omega_0\ne0$ です。関数 $(t,x)\mapsto\det\Omega_t(x)$ は連続で、$[0,1]\times\{0\}$ 上では常に $\det\Omega_0$ です。したがって、任意に小さい正数 $\varepsilon<|\det\Omega_0|/2$ に対し、コンパクト集合 $[0,1]\times\{0\}$ の周囲で

$$
|\det\Omega_t(x)-\det\Omega_0|<\varepsilon
$$

を全ての $t$ について同時に満たす球 $B_R$ を選べます。このとき行列式は、次の下界を満たします。

$$
|\det\Omega_t(x)|
\ge |\det\Omega_0|-\varepsilon
>|\det\Omega_0|/2>0.
$$

よって全経路が同じ球の上で非退化です。
<!-- proof-end -->

ここで逆行列 $\Omega_t(x)^{-1}$ は $(t,x)$ に滑らかに依存します。[SYM4の存在・滑らかさの証明](../SYM4/index.md#thm-sym4-existence-coordinate)と同じく、行列式が零にならない範囲で余因子行列を行列式で割れば確認できます。

## 4. 時間依存ベクトル場で差を消す

補題の $\sigma$ は $d\sigma=\omega-\omega_0$ を満たします。$\omega_t$ は全経路で非退化だから、各 $t$ に対してベクトル場 $Y_t$ を一意に

$$
\iota_{Y_t}\omega_t=-\sigma
$$

で定められます。これは一般にHamiltonベクトル場ではありません。右辺が $dH$ でなく1形式 $-\sigma$ だからです。

この連立一次方程式を成分で解いて、滑らかさと符号を確認します。$\omega_t=\frac12\sum_{i,j}(\Omega_t)_{ij}\,dx^i\wedge dx^j$、$\sigma=\sum_j\sigma_j\,dx^j$ と書き、$Y_t=\sum_iY_t^i\partial_{x^i}$ とします。内部積の第 $j$ 成分は $\sum_iY_t^i(\Omega_t)_{ij}$ なので、列ベクトル $Y_t=(Y_t^i)_i$ と $s=(\sigma_j)_j$ には

$$
\Omega_t(x)^{\mathsf T}Y_t(x)=-s(x)
$$

が必要です。[共通非退化近傍の補題](#lem-sym5-uniform-nondegeneracy)で $\det\Omega_t(x)\ne0$ を確認済みだから、

$$
Y_t(x)=-\bigl(\Omega_t(x)^{\mathsf T}\bigr)^{-1}s(x).
$$

$\Omega_t$ と $s$ は $(t,x)$ に滑らかで、逆行列は行列式が零でない限り滑らかです。この式によって $Y_t(x)$ は $(t,x)$ に滑らかに依存します。$\sigma(0)=0$ と非退化性より

$$
Y_t(0)=0\qquad(0\le t\le1)
$$

です。

### 局所流を時刻1まで確保する

ここが局所定理の存在域に関わる核心です。時間を状態変数とみなすため、まず $Y_t$ を $0\le t\le1$ の少し外側でも定義します。行列の補間式 $\Omega_t(x)=\Omega_0+t(\Omega(x)-\Omega_0)$ は全ての実数 $t$ に対して意味を持ち、

$$
\Omega_t(0)=\Omega_0\qquad(t\in\mathbb R)
$$

です。[非退化近傍の補題](#lem-sym5-uniform-nondegeneracy)のコンパクト性による証明を、時間区間 $[-1,2]$ に適用します。$R$ を元の座標球より小さく取り直せば、$[-1,2]\times\overline{B_R}$ で全ての $\Omega_t(x)$ を非退化にできます。従って前の逆行列表示から $Y_t(x)$ はこの集合を含む開近傍上で滑らかです。

特にコンパクト集合 $[0,1]\times\overline{B_R}$ 上で $D_xY_t$ は有界です。$Y_t(0)=0$ と原点からの線分上の微積分の基本定理により、定数 $L>0$ があり、

$$
Y_t(x)-Y_t(0)
=\int_0^1D_xY_t(sx)\,x\,ds,
$$

$$
|Y_t(x)|\le L|x|.
$$

時間依存の初期値問題

$$
\frac{d}{dt}\varphi_t(x)=Y_t(\varphi_t(x)),
\qquad
\varphi_0(x)=x
$$

には、滑らかさと局所Lipschitz性から[Picard–Lindelöfの定理](../ODE1/index.md#thm-ode1-picard-lindelof)を適用できます。解が $B_R$ にある間は積分不等式に[Grönwallの補題](../ODE8/index.md#lem-ode8-gronwall)を使い、

$$
\begin{aligned}
|\varphi_t(x)|
&\le |x|+\int_0^t|Y_s(\varphi_s(x))|\,ds\\
&\le |x|+L\int_0^t|\varphi_s(x)|\,ds\\
&\le |x|e^{Lt}\le |x|e^L.
\end{aligned}
$$

そこで半径 $r$ を

$$
0<r<Re^{-L}
$$

と選びます。初期点 $x\in B_r$ から出る解について、上の評価が成立する限り

$$
|\varphi_t(x)|\le re^L<R
\qquad (0\le t\le1)
$$

です。従って時刻1以前に球の境界へ初めて到達することはありません。

それでも時刻1以前に解が延長不能となる可能性を排除する必要があります。ここで解は、球の内部にあるコンパクト集合

$$
\overline{B_{re^L}}\subset B_R
$$

に留まります。ここで時間変数を加えた自律系を

$$
\frac{d}{d\tau}(s,z)=\bigl(1,Y_s(z)\bigr),
\qquad (s(0),z(0))=(0,x)
$$

と置きます。右辺は開集合 $(-1,2)\times B_R$ で滑らかです。$0\le\tau\le1$ の間、解はコンパクト集合

$$
K=[0,1]\times\overline{B_{re^L}}
\subset(-1,2)\times B_R
$$

から出られません。仮に時刻1より前に最大解が停止すれば、[最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)をこの拡大自律系と $K$ に適用した結論に反します。従って全解は時刻1まで存在します。

ゆえに全ての $x\in B_r$ について

$$
\varphi_1(x)\ \text{が定義される}
$$

と結論できます。

初期値への滑らかな依存と逆写像も確認します。上の拡大自律系に対して[流れの初期値微分と変分方程式](../ODE8/index.md#lem-ode8-flow-variational)を使うと、$J_t(x)=D_x\varphi_t(x)$ が存在し、

$$
\frac{d}{dt}J_t(x)
=D_xY_t(\varphi_t(x))J_t(x),
\qquad J_0(x)=I
$$

となります。$Y_t$ は滑らかなので、さらに初期値で微分した二階微分 $K_t(x)=D_x^2\varphi_t(x)$ は、方向 $u,v$ に対して

$$
\begin{aligned}
\frac{d}{dt}K_t(x)[u,v]
&=D_xY_t(\varphi_t(x))K_t(x)[u,v]\\
&\quad+D_x^2Y_t(\varphi_t(x))
[J_t(x)u,J_t(x)v].
\end{aligned}
$$

を満たします。右辺は既知の一階微分と線形な二階微分の方程式なので、同じ操作を繰り返して任意階の初期値微分を得られます。従って $\varphi_t$ は滑らかです。

また同じ拡大系の[流れの合成則](../ODE8/index.md#prop-ode8-flow-law)と一意性により、時刻 $0$ から時刻 $t$ への写像の逆は時刻 $t$ から時刻 $0$ まで逆向きに解をたどる写像です。逆向きの解も滑らかなベクトル場の局所流なので、逆写像も滑らかです。ゆえに各 $\varphi_t$ は $B_r$ から像への微分同相であり、逆写像の像が元の $B_r$ に一致するとは限りません。

### 変化の微分を直接相殺する

$t$ に依存する形式の引き戻しは、時間微分とLie微分の二項に分けられます。[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)と[外微分・引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を使うと、

$$
\begin{aligned}
\frac{d}{dt}\bigl(\varphi_t^*\omega_t\bigr)
&=\varphi_t^*\bigl(\partial_t\omega_t+\mathcal L_{Y_t}\omega_t\bigr)\\
&=\varphi_t^*\bigl(\beta+d(\iota_{Y_t}\omega_t)
+\iota_{Y_t}d\omega_t\bigr)\\
&=\varphi_t^*\bigl(\beta-d\sigma+0\bigr)=0.
\end{aligned}
$$

一行目がなぜ成立するかも成分で確認します。$\omega_t=\frac12\omega_{t,ij}\,dx^i\wedge dx^j$、$\varphi_t=(\varphi_t^1,\ldots,\varphi_t^{2n})$ と書き、$\partial_t\varphi_t^i=Y_t^i(\varphi_t)$ を座標で微分すると

$$
\partial_t(\partial_a\varphi_t^i)
=\sum_k(\partial_kY_t^i)(\varphi_t)\,\partial_a\varphi_t^k.
$$

従って $\varphi_t^*\omega_t$ の $(a,b)$ 成分を積の微分で展開すると、$\omega_{t,ij}$ の時間微分・移流項・二つのJacobianの微分から

$$
\begin{aligned}
\partial_t(\varphi_t^*\omega_t)_{ab}
&=\sum_{i,j}\Bigl[
\partial_t\omega_{t,ij}
+Y_t^k\partial_k\omega_{t,ij}\\
&\qquad
+(\partial_iY_t^k)\omega_{t,kj}
+(\partial_jY_t^k)\omega_{t,ik}
\Bigr](\varphi_t)
\,\partial_a\varphi_t^i\partial_b\varphi_t^j\\
&=\bigl(\varphi_t^*(\partial_t\omega_t+
\mathcal L_{Y_t}\omega_t)\bigr)_{ab}.
\end{aligned}
$$

これは各成分についての等式なので、引き戻し公式が従います。上の相殺計算の二行目では $d\omega_t=0$、三行目では $d\sigma=\beta$ と $\iota_{Y_t}\omega_t=-\sigma$ を使いました。

よって $t=0$ と $t=1$ を比較して

$$
\varphi_1^*\omega
=\varphi_1^*\omega_1
=\varphi_0^*\omega_0
=\omega_0
\quad\text{on }B_r.
$$

形式の差が引き戻しの時間微分で相殺される、これが局所経路法の働きです。

## 5. Darbouxの定理を完成させる

<a id="thm-sym5-darboux"></a>

<!-- formal-statement-start -->
> **定理（Darbouxの定理）**  
> $(M,\omega)$ を滑らかな $2n$ 次元シンプレクティック多様体とする。任意の点 $m\in M$ に対して、$m$ を含む開近傍 $U$ とその滑らかな局所座標
>
$$
(q^1,\ldots,q^n,p_1,\ldots,p_n):U\longrightarrow\mathbb R^{2n}
$$
>
> が存在し、$U$ 上で
>
$$
\omega=\sum_{i=1}^n dq^i\wedge dp_i
$$
>
> と表される。
<!-- formal-statement-end -->

### 証明の見取り図

[線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)で点 $m$ だけの2形式を一定の標準形に合わせます。次に差の原始形式、経路に共通する非退化球、時刻1までの局所流を順に構成します。最後は流れの逆写像を新しい座標と読み替えます。

<!-- proof-start -->
### 証明

上の第2節で構成した座標写像を $z$ と書きます。$z(m)=0$ です。元の多様体上の形式を $\omega$、座標球上へ移した形式を

$$
\widehat\omega=(z^{-1})^*\omega
$$

と区別します。第2〜4節では $\widehat\omega$ を簡単に $\omega$ と記して計算していました。原点値から作る定係数形式を $\omega_0$ とし、[閉2形式の動径原始形式の補題](#lem-sym5-radial-primitive)を

$$
\beta=\widehat\omega-\omega_0
$$

に適用します。$\beta(0)=0$ と $d\beta=0$ を第2節で確認しているので、$d\sigma=\beta$ を満たす滑らかな1形式 $\sigma$ を得ます。

[非退化近傍の補題](#lem-sym5-uniform-nondegeneracy)で全ての $t\in[0,1]$ に共通の球を取り、第4節の時間依存ベクトル場

$$
\iota_{Y_t}\omega_t=-\sigma,\qquad
\omega_t=\omega_0+t\beta
$$

を作ります。ここで $Y_t(0)=0$ なので、その局所流 $\varphi_t$ は小球 $B_r$ で時刻1まで存在し、微分同相 $\varphi_1:B_r\to\varphi_1(B_r)$ を与えます。前節の直接計算を座標球の形式 $\widehat\omega$ に読み替えると

$$
\varphi_1^*\widehat\omega=\omega_0.
$$

$V=\varphi_1(B_r)$ は原点を含む開集合です。元の多様体での近傍を $U=z^{-1}(V)$ とし、新しい座標写像を

$$
\chi=\varphi_1^{-1}\circ z:U\longrightarrow B_r
$$

とします。これは滑らかな座標写像です。標準2形式を $\omega_{\mathrm{std}}=\sum_i dq^i\wedge dp_i=\omega_0$ と書きます。先ほどの $\varphi_1^*\widehat\omega=\omega_{\mathrm{std}}$ を、微分同相 $\varphi_1:B_r\to V$ の逆写像で引き戻せば

$$
\widehat\omega|_V
=(\varphi_1^{-1})^*\omega_{\mathrm{std}}.
$$

さらに $z:U\to V$ によって元の多様体へ戻すと、[引き戻しの合成則](../GEO7/index.md#prop-geo7-pullback-wedge)から

$$
\begin{aligned}
\omega|_U
&=z^*(\widehat\omega|_V)\\
&=z^*(\varphi_1^{-1})^*\omega_{\mathrm{std}}\\
&=(\varphi_1^{-1}\circ z)^*\omega_{\mathrm{std}}\\
&=\chi^*\omega_{\mathrm{std}}.
\end{aligned}
$$

従って $\chi$ の成分 $(q^1,\ldots,q^n,p_1,\ldots,p_n)$ が求めるDarboux座標です。原点が $\varphi_t$ の固定点なので $\chi(m)=0$ も成立します。
<!-- proof-end -->

**注意：** $\omega$ が閉じていなければ $d\sigma=\omega-\omega_0$ を一般に解けず、$\omega_t$ が非退化でも上の相殺はできません。非退化でなければ $Y_t$ を1形式から一意に戻せません。また、$B_r$ を十分縮めたからこそ時刻1までの流れが得られたのであり、大域的な時間1写像の存在は主張していません。

## 6. 何が座標不変で、何が局所的か

[Darbouxの定理](#thm-sym5-darboux)により、局所ではシンプレクティック形式の係数に依存する追加の「曲率型の不変量」は現れません。例えば[SYM4のHamiltonベクトル場の座標式](../SYM4/index.md#thm-sym4-existence-coordinate)と[Poisson括弧の正準座標式](../SYM4/index.md#prop-sym4-coordinate-bracket)が、いまや**どの点でも適切な近傍を選べば**利用できます。

<a id="cor-sym5-local-poisson"></a>

<!-- formal-statement-start -->
> **系（各点の近くでの正準Poisson括弧）**  
> $(M,\omega)$ を滑らかな $2n$ 次元シンプレクティック多様体とする。任意の点の近傍に滑らかな局所座標が存在し、そこで滑らかな関数 $f,g$ は
>
$$
\{f,g\}=\sum_{i=1}^n
\left(
\frac{\partial f}{\partial q^i}\frac{\partial g}{\partial p_i}
-\frac{\partial f}{\partial p_i}\frac{\partial g}{\partial q^i}
\right)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[本章のDarbouxの定理](#thm-sym5-darboux)で正準座標を選び、そこに[SYM4の括弧の座標命題](../SYM4/index.md#prop-sym4-coordinate-bracket)を適用します。

<!-- proof-start -->
### 証明

$m\in M$ を任意に固定します。[Darbouxの定理](#thm-sym5-darboux)で $m$ の開近傍 $U$ と $\omega|_U=\sum_i dq^i\wedge dp_i$ を満たす座標を選べます。この $U$ に制限した $f,g$ に[Poisson括弧の正準座標公式](../SYM4/index.md#prop-sym4-coordinate-bracket)を適用すれば、主張の右辺を得ます。$m$ は任意なので全ての点でそのような近傍があります。
<!-- proof-end -->

### 閉性を外すと実際に失敗する

$\mathbb R^4$ の座標 $(x_1,x_2,x_3,x_4)$ で $|x_3|<1/2$ とし、

$$
\eta=(1+x_3)\,dx_1\wedge dx_2+dx_3\wedge dx_4
$$

を考えます。交代係数行列は $2\times2$ ブロック二つからなり、行列式は $(1+x_3)^2>0$ なので非退化です。しかし

$$
d\eta=dx_3\wedge dx_1\wedge dx_2\ne0.
$$

もし $\eta$ が局所座標で $\sum_i dq^i\wedge dp_i$ と書けるなら、[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)から $d\eta=0$ でなければならず、矛盾します。壊れた条件は閉性であって非退化性ではありません。

### なぜ大域座標にはならないか

例えば球面上の面積形式は[SYM2の球面の面積形式の命題](../SYM2/index.md#prop-sym2-sphere-area)で示したようにシンプレクティックですが、球面全体を $\mathbb R^2$ の開集合へ一枚の座標で写せません。実際、もしコンパクトな球面全体を開集合に微分同相で写せれば、その像はコンパクトかつ非空の開集合となり不可能です。ここでの障害は局所的な2形式の係数ではなく、大域的な位相です。

## 7. 演習：差の原始形式から局所座標の構成まで

### Level A：各段階を一つずつ手で確認する

#### A1. 座標を作った後の検算

$\mathbb R^2$ 上で $\omega=e^x\,dx\wedge dy$ とする。$q=x$、$p=e^xy$ がDarboux座標になることを、逆写像と外積の計算で示せ。

- Level: A
- ID: SYM5-A1

<!-- solution-start -->
**詳細解答**　逆写像は $x=q$、$y=e^{-q}p$ で、全点で滑らかです。$p=e^x\cdot y$ の微分に積の法則を適用すると

$$
dp=y\,d(e^x)+e^x\,dy=e^x y\,dx+e^x\,dy.
$$

$$
\begin{aligned}
dq\wedge dp
&=dx\wedge(e^x y\,dx+e^x\,dy)\\
&=e^x\,dx\wedge dy=\omega.
\end{aligned}
$$

係数 $e^x$ は常に正で非退化、2次元では閉性も成立します。従って[定義](#def-sym5-darboux-chart)の二条件を確認できました。
<!-- solution-end -->

#### A2. 非退化性を補間で確認する

$\omega_t=(1+t x)\,dx\wedge dy$、$0\le t\le1$ とする。$|x|<1/2$ で全時刻について非退化であることを示し、$x=-1,t=1$ ではどうなるか述べよ。

- Level: A
- ID: SYM5-A2

<!-- solution-start -->
**詳細解答**　係数行列は

$$
\Omega_t=\begin{pmatrix}0&1+tx\\-(1+tx)&0\end{pmatrix},
\qquad \det\Omega_t=(1+tx)^2.
$$

$|x|<1/2$ なら $|tx|<1/2$ なので $1+tx>1/2>0$、従って全ての $t$ で非退化です。一方 $x=-1,t=1$ では $1+tx=0$ となり、2形式は零です。共通近傍を縮める理由が分かります。
<!-- solution-end -->

#### A3. 動径原始形式の係数

$\beta=x\,dx\wedge dy$ とする。[閉2形式の動径原始形式の具体式](#lem-sym5-radial-primitive)を適用して $\sigma$ を求め、$d\sigma=\beta$ を確かめよ。

- Level: A
- ID: SYM5-A3

<!-- solution-start -->
**詳細解答**　$\beta_{(tx,ty)}((x,y),\cdot)=tx(x\,dy-y\,dx)$ です。従って

$$
\sigma=\int_0^1t^2x(x\,dy-y\,dx)\,dt
=\frac{x^2}{3}\,dy-\frac{xy}{3}\,dx.
$$

ここで

$$
\begin{aligned}
d\sigma
&=\frac{2x}{3}\,dx\wedge dy
-\frac13(y\,dx+x\,dy)\wedge dx\\
&=\left(\frac{2x}{3}+\frac{x}{3}\right)dx\wedge dy\\
&=x\,dx\wedge dy.
\end{aligned}
$$

先に結果だけを暗記すると $1/2$ と誤りやすいので、$\int_0^1t^2dt=1/3$ を明示します。
<!-- solution-end -->

#### A4. ベクトル場の符号

$\omega_t=(1+tx)\,dx\wedge dy$、$\sigma=(x^2\,dy-xy\,dx)/3$ とする。$\iota_{Y_t}\omega_t=-\sigma$ を満たす $Y_t=a\partial_x+b\partial_y$ の成分を求めよ。ただし $|x|<1/2$ とする。

- Level: A
- ID: SYM5-A4

<!-- solution-start -->
**詳細解答**　$Y_t=a\partial_x+b\partial_y$ を2形式の第一引数へ入れ、$dx\wedge dy$ を評価すると

$$
\iota_{Y_t}\omega_t=(1+tx)(a\,dy-b\,dx)
$$

です。一方

$$
-\sigma=-\frac{x^2}{3}\,dy+\frac{xy}{3}\,dx.
$$

$1+tx\ne0$ なので係数を比較し、

$$
a=-\frac{x^2}{3(1+tx)},
\qquad
b=-\frac{xy}{3(1+tx)}.
$$

原点で $a=b=0$ となることも確かめられます。$Y_t$ は[SYM4のHamiltonベクトル場](../SYM4/index.md#def-sym4-hamiltonian-vector-field)とは一般に異なり、右辺が $dH$ でなく $-\sigma$ です。
<!-- solution-end -->

#### A5. 流れを使う前の外微分の確認

滑らかな $\omega_0,\beta$ について $d\omega_0=d\beta=0$ とする。$\omega_t=\omega_0+t\beta$ と置き、$\partial_t\omega_t$ と $d\omega_t$ を求めよ。

- Level: A
- ID: SYM5-A5

<!-- solution-start -->
**詳細解答**　$t$ は空間変数から独立なので

$$
\partial_t\omega_t=\beta.
$$

外微分は空間変数について作用するため、線形性から

$$
d\omega_t=d\omega_0+t\,d\beta=0+t\cdot0=0.
$$

時間微分と外微分を混同せず、別々に評価することが、後の引き戻し計算に必要です。
<!-- solution-end -->

### Level B：仮定・存在域・相殺を組み合わせる

#### B1. 閉性のない非退化形式

$|x_3|<1/2$ の $\mathbb R^4$ 上に

$$
\eta=(1+x_3)\,dx_1\wedge dx_2+dx_3\wedge dx_4
$$

を置く。非退化性を行列式で示し、いずれの点の近傍でもDarboux座標が存在しない理由を論証せよ。

- Level: B
- ID: SYM5-B1

<!-- solution-start -->
**詳細解答**　座標順 $(x_1,x_2,x_3,x_4)$ で行列は

$$
\Omega=\begin{pmatrix}
0&1+x_3&0&0\\
-(1+x_3)&0&0&0\\
0&0&0&1\\
0&0&-1&0
\end{pmatrix}.
$$

行列式は対角ブロックの行列式の積だから

$$
\det\Omega=(1+x_3)^2\cdot1>0.
$$

他方、

$$
d\eta=dx_3\wedge dx_1\wedge dx_2
=dx_1\wedge dx_2\wedge dx_3\ne0
$$

です。局所座標の標準形式は閉じており、[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を適用すると、もしDarboux座標が存在すれば $d\eta=0$ になります。しかし $d\eta$ は各点で零でない3形式なので矛盾します。失われた仮定は閉性です。
<!-- solution-end -->

#### B2. 二つのシンプレクティック形式の線形補間

$\omega_0=dx\wedge dy$、$\omega_1=-dx\wedge dy$ を $\mathbb R^2$ 上に取る。両端はシンプレクティックでも、$(1-t)\omega_0+t\omega_1$ が全時刻で非退化とは限らないことを示せ。そのうえで本章の補間が成立する理由を説明せよ。

- Level: B
- ID: SYM5-B2

<!-- solution-start -->
**詳細解答**　補間すると

$$
\omega_t=(1-2t)\,dx\wedge dy.
$$

$t=1/2$ で $\omega_t=0$ となり、非退化性が破れます。従って「非退化な形式の集合は凸」という推論は誤りです。

一方、[本章の共通非退化近傍の補題](#lem-sym5-uniform-nondegeneracy)では $\omega(0)=\omega_0(0)$ が成立します。任意の $t$ について $\Omega_t(0)=\Omega_0$ であり、さらに $[0,1]$ がコンパクトなので同じ小球で非退化性を保てます。例の二形式は原点値が逆符号で一致せず、この根拠を使えません。
<!-- solution-end -->

#### B3. 時刻1までの解の存在域

$Y_t(0)=0$、$|Y_t(x)|\le3|x|$ が $[0,1]\times B_2\subset\mathbb R\times\mathbb R^m$ で成り立つ滑らかな時間依存ベクトル場を考える。時刻0に $|x|<2e^{-3}$ の点から出発した解が、時刻1まで $B_2$ 内に留まることを示せ。

- Level: B
- ID: SYM5-B3

<!-- solution-start -->
**詳細解答**　解が $B_2$ にある間、[初期値問題と積分方程式の同値性](../ODE1/index.md#prop-ode1-integral-equation)から

$$
|\varphi_t(x)|
\le |x|+\int_0^t3|\varphi_s(x)|\,ds.
$$

[Grönwallの補題](../ODE8/index.md#lem-ode8-gronwall)に、初期定数 $|x|$、係数3を代入すると

$$
|\varphi_t(x)|\le |x|e^{3t}\le |x|e^3<2.
$$

右辺は時刻1まで一様に2より小さいので、最初の境界到達時刻は存在しません。最大時刻が1より前だとしても、解は半径 $|x|e^3$ の閉球に留まり、[延長定理](../ODE8/index.md#thm-ode8-continuation)に反します。したがって時刻1まで解が定義されます。単に初期時刻で局所解があると言うだけでは不十分です。
<!-- solution-end -->

#### B4. 経路法の相殺を実計算する

$\omega_0=dx\wedge dy$、$\omega_1=(1+x)dx\wedge dy$ とし、$|x|<1/2$ に制限する。$\sigma=(x^2dy-xy\,dx)/3$ と $Y_t$ をA4の解で定める。$d\sigma=\omega_1-\omega_0$、$d\omega_t=0$、$\partial_t\omega_t+\mathcal L_{Y_t}\omega_t=0$ を確認せよ。

- Level: B
- ID: SYM5-B4

<!-- solution-start -->
**詳細解答**　まず $\sigma=(x^2\,dy-xy\,dx)/3$ をそれぞれ外微分します。$d(dy)=d(dx)=0$ と $dx\wedge dx=0$ を使えば

$$
\begin{aligned}
d\sigma
&=\frac{2x}{3}\,dx\wedge dy
-\frac13(y\,dx+x\,dy)\wedge dx\\
&=\left(\frac{2x}{3}+\frac{x}{3}\right)dx\wedge dy\\
&=x\,dx\wedge dy=\omega_1-\omega_0.
\end{aligned}
$$

また $\omega_t=(1+tx)dx\wedge dy$ は2次元上の2形式なので $d\omega_t=0$ です。A4の成分式をもう一度代入すると

$$
Y_t=-\frac{x^2}{3(1+tx)}\partial_x
-\frac{xy}{3(1+tx)}\partial_y,
$$

$$
\begin{aligned}
\iota_{Y_t}\omega_t
&=(1+tx)\left(
-\frac{x^2}{3(1+tx)}dy
+\frac{xy}{3(1+tx)}dx
\right)\\
&=-\frac{x^2}{3}dy+\frac{xy}{3}dx=-\sigma.
\end{aligned}
$$

[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)で計算すると

$$
\begin{aligned}
\partial_t\omega_t+\mathcal L_{Y_t}\omega_t
&=x\,dx\wedge dy
+d(\iota_{Y_t}\omega_t)+\iota_{Y_t}d\omega_t\\
&=x\,dx\wedge dy-d\sigma+0\\
&=x\,dx\wedge dy-x\,dx\wedge dy=0.
\end{aligned}
$$

これは実際に流れを解かなくても、その引き戻しで形式の変化が消える理由です。なお $1+tx>1/2$ により、方程式を解くときの分母は零になりません。
<!-- solution-end -->

### Level C：座標とHamilton方程式を結び直す

#### C1. Darboux座標でHamilton方程式を作り直す

$M=\mathbb R^2$、$\omega=(1+x^2)dx\wedge dy$、$H(x,y)=y^2/2$ とする。

1. $\omega$ がシンプレクティック形式であることを示せ。
2. $q=x$、$p=(1+x^2)y$ がDarboux座標になることを直接確かめよ。
3. 元の座標で $\iota_{X_H}\omega=dH$ を解け。
4. 新しい座標で $\widetilde H=H\circ(q,p)^{-1}$ を計算し、その正準Hamilton方程式が3のベクトル場を移すことを確かめよ。
5. $\{x,y\}$ と $\{q,p\}$ をそれぞれの座標で求め、両者が異なる理由を説明せよ。

- Level: C
- ID: SYM5-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$\omega$ の係数行列の行列式は $(1+x^2)^2>0$ なので非退化です。2次元上の3形式は零ですから $d\omega=0$ であり、[シンプレクティック形式の定義](../SYM2/index.md#def-sym2-symplectic-manifold)を満たします。

**(2)**　写像と逆写像は

$$
(q,p)=(x,(1+x^2)y),\qquad
(x,y)=\left(q,\frac{p}{1+q^2}\right).
$$

両者とも全域で滑らかです。また

$$
\begin{aligned}
dq\wedge dp
&=dx\wedge(2xy\,dx+(1+x^2)\,dy)\\
&=(1+x^2)\,dx\wedge dy=\omega.
\end{aligned}
$$

よって[Darboux座標の定義](#def-sym5-darboux-chart)に合致します。

**(3)**　$X_H=a\partial_x+b\partial_y$ とすると

$$
\iota_{X_H}\omega=(1+x^2)(a\,dy-b\,dx),
\qquad dH=y\,dy.
$$

係数比較により

$$
a=\frac{y}{1+x^2},\qquad b=0.
$$

従って元の方程式は

$$
\dot x=\frac{y}{1+x^2},\qquad\dot y=0.
$$

**(4)**　逆変換 $x=q$、$y=p/(1+q^2)$ を $H(x,y)=y^2/2$ に代入し、

$$
\widetilde H(q,p)=\frac12p^2(1+q^2)^{-2}
$$

と書きます。$p$ と $q$ をそれぞれ独立に微分すると

$$
\begin{aligned}
\widetilde H_p
&=\frac12(2p)(1+q^2)^{-2}
=\frac{p}{(1+q^2)^2},\\
\frac{\partial}{\partial q}(1+q^2)^{-2}
&=-2(1+q^2)^{-3}(2q),\\
\widetilde H_q
&=\frac{p^2}{2}\bigl(-4q(1+q^2)^{-3}\bigr)
=-\frac{2qp^2}{(1+q^2)^3}.
\end{aligned}
$$

[SYM4の正準Hamilton方程式](../SYM4/index.md#thm-sym4-existence-coordinate)を適用すると

$$
\dot q=\frac{p}{(1+q^2)^2},
\qquad
\dot p=\frac{2qp^2}{(1+q^2)^3}.
$$

元の方程式から $\dot q=\dot x=y/(1+x^2)$ です。$y=p/(1+q^2)$ を代入すれば第一式と一致します。第二式も積の微分から

$$
\begin{aligned}
\dot p
&=\frac{d}{dt}\bigl((1+x^2)y\bigr)\\
&=2x\dot x\,y+(1+x^2)\dot y\\
&=\frac{2xy^2}{1+x^2}\\
&=\frac{2qp^2}{(1+q^2)^3}
\end{aligned}
$$

と一致します。

**(5)**　元の座標で $X_y=(1+x^2)^{-1}\partial_x$ なので、[シンプレクティック多様体上のPoisson括弧](../SYM4/index.md#def-sym4-poisson-bracket)を $f=x$、$g=y$ に適用すると

$$
\{x,y\}=dx(X_y)=\frac1{1+x^2}.
$$

一方、[各点の近くでの正準Poisson括弧](#cor-sym5-local-poisson)をDarboux座標 $(q,p)$ で使うと

$$
\{q,p\}=q_qp_p-q_pp_q=1.
$$

ここで $x,y$ と $q,p$ は異なる関数の組です。Poisson括弧が座標不変であることは、どんな座標関数同士でも括弧が1になるという意味ではありません。
<!-- solution-end -->

## 8. 次章への橋

Darbouxの定理は、閉じた非退化2形式に**局所的な標準形**が存在することを証明しました。局所原始形式の構成、経路全体の非退化性、時刻1までの局所流の評価は、互いに別の役割を担っています。

次のSYM6では、こうして得た位置と運動量の座標を使い、2形式が消える部分空間や部分多様体の次元を調べます。そこでは零切断や閉1形式のグラフが基本例になります。SYM7では同じ経路法をコンパクト多様体上の大域的な変形問題へ拡張し、その際に必要になる完備性・コホモロジー条件を区別します。
