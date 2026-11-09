# CAT1-03 同型・モノ射・エピ射

<!-- definition-example-audit: strict -->

## 1. 「逆に戻れる」と「区別できる」は違う

[圏の定義](../CAT1-01/index.md#def-cat1-01-category)では、射 $f:A\to B$ は必ずしも集合の写像とは限らず、射の合成と恒等射だけが与えられていた。集合の写像なら「全単射」「単射」「全射」を元の値から判定できる。しかし、[順序集合から作った圏](../CAT1-02/index.md#prop-cat1-02-order-category)の射は元を写す関数ではない。そこで、射同士の等式だけで三つの性質を言い直したい。

次の三つの問いは別々である。

1. $A$ から $B$ へ進んだあと、**両側で**元に戻せるか。
2. $A$ へ入ってくる二本の射を、$f$ のあとで区別できるか。
3. $B$ から出ていく二本の射を、$f$ の前から区別できるか。

以下でこの三つを順に定義する。後二者は「両側から元に戻せる」という条件より弱いことが肝心である。

## 2. 同型射：両側から合成して恒等射になる

集合 $A=\{0,1\}$ と $B=\{a,b\}$ に対し $f(0)=a$, $f(1)=b$ とする。$g(a)=0$, $g(b)=1$ と定めると、$g\circ f$ は $A$ 上の恒等写像、$f\circ g$ は $B$ 上の恒等写像になる。片方の等式だけでなく、両方必要である。

一般の圏でも、射 $f:A\to B$ の逆向きの射 $g:B\to A$ を取り、二つの合成がそれぞれの恒等射になることを「同型」と呼ぶ。

<a id="def-cat1-03-isomorphism"></a>

<!-- formal-statement-start -->
> **定義（同型射・逆射・同型な対象）**  
> 圏 $\mathcal C$ の射 $f:A\to B$ が **同型射** であるとは、射 $g:B\to A$ が存在して

$$
g\circ f=1_A,\qquad f\circ g=1_B
$$

> を満たすことをいう。この $g$ を $f$ の **逆射** と呼ぶ。$A$ から $B$ への同型射が存在するとき、対象 $A,B$ は **同型** といい、$A\cong B$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-03-isomorphism -->
**定義の確認**。先ほどの二元集合の対応について、$0,1$ のそれぞれで $g(f(x))=x$、$a,b$ のそれぞれで $f(g(y))=y$ を確かめられる。したがって二つの合成は、[集合と写像の圏](../CAT1-01/index.md#prop-cat1-01-set-category)の恒等射に一致し、$f$ は同型射である。

反対に $\{0,1\}$ から一元集合への定値写像は同型でない。どんな $g$ でも $g\circ f$ は二元集合上の定値写像となり、$1_A$ と一致しない。
<!-- definition-example-end -->

逆射は存在すれば一つに決まる。これにより、$f^{-1}$ という記号を曖昧さなく使える。

<a id="prop-cat1-03-inverse-unique"></a>

<!-- formal-statement-start -->
> **命題（逆射の一意性）**  
> 任意の圏 $\mathcal C$ の射 $f:A\to B$ が同型射なら、その逆射は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの逆射 $g,h$ を仮定し、$g$ と $h$ の間へ $f$ を挟む。左では $h\circ f$、右では $f\circ g$ が恒等射になる。

<!-- proof-start -->
### 証明

$g,h:B\to A$ がともに $f$ の逆射なら、[逆射の定義](#def-cat1-03-isomorphism)から

$$
g\circ f=1_A=h\circ f,\qquad
f\circ g=1_B=f\circ h.
$$

[結合則と単位律](../CAT1-01/index.md#def-cat1-01-category)をこの順に適用すると

$$
g=g\circ1_B=g\circ(f\circ h)
=(g\circ f)\circ h=1_A\circ h=h.
$$

したがって逆射は一意である。$\square$
<!-- proof-end -->

同型は対象の名前そのものが等しいという意味ではない。例えば $\{0,1\}$ と $\{a,b\}$ は異なる集合でも、集合の圏では同型である。

## 3. モノ射：後ろから合成しても識別が失われない

$f:A\to B$ を固定し、任意の同じ始域 $X$ から $A$ に入る射 $u,v:X\to A$ を考える。もし $f\circ u=f\circ v$ なのに $u\ne v$ なら、$f$ の後では両者を区別できなくなる。逆に、常に等しさを取り消せるという性質を抽象化しよう。

<a id="def-cat1-03-monomorphism"></a>

<!-- formal-statement-start -->
> **定義（モノ射）**  
> 圏 $\mathcal C$ の射 $f:A\to B$ が **モノ射** であるとは、任意の対象 $X$ と任意の二射 $u,v:X\to A$ について

$$
f\circ u=f\circ v\quad\Longrightarrow\quad u=v
$$

> が成り立つことをいう。これは **左消去律** とも呼ばれる。$X$ は $A,B$ と異なっていてもよく、すべての対象について量化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-03-monomorphism -->
**定義の確認**。集合の包含写像 $i:\{0\}\hookrightarrow\{0,1\}$ を考える。任意の集合 $X$ と写像 $u,v:X\to\{0\}$ について、$i\circ u=i\circ v$ なら各 $x\in X$ で

$$
i(u(x))=i(v(x))\ \Longrightarrow\ u(x)=v(x)
$$

を得る。最後の含意は、包含写像が異なる値を同じ値に送らないことによる。各点で等しいので $u=v$ である。$X=\varnothing$ でも写像は高々一本なのでこの含意は成立する。ゆえに $i$ はモノ射である。
<!-- definition-example-end -->

等式は $f$ を**左側**から消す形である。図式の向きが逆の「右消去」と混同しないようにする。

## 4. エピ射：前から合成しても識別が失われない

今度は $B$ から同じ対象 $Y$ へ向かう $r,s:B\to Y$ を考える。$r\circ f=s\circ f$ から $r=s$ を言えるという条件を考える。集合の全射なら $f$ の像の上で等しいことが $B$ 全体で等しいことにつながるが、他の圏でも同じ結論になるとは限らない。

<a id="def-cat1-03-epimorphism"></a>

<!-- formal-statement-start -->
> **定義（エピ射）**  
> 圏 $\mathcal C$ の射 $f:A\to B$ が **エピ射** であるとは、任意の対象 $Y$ と任意の二射 $r,s:B\to Y$ について

$$
r\circ f=s\circ f\quad\Longrightarrow\quad r=s
$$

> が成り立つことをいう。これは **右消去律** とも呼ばれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-03-epimorphism -->
**定義の確認**。$p:\{0,1\}\to\{*\}$ を定値写像とする。任意の集合 $Y$ と $r,s:\{*\}\to Y$ が $r\circ p=s\circ p$ を満たすなら、$0$ に代入して

$$
r(*)=r(p(0))=s(p(0))=s(*)
$$

を得る。定義域は一元集合なので $r=s$。ゆえに $p$ はエピ射である。これは同型射ではない。実際、$p$ のどんな右逆 $t:\{*\}\to\{0,1\}$ についても $t\circ p$ は定値写像で、$1_{\{0,1\}}$ にならない。
<!-- definition-example-end -->

### 同型なら両方の消去律が成り立つ

同型射には両側の逆射があるので、左消去と右消去の両方を行える。

<a id="prop-cat1-03-iso-mono-epi"></a>

<!-- formal-statement-start -->
> **命題（同型射はモノ射かつエピ射）**  
> 任意の圏 $\mathcal C$ で、同型射 $f:A\to B$ はモノ射かつエピ射である。
<!-- formal-statement-end -->

### 証明の見取り図

等式の両辺へ逆射 $f^{-1}$ を同じ側から合成し、結合則と単位律で $f$ を消す。

<!-- proof-start -->
### 証明

$g:B\to A$ を $f$ の[逆射](#def-cat1-03-isomorphism)とする。任意の $u,v:X\to A$ が $f\circ u=f\circ v$ を満たすなら

$$
u=1_A\circ u=(g\circ f)\circ u
=g\circ(f\circ u)=g\circ(f\circ v)=v.
$$

よって $f$ は[モノ射](#def-cat1-03-monomorphism)である。任意の $r,s:B\to Y$ が $r\circ f=s\circ f$ を満たすなら

$$
r=r\circ1_B=r\circ(f\circ g)
=(r\circ f)\circ g=(s\circ f)\circ g=s.
$$

よって $f$ は[エピ射](#def-cat1-03-epimorphism)でもある。$\square$
<!-- proof-end -->

逆向きの「モノ射かつエピ射なら同型」は一般には**偽**である。後で具体的な圏を構成して確かめる。

## 5. 集合では単射・全射と対応する

ここまでの定義は射の等式だけで述べられている。集合の圏 $\mathbf{Set}$ に戻り、使い慣れた元による判定と一致することを証明しよう。$\mathbf{Set}$ は[局所小圏](../CAT1-02/index.md#prop-cat1-02-set-size)なので、固定した集合の間の射は通常の写像として扱える。

<a id="prop-cat1-03-set-characterization"></a>

<!-- formal-statement-start -->
> **命題（集合における三つの特徴づけ）**  
> 任意の集合 $A,B$ と写像 $f:A\to B$ について、集合と写像の圏 $\mathbf{Set}$ では次が成り立つ。
>
> 1. $f$ がモノ射であることと、関数として単射であることは同値である。
> 2. $f$ がエピ射であることと、関数として全射であることは同値である。
> 3. $f$ が同型射であることと、関数として全単射であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

モノ射の逆向きでは一元集合からの二つの写像で二点を試す。エピ射の逆向きでは、像に入らない元があれば二元集合へ向かう二つの写像を作り、合成が等しいのに元の写像が異なることを示す。全単射なら各値の唯一の逆像で逆射を構成する。

<!-- proof-start -->
### 証明

**（1）単射からモノ射へ**。$f$ が単射なら、任意の $u,v:X\to A$ に対し $f\circ u=f\circ v$ から、任意の $x\in X$ について $f(u(x))=f(v(x))$ を得る。単射性から $u(x)=v(x)$、したがって $u=v$ である。

**（1）モノ射から単射へ**。$a,a'\in A$ が $f(a)=f(a')$ を満たすとする。一元集合 $X=\{*\}$ からの写像 $u(*)=a$, $v(*)=a'$ を取ると、$f\circ u=f\circ v$ である。[モノ射の消去律](#def-cat1-03-monomorphism)から $u=v$、従って $a=a'$。これは $A=\varnothing$ の場合にも、検査すべき二点がないため成立する。

**（2）全射からエピ射へ**。$f$ が全射で、$r,s:B\to Y$ が $r\circ f=s\circ f$ を満たすとする。任意の $b\in B$ に対して $f(a)=b$ となる $a\in A$ を一つ取れるから

$$
r(b)=r(f(a))=(r\circ f)(a)
=(s\circ f)(a)=s(f(a))=s(b).
$$

各 $b$ について等しいので $r=s$。$B=\varnothing$ のときは二写像が空のグラフで一致する。

**（2）エピ射から全射へ**。全射でないと仮定し、$b_0\in B\setminus f(A)$ を取る。$Y=\{0,1\}$ とし、$r,s:B\to Y$ を

$$
r(b)=0\quad(b\in B),\qquad
s(b)=\begin{cases}1,&b=b_0,\\0,&b\ne b_0\end{cases}
$$

で定める。$r\ne s$ だが、すべての $a\in A$ で $f(a)\ne b_0$ だから $r(f(a))=s(f(a))=0$、すなわち $r\circ f=s\circ f$ である。これは[エピ射の定義](#def-cat1-03-epimorphism)に反する。ゆえに全射でなければエピ射でない。$A=\varnothing$ でも、$B\ne\varnothing$ なら同じ構成が使える。

**（3）同型射から全単射へ**。同型射なら[同型射はモノ射かつエピ射](#prop-cat1-03-iso-mono-epi)なので、（1）（2）から単射かつ全射である。

**（3）全単射から同型射へ**。各 $b\in B$ に対し全射性により $f(a)=b$ となる $a\in A$ が存在し、単射性によりその $a$ は一意である。そこで $g(b)=a$ と定めると写像 $g:B\to A$ が得られ、任意の $a\in A$ で $g(f(a))=a$、任意の $b\in B$ で $f(g(b))=b$ となる。よって $g\circ f=1_A$, $f\circ g=1_B$ で、$f$ は同型射である。両集合が空の場合も、唯一の空写像が逆射である。$\square$
<!-- proof-end -->

この証明では、集合の**点**を試す一元集合からの写像があることが、モノ射と単射の一致を支えていた。他の圏では同じ試し方ができるとは限らない。

## 6. 一方だけ逆にできる射と、合成の保存

同型には二つの恒等式が必要だった。片方だけ成立する場合も名前を付けておく。左側から戻す $\ell:B\to A$ があり $\ell\circ f=1_A$ となる $f$ を **分裂モノ射**、右側から戻す $r:B\to A$ があり $f\circ r=1_B$ となる $f$ を **分裂エピ射** という。

<a id="def-cat1-03-split"></a>

<!-- formal-statement-start -->
> **定義（分裂モノ射・分裂エピ射）**  
> 圏 $\mathcal C$ の射 $f:A\to B$ が分裂モノ射であるとは $\ell:B\to A$ で $\ell\circ f=1_A$ となるものが存在することをいう。分裂エピ射であるとは $r:B\to A$ で $f\circ r=1_B$ となるものが存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-03-split -->
**定義の確認**。集合 $A=\{0\}$、$B=\{0,1\}$ の包含 $i:A\to B$ と、両方の元を $0$ に送る $q:B\to A$ を取ると

$$
(q\circ i)(0)=0,\qquad
(i\circ q)(0)=0,\quad (i\circ q)(1)=0
$$

である。前者は $q\circ i=1_A$ なので $i$ は分裂モノ射、$q$ は分裂エピ射である。後者は $1\in B$ を $0$ に送るため $i\circ q\ne1_B$ であり、$i,q$ は同型射ではない。
<!-- definition-example-end -->

<a id="prop-cat1-03-split-cancel"></a>

<!-- formal-statement-start -->
> **命題（分裂射の消去律と両側逆の一致）**  
> 任意の圏で分裂モノ射はモノ射、分裂エピ射はエピ射である。また $f:A\to B$ に左逆 $\ell$ と右逆 $r$ の両方があれば $\ell=r$ で、$f$ は同型射である。
<!-- formal-statement-end -->

### 証明の見取り図

片側の逆射をキャンセルしたい等式へ合成する。両側ある場合は $\ell\circ(f\circ r)$ をどちらから括弧付けしても同じになる。

<!-- proof-start -->
### 証明

$\ell\circ f=1_A$ とし、$f\circ u=f\circ v$ なら

$$
u=(\ell\circ f)\circ u=\ell\circ(f\circ u)
=\ell\circ(f\circ v)=v.
$$

従って $f$ はモノ射である。$f\circ r=1_B$ とし、$u\circ f=v\circ f$ なら

$$
u=u\circ(f\circ r)=(u\circ f)\circ r
=(v\circ f)\circ r=v.
$$

従って $f$ はエピ射である。さらに $\ell\circ f=1_A$ と $f\circ r=1_B$ が両立すれば

$$
\ell=\ell\circ1_B=\ell\circ(f\circ r)
=(\ell\circ f)\circ r=1_A\circ r=r.
$$

この共通の射が二つの恒等式を満たすので $f$ は同型射である。$\square$
<!-- proof-end -->

<a id="prop-cat1-03-composition"></a>

<!-- formal-statement-start -->
> **命題（モノ射・エピ射・同型射は合成で閉じる）**  
> 任意の圏の射 $A\xrightarrow{f}B\xrightarrow{g}C$ について、$f,g$ がともにモノ射なら $g\circ f$ はモノ射、ともにエピ射なら $g\circ f$ はエピ射、ともに同型射なら $g\circ f$ は同型射である。
<!-- formal-statement-end -->

### 証明の見取り図

消去律を一度ずつ順番に適用する。同型の場合は逆向きに $f^{-1}$ と $g^{-1}$ を合成する。

<!-- proof-start -->
### 証明

$u,v:X\to A$ が $(g\circ f)\circ u=(g\circ f)\circ v$ を満たすなら、結合則と $g$、$f$ の[モノ射の消去律](#def-cat1-03-monomorphism)を順に使って

$$
g\circ(f\circ u)=g\circ(f\circ v)
\ \Longrightarrow\ f\circ u=f\circ v
\ \Longrightarrow\ u=v
$$

を得る。

$r,s:C\to Y$ が $r\circ(g\circ f)=s\circ(g\circ f)$ を満たすなら、結合則と $f$、$g$ の[エピ射の消去律](#def-cat1-03-epimorphism)を順に使って

$$
(r\circ g)\circ f=(s\circ g)\circ f
\ \Longrightarrow\ r\circ g=s\circ g
\ \Longrightarrow\ r=s
$$

を得る。

最後に逆射 $f^{-1}:B\to A$, $g^{-1}:C\to B$ があれば、$h:=f^{-1}\circ g^{-1}:C\to A$ について

$$
\begin{aligned}
h\circ(g\circ f)&=f^{-1}\circ(g^{-1}\circ g)\circ f=1_A,\\
(g\circ f)\circ h&=g\circ(f\circ f^{-1})\circ g^{-1}=1_C.
\end{aligned}
$$

従って $g\circ f$ は同型射である。$\square$
<!-- proof-end -->

## 7. 反例：モノ射かつエピ射でも同型でない

### 7.1 順序圏ではすべての射が二つの消去律を満たす

[半順序集合の圏](../CAT1-02/index.md#prop-cat1-02-order-category)では、二対象の間には射が高々一本しかない。したがって、同じ始域・終域を持つ二本の射は初めから等しく、左右の消去律に反例が生じない。

<a id="prop-cat1-03-poset-bimorphism"></a>

<!-- formal-statement-start -->
> **命題（半順序圏のモノ射・エピ射・同型射）**  
> 半順序集合 $(P,\preceq)$ から作る圏において、存在するすべての射 $x\to y$ はモノ射かつエピ射である。一方、射 $x\to y$ が同型射であるのは $x=y$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

消去律は任意の試験対象について調べるが、同じ Hom には射が高々一本なので必ず成立する。逆射の存在には $x\preceq y$ だけでなく $y\preceq x$ も必要であり、半順序の反対称律が働く。

<!-- proof-start -->
### 証明

$x\preceq y$ とし、唯一の射を $f:x\to y$ とする。任意の対象 $z$ と射 $u,v:z\to x$ は、どちらも同じ $\operatorname{Hom}(z,x)$ に属する。この Hom は高々一元なので $u=v$ であり、特に $f\circ u=f\circ v$ なら $u=v$ である。よって $f$ はモノ射。同じ理由で、任意の $r,s:y\to z$ は初めから等しいから $f$ はエピ射でもある。

$f$ が同型なら逆射 $g:y\to x$ がある。順序圏の射の存在条件から $x\preceq y$ かつ $y\preceq x$ であり、[半順序の反対称律](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order)から $x=y$。逆に $x=y$ なら $f=1_x$ で、$1_x\circ1_x=1_x$ より同型である。$\square$
<!-- proof-end -->

例えば二点鎖 $0\prec1$（$0\preceq1$ だが $1\npreceq0$ を表す）では、射 $0\to1$ はモノ射かつエピ射だが、$1\to0$ がないので同型ではない。ここで壊れたのは消去律でなく、**逆向きの射の存在**である。

### 7.2 モノイドの圏ではエピ射が全射とは限らない

前講の[モノイド](../CAT1-02/index.md#def-cat1-02-monoid)は、結合的な二項演算と単位元を持つ集合だった。二つのモノイド $(M,\ast,e_M)$、$(N,\diamond,e_N)$ の間の写像 $h:M\to N$ が

$$
h(a\ast b)=h(a)\diamond h(b),\qquad h(e_M)=e_N
$$

を満たすとき、**モノイド準同型**と呼ぶ。これは元の演算と単位元を保つ写像である。

<a id="def-cat1-03-monoid-hom"></a>

<!-- formal-statement-start -->
> **定義（モノイド準同型と圏 Mon）**  
> モノイド $(M,\ast,e_M)$ からモノイド $(N,\diamond,e_N)$ へのモノイド準同型とは、任意の $a,b\in M$ について

$$
h(a\ast b)=h(a)\diamond h(b),\qquad h(e_M)=e_N
$$

> を満たす写像 $h:M\to N$ である。モノイドを対象、モノイド準同型を射、写像の合成を射の合成とする圏を $\mathbf{Mon}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-03-monoid-hom -->
**定義の確認**。非負整数 $\mathbb N_0=\{0,1,2,\ldots\}$ と整数 $\mathbb Z$ に加法を入れる。両者は加法で閉じ、結合律と単位元 $0$ を持つのでモノイドである。包含 $i:\mathbb N_0\to\mathbb Z$ は任意の $m,n\in\mathbb N_0$ に対し

$$
i(m+n)=m+n=i(m)+i(n),\qquad i(0)=0
$$

を満たし、準同型である。また $\mathbf{Mon}$ の恒等写像 $1_M$ は $1_M(a\ast b)=a\ast b=1_M(a)\ast1_M(b)$ と $1_M(e_M)=e_M$ を満たす。準同型 $h:M\to N$ と $k:N\to L$ の合成も、$L$ の演算を $\star$ とすれば

$$
k(h(a\ast b))=k(h(a)\diamond h(b))=k(h(a))\star k(h(b)),\qquad
k(h(e_M))=k(e_N)=e_L
$$

を満たす。写像の結合則・単位律も使えるので、確かに圏である。
<!-- definition-example-end -->

この包含 $i$ は写像として全射ではない。しかし準同型の世界では、$\mathbb Z$ 上の準同型の値が非負整数上の値だけから決まってしまう。

<a id="prop-cat1-03-monoid-non-surj-epi"></a>

<!-- formal-statement-start -->
> **命題（全射でないモノイドのエピ射）**  
> 加法モノイドの包含 $i:(\mathbb N_0,+,0)\to(\mathbb Z,+,0)$ は、$\mathbf{Mon}$ でモノ射かつエピ射だが、同型射ではない。特に $\mathbf{Mon}$ のエピ射は、台集合の写像として全射とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

モノ射性は包含の単射性による。エピ射性では、$\mathbb Z$ から任意のモノイド $M$ への準同型 $u,v$ が非負整数上で等しいと仮定する。$u(-1)$ と $v(-1)$ は共通の $u(1)=v(1)$ の逆元なので一致し、すべての整数上で一致する。

<!-- proof-start -->
### 証明

任意のモノイド $K$ と準同型 $a,b:K\to\mathbb N_0$ について $i\circ a=i\circ b$ なら、各 $k\in K$ で $i(a(k))=i(b(k))$。$i$ は集合としての包含なので $a(k)=b(k)$、よって $a=b$。これで $i$ は[モノ射](#def-cat1-03-monomorphism)である。

次に任意のモノイド $(M,\ast,e)$ と準同型 $u,v:\mathbb Z\to M$ が $u\circ i=v\circ i$ を満たすとする。非負整数 $n$ に対して $u(n)=v(n)$ であり、特に $u(1)=v(1)=:t$ である。[モノイド準同型](#def-cat1-03-monoid-hom)の加法保存と単位元保存から

$$
t\ast u(-1)=u(1+(-1))=u(0)=e,
\qquad u(-1)\ast t=e.
$$

同じ等式が $v(-1)$ にも成り立つ。一般のモノイドで、ある元 $t$ の両側逆元 $a,b$ は

$$
a=a\ast e=a\ast(t\ast b)
=(a\ast t)\ast b=e\ast b=b
$$

により一意なので $u(-1)=v(-1)$ である。任意の負の整数 $-n$（$n\ge1$）は $(-1)$ を $n$ 回加えたものだから、準同型性から

$$
u(-n)=\underbrace{u(-1)\ast\cdots\ast u(-1)}_{n\text{ 個}}
=\underbrace{v(-1)\ast\cdots\ast v(-1)}_{n\text{ 個}}=v(-n).
$$

非負整数上でも一致するので $u=v$。従って $i$ は[エピ射](#def-cat1-03-epimorphism)である。一方、$-1\notin i(\mathbb N_0)$ だから $i$ は全射でない。[同型の逆射](#def-cat1-03-isomorphism)が存在すれば $i\circ g=1_{\mathbb Z}$ となり全射を強制するため、同型ではない。$\square$
<!-- proof-end -->

二つの反例は、それぞれ別の障害を明らかにする。順序圏では射が高々一本なので消去律は情報を持たず、$\mathbf{Mon}$ では射が**演算を保つ写像に制限されている**ので、エピ射の試験に使える $u,v$ が $\mathbf{Set}$ より少ない。どの圏で消去律を試すかを明示せずに「モノ射＝単射」「エピ射＝全射」と言ってはいけない。

## 8. 演習：射の等式から性質を判定する

### CAT1-03-A01 二点鎖の射を判定する

- Level: A

$P=\{0,1\}$ に $0\prec1$ の順序を入れた圏で、射 $f:0\to1$ がモノ射、エピ射、同型射のどれかを、各定義に戻って判定せよ。

<!-- solution-start -->
**詳細解答**。任意の $x$ について $u,v:x\to0$ は、存在する場合でも $\operatorname{Hom}(x,0)$ の唯一の射なので $u=v$。よって $f\circ u=f\circ v$ から $u=v$ を言えてモノ射である。

任意の $y$ について $r,s:1\to y$ も、存在する場合は高々一本なので $r=s$、従ってエピ射でもある。

ところが $1\npreceq0$ なので $1\to0$ の射は存在しない。同型の定義に必要な逆射を作れず、同型ではない。これは[半順序圏の命題](#prop-cat1-03-poset-bimorphism)の最小例である。
<!-- solution-end -->

### CAT1-03-A02 単射でない写像を見破る

- Level: A

$A=\{a,b\}$、$B=\{0\}$、$f(a)=f(b)=0$ とする。$f$ がモノ射でないことを、一元集合からの二本の写像を明示して示せ。

<!-- solution-start -->
**詳細解答**。$X=\{*\}$ とし $u(*)=a$, $v(*)=b$ とする。$a\ne b$ より $u\ne v$。一方

$$
(f\circ u)(*)=f(a)=0=f(b)=(f\circ v)(*)
$$

なので $f\circ u=f\circ v$ である。これは[モノ射の左消去律](#def-cat1-03-monomorphism)に反する。従って $f$ はモノ射でない。
<!-- solution-end -->

### CAT1-03-A03 全射でない写像を見破る

- Level: A

$A=\{a\}$、$B=\{0,1\}$、$f(a)=0$ とする。二元集合 $Y=\{0,1\}$ を終域に持つ二本の写像 $r,s:B\to Y$ を作り、$f$ がエピ射でないことを示せ。

<!-- solution-start -->
**詳細解答**。$r(0)=r(1)=0$ とし、$s(0)=0$, $s(1)=1$ とする。$r(1)\ne s(1)$ だから $r\ne s$。しかし $f$ の像は $\{0\}$ だけなので

$$
(r\circ f)(a)=r(0)=0=s(0)=(s\circ f)(a).
$$

従って $r\circ f=s\circ f$ で、[エピ射の右消去律](#def-cat1-03-epimorphism)に反する。
<!-- solution-end -->

### CAT1-03-A04 逆射を直接計算する

- Level: A

$A=\{0,1,2\}$、$B=\{a,b,c\}$ の写像 $f(0)=b$, $f(1)=c$, $f(2)=a$ が同型射であることを、逆射を構成して二つの合成で確かめよ。

<!-- solution-start -->
**詳細解答**。$g:B\to A$ を $g(a)=2$, $g(b)=0$, $g(c)=1$ と定めると

$$
g(f(0))=g(b)=0,\quad g(f(1))=g(c)=1,\quad g(f(2))=g(a)=2
$$

で $g\circ f=1_A$。また

$$
f(g(a))=f(2)=a,\quad f(g(b))=f(0)=b,\quad f(g(c))=f(1)=c
$$

で $f\circ g=1_B$。よって[同型射の定義](#def-cat1-03-isomorphism)を満たす。
<!-- solution-end -->

### CAT1-03-A05 片側だけの逆を判定する

- Level: A

$i:\{0\}\to\{0,1\}$ を包含、$q:\{0,1\}\to\{0\}$ を定値写像とする。$q\circ i$ と $i\circ q$ を両方求め、それぞれの分裂性と非同型性を述べよ。

<!-- solution-start -->
**詳細解答**。二つの合成を値に戻して計算すると

$$
(q\circ i)(0)=q(0)=0,\qquad
(i\circ q)(0)=0,\quad(i\circ q)(1)=0
$$

である。したがって $q\circ i=1_{\{0\}}$ だが、$i\circ q$ は $\{0,1\}$ 上の定値写像で、$1_{\{0,1\}}$ とは異なる。[分裂射の定義](#def-cat1-03-split)により、$q$ は $i$ の左逆で $i$ は分裂モノ射、$i$ は $q$ の右逆で $q$ は分裂エピ射である。$i$ は全射でなく、$q$ は単射でないため、[集合における特徴づけ](#prop-cat1-03-set-characterization)からいずれも同型でない。
<!-- solution-end -->

### CAT1-03-B01 空集合の射にも消去律を適用する

- Level: B

集合と写像の圏で、空写像 $e:\varnothing\to\{a\}$ と、唯一の空写像 $d:\varnothing\to\varnothing$ について、モノ射・エピ射・同型射の全判定を行え。値を持つ元がない場合にも、各定義がどう働くか説明せよ。

<!-- solution-start -->
**詳細解答**。$e$ は空の始域からの写像なので単射性の反例となる二元は存在しない。従って単射、すなわち[モノ射](#prop-cat1-03-set-characterization)である。一方 $\{a\}$ には値が一つも届かない。$r,s:\{a\}\to\{0,1\}$ を $r(a)=0$, $s(a)=1$ とすれば $r\ne s$ だが、$r\circ e$ と $s\circ e$ はともに空写像で等しい。従ってエピ射でなく、同型でもない。

$d$ は空集合の唯一の自己写像なので $d=1_\varnothing$。$d\circ d=d$ であり、それ自身が逆射である。従って同型射、さらに[同型射の命題](#prop-cat1-03-iso-mono-epi)からモノ射・エピ射でもある。空の始域からの写像をすべてエピ射とみなしてはいけない。
<!-- solution-end -->

### CAT1-03-B02 合成を途中で消去する

- Level: B

圏の射 $A\xrightarrow{f}B\xrightarrow{g}C$ において、$g\circ f$ がモノ射なら $f$ はモノ射であること、$g\circ f$ がエピ射なら $g$ はエピ射であることを示せ。逆向き（$g$ がモノ射、$f$ がエピ射）までは結論できないことも、集合の写像で反例を作れ。

<!-- solution-start -->
**詳細解答**。任意の $u,v:X\to A$ が $f\circ u=f\circ v$ を満たすなら、両辺の左に $g$ を合成して

$$
(g\circ f)\circ u=g\circ(f\circ u)
=g\circ(f\circ v)=(g\circ f)\circ v
$$

を得る。$g\circ f$ の[モノ射性](#def-cat1-03-monomorphism)から $u=v$。従って $f$ はモノ射である。

次に任意の $r,s:C\to Y$ が $r\circ g=s\circ g$ を満たすなら、両辺の右に $f$ を合成して

$$
r\circ(g\circ f)=(r\circ g)\circ f
=(s\circ g)\circ f=s\circ(g\circ f)
$$

を得る。$g\circ f$ の[エピ射性](#def-cat1-03-epimorphism)から $r=s$。従って $g$ はエピ射である。

逆向きの反例として $A=\{*\}$、$B=\{0,1\}$、$C=\{*\}$、$f(*)=0$、$g(0)=g(1)=*$ とする。$g\circ f$ は一元集合上の恒等射なので同型であり、モノ射かつエピ射である。しかし $g$ は単射でないのでモノ射でなく、$f$ は全射でないのでエピ射でない。[集合における特徴づけ](#prop-cat1-03-set-characterization)で両方を判定できる。
<!-- solution-end -->

### CAT1-03-B03 分裂性とエピ射性を区別する

- Level: B

集合の写像 $f:A\to B$ が全射で、$B$ が有限かつ空でないとする。$f$ の右逆 $r:B\to A$ が存在することを、各 $b\in B$ の逆像から構成せよ。さらに、一般の圏でエピ射から分裂エピ射を結論できるか判定せよ。

<!-- solution-start -->
**詳細解答**。$B=\{b_1,\ldots,b_n\}$（$n\ge1$）と列挙できる。全射だから各 $b_j$ について $a_j\in A$ で $f(a_j)=b_j$ となるものが少なくとも一つ存在する。有限個なので順に一つずつ選び、$r(b_j)=a_j$ と定める。同じ $b_j$ に異なる値を与えることはなく、$r$ は写像である。各 $j$ で

$$
(f\circ r)(b_j)=f(a_j)=b_j
$$

だから $f\circ r=1_B$。よって $f$ は[分裂エピ射](#def-cat1-03-split)である。この構成は有限個の選択だけを使い、一般の無限集合の任意の全射に右逆があると主張するものではない。

一般の圏ではエピ射が分裂するとは限らない。実際、[モノイドの包含](#prop-cat1-03-monoid-non-surj-epi) $i:\mathbb N_0\to\mathbb Z$ はエピ射だが、右逆 $r:\mathbb Z\to\mathbb N_0$ があれば $i(r(-1))=-1$ となり、$i$ の像が非負整数だけであることに反する。
<!-- solution-end -->

### CAT1-03-B04 前順序では別対象が同型になり得る

- Level: B

$P=\{p,q\}$ の二項関係をすべての組で $x\preceq y$ として、[前順序から作る圏](../CAT1-02/index.md#def-cat1-02-preorder)を考える。$p\to q$ と $q\to p$ が互いに逆射であることを合成から確かめ、半順序圏の結論との違いを説明せよ。

<!-- solution-start -->
**詳細解答**。すべての組で関係が成り立つので、射を $u_{xy}:x\to y$ と書けば各 Hom は $\{u_{xy}\}$ で、合成は $u_{yz}\circ u_{xy}=u_{xz}$ となる。特に

$$
u_{qp}\circ u_{pq}=u_{pp}=1_p,\qquad
u_{pq}\circ u_{qp}=u_{qq}=1_q.
$$

従って $u_{pq}$ と $u_{qp}$ は互いに逆射で、$p\cong q$ だが $p\ne q$ である。前順序では $p\preceq q$ と $q\preceq p$ の両立を許す。半順序では[反対称律](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order)が $p=q$ を強制するため、異なる二対象の同型は起きない。
<!-- solution-end -->

### CAT1-03-C01 三つの圏で「同じ言葉」を再判定する

- Level: C

次の三つの射を考える。

1. 集合の圏 $\mathbf{Set}$ の包含 $j:\{0\}\to\{0,1\}$。
2. 二点鎖 $0\prec1$ から作る順序圏の唯一の非恒等射 $k:0\to1$。
3. 加法モノイドと準同型の圏 $\mathbf{Mon}$ の包含 $i:(\mathbb N_0,+,0)\to(\mathbb Z,+,0)$。

各射がモノ射、エピ射、同型射、分裂モノ射、分裂エピ射のどれを満たすかを判定し、同じ台集合の単射・全射だけでは一般の圏の結論を決められない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

1. $j$ は集合として単射だが全射でない。[集合の特徴づけ](#prop-cat1-03-set-characterization)でモノ射だがエピ射でも同型射でもない。$r:\{0,1\}\to\{0\}$ を定値写像とすれば $r\circ j=1_{\{0\}}$ なので分裂モノ射である。分裂エピ射なら $j\circ s=1_{\{0,1\}}$ となって $j$ が全射になるはずだが、$1$ は像に入らない。

2. $k$ は[順序圏の命題](#prop-cat1-03-poset-bimorphism)からモノ射かつエピ射。しかし $1\to0$ の射がないため、同型射でなく、分裂モノ射でも分裂エピ射でもない。どちらの分裂性も逆方向の射を要求するからである。

3. $i$ は[モノイドの命題](#prop-cat1-03-monoid-non-surj-epi)の通りモノ射かつエピ射だが、$-1$ は像に入らないので同型射でも分裂エピ射でもない。もし左逆 $\ell:\mathbb Z\to\mathbb N_0$ があれば $\ell\circ i=1_{\mathbb N_0}$。準同型性により $\ell(1)=1$（右辺の $1$ は非負整数の元）であり、

   $$
   0=\ell(0)=\ell(1+(-1))=\ell(1)+\ell(-1)=1+\ell(-1)
   $$

   を得る。しかし $\ell(-1)\in\mathbb N_0$ なので右辺は少なくとも $1$、矛盾する。従って分裂モノ射でもない。

まとめると、$j$ は「モノのみ・左逆あり」、$k$ と $i$ は「モノかつエピ・両側の逆なし」という相異なる現象を示す。$\mathbf{Set}$ ではすべての写像で消去律を試せるが、順序圏の Hom は高々一本、$\mathbf{Mon}$ の試験射は準同型だけである。したがって消去律の強さは選んだ圏によって異なる。
<!-- solution-end -->

## 9. 何を持って次へ進むか

同型射は二つの合成等式で、モノ射とエピ射はそれぞれ異なる向きの消去律で定義された。$\mathbf{Set}$ では単射・全射と一致するが、順序圏や $\mathbf{Mon}$ ではその直観をそのまま移せない。特に、モノ射かつエピ射でも逆射の存在は保証されない。

次の **CAT1-04「反対圏と双対原理」** では、射の向きを一斉に逆にしたとき、モノ射とエピ射が入れ替わる理由を、この消去律の形から導く。
