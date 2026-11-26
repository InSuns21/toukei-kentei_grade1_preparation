# MMX4 多項式乗算テンソルと次数profile・補間、スペクトル点への評価

[MMX3](../MMX3/index.md) では近似分解を補間して漸近的な評価へ移しました。しかし、行列積そのものの分解を直接探すと、三つの添字が複雑に絡みます。今回は一変数多項式の積を別の資源として用います。多項式の係数には次数による順序があり、積の係数を評価点で分離できます。その構造を、次講で行列積指数を評価するための二変数の数値関数に移します。

直接前提：[MMX3](../MMX3/index.md)、[TSP10](../../TSP/TSP10/index.md)、[TSP11](../../TSP/TSP11/index.md)、[TSP12](../../TSP/TSP12/index.md)、[TSP13](../../TSP/TSP13/index.md)、[TSP14](../../TSP/TSP14/index.md)。以下、体は複素数体 $\mathbb C$ とします。有限体での補間点の確保は別途扱います。

## 1. 多項式の積を三因子の係数にする

$f(u)=x_0+x_1u$、$g(u)=y_0+y_1u$ とすると

$$
f(u)g(u)=x_0y_0+(x_0y_1+x_1y_0)u+x_1y_1u^2.
$$

出力の三つの係数をそれぞれ $z_0,z_1,z_2$ と形式的に対にすると、三重線形形式

$$
C(2,2)=x_0y_0z_0+x_0y_1z_1+x_1y_0z_1+x_1y_1z_2
$$

が得られます。$z_k$ は積の係数そのものではなく、出力の第 $k$ 成分を取り出す双対座標です。[双線形写像の係数テンソル](../../TSP/TSP7/index.md#def-tsp7-bilinear-tensor) として扱います。一般の入力長 $a,b$ でも、次数 $i,j$ の項は出力次数 $i+j$ に寄与します。以下、$x_i,y_j$ は入力係数を取り出す座標写像、$z_k$ は出力の基底 $u^k$ と対にする形式変数です。記号 $x_i y_j z_k$ は三因子の単純テンソルを三重線形形式として書いたものです。

<a id="def-mmx4-convolution"></a>

<!-- formal-statement-start -->
> **定義（多項式乗算テンソル）**
>
> 正整数 $a,b$ に対し、長さ $a,b$ の係数ベクトルの通常の多項式積を表す三因子テンソルを
>
$$
C(a,b)=\sum_{i=0}^{a-1}\sum_{j=0}^{b-1}x_i y_j z_{i+j}
$$
>
> とする。三因子の座標数は $a,b,a+b-1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx4-convolution -->
**定義の確認**

入力長1と3の多項式 $x_0$ と $y_0+y_1u+y_2u^2$ の積は

$$
x_0y_0+x_0y_1u+x_0y_2u^2.
$$

出力の三係数に双対座標を対応させると

$$
C(1,3)=x_0(y_0z_0+y_1z_1+y_2z_2).
$$

入力添字はそれぞれ $i=0$ と $j=0,1,2$ です。出力添字が $i+j=j$ であるため、三項すべてが定義の和に一致します。座標数も順に1、3、3であり、最後の3は $1+3-1$ です。
<!-- definition-example-end -->

このテンソルを何項の単純テンソルの和に分けられるかを調べます。$R(T)$ は複素数体上の [テンソル階数](../../TSP/TSP2/index.md#def-tsp2-tensor-rank)（最短分解の項数）です。

<a id="thm-mmx4-convolution-rank"></a>

<!-- formal-statement-start -->
> **定理（多項式乗算テンソルの階数）**
>
> 複素数体上で、正整数 $a,b$ について
>
$$
R(C(a,b))=a+b-1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

上界は評価点ごとの一回の双線形乗算と線形補間、下界は出力次数ごとに独立な行があることから得ます。

<!-- proof-start -->
### 証明

$L=a+b-1$ とおき、入力を $f(u)=\sum_{i=0}^{a-1}x_i u^i$、$g(u)=\sum_{j=0}^{b-1}y_j u^j$ とします。積の次数は高々 $(a-1)+(b-1)=L-1$ です。相異なる $L$ 個の複素数 $\alpha_1,\ldots,\alpha_L$ を選び、$h(u)=f(u)g(u)$ とします。[多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) により、Lagrange基底

$$
\ell_s(u)=\prod_{r\ne s}\frac{u-\alpha_r}{\alpha_s-\alpha_r}
=\sum_{k=0}^{L-1}c_{sk}u^k
$$

を用いて $h(u)=\sum_s f(\alpha_s)g(\alpha_s)\ell_s(u)$ です。係数を取り出して $z_k$ と対にすると

$$
C(a,b)=\sum_{s=1}^L
\left(\sum_{i=0}^{a-1}\alpha_s^i x_i\right)
\left(\sum_{j=0}^{b-1}\alpha_s^j y_j\right)
\left(\sum_{k=0}^{L-1}c_{sk}z_k\right).
$$

各項が三つの線形形式の積なので階数は高々 $L$ です。

逆に出力因子の [平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening) の第 $k$ 行を考えます。列を $(i,j)$ で番号付けすると、その成分は $i+j=k$ のとき1、それ以外0です。各行の非零成分は他行と重なりません。

各行が非零であることは、次の列を選べば確認できます。

$$
i=\max(0,k-b+1),\qquad j=k-i.
$$

$k\le b-1$ なら $i=0,j=k$ です。$k\ge b$ なら $j=b-1$ で、$k\le a+b-2$ より $1\le i=k-b+1\le a-1$ です。どちらでも $0\le i<a$、$0\le j<b$ です。この列で第 $k$ 行の成分は1です。従って行は一次独立で、[平坦化階数による下界](../../TSP/TSP3/index.md#thm-tsp3-flattening-bound) から $R(C(a,b))\ge L$ を得ます。
<!-- proof-end -->

例えば $C(2,2)$ の評価点を $0,1,-1$ とすると、積を三回だけ計算して

$$
h_0=h(0),\quad h_1=\frac{h(1)-h(-1)}2,\quad
h_2=\frac{h(1)+h(-1)}2-h(0)
$$

と復元できます。次数2までなので3点で十分です。標数2ではこの三点が相異ならず、分母2も零になるため、この計算はそのまま使えません。

## 2. スペクトル点で測る向きと補間

[TSP11のスペクトル点](../../TSP/TSP11/index.md#def-tsp11-spectral-point) を $\lambda$ と書きます。原論文では tensor character と呼んでいます。正確には [テンソルの制限同値類の半環](../../TSP/TSP10/index.md#thm-tsp10-tensor-semiring) から非負実数への写像で、ここでは同値類の角括弧を省いて $\lambda(T)$ と書きます。[直和](../../TSP/TSP5/index.md#def-tsp5-direct-sum) に対して加法的、[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) に対して乗法的、制限に対して単調です。零テンソルを0に、乗法単位（各因子が一次元の非零単純テンソル）を1に写します。ここではテンソル自体の評価が必要なので、階数の上界だけでなく $\lambda$ の大小を直接比較します。

固定されたテンソルから、各座標に整数の重みを付けて最小次数だけを取り出す操作を考えます。固定線形写像の後で重み $w$ の座標を $\varepsilon^w$ 倍し、非零項に現れる重みの合計の最小値を $q$ として全体を $\varepsilon^{-q}$ 倍すれば、各項の指数が非負整数になり、テンソル値多項式 $F(\varepsilon)$ が得られます。この全体のスカラー倍は非零の $\varepsilon$ に対して一つの因子への線形写像として実現できます。例えば

$$
A=x_0y_0z_0+x_0y_1z_1+x_1y_0z_1
$$

の $x_1$ だけを $\varepsilon$ 倍すると、定数項には最初の二項だけが残ります。ここで $F(\varepsilon)$ は非零の $\varepsilon$ で $A$ の [制限](../../TSP/TSP4/index.md#def-tsp4-restriction) です。定数項もスペクトル点で評価したとき、元の値を超えないことを示します。

<a id="lem-mmx4-spectral-degeneration"></a>

<!-- formal-statement-start -->
> **補題（多項式退化のスペクトル単調性）**
>
> 複素数体上の三因子テンソル $A,B$ と固定非負整数 $L$ を取る。共通の三因子空間を持つ多項式
>
$$
F(\varepsilon)=B+\sum_{j=1}^L\varepsilon^j F_j
$$
>
> があり、全ての非零複素数 $\varepsilon$ で $F(\varepsilon)$ が $A$ の制限であるとする。このとき任意のスペクトル点 $\lambda$ に対して $\lambda(B)\le\lambda(A)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[多項式退化による漸近階数上界](../../TSP/TSP9/index.md#thm-tsp9-degeneration-asymptotic) と同じく、冪の後に定数項を回収します。ただし今回は各評価の階数ではなく、各評価に対する同じスペクトル点の値を加えます。

<!-- proof-start -->
### 証明

正整数 $N$ を固定し、$T^{\boxtimes N}$ を同じテンソル $T$ の $N$ 個のKronecker積とします。[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) の $N$ 冪では次数は高々 $NL$、定数係数は全因子で $B$ を選んだ $B^{\boxtimes N}$ です。[多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) により相異なる非零の $\alpha_s$ とスカラー $d_s$ を用いて

$$
B^{\boxtimes N}=\sum_{s=1}^{NL+1}d_s F(\alpha_s)^{\boxtimes N}
$$

と表せます。右辺の和は共通の空間上の和ですが、各項を独立な空間に置いた [直和](../../TSP/TSP5/index.md#def-tsp5-direct-sum) から、それぞれの座標を共通空間へ写し、第1因子に $d_s$ を掛けることで制限として得られます。[制限と積・和の単調性](../../TSP/TSP5/index.md#thm-tsp5-operation-monotonicity) とスペクトル点の公理より

$$
\lambda(B)^N
\le\sum_{s=1}^{NL+1}\lambda(F(\alpha_s))^N
\le (NL+1)\lambda(A)^N.
$$

$N$ 乗根を取ると $\lambda(B)\le(NL+1)^{1/N}\lambda(A)$ です。$L$ は固定されており $\log(NL+1)/N\to0$ なので結論を得ます。$A=0$ のときもこの不等式は成立します。
<!-- proof-end -->

例えば前の $A$ から得た定数項を $B$ とすると、$F(\varepsilon)=B+\varepsilon x_1y_0z_1$ で $L=1$ です。二乗の定数項は相異なる非零3点から回収でき、$\lambda(B)^2\le3\lambda(A)^2$。一般の $N$ では余分な点数の因子 $(N+1)^{1/N}$ が1に収束するため、$\lambda(B)\le\lambda(A)$ が得られます。

## 3. 内積型テンソルの指数

第1因子が一次元のテンソルを $B_X(m)$ と書くことにします。第2因子が一次元のものを $B_Y(m)$、第3因子が一次元のものを $B_Z(m)$ とします。$m$ 個の成分ごとの積を一つの因子へ集める形であり、原論文の dot product に対応します。ここで用いる $\sum_i y_i z_i$ は複素共役を含まない双線形の積和です。複素内積のようなHermitian形式を仮定していません。

<a id="def-mmx4-dot"></a>

<!-- formal-statement-start -->
> **定義（内積型テンソル）**
>
> 正整数 $m$ に対して三因子の内積型テンソルを
>
$$
B_X(m)=x\sum_{i=1}^m y_i z_i,\quad
B_Y(m)=y\sum_{i=1}^m x_i z_i,\quad
B_Z(m)=z\sum_{i=1}^m x_i y_i
$$
>
> とする。各式の添字を持たない因子は一次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx4-dot -->
**定義の確認**

$m=2$ を三つの式へ代入すると

$$
B_X(2)=xy_1z_1+xy_2z_2,
$$

$$
B_Y(2)=yx_1z_1+yx_2z_2,
$$

$$
B_Z(2)=zx_1y_1+zx_2y_2.
$$

それぞれ添字を持たない因子の座標数は1、残る二因子の座標数は2です。各項の二つの添字は一致し、係数は1です。例えば最初の式で $x=1$ とすると、双線形の積和は

$$
y_1z_1+y_2z_2
=\sum_{i,j=1}^2\delta_{ij}y_i z_j,
\qquad
\delta_{ij}=\begin{cases}1&i=j,\\0&i\ne j.\end{cases}
$$

となります。標準座標で $y_i z_j$ の係数を第 $i$ 行、第 $j$ 列に並べるので、係数行列は二次の単位行列です。これは二因子の添字が一致する項だけを選ぶという定義を行列で表しています。

[平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening) で第1因子を行とすれば、列 $(1,1),(1,2),(2,1),(2,2)$ に対する一行は $(1,0,0,1)$ です。第2因子を行とすれば、列は $(x,z_1),(x,z_2)$ に対応して単位行列になります。第3因子も同じ二次の単位行列です。従って [平坦化階数によるスペクトル点](../../TSP/TSP11/index.md#thm-tsp11-flattening-spectral-point) の三方向の値は順に1、2、2です。
<!-- definition-example-end -->

以下、$M_m=M_{m,m,m}$ を [正方行列積テンソル](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication) とします。

<a id="thm-mmx4-dot-exponents"></a>

<!-- formal-statement-start -->
> **定理（内積型テンソルのスペクトル指数）**
>
> 任意のスペクトル点 $\lambda$ に対し $p_X,p_Y,p_Z\in[0,1]$ が存在し、全正整数 $m$ と $I\in\{X,Y,Z\}$ で
>
$$
\lambda(B_I(m))=m^{p_I}.
$$
>
> さらに正方行列積テンソル $M_m$ に対し
>
$$
\lambda(M_m)=m^{p_X+p_Y+p_Z},\qquad
1\le p_X+p_Y+p_Z\le3.
$$
<!-- formal-statement-end -->

### 証明の見取り図

内積型テンソルは添字の直積と切り詰めができるので、その評価は自然数上の冪関数になります。最後に三方向を掛けて行列積へ戻します。

<!-- proof-start -->
### 証明

$I$ を三因子のうち任意の一つとして固定し、$f(m)=\lambda(B_I(m))$ とします。添字を $m$ 個から $n$ 個に切り詰める制限により $n\le m$ なら $f(n)\le f(m)$ です。

$m$ 項の単純テンソルに分解され、1項への制限もできるので、[スペクトル点による上下界](../../TSP/TSP11/index.md#thm-tsp11-order-bounds) から $1\le f(m)\le m$ です。積では例えば $I=X$ のとき

$$
B_X(m)\boxtimes B_X(n)
=(x\otimes x')\sum_{i=1}^m\sum_{j=1}^n
(y_i\otimes y'_j)(z_i\otimes z'_j).
$$

二つの添字 $(i,j)$ を $(i-1)n+j$ で番号付けします。この番号付けは可逆で、他の二方向でも一次元因子と二つの添字付き因子を同様に対応させます。従って各因子の線形同型を表す $\simeq$ を用いて

$$
B_I(m)\boxtimes B_I(n)\simeq B_I(mn),
\qquad f(mn)=f(m)f(n).
$$

従って $p_I=\log_2 f(2)$ は $[0,1]$ にあります。

整数 $m\ge2$、$N\ge1$ で $k=\lfloor N\log_2 m\rfloor$（床関数は引数以下の最大の整数）とすれば $2^k\le m^N<2^{k+1}$ です。単調性と乗法性から

$$
2^{kp_I}\le f(m)^N\le2^{(k+1)p_I}.
$$

$f(m)\ge1$ なので底2の対数を取り、正整数 $N$ で割れます。

$$
\frac{k}{N}p_I\le\log_2 f(m)\le\frac{k+1}{N}p_I.
$$

床関数の定義から $0\le N\log_2 m-k<1$ であり、両端が $p_I\log_2m$ に収束するため $f(m)=m^{p_I}$ です。$m=1$ では正規化から成立します。任意の $I$ に対してこの議論が使えます。

三つの内積型テンソルを掛けると、第1因子は $(j,k)$、第2因子は $(i,k)$、第3因子は $(i,j)$ で番号付けされ、積の展開は

$$
\sum_{i,j,k=1}^m x_{jk}y_{ik}z_{ij}.
$$

第1因子を $a^{jk}$、第2因子を $b^{ki}$、第3因子を $E_{ji}$ に付け替えます。各対の交換は全 $m^2$ 個の基底間の全単射なので、この式は [行列積テンソル](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication) の基底表示に一致します。乗法性から

$$
\lambda(M_m)=m^{p_X+p_Y+p_Z}.
$$

また三因子の非対角座標を全て零にすると $i=j=k$ の項だけが残り、$m$ 項の [対角テンソル](../../TSP/TSP4/index.md#def-tsp4-diagonal) が得られます。単調性・加法性により $\lambda(M_m)\ge m$。$m=2$ とすれば指数の和は1以上であり、各指数が1以下なので和は3以下です。
<!-- proof-end -->

第1因子の平坦化階数を使う例では $(p_X,p_Y,p_Z)=(0,1,1)$ であり、$M_m$ の第1因子側の平坦化階数 $m^2$ と一致します。

## 4. 次数プロファイルを作る

一つのスペクトル点では因子を入れ替えたときに値が変わり得ます。そこで三因子の六通りの置換を全て使い、幾何平均によって入力交換に対して対称な評価を作ります。$\pi$ を三因子の置換とし、$S_3$ をその六通りの置換全体とします。置換後のテンソルに $\lambda$ を適用する写像を $\lambda_\pi$ とします。直前の [内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) から $t=(p_X+p_Y+p_Z)/3\ge1/3$ であり、後で正の数 $6t$ の逆数を指数として使えます。置換は直和・積・制限を保つので $\lambda_\pi$ もスペクトル点です。

<a id="def-mmx4-profile"></a>

<!-- formal-statement-start -->
> **定義（対称化次数プロファイル）**
>
> 複素数体上のスペクトル点 $\lambda$ を固定し、[内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) を用いて $t=(p_X+p_Y+p_Z)/3>0$ とする。正整数 $a,b$ に対し
>
$$
P(a,b)=\left(\prod_{\pi\in S_3}\lambda_\pi(C(a,b))\right)^{1/(6t)}
$$
>
> を対称化次数プロファイルとする。ここで $S_3$ は三因子の六通りの置換の集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx4-profile -->
**定義の確認**

直接例を計算しましょう。$\lambda$ を第1因子側の平坦化階数とすると $t=2/3$ です。

[多項式乗算テンソル](#def-mmx4-convolution) の係数を [平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening) します。第1因子の行は $i$ で区別され、列 $(j,k)$ は $k=i+j$ のときだけ1です。各行には列 $(0,i)$ に1があり、同じ列を二つの行が共有すると $i=k-j$ が一致してしまうため、異なる行の非零位置は重なりません。

第2因子の行 $j$ には列 $(0,j)$ に1があり、同じ列なら $j=k-i$ が一致します。よって二方向とも全行が一次独立です。第3因子は [多項式乗算テンソルの階数](#thm-mmx4-convolution-rank) の下界証明で計算しました。三方向の階数は $a,b,a+b-1$ です。六置換で各方向が2回ずつ現れるので

$$
P(a,b)=\bigl(a^2 b^2(a+b-1)^2\bigr)^{1/4}
=\sqrt{ab(a+b-1)}.
$$

例えば $P(1,3)=3$、$P(2,2)=\sqrt{12}$ です。この値は指定した一つのスペクトル点の例であって、全ての点が同じ値を持つという意味ではありません。
<!-- definition-example-end -->

<a id="thm-mmx4-profile-basic"></a>

<!-- formal-statement-start -->
> **定理（対称化次数プロファイルの基本評価）**
>
> 上記の任意のスペクトル点 $\lambda$ に対する $P$ と $t$ について、全正整数 $a,b$ で
>
$$
P(a,b)=P(b,a)>0,\qquad P(1,b)=b,
$$
>
$$
P(a,b)\le(a+b-1)^{1/t}.
$$
>
> また $P$ は各入力長について非減少である。
<!-- formal-statement-end -->

### 証明の見取り図

六置換の積を取ると向きの違いが消えます。正規化指数は、入力長1のときに評価が他方の入力長そのものになるように選ばれています。

<!-- proof-start -->
### 証明

入力交換は六置換の並び替えなので積を保存します。非零テンソルは1へ制限できるため各 $\lambda_\pi(C(a,b))\ge1$、従って $P>0$ です。

$C(1,b)=B_X(b)$ です。[内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) により六通りの評価を掛け合わせると、$X$ が各因子位置へ移る置換が2通りずつあるので

$$
\prod_{\pi\in S_3}\lambda_\pi(C(1,b))
=b^{2(p_X+p_Y+p_Z)}=b^{6t}.
$$

$1/(6t)$ 乗して $P(1,b)=b$ を得ます。また [多項式乗算テンソルの階数](#thm-mmx4-convolution-rank) と [スペクトル点による上下界](../../TSP/TSP11/index.md#thm-tsp11-order-bounds) から各 $\lambda_\pi(C(a,b))\le a+b-1$。従って六つの積は $(a+b-1)^6$ 以下であり、正の指数 $1/(6t)$ を掛けることで上界が得られます。

正整数 $a'\ge a$ のとき $C(a',b)$ の $x_i$（$i\ge a$）と $z_k$（$k\ge a+b-1$）を零にすれば $C(a,b)$ を得ます。従って各スペクトル点の制限単調性により $P(a',b)\ge P(a,b)$ です。対称性から第2入力でも成立します。
<!-- proof-end -->

## 5. 隣り合う次数を結ぶ準備

次講の分離構成で必要となる比較の一つを、積の写像の側で準備しておきます。一変数の次数 $e$ 以下の多項式は $v^i u^{e-i}$ を基底とする二変数の斉次多項式（各単項式の全次数が $e$）へ対応します。これらの空間を $V_e$ と書きます。積は $V_{a-1}\times V_{b-1}\to V_{a+b-2}$ であり、係数テンソルは $C(a,b)$ です。

別の二変数 $s,w$ の一次形式を添えた空間の元を $A(u,v)s+B(u,v)w$（$A,B\in V_e$）とします。$s=u,w=v$ と代入すると $uA+vB\in V_{e+1}$ です。以下、$e$ は正整数、$\operatorname{span}(s,w)$ は $s,w$ の複素線形結合の空間、$\sigma_e$ はこの代入写像を表します。$V_e\otimes\operatorname{span}(s,w)$ の元を $As+Bw$ と略記しています。

この写像で0に移る元全体が核です。[商空間](../../../基礎科目/LA/LA2/index.md#def-la2-quotient) では核に属する差を持つ元同士を同一視します。$D=uw-vs$ は二行二列の行列（第1行が $u,v$、第2行が $s,w$）の行列式で、代入すると0になります。特に $e=b-1$（$b\ge2$）として核と商を計算すれば、入力長 $b-1$ と $b+1$ の二つの積が現れます。

<a id="lem-mmx4-determinant-filtration"></a>

<!-- formal-statement-start -->
> **補題（行列式による次数の分離）**
>
> 正整数 $e,a$ を取り、$V_d$ を複素数体上の $u,v$ の次数 $d$ の斉次多項式の空間（$d\ge0$）、$D=uw-vs$ とする。写像
>
$$
\sigma_e:V_e\otimes\operatorname{span}(s,w)\to V_{e+1},
\quad A s+B w\mapsto uA+vB
$$
>
> は全射で、核は $DV_{e-1}$ である。任意の $f\in V_{a-1}$ を掛ける写像は $\ker\sigma_e$ を $\ker\sigma_{e+a-1}$ へ写す。核上では $Dg\mapsto D(fg)$、商空間をそれぞれ代入写像の像と同一視すると $h\mapsto fh$ と作用する。
<!-- formal-statement-end -->

### 証明の見取り図

代入写像の全射性と核の次元を確かめます。その上で、任意の第1入力を掛ける操作が代入と可換であることを式で確認します。

<!-- proof-start -->
### 証明

$u^{e+1-i}v^i$（$0\le i\le e$）は $u^{e-i}v^i s$ の像であり、残る $v^{e+1}$ は $v^ew$ の像です。従って全射。

定義域の次元は $2(e+1)$、像の次元は $e+2$ なので核の次元は $e$ です。$g\in V_{e-1}$ について

$$
Dg=-vg\,s+ug\,w,\qquad \sigma_e(Dg)=-uvg+vug=0.
$$

$Dg=0$ なら $ug=0$ であり、多項式環に零因子がないので $g=0$。従って $DV_{e-1}$ は $e$ 次元で、核と一致します。

任意の $f$ について

$$
\sigma_{e+a-1}(f(As+Bw))
=u fA+v fB=f\sigma_e(As+Bw)
$$

です。従って核に属する元を掛けても核に属し、$f(Dg)=D(fg)$。[第一同型定理](../../../基礎科目/LA/LA2/index.md#thm-la2-first-isomorphism) により、全射 $\sigma_e$ の核による商は $V_{e+1}$ と同型です。出力側にも同じ定理を適用でき、入力の代表元を変えてもその差を $f$ 倍したものは出力の核に入ります。従って商の元は像 $h=\sigma_e(As+Bw)$ で一意に指定でき、掛け算は $fh$ に対応します。
<!-- proof-end -->

例えば $a=b=2$、$e=b-1=1$ です。入力の商の基底を代表する元は $us,vs,vw$、核の基底は $D$ です。

出力側では商の代表元 $u^2s,uvs,v^2s,v^2w$ と核の基底 $uD,vD$ を選びます。

$$
u(vw)=v^2s+vD.
$$

この式から商の代表元から核へ移る成分が出ます。しかし核から商への成分は生じません。

一般の整数 $b\ge2$ でも、商の基底の代表元と核の基底を合わせると元の空間の基底になります。実際、線形結合が零なら代入によって商の基底の係数はすべて零となり、次いで核の基底の係数も零です。任意の元からその像に対応する代表元の線形結合を引けば核に入るため、この基底は空間全体を張ります。商・核の順で入力と出力の基底を並べると、すべての第1入力 $f$ に対し掛け算の行列は

$$
\begin{pmatrix}M_f^+&0\\ *&M_f^-\end{pmatrix}
$$

となります。右上の0は核から商への成分がないことを表し、左下の $*$ は商の代表元から核へ移る成分を表します。$M_f^+$ は $V_b\to V_{a+b-1}$、$M_f^-$ は $V_{b-2}\to V_{a+b-3}$ の積の行列です。行列の寸法は順に $(a+b)\times(b+1)$、$(a+b-2)\times(b-1)$ であり、第1入力 $f$ の係数を変数として扱うと、それぞれ [多項式乗算テンソル](#def-mmx4-convolution) $C(a,b+1),C(a,b-1)$ を表します。第1入力の座標は共通で、第2入力・出力の座標だけが独立です。ここから全因子で独立な直和を得るには追加の構成が必要です。単にスペクトル点の加法性を適用することはできません。次講ではこの共有された第1因子を分離して、次数プロファイルの増分に関する不等式を証明します。

### 参考文献

- OpenAI, [An Upper Bound of 9/4 for the Matrix Multiplication Exponent](https://github.com/openai/math/blob/main/preprints/Matrix-Multiplication-Nine-Fourths-October-2-2026/build/paper.tex), 2026年10月2日。第2節の内積型テンソルと補間、第4節冒頭の多項式乗算・対称化プロファイル・行列式による分離を扱いました。次講では第3節の共有脚分離と第4・5節の増大率を接続します。

## 6. 演習

### Level A

<a id="ex-mmx4-a01"></a>

#### MMX4-A01 係数テンソルの展開
- Level: A
- ID: MMX4-A01

$C(2,3)$ を展開し、三因子の次元と出力側の平坦化階数を求めよ。

<!-- solution-start -->
##### 詳細解答

[多項式乗算テンソルの定義](#def-mmx4-convolution) で $0\le i\le1$、$0\le j\le2$ とし、出力次数0から3までについて添字対を列挙すると

$$
C(2,3)=x_0y_0z_0+(x_0y_1+x_1y_0)z_1
+(x_0y_2+x_1y_1)z_2+x_1y_2z_3.
$$

入力は2、3成分、出力は4成分です。列を $(0,0),(0,1),(0,2),(1,0),(1,1),(1,2)$ とすれば四行の非零列は順に $\{1\},\{2,4\},\{3,5\},\{6\}$。互いに重ならず全行が非零なので階数は4です。
<!-- solution-end -->
<a id="ex-mmx4-a02"></a>

#### MMX4-A02 三点補間
- Level: A
- ID: MMX4-A02

$f(u)=2+3u$、$g(u)=4-u$ を点 $0,1,-1$ で評価して積を復元せよ。

<!-- solution-start -->
##### 詳細解答

積を $h(u)=f(u)g(u)$ とします。評価値は

$$
h(0)=2\cdot4=8,\quad
h(1)=5\cdot3=15,\quad
h(-1)=(-1)\cdot5=-5.
$$

$h(u)=h_0+h_1u+h_2u^2$ とおくと $h_0=8$、$h_1+h_2=7$、$-h_1+h_2=-13$ です。後二式の差と和をそれぞれ2で割ると

$$
h_0=8,\quad h_1=(15+5)/2=10,\quad h_2=(15-5)/2-8=-3.
$$

従って $h(u)=8+10u-3u^2$。直接展開でも $2(-u)+3u\cdot4=10u$ です。
<!-- solution-end -->
<a id="ex-mmx4-a03"></a>

#### MMX4-A03 退化補間の点数
- Level: A
- ID: MMX4-A03

$F(\varepsilon)=B+\varepsilon F_1+\varepsilon^2F_2$ が全ての非零複素数 $\varepsilon$ で $A$ の制限とする。$N=3$ のとき得られるスペクトル点の不等式を求めよ。

<!-- solution-start -->
##### 詳細解答

[多項式退化のスペクトル単調性](#lem-mmx4-spectral-degeneration) の証明で次数は高々 $3\cdot2=6$、相異なる非零点を7個選べば十分です（実際の次数が低ければ少なくて済むこともあります）。定数項 $B^{\boxtimes3}$ を7個の評価値 $F(\alpha_s)^{\boxtimes3}$ の線形結合で回収し、その直和から制限できるため

$$
\lambda(B)^3\le\sum_{s=1}^7\lambda(F(\alpha_s))^3
\le7\lambda(A)^3.
$$従って $\lambda(B)\le7^{1/3}\lambda(A)$ です。
<!-- solution-end -->
<a id="ex-mmx4-a04"></a>

#### MMX4-A04 向きによる指数
- Level: A
- ID: MMX4-A04

第3因子側の平坦化階数をスペクトル点とする。$p_X,p_Y,p_Z,t$ と $\lambda(M_5)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

第3因子は $B_X(m)$ と $B_Y(m)$ で $m$ 次元、各行に異なる非零列があるので階数は $m$。$B_Z(m)$ は第3因子が一次元で非零なので階数1です。

従って指数は $(1,1,0)$、$t=2/3$。[内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) に代入すると $\lambda(M_5)=5^{1+1+0}=25$。
<!-- solution-end -->

### Level B

<a id="ex-mmx4-b01"></a>

#### MMX4-B01 内積型テンソルの冪指数
- Level: B
- ID: MMX4-B01

スペクトル点の値が $\lambda(B_X(2))=\sqrt2$ であると仮定する。$\lambda(B_X(3))$ を、$3^N$ を二の冪で挟んで求めよ。

<!-- solution-start -->
##### 詳細解答

$k_N=\lfloor N\log_2 3\rfloor$ とすれば $2^{k_N}\le3^N<2^{k_N+1}$。添字を切り詰める制限と積で

$$
2^{k_N/2}\le\lambda(B_X(3))^N\le2^{(k_N+1)/2}.
$$

$N$ 乗根を取り、$k_N/N\to\log_2 3$ と $(k_N+1)/N\to\log_2 3$ を使うと両端は $2^{(\log_2 3)/2}=\sqrt3$ に収束します。従って $\lambda(B_X(3))=\sqrt3$ です。これは [内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) の具体的な導出です。
<!-- solution-end -->
<a id="ex-mmx4-b02"></a>

#### MMX4-B02 対称化の数値例
- Level: B
- ID: MMX4-B02

第2因子の平坦化階数を $\lambda$ とする。$C(2,3)$ の六つの置換の評価の積と $P(2,3)$、基本上界を求めよ。

<!-- solution-start -->
##### 詳細解答

[A01](#ex-mmx4-a01) で求めた出力の平坦化階数は4です。入力側の平坦化でも第1因子の各行は列 $(j,k)$ に対して $k=i+j$ の成分を持つため重ならず、階数2です。第2因子側は列 $(i,k)$ を使い階数3。六置換の各方向が二度現れるため積は $2^2\cdot3^2\cdot4^2=576$。$t=2/3$ なので

$$
P(2,3)=576^{1/4}=\sqrt{24}.
$$

[対称化次数プロファイルの基本評価](#thm-mmx4-profile-basic) の上界は $4^{3/2}=8$ で、$\sqrt{24}<8$ は $24<64$ から分かります。
<!-- solution-end -->
<a id="ex-mmx4-b03"></a>

#### MMX4-B03 核と商の実計算
- Level: B
- ID: MMX4-B03

$e=2$ とする。$\sigma_2$ の核の基底と商の基底を表す代表元を列挙せよ。さらに $f=v$ を核の二基底に掛けた結果を求めよ。

<!-- solution-start -->
##### 詳細解答

[行列式による次数の分離](#lem-mmx4-determinant-filtration) から核は $DV_1$、基底は $uD,vD$ です。商の代表元を $u^2s,uvs,v^2s,v^2w$ と選ぶと像は $u^3,u^2v,uv^2,v^3$ であり $V_3$ の基底です。定義域は6次元で、核2次元と商4次元の和に一致します。

$f=v$ によって $uD\mapsto uvD$、$vD\mapsto v^2D$。いずれも出力の核 $DV_2$ に属します。実際 $\sigma_3(uvD)=uv(uw-vs)|_{s=u,w=v}=0$、$v^2D$ も $v^2(uv-vu)=0$ です。
<!-- solution-end -->
<a id="ex-mmx4-b04"></a>

#### MMX4-B04 有限体での評価点不足
- Level: B
- ID: MMX4-B04

二元体 $\mathbb F_2=\{0,1\}$ 上で次数2以下の多項式を全ての体の元で評価しても係数を回収できない例を示せ。

<!-- solution-start -->
##### 詳細解答

$h(u)=u^2-u$ と零多項式は $u=0,1$ でどちらも0になります。しかし $h$ の二次係数は1、零多項式の二次係数は0。従って評価写像は単射でなく、評価値から係数を一意に回収できません。[多項式乗算テンソルの階数](#thm-mmx4-convolution-rank) の上界証明が要求する相異なる3点をこの体では選べないためです。これだけで任意標数上の漸近上界を否定することはできません。
<!-- solution-end -->

### Level C

<a id="ex-mmx4-c01"></a>

#### MMX4-C01 増大率から指数へ
- Level: C
- ID: MMX4-C01

全てのスペクトル点について対称化次数プロファイルが $P(n,n)\ge n^{4/3}$（全正整数 $n$）を満たすと仮定する。基本上界と合わせて $t\le3/4$ を導き、複素数上の行列積指数を評価せよ。この追加仮定なしに同じ結論が出るかも述べよ。

<!-- solution-start -->
##### 詳細解答

任意のスペクトル点を固定します。[対称化次数プロファイルの基本評価](#thm-mmx4-profile-basic) に $a=b=n$ を代入すると

$$
n^{4/3}\le P(n,n)\le(2n-1)^{1/t}.
$$

$n\ge2$ で対数を取り $\log n>0$ で割ると

$$
\frac43\le\frac1t\frac{\log(2n-1)}{\log n}
=\frac1t\left(1+\frac{\log(2-1/n)}{\log n}\right).
$$

分子の追加項は有界で分母は無限大に向かうため、極限で $4/3\le1/t$。$t>0$ なので $t\le3/4$ です。[内積型テンソルのスペクトル指数](#thm-mmx4-dot-exponents) より

$$
\lambda(M_2)=2^{3t}\le2^{9/4}.
$$

この不等式は全スペクトル点に成立するので [行列積指数のスペクトル表示](../../TSP/TSP14/index.md#thm-tsp14-spectrum) により $\omega_{\mathbb C}\le9/4$ です。ただし仮定した対角増大率は本講の基本評価からはまだ証明していません。次講で共有脚を分離して得る不等式が必要です。
<!-- solution-end -->
