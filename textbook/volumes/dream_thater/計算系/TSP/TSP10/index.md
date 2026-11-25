# TSP10 前順序付き可換半環と自然数の埋込み

これまで、テンソルを別々の座標に並べる直和、同じ位置の座標を組にするKronecker積、局所線形写像による制限を学びました。[漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank)はこれらの操作を繰り返したときの費用と取り出し能力を表します。

しかし、費用を評価するたびにテンソルの成分をすべて調べるのは大変です。今回は足し算・掛け算・比較の規則だけを取り出し、何がテンソル以外にも通用するかを明らかにします。例えば対角成分2個と3個を並べれば5個、組にして掛ければ6個です。この計算を抽象的な自然数の演算として扱えるようにします。

以下、自然数には0を含め、$\mathbb N_0=\{0,1,2,\ldots\}$ と書きます。

## 1. 足し算と掛け算だけを残す

集合に二つの演算を置きます。足し算の結果も掛け算の結果も同じ集合に属し、順番や括弧を変えても答えが変わらないこと、掛け算を足し算に分配できることを要求します。足し算を取り消す負の元は要求しません。資源を並べる操作では、一般には資源を引き算できないためです。

<a id="def-tsp10-commutative-semiring"></a>

<!-- formal-statement-start -->
> **定義（可換半環）**
>
> 集合 $S$ に二項演算 $+,\cdot:S\times S\to S$ と元 $0,1\in S$ があり、任意の $a,b,c\in S$ について次の条件を満たすとき、可換半環という。
>
> 加法の結合律・交換律・単位元：

$$
(a+b)+c=a+(b+c),\quad a+b=b+a,\quad a+0=a.
$$

> 乗法の結合律・交換律・単位元：

$$
(ab)c=a(bc),\quad ab=ba,\quad a1=a.
$$

> 分配律と零の吸収性：

$$
a(b+c)=ab+ac,\qquad a0=0.
$$

> 積 $a\cdot b$ は $ab$ とも書く。ここでは $0=1$ の場合も定義上許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp10-commutative-semiring -->
**定義の確認**。$\mathbb N_0^2$ に成分ごとの和と積を入れます。零は $(0,0)$、一は $(1,1)$ です。第1成分、第2成分のそれぞれで自然数の結合律・交換律が成立し、0を加えても、1を掛けても成分は変わりません。分配律は成分 $i=1,2$ ごとに $a_i(b_i+c_i)=a_ib_i+a_ic_i$ です。零との積の各成分は $a_i0=0$ です。例えば

$$
(2,3)((1,4)+(3,2))=(8,18)
$$

であり、右辺を分配しても $(2,12)+(6,6)=(8,18)$ になります。すべての演算結果は非負整数の組です。
<!-- definition-example-end -->

零の吸収性を条件に含めるのは、加法の逆元を仮定していないためです。環のように両辺から同じ元を引くことは一般には許されません。

## 2. 比較も演算と両立させる

[制限の前順序性](../TSP5/index.md#thm-tsp5-restriction-preorder)では、反射律（自身と比較できる）と推移律（比較をつなげられる）を確認しました。今度は同じ関係を任意の可換半環に考えます。$a\preceq b$ は $b$ から $a$ を得られる、あるいは $a$ の資源要求が $b$ 以下である、という向きで使います。

比較可能な二つの資源に同じ材料を追加したり掛けたりしても、比較が保たれることを要求します。

<a id="def-tsp10-preordered-semiring"></a>

<!-- formal-statement-start -->
> **定義（前順序付き可換半環）**
>
> 可換半環 $S$ 上の二項関係 $\preceq$ が反射律と推移律を満たし、任意の $a,b,c\in S$ について

$$
a\preceq b\ \Longrightarrow\
a+c\preceq b+c,\quad ac\preceq bc
$$

> が成立するとき、$(S,\preceq)$ を前順序付き可換半環という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp10-preordered-semiring -->
**定義の確認**。先ほどの $\mathbb N_0^2$ に成分ごとの大小関係を入れます。$(a_1,a_2)\preceq(b_1,b_2)$ は各 $i$ で $a_i\le b_i$ であることです。各成分の大小の反射律・推移律から、組でも反射律・推移律が成立します。$a_i\le b_i$ と $c_i\ge0$ から $a_i+c_i\le b_i+c_i$ と $a_ic_i\le b_ic_i$ が得られるので演算とも両立します。例えば $(1,4)\preceq(2,5)$ に $(3,2)$ を掛けると $(3,8)\preceq(6,10)$ です。
<!-- definition-example-end -->

二つの比較を同時に使う場合は、$a\preceq b,\ c\preceq e$ に対して

$$
a+c\preceq b+c\preceq b+e,\qquad
ac\preceq bc\preceq be
$$

となります。第2の不等式では交換律で共通の $b$ を右に移してから演算との両立性を適用しています。

逆に、整数全体 $\mathbb Z$ に通常の大小を入れると、$1\le2$ なのに $1(-1)=-1>-2=2(-1)$ です。可換半環であり前順序でもあるだけでは足りません。掛け算の両立性が壊れるので、この順序で資源の比較を伝播させることはできません。

## 3. 自然数を半環の中へ入れる

どんな可換半環にも、1を繰り返し加えるという操作があります。この写像が足し算・掛け算を保っていても、異なる自然数を異なる元へ送るとは限りません。

<a id="thm-tsp10-natural-map"></a>

<!-- formal-statement-start -->
> **定理（自然数からの標準写像）**
>
> 可換半環 $S$ に対し、写像 $\iota:\mathbb N_0\to S$ を $\iota(0)=0$、$\iota(n+1)=\iota(n)+1$ で定めると、$\iota(1)=1$ であり、全ての $m,n\in\mathbb N_0$ について

$$
\iota(m+n)=\iota(m)+\iota(n),\qquad
\iota(mn)=\iota(m)\iota(n)
$$

> が成立する。0、1と和・積を保つ写像はこれに限る。
<!-- formal-statement-end -->

加法は1を連結して数え、乗法は分配律によって同じ個数のまとまりを繰り返し足す操作です。

<!-- proof-start -->
### 証明

$\iota(1)=0+1=1$ です。$m$ を固定し $n$ について帰納します。$n=0$ では $\iota(m+0)=\iota(m)=\iota(m)+0$。$n$ の等式を仮定すると

$$
\begin{aligned}
\iota(m+(n+1))&=\iota((m+n)+1)\\
&=\iota(m+n)+1\\
&=(\iota(m)+\iota(n))+1\\
&=\iota(m)+\iota(n+1).
\end{aligned}
$$

次に積について $n=0$ では $\iota(m0)=0=\iota(m)0$ です。$n$ の等式を仮定すると、先ほどの和の公式と分配律から

$$
\begin{aligned}
\iota(m(n+1))&=\iota(mn+m)\\
&=\iota(mn)+\iota(m)\\
&=\iota(m)\iota(n)+\iota(m)1\\
&=\iota(m)(\iota(n)+1).
\end{aligned}
$$

最後は $\iota(m)\iota(n+1)$ です。従って両公式が全ての非負整数で成立します。

別の写像 $f$ が0、1と和・積を保つとします。$f(0)=0$ であり、

$$
f(n+1)=f(n)+f(1)=f(n)+1
$$

なので同じ漸化式を満たします。帰納法により全ての $n$ で $f(n)=\iota(n)$ です。
<!-- proof-end -->

例えば $\mathbb N_0^2$ では $\iota(n)=(n,n)$ となり、異なる自然数は異なる組へ写ります。一方、集合 $\{0,1\}$ に和を最大値、積を最小値として入れると、交換律・結合律は三つの値の最大・最小を取ることで成立し、単位元はそれぞれ0と1です。分配律は左因子が0なら両辺0、1なら両辺が残り二つの最大値です。零の吸収性も最小値から従います。この可換半環では $1+1=1$ なので $\iota(1)=\iota(2)=1$ です。標準写像が存在しても単射とは限りません。

## 4. 自然数を尺度として使える条件

ここからは [自然数からの標準写像](#thm-tsp10-natural-map) が数の順序を正しく保持することを要求します。また任意の資源を、零でない資源を十分多く並べることで上から評価できることも要求します。これらは後で比較を実数値の関数によって調べるための重要な仮定です。

<a id="def-tsp10-strassen-preorder"></a>

<!-- formal-statement-start -->
> **定義（Strassen前順序）**
>
> 前順序付き可換半環 $(S,\preceq)$ において、自然数からの標準写像 $\iota$ が次を満たすとする。
>
> 自然数上の順序の忠実性：全ての $m,n\in\mathbb N_0$ について

$$
\iota(m)\preceq\iota(n)\quad\Longleftrightarrow\quad m\le n.
$$

> 有界性：全ての $a,b\in S$ で $b\ne0$ のとき、ある正整数 $r$ が存在して

$$
a\preceq\iota(r)b
$$

> が成立する。この二条件を満たす前順序をStrassen前順序という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp10-strassen-preorder -->
**定義の確認**。$S=\mathbb N_0$ に通常の大小と加法・乗法を入れます。反射律・推移律があり、非負数を加える・掛ける操作は大小を保ちます。$\iota(n)=n$ なので忠実性は通常の大小そのものです。任意の $a\in\mathbb N_0$ と $b\ge1$ に対し $r=\max(1,a)$ とすれば $rb\ge r\ge a$ です。例えば $a=7,b=2$ なら $r=4$ でも $7\le8$ となります。
<!-- definition-example-end -->

順序の忠実性から $\iota$ は単射になります。実際 $\iota(m)=\iota(n)$ なら反射律によって双方の比較が成立し、忠実性で $m\le n$ と $n\le m$ が従うからです。このとき $\iota(n)$ を単に $n$ とも書きます。

有界性は忠実性からは導けません。第2節の $\mathbb N_0^2$ では自然数は $(n,n)$ として忠実に埋め込まれます。しかし $a=(1,0)$、$b=(0,1)$ を取ると全ての正整数 $r$ について

$$
\iota(r)b=(r,r)(0,1)=(0,r).
$$

第1成分で $1\le0$ が必要になるため $a\preceq\iota(r)b$ は成立しません。何度並べても第1成分の資源を生み出せないのです。

なお、Strassen前順序は定義上前順序であり、一般の元について反対称律を要求しません。今回のテンソルのように両方向に比較できる元を同一視すると、半順序にすることができます。

## 5. テンソルから半環を構成する

体 $K$ と因子数 $d\ge2$ を固定します。有限次元の標準座標テンソルを対象とし、次元0も許します。[制限同値](../TSP5/index.md#def-tsp5-restriction-equivalence)で同値な全てのテンソルを一つの元 $[t]$ と見なします。代表元はその同値類に属する一つのテンソルです。

加法は [テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum)、乗法は [テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker) から作ります。加法の零には零テンソル、乗法の一には一次元の各空間で係数が1のテンソルを使います。既習の [対角テンソル](../TSP4/index.md#def-tsp4-diagonal) を $D_r$ と書けば、これらはそれぞれ $D_0,D_1$ です。

<a id="thm-tsp10-tensor-semiring"></a>

<!-- formal-statement-start -->
> **定理（テンソルの半環構成）**
>
> 体 $K$ と因子数 $d\ge2$ を固定する。全ての有限次元 $d$ 因子標準座標テンソルの制限同値類の集合 $S_{K,d}$ に

$$
[t]+[s]=[t\oplus s],\qquad [t][s]=[t\boxtimes s]
$$

> および $[t]\preceq[s]$ を $t\preceq s$ で定める。$0=[D_0]$、$1=[D_1]$ とすると、これらの演算・比較は代表元によらず、$S_{K,d}$ は前順序付き可換半環である。さらにこの比較は反対称律も満たす。
<!-- formal-statement-end -->

括弧の違い、座標の並べ方の違いは各因子の可逆な基底対応で解消します。テンソルの係数そのものに等号が成立する必要はなく、同値類で等号が成立すれば十分です。

<!-- proof-start -->
### 証明

まず $t\sim t',s\sim s'$ のとき、[直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) を両方向に適用すれば

$$
t\oplus s\sim t'\oplus s',\qquad
t\boxtimes s\sim t'\boxtimes s'
$$

となります。比較も代表元の変更 $t'\preceq t\preceq s\preceq s'$ によって保たれ、逆の変更でも同じ推移律が使えます。従って演算と比較は定まります。

各因子において直和空間の基底は入力基底を区別した連結、Kronecker積の基底は入力基底の組で番号付けされます。これは [テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum) と [テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker) の係数公式です。

結合律：直和の括弧を変える写像は3つの基底群の対応です。どちらも各テンソルの係数だけが所属群の中に入り、混合群の係数は0です。従って群ごとの基底対応で互いに写ります。積の括弧についても各因子で

$$
(e_i\otimes f_j)\otimes g_k
\longmapsto e_i\otimes(f_j\otimes g_k)
$$

と写せば基底の全単射です。各テンソルの添字組を $I,J,L$ としたとき、対応する係数は両方とも $t_I s_J u_L$ です。

交換律：直和の二つの基底群を交換すると元の係数は群とともに移り、混合係数の0も保たれます。積では $e_i\otimes f_j\mapsto f_j\otimes e_i$ が基底の全単射で、係数 $t_I s_J=s_J t_I$ が保存されます。全ての対応は各因子の可逆線形写像であり、逆写像による制限もあります。

単位元：第 $a$ 因子の空間を $V_a$ とすると、$V_a\oplus\{0\}\to V_a$ の $(v,0)\mapsto v$ は逆写像 $v\mapsto(v,0)$ を持ちます。$V_a\otimes K\to V_a$ の $v\otimes\lambda\mapsto\lambda v$ も基底 $e_i\otimes1\mapsto e_i$ の対応なので可逆です。従って $t\oplus D_0\sim t$、$t\boxtimes D_1\sim t$ です。

分配律：テンソル $t,s,u$ の各因子空間を $V_a,W_a,U_a$ とします。各位置で

$$
V_a\otimes(W_a\oplus U_a)
\longrightarrow (V_a\otimes W_a)\oplus(V_a\otimes U_a)
$$

という線形写像を次の基底対応で定めます。

$$
e_i\otimes(f_j,0)\mapsto(e_i\otimes f_j,0),
$$

$$
e_i\otimes(0,g_k)\mapsto(0,e_i\otimes g_k).
$$

両側の基底を一対一に対応させるため可逆です。左辺の $t\boxtimes(s\oplus u)$ の係数を各位置の基底群で分類すると、全位置が $W$ 側なら $t_I s_J$、全位置が $U$ 側なら $t_I u_L$、両側の混合なら0です。この対応で移した右辺の係数は $(t\boxtimes s)\oplus(t\boxtimes u)$ の係数と一致します。よって両方向の制限が得られ、同値類で分配律が成立します。

零の吸収性：$V_a\otimes\{0\}$ は零空間ですから $t\boxtimes D_0$ は零テンソルです。全ての零テンソルは零写像で互いに移り合うので $[t\boxtimes D_0]=0$ です。ここまでの基底対応は空の基底群も許すので次元0でも成立します。

比較の反射律・推移律は [制限の前順序性](../TSP5/index.md#thm-tsp5-restriction-preorder) から従います。両方向の比較が成立すれば [制限同値](../TSP5/index.md#def-tsp5-restriction-equivalence) により同じ類です。演算との両立性は [直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) を使えば成立します。
<!-- proof-end -->

例えば三因子で $t=D_2,s=D_3,u=D_1$ とすると、左辺 $t\boxtimes(s\oplus u)$ は対角成分8個です。右辺は対角成分6個と2個を並べたものです。分配律の写像は各因子で、最初の2個の番号それぞれに対して後ろの4個の番号を、後者が最初の3個か最後の1個かによって二つの領域に仕分けます。単に次元が8と一致するからではなく、全ての位置で同じ基底対応を行うことで対角成分が一致します。

## 6. テンソルの比較はStrassen前順序になる

テンソルの自然数に当たるものは対角テンソルです。[Strassen前順序](#def-tsp10-strassen-preorder) の二条件をこの尺度で確かめます。さらに非零テンソルなら、必ず対角成分を少なくとも1個取り出せます。この事実と有限階数性が有界性を保証します。

<a id="thm-tsp10-tensor-strassen"></a>

<!-- formal-statement-start -->
> **定理（テンソルのStrassen前順序）**
>
> 体 $K$ と因子数 $d\ge2$ を固定し、[テンソルの半環構成](#thm-tsp10-tensor-semiring) の $S_{K,d}$ を取る。自然数からの標準写像は

$$
\iota(n)=[D_n]\qquad(n\in\mathbb N_0)
$$

> であり、制限による比較はStrassen前順序である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\iota(0)=[D_0]$、$\iota(1)=[D_1]$ です。[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations) より $[D_n]+[D_1]=[D_{n+1}]$ なので、[自然数からの標準写像](#thm-tsp10-natural-map) の漸化式から $\iota(n)=[D_n]$ です。

$m\le n$ なら各因子で $K^n\to K^m$ を、第1から第 $m$ 基底ベクトルはそのまま、残りは零へ送る写像とします。$D_n$ の和のうち番号 $1,\ldots,m$ の項だけが残り $D_m$ になります。$m=0$ でも零への写像で成立します。よって $D_m\preceq D_n$ です。

逆に $D_m\preceq D_n$ なら [制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds) と [対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) から

$$
m=R_K(D_m)\le R_K(D_n)=n.
$$

従って自然数の比較は忠実です。

有界性を示します。$a=[t]$、$b=[s]\ne0$ とします。$s$ が零なら $[s]=0$ となるので、$s$ は非零です。

$s$ の第 $k$ 因子の空間を $V_k$ とし、その基底を $e_{k,i}$ とします。非零の基底係数を一つ選び、

$$
s_{j_1\ldots j_d}=c\ne0
$$

と書きます。各因子の線形写像 $A_k:V_k\to K$ を基底上で

$$
A_k(e_{k,i})=
\begin{cases}
1 & (i=j_k),\\
0 & (i\ne j_k)
\end{cases}
$$

と定めます。ただし第1因子では $A_1(e_{1,j_1})=c^{-1}$ に変更します。[局所線形写像のテンソル積](../TSP4/index.md#def-tsp4-local-map) を作用させると、

$$
(\bigotimes_{a=1}^d A_a)s=c^{-1}c\,1^{\otimes d}=D_1
$$

となります。選んだ添字組以外の項には少なくとも一つ零の因子があるからです。従って $D_1\preceq s$ です。

$t$ の階数は有限です。$r=\max(1,R_K(t))$ とすれば [対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) と自然数の比較から $t\preceq D_r$ です。[直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) を $D_1\preceq s$ と $D_r\preceq D_r$ に適用すると

$$
[D_r]=[D_r][D_1]\preceq [D_r][s]=\iota(r)b.
$$

これを $a\preceq[D_r]$ とつなげれば $a\preceq\iota(r)b$ です。零でないことを用いた箇所は $c^{-1}$ を取る段階です。$b=0$ なら $\iota(r)b=0$ であり、非零の $a$ はそこから作れません。
<!-- proof-end -->

これで階数と劣階数の比較を、半環の自然数との比較として書けます。

## 7. 抽象的な比較から費用を取り出す

資源 $a$ を作る自然数の最小値と、$a$ から取り出せる自然数の最大値を考えます。以下では自然数を標準写像の像と同一視します。

<a id="thm-tsp10-order-rank"></a>

<!-- formal-statement-start -->
> **定理（自然数による上下の評価）**
>
> Strassen前順序を持つ前順序付き可換半環 $S$ に対し、任意の $a\in S$ で次の最小値・最大値が存在する。

$$
R_S(a)=\min\{n\in\mathbb N_0:a\preceq n\},
$$

$$
Q_S(a)=\max\{n\in\mathbb N_0:n\preceq a\}.
$$

> $Q_S(a)\le R_S(a)$ であり、両者は比較に関して単調である。全ての $n\in\mathbb N_0$ について $R_S(n)=Q_S(n)=n$ である。
<!-- formal-statement-end -->

有界性は費用の有限性を保証します。零を含む候補集合の存在は別途確認する必要があります。

<!-- proof-start -->
### 証明

まず自然数の忠実性により $0\preceq1$ です。これに $a$ を掛けると零の吸収性と乗法単位元から $0\preceq a$ となり、取り出し側の候補集合は0を含みます。

自然数の忠実性から $1\ne0$ なので、有界性を $b=1$ に適用するとある正整数 $r$ で $a\preceq r$ です。費用側の候補集合は空でなく、自然数の整列性により最小値が存在します。

任意の取り出し候補 $n$ について $n\preceq a\preceq r$ なので $n\le r$ です。候補集合は $\{0,\ldots,r\}$ の非空部分集合であり最大値を持ちます。

両極値の定義から

$$
Q_S(a)\preceq a\preceq R_S(a)
$$

となるため、忠実性で $Q_S(a)\le R_S(a)$ が成立します。

$a\preceq b$ の場合は $a\preceq b\preceq R_S(b)$ から $R_S(a)\le R_S(b)$、また $Q_S(a)\preceq a\preceq b$ から $Q_S(a)\le Q_S(b)$ です。

$a=n$ なら自然数の忠実性により費用候補は $n$ 以上の自然数全体、取り出し候補は $0,\ldots,n$ です。よって両極値は $n$ です。
<!-- proof-end -->

テンソルでは [対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) と [テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) により $R_S([t])=R_K(t)$、$Q_S([t])=Q_K(t)$ です。

たとえば $t=D_3$ なら $Q_S([t])=R_S([t])=3$。一般の $t$ では二つの値が一致するとは限りません。次講では自然数上では同じ値を取るが一般の資源上では異なるかもしれない、加法・乗法と比較を保つ数値写像を導入します。

## 8. 演習

### Level A

<a id="ex-tsp10-a01"></a>

#### TSP10-A01 成分ごとの演算
- Level: A
- ID: TSP10-A01

$\mathbb N_0^2$ の成分ごとの和と積で $a=(2,5),b=(3,1),c=(4,2)$ とする。分配律を具体的に確認し、零・一との積を計算せよ。

<!-- solution-start -->
##### 詳細解答

$b+c=(7,3)$ なので $a(b+c)=(14,15)$ です。一方 $ab=(6,5),ac=(8,10)$ なので $ab+ac=(14,15)$。左右は一致します。

零は $(0,0)$、一は $(1,1)$ なので $a0=(2\cdot0,5\cdot0)=(0,0)$、$a1=(2\cdot1,5\cdot1)=(2,5)$ です。
<!-- solution-end -->

<a id="ex-tsp10-a02"></a>

#### TSP10-A02 自然数の像
- Level: A
- ID: TSP10-A02

$\{0,1\}$ に加法を最大値、乗法を最小値とする半環を考える。標準写像の $0,1,2,3$ の像を求め、通常の大小に関する忠実性を判定せよ。

<!-- solution-start -->
##### 詳細解答

[自然数からの標準写像](#thm-tsp10-natural-map) の漸化式を使います。$\iota(0)=0,\iota(1)=\max(0,1)=1$ で、

$$
\iota(2)=\max(1,1)=1,\quad \iota(3)=1.
$$

像では $\iota(2)\le\iota(1)$ が成立しますが自然数では $2\le1$ は偽です。従って順序の忠実性はありません。半環としての演算が正しくても尺度が潰れます。
<!-- solution-end -->

<a id="ex-tsp10-a03"></a>

#### TSP10-A03 対角テンソルの計算
- Level: A
- ID: TSP10-A03

同じ体・因子数の半環で $([D_2]+[D_3])[D_4]$ を一つの対角テンソルの類で表せ。その階数と劣階数も求めよ。

<!-- solution-start -->
##### 詳細解答

[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations) により $[D_2]+[D_3]=[D_5]$、$[D_5][D_4]=[D_{20}]$ です。[自然数による上下の評価](#thm-tsp10-order-rank) を自然数20に適用すると両方20です。
<!-- solution-end -->

<a id="ex-tsp10-a04"></a>

#### TSP10-A04 比較の伝播
- Level: A
- ID: TSP10-A04

前順序付き可換半環で $a\preceq b,c\preceq e$ とする。$a^2+c\preceq b^2+e$ を示せ。$a^2=aa$ とする。

<!-- solution-start -->
##### 詳細解答

[前順序付き可換半環](#def-tsp10-preordered-semiring) の乗法との両立性を最初の比較に $a$ を掛けて使うと $aa\preceq ba$。次に $b$ を掛けて $ab\preceq bb$ です。交換律で $ba=ab$ なので推移律から $a^2\preceq b^2$。

これに $c$ を加え、さらに $c\preceq e$ に $b^2$ を加えると

$$
a^2+c\preceq b^2+c\preceq b^2+e.
$$

推移律で結論が得られます。
<!-- solution-end -->

### Level B

<a id="ex-tsp10-b01"></a>

#### TSP10-B01 忠実性と有界性を分ける
- Level: B
- ID: TSP10-B01

$\mathbb N_0^2$ に成分ごとの演算と順序を入れる。$b=(2,3)$ なら任意の $a=(p,q)$ をある $\iota(r)b$ で上から評価できることを示せ。$b=(2,0)$ の場合に失敗する $a$ を与え、Strassen前順序か判定せよ。

<!-- solution-start -->
##### 詳細解答

単位元は $(1,1)$ なので $\iota(r)=(r,r)$。$r=\max(1,p,q)$ とすれば

$$
\iota(r)b=(2r,3r),\quad p\le r\le2r,\quad q\le r\le3r.
$$

両成分の不等式から $a\preceq\iota(r)b$ です。

$b=(2,0)$ は零でないにもかかわらず $a=(0,1)$ に対して $\iota(r)b=(2r,0)$ なので第2成分の $1\le0$ が成立しません。自然数の忠実性は $(m,m)\preceq(n,n)$ と $m\le n$ が同値なので成立しますが、有界性が全ての非零 $b$ に対して成立しないため [Strassen前順序](#def-tsp10-strassen-preorder) ではありません。
<!-- solution-end -->

<a id="ex-tsp10-b02"></a>

#### TSP10-B02 局所写像で一を取り出す
- Level: B
- ID: TSP10-B02

$\mathbb Q^2$ の標準基底 $e_1,e_2$ を用いた三因子テンソル

$$
s=2e_1\otimes e_2\otimes e_1
-3e_2\otimes e_1\otimes e_2
$$

について $D_1\preceq s$ を実現する三つの線形写像を構成せよ。$t=D_5$ に対して $[t]\preceq5[s]$ も示せ。

<!-- solution-start -->
##### 詳細解答

各写像の値域は $\mathbb Q$ とし、$A_1(e_1)=1/2,A_1(e_2)=0$、$A_2(e_1)=0,A_2(e_2)=1$、$A_3(e_1)=1,A_3(e_2)=0$ とします。基底上で指定したので線形に延長できます。

[局所線形写像のテンソル積](../TSP4/index.md#def-tsp4-local-map) で第1項の像は $2((1/2)\otimes1\otimes1)=1^{\otimes3}$、第2項の像は零です。よって $D_1\preceq s$。

$D_5\preceq D_5$ と合わせて [直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) を積に適用すると $D_5\boxtimes D_1\preceq D_5\boxtimes s$ です。左辺は $D_5$ と制限同値であり、右辺の類は $5[s]$ です。従って求める比較が得られます。
<!-- solution-end -->

<a id="ex-tsp10-b03"></a>

#### TSP10-B03 分配律の基底対応
- Level: B
- ID: TSP10-B03

各位置の $V=K^2,W=K^2,U=K$ の基底をそれぞれ $e_1,e_2$、$f_1,f_2$、$g_1$ とする。$V\otimes(W\oplus U)$ の6基底と $(V\otimes W)\oplus(V\otimes U)$ の6基底の対応を書き、三因子テンソル $t=e_2^{\otimes3},s=f_1^{\otimes3},u=g_1^{\otimes3}$ に分配律を実現せよ。

<!-- solution-start -->
##### 詳細解答

左側の基底は $e_i\otimes(f_j,0)$（$i,j=1,2$ の4個）と $e_i\otimes(0,g_1)$（$i=1,2$ の2個）です。それぞれ

$$
e_i\otimes(f_j,0)\mapsto(e_i\otimes f_j,0),
$$

$$
e_i\otimes(0,g_1)\mapsto(0,e_i\otimes g_1)
$$

と写します。4個と2個の互いに異なる右側の基底を全て得るので可逆です。

三位置で同じ写像を作用させると $t\boxtimes(s\oplus u)$ の二つの項は

$$
(e_2\otimes f_1,0)^{\otimes3}
+(0,e_2\otimes g_1)^{\otimes3}
$$

へ写ります。これは直和 $(t\boxtimes s)\oplus(t\boxtimes u)$ です。[テンソルの半環構成](#thm-tsp10-tensor-semiring) の分配律を具体的な基底で実現しました。逆写像もあるので両方向の制限が成立します。
<!-- solution-end -->

<a id="ex-tsp10-b04"></a>

#### TSP10-B04 自然数による区間
- Level: B
- ID: TSP10-B04

Strassen前順序を持つ半環で $2\preceq a\preceq5$、$3\preceq b\preceq4$ とする。$a+b$ と $ab$ の自然数による上下の評価を導け。

<!-- solution-start -->
##### 詳細解答

[前順序付き可換半環](#def-tsp10-preordered-semiring) の両立性を下側・上側の比較にそれぞれ使います。加法では $2+3\preceq a+3\preceq a+b$、$a+b\preceq5+b\preceq5+4$ です。乗法でも $2\cdot3\preceq a3\preceq ab$、$ab\preceq5b\preceq5\cdot4$。

従って

$$
5\preceq a+b\preceq9,\qquad6\preceq ab\preceq20.
$$

[自然数による上下の評価](#thm-tsp10-order-rank) に示した候補集合の最小値・最大値を考えると、$Q_S(a+b)\ge5,\ R_S(a+b)\le9$、$Q_S(ab)\ge6,\ R_S(ab)\le20$ です。これらの上下界だけで極値が等号を取るとは結論できません。
<!-- solution-end -->

### Level C

<a id="ex-tsp10-c01"></a>

#### TSP10-C01 抽象半環で反復する
- Level: C
- ID: TSP10-C01

Strassen前順序を持つ前順序付き可換半環で $a,b\in S$ とする。$R_S,Q_S$ の積に関する劣乗法性・優乗法性、すなわち $R_S(ab)\le R_S(a)R_S(b)$ と $Q_S(ab)\ge Q_S(a)Q_S(b)$ を証明せよ。さらに $a\ne0$ なら全ての正整数 $n$ で $1\le Q_S(a^n)\le R_S(a^n)\le R_S(a)^n$ が成立するか判定し、必要なら追加仮定を与えよ。$a^n$ は $n$ 個の積である。

<!-- solution-start -->
##### 詳細解答

[自然数による上下の評価](#thm-tsp10-order-rank) の最小値・最大値は実際に比較を満たすので

$$
Q_S(a)\preceq a\preceq R_S(a),\quad
Q_S(b)\preceq b\preceq R_S(b).
$$

[前順序付き可換半環](#def-tsp10-preordered-semiring) の乗法との両立性を順に適用します。

$$
Q_S(a)Q_S(b)\preceq aQ_S(b)\preceq ab,
$$

$$
ab\preceq R_S(a)b\preceq R_S(a)R_S(b).
$$

両端は自然数の像です。[自然数からの標準写像](#thm-tsp10-natural-map) は積を保つので、取り出し候補と費用候補の自然数として扱えます。よってそれぞれ最大値・最小値との比較から主張された積の不等式を得ます。

次に $a\ne0$ なら、有界性を左の資源1、右の資源 $a$ に使うと正整数 $r$ が存在して $1\preceq ra$ です。ただし一般の半環ではこれから $1\preceq a$ は従いません。従って後半の不等式を得るには、別の根拠が必要です。

反例として $S=\mathbb Q_{\ge0}$ に通常の加法・乗法・大小を入れます。非負有理数なので演算は閉じ、通常の算術の全公理と順序の両立性が成立します。自然数の忠実性も成立し、$b>0$ なら正整数 $r\ge a/b$ を選べるので有界性も成立します。$a=1/2$ とすると $a\ne0$ ですが $a^n=2^{-n}<1$ です。従って自然数の取り出し候補は0だけで $Q_S(a^n)=0$。調べている最初の不等式は成立しません。

全ての正整数 $n$ で後半の不等式が成立するための必要十分条件は $1\preceq a$ です。必要性は $n=1$ の場合に $1\le Q_S(a)$ なら忠実性と最大値の定義から $1\preceq Q_S(a)\preceq a$ となることから分かります。十分性を確認します。これを繰り返し掛けると $1^n\preceq a^n$ ですから $Q_S(a^n)\ge1$。上で証明した劣乗法性を $a^n=a^{n-1}a$ に繰り返し適用して

$$
R_S(a^n)\le R_S(a^{n-1})R_S(a)
\le\cdots\le R_S(a)^n.
$$

中央の $Q_S(a^n)\le R_S(a^n)$ は [自然数による上下の評価](#thm-tsp10-order-rank) から成立します。テンソルの場合は [テンソルのStrassen前順序](#thm-tsp10-tensor-strassen) の証明で示した非零成分の回収によって $1\preceq[t]$ が得られるため、非零という条件だけで後半も成立します。
<!-- solution-end -->

## 9. 次講への接続

テンソルの演算と比較を可換半環にまとめ、対角テンソルによる自然数の尺度が忠実であることを示しました。自然数の尺度による費用・取り出し能力は、一般のStrassen前順序にも定義できます。次は和・積・比較・一を保つ実数値の写像を調べます。

参考：[Wigderson–Zuiddam, Asymptotic spectra: theory, applications and extensions](https://doi.org/10.1090/bull/1880)。
