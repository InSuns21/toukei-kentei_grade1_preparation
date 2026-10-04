# NSA5 無限小・有限超実数・標準部

<!-- definition-example-audit: strict -->

NSA1 では正の非零無限小と無限大超実数を実際に作り、NSA4 では無限小全体と有限超実数全体が内部集合ではないことを確認しました。ここまでで「標準実数のすぐ近くに、標準実数ではない超実数が大量にある」ことは見えています。

しかし解析に使うには、もう一つ道具が必要です。例えば

$$
3+\varepsilon
$$

が $3$ に限りなく近いとしても、「限りなく近い」を記号化するだけでは通常の実数へ戻れません。無限小のずれを持つ有限超実数から、対応する標準実数を一意に取り出せることを証明する必要があります。

この章では

$$
\text{有限超実数}
\longrightarrow
\text{無限小近接 } \approx
\longrightarrow
\text{標準部 } \operatorname{st}
$$

という流れを作ります。核心は、有限超実数 $x$ に対して標準実数だけから集合を作り、**実数の上限性質**を使って $x$ に無限小だけ近い実数を構成することです。超実数体そのものが Dedekind 完備だとは仮定しません。

---

## 1. 有限超実数は「標準的な大きさの窓」に入る

NSA1 で定義した無限大超実数は、どの標準正実数よりも絶対値が大きい超実数でした。解析で標準部を取れるのは、その反対側にある「標準実数で大きさを抑えられる」超実数です。

<a id="def-nsa5-limited-hyperreal"></a>
<!-- formal-statement-start -->
### 定義（有限超実数）

超実数 $x\in{}^*\mathbb R$ が**有限超実数**であるとは、ある標準実数 $M>0$ が存在して

$$
|x|<M
$$

となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-limited-hyperreal -->
**定義の確認**。NSA1 の正の無限小

$$
\varepsilon=\left[\frac1{n+1}\right]
$$

を使います。

無限小性から特に

$$
|\varepsilon|<1.
$$

従って

$$
|3+\varepsilon|
\le 3+|\varepsilon|
<4.
$$

よって $3+\varepsilon$ は有限超実数です。

一方、

$$
H=[n+1]
$$

は任意の標準 $M>0$ より大きいので有限超実数ではありません。
<!-- definition-example-end -->

有限という語は「代表列が有界」という意味ではありません。例えば、ある集合 $E\in\mathcal U$ の上では $x_n=0$、補集合上では $x_n=n$ とした列は、超実数としては $0$ と同じ元を表します。有限性は**同値類としての超実数の性質**です。

<a id="prop-nsa5-limited-vs-infinite"></a>
<!-- formal-statement-start -->
### 命題（有限でない超実数は無限大である）

超実数 $x$ について、次は同値である。

1. $x$ は有限超実数ではない。
2. $x$ は NSA1 の意味で無限大超実数である。
<!-- formal-statement-end -->

### 証明の見取り図

有限でないとは「標準正実数による上界が一つもない」ということです。無限大の定義は「任意の標準正実数を越える」です。等号の可能性だけ、少し大きい標準数を挟んで除きます。

<!-- proof-start -->
### 証明

まず $x$ が無限大超実数なら、任意の標準 $M>0$ に対し

$$
|x|>M.
$$

従って $|x|<M$ となる標準 $M$ は存在せず、$x$ は有限ではありません。

逆に $x$ が有限でないとします。標準実数 $r>0$ を任意に取ります。

$r+1$ も標準正実数です。有限でないという仮定から

$$
|x|<r+1
$$

は成り立ちません。全順序性から

$$
|x|\ge r+1>r.
$$

従って任意の標準 $r>0$ に対して $|x|>r$ です。よって $x$ は無限大超実数です。
<!-- proof-end -->

これで超実数は

$$
\text{有限}
\qquad\text{または}\qquad
\text{無限大}
$$

のどちらかに分かれます。次に、有限超実数同士が「無限小だけ違う」ことを表す記号を導入します。

---

## 2. 無限小だけ違う二つの数を $x\approx y$ と書く

普通の等号では

$$
3+\varepsilon\ne3
$$

です。しかし差は無限小です。極限・連続・微分を超準的に書くとき、この関係を何度も使います。

<a id="def-nsa5-infinitesimal-closeness"></a>
<!-- formal-statement-start -->
### 定義（無限小近接）

超実数 $x,y\in{}^*\mathbb R$ に対し

$$
x\approx y
$$

とは、差

$$
x-y
$$

が無限小であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-infinitesimal-closeness -->
**定義の確認**。$\varepsilon$ を正の非零無限小とすると

$$
3+\varepsilon\approx3
$$

です。実際、

$$
(3+\varepsilon)-3=\varepsilon
$$

が無限小だからです。

一方、

$$
3+\varepsilon\not\approx4.
$$

もし $3+\varepsilon\approx4$ なら

$$
1-\varepsilon
$$

が無限小になります。しかし $|\varepsilon|<1/2$ なので

$$
|1-\varepsilon|
\ge 1-|\varepsilon|
>\frac12,
$$

となり、無限小の定義に反します。
<!-- definition-example-end -->

無限小近接を計算で使うには、無限小の和や有限超実数との積が再び無限小になることを確認しておく必要があります。

<a id="lem-nsa5-infinitesimal-arithmetic"></a>
<!-- formal-statement-start -->
### 補題（無限小の基本演算）

$\alpha,\beta$ を無限小、$x$ を有限超実数とする。このとき

$$
\alpha+\beta,\qquad
-\alpha,\qquad
x\alpha
$$

はいずれも無限小である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の標準誤差 $r>0$ を固定します。和には $r/2$、積には有限性から得た標準上界 $M$ を使って $r/M$ を無限小の定義へ入れます。

<!-- proof-start -->
### 証明

まず $\alpha+\beta$ を考えます。標準実数 $r>0$ を任意に取ります。

$\alpha,\beta$ は無限小なので、標準正実数 $r/2$ に対して

$$
|\alpha|<\frac r2,
\qquad
|\beta|<\frac r2.
$$

従って三角不等式から

$$
|\alpha+\beta|
\le|\alpha|+|\beta|
<r.
$$

$r$ は任意なので $\alpha+\beta$ は無限小です。

符号反転については

$$
|-\alpha|=|\alpha|
$$

なので直ちに無限小です。

最後に $x\alpha$ を考えます。$x$ は有限なので、ある標準 $M>0$ が存在して

$$
|x|<M.
$$

標準 $r>0$ に対し $r/M>0$ も標準実数です。$\alpha$ の無限小性から

$$
|\alpha|<\frac rM.
$$

従って

$$
|x\alpha|
=
|x||\alpha|
<
M\frac rM
=
r.
$$

$r$ は任意なので $x\alpha$ は無限小です。
<!-- proof-end -->

<a id="prop-nsa5-approx-equivalence"></a>
<!-- formal-statement-start -->
### 命題（無限小近接は同値関係である）

$\,{}^*\mathbb R$ 上の関係 $\approx$ は反射的・対称的・推移的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反射性は

$$
x-x=0
$$

が無限小であることから従います。

対称性は $x\approx y$ なら $x-y$ が無限小であり、補題から

$$
y-x=-(x-y)
$$

も無限小であることから従います。

推移性は $x\approx y$、$y\approx z$ のとき

$$
x-z=(x-y)+(y-z)
$$

が二つの無限小の和なので無限小であることから従います。
<!-- proof-end -->

---

## 3. monad は「一つの標準点の無限小近傍」

$x\approx a$ を満たす点をまとめて眺めると、標準実数 $a$ の周囲に無限小幅の雲があるように見えます。この集合を後続章で何度も使います。

<a id="def-nsa5-monad"></a>
<!-- formal-statement-start -->
### 定義（monad / halo）

標準実数 $a\in\mathbb R$ に対し

$$
\mu(a)
=
\{x\in{}^*\mathbb R:x\approx a\}
$$

を $a$ の**monad** または **halo** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-monad -->
**定義の確認**。$\varepsilon$ が無限小なら

$$
a+2\varepsilon\in\mu(a)
$$

です。差は

$$
(a+2\varepsilon)-a=2\varepsilon
$$

であり、標準実数 $2$ は有限超実数なので、前節の補題から $2\varepsilon$ は無限小です。
<!-- definition-example-end -->

特に

$$
\mu(0)
$$

は NSA4 で外部集合だと示した無限小全体そのものです。また

$$
\mu(a)=a+\mu(0)
$$

なので、monad は通常の正半径近傍とは違い、内部集合として扱う対象ではありません。


---

## 4. 有限超実数から標準実数を取り出したい

ここからがこの章の核心です。

有限超実数

$$
x=3+\varepsilon
$$

なら標準実数 $3$ が見えています。しかし一般の有限超実数 $x=[x_n]$ について、代表列が収束するとは限りません。それでも超実数としての $x$ には、無限小だけ離れた標準実数が一つだけ存在します。

代表列の極限を探すのではなく、超実数 $x$ より下にある**標準実数だけ**を集めます。

$$
A_x
=
\{r\in\mathbb R:r\le x\}.
$$

$x$ が有限なら、$A_x$ は空でなく上に有界です。そこで標準実数の上限を取れます。

<a id="thm-nsa5-standard-part-existence-uniqueness"></a>
<!-- formal-statement-start -->
### 定理（標準部の存在と一意性）

任意の有限超実数 $x\in{}^*\mathbb R$ に対し、ある標準実数 $s\in\mathbb R$ がただ一つ存在して

$$
x\approx s
$$

となる。
<!-- formal-statement-end -->

### 証明の見取り図

有限性から標準 $M>0$ を取り、

$$
-M<x<M
$$

とします。標準実数集合

$$
A_x=\{r\in\mathbb R:r\le x\}
$$

は $-M$ を含み、$M$ で上から抑えられるので、実数の上限性質から

$$
s=\sup A_x
$$

が存在します。

あとは任意の標準 $\varepsilon>0$ に対して

$$
s-\varepsilon<x<s+\varepsilon
$$

を示します。左側は「$s-\varepsilon$ は上界ではない」こと、右側は「もし $x\ge s+\varepsilon$ なら $s+\varepsilon/2$ が $A_x$ に入ってしまう」ことから出ます。

<!-- proof-start -->
### 証明

$x$ は有限なので、ある標準実数 $M>0$ が存在して

$$
|x|<M.
$$

従って

$$
-M<x<M.
$$

標準実数の集合

$$
A_x
=
\{r\in\mathbb R:r\le x\}
$$

を考えます。

まず $-M<x$ なので

$$
-M\in A_x.
$$

従って $A_x$ は空ではありません。

また $r\in A_x$ なら

$$
r\le x<M,
$$

なので $r<M$ です。従って $M$ は $A_x$ の上界です。

よって [実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub)から、標準実数

$$
s=\sup A_x
$$

が存在します。

ここで標準実数 $\varepsilon>0$ を任意に取ります。

まず下側を示します。$s-\varepsilon<s$ なので、$s-\varepsilon$ は $A_x$ の上界ではありません。従って、ある $r\in A_x$ が存在して

$$
s-\varepsilon<r.
$$

$r\in A_x$ だから $r\le x$ です。よって

$$
s-\varepsilon<r\le x,
$$

したがって

$$
s-\varepsilon<x.
$$

次に上側を示します。反対に

$$
x\ge s+\varepsilon
$$

と仮定します。

標準実数

$$
t=s+\frac{\varepsilon}{2}
$$

を取ると

$$
t<s+\varepsilon\le x.
$$

従って $t\in A_x$ です。

しかし

$$
t=s+\frac{\varepsilon}{2}>s
$$

なので、$s$ が $A_x$ の上界であることに反します。従って

$$
x<s+\varepsilon.
$$

以上から

$$
s-\varepsilon<x<s+\varepsilon.
$$

両辺から $s$ を引くと

$$
-\varepsilon<x-s<\varepsilon,
$$

すなわち

$$
|x-s|<\varepsilon.
$$

$\varepsilon>0$ は任意の標準実数だったので、$x-s$ は無限小です。従って

$$
x\approx s.
$$

次に一意性を示します。標準実数 $s,t$ が

$$
x\approx s,
\qquad
x\approx t
$$

を満たすとします。

対称性と推移性から

$$
s\approx t.
$$

従って標準実数 $s-t$ が無限小です。

もし $s\ne t$ なら

$$
d=|s-t|>0
$$

は標準正実数です。しかし $s-t$ が無限小なら、その定義を標準正実数 $d$ 自身に適用して

$$
|s-t|<d
$$

を得ます。左辺は $d$ なので

$$
d<d
$$

となり矛盾です。

従って $s=t$ です。
<!-- proof-end -->

証明で完備性を使った場所は一箇所だけです。

$$
A_x\subseteq\mathbb R
\quad\Longrightarrow\quad
s=\sup A_x\in\mathbb R
$$

という**標準実数の上限性質**です。

超実数の部分集合

$$
B\subseteq{}^*\mathbb R
$$

に対して上限を取ったわけではありません。したがって、この証明から $\,{}^*\mathbb R$ が Dedekind 完備だとは言えません。

---

## 5. 一意な標準実数を標準部と呼ぶ

前節で存在と一意性が証明できたので、有限超実数から標準実数を取り出す操作を定義できます。

<a id="def-nsa5-standard-part"></a>
<!-- formal-statement-start -->
### 定義（標準部）

有限超実数 $x$ に対し、

$$
x\approx r
$$

を満たす唯一の標準実数 $r$ を $x$ の**標準部**といい、

$$
\operatorname{st}(x)=r
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa5-standard-part -->
**定義の確認**。$\varepsilon$ を無限小とします。

$$
3+\varepsilon\approx3
$$

なので

$$
\operatorname{st}(3+\varepsilon)=3.
$$

また

$$
-2+5\varepsilon\approx-2
$$

だから

$$
\operatorname{st}(-2+5\varepsilon)=-2.
$$

標準実数 $r$ 自身については

$$
r-r=0
$$

が無限小なので

$$
\operatorname{st}(r)=r.
$$
<!-- definition-example-end -->

標準部は「無限小を勝手に捨てる規則」ではありません。存在定理と一意性定理によって正当化された写像です。

<a id="prop-nsa5-standard-part-zero"></a>
<!-- formal-statement-start -->
### 命題（標準部が 0 であることと無限小であること）

有限超実数 $x$ について、次は同値である。

$$
\operatorname{st}(x)=0
$$

$$
x\text{ は無限小である}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\operatorname{st}(x)=0$ なら、標準部の定義から

$$
x\approx0.
$$

従って $x-0=x$ は無限小です。

逆に $x$ が無限小なら

$$
x\approx0.
$$

標準部の一意性から

$$
\operatorname{st}(x)=0.
$$
<!-- proof-end -->

---

## 6. 標準部は加法・乗法を保つ

標準部を微分や積分で使うには、式を計算してから最後に標準部を取ってよいことが重要です。そのために有限超実数同士の和・積が有限であることから確認します。

<a id="lem-nsa5-limited-arithmetic"></a>
<!-- formal-statement-start -->
### 補題（有限超実数は加法・乗法で閉じる）

$x,y$ が有限超実数なら

$$
x+y,\qquad
-x,\qquad
xy
$$

も有限超実数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x,y$ が有限なので、標準実数 $M,N>0$ が存在して

$$
|x|<M,
\qquad
|y|<N.
$$

和について

$$
|x+y|
\le|x|+|y|
<M+N.
$$

$M+N$ は標準正実数なので $x+y$ は有限です。

符号反転は

$$
|-x|=|x|<M
$$

から有限です。

積について

$$
|xy|
=
|x||y|
<
MN.
$$

$MN$ は標準正実数なので $xy$ も有限です。
<!-- proof-end -->

<a id="thm-nsa5-standard-part-arithmetic"></a>
<!-- formal-statement-start -->
### 定理（標準部は加法・乗法を保つ）

$x,y$ を有限超実数とする。このとき

$$
\operatorname{st}(x+y)
=
\operatorname{st}(x)+\operatorname{st}(y),
$$

$$
\operatorname{st}(xy)
=
\operatorname{st}(x)\operatorname{st}(y).
$$

また

$$
\operatorname{st}(-x)
=
-\operatorname{st}(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$r=\operatorname{st}(x)$、$s=\operatorname{st}(y)$ と置きます。

$$
x=r+\alpha,
\qquad
y=s+\beta
$$

と書けば $\alpha,\beta$ は無限小です。和では誤差が $\alpha+\beta$、積では

$$
xy-rs=r\beta+s\alpha+\alpha\beta
$$

となります。標準実数 $r,s$ は有限で、無限小と有限超実数の積は無限小なので、どちらも標準部分から無限小しかずれません。

<!-- proof-start -->
### 証明

$$
r=\operatorname{st}(x),
\qquad
s=\operatorname{st}(y)
$$

と置きます。

標準部の定義から

$$
\alpha=x-r,
\qquad
\beta=y-s
$$

は無限小です。従って

$$
x=r+\alpha,
\qquad
y=s+\beta.
$$

まず和について

$$
(x+y)-(r+s)
=
\alpha+\beta.
$$

無限小の基本演算から $\alpha+\beta$ は無限小なので

$$
x+y\approx r+s.
$$

$r+s$ は標準実数です。標準部の一意性から

$$
\operatorname{st}(x+y)=r+s.
$$

次に積を展開します。

$$
xy
=
(r+\alpha)(s+\beta)
=
rs+r\beta+s\alpha+\alpha\beta.
$$

従って

$$
xy-rs
=
r\beta+s\alpha+\alpha\beta.
$$

$r,s,\alpha$ はいずれも有限超実数です。無限小の基本演算から

$$
r\beta,\qquad
s\alpha,\qquad
\alpha\beta
$$

は全て無限小です。有限個の無限小の和も無限小なので

$$
xy-rs
$$

は無限小です。

従って

$$
xy\approx rs.
$$

$rs$ は標準実数なので一意性から

$$
\operatorname{st}(xy)=rs.
$$

最後に $x\approx r$ なら

$$
(-x)-(-r)=-(x-r)
$$

は無限小です。従って

$$
\operatorname{st}(-x)=-r.
$$
<!-- proof-end -->

<a id="cor-nsa5-standard-part-polynomial"></a>
<!-- formal-statement-start -->
### 系（標準係数多項式と標準部）

標準実係数多項式 $p$ と有限超実数 $x$ に対し

$$
\operatorname{st}({}^*p(x))
=
p(\operatorname{st}(x)).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

多項式を

$$
p(t)=a_0+a_1t+\cdots+a_dt^d
$$

と書きます。係数 $a_j$ は標準実数なので

$$
\operatorname{st}(a_j)=a_j.
$$

前定理の加法・乗法保存を有限回繰り返すと

$$
\operatorname{st}
\left(
a_0+a_1x+\cdots+a_dx^d
\right)
=
a_0+a_1\operatorname{st}(x)+\cdots+a_d\operatorname{st}(x)^d.
$$

右辺は

$$
p(\operatorname{st}(x))
$$

です。
<!-- proof-end -->

---

## 7. 順序について標準部が何を保存するか

無限小近接では、正負の情報が一部消えることがあります。例えば正の無限小 $\varepsilon$ は

$$
\varepsilon>0
$$

ですが

$$
\operatorname{st}(\varepsilon)=0.
$$

従って「$x>0$ なら標準部も正」という強い主張は偽です。一方、弱い順序は保存されます。

<a id="prop-nsa5-standard-part-monotone"></a>
<!-- formal-statement-start -->
### 命題（標準部の単調性）

有限超実数 $x,y$ が

$$
x\le y
$$

を満たすなら

$$
\operatorname{st}(x)
\le
\operatorname{st}(y).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
r=\operatorname{st}(x),
\qquad
s=\operatorname{st}(y)
$$

とします。

反対に $r>s$ と仮定します。標準正実数

$$
\delta=\frac{r-s}{3}>0
$$

を取ります。

$x\approx r$ なので

$$
|x-r|<\delta,
$$

したがって

$$
x>r-\delta.
$$

同様に $y\approx s$ なので

$$
|y-s|<\delta,
$$

したがって

$$
y<s+\delta.
$$

ところが

$$
(r-\delta)-(s+\delta)
=
r-s-2\delta
=
\frac{r-s}{3}
>0.
$$

従って

$$
x>r-\delta>s+\delta>y,
$$

となり $x\le y$ に矛盾します。

よって $r\le s$ です。
<!-- proof-end -->

この命題では、**狭義不等号は一般に保存されない**ことが重要です。

$$
0<\varepsilon
$$

でも

$$
\operatorname{st}(0)=\operatorname{st}(\varepsilon)=0.
$$

---

## 8. 割り算では分母の標準部が 0 でないことが必要

後続の微分では差分商を扱います。標準部と割り算を交換するには、分母が 0 に無限小近接していないことが必要です。

<a id="prop-nsa5-standard-part-quotient"></a>
<!-- formal-statement-start -->
### 命題（標準部と商）

$x,y$ を有限超実数とし

$$
\operatorname{st}(y)\ne0
$$

とする。このとき $y\ne0$ かつ $x/y$ は有限であり、

$$
\operatorname{st}\left(\frac{x}{y}\right)
=
\frac{\operatorname{st}(x)}{\operatorname{st}(y)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$s=\operatorname{st}(y)\ne0$ なら $y\approx s$ です。$|s|/2$ は標準正実数なので、$y$ は $0$ から少なくとも $|s|/2$ だけ離れています。従って $1/y$ は有限です。

<!-- proof-start -->
### 証明

$$
r=\operatorname{st}(x),
\qquad
s=\operatorname{st}(y)\ne0
$$

と置きます。

$y\approx s$ なので、標準正実数 $|s|/2$ に対して

$$
|y-s|<\frac{|s|}{2}.
$$

逆三角不等式から

$$
|y|
\ge
|s|-|y-s|
>
\frac{|s|}{2}
>0.
$$

従って $y\ne0$ であり

$$
\left|\frac1y\right|
<
\frac2{|s|}.
$$

右辺は標準実数なので $1/y$ は有限です。従って $x/y=x(1/y)$ も有限です。

次に

$$
\frac1y-\frac1s
=
\frac{s-y}{sy}.
$$

分子 $s-y$ は無限小です。分母の逆数

$$
\frac1{sy}
=
\frac1s\frac1y
$$

は有限なので、無限小の基本演算から右辺は無限小です。従って

$$
\frac1y\approx\frac1s.
$$

よって

$$
\operatorname{st}\left(\frac1y\right)=\frac1s.
$$

積の保存を使えば

$$
\operatorname{st}\left(\frac{x}{y}\right)
=
\operatorname{st}(x)
\operatorname{st}\left(\frac1y\right)
=
r\frac1s.
$$

従って

$$
\operatorname{st}\left(\frac{x}{y}\right)
=
\frac{r}{s}.
$$
<!-- proof-end -->

条件 $\operatorname{st}(y)\ne0$ は外せません。例えば正の無限小 $\varepsilon$ に対し

$$
\operatorname{st}(\varepsilon)=0
$$

であり、

$$
\frac1\varepsilon
$$

は無限大なので標準部を持ちません。


---

## 9. 標準部は内部写像ではない

NSA4 では内部集合・内部写像を、集合列・写像列から作られる対象として定義しました。標準部はその種類の写像ではありません。

まず標準部の定義域そのものが

$$
\operatorname{Fin}({}^*\mathbb R)
$$

という外部集合です。NSA4 で、有限超実数全体は内部集合ではないことを既に示しました。

より正確には、標準部のグラフを考えると外部性がはっきりします。

<a id="prop-nsa5-standard-part-external"></a>
<!-- formal-statement-start -->
### 命題（標準部のグラフは外部集合である）

標準部のグラフ

$$
G_{\operatorname{st}}
=
\left\{
(x,r)\in{}^*\mathbb R\times{}^*\mathbb R:
x\text{ は有限},
\ r\in\mathbb R,
\ r=\operatorname{st}(x)
\right\}
$$

は内部集合ではない。
<!-- formal-statement-end -->

### 証明の見取り図

内部関係の定義域は、存在量化で射影しても内部です。もし標準部のグラフが内部なら、その第一座標への射影は有限超実数全体になります。しかし有限超実数全体は NSA4 で外部だと分かっています。

<!-- proof-start -->
### 証明

反対に $G_{\operatorname{st}}$ が内部集合だと仮定します。

内部集合の第一座標への射影

$$
D
=
\left\{
x\in{}^*\mathbb R:
\exists y\in{}^*\mathbb R,\ (x,y)\in G_{\operatorname{st}}
\right\}
$$

を考えます。

内部集合は集合ソートの超冪の元であり、「ある $y$ が存在して $(x,y)$ がその内部集合に属する」という存在量化は NSA3 の Łoś の定理で座標ごとに扱えます。従って $D$ も内部集合です。

一方、$G_{\operatorname{st}}$ は標準部のグラフなので、その第一座標への射影はちょうど

$$
D=\operatorname{Fin}({}^*\mathbb R)
$$

です。

しかし NSA4 の [有限超実数全体は外部集合である](../NSA4/index.md#prop-nsa4-limited-hyperreals-external) に反します。

従って $G_{\operatorname{st}}$ は内部集合ではありません。
<!-- proof-end -->

この外部性は欠陥ではありません。むしろ

$$
\text{内部対象を使って超準世界で計算する}
\quad\longrightarrow\quad
\text{最後に外部操作 }\operatorname{st}\text{ で標準世界へ戻る}
$$

という超準解析の典型的な使い方を表しています。

---

## 10. 典型的な誤り：$\approx$ は等号ではない

無限小近接は等号のように見えますが、全ての演算で無条件に置き換えられるわけではありません。

### 10.1 有限量との四則演算は安全

$x\approx y$ で $z$ が有限なら

$$
x+z\approx y+z,
$$

$$
xz\approx yz.
$$

実際、差はそれぞれ

$$
(x+z)-(y+z)=x-y,
$$

$$
xz-yz=z(x-y)
$$

であり、後者は有限量と無限小の積です。

### 10.2 無限大を掛けると壊れることがある

$\varepsilon$ を正の非零無限小、$H=1/\varepsilon$ とします。

$$
\varepsilon\approx0
$$

ですが

$$
H\varepsilon=1,
\qquad
H\cdot0=0.
$$

従って

$$
H\varepsilon\not\approx H\cdot0.
$$

「両辺に同じものを掛けたから $\approx$ が保たれる」とは限りません。掛ける量が有限であることが重要です。

### 10.3 無限小どうしで割ると比は標準的に変わり得る

$$
\varepsilon\approx2\varepsilon
$$

ですが

$$
\frac{\varepsilon}{2\varepsilon}
=
\frac12.
$$

一方、

$$
\frac{\varepsilon}{\varepsilon}=1.
$$

分母が無限小のとき、無限小近接だけから商の標準部を決めることはできません。NSA7 の微分では、差分商そのものが有限で、どの非零無限小を選んでも同じ標準部になることを別に証明します。

---

## 11. 有界な実数列を超実数として見る

標準部は「収束列の極限を取り直すだけ」の道具ではありません。通常の意味では収束しない有界列から作った超実数にも標準部があります。

実数列 $(a_n)$ が標準実数 $M>0$ により

$$
|a_n|\le M
\qquad
(\forall n)
$$

と抑えられているなら

$$
x=[a_n]
$$

は

$$
|x|\le M
$$

を満たすので有限超実数です。従って

$$
\operatorname{st}([a_n])
$$

は必ず存在します。

この標準実数は固定した自由超フィルター $\mathcal U$ に依存する場合があります。例えば

$$
a_n=(-1)^n
$$

なら NSA1 で見た通り

$$
[(-1)^n]=1
$$

または

$$
[(-1)^n]=-1
$$

のどちらかで、どちらになるかは偶数集合・奇数集合のどちらを $\mathcal U$ が選ぶかに依存します。

一方、通常の意味で

$$
a_n\to L
$$

なら事情は違います。任意の標準 $\varepsilon>0$ に対し十分大きい $n$ で

$$
|a_n-L|<\varepsilon
$$

なので、その添字集合は余有限です。従って

$$
[a_n]\approx L,
$$

よって

$$
\operatorname{st}([a_n])=L.
$$

これは次章で数列極限の超準的特徴付けを証明する入口になります。

---

## 12. この章で得た道具

有限超実数 $x$ には唯一の標準実数

$$
\operatorname{st}(x)
$$

が対応し、

$$
x\approx\operatorname{st}(x)
$$

となります。

また有限超実数 $x,y$ について

$$
\operatorname{st}(x+y)
=
\operatorname{st}(x)+\operatorname{st}(y),
$$

$$
\operatorname{st}(xy)
=
\operatorname{st}(x)\operatorname{st}(y)
$$

が成り立ち、分母の標準部が 0 でなければ商についても同じです。

重要なのは、標準部が**内部操作ではない**ことです。

$$
\text{内部対象を使って超準世界で計算}
\quad\longrightarrow\quad
\operatorname{st}
\quad\longrightarrow\quad
\text{標準実数へ戻る}
$$

という役割分担を保ちます。

次の NSA6 では、この道具を使って

$$
a_n\to L,
\qquad
f\text{ が連続},
\qquad
f\text{ が一様連続}
$$

という $\varepsilon$-$\delta$ / $\varepsilon$-$N$ の量化を、無限超自然数と無限小近接で読み替えます。

