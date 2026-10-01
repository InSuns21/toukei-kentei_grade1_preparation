# F0-02C6 関数解析VI：Hahn--Banach・汎関数拡張

部分空間の上では簡単に作れる線形汎関数を、**支配条件やノルムを壊さず全空間へ延長したい**ことがあります。Hahn--Banach の定理は、その延長を保証する基本定理です。

この章では、

~~~text
一次元だけ延長する
  ↓
延長可能な値 c の上下限を求める
  ↓ 劣線形性
上下限の区間が空でない
  ↓
延長候補を半順序化する
  ↓ Zorn の補題
全空間まで延長する
  ↓
ノルム保存拡張・点分離
~~~

という順で、局所的な延長から大域的な延長へ進みます。

---

## 1. なぜ線形汎関数を延長したいのか

$0\ne x_0\in X$ を固定し、

$$
M=\operatorname{span}\{x_0\}
$$

とします。この一次元部分空間の上では

$$
f_0(tx_0)=t\|x_0\|
$$

と置けば、

$$
f_0(x_0)=\|x_0\|
$$

なので $x_0$ を確実に検出できます。

しかし $f_0$ は $M$ の上でしか定義されていません。後で弱位相や分離を扱うには、これを $X$ 全体の連続線形汎関数へ延長したいわけです。

その際、単に延長できればよいのではなく、元の大きさを制御する不等式も保ちたい。そのための支配関数が次の概念です。

---

## 2. 劣線形汎関数

<a id="def-f0-02c6-sublinear-functional"></a>

<!-- formal-statement-start -->
> **定義（劣線形汎関数）**  
> 実ベクトル空間 $X$ 上の関数 $p:X\to\mathbb R$ が

$$
p(x+y)\le p(x)+p(y),
\qquad
p(ax)=a,p(x)
\quad(a\ge0)
$$

> をすべての $x,y\in X$ と $a\ge0$ について満たすとき、$p$ を **劣線形汎関数（sublinear functional）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c6-sublinear-functional -->
### 例：ノルムは劣線形汎関数

**定義の確認**：$p(x)=\|x\|$ と置きます。

三角不等式から

$$
p(x+y)=\|x+y\|
\le
\|x\|+\|y\|
=
p(x)+p(y),
$$

また $a\ge0$ なら

$$
p(ax)=\|ax\|
=a\|x\|
=ap(x).
$$

従ってノルムは劣線形汎関数です。Hahn--Banach のノルム保存拡張でノルムを支配関数に使えるのはこのためです。
<!-- definition-example-end -->

---

## 3. Hahn--Banach の定理：実線形版

<a id="thm-f0-02c6-hahn-banach-real"></a>

<!-- formal-statement-start -->
> **定理（Hahn--Banach：実線形版）**  
> $X$ を実ベクトル空間、$M\subset X$ を線形部分空間、$p:X\to\mathbb R$ を劣線形汎関数とする。  
> $M$ 上の線形汎関数 $f_0:M\to\mathbb R$ が

$$
f_0(x)\le p(x)
\qquad(x\in M)
$$

> を満たすとする。このとき、$f|_M=f_0$ かつ

$$
f(x)\le p(x)
\qquad(x\in X)
$$

> を満たす線形汎関数 $f:X\to\mathbb R$ が存在する。
<!-- formal-statement-end -->

結論は「線形汎関数を延長できる」だけではありません。**支配不等式を全空間でそのまま保てる**ことが重要です。

---

## 4. 証明の見取り図

証明は二段階に分かれます。

~~~text
局所段階
M から M+span{z} へ一次元だけ延長する
  ↓
新しい値 c=f(z) の許容区間を求める
  ↓ 劣線形性
許容区間が空でない

大域段階
支配条件を保つ延長候補全体を半順序化
  ↓ chain の合併が上界
Zorn の補題
  ↓
極大延長
  ↓ 一次元延長と極大性
定義域は X 全体
~~~

一次元延長では劣線形性が働き、全空間へ到達するところで Zorn の補題が働きます。

<!-- proof-start -->
### 証明

#### 4.1 一方向だけ定義域を広げる

$z\notin M$ を取り、

$$
M_1=M+\operatorname{span}\{z\}
$$

へ延長します。

$z\notin M$ なので、$M_1$ の各元は一意に

$$
x+tz
\qquad(x\in M, t\in\mathbb R)
$$

と書けます。

線形な延長 $f_1$ が存在するなら、ある実数

$$
c:=f_1(z)
$$

を用いて

$$
f_1(x+tz)=f_0(x)+tc
$$

でなければなりません。したがって問題は、すべての $x\in M$ と $t\in\mathbb R$ について

$$
f_0(x)+tc
\le
p(x+tz)
$$

となる $c$ を選べるかどうかです。

#### 4.2 (t>0) から上限を出す

$t>0$ とします。支配条件を $t$ で割ると

$$
f_0\left(\frac{x}{t}\right)+c
\le
\frac1t p(x+tz).
$$

劣線形汎関数の正の斉次性から

$$
\frac1t p(x+tz)
=
p\left(\frac{x}{t}+z\right).
$$

ここで

$$
y:=\frac{x}{t}\in M
$$

と置けば

$$
c
\le
p(y+z)-f_0(y)
\qquad(y\in M).
$$

従って必要なのは

$$
c
\le
\inf_{y\in M}
\{p(y+z)-f_0(y)\}.
$$

#### 4.3 (t<0) から下限を出す

今度は $t<0$ とし、

$$
s:=-t>0
$$

と置きます。支配条件は

$$
f_0(x)-sc
\le
p(x-sz)
$$

です。$s>0$ で割って

$$
f_0\left(\frac{x}{s}\right)-c
\le
p\left(\frac{x}{s}-z\right).
$$

$$
y:=\frac{x}{s}\in M
$$

と置けば

$$
c
\ge
f_0(y)-p(y-z)
\qquad(y\in M).
$$

従って

$$
\sup_{y\in M}
\{f_0(y)-p(y-z)\}
\le c
$$

が必要です。

$t=0$ では元の仮定 $f_0(x)\le p(x)$ そのものなので、新しい条件は生じません。

#### 4.4 上下限の区間が空でないことを示す

必要な条件をまとめると

$$
\sup_{x\in M}
\{f_0(x)-p(x-z)\}
\le c
\le
\inf_{y\in M}
\{p(y+z)-f_0(y)\}.
$$

この区間が空でないことを示します。

任意の $x,y\in M$ に対して、$f_0$ の線形性と $f_0\le p$ から

$$
f_0(x)-f_0(y)
=
f_0(x-y)
\le
p(x-y).
$$

一方

$$
x-y
=
(x-z)+(z-y)
$$

なので、劣加法性から

$$
p(x-y)
\le
p(x-z)+p(z-y).
$$

ここで $y$ を $-y$ と取り直しても $M$ 全体を動くため、同値に

$$
f_0(x)-p(x-z)
\le
p(y+z)-f_0(y)
$$

がすべての $x,y\in M$ について成り立ちます。

より直接には、上式で $x$ と $-y$ を用いて

$$
\begin{aligned}
f_0(x)+f_0(y)
&=
f_0(x+y)\\
&\le
p(x+y)\\
&=
p((x-z)+(y+z))\\
&\le
p(x-z)+p(y+z),
\end{aligned}
$$

だから

$$
f_0(x)-p(x-z)
\le
p(y+z)-f_0(y).
$$

従って

$$
\sup_{x\in M}
\{f_0(x)-p(x-z)\}
\le
\inf_{y\in M}
\{p(y+z)-f_0(y)\}.
$$

よってその間から実数 $c$ を一つ選べます。

この $c$ で

$$
f_1(x+tz)=f_0(x)+tc
$$

と定めれば、上で導いた $t>0,t<0,t=0$ の各場合から $f_1\le p$ が成り立ちます。これで一次元延長が完成しました。

#### 4.5 延長候補全体を半順序化する

$\mathscr E$ を、対 $(N,g)$ で

1. $M\subseteq N\subseteq X$
2. $N$ は線形部分空間
3. $g:N\to\mathbb R$ は線形
4. $g|_M=f_0$
5. $g(x)\le p(x)$ がすべての $x\in N$ で成り立つ

もの全体とします。

$(M,f_0)\in\mathscr E$ なので

$$
\mathscr E\ne\varnothing.
$$

$$
(N_1,g_1)\preceq(N_2,g_2)
$$

を

$$
N_1\subseteq N_2,
\qquad
g_2|_{N_1}=g_1
$$

で定めます。

#### 4.6 chain の合併が上界になる

$\mathscr C\subset\mathscr E$ を chain とし、

$$
N_{\mathscr C}
=
\bigcup_{(N,g)\in\mathscr C}N
$$

と置きます。

$x,y\in N_{\mathscr C}$ を取ると、ある $(N_1,g_1),(N_2,g_2)\in\mathscr C$ が $x\in N_1$, $y\in N_2$ を満たします。chain なので、例えば $N_1\subseteq N_2$ とできます。このとき $x,y\in N_2$ なので

$$
x+y\in N_2\subseteq N_{\mathscr C},
\qquad
ax\in N_2\subseteq N_{\mathscr C}.
$$

従って $N_{\mathscr C}$ は線形部分空間です。

$x\in N_{\mathscr C}$ に対し、$x\in N$ となる $(N,g)\in\mathscr C$ を一つ取り

$$
g_{\mathscr C}(x):=g(x)
$$

と定めます。

別の $(N',g')\in\mathscr C$ も $x\in N'$ を満たすとします。chain 性から $N\subseteq N'$ または $N'\subseteq N$ です。前者なら延長関係より

$$
g'|_N=g,
$$

従って $g'(x)=g(x)$ です。

逆に $N'\subseteq N$ なら

$$
g|_{N'}=g'
$$

なので、やはり

$$
g(x)=g'(x).
$$

したがって $g_{\mathscr C}(x)$ は選んだ候補によらず定まります。

$x,y\in N_{\mathscr C}$ を同時に含む chain 内の大きい定義域を一つ取れば、その上の線形性から

$$
g_{\mathscr C}(ax+by)
=
a g_{\mathscr C}(x)+b g_{\mathscr C}(y)
$$

です。また各候補で支配条件が成り立つので

$$
g_{\mathscr C}(x)\le p(x)
$$

も保たれます。

従って

$$
(N_{\mathscr C},g_{\mathscr C})\in\mathscr E
$$

であり、これは $\mathscr C$ の上界です。

#### 4.7 Zorn の補題で全空間まで進む

$\mathscr E$ の任意の chain が上界を持つので、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から極大元

$$
(N_*,g_*)
$$

が存在します。

もし $N_*\ne X$ なら

$$
z\in X\setminus N_*
$$

を取れます。4.1--4.4 の一次元延長を $(N_*,g_*)$ に適用すると、

$$
N_*+\operatorname{span}\{z\}
$$

まで支配条件を保って延長できます。これは $(N_*,g_*)$ より真に大きい $\mathscr E$ の元なので極大性に反します。

従って

$$
N_*=X.
$$

$$
f:=g_*:X\to\mathbb R
$$

が求める延長です。
<!-- proof-end -->

---

## 5. 選択原理はどこで使ったか

一次元延長では、実数の上下限の間から $c$ を一つ取っただけでした。

一般の無限次元空間で全空間まで延長する段階では、

$$
\boxed{
\text{Zorn の補題}
\Longrightarrow
\text{極大延長の存在}
}
$$

を使いました。

つまり、劣線形性は「一方向へ延長できる」ことを保証し、Zorn の補題はその局所延長を整合的に極大化する役割を持ちます。

---

<a id="ref-hahn-banach-norm-preserving-extension"></a>

## 6. ノルム保存拡張

$X$ をノルム空間、$M\subset X$ を線形部分空間、$f_0\in M^*$ とします。

$$
p(x):=\|f_0\|\,\|x\|
$$

と置くと、$p$ は劣線形汎関数です。また $x\in M$ について

$$
f_0(x)
\le
|f_0(x)|
\le
\|f_0\|\,\|x\|
=
p(x).
$$

Hahn--Banach により $f_0$ を $f:X\to\mathbb R$ へ延長して

$$
f(x)\le\|f_0\|\,\|x\|
$$

とできます。

同じ不等式を $-x$ に適用すると

$$
-f(x)
=
f(-x)
\le
\|f_0\|\,\|x\|,
$$

従って

$$
|f(x)|
\le
\|f_0\|\,\|x\|.
$$

よって

$$
\|f\|
\le
\|f_0\|.
$$

一方 $f|_M=f_0$ なので

$$
\|f\|
=
\sup_{x\ne0}\frac{|f(x)|}{\|x\|}
\ge
\sup_{0\ne x\in M}\frac{|f_0(x)|}{\|x\|}
=
\|f_0\|.
$$

従って

$$
\boxed{
\|f\|=\|f_0\|
}.
$$

### 6.1 複素ノルム空間でもノルムを保って延長できる

ここまでの Hahn--Banach 本体は実線形版でした。FA3 以降では複素ノルム空間も扱うため、複素版を実線形版から導きます。

$X$ を複素ノルム空間、$M\subset X$ を複素線形部分空間、$f_0:M\to\mathbb C$ を連続複素線形汎関数とします。

$$
u_0(x):=\operatorname{Re}f_0(x)
$$

と置き、$X,M$ を実ベクトル空間とみなします。$u_0$ は実線形で、

$$
|u_0(x)|
\le
|f_0(x)|
\le
\|f_0\|\,\|x\|
$$

だから

$$
\|u_0\|
\le
\|f_0\|.
$$

逆向きを示します。$x\in M$ とし、$f_0(x)\ne0$ なら、絶対値 1 の複素数 $\lambda$ を

$$
\lambda f_0(x)=|f_0(x)|
$$

となるように取れます。$M$ は複素線形部分空間なので $\lambda x\in M$ で、

$$
u_0(\lambda x)
=
\operatorname{Re}(\lambda f_0(x))
=
|f_0(x)|.
$$

また $\|\lambda x\|=\|x\|$ です。従って supremum を取ると

$$
\|u_0\|
\ge
\|f_0\|.
$$

よって

$$
\|u_0\|=\|f_0\|.
$$

実線形版のノルム保存拡張を $u_0$ に適用し、実線形汎関数 $u:X\to\mathbb R$ で

$$
u|_M=u_0,
\qquad
\|u\|=\|f_0\|
$$

となるものを取ります。

そこで

$$
f(x)
:=
u(x)-i\,u(ix)
$$

と定めます。実線形性から

$$
\begin{aligned}
f(ix)
&=
u(ix)-i\,u(-x)\\
&=
u(ix)+i\,u(x)\\
&=
i\bigl(u(x)-i\,u(ix)\bigr)\\
&=
if(x),
\end{aligned}
$$

なので $f$ は複素線形です。

$x\in M$ では

$$
u(ix)
=
\operatorname{Re}f_0(ix)
=
-\operatorname{Im}f_0(x),
$$

従って

$$
f(x)
=
\operatorname{Re}f_0(x)
+i\operatorname{Im}f_0(x)
=
f_0(x).
$$

よって $f$ は $f_0$ の複素線形延長です。

最後にノルムを確認します。任意の $x\in X$ について

$$
|f(x)|
=
\sup_{|\lambda|=1}
\operatorname{Re}\bigl(\lambda f(x)\bigr).
$$

$f$ の複素線形性と $u=\operatorname{Re}f$ から

$$
\operatorname{Re}(\lambda f(x))
=
u(\lambda x)
\le
\|u\|\,\|x\|.
$$

従って

$$
\|f\|
\le
\|u\|.
$$

一方 $u=\operatorname{Re}f$ なので $|u(x)|\le|f(x)|$ から

$$
\|u\|\le\|f\|.
$$

したがって

$$
\boxed{
\|f\|
=
\|u\|
=
\|f_0\|
}.
$$

これで実数体・複素数体のどちらでもノルム保存拡張を使えます。

---

## 7. 双対空間は点を分離する

$0\ne x_0\in X$ とします。

$$
M=\operatorname{span}\{x_0\}
$$

上で

$$
f_0(tx_0)=t\|x_0\|
$$

と定めると

$$
|f_0(tx_0)|
=
|t|\|x_0\|
=
\|tx_0\|,
$$

なので

$$
\|f_0\|=1.
$$

[ノルム保存拡張](#ref-hahn-banach-norm-preserving-extension)により、ある $f\in X^*$ が

$$
\|f\|=1,
\qquad
f(x_0)=\|x_0\|
$$

を満たします。

従って $x\ne y$ なら $x-y\ne0$ にこの結果を適用して、ある $f\in X^*$ が

$$
f(x)-f(y)
=
f(x-y)
\ne0
$$

を満たします。

$$
\boxed{
X^*\text{ は }X\text{ の異なる点を分離する}
}
$$

ことが分かります。

---

## 演習

### F0-02C6-A01 ノルムは劣線形汎関数

- Level: A

ノルム空間 $X$ で $p(x)=\|x\|$ と置く。$p$ が劣線形汎関数の二条件を満たすことを示せ。

<!-- solution-start -->
#### 詳細解答

三角不等式から

$$
p(x+y)
=
\|x+y\|
\le
\|x\|+\|y\|
=
p(x)+p(y).
$$

また $a\ge0$ に対して

$$
p(ax)
=
\|ax\|
=
a\|x\|
=
ap(x).
$$

従って $p$ は劣線形汎関数です。
<!-- solution-end -->

### F0-02C6-A02 一次元からのノルム保存拡張

- Level: A

$M=\operatorname{span}(e_1)\subset\mathbb R^2$、$f_0(te_1)=t$ とする。Euclid ノルムに関してノルム 1 の延長を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$$
f(x_1,x_2):=x_1
$$

と置きます。$x=te_1=(t,0)$ なら

$$
f(te_1)=t=f_0(te_1),
$$

なので $f$ は $f_0$ の延長です。

また直接

$$
|f(x_1,x_2)|
=
|x_1|
\le
\sqrt{x_1^2+x_2^2}
=
\|x\|_2,
$$

よって $\|f\|\le1$ です。一方 $f(e_1)=1$、$\|e_1\|_2=1$ なので $\|f\|\ge1$。従って

$$
\boxed{\|f\|=1}.
$$
<!-- solution-end -->

### F0-02C6-A03 一次元延長の許容区間

- Level: A

Hahn--Banach の一次元延長で、$z\notin M$ とし

$$
f_1(x+tz)=f_0(x)+tc
$$

と置く。$t>0$ から

$$
c\le
\inf_{y\in M}\{p(y+z)-f_0(y)\}
$$

が必要になることを途中式から導け。

<!-- solution-start -->
#### 詳細解答

$t>0$ では支配条件

$$
f_0(x)+tc\le p(x+tz)
$$

を $t$ で割れます。線形性と正の斉次性から

$$
f_0\left(\frac xt\right)+c
\le
p\left(\frac xt+z\right).
$$

$$
y:=\frac xt\in M
$$

と置けば

$$
c
\le
p(y+z)-f_0(y)
$$

がすべての $y\in M$ で必要です。従って右辺全体の infimum 以下でなければならず、

$$
\boxed{
c\le
\inf_{y\in M}\{p(y+z)-f_0(y)\}
}.
$$
<!-- solution-end -->

### F0-02C6-A04 ノルム保存の逆向き評価

- Level: A

$f\in X^*$ が $f_0\in M^*$ の延長であるとき、必ず

$$
\|f\|\ge\|f_0\|
$$

となることを示せ。

<!-- solution-start -->
#### 詳細解答

$f|_M=f_0$ なので

$$
\begin{aligned}
\|f\|
&=
\sup_{x\ne0}
\frac{|f(x)|}{\|x\|}\\
&\ge
\sup_{0\ne x\in M}
\frac{|f(x)|}{\|x\|}\\
&=
\sup_{0\ne x\in M}
\frac{|f_0(x)|}{\|x\|}\\
&=
\|f_0\|.
\end{aligned}
$$

全空間で取る supremum は部分空間上だけで取る supremum より小さくならないことを使いました。
<!-- solution-end -->

### F0-02C6-B01 双対空間で非零点を検出する

- Level: B

ノルム空間 $X$ の $x_0\ne0$ に対し、

$$
\|f\|=1,
\qquad
f(x_0)=\|x_0\|
$$

を満たす $f\in X^*$ が存在することを導け。

<!-- solution-start -->
#### 詳細解答

$$
M=\operatorname{span}\{x_0\}
$$

上で

$$
f_0(tx_0)=t\|x_0\|
$$

と定めます。

$$
|f_0(tx_0)|
=
|t|\|x_0\|
=
\|tx_0\|
$$

なので $\|f_0\|=1$ です。

Hahn--Banach のノルム保存拡張により、$f_0$ をある $f\in X^*$ へ

$$
\|f\|=\|f_0\|=1
$$

を保って延長できます。延長なので

$$
f(x_0)=f_0(x_0)=\|x_0\|.
$$
<!-- solution-end -->

### F0-02C6-B02 ノルムを双対空間から再構成する

- Level: B

任意の $x\in X$ について

$$
\boxed{
\|x\|
=
\sup_{\|f\|\le1}|f(x)|
}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

まず $\|f\|\le1$ なら

$$
|f(x)|
\le
\|f\|\,\|x\|
\le
\|x\|.
$$

従って

$$
\sup_{\|f\|\le1}|f(x)|
\le
\|x\|.
$$

$x=0$ では両辺 0 です。

$x\ne0$ なら B01 から、$\|f\|=1$ かつ

$$
f(x)=\|x\|
$$

となる $f\in X^*$ が存在します。従って supremum は少なくとも $\|x\|$ です。

両向きの不等式から

$$
\boxed{
\sup_{\|f\|\le1}|f(x)|
=
\|x\|
}.
$$
<!-- solution-end -->

### F0-02C6-B03 chain の合併で汎関数が一意に定まることを確認する

- Level: B

証明中の chain $\mathscr C$ に対して

$$
N_{\mathscr C}
=
\bigcup_{(N,g)\in\mathscr C}N
$$

と置く。$x\in N_{\mathscr C}$ に対し

$$
g_{\mathscr C}(x)=g(x)
$$

と定めるとき、選んだ $(N,g)\in\mathscr C$ に値が依存しないことを示せ。さらに $g_{\mathscr C}$ が線形であることも示せ。

<!-- solution-start -->
#### 詳細解答

$x\in N_1\cap N_2$ で $(N_1,g_1),(N_2,g_2)\in\mathscr C$ とします。chain なので二つは比較可能で、例えば

$$
(N_1,g_1)\preceq(N_2,g_2)
$$

とできます。延長関係の定義から

$$
g_2|_{N_1}=g_1,
$$

従って

$$
g_2(x)=g_1(x).
$$

よって値は選んだ候補によらず定まります。

次に $x,y\in N_{\mathscr C}$ とします。$x$ を含む候補と $y$ を含む候補は chain 性で比較可能なので、両方を含む方を $(N,g)$ と取れます。この $N$ 上で

$$
g(ax+by)=ag(x)+bg(y)
$$

です。定義した値と一致するので

$$
\boxed{
g_{\mathscr C}(ax+by)
=
a g_{\mathscr C}(x)+b g_{\mathscr C}(y)
}.
$$
<!-- solution-end -->

### F0-02C6-C01 部分空間と外点を汎関数で分ける

- Level: C

$M\subset X$ を線形部分空間、$x_0\in X$ とし

$$
d:=\inf_{m\in M}\|x_0-m\|>0
$$

とする。

$$
f|_M=0,
\qquad
\|f\|=1,
\qquad
f(x_0)=d
$$

を満たす $f\in X^*$ が存在することを示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
N:=M+\operatorname{span}\{x_0\}
$$

上で

$$
g(m+tx_0):=td
$$

と定めます。

$d>0$ なので $x_0\notin M$ です。従って $m+tx_0$ という表示は一意で、$g$ は線形です。

$u=m+tx_0\in N$ とします。$t=0$ なら $g(u)=0$ です。

$t\ne0$ なら

$$
\begin{aligned}
\|m+tx_0\|
&=
|t|
\left\|
x_0+\frac mt
\right\|.
\end{aligned}
$$

$-m/t\in M$ なので、距離 $d$ の定義から

$$
\left\|
x_0+\frac mt
\right\|
=
\left\|
x_0-\left(-\frac mt\right)
\right\|
\ge d.
$$

従って

$$
|g(u)|
=
|t|d
\le
\|u\|.
$$

よって $\|g\|\le1$ です。一方

$$
g(x_0)=d
$$

であり、$d\le\|x_0\|$ なのでこれだけではまだ $\|g\|=1$ は出ません。そこで $d$ の infimum の定義から、任意の $\varepsilon>0$ に対し $m_\varepsilon\in M$ を

$$
\|x_0-m_\varepsilon\|<d+\varepsilon
$$

となるように取ります。

$$
u_\varepsilon:=x_0-m_\varepsilon
$$

とすれば

$$
g(u_\varepsilon)=d,
$$

したがって

$$
\|g\|
\ge
\frac{d}{\|u_\varepsilon\|}
>
\frac{d}{d+\varepsilon}.
$$

$\varepsilon\downarrow0$ から $\|g\|\ge1$、従って

$$
\|g\|=1.
$$

Hahn--Banach のノルム保存拡張により $g$ を $f\in X^*$ へ $\|f\|=1$ のまま延長できます。

$m\in M$ なら

$$
f(m)=g(m)=0,
$$

また

$$
f(x_0)=g(x_0)=d.
$$

従って所望の $f$ が得られました。
<!-- solution-end -->

---

## 次に進む

標準関数解析の本線では [FA3 弱位相・弱*位相・標準埋め込み](../FA3/index.md) へ進みます。Hahn--Banach を凸集合分離へ使う流れを先に学ぶ場合は [F0-02C6A 分離定理・Minkowski・Farkas](../F0_02C6A_分離定理_Minkowski_Farkas/index.md) へ進めます。
