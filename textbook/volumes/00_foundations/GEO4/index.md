# GEO4 局所から大域へ：局所化・貼り合わせ・埋め込み

[GEO3](../GEO3/index.md) までで、多様体は各点の近くでは Euclid 空間と同じように扱え、部分多様体も局所座標では座標平面として見えることが分かりました。しかし、局所座標ごとに作った対象を多様体全体へ持ち上げようとすると、別の問題が現れます。

たとえば、各座標近傍では滑らかな関数や内積を簡単に作れます。それらを単純に足すと、ある点の近くで無限個の項が同時に現れて滑らかさを失うかもしれません。逆に一つの座標だけを選ぶと、大域的な対象になりません。

本章の中心は

$$
\text{開被覆}
\longrightarrow
\text{局所有限な細分}
\longrightarrow
\text{滑らかな局所化関数}
\longrightarrow
\text{局所関数の正規化}
\longrightarrow
\text{局所データの貼り合わせ}
$$

です。

直接の前提は [GEO3](../GEO3/index.md) と [TOP5A](../TOP5A/index.md) です。GEO1 で滑らかな多様体の定義に入れた Hausdorff 性・第二可算性が、ここで初めて大域的な構成に強く効きます。TOP5A の [局所コンパクト Hausdorff 空間の縮小](../TOP5A/index.md#thm-top5a-lch-shrinking)は、開集合の内側へ閉包ごと縮める道具として再利用します。

<!-- definition-example-audit: strict -->

---

## 1. 「無限個あっても局所的には有限個」なら扱える

<a id="def-geo4-locally-finite-family"></a>
<!-- formal-statement-start -->
> **定義（局所有限族）**  
> 位相空間 $X$ の部分集合族 $(A_j)_{j\in J}$ が **局所有限**であるとは、任意の $p\in X$ に対して開近傍 $N_p$ が存在し、
>
$$
\{j\in J:N_p\cap A_j\neq\varnothing\}
$$
>
> が有限集合となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo4-locally-finite-family -->
**定義の確認**

実直線上で

$$
A_k=(k-1,k+1),
\qquad k\in\mathbb Z
$$

とします。$x\in\mathbb R$ を固定し、たとえば $N_x=(x-1/4,x+1/4)$ と取ります。$N_x\cap A_k\neq\varnothing$ なら

$$
k-1<x+\frac14,
\qquad
k+1>x-\frac14
$$

なので

$$
x-\frac54<k<x+\frac54.
$$

この区間に入る整数 $k$ は有限個です。従って $(A_k)_{k\in\mathbb Z}$ は局所有限です。

一方

$$
B_n=(-n,n),
\qquad n\ge1
$$

は局所有限ではありません。$0$ のどの近傍も全ての $B_n$ と交わるからです。
<!-- definition-example-end -->

局所有限性の価値は「無限和を局所的な有限和へ変える」ことです。$(f_j)_{j\in J}$ が滑らかな関数族で、その台の族 $(\operatorname{supp}f_j)$ が局所有限なら、

$$
f(p)=\sum_{j\in J}f_j(p)
$$

は各点の近くで有限和です。従って $f$ は滑らかです。項別微分に収束定理を持ち込む必要はありません。

---

## 2. 開被覆を扱いやすい開被覆へ作り替える

<a id="def-geo4-refinement"></a>
<!-- formal-statement-start -->
> **定義（開被覆の細分）**  
> 位相空間 $X$ の開被覆 $(U_\alpha)_{\alpha\in A}$ と開被覆 $(V_j)_{j\in J}$ を考える。$(V_j)_{j\in J}$ が $(U_\alpha)_{\alpha\in A}$ の **細分**であるとは、各 $j\in J$ に対して少なくとも一つの $\alpha(j)\in A$ が存在し、
>
$$
V_j\subseteq U_{\alpha(j)}
$$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo4-refinement -->
**定義の確認**

$\mathbb R$ の開被覆

$$
U_k=(k-2,k+2),
\qquad k\in\mathbb Z
$$

に対し

$$
V_k=(k-1,k+1)
$$

と置けば

$$
V_k\subset U_k
$$

です。また任意の $x\in\mathbb R$ はある整数 $k$ に対して $|x-k|<1$ を満たすので $(V_k)$ も $\mathbb R$ を覆います。従って $(V_k)$ は $(U_k)$ の細分です。前節と同じ計算から $(V_k)$ は局所有限でもあります。
<!-- definition-example-end -->

<a id="def-geo4-paracompact"></a>
<!-- formal-statement-start -->
> **定義（パラコンパクト空間）**  
> 位相空間 $X$ が **パラコンパクト**であるとは、$X$ の任意の開被覆が局所有限な開細分を持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo4-paracompact -->
**定義の確認**

有限個の開集合からなる開被覆は、それ自身が局所有限です。従ってコンパクト空間で任意の開被覆から有限部分被覆を取り出せる場合、その有限部分被覆は元の被覆の局所有限な細分になります。よってコンパクト空間はパラコンパクトです。

本章で必要なのは、一般の滑らかな多様体がコンパクトでなくてもパラコンパクトになることです。その証明で第二可算性が働きます。
<!-- definition-example-end -->

---

## 3. 多様体はまず局所コンパクトである

局所有限細分を作るには、各点の周りを「閉包がコンパクトな小さい開集合」へ縮める必要があります。

<a id="prop-geo4-manifold-lch"></a>
<!-- formal-statement-start -->
> **命題（滑らかな多様体は局所コンパクト Hausdorff）**  
> 有限次元滑らかな多様体 $M$ は局所コンパクト Hausdorff 空間である。
<!-- formal-statement-end -->

### 証明の見取り図

Hausdorff 性は GEO1 の多様体の定義に入っています。局所コンパクト性は、一枚の座標近傍の中で小さい閉球を取って [Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)を使えば得られます。

<!-- proof-start -->
### 証明

$p\in M$ を任意に取ります。座標近傍

$$
x:U\to x(U)\subset\mathbb R^n
$$

で $p\in U$ を満たすものを取ります。$x(U)$ は開で $x(p)\in x(U)$ なので、ある $r>0$ が存在して

$$
\overline{B(x(p),r)}
\subset x(U)
$$

となります。

閉球 $\overline{B(x(p),r)}$ は [Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)によりコンパクトです。$x^{-1}$ は連続なので

$$
K:=x^{-1}\!\left(\overline{B(x(p),r)}\right)
$$

もコンパクトです。

一方

$$
x^{-1}(B(x(p),r))
$$

は $p$ を含む開集合で $K$ に含まれます。従って $K$ は $p$ のコンパクト近傍です。$p$ は任意だったので $M$ は局所コンパクトです。

Hausdorff 性は [GEO1 の位相多様体の定義](../GEO1/index.md#def-geo1-topological-manifold)に含まれています。従って $M$ は局所コンパクト Hausdorff 空間です。 $\square$
<!-- proof-end -->

この命題と [TOP5A の縮小定理](../TOP5A/index.md#thm-top5a-lch-shrinking)を組み合わせると、任意の $p\in U$ に対して

$$
p\in V\subseteq\overline V\subseteq U,
\qquad
\overline V\text{ はコンパクト}
$$

となる $V$ を取れます。

---

## 4. 第二可算性から閉包がコンパクトな可算開被覆へ

<a id="lem-geo4-second-countable-subcover"></a>
<!-- formal-statement-start -->
> **補題（第二可算空間の開被覆は可算部分被覆を持つ）**  
> 第二可算空間 $X$ の任意の開被覆 $(U_\alpha)_{\alpha\in A}$ には、有限または可算個の元からなる部分被覆が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

可算基底 $(B_m)$ のうち、どれか一つの $U_\alpha$ に完全に入るものだけを集めます。各基底要素につき一つの $U_\alpha$ を選べば、可算個しか残りません。

<!-- proof-start -->
### 証明

$X$ の可算基底を

$$
\mathcal B=\{B_1,B_2,\dots\}
$$

とします。

各 $m$ について、ある $\alpha\in A$ が存在して

$$
B_m\subseteq U_\alpha
$$

となる場合、そのような $\alpha$ を一つ選び $\alpha(m)$ と書きます。該当する $m$ 全体を $I\subseteq\mathbb N$ とします。

$$
\{U_{\alpha(m)}:m\in I\}
$$

が $X$ を覆うことを示します。$x\in X$ を任意に取ります。元の族は開被覆なので、ある $\alpha$ について $x\in U_\alpha$ です。$\mathcal B$ は基底だから

$$
x\in B_m\subseteq U_\alpha
$$

となる $B_m$ が存在します。この $m$ は $I$ に入り、

$$
x\in B_m\subseteq U_{\alpha(m)}
$$

です。

従って選んだ族は開被覆です。添字は $I\subseteq\mathbb N$ なので有限または可算です。 $\square$
<!-- proof-end -->

<a id="lem-geo4-compact-exhaustion"></a>
<!-- formal-statement-start -->
> **補題（滑らかな多様体のコンパクト exhaustion）**  
> 滑らかな多様体 $M$ にはコンパクト集合列
>
$$
K_1\subseteq K_2\subseteq\cdots
$$
>
> が存在し、
>
$$
K_r\subseteq\operatorname{Int}K_{r+1},
\qquad
M=\bigcup_{r=1}^\infty\operatorname{Int}K_r
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

各点の周りにコンパクト閉包を持つ開集合を取り、第二可算性で可算個に減らします。最初の有限個の閉包を合併してコンパクト集合 $L_m$ を作り、$L_m$ の列から「一つ前が次の内部に入る」部分列を抜きます。

<!-- proof-start -->
### 証明

[滑らかな多様体は局所コンパクト Hausdorff](#prop-geo4-manifold-lch)なので、各 $p\in M$ に対し開集合 $B_p$ を

$$
p\in B_p,
\qquad
\overline{B_p}\text{ はコンパクト}
$$

となるように取れます。

$(B_p)_{p\in M}$ は開被覆です。GEO1 の定義から $M$ は第二可算なので、直前の補題により可算部分被覆

$$
B_1,B_2,\dots
$$

を取れます。

$$
L_m:=\overline{B_1}\cup\cdots\cup\overline{B_m}
$$

と置きます。有限個のコンパクト集合の合併なので $L_m$ はコンパクトです。また $B_j$ は開で $B_j\subseteq L_j$ だから

$$
B_j\subseteq\operatorname{Int}L_j.
$$

従って

$$
M=\bigcup_{m=1}^\infty\operatorname{Int}L_m.
$$

しかも $(L_m)$ は増大列です。

ここから部分列を選びます。まず $m_1=1$ とします。$L_{m_1}$ はコンパクトで、開集合族 $(\operatorname{Int}L_m)_{m\ge1}$ は $M$ を覆います。有限部分被覆を取り、$(L_m)$ が増大列であることを使えば、十分大きい $m_2>m_1$ を選んで

$$
L_{m_1}\subseteq\operatorname{Int}L_{m_2}
$$

とできます。

同じ操作を帰納的に繰り返し、

$$
L_{m_r}\subseteq\operatorname{Int}L_{m_{r+1}}
$$

となる $m_1<m_2<\cdots$ を取ります。

$$
K_r:=L_{m_r}
$$

と置けば各 $K_r$ はコンパクトで、

$$
K_r\subseteq\operatorname{Int}K_{r+1}.
$$

また $(m_r)$ は無限増加列なので任意の $m$ に対してある $r$ で $m\le m_r$ となり、

$$
\operatorname{Int}L_m\subseteq\operatorname{Int}K_r.
$$

よって

$$
M=\bigcup_{r=1}^\infty\operatorname{Int}K_r.
$$

$\square$
<!-- proof-end -->

ここで第二可算性は「可算 exhaustion を作る」ために使われました。単に局所 Euclid であるだけでは、この証明の可算化部分は出ません。

---

## 5. 任意の開被覆を局所有限にする

<a id="thm-geo4-manifold-paracompact"></a>
<!-- formal-statement-start -->
> **定理（滑らかな多様体はパラコンパクト）**  
> 滑らかな多様体 $M$ の任意の開被覆は局所有限な開細分を持つ。従って $M$ はパラコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

[コンパクト exhaustion](#lem-geo4-compact-exhaustion) $(K_r)$ を使って

$$
A_r=K_r\setminus\operatorname{Int}K_{r-1}
$$

という「殻」を作ります。各殻はコンパクトなので、その殻だけなら有限個の小さい開集合で覆えます。

ただし有限個を殻ごとに並べただけでは局所有限とは限りません。そこで $r$ 番目の殻に使う開集合を

$$
\operatorname{Int}K_{r+1}\setminus K_{r-2}
$$

の中へ閉じ込めます。すると固定点の近くには遠くの殻の集合が来なくなります。

<!-- proof-start -->
### 証明

$M$ の開被覆を $(U_\alpha)_{\alpha\in A}$ とします。[コンパクト exhaustion](#lem-geo4-compact-exhaustion)を一つ固定し、便宜上

$$
K_{-1}=K_0=\varnothing
$$

と置きます。

各 $r\ge1$ に対して

$$
A_r:=K_r\setminus\operatorname{Int}K_{r-1}
$$

とします。$A_r$ はコンパクト集合 $K_r$ の閉部分集合なのでコンパクトです。

$x\in A_r$ を取ります。元の開被覆から $x\in U_{\alpha(x)}$ となる $\alpha(x)$ を選びます。また

$$
K_r\subseteq\operatorname{Int}K_{r+1}
$$

なので $x\in\operatorname{Int}K_{r+1}$ です。

さらに

$$
K_{r-2}\subseteq\operatorname{Int}K_{r-1}
$$

であり、$x\notin\operatorname{Int}K_{r-1}$ なので $x\notin K_{r-2}$ です。

従って

$$
O_x
:=
U_{\alpha(x)}
\cap
\operatorname{Int}K_{r+1}
\cap
(M\setminus K_{r-2})
$$

は $x$ を含む開集合です。

[TOP5A の局所コンパクト Hausdorff 空間の縮小](../TOP5A/index.md#thm-top5a-lch-shrinking)を二回使って、

$$
x\in V_x
\subseteq
\overline{V_x}
\subseteq
W_x
\subseteq
\overline{W_x}
\subseteq
O_x
$$

となる開集合 $V_x,W_x$ を取ります。

$(V_x)_{x\in A_r}$ はコンパクト集合 $A_r$ の開被覆なので、有限個

$$
x_{r,1},\dots,x_{r,N_r}
$$

を選んで

$$
A_r
\subseteq
\bigcup_{j=1}^{N_r}V_{r,j},
\qquad
V_{r,j}:=V_{x_{r,j}}
$$

とできます。対応する $W_{r,j}:=W_{x_{r,j}}$ も取っておきます。

まず $(V_{r,j})$ が $M$ を覆うことを示します。$p\in M$ を取ります。$p\in K_r$ となる最小の $r$ を取れば

$$
p\notin K_{r-1}
$$

なので特に $p\notin\operatorname{Int}K_{r-1}$ です。従って $p\in A_r$ であり、ある $j$ について $p\in V_{r,j}$ です。

次に局所有限性を示します。$p\in M$ を固定します。exhaustion の性質から、ある $s$ について

$$
p\in\operatorname{Int}K_s
$$

です。

$r\ge s+2$ なら

$$
K_s\subseteq K_{r-2}
$$

です。一方、構成から

$$
W_{r,j}\subseteq M\setminus K_{r-2}.
$$

従って

$$
\operatorname{Int}K_s\cap W_{r,j}=\varnothing
$$

です。つまり $p$ の近傍 $\operatorname{Int}K_s$ と交わり得るのは

$$
r\le s+1
$$

の殻に属する $W_{r,j}$ だけです。$r$ は有限個で、各 $r$ ごとの $j$ も有限個なので、$(W_{r,j})$ は局所有限です。$V_{r,j}\subseteq W_{r,j}$ だから $(V_{r,j})$ も局所有限です。

最後に各 $(r,j)$ について、構成時に選んだ $\alpha(r,j)$ に対し

$$
V_{r,j}
\subseteq
W_{r,j}
\subseteq
U_{\alpha(r,j)}
$$

です。従って $(V_{r,j})$ は元の開被覆の局所有限な開細分です。

よって $M$ はパラコンパクトです。 $\square$
<!-- proof-end -->

### 仮定がどこで働いたか

- **局所 Euclid 性**：多様体を局所コンパクトにする。
- **Hausdorff 性**：TOP5A の縮小定理を使えるようにする。
- **第二可算性**：閉包がコンパクトな可算開被覆を取り、コンパクト exhaustion を作る。
- **コンパクト性**：各殻を有限個の局所片へ減らす。

第二可算性を定義から外してしまうと、この可算 exhaustion の経路はそのままでは使えません。

---

## 6. 滑らかな局所化関数の材料を作る

連続な cutoff 関数は TOP5A で構成しました。ここでは多様体上で **滑らか**なものが必要です。Euclid 空間の標準的な平坦関数から作ります。

<a id="def-geo4-bump-function"></a>
<!-- formal-statement-start -->
> **定義（滑らかな隆起関数）**  
> 滑らかな多様体 $M$ 上の滑らかな関数 $\beta:M\to\mathbb R$ がコンパクトな台を持つとき、$\beta$ を **滑らかな隆起関数（bump function）**という。本章では主に $0\le\beta\le1$ のものを使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo4-bump-function -->
**定義の確認**

まず

$$
h(t)
=
\begin{cases}
e^{-1/t},&t>0,\\
0,&t\le0
\end{cases}
$$

と置き、

$$
\chi(t)
=
\frac{h(1-t)}{h(t)+h(1-t)}
$$

と定めます。すると

$$
\chi(t)=1\quad(t\le0),
\qquad
\chi(t)=0\quad(t\ge1),
\qquad
0\le\chi\le1.
$$

これを使って

$$
\beta(x)
=
\chi\!\left(\frac{x^2-1}{3}\right)
\qquad (x\in\mathbb R)
$$

とすると、$|x|\le1$ では $\beta(x)=1$、$|x|\ge2$ では $\beta(x)=0$ です。従って

$$
\operatorname{supp}\beta\subseteq[-2,2]
$$

で、$\beta$ は滑らかな隆起関数です。
<!-- definition-example-end -->

<a id="lem-geo4-euclidean-bump"></a>
<!-- formal-statement-start -->
> **補題（Euclid 空間の滑らかな局所化関数）**  
> $a\in\mathbb R^n$ と $0<r<R$ に対し、滑らかな関数 $\beta:\mathbb R^n\to[0,1]$ で
>
$$
\beta=1\text{ on }\overline{B(a,r)},
\qquad
\operatorname{supp}\beta\subseteq\overline{B(a,R)}
$$
>
> を満たすものが存在する。
<!-- formal-statement-end -->

### 証明の見取り図

上の $\chi$ に半径の二乗を入れます。二乗ノルムを使うことで原点付近でも絶対値の非滑らかさが入りません。

<!-- proof-start -->
### 証明

まず

$$
h(t)
=
\begin{cases}
e^{-1/t},&t>0,\\
0,&t\le0
\end{cases}
$$

が滑らかであることを確認します。$t>0$ では通常の滑らかな関数です。各 $k\ge0$ について $t>0$ での $k$ 階導関数は

$$
h^{(k)}(t)
=
P_k(1/t)e^{-1/t}
$$

という形になります。ただし $P_k$ は多項式です。$s=1/t\to\infty$ と置けば、任意の整数 $m\ge0$ に対して

$$
s^m e^{-s}\to0
$$

なので

$$
h^{(k)}(t)\to0
\qquad(t\downarrow0).
$$

従って $t\le0$ 側の全ての導関数 $0$ と滑らかにつながり、$h\in C^\infty(\mathbb R)$ です。

$$
\chi(t)
=
\frac{h(1-t)}{h(t)+h(1-t)}
$$

と置きます。$t$ と $1-t$ が同時に $0$ 以下になることはないため分母は常に正です。よって $\chi$ は滑らかです。また

$$
t\le0\Rightarrow \chi(t)=1,
\qquad
t\ge1\Rightarrow \chi(t)=0.
$$

そこで

$$
\beta(x)
=
\chi\!\left(
\frac{\|x-a\|^2-r^2}{R^2-r^2}
\right)
$$

と定めます。

$\|x-a\|\le r$ なら分数は $0$ 以下なので $\beta(x)=1$ です。$\|x-a\|\ge R$ なら分数は $1$ 以上なので $\beta(x)=0$ です。従って

$$
\operatorname{supp}\beta
\subseteq
\overline{B(a,R)}.
$$

また $0\le\chi\le1$ なので $0\le\beta\le1$ です。 $\square$
<!-- proof-end -->

<a id="thm-geo4-smooth-localization"></a>
<!-- formal-statement-start -->
> **定理（多様体上の滑らかな局所化関数）**  
> $M$ を滑らかな多様体、$K\subset M$ をコンパクト集合、$U\subset M$ を $K\subset U$ を満たす開集合とする。このとき滑らかな関数
>
$$
\beta:M\to[0,1]
$$
>
> で、$K$ のある開近傍上で $\beta=1$ となり、かつ
>
$$
\operatorname{supp}\beta\subseteq U
$$
>
> を満たすものが存在する。
<!-- formal-statement-end -->

### 証明の見取り図

各 $p\in K$ を $U$ に含まれる座標近傍で囲み、その座標内で二重の Euclid 球を取ります。Euclid 空間の隆起関数を座標で引き戻して $M$ の外側では $0$ とします。

最後に $K$ のコンパクト性で有限個だけ残し、

$$
1-\prod_i(1-\beta_i)
$$

と組み合わせれば、どれか一つが $1$ の場所では全体も $1$ になります。

<!-- proof-start -->
### 証明

$p\in K$ を固定します。$U$ は開なので、$p$ を含む座標近傍を $U$ の中へ制限して

$$
x_p:W_p\to x_p(W_p)\subset\mathbb R^n,
\qquad
p\in W_p\subseteq U
$$

とできます。

$x_p(W_p)$ は開なので、ある $0<r_p<R_p$ を

$$
\overline{B(x_p(p),R_p)}
\subseteq x_p(W_p)
$$

となるように取れます。

前の補題から $\eta_p:\mathbb R^n\to[0,1]$ で

$$
\eta_p=1
\text{ on }
\overline{B(x_p(p),r_p)},
\qquad
\operatorname{supp}\eta_p
\subseteq
\overline{B(x_p(p),R_p)}
$$

となるものがあります。

$M$ 上で

$$
\beta_p(q)
=
\begin{cases}
\eta_p(x_p(q)),&q\in W_p,\\
0,&q\notin W_p
\end{cases}
$$

と定めます。

$\operatorname{supp}\eta_p$ は $x_p(W_p)$ の内部にコンパクトに収まっています。従って $\beta_p$ は $W_p$ の境界へ近づく前に恒等的に $0$ となり、外側を $0$ とした延長は滑らかです。

さらに

$$
N_p
:=
x_p^{-1}(B(x_p(p),r_p))
$$

上では $\beta_p=1$ で、

$$
\operatorname{supp}\beta_p
\subseteq
x_p^{-1}\!\left(\overline{B(x_p(p),R_p)}\right)
\subseteq
W_p
\subseteq U.
$$

$(N_p)_{p\in K}$ は $K$ の開被覆です。$K$ のコンパクト性から有限個

$$
p_1,\dots,p_m
$$

を選んで

$$
K\subseteq N_{p_1}\cup\cdots\cup N_{p_m}
$$

とできます。

最後に

$$
\beta
=
1-\prod_{i=1}^m(1-\beta_{p_i})
$$

と置きます。有限積なので $\beta$ は滑らかで $0\le\beta\le1$ です。

$q\in N_{p_i}$ なら $\beta_{p_i}(q)=1$ なので

$$
\beta(q)=1.
$$

従って $\beta=1$ となる開集合 $N_{p_1}\cup\cdots\cup N_{p_m}$ は $K$ を含みます。

また全ての $\beta_{p_i}$ が $0$ なら $\beta=0$ なので

$$
\operatorname{supp}\beta
\subseteq
\bigcup_{i=1}^m\operatorname{supp}\beta_{p_i}
\subseteq U.
$$

右辺は有限個のコンパクト集合の合併なのでコンパクトです。従って $\beta$ 自身もコンパクト台を持ちます。 $\square$
<!-- proof-end -->

連続 cutoff の構成を単に再利用したのではなく、座標内の滑らかな関数を使ったことが重要です。後で微分形式や Riemann 計量を貼り合わせるには、連続性だけでは足りません。

---

## 7. 1 の分割

<a id="def-geo4-partition-of-unity"></a>
<!-- formal-statement-start -->
> **定義（滑らかな 1 の分割）**  
> 滑らかな多様体 $M$ 上の滑らかな関数族 $(\varphi_j)_{j\in J}$ が **滑らかな 1 の分割**であるとは、
>
> 1. $\varphi_j\ge0$ が全ての $j$ で成り立つ。
> 2. $(\operatorname{supp}\varphi_j)_{j\in J}$ が局所有限である。
> 3. 任意の $p\in M$ で
>
$$
\sum_{j\in J}\varphi_j(p)=1
$$
>
> となる。
>
> ことをいう。
<!-- formal-statement-end -->

<a id="def-geo4-subordinate-partition"></a>
<!-- formal-statement-start -->
> **定義（開被覆に従属する 1 の分割）**  
> $(U_\alpha)_{\alpha\in A}$ を $M$ の開被覆とする。1 の分割 $(\varphi_j)_{j\in J}$ がこの開被覆に **従属する**とは、各 $j\in J$ に対して $\alpha(j)\in A$ を選べて
>
$$
\operatorname{supp}\varphi_j
\subseteq
U_{\alpha(j)}
$$
>
> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo4-partition-of-unity, def-geo4-subordinate-partition -->
**定義の確認**

### 具体例

前節の平坦関数 $h$ を使って

$$
\sigma(x)
=
\frac{h(x+1)}{h(x+1)+h(1-x)}
$$

と置きます。すると $\sigma$ は滑らかで

$$
\sigma(x)=0\quad(x\le-1),
\qquad
\sigma(x)=1\quad(x\ge1),
\qquad
0\le\sigma\le1.
$$

$$
\varphi_1=1-\sigma,
\qquad
\varphi_2=\sigma
$$

とすれば

$$
\varphi_1+\varphi_2=1.
$$

二つしかないので局所有限です。また

$$
\operatorname{supp}\varphi_1
\subseteq(-\infty,1],
\qquad
\operatorname{supp}\varphi_2
\subseteq[-1,\infty).
$$

従って開被覆

$$
U_1=(-\infty,2),
\qquad
U_2=(-2,\infty)
$$

に従属する滑らかな 1 の分割です。
<!-- definition-example-end -->

<a id="thm-geo4-partition-of-unity"></a>
<!-- formal-statement-start -->
> **定理（開被覆に従属する滑らかな 1 の分割の存在）**  
> 滑らかな多様体 $M$ とその任意の開被覆 $(U_\alpha)_{\alpha\in A}$ に対し、この開被覆に従属する滑らかな 1 の分割が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

パラコンパクト性の証明では、単なる細分より少し強く

$$
\overline{V_j}\subseteq W_j\subseteq U_{\alpha(j)}
$$

となる局所有限な二重の開集合族を実際に構成しました。

各 $\overline{V_j}$ の周りで $1$、$W_j$ の外で $0$ となる滑らかな関数 $\psi_j$ を作ります。局所有限性により

$$
S=\sum_j\psi_j
$$

は滑らかです。しかも $(V_j)$ が $M$ を覆うので $S>0$ です。最後に

$$
\varphi_j=\frac{\psi_j}{S}
$$

と正規化します。

<!-- proof-start -->
### 証明

[滑らかな多様体はパラコンパクト](#thm-geo4-manifold-paracompact)の証明で、元の開被覆 $(U_\alpha)$ に対して局所有限な開集合族

$$
(V_j)_{j\in J},
\qquad
(W_j)_{j\in J}
$$

を

$$
\overline{V_j}
\subseteq
W_j
\subseteq
U_{\alpha(j)}
$$

となるように構成できました。さらに $(V_j)$ は $M$ を覆います。各 $\overline{V_j}$ はその構成でコンパクトです。

[多様体上の滑らかな局所化関数](#thm-geo4-smooth-localization)を

$$
K=\overline{V_j},
\qquad
U=W_j
$$

へ適用し、滑らかな関数 $\psi_j:M\to[0,1]$ で

$$
\psi_j=1
\text{ on }\overline{V_j}\text{ のある開近傍},
\qquad
\operatorname{supp}\psi_j\subseteq W_j
$$

となるものを取ります。

$(W_j)$ は局所有限なので $(\operatorname{supp}\psi_j)$ も局所有限です。従って

$$
S(p)
:=
\sum_{j\in J}\psi_j(p)
$$

は各点の近くで有限和になり、$S$ は滑らかです。

任意の $p\in M$ に対して $(V_j)$ が被覆なので、ある $j$ で $p\in V_j$ です。このとき

$$
\psi_j(p)=1,
$$

従って

$$
S(p)\ge1.
$$

よって $S$ はどこでも正で、$1/S$ も滑らかです。

$$
\varphi_j
:=
\frac{\psi_j}{S}
$$

と定めます。すると $\varphi_j\ge0$ で、

$$
\sum_j\varphi_j
=
\frac{\sum_j\psi_j}{S}
=1.
$$

また

$$
\operatorname{supp}\varphi_j
\subseteq
\operatorname{supp}\psi_j
\subseteq
W_j
\subseteq
U_{\alpha(j)}.
$$

台の族も局所有限です。従って $(\varphi_j)$ は元の開被覆に従属する滑らかな 1 の分割です。 $\square$
<!-- proof-end -->

### なぜ局所有限性が必要なのか

この証明で

$$
S=\sum_j\psi_j
$$

を「滑らかな関数」と言えたのは、各点の近傍で有限和になったからです。単に各点で有限個の項だけが非零であるという点ごとの条件だけでは、同じ有限集合が近傍全体で使えるとは限らず、微分可能性の確認が壊れます。

---

## 8. 局所データを大域的に混ぜる

1 の分割は、局所関数を重み付き平均へ変える装置です。

<a id="prop-geo4-local-data-gluing"></a>
<!-- formal-statement-start -->
> **命題（1 の分割による局所関数の貼り合わせ）**  
> $(U_\alpha)_{\alpha\in A}$ を滑らかな多様体 $M$ の開被覆とし、各 $\alpha$ について
>
$$
f_\alpha\in C^\infty(U_\alpha)
$$
>
> が与えられているとする。$(\varphi_j)_{j\in J}$ をこの被覆に従属する 1 の分割とし、$\operatorname{supp}\varphi_j\subseteq U_{\alpha(j)}$ とする。
>
> 各 $j$ について $\varphi_j f_{\alpha(j)}$ を $U_{\alpha(j)}$ の外で $0$ として延長した関数を $\widetilde g_j$ と書く。このとき
>
$$
F=\sum_{j\in J}\widetilde g_j
$$
>
> は $M$ 上の滑らかな関数である。
>
> さらに局所関数が重なりで一致し、
>
$$
f_\alpha=f_\beta
\quad\text{on }U_\alpha\cap U_\beta
$$
>
> を満たすなら、$F|_{U_\alpha}=f_\alpha$ が全ての $\alpha$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\operatorname{supp}\varphi_j$ が $U_{\alpha(j)}$ の内側に入るため、積 $\varphi_j f_{\alpha(j)}$ は境界の手前で $0$ になります。従って外側を $0$ としても滑らかです。

局所有限性が和を有限和にし、互換性がある場合は

$$
\sum_j\varphi_j=1
$$

が元の局所関数をそのまま復元します。

<!-- proof-start -->
### 証明

固定した $j$ を考えます。

$$
\operatorname{supp}\varphi_j
\subseteq
U_{\alpha(j)}
$$

なので、$M\setminus U_{\alpha(j)}$ の各点は $\operatorname{supp}\varphi_j$ の外にあります。台は閉集合ですから、その点のある近傍上で $\varphi_j=0$ です。

従って $U_{\alpha(j)}$ 上の

$$
g_j=\varphi_j f_{\alpha(j)}
$$

を外側で $0$ と延長した $\widetilde g_j$ は、境界をまたぐ近傍でも恒等的に $0$ となり滑らかです。

$(\operatorname{supp}\varphi_j)$ は局所有限なので、任意の $p\in M$ のある近傍では有限個の $\widetilde g_j$ だけが非零です。よって

$$
F=\sum_j\widetilde g_j
$$

は局所的に有限個の滑らかな関数の和であり、滑らかです。

次に局所関数が重なりで一致すると仮定します。$p\in U_\alpha$ を固定します。$\varphi_j(p)\neq0$ なら

$$
p\in\operatorname{supp}\varphi_j
\subseteq
U_{\alpha(j)}.
$$

従って $p\in U_\alpha\cap U_{\alpha(j)}$ であり、

$$
f_{\alpha(j)}(p)=f_\alpha(p).
$$

よって

$$
\begin{aligned}
F(p)
&=
\sum_j\varphi_j(p)f_{\alpha(j)}(p)\\
&=
f_\alpha(p)\sum_j\varphi_j(p)\\
&=
f_\alpha(p).
\end{aligned}
$$

従って $F|_{U_\alpha}=f_\alpha$ です。 $\square$
<!-- proof-end -->

### Riemann 計量への橋

GEO12 では各座標近傍上に Euclid 内積から局所的な計量を作り、それらを 1 の分割で

$$
g=\sum_j\varphi_j g_j
$$

と混ぜます。各 $g_j$ が正定値で、係数が非負、総和が $1$ なので正定値性が保たれます。

つまり 1 の分割は単なる「便利な関数族」ではなく、**局所的に容易な構成を大域的な幾何構造へ変える標準装置**です。

---

## 9. コンパクト多様体を Euclid 空間へ埋め込む

GEO3 では埋め込みを定義しましたが、抽象的に定義した多様体が本当に Euclid 空間の部分多様体として実現できるかはまだ示していません。

ここでは 1 の分割と同じ局所化関数を使って、**コンパクト多様体について有限次元 Euclid 空間への滑らかな埋め込みを完全に構成**します。

<a id="thm-geo4-compact-euclidean-embedding"></a>
<!-- formal-statement-start -->
> **定理（コンパクト滑らかな多様体の Euclid 埋め込み）**  
> $M$ をコンパクトな $n$ 次元滑らかな多様体とする。このとき、ある有限の $N$ と滑らかな埋め込み
>
$$
F:M\hookrightarrow\mathbb R^N
$$
>
> が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の座標近傍 $(U_i,x_i)$ と、それより少し小さい開集合 $V_i$ を

$$
\overline{V_i}\subseteq U_i
$$

かつ $(V_i)$ が $M$ を覆うように取ります。

$\overline{V_i}$ の近くで $1$、$U_i$ の外で $0$ となる滑らかな関数 $\rho_i$ を作り、

$$
F_i(p)
=
\bigl(\rho_i(p),\rho_i(p)x_i(p)\bigr)
$$

を $U_i$ の外で $0$ と延長します。

- $\rho_i=1$ となる座標片が各点にあるので、微分はその座標片で単射。
- 二点 $p\neq q$ に対し、$p$ を含む $V_i$ を選べば、$\rho_i$ と座標 $x_i$ が二点を区別する。
- 最後にコンパクト性から、単射連続写像が像への同相写像になる。

という三段階で埋め込みを示します。

<!-- proof-start -->
### 証明

各 $p\in M$ について座標近傍

$$
x_p:U_p\to x_p(U_p)\subset\mathbb R^n
$$

を取ります。

[TOP5A の縮小定理](../TOP5A/index.md#thm-top5a-lch-shrinking)により、開集合 $V_p$ を

$$
p\in V_p
\subseteq
\overline{V_p}
\subseteq
U_p,
\qquad
\overline{V_p}\text{ はコンパクト}
$$

となるように取れます。

$(V_p)_{p\in M}$ はコンパクト空間 $M$ の開被覆なので、有限個

$$
V_1,\dots,V_m
$$

で $M$ を覆えます。対応する座標近傍を $(U_i,x_i)$ と書きます。

[多様体上の滑らかな局所化関数](#thm-geo4-smooth-localization)を

$$
K=\overline{V_i},
\qquad
U=U_i
$$

へ適用し、滑らかな関数 $\rho_i:M\to[0,1]$ で

$$
\rho_i=1
\text{ on }\overline{V_i}\text{ のある開近傍},
\qquad
\operatorname{supp}\rho_i\subseteq U_i
$$

となるものを取ります。

写像

$$
F_i:M\to\mathbb R^{n+1}
$$

を

$$
F_i(p)
=
\begin{cases}
\bigl(\rho_i(p),\rho_i(p)x_i(p)\bigr),
& p\in U_i,\\
(0,0),
& p\notin U_i
\end{cases}
$$

で定めます。

$\operatorname{supp}\rho_i\subseteq U_i$ なので、前節の貼り合わせと同じ理由で $F_i$ は滑らかです。

全成分をまとめて

$$
F
=
(F_1,\dots,F_m)
:
M\to\mathbb R^{m(n+1)}
$$

とします。これは滑らかです。

#### 1. $F$ ははめ込み

$p\in M$ を取ります。$(V_i)$ が被覆なので、ある $i$ について $p\in V_i$ です。$\rho_i$ は $\overline{V_i}$ のある近傍で $1$ なので、$p$ の十分小さい近傍では

$$
F_i(q)=(1,x_i(q)).
$$

従って

$$
d(F_i)_p(v)
=
(0,d(x_i)_p(v)).
$$

$x_i$ は座標写像なので $d(x_i)_p$ は線形同型です。従って

$$
d(F_i)_p(v)=0
\Rightarrow
v=0.
$$

$F_i$ は $F$ の成分なので

$$
dF_p(v)=0
\Rightarrow
d(F_i)_p(v)=0
\Rightarrow
v=0.
$$

よって $dF_p$ は単射です。$p$ は任意だったので $F$ ははめ込みです。

#### 2. $F$ は単射

$p,q\in M$ で $p\neq q$ とします。ある $i$ を $p\in V_i$ となるように選びます。このとき

$$
\rho_i(p)=1.
$$

もし $\rho_i(q)\neq1$ なら、$F_i$ の第一成分だけで

$$
F_i(p)\neq F_i(q)
$$

です。

もし $\rho_i(q)=1$ なら $q\in\operatorname{supp}\rho_i\subseteq U_i$ です。従って $x_i(q)$ が定義され、

$$
F_i(p)=(1,x_i(p)),
\qquad
F_i(q)=(1,x_i(q)).
$$

座標写像 $x_i$ は単射で $p\neq q$ なので

$$
x_i(p)\neq x_i(q).
$$

従ってやはり $F_i(p)\neq F_i(q)$ です。

よって $F$ は単射です。

#### 3. 像への同相写像

$M$ はコンパクトで、$F(M)$ は Euclid 空間の部分空間なので Hausdorff です。

$$
F:M\to F(M)
$$

は連続全単射なので、[コンパクト空間から Hausdorff 空間への連続全単射](../TOP2/index.md#thm-top2-compact-hausdorff-bijection)から同相写像です。

従って $F$ は「はめ込み」かつ「像への同相写像」であり、[GEO3 の埋め込みの定義](../GEO3/index.md#def-geo3-embedding)により滑らかな埋め込みです。 $\square$
<!-- proof-end -->

### Whitney の埋め込み定理との位置関係

上の定理は **コンパクト多様体**について、有限個の座標と局所化関数だけで証明できる版です。

一般の Whitney の埋め込み定理は、コンパクトとは限らない滑らかな多様体についても有限次元 Euclid 空間への埋め込みを与え、さらに次元を鋭く制御する強い結果です。しかし、その標準的な証明では一般位置・Sard 型の議論や横断性に近い道具が必要になります。

本章ではその強い版を後続理論の仮定として使いません。本系列で証明責務を閉じる canonical result は、上で完全証明した **コンパクト滑らかな多様体の Euclid 埋め込み**です。Whitney の一般定理は、必要な一般位置の道具を導入した後に扱うべき拡張として位置付けます。

---

## 10. 演習

### Level A

<a id="ex-geo4-a01"></a>
#### GEO4-A01 局所有限族と非局所有限族
- Level: A
- 狙い: 局所有限性を点の近傍から直接判定する

$\mathbb R$ 上の族

$$
A_k=(k-1,k+1)
\quad(k\in\mathbb Z),
$$

$$
B_n=(-n,n)
\quad(n\in\mathbb N)
$$

を考える。

1. $(A_k)$ が局所有限であることを示せ。
2. $(B_n)$ が局所有限でないことを示せ。
3. 「各点が有限個の集合に属する」という条件と局所有限性の違いを言葉で説明せよ。

<!-- solution-start -->
**詳細解答**

1. $x\in\mathbb R$ を固定し

$$
N_x=(x-1/4,x+1/4)
$$

とします。$N_x\cap A_k\neq\varnothing$ なら、ある $y\in N_x\cap A_k$ があり

$$
|y-x|<\frac14,
\qquad
|y-k|<1.
$$

三角不等式から

$$
|k-x|
\le
|k-y|+|y-x|
<
1+\frac14
=
\frac54.
$$

従って該当する整数 $k$ は

$$
x-\frac54<k<x+\frac54
$$

に入るものだけで、有限個です。よって $(A_k)$ は局所有限です。

2. $0$ の任意の開近傍 $N$ を取ります。$0\in N$ であり、全ての $n\ge1$ について $0\in B_n$ なので

$$
N\cap B_n\neq\varnothing
$$

が全ての $n$ で成り立ちます。従って $0$ の周りで交わる族を有限個へ減らせず、$(B_n)$ は局所有限ではありません。

3. 局所有限性は一点 $x$ だけでなく、**$x$ のある近傍全体**に同じ有限個の添字で制御できることを要求します。この近傍一様性があるため、局所有限和は近傍上の有限和になり、微分などの局所操作を安全に行えます。
<!-- solution-end -->

<a id="ex-geo4-a02"></a>
#### GEO4-A02 開被覆の細分
- Level: A
- 狙い: 細分と局所有限性を別々に確認する

$\mathbb R$ 上で

$$
U_k=(k-2,k+2),
\qquad
V_k=(k-1,k+1),
\qquad
k\in\mathbb Z
$$

とする。

1. $(U_k)$ と $(V_k)$ がともに $\mathbb R$ の開被覆であることを示せ。
2. $(V_k)$ が $(U_k)$ の細分であることを示せ。
3. $(V_k)$ が局所有限であることを示せ。

<!-- solution-start -->
**詳細解答**

1. 任意の $x\in\mathbb R$ に対し、$x$ に最も近い整数の一つを $k$ と取れば

$$
|x-k|\le\frac12<1.
$$

従って $x\in V_k$ です。よって $(V_k)$ は $\mathbb R$ を覆います。$V_k\subset U_k$ なので $(U_k)$ も覆います。

2. 各 $k$ について

$$
(k-1,k+1)\subset(k-2,k+2)
$$

なので

$$
V_k\subset U_k.
$$

従って細分です。

3. $x$ の近傍 $N_x=(x-1/4,x+1/4)$ を取ります。$N_x\cap V_k\neq\varnothing$ なら A01 と同じ計算で

$$
|k-x|<\frac54.
$$

該当する整数は有限個なので $(V_k)$ は局所有限です。
<!-- solution-end -->

<a id="ex-geo4-a03"></a>
#### GEO4-A03 実直線上の滑らかな局所化関数
- Level: A
- 狙い: 平坦関数から具体的な隆起関数を作る

本文の

$$
\chi(t)
=
\frac{h(1-t)}{h(t)+h(1-t)}
$$

を用いて

$$
\beta(x)
=
\chi\!\left(\frac{x^2-1}{3}\right)
$$

とする。

1. $|x|\le1$ で $\beta(x)=1$ を示せ。
2. $|x|\ge2$ で $\beta(x)=0$ を示せ。
3. $\operatorname{supp}\beta\subseteq[-2,2]$ を示せ。

<!-- solution-start -->
**詳細解答**

1. $|x|\le1$ なら

$$
x^2-1\le0,
$$

従って

$$
\frac{x^2-1}{3}\le0.
$$

$\chi(t)=1$ は $t\le0$ で成り立つので $\beta(x)=1$ です。

2. $|x|\ge2$ なら $x^2\ge4$ なので

$$
\frac{x^2-1}{3}
\ge
\frac{4-1}{3}
=1.
$$

$\chi(t)=0$ は $t\ge1$ で成り立つので $\beta(x)=0$ です。

3. 2より $\mathbb R\setminus[-2,2]$ では $\beta=0$ です。従って

$$
\{x:\beta(x)\neq0\}
\subseteq
(-2,2)
$$

であり、閉包を取って

$$
\operatorname{supp}\beta
=
\overline{\{x:\beta(x)\neq0\}}
\subseteq
[-2,2].
$$

よって $\beta$ はコンパクト台を持つ滑らかな隆起関数です。
<!-- solution-end -->

<a id="ex-geo4-a04"></a>
#### GEO4-A04 二関数の正規化
- Level: A
- 狙い: 1 の分割の正規化操作を有限の場合に確認する

$M$ 上の滑らかな非負関数 $\psi_1,\psi_2$ が

$$
\psi_1(p)+\psi_2(p)>0
$$

を全ての $p\in M$ で満たすとする。

$$
\varphi_i
=
\frac{\psi_i}{\psi_1+\psi_2}
\qquad(i=1,2)
$$

と置く。

1. $\varphi_1,\varphi_2$ が滑らかで非負であることを示せ。
2. $\varphi_1+\varphi_2=1$ を示せ。
3. $\operatorname{supp}\varphi_i\subseteq\operatorname{supp}\psi_i$ を示せ。

<!-- solution-start -->
**詳細解答**

1. 分母

$$
S=\psi_1+\psi_2
$$

は滑らかで仮定より全点で正です。従って $1/S$ は滑らかです。よって

$$
\varphi_i=\psi_i\frac1S
$$

は滑らかです。また $\psi_i\ge0$ と $S>0$ から $\varphi_i\ge0$ です。

2.

$$
\varphi_1+\varphi_2
=
\frac{\psi_1+\psi_2}{S}
=
1.
$$

3. $\psi_i(p)=0$ なら $\varphi_i(p)=0$ です。従って

$$
\{\varphi_i\neq0\}
\subseteq
\{\psi_i\neq0\}.
$$

閉包を取れば

$$
\operatorname{supp}\varphi_i
\subseteq
\operatorname{supp}\psi_i.
$$
<!-- solution-end -->

### Level B

<a id="ex-geo4-b01"></a>
#### GEO4-B01 第二可算性からコンパクト exhaustion へ
- Level: B
- 狙い: パラコンパクト性証明の可算化部分を再構成する

$M$ を第二可算な局所コンパクト Hausdorff 空間とし、各点がコンパクト閉包を持つ開近傍を持つとする。

1. そのような開近傍から可算部分被覆 $(B_j)$ を取れることを示せ。
2.
   $$
   L_m=\bigcup_{j=1}^m\overline{B_j}
   $$
   がコンパクトで、$M=\bigcup_m\operatorname{Int}L_m$ となることを示せ。
3. 部分列 $K_r=L_{m_r}$ を選んで
   $$
   K_r\subseteq\operatorname{Int}K_{r+1}
   $$
   とできることを示せ。

<!-- solution-start -->
**詳細解答**

1. 各点 $p$ にコンパクト閉包を持つ開近傍 $B_p$ を一つ取ります。$(B_p)_{p\in M}$ は開被覆です。第二可算空間の開被覆は [本文の補題](#lem-geo4-second-countable-subcover)により可算部分被覆を持つので

$$
B_1,B_2,\dots
$$

を取れます。

2. 各 $\overline{B_j}$ はコンパクトで、$L_m$ はその有限合併です。従って $L_m$ はコンパクトです。

また

$$
B_j\subseteq L_j
$$

で $B_j$ は開なので

$$
B_j\subseteq\operatorname{Int}L_j.
$$

$(B_j)$ は $M$ を覆うから

$$
M
=
\bigcup_jB_j
\subseteq
\bigcup_j\operatorname{Int}L_j
\subseteq
M.
$$

従って等号です。

3. $L_{m_r}$ を既に選んだとします。$L_{m_r}$ はコンパクトで

$$
L_{m_r}
\subseteq
\bigcup_{m=1}^\infty\operatorname{Int}L_m.
$$

有限部分被覆を取れます。$(L_m)$ は増大列なので、その有限個の添字の最大値よりさらに大きい $m_{r+1}$ を取れば

$$
L_{m_r}
\subseteq
\operatorname{Int}L_{m_{r+1}}.
$$

帰納的に選べばよいです。
<!-- solution-end -->

<a id="ex-geo4-b02"></a>
#### GEO4-B02 局所有限族から 1 の分割を正規化する
- Level: B
- 狙い: 1 の分割存在定理の最後の正規化を自力で証明する

滑らかな非負関数族 $(\psi_j)_{j\in J}$ が次を満たすとする。

- $(\operatorname{supp}\psi_j)$ は局所有限。
- 任意の $p\in M$ に対して、ある $j$ が存在して $\psi_j(p)>0$。

$$
S=\sum_j\psi_j,
\qquad
\varphi_j=\frac{\psi_j}{S}
$$

と置く。

1. $S$ が well-defined で滑らかなことを示せ。
2. $S>0$ を示せ。
3. $(\varphi_j)$ が滑らかな 1 の分割であることを示せ。

<!-- solution-start -->
**詳細解答**

1. 任意の $p\in M$ に対し、局所有限性からある近傍 $N$ が存在して、$N$ と交わる $\operatorname{supp}\psi_j$ は有限個です。従って $N$ 上では

$$
S=\psi_{j_1}+\cdots+\psi_{j_m}
$$

という有限和です。よって $S$ は $N$ 上で滑らかです。$p$ は任意なので $S$ は $M$ 全体で滑らかです。

2. 任意の $p$ にある $j$ が存在して $\psi_j(p)>0$ です。他の項は全て非負なので

$$
S(p)
=
\sum_j\psi_j(p)
\ge
\psi_j(p)
>0.
$$

3. $S>0$ なので $1/S$ は滑らかです。従って各

$$
\varphi_j=\psi_j/S
$$

は滑らかで非負です。

また

$$
\sum_j\varphi_j
=
\frac{\sum_j\psi_j}{S}
=1.
$$

さらに $\operatorname{supp}\varphi_j\subseteq\operatorname{supp}\psi_j$ なので台の族も局所有限です。従って $(\varphi_j)$ は滑らかな 1 の分割です。
<!-- solution-end -->

<a id="ex-geo4-b03"></a>
#### GEO4-B03 局所関数の貼り合わせ
- Level: B
- 狙い: 従属する 1 の分割で局所データが大域関数になる機構を確認する

$(U_\alpha)$ を $M$ の開被覆、$f_\alpha\in C^\infty(U_\alpha)$ とする。$(\varphi_j)$ は従属する 1 の分割で

$$
\operatorname{supp}\varphi_j\subseteq U_{\alpha(j)}
$$

とする。

1. $\varphi_j f_{\alpha(j)}$ を $U_{\alpha(j)}$ の外で $0$ と延長した関数が滑らかな理由を説明せよ。
2. その和
   $$
   F=\sum_j\varphi_jf_{\alpha(j)}
   $$
   が局所的に有限和となることを示せ。
3. $f_\alpha=f_\beta$ が重なりで成立するとき、$F|_{U_\alpha}=f_\alpha$ を示せ。

<!-- solution-start -->
**詳細解答**

1. 台の包含

$$
\operatorname{supp}\varphi_j
\subseteq
U_{\alpha(j)}
$$

が重要です。$q\notin U_{\alpha(j)}$ なら $q\notin\operatorname{supp}\varphi_j$ であり、台は閉なので $q$ のある近傍で $\varphi_j=0$ です。従って境界をまたいで外側を $0$ としても、その近傍では両側とも $0$ になり滑らかです。

2. 台の族 $(\operatorname{supp}\varphi_j)$ は局所有限です。従って任意の $p$ のある近傍では有限個の $\varphi_j$ しか非零になりません。その近傍で $F$ は有限個の滑らかな関数の和です。

3. $p\in U_\alpha$ を固定します。$\varphi_j(p)\neq0$ なら

$$
p\in U_{\alpha(j)}.
$$

従って重なりでの一致から

$$
f_{\alpha(j)}(p)=f_\alpha(p).
$$

よって

$$
F(p)
=
\sum_j\varphi_j(p)f_{\alpha(j)}(p)
=
f_\alpha(p)\sum_j\varphi_j(p)
=
f_\alpha(p).
$$

従って $F|_{U_\alpha}=f_\alpha$ です。
<!-- solution-end -->

### Level C

<a id="ex-geo4-c01"></a>
#### GEO4-C01 コンパクト多様体の Euclid 埋め込みを再構成する
- Level: C
- 狙い: 局所化関数・座標・はめ込み・位相的埋め込みを一つの構成で統合する

$M$ をコンパクトな $n$ 次元滑らかな多様体とする。有限個の座標近傍 $(U_i,x_i)$ と開集合 $V_i$ が

$$
M=\bigcup_{i=1}^mV_i,
\qquad
\overline{V_i}\subseteq U_i
$$

を満たすとする。また $\rho_i:M\to[0,1]$ は

$$
\rho_i=1
\text{ on }\overline{V_i}\text{ のある近傍},
\qquad
\operatorname{supp}\rho_i\subseteq U_i
$$

を満たす滑らかな関数とする。

$$
F_i(p)
=
\begin{cases}
(\rho_i(p),\rho_i(p)x_i(p)),&p\in U_i,\\
(0,0),&p\notin U_i
\end{cases}
$$

および

$$
F=(F_1,\dots,F_m)
$$

を考える。

1. 各 $F_i$ が滑らかなことを示せ。
2. $F$ がはめ込みであることを示せ。
3. $F$ が単射であることを示せ。
4. $F:M\to F(M)$ が同相写像であることを示し、$F$ が埋め込みであると結論せよ。

<!-- solution-start -->
**詳細解答**

1. $U_i$ の中では $(\rho_i,\rho_i x_i)$ は滑らかです。

一方

$$
\operatorname{supp}\rho_i\subseteq U_i
$$

なので、$q\notin U_i$ は台の外にあります。従って $q$ のある近傍で $\rho_i=0$ です。その近傍では $F_i$ も恒等的に $(0,0)$ です。よって $U_i$ の外で $0$ とした延長は滑らかです。

2. $p\in M$ を取ります。$(V_i)$ が $M$ を覆うので、ある $i$ で $p\in V_i$ です。$p$ のある近傍で $\rho_i=1$ なので、その近傍では

$$
F_i=(1,x_i).
$$

従って

$$
d(F_i)_p(v)=(0,d(x_i)_p(v)).
$$

座標写像の微分 $d(x_i)_p$ は線形同型です。よって

$$
dF_p(v)=0
\Rightarrow
d(F_i)_p(v)=0
\Rightarrow
v=0.
$$

従って $dF_p$ は単射です。$p$ は任意なので $F$ ははめ込みです。

3. $p\neq q$ とします。$p\in V_i$ となる $i$ を選ぶと $\rho_i(p)=1$ です。

$\rho_i(q)\neq1$ なら第一成分で $F_i(p)\neq F_i(q)$ です。

$\rho_i(q)=1$ なら $q\in U_i$ で

$$
F_i(p)=(1,x_i(p)),
\qquad
F_i(q)=(1,x_i(q)).
$$

$x_i$ は単射で $p\neq q$ なので $x_i(p)\neq x_i(q)$ です。従って $F_i(p)\neq F_i(q)$ です。

よって $F$ は単射です。

4. $F$ は滑らかなので連続です。$M$ はコンパクトで、$F(M)$ は Euclid 空間の部分空間だから Hausdorff です。

従って [コンパクト空間から Hausdorff 空間への連続全単射](../TOP2/index.md#thm-top2-compact-hausdorff-bijection)により

$$
F:M\to F(M)
$$

は同相写像です。

2で $F$ ははめ込み、3と4で像への同相写像なので、GEO3 の定義から $F$ は埋め込みです。
<!-- solution-end -->

---

## 11. まとめ

本章では、GEO1 の多様体の定義に含まれていた Hausdorff 性と第二可算性を、大域構成のために使いました。

流れは

$$
\begin{aligned}
&\text{局所 Euclid}
+\text{Hausdorff}
&&\Longrightarrow
\text{局所コンパクト Hausdorff},\\
&\text{第二可算}
+\text{局所コンパクト}
&&\Longrightarrow
\text{コンパクト exhaustion},\\
&\text{exhaustion}
+\text{各殻の有限化}
&&\Longrightarrow
\text{パラコンパクト},\\
&\text{パラコンパクト}
+\text{滑らかな隆起関数}
&&\Longrightarrow
\text{従属する 1 の分割}.
\end{aligned}
$$

1 の分割があれば、局所的な滑らかな対象を局所有限和として大域化できます。

さらにコンパクト多様体については、有限個の座標と局所化関数から

$$
M\hookrightarrow\mathbb R^N
$$

という滑らかな埋め込みを明示的に構成しました。一般の Whitney の埋め込み定理を黒箱として使わず、本章の前提だけで閉じる版を canonical result としています。

次の GEO5 では、各点へ接ベクトルを滑らかに割り当てる構造から、積分曲線・局所流・Lie 括弧へ進みます。
