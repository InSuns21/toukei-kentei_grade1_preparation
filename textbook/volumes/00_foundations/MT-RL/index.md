# MT-RL Riemann積分とLebesgue積分の橋

[RA4](../RA4/index.md) ではDarboux上和・下和からRiemann積分を作り、[Lebesgue積分の構成](../F0_00D2A_単関数_Lebesgue積分_構成/index.md) では単関数からLebesgue積分を作りました。

見た目は別物ですが、重なる範囲では同じ面積を計算しています。この章の目的は、その「同じになる理由」と「同じにならない境界」を明示することです。

```text
Darboux下和・上和
       │
       │  区分的定数関数として読む
       ↓
Lebesgue単関数の積分
       │
       ├─ Riemann可積分 ⇒ Lebesgue可積分・値一致
       │
       ├─ 不連続点集合が測度0 ⇔ Riemann可積分
       │
       └─ 広義積分では「条件収束」に注意
```

---

## 1. Darboux和は単関数の積分そのもの

$[a,b]$ の分割

$$
P:a=x_0<x_1<\cdots<x_n=b
$$

を取り、各 $I_i=[x_{i-1},x_i]$ で

$$
m_i=\inf_{I_i}f,\qquad M_i=\sup_{I_i}f
$$

とします。

小区間の内部では高さ $m_i$ の下側の区分的定数関数 $\ell_P$、高さ $M_i$ の上側の区分的定数関数 $u_P$ を置き、分割点では $\ell_P=u_P=f$ とします。分割点は有限個なので積分値には影響しません。

<a id="prop-mt-rl-darboux-simple"></a>
<!-- formal-statement-start -->
> **命題（Darboux和と単関数積分の一致）**  
> 有界関数 $f:[a,b]\to\mathbb R$ と分割 $P$ に対し、上の $\ell_P,u_P$ はLebesgue単関数で
$$
\ell_P\le f\le u_P,
$$
かつ
$$
\int_a^b\ell_P\,dm=L(f,P),\qquad
\int_a^bu_P\,dm=U(f,P)
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $i$ について区間の内部 $(x_{i-1},x_i)$ では $\ell_P=m_i$, $u_P=M_i$ です。分割点 $x_0,\ldots,x_n$ では値を $f(x_j)$ に取り直していますが、分割点全体は有限集合なので Lebesgue 測度 0 です。

したがって、分割点での値を無視した単関数
$$
\widetilde\ell_P
=
\sum_{i=1}^n m_i1_{(x_{i-1},x_i)},
\qquad
\widetilde u_P
=
\sum_{i=1}^n M_i1_{(x_{i-1},x_i)}
$$
と $\ell_P,u_P$ はそれぞれほとんど至る所で一致します。各係数が負でも、正部分・負部分へ分けた有限単関数の積分の定義から
$$
\int_{[a,b]}\widetilde\ell_P\,dm
=
\sum_{i=1}^n m_i(x_i-x_{i-1})
=
L(f,P),
$$
$$
\int_{[a,b]}\widetilde u_P\,dm
=
\sum_{i=1}^n M_i(x_i-x_{i-1})
=
U(f,P).
$$
零集合上の変更は積分値を変えないので、同じ等式が $\ell_P,u_P$ にも成り立ちます。また各小区間の内部で $m_i\le f\le M_i$、分割点では $\ell_P=u_P=f$ と置いたので、全点で $\ell_P\le f\le u_P$ です。$\square$
<!-- proof-end -->

つまりRiemann積分とLebesgue積分は、少なくとも階段近似の段階ではすでに同じ量を見ています。

---

## 2. Riemann可積分ならLebesgue可積分で、値も同じ

<a id="thm-mt-rl-agreement"></a>
<!-- formal-statement-start -->
> **定理（Riemann積分とLebesgue積分の一致）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分なら、$f$ はLebesgue可測かつLebesgue可積分であり、
$$
\int_a^b f(x)\,dx\Big|_{\mathrm{Riemann}}
=
\int_{[a,b]} f\,dm\Big|_{\mathrm{Lebesgue}}
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Riemann 積分値を $I$ とします。まず、単に「良い分割を各 $n$ で一つ取る」だけでは $\ell_n$ が単調になるとは限らないので、共通細分を明示して分割列を作ります。

[Darboux 可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) により、各 $n$ について分割 $Q_n$ を
$$
U(f,Q_n)-L(f,Q_n)<2^{-n}
$$
となるように取れます。$P_n$ を $Q_1,\ldots,Q_n$ の共通細分とすれば
$$
P_1\prec P_2\prec\cdots
$$
であり、細分すると下和は増加し上和は減少するので
$$
U(f,P_n)-L(f,P_n)
\le
U(f,Q_n)-L(f,Q_n)
<
2^{-n}.
$$

$P_n$ に対応する下側・上側単関数を $\ell_n,u_n$ とします。細分の単調性から
$$
\ell_n\uparrow \ell,
\qquad
u_n\downarrow u,
\qquad
\ell_n\le f\le u_n.
$$
各 $\ell_n,u_n$ は可測なので、点ごとの極限 $\ell,u$ も可測です。また $|f|\le M$ とすると
$$
|\ell_n|\le M,
\qquad
|u_n|\le M,
$$
で、支配関数 $M1_{[a,b]}$ は有限区間上で可積分です。そこで [Lebesgue の優収束定理（Dominated Convergence Theorem; DCT）](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) を $\ell_n$ と $u_n$ にそれぞれ適用すると
$$
\int\ell\,dm
=
\lim_{n\to\infty}L(f,P_n),
\qquad
\int u\,dm
=
\lim_{n\to\infty}U(f,P_n).
$$
さらに
$$
L(f,P_n)\le I\le U(f,P_n),
\qquad
U(f,P_n)-L(f,P_n)\to0
$$
なので挟み撃ちにより両極限は $I$ です。従って
$$
\int\ell\,dm=\int u\,dm=I.
$$

よって
$$
\int(u-\ell)\,dm=0.
$$
$u-\ell\ge0$ なので $u=\ell$ ほとんど至る所（almost everywhere; a.e.）です。さらに
$$
\ell\le f\le u
$$
なので $f=\ell$ ほとんど至る所です。差が生じ得る集合は Lebesgue 零集合の部分集合であり、Lebesgue 測度は完備なので $f$ も Lebesgue 可測です。有限区間上で $|f|\le M$ だから
$$
\int|f|\,dm\le M(b-a)<\infty,
$$
よって Lebesgue 可積分です。

最後に [零集合上の変更は積分を変えない](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-f0-00d2a-01) ことから
$$
\int f\,dm=\int\ell\,dm=I.
$$
$\square$
<!-- proof-end -->

この定理の向きは一方向です。**Lebesgue可積分だからRiemann可積分、とは限りません。**

代表例はDirichlet関数

$$
1_{\mathbb Q\cap[0,1]}.
$$

Lebesgue積分は0ですが、どの小区間にも有理数と無理数があるためRiemann積分は存在しません。

---

## 3. どの程度の不連続までRiemann積分は許すか

Riemann可積分性は「連続か不連続か」だけではなく、**不連続点がどれだけ大きな集合を作るか**で決まります。その量を測るため、点のまわりでの振れ幅を定式化します。

<a id="def-mt-rl-local-oscillation"></a>
<!-- formal-statement-start -->
> **定義（局所振動）**  
> 有界関数 $f:[a,b]\to\mathbb R$ と $x\in[a,b]$ に対し
$$
\omega_f(x)
:=
\inf_{\delta>0}
\sup\left\{
|f(s)-f(t)|:
s,t\in[a,b]\cap(x-\delta,x+\delta)
\right\}
$$
> を $x$ における局所振動という。
<!-- formal-statement-end -->

$\omega_f(x)=0$ であることと、$f$ が $x$ で連続であることは同値です。

<!-- definition-example-start: def-mt-rl-local-oscillation -->
**定義の確認**：$f(x)=x$ なら半径 $\delta$ の近傍での値の振れ幅は高々 $2\delta$ なので $\omega_f(x)=0$ です。一方 $f=1_{\mathbb Q}$ ではどの近傍にも値0と1が現れるので、全ての $x$ で $\omega_f(x)=1$ です。
<!-- definition-example-end -->

<a id="thm-mt-rl-lebesgue-criterion"></a>
<!-- formal-statement-start -->
> **定理（LebesgueのRiemann可積分性判定）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分であることと、不連続点集合
$$
D(f)=\{x\in[a,b]:f\text{ は }x\text{ で不連続}\}
$$
> がLebesgue測度0であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f$ が Riemann 可積分であるとします。$\eta>0$ に対し
$$
D_\eta:=\{x\in[a,b]:\omega_f(x)\ge\eta\}
$$
と置きます。

任意の $\varepsilon>0$ に対し、[Darboux 可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion)から分割
$$
P:a=x_0<\cdots<x_n=b
$$
を
$$
U(f,P)-L(f,P)<\eta\varepsilon/2
$$
となるように取ります。小区間 $I_i=[x_{i-1},x_i]$ の内部に $x\in D_\eta$ があるとします。$x$ から両端点までの距離より小さい $\delta>0$ を取れば
$$
[a,b]\cap(x-\delta,x+\delta)\subset I_i.
$$
$\omega_f(x)\ge\eta$ なので、この近傍での振動幅、従って $I_i$ 全体での振動幅 $M_i-m_i$ も少なくとも $\eta$ です。

内部が $D_\eta$ と交わる小区間の添字集合を $J$ とすると
$$
\eta\sum_{i\in J}(x_i-x_{i-1})
\le
\sum_{i\in J}(M_i-m_i)(x_i-x_{i-1})
\le
U(f,P)-L(f,P)
<
\eta\varepsilon/2.
$$
従ってこれらの小区間の総延長は $<\varepsilon/2$ です。$D_\eta$ のうち残る可能性があるのは有限個の分割点だけなので、それぞれを開区間で覆い、その総延長を $<\varepsilon/2$ にできます。結局 $D_\eta$ は総延長 $<\varepsilon$ の有限開区間族で覆え、Lebesgue 測度 0 です。

$f$ が $x$ で不連続であることは $\omega_f(x)>0$ と同値なので
$$
D(f)=\bigcup_{m=1}^\infty D_{1/m}.
$$
可算個の零集合の合併は零集合だから $m(D(f))=0$ です。

逆に $m(D(f))=0$ とします。$M:=\sup_{[a,b]}|f|$ とし、任意の目標誤差 $\varepsilon>0$ を固定します。$M=0$ なら $f\equiv0$ で自明なので、以下 $M>0$ とします。まず
$$
\eta:=\frac{\varepsilon}{2(b-a)}
$$
と置きます。

集合 $D_\eta=\{x:\omega_f(x)\ge\eta\}$ は閉です。実際 $x\notin D_\eta$ なら $\omega_f(x)<\eta$ なので、ある $r>0$ で $B(x,2r)\cap[a,b]$ 上の振動幅が $<\eta$ になります。このとき $y\in B(x,r)$ なら $B(y,r)\subset B(x,2r)$ なので $\omega_f(y)<\eta$、従って $D_\eta^c$ は開です。

$D_\eta\subset D(f)$ で測度 0、しかも $[a,b]$ の閉部分集合なのでコンパクトです。したがって有限個の開区間の合併 $G$ で
$$
D_\eta\subset G,
\qquad
m(G)<\frac{\varepsilon}{4M}
$$
となるものを取れます。

$K:=[a,b]\setminus G$ と置くと $K$ はコンパクトで、各 $x\in K$ について $\omega_f(x)<\eta$ です。従ってある $r_x>0$ を
$$
\operatorname{osc}_{B(x,2r_x)\cap[a,b]}f<\eta
$$
となるように取れます。$K$ のコンパクト性から
$$
K\subset\bigcup_{j=1}^r B(x_j,r_{x_j})
$$
と有限部分被覆を取ります。分割 $P$ の幅を
$$
\operatorname{mesh}(P)<\min_{1\le j\le r}r_{x_j}
$$
となるように選び、さらに $G$ を作る有限個の開区間の端点も分割点へ加えます。

各小区間 $I$ は二種類に分かれます。$I\subset G$ なら振動幅は高々 $2M$ です。一方 $I\not\subset G$ なら $I$ は $K$ と交わるので $y\in I\cap K$ を取れます。$y\in B(x_j,r_{x_j})$ となる $j$ を選ぶと、$I$ の長さは $r_{x_j}$ 未満だから
$$
I\subset B(x_j,2r_{x_j}),
$$
従って $I$ 上の振動幅は $<\eta$ です。

よって Darboux 差は
$$
\begin{aligned}
U(f,P)-L(f,P)
&=
\sum_{I\subset G}\operatorname{osc}_I(f)|I|
+
\sum_{I\not\subset G}\operatorname{osc}_I(f)|I|\\
&<
2M\,m(G)+\eta(b-a)\\
&<
\frac{\varepsilon}{2}+\frac{\varepsilon}{2}
=
\varepsilon.
\end{aligned}
$$
任意の $\varepsilon>0$ でこのような分割を作れるので、[Darboux 可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion)より $f$ は Riemann 可積分です。$\square$
<!-- proof-end -->

この判定は「不連続点があるとRiemann積分できない」という誤解を壊します。許されないのは不連続点の**個数**ではなく、その集合のLebesgue測度です。

### 例1：Thomae関数

$[0,1]$ 上で

$$
t(x)=
\begin{cases}
1/q,&x=p/q\text{ を既約分数で表せるとき},\\
0,&x\notin\mathbb Q
\end{cases}
$$

とします。$t$ は全ての無理数で連続、全ての有理数で不連続です。不連続点集合は可算なので測度0。したがってRiemann可積分で、Lebesgue積分もRiemann積分も0です。

### 例2：Cantor集合の指示関数

標準Cantor集合 $C\subset[0,1]$ は非可算ですが測度0です。$1_C$ の不連続点はちょうど $C$ なので、[LebesgueのRiemann可積分性判定](#thm-mt-rl-lebesgue-criterion) によりRiemann可積分で積分値は0です。

**非可算個の不連続点があってもRiemann可積分になり得ます。**

---

## 4. a.e.で同じでもRiemann可積分性は保存されない

Lebesgue積分では零集合上の変更は見えません。しかしRiemann積分は局所的な振動を見るため、零集合上の変更でも、その集合が稠密なら壊れることがあります。

$$
0
\quad\text{と}\quad
1_{\mathbb Q\cap[0,1]}
$$

はa.e.で等しく、Lebesgue積分も同じ0です。それでも前者はRiemann可積分、後者はRiemann非可積分です。

ここが両積分の哲学の差です。

- Lebesgue積分：測度0の集合は無視する。
- Riemann積分：各小区間内の最大・最小の振れを観察する。

---

## 5. 広義Riemann積分との関係

通常のRiemann積分は有界閉区間上の有界関数を扱います。無限区間や、端点で関数が非有界になる場合には、Riemann 側は別の極限を追加して**広義積分**を定義します。

非負関数では、この極限とLebesgue積分は非常にきれいに一致します。

<a id="thm-mt-rl-improper-nonnegative"></a>
<!-- formal-statement-start -->
> **定理（非負広義Riemann積分とLebesgue積分の一致）**  
> $f:(a,b]\to[0,\infty)$ が連続とする。このとき
$$
\int_{(a,b]}f\,dm
=
\lim_{c\downarrow a}\int_c^bf(x)\,dx
$$
> が $[0,\infty]$ の値として成り立つ。右辺は広義Riemann積分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a_n\downarrow a$ となる列を一つ固定し
$$
f_n:=f1_{[a_n,b]}
$$
と置きます。各 $x\in(a,b]$ について、十分大きい $n$ では $a_n\le x$ なので
$$
0\le f_n(x)\uparrow f(x).
$$
各 $f_n$ は有界閉区間 $[a_n,b]$ 上で連続、従って Riemann 可積分です。[Riemann 積分と Lebesgue 積分の一致](#thm-mt-rl-agreement)を $f|_{[a_n,b]}$ に適用すると
$$
\int_{(a,b]} f_n\,dm
=
\int_{a_n}^b f(x)\,dx.
$$
左辺の積分領域を $(a,b]$ と書いても、$f_n$ は $[a_n,b]$ の外で 0 だから同じです。

[単調収束定理（Monotone Convergence Theorem; MCT）](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を非負列 $(f_n)$ に適用すると
$$
\int_{(a,b]} f\,dm
=
\lim_{n\to\infty}\int_{(a,b]}f_n\,dm
=
\lim_{n\to\infty}\int_{a_n}^b f(x)\,dx.
$$
広義積分の極限は $a_n\downarrow a$ の列の取り方によらないので、これは $c\downarrow a$ の極限に一致します。$\square$
<!-- proof-end -->

無限区間でも使う定理は同じですが、何を単調増加させるかを明示しておきます。たとえば $f:[a,\infty)\to[0,\infty)$ なら $b_n\uparrow\infty$ として
$$
f_n=f1_{[a,b_n]}
$$
と置けば $0\le f_n\uparrow f$ なので、[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から
$$
\int_{[a,\infty)}f\,dm
=
\lim_{n\to\infty}\int_a^{b_n}f(x)\,dx.
$$
両側無限区間では $a_n\downarrow-\infty$, $b_n\uparrow\infty$ として $f1_{[a_n,b_n]}\uparrow f$ とすれば同じ議論になります。

符号を持つ関数では注意が必要です。絶対値の広義積分まで有限ならLebesgue可積分で値も一致しますが、**条件収束する広義積分**はLebesgue可積分とは限りません。

典型例は
$$
\int_1^\infty\frac{\sin x}{x}\,dx
$$
です。まず $1\le A<B$ に対して部分積分すると
$$
\int_A^B\frac{\sin x}{x}\,dx
=
\left[-\frac{\cos x}{x}\right]_A^B
-
\int_A^B\frac{\cos x}{x^2}\,dx.
$$
$B\to\infty$ で $\cos B/B\to0$ であり、
$$
\int_A^\infty\frac{|\cos x|}{x^2}\,dx
\le
\int_A^\infty\frac{dx}{x^2}
<\infty
$$
なので、広義 Riemann 積分は収束します。

一方、各整数 $k\ge1$ について
$$
I_k=[k\pi+\pi/6,\ k\pi+5\pi/6]
$$
では $|\sin x|\ge1/2$ です。従って
$$
\int_{I_k}\frac{|\sin x|}{x}\,dx
\ge
\frac12\frac{|I_k|}{k\pi+5\pi/6}
=
\frac{\pi/3}{k\pi+5\pi/6}.
$$
右辺を $k$ について足すと調和級数型に発散するので
$$
\int_1^\infty\frac{|\sin x|}{x}\,dx=\infty.
$$
したがって $\sin x/x$ は Lebesgue 可積分ではありません。

したがって無限区間まで含めると、単純に「Lebesgue積分がRiemann積分を全部包含する」と言うのは不正確です。正しくは、**通常のRiemann積分はLebesgue積分に含まれ、非負・絶対収束の広義積分も自然に接続するが、条件収束は別物**です。

---

## 6. 演習

### Level A

<a id="ex-mt-rl-a01"></a>
#### MT-RL-A01 Dirichlet関数
- Level: A

$f=1_{\mathbb Q\cap[0,1]}$ について、Riemann可積分性とLebesgue可積分性をそれぞれ判定し、Lebesgue積分値を求めよ。

<!-- solution-start -->
**解答**：
任意の非退化区間 $I\subset[0,1]$ には有理数と無理数がともに存在します。従って
$$
\inf_I f=0,
\qquad
\sup_I f=1.
$$
どの分割 $P$ に対しても
$$
L(f,P)=0,
\qquad
U(f,P)=1,
$$
なので Darboux 上和と下和の差を 0 にできず、$f$ は Riemann 非可積分です。

一方、$\mathbb Q\cap[0,1]$ は可算集合なので Lebesgue 測度 0 です。従って $f=0$ ほとんど至る所であり
$$
\int_{[0,1]}|f|\,dm
=
m(\mathbb Q\cap[0,1])
=
0<\infty.
$$
よって $f$ は Lebesgue 可積分で、積分値は
$$
\int_{[0,1]}f\,dm=0
$$
です。
<!-- solution-end -->

<a id="ex-mt-rl-a02"></a>
#### MT-RL-A02 Thomae関数
- Level: A

本文のThomae関数 $t$ の不連続点集合を答え、Riemann積分値を求めよ。

<!-- solution-start -->
**解答**：
まず無理数 $x$ を固定します。任意の $\varepsilon>0$ に対し、$1/q\ge\varepsilon$ を満たす既約分数の分母は
$$
q\le1/\varepsilon
$$
に限られます。$[0,1]$ 内でそのような既約分数は有限個しかないので、無理数 $x$ の十分小さい近傍からそれらを除けます。その近傍では $t(y)<\varepsilon$ であり $t(x)=0$ なので、$t$ は $x$ で連続です。

次に有理数 $x=p/q$ を既約表示すると $t(x)=1/q>0$ です。無理数列 $x_n\to x$ を取れば $t(x_n)=0$ だから $t(x_n)\not\to t(x)$ で、$x$ は不連続点です。従って不連続点集合はちょうど
$$
\mathbb Q\cap[0,1].
$$
これは可算で Lebesgue 測度 0 なので、[Lebesgue の Riemann 可積分性判定](#thm-mt-rl-lebesgue-criterion)から $t$ は Riemann 可積分です。また $t=0$ ほとんど至る所なので Lebesgue 積分は 0、[Riemann 積分と Lebesgue 積分の一致](#thm-mt-rl-agreement)から Riemann 積分も
$$
\int_0^1t(x)\,dx=0
$$
です。
<!-- solution-end -->

<a id="ex-mt-rl-a03"></a>
#### MT-RL-A03 Cantor集合
- Level: A

標準Cantor集合 $C$ の指示関数 $1_C$ がRiemann可積分であることを示し、積分値を求めよ。

<!-- solution-start -->
**解答**：
$C$ は閉集合なので $C^c$ は開です。$x\in C^c$ なら、ある近傍が $C^c$ に完全に含まれ、その近傍で $1_C=0$ だから $1_C$ は $x$ で連続です。

一方 $x\in C$ とします。標準 Cantor 集合は内部を持たないため、任意の近傍に $C^c$ の点 $y$ が存在します。$1_C(x)=1$ なのにそのような $y$ では $1_C(y)=0$ なので、$1_C$ は $x$ で不連続です。従って不連続点集合はちょうど $C$ です。

標準 Cantor 集合は Lebesgue 測度 0 なので、[Lebesgue の Riemann 可積分性判定](#thm-mt-rl-lebesgue-criterion)より $1_C$ は Riemann 可積分です。また
$$
\int_{[0,1]}1_C\,dm=m(C)=0.
$$
[Riemann 積分と Lebesgue 積分の一致](#thm-mt-rl-agreement)から Riemann 積分値も 0 です。
<!-- solution-end -->

<a id="ex-mt-rl-a04"></a>
#### MT-RL-A04 $x^{-p}$ の特異積分
- Level: A

$p>0$ とする。$(0,1]$ 上の $f(x)=x^{-p}$ について、広義Riemann積分およびLebesgue積分が有限となる $p$ の範囲を求めよ。

<!-- solution-start -->
**解答**：
$0<\varepsilon<1$ で切断すると
$$
\int_\varepsilon^1x^{-p}\,dx
=
\begin{cases}
\dfrac{1-\varepsilon^{1-p}}{1-p},&p\ne1,\\
-\log\varepsilon,&p=1.
\end{cases}
$$
$p<1$ なら $1-p>0$ なので $\varepsilon^{1-p}\to0$、従って極限は
$$
\frac1{1-p}<\infty.
$$
$p=1$ なら $-\log\varepsilon\to\infty$、$p>1$ なら $\varepsilon^{1-p}\to\infty$ なので、いずれも発散します。問題では $p>0$ だから、広義 Riemann 積分が有限なのは
$$
0<p<1
$$
です。

$f(x)=x^{-p}$ は非負連続関数なので、[非負広義 Riemann 積分と Lebesgue 積分の一致](#thm-mt-rl-improper-nonnegative)を適用できます。従って Lebesgue 積分が有限となる範囲も同じく $0<p<1$ です。
<!-- solution-end -->

### Level B

<a id="ex-mt-rl-b01"></a>
#### MT-RL-B01 分割の細分と階段近似
- Level: B

分割 $Q$ が $P$ の細分なら

$$
\ell_P\le\ell_Q\le f\le u_Q\le u_P
$$

となることを示せ。

<!-- solution-start -->
**解答**：
$Q$ が $P$ の細分であるとは、$P$ の各小区間 $I$ が $Q$ のいくつかの小区間 $J$ に分割されることです。$J\subset I$ なら、下限を取る集合が小さくなるので
$$
\inf_I f\le\inf_J f,
$$
上限は逆に
$$
\sup_J f\le\sup_I f
$$
です。

従って $J$ の内部の任意の点 $x$ では
$$
\ell_P(x)=\inf_I f
\le
\inf_J f=\ell_Q(x)
\le
f(x)
\le
\sup_J f=u_Q(x)
\le
\sup_I f=u_P(x).
$$
分割点では定義により対応する区分的定数関数の値を $f(x)$ に合わせているので、同じ不等式が成り立ちます。したがって全点で
$$
\ell_P\le\ell_Q\le f\le u_Q\le u_P.
$$
<!-- solution-end -->

<a id="ex-mt-rl-b02"></a>
#### MT-RL-B02 a.e.同値でもRiemann性は変わる
- Level: B

$f(x)=0$ と $g(x)=1_{\mathbb Q\cap[0,1]}(x)$ はa.e.で等しい。それでもRiemann可積分性が一致しない理由を、局所振動で説明せよ。

<!-- solution-start -->
**解答**：
$f\equiv0$ では任意の $x$ と任意の近傍で値の振れ幅が 0 なので
$$
\omega_f(x)=0
$$
です。従って全点で連続です。

一方
$$
g=1_{\mathbb Q\cap[0,1]}
$$
では、任意の点 $x$ と任意の $\delta>0$ に対し、$[0,1]\cap(x-\delta,x+\delta)$ に有理数と無理数がともに存在します。したがってその近傍での値の振れ幅は常に $1$、よって
$$
\omega_g(x)=1
$$
です。従って $g$ の不連続点集合は $[0,1]$ 全体で、Lebesgue 測度 1 を持つため Riemann 非可積分です。

それでも $f=g$ ほとんど至る所なのは、両者が異なる集合 $\mathbb Q\cap[0,1]$ の測度が 0 だからです。Lebesgue 積分はこの零集合上の変更を無視しますが、Riemann 積分は各小区間の上限・下限を見るため、稠密な零集合上の変更を無視できません。
<!-- solution-end -->

<a id="ex-mt-rl-b03"></a>
#### MT-RL-B03 条件収束する広義積分
- Level: B

$\int_1^\infty \sin x/x\,dx$ が広義積分として収束しても、$\sin x/x$ がLebesgue可積分ではない理由を説明せよ。

<!-- solution-start -->
**解答**：
まず広義積分の収束を確認します。$1\le A<B$ に対して部分積分すると
$$
\int_A^B\frac{\sin x}{x}\,dx
=
\left[-\frac{\cos x}{x}\right]_A^B
-
\int_A^B\frac{\cos x}{x^2}\,dx.
$$
$B\to\infty$ で $\cos B/B\to0$ であり、
$$
\int_A^\infty\frac{|\cos x|}{x^2}\,dx
\le
\int_A^\infty\frac{dx}{x^2}
<\infty
$$
なので、$\int_1^\infty \sin x/x\,dx$ は広義 Riemann 積分として収束します。

しかし Lebesgue 可積分性には絶対積分の有限性が必要です。区間
$$
I_k=[k\pi+\pi/6,k\pi+5\pi/6]
$$
では $|\sin x|\ge1/2$ なので
$$
\int_{I_k}\frac{|\sin x|}{x}\,dx
\ge
\frac{\pi/3}{k\pi+5\pi/6}.
$$
右辺を $k$ について足すと調和級数型に発散します。従って
$$
\int_1^\infty\frac{|\sin x|}{x}\,dx=\infty,
$$
したがって $\sin x/x$ は Lebesgue 可積分ではありません。広義積分の正負の打ち消しと、Lebesgue 可積分性が要求する絶対可積分性の違いが原因です。
<!-- solution-end -->

### Level C

<a id="ex-mt-rl-c01"></a>
#### MT-RL-C01 可積分なら不連続点は測度0
- Level: C

有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分とする。$D_\eta=\{x:\omega_f(x)\ge\eta\}$ と置き、各 $\eta>0$ で $m(D_\eta)=0$ をDarboux和から示せ。

<!-- solution-start -->
**解答**：
任意の $\varepsilon>0$ を固定します。Riemann 可積分性から、分割
$$
P:a=x_0<\cdots<x_n=b
$$
を
$$
U(f,P)-L(f,P)<\eta\varepsilon/2
$$
となるように取れます。

内部が $D_\eta$ と交わる小区間 $I_i=[x_{i-1},x_i]$ を考え、$x\in D_\eta\cap(x_{i-1},x_i)$ を取ります。$x$ の十分小さい近傍は $I_i$ に含まれます。$\omega_f(x)\ge\eta$ なので、その近傍、従って $I_i$ 上の振動幅は少なくとも $\eta$ です。該当区間の添字集合を $J$ とすると
$$
\eta\sum_{i\in J}(x_i-x_{i-1})
\le
\sum_{i\in J}(M_i-m_i)(x_i-x_{i-1})
\le
U(f,P)-L(f,P)
<
\eta\varepsilon/2.
$$
従ってそれらの区間の総延長は $<\varepsilon/2$ です。

$D_\eta$ の点で、これらの小区間の内部に入らないものは分割点 $x_0,\ldots,x_n$ の一部だけです。有限個の点は、総延長 $<\varepsilon/2$ の有限開区間族で覆えます。両方の被覆を合わせると $D_\eta$ は総延長 $<\varepsilon$ の有限開区間族で覆えます。$\varepsilon>0$ は任意だから
$$
m(D_\eta)=0.
$$

最後に、不連続点では $\omega_f(x)>0$ なので
$$
D(f)=\bigcup_{m=1}^\infty D_{1/m}.
$$
各 $D_{1/m}$ は零集合であり、零集合の可算合併も零集合です。従って
$$
m(D(f))=0.
$$
<!-- solution-end -->

---

## 7. この章で何がつながったか

ここまでで、Riemann積分とLebesgue積分の関係は次のように整理できます。

```text
有界閉区間
Riemann可積分
   ↓ 必ず
Lebesgue可積分
   ↓
積分値は一致

Lebesgue可積分
   ⇏ Riemann可積分
   反例: Dirichlet関数

Riemann可積分
   ⇔ 不連続点集合のLebesgue測度が0

非負・絶対収束の広義積分
   ↔ Lebesgue積分へ自然に接続

条件収束する広義積分
   ↛ Lebesgue可積分とは限らない
```

これでRA4のRiemann積分と、測度論側のLebesgue積分・MCT/DCTが一つの体系として接続しました。次の標準数学コアは **Batch 3：線形代数コア** です。
