# TSP2 rank-one分解とテンソル階数：行列階数との差

[TSP1の多因子テンソル積の基底定理](../TSP1/index.md#thm-tsp1-multifactor-basis)によれば、どんなテンソルも基底の組の線形結合として書けます。しかし、成分を一つずつ保存するよりも、各因子のベクトルの積でまとめて表せれば、計算や記憶に必要な情報を減らせます。今回は、そのような積を最少何項必要とするかを調べます。行列では列空間の次元だけで答えが出ますが、三因子になると新しい障害が生じます。

## 1. 積の和で表す費用

以下、係数は体 $K$ の元とし、$V_1,\ldots,V_d$ は有限次元の $K$ 上のベクトル空間、$d\ge2$ とします。テンソル積の添字 $K$ は省略します。[単純テンソル](../../../基礎科目/LA/LA3E/index.md#def-la3e-simple-tensor)の考え方を前講の多因子の場合に広げ、各因子から一つずつベクトルを取った積を考えます。

[TSP1の基底定理](../TSP1/index.md#thm-tsp1-multifactor-basis)により、各因子の基底を $e^{(a)}_i$ とすれば、積の成分は

$$
(v_1\otimes\cdots\otimes v_d)_{i_1\ldots i_d}
=\prod_{a=1}^d x^{(a)}_{i_a},
$$

ただし $x^{(a)}_i$ は $v_a$ の座標です。どれかの因子が零なら積は零です。逆に全因子が非零なら、それぞれ非零の座標を一つ選べます。それらの積は体上で非零なので、テンソルも非零です。このような非零の単純テンソルを rank-one テンソルといい、その和で一般のテンソルを表します。最短の表示の長さがテンソル階数です。

<a id="def-tsp2-tensor-rank"></a>

<!-- formal-statement-start -->
> **定義（テンソル階数）**
>
> 体 $K$ 上の有限次元空間 $V_1,\ldots,V_d$（$d\ge2$）のテンソル積の元 $t$ を取る。非零の単純テンソルの和
>
$$
t=\sum_{s=1}^r v^{(1)}_s\otimes\cdots\otimes v^{(d)}_s,
\qquad v^{(a)}_s\in V_a\setminus\{0\}
$$
>
> と書ける非負整数 $r$ の最小値をテンソル階数 $R_K(t)$ とする。空和は零とする。階数1のテンソルが rank-one テンソルである。
<!-- formal-statement-end -->

最小値の存在も確かめましょう。[TSP1の基底定理](../TSP1/index.md#thm-tsp1-multifactor-basis)で $t$ を展開し、非零係数を第1因子に吸収すれば有限個の非零の積の和になります。従って候補は空でなく、非負整数の集合なので最小値があります。零次元の因子がある場合はテンソル積が零空間となり、空和で表せます。

<!-- definition-example-start: def-tsp2-tensor-rank -->
**定義の確認**。三つの $K^2$ の基底を $e_i,f_j,g_k$ とし、

$$
t=e_1\otimes f_1\otimes g_1+e_2\otimes f_1\otimes g_1
$$

を考えます。[多因子テンソル積の定義](../TSP1/index.md#def-tsp1-multifactor-product)に含まれる第1位置の線形性により

$$
t=(e_1+e_2)\otimes f_1\otimes g_1.
$$

三因子は全て非零で、座標 $t_{111}=1$ だから $t\ne0$ です。従って1項で表せるが0項では表せず、$R_K(t)=1$ です。$t-t=0$ の階数は空和により0です。
<!-- definition-example-end -->

基底の取り方は積の各ベクトルの座標を変えますが、同じベクトルの組による表示自体は変えません。従って階数は基底の選択に依存しません。係数体と因子の分け方は指定したままにします。

## 2. 基本的な上界と加法

基底のすべての組を使う必要はありません。最後の添字だけをまとめると、例えば三因子では

$$
t=\sum_{i,j} e_i\otimes f_j\otimes
\left(\sum_k t_{ijk}g_k\right).
$$

最後の括弧が零なら項を除けます。このまとめ方だけでも、必要な積の個数を減らせます。

<a id="prop-tsp2-rank-bounds"></a>

<!-- formal-statement-start -->
> **命題（テンソル階数の基本評価）**
>
> 体 $K$ 上の有限次元空間 $V_1,\ldots,V_d$（$d\ge2$）の次元を $n_a$ とし、そのテンソル積の元 $s,t$ を取る。任意の $b\in\{1,\ldots,d\}$ と任意の $\lambda\in K\setminus\{0\}$ に対し
>
$$
\begin{aligned}
0\le R_K(t)&\le\prod_{a\ne b} n_a,\\
R_K(s+t)&\le R_K(s)+R_K(t),\\
R_K(\lambda t)&=R_K(t).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

上界は一つの位置の座標をベクトルにまとめます。和は最短表示を連結し、非零スカラー倍は最短表示の第1因子に係数を吸収した後、逆向きにも同じ操作をします。

<!-- proof-start -->
### 証明

[TSP1の基底定理](../TSP1/index.md#thm-tsp1-multifactor-basis)で各因子の基底 $e^{(a)}_i$ を選びます。位置 $b$ 以外の添字の組を $J$ とし、$i_b=k$ を補った成分を $t_{J,k}$ と書きます。

$$
w_J=\sum_{k=1}^{n_b} t_{J,k}e^{(b)}_k
$$

を第 $b$ 因子に入れ、他の位置には対応する基底ベクトルを入れます。その積を全ての $J$ について足します。[多因子テンソル積の線形性](../TSP1/index.md#def-tsp1-multifactor-product)で第 $b$ 位置を展開すれば、全添字に対する元の展開に戻ります。非零の $w_J$ に対応する項だけを残すと、項数は $J$ の個数 $\prod_{a\ne b}n_a$ 以下です。零次元因子があれば $t=0$ なので同じ不等式が成立します。

次に $p=R_K(s),q=R_K(t)$ とし、[階数の定義](#def-tsp2-tensor-rank)の最小値を実現する表示を選びます。二つの表示をそのまま足すと $p+q$ 個の非零の単純テンソルで表せるため $R_K(s+t)\le p+q$ です。

$t$ の最短表示の各項の第1因子を $\lambda$ 倍すると、$\lambda\ne0$ なので因子は非零のままです。従って $R_K(\lambda t)\le R_K(t)$。逆に $\lambda t$ の最短表示に $\lambda^{-1}$ を掛ければ $R_K(t)\le R_K(\lambda t)$ となり、等号を得ます。
<!-- proof-end -->

例えば各因子の次元が $2,3,4$ なら、成分は24個ありますが、第3位置をまとめると必要な積は最大 $2\cdot3=6$ 個です。加法の不等式は等号とは限りません。非零の rank-one テンソル $t$ と $-t$ では左辺は0、右辺は2です。

## 3. 二因子の場合：行列に戻る

$U,V$ の次元をそれぞれ $m,n$、基底を $e_i,f_j$ とします。二因子テンソルの係数 $t_{ij}$ を行列 $M$ に並べます。行列階数 $\operatorname{rank}M$ は列ベクトルが張る空間の次元、つまり $x\mapsto Mx$ の像の次元です（[体上の次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)）。単純テンソル $u\otimes v$ は、座標列を $a,b$ とすれば外積行列 $ab^{\mathsf T}$ に対応します。これは転置であって複素共役は取りません。

$$
(ab^{\mathsf T})_{ij}=a_i b_j.
$$

各列が $a$ のスカラー倍なので、$a,b$ が非零なら列空間はちょうど $Ka$ であり、階数1です。反対に行列階数1なら、非零列を一つ選び、全列をそのスカラー倍として並べれば、外積行列になります。この対応を一般の階数へ拡張します。

<a id="thm-tsp2-matrix-rank"></a>

<!-- formal-statement-start -->
> **定理（二因子テンソル階数と行列階数の一致）**
>
> 体 $K$ 上の有限次元空間 $U,V$ の基底をそれぞれ $(e_i)_{i=1}^m,(f_j)_{j=1}^n$ とする。テンソル
>
$$
t=\sum_{i=1}^m\sum_{j=1}^n M_{ij}e_i\otimes f_j
$$
>
> に対して
>
$$
R_K(t)=\operatorname{rank}_K M.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各単純テンソルは列方向を高々一つ増やします。逆に独立な列を基底として選べば、各列の基底座標を集めて同じ個数の積を作れます。

<!-- proof-start -->
### 証明

まず [テンソル階数の定義](#def-tsp2-tensor-rank)で最短表示の項数を $r$ とします。各項の座標列を $a_s\in K^m,b_s\in K^n$ と置くと、[TSP1の基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)より

$$
M=\sum_{s=1}^r a_s b_s^{\mathsf T}.
$$

第 $j$ 列は $\sum_{s=1}^r (b_s)_j a_s$ です。従って列空間は $a_1,\ldots,a_r$ の線形包に含まれ、次元は高々 $r$ です。ゆえに $\operatorname{rank}M\le R_K(t)$ です。

逆に $q=\operatorname{rank}M$ と置きます。$q=0$ なら全列が零、従って $t=0$ です。$q>0$ なら、列の集合から一次独立な極大部分集合 $a_1,\ldots,a_q$ を選べます。極大性により全列はこれらの線形結合であり、基底なので係数は一意です（[体上の一次独立・基底](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field)）。

第 $j$ 列を

$$
M_{:j}=\sum_{s=1}^q c_{sj}a_s
$$

と表し、$b_s=(c_{s1},\ldots,c_{sn})^{\mathsf T}$ とします。各 $b_s$ は非零です。実際、$a_s$ 自身が第 $j_s$ 列にあるので $c_{sj_s}=1$ です。成分を取ると $M_{ij}=\sum_s(a_s)_i(b_s)_j$ ですから

$$
\begin{aligned}
t&=\sum_{i,j}\sum_{s=1}^q (a_s)_i(b_s)_j e_i\otimes f_j\\
&=\sum_{s=1}^q\left(\sum_i(a_s)_i e_i\right)
\otimes\left(\sum_j(b_s)_j f_j\right).
\end{aligned}
$$

各項の両因子は非零であり、$R_K(t)\le q$ です。二つの不等式を合わせると等号を得ます。
<!-- proof-end -->

$K=\mathbb Q$ で次の行列を考えます。

$$
M=\begin{pmatrix}1&2&3\\2&4&6\\0&1&1\end{pmatrix}.
$$

第1列 $a=(1,2,0)^{\mathsf T}$ と第2列 $b=(2,4,1)^{\mathsf T}$ は一次独立です。第3列は $a+b$ なので階数は2です。証明の構成を実行すると

$$
M=a(1,0,1)+b(0,1,1).
$$

従ってテンソルは $(e_1+2e_2)\otimes(f_1+f_3)+(2e_1+4e_2+e_3)\otimes(f_2+f_3)$ で、これより短い表示はありません。

## 4. 三因子で何が変わるか

三因子の基底をそれぞれ $e_1,e_2$、$f_1,f_2$、$g_1,g_2$ とします。次のテンソルは三つの積の和です。

$$
w=e_2\otimes f_1\otimes g_1+
e_1\otimes f_2\otimes g_1+
e_1\otimes f_1\otimes g_2.
$$

係数配列を第1添字が1の場合と2の場合に分け、残りの二添字を行列の行と列にします。この二枚を $A,B$ とすると

$$
A=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
B=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

この二枚は一次独立です。しかし二つの rank-one テンソルで表せるためには、二枚の行列を同じ二つの rank-one 行列から作る必要があります。単に二枚が一次独立であるだけでは十分ではありません。

<a id="thm-tsp2-three-factor-rank"></a>

<!-- formal-statement-start -->
> **定理（三因子の階数3の例）**
>
> 任意の体 $K$ 上の三つの2次元空間の基底をそれぞれ $(e_1,e_2),(f_1,f_2),(g_1,g_2)$ とする。テンソル
>
$$
w=e_2\otimes f_1\otimes g_1+
e_1\otimes f_2\otimes g_1+
e_1\otimes f_1\otimes g_2
$$
>
> は $R_K(w)=3$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

表示から上界3が分かります。下界では、上記の二枚 $A,B$ を張る二次元空間に含まれる非零の階数1行列が、実は $B$ のスカラー倍に限られることを利用します。

<!-- proof-start -->
### 証明

三つの積の各因子は非零なので [階数の定義](#def-tsp2-tensor-rank)から $R_K(w)\le3$ です。

$R_K(w)\le2$ と仮定します。足りない項は零で補い、$w=\sum_{s=1}^2 u_s\otimes v_s\otimes z_s$ と書きます。$u_s=p_s e_1+q_s e_2$ とし、$v_s,z_s$ の座標列を $a_s,b_s$ と置きます。行列 $N_s=a_s b_s^{\mathsf T}$ は階数高々1です。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)をこの表示に適用すると、第1添字の値ごとに

$$
A=p_1N_1+p_2N_2,\qquad B=q_1N_1+q_2N_2.
$$

$A,B$ が一次独立なのは、$\alpha A+\beta B=0$ の $(1,2)$ 成分から $\alpha=0$、$(1,1)$ 成分から $\beta=0$ が従うためです。従って $N_1,N_2$ の線形包は次元2以上で、生成元が二つなので次元2です。この線形包の中に一次独立な二枚 $A,B$ があるので、それらも基底です。特に各 $N_s$ は $\alpha A+\beta B$ の形であり、$N_1,N_2$ 自身も一次独立で非零です。

ところが任意の $\alpha,\beta\in K$ について

$$
\alpha A+\beta B=\begin{pmatrix}\beta&\alpha\\\alpha&0\end{pmatrix}.
$$

$\alpha\ne0$ なら二列は一次独立です。実際、列の線形関係の係数を $x,y$ とすると

$$
x\alpha=0,\qquad x\beta+y\alpha=0.
$$

第1式から $x=0$、第2式から $y=0$ です。階数1以下の行列になるためには $\alpha=0$ が必要です。すると $N_1,N_2$ は共に $B$ のスカラー倍となり、一次独立性に反します。

よって $R_K(w)\ge3$ です。上界と合わせて $R_K(w)=3$。証明は非零元の逆元だけを使用し、標数2でも成立します。
<!-- proof-end -->

一方、例えば最初の添字を行、残り二つの添字の組を列とする $2\times4$ 行列を作ると

$$
\begin{pmatrix}
0&1&1&0\\
1&0&0&0
\end{pmatrix}
$$

となります。列の中に $(1,0)^{\mathsf T}$ と $(0,1)^{\mathsf T}$ があるので階数は2です。$w$ は三つの因子の順序を入れ替えても、ちょうど一つの添字だけが2である成分が1、その他が0という成分の規則は変わりませんから、他の一つの添字を行とする場合も同じ行列階数になります。どの一位置を行に選んでも階数2ですが、三因子のテンソル階数は3です。二因子の定理をそのまま三因子に拡張できない理由がここにあります。

## 5. 演習

### Level A

<a id="ex-tsp2-a01"></a>

#### TSP2-A01 積の成分
- Level: A
- ID: TSP2-A01

有理数体上の三つの2次元空間で $(e_1+2e_2)\otimes(f_1-f_2)\otimes g_2$ の非零成分と階数を求めてください。

<!-- solution-start -->
##### 詳細解答

[TSP1の基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)により $t_{ij2}=a_i b_j$、$t_{ij1}=0$ です。$a=(1,2)$、$b=(1,-1)$ なので

$$
t_{112}=1,\quad t_{122}=-1,\quad
t_{212}=2,\quad t_{222}=-2.
$$

他は零です。$t_{112}\ne0$ なので空和では表せません。与えられた表示は非零の積1項なので、[テンソル階数の定義](#def-tsp2-tensor-rank)より階数1です。
<!-- solution-end -->

<a id="ex-tsp2-a02"></a>

#### TSP2-A02 見かけの項数
- Level: A
- ID: TSP2-A02

任意の体 $K$ 上の二つの2次元空間で $e_1\otimes f_1+e_1\otimes f_2+e_2\otimes f_1+e_2\otimes f_2$ の階数を求めてください。

<!-- solution-start -->
##### 詳細解答

[多因子テンソル積の線形性](../TSP1/index.md#def-tsp1-multifactor-product)から最初の二項は $e_1\otimes(f_1+f_2)$、後の二項は $e_2\otimes(f_1+f_2)$ です。さらに第1位置をまとめると

$$
(e_1+e_2)\otimes(f_1+f_2).
$$

基底の一次独立性から両因子は非零で、成分 $t_{11}=1$ です。[階数の定義](#def-tsp2-tensor-rank)から階数は1です。標数2でも基底の異なるベクトル同士は相殺しません。
<!-- solution-end -->

<a id="ex-tsp2-a03"></a>

#### TSP2-A03 次元から上界を選ぶ
- Level: A
- ID: TSP2-A03

四因子の次元が $2,3,1,5$ のとき、第1、第2、第3、第4位置をそれぞれまとめた場合の階数上界を比較してください。

<!-- solution-start -->
##### 詳細解答

[基本評価の命題](#prop-tsp2-rank-bounds)に $d=4$ と指定した各次元を代入します。位置ごとの上界は

$$
3\cdot1\cdot5=15,\quad
2\cdot1\cdot5=10,\quad
2\cdot3\cdot5=30,\quad
2\cdot3\cdot1=6.
$$

従ってこの方法では第4位置をまとめるのが最も有利で、全てのテンソルの階数は6以下です。これは最小分解を実際に求めた値ではありません。
<!-- solution-end -->

<a id="ex-tsp2-a04"></a>

#### TSP2-A04 零と加法
- Level: A
- ID: TSP2-A04

$\mathbb F_2$ 上の三つの2次元空間で $s=e_1\otimes f_1\otimes g_1$ とします。$R_K(s)$、$R_K(s+s)$ を求め、加法の評価に等号が成立するか調べてください。

<!-- solution-start -->
##### 詳細解答

成分 $s_{111}=1$ なので非零であり、[テンソル階数の定義](#def-tsp2-tensor-rank)から階数1です。法2の加法では $1+1=0$ なので全成分が零となり、$s+s=0$、階数0です。[基本評価の命題](#prop-tsp2-rank-bounds)の右辺は $1+1=2$（項数は整数）で、左辺は0なので等号は成立しません。
<!-- solution-end -->

### Level B

<a id="ex-tsp2-b01"></a>

#### TSP2-B01 行列の最短分解
- Level: B
- ID: TSP2-B01

有理数体上の行列

$$
M=\begin{pmatrix}1&0&2\\2&1&5\\3&1&7\end{pmatrix}
$$

に対応する二因子テンソルの階数を求め、最短表示を構成してください。

<!-- solution-start -->
##### 詳細解答

第1列を $a=(1,2,3)^{\mathsf T}$、第2列を $b=(0,1,1)^{\mathsf T}$ とします。$xa+yb=0$ の第1成分は $x=0$、第2成分は $2x+y=0$ なので $y=0$。従って独立です。第3列は $2a+b=(2,5,7)^{\mathsf T}$ ですから、列空間の次元は2です。よって [二因子の一致定理](#thm-tsp2-matrix-rank)から階数2です。

各列の $a,b$ に関する座標は $(1,0),(0,1),(2,1)$ なので

$$
M=a(1,0,2)+b(0,1,1).
$$

基底を $e_i,f_j$ とすれば

$$
t=(e_1+2e_2+3e_3)\otimes(f_1+2f_3)
+(e_2+e_3)\otimes(f_2+f_3).
$$

両項の成分を足すと第1列 $a$、第2列 $b$、第3列 $2a+b$ に戻ります。項数2は階数と一致するので最短です。
<!-- solution-end -->

<a id="ex-tsp2-b02"></a>

#### TSP2-B02 非零スカラーと基底変更
- Level: B
- ID: TSP2-B02

任意の体 $K$ 上の二つの2次元空間で $t=e_1\otimes f_1+e_2\otimes f_2$ とします。新基底 $h_1=e_1+e_2,h_2=e_2$ を使った表示を求め、$\lambda\in K\setminus\{0\}$ に対する $\lambda t$ の階数を両方の基底から確認してください。

<!-- solution-start -->
##### 詳細解答

旧基底の係数行列は単位行列なので階数2です。$xh_1+yh_2=xe_1+(x+y)e_2=0$ なら $x=0$、$y=0$ で、逆に $e_1=h_1-h_2,e_2=h_2$ と書けるので新しい二本は基底です。$e_1=h_1-h_2$、$e_2=h_2$ を代入すると

$$
\begin{aligned}
t&=(h_1-h_2)\otimes f_1+h_2\otimes f_2\\
&=h_1\otimes f_1+h_2\otimes(f_2-f_1).
\end{aligned}
$$

新基底の係数行列は

$$
M'=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

$\lambda M'$ の列の線形関係の係数を $x,y$ とすると、第1成分は $\lambda x=0$、第2成分は $\lambda(-x+y)=0$。$\lambda\ne0$ より $x=y=0$ です。旧基底でも $\lambda$ 倍した単位行列の二列は独立です。[二因子の一致定理](#thm-tsp2-matrix-rank)からどちらも階数2であり、[基本評価の命題](#prop-tsp2-rank-bounds)のスカラー倍の結論と一致します。
<!-- solution-end -->

<a id="ex-tsp2-b03"></a>

#### TSP2-B03 三因子の対照例
- Level: B
- ID: TSP2-B03

任意の体 $K$ 上の三つの2次元空間で $t=e_1\otimes f_1\otimes g_1+e_2\otimes f_2\otimes g_2$ の階数を求めてください。また、第1添字を固定して得た二枚の行列が階数1の行列で張られることを確認し、本文の階数3の例との差を説明してください。

<!-- solution-start -->
##### 詳細解答

与式は2項の表示なので [階数の定義](#def-tsp2-tensor-rank)から $R_K(t)\le2$ です。第1添字を固定した行列は

$$
A=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad B=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

仮に $t=u\otimes v\otimes z$ と書ければ、$u=pe_1+qe_2$ として [TSP1の基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)より $A=pN,B=qN$ となります。$N$ は $v,z$ の座標から作る外積行列です。しかし $A,B$ は異なる対角成分に1を持つため一次独立です。共通の一枚 $N$ のスカラー倍にはなれません。よって階数は2です。

二枚はどちらも階数1であり、二次元の線形包を自分たちで張ります。[階数3の例](#thm-tsp2-three-factor-rank)では二次元の線形包の中に独立な階数1の行列が二枚存在しません。この違いが最短項数を変えています。
<!-- solution-end -->

### Level C

<a id="ex-tsp2-c01"></a>

#### TSP2-C01 任意の長さの対角型テンソル
- Level: C
- ID: TSP2-C01

体 $K$ 上の三つの $n$ 次元空間（$n\ge1$）の基底を $e_i,f_i,g_i$ とします。次のテンソルの階数を求め、どのような分解もその項数未満にはできないことを、成分比較によって示してください。

$$
D=\sum_{i=1}^n e_i\otimes f_i\otimes g_i.
$$

<!-- solution-start -->
##### 詳細解答

表示は非零の積 $n$ 項なので $R_K(D)\le n$ です。任意の $r$ 項の表示を取り、$D=\sum_{s=1}^r u_s\otimes v_s\otimes z_s$ とします。第1因子を $u_s=\sum_i p_{is}e_i$ と展開し、第2、第3因子の座標をそれぞれ $a_s,b_s\in K^n$ とします。

第1添字 $i$ を固定した係数行列を $M_i$ とすると、元の $D$ の表示から $M_i$ は $(i,i)$ 成分だけが1、他は零です。別の表示に [TSP1の基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)を適用すると

$$
(M_i)_{jk}=\sum_{s=1}^r p_{is}(a_s)_j(b_s)_k.
$$

従って全ての $i$ について

$$
M_i=\sum_{s=1}^r p_{is}a_s b_s^{\mathsf T}.
$$

$r$ 枚の行列 $a_s b_s^{\mathsf T}$ が張る空間の中に、$n$ 枚の $M_i$ が全て含まれます。$\sum_i c_iM_i=0$ の $(j,j)$ 成分は $c_j=0$ なので $M_1,\ldots,M_n$ は一次独立です。よって [体上の次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)からその空間の次元は $n$ 以上、一方 $r$ 個の元で張られるので $r$ 以下です。従って $r\ge n$ となります。これは任意の表示に成立し、上界と合わせて $R_K(D)=n$ です。
<!-- solution-end -->

## 6. 次に進む

テンソル階数を求めるには短い表示という上界と、それより短い表示が不可能という下界の双方が必要です。二因子では列空間の次元が両方を一致させます。三因子では行列化だけでは階数を完全に決められない例を確認しました。次講では添字を二つの組へ分ける平坦化と、そこから得られる一般的な下界を学びます。
