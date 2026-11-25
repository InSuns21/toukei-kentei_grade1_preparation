# TSP3 平坦化と部分空間の階数下界

前講の[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank)を求めるには、短い分解を見つけるだけでなく、それより短い分解が存在しないことも示す必要があります。今回は、添字を二組にまとめて行列階数を計算する方法と、行列を集めた部分空間そのものを調べる方法を学びます。

## 1. 添字を二組にまとめる

以下、係数体を任意の体 $K$ とし、$V_a$ は有限次元の $K$ 上のベクトル空間とします。$R_K(t)$ は元の因子分けに関するテンソル階数です。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)に従い、$a$ を因子番号、$i_a$ を第 $a$ 因子の基底番号とします。上付きの $(a)$ は因子番号であり、べきではありません。テンソルの係数は

$$
t=\sum_{i_1=1}^{n_1}\cdots\sum_{i_d=1}^{n_d}
t_{i_1\ldots i_d}e_{i_1}^{(1)}\otimes\cdots\otimes e_{i_d}^{(d)},
\qquad n_a=\dim_K V_a
$$

で一意に定まります。例えば三因子の成分 $t_{ijk}$ について、第1添字を行、第2・第3添字の組を列とすれば、普通の行列になります。どの成分も一度ずつ現れるため、成分の情報は失われません。しかし、行列の rank-one 分解では、第2・第3因子を分離する制約がなくなります。この緩和を下界に利用します。添字の組は辞書式順序、すなわち組の最初の異なる位置の番号で大小を決める順序に並べます。行列階数 $\operatorname{rank}_K M$ は列の[線形包](../../../代数系/FLD/FLD0/index.md#def-fld0-span-over-field)の[次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)です。[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)により、階数1の行列は非零の二つの座標列の外積として表せます。

<a id="def-tsp3-flattening"></a>

<!-- formal-statement-start -->
> **定義（テンソルの平坦化）**
>
> 体 $K$ 上の有限次元空間 $V_1,\ldots,V_d$（$d\ge2$）の基底を $(e^{(a)}_i)_{i=1}^{n_a}$ とし、$n_a=\dim_K V_a$ とする。テンソル $t\in V_1\otimes\cdots\otimes V_d$ を取る。位置集合を二つの非空な互いに素な集合 $I,J$ に分け、$I\cup J=\{1,\ldots,d\}$ とする。各集合内では位置番号の昇順を用いる。テンソル $t$ の係数 $t_{i_1\ldots i_d}$ を、$I$ に属する添字の組 $\alpha$ を行、$J$ に属する添字の組 $\beta$ を列として並べた行列
>
$$
 F_{I|J}(t)_{\alpha,\beta}=t_{i_1\ldots i_d}
$$
>
> をこの分割に関する平坦化（flattening）とする。行・列の組は辞書式順序とし、行数は $\prod_{a\in I} n_a$、列数は $\prod_{b\in J}n_b$ である。
<!-- formal-statement-end -->

零次元因子があれば対応する添字の組は存在せず、空の行または列を持つ行列の階数を0とします。

<!-- definition-example-start: def-tsp3-flattening -->
**定義の確認**。三つの2次元空間の基底を $e_i,f_j,g_k$ とし、$E_{ijk}=e_i\otimes f_j\otimes g_k$ と略記します。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)で $t=E_{112}+E_{211}+E_{222}$ の非零成分を読みます。分割 $1|23$ は $I=\{1\},J=\{2,3\}$ の略記で、両集合は非空・互いに素で全位置を覆います。行が $i$、列は $(j,k)=(1,1),(1,2),(2,1),(2,2)$ です。例えば $t_{112}=1$ は行1、列 $(1,2)$ に、$t_{211}=1$ は行2、列 $(1,1)$ に、$t_{222}=1$ は行2、列 $(2,2)$ に入ります。

$$
 F_{1|23}(t)=\begin{pmatrix}0&1&0&0\\1&0&0&1\end{pmatrix}.
$$

分割 $2|13$ では行が $j$、列が $(i,k)$ となり、

$$
 F_{2|13}(t)=\begin{pmatrix}0&1&1&0\\0&0&0&1\end{pmatrix}.
$$

どちらも $2\times4$ 行列で、指定した三成分にだけ1が入ります。各組を元の位置に戻せば元の配列が復元できます。
<!-- definition-example-end -->

## 2. 行列階数が下界になる理由

平坦化により元の分解の各項は一つの外積行列になります。したがって列方向がいくつ必要かを数えれば、元の分解に必要な項数を評価できます。

<a id="thm-tsp3-flattening-bound"></a>

<!-- formal-statement-start -->
> **定理（平坦化による階数下界）**
>
> 体 $K$ 上の有限次元空間 $V_a$（$1\le a\le d$、$d\ge2$）のテンソル積の元 $t$ と、位置集合の非空な二分割 $I,J$ を取る。任意の因子の基底について
>
$$
 \operatorname{rank}_K F_{I|J}(t)\le R_K(t).
$$
>
> 左辺は因子の基底の選択によらない。
<!-- formal-statement-end -->

### 証明の見取り図

[テンソル階数の定義](../TSP2/index.md#def-tsp2-tensor-rank)で最短の積の和を取ると、一項ごとに行側と列側へ座標の積を振り分けられます。基底の独立性については、各側の因子を一つの空間にまとめ直し、[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)を使います。

<!-- proof-start -->
### 証明

$t=0$ なら両辺0です。非零の場合、[テンソル階数の定義](../TSP2/index.md#def-tsp2-tensor-rank)に従い、$r=R_K(t)$ として最短表示を取ります。

$$
t=\sum_{s=1}^r\bigotimes_{a=1}^d v_s^{(a)},\qquad
v_s^{(a)}=\sum_{i=1}^{n_a}x^{(a)}_{is}e_i^{(a)}.
$$

$s$ は分解の項番号、$i$ は第 $a$ 因子の基底番号です。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)により

$$
 t_{i_1\ldots i_d}=\sum_{s=1}^r\prod_{a=1}^d x^{(a)}_{i_a s}.
$$

行側と列側の座標列をそれぞれ $p_s,q_s$ と置き、

$$
 (p_s)_\alpha=\prod_{a\in I}x^{(a)}_{i_a s},
 \qquad
 (q_s)_\beta=\prod_{b\in J}x^{(b)}_{i_b s}
$$

とすれば、$\mathsf T$ は転置（複素共役は取らない）なので、第 $(\alpha,\beta)$ 成分は

$$
\begin{aligned}
\left(\sum_{s=1}^r p_s q_s^{\mathsf T}\right)_{\alpha,\beta}
&=\sum_{s=1}^r(p_s)_\alpha(q_s)_\beta\\
&=\sum_{s=1}^r\prod_{a=1}^d x^{(a)}_{i_a s}\\
&=F_{I|J}(t)_{\alpha,\beta}.
\end{aligned}
$$

従って

$$
 F_{I|J}(t)=\sum_{s=1}^r p_s q_s^{\mathsf T}.
$$

第 $\beta$ 列は $\sum_s(q_s)_\beta p_s$ なので、列空間は $p_1,\ldots,p_r$ の[線形包](../../../代数系/FLD/FLD0/index.md#def-fld0-span-over-field)に含まれます。その次元は高々 $r$ であり、下界を得ます。

次に $A=\bigotimes_{a\in I} V_a$、$B=\bigotimes_{b\in J}V_b$ と置き、各積の因子を番号順に取ります。一因子だけの積はその空間自身です。[多因子のテンソル積の普遍性](../TSP1/index.md#def-tsp1-multifactor-product)を、各入力を行側または列側の積に入れる多重線形写像へ適用すると、線形写像 $\Phi$ が定まります。

$$
 \Phi:\bigotimes_{a=1}^d V_a\longrightarrow A\otimes B,
$$

$$
 \Phi\left(\bigotimes_{a=1}^d v_a\right)
 =\left(\bigotimes_{a\in I}v_a\right)
 \otimes\left(\bigotimes_{b\in J}v_b\right).
$$

右辺は各入力の位置で線形です。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis)により、元の基底の組は $\Phi$ によって行側・列側の基底の組へ一対一に対応するので、$\Phi$ は線形同型です。係数行列は定義どおり $F_{I|J}(t)$ です。

[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)を $A,B$ と $\Phi(t)$ に適用すると、平坦化の階数は $A,B$ の二因子として測った $\Phi(t)$ の階数に等しくなります。$\Phi$ の単純テンソル上の式は基底を使わず定まり、二因子としての階数も基底によらないので結論を得ます。零次元因子の場合は全テンソル積が零空間であり、階数は0です。
<!-- proof-end -->

上の例では $F_{1|23}(t)$ の第1列と第2列が一次独立なので階数は2です。一方、$t$ の第2・第3因子をまとめた行列の分解は、その二因子の内部をさらに積に分けられるとは限りません。

## 3. 行列の部分空間を調べる

三因子 $U,V,W$ に絞ります。次元をそれぞれ $m,n,p$、基底を $e_i,f_j,g_k$ とします。添字 $i,j,k$ はそれぞれ $1$ から $m,n,p$ まで動きます。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)を第1添字ごとにまとめ、

$$
 t=\sum_{i=1}^m e_i\otimes M_i,\qquad
 M_i=\sum_{j,k}t_{ijk} f_j\otimes g_k
$$

と書きます。$i$ を固定し、残りの $j,k$ を行・列にすると、$M_i$ の係数行列は $n\times p$ で、その $(j,k)$ 成分は $t_{ijk}$ です。以下では $V\otimes W$ の元と、その係数行列を同じ記号で表します。これは基底展開の係数が一意で、線形結合が成分ごとの線形結合に対応するためです。各切片 $M_i$ の線形結合全体、つまり[線形包](../../../代数系/FLD/FLD0/index.md#def-fld0-span-over-field)を考えます。第1因子の基底を変更すると切片自体は変わりますが、その線形包は変わらないことを示します。

<a id="def-tsp3-slice-space"></a>

<!-- formal-statement-start -->
> **定義（切片部分空間）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と $t\in U\otimes V\otimes W$ を取る。$U$ の基底 $e_1,\ldots,e_m$ に対し、$t=\sum_{i=1}^m e_i\otimes M_i$ と一意に展開する。ただし $M_i\in V\otimes W$ とする。切片部分空間 $S_U(t)$ を
>
$$
 S_U(t)=\operatorname{span}_K\{M_1,\ldots,M_m\}\subseteq V\otimes W
$$
>
> とする。
<!-- formal-statement-end -->

[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)で $V,W$ の基底も選べば、各 $M_i$ の係数は $t_{ijk}$ そのものです。従って展開は存在して一意です。

$U$ の別の基底を $h_1,\ldots,h_m$ として、旧基底を

$$
 e_i=\sum_{l=1}^m p_{li}h_l
$$

と展開します。[多因子テンソル積の線形性](../TSP1/index.md#def-tsp1-multifactor-product)により、

$$
\begin{aligned}
 t&=\sum_i\sum_l p_{li}h_l\otimes M_i\\
  &=\sum_l h_l\otimes\left(\sum_i p_{li}M_i\right).
\end{aligned}
$$

新しい切片は $M'_l=\sum_i p_{li}M_i$ なので、新しい線形包は旧線形包に含まれます。逆に $h_l$ を $e_i$ の線形結合として展開して同じ式を逆向きに適用すれば、旧線形包も新線形包に含まれます。従って両者は一致し、定義は $U$ の基底に依存しません。$V,W$ の基底変更は、同じ $V\otimes W$ の元の行列表示を変えるだけです。

$F_{1|23}(t)$ の各行は $M_i$ の全成分を並べたものです。その行空間の次元は $\dim_K S_U(t)$ です。行空間と列空間の次元が等しいことは、[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)を二因子の両順序に適用しても分かります。因子交換は分解の項数を保存するからです。

<!-- definition-example-start: def-tsp3-slice-space -->
**定義の確認**。$t=E_{111}+E_{122}+E_{212}$ とします。[切片部分空間の定義](#def-tsp3-slice-space)に従い、$e_1,e_2$ の係数を集めると

$$
t=e_1\otimes(f_1\otimes g_1+f_2\otimes g_2)
  +e_2\otimes(f_1\otimes g_2).
$$

第1切片には $(j,k)=(1,1),(2,2)$、第2切片には $(1,2)$ の成分だけが1となるので

$$
 M_1=\begin{pmatrix}1&0\\0&1\end{pmatrix},
 \quad M_2=\begin{pmatrix}0&1\\0&0\end{pmatrix}.
$$

二枚の切片の任意の線形結合は

$$
 aM_1+bM_2=\begin{pmatrix}a&b\\0&a\end{pmatrix}.
$$

$a,b\in K$ は任意なので、この形の行列全体がちょうど切片部分空間です。$(1,1)$ と $(1,2)$ 成分を読めば $M_1,M_2$ は独立で、次元は2です。
<!-- definition-example-end -->

### 3.1 階数1の行列による被覆

直前の例では切片部分空間が2次元なので、第1因子の平坦化の階数は2です。二枚の行列で切片部分空間を張れますが、それらが階数1であるとは限りません。元の三因子の分解では、切片を含む空間を階数1の行列から作らなければなりません。

<a id="thm-tsp3-slice-span"></a>

<!-- formal-statement-start -->
> **定理（切片部分空間の階数1被覆による特徴付け）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と $t\in U\otimes V\otimes W$ を取る。$R_K(t)$ は、階数1の行列 $N_1,\ldots,N_r$（$V,W$ の基底に関する係数行列）で
>
$$
 S_U(t)\subseteq\operatorname{span}_K\{N_1,\ldots,N_r\}
$$
>
> を満たす非負整数 $r$ の最小値に等しい。空集合の線形包は零空間とする。
<!-- formal-statement-end -->

### 証明の見取り図

分解を一つ持てば、各切片はその分解に含まれる外積行列の線形結合です。逆に切片ごとの線形結合の係数を第1因子に集めれば、三因子の分解が復元できます。

<!-- proof-start -->
### 証明

[テンソル階数の定義](../TSP2/index.md#def-tsp2-tensor-rank)で最短表示

$$
 t=\sum_{s=1}^r u_s\otimes v_s\otimes w_s
$$

を取ります。各因子は非零であり、$N_s=v_s\otimes w_s$ の係数行列は[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)により階数1です。$u_s=\sum_i c_{is}e_i$ と基底展開すると

$$
 t=\sum_i e_i\otimes\left(\sum_{s=1}^r c_{is}N_s\right).
$$

係数の一意性により $M_i=\sum_s c_{is}N_s$ です。[切片部分空間の定義](#def-tsp3-slice-space)から各 $M_i$ の線形包も $N_s$ の線形包に含まれます。したがって被覆に必要な最小個数は $R_K(t)$ 以下です。

逆に $S_U(t)$ を含む $r$ 枚の階数1行列があると仮定します。[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)から $N_s=v_s\otimes w_s$ と書けます。各切片 $M_i$ は $S_U(t)$ に属するので、係数 $c_{is}\in K$ を選んで

$$
 M_i=\sum_{s=1}^r c_{is}N_s
$$

と表せます。これを元のテンソルの基底展開へ代入し、[多因子テンソル積の線形性](../TSP1/index.md#def-tsp1-multifactor-product)でまとめると

$$
\begin{aligned}
 t&=\sum_i e_i\otimes M_i\\
  &=\sum_i\sum_s c_{is} e_i\otimes v_s\otimes w_s\\
  &=\sum_s\left(\sum_i c_{is}e_i\right)\otimes v_s\otimes w_s.
\end{aligned}
$$

第1因子が零の項を除けば高々 $r$ 項です。ゆえに $R_K(t)\le r$。最小値を取れば逆向きの不等式が成立します。零テンソルでは空和と空集合の線形包の双方が使えます。
<!-- proof-end -->

特に $s=\dim_K S_U(t)$ なら $R_K(t)\ge s$ です。$R_K(t)=s$ となる必要十分条件は、$S_U(t)$ 自身が階数1行列の基底を持つことです。実際、$s$ 枚で被覆できれば、その線形包の次元は高々 $s$ で、$s$ 次元の $S_U(t)$ を含むので一致し、$s$ 枚は基底です。逆にそのような基底があれば $s$ 枚で被覆できます。$s=0$ では空基底を許します。

先ほどの例では二列の線形結合が零になる条件は

$$
x\begin{pmatrix}a\\0\end{pmatrix}
+y\begin{pmatrix}b\\a\end{pmatrix}
=\begin{pmatrix}ax+by\\ay\end{pmatrix}=0
$$

です。$a\ne0$ なら第2成分から $y=0$、第1成分から $x=0$ となり、階数は2です。$a=0,b\ne0$ なら第2列だけが非零なので階数1です。階数1の行列は $M_2$ の非零スカラー倍に限られます。従って $S_U(t)$ は階数1行列二枚では張れず、$R_K(t)\ge3$。元の3項表示から $R_K(t)\le3$ なので階数は3です。三つの一対二の平坦化はどれも2行なので階数は高々2であり、この例では平坦化だけでは正確な答えを得られません。

## 4. 部分空間の最小の非零行列階数も使う

切片部分空間の次元だけでなく、その中で最も階数の低い非零行列を調べると下界を強められます。例えば二次元の部分空間のすべての非零行列が階数2なら、階数1行列二枚で被覆することはできません。一般の次元でも、係数の一部を零にすることで必要項数を評価できます。

<a id="thm-tsp3-subspace-minrank"></a>

<!-- formal-statement-start -->
> **定理（部分空間の最小非零階数による下界）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と非零テンソル $t\in U\otimes V\otimes W$ を取る。$S=S_U(t)$ と置き、
>
$$
 s=\dim_K S,\qquad
 q=\min_{0\ne M\in S}\operatorname{rank}_K M
$$
>
> とする。ここで行列階数は $V,W$ の任意の基底に関するものとする。このとき
>
$$
 R_K(t)\ge s+q-1.
$$
<!-- formal-statement-end -->

[切片部分空間の定義](#def-tsp3-slice-space)より、$t\ne0$ なら少なくとも一枚の $M_i$ が非零なので $s\ge1$ です。非零行列の階数は1以上の有限整数であり、最小値 $q$ が存在します。[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)から、各 $M\in S$ の行列階数は $V,W$ の基底に依存せず、従って $q$ も基底に依存しません。

### 証明の見取り図

最短の被覆で使う行列は一次独立でなければなりません。その基底で部分空間を座標化し、最初の $s-1$ 個の係数を零にする非零の元を探します。残った行列の枚数とその元の階数を比較します。

<!-- proof-start -->
### 証明

[切片部分空間の階数1被覆による特徴付け](#thm-tsp3-slice-span)を用い、$r=R_K(t)$ 枚の階数1行列 $N_1,\ldots,N_r$ で $S$ を被覆します。もし一次従属なら、非零係数を持つ一枚を他の線形結合として表して除けます。残りでも同じ空間を張るため最小性に反します。従って $N_1,\ldots,N_r$ は一次独立です。

その線形包を $H$ とします。任意の $M\in S\subseteq H$ は一意に $M=\sum_{j=1}^r c_j(M)N_j$ と書け、係数 $c_j(M)$ は線形です。$r\ge s$ なので、最初の $s-1$ 個の座標を取る線形写像

$$
 P:S\to K^{s-1},\qquad P(M)=(c_1(M),\ldots,c_{s-1}(M))
$$

が定まります。[階数・退化次数の定理](../../../代数系/FLD/FLD0/index.md#thm-fld0-rank-nullity-over-field)を $P$ に適用すると

$$
 \dim_K\ker P=s-\dim_K\operatorname{Im}P
 \ge s-(s-1)=1.
$$

従って $0\ne M\in\ker P$ を選べます。この $M$ は

$$
 M=\sum_{j=s}^r c_j(M)N_j
$$

と書けます。各 $N_j$ は階数1なので、その列空間は高々1次元です。和の列はそれらの列空間の和に含まれ、全体の次元は高々 $r-s+1$ です。一方 $M\in S\setminus\{0\}$ なので階数は $q$ 以上です。よって

$$
 q\le\operatorname{rank}_K M\le r-s+1
$$

から $r\ge s+q-1$ を得ます。$s=1$ では $P$ は零空間への写像であり、同じ議論が成立します。
<!-- proof-end -->

$K=\mathbb R$ で、切片が

$$
 A=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
 \qquad B=\begin{pmatrix}0&1\\1&0\end{pmatrix}
$$

のテンソルを考えます。二枚は独立であり、$aA+bB$ の行列式は $-a^2-b^2$ です。実数では $(a,b)\ne(0,0)$ ならこれは非零です。従って $s=q=2$ で、下界は3です。上界を得るには

$$
 N_1=\begin{pmatrix}1&0\\0&0\end{pmatrix},
 \quad N_2=\begin{pmatrix}0&0\\0&1\end{pmatrix},
 \quad N_3=\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$

を使います。三枚とも階数1です。最初の二枚は非零列が一本だけで、最後の一枚は二列が等しい非零列です。$A=N_1-N_2$、$B=N_3-N_1-N_2$ なので [階数1被覆の特徴付け](#thm-tsp3-slice-span)から階数はちょうど3です。複素数では $a=1,b=\mathrm i$ で行列式が零になるため、実数での下界の根拠はそのまま移せません。係数体を明記する理由です。

## 5. 演習

以下、断りがなければ $K$ は任意の体、$E_{ijk}=e_i\otimes f_j\otimes g_k$ とし、基底は問題で指定された次元のものとします。

### Level A

<a id="ex-tsp3-a01"></a>

#### TSP3-A01 添字の再配置
- Level: A
- ID: TSP3-A01

次元 $(2,3,2)$ のテンソル $t=E_{132}+E_{211}+E_{222}$ の $F_{1|23}(t)$ を求め、その階数から下界を得てください。

<!-- solution-start -->
##### 詳細解答

[平坦化の定義](#def-tsp3-flattening)で列を $(1,1),(1,2),(2,1),(2,2),(3,1),(3,2)$ と並べます。非零成分は第1行第6列、第2行第1・第4列です。

$$
 F_{1|23}(t)=\begin{pmatrix}0&0&0&0&0&1\\1&0&0&1&0&0\end{pmatrix}.
$$

第1列は $(0,1)^{\mathsf T}$、第6列は $(1,0)^{\mathsf T}$ なので独立です。2行しかないので階数は2。[平坦化による階数下界](#thm-tsp3-flattening-bound)から $R_K(t)\ge2$ です。
<!-- solution-end -->

<a id="ex-tsp3-a02"></a>

#### TSP3-A02 単純テンソルの平坦化
- Level: A
- ID: TSP3-A02

三つの2次元空間で $t=(e_1+e_2)\otimes f_2\otimes(g_1+g_2)$ の $F_{2|13}(t)$ とその階数を求めてください。

<!-- solution-start -->
##### 詳細解答

[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)により第2添字が2である四成分はすべて1、残りは0です。列は $(i,k)$ の辞書式順序なので

$$
 F_{2|13}(t)=\begin{pmatrix}0&0&0&0\\1&1&1&1\end{pmatrix}
 =\begin{pmatrix}0\\1\end{pmatrix}(1,1,1,1).
$$

全列は同じ非零列であり、列空間の次元は1です。これは一つの積の平坦化が外積になることの具体例です。
<!-- solution-end -->

<a id="ex-tsp3-a03"></a>

#### TSP3-A03 切片の重複
- Level: A
- ID: TSP3-A03

次元 $(3,2,2)$ のテンソル $t=E_{111}+E_{211}+E_{322}$ の切片部分空間の基底と次元を求めてください。

<!-- solution-start -->
##### 詳細解答

[切片部分空間の定義](#def-tsp3-slice-space)に従い、第1添字を固定します。

$$
 M_1=M_2=\begin{pmatrix}1&0\\0&0\end{pmatrix},
 \qquad M_3=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

切片の一般の線形結合は $(c_1+c_2)M_1+c_3M_3$ になります。任意の係数 $a,b$ は $c_1=a,c_2=0,c_3=b$ で実現でき、$aM_1+bM_3=0$ なら対角成分から $a=b=0$ です。従って基底は $M_1,M_3$、次元は2です。
<!-- solution-end -->

<a id="ex-tsp3-a04"></a>

#### TSP3-A04 被覆から分解を復元
- Level: A
- ID: TSP3-A04

三つの2次元空間で切片が $M_1=N_1+N_2,M_2=N_1$、ただし $N_1=f_1\otimes g_2,N_2=f_2\otimes g_1$ であるテンソルの階数を求めてください。

<!-- solution-start -->
##### 詳細解答

[階数1被覆の特徴付け](#thm-tsp3-slice-span)の構成に従って係数を集めます。

$$
\begin{aligned}
 t&=e_1\otimes(N_1+N_2)+e_2\otimes N_1\\
 &=(e_1+e_2)\otimes f_1\otimes g_2
   +e_1\otimes f_2\otimes g_1.
\end{aligned}
$$

二項なので上界2です。$aM_1+bM_2=(a+b)N_1+aN_2=0$ とすると、$(2,1)$ 成分から $a=0$、$(1,2)$ 成分から $b=0$。二枚は独立で、切片部分空間は次元2です。[階数1被覆の特徴付け](#thm-tsp3-slice-span)から下界2となり、階数は2です。
<!-- solution-end -->

### Level B

<a id="ex-tsp3-b01"></a>

#### TSP3-B01 四因子の分割による差
- Level: B
- ID: TSP3-B01

四つの2次元空間の基底を $e_i,f_j,g_k,h_l$ とし、

$$
 t=\sum_{i,j=1}^2 e_i\otimes f_j\otimes g_i\otimes h_j
$$

とします。分割 $12|34$ と $13|24$ の平坦化の階数を計算し、元の階数を求めてください。

<!-- solution-start -->
##### 詳細解答

[平坦化の定義](#def-tsp3-flattening)で各側の添字組を $(1,1),(1,2),(2,1),(2,2)$ と並べます。非零成分の添字は $(i,j,i,j)$ です。$12|34$ では行も列も $(i,j)$ なので、単位行列 $I_4$ を得ます。$13|24$ では行が $(i,i)$、列が $(j,j)$ ですから

$$
 F_{13|24}(t)=
 \begin{pmatrix}1&0&0&1\\0&0&0&0\\0&0&0&0\\1&0&0&1\end{pmatrix}.
$$

前者の4列は独立で階数4、後者の第1・第4列は等しい非零列で、残りは零なので階数1です。[平坦化による階数下界](#thm-tsp3-flattening-bound)から $R_K(t)\ge4$。与式は4項の表示なので $R_K(t)=4$ です。どの分割を選ぶかが評価の強さを変えます。
<!-- solution-end -->

<a id="ex-tsp3-b02"></a>

#### TSP3-B02 階数1の基底が存在しない例
- Level: B
- ID: TSP3-B02

三つの2次元空間で $t=E_{112}+E_{121}+E_{222}$ とします。切片部分空間を用いて階数を求めてください。

<!-- solution-start -->
##### 詳細解答

第1添字ごとの切片を作ると

$$
 M_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},
 \qquad M_2=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

[切片部分空間の定義](#def-tsp3-slice-space)より $S=S_U(t)$ の任意の元は

$$
aM_1+bM_2=\begin{pmatrix}0&a\\a&b\end{pmatrix},
\qquad a,b\in K
$$

です。$(1,2)$ と $(2,2)$ 成分から二枚は独立です。$a\ne0$ のとき、二列の線形結合が零なら第1成分から $ay=0$、第2成分から $ax+by=0$ となり、$y=x=0$ です。従って階数2です。$a=0,b\ne0$ なら第2列だけが非零なので階数1です。従って階数1の行列は $M_2$ の非零スカラー倍だけです。$S$ は次元2ですが、$S$ に属する階数1の行列だけでは $S$ 自身を張れません。[階数1被覆の特徴付け](#thm-tsp3-slice-span)の必要十分条件より $R_K(t)>2$ です。与式が3項なので $R_K(t)=3$ です。
<!-- solution-end -->

<a id="ex-tsp3-b03"></a>

#### TSP3-B03 基底変更と切片の線形包
- Level: B
- ID: TSP3-B03

$U,V,W$ は2次元とし、$t=e_1\otimes M_1+e_2\otimes M_2$ で $M_1=f_1\otimes g_1,M_2=f_2\otimes g_2$ とします。$U$ の基底を $h_1=e_1+e_2,h_2=e_2$ に替えたときの切片を計算し、平坦化の階数を比較してください。

<!-- solution-start -->
##### 詳細解答

$e_1=h_1-h_2,e_2=h_2$ と逆に表せるため、新しい二本は基底です。[多因子テンソル積の線形性](../TSP1/index.md#def-tsp1-multifactor-product)から

$$
 t=h_1\otimes M_1+h_2\otimes(M_2-M_1).
$$

新しい切片 $M'_1=M_1,M'_2=M_2-M_1$ は旧切片の線形包に属します。逆に $M_1=M'_1,M_2=M'_1+M'_2$ なので旧切片も新切片の線形包に属し、二つの空間は一致します。[平坦化の定義](#def-tsp3-flattening)に従い、旧基底と新基底での $F_{1|23}(t)$ をそれぞれ $F,F'$ と書きます。

$$
 F=\begin{pmatrix}1&0&0&0\\0&0&0&1\end{pmatrix},
 \qquad F'=\begin{pmatrix}1&0&0&0\\-1&0&0&1\end{pmatrix}.
$$

両方とも第1・第4列が独立で、階数は2です。これは[平坦化による階数下界](#thm-tsp3-flattening-bound)の基底不変性と一致します。
<!-- solution-end -->

<a id="ex-tsp3-b04"></a>

#### TSP3-B04 係数体を変えたときの階数
- Level: B
- ID: TSP3-B04

本文第4節の2行2列の切片 $A=\operatorname{diag}(1,-1)$ と $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ を持つテンソルを、複素数体上で考えます。階数を求め、実数体上の結果と比較してください。

<!-- solution-start -->
##### 詳細解答

複素数体で $\mathrm i^2=-1$ とし、次の二枚を取ります。

$$
 N_+=A+\mathrm iB=
 \begin{pmatrix}1&\mathrm i\\\mathrm i&-1\end{pmatrix},
 \qquad
 N_-=A-\mathrm iB=
 \begin{pmatrix}1&-\mathrm i\\-\mathrm i&-1\end{pmatrix}.
$$

各行列の第2列は第1列のそれぞれ $\mathrm i$ 倍、$-\mathrm i$ 倍です。第1列は非零なので両者とも階数1です。足し引きすると

$$
 A=\frac{N_++N_-}{2},
 \qquad
 B=\frac{N_+-N_-}{2\mathrm i}.
$$

従って二枚で切片部分空間を被覆できます。[階数1被覆の特徴付け](#thm-tsp3-slice-span)より上界は2です。$aA+bB=0$ の $(1,1),(1,2)$ 成分から $a=b=0$ なので部分空間の次元は2で、同定理による下界も2です。よって複素数体上の階数は2です。

実数体では非零の $aA+bB$ の行列式 $-a^2-b^2$ が消えないため、[最小非零階数による下界](#thm-tsp3-subspace-minrank)は3であり、本文の三枚の被覆で達成されます。係数体の拡大によって新しい階数1行列が現れ、階数が3から2へ減少しました。
<!-- solution-end -->

### Level C

<a id="ex-tsp3-c01"></a>

#### TSP3-C01 最小非零階数を利用した下界
- Level: C
- ID: TSP3-C01

$K=\mathbb R$、$U=\mathbb R^2$、$V=W=\mathbb R^3$ とします。切片が

$$
 A=\begin{pmatrix}1&0&0\\0&-1&0\\0&0&1\end{pmatrix},
 \quad B=\begin{pmatrix}0&1&0\\1&0&0\\0&0&0\end{pmatrix}
$$

である $t=e_1\otimes A+e_2\otimes B$ について、切片部分空間の次元と最小非零階数を求め、すべての平坦化による下界と比較してください。また、4枚以下の階数1行列で被覆してください。

<!-- solution-start -->
##### 詳細解答

[切片部分空間の定義](#def-tsp3-slice-space)によれば元はすべて

$$
 M=aA+bB=
 \begin{pmatrix}a&b&0\\b&-a&0\\0&0&a\end{pmatrix}.
$$

$(1,1),(1,2)$ 成分から $M=0$ なら $a=b=0$ なので $s=2$ です。非零の $M$ では左上の二行二列の行列式が $-a^2-b^2\ne0$ であり、その二列は独立です。よって階数は2以上。$a=0,b=1$ で階数2を実現するので $q=2$ です。[部分空間の最小非零階数による下界](#thm-tsp3-subspace-minrank)から

$$
 R_{\mathbb R}(t)\ge 2+2-1=3.
$$

次に [平坦化の定義](#def-tsp3-flattening)で列の組を辞書式順序にします。

$$
 F_{1|23}(t)=
 \begin{pmatrix}1&0&0&0&-1&0&0&0&1\\0&1&0&1&0&0&0&0&0\end{pmatrix}.
$$

第1・第2列は独立なので階数2です。

$$
 F_{2|13}(t)=
 \begin{pmatrix}1&0&0&0&1&0\\0&-1&0&1&0&0\\0&0&1&0&0&0\end{pmatrix}.
$$

第1・第2・第3列が独立なので階数3です。両切片は転置しても変わりません。つまり全添字で $t_{ijk}=t_{ikj}$ です。$F_{3|12}(t)$ の行 $k$、列 $(i,j)$ の成分は $t_{ijk}$ なので、$F_{2|13}(t)$ の行 $k$、列 $(i,j)$ の成分 $t_{ikj}$ と一致します。従って階数3です。分割の左右交換は転置に対応し、第3節で示した行空間と列空間の次元の一致により階数を保存します。従って平坦化からの最大下界も3です。

最後に $N_1=f_1\otimes g_1$、$N_2=f_2\otimes g_2$、$N_3=(f_1+f_2)\otimes(g_1+g_2)$、$N_4=f_3\otimes g_3$ と置きます。いずれも両因子が非零なので、[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)により階数1です。

$$
 A=N_1-N_2+N_4,\qquad B=N_3-N_1-N_2.
$$

[階数1被覆の特徴付け](#thm-tsp3-slice-span)で $R_{\mathbb R}(t)\le4$ を得ます。以上の評価だけからは階数3か4かは決まりません。下界と上界が一致していないときに等号を断定してはいけません。
<!-- solution-end -->

## 6. 次に進む

平坦化は一部の因子をまとめ、行列階数を下界として計算します。切片部分空間は、階数1の行列による被覆という元の分解の制約を保持するため、より細かな判定を与えます。次講では因子ごとに線形写像を適用し、テンソルから別のテンソルを作れるかという関係を調べます。
