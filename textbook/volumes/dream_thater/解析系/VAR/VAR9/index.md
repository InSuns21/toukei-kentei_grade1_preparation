# VAR9 H¹弱収束と最小化の直接法

[VAR8の第二変分](../VAR8/index.md#thm-var8-second-variation)は、既に見つかった停留点が安定かどうかを判定しました。しかし、曲線や関数の候補をいくら改良しても、そもそも最小値を実現する関数が存在する保証はありません。有限次元の閉有界集合上なら収束部分列を探せますが、関数の集まりでは通常の意味での強い収束は得られないことがあります。

そこで本章では、[GPDE3のSobolev空間](../../GPDE/GPDE3/index.md#def-gpde3-sobolev-space)で変分問題を定式化し、[Hilbert空間の有界列からの弱収束部分列](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を使って最小化列から極限を取り出します。極限が制約を満たし、エネルギーが極限で増えないことを確認する手順を**最小化の直接法**として証明します。弱収束の一般論とSobolev空間の完備性を再証明するのではなく、「その定理を変分問題へどう適用するか」を新しく扱います。

## 1. 区間上の許容関数を選ぶ

有界区間 $I=(a,b)$、長さ $L=b-a>0$ を固定し、実数値関数を扱います。$H^1(I)=W^{1,2}(I)$ の各要素はほとんど至る所一致する関数の同値類ですが、[区間上の絶対連続代表元の定理](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)によって連続代表元を一意に選べます。したがって端点値を論じる場合はその代表元を用います。

内積とノルムは
$$
\langle u,v\rangle_{H^1}
=\int_a^b(uv+u'v')\,dt,\qquad
\|u\|_{H^1}^2=\|u\|_{L^2}^2+\|u'\|_{L^2}^2
$$
とします。この空間がHilbert空間であることは[GPDE3の完備内積構造](../../GPDE/GPDE3/index.md#thm-gpde3-hk-hilbert)から従います。

変分問題では、境界条件を数式の後から付け足すのでなく、**最初から解候補の集合に組み込む**ことが重要です。

<a id="def-var9-admissible"></a>
<!-- formal-statement-start -->
> **定義（区間上の三つの許容集合）**  
> $I=(a,b)$ と $A,B\in\mathbb R$ に対し、次の $H^1(I)$ の部分集合を考える。等号に現れる端点値は連続代表元のトレースである。
>
> **（1）固定端点集合**
$$
\mathcal A_{A,B}=\{u\in H^1(I):u(a)=A,\ u(b)=B\}.
$$
> **（2）周期集合**
$$
H^1_{\mathrm{per}}(I)=\{u\in H^1(I):u(a)=u(b)\}.
$$
> **（3）平均零の周期集合**
$$
\mathcal P_0=\left\{u\in H^1_{\mathrm{per}}(I):\int_a^b u(t)\,dt=0\right\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-var9-admissible -->
**定義の確認**。 $I=(0,1)$ で $u(t)=t(1-t)$ は両端0なので $\mathcal A_{0,0}$ に属します。$v(t)=\sin(2\pi t)$ は両端0で値が一致し、積分も0なので $\mathcal P_0$ に属します。一方、定数 $w(t)=3$ は周期集合に属しますが、積分は3であり $\mathcal P_0$ に属しません。
<!-- definition-example-end -->

[GPDE4の区間トレース定理](../../GPDE/GPDE4/index.md#thm-gpde4-trace-interval)は端点評価が $H^1$ 上の連続な線形写像であることを保証します。平均値についても[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から
$$
\left|\int_a^b u\,dt\right|\le\sqrt L\,\|u\|_{L^2}\le\sqrt L\,\|u\|_{H^1}
$$
です。よって上の集合は連続線形汎関数の等式制約として記述できます。

## 2. 弱収束は何を保存するか

$H^1$ での弱収束 $u_n\rightharpoonup u$ は、あらゆる $v\in H^1(I)$ に対し $\langle u_n,v\rangle_{H^1}\to\langle u,v\rangle_{H^1}$ が成立することです。特に $H^1$ 上の連続線形汎関数の値は極限へ移ります。しかし、**非線形な集合の制約を任意に保存するわけではありません**。

<a id="def-var9-weak-closed"></a>
<!-- formal-statement-start -->
> **定義（弱逐次閉集合）**  
> Hilbert空間 $H$ の集合 $C\subset H$ を**弱逐次閉**というのは、$u_n\in C$ かつ $u_n\rightharpoonup u$ in $H$ なら必ず $u\in C$ となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var9-weak-closed -->
**定義の確認**。 $u_n\in\mathcal A_{0,0}$ が $H^1$ 弱収束したとします。[トレースの連続性](../../GPDE/GPDE4/index.md#thm-gpde4-trace-interval)より $u_n(a)\to u(a)$、$u_n(b)\to u(b)$ なので $u(a)=u(b)=0$ です。したがって $\mathcal A_{0,0}$ は弱逐次閉です。周期条件と平均零条件についても同じ論法が使えます。
<!-- definition-example-end -->

<a id="prop-var9-admissible-weak-closed"></a>
<!-- formal-statement-start -->
> **命題（三つの許容集合の弱逐次閉性）**  
> 任意の $a<b$ と $A,B\in\mathbb R$ に対し、$\mathcal A_{A,B}$、$H^1_{\mathrm{per}}(I)$、$\mathcal P_0$ はいずれも $H^1(I)$ の非空な弱逐次閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

端点の差と区間積分は連続線形汎関数です。弱収束の定義で各等式を極限へ移すだけで、制約を失わないことが分かります。

<!-- proof-start -->
### 証明

$u_n\rightharpoonup u$ を $H^1(I)$ の弱収束とします。端点評価 $T_a(u)=u(a)$、$T_b(u)=u(b)$ は[区間上のH^1トレース](../../GPDE/GPDE4/index.md#thm-gpde4-trace-interval)により有界線形です。Hilbert空間上の有界線形汎関数は弱収束を保存するため
$$
T_a(u_n)\to T_a(u),\qquad T_b(u_n)\to T_b(u).
$$
$u_n(a)=A$、$u_n(b)=B$ なら極限でも同じ等式が成立します。また周期条件 $T_a(u_n)-T_b(u_n)=0$ も極限で保存されます。平均汎関数 $M(u)=\int_a^b u$ の有界性は直前のCauchy–Schwarz評価から従い、$M(u_n)=0$ なら $M(u)=0$ です。

非空性は、固定端点集合ではアフィン関数
$$
g(t)=A+\frac{B-A}{L}(t-a)
$$
を、周期・平均零集合では零関数をそれぞれ取れば分かります。
<!-- proof-end -->

**弱閉性を落とすとどうなるか。** 実数直線の開集合 $C=(0,1)$ 上で $J(x)=x^2$ を最小化すると、$x_n=1/n$（$n\ge2$）は $J(x_n)\to0$ ですが $0\notin C$ なので最小値は達成されません。有限次元でも「閉性」は本質的です。

## 3. 一次元の有界列は一様収束部分列も持つ

弱収束は導関数の二乗エネルギーを扱うのに十分です。他方、$V(u)$ のような非線形な位置依存項を極限へ移すには、区間上ならもっと強い収束が得られます。必要な一次元の場合を具体的に証明します。

<a id="prop-var9-uniform-compactness"></a>
<!-- formal-statement-start -->
> **命題（区間上のH1有界列の一様コンパクト性）**  
> 有界区間 $I=(a,b)$ において $\sup_n\|u_n\|_{H^1(I)}<\infty$ なら、各 $u_n$ の連続代表元から $[a,b]$ 上一様収束する部分列を取れる。さらに $u_n\rightharpoonup u$ in $H^1(I)$ が分かっているとき、その部分列の一様極限は $u$ の連続代表元である。
<!-- formal-statement-end -->

### 証明の見取り図

[GPDE4の絶対連続代表元](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)を使うと、関数値の差を導関数の積分で評価できます。これにより一様な $1/2$-Hölder評価を得て、細かい格子点での収束を区間全体へ広げます。

<!-- proof-start -->
### 証明

$M=\sup_n\|u_n\|_{H^1}<\infty$ とします。任意の $x,y\in[a,b]$ に対し、絶対連続性とCauchy–Schwarzから
$$
|u_n(x)-u_n(y)|
=\left|\int_y^x u_n'(t)\,dt\right|
\le\|u_n'\|_2\,|x-y|^{1/2}
\le M|x-y|^{1/2}.
$$
また $m_n=L^{-1}\int_a^b u_n(t)\,dt$ と置けば $|m_n|\le L^{-1/2}\|u_n\|_2$ であり、
$$
\begin{aligned}
|u_n(x)|
&\le |m_n|+\frac1L\int_a^b|u_n(x)-u_n(y)|\,dy\\
&\le L^{-1/2}M+\sqrt L\,M.
\end{aligned}
$$
したがって全関数が一様有界かつ等しく連続です。

各 $k\ge1$ で $[a,b]$ を $2^k$ 等分した格子点を集めた可算稠密集合 $D$ を取ります。各格子点での値は有界なので、最初の点で収束部分列、次の点でその部分列からさらに収束部分列、という対角抽出で、全ての $x\in D$ で値が収束する部分列 $u_{n_j}$ を得ます。

$\varepsilon>0$ に対し $2M\delta^{1/2}<\varepsilon/2$ となる $\delta>0$ を選び、間隔が $\delta$ 未満の有限格子 $x_0,\dots,x_N\in D$ を固定します。各格子点で列はCauchyなので、大きな $j,\ell$ について全ての $i$ で
$$
|u_{n_j}(x_i)-u_{n_\ell}(x_i)|<\varepsilon/2
$$
です。任意の $x$ と距離 $\delta$ 未満の $x_i$ を選ぶと
$$
|u_{n_j}(x)-u_{n_\ell}(x)|
\le 2M\delta^{1/2}+\varepsilon/2<\varepsilon.
$$
従ってこの部分列は一様Cauchyであり、連続関数 $v$ に一様収束します。

最後に $u_n\rightharpoonup u$ in $H^1$ なら $H^1\to L^2$ の連続な包含から $u_n\rightharpoonup u$ in $L^2$ です。部分列の一様収束は
$$
\|u_{n_j}-v\|_{L^2}\le\sqrt L\,\|u_{n_j}-v\|_\infty\to0
$$
を与えます。$L^2$ の任意の $w$ に対し、弱収束から $\langle u_{n_j},w\rangle_2\to\langle u,w\rangle_2$、強収束から $\langle u_{n_j},w\rangle_2\to\langle v,w\rangle_2$ です。従って $\langle u-v,w\rangle_2=0$、特に $w=u-v$ を取ると $\|u-v\|_2^2=0$ です。すなわち $u=v$ がほとんど至る所成立し、連続代表元としても一致します。
<!-- proof-end -->

**強い $H^1$ 収束と混同しないでください。** $I=(0,1)$ の
$$
u_n(t)=\frac{\sin(n\pi t)}{n\pi}
$$
は一様に0へ収束しますが、$\|u_n'\|_2^2=\int_0^1\cos^2(n\pi t)\,dt=1/2$ のままです。従って $H^1$ では0に強収束しません。一様収束により位置依存項は扱えても、導関数の二乗は別途調べる必要があります。

## 4. 強制性と弱逐次下半連続性

最小化列を弱収束させるには、まず有界にする必要があります。さらに極限でエネルギーが跳ね上がると、極限は最小点になりません。この二つを別々の仮定として定めます。

<a id="def-var9-coercivity"></a>
<!-- formal-statement-start -->
> **定義（許容集合上の強制性）**  
> ノルム空間 $H$ の非空集合 $C$ 上の実数値汎関数 $J:C\to\mathbb R$ が**強制的**であるとは、$u\in C$ が $\|u\|_H\to\infty$ を満たすとき
$$
J(u)\to+\infty
$$
> となることをいう。すなわち $J(u)\le R$ で定まる任意の集合 $\{u\in C:J(u)\le R\}$ は $H$ の中で有界である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var9-coercivity -->
**定義の確認**。 $C=H_0^1(0,1)$、$J(u)=\int_0^1|u'|^2$ とします。[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から $\|u\|_{H^1}^2\le (1+C_P^2)\|u'\|_2^2$ となり、$J$ は $C$ 上で強制的です。一方、$C=H^1_{\mathrm{per}}(0,1)$ では定数 $u_n=n$ に対し $\|u_n\|_{H^1}=n$、$J(u_n)=0$ なので強制的ではありません。
<!-- definition-example-end -->

<a id="def-var9-weak-lsc"></a>
<!-- formal-statement-start -->
> **定義（弱逐次下半連続性）**  
> Hilbert空間 $H$ の集合 $C$ 上の汎関数 $J:C\to\mathbb R$ が**弱逐次下半連続**であるとは、$u_n,u\in C$、$u_n\rightharpoonup u$ in $H$ なら
$$
J(u)\le\liminf_{n\to\infty}J(u_n)
$$
> が成立することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var9-weak-lsc -->
**定義の確認**。 $J(u)=\int_I|u'|^2$ は弱逐次下半連続です。弱収束すると $L^2$ の導関数も弱収束し、[Hilbert空間の弱収束部分列](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)と両立する次のノルム不等式が使えます。導関数の極限を $w=u'$ とし、$z=u_n'$ とおくと
$$
0\le\|z-w\|_2^2
=\|z\|_2^2-2\langle z,w\rangle_2+\|w\|_2^2.
$$
従って
$$
\|u_n'\|_2^2
\ge2\langle u_n',u'\rangle_2-\|u'\|_2^2.
$$
右辺は $\|u'\|_2^2$ へ収束するので、下極限を取って所望の不等式を得ます。
<!-- definition-example-end -->

## 5. 最小化の直接法を証明する

<a id="thm-var9-direct-method"></a>
<!-- formal-statement-start -->
> **定理（Hilbert空間上の最小化の直接法）**  
> $H$ を実Hilbert空間、$C\subset H$ を空でない弱逐次閉集合とする。$J:C\to\mathbb R$ が次の条件を満たすとする。
>
> 1. $J$ は下に有界、すなわち $m=\inf_{u\in C}J(u)>-\infty$。
> 2. $J$ は $C$ 上で強制的である。
> 3. $J$ は $C$ 上で弱逐次下半連続である。
>
> このときある $u_*\in C$ が存在して、次を満たす。
$$
J(u_*)=\min_{u\in C}J(u)=m.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\inf$ の定義で最小化列を作ります。強制性で列を有界にし、[GPDE5のHilbert弱コンパクト性](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)で部分列を取り、弱逐次閉性で極限を許容集合に残し、最後に弱逐次下半連続性で最小値を達成させます。

<!-- proof-start -->
### 証明

$C\ne\varnothing$ であり、$J$ は実数値かつ下に有界なので $m=\inf_CJ$ は有限実数です。各 $n\ge1$ について下限の定義から $u_n\in C$ を
$$
m\le J(u_n)<m+\frac1n
$$
となるように選べます。もし $(u_n)$ が $H$ で有界でないなら、$\|u_{n_k}\|_H\to\infty$ となる部分列を取れます。強制性から $J(u_{n_k})\to+\infty$ となりますが、$J(u_{n_k})\to m$ に矛盾します。従って $(u_n)$ は有界です。

[有界Hilbert列の弱収束部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を $H$ と $(u_n)$ に適用すると、部分列と $u_*\in H$ があり、
$$
u_{n_k}\rightharpoonup u_*\quad\text{in }H
$$
です。$u_{n_k}\in C$ と $C$ の弱逐次閉性から $u_*\in C$ です。ここで初めて $J(u_*)$ が許容されます。

弱逐次下半連続性を**この部分列**に適用すると
$$
m\le J(u_*)\le\liminf_{k\to\infty}J(u_{n_k})=m.
$$
ゆえに $J(u_*)=m$ です。
<!-- proof-end -->

この定理は**存在**だけを述べます。最小化列全体の収束、最小点の一意性、微分可能性、Euler–Lagrange方程式を自動的には与えません。仮定のいずれかを落とせば失敗し得ます。たとえば $C=\mathbb R$ に
$$
J(x)=
\begin{cases}
x^2,&x\ne0,\\
1,&x=0
\end{cases}
$$
と定めると $C$ は弱逐次閉、$J$ は下に有界かつ強制的ですが、$x_n=1/n\to0$ に沿って $J(x_n)\to0<J(0)$ なので弱逐次下半連続ではありません。下限0は達成されません。

## 6. 固定端点の二次エネルギー

抽象定理を実際に使うには、強制性と弱逐次下半連続性を式から確認する必要があります。最初は固定端点0、外力 $f\in L^2(I)$ の場合を調べます。

<a id="thm-var9-dirichlet-minimizer"></a>
<!-- formal-statement-start -->
> **定理（固定端点二次エネルギーの存在と一意性）**  
> 有界区間 $I=(a,b)$、$f\in L^2(I)$ に対し
$$
J_f(u)=\frac12\int_I|u'|^2\,dt-\int_I fu\,dt,
\qquad u\in H_0^1(I)
$$
> とする。このとき $J_f$ は $H_0^1(I)$ 上で最小点をただ一つ持つ。
<!-- formal-statement-end -->

### 証明の見取り図

[GPDE4のPoincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)によって外力の線形項を導関数ノルムで抑えます。二次項は弱下半連続で、線形項は弱収束で連続です。一意性は二つの最小点の中点に対する平方恒等式で確認します。

<!-- proof-start -->
### 証明

$\|u\|_2\le C_P\|u'\|_2$ と書きます。[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)の仮定は $u\in H_0^1(I)$ により満たされます。Cauchy–Schwarzから
$$
\begin{aligned}
J_f(u)
&\ge\frac12\|u'\|_2^2-\|f\|_2\|u\|_2\\
&\ge\frac12\|u'\|_2^2-C_P\|f\|_2\|u'\|_2\\
&\ge\frac14\|u'\|_2^2-C_P^2\|f\|_2^2
\end{aligned}
$$
です。最後の行は $\frac14s^2-Cs\ge-C^2$ に $s=\|u'\|_2$、$C=C_P\|f\|_2$ を代入したものです。この評価と $\|u\|_{H^1}^2\le(1+C_P^2)\|u'\|_2^2$ より、$J_f$ は下に有界で強制的です。

$H_0^1(I)$ は[GPDE4の閉部分空間](../../GPDE/GPDE4/index.md#prop-gpde4-h01-closed)で、線形閉部分空間ゆえ弱逐次閉です。$u_n\rightharpoonup u$ in $H_0^1$ とすると $u_n'\rightharpoonup u'$ in $L^2$。[弱逐次下半連続性](#def-var9-weak-lsc)を示した§4の平方の展開により
$$
\frac12\|u'\|_2^2\le\liminf_n\frac12\|u_n'\|_2^2.
$$
また $u_n\rightharpoonup u$ in $L^2$ なので $\int f u_n\to\int fu$。従って $J_f$ は弱逐次下半連続です。[直接法](#thm-var9-direct-method)で最小点が存在します。

一意性について、$u,v$ が最小点であれば $w=(u+v)/2\in H_0^1(I)$ であり、
$$
J_f(w)=\frac{J_f(u)+J_f(v)}2-\frac18\|u'-v'\|_2^2.
$$
両方が同じ最小値を取るので $\|u'-v'\|_2=0$ です。$u-v\in H_0^1(I)$ に[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)を適用すると $\|u-v\|_2=0$、ゆえに $u=v$ です。
<!-- proof-end -->

**端点が0以外の場合。** $\mathcal A_{A,B}=g+H_0^1(I)$ と書きます。ただし §2のアフィン関数 $g$ を使い、[区間の零トレースと $H_0^1$ の同一視](../../GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)から等号が成り立ちます。$u=g+v$ として $J_f(g+v)$ を $v\in H_0^1$ 上で最小化すれば、導関数の二次項と $v$ の線形項に帰着します。具体的に
$$
J_f(g+v)=\frac12\|v'\|_2^2+
\int_Ig'v'\,dt-\int_Ifv\,dt+
\left(\frac12\|g'\|_2^2-\int_Ifg\,dt\right).
$$
$g'\in L^2$ であり線形項をCauchy–SchwarzとPoincaréで抑えられるため、同じ証明が働きます。

## 7. 周期問題では定数方向を制御する

周期条件だけでは $\int|u'|^2$ は定数を検出しません。そこで平均零を課して、導関数だけから $H^1$ ノルム全体を抑えます。

<a id="prop-var9-mean-zero-poincare"></a>
<!-- formal-statement-start -->
> **命題（平均零の一次元Poincaré評価）**  
> 長さ $L=b-a$ の区間 $I$ で $u\in H^1(I)$ が $\int_Iu=0$ を満たせば
$$
\|u\|_{L^2(I)}\le L\|u'\|_{L^2(I)}.
$$
> 特に $\mathcal P_0$ 上で $\|u\|_{H^1}$ は $\|u'\|_2$ により制御される。
<!-- formal-statement-end -->

### 証明の見取り図

平均が0であることから、各点の値を「他の点との値の差」の平均で表せます。差は絶対連続代表元の微分積分で評価できます。

<!-- proof-start -->
### 証明

[絶対連続代表元の基本定理](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)と平均零条件から、任意の $x\in[a,b]$ で
$$
u(x)=\frac1L\int_a^b(u(x)-u(y))\,dy.
$$
一方、$u(x)-u(y)=\int_y^x u'(t)\,dt$ なので
$$
|u(x)-u(y)|\le\sqrt{|x-y|}\,\|u'\|_2\le\sqrt L\,\|u'\|_2.
$$
よって $|u(x)|\le\sqrt L\,\|u'\|_2$ が全ての $x$ で成り立ち、二乗積分すると
$$
\|u\|_2^2\le L\sup_{x\in[a,b]}|u(x)|^2
\le L^2\|u'\|_2^2.
$$
これを平方根に取ります。
<!-- proof-end -->

<a id="prop-var9-periodic-forcing"></a>
<!-- formal-statement-start -->
> **命題（周期問題での強制性の成否）**  
> $f\in L^2(I)$ に対し $J_f(u)=\frac12\int_I|u'|^2-\int_Ifu$ とする。
>
> **（1）** $J_f$ は $\mathcal P_0$ 上で下に有界かつ強制的であり、最小点をただ一つ持つ。
>
> **（2）** $\int_If\ne0$ なら、$H^1_{\mathrm{per}}(I)$ 上で $J_f$ は下に有界でない。
>
> **（3）** $\int_If=0$ なら、周期集合上では最小点が存在しても一意でない（任意の定数を加えたものも最小点）。
<!-- formal-statement-end -->

### 証明の見取り図

（1）は平均零Poincaré評価を二次エネルギーに代入し、直接法と厳密凸性を適用します。（2）は定数方向へ移動します。（3）はエネルギーの定数並進不変性で確認します。

<!-- proof-start -->
### 証明

（1）$u\in\mathcal P_0$ に対し[平均零評価](#prop-var9-mean-zero-poincare)から $\|u\|_2\le L\|u'\|_2$ です。従って
$$
J_f(u)\ge\frac12\|u'\|_2^2-L\|f\|_2\|u'\|_2
\ge\frac14\|u'\|_2^2-L^2\|f\|_2^2.
$$
$\mathcal P_0$ は[弱逐次閉](#prop-var9-admissible-weak-closed)であり、§6と同じ二次項の弱下半連続性・線形項の弱連続性から[直接法](#thm-var9-direct-method)を適用できます。二つの最小点があれば中点平方恒等式により導関数が一致し、その差の平均が0なので[平均零評価](#prop-var9-mean-zero-poincare)から二つの関数も一致します。

（2）定数関数 $u_c(t)=c$ を取ると
$$
J_f(u_c)=-c\int_If\,dt.
$$
積分が非零なら $c$ の符号と大きさを選んで $J_f(u_c)\to-\infty$ とできます。

（3）$\int_If=0$ なら任意の $u$ と定数 $c$ について
$$
J_f(u+c)=J_f(u)-c\int_If=J_f(u).
$$
存在は（1）の最小点を用いて示せます。任意の周期 $u$ から平均 $\bar u=L^{-1}\int_Iu$ を引けば $u-\bar u\in\mathcal P_0$ で、$\int f=0$ により $J_f(u)=J_f(u-\bar u)$。ゆえに（1）の最小点は周期集合全体でも最小で、定数を加えれば異なる最小点が無数に得られます。
<!-- proof-end -->

## 8. 非凸な位置エネルギーも区間上なら扱える

導関数の二乗は弱下半連続ですが、位置に関する非凸関数 $V(u)$ の積分は一見難しく見えます。§3の一様コンパクト性を使えば、区間上では次の存在定理を導けます。

<a id="thm-var9-potential-existence"></a>
<!-- formal-statement-start -->
> **定理（連続ポテンシャルを含む一次元直接法）**  
> 有界区間 $I$ と連続関数 $V:\mathbb R\to\mathbb R$ を取り、ある $M\ge0$ について全ての $z\in\mathbb R$ で $V(z)\ge-M$ とする。$H_0^1(I)$ 上
$$
E(u)=\frac12\int_I|u'|^2\,dt+\int_IV(u(t))\,dt
$$
> と定める。このとき $E$ は最小点を少なくとも一つ持つ。$V$ の凸性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

ポテンシャルが下に有界なので導関数ノルムが制御され、固定端点のPoincaré評価で最小化列が $H^1$ 有界になります。弱収束部分列からさらに一様収束部分列を取り、ポテンシャル項を通常の連続性で極限へ移します。

<!-- proof-start -->
### 証明

$u=0$ は許容され、$E(0)=LV(0)$ は有限です。また $V\ge-M$ より
$$
E(u)\ge\frac12\|u'\|_2^2-ML.
$$
従って $E$ は下に有界です。$\inf E$ に近づく最小化列 $u_n$ を選ぶと $E(u_n)\le E(0)+1$ が十分大きな $n$ で成立します。直前の評価より $\|u_n'\|_2$ は有界であり、[Poincaré不等式](../../GPDE/GPDE4/index.md#thm-gpde4-poincare)から $\|u_n\|_{H^1}$ も有界です。

[Hilbert弱収束部分列定理](../../GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)と $H_0^1$ の弱逐次閉性を使い、部分列について $u_n\rightharpoonup u_*\in H_0^1$ を得ます。さらに[§3の一様コンパクト性](#prop-var9-uniform-compactness)から、同じ部分列のさらに部分列を $u_n\to u_*$ 一様収束とできます。

一様収束により $u_n,u_*$ の値はある共通の有界閉区間 $[-R,R]$ に入ります。連続関数 $V$ はこの区間上で一様連続ですから
$$
\sup_{t\in[a,b]}|V(u_n(t))-V(u_*(t))|\to0,
$$
従って
$$
\int_IV(u_n)\,dt\longrightarrow\int_IV(u_*)\,dt.
$$
一方、§4の弱ノルム下半連続性により
$$
\frac12\|u_*'\|_2^2\le\liminf_n\frac12\|u_n'\|_2^2.
$$
二つを合わせると $E(u_*)\le\liminf_n E(u_n)=\inf E$。$u_*$ は許容されるので反対向きの不等式も成立し、最小値を達成します。
<!-- proof-end -->

例として $V(z)=(z^2-1)^2$ は二つの谷を持ち、$V''(0)=-4<0$ なので凸ではありませんが、$V\ge0$ です。したがって上の定理により固定端点0の最小点は存在します。ただし一意性や滑らかさはこの定理の結論ではありません。より一般の被積分関数 $F(t,u,u')$ の速度変数に関する凸性・成長条件と弱Euler–Lagrange方程式は VAR10 で扱います。

## 9. 演習

### Level A

<a id="ex-var9-a01"></a>
#### VAR9-A01 $H^1$ ノルムと端点
- Level: A

$I=(0,1)$、$u(t)=t(1-t)$ とする。$u\in H_0^1(I)$ を確認し、$\|u\|_{H^1}^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$u$ は区間の閉包で滑らか、$u(0)=u(1)=0$ です。[零トレースと $H_0^1$ の同一視](../../GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)から所属が従います。$u'=1-2t$ より
$$
\int_0^1|u'|^2dt=\int_0^1(1-4t+4t^2)\,dt
=1-2+\frac43=\frac13.
$$
また
$$
\int_0^1|u|^2dt=\int_0^1(t^2-2t^3+t^4)\,dt
=\frac13-\frac12+\frac15=\frac1{30}.
$$
ゆえに
$$
\|u\|_{H^1}^2=\frac13+\frac1{30}=\frac{11}{30}.
$$
<!-- solution-end -->

<a id="ex-var9-a02"></a>
#### VAR9-A02 端点・周期条件の弱閉性
- Level: A

$u_n\rightharpoonup u$ in $H^1(0,1)$ で、$u_n(0)=u_n(1)=1$ なら $u(0)=u(1)=1$ と示せ。

<!-- solution-start -->
### 詳細解答

[区間上のH^1トレース](../../GPDE/GPDE4/index.md#thm-gpde4-trace-interval)により $T_0(v)=v(0)$ と $T_1(v)=v(1)$ は $H^1$ 上の有界線形汎関数です。弱収束の定義にそれぞれ適用すると
$$
u(0)=\lim_nT_0(u_n)=1,\qquad
u(1)=\lim_nT_1(u_n)=1.
$$
周期の等式だけでなく端点の固定値も保存されます。
<!-- solution-end -->

<a id="ex-var9-a03"></a>
#### VAR9-A03 周期・平均零の直接確認
- Level: A

$v(t)=\sin(2\pi t)$ が $\mathcal P_0\subset H^1(0,1)$ に属することを確かめ、$\int_0^1v^2$、$\int_0^1(v')^2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$v(0)=v(1)=0$、また
$$
\int_0^1v(t)\,dt=\left[-\frac{\cos(2\pi t)}{2\pi}\right]_0^1=0
$$
なので、周期条件・平均零条件とも満たします。三角恒等式から
$$
\int_0^1v^2dt=\frac12\int_0^1(1-\cos4\pi t)dt=\frac12.
$$
$v'=2\pi\cos(2\pi t)$ なので
$$
\int_0^1(v')^2dt=4\pi^2\cdot\frac12=2\pi^2.
$$
<!-- solution-end -->

<a id="ex-var9-a04"></a>
#### VAR9-A04 周期エネルギーと定数並進
- Level: A

$H^1_{\mathrm{per}}(0,1)$ 上の $J(u)=\int_0^1|u'|^2$ が強制的でないことを示せ。また、この事実だけで最小点が存在しないと言えるか。

<!-- solution-start -->
### 詳細解答

$u_n(t)=n$ と置くと $u_n(0)=u_n(1)$ なので許容され、
$$
\|u_n\|_{H^1}^2=\int_0^1n^2dt=n^2\to\infty,
\qquad J(u_n)=0
$$
です。ゆえに[強制性](#def-var9-coercivity)はありません。しかし $J(u)\ge0$ であり、全ての定数関数で $J=0$ となるため最小点は存在します。強制性は直接法の十分条件であり、存在の必要条件ではありません。
<!-- solution-end -->

<a id="ex-var9-a05"></a>
#### VAR9-A05 一様収束と強い $H^1$ 収束
- Level: A

$u_n(t)=\sin(n\pi t)/(n\pi)$ が0へ一様収束しても $H^1(0,1)$ で強収束しないことを示せ。

<!-- solution-start -->
### 詳細解答

$|\sin(n\pi t)|\le1$ より $\|u_n\|_\infty\le1/(n\pi)\to0$。一方 $u_n'=\cos(n\pi t)$ だから
$$
\|u_n'\|_2^2=\int_0^1\cos^2(n\pi t)\,dt=\frac12.
$$
もし0に $H^1$ 強収束すれば $\|u_n'\|_2\to0$ が必要で矛盾します。関数値の一様収束だけでは導関数のエネルギーは収束しません。
<!-- solution-end -->

### Level B

<a id="ex-var9-b01"></a>
#### VAR9-B01 外力付きDirichletエネルギー
- Level: B

$H_0^1(0,1)$ 上 $J(u)=\frac12\int_0^1|u'|^2-2\int_0^1u$ を最小化せよ。最小点が $u_*(t)=t(1-t)$ であり最小値が $-1/6$ であることを、平方の差として示せ。

<!-- solution-start -->
### 詳細解答

$u_*''=-2$、$u_*(0)=u_*(1)=0$ です。任意の $v\in H_0^1$ で部分積分すると、境界項が消えて
$$
\int_0^1u_*'v'\,dt=-\int_0^1u_*''v\,dt=2\int_0^1v\,dt.
$$
任意の候補を $u=u_*+v$ と書き、
$$
\begin{aligned}
J(u)-J(u_*)&=\frac12\int_0^1(2u_*'v'+|v'|^2)\,dt-2\int_0^1v\,dt\\
&=\frac12\int_0^1|v'|^2\,dt\ge0.
\end{aligned}
$$
等号なら $v'=0$、$v$ は定数で両端0なので $v=0$ です。値は
$$
J(u_*)=\frac12\cdot\frac13-2\int_0^1(t-t^2)dt
=\frac16-2\left(\frac12-\frac13\right)=-\frac16.
$$
これで存在・一意性・最小値を全て確認しました。
<!-- solution-end -->

<a id="ex-var9-b02"></a>
#### VAR9-B02 平均零制約と強制性
- Level: B

$I=(a,b)$、$L=b-a$ とし、$\int_Iu=0$ から $\|u\|_{H^1}^2\le(1+L^2)\|u'\|_2^2$ を示せ。また平均零集合が弱逐次閉である理由を述べよ。

<!-- solution-start -->
### 詳細解答

平均零条件から
$$
u(x)=\frac1L\int_I(u(x)-u(y))dy.
$$
[絶対連続代表元](../../GPDE/GPDE4/index.md#thm-gpde4-w11-ac)を使い、$u(x)-u(y)=\int_y^xu'$ と書いてCauchy–Schwarzを適用すれば $|u(x)|\le\sqrt L\|u'\|_2$。これを積分して $\|u\|_2^2\le L^2\|u'\|_2^2$、従って
$$
\|u\|_{H^1}^2=\|u\|_2^2+\|u'\|_2^2
\le(1+L^2)\|u'\|_2^2.
$$
また $M(u)=\int_Iu$ は $|M(u)|\le\sqrt L\|u\|_{H^1}$ を満たす有界線形汎関数なので、弱収束列の $M(u_n)=0$ は $M(u)=0$ へ移ります。
<!-- solution-end -->

<a id="ex-var9-b03"></a>
#### VAR9-B03 二乗ノルムの弱下半連続性
- Level: B

$u_n\rightharpoonup u$ in $H^1(I)$ とする。$\|u'\|_2^2\le\liminf_n\|u_n'\|_2^2$ を、平方ノルムの非負性から再導出せよ。

<!-- solution-start -->
### 詳細解答

導関数作用素 $D:H^1(I)\to L^2(I)$ は有界線形であり、弱収束を保存して $u_n'\rightharpoonup u'$ in $L^2$ です。任意の $n$ で
$$
0\le\|u_n'-u'\|_2^2
=\|u_n'\|_2^2-2\langle u_n',u'\rangle_2+\|u'\|_2^2.
$$
従って
$$
\|u_n'\|_2^2\ge2\langle u_n',u'\rangle_2-\|u'\|_2^2.
$$
$u'$ を固定試験ベクトルとして弱収束の定義を適用すると、右辺は $2\|u'\|_2^2-\|u'\|_2^2=\|u'\|_2^2$ に収束します。下極限を取ると結論が得られます。
<!-- solution-end -->

<a id="ex-var9-b04"></a>
#### VAR9-B04 弱下半連続性を失う反例
- Level: B

$C=\mathbb R$ に $J(0)=1$、$J(x)=x^2$（$x\ne0$）と定める。$J$ が下に有界で強制的でも最小点を持たないこと、弱逐次下半連続性のどこが破れるかを示せ。

<!-- solution-start -->
### 詳細解答

$J(x)>0$ が全ての $x$ で成り立ち、$x_n=1/n$ とすると $J(x_n)=1/n^2\to0$ なので $\inf_\mathbb RJ=0$ ですが、達成されません。$|x|\to\infty$ では $J(x)=x^2\to\infty$ なので強制的です。$C=\mathbb R$ は弱逐次閉で、有限次元では弱収束と通常の収束が一致します。しかし $x_n\to0$ に対し
$$
J(0)=1>\liminf_{n\to\infty}J(x_n)=0
$$
となり、[弱逐次下半連続性](#def-var9-weak-lsc)が破れます。極限候補でエネルギーが上がるため、直接法の最後の不等式を使えません。
<!-- solution-end -->

### Level C

<a id="ex-var9-c01"></a>
#### VAR9-C01 周期二次エネルギー・平均零・非一意性
- Level: C

$I=(0,1)$、$f(t)=\sin(2\pi t)$ とし、$J_f(u)=\frac12\int_0^1|u'|^2-\int_0^1fu$ を考える。

1. $\mathcal P_0$ 上の最小点の存在・一意性を直接法の三条件から示せ。
2. 最小点が $u_*(t)=\sin(2\pi t)/(4\pi^2)$ であることを全ての許容変分に対する平方の差から示し、最小値を求めよ。
3. $H^1_{\mathrm{per}}(0,1)$ 上での最小点全体を求めよ。さらに $f$ を $f+1$ に換えると何が変わるか述べよ。

<!-- solution-start -->
### 詳細解答

**1.** [周期・平均零の弱逐次閉性](#prop-var9-admissible-weak-closed)で $\mathcal P_0$ は弱逐次閉です。[平均零Poincaré評価](#prop-var9-mean-zero-poincare)から
$$
J_f(u)\ge\frac12\|u'\|_2^2-\|f\|_2\|u\|_2
\ge\frac12\|u'\|_2^2-\|f\|_2\|u'\|_2
\ge\frac14\|u'\|_2^2-\|f\|_2^2.
$$
よって下に有界で強制的です。$u_n\rightharpoonup u$ なら二乗導関数項は[§4の平方評価](#def-var9-weak-lsc)で下半連続、$-\int fu_n\to-\int fu$ は弱連続なので $J_f$ は弱逐次下半連続です。[直接法](#thm-var9-direct-method)で存在します。二つの最小点の中点について平方恒等式を使うと導関数の差が0であり、平均零により関数の差も0となって一意です。

**2.** $u_*$ は端点0で周期、平均も0です。$u_*''=-\sin(2\pi t)=-f$ なので、任意の $v\in\mathcal P_0$ に対し境界項は $u_*'(1)v(1)-u_*'(0)v(0)=0$（$u_*'$ も周期、$v$ も周期）です。したがって
$$
\int_0^1u_*'v'\,dt=-\int_0^1u_*''v\,dt=\int_0^1fv\,dt.
$$
$\mathcal P_0$ は線形なので任意の候補は $u_*+v$ と書け、展開して
$$
J_f(u_*+v)-J_f(u_*)
=\int_0^1(u_*'v'-fv)dt+\frac12\|v'\|_2^2
=\frac12\|v'\|_2^2\ge0.
$$
値は $\int_0^1\cos^2(2\pi t)dt=1/2$ と $\int_0^1\sin^2(2\pi t)dt=1/2$ から
$$
\frac12\|u_*'\|_2^2=\frac1{16\pi^2},\qquad
\int_0^1fu_*dt=\frac1{8\pi^2},
$$
従って $J_f(u_*)=-1/(16\pi^2)$ です。

**3.** $\int_0^1f=0$ なので、$u_*+c$ は任意の $c\in\mathbb R$ で同じ最小値を取ります。逆に任意の周期候補から平均を引けば $\mathcal P_0$ に入りエネルギーは変わらないため、最小点はちょうど $u_*+c$ の全体です。$f+1$ の積分は1であり、定数 $u_c=c$ について
$$
J_{f+1}(u_c)=-c\to-\infty\quad(c\to+\infty).
$$
周期集合全体では最小点がなくなります。ただし平均零集合では $\int_0^1u=0$ なので、線形項へ1を加えても $J_{f+1}(u)=J_f(u)$ のままです。
<!-- solution-end -->

---

## 10. 到達点と次への接続

第一・第二変分は**候補が停留・安定か**を調べる道具でした。直接法はその前段階として、候補集合から**最小点を取り出せるか**を保証します。最小化列を有界にする強制性、極限を許容集合に残す弱逐次閉性、エネルギーを下から保つ弱逐次下半連続性はそれぞれ別の仕事をしています。固定端点と平均零の違いは、定数方向を制御できるかに表れました。

VAR10ではこの方法を $\int F(t,u,u')$ の一般形へ拡張します。特に速度変数に関する凸性、成長条件、弱Euler–Lagrange方程式、正則性を、今回の存在結果と区別して扱います。
