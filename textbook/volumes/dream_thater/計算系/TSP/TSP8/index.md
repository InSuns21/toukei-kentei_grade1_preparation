# TSP8 境界階数・Segre写像とsecant：退化の具体計算

前講の[テンソル階数と双線形複雑性の一致](../TSP7/index.md#thm-tsp7-rank-complexity)は、正確な双線形計算に必要な積の数を与えました。ところが、階数2のテンソルをいくら近づけても、その極限の階数まで2とは限りません。近似に必要な積の数を幾何学的に記録してみましょう。

本講では体を複素数体 $\mathbb C$ に固定し、各因子 $V_a$ は正の有限次元、因子数 $d\ge2$ とします。$E=\bigotimes_{a=1}^d V_a$ と置きます。

## 1. 階数の集合に境界を加える

[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank)を $R(t)$ と書き、$S_r=\{t\in E:R(t)\le r\}$ とします。$r$ は非負整数で、$S_0=\{0\}$ です。基底を固定すれば $E$ は複素係数の配列全体です。

普通の座標ごとの収束に対し、代数幾何学では多項式の零点条件を使います。[Zariski 位相](../../../代数系/AG/AG1-01/index.md#def-ag1-01-zariski-topology)の閉集合は多項式の共通零点集合です。集合 $S$ の Zariski 閉包 $\overline S^{Z}$ は $S$ を含む最小の閉集合、つまり $S$ 上で零になる全多項式の共通零点集合です。多項式は座標の連続関数なので、$S$ 内の座標収束列の極限は必ずこの閉包に入ります。

<a id="def-tsp8-border-rank"></a>

<!-- formal-statement-start -->
> **定義（境界階数）**
>
> 複素数体上の正の有限次元空間 $V_1,\ldots,V_d$（$d\ge2$）のテンソル積を $E$ とし、$t\in E$ を取る。境界階数（border rank）を
>
$$
\underline R(t)=\min\{r\in\mathbb Z_{\ge0}:t\in\overline{S_r}^{Z}\},
\qquad S_r=\{s\in E:R(s)\le r\}
$$
>
> とする。閉包は $E$ の Zariski 位相に関するものとする。
<!-- formal-statement-end -->

最小値は $t\in S_{R(t)}$ から存在し、$\underline R(t)\le R(t)$ です。基底を替える操作と逆操作は共に線形なので、多項式の零点条件を互いに移し、定義は基底によらず成立します。

<!-- definition-example-start: def-tsp8-border-rank -->
**定義の確認**。非零の単純テンソル $u\otimes v$ は $S_1$ に入り、従ってその閉包にも入ります。一方、$S_0$ は全座標を零にする閉集合ですから、その閉包には入りません。境界階数は1です。零テンソルは $S_0$ に入るので0です。
<!-- definition-example-end -->

ここでの閉包は代数的なものです。実数体上の近似や、任意の体上での形式的な退化と混同しないようにしましょう。本講の上界には具体的な複素パラメータ族を用いるので、一般の複素構成可能集合についての二種類の閉包の一致定理は必要ありません。

## 2. 平坦化で境界にも残る条件を作る

行列の階数が $r$ 以下である条件は、全ての $(r+1)\times(r+1)$ 小行列式が零であることです。階数が $r$ 以下なら任意の $r+1$ 列が従属します。逆に階数が $r+1$ 以上なら独立な $r+1$ 列を選べ、その列から成る行列の行階数も $r+1$ 以上なので、独立な $r+1$ 行を選ぶと非零の小行列式を得ます。$r$ が行数または列数以上の場合には条件は空です。

[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)とこの条件を組み合わせると、極限を取っても消えない下界が得られます。

<a id="thm-tsp8-border-flattening"></a>

<!-- formal-statement-start -->
> **定理（平坦化による境界階数下界）**
>
> 複素数体上の有限次元テンソル $t$ と、因子位置の任意の非空な二分割 $I,J$ に対し、その平坦化行列を $F_{I,J}(t)$ とする。このとき
>
$$
\operatorname{rank}F_{I,J}(t)\le\underline R(t)\le R(t).
$$
<!-- formal-statement-end -->

### 証明の見取り図

階数の上限制約を、平坦化の小行列式という多項式の零点条件へ移します。

<!-- proof-start -->
### 証明

$r=\underline R(t)$ と置きます。任意の $s\in S_r$ に対して[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)から $\operatorname{rank}F_{I,J}(s)\le r$ です。

従って任意に $r+1$ 行、$r+1$ 列を選んだ小行列式 $p(s)$ は零になります。平坦化は座標の並べ替えであり、行列式は成分の多項式ですから $p$ は $E$ 上の多項式です。$t$ は $S_r$ の Zariski 閉包に入るので $p(t)=0$ です。全てのそのような小行列式に対して成立するため、先ほどの行列階数の判定から左側の不等式が従います。右側は[境界階数の定義](#def-tsp8-border-rank)によります。
<!-- proof-end -->

二因子の場合には[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank)があるため、両端が等しくなります。すなわち二因子では近似を許しても階数は下がりません。

## 3. 三因子で階数が跳ぶ具体例

各因子を2次元とし、基底を $e_1,e_2$、$f_1,f_2$、$g_1,g_2$ とします。第2講の階数3の例をもう一度使います。

$$
w=e_2\otimes f_1\otimes g_1+
e_1\otimes f_2\otimes g_1+
e_1\otimes f_1\otimes g_2.
$$

二つの単純テンソルの差をパラメータ $\varepsilon$ で割り、一次の成分だけを取り出せば、この三項が同時に現れます。

<a id="thm-tsp8-w-border-rank"></a>

<!-- formal-statement-start -->
> **定理（三因子の階数と境界階数が異なる例）**
>
> 複素数体上の三つの2次元空間の基底をそれぞれ $(e_1,e_2),(f_1,f_2),(g_1,g_2)$ とする。テンソル
>
$$
w=e_2\otimes f_1\otimes g_1+
e_1\otimes f_2\otimes g_1+
e_1\otimes f_1\otimes g_2
$$
>
> は $R(w)=3$、$\underline R(w)=2$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

三つの因子を同時に少し動かし、動かす前の積との差を取ります。二項の差の一次係数が $w$ になります。下界は平坦化で確定します。

<!-- proof-start -->
### 証明

通常の階数は[三因子の階数3の例](../TSP2/index.md#thm-tsp2-three-factor-rank)から3です。$\varepsilon\ne0$ に対して

$$
P(\varepsilon)=(e_1+\varepsilon e_2)
\otimes(f_1+\varepsilon f_2)
\otimes(g_1+\varepsilon g_2)
$$

と置きます。各因子は非零で、$P(0)$ も単純テンソルです。従って

$$
q(\varepsilon)=\frac{P(\varepsilon)-P(0)}{\varepsilon}
$$

は二項の単純テンソルの和（スカラー係数を一因子に吸収）であり、$R(q(\varepsilon))\le2$ です。多重線形性で展開すると

$$
P(\varepsilon)=P(0)+\varepsilon w+
\varepsilon^2 h+\varepsilon^3 k,
$$

ただし

$$
h=e_2\otimes f_2\otimes g_1+
e_2\otimes f_1\otimes g_2+
e_1\otimes f_2\otimes g_2,\qquad
k=e_2\otimes f_2\otimes g_2.
$$

よって $q(\varepsilon)=w+\varepsilon h+\varepsilon^2 k$ となり、各座標で $q(\varepsilon)\to w$ です。$S_2$ 上で零となる任意の多項式はこの極限でも零となるため $w\in\overline{S_2}^{Z}$、従って $\underline R(w)\le2$ です。

下界を求めるため、第1添字を行、後二つの添字を $(1,1),(1,2),(2,1),(2,2)$ の順の列に並べます。

$$
F_{\{1\},\{2,3\}}(w)=
\begin{pmatrix}0&1&1&0\\1&0&0&0\end{pmatrix}.
$$

第1列と第2列からなる小行列式は $-1$ なので階数2です。[平坦化による境界階数下界](#thm-tsp8-border-flattening)より $\underline R(w)\ge2$。両方向から $\underline R(w)=2$ です。
<!-- proof-end -->

これは $S_2$ が座標収束についても Zariski 位相についても閉じていない反例です。差を取る前の二項の係数は $1/\varepsilon$ と $-1/\varepsilon$ であり、個々の項には有限の極限がありません。従って「各項の極限を取れば二項分解になる」という議論は使えません。

## 4. Segre写像と割線多様体

非零ベクトル $v$ の張る一次元部分空間を $[v]$ と書きます（[射影空間と斉次座標](../../../代数系/AG/AG2-01/index.md#def-ag2-01-projective-space)）。積の各因子の長さを忘れて方向だけを記録すると、階数1のテンソルが作る射影的な図形になります。

[Segre写像](../../../代数系/AG/AG2-03/index.md#def-ag2-03-segre)の二因子の場合を多因子へ拡張し、

$$
\sigma:\prod_{a=1}^d\mathbb P(V_a)\longrightarrow\mathbb P(E),
\qquad ([v_1],\ldots,[v_d])\longmapsto
[v_1\otimes\cdots\otimes v_d]
$$

とします。各 $v_a$ を非零スカラー $\lambda_a$ 倍すると積全体は $\prod_a\lambda_a$ 倍になるので射影点は変わりません。また各 $v_a$ に少なくとも一つ非零座標があり、その組の積も非零です。従って写像は全点で定義されます。像を $X$ とします。

例えば三因子で $v_1=e_1+2e_2$、$v_2=f_1+3f_2$、$v_3=g_1$ なら、非零座標は $111,121,211,221$ の順に $1,3,2,6$ です。射影点はこれらを同時に非零倍しても同じです。

$X$ の $r$ 個以下の点の代表ベクトルを線形結合すると、$r$ 項以下の単純テンソルの和になります。二点の場合、この線形結合が描く射影直線が割線です。先の反例を含めるため、そのような点全体の閉包を取ります。射影空間での閉包は[射影零点集合](../../../代数系/AG/AG2-01/index.md#def-ag2-01-projective-zero-set)を使って、集合上で零となる斉次式の共通零点を取る操作です。

<a id="def-tsp8-secant-variety"></a>

<!-- formal-statement-start -->
> **定義（割線多様体）**
>
> 複素数体上の有限次元空間 $E$ の射影空間に含まれる非空集合 $X$ と正整数 $r$ を取る。$X$ の高々 $r$ 個の点の射影線形包の和集合を $L_r(X)$ とし、
>
$$
\sigma_r(X)=\overline{L_r(X)}^{Z}
$$
>
> を第 $r$ 割線多様体（secant variety）とする。射影線形包とは、点の非零代表ベクトルの線形包から零を除き、射影点にした集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp8-secant-variety -->
**定義の確認**。$X$ を $\mathbb P(\mathbb C^2\otimes\mathbb C^2)$ の Segre 像とします。$[e_1\otimes f_1]$、$[e_2\otimes f_2]$ は共に $X$ に属します。これらの代表元は一次独立なので、その射影線形包は直線です。$[e_1\otimes f_1+2e_2\otimes f_2]$ は係数1と2の線形結合であり、$L_2(X)$ に入ります。従って $\sigma_2(X)$ にも入ります。この点の係数行列は対角成分1と2を持ち、行列式2は非零なので、[Segre写像の像と二次小行列式](../../../代数系/AG/AG2-03/index.md#thm-ag2-03-segre-minors)から $X$ 自身には属しません。
<!-- definition-example-end -->

<a id="thm-tsp8-secant-border-rank"></a>

<!-- formal-statement-start -->
> **定理（Segre像の割線多様体と境界階数）**
>
> 複素数体上の正の有限次元空間 $V_1,\ldots,V_d$（$d\ge2$）のテンソル積を $E$、多因子Segre写像の像を $X$ とする。非零 $t\in E$ と正整数 $r$ に対し
>
$$
[t]\in\sigma_r(X)\quad\Longleftrightarrow\quad
\underline R(t)\le r.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず閉包を取る前に、射影線形包と階数の和の表示を対応させます。次に、スカラー倍で閉じた集合では消える多項式の斉次成分も一つずつ消えることを使います。

<!-- proof-start -->
### 証明

$[s]\in L_r(X)$ なら $s$ は高々 $r$ 個の非零単純テンソルの代表元の線形結合です。係数を第1因子に吸収すれば $s\in S_r$ です。逆に非零 $s\in S_r$ を単純テンソルの和に書けば各非零項の射影点が $X$ に属するので $[s]\in L_r(X)$ です。

ここで $S_r$ は非零スカラー倍で不変であり、零も含みます。$S_r$ 上で消える任意の多項式 $p$ を、全次数ごとの[斉次多項式](../../../代数系/AG/AG2-01/index.md#def-ag2-01-homogeneous-polynomial)の和 $p=\sum_{j=0}^m p_j$ に分けます。任意の $s\in S_r$ と $\lambda\in\mathbb C$ に対して

$$
0=p(\lambda s)=\sum_{j=0}^m\lambda^j p_j(s).
$$

一変数多項式が無限個の点で零なら零多項式なので、全ての $p_j(s)$ が零です。従って各 $p_j$ も $S_r$ 上で零になります。逆に各斉次成分が零ならその和も零です。

また $r\ge1$ なので $S_r$ には非零元があり、$L_r(X)$ 上で消える斉次式は $S_r$ 全体で消えます。正次数なら原点でも零、次数0なら定数が零であるためです。

よって非零 $t$ について、$S_r$ 上で消える全多項式が $t$ 上で消えることと、$L_r(X)$ 上で消える全斉次式が $[t]$ 上で消えることは同値です。前者は $t\in\overline{S_r}^{Z}$、後者は $[t]\in\sigma_r(X)$ です。$S_q\subset S_r$（$q\le r$）であることと[境界階数の定義](#def-tsp8-border-rank)から結論を得ます。
<!-- proof-end -->

第3節の $q(\varepsilon)$ は、$[P(\varepsilon)]$ と $[P(0)]$ を結ぶ割線上の点を与えます。$\varepsilon\ne0$ ならこれらは異なる点です。例えば $211$ 座標は前者で非零、後者で零です。$q(\varepsilon)$ の $211$ 座標は常に1なので、この座標で代表元を規格化したまま極限 $[w]$ を取れます。$[w]$ は $\sigma_2(X)$ に入りますが $L_2(X)$ には入りません。幾何学的に割線の極限方向を取り込むことが、階数の低い族の境界を加えることに対応します。

## 5. 次の講義で使う多項式パラメータによる退化

具体的な近似を反復利用するには、誤差の次数まで記録するのが有効です。パラメータ $\varepsilon$ の多項式係数を持つ単純テンソルの和から、ある次数の係数として目標テンソルを取り出します。

<a id="prop-tsp8-polynomial-degeneration"></a>

<!-- formal-statement-start -->
> **命題（多項式パラメータによる境界階数上界）**
>
> 複素数体上の正の有限次元空間 $V_a$（$1\le a\le d$、$d\ge2$）と $t\in E=\bigotimes_a V_a$ を取る。各 $v_{as}(\varepsilon)$ は $V_a$ に値を取る座標多項式とする。非負整数 $m,r,L$ と $h_j\in E$ に対して
>
$$
\sum_{s=1}^r\bigotimes_{a=1}^d v_{as}(\varepsilon)
=\varepsilon^m t+\sum_{j=1}^L\varepsilon^{m+j}h_j
$$
>
> が多項式として成立するなら $\underline R(t)\le r$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varepsilon\ne0$ なら左辺を $\varepsilon^m$ で割ったテンソルは、各項の第1因子を $\varepsilon^{-m}$ 倍することで、高々 $r$ 項の分解を持ちます。零の項は捨てられます。右辺を割ると $t+\sum_{j=1}^L\varepsilon^j h_j$ となり、$\varepsilon\to0$ の極限は $t$ です。第1節の多項式の連続性から $t\in\overline{S_r}^{Z}$ が従います。
<!-- proof-end -->

第3節では $P(\varepsilon)-P(0)$ に対し $r=2,m=1,L=2$ です。負号は第1因子に入れれば、仮定通り全ての因子が多項式です。次の講義では、このような近似を何度も掛けたとき、係数の回収に必要な費用を調べます。

## 6. 演習

### Level A

<a id="ex-tsp8-a01"></a>

#### TSP8-A01 行列では階数が下がらない

$e_1\otimes f_1+2e_2\otimes f_2$ の境界階数を求めよ。各因子は $\mathbb C^2$ とする。

<!-- solution-start -->
##### 詳細解答

二項分解から通常の階数は高々2です。平坦化は係数行列そのものであり $\operatorname{diag}(1,2)$ です。行列式は2なので階数は2。[平坦化による境界階数下界](#thm-tsp8-border-flattening)から境界階数は2以上です。両端から通常の階数も境界階数も2です。
<!-- solution-end -->

<a id="ex-tsp8-a02"></a>

#### TSP8-A02 Segre座標

$(e_1+2e_2)\otimes(f_1-f_2)\otimes(g_1+g_2)$ の8座標を辞書式順序で求めよ。

<!-- solution-start -->
##### 詳細解答

第1因子の座標は $(1,2)$、第2因子は $(1,-1)$、第3因子は $(1,1)$ です。[多因子テンソルの基底展開](../TSP1/index.md#thm-tsp1-multifactor-basis)により各座標は三つの対応成分の積です。最初の四つは $1,1,-1,-1$、残りは第1因子の成分が2なので $2,2,-2,-2$ です。従って射影点は $[1:1:-1:-1:2:2:-2:-2]$ です。
<!-- solution-end -->

<a id="ex-tsp8-a03"></a>

#### TSP8-A03 差の一次係数

第3節の $P(\varepsilon)$ について $q(\varepsilon)$ の $221$、$222$、$211$ 座標を求め、極限を調べよ。

<!-- solution-start -->
##### 詳細解答

$221$ は第1、第2因子だけから $\varepsilon$ が現れるため $P(\varepsilon)$ では $\varepsilon^2$、$222$ は $\varepsilon^3$、$211$ は $\varepsilon$ です。いずれも $P(0)$ の対応座標は零です。$\varepsilon$ で割って順に $\varepsilon,\varepsilon^2,1$ となり、極限は $0,0,1$ です。これらは $w$ の対応する成分と一致します。
<!-- solution-end -->

<a id="ex-tsp8-a04"></a>

#### TSP8-A04 射影点と線形結合

二つの基底単純テンソル $e_1\otimes f_1,e_2\otimes f_2$ の射影線形包に $[e_1\otimes f_1-e_2\otimes f_2]$ が入るか。第1割線多様体にも入るか。

<!-- solution-start -->
##### 詳細解答

係数1と $-1$ の線形結合なので射影線形包に入り、[割線多様体](#def-tsp8-secant-variety)の定義から第2割線多様体に入ります。一方、係数行列は $\operatorname{diag}(1,-1)$ で行列式 $-1\ne0$ です。全ての階数1以下の行列で行列式は零となるため、その Zariski 閉包でも零です。従ってこの点は第1割線多様体に入りません。
<!-- solution-end -->

### Level B

<a id="ex-tsp8-b01"></a>

#### TSP8-B01 重み付きの退化

$w'=2e_2\otimes f_1\otimes g_1-3e_1\otimes f_2\otimes g_1+5e_1\otimes f_1\otimes g_2$ の境界階数を求めよ。

<!-- solution-start -->
##### 詳細解答

$P'(\varepsilon)=(e_1+2\varepsilon e_2)\otimes(f_1-3\varepsilon f_2)\otimes(g_1+5\varepsilon g_2)$ と置きます。定数項は $e_1\otimes f_1\otimes g_1$、一次係数は $w'$ です。二次係数は

$$
-6e_2\otimes f_2\otimes g_1+
10e_2\otimes f_1\otimes g_2-
15e_1\otimes f_2\otimes g_2
$$

で、三次係数は $-30e_2\otimes f_2\otimes g_2$ です。$P'(\varepsilon)-P'(0)$ に[多項式パラメータによる境界階数上界](#prop-tsp8-polynomial-degeneration)を $r=2,m=1$ で適用して上界2です。

第1因子を行にする平坦化は

$$
\begin{pmatrix}0&5&-3&0\\2&0&0&0\end{pmatrix}.
$$

最初の二列の小行列式は $-10$ で非零です。[平坦化による境界階数下界](#thm-tsp8-border-flattening)から下界2も得られます。
<!-- solution-end -->

<a id="ex-tsp8-b02"></a>

#### TSP8-B02 退化できない候補

各因子を $\mathbb C^3$ とし、$D=\sum_{i=1}^3 e_i\otimes f_i\otimes g_i$ とする。境界階数2以下の族で $D$ を近似できるか。

<!-- solution-start -->
##### 詳細解答

第1因子を行にする $3\times9$ 平坦化を考えます。列 $(1,1),(2,2),(3,3)$ を抜き出すと、各項の係数が1で他が零なので単位行列 $I_3$ になります。行列式は1です。この小行列式は階数2以下のテンソルでは零となる多項式なので、境界階数2以下でも零になります。$D$ では零でないため不可能です。[平坦化による境界階数下界](#thm-tsp8-border-flattening)から $\underline R(D)\ge3$、三項分解から $\underline R(D)\le3$ なので境界階数は3です。
<!-- solution-end -->

<a id="ex-tsp8-b03"></a>

#### TSP8-B03 斉次成分を分離する理由

スカラー倍で閉じた集合 $S\subset\mathbb C^N$ 上で $p=p_0+p_1+p_2$ が零とする。各 $p_j$ は次数 $j$ の斉次多項式である。$p_j$ がそれぞれ $S$ 上で零になることを $\lambda=0,1,-1$ を使って確かめよ。

<!-- solution-start -->
##### 詳細解答

任意の $s\in S$ について $0=p(0s)=p_0(s)$ です。$s,-s$ も $S$ に属するので

$$
0=p(s)=p_1(s)+p_2(s),
\qquad
0=p(-s)=-p_1(s)+p_2(s).
$$

足すと $2p_2(s)=0$、引くと $2p_1(s)=0$ となります。複素数体では2が可逆なので両方零です。任意の $s$ で成立します。これは[Segre像の割線多様体と境界階数](#thm-tsp8-secant-border-rank)の証明で行った係数分離の低次数版です。
<!-- solution-end -->

### Level C

<a id="ex-tsp8-c01"></a>

#### TSP8-C01 退化を二回掛ける

第3節の $P(\varepsilon)-P(0)=\varepsilon w+\varepsilon^2h+\varepsilon^3k$ を使い、同じ三因子の位置ごとに組にする Kronecker 積 $w\boxtimes w$ の境界階数が4であることを証明せよ。

<!-- solution-start -->
##### 詳細解答

[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker)は各因子を同じ位置で組にし、単純テンソル同士の積を単純テンソルに移します。$A(\varepsilon)=P(\varepsilon)-P(0)$ と置くと

$$
A(\varepsilon)\boxtimes A(\varepsilon)=
P(\varepsilon)\boxtimes P(\varepsilon)
-P(\varepsilon)\boxtimes P(0)
-P(0)\boxtimes P(\varepsilon)
+P(0)\boxtimes P(0).
$$

これは多項式因子を持つ四項です。一方、次数ごとに展開すると

$$
A(\varepsilon)\boxtimes A(\varepsilon)
=\varepsilon^2(w\boxtimes w)+\varepsilon^3(w\boxtimes h+h\boxtimes w)
+\varepsilon^4(w\boxtimes k+h\boxtimes h+k\boxtimes w)
+\varepsilon^5(h\boxtimes k+k\boxtimes h)+\varepsilon^6(k\boxtimes k).
$$

[多項式パラメータによる境界階数上界](#prop-tsp8-polynomial-degeneration)を $r=4,m=2,L=4$ で適用して上界4です。

下界には第1因子を行にする平坦化を使います。元の $w$ の平坦化を $M$ とすると、組にしたテンソルの行列成分は $M_{i,(j,k)}M_{i',(j',k')}$ です。行は $(i,i')$、列は $((j,j'),(k,k'))$ に対応します。列の組を付け替え、$M$ の最初の二列 $(1,1),(1,2)$ から作った四つの組を選びます。元の二列は順に $(0,1)^{\mathsf T},(1,0)^{\mathsf T}$ なので、それらの全四組の積は、4次元の標準基底を順番を逆にして並べた列です。従って4列は独立で、平坦化の階数は4です。[平坦化による境界階数下界](#thm-tsp8-border-flattening)から下界4も成立し、$\underline R(w\boxtimes w)=4$ です。
<!-- solution-end -->

## 7. 次に進む

普通の階数は正確な計算の費用、境界階数はその低階数集合の代数的な閉包で測った費用です。今回の多項式退化は積を反復すると低い次数の係数に目標テンソルを埋め込めます。次講ではテンソルの冪の階数・劣階数から、反復計算一回当たりの成長率を定めます。

参考文献：J. M. Landsberg, [Tensors: Geometry and Applications](https://doi.org/10.1090/gsm/128)。

## 前提講座

- [TSP7 行列積テンソルと双線形複雑性](../TSP7/index.md)
- [AG2-03 射影射・Veronese写像・Segre写像](../../../代数系/AG/AG2-03/index.md)
