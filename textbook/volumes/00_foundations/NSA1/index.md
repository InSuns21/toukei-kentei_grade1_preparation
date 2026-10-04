# NSA1 超実数はどこから来るか：自由超フィルターと商構成

<!-- definition-example-audit: strict -->

実解析では、数列がある実数へ近づくことを極限で記述しました。例えば

$$
\frac1{n+1}\longrightarrow 0
$$

です。しかし「限りなく 0 に近い量」を、0 そのものとは別の数として計算に使いたいなら、極限だけでは足りません。極限では列の行き先を実数として取り出しますが、ここで欲しいのは **列そのものから新しい数を作る仕組み**です。

この章では [SET9](../SET9/index.md#thm-set9-free-ultrafilter-on-n) で構成した自然数上の自由超フィルターを使い、

$$
{}^*\mathbb R
=
\mathbb R^{\mathbb N}/\!\sim_{\mathcal U}
$$

という商集合を実際に作ります。

到達点は三つです。

1. どの数列を「同じ新しい数」とみなすかを定める。
2. その同値類に加法・乗法・順序を入れ、全順序体になることを直接証明する。
3. その中に、0 ではない正の量
   $
   \left[\frac1{n+1}\right]
   $
   が「どの正の標準実数よりも小さい」こと、さらに
   $
   [n+1]
   $
   が「どの正の標準実数よりも大きい」ことを確認する。

この章では、後続章で導く一般的な性質移送の仕組みをまだ使いません。商集合と超フィルターの性質だけで、この新しい数体系の土台を閉じます。

---

## 1. 「十分多くの添字で一致する」を何で測るか

普通の極限では、有限個の初項を変えても極限は変わりません。今回の商構成でも有限個の例外を無視したいのですが、それだけでは二つの任意の数列を比較するには弱すぎます。

例えば

$$
x_n=
\begin{cases}
0,&n\text{ が偶数},\\
1,&n\text{ が奇数}
\end{cases}
$$

では、0 になる添字も1になる添字も無限にあります。

ここで [SET9 の自然数上の自由超フィルターの構成](../SET9/index.md#thm-set9-free-ultrafilter-on-n)を使います。以後、その証明で余有限フィルターを延長して得た自由超フィルター

$$
\mathcal U\subseteq\mathcal P(\mathbb N)
$$

を一つ固定します。したがって、任意の余有限集合は $\mathcal U$ に入ります。

また [超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy) により、任意の $A\subseteq\mathbb N$ について

$$
A\in\mathcal U
\quad\text{または}\quad
\mathbb N\setminus A\in\mathcal U
$$

のちょうど一方が成り立ちます。

以下では、添字集合 $A$ について $A\in\mathcal U$ かどうかを直接確認します。ここで $\mathcal U$ に属することは要素数の比較ではなく、固定した超フィルターがその集合を選んでいるという意味です。

---

## 2. 数列を同じものとみなす規則

数列 $x=(x_n)$ と $y=(y_n)$ が「$\mathcal U$ が重要とみなす添字で一致する」とき、同じ新しい数を表すことにします。

<a id="def-nsa1-u-equivalence"></a>
<!-- formal-statement-start -->
### 定義（U-同値）

$x=(x_n),y=(y_n)\in\mathbb R^{\mathbb N}$ に対し、

$$
x\sim_{\mathcal U}y
\quad\Longleftrightarrow\quad
\{n\in\mathbb N:x_n=y_n\}\in\mathcal U
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-u-equivalence -->
**定義の確認。**

$$
x_n=0,
\qquad
y_n=
\begin{cases}
7,&n=0,1,2,\\
0,&n\ge3
\end{cases}
$$

とします。

一致する添字集合は

$$
\{3,4,5,\ldots\}
$$

で、その補集合は有限です。したがってこの集合は余有限集合であり $\mathcal U$ に入ります。よって

$$
x\sim_{\mathcal U}y.
$$

有限個の成分を変更しても、同じ同値類になります。
<!-- definition-example-end -->

ここで注意したいのは、**収束先が同じことと $\mathcal U$-同値であることは別**だという点です。

$$
x_n=\frac1{n+1},
\qquad
y_n=0
$$

はどちらも 0 へ近づきますが、

$$
\{n:x_n=y_n\}=\varnothing
$$

なので

$$
x\not\sim_{\mathcal U}y.
$$

後で $[1/(n+1)]$ が、0 ではないのに任意の正の標準実数より小さい数になる理由は、すでにここに見えています。

<a id="prop-nsa1-u-equivalence-relation"></a>
<!-- formal-statement-start -->
### 命題（U-同値は同値関係である）

関係 $\sim_{\mathcal U}$ は $\mathbb R^{\mathbb N}$ 上の同値関係である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反射律・対称律・推移律を順に確認します。

**反射律。** 任意の $x=(x_n)$ について

$$
\{n:x_n=x_n\}=\mathbb N.
$$

フィルターは全体集合 $\mathbb N$ を含むので $x\sim_{\mathcal U}x$ です。

**対称律。** 集合として

$$
\{n:x_n=y_n\}
=
\{n:y_n=x_n\}
$$

なので、$x\sim_{\mathcal U}y$ なら $y\sim_{\mathcal U}x$ です。

**推移律。** $x\sim_{\mathcal U}y$ と $y\sim_{\mathcal U}z$ を仮定します。

$$
A=\{n:x_n=y_n\},
\qquad
B=\{n:y_n=z_n\}
$$

と置くと $A,B\in\mathcal U$ です。フィルターの有限共通部分閉性から

$$
A\cap B\in\mathcal U.
$$

$n\in A\cap B$ なら $x_n=y_n=z_n$ なので

$$
A\cap B
\subseteq
\{n:x_n=z_n\}.
$$

フィルターの上方閉性から

$$
\{n:x_n=z_n\}\in\mathcal U.
$$

従って $x\sim_{\mathcal U}z$ です。以上より同値関係です。$\square$
<!-- proof-end -->

---

## 3. 同値類を新しい数と呼ぶ

[SET-U1 の商集合](../SET-U1/index.md)の一般論を使える段階になりました。

<a id="def-nsa1-hyperreal"></a>
<!-- formal-statement-start -->
### 定義（超実数）

商集合

$$
{}^*\mathbb R
=
\mathbb R^{\mathbb N}/\!\sim_{\mathcal U}
$$

の元を **超実数**という。

数列 $x=(x_n)$ の同値類を

$$
[x_n]_{\mathcal U}
$$

または単に $[x_n]$ と書く。この商構成を、ここでは実数列の **超冪（ultrapower）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-hyperreal -->
**定義の確認。**

$$
(0,0,0,0,\ldots),
\qquad
(7,7,7,0,0,0,\ldots)
$$

は有限個の成分しか違わないので、同じ超実数を表します。

一方、

$$
\left(1,\frac12,\frac13,\ldots\right)
$$

と零列は一致する添字を一つも持たないため、異なる超実数を表します。
<!-- definition-example-end -->

同値類という抽象的な記号になったので、次の問題は、代表列を別のものへ取り替えても足し算や掛け算の答えが変わらないか、という点です。

---

## 4. 加法・乗法を同値類へ降ろす

超実数を「数」として使うには、同値類どうしを足したり掛けたりできなければなりません。自然な候補は、代表列を成分ごとに計算してから再び同値類へ戻す方法です。

ただし、同じ超実数には複数の代表列があります。そこで、まず成分ごとの演算を定義し、その直後に代表列を取り替えても結果が変わらないことを証明します。

<a id="def-nsa1-arithmetic"></a>
<!-- formal-statement-start -->
### 定義（超実数の加法・乗法・符号反転）

$x=[x_n]$、$y=[y_n]$ に対して

$$
x+y=[x_n+y_n],
$$

$$
xy=[x_ny_n],
$$

$$
-x=[-x_n]
$$

と定める。

零元と単位元は定数列の同値類

$$
0=[0,0,0,\ldots],
\qquad
1=[1,1,1,\ldots]
$$

とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-arithmetic -->
**定義の確認。**

$$
\varepsilon
=
\left[\frac1{n+1}\right],
\qquad
H=[n+1]
$$

と置くと、各添字で

$$
\frac1{n+1}(n+1)=1
$$

なので

$$
\varepsilon H=[1]=1.
$$

この段階では、$\varepsilon$ が任意の正の標準実数より小さいことや、$H$ が任意の正の標準実数より大きいことはまだ使っていません。
<!-- definition-example-end -->

<a id="prop-nsa1-arithmetic-well-defined"></a>
<!-- formal-statement-start -->
### 命題（加法・乗法は代表元によらない）

$x\sim_{\mathcal U}x'$、$y\sim_{\mathcal U}y'$ なら

$$
(x_n+y_n)\sim_{\mathcal U}(x_n'+y_n')
$$

かつ

$$
(x_ny_n)\sim_{\mathcal U}(x_n'y_n').
$$

従って上の加法・乗法は超実数上で 代表元によらず定まる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
A=\{n:x_n=x_n'\},
\qquad
B=\{n:y_n=y_n'\}
$$

と置きます。仮定から $A,B\in\mathcal U$ なので

$$
A\cap B\in\mathcal U.
$$

$n\in A\cap B$ なら

$$
x_n=x_n',
\qquad
y_n=y_n'
$$

であり、

$$
x_n+y_n=x_n'+y_n',
\qquad
x_ny_n=x_n'y_n'.
$$

したがって

$$
A\cap B
\subseteq
\{n:x_n+y_n=x_n'+y_n'\},
$$

$$
A\cap B
\subseteq
\{n:x_ny_n=x_n'y_n'\}.
$$

フィルターの上方閉性から右辺の二集合も $\mathcal U$ に属します。符号反転も $x_n=x_n'\Rightarrow -x_n=-x_n'$ から同様です。従って演算は代表元の選び方に依存しません。$\square$
<!-- proof-end -->

結合則・交換則・分配則は、各添字で実数の対応する等式が成り立つため、代表列に成分ごとに適用すれば同値類でも成り立ちます。ただし逆元だけは少し工夫が必要です。

---

## 5. 0 でない超実数の逆数を作る

$x=[x_n]\ne0$ なら、定義を戻すと

$$
\{n:x_n=0\}\notin\mathcal U.
$$

超フィルターの二者択一により、その補集合

$$
S=\{n:x_n\ne0\}
$$

は $\mathcal U$ に入ります。

<a id="prop-nsa1-inverse"></a>
<!-- formal-statement-start -->
### 命題（非零超実数の逆元）

$x=[x_n]\ne0$ とする。

$$
y_n=
\begin{cases}
1/x_n,&x_n\ne0,\\
0,&x_n=0
\end{cases}
$$

と置けば

$$
[x_n][y_n]=1.
$$

従って全ての非零超実数は乗法逆元を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で見たように

$$
S=\{n:x_n\ne0\}\in\mathcal U.
$$

$n\in S$ では

$$
x_ny_n
=
x_n\frac1{x_n}
=
1.
$$

従って

$$
S
\subseteq
\{n:x_ny_n=1\}.
$$

上方閉性から

$$
\{n:x_ny_n=1\}\in\mathcal U.
$$

これは $[x_ny_n]=[1]$ を意味するので

$$
[x_n][y_n]=1.
$$

$x_n=0$ となる添字では $y_n$ を0と置きましたが、その部分は $\mathcal U$ が無視する側にあるため、逆元の同値類には影響しません。$\square$
<!-- proof-end -->

ここで「各 $x_n$ が非零」と仮定していないことに注意してください。必要なのは

$$
\{n:x_n\ne0\}\in\mathcal U
$$

だけです。

---

## 6. 順序も代表列から作る

四則演算だけでは、「0より大きい」「標準実数より小さい」といった比較をまだ表せません。そこで、代表列の大小関係が $\mathcal U$ に属する添字集合で成り立つかどうかを、超実数の大小関係として採用します。

ここでも、代表列を替えたときに判定が変わらないことを定義の直後に確認します。

<a id="def-nsa1-order"></a>
<!-- formal-statement-start -->
### 定義（超実数の順序）

$x=[x_n]$、$y=[y_n]$ に対して

$$
x\le y
\quad\Longleftrightarrow\quad
\{n:x_n\le y_n\}\in\mathcal U
$$

と定める。

また

$$
x<y
\quad\Longleftrightarrow\quad
\{n:x_n<y_n\}\in\mathcal U
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-order -->
**定義の確認。**

$$
\varepsilon
=
\left[\frac1{n+1}\right]
$$

では全ての $n$ について $0<1/(n+1)$ です。したがって

$$
\{n:0\le1/(n+1)\}=\mathbb N\in\mathcal U.
$$

さらに $\varepsilon\ne0$ なので

$$
0<\varepsilon.
$$
<!-- definition-example-end -->

<a id="prop-nsa1-order-well-defined"></a>
<!-- formal-statement-start -->
### 命題（順序は代表元によらない）

$x\sim_{\mathcal U}x'$、$y\sim_{\mathcal U}y'$ なら

$$
\{n:x_n\le y_n\}\in\mathcal U
$$

であることと

$$
\{n:x_n'\le y_n'\}\in\mathcal U
$$

であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
E
=
\{n:x_n=x_n'\}\cap\{n:y_n=y_n'\}
$$

と置きます。仮定と有限共通部分閉性から $E\in\mathcal U$ です。

さらに

$$
A=\{n:x_n\le y_n\},
\qquad
A'=\{n:x_n'\le y_n'\}
$$

とします。

$n\in E$ では $x_n=x_n'$、$y_n=y_n'$ なので

$$
n\in A
\quad\Longleftrightarrow\quad
n\in A'.
$$

いま $A\in\mathcal U$ とすると

$$
A\cap E\in\mathcal U.
$$

しかも $A\cap E\subseteq A'$ なので上方閉性から $A'\in\mathcal U$ です。逆向きも $A'$ と $A$ を入れ替えれば同じです。従って $\le$ は代表元によらず定まります。

厳密不等号についても、$E$ 上では

$$
x_n<y_n
\quad\Longleftrightarrow\quad
x_n'<y_n'
$$

なので同じ議論が使えます。従って $<$ も代表元によらず定まります。$\square$
<!-- proof-end -->

さらに実数では、各添字で $x_n<y_n$、$x_n=y_n$、$x_n>y_n$ のちょうど一つが成り立ちます。三つの添字集合は $\mathbb N$ を分割するため、超フィルターはそのちょうど一つを選びます。したがって、ここで定めた $x<y$ は

$$
x\le y
\quad\text{かつ}\quad
x\ne y
$$

と同値です。

---

## 7. なぜ超フィルターが全順序を作るのか

通常のフィルターだけでは、二つの列 $x_n,y_n$ に対して「$x_n\le y_n$ が大きい側」と「$x_n>y_n$ が大きい側」のどちらかを必ず選べるとは限りません。

超フィルターでは、任意の部分集合とその補集合の一方を必ず選びます。この二者択一が、商集合上の全順序を作ります。

<a id="thm-nsa1-ordered-field"></a>
<!-- formal-statement-start -->
### 定理（超実数は全順序体をなす）

上で定めた加法・乗法・順序により、超実数全体は全順序体をなす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

体の代数法則は、実数列に成分ごとに演算を施したとき各添字で成立します。加法・乗法の 代表元によらないことと非零元の逆元はすでに確認しました。ここでは順序の公理と演算との両立を確認します。

**反射律。**

$$
\{n:x_n\le x_n\}=\mathbb N\in\mathcal U
$$

なので $x\le x$ です。

**反対称律。** $x\le y$ かつ $y\le x$ とします。

$$
A=\{n:x_n\le y_n\},
\qquad
B=\{n:y_n\le x_n\}
$$

はいずれも $\mathcal U$ に入ります。従って $A\cap B\in\mathcal U$ です。

$n\in A\cap B$ では実数の反対称律から $x_n=y_n$ なので

$$
A\cap B\subseteq\{n:x_n=y_n\}.
$$

上方閉性から $\{n:x_n=y_n\}\in\mathcal U$、すなわち $x=y$ です。

**推移律。** $x\le y$、$y\le z$ とします。

$$
A=\{n:x_n\le y_n\},
\qquad
B=\{n:y_n\le z_n\}
$$

の共通部分は $\mathcal U$ に入り、その上では

$$
x_n\le y_n\le z_n.
$$

従って

$$
A\cap B\subseteq\{n:x_n\le z_n\}.
$$

上方閉性から $x\le z$ です。

**全比較可能性。**

$$
A=\{n:x_n\le y_n\}
$$

と置きます。[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)から

$$
A\in\mathcal U
$$

または

$$
\mathbb N\setminus A\in\mathcal U
$$

です。

前者なら $x\le y$ です。後者では

$$
\mathbb N\setminus A
=
\{n:x_n>y_n\}
\subseteq
\{n:y_n\le x_n\}.
$$

上方閉性から $y\le x$ です。

ここで初めて、単なるフィルターではなく **超フィルター**であることが全順序性に効きました。

**加法との両立。** $x\le y$ なら

$$
A=\{n:x_n\le y_n\}\in\mathcal U.
$$

$n\in A$ では $x_n+z_n\le y_n+z_n$ なので

$$
A\subseteq\{n:x_n+z_n\le y_n+z_n\}.
$$

上方閉性から $x+z\le y+z$ です。

**非負元の積。** $0\le x$、$0\le y$ とすると

$$
A=\{n:0\le x_n\},
\qquad
B=\{n:0\le y_n\}
$$

はいずれも $\mathcal U$ に入ります。$A\cap B$ 上では $0\le x_ny_n$ なので

$$
A\cap B\subseteq\{n:0\le x_ny_n\}.
$$

上方閉性から $0\le xy$ です。

以上で全順序体です。$\square$
<!-- proof-end -->

---

## 8. 普通の実数は定数列として入る

超実数は実数を捨てて作るのではなく、実数を内部に含む拡大です。

<a id="def-nsa1-standard-embedding"></a>
<!-- formal-statement-start -->
### 定義（実数の標準埋め込み）

$r\in\mathbb R$ に対して定数列

$$
(r,r,r,\ldots)
$$

の同値類を対応させる写像

$$
\iota:\mathbb R\to{}^*\mathbb R,
\qquad
\iota(r)=[r,r,r,\ldots]
$$

を **実数の標準埋め込み**という。

混乱のない範囲で、以後 $\iota(r)$ を単に $r$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-standard-embedding -->
**定義の確認。**

実数 $2$ は超実数の中では

$$
2=[2,2,2,\ldots]
$$

を表します。したがって

$$
2+3
=
[2,2,\ldots]+[3,3,\ldots]
=
[5,5,\ldots]
=
5.
$$
<!-- definition-example-end -->

<a id="prop-nsa1-standard-embedding"></a>
<!-- formal-statement-start -->
### 命題（実数の標準埋め込みは順序体の埋め込みである）

$\iota$ は単射であり、任意の $r,s\in\mathbb R$ に対して

$$
\iota(r+s)=\iota(r)+\iota(s),
$$

$$
\iota(rs)=\iota(r)\iota(s),
$$

かつ

$$
r\le s
\quad\Longleftrightarrow\quad
\iota(r)\le\iota(s)
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

加法・乗法の保存は定数列を成分ごとに計算すれば従います。

単射性を確認します。$\iota(r)=\iota(s)$ なら

$$
\{n:r=s\}\in\mathcal U.
$$

$r\ne s$ ならこの集合は空集合ですが、フィルターは空集合を含みません。従って $r=s$ です。

順序について、$r\le s$ なら

$$
\{n:r\le s\}=\mathbb N\in\mathcal U
$$

なので $\iota(r)\le\iota(s)$ です。

逆に $r>s$ なら

$$
\{n:r\le s\}=\varnothing\notin\mathcal U
$$

なので $\iota(r)\le\iota(s)$ ではありません。従って順序も保存されます。$\square$
<!-- proof-end -->

この結果により、以後は実数を超実数の一部とみなして計算できます。

---

## 9. 0 ではないのに、どんな正の標準実数より小さい数

全順序体では、実数と同じように絶対値を

$$
|x|=
\begin{cases}
x,&x\ge0,\\
-x,&x<0
\end{cases}
$$

と定められます。以下の「小さい」「大きい」は、前節までに構成した超実数の順序について述べています。

ここまでの構成だけなら「実数列の商を作った」だけです。超準解析らしい最初の報酬は、0ではないのに任意の正の標準実数より小さい数が実際に現れることです。

<a id="def-nsa1-infinitesimal"></a>
<!-- formal-statement-start -->
### 定義（無限小超実数）

$x$ が **無限小**であるとは、任意の標準実数 $r>0$ に対して

$$
|x|<r
$$

が成り立つことをいう。

さらに $x>0$ なら **正の無限小**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-infinitesimal -->
**定義の確認。**

候補

$$
\varepsilon
=
\left[\frac1{n+1}\right]
$$

を考えます。例えば標準実数 $r=0.001$ に対して、$n\ge1000$ なら

$$
0<\frac1{n+1}<0.001.
$$

この添字集合は余有限なので $\mathcal U$ に入ります。したがって超実数の順序でも

$$
0<\varepsilon<0.001.
$$

次の定理では任意の標準 $r>0$ で同じことを示します。
<!-- definition-example-end -->

<a id="thm-nsa1-positive-infinitesimal"></a>
<!-- formal-statement-start -->
### 定理（正の非零無限小が存在する）

$$
\varepsilon
=
\left[\frac1{n+1}\right]
$$

と置くと、$\varepsilon$ は正の無限小であり、

$$
\varepsilon\ne0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

全ての $n$ について $1/(n+1)>0$ なので $\varepsilon\ge0$ です。また

$$
\left\{n:\frac1{n+1}=0\right\}
=
\varnothing
\notin\mathcal U
$$

なので $\varepsilon\ne0$ です。従って $\varepsilon>0$ です。

標準実数 $r>0$ を任意に取ります。

[F0-00A1B の「逆数を任意に小さくできる」結果](../F0_00A1B_実数の上限性質_Archimedes性/index.md)から、ある $m\in\mathbb N_{>0}$ が存在して

$$
\frac1m<r.
$$

$n\ge m$ なら $n+1>m$ なので

$$
0<\frac1{n+1}<\frac1m<r.
$$

従って

$$
\{n:n\ge m\}
\subseteq
\left\{n:\frac1{n+1}<r\right\}.
$$

左辺は余有限集合なので $\mathcal U$ に入ります。上方閉性から右辺も $\mathcal U$ に入ります。よって

$$
\varepsilon<r.
$$

$r>0$ は任意だったので $\varepsilon$ は正の無限小です。$\square$
<!-- proof-end -->

この $\varepsilon$ は極限記号ではありません。超実数体の一つの元であり、

$$
\varepsilon>0,
\qquad
\varepsilon^2>0,
\qquad
\frac1\varepsilon=[n+1]
$$

のように普通の数と同じ四則演算ができます。

---

## 10. 無限大超実数も同時に現れる

正の無限小 $\varepsilon$ は0ではないので、全順序体の中では逆数 $1/\varepsilon$ を取れます。先ほどの具体例では、その逆数は $[n+1]$ です。

この数は、どの標準正実数よりも大きくなります。この性質を名前で呼べるようにしてから、$[n+1]$ が実際にその条件を満たすことを証明します。

<a id="def-nsa1-infinite-hyperreal"></a>
<!-- formal-statement-start -->
### 定義（無限大超実数）

超実数 $x$ が **無限大超実数**であるとは、任意の標準実数 $r>0$ に対して

$$
|x|>r
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa1-infinite-hyperreal -->
**定義の確認。**

$$
H=[n+1]
$$

を考えます。例えば標準実数 $r=10^6$ に対して、$n\ge10^6$ なら $n+1>10^6$ です。この添字集合は余有限なので

$$
H>10^6.
$$
<!-- definition-example-end -->

<a id="thm-nsa1-infinite-hyperreal"></a>
<!-- formal-statement-start -->
### 定理（無限大超実数が存在する）

$$
H=[n+1]
$$

と置くと $H$ は正の無限大超実数である。さらに

$$
H\varepsilon=1
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

標準実数 $r>0$ を取ります。

[Archimedes 性](../F0_00A1B_実数の上限性質_Archimedes性/index.md)から、ある $m\in\mathbb N$ が存在して

$$
m>r.
$$

$n\ge m$ なら

$$
n+1>m>r.
$$

従って

$$
\{n:n\ge m\}
\subseteq
\{n:n+1>r\}.
$$

左辺は余有限集合なので $\mathcal U$ に入り、上方閉性から右辺も $\mathcal U$ に入ります。よって $H>r$ です。

$r>0$ は任意なので $H$ は正の無限大超実数です。

また各 $n$ について

$$
(n+1)\frac1{n+1}=1
$$

なので

$$
H\varepsilon
=
[n+1]
\left[\frac1{n+1}\right]
=
[1]
=
1.
$$

$\square$
<!-- proof-end -->

---

## 11. 超実数体は本当に実数体より大きい

<a id="cor-nsa1-proper-extension"></a>
<!-- formal-statement-start -->
### 系（超実数体は実数体の真の拡大である）

実数の標準埋め込みの像は超実数体の真部分集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正の無限小

$$
\varepsilon
=
\left[\frac1{n+1}\right]
$$

が標準実数 $r$ と等しいと仮定します。

$\varepsilon>0$ なので $r>0$ です。ところが無限小性を標準正実数 $r/2$ に適用すると

$$
\varepsilon<\frac r2.
$$

一方 $\varepsilon=r$ なら

$$
r<\frac r2
$$

となり矛盾です。

従って $\varepsilon$ はどの標準実数とも等しくありません。よって超実数体は実数体の真の拡大です。$\square$
<!-- proof-end -->

---

## 12. 偶数か奇数かを超フィルターが決める例

$$
a_n=(-1)^n,
\qquad
a=[(-1)^n]
$$

を考えます。

偶数集合を $E$、奇数集合を $O$ とすると

$$
O=\mathbb N\setminus E.
$$

超フィルターの二者択一により

$$
E\in\mathcal U
\quad\text{または}\quad
O\in\mathcal U
$$

のちょうど一方が成り立ちます。

$E\in\mathcal U$ なら $a=1$、$O\in\mathcal U$ なら $a=-1$ です。したがって

$$
[(-1)^n]\in\{-1,1\},
$$

ですが、どちらになるかは固定した $\mathcal U$ に依存します。

これは矛盾ではありません。超実数体を作るとき、最初に自由超フィルターを一つ固定したからです。後続章で使う解析上の基本法則は、このような個別の選択に依存しない形で述べます。

---

## 13. この章でまだしていないこと

ここまでで実数体を真に含む全順序体を具体的に作り、無限小と無限大を得ました。

しかし、まだ次は正当化していません。

- 実数上の関数を、新しい数体系上の関数へ一般に延長する方法
- 実数上で成り立つ命題を、新しい数体系へ移してよい条件
- 数だけでなく集合や写像にも同じ考え方を適用する方法
- 大きさが有限の新しい数から、それに最も近い実数を取り出す方法
- 極限・連続・微分・積分を、この新しい数体系で特徴付ける方法

これらを「同じ式だから当然」として使うと、超準解析はすぐに論理的な穴を作ります。

次章 NSA2 では、命題を正確に書き分けるための論理言語を必要最小限だけ整えます。その後 NSA3 で、実数上の性質をこの新しい数体系へ移せる範囲を定理として証明します。

---

## 14. 演習

### Level A

<a id="ex-nsa1-a01"></a>
#### NSA1-A01 有限個だけ違う列は同じ超実数を表す
- Level: A

$$
x_n=n,
\qquad
y_n=
\begin{cases}
100,&n=0,\\
-7,&n=1,\\
n,&n\ge2
\end{cases}
$$

とする。 $[x_n]=[y_n]$ を示せ。

<!-- solution-start -->
#### 詳細解答

一致する添字集合を

$$
A=\{n:x_n=y_n\}
$$

とします。$n\ge2$ では $x_n=y_n=n$ なので

$$
\{2,3,4,\ldots\}\subseteq A.
$$

左辺は余有限集合です。固定した $\mathcal U$ は余有限フィルターを含むため、この左辺は $\mathcal U$ に入ります。

フィルターの上方閉性から $A\in\mathcal U$ です。従って

$$
x\sim_{\mathcal U}y,
$$

すなわち $[x_n]=[y_n]$ です。
<!-- solution-end -->

<a id="ex-nsa1-a02"></a>
#### NSA1-A02 同じ極限でも同じ超実数とは限らない
- Level: A

$$
x_n=\frac1{n+1},
\qquad
y_n=0
$$

とする。

1. 両方の実数列の極限を求めよ。
2. $[x_n]\ne[y_n]$ を示せ。

<!-- solution-start -->
#### 詳細解答

通常の実解析では

$$
\frac1{n+1}\to0,
\qquad
0\to0.
$$

従って両列の極限は0です。

一方、一致する添字集合は

$$
\{n:x_n=y_n\}
=
\left\{n:\frac1{n+1}=0\right\}
=
\varnothing.
$$

フィルターは空集合を含まないので、この集合は $\mathcal U$ に入りません。

したがって

$$
x\not\sim_{\mathcal U}y,
$$

すなわち

$$
[x_n]\ne[y_n].
$$

超実数の等号は「同じ極限を持つか」ではなく、「$\mathcal U$ に属する添字集合で実際に等しいか」で決まります。
<!-- solution-end -->

<a id="ex-nsa1-a03"></a>
#### NSA1-A03 標準実数の埋め込みは単射
- Level: A

$r,s\in\mathbb R$ とする。

$$
[r,r,r,\ldots]=[s,s,s,\ldots]
$$

なら $r=s$ であることを、$\mathcal U$-同値の定義から直接示せ。

<!-- solution-start -->
#### 詳細解答

同値類が等しいので

$$
\{n:r=s\}\in\mathcal U.
$$

$r\ne s$ と仮定すると、どの添字でも $r=s$ は成り立たないため

$$
\{n:r=s\}=\varnothing.
$$

しかし $\varnothing\notin\mathcal U$ です。矛盾なので $r=s$ です。従って実数の標準埋め込みは単射です。
<!-- solution-end -->

<a id="ex-nsa1-a04"></a>
#### NSA1-A04 交代列は $1$ か $-1$ になる
- Level: A

$$
a_n=(-1)^n
$$

とする。$E$ を偶数全体、$O$ を奇数全体とするとき、

$$
[a_n]=1
\quad\text{または}\quad
[a_n]=-1
$$

のちょうど一方が成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答

$E$ と $O$ は互いに補集合なので

$$
O=\mathbb N\setminus E.
$$

[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)により

$$
E\in\mathcal U
$$

または

$$
O\in\mathcal U
$$

のちょうど一方が成り立ちます。

$E\in\mathcal U$ なら

$$
\{n:a_n=1\}=E\in\mathcal U
$$

なので $[a_n]=1$ です。

$O\in\mathcal U$ なら同様に $[a_n]=-1$ です。

両方が成り立つなら $E,O\in\mathcal U$ となり、

$$
E\cap O=\varnothing\in\mathcal U
$$

となって矛盾します。従ってちょうど一方です。
<!-- solution-end -->

### Level B

<a id="ex-nsa1-b01"></a>
#### NSA1-B01 加法と乗法の 代表元によらないことを再構成する
- Level: B

$x\sim_{\mathcal U}x'$、$y\sim_{\mathcal U}y'$ とする。

$$
[x_n+y_n]=[x_n'+y_n'],
\qquad
[x_ny_n]=[x_n'y_n']
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

仮定から

$$
A=\{n:x_n=x_n'\}\in\mathcal U,
$$

$$
B=\{n:y_n=y_n'\}\in\mathcal U.
$$

有限共通部分閉性により

$$
A\cap B\in\mathcal U.
$$

$n\in A\cap B$ なら

$$
x_n=x_n',
\qquad
y_n=y_n',
$$

したがって

$$
x_n+y_n=x_n'+y_n',
\qquad
x_ny_n=x_n'y_n'.
$$

よって

$$
A\cap B
\subseteq
\{n:x_n+y_n=x_n'+y_n'\},
$$

$$
A\cap B
\subseteq
\{n:x_ny_n=x_n'y_n'\}.
$$

上方閉性から右辺はいずれも $\mathcal U$ に入ります。従って加法と乗法は代表元の取り方によらず定まります。
<!-- solution-end -->

<a id="ex-nsa1-b02"></a>
#### NSA1-B02 途中で0になる列の逆元
- Level: B

$$
x_n=
\begin{cases}
0,&n=0,\\
n,&n\ge1
\end{cases}
$$

とし、$x=[x_n]$ とする。

1. $x\ne0$ を示せ。
2. 逆元を表す列 $y_n$ を作れ。
3. $xy=1$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\{n:x_n=0\}=\{0\}.
$$

一元集合は有限で、その補集合は余有限です。固定した $\mathcal U$ は余有限フィルターを延長しているため

$$
\mathbb N\setminus\{0\}\in\mathcal U.
$$

もし $\{0\}\in\mathcal U$ でもあれば共通部分から空集合が $\mathcal U$ に入ってしまうので、$\{0\}\notin\mathcal U$ です。従って $x\ne0$ です。

逆元の代表列を

$$
y_0=0,
\qquad
y_n=\frac1n\quad(n\ge1)
$$

と置きます。

$n\ge1$ では $x_ny_n=1$ なので

$$
\{n:x_ny_n=1\}
\supseteq
\{1,2,3,\ldots\}.
$$

右辺は余有限集合で $\mathcal U$ に入ります。上方閉性から

$$
\{n:x_ny_n=1\}\in\mathcal U.
$$

従って

$$
xy=[x_ny_n]=1.
$$

一つの添字で $x_n=0$ でも、超実数 $x$ 自体は非零であり逆元を持ちます。
<!-- solution-end -->

<a id="ex-nsa1-b03"></a>
#### NSA1-B03 全順序性で超フィルター性が必要な箇所
- Level: B

$x=[x_n]$、$y=[y_n]$ とし、

$$
A=\{n:x_n\le y_n\}
$$

と置く。

超フィルターの二者択一を用いて

$$
x\le y
\quad\text{または}\quad
y\le x
$$

を示し、通常のフィルターだけでは同じ議論が閉じない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

超フィルターの二者択一から

$$
A\in\mathcal U
$$

または

$$
\mathbb N\setminus A\in\mathcal U.
$$

前者なら順序の定義から $x\le y$ です。

後者では

$$
\mathbb N\setminus A
=
\{n:x_n>y_n\}
\subseteq
\{n:y_n\le x_n\}.
$$

したがって上方閉性により

$$
\{n:y_n\le x_n\}\in\mathcal U,
$$

すなわち $y\le x$ です。

通常のフィルターでは、一般の集合 $A$ に対して $A$ または補集合のどちらか一方を必ず含むとは限りません。その場合、二つの超実数に相当する同値類を比較できない可能性があります。

全順序を得る核心は **超フィルターの二者択一**です。
<!-- solution-end -->

### Level C

<a id="ex-nsa1-c01"></a>
#### NSA1-C01 超実数体の構成を最初から再構成する
- Level: C

自然数上の自由超フィルター $\mathcal U$ が与えられているとする。次を一続きの論証として再構成せよ。

1. $\sim_{\mathcal U}$ を定義し、同値関係であることを示す。
2. 商集合として超実数を作る。
3. 加法・乗法・順序を定義し、代表元によらないことを示す。
4. 非零元の逆元を構成する。
5. 超フィルターの二者択一から全順序性を示す。
6. $\mathbb R$ を定数列で埋め込む。
7. $\varepsilon=[1/(n+1)]$ が正の非零無限小であることを示す。
8. $H=[n+1]$ が無限大で $H\varepsilon=1$ であることを示す。
9. 超実数体が実数体の真の拡大であることを結論する。

<!-- solution-start -->
#### 詳細解答

**1. 同値関係。**

$$
x\sim_{\mathcal U}y
\iff
\{n:x_n=y_n\}\in\mathcal U
$$

と定めます。

反射律では一致集合が $\mathbb N$、対称律では一致集合そのものが同一です。推移律では

$$
\{n:x_n=y_n\}\cap\{n:y_n=z_n\}
\subseteq
\{n:x_n=z_n\}
$$

を使い、有限共通部分閉性と上方閉性から結論します。

**2. 商集合。**

[SET-U1](../SET-U1/index.md) の商集合の一般論により

$$
{}^*\mathbb R
=
\mathbb R^{\mathbb N}/\!\sim_{\mathcal U}
$$

を作り、数列 $(x_n)$ の同値類を $[x_n]$ と書きます。

**3. 演算と順序。**

$$
[x_n]+[y_n]=[x_n+y_n],
$$

$$
[x_n][y_n]=[x_ny_n],
$$

$$
[x_n]\le[y_n]
\iff
\{n:x_n\le y_n\}\in\mathcal U
$$

と定めます。

代表列を $x_n',y_n'$ に替えたとき、

$$
E
=
\{n:x_n=x_n'\}\cap\{n:y_n=y_n'\}
\in\mathcal U
$$

です。$E$ 上では和・積・大小判定が同じになるため、各一致集合への包含と上方閉性を使えば 代表元によらないことが従います。

**4. 逆元。**

$x=[x_n]\ne0$ なら

$$
\{n:x_n=0\}\notin\mathcal U.
$$

二者択一から

$$
S=\{n:x_n\ne0\}\in\mathcal U.
$$

そこで

$$
y_n=
\begin{cases}
1/x_n,&n\in S,\\
0,&n\notin S
\end{cases}
$$

と置きます。$S$ 上で $x_ny_n=1$ なので

$$
[x_n][y_n]=1.
$$

**5. 全順序。**

$$
A=\{n:x_n\le y_n\}
$$

に二者択一を適用します。

$A\in\mathcal U$ なら $x\le y$ です。補集合が $\mathcal U$ に入るなら、その補集合は

$$
\{n:x_n>y_n\}
$$

であり

$$
\{n:y_n\le x_n\}
$$

に含まれるので $y\le x$ です。

反射律・反対称律・推移律、および加法・非負積との両立は、実数で成り立つ関係を $\mathcal U$ に属する集合上で使い、有限共通部分閉性と上方閉性で移します。

**6. 標準実数の埋め込み。**

$$
r\longmapsto[r,r,r,\ldots]
$$

とします。

$r\ne s$ なら定数列の一致集合は空集合なので同値類は異なります。従って単射です。加法・乗法・順序も成分ごとに保存されます。

**7. 正の非零無限小。**

$$
\varepsilon
=
\left[\frac1{n+1}\right].
$$

各成分が正で、0との一致集合は空なので $\varepsilon>0$ かつ $\varepsilon\ne0$ です。

標準 $r>0$ を取ります。Archimedes 性から $1/m<r$ となる $m$ を取れます。$n\ge m$ なら

$$
\frac1{n+1}<\frac1m<r.
$$

尾集合 $\{n:n\ge m\}$ は余有限で $\mathcal U$ に入るため $\varepsilon<r$ です。従って $\varepsilon$ は無限小です。

**8. 無限大。**

$$
H=[n+1].
$$

標準 $r>0$ に対して Archimedes 性から $m>r$ を取ります。$n\ge m$ なら $n+1>r$ です。尾集合は $\mathcal U$ に入るので $H>r$ です。

また全ての添字で

$$
(n+1)\frac1{n+1}=1
$$

なので

$$
H\varepsilon=1.
$$

**9. 真の拡大。**

$\varepsilon$ が標準実数 $r$ だと仮定します。$\varepsilon>0$ から $r>0$ ですが、無限小性を標準正実数 $r/2$ に適用すると

$$
\varepsilon<r/2.
$$

$\varepsilon=r$ と合わせると $r<r/2$ となり矛盾です。

従って $\varepsilon$ は標準実数ではなく、超実数体は実数体の真の拡大です。
<!-- solution-end -->
