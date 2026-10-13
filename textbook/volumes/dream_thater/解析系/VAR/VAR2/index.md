# VAR2 第二変分と最小性

[VAR1 の第一変分](../VAR1/index.md#prop-var1-first-variation-boundary)で停留曲線を見つけても、それが最短・最小とは限りません。例えば $J[u]=-\int_0^1u^2dx$ は $u=0$ で停留しますが、非零方向へ少し動かすと値は下がります。第一変分は「坂の傾きがゼロ」と言うだけで、「谷底」とはまだ言いません。次に二次の変化を調べます。

この章では固定端の古典的変分を出発点に、**二次形式の非負性は必要、適切な強制評価は十分**という違いを証明します。傾きに関する凸性（Legendre条件）が何を保証し何を保証しないのか、さらに二次形式の退化から Jacobi方程式がなぜ現れるのかを一本の具体例で結びます。

## 1. 第二変分という二次の検査

区間 $a<b$ と固定端 $u(a)=A,\ u(b)=B$ を考えます。以下の古典的計算では $F(x,y,p)$ は対象曲線 $(x,u(x),u'(x))$ の近傍で $C^3$、$u\in C^2([a,b])$、方向は $\eta\in C^2([a,b])$ で $\eta(a)=\eta(b)=0$ とします。$u+\varepsilon\eta$ は十分小さい $\varepsilon$ に対して許容されると仮定します。$F$ の偏微分を評価する点 $(x,u,u')$ は以後、特に指定しない限りこの点です。

<a id="def-var2-second-variation"></a>
<!-- formal-statement-start -->
> **定義（第二変分）**  
> 積分汎関数 $J[u]=\int_a^b F(x,u,u')\,dx$ に対し、許容方向 $\eta,\zeta$ の第二変分を
$$
\delta^2J[u;\eta,\zeta]
=\left.\frac{\partial^2}{\partial s\partial t}
J[u+s\eta+t\zeta]\right|_{s=t=0}
$$
> とする。特に $\delta^2J[u;\eta]:=\delta^2J[u;\eta,\eta]$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var2-second-variation -->
**定義の確認**。 $J[u]=\frac12\int_0^1(u')^2dx$ では
$$
J[u+s\eta+t\zeta]=J[u]
+s\int_0^1u'\eta'dx+t\int_0^1u'\zeta'dx
+\frac{s^2}{2}\int_0^1(\eta')^2dx
+st\int_0^1\eta'\zeta'dx
+\frac{t^2}{2}\int_0^1(\zeta')^2dx.
$$
$s,t$ でそれぞれ一回微分しゼロに戻せば $\delta^2J[u;\eta,\zeta]=\int_0^1\eta'\zeta'dx$、対角では $\int_0^1(\eta')^2dx$ です。一次変分と異なり、方向の大きさを二倍にすると対角の値は四倍になります。
<!-- definition-example-end -->

<a id="prop-var2-hessian"></a>
<!-- formal-statement-start -->
> **命題（第二変分の二次形式）**  
> 上記の $C^3$ 仮定の下で、第二変分は対称双線形形式となり、$P=F_{pp}$、$R=F_{yp}$、$S=F_{yy}$ と置くと
$$
\delta^2J[u;\eta,\zeta]
=\int_a^b\{P\eta'\zeta'+R(\eta\zeta'+\eta'\zeta)+S\eta\zeta\}\,dx.
$$
> 対角の二次形式を $Q_u(\eta)=\delta^2J[u;\eta]$ と書けば
$$
Q_u(\eta)=\int_a^b(P(\eta')^2+2R\eta\eta'+S\eta^2)\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

曲線の値と傾きをそれぞれ $s\eta+t\zeta$、$s\eta'+t\zeta'$ だけ動かします。二変数の連鎖律で二次の項を取り出します。混合項には $F_{yp}=F_{py}$ が両側から現れます。

<!-- proof-start -->
### 証明

$H(x,s,t)=F(x,u+s\eta+t\zeta,u'+s\eta'+t\zeta')$ とします。まず $s$ で微分すると
$$
\partial_sH=F_y(x,u_{s,t},u'_{s,t})\eta
+F_p(x,u_{s,t},u'_{s,t})\eta',
$$
ここで $u_{s,t}=u+s\eta+t\zeta$ です。さらに $t$ で微分すると
$$
\begin{aligned}
\partial_t\partial_sH
&=(F_{yy}\zeta+F_{yp}\zeta')\eta
 +(F_{py}\zeta+F_{pp}\zeta')\eta'\\
&=S\eta\zeta+R\eta\zeta'+R\eta'\zeta+P\eta'\zeta'
\end{aligned}
$$
が $s=t=0$ で成り立ちます。コンパクト区間上の連続な偏微分に対して積分下で微分できるので、この式を積分して混合第二変分を得ます。積の対称性および $F_{yp}=F_{py}$ から双線形かつ対称です。$\zeta=\eta$ とすれば対角の式を得ます。
<!-- proof-end -->

一次で停留しているときでも $Q_u$ の符号は $F_{pp}$ だけでは決まりません。$R$ と $S$ の項が負に働くことがあるためです。以下ではこの区別を何度も確認します。

## 2. 最小点に必要な条件と、十分な条件の差

最小という語は比較する曲線の近さを指定して初めて正確になります。今回は $C^1$ ノルムで近い曲線を比較します。これは値と傾きの両方の一様な近さです。

<a id="def-var2-local-minimum"></a>
<!-- formal-statement-start -->
> **定義（$C^1$ 局所最小点）**  
> 固定端を満たす $u\in C^2([a,b])$ が $C^1$ 局所最小点であるとは、ある $\rho>0$ が存在し、同じ端点を持つ任意の $v\in C^2([a,b])$ で $\|v-u\|_{C^1}<\rho$ なら $J[v]\ge J[u]$ となることをいう。$v\ne u$ の場合に常に不等号が厳しければ狭義局所最小点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var2-local-minimum -->
**定義の確認**。 $J[u]=\frac12\int_0^1(u')^2dx$ で $u(0)=u(1)=0$ とします。任意の比較曲線 $v$ で $J[v]-J[0]=\frac12\int_0^1(v')^2dx\ge0$ です。等号なら $v'=0$ が全点で成り立ち、端点値がゼロなので $v=0$ です。よって $u=0$ は $C^1$ の近傍に限らず狭義大域最小点で、局所最小点の条件を満たします。
<!-- definition-example-end -->

<a id="thm-var2-necessary"></a>
<!-- formal-statement-start -->
> **定理（局所最小性の第一・第二必要条件）**  
> 第1節の正則性と固定端条件の下で、$u$ が $C^1$ 局所最小点なら、すべての固定端方向 $\eta$ に対して
$$
\delta J[u;\eta]=0,\qquad Q_u(\eta)\ge0
$$
> が成立する。$Q_u(\eta)>0$ がすべての非零方向で成り立つことは必要ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一つの方向に沿う実数値関数 $g(\varepsilon)=J[u+\varepsilon\eta]$ を考えます。局所最小なら一変数微積分から $g'(0)=0,\ g''(0)\ge0$ です。すべての許容方向でこれを繰り返すだけです。

<!-- proof-start -->
### 証明

固定端の $\eta$ を任意に取ります。$\|u+\varepsilon\eta-u\|_{C^1}=|\varepsilon|\|\eta\|_{C^1}$ なので、十分小さい $|\varepsilon|$ で $u+\varepsilon\eta$ は局所最小性を比較できる範囲に入ります。従って $g(\varepsilon)=J[u+\varepsilon\eta]$ は $\varepsilon=0$ に局所最小を持ちます。$F\in C^3$ により $g$ は二回連続微分可能です。一変数の必要条件から
$$
g'(0)=0,\quad g''(0)\ge0.
$$
[第一変分の定義](../VAR1/index.md#def-var1-first-variation)で $g'(0)=\delta J[u;\eta]$、[第二変分の定義](#def-var2-second-variation)で $g''(0)=Q_u(\eta)$ です。方向は任意なので結論が成り立ちます。厳密な正値が必要でないことは、例えば $J[u]=\int_0^1(u')^4dx$、固定端 $u(0)=u(1)=0$ で確認できます。$u=0$ は狭義大域最小点ですが $Q_0(\eta)=0$ が全方向で成り立ちます。
<!-- proof-end -->

ここで $J[u]=-\frac12\int_0^1u^2dx$、固定端ゼロを取れば $u=0$ で第一変分は消えますが $Q_0(\eta)=-\int\eta^2dx<0$（$\eta\ne0$）です。第二必要条件は、VAR1 末尾の非最小性を直ちに検出します。

十分性には、個々の方向で正であることより強い、方向全体に**一様な下界**が便利です。ここでいうノルムは $\|\eta\|_{H^1}^2=\int_a^b(\eta^2+(\eta')^2)dx$ と記しますが、証明で使うのは滑らかな固定端方向だけです。一般の Sobolev 空間論はまだ使いません。

<a id="thm-var2-coercive-sufficient"></a>
<!-- formal-statement-start -->
> **定理（二次形式の強制評価による局所最小性）**  
> $F\in C^3$、$u\in C^2([a,b])$ は固定端の停留曲線とする。ある $c>0$ について、すべての固定端 $\eta\in C^2([a,b])$ で
$$
Q_u(\eta)\ge c\int_a^b(\eta^2+(\eta')^2)\,dx
$$
> が成立するなら、$u$ は固定端の $C^1$ 狭義局所最小点である。
<!-- formal-statement-end -->

### 証明の見取り図

$u+h$ を近い曲線とし、$F$ を値と傾きについて二次まで Taylor 展開します。停留性で一次項が消え、二次形式の正の下界が余剰の三次的な誤差を吸収します。$C^1$ の近さは、誤差係数を小さくするために使います。

<!-- proof-start -->
### 証明

$h=v-u$ とすると $h(a)=h(b)=0$ です。$(y,p)=(u(x),u'(x))$ の周囲で二変数 Taylor 展開を行います。$z=(h,h')$ と置き、$x$ を固定して $t\mapsto F(x,u+th,u'+th')$ を $t=0$ で二次まで展開すると
$$
\begin{aligned}
F(x,u+h,u'+h')
&=F(x,u,u')+F_yh+F_ph'\\
&\quad+\frac12\{Sh^2+2Rhh'+P(h')^2\}+\mathcal R_x.
\end{aligned}
$$
$[a,b]$ 上の曲線の周囲に閉じた小さい管状近傍を取ると、$F$ の三階偏微分はそこで一様有界です。Taylor の積分剰余を $z$ に適用すれば、ある $M>0$ について
$$
|\mathcal R_x|\le M(|h|+|h'|)^3
\le 2M\|h\|_{C^1}\bigl(h^2+(h')^2\bigr)
$$
とできます（最終定数は $M$ に吸収してもよい）。積分後、一次項は[第一変分の式](../VAR1/index.md#prop-var1-first-variation-boundary)と停留性からゼロです。従って
$$
J[u+h]-J[u]
\ge\left(\frac c2-2M\|h\|_{C^1}\right)
\int_a^b(h^2+(h')^2)\,dx.
$$
管状近傍に収まり、かつ $\|h\|_{C^1}<c/(8M)$ となる半径を選べば右辺は $\frac c4\|h\|_{H^1}^2$ 以上です。$h\ne0$ なら連続性により積分は正ですから狭義局所最小性が従います。
<!-- proof-end -->

注意：この証明は **$C^1$ 局所最小性**を示します。$H^1$ ノルムだけで小さいが導関数に大きな尖りがある方向には、三階剰余の一様な吸収をこのまま適用できません。使用する位相を曖昧にして「強い十分条件」を宣言しないことが大切です。

## 3. Legendre条件は何を検査するか

二次形式の $P=F_{pp}$ は導関数 $\eta'$ に掛かります。非常に細かく振動する許容方向は $\eta$ 自身の大きさに比べて $\eta'$ を大きくするため、もし $P$ が一点でも負なら第二必要条件が破れます。

<a id="thm-var2-legendre"></a>
<!-- formal-statement-start -->
> **定理（Legendreの必要条件）**  
> 第1節の正則性・固定端仮定の下で、$u$ が $C^1$ 局所最小点なら、すべての $x\in(a,b)$ について
$$
F_{pp}(x,u(x),u'(x))\ge0
$$
> が成立する。連続性から端点でも同じ不等式が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$P$ が負の小区間を仮定し、その中に台を持つ $\eta_n(x)=\chi(x)\sin(nx)$ を作ります。$P(\eta_n')^2$ には負の $n^2$ 項が現れる一方、混合項は高々 $n$ 次、$\eta_n^2$ 項は有界です。大きな $n$ で $Q_u(\eta_n)<0$ となり必要条件に反します。

<!-- proof-start -->
### 証明

ある内部点で $P(x_0)<0$ と仮定します。連続性により $x_0$ を含む閉区間 $I\subset(a,b)$ と $\kappa>0$ を選んで $P\le-\kappa$ on $I$ とできます。非零の $\chi\in C_c^\infty(I)$ を取り、$\eta_n(x)=\chi(x)\sin(nx)$ と置きます。$\eta_n$ は両端でゼロです。
$$
\eta_n'=\chi'\sin(nx)+n\chi\cos(nx).
$$
二乗の主要項は $n^2\chi^2\cos^2(nx)$ です。交差項の積分の絶対値は $2n\|\chi\chi'\|_{L^1}\sup_I|P|$ 以下、$\chi'^2$ 項も $n$ に依存せず有界です。また $|2R\eta_n\eta_n'|$ の積分は定数倍の $n+1$ 以下、$S\eta_n^2$ の積分も一様有界です。従って
$$
Q_u(\eta_n)\le -\kappa n^2\int_I\chi^2\cos^2(nx)\,dx+C_1n+C_2.
$$
$\cos^2(nx)=\frac12+\frac12\cos(2nx)$ です。$\chi^2$ は滑らかで両端ゼロなので、部分積分により
$$
\left|\int_I\chi^2\cos(2nx)dx\right|
=\left|-\frac1{2n}\int_I(\chi^2)'\sin(2nx)dx\right|
\le\frac{\|(\chi^2)'\|_{L^1}}{2n}.
$$
従って $\int_I\chi^2\cos^2(nx)dx\to\frac12\int_I\chi^2dx>0$。十分大きい $n$ では右辺の負の $n^2$ 項が $O(n)$ を圧倒して $Q_u(\eta_n)<0$ となり、[第二必要条件](#thm-var2-necessary)と矛盾します。
<!-- proof-end -->

$P(x)>0$ を全区間で満たす場合を**強められたLegendre条件**と呼びます。$P$ が連続で $[a,b]$ 上正ならコンパクト性から $P\ge m>0$ です。しかし **$P\ge m$ だけでは最小性は保証されません**。$S$ に大きい負項があれば $Q$ は負になります。

<a id="prop-var2-easy-coercivity"></a>
<!-- formal-statement-start -->
> **命題（Legendre条件と下界の組合せ）**  
> 固定端停留曲線に沿い $P\ge m>0$、$S-R'\ge-\mu$ とし、$L=b-a$ とする。$m-\mu L^2/\pi^2>0$ なら、ある $c>0$ に対して
$$
Q_u(\eta)\ge c\int_a^b(\eta^2+(\eta')^2)\,dx
$$
> が全固定端方向で成り立つ。従って第2節の正則性の下で $C^1$ 狭義局所最小点となる。
<!-- formal-statement-end -->

### 証明の見取り図

交差項は $2R\eta\eta'=(R\eta^2)'-R'\eta^2$ として境界が消えます。残る負の $\eta^2$ を固定端の Poincaré不等式で $\eta'^2$ に吸収します。ここで閾値 $\pi^2/L^2$ は次節で直接導きます。

<!-- proof-start -->
### 証明

$R$ は $C^1$ であり、両端で $\eta=0$ なので
$$
\int_a^b2R\eta\eta'\,dx
=[R\eta^2]_a^b-\int_a^bR'\eta^2dx
=-\int_a^bR'\eta^2dx.
$$
従って
$$
Q_u(\eta)=\int_a^b[P(\eta')^2+(S-R')\eta^2]dx
\ge m\int_a^b(\eta')^2dx-\mu\int_a^b\eta^2dx.
$$
後の[鋭い区間不等式](#lem-var2-wirtinger)により $\int\eta^2\le L^2/\pi^2\int(\eta')^2$ です。ここで $\mu\ge0$ としてよく（元の下界の $\mu$ が負なら $0$ へ置き換えます）、$d=m-\mu L^2/\pi^2>0$ とすると $Q_u(\eta)\ge d\int(\eta')^2$。さらに
$$
\int_a^b[\eta^2+(\eta')^2]dx
\le(1+L^2/\pi^2)\int_a^b(\eta')^2dx
$$
なので $c=d/(1+L^2/\pi^2)$ で結論です。[強制評価の十分条件](#thm-var2-coercive-sufficient)を適用できます。
<!-- proof-end -->

## 4. Sturm型模型で閾値を完全に計算する

長さ $L=b-a$ の区間の固定端方向には、次の最良定数の不等式が成立します。後続の Sturm・スペクトル理論を仮定せず、ここで証明します。

<a id="lem-var2-wirtinger"></a>
<!-- formal-statement-start -->
> **補題（固定端の鋭いWirtinger不等式）**  
> $a<b$、$L=b-a$、$\eta\in C^1([a,b])$、$\eta(a)=\eta(b)=0$ なら
$$
\int_a^b(\eta')^2dx
\ge\frac{\pi^2}{L^2}\int_a^b\eta^2dx.
$$
> 等号は $\eta(x)=C\sin(\pi(x-a)/L)$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

$w(x)=\sin(\pi(x-a)/L)>0$ を内部で使い、$\eta=wz$ と書きます。$w''=-(\pi/L)^2w$ を利用すると、二乗差が非負の積分へ書き換わります。端点で $w=0$ でも境界項が消えることを最後に確認します。

<!-- proof-start -->
### 証明

$k=\pi/L$、$w(x)=\sin(k(x-a))$ とします。内部では $w>0$、$w''=-k^2w$ です。$z=\eta/w$ と置き $\eta'=w'z+wz'$ と展開します。
$$
(\eta')^2-k^2\eta^2
=w^2(z')^2+2ww'zz'+((w')^2-k^2w^2)z^2.
$$
一方
$$
(ww'z^2)'=((w')^2+ww'')z^2+2ww'zz'
=((w')^2-k^2w^2)z^2+2ww'zz'
$$
なので差を取って
$$
(\eta')^2-k^2\eta^2
=w^2(z')^2+(ww'z^2)'.
$$
$a+\varepsilon$ から $b-\varepsilon$ まで積分します。境界項は $ww'z^2=(w'/w)\eta^2$ です。$\eta(a)=0$ と $\eta\in C^1$ から $|\eta(x)|\le C(x-a)$、また $w(x)\asymp x-a$ なので左端の $(w'/w)\eta^2=O(x-a)\to0$ です。右端も同様です。$\varepsilon\to0$ として
$$
\int_a^b[(\eta')^2-k^2\eta^2]dx
=\int_a^bw^2(z')^2dx\ge0.
$$
等号なら $z'=0$ が内部で連続的に成り立つため $z=C$、よって $\eta=Cw$ です。逆に $\eta=Cw$ なら差の積分はゼロです。
<!-- proof-end -->

<a id="thm-var2-sturm-model"></a>
<!-- formal-statement-start -->
> **定理（Sturm型二次汎関数の最小性閾値）**  
> $a<b$、$L=b-a$、$\lambda\in\mathbb R$ とし、固定端 $u(a)=u(b)=0$ で
$$
J_\lambda[u]=\frac12\int_a^b\{(u')^2-\lambda u^2\}\,dx
$$
> を考える。$u=0$ はすべての $\lambda$ で停留し、次の三場合に分かれる。
>
> **（1）** $\lambda<\pi^2/L^2$ なら $u=0$ が唯一の大域最小点。  
> **（2）** $\lambda=\pi^2/L^2$ なら $u=C\sin(\pi(x-a)/L)$ がすべて大域最小点（$C\in\mathbb R$）。  
> **（3）** $\lambda>\pi^2/L^2$ なら $u=0$ は局所最小点でなく、汎関数は下に有界でない。
<!-- formal-statement-end -->

### 証明の見取り図

$J_\lambda$ 自体が第二変分の半分であり、最小性を検査する二次形式と実際の値の符号が一致します。[鋭い区間不等式](#lem-var2-wirtinger)の等号条件も使えば、退化する閾値を正確に決められます。

<!-- proof-start -->
### 証明

$u=0$ における第一変分は任意の $\eta$ でゼロです。[第二変分の式](#prop-var2-hessian)から
$$
Q_0(\eta)=\int_a^b[(\eta')^2-\lambda\eta^2]dx,
\qquad J_\lambda[u]=\tfrac12Q_0(u).
$$
$\lambda\le0$ のとき $Q_0(u)\ge\int(u')^2$、$u\ne0$ なら積分は正です。$0<\lambda<k^2$ のとき [Wirtinger不等式](#lem-var2-wirtinger)を使うと
$$
Q_0(u)\ge(k^2-\lambda)\int_a^bu^2dx.
$$
右辺は非零 $u$ で正です。よって（1）は一意な大域最小です。$\lambda=k^2$ のときは不等式によって $Q_0\ge0$、等号の条件が $u=Cw$ なので（2）が従います。$\lambda>k^2$ なら $u=tw$ を代入し
$$
J_\lambda[tw]
=\frac{t^2}{2}(k^2-\lambda)\int_a^bw^2dx
=\frac{Lt^2}{4}(k^2-\lambda)<0\quad(t\ne0).
$$
任意に小さい $t$ で $u=0$ より小さい値があり、$|t|\to\infty$ で $J_\lambda[tw]\to-\infty$ です。
<!-- proof-end -->

ここでは $F_{pp}=1>0$ が常に成り立ちます。それでも $\lambda>\pi^2/L^2$ なら最小ではありません。Legendre条件は**傾き方向の局所凸性**であり、関数全体の最小性ではないのです。

さらに閾値 $\lambda=k^2$ での二次形式の退化は、一般の非線形問題で特に注意が必要です。例えば $J_k[u]-\int u^4dx$ は $u=0$ で $Q\ge0$ のままですが、$u=tw$ で値は $-t^4\int w^4dx<0$ となります。同じ二次形式を持つ $J_k[u]+\int u^4dx$ は $u=0$ の狭義大域最小性を持ちます。**半正定値の Hessian だけでは十分条件になりません。**

## 5. Jacobi方程式は二次形式の零方向から現れる

次に二次形式 $Q_u$ 自体を停留させる問題を考えます。$u$ は元の $J$ の停留曲線とし、$P>0$ を仮定します。元の解の近くで一次の微小ずれを扱うと、二次形式の Euler–Lagrange 方程式が現れます。

<a id="def-var2-jacobi-direction"></a>
<!-- formal-statement-start -->
> **定義（Jacobi方程式と零方向）**  
> $P=F_{pp}$、$R=F_{yp}$、$S=F_{yy}$ を停留曲線 $u$ 上で評価し、$P,R\in C^1$ とする。$h\in C^2$ に対する方程式
$$
-(Ph')'+(S-R')h=0
$$
> を、このスカラー固定端変分問題の Jacobi方程式という。両端 $h(a)=h(b)=0$ を満たす非零解があるとき、二次形式の退化方向（零方向）という。$P>0$ なら、$h(a)=0$ かつ $h'(a)\ne0$ の解が、別の点 $c\in(a,b]$ で $h(c)=0$ を満たすとき、$c$ をこの方程式に関して $a$ の共役点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var2-jacobi-direction -->
**定義の確認**。 $F=\frac12(p^2-\lambda y^2)$、$\lambda>0$ では $P=1,R=0,S=-\lambda$ なので Jacobi方程式は $h''+\lambda h=0$ です。初期値 $h(a)=0,\ h'(a)=1$ を解くと
$$
h(x)=\frac{\sin(\sqrt\lambda(x-a))}{\sqrt\lambda}.
$$
$h(a)=0,\ h'(a)=1\ne0$、最初の正の零点は $c=a+\pi/\sqrt\lambda$ です。$b=c$ なら $h(b)=0$ でもあるため $h$ は二次形式の非零零方向です。$b<c$ ではこの初期値解は区間内で再びゼロになりません。
<!-- definition-example-end -->

<a id="prop-var2-jacobi-variation"></a>
<!-- formal-statement-start -->
> **命題（二次形式の停留方程式）**  
> 上記の正則性の下で、固定端方向 $h,\eta$ に対し
$$
\frac12\left.\frac d{ds}Q_u(h+s\eta)\right|_{s=0}
=\int_a^b\{-(Ph')'+(S-R')h\}\eta\,dx.
$$
> 従って $Q_u$ が $h$ で全固定端方向に停留することと、$h$ が Jacobi方程式を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

二次形式を $h+s\eta$ に代入して $s$ の一次係数を取ります。$\eta'$ が掛かる項を部分積分すると、$-(Ph')'+S h-R'h$ が出ます。これは元の第一変分と同じ仕組みです。

<!-- proof-start -->
### 証明

[二次形式の公式](#prop-var2-hessian)に $h+s\eta$ を代入します。$s$ の一次係数は
$$
\frac12\left.\frac d{ds}Q_u(h+s\eta)\right|_{s=0}
=\int_a^b[Ph'\eta'+R(h\eta'+h'\eta)+Sh\eta]dx.
$$
$\eta(a)=\eta(b)=0$ により
$$
\int_a^b(Ph'+Rh)\eta'\,dx
=-\int_a^b(Ph'+Rh)'\eta\,dx.
$$
これに残りの項を足すと
$$
\begin{aligned}
&-(Ph'+Rh)'+Rh'+Sh\\
&=-(Ph')'-R'h-Rh'+Rh'+Sh\\
&=-(Ph')'+(S-R')h.
\end{aligned}
$$
従って表示した恒等式を得ます。もし全方向でゼロなら [変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を連続な括弧内の関数に適用して Jacobi方程式を得ます。逆は積分表示から直ちに従います。
<!-- proof-end -->

$P>0$ を仮定したこの場合、係数の規則性があれば初期値 $h(a)=0,\ h'(a)=1$ から Jacobi方程式の解は一意に定まります。共役点はその解が再びゼロになる場所です。Sturm型模型では $b-a=\pi/\sqrt\lambda$ で零方向が現れ、それより長い区間で負方向が存在することを前節で具体的に見ました。

ただし **一般の曲線上で「共役点があれば負方向がある」等をここでは無条件に定理化しません**。境界条件・Legendreの正値性・零点の位置（内部か終点か）を確認する必要があり、Riemann多様体上の Jacobi場と共役点の一般論は後続の VAR5 で扱います。

## 6. 診断手順と次への接続

最小性を調べるときはまず許容クラスと比較位相を固定し、[第一変分と境界項](../VAR1/index.md#prop-var1-first-variation-boundary)から停留条件を確かめます。次に[第二変分の二次形式](#prop-var2-hessian)を計算して非負性を検査します。そのうえで $P$ の符号、混合項を消した $S-R'$、区間長と端点条件を確認し、必要なら[強制評価の十分条件](#thm-var2-coercive-sufficient)を使います。退化するときに現れる Jacobi方程式は、これから測地線の第二変分を理解するための準備です。

ここで必要条件と十分条件を区別できました。しかし、そもそも極小点が存在するとは限りません。存在論は VAR9 の直接法へ、曲線と曲率の幾何的変分は VAR3 以降へ進みます。

---

# 演習

## VAR2-A01 二次形式を直接求める

- Level: A
- 目安時間: 10分

$J[u]=\int_0^1[\frac12(u')^2+3u^2]dx$、$u=0$、$\eta=x(1-x)$ とする。$J[\varepsilon\eta]$ を展開し、第一変分、第二変分、$Q_0(\eta)$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$J[\varepsilon\eta]=\varepsilon^2\int_0^1[\frac12(\eta')^2+3\eta^2]dx$ です。$\eta'=1-2x$ から
$$
\int_0^1(\eta')^2dx
=\int_0^1(1-4x+4x^2)dx=1-2+\frac43=\frac13,
$$
また $\eta^2=x^2-2x^3+x^4$ なので
$$
\int_0^1\eta^2dx=\frac13-\frac12+\frac15=\frac1{30}.
$$
従って $J[\varepsilon\eta]=\varepsilon^2(1/6+1/10)=4\varepsilon^2/15$。$\varepsilon=0$ で一回微分すると $\delta J[0;\eta]=0$、二回微分すると $Q_0(\eta)=8/15$ です。[第二変分の定義](#def-var2-second-variation)では二次係数そのものではなく二階微分を取るので、係数に $2$ を掛けます。
<!-- solution-end -->

## VAR2-A02 Legendre条件だけでは足りない

- Level: A
- 目安時間: 10分

固定端 $[0,1]$ で $J[u]=\frac12\int_0^1[(u')^2-16u^2]dx$ とする。$u=0$ で $F_{pp}$ を求め、$\eta=\sin(\pi x)$ の第二変分を計算して最小性を判定せよ。

<!-- solution-start -->
### 詳細解答

$F=\frac12(p^2-16y^2)$ より $F_{pp}=1>0$ です。しかし [二次形式の公式](#prop-var2-hessian)は
$$
Q_0(\eta)=\int_0^1[(\eta')^2-16\eta^2]dx
$$
です。$\eta'=\pi\cos(\pi x)$、$\int_0^1\sin^2(\pi x)dx=\int_0^1\cos^2(\pi x)dx=1/2$ より
$$
Q_0(\eta)=\frac{\pi^2-16}{2}<0
$$
となります。$\pi^2<16$ だから[第二必要条件](#thm-var2-necessary)に反し、$u=0$ は局所最小ではありません。強められたLegendre条件があっても負の $S$ の影響は残ります。
<!-- solution-end -->

## VAR2-A03 退化する局所最小点

- Level: A
- 目安時間: 10分

固定端ゼロで $J[u]=\int_0^1(u')^4dx$ とする。$u=0$ の第二変分を求め、$u=0$ が狭義大域最小点か判定せよ。

<!-- solution-start -->
### 詳細解答

$J[\varepsilon\eta]=\varepsilon^4\int_0^1(\eta')^4dx$ なので、一回・二回微分を $\varepsilon=0$ で評価するとともにゼロです。ゆえに $Q_0(\eta)=0$ です。ところが $J[v]\ge0=J[0]$ であり、等号なら $v'=0$、固定端より $v\equiv0$ です。従って $u=0$ は狭義大域最小点です。[第二必要条件](#thm-var2-necessary)が半正定値までしか要求しないことを確認できます。
<!-- solution-end -->

## VAR2-A04 Jacobi方程式の代入

- Level: A
- 目安時間: 12分

$F(x,y,p)=\frac12p^2+xyp+\frac12(2+x^2)y^2$、停留曲線 $u=0$ の場合、$P,R,S$ を求め Jacobi方程式を示せ。また $h=e^{-x}$ を代入して解かどうか検査せよ。

<!-- solution-start -->
### 詳細解答

$F_{pp}=1$、$F_{yp}=x$、$F_{yy}=2+x^2$ です。$u=0$ は $F_y-F_p'=0$ を満たします。$R'=1$ だから [Jacobi方程式の定義](#def-var2-jacobi-direction)より
$$
-h''+(1+x^2)h=0.
$$
$h=e^{-x}$ は $h''=e^{-x}$ なので左辺は
$$
-e^{-x}+(1+x^2)e^{-x}=x^2e^{-x}.
$$
$x\ne0$ でゼロではありません。従って $e^{-x}$ は解ではありません。係数に $x^2$ があるのを見落として定係数方程式と思い込んではいけません。
<!-- solution-end -->

## VAR2-B01 混合項を取り去る

- Level: B
- 目安時間: 18分

$[0,1]$、固定端ゼロ、$F(x,y,p)=\frac12p^2+\alpha xyp+\frac12\beta y^2$ とする。$u=0$ が停留することを示し、$Q_0$ を部分積分で簡約せよ。$\beta-\alpha>-\pi^2$ なら狭義大域最小であることを示せ。

<!-- solution-start -->
### 詳細解答

$F_y=\alpha xp+\beta y$、$F_p=p+\alpha xy$ なので $u=0$ ではどちらもゼロとなり、[第一変分](../VAR1/index.md#prop-var1-first-variation-boundary)は全方向でゼロです。$P=1,R=\alpha x,S=\beta$ より
$$
Q_0(\eta)=\int_0^1[(\eta')^2+2\alpha x\eta\eta'+\beta\eta^2]dx.
$$
$2x\eta\eta'=(x\eta^2)'-\eta^2$、端点で $\eta=0$ を使うと
$$
Q_0(\eta)=\int_0^1[(\eta')^2+(\beta-\alpha)\eta^2]dx.
$$
もし $\beta-\alpha\ge0$ なら非零方向で正です。もし $-\pi^2<\beta-\alpha<0$ なら [Wirtinger不等式](#lem-var2-wirtinger)により
$$
Q_0(\eta)\ge\left(1+\frac{\beta-\alpha}{\pi^2}\right)\int_0^1(\eta')^2dx>0
$$
です。$J[\eta]=\tfrac12Q_0(\eta)$ という二次汎関数なので、非零 $\eta$ で $J[\eta]>J[0]$ が全許容曲線について成り立ち、狭義大域最小です。
<!-- solution-end -->

## VAR2-B02 閾値で四次の符号を見る

- Level: B
- 目安時間: 18分

$[0,1]$ の固定端ゼロで
$$
J_\pm[u]=\frac12\int_0^1[(u')^2-\pi^2u^2]dx\ \pm\int_0^1u^4dx
$$
とする。二つの汎関数が $u=0$ で同じ第二変分を持つことを確認し、最小性の違いを証明せよ。

<!-- solution-start -->
### 詳細解答

任意の方向 $\eta$ について
$$
J_\pm[\varepsilon\eta]
=\frac{\varepsilon^2}{2}\int_0^1[(\eta')^2-\pi^2\eta^2]dx
\ \pm\varepsilon^4\int_0^1\eta^4dx.
$$
二回微分して $\varepsilon=0$ に戻すと両方とも $Q_0(\eta)=\int[(\eta')^2-\pi^2\eta^2]$ です。[Wirtinger不等式](#lem-var2-wirtinger)でこの量は非負です。$J_+$ は二次項が非負、四次項は非零連続 $\eta$ で正なので $u=0$ が狭義大域最小点です。一方 $w=\sin(\pi x)$ に対して二次項はゼロで、
$$
J_-[tw]=-t^4\int_0^1\sin^4(\pi x)dx=-\frac{3t^4}{8}<0\quad(t\ne0).
$$
$t$ をいくらでも小さくできるため $J_-$ は $u=0$ で局所最小でありません。半正定値だけで結論できない典型例です。
<!-- solution-end -->

## VAR2-B03 共役点と区間長

- Level: B
- 目安時間: 20分

$J[u]=\frac12\int_0^T[(u')^2-4u^2]dx$、固定端ゼロ、$T>0$ とする。$u=0$ の Jacobi方程式を初期値 $h(0)=0,h'(0)=1$ で解き、最初の共役点と最小性の三場合を求めよ。

<!-- solution-start -->
### 詳細解答

$P=1,R=0,S=-4$ なので [Jacobi方程式](#def-var2-jacobi-direction)は $h''+4h=0$ です。一般解 $h=A\cos(2x)+B\sin(2x)$ へ $h(0)=0$ を入れると $A=0$、$h'(0)=2B=1$ より
$$
h(x)=\frac12\sin(2x).
$$
最初の正の零点は $x=\pi/2$ です。[Sturm型模型の定理](#thm-var2-sturm-model)に $L=T,\lambda=4$ を入れると、$T<\pi/2$ で唯一の大域最小、$T=\pi/2$ で $u=C\sin(2x)$ も大域最小、$T>\pi/2$ で $u=0$ は最小でなく汎関数は下に非有界です。終点に共役点がある閾値でも、二次模型では負方向はまだ生じない点に注意します。
<!-- solution-end -->

## VAR2-C01 Legendre条件から十分性へ

- Level: C
- 目安時間: 35分

$L=b-a>0$、固定端をもつ停留曲線 $u$ に沿って $P=F_{pp}$、$R=F_{yp}$、$S=F_{yy}$ が $C^1$、$F\in C^3$ とする。$P(x)\ge2$、$S(x)-R'(x)\ge-1$ が全区間で成立すると仮定する。

1. $Q_u$ を混合項なしの形へ変形せよ。
2. $L<\pi\sqrt2$ の場合、$Q_u$ の強制評価定数を一つ明示せよ。
3. $u$ が $C^1$ 狭義局所最小点になる理由を Taylor の剰余評価まで示せ。
4. $L=\pi\sqrt2$ の場合、同じ仮定から狭義最小性を結論できないことを具体的な二次汎関数で示せ。

<!-- solution-start -->
### 詳細解答

まず [二次形式](#prop-var2-hessian)の混合項は
$$
2R\eta\eta'=(R\eta^2)'-R'\eta^2
$$
です。固定端 $\eta(a)=\eta(b)=0$ だから境界項が消え、
$$
Q_u(\eta)=\int_a^b[P(\eta')^2+(S-R')\eta^2]dx
\ge2\int_a^b(\eta')^2dx-\int_a^b\eta^2dx.
$$
[Wirtinger不等式](#lem-var2-wirtinger)より $\int\eta^2\le L^2/\pi^2\int(\eta')^2$。従って $L<\pi\sqrt2$ なら
$$
Q_u(\eta)\ge\left(2-\frac{L^2}{\pi^2}\right)\int_a^b(\eta')^2dx.
$$
さらに $\int(\eta^2+(\eta')^2)\le(1+L^2/\pi^2)\int(\eta')^2$ なので、明示的な強制評価定数として
$$
c=\frac{2-L^2/\pi^2}{1+L^2/\pi^2}>0
$$
を取れます。

第三問では $h=v-u$ と置き、$J[u+h]-J[u]$ を $u$ に沿って二次展開します。$F$ の三階偏微分が曲線周囲の小さいコンパクト領域で有界であるため
$$
J[u+h]-J[u]
=\delta J[u;h]+\tfrac12Q_u(h)+\mathcal R,\quad
|\mathcal R|\le M\|h\|_{C^1}\|h\|_{H^1}^2
$$
です。停留性で $\delta J[u;h]=0$。$\|h\|_{C^1}<c/(4M)$ とすれば
$$
J[u+h]-J[u]\ge(c/2-M\|h\|_{C^1})\|h\|_{H^1}^2
\ge\frac c4\|h\|_{H^1}^2>0
$$
が非零 $h$ に対して成立します。ゆえに $C^1$ 狭義局所最小です。

最後に $L=\pi\sqrt2$ で $F(x,y,p)=p^2-\frac12y^2$ と置きます。この場合 $P=2,R=0,S=-1$ は仮定を等号で満たし、$u=0$ は停留します。$\eta=\sin(\pi(x-a)/L)$ に対して
$$
Q_0(\eta)=2\int(\eta')^2-\int\eta^2
=\left(\frac{2\pi^2}{L^2}-1\right)\int\eta^2=0.
$$
$J[t\eta]=J[0]=0$ が任意の $t$ で成り立つので $u=0$ は狭義最小ではありません。強制評価の閾値を等号にしても十分性は保てません。
<!-- solution-end -->

## VAR2-C02 Jacobi方程式と安定性の限界

- Level: C
- 目安時間: 30分

固定端 $[0,T]$ の二次汎関数
$$
J[u]=\frac12\int_0^T[(u')^2-\omega^2u^2]dx,\quad\omega>0
$$
について、$u=0$ の第一変分、第二変分、Jacobi方程式、初期値 $h(0)=0,h'(0)=1$ の解を求めよ。$T=\pi/\omega$ と $T> \pi/\omega$ で最小性がどう異なるか、零方向と負方向をそれぞれ具体的に与えて説明せよ。

<!-- solution-start -->
### 詳細解答

$F=\frac12(p^2-\omega^2y^2)$ ですから $F_y=-\omega^2y,F_p=p$ であり、$u=0$ では[第一変分](../VAR1/index.md#prop-var1-first-variation-boundary)がゼロです。[第二変分の式](#prop-var2-hessian)は
$$
Q_0(\eta)=\int_0^T[(\eta')^2-\omega^2\eta^2]dx.
$$
$P=1,R=0,S=-\omega^2$ を[Jacobi方程式](#def-var2-jacobi-direction)へ代入すると $h''+\omega^2h=0$ です。$h(0)=0$ を満たす一般解は $h=B\sin(\omega x)$、$h'(0)=B\omega=1$ より
$$
h(x)=\frac{\sin(\omega x)}{\omega}.
$$
最初の正の零点は $c=\pi/\omega$ です。

$T=c$ ではこの $h$ は固定端方向でもあり、[鋭い不等式](#lem-var2-wirtinger)の等号を満たして $Q_0(h)=0$。また $J[u]\ge0$ が全許容曲線について成り立ち、$u=th$ も同じ最小値 $0$ を取ります。従って **狭義ではない大域最小**です。

$T>c$ では $\eta_T(x)=\sin(\pi x/T)$ を取ります。端点でゼロ、かつ
$$
Q_0(\eta_T)=\left(\frac{\pi^2}{T^2}-\omega^2\right)\int_0^T\eta_T^2dx
=\frac T2\left(\frac{\pi^2}{T^2}-\omega^2\right)<0.
$$
従って $J[\varepsilon\eta_T]=\frac{\varepsilon^2}{2}Q_0(\eta_T)<0=J[0]$ であり $u=0$ は局所最小ではありません。この具体模型は、**終点での零方向**と**区間が長くなったときの負方向**を区別する例です。一般の幾何的第二変分への結論は追加の仮定を要します。
<!-- solution-end -->
