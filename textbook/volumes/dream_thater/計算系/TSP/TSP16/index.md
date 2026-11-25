# TSP16 被覆・劣乗法的gauge・極限の準備：順序と凸性、一般スペクトルとの境界

前講では [併合と半環演算の両立性](../TSP15/index.md#thm-tsp15-grouping-semiring) により、局所性を緩めたときも資源の比較と演算を追跡できました。最後の講では、使える資源にそれぞれ費用を付け、必要な資源を十分に用意する最小費用を考えます。単一の変換だけでなく、複数の資源を組み合わせることが中心です。

## 1. 被覆で費用を測る

[前順序付き可換半環](../TSP10/index.md#def-tsp10-preordered-semiring) を $S$ とし、零を $0$、単位元を $1$、前順序を $\preceq$ と書きます。ここでは $0\preceq x$ が全ての $x\in S$ で成立すると仮定します。和は資源を並べて用意する操作、積は資源を組み合わせる操作です。

例えば二種類の仕事量を $(a,b)$ と書き、各座標の大小で比較します。両方を一単位ずつ処理できる資源 $(1,1)$ を3個買えば $(2,3)$ を処理できます。必要量を超えてもよい点が重要です。

<a id="def-tsp16-cover"></a>

<!-- formal-statement-start -->
> **定義（有限被覆と被覆gauge）**
>
> 零が最小元である前順序付き可換半環 $S$、資源集合 $B\subset S$、各資源の費用を与える写像 $c:B\to[1,\infty)$ を取る。
> 任意の $x\in S$ について有限列 $b_1,\ldots,b_k\in B$ が
>
$$
x\preceq\sum_{i=1}^k b_i
$$
>
> を満たすとき、この列を $x$ の有限被覆とする。空列の和と費用はともに0とする。全ての $x$ に有限被覆が存在すると仮定し、被覆gauge $g:S\to[0,\infty)$ を
>
$$
g(x)=\inf\left\{\sum_{i=1}^k c(b_i):
x\preceq\sum_{i=1}^k b_i\right\}
$$
>
> と定める。さらに以下では $x\preceq0$ なら $x=0$ と仮定する。
<!-- formal-statement-end -->

gauge はここでは被覆費用の下限を意味します。最適な列が存在しなくても、下限に任意に近い費用の列を取れます。

<!-- definition-example-start: def-tsp16-cover -->
**定義の確認**。$S=\mathbb N_0^2$ に座標ごとの和・積と大小を入れます。零は $(0,0)$、単位元は $(1,1)$ です。各座標は非負整数なので、和と積によって大小は保存され、零以下の元は零だけです。$B=\{(1,1)\}$、費用を1とします。$k$ 個の資源の和は $(k,k)$ です。従って $(a,b)$ を覆う条件は $a\le k$ かつ $b\le k$ です。$k=\max(a,b)$ なら両条件を満たし、それより小さい整数では少なくとも一方が破れます。全ての元に被覆が存在し、空列は零を覆います。よって

$$
g(a,b)=\max(a,b).
$$

特に $(2,3)$ の費用は3です。
<!-- definition-example-end -->

## 2. 被覆を足し、被覆を掛ける

二つの被覆を並べれば和を覆えます。積を覆うときの根拠は [可換半環の定義](../TSP10/index.md#def-tsp10-commutative-semiring) です。分配法則によって積を和に展開し、各被覆の全ての組合せを用意します。ただし、その組合せを十分安く作れるという仮定が必要です。

<a id="thm-tsp16-cover-properties"></a>

<!-- formal-statement-start -->
> **定理（被覆gaugeの基本不等式）**
>
> [有限被覆と被覆gauge](#def-tsp16-cover) の仮定を満たす $S,B,c,g$ を取る。全ての $x,y\in S$ に対して
>
$$
x\preceq y\Longrightarrow g(x)\le g(y),
$$

$$
g(x+y)\le g(x)+g(y),\qquad g(0)=0.
$$
>
> さらに $x\ne0$ なら $g(x)\ge1$ である。
> 任意の $b,b'\in B$ について $bb'$ が費用 $c(b)c(b')$ 以下の有限被覆を持つと仮定する。このとき
>
$$
g(xy)\le g(x)g(y).
$$
<!-- formal-statement-end -->

最後の性質を劣乗法性といいます。例えば単位資源だけで作る先ほどの例では、単位資源同士の積は単位資源自身なので、積に関する仮定も成立します。

<!-- proof-start -->
### 証明

$x\preceq y$ なら $y$ の各被覆は前順序の推移性により $x$ の被覆でもあります。従って $g(x)$ はそれらの費用全て以下であり、下限 $g(y)$ 以下です。空列から $g(0)=0$。非零の元は空列で覆えず、非空列の費用は各項が1以上なので総費用も1以上です。

$\varepsilon>0$ を任意に取ります。下限の性質から $x,y$ に対し被覆 $(b_i)_{i=1}^k,(d_j)_{j=1}^l$ を選び、それぞれの費用を $C,D$ とすると

$$
g(x)\le C<g(x)+\varepsilon,\qquad
g(y)\le D<g(y)+\varepsilon
$$

とできます。順序の加法との両立性から

$$
x+y\preceq\sum_i b_i+\sum_j d_j.
$$

右辺は二列を連結した被覆なので $g(x+y)\le C+D<g(x)+g(y)+2\varepsilon$。任意の正の $\varepsilon$ で成立するため、和の不等式が従います。

積については [前順序付き可換半環](../TSP10/index.md#def-tsp10-preordered-semiring) の積との両立性を適用します。次に [可換半環](../TSP10/index.md#def-tsp10-commutative-semiring) の分配法則で展開すると

$$
xy\preceq\left(\sum_i b_i\right)
\left(\sum_j d_j\right)=\sum_{i,j}b_i d_j.
$$

各 $(i,j)$ について仮定を使い、$b_i d_j$ を覆う列を費用 $C_{ij}\le c(b_i)c(d_j)$ で取ります。これら全てを連結すれば、加法との両立性と推移性によって $xy$ を覆います。その費用は

$$
\sum_{i,j}C_{ij}\le
\sum_{i,j}c(b_i)c(d_j)
=\left(\sum_i c(b_i)\right)
\left(\sum_j c(d_j)\right)=CD.
$$

空列の場合は $x$ または $y$ が零で積も零です。従って全ての場合に

$$
g(xy)\le(g(x)+\varepsilon)(g(y)+\varepsilon).
$$

右辺を展開すると $g(x)g(y)+\varepsilon(g(x)+g(y))+\varepsilon^2$ です。$g(x),g(y)$ は有限なので $\varepsilon\downarrow0$ として結論を得ます。
<!-- proof-end -->

費用が積に対して整合していなければ、この証明は成立しません。例えば非負整数の半環で $B=\{1,2\}$、$c(1)=c(2)=1$ とすると $g(2)=1$ ですが $g(4)=2$ です。積 $2\cdot2$ を費用1で覆えないため、劣乗法性が破れます。

## 3. 冪の費用から一回当たりの増大率へ

毎回最適な資源を独立に購入するより、まとめて購入する方が安いかもしれません。$x^n$ は半環の積を $n$ 回反復した元です。以下、積に関する前節の仮定も課します。

<a id="thm-tsp16-cover-limit"></a>

<!-- formal-statement-start -->
> **定理（被覆gaugeの漸近化）**
>
> [被覆gaugeの基本不等式](#thm-tsp16-cover-properties) の全仮定を満たす $S,B,c,g$ において、全ての $x\in S$ について極限
>
$$
\widehat g(x)=\lim_{n\to\infty}g(x^n)^{1/n}
=\inf_{n\ge1}g(x^n)^{1/n}
$$
>
> が存在する。全ての正の冪が非零の元では $1\le\widehat g(x)\le g(x)$ であり、ある正の冪が零なら $\widehat g(x)=0$ である。
> 全ての $x,y\in S$ と正整数 $m$ について
>
$$
x\preceq y\Longrightarrow\widehat g(x)\le\widehat g(y),
$$

$$
\widehat g(x^m)=\widehat g(x)^m,\qquad
\widehat g(xy)\le\widehat g(x)\widehat g(y).
$$
<!-- formal-statement-end -->

対数で積の不等式を和の不等式に直すと、テンソル階数と同じ極限の道具が使えます。冪に対して等号が成立することと、異なる二元の積に対して等号が成立することは区別します。

<!-- proof-start -->
### 証明

ある正整数 $N$ で $x^N=0$ なら、$n>N$ では $x^n=x^Nx^{n-N}=0$ です。従って根の列は以後すべて0となり、極限も下限も0です。以下、全ての正の冪が非零の場合を考えます。[被覆gaugeの基本不等式](#thm-tsp16-cover-properties) を反復して

$$
1\le g(x^n)\le g(x)^n.
$$

実数列 $a_n=\log g(x^n)$ を作ります。$x^{m+n}=x^m x^n$ より

$$
a_{m+n}\le\log(g(x^m)g(x^n))=a_m+a_n,
$$

$$
0\le a_n/n\le\log g(x).
$$

従って劣加法性があり、$a_n/n$ の下限は有限です。[Fekete補題](../TSP9/index.md#lem-tsp9-fekete) をこの実数列に適用すると

$$
\lim_{n\to\infty}a_n/n=\inf_{n\ge1}a_n/n.
$$

指数関数は連続で単調増加なので、左辺の指数は求める極限、右辺の指数は $g(x^n)^{1/n}$ の下限です。後者については下限に近づく列を取って連続性を使えば等号が確認できます。範囲の不等式も指数を取れば従います。

$x\preceq y$ なら順序と積の両立性により $x^n\preceq y^n$ が帰納的に成立します。実際、$x^n x\preceq y^n x\preceq y^n y$ です。$g$ の単調性、非負の $n$ 乗根、極限の順に適用すれば $\widehat g$ の単調性が得られます。

正整数 $m$ を固定します。既に全ての正整数 $k$ について列 $g(x^k)^{1/k}$ の極限が存在するので、その部分列 $k=mn$ も同じ極限を持ちます。

$$
g((x^m)^n)^{1/n}
=\left(g(x^{mn})^{1/(mn)}\right)^m.
$$

両辺の極限を取れば冪の公式です。積については可換性から $(xy)^n=x^ny^n$、劣乗法性から

$$
g((xy)^n)^{1/n}\le
g(x^n)^{1/n}g(y^n)^{1/n}.
$$

各列が有限の極限を持つので積の極限を取り、最後の不等式を得ます。
<!-- proof-end -->

第1節の最大座標の例では $(a,b)^n=(a^n,b^n)$ なので $\widehat g(a,b)=\max(a,b)=g(a,b)$ です。それでも $x=(2,1),y=(1,2)$ なら $\widehat g(x)=\widehat g(y)=2$、$\widehat g(xy)=2$ であり、積に関する等号は成立しません。

## 4. 整数個の購入から実数係数へ

次は有限個の座標を持つ被覆に話を限定します。整数個の資源を買う代わりに、例えば資源の半分ずつを購入できると仮定した緩和問題を作ります。一般の半環に実数倍があるとは限らないので、これは別のモデルです。

<a id="def-tsp16-fractional-cover"></a>

<!-- formal-statement-start -->
> **定義（有限座標の分数被覆）**
>
> 正整数 $d,k$、非負の実行列 $A\in\mathbb R^{d\times k}$、需要 $u\in[0,\infty)^d$、各成分が正の費用ベクトル $c\in(0,\infty)^k$ を取る。
> 非負実ベクトル $z\in[0,\infty)^k$ が座標ごとに $Az\ge u$ を満たすとき、$z$ を分数被覆とする。分数被覆の費用の下限を
>
$$
h(u)=\inf_{z\ge0,\ Az\ge u}c^{\mathsf T}z
$$
>
> とする。以下では対象となる需要に対し分数被覆が存在すると仮定する。
<!-- formal-statement-end -->

列 $j$ は資源一単位が各座標に供給する量です。購入量を $z_j$ とすれば、第 $i$ 座標の総供給は $\sum_j A_{ij}z_j$ です。整数制約 $z_j\in\mathbb N_0$ を外すことで、候補集合が大きくなります。従って分数被覆費用は整数被覆費用以下です。

<!-- definition-example-start: def-tsp16-fractional-cover -->
**定義の確認**。三つの座標を二つずつ覆う三資源を考えます。

$$
A=\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix},
\quad u=(1,1,1)^{\mathsf T},\quad c=(1,1,1)^{\mathsf T}.
$$

$A$ は非負の3行3列、$u$ は非負、$c$ は全成分正です。$z=(1/2,1/2,1/2)^{\mathsf T}$ は非負で、各行の内積は $1/2+1/2=1$ です。従って $Az=u$ を満たし、費用は $3/2$ です。

整数の場合、一資源では必ず一座標が0で、二資源を選べば三座標を覆えます。最小整数費用は2です。
<!-- definition-example-end -->

分数被覆では二つの購入計画を割合 $\lambda$ と $1-\lambda$ で混ぜられます。$0\le\lambda\le1$ のとき、この混合は [凸結合](../../../応用系/OPT/OPT1/index.md#def-opt1-convex-combination) です。任意の二点のこの混合が集合内に残ることが [凸集合](../../../応用系/OPT/OPT1/index.md#def-opt1-convex-set) の条件でした。

また各座標に非負の価格 $p_i$ を付け、資源一単位の供給量をその価格で評価した額が購入費以下になるようにすると、需要の評価額がどの被覆費用も超えないことを示せます。

<a id="thm-tsp16-fractional-bound"></a>

<!-- formal-statement-start -->
> **定理（分数被覆の凸性と価格下界）**
>
> [有限座標の分数被覆](#def-tsp16-fractional-cover) の設定で、分数被覆を持つ需要 $u,v$ と $0\le\lambda\le1$ を取る。各需要の分数被覆の集合は凸集合であり、
>
$$
h(\lambda u+(1-\lambda)v)
\le\lambda h(u)+(1-\lambda)h(v).
$$
>
> 任意の $p\in[0,\infty)^d$ が $A^{\mathsf T}p\le c$ を満たすなら
>
$$
p^{\mathsf T}u\le h(u).
$$
<!-- formal-statement-end -->

前半は需要に対する分数被覆費用の凸性、後半は任意の被覆を下から評価する方法です。後半は弱双対性に相当します。

<!-- proof-start -->
### 証明

$Az\ge u,Aw\ge v$ を満たす非負ベクトル $z,w$ を取ります。$q=\lambda z+(1-\lambda)w$ は各成分が非負で、

$$
Aq=\lambda Az+(1-\lambda)Aw
\ge\lambda u+(1-\lambda)v.
$$

特に $u=v$ とすれば同一需要の被覆集合が凸であることが分かります。

一般の $u,v$ では任意の $\varepsilon>0$ に対して、費用がそれぞれ $h(u)+\varepsilon,h(v)+\varepsilon$ 未満の $z,w$ を選べます。上の $q$ の費用は線形性により

$$
c^{\mathsf T}q=\lambda c^{\mathsf T}z+(1-\lambda)c^{\mathsf T}w
<\lambda h(u)+(1-\lambda)h(v)+\varepsilon.
$$

従って $h(\lambda u+(1-\lambda)v)$ は右辺以下です。$\varepsilon\downarrow0$ で第一の結論を得ます。

後半では任意の分数被覆 $z$ を取ります。$Az-u$ は非負で $p$ も非負なので $p^{\mathsf T}(Az-u)\ge0$。さらに $c-A^{\mathsf T}p$ と $z$ が非負なので

$$
p^{\mathsf T}u\le p^{\mathsf T}Az
=(A^{\mathsf T}p)^{\mathsf T}z
\le c^{\mathsf T}z.
$$

全ての被覆で成立するので費用の下限を取れば結論を得ます。
<!-- proof-end -->

三資源の例に戻り $p=(1/2,1/2,1/2)^{\mathsf T}$ とすると、各列の価格和は1で $A^{\mathsf T}p=c$ です。価格下界は $3/2$。既に同じ費用の分数被覆を作ったので、分数被覆の最適値は厳密に $3/2$ です。ここで最適値を確定できたのは上界と下界が一致したからです。一般のモデルで常に一致することは、この不等式だけからは言えません。

## 5. スペクトル点と何が違うのか

[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) は単調で、和と積を等号で保ち、零と一を保つ写像です。被覆gaugeに必要なのは一般に不等式です。

第1節の例で $x=(2,1),y=(1,2)$ とすると

$$
g(x+y)=g(3,3)=3<4=g(x)+g(y).
$$

第3節で漸近化してもこの関数は変わらず、劣乗法性も厳密なままです。単調性と冪の等号から加法性や乗法性を導くことはできません。

一方、スペクトル点 $\phi$ が全資源 $b\in B$ で $\phi(b)\le c(b)$ を満たすとします。[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) の単調性と加法性により、任意の被覆について

$$
\phi(x)\le\phi\left(\sum_i b_i\right)
=\sum_i\phi(b_i)\le\sum_i c(b_i).
$$

下限を取れば $\phi(x)\le g(x)$。さらに $x^n$ に同じ不等式を適用し、[スペクトル点の自然数値と冪](../TSP11/index.md#thm-tsp11-normalization-powers) の公式を代入して

$$
\phi(x)^n\le g(x^n),\qquad
\phi(x)\le g(x^n)^{1/n}.
$$

第3節の [被覆gaugeの漸近化](#thm-tsp16-cover-limit) によって $\phi(x)\le\widehat g(x)$ です。この評価はスペクトル点が費用の制約を満たす場合の片側の不等式です。

[Strassen漸近スペクトル双対性](../TSP12/index.md#thm-tsp12-duality) は [Strassen前順序](../TSP10/index.md#def-tsp10-strassen-preorder) の仮定のもとで、漸近的な順序をスペクトル点の比較で特徴付ける結果でした。任意の被覆費用や価格の最適値に関する双対性ではありません。費用の設定、被覆の操作、価格関数のクラスを新しく選ぶときは、必要な双対性を別途証明する必要があります。

## 6. 演習

### Level A

<a id="ex-tsp16-a01"></a>

#### TSP16-A01 被覆の最小個数
- Level: A
- ID: TSP16-A01

非負整数の二座標半環で資源を $(1,1)$ のみ、費用を1とする。$(4,7)$ と $(0,0)$ の被覆費用を求めよ。

<!-- solution-start -->
##### 詳細解答

[有限被覆と被覆gauge](#def-tsp16-cover) より、$k$ 個の資源の供給は $(k,k)$。$(4,7)$ について $k\ge4$ と $k\ge7$ が必要で、$k=7$ は両方を満たす。費用は7。零は空列で覆え、費用は非負なので0である。
<!-- solution-end -->

<a id="ex-tsp16-a02"></a>

#### TSP16-A02 和と積の不等式
- Level: A
- ID: TSP16-A02

上問の設定で $x=(3,1),y=(2,4)$ の $g(x),g(y),g(x+y),g(xy)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

被覆の条件は二座標とも資源個数以下となることなので、費用は最大座標である。$g(x)=3,g(y)=4$。座標ごとの演算から $x+y=(5,5)$、$xy=(6,4)$。従って $g(x+y)=5<7$、$g(xy)=6<12$。両不等式とも厳密である。
<!-- solution-end -->

<a id="ex-tsp16-a03"></a>

#### TSP16-A03 冪の増大率
- Level: A
- ID: TSP16-A03

同じ二座標半環の単位資源の費用を2とする。$x=(3,2)$ に対して $g(x^n)$ と $\widehat g(x)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

$x^n=(3^n,2^n)$ なので必要な最小個数は $3^n$。費用は $g(x^n)=2\cdot3^n$。単位資源の積は費用2で被覆でき、$2\le2^2$ だから積に関する仮定を満たす。この $x$ の全ての冪は非零なので、対数を用いる場合の条件も満たす。定義式の極限を直接計算すれば

$$
g(x^n)^{1/n}=2^{1/n}3\longrightarrow3
$$

である。従って $\widehat g(x)=3<g(x)=6$。
<!-- solution-end -->

<a id="ex-tsp16-a04"></a>

#### TSP16-A04 価格を検査する
- Level: A
- ID: TSP16-A04

三資源の分数被覆の例で $p=(1,0,0)^{\mathsf T}$ と $p'=(1,1,0)^{\mathsf T}$ が価格条件を満たすか調べよ。

<!-- solution-start -->
##### 詳細解答

転置行列を掛けると

$$
A^{\mathsf T}p=(1,1,0)^{\mathsf T},\qquad
A^{\mathsf T}p'=(2,1,1)^{\mathsf T}.
$$

両価格は非負だが、後者は第一列の評価額2が費用1を超えるので不適格である。前者は全成分1以下なので [分数被覆の凸性と価格下界](#thm-tsp16-fractional-bound) から $h(u)\ge p^{\mathsf T}u=1$ を得る。この下界は最適値 $3/2$ より弱い。
<!-- solution-end -->

### Level B

<a id="ex-tsp16-b01"></a>

#### TSP16-B01 積条件の必要性
- Level: B
- ID: TSP16-B01

非負整数の半環で $B=\{1,3\}$、$c(1)=c(3)=1$ とする。全ての非負整数 $n$ に対する $g(n)$ を求め、劣乗法性の反例を示せ。

<!-- solution-start -->
##### 詳細解答

$k$ 個の供給の総和は高々 $3k$ だから、被覆には $k\ge\lceil n/3\rceil$ が必要である。ここで天井記号はその数以上の最小整数を表す。逆にその個数だけ3を購入すれば総和が $n$ 以上になる。従って $g(n)=\lceil n/3\rceil$。$g(3)=1$ だが $g(9)=3$ なので $g(3\cdot3)>g(3)g(3)$。資源3同士の積9は費用1で覆えないから、[被覆gaugeの基本不等式](#thm-tsp16-cover-properties) の積に関する仮定が破れている。
<!-- solution-end -->

<a id="ex-tsp16-b02"></a>

#### TSP16-B02 下限を達成しない極限
- Level: B
- ID: TSP16-B02

非負整数の半環で $B=\{1\}$、$c(1)=3$ とする。$x=2$ について積の条件を確認し、$\widehat g(x)$ を求めよ。有限の $n$ で根の下限が達成されるか。

<!-- solution-start -->
##### 詳細解答

唯一の資源の積1は同じ資源で覆え、費用3は $3\cdot3=9$ 以下である。非零の非負整数の積は非零で、任意の $n$ の被覆には $n$ 個の1が必要なので $g(n)=3n$。従って $g(2^n)=3\cdot2^n$ である。[被覆gaugeの漸近化](#thm-tsp16-cover-limit) の条件を満たし、

$$
\widehat g(2)=\lim_{n\to\infty}2\exp((\log3)/n)=2.
$$

全ての有限の正整数 $n$ では $3^{1/n}>1$ で根は2より大きい。従って下限は達成されない。
<!-- solution-end -->

<a id="ex-tsp16-b03"></a>

#### TSP16-B03 費用の異なる分数被覆
- Level: B
- ID: TSP16-B03

第4節の行列 $A$ と需要 $u=(1,1,1)^{\mathsf T}$ に対して、費用を $c=(2,2,3)^{\mathsf T}$ に変更する。分数被覆と価格を構成し最適費用を求めよ。

<!-- solution-start -->
##### 詳細解答

$z=(1/2,1/2,1/2)^{\mathsf T}$ は $Az=u$ を満たし、費用は $(2+2+3)/2=7/2$ である。価格を $p=(1/2,3/2,3/2)^{\mathsf T}$ とすれば非負であり、

$$
A^{\mathsf T}p=(2,2,3)^{\mathsf T}=c.
$$

[分数被覆の凸性と価格下界](#thm-tsp16-fractional-bound) により $h(u)\ge p^{\mathsf T}u=7/2$。構成した被覆の費用も $7/2$ なので $h(u)=7/2$。
<!-- solution-end -->

### Level C

<a id="ex-tsp16-c01"></a>

#### TSP16-C01 費用とスペクトルの比較
- Level: C
- ID: TSP16-C01

零元と両座標が正の整数である組からなる半環 $S$ に座標ごとの演算と大小を入れる。資源は $(1,1)$ のみ、費用は1とする。

(1) Strassen前順序の条件を確認せよ。

(2) 二つの座標射影がスペクトル点であることを示せ。

(3) 被覆gaugeの漸近化と二射影の最大値が一致することを示し、その最大値自体がスペクトル点か判定せよ。

<!-- solution-start -->
##### 詳細解答

(1) 正の組同士の和と積は正の組であり、零を加えた場合や掛けた場合も $S$ 内にある。従って半環演算で閉じ、零は $(0,0)$、一は $(1,1)$。大小は座標ごとであり反射的・推移的で、非負座標の加法・乗法は大小を保つ。[Strassen前順序](../TSP10/index.md#def-tsp10-strassen-preorder) の第一条件は自然数の埋込みで $n\mapsto(n,n)$ だから

$$
(n,n)\preceq(m,m)\Longleftrightarrow n\le m.
$$

第二条件では $b=(b_1,b_2)\ne0$ を取ると両座標は1以上である。任意の $a=(a_1,a_2)$ に対し $r=\max(1,a_1,a_2)$ と置けば $a_i\le r\le rb_i$ なので $a\preceq rb$。両条件が成立する。

(2) $\phi_i(a)=a_i$ とすると、座標ごとの演算から

$$
\phi_i(a+b)=a_i+b_i,\qquad
\phi_i(ab)=a_i b_i.
$$

零と一の値は0と1であり、座標ごとの大小から単調である。[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) の全条件を満たす。

(3) 資源の和は $(k,k)$ だから $g(a)=\max(a_1,a_2)$。両座標が正の組の積は非零で、単位資源の積の費用は1なので [被覆gaugeの漸近化](#thm-tsp16-cover-limit) の仮定を満たす。全ての正整数 $n$ について

$$
g(a^n)=\max(a_1^n,a_2^n)
=\max(a_1,a_2)^n.
$$

根を取り極限を取ると $\widehat g(a)=\max(\phi_1(a),\phi_2(a))$。零でも両辺0である。しかし $a=(2,1),b=(1,2)$ では $\widehat g(a+b)=3$、$\widehat g(a)+\widehat g(b)=4$。積でも $\widehat g(ab)=2$、$\widehat g(a)\widehat g(b)=4$。従ってこの最大値はスペクトル点ではない。複数のスペクトル点から作った費用評価がそれ自体スペクトル点になるとは限らない。
<!-- solution-end -->

## 7. まとめ

有限被覆から費用を作ると、資源の組合せが順序と整合している限り単調性と劣加法性を得られます。積の被覆条件を確認すれば劣乗法性を導けます。正の冪に対する下界と[Fekete補題](../TSP9/index.md#lem-tsp9-fekete)により、一回当たりの費用増大率が定まります。有限座標の分数被覆では、凸結合と価格から上下の評価を構成できます。

この系列で学んだテンソルの制限、併合、半環、漸近スペクトルは、さらに特殊な資源比較を研究するときの道具になります。新しい被覆や費用のモデルでは、どの順序を保存し、どの演算を等号または不等式で保つかを一つずつ確かめることが出発点です。
