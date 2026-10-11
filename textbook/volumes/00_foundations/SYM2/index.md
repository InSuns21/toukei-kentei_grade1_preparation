# SYM2 シンプレクティック多様体と基本例

[SYM1の線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)によって、有限次元実ベクトル空間の非退化交代形式は、適切な基底で位置と運動量の対として表せました。しかし多様体には一つの固定されたベクトル空間があるのではなく、点ごとに異なる接空間があります。各接空間に交代形式を置くだけでは、その形式が点から点へどう変わるかがまだ分かりません。

そこで、[GEO7の微分形式](../GEO7/index.md#def-geo7-differential-form)を用い、接空間上の交代形式を滑らかにつなぎます。さらに外微分が零であるという条件を加えます。非退化性は**各点で方向を検出できること**、閉性は**点を動かしたときの変化が満たす微分条件**です。この二条件は別物であり、後の Hamilton ベクトル場や Darboux の定理では両方が働きます。

本章では定義を確認した後、座標での判定、二つの多様体の積を使う作り方、形式の符号を変える操作、球面とトーラス、保存写像、閉性が欠ける反例を構成します。余接束固有の正準形式は次章で構成します。

## 1. 各接空間の面積を滑らかにつなぐ

$M$ を空でない滑らかな実多様体とします。[接空間](../GEO2/index.md#def-geo2-tangent-derivation) $T_xM$ は各点 $x$ に付随する実ベクトル空間です。滑らかな2形式 $\omega$ を各点 $x$ で評価すると、交代双線形形式

$$
\omega_x:T_xM\times T_xM\longrightarrow\mathbb R
$$

が得られます。

点ごとに[SYM1の非退化性](../SYM1/index.md#def-sym1-nondegenerate-form)を要求するだけなら線形代数で判定できます。しかし多様体として利用するには、形式の係数を微分したときにも整合性が必要です。ここで[外微分](../GEO7/index.md#def-geo7-exterior-derivative)が役立ちます。

<a id="def-sym2-symplectic-manifold"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック多様体）**  
> $M$ を滑らかな実多様体、$\omega\in\Omega^2(M)$ を滑らかな2形式とする。次を満たす組 $(M,\omega)$ をシンプレクティック多様体という。
>
> 1. **閉性**：$d\omega=0$。
> 2. **非退化性**：任意の $x\in M$ と $v\in T_xM$ に対し、$\omega_x(v,w)=0$ が全ての $w\in T_xM$ で成り立つなら $v=0$。
>
> この $\omega$ をシンプレクティック形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym2-symplectic-manifold -->
### 直接例：平面の面積形式

**定義の確認**：$M=\mathbb R^2$、座標を $(q,p)$ とし、

$$
\omega_0=dq\wedge dp
$$

と置きます。任意の接ベクトル $u=u_q\partial_q+u_p\partial_p$、$v=v_q\partial_q+v_p\partial_p$ について

$$
\omega_0(u,v)=u_qv_p-u_pv_q.
$$

$u$ が全ての $v$ と組にして零と仮定します。まず $v=\partial_p$ を代入すると $u_q=0$、次に $v=\partial_q$ を代入すると $-u_p=0$ を得ます。したがって $u=0$ であり、非退化です。

一方、[外微分の局所計算](../GEO7/index.md#def-geo7-exterior-derivative)では

$$
d(dq\wedge dp)=d(1)\wedge dq\wedge dp=0.
$$

したがって閉性も確認でき、$(\mathbb R^2,\omega_0)$ は定義を満たします。
<!-- definition-example-end -->

[SYM1の偶数次元性](../SYM1/index.md#thm-sym1-even-dimension)を各点の $(T_xM,\omega_x)$ に適用すると、非空なシンプレクティック多様体の次元は偶数です。これは閉性に関係しない、点ごとの線形代数的制約です。

## 2. 座標で閉性と非退化性を別々に判定する

局所座標 $(x^1,\ldots,x^m)$ で2形式を

$$
\omega=\frac12\sum_{i,j=1}^m\omega_{ij}(x)\,dx^i\wedge dx^j,
\qquad \omega_{ji}=-\omega_{ij}
$$

と表します。係数行列 $\Omega(x)=(\omega_{ij}(x))$ は交代行列です。接ベクトルの成分を列ベクトル $u,v$ とすると

$$
\omega_x(u,v)=u^{\mathsf T}\Omega(x)v.
$$

ここで $v$ を全て動かしても値が零となる $u$ は $\Omega(x)^{\mathsf T}u=0$ を満たします。よって非退化性は各点で $\det\Omega(x)\ne0$ であることと同値です。

外微分は係数だけを微分します。まず $\omega_{ji}=-\omega_{ij}$ と外積の交代性を使って、$(i,j)$ と $(j,i)$ の同じ項をまとめると、

$$
\begin{aligned}
d\omega
&=\frac12\sum_{i,j,k}
\partial_k\omega_{ij}\,
dx^k\wedge dx^i\wedge dx^j\\
&=\sum_{i<j}\sum_k
\partial_k\omega_{ij}\,
dx^k\wedge dx^i\wedge dx^j.
\end{aligned}
$$

異なる三添字 $i<j<k$ の基底 $dx^i\wedge dx^j\wedge dx^k$ に寄与するのは、偏微分する添字をそれぞれ $i,j,k$ とする三つの項です。順番を並べ替え、

$$
\begin{aligned}
&\partial_i\omega_{jk}\,dx^i\wedge dx^j\wedge dx^k\\
&\quad+\partial_j\omega_{ik}\,dx^j\wedge dx^i\wedge dx^k\\
&\quad+\partial_k\omega_{ij}\,dx^k\wedge dx^i\wedge dx^j\\
&=\bigl(\partial_i\omega_{jk}-\partial_j\omega_{ik}
+\partial_k\omega_{ij}\bigr)\,
dx^i\wedge dx^j\wedge dx^k\\
&=\bigl(\partial_i\omega_{jk}+\partial_j\omega_{ki}
+\partial_k\omega_{ij}\bigr)\,
dx^i\wedge dx^j\wedge dx^k.
\end{aligned}
$$

と求められます。第二項の負号は $dx^j$ と $dx^i$ の交換から生じ、$\omega_{ki}=-\omega_{ik}$ で最後の等号に移ります。第三項の巡回並べ替えは二回の交換なので正符号です。したがって全体として

$$
d\omega=\sum_{i<j<k}
\bigl(\partial_i\omega_{jk}+
\partial_j\omega_{ki}+
\partial_k\omega_{ij}\bigr)
dx^i\wedge dx^j\wedge dx^k.
$$

<a id="prop-sym2-coordinate-criterion"></a>

<!-- formal-statement-start -->
> **命題（局所座標での判定条件）**  
> 滑らかな偶数次元多様体 $M^{2n}$ 上の滑らかな2形式 $\omega$ がシンプレクティック形式であるための必要十分条件は、各局所座標で以下の両方が成り立つことである。
>
> 1. 全ての点で係数行列 $\Omega(x)$ が可逆である。
> 2. 互いに異なる全ての添字 $i,j,k$ について、次が成り立つ。

$$
\partial_i\omega_{jk}+\partial_j\omega_{ki}+\partial_k\omega_{ij}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第一条件は接空間上の線形写像の核を、第二条件は外微分の3形式の係数を検査しています。座標表示は違っても、それぞれ非退化性と $d\omega=0$ の座標不変な条件を調べています。

<!-- proof-start -->
### 証明

$\omega_x(u,v)=u^{\mathsf T}\Omega(x)v$ だから、任意の $v$ に対する零条件は

$$
u^{\mathsf T}\Omega(x)=0
\ \Longleftrightarrow\
\Omega(x)^{\mathsf T}u=0.
$$

有限次元の正方行列の核が零であることは可逆性と同値なので、第一条件は点ごとの非退化性に一致します。

第二条件は、上で求めた $d\omega$ の基底3形式の係数が零であることです。$i<j<k$ のとき、

$$
dx^i\wedge dx^j\wedge dx^k
$$

は互いに一次独立です。よってそれらの係数が全て零であることと $d\omega=0$ は同値です。添字を並べ替えた式は交代性から同じ条件を与えます。したがって二条件を同時に満たすことが[定義](#def-sym2-symplectic-manifold)と同値です。
<!-- proof-end -->

### 二次元では閉性は自動、非退化性は自動ではない

二次元の滑らかな2形式は、局所座標で

$$
\omega=f(q,p)\,dq\wedge dp
$$

と書けます。三次の微分形式が零なので $d\omega=0$ です。非退化性は

$$
\Omega=\begin{pmatrix}0&f\\-f&0\end{pmatrix},
\qquad
\det\Omega=f^2
$$

より $f(q,p)\ne0$ と同値です。特に $f(q,p)=1+q^2$ は全点で正だからシンプレクティックですが、$f(q,p)=q$ は $q=0$ で退化します。閉性だけでは後者を排除できません。

## 3. 偶数次元の標準例と閉性を失う例

$\mathbb R^{2n}$ の座標を $(q_1,\ldots,q_n,p_1,\ldots,p_n)$ とし、

$$
\omega_0=\sum_{i=1}^n dq_i\wedge dp_i
$$

と置きます。係数は定数なので $d\omega_0=0$ です。また[SYM1の標準形](../SYM1/index.md#thm-sym1-linear-normal-form)と同じ

$$
J=\begin{pmatrix}0&I_n\\-I_n&0\end{pmatrix}
$$

が係数行列です。$J^2=-I_{2n}$ だから可逆で、$\omega_0$ は非退化です。

非退化な2形式が閉じているとは限りません。$\mathbb R^4$ の座標を $(q_1,q_2,p_1,p_2)$ として

$$
\eta=e^{q_2}dq_1\wedge dp_1+dq_2\wedge dp_2
$$

を考えます。$e^{q_2}>0$ なので、成分行列の行列式は $e^{2q_2}\ne0$ となり非退化です。しかし外微分を取ると

$$
\begin{aligned}
d\eta
&=d(e^{q_2})\wedge dq_1\wedge dp_1
 +d(dq_2\wedge dp_2)\\
&=e^{q_2}dq_2\wedge dq_1\wedge dp_1\ne0.
\end{aligned}
$$

すなわち**非退化性は成立しても閉性は失敗**します。反対に $\mathbb R^4$ 上の $dq_1\wedge dp_1$ は閉じていますが、$\partial_{q_2}$ を検出できないため退化しています。

## 4. 積と符号反転

二つの形式を合わせたときは、交差項が生まれないように各因子から[微分形式を引き戻す](../GEO7/index.md#def-geo7-pullback-form)のが自然です。$M\times N$ からの射影を $\pi_M,\pi_N$ とします。

<a id="prop-sym2-product-and-sign"></a>

<!-- formal-statement-start -->
> **命題（積と符号反転）**  
> $(M,\omega)$ と $(N,\eta)$ が滑らかなシンプレクティック多様体なら、

$$
\Omega=\pi_M^*\omega+\pi_N^*\eta
$$

> は $M\times N$ 上のシンプレクティック形式である。また $(M,-\omega)$ もシンプレクティック多様体である。
<!-- formal-statement-end -->

### 証明の見取り図

閉性は外微分と引き戻しの可換性で示します。非退化性は[積多様体の接空間の直和](../GEO2/index.md#prop-geo2-product-tangent)を使って、各因子の成分を別々に零と判定します。

<!-- proof-start -->
### 証明

[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)に、写像 $\pi_M$ と2形式 $\omega$、次に $\pi_N$ と2形式 $\eta$ を適用すると

$$
\begin{aligned}
d\Omega
&=d(\pi_M^*\omega)+d(\pi_N^*\eta)\\
&=\pi_M^*(d\omega)+\pi_N^*(d\eta)\\
&=0+0=0.
\end{aligned}
$$

点 $(x,y)$ では接空間を $T_xM\oplus T_yN$ と同一視できます。$u=(u_M,u_N)$ が全ての $v=(v_M,v_N)$ に対して $\Omega(u,v)=0$ を満たすと仮定します。引き戻しの定義から

$$
\Omega(u,v)=\omega_x(u_M,v_M)+\eta_y(u_N,v_N).
$$

$v=(v_M,0)$ と選ぶと $\omega_x(u_M,v_M)=0$ が全ての $v_M$ で成り立ち、非退化性から $u_M=0$ です。同様に $v=(0,v_N)$ と選ぶと $u_N=0$ です。したがって $u=0$ であり、$\Omega$ は非退化です。

符号反転では $d(-\omega)=-d\omega=0$ です。また $(-\omega)_x(v,w)=0$ が全ての $w$ で成立することと $\omega_x(v,w)=0$ は同値なので、非退化性も維持されます。
<!-- proof-end -->

**注意**：一般に $\omega+\eta$ を同じ多様体上で足す場合には、この命題をそのまま使えません。例えば $\eta=-\omega$ なら和は零となり退化します。積の命題では、別々の接空間へ分かれた直和構造を使っています。

## 5. 球面とトーラスにもシンプレクティック形式がある

### 球面の面積形式

標準的な単位球面を

$$
S^2=\{x\in\mathbb R^3:\|x\|=1\}
$$

とします。球面の[接ベクトルの曲線表示](../GEO2/index.md#def-geo2-curve-tangent)から、球面上の曲線 $x(t)$ に沿って $x(t)\cdot x(t)=1$ を微分すると、

$$
2x(0)\cdot x'(0)=0
$$

を得ます。逆に $x\cdot u=0$ なら、曲線

$$
\gamma(t)=\frac{x+tu}{\|x+tu\|}
$$

は球面上にあります。ここで $N(t)=\|x+tu\|$ と置くと、$N(0)=1$ であり、

$$
N'(0)=\frac{x\cdot u}{\|x\|}=0.
$$

商の微分から

$$
\gamma'(0)=\frac{uN(0)-xN'(0)}{N(0)^2}=u.
$$

したがって

$$
T_xS^2=\{u\in\mathbb R^3:x\cdot u=0\}
$$

が成立します。各点で、三つのベクトルを列に並べた行列式を用い

$$
\sigma_x(u,v)=\det(x,u,v)
\qquad (u,v\in T_xS^2)
$$

と置きます。

<a id="prop-sym2-sphere-area"></a>

<!-- formal-statement-start -->
> **命題（球面の面積形式）**  
> 単位球面 $S^2$ 上の滑らかな2形式 $\sigma_x(u,v)=\det(x,u,v)$ はシンプレクティック形式である。
<!-- formal-statement-end -->

### 証明の見取り図

各点での非退化性は、球面の外向き法線 $x$ と接平面の二方向が三次元の体積を作ることから従います。閉性は球面が二次元であるため自動です。

<!-- proof-start -->
### 証明

$\det(x,u,v)$ は $x,u,v$ の成分に関する多項式で、$x$ の変化についても滑らかです。$u,v$ に線形かつ交代的なので $\sigma$ は滑らかな2形式です。

非零の $u\in T_xS^2$ を取り、$v=x\times u$ と置きます。$x\cdot(x\times u)=0$ なので $v$ も接ベクトルです。ここで $r=\|u\|>0$ とし、

$$
e_1=x,\qquad e_2=u/r,\qquad e_3=x\times e_2
$$

と置きます。$x$ と $u$ は直交し、$\|x\|=1$ なので $(e_1,e_2,e_3)$ は右手系の正規直交基底です。行列式の多重線形性と、この基底の行列式が1であることから

$$
\begin{aligned}
\sigma_x(u,v)
&=\det(x,u,x\times u)\\
&=\det(e_1,r e_2,r e_3)\\
&=r^2\det(e_1,e_2,e_3)\\
&=r^2=\|u\|^2>0.
\end{aligned}
$$

従って任意の非零 $u$ に対して $\sigma_x(u,v)\ne0$ となる相手 $v$ が存在し、非退化です。最後に $S^2$ 上の3形式は次元の理由で零なので $d\sigma=0$ です。
<!-- proof-end -->

球面の面積形式は座標の一枚の組だけで全域を記述したわけではありません。行列式による定義は、北極・南極を含むすべての点で意味を持ちます。

### トーラスの二つの角方向

$S^1=\{(x,y)\in\mathbb R^2:x^2+y^2=1\}$ に、周囲の1形式 $x\,dy-y\,dx$ を制限して $\alpha$ とします。単位円上の接ベクトル $u=t(-y,x)$ に対し、

$$
\alpha_{(x,y)}(u)
=x(tx)-y(-ty)=t(x^2+y^2)=t.
$$

したがって $\alpha$ は円の各点で零でない1形式です。円の次元が1だから $d\alpha=0$ です。

$T^2=S^1\times S^1$ の射影を $\pi_1,\pi_2$ とし、

$$
\tau=\pi_1^*\alpha\wedge\pi_2^*\alpha
$$

と置きます。角方向の接ベクトル $e_1,e_2$ をそれぞれの円で $t=1$ として選ぶと

$$
\tau(e_1,e_2)=1,\qquad
\tau(e_1,e_1)=\tau(e_2,e_2)=0.
$$

よって接空間の行列は $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ で非退化です。[外微分の次数付きLeibniz則](../GEO7/index.md#thm-geo7-graded-leibniz)と[引き戻しの自然性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を、1形式 $\pi_1^*\alpha,\pi_2^*\alpha$ に適用すると

$$
\begin{aligned}
d\tau
&=d(\pi_1^*\alpha)\wedge\pi_2^*\alpha
 -\pi_1^*\alpha\wedge d(\pi_2^*\alpha)\\
&=\pi_1^*(d\alpha)\wedge\pi_2^*\alpha
 -\pi_1^*\alpha\wedge\pi_2^*(d\alpha)=0.
\end{aligned}
$$

ゆえに $(T^2,\tau)$ もシンプレクティック多様体です。角度 $\theta,\phi$ を局所的に選べば $\tau=d\theta\wedge d\phi$ ですが、全域で一つの実数値角度関数が存在すると仮定する必要はありません。

## 6. 形式を保つ微分同相と体積

線形シンプレクティック写像を多様体へ拡張します。二つの多様体が違っても、写像が接空間上の2形式を保つという条件で記述できます。

<a id="def-sym2-symplectomorphism"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック微分同相）**  
> $(M,\omega)$ と $(N,\eta)$ をシンプレクティック多様体とする。微分同相 $F:M\to N$ が

$$
F^*\eta=\omega
$$

> を満たすとき、$F$ をシンプレクティック微分同相という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym2-symplectomorphism -->
### 直接例：非線形 shear

**定義の確認**：$\mathbb R^2$ に $\omega_0=dq\wedge dp$ を入れ、

$$
F(q,p)=(Q,P)=(q+p^2,p)
$$

とします。逆写像は $(Q,P)\mapsto(Q-P^2,P)$ なので微分同相です。さらに

$$
\begin{aligned}
F^*(dQ\wedge dP)
&=d(q+p^2)\wedge dp\\
&=(dq+2p\,dp)\wedge dp\\
&=dq\wedge dp+2p\,dp\wedge dp\\
&=dq\wedge dp.
\end{aligned}
$$

二つの条件を直接確かめたので、$F$ は定義を満たします。
<!-- definition-example-end -->

<a id="prop-sym2-differential-criterion"></a>

<!-- formal-statement-start -->
> **命題（保存性の接空間判定）**  
> $(M,\omega)$、$(N,\eta)$ を同じ有限次元のシンプレクティック多様体とし、$F:M\to N$ を微分同相とする。このとき $F$ がシンプレクティック微分同相であることと、全ての $x\in M$ および $u,v\in T_xM$ について

$$
\eta_{F(x)}(dF_xu,dF_xv)=\omega_x(u,v)
$$

> が成り立つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

既習の[2形式の引き戻し](../GEO7/index.md#def-geo7-pullback-form)を、点 $x$、写像 $F$、二つの接ベクトル $u,v$ に代入します。これは座標ごとの[SYM1の行列条件](../SYM1/index.md#thm-sym1-matrix-criterion)を多様体全体へ拡張したものです。

<!-- proof-start -->
### 証明

[微分形式の引き戻しの定義](../GEO7/index.md#def-geo7-pullback-form)で $k=2$ とすると、

$$
(F^*\eta)_x(u,v)
=\eta_{F(x)}(dF_xu,dF_xv)
$$

です。左辺が全ての点と接ベクトルで $\omega_x(u,v)$ に等しいことは、2形式として $F^*\eta=\omega$ であることと同値です。微分同相性は初めから仮定してあるので、これが[定義](#def-sym2-symplectomorphism)の必要十分条件です。
<!-- proof-end -->

一般の滑らかな写像 $F:M\to N$ についても、上の式は引き戻しの定義として成立します。しかし微分同相でない写像をこの定義だけでシンプレクティック微分同相と呼びません。仮定を区別しておきます。

<a id="prop-sym2-symplectic-orientation"></a>

<!-- formal-statement-start -->
> **命題（シンプレクティック形式が定める向き）**  
> $(M^{2n},\omega)$ を $n\ge1$ の滑らかなシンプレクティック多様体とする。このとき

$$
\omega^{\wedge n}=\underbrace{\omega\wedge\cdots\wedge\omega}_{n\ \text{個}}
$$

> は全ての点で零でない最高次形式であり、$M$ に向きを定める。シンプレクティック微分同相 $F:(M,\omega)\to(N,\eta)$ は、その向きに関して向きを保ち、$F^*(\eta^{\wedge n})=\omega^{\wedge n}$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

各接空間に[SYM1のシンプレクティック基底](../SYM1/index.md#def-sym1-symplectic-basis)を取ります。$n$ 回外積すると、異なる $n$ 組を一回ずつ使う項だけが残ります。形式の引き戻しは[外積と可換](../GEO7/index.md#prop-geo7-pullback-wedge)です。

<!-- proof-start -->
### 証明

$x\in M$ を固定します。[線形標準形](../SYM1/index.md#thm-sym1-linear-normal-form)を $T_xM$ 上の非退化交代形式 $\omega_x$ に適用して、シンプレクティック基底を選びます。その双対基底を

$$
(e^1,\ldots,e^n,f^1,\ldots,f^n)
$$

と書くと、

$$
\omega_x=\sum_{i=1}^n e^i\wedge f^i.
$$

外積を分配して展開すると、一つの添字を二回選ぶ項は $e^i\wedge e^i=0$ によって零です。残るのは $1,\ldots,n$ の並べ替え $n!$ 個で、次数2の項同士は交換しても符号が変わりません。したがって

$$
(\omega_x)^{\wedge n}
=n!\,e^1\wedge f^1\wedge\cdots\wedge e^n\wedge f^n.
$$

右辺を $(e_1,f_1,\ldots,e_n,f_n)$ に評価すると $n!\ne0$ です。各点で非零の滑らかな最高次形式は向きを定めます。

最後に $F^*\eta=\omega$ と[引き戻しと外積の可換性](../GEO7/index.md#prop-geo7-pullback-wedge)を用いると

$$
F^*(\eta^{\wedge n})
=(F^*\eta)^{\wedge n}
=\omega^{\wedge n}.
$$

両辺は選んだ向きに関する非零最高次形式なので、$F$ は向きを保ちます。
<!-- proof-end -->

反対に「向き付き体積だけを保つ」ことから $\omega$ の保存は導けません。四次元では[SYM1の体積保存反例](../SYM1/index.md#prop-sym1-determinant-one)とその直後の対角行列が既にこれを示しています。

## 7. 演習：閉性、非退化性、積を区別して使う

### Level A：定義と局所計算

#### A1. 平面の重み付き面積

$\mathbb R^2$ 上で $\omega=(2+q^2+p^2)\,dq\wedge dp$ とする。閉性と非退化性を別々に確かめよ。

- Level: A
- ID: SYM2-A1

<!-- solution-start -->
**詳細解答**　$h=2+q^2+p^2>0$ と置きます。[外微分の定義](../GEO7/index.md#def-geo7-exterior-derivative)を使うと

$$
\begin{aligned}
d\omega
&=dh\wedge dq\wedge dp\\
&=(2q\,dq+2p\,dp)\wedge dq\wedge dp=0
\end{aligned}
$$

です。後半は $dq\wedge dq=dp\wedge dp=0$ を使いました。係数行列は

$$
\begin{pmatrix}0&h\\-h&0\end{pmatrix},
\qquad \det=h^2>0
$$

なので非退化です。よってシンプレクティック形式です。
<!-- solution-end -->

#### A2. 閉じているのに退化する形式

$\mathbb R^4$ の $(q_1,q_2,p_1,p_2)$ 上で $\omega=dq_1\wedge dp_1$ とする。$d\omega$ と $\omega$ の核を求めよ。

- Level: A
- ID: SYM2-A2

<!-- solution-start -->
**詳細解答**　係数は定数なので $d\omega=0$ です。$u=a\partial_{q_1}+b\partial_{q_2}+c\partial_{p_1}+d\partial_{p_2}$ に対して

$$
\omega(u,\partial_{p_1})=a,\qquad
\omega(u,\partial_{q_1})=-c.
$$

これらが零なら $a=c=0$ です。逆に $u=b\partial_{q_2}+d\partial_{p_2}$ は任意の $v$ と組にして零です。よって核は

$$
\operatorname{span}\{\partial_{q_2},\partial_{p_2}\}
$$

で、閉じていても非退化ではありません。
<!-- solution-end -->

#### A3. 符号反転と積

$\omega=dq\wedge dp$ を備えた $\mathbb R^2$ と、$\eta=ds\wedge dt$ を備えた別の $\mathbb R^2$ を考える。$\mathbb R^4$ 上の $\Omega=dq\wedge dp-ds\wedge dt$ の閉性と非退化性を確認せよ。

- Level: A
- ID: SYM2-A3

<!-- solution-start -->
**詳細解答**　$\Omega$ は[符号反転と積の命題](#prop-sym2-product-and-sign)によりシンプレクティック形式です。直接確認すると $d\Omega=0$ で、座標順 $(q,p,s,t)$ での行列は

$$
\begin{pmatrix}
0&1&0&0\\-1&0&0&0\\
0&0&0&-1\\0&0&1&0
\end{pmatrix}.
$$

各二次元ブロックの行列式は1なので全体も $\det\Omega=1\ne0$ です。
<!-- solution-end -->

#### A4. 非線形保存写像

$\mathbb R^2$ 上の $F(q,p)=(q+p^3,p)$ がシンプレクティック微分同相であることを示せ。

- Level: A
- ID: SYM2-A4

<!-- solution-start -->
**詳細解答**　逆写像は $(Q,P)\mapsto(Q-P^3,P)$ で滑らかです。出力座標を $Q=q+p^3,\ P=p$ として、

$$
\begin{aligned}
F^*(dQ\wedge dP)
&=d(q+p^3)\wedge dp\\
&=(dq+3p^2\,dp)\wedge dp\\
&=dq\wedge dp.
\end{aligned}
$$

したがって[シンプレクティック微分同相の定義](#def-sym2-symplectomorphism)の二条件を満たします。
<!-- solution-end -->

#### A5. 円周の1形式

単位円 $S^1$ 上で $\alpha=x\,dy-y\,dx$ の制限を考える。接ベクトル $u=t(-y,x)$ に対し $\alpha(u)$ を求め、$S^1\times S^1$ の $\pi_1^*\alpha\wedge\pi_2^*\alpha$ が各点で非退化である理由を述べよ。

- Level: A
- ID: SYM2-A5

<!-- solution-start -->
**詳細解答**　$dx(u)=-ty$、$dy(u)=tx$ なので

$$
\alpha(u)=x(tx)-y(-ty)=t(x^2+y^2)=t.
$$

各因子で $t=1$ の接ベクトルを $e_1,e_2$ とすると、2形式の評価は

$$
\tau(e_1,e_2)=\alpha(e_1)\alpha(e_2)=1.
$$

交代性より接空間での行列は $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、行列式が1で非退化です。円上では $d\alpha=0$ であり、積上でも[Leibniz則](../GEO7/index.md#thm-geo7-graded-leibniz)から $d\tau=0$ です。
<!-- solution-end -->

### Level B：仮定の役割を追う

#### B1. 非退化でも閉じない形式

$\mathbb R^4$ の座標 $(q_1,q_2,p_1,p_2)$ 上で

$$
\eta=e^{q_2}dq_1\wedge dp_1+dq_2\wedge dp_2
$$

とする。係数行列を示し、非退化性と閉性をそれぞれ判定せよ。

- Level: B
- ID: SYM2-B1

<!-- solution-start -->
**詳細解答**　$h=e^{q_2}$ と置くと、座標順 $(q_1,q_2,p_1,p_2)$ に対する係数行列は

$$
\Omega=\begin{pmatrix}
0&0&h&0\\0&0&0&1\\
-h&0&0&0\\0&-1&0&0
\end{pmatrix}.
$$

$q_1,p_1$ の対と $q_2,p_2$ の対へ同時に基底を並べ直すと二つの2次交代ブロックに分かれ、行列式は $h^2>0$ です。ゆえに非退化です。一方

$$
d\eta=dh\wedge dq_1\wedge dp_1
=h\,dq_2\wedge dq_1\wedge dp_1
$$

であり、これは例えば $(\partial_{q_2},\partial_{q_1},\partial_{p_1})$ に代入すると $h\ne0$ を返します。よって閉じておらずシンプレクティックではありません。
<!-- solution-end -->

#### B2. 閉性が係数関数を制限する

$\mathbb R^4$ 上で $a:\mathbb R\to(0,\infty)$ を滑らかとし、

$$
\omega_a=a(q_2)dq_1\wedge dp_1+dq_2\wedge dp_2
$$

とする。$\omega_a$ がシンプレクティックとなる $a$ を全て求めよ。

- Level: B
- ID: SYM2-B2

<!-- solution-start -->
**詳細解答**　$a(q_2)>0$ なので、B1と同じブロック計算から係数行列の行列式は $a(q_2)^2>0$、従って全点で非退化です。閉性を調べると

$$
d\omega_a=a'(q_2)\,dq_2\wedge dq_1\wedge dp_1.
$$

三つの座標方向に外微分を評価すると

$$
d\omega_a(\partial_{q_2},\partial_{q_1},\partial_{p_1})
=a'(q_2)
$$

が得られます。よって $d\omega_a=0$ と、全ての $q_2$ で $a'(q_2)=0$ となることは同値です。実直線上で導関数が零の滑らかな関数は定数なので、答えは正の定数関数 $a\equiv c$（$c>0$）に限られます。
<!-- solution-end -->

#### B3. 球面の面積形式を検算する

$S^2$ 上の $\sigma_x(u,v)=\det(x,u,v)$ について、$x=(0,0,1)$ と接ベクトル $u=(a,b,0)$、$v=(-b,a,0)$ に対する値を求めよ。さらに任意の点で非退化性が成立する理由と閉性を述べよ。

- Level: B
- ID: SYM2-B3

<!-- solution-start -->
**詳細解答**　与えた $u,v$ はともに $x$ と直交するので接ベクトルです。行列式を第三行で展開すると

$$
\sigma_x(u,v)
=\det\begin{pmatrix}0&a&-b\\0&b&a\\1&0&0\end{pmatrix}
=a^2+b^2.
$$

$(a,b)\ne(0,0)$ なら値は正です。一般の点では、任意の非零 $u\in T_xS^2$ に対して $v=x\times u$ を選びます。[球面の面積形式の命題](#prop-sym2-sphere-area)の証明によると

$$
\sigma_x(u,v)=\|u\|^2>0
$$

です。従って全点で非退化であり、二次元多様体上の3形式が零であることから $d\sigma=0$ です。
<!-- solution-end -->

#### B4. 逆写像と引き戻しを両方求める

$a\in\mathbb R\setminus\{0\}$ と滑らかな関数 $h:\mathbb R\to\mathbb R$ に対し、

$$
F(q,p)=(Q,P)=(aq,p/a+h(q))
$$

が $\mathbb R^2$ の標準シンプレクティック形式を保存する微分同相であることを示せ。

- Level: B
- ID: SYM2-B4

<!-- solution-start -->
**詳細解答**　$Q=aq$ から $q=Q/a$、$P=p/a+h(q)$ から

$$
p=a\bigl(P-h(Q/a)\bigr)
$$

と一意に解けます。$a\ne0$ かつ $h$ は滑らかなので逆写像も滑らかです。次に

$$
dQ=a\,dq,\qquad
dP=\frac1a\,dp+h'(q)\,dq.
$$

よって

$$
\begin{aligned}
F^*(dQ\wedge dP)
&=a\,dq\wedge\left(\frac1a\,dp+h'(q)\,dq\right)\\
&=dq\wedge dp+a h'(q)\,dq\wedge dq\\
&=dq\wedge dp.
\end{aligned}
$$

逆写像の存在と形式の保存を別々に確認したので、[定義](#def-sym2-symplectomorphism)によりシンプレクティック微分同相です。
<!-- solution-end -->

### Level C：積、閉性、向きを組み合わせる

#### C1. 球面と平面の積を重み付けする

$M=S^2\times\mathbb R^2$ とし、球面の面積形式を $\sigma_x(u,v)=\det(x,u,v)$、平面座標を $(q,p)$ とする。$h:S^2\to(0,\infty)$ を滑らかな関数とし、射影による引き戻しの記号を省略して

$$
\Omega_h=\sigma+h(x)\,dq\wedge dp
$$

と置く。次を示せ。

1. 全ての正の $h$ に対して $\Omega_h$ は非退化である。
2. $\Omega_h$ が閉じているための必要十分条件は $h$ が定数であること。
3. $h(x)=2+x_3$ の場合、非退化でも閉じていないことを具体的な点と接ベクトルで示せ。
4. $h\equiv1$ の場合、$\Omega_1^{\wedge2}$ を求める。さらに $r(x_1,x_2,x_3)=(x_1,x_2,-x_3)$ と $T(q,p)=(q,-p)$ に対し、$F=(r,T)$ が $F^*\Omega_1=-\Omega_1$ を満たすことを示せ。

- Level: C
- ID: SYM2-C1

<!-- solution-start -->
**詳細解答**

**(1)**　[積多様体の接空間の直和](../GEO2/index.md#prop-geo2-product-tangent)を使うと、

$$
T_{(x,q,p)}M=T_xS^2\oplus T_{(q,p)}\mathbb R^2
$$

です。接ベクトル $(u,a)$ が、全ての相手 $(v,b)$ に対して次を満たすと仮定します。

$$
\Omega_h((u,a),(v,b))=0.
$$

まず $b=0$ と選べば、任意の $v$ に対して

$$
\sigma_x(u,v)=0
$$

が成り立ち、[球面の非退化性](#prop-sym2-sphere-area)から $u=0$ を得ます。次に $v=0$ と選べば、

$$
h(x)(dq\wedge dp)(a,b)=0
$$

が全ての $b$ に対して成り立ちます。$h(x)>0$ なので平面の非退化性から $a=0$ です。

**(2)**　$\sigma$ は閉じており、$dq\wedge dp$ も閉じています。[次数付きLeibniz則](../GEO7/index.md#thm-geo7-graded-leibniz)で $h$ を0形式として扱うと

$$
\begin{aligned}
d\Omega_h
&=d\sigma+d(h\,dq\wedge dp)\\
&=0+dh\wedge dq\wedge dp
 +h\,d(dq\wedge dp)\\
&=dh\wedge dq\wedge dp.
\end{aligned}
$$

接ベクトル $(u,0)$、$(0,\partial_q)$、$(0,\partial_p)$ に評価すると、その値は $dh_x(u)$ です。ゆえに $d\Omega_h=0$ なら全ての $x,u$ で $dh_x(u)=0$ です。球面は連結なので、滑らかな $h$ は定数になります。逆に $h$ が定数なら $dh=0$ で閉じています。

**(3)**　$h(x)=2+x_3$ は球面上で $1\le h\le3$ だから非退化です。$x=(1,0,0)$ と $u=(0,0,1)\in T_xS^2$ を取ると

$$
dh_x(u)=d(x_3)_x(u)=1.
$$

従って

$$
(d\Omega_h)_{(x,q,p)}
\bigl((u,0),(0,\partial_q),(0,\partial_p)\bigr)=1\ne0
$$

となり、閉性は失敗します。

**(4)**　2形式の次数付き交換則と $\sigma\wedge\sigma=0$（球面因子の次元が2）、$(dq\wedge dp)^2=0$ を用いて

$$
\begin{aligned}
\Omega_1^{\wedge2}
&=(\sigma+dq\wedge dp)\wedge(\sigma+dq\wedge dp)\\
&=2\,\sigma\wedge dq\wedge dp.
\end{aligned}
$$

各因子で非零の2形式だから、この4形式は全点で零でありません。$r$ は直交行列で $\det r=-1$ を持ち、$u,v\in T_xS^2$ に対し

$$
\begin{aligned}
(r^*\sigma)_x(u,v)
&=\sigma_{r(x)}(r(u),r(v))\\
&=\det(r(x),r(u),r(v))\\
&=(\det r)\det(x,u,v)=-\sigma_x(u,v).
\end{aligned}
$$

一方、$T^*(dq\wedge dp)=dq\wedge d(-p)=-dq\wedge dp$ です。従って

$$
F^*\Omega_1=-\sigma-dq\wedge dp=-\Omega_1.
$$

$F$ は微分同相ですがシンプレクティック形式を反転します。にもかかわらず $F^*(\Omega_1^{\wedge2})=(-\Omega_1)^{\wedge2}=\Omega_1^{\wedge2}$ であり、最高次形式の保存だけではシンプレクティック性を結論できないことも確認できます。
<!-- solution-end -->

## 8. 次章への橋：なぜ余接束に自然な形式があるのか

この章では、局所座標での $d\omega=0$ と非退化性を独立に調べ、球面・トーラス・積のように一つの大域座標に頼らない例も作りました。保存写像は微分の各点で形式を保ちますが、それだけで局所標準座標が構成できたわけではありません。

次の SYM3 では、滑らかな多様体 $Q$ の余接束 $T^*Q$ に、点ごとの共変ベクトルの評価から自然な1形式を構成し、その外微分によって正準シンプレクティック形式を得ます。その後、Darboux の定理で一般のシンプレクティック形式の局所標準化を証明します。
