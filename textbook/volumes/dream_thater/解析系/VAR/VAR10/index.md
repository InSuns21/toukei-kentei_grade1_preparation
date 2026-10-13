# VAR10 Tonelli型存在論・弱Euler–Lagrange方程式と正則性

[VAR9の最小化の直接法](../VAR9/index.md#thm-var9-direct-method)は、弱閉な許容集合、強制性、弱逐次下半連続性が揃えば最小値を取れると教えました。しかし、典型的な変分問題のエネルギーには位置 $u$ と速度 $u'$ が同時に入ります。

$$
J(u)=\int_a^b F(t,u(t),u'(t))\,dt.
$$

例えばひもの伸びや材質が位置によって変わると、速度の二乗の係数も $u$ に依存します。$u_n$ が弱収束しても $u_n'$ は強収束するとは限りません。では、被積分関数 $F$ にどのような条件を置けば、弱収束した列のエネルギーを制御できるでしょうか。

本章では一次元・二次成長の**検証可能なTonelli型十分条件**を証明し、その最小点が満たす弱Euler–Lagrange方程式と、滑らかな常微分方程式へ移れる追加条件を区別します。一般の可測被積分関数や任意の $p$ 次成長まで一挙に一般化した定理ではありません。

## 1. 許容集合と被積分関数

$I=(a,b)$ は有限区間、$a<b$、端点値 $A,B\in\mathbb R$ とします。変分の許容集合は、[VAR9で導入した固定端点集合](../VAR9/index.md#def-var9-admissible)

$$
\mathcal A_{A,B}
=\{u\in H^1(I):u(a)=A,\ u(b)=B\}
$$

です。端点は[区間上の絶対連続代表元](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)で評価します。$H^1$ の弱導関数は $L^2$ に属するため、速度について二次程度の成長なら積分は有限です。

実数値 $F:[a,b]\times\mathbb R^2\to\mathbb R$ を考え、$z$ は位置、$p$ は速度を表します。「速度に関する凸性」は $z$ も $t$ も固定して $p$ だけを動かす条件であり、$z,p$ の組に関する凸性とは違います。

<a id="def-var10-admissible-functional"></a>
<!-- formal-statement-start -->
> **定義（固定端点の積分汎関数）**  
> 有界区間 $I=(a,b)$、$A,B\in\mathbb R$ と可測な被積分関数 $F$ に対して、各 $u\in\mathcal A_{A,B}$ で積分が有限なら
$$
J_F(u)=\int_a^b F(t,u(t),u'(t))\,dt
$$
> を固定端点の積分汎関数という。**最小点**とは $u_*\in\mathcal A_{A,B}$ で全ての $u\in\mathcal A_{A,B}$ に対して $J_F(u_*)\le J_F(u)$ を満たすものをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var10-admissible-functional -->
**定義の直接例。** $I=(0,1)$、$A=B=0$ とし、$F(t,z,p)=\frac12(1+z^2)p^2+\frac12z^2$ を取ります。$u(t)=t(1-t)$ は両端で0、$u'=1-2t\in L^2$ なので許容されます。$u$ は連続で有界、したがって $(1+u^2)|u'|^2$ と $u^2$ は可積分で、$J_F(u)$ は有限です。任意の $H^1$ 関数にもこの有限性が成り立つ理由は、[VAR9の一様コンパクト性命題で使った評価](../VAR9/index.md#prop-var9-uniform-compactness)から各関数が有界だからです。
<!-- definition-example-end -->

## 2. 二次成長と速度凸性を分けて読む

存在証明に必要な条件を、最初から一つずつ役割と結びつけておきます。以下、$F_z=\partial F/\partial z$、$F_p=\partial F/\partial p$ です。

<a id="def-var10-tonelli-hypotheses"></a>
<!-- formal-statement-start -->
> **定義（一次元二次成長のTonelli型条件）**  
> $F:[a,b]\times\mathbb R^2\to\mathbb R$ が次の（T1）〜（T3）を満たすとき、本章でのTonelli型条件を満たすという。
>
> **（T1）連続微分可能性：** $F$ は連続で、$z,p$ に関する一階偏導関数 $F_z,F_p$ が存在して全変数について連続である。
>
> **（T2）速度凸性と強制的な下界：** 各 $(t,z)$ で $p\mapsto F(t,z,p)$ は凸である。また定数 $\alpha>0,\beta\ge0$ が存在し、すべての $(t,z,p)$ に対して
$$
F(t,z,p)\ge\alpha |p|^2-\beta.
$$
> **（T3）局所的な二次成長：** 各 $R>0$ に定数 $C_R>0$ が存在し、$t\in[a,b]$、$|z|\le R$、$p\in\mathbb R$ に対し
$$
|F(t,z,p)|+|F_z(t,z,p)|\le C_R(1+|p|^2),
$$
$$
|F_p(t,z,p)|\le C_R(1+|p|).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-var10-tonelli-hypotheses -->
**三条件を実際に確かめる。** $F(t,z,p)=\frac12(1+z^2)p^2+\frac12z^2$ では

$$
F_z=zp^2+z,\quad F_p=(1+z^2)p,\quad F_{pp}=1+z^2\ge1.
$$

全ての偏導関数は連続です。$F_{pp}\ge0$ から（T2）の凸性が従い、$F\ge\frac12p^2$ なので $\alpha=1/2,\beta=0$ と選べます。$|z|\le R$ なら係数 $1+z^2,|z|$ は $1+R^2,R$ 以下ですから（T3）も成り立ちます。
<!-- definition-example-end -->

この条件は古典的なTonelli存在定理の最大限の一般性を主張するものではなく、**弱下半連続性の証明を読者が再計算できるようにした十分条件**です。特に $F$ の $p$ 微分可能性を要求しています。速度凸性は導関数の弱収束を扱い、下界は最小化列の導関数を制御し、$F_z$ の成長条件は位置 $u_n$ を極限 $u$ に置き換える誤差を制御します。

## 3. 弱下半連続性が成り立つ核心

$u_n\rightharpoonup u$ in $H^1$ でも、$F(t,u_n,u_n')$ の点ごとの収束は一般にはありません。ただし有界な $H^1$ 列からは[一次元の一様収束部分列](../VAR9/index.md#prop-var9-uniform-compactness)を取れます。そこで位置と速度の変化を別々に評価します。

<a id="prop-var10-weak-lsc"></a>
<!-- formal-statement-start -->
> **命題（速度凸な積分汎関数の弱逐次下半連続性）**  
> $F$ が（T1）〜（T3）を満たすとする。$u_n\rightharpoonup u$ in $H^1(a,b)$ なら、$J_F$ は各項で有限であり、
$$
J_F(u)\le\liminf_{n\to\infty}J_F(u_n).
$$
<!-- formal-statement-end -->

### 証明の見取り図

弱収束列は $H^1$ 有界です。下極限を実現する部分列を取り、さらに一様収束する部分列を選びます。（T3）から $u_n$ と $u$ の位置の差は積分後に消えます。最後に、凸関数の接線不等式を速度 $p=u'$ で適用して、弱収束する $u_n'$ を線形項として扱います。

<!-- proof-start -->
### 証明

$u_n\rightharpoonup u$ なら $\|u_n\|_{H^1}\le M$ とでき、$u$ も $H^1$ に属します。絶対連続代表元は一様有界なので $|u_n(t)|,|u(t)|\le R$ とでき、（T3）から

$$
|F(t,u_n,u_n')|\le C_R(1+|u_n'|^2)\in L^1(I).
$$

下極限 $\ell=\liminf_nJ_F(u_n)$ は（T2）により $-\beta(b-a)$ 以上です。$\ell=+\infty$ なら結論は自明なので有限とします。下極限に収束する部分列を選び、[一様収束部分列の命題](../VAR9/index.md#prop-var9-uniform-compactness)をさらに適用して、添字を付け直し $u_n\to u$ uniformly on $[a,b]$ とします。弱極限と一様極限が等しいことも同命題が保証します。

$t,p$ を固定し、位置変数について微分積分すると

$$
F(t,u_n(t),p)-F(t,u(t),p)
=\int_0^1F_z(t,u(t)+s(u_n(t)-u(t)),p)
 (u_n(t)-u(t))\,ds.
$$

線分上の位置も $[-R,R]$ にあり、（T3）から $p=u_n'(t)$ を代入して積分すると

$$
\begin{aligned}
&\left|\int_I F(t,u_n,u_n')-\int_I F(t,u,u_n')\right|\\
&\le C_R\|u_n-u\|_{\infty}
  \int_I(1+|u_n'|^2)\,dt\\
&\le C_R\|u_n-u\|_{\infty}\big((b-a)+M^2\big)\longrightarrow0.
\end{aligned}
$$

一方、各 $t$ で $p\mapsto F(t,u(t),p)$ は微分可能で凸です。**接点 $p=u'(t)$、比較点 $q=u_n'(t)$** を選び、凸性の接線不等式に代入すれば

$$
F(t,u,u_n')\ge
F(t,u,u')+F_p(t,u,u')(u_n'-u')
$$

を得ます。（T3）と $u$ の有界性から

$$
|F_p(t,u,u')|\le C_R(1+|u'|)\in L^2(I).
$$

導関数作用素 $H^1(I)\to L^2(I)$ は有界線形なので、$u_n'\rightharpoonup u'$ in $L^2(I)$ です。この弱収束を**固定された試験関数** $F_p(t,u,u')$ に適用すると

$$
\int_I F_p(t,u,u')(u_n'-u')\,dt\longrightarrow0.
$$

接線不等式を積分して下極限を取ると $\liminf_n\int F(t,u,u_n')\ge J_F(u)$。位置置換誤差は0へ収束していたので、$J_F(u)\le\ell$ です。
<!-- proof-end -->

この証明で凸性を使ったのは **$p$ のみ**です。$z$ の非凸性を禁止していません。位置変数の非凸項があっても一次元の一様収束がその項を制御できます。

## 4. 一次元Tonelli型存在定理

<a id="thm-var10-tonelli-existence"></a>
<!-- formal-statement-start -->
> **定理（固定端点の一次元Tonelli型存在定理）**  
> $a<b$、$A,B\in\mathbb R$ とし、$F:[a,b]\times\mathbb R^2\to\mathbb R$ が（T1）〜（T3）を満たすとする。このとき $\mathcal A_{A,B}$ 上の
$$
J_F(u)=\int_a^b F(t,u(t),u'(t))\,dt
$$
> は有限な最小値を持ち、その最小値を実現する $u_*\in\mathcal A_{A,B}$ が存在する。一意性や古典的な微分可能性はこの結論に含まない。
<!-- formal-statement-end -->

### 証明の見取り図

下からの二次評価で速度の $L^2$ ノルムを縛り、端点条件を使って関数全体を $H^1$ 有界にします。[Hilbert空間の弱収束部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)で極限を取り、[固定端点集合の弱逐次閉性](../VAR9/index.md#prop-var9-admissible-weak-closed)と直前の弱下半連続性を組み合わせます。

<!-- proof-start -->
### 証明

アフィン関数

$$
g(t)=A+\frac{B-A}{b-a}(t-a)
$$

は $\mathcal A_{A,B}$ に属します。（T3）と $g,g'$ の有界性から $J_F(g)<\infty$ です。また（T2）により全ての $u\in\mathcal A_{A,B}$ に対して

$$
J_F(u)\ge\alpha\|u'\|_2^2-\beta(b-a)\ge-\beta(b-a).
$$

したがって $m=\inf_{\mathcal A_{A,B}}J_F$ は実数です。$J_F(u_n)\to m$ となる最小化列を選び、有限個の初項を除いて $J_F(u_n)\le J_F(g)+1$ とできます。ゆえに

$$
\alpha\|u_n'\|_2^2
\le J_F(g)+1+\beta(b-a)
$$

が成立します。$v_n=u_n-g$ は端点0の $H_0^1(I)$ に属し、[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)により

$$
\|u_n\|_2
\le\|g\|_2+\|v_n\|_2
\le\|g\|_2+C_I(\|u_n'\|_2+\|g'\|_2).
$$

従って $\|u_n\|_{H^1}$ は有界です。[Hilbert弱収束部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)で $u_{n_k}\rightharpoonup u_*$ を取れます。[固定端点集合の弱逐次閉性](../VAR9/index.md#prop-var9-admissible-weak-closed)から $u_*\in\mathcal A_{A,B}$ です。[前節の弱下半連続性](#prop-var10-weak-lsc)を適用すると

$$
m\le J_F(u_*)\le\liminf_{k\to\infty}J_F(u_{n_k})=m.
$$

従って $J_F(u_*)=m$ となり、最小値は達成されます。
<!-- proof-end -->

**一意性は別問題です。** $F$ が速度について厳密凸でも、位置依存の非凸ポテンシャルがあれば $u$ 全体に関する凸性は保証されません。他方、強凸な位置・速度エネルギーでは一意性が得られる場合があります。

## 5. 極小点はどの方程式を満たすか

存在定理は極小点を取り出すだけで、その微分方程式を解いてはいません。ここからは、極小点へ小さな変分 $u+s v$ を加えて得る必要条件を調べます。端点を固定するため $v\in H_0^1(I)$ とします。

<a id="def-var10-weak-el"></a>
<!-- formal-statement-start -->
> **定義（弱Euler–Lagrange方程式）**  
> $F$ は（T1）〜（T3）を満たし、$u\in H^1(a,b)$ とする。任意の $v\in H_0^1(a,b)$ について
$$
\int_a^b\big[F_z(t,u,u')v+
F_p(t,u,u')v'\big]\,dt=0
$$
> が成り立つとき、$u$ は弱Euler–Lagrange方程式を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var10-weak-el -->
**定義の直接例。** $F(t,z,p)=\frac12p^2$、$u(t)=A+(B-A)(t-a)/(b-a)$ と取れば $F_z=0$、$F_p=u'=(B-A)/(b-a)$ は定数です。[区間上の絶対連続代表元](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)により、任意の $v\in H_0^1$ で $\int_a^b v'=v(b)-v(a)=0$。したがって積分恒等式を実際に満たします。
<!-- definition-example-end -->

<a id="thm-var10-weak-el-necessity"></a>
<!-- formal-statement-start -->
> **定理（最小点の弱Euler–Lagrange必要条件）**  
> $F$ が（T1）〜（T3）を満たし、$u_*\in\mathcal A_{A,B}$ が $J_F$ の最小点なら、全ての $v\in H_0^1(a,b)$ に対して
$$
\int_a^b\big[
F_z(t,u_*,u_*')v+F_p(t,u_*,u_*')v'
\big]\,dt=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

変分の変数は実数 $s$ です。$F_z$ は $p$ の二乗程度、$F_p$ は一次程度の成長なので、$s$ 微分の中身に積分可能な共通上界を作れます。これにより微分と積分を交換し、$s=0$ が最小点であることを使います。

<!-- proof-start -->
### 証明

$v\in H_0^1(I)$ を固定し、$\phi(s)=J_F(u_*+sv)$ と置きます。全ての $s\in\mathbb R$ で端点は $A,B$ のままで、$\phi(0)\le\phi(s)$ です。

$u_*,v\in H^1(I)$ は連続代表元で有界です。$|s|\le1$ とすれば $|u_*+sv|\le R$、かつ

$$
|u_*'+sv'|^2\le2|u_*'|^2+2|v'|^2.
$$

被積分関数の $s$ に関する導関数は連鎖律から

$$
\frac d{ds}F(t,u_*+sv,u_*'+sv')
=F_z(t,u_*+sv,u_*'+sv')v
 +F_p(t,u_*+sv,u_*'+sv')v'.
$$

（T3）から第一項の絶対値は $C_R\|v\|_\infty(1+2|u_*'|^2+2|v'|^2)$ 以下、第二項は

$$
C_R(1+|u_*'|+|v'|)|v'|
$$

以下です。ともに $L^1(I)$ に属します。したがって一変数平均値の定理と優収束定理を適用でき、積分の微分と $s\to0$ の極限を交換して

$$
\phi'(0)=\int_I\big[F_z(t,u_*,u_*')v+
F_p(t,u_*,u_*')v'\big]\,dt
$$

を得ます。$s=0$ は微分可能な実関数 $\phi$ の最小点だから $\phi'(0)=0$ です。
<!-- proof-end -->

弱形式が得られたことは、直ちに $u_*\in C^2$ を意味しません。弱形式のうち $F_p$ に注目すると、少し先まで導けます。

<a id="prop-var10-flux-ac"></a>
<!-- formal-statement-start -->
> **命題（運動量流束の絶対連続性）**  
> $F$ が（T1）〜（T3）を満たし、$u\in H^1(a,b)$ が弱Euler–Lagrange方程式を満たすなら
$$
q(t)=F_p(t,u(t),u'(t))
$$
> は $W^{1,1}(a,b)$ に属し、絶対連続代表元について
$$
q'(t)=F_z(t,u(t),u'(t))\quad\text{a.e. on }(a,b)
$$
> である。したがって運動量流束 $q$ は連続な代表元を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

弱式を試験関数による分布微分の定義と比べます。$F_z$ の二次成長から右辺は $L^1$、$F_p$ の一次成長から $q\in L^2\subset L^1$ です。分布微分が $L^1$ に属する一次元関数は絶対連続代表元を持ちます。

<!-- proof-start -->
### 証明

$u$ が有界なので（T3）より $g(t)=F_z(t,u,u')\in L^1(I)$、$q(t)=F_p(t,u,u')\in L^2(I)\subset L^1(I)$ です。弱式を $v\in C_c^\infty(I)$ に適用すれば

$$
\int_Iq(t)v'(t)\,dt=-\int_Ig(t)v(t)\,dt.
$$

よって分布微分 $Dq=g$ です。$Q(t)=\int_a^t g(s)\,ds$ は絶対連続で $DQ=g$ ですから $D(q-Q)=0$。分布微分が0の局所可積分関数は定数にほとんど至る所等しく、従って $q=Q+c$ a.e. です。これは $q$ の絶対連続代表元であり、その導関数は $g$ にほとんど至る所等しいことを示します。
<!-- proof-end -->

## 6. 古典Euler–Lagrange方程式へ進める条件

滑らかさを引き出すには、速度に関する流束 $F_p$ から速度 $u'$ を取り戻す必要があります。凸というだけでは逆関数を作れません。**速度方向の一様な正の曲率**は、流束から速度を一意に解くための十分条件です。

<a id="thm-var10-classical-regularity"></a>
<!-- formal-statement-start -->
> **定理（強い速度凸性の下での一次元正則性）**  
> $F$ が（T1）〜（T3）を満たし、さらに全変数について $C^2$ 級で、定数 $\mu>0$ により
$$
F_{pp}(t,z,p)\ge\mu
$$
> が全ての $(t,z,p)\in[a,b]\times\mathbb R^2$ で成り立つとする。このとき固定端点最小点 $u_*$ は $C^2([a,b])$ に属し、内部で古典Euler–Lagrange方程式
$$
\frac d{dt}F_p(t,u_*,u_*')=F_z(t,u_*,u_*')
$$
> を満たす。特に
$$
u_*''=\frac{F_z-F_{pt}-F_{pz}u_*'}{F_{pp}}
\quad\text{（全て $(t,u_*,u_*')$ で評価）}
$$
> である。
<!-- formal-statement-end -->

### 証明の見取り図

[運動量流束の絶対連続性](#prop-var10-flux-ac)から $q=F_p(t,u_*,u_*')$ は連続です。$F_{pp}\ge\mu$ なら $p\mapsto F_p(t,z,p)$ は増加し、逆関数も連続です。よって $u'$ が連続となります。すると右辺 $F_z(t,u,u')$ も連続なので $q$ は $C^1$ となり、連鎖律で $u''$ を解けます。

<!-- proof-start -->
### 証明

前の[弱形式の必要条件](#thm-var10-weak-el-necessity)と[流束命題](#prop-var10-flux-ac)により、$q=F_p(t,u_*,u_*')$ は連続代表元を持ち、$q'=F_z(t,u_*,u_*')$ がほとんど至る所成立します。

$t,z$ を固定すると、平均値の定理から $p_2>p_1$ について

$$
F_p(t,z,p_2)-F_p(t,z,p_1)\ge\mu(p_2-p_1).
$$

従って $p\mapsto F_p(t,z,p)$ は狭義増加で、$p\to\pm\infty$ のとき値は $\pm\infty$ へ向かいます。ゆえに任意の実数 $q$ に対し $F_p(t,z,p)=q$ の解 $p=P(t,z,q)$ がただ一つあります。

逆関数 $P$ の連続性も確かめます。$(t_n,z_n,q_n)\to(t,z,q)$ と置き、$p_n=P(t_n,z_n,q_n)$ とすると、上の不等式に $p_1=0$ を使って

$$
\mu|p_n|\le |q_n-F_p(t_n,z_n,0)|
$$

となり、$p_n$ は有界です。任意の収束部分列の極限 $p_\infty$ は連続性から $F_p(t,z,p_\infty)=q$ を満たし、一意性により $p_\infty=P(t,z,q)$ です。ゆえに全列 $p_n$ が同じ値へ収束し、$P$ は連続です。

$u_*$ と $q$ は連続なので $P(t,u_*(t),q(t))$ も連続です。これはほとんど至る所 $u_*'$ に等しいため、[絶対連続代表元の基本定理](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)から $u_*$ は $C^1$ となります。

すると $F_z(t,u_*,u_*')$ は連続であり、

$$
q(t)=q(a)+\int_a^tF_z(s,u_*(s),u_*'(s))\,ds
$$

から $q\in C^1$ です。$F\in C^2$ と $u_*\in C^1$ の下で $F_p(t,u_*,u_*')=q(t)$ を微分すると

$$
F_{pt}+F_{pz}u_*'+F_{pp}u_*''=q'=F_z.
$$

ここで $F_{pp}\ge\mu>0$ なので、$F_p(t,z,p)-q=0$ に陰関数定理を適用でき、$p=P(t,z,q)$ は局所的に $C^1$ です。従って $u_*\in C^1$、$q\in C^1$ を代入すると $u_*^{\prime}=P(t,u_*,q)$ は $C^1$ です。連鎖律と $F_{pp}\ge\mu$ による除算から右辺は連続です。従って $u_*'$ は $C^1$、すなわち $u_*\in C^2$ で、表示した式が成り立ちます。
<!-- proof-end -->

上の逆関数の微分については、まず連続な速度が得られてから、$F_{pp}\ne0$ に対する一変数の逆関数定理を用いれば局所的に微分可能です。$\mu$ を下界に持つことが「$F_{pp}$ で割ってよい」理由になります。

**具体例。** $F(t,z,p)=\frac12p^2+\frac12z^2$ は全条件を満たします。$I=(0,1)$、$u(0)=0,u(1)=1$ の最小点候補は

$$
u_*(t)=\frac{\sinh t}{\sinh1},\quad u_*''=u_*,\quad
F_p=u_*',\quad F_z=u_*.
$$

任意の $v\in H_0^1(0,1)$ に対し、部分積分で $\int(u_*'v'+u_*v)=0$。差の平方展開から

$$
J_F(u_*+v)-J_F(u_*)
=\frac12\int_0^1(|v'|^2+|v|^2)\,dt\ge0.
$$

等号は $v=0$ のときだけなので、これは存在・古典方程式・一意性を同時に確かめる例です。

## 7. 弱解と境界条件：滑らかとは限らない

時刻に依存する材質が急に切り替わる場合、速度そのものより**運動量流束の連続性**が先に現れます。$I=(0,1)$、$u(0)=0,u(1)=1$ として

$$
a(t)=
\begin{cases}
1 &(0<t<1/2),\\
2 &(1/2<t<1)
\end{cases},\qquad
J(u)=\frac12\int_0^1a(t)|u'|^2\,dt
$$

を考えます。これは時刻方向に不連続なので（T1）には入りませんが、$1\le a\le2$ の二次エネルギーには直接法を個別に適用できます。最小点の流束 $q=a(t)u'(t)$ は弱形式で $q'=0$ ですから一定値 $c$。端点差から

$$
1=u(1)-u(0)=c\int_0^1\frac{dt}{a(t)}
=c\left(\frac12+\frac14\right),
\qquad c=\frac43.
$$

よって

$$
u'(t)=
\begin{cases}
4/3 &(0<t<1/2),\\
2/3 &(1/2<t<1).
\end{cases}
$$

速度は中点で跳び、$u$ は $C^1$ ではありません。**弱Euler–Lagrange方程式が成立しても、係数の時刻正則性がなければ古典的な $C^2$ 解とは限らない**ことが分かります。これは本章の存在定理へ不連続な $F$ を無条件に代入した議論ではなく、明示的な別計算です。

固定端点と自由端点も区別します。前節までの弱形式は $v(a)=v(b)=0$ を使いました。自由端点の最小点が別途存在すると分かっているときは、$H^1$ の全方向 $v$ を使えるため、流束 $q$ の絶対連続性と部分積分から

$$
0=\int_a^b(gv+qv')dt
=\int_a^b(g-q')v\,dt+q(b)v(b)-q(a)v(a)
$$

となります。内部で $q'=g=F_z$、端点値 $v(a),v(b)$ は独立に選べるので $q(a)=q(b)=0$ が必要です。これが[自由端点の自然境界条件](../VAR1/index.md#thm-var1-natural-boundary)の弱形式での意味です。**固定端点では $v(a)=v(b)=0$ のため、この境界条件は導けません。**

## 8. 速度凸性を落とすと最小値さえ失われうる

弱下半連続性が壊れる例を、単なる抽象汎関数ではなく積分汎関数そのもので作ります。$W$ を

$$
W(p)=\frac{(p^2-1)^2}{1+p^2}
=p^2-3+\frac4{1+p^2}
$$

と置き、$\mathcal A_{0,0}=H_0^1(0,1)$ 上で

$$
J(u)=\int_0^1\big(W(u'(t))+u(t)^2\big)\,dt
$$

を考えます。$W\ge0$、$W(\pm1)=0$、$W(0)=1$ です。$W''(0)=-6<0$ より速度凸性を失いますが、$W(p)\ge p^2-3$ なので導関数の二次強制性は残ります。$W$ とその導関数の成長は二次・一次程度で、位置項 $u^2$ も（T3）を満たします。

<a id="prop-var10-nonconvex-nonattainment"></a>
<!-- formal-statement-start -->
> **命題（速度非凸な強制的汎関数の非達成例）**  
> $W(p)=(p^2-1)^2/(1+p^2)$ とし、$H_0^1(0,1)$ 上
$$
J(u)=\int_0^1\big(W(u')+u^2\big)\,dt
$$
> と定める。このとき $J\ge0$ で強制的、$\inf J=0$ だが最小点は存在しない。また $H_0^1$ の弱収束に関して弱逐次下半連続でない。
<!-- formal-statement-end -->

### 証明の見取り図

速度が $+1$ と $-1$ の小さな鋸歯状曲線は、微分の絶対値を1に保ちながら関数の振幅だけを0へ近づけます。したがって勾配エネルギーは0なのに、極限の速度0では勾配エネルギーが1へ跳ね上がります。

<!-- proof-start -->
### 証明

$W(p)\ge0$ より $J(u)\ge0$ です。また $W(p)\ge p^2-3$ なので

$$
J(u)\ge\|u'\|_2^2-3.
$$

[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から $\|u\|_{H^1}\to\infty$ なら $\|u'\|_2\to\infty$、従って $J$ は強制的です。

各 $n\ge1$ で区間を長さ $1/n$ の $n$ 個の小区間に分け、各小区間の前半は傾き $+1$、後半は傾き $-1$、左端の値を0にした連続な鋸歯関数 $u_n$ を作ります。各小区間の右端でも0なので $u_n\in H_0^1(0,1)$ で、

$$
|u_n'|=1\quad\text{a.e.},\qquad
0\le u_n(t)\le\frac1{2n}.
$$

各小区間の $u_n^2$ の積分は二つの三角部分から

$$
2\int_0^{1/(2n)}s^2\,ds=\frac1{12n^3}.
$$

ゆえに $W(u_n')=0$ かつ

$$
J(u_n)=\int_0^1u_n^2\,dt=\frac1{12n^2}\longrightarrow0.
$$

最小値0が達成されると仮定すると、非負な二つの項の積分が0なので $u^2=0$ a.e. と $W(u')=0$ a.e. が両方成り立ちます。しかし $u=0$ in $H^1$ なら $u'=0$ a.e. で $W(u')=W(0)=1$、矛盾します。従って最小点は存在しません。

さらに $\|u_n'\|_2=1$、$u_n\to0$ uniformly です。滑らかな $\varphi$ に対し端点が0なので

$$
\int_0^1u_n'\varphi\,dt
=-\int_0^1u_n\varphi'\,dt\longrightarrow0.
$$

滑らかな関数の $L^2$ 稠密性と $\|u_n'\|_2=1$ から任意の $\varphi\in L^2$ でも積分は0へ収束します。従って $u_n\rightharpoonup0$ in $H_0^1$ です。ところが

$$
J(0)=W(0)=1>
\liminf_{n\to\infty}J(u_n)=0.
$$

弱下半連続性が破れます。存在定理の証明で用いた「速度凸性による接線不等式」が使えなくなったことが失敗の機構です。
<!-- proof-end -->

この例は **位置の非凸性**ではなく**速度の非凸性**が本質です。$u^2$ は凸ですが、微細な振動が速度エネルギーを下げてしまいます。高次元で弱下半連続性を扱う際の条件はさらに繊細になります。

## 9. 演習

### Level A


<a id="ex-var10-a01"></a>
#### VAR10-A01 Tonelli型三条件の検査
- Level: A

$F(t,z,p)=\frac12(1+z^2)p^2+\frac12z^2$ が（T1）〜（T3）を満たすことを、$F_z,F_p,F_{pp}$ と下界を計算して示せ。

<!-- solution-start -->
### 詳細解答

直接微分して
$$
F_z=zp^2+z,\qquad F_p=(1+z^2)p,\qquad F_{pp}=1+z^2\ge1.
$$
全て連続なので（T1）が成立します。$F_{pp}>0$ により $p$ に関し凸です。$\frac12z^2\ge0$ と $1+z^2\ge1$ より $F\ge\frac12p^2$ で、（T2）は $\alpha=1/2,\beta=0$ とすればよいです。$|z|\le R$ では
$$
|F|\le\tfrac12(1+R^2)p^2+\tfrac12R^2,\quad
|F_z|\le R(p^2+1),\quad |F_p|\le(1+R^2)|p|.
$$
これらを $C_R(1+p^2)$ と $C_R(1+|p|)$ で抑えられるので（T3）も成立します。
<!-- solution-end -->


<a id="ex-var10-a02"></a>
#### VAR10-A02 境界条件からの $H^1$ 評価
- Level: A

$u\in H^1(a,b)$、$u(a)=A$、$L=b-a$ とする。$\|u\|_2$ と $\|u\|_\infty$ を $A,L,\|u'\|_2$ で抑えよ。

<!-- solution-start -->
### 詳細解答

[絶対連続代表元の基本定理](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)から各 $t$ で
$$
u(t)=A+\int_a^t u'(s)\,ds.
$$
Cauchy–Schwarzにより
$$
|u(t)|\le |A|+\sqrt{t-a}\,\|u'\|_2
\le |A|+\sqrt L\,\|u'\|_2.
$$
よって $\|u\|_\infty$ にも同じ上界が使えます。区間長で積分すると
$$
\|u\|_2\le\sqrt L\|u\|_\infty
\le\sqrt L|A|+L\|u'\|_2.
$$
速度の $L^2$ ノルムの有界性から $H^1$ ノルムの有界性が従う箇所を、端点条件だけで再構成できました。
<!-- solution-end -->


<a id="ex-var10-a03"></a>
#### VAR10-A03 弱Euler–Lagrange方程式の直接検査
- Level: A

$F(t,z,p)=\frac12p^2+\frac12z^2$、$I=(0,1)$、$u(t)=\sinh t/\sinh1$ とする。$u(0)=0,u(1)=1$ と弱Euler–Lagrange方程式を確かめよ。

<!-- solution-start -->
### 詳細解答

$u(0)=0$、$u(1)=\sinh1/\sinh1=1$ で、$u'(t)=\cosh t/\sinh1$、$u''(t)=\sinh t/\sinh1=u(t)$ です。$F_z=z,F_p=p$ を[弱形式](#def-var10-weak-el)に代入すると、示すべき式は
$$
\int_0^1(uv+u'v')\,dt=0
$$
です。任意の $v\in H_0^1$ に対し絶対連続代表元で部分積分でき、
$$
\int_0^1u'v'\,dt
=[u'v]_0^1-\int_0^1u''v\,dt
=-\int_0^1uv\,dt.
$$
両端で $v=0$ を使ったので境界項が消え、弱形式が成立します。
<!-- solution-end -->


<a id="ex-var10-a04"></a>
#### VAR10-A04 速度凸性と正則性の違い
- Level: A

$F(t,z,p)=\frac12a(t)p^2$、$a(t)=1$（$t<1/2$）、$a(t)=2$（$t>1/2$）とする。速度凸性が成立すること、（T1）が成立しないことを区別せよ。

<!-- solution-start -->
### 詳細解答

ほとんど全ての $t$ に対し $F_{pp}=a(t)\in\{1,2\}$ なので $p\mapsto F(t,z,p)$ は厳密凸です。しかし $p=1$ を固定して $t\uparrow1/2$ と $t\downarrow1/2$ の極限を見ると
$$
\lim_{t\uparrow1/2}F(t,z,1)=\tfrac12,\qquad
\lim_{t\downarrow1/2}F(t,z,1)=1.
$$
よって $F$ は $t$ で連続でなく（T1）が失われます。速度凸性だけから時間正則性や古典解は導けません。
<!-- solution-end -->


<a id="ex-var10-a05"></a>
#### VAR10-A05 第一変分の積分可能な上界
- Level: A

$F$ は（T3）を満たすとする。$u,v\in H^1(a,b)$、$|s|\le1$ のとき、$F_z(t,u+sv,u'+sv')v$ と $F_p(t,u+sv,u'+sv')v'$ が $L^1$ の共通上界を持つことを示せ。

<!-- solution-start -->
### 詳細解答

[区間上の $H^1$ 連続代表元](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)から $R=\|u\|_\infty+\|v\|_\infty$ は有限です。$|s|\le1$ で $|u+sv|\le R$ かつ $|u'+sv'|^2\le2|u'|^2+2|v'|^2$。従って
$$
|F_z(\cdots)v|
\le C_R\|v\|_\infty(1+2|u'|^2+2|v'|^2).
$$
また
$$
|F_p(\cdots)v'|
\le C_R(1+|u'|+|v'|)|v'|.
$$
後者は $|u'||v'|\le(|u'|^2+|v'|^2)/2$ と $|v'|\le(1+|v'|^2)/2$ で $L^1$ の関数に抑えられます。よって[第一変分の必要条件](#thm-var10-weak-el-necessity)の積分微分交換が正当化されます。
<!-- solution-end -->


<a id="ex-var10-b01"></a>
#### VAR10-B01 状態依存質量の弱方程式
- Level: B

$I=(0,1)$、$u(0)=u(1)=0$、$F(t,z,p)=\frac12(1+z^2)p^2+\frac12z^2$ とする。存在を示し、弱Euler–Lagrange方程式と古典方程式を求め、最小点を特定せよ。

<!-- solution-start -->
### 詳細解答

[Tonelli型存在定理](#thm-var10-tonelli-existence)の仮定はA01で検証済みなので最小点が存在します。$F_z=zp^2+z$、$F_p=(1+z^2)p$ を[弱EL必要条件](#thm-var10-weak-el-necessity)に代入すると
$$
\int_0^1\{(uu'^2+u)v+(1+u^2)u'v'\}\,dt=0.
$$
$F$ は $C^2$ かつ $F_{pp}=1+z^2\ge1$ なので[正則性定理](#thm-var10-classical-regularity)より最小点は $C^2$。流束の微分を計算すると
$$
\frac d{dt}[(1+u^2)u']
=(1+u^2)u''+2u(u')^2.
$$
従って $uu'^2+u=(1+u^2)u''+2uu'^2$、すなわち
$$
(1+u^2)u''+u(u')^2-u=0.
$$
零関数は境界を満たし $J(0)=0$ です。任意の $u$ に $J(u)\ge\frac12\int (|u'|^2+u^2)\ge0$ が成り立ち、等号なら $u=0$ a.e. です。ゆえに最小点はただ一つ $u=0$ です。
<!-- solution-end -->


<a id="ex-var10-b02"></a>
#### VAR10-B02 異質媒質の流束と最小値
- Level: B

$H^1(0,1)$ の $u(0)=0,u(1)=1$ について $J(u)=\frac12\int_0^1a(t)|u'|^2dt$、$a=1$ on $(0,1/2)$、$a=2$ on $(1/2,1)$。最小点を式で与え、最小値と正則性を判定せよ。

<!-- solution-start -->
### 詳細解答

全ての許容 $u$ で Cauchy–Schwarz を $1=\int u'=\int(\sqrt a\,u')(1/\sqrt a)$ に適用すると
$$
1\le\left(\int_0^1a|u'|^2dt\right)
\left(\int_0^1\frac{dt}{a}\right)
=\frac34\int_0^1a|u'|^2dt.
$$
したがって $J(u)\ge2/3$ です。等号条件は $\sqrt a\,u'=c/\sqrt a$、すなわち $u'=c/a$。端点差から $c=4/3$ です。積分して
$$
u_*(t)=
\begin{cases}
4t/3 &(0\le t\le1/2),\\
2/3+(2/3)(t-1/2) &(1/2\le t\le1).
\end{cases}
$$
$u_*(1)=1$、$J(u_*)=\frac12(4/3)^2(3/4)=2/3$。導関数は中点で $4/3$ から $2/3$ へ跳ぶので $u_*\notin C^1$。一方 $au_*'=4/3$ は一定で、弱方程式を満たします。
<!-- solution-end -->


<a id="ex-var10-b03"></a>
#### VAR10-B03 非定数係数と平方完成
- Level: B

$I=(0,1)$、$H_0^1$ 上 $F(t,z,p)=\frac12(1+t)p^2-(1+4t)z$ とする。存在定理の仮定を確認し、$u_*(t)=t(1-t)$ が唯一の最小点であることを示せ。

<!-- solution-start -->
### 詳細解答

$F_z=-(1+4t)$、$F_p=(1+t)p$、$F_{pp}=1+t\ge1$、偏導関数は連続です。ただし全 $z$ について $F\ge\alpha p^2-\beta$ という（T2）の**大域下界は成立しません**。従って[本章のTonelli型存在定理](#thm-var10-tonelli-existence)をそのまま適用するのは誤りです。代わりに固定端点集合上で[VAR9の直接法](../VAR9/index.md#thm-var9-direct-method)を使います。

$| \int_0^1(1+4t)u|\le \|1+4t\|_2\|u\|_2$、[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から $\|u\|_2\le C\|u'\|_2$。よって
$$
J(u)\ge\tfrac12\|u'\|_2^2-C\|1+4t\|_2\|u'\|_2,
$$
で強制性が成立します。速度二次項は係数 $1+t\ge1$ を持つ弱下半連続なノルム平方、線形項は弱連続なので直接法で存在します。

候補は $u_*'=1-2t$、$(1+t)u_*'=1-t-2t^2$、従って
$$
-\frac d{dt}[(1+t)u_*']=1+4t.
$$
任意の $v\in H_0^1$ に部分積分を適用して $\int_0^1(1+t)u_*'v'=\int_0^1(1+4t)v$ を得ます。そこで
$$
J(u_*+v)-J(u_*)=\tfrac12\int_0^1(1+t)|v'|^2dt\ge0.
$$
等号なら $v'=0$、端点0より $v=0$ で一意です。「十分条件を満たさない」と「存在しない」を取り違えてはいけません。
<!-- solution-end -->


<a id="ex-var10-b04"></a>
#### VAR10-B04 自由端点の自然境界条件
- Level: B

全 $H^1(0,1)$ 上で $J(u)=\frac12\int_0^1(u'^2+(u-1)^2)dt$ を最小化する。弱式から自然境界条件を導き、最小点の存在・一意性を示せ。

<!-- solution-start -->
### 詳細解答

全方向 $v\in H^1$ の変分を使うと
$$
0=\int_0^1(u'v'+(u-1)v)dt.
$$
コンパクト台の $v$ に制限すれば分布として $u''=u-1$ です。係数は滑らかなので $u$ は $C^2$ となり、一般の $v$ に部分積分すると
$$
0=[u'v]_0^1+\int_0^1(-u''+u-1)v\,dt
=u'(1)v(1)-u'(0)v(0).
$$
両端値は独立に選べるため $u'(0)=u'(1)=0$。定数関数 $u=1$ は境界も満たし $J(1)=0$ です。$J(u)\ge0$ で、等号なら $u'=0$ と $u-1=0$ がともにほとんど至る所成り立ちます。従って唯一の最小点は $u=1$ です。固定端点変分だけなら端点の $u'$ をゼロと結論できません。
<!-- solution-end -->


<a id="ex-var10-c01"></a>
#### VAR10-C01 存在・弱形式・正則性・非凸反例の比較
- Level: C

$I=(0,1)$、端点0の $H_0^1$ を考える。

1. $F_1(t,z,p)=\frac12(1+z^2)p^2+\frac12z^2$ について、最小値の存在、一意性、弱Euler–Lagrange方程式、古典正則性を順に証明せよ。
2. $W(p)=(p^2-1)^2/(1+p^2)$、$F_2(t,z,p)=W(p)+z^2$ へ変更すると、どの仮定が失われ、なぜ最小値の達成が失敗するか、具体列で示せ。

<!-- solution-start -->
### 詳細解答

**1.** $F_{1p}=(1+z^2)p$、$F_{1z}=zp^2+z$、$F_{1pp}=1+z^2\ge1$ と計算します。$F_1\ge\frac12p^2$ で（T1）〜（T3）も成り立つため[一次元存在定理](#thm-var10-tonelli-existence)を適用できます。零関数が許容され $J_{F_1}(0)=0$、任意の $u$ では
$$
J_{F_1}(u)=\tfrac12\int_0^1[(1+u^2)|u'|^2+u^2]dt\ge0.
$$
等号なら $u=0$ a.e. なので最小点は一意です。[弱EL必要条件](#thm-var10-weak-el-necessity)は
$$
\int_0^1[(uu'^2+u)v+(1+u^2)u'v']dt=0
\quad(v\in H_0^1).
$$
最小点 $u=0$ を代入すると積分は0になります。また $F_1$ は $C^2$、$F_{1pp}\ge1$ なので[正則性定理](#thm-var10-classical-regularity)が適用でき、最小点は $C^2$ です。古典方程式は流束の微分を展開して
$$
(1+u^2)u''+u(u')^2-u=0,
$$
であり $u=0$ はこれを満たします。

**2.** $W(0)=1$、$W(\pm1)=0$、$W(p)\ge p^2-3$ です。$W''(0)=-6$ なので速度凸性（T2）のうち凸性だけが破れます。長さ $1/n$ の各区間で前半傾き $+1$、後半傾き $-1$ にした鋸歯関数 $u_n$ は両端0、$\|u_n\|_\infty\le1/(2n)$、$|u_n'|=1$ a.e.。したがって
$$
J_{F_2}(u_n)=\int_0^1u_n^2dt
=n\cdot2\int_0^{1/(2n)}t^2dt
=\frac1{12n^2}\to0.
$$
しかし最小値0を取る $u$ があれば $u^2=0$ a.e. と $W(u')=0$ a.e. の両方が必要です。前者から $u'=0$、後者から $|u'|=1$ となり矛盾します。さらに $u_n'\rightharpoonup0$ は滑らかな試験関数への部分積分と $\|u_n'\|_2=1$ から従い、$J_{F_2}(0)=1>\liminf J_{F_2}(u_n)=0$ です。凸性による接線不等式がなくなり、直接法の弱下半連続性の段階で失敗します。
<!-- solution-end -->

---

## 10. 到達点と接続

一変数積分汎関数の最小値の存在には、最小化列を制御する二次下界、極限で境界条件を残す弱閉性、導関数の弱収束と整合する速度凸性が役立ちます。弱Euler–Lagrange方程式は最小点の必要条件ですが、最小点の存在・一意性・古典正則性とは別の命題です。流束は連続でも速度が連続しない例、強制性があるのに速度の非凸性で最小値が達成されない例が、その違いを可視化しました。

次のVAR11では最小点に限定せず、鞍点を含む臨界点を探すためのPalais–Smale条件・Ekeland変分原理・minimaxへ進みます。衝突特異性を持つ作用積分などは本章の連続性・成長条件を満たすとは限らないので、個別の許容集合と特異点の検討が必要です。
