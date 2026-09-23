# RNG1 抽象代数 V：環・イデアル・商環

<!-- definition-example-audit: strict -->

[GRP2](../GRP2/index.md) では、群準同型の核が正規部分群になり、正規部分群によって商群を作れることを学びました。本章では同じ構図を、加法と乗法の二つを持つ代数系へ移します。

中心となる問いは、

$$
\text{加法の剰余類 }a+I
\text{ に、どうすれば積まで入れられるか}
$$

です。

答えは **イデアル** です。加法部分群であるだけでは足りず、環の任意の元を掛けても内部に留まるという吸収性が、商環の積を代表元によらず定めます。

主線は

$$
\text{環}
\longrightarrow
\text{環準同型}
\longrightarrow
\text{核とイデアル}
\longrightarrow
\text{商環}
\longrightarrow
\text{第一同型定理}
$$

です。

> **この章の停止線**
>
> 環・部分環・零因子・整域・体、環準同型、イデアル、主イデアル、商環、第一同型定理までを扱います。素イデアル・極大イデアル・中国剰余定理は RNG2、Euclid 整域・単項イデアル整域・一意分解整域は RNG3、多項式環の本格的な構造論は RNG4 へ送ります。

---

## 1. 加法と乗法を同時に扱う

群では一つの演算だけを考えました。環では、加法と乗法の二つを同時に扱います。

<a id="def-rng1-ring"></a>
<!-- formal-statement-start -->
> **定義（環・可換環・単位元を持つ環）**
>
> 集合 $R$ に加法 $+$ と乗法 $\cdot$ があり、次を満たすとき $R$ を **環** という。
>
> 1. $(R,+)$ は可換群である。
> 2. 乗法は結合的である。
>
> $$
> (ab)c=a(bc)
> $$
>
> 3. 左右の分配法則が成り立つ。
>
> $$
> a(b+c)=ab+ac,
> \qquad
> (a+b)c=ac+bc.
> $$
>
> さらに $ab=ba$ が全ての $a,b\in R$ で成り立つとき **可換環** という。
>
> ある $1_R\in R$ が存在して
>
> $$
> 1_Ra=a1_R=a
> $$
>
> が全ての $a\in R$ で成り立つとき **単位元を持つ環** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-ring -->
**定義の確認**

整数全体 $\mathbb Z$ は通常の加法・乗法で可換環です。加法については可換群であり、整数の積は結合的で、分配法則が成り立ちます。また

$$
1\cdot a=a\cdot1=a
$$

なので単位元を持ちます。

一方、実数係数 $2\times2$ 行列全体

$$
M_2(\mathbb R)
$$

も環ですが、一般には可換ではありません。例えば

$$
A=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
$$

とすると

$$
AB=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
BA=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

従って

$$
AB\ne BA.
$$

つまり「環だから積が可換」とは限りません。
<!-- definition-example-end -->

本系列では、環そのものには単位元の存在を仮定しません。単位元が必要な結果では、その仮定を明記します。また環準同型も、特に断らない限り加法と乗法を保つことだけを要求し、単位元を保つことは別条件とします。

---

## 2. 部分環は二つの演算で閉じる

環の中に同じ演算で環を作る部分集合を考えます。

<a id="def-rng1-subring"></a>
<!-- formal-statement-start -->
> **定義（部分環）**
>
> 環 $R$ の部分集合 $S\subset R$ が、$R$ から受け継いだ加法と乗法で環になるとき、$S$ を $R$ の **部分環** という。
<!-- formal-statement-end -->

<a id="prop-rng1-subring-test"></a>
<!-- formal-statement-start -->
> **命題（部分環判定）**
>
> 環 $R$ の空でない部分集合 $S$ について、任意の $a,b\in S$ に対し
>
> $$
> a-b\in S,
> \qquad
> ab\in S
> $$
>
> が成り立つなら、$S$ は $R$ の部分環である。
<!-- formal-statement-end -->

### なぜこの二条件で足りるか

加法については [部分群判定](../GRP1/index.md#thm-grp1-subgroup-test)を使えます。$a-b\in S$ により $(S,+)$ が $(R,+)$ の部分群になります。

乗法の結合則と分配法則は $R$ で成り立つ等式を $S$ に制限しただけなので、そのまま継承されます。残るのは積で閉じることだけで、それが $ab\in S$ です。

<!-- proof-start -->
### 証明

$S$ は空でなく、任意の $a,b\in S$ について $a-b\in S$ です。

$(R,+)$ は可換群なので、群の部分群判定から $(S,+)$ は $(R,+)$ の部分群です。従って $0\in S$ であり、加法・加法逆元でも閉じています。

さらに仮定から

$$
a,b\in S
\Longrightarrow
ab\in S.
$$

乗法の結合則と左右分配法則は $R$ で成立しているので、$S$ の元に制限しても成立します。

よって $S$ は環です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-rng1-subring -->
**定義の確認**

偶数全体

$$
2\mathbb Z
=
\{2k:k\in\mathbb Z\}
$$

は $\mathbb Z$ の部分環です。

実際

$$
2a-2b=2(a-b)\in2\mathbb Z
$$

かつ

$$
(2a)(2b)=2(2ab)\in2\mathbb Z.
$$

ただし $1\notin2\mathbb Z$ です。この章の規約では、親の環が単位元を持っていても、部分環が同じ単位元を含むことは要求しません。
<!-- definition-example-end -->

---

## 3. 零因子・整域・体

乗法について、整数のように「非零元どうしを掛けたら零にはならない」環もあれば、そうでない環もあります。

<a id="def-rng1-zero-divisor-domain-field"></a>
<!-- formal-statement-start -->
> **定義（零因子・整域・体）**
>
> $R$ を可換環とする。$a\ne0$ で、ある $b\ne0$ が存在して
>
> $$
> ab=0
> $$
>
> となるとき、$a$ を **零因子** という。
>
> $R$ が可換で単位元 $1_R\ne0$ を持ち、零因子を持たないとき、$R$ を **整域** という。
>
> $R$ が可換で単位元 $1_R\ne0$ を持ち、任意の $a\ne0$ に対してある $a^{-1}\in R$ が存在し
>
> $$
> aa^{-1}=1_R
> $$
>
> となるとき、$R$ を **体** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-zero-divisor-domain-field -->
**定義の確認**

$\mathbb Z$ は整域ですが体ではありません。例えば $2\ne0$ に対し

$$
2b=1
$$

を満たす整数 $b$ は存在しません。

一方 $\mathbb Q$ は体です。$a\in\mathbb Q$, $a\ne0$ なら

$$
a^{-1}=\frac1a\in\mathbb Q
$$

です。

さらに

$$
\mathbb Z/6\mathbb Z
$$

では

$$
\overline2\ne\overline0,
\qquad
\overline3\ne\overline0
$$

ですが

$$
\overline2\,\overline3
=
\overline6
=
\overline0.
$$

従って $\overline2,\overline3$ は零因子であり、$\mathbb Z/6\mathbb Z$ は整域ではありません。
<!-- definition-example-end -->

<a id="prop-rng1-field-domain"></a>
<!-- formal-statement-start -->
> **命題（体は整域）**
>
> 任意の体は整域である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

体 $F$ で

$$
ab=0
$$

とし、$a\ne0$ とします。

体の定義から $a^{-1}$ が存在します。両辺に $a^{-1}$ を掛けると

$$
a^{-1}(ab)
=
(a^{-1}a)b
=
b
$$

であり、

$$
a^{-1}0=0
$$

なので

$$
b=0.
$$

従って非零元どうしの積が零になることはなく、零因子は存在しません。よって $F$ は整域です。$\square$
<!-- proof-end -->

この証明で効いているのは、非零元の逆元を掛けて積を消去できることです。RNG2 では、商環が整域や体になる条件をイデアル側から特徴付けます。

---

## 4. 環準同型は二つの演算を同時に保つ

<a id="def-rng1-ring-homomorphism"></a>
<!-- formal-statement-start -->
> **定義（環準同型）**
>
> 環 $R,S$ の間の写像
>
> $$
> f:R\to S
> $$
>
> が任意の $a,b\in R$ に対して
>
> $$
> f(a+b)=f(a)+f(b)
> $$
>
> および
>
> $$
> f(ab)=f(a)f(b)
> $$
>
> を満たすとき、$f$ を **環準同型** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-ring-homomorphism -->
**定義の確認**

正整数 $n$ に対して

$$
\pi_n:\mathbb Z\to\mathbb Z/n\mathbb Z,
\qquad
\pi_n(a)=\overline a
$$

と置きます。

剰余類の加法・乗法から

$$
\pi_n(a+b)
=
\overline{a+b}
=
\overline a+\overline b
$$

かつ

$$
\pi_n(ab)
=
\overline{ab}
=
\overline a\,\overline b.
$$

従って $\pi_n$ は環準同型です。
<!-- definition-example-end -->

環準同型は加法について群準同型なので、GRP2 の核・像の議論をかなり再利用できます。ただし核が「正規部分群」で終わらず、乗法に対してさらに強い閉性を持つことが重要です。

<a id="def-rng1-ring-kernel-image"></a>
<!-- formal-statement-start -->
> **定義（環準同型の核・像）**
>
> 環準同型 $f:R\to S$ に対し
>
> $$
> \ker f
> =
> \{r\in R:f(r)=0_S\}
> $$
>
> を **環準同型の核**、
>
> $$
> \operatorname{Im}f
> =
> \{f(r):r\in R\}
> $$
>
> を **環準同型の像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-ring-kernel-image -->
**定義の確認**

標準射影

$
\pi_n:\mathbb Z\to\mathbb Z/n\mathbb Z
$

では

$
\ker\pi_n=n\mathbb Z,
\qquad
\operatorname{Im}\pi_n=\mathbb Z/n\mathbb Z.
$

例えば $n=6$ なら、$12$ は $\overline{12}=\overline0$ なので核に入り、$5$ は $\overline5\ne\overline0$ なので核に入りません。
<!-- definition-example-end -->

ここで $0_S$ は $S$ の加法単位元です。

---

## 5. イデアルは「外から掛けても戻る」部分集合

商群では、積を代表元によらず定めるために正規部分群が必要でした。環では加法群が可換なので、加法についての正規性は自動的です。

しかし商環では、さらに乗法が必要です。そのための条件がイデアルです。

<a id="def-rng1-ideal"></a>
<!-- formal-statement-start -->
> **定義（イデアル）**
>
> 環 $R$ の部分集合 $I\subset R$ が次を満たすとき、$I$ を $R$ の **イデアル** という。
>
> 1. $(I,+)$ は $(R,+)$ の部分群である。
> 2. 任意の $r\in R$, $a\in I$ に対し
>
> $$
> ra\in I,
> \qquad
> ar\in I.
> $$
>
> 可換環では二つの吸収条件は同じ条件になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-ideal -->
**定義の確認**

任意の整数 $n$ に対して

$$
n\mathbb Z
=
\{nk:k\in\mathbb Z\}
$$

は $\mathbb Z$ のイデアルです。

加法について

$$
na-nb=n(a-b)\in n\mathbb Z.
$$

また任意の $r\in\mathbb Z$ と $na\in n\mathbb Z$ に対し

$$
r(na)=n(ra)\in n\mathbb Z.
$$

従って吸収性も成り立ちます。
<!-- definition-example-end -->

### 5.1 部分環とイデアルは同じではない

$M_2(\mathbb R)$ の中のスカラー行列全体

$$
S=
\{\lambda I_2:\lambda\in\mathbb R\}
$$

は部分環です。

しかし

$$
E=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

と $I_2\in S$ に対し

$$
EI_2=E\notin S.
$$

従って $S$ は $M_2(\mathbb R)$ のイデアルではありません。

部分環は「中の元どうしを掛けて閉じる」条件です。イデアルはそれより強く、「外側の任意の環元を掛けても内部に戻る」ことを要求します。この差が商環で決定的に効きます。

<a id="def-rng1-principal-ideal"></a>
<!-- formal-statement-start -->
> **定義（主イデアル）**
>
> $R$ を単位元を持つ可換環、$a\in R$ とする。
>
> $$
> (a)
> =
> \{ra:r\in R\}
> $$
>
> を $a$ が生成する **主イデアル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-principal-ideal -->
**定義の確認**

$\mathbb Z$ では

$$
(6)
=
\{6k:k\in\mathbb Z\}
=
6\mathbb Z.
$$

例えば

$$
18\in(6)
$$

なのは

$$
18=3\cdot6
$$

と書けるからです。一方

$$
20\notin(6)
$$

です。
<!-- definition-example-end -->

---

## 6. 核はなぜイデアルになるのか

<a id="prop-rng1-kernel-ideal-image-subring"></a>
<!-- formal-statement-start -->
> **命題（環準同型の核はイデアル、像は部分環）**
>
> 環準同型 $f:R\to S$ に対し、
>
> $$
> \ker f
> $$
>
> は $R$ のイデアルであり、
>
> $$
> \operatorname{Im}f
> $$
>
> は $S$ の部分環である。
<!-- formal-statement-end -->

### 証明の見取り図

加法については群準同型と同じです。

新しい点は核の吸収性です。$a$ が核に入っていれば $f(a)=0$ なので、任意の $r\in R$ を掛けても

$$
f(ra)=f(r)f(a)=f(r)0=0
$$

となります。

<!-- proof-start -->
### 証明

まず $\ker f$ を考えます。

環準同型は加法について群準同型なので、

$$
\ker f
$$

は $(R,+)$ の部分群です。

次に $a\in\ker f$, $r\in R$ とします。

$$
f(a)=0_S
$$

なので

$$
f(ra)
=
f(r)f(a)
=
f(r)0_S
=
0_S.
$$

従って

$$
ra\in\ker f.
$$

同様に

$$
f(ar)
=
f(a)f(r)
=
0_Sf(r)
=
0_S
$$

だから

$$
ar\in\ker f.
$$

よって $\ker f$ は $R$ のイデアルです。

次に $\operatorname{Im}f$ を考えます。

$f(a),f(b)\in\operatorname{Im}f$ とすると

$$
f(a)-f(b)
=
f(a-b)
\in
\operatorname{Im}f.
$$

また

$$
f(a)f(b)
=
f(ab)
\in
\operatorname{Im}f.
$$

従って部分環判定から $\operatorname{Im}f$ は $S$ の部分環です。$\square$
<!-- proof-end -->

先ほどの標準射影

$$
\pi_n:\mathbb Z\to\mathbb Z/n\mathbb Z
$$

では

$$
\ker\pi_n
=
n\mathbb Z.
$$

つまり $\mathbb Z/n\mathbb Z$ は「$n$ の倍数を零とみなす」商構造です。

---

## 7. 商環の積を代表元によらず定める条件

$I$ を $R$ の加法部分群とします。加法群 $(R,+)$ は可換群なので、加法剰余類

$$
a+I
=
\{a+x:x\in I\}
$$

全体はいつでも商群を作れます。

問題は積です。

自然には

$$
(a+I)(b+I)
=
ab+I
$$

と置きたい。しかし $a,b$ の代表元を変えたときも同じ剰余類にならなければなりません。

<a id="thm-rng1-quotient-well-defined"></a>
<!-- formal-statement-start -->
> **定理（商環の積とイデアル条件）**
>
> $R$ を環、$I$ を $(R,+)$ の部分群とする。
>
> 加法剰余類全体 $R/I$ に
>
> $$
> (a+I)+(b+I)
> =
> (a+b)+I
> $$
>
> および
>
> $$
> (a+I)(b+I)
> =
> ab+I
> $$
>
> と定める。
>
> この乗法が代表元によらず well-defined であることと、$I$ が $R$ のイデアルであることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$a$ を $a+i$、$b$ を $b+j$ に変えると、積の差は

$$
(a+i)(b+j)-ab
=
aj+ib+ij.
$$

$I$ がイデアルなら、右辺の三項は全て $I$ に戻ります。

逆向きは、$i\in I$ が $0+I$ と同じ剰余類を表すことを使います。積が well-defined なら

$$
(r+I)(i+I)
=
(r+I)(0+I)
$$

でなければならず、そこから $ri\in I$ が強制されます。

<!-- proof-start -->
### 証明

まず $I$ がイデアルだとします。

$$
a+I=a'+I,
\qquad
b+I=b'+I
$$

なら、ある $i,j\in I$ が存在して

$$
a'=a+i,
\qquad
b'=b+j.
$$

従って

$$
a'b'-ab
=
(a+i)(b+j)-ab
=
aj+ib+ij.
$$

$I$ はイデアルなので

$$
aj\in I,
\qquad
ib\in I.
$$

また $i\in I$ に $j\in R$ を掛けても内部に戻るので

$$
ij\in I.
$$

従って

$$
a'b'-ab\in I.
$$

よって

$$
a'b'+I
=
ab+I.
$$

したがって乗法は代表元によらず定まります。

逆に、剰余類の積

$$
(a+I)(b+I)=ab+I
$$

が代表元によらず定まるとします。

任意の $r\in R$ と $i\in I$ を取ります。

$$
i+I
=
0+I
$$

なので well-defined 性から

$$
(r+I)(i+I)
=
(r+I)(0+I).
$$

従って

$$
ri+I
=
0+I,
$$

すなわち

$$
ri\in I.
$$

同様に

$$
(i+I)(r+I)
=
(0+I)(r+I)
$$

から

$$
ir\in I.
$$

$I$ はもともと加法部分群なので、以上より $I$ はイデアルです。$\square$
<!-- proof-end -->

正規部分群が商群の積を支えたのと同じように、イデアルが商環の積を支えます。ただし環では「左右からの吸収性」という形で条件が現れます。

---

## 8. 商環

<a id="def-rng1-quotient-ring"></a>
<!-- formal-statement-start -->
> **定義（商環）**
>
> 環 $R$ とイデアル $I\subset R$ に対し、加法剰余類全体
>
> $$
> R/I
> =
> \{a+I:a\in R\}
> $$
>
> に
>
> $$
> (a+I)+(b+I)
> =
> (a+b)+I,
> $$
>
> $$
> (a+I)(b+I)
> =
> ab+I
> $$
>
> を入れて得られる環を **商環** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-quotient-ring -->
**定義の確認**

$R=\mathbb Z$, $I=6\mathbb Z$ とすると

$$
\mathbb Z/6\mathbb Z
=
\{
\overline0,
\overline1,
\overline2,
\overline3,
\overline4,
\overline5
\}.
$$

ここで

$$
\overline4+\overline5
=
\overline9
=
\overline3,
$$

$$
\overline4\,\overline5
=
\overline{20}
=
\overline2.
$$

代表元として $4$ の代わりに $10$、$5$ の代わりに $-1$ を使っても

$$
10(-1)=-10\equiv2\pmod6
$$

なので同じ積の剰余類になります。これを保証しているのが $6\mathbb Z$ のイデアル性です。
<!-- definition-example-end -->

<a id="def-rng1-quotient-projection"></a>
<!-- formal-statement-start -->
> **定義（商環の標準射影）**
>
> 環 $R$ とイデアル $I$ に対し
>
> $$
> \pi:R\to R/I,
> \qquad
> \pi(a)=a+I
> $$
>
> を **商環の標準射影**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng1-quotient-projection -->
**定義の確認**

$R=\mathbb Z$, $I=6\mathbb Z$ なら

$
\pi(8)
=
8+6\mathbb Z
=
2+6\mathbb Z.
$

また $\pi(a)=0+6\mathbb Z$ となるのは $6\mid a$ のときに限るので

$
\ker\pi=6\mathbb Z.
$
<!-- definition-example-end -->

この写像は

$$
\pi(a+b)
=
(a+b)+I
=
(a+I)+(b+I)
$$

および

$$
\pi(ab)
=
ab+I
=
(a+I)(b+I)
$$

を満たすので環準同型です。

さらに

$$
\ker\pi=I.
$$

したがって、任意のイデアルはある環準同型の核として実現できます。

---

## 9. 環の第一同型定理

<a id="thm-rng1-first-isomorphism-ring"></a>
<!-- formal-statement-start -->
> **定理（環の第一同型定理）**
>
> 環準同型
>
> $$
> f:R\to S
> $$
>
> に対して
>
> $$
> R/\ker f
> \cong
> \operatorname{Im}f
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

群の第一同型定理と同じ候補

$$
\overline f:R/\ker f\to\operatorname{Im}f,
\qquad
\overline f(a+\ker f)=f(a)
$$

を作ります。

well-defined 性と全単射性は加法群としての議論で足ります。環で新しく確認すべきなのは、積も保つことです。

<!-- proof-start -->
### 証明

写像

$$
\overline f:R/\ker f\to\operatorname{Im}f
$$

を

$$
\overline f(a+\ker f)
=
f(a)
$$

で定めます。

まず well-defined 性を確認します。

$$
a+\ker f
=
b+\ker f
$$

なら

$$
a-b\in\ker f.
$$

従って

$$
f(a-b)=0.
$$

環準同型は加法を保つので

$$
f(a)-f(b)=0,
$$

したがって

$$
f(a)=f(b).
$$

よって $\overline f$ は well-defined です。

次に加法を保ちます。

$$
\begin{aligned}
\overline f\bigl((a+\ker f)+(b+\ker f)\bigr)
&=
\overline f(a+b+\ker f)\\
&=
f(a+b)\\
&=
f(a)+f(b).
\end{aligned}
$$

また積について

$$
\begin{aligned}
\overline f\bigl((a+\ker f)(b+\ker f)\bigr)
&=
\overline f(ab+\ker f)\\
&=
f(ab)\\
&=
f(a)f(b).
\end{aligned}
$$

従って $\overline f$ は環準同型です。

全射性は、終域を $\operatorname{Im}f$ と取ったことから従います。

最後に単射性を示します。

$$
\overline f(a+\ker f)=0
$$

なら

$$
f(a)=0,
$$

つまり

$$
a\in\ker f.
$$

従って

$$
a+\ker f
=
\ker f
$$

であり、核は零剰余類だけです。よって $\overline f$ は単射です。

以上から $\overline f$ は環同型であり、

$$
R/\ker f
\cong
\operatorname{Im}f.
$$

$\square$
<!-- proof-end -->

### 9.1 標準例：整数を法 $n$ で見る

環準同型

$$
\pi_n:\mathbb Z\to\mathbb Z/n\mathbb Z
$$

は全射で、

$$
\ker\pi_n=n\mathbb Z.
$$

従って第一同型定理は

$$
\boxed{
\mathbb Z/n\mathbb Z
\cong
\operatorname{Im}\pi_n
=
\mathbb Z/n\mathbb Z
}
$$

を与えます。

この例では結論自体は当然に見えますが、重要なのは構造です。

$$
\boxed{
\text{像}
=
\text{定義域を「核で区別しない」商環}
}
$$

という読み方は、後続の全ての商構造で繰り返し現れます。

---

## 10. 整数のイデアルは全て一つの整数で生成される

$\mathbb Z$ のイデアルは、具体例として非常に扱いやすいだけでなく、後続の「主イデアル」という考え方の原型になります。

<a id="prop-rng1-integer-ideals"></a>
<!-- formal-statement-start -->
> **命題（整数環のイデアル）**
>
> $\mathbb Z$ の任意のイデアル $I$ は、ある一意な非負整数 $n$ によって
>
> $$
> I=n\mathbb Z
> $$
>
> と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

$I=\{0\}$ なら $n=0$ です。

$I\ne\{0\}$ なら $I$ に含まれる最小の正整数 $n$ を取ります。任意の $a\in I$ を $n$ で割って

$$
a=qn+r,
\qquad
0\le r<n
$$

とすると、$r=a-qn$ も $I$ に属します。$n$ の最小性により $r=0$ しかありません。

<!-- proof-start -->
### 証明

まず

$$
I=\{0\}
$$

なら

$$
I=0\mathbb Z
$$

なので $n=0$ と取れます。

以下

$$
I\ne\{0\}
$$

とします。

$I$ は加法逆元で閉じているので、非零元を一つ含めば正の整数も含みます。

$I$ に含まれる正整数のうち最小のものを $n$ とします。

$I$ はイデアルなので、任意の $q\in\mathbb Z$ に対し

$$
qn\in I.
$$

従って

$$
n\mathbb Z\subset I.
$$

逆の包含を示します。

任意の $a\in I$ を取ります。整数の除法により

$$
a=qn+r,
\qquad
0\le r<n
$$

と書けます。

$a\in I$ かつ $qn\in I$ なので、加法部分群としての閉性から

$$
r=a-qn\in I.
$$

もし $r>0$ なら、$r$ は $I$ に属する $n$ より小さい正整数となり、$n$ の最小性に反します。

従って

$$
r=0.
$$

よって

$$
a=qn\in n\mathbb Z.
$$

したがって

$$
I\subset n\mathbb Z.
$$

以上から

$$
I=n\mathbb Z.
$$

最後に一意性を示します。

$$
m\mathbb Z=n\mathbb Z
$$

で $m,n\ge0$ とします。一方が0なら両方0です。

$m,n>0$ なら $m$ は $m\mathbb Z$ の最小正整数であり、$n$ は $n\mathbb Z$ の最小正整数です。同じ集合なので

$$
m=n.
$$

従って非負整数 $n$ は一意です。$\square$
<!-- proof-end -->

ここではまだ「単項イデアル整域」という一般概念は導入しません。RNG3 で、$\mathbb Z$ のこの性質を一般の整域へ抽象化します。

---

## 11. 演習

### Level A

#### RNG1-A01 四つの環を分類する
- Level: A

次の環について、「可換か」「単位元を持つか」「整域か」「体か」を判定し、理由を述べよ。

1. $\mathbb Z$
2. $\mathbb Q$
3. $\mathbb Z/6\mathbb Z$
4. $M_2(\mathbb R)$

<!-- solution-start -->
##### 詳細解答

#### 1. $\mathbb Z$

通常の整数の加法・乗法は可換なので $\mathbb Z$ は可換環です。

単位元は

$$
1
$$

です。

さらに

$$
ab=0
$$

なら整数では $a=0$ または $b=0$ なので零因子を持ちません。従って $\mathbb Z$ は整域です。

しかし $2\ne0$ に対し

$$
2b=1
$$

を満たす整数 $b$ は存在しないので体ではありません。

したがって

$$
\boxed{
\mathbb Z:
\text{可換、単位元あり、整域、体ではない}
}
$$

です。

#### 2. $\mathbb Q$

有理数の加法・乗法は可換で、単位元は $1$ です。

任意の

$$
a\in\mathbb Q,
\qquad
a\ne0
$$

に対し

$$
a^{-1}=\frac1a\in\mathbb Q
$$

なので $\mathbb Q$ は体です。

体は整域なので

$$
\boxed{
\mathbb Q:
\text{可換、単位元あり、整域、体}
}
$$

です。

#### 3. $\mathbb Z/6\mathbb Z$

剰余類の加法・乗法は可換で、単位元は

$$
\overline1.
$$

しかし

$$
\overline2\ne\overline0,
\qquad
\overline3\ne\overline0
$$

なのに

$$
\overline2\,\overline3
=
\overline0.
$$

従って零因子を持ち、整域ではありません。

体なら整域でなければならないので、体でもありません。

したがって

$$
\boxed{
\mathbb Z/6\mathbb Z:
\text{可換、単位元あり、整域でない、体でない}
}
$$

です。

#### 4. $M_2(\mathbb R)$

行列加法・行列乗法で環になり、単位元は

$$
I_2
$$

です。

しかし本文で見た

$$
A=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
0&0\\
1&0
\end{pmatrix}
$$

について

$$
AB\ne BA
$$

なので可換ではありません。

本章の整域・体は可換環に対して定義しているので、$M_2(\mathbb R)$ はその意味で整域でも体でもありません。

従って

$$
\boxed{
M_2(\mathbb R):
\text{非可換、単位元あり、整域でない、体でない}
}
$$

です。
<!-- solution-end -->

#### RNG1-A02 $6\mathbb Z$ を主イデアルとして確認する
- Level: A

$\mathbb Z$ の部分集合

$$
I=6\mathbb Z
$$

について次を示せ。

1. $I$ は $\mathbb Z$ のイデアルである。
2. $I=(6)$ である。
3. $42\in I$ かつ $25\notin I$ を確認せよ。
4. $\mathbb Z/I$ で
   $$
   (4+I)(5+I)
   $$
   を求めよ。

<!-- solution-start -->
##### 詳細解答

まず $6a,6b\in I$ とします。

$$
6a-6b
=
6(a-b)
\in I.
$$

従って $I$ は加法部分群です。

任意の $r\in\mathbb Z$ と $6a\in I$ に対して

$$
r(6a)
=
6(ra)
\in I.
$$

$\mathbb Z$ は可換なので反対側から掛けても同じです。よって $I$ はイデアルです。

主イデアルの定義から

$$
(6)
=
\{6r:r\in\mathbb Z\}
=
6\mathbb Z
=
I.
$$

次に

$$
42=6\cdot7
$$

なので

$$
42\in I.
$$

一方、もし $25\in I$ なら

$$
25=6k
$$

となる整数 $k$ が必要ですが、そのような整数はありません。従って

$$
25\notin I.
$$

商環では

$$
(4+I)(5+I)
=
20+I.
$$

$$
20-2=18\in6\mathbb Z
$$

なので

$$
20+I=2+I.
$$

したがって

$$
\boxed{
(4+I)(5+I)=2+I
}
$$

です。
<!-- solution-end -->

#### RNG1-A03 法 $8$ の標準射影の核と像
- Level: A

写像

$$
\pi_8:\mathbb Z\to\mathbb Z/8\mathbb Z,
\qquad
\pi_8(a)=\overline a
$$

について次を示せ。

1. $\pi_8$ は環準同型である。
2. $\ker\pi_8=8\mathbb Z$ である。
3. $\operatorname{Im}\pi_8=\mathbb Z/8\mathbb Z$ である。
4. 環の第一同型定理を適用せよ。

<!-- solution-start -->
##### 詳細解答

任意の $a,b\in\mathbb Z$ に対し

$$
\pi_8(a+b)
=
\overline{a+b}
=
\overline a+\overline b
=
\pi_8(a)+\pi_8(b).
$$

また

$$
\pi_8(ab)
=
\overline{ab}
=
\overline a\,\overline b
=
\pi_8(a)\pi_8(b).
$$

従って $\pi_8$ は環準同型です。

核は

$$
\ker\pi_8
=
\{a\in\mathbb Z:\overline a=\overline0\}.
$$

これは

$$
8\mid a
$$

と同値なので

$$
\boxed{
\ker\pi_8=8\mathbb Z
}.
$$

任意の剰余類

$$
\overline r\in\mathbb Z/8\mathbb Z
$$

は

$$
\pi_8(r)=\overline r
$$

と書けるので、$\pi_8$ は全射です。従って

$$
\boxed{
\operatorname{Im}\pi_8=\mathbb Z/8\mathbb Z
}.
$$

環の第一同型定理から

$$
\mathbb Z/\ker\pi_8
\cong
\operatorname{Im}\pi_8.
$$

核と像を代入すると

$$
\boxed{
\mathbb Z/8\mathbb Z
\cong
\mathbb Z/8\mathbb Z
}
$$

を得ます。

ここで重要なのは、法 $8$ で区別できなくなる整数がちょうど核 $8\mathbb Z$ であり、その核で割った商環が像を復元することです。
<!-- solution-end -->

#### RNG1-A04 積環の射影
- Level: A

積環

$$
R=\mathbb Z\times\mathbb Z
$$

に成分ごとの加法・乗法を入れる。

写像

$$
p_1:R\to\mathbb Z,
\qquad
p_1(a,b)=a
$$

について次を求めよ。

1. $p_1$ が環準同型であることを示せ。
2. $\ker p_1$ を求めよ。
3. $\operatorname{Im}p_1$ を求めよ。
4. 第一同型定理から商環を同定せよ。

<!-- solution-start -->
##### 詳細解答

積環の演算は

$$
(a,b)+(c,d)
=
(a+c,b+d)
$$

および

$$
(a,b)(c,d)
=
(ac,bd)
$$

です。

従って

$$
p_1((a,b)+(c,d))
=
p_1(a+c,b+d)
=
a+c
$$

であり

$$
a+c
=
p_1(a,b)+p_1(c,d).
$$

また

$$
p_1((a,b)(c,d))
=
p_1(ac,bd)
=
ac
$$

であり

$$
ac
=
p_1(a,b)p_1(c,d).
$$

従って $p_1$ は環準同型です。

核は

$$
\ker p_1
=
\{(a,b)\in\mathbb Z^2:a=0\}
=
\{0\}\times\mathbb Z.
$$

任意の $a\in\mathbb Z$ に対し

$$
p_1(a,0)=a
$$

なので

$$
\operatorname{Im}p_1=\mathbb Z.
$$

第一同型定理から

$$
(\mathbb Z\times\mathbb Z)/
(\{0\}\times\mathbb Z)
\cong
\mathbb Z.
$$

したがって

$$
\boxed{
(\mathbb Z\times\mathbb Z)/
(\{0\}\times\mathbb Z)
\cong
\mathbb Z
}
$$

です。

第二成分を全て核として潰すと、第一成分だけが残るという構造が見えています。
<!-- solution-end -->

### Level B

#### RNG1-B01 $\mathbb Z$ の任意のイデアルを再構成する
- Level: B

$I$ を $\mathbb Z$ の非零イデアルとする。

1. $I$ が正整数を含むことを示せ。
2. $I$ に含まれる最小の正整数を $n$ とする。
3. 任意の $a\in I$ に対し $n\mid a$ を示せ。
4. $I=n\mathbb Z$ を結論せよ。

<!-- solution-start -->
##### 詳細解答

$I$ は非零なので、ある

$$
a\in I,
\qquad
a\ne0
$$

が存在します。

$a>0$ ならそのまま正整数を含みます。

$a<0$ なら、$I$ は加法逆元で閉じているので

$$
-a\in I
$$

であり、$-a>0$ です。

従って $I$ は正整数を少なくとも一つ含みます。

正整数の整列性から、$I$ に含まれる正整数の最小値 $n$ が存在します。

任意の $a\in I$ を取ります。整数の除法により

$$
a=qn+r,
\qquad
0\le r<n
$$

と書けます。

$n\in I$ であり、$I$ はイデアルなので

$$
qn\in I.
$$

また $I$ は加法部分群なので

$$
r
=
a-qn
\in I.
$$

もし $r>0$ なら、$r$ は $I$ に属する $n$ より小さい正整数となり、$n$ の最小性に矛盾します。

従って

$$
r=0.
$$

よって

$$
a=qn,
$$

すなわち

$$
n\mid a.
$$

したがって任意の $a\in I$ は $n\mathbb Z$ に属し

$$
I\subset n\mathbb Z.
$$

逆に $n\in I$ で、任意の $q\in\mathbb Z$ に対し

$$
qn\in I
$$

なので

$$
n\mathbb Z\subset I.
$$

従って

$$
\boxed{
I=n\mathbb Z
}
$$

です。
<!-- solution-end -->

#### RNG1-B02 イデアルでない加法部分群では商の積が壊れる
- Level: B

整数係数多項式環 $\mathbb Z[x]$ を考え、定数多項式全体

$$
H=\mathbb Z
$$

を $\mathbb Z[x]$ の加法部分群とみなす。

1. $H$ が部分環であることを示せ。
2. $H$ が $\mathbb Z[x]$ のイデアルではないことを示せ。
3.
   $$
   x+H=(x+1)+H
   $$
   を示せ。
4. この二つの代表元に右から $x$ を掛けると異なる剰余類になることを示し、商の積が well-defined でないことを確認せよ。

<!-- solution-start -->
##### 詳細解答

まず定数多項式 $a,b\in H$ に対し

$$
a-b\in H
$$

かつ

$$
ab\in H.
$$

従って部分環判定から $H$ は $\mathbb Z[x]$ の部分環です。

しかし $1\in H$ である一方、

$$
x\cdot1=x\notin H.
$$

イデアルなら、環の任意の元 $x$ を $H$ の元 $1$ に掛けても $H$ に戻る必要があります。

従って $H$ はイデアルではありません。

次に

$$
(x+1)-x=1\in H
$$

なので

$$
x+H=(x+1)+H.
$$

もし剰余類の積を

$$
(f+H)(g+H)=fg+H
$$

で定められるなら、同じ剰余類の代表元 $x$ と $x+1$ を使っても同じ結果になるはずです。

ところが

$$
x\cdot x=x^2
$$

に対し

$$
(x+1)x
=
x^2+x.
$$

二つの積の差は

$$
(x^2+x)-x^2=x.
$$

しかし

$$
x\notin H.
$$

従って

$$
x^2+H
\ne
(x^2+x)+H.
$$

つまり

$$
\boxed{
(x+H)(x+H)
}
$$

は代表元の選び方によって異なる値を与えてしまいます。

壊れた仮定は、$H$ が外側の元による乗法を吸収するイデアルではないことです。
<!-- solution-end -->

#### RNG1-B03 第一同型定理を積環で使う
- Level: B

正整数 $m$ と環準同型

$$
f:\mathbb Z\times\mathbb Z\to\mathbb Z/m\mathbb Z,
\qquad
f(a,b)=\overline a
$$

を考える。

1. $\ker f$ を求めよ。
2. $\operatorname{Im}f$ を求めよ。
3. 第一同型定理から
   $$
   (\mathbb Z\times\mathbb Z)/\ker f
   $$
   を同定せよ。
4. $(a,b)$ と $(c,d)$ が同じ剰余類を表す条件を具体的に述べよ。

<!-- solution-start -->
##### 詳細解答

$f(a,b)=\overline0$ となる条件は

$$
m\mid a
$$

です。

第二成分 $b$ には条件がありません。

従って

$$
\ker f
=
m\mathbb Z\times\mathbb Z.
$$

次に任意の

$$
\overline r\in\mathbb Z/m\mathbb Z
$$

に対して

$$
f(r,0)=\overline r
$$

なので $f$ は全射です。

よって

$$
\operatorname{Im}f
=
\mathbb Z/m\mathbb Z.
$$

第一同型定理から

$$
(\mathbb Z\times\mathbb Z)/
(m\mathbb Z\times\mathbb Z)
\cong
\mathbb Z/m\mathbb Z.
$$

したがって

$$
\boxed{
(\mathbb Z\times\mathbb Z)/
(m\mathbb Z\times\mathbb Z)
\cong
\mathbb Z/m\mathbb Z
}
$$

です。

最後に

$$
(a,b)+\ker f
=
(c,d)+\ker f
$$

であることは

$$
(a-c,b-d)\in m\mathbb Z\times\mathbb Z
$$

と同値です。

第二成分は常に $\mathbb Z$ に属するので条件を与えません。

第一成分だけが

$$
a-c\in m\mathbb Z,
$$

すなわち

$$
a\equiv c\pmod m
$$

を要求します。

従って

$$
\boxed{
(a,b)\sim(c,d)
\iff
a\equiv c\pmod m
}
$$

です。

商を取ると第二成分の情報は完全に消え、第一成分も法 $m$ の情報だけが残ります。
<!-- solution-end -->

### Level C

#### RNG1-C01 $\mathbb Z\times\mathbb Z$ の全イデアルを分類する
- Level: C

積環

$$
R=\mathbb Z\times\mathbb Z
$$

に成分ごとの演算を入れる。

$I$ を $R$ の任意のイデアルとする。

1.
   $$
   I_1=
   \{a\in\mathbb Z:\exists b\in\mathbb Z,\ (a,b)\in I\},
   $$
   $$
   I_2=
   \{b\in\mathbb Z:\exists a\in\mathbb Z,\ (a,b)\in I\}
   $$
   が $\mathbb Z$ のイデアルであることを示せ。
2. $I=I_1\times I_2$ を示せ。
3. ある一意な非負整数 $m,n$ が存在して
   $$
   I=m\mathbb Z\times n\mathbb Z
   $$
   と書けることを示せ。
4. 写像
   $$
   \Phi:\mathbb Z\times\mathbb Z
   \to
   \mathbb Z/m\mathbb Z\times\mathbb Z/n\mathbb Z,
   \qquad
   \Phi(a,b)=(\overline a,\overline b)
   $$
   に第一同型定理を適用し、
   $$
   R/I
   $$
   を同定せよ。
   
ここで $m=0$ のとき $\mathbb Z/0\mathbb Z$ は $\mathbb Z$ 自身と解釈してよい。

<!-- solution-start -->
##### 詳細解答

#### 1. 射影した集合がイデアルになること

まず $I_1$ を考えます。

$a,c\in I_1$ とすると、ある $b,d\in\mathbb Z$ が存在して

$$
(a,b)\in I,
\qquad
(c,d)\in I.
$$

$I$ は加法部分群なので

$$
(a,b)-(c,d)
=
(a-c,b-d)
\in I.
$$

従って

$$
a-c\in I_1.
$$

次に任意の $r\in\mathbb Z$ に対し、積環の元

$$
(r,0)
$$

を $(a,b)\in I$ に掛けると

$$
(r,0)(a,b)
=
(ra,0)
\in I
$$

です。

したがって

$$
ra\in I_1.
$$

よって $I_1$ は $\mathbb Z$ のイデアルです。

同様に $(0,r)$ を使えば $I_2$ も $\mathbb Z$ のイデアルです。

#### 2. $I=I_1\times I_2$

定義から

$$
I\subset I_1\times I_2
$$

は直ちに成り立ちます。

逆の包含を示します。

$$
a\in I_1,
\qquad
b\in I_2
$$

とします。

$I_1$ の定義から、ある $c$ が存在して

$$
(a,c)\in I.
$$

$I$ はイデアルなので、積環の元 $(1,0)$ を掛けると

$$
(1,0)(a,c)
=
(a,0)
\in I.
$$

同様に、ある $d$ が存在して

$$
(d,b)\in I
$$

であり、$(0,1)$ を掛けると

$$
(0,1)(d,b)
=
(0,b)
\in I.
$$

$I$ は加法で閉じているので

$$
(a,b)
=
(a,0)+(0,b)
\in I.
$$

従って

$$
I_1\times I_2\subset I.
$$

以上から

$$
\boxed{
I=I_1\times I_2
}.
$$

#### 3. 整数環のイデアル分類を使う

本文の [整数環のイデアル](#prop-rng1-integer-ideals)から、ある一意な非負整数 $m,n$ が存在して

$$
I_1=m\mathbb Z,
\qquad
I_2=n\mathbb Z.
$$

従って

$$
\boxed{
I=m\mathbb Z\times n\mathbb Z
}.
$$

#### 4. 商環を第一同型定理で同定する

写像

$$
\Phi(a,b)
=
(\overline a,\overline b)
$$

は成分ごとに加法・乗法を保つので環準同型です。

任意の剰余類対

$$
(\overline r,\overline s)
$$

は

$$
\Phi(r,s)
=
(\overline r,\overline s)
$$

と書けるので $\Phi$ は全射です。

核は

$$
\begin{aligned}
\ker\Phi
&=
\{(a,b):\overline a=\overline0,\ \overline b=\overline0\}\\
&=
m\mathbb Z\times n\mathbb Z\\
&=
I.
\end{aligned}
$$

第一同型定理から

$$
R/I
=
(\mathbb Z\times\mathbb Z)/
(m\mathbb Z\times n\mathbb Z)
\cong
\mathbb Z/m\mathbb Z\times\mathbb Z/n\mathbb Z.
$$

従って

$$
\boxed{
(\mathbb Z\times\mathbb Z)/
(m\mathbb Z\times n\mathbb Z)
\cong
\mathbb Z/m\mathbb Z\times\mathbb Z/n\mathbb Z
}
$$

です。

この問題では、

$$
\text{イデアルの吸収性}
\to
\text{成分の切り出し}
\to
\mathbb Z\text{ のイデアル分類}
\to
\text{第一同型定理}
$$

という RNG1 の主線を一度に使っています。
<!-- solution-end -->

---

## 12. 章末まとめ

本章では、群論で学んだ商構造を環へ移しました。

環は

$$
\boxed{
\text{可換な加法群}
+
\text{結合的な乗法}
+
\text{分配法則}
}
$$

を持ちます。

環準同型

$$
f:R\to S
$$

の核は、単なる加法部分群ではなく

$$
r\in R,
\quad
a\in\ker f
\Longrightarrow
ra,ar\in\ker f
$$

という吸収性を持つイデアルになります。

そして

$$
\boxed{
(a+I)(b+I)=ab+I
}
$$

を代表元によらず定められるための必要十分条件が、まさに $I$ がイデアルであることでした。

最後に環の第一同型定理

$$
\boxed{
R/\ker f
\cong
\operatorname{Im}f
}
$$

を証明しました。

したがって RNG1 の最も重要な対応は

$$
\boxed{
\text{環準同型の核}
\longleftrightarrow
\text{イデアル}
\longleftrightarrow
\text{商環}
}
$$

です。

次の RNG2 では、イデアルの中でも **素イデアル** と **極大イデアル** を導入し、

$$
R/I\text{ が整域・体になる条件}
$$

をイデアル側から特徴付けます。さらに互いに素なイデアルを組み合わせ、中国剰余定理へ進みます。
