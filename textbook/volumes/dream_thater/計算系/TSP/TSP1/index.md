# TSP1 多重線形写像・テンソル積・基底表示と普遍性

線形写像は一つの入力を足し算とスカラー倍に従って処理します。しかし行列積では二つの入力があり、一方を固定して初めて他方に関して線形になります。三つ以上の入力を持つ計算でも、入力の組そのものを足すだけではこの性質を表せません。

[LA3Eのテンソル積](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)では実数・複素数上の二つの空間について、二重線形な操作を一つの線形写像へ置き換えました。本講では係数を任意の体に広げ、因子を有限個並べた場合にも同じ構成ができることを確かめます。計算量を調べるためには、何個の係数で一つのテンソルを表せるかと、座標の選び方を変えても同じ対象を扱っている理由が重要です。

## 1. 引数を一つずつ動かす

係数体を $K$ とし、$K$ は[体](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field)とします。各 $V_a$ は[体上のベクトル空間](../../../代数系/FLD/FLD0/index.md#def-fld0-vector-space-over-field)で、$a$ は入力の位置を表します。本講の入力空間は有限次元とします。出力空間 $W$ には有限次元性を要求しません。

例えば $K^2\times K^2\to K$ の写像 $b((x,y),(s,t))=xs+yt$ は、一方のベクトルを固定すれば他方の線形写像です。引数の位置ごとにこの条件を課すと、三つ以上の異なる入力空間にも拡張できます。

<a id="def-tsp1-multilinear-map"></a>

<!-- formal-statement-start -->
> **定義（多重線形写像）**
>
> 体 $K$ 上のベクトル空間 $V_1,\ldots,V_d,W$ と整数 $d\ge1$ を取る。写像 $b:V_1\times\cdots\times V_d\to W$ が、任意の位置 $a$ について他の入力を固定したとき $V_a$ から $W$ への $K$ 線形写像になるとき、多重線形写像という。すなわち任意の $u,v\in V_a$、$\lambda,\mu\in K$ と固定された他の入力について
>
$$
b(\ldots,\lambda u+\mu v,\ldots)
=\lambda b(\ldots,u,\ldots)+\mu b(\ldots,v,\ldots).
$$
>
> $d=2$ の場合を双線形写像ともいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp1-multilinear-map -->
**定義の確認**。$V_1=K^2,V_2=K,V_3=K,W=K^2$ として $b((x,y),s,t)=(xst,yst)$ と置きます。出力は確かに $K^2$ に属します。第1入力について

$$
\begin{aligned}
b(\lambda(x,y)+\mu(x',y'),s,t)
&=((\lambda x+\mu x')st,(\lambda y+\mu y')st)\\
&=\lambda(xst,yst)+\mu(x'st,y'st).
\end{aligned}
$$

第2入力では

$$
b((x,y),\lambda s+\mu s',t)
=\lambda(xst,yst)+\mu(xs't,ys't).
$$

第3入力では

$$
b((x,y),s,\lambda t+\mu t')
=\lambda(xst,yst)+\mu(xst',yst').
$$

すべての位置で加法とスカラー倍を保つので多重線形です。
<!-- definition-example-end -->

一方、$b(x,y)=xy$ を $K^2$ 上の一つの線形写像とみなすと、$(1,0)+(0,1)=(1,1)$ に対して $b(1,1)=1$ なのに $b(1,0)+b(0,1)=0$ です。この反例は標数によらず成立します。直積をそのまま使っては、入力同士の積から生じる情報を線形写像として扱えません。

## 2. 基底の組を一つの入力にする

各 $V_a$ に[体上の基底](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field) $e^{(a)}_1,\ldots,e^{(a)}_{n_a}$ を選びます。$n_a=\dim_K V_a$ です。各入力の座標を $x^{(a)}_i$ とすると、$d=2$ なら

$$
\begin{aligned}
b(v_1,v_2)
&=b\left(\sum_i x^{(1)}_i e^{(1)}_i,v_2\right)\\
&=\sum_i x^{(1)}_i b(e^{(1)}_i,v_2)\\
&=\sum_{i,j}x^{(1)}_i x^{(2)}_j b(e^{(1)}_i,e^{(2)}_j).
\end{aligned}
$$

つまり基底の組における値だけを知れば任意の入力の値が出ます。積 $x^{(1)}_i x^{(2)}_j$ を新しい座標として並べれば、その座標に関しては線形な計算です。

一般の $d$ についても、各位置を順に展開すれば係数は $d$ 個の座標の積になります。ここで新しい空間 $T$ と写像 $\tau$ に求めたい条件は、どんな多重線形写像 $b$ であっても、$\tau$ を通して一意な線形写像に変換できることです。この性質を普遍性と呼びます。

<a id="def-tsp1-multifactor-product"></a>

<!-- formal-statement-start -->
> **定義（多因子のテンソル積）**
>
> 体 $K$ 上の有限次元空間 $V_1,\ldots,V_d$（$d\ge1$）を取る。$K$ 上のベクトル空間 $T$ と多重線形写像 $\tau:V_1\times\cdots\times V_d\to T$ が次を満たすとする。任意の $K$ 上のベクトル空間 $W$ と任意の多重線形写像 $b:V_1\times\cdots\times V_d\to W$ に対して、一意な $K$ 線形写像 $L:T\to W$ が存在して
>
$$
b=L\circ\tau
$$
>
> となる。この組を多因子のテンソル積とし、$T=V_1\otimes_K\cdots\otimes_K V_d$、$\tau(v_1,\ldots,v_d)=v_1\otimes\cdots\otimes v_d$ と書く。
<!-- formal-statement-end -->

これは[LA3Eのテンソル積の定義](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)の拡張です。

<!-- definition-example-start: def-tsp1-multifactor-product -->
**定義の確認**。$d=3$、$V_1=V_2=V_3=K$ とします。候補 $T=K$、$\tau(x,y,z)=xyz$ は各位置の分配法則と結合法則により多重線形です。任意の $W$ と多重線形写像 $b:K^3\to W$ に対し

$$
b(x,y,z)=x b(1,y,z)=xy b(1,1,z)=xyz b(1,1,1).
$$

$L(t)=t b(1,1,1)$ は $K$ 線形で $L(\tau(x,y,z))=b(x,y,z)$ です。別の線形写像 $L'$ が同じ条件を満たすなら $L'(1)=b(1,1,1)$、従って $L'(t)=tL'(1)=L(t)$ です。出力空間 $W$ は任意だったので普遍性の全条件を確認できました。
<!-- definition-example-end -->

## 3. 任意の有限次元空間での構成

$V_a$ の基底の添字を集めた組を $I=(i_1,\ldots,i_d)$ と書き、各 $i_a$ は $1$ から $n_a$ まで動くものとします。このような組全体を $\mathcal I$ とします。例えば $n_1=n_2=2,n_3=1$ なら $\mathcal I$ には $(1,1,1),(1,2,1),(2,1,1),(2,2,1)$ の4個があります。

<a id="thm-tsp1-multifactor-basis"></a>

<!-- formal-statement-start -->
> **定理（多因子テンソル積の存在・基底・一意性）**
>
> 体 $K$ 上の有限次元空間 $V_a$（$1\le a\le d$、$d\ge1$）の基底を $(e_i^{(a)})_{i=1}^{n_a}$ とする。[多因子のテンソル積](#def-tsp1-multifactor-product)は存在し、
>
$$
E_I=e^{(1)}_{i_1}\otimes\cdots\otimes e^{(d)}_{i_d},
\qquad I\in\mathcal I
$$
>
> が基底となる。従ってその次元は $\prod_{a=1}^d n_a$ であり、任意の $v_a=\sum_i x_i^{(a)}e_i^{(a)}$ に対して
>
$$
v_1\otimes\cdots\otimes v_d
=\sum_{I\in\mathcal I}\left(\prod_{a=1}^d x_{i_a}^{(a)}\right) E_I.
$$
>
> また任意の二つの普遍性を満たす組 $(T,\tau),(T',\tau')$ の間には $\Phi\circ\tau=\tau'$ を満たす一意な線形同型 $\Phi:T\to T'$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

基底の組を座標とする配列空間を作り、入力の座標の積を並べる写像を定めます。任意の多重線形写像の基底上の値は、この配列に対する線形写像の値として指定できます。二つの候補の一意性は、互いの普遍性を適用して得た写像が逆写像になることを示します。

<!-- proof-start -->
### 証明

$T=K^{\mathcal I}$ を、$\mathcal I$ で添字付けられた $K$ の成分の配列全体とし、成分ごとに演算します。成分 $I$ だけが $1$、他が $0$ の配列を $E_I$ と置きます。任意の配列 $(t_I)$ は $\sum_I t_I E_I$ と書け、線形結合が零なら各成分を読むことで $t_I=0$ を得るので $(E_I)$ は基底です。

各 $v_a$ の基底展開の係数は一意なので

$$
\tau(v_1,\ldots,v_d)=
\sum_{I\in\mathcal I}\prod_{a=1}^d x_{i_a}^{(a)} E_I
$$

は良定義です。位置 $c$ の入力を $\lambda u+\mu v$ とし、$u,v$ の座標を $p_i,q_i$ とします。すると各成分は

$$
\begin{aligned}
&(\lambda p_{i_c}+\mu q_{i_c})\prod_{a\ne c}x_{i_a}^{(a)}\\
&=\lambda p_{i_c}\prod_{a\ne c}x_{i_a}^{(a)}
+\mu q_{i_c}\prod_{a\ne c}x_{i_a}^{(a)}.
\end{aligned}
$$

成分ごとに加法とスカラー倍を保ち、$c$ は任意なので $\tau$ は多重線形です。$d=1$ のとき空積は $1$ とします。

任意の多重線形写像 $b:V_1\times\cdots\times V_d\to W$ を取ります。第1位置の入力を基底展開すると

$$
b(v_1,\ldots,v_d)
=\sum_{i_1}x^{(1)}_{i_1} b(e_{i_1}^{(1)},v_2,\ldots,v_d).
$$

第2位置の展開を各項に適用すると

$$
\sum_{i_1,i_2}x^{(1)}_{i_1}x^{(2)}_{i_2}
 b(e_{i_1}^{(1)},e_{i_2}^{(2)},v_3,\ldots,v_d)
$$

を得ます（$d\ge2$ の場合）。$c$ 番目まで展開した式の各項で $c+1$ 番目の線形性を使うと、係数に $x_{i_{c+1}}^{(c+1)}$ が掛かり、和に $i_{c+1}$ が追加されます。従って最後まで展開すれば

$$
b(v_1,\ldots,v_d)
=\sum_{I\in\mathcal I}\left(\prod_{a=1}^d x_{i_a}^{(a)}\right)
b(e_{i_1}^{(1)},\ldots,e_{i_d}^{(d)}).
$$

そこで

$$
L\left(\sum_I t_I E_I\right)=
\sum_I t_I b(e_{i_1}^{(1)},\ldots,e_{i_d}^{(d)})
$$

と定めます。座標は一意であり、右辺は $t_I$ に関して線形です。$\tau$ の座標を代入すれば直前の式となるので $L\circ\tau=b$ です。

一意性について、別の線形写像 $L'$ が $L'\circ\tau=b$ を満たすとします。基底ベクトルの組を代入すると $\tau(e_{i_1}^{(1)},\ldots,e_{i_d}^{(d)})=E_I$ なので

$$
L'(E_I)=b(e_{i_1}^{(1)},\ldots,e_{i_d}^{(d)})=L(E_I).
$$

すべての基底上で一致し、任意の $\sum_I t_I E_I$ に線形性を適用すれば $L'=L$ です。従って普遍性が成立します。基底の本数は $\prod_a n_a$ で、[体上の次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)の定義から次元公式を得ます。

ある $n_a=0$ なら $\mathcal I$ は空で $T$ は零空間です。その位置の入力は常に零で、多重線形性から $b=0$ となるため、零空間からの唯一の線形写像が条件を満たします。

最後に任意の二つの組 $(T,\tau),(T',\tau')$ を取ります。$T$ の普遍性を $b=\tau'$ に、$T'$ の普遍性を $b=\tau$ に適用すると、一意な線形写像 $\Phi:T\to T'$ と $\Psi:T'\to T$ が得られ、

$$
\Phi\circ\tau=\tau',\qquad\Psi\circ\tau'=\tau
$$

となります。従って

$$
(\Psi\circ\Phi)\circ\tau=\Psi\circ\tau'=\tau
=\operatorname{id}_T\circ\tau.
$$

$T$ の普遍性の一意性から $\Psi\circ\Phi=\operatorname{id}_T$ です。他方、

$$
(\Phi\circ\Psi)\circ\tau'=\Phi\circ\tau=\tau'
=\operatorname{id}_{T'}\circ\tau'
$$

なので $\Phi\circ\Psi=\operatorname{id}_{T'}$ です。よって $\Phi$ は同型であり、条件を満たす線形写像自体が一意なので同型も一意です。
<!-- proof-end -->

$d=2$、$K=\mathbb R$ または $\mathbb C$ なら[LA3Eの存在と基底の定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)および[一意性の定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-uniqueness)の内容に戻ります。今回の構成は内積、共役、標数ゼロを必要としません。

### 手で計算する

$K=\mathbb Q$、$V_1=V_2=K^2$、基底を $e_1,e_2$ と $f_1,f_2$ とします。$(1,2)$ と $(3,4)$ に対応するテンソルは

$$
(e_1+2e_2)\otimes(3f_1+4f_2)
=3E_{11}+4E_{12}+6E_{21}+8E_{22}.
$$

$b:K^2\times K^2\to K$ を $b((x,y),(s,t))=xs+yt$ とすれば、基底上の値は $1,0,0,1$ です。[存在・基底の定理](#thm-tsp1-multifactor-basis)により $L$ は $3+8=11$ を返し、元の計算 $1\cdot3+2\cdot4=11$ と一致します。

[LA3Eの単純テンソル](../../../基礎科目/LA/LA3E/index.md#def-la3e-simple-tensor)にならい、一般の $d$ でも $v_1\otimes\cdots\otimes v_d$ と一組の入力から得られる元を単純テンソルと呼びます。すべてのテンソルはこの形の有限和ですが、一組の入力で書けるとは限りません。例えば $E_{11}+E_{22}$ が $(ae_1+be_2)\otimes(cf_1+df_2)$ なら、係数比較により $ac=1,ad=0,bc=0,bd=1$ が必要です。$a\ne0$ と $ad=0$ から $d=0$ となり $bd=1$ に矛盾します。ここでの $d$ はスカラーです。何項の単純テンソルで表せるかが次講の主題です。

## 4. 基底を替えると座標はどう変わるか

同じテンソルでも配列表示は選んだ基底に依存します。新しい基底を $g^{(a)}_j$ とし、それを古い基底で展開した係数を $P^{(a)}_{ij}$ と書きます。第 $j$ 列が新基底の第 $j$ ベクトルの旧座標です。

<a id="prop-tsp1-coordinate-change"></a>

<!-- formal-statement-start -->
> **命題（多因子テンソルの基底変換）**
>
> 体 $K$ 上の有限次元空間 $V_a$（$1\le a\le d$、$d\ge1$）の二組の基底 $e^{(a)}_i,g^{(a)}_j$ を取り、
>
$$
g_j^{(a)}=\sum_i P^{(a)}_{ij}e_i^{(a)}
$$
>
> とする。テンソル $t$ の旧基底での座標を $c_I$、新基底での座標を $h_J$ とすると、
>
$$
c_I=\sum_J h_J\prod_{a=1}^d P^{(a)}_{i_a j_a}.
$$
>
> 逆向きの変換は各 $P^{(a)}$ をその逆行列に置き換え、旧座標と新座標を交換することで得られる。
<!-- formal-statement-end -->

### 証明の見取り図

新しい基底テンソルを一つずつ古い基底で展開し、係数を集めます。逆行列は入力空間ごとの基底変換を逆向きに行います。

<!-- proof-start -->
### 証明

新基底での展開は[多因子テンソル積の存在・基底・一意性](#thm-tsp1-multifactor-basis)から

$$
t=\sum_J h_J(g_{j_1}^{(1)}\otimes\cdots\otimes g_{j_d}^{(d)})
$$

です。各 $g_{j_a}^{(a)}$ にその旧座標を代入し、同定理の単純テンソルの展開公式を使うと

$$
g_{j_1}^{(1)}\otimes\cdots\otimes g_{j_d}^{(d)}
=\sum_I\left(\prod_a P_{i_a j_a}^{(a)}\right) E_I.
$$

従って

$$
\begin{aligned}
t&=\sum_J h_J\sum_I\left(\prod_a P_{i_a j_a}^{(a)}\right)E_I\\
&=\sum_I\left(\sum_J h_J\prod_a P_{i_a j_a}^{(a)}\right)E_I.
\end{aligned}
$$

旧基底展開の一意性によって括弧内が $c_I$ です。二組の基底の[座標写像](../../../代数系/FLD/FLD0/index.md#thm-fld0-coordinate-isomorphism-over-field)はいずれも線形同型なので、各 $P^{(a)}$ は可逆です。$Q^{(a)}=(P^{(a)})^{-1}$ とすれば $e_i^{(a)}=\sum_j Q^{(a)}_{ji}g_j^{(a)}$ となります。同じ展開をこの向きに行うと

$$
h_J=\sum_I c_I\prod_a Q_{j_a i_a}^{(a)}.
$$

零次元因子があれば両基底は空で $t=0$、座標の等式も空の等式として成立します。
<!-- proof-end -->

例えば $K=\mathbb Q$、$g_1=e_1+e_2,g_2=e_2$、第2因子の基底は変更しないとします。$g_1\otimes f_1$ の新座標は $h_{11}=1$ のみ非零ですが、旧基底では $E_{11}+E_{21}$ です。行列

$$
P=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\qquad P^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}
$$

を使えば旧座標 $(1,1)^{\mathsf T}$ から新座標 $(1,0)^{\mathsf T}$ に戻ります。配列の成分が変わってもテンソルそのものは変わりません。

## 5. 演習

### Level A

<a id="ex-tsp1-a01"></a>

#### TSP1-A01 各位置での線形性
- Level: A

任意の体 $K$ で $b:K^2\times K^2\to K$、$b((x,y),(s,t))=xt-ys$ が双線形であることを示し、直積上の線形写像ではないことを示してください。

<!-- solution-start -->
##### 詳細解答

[多重線形写像の定義](#def-tsp1-multilinear-map)を各位置に適用します。

$$
\begin{aligned}
b(\lambda(x,y)+\mu(x',y'),(s,t))
&=(\lambda x+\mu x')t-(\lambda y+\mu y')s\\
&=\lambda(xt-ys)+\mu(x't-y's).
\end{aligned}
$$

第2位置は

$$
\begin{aligned}
b((x,y),\lambda(s,t)+\mu(s',t'))
&=x(\lambda t+\mu t')-y(\lambda s+\mu s')\\
&=\lambda(xt-ys)+\mu(xt'-ys').
\end{aligned}
$$

従って双線形です。直積の二つの元 $((1,0),(0,0))$ と $((0,0),(0,1))$ はいずれも値が零ですが、その和の値は $b((1,0),(0,1))=1$ です。加法を保たないので線形写像ではありません。
<!-- solution-end -->

<a id="ex-tsp1-a02"></a>

#### TSP1-A02 三因子の座標
- Level: A

$\mathbb Q^2$、$\mathbb Q^2$、$\mathbb Q$ の標準基底を $e_i,f_j,g_1$ とします。$(e_1-2e_2)\otimes(3f_1+f_2)\otimes2g_1$ の全座標と空間の次元を求めてください。

<!-- solution-start -->
##### 詳細解答

[存在・基底の定理](#thm-tsp1-multifactor-basis)の積の式を使います。添字は $(1,1,1),(1,2,1),(2,1,1),(2,2,1)$ で、

$$
(1\cdot3\cdot2,\ 1\cdot1\cdot2,\ (-2)\cdot3\cdot2,\ (-2)\cdot1\cdot2)
=(6,2,-12,-4).
$$

基底の本数は $2\cdot2\cdot1=4$ なので次元は $4$ です。
<!-- solution-end -->

<a id="ex-tsp1-a03"></a>

#### TSP1-A03 零とスカラー倍
- Level: A

任意の体 $K$ 上の有限次元空間 $V,W$ と $v\in V,w\in W,\lambda\in K$ について、$0\otimes w=0$ と $(\lambda v)\otimes w=v\otimes(\lambda w)$ を示してください。

<!-- solution-start -->
##### 詳細解答

[多因子のテンソル積の定義](#def-tsp1-multifactor-product)の $\tau$ は各位置について線形です。第1位置で

$$
0\otimes w=\tau(0,w)=\tau(0v,w)=0\tau(v,w)=0
$$

です。また第1位置と第2位置の線形性から

$$
(\lambda v)\otimes w=\lambda\tau(v,w)=v\otimes(\lambda w).
$$

これは入力のどちらに係数を掛けても同じテンソルが得られることを表します。
<!-- solution-end -->

<a id="ex-tsp1-a04"></a>

#### TSP1-A04 有限体でも成立する
- Level: A

$K=\mathbb F_2$（$0,1$ の加算・乗算を法2で行う体）とし、$K^2$ の標準基底を $e_1,e_2$ とします。$(e_1+e_2)\otimes(e_1+e_2)+e_1\otimes e_2$ の座標を求めてください。

<!-- solution-start -->
##### 詳細解答

[存在・基底の定理](#thm-tsp1-multifactor-basis)の展開によれば第1項の座標は $(1,1,1,1)$、第2項は $(0,1,0,0)$ です。法2では $1+1=0$ なので和は $(1,0,1,1)$、すなわち

$$
E_{11}+E_{21}+E_{22}
$$

です。標数ゼロである必要はありません。
<!-- solution-end -->

### Level B

<a id="ex-tsp1-b01"></a>

#### TSP1-B01 多重線形写像の線形化
- Level: B

$\mathbb Q^2\times\mathbb Q^2\times\mathbb Q^2\to\mathbb Q$ の写像 $b((x_1,x_2),(y_1,y_2),(z_1,z_2))=2x_1y_2z_1-x_2y_1z_2$ が多重線形であることを示し、対応する線形写像 $L$ を全座標 $t_{ijk}$ で表してください。入力 $(1,2),(3,4),(5,6)$ で両方の計算を照合してください。

<!-- solution-start -->
##### 詳細解答

第1位置を固定された $y,z$ の下で見ると $b=(2y_2z_1)x_1-(y_1z_2)x_2$、第2位置では $b=-(x_2z_2)y_1+(2x_1z_1)y_2$、第3位置では $b=(2x_1y_2)z_1-(x_2y_1)z_2$ です。いずれも座標の一次結合なので[多重線形写像の定義](#def-tsp1-multilinear-map)を満たします。

標準基底の組のうち $(1,2,1)$ の値が $2$、$(2,1,2)$ の値が $-1$、他は全て零です。[存在・基底の定理](#thm-tsp1-multifactor-basis)の構成に従って

$$
L(t)=2t_{121}-t_{212}.
$$

指定入力に対するテンソルの座標は $t_{121}=1\cdot4\cdot5=20$、$t_{212}=2\cdot3\cdot6=36$ です。よって $L(t)=40-36=4$。直接代入しても $b=2\cdot1\cdot4\cdot5-2\cdot3\cdot6=4$ となります。
<!-- solution-end -->

<a id="ex-tsp1-b02"></a>

#### TSP1-B02 単純テンソルかどうか
- Level: B

任意の体 $K$ 上の $K^2\otimes K^2\otimes K$ で、標準基底に関して $t=E_{111}+E_{221}$ が一つの単純テンソルではないことを示してください。

<!-- solution-start -->
##### 詳細解答

$t=(ae_1+be_2)\otimes(cf_1+df_2)\otimes sg_1$ と仮定します。[存在・基底の定理](#thm-tsp1-multifactor-basis)の座標式から

$$
acs=1,\quad ads=0,\quad bcs=0,\quad bds=1.
$$

$acs=1$ より $a,c,s$ は非零です。$ads=0$ に $a^{-1}s^{-1}$ を掛けると $d=0$ となり $bds=1$ に矛盾します。従って一つの単純テンソルではありません。一方、問題文の表示は単純テンソル二つの和です。
<!-- solution-end -->

<a id="ex-tsp1-b03"></a>

#### TSP1-B03 二因子の基底変換
- Level: B

$\mathbb Q^2\otimes\mathbb Q^2$ の旧基底 $e_i,f_j$ に対し、新基底を $g_1=e_1+e_2,g_2=e_2$、$h_1=f_1,h_2=f_1+f_2$ とします。$g_1\otimes h_2+2g_2\otimes h_1$ を旧座標に直し、逆変換も行ってください。

<!-- solution-start -->
##### 詳細解答

新基底は旧基底を用いて指定されており、各変換行列は可逆です。

$$
P=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\quad R=\begin{pmatrix}1&1\\0&1\end{pmatrix}.
$$

[基底変換の命題](#prop-tsp1-coordinate-change)の式を各項に使います。第1項は $E_{11}+E_{12}+E_{21}+E_{22}$、第2項は $2E_{21}$ なので旧座標は $(1,1,3,1)$ です。

逆に $e_1=g_1-g_2,e_2=g_2,f_1=h_1,f_2=h_2-h_1$ ですから

$$
\begin{aligned}
t&=(g_1-g_2)\otimes h_1
 +(g_1-g_2)\otimes(h_2-h_1)\\
&\quad+3g_2\otimes h_1+g_2\otimes(h_2-h_1)\\
&=g_1\otimes h_2+2g_2\otimes h_1.
\end{aligned}
$$

$g_1\otimes h_1$ は $1-1=0$、$g_2\otimes h_1$ は $-1+1+3-1=2$、$g_2\otimes h_2$ は $-1+1=0$ となり、元の新座標に戻りました。
<!-- solution-end -->

### Level C

<a id="ex-tsp1-c01"></a>

#### TSP1-C01 因子の並べ替えを線形写像として構成する
- Level: C

任意の体 $K$ 上の有限次元空間 $U,V,W$ について、$U\otimes V\otimes W$ から $W\otimes U\otimes V$ への、$u\otimes v\otimes w$ を $w\otimes u\otimes v$ に送る線形同型を構成し、一意性を示してください。各空間の基底を用いた座標表示も求めてください。

<!-- solution-start -->
##### 詳細解答

$T=U\otimes V\otimes W$、$S=W\otimes U\otimes V$ と書きます。[多因子のテンソル積の定義](#def-tsp1-multifactor-product)により $S$ の標準写像は各位置について線形です。従って $b:U\times V\times W\to S$ を $b(u,v,w)=w\otimes u\otimes v$ と置くと、例えば第1位置について

$$
b(\lambda u+\mu u',v,w)
=\lambda(w\otimes u\otimes v)+\mu(w\otimes u'\otimes v).
$$

第2位置も $S$ の第3位置の線形性、第3位置も $S$ の第1位置の線形性によって同じ条件を満たします。よって $T$ の普遍性から一意な線形写像 $P:T\to S$ が存在し、指定された対応を満たします。

逆向きには $c:W\times U\times V\to T$、$c(w,u,v)=u\otimes v\otimes w$ を取ります。各位置は $T$ の第3、第1、第2位置にそれぞれ対応するので多重線形であり、$S$ の普遍性から線形写像 $Q:S\to T$ を得ます。

各単純テンソル上で

$$
QP(u\otimes v\otimes w)=u\otimes v\otimes w,
\qquad
PQ(w\otimes u\otimes v)=w\otimes u\otimes v.
$$

[存在・基底の定理](#thm-tsp1-multifactor-basis)により単純テンソルの中には基底が含まれます。従って両合成は各基底上で恒等写像と一致し、線形性により全空間でも恒等写像です。よって $P$ は同型で逆写像は $Q$ です。

基底を $e_i,f_j,g_k$ とすれば $P(e_i\otimes f_j\otimes g_k)=g_k\otimes e_i\otimes f_j$ です。線形性から

$$
P\left(\sum_{i,j,k}t_{ijk}e_i\otimes f_j\otimes g_k\right)
=\sum_{i,j,k}t_{ijk}g_k\otimes e_i\otimes f_j.
$$

出力座標を $s_{kij}$ と書けば $s_{kij}=t_{ijk}$ です。係数を変えずに位置だけを入れ替える操作です。
<!-- solution-end -->

## 6. 次に進む

多重線形な操作を座標の積を並べる写像と、その後の線形写像に分離できました。テンソルは基底の選択に依存しない対象ですが、計算には配列表示を使えます。次講では単純テンソルの和の最小項数を調べ、行列の階数との関係を明らかにします。
