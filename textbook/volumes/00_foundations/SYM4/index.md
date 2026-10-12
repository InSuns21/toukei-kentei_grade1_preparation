# SYM4 Hamiltonベクトル場・Poisson括弧・シンプレクティック流

[SYM2のシンプレクティック多様体](../SYM2/index.md#def-sym2-symplectic-manifold)は、閉じた非退化2形式 $\omega$ を備えています。[SYM3の余接束の正準形式](../SYM3/index.md#thm-sym3-cotangent-symplectic)では、その局所表示は $\sum_i dq^i\wedge dp_i$ でした。一方、[AMECH6のHamilton方程式とPoisson括弧](../AMECH6/index.md#def-amech6-poisson-bracket)は、座標 $(q,p)$ を使って定義されていました。

では球面やトーラスのように、全域で一組の正準座標を選べない多様体上では、Hamilton方程式や保存量をどう表すのでしょうか。必要なのは、**関数の微分を2形式によってベクトルへ戻す**ことです。点ごとの非退化性がこの操作を可能にし、閉性が流れによる形式の保存をもたらします。本章では先に符号を固定し、座標計算と座標を使わない証明を突き合わせます。

## 1. 関数から運動方向を決める

$(M,\omega)$ を $2n$ 次元滑らかなシンプレクティック多様体とし、関数は特に断らなければ実数値の滑らかな関数とします。[内部積の定義](../GEO7/index.md#def-geo7-interior-product)により、ベクトル $v\in T_xM$ を2形式に入れた $\iota_v\omega_x$ は余ベクトルです。非退化性とは、対応 $v\mapsto\iota_v\omega_x$ の核が零であることです。有限次元で定義域と値域は共に $2n$ 次元なので、この対応は線形同型です。

<a id="def-sym4-hamiltonian-vector-field"></a>

<!-- formal-statement-start -->
> **定義（Hamiltonベクトル場）**  
> $(M,\omega)$ をシンプレクティック多様体、$H\in C^\infty(M)$ とする。各 $x\in M$ で
>
$$
\iota_{X_H}\omega=dH,
\qquad
\omega_x(X_H(x),v)=dH_x(v)
\quad(v\in T_xM)
$$
>
> を満たすベクトル場 $X_H$ を $H$ の **Hamiltonベクトル場** という。この章では右辺を $+dH$ とする符号規約を採用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym4-hamiltonian-vector-field -->
### 直接例：一自由度の調和振動子

**定義の確認**：内部積と $dH$ の各係数を計算して定義式の成立を確認します。

$M=T^*\mathbb R$、$\omega=dq\wedge dp$、$H(q,p)=(q^2+p^2)/2$ とします。$X=a\partial_q+b\partial_p$ とおくと

$$
\iota_X(dq\wedge dp)=a\,dp-b\,dq,
\qquad
dH=q\,dq+p\,dp.
$$

独立な1形式 $dq,dp$ の係数を比較すると $-b=q$、$a=p$ です。従って

$$
X_H=p\,\partial_q-q\,\partial_p.
$$

ここで $X_H$ は単なる記号でなく、定義の等式を全方向で満たしています。特に $\dot q=p$、$\dot p=-q$ が得られ、符号を反対にすると時間が逆転することも分かります。
<!-- definition-example-end -->

<a id="thm-sym4-existence-coordinate"></a>

<!-- formal-statement-start -->
> **定理（Hamiltonベクトル場の存在・一意性と正準座標式）**  
> $(M,\omega)$ を滑らかなシンプレクティック多様体、$H\in C^\infty(M)$ とする。上の規約を満たす滑らかな $X_H$ は一意に存在する。特に $\omega=\sum_{i=1}^n dq^i\wedge dp_i$ となる局所座標では
>
$$
X_H=\sum_{i=1}^n
\left(
\frac{\partial H}{\partial p_i}\frac{\partial}{\partial q^i}
-\frac{\partial H}{\partial q^i}\frac{\partial}{\partial p_i}
\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

非退化な2形式の係数行列を反転して $dH$ の係数から $X_H$ の係数を得ます。次に座標表示で係数の符号を確かめます。ここで一般の点に標準座標が存在すると仮定する必要はありません（その存在は後のSYM5の主題です）。

<!-- proof-start -->
### 証明

任意の座標近傍で $\omega$ の係数行列を $\Omega(x)$ と書きます。滑らかで非退化だから $\det\Omega(x)\ne0$ です。[余因子行列の恒等式](../LA4/index.md#lem-la4-adjugate-identity)を適用すると

$$
\Omega(x)^{-1}
=\frac{\operatorname{adj}(\Omega(x))}{\det\Omega(x)}
$$

となります。分子の各成分は $\Omega(x)$ の成分の多項式で、分母は零にならない滑らかな関数なので、逆行列の各成分も滑らかです。写像

$$
\omega^\flat_x:T_xM\longrightarrow T_x^*M,
\qquad v\longmapsto\omega_x(v,\cdot)
$$

は各点で線形同型となり、局所表示の逆行列が滑らかに変化します。**係数の転置と符号**を明確にするため、$\omega_x(u,v)=u^{\mathsf T}\Omega(x)v$ とし、$u,v$ および $dH$ の係数を列ベクトルで表します。このとき余ベクトル $\omega^\flat_x(u)$ の係数は、任意の $v$ との組み合わせから

$$
\omega_x(u,v)
=u^{\mathsf T}\Omega(x)v
=\bigl(\Omega(x)^{\mathsf T}u\bigr)^{\mathsf T}v
$$

と決まります。従って、$\iota_{X_H}\omega=dH$ に対応する連立一次方程式は

$$
\Omega(x)^{\mathsf T}[X_H]_x=[dH]_x,
\qquad
[X_H]_x=\Omega(x)^{-\mathsf T}[dH]_x
$$

です。ここで逆転置行列も $\Omega^{-1}$ の転置として滑らかです。座標に依存しない形では

$$
X_H(x)=(\omega^\flat_x)^{-1}(dH_x)
$$

となります。各点で方程式の解は一意なので座標の重なりでも同じベクトルを与え、局所的に滑らかな解は滑らかな大域ベクトル場へ貼り合います。

正準形式を持つ局所座標で $X=\sum_i(a_i\partial_{q^i}+b_i\partial_{p_i})$ とおき、外積の評価を展開すると

$$
\begin{aligned}
(\iota_X\omega)(V)
&=\sum_i\bigl(dq^i(X)\,dp_i(V)-dp_i(X)\,dq^i(V)\bigr)\\
&=\left(\sum_i a_i\,dp_i-\sum_i b_i\,dq^i\right)(V).
\end{aligned}
$$

一方 $dH=\sum_i(H_{q^i}\,dq^i+H_{p_i}\,dp_i)$ なので、係数を比較して $a_i=H_{p_i}$、$b_i=-H_{q^i}$ を得ます。
<!-- proof-end -->

**非退化性が失われると何が壊れるか。** 例えば $\mathbb R^2$ 上で2形式を零とすると、$H(q,p)=q$ では $\iota_X\omega=0$ なのに $dH=dq\ne0$ であり、解となるベクトル場が存在しません。$H$ が定数なら任意の $X$ が条件を満たし、一意性も壊れます。非退化性はこの両方の問題を防ぎます。

## 2. 二つの関数の関係を測る

各関数からベクトル場を作れるようになれば、二つの関数 $f,g$ を比べるために $X_f$ と $X_g$ を2形式へ入力できます。これが[AMECH6の正準座標によるPoisson括弧](../AMECH6/index.md#def-amech6-poisson-bracket)を任意のシンプレクティック多様体へ拡張する方法です。

<a id="def-sym4-poisson-bracket"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック多様体上のPoisson括弧）**  
> $(M,\omega)$ をシンプレクティック多様体とし、$f,g\in C^\infty(M)$ とする。Poisson括弧を
>
$$
\{f,g\}:=\omega(X_f,X_g)
=d f(X_g)=-d g(X_f)
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym4-poisson-bracket -->
### 直接例：基本括弧と符号

**定義の確認**：二つのHamiltonベクトル場を2形式へ代入して括弧を評価します。

$T^*\mathbb R$ で $f=q$、$g=p$ とします。[Hamiltonベクトル場の座標式](#thm-sym4-existence-coordinate)から

$$
X_q=-\partial_p,\qquad X_p=\partial_q.
$$

従って

$$
\{q,p\}=\omega(-\partial_p,\partial_q)=1,
\qquad
\{p,q\}=-1.
$$

右辺の $df(X_g)$ を使っても $dq(\partial_q)=1$ です。これは[AMECH6の基本括弧](../AMECH6/index.md#prop-amech6-canonical-brackets)と同じ符号です。
<!-- definition-example-end -->

<a id="prop-sym4-coordinate-bracket"></a>

<!-- formal-statement-start -->
> **命題（正準座標のPoisson括弧）**  
> $\omega=\sum_i dq^i\wedge dp_i$ となる局所座標で、滑らかな $f,g$ の括弧は
>
$$
\{f,g\}=\sum_i
\left(f_{q^i}g_{p_i}-f_{p_i}g_{q^i}\right)
$$
>
> である。特に $\{q^i,p_j\}=\delta^i_j$、$\{q^i,q^j\}=\{p_i,p_j\}=0$。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ の微分を $X_g$ に作用させます。こうすれば負号の位置を成分ごとに検算できます。

<!-- proof-start -->
### 証明

[Hamiltonベクトル場の座標式](#thm-sym4-existence-coordinate)に $g$ を代入すると

$$
X_g=\sum_i(g_{p_i}\partial_{q^i}-g_{q^i}\partial_{p_i}).
$$

これを[括弧の定義](#def-sym4-poisson-bracket)の $df(X_g)$ に入れ、

$$
\begin{aligned}
\{f,g\}
&=df(X_g)\\
&=\sum_i\left(f_{q^i}\,dq^i(X_g)+f_{p_i}\,dp_i(X_g)\right)\\
&=\sum_i(f_{q^i}g_{p_i}-f_{p_i}g_{q^i}).
\end{aligned}
$$

$f=q^i$、$g=p_j$ とすれば一つの偏微分だけが残り $\delta^i_j$ です。二つとも位置座標、または運動量座標なら交差する偏微分が零になるので、残りも成立します。
<!-- proof-end -->

座標の式は計算に便利ですが、**括弧の定義自体は座標を必要としません**。次は軌道に沿う変化を座標に頼らずに調べます。

## 3. Hamilton流がシンプレクティック形式を保つ

[ODE8の流れの定義](../ODE8/index.md#def-ode8-flow)に従い、$X_H$ の局所流を $\Phi_t$ と書きます。一般の多様体が非コンパクトな場合、解は有限時刻で発散することがあります。従って $\Phi_t$ は最初から全 $t\in\mathbb R$ で定義されるとは仮定せず、初期点と時刻ごとの存在域で扱います。

<a id="thm-sym4-flow-preservation"></a>

<!-- formal-statement-start -->
> **定理（Hamilton流のシンプレクティック形式保存）**  
> $(M,\omega)$ を滑らかなシンプレクティック多様体、$H\in C^\infty(M)$ とする。$X_H$ の局所流 $\Phi_t$ は、定義される各開集合上で
>
$$
\Phi_t^*\omega=\omega
$$
>
> を満たす。従って $\Phi_t$ は定義域から像へのシンプレクティック微分同相である。
<!-- formal-statement-end -->

### 証明の見取り図

[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)へ $X_H$ と2形式 $\omega$ を代入します。Hamiltonベクトル場の定義と閉性で二項とも零になるので、流れに沿う引き戻しの時間微分が消えます。

<!-- proof-start -->
### 証明

[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)を $X_H$、2形式 $\omega$ に適用すると

$$
\begin{aligned}
\mathcal L_{X_H}\omega
&=d(\iota_{X_H}\omega)+\iota_{X_H}(d\omega)\\
&=d(dH)+\iota_{X_H}(0)\\
&=0.
\end{aligned}
$$

二行目では[Hamiltonベクトル場の定義](#def-sym4-hamiltonian-vector-field)と、[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)、[シンプレクティック形式の閉性](../SYM2/index.md#def-sym2-symplectic-manifold)をそれぞれ使いました。

次に、[Lie微分の流れによる定義](../GEO7/index.md#def-geo7-lie-derivative)を使います。各時刻の流れを共通して定義できる小さな開集合を選び、点 $x$ と接ベクトル $v,w\in T_xM$ に対して

$$
(\Phi_t^*\omega)_x(v,w)
=\omega_{\Phi_t(x)}(d\Phi_t|_xv,d\Phi_t|_xw)
$$

と評価します。[流れの合成則](../ODE8/index.md#prop-ode8-flow-law)で $\Phi_{t+h}=\Phi_h\circ\Phi_t$ と書き、この評価式を $h$ で微分して $h=0$ とすると

$$
\begin{aligned}
\frac{d}{dt}(\Phi_t^*\omega)
&=\Phi_t^*\left(
\left.\frac{d}{dh}\right|_{h=0}\Phi_h^*\omega
\right)\\
&=\Phi_t^*(\mathcal L_{X_H}\omega)\\
&=\Phi_t^*(0)=0.
\end{aligned}
$$

ここではまず流れが定義される範囲で微分し、その範囲内の任意の $t$ で零になると結論しています。$t=0$ では $\Phi_0=\mathrm{id}$ ですから、$\Phi_t^*\omega=\Phi_0^*\omega=\omega$ が従います。さらに[流れの合成則](../ODE8/index.md#prop-ode8-flow-law)による $\Phi_{-t}$ が像上の逆写像となります。従って各固定時刻の $\Phi_t$ は定義域から像への微分同相であり、[シンプレクティック微分同相の定義](../SYM2/index.md#def-sym2-symplectomorphism)を満たします。
<!-- proof-end -->

**閉性が必要な場所。** 非退化性だけなら $X_H$ は定義できますが、$d\omega\ne0$ なら上の計算に $\iota_{X_H}d\omega$ が残ります。一般には流れによる保存を結論できません。

<a id="prop-sym4-observable-evolution"></a>

<!-- formal-statement-start -->
> **命題（観測量の時間発展と保存量）**  
> 上と同じ条件で、軌道 $x(t)=\Phi_t(x_0)$ に沿い、時間に陽に依存しない $f\in C^\infty(M)$ は
>
$$
\frac{d}{dt}f(x(t))=\{f,H\}(x(t))
$$
>
> を満たす。特に $H$ は軌道に沿って一定であり、$f$ が全ての局所軌道で一定となることと $\{f,H\}=0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

連鎖律で $df(X_H)$ を作れば括弧の定義へ戻ります。同値性の逆向きでは各点から出る軌道を時刻0で微分します。

<!-- proof-start -->
### 証明

軌道の定義 $\dot x(t)=X_H(x(t))$ と[多様体上の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)を使うと

$$
\begin{aligned}
\frac{d}{dt}f(x(t))
&=df_{x(t)}(\dot x(t))\\
&=df_{x(t)}(X_H(x(t)))\\
&=\{f,H\}(x(t)).
\end{aligned}
$$

$\{H,H\}=\omega(X_H,X_H)=0$ は2形式の交代性によるので、$f=H$ とすれば $H$ が保存されます。$\{f,H\}=0$ なら各軌道の微分が零で一定です。逆に全軌道で一定なら任意の $x_0$ における時刻0の微分が零なので $\{f,H\}(x_0)=0$。$x_0$ は任意です。
<!-- proof-end -->

例えば調和振動子では $\dot q=p$、$\dot p=-q$ です。$H=(q^2+p^2)/2$ に対して $dH/dt=q p+p(-q)=0$ を直接確かめられます。

## 4. Poisson括弧の代数則とベクトル場の交換子

括弧の交代性や積の法則は定義から直ちに計算できます。しかし三つの関数を組み合わせる **Jacobi恒等式** は、流れが $\omega$ を保つことと深く結び付きます。

<a id="prop-sym4-poisson-elementary"></a>

<!-- formal-statement-start -->
> **命題（Poisson括弧の基本性質）**  
> $(M,\omega)$ 上の滑らかな $f,g,h$ と実数 $a,b$ に対して括弧は双線形、交代的であり、
>
$$
\{f,gh\}=g\{f,h\}+h\{f,g\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\omega^\flat$ の線形性、外積の交代性を使います。関数積の微分は $d(gh)=g\,dh+h\,dg$ と展開し、その各項へベクトル場を代入します。

<!-- proof-start -->
### 証明

$d(af+bg)=a\,df+b\,dg$ で、[Hamiltonベクトル場の存在一意性](#thm-sym4-existence-coordinate)から $X_{af+bg}=aX_f+bX_g$ です。[括弧の定義](#def-sym4-poisson-bracket)を使うと第一引数について

$$
\begin{aligned}
\{af+bg,h\}
&=\omega(aX_f+bX_g,X_h)\\
&=a\{f,h\}+b\{g,h\}
\end{aligned}
$$

となります。第二引数についても $X_{ag+bh}=aX_g+bX_h$ を適用し、$\{f,ag+bh\}=a\{f,g\}+b\{f,h\}$ です。交代性は $\omega(X_f,X_g)=-\omega(X_g,X_f)$ から従います。積については[括弧の定義](#def-sym4-poisson-bracket)の $df(X_g)$ と交代性を用い、

$$
\begin{aligned}
\{f,gh\}
&=-d(gh)(X_f)\\
&=-\bigl(g\,dh(X_f)+h\,dg(X_f)\bigr)\\
&=g\{f,h\}+h\{f,g\}.
\end{aligned}
$$
<!-- proof-end -->

<a id="prop-sym4-hamiltonian-commutator"></a>

<!-- formal-statement-start -->
> **命題（Hamiltonベクトル場の交換子）**  
> $(M,\omega)$ をシンプレクティック多様体とすると、滑らかな $f,g$ について
>
$$
[X_f,X_g]=-X_{\{f,g\}}.
$$
>
> 右辺の負号は $\iota_{X_f}\omega=df$ および $\{f,g\}=\omega(X_f,X_g)$ という規約による。
<!-- formal-statement-end -->

### 証明の見取り図

交換子を2形式へ入れ、Lie微分と内部積の交換関係を評価します。符号を追う鍵は $X_f(g)=\{g,f\}=-\{f,g\}$ です。

<!-- proof-start -->
### 証明

任意の滑らかなベクトル場 $Y,Z,V$ と2形式 $\omega$ について、[Lie微分の定義](../GEO7/index.md#def-geo7-lie-derivative)を1形式と2形式にそれぞれ適用します。まず

$$
\bigl(\mathcal L_Y(\iota_Z\omega)\bigr)(V)
=Y\bigl(\omega(Z,V)\bigr)-\omega(Z,[Y,V])
$$

です。一方、2形式のLie微分を $Z,V$ へ評価すると

$$
\begin{aligned}
(\mathcal L_Y\omega)(Z,V)
&=Y\bigl(\omega(Z,V)\bigr)\\
&\quad-\omega([Y,Z],V)-\omega(Z,[Y,V]).
\end{aligned}
$$

ここに $\omega([Y,Z],V)$ を足すと左辺と一致します。$V$ は任意なので、1形式として

$$
\mathcal L_Y(\iota_Z\omega)
=\iota_{[Y,Z]}\omega+\iota_Z(\mathcal L_Y\omega)
$$

が成立します。

これを $Y=X_f$、$Z=X_g$ として使います。[流れ保存の証明](#thm-sym4-flow-preservation)で示した $\mathcal L_{X_f}\omega=0$ と $\iota_{X_g}\omega=dg$ から

$$
\begin{aligned}
\iota_{[X_f,X_g]}\omega
&=\mathcal L_{X_f}(dg)-\iota_{X_g}(\mathcal L_{X_f}\omega)\\
&=\mathcal L_{X_f}(dg)\\
&=d(X_f(g))\\
&=d\{g,f\}=-d\{f,g\}.
\end{aligned}
$$

三行目では[Cartanの公式](../GEO7/index.md#thm-geo7-cartan-formula)に $dg$ を入れて $\mathcal L_{X_f}dg=d(\iota_{X_f}dg)+\iota_{X_f}d^2g$ としています。非退化性による[一意性](#thm-sym4-existence-coordinate)から主張が従います。
<!-- proof-end -->

<a id="thm-sym4-jacobi"></a>

<!-- formal-statement-start -->
> **定理（Poisson括弧のJacobi恒等式）**  
> $(M,\omega)$ をシンプレクティック多様体、$f,g,h\in C^\infty(M)$ とする。このとき
>
$$
\{\{f,g\},h\}
+\{\{g,h\},f\}
+\{\{h,f\},g\}=0.
$$
>
> したがって滑らかな関数全体は、この括弧に関してLie代数を成す。
<!-- formal-statement-end -->

### 証明の見取り図

$X_h$ が $\omega(X_f,X_g)$ を微分する際、2形式のLie微分と二つのベクトル場の交換子の三項へ分けます。最初の項は保存性で零になり、残りの交換子は直前の命題で括弧へ戻せます。

<!-- proof-start -->
### 証明

Lie微分の2形式への作用を、ベクトル場 $X_f,X_g$ で評価します。

$$
\begin{aligned}
X_h(\omega(X_f,X_g))
&=(\mathcal L_{X_h}\omega)(X_f,X_g)\\
&\quad+\omega([X_h,X_f],X_g)
+\omega(X_f,[X_h,X_g]).
\end{aligned}
$$

[流れ保存の証明](#thm-sym4-flow-preservation)より第一項は零です。また[交換子の命題](#prop-sym4-hamiltonian-commutator)を二つの交換子に代入して

$$
\begin{aligned}
X_h\{f,g\}
&=-\omega(X_{\{h,f\}},X_g)
  -\omega(X_f,X_{\{h,g\}})\\
&=-\{\{h,f\},g\}-\{f,\{h,g\}\}.
\end{aligned}
$$

[括弧の定義](#def-sym4-poisson-bracket)より、任意の滑らかな関数 $F$ について $X_h(F)=dF(X_h)=\{F,h\}$ です。これを $F=\{f,g\}$ に適用すると

$$
X_h\{f,g\}=\{\{f,g\},h\}.
$$

他方、[交代性](#prop-sym4-poisson-elementary)を内側・外側の順に使うと

$$
\begin{aligned}
-\{f,\{h,g\}\}
&=+\{\{h,g\},f\}\\
&=-\{\{g,h\},f\}.
\end{aligned}
$$

従って先ほどの等式に代入した後、項を左辺に移して

$$
\begin{aligned}
\{\{f,g\},h\}
&=-\{\{h,f\},g\}-\{\{g,h\},f\},\\
\{\{f,g\},h\}
&+\{\{g,h\},f\}+\{\{h,f\},g\}=0
\end{aligned}
$$

を得ます。双線形性・交代性は[基本性質](#prop-sym4-poisson-elementary)で証明済みなので、Lie代数の公理が揃います。
<!-- proof-end -->

## 5. 座標変換に依存しないことの確かめ方

[SYM3の余接持ち上げ](../SYM3/index.md#thm-sym3-cotangent-lift-preserves)もシンプレクティック微分同相です。その上でHamiltonベクトル場とPoisson括弧がどのように対応するかを確かめましょう。座標を変えるたびに括弧の定義を作り直す必要はありません。

<a id="thm-sym4-poisson-naturality"></a>

<!-- formal-statement-start -->
> **定理（シンプレクティック微分同相の下での自然性）**  
> $(M,\omega_M)$、$(N,\omega_N)$ をシンプレクティック多様体とし、$\Psi:M\to N$ を $\Psi^*\omega_N=\omega_M$ を満たす微分同相とする。$f,g\in C^\infty(N)$ に対して
>
$$
d\Psi_x\bigl(X_{f\circ\Psi}(x)\bigr)
=X_f(\Psi(x)),
$$
$$
\{f\circ\Psi,g\circ\Psi\}_M
=\{f,g\}_N\circ\Psi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初の等式は $d\Psi$ で運んだベクトルを2形式に入れて証明し、二番目は括弧の定義を用いるだけです。

<!-- proof-start -->
### 証明

$x\in M$、$y=\Psi(x)$、$V\in T_xM$ とします。$d\Psi_x$ は同型なので $W=d\Psi_xV$ は任意の $T_yN$ のベクトルを動きます。$Y=d\Psi_x(X_{f\circ\Psi}(x))$ とおけば、[引き戻しによる形式保存](../SYM2/index.md#def-sym2-symplectomorphism)と[微分の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)により

$$
\begin{aligned}
\omega_N(Y,W)
&=\omega_M(X_{f\circ\Psi}(x),V)\\
&=d(f\circ\Psi)_x(V)\\
&=df_y(d\Psi_xV)=df_y(W).
\end{aligned}
$$

[Hamiltonベクトル場の一意性](#thm-sym4-existence-coordinate)を点 $y$ で使うと、任意の $W$ について $\omega_N(Y,W)=df_y(W)$ を満たす $Y$ は $X_f(y)$ しかありません。従って

$$
d\Psi_x\bigl(X_{f\circ\Psi}(x)\bigr)=X_f(y)
$$

です。同じ議論を関数 $g$ にも適用し、両側のベクトルを点ごとに評価すると

$$
\begin{aligned}
\{f\circ\Psi,g\circ\Psi\}_M(x)
&=\omega_{M,x}\bigl(X_{f\circ\Psi}(x),X_{g\circ\Psi}(x)\bigr)\\
&=\omega_{N,y}\bigl(d\Psi_xX_{f\circ\Psi}(x),d\Psi_xX_{g\circ\Psi}(x)\bigr)\\
&=\omega_{N,y}\bigl(X_f(y),X_g(y)\bigr)\\
&=\{f,g\}_N(y)
=\bigl(\{f,g\}_N\circ\Psi\bigr)(x).
\end{aligned}
$$

中段では[シンプレクティック微分同相の引き戻し条件](../SYM2/index.md#def-sym2-symplectomorphism)を点 $x$ で使いました。$x$ が任意なので関数としての等式が成立します。
<!-- proof-end -->

**座標変換の検算。** $\Psi(q,p)=(Q,P)=(2q,p/2)$ は[SYM3の余接持ち上げ保存定理](../SYM3/index.md#thm-sym3-cotangent-lift-preserves)を満たします。行き先の関数 $f(Q,P)=Q^2$、$g(Q,P)=P$ について

$$
\{f,g\}_N=2Q,
$$
$$
\begin{aligned}
\{f\circ\Psi,g\circ\Psi\}_M
&=\{4q^2,p/2\}_M\\
&=(8q)(1/2)=4q\\
&=(2Q)\circ\Psi
\end{aligned}
$$

となり、両側が一致します。

<a id="ref-sym4-harmonic-flow"></a>

## 6. 局所流と大域流の違いを例で見る

調和振動子では[Hamiltonベクトル場の例](#def-sym4-hamiltonian-vector-field)から $\dot q=p$、$\dot p=-q$。初期条件 $(q_0,p_0)$ を用いて

$$
q(t)=q_0\cos t+p_0\sin t,
\qquad
p(t)=p_0\cos t-q_0\sin t.
$$

微分すると

$$
\begin{aligned}
\dot q(t)&=-q_0\sin t+p_0\cos t=p(t),\\
\dot p(t)&=-p_0\sin t-q_0\cos t=-q(t)
\end{aligned}
$$

となり、初期値も満たします。全ての実数 $t$ で定義できるため、これは大域流です。時刻 $t$ の写像を初期値 $(q_0,p_0)$ の関数として微分すると

$$
D\Phi_t=
\begin{pmatrix}
\cos t&\sin t\\
-\sin t&\cos t
\end{pmatrix},
\qquad
\det D\Phi_t=\cos^2t+\sin^2t=1.
$$

引き戻しを実際に展開すると

$$
\begin{aligned}
d(q(t))\wedge d(p(t))
&=(\cos t\,dq_0+\sin t\,dp_0)\\
&\quad\wedge(-\sin t\,dq_0+\cos t\,dp_0)\\
&=(\cos^2t+\sin^2t)\,dq_0\wedge dp_0\\
&=dq_0\wedge dp_0.
\end{aligned}
$$

従って[Hamilton流の形式保存定理](#thm-sym4-flow-preservation)も、この例では行列計算で確かめられます。

対して $T^*\mathbb R$ 上で $H(q,p)=q^2p$ とすると、[正準座標式](#thm-sym4-existence-coordinate)より

$$
\dot q=q^2,\qquad\dot p=-2qp.
$$

初期値 $q(0)=q_0>0$ とすると、$1/q$ の導関数は $-1$ なので

$$
\frac1{q(t)}=\frac1{q_0}-t,
\qquad
q(t)=\frac{q_0}{1-q_0t}.
$$

運動量成分も推測で決めずに導きます。[観測量の時間発展・保存量命題](#prop-sym4-observable-evolution)では $H$ が軌道上で一定です。従って、先に得た $q(t)$ に対して

$$
\begin{aligned}
q(t)^2p(t)&=H(q(t),p(t))=H(q_0,p_0)=q_0^2p_0,\\
p(t)&=\frac{q_0^2p_0}{q(t)^2}
=p_0(1-q_0t)^2.
\end{aligned}
$$

ここで $q_0>0$ かつ $t<1/q_0$ なので $q(t)\ne0$ として割れます。さらに元の方程式へ代入すると

$$
\begin{aligned}
\dot p(t)&=-2q_0p_0(1-q_0t),\\
-2q(t)p(t)&=-2\frac{q_0}{1-q_0t}\,p_0(1-q_0t)^2\\
&=-2q_0p_0(1-q_0t),
\end{aligned}
$$

と一致します。時刻 $t=1/q_0$ で $q(t)$ が発散します。したがって[形式保存定理](#thm-sym4-flow-preservation)は成立しても、任意の初期点で全実数時刻にわたる流れがあるとは限りません。保存性と完備性は別の条件です。

## 7. 演習：符号・保存・交換子・座標不変性

### Level A：定義を手で計算する

#### A1. 一自由度のHamiltonベクトル場

$T^*\mathbb R$、$\omega=dq\wedge dp$、$H(q,p)=p^2/2+3q^2/2$ とする。$X_H$ と $\dot q,\dot p$ を求め、$\iota_{X_H}\omega=dH$ を直接確認せよ。

- Level: A
- ID: SYM4-A1

<!-- solution-start -->
**詳細解答**　$H_p=p$、$H_q=3q$ ですから[座標式](#thm-sym4-existence-coordinate)より

$$
X_H=p\partial_q-3q\partial_p,\qquad \dot q=p,\quad \dot p=-3q.
$$

内部積を評価して

$$
\iota_{X_H}(dq\wedge dp)=p\,dp+3q\,dq=dH.
$$

右辺の $+3q\,dq$ は $-b\,dq$ の符号反転から出ます。
<!-- solution-end -->

#### A2. 基本Poisson括弧

$T^*\mathbb R$ で $f=q^2p$、$g=p^2$ とする。$\{f,g\}$ と $\{g,f\}$ を計算せよ。

- Level: A
- ID: SYM4-A2

<!-- solution-start -->
**詳細解答**　$f_q=2qp$、$f_p=q^2$、$g_q=0$、$g_p=2p$ として[括弧の座標式](#prop-sym4-coordinate-bracket)へ代入し、

$$
\{f,g\}=(2qp)(2p)-q^2(0)=4qp^2.
$$

交換して計算すれば

$$
\{g,f\}=0\cdot q^2-(2p)(2qp)=-4qp^2.
$$

従って交代性と一致します。
<!-- solution-end -->

#### A3. エネルギーの保存

$H=(q^2+p^2)/2$ の軌道上で $dH/dt=0$ をHamilton方程式とPoisson括弧の両方から示せ。

- Level: A
- ID: SYM4-A3

<!-- solution-start -->
**詳細解答**　[座標式](#thm-sym4-existence-coordinate)から $\dot q=p,\dot p=-q$。連鎖律で

$$
\frac{dH}{dt}=q\dot q+p\dot p=qp-pq=0.
$$

他方、[時間発展命題](#prop-sym4-observable-evolution)より $dH/dt=\{H,H\}$ であり、[交代性](#prop-sym4-poisson-elementary)から $\{H,H\}=0$ です。二つの計算は同じ保存則を表します。
<!-- solution-end -->

#### A4. Hamiltonベクトル場の線形性

任意の滑らかな $f,g$ と定数 $a,b$ で $X_{af+bg}=aX_f+bX_g$ を定義から示せ。

- Level: A
- ID: SYM4-A4

<!-- solution-start -->
**詳細解答**　内部積と微分の線形性から

$$
\begin{aligned}
\iota_{aX_f+bX_g}\omega
&=a\,\iota_{X_f}\omega+b\,\iota_{X_g}\omega\\
&=a\,df+b\,dg=d(af+bg).
\end{aligned}
$$

[一意性](#thm-sym4-existence-coordinate)により、このベクトル場は $X_{af+bg}$ に一致します。
<!-- solution-end -->

#### A5. 積の法則の再導出

$M=T^*\mathbb R$、$f=q$、$g=p$、$h=q^2$ で $\{f,gh\}=g\{f,h\}+h\{f,g\}$ を両辺別々に計算して確認せよ。

- Level: A
- ID: SYM4-A5

<!-- solution-start -->
**詳細解答**　$gh=pq^2$ です。左辺は[座標式](#prop-sym4-coordinate-bracket)より

$$
\{q,pq^2\}=1\cdot q^2-0\cdot(2pq)=q^2.
$$

右辺では $\{q,q^2\}=0$、$\{q,p\}=1$ なので

$$
p\{q,q^2\}+q^2\{q,p\}=p\cdot0+q^2\cdot1=q^2.
$$

一致します。
<!-- solution-end -->

### Level B：全ての仮定と符号を使う

#### B1. 非線形Hamilton流の時間域

$H(q,p)=q^2p$、$q(0)=1$、$p(0)=2$ とする。軌道を求め、正の時間での最大存在区間の右端と $H$ の保存を検算せよ。

- Level: B
- ID: SYM4-B1

<!-- solution-start -->
**詳細解答**　[座標式](#thm-sym4-existence-coordinate)で $\dot q=q^2$、$\dot p=-2qp$。まず $d(1/q)/dt=-1$ なので

$$
q(t)=\frac1{1-t}.
$$

次に、[Hamilton関数の保存命題](#prop-sym4-observable-evolution)より $q(t)^2p(t)=q(0)^2p(0)=2$ です。$q(t)=1/(1-t)$ は $t<1$ で零でないから

$$
p(t)=\frac{2}{q(t)^2}=2(1-t)^2.
$$

運動方程式に戻して

$$
\begin{aligned}
\dot p(t)&=-4(1-t),\\
-2q(t)p(t)&=-2\frac1{1-t}\,2(1-t)^2=-4(1-t)
\end{aligned}
$$

を確認します。初期値も満たすので、[初期値問題の一意性](../ODE8/index.md#def-ode8-maximal-solution)から求める軌道です。$t<1$ で定義され、$t\uparrow1$ で $q(t)\to+\infty$ だから $t=1$ より先へ滑らかに延長できません。また

$$
H(q(t),p(t))
=\frac1{(1-t)^2}\,2(1-t)^2=2
$$

であり、[エネルギー保存](#prop-sym4-observable-evolution)と整合します。
<!-- solution-end -->

#### B2. 交換子の負号

$f=q^2/2$、$g=p^2/2$ について $[X_f,X_g]$ と $-X_{\{f,g\}}$ を別々に求めよ。

- Level: B
- ID: SYM4-B2

<!-- solution-start -->
**詳細解答**　[座標式](#thm-sym4-existence-coordinate)から $X_f=-q\partial_p$、$X_g=p\partial_q$ です。ベクトル場の交換子の $\partial_q$ 成分は

$$
X_f(p)-X_g(0)=-q.
$$

$\partial_p$ 成分は

$$
X_f(0)-X_g(-q)=p.
$$

従って $[X_f,X_g]=-q\partial_q+p\partial_p$ です。一方[括弧の座標式](#prop-sym4-coordinate-bracket)から $\{f,g\}=qp$、そのベクトル場は

$$
X_{qp}=q\partial_q-p\partial_p.
$$

負号を付ければ一致し、[交換子命題](#prop-sym4-hamiltonian-commutator)を直接検算しました。
<!-- solution-end -->

#### B3. 保存量はHamilton流に沿って不変か

$T^*\mathbb R^2$ 上で $H=(p_1^2+p_2^2)/2$、$L=q^1p_2-q^2p_1$ とする。$\{L,H\}=0$ を偏微分で示し、$L$ が全軌道で一定と結論せよ。

- Level: B
- ID: SYM4-B3

<!-- solution-start -->
**詳細解答**　$L_{q^1}=p_2$、$L_{q^2}=-p_1$、$L_{p_1}=-q^2$、$L_{p_2}=q^1$ です。一方 $H_{q^i}=0$、$H_{p_i}=p_i$ なので

$$
\begin{aligned}
\{L,H\}
&=(p_2p_1-(-q^2)0)+((-p_1)p_2-q^1 0)\\
&=p_1p_2-p_1p_2=0.
\end{aligned}
$$

[時間発展命題](#prop-sym4-observable-evolution)により $dL/dt=\{L,H\}=0$。よって各軌道で $L$ は一定です。
<!-- solution-end -->

#### B4. Jacobi恒等式の非自明な検算

$f=q^2$、$g=p^2$、$h=qp$ とする。Jacobi恒等式の三項をそれぞれ計算せよ。

- Level: B
- ID: SYM4-B4

<!-- solution-start -->
**詳細解答**　[Poisson括弧の正準座標式](#prop-sym4-coordinate-bracket)へ使う偏微分をまず列挙します。

$$
\begin{aligned}
(f_q,f_p)&=(2q,0),&
(g_q,g_p)&=(0,2p),&
(h_q,h_p)&=(p,q).
\end{aligned}
$$

従って第一段階の括弧は

$$
\begin{aligned}
\{f,g\}&=(2q)(2p)-0=4qp,\\
\{g,h\}&=0\cdot q-(2p)p=-2p^2,\\
\{h,f\}&=p\cdot0-q(2q)=-2q^2.
\end{aligned}
$$

さらに

$$
\begin{aligned}
\{\{f,g\},h\}
&=\{4qp,qp\}=4p\,q-4q\,p=0,\\
\{\{g,h\},f\}
&=\{-2p^2,q^2\}=0-(-4p)(2q)=8pq,\\
\{\{h,f\},g\}
&=\{-2q^2,p^2\}=(-4q)(2p)-0=-8qp.
\end{aligned}
$$

三項の和は零で、[Jacobi恒等式](#thm-sym4-jacobi)と一致します。
<!-- solution-end -->

### Level C：力学と正準変換を結び直す

#### C1. 調和振動子のシンプレクティック座標変換

$T^*\mathbb R$ に $\omega=dq\wedge dp$、$H(q,p)=(q^2+p^2)/2$ を置く。$a\ne0$ として $\Psi(q,p)=(Q,P)=(aq,p/a)$ と定義する。

1. $\Psi$ がシンプレクティック微分同相であることを引き戻しで示せ。
2. 行き先のHamilton関数 $\widetilde H(Q,P)=H\circ\Psi^{-1}$ を求め、$\Psi_*X_H=X_{\widetilde H}$ を両辺の成分を出して示せ。
3. $F(Q,P)=Q^2$、$G(Q,P)=P$ に対するPoisson括弧の自然性を偏微分で検算せよ。
4. 元の軌道 $(q(t),p(t))$ の式から $\widetilde H$ が保存することを直接確かめよ。

- Level: C
- ID: SYM4-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$\Psi^{-1}(Q,P)=(Q/a,aP)$ で、$a\ne0$ なので滑らかな逆を持ちます。また

$$
\Psi^*(dQ\wedge dP)
=d(aq)\wedge d(p/a)
=a\,dq\wedge(1/a)\,dp
=dq\wedge dp.
$$

従って[シンプレクティック微分同相の定義](../SYM2/index.md#def-sym2-symplectomorphism)を満たします。

**(2)**　逆写像を $H$ に代入し、

$$
\widetilde H(Q,P)
=\frac12\left(\frac{Q^2}{a^2}+a^2P^2\right).
$$

元の[Hamiltonベクトル場の座標式](#thm-sym4-existence-coordinate)で $X_H=p\partial_q-q\partial_p$ です。$\Psi$ のJacobianを位置・運動量の順で書くと

$$
D\Psi=
\begin{pmatrix}
\partial_qQ&\partial_pQ\\
\partial_qP&\partial_pP
\end{pmatrix}
=
\begin{pmatrix}a&0\\0&1/a\end{pmatrix}.
$$

従って $d\Psi(\partial_q)=a\partial_Q$、$d\Psi(\partial_p)=(1/a)\partial_P$ です。これらを $X_H$ の二項に代入すると

$$
\begin{aligned}
d\Psi(X_H)
&=ap\,\partial_Q-\frac qa\,\partial_P\\
&=a^2P\,\partial_Q-\frac{Q}{a^2}\,\partial_P.
\end{aligned}
$$

一方、$\widetilde H_P=a^2P$、$\widetilde H_Q=Q/a^2$ なので

$$
X_{\widetilde H}
=a^2P\,\partial_Q-\frac{Q}{a^2}\,\partial_P.
$$

よって各点で $d\Psi(X_H)=X_{\widetilde H}\circ\Psi$ です。これは[自然性定理](#thm-sym4-poisson-naturality)のベクトル場の等式の具体例です。

**(3)**　行き先では $F_Q=2Q$、$F_P=0$、$G_Q=0$、$G_P=1$ なので

$$
\{F,G\}_N=2Q.
$$

元の座標で $F\circ\Psi=a^2q^2$、$G\circ\Psi=p/a$ だから

$$
\begin{aligned}
\{F\circ\Psi,G\circ\Psi\}_M
&=(2a^2q)(1/a)-0\\
&=2aq=(2Q)\circ\Psi.
\end{aligned}
$$

[Poisson括弧の自然性](#thm-sym4-poisson-naturality)を計算でも確認しました。

**(4)**　初期値 $(q_0,p_0)$ の[調和振動子の解](#ref-sym4-harmonic-flow)は

$$
q(t)=q_0\cos t+p_0\sin t,\qquad
p(t)=p_0\cos t-q_0\sin t.
$$

$Q=aq$、$P=p/a$ を $\widetilde H$ へ代入すると

$$
\widetilde H(Q(t),P(t))
=\frac12(q(t)^2+p(t)^2).
$$

ここで二乗和を展開すれば

$$
\begin{aligned}
q(t)^2+p(t)^2
&=(q_0^2+p_0^2)(\cos^2t+\sin^2t)\\
&\quad+2q_0p_0\sin t\cos t-2q_0p_0\sin t\cos t\\
&=q_0^2+p_0^2.
\end{aligned}
$$

従って $\widetilde H$ は時刻に依存せず、保存されます。
<!-- solution-end -->

## 8. 次章への橋

Hamiltonベクトル場は非退化性だけで存在しますが、その流れがシンプレクティック形式を保つ証明には閉性が必要でした。Poisson括弧のJacobi恒等式も、同じ閉性から導いた保存性と交換子を利用して得られます。座標を選んだ計算は、常に形式の定義へ戻せます。

ここまでは「標準座標が既にある場所」での公式を使いました。次のSYM5では逆に、**あらゆるシンプレクティック形式が各点の近くで標準形へ変換できるのか**を問います。これがDarbouxの定理の中心です。
