# ACOMP19 shifted partial derivatives：小さな多項式でランクを計算

前講の[定次数偏微分空間](../ACOMP18/index.md#def-acomp18-derivative-space)は偏微分の線形独立性を数える道具でした。しかし微分空間の次元が等しい二つの多項式でも、微分結果に変数を掛けたときの重なり方は異なります。今回はこの重なりを係数行列で測り、因子の次数を制限した積の和に必要な項数を調べます。

## 1. 偏微分に単項式を掛ける

体 $K$ 上の[多変数形式多項式](../../../代数系/AG/AG1-01/index.md#def-ag1-01-multivariate-polynomial)を扱い、変数 $x_1,\ldots,x_n$（$n\ge1$）を固定します。非負整数の組 $\alpha=(\alpha_1,\ldots,\alpha_n)$ に対し、$|\alpha|=\sum_i\alpha_i$、$x^\alpha=\prod_i x_i^{\alpha_i}$ と書きます。[形式偏微分](../ACOMP14/index.md#def-acomp14-formal-partial)の演算子 $D_i$ を、前講と同じく $\partial_{x_i}$ と書きます。$x_i$ の指数だけを下げ、他の変数は固定します。変数名が $x,y$ なら $\partial_x,\partial_y$ と書きます。

各変数について $\alpha_i$ 回行う合成を

$$
\partial^\alpha=\partial_{x_1}^{\alpha_1}\cdots\partial_{x_n}^{\alpha_n}
$$

とします。右端から作用させ、0回は恒等操作です。非負整数の組 $\gamma$ と、第 $i$ 成分だけ1の指数の組 $e_i$ を使います。例えば $i\ne j$ で単項式 $x^\gamma$ の両指数 $\gamma_i,\gamma_j$ が正のとき、

$$
\partial_{x_i}\partial_{x_j}x^\gamma
=\gamma_j\gamma_i x^{\gamma-e_j-e_i}
=\partial_{x_j}\partial_{x_i}x^\gamma.
$$

どちらかの指数が0なら両順序で零になります。多項式でも項ごとに同じなので微分順序を交換できます。$\alpha=0$ なら $\partial^0 f=f$ です。

別の非負整数の組 $\beta$ にも同じ指数記法を使います。$k$ は微分の総回数、$\ell$ は掛ける単項式 $x^\beta$ の全次数です。

例えば $f=x^3+y^3$ を有理数体上で微分すると $3x^2,3y^2$ になります。さらに $x$ と $y$ をそれぞれ掛ければ、$3x^3,3x^2y,3xy^2,3y^3$ という四つの異なる単項式が得られます。この掛け算をシフトと呼びます。変数を平行移動する操作ではありません。

こうして得た多項式の[線形包](../../../代数系/FLD/FLD0/index.md#def-fld0-span-over-field)、すなわち体 $K$ の係数による有限線形結合全体を取り、その[次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)を数えます。

<a id="def-acomp19-shifted-space"></a>

<!-- formal-statement-start -->
> **定義（シフト付き偏微分空間）**
>
> 体 $K$ 上の $n\ge1$ 変数の形式多項式 $f$ と非負整数 $k,\ell$ に対し、

$$
S_{k,\ell}(f)=\operatorname{span}_K
\{x^\beta\partial^\alpha f:|\alpha|=k,\ |\beta|=\ell\}
$$

> をシフト付き偏微分空間（shifted partial derivatives の線形包）とする。その次元を $\Gamma_{k,\ell}(f)$ と書く。微分は通常の形式偏微分であり、シフトの次数はちょうど $\ell$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp19-shifted-space -->
**定義の確認**：任意の体上で $f=xy$、$k=\ell=1$ とします。微分の指数の組も掛ける単項式の指数の組も $(1,0),(0,1)$ の二通りです。微分は $y,x$、シフト後は順に $xy,y^2,x^2,xy$ です。

従って線形包は $Kx^2+Kxy+Ky^2$ です。この三つの単項式は互いに異なるため、線形結合が零ならそれぞれの係数が零です。よって次元は3です。四つの生成元があっても、独立な方向は三つだけです。
<!-- definition-example-end -->

$\ell=0$ のとき、掛ける単項式は1だけなので $S_{k,0}(f)=D_k(f)$ です。ここで $D_k$ は[定次数偏微分空間](../ACOMP18/index.md#def-acomp18-derivative-space)です。本講では非斉次多項式にもこの定義を使えますが、以降の行列の列数を固定するため主に斉次多項式を扱います。[斉次多項式と斉次成分](../ACOMP5/index.md#def-acomp5-components)の区別を使います。非零項の全次数がすべて同じものが斉次多項式で、実次数を持たない零多項式も各斉次成分の空間に含めます。

## 2. 係数を並べて次元を計算する

次数 $h\ge0$ の斉次多項式全体の空間を $H_h$ と書きます。基底は $|\gamma|=h$ を満たす単項式 $x^\gamma$ です。その個数を $N(n,h)$ と置きます。$h$ 個の印と $n-1$ 個の仕切りを一列に並べ、各区間の印の数を指数に対応させると、

$$
N(n,h)=\binom{n+h-1}{h}
$$

となります。$h=0$ なら基底は1だけ、$n=1$ なら基底は $x_1^h$ だけです。

$f\in H_d$ を $k\le d$ 回微分すると、零になるか次数 $d-k$ の斉次多項式になります。さらに次数 $\ell$ の単項式を掛けると $H_{d-k+\ell}$ に属します。従って共通の基底で座標を取り、行列の行として並べられます。

前講の[変数分割係数行列](../ACOMP18/index.md#def-acomp18-partition-matrix)と同じ係数記法を使い、$[x^\gamma]p$ は多項式 $p$ の単項式 $x^\gamma$ の係数（存在しなければ0）とします。例えば 二変数の場合に $H_2$ の基底を $x^2,xy,y^2$ の順に取ると、$p=2x^2+xy$ の座標は $(2,1,0)$ です。行は一つのシフト付き偏微分の座標、列は基底単項式を表します。[階数](../ACOMP17/index.md#def-acomp17-coefficient-matrix)は行空間の次元であり、ここでは変数分割そのものではなく、生成元どうしの線形関係を判定します。

<a id="thm-acomp19-coefficient-rank"></a>

<!-- formal-statement-start -->
> **定理（シフト付き偏微分の係数行列による次元計算）**
>
> 体 $K$ 上の $n\ge1$ 変数について、整数 $d\ge0$ を固定し $f\in H_d$ とする（零多項式も許す）。整数 $0\le k\le d$、$\ell\ge0$ に対し、行を $(\alpha,\beta)$、列を $\gamma$ で添字付けする。各指数の全次数はそれぞれ $k,\ell,d-k+\ell$ とする。係数行列

$$
M_{k,\ell}(f)_{(\alpha,\beta),\gamma}
=[x^\gamma](x^\beta\partial^\alpha f)
$$

> の階数は $\Gamma_{k,\ell}(f)$ に等しい。特に、

$$
\Gamma_{k,\ell}(f)\le
\min\{N(n,k)N(n,\ell),N(n,d-k+\ell)\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

多項式を単項式基底に関する座標ベクトルに置き換えても、線形関係は変化しません。従って生成元の線形包と行空間の次元は一致します。

<!-- proof-start -->
### 証明

$h=d-k+\ell$ と置きます。単項式基底に関する[座標同型](../../../代数系/FLD/FLD0/index.md#thm-fld0-coordinate-isomorphism-over-field)を使います。各 $p\in H_h$ は

$$
p=\sum_{|\gamma|=h}a_\gamma x^\gamma
$$

と一意に表せます。写像 $p\mapsto(a_\gamma)_\gamma$ は係数の加法と定数倍を保存し、逆写像は座標を係数とする多項式の復元です。

[シフト付き偏微分空間](#def-acomp19-shifted-space)の生成元はすべて $H_h$ に属するので、その座標の線形包はちょうど $M_{k,\ell}(f)$ の行空間です。写像と逆写像が線形なので次元は保存され、行空間の次元は階数に等しくなります。

$\alpha,\beta$ の選択数はそれぞれ $N(n,k),N(n,\ell)$ です。列数は $N(n,h)$ なので、行数と列数のどちらも階数の上界となります。
<!-- proof-end -->

### 同じ偏微分次元でもシフト後は異なる

有理数体上で $f=x^3+y^3$、$g=x^2y$ とします。一次偏微分はそれぞれ $(3x^2,3y^2)$ と $(2xy,x^2)$ です。どちらも異なる二単項式を生成するので $\Gamma_{1,0}=2$ です。

$k=\ell=1$ とし、行を $(\partial_x,x),(\partial_x,y),(\partial_y,x),(\partial_y,y)$、列を $x^3,x^2y,xy^2,y^3$ の順に取ります（行の第1成分は偏微分演算子、第2成分は掛ける単項式です）。$f$ の生成元は順に $3x^3,3x^2y,3xy^2,3y^3$、$g$ の生成元は $2x^2y,2xy^2,x^3,x^2y$ です。例えば $g$ の第1生成元 $x\partial_x g=2x^2y$ の係数を列順に拾うと $(0,2,0,0)$ になります。

$$
M_{1,1}(f)=
\begin{pmatrix}
3&0&0&0\\
0&3&0&0\\
0&0&3&0\\
0&0&0&3
\end{pmatrix},
\quad
M_{1,1}(g)=
\begin{pmatrix}
0&2&0&0\\
0&0&2&0\\
1&0&0&0\\
0&1&0&0
\end{pmatrix}.
$$

後者の第1行から第4行の2倍を引くと零行になり、残る三行は別々の列に非零成分を持ちます。[係数行列による次元計算](#thm-acomp19-coefficient-rank)から、階数はそれぞれ4と3です。シフトによって微分結果どうしの重なりの差が見えました。

この計算には係数体が効いています。[標数](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field)3では $f$ の微分はすべて零、標数2では $g$ の $\partial_x g$ が零となります。標数2の $g$ のシフトは $x^3,x^2y$ だけなので次元は2です。通常の形式偏微分を使う以上、整数係数が体の中で零になる可能性を確認します。

## 3. 和の大きさは各項の大きさの和以下

積の和に必要な項数を測るには、複雑な多項式の次元が、簡単な各項の次元を足した量を超えないことを示します。

<a id="prop-acomp19-subadditivity"></a>

<!-- formal-statement-start -->
> **命題（シフト付き偏微分次元の劣加法性）**
>
> 同じ体・同じ有限変数集合の形式多項式 $f_1,\ldots,f_t$（$t\ge1$）と整数 $k,\ell\ge0$ に対し、

$$
\Gamma_{k,\ell}\left(\sum_{i=1}^t f_i\right)
\le \sum_{i=1}^t\Gamma_{k,\ell}(f_i).
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ微分・シフトを各項へ施すと、結果は各項の空間の和に入ります。各空間の基底を合わせれば、その和を生成できます。

<!-- proof-start -->
### 証明

[形式偏微分の和と積の規則](../ACOMP14/index.md#thm-acomp14-partial-rules)の線形性を $k$ 回適用すると、

$$
x^\beta\partial^\alpha\left(\sum_{i=1}^t f_i\right)
=\sum_{i=1}^t x^\beta\partial^\alpha f_i.
$$

右辺の第 $i$ 項は [シフト付き偏微分空間](#def-acomp19-shifted-space) $S_{k,\ell}(f_i)$ に属します。すべての生成元が空間の和に属するので、

$$
S_{k,\ell}\left(\sum_i f_i\right)
\subseteq \sum_i S_{k,\ell}(f_i).
$$

右辺の空間の和は各空間から一つずつ元を取った和全体です。各空間の基底を合わせた集合で生成でき、その集合の個数は各次元の和以下です。[次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)は生成集合の個数以下であり、部分空間の次元は全体の次元以下なので、

$$
\dim_K S_{k,\ell}\left(\sum_i f_i\right)
\le \dim_K\left(\sum_i S_{k,\ell}(f_i)\right)
\le \sum_i\dim_K S_{k,\ell}(f_i).
$$

これが求める不等式です。
<!-- proof-end -->

等号は保証されません。例えば $f_1=x^2,f_2=-x^2$、$k=\ell=0$ なら左辺は0、右辺は2です。打消しを許したまま成り立つ上界であることが重要です。

## 4. 因子の次数を制限した積の和

前講の[斉次深さ3回路](../ACOMP18/index.md#def-acomp18-shallow)では各積の因子が一次式でした。ここでは因子を同じ次数 $q$ の斉次多項式へ拡張します。$q=1$ なら前講のモデルに戻ります。$q>1$ では内部で複数の単項式を持つ因子が許されます。

$m\ge1$ 個の因子 $Q_j\in H_q$（$q\ge1$）からなる一つの積を $P=Q_1\cdots Q_m$ とします。微分を $k$ 回行うと、一回ごとにいずれかの因子に微分が当たります。$k\le m$ なら、微分が当たった因子は高々 $k$ 個です。そこへ未微分の因子を必要なだけ足し、ちょうど $k$ 個選んで囲むと、囲みの外は、同じ囲みを選んだ項どうしで共通の積になります。因子は多項式の値ではなく位置 $j$ で区別します。

<a id="lem-acomp19-product-bound"></a>

<!-- formal-statement-start -->
> **補題（等次数因子の積のシフト付き偏微分次元上界）**
>
> 体 $K$ 上の $n\ge1$ 変数の斉次多項式 $Q_1,\ldots,Q_m$ がそれぞれ次数 $q\ge1$ の斉次成分に属し、$m\ge1$ とする。$P=\prod_{j=1}^m Q_j$ と置く。整数 $0\le k\le m$、$\ell\ge0$ に対して、

$$
\Gamma_{k,\ell}(P)
\le \binom{m}{k}N(n,k(q-1)+\ell).
$$
<!-- formal-statement-end -->

### 証明の見取り図

微分の当たった因子を含む $k$ 個の因子集合を固定すると、外側の積が固定されます。内側は微分とシフトを合わせて次数 $kq-k+\ell$ の空間に収まります。集合の選び方ごとにその空間の次元を数えます。

<!-- proof-start -->
### 証明

[形式偏微分の和と積の規則](../ACOMP14/index.md#thm-acomp14-partial-rules)を一回ずつ適用します。最初は $\partial_{x_i}P$ が各因子を一つ微分した積の和になります。次の微分でも一つの因子の微分次数が1増えるだけです。これを $k$ 回反復すると、各項は定数倍を除いて

$$
\prod_{j=1}^m\partial^{\alpha^{(j)}}Q_j,
\qquad
\sum_{j=1}^m|\alpha^{(j)}|=k
$$

の形になります。ここで $\alpha^{(j)}$ は第 $j$ 因子に配分された非負整数の指数の組で、$\sum_j\alpha^{(j)}=\alpha$ です。積の規則によって同じ項が複数回現れることはありますが、係数は体 $K$ の中で足すだけで、階乗による除算は行いません。少なくとも一回微分された因子の添字集合を $T$ とすると、各 $j\in T$ は微分次数を少なくとも1消費するので $|T|\le k$ です。

$k\le m$ より $T$ を含む大きさ $k$ の集合 $I\subseteq\{1,\ldots,m\}$ を取れます。零でない項を考えると、$j\in I$ の各因子の微分後の次数は $q-|\alpha^{(j)}|$ です。$I$ の外では微分次数が0なので、内側の次数の和は

$$
\sum_{j\in I}(q-|\alpha^{(j)}|)
=|I|q-k=kq-k
$$

になります。

次数 $\ell$ のシフトを掛けた項を

$$
\left(\prod_{j\notin I}Q_j\right)
\left(x^\beta\prod_{j\in I}\partial^{\alpha^{(j)}}Q_j\right)
$$

と分けます。後半は $H_{k(q-1)+\ell}$ に属します。前半の積を $R_I=\prod_{j\notin I}Q_j$ と書きます。$a=k(q-1)+\ell$ とすると、$H_a$ の基底単項式 $x^\gamma$（$|\gamma|=a$）に $R_I$ を掛けた $R_I x^\gamma$ が、固定した $I$ で得られる像全体を生成します。実際、

$$
R_I\left(\sum_{|\gamma|=a}b_\gamma x^\gamma\right)
=\sum_{|\gamma|=a}b_\gamma R_I x^\gamma.
$$

生成元は $N(n,a)$ 個なので、像の次元はそれ以下です。零項もこの像に含まれます。

すべての生成元は、大きさ $k$ の集合 $I$ ごとの像を足した空間に属します。集合は $\binom{m}{k}$ 個であり、各像の基底を合わせた集合で空間の和を生成できるため、主張の次元上界が得られます。$k=0$ のときも $I$ は空集合、前半は $P$、後半は $x^\beta$ となり、同じ議論が成立します。
<!-- proof-end -->

例えば $P=(xy)(zw)$ を4変数で考えます。$m=q=2$、$k=1,\ell=0$ なら[積の上界](#lem-acomp19-product-bound)の右辺は $2N(4,1)=8$ です。実際の微分は $yzw,xzw,xyw,xyz$ の四単項式なので次元4です。上界は一般に鋭いとは限りません。

<a id="thm-acomp19-top-fanin"></a>

<!-- formal-statement-start -->
> **定理（等次数因子の積の和の項数下界）**
>
> 体 $K$ 上の $n\ge1$ 変数の多項式 $f$ が次の表示を持つとする。

$$
f=\sum_{i=1}^t c_i\prod_{j=1}^m Q_{ij},
\qquad c_i\in K
$$

> ここで $t,m,q\ge1$ は整数、各 $Q_{ij}$ は次数 $q$ の斉次成分に属する。整数 $0\le k\le m$、$\ell\ge0$ に対し、

$$
t\ge
\left\lceil
\frac{\Gamma_{k,\ell}(f)}
{\binom{m}{k}N(n,k(q-1)+\ell)}
\right\rceil .
$$
<!-- formal-statement-end -->

### 証明の見取り図

各積の次元を先ほどの補題で抑え、和の次元を各積の次元の和で抑えます。

<!-- proof-start -->
### 証明

$P_i=\prod_j Q_{ij}$ と書きます。[形式偏微分の線形性](../ACOMP14/index.md#thm-acomp14-partial-rules)により各生成元は $x^\beta\partial^\alpha(c_iP_i)=c_i x^\beta\partial^\alpha P_i$ です。定数 $c_i$ が非零なら逆数を掛けて元に戻せるため同じ空間を生成し、零なら空間は零です。従って $\Gamma_{k,\ell}(c_i P_i)\le\Gamma_{k,\ell}(P_i)$ です。

[シフト付き偏微分次元の劣加法性](#prop-acomp19-subadditivity)と[等次数因子の積の上界](#lem-acomp19-product-bound)を順に適用すると、

$$
\begin{aligned}
\Gamma_{k,\ell}(f)
&\le\sum_{i=1}^t\Gamma_{k,\ell}(c_iP_i)\\
&\le\sum_{i=1}^t\binom{m}{k}N(n,k(q-1)+\ell)\\
&=t\binom{m}{k}N(n,k(q-1)+\ell).
\end{aligned}
$$

分母は $0\le k\le m$ と $n\ge1$、$k(q-1)+\ell\ge0$ より正の整数です。両辺を分母で割り、$t$ が整数であることから切り上げます。
<!-- proof-end -->

有理数体上で $F=\sum_{i=1}^{7}x_i^3$ を三つの斉次一次式の積の和で表す場合を考えます。$m=3,q=1,k=\ell=1$ です。[シフト付き偏微分空間](#def-acomp19-shifted-space)の生成元は $3x_i^2x_j$（$1\le i,j\le7$）で、$i=j$ のときは $3x_i^3$、$i\ne j$ のときは二乗される変数と一次の変数から添字対が復元できます。49個すべて独立なので $\Gamma_{1,1}(F)=49$ です。[積の和の項数下界](#thm-acomp19-top-fanin)の分母は $\binom31 N(7,1)=21$ となり、$t\ge\lceil49/21\rceil=3$ です。これは最小項数が3だという主張ではありません。7個の立方の和は上界7を与えます。

## 5. 測度の使い方と限界

下界証明では、対象多項式での大きい次元と、制限モデルの一項での小さい次元を比較します。$\ell$ を増やすと生成元の候補数と一項の上界はともに減りません（$n=1$ では一定です）。従って次元だけでなく比を調べることが大切です。

また、$k>m$ では微分が当たった因子をちょうど $k$ 個選ぶ議論が使えません。因子次数が不揃いの場合は内側の次数を $kq-k$ と固定できません。この補題をそのまま適用することはできません。例えば因子数を1、次数を $d$ として任意の斉次多項式を一つの因子に許すと、項数は1で済みます。一般の算術回路の下界へ結論を拡張するには別の論証が必要です。

文献では次数がちょうど $\ell$ のシフトだけでなく、次数が高々 $\ell$ のもの、特定の変数だけにシフトするもの、射影を組み合わせるものも扱います。本講で証明したのは上の定義に対する上界です。次講では多項式が零かどうかを効率よく判定する問題へ進みます。

## 6. 演習

### A1. 一次偏微分とシフト

任意の体上の $f=xy+xz$ に対し、$\Gamma_{1,0}(f)$ と $\Gamma_{1,1}(f)$ を求めよ。

- Level: A
- ID: ACOMP19-A1

<!-- solution-start -->
**詳細解答**

[シフト付き偏微分空間](#def-acomp19-shifted-space)の微分は $y+z,x,x$ です。$y+z$ と $x$ は $y,x$ の係数を比較すれば独立なので $\Gamma_{1,0}=2$ です。

各微分に $x,y,z$ を掛けると、重複を除いて $xy+xz,y^2+yz,yz+z^2,x^2,xy,xz$ が得られます。最初のものは $xy,xz$ の和です。残る五つ $y^2+yz,yz+z^2,x^2,xy,xz$ の線形結合が零なら、$y^2,z^2,x^2,xy,xz$ の係数比較によりそれぞれの係数が零です。従って次元は5です。
<!-- solution-end -->

### A2. 行列の大きさ

3変数の四次斉次多項式について $k=2,\ell=1$ の係数行列の行数と列数を求めよ。

- Level: A
- ID: ACOMP19-A2

<!-- solution-start -->
**詳細解答**

[係数行列による次元計算](#thm-acomp19-coefficient-rank)では微分の指数の選び方が $N(3,2)=\binom42=6$、シフトが $N(3,1)=3$ です。行数は $6\cdot3=18$ です。

生成元の次数は $4-2+1=3$ なので列数は $N(3,3)=\binom53=10$ です。行列は18行10列で、次元は高々10です。
<!-- solution-end -->

### A3. 標数の影響

$f=x^2+y^2$ の $\Gamma_{1,1}$ を有理数体と二元体で求めよ。

- Level: A
- ID: ACOMP19-A3

<!-- solution-start -->
**詳細解答**

[形式偏微分](../ACOMP14/index.md#def-acomp14-formal-partial)により微分は $2x,2y$ です。[シフト付き偏微分空間](#def-acomp19-shifted-space)の生成元は $2x^2,2xy,2xy,2y^2$ です。

有理数体では2で割ることができ、異なる三単項式 $x^2,xy,y^2$ が基底になるので次元3です。二元体では2が零なので生成元がすべて零、次元0です。
<!-- solution-end -->

### A4. 上界への代入

3変数で次数2の斉次因子を3個掛けた積 $P$ について、$k=1,\ell=2$ の次元上界を計算せよ。

- Level: A
- ID: ACOMP19-A4

<!-- solution-start -->
**詳細解答**

[等次数因子の積の上界](#lem-acomp19-product-bound)に $n=3,m=3,q=2,k=1,\ell=2$ を代入します。$1\le3$ なので適用可能です。

内側の次数は $1(2-1)+2=3$ で、$N(3,3)=\binom53=10$ です。因子の選び方は $\binom31=3$ なので $\Gamma_{1,2}(P)\le30$ です。一方、全体の次数は $6-1+2=7$ で周囲の空間の次元は $\binom97=36$ です。因子を利用した30は周囲の空間の次元36より小さい上界です。ただし、[係数行列による次元計算](#thm-acomp19-coefficient-rank)の行数は $N(3,1)N(3,2)=3\cdot6=18$ なので、この設定では18がさらに強い上界です。
<!-- solution-end -->

### B1. 二次偏微分を使う行列

有理数体上で $f=x^2y^2$ とする。$k=2,\ell=1$ の係数行列を、行を $(\partial_x^2,x),(\partial_x^2,y),(\partial_x\partial_y,x),(\partial_x\partial_y,y),(\partial_y^2,x),(\partial_y^2,y)$、列を $x^3,x^2y,xy^2,y^3$ の順に作り、階数を求めよ。

- Level: B
- ID: ACOMP19-B1

<!-- solution-start -->
**詳細解答**

[形式偏微分](../ACOMP14/index.md#def-acomp14-formal-partial)で一次偏微分は $2xy^2,2x^2y$ です。二次偏微分は

$$
\begin{aligned}
\partial_x^2 f&=\partial_x(2xy^2)=2y^2,\\
\partial_x\partial_y f&=\partial_x(2x^2y)=4xy,\\
\partial_y^2 f&=\partial_y(2x^2y)=2x^2.
\end{aligned}
$$

です。[係数行列による次元計算](#thm-acomp19-coefficient-rank)に従い、それぞれに $x,y$ を掛けると行順に $2xy^2,2y^3,4x^2y,4xy^2,2x^3,2x^2y$ となるので、指定された列順で係数を並べます。

$$
M=\begin{pmatrix}
0&0&2&0\\
0&0&0&2\\
0&4&0&0\\
0&0&4&0\\
2&0&0&0\\
0&2&0&0
\end{pmatrix}.
$$

第4行から第1行の2倍、第6行から第3行の半分を引くと二つの零行になります。有理数体では2が非零なので半分を取れます。いずれも逆の加算で元に戻せる行操作であり、行空間を保ちます。残る第1,2,3,5行は異なる列に非零成分を持つので独立です。従って $\Gamma_{2,1}=4$ です。
<!-- solution-end -->

### B2. 積の上界と実際の次元

任意の体上で $P=xyzw$ を二つの二次因子の積と見なす。$k=\ell=1$ の積の上界と実際の次元を比較せよ。

- Level: B
- ID: ACOMP19-B2

<!-- solution-start -->
**詳細解答**

[等次数因子の積の上界](#lem-acomp19-product-bound)で $n=4,m=q=2,k=\ell=1$ とすると、内側の次数は2なので $2N(4,2)=2\binom52=20$ です。

各微分は四変数から一つを除いた積です。除いた変数をシフトで掛け戻す場合は、四通りすべて $xyzw$ になります。それ以外は、除かれた変数1個と二乗される変数1個を指定すれば単項式が一意に定まります。前者の選択4通りごとに後者3通りで12個です。

係数はすべて1で異なる単項式は独立です。[シフト付き偏微分空間](#def-acomp19-shifted-space)の次元は $1+12=13$ で、上界20より小さいことが分かります。
<!-- solution-end -->

### B3. 打消しと次元

有理数体上で $f=x^2+y^2$、$g=-y^2+z^2$ とする。3変数で $k=1,\ell=0$ として、各次元と和の次元を求め、劣加法性が狭義になる理由を説明せよ。

- Level: B
- ID: ACOMP19-B3

<!-- solution-start -->
**詳細解答**

$f$ の微分は $2x,2y,0$、$g$ の微分は $0,-2y,2z$ なので、それぞれの空間は $Kx+Ky$ と $Ky+Kz$、次元は2です。

空間の和は $Kx+Ky+Kz$ で次元3です。多項式の和は $x^2+z^2$ なので微分は $2x,0,2z$、次元2です。[劣加法性](#prop-acomp19-subadditivity)の証明の二つの上界は、この例では $2\le3\le4$ と両方とも狭義です。空間には共通方向 $y$ があり、さらに多項式の和ではその方向の微分が打ち消されています。
<!-- solution-end -->

### C1. 項数下界を構成する

有理数体上の $F_n=\sum_{i=1}^n x_i^4$（$n\ge1$）を、四つの斉次一次式の積の和として表すとき、$k=1,\ell=2$ のシフト付き偏微分次元を求め、項数下界を導け。$n=9$ の値を求め、$k=1,\ell=0$ での下界と比較せよ。さらに $n=9$ で二つの斉次二次式の積の和にモデルを変更し、二つのシフト次数による下界を比較せよ。

- Level: C
- ID: ACOMP19-C1

<!-- solution-start -->
**詳細解答**

一次偏微分は $4x_i^3$ です。次数2の各単項式 $x^\beta$ を掛けた生成元は $4x_i^3x^\beta$（$|\beta|=2$）です。

固定した $i$ では $\beta$ が異なれば単項式が異なります。異なる $i$ どうしでも、生成元の全次数は5であり、指数が3以上の変数は高々一つです（二つあれば全次数は6以上）。従って単項式から $i$ が一意に復元され、その指数から3を引けば $\beta$ が復元されます。

すべての生成元は異なる単項式の非零定数倍なので独立です。[シフト付き偏微分空間](#def-acomp19-shifted-space)の次元は

$$
\Gamma_{1,2}(F_n)=nN(n,2)=n\binom{n+1}{2}.
$$

[積の和の項数下界](#thm-acomp19-top-fanin)で $m=4,q=1,k=1,\ell=2$ とすると分母は

$$
\binom41 N(n,1(1-1)+2)=4\binom{n+1}{2}.
$$

従って $t\ge\lceil n/4\rceil$ です。$n=9$ では次元 $9\cdot45=405$、分母 $4\cdot45=180$ なので下界3です。

$\ell=0$ なら独立な微分は $4x_i^3$ の $n$ 個、分母は $4N(n,0)=4$ で、下界は同じ $\lceil n/4\rceil$ になります。シフトによって次元は大きくなりましたが、一項の上界も同じ倍率で増えました。この一次因子モデルではシフトで項数下界は改善しません。

二次因子モデルでは $m=2,q=2,k=1$ となります。$n=9,\ell=0$ の分母は $2N(9,1)=18$、分子は9なので、下界は $\lceil9/18\rceil=1$ です。

一方 $\ell=2$ の分母は $2N(9,3)=2\binom{11}{3}=330$ です。対象多項式は変えていないため分子は先ほど求めた405です。従って

$$
t\ge\left\lceil\frac{405}{330}\right\rceil=2.
$$

二次因子モデルではシフトを使うことで、一つの積では表せないことまで示せました。因子の次数とシフトの次数を合わせて選ぶことが下界の強さに関係します。
<!-- solution-end -->

## 7. 参考文献

- A. Shpilka and A. Yehudayoff, *Arithmetic Circuits: A Survey of Recent Results and Open Questions*, Foundations and Trends in Theoretical Computer Science, 2010. [DOI](https://doi.org/10.1561/0400000039)
- [Algebraic Complexity Theory 講義資料（IISc）](https://www.csa.iisc.ac.in/~chandan/courses/act25/home.html)
