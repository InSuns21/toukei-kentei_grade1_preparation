# COMB15 有限半順序集合と Möbius 反転

[包除原理](../COMB3/index.md#thm-comb3-inclusion-exclusion)は、部分集合を足した情報から重複を取り除く方法でした。[整数の Möbius 反転](../../../代数系/NT/NT5/index.md#thm-nt5-mobius-inversion)では、約数を足した情報から元の値を取り出しました。二つの和は一見違いますが、「どの元がどの元より下にあるか」によって足す範囲が決まる点で共通しています。

この章では、[半順序集合](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-poset)の有限の場合を考えます。まず順序に沿う和を掛け算として表し、その掛け算の逆元を構成します。最後に、部分集合の包含と正整数の約数関係へ戻って具体的に数えます。すべて有限和であり、無限和の収束性は使いません。

## 1. 足す範囲を区間として取り出す

半順序は反射律・反対称律・推移律を満たす関係です（[順序関係の定義](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order)）。以下、有限かつ空でない半順序集合を $(P,\leq)$ とし、$x\leq y$ のときに限り二元を比較できるものとします。

二元 $x\leq y$ の間に入る全要素をまとめた集合が、順序の**区間**です。実数の区間とは違い、間の元を一列に並べられるとは限りません。

<a id="def-comb15-interval"></a>

<!-- formal-statement-start -->
> **定義（順序区間）**  
> 半順序集合 $(P,\leq)$ の比較可能な元 $x\leq y$ に対し、順序区間を

$$
[x,y]_P=\{z\in P:x\leq z\leq y\}
$$

> と定義する。$x\nleq y$ のとき、$[x,y]_P$ をここでは定義しない。
<!-- formal-statement-end -->

例えば $U=\{a,b\}$ のべき集合 $P=\mathcal P(U)$ を包含関係で順序付けます。[包含半順序の例](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-poset)で確かめたとおり、これは半順序集合です。

$$
[\varnothing,U]_P=\{\varnothing,\{a\},\{b\},U\},\qquad
[\{a\},U]_P=\{\{a\},U\}.
$$

$\{a\}$ と $\{b\}$ は比較不能なので $[\{a\},\{b\}]_P$ は定義されません。二つの区間で数える対象が異なることをまず確かめてください。

## 2. 順序に沿った畳み込み

関数 $f:P\to\mathbb Q$ の値を、$x\leq y$ の各組について持つ表に拡張して考えます。区間ごとに一つの数を割り当てれば、ある中間点 $z$ を通る二つの区間 $[x,z]$ と $[z,y]$ の重みを掛けて足すことができます。これが**incidence algebra（接合代数）**の積です。

<a id="def-comb15-incidence-algebra"></a>

<!-- formal-statement-start -->
> **定義（接合代数と区間畳み込み）**  
> 有限半順序集合 $P$ に対し、$x\leq y$ を満たす各組に有理数を割り当てる関数全体を $I(P;\mathbb Q)$ とする。$f,g\in I(P;\mathbb Q)$ の和と定数倍は各組ごとに定め、積（区間畳み込み）を

$$
(f*g)(x,y)=\sum_{x\leq z\leq y}f(x,z)g(z,y)
\quad(x\leq y)
$$

> と定義する。$x\nleq y$ に対する関数値は扱わない。
<!-- formal-statement-end -->

$P=\{0<1\}$ なら、比較可能な組は $(0,0),(0,1),(1,1)$ の三つです。特に

$$
(f*g)(0,1)=f(0,0)g(0,1)+f(0,1)g(1,1).
$$

各組で和を取るため、例えば $f*(g+h)$ の $(x,y)$ 成分は $\sum_{x\leq z\leq y}f(x,z)(g(z,y)+h(z,y))$ で、分配法則により $(f*g+f*h)(x,y)$ となります。右側の分配法則と定数倍についても各有限和を展開すれば確認できます。これに次の結合則を合わせて、区間関数の計算を代数として扱います。

積は一般に可換ではありません。例えば $f(0,0)=1$、$f(0,1)=1$、$f(1,1)=0$、$g(0,0)=0$、$g(0,1)=0$、$g(1,1)=1$ とすると $(f*g)(0,1)=1$、$(g*f)(0,1)=0$ です。

区間を「足して何も変えない」関数と、「区間に含まれるものを全部一度ずつ足す」関数を区別します。

<a id="def-comb15-delta-zeta"></a>

<!-- formal-statement-start -->
> **定義（単位関数とゼータ関数）**  
> 有限半順序集合 $P$ の比較可能な組 $x\leq y$ に対し、

$$
\delta(x,y)=\begin{cases}1&x=y,\\0&x<y,\end{cases}
\qquad \zeta(x,y)=1
$$

> とする。ここで $x<y$ は $x\leq y$ かつ $x\ne y$ の意味である。
<!-- formal-statement-end -->

先ほどの $\mathcal P(\{a,b\})$ で $\delta(\varnothing,U)=0$、$\zeta(\varnothing,U)=1$、$\delta(U,U)=\zeta(U,U)=1$ です。単位関数は等しい二元の組だけを残し、ゼータ関数は比較可能なすべての組に重み1を与えます。

<a id="prop-comb15-convolution-laws"></a>

<!-- formal-statement-start -->
> **命題（区間畳み込みの結合則と単位元）**  
> 有限半順序集合 $P$ と $f,g,h\in I(P;\mathbb Q)$ に対し、

$$
(f*g)*h=f*(g*h),\qquad \delta*f=f=f*\delta
$$

> が成立する。一般には $f*g=g*f$ とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

結合則は「中間点 $u,v$ が $x\leq u\leq v\leq y$ を満たす」という同じ組を二通りの順に足していることから出ます。単位元は、$\delta$ が $z=x$ または $z=y$ の一項だけを残すためです。

<!-- proof-start -->
### 証明

任意の $x\leq y$ を固定します。[畳み込みの定義](#def-comb15-incidence-algebra)を二回展開すると

$$
\begin{aligned}
((f*g)*h)(x,y)
&=\sum_{x\leq v\leq y}(f*g)(x,v)h(v,y)\\
&=\sum_{x\leq v\leq y}\sum_{x\leq u\leq v}f(x,u)g(u,v)h(v,y)\\
&=\sum_{x\leq u\leq y}f(x,u)\sum_{u\leq v\leq y}g(u,v)h(v,y)\\
&=(f*(g*h))(x,y).
\end{aligned}
$$

三行目は有限集合 $\{(u,v):x\leq u\leq v\leq y\}$ 上の和を、まず $u$ を選ぶ順に並べ替えたものです。[単位関数の定義](#def-comb15-delta-zeta)から

$$
\begin{aligned}
(\delta*f)(x,y)&=\sum_{x\leq z\leq y}\delta(x,z)f(z,y)=f(x,y),\\
(f*\delta)(x,y)&=\sum_{x\leq z\leq y}f(x,z)\delta(z,y)=f(x,y).
\end{aligned}
$$

第一式では $z=x$ の項だけ、第二式では $z=y$ の項だけが残ります。非可換性は定義直後の二元鎖の具体例が示しています。
<!-- proof-end -->

## 3. ゼータ関数を打ち消す Möbius 関数

$\zeta$ で順序に沿って足すと、対角以外にも寄与が増えます。逆にそれらを消せるなら、総和から元の値を取り出せます。$\eta=\zeta-\delta$ と置くと、$\eta(x,y)$ は $x<y$ で1、$x=y$ で0です。

二つの元の間に $k$ 回厳密に上がる列

$$
x=x_0<x_1<\cdots<x_k=y
$$

を考えます。[鎖の基本定義](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-chain)に、各隣接元が異なるという条件を追加したものです。

<a id="def-comb15-strict-chain"></a>

<!-- formal-statement-start -->
> **定義（厳密鎖）**  
> 半順序集合 $P$、整数 $k\ge1$、比較可能な元 $x\leq y$ に対し、$x=x_0<x_1<\cdots<x_k=y$ を満たす元の列を、$x$ から $y$ への長さ $k$ の厳密鎖とする。
<!-- formal-statement-end -->

例えば三元鎖 $0<1<2$ では、$0$ から $2$ への厳密鎖は $(0,2)$（長さ1）と $(0,1,2)$（長さ2）の二つです。各不等号が厳密であることを直接確認できます。$\eta$ を $k$ 回畳み込んだ $\eta^{*k}(x,y)$ は、この厳密鎖の個数になります。中間の元を一つずつ選ぶ積を展開すると、各因子が1になる条件がちょうど $x_0<x_1<\cdots<x_k$ だからです。

<a id="thm-comb15-mobius-existence"></a>

<!-- formal-statement-start -->
> **定理（Möbius 関数の存在・一意性と鎖表示）**  
> 元数 $N\ge1$ の有限半順序集合 $P$ に対し、ただ一つの $\mu\in I(P;\mathbb Q)$ が存在し、

$$
\mu*\zeta=\zeta*\mu=\delta
$$

> を満たす。ここで $\mu$ は順序に沿う総和を打ち消す逆元である。$\eta=\zeta-\delta$ と置けば、$\eta^{*0}=\delta$ として

$$
\mu=\sum_{k=0}^{N-1}(-1)^k\eta^{*k}.
$$

> 特に $x<y$ について、$\mu(x,y)$ は $x$ から $y$ への長さ $k\ge1$ の厳密鎖の個数に $(-1)^k$ を掛けた和である。また $x\leq y$ に対し、次の二つの再帰式が成り立つ。

$$
\mu(x,x)=1,\qquad
\mu(x,y)=-\sum_{x\leq z<y}\mu(x,z)
\quad(x<y),
$$

$$
\mu(x,y)=-\sum_{x<z\leq y}\mu(z,y)
\quad(x<y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限集合の厳密鎖は同じ元を二回含められません。従って $N$ 回以上厳密に上がれず、$\eta^{*N}=0$ です。有限等比和 $\delta-\eta+\eta^{*2}-\cdots$ が $\delta+\eta=\zeta$ の両側逆元となります。このことは、Möbius 関数が一つしかない理由も同時に説明します。

<!-- proof-start -->
### 証明

まず $k\ge1$ について $\eta^{*k}(x,y)$ が長さ $k$ の厳密鎖の個数であることを帰納法で確認します。$k=1$ では $\eta(x,y)$ が $x<y$ のときだけ1です。$k$ で成り立つとき、

$$
\eta^{*(k+1)}(x,y)
=\sum_{x\leq z\leq y}\eta^{*k}(x,z)\eta(z,y)
$$

の非零項は $x=x_0<\cdots<x_k=z<y$ の列に一対一に対応します。こうして長さ $k+1$ の厳密鎖を一回ずつ数えます。元数 $N$ の集合に長さ $N$ の厳密鎖があれば $N+1$ 個の相異なる元が必要になり矛盾するので、$\eta^{*N}=0$ です。

[結合則・単位元](#prop-comb15-convolution-laws)により $\eta$ の冪同士は通常の冪と同様に結合でき、

$$
\begin{aligned}
(\delta+\eta)*\sum_{k=0}^{N-1}(-1)^k\eta^{*k}
&=\delta+(-1)^{N-1}\eta^{*N}=\delta,\\
\left(\sum_{k=0}^{N-1}(-1)^k\eta^{*k}\right)*(\delta+\eta)
&=\delta+(-1)^{N-1}\eta^{*N}=\delta.
\end{aligned}
$$

ここで $\delta+\eta=\zeta$ ですから、表示された有限和は両側逆元です。別の両側逆元 $\nu$ があれば

$$
\nu=\nu*\delta=\nu*(\zeta*\mu)
=(\nu*\zeta)*\mu=\delta*\mu=\mu
$$

となり一意です。$x=y$ では $\eta^{*k}(x,x)=0$（$k\ge1$）なので $\mu(x,x)=1$。$x<y$ では $\delta(x,y)=0$ であるため、$\mu*\zeta=\delta$ を展開して

$$
0=\sum_{x\leq z\leq y}\mu(x,z)\zeta(z,y)
=\mu(x,y)+\sum_{x\leq z<y}\mu(x,z)
$$

を得ます。これは第一の再帰式です。$\zeta*\mu=\delta$ を同じように展開すると第二の再帰式が出ます。鎖表示は有限和の各 $\eta^{*k}$ を上で数え直したものです。
<!-- proof-end -->

### 鎖と菱形で符号を直接検算する

三元鎖 $0<1<2$ なら $\mu(0,0)=1$、$\mu(0,1)=-1$、さらに

$$
\mu(0,2)=-\bigl(\mu(0,0)+\mu(0,1)\bigr)
=-(1-1)=0.
$$

一方、$P=\mathcal P(\{a,b\})$ の包含半順序では、$\varnothing$ から $U$ までの一段の厳密鎖が1個、二段が2個です。従って鎖表示は $-1+2=1$ を与え、再帰式でも

$$
\mu(\varnothing,U)
=-\left(1+(-1)+(-1)\right)=1.
$$

二元の間に「何段の経路があるか」が違うので、同じ端点数でも反転係数は変わります。

## 4. 下からの和と上からの和を反転する

まず各 $x$ でそれ以下の $y$ の値を足した $F(x)$ を考えます。この操作は、$\zeta(y,x)=1$ を使っているので $\mu(y,x)$ で戻せそうです。上側の総和でも添字の向きを反転すれば同じ仕組みです。

<a id="thm-comb15-poset-inversion"></a>

<!-- formal-statement-start -->
> **定理（有限半順序集合の Möbius 反転）**  
> 有限半順序集合 $P$ と関数 $f,F:P\to\mathbb Q$ に対し、次の (i)、(ii) は同値である。
>
> (i) 任意の $x\in P$ について $F(x)=\sum_{y\leq x}f(y)$。
>
> (ii) 任意の $x\in P$ について

$$
f(x)=\sum_{y\leq x}\mu(y,x)F(y).
$$

> また $G,g:P\to\mathbb Q$ について、$G(x)=\sum_{y\geq x}g(y)$ と次の式は同値である。

$$
g(x)=\sum_{y\geq x}\mu(x,y)G(y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$F$ を $f$ で展開すると、$z\leq y\leq x$ という二段の和になります。$z$ を固定して内側の係数を足せば、[Möbius 関数の逆元関係](#thm-comb15-mobius-existence)によって $z=x$ の一項だけが残ります。逆方向と上側の和でも、どちらの逆元関係を使うかを入れ替えるだけです。

<!-- proof-start -->
### 証明

(i) を仮定して右辺へ代入します。有限和なので $z$ と $y$ の順を交換でき、

$$
\begin{aligned}
\sum_{y\leq x}\mu(y,x)F(y)
&=\sum_{y\leq x}\mu(y,x)\sum_{z\leq y}f(z)\\
&=\sum_{z\leq x}f(z)\sum_{z\leq y\leq x}\mu(y,x)\\
&=\sum_{z\leq x}f(z)(\zeta*\mu)(z,x)\\
&=\sum_{z\leq x}f(z)\delta(z,x)=f(x).
\end{aligned}
$$

逆に (ii) を仮定すれば

$$
\begin{aligned}
\sum_{y\leq x}f(y)
&=\sum_{y\leq x}\sum_{z\leq y}\mu(z,y)F(z)\\
&=\sum_{z\leq x}F(z)\sum_{z\leq y\leq x}\mu(z,y)\\
&=\sum_{z\leq x}F(z)(\mu*\zeta)(z,x)=F(x).
\end{aligned}
$$

上側の和では、$G(y)=\sum_{z\geq y}g(z)$ を $\sum_{y\geq x}\mu(x,y)G(y)$ に代入します。添字は $x\leq y\leq z$ となるので

$$
\begin{aligned}
\sum_{y\geq x}\mu(x,y)G(y)
&=\sum_{z\geq x}g(z)\sum_{x\leq y\leq z}\mu(x,y)\\
&=\sum_{z\geq x}g(z)(\mu*\zeta)(x,z)=g(x).
\end{aligned}
$$

逆に $g(y)=\sum_{z\geq y}\mu(y,z)G(z)$ から上側を足すと

$$
\sum_{y\geq x}g(y)
=\sum_{z\geq x}G(z)\sum_{x\leq y\leq z}\mu(y,z)
=\sum_{z\geq x}G(z)(\zeta*\mu)(x,z)=G(x).
$$

両方向とも有限和の交換なので、追加の収束仮定は不要です。
<!-- proof-end -->

### 四元の包含順序で確かめる

$P=\mathcal P(\{a,b\})$ で $f(\varnothing)=2$、$f(\{a\})=3$、$f(\{b\})=5$、$f(U)=7$ とします。下側の和を定義どおり求めると

| $x$ | $\varnothing$ | $\{a\}$ | $\{b\}$ | $U$ |
|---|---:|---:|---:|---:|
| $F(x)$ | $2$ | $5$ | $7$ | $17$ |

ここで $\mu(U,U)=1$、$\mu(\{a\},U)=\mu(\{b\},U)=-1$、$\mu(\varnothing,U)=1$ なので、[反転公式](#thm-comb15-poset-inversion)から

$$
f(U)=17-5-7+2=7.
$$

順序の「上と下」を取り違えると、$F(\varnothing)$ と $F(U)$ の意味が反転してしまいます。まず各 $F(x)$ がどの元を足しているか書き出すのが安全です。

## 5. 部分集合の包含は包除原理になる

有限集合 $U$ の全ての部分集合からなる $P=\mathcal P(U)$ では、区間 $[A,B]$ の元は $A\subseteq S\subseteq B$ という部分集合です。$B\setminus A$ の要素を好きに選ぶことで $S=A\cup T$（$T\subseteq B\setminus A$）と一意に書けます。この対応により、すべての区間が小さな Boolean 束（包含順序のべき集合）と同じ構造になります。

<a id="prop-comb15-boolean-mobius"></a>

<!-- formal-statement-start -->
> **命題（Boolean 束の Möbius 関数）**  
> 有限集合 $U$ のべき集合 $\mathcal P(U)$ を包含関係で順序付ける。$A\subseteq B\subseteq U$ に対して、

$$
\mu(A,B)=(-1)^{|B\setminus A|}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

候補の関数を $\nu(A,B)=(-1)^{|B\setminus A|}$ と置き、$\nu*\zeta$ を計算します。区間の部分集合をサイズで分けると、二項係数の交代和になります。

<!-- proof-start -->
### 証明

$A\subseteq B$ を固定し、$k=|B\setminus A|$ とします。[二項係数の計数](../COMB2/index.md#thm-comb2-binomial-count)により、$A\subseteq S\subseteq B$ で $|S\setminus A|=j$ となる $S$ は $\binom kj$ 個です。従って

$$
\begin{aligned}
(\nu*\zeta)(A,B)
&=\sum_{A\subseteq S\subseteq B}\nu(A,S)\\
&=\sum_{j=0}^k\binom kj(-1)^j
 =(1-1)^k.
\end{aligned}
$$

$k=0$ のときは和が1（空積を1とする）、$k>0$ のときは0です。従って $\nu*\zeta=\delta$。[Möbius 逆元の存在](#thm-comb15-mobius-existence)から $\zeta*\mu=\delta$ なので、[結合則](#prop-comb15-convolution-laws)を使って $\nu=(\nu*\zeta)*\mu=\delta*\mu=\mu$ です。なお最後の交代和は $k>0$ のとき一つの指定要素の採否を切り替える符号反転の全単射でも0と確認できます。
<!-- proof-end -->

特に、$F(B)=\sum_{A\subseteq B}f(A)$ として[半順序集合の反転公式](#thm-comb15-poset-inversion)へ代入すれば

$$
f(B)=\sum_{A\subseteq B}(-1)^{|B\setminus A|}F(A).
$$

これは包含関係の Möbius 反転です。[有限包除原理](../COMB3/index.md#thm-comb3-inclusion-exclusion)は、ある条件をすべて満たす集合に対する**上側の和の反転**として現れます。どの条件が違反したかをちょうど表す集合を $S$ とし、その人数を $g(S)$、指定した条件集合 $T$ のすべてに違反する人数を $G(T)$ とすると

$$
G(T)=\sum_{S\supseteq T}g(S).
$$

上側の[反転公式](#thm-comb15-poset-inversion)を $T=\varnothing$ に適用して

$$
g(\varnothing)=\sum_{S\subseteq U}(-1)^{|S|}G(S)
$$

を得ます。右辺は包除原理による「一つも違反しない人数」です。$G(\varnothing)$ は全候補数であって0ではありません。

## 6. 約数順序では整数の Möbius 関数になる

固定した正整数 $M$ の正の約数全体 $D_M=\{d\in\mathbb N:d\mid M\}$ に、$d\leq_{\mathrm{div}}n$ を $d\mid n$ で定めます。整除関係は反射的・反対称的・推移的なので、この有限集合は半順序集合です。通常の数の大小と異なり、例えば $2$ と $3$ は $D_6$ で比較不能です。

<a id="prop-comb15-divisor-mobius"></a>

<!-- formal-statement-start -->
> **命題（約数順序の Möbius 関数）**  
> 正整数 $M$ の約数半順序集合 $D_M$ に対し、$d,n\in D_M$、$d\mid n$ のとき、

$$
\mu_{D_M}(d,n)=\mu_{\mathrm{arith}}(n/d)
$$

> が成立する。右辺は [NT4 の数論的 Möbius 関数](../../../代数系/NT/NT4/index.md#def-nt4-mobius)である。
<!-- formal-statement-end -->

### 証明の見取り図

区間 $[d,n]$ に入る元は $d\mid z\mid n$ です。$t=z/d$ と置けば $t$ は $n/d$ の正の約数を一度ずつ走ります。従って[数論的 Möbius 関数の約数和消去](../../../代数系/NT/NT5/index.md#thm-nt5-mobius-unit)を、この区間の畳み込みへ読み替えられます。

<!-- proof-start -->
### 証明

$\nu(d,n)=\mu_{\mathrm{arith}}(n/d)$（$d\mid n$）と置きます。$d\mid n$ について

$$
\begin{aligned}
(\nu*\zeta)(d,n)
&=\sum_{d\mid z\mid n}\nu(d,z)\\
&=\sum_{d\mid z\mid n}\mu_{\mathrm{arith}}(z/d)\\
&=\sum_{t\mid(n/d)}\mu_{\mathrm{arith}}(t)
=\begin{cases}1&d=n,\\0&d\ne n.\end{cases}
\end{aligned}
$$

三行目では $z=dt$ と書き、$t\mid n/d$ との一対一対応を使いました。最後は[NT5 の逆元関係](../../../代数系/NT/NT5/index.md#thm-nt5-mobius-unit)です。したがって $\nu*\zeta=\delta$ であり、[逆元の一意性](#thm-comb15-mobius-existence)から $\nu=\mu_{D_M}$ です。
<!-- proof-end -->

$M=12$ では $[2,12]_{D_{12}}=\{2,4,6,12\}$ であり、$t=z/2$ によって $\{1,2,3,6\}$ へ対応します。[数論的 Möbius 関数の定義](../../../代数系/NT/NT4/index.md#def-nt4-mobius)から $\mu_{D_{12}}(2,12)=\mu_{\mathrm{arith}}(6)=1$、一方 $\mu_{D_{12}}(1,12)=\mu_{\mathrm{arith}}(12)=0$ です。$\mu_{D_{12}}(2,12)$ は単に「12の Möbius 値」ではなく、区間の左端2と右端12に依存します。

ここで[NT5 の約数和反転](../../../代数系/NT/NT5/index.md#thm-nt5-mobius-inversion)は、任意の正整数にわたる約数関係を扱います。今回の定理は**一つの有限な $D_M$ に制限した**同じ式です。一般の有限半順序集合では約数や素因数分解は不要で、前節までの有限区間の構成だけで反転が成立します。

## 7. 演習：区間・符号・逆変換を手で確認する

### Level A：区間と係数を読む

#### A1. 三元鎖の Möbius 表

$P=\{a<b<c\}$ に対し、すべての比較可能な組の $\mu(x,y)$ を求めよ。特に $\mu(a,c)$ がなぜ0になるか再帰式を示せ。

- Level: A
- ID: COMB15-A1

<!-- solution-start -->
**詳細解答**

[Möbius の再帰式](#thm-comb15-mobius-existence)から対角は $\mu(a,a)=\mu(b,b)=\mu(c,c)=1$ です。隣接する区間では

$$
\mu(a,b)=-\mu(a,a)=-1,\qquad
\mu(b,c)=-\mu(b,b)=-1.
$$

$[a,c]=\{a,b,c\}$ なので

$$
\mu(a,c)=-\left(\mu(a,a)+\mu(a,b)\right)
=-(1-1)=0.
$$

比較可能な六組の値は順に $(a,a),(a,b),(a,c),(b,b),(b,c),(c,c)$ に対して $1,-1,0,1,-1,1$ です。
<!-- solution-end -->

#### A2. 四元の Boolean 束

$U=\{a,b\}$、$P=\mathcal P(U)$ とする。$\mu(\varnothing,U)$、$\mu(\{a\},U)$、$\mu(U,U)$ を求め、$\sum_{\varnothing\subseteq S\subseteq U}\mu(\varnothing,S)=0$ を確認せよ。

- Level: A
- ID: COMB15-A2

<!-- solution-start -->
**詳細解答**

[Boolean 束の公式](#prop-comb15-boolean-mobius)へ $|U\setminus\varnothing|=2$、$|U\setminus\{a\}|=1$、$|U\setminus U|=0$ を代入し、順に $1,-1,1$ です。同様に $\mu(\varnothing,\varnothing)=1$、$\mu(\varnothing,\{a\})=\mu(\varnothing,\{b\})=-1$ です。従って求める和は $1-1-1+1=0$。これは $\mu*\zeta=\delta$ の $(\varnothing,U)$ 成分と一致します。
<!-- solution-end -->

#### A3. 下側の和の復元

$P=\mathcal P(\{a,b\})$ 上で $F(\varnothing)=1$、$F(\{a\})=4$、$F(\{b\})=6$、$F(U)=15$ とする。$F(x)=\sum_{y\subseteq x}f(y)$ を満たす $f$ を全点で求めよ。

- Level: A
- ID: COMB15-A3

<!-- solution-start -->
**詳細解答**

[下側の反転](#thm-comb15-poset-inversion)と[Boolean 束の係数](#prop-comb15-boolean-mobius)を使います。$f(\varnothing)=F(\varnothing)=1$。一元集合では

$$
f(\{a\})=F(\{a\})-F(\varnothing)=4-1=3,
$$

$$
f(\{b\})=F(\{b\})-F(\varnothing)=6-1=5.
$$

$U$ では $f(U)=15-4-6+1=6$ です。検算すると、$F(U)=1+3+5+6=15$、$F(\{a\})=1+3=4$、$F(\{b\})=1+5=6$ となり全点の値が一致します。
<!-- solution-end -->

#### A4. 比較不能な元を混ぜない

$P=\{a,b,c\}$ で $a<b$、$a<c$、$b,c$ は比較不能とする。$\mu(a,b)$、$\mu(a,c)$ を求め、$\mu(b,c)$ を定義しない理由を説明せよ。

- Level: A
- ID: COMB15-A4

<!-- solution-start -->
**詳細解答**

$[a,b]=\{a,b\}$ なので[再帰式](#thm-comb15-mobius-existence)から $\mu(a,b)=-\mu(a,a)=-1$ です。同様に $[a,c]=\{a,c\}$ で $\mu(a,c)=-1$。一方 $b\nleq c$ なので、[順序区間の定義](#def-comb15-interval)で $[b,c]$ を作れず、[接合代数](#def-comb15-incidence-algebra)の関数値 $\mu(b,c)$ も定義対象外です。比較不能を係数0と混同しません。
<!-- solution-end -->

#### A5. 約数の区間

$D_{12}$ の整除順序において、$[2,12]$ と $[1,12]$ を列挙し、$\mu_{D_{12}}(2,12)$ と $\mu_{D_{12}}(1,12)$ を求めよ。

- Level: A
- ID: COMB15-A5

<!-- solution-start -->
**詳細解答**

$2\mid z\mid12$ なら $z\in\{2,4,6,12\}$、$1\mid z\mid12$ なら $z\in\{1,2,3,4,6,12\}$ です。[約数順序の公式](#prop-comb15-divisor-mobius)より

$$
\mu_{D_{12}}(2,12)=\mu_{\mathrm{arith}}(6)=(-1)^2=1,
$$

$$
\mu_{D_{12}}(1,12)=\mu_{\mathrm{arith}}(12)=0.
$$

後者は $12=2^2\cdot3$ に平方因子があるためです（[数論的定義](../../../代数系/NT/NT4/index.md#def-nt4-mobius)）。
<!-- solution-end -->

### Level B：どちら向きに反転するか

#### B1. 上側の和の復元

$P=\mathcal P(\{a,b\})$ で $G(\varnothing)=15$、$G(\{a\})=10$、$G(\{b\})=12$、$G(U)=8$ とする。$G(T)=\sum_{S\supseteq T}g(S)$ を満たす $g$ の値を全て求めよ。

- Level: B
- ID: COMB15-B1

<!-- solution-start -->
**詳細解答**

[上側の反転](#thm-comb15-poset-inversion)を使います。$g(U)=G(U)=8$。$g(\{a\})=G(\{a\})-G(U)=10-8=2$、$g(\{b\})=12-8=4$ です。空集合では[Boolean 束の係数](#prop-comb15-boolean-mobius)を用い

$$
g(\varnothing)=G(\varnothing)-G(\{a\})-G(\{b\})+G(U)
=15-10-12+8=1.
$$

戻して足すと $G(\varnothing)=1+2+4+8=15$、$G(\{a\})=2+8=10$、$G(\{b\})=4+8=12$、$G(U)=8$ です。
<!-- solution-end -->

#### B2. 長さ四の鎖を経路で数える

$P=\{0<1<2<3\}$ とする。$\mu(0,3)$ を再帰式で求め、厳密鎖の長さごとの個数を数える方法でも検算せよ。

- Level: B
- ID: COMB15-B2

<!-- solution-start -->
**詳細解答**

[再帰式](#thm-comb15-mobius-existence)から $\mu(0,0)=1$、$\mu(0,1)=-1$、$\mu(0,2)=-(1-1)=0$。従って

$$
\mu(0,3)=-\bigl(\mu(0,0)+\mu(0,1)+\mu(0,2)\bigr)=0.
$$

一方 $0$ から $3$ の厳密鎖は長さ1では $(0,3)$ の1個、長さ2では中間点が1または2の2個、長さ3では $(0,1,2,3)$ の1個です。[鎖表示](#thm-comb15-mobius-existence)に代入すると $-1+2-1=0$。二通りが一致します。
<!-- solution-end -->

#### B3. 三つの禁止条件を包除で数える

$\Omega=\{1,2,\ldots,12\}$ とする。$A_1$ は2で割り切れる整数の集合、$A_2$ は3で割り切れる整数の集合、$A_3$ は4で割り切れる整数の集合とする。違反した条件の**番号**の集合を $S\subseteq\{1,2,3\}$ とし、$G(T)$ を $T$ に属する番号 $i$ の条件 $A_i$ をすべて満たす整数の個数とする。上側の Möbius 反転で、どの条件も満たさない整数の個数を求め、直接列挙せよ。

- Level: B
- ID: COMB15-B3

<!-- solution-start -->
**詳細解答**

$T=\varnothing$ では $G(\varnothing)=12$。単一条件の人数は $G(\{1\})=6$、$G(\{2\})=4$、$G(\{3\})=3$ です。共通条件は最小公倍数を使い、

$$
G(\{1,2\})=2,\quad G(\{1,3\})=3,\quad
G(\{2,3\})=1,\quad G(\{1,2,3\})=1.
$$

各整数をちょうど一つの違反集合 $S\subseteq\{1,2,3\}$ に分類すると $G(T)=\sum_{S\supseteq T}g(S)$ です。[上側の反転](#thm-comb15-poset-inversion)と[Boolean 係数](#prop-comb15-boolean-mobius)により

$$
g(\varnothing)=12-(6+4+3)+(2+3+1)-1=4.
$$

直接に $2,3,4$ のいずれでも割れない整数は $\{1,5,7,11\}$ の四つです。$A_3\subseteq A_1$ なので条件が重複しても反転は成立し、交わりの項がその重複を補正します。
<!-- solution-end -->

#### B4. 分岐する順序の反転係数

五元 $P=\{0,p,q,r,1\}$ に $0<p<1$ と $0<q<r<1$、これらの推移的帰結のみを与え、$p$ と $q,r$ は比較不能とする。$\mu(0,1)$ を求め、なぜ三元鎖の値と違うか説明せよ。

- Level: B
- ID: COMB15-B4

<!-- solution-start -->
**詳細解答**

[再帰式](#thm-comb15-mobius-existence)で $\mu(0,0)=1$、$\mu(0,p)=\mu(0,q)=-1$ です。$[0,r]=\{0,q,r\}$ であり、$p$ は $r$ 以下でないので

$$
\mu(0,r)=-\bigl(\mu(0,0)+\mu(0,q)\bigr)=0.
$$

$[0,1]$ は五元全部なので

$$
\mu(0,1)=-\bigl(1-1-1+0\bigr)=1.
$$

鎖表示では長さ1が1、長さ2が $p,q,r$ を中間とする3、長さ3が $0<q<r<1$ の1なので $-1+3-1=1$ です。三元鎖では長さ2が1だけで $-1+1=0$。分岐の有無が符号付きの鎖数を変えています。
<!-- solution-end -->

### Level C：一般式と具体的計数をつなぐ

#### C1. 部分集合の大きさを二乗して足す

$U=\{a,b,c\}$、$P=\mathcal P(U)$ とし、$f(S)=|S|^2$、$F(T)=\sum_{S\subseteq T}f(S)$ とする。(1) $|T|=0,1,2,3$ ごとの $F(T)$ を求めよ。(2) Möbius 反転で $f(U)$ を復元し、直接計算と一致させよ。

- Level: C
- ID: COMB15-C1

<!-- solution-start -->
**詳細解答**

(1) $|T|=k$ なら $T$ の $j$ 元部分集合は[二項係数の計数](../COMB2/index.md#thm-comb2-binomial-count)によって $\binom kj$ 個です。従って

$$
F(T)=\sum_{j=0}^k\binom kj j^2.
$$

$k=0$ では $F=0$、$k=1$ では $0+1=1$、$k=2$ では $0+2\cdot1+1\cdot4=6$、$k=3$ では $0+3\cdot1+3\cdot4+1\cdot9=24$ です。

(2) [下側の反転](#thm-comb15-poset-inversion)を $x=U$ に、[Boolean 係数](#prop-comb15-boolean-mobius)を $\mu(S,U)$ に適用します。$|S|=j$ では $\mu(S,U)=(-1)^{3-j}$ なので、

$$
\begin{aligned}
f(U)&=\sum_{S\subseteq U}(-1)^{3-|S|}F(S)\\
&=(-1)^3\cdot0+3(-1)^2\cdot1
+3(-1)^1\cdot6+(-1)^0\cdot24\\
&=0+3-18+24=9.
\end{aligned}
$$

直接には $|U|=3$ なので $f(U)=3^2=9$。途中で $F(S)$ を $f(S)$ と混同しないことが重要です。
<!-- solution-end -->

#### C2. 約数和のデータから Euler 関数を戻す

$D_{30}$ 上で $f(d)=\varphi(d)$、$F(n)=\sum_{d\mid n}f(d)$ とする。[Euler 関数の約数和と反転](../../../代数系/NT/NT5/index.md#prop-nt5-totient-divisor-sum)を使って $F(n)$ を明示し、$D_{30}$ の Möbius 反転で $\varphi(30)$ を計算せよ。最後に $1$ から $30$ までの整数で検算せよ。

- Level: C
- ID: COMB15-C2

<!-- solution-start -->
**詳細解答**

[Euler 関数の約数和と反転](../../../代数系/NT/NT5/index.md#prop-nt5-totient-divisor-sum)によって、各 $n\mid30$ で $F(n)=n$ です。[下側の反転](#thm-comb15-poset-inversion)と[約数順序の係数](#prop-comb15-divisor-mobius)から

$$
\varphi(30)=\sum_{d\mid30}\mu_{\mathrm{arith}}(30/d)\,d.
$$

$30=2\cdot3\cdot5$ の正の約数は $1,2,3,5,6,10,15,30$ です。[数論的 Möbius 関数の定義](../../../代数系/NT/NT4/index.md#def-nt4-mobius)により $\mu_{\mathrm{arith}}(30/d)$ は素因数の個数による符号なので、上式は

$$
\begin{aligned}
\varphi(30)&=(-1)\cdot1+(1)\cdot2+(1)\cdot3+(1)\cdot5\\
&\quad+(-1)\cdot6+(-1)\cdot10+(-1)\cdot15+(1)\cdot30\\
&=-1+2+3+5-6-10-15+30=8.
\end{aligned}
$$

直接に $30$ と互いに素な $1\le k\le30$ は $\{1,7,11,13,17,19,23,29\}$ の八つです。個々の $d\mid30$ の反転係数が $\mu_{\mathrm{arith}}(30/d)$ であって $\mu_{\mathrm{arith}}(d)$ とは限らない点も確認できました。
<!-- solution-end -->

## 8. まとめ

区間 $[x,y]$ に沿って二つの関数を畳み込むと、$\zeta=\delta+\eta$ が「順序に沿う総和」を表し、有限な厳密鎖の交代和がその逆元 $\mu$ を与えます。[反転公式](#thm-comb15-poset-inversion)は、下側へ足すか上側へ足すかを明示すれば、同じ $\mu$ で元の値を取り戻せます。

包含順序では $(-1)^{|B\setminus A|}$ が包除原理を生み、約数順序では $\mu_{\mathrm{arith}}(n/d)$ が[数論の反転公式](../../../代数系/NT/NT5/index.md#thm-nt5-mobius-inversion)へ一致します。重要なのは単一の符号公式を暗記することではなく、**どの区間の何を足したか**を確定してから逆変換することです。
