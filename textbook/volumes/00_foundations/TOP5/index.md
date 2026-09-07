# TOP5 標準位相 V：コンパクト性の一般論

<!-- definition-example-audit: strict -->

コンパクト性は、見かけ上は「開集合を有限個に減らせる」という被覆の条件です。しかし実際には、無限に並んだ局所情報を有限個へ圧縮して大域的な結論へ変える原理として働きます。

この章では、次の流れを一つの論証として追います。

$$
\text{有限部分被覆}
\Longleftrightarrow
\text{閉集合族の有限交差性}
\Longrightarrow
\begin{cases}
\text{閉部分集合で保存}\cr
\text{連続像で保存}
\end{cases}
\Longrightarrow
\text{Hausdorff空間ではコンパクト集合が閉}.
$$

重要なのは矢印の名前ではなく、**どの仮定がどこで働くか**です。閉部分集合と連続像については Hausdorff 性は不要です。一方、「コンパクト部分集合は閉」と言う段階で初めて Hausdorff 性が必要になります。

後半では点列による収束条件との関係も調べます。一般位相では両者を同一視できません。距離空間では一致しますが、その証明には距離が与える開球と、点列から有限な球被覆を作る議論が必要です。

---

## 1. 開被覆とコンパクト性

<a id="def-top5-open-cover"></a>
<!-- formal-statement-start -->
> **定義（開被覆・有限部分被覆）**  
> 位相空間 $X$ の部分集合 $A\subseteq X$ と開集合族 $\{U_i\}_{i\in I}$ を考える。
>
> - $A\subseteq\bigcup_{i\in I}U_i$ のとき、$\{U_i\}_{i\in I}$ を $A$ の **開被覆** という。
> - 有限個 $i_1,\dots,i_n\in I$ を選んで $A\subseteq U_{i_1}\cup\cdots\cup U_{i_n}$ とできるとき、その有限族を **有限部分被覆** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top5-open-cover -->
**定義の確認**
### 1.1 無限被覆から有限個を選べる例

$A=[0,1]$ とし、

$$
U_n=(-1/n,1+1/n)\qquad(n\in\mathbb N)
$$

と置きます。各 $U_n$ は $\mathbb R$ の開集合で、すでに $U_1$ 一つだけで $[0,1]$ を覆っています。従って $\{U_n\}$ は無限個の集合からなる開被覆ですが、有限部分被覆 $\{U_1\}$ を持ちます。

「被覆そのものが有限」であることは要求していません。**与えられた被覆の中から有限個を選べるか**が問題です。
<!-- definition-example-end -->

<a id="def-top5-compact"></a>
<!-- formal-statement-start -->
> **定義（コンパクト空間）**  
> 位相空間 $X$ が **コンパクト** であるとは、$X$ の任意の開被覆が有限部分被覆を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top5-compact -->
**定義の確認**
### 1.2 有限位相空間はコンパクト

$X=\{x_1,\dots,x_m\}$ を有限集合とし、どのような位相を入れてもよいとします。$\{U_i\}_{i\in I}$ を $X$ の開被覆とします。

各 $x_k$ は被覆のどれかに入るので、$x_k\in U_{i_k}$ となる $i_k\in I$ を一つ選べます。すると

$$
X\subseteq U_{i_1}\cup\cdots\cup U_{i_m}.
$$

従って有限部分被覆が得られます。ここでは位相の細かい形は使っておらず、点が有限個しかないことだけを使っています。

### 1.3 実直線はコンパクトでない

通常の位相を入れた $\mathbb R$ に対し

$$
U_n=(-n,n)\qquad(n\in\mathbb N)
$$

と置きます。任意の $x\in\mathbb R$ に対し $n>|x|$ を取れば $x\in U_n$ なので、$\{U_n\}$ は $\mathbb R$ の開被覆です。

しかし有限個 $U_{n_1},\dots,U_{n_k}$ を選び、$N=\max(n_1,\dots,n_k)$ とすると

$$
U_{n_1}\cup\cdots\cup U_{n_k}=(-N,N),
$$

であり、たとえば $N+1$ を覆いません。よって有限部分被覆は存在せず、$\mathbb R$ はコンパクトではありません。
<!-- definition-example-end -->

非コンパクト性を示すには、「有限部分被覆を持たない開被覆」を一つ作れば十分です。逆にコンパクト性を示すには、任意の開被覆を相手にしなければなりません。この量化の非対称性を見失わないようにします。

---

## 2. 閉集合族から見る：有限交差性

<a id="def-top5-fip"></a>
<!-- formal-statement-start -->
> **定義（有限交差性）**  
> 集合族 $\mathcal F$ が **有限交差性** を持つとは、$F_1,\dots,F_n\in\mathcal F$ を任意に有限個選んだとき

$$
F_1\cap\cdots\cap F_n\ne\varnothing
$$

> となることをいう。本章では $n\ge1$ の有限部分族について述べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top5-fip -->
**定義の確認**
### 2.1 有限個なら交わるが、全部では交わらない族

$\mathbb R$ で

$$
F_n=[n,\infty)\qquad(n\in\mathbb N)
$$

と置きます。有限個 $F_{n_1},\dots,F_{n_k}$ を選び、$N=\max(n_1,\dots,n_k)$ とすると

$$
F_{n_1}\cap\cdots\cap F_{n_k}=[N,\infty)\ne\varnothing.
$$

従ってこの族は有限交差性を持ちます。しかし

$$
\bigcap_{n=1}^{\infty}F_n=\varnothing
$$

です。この現象がコンパクト空間では閉集合族について起こらない、というのが次の定理です。
<!-- definition-example-end -->

<a id="thm-top5-fip"></a>
<!-- formal-statement-start -->
> **定理（コンパクト性の有限交差性による特徴付け）**  
> 位相空間 $X$ について、次は同値である。
>
> 1. $X$ はコンパクトである。
> 2. $X$ の閉集合族 $\{F_i\}_{i\in I}$ が有限交差性を持つなら、

$$
\bigcap_{i\in I}F_i\ne\varnothing.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $X$ がコンパクトであるとします。閉集合族 $\{F_i\}_{i\in I}$ が有限交差性を持つとし、反対に

$$
\bigcap_{i\in I}F_i=\varnothing
$$

と仮定します。補集合を取ると De Morgan 則により

$$
X
=X\setminus\bigcap_{i\in I}F_i
=\bigcup_{i\in I}(X\setminus F_i).
$$

各 $F_i$ は閉なので $X\setminus F_i$ は開です。従って $\{X\setminus F_i\}_{i\in I}$ は $X$ の開被覆です。

コンパクト性から有限個 $i_1,\dots,i_n$ を選んで

$$
X=(X\setminus F_{i_1})\cup\cdots\cup(X\setminus F_{i_n})
$$

とできます。再び補集合を取ると

$$
\varnothing
=X\setminus X
=F_{i_1}\cap\cdots\cap F_{i_n}.
$$

これは有限交差性に反します。従って全体の共通部分は非空です。

逆に、閉集合族について 2 が成り立つとします。$\{U_i\}_{i\in I}$ を $X$ の任意の開被覆とします。有限部分被覆が存在しないと仮定して矛盾を導きます。

各 $i$ に対して

$$
F_i=X\setminus U_i
$$

と置けば $F_i$ は閉です。有限部分被覆が存在しないので、任意の有限個 $i_1,\dots,i_n$ について

$$
U_{i_1}\cup\cdots\cup U_{i_n}\ne X.
$$

補集合を取れば

$$
F_{i_1}\cap\cdots\cap F_{i_n}
=X\setminus(U_{i_1}\cup\cdots\cup U_{i_n})
\ne\varnothing.
$$

従って $\{F_i\}$ は有限交差性を持ちます。仮定 2 から

$$
\bigcap_{i\in I}F_i\ne\varnothing.
$$

ところが De Morgan 則により

$$
\bigcap_{i\in I}F_i
=X\setminus\bigcup_{i\in I}U_i
=X\setminus X
=\varnothing,
$$

となり矛盾です。よって任意の開被覆は有限部分被覆を持ち、$X$ はコンパクトです。$\square$
<!-- proof-end -->

二方向で行っている操作は同じです。

$$
\text{開被覆}
\quad\longleftrightarrow\quad
\text{補集合からなる閉集合族}
$$

$$
\text{有限部分被覆がない}
\quad\longleftrightarrow\quad
\text{任意の有限交差が非空}.
$$

「補集合を取れば明らか」で済ませると、この二つの量化の対応が見えなくなるので、上では両方向を実際に計算しました。

---

## 3. 閉部分集合と連続像で保存される

<a id="thm-top5-closed-subset"></a>
<!-- formal-statement-start -->
> **定理（コンパクト空間の閉部分集合はコンパクト）**  
> $X$ をコンパクト空間、$F\subseteq X$ を閉集合とする。このとき部分空間 $F$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\{U_i\}_{i\in I}$ を部分空間 $F$ の任意の開被覆とします。部分空間位相の定義から、各 $i$ について $X$ の開集合 $V_i$ が存在して

$$
U_i=F\cap V_i
$$

と書けます。

$F$ は閉なので $X\setminus F$ は開です。そこで

$$
\{V_i\}_{i\in I}\cup\{X\setminus F\}
$$

を考えます。$x\in F$ なら元の被覆のどれか $U_i$ に入るので $x\in V_i$ です。$x\notin F$ なら $x\in X\setminus F$ です。従ってこれは $X$ の開被覆です。

$X$ はコンパクトなので、有限個 $i_1,\dots,i_n$ を選んで

$$
X\subseteq V_{i_1}\cup\cdots\cup V_{i_n}\cup(X\setminus F)
$$

とできます。両辺を $F$ と交わらせると

$$
F
\subseteq
(F\cap V_{i_1})\cup\cdots\cup(F\cap V_{i_n})
=U_{i_1}\cup\cdots\cup U_{i_n}.
$$

従って元の被覆から有限部分被覆を選べました。よって $F$ はコンパクトです。$\square$
<!-- proof-end -->

ここで **Hausdorff 性は一度も使っていません**。使ったのは、$F$ が閉であるため $X\setminus F$ が開になり、$F$ の被覆を $X$ 全体の被覆へ拡張できることです。

<a id="thm-top5-continuous-image"></a>
<!-- formal-statement-start -->
> **定理（コンパクト空間の連続像はコンパクト）**  
> $X$ をコンパクト空間、$f:X\to Y$ を連続写像とする。このとき部分空間 $f(X)\subseteq Y$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\{U_i\}_{i\in I}$ を $f(X)$ の任意の開被覆とします。各 $U_i$ は $f(X)$ の部分空間位相で開なので、ある $Y$ の開集合 $V_i$ が存在して

$$
U_i=f(X)\cap V_i
$$

と書けます。

$f$ は連続なので $f^{-1}(V_i)$ は $X$ の開集合です。また $x\in X$ なら $f(x)\in f(X)$ で、被覆性からある $i$ に対して $f(x)\in U_i\subseteq V_i$ です。従って

$$
x\in f^{-1}(V_i).
$$

よって $\{f^{-1}(V_i)\}_{i\in I}$ は $X$ の開被覆です。

$X$ のコンパクト性から有限個 $i_1,\dots,i_n$ を選んで

$$
X=f^{-1}(V_{i_1})\cup\cdots\cup f^{-1}(V_{i_n})
$$

とできます。$y\in f(X)$ を任意に取ると $y=f(x)$ となる $x\in X$ が存在し、その $x$ はある $f^{-1}(V_{i_k})$ に入ります。従って $y=f(x)\in V_{i_k}$ であり、さらに $y\in f(X)$ なので

$$
y\in f(X)\cap V_{i_k}=U_{i_k}.
$$

よって

$$
f(X)\subseteq U_{i_1}\cup\cdots\cup U_{i_n}.
$$

したがって $f(X)$ はコンパクトです。$\square$
<!-- proof-end -->

ここでも Hausdorff 性は不要です。また $f$ が単射である必要もありません。$Y$ 全体のコンパクト性を結論したいときだけ、$f(X)=Y$、すなわち全射性が必要です。

---

## 4. Hausdorff性が初めて効く場所：コンパクト集合は閉

<a id="thm-top5-compact-hausdorff-closed"></a>
<!-- formal-statement-start -->
> **定理（Hausdorff空間のコンパクト部分集合は閉）**  
> $X$ を Hausdorff 空間、$K\subseteq X$ をコンパクト部分集合とする。このとき $K$ は $X$ の閉集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$K$ が閉であることを示すため、$X\setminus K$ が開であることを示します。任意に

$$
x\in X\setminus K
$$

を取ります。

各 $y\in K$ について $x\ne y$ です。$X$ は Hausdorff なので、$x$ と $y$ を分離する開集合 $V_y,U_y$ を取れて

$$
x\in V_y,
\qquad y\in U_y,
\qquad V_y\cap U_y=\varnothing
$$

となります。

$y$ を $K$ 全体で動かすと $\{U_y\}_{y\in K}$ は $K$ の開被覆です。$K$ はコンパクトなので、有限個 $y_1,\dots,y_n\in K$ を選んで

$$
K\subseteq U_{y_1}\cup\cdots\cup U_{y_n}
$$

とできます。

ここで

$$
V=V_{y_1}\cap\cdots\cap V_{y_n}
$$

と置きます。これは **有限個** の開集合の共通部分なので開であり、各 $V_{y_i}$ が $x$ を含むため $x\in V$ です。

さらに $V\cap K=\varnothing$ です。実際、もし $z\in V\cap K$ なら、有限被覆性からある $i$ について $z\in U_{y_i}$ です。一方 $z\in V\subseteq V_{y_i}$ でもあるので

$$
z\in U_{y_i}\cap V_{y_i},
$$

となり、両者が互いに素であることに反します。

従って

$$
x\in V\subseteq X\setminus K.
$$

$X\setminus K$ の各点がその中に含まれる開近傍を持つので、$X\setminus K$ は開です。よって $K$ は閉です。$\square$
<!-- proof-end -->

この証明では二つの仮定の役割が明確に分かれます。

- **Hausdorff性**：固定した $x\notin K$ と各 $y\in K$ を、一点ずつ互いに素な開近傍で分離する。
- **コンパクト性**：無限個あり得る $x$ 側の近傍 $V_y$ を有限個に減らし、その共通部分を開集合のまま保つ。

コンパクト性がなければ $\bigcap_{y\in K}V_y$ は無限共通部分になり、一般には開とは限りません。ここが有限部分被覆の本当の働きです。

Hausdorff仮定も外せません。たとえば無限集合 $X$ に補有限位相を入れると、TOP4で見た通り $X$ は Hausdorff ではありません。この空間では任意の部分集合 $A\subseteq X$ がコンパクトです。実際、$A$ の開被覆から一つ非空な開集合 $U$ を選ぶと $A\setminus U$ は有限なので、残りの各点を覆う開集合を有限個追加すればよいからです。一方、$A$ と $X\setminus A$ がともに無限なら $A$ は閉ではありません。従って「コンパクト部分集合なら閉」は Hausdorff 性なしには成立しません。

<a id="cor-top5-compact-hausdorff-homeomorphism"></a>
<!-- formal-statement-start -->
> **系（コンパクト空間からHausdorff空間への連続全単射は同相写像）**  
> $X$ をコンパクト空間、$Y$ を Hausdorff 空間とし、$f:X\to Y$ を連続全単射とする。このとき $f$ は同相写像である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f^{-1}:Y\to X$ が連続であることを示せば十分です。そのため $f$ が閉写像であることを示します。

$A\subseteq X$ を閉集合とします。$X$ はコンパクトなので、[コンパクト空間の閉部分集合はコンパクト](#thm-top5-closed-subset)から $A$ はコンパクトです。$f$ は連続なので、[コンパクト空間の連続像はコンパクト](#thm-top5-continuous-image)から $f(A)$ はコンパクトです。$Y$ は Hausdorff なので、[Hausdorff空間のコンパクト部分集合は閉](#thm-top5-compact-hausdorff-closed)から $f(A)$ は $Y$ で閉です。

従って $f$ は閉集合を閉集合へ送る閉写像です。

いま $C\subseteq X$ を閉集合とすると

$$
(f^{-1})^{-1}(C)=f(C)
$$

は $Y$ で閉です。従って $f^{-1}$ は閉集合の逆像を閉集合へ送るので連続です。したがって $f$ は同相写像です。$\square$
<!-- proof-end -->

ここで全単射性のうち、全射性は逆写像を $Y$ 全体で定義するため、単射性は逆写像が一価になるために必要です。コンパクト性と Hausdorff 性は、連続な逆写像を自動的に得るために使われています。

---

## 5. 点列だけを見てよいのか

<a id="def-top5-sequentially-compact"></a>
<!-- formal-statement-start -->
> **定義（点列コンパクト性）**  
> 位相空間 $X$ が **点列コンパクト** であるとは、$X$ の任意の点列 $(x_n)$ が、ある点 $x\in X$ へ収束する部分列 $(x_{n_k})$ を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-top5-sequentially-compact -->
**定義の確認**
### 5.1 有限空間では値が無限回現れる

有限集合 $X$ の任意の点列 $(x_n)$ を考えます。もし各点が有限回しか現れなければ、有限個の点の出現回数を合計しても有限回にしかならず、無限列であることに反します。従ってある $x\in X$ が無限回現れます。その添字を増加順に $n_1<n_2<\cdots$ と取れば

$$
x_{n_k}=x
$$

なので、この部分列は $x$ に収束します。従って有限位相空間は点列コンパクトです。
<!-- definition-example-end -->

### 一般位相では無条件に同値ではない

コンパクト性と点列コンパクト性は、一般の位相空間では同じ概念ではありません。したがって

$$
\text{compact}\iff\text{sequentially compact}
$$

を仮定なしで使ってはいけません。

典型的には、非可算積や非可算順序位相で両者のずれが現れます。たとえば非可算積 $\{0,1\}^{\mathcal P(\mathbb N)}$ は Tychonoff の定理によりコンパクトですが、点列

$$
x_n(A)=\mathbf 1_{\{n\in A\}}
\qquad(A\subseteq\mathbb N)
$$

は収束部分列を持ちません。実際、任意の部分列 $x_{n_k}$ に対し

$$
A=\{n_2,n_4,n_6,\dots\}
$$

という座標を選べば、その座標値は $0,1,0,1,\dots$ と交互になり収束しません。

ただし、この例の「積空間がコンパクトである」部分は後続の Tychonoff の定理を必要とします。本章の prerequisite DAG へその定理を先取りして入れることはせず、**一般位相では同値でないことを示す証明境界の例**としてのみ記録します。

---

## 6. 距離空間ではコンパクト性と点列コンパクト性が一致する

<a id="thm-top5-metric-sequential"></a>
<!-- formal-statement-start -->
> **定理（距離空間ではコンパクト性と点列コンパクト性が同値）**  
> 距離空間 $(X,d)$ について、次は同値である。
>
> 1. $X$ はコンパクトである。
> 2. $X$ は点列コンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 6.1 コンパクトなら点列コンパクト

$X$ がコンパクトであるとし、任意の点列 $(x_n)$ を取ります。各 $n$ について尾部

$$
A_n=\{x_k:k\ge n\}
$$

とその閉包

$$
F_n=\overline{A_n}
$$

を考えます。$F_n$ は閉で、$A_n\ne\varnothing$ なので $F_n\ne\varnothing$ です。また $A_{n+1}\subseteq A_n$ なので $F_{n+1}\subseteq F_n$ です。

従って有限個 $F_{n_1},\dots,F_{n_r}$ を選び、$N=\max(n_1,\dots,n_r)$ とすると

$$
F_N\subseteq F_{n_1}\cap\cdots\cap F_{n_r}.
$$

$F_N$ は非空だから、この閉集合族は有限交差性を持ちます。[コンパクト性の有限交差性による特徴付け](#thm-top5-fip)から

$$
\bigcap_{n=1}^{\infty}F_n\ne\varnothing.
$$

その点を $x$ とします。

$x\in F_n=\overline{A_n}$ なので、任意の $\varepsilon>0$ と任意の $n$ に対して

$$
B(x,\varepsilon)\cap A_n\ne\varnothing.
$$

これを使って部分列を帰納的に選びます。まず $n_1$ を $x_{n_1}\in B(x,1)$ となるように取ります。$n_m$ まで選んだら、$x\in\overline{A_{n_m+1}}$ なので

$$
B(x,1/(m+1))\cap A_{n_m+1}\ne\varnothing.
$$

従ってある $n_{m+1}\ge n_m+1$ を選んで

$$
x_{n_{m+1}}\in B(x,1/(m+1))
$$

とできます。こうして

$$
n_1<n_2<\cdots,
\qquad d(x_{n_m},x)<1/m
$$

となるため $x_{n_m}\to x$ です。よって $X$ は点列コンパクトです。

この向きでは、距離を使ったのは最後に $1/m$ の球で収束部分列を具体的に選ぶ部分です。一般位相では「全ての尾部閉包に属する点」から可算な近傍列を使って部分列を抜き出せるとは限りません。

#### 6.2 点列コンパクトなら、任意の半径で有限個の球により覆える

次に $X$ が点列コンパクトであるとします。まず任意の $\varepsilon>0$ に対して、有限個の点 $p_1,\dots,p_m$ が存在し

$$
X\subseteq B(p_1,\varepsilon)\cup\cdots\cup B(p_m,\varepsilon)
$$

となることを示します。

反対に、ある $\varepsilon>0$ について有限個の半径 $\varepsilon$ の球では $X$ を覆えないとします。$x_1\in X$ を一つ取ります。$B(x_1,\varepsilon)$ だけでは覆えないので $x_2\notin B(x_1,\varepsilon)$ を取れます。$x_1,\dots,x_n$ まで取ったとき、有限個の球では覆えないという仮定から

$$
x_{n+1}\notin\bigcup_{j=1}^n B(x_j,\varepsilon)
$$

を取れます。

すると $i<j$ なら $d(x_i,x_j)\ge\varepsilon$ です。この点列が収束部分列を持つと仮定します。収束列は Cauchy 列なので、その部分列では十分後の二項間距離が $\varepsilon/2$ 未満になるはずです。しかし全ての異なる二項間距離は $\varepsilon$ 以上です。矛盾です。

従って任意の $\varepsilon>0$ について有限個の半径 $\varepsilon$ の球で $X$ を覆えます。TOP6では、この性質を **全有界性** として独立に扱います。

#### 6.3 点列コンパクトなら、任意の開被覆にLebesgue数がある

$\mathcal U$ を $X$ の任意の開被覆とします。ある $\delta>0$ が存在して、任意の $x\in X$ に対し

$$
B(x,\delta)\subseteq U
$$

となる $U\in\mathcal U$ が存在することを示します。

そのような $\delta$ が存在しないと仮定します。すると各 $n\in\mathbb N$ について、どの $U\in\mathcal U$ にも完全には入らない球を持つ点 $x_n$ を選べて

$$
B(x_n,1/n)\not\subseteq U
\qquad(\forall U\in\mathcal U)
$$

となります。

点列コンパクト性から部分列 $x_{n_k}$ がある $x\in X$ に収束します。$\mathcal U$ は被覆なので、ある $U\in\mathcal U$ が $x\in U$ を満たします。$U$ は開なので、ある $r>0$ に対して $B(x,r)\subseteq U$ です。

十分大きい $k$ では

$$
d(x_{n_k},x)<r/2,
\qquad 1/n_k<r/2.
$$

このとき $z\in B(x_{n_k},1/n_k)$ なら三角不等式から

$$
d(z,x)
\le d(z,x_{n_k})+d(x_{n_k},x)
<r/2+r/2=r.
$$

従って

$$
B(x_{n_k},1/n_k)\subseteq B(x,r)\subseteq U,
$$

となり、$x_{n_k}$ の選び方に反します。よってそのような $\delta>0$ は存在します。

#### 6.4 有限球被覆とLebesgue数を組み合わせる

6.3 で得た $\delta>0$ を固定します。6.2 を半径 $\delta/2$ に適用すると、有限個 $p_1,\dots,p_m$ が存在して

$$
X\subseteq\bigcup_{j=1}^m B(p_j,\delta/2)
$$

となります。

Lebesgue数の性質から各 $j$ についてある $U_j\in\mathcal U$ が存在し

$$
B(p_j,\delta)\subseteq U_j
$$

となります。特に $B(p_j,\delta/2)\subseteq U_j$ なので

$$
X\subseteq U_1\cup\cdots\cup U_m.
$$

$\mathcal U$ から有限部分被覆を選べたので $X$ はコンパクトです。$\square$
<!-- proof-end -->

この逆向きで距離が働いた場所も具体的です。距離があるから、

1. 「有限個の $\varepsilon$ 球で覆えない」ことから互いに一定距離以上離れた点列を作れる。
2. 開集合の内部に球 $B(x,r)$ を入れられる。
3. 三角不等式で、収束した中心の小球全体を一つの被覆要素へ押し込める。

一般位相でこれらの操作は自動的にはできません。

---

## 7. 仮定の境界を整理する

この章の主要結果を、追加仮定が必要かどうかで並べると次のようになります。

$$
\begin{array}{c|c}
\text{結論} & \text{追加仮定}\\ \hline
\text{有限交差性による特徴付け} & \text{なし}\\
\text{閉部分集合で保存} & \text{閉であることのみ}\\
\text{連続像で保存} & \text{連続性のみ}\\
\text{コンパクト部分集合は閉} & \text{母空間がHausdorff}\\
\text{連続全単射が同相} & \text{始域compact・終域Hausdorff}\\
\text{compact}\iff\text{sequentially compact} & \text{距離空間なら成立}
\end{array}
$$

特に、次の三つを混同しないでください。

- 「閉部分集合ならコンパクト」は、**母空間がコンパクト**なら Hausdorff 性なしで成立する。
- 「コンパクト部分集合なら閉」は、一般には誤りで、**母空間の Hausdorff 性**が必要である。
- 「コンパクトなら点列から収束部分列を取れる」は、距離空間では正しいが、**一般位相へ無条件には拡張できない**。

---

## 8. 演習

### Level A

<a id="ex-top5-a01"></a>
#### TOP5-A01 有限集合
- Level: A

有限集合 $X$ に任意の位相を入れる。$A\subseteq X$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**：$A$ も有限集合です。$A$ の任意の開被覆を取り、各点 $a\in A$ についてその点を含む被覆要素を一つ選びます。$A$ の点数以下の有限個で $A$ 全体を覆えます。母空間の位相が何かは使いません。
<!-- solution-end -->

<a id="ex-top5-a02"></a>
#### TOP5-A02 非コンパクト性を被覆で示す
- Level: A

通常の位相を入れた $(0,1)$ がコンパクトでないことを、有限部分被覆を持たない開被覆を構成して示せ。

<!-- solution-start -->
**解答・解説**：

$$
U_n=(0,1-1/n)\qquad(n\ge2)
$$

を取ります。任意の $x\in(0,1)$ に対して $1-1/n>x$ となる $n$ があるので、$\{U_n\}$ は $(0,1)$ を覆います。一方、有限個 $U_{n_1},\dots,U_{n_k}$ を選び $N=\max n_i$ とすると合併は

$$
U_N=(0,1-1/N)
$$

です。たとえば $1-1/(2N)$ は $(0,1)$ に属しますが $U_N$ に属しません。従って有限部分被覆はありません。

非コンパクト性では、(i)本当に全体を覆う、(ii)有限個では覆えない、の両方を確認する必要があります。
<!-- solution-end -->

<a id="ex-top5-a03"></a>
#### TOP5-A03 有限交差性
- Level: A

$X$ がコンパクトで、閉集合列

$$
F_1\supseteq F_2\supseteq\cdots,
\qquad F_n\ne\varnothing
$$

があるとする。$\bigcap_nF_n\ne\varnothing$ を示せ。

<!-- solution-start -->
**解答・解説**：任意の有限個 $F_{n_1},\dots,F_{n_k}$ を取って $N=\max n_i$ とすると、単調減少性から

$$
F_N\subseteq F_{n_1}\cap\cdots\cap F_{n_k}.
$$

$F_N\ne\varnothing$ なので有限交差性があります。[コンパクト性の有限交差性による特徴付け](#thm-top5-fip)から全体の共通部分も非空です。
<!-- solution-end -->

<a id="ex-top5-a04"></a>
#### TOP5-A04 連続全射
- Level: A

$X$ がコンパクトで $f:X\to Y$ が連続全射なら $Y$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**：[コンパクト空間の連続像はコンパクト](#thm-top5-continuous-image)から $f(X)$ はコンパクトです。全射性から $f(X)=Y$ なので $Y$ はコンパクトです。ここで全射性は最後の等式にだけ使っています。
<!-- solution-end -->

<a id="ex-top5-a05"></a>
#### TOP5-A05 閉性にHausdorffが必要な理由
- Level: A

Hausdorff空間 $X$ のコンパクト集合 $K$ と $x\notin K$ を取る。証明中でコンパクト性がなければ困る箇所を一文ではなく集合式で説明せよ。

<!-- solution-start -->
**解答・解説**：Hausdorff性だけなら各 $y\in K$ ごとに $x\in V_y$, $y\in U_y$, $V_y\cap U_y=\varnothing$ を取れます。しかし $x$ と $K$ 全体を分離する候補

$$
\bigcap_{y\in K}V_y
$$

は無限共通部分になり得るので開とは限りません。コンパクト性で $K$ を $U_{y_1},\dots,U_{y_n}$ の有限個で覆うことで

$$
V_{y_1}\cap\cdots\cap V_{y_n}
$$

という有限共通部分に落とし、開な $x$ の近傍を得ます。
<!-- solution-end -->

### Level B

<a id="ex-top5-b01"></a>
#### TOP5-B01 コンパクト集合の交わり
- Level: B

Hausdorff空間 $X$ のコンパクト部分集合 $K,L$ に対し $K\cap L$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**：Hausdorff性から $L$ は閉です。従って $K\cap L$ は部分空間 $K$ で閉です。$K$ はコンパクトなので、[コンパクト空間の閉部分集合はコンパクト](#thm-top5-closed-subset)から $K\cap L$ はコンパクトです。

Hausdorff性を使ったのは $L$ を閉とする部分です。$L$ が最初から $X$ で閉だと分かっているなら Hausdorff性は不要です。
<!-- solution-end -->

<a id="ex-top5-b02"></a>
#### TOP5-B02 閉写像性
- Level: B

$X$ をコンパクト、$Y$ を Hausdorff とし、$f:X\to Y$ を連続写像とする。$f$ は閉写像であることを示せ。単射・全射は必要か。

<!-- solution-start -->
**解答・解説**：閉集合 $A\subseteq X$ を取ります。[コンパクト空間の閉部分集合はコンパクト](#thm-top5-closed-subset)から $A$ はコンパクトで、[コンパクト空間の連続像はコンパクト](#thm-top5-continuous-image)から $f(A)$ もコンパクトです。[Hausdorff空間のコンパクト部分集合は閉](#thm-top5-compact-hausdorff-closed)から $f(A)$ は $Y$ で閉です。従って $f$ は閉写像です。この議論には単射も全射も使いません。
<!-- solution-end -->

<a id="ex-top5-b03"></a>
#### TOP5-B03 距離空間での有限球被覆
- Level: B

点列コンパクトな距離空間 $X$ について、ある $\varepsilon>0$ で有限個の $\varepsilon$ 球が $X$ を覆えないと仮定すると、なぜ収束部分列を持たない点列を作れるか説明せよ。

<!-- solution-start -->
**解答・解説**：帰納的に

$$
x_{n+1}\notin\bigcup_{j=1}^nB(x_j,\varepsilon)
$$

と選べます。すると異なる二項の距離は常に $\varepsilon$ 以上です。もし部分列が収束すれば、その部分列は Cauchy なので十分後の二項間距離は $\varepsilon/2$ 未満になるはずで矛盾します。
<!-- solution-end -->

### Level C

<a id="ex-top5-c01"></a>
#### TOP5-C01 距離空間でのLebesgue数
- Level: C

点列コンパクトな距離空間 $X$ の任意の開被覆 $\mathcal U$ が正の Lebesgue 数を持つことを、背理法で証明せよ。

<!-- solution-start -->
**解答・解説**：正の Lebesgue 数がないと仮定すると、各 $n$ について

$$
B(x_n,1/n)\not\subseteq U\qquad(\forall U\in\mathcal U)
$$

となる $x_n$ を選べます。点列コンパクト性から $x_{n_k}\to x$ となる部分列を取ります。$x\in U\in\mathcal U$ を選び、開性から $B(x,r)\subseteq U$ とします。十分大きい $k$ では中心のずれも球の半径も $r/2$ 未満なので、三角不等式から

$$
B(x_{n_k},1/n_k)\subseteq B(x,r)\subseteq U,
$$

となり $x_n$ の選び方に反します。
<!-- solution-end -->

---

## 9. 章末チェック

この章を終えた時点で、次を自分の言葉で説明できることを確認してください。

1. 開被覆の定義で「任意」と「有限」がそれぞれどこに量化されているか。
2. 有限部分被覆がないことと、補集合族が有限交差性を持つことがなぜ同値か。
3. 閉部分集合の保存則で、$X\setminus F$ を被覆へ追加する理由。
4. 連続像の保存則で、逆像を使う理由。
5. コンパクト集合の閉性で、Hausdorff性とコンパクト性がそれぞれ何を担当するか。
6. 一般位相で点列だけを見てはいけない理由と、距離空間の証明で距離がどこに使われるか。

定理名を暗記するのではなく、この六点を再構成できれば、TOP5の主要論証は手元に残っています。
