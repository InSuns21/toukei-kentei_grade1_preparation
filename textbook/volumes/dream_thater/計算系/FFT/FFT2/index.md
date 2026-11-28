# FFT2 有限可換群のFourier変換・双対群・文字表のテンソル積

前講では一つの周期を持つ列を文字で分解しました。今度は、縦と横にそれぞれ周期を持つ格子上の値を考えます。縦方向の周期が2、横方向の周期が3なら、6個の値を一つの周期6の列とみなすこともできます。しかし二方向とも周期2の場合、4個の値があっても周期4の群とは違います。どの周期を独立に使えるかが、変換行列の形を決めます。

本講の目標は、有限可換群（Abel群）上の変換を巡回群の変換の積へ分解し、係数体にどんな根が必要かを判定することです。

## 1. 群の位数と指数を区別する

[可換群](../../../代数系/GRP/GRP1/index.md#def-grp1-group) $G$ を加法で書き、単位元を $0$、位数（元の個数）を $N=|G|\ge2$ とします。正整数 $m$ に対して $mg$ は $g$ を $m$ 回加えることです。有限群は全ての元を生成元として選べるので有限生成です。[有限生成 Abel 群の構造定理](../../../代数系/MOD/MOD2/index.md#thm-mod2-fg-abelian) を適用すると、自由部分は無限個の元を含むため消えます。従ってある $n_i\ge2$ により

$$
G\cong C_{n_1}\times\cdots\times C_{n_s},
\qquad C_n=\mathbb Z/n\mathbb Z,
\qquad N=\prod_{i=1}^s n_i
$$

と書けます。有限個の直和と直積は成分ごとの加法で同じ群を表します。不変因子表示では $n_1\mid\cdots\mid n_s$ ですが、以下の計算はその整除鎖を要求しません。群同型を一つ固定し、元を $g=(g_1,\ldots,g_s)$ と表します。添字 $i$ は $1$ から $s$ までの軸番号で、各座標 $g_i$ は法 $n_i$ の剰余類を表します。冪の計算では代表整数 $0\le g_i<n_i$ を使います。

全ての元を一斉に0へ戻すには、各座標の周期の公倍数だけ加えれば十分です。その最小の回数を記録します。[部分群の指数](../../../代数系/GRP/GRP2/index.md#def-grp2-index) $[G:H]$（剰余類の個数）とは別の量です。

<a id="def-fft2-group-exponent"></a>

<!-- formal-statement-start -->
> **定義（有限可換群の指数）**
>
> 有限可換群 $G$ の指数 $\exp(G)$ は、全ての $g\in G$ に対して $eg=0$ となる最小の正整数 $e$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft2-group-exponent -->
**定義の確認**

$G=C_2\times C_4$ では、任意の $(a,b)$ に4を掛けると $(0,0)$ です。一方 $(0,1)$ の正の倍数が最初に0になるのは4倍のときです。従って指数は4であり、位数8とは異なります。
<!-- definition-example-end -->

<a id="prop-fft2-exponent-periods"></a>

<!-- formal-statement-start -->
> **命題（巡回因子と群の指数）**
>
> $G=\prod_{i=1}^s C_{n_i}$、$s\ge1$、$n_i\ge2$ とする。このとき

$$
\exp(G)=\operatorname{lcm}(n_1,\ldots,n_s).
$$

> 特に指数は位数を割り、指数に等しい位数の元が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

各座標の生成元を別々に調べれば、全体を0にするための必要条件が全て出ます。一方、全座標が1の元は全ての周期を同時に実現します。

<!-- proof-start -->
### 証明

[群の直積](../../../代数系/GRP/GRP1/index.md#def-grp1-direct-product) の加法は成分ごとです。正整数 $m$ が全ての元を消すなら、第 $i$ 座標だけが1である元にも適用でき、$m\equiv0\pmod{n_i}$ です。

逆に各 $n_i$ が $m$ を割るなら、任意の $g_i$ について $mg_i=0$ となり、$mg=0$ です。従って最小の $m$ は最小公倍数です。積 $\prod_i n_i$ も公倍数であり、最小公倍数はその積を割ります。

さらに $u=(1,\ldots,1)$ について $mu=0$ と全ての $n_i\mid m$ は同値なので、[元の位数](../../../代数系/GRP/GRP1/index.md#def-grp1-element-order) は $e$ です。
<!-- proof-end -->

例えば $C_4$ と $C_2\times C_2$ はともに位数4ですが、指数はそれぞれ4と2です。後者の変換には4乗根は不要です。

## 2. 係数体に必要な根

前講の [原始1のN乗根](../FFT1/index.md#def-fft1-primitive-root) が各軸に存在すれば、各軸で [体に値を取る群の文字](../FFT1/index.md#def-fft1-multiplicative-character) を作れます。$e=\exp(G)$ の原始 $e$ 乗根 $\zeta$ が体 $K$ にあるとき、各軸では

$$
\zeta_i=\zeta^{e/n_i}
$$

を選べます。実際 $\zeta_i^t=1$ は $e\mid (e/n_i)t$、すなわち $n_i\mid t$ と同値なので $\zeta_i$ の位数は $n_i$ です。

整数 $m$ を体の元として使うときは $m1_K$（単位元 $1_K$ の整数倍）を意味します。[標数](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field) が正なら素数 $p$ であり、$m1_K=0$ と $p\mid m$ は同値です。標数0なら正整数の像は非零です。$\mathbb F_q$ は元の個数が $q$ の有限体を表します。

係数体に根が足りないなら、体を拡大する方法があります。ここでは [分解体](../../../代数系/FLD/FLD2/index.md#def-fld2-splitting-field)（分裂体ともいう）を多項式 $X^e-1$ に対して用います。全ての根を含む体であっても、[重根](../../../代数系/FLD/FLD2/index.md#def-fld2-formal-diff-multiplicity)（同じ一次因子が2回以上現れる根）がある場合には十分な数の異なる文字が得られません。$X$ は多項式の不定元、$L/K$ は $K$ の拡大体 $L$ を表します。

<a id="thm-fft2-splitting-condition"></a>

<!-- formal-statement-start -->
> **定理（有限Fourier変換の根の存在条件）**
>
> 位数 $N\ge2$、指数 $e$ の有限可換群 $G$ と体 $K$ を取る。
>
> $N1_K\ne0$ なら、ある有限拡大体 $L/K$ に原始 $e$ 乗根が存在する。逆に $N1_K=0$ なら、そのような拡大体は存在しない。
>
> また $K=\mathbb F_q$ の場合、$K$ 自身に原始 $e$ 乗根が存在する必要十分条件は

$$
e\mid(q-1)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

標数が群の位数を割らなければ、$X^e-1$ は重根を持ちません。その根全体は乗法について群を作り、根の数と最大位数を比較すれば巡回群になります。有限体自身については乗法群の位数を使います。

<!-- proof-start -->
### 証明

[巡回因子と群の指数](#prop-fft2-exponent-periods) によると $N=\prod_i n_i$、$e=\operatorname{lcm}(n_1,\ldots,n_s)$ です。素数 $p$ が積 $N$ を割ること、少なくとも一つの $n_i$ を割ること、最小公倍数 $e$ を割ることは同値です。標数0では両方とも体の中で非零です。よって $N1_K\ne0$ なら $e1_K\ne0$ です。

[分解体の存在](../../../代数系/FLD/FLD2/index.md#thm-fld2-splitting-field-existence) により $X^e-1$ の有限分解体 $L$ を取れます。

[重根の形式微分判定](../../../代数系/FLD/FLD2/index.md#thm-fld2-repeated-root-gcd) を適用します。多項式を $P(X)=X^e-1$ と置くと、[形式微分](../../../代数系/FLD/FLD2/index.md#def-fld2-formal-diff-multiplicity) は不定元 $X$ の冪の係数を操作するので $P'(X)=(e1_K)X^{e-1}$ です。解析学の極限を取る微分ではありません。根 $a$ では $a^e=1$ なので $a\ne0$ であり、

$$
P'(a)=(e1_K)a^{e-1}\ne0
$$

となります。ゆえに重根はなく、相異なる根がちょうど $e$ 個あります。

根全体 $U=\{a\in L:a^e=1\}$ は乗法について閉じ、1を含み、逆元についても閉じます。積の交換も可能なので有限可換群です。

[有限可換群の最大位数元](../../../代数系/FLD/FLD3/index.md#lem-fld3-maximal-order-element) を $U$ に適用し、最大位数の元 $b$ の位数を $d$ とします。全ての $a\in U$ について $\operatorname{ord}(a)\mid d$、従って $a^d=1$ です。

次数 $d$ の非零多項式 $X^d-1$ の根は高々 $d$ 個（[FFT1での根の個数の議論](../FFT1/index.md#def-fft1-multiplicative-character)）なので $e\le d$ です。

一方 $b^e=1$ より $d\mid e$ です。結局 $d=e$ であり、$b$ は原始 $e$ 乗根です。

逆に $N1_K=0$ なら、[標数](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field) はある素数 $p$ で $p\mid e$ です。どの拡大体でも標数は同じです。

$e=pm$ として $a^e=1$ なら、[Frobenius 写像の加法性](../../../代数系/FLD/FLD3/index.md#thm-fld3-frobenius-automorphism) により

$$
(a^m-1)^p=a^{mp}-1=0
$$

です。体には非零の冪零元がないため $a^m=1$ です。$m<e$ なので原始 $e$ 乗根にはなれません。

最後に [有限体の乗法群は巡回群](../../../代数系/FLD/FLD3/index.md#thm-fld3-multiplicative-group-cyclic) より、$\mathbb F_q^\times=\langle b\rangle$ で $b$ の位数は $q-1$ です。

位数 $e$ の元 $a=b^j$ があるなら、

$$
a^{q-1}=(b^{q-1})^j=1.
$$

$q-1$ を $e$ で割った余りを $t$ とすると $a^t=1$ です。位数の最小性により $t=0$、すなわち $e\mid(q-1)$ です。

逆にこの整除関係があれば $c=b^{(q-1)/e}$ と置けます。任意の正整数 $t$ に対し

$$
c^t=1
\iff (q-1)\mid ((q-1)/e)t
\iff e\mid t.
$$

従って $c$ は原始 $e$ 乗根です。
<!-- proof-end -->

例えば $G=C_4$ では $\mathbb F_3$ に原始4乗根はありませんが、$\mathbb F_9$ にはあります（$4\mid8$）。一方 $C_2\times C_2$ は $\mathbb F_3$ 上で十分です（指数2が $3-1$ を割る）。位数4が $3-1$ を割る必要はありません。

## 3. 全ての文字を座標で表す

前講の [体に値を取る群の文字](../FFT1/index.md#def-fft1-multiplicative-character) は $G$ から非零元の乗法群 $K^\times=K\setminus\{0\}$ への写像で、$\chi(0)=1$ と $\chi(g+h)=\chi(g)\chi(h)$ を満たします。文字同士を各点で掛けると、また文字になります。周波数の番号を単なる整数ではなく、文字自体で表すと、群を分解する座標の選び方に依存しない記述になります。

<a id="def-fft2-character-dual"></a>

<!-- formal-statement-start -->
> **定義（体に値を取る双対群）**
>
> 有限可換群 $G$ と体 $K$ に対し、$G$ から $K^\times$ への文字全体を $\widehat G_K$ と書く。演算は点ごとの積

$$
(\chi\psi)(g)=\chi(g)\psi(g)
$$

> とする。この群を体 $K$ に値を取る双対群という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft2-character-dual -->
**定義の確認**

$G=C_2$、$K=\mathbb F_3$ とします。[体に値を取る群の文字](../FFT1/index.md#def-fft1-multiplicative-character) の条件から $\chi(1)^2=1$ です。非零元は1と $-1$ だけなので、文字は定数1の文字 $\chi_0$ と $\chi_1(j)=(-1)^j$ の二つです。

$\chi_0(0)=\chi_1(0)=1$ です。$\chi_0$ は常に1を返すので加法を積へ移します。$\chi_1$ では $(-1)^2=1$ により代表整数を2だけ変えても値が変わらず、

$$
\chi_1(a+b)=(-1)^{a+b}=(-1)^a(-1)^b
=\chi_1(a)\chi_1(b)
$$

です。どちらも値は非零です。点ごとの積では $\chi_0\chi_1=\chi_1$、$\chi_1^2=\chi_0$ となり、単位元と逆元を持ちます。積も交換可能です。
<!-- definition-example-end -->

一般の群でも積は0を1へ移し、体の積の可換性から

$$
(\chi\psi)(g+h)=\chi(g)\chi(h)\psi(g)\psi(h)
=(\chi\psi)(g)(\chi\psi)(h)
$$

となります。逆元の記号 $\chi^{-1}$ は逆関数ではなく、各点で $\chi^{-1}(g)=1/\chi(g)$ と定める文字を意味します。非零なので逆数を取れ、積の逆数の法則からこれも文字です。定数1が単位元で、結合性・可換性も体の積から従います。

ここからは各軸の原始根 $\zeta_i$ が $K$ に存在する場合を扱います。これは指数の原始根が存在すれば保証されます。反対に、ある軸で原始根が存在しないなら、その軸の $X^{n_i}-1$ の根は $n_i$ 個未満です。実際、もし相異なる根が $n_i$ 個あれば、第2節の根全体の群と最大位数元の議論により原始根が得られます。文字は各軸の生成元における値だけで決まるため、全体の文字の個数も $N$ 未満になり、可逆な文字表は作れません。

<a id="thm-fft2-product-characters"></a>

<!-- formal-statement-start -->
> **定理（直積群の文字の全列挙）**
>
> $s\ge1$、$n_i\ge2$、$G=\prod_{i=1}^s C_{n_i}$、$N=\prod_i n_i$ とし、体 $K$ は各 $n_i$ の原始根 $\zeta_i$ を含むとする。$k=(k_1,\ldots,k_s)$、$0\le k_i<n_i$ に対し

$$
\chi_k(g)=\prod_{i=1}^s\zeta_i^{k_i g_i}
$$

> と置くと、これらは相異なる文字であり、全ての文字がこの形になる。従って $\widehat G_K\cong G$ であり、文字の個数は $N$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各座標の生成元での値を知れば、群全体での値が決まります。その値は各軸の根の冪から選ぶしかありません。

<!-- proof-start -->
### 証明

第 $i$ 座標が1、他が0の元を $u_i$ とします。任意の元は $g=\sum_i g_i u_i$ と表せます。[群の文字](../FFT1/index.md#def-fft1-multiplicative-character) の条件を繰り返し使うと

$$
\chi(g)=\prod_i \chi(u_i)^{g_i},
\qquad \chi(u_i)^{n_i}=\chi(0)=1
$$

となります。前講の [巡回群の文字の列挙](../FFT1/index.md#def-fft1-multiplicative-character) と同じく、原始根の冪 $\zeta_i^0,\ldots,\zeta_i^{n_i-1}$ は相異なる $n_i$ 個の根で、次数の上限から全ての根を尽くします。

従って $\chi(u_i)=\zeta_i^{k_i}$ となる $k_i$ が一意にあります。

逆に上の積で定義した関数は代表元 $g_i$ を $n_i$ の倍数だけ変えても値が変わらず、0を1へ移し、加法を積へ移します。全て非零なので文字です。

二つの文字が等しければ $u_i$ で評価して $\zeta_i^{k_i}=\zeta_i^{\ell_i}$ となり、全ての $i$ で $k_i=\ell_i$ です。

さらに $\chi_k\chi_\ell=\chi_{k+\ell}$ であり、添字の加法は各 $n_i$ を法として行います。従って全単射 $k\mapsto\chi_k$ は群同型です。選択肢の総数は $\prod_i n_i=N$ です。
<!-- proof-end -->

根と座標の選択によって同型の対応は変わります。例えば $C_3$ の原始根を逆数に替えると番号1と2の文字が交換されます。双対群そのものはこれらの選択に依存しません。

## 4. 文字表、直交性、反転

群の元を列、文字を行に並べ、各交点に文字の値を書くと、前講の [体上の巡回Fourier変換](../FFT1/index.md#def-fft1-field-dft) と同じように積和で変換できます。一般の体では文字の個数が群の位数に満たない場合もあるため、変換の定義と可逆性の条件を分けます。

<a id="def-fft2-group-fourier"></a>

<!-- formal-statement-start -->
> **定義（有限可換群のFourier変換）**
>
> $G$ を有限可換群、$K$ を体とする。$K^G$ は $G$ から $K$ への全関数の空間である。$f\in K^G$ の変換 $\widehat f\in K^{\widehat G_K}$ を

$$
\widehat f(\chi)=\sum_{g\in G}f(g)\chi(g)
$$

> と定める。文字表 $D_G$ は行を $\chi$、列を $g$ とし、成分を $\chi(g)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft2-group-fourier -->
**定義の確認**

$G=C_2\times C_2$、$K=\mathbb Q$ で各軸の根を $-1$ にします。元と文字番号の両方を $(0,0),(0,1),(1,0),(1,1)$ の順とします。[直積群の文字の全列挙](#thm-fft2-product-characters) により行 $(k_1,k_2)$、列 $(g_1,g_2)$ の値は $(-1)^{k_1g_1+k_2g_2}$ です。例えば行 $(1,0)$ は第1座標だけで符号が変わるので $1,1,-1,-1$ です。

$$
D_G=
\begin{pmatrix}
1&1&1&1\\
1&-1&1&-1\\
1&1&-1&-1\\
1&-1&-1&1
\end{pmatrix}.
$$

入力 $f$ を列ベクトル $x=(f(g))_{g\in G}$ で表します。各元 $h$ でだけ1、他で0を取る関数を $b_h$ とすると、$f=\sum_h f(h)b_h$ です。変換の定義から $\widehat b_h(\chi)=\chi(h)$ となるため、第 $h$ 列は $b_h$ の変換を並べたものです。有限和の分配法則により

$$
(D_Gx)_\chi=\sum_{g\in G}(D_G)_{\chi,g}f(g)
=\sum_{g\in G}\chi(g)f(g)=\widehat f(\chi).
$$

従って、この行列を掛けることが変換そのものです。入力 $x=(1,2,3,4)^{\mathsf T}$ の行ごとの積和は

$$
\begin{pmatrix}
1+2+3+4\\
1-2+3-4\\
1+2-3-4\\
1-2-3+4
\end{pmatrix}
=\begin{pmatrix}10\\-2\\-4\\0\end{pmatrix}.
$$

各文字に一つずつ有理数を割り当てる関数が得られました。
<!-- definition-example-end -->

先行講座の [テンソルのKronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) は二つの配列の成分を掛け、行・列の添字を組にする操作でした。ここでは行列のKronecker積を $\otimes$ と書きます（先行講座では $\boxtimes$ と表記）。通常の行列積とは異なり、$A$ が $m\times n$、$B$ が $p\times q$ なら積は $mp\times nq$ です。

<a id="thm-fft2-character-table-product"></a>

<!-- formal-statement-start -->
> **定理（文字表のKronecker積表示）**
>
> $s\ge1$、$n_i\ge2$、$G=\prod_{i=1}^s C_{n_i}$ とし、体 $K$ は各軸の原始根 $\zeta_i$ を含むとする。行・列の番号を同じ辞書式順序（最後の座標が最も速く変わる順）に取る。$D_i=(\zeta_i^{k_i g_i})_{k_i,g_i}$ とすると

$$
D_G=D_1\otimes\cdots\otimes D_s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

文字の値が各軸の値の積であることを、行・列の組を持つ行列の成分と照合します。

<!-- proof-start -->
### 証明

[テンソルのKronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) を行列の基底表示に適用します。

行列 $A,B$ をそれぞれ行・列の二因子のテンソル係数として読みます。[多因子テンソル積の基底表示](../../TSP/TSP1/index.md#thm-tsp1-multifactor-basis) を使い、行の基底を $u_k,v_\ell$、列の基底を $w_g,z_h$ とすると、並べ替え後の係数展開は

$$
\sum_{k,g,\ell,h} A_{kg}B_{\ell h}
(u_k\otimes v_\ell)\otimes(w_g\otimes z_h).
$$

従って行 $(k,\ell)$、列 $(g,h)$ の成分は $A_{kg}B_{\ell h}$ です。

これを反復すると、$s$ 因子の行 $k$、列 $g$ の成分は

$$
(D_1\otimes\cdots\otimes D_s)_{k,g}
=\prod_{i=1}^s (D_i)_{k_i,g_i}
=\prod_{i=1}^s\zeta_i^{k_i g_i}
=\chi_k(g).
$$

各行列のサイズは $n_i\times n_i$ なので積のサイズは $N\times N$ です。[直積群の文字の全列挙](#thm-fft2-product-characters) により全ての行がちょうど一度現れ、列も全ての群元を一度ずつ走ります。よって成分の一致が行列全体の一致を与えます。
<!-- proof-end -->

同じ順序なら先ほどの4点文字表は

$$
H_2\otimes H_2,\qquad
H_2=\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

です。第一の軸がブロックの符号を指定し、第二の軸がブロック内部を指定します。$C_2^d$ のこの文字表は Walsh–Hadamard 行列と呼ばれます（$d\ge1$）。

各軸の文字の直交性を使えば、群全体でも欲しい成分だけが残ります。

<a id="thm-fft2-group-inversion"></a>

<!-- formal-statement-start -->
> **定理（有限可換群の文字の直交性と反転）**
>
> $s\ge1$、$n_i\ge2$、$G=\prod_{i=1}^s C_{n_i}$、$N=\prod_i n_i$ とし、体 $K$ は各軸の原始根を含み、$N1_K\ne0$ とする。任意の文字 $\chi,\psi$ と元 $g,h$ について

$$
\sum_{g'\in G}\chi(g')\psi(g')^{-1}
=N\delta_{\chi,\psi},
$$

$$
\sum_{\chi'\in\widehat G_K}\chi'(h)\chi'(g)^{-1}
=N\delta_{g,h}.
$$

> ここで $\delta_{a,b}$ は $a=b$ なら1、それ以外なら0である。ここで $N$ は体の元 $N1_K$ を表し、$N^{-1}$ はその逆元である。任意の $f\in K^G$ は変換から

$$
f(g)=N^{-1}\sum_{\chi\in\widehat G_K}
\widehat f(\chi)\chi(g)^{-1}
$$

> と一意に復元できる。
<!-- formal-statement-end -->

### 証明の見取り図

各軸の有限和に分け、異なる座標が一つでもあればその因子が0になります。全座標が一致すると全周期の積 $N$ が残ります。

<!-- proof-start -->
### 証明

$\chi=\chi_k,\psi=\chi_\ell$ と書きます。[直積群の文字の全列挙](#thm-fft2-product-characters) の積の表示を用いると

$$
\sum_{g'\in G}\chi_k(g')\chi_\ell(g')^{-1}
=\prod_{i=1}^s\left(\sum_{t=0}^{n_i-1}\zeta_i^{(k_i-\ell_i)t}\right).
$$

有限和の分配法則による等式です。[巡回群の文字の直交性](../FFT1/index.md#lem-fft1-character-orthogonality) を各軸で $r=k_i-\ell_i$ に適用します。

$k_i=\ell_i$ なら因子は $n_i1_K$、異なれば0です。全座標が一致する場合だけ積は $N1_K$ です。

第二の等式では和を取る添字を文字番号に替え、

$$
\sum_{\chi'}\chi'(h)\chi'(g)^{-1}
=\prod_{i=1}^s\left(\sum_{t=0}^{n_i-1}\zeta_i^{t(h_i-g_i)}\right)
=N\delta_{g,h}
$$

を得ます。[巡回群の文字の直交性](../FFT1/index.md#lem-fft1-character-orthogonality) を今度は $r=h_i-g_i$ に用いました。$g,h$ は固定し、文字の番号 $t$ が各軸で動きます。各差が法 $n_i$ で0なら $g=h$、そうでなければ少なくとも一つの因子が0です。

反転式の右辺へ [有限可換群のFourier変換の定義](#def-fft2-group-fourier) を代入すると

$$
N^{-1}\sum_\chi\sum_{h\in G}f(h)\chi(h)\chi(g)^{-1}
=N^{-1}\sum_{h\in G}f(h)N\delta_{g,h}
=f(g).
$$

有限和の交換と第二の等式を使いました。$N$ は非零の体の元なので逆元が存在します。変換は同じ次元 $N$ の空間の間の線形写像です。逆変換の行列を $B$ とすると $B_{g,\chi}=N^{-1}\chi(g)^{-1}$ です。上の計算は $BD_G=I_N$ を示します。第一の直交式により逆向きの積も

$$
(D_GB)_{\chi,\psi}=N^{-1}\sum_{g\in G}\chi(g)\psi(g)^{-1}
=\delta_{\chi,\psi}
$$

となります。従って任意の出力に対して逆写像が存在します。
<!-- proof-end -->

[有限可換群の文字の直交性と反転](#thm-fft2-group-inversion) を先ほどの $H_2\otimes H_2$ に適用します。この行列は対称で各成分の逆数が自分自身なので、逆行列は文字表の $1/4$ 倍です。例えば出力 $(10,-2,-4,0)$ を再び変換すると

$$
(10-2-4,\ 10+2-4,\ 10-2+4,\ 10+2+4)
=(4,8,12,16).
$$

4で割ると元に戻ります。

## 5. 標数2では何が退化するか

標数2では $-1=1$ です。従って形式的に同じ式で作った $H_2$ は全成分1の行列となり、二つの出力がともに $f(0)+f(1)$ です。非零入力 $(1,1)$ が零へ移るため反転できません。

これは正規化の係数2が零というだけではありません。任意の標数2の体で $a^2=1$ なら $(a-1)^2=0$、従って $a=1$ です。

群 $C_2^d$ の各生成元の文字の値は二乗が1なので、全ての文字が定数1の文字に一致します。したがって実際の文字表は1行 $2^d$ 列であり、形式的な $2^d\times 2^d$ のWalsh–Hadamard 行列とはサイズが異なります。後者は同じ文字を重複して並べた行列です。拡大体に移っても標数は同じなので、区別する文字を新たに得ることはできません。

対照的に標数2でも指数が奇数なら [有限Fourier変換の根の存在条件](#thm-fft2-splitting-condition) により適切な拡大体で変換が成立します。例えば $\mathbb F_4$ では乗法群が位数3であり、$C_3$ 上の3点変換を作れます。どの周期を選ぶかは、計算量だけでなく変換が存在するかどうかにも関係します。

## 6. 演習

### Level A

<a id="ex-fft2-a01"></a>

#### FFT2-A01 位数と指数
- Level: A
- ID: FFT2-A01

$C_{12}$、$C_2\times C_6$、$C_3\times C_4$ の位数と指数を求めよ。どの群が同型になり得ないか、指数から判定せよ。

<!-- solution-start -->
##### 詳細解答

位数はそれぞれ $12,2\cdot6,3\cdot4$ で全て12です。[巡回因子と群の指数](#prop-fft2-exponent-periods) から指数は $12,\operatorname{lcm}(2,6)=6,\operatorname{lcm}(3,4)=12$ です。同型写像は整数倍と0を保つので指数も保ちます。従って第2の群は第1・第3のどちらとも同型ではありません。第3の群では $(1,1)$ が位数12なので、全12元を生成し、第1の群と同型です。
<!-- solution-end -->

<a id="ex-fft2-a02"></a>

#### FFT2-A02 必要な根を調べる
- Level: A
- ID: FFT2-A02

$G=C_2\times C_4$ の変換を $\mathbb F_3,\mathbb F_5,\mathbb F_7,\mathbb F_9$ のそれぞれで全8文字を用いた可逆な変換を作れるか。

<!-- solution-start -->
##### 詳細解答

[巡回因子と群の指数](#prop-fft2-exponent-periods) により $e=4$、$N=8$ です。全て奇標数なので8は非零です。

[有限Fourier変換の根の存在条件](#thm-fft2-splitting-condition) により $4\mid q-1$ を判定します。$q-1$ は順に $2,4,6,8$ なので $\mathbb F_5,\mathbb F_9$ の二つだけで全8文字を用いた可逆な変換を作れます。$\mathbb F_3,\mathbb F_7$ では生成元の4乗が1になる値は1と $-1$ の二つだけです（乗法群の位数は2、6で、元の位数は4を割る必要があるためです）。2点軸にも二つの選択肢しかないので文字は4個で、8次元の入力を復元できません。

$\mathbb F_5$ では2の位数が4、$2^2=-1$ の位数が2なので両軸の根を具体的に取れます。
<!-- solution-end -->

<a id="ex-fft2-a03"></a>

#### FFT2-A03 文字の積
- Level: A
- ID: FFT2-A03

$G=C_2\times C_3$、$K=\mathbb F_7$ とする。根は $-1,2$ とする。$\chi_{(1,2)}(1,2)$ と $\chi_{(1,2)}\chi_{(1,1)}$ を求めよ。

<!-- solution-start -->
##### 詳細解答

法7で $2^3=1$、$2,2^2=4$ は1ではないので原始3乗根です。$-1$ は原始2乗根です。[直積群の文字の全列挙](#thm-fft2-product-characters) に従うと

$$
\chi_{(1,2)}(1,2)=(-1)^1 2^4=-16=5\pmod7.
$$

点ごとの積は添字の加法に対応し、$(1+1,2+1)=(0,0)$（法2、法3）です。従って積は定数1の文字になります。
<!-- solution-end -->

<a id="ex-fft2-a04"></a>

#### FFT2-A04 4点Walsh変換
- Level: A
- ID: FFT2-A04

有理数体上で $C_2^2$ の入力 $(2,0,1,-1)$ を辞書式順序で変換し、復元せよ。

<!-- solution-start -->
##### 詳細解答

[文字表のKronecker積表示](#thm-fft2-character-table-product) により $H_2\otimes H_2$ を使います。各行の和は

$$
2+0+1-1=2,\qquad 2-0+1+1=4,
$$

$$
2+0-1+1=2,\qquad 2-0-1-1=0.
$$

変換は $(2,4,2,0)$ です。[反転公式](#thm-fft2-group-inversion) に従い同じ表を掛けて4で割ります。

$$
\tfrac14(2+4+2,\ 2-4+2,\ 2+4-2,\ 2-4-2)
=(2,0,1,-1).
$$
<!-- solution-end -->

### Level B

<a id="ex-fft2-b01"></a>

#### FFT2-B01 直交性を平行移動から導く
- Level: B
- ID: FFT2-B01

有限可換群 $G$、体 $K$ と異なる二文字 $\chi,\psi$ に対し $\sum_{g\in G}\chi(g)\psi(g)^{-1}=0$ を、巡回分解を使わず証明せよ。同じ文字の場合も求めよ。

<!-- solution-start -->
##### 詳細解答

[体に値を取る双対群](#def-fft2-character-dual) の演算により $\eta=\chi\psi^{-1}$ は文字です。異なる二文字なら、ある $h$ で $\eta(h)\ne1$ です。$S=\sum_g\eta(g)$ とおきます。$g\mapsto g+h$ は逆写像 $g\mapsto g-h$ を持つため

$$
S=\sum_g\eta(g+h)=\sum_g\eta(g)\eta(h)=S\eta(h).
$$

従って $(1-\eta(h))S=0$ です。係数は非零なので逆元を掛け、$S=0$ を得ます。同じ文字なら各点で比は1なので和は $|G|1_K$ です。この議論には原始根の存在を使っていません。ただし十分な数の文字があることや、位数で割れることは別に確認しなければなりません。
<!-- solution-end -->

<a id="ex-fft2-b02"></a>

#### FFT2-B02 6点の変換を二軸で計算する
- Level: B
- ID: FFT2-B02

$\mathbb F_7$ 上で $G=C_2\times C_3$、根 $-1,2$ を用いる。入力を行 $g_1$、列 $g_2$ に並べた行列を

$$
X=\begin{pmatrix}1&2&0\\3&1&0\end{pmatrix}
$$

とする。第2軸、第1軸の順に変換せよ。周波数 $(1,2)$ は定義からも検算せよ。

<!-- solution-start -->
##### 詳細解答

根の位数は2と3で、$6\ne0$（法7）です。[体上の巡回Fourier変換](../FFT1/index.md#def-fft1-field-dft) により、第2軸の行 $(a,b,0)$ は $(a+b,a+2b,a+4b)$ になります。行番号 $g_1$ は固定し、列の周波数 $k_2$ を動かして

$$
Y_{g_1,k_2}=\sum_{g_2=0}^2 X_{g_1,g_2}2^{k_2g_2}
$$

を計算します。各行を計算すると

$$
Y=\begin{pmatrix}3&5&2\\4&5&0\end{pmatrix}
$$

です（第1行の最後は $1+8=9=2$、第2行の最後は $3+4=7=0$）。第1軸では各列の2点変換を行います。行番号は今や第2軸だけが変換済みの $g_1$、列番号は $k_2$ です。すなわち $Z_{0,k_2}=Y_{0,k_2}+Y_{1,k_2}$、$Z_{1,k_2}=Y_{0,k_2}-Y_{1,k_2}$ なので

$$
Z=\begin{pmatrix}0&3&2\\6&0&2\end{pmatrix}.
$$

直接 [有限可換群のFourier変換](#def-fft2-group-fourier) を使うと、$(1,2)$ の出力は

$$
(1+2\cdot4)-(3+1\cdot4)=9-7=2
$$

です。一般にも [直積群の文字の全列挙](#thm-fft2-product-characters) の積の表示を使えば

$$
\widehat f(k_1,k_2)=
\sum_{g_1=0}^1(-1)^{k_1g_1}
\left(\sum_{g_2=0}^2 X_{g_1,g_2}2^{k_2g_2}\right)
=\sum_{g_1=0}^1(-1)^{k_1g_1}Y_{g_1,k_2}.
$$

よって二軸の計算は定義と一致します。
<!-- solution-end -->

<a id="ex-fft2-b03"></a>

#### FFT2-B03 根が足りない場合
- Level: B
- ID: FFT2-B03

$\mathbb F_3$ に値を取る $C_4$ の文字を全て求め、文字表の階数を求めよ。$\mathbb F_9$ に拡大したとき何が変わるか。

<!-- solution-start -->
##### 詳細解答

文字は生成元での値 $a$ で決まり、$a^4=1$ が必要です。$\mathbb F_3^\times$ の二元1と $-1$ はいずれも条件を満たし、他の非零元はありません。従って文字表は

$$
\begin{pmatrix}1&1&1&1\\1&-1&1&-1\end{pmatrix}
$$

です。第1列、第2列の線形結合が零なら係数 $a,b\in\mathbb F_3$ は $a+b=0$ と $a-b=0$ を満たします。差を取ると $2b=0$ で、2は非零なので $b=0$、続いて $a=0$ です。従って二列は一次独立です。他の列はこの二列の繰り返しなので、列空間の [次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)（階数）はちょうど2です。入力 $(1,0,-1,0)$ はどちらの行との積和も $1-1=0$ になり、零へ移ります。非零入力が零と同じ出力になるため逆変換はありません。

$\mathbb F_9^\times$ は位数8の巡回群なので [根の存在条件](#thm-fft2-splitting-condition) により原始4乗根を持ちます。四つの文字があり、4は標数3で非零なので [有限可換群の文字の直交性と反転](#thm-fft2-group-inversion) が成立し、文字表の階数は4になります。位数で割れるだけでは元の体での反転は保証されません。
<!-- solution-end -->

<a id="ex-fft2-b04"></a>

#### FFT2-B04 標数2での失敗と奇数周期
- Level: B
- ID: FFT2-B04

任意の標数2の体 $K$ 上で $C_2^d$（$d\ge1$）の文字は一つしかないことを示せ。形式的な $H_2^{\otimes d}$ の階数を求めよ。また $\mathbb F_4$ 上で $C_3$ の変換を作れる理由を示せ。

<!-- solution-start -->
##### 詳細解答

各座標の生成元 $u_i$ について、文字 $\chi$ は $\chi(u_i)^2=1$ を満たします。標数2なので $(\chi(u_i)-1)^2=\chi(u_i)^2+1=0$ です。体では $\chi(u_i)=1$ となり、任意の元は生成元の和なので $\chi(g)=1$ です。従って文字は一つです。

形式的な行列では $H_2$ の全成分が1で、Kronecker積の全成分も1です。列は同一の非零列なので階数は1です。$2^d\ge2$ だから可逆ではありません。

一方 $\mathbb F_4$ では $q-1=3$ が3で割れ、群位数3は体の中で1です。[有限Fourier変換の根の存在条件](#thm-fft2-splitting-condition) により原始3乗根が存在します。[有限可換群の文字の直交性と反転](#thm-fft2-group-inversion) を適用すると3点変換は可逆です。
<!-- solution-end -->

### Level C

<a id="ex-fft2-c01"></a>

#### FFT2-C01 同じ位数でも変換の条件は異なる
- Level: C
- ID: FFT2-C01

$G=C_2\times C_6$、$H=C_{12}$ を考える。

1. $\mathbb F_7$ 上でどちらの群の可逆な文字表が作れるか判定せよ。
2. 作れる方について、根を $-1,3$ とし、入力は $(0,0)$ で2、$(1,1)$ で3、それ以外で0とする。全周波数の変換を2行6列で求めよ。
3. 反転公式で $(1,1)$ と $(0,1)$ の値を復元せよ。
4. もう一方の群について $\mathbb F_{49}$ では可逆になるか判定せよ。

<!-- solution-start -->
##### 詳細解答

1. 位数は両方12ですが、[巡回因子と群の指数](#prop-fft2-exponent-periods) によれば指数は $6,12$ です。$\mathbb F_7$ で $12=5\ne0$、$q-1=6$ です。

   [根の存在条件](#thm-fft2-splitting-condition) により $G$ では可逆な文字表が得られ、$H$ では原始12乗根がありません。$H$ の文字は生成元での値で決まり、非零元は6個しかないので12次元の入力を反転できません。

2. 法7で3の冪は順に $1,3,2,6,4,5$、次が1です。従って原始6乗根です。$-1$ は原始2乗根です。[有限可換群のFourier変換](#def-fft2-group-fourier) に二つの非零入力を代入すると

$$
\widehat f(k,\ell)=2+3(-1)^k3^\ell.
$$

第0行では $3\cdot3^\ell$ が $3,2,6,4,5,1$ と並ぶので、2を足した値は $5,4,1,6,0,3$ です。第1行ではそれらを2から引いて $6,0,3,5,4,1$ を得ます。

$$
\widehat f=
\begin{pmatrix}5&4&1&6&0&3\\6&0&3&5&4&1\end{pmatrix}.
$$

3. [有限可換群の文字の直交性と反転](#thm-fft2-group-inversion) により係数は $12^{-1}=5^{-1}=3$ です。$(1,1)$ の場合、文字の逆数は $(-1)^k3^{-\ell}$ です。第0行から第1行を引くと法7で

$$
(6,4,5,1,3,2).
$$

逆冪 $3^{-\ell}$ は $1,5,4,6,2,3$ なので積和は

$$
6+20+20+6+6+6=64=1\pmod7.
$$

従って復元値は $3\cdot1=3$ です。

$(0,1)$ の場合は二行を足すので、各成分が4になります。逆冪との積和は $4(1+5+4+6+2+3)=84=0$（法7）です。3を掛けても0です。

4. $\mathbb F_{49}$ の乗法群の位数は48で、12が48を割ります。標数7で12は非零です。従って [有限Fourier変換の根の存在条件](#thm-fft2-splitting-condition) により原始12乗根が存在します。[有限可換群の文字の直交性と反転](#thm-fft2-group-inversion) を適用すると $H$ の変換も可逆です。
<!-- solution-end -->

## 7. 次講への接続

有限可換群上では、各巡回因子の変換を順に施して全体の変換を作れます。次講では一つの巡回群の添字を分解し、群の直積にならない場合にどんな追加係数（回転因子）が必要になるのかを調べます。ここで得た文字表の積は、後に固定radixのテンソル冪を計算するときにも使います。

## 参考文献

- E. M. Stein, R. Shakarchi, *Fourier Analysis: An Introduction*, Princeton University Press, 2003, Chapter 7（有限群のFourier解析）。
- C. Van Loan, *Computational Frameworks for the Fast Fourier Transform*, SIAM, 1992, Chapter 1（Kronecker積と変換行列）。
