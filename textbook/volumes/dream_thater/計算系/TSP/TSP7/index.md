# TSP7 行列積テンソルと双線形複雑性

前講では[テンソルネットワークと境界テンソル](../TSP6/index.md#def-tsp6-network)を使い、三角形に接続した材料から三因子のテンソルを得ました。今回はこの三角形を、二つの行列を掛ける計算の記録として読み直します。通常の $2\times2$ 行列積には8個の成分どうしの積が現れますが、入力の成分を先に足し引きすれば7個の積で済みます。なぜ積の回数をテンソルの性質として調べられるのでしょうか。

## 1. 双線形写像を係数で記録する

体 $K$ 上の有限次元ベクトル空間 $U,V,W$ を取ります。[多重線形写像](../TSP1/index.md#def-tsp1-multilinear-map)の二入力の場合を双線形写像といい、$B:U\times V\to W$ が各入力を別々に固定したとき、もう一方について線形であることを意味します。例えば二つの列の内積型の計算 $B(x,y)=x_1y_1+x_2y_2$ は、各入力について分配律とスカラー倍の規則を満たします。

基底をそれぞれ $u_i,v_j,w_k$ とし、$U^*,V^*$ をそれぞれ $U,V$ から $K$ への線形写像の空間とします。座標を取り出す写像 $u^i,v^j$ は $u^i(u_a)=\delta_{ia}$、$v^j(v_b)=\delta_{jb}$ で定まります。ここで $\delta$ は等しい添字なら1、それ以外なら0です。これらは座標を取り出す写像の基底です。実際、任意の線形写像 $\ell:U\to K$ は $\ell(x)=\sum_i x_i\ell(u_i)$ と展開できるため、$\ell=\sum_i\ell(u_i)u^i$ です。一意性は各 $u_i$ で評価すれば従います。

双線形性によって $B$ の値は基底の組に対する値だけで決まります。$B(u_i,v_j)=\sum_k b_{ijk}w_k$ とおけば、

$$
B(x,y)=\sum_{i,j}x_i y_j B(u_i,v_j)
=\sum_{i,j,k}b_{ijk}x_i y_j w_k.
$$

この係数を三因子のテンソルに保存しておけば、線形写像による評価で計算を復元できます。

<a id="def-tsp7-bilinear-tensor"></a>

<!-- formal-statement-start -->
> **定義（双線形写像の係数テンソル）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と双線形写像 $B:U\times V\to W$ を取る。基底 $u_i,v_j,w_k$ に対する座標写像を $u^i,v^j$ とし、係数 $b_{ijk}$ を $B(u_i,v_j)$ の $w_k$ 成分とする。対応するテンソルを
>
$$
T_B=\sum_{i,j,k}b_{ijk}u^i\otimes v^j\otimes w_k
\in U^*\otimes V^*\otimes W
$$
>
> とする。和の添字は各空間の基底全体を走る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp7-bilinear-tensor -->
**定義の確認**。$U=V=K^2,W=K$ とし、$B(x,y)=x_1y_2-x_2y_1$ とします。$B(e_1,e_1)=B(e_2,e_2)=0$、$B(e_1,e_2)=1$、$B(e_2,e_1)=-1$ なので、$W$ の基底を1として

$$
T_B=e^1\otimes e^2\otimes 1-e^2\otimes e^1\otimes 1.
$$

$e^1,e^2$ は座標を取り出す写像です。最初の二因子を $x,y$ で評価すれば $x_1y_2-x_2y_1$ が得られ、元の双線形写像が復元されます。
<!-- definition-example-end -->

テンソル $T$ を入力 $x,y$ で評価する操作を $F_T(x,y)$ とします。単純な積 $\ell\otimes m\otimes w$ なら $F_T(x,y)=\ell(x)m(y)w$ です。一般の $T$ ではこの操作を和に対して線形に延長します。[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis)から、この評価は基底係数を使って一意に定まり、各入力について線形です。

## 2. 積の回数を最小にする

入力 $x,y$ の成分を先に線形に組み合わせ、得られた二つのスカラーを掛け、その結果を出力の各成分へ定数倍して配る計算を考えます。入力に依存する積は $\ell(x)m(y)$ の形に限ります。足し算、引き算、既知の定数による倍はここでの費用に含めません。

<a id="def-tsp7-bilinear-complexity"></a>

<!-- formal-statement-start -->
> **定義（双線形複雑性）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と双線形写像 $B:U\times V\to W$ に対して、ある非負整数 $r$ と線形写像 $\ell_s:U\to K,m_s:V\to K$ および $w_s\in W$ が存在し、すべての入力 $x,y$ について
>
$$
B(x,y)=\sum_{s=1}^r\ell_s(x)m_s(y)w_s
$$
>
> が成り立つとき、この式を長さ $r$ の双線形計算とする。そのような $r$ の最小値を双線形複雑性 $L_K(B)$ とする。零写像は空和で表し、費用は0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp7-bilinear-complexity -->
**定義の確認**。$B(x,y)=(x_1+x_2)y_1$ を $K^2\times K\to K$ の写像とします。右辺の $y_1$ は一つのスカラー入力です。$\ell_1(x)=x_1+x_2$、$m_1(y)=y_1$、$w_1=1$ は必要な型を持ち、全入力について一項の式を与えます。$B((1,0),1)=1$ なので空和では表せず、$L_K(B)=1$ です。展開した $x_1y_1+x_2y_1$ の二つの積は、最小の費用ではありません。
<!-- definition-example-end -->

この計算モデルでの最小値が、[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank)と正確に対応します。一般の算術回路で途中結果どうしを掛ける場合や、加算も有料とする場合とは費用の定義が異なります。

<a id="thm-tsp7-rank-complexity"></a>

<!-- formal-statement-start -->
> **定理（テンソル階数と双線形複雑性の一致）**
>
> 体 $K$ 上の有限次元空間 $U,V,W$ と双線形写像 $B:U\times V\to W$ に対し、その係数テンソル $T_B$ のテンソル階数は
>
$$
R_K(T_B)=L_K(B)
$$
>
> である。さらに $B$ と $T_B$ の対応は基底の選択によらない。
<!-- formal-statement-end -->

一つの積を出力へ配る処理が単純テンソル一項に対応します。逆向きの対応も示せば、二つの最小値が一致します。

<!-- proof-start -->
### 証明

任意の $T\in U^*\otimes V^*\otimes W$ は、[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis)によって

$$
T=\sum_{i,j,k}t_{ijk}u^i\otimes v^j\otimes w_k
$$

と一意に展開できます。評価 $F_T$ について $F_T(u_a,v_b)=\sum_k t_{abk}w_k$ となるので、$F_T=0$ なら各 $t_{abk}=0$ です。従って評価は単射です。さらに任意の双線形写像 $B$ に対して、[双線形写像の係数テンソル](#def-tsp7-bilinear-tensor)を評価すれば、基底上で $B$ と一致し、双線形性から全入力で一致します。

単純テンソルの評価は $\ell(x)m(y)w$ であり、これは基底を用いない式です。単純テンソルが空間全体を張るため、評価写像自体は基底によらず、単射性から $B$ を表すテンソルも基底によらず一意です。

いま $T_B=\sum_{s=1}^r\ell_s\otimes m_s\otimes w_s$ と分解すると、両入力で評価して

$$
B(x,y)=\sum_{s=1}^r\ell_s(x)m_s(y)w_s
$$

を得ます。最短分解を選べば $L_K(B)\le R_K(T_B)$ です。

逆に長さ $r$ の双線形計算が与えられたら、$T'=\sum_s\ell_s\otimes m_s\otimes w_s$ を作ります。$F_{T'}=B=F_{T_B}$ なので、単射性より $T'=T_B$ です。最短計算から $R_K(T_B)\le L_K(B)$ を得ます。両向きの不等式で等号が成立します。零の場合も空和が両方を表します。
<!-- proof-end -->

この証明はすべての体で成立します。有限体でも基底の組で係数を回収できるので、無限個の入力値や多項式の零点に関する議論は不要です。

## 3. 行列積をテンソルに変換する

正整数 $m,n,p$ に対して、$A\in K^{m\times n}, B\in K^{n\times p}$ を入力とする写像 $\mu(A,B)=AB$ を考えます。出力は $K^{m\times p}$ に属します。各成分は

$$
(AB)_{ik}=\sum_{j=1}^n A_{ij}B_{jk}
$$

なので、片方を固定するともう一方に関して線形です。入力行列の各成分を取り出す写像を $a^{ij},b^{jk}$、出力の $(i,k)$ 位置だけ1である行列を $E_{ik}$ と書きます。

<a id="def-tsp7-matrix-multiplication"></a>

<!-- formal-statement-start -->
> **定義（行列積テンソル）**
>
> 体 $K$ と正整数 $m,n,p$ に対し、行列積の係数テンソルを $M_{m,n,p}$ と表す。入力の座標写像 $a^{ij},b^{jk}$ と出力の標準基底 $E_{ik}$ を用いると
>
$$
M_{m,n,p}
=\sum_{i=1}^m\sum_{j=1}^n\sum_{k=1}^p
a^{ij}\otimes b^{jk}\otimes E_{ik}.
$$
>
> 三因子の次元は順に $mn,np,mp$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp7-matrix-multiplication -->
**定義の確認**。$(m,n,p)=(1,2,1)$ とすると入力は行ベクトルと列ベクトル、出力は $1\times1$ 行列です。$E_{11}$ を1と同一視すれば

$$
M_{1,2,1}=a^{11}\otimes b^{11}\otimes1
+a^{12}\otimes b^{21}\otimes1.
$$

第1、第2因子は各2次元、第3因子は1次元であり、評価は $A_{11}B_{11}+A_{12}B_{21}$ です。例えば $A=(2,3),B=(4,5)^{\mathsf T}$ なら $8+15=23$ を返します。
<!-- definition-example-end -->

一般の場合にも基底行列の積は、左入力の列番号と右入力の行番号が一致するときだけ $E_{ik}$ になります。従って[双線形写像の係数テンソル](#def-tsp7-bilinear-tensor)の定義からこの和を得ます。前講の三角形では最後の境界基底が $g_{ki}$ でした。出力基底を $g_{ki}\leftrightarrow E_{ik}$ と付け替えると同じ係数配列になります。

### 3.1 乗算回数の上下界

通常の積の計算法は $mnp$ 回の入力依存の乗算を使います。一方、出力や入力の全成分に必要な情報を調べれば、それより小さい下界が得られます。

<a id="thm-tsp7-matrix-bounds"></a>

<!-- formal-statement-start -->
> **定理（行列積テンソルの基本上下界）**
>
> 体 $K$ と正整数 $m,n,p$ に対し、行列積テンソルの階数は
>
$$
\max\{mn,np,mp\}\le R_K(M_{m,n,p})\le mnp
$$
>
> を満たす。$m,n,p$ の少なくとも一つが1なら、階数は $mnp$ に等しい。
<!-- formal-statement-end -->

上界は表示された和の項数です。下界には、各因子を行添字、残り二因子を列添字とした[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)を使います。

<!-- proof-start -->
### 証明

[行列積テンソル](#def-tsp7-matrix-multiplication)は $mnp$ 個の単純テンソルの和なので、[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank)の定義から上界が成立します。

第1因子を行側とする平坦化の行 $(i,j)$ は

$$
\sum_{k=1}^p b^{jk}\otimes E_{ik}
$$

の係数行です。各行には少なくとも一つの1があり、異なる行の非零列は重複しません。実際、列 $(b^{jk},E_{ik})$ の番号から $i,j$ が一意に復元できます。線形結合が零なら、各行で $k=1$ に対応する列を見ればその行の係数が0になるため、$mn$ 本の行は一次独立です。

第2因子を行側にすると、行 $(j,k)$ は $\sum_i a^{ij}\otimes E_{ik}$ の係数行です。列番号から $j,k$ が復元でき、$i=1$ の列を選んで各行の独立性を確認できます。従って行列階数は $np$ です。

第3因子を行側にすると、行 $(i,k)$ は $\sum_j a^{ij}\otimes b^{jk}$ の係数行です。列番号から $i,k$ が復元でき、$j=1$ の列を選ぶと各行の独立性が従います。階数は $mp$ です。

三つの平坦化はいずれも[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)の対象なので、テンソル階数はそれぞれの行列階数以上です。最大値を取って下界を得ます。$m=1$ なら $np=mnp$、$n=1$ なら $mp=mnp$、$p=1$ なら $mn=mnp$ なので、その場合は上下界が一致します。
<!-- proof-end -->

例えば $2\times3$ と $3\times4$ の積では $12\le R_K(M_{2,3,4})\le24$ です。下界と上界が違うとき、この評価だけで最小値を確定することはできません。

## 4. Strassenの7乗算法

$2\times2$ の場合、基本上下界は $4\le R_K(M_{2,2,2})\le8$ です。入力を

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\qquad B=\begin{pmatrix}e&f\\g&h\end{pmatrix}
$$

とおきます。積の4成分は $ae+bg,af+bh,ce+dg,cf+dh$ です。例えば $(a+d)(e+h)$ を使うと $ae$ と $dh$ を一度に生成できますが、不要な $ah,de$ も生じます。他の積との足し引きによって不要な項を消すのがポイントです。

<a id="thm-tsp7-strassen"></a>

<!-- formal-statement-start -->
> **定理（Strassenの7乗算法による上界）**
>
> 任意の体 $K$ 上で、二つの $2\times2$ 行列の積は長さ7の双線形計算で求められる。従って
>
$$
R_K(M_{2,2,2})\le7.
$$
<!-- formal-statement-end -->

七つの積を次のように取ります。どの積も左行列の成分の線形結合と右行列の成分の線形結合を一回ずつ掛けています。

$$
\begin{aligned}
P_1&=(a+d)(e+h),\\
P_2&=(c+d)e,\\
P_3&=a(f-h),\\
P_4&=d(g-e),\\
P_5&=(a+b)h,\\
P_6&=(c-a)(e+f),\\
P_7&=(b-d)(g+h).
\end{aligned}
$$

これらから出力を組み立てます。

$$
AB=\begin{pmatrix}
P_1+P_4-P_5+P_7 & P_3+P_5\\
P_2+P_4 & P_1-P_2+P_3+P_6
\end{pmatrix}.
$$

<!-- proof-start -->
### 証明

まず各積を分配律で展開します。

$$
\begin{aligned}
P_1&=ae+ah+de+dh,\\
P_2&=ce+de,\\
P_3&=af-ah,\\
P_4&=dg-de,\\
P_5&=ah+bh,\\
P_6&=ce+cf-ae-af,\\
P_7&=bg+bh-dg-dh.
\end{aligned}
$$

第1行第1列では

$$
\begin{aligned}
P_1+P_4-P_5+P_7
&=ae+ah+de+dh+dg-de\\
&\quad-ah-bh+bg+bh-dg-dh\\
&=ae+bg.
\end{aligned}
$$

第1行第2列と第2行第1列は

$$
\begin{aligned}
P_3+P_5&=af-ah+ah+bh=af+bh,\\
P_2+P_4&=ce+de+dg-de=ce+dg.
\end{aligned}
$$

第2行第2列では

$$
\begin{aligned}
P_1-P_2+P_3+P_6
&=ae+ah+de+dh-ce-de\\
&\quad+af-ah+ce+cf-ae-af\\
&=cf+dh.
\end{aligned}
$$

従って四成分すべてが正しい積の成分になります。各 $P_s$ の左側・右側の線形写像を $\ell_s,m_s$ とすると、出力側の行列は順に

$$
\begin{aligned}
w_1&=E_{11}+E_{22},&
w_2&=E_{21}-E_{22},\\
w_3&=E_{12}+E_{22},&
w_4&=E_{11}+E_{21},\\
w_5&=-E_{11}+E_{12},&
w_6&=E_{22},\\
w_7&=E_{11}.
\end{aligned}
$$

したがって $AB=\sum_{s=1}^7\ell_s(A)m_s(B)w_s$ という長さ7の式を得ます。[テンソル階数と双線形複雑性の一致](#thm-tsp7-rank-complexity)から階数の上界7が従います。証明では分配律と加法逆元しか使わず、2で割る操作もないので標数2の体でも成立します。
<!-- proof-end -->

$K=\mathbb Q$ で $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}, B=\begin{pmatrix}5&6\\7&8\end{pmatrix}$ とすると、七つの積は順に $65,35,-2,8,24,22,-30$ です。出力の四成分は $65+8-24-30=19$、$-2+24=22$、$35+8=43$、$65-35-2+22=50$ となり、通常の積と一致します。

この算法が示すのは上界7です。ここまでの下界4と合わせても最小値が7であることの証明にはなりません。また、この式はスカラーの加減算を18回（入力側10回、出力側8回）使います。通常の方法は乗算8回・加算4回なので、小さな行列に対して総演算数まで常に減るわけではありません。

## 5. 大きな行列へ繰り返す

[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker)を使って二つの行列積を結合します。例えば第1の入力の行番号 $i$ と第2の入力の行番号 $i'$ を一組 $(i,i')$ にすれば、より大きな行列の行番号になります。

<a id="thm-tsp7-product"></a>

<!-- formal-statement-start -->
> **定理（行列積テンソルの積と階数評価）**
>
> 体 $K$ と正整数 $m,n,p,m',n',p'$ に対し、三因子をそれぞれ組み合わせたKronecker積は、基底の付け替えによって
>
$$
M_{m,n,p}\boxtimes M_{m',n',p'}
\simeq M_{mm',nn',pp'}
$$
>
> となる。ここで $\simeq$ は各因子の線形同型による一致を表す。特に正整数 $q$ に対し
>
$$
R_K(M_{2^q,2^q,2^q})\le7^q.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第2のテンソルの基底を $\tilde a^{i'j'},\tilde b^{j'k'},\tilde E_{i'k'}$ とします。[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker)を定義どおり展開すると、六つの添字についての和

$$
\sum_{i,j,k,i',j',k'}
(a^{ij}\otimes\tilde a^{i'j'})
\otimes(b^{jk}\otimes\tilde b^{j'k'})
\otimes(E_{ik}\otimes\tilde E_{i'k'})
$$

となります。$I=(i-1)m'+i'$、$J=(j-1)n'+j'$、$H=(k-1)p'+k'$ と置きます。例えば $I$ は $1$ から $mm'$ までを一度ずつ走ります。各基底の対応

$$
\begin{aligned}
a^{ij}\otimes\tilde a^{i'j'}&\mapsto a^{IJ},\\
b^{jk}\otimes\tilde b^{j'k'}&\mapsto b^{JH},\\
E_{ik}\otimes\tilde E_{i'k'}&\mapsto E_{IH}
\end{aligned}
$$

はそれぞれ基底の全単射なので線形同型を与えます。適用後の和は $\sum_{I,J,H}a^{IJ}\otimes b^{JH}\otimes E_{IH}$ となり、[行列積テンソル](#def-tsp7-matrix-multiplication)そのものです。

各因子の線形同型は単純テンソルを単純テンソルへ移し、逆同型も同じ性質を持つので階数を保存します。[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)の積についての上界と[Strassenの7乗算法による上界](#thm-tsp7-strassen)から、帰納的に $q=1$ で上界7、$q+1$ では

$$
R_K(M_{2^{q+1},2^{q+1},2^{q+1}})
\le R_K(M_{2^q,2^q,2^q})\cdot7
\le7^{q+1}
$$

を得ます。
<!-- proof-end -->

例えば $4\times4$ 行列積は通常64回の乗算を使いますが、この構成では49回です。$N=2^q$ とおくと $7^q=N^{\log_2 7}$ となり、指数 $\log_2 7$ は3より小さい数です。

実際に行列を四つの同じ大きさのブロックに分け、上の七つの積をブロック積に置き換えても展開の順序は変わりません。左ブロックと右ブロックの順序を交換していないためです。ブロックの加減算18回はそれぞれ $(N/2)^2$ 成分の加減算です。$S(1)=0$ とし、この方法の加減算数を $S(N)$ とすると

$$
S(N)=7S(N/2)+18(N/2)^2.
$$

$N=2^q$ では繰り返し展開して

$$
S(2^q)=18\sum_{t=0}^{q-1}7^t4^{q-1-t}
=6(7^q-4^q).
$$

最後の等号は和を7倍したものから4倍したものを引けば $7^q-4^q$ が残ることによります。従って乗算と加減算の合計も高々 $7\cdot7^q$ 回です。入力の記憶配置や有限精度の丸め誤差はこの演算数のモデルには含まれていません。

## 6. 演習

### Level A

<a id="ex-tsp7-a01"></a>

#### TSP7-A01 係数テンソル
- Level: A
- ID: TSP7-A01

体 $K=\mathbb Q$ 上で $B(x,y)=(x_1y_2,x_2y_1+x_2y_2)$ とする。入力と出力はいずれも2次元とし、標準基底に関する係数テンソルを求めよ。

<!-- solution-start -->
##### 詳細解答

基底入力の四組を評価すると $B(e_1,e_1)=0$、$B(e_1,e_2)=e_1$、$B(e_2,e_1)=e_2$、$B(e_2,e_2)=e_2$ となります。[双線形写像の係数テンソル](#def-tsp7-bilinear-tensor)に代入し、入力の座標写像を $e^i,f^j$、出力基底を $w_1,w_2$ と書けば

$$
T_B=e^1\otimes f^2\otimes w_1
+e^2\otimes f^1\otimes w_2
+e^2\otimes f^2\otimes w_2.
$$

$x,y$ で評価すると指定された二成分が得られます。
<!-- solution-end -->

<a id="ex-tsp7-a02"></a>

#### TSP7-A02 先に足す
- Level: A
- ID: TSP7-A02

任意の体 $K$ 上で $B(x,y)=(x_1-x_2)(y_1+y_2)$ を $K^2\times K^2\to K$ の写像とする。双線形複雑性と係数テンソルの階数を求めよ。

<!-- solution-start -->
##### 詳細解答

$\ell(x)=x_1-x_2,m(y)=y_1+y_2,w=1$ とすると[双線形複雑性](#def-tsp7-bilinear-complexity)の長さ1の式です。$B((1,0),(1,0))=1$ なので零写像ではなく、空和は不可能です。従って $L_K(B)=1$ です。[テンソル階数と双線形複雑性の一致](#thm-tsp7-rank-complexity)より $R_K(T_B)=1$ です。展開の4項を別々に計算する必要はありません。
<!-- solution-end -->

<a id="ex-tsp7-a03"></a>

#### TSP7-A03 長方形の行列積
- Level: A
- ID: TSP7-A03

任意の体 $K$ 上で $2\times1$ 行列と $1\times3$ 行列の積について、三因子の次元、通常の乗算数、テンソル階数を求めよ。

<!-- solution-start -->
##### 詳細解答

$m=2,n=1,p=3$ なので[行列積テンソル](#def-tsp7-matrix-multiplication)の三因子の次元は $2,3,6$ です。積は

$$
\sum_{i=1}^2\sum_{k=1}^3 a^{i1}\otimes b^{1k}\otimes E_{ik}
$$

で表され、通常は6回の乗算が必要です。[行列積テンソルの基本上下界](#thm-tsp7-matrix-bounds)に代入すると $6=\max\{2,3,6\}\le R_K(M_{2,1,3})\le6$ なので階数は6です。
<!-- solution-end -->

<a id="ex-tsp7-a04"></a>

#### TSP7-A04 七つの積を計算する
- Level: A
- ID: TSP7-A04

$\mathbb Q$ 上で $A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$、$B=\begin{pmatrix}1&4\\2&-1\end{pmatrix}$ とする。Strassenの七つの積を計算して $AB$ を求めよ。

<!-- solution-start -->
##### 詳細解答

[Strassenの7乗算法による上界](#thm-tsp7-strassen)の式に代入します。

$$
\begin{aligned}
P_1&=5\cdot0=0,& P_2&=3\cdot1=3,\\
P_3&=2\cdot5=10,&P_4&=3\cdot1=3,\\
P_5&=3\cdot(-1)=-3,&P_6&=(-2)\cdot5=-10,\\
P_7&=(-2)\cdot1=-2.
\end{aligned}
$$

四成分は順に $0+3+3-2=4$、$10-3=7$、$3+3=6$、$0-3+10-10=-3$ です。

$$
AB=\begin{pmatrix}4&7\\6&-3\end{pmatrix}.
$$

通常の計算法でも第1行は $(2+2,8-1)$、第2行は $(0+6,0-3)$ となります。
<!-- solution-end -->

### Level B

<a id="ex-tsp7-b01"></a>

#### TSP7-B01 係数の回収と計算の短縮
- Level: B
- ID: TSP7-B01

任意の体 $K$ 上で $B(x,y)=(x_1y_1+x_1y_2,x_2y_1+x_2y_2)$ とする。長さ2の双線形計算を構成し、これより短い計算が存在しないことを示せ。

<!-- solution-start -->
##### 詳細解答

$m(y)=y_1+y_2$ を先に計算すると

$$
B(x,y)=x_1m(y)w_1+x_2m(y)w_2
$$

となります。各項は左の線形写像、右の線形写像、出力ベクトルの組を持つので、長さ2の[双線形計算](#def-tsp7-bilinear-complexity)です。

もし長さ1なら $B(x,y)=\ell(x)m_0(y)w$ となり、すべての出力が $w$ の張る高々1次元の空間に入ります。しかし $y=(1,0)$ を固定すると $B((1,0),y)=w_1$、$B((0,1),y)=w_2$ です。出力の標準基底二本は一次独立であり、同じ1次元空間に入れません。長さ0も非零出力があるので不可能です。従って $L_K(B)=2$ です。
<!-- solution-end -->

<a id="ex-tsp7-b02"></a>

#### TSP7-B02 二つの平坦化
- Level: B
- ID: TSP7-B02

$M_{2,2,1}$ について、第1因子および第3因子を行側にした平坦化を作れ。行列の階数とテンソル階数を求めよ。体は任意の $K$ とする。

<!-- solution-start -->
##### 詳細解答

[行列積テンソル](#def-tsp7-matrix-multiplication)の4項を添字 $(i,j)$ の順に並べると

$$
\begin{aligned}
M_{2,2,1}={}&a^{11}\otimes b^{11}\otimes E_{11}
+a^{12}\otimes b^{21}\otimes E_{11}\\
&+a^{21}\otimes b^{11}\otimes E_{21}
+a^{22}\otimes b^{21}\otimes E_{21}.
\end{aligned}
$$

第1因子を行側とし、列を $(b^{11},E_{11}),(b^{21},E_{11}),(b^{11},E_{21}),(b^{21},E_{21})$ の順に取ると4次の恒等行列です。階数は4です。

第3因子を行側とし、列を $a^{11},a^{12},a^{21},a^{22}$ の各々について $b^{11},b^{21}$ の順に取ると

$$
\begin{pmatrix}
1&0&0&1&0&0&0&0\\
0&0&0&0&1&0&0&1
\end{pmatrix}.
$$

二行は非零で、非零列が重複しないため一次独立です。階数は2です。[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)からテンソル階数は4以上であり、上の4項の分解から4以下です。従って4です。小さい平坦化階数だけを見て2と結論してはいけません。
<!-- solution-end -->

<a id="ex-tsp7-b03"></a>

#### TSP7-B03 一つの積をテンソルへ戻す
- Level: B
- ID: TSP7-B03

任意の体 $K$ 上の $2\times2$ 行列積について、$P_7=(b-d)(g+h)$ の出力先が $E_{11}$ だけであるとき、対応する単純テンソルを求め、基底積の和へ展開せよ。

<!-- solution-start -->
##### 詳細解答

左の線形写像は $a^{12}-a^{22}$、右の線形写像は $b^{21}+b^{22}$ です。[テンソル階数と双線形複雑性の一致](#thm-tsp7-rank-complexity)の対応で得る一項は

$$
(a^{12}-a^{22})\otimes(b^{21}+b^{22})\otimes E_{11}.
$$

テンソル積の多重線形性で展開すると

$$
\begin{aligned}
&a^{12}\otimes b^{21}\otimes E_{11}
+a^{12}\otimes b^{22}\otimes E_{11}\\
&-a^{22}\otimes b^{21}\otimes E_{11}
-a^{22}\otimes b^{22}\otimes E_{11}.
\end{aligned}
$$

評価すると $(bg+bh-dg-dh)E_{11}$ です。$bg$ は目的の出力成分ですが、残り三項は他の積との和で消す必要があります。基底表示で四項でも、分解前の単純テンソルは一項です。
<!-- solution-end -->

<a id="ex-tsp7-b04"></a>

#### TSP7-B04 長方形を組み合わせる
- Level: B
- ID: TSP7-B04

任意の体 $K$ 上で $M_{2,1,3}\boxtimes M_{1,4,2}$ がどの行列積テンソルと各因子の同型で一致するか求めよ。積の階数上界と基本下界を求めよ。

<!-- solution-start -->
##### 詳細解答

[行列積テンソルの積と階数評価](#thm-tsp7-product)に $(m,n,p)=(2,1,3)$、$(m',n',p')=(1,4,2)$ を代入すると $(mm',nn',pp')=(2,4,6)$ です。例えば $i=2,i'=1,j=1,j'=4,k=3,k'=2$ なら $(I,J,H)=(2,4,6)$ となり、該当する基底積は $a^{24}\otimes b^{46}\otimes E_{26}$ に移ります。

[行列積テンソルの基本上下界](#thm-tsp7-matrix-bounds)より元の二つの階数は $2\cdot1\cdot3=6$、$1\cdot4\cdot2=8$ です。[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)より積の上界は48です。三因子の次元は $8,24,12$ なので基本下界は24です。従って $24\le R_K(M_{2,4,6})\le48$ です。この積構成だけで階数48が最小だとはいえません。
<!-- solution-end -->

### Level C

<a id="ex-tsp7-c01"></a>

#### TSP7-C01 ブロック算法の費用と下界
- Level: C
- ID: TSP7-C01

任意の体 $K$ 上で $N=8$ の正方行列積を考える。Strassenの式をブロックに再帰適用し、1次の積まで分割する場合、乗算数、加減算数を求めよ。通常の成分ごとの積の方法と比較し、さらに行列積テンソルの階数について今回の定理から得る上下界を求めよ。

<!-- solution-start -->
##### 詳細解答

[Strassenの7乗算法による上界](#thm-tsp7-strassen)の式は分配律と加法逆元だけを使い、積の左右を入れ替えていないのでブロック行列にも適用できます。$8=2^3$ なので、乗算数は各段で7倍になり、$7^3=343$ です。

加減算は最上段で18個の $4\times4$ ブロック、次の段で7組の18個の $2\times2$ ブロック、最後に49組の18個の $1\times1$ ブロックに対して行います。

$$
18\cdot16+7\cdot18\cdot4+49\cdot18
=288+504+882=1674.
$$

総演算数は $343+1674=2017$ です。一方、通常の計算では64個の出力成分ごとに8回の乗算と7回の加算を行うので、乗算512回、加算448回、合計960回です。この大きさでは七つの積を使う方法の方が総演算数が多くなります。

[行列積テンソルの基本上下界](#thm-tsp7-matrix-bounds)から下界は $8^2=64$ です。[行列積テンソルの積と階数評価](#thm-tsp7-product)に $q=3$ を適用して上界343を得ます。

$$
64\le R_K(M_{8,8,8})\le343.
$$

343はこの構成で達成できる双線形計算の長さであり、最小値の確定でも実際の実行時間の比較でもありません。
<!-- solution-end -->

## 7. 次に進む

行列積の式を三因子テンソルとして記録すると、乗算数の改善は短い単純テンソルの和を探す問題になります。次講では、各パラメータ値では短い和で表せるテンソルが、パラメータを変化させた極限ではどうなるかを調べます。

参考文献：V. Strassen, [Gaussian Elimination is not Optimal](https://doi.org/10.1007/BF02165411), Numerische Mathematik 13 (1969), 354–356；J. M. Landsberg, [Tensors: Geometry and Applications](https://doi.org/10.1090/gsm/128).
