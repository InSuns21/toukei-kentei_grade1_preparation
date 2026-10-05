# EVOL1 非有界作用素・閉作用素・可閉作用素

<!-- definition-example-audit: strict -->

FA2 では Banach 空間の間の有界線形作用素を中心に、開写像定理・有界逆定理・閉グラフ定理を学びました。特に、Banach 空間 $X,Y$ の間の線形写像

$$
T:X\to Y
$$

が **$X$ 全体で定義され**、そのグラフが閉じていれば、[閉グラフ定理](../FA2/index.md#thm-fa2-closed-graph)から $T$ は自動的に有界でした。

ところが微分作用素や Laplacian を考えると、これは困ります。例えば「1回微分する」という操作は、同じ関数空間のすべての元に意味を持つとは限りません。さらに、微分できる関数だけに定義域を絞れば、その作用素は元のノルムに関して非有界になることがあります。

ここで発想を変えます。

$$
\boxed{
\text{作用素}
=
\text{式だけではなく、定義域まで含めたデータ}
}
$$

と考えます。

本章ではこの見方を、手で追える一つの具体例

$$
X=\ell^2(\mathbb N),
\qquad
A(x_1,x_2,\ldots)
=
(1x_1,2x_2,3x_3,\ldots)
$$

で最後まで通します。ここでは

$$
\mathbb N=\{1,2,3,\ldots\}
$$

とします。

この作用素は $\ell^2$ の全ての元には作用できません。そこで

$$
D(A)
=
\left\{
x=(x_n)\in\ell^2:
\sum_{n=1}^{\infty}n^2|x_n|^2<\infty
\right\}
$$

を定義域とします。

この一例から、

$$
\text{定義域}
\to
\text{閉作用素}
\to
\text{グラフノルム}
\to
\text{可閉性・閉包}
\to
\text{core}
\to
\text{レゾルベント}
$$

という、半群生成論へ進むための基礎を作ります。

---

## 1. 作用素では「どこで定義するか」も固定する

有限次元行列では、行列 $A$ を与えれば通常

$$
A:\mathbb K^n\to\mathbb K^m
$$

が自動的に全空間で定義されます。無限次元ではこの感覚をそのまま持ち込めません。

まず、作用素と定義域を一組で扱います。

<a id="def-evol1-partial-operator"></a>
<!-- formal-statement-start -->
### 定義（部分定義線形作用素と非有界性）

$X,Y$ を Banach 空間、$D(A)\subset X$ を線形部分空間とする。

線形写像

$$
A:D(A)\to Y
$$

を、$X$ から $Y$ への **部分定義線形作用素**という。$D(A)$ を $A$ の **定義域**という。

さらに、どの定数 $C\ge0$ に対しても

$$
\|Ax\|_Y
\le
C\|x\|_X
\qquad(x\in D(A))
$$

が成り立たないとき、$A$ を **非有界作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-partial-operator -->
### 定義の確認：対角作用素は本当に非有界か

$X=Y=\ell^2(\mathbb N)$ とし、

$$
D(A)
=
\left\{
x\in\ell^2:
(nx_n)_{n\ge1}\in\ell^2
\right\},
\qquad
Ax=(nx_n)_{n\ge1}
$$

と置きます。

まず $D(A)$ は線形部分空間です。$x,y\in D(A)$、$\alpha,\beta\in\mathbb K$ なら

$$
n(\alpha x_n+\beta y_n)
=
\alpha(nx_n)+\beta(ny_n)
$$

であり、$\ell^2$ は線形空間なので $(n(\alpha x_n+\beta y_n))\in\ell^2$ です。

次に $e_N=(0,\ldots,0,1,0,\ldots)$ を第 $N$ 成分だけが1の標準基底ベクトルとすると、

$$
e_N\in D(A),
\qquad
\|e_N\|_2=1,
\qquad
\|Ae_N\|_2=N.
$$

もしある $C$ が

$$
\|Ax\|_2\le C\|x\|_2
$$

を全ての $x\in D(A)$ で満たすなら $N\le C$ が全ての $N$ で必要になり、矛盾します。従って $A$ は非有界です。

また

$$
x_n=\frac1n
$$

とすると

$$
\sum_{n=1}^{\infty}|x_n|^2
=
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty
$$

なので $x\in\ell^2$ ですが、

$$
Ax=(1,1,1,\ldots)\notin\ell^2.
$$

したがって

$$
D(A)\ne\ell^2.
$$

「同じ式 $Ax=(nx_n)$」だけでは作用素は完成せず、どの $x$ まで許すかを指定する必要があります。
<!-- definition-example-end -->

### 制限と拡張

二つの作用素

$$
A:D(A)\to Y,
\qquad
B:D(B)\to Y
$$

について

$$
D(A)\subset D(B),
\qquad
Bx=Ax\quad(x\in D(A))
$$

なら、$B$ を $A$ の **拡張**、$A$ を $B$ の **制限**と呼びます。

同じ微分式や同じ座標公式を持っていても、定義域が違えば別の作用素です。後で「閉包」を考えるとき、この区別が決定的になります。

---

## 2. なぜ非有界作用素には真に小さい定義域が必要なのか

FA2 の閉グラフ定理を思い出します。$X,Y$ が Banach 空間で、線形作用素

$$
T:X\to Y
$$

が $X$ 全体で定義され、グラフが閉じているなら $T$ は有界です。

従って、**閉じた非有界作用素**を扱いたければ

$$
D(A)\subsetneq X
$$

を許さなければなりません。

これは技術的な例外処理ではありません。微分作用素では、境界条件や正則性条件そのものが $D(A)$ に入ります。

後続の半群論では、生成作用素 $A$ の式だけでなく

$$
D(A)
$$

を知ることが時間発展を決める重要な情報になります。

---

## 3. 極限を取っても作用素の対応が壊れない：閉作用素

FA2 では全定義作用素 $T:X\to Y$ のグラフを

$$
G(T)=\{(x,Tx):x\in X\}
$$

としました。

部分定義作用素でも同じ考えを使い、定義域だけを $D(A)$ に置き換えます。

<a id="def-evol1-closed-operator"></a>
<!-- formal-statement-start -->
### 定義（閉作用素）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を線形作用素とする。

$$
G(A)
=
\{(x,Ax):x\in D(A)\}
\subset X\times Y
$$

と置く。

$G(A)$ が $X\times Y$ で閉集合であるとき、$A$ を **閉作用素**という。

同値に、任意の列 $(x_k)\subset D(A)$ について

$$
x_k\to x\quad\text{in }X,
\qquad
Ax_k\to y\quad\text{in }Y
$$

なら

$$
x\in D(A),
\qquad
Ax=y
$$

が成り立つとき、$A$ は閉作用素である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-closed-operator -->
### 定義の確認：閉部分空間上の零作用素

$M\subset X$ を閉線形部分空間とし、

$$
A:M\to X,
\qquad
Ax=0
$$

とします。

このとき

$$
G(A)=M\times\{0\}.
$$

$M$ と $\{0\}$ は閉集合なので $G(A)$ は $X\times X$ で閉じています。従って $A$ は閉作用素です。

もし $M\ne X$ なら、この例は「閉作用素でも全空間で定義される必要はない」ことを示します。
<!-- definition-example-end -->

### 主役の対角作用素が閉じていることを直接確認する

第1節の

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

を考えます。

$(x^{(k)})\subset D(A)$ が

$$
x^{(k)}\to x
\quad\text{in }\ell^2,
$$

$$
Ax^{(k)}\to y
\quad\text{in }\ell^2
$$

を満たすとします。

$\ell^2$ ノルム収束から、各固定した $n$ について

$$
|x_n^{(k)}-x_n|
\le
\|x^{(k)}-x\|_2
\to0.
$$

従って

$$
x_n^{(k)}\to x_n.
$$

同様に

$$
|(Ax^{(k)})_n-y_n|
\le
\|Ax^{(k)}-y\|_2
\to0.
$$

一方

$$
(Ax^{(k)})_n=nx_n^{(k)}
$$

なので、$k\to\infty$ として

$$
y_n=nx_n
\qquad(n\ge1).
$$

ここで $y\in\ell^2$ だから

$$
(nx_n)_{n\ge1}=y\in\ell^2.
$$

従って $x\in D(A)$ であり、

$$
Ax=y.
$$

よって $A$ は閉作用素です。

この証明で重要なのは、「$x^{(k)}\to x$ だけ」ではなく

$$
x^{(k)}\to x
\quad\text{と}\quad
Ax^{(k)}\to y
$$

を同時に追っていることです。

---

## 4. グラフノルムは定義域を Banach 空間にする

FA2 で導入した[グラフノルム](../FA2/index.md#def-fa2-graph-norm)は

$$
\|x\|_A
=
\|x\|_X+\|Ax\|_Y
$$

という形でした。

部分定義作用素では、これを $D(A)$ 上のノルムとして使います。入力と出力を同時に測るので、非有界作用素でも $A$ 自身はグラフノルムに関して

$$
\|Ax\|_Y\le\|x\|_A
$$

を満たします。

閉作用素の意味は、この新しいノルムで定義域が完備になることと一致します。

<a id="thm-evol1-graph-norm-complete"></a>
<!-- formal-statement-start -->
### 定理（閉作用素とグラフノルム完備性）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を線形作用素とする。

$D(A)$ 上に

$$
\|x\|_A
=
\|x\|_X+\|Ax\|_Y
$$

を入れる。

このとき次は同値である。

1. $A$ は閉作用素である。
2. $(D(A),\|\cdot\|_A)$ は Banach 空間である。
<!-- formal-statement-end -->

### 証明の見取り図

写像

$$
J:D(A)\to X\times Y,
\qquad
Jx=(x,Ax)
$$

を考えます。

定義から

$$
\|Jx\|_{X\times Y}
=
\|x\|_X+\|Ax\|_Y
=
\|x\|_A.
$$

従って $J$ は $(D(A),\|\cdot\|_A)$ とグラフ $G(A)$ の等長同型です。

つまり問題は

$$
D(A)\text{ がグラフノルムで完備}
\iff
G(A)\text{ が積空間で閉}
$$

に変わります。

<!-- proof-start -->
### 証明

$X\times Y$ に

$$
\|(x,y)\|_{X\times Y}
=
\|x\|_X+\|y\|_Y
$$

を入れると、FA2 で確認した通り $X\times Y$ は Banach 空間です。

まず $A$ が閉作用素だとします。すると $G(A)$ は Banach 空間 $X\times Y$ の閉部分空間なので Banach です。

上の $J$ は

$$
(D(A),\|\cdot\|_A)
\longrightarrow
G(A)
$$

の等長全単射です。従って $(D(A),\|\cdot\|_A)$ も Banach です。

逆に $(D(A),\|\cdot\|_A)$ が Banach だとします。

列 $(x_k,Ax_k)\in G(A)$ が

$$
(x_k,Ax_k)\to(x,y)
\quad\text{in }X\times Y
$$

とします。

すると

$$
\|x_k-x_m\|_A
=
\|x_k-x_m\|_X
+
\|Ax_k-Ax_m\|_Y
\to0.
$$

従って $(x_k)$ はグラフノルムで Cauchy です。完備性から、ある $z\in D(A)$ が存在して

$$
\|x_k-z\|_A\to0.
$$

グラフノルムの定義より

$$
x_k\to z\quad\text{in }X,
\qquad
Ax_k\to Az\quad\text{in }Y.
$$

一方、積空間での収束から

$$
x_k\to x,
\qquad
Ax_k\to y.
$$

極限の一意性により

$$
z=x,
\qquad
Az=y.
$$

したがって $(x,y)\in G(A)$ です。よって $G(A)$ は閉じており、$A$ は閉作用素です。$\square$
<!-- proof-end -->

### 対角作用素のグラフノルム

主役の $A$ では

$$
\|x\|_A
=
\left(\sum_{n=1}^{\infty}|x_n|^2\right)^{1/2}
+
\left(\sum_{n=1}^{\infty}n^2|x_n|^2\right)^{1/2}.
$$

第3節で $A$ が閉じていることを直接証明したので、この定理から $D(A)$ はこのノルムで Banach 空間です。

元の $\ell^2$ ノルムだけでは $Ae_N$ が $N$ 倍まで増えますが、グラフノルムではその増大分も最初からノルムの一部として測っています。

---

## 5. 稠密に定義されているとは何か

半群の生成作用素や随伴作用素へ進むと、定義域が単に「存在する」だけでなく、元の空間を十分よく近似できることが重要になります。

<a id="def-evol1-densely-defined"></a>
<!-- formal-statement-start -->
### 定義（稠密定義作用素）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を線形作用素とする。

$$
\overline{D(A)}^{\,X}=X
$$

が成り立つとき、$A$ は **稠密に定義されている**、または **稠密定義作用素**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-densely-defined -->
### 定義の確認：$c_{00}$ が入っていればよい

$c_{00}$ を有限個の成分しか非零でない数列全体とします。

任意の $x=(x_n)\in\ell^2$ に対して

$$
P_Nx=(x_1,\ldots,x_N,0,0,\ldots)
$$

と置けば $P_Nx\in c_{00}$ で、

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0.
$$

従って

$$
\overline{c_{00}}^{\,\ell^2}
=
\ell^2.
$$

主役の対角作用素 $A$ では

$$
c_{00}\subset D(A),
$$

したがって

$$
\overline{D(A)}^{\,\ell^2}
=
\ell^2.
$$

よって $A$ は稠密定義作用素です。
<!-- definition-example-end -->

ここでは二種類の「密度」を区別しておきます。

- $D(A)$ が $X$ に稠密：元のノルム $\|\cdot\|_X$ で近似する。
- 後で出る core：$D(A)$ の中を **グラフノルム**で近似する。

core の方が強い条件です。

---

## 6. 最初は小さい定義域で作り、あとから閉じる：可閉作用素

実際の微分作用素では、まず滑らかな関数だけで作用素を定義し、その後で極限を取って定義域を広げることがよくあります。

しかし、極限の取り方によって出力が変わってしまうなら、拡張した作用素を一意に定められません。

グラフを閉包しても「一つの入力に二つの出力」が生じないことが必要です。

<a id="def-evol1-closable"></a>
<!-- formal-statement-start -->
### 定義（可閉作用素と作用素の閉包）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を線形作用素とする。

$X\times Y$ におけるグラフの閉包

$$
\overline{G(A)}
$$

が、ある線形作用素のグラフになっているとき、$A$ を **可閉作用素**という。

このとき

$$
G(\overline A)
=
\overline{G(A)}
$$

で定まる作用素 $\overline A$ を $A$ の **閉包**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-closable -->
### 定義の確認：$c_{00}$ 上の恒等写像

$$
A:c_{00}\subset\ell^2\to\ell^2,
\qquad
Ax=x
$$

とします。

もし

$$
(x^{(k)},Ax^{(k)})
=
(x^{(k)},x^{(k)})
\to(x,y)
$$

なら、第一成分から $x^{(k)}\to x$、第二成分から $x^{(k)}\to y$ です。従って $x=y$。

逆に任意の $x\in\ell^2$ は切断列 $P_Nx\in c_{00}$ で近似できるので

$$
(P_Nx,AP_Nx)
=
(P_Nx,P_Nx)
\to(x,x).
$$

したがって

$$
\overline{G(A)}
=
\{(x,x):x\in\ell^2\},
$$

これは $\ell^2$ 上の恒等作用素のグラフです。

よって $A$ は可閉で、

$$
\overline A=I_{\ell^2}.
$$
<!-- definition-example-end -->

可閉性は、0へ近づく入力だけを見れば判定できます。

<a id="thm-evol1-closability-criterion"></a>
<!-- formal-statement-start -->
### 定理（可閉性の列判定）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を線形作用素とする。

このとき次は同値である。

1. $A$ は可閉作用素である。
2. 任意の列 $(x_k)\subset D(A)$ について
   $$
   x_k\to0\quad\text{in }X,
   \qquad
   Ax_k\to y\quad\text{in }Y
   $$
   なら $y=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

閉包 $\overline{G(A)}$ が作用素のグラフになるために必要なのは、同じ入力 $x$ に異なる二つの出力 $y_1,y_2$ が対応しないことです。

二つの近似列の差を取ると入力側は 0 に収束します。従って「0へ行く入力が非零の出力極限を作れない」ことが、グラフが一価である条件になります。

<!-- proof-start -->
### 証明

まず $A$ が可閉だとします。

$$
x_k\to0,
\qquad
Ax_k\to y
$$

なら

$$
(x_k,Ax_k)\to(0,y).
$$

従って

$$
(0,y)\in\overline{G(A)}
=
G(\overline A).
$$

作用素は線形なので

$$
\overline A\,0=0.
$$

一つの入力 0 に対応する出力は一つだけだから $y=0$ です。

逆に条件2を仮定します。

$\overline{G(A)}$ は線形部分空間 $G(A)$ の閉包なので、やはり線形部分空間です。これが作用素のグラフになるには、一つの第一成分 $x$ に対する第二成分が一意であれば十分です。

$$
(x,y_1),(x,y_2)\in\overline{G(A)}
$$

とします。

ある列 $(u_k),(v_k)\subset D(A)$ を取って

$$
u_k\to x,
\qquad
Au_k\to y_1,
$$

$$
v_k\to x,
\qquad
Av_k\to y_2
$$

とできます。

差を取ると

$$
u_k-v_k\to0,
$$

$$
A(u_k-v_k)
=
Au_k-Av_k
\to
y_1-y_2.
$$

条件2より

$$
y_1-y_2=0.
$$

従って $y_1=y_2$ です。

よって $\overline{G(A)}$ は一つの線形作用素のグラフになり、$A$ は可閉です。$\square$
<!-- proof-end -->

### 反例：稠密に定義されていても可閉とは限らない

$$
T:c_{00}\subset\ell^2\to\mathbb K
$$

を

$$
Tx
=
\sum_{n=1}^{\infty}n x_n
$$

で定めます。$x\in c_{00}$ なら和は有限和なので意味を持ちます。

$c_{00}$ は $\ell^2$ に稠密なので $T$ は稠密定義です。

ところが

$$
x^{(k)}
=
\frac1k e_k
$$

と置くと

$$
\|x^{(k)}\|_2
=
\frac1k
\to0,
$$

一方

$$
Tx^{(k)}
=
k\cdot\frac1k
=
1.
$$

従って

$$
x^{(k)}\to0,
\qquad
Tx^{(k)}\to1\ne0.
$$

可閉性の列判定に反するので $T$ は可閉ではありません。

失敗した機構は明確です。入力が 0 に潰れていくのに、出力側では 1 が残っています。したがってグラフを閉じると

$$
(0,0)
\quad\text{と}\quad
(0,1)
$$

が同時に入り、一つの入力 0 に二つの出力が対応してしまいます。

---

## 7. 閉包と core：小さい定義域から本来の閉作用素を回収する

主役の対角作用素を、最初は $c_{00}$ だけに制限します。

$$
A_0:c_{00}\subset\ell^2\to\ell^2,
\qquad
A_0x=(nx_n).
$$

一方、第1節から使ってきた最大定義域の作用素を

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

とします。

$A$ は第3節で閉じていることを証明しました。

「小さい定義域 $c_{00}$ だけを知れば $A$ 全体を回収できるか」を表すのが core です。

<a id="def-evol1-core"></a>
<!-- formal-statement-start -->
### 定義（作用素の core）

$X,Y$ を Banach 空間、$A:D(A)\subset X\to Y$ を閉作用素とする。

線形部分空間 $D_0\subset D(A)$ が

$$
\overline{D_0}^{\,\|\cdot\|_A}
=
D(A)
$$

を満たすとき、$D_0$ を $A$ の **core** という。

同値に、制限作用素

$$
A|_{D_0}:D_0\to Y
$$

の閉包が $A$ に一致するとき、$D_0$ は $A$ の core である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-core -->
### 定義の確認：恒等作用素では $c_{00}$ が core

$A=I_{\ell^2}$ とします。このとき

$$
D(A)=\ell^2,
\qquad
\|x\|_A
=
\|x\|_2+\|x\|_2
=
2\|x\|_2.
$$

$c_{00}$ は $\ell^2$ ノルムで稠密なので、同値なグラフノルムでも稠密です。

従って $c_{00}$ は $I_{\ell^2}$ の core です。
<!-- definition-example-end -->

主役の非有界対角作用素でも同じ切断が働きます。ただし今回は、元の $\ell^2$ ノルムだけでなく $Ax$ の尾部も同時に小さくしなければなりません。

<a id="prop-evol1-diagonal-closure-core"></a>
<!-- formal-statement-start -->
### 命題（最小対角作用素の閉包と core）

$\ell^2(\mathbb N)$ 上で

$$
A_0:c_{00}\to\ell^2,
\qquad
A_0x=(nx_n),
$$

および

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

を考える。

このとき $A_0$ は可閉で、

$$
\overline{A_0}=A.
$$

特に $c_{00}$ は $A$ の core である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A$ は第3節で閉作用素であることを確認済みです。また

$$
c_{00}\subset D(A),
\qquad
A_0=A|_{c_{00}}.
$$

従って

$$
G(A_0)\subset G(A).
$$

$G(A)$ は閉じているので

$$
\overline{G(A_0)}
\subset
G(A).
$$

逆包含を示します。

任意の $x=(x_n)\in D(A)$ に対して

$$
P_Nx=(x_1,\ldots,x_N,0,0,\ldots)
$$

と置きます。$P_Nx\in c_{00}$ です。

まず

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0.
$$

さらに $x\in D(A)$ だから $(nx_n)\in\ell^2$ で、

$$
\|Ax-A_0P_Nx\|_2^2
=
\sum_{n>N}n^2|x_n|^2
\to0.
$$

従って

$$
(P_Nx,A_0P_Nx)
\to
(x,Ax)
\quad\text{in }\ell^2\times\ell^2.
$$

よって

$$
G(A)\subset\overline{G(A_0)}.
$$

二つの包含から

$$
\overline{G(A_0)}=G(A).
$$

したがって $A_0$ は可閉で

$$
\overline{A_0}=A.
$$

また上の二つの尾部評価を足せば

$$
\|x-P_Nx\|_A
=
\|x-P_Nx\|_2
+
\|Ax-A_0P_Nx\|_2
\to0.
$$

従って $c_{00}$ は $D(A)$ にグラフノルムで稠密、すなわち $A$ の core です。$\square$
<!-- proof-end -->

この例は core の意味をよく表しています。

$$
\boxed{
\text{core 上で作用素を理解する}
+
\text{グラフノルムで完備化する}
\Rightarrow
\text{閉作用素全体を回収する}
}
$$

という流れです。

---

## 8. 非有界作用素のレゾルベント

FA5 では有界作用素 $T\in\mathcal B(X)$ について

$$
\lambda I-T
$$

の有界可逆性が壊れる場所をスペクトルと呼びました。

閉作用素でも同じ問いを立てられます。ただし

$$
\lambda I-A
$$

の定義域は $X$ 全体ではなく $D(A)$ です。

<a id="def-evol1-closed-resolvent"></a>
<!-- formal-statement-start -->
### 定義（閉作用素のレゾルベント集合）

$X$ を複素 Banach 空間、$A:D(A)\subset X\to X$ を閉作用素とする。

複素数 $\lambda$ について

$$
\lambda I-A:D(A)\to X
$$

が全単射で、その逆写像

$$
R(\lambda,A)
=
(\lambda I-A)^{-1}:X\to X
$$

が有界であるとき、$\lambda$ は $A$ の **レゾルベント集合** $\rho(A)$ に属するという。

補集合

$$
\sigma(A)
=
\mathbb C\setminus\rho(A)
$$

を $A$ の **スペクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol1-closed-resolvent -->
### 定義の確認：対角作用素では座標ごとに逆を解く

主役の

$$
Ax=(nx_n)
$$

について

$$
(\lambda I-A)x=y
$$

は各成分で

$$
(\lambda-n)x_n=y_n
$$

です。

もし $\lambda\notin\mathbb N$ なら形式的には

$$
x_n=\frac{y_n}{\lambda-n}
$$

と解けます。

この式が本当に $x\in D(A)$ を与え、逆作用素が有界になることを第10節で確認します。
<!-- definition-example-end -->

閉作用素では、定義中の「逆が有界」という条件は全単射性から自動的に従います。その理由はグラフノルムです。

<a id="prop-evol1-closed-bijective-inverse"></a>
<!-- formal-statement-start -->
### 命題（閉作用素の全単射レゾルベントは自動的に有界）

$X$ を Banach 空間、$A:D(A)\subset X\to X$ を閉作用素、$\lambda\in\mathbb K$ とする。

$$
\lambda I-A:D(A)\to X
$$

が全単射なら

$$
(\lambda I-A)^{-1}:X\to X
$$

は有界である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A$ は閉作用素なので、[閉作用素とグラフノルム完備性](#thm-evol1-graph-norm-complete)から

$$
(D(A),\|\cdot\|_A)
$$

は Banach 空間です。

写像

$$
B:=\lambda I-A
:
(D(A),\|\cdot\|_A)
\to X
$$

を考えます。

$x\in D(A)$ に対して

$$
\begin{aligned}
\|Bx\|_X
&=
\|\lambda x-Ax\|_X\\
&\le
|\lambda|\|x\|_X+\|Ax\|_X\\
&\le
\max\{|\lambda|,1\}
\bigl(\|x\|_X+\|Ax\|_X\bigr)\\
&=
\max\{|\lambda|,1\}\|x\|_A.
\end{aligned}
$$

従って $B$ は Banach 空間間の有界線形作用素です。

仮定により $B$ は全単射なので、FA2 の[有界逆定理](../FA2/index.md#thm-fa2-bounded-inverse)を適用できます。

したがって

$$
B^{-1}:X\to(D(A),\|\cdot\|_A)
$$

は有界です。

ある $C>0$ が存在して

$$
\|B^{-1}y\|_A
\le
C\|y\|_X.
$$

グラフノルムは元のノルムを支配するので

$$
\|B^{-1}y\|_X
\le
\|B^{-1}y\|_A
\le
C\|y\|_X.
$$

従って

$$
(\lambda I-A)^{-1}=B^{-1}:X\to X
$$

は有界です。$\square$
<!-- proof-end -->

ここでも「閉作用素」という仮定は飾りではありません。$D(A)$ をグラフノルムで Banach 空間にするために使いました。

---

## 9. 対角作用素のスペクトルは非有界になる

有界作用素のスペクトルは FA5 で

$$
\sigma(T)\subset\{|\lambda|\le\|T\|\}
$$

という有界集合でした。

非有界作用素では、この結論は期待できません。主役の対角作用素ではスペクトル自体が無限遠へ伸びます。

<a id="prop-evol1-diagonal-spectrum"></a>
<!-- formal-statement-start -->
### 命題（対角作用素のレゾルベントとスペクトル）

複素 Hilbert 空間 $\ell^2(\mathbb N)$ 上で

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

とする。

このとき

$$
\rho(A)
=
\mathbb C\setminus\mathbb N,
$$

$$
\boxed{
\sigma(A)=\mathbb N
}
$$

である。

$\lambda\notin\mathbb N$ では

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda-n}
\right)_{n\ge1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $m\in\mathbb N$ とします。

標準基底 $e_m\in D(A)$ に対して

$$
Ae_m=me_m.
$$

従って

$$
(mI-A)e_m=0.
$$

$e_m\ne0$ なので $mI-A$ は単射ではありません。よって

$$
m\in\sigma(A).
$$

従って

$$
\mathbb N\subset\sigma(A).
$$

逆に $\lambda\notin\mathbb N$ とします。

まず

$$
\inf_{n\ge1}|\lambda-n|>0
$$

を確認します。

十分大きい $n$ では

$$
|\lambda-n|
\ge
n-|\lambda|
\to\infty.
$$

従って小さくなり得るのは有限個の $n$ だけです。その有限集合では $\lambda\ne n$ なので最小値は正です。

したがって

$$
C_0
:=
\sup_{n\ge1}
\frac1{|\lambda-n|}
<\infty.
$$

さらに

$$
C_1
:=
\sup_{n\ge1}
\frac{n}{|\lambda-n|}
<\infty.
$$

実際、$n>2|\lambda|$ なら

$$
|\lambda-n|
\ge
n-|\lambda|
>
\frac n2,
$$

だから

$$
\frac{n}{|\lambda-n|}<2.
$$

残る有限個の $n$ についても最大値は有限です。

任意の $y=(y_n)\in\ell^2$ に対し

$$
x_n
=
\frac{y_n}{\lambda-n}
$$

と置きます。

すると

$$
\|x\|_2^2
=
\sum_{n=1}^{\infty}
\frac{|y_n|^2}{|\lambda-n|^2}
\le
C_0^2\|y\|_2^2,
$$

従って $x\in\ell^2$ です。

さらに

$$
\sum_{n=1}^{\infty}
n^2|x_n|^2
=
\sum_{n=1}^{\infty}
\frac{n^2}{|\lambda-n|^2}|y_n|^2
\le
C_1^2\|y\|_2^2.
$$

よって

$$
x\in D(A).
$$

座標ごとに

$$
((\lambda I-A)x)_n
=
(\lambda-n)x_n
=
y_n,
$$

だから

$$
(\lambda I-A)x=y.
$$

よって $\lambda I-A$ は全射です。

また $(\lambda I-A)x=0$ なら

$$
(\lambda-n)x_n=0
$$

が全ての $n$ で成り立ちます。$\lambda\notin\mathbb N$ なので全ての $\lambda-n$ は非零、従って $x_n=0$ です。よって単射です。

さらに

$$
\|R(\lambda,A)y\|_2
=
\|x\|_2
\le
C_0\|y\|_2,
$$

なので逆作用素は有界です。

従って

$$
\lambda\in\rho(A).
$$

以上から

$$
\rho(A)=\mathbb C\setminus\mathbb N,
\qquad
\sigma(A)=\mathbb N.
$$

また得られた式から

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda-n}
\right)_{n\ge1}.
$$

$\square$
<!-- proof-end -->

有界作用素のスペクトルがコンパクトだったのに対し、ここでは

$$
1,2,3,\ldots
$$

と無限遠へ伸びています。

これが非有界作用素のスペクトル論で最初に見える大きな違いです。

---

## 10. ここまでの構造を一本につなぐ

主役の対角作用素では、全ての概念が一つにつながりました。

$$
\begin{array}{c}
A(x_n)=(nx_n)\\
\downarrow\\
D(A)=\{x:(nx_n)\in\ell^2\}\\
\downarrow\\
A\text{ は非有界だが閉}\\
\downarrow\\
(D(A),\|\cdot\|_A)\text{ は Banach}\\
\downarrow\\
c_{00}\subset D(A)\text{ は core}\\
\downarrow\\
A_0=A|_{c_{00}}\text{ の閉包は }A\\
\downarrow\\
\sigma(A)=\mathbb N
\end{array}
$$

特に重要なのは、

$$
\boxed{
\text{非有界}
\ne
\text{極限操作が壊れる}
}
$$

という点です。

非有界作用素でも、定義域を適切に選んで **閉作用素**にすれば、入力と出力を同時に収束させる極限操作は安定します。

そしてグラフノルムを使えば、その安定性を Banach 空間の完備性として扱えます。

---

## 11. 次の EVOL2 で何をするか

GPDE10 では、時間発展作用素族 $(S(t))_{t\ge0}$ が

$$
S(t+s)=S(t)S(s),
\qquad
S(t)x\to x\quad(t\downarrow0)
$$

を満たす **強連続半群**を導入しました。

しかしそこでは、

> どの作用素 $A$ が強連続半群を生成するのか。

という逆向きの問題までは扱いませんでした。

EVOL2 では

$$
Ax
=
\lim_{t\downarrow0}
\frac{S(t)x-x}{t}
$$

で定まる生成作用素を調べます。この極限は全ての $x$ で存在するとは限らないので、

$$
D(A)
$$

が再び主役になります。

本章の

- 稠密定義
- 閉作用素
- グラフノルム
- レゾルベント

が、そのまま Hille--Yosida の定理へ接続します。

---

## 12. 演習

### Level A

<a id="ex-evol1-a01"></a>
#### EVOL1-A01 定義域が変われば作用素が変わる
- Level: A

$\ell^2(\mathbb N)$ 上で

$$
A_0:c_{00}\to\ell^2,
\qquad
A_0x=(nx_n),
$$

$$
A:D(A)\to\ell^2,
\qquad
D(A)=\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

とする。

1. $A_0$ は $A$ の制限であることを示せ。
2. $D(A)\setminus c_{00}$ の元を一つ具体的に与えよ。
3. $D(A)\subsetneq\ell^2$ を示す元を一つ具体的に与えよ。

<!-- solution-start -->
### 詳細解答

1. $x\in c_{00}$ なら非零成分は有限個なので $(nx_n)$ も有限支列です。従って

$$
c_{00}\subset D(A).
$$

さらに $x\in c_{00}$ では

$$
A_0x=(nx_n)=Ax.
$$

よって $A_0=A|_{c_{00}}$ です。

2. 例えば

$$
x_n=\frac1{n^2}
$$

と置きます。

$$
\sum_{n=1}^{\infty}|x_n|^2
=
\sum_{n=1}^{\infty}\frac1{n^4}
<\infty,
$$

かつ

$$
\sum_{n=1}^{\infty}n^2|x_n|^2
=
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

従って $x\in D(A)$ です。一方、全ての成分が非零なので $x\notin c_{00}$ です。

3. 例えば

$$
y_n=\frac1n
$$

と置きます。

$$
\sum_{n=1}^{\infty}\frac1{n^2}<\infty
$$

なので $y\in\ell^2$ ですが、

$$
\sum_{n=1}^{\infty}n^2|y_n|^2
=
\sum_{n=1}^{\infty}1
=\infty.
$$

従って $y\notin D(A)$ です。

よって

$$
c_{00}\subsetneq D(A)\subsetneq\ell^2.
$$
<!-- solution-end -->

<a id="ex-evol1-a02"></a>
#### EVOL1-A02 対角作用素の非有界性
- Level: A

第 $N$ 標準基底ベクトル $e_N$ を使って

$$
A(x_n)=(nx_n)
$$

が $D(A)$ 上で非有界であることを示せ。

<!-- solution-start -->
### 詳細解答

$e_N\in c_{00}\subset D(A)$ で、

$$
\|e_N\|_2=1.
$$

一方

$$
Ae_N=Ne_N
$$

だから

$$
\|Ae_N\|_2=N.
$$

もしある $C\ge0$ が全ての $x\in D(A)$ に対して

$$
\|Ax\|_2\le C\|x\|_2
$$

を満たすなら、$x=e_N$ を代入して

$$
N\le C
$$

が全ての $N$ で必要になります。これは不可能です。

従って $A$ は非有界作用素です。
<!-- solution-end -->

<a id="ex-evol1-a03"></a>
#### EVOL1-A03 グラフノルムで Cauchy とは何を意味するか
- Level: A

$A:D(A)\subset X\to Y$ に対し

$$
\|x\|_A=\|x\|_X+\|Ax\|_Y
$$

とする。

列 $(x_k)\subset D(A)$ がグラフノルムで Cauchy であることと、

$$
(x_k)\text{ が }X\text{ で Cauchy},
$$

$$
(Ax_k)\text{ が }Y\text{ で Cauchy}
$$

であることが同値であることを示せ。

<!-- solution-start -->
### 詳細解答

グラフノルムで Cauchy なら、任意の $\varepsilon>0$ に対して十分大きい $k,m$ で

$$
\|x_k-x_m\|_A<\varepsilon.
$$

定義から

$$
\|x_k-x_m\|_X
\le
\|x_k-x_m\|_A,
$$

$$
\|Ax_k-Ax_m\|_Y
\le
\|x_k-x_m\|_A.
$$

従って両方とも Cauchy です。

逆に $(x_k)$ が $X$ で Cauchy、$(Ax_k)$ が $Y$ で Cauchy とします。

任意の $\varepsilon>0$ に対し、十分大きい $k,m$ で

$$
\|x_k-x_m\|_X<\frac\varepsilon2,
$$

$$
\|Ax_k-Ax_m\|_Y<\frac\varepsilon2.
$$

従って

$$
\begin{aligned}
\|x_k-x_m\|_A
&=
\|x_k-x_m\|_X
+
\|Ax_k-Ax_m\|_Y\\
&<
\varepsilon.
\end{aligned}
$$

よってグラフノルムでも Cauchy です。
<!-- solution-end -->

<a id="ex-evol1-a04"></a>
#### EVOL1-A04 可閉性の列判定を使う
- Level: A

$A:D(A)\subset X\to Y$ が可閉であり、

$$
x_k\to x,
\qquad
Ax_k\to y,
$$

$$
x_k'\to x,
\qquad
Ax_k'\to y'
$$

を満たす二つの列があるとする。

可閉性の列判定だけを使って $y=y'$ を示せ。

<!-- solution-start -->
### 詳細解答

差を取ります。

$$
x_k-x_k'\to x-x=0.
$$

線形性から

$$
A(x_k-x_k')
=
Ax_k-Ax_k'
\to
y-y'.
$$

可閉性の列判定によれば、入力が 0 へ収束し、作用素像が極限を持つなら、その極限は 0 でなければなりません。

従って

$$
y-y'=0,
$$

すなわち

$$
y=y'.
$$

これが「閉包したグラフが一価になる」核心です。
<!-- solution-end -->

<a id="ex-evol1-a05"></a>
#### EVOL1-A05 可閉でない稠密定義作用素
- Level: A

$$
T:c_{00}\subset\ell^2\to\mathbb K,
\qquad
Tx=\sum_{n=1}^{\infty}n x_n
$$

とする。

1. $T$ は稠密に定義されていることを示せ。
2. $x^{(k)}=e_k/k$ を使って $T$ が可閉でないことを示せ。

<!-- solution-start -->
### 詳細解答

1. $D(T)=c_{00}$ です。任意の $x\in\ell^2$ に対する切断

$$
P_Nx=(x_1,\ldots,x_N,0,\ldots)
$$

は $c_{00}$ に属し、

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0.
$$

よって $c_{00}$ は $\ell^2$ に稠密で、$T$ は稠密定義です。

2. 

$$
x^{(k)}=\frac1k e_k
$$

なら

$$
\|x^{(k)}\|_2=\frac1k\to0.
$$

一方

$$
Tx^{(k)}
=
k\cdot\frac1k
=
1.
$$

従って

$$
x^{(k)}\to0,
\qquad
Tx^{(k)}\to1\ne0.
$$

可閉性の列判定に反するので $T$ は可閉ではありません。

したがって「稠密定義」と「可閉」は別の条件です。
<!-- solution-end -->

### Level B

<a id="ex-evol1-b01"></a>
#### EVOL1-B01 対角作用素の閉性を再構成する
- Level: B

$$
D(A)=\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

とする。

$x^{(k)}\to x$ in $\ell^2$、$Ax^{(k)}\to y$ in $\ell^2$ から

$$
x\in D(A),
\qquad
Ax=y
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$\ell^2$ ノルムは各座標を支配するので、固定した $n$ に対して

$$
|x_n^{(k)}-x_n|
\le
\|x^{(k)}-x\|_2
\to0.
$$

従って

$$
x_n^{(k)}\to x_n.
$$

同様に

$$
|(Ax^{(k)})_n-y_n|
\le
\|Ax^{(k)}-y\|_2
\to0,
$$

だから

$$
(Ax^{(k)})_n\to y_n.
$$

しかし

$$
(Ax^{(k)})_n
=
nx_n^{(k)}.
$$

従って

$$
y_n
=
\lim_{k\to\infty}nx_n^{(k)}
=
nx_n.
$$

$y\in\ell^2$ なので

$$
(nx_n)_{n\ge1}=y\in\ell^2.
$$

従って $x\in D(A)$ です。

さらに座標ごとに $Ax=y$ なので、閉作用素の列判定を満たします。よって $A$ は閉作用素です。
<!-- solution-end -->

<a id="ex-evol1-b02"></a>
#### EVOL1-B02 最小対角作用素の閉包
- Level: B

$$
A_0:c_{00}\to\ell^2,
\qquad
A_0x=(nx_n)
$$

とする。

本文の命題を参照せず、

$$
\overline{A_0}=A
$$

をグラフの包含を二方向に示すことで証明せよ。

<!-- solution-start -->
### 詳細解答

まず $A$ は B01 から閉作用素で、$A_0$ を拡張しています。

従って

$$
G(A_0)\subset G(A).
$$

$G(A)$ は閉じているので

$$
\overline{G(A_0)}
\subset
G(A).
$$

逆向きを示します。

$x\in D(A)$ を任意に取り、

$$
P_Nx=(x_1,\ldots,x_N,0,\ldots)
$$

と置きます。

$P_Nx\in c_{00}$ で、

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0.
$$

また $(nx_n)\in\ell^2$ なので

$$
\|Ax-A_0P_Nx\|_2^2
=
\sum_{n>N}n^2|x_n|^2
\to0.
$$

したがって

$$
(P_Nx,A_0P_Nx)\to(x,Ax).
$$

よって

$$
(x,Ax)\in\overline{G(A_0)}.
$$

$x\in D(A)$ は任意なので

$$
G(A)\subset\overline{G(A_0)}.
$$

以上から

$$
\overline{G(A_0)}=G(A).
$$

従って $A_0$ は可閉で

$$
\overline{A_0}=A.
$$
<!-- solution-end -->

<a id="ex-evol1-b03"></a>
#### EVOL1-B03 core は元のノルムでの稠密性より強い
- Level: B

閉作用素 $A:D(A)\subset X\to Y$ と線形部分空間 $D_0\subset D(A)$ を考える。

1. $D_0$ が $A$ の core なら $D_0$ は $D(A)$ に元の $X$ ノルムで稠密であることを示せ。
2. 逆は一般には自動的でない理由を説明せよ。
3. 対角作用素では $c_{00}$ が core であることを二つの尾部和から示せ。

<!-- solution-start -->
### 詳細解答

1. core なら任意の $x\in D(A)$ に対して $(x_k)\subset D_0$ が存在し、

$$
\|x_k-x\|_A\to0.
$$

グラフノルムは

$$
\|z\|_A
=
\|z\|_X+\|Az\|_Y
\ge
\|z\|_X
$$

なので

$$
\|x_k-x\|_X
\le
\|x_k-x\|_A
\to0.
$$

従って $D_0$ は $D(A)$ に $X$ ノルムで稠密です。

2. $X$ ノルムで $x_k\to x$ だけ分かっても

$$
Ax_k\to Ax
$$

は従いません。非有界作用素では、入力が近くても出力差が大きくなる可能性があります。

core では

$$
\|x_k-x\|_X
+
\|Ax_k-Ax\|_Y
\to0
$$

まで要求するため、元のノルムでの稠密性より強い条件です。

3. 対角作用素で $x\in D(A)$ とし $P_Nx$ を切断とします。

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0,
$$

$$
\|Ax-AP_Nx\|_2^2
=
\sum_{n>N}n^2|x_n|^2
\to0.
$$

従って

$$
\|x-P_Nx\|_A
=
\|x-P_Nx\|_2
+
\|Ax-AP_Nx\|_2
\to0.
$$

$P_Nx\in c_{00}$ なので、$c_{00}$ は $D(A)$ にグラフノルムで稠密です。従って core です。
<!-- solution-end -->

<a id="ex-evol1-b04"></a>
#### EVOL1-B04 対角作用素のレゾルベント評価
- Level: B

$\lambda\notin\mathbb N$ とし、

$$
R(\lambda,A)y
=
\left(
\frac{y_n}{\lambda-n}
\right)
$$

とする。

1. 
$$
C_0=\sup_n\frac1{|\lambda-n|}<\infty
$$
を示せ。
2.
$$
C_1=\sup_n\frac n{|\lambda-n|}<\infty
$$
を示せ。
3. $R(\lambda,A)y\in D(A)$ を示せ。
4.
$$
\|R(\lambda,A)\|
\le C_0
$$
を示せ。

<!-- solution-start -->
### 詳細解答

1. $n\to\infty$ なら

$$
|\lambda-n|
\ge
n-|\lambda|
\to\infty.
$$

従って $1/|\lambda-n|$ が大きくなり得るのは有限個の $n$ だけです。$\lambda\notin\mathbb N$ なので各分母は非零です。よって有限個の最大値と尾部の上界を合わせて $C_0<\infty$ です。

2. $n>2|\lambda|$ なら

$$
|\lambda-n|
\ge
n-|\lambda|
>
\frac n2.
$$

従って

$$
\frac n{|\lambda-n|}<2.
$$

残る $n\le2|\lambda|$ は有限個で、分母は全て非零です。よって $C_1<\infty$ です。

3. $x=R(\lambda,A)y$ と置くと

$$
x_n=\frac{y_n}{\lambda-n}.
$$

すると

$$
\sum n^2|x_n|^2
=
\sum
\frac{n^2}{|\lambda-n|^2}|y_n|^2
\le
C_1^2\|y\|_2^2<\infty.
$$

従って $x\in D(A)$ です。

4.

$$
\begin{aligned}
\|R(\lambda,A)y\|_2^2
&=
\sum
\frac{|y_n|^2}{|\lambda-n|^2}\\
&\le
C_0^2\sum|y_n|^2\\
&=
C_0^2\|y\|_2^2.
\end{aligned}
$$

平方根を取れば

$$
\|R(\lambda,A)y\|_2
\le
C_0\|y\|_2.
$$

従って

$$
\|R(\lambda,A)\|
\le C_0.
$$
<!-- solution-end -->

### Level C

<a id="ex-evol1-c01"></a>
#### EVOL1-C01 非有界作用素の基礎構造を一つの例から再構成する
- Level: C

複素 Hilbert 空間 $\ell^2(\mathbb N)$ 上で

$$
A_0:c_{00}\to\ell^2,
\qquad
A_0x=(nx_n)
$$

とし、

$$
D(A)
=
\{x\in\ell^2:(nx_n)\in\ell^2\},
\qquad
Ax=(nx_n)
$$

とする。

次を順に証明せよ。

1. $A$ は非有界である。
2. $A$ は稠密に定義されている。
3. $A$ は閉作用素である。
4. $(D(A),\|\cdot\|_A)$ は Banach 空間である。
5. $A_0$ は可閉で $\overline{A_0}=A$ である。
6. $c_{00}$ は $A$ の core である。
7. $m\in\mathbb N$ は $\sigma(A)$ に属する。
8. $\lambda\notin\mathbb N$ なら
   $$
   R(\lambda,A)y
   =
   \left(\frac{y_n}{\lambda-n}\right)
   $$
   であり、$\lambda\in\rho(A)$ である。
9. 以上から $\sigma(A)=\mathbb N$ を結論せよ。
10. この例で、FA2 の閉グラフ定理と矛盾しない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 非有界性

$e_N\in D(A)$ に対して

$$
\|e_N\|_2=1,
\qquad
\|Ae_N\|_2=N.
$$

従って $\|Ax\|\le C\|x\|$ を全ての $x\in D(A)$ で満たす有限定数 $C$ は存在しません。

#### 2. 稠密定義

$c_{00}\subset D(A)$ です。

任意の $x\in\ell^2$ に対する切断 $P_Nx\in c_{00}$ は

$$
\|x-P_Nx\|_2^2
=
\sum_{n>N}|x_n|^2
\to0.
$$

従って $c_{00}$ は $\ell^2$ に稠密であり、それを含む $D(A)$ も $\ell^2$ に稠密です。

#### 3. 閉性

$x^{(k)}\to x$、$Ax^{(k)}\to y$ in $\ell^2$ とします。

各固定 $n$ について

$$
x_n^{(k)}\to x_n,
$$

$$
nx_n^{(k)}
=
(Ax^{(k)})_n
\to y_n.
$$

従って

$$
y_n=nx_n.
$$

$y\in\ell^2$ だから $(nx_n)\in\ell^2$、すなわち $x\in D(A)$ で $Ax=y$ です。

従って $A$ は閉作用素です。

#### 4. グラフノルム完備性

閉作用素とグラフノルム完備性の定理を $A$ に適用します。

$A$ は第3問で閉じているので

$$
(D(A),\|\cdot\|_A)
$$

は Banach 空間です。

ここで

$$
\|x\|_A
=
\|x\|_2+\|Ax\|_2.
$$

#### 5. $A_0$ の閉包

$A$ は $A_0$ の閉拡張なので

$$
\overline{G(A_0)}
\subset G(A).
$$

逆に $x\in D(A)$ なら切断 $P_Nx\in c_{00}$ に対して

$$
P_Nx\to x
\quad\text{in }\ell^2,
$$

$$
A_0P_Nx\to Ax
\quad\text{in }\ell^2
$$

です。従って

$$
(x,Ax)\in\overline{G(A_0)}.
$$

よって

$$
\overline{G(A_0)}=G(A)
$$

であり、

$$
\overline{A_0}=A.
$$

#### 6. core

上の切断はさらに

$$
\|x-P_Nx\|_A
=
\|x-P_Nx\|_2
+
\|Ax-A_0P_Nx\|_2
\to0.
$$

従って $c_{00}$ は $D(A)$ にグラフノルムで稠密です。よって $A$ の core です。

#### 7. 正整数はスペクトル

$m\in\mathbb N$ とすると

$$
Ae_m=me_m.
$$

よって

$$
(mI-A)e_m=0.
$$

$e_m\ne0$ なので $mI-A$ は単射でなく、

$$
m\in\sigma(A).
$$

#### 8. $\lambda\notin\mathbb N$ のレゾルベント

$\lambda\notin\mathbb N$ とします。

B04 で示したように

$$
C_0
=
\sup_n\frac1{|\lambda-n|}
<\infty,
$$

$$
C_1
=
\sup_n\frac n{|\lambda-n|}
<\infty.
$$

任意の $y\in\ell^2$ に対して

$$
x_n
=
\frac{y_n}{\lambda-n}
$$

と置けば

$$
\|x\|_2\le C_0\|y\|_2,
$$

$$
\|Ax\|_2\le C_1\|y\|_2.
$$

従って $x\in D(A)$ で、

$$
(\lambda I-A)x=y.
$$

また $(\lambda I-A)x=0$ なら全成分について $(\lambda-n)x_n=0$、しかも $\lambda-n\ne0$ なので $x=0$ です。

従って $\lambda I-A$ は全単射です。

さらに

$$
R(\lambda,A)y=x
$$

について

$$
\|R(\lambda,A)y\|_2
\le
C_0\|y\|_2.
$$

よって $R(\lambda,A)$ は有界で、

$$
\lambda\in\rho(A).
$$

#### 9. スペクトル

第7問から

$$
\mathbb N\subset\sigma(A).
$$

第8問から

$$
\mathbb C\setminus\mathbb N
\subset\rho(A).
$$

従って

$$
\boxed{
\sigma(A)=\mathbb N
}.
$$

#### 10. 閉グラフ定理と矛盾しない理由

$A$ は閉作用素で、しかも非有界です。

しかし FA2 の閉グラフ定理が「閉作用素なら有界」と言うためには、作用素が

$$
T:X\to Y
$$

として **$X$ 全体で定義されていること**が必要です。

本問の $A$ は

$$
D(A)\subsetneq\ell^2
$$

にしか定義されていません。

従って閉グラフ定理の全定義という仮定を満たしておらず、矛盾はありません。

むしろこの例こそ、

$$
\boxed{
\text{閉じた非有界作用素を扱うには定義域を作用素の一部にする}
}
$$

必要性を示しています。
<!-- solution-end -->

---

## 13. まとめ

- 非有界作用素では、公式だけでなく定義域 $D(A)$ が作用素のデータである。
- 全定義の閉線形作用素は閉グラフ定理で有界になるため、閉じた非有界作用素では真に小さい定義域が必要になる。
- 閉作用素とは、$x_k\to x$ と $Ax_k\to y$ を同時に仮定したとき $(x,y)$ がグラフから逃げない作用素である。
- $A$ が閉じていることと、$D(A)$ がグラフノルム
  $$
  \|x\|_A=\|x\|+\|Ax\|
  $$
  で Banach 空間になることは同値である。
- 稠密定義は元の空間のノルムでの近似可能性を表す。
- 可閉性は「0へ行く入力から非零の出力極限が残らない」という列判定で確認できる。
- core は定義域全体をグラフノルムで近似する小さい定義域である。
- 閉作用素では $\lambda I-A$ が全単射なら、その逆の有界性はグラフノルムと有界逆定理から自動的に従う。
- 非有界対角作用素 $A(x_n)=(nx_n)$ では
  $$
  \sigma(A)=\mathbb N,
  $$
  となり、有界作用素のスペクトルと違ってスペクトルは有界とは限らない。

次の EVOL2 では、ここで作った閉・稠密定義作用素とレゾルベントを使って、強連続半群の **生成作用素**と Hille--Yosida の定理へ進みます。
