# CTM5 物質領域の質量保存から連続の式へ

[CTM4 の体積 Jacobian の発展式](../CTM4/index.md#prop-ctm4-volume-rate)では、動く微小領域の体積が増減する割合を計算した。だが、容器の水を引き伸ばして体積が増えたからといって、その中の**同じ水の質量**が増えるわけではない。体積と密度を一緒に追い、移動する領域の総質量を一定にする式が必要である。

これまでの [運動写像と現在配置](../CTM1/index.md#def-ctm1-motion-configuration)、[変形勾配と $J$](../CTM2/index.md#def-ctm2-deformation-gradient)、[物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)を組み合わせる。まず物質の塊を固定した基準領域で積分し、次に動く積分領域の時間微分を求め、最後に固定された観測領域を通過する質量流束と比較する。

## 0. 領域・滑らかさ・単位

$\Omega_0\subset\mathbb R^3$ は開集合、$0\in I\subset\mathbb R$ は開区間とする。[CTM1 の運動](../CTM1/index.md#def-ctm1-motion-configuration) $\chi:\Omega_0\times I\to\mathbb R^3$ は $C^2$ 級で、$\chi(X,0)=X$、各 $t$ で単射かつ $F=D_X\chi$ の $J=\det F>0$ を満たす。$\Omega_t=\chi_t(\Omega_0)$ とし、$x=\chi(X,t)$、$v(x,t)=\partial_t\chi(X,t)$ とする。$\chi_t$ の逆写像は局所的に滑らかで、単射性により $\Omega_t$ 上で一意に定まる。

積分する物質領域 $U_0\Subset\Omega_0$ は空でない有界な、境界が区分的 $C^1$ の領域とし、$U_t=\chi_t(U_0)$ とする。記号 $\Subset$ は閉包が $\Omega_0$ に含まれることを表す。積分する関数は対象領域の閉包の近くで $C^1$ 級とし、時間についても連続微分可能とする。これにより [RA7 の変数変換定理](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)と固定領域での積分・時間微分の交換を適用できる。

位置は m、時間は s、体積は m$^3$、速度は m/s、密度は kg/m$^3$、質量は kg、密度と速度の積は kg/(m$^2$ s) である。密度の時間微分は kg/(m$^3$ s) となる。以下では**質量の生成・消滅も境界からの物質交換もない通常の連続体**を扱い、境界を横切る流れがある固定領域とは区別する。

## 1. 同じ物質を追うと、体積と密度はどう釣り合うか

同じ物質点集合 $U_0$ は時間が進むと $U_t$ に変わる。一方、実験室の壁に固定した領域 $W$ は物質点の集まりではなく、流れが境界を横切りうる。はじめに密度が「どの座標での単位体積当たりの質量」かを区別する。

<a id="def-ctm5-mass-densities"></a>

<!-- formal-statement-start -->
### 定義（現在密度と基準密度）

上記の運動に対し、現在配置の正の連続な**質量密度**を $\rho(x,t)>0$ とする。時刻 $t=0$ の基準配置における密度を

$$
\rho_0(X):=\rho(X,0)
$$

と定める。現在の部分領域 $B\subset\Omega_t$ の質量は $\int_B\rho(x,t)\,dx$、基準部分領域 $A\subset\Omega_0$ の初期質量は $\int_A\rho_0(X)\,dX$ とする。両密度の単位は kg/m$^3$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm5-mass-densities -->
### **定義の確認**：一様な初期密度

一辺 $L$ m の立方体 $U_0=(0,L)^3$ で $\rho_0=\rho_*>0$ kg/m$^3$ なら、初期質量は

$$
\int_{U_0}\rho_0\,dX=\rho_*L^3.
$$

例えば $L=2\,\mathrm m$、$\rho_*=3\,\mathrm{kg/m^3}$ なら $3\times 2^3=24$ kg。密度だけでは質量にならず、体積を積分して初めて質量になる。
<!-- definition-example-end -->

この講義で保存するのは「ある場所にある質量」ではなく、「同じ材料を集めた塊の質量」である。これは運動方程式から証明する数学的恒等式ではなく、生成も消滅もない材料について採用する物理的な原理である。

<a id="principle-ctm5-material-mass"></a>

<!-- formal-statement-start -->
### 原理（物質領域における質量保存）

上記の $C^2$ 級運動 $\chi$ と正の $C^1$ 級密度 $\rho$ に対し、質量源・質量吸収がないと仮定する。このとき、任意の上記の物質領域 $U_0$ について、その像 $U_t$ の総質量は時間に依存せず、

$$
\frac{d}{dt}\int_{U_t}\rho(x,t)\,dx=0
$$

が成り立つとする。
<!-- formal-statement-end -->

物質境界は物質と一緒に動くので、境界を横切って**別の物質点が出入りする**ことはない。固定領域 $W$ に対して同じ式を無条件に書くのは誤りである。

## 2. 基準領域へ戻すと $\rho_0=J\rho$ が現れる

積分領域が動くままでは、毎時刻別の範囲を積分することになる。[RA7 の $C^1$ 変数変換公式](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)へ、写像 $\Phi=\chi_t$ と $g(x)=\rho(x,t)$ を代入する。各 $t$ で単射かつ $J>0$ なので絶対値は $|J|=J$ となり、

$$
\int_{U_t}\rho(x,t)\,dx
=\int_{U_0}\rho(\chi(X,t),t)J(X,t)\,dX
$$

を得る。左は現在体積、右は**初期配置の体積要素** $dX$ で測っている。密度の数値を単に $\rho(\chi,t)$ と移しただけでは体積倍率 $J$ を落とす。

<a id="prop-ctm5-density-jacobian"></a>

<!-- formal-statement-start -->
### 命題（質量保存と密度の Jacobian 関係）

第0節の運動・正の $C^1$ 級密度について、任意の物質領域 $U_0$ で [質量保存の原理](#principle-ctm5-material-mass) が成り立つなら、すべての $(X,t)\in\Omega_0\times I$ で

$$
\boxed{\rho(\chi(X,t),t)\,J(X,t)=\rho_0(X)}
$$

が成り立つ。逆にこの点ごとの恒等式が成り立てば、すべての上記の物質領域で総質量が保存される。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $U_0$ の初期質量と現在質量を同じ $dX$ で比べ、その差の積分が常にゼロになることから連続関数の値を局所的に決定する。逆向きは同じ変数変換を戻すだけである。

<!-- proof-start -->
### 証明

[変数変換公式](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)と保存原理から、任意の $U_0\Subset\Omega_0$ について

$$
\int_{U_0}\bigl[\rho(\chi(X,t),t)J(X,t)-\rho_0(X)\bigr]\,dX=0.
$$

角括弧内を $h_t(X)$ と置く。$h_t$ は連続である。ある点 $X_*$ において $h_t(X_*)>0$ と仮定すると、連続性により $X_*$ の十分小さい開球 $B\Subset\Omega_0$ 上で $h_t>0$ となる。この開球は許された $U_0$ であり、$\int_Bh_t\,dX>0$ は先の等式と矛盾する。$h_t(X_*)<0$ も同様に矛盾する。従って $h_t\equiv0$ である。

逆に $\rho(\chi,t)J=\rho_0$ が各点で成り立つなら

$$
\int_{U_t}\rho\,dx
=\int_{U_0}\rho(\chi,t)J\,dX
=\int_{U_0}\rho_0\,dX
$$

となり、右辺は $t$ に依存しない。
<!-- proof-end -->

この関係は密度の**押し出し**を表す。例えば $J=2$ で同じ物質の体積が局所的に2倍になれば、その物質点に対応する現在密度は $\rho_0/2$ になる。ただし異なる物質点同士の密度が一様になるとは述べていない。

## 3. 動く積分領域を時間微分する：Reynolds 輸送定理

質量以外の物理量でも、動く領域上の積分を時間微分したい。そこで、十分滑らかな任意のスカラー量 $f(x,t)$（単位は用途による）を扱う。$f$ を基準座標に引き戻すと、時間変化は二か所から来る。**同じ物質点での $f$ の変化**と、**体積倍率 $J$ の変化**である。

<a id="thm-ctm5-material-reynolds"></a>

<!-- formal-statement-start -->
### 定理（物質領域の Reynolds 輸送定理）

第0節の $C^2$ 級運動 $\chi$ に対し、$U_0\Subset\Omega_0$ を境界が区分的 $C^1$ の有界領域とする。$f(x,t)$ は動く領域の閉包の近くで $C^1$ 級とする。$U_t=\chi_t(U_0)$、$v(x,t)=\partial_t\chi(\chi_t^{-1}(x),t)$ と置くと

$$
\boxed{
\frac{d}{dt}\int_{U_t}f\,dx
=\int_{U_t}\left(D_tf+f\,\operatorname{div}_xv\right)\,dx
=\int_{U_t}\left(\partial_tf+\operatorname{div}_x(fv)\right)\,dx
}
$$

が成り立つ。ここで $D_tf=\partial_tf+v\cdot\nabla_xf$ は [物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)である。
<!-- formal-statement-end -->

### 証明の見取り図

[変数変換](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)で動く $U_t$ を固定した $U_0$ へ戻し、積 $f(\chi,t)J$ を微分する。前者の微分には連鎖律、後者には [CTM4 の $\dot J=J\operatorname{div}v$](../CTM4/index.md#prop-ctm4-volume-rate)を使い、最後に空間表示へ戻す。

<!-- proof-start -->
### 証明

まず $\chi_t$ は $C^1$ で単射、$\det D_X\chi_t=J>0$ だから [変数変換公式](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)により

$$
M_f(t):=\int_{U_t}f(x,t)\,dx
=\int_{U_0}f(\chi(X,t),t)J(X,t)\,dX.
$$

$U_0$ は有界で閉包が $\Omega_0$ に含まれ、被積分関数と時間微分は小さい閉時間区間上で連続なので、固定領域の積分と時間微分を交換できる。

$$
\frac{dM_f}{dt}
=\int_{U_0}
\left[
\frac{d}{dt}f(\chi(X,t),t)\,J
+f(\chi(X,t),t)\dot J
\right]dX.
$$

[CTM4 の物質軌道に沿う微分](../CTM4/index.md#prop-ctm4-velocity-deformation)で使った連鎖律を $f$ に適用し、$x=\chi(X,t)$ と置けば

$$
\frac{d}{dt}f(\chi(X,t),t)
=\partial_tf(x,t)+\sum_{i=1}^3v_i(x,t)\partial_{x_i}f(x,t)
=D_tf(x,t).
$$

[体積率公式](../CTM4/index.md#prop-ctm4-volume-rate)へこの $(X,t)$ を代入すると $\dot J=J\operatorname{div}_xv(x,t)$。従って

$$
\frac{dM_f}{dt}
=\int_{U_0}\left[D_tf(\chi,t)+f(\chi,t)\operatorname{div}_xv(\chi,t)\right]J\,dX.
$$

再び変数変換を適用して $U_t$ 上の積分に戻す。さらに成分ごとの積の微分則から

$$
\operatorname{div}_x(fv)
=\sum_i\partial_{x_i}(fv_i)
=v\cdot\nabla_xf+f\operatorname{div}_xv
$$

であり、$D_tf+f\operatorname{div}_xv=\partial_tf+\operatorname{div}_x(fv)$ が成立する。
<!-- proof-end -->

**意味を確かめる例。** $f=1$ とすれば $D_tf=0$ で、定理は

$$
\frac{d}{dt}|U_t|=\int_{U_t}\operatorname{div}v\,dx
$$

となる。[CTM4 の局所体積率](../CTM4/index.md#prop-ctm4-volume-rate)が**領域全体の体積率**になった。密度 $f=\rho$ なら同じ定理の左辺が質量変化率になる。

## 4. 連続の式：質量保存をどの点でも成り立つ式へ

質量に [Reynolds 輸送定理](#thm-ctm5-material-reynolds)を適用してみよう。原理の左辺はゼロだから、任意の物質領域で

$$
0=\int_{U_t}\bigl[D_t\rho+\rho\,\operatorname{div}v\bigr]\,dx.
$$

括弧内は連続であり、時刻 $t$ を固定すると小さい開球を $\Omega_t$ の任意の点に選べる。各球の逆像も許された物質領域になるので、[命題の局所化](#prop-ctm5-density-jacobian)と同じ正負の背理法により、括弧内は点ごとにゼロとなる。

この局所方程式は、[VC9 の質量保存の連続の式](../../../幾何系/VC/VC9/index.md#prop-vc9-continuity)を、物質領域の運動から構成し直したものである。既出の連続の式そのものを別名の独立定理にするのではなく、今回は**物質領域の原理・基準密度の関係・局所方程式が互いに同値**であることを示す。

<a id="thm-ctm5-mass-equivalence"></a>

<!-- formal-statement-start -->
### 定理（物質質量保存・密度変換・局所式の同値性）

第0節の $C^2$ 級運動、正の $C^1$ 級密度の下で、次の三条件は同値である。

1. 任意の許された $U_0$ に対し、$M_{U_0}(t)=\int_{U_t}\rho(x,t)\,dx$ は一定である。
2. すべての $(X,t)$ で $\rho(\chi(X,t),t)J(X,t)=\rho_0(X)$ である。
3. すべての $(x,t)$、$x\in\Omega_t$ で次の二つの等価な局所式が成り立つ。

$$
\boxed{\partial_t\rho+\operatorname{div}_x(\rho v)=0},
\qquad
\boxed{D_t\rho+\rho\,\operatorname{div}_xv=0}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

1 と 2 はすでに証明した。1 から 3 は輸送定理の局所化、3 から 2 は物質点ごとに $\rho(\chi,t)J$ を微分してゼロになることを使う。積の微分則で二種類の局所式を結ぶ。

<!-- proof-start -->
### 証明

1 $\Leftrightarrow$ 2 は [密度の Jacobian 関係](#prop-ctm5-density-jacobian)で証明済みである。1 $\Rightarrow$ 3 は直前の局所化で得た $D_t\rho+\rho\operatorname{div}v=0$ による。

3 の二式の等価性は [物質微分の定義](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)と積の微分則を成分ごとに適用して

$$
\begin{aligned}
D_t\rho+\rho\operatorname{div}v
&=\partial_t\rho+\sum_iv_i\partial_{x_i}\rho+\rho\sum_i\partial_{x_i}v_i\\
&=\partial_t\rho+\sum_i\partial_{x_i}(\rho v_i)
=\partial_t\rho+\operatorname{div}(\rho v)
\end{aligned}
$$

となることで分かる。

最後に 3 $\Rightarrow$ 2 を示す。各固定 $X$ について積を微分すると、[連鎖律による物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)と [CTM4 の体積率](../CTM4/index.md#prop-ctm4-volume-rate)から

$$
\begin{aligned}
\frac{d}{dt}\bigl[\rho(\chi(X,t),t)J(X,t)\bigr]
&=J D_t\rho(\chi(X,t),t)+\rho(\chi(X,t),t)\dot J\\
&=J\bigl[D_t\rho+\rho\operatorname{div}v\bigr](\chi(X,t),t)
=0.
\end{aligned}
$$

$I$ は連結な時間区間なので、この積は時刻に依らない。$t=0$ では $\chi(X,0)=X$、$F(X,0)=I_3$、$J(X,0)=1$ だから積は $\rho(X,0)=\rho_0(X)$ である。従って 2 が従う。
<!-- proof-end -->

この結果は**体積保存と密度保存を同一視してはいけない**理由も示す。$\operatorname{div}v=0$ なら $D_t\rho=0$ だが、$\rho$ が空間的に不均一なら $\partial_t\rho=-v\cdot\nabla\rho$ は必ずしもゼロでない。逆に $\rho$ が各物質点で一定でも、流れに質量の生成があれば連続の式を満たさない。

## 5. 固定検査体積では境界流束が残る

固定した容器の部分領域 $W$ は境界が動かない。内外を物質が通過するため、出入りの速さを測る必要がある。[VC9 の質量流束の定義](../../../幾何系/VC/VC9/index.md#def-vc9-mass-flux)による $j_m=\rho v$ は単位面積・単位時間当たりの質量移動（kg/(m$^2$s)）であり、外向き単位法線を $n$ とすると $j_m\cdot n>0$ が**流出**である。

<a id="cor-ctm5-fixed-control-volume"></a>

<!-- formal-statement-start -->
### 系（固定検査体積の質量収支）

[物質質量保存と局所式の同値性](#thm-ctm5-mass-equivalence)の仮定の下で、時間区間 $I_W\subset I$ の各時刻において閉包が $\Omega_t$ に含まれる、境界が区分的 $C^1$ の固定有界領域 $W$ を考える。このとき

$$
\boxed{
\frac{d}{dt}\int_W\rho(x,t)\,dx
=-\int_{\partial W}\rho(x,t)v(x,t)\cdot n\,dS
}
$$

が $t\in I_W$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左辺の領域は動かないため時間微分を積分の内側へ入れ、[連続の式](#thm-ctm5-mass-equivalence)で $\partial_t\rho$ を流束の発散へ変える。その後、[Gauss--Ostrogradsky の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を使う。マイナス符号は外向き流出が質量を減らすことを表す。

<!-- proof-start -->
### 証明

$W$ が固定で、$\rho$ と $\partial_t\rho$ は閉包で連続なので

$$
\frac{d}{dt}\int_W\rho\,dx=\int_W\partial_t\rho\,dx.
$$

[局所連続の式](#thm-ctm5-mass-equivalence)により $\partial_t\rho=-\operatorname{div}(\rho v)$ である。[VC4 の発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)へベクトル場 $\rho v$ と領域 $W$ を入力すると

$$
\int_W\operatorname{div}(\rho v)\,dx
=\int_{\partial W}\rho v\cdot n\,dS.
$$

したがって最初の等式へ代入し、主張を得る。
<!-- proof-end -->

| 対象領域 | 境界は動くか | 質量変化 |
| --- | --- | --- |
| 物質領域 $U_t=\chi_t(U_0)$ | 物質点と共に動く | $dM/dt=0$（源なし） |
| 固定検査体積 $W$ | 実験室に固定 | $dM/dt=-\int_{\partial W}\rho v\cdot n\,dS$ |

**単純な流出の符号。** 固定箱の右面で $v\cdot n>0$、左面からの流入がなければ正の流出量だけ箱の質量が減る。逆に負の流束（流入）が優勢なら質量は増える。この符号規約は CTM6 以降の応力の面積分とは別の物理量に対するものである。

## 6. 自分で密度を構成できる二つの運動

### 例1：一様伸長と質量の不変性

$s$ の逆数の単位を持つ定数 $a$ を取り、$\Omega_0=\mathbb R^3$、$\chi(X,t)=e^{at}X$、$\rho_0(X)=\rho_*>0$ とする。$\chi(X,0)=X$、$F=e^{at}I_3$ は可逆、$J=e^{3at}>0$、逆写像 $X=e^{-at}x$ があるので運動条件を満たす。[密度の Jacobian 関係](#prop-ctm5-density-jacobian)を使うと

$$
\rho(x,t)=\rho_*e^{-3at},\qquad v(x,t)=ax.
$$

$\operatorname{div}v=3a$、$\partial_t\rho=-3a\rho$、$\nabla\rho=0$ だから

$$
D_t\rho+\rho\operatorname{div}v=-3a\rho+3a\rho=0.
$$

一辺 $L$ の物質立方体は一辺 $e^{at}L$ となり、

$$
\int_{U_t}\rho\,dx=(\rho_*e^{-3at})(e^{at}L)^3=\rho_*L^3
$$

と質量は一定である。$a>0$ なら**体積増加・密度減少**、$a<0$ なら逆となる。

### 例2：体積保存でも、固定場所の密度は変わる

$\Omega_0=(-\ell,\ell)^3$、$\ell>0$、$0<\varepsilon<1$、$k$ は s$^{-1}$、$\rho_*>0$ とする。$t$ は任意の実数として

$$
\chi(X,t)=(X_1+ktX_2,X_2,X_3),
\qquad
\rho_0(X)=\rho_*\left(1+\varepsilon\frac{X_1}{\ell}\right).
$$

$\rho_0>\rho_*(1-\varepsilon)>0$、$F=\begin{pmatrix}1&kt&0\\0&1&0\\0&0&1\end{pmatrix}$、$J=1$、$X_1=x_1-ktx_2$ だから、現在領域 $\Omega_t$ 上では

$$
\rho(x,t)=\rho_*\left(1+\varepsilon\frac{x_1-ktx_2}{\ell}\right),
\qquad v=(kx_2,0,0).
$$

$\partial_t\rho=-\rho_*\varepsilon kx_2/\ell$、$\nabla\rho=(\rho_*\varepsilon/\ell,-\rho_*\varepsilon kt/\ell,0)$、$\operatorname{div}v=0$ となり、

$$
D_t\rho=\partial_t\rho+v\cdot\nabla\rho
=-\rho_*\varepsilon kx_2/\ell+(kx_2)(\rho_*\varepsilon/\ell)=0.
$$

ある固定位置の $\partial_t\rho$ は非零でも、粒子に沿う密度 $D_t\rho$ はゼロである。体積が一定なら「すべての固定位置で密度が一定」ではなく、「**個々の物質点の密度が一定**」になる。

---

## 7. 演習

各問で運動の可逆性と $J>0$ を確認し、密度が正になる領域と時刻を明示する。既出の式を使うときは、どの保存形式を適用したか示そう。

## Level A

### A1. 密度と質量の単位を確認する

一辺 $L>0$ m の基準立方体 $U_0=(0,L)^3$ で $\rho_0(X)=\rho_*(1+X_1/L)$、$\rho_*>0$ kg/m$^3$ とする。初期の総質量を求め、その単位を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$0<X_1<L$ だから $\rho_0\in(\rho_*,2\rho_*)$ で正である。[基準密度の定義](#def-ctm5-mass-densities)より

$$
\begin{aligned}
M_0
&=\int_0^L\int_0^L\int_0^L
\rho_*(1+X_1/L)\,dX_3\,dX_2\,dX_1\\
&=\rho_*L^2\left[X_1+\frac{X_1^2}{2L}\right]_0^L\\
&=\frac32\rho_*L^3.
\end{aligned}
$$

kg/m$^3$ と m$^3$ の積なので単位は kg である。
<!-- solution-end -->

### A2. 一方向の伸長で現在密度を求める

$\Omega_0=\mathbb R^3$、$\chi(X,t)=(e^{at}X_1,X_2,X_3)$、$a$ は s$^{-1}$ の定数、$\rho_0=\rho_*>0$ とする。$F,J,v,\rho$ を求め、$U_0=(0,L)^3$ の質量を直接計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t=0$ で恒等、$F=\operatorname{diag}(e^{at},1,1)$、$J=e^{at}>0$、逆写像 $X=(e^{-at}x_1,x_2,x_3)$ があり、全時刻で滑らかで単射である。$\partial_t\chi=(ae^{at}X_1,0,0)$ から $v=(ax_1,0,0)$。[密度変換](#prop-ctm5-density-jacobian)より

$$
\rho(x,t)=\frac{\rho_*}{J}=\rho_*e^{-at}.
$$

$U_t=(0,e^{at}L)\times(0,L)^2$ なので

$$
\int_{U_t}\rho\,dx=\rho_*e^{-at}\,(e^{at}L)L^2=\rho_*L^3.
$$

体積倍率 $e^{at}$ と密度倍率 $e^{-at}$ が相殺する。
<!-- solution-end -->

### A3. 積の微分則を成分で確認する

$v(x)=(ax_1,bx_2,0)$、$f(x)=x_1x_2$（$a,b$ は s$^{-1}$）について $D_tf$、$f\operatorname{div}v$、$\partial_tf+\operatorname{div}(fv)$ を求め、輸送定理の被積分関数の二形式が一致することを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\partial_tf=0$、$\nabla f=(x_2,x_1,0)$、$\operatorname{div}v=a+b$。よって [物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)から

$$
D_tf=(ax_1,bx_2,0)\cdot(x_2,x_1,0)=(a+b)x_1x_2.
$$

また $f\operatorname{div}v=(a+b)x_1x_2$。他方 $fv=(ax_1^2x_2,bx_1x_2^2,0)$ で

$$
\partial_tf+\operatorname{div}(fv)
=\partial_{x_1}(ax_1^2x_2)+\partial_{x_2}(bx_1x_2^2)
=2(a+b)x_1x_2.
$$

これは $D_tf+f\operatorname{div}v=2(a+b)x_1x_2$ に一致する。
<!-- solution-end -->

### A4. 密度が不均一な単純せん断

$\Omega_0=(-\ell,\ell)^3$、$\chi(X,t)=(X_1+ktX_2,X_2,X_3)$、$\rho_0(X)=\rho_*(1+\varepsilon X_1/\ell)$、$\rho_*>0$、$0<\varepsilon<1$ とする。$k$ の単位は s$^{-1}$。$J,\rho,v,\partial_t\rho,D_t\rho$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t=0$ で恒等、$F=\begin{pmatrix}1&kt&0\\0&1&0\\0&0&1\end{pmatrix}$ は可逆、$J=1>0$、逆は $X_1=x_1-ktx_2$、$X_2=x_2$、$X_3=x_3$。$\rho_0\ge\rho_*(1-\varepsilon)>0$ であり、現在領域上でも密度は正である。[密度変換](#prop-ctm5-density-jacobian)を代入して

$$
\rho(x,t)=\rho_*\left(1+\varepsilon\frac{x_1-ktx_2}{\ell}\right).
$$

また $v=(kx_2,0,0)$、$\partial_t\rho=-\rho_*\varepsilon kx_2/\ell$、$\partial_{x_1}\rho=\rho_*\varepsilon/\ell$ なので

$$
D_t\rho=\partial_t\rho+v_1\partial_{x_1}\rho
=-\rho_*\varepsilon kx_2/\ell+kx_2\,\rho_*\varepsilon/\ell=0.
$$

$\operatorname{div}v=0$ とも整合する。
<!-- solution-end -->

## Level B

### B1. 動く領域で質量以外の積分を微分する

$\chi(X,t)=(e^{at}X_1,e^{-at}X_2,X_3)$、$U_0=(0,L)^3$、$f(x,t)=x_1$ とする。$a$ は s$^{-1}$。$\int_{U_t}f\,dx$ を直接積分して微分し、[Reynolds 輸送定理](#thm-ctm5-material-reynolds)の右辺と一致することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$t=0$ は恒等、$F=\operatorname{diag}(e^{at},e^{-at},1)$、$J=1>0$、逆写像がある。$U_t=(0,e^{at}L)\times(0,e^{-at}L)\times(0,L)$ だから

$$
\int_{U_t}x_1\,dx
=\left[\frac{x_1^2}{2}\right]_0^{e^{at}L}\,(e^{-at}L)L
=\frac{L^4}{2}e^{at}.
$$

その微分は $aL^4e^{at}/2$。一方 $v=(ax_1,-ax_2,0)$、$\operatorname{div}v=a-a=0$、$D_tf=v\cdot\nabla x_1=ax_1$ なので、[輸送定理](#thm-ctm5-material-reynolds)の右辺は

$$
\int_{U_t}(D_tf+f\operatorname{div}v)\,dx
=\int_{U_t}ax_1\,dx
=\frac{aL^4}{2}e^{at}.
$$

二通りの計算が一致する。$J=1$ でも $f$ の積分は一定とは限らない。
<!-- solution-end -->

### B2. 局所式から初期密度の関係を再構成する

$\chi,\rho$ は第0節の仮定を満たし、$D_t\rho+\rho\operatorname{div}v=0$ とする。$G(X,t)=\rho(\chi(X,t),t)J(X,t)$ を導入して、$G$ が $t$ に依存しないことを出発点から示し、すべての物質領域で質量が保存されると結論せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$X$ 固定で連鎖律を適用すると

$$
\partial_t[\rho(\chi(X,t),t)]=\partial_t\rho(\chi,t)+v(\chi,t)\cdot\nabla\rho(\chi,t)=D_t\rho(\chi,t).
$$

[Jacobian の発展式](../CTM4/index.md#prop-ctm4-volume-rate)から $\dot J=J\operatorname{div}v(\chi,t)$。積の微分則によって

$$
\partial_t G
=J D_t\rho(\chi,t)+\rho(\chi,t)J\operatorname{div}v(\chi,t)
=J(D_t\rho+\rho\operatorname{div}v)(\chi,t)=0.
$$

$t=0$ で $G(X,0)=\rho(X,0)\det I_3=\rho_0(X)$。時間は連結な区間なので $G(X,t)=\rho_0(X)$。任意の $U_0$ に [変数変換](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)を適用し

$$
\int_{\chi_t(U_0)}\rho(x,t)\,dx=\int_{U_0}G(X,t)\,dX=\int_{U_0}\rho_0(X)\,dX
$$

となる。これは時間に依存しない質量である。
<!-- solution-end -->

### B3. 固定箱を通り抜ける不均一な密度

$\Omega_0=(-R,R)^3$、$0<L<R/4$、$\rho_0(X)=\rho_*(1+\varepsilon X_1/R)$（$0<\varepsilon<1$）、$\chi(X,t)=X+ut\,e_1$（$u>0$ m/s）を考える。固定箱 $W=(0,L)^3$ が $\Omega_t$ の内部に含まれる小さい時間区間で、箱内質量の時間変化率を直接求め、境界の質量流束からの計算と一致させよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$t=0$ で恒等、$F=I_3$、$J=1>0$ で、逆写像は $X=x-ut\,e_1$。初期密度は $\rho_*(1-\varepsilon)<\rho_0<\rho_*(1+\varepsilon)$ なので正であり、現在領域で

$$
\rho(x,t)=\rho_*\left(1+\varepsilon\frac{x_1-ut}{R}\right),
\qquad v=(u,0,0).
$$

[密度変換](#prop-ctm5-density-jacobian)と整合する。固定箱での積分は

$$
\begin{aligned}
M_W(t)
&=\rho_*L^2\int_0^L\left(1+\varepsilon\frac{x_1-ut}{R}\right)dx_1\\
&=\rho_*L^3\left(1+\varepsilon\frac{L/2-ut}{R}\right),
\end{aligned}
$$

従って $\dot M_W=-\rho_*\varepsilon uL^3/R$。右面の外向き法線は $e_1$、左面は $-e_1$ なので流束の総和は

$$
\int_{\partial W}\rho v\cdot n\,dS
=uL^2[\rho(L,x_2,x_3,t)-\rho(0,x_2,x_3,t)]
=\rho_*\varepsilon uL^3/R.
$$

他の4面は $v\cdot n=0$。[固定検査体積の収支](#cor-ctm5-fixed-control-volume)のマイナス符号と一致する。
<!-- solution-end -->

### B4. 発散ゼロだけでは保存則にならない

$\Omega_0=\mathbb R^3$、$\chi(X,t)=(X_1+ktX_2,X_2,X_3)$、$\rho(x,t)=\rho_*(1+bt)$（$\rho_*>0$、$k,b$ は s$^{-1}$）を $1+bt>0$ となる時刻で考える。$\operatorname{div}v=0$ だが物質領域の質量は保存されないことを示し、失われた仮定を指摘せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

運動は $t=0$ に恒等、$J=1$、逆 $X_1=x_1-ktx_2$ があり全時刻で可逆である。$v=(kx_2,0,0)$ の発散は0。密度は空間的に一定なので $\nabla\rho=0$、一方 $\partial_t\rho=b\rho_*$ だから

$$
D_t\rho+\rho\operatorname{div}v=b\rho_*.
$$

$b\ne0$ ならこれはゼロでなく、[局所質量保存の条件](#thm-ctm5-mass-equivalence)を破る。一辺 $L$ の任意の物質立方体では $J=1$ なので体積は $L^3$ のままであり、

$$
M(t)=\rho_*(1+bt)L^3,\qquad \dot M=b\rho_*L^3\ne0.
$$

失ったのは**物質質量が生成・消滅しないという原理**である。$\operatorname{div}v=0$ は体積率についての条件に過ぎず、保存則を仮定しなければ密度変化を禁止しない。
<!-- solution-end -->

## Level C

### C1. 伸長・せん断・並進と二種類の質量収支

$R>0$ m、$a,k$ は s$^{-1}$、$u$ は m/s、$\rho_*>0$ kg/m$^3$、$0<\varepsilon<1$ とする。$\Omega_0=(-R,R)^3$ 上の運動と初期密度を

$$
\chi(X,t)=
\begin{pmatrix}
e^{at}X_1+ktX_2+ut\\
e^{-at}X_2\\
X_3
\end{pmatrix},
\qquad
\rho_0(X)=\rho_*\left(1+\varepsilon\frac{X_2}{R}\right)
$$

とする。$0<L_i<R/4$ とし、固定箱 $W=(0,L_1)\times(0,L_2)\times(0,L_3)$ が $\Omega_t$ の内部に含まれる、$t=0$ の近くの時間区間で考える。

1. 運動条件、$F,J$ と逆写像を求めよ。
2. 空間速度 $v(x,t)$、$\operatorname{div}v$、現在密度 $\rho(x,t)$ を求め、局所連続の式を検算せよ。
3. $0<r<R$ とし、$U_0=(-r,r)^3$ の総質量が時刻に依らないことを計算せよ。
4. 固定箱 $W$ の質量 $M_W(t)$ とその時間微分を求め、$W$ の6面を通る流束を積分して符号まで照合せよ。
5. 「$\operatorname{div}v=0$ だから固定箱の質量は必ず一定」という主張の誤りを説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 運動。** $\chi(X,0)=X$、写像は $C^\infty$ 級である。微分すると

$$
F=
\begin{pmatrix}
e^{at}&kt&0\\
0&e^{-at}&0\\
0&0&1
\end{pmatrix},
\qquad
J=e^{at}e^{-at}=1>0.
$$

$x_2=e^{-at}X_2$ より $X_2=e^{at}x_2$、$x_3=X_3$、$x_1=e^{at}X_1+ktX_2+ut$ なので

$$
X_1=e^{-at}(x_1-kt e^{at}x_2-ut),\quad
X_2=e^{at}x_2,\quad X_3=x_3.
$$

よって各時刻で単射、逆写像も滑らかである。初期密度は $\rho_0>\rho_*(1-\varepsilon)>0$。

**2. 速度と密度。** $X$ 固定で微分すると

$$
\partial_t\chi=
(ae^{at}X_1+kX_2+u,\,-ae^{-at}X_2,\,0).
$$

上の逆写像を代入し、同じ種類の項をまとめると

$$
v(x,t)=
\begin{pmatrix}
ax_1+k(1-at)e^{at}x_2+(1-at)u\\
-ax_2\\
0
\end{pmatrix},
\quad
\nabla_xv=
\begin{pmatrix}
a&k(1-at)e^{at}&0\\
0&-a&0\\
0&0&0
\end{pmatrix}.
$$

従って $\operatorname{div}v=a-a=0$。[密度変換](#prop-ctm5-density-jacobian)では $J=1$ だから

$$
\rho(x,t)=\rho_*\left(1+\varepsilon\frac{e^{at}x_2}{R}\right).
$$

$\partial_t\rho=\rho_*\varepsilon ae^{at}x_2/R$、$\nabla\rho=(0,\rho_*\varepsilon e^{at}/R,0)$ なので

$$
v\cdot\nabla\rho=(-ax_2)\frac{\rho_*\varepsilon e^{at}}R
=-\partial_t\rho.
$$

よって $\partial_t\rho+\operatorname{div}(\rho v)=D_t\rho+\rho\operatorname{div}v=0$。

**3. 動く物質立方体。** [変数変換](../../../基礎科目/RA/RA7/index.md#thm-ra7-change-of-variables)で

$$
\int_{U_t}\rho\,dx
=\int_{U_0}\rho(\chi(X,t),t)J\,dX
=\rho_*\int_{(-r,r)^3}\left(1+\varepsilon X_2/R\right)dX.
$$

$X_2$ に関して対称な区間上の一次項は積分0、定数項の積分は $(2r)^3$ なので、総質量は $8\rho_*r^3$ で一定である。

**4. 固定箱と6面の流束。** 箱内で $\rho$ は $x_2$ だけに依存するので

$$
\begin{aligned}
M_W(t)&=\rho_*L_1L_3\int_0^{L_2}\left(1+\varepsilon e^{at}x_2/R\right)\,dx_2\\
&=\rho_*L_1L_3\left(L_2+\frac{\varepsilon e^{at}L_2^2}{2R}\right),\\
\dot M_W(t)&=\frac{\rho_*\varepsilon a e^{at}L_1L_3L_2^2}{2R}.
\end{aligned}
$$

まず $x_1=L_1$ と $x_1=0$ の法線はそれぞれ $e_1,-e_1$。$v_1(L_1,x_2,t)-v_1(0,x_2,t)=aL_1$ だから、二面の流束和は

$$
\Phi_1=\int_0^{L_2}\int_0^{L_3}\rho(x_2,t)\,[v_1(L_1,x_2,t)-v_1(0,x_2,t)]\,dx_3dx_2
=aM_W(t).
$$

次に $x_2=L_2$ と $x_2=0$ の法線は $e_2,-e_2$。$v_2=-ax_2$ は下側で0、上側で $-aL_2$ なので

$$
\Phi_2=-aL_1L_3L_2\,\rho_*\left(1+\varepsilon e^{at}L_2/R\right).
$$

$x_3$ の二面は $v_3=0$ だから $\Phi_3=0$。以上を加え、

$$
\begin{aligned}
\Phi_{\partial W}
&=a\rho_*L_1L_3\left(L_2+\frac{\varepsilon e^{at}L_2^2}{2R}\right)
-a\rho_*L_1L_3\left(L_2+\frac{\varepsilon e^{at}L_2^2}{R}\right)\\
&=-\frac{\rho_*\varepsilon a e^{at}L_1L_3L_2^2}{2R}
=-\dot M_W(t).
\end{aligned}
$$

[固定検査体積の系](#cor-ctm5-fixed-control-volume)と一致する。$k,u$ に依存する $v_1$ の共通項は向かい合う面で相殺した。

**5. 誤りの理由。** $\operatorname{div}v=0$ は同じ物質の局所体積保存、[連続の式](#thm-ctm5-mass-equivalence)から $D_t\rho=0$ を意味する。一方、箱は同じ物質点を追う領域ではない。$\rho$ が空間的に不均一なら、物質が入れ替わることで $\dot M_W$ は上のように非零になりうる。特に $a\ne0$ なら $0<\varepsilon<1$ の下で $\dot M_W\ne0$。
<!-- solution-end -->

---

物質領域では「密度 $\times$ 体積倍率」が初期密度に一致し、固定領域では外向きの流束が質量変化を決める。この二つの見方を切り替えられると、次の CTM6 で動く物質の切断面に働く**面積当たりの力**を導入するときにも、物質と幾何学的な面を混同せずに済む。
