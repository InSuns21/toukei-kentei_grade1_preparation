# FLD3 抽象代数 XIII：有限体と Frobenius 写像

<!-- definition-example-audit: strict -->

[FLD2](../FLD2/index.md) では、分解体・分離性・正規性を整えました。本章では正標数側へ進み、**有限個の元しかない体が驚くほど剛直な構造を持つ**ことを調べます。

有限体では、元の個数は勝手な整数にはなりません。ある素数 $p$ と正整数 $n$ があって

$$
|K|=p^n
$$

となり、さらに位数 $p^n$ の体は同型を除けば一つしかありません。その剛直性を支えるのが

$$
x\longmapsto x^p
$$

という Frobenius 写像と、

$$
x^{p^n}-x
$$

という一つの多項式です。

本章の主線は

$$
\text{標数}
\longrightarrow
\text{Frobenius 写像}
\longrightarrow
K^\times\text{ の巡回性}
\longrightarrow
x^{p^n}-x
\longrightarrow
\mathbb F_{p^n}\text{ の存在・一意性}
\longrightarrow
\text{部分体と相対 Frobenius}
$$

です。

> **この章の停止線**
>
> 有限体拡大が分離的かつ正規であるところまで示します。自己同型群と中間体を一般の有限拡大について対応させる有限 Galois 理論の基本定理は FLD4 で扱います。

---

## 1. 有限体の大きさはなぜ素数冪なのか

まず、体の加法で $1$ を何回足すと $0$ へ戻るかを測ります。

<a id="def-fld3-characteristic-prime-field-finite-field"></a>
<!-- formal-statement-start -->
> **定義（標数・素体・有限体）**
>
> 体 $F$ に対し、正整数 $n$ で
>
> $$
> n\cdot1_F=0
> $$
>
> となるものが存在するとき、その最小の正整数を $F$ の **標数**という。存在しないとき標数を $0$ とする。
>
> $1_F$ を含む最小の部分体を $F$ の **素体**という。
>
> 元の個数が有限である体を **有限体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld3-characteristic-prime-field-finite-field -->
**定義の確認**

### 1.1 $\mathbb F_2$ と $\mathbb F_3$

$\mathbb Z/2\mathbb Z$ では

$$
1+1=0
$$

なので標数は $2$ です。$\mathbb Z/3\mathbb Z$ では

$$
1+1+1=0,
\qquad
1\ne0,\quad 1+1\ne0
$$

なので標数は $3$ です。

どちらも $1$ から加法・減法・乗法・逆元を作っても体全体を出ることはありません。従ってそれぞれ自分自身が素体です。

以後、素数 $p$ に対して

$$
\mathbb F_p=\mathbb Z/p\mathbb Z
$$

と書きます。
<!-- definition-example-end -->

<a id="thm-fld3-prime-power-cardinality"></a>
<!-- formal-statement-start -->
> **定理（有限体の位数は素数冪）**
>
> 有限体 $K$ に対し、ある素数 $p$ と正整数 $n$ が一意に存在して
>
> $$
> |K|=p^n
> $$
>
> となる。
>
> この $p$ は $K$ の標数であり、$K$ の素体は $\mathbb F_p$ と同型である。また
>
> $$
> n=[K:\mathbb F_p]
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

有限集合

$$
0,\ 1,\ 1+1,\ 1+1+1,\dots
$$

はどこかで同じ値を取るので、ある正整数 $m$ で $m\cdot1_K=0$ になります。最小のその $m$ が合成数なら、体に零因子が生じてしまうので $m$ は素数です。

その素数を $p$ とすると、素体は $\mathbb F_p$ です。あとは $K$ を $\mathbb F_p$-ベクトル空間と見れば、各基底係数には $p$ 通りの選択肢しかないため、元の総数は $p^n$ になります。

<!-- proof-start -->
### 証明

$K$ は有限なので、

$$
0,\ 1_K,\ 2\cdot1_K,\ 3\cdot1_K,\dots
$$

の中には等しい二項があります。従ってある正整数 $m$ が存在して

$$
m\cdot1_K=0
$$

となります。

そのような正整数の最小値を $p$ とします。$p=ab$ と合成数に分解でき、$1<a<p$、$1<b<p$ と仮定します。

最小性から

$$
a\cdot1_K\ne0,
\qquad
b\cdot1_K\ne0.
$$

しかし

$$
(a\cdot1_K)(b\cdot1_K)
=
ab\cdot1_K
=
p\cdot1_K
=
0.
$$

体には零因子がないので矛盾です。従って $p$ は素数です。

写像

$$
\mathbb Z\to K,
\qquad
r\mapsto r\cdot1_K
$$

の核は $p\mathbb Z$ なので、像は

$$
\mathbb Z/p\mathbb Z=\mathbb F_p
$$

と同型です。これは $1_K$ を含む最小の部分体なので $K$ の素体です。

$K$ は有限集合なので、$\mathbb F_p$ 上の一次独立な部分集合も有限です。最大一次独立集合を取れば有限基底が得られます。その元の個数を $n$ とします。

すると任意の $x\in K$ は一意に

$$
x=a_1e_1+\cdots+a_ne_n,
\qquad
a_i\in\mathbb F_p
$$

と書けます。各係数は $p$ 通りなので

$$
|K|=p^n.
$$

また定義から

$$
n=[K:\mathbb F_p].
$$

素因数分解の一意性から $p$ と $n$ も一意です。
<!-- proof-end -->

この定理は「有限体の候補となる大きさ」を絞ります。しかしまだ、任意の $p^n$ に対して本当に体が存在するとは示していません。それは §4 で $x^{p^n}-x$ の分解体から作ります。

---

## 2. 正標数で自然に現れる Frobenius 写像

標数 $p$ では二項係数

$$
\binom pk
$$

が $1\le k\le p-1$ に対して $p$ の倍数です。このため、通常は現れる交差項が全て消えます。

<a id="def-fld3-frobenius"></a>
<!-- formal-statement-start -->
> **定義（Frobenius 写像）**
>
> 標数 $p>0$ の体 $F$ に対し、
>
> $$
> \operatorname{Fr}_p:F\to F,
> \qquad
> x\mapsto x^p
> $$
>
> を **Frobenius 写像**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld3-frobenius -->
**定義の確認**

### 2.1 $\mathbb F_4$ では Frobenius は恒等写像ではない

$$
K=\mathbb F_2[u]/(u^2+u+1)
$$

とし、$u$ の剰余類を $\alpha$ と書きます。

$$
\alpha^2+\alpha+1=0
$$

なので、標数 $2$ では

$$
\alpha^2=\alpha+1.
$$

従って

$$
\operatorname{Fr}_2(\alpha)=\alpha^2=\alpha+1.
$$

さらに

$$
(\alpha+1)^2=\alpha^2+1=\alpha
$$

だから、Frobenius は

$$
0\mapsto0,\qquad
1\mapsto1,\qquad
\alpha\leftrightarrow\alpha+1
$$

と二つの非自明元を交換します。
<!-- definition-example-end -->

<a id="thm-fld3-frobenius-automorphism"></a>
<!-- formal-statement-start -->
> **定理（有限体上の Frobenius 写像は自己同型）**
>
> 標数 $p>0$ の体 $F$ では Frobenius 写像は単射な体準同型である。
>
> 特に $F$ が有限体なら Frobenius 写像は全単射であり、体の自己同型である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は

$$
(x+y)^p=x^p+y^p
$$

です。積については明らかに

$$
(xy)^p=x^py^p.
$$

単射性は

$$
x^p=y^p
\Longrightarrow
(x-y)^p=0
\Longrightarrow
x=y
$$

から従います。有限集合では単射な自己写像は自動的に全射です。

<!-- proof-start -->
### 証明

標数 $p$ では、$1\le k\le p-1$ に対して $\binom pk$ は $p$ の倍数なので体の中で $0$ です。従って

$$
(x+y)^p
=
\sum_{k=0}^{p}\binom pkx^ky^{p-k}
=
x^p+y^p.
$$

また

$$
(xy)^p=x^py^p,
\qquad
1^p=1.
$$

よって $\operatorname{Fr}_p$ は体準同型です。

さらに

$$
\operatorname{Fr}_p(x)=\operatorname{Fr}_p(y)
$$

なら

$$
x^p-y^p=(x-y)^p=0.
$$

体では非零元の冪は非零なので $x-y=0$、すなわち $x=y$ です。従って単射です。

$F$ が有限なら、有限集合 $F$ から自分自身への単射は全射です。従って Frobenius 写像は自己同型です。
<!-- proof-end -->

### 2.2 有限性を外すと全射性が壊れる

$$
F=\mathbb F_p(t)
$$

を一変数有理関数体とします。Frobenius は依然として単射ですが、$t$ は $p$ 乗になりません。

実際

$$
\left(\frac{f(t)}{g(t)}\right)^p
=
\frac{f(t)^p}{g(t)^p}
$$

では分子・分母に現れる $t$ の指数が全て $p$ の倍数です。従って

$$
x^p=t
$$

を満たす $x\in\mathbb F_p(t)$ は存在しません。

ここで失った仮定は **有限性** です。有限性があると「単射なら全射」という集合論的機構が働きますが、無限体ではその機構が使えません。

---

## 3. 有限体の 0 でない元は一つの元の冪で全部出る

有限体 $K$ の $0$ でない元全体

$$
K^\times=K\setminus\{0\}
$$

は乗法で有限可換群になります。

ここで一般の有限可換群について一つ準備します。

<a id="lem-fld3-maximal-order-element"></a>
<!-- formal-statement-start -->
> **補題（有限可換群の最大位数元）**
>
> 有限可換群 $G$ で、元の位数が最大となる $a\in G$ を取り
>
> $$
> \operatorname{ord}(a)=d
> $$
>
> とする。
>
> このとき任意の $b\in G$ について
>
> $$
> \operatorname{ord}(b)\mid d.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

もし $b$ の位数に、$d$ より高い冪で現れる素因数 $\ell$ があれば、$a$ の $\ell$ 部分を落とした元と、$b$ の $\ell$-冪部分を掛け合わせます。

Abel 群なので両者は可換で、位数が互いに素なら積の位数は積になります。すると $d$ より大きい位数の元ができ、$a$ の最大性に反します。

<!-- proof-start -->
### 証明

$b\in G$ の位数を $e$ とします。$e\nmid d$ と仮定します。

すると、$e$ の素因数分解で $d$ より高い冪で現れる素数 $\ell$ が存在します。そこで

$$
d=\ell^r d',
\qquad
e=\ell^s e',
\qquad
s>r,
$$

と書き、$\ell\nmid d'e'$ とします。

$$
u=a^{\ell^r}
$$

と置くと

$$
\operatorname{ord}(u)=d'.
$$

また

$$
v=b^{e'}
$$

と置くと

$$
\operatorname{ord}(v)=\ell^s.
$$

$G$ は Abel 群なので $u$ と $v$ は可換です。しかも $d'$ と $\ell^s$ は互いに素です。

可換な元 $u,v$ の位数が互いに素なら

$$
\operatorname{ord}(uv)
=
\operatorname{ord}(u)\operatorname{ord}(v)
$$

です。実際 $(uv)^k=1$ なら $u^k=v^{-k}$ は $\langle u\rangle\cap\langle v\rangle$ に入ります。その交わりの元の位数は $d'$ と $\ell^s$ の両方を割るので $1$ しかありません。従って $u^k=v^k=1$ であり、$d'\mid k$ と $\ell^s\mid k$ が同時に成り立つため $d'\ell^s\mid k$ です。

よって

$$
\operatorname{ord}(uv)
=
d'\ell^s
>
d'\ell^r
=
d.
$$

これは $a$ の位数の最大性に反します。従って $e\mid d$ です。
<!-- proof-end -->

<a id="thm-fld3-multiplicative-group-cyclic"></a>
<!-- formal-statement-start -->
> **定理（有限体の乗法群は巡回群）**
>
> 有限体 $K$ の乗法群 $K^\times$ は巡回群である。
>
> 特に $|K|=q$ なら、ある $g\in K^\times$ が存在して
>
> $$
> K^\times=\langle g\rangle,
> \qquad
> \operatorname{ord}(g)=q-1.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$K^\times$ の中で最大位数 $d$ の元 $g$ を取ります。補題から全ての $a\in K^\times$ の位数は $d$ を割るので

$$
a^d=1.
$$

従って $K^\times$ の全要素が多項式

$$
x^d-1
$$

の根です。

しかし体上の $d$ 次多項式は高々 $d$ 個しか根を持てません。従って

$$
|K^\times|\le d.
$$

一方 $\langle g\rangle\subset K^\times$ なので $d\le|K^\times|$。両方を合わせると等号しか残りません。

<!-- proof-start -->
### 証明

$K^\times$ は有限可換群です。元の位数が最大となる $g\in K^\times$ を取り、

$$
d=\operatorname{ord}(g)
$$

とします。

[有限可換群の最大位数元](#lem-fld3-maximal-order-element)から、任意の $a\in K^\times$ について

$$
\operatorname{ord}(a)\mid d.
$$

従って

$$
a^d=1.
$$

よって $K^\times$ の全要素は $K[x]$ の多項式

$$
x^d-1
$$

の根です。

非零多項式の根の個数は次数以下なので

$$
|K^\times|\le d.
$$

一方、巡回部分群 $\langle g\rangle$ は $d$ 個の元を持ち、

$$
\langle g\rangle\subset K^\times
$$

だから

$$
d\le|K^\times|.
$$

従って

$$
d=|K^\times|.
$$

よって

$$
K^\times=\langle g\rangle.
$$
<!-- proof-end -->

この生成元は有限体の **原始元** と呼ばれることがあります。本章では名称よりも、「全ての非零元を一つの元の冪で走査できる」ことを使います。

---

## 4. $x^{p^n}-x$ の根は自分たちだけで体を作る

FLD2 で代数閉包を用意したので、$\overline{\mathbb F_p}$ の中で

$$
S_n=
\{\alpha\in\overline{\mathbb F_p}:\alpha^{p^n}=\alpha\}
$$

を考えます。

<a id="lem-fld3-root-set-field"></a>
<!-- formal-statement-start -->
> **補題（$x^{p^n}-x$ の根全体は体）**
>
> 素数 $p$ と正整数 $n$ に対し、
>
> $$
> S_n=
> \{\alpha\in\overline{\mathbb F_p}:\alpha^{p^n}=\alpha\}
> $$
>
> は $\overline{\mathbb F_p}$ の部分体である。
<!-- formal-statement-end -->

### 証明の見取り図

Frobenius を $n$ 回反復すると

$$
(\alpha+\beta)^{p^n}
=
\alpha^{p^n}+\beta^{p^n}
$$

となります。積と逆元も同じ等式を保つため、根全体が四則演算で閉じます。

<!-- proof-start -->
### 証明

$0,1\in S_n$ です。

$\alpha,\beta\in S_n$ とします。Frobenius の加法性を $n$ 回反復すると

$$
(\alpha+\beta)^{p^n}
=
\alpha^{p^n}+\beta^{p^n}
=
\alpha+\beta.
$$

従って $\alpha+\beta\in S_n$ です。

同様に

$$
(-\alpha)^{p^n}
=
-\alpha^{p^n}
=
-\alpha
$$

なので $-\alpha\in S_n$ です。

積については

$$
(\alpha\beta)^{p^n}
=
\alpha^{p^n}\beta^{p^n}
=
\alpha\beta.
$$

従って $\alpha\beta\in S_n$ です。

最後に $\alpha\ne0$ なら

$$
(\alpha^{-1})^{p^n}
=
(\alpha^{p^n})^{-1}
=
\alpha^{-1}.
$$

従って $\alpha^{-1}\in S_n$ です。

以上から $S_n$ は部分体です。
<!-- proof-end -->

ここで、根全体が「偶然たくさんある集合」ではなく、それ自体で体になることが有限体構成の核心です。

---

## 5. 任意の素数冪に対して有限体が存在し、しかも一つしかない

<a id="thm-fld3-existence-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（位数 $p^n$ の有限体の存在と一意性）**
>
> 任意の素数 $p$ と正整数 $n$ に対し、位数 $p^n$ の有限体が存在する。
>
> また位数 $p^n$ の有限体は $\mathbb F_p$ 上の同型を除いて一意である。
>
> その同型類を
>
> $$
> \mathbb F_{p^n}
> $$
>
> と書く。
<!-- formal-statement-end -->

### 証明の見取り図

存在は

$$
f_n(x)=x^{p^n}-x
$$

の分解体を作ります。

この多項式の形式微分は

$$
f_n'(x)=-1
$$

なので重根がありません。分解体の中の根全体は前節の補題により体であり、分解体は根で生成されるので「分解体 = 根全体」です。次数が $p^n$ なので根はちょうど $p^n$ 個あります。

一意性は逆向きです。位数 $p^n$ の任意の有限体 $K$ では、非零元 $a$ に対し Lagrange の定理から

$$
a^{p^n-1}=1.
$$

従って全ての元が $x^{p^n}-x$ の根になり、$K$ 自身がその分解体です。FLD2 の分解体の一意性を使えば終わります。

<!-- proof-start -->
### 証明

#### 存在

$$
f_n(x)=x^{p^n}-x\in\mathbb F_p[x]
$$

とします。

[分解体の存在](../FLD2/index.md#thm-fld2-splitting-field-existence)により、$f_n$ の分解体 $L/\mathbb F_p$ が存在します。

形式微分は

$$
f_n'(x)
=
p^n x^{p^n-1}-1
=
-1
$$

です。従って [重根の形式微分判定](../FLD2/index.md#thm-fld2-repeated-root-gcd) により $f_n$ は重根を持ちません。

$L$ の中の $f_n$ の根全体を $S$ とします。[根全体は体](#lem-fld3-root-set-field)の証明と同じ計算により $S$ は $\mathbb F_p$ を含む部分体です。

一方 $L$ は $f_n$ の全ての根によって生成される分解体なので

$$
L\subset S.
$$

もちろん $S\subset L$ なので

$$
L=S.
$$

$f_n$ は $L$ 上で完全に分解し、重根を持たず、次数が $p^n$ です。従って $L$ にはちょうど $p^n$ 個の根があり、

$$
|L|=p^n.
$$

よって位数 $p^n$ の有限体が存在します。

#### 一意性

$K$ を位数 $p^n$ の有限体とします。[有限体の位数は素数冪](#thm-fld3-prime-power-cardinality)から標数は $p$ であり、$\mathbb F_p$ を素体として含みます。

$a\in K^\times$ とすると、有限群 $K^\times$ の位数は

$$
|K^\times|=p^n-1.
$$

[Lagrange の定理](../GRP2/index.md#thm-grp2-lagrange)から

$$
a^{p^n-1}=1.
$$

従って

$$
a^{p^n}=a.
$$

$a=0$ についても同じ等式が成り立つので、$K$ の全要素が $f_n(x)=x^{p^n}-x$ の根です。

$K$ には $p^n$ 個の元があり、$f_n$ の次数も $p^n$ なので、根全体はちょうど $K$ です。従って $K$ は $f_n$ の $\mathbb F_p$ 上の分解体です。

[分解体の同型を除く一意性](../FLD2/index.md#thm-fld2-splitting-field-uniqueness)から、位数 $p^n$ の有限体は $\mathbb F_p$ 上の同型を除いて一意です。
<!-- proof-end -->

### 5.1 「$\mathbb F_{p^n}$」は具体的な一個の集合名ではない

定理が保証するのは同型類の一意性です。

たとえば

$$
\mathbb F_4
\cong
\mathbb F_2[u]/(u^2+u+1)
$$

と作れます。一方、固定した代数閉包 $\overline{\mathbb F_2}$ の中では

$$
\mathbb F_4
=
\{\alpha\in\overline{\mathbb F_2}:\alpha^4=\alpha\}
$$

を標準的な代表として選べます。

以後、部分体関係を文字通りの包含として書くときは、この「同じ代数閉包の中の根全体」という代表を使います。

---

## 6. どの有限体がどの有限体の中に入るか

<a id="thm-fld3-subfield-criterion"></a>
<!-- formal-statement-start -->
> **定理（有限体の部分体判定）**
>
> 素数 $p$ と正整数 $m,n$ に対し、固定した代数閉包 $\overline{\mathbb F_p}$ の中で
>
> $$
> \mathbb F_{p^m}\subset\mathbb F_{p^n}
> $$
>
> となるための必要十分条件は
>
> $$
> m\mid n
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

包含があるなら塔の公式で

$$
n=[\mathbb F_{p^n}:\mathbb F_p]
=
[\mathbb F_{p^n}:\mathbb F_{p^m}]\,m
$$

だから $m\mid n$ です。

逆に $n=mr$ なら、$\alpha^{p^m}=\alpha$ を $r$ 回反復して

$$
\alpha^{p^n}=\alpha
$$

を得ます。従って $x^{p^m}-x$ の根は全て $x^{p^n}-x$ の根でもあります。

<!-- proof-start -->
### 証明

まず

$$
\mathbb F_{p^m}\subset\mathbb F_{p^n}
$$

と仮定します。

[拡大次数の塔の公式](../FLD1/index.md#thm-fld1-tower-law)から

$$
[\mathbb F_{p^n}:\mathbb F_p]
=
[\mathbb F_{p^n}:\mathbb F_{p^m}]
[\mathbb F_{p^m}:\mathbb F_p].
$$

左辺は $n$、右端の因子は $m$ なので

$$
n=
[\mathbb F_{p^n}:\mathbb F_{p^m}]\,m.
$$

従って $m\mid n$ です。

逆に $m\mid n$ とし

$$
n=mr
$$

と書きます。

$\alpha\in\mathbb F_{p^m}$ なら

$$
\alpha^{p^m}=\alpha.
$$

両辺へ $p^m$ 乗を繰り返すと

$$
\alpha^{p^{2m}}=\alpha,
\quad
\dots,
\quad
\alpha^{p^{rm}}=\alpha.
$$

すなわち

$$
\alpha^{p^n}=\alpha.
$$

固定した代数閉包の中で

$$
\mathbb F_{p^r}
=
\{\alpha:\alpha^{p^r}=\alpha\}
$$

と取っているので

$$
\mathbb F_{p^m}\subset\mathbb F_{p^n}.
$$
<!-- proof-end -->

### 6.1 例：$\mathbb F_{2^{12}}$ の部分体

$12$ の正の約数は

$$
1,2,3,4,6,12.
$$

従って $\mathbb F_{2^{12}}$ の部分体として現れる有限体は

$$
\mathbb F_2,\quad
\mathbb F_4,\quad
\mathbb F_8,\quad
\mathbb F_{16},\quad
\mathbb F_{64},\quad
\mathbb F_{4096}
$$

です。

「位数が $2^d$ なら何でも入る」のではなく、**指数 $d$ が $12$ を割ること**が条件です。

---

## 7. 相対 Frobenius は有限体拡大の周期を測る

$q=p^r$ とします。

$$
\mathbb F_q\subset\mathbb F_{q^m}
$$

では $p$ 乗 Frobenius を $r$ 回反復した

$$
x\longmapsto x^q
$$

が基礎体 $\mathbb F_q$ を各点で固定します。

<a id="thm-fld3-relative-frobenius"></a>
<!-- formal-statement-start -->
> **定理（相対 Frobenius 自己同型）**
>
> $q=p^r$ を素数冪、$m\ge1$ とする。
>
> $$
> \Phi_q:\mathbb F_{q^m}\to\mathbb F_{q^m},
> \qquad
> x\mapsto x^q
> $$
>
> は $\mathbb F_q$ を各点で固定する自己同型である。
>
> さらに $m>1$ なら $\Phi_q$ の位数はちょうど $m$ であり、その固定体は
>
> $$
> \operatorname{Fix}(\Phi_q)=\mathbb F_q
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi_q$ は $p$ 乗 Frobenius の $r$ 回反復なので自己同型です。

$\mathbb F_q$ の元は全て $x^q-x$ の根なので固定されます。

また $\mathbb F_{q^m}$ の全要素は

$$
x^{q^m}=x
$$

を満たすため

$$
\Phi_q^m=\operatorname{id}.
$$

もし $0<j<m$ で $\Phi_q^j=\operatorname{id}$ なら、$q^m$ 個の全要素が次数 $q^j$ の多項式 $x^{q^j}-x$ の根になり、根の個数が次数を超えて矛盾します。

<!-- proof-start -->
### 証明

$\Phi_q$ は

$$
\operatorname{Fr}_p^r
$$

なので、[有限体上の Frobenius 写像は自己同型](#thm-fld3-frobenius-automorphism)から自己同型です。

$a\in\mathbb F_q$ なら

$$
a^q=a
$$

なので $\Phi_q(a)=a$ です。従って $\Phi_q$ は $\mathbb F_q$ を各点で固定します。

任意の $x\in\mathbb F_{q^m}$ について

$$
x^{q^m}=x
$$

です。よって

$$
\Phi_q^m(x)=x,
$$

すなわち

$$
\Phi_q^m=\operatorname{id}.
$$

次に $0<j<m$ で

$$
\Phi_q^j=\operatorname{id}
$$

と仮定します。すると全ての $x\in\mathbb F_{q^m}$ が

$$
x^{q^j}=x
$$

を満たします。

しかし多項式

$$
x^{q^j}-x
$$

の次数は $q^j$ であり、

$$
q^j<q^m=|\mathbb F_{q^m}|.
$$

体上の非零多項式は次数を超える個数の根を持てないので矛盾です。従って $\Phi_q$ の位数は $m$ です。

最後に固定点は

$$
x^q=x
$$

を満たす元です。$\mathbb F_q$ の $q$ 個の元は全て固定点であり、一方 $x^q-x$ は次数 $q$ なので根は高々 $q$ 個です。従って固定点はちょうど $\mathbb F_q$ です。
<!-- proof-end -->

<a id="cor-fld3-finite-extension-separable-normal"></a>
<!-- formal-statement-start -->
> **系（有限体拡大は分離的かつ正規）**
>
> 任意の素数冪 $q$ と正整数 $m$ に対し、
>
> $$
> \mathbb F_{q^m}/\mathbb F_q
> $$
>
> は有限分離拡大かつ有限正規拡大である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbb F_{q^m}$ は

$$
x^{q^m}-x
$$

の $\mathbb F_q$ 上の分解体です。従って FLD2 の「有限正規拡大と分解体」から正規です。

分離性は、任意の元 $\alpha$ の最小多項式が $x^{q^m}-x$ を割ることと、その形式微分が $-1$ で重根を持たないことから出ます。

<!-- proof-start -->
### 証明

$$
f(x)=x^{q^m}-x\in\mathbb F_q[x]
$$

とします。

$\mathbb F_{q^m}$ の全要素は $f$ の根であり、その個数は $\deg f=q^m$ です。従って

$$
\mathbb F_{q^m}
$$

は $f$ の $\mathbb F_q$ 上の分解体です。

[有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence)から

$$
\mathbb F_{q^m}/\mathbb F_q
$$

は正規です。

次に $\alpha\in\mathbb F_{q^m}$ を任意に取ります。$\alpha$ の $\mathbb F_q$ 上の最小多項式を $m_\alpha(x)$ とすると、

$$
f(\alpha)=0
$$

なので [最小多項式の整除性](../FLD1/index.md#thm-fld1-minimal-polynomial)から

$$
m_\alpha(x)\mid f(x).
$$

一方

$$
f'(x)
=
q^m x^{q^m-1}-1
=
-1
$$

なので $f$ は重根を持ちません。従ってその因子 $m_\alpha$ も重根を持ちません。

よって全ての $\alpha$ が $\mathbb F_q$ 上分離的であり、

$$
\mathbb F_{q^m}/\mathbb F_q
$$

は分離拡大です。
<!-- proof-end -->

FLD4 では、有限拡大が「分離的かつ正規」であるときに Galois 拡大と呼び、自己同型群と中間体を一般に対応させます。本章で得た相対 Frobenius は、その最初の具体例になります。

---

## 8. 演習

### Level A

#### FLD3-A01 位数 $81$ の有限体
- Level: A

有限体 $K$ が

$$
|K|=81
$$

を満たすとする。

1. $K$ の標数を求めよ。
2. 素体を求めよ。
3. 素体上の拡大次数を求めよ。

<!-- solution-start -->
##### 詳細解答

$$
81=3^4
$$

です。

[有限体の位数は素数冪](#thm-fld3-prime-power-cardinality)より、有限体の位数は

$$
p^n
$$

の形であり、$p$ は標数です。

素因数分解の一意性から

$$
p=3,\qquad n=4.
$$

従って

$$
\boxed{\operatorname{char}K=3},
$$

素体は

$$
\boxed{\mathbb F_3},
$$

拡大次数は

$$
\boxed{[K:\mathbb F_3]=4}
$$

です。
<!-- solution-end -->

#### FLD3-A02 $\mathbb F_4$ の Frobenius
- Level: A

$$
K=\mathbb F_2[u]/(u^2+u+1)
$$

とし、$u$ の剰余類を $\alpha$ とする。

1. $K$ の四つの元を書け。
2. $\alpha^2$ と $\alpha^3$ を求めよ。
3. Frobenius 写像 $x\mapsto x^2$ の全ての元に対する像を求めよ。
4. $K^\times$ が巡回群であることを直接確認せよ。

<!-- solution-start -->
##### 詳細解答

1. 商環では次数 $2$ 未満の代表元を取れるので

$$
K=
\{0,1,\alpha,\alpha+1\}.
$$

2. 関係式

$$
\alpha^2+\alpha+1=0
$$

から、標数 $2$ では

$$
\alpha^2=\alpha+1.
$$

さらに

$$
\alpha^3
=
\alpha(\alpha+1)
=
\alpha^2+\alpha
=
(\alpha+1)+\alpha
=
1.
$$

3. 各元を二乗すると

$$
0^2=0,\qquad 1^2=1,
$$

$$
\alpha^2=\alpha+1,
$$

$$
(\alpha+1)^2
=
\alpha^2+1
=
(\alpha+1)+1
=
\alpha.
$$

従って Frobenius は

$$
\boxed{
0\mapsto0,\quad
1\mapsto1,\quad
\alpha\mapsto\alpha+1,\quad
\alpha+1\mapsto\alpha
}
$$

です。

4. 非零元は

$$
K^\times=\{1,\alpha,\alpha+1\}.
$$

$\alpha^3=1$ であり $\alpha\ne1$ なので $\alpha$ の位数は $3$ です。従って

$$
\boxed{K^\times=\langle\alpha\rangle}
$$

です。
<!-- solution-end -->

#### FLD3-A03 $x^{p^r}-x$ の根集合の閉性
- Level: A

標数 $p$ の体の拡大体 $L$ で

$$
S=\{a\in L:a^{p^r}=a\}
$$

とする。

$S$ が $0,1$ を含み、加法・加法逆元・乗法・非零元の逆元で閉じることを一つずつ示せ。

<!-- solution-start -->
##### 詳細解答

まず

$$
0^{p^r}=0,\qquad 1^{p^r}=1
$$

なので

$$
0,1\in S.
$$

$a,b\in S$ とすると、Frobenius の加法性を $r$ 回使って

$$
(a+b)^{p^r}
=
a^{p^r}+b^{p^r}
=
a+b.
$$

従って $a+b\in S$ です。

また

$$
(-a)^{p^r}
=
-a^{p^r}
=
-a,
$$

なので $-a\in S$ です。

積について

$$
(ab)^{p^r}
=
a^{p^r}b^{p^r}
=
ab,
$$

なので $ab\in S$ です。

$a\ne0$ なら

$$
(a^{-1})^{p^r}
=
(a^{p^r})^{-1}
=
a^{-1},
$$

なので $a^{-1}\in S$ です。

従って $S$ は体の演算で閉じています。
<!-- solution-end -->

#### FLD3-A04 $\mathbb F_2$ 上で $x^8-x$ を分解する
- Level: A

$\mathbb F_2[x]$ で

$$
x^8-x
$$

を既約多項式の積へ分解せよ。

<!-- solution-start -->
##### 詳細解答

標数 $2$ なので

$$
x^8-x=x^8+x.
$$

まず一次因子は $x=0,1$ から

$$
x,\qquad x+1
$$

です。

三次多項式

$$
f(x)=x^3+x+1,
\qquad
g(x)=x^3+x^2+1
$$

は

$$
f(0)=1,\quad f(1)=1,
$$

$$
g(0)=1,\quad g(1)=1
$$

なので $\mathbb F_2$ に根を持ちません。三次多項式が可約なら一次因子を持つため、$f,g$ はともに既約です。

積を計算すると

$$
f(x)g(x)
=
x^6+x^5+x^4+x^3+x^2+x+1.
$$

さらに

$$
x(x+1)=x^2+x.
$$

従って

$$
(x^2+x)
(x^6+x^5+x^4+x^3+x^2+x+1)
=
x^8+x.
$$

よって

$$
\boxed{
x^8-x
=
x(x+1)(x^3+x+1)(x^3+x^2+1)
}.
$$
<!-- solution-end -->

### Level B

#### FLD3-B01 $\mathbb F_9^\times$ の生成元
- Level: B

$$
K=\mathbb F_3[u]/(u^2+1)
$$

とし、$u$ の剰余類を $\alpha$ とする。

1. $u^2+1$ が $\mathbb F_3[x]$ で既約であることを示せ。
2. $K$ が $9$ 元体であることを示せ。
3. $\beta=1+\alpha$ の位数を求め、$K^\times$ の生成元であることを示せ。

<!-- solution-start -->
##### 詳細解答

1. 二次多項式は根を持つとき、かつそのときに限り可約です。

$\mathbb F_3=\{0,1,2\}$ で

$$
0^2+1=1,
$$

$$
1^2+1=2,
$$

$$
2^2+1=5\equiv2\pmod3.
$$

いずれも $0$ ではないので $u^2+1$ は根を持ちません。従って既約です。

2. 既約二次多項式で割っているので $K$ は体です。また各元は一意に

$$
a+b\alpha,
\qquad
a,b\in\mathbb F_3
$$

と書けます。

$a,b$ に各 $3$ 通りあるので

$$
|K|=3^2=9.
$$

3. 商環の関係式から

$$
\alpha^2=-1=2.
$$

$\beta=1+\alpha$ とすると

$$
\beta^2
=
1+2\alpha+\alpha^2
=
1+2\alpha+2
=
2\alpha
=
-\alpha.
$$

従って

$$
\beta^4
=
(-\alpha)^2
=
\alpha^2
=
2
\ne1.
$$

さらに

$$
\beta^8
=
(\beta^4)^2
=
2^2
=
4
=
1.
$$

$K^\times$ の位数は $8$ です。$\beta^4\ne1$ なので $\beta$ の位数は $1,2,4$ のいずれでもなく、$\beta^8=1$ なので

$$
\operatorname{ord}(\beta)=8.
$$

従って

$$
\boxed{K^\times=\langle1+\alpha\rangle}.
$$
<!-- solution-end -->

#### FLD3-B02 商体から $\mathbb F_{16}$ を作る
- Level: B

$$
f(x)=x^4+x+1\in\mathbb F_2[x]
$$

とする。

1. $f$ が既約であることを示せ。
2. $K=\mathbb F_2[x]/(f)$ が $16$ 元体であることを示せ。
3. $x$ の剰余類を $\alpha$ とし、
   $$
   \alpha,\ \alpha^2,\ \alpha^4,\ \alpha^8,\ \alpha^{16}
   $$
   を $\{1,\alpha,\alpha^2,\alpha^3\}$ の線形結合として書け。
4. Frobenius $z\mapsto z^2$ の $\alpha$ に対する軌道の長さが $4$ であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

1. まず

$$
f(0)=1,\qquad f(1)=1+1+1=1
$$

なので一次因子を持ちません。

$\mathbb F_2[x]$ のモニック二次多項式で定数項が $1$ のものは

$$
x^2+1,
\qquad
x^2+x+1
$$

です。このうち

$$
x^2+1=(x+1)^2
$$

は可約で、$x^2+x+1$ は $0,1$ のどちらも根に持たないので既約です。従ってモニック既約二次多項式は $x^2+x+1$ だけです。

もし $f$ が一次因子を持たずに可約なら、二つの既約二次多項式の積でなければならないので

$$
f=(x^2+x+1)^2
$$

となるはずです。

しかし標数 $2$ では

$$
(x^2+x+1)^2
=
x^4+x^2+1
\ne
x^4+x+1.
$$

従って $f$ は既約です。

2. [既約多項式から体を作る構成](../FLD1/index.md#prop-fld1-irreducible-quotient-construction)により $K$ は体です。

各剰余類は一意に

$$
a_0+a_1\alpha+a_2\alpha^2+a_3\alpha^3,
\qquad
a_i\in\mathbb F_2
$$

と書けるので

$$
|K|=2^4=16.
$$

従って存在一意性から

$$
K\cong\mathbb F_{16}.
$$

3. 関係式

$$
\alpha^4+\alpha+1=0
$$

から

$$
\alpha^4=\alpha+1.
$$

よって

$$
\alpha^8
=
(\alpha+1)^2
=
\alpha^2+1.
$$

さらに

$$
\alpha^{16}
=
(\alpha^2+1)^2
=
\alpha^4+1
=
(\alpha+1)+1
=
\alpha.
$$

従って

$$
\boxed{
\alpha\mapsto
\alpha^2\mapsto
\alpha+1\mapsto
\alpha^2+1\mapsto
\alpha
}
$$

です。

4. 上の四つ

$$
\alpha,\quad
\alpha^2,\quad
\alpha+1,\quad
\alpha^2+1
$$

は互いに異なります。従って $\alpha$ の Frobenius 軌道の長さは

$$
\boxed{4}
$$

です。
<!-- solution-end -->

#### FLD3-B03 $\mathbb F_{2^{12}}$ の全部分体
- Level: B

$$
K=\mathbb F_{2^{12}}
$$

とする。

1. $K$ の部分体の位数として可能なものを全て求めよ。
2. 各可能な位数について、その部分体が $K$ の中で一意であることを示せ。

<!-- solution-start -->
##### 詳細解答

1. $E\subset K$ を部分体とします。

有限体なので

$$
|E|=2^d
$$

と書けます。

塔の公式から

$$
12
=
[K:\mathbb F_2]
=
[K:E][E:\mathbb F_2]
=
[K:E]\,d.
$$

従って

$$
d\mid12.
$$

$12$ の正の約数は

$$
1,2,3,4,6,12.
$$

よって可能な位数は

$$
\boxed{
2,\ 4,\ 8,\ 16,\ 64,\ 4096
}.
$$

2. $d\mid12$ とします。

[有限体の部分体判定](#thm-fld3-subfield-criterion)から

$$
\mathbb F_{2^d}\subset\mathbb F_{2^{12}}.
$$

一方、$K$ の中で位数 $2^d$ の部分体 $E$ があれば、その全要素は

$$
x^{2^d}=x
$$

を満たします。

多項式

$$
x^{2^d}-x
$$

は重根を持たず、根はちょうど $2^d$ 個です。$\mathbb F_{2^d}$ の全要素がその根なので、$K$ の中の根全体はちょうど $\mathbb F_{2^d}$ です。

$E$ も $2^d$ 個の根全てからなるため

$$
E=\mathbb F_{2^d}.
$$

従って各 $d\mid12$ について部分体は一意です。
<!-- solution-end -->

### Level C

#### FLD3-C01 $\mathbb F_{64}$ の部分体・乗法群・相対 Frobenius
- Level: C

$$
K=\mathbb F_{64}=\mathbb F_{2^6}
$$

とし、

$$
E=\{x\in K:x^8=x\},
\qquad
H=\{x\in K:x^4=x\}
$$

とする。

1. $E$ と $H$ を有限体として同定せよ。
2. $E\cap H$ を求めよ。
3. $g$ を $K^\times$ の生成元とする。$E^\times$ と $H^\times$ を $g$ の冪で表せ。
4.
   $$
   \Phi(x)=x^8
   $$
   が $E$ を固定する $K$ の自己同型で、位数 $2$ を持つことを示せ。
5. $\Phi$ の固定体が $E$ であることを示せ。
6. $K/E$ が分離的かつ正規であることを示せ。

<!-- solution-start -->
##### 詳細解答

1. $E$ は $x^8-x=x^{2^3}-x$ の $K$ 内の根全体です。

$3\mid6$ なので [有限体の部分体判定](#thm-fld3-subfield-criterion)から

$$
\mathbb F_8\subset K.
$$

$\mathbb F_8$ の全要素は $x^8=x$ を満たし、その個数は $8$ です。一方 $x^8-x$ の根は高々 $8$ 個なので

$$
\boxed{E=\mathbb F_8}.
$$

同様に $2\mid6$ だから

$$
\boxed{H=\mathbb F_4}.
$$

2. $E\cap H$ も有限体で $\mathbb F_2$ を含みます。

$$
[E:\mathbb F_2]=3,
\qquad
[H:\mathbb F_2]=2.
$$

$E\cap H$ の $\mathbb F_2$ 上の次数を $d$ とすると、塔の公式により $d$ は $3$ と $2$ の両方を割ります。従って

$$
d=1.
$$

よって

$$
\boxed{E\cap H=\mathbb F_2}.
$$

3. $K^\times$ の位数は

$$
64-1=63.
$$

$E^\times$ の位数は $7$ です。巡回群 $\langle g\rangle$ の中で

$$
g^9
$$

の位数は

$$
\frac{63}{\gcd(63,9)}
=
\frac{63}{9}
=
7.
$$

従って

$$
\boxed{E^\times=\langle g^9\rangle}.
$$

同様に $H^\times$ の位数は $3$ であり、

$$
\operatorname{ord}(g^{21})
=
\frac{63}{\gcd(63,21)}
=
3.
$$

従って

$$
\boxed{H^\times=\langle g^{21}\rangle}.
$$

4. $8=2^3$ なので

$$
\Phi(x)=x^8
$$

は $2$ 乗 Frobenius の三回反復です。従って自己同型です。

$E=\mathbb F_8$ の元 $a$ は

$$
a^8=a
$$

を満たすので $\Phi$ は $E$ を各点で固定します。

また $K=\mathbb F_{8^2}$ なので、[相対 Frobenius 自己同型](#thm-fld3-relative-frobenius)から $\Phi$ の位数は

$$
\boxed{2}
$$

です。

直接にも

$$
\Phi^2(x)=x^{64}=x
$$

が全ての $x\in K$ で成り立ちます。一方 $\Phi$ が恒等写像なら $64$ 個の元が次数 $8$ の多項式 $x^8-x$ の根になってしまうので不可能です。

5. $\Phi(x)=x$ は

$$
x^8=x
$$

と同値です。従って固定点全体は定義そのものから

$$
\boxed{\operatorname{Fix}(\Phi)=E}
$$

です。

6. $K$ の全要素は

$$
x^{64}=x
$$

を満たします。従って $K$ は

$$
x^{64}-x
$$

の $E$ 上の分解体です。よって FLD2 の [有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence)から $K/E$ は正規です。

また

$$
(x^{64}-x)'=-1
$$

なのでこの多項式は重根を持ちません。

任意の $\alpha\in K$ の $E$ 上の最小多項式は $x^{64}-x$ を割るため重根を持たず、$\alpha$ は $E$ 上分離的です。

従って

$$
\boxed{K/E\text{ は分離的かつ正規}}
$$

です。

FLD4 では、この状況を有限 Galois 拡大として一般化し、$\Phi$ が自己同型群をどう生成するかを中間体との対応まで含めて調べます。
<!-- solution-end -->

---

## 9. まとめ

本章の主線は次の通りです。

1. 有限体の標数は素数 $p$ で、その素体は $\mathbb F_p$ である。
2. 有限体は素体上の有限次元ベクトル空間なので、位数は必ず $p^n$ になる。
3. 標数 $p$ では Frobenius 写像 $x\mapsto x^p$ が単射な体準同型になり、有限体では自己同型になる。
4. 有限体の乗法群は巡回群であり、非零元は一つの生成元の冪で全て表せる。
5. $x^{p^n}-x$ の根全体は体をなし、その分解体として位数 $p^n$ の有限体が存在する。
6. 任意の位数 $p^n$ の有限体は $x^{p^n}-x$ の分解体なので、分解体の一意性から $\mathbb F_{p^n}$ は同型を除いて一意である。
7. $\mathbb F_{p^m}\subset\mathbb F_{p^n}$ となるための必要十分条件は $m\mid n$ である。
8. $\mathbb F_{q^m}/\mathbb F_q$ の相対 Frobenius $x\mapsto x^q$ は位数 $m$ を持ち、固定体は $\mathbb F_q$ である。
9. 有限体拡大は分離的かつ正規であり、FLD4 の有限 Galois 理論の最初の具体例になる。

次の FLD4 では、有限 Galois 拡大、Galois 群、固定体、中間体と部分群の対応へ進みます。
