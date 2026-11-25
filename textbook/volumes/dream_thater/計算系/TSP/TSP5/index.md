# TSP5 直和・Kronecker積・制限の前順序

前講では、各因子に線形写像を作用させ、あるテンソルから別のテンソルを取り出すことを学びました。今回は二つの材料を一緒に使う方法を考えます。別々の座標領域に並べる操作と、各位置で二つの座標を組にする操作です。これらが制限と両立することを示すと、材料の変換を足し算・掛け算に似た規則で扱えるようになります。

## 1. 独立した座標領域に並べる

以下では任意の体 $K$ と因子数 $d\ge2$ を固定します。各位置の空間は有限次元です。$t\in\bigotimes_{a=1}^d V_a$、$s\in\bigotimes_{a=1}^d W_a$ とします。[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank) と [テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) には記号 $R_K,Q_K$ を用います。

二つの材料を混ぜずに並べるには、位置 $a$ ごとに空間を $V_a\oplus W_a$ に広げます。ここで空間の直和とは組 $(v,w)$ を成分ごとに加算・スカラー倍する空間です。包含写像 $i_a(v)=(v,0)$、$j_a(w)=(0,w)$ により、それぞれの材料を別の座標に置けます。

<a id="def-tsp5-direct-sum"></a>

<!-- formal-statement-start -->
> **定義（テンソルの直和）**
>
> 体 $K$ 上の有限次元空間 $V_a,W_a$（$1\le a\le d$、$d\ge2$）と $t\in\bigotimes_a V_a$、$s\in\bigotimes_a W_a$ に対し、$i_a:V_a\to V_a\oplus W_a$、$j_a:W_a\to V_a\oplus W_a$ を $i_a(v)=(v,0)$、$j_a(w)=(0,w)$ で定める包含写像とする。直和 $t\oplus s$ は $\bigotimes_a(V_a\oplus W_a)$ の元
>
$$
t\oplus s=(\bigotimes_a i_a)t+(\bigotimes_a j_a)s
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp5-direct-sum -->
**定義の確認**。$d=3$ として全ての $V_a=W_a=K$ を取り、$t=1\otimes1\otimes1$、$s=1\otimes1\otimes1$ とします。直和空間 $K\oplus K$ の基底を $e_1=(1,0),e_2=(0,1)$ とすると、各包含写像は $1$ をそれぞれ $e_1,e_2$ へ送ります。[局所線形写像のテンソル積](../TSP4/index.md#def-tsp4-local-map) の作用から

$$
t\oplus s=e_1^{\otimes3}+e_2^{\otimes3}.
$$

例えば $e_1\otimes e_2\otimes e_1$ の係数は0です。一方の材料の全ての因子が第1領域にあり、他方の全ての因子が第2領域にあります。この二つだけを足しているため、混合した添字は出現しません。
<!-- definition-example-end -->

一般に $V_a,W_a$ の次元を $n_a,m_a$ とし、それぞれの基底を $e_{ai},f_{aj}$ とします。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) により、各位置で両基底を連結した基底を取れば、直和の係数は

$$
(t\oplus s)_{k_1\ldots k_d}=
\begin{cases}
t_{k_1\ldots k_d}&(k_a\le n_a\text{ for all }a),\\
s_{k_1-n_1,\ldots,k_d-n_d}&(k_a>n_a\text{ for all }a),\\
0&\text{otherwise}.
\end{cases}
$$

これは同じ空間の二つのテンソルを単に足すこととは違います。例えば $K=\mathbb Q$ 上で非零の積 $t$ を考えると、$t+(-t)=0$ ですが、$t\oplus(-t)$ は独立した座標に二つの非零成分を持ちます。

## 2. 各位置で座標を組にする

二つの材料を同時に使用して、位置 $a$ が二つの入力を保持する操作を考えます。空間を $V_a\otimes W_a$ に替え、元のテンソル積の因子を位置ごとに並べ替えます。これがKronecker積です。単なる $2d$ 因子のテンソル積と異なり、組にした後は $d$ 因子として扱います。

<a id="def-tsp5-kronecker"></a>

<!-- formal-statement-start -->
> **定義（テンソルのKronecker積）**
>
> 体 $K$ 上の有限次元空間 $V_a,W_a$（$1\le a\le d$、$d\ge2$）と $t\in\bigotimes_a V_a$、$s\in\bigotimes_a W_a$ に対し、並べ替え写像
>
$$
\Phi:(\bigotimes_a V_a)\otimes(\bigotimes_a W_a)
\longrightarrow \bigotimes_a(V_a\otimes W_a)
$$
>
> を、単純テンソルに対して
>
$$
\Phi((\bigotimes_a v_a)\otimes(\bigotimes_a w_a))
=\bigotimes_a(v_a\otimes w_a)
$$
>
> と作用する線形写像とする。Kronecker積は $t\boxtimes s=\Phi(t\otimes s)$ と定める。
<!-- formal-statement-end -->

この写像が存在し一意であることを確認します。両辺の空間の基底は [多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) により、左辺では二組の添字 $(i_1,\ldots,i_d;j_1,\ldots,j_d)$、右辺では組の列 $((i_1,j_1),\ldots,(i_d,j_d))$ で番号付けできます。添字の並べ替えは全単射なので、この基底対応を線形に延長すると逆写像を持つ線形写像が得られます。任意の $v_a,w_a$ を各基底で展開したとき、左右の係数はどちらも各ベクトルの係数の積になるので、指定された作用を満たします。基底上の作用が指定されているため一意です。

基底の各組に関する係数は

$$
(t\boxtimes s)_{(i_1,j_1),\ldots,(i_d,j_d)}
=t_{i_1\ldots i_d}s_{j_1\ldots j_d}.
$$

位置 $a$ の新しい次元は $n_am_a$ です。全体の基底の個数は $\prod_a n_am_a=(\prod_a n_a)(\prod_a m_a)$ であり、元の二つのテンソル積空間を掛け合わせた次元と一致します。

<!-- definition-example-start: def-tsp5-kronecker -->
**定義の確認**。二因子で行列表示が $T=\begin{pmatrix}1&2\\0&1\end{pmatrix}$、$S=\begin{pmatrix}3&0\\1&2\end{pmatrix}$ となるテンソルを $\mathbb Q$ 上で考えます。各位置の基底の組を $(1,1),(1,2),(2,1),(2,2)$ の順に並べます。上の係数公式では行が $(i_1,j_1)$、列が $(i_2,j_2)$ です。従って

$$
T\boxtimes S=
\begin{pmatrix}S&2S\\0&S\end{pmatrix}
=\begin{pmatrix}
3&0&6&0\\
1&2&2&4\\
0&0&3&0\\
0&0&1&2
\end{pmatrix}.
$$

例えば第2行第4列は $t_{12}s_{22}=2\cdot2=4$ です。各因子の次元は $2\cdot2=4$ となり、4行4列の表示を得ます。
<!-- definition-example-end -->

## 3. 制限で比較すると前順序になる

[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) は、各位置に線形写像を作用させて $t$ から $s$ を得られるとき $s\preceq t$ と書く関係でした。変換を何もしない場合や、変換を続ける場合も考えると、比較に必要な二つの性質が見えてきます。

[前順序](../../../基礎論系/CAT/CAT1-02/index.md#def-cat1-02-preorder) の条件を振り返ります。集合上の二項関係が、自分自身との関係が常に成立するという反射律と、$x\preceq y$ と $y\preceq z$ から $x\preceq z$ が従うという推移律を満たすとき、前順序です。

例えば $X=\{a,b,c\}$ とし、$a,b$ に値0、$c$ に値1を対応させる関数 $f$ を取ります。$x\preceq y$ を $f(x)\le f(y)$ で定めます。任意の $x$ について $f(x)\le f(x)$ なので反射律があり、$f(x)\le f(y)\le f(z)$ なら $f(x)\le f(z)$ なので推移律もあります。しかし $a\preceq b$ かつ $b\preceq a$ でも $a\ne b$ です。

[半順序](../../../基礎科目/F0/F0-00A1D/index.md#def-f0-00a1d-partial-order) では、さらに両方向の関係が成立すれば元が等しいという反対称律を要求します。制限で比較する対象は、集合として扱うため各有限次元空間の標準座標表示を使います。すなわち次元の組 $(n_1,\ldots,n_d)$ と係数配列を一つのデータとします。基底変更は可逆な局所線形写像で実現されるため、比較結果は基底の選択に依存しません。

<a id="thm-tsp5-restriction-preorder"></a>

<!-- formal-statement-start -->
> **定理（制限の前順序性）**
>
> 体 $K$ と因子数 $d\ge2$ を固定する。全ての非負整数の次元の組を許した標準座標テンソルの集合上で、制限 $\preceq$ は前順序である。
<!-- formal-statement-end -->

反射性は恒等写像で、推移性は写像の合成で得られます。各位置の変換を独立に合成できることが理由です。

<!-- proof-start -->
### 証明

各位置の恒等写像を使うと、全ての基底の積がそのまま写るため $(\bigotimes_a I_a)t=t$ となります。従って $t\preceq t$ です。

$u\preceq s\preceq t$ とします。$t,s,u$ の因子空間をそれぞれ $V_a,W_a,U_a$ とすると、[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) により $A_a:V_a\to W_a$、$B_a:W_a\to U_a$ が存在して

$$
s=(\bigotimes_a A_a)t,\qquad
u=(\bigotimes_a B_a)s
$$

となります。任意の基底の積について

$$
(\bigotimes_a B_a)(\bigotimes_a A_a)(\bigotimes_a v_a)
=\bigotimes_a(B_aA_av_a).
$$

[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) により単純テンソルは空間全体を張るので、二つの線形写像は全体で一致します。従って $u=(\bigotimes_a B_aA_a)t$ です。各 $B_aA_a:V_a\to U_a$ は線形写像であり、$u\preceq t$ が成立します。
<!-- proof-end -->

反対称性は一般には成立しません。$d=3$ として $t=1^{\otimes3}\in K^{\otimes3}$、$s=e_1^{\otimes3}\in(K^2)^{\otimes3}$ を取ります。各位置で $1\mapsto e_1$ とすれば $s\preceq t$、逆に $e_1\mapsto1,e_2\mapsto0$ とすれば $t\preceq s$ です。次元の組が異なるため元のデータは等しくありません。使われない座標を付け足すだけでは変換能力は変わらないのです。

<a id="def-tsp5-restriction-equivalence"></a>

<!-- formal-statement-start -->
> **定義（制限同値）**
>
> 同じ体と因子数のテンソル $s,t$ に対し、$s\preceq t$ かつ $t\preceq s$ が成立するとき、制限同値 $s\sim t$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp5-restriction-equivalence -->
**定義の確認**。上の $t=1^{\otimes3}$、$s=e_1^{\otimes3}$ では、各位置の包含と射影がそれぞれの変換を実現します。双方の制限が成立しているため $t\sim s$ です。空間の次元が一致することは条件ではありません。
<!-- definition-example-end -->

この関係は反射性・対称性・推移性を持つ同値関係です。反射性は制限の反射性から、対称性は定義の両方向性から従います。$r\sim s$、$s\sim t$ なら $r\preceq s\preceq t$ と $t\preceq s\preceq r$ が成立し、[制限の前順序性](#thm-tsp5-restriction-preorder) により $r\sim t$ となります。同値なテンソルをまとめた集合を $[t]$ と書けば、$[s]\preceq[t]$ を $s\preceq t$ で定められます。代表元 $s'\sim s$、$t'\sim t$ に替えても $s'\preceq s\preceq t\preceq t'$ となり、逆方向の代表元変更も成立します。両方向に比較できれば同じ同値類なので、この集合上では半順序になります。

## 4. 変換を並行して行う

二つの材料それぞれの変換が可能なら、材料を直和やKronecker積で組み合わせた後でも、それぞれの変換を実行できるでしょうか。位置ごとに二つの写像を組み合わせればよいことを示します。

<a id="thm-tsp5-operation-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（直和・Kronecker積と制限の両立性）**
>
> 同じ体 $K$ 上で同じ因子数 $d\ge2$ の有限次元テンソル $t,t',s,s'$ が $t'\preceq t$、$s'\preceq s$ を満たすなら
>
$$
t'\oplus s'\preceq t\oplus s,\qquad
t'\boxtimes s'\preceq t\boxtimes s.
$$
<!-- formal-statement-end -->

直和では別々の座標領域に別々の写像を使い、Kronecker積では各組の両側に対応する写像を使います。

<!-- proof-start -->
### 証明

$t'=(\bigotimes_a A_a)t$、$s'=(\bigotimes_a B_a)s$ とします。各写像の型を $A_a:V_a\to V'_a$、$B_a:W_a\to W'_a$ とします。

直和では $C_a:V_a\oplus W_a\to V'_a\oplus W'_a$ を

$$
C_a(v,w)=(A_av,B_aw)
$$

と定めます。成分ごとの線形性により線形写像です。入力側の包含を $i_a,j_a$、出力側の包含を $i'_a,j'_a$ とすると、各 $v,w$ について $C_ai_a(v)=i'_aA_a(v)$、$C_aj_a(w)=j'_aB_a(w)$ です。従って [局所線形写像のテンソル積](../TSP4/index.md#def-tsp4-local-map) の作用を用いて

$$
\begin{aligned}
(\bigotimes_a C_a)(t\oplus s)
&=(\bigotimes_a(C_ai_a))t+(\bigotimes_a(C_aj_a))s\\
&=(\bigotimes_a i'_a)t'+(\bigotimes_a j'_a)s'\\
&=t'\oplus s'.
\end{aligned}
$$

Kronecker積では $L_a=A_a\otimes B_a:V_a\otimes W_a\to V'_a\otimes W'_a$ を使います。$t,s$ を積の基底によって $t=\sum_i t_i\bigotimes_a v_{ai}$、$s=\sum_j s_j\bigotimes_a w_{aj}$ と表示します。ここで $i,j$ はそれぞれの基底添字の組です。[テンソルのKronecker積](#def-tsp5-kronecker) を展開して

$$
\begin{aligned}
(\bigotimes_a L_a)(t\boxtimes s)
&=\sum_{i,j}t_is_j\bigotimes_a L_a(v_{ai}\otimes w_{aj})\\
&=\sum_{i,j}t_is_j\bigotimes_a(A_av_{ai}\otimes B_aw_{aj}).
\end{aligned}
$$

最後の式は $t'$ と $s'$ のKronecker積の展開です。どちらの操作でも出力を実現する局所線形写像を作れたので結論が従います。
<!-- proof-end -->

この定理を両方向に使うと $t\sim t'$、$s\sim s'$ のとき $t\oplus s\sim t'\oplus s'$、$t\boxtimes s\sim t'\boxtimes s'$ です。つまり制限同値類上でも、代表元に依存せず二つの操作を行えます。

## 5. 対角テンソルで足し算・掛け算を確かめる

[対角テンソル](../TSP4/index.md#def-tsp4-diagonal) $D_r$ は、$d$ 個の因子で同じ番号をそろえた $r$ 項の和でした。直和は二つの番号集合を連結し、Kronecker積は番号の組を一つの番号として数えます。

<a id="thm-tsp5-diagonal-operations"></a>

<!-- formal-statement-start -->
> **定理（対角テンソルの直和とKronecker積）**
>
> 体 $K$、因子数 $d\ge2$、非負整数 $r,q$ に対し、制限同値の意味で
>
$$
D_r\oplus D_q\sim D_{r+q},\qquad
D_r\boxtimes D_q\sim D_{rq}.
$$
<!-- formal-statement-end -->

直和では二つの基底の連結を、積では基底の組から一つの番号への対応を使います。いずれも可逆な写像であることが両方向の制限を保証します。

<!-- proof-start -->
### 証明

各位置で $K^r\oplus K^q\to K^{r+q}$ を、前半の基底 $e_i$ を $g_i$、後半の基底 $f_j$ を $g_{r+j}$ へ送る写像とします。基底を基底へ一対一に対応させるので可逆です。直和に作用させると

$$
\sum_{i=1}^r g_i^{\otimes d}+\sum_{j=1}^q g_{r+j}^{\otimes d}=D_{r+q}.
$$

各位置の逆写像も線形であるため双方の制限が得られます。

次に $r,q>0$ とします。$K^r\otimes K^q\to K^{rq}$ を基底の組 $e_i\otimes f_j$ から $g_{(i-1)q+j}$ への線形写像とします。番号は1から $rq$ まで重複なく現れます。[テンソルのKronecker積](#def-tsp5-kronecker) の作用式から

$$
D_r\boxtimes D_q=
\sum_{i=1}^r\sum_{j=1}^q(e_i\otimes f_j)^{\otimes d}.
$$

可逆な基底対応により像は $D_{rq}$ となり、逆写像で元に戻せます。$r=0$ または $q=0$ のときは直和の空和が消え、積の場合は各組の空間が零次元となるため $D_0$ が得られます。
<!-- proof-end -->

例えば $D_2\boxtimes D_3$ では組 $(1,1),(1,2),(1,3),(2,1),(2,2),(2,3)$ を番号1から6へ対応させます。同じ番号が各因子でそろう6項を得ます。

## 6. 階数と劣階数の加法・乗法評価

直和とKronecker積で材料を作るとき、元の階数・劣階数から新しい値を評価できます。ただし一般のテンソルで等号まで成り立つとは限らないので、まず不等式を導きます。

<a id="thm-tsp5-rank-subrank-operations"></a>

<!-- formal-statement-start -->
> **定理（直和・Kronecker積の階数と劣階数の評価）**
>
> 同じ体 $K$ 上の有限次元空間を因子とする、同じ因子数 $d\ge2$ のテンソル $t,s$ に対して
>
$$
\begin{aligned}
R_K(t\oplus s)&\le R_K(t)+R_K(s),\\
R_K(t\boxtimes s)&\le R_K(t)R_K(s),\\
Q_K(t\oplus s)&\ge Q_K(t)+Q_K(s),\\
Q_K(t\boxtimes s)&\ge Q_K(t)Q_K(s).
\end{aligned}
$$
<!-- formal-statement-end -->

階数では材料となる対角テンソルを組み合わせ、劣階数では取り出せる対角テンソルを組み合わせます。この向きの違いが不等号に現れます。

<!-- proof-start -->
### 証明

$r=R_K(t)$、$q=R_K(s)$ と置きます。[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) から $t\preceq D_r$、$s\preceq D_q$ です。[直和・Kronecker積と制限の両立性](#thm-tsp5-operation-monotonicity) を適用し、[対角テンソルの直和とKronecker積](#thm-tsp5-diagonal-operations) と推移性を用いると

$$
t\oplus s\preceq D_r\oplus D_q\preceq D_{r+q},
$$

$$
t\boxtimes s\preceq D_r\boxtimes D_q\preceq D_{rq}.
$$

階数の特徴付けで左辺を生成する候補の番号数がそれぞれ $r+q,rq$ と分かったので、二つの上界が従います。

次に $p=Q_K(t)$、$h=Q_K(s)$ とします。[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) により $D_p\preceq t$、$D_h\preceq s$ です。同じ両立性と対角テンソルの結果を反対向きに使うと

$$
D_{p+h}\preceq D_p\oplus D_h\preceq t\oplus s,
$$

$$
D_{ph}\preceq D_p\boxtimes D_h\preceq t\boxtimes s.
$$

劣階数の最大値の候補に $p+h,ph$ が含まれるので二つの下界が得られます。零テンソルも前節の $D_0$ の扱いに含まれます。
<!-- proof-end -->

例えば階数が2と3の材料を掛け合わせると、階数は高々6です。これは6項の分解が作れるという意味で、より短い分解の可能性を排除するものではありません。一方、劣階数が2と3なら少なくとも6個の対角成分を取り出せます。この向きの評価は、後に同じテンソルを何度もKronecker積で掛け合わせるときに使います。

## 7. 演習

以下では因子数は特記がなければ3、体は任意の $K$ とします。

### Level A

<a id="ex-tsp5-a01"></a>

#### TSP5-A01 直和の座標
- Level: A
- ID: TSP5-A01

$t=e_1\otimes e_2\otimes e_1\in(K^2)^{\otimes3}$、$s=1^{\otimes3}\in K^{\otimes3}$ の直和を、各位置で前半を $g_1,g_2$、後半を $g_3$ とする基底で表示してください。

<!-- solution-start -->
##### 詳細解答

[テンソルの直和](#def-tsp5-direct-sum) の包含写像は $e_1\mapsto g_1,e_2\mapsto g_2$ と $1\mapsto g_3$ です。それぞれの積に作用させると

$$
t\oplus s=g_1\otimes g_2\otimes g_1+g_3^{\otimes3}.
$$

各位置の次元は3、全体の成分数は27です。非零成分は添字 $(1,2,1)$ と $(3,3,3)$ の二つだけです。
<!-- solution-end -->

<a id="ex-tsp5-a02"></a>

#### TSP5-A02 Kronecker積の添字
- Level: A
- ID: TSP5-A02

二因子で、$\mathbb Q$ 上の行列 $T=\begin{pmatrix}1&2\\0&3\end{pmatrix}$、$S=\begin{pmatrix}4&5\end{pmatrix}$ に対応するテンソルのKronecker積の行列を求めてください。

<!-- solution-start -->
##### 詳細解答

$T$ の行の次元は2、列の次元は2です。$S$ の行は1、列は2なので、新しい行は2、列は4です。[テンソルのKronecker積](#def-tsp5-kronecker) の係数公式で、行 $(i,1)$、列 $(k,j)$ の成分は $T_{ik}S_{1j}$ となります。列順を $(1,1),(1,2),(2,1),(2,2)$ とすれば

$$
T\boxtimes S=
\begin{pmatrix}
1\cdot4&1\cdot5&2\cdot4&2\cdot5\\
0\cdot4&0\cdot5&3\cdot4&3\cdot5
\end{pmatrix}
=\begin{pmatrix}4&5&8&10\\0&0&12&15\end{pmatrix}.
$$
<!-- solution-end -->

<a id="ex-tsp5-a03"></a>

#### TSP5-A03 対角テンソルの番号付け
- Level: A
- ID: TSP5-A03

$D_2\oplus D_3$ と $D_2\boxtimes D_3$ はそれぞれどの対角テンソルと制限同値ですか。各位置の基底対応を書いてください。

<!-- solution-start -->
##### 詳細解答

直和では前半の二基底を $g_1,g_2$、後半の三基底を $g_3,g_4,g_5$ へ送ります。像は $\sum_{i=1}^5 g_i^{\otimes3}=D_5$ です。

Kronecker積では $e_i\otimes f_j$ を $g_{3(i-1)+j}$ へ送ります。$i=1$ のとき番号1〜3、$i=2$ のとき番号4〜6です。像は $\sum_{k=1}^6 g_k^{\otimes3}=D_6$ です。双方とも基底の全単射なので逆写像が存在し、[制限同値](#def-tsp5-restriction-equivalence) の条件を満たします。
<!-- solution-end -->

<a id="ex-tsp5-a04"></a>

#### TSP5-A04 制限の推移性の計算
- Level: A
- ID: TSP5-A04

各位置で $A:K^3\to K^2$ を $e_1\mapsto f_1,e_2\mapsto f_2,e_3\mapsto0$、$B:K^2\to K$ を $f_1\mapsto0,f_2\mapsto1$ とします。$D_3$ に $A$ を各位置で作用させ、さらに $B$ を作用させてください。合成でも確認してください。

<!-- solution-start -->
##### 詳細解答

$A$ の作用で第3項が消え、$f_1^{\otimes3}+f_2^{\otimes3}=D_2$ が得られます。次に $B$ で第1項が消え、$1^{\otimes3}=D_1$ が得られます。

合成 $BA$ は $e_1\mapsto0,e_2\mapsto1,e_3\mapsto0$ です。[制限の前順序性](#thm-tsp5-restriction-preorder) の証明と同じく各位置で合成を作用させれば、$D_3$ の第2項だけが残って $D_1$ となります。
<!-- solution-end -->

### Level B

<a id="ex-tsp5-b01"></a>

#### TSP5-B01 未使用座標と階数
- Level: B
- ID: TSP5-B01

$t\in(K^2)^{\otimes3}$ の各位置に使わない第3座標を付け足し、$s\in(K^3)^{\otimes3}$ とします。$s\sim t$ と $R_K(s)=R_K(t),Q_K(s)=Q_K(t)$ を証明してください。

<!-- solution-start -->
##### 詳細解答

包含 $A:K^2\to K^3$ を $e_i\mapsto f_i$（$i=1,2$）、射影 $B:K^3\to K^2$ を $f_i\mapsto e_i$（$i=1,2$）、$f_3\mapsto0$ とします。$s=(A\otimes A\otimes A)t$ であり、$BA$ は両基底上で恒等写像なので

$$
(B\otimes B\otimes B)s=((BA)\otimes(BA)\otimes(BA))t=t.
$$

よって両方向の制限が成立します。[制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds) を双方に適用すると $R_K(s)\le R_K(t)\le R_K(s)$ です。[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) も同様に双方に適用して $Q_K(s)\le Q_K(t)\le Q_K(s)$ です。いずれも等号です。
<!-- solution-end -->

<a id="ex-tsp5-b02"></a>

#### TSP5-B02 直和から各材料を取り出す
- Level: B
- ID: TSP5-B02

任意の $t,s$ に対し $t\preceq t\oplus s$、$s\preceq t\oplus s$ を示してください。そこから階数の下界を導いてください。

<!-- solution-start -->
##### 詳細解答

各位置で射影 $P_a(v,w)=v$ を取ります。$P_ai_a$ は恒等写像、$P_aj_a$ は零写像です。従って

$$
(\bigotimes_a P_a)(t\oplus s)=t+0=t.
$$

もう一方の射影 $L_a(v,w)=w$ では $L_ai_a$ が零、$L_aj_a$ が恒等写像なので $(\bigotimes_a L_a)(t\oplus s)=0+s=s$ です。どちらも成分ごとに線形です。

[制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds) を二方向の取り出しに適用して

$$
R_K(t\oplus s)\ge\max\{R_K(t),R_K(s)\}.
$$

これと [直和・Kronecker積の階数と劣階数の評価](#thm-tsp5-rank-subrank-operations) の上界を合わせれば、直和の階数の範囲を得ます。
<!-- solution-end -->

<a id="ex-tsp5-b03"></a>

#### TSP5-B03 非零材料を掛ける
- Level: B
- ID: TSP5-B03

$s$ が非零なら $t\preceq t\boxtimes s$ を示してください。$s=0$ の場合に非零 $t$ についてなぜ成立しないかも説明してください。

<!-- solution-start -->
##### 詳細解答

[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) により $D_1\preceq s$ です。[制限の前順序性](#thm-tsp5-restriction-preorder) により $t\preceq t$ なので、[直和・Kronecker積と制限の両立性](#thm-tsp5-operation-monotonicity) から

$$
t\boxtimes D_1\preceq t\boxtimes s.
$$

各位置の空間 $V_a\otimes K$ から $V_a$ へ $v\otimes c\mapsto cv$ と送る線形写像を取ります。基底 $e_i\otimes1$ が基底 $e_i$ に対応するため可逆です。Kronecker積の係数公式により $t\boxtimes D_1$ の像は $t$ です。推移性で $t\preceq t\boxtimes s$ を得ます。

$s=0$ なら全ての積の係数が0なので $t\boxtimes s=0$ です。線形写像は零を零に送るため非零 $t$ を取り出せません。
<!-- solution-end -->

<a id="ex-tsp5-b04"></a>

#### TSP5-B04 分配の基底対応
- Level: B
- ID: TSP5-B04

同じ体・因子数で $(t\oplus s)\boxtimes u\sim(t\boxtimes u)\oplus(s\boxtimes u)$ を示してください。

<!-- solution-start -->
##### 詳細解答

$t,s,u$ の位置 $a$ の空間を $V_a,W_a,U_a$ とします。各位置で

$$
(V_a\oplus W_a)\otimes U_a
\longrightarrow (V_a\otimes U_a)\oplus(W_a\otimes U_a)
$$

を考えます。各基底を $e_i,f_j,h_k$ とし、基底 $(e_i,0)\otimes h_k$ を $(e_i\otimes h_k,0)$ に、$(0,f_j)\otimes h_k$ を $(0,f_j\otimes h_k)$ に送ります。左右の基底が一対一に対応するので線形に延長して可逆な写像を得ます。

[テンソルの直和](#def-tsp5-direct-sum) には全位置が $V$ 側の項と全位置が $W$ 側の項しかありません。[テンソルのKronecker積](#def-tsp5-kronecker) で $u$ の各項と組にした後、前者は全位置で第1領域 $(V_a\otimes U_a,0)$ に入り、後者は第2領域 $(0,W_a\otimes U_a)$ に入ります。係数はそれぞれ元の $t$ と $u$、$s$ と $u$ の係数の積です。ゆえに像は $(t\boxtimes u)\oplus(s\boxtimes u)$ です。逆写像も各位置に作用するので制限同値です。
<!-- solution-end -->

### Level C

<a id="ex-tsp5-c01"></a>

#### TSP5-C01 繰り返し使用したときの評価
- Level: C
- ID: TSP5-C01

非零テンソル $t$ に対し $t^{\boxtimes1}=t$、$t^{\boxtimes(n+1)}=t^{\boxtimes n}\boxtimes t$ と定めます。$R_K(t)=r$、$Q_K(t)=q$ として全ての整数 $n\ge1$ に対し

$$
q^n\le Q_K(t^{\boxtimes n})\le R_K(t^{\boxtimes n})\le r^n
$$

を示してください。さらに $d=3$ の $w=E_{211}+E_{121}+E_{112}\in(K^2)^{\otimes3}$ について、$Q_K(w^{\boxtimes2})$ と $R_K(w^{\boxtimes2})$ の範囲を、位置1を行とする平坦化も利用して求めてください。ただし $E_{ijk}=e_i\otimes e_j\otimes e_k$ です。

<!-- solution-start -->
##### 詳細解答

$n=1$ では両端は定義通りです。中間の不等式は [劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) から従います。$n$ で成立すると仮定します。[直和・Kronecker積の階数と劣階数の評価](#thm-tsp5-rank-subrank-operations) を $t^{\boxtimes n},t$ に適用して

$$
R_K(t^{\boxtimes(n+1)})\le R_K(t^{\boxtimes n})r\le r^{n+1},
$$

$$
Q_K(t^{\boxtimes(n+1)})\ge Q_K(t^{\boxtimes n})q\ge q^{n+1}.
$$

中間の不等式も各テンソルに基本評価を適用すれば従います。帰納法により成立します。

$w$ については [三因子の階数3の例](../TSP2/index.md#thm-tsp2-three-factor-rank) から $R_K(w)=3$ です。また $w$ は非零なので [劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) により $Q_K(w)\ge1$ です。従って最初の評価は $1\le Q_K(w^{\boxtimes2})\le R_K(w^{\boxtimes2})\le9$ となります。

位置1を行、位置2と3を列にまとめる [テンソルの平坦化](../TSP3/index.md#def-tsp3-flattening) を行います。元の行列を

$$
M=\begin{pmatrix}0&1&1&0\\1&0&0&0\end{pmatrix}
$$

と書きます。Kronecker積の係数公式から、$w^{\boxtimes2}$ の平坦化は、列の並べ替えを除いて $M\boxtimes M$ です。実際、行は元の行番号の組 $(i,i')$、列は元の列番号の組 $((j,k),(j',k'))$ であり、成分は $M_{i,(j,k)}M_{i',(j',k')}$ となります。

$M$ の第1列は $(0,1)^{\mathsf T}$、第2列は $(1,0)^{\mathsf T}$ です。これらの列の四つの組 $(1,1),(1,2),(2,1),(2,2)$ から、$M\boxtimes M$ の4次元の標準基底が全て得られます。行数も4なので行列階数はちょうど4です。この計算は任意の体で成立します。

[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds) にこの平坦化を代入して

$$
1\le Q_K(w^{\boxtimes2})\le4,\qquad
4\le R_K(w^{\boxtimes2})\le9.
$$

上界・下界を求める問題であり、正確な階数や劣階数まではここから決まりません。
<!-- solution-end -->

## 8. 次講への接続

直和は独立した材料を並べ、Kronecker積は同じ位置の座標を組にします。制限は両方と両立し、対角テンソルでは番号数が加算・乗算されます。次講では、別々のテンソルの一部の因子をつなぐ操作を考え、グラフに沿ってテンソルを組み立てる方法へ進みます。
