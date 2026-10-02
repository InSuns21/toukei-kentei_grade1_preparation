<!-- definition-example-audit: loose -->
# MT4 標準測度論：Lebesgue 微分定理・絶対連続関数

この章では、積分で平均化した情報をほとんど至る所で点の値へ戻す **Lebesgue 微分定理**と、微積分学の基本定理が最も自然に成立する関数類である **絶対連続関数**を結びます。

```text
Lebesgue測度の正則性（MT0）
        ↓
有界区間外で0となる連続関数の L1 稠密性
        ↓
1次元区間選択補題
        ↓
Hardy–Littlewood 最大関数の弱 (1,1) 評価
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

最初に目標を一つだけ具体化します。$f=1_{[0,1]}$ とすると、$x\in(0,1)$ では十分小さい $r>0$ に対して

$$
\frac1{2r}\int_{x-r}^{x+r}f(y)\,dy=1=f(x).
$$

つまり「点の値」を、その点の周りの小区間での平均から回収できます。一般の可積分関数でも、ほとんど至る所でこの回収が可能かを示すのが前半の目標です。後半では、この結果を使って

$$
F(x)=\int_a^x f(t)\,dt
$$

を微分すると元の $f$ が戻る条件を突き詰めます。

---

## 1. 局所可積分関数と平均

Lebesgue 微分定理で見るのは点の近くの平均なので、全空間で積分可能である必要はありません。例えば定数関数 $f(x)=1$ は $L^1(\mathbb R)$ には属しませんが、どの有界区間上でも積分は有限で、局所平均は問題なく定義できます。

局所可積分性そのものは1次元に固有ではありません。後続章でも同じ概念を使えるよう、ここでは開集合 $\Omega\subset\mathbb R^d$ 上で定義します。本章で証明する Lebesgue 微分定理は、その後 $d=1$、$\Omega=\mathbb R$ に戻って扱います。

<a id="def-mt4-l1loc"></a>
<!-- formal-statement-start -->
### 定義（局所可積分）

開集合 $\Omega\subset\mathbb R^d$ 上の可測関数 $f$ が

$$
\boxed{f\in L^1_{\mathrm{loc}}(\Omega)}
$$

であるとは、任意のコンパクト集合 $K\subset\Omega$ に対して

$$
\int_K|f(x)|\,dx<\infty
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mt4-l1loc -->
**定義の確認**

$\Omega=\mathbb R^d$ で定数関数 $f(x)=1$ を考えます。任意のコンパクト集合 $K\subset\mathbb R^d$ は有界なので Lebesgue 測度が有限で、

$$
\int_K|f(x)|\,dx
=
\lambda(K)
<
\infty.
$$

したがって

$$
1\in L^1_{\mathrm{loc}}(\mathbb R^d).
$$

一方、

$$
\int_{\mathbb R^d}1\,dx
=
\infty
$$

なので $1\notin L^1(\mathbb R^d)$ です。「全空間では積分できないが、任意の有限な場所では積分できる」という局所可積分性の意味がこの例に現れています。
<!-- definition-example-end -->

$\Omega=\mathbb R$ では、これは任意の有界区間 $I$ に対して

$$
\int_I|f|\,d\lambda<\infty
$$

となることと同値です。したがって、以下の1次元 Lebesgue 微分定理で使う $L^1_{\mathrm{loc}}(\mathbb R)$ はこの一般定義の特殊例です。

<a id="prop-mt4-l1loc-basic"></a>
<!-- formal-statement-start -->
### 命題（局所可積分性の基本性質）

開集合 $\Omega\subset\mathbb R^d$ とする。

1. $f\in L^1_{\mathrm{loc}}(\Omega)$、開集合 $V\subset\Omega$ なら、制限 $f|_V$ は $L^1_{\mathrm{loc}}(V)$ に属する。
2. $f\in L^1_{\mathrm{loc}}(\Omega)$ とする。有界可測関数 $\psi$ が、あるコンパクト集合 $K\subset\Omega$ の外で 0 なら、$f\psi\in L^1(\Omega)$ であり、
   $$
   \int_\Omega |f\psi|
   \le
   \|\psi\|_\infty\int_K|f|
   <\infty.
   $$
3. $1\le p\le\infty$ なら
   $$
   \boxed{
   L^p(\Omega)\subset L^1_{\mathrm{loc}}(\Omega)
   }.
   $$
   特に、局所有界関数と連続関数は局所可積分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1. コンパクト集合 $K\subset V$ は $\Omega$ のコンパクト部分集合でもあるので、
   $$
   \int_K|f|<\infty
   $$
   です。したがって $f|_V\in L^1_{\mathrm{loc}}(V)$ です。

2. 仮定より $\psi$ は $K$ の外で 0 なので、
   $$
   \int_\Omega|f\psi|
   =
   \int_K|f\psi|
   \le
   \|\psi\|_\infty\int_K|f|
   <\infty.
   $$

3. まず $p=1$ は定義から直ちに従います。$1<p<\infty$ とし、コンパクト集合 $K\subset\Omega$ を固定します。$K$ は有界なので Lebesgue 測度 $\lambda(K)$ は有限です。$K$ を
   $$
   K_0=K\cap\{|f|\le1\},
   \qquad
   K_1=K\cap\{|f|>1\}
   $$
   に分けると、
   $$
   \int_K|f|
   =
   \int_{K_0}|f|
   +
   \int_{K_1}|f|
   \le
   \lambda(K)
   +
   \int_K|f|^p
   <\infty.
   $$
   $p=\infty$ では
   $$
   \int_K|f|
   \le
   \lambda(K)\|f\|_\infty
   <\infty.
   $$

   よって $L^p(\Omega)\subset L^1_{\mathrm{loc}}(\Omega)$ です。局所有界関数にも同じ $p=\infty$ の評価を各コンパクト集合上で使えます。連続関数は各コンパクト集合上で有界なので、局所可積分です。$\square$
<!-- proof-end -->

後続章で、あるコンパクト集合の外で 0 になる補助関数を $f$ に掛けて積分するときに必要になるのが 2. です。また 3. により、$L^p$ 関数は自動的に局所可積分なので、局所的な積分恒等式を使う議論へそのまま入れます。

---

## 2. 有界区間の外で 0 となる連続関数は $L^1(\mathbb R)$ で稠密

最大関数の弱型評価から微分定理へ進む際、一般の $L^1$ 関数を連続関数で近似します。その依存をここで閉じます。

<a id="thm-mt4-cc-dense-l1"></a>
<!-- formal-statement-start -->
### 補題（有界区間外で 0 となる連続関数の L1 稠密性）

任意の $f\in L^1(\mathbb R)$ と $\varepsilon>0$ に対して、ある連続関数 $g:\mathbb R\to\mathbb R$ と $R>0$ が存在して

$$
g(x)=0\qquad(|x|>R),
$$

かつ

$$
\boxed{\|f-g\|_1<\varepsilon}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 2.1 まず有界・有界台へ切る

優収束定理（Dominated Convergence Theorem; DCT）を一つの列へ直接適用できるよう、切断の高さと台の大きさを同じ整数 $n$ で増やします。

$$
u_n(x)
=
\max(-n,\min(f(x),n))1_{[-n,n]}(x).
$$

各 $x$ で $n$ が十分大きければ $x\in[-n,n]$ となり、同時に切断値も $f(x)$ へ戻るので

$$
u_n(x)\to f(x)
$$

がほとんど至る所（almost everywhere; a.e.）に成り立ちます。また全ての $n$ で

$$
|u_n(x)-f(x)|\le2|f(x)|.
$$

ここで DCT へ入力する関数列は $|u_n-f|$、支配関数は $2|f|\in L^1$ です。[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) により

$$
\|u_n-f\|_1
=
\int_{\mathbb R}|u_n-f|\,d\lambda
\longrightarrow0.
$$

したがって十分大きい $n$ を一つ固定すれば

$$
\|f-u_n\|_1<\frac\varepsilon3.
$$

以後この $u_n$ を $u$、対応する整数を $R$ と書きます。

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

$O_j$ は有界で、$\phi_j=0$ on $O_j^c$ なので、$\phi_j$ はある有界区間の外で0です。また

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

と置けば $g$ は連続で、有限個の $\phi_j$ の和なので、ある有界区間の外で0です。$\eta$ を十分小さく取れば

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

最大関数では、各点ごとに「平均が大きくなる区間」を一つずつ選ぶため、区間どうしが大量に重なります。そのまま長さを足すと重複分を何度も数えてしまいます。

欲しいのは、重なりを捨てて互いに素な区間だけを残しつつ、元の区間族全体を定数倍の拡大で覆うことです。1次元では次の単純な貪欲法でそれができます。

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

## 4. Hardy–Littlewood 最大関数の弱 $(1,1)$ 評価

Lebesgue 微分定理では、近似誤差 $h=f-g$ の「小区間平均がどれだけ大きくなり得るか」を全ての区間について同時に制御する必要があります。その最悪値を各点 $x$ に割り当てるのが最大関数です。

<a id="def-mt4-maximal"></a>
<!-- formal-statement-start -->
### 定義（非中心 Hardy–Littlewood 最大関数）

$f\in L^1(\mathbb R)$ に対し

$$
\boxed{
Mf(x)
:=
\sup_{I\ni x}
\frac1{|I|}\int_I|f(y)|\,dy,}
$$

ただし上限は $x$ を含む有界開区間 $I$ 全体について取る。
<!-- formal-statement-end -->

例えば $f=1_{[0,1]}$ なら、$x\in(0,1)$ では $[0,1]$ の内部に収まる十分小さい区間 $I\ni x$ を選べるので平均値は1になります。一方 $|f|\le1$ だからどの区間平均も1を超えず、

$$
Mf(x)=1
\qquad(0<x<1)
$$

と定義を直接確認できます。

<a id="thm-mt4-maximal-weak11"></a>
<!-- formal-statement-start -->
### 定理（Hardy–Littlewood 最大関数の弱 (1,1) 評価）

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
### 定理（Lebesgue 微分定理：L1(R) 版）

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

連続関数 $g$ なら小区間平均は点値へ戻ります。一般の $f$ を前節の補題で、ある有界区間の外で0となる連続関数 $g$ により $L^1$ 近似し、誤差 $h=f-g$ の小区間平均を最大関数で支配します。弱 $(1,1)$ 評価により「平均誤差が大きい点」の測度を $\|h\|_1$ で押さえ、近似誤差を0へ送ります。

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

前節の補題で得られる、ある有界区間の外で0となる任意の連続関数 $g$ と $h=f-g$ に対し

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

最大関数の弱 $(1,1)$ 評価と積分版 Markov 評価から

$$
\lambda(\{Df>2\delta\})
\le
\frac3\delta\|h\|_1
+
\frac1\delta\|h\|_1
=
\frac4\delta\|f-g\|_1.
$$

[前節の $L^1$ 稠密性](#thm-mt4-cc-dense-l1)により右辺は任意に小さくできます。従って

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
### 系（L1loc 版）

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

通常の一様連続性は、一つの短い区間 $(x,y)$ に対して $|F(y)-F(x)|$ を小さくします。しかし微積分学の基本定理を逆向きに使うには、互いに離れた多数の短い区間を同時に選んだときも、変動の**総和**が小さくなる必要があります。

この「短い区間をたくさん集めても総変動が暴れない」という条件が絶対連続性です。

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

最小例として $F(x)=x$ を考えると、

$$
\sum_{k=1}^m|F(y_k)-F(x_k)|
=
\sum_{k=1}^m(y_k-x_k).
$$

したがって $\delta=\varepsilon$ と取れば定義条件がそのまま成立し、$F(x)=x$ は AC です。

---

## 8. Lebesgue 積分の絶対連続性

<a id="thm-mt4-integral-absolute-continuity"></a>
<!-- formal-statement-start -->
### 補題（Lebesgue 積分の絶対連続性）

測度空間 $(X,\mathcal F,\mu)$ 上で $f\in L^1(\mu)$ とする。任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、可測集合 $E\in\mathcal F$ が

$$
\mu(E)<\delta
$$

を満たせば

$$
\boxed{
\int_E|f|\,d\mu<\varepsilon
}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|f|1_{\{|f|>M\}}\downarrow0$ a.e. で $|f|$ に支配されるので、[DCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) により

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

とします（$M=0$ なら結論は自明）。$\mu(E)<\delta$ なら

$$
\begin{aligned}
\int_E|f|
&=
\int_{E\cap\{|f|\le M\}}|f|
+
\int_{E\cap\{|f|>M\}}|f|\\
&\le
M\mu(E)
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
### 定理（L1 不定積分の絶対連続性）

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

$h<0$ なら向きが逆になるので、まず

$$
\frac{F(x+h)-F(x)}h
=
\frac1{-h}\int_{x+h}^{x}f(t)\,dt.
$$

従って

$$
\left|
\frac{F(x+h)-F(x)}h-f(x)
\right|
\le
\frac1{-h}\int_{x+h}^{x}|f(t)-f(x)|\,dt
\longrightarrow0.
$$

左右どちらからも差商が $f(x)$ へ収束するので $F'(x)=f(x)$ です。Lebesgue 微分定理の例外集合は零集合なので a.e. で成立します。$\square$
<!-- proof-end -->

---

## 10. AC 関数は有界変動

絶対連続性は「短い区間族」に対する局所的な総変動の制御でした。逆向きの FTC へ進むには、区間全体で変動をどれだけ積み上げても有限に収まることをまず示したいので、全ての有限分割にわたる変動和の上限を導入します。

逆向きの FTC を証明するため、AC 関数を単調関数の差へ分解します。

<a id="def-mt4-bv"></a>
<!-- formal-statement-start -->
### 定義（全変動・有界変動）

$F:[a,b]\to\mathbb R$ に対して

$$
V_a^b(F)
:=
\sup_{a=x_0<\cdots<x_n=b}
\sum_{i=1}^n|F(x_i)-F(x_{i-1})|.
$$

これが有限のとき $F$ は **有界変動**（bounded variation; BV）であるという。
<!-- formal-statement-end -->

例えば $F(x)=x$ なら、任意の分割に対して

$$
\sum_{i=1}^n|F(x_i)-F(x_{i-1})|
=
\sum_{i=1}^n(x_i-x_{i-1})
=
b-a,
$$

なので $V_a^b(F)=b-a$ です。分割を細かくしても変動和が増えない最も単純な例です。

<a id="thm-mt4-ac-implies-bv"></a>
<!-- formal-statement-start -->
### 定理（AC なら BV）

$$
\boxed{AC([a,b])\subset BV([a,b]).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[絶対連続関数](#def-mt4-ac)の条件で $\varepsilon=1$ に対応する $\delta>0$ を取ります。

任意の分割

$$
a=x_0<\cdots<x_n=b
$$

を考えます。必要なら各区間 $[x_{i-1},x_i]$ をさらに細分して、全ての小区間の長さを $\delta/2$ 未満にします。細分すると三角不等式により変動和は減らないので、この細分後の和を一様に抑えれば十分です。

得られた互いに素な小区間を、各ブロックの長さの総和が $\delta$ 未満になるように順に分けます。各小区間の長さが $\delta/2$ 未満なので、一つのブロックを閉じる直前までの総和は $\delta$ 未満で、各ブロックは少なくとも最後のものを除けば総長 $\delta/2$ 以上になります。従ってブロックの個数は

$$
N\le\frac{2(b-a)}\delta+1
$$

で一様に抑えられます。

各ブロックは [絶対連続関数](#def-mt4-ac)の条件を満たすので、そのブロックに属する増分の絶対値の和は1未満です。従って全変動和は $N$ 未満。元の分割によらない有限上界があるため

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

まず証明で使う変動の加法性を確認します。$a\le x<y\le b$ とします。$[a,y]$ の任意の分割へ点 $x$ を追加すると、変動和は

二つの部分区間 $[a,x]$ と $[x,y]$ に属する変動和の和へ分かれるので

$$
V_a^y(F)\le V_a^x(F)+V_x^y(F).
$$

逆に任意の $\varepsilon>0$ に対し、$[a,x]$ と $[x,y]$ でそれぞれ上限から $\varepsilon/2$ 以内の分割を選び、それらを $x$ で連結すれば

$$
V_a^y(F)
\ge
V_a^x(F)+V_x^y(F)-\varepsilon.
$$

$\varepsilon\downarrow0$ として

$$
V_a^y(F)=V_a^x(F)+V_x^y(F)
$$

です。したがって $V(x)=V_a^x(F)$ に対して

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

各 $k$ について $[x_k,y_k]$ の有限分割を取り、その変動和を $V_{x_k}^{y_k}(F)$ に任意に近づけます。全ての小区間を合わせても互いに素で総長は $\sum_k(y_k-x_k)<\delta$ です。従って [絶対連続関数](#def-mt4-ac)の条件から、それらの増分絶対値の総和は $\varepsilon$ 未満です。近似誤差を0へ送れば

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

増加関数 $G$ の増分 $G(t)-G(s)$ は非負なので、区間 $(s,t]$ の「質量」とみなせそうです。これを本当に Borel 測度へ延長できれば、関数 $G$ の変動を測度論へ移し、MT3 の Radon–Nikodym 定理を適用できます。

つまりここでの狙いは

$$
\text{増加関数の増分}
\longrightarrow
\text{正測度}
\longrightarrow
\text{密度}
$$

という橋を作ることです。

<a id="thm-mt4-stieltjes-measure"></a>
<!-- formal-statement-start -->
### 補題（連続増加関数の Lebesgue–Stieltjes 測度）

$G:[a,b]\to\mathbb R$ を連続増加関数とする。このとき有限 Borel 測度 $\nu_G$ が一意に存在し、

$$
\boxed{
\nu_G(\{a\})=0,
\qquad
\nu_G((s,t])=G(t)-G(s)
\quad(a\le s<t\le b)}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$[a,b]$ の区間について端点の開閉を自由に許し、さらに一点集合も許した有限互いに素和全体を $\mathcal A$ とします。これは補集合・有限和・差について閉じた集合代数です。

$s<t$ に対し、$I$ が端点 $s,t$ を持つ区間なら、端点を含むかどうかにかかわらず

$$
\nu_0(I):=G(t)-G(s),
$$

一点集合には

$$
\nu_0(\{x\})=0
$$

と置きます。一般の $E\in\mathcal A$ は互いに素な区間と一点集合の有限和へ分け、その値の和で $\nu_0(E)$ を定めます。

この定義が表示の仕方に依存しないことを確認します。二つの表示に現れる端点をすべて挿入して共通細分を取ると、一つの区間 $I$ の寄与は

$$
G(t)-G(s)
=
\sum_{i=1}^{m}
\bigl(G(t_i)-G(t_{i-1})\bigr)
$$

という望遠和へ分かれます。一点集合の寄与は0なので、端点をどちらの隣接区間へ含めても値は変わりません。従って $\nu_0$ は表示の仕方によらず適切に定義され、同じ共通細分を使えば有限加法性も従います。

次に前測度性を示します。[Hopf 型の前測度判定](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#lem-f0-00d4-hopf-premeasure)へ入力するため、

$$
E_1\supset E_2\supset\cdots,
\qquad
E_n\in\mathcal A,
\qquad
\bigcap_{n=1}^{\infty}E_n=\varnothing
$$

なら

$$
\nu_0(E_n)\downarrow0
$$

を示せば十分です。

単調性から $\nu_0(E_n)$ は減少するので、その極限を $L\ge0$ とします。$L>0$ と仮定して矛盾を導きます。

各 $E_n$ は有限個の区間と一点集合の和です。一点集合は $\nu_0$-質量0なので無視できます。$G$ はコンパクト区間 $[a,b]$ 上で一様連続です。従って各区間成分の端点を必要なら内側へ少し動かし、有限個の閉区間の和であるコンパクト集合

$$
K_n\subset E_n
$$

を

$$
\nu_0(E_n\setminus K_n)
<
2^{-n-2}L
$$

となるように取れます。ここで $E_n\setminus K_n\in\mathcal A$ なので、左辺は同じ $\nu_0$ で定義されています。

次に

$$
F_n:=K_1\cap\cdots\cap K_n
$$

と置きます。有限個のコンパクト集合の共通部分なので $F_n$ はコンパクトで、$F_{n+1}\subset F_n$ です。また $E_n\subset E_k$ $(k\le n)$ だから

$$
E_n\setminus F_n
\subset
\bigcup_{k=1}^{n}(E_k\setminus K_k).
$$

有限加法性から得られる単調性と有限劣加法性を使うと

$$
\begin{aligned}
\nu_0(F_n)
&=
\nu_0(E_n)-\nu_0(E_n\setminus F_n)\\
&\ge
\nu_0(E_n)
-
\sum_{k=1}^{n}\nu_0(E_k\setminus K_k)\\
&>
L-
\sum_{k=1}^{n}2^{-k-2}L\\
&>
\frac L2.
\end{aligned}
$$

従って $F_n\ne\varnothing$ です。$(F_n)$ は減少する非空コンパクト集合列なので、コンパクト性から

$$
\bigcap_{n=1}^{\infty}F_n\ne\varnothing.
$$

しかし $F_n\subset E_n$ だから

$$
\bigcap_nF_n
\subset
\bigcap_nE_n
=
\varnothing,
$$

となり矛盾です。従って $L=0$。Hopf 型判定により $\nu_0$ は $\mathcal A$ 上の前測度です。

最後に [Carathéodory 拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)を $\nu_0$ へ適用します。$\mathcal A$ は半開区間を含むので生成する $\sigma$-代数は $[a,b]$ の Borel $\sigma$-代数です。また

$$
\nu_0([a,b])=G(b)-G(a)<\infty.
$$

従って Borel 集合への拡張 $\nu_G$ が存在し、有限前測度の拡張なので一意です。構成から

$$
\nu_G(\{a\})=0,
\qquad
\nu_G((s,t])=G(t)-G(s)
$$

を満たします。$\square$
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

まず $x\in(a,b]$ に対し $s\uparrow x$ とすれば

$$
0\le\nu_G(\{x\})
\le
\nu_G((s,x])
=
G(x)-G(s)
\longrightarrow0
$$

なので $\nu_G(\{x\})=0$ です。$\nu_G(\{a\})=0$ は定義済みなので、端点の開閉は $\nu_G$ の値に影響しません。

有限個の成分区間 $I_1,\ldots,I_m$ について、その長さの総和は $\lambda(O)<\delta$ です。したがって [絶対連続関数](#def-mt4-ac)の条件から

$$
\sum_{j=1}^m\nu_G(I_j)
<\varepsilon.
$$

最初の $m$ 個の成分区間までを取り、$m\to\infty$ として[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)を使えば

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

$\nu_P$ は有限正測度、Lebesgue 測度 $\lambda$ は $[a,b]$ 上で有限正測度なので、[MT3 の Radon–Nikodym 定理](../MT3/index.md#thm-mt3-rn-sigma-finite)を $\nu_P\ll\lambda$ に適用できます。従って $p\in L^1([a,b])$、$p\ge0$ が存在して

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

$N$ に対応する Lebesgue–Stieltjes 測度についても[前補題](#thm-mt4-ac-stieltjes-absolute)から

$$
\nu_N\ll\lambda
$$

です。そこで同じ MT3 の Radon–Nikodym 定理を、今度は $\nu_N$ と $\lambda$ に適用します。$n\in L^1([a,b])$、$n\ge0$ が存在して

$$
\nu_N(E)=\int_En\,d\lambda,
$$

特に

$$
N(x)-N(a)
=
\nu_N((a,x])
=
\int_a^xn(t)dt.
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

Cantor 関数 $C:[0,1]\to[0,1]$ は連続・単調増加で、従って BV です。また Cantor 集合の補集合をなす各開区間上で局所的に定数なので

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

最後の $BV\Rightarrow$ a.e.微分可能は本章では一般形を独立定理として証明していません。ただし AC の場合は [MT3 の RN 定理](../MT3/index.md#thm-mt3-rn-sigma-finite) と Lebesgue 微分定理を通じて証明済みです。

逆向きは一般に成り立ちません。特に Cantor 関数は

$$
\text{連続・単調・BV・a.e.で }C'=0
$$

でも AC ではありません。

---

## 15. 演習

### Level A

<a id="ex-mt4-a01"></a>
#### MT4-A01 最大関数の評価を使う
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

$E=[0,1]\cup\mathbb Q$ とする。[Lebesgue 密度定理](#thm-mt4-density)から、a.e. $x\in(0,1)$ で $E$ の密度が1、a.e. $x\notin[0,1]$ で密度が0であることを説明してください。

<!-- solution-start -->
**解答**：$\mathbb Q$ は零集合なので $1_E=1_{[0,1]}$ a.e. です。[Lebesgue 密度定理](#thm-mt4-density)により a.e. $x\in E$ で密度1、a.e. $x\notin E$ で密度0です。零集合 $\mathbb Q$ の追加は a.e. の結論を変えません。
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

<a id="ex-mt4-a04"></a>
#### MT4-A04 有界関数で積分の絶対連続性を確認する
- Level: A

可測集合 $E\subseteq[a,b]$ と $f\in L^1([a,b])$ が

$$
|f(x)|\le M
\qquad\text{a.e.}
$$

を満たすとする。$M>0$ のとき、$\lambda(E)<\varepsilon/M$ なら

$$
\int_E|f|<\varepsilon
$$

となることを示してください。また $M=0$ の場合も確認してください。

<!-- solution-start -->
**解答**：$M>0$ なら $|f|\le M$ a.e. なので積分の単調性から

$$
\int_E|f|
\le
\int_E M
=
M\lambda(E)
<
M\frac{\varepsilon}{M}
=
\varepsilon.
$$

$M=0$ なら $f=0$ a.e. なので任意の可測集合 $E$ に対して $\int_E|f|=0$ です。一般の $L^1$ 関数では一様な上界 $M$ がないため、本文では大値部分を切って同じ評価へ帰着しています。
<!-- solution-end -->

### Level B

<a id="ex-mt4-b01"></a>
#### MT4-B01 $L^1$ 不定積分が AC になる機構
- Level: B

$f\in L^1([a,b])$、$F(x)=\int_a^xf$ とする。[絶対連続関数](#def-mt4-ac)の条件に現れる互いに素な区間族 $(x_k,y_k)$ に対して、なぜ

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

[絶対連続関数](#def-mt4-ac)の条件で $\varepsilon=1$ に対応する $\delta$ を固定したとき、任意の分割の変動和を有限個の「総長 $<\delta$ のブロック」へ分けることで一様有界にできる理由を説明してください。

<!-- solution-start -->
**解答**：まず分割を細分して各小区間の長さを $<\delta/2$ にします。小区間の全長は $b-a$。順に詰めて総長が $\delta$ を超える直前でブロックを閉じれば、最後以外の各ブロックは総長が少なくとも $\delta/2$ になるのでブロック数は高々 $2(b-a)/\delta+1$ 程度です。

各ブロックは互いに素な区間族で総長 $<\delta$ なので、[絶対連続関数](#def-mt4-ac)の条件からそのブロックの増分絶対値和は1未満。従って全変動和はブロック数で一様に抑えられ、BV です。
<!-- solution-end -->

### Level C

<a id="ex-mt4-c01"></a>
#### MT4-C01 Lebesgue 微分定理の近似論証を再構成する
- Level: C

$f\in L^1$ とする。ある有界区間の外で0となる連続関数 $g$ と $h=f-g$ を用い

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

[有界区間外で0となる連続関数の $L^1$ 稠密性](#thm-mt4-cc-dense-l1)により $\|f-g\|_1$ は任意に小さくできるので、左辺は0です。$\delta=1/n$ として

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

[Radon–Nikodym 定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から

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

- 有界区間の外で0となる連続関数の $L^1$ 稠密性
- 有限区間選択補題
- Hardy–Littlewood 最大関数の弱 $(1,1)$ 評価
- $L^1$ / $L^1_{\mathrm{loc}}$ Lebesgue 微分定理
- Lebesgue 密度定理
- 積分の絶対連続性
- $L^1$ 不定積分が AC かつ a.e. で元の関数へ微分されること
- AC $\Rightarrow$ BV と増加 AC 関数の差への分解
- Lebesgue–Stieltjes 測度を介した AC 版 FTC
- Cantor 関数が示す BV と AC の境界

高次元の最大関数定理、一般の Vitali 被覆定理、一般 BV 関数の微分可能性は後続理論として先取りしていません。
