# TRN9 Hermite–Lindemann：多重零点と整数性

[TRN8の対称関係](../TRN8/index.md#thm-trn8-balanced-relation)により、零指数の係数が正で、Galois共役を取っても変わらない有限指数関係が得られました。そこに含まれる指数は代数的数ですが、必ずしも代数的整数ではありません。例えば $1/2$ を整数点と同じように微分評価すると、分母が残る危険があります。

今回の中心課題は、**どこで高い重複度の零点を作り、どこで分母を払えば、特別な微分値だけを素数合同で残せるか**です。[TRN5の階乗と微分値の議論](../TRN5/index.md#lem-trn5-factorial-derivatives)を、任意の有限な代数的指数集合へ拡張します。解析的に小さい量を作る積分評価は次章に回し、本章では非零整数の構成を終えます。

## 1. まず指数を整数化する

[TRN8の対称関係](../TRN8/index.md#thm-trn8-balanced-relation)から、有限Galois拡大 $K/\mathbb Q$、$G=\operatorname{Gal}(K/\mathbb Q)$、相異なる元からなる有限集合 $T\subset K$、整数 $c_t\ne0$ があり、

$$
0\in T,\quad c_0>0,\quad
\sigma(T)=T,\quad c_{\sigma(t)}=c_t,\qquad
\sum_{t\in T}c_te^t=0
$$

が成立します。指数を合併済みなので、同じ $t$ を二度数えません。$T^\ast=T\setminus\{0\}$ とします。もし $T^\ast=\varnothing$ なら上の等式は $c_0=0$ となって矛盾するため、**$T^\ast$ は非空**です。

指数の分母を一度だけ払い、以後の微分評価を代数的整数で実行したいと考えます。[共通分母消去](../TRN2/index.md#lem-trn2-denominator-clearing)から、すべての $t\in T$ に対し $Dt$ が代数的整数となる正整数 $D$ を選べます。

<a id="lem-trn9-integerized-roots"></a>

<!-- formal-statement-start -->
> **補題（整数化した指数の消滅多項式）**  
> $K/\mathbb Q$ を有限Galois拡大、$T\subset K$ を $0\in T$ を含む有限な $G$-不変集合とする。$T^\ast=T\setminus\{0\}\ne\varnothing$ とし、全 $t\in T$ について $u_t=Dt$ が代数的整数になる正整数 $D$ を固定する。このとき

$$
Q(Z)=\prod_{t\in T^\ast}(Z-u_t)\in\mathbb Z[Z]
$$

> はモニック多項式であり、$Q(0)$ は非零の通常の整数である。また $u_t$ ($t\in T^\ast$) はそれぞれ $Q$ の重複度1の根である。
<!-- formal-statement-end -->

### 証明の見取り図

共役で指数集合を入れ替えると積の因子も置換され、$Q$ の各係数は有理数になります。一方、各根は代数的整数なので、その基本対称式も代数的整数です。「有理数かつ代数的整数は整数」という性質を使います。

<!-- proof-start -->
### 証明

$u_t=Dt$ は代数的整数で、$D\in\mathbb Z$ は全ての $\sigma\in G$ に固定されます。従って $\sigma(u_t)=u_{\sigma(t)}$ であり、$T^\ast$ の $G$-不変性から

$$
\sigma(Q)(Z)
=\prod_{t\in T^\ast}(Z-\sigma(u_t))
=\prod_{t\in T^\ast}(Z-u_{\sigma(t)})
=Q(Z).
$$

各係数は $K$ に属し、すべての $G$ に固定されます。有限Galois拡大の固定体は $\mathbb Q$ なので $Q\in\mathbb Q[Z]$ です。他方、係数は $u_t$ の積の有限和です。[代数的整数の加法・乗法の閉性](../TRN1/index.md#thm-trn1-integral-ring)によって全て代数的整数です。[有理な代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)を係数ごとに適用すると $Q\in\mathbb Z[Z]$ です。

$0\notin T^\ast$ かつ $D\ne0$ より全 $u_t\ne0$ なので

$$
Q(0)=\prod_{t\in T^\ast}(-u_t)\ne0.
$$

これは $Q$ の整数係数の定数項です。また $T$ の元は相異なり、$D\ne0$ だから $u_t$ も相異なります。従って各一次因子はちょうど一度だけ現れ、根の重複度は1です。
<!-- proof-end -->

### 例：$1/\sqrt2$ を含む三点

$s=\sqrt2/2$、$T=\{0,s,-s\}$、$K=\mathbb Q(\sqrt2)$ とします。$s$ 自身は代数的整数とは限りませんが、$D=2$ なら $u_s=\sqrt2$、$u_{-s}=-\sqrt2$ は $Z^2-2$ の根なので代数的整数です。非自明なGalois自己同型は二つを交換します。ゆえに

$$
Q(Z)=(Z-\sqrt2)(Z+\sqrt2)=Z^2-2,
\qquad Q(0)=-2.
$$

この $D$ は最小である必要はありません。別の共通倍数を選んでも根は代数的整数のままで、後に除外する素数の集合が変わるだけです。

二つの根が共役であることは係数の整数化につながります。**$Q$ の変数は $Z$ で、元の指数を代入する変数 $X$ とは $Z=DX$ で結び付ける**ことが重要です。

## 2. 高重複零点を持つ補助多項式

$Q$ の根は $u_t=Dt$ です。指数 $t\ne0$ では少なくとも $p$ 回、指数0ではちょうど $p-1$ 回だけ零になるよう、$Q(Z)^p$ と $Z^{p-1}$ を組み合わせます。素数 $p$ の選択より前に $T,K,c_t,D,Q$ をすべて固定します。

<a id="def-trn9-auxiliary-polynomial"></a>

<!-- formal-statement-start -->
> **定義（多重零点を持つHermite–Lindemann補助多項式）**  
> 前節の $T,D,Q$ と素数 $p\ge2$ に対し、$s=|T^\ast|\ge1$ と置き、

$$
H_p(Z)=Z^{p-1}Q(Z)^p,\qquad
f_p(X)=\frac{H_p(DX)}{(p-1)!}
$$

> を補助多項式とする。$N_p=(p-1)+sp$ とし、[Hermiteの有限微分和](../TRN4/index.md#def-trn4-derivative-sum)を

$$
F_p(X)=\sum_{k=0}^{N_p}f_p^{(k)}(X)
$$

> とする。$f_p\in\mathbb Q[X]$、$\deg f_p=N_p$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn9-auxiliary-polynomial -->
**定義の確認**

$T=\{0,1,-1\}$、$D=1$ とすると $Q(Z)=(Z-1)(Z+1)=Z^2-1$ です。$p=3$ では

$$
H_3(Z)=Z^2(Z^2-1)^3,\quad
f_3(X)=\frac{X^2(X^2-1)^3}{2},\quad
N_3=2+2\cdot3=8.
$$

$X=\pm1$ では $(X^2-1)^3=(X-1)^3(X+1)^3$ が三重零点を作ります。$X=0$ では $X^2$ が二重零点を作り、$Q(0)=-1\ne0$ なので三重以上にはなりません。$F_3$ は $f_3$ の第0階から第8階までの九つの導関数の和です。多項式は $X^2$ を因子に持っていても、**微分和 $F_3$ 自体が同じ零点を持つわけではありません**。
<!-- definition-example-end -->

<a id="prop-trn9-zero-multiplicity"></a>

<!-- formal-statement-start -->
> **命題（評価点の零点重複度）**  
> [上の補助多項式](#def-trn9-auxiliary-polynomial)について、$f_p$ は $X=0$ でちょうど $p-1$ 重の零点、各 $t\in T^\ast$ でちょうど $p$ 重の零点を持つ。従って

$$
f_p^{(k)}(0)=0\quad(0\le k<p-1),\qquad
f_p^{(k)}(t)=0\quad(t\in T^\ast,\ 0\le k<p).
$$

<!-- formal-statement-end -->

### 証明の見取り図

単に $Z$ の重複度を数えるのではなく、$Z=DX$ が零点とその重複度をどう移すかを確認します。$D\ne0$ であるため一次因子の次数は変わりません。

<!-- proof-start -->
### 証明

$Q(0)\ne0$ より $H_p(Z)=Z^{p-1}Q(Z)^p$ の $Z=0$ における最初の非零項は $Q(0)^pZ^{p-1}$ です。$Z=DX$ を代入すると最初の非零項は $D^{p-1}Q(0)^pX^{p-1}$ となり、係数は非零です。

$t\in T^\ast$ では、根が相異なるので $Q(Z)=(Z-u_t)Q_t(Z)$ と書け、$Q_t(u_t)\ne0$ です。$D t=u_t$ より

$$
H_p(DX)
=(DX)^{p-1}\bigl(D(X-t)\bigr)^pQ_t(DX)^p.
$$

$t\ne0$ かつ $D\ne0$、$Q_t(u_t)\ne0$ なので $(X-t)^p$ を取り除いた係数は $X=t$ で非零です。従って零点重複度はちょうど $p$ です。多項式が $(X-a)^r$ を因子に持てば、$k<r$ 階までの導関数の $a$ における値は0です。この事実をそれぞれの点へ適用して結論を得ます。
<!-- proof-end -->

## 3. 階乗を取り除いても微分値は代数的整数になる

[TRN5の階乗微分補題](../TRN5/index.md#lem-trn5-factorial-derivatives)では、整数係数多項式を整数点で微分した値を調べました。ここでは評価点 $u_t$ は必ずしも通常の整数ではありませんが、**代数的整数**です。各係数をそのまま代入すれば、同じ階乗可除性を代数的整数環の中で得られます。

<a id="lem-trn9-integral-derivatives"></a>

<!-- formal-statement-start -->
> **補題（代数的整数点での階乗可除性）**  
> $H(Z)\in\mathbb Z[Z]$、$u$ は代数的整数、$k\ge0$ とする。このとき $H^{(k)}(u)/k!$ は代数的整数である。特に、前節の $f_p$ に対して、全 $t\in T$ と $0\le k\le N_p$ について

$$
f_p^{(k)}(t)\text{ は代数的整数},
$$

> さらに $k\ge p$ なら $f_p^{(k)}(t)$ は $p$ の代数的整数倍である。
<!-- formal-statement-end -->

### 証明の見取り図

$H(Z)$ の係数表示を項別に $k$ 回微分すると、階乗を払った値が二項係数を持つ多項式になります。次に $Z=DX$ の連鎖律で $D^k$ が現れます。残る階乗比 $k!/(p-1)!$ は $k\ge p$ のとき $p$ を因子に持ちます。

<!-- proof-start -->
### 証明

$H(Z)=\sum_{j=0}^{n}a_jZ^j$、$a_j\in\mathbb Z$ とします。$k\le n$ では項別微分から

$$
\frac{H^{(k)}(u)}{k!}
=\sum_{j=k}^{n}a_j\binom jk u^{j-k}.
$$

$\binom jk$ は整数です。$u$ が代数的整数であるため、[代数的整数の加法・乗法の閉性](../TRN1/index.md#thm-trn1-integral-ring)から右辺は代数的整数です。$k>n$ なら導関数は0なので同じ結論です。

補助多項式では連鎖律を $k$ 回適用して

$$
f_p^{(k)}(t)
=\frac{D^k H_p^{(k)}(Dt)}{(p-1)!}
=\left(\frac{k!}{(p-1)!}\right)
D^k\frac{H_p^{(k)}(u_t)}{k!}.
$$

$k\ge p-1$ なら $k!/(p-1)!$ は整数であり、右端の商も代数的整数です。$k<p-1$ は[零点重複度](#prop-trn9-zero-multiplicity)により、$t=0$ と $t\in T^\ast$ の双方で導関数が0なので整数性が成立します。

さらに $k\ge p$ では

$$
\frac{k!}{(p-1)!}
=p(p+1)\cdots k
\in p\mathbb Z.
$$

よって $f_p^{(k)}(t)\in p\mathcal O_K$ です。ここで $\mathcal O_K$ は $K$ に属する代数的整数全体を表します。$f_p$ の係数と $u_t$ は $K$ に属するので、右辺の代数的整数も $K$ に属します。
<!-- proof-end -->

## 4. 特別項とそれ以外を素数合同で分離する

導関数和 $F_p$ では、$t\ne0$ には $k\ge p$ の項しか残らず、それらは $p$ で割り切れます。$t=0$ だけは $k=p-1$ の項が残ります。その値を省略せずに計算します。

<a id="prop-trn9-endpoint-congruences"></a>

<!-- formal-statement-start -->
> **命題（端点微分和の合同）**  
> $K,T,D,Q,p,f_p,F_p$ を前節までの条件の下で固定し、$\mathcal O_K$ を $K$ の代数的整数環とする。全 $t\in T$ に対して $F_p(t)\in\mathcal O_K$ であり、次の合同が成立する。

$$
F_p(0)\equiv D^{p-1}Q(0)^p\pmod{p\mathcal O_K},
$$

$$
F_p(t)\equiv0\pmod{p\mathcal O_K}
\qquad(t\in T^\ast).
$$

<!-- formal-statement-end -->

### 証明の見取り図

一般点は零点の重複度 $p$ で消え、残りは全て階乗の比によって $p$ の倍数です。0点だけ微分階数 $p-1$ が残り、その値は $D^{p-1}Q(0)^p$ となります。

<!-- proof-start -->
### 証明

[微分値の整数性](#lem-trn9-integral-derivatives)を $0\le k\le N_p$ の全てへ適用し、有限和 $F_p(t)$ も $\mathcal O_K$ に属します。$t\in T^\ast$ では[零点重複度](#prop-trn9-zero-multiplicity)により $k<p$ の項は0で、$k\ge p$ の項は $p\mathcal O_K$ に属します。従って $F_p(t)\in p\mathcal O_K$ です。

$t=0$ では $k<p-1$ は0、$k\ge p$ は $p\mathcal O_K$ です。残る一項は $H_p(Z)=Z^{p-1}Q(Z)^p$ の $Z^{p-1}$ の係数 $Q(0)^p$ から

$$
H_p^{(p-1)}(0)=(p-1)!Q(0)^p,
$$

$$
f_p^{(p-1)}(0)
=\frac{D^{p-1}}{(p-1)!}H_p^{(p-1)}(0)
=D^{p-1}Q(0)^p
$$

となります。他の全項を $p\mathcal O_K$ にまとめれば主張した合同を得ます。
<!-- proof-end -->

### 例：二点と三点の素数3

$T=\{0,1/2\}$ なら $D=2$、$Q(Z)=Z-1$ とできます。$p=3$ では

$$
f_3(X)=\frac{(2X)^2(2X-1)^3}{2},\quad
f_3^{(2)}(0)=2^2(-1)^3=-4.
$$

非特別点 $1/2$ は三重零点なので第0〜2階微分が消え、残りは $3$ の倍数です。実際 $H_3(Z)=Z^2(Z-1)^3$ の第3階微分を $Z=1$ で評価すると $3!\cdot1^2=6$、ゆえに

$$
f_3^{(3)}(1/2)=\frac{2^3\cdot6}{2}=24\in3\mathbb Z.
$$

対称な三点 $T=\{0,\pm1/2\}$ では $Q(Z)=Z^2-1$、$D=2$ です。$f_3^{(2)}(0)=-4$ は同じですが、$u=\pm1$ の双方が三重零点になります。$\pm1$ の第3階微分は

$$
f_3^{(3)}(\pm1/2)
=\frac{2^3\cdot3!}{2!}(\pm1)^2[Q'(\pm1)]^3
=\pm192.
$$

合同は単に「値が整数」という主張より強く、**非特別点の全微分和が3で割り切れる**という主張です。

## 5. 重み付き和は零でない通常の整数となる

非零の特別係数 $c_0$ はTRN8で得たもので、微分和に掛ける重みとしてここで使います。$F_p(t)$ のそれぞれは一般には代数的整数にすぎません。しかし全点について足すと、Galois作用に対する不変性が使えます。

<a id="thm-trn9-arithmetic-nonzero"></a>

<!-- formal-statement-start -->
> **定理（補助微分和から作る非零整数）**  
> 有限Galois拡大 $K/\mathbb Q$、有限集合 $T\subset K$ と整数係数 $(c_t)_{t\in T}$ が
>
> 1. $0\in T$、$T^\ast=T\setminus\{0\}\ne\varnothing$、$c_0\in\mathbb Z\setminus\{0\}$、
> 2. $T$ は相異なる指数からなり、全 $\sigma\in G=\operatorname{Gal}(K/\mathbb Q)$ について $\sigma(T)=T$、$c_{\sigma(t)}=c_t$、
>
> を満たすとする。前節で固定した $D,Q,f_p,F_p$ を使い、

$$
A_p=\sum_{t\in T}c_tF_p(t)
$$

> とおくと、すべての素数 $p\ge2$ に対して $A_p\in\mathbb Z$ である。さらに

$$
A_p\equiv c_0D^{p-1}Q(0)^p\pmod p
$$

> であり、$p\nmid c_0DQ(0)$ を満たす素数に対し $A_p\in\mathbb Z\setminus\{0\}$、特に $|A_p|\ge1$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[合同の命題](#prop-trn9-endpoint-congruences)で各 $F_p(t)$ が代数的整数であり、0点以外が $p$ で割り切れると分かります。$A_p$ が**有理数**でもあることは別途、$F_p$ の係数が有理数であることと、$G$ による添字置換から示します。有理数かつ代数的整数だから通常の整数です。最後に除外すべき素数を $c_0DQ(0)$ の素因子に限ります。

<!-- proof-start -->
### 証明

[端点微分和の合同](#prop-trn9-endpoint-congruences)により全ての $F_p(t)\in\mathcal O_K$ です。$c_t\in\mathbb Z$ なので $A_p\in\mathcal O_K$ です。

$f_p\in\mathbb Q[X]$ だから、導関数も有理係数多項式です。$K$ の任意の $\sigma\in G$ に対し

$$
\sigma(F_p(t))
=\sum_{k=0}^{N_p}\sigma(f_p^{(k)}(t))
=\sum_{k=0}^{N_p}f_p^{(k)}(\sigma(t))
=F_p(\sigma(t)).
$$

従って $\sigma(T)=T$ と $c_{\sigma(t)}=c_t$ を使えば

$$
\begin{aligned}
\sigma(A_p)
&=\sum_{t\in T}c_tF_p(\sigma(t))\\
&=\sum_{u\in T}c_{\sigma^{-1}(u)}F_p(u)\\
&=\sum_{u\in T}c_uF_p(u)=A_p.
\end{aligned}
$$

固定体が $\mathbb Q$ なので $A_p\in\mathbb Q$ です。すでに $A_p\in\mathcal O_K$ と示したので、[有理な代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)から $A_p\in\mathbb Z$ です。

[端点合同](#prop-trn9-endpoint-congruences)を $c_t$ 倍して足すと、

$$
A_p-c_0D^{p-1}Q(0)^p\in p\mathcal O_K.
$$

左辺は通常の整数です。ここで $n\in p\mathcal O_K\cap\mathbb Z$ なら $n/p\in\mathbb Q$ は代数的整数ですから、再び[有理な代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)によって $n/p\in\mathbb Z$ です。よって $p\mathcal O_K\cap\mathbb Z=p\mathbb Z$ であり、主張した通常の整数の合同が成立します。

$D>0$、$Q(0)\ne0$、$c_0\ne0$ なので $c_0DQ(0)\ne0$ です。これを割る素数は有限個です。それ以外の素数 $p$ では $c_0D^{p-1}Q(0)^p$ は $p$ で割り切れず、合同より $A_p$ も $p$ で割り切れません。特に $A_p\ne0$、整数性より $|A_p|\ge1$ です。
<!-- proof-end -->

### 例：代数的数を評価しても和は整数

$T=\{0,\pm\sqrt2/2\}$、$K=\mathbb Q(\sqrt2)$、$D=2$、$Q(Z)=Z^2-2$ とし、$c_0=2$、$c_{\sqrt2/2}=c_{-\sqrt2/2}=-1$ とします。ここは形式的な整数性の計算例であり、重みが指数関係 $\sum c_te^t=0$ を満たすとは仮定しません。重みはGalois共役で交換しても変わりません。$p=3$ では特別微分値は

$$
f_3^{(2)}(0)=2^2(-2)^3=-32.
$$

非特別点での第3階微分は、$u=\pm\sqrt2$、$Q'(u)=2u$ に注意して

$$
f_3^{(3)}(\pm\sqrt2/2)
=2^3\cdot3\,u^2(2u)^3
=\pm768\sqrt2.
$$

これは各々は通常の整数ではないものの、代数的整数で、しかも $3$ の代数的整数倍です。$F_3(\sqrt2/2)$ と $F_3(-\sqrt2/2)$ はGalois共役なので、その和は有理な代数的整数、すなわち通常の整数です。$A_3=2F_3(0)-F_3(\sqrt2/2)-F_3(-\sqrt2/2)$ について

$$
A_3\equiv2\cdot2^2(-2)^3=-64\equiv2\pmod3
$$

となり、$A_3\ne0$ です。ただし $p=2$ は $D Q(0)$ を割るため、この議論で非零性は保証しません。

## 6. 演習

### Level A：零点と階乗を計算する

**TRN9-A1（整数化した二点）**  
$T=\{0,1/3\}$ について $D=3$ とし、$Q(Z)$ と $Q(0)$ を求め、係数が整数であることを確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$u_{1/3}=3(1/3)=1$ は代数的整数です。非零点は一つなので

$$
Q(Z)=Z-u_{1/3}=Z-1\in\mathbb Z[Z],
\qquad Q(0)=-1.
$$

$Q(0)\ne0$ は元の非零指数 $1/3$ を $D=3$ 倍しても0にならないことからも従います。
<!-- solution-end -->

**TRN9-A2（零点の重複度）**  
$T=\{0,\pm1\}$、$D=1$、$Q(Z)=Z^2-1$、$p=5$ のとき、$f_p$ の次数と、$X=0,\pm1$ における零点の重複度を調べてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$s=|T^\ast|=2$ なので $N_5=(5-1)+2\cdot5=14$ です。また

$$
f_5(X)=\frac{X^4(X^2-1)^5}{4!}
=\frac{X^4(X-1)^5(X+1)^5}{24}.
$$

$X=0$ では残りの因子 $(X^2-1)^5$ が値 $(-1)^5=-1\ne0$ を持つので4重零点です。$X=1$ では $(X-1)^5$ 以外の因子が非零なので5重零点です。$X=-1$ も同じ理由で5重零点です。
<!-- solution-end -->

**TRN9-A3（階乗商の導出）**  
$H(Z)=3Z^4-Z^2+2$、$u=\sqrt2$ に対して $H''(u)/2!$ を計算し、代数的整数である理由を述べてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$H'(Z)=12Z^3-2Z$、$H''(Z)=36Z^2-2$ より

$$
\frac{H''(\sqrt2)}{2!}
=\frac{36\cdot2-2}{2}=35.
$$

[階乗微分の公式](#lem-trn9-integral-derivatives)でも、$3\binom42(\sqrt2)^2-\binom22=3\cdot6\cdot2-1=35$ です。$\sqrt2$ はモニックな $Z^2-2$ の根なので代数的整数であり、この式は実際に通常の整数となっています。
<!-- solution-end -->

**TRN9-A4（二点の特別導関数）**  
$T=\{0,1/2\}$、$D=2$、$p=3$ とします。$f_3^{(2)}(0)$ と $f_3^{(3)}(1/2)$ を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$Q(Z)=Z-1$ なので $H_3(Z)=Z^2(Z-1)^3$、$f_3(X)=H_3(2X)/2$ です。$Z^2$ の係数は $Q(0)^3=(-1)^3=-1$ だから

$$
f_3^{(2)}(0)=2^2Q(0)^3=-4.
$$

一方、$H_3(Z)=Z^2(Z-1)^3$ を $Z=1$ で三回微分すると、$(Z-1)^3$ を三回微分した項以外は $(Z-1)$ の因子を残して消え、

$$
H_3^{(3)}(1)=3!\cdot1^2=6,\qquad
f_3^{(3)}(1/2)=\frac{2^3\cdot6}{2!}=24.
$$

非特別点は第0〜2階が0で、第3階は $3$ の倍数です。
<!-- solution-end -->

### Level B：代数的整数環と素数合同をつなぐ

**TRN9-B1（三点の微分符号）**  
$T=\{0,\pm1/2\}$、$D=2$、$p=3$ のとき $Q(Z)$、$f_3^{(2)}(0)$、$f_3^{(3)}(\pm1/2)$ を求め、後二者の合同の役割を説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

非零点は $u=\pm1$ なので $Q(Z)=(Z-1)(Z+1)=Z^2-1$ です。$H_3(Z)=Z^2Q(Z)^3$ の $Z^2$ の係数は $Q(0)^3=-1$ だから

$$
f_3^{(2)}(0)=2^2(-1)=-4.
$$

$u=\pm1$ で $Q(u)=0$、$Q'(u)=2u$ なので、三回微分後に生き残る唯一の項は $3!u^2Q'(u)^3$ です。

$$
f_3^{(3)}(\pm1/2)
=\frac{2^3\cdot3!}{2!}(\pm1)^2(\pm2)^3
=\pm192.
$$

$\pm192$ は3の倍数で、$-4$ は3で割り切れません。$F_3$ の0点以外の導関数和はすべて3で割り切れ、0点の第2階だけが合同の特別項となります。
<!-- solution-end -->

**TRN9-B2（共役な非整数点）**  
$T=\{0,\pm\sqrt2/2\}$ について $D=2$ とします。$Q(Z)$ が整数係数である理由を共役の置換から説明し、$p=3$ で特別微分値を計算してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$u_\pm=\pm\sqrt2$ は $Z^2-2$ を満たす代数的整数です。$K=\mathbb Q(\sqrt2)$ の非自明なGalois自己同型は $u_+$ と $u_-$ を交換するので

$$
Q(Z)=(Z-u_+)(Z-u_-)
=Z^2-(u_++u_-)Z+u_+u_-
=Z^2-2.
$$

従って $Q(0)=-2$ です。特別導関数は

$$
f_3^{(2)}(0)=D^2Q(0)^3=2^2(-2)^3=-32.
$$

$3$ は $D Q(0)=-4$ を割らず、この値も3で割り切れません。一方で $p=2$ は例外素数です。
<!-- solution-end -->

**TRN9-B3（重み付き和の整数性）**  
$K/\mathbb Q$ を有限Galois拡大とし、$T$ が共役で保たれ、$c_{\sigma(t)}=c_t$ であるとします。$f\in\mathbb Q[X]$ の各導関数評価値 $f^{(k)}(t)$ が代数的整数なら、$A=\sum_{t\in T}c_t\sum_kf^{(k)}(t)$ が通常の整数であることを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

各 $f^{(k)}(t)$ が代数的整数で $c_t\in\mathbb Z$ なので、[整数の閉性](../TRN1/index.md#thm-trn1-integral-ring)から $A$ は代数的整数です。$f$ は有理係数だから

$$
\sigma(f^{(k)}(t))=f^{(k)}(\sigma(t)).
$$

$u=\sigma(t)$ と置き換えると

$$
\sigma(A)
=\sum_{t\in T}c_t\sum_kf^{(k)}(\sigma(t))
=\sum_{u\in T}c_{\sigma^{-1}(u)}\sum_kf^{(k)}(u)
=A.
$$

Galois不変な $A\in K$ は有理数です。[有理な代数的整数は整数](../TRN1/index.md#prop-trn1-rational-integers)なので $A\in\mathbb Z$ です。評価点が一つずつ整数である必要はありません。
<!-- solution-end -->

**TRN9-B4（例外素数と環の合同）**  
$c_0=6$、$D=10$、$Q(0)=-21$ とします。定理の合同から非零性が保証されない素数を全て列挙し、$p=11$ では特別項が0でない理由を説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

除外条件は $p\mid c_0 DQ(0)$ です。

$$
c_0DQ(0)=6\cdot10\cdot(-21)
=-2^2\cdot3^2\cdot5\cdot7
$$

なので例外素数は $2,3,5,7$ です。$p=11$ はいずれも割り切らないため、$6\cdot10^{10}(-21)^{11}$ の11を法とする剰余は0ではありません。従って $A_{11}\equiv6\cdot10^{10}(-21)^{11}\not\equiv0\pmod{11}$ で $A_{11}\ne0$ です。例外素数では定理の方法が非零性を保証しないだけで、$A_p=0$ と言えるわけではありません。
<!-- solution-end -->

### Level C：算術部分を一から再構成する

**TRN9-C1（共役不変な指数集合の整数化）**  
$K/\mathbb Q$ を有限Galois拡大、$T\subset K$ を相異なる代数的数の有限な $G$-不変集合、$0\in T$、$T^\ast\ne\varnothing$ とします。係数は $c_t\in\mathbb Z$、$c_{\sigma(t)}=c_t$、$c_0\ne0$ と仮定します。次を全て示してください。

1. $Dt$ が代数的整数となる共通の正整数 $D$ と $Q(Z)=\prod_{t\in T^\ast}(Z-Dt)\in\mathbb Z[Z]$ が存在し、$Q(0)\ne0$。
2. 任意の素数 $p$ について $f_p(X)=(DX)^{p-1}Q(DX)^p/(p-1)!$ を作り、0点と非0点の零点重複度を確かめる。
3. $F_p=\sum_{k=0}^{\deg f_p}f_p^{(k)}$ の各評価値が代数的整数となり、0点の特別項以外は $p$ で割り切れる。
4. $A_p=\sum_tc_tF_p(t)$ が通常の整数で、$p\nmid c_0DQ(0)$ のとき非零であることを証明する。

- Level: C

<!-- solution-start -->
**詳細解答**

[分母消去補題](../TRN2/index.md#lem-trn2-denominator-clearing)を有限個の $t\in T$ に適用し、$Dt$ が全て代数的整数となる正整数 $D$ を取ります。$u_t=Dt$ と置きます。

$G$ は $u_t$ を $u_{\sigma(t)}$ へ送るため、次の多項式は共役で不変です。

$$
Q(Z)=\prod_{t\in T^\ast}(Z-u_t).
$$

従って $Q$ は有理係数です。他方、その係数は代数的整数の和と積なので、[有理な代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)により $Q\in\mathbb Z[Z]$ です。非零の $t$ に対する $u_t$ は0でないため、$Q(0)\ne0$ です。

$s=|T^\ast|$ とし、$H_p(Z)=Z^{p-1}Q(Z)^p$ を置きます。$f_p(X)=H_p(DX)/(p-1)!$ の次数は $N_p=p-1+sp$ です。$Q(0)\ne0$ より0点の零点重複度は $p-1$、$T^\ast$ の根は相異なるので各 $t\ne0$ では $Q(DX)^p$ によりちょうど $p$ です。従って $f_p^{(k)}(0)=0$ ($k<p-1$)、$f_p^{(k)}(t)=0$ ($t\ne0,k<p$) です。

$H_p(Z)=\sum_ja_jZ^j$（$a_j\in\mathbb Z$）と展開します。$u_t$ は代数的整数なので

$$
\frac{H_p^{(k)}(u_t)}{k!}
=\sum_{j\ge k}a_j\binom jk u_t^{j-k}
\in\mathcal O_K.
$$

連鎖律により

$$
f_p^{(k)}(t)
=\frac{k!}{(p-1)!}D^k
\frac{H_p^{(k)}(u_t)}{k!}.
$$

$k\ge p-1$ ならこれは代数的整数です。$k<p-1$ の値は上で零と示しました。$k\ge p$ なら $k!/(p-1)!$ は $p$ の倍数です。よって全 $F_p(t)\in\mathcal O_K$、かつ

$$
F_p(t)\equiv0\pmod{p\mathcal O_K}\ (t\ne0).
$$

$H_p$ の $Z^{p-1}$ 係数は $Q(0)^p$ だから

$$
f_p^{(p-1)}(0)=D^{p-1}Q(0)^p,\quad
F_p(0)\equiv D^{p-1}Q(0)^p\pmod{p\mathcal O_K}.
$$

係数 $c_t$ も整数なので $A_p\in\mathcal O_K$ です。また $f_p\in\mathbb Q[X]$ により $\sigma(F_p(t))=F_p(\sigma(t))$。$G$ が $T$ を置換し、重み $c_t$ を保つため $\sigma(A_p)=A_p$ です。従って $A_p\in\mathbb Q\cap\mathcal O_K=\mathbb Z$ です。上の合同を重み付きで足すと

$$
A_p-c_0D^{p-1}Q(0)^p\in p\mathcal O_K\cap\mathbb Z=p\mathbb Z.
$$

最後の等式は、$n/p$ が有理な代数的整数なら通常の整数であることから従います。$p\nmid c_0DQ(0)$ なら特別項は $p$ で割り切れず、従って $A_p\ne0$、$|A_p|\ge1$ です。この結論は**算術的な下界**であり、まだ指数関係との解析的な矛盾ではありません。
<!-- solution-end -->

## 7. 次章で何をぶつけるか

本章は、有限な代数的指数集合について

$$
A_p\in\mathbb Z\setminus\{0\},
\qquad |A_p|\ge1
\quad(p\nmid c_0DQ(0))
$$

を証明しました。これだけでは $e^\alpha$ の代数性を否定できません。次章では、[Hermiteの複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)を各指数 $t$ へ適用し、仮定 $\sum c_te^t=0$ を使って同じ $A_p$ を積分和へ変えます。そこで上界が $p\to\infty$ に伴って0へ向かうことを示して、初めて整数の下界と矛盾させます。
