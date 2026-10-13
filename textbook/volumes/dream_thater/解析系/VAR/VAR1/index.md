# VAR1 汎関数・第一変分・Euler–Lagrange方程式

[AMECH3 の固定端変分](../../../物理系/AMECH/AMECH3/index.md#def-amech3-fixed-end-variation)では、両端を動かさない軌道の比較から運動方程式が得られました。しかし懸垂線は「長さが決まっている」曲線であり、自由な端点や折れ曲がりを含む曲線では端点項を最初から消せません。物理で導入した作用の変分を、境界条件と拘束をもつ数学的な最小化問題へ拡張します。

一つの関数を動かして生じる変化を調べると、**内部の微分方程式、端点の条件、角点での接合条件、拘束の乗数**が同じ計算から現れます。一方、第一変分が消えても最小値を取るとは限りません。この区別が次章の第二変分への入口です。

## 1. 比較してよい曲線を先に決める

閉区間 $[a,b]$ は $a<b$、未知関数は実数値の曲線 $u$ とします。積分する関数を $F(x,y,p)$ と書き、第3引数 $p$ は傾きです。特に断らなければ $F$ は関係する値の近傍で $C^2$ 級、曲線と変分は $C^2([a,b])$ とします。ここで扱うのは古典的な滑らかな変分で、関数空間で極限を扱う存在論は後の VAR9 へ送ります。

<a id="def-var1-admissible"></a>
<!-- formal-statement-start -->
> **定義（許容曲線と許容変分）**  
> 積分汎関数
$$
J[u]=\int_a^b F(x,u(x),u'(x))\,dx
$$
> が定義される曲線から選んだ集合 $\mathcal A$ を**許容クラス**という。$u\in\mathcal A$ に対して、$u_0=u$ であり、十分小さい $|\varepsilon|$ のすべてで $u_\varepsilon\in\mathcal A$ となる、$C^2([a,b])$ のノルムについて微分可能な曲線族 $\varepsilon\mapsto u_\varepsilon$ を**許容変分**という。その一次変化
$$
\eta=\left.\frac{d}{d\varepsilon}u_\varepsilon\right|_{\varepsilon=0}
$$
> を**許容変分方向**という。特に直線族 $u_\varepsilon=u+\varepsilon\eta$ が許容される場合もあるが、これだけには限らない。両端の値が固定される場合、どの許容方向も
$$
\eta(a)=\eta(b)=0
$$
> を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var1-admissible -->
**定義の確認**。 $\mathcal A=\{u\in C^2([0,1]):u(0)=0,\ u(1)=1\}$ とし、$u(x)=x$ とする。$\eta(x)=x(1-x)$ なら任意の $\varepsilon$ で $u_\varepsilon(0)=0,\ u_\varepsilon(1)=1$ なので許容方向です。$\eta(x)=1$ は $u_\varepsilon(0)=\varepsilon$ となるため、固定端問題では許容されません。同じ $\eta=1$ も両端自由なクラスでは許容されます。
<!-- definition-example-end -->

拘束 $K[u]=\ell$ がある場合、$\delta K[u;\eta]=0$ は許容方向の必要条件ですが、それだけで直線族 $u+\varepsilon\eta$ が拘束を保つとは限りません。第5節では、一次変化が $\eta$ となる**非直線の許容変分**を構成します。

## 2. 第一変分を計算すると端点が残る

[AMECH3 の第一変分](../../../物理系/AMECH/AMECH3/index.md#def-amech3-first-variation)を一般の $J$ に使います。積分内部で $\varepsilon$ による微分が許されるのは、$[a,b]$ がコンパクトで、$F$ とその偏微分が曲線族の通るコンパクト集合上で連続だからです。

<a id="def-var1-first-variation"></a>
<!-- formal-statement-start -->
> **定義（第一変分と停留曲線）**  
> $u_\varepsilon$ を $u$ を通る許容変分、$\eta=\left.\frac{d}{d\varepsilon}u_\varepsilon\right|_{\varepsilon=0}$ をその方向とするとき、
$$
\delta J[u;\eta]
=\left.\frac{d}{d\varepsilon}J[u_\varepsilon]\right|_{\varepsilon=0}
$$
> を**第一変分**という。第2節の公式が示すとおり、この値は一次変化 $\eta$ だけで決まり、同じ $\eta$ をもつ許容曲線族の選び方によらない。すべての許容変分について第一変分が $0$ なら、$u$ はその許容クラスに関して**停留**しているという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var1-first-variation -->
**定義の確認**。 $J[u]=\frac12\int_0^1(u')^2dx,\ u(x)=x,\ \eta=x(1-x)$ とすると、
$$
J[u+\varepsilon\eta]
=\frac12\int_0^1[1+\varepsilon(1-2x)]^2dx
=\frac12+\frac{\varepsilon^2}{6}.
$$
したがって $\delta J[x;\eta]=0$ です。これは一つの方向での計算にすぎず、停留性をいうには全方向を調べます。
<!-- definition-example-end -->

<a id="prop-var1-first-variation-boundary"></a>
<!-- formal-statement-start -->
> **命題（第一変分と境界項）**  
> $F\in C^2$、$u\in C^2([a,b])$ とし、$u$ を通る $C^2([a,b])$ 値の微分可能な許容変分 $u_\varepsilon$ の方向を $\eta\in C^2([a,b])$ とする。このとき
$$
\delta J[u;\eta]
=\int_a^b(F_y\eta+F_p\eta')\,dx
=\int_a^b\left(F_y-\frac{d}{dx}F_p\right)\eta\,dx
+[F_p\eta]_a^b.
$$
> ここで各偏微分は $(x,u(x),u'(x))$ で評価する。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ の第2・第3引数はそれぞれ $\eta,\eta'$ だけ動きます。連鎖律で二項を作り、傾き側だけを部分積分すると、内部と境界が分離します。

<!-- proof-start -->
### 証明

$h(\varepsilon,x)=F(x,u_\varepsilon(x),u_\varepsilon'(x))$ と置きます。$\varepsilon=0$ での $C^2$ ノルム微分から、$u_\varepsilon$ とその $x$ 微分の一次変化はそれぞれ $\eta,\eta'$ です。$x$ を固定して連鎖律を適用すると
$$
\left.\partial_\varepsilon h\right|_{\varepsilon=0}
=F_y(x,u,u')\eta+F_p(x,u,u')\eta'.
$$
コンパクト区間上での $C^2$ ノルム微分と $F_y,F_p$ の連続性から差商の収束は一様であり、積分と $\varepsilon$ 微分を交換できます。従って
$$
\delta J[u;\eta]
=\int_a^b(F_y\eta+F_p\eta')\,dx.
$$
積 $F_p(x,u,u')\eta$ の導関数は
$$
\frac{d}{dx}(F_p\eta)
=\left(\frac{d}{dx}F_p\right)\eta+F_p\eta'.
$$
したがって
$$
\int_a^bF_p\eta'\,dx
=[F_p\eta]_a^b-\int_a^b\frac{d}{dx}F_p\,\eta\,dx.
$$
元の積分に代入して結論を得ます。
<!-- proof-end -->

固定端では $[F_p\eta]_a^b=0$ です。内部の任意のコンパクト台方向へ [AMECH3 の変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を適用すると、[固定端の Euler–Lagrange方程式](../../../物理系/AMECH/AMECH3/index.md#thm-amech3-euler-lagrange)と同じ
$$
\boxed{\frac{d}{dx}F_p(x,u,u')-F_y(x,u,u')=0}
$$
を得ます。本章ではこの結果を再証明するのではなく、境界項が残ったときに何が増えるかを調べます。

## 3. 自由端点なら自然境界条件が要る

左端 $u(a)=A$ だけ固定し、右端 $u(b)$ は実数全体を動ける場合を考えます。内部の方程式を満たしても、右端で境界項が残る点が固定端問題と異なります。

<a id="thm-var1-natural-boundary"></a>
<!-- formal-statement-start -->
> **定理（自然境界条件）**  
> $F\in C^2$、$u\in C^2([a,b])$ が、左端 $u(a)=A$ を固定し右端を自由にした全 $C^2$ 許容変分について停留しているなら、
>
$$
\frac{d}{dx}F_p-F_y=0\quad(a<x<b),
\qquad F_p(b,u(b),u'(b))=0.
$$
>
> 逆に、これら二条件を満たせば全許容変分に対して停留する。両端自由ならさらに $F_p(a,u(a),u'(a))=0$ が必要十分である。
<!-- formal-statement-end -->

### 証明の見取り図

内部に台をもつ方向と、右端だけを動かす方向を別々に選べることが核心です。積分全体がゼロという条件を、内部と端点で独立に判定します。

<!-- proof-start -->
### 証明

まず $\eta\in C_c^\infty(a,b)$ を取ります。これは $\eta(a)=0$ を満たすため許容方向です。[第一変分と境界項](#prop-var1-first-variation-boundary)の命題の端点項は消えます。[変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)により
$$
F_y-\frac{d}{dx}F_p=0\quad(a<x<b).
$$
次に右端で値が $1$ になる $\eta(x)=(x-a)/(b-a)$ を選びます。$\eta(a)=0,\eta(b)=1$ なので許容方向です。すでに内部項がゼロと分かったため
$$
0=\delta J[u;\eta]
=[F_p\eta]_a^b=F_p(b,u(b),u'(b)).
$$
逆向きには、任意の $\eta(a)=0$ に対して内部項は微分方程式で消え、境界項は $\eta(a)=0$ と $F_p(b)=0$ で消えます。両端自由の場合は、$\eta(a)=1,\eta(b)=0$ の方向も選べるので左端条件を同じように得ます。
<!-- proof-end -->

**直接例。** $F=\frac12(u')^2+u^2$、$u(0)=0$、$u(1)$ 自由なら、内部方程式は $u''=2u$、自由端条件は $u'(1)=0$ です。一般解 $u=A\sinh(\sqrt2x)+B\cosh(\sqrt2x)$ に $u(0)=0$ を代入すると $B=0$、さらに $u'(1)=A\sqrt2\cosh\sqrt2=0$ より $A=0$ です。自由端を指定値で固定した問題とは異なり、自然境界条件が解を決めます。

端点が曲線 $y=\phi(x)$ 上を滑る、あるいは端点の $x$ 座標まで自由な問題では、変位の方向が制限されます。単純に $F_p=0$ と置くのではなく、第2節の境界形を許された端点方向へ作用させます。

## 4. 折れ曲がる曲線には接合条件がある

単一の $C^2$ 曲線とは限らない問題へ進みます。$a<c<b$ に接合点をもち、$u$ は連続、左右では $C^2$、片側微分 $u'(c-),u'(c+)$ をもつとします。$F$ は接合点を横切って同じ $C^2$ 関数とします。

まず接合位置 $c$ を固定します。変分 $\eta$ は左右で滑らかで、$c$ で連続とします。両外端は固定です。

<a id="thm-var1-corner-momentum"></a>
<!-- formal-statement-start -->
> **定理（固定位置の角点と運動量接合）**  
> 上の条件で各開区間上の Euler–Lagrange方程式が成立しているとする。接合点の値を自由に動かす全連続変分についての停留性は
>
$$
F_p(c,u(c),u'(c-))
=F_p(c,u(c),u'(c+))
$$
>
> と同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$[a,c]$ と $[c,b]$ に[第一変分と境界項](#prop-var1-first-variation-boundary)の命題を別々に使います。外端は固定、各区間の内部項は仮定でゼロです。左区間の上端項は $F_p(c-)\eta(c)$、右区間の下端項は $-F_p(c+)\eta(c)$ なので
$$
\delta J[u;\eta]
=\bigl(F_p(c-)-F_p(c+)\bigr)\eta(c).
$$
$[a,b]$ で両端がゼロかつ $\eta(c)=1$ になる区分的な滑らかな方向を取れるため、停留性なら括弧はゼロです。逆に括弧がゼロなら任意の連続変分で第一変分はゼロです。
<!-- proof-end -->

接合位置そのものも未知なら、もう一つ条件が増えます。左右の変分を $\eta_-,\eta_+$、位置移動を $c_\varepsilon=c+\varepsilon\sigma$ と記します。移動後の曲線がつながる条件を微分すると
$$
\eta_-(c)+u'(c-)\sigma
=\eta_+(c)+u'(c+)\sigma
=:\zeta.
$$
$\zeta$ は接合点の実際の高さの一次変化です。

<a id="thm-var1-weierstrass-erdmann"></a>
<!-- formal-statement-start -->
> **定理（Weierstrass–Erdmannの接合条件）**  
> $F\in C^2$、連続な区分的 $C^2$ 曲線の左右で Euler–Lagrange方程式が成り立つとする。接合点の位置と高さを独立に動かす滑らかな区分曲線族（外端固定）に関して停留しているなら、接合点で
>
$$
[F_p]_-^+=0,\qquad[F-u'F_p]_-^+=0
$$
>
> が成立する。ここで $[H]_-^+=H(c+)-H(c-)$ である。逆にこの二条件が成立すれば、この種類の曲線族に対する第一変分はゼロになる。
<!-- formal-statement-end -->

### 証明の見取り図

接合点を動かすと積分区間の端点も動くため、部分積分の境界項に $F(c-)\sigma-F(c+)\sigma$ が加わります。連続性の微分式を代入し、高さ変動 $\zeta$ と位置変動 $\sigma$ の係数をそれぞれゼロにします。

<!-- proof-start -->
### 証明

Leibniz の積分微分公式を左右に適用します。左積分の移動端は $+F(c-)\sigma$、右積分の移動端は $-F(c+)\sigma$ です。内部の変分積分を部分積分し、内部方程式と外端固定を使うと
$$
\delta J
=F_p(c-)\eta_-(c)-F_p(c+)\eta_+(c)
 +\bigl(F(c-)-F(c+)\bigr)\sigma.
$$
上の接合連続条件より
$$
\eta_-(c)=\zeta-u'(c-)\sigma,\quad
\eta_+(c)=\zeta-u'(c+)\sigma.
$$
代入して同類項を集めると
$$
\delta J
=(F_p(c-)-F_p(c+))\zeta
+\Bigl[(F-u'F_p)(c-)-(F-u'F_p)(c+)\Bigr]\sigma.
$$
高さの変動 $\zeta$ と位置の変動 $\sigma$ が独立に指定できることも確かめます。外端でゼロとなり、接合点で必要な値を取る一次変化の例は次のとおりです。

$$
\begin{aligned}
\eta_-(x)&=(\zeta-u'(c-)\sigma)\frac{x-a}{c-a},\\
\eta_+(x)&=(\zeta-u'(c+)\sigma)\frac{b-x}{b-c}.
\end{aligned}
$$

左右の元の曲線を接合点付近まで $C^2$ に延長します。移動する接合位置は $c_\varepsilon=c+\varepsilon\sigma$ とし、そこでの左右の曲線値をともに $u(c)+\varepsilon\zeta$ にするように補正します。この補正は接合点付近に局在させ、外端ではゼロにできます。

接合条件の一次式が成り立つため、必要な補正は $\varepsilon$ の一次より小さく取れます。よって一階の変化は上の $\eta_\pm$ のままで、連続性も正確に満たせます。

任意の $\zeta,\sigma$ についてそのような許容族を作れるので、両係数はそれぞれゼロです。逆に、両係数がゼロなら任意の許容族に対して $\delta J=0$ です。
<!-- proof-end -->

例えば $F=\frac12p^2$ なら $F_p=p$ なので第一の接合条件だけで左右の傾きが一致します。したがってこの滑らかな均質モデルの停留曲線には、真の角は残りません。媒質が接合点で不連続なら、単一の $C^2$ 関数 $F$ という仮定が破れます。ただし接合位置を**固定**すれば、左右それぞれの滑らかな被積分関数 $F_-,F_+$ へ[境界項公式](#prop-var1-first-variation-boundary)を適用でき、境界項の差から $F_{-,p}(c-)=F_{+,p}(c+)$ を直接導けます。移動角点の二条件は、媒質境界の移動規則を定めずに転用してはいけません。

## 5. 長さなどの等周拘束を入れる

許容クラスが $K[u]=\ell$ を満たす必要があるとき、直線族 $u+\varepsilon\eta$ は一般に拘束から外れます。例えば長さ拘束 $K[u]=\int_a^b\sqrt{1+(u')^2}\,dx$ では、固定端方向 $\eta$ に沿った二階微分は
$$
\left.\frac{d^2}{d\varepsilon^2}K[u+\varepsilon\eta]\right|_{\varepsilon=0}
=\int_a^b\frac{(\eta')^2}{(1+(u')^2)^{3/2}}\,dx>0
$$
です（$\eta\not\equiv0$ の場合）。従って一次変化が $\delta K[u;\eta]=0$ でも、直線族そのものは長さを保てません。制約面上に**非直線の許容変分**を作るには、制約の第一変分が少なくとも一方向ではゼロでないことが鍵です。

<a id="def-var1-isoperimetric"></a>
<!-- formal-statement-start -->
> **定義（等周拘束と正則性）**  
> 固定端のもとで、二つの積分汎関数について
$$
J[u]=\int_a^b F(x,u,u')\,dx,\qquad
K[u]=\int_a^b G(x,u,u')\,dx=\ell
$$
>
> を課す問題を等周型変分問題という。両端ゼロの滑らかな方向 $\psi$ が存在し、
$$
\delta K[u;\psi]\ne0
$$
>
> を満たすとき、その点で拘束は**正則**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var1-isoperimetric -->
**定義の確認**。 $[0,1]$ で $K[u]=\int_0^1u(x)dx$ とし $\psi=x(1-x)$ を取れば、$\psi$ は固定端方向で
$$
\delta K[u;\psi]=\int_0^1x(1-x)dx=\frac16\ne0.
$$
この拘束は各曲線で正則です。一方 $K[u]=\int_0^1(u')^2dx$ では $u\equiv0$ における第一変分は全方向でゼロなので、この点は正則ではありません。
<!-- definition-example-end -->

<a id="thm-var1-multiplier"></a>
<!-- formal-statement-start -->
> **定理（正則な等周拘束のLagrange乗数）**  
> $F,G\in C^2$、$u\in C^2([a,b])$ とする。固定端点かつ $K[u]=\ell$ のもとで $u$ が局所的に停留し、$K$ が $u$ で正則なら、ある実数 $\lambda$ が存在して
>
$$
\delta(J+\lambda K)[u;\eta]=0
$$
>
> がすべての固定端方向 $\eta$ について成り立つ。したがって
>
$$
\frac d{dx}(F_p+\lambda G_p)-(F_y+\lambda G_y)=0
$$
>
> が $(a,b)$ で成立する。乗数方程式だけでは元の拘束と端点条件を満たすとは限らず、これらも別に解く。
<!-- formal-statement-end -->

### 証明の見取り図

正則方向 $\psi$ を一つ取ると、任意の方向 $\eta$ の動きを $\psi$ で補正して $K=\ell$ を保てます。二変数の陰関数定理で補正係数を微分し、制約付きの停留性を制約なしの一次恒等式へ変えます。

<!-- proof-start -->
### 証明

$\delta K[u;\psi]\ne0$ を満たす固定端方向 $\psi$ を選び、任意の固定端方向 $\eta$ に対して
$$
H(s,t)=K[u+s\eta+t\psi]-\ell
$$
を考えます。$H(0,0)=0$、$\partial_tH(0,0)=\delta K[u;\psi]\ne0$ です。二変数の陰関数定理によって $H(s,t(s))=0$、$t(0)=0$ となる微分可能な $t$ があり、
$$
0=\left.\frac d{ds}H(s,t(s))\right|_{s=0}
=\delta K[u;\eta]+t'(0)\delta K[u;\psi]
$$
から
$$
t'(0)=-\frac{\delta K[u;\eta]}{\delta K[u;\psi]}.
$$
曲線 $u+s\eta+t(s)\psi$ は固定端と拘束を正確に保つ許容変分です。一般には直線族ではありませんが、第1節の定義では許容されます。その $s=0$ での方向は $\eta+t'(0)\psi$ です。[第一変分の公式](#prop-var1-first-variation-boundary)の線形性と制約付き停留性より
$$
0=\delta J[u;\eta]+t'(0)\delta J[u;\psi]
=\delta J[u;\eta]
-\frac{\delta J[u;\psi]}{\delta K[u;\psi]}\delta K[u;\eta].
$$
そこで $\lambda=-\delta J[u;\psi]/\delta K[u;\psi]$ とすれば、任意の $\eta$ で $\delta(J+\lambda K)=0$ です。[固定端のEuler–Lagrange方程式](../../../物理系/AMECH/AMECH3/index.md#thm-amech3-euler-lagrange)を $F+\lambda G$ に適用すると結論を得ます。
<!-- proof-end -->

正則性が失われる例を確認します。$K[u]=\int_0^1u^2dx=0$ という条件は $u\equiv0$ しか許さないのに、$\delta K[0;\eta]=0$ です。$J[u]=\int_0^1u\,dx$ を取ると $u=0$ は制約下で唯一の候補ですが、$\delta(J+\lambda K)[0;\eta]=\int_0^1\eta\,dx$ であり、どの $\lambda$ でも全方向にはゼロになりません。正則性がなければ乗数を保証できない理由です。

## 6. 最短曲線と懸垂線を計算する

### 6.1 グラフの最短曲線

グラフ $(x,u(x))$ の[弧長](../../../幾何系/VC/VC2/index.md#def-vc2-arclength)は
$$
L[u]=\int_a^b\sqrt{1+(u')^2}\,dx.
$$
$F(p)=\sqrt{1+p^2}$ は $y$ に依存しないため、内部方程式は
$$
\frac d{dx}\frac{u'}{\sqrt{1+(u')^2}}=0.
$$
関数 $p\mapsto p/\sqrt{1+p^2}$ の導関数は $(1+p^2)^{-3/2}>0$ なので、この方程式から $u'$ は定数、従って $u$ は直線です。固定両端を $u(a)=A,u(b)=B$ とすると
$$
u(x)=A+\frac{B-A}{b-a}(x-a).
$$

これは停留性だけでなく大域最小性も示せます。$d=(b-a,B-A)$ とし、単位ベクトル $e=d/|d|$ を取ると Cauchy–Schwarz により各 $x$ で
$$
\sqrt{1+u'(x)^2}\ge e\cdot(1,u'(x)).
$$
積分して
$$
L[u]\ge e\cdot\left(b-a,\int_a^bu'\,dx\right)
=e\cdot d=\sqrt{(b-a)^2+(B-A)^2}.
$$
直線は等号を達成します。**停留点であることと最小であることは別々に確かめた**点が重要です。

### 6.2 一様な鎖の懸垂線

重力方向と逆向きに高さ $y$ を取り、線密度 $\rho>0$、重力加速度 $g>0$、長さ $\ell$ の鎖が両端に吊られているとします。グラフ表示が可能な曲線に限ると、重力ポテンシャルエネルギーと長さは
$$
J[y]=\rho g\int_a^by\sqrt{1+(y')^2}\,dx,\qquad
K[y]=\int_a^b\sqrt{1+(y')^2}\,dx=\ell.
$$
[正則な等周拘束のLagrange乗数](#thm-var1-multiplier)から、正の定数 $\rho g$ で割って
$$
\widetilde F(y,p)=(y+\lambda)\sqrt{1+p^2}
$$
を停留させます。ここで $\lambda$ は長さ拘束の乗数を $\rho g$ で割った値です。

$x$ に陽に依存しない場合、先に得た停留条件 $\widetilde F_y-\frac d{dx}\widetilde F_p=0$ を使って直接微分すると
$$
\begin{aligned}
\frac d{dx}(\widetilde F-p\widetilde F_p)
&=\widetilde F_y y'+\widetilde F_p p'
-p'\widetilde F_p-p\frac d{dx}\widetilde F_p\\
&=p\left(\widetilde F_y-\frac d{dx}\widetilde F_p\right)=0.
\end{aligned}
$$
したがって
$$
\widetilde F-p\widetilde F_p
=(y+\lambda)\left(\sqrt{1+p^2}-\frac{p^2}{\sqrt{1+p^2}}\right)
=\frac{y+\lambda}{\sqrt{1+p^2}}=c
$$
という定数を得ます。下にたわむ懸垂線の枝では $c>0$ を取ります。従って
$$
y+\lambda=c\sqrt{1+(y')^2}.
$$
両辺を微分すると
$$
y'=c\,\frac{y'y''}{\sqrt{1+(y')^2}}.
$$
$y'\ne0$ の区間では $y''=\sqrt{1+(y')^2}/c$ です。元のEuler–Lagrange方程式を計算しても同じ関係が停留点 $y'=0$ を含めて成立します。$p=y'$ に分離変数を使うと
$$
\frac{dp}{\sqrt{1+p^2}}=\frac{dx}{c},
\qquad
\operatorname{arsinh}p=\frac{x-x_0}{c}.
$$
よって $p=\sinh((x-x_0)/c)$、積分して
$$
\boxed{y(x)=c\cosh\left(\frac{x-x_0}{c}\right)-\lambda,\qquad c>0.}
$$
端点二条件と $K[y]=\ell$ から $c,x_0,\lambda$ を定めます。指定された長さが両端間の直線距離より大きいことは、非直線の鎖を考えるための必要条件です。ここで導いたのは**滑らかな正則停留曲線の形**であり、任意の端点と長さでの存在や一意な大域最小性を無条件に主張していません。

## 7. 停留性の次に残る問い

$J[u]=-\int_0^1u(x)^2dx$ を両端 $u(0)=u(1)=0$ のクラスで考えます。$u=0$ では全方向に $\delta J[0;\eta]=0$ ですが、
$$
J[\varepsilon\eta]=-\varepsilon^2\int_0^1\eta^2dx<0=J[0]
$$
が非零 $\eta$ と $\varepsilon\ne0$ で成り立ちます。したがって $u=0$ は最小点ではありません。**第一変分は一次の変化しか見ない**からです。二次の変化の符号を扱うのが VAR2、そもそも最小点が存在するかを扱うのが VAR9 です。

---

# 演習

## VAR1-A01 固定端の許容方向

- Level: A
- 目安時間: 8分

$\mathcal A=\{u\in C^2([0,2]):u(0)=1,\ u(2)=3\}$、$u(x)=1+x$ とする。$\eta_1=x(2-x)$ と $\eta_2=x+1$ のどちらが許容方向か、端点値を計算して判断せよ。

<!-- solution-start -->
### 詳細解答

$\eta_1(0)=0,\eta_1(2)=0$ なので
$$
(u+\varepsilon\eta_1)(0)=1,\qquad(u+\varepsilon\eta_1)(2)=3
$$
です。したがって任意の $\varepsilon$ で $\eta_1$ は[許容方向](#def-var1-admissible)です。一方 $\eta_2(0)=1,\eta_2(2)=3$ だから
$$
(u+\varepsilon\eta_2)(0)=1+\varepsilon,\qquad
(u+\varepsilon\eta_2)(2)=3+3\varepsilon.
$$
$\varepsilon\ne0$ では固定端を破るので $\eta_2$ は許容されません。
<!-- solution-end -->

## VAR1-A02 第一変分を展開する

- Level: A
- 目安時間: 10分

$J[u]=\frac12\int_0^1(u')^2dx$、$u(x)=x$、$\eta=x(1-x)$ とする。$J[u+\varepsilon\eta]$ を直接展開し、第一変分と二次係数を求めよ。

<!-- solution-start -->
### 詳細解答

$(u+\varepsilon\eta)'=1+\varepsilon(1-2x)$ です。よって
$$
\begin{aligned}
J[u+\varepsilon\eta]
&=\frac12\int_0^1\bigl(1+2\varepsilon(1-2x)+\varepsilon^2(1-2x)^2\bigr)dx\\
&=\frac12+\varepsilon[x-x^2]_0^1
+\frac{\varepsilon^2}{2}\left[x-2x^2+\frac43x^3\right]_0^1\\
&=\frac12+\frac{\varepsilon^2}{6}.
\end{aligned}
$$
[第一変分の定義](#def-var1-first-variation)で $\varepsilon=0$ の微分を取ると $\delta J[u;\eta]=0$、二次係数は $1/6$ です。一次項が消えても二次の変化は残っています。
<!-- solution-end -->

## VAR1-A03 自由端の条件

- Level: A
- 目安時間: 10分

$J[u]=\frac12\int_0^1[(u')^2+2u^2]dx$ を $u(0)=0$、$u(1)$ 自由で停留させる。内部方程式と端点条件を示し、全停留解を求めよ。

<!-- solution-start -->
### 詳細解答

$F=\frac12p^2+y^2$ なので $F_p=p$、$F_y=2y$ です。[自然境界条件定理](#thm-var1-natural-boundary)により
$$
u''-2u=0,\qquad u'(1)=0.
$$
一般解は $u(x)=A e^{\sqrt2 x}+B e^{-\sqrt2 x}$ です。$u(0)=0$ から $A+B=0$、従って $u=2A\sinh(\sqrt2x)$。微分は $u'=2A\sqrt2\cosh(\sqrt2x)$ で $\cosh\sqrt2>0$ なので $u'(1)=0$ は $A=0$ を意味します。よって唯一の停留解は $u\equiv0$ です。
<!-- solution-end -->

## VAR1-A04 角点の運動量

- Level: A
- 目安時間: 10分

$F(p)=\frac12p^2$ の区分的 $C^2$ の停留曲線が、固定された接合点 $c$ で連続であるとする。左右の傾きが異なる角を持てないことを示せ。

<!-- solution-start -->
### 詳細解答

$F_p=p$ だから[固定角点の運動量接合条件](#thm-var1-corner-momentum)は
$$
F_p(c-)=F_p(c+)
\quad\Longleftrightarrow\quad
u'(c-)=u'(c+)
$$
です。各区間で Euler–Lagrange方程式は $u''=0$ なので、左右の傾きはそれぞれ定数です。接合条件によりその定数が一致し、連続な左右のアフィン関数は一本の直線へつながります。
<!-- solution-end -->

## VAR1-B01 不連続な媒質の固定接合

- Level: B
- 目安時間: 18分

$J[u]=\frac12\int_0^1a(x)(u')^2dx$、$u(0)=0,u(1)=1$ とする。$a=1$（$0\le x<1/2$）、$a=2$（$1/2<x\le1$）で、接合位置は固定する。連続な区分的 $C^2$ 停留曲線を求めよ。

<!-- solution-start -->
### 詳細解答

左右で $F_-=\frac12p^2$、$F_+=p^2$ です。各内部では $(au')'=0$ だから、左の傾きを $k$、右の傾きを $m$ とすると両方一定です。$c=1/2$ は固定されているため、左右で別々に[第一変分と境界項](#prop-var1-first-variation-boundary)の命題を使うと、外端固定かつ内部方程式の下で
$$
\delta J[u;\eta]
=\bigl(F_{-,p}(c-)-F_{+,p}(c+)\bigr)\eta(c)
=(k-2m)\eta(c).
$$
接合点の高さ $\eta(c)$ を自由に動かせるので、停留性は $k=2m$ を要求します。端点と連続性から全高低差は
$$
1=u(1)-u(0)=\frac12 k+\frac12m.
$$
$m=k/2$ を代入すると $1=\frac34 k$、ゆえに $k=4/3,m=2/3$ です。$u(1/2)=\frac12(4/3)=2/3$ なので
$$
u(x)=
\begin{cases}
\frac43x,&0\le x\le\frac12,\\
\frac23+\frac23(x-\frac12),&\frac12\le x\le1.
\end{cases}
$$
このモデルでは $a(x)$ がジャンプします。位置を自由に動かす滑らかな単一 $F$ という仮定がないため、[移動角点の第二接合条件](#thm-var1-weierstrass-erdmann)を課してはいけません。
<!-- solution-end -->

## VAR1-B02 正則性がなければ乗数が出ない

- Level: B
- 目安時間: 16分

固定端 $u(0)=u(1)=0$ の下で $J[u]=\int_0^1u\,dx$、$K[u]=\int_0^1u^2dx=0$ とする。許容解が一つであること、拘束が正則でないこと、どの実数 $\lambda$ でも $J+\lambda K$ が $u=0$ で停留しないことを示せ。

<!-- solution-start -->
### 詳細解答

$u^2$ は連続で非負だから、その積分がゼロなら $u(x)^2=0$ が全点で成り立ち、許容解は $u\equiv0$ のみです。方向 $\eta$ について
$$
K[\varepsilon\eta]
=\varepsilon^2\int_0^1\eta^2dx,
\qquad
\delta K[0;\eta]=0.
$$
すべての方向でゼロなので[正則性の定義](#def-var1-isoperimetric)を満たしません。一方
$$
\delta(J+\lambda K)[0;\eta]
=\int_0^1\eta\,dx+2\lambda\int_0^10\cdot\eta\,dx
=\int_0^1\eta\,dx.
$$
$\eta=x(1-x)$ を選ぶと右辺は $1/6\ne0$。従って乗数の選択で停留性を回復できません。[乗数定理](#thm-var1-multiplier)の正則性は飾りではありません。
<!-- solution-end -->

## VAR1-B03 最短曲線の大域最小性

- Level: B
- 目安時間: 18分

$u\in C^1([0,1])$、$u(0)=0,u(1)=2$ とする。弧長 $L[u]=\int_0^1\sqrt{1+(u')^2}dx$ が $\sqrt5$ 以上であることを示し、等号を達成する曲線を与えよ。

<!-- solution-start -->
### 詳細解答

$d=(1,2)$ とし $e=(1,2)/\sqrt5$ を単位ベクトルに取ります。Cauchy–Schwarz より
$$
\sqrt{1+(u')^2}=\|(1,u')\|
\ge e\cdot(1,u')=\frac{1+2u'}{\sqrt5}.
$$
右辺は負にもなれますが、点ごとの不等式は常に正しいままです。積分すると
$$
L[u]\ge\frac1{\sqrt5}\left(\int_0^1 1\,dx+2\int_0^1u'\,dx\right)
=\frac{1+2(u(1)-u(0))}{\sqrt5}
=\sqrt5.
$$
$u(x)=2x$ なら $u'=2$ で $L[u]=\int_0^1\sqrt5dx=\sqrt5$。従って直線が大域最小を達成します。
<!-- solution-end -->

## VAR1-C01 懸垂線の全変分

- Level: C
- 目安時間: 35分

$a<b$ とし、固定端グラフ $y\in C^2([a,b])$ に対し
$$
J[y]=\int_a^b y\sqrt{1+(y')^2}\,dx,\quad
K[y]=\int_a^b\sqrt{1+(y')^2}\,dx=\ell
$$
を考える。$K$ が正則な停留解について $J+\lambda K$ の第一変分を計算し、定数関係を導け。定数関係定数 $c>0$ の枝では $y=c\cosh((x-x_0)/c)-\lambda$ となることを示せ。

<!-- solution-start -->
### 詳細解答

[正則な等周拘束のLagrange乗数](#thm-var1-multiplier)により $\widetilde F=(y+\lambda)\sqrt{1+p^2}$ を考えます。偏微分は
$$
\widetilde F_y=\sqrt{1+p^2},\qquad
\widetilde F_p=(y+\lambda)\frac p{\sqrt{1+p^2}}.
$$
[第一変分の公式](#prop-var1-first-variation-boundary)で固定端 $\eta(a)=\eta(b)=0$ とすると
$$
\delta(J+\lambda K)[y;\eta]
=\int_a^b\left[
\sqrt{1+(y')^2}\,\eta+
(y+\lambda)\frac{y'}{\sqrt{1+(y')^2}}\eta'
\right]dx.
$$
停留性の内部方程式は
$$
\frac d{dx}\left((y+\lambda)\frac{y'}{\sqrt{1+(y')^2}}\right)
=\sqrt{1+(y')^2}.
$$
左辺を展開すると
$$
\frac{(y')^2}{\sqrt{1+(y')^2}}
+\frac{(y+\lambda)y''}{(1+(y')^2)^{3/2}}
=\sqrt{1+(y')^2}.
$$
移項し両辺に $(1+(y')^2)^{3/2}$ を掛けて
$$
(y+\lambda)y''=1+(y')^2
$$
を得ます。一方、$x$ に陽に依存しないため
$$
\frac d{dx}(\widetilde F-p\widetilde F_p)
=p(\widetilde F_y-\tfrac d{dx}\widetilde F_p)=0.
$$
従って定数関係は $(y+\lambda)/\sqrt{1+(y')^2}=c$ です。$c>0$ なら $y+\lambda=c\sqrt{1+p^2}$ であり、前の二階式へ代入して $p'=y''=\sqrt{1+p^2}/c$。分離積分により
$$
\operatorname{arsinh}p=\frac{x-x_0}{c},\qquad
p=\sinh\left(\frac{x-x_0}{c}\right).
$$
さらに積分して $y=c\cosh((x-x_0)/c)+C$、定数関係に代入すると $C=-\lambda$。最後に端点と $K[y]=\ell$ を別途検査する必要があります。
<!-- solution-end -->

## VAR1-C02 移動角点の二つの条件

- Level: C
- 目安時間: 32分

$F(x,y,p)$ は $C^2$ とし、$u$ は $c$ の左右で Euler–Lagrange方程式を満たす連続な区分的 $C^2$ 曲線である。接合位置を $c+\varepsilon\sigma$ と動かし、左右の曲線の一次変化を $\eta_-,\eta_+$ とする。連続性を使って接合点の第一変分を $\zeta,\sigma$ の形に分解し、Weierstrass–Erdmann条件を導け。

<!-- solution-start -->
### 詳細解答

移動後の接合では
$$
u^-_\varepsilon(c+\varepsilon\sigma)
=u^+_\varepsilon(c+\varepsilon\sigma).
$$
$\varepsilon=0$ で微分して
$$
\eta_-(c)+u'(c-)\sigma
=\eta_+(c)+u'(c+)\sigma=:\zeta.
$$
移動端での積分微分を左右に適用し、両外端固定と内部方程式を使うと
$$
\delta J
=F_p(c-)\eta_-(c)-F_p(c+)\eta_+(c)
+(F(c-)-F(c+))\sigma.
$$
$\eta_\pm(c)=\zeta-u'(c\pm)\sigma$ をそれぞれ代入すると
$$
\begin{aligned}
\delta J
&=(F_p(c-)-F_p(c+))\zeta\\
&\quad+\{F(c-)-u'(c-)F_p(c-)
-F(c+)+u'(c+)F_p(c+)\}\sigma.
\end{aligned}
$$
接合点の高さ $\zeta$ と位置 $\sigma$ を独立に動かせるので、それぞれの係数がゼロです。すなわち
$$
F_p(c-)=F_p(c+),\qquad
(F-u'F_p)(c-)=(F-u'F_p)(c+).
$$
[Weierstrass–Erdmann条件](#thm-var1-weierstrass-erdmann)は位置まで動かして初めて二本になります。固定位置なら $\sigma=0$ なので第二条件は導けません。
<!-- solution-end -->
