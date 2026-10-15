# TRN13 有理係数版：補助多項式・非零性・誤差

[TRN12の対称化命題](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)により、有理係数の指数関係が存在すると仮定すれば、指数0の係数が正で、共役の下で不変な**整数係数**の有限指数関係を得ます。ただし、整数係数の関係式だけでは矛盾しません。そこで今度は、関係式の各指数を根とする多項式を作り、その微分値と複素積分を比較します。

[TRN9の補助多項式](../TRN9/index.md#def-trn9-auxiliary-polynomial)は指数0を特別な根としていました。本章では**どの指数を特別な根に選んでもよい**形へ一般化します。個々の微分値は一般に代数的整数でしかありません。非零性を合同で確認したうえで共役の積を取り、通常の非零整数にすることが新しい点です。TRN14では、この上界と下界を最初の有理係数関係に結び付けます。

## 1. 指数集合を固定してから分母を払う

以下では、$K\subset\mathbb C$ を有限Galois拡大 $K/\mathbb Q$、$G=\operatorname{Gal}(K/\mathbb Q)$ とし、有限集合 $T\subset K$ と整数 $c_t$ が次の条件を満たすと**仮定**します。

$$
0\in T,\quad |T|=n\ge2,\quad
c_t\in\mathbb Z\setminus\{0\},\quad c_0>0,
$$

$$
\sigma(T)=T,\quad c_{\sigma(t)}=c_t\quad(\sigma\in G),\qquad
\sum_{t\in T}c_te^t=0.
$$

指数は集合 $T$ の元なので相異なります。この仮定は[TRN12の命題](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)の結論そのものです。以後、$T,K,(c_t)$ は素数 $p$ を選ぶ**前**に固定します。

各 $t$ は代数的です。[代数的数の共通分母消去](../TRN2/index.md#lem-trn2-denominator-clearing)により、正整数 $D$ を選んで全 $u_t=Dt$ を代数的整数にできます。以下の $D$ も固定したままにします。

<a id="lem-trn13-integer-root-polynomial"></a>

<!-- formal-statement-start -->
> **補題（整数係数の消滅多項式）**  
> 上の $K,T,D$ について

$$
H(Z)=\prod_{t\in T}(Z-u_t)
$$

> とおくと、$H\in\mathbb Z[Z]$ はモニックな次数 $n$ の多項式であり、根 $u_t$ は相異なる。さらに各 $a\in T$ に対して

$$
H_a(Z)=\frac{H(Z)}{Z-u_a}
=\prod_{\substack{t\in T\\t\ne a}}(Z-u_t)
\in\mathcal O_K[Z]
$$

> は次数 $n-1$ の多項式であり、$H_a(u_a)\ne0$ である。ここで $\mathcal O_K$ は $K$ に属する代数的整数全体である。
<!-- formal-statement-end -->

### 証明の見取り図

まず根が代数的整数であるため、積の係数も代数的整数です。次に $G$ が根の集合を置換するため、各係数は有理数になります。**代数的整数かつ有理数**だから通常の整数になる、という二段階です。

<!-- proof-start -->
### 証明

$u_t=Dt$ が代数的整数なので、[代数的整数の和・積の閉性](../TRN1/index.md#thm-trn1-integral-ring)により $H$ の全係数は $\mathcal O_K$ に属します。任意の $\sigma\in G$ に対して $\sigma(D)=D$、$\sigma(u_t)=u_{\sigma(t)}$ であり、

$$
\sigma(H)(Z)
=\prod_{t\in T}(Z-u_{\sigma(t)})
=\prod_{v\in T}(Z-u_v)=H(Z)
$$

です。[有限Galois理論の基本定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)から $K^G=\mathbb Q$ ですから、全係数は $\mathbb Q\cap\mathcal O_K$ に入ります。[有理な代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)により $\mathbb Q\cap\mathcal O_K=\mathbb Z$ となり、$H\in\mathbb Z[Z]$ です。

$D\ne0$ なので $t\ne v$ なら $u_t\ne u_v$ です。指定した一次因子を取り除くと上記の積表示が得られ、各係数は $\mathcal O_K$ に留まります。最後に

$$
H_a(u_a)=\prod_{\substack{t\in T\\t\ne a}}(u_a-u_t)\ne0
$$

です。全ての因子が非零であることを使いました。$\square$
<!-- proof-end -->

### 例：二次体で係数が整数になるまで

$s=\sqrt2$、$T=\{0,s,-s\}$、$K=\mathbb Q(s)$、$D=1$ とします。共役は $s$ と $-s$ を交換します。根は $0,\pm s$ で、いずれも $Z^2-2$ または $Z$ のモニック整数多項式の根だから代数的整数です。展開すると

$$
H(Z)=Z(Z-s)(Z+s)=Z^3-2Z\in\mathbb Z[Z].
$$

$a=s$ を選ぶと $H_s(Z)=Z(Z+s)$ であり、$H_s(s)=s(2s)=4\ne0$ です。一方、$H_s$ 自体の係数 $s$ は通常の整数ではありません。この違いを次節で使います。

## 2. 評価点ごとに一つの零点だけを浅くする

$H(Z)^p$ ではどの根も $p$ 重なので、第 $p-1$ 階までの導関数は全部0です。特別な点 $a$ だけで非零の微分値を残すには、そこに対応する因子を**一個だけ**取り除けばよいはずです。そこで素数 $p\ge2$ と $a\in T$ を選び、次の多項式を使います。

<a id="def-trn13-indexed-auxiliary"></a>

<!-- formal-statement-start -->
> **定義（評価点付き補助多項式と微分和）**  
> [消滅多項式](#lem-trn13-integer-root-polynomial)を固定する。素数 $p\ge2$ と $a\in T$ に対し、

$$
P_{p,a}(Z)
=\frac{H(Z)^p}{Z-u_a}
=(Z-u_a)^{p-1}H_a(Z)^p,
$$

$$
f_{p,a}(z)=\frac{P_{p,a}(Dz)}{(p-1)!},
\qquad
F_{p,a}(z)=\sum_{k=0}^{np-1}f_{p,a}^{(k)}(z)
$$

> と定める。$f_{p,a}$ は次数 $np-1$ の多項式であり、$P_{p,a}\in\mathcal O_K[Z]$、$f_{p,a}\in K[z]$ である。
<!-- formal-statement-end -->

ここで $(Z-u_a)$ は $H(Z)$ の一次因子です。したがって分数表示は**有理関数ではなく多項式**を意味します。分母 $(p-1)!$ は微分値の算術に合わせて置いたもので、$f_{p,a}$ の全係数が代数的整数であるとは主張しません。

<!-- definition-example-start: def-trn13-indexed-auxiliary -->
**定義の確認**

前節の $T=\{0,\pm s\}$、$D=1$、$p=3$ を使います。$n=3$ より $\deg f_{3,a}=3\cdot3-1=8$ です。$a=0$ なら

$$
f_{3,0}(z)=\frac{z^2(z^2-2)^3}{2}.
$$

$a=s$ なら、$H_s(Z)=Z(Z+s)$ を用いて

$$
f_{3,s}(z)=\frac{(z-s)^2z^3(z+s)^3}{2}.
$$

いずれも多項式で、前者は0に2重、$\pm s$ に3重の根を持ち、後者は $s$ に2重、$0$ と $-s$ に3重の根を持ちます。次数はどちらも8です。係数に $1/2$ や $s$ が現れても、後で使う評価点での**導関数**は別に整数性を証明できます。
<!-- definition-example-end -->

<a id="prop-trn13-multiplicities"></a>

<!-- formal-statement-start -->
> **命題（特別点とそれ以外の零点重複度）**  
> $a,t\in T$、素数 $p\ge2$ とする。[評価点付き補助多項式](#def-trn13-indexed-auxiliary)は $z=a$ でちょうど $p-1$ 重、$z=t\ne a$ でちょうど $p$ 重の零点を持つ。そのため

$$
f_{p,a}^{(k)}(t)=0\quad
(t\ne a,\ 0\le k<p),
$$

$$
f_{p,a}^{(k)}(a)=0\quad(0\le k<p-1),
\qquad
f_{p,a}^{(p-1)}(a)=D^{p-1}H_a(u_a)^p.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$Dz-u_t=D(z-t)$ の係数 $D$ が零でないため、変数を $Z=Dz$ に替えても重複度は変わりません。特別点の導関数だけは、残った係数を階乗とともに計算します。

<!-- proof-start -->
### 証明

因子表示を使うと

$$
P_{p,a}(Dz)
=D^{p-1}(z-a)^{p-1}H_a(Dz)^p.
$$

$H_a(u_a)\ne0$ なので $z=a$ での零点の重複度は正確に $p-1$ です。また $t\ne a$ のとき $H_a(Dz)$ に $(Dz-u_t)=D(z-t)$ が一回だけ含まれ、それ以外の因子は $z=t$ で非零です。従って $z=t$ では正確に $p$ 重です。

$(z-a)^{p-1}$ の第 $p-1$ 階導関数は $(p-1)!$ で、これより低い導関数は $z=a$ で消えます。Leibniz則において $z=a$ で残る項は一つだけなので、

$$
\begin{aligned}
f_{p,a}^{(p-1)}(a)
&=\frac{D^{p-1}}{(p-1)!}
\left.\frac{d^{p-1}}{dz^{p-1}}
\bigl((z-a)^{p-1}H_a(Dz)^p\bigr)\right|_{z=a}\\
&=D^{p-1}H_a(Da)^p
=D^{p-1}H_a(u_a)^p.
\end{aligned}
$$

以上によりすべての主張が従います。$\square$
<!-- proof-end -->

## 3. 微分値の整数性と素数合同は別々に示す

[TRN9の階乗可除性補題](../TRN9/index.md#lem-trn9-integral-derivatives)で使った手計算を、ここでは係数が $\mathcal O_K$ に属する多項式へ適用します。$k$ 階導関数の係数には常に $k!$ が現れます。よって $k\ge p$ の場合、その中に $(p-1)!$ を超える因子 $p$ が残ります。

<a id="lem-trn13-derivative-integrality"></a>

<!-- formal-statement-start -->
> **補題（全端点での代数的整数性と合同）**  
> 上の $K,T,D,p,a,f_{p,a},F_{p,a}$ について、任意の $t\in T$ で $F_{p,a}(t)\in\mathcal O_K$ であり、

$$
F_{p,a}(t)\equiv0\pmod{p\mathcal O_K}
\quad(t\ne a),
$$

$$
F_{p,a}(a)
\equiv D^{p-1}H_a(u_a)^p
\pmod{p\mathcal O_K}
$$

> が成り立つ。$p\mathcal O_K=\{p\eta:\eta\in\mathcal O_K\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

低階導関数は重複零点で消え、高階導関数は階乗比で $p$ の倍数になります。特別点の第 $p-1$ 階微分だけを残します。ここでの合同は通常の整数の合同ではなく、**代数的整数環の中**の合同です。

<!-- proof-start -->
### 証明

$P_{p,a}(Z)=\sum_{\ell=0}^{np-1}b_\ell Z^\ell$ と書けば、$b_\ell\in\mathcal O_K$ です。整数 $k\ge0$ に対し、

$$
\frac{P_{p,a}^{(k)}(u_t)}{k!}
=\sum_{\ell=k}^{np-1}b_\ell\binom{\ell}{k}u_t^{\ell-k}
\in\mathcal O_K
$$

となります。$k>np-1$ の場合は両辺を0と解釈します。$u_t$ が代数的整数で、二項係数は整数だからです。$Z=Dz$ による微分を $k$ 回行うと

$$
f_{p,a}^{(k)}(t)
=\frac{D^kP_{p,a}^{(k)}(u_t)}{(p-1)!}
=\frac{k!}{(p-1)!}D^k
\frac{P_{p,a}^{(k)}(u_t)}{k!}
$$

です。$k\ge p-1$ のとき $k!/(p-1)!$ は整数、$k\ge p$ なら $p$ の倍数です。$k<p-1$ のときは[重複度の命題](#prop-trn13-multiplicities)から全 $t$ で導関数が0です。したがってすべての微分値は代数的整数で、$k\ge p$ では $p\mathcal O_K$ に入ります。

$t\ne a$ では $k<p$ の微分値も0なので $F_{p,a}(t)\in p\mathcal O_K$ です。$t=a$ では $k=p-1$ の一項以外が0または $p\mathcal O_K$ に入り、[特別導関数の公式](#prop-trn13-multiplicities)を代入して二つ目の合同を得ます。$\square$
<!-- proof-end -->

### 例：数値で特別項の符号を確かめる

$T=\{0,1/2\}$、$D=2$ なら $u_0=0$、$u_{1/2}=1$、$H(Z)=Z(Z-1)$ です。$p=3$ では

$$
f_{3,0}(z)=\frac{(2z)^2(2z-1)^3}{2},\qquad
f_{3,1/2}(z)=\frac{(2z-1)^2(2z)^3}{2}.
$$

前者の特別微分値は $2^2(0-1)^3=-4$、後者は $2^2(1-0)^3=4$ です。他方の点ではいずれも3重零点だから0,1,2階微分が消えます。高階微分には $k!/2!$ が現れ、$k\ge3$ なら3で割り切れます。よって

$$
F_{3,0}(0)\equiv-4\equiv2\pmod3,\qquad
F_{3,1/2}(1/2)\equiv4\equiv1\pmod3
$$

です。特別点を変えると符号も変わり得ます。**最初から特別微分値を正の数だと仮定してはいけません。**

## 4. 重み付き和を共役ノルムで通常の整数にする

元の指数関係の重み $c_t$ を使い、まず代数的整数の和

$$
A_{p,a}=\sum_{t\in T}c_tF_{p,a}(t)\in\mathcal O_K
$$

を作ります。一般の $a$ では $f_{p,a}$ の係数が有理数でないため、$A_{p,a}$ がただちに通常の整数とは限りません。ここで[TRN2のノルムと共役積](../TRN2/index.md#thm-trn2-integral-trace-norm)を使います。

$a$ を固定して $\Delta_a=H_a(u_a)=\prod_{t\ne a}(u_a-u_t)$ と置けば、$\Delta_a\in\mathcal O_K\setminus\{0\}$ です。$K/\mathbb Q$ のノルム $N_{K/\mathbb Q}(\Delta_a)$ は非零整数となります。

<a id="thm-trn13-arithmetic-norm"></a>

<!-- formal-statement-start -->
> **定理（共役ノルムによる非零整数）**  
> 第1節の有限Galois拡大 $K/\mathbb Q$、相異なる指数集合 $T\subset K$、Galois不変な整数係数 $(c_t)$、共通分母 $D$ を固定する。$a\in T$ に対し

$$
E_a=c_aD\,N_{K/\mathbb Q}(\Delta_a)
\in\mathbb Z\setminus\{0\}
$$

> とおく。$E_a$ を割らない素数 $p\ge2$ に対し、$A_{p,a}\in\mathcal O_K\setminus\{0\}$ であり、

$$
B_{p,a}:=N_{K/\mathbb Q}(A_{p,a})
=\prod_{\sigma\in G}\sigma(A_{p,a})
\in\mathbb Z\setminus\{0\},
\qquad |B_{p,a}|\ge1.
$$

> 特に除外すべき素数は、$p$ に依存しない非零整数 $E_a$ の素因子だけである。
<!-- formal-statement-end -->

### 証明の見取り図

一つ目の非零性は $A_{p,a}$ の合同により確認します。もし $A_{p,a}=0$ なら特別項が $p\mathcal O_K$ に入り、そのノルムが $p$ の倍数になります。ところがノルムを展開すれば、除外した素数ではそうならないことが分かります。次に非零な $A_{p,a}$ の共役をすべて掛けます。

<!-- proof-start -->
### 証明

[全端点の合同](#lem-trn13-derivative-integrality)を $c_t$ 倍して足すと

$$
A_{p,a}
\equiv c_aD^{p-1}\Delta_a^p
\pmod{p\mathcal O_K}.
$$

右辺の代表を $S_{p,a}=c_aD^{p-1}\Delta_a^p$ とします。これも代数的整数です。$d=[K:\mathbb Q]=|G|$ とすると、[ノルムの乗法性](../TRN2/index.md#thm-trn2-conjugate-formula)から

$$
N_{K/\mathbb Q}(S_{p,a})
=c_a^dD^{(p-1)d}
N_{K/\mathbb Q}(\Delta_a)^p
\in\mathbb Z\setminus\{0\}.
$$

$p\nmid E_a$ なら $p$ はこの整数を割りません（$p\ge2$ なので $p-1\ge1$）。もし $A_{p,a}=0$ なら合同から $S_{p,a}=p\eta$ となる $\eta\in\mathcal O_K$ が存在します。このとき

$$
N_{K/\mathbb Q}(S_{p,a})
=N_{K/\mathbb Q}(p)\,N_{K/\mathbb Q}(\eta)
=p^dN_{K/\mathbb Q}(\eta)\in p\mathbb Z,
$$

となり矛盾します。したがって $A_{p,a}\ne0$ です。

$A_{p,a}\in\mathcal O_K$ であり、[代数的整数の共役とノルム](../TRN2/index.md#thm-trn2-integral-trace-norm)により $B_{p,a}$ は整数です。さらに $A_{p,a}\ne0$ なので各 $\sigma(A_{p,a})\ne0$、有限積 $B_{p,a}\ne0$ です。非零整数の絶対値は1以上です。$\square$
<!-- proof-end -->

ここでは $A_{p,a}$ のノルムを使いました。**指数関数値 $e^t$ にGalois自己同型を作用させたわけではありません。** 評価した複素指数和と、代数的整数を共役で掛ける操作は別です。

### 共役を取ると添字がどう動くか

$\sigma\in G$ は $u_t$ の集合を置換するので、$\sigma(H)=H$、$\sigma(H_a)=H_{\sigma(a)}$ です。したがって

$$
\sigma(P_{p,a})=P_{p,\sigma(a)},\qquad
\sigma(F_{p,a}(t))=F_{p,\sigma(a)}(\sigma(t)).
$$

ここで $D\in\mathbb Z$ を固定することを使っています。重みは $c_{\sigma(t)}=c_t$ なので

$$
\begin{aligned}
\sigma(A_{p,a})
&=\sum_{t\in T}c_tF_{p,\sigma(a)}(\sigma(t))\\
&=\sum_{v\in T}c_{\sigma^{-1}(v)}F_{p,\sigma(a)}(v)
=A_{p,\sigma(a)}.
\end{aligned}
$$

この式により、ノルムの各因子を**同じ形の別の評価点付き微分和**として解析的に評価できます。特に $a=0$ はすべての $\sigma$ に固定されるため、$A_{p,0}$ 自身がGalois不変な代数的整数、従って通常の整数です。この $a=0$ の選択は[TRN9の非零整数の構成](../TRN9/index.md#thm-trn9-arithmetic-nonzero)と一致します。

## 5. 複素線分積分から全添字に共通する上界を作る

今度は算術的な非零性とは独立に、同じ $A_{p,a}$ の絶対値を評価します。[TRN4の複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)は、$f_{p,a}$ の係数が $K$ に属していても適用できます。$f_{p,a}$ は複素多項式だからです。

<a id="prop-trn13-integral-identity"></a>

<!-- formal-statement-start -->
> **命題（全特別点に対する積分恒等式）**  
> 第1節の指数関係 $\sum_{t\in T}c_te^t=0$ を仮定する。任意の $p\ge2$ と $a\in T$ について、

$$
A_{p,a}
=-\sum_{t\in T}c_t
\int_0^t e^{t-z}f_{p,a}(z)\,dz
$$

> が成り立つ。積分路は $0$ から複素数 $t$ への向き付き線分である。
<!-- formal-statement-end -->

### 証明の見取り図

[微分和の積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)を $f=f_{p,a}$、始点0、終点 $t$ として用います。共通の値 $F_{p,a}(0)$ に掛かる係数だけが元の指数関係で消えます。

<!-- proof-start -->
### 証明

$f_{p,a}$ の次数は $np-1$ だから、その全導関数和はちょうど $F_{p,a}$ です。[TRN4の恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)より

$$
e^tF_{p,a}(0)-F_{p,a}(t)
=\int_0^t e^{t-z}f_{p,a}(z)\,dz.
$$

両辺を $c_t$ 倍して $t\in T$ について足すと

$$
\begin{aligned}
\sum_{t\in T}c_t\int_0^t e^{t-z}f_{p,a}(z)\,dz
&=F_{p,a}(0)\sum_{t\in T}c_te^t
-\sum_{t\in T}c_tF_{p,a}(t)\\
&=0-A_{p,a}.
\end{aligned}
$$

最後の0は第1節で**仮定した**指数関係によります。$\square$
<!-- proof-end -->

上界の定数を曖昧にしないため、$R=\max_{t\in T}|t|>0$ とおきます。$D$ は正整数なので

$$
M=\max\{1,2DR\},\qquad B=M^n\ge1,
$$

$$
C=\sum_{t\in T}|c_t|\,|t|\,
e^{\max(0,\operatorname{Re}t)}>0
$$

を固定します。$n,R,D,(c_t)$ は $p$ より前に固定したため、$B,C$ は **$p$ と特別点 $a$ の両方に依存しません**。

<a id="thm-trn13-uniform-error"></a>

<!-- formal-statement-start -->
> **定理（微分和と共役ノルムの一様誤差上界）**  
> 第1節の有限指数関係を仮定する。上の $B,C$ を用いると、全 $a\in T$、素数 $p\ge2$ に対し

$$
|A_{p,a}|\le C\frac{B^p}{(p-1)!}
$$

> が成立する。さらに $d=[K:\mathbb Q]$ とおけば、[共役ノルム](#thm-trn13-arithmetic-norm)について

$$
|B_{p,a}|
\le\left(C\frac{B^p}{(p-1)!}\right)^d.
$$

> 右辺は $p\to\infty$ で0へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

$z=st$（$0\le s\le1$）の上では、$Dz$ と全根 $u_v$ の距離を同じ $2DR$ で押さえます。$(Z-u_a)$ を一つ除いた後も因子の個数は $np-1$ 個のままなので、全てを $M$ で押さえれば $M^{np}$ に収まります。共役は特別点だけを置換し、同じ上界を満たします。

<!-- proof-start -->
### 証明

$a,t,v\in T$ と $s\in[0,1]$ を任意に取ります。$z=st$ なら

$$
|Dz-u_v|=D|st-v|
\le D(s|t|+|v|)\le2DR\le M.
$$

$P_{p,a}(Dz)$ は、$v=a$ の因子が $p-1$ 個、それ以外の $n-1$ 個の根それぞれの因子が $p$ 個ある積です。よって

$$
\begin{aligned}
|f_{p,a}(st)|
&=\frac{|Dst-u_a|^{p-1}
\prod_{v\ne a}|Dst-u_v|^p}{(p-1)!}\\
&\le\frac{M^{(p-1)+p(n-1)}}{(p-1)!}
=\frac{M^{np-1}}{(p-1)!}\\
&\le\frac{B^p}{(p-1)!}.
\end{aligned}
$$

最後は $M\ge1$、$B=M^n$ を使いました。[複素線積分のパラメータ表示](../../../解析系/CA/CA2/index.md#def-ca2-line-integral)により

$$
\int_0^t e^{t-z}f_{p,a}(z)\,dz
=t\int_0^1 e^{(1-s)t}f_{p,a}(st)\,ds.
$$

ここで $|e^{(1-s)t}|=e^{(1-s)\operatorname{Re}t}
\le e^{\max(0,\operatorname{Re}t)}$ です。従って

$$
\left|\int_0^t e^{t-z}f_{p,a}(z)\,dz\right|
\le |t|e^{\max(0,\operatorname{Re}t)}
\frac{B^p}{(p-1)!}.
$$

$t=0$ の積分は線分長が0なので0です。[積分恒等式](#prop-trn13-integral-identity)に代入し、全 $t$ について三角不等式を用いると、第一の上界が従います。

さらに前節で確かめた $\sigma(A_{p,a})=A_{p,\sigma(a)}$ を用いると、

$$
|B_{p,a}|=\prod_{\sigma\in G}|A_{p,\sigma(a)}|
\le\left(C\frac{B^p}{(p-1)!}\right)^d
$$

です。各共役の評価に同じ $B,C$ が使える点が重要です。

最後に $v_p=B^p/(p-1)!$ とおくと

$$
\frac{v_{p+1}}{v_p}=\frac Bp.
$$

$B$ は固定値なので、整数 $p\ge2B$ では $v_{p+1}\le v_p/2$ です。よって $v_p\to0$、従って $C^dv_p^d\to0$ です。素数のみを取った部分列でも同じ極限となります。$\square$
<!-- proof-end -->

## 6. 非零整数と小さな誤差を接続する

[算術ノルム定理](#thm-trn13-arithmetic-norm)と[誤差上界定理](#thm-trn13-uniform-error)を合わせれば、各 $a\in T$ と $p\nmid E_a$ について

$$
1\le |B_{p,a}|
\le\left(C\frac{B^p}{(p-1)!}\right)^d.
$$

除外される素数は有限個ですが、右辺は素数 $p\to\infty$ に沿って0になります。従って、最初に仮定した対称な指数関係は持続できません。これは**有理係数版の矛盾の算術的・解析的な核心**です。

TRN14では、[TRN12の有理係数関係からの対称化](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)から上の仮定を導く部分まで戻って、Lindemann–Weierstrassの有理係数版として定理を確定します。その後、代数的独立性と係数体ノルムを使って代数的係数版へ進みます。**有理係数での一次独立性から代数的係数での一次独立性を直接推論しない**ことが次章のもう一つの焦点です。

## 7. 演習

### Level A：多項式と重複度を手で確認する

**TRN13-A1（消滅多項式と因子除去）**  
$s=\sqrt2$、$T=\{0,s,-s\}$、$D=1$ とする。$H(Z)$、$H_0(Z)$、$H_s(Z)$ を求め、それぞれの次数と $H_s(s)$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$$
H(Z)=Z(Z-s)(Z+s)=Z(Z^2-2)=Z^3-2Z
$$

です。従って $H_0(Z)=Z^2-2$、$H_s(Z)=Z(Z+s)$ となります。次数はそれぞれ3,2,2で、$H_s(s)=s(s+s)=2s^2=4\ne0$ です。$s$ と $-s$ は異なるため、取り除いた以外の一次因子が $Z=s$ で消えることはありません。
<!-- solution-end -->

**TRN13-A2（特別な第2階微分）**  
A1と同じ $T,D$ で $a=s$、$p=3$ とする。$f_{3,s}$ を展開せずに因子形で書き、$f_{3,s}^{(2)}(s)$ と $f_{3,s}^{(k)}(0)$（$0\le k\le2$）を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$$
f_{3,s}(z)=\frac{(z-s)^2z^3(z+s)^3}{2}.
$$

$z=s$ では $(z-s)^2$ の二階微分だけが残ります。他の因子の値は $s^3(2s)^3/2=4s^6=4\cdot8=32$ なので

$$
f_{3,s}^{(2)}(s)=2!\cdot32=64.
$$

別法として $\Delta_s=s(s-(-s))=s(2s)=4$ より $\Delta_s^3=64$ です。$z=0$ では $z^3$ が因子なので0,1,2階導関数はすべて0です。
<!-- solution-end -->

**TRN13-A3（有理な二点の符号）**  
$T=\{0,1/2\}$、$D=2$、$p=3$ とする。$H$ と二つの補助多項式を求め、各特別点における第2階微分を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$u_0=0$、$u_{1/2}=1$ だから $H(Z)=Z(Z-1)$ です。よって

$$
f_{3,0}(z)=\frac{(2z)^2(2z-1)^3}{2},\qquad
f_{3,1/2}(z)=\frac{(2z-1)^2(2z)^3}{2}.
$$

$a=0$ では $\Delta_0=0-1=-1$、$a=1/2$ では $\Delta_{1/2}=1-0=1$ なので、[特別微分公式](#prop-trn13-multiplicities)より

$$
f_{3,0}^{(2)}(0)=2^2(-1)^3=-4,\qquad
f_{3,1/2}^{(2)}(1/2)=2^2(1)^3=4.
$$

両値とも $3$ で割り切れませんが、符号は異なります。
<!-- solution-end -->

**TRN13-A4（複素線分を実区間に戻す）**  
$t=-1+i$ とし、多項式 $f$ に対する $\int_0^t e^{t-z}f(z)\,dz$ を $[0,1]$ 上の積分で表せ。$|e^{t-z}|$ の一様上界と線分長を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$z=st$（$0\le s\le1$）と置くと、$dz=t\,ds$、$t-z=(1-s)t$ なので

$$
\int_0^t e^{t-z}f(z)\,dz
=t\int_0^1e^{(1-s)t}f(st)\,ds.
$$

$\operatorname{Re}t=-1$ より $|e^{(1-s)t}|=e^{-(1-s)}\le1$、線分長は $|t|=\sqrt{(-1)^2+1^2}=\sqrt2$ です。$e^{-1}$ は $s=1$ での値1を押さえないため、上界として誤りです。
<!-- solution-end -->

### Level B：合同・共役・積分を接続する

**TRN13-B1（高階微分の $p$ 可除性）**  
$P(Z)\in\mathcal O_K[Z]$、$u\in\mathcal O_K$、$D\in\mathbb Z_{>0}$ とし、$f(z)=P(Dz)/(p-1)!$ とする。$k\ge p$ のとき $f^{(k)}(u/D)\in p\mathcal O_K$ を示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

$P(Z)=\sum_{\ell}b_\ell Z^\ell$ と書けば

$$
P^{(k)}(u)/k!=\sum_{\ell\ge k}b_\ell\binom{\ell}{k}u^{\ell-k}
\in\mathcal O_K
$$

です。連鎖律から

$$
f^{(k)}(u/D)
=\frac{k!}{(p-1)!}D^k\frac{P^{(k)}(u)}{k!}.
$$

$k\ge p$ なら $k!/(p-1)!=p(p+1)\cdots k$ は $p$ の整数倍です。残りは代数的整数なので全体は $p\mathcal O_K$ に属します。$k$ が次数を超えるときは導関数が0で、同じ結論が成り立ちます。
<!-- solution-end -->

**TRN13-B2（共役が特別点を移す）**  
$T=\{0,\pm\sqrt2\}$、$D=1$、$c_0=2$、$c_{\pm\sqrt2}=-1$ とする。非自明な共役 $\sigma(\sqrt2)=-\sqrt2$ について $\sigma(f_{p,\sqrt2})$ と $\sigma(A_{p,\sqrt2})$ を表せ。指数関係の成立は仮定しなくてよい。

- Level: B

<!-- solution-start -->
**詳細解答**

$s=\sqrt2$ とおきます。$\sigma$ は $H(Z)=Z(Z^2-2)$ を固定し、$(Z-s)$ を $(Z+s)$ に移すので

$$
\sigma(P_{p,s})(Z)
=\frac{H(Z)^p}{Z+s}=P_{p,-s}(Z).
$$

従って $\sigma(f_{p,s})=f_{p,-s}$ です。評価点の共役も忘れずに取ると

$$
\begin{aligned}
\sigma(A_{p,s})
&=\sum_{t\in T}c_tF_{p,-s}(\sigma(t))\\
&=\sum_{v\in T}c_{\sigma^{-1}(v)}F_{p,-s}(v)
=A_{p,-s}.
\end{aligned}
$$

$c_s=c_{-s}=-1$ を使いました。ここでは指数関数値の共役は一度も用いていません。
<!-- solution-end -->

**TRN13-B3（積分恒等式の仮定を検査する）**  
任意の有限 $T$ と重み $c_t$ に対し $f(z)=1$、$F(z)=1$ とする。$I_t=\int_0^t e^{t-z}\,dz$ と $A=\sum c_tF(t)$ を計算し、$A=-\sum c_tI_t$ が成立する条件を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答**

微分和は $F=1$ です。原始関数 $-e^{t-z}$ の端点差を取ると

$$
I_t=[-e^{t-z}]_{z=0}^{z=t}=e^t-1.
$$

また $A=\sum_{t\in T}c_t$ なので

$$
-\sum_{t\in T}c_tI_t
=-\sum_{t\in T}c_te^t+\sum_{t\in T}c_t.
$$

従って $A=-\sum c_tI_t$ が成立するための必要十分条件は $\sum c_te^t=0$ です。指数関係を使わないまま積分誤差だけが残るとするのは誤りです。
<!-- solution-end -->

**TRN13-B4（固定定数と階乗）**  
有限集合 $T$、$D$、重み $c_t$ が固定されているとする。第5節の $M,B,C$ が $p,a$ に依存しない理由を述べ、$C B^p/(p-1)!\to0$ を比の計算で示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

$R=\max|t|$ は固定有限集合 $T$ で取った最大値なので $p,a$ に依存しません。従って $M=\max(1,2DR)$、$B=M^{|T|}$ は同様に固定です。$C=\sum |c_t||t|e^{\max(0,\operatorname{Re}t)}$ も固定された有限和であり、$p,a$ は含まれません。

$v_n=B^n/(n-1)!$ とおくと $v_{n+1}/v_n=B/n$ です。$n\ge\max(2,\lceil2B\rceil)$ なら $v_{n+1}\le v_n/2$ なので、その整数を $n_0$ とすれば $v_{n_0+k}\le 2^{-k}v_{n_0}\to0$ です。$C$ は固定正数ゆえ $Cv_n\to0$ です。
<!-- solution-end -->

### Level C：全体の組立てを再現する

**TRN13-C1（二次体で特別点0を追う）**  
$K=\mathbb Q(\sqrt2)$、$T=\{0,\pm\sqrt2\}$、$c_0=2$、$c_{\pm\sqrt2}=-1$ とする。この重みが指数関係を満たすと**仮定**し、$a=0,D=1$ に対して $H,\Delta_0,E_0$、合同の特別項、除外素数を計算せよ。また $B,C$ の一つの具体的選択を示し、非零整数と積分上界がどのように衝突するか説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

$s=\sqrt2$ とおくと $H(Z)=Z(Z^2-2)$、$H_0(Z)=Z^2-2$ であり、

$$
\Delta_0=H_0(0)=-2,\qquad
N_{K/\mathbb Q}(\Delta_0)=(-2)^2=4,
\qquad E_0=c_0DN(\Delta_0)=8.
$$

従って $p$ が奇素数なら $p\nmid E_0$ です。[微分和の合同](#lem-trn13-derivative-integrality)により

$$
A_{p,0}\equiv2(-2)^p\pmod{p\mathcal O_K}.
$$

ここでは $a=0$ がGalois作用で固定されるため、$A_{p,0}$ は通常の整数です。右辺は奇素数で0にならず、$A_{p,0}\ne0$、ゆえに $|A_{p,0}|\ge1$ です。

$R=\sqrt2$、$D=1$、$n=3$ から $M=2\sqrt2$、$B=M^3=16\sqrt2$ とできます。$t=0$ の項は $C$ に寄与しません。$t=s$ の寄与は $\sqrt2e^{\sqrt2}$、$t=-s$ の寄与は $\sqrt2$ ですから

$$
C=\sqrt2(e^{\sqrt2}+1).
$$

仮定した指数関係があれば、[積分恒等式](#prop-trn13-integral-identity)と[上界](#thm-trn13-uniform-error)から

$$
1\le|A_{p,0}|
\le \sqrt2(e^{\sqrt2}+1)
\frac{(16\sqrt2)^p}{(p-1)!}
$$

がすべての奇素数 $p$ で成立します。右辺は $p\to\infty$ で0へ収束するので、大きな奇素数で矛盾します。この重みの関係式を**実在する関係として仮定せず**、仮定法で矛盾までを追いました。
<!-- solution-end -->

**TRN13-C2（任意の特別点でのノルム法）**  
第1節の仮定を満たす有限集合 $T$ と重みを固定し、$a\in T$ を任意に選ぶ。$\Delta_a\ne0$、$A_{p,a}\ne0$ を示すために除外する素数を一つの固定整数で記述せよ。その後、全共役に対する誤差評価を組み立て、$|N_{K/\mathbb Q}(A_{p,a})|\ge1$ と衝突することを示せ。

- Level: C

<!-- solution-start -->
**詳細解答**

$T$ の点は相異なり $D\ne0$ なので

$$
\Delta_a=\prod_{t\ne a}D(a-t)\ne0
$$

です。各差は代数的整数であり、$\Delta_a\in\mathcal O_K$ です。従って [TRN2のノルム](../TRN2/index.md#thm-trn2-integral-trace-norm)から $N(\Delta_a)\in\mathbb Z\setminus\{0\}$ です。固定整数 $E_a=c_aD N(\Delta_a)$ を割る素数を除外します。

このとき合同

$$
A_{p,a}\equiv c_aD^{p-1}\Delta_a^p
\pmod{p\mathcal O_K}
$$

が成り立ちます。もし $A_{p,a}=0$ なら右辺は $p\mathcal O_K$ に属し、ノルムを取ると $p$ が $c_a^dD^{(p-1)d}N(\Delta_a)^p$ を割るはずです。しかし $p\nmid E_a$ なので不可能です。よって $A_{p,a}\ne0$ で、そのノルムは非零整数です。

Galois作用の直接計算から $\sigma(A_{p,a})=A_{p,\sigma(a)}$ です。共通定数 $B,C$ を第5節のように固定すれば、各 $\sigma(a)\in T$ に

$$
|A_{p,\sigma(a)}|\le C\frac{B^p}{(p-1)!}
$$

が適用できます。従って

$$
1\le|N(A_{p,a})|
=\prod_{\sigma\in G}|A_{p,\sigma(a)}|
\le\left(C\frac{B^p}{(p-1)!}\right)^d.
$$

$E_a$ の素因子は有限個で、素数は無限に存在します。そのため $p\nmid E_a$ の素数を際限なく大きくでき、右辺は0へ収束します。ある十分大きな素数で右辺が1未満となり、矛盾です。非零整数を作ったのは $A_{p,a}$ **そのものではなくそのノルム**である点が一般の $a$ での要点です。
<!-- solution-end -->

## 8. 次章へ

ここで作ったものは三種類あります。$P_{p,a}$ は代数的整数係数の**多項式**、$A_{p,a}$ は代数的整数、$B_{p,a}$ は通常の整数です。これらを同一視せず、微分の合同・共役ノルム・複素積分を順に組み合わせました。

次章では対称化前の有理係数関係からこれらの構成へ至る量化を閉じ、さらに有理係数版だけでは届かない代数的係数版へ進みます。
