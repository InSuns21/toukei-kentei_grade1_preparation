# MT4 標準測度論：Lebesgue 微分定理・絶対連続関数

この章では、積分で平均化した情報をほとんど至る所で点の値へ戻す **Lebesgue 微分定理**と、微積分学の基本定理が最も自然に成立する関数類である **絶対連続関数**を結びます。

```text
Lebesgue測度の正則性（MT0）
        ↓
C_c(R) の L1 稠密性
        ↓
1次元区間選択補題
        ↓
Hardy–Littlewood maximal 弱 (1,1) 評価
        ↓
Lebesgue 微分定理 / 密度定理
        ↓
L1 の不定積分は絶対連続かつ a.e. 微分可能
        ↓
絶対連続関数は BV → 単調ACの差
        ↓
Lebesgue–Stieltjes測度 + RN（MT3）
        ↓
AC版 FTC：F(x)-F(a)=∫ F'
```

本章は実数直線上の1次元版に集中します。高次元の球・立方体による微分基底や一般 Vitali covering theorem は扱いません。

---

## 1. 局所可積分関数と平均

<a id="def-mt4-l1loc"></a>
<!-- formal-statement-start -->
### 定義（局所可積分）

可測関数 $f:\mathbb R\to\mathbb R$ が

$$
\boxed{f\in L^1_{\mathrm{loc}}(\mathbb R)}
$$

であるとは、任意の有界区間 $I$ に対して

$$
\int_I|f|\,d\lambda<\infty
$$

となることをいう。
<!-- formal-statement-end -->

Lebesgue 微分定理は、$f$ が全空間で $L^1$ であることまでは要求しません。点の近くで積分可能なら十分です。

---

## 2. $C_c(\mathbb R)$ は $L^1(\mathbb R)$ で稠密

最大関数の弱型評価から微分定理へ進む際、一般の $L^1$ 関数を連続関数で近似します。その依存をここで閉じます。

<a id="thm-mt4-cc-dense-l1"></a>
<!-- formal-statement-start -->
### 補題（$C_c(\mathbb R)$ の $L^1$ 稠密性）

任意の $f\in L^1(\mathbb R)$ と $\varepsilon>0$ に対して、コンパクト台を持つ連続関数 $g\in C_c(\mathbb R)$ が存在して

$$
\boxed{\|f-g\|_1<\varepsilon}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 2.1 まず有界・有界台へ切る

$$
f_{M,R}(x)
=
\max(-M,\min(f(x),M))1_{[-R,R]}(x)
$$

と置きます。$M,R\to\infty$ とすれば $f_{M,R}\to f$ a.e. で、

$$
|f_{M,R}-f|\le2|f|
$$

です。DCT により十分大きい $M,R$ で

$$
\|f-f_{M,R}\|_1<\frac\varepsilon3.
$$

以後 $f_{M,R}$ を $u$ と書きます。

#### 2.2 有限単関数へ落とす

有界可測関数 $u$ は有限値単関数で一様近似できます。台が $[-R,R]$ に入るので、有限単関数

$$
s=\sum_{j=1}^m a_j1_{E_j},
\qquad E_j\subset[-R,R]
$$

を

$$
\|u-s\|_\infty<\frac{\varepsilon}{6R}
$$

となるように取れば

$$
\|u-s\|_1<\frac\varepsilon3.
$$

#### 2.3 可測集合の指示関数を連続関数で近似する

各 $E_j$ は有限測度です。[MT0 の Lebesgue 測度の内・外正則性](../MT0/index.md)により、任意の $\eta>0$ に対して

$$
K_j\subset E_j\subset O_j,
$$

$$
K_j\text{ compact},\qquad O_j\text{ bounded open},
$$

かつ

$$
\lambda(O_j\setminus K_j)<\eta
$$

とできます。

$K_j=\varnothing$ の場合は $\phi_j=0$ とし、それ以外では

$$
\phi_j(x)
=
\frac{d(x,O_j^c)}{d(x,O_j^c)+d(x,K_j)}
$$

と置きます。$K_j\subset O_j$ かつ $K_j$ は compact なので分母は0になりません。$\phi_j$ は連続で

$$
0\le\phi_j\le1,
\qquad
\phi_j=1\text{ on }K_j,
\qquad
\phi_j=0\text{ on }O_j^c.
$$

$O_j$ は有界なので $\phi_j\in C_c(\mathbb R)$ です。また

$$
|1_{E_j}-\phi_j|
\le1_{O_j\setminus K_j},
$$

従って

$$
\|1_{E_j}-\phi_j\|_1
\le\lambda(O_j\setminus K_j)<\eta.
$$

$$
g=\sum_{j=1}^ma_j\phi_j
$$

と置けば $g\in C_c(\mathbb R)$。$\eta$ を十分小さく取れば

$$
\|s-g\|_1
\le
\sum_{j=1}^m|a_j|\|1_{E_j}-\phi_j\|_1
<\frac\varepsilon3.
$$

以上より

$$
\|f-g\|_1
\le
\|f-u\|_1+\|u-s\|_1+\|s-g\|_1
<\varepsilon.
$$

$\square$
<!-- proof-end -->

---

## 3. 1次元区間選択補題

<a id="thm-mt4-interval-selection"></a>
<!-- formal-statement-start -->
### 補題（有限区間族からの互いに素な選択）

有限個の有界区間 $I_1,\ldots,I_N$ が与えられたとする。このとき互いに素な部分族

$$
J_1,\ldots,J_m
$$

を選べて

$$
\boxed{
\bigcup_{k=1}^NI_k
\subset
\bigcup_{j=1}^m3J_j}
$$

となる。

ここで $3J$ は $J$ と同じ中心を持ち長さを3倍した区間を表す。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

残っている区間のうち長さ最大のものを一つ選び $J_1$ とし、$J_1$ と交わる区間を全て捨てます。残った区間から再び長さ最大のものを $J_2$ として同じ操作を繰り返します。有限族なので有限回で停止し、選ばれた $J_j$ は互いに素です。

捨てられた区間 $I$ は、捨てられた時点である $J_j$ と交わり、かつ

$$
|I|\le|J_j|
$$

でした。$I$ と $J_j$ が交わり、$I$ の長さが $J_j$ 以下なら、$I$ のどの点も $J_j$ の中心から高々 $3|J_j|/2$ の距離にあります。従って

$$
I\subset3J_j.
$$

選ばれた区間自身も当然 $3J_j$ に含まれるので、元の全区間の合併が $\bigcup_j3J_j$ に含まれます。$\square$
<!-- proof-end -->

定数3そのものは本質ではありません。重要なのは、重なった区間族から互いに素な族を取り出しつつ、合併の長さを定数倍で支配できることです。

---

## 4. Hardy–Littlewood maximal function の弱 $(1,1)$ 評価

<a id="def-mt4-maximal"></a>
<!-- formal-statement-start -->
### 定義（非中心 Hardy–Littlewood maximal function）

$f\in L^1(\mathbb R)$ に対し

$$
\boxed{
Mf(x)
:=
sup_{I\ni x}
\frac1{|I|}\int_I|f(y)|\,dy,}
$$

ただし上限は $x$ を含む有界開区間 $I$ 全体について取る。
<!-- formal-statement-end -->

<a id="thm-mt4-maximal-weak11"></a>
<!-- formal-statement-start -->
### 定理（Hardy–Littlewood maximal 弱 $(1,1)$ 評価）

$f\in L^1(\mathbb R)$、$\alpha>0$ とする。このとき

$$
\boxed{
\lambda(\{Mf>\alpha\})
\le
\frac3\alpha\|f\|_1.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
E_\alpha=\{x:Mf(x)>\alpha\}
$$

と置きます。$x\in E_\alpha$ なら、ある有界開区間 $I_x\ni x$ が存在して

$$
\frac1{|I_x|}\int_{I_x}|f|>\alpha.
$$

$I_x$ の全ての点 $y$ について同じ区間 $I_x$ が $y$ を含むので $Mf(y)>\alpha$。従って $E_\alpha$ は開集合です。

任意の compact $K\subset E_\alpha$ を取ります。$(I_x)_{x\in K}$ は $K$ の開被覆なので有限部分被覆

$$
I_1,\ldots,I_N
$$

を取れます。[区間選択補題](#thm-mt4-interval-selection)により互いに素な $J_1,\ldots,J_m$ を選んで

$$
K\subset\bigcup_{j=1}^m3J_j.
$$

従って

$$
\lambda(K)
\le
3\sum_{j=1}^m|J_j|.
$$

各 $J_j$ は元の候補区間の一つなので

$$
\alpha|J_j|<\int_{J_j}|f|.
$$

互いに素であることから

$$
\lambda(K)
<
\frac3\alpha
\sum_j\int_{J_j}|f|
\le
\frac3\alpha\|f\|_1.
$$

$E_\alpha$ は開集合であり Lebesgue 測度は内正則なので、compact $K\subset E_\alpha$ について上限を取れば

$$
\lambda(E_\alpha)
\le
\frac3\alpha\|f\|_1.
$$

$\square$
<!-- proof-end -->

---

## 5. Lebesgue 微分定理

<a id="thm-mt4-lebesgue-differentiation-l1"></a>
<!-- formal-statement-start -->
### 定理（Lebesgue 微分定理：$L^1(\mathbb R)$ 版）

$f\in L^1(\mathbb R)$ とする。このとき a.e. $x\in\mathbb R$ について

$$
\boxed{
\lim_{I\ni x,\ |I|\to0}
\frac1{|I|}\int_I|f(y)-f(x)|\,dy
=0.}
$$

特に

$$
\boxed{
\lim_{r\downarrow0}
\frac1{2r}\int_{x-r}^{x+r}f(y)\,dy
=f(x)}
$$

が a.e. $x$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

連続関数 $g$ なら小区間平均は点値へ戻るのは明らかです。一般の $f$ を $g\in C_c$ で $L^1$ 近似し、誤差 $h=f-g$ の小区間平均を maximal function で支配します。弱 $(1,1)$ 評価により「平均誤差が大きい点」の測度を $\|h\|_1$ で押さえ、近似誤差を0へ送ります。

<!-- proof-start -->
### 証明

各 $x$ に対して

$$
Df(x)
:=
\limsup_{I\ni x,\ |I|\to0}
\frac1{|I|}\int_I|f(y)-f(x)|\,dy
$$

と置きます。

任意の $g\in C_c(\mathbb R)$ と $h=f-g$ に対し

$$
|f(y)-f(x)|
\le
|h(y)|+|h(x)|+|g(y)-g(x)|.
$$

$x$ を含む区間 $I$ の長さを0へ送ると、$g$ の連続性から

$$
\lim_{I\ni x,\ |I|\to0}
\frac1{|I|}\int_I|g(y)-g(x)|dy=0.
$$

従って

$$
Df(x)
\le
Mh(x)+|h(x)|.
$$

$\delta>0$ を固定します。すると

$$
\{Df>2\delta\}
\subset
\{Mh>\delta\}\cup\{|h|>\delta\}.
$$

maximal 弱 $(1,1)$ 評価と積分版 Markov 評価から

$$
\lambda(\{Df>2\delta\})
\le
\frac3\delta\|h\|_1
+
\frac1\delta\|h\|_1
=
\frac4\delta\|f-g\|_1.
$$

[$C_c$ の $L^1$ 稠密性](#thm-mt4-cc-dense-l1)により右辺は任意に小さくできます。従って

$$
\lambda(\{Df>2\delta\})=0.
$$

これは任意の $\delta>0$ で成り立つので、例えば $\delta=1/n$ として可算和を取れば

$$
Df(x)=0
$$

が a.e. $x$ で成立します。

最後に

$$
\left|
\frac1{2r}\int_{x-r}^{x+r}f(y)dy-f(x)
\right|
\le
\frac1{2r}\int_{x-r}^{x+r}|f(y)-f(x)|dy
$$

なので対称平均の結論も従います。$\square$
<!-- proof-end -->

<a id="thm-mt4-lebesgue-differentiation-local"></a>
<!-- formal-statement-start -->
### 系（$L^1_{\mathrm{loc}}$ 版）

$f\in L^1_{\mathrm{loc}}(\mathbb R)$ なら、a.e. $x$ について

$$
\boxed{
\lim_{I\ni x,\ |I|\to0}
\frac1{|I|}\int_I|f(y)-f(x)|dy=0.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各整数 $n\ge1$ について

$$
f_n=f1_{[-n,n]}
$$

は $L^1(\mathbb R)$ に属します。$x\in(-n,n)$ なら十分小さい $I\ni x$ は $[-n,n]$ に含まれるため、$f$ と $f_n$ の局所平均は一致します。$L^1$ 版を各 $n$ に適用し、可算個の例外零集合を合併すれば結論が従います。$\square$
<!-- proof-end -->

---

## 6. Lebesgue 密度定理

<a id="thm-mt4-density"></a>
<!-- formal-statement-start -->
### 定理（Lebesgue 密度定理）

$E\subset\mathbb R$ を Lebesgue 可測集合とする。このとき a.e. $x\in E$ について

$$
\boxed{
\lim_{r\downarrow0}
\frac{\lambda(E\cap(x-r,x+r))}{2r}=1,}
$$

また a.e. $x\notin E$ について同じ極限は0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f=1_E$ は局所可積分です。Lebesgue 微分定理より a.e. $x$ で

$$
\frac1{2r}\int_{x-r}^{x+r}1_E(y)dy
\to1_E(x).
$$

左辺は

$$
\frac{\lambda(E\cap(x-r,x+r))}{2r}
$$

そのものです。$1_E(x)=1$ なら密度1、$1_E(x)=0$ なら密度0となります。$\square$
<!-- proof-end -->

この定理は「可測集合は境界が複雑でも、ほとんど全ての点を十分拡大すると、その点が属する側でほぼ埋め尽くされる」と読めます。

---

# 絶対連続関数

## 7. 絶対連続性

<a id="def-mt4-ac"></a>
<!-- formal-statement-start -->
### 定義（絶対連続関数）

$F:[a,b]\to\mathbb R$ が絶対連続（absolutely continuous; AC）であるとは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、互いに素な有限個の開区間

$$
(x_1,y_1),\ldots,(x_m,y_m)\subset[a,b]
$$

が

$$
\sum_{k=1}^m(y_k-x_k)<\delta
$$

を満たすなら

$$
\boxed{
\sum_{k=1}^m|F(y_k)-F(x_k)|<\varepsilon}
$$

となることをいう。
<!-- formal-statement-end -->

$m=1$ とすれば AC なら一様連続、従って連続です。しかし連続だけでは、互いに素な多数の小区間上の変動総量を同時には制御できません。

---

## 8. Lebesgue 積分の絶対連続性

<a id="thm-mt4-integral-absolute-continuity"></a>
<!-- formal-statement-start -->
### 補題（積分の絶対連続性）

$f\in L^1([a,b])$ とする。任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、可測集合 $E\subset[a,b]$ が

$$
\lambda(E)<\delta
$$

を満たせば

$$
\boxed{
\int_E|f|d\lambda<\varepsilon}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|f|1_{\{|f|>M\}}\downarrow0$ a.e. で $|f|$ に支配されるので、DCT により

$$
\int_{\{|f|>M\}}|f|\to0.
$$

従って $M$ を

$$
\int_{\{|f|>M\}}|f|<\frac\varepsilon2
$$

となるように取ります。さらに

$$
\delta=\frac\varepsilon{2M}
$$

とします（$M=0$ なら結論は自明）。$\lambda(E)<\delta$ なら

$$
\begin{aligned}
\int_E|f|
&=
\int_{E\cap\{|f|\le M\}}|f|
+
\int_{E\cap\{|f|>M\}}|f|\\
&\le
M\lambda(E)
+
\int_{\{|f|>M\}}|f|\\
&<\frac\varepsilon2+\frac\varepsilon2
=\varepsilon.
\end{aligned}
$$

$\square$
<!-- proof-end -->

---

## 9. $L^1$ の不定積分は AC で、微分すると元へ戻る

<a id="thm-mt4-indefinite-integral-ac"></a>
<!-- formal-statement-start -->
### 定理（$L^1$ 不定積分の絶対連続性）

$f\in L^1([a,b])$ とし

$$
F(x)=c+\int_a^xf(t)dt
$$

と定める。このとき

$$
\boxed{F\in AC([a,b])}
$$

であり、さらに

$$
\boxed{F'(x)=f(x)\quad\text{a.e. }x\in[a,b].}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ に対し[積分の絶対連続性](#thm-mt4-integral-absolute-continuity)から対応する $\delta>0$ を取ります。互いに素な $(x_k,y_k)$ が

$$
\sum_k(y_k-x_k)<\delta
$$

を満たすなら

$$
E=\bigcup_k(x_k,y_k)
$$

は $\lambda(E)<\delta$ です。従って

$$
\begin{aligned}
\sum_k|F(y_k)-F(x_k)|
&=
\sum_k\left|\int_{x_k}^{y_k}f(t)dt\right|\\
&\le
\sum_k\int_{x_k}^{y_k}|f(t)|dt\\
&=
\int_E|f|d\lambda
<\varepsilon.
\end{aligned}
$$

よって $F$ は AC です。

微分について、Lebesgue 微分定理が成り立つ点 $x\in(a,b)$ を取ります。$h>0$ なら

$$
\frac{F(x+h)-F(x)}h
=
\frac1h\int_x^{x+h}f(t)dt.
$$

従って

$$
\left|
\frac{F(x+h)-F(x)}h-f(x)
\right|
\le
\frac1h\int_x^{x+h}|f(t)-f(x)|dt\to0.
$$

$h<0$ でも区間 $[x+h,x]$ を使って同じ評価が成り立ちます。従って $F'(x)=f(x)$。Lebesgue 微分定理の例外集合は零集合なので a.e. で成立します。$\square$
<!-- proof-end -->

---

## 10. AC 関数は bounded variation

逆向きの FTC を証明するため、AC 関数を単調関数の差へ分解します。

<a id="def-mt4-bv"></a>
<!-- formal-statement-start -->
### 定義（全変動・bounded variation）

$F:[a,b]\to\mathbb R$ に対して

$$
V_a^b(F)
:=
sup_{a=x_0<\cdots<x_n=b}
\sum_{i=1}^n|F(x_i)-F(x_{i-1})|.
$$

これが有限のとき $F$ は bounded variation（BV）であるという。
<!-- formal-statement-end -->

<a id="thm-mt4-ac-implies-bv"></a>
<!-- formal-statement-start -->
### 定理（AC $\Rightarrow$ BV）

$$
\boxed{AC([a,b])\subset BV([a,b]).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

AC の定義で $\varepsilon=1$ に対応する $\delta>0$ を取ります。

任意の分割

$$
a=x_0<\cdots<x_n=b
$$

を考えます。必要なら各区間 $[x_{i-1},x_i]$ をさらに細分して、全ての小区間の長さを $\delta/2$ 未満にします。細分すると三角不等式により変動和は減らないので、この細分後の和を一様に抑えれば十分です。

得られた互いに素な小区間を、各群の長さの総和が $\delta$ 未満になるように順にグループ分けします。各小区間の長さが $\delta/2$ 未満なので、一群を閉じる直前までの総和は $\delta$ 未満で、各群は少なくとも最後の群を除けば総長 $\delta/2$ 以上になります。従って群の個数は

$$
N\le\frac{2(b-a)}\delta+1
$$

で一様に抑えられます。

各群には AC の定義を適用でき、その群に属する増分の絶対値の和は1未満です。従って全変動和は $N$ 未満。元の分割によらない有限上界があるため

$$
V_a^b(F)<\infty.
$$

$\square$
<!-- proof-end -->

<a id="thm-mt4-variation-ac"></a>
<!-- formal-statement-start -->
### 補題（AC 関数の変動関数も AC）

$F\in AC([a,b])$ とし

$$
V(x):=V_a^x(F)
$$

と置く。このとき

$$
\boxed{V\in AC([a,b])}
$$

であり、

$$
P=\frac{V+F-F(a)}2,
\qquad
N=\frac{V-F+F(a)}2
$$

は増加かつ AC で

$$
F(x)=F(a)+P(x)-N(x)
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x<y$ なら変動の加法性から

$$
V(y)-V(x)=V_x^y(F)\ge|F(y)-F(x)|.
$$

従って

$$
P(y)-P(x)
=\frac{V(y)-V(x)+F(y)-F(x)}2\ge0,
$$

$$
N(y)-N(x)
=\frac{V(y)-V(x)-F(y)+F(x)}2\ge0.
$$

よって $P,N$ は増加です。

次に $V$ の AC を示します。$F$ の AC に対し $\varepsilon>0$ から $\delta>0$ を取ります。互いに素な区間 $(x_k,y_k)$ の総長が $\delta$ 未満とします。

各 $k$ について $[x_k,y_k]$ の有限分割を取り、その変動和を $V_{x_k}^{y_k}(F)$ に任意に近づけます。全ての小区間を合わせても互いに素で総長は $\sum_k(y_k-x_k)<\delta$ です。従って AC の定義から、それらの増分絶対値の総和は $\varepsilon$ 未満です。近似誤差を0へ送れば

$$
\sum_k(V(y_k)-V(x_k))
=
\sum_kV_{x_k}^{y_k}(F)
\le\varepsilon.
$$

$V$ は増加なので左辺は

$$
\sum_k|V(y_k)-V(x_k)|
$$

そのものです。従って $V$ は AC。

最後に AC 関数の線形結合は AC なので $P,N$ も AC です。$\square$
<!-- proof-end -->

---

## 11. 増加 AC 関数から Lebesgue–Stieltjes 測度を作る

<a id="thm-mt4-stieltjes-measure"></a>
<!-- formal-statement-start -->
### 補題（連続増加関数の Lebesgue–Stieltjes 測度）

$G:[a,b]\to\mathbb R$ を連続増加関数とする。このとき有限 Borel 測度 $\nu_G$ が一意に存在し、

$$
\boxed{
\nu_G((s,t])=G(t)-G(s)
\qquad(a\le s<t\le b)}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

半開区間 $(s,t]$ と $\{a\}$ からなる半環上で

$$
\nu_0((s,t])=G(t)-G(s),
\qquad
\nu_0(\{a\})=0
$$

と置き、有限互いに素和へ加法的に延長します。

有限加法性は区間を端点で分割したときの望遠和

$$
G(t)-G(s)
=
\sum_i(G(t_i)-G(t_{i-1}))
$$

から従います。また $G$ の連続性により、端点が単調に縮む区間列に対して対応する増分も0へ縮みます。このため半環上の有限加法的関数は空集合へ減少する列に対して0へ連続であり、したがって前測度になります。

[MT0 で正本化した Carathéodory 拡張定理](../MT0/index.md)を適用すると、生成される Borel $\sigma$-代数へ有限測度として延長できます。有限測度なので拡張の一意性条件も満たします。$\square$
<!-- proof-end -->

この補題では Carathéodory 拡張定理そのものを再証明せず、**どの前測度へ適用しているか**を明示しています。

<a id="thm-mt4-ac-stieltjes-absolute"></a>
<!-- formal-statement-start -->
### 補題（増加 AC 関数の Stieltjes 測度は Lebesgue 測度に絶対連続）

$G$ が増加かつ AC なら

$$
\boxed{\nu_G\ll\lambda.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$E\subset[a,b]$ を Borel 集合で $\lambda(E)=0$ とします。任意の $\varepsilon>0$ に対し、$G$ の AC から対応する $\delta>0$ を取ります。

Lebesgue 測度の外正則性により、$E$ を含む開集合 $O\subset\mathbb R$ を

$$
\lambda(O)<\delta
$$

となるように取れます。$O\cap[a,b]$ は高々可算個の互いに素な区間の和です。

有限個の成分区間 $I_1,\ldots,I_m$ について、その長さの総和は $\lambda(O)<\delta$ です。$G$ の連続性により端点の開閉は $\nu_G$ の値に影響せず、AC の定義から

$$
\sum_{j=1}^m\nu_G(I_j)
<\varepsilon.
$$

有限部分和を増やして MCT（測度の下からの連続性）を使えば

$$
\nu_G(O\cap[a,b])\le\varepsilon.
$$

従って

$$
0\le\nu_G(E)\le\varepsilon.
$$

$\varepsilon$ は任意なので $\nu_G(E)=0$。よって $\nu_G\ll\lambda$ です。$\square$
<!-- proof-end -->

---

## 12. AC 版の微積分学の基本定理

<a id="thm-mt4-ac-ftc"></a>
<!-- formal-statement-start -->
### 定理（絶対連続関数の基本定理）

$F:[a,b]\to\mathbb R$ に対して次は同値である。

1. $F\in AC([a,b])$。
2. ある $f\in L^1([a,b])$ が存在して
   $$
   \boxed{
   F(x)=F(a)+\int_a^xf(t)dt
   \qquad(a\le x\le b).}
   $$

このとき

$$
\boxed{F'(x)\text{ は a.e. 存在し、 }F'\in L^1([a,b]),}
$$

$$
\boxed{
F(x)=F(a)+\int_a^xF'(t)dt.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$2\Rightarrow1$ と $F'=f$ a.e. は[$L^1$ 不定積分の定理](#thm-mt4-indefinite-integral-ac)で既に示しました。

$1\Rightarrow2$ を示します。[変動関数の補題](#thm-mt4-variation-ac)により

$$
F(x)=F(a)+P(x)-N(x)
$$

と、増加 AC 関数 $P,N$ の差へ分解できます。

$P$ に対応する Lebesgue–Stieltjes 測度 $\nu_P$ は[前補題](#thm-mt4-ac-stieltjes-absolute)により

$$
\nu_P\ll\lambda.
$$

$\nu_P$ は有限正測度なので [MT3 の Radon–Nikodym 定理](../MT3/index.md#thm-mt3-rn-finite)により $p\in L^1([a,b])$、$p\ge0$ が存在して

$$
\nu_P(E)=\int_Ep\,d\lambda.
$$

特に

$$
P(x)-P(a)
=
\nu_P((a,x])
=
\int_a^xp(t)dt.
$$

同様に $N$ に対して $n\in L^1$、$n\ge0$ が存在し

$$
N(x)-N(a)=\int_a^xn(t)dt.
$$

$P(a)=N(a)=0$ なので

$$
F(x)-F(a)
=
\int_a^x(p-n)(t)dt.
$$

$$
f=p-n\in L^1([a,b])
$$

と置けば2が得られます。

さらに既に示した $2\Rightarrow F'=f$ a.e. より

$$
F'=p-n\in L^1
$$

かつ

$$
F(x)=F(a)+\int_a^xF'(t)dt.
$$

$\square$
<!-- proof-end -->

この定理が「微分してから積分すれば元へ戻る」の正確な境界です。単に連続、BV、あるいは a.e. 微分可能というだけでは足りません。

---

## 13. Cantor 関数：なぜ AC が必要か

Cantor 関数 $C:[0,1]\to[0,1]$ は連続・単調増加で、従って BV です。また Cantor 集合の補集合では各連結成分上で局所的に定数なので

$$
C'(x)=0
$$

が Cantor 集合の外で成り立ちます。Cantor 集合は Lebesgue 零集合なので

$$
C'(x)=0\quad\text{a.e.}
$$

です。

しかし

$$
C(1)-C(0)=1.
$$

もし $C$ が AC なら[AC版FTC](#thm-mt4-ac-ftc)より

$$
1=C(1)-C(0)
=
\int_0^1C'(x)dx
=0,
$$

という矛盾になります。従って Cantor 関数は AC ではありません。

失われた機構は「零集合に変動を集中させないこと」です。Cantor 関数は導関数では見えない変動を Cantor 集合へ持っています。

---

## 14. 含意を整理する

$$
C^1([a,b])
\Longrightarrow
\text{Lipschitz（導関数有界なら）}
\Longrightarrow
AC
\Longrightarrow
BV
\Longrightarrow
\text{a.e. 微分可能}
$$

最後の $BV\Rightarrow$ a.e.微分可能は本章では一般形を独立定理として証明していません。ただし AC の場合は RN と Lebesgue 微分定理を通じて証明済みです。

逆向きは一般に成り立ちません。特に Cantor 関数は

$$
\text{連続・単調・BV・a.e.で }C'=0
$$

でも AC ではありません。

---

## 15. 演習

### Level A

<a id="ex-mt4-a01"></a>
#### MT4-A01 maximal 評価を使う
- Level: A

$f\in L^1(\mathbb R)$、$\|f\|_1=2$ とする。本文の定数3を使って

$$
\lambda(\{Mf>6\})
$$

を評価してください。

<!-- solution-start -->
**解答**：弱 $(1,1)$ 評価から

$$
\lambda(\{Mf>6\})
\le
\frac3{6}\|f\|_1
=1.
$$
<!-- solution-end -->

<a id="ex-mt4-a02"></a>
#### MT4-A02 密度点
- Level: A

$E=[0,1]\cup\mathbb Q$ とする。Lebesgue 密度定理から、a.e. $x\in(0,1)$ で $E$ の密度が1、a.e. $x\notin[0,1]$ で密度が0であることを説明してください。

<!-- solution-start -->
**解答**：$\mathbb Q$ は零集合なので $1_E=1_{[0,1]}$ a.e. です。Lebesgue 密度定理により a.e. $x\in E$ で密度1、a.e. $x\notin E$ で密度0です。零集合 $\mathbb Q$ の追加は a.e. の結論を変えません。
<!-- solution-end -->

<a id="ex-mt4-a03"></a>
#### MT4-A03 不定積分の微分
- Level: A

$f=1_{[0,1/2]}-1_{(1/2,1]}$ とし

$$
F(x)=\int_0^xf(t)dt
$$

とする。$F$ を明示し、$F'=f$ がどこで成り立たないか確認してください。

<!-- solution-start -->
**解答**：

$$
F(x)=
\begin{cases}
x,&0\le x\le1/2,\\
1-x,&1/2\le x\le1.
\end{cases}
$$

従って $x\ne1/2$ では $F'(x)=f(x)$。$x=1/2$ では左微分が1、右微分が$-1$ なので微分不能です。例外は一点で測度0であり、a.e. の定理と一致します。
<!-- solution-end -->

### Level B

<a id="ex-mt4-b01"></a>
#### MT4-B01 $L^1$ 不定積分が AC になる機構
- Level: B

$f\in L^1([a,b])$、$F(x)=\int_a^xf$ とする。AC の定義で現れる互いに素な区間族 $(x_k,y_k)$ に対して、なぜ

$$
\sum_k|F(y_k)-F(x_k)|
\le
\int_{\cup_k(x_k,y_k)}|f|
$$

となるか説明してください。

<!-- solution-start -->
**解答**：各区間で

$$
F(y_k)-F(x_k)=\int_{x_k}^{y_k}f
$$

なので三角不等式から

$$
|F(y_k)-F(x_k)|
\le
\int_{x_k}^{y_k}|f|.
$$

区間が互いに素だから右辺を足すと重複なく

$$
\sum_k\int_{x_k}^{y_k}|f|
=
\int_{\cup_k(x_k,y_k)}|f|.
$$

あとは積分の絶対連続性が、区間の総長の小ささを積分の小ささへ変換します。
<!-- solution-end -->

<a id="ex-mt4-b02"></a>
#### MT4-B02 Cantor 関数が反例になる理由
- Level: B

Cantor 関数が「a.e. で導関数0なら定数」という主張の反例になる理由と、AC を仮定すると反例になれない理由を説明してください。

<!-- solution-start -->
**解答**：Cantor 関数 $C$ は Cantor 集合の外で局所定数であり、Cantor 集合は零集合なので $C'=0$ a.e. です。しかし $C(0)=0,C(1)=1$ で非定数です。

一方 AC なら本文の基本定理から

$$
C(1)-C(0)=\int_0^1C'(x)dx.
$$

右辺は0になってしまうため、非定数の Cantor 関数は AC ではあり得ません。AC は「導関数では見えない特異な変動」を排除しています。
<!-- solution-end -->

<a id="ex-mt4-b03"></a>
#### MT4-B03 AC から BV への有限化
- Level: B

AC の定義で $\varepsilon=1$ に対応する $\delta$ を固定したとき、任意の分割の変動和を有限個の「総長 $<\delta$ の群」へ分けることで一様有界にできる理由を説明してください。

<!-- solution-start -->
**解答**：まず分割を細分して各小区間の長さを $<\delta/2$ にします。小区間の全長は $b-a$。順に詰めて総長が $\delta$ を超える直前で群を閉じれば、最後以外の各群は総長が少なくとも $\delta/2$ になるので群数は高々 $2(b-a)/\delta+1$ 程度です。

各群は互いに素な区間族で総長 $<\delta$ なので、AC の定義からその群の増分絶対値和は1未満。従って全変動和は群数で一様に抑えられ、BV です。
<!-- solution-end -->

### Level C

<a id="ex-mt4-c01"></a>
#### MT4-C01 Lebesgue 微分定理の近似論証を再構成する
- Level: C

$f\in L^1$ とする。$g\in C_c$、$h=f-g$ を用い

$$
Df\le Mh+|h|
$$

から $Df=0$ a.e. を導く論証を、弱 $(1,1)$ 評価と Markov 評価を明示して再構成してください。

<!-- solution-start -->
**解答**：任意の $\delta>0$ に対して

$$
\{Df>2\delta\}
\subset
\{Mh>\delta\}\cup\{|h|>\delta\}.
$$

従って

$$
\lambda(\{Df>2\delta\})
\le
\frac3\delta\|h\|_1+
\frac1\delta\|h\|_1
=
\frac4\delta\|f-g\|_1.
$$

$C_c$ の $L^1$ 稠密性により $\|f-g\|_1$ は任意に小さくできるので、左辺は0です。$\delta=1/n$ として

$$
\{Df>0\}=\bigcup_n\{Df>2/n\}
$$

は零集合。従って $Df=0$ a.e. です。
<!-- solution-end -->

<a id="ex-mt4-c02"></a>
#### MT4-C02 AC版FTCの依存鎖
- Level: C

$F\in AC([a,b])$ から

$$
F(x)-F(a)=\int_a^xF'(t)dt
$$

を得るまでの依存鎖を、各段階で何を得るか書いて再構成してください。

<!-- solution-start -->
**解答**：まず AC から BV を示し、変動関数 $V$ も AC であることから

$$
F=F(a)+P-N
$$

と増加 AC 関数の差に分解します。

増加連続関数 $P,N$ から Lebesgue–Stieltjes 正測度 $\nu_P,\nu_N$ を構成します。AC により、Lebesgue 零集合を小総長の開区間で覆うと Stieltjes 質量も小さくなるため

$$
\nu_P,\nu_N\ll\lambda.
$$

Radon–Nikodym 定理から

$$
d\nu_P=p\,d\lambda,
\qquad
d\nu_N=n\,d\lambda
$$

となる $p,n\in L^1$ を得て

$$
F(x)-F(a)=\int_a^x(p-n).
$$

最後に $L^1$ 不定積分の微分定理より $F'=p-n$ a.e.。従って

$$
F(x)-F(a)=\int_a^xF'.
$$
<!-- solution-end -->

---

## 16. この章で閉じた依存

この章では1次元の範囲で次を閉じました。

- $C_c(\mathbb R)$ の $L^1$ 稠密性
- 有限区間選択補題
- Hardy–Littlewood maximal function の弱 $(1,1)$ 評価
- $L^1$ / $L^1_{\mathrm{loc}}$ Lebesgue 微分定理
- Lebesgue 密度定理
- 積分の絶対連続性
- $L^1$ 不定積分が AC かつ a.e. で元の関数へ微分されること
- AC $\Rightarrow$ BV と増加 AC 関数の差への分解
- Lebesgue–Stieltjes 測度を介した AC 版 FTC
- Cantor 関数が示す BV と AC の境界

高次元 maximal theorem、一般 Vitali covering theorem、一般 BV 関数の微分可能性は後続理論として先取りしていません。
