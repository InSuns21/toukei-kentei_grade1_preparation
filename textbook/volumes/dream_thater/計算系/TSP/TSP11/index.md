# TSP11 スペクトル点：加法性・乗法性・単調性・正規化

前講では、資源を並べる操作を和、組み合わせる操作を積、資源を変換できる関係を前順序とする[前順序付き可換半環](../TSP10/index.md#def-tsp10-preordered-semiring)を作りました。[自然数による上下の評価](../TSP10/index.md#thm-tsp10-order-rank)によって、資源を作る費用と資源から取り出せる量を測れます。

しかし、テンソルの階数を直接計算するのは難しく、積の階数が各階数の積になるとも限りません。そこで、和と積を正確に数の和と積へ変換し、資源の比較を保つ数値の測り方を探します。この測り方を一つ見つけるだけでも、反復計算の費用に下界を与えられます。

## 1. 資源を実数へ写す

以下、$\mathbb N_0$ は0を含む自然数全体、$\mathbb R_{\ge0}$ は非負実数全体です。後者には通常の和・積・大小関係を入れます。半環の零と一をそれぞれ実数の0と1へ送り、資源を並べれば値を足し、組み合わせれば値を掛けることにします。さらに、資源 $b$ から $a$ を作れるなら、$a$ の値が $b$ の値を超えないことを要求します。

<a id="def-tsp11-spectral-point"></a>

<!-- formal-statement-start -->
> **定義（スペクトル点）**
>
> [前順序付き可換半環](../TSP10/index.md#def-tsp10-preordered-semiring) $(S,\preceq)$ に対し、写像 $\phi:S\to\mathbb R_{\ge0}$ が次を満たすとき、スペクトル点という。
>
> 正規化：

$$
\phi(0)=0,\qquad \phi(1)=1.
$$

> 加法性・乗法性：任意の $a,b\in S$ について

$$
\phi(a+b)=\phi(a)+\phi(b),\qquad
\phi(ab)=\phi(a)\phi(b).
$$

> 単調性：任意の $a,b\in S$ について

$$
a\preceq b\ \Longrightarrow\ \phi(a)\le\phi(b).
$$

> これらの写像全体の集合を $\Delta(S,\preceq)$ と書き、漸近スペクトルと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp11-spectral-point -->
**定義の確認**。$S=\mathbb N_0^2$ に成分ごとの演算と大小関係を入れます。この半環の零は $(0,0)$、一は $(1,1)$ です。第1成分を取り出す写像 $\phi_1(a_1,a_2)=a_1$ を考えます。値は非負実数であり、

$$
\phi_1(0,0)=0,\qquad \phi_1(1,1)=1.
$$

任意の $a=(a_1,a_2),b=(b_1,b_2)$ について

$$
\phi_1(a+b)=a_1+b_1=\phi_1(a)+\phi_1(b),
$$

$$
\phi_1(ab)=a_1b_1=\phi_1(a)\phi_1(b).
$$

また $a\preceq b$ なら第1成分で $a_1\le b_1$ なので単調性も成立します。第2成分を取り出す $\phi_2(a)=a_2$ についても、和と積の第2成分がそれぞれ $a_2+b_2$ と $a_2b_2$ であり、零・一の第2成分は0と1、比較は $a_2\le b_2$ を含みます。従って両方がスペクトル点です。
<!-- definition-example-end -->

例えば $(2,5)$ に対して $\phi_1$ は2、$\phi_2$ は5を返します。一つの資源にも複数の測り方があり得ます。この例はスペクトル点の定義を確認するためのもので、前講で見たように $\mathbb N_0^2$ の成分順序は[Strassen前順序](../TSP10/index.md#def-tsp10-strassen-preorder)の有界性を満たしません。

条件の違いも重要です。$S=\mathbb N_0$ に通常の演算と大小を入れ、$f(n)=n^2$ とすると、正規化・単調性・乗法性は満たします。しかし

$$
f(1+1)=4,\qquad f(1)+f(1)=2
$$

なので加法性がありません。積の費用を評価できそうでも、並べる操作と整合しない写像はスペクトル点ではありません。

## 2. 自然数と冪を正確に測る

資源の数え方が普通の数え方と一致するかを確認します。[自然数からの標準写像](../TSP10/index.md#thm-tsp10-natural-map)を $\iota$ とし、$\iota(n)$ は半環の一を $n$ 個加えた元とします。また $a^0=1$、$a^{n+1}=a^na$ とします。

<a id="thm-tsp11-normalization-powers"></a>

<!-- formal-statement-start -->
> **定理（スペクトル点の自然数値と冪）**
>
> 前順序付き可換半環 $S$ のスペクトル点 $\phi$ に対し、任意の $a\in S$ と $m,n\in\mathbb N_0$ について

$$
\phi(\iota(n))=n,\qquad \phi(a^n)=\phi(a)^n,
$$

$$
\phi(\iota(m)a^n)=m\phi(a)^n.
$$

> ここで指数0の冪は底が0でも1とする。
<!-- formal-statement-end -->

自然数は一を足して作るので値が固定され、積を繰り返す場合は値も同じ回数だけ掛ければよいのです。

<!-- proof-start -->
### 証明

$\phi(\iota(0))=\phi(0)=0$ です。$\phi(\iota(n))=n$ を仮定すると、標準写像の定義、加法性、正規化によって

$$
\phi(\iota(n+1))
=\phi(\iota(n)+1)=n+1.
$$

従って帰納法により全ての $n$ に対して自然数値の公式が成立します。冪についても $\phi(a^0)=\phi(1)=1$ から出発し、

$$
\phi(a^{n+1})=\phi(a^na)
=\phi(a^n)\phi(a)=\phi(a)^{n+1}
$$

と帰納します。最後に乗法性を $\iota(m),a^n$ に適用すれば

$$
\phi(\iota(m)a^n)=\phi(\iota(m))\phi(a^n)
=m\phi(a)^n
$$

です。
<!-- proof-end -->

例えば第1成分の写像で $a=(2,5)$ とすると、$\iota(3)=(3,3)$、$a^2=(4,25)$ です。積は $(12,75)$ なので第1成分の値は12、第2成分の値は75です。公式でも $3\cdot2^2=12$ と $3\cdot5^2=75$ が得られます。

## 3. 費用と取り出し能力を挟む

[Strassen前順序](../TSP10/index.md#def-tsp10-strassen-preorder)を仮定すると、自然数を半環に忠実に埋め込めるため、以後 $\iota(n)$ を単に $n$ と書けます。[自然数による上下の評価](../TSP10/index.md#thm-tsp10-order-rank)に従い、$R_S(a)$ を $a\preceq n$ となる最小の自然数、$Q_S(a)$ を $n\preceq a$ となる最大の自然数とします。このとき整数である二つの値の間に、より細かい実数の値を置けます。

<a id="thm-tsp11-order-bounds"></a>

<!-- formal-statement-start -->
> **定理（スペクトル点による上下界）**
>
> Strassen前順序を持つ前順序付き可換半環 $(S,\preceq)$ と $\phi\in\Delta(S,\preceq)$ に対し、任意の $a\in S$ について

$$
Q_S(a)\le\phi(a)\le R_S(a).
$$

> さらに $a\ne0$ なら $\phi(a)>0$ である。
<!-- formal-statement-end -->

数として比較するための橋は単調性です。自然数側の値が動かないため、資源側の値の範囲を制限できます。

<!-- proof-start -->
### 証明

[自然数による上下の評価](../TSP10/index.md#thm-tsp10-order-rank)から両極値が存在し、

$$
Q_S(a)\preceq a\preceq R_S(a)
$$

が成立します。単調性を二つの比較に適用して

$$
\phi(Q_S(a))\le\phi(a)\le\phi(R_S(a)).
$$

[スペクトル点の自然数値と冪](#thm-tsp11-normalization-powers)によれば両端はそれぞれ $Q_S(a),R_S(a)$ なので主張の不等式を得ます。

$a\ne0$ の場合、Strassen前順序の有界性を左辺の元 $1$、右辺の元 $a$ に適用します。ある正整数 $r$ について $1\preceq ra$ となります。単調性と自然数値・乗法性を使うと

$$
1=\phi(1)\le\phi(ra)=r\phi(a).
$$

$r>0$ で割れば $\phi(a)\ge1/r>0$ です。
<!-- proof-end -->

例として非負有理数の半環 $S=\mathbb Q_{\ge0}$ に通常の大小を入れます。自然数の大小は忠実であり、任意の $b>0,a\ge0$ に対し $r\ge\max(1,a/b)$ となる整数を取れば $a\le rb$ です。従ってStrassen前順序です。包含写像 $\phi(a)=a$ は通常の和・積・大小・0・1を保ちます。$a=5/2$ では

$$
Q_S(a)=2,\quad \phi(a)=5/2,\quad R_S(a)=3.
$$

抽象半環では非零でも値が1未満になることがあります。例えば $a=1/2$ は非零で $\phi(a)=1/2$ です。有界性から出る結論は正値性であって、一般には1以上とは限りません。

## 4. テンソルの平坦化から実際に構成する

[テンソルの半環構成](../TSP10/index.md#thm-tsp10-tensor-semiring)に従い、体 $K$、因子数 $d\ge2$ を固定し、有限次元テンソルの制限同値類 $[t]$ からなる半環を $S_{K,d}$ とします。和は直和、積はKronecker積、比較は制限です。

[テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening)では、因子位置を二つの非空集合 $I,J$ に分け、$I$ 側の添字の組を行、$J$ 側を列とする行列 $F_{I|J}(t)$ を作りました。例えば三因子の第1因子を行、第2・第3因子を列にすると、三添字の係数を二添字に並べ直せます。その行列の階数（列空間の次元）がスペクトル点になることを示します。単に階数下界であるだけでは加法性・乗法性が従わないため、ここではそれぞれ証明します。

<a id="thm-tsp11-flattening-spectral-point"></a>

<!-- formal-statement-start -->
> **定理（平坦化階数によるスペクトル点）**
>
> 体 $K$ と因子数 $d\ge2$ を固定し、位置集合 $\{1,\ldots,d\}$ の二つの非空集合への分割 $I\sqcup J$ を固定する。テンソルの制限同値類の半環 $S_{K,d}$ 上の写像

$$
\phi_{I|J}([t])=\operatorname{rank}_K F_{I|J}(t)
$$

> は代表元によらず定まり、スペクトル点である。
<!-- formal-statement-end -->

証明の鍵は、局所線形写像が平坦化した行列の左右からの行列積として現れることです。また直和では非零成分が別々の行・列に置かれ、Kronecker積では行・列の添字がそれぞれ組になります。

<!-- proof-start -->
### 証明

**比較と代表元独立性。** $u\preceq t$ とします。[テンソルの制限](../TSP4/index.md#def-tsp4-restriction)により、因子ごとの線形写像 $A_k$ が存在し、$u=(\bigotimes_{k=1}^d A_k)t$ です。第 $k$ 因子の入力基底番号を $i_k$、出力基底番号を $j_k$ とすると、

$$
u_{j_1\ldots j_d}
=\sum_{i_1,\ldots,i_d}
t_{i_1\ldots i_d}\prod_{k=1}^d(A_k)_{j_k i_k}.
$$

$I,J$ 内の添字を昇順にまとめます。行側に作用する行列を $B_I$、列側に作用する行列を $B_J$ とし、それぞれの成分を

$$
(B_I)_{\boldsymbol j_I,\boldsymbol i_I}
=\prod_{k\in I}(A_k)_{j_k i_k},\qquad
(B_J)_{\boldsymbol j_J,\boldsymbol i_J}
=\prod_{k\in J}(A_k)_{j_k i_k}
$$

とします。例えば $B_I$ の行数は $I$ に属する出力次元の積、列数は入力次元の積です。上の成分式で和を行側と列側に分ければ

$$
F_{I|J}(u)=B_I F_{I|J}(t) B_J^{\mathsf T}
$$

となります。右からの積では各列が元の列の線形結合になり、左からの積では列空間を線形写像 $B_I$ で送ります。どちらも次元を増やさないので

$$
\operatorname{rank}_K F_{I|J}(u)
\le\operatorname{rank}_K F_{I|J}(t).
$$

[制限同値](../TSP5/index.md#def-tsp5-restriction-equivalence)な二つの代表元にはこの不等式を両方向に適用できるので値が一致します。従って写像は定義でき、単調です。

**正規化。** 半環の零は零テンソルの類なので平坦化の全成分は0、階数は0です。一は全因子が1次元で係数1のテンソルの類なので平坦化は $1\times1$ 行列 $(1)$、階数は1です。

**加法性。** [テンソルの直和](../TSP5/index.md#def-tsp5-direct-sum)では各因子の基底を $t$ 用と $s$ 用に分け、すべての添字が $t$ 用の場合だけ $t$ の係数、すべてが $s$ 用の場合だけ $s$ の係数が現れます。行の添字の組も列の添字の組も、すべて $t$ 用、すべて $s$ 用、それ以外の三群に分けます。$I,J$ は非空なので各群は重なりません。群の順に並べ直すと

$$
F_{I|J}(t\oplus s)=
\begin{pmatrix}
M&0&0\\
0&N&0\\
0&0&0
\end{pmatrix}
$$

という形になります（$M=F_{I|J}(t),N=F_{I|J}(s)$）。零ブロックは長方形でもよく、群が空なら対応する行・列を省きます。列の並べ替えは列空間を変えず、行の並べ替えは可逆な座標変換なので階数を変えません。$M$ の列は第1群の行だけ、$N$ の列は第2群の行だけに支えを持ちます。それぞれの列空間の基底を並べた集合は独立であり、全列を張ります。従って階数は $\operatorname{rank} M+\operatorname{rank} N$ です。

**乗法性。** [テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker)では各因子の添字は $t$ 側と $s$ 側の組になり、対応する成分は両テンソルの成分の積です。行・列それぞれの添字を並べ替えれば

$$
F_{I|J}(t\boxtimes s)_{(\alpha,\gamma),(\beta,\delta)}
=M_{\alpha\beta}N_{\gamma\delta}
$$

となります。$\alpha,\beta$ は $t$ の行・列番号、$\gamma,\delta$ は $s$ の行・列番号です。従って列 $(\beta,\delta)$ は $M$ の第 $\beta$ 列と $N$ の第 $\delta$ 列のテンソル積です。

$M$ の列空間の基底を $x_1,\ldots,x_p$、$N$ の列空間の基底を $y_1,\ldots,y_q$ とし、いずれも実際の列から選びます。任意の列を $m_\beta=\sum_i c_i x_i$、$n_\delta=\sum_j d_j y_j$ と書くと

$$
m_\beta\otimes n_\delta
=\sum_{i=1}^p\sum_{j=1}^q c_i d_j(x_i\otimes y_j).
$$

従って全列は $pq$ 本の $x_i\otimes y_j$ の線形包に入ります。各基底は実際の列から選んだので、これら $pq$ 本も積行列の列です。さらに $x_i,y_j$ をそれぞれの全行座標空間の基底に延長すると、[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis)によってそれらの積は独立です。よって列空間の次元は $pq$ です。$p=0$ または $q=0$ のときは全列が零なので階数は0となり、同じ公式が成立します。

以上より四条件をすべて満たします。
<!-- proof-end -->

三因子で異なる測り方を実際に比べましょう。各因子に基底 $e_1,e_2$ を取って

$$
t=e_1\otimes e_1\otimes e_1+e_1\otimes e_2\otimes e_2
$$

とします。行を第1因子とし、列を第2・第3因子の順で $(1,1),(1,2),(2,1),(2,2)$ とすると

$$
F_{1|23}(t)=
\begin{pmatrix}1&0&0&1\\0&0&0&0\end{pmatrix}.
$$

列空間は $(1,0)^{\mathsf T}$ の張る1次元空間です。一方、行を第2因子とし、列を第1・第3因子の同じ順にすると

$$
F_{2|13}(t)=
\begin{pmatrix}1&0&0&0\\0&1&0&0\end{pmatrix}.
$$

最初の二列が独立なので階数は2です。従って $\phi_{1|23}([t])=1$ と $\phi_{2|13}([t])=2$ となります。同じテンソルに対して異なるスペクトル点が実際に異なる値を取ります。

## 5. 反復計算に対する上下界

ここから係数体を $\mathbb C$ に固定し、[漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank)を使います。反復回数 $n$ に対し $t^{\boxtimes n}$ は $t$ を $n$ 回Kronecker積したテンソルです。階数と劣階数の $n$ 乗根の極限は、それぞれ $\widetilde R(t),\widetilde Q(t)$ でした。

スペクトル点では $n$ 回積を取って $n$ 乗根を戻すと、元の値がちょうど得られます。この性質によって一回分の評価を反復計算全体へ延長できます。

<a id="thm-tsp11-asymptotic-spectral-bounds"></a>

<!-- formal-statement-start -->
> **定理（漸近階数・漸近劣階数のスペクトル評価）**
>
> $t$ を複素数体上の有限次元 $d$ 因子テンソル（$d\ge2$）、$\phi$ を $S_{\mathbb C,d}$ のスペクトル点とする。このとき

$$
\widetilde Q(t)\le\phi([t])\le\widetilde R(t).
$$

> さらに二つのテンソル $s,t$ に対して、ある $\phi$ が $\phi([s])>\phi([t])$ を満たせば、どの正整数 $n$ についても $s^{\boxtimes n}\preceq t^{\boxtimes n}$ は成立しない。
<!-- formal-statement-end -->

証明では反復回数ごとに前節までの評価を適用し、最後に極限を取ります。比較を否定するには、すべての測り方を探す必要はなく、矛盾する測り方を一つ見つければ十分です。

<!-- proof-start -->
### 証明

[テンソルのStrassen前順序](../TSP10/index.md#thm-tsp10-tensor-strassen)により、[スペクトル点による上下界](#thm-tsp11-order-bounds)を $a=[t]^n=[t^{\boxtimes n}]$ に適用できます。[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction)と[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank)により $R_S(a)=R(t^{\boxtimes n})$、$Q_S(a)=Q(t^{\boxtimes n})$ です。

[スペクトル点の自然数値と冪](#thm-tsp11-normalization-powers)を合わせると

$$
Q(t^{\boxtimes n})\le\phi([t])^n
\le R(t^{\boxtimes n}).
$$

全て非負なので、正整数 $n$ に対する $n$ 乗根は大小を保ちます。従って

$$
Q(t^{\boxtimes n})^{1/n}\le\phi([t])
\le R(t^{\boxtimes n})^{1/n}.
$$

[テンソル冪の階数と劣階数の増大率](../TSP9/index.md#thm-tsp9-limit-existence)により両端の極限は存在し、零テンソルの場合にも両端は0です。$n\to\infty$ とすれば求める不等式になります。

次に仮に $s^{\boxtimes n}\preceq t^{\boxtimes n}$ が成り立つと、単調性と冪の公式から

$$
\phi([s])^n\le\phi([t])^n
$$

となります。非負実数の $n$ 乗根を取れば $\phi([s])\le\phi([t])$ です。仮定の厳密不等式と矛盾します。
<!-- proof-end -->

第4節の $t$ では、明示した二項の分解から $R(t)\le2$ です。$\phi_{2|13}([t])=2$ を用いると $\widetilde R(t)\ge2$。一方 $R(t^{\boxtimes n})\le R(t)^n$ が[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)の反復で従うので $\widetilde R(t)\le2$ です。従って $\widetilde R(t)=2$ です。

また $\phi_{1|23}([t])=1$ なので $\widetilde Q(t)\le1$。$t$ の各因子で $e_1$ を1、$e_2$ を0へ送る線形写像を使うと $t$ から一次元の係数1を得られます。これを $n$ 回の積に施せば $Q(t^{\boxtimes n})\ge1$ であり、$\widetilde Q(t)=1$ です。異なるスペクトル点を使うことで、同じテンソルの漸近階数と漸近劣階数をそれぞれ決定できました。

## 6. 演習

### Level A

<a id="ex-tsp11-a01"></a>

#### TSP11-A01

- Level: A

$\mathbb N_0^2$ に成分ごとの和・積・大小を入れる。$\phi(a,b)=b$ がスペクトル点であることを四条件で確かめ、$\phi((2,3)^2+(1,4))$ を求めよ。

<!-- solution-start -->
**詳細解答**。零と一は $(0,0),(1,1)$ であり、$\phi(0,0)=0,\phi(1,1)=1$ です。$x=(a,b),y=(c,d)$ について $\phi(x+y)=b+d=\phi(x)+\phi(y)$、$\phi(xy)=bd=\phi(x)\phi(y)$ です。$x\preceq y$ なら $b\le d$ なので単調性も成立します。$(2,3)^2=(4,9)$、これに $(1,4)$ を足すと $(5,13)$ です。従って値は13です。
<!-- solution-end -->

<a id="ex-tsp11-a02"></a>

#### TSP11-A02

- Level: A

通常の半環 $\mathbb N_0$ 上の $f(n)=2n$ はスペクトル点のどの条件を満たし、どの条件を満たさないか。

<!-- solution-start -->
**詳細解答**。$n\le m$ なら $2n\le2m$ で単調です。また $f(n+m)=2(n+m)=2n+2m$ で加法性を満たします。$f(0)=0$ ですが $f(1)=2\ne1$ で正規化に失敗します。乗法性について $n=m=1$ とすれば $f(nm)=2$ に対し $f(n)f(m)=4$ です。従って乗法性もありません。
<!-- solution-end -->

<a id="ex-tsp11-a03"></a>

#### TSP11-A03

- Level: A

前順序付き可換半環 $S$ のスペクトル点 $\phi$ が $\phi(a)=3/2$ を満たすとする。$5a^2+2a$ の値を求めよ。自然数は標準写像で入れるものとする。

<!-- solution-start -->
**詳細解答**。[スペクトル点の自然数値と冪](#thm-tsp11-normalization-powers)から $\phi(5a^2)=5(3/2)^2=45/4$、$\phi(2a)=2(3/2)=3$ です。加法性により和の値は $45/4+12/4=57/4$ です。
<!-- solution-end -->

<a id="ex-tsp11-a04"></a>

#### TSP11-A04

- Level: A

非負有理数の通常の半環と大小において、$a=7/3$ とする。$R_S(a),Q_S(a)$ および包含写像による値を求めよ。$a^2$ についても同じ三つの値を求めよ。

<!-- solution-start -->
**詳細解答**。$2=6/3<7/3<9/3=3$ なので、自然数の上側の最小値は3、下側の最大値は2です。包含写像による値は $7/3$ です。$a^2=49/9$ について $5=45/9<49/9<54/9=6$ なので、$R_S(a^2)=6,Q_S(a^2)=5,\phi(a^2)=49/9$ です。$R_S(a)^2=9$ とは異なり、整数の費用は一般に乗法的でないことも確認できます。
<!-- solution-end -->

### Level B

<a id="ex-tsp11-b01"></a>

#### TSP11-B01

- Level: B

通常の半環 $\mathbb Q_{\ge0}$ 上のスペクトル点は包含写像に限ることを示せ。

<!-- solution-start -->
**詳細解答**。任意の $x\in\mathbb Q_{\ge0}$ は $x=m/n$（$m\in\mathbb N_0,n\ge1$ は整数）と書けます。[スペクトル点の自然数値と冪](#thm-tsp11-normalization-powers)から $\phi(m)=m,\phi(n)=n$。$nx=m$ なので乗法性より

$$
n\phi(x)=\phi(n)\phi(x)=\phi(nx)=\phi(m)=m.
$$

$n>0$ で割れば $\phi(x)=m/n=x$ です。逆に包含写像は0と1、和、積、大小を保つので定義を満たします。よって一意です。
<!-- solution-end -->

<a id="ex-tsp11-b02"></a>

#### TSP11-B02

- Level: B

$\mathbb N_0^2$ に成分ごとの演算と大小を入れる。$g(a,b)=(a+b)/2$ が正規化、加法性、単調性を満たす一方で乗法性を満たさないことを示せ。二つのスペクトル点の平均が必ずしもスペクトル点でない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$g(0,0)=0$、$g(1,1)=1$。$x=(a,b),y=(c,d)$ について

$$
g(x+y)=\frac{a+c+b+d}{2}=g(x)+g(y).
$$

$a\le c,b\le d$ なら $a+b\le c+d$ で $g(x)\le g(y)$ です。しかし $x=(1,0),y=(0,1)$ とすると $xy=(0,0)$ なので $g(xy)=0$、一方 $g(x)g(y)=1/4$ です。乗法性は破れます。第1・第2成分の写像の平均が $g$ ですが、平均の積には一方の写像の値と他方の写像の値を掛けた項が現れるため、積を取ってから平均した値とは一般に一致しません。
<!-- solution-end -->

<a id="ex-tsp11-b03"></a>

#### TSP11-B03

- Level: B

各因子を $\mathbb C^2$ とし、基底を $e_1,e_2$ とする。$s=e_1\otimes e_1\otimes e_1+e_2\otimes e_1\otimes e_2$ について、$F_{1|23}(s),F_{2|13}(s)$ を書き、対応するスペクトル点の値を求めよ。

<!-- solution-start -->
**詳細解答**。[テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening)に従い、どちらも列の組を $(1,1),(1,2),(2,1),(2,2)$ の順に置きます。非零係数は $(i,j,k)=(1,1,1),(2,1,2)$ の二つで、それぞれ1です。行を $i$ とすれば列は $(j,k)=(1,1),(1,2)$ なので

$$
F_{1|23}(s)=\begin{pmatrix}1&0&0&0\\0&1&0&0\end{pmatrix}.
$$

行を $j$ とすれば列は $(i,k)=(1,1),(2,2)$ で、どちらの行番号も1です。

$$
F_{2|13}(s)=\begin{pmatrix}1&0&0&1\\0&0&0&0\end{pmatrix}.
$$

前者は最初の二列が独立、後者は第1列だけで全列を張るため、階数は順に2と1です。[平坦化階数によるスペクトル点](#thm-tsp11-flattening-spectral-point)によりこれらは $\phi_{1|23}([s])=2$ と $\phi_{2|13}([s])=1$ を与えます。
<!-- solution-end -->

<a id="ex-tsp11-b04"></a>

#### TSP11-B04

- Level: B

Strassen前順序を持つ半環 $S$ において、スペクトル点 $\phi$ と元 $a,b$ が $a^3\preceq 4b^3$、$\phi(b)=2$ を満たす。$\phi(a)$ の上界を求めよ。さらに、$\phi(a)=4$ なら与えた比較が不可能であることを示せ。

<!-- solution-start -->
**詳細解答**。単調性により $\phi(a^3)\le\phi(4b^3)$ です。[スペクトル点の自然数値と冪](#thm-tsp11-normalization-powers)を適用すると

$$
\phi(a)^3\le4\phi(b)^3=4\cdot8=32.
$$

非負実数の三乗根を取って $\phi(a)\le2\sqrt[3]{4}$ です。もし $\phi(a)=4$ なら $64\le32$ となり矛盾するので、比較は成立しません。
<!-- solution-end -->

### Level C

<a id="ex-tsp11-c01"></a>

#### TSP11-C01

- Level: C

各因子を $\mathbb C^2$ とし、基底を $e_1,e_2$ とする。

$$
s=e_1\otimes e_1\otimes e_1+e_2\otimes e_1\otimes e_2,\qquad
t=e_1\otimes e_1\otimes e_1+e_1\otimes e_2\otimes e_2.
$$

任意の正整数 $n$ について $s^{\boxtimes n}\preceq t^{\boxtimes n}$ もその逆も成立しないことを示せ。一方、$s,t$ の漸近階数と漸近劣階数はそれぞれ一致することを証明せよ。

<!-- solution-start -->
**詳細解答**。[平坦化階数によるスペクトル点](#thm-tsp11-flattening-spectral-point)を二通り用います。行を第1因子にすると $s$ の非零成分は行1・列 $(1,1)$ と行2・列 $(1,2)$ にあり、独立な二列を持つので階数2です。$t$ の非零成分は行1・列 $(1,1),(2,2)$ にあり、階数1です。行を第2因子にすると $s$ の非零成分は行1・列 $(1,1),(2,2)$、$t$ の非零成分は行1・列 $(1,1)$ と行2・列 $(1,2)$ です。従って

$$
\phi_{1|23}([s])=2,\quad \phi_{1|23}([t])=1,
$$

$$
\phi_{2|13}([s])=1,\quad \phi_{2|13}([t])=2.
$$

もし $s^{\boxtimes n}\preceq t^{\boxtimes n}$ なら第1の写像の単調性と乗法性から $2^n\le1$、逆なら第2の写像から $2^n\le1$ です。$n\ge1$ なのでどちらも矛盾します。

次に [漸近階数・漸近劣階数のスペクトル評価](#thm-tsp11-asymptotic-spectral-bounds) を二つの写像に適用します。どちらのテンソルにも値2を取る写像と値1を取る写像があるので

$$
\widetilde R(s),\widetilde R(t)\ge2,\qquad
\widetilde Q(s),\widetilde Q(t)\le1.
$$

一方、$s,t$ の各表示は単純テンソル二項の和です。$n$ 回積を分配すれば、それぞれ各反復で二項のいずれかを選ぶ $2^n$ 項の単純テンソルの和になります。従って $R(s^{\boxtimes n}),R(t^{\boxtimes n})\le2^n$。また各因子で $e_1\mapsto1,e_2\mapsto0$ とする線形写像を各反復に作用させれば両方から係数1の対角テンソルを得ます。従って $Q(s^{\boxtimes n}),Q(t^{\boxtimes n})\ge1$ です。$n$ 乗根の極限を取ると

$$
\widetilde R(s)=\widetilde R(t)=2,\qquad
\widetilde Q(s)=\widetilde Q(t)=1.
$$

二つの極値が等しくても資源の比較は決まりません。個々のスペクトル点を調べる理由がここにあります。
<!-- solution-end -->

## 7. 次講への接続

スペクトル点は半環の和・積を正確に保ち、制限によって増えない実数値です。平坦化階数は実際にその条件を満たし、漸近階数の下界と漸近劣階数の上界の両方を与えました。

次の問いは、すべてのスペクトル点を集めればこれらの漸近量を完全に復元できるか、というものです。本講で示したのは各点による不等式です。その逆向きの評価や極値の達成には新しい定理が必要になります。次講ではStrassenの漸近スペクトル双対性を扱います。
