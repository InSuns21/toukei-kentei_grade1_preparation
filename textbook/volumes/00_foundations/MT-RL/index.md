# MT-RL 標準測度論ブリッジ：Riemann積分とLebesgue積分

[RA4](../RA4/index.md) ではDarboux上和・下和からRiemann積分を作り、[Lebesgue積分の構成](../F0_00D2A_単関数_Lebesgue積分_構成/index.md) では単関数からLebesgue積分を作りました。

見た目は別物ですが、重なる範囲では同じ面積を計算しています。この章の目的は、その「同じになる理由」と「同じにならない境界」を明示することです。

```text
Darboux下和・上和
       │
       │  階段関数として読む
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

小区間の内部では高さ $m_i$ の下側階段関数 $\ell_P$、高さ $M_i$ の上側階段関数 $u_P$ を置き、分割点では $\ell_P=u_P=f$ とします。分割点は有限個なので積分値には影響しません。

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

任意の $\varepsilon>0$ に対し、Darboux 可積分性判定から分割
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
任意の $\varepsilon>0$ でこのような分割を作れるので、Darboux 可積分性判定より $f$ は Riemann 可積分です。$\square$
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

通常のRiemann積分は有界閉区間上の有界関数を扱います。無限区間や特異点では、Riemann側は別の極限を追加して**広義積分**を定義します。

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
$
f_n=f1_{[a,b_n]}
$
と置けば $0\le f_n\uparrow f$ なので、単調収束定理から
$
\int_{[a,\infty)}f\,dm
=
\lim_{n\to\infty}\int_a^{b_n}f(x)\,dx.
$
両側無限区間では $a_n\downarrow-\infty$, $b_n\uparrow\infty$ として $f1_{[a_n,b_n]}\uparrow f$ とすれば同じ議論になります。

符号を持つ関数では注意が必要です。絶対値の広義積分まで有限ならLebesgue可積分で値も一致しますが、**条件収束する広義積分**はLebesgue可積分とは限りません。

典型例は

$$
\int_1^\infty\frac{\sin x}{x}\,dx.
$$

これは広義Riemann積分としては収束しますが、

$$
\int_1^\infty\frac{|\sin x|}{x}\,dx=\infty
$$

なのでLebesgue可積分関数ではありません。

したがって無限区間まで含めると、単純に「Lebesgue積分がRiemann積分を全部包含する」と言うのは不正確です。正しくは、**通常のRiemann積分はLebesgue積分に含まれ、非負・絶対収束の広義積分も自然に接続するが、条件収束は別物**です。

---

## 6. 演習

### Level A

<a id="ex-mt-rl-a01"></a>
#### MT-RL-A01 Dirichlet関数
- Level: A

$f=1_{\mathbb Q\cap[0,1]}$ について、Riemann可積分性とLebesgue可積分性をそれぞれ判定し、Lebesgue積分値を求めよ。

<!-- solution-start -->
**解答**：任意の小区間で上限1・下限0なのでRiemann非可積分。有理数集合は測度0なので $f=0$ a.e. で、Lebesgue可積分かつ積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a02"></a>
#### MT-RL-A02 Thomae関数
- Level: A

本文のThomae関数 $t$ の不連続点集合を答え、Riemann積分値を求めよ。

<!-- solution-start -->
**解答**：不連続点は $\mathbb Q\cap[0,1]$ で測度0。[LebesgueのRiemann可積分性判定](#thm-mt-rl-lebesgue-criterion) よりRiemann可積分。$t=0$ a.e. なので [Riemann積分とLebesgue積分の一致](#thm-mt-rl-agreement) から積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a03"></a>
#### MT-RL-A03 Cantor集合
- Level: A

標準Cantor集合 $C$ の指示関数 $1_C$ がRiemann可積分であることを示し、積分値を求めよ。

<!-- solution-start -->
**解答**：$C$ は閉集合で内部を持たないため、$1_C$ は $C$ 上で不連続、$C^c$ 上で連続。$m(C)=0$ なので可積分性判定からRiemann可積分。$1_C=0$ a.e. なので積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a04"></a>
#### MT-RL-A04 $x^{-p}$ の特異積分
- Level: A

$p>0$ とする。$(0,1]$ 上の $f(x)=x^{-p}$ について、広義Riemann積分およびLebesgue積分が有限となる $p$ の範囲を求めよ。

<!-- solution-start -->
**解答**：
$$
\int_\varepsilon^1x^{-p}dx
=
\begin{cases}
\dfrac{1-\varepsilon^{1-p}}{1-p},&p\ne1,\\
-\log\varepsilon,&p=1.
\end{cases}
$$
よって有限なのは $0<p<1$。非負なので [非負広義Riemann積分とLebesgue積分の一致](#thm-mt-rl-improper-nonnegative) によりLebesgue積分も同じ範囲で有限。
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
**解答**：小区間を細かくすると、その上での下限は元の大区間の下限以上になり、上限は元の大区間の上限以下になる。各点でこの関係を適用すればよい。分割点では全て $f$ の値に合わせているので同じ不等式が成り立つ。
<!-- solution-end -->

<a id="ex-mt-rl-b02"></a>
#### MT-RL-B02 a.e.同値でもRiemann性は変わる
- Level: B

$f(x)=0$ と $g(x)=1_{\mathbb Q\cap[0,1]}(x)$ はa.e.で等しい。それでもRiemann可積分性が一致しない理由を、局所振動で説明せよ。

<!-- solution-start -->
**解答**：$f$ は全点で局所振動0。一方 $g$ はどの近傍にも有理数と無理数があるため全点で局所振動1。したがって $g$ の不連続点集合は $[0,1]$ 全体で正の測度を持ち、Riemann非可積分。Lebesgue積分は零集合上の変更を無視するが、Riemann積分は各小区間の振動を無視しない。
<!-- solution-end -->

<a id="ex-mt-rl-b03"></a>
#### MT-RL-B03 条件収束する広義積分
- Level: B

$\int_1^\infty \sin x/x\,dx$ が広義積分として収束しても、$\sin x/x$ がLebesgue可積分ではない理由を説明せよ。

<!-- solution-start -->
**解答**：広義積分の収束は正負の打ち消しを許す。一方Lebesgue可積分には $\int|f|<\infty$ が必要。各 $k$ について $[k\pi+\pi/6,k\pi+5\pi/6]$ では $|\sin x|\ge1/2$ なので、これらの区間で $|\sin x|/x$ を積分すると調和級数型の下界が得られ、絶対積分は発散する。
<!-- solution-end -->

### Level C

<a id="ex-mt-rl-c01"></a>
#### MT-RL-C01 可積分なら不連続点は測度0
- Level: C

有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分とする。$D_\eta=\{x:\omega_f(x)\ge\eta\}$ と置き、各 $\eta>0$ で $m(D_\eta)=0$ をDarboux和から示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ に対し $U(f,P)-L(f,P)<\eta\varepsilon$ となる分割 $P$ を取る。$D_\eta$ を含む小区間（分割点は有限なので別扱い）では振動幅が少なくとも $\eta$ だから、該当区間の総延長を $S$ とすると
$$
\eta S\le U(f,P)-L(f,P)<\eta\varepsilon.
$$
よって $S<\varepsilon$。任意の $\varepsilon$ で覆えるので $m(D_\eta)=0$。最後に $D(f)=\bigcup_{m\ge1}D_{1/m}$ だから不連続点集合も測度0。
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
