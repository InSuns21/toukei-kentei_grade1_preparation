# ACOMP23 GCTへの入口：Zariski軌道閉包・determinantal complexity・表現論の役割

前講では、[形式的退化から Zariski 閉包への含意](../ACOMP22/index.md#thm-acomp22-degeneration-closure)により、回路の出力に共通する係数方程式が退化後も成り立つことを学びました。今回は計算モデルを行列式に絞ります。計算可能な多項式を一つの変数変換の集合として表せるため、代数幾何と表現論を下界の問題へ結び付けられます。

以下では複素数体上で考えます。[座標環と多項式関数](../../../代数系/AG/AG1-03/index.md#prop-ag1-03-evaluation) も既習とします。GCT（geometric complexity theory、幾何学的計算複雑性理論）の入口として、行列式の大きさ、閉包による下界、対称性を利用した方程式の探索を順に扱います。

## 1. 行列式で計算するための最小の行列

[多変数多項式環](../../../代数系/AG/AG1-01/index.md#def-ag1-01-multivariate-polynomial) の元を、[行列式の Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) の有限和によって計算します。例えば $xy+1$ は二次多項式ですが、次のように二行二列の行列の行列式で計算できます。

$$
xy+1=\det\begin{pmatrix}x&-1\\1&y\end{pmatrix}.
$$

各成分は変数の一次結合に定数を加えた式（アフィン一次式）です。行列の大きさを資源として測ることで、算術回路一般とは別の計算モデルが得られます。

<a id="def-acomp23-dc"></a>

<!-- formal-statement-start -->
> **定義（行列式複雑性）**
>
> $f\in\mathbb C[x_1,\ldots,x_r]$ に対し、行列式複雑性 $\mathrm{dc}(f)$ は、次の表示が可能な最小の正整数 $m$ とする。ここで $A_0,\ldots,A_r$ は複素 $m$ 次正方行列である。

$$
f(x)=\det\left(A_0+\sum_{i=1}^r x_i A_i\right).
$$

> 表示がなければ値を無限大とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp23-dc -->
**定義の確認**：$xy+1$ では上の行列について

$$
A_0=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\quad
A_1=\begin{pmatrix}1&0\\0&0\end{pmatrix},\quad
A_2=\begin{pmatrix}0&0\\0&1\end{pmatrix}
$$

と置けます。ここで $x_1=x,x_2=y$ です。係数行列を成分ごとに足すと

$$
A_0+xA_1+yA_2=\begin{pmatrix}x&-1\\1&y\end{pmatrix}.
$$

三つの係数行列はいずれも定数の二次正方行列であり、全成分はアフィン一次式です。二次行列式の展開は

$$
\det(A_0+xA_1+yA_2)=xy-(-1)\cdot1=xy+1
$$

となり、定義の表示条件を満たします。一行一列なら行列式はその唯一の成分なので全次数は高々1です。従って $\mathrm{dc}(xy+1)=2$ です。
<!-- definition-example-end -->

任意の非零多項式について、$m$ 次行列の [行列式の Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) の各項は $m$ 個のアフィン一次式の積です。各項の次数は高々 $m$ で、和を取っても次数は増えません。従って $\mathrm{dc}(f)\ge\deg f$ です。また、表示行列に単位行列を対角ブロックとして追加すれば行列式の値を変えずに任意のより大きなサイズへ移れます。

任意の多項式は有限の算術式で書けるため、[算術式から ABP への変換](../ACOMP3/index.md#thm-acomp3-formula-abp) と [ABPの行列式表示](../ACOMP13/index.md#thm-acomp13-abp-det) によって有限の行列式表示を持ちます。

## 2. 可逆な変数変換とその境界

整数 $N,m\ge1$ を固定します。次数の違う多項式を同じ空間で比べるため、すべての非零単項式の全次数が $m$ である斉次多項式（零も含める）を集めたベクトル空間を $W_{N,m}$ と書きます。変数は列ベクトル $u=(u_1,\ldots,u_N)^{\mathsf T}$ です。単項式ごとの係数がこの空間の座標です。

可逆な $N$ 次複素正方行列全体を $G=\mathrm{GL}_N(\mathbb C)$ と書きます。積と逆行列について閉じており、単位行列を持つ群です。[群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action) を変数変換で作ります。単位行列の作用は恒等写像です。多項式 $p$ への作用を $(g\cdot p)(u)=p(g^{-1}u)$ と定めます。斉次一次式を代入しても斉次次数は保たれ（零も許す）、多項式の和とスカラー倍も保たれます。逆行列を使うと、二回の作用の順序が群の積と一致します。

$$
(g\cdot(h\cdot p))(u)
=p(h^{-1}g^{-1}u)=p((gh)^{-1}u).
$$

一つの点 $p$ から可逆置換で到達できる点を集めます。さらに [Zariski 位相](../../../代数系/AG/AG1-01/index.md#def-ag1-01-zariski-topology) で、その集合を含む最小の閉集合を取ります。前講と同じく、集合 $E$ の閉包を $\overline E^{\,Z}$ と書き、$E$ 上で消えるすべての係数多項式の共通零点集合として判定します。

<a id="def-acomp23-substitution-orbit"></a>

<!-- formal-statement-start -->
> **定義（斉次多項式の線形置換軌道とZariski軌道閉包）**
>
> $p\in W_{N,m}$ に対し、[群作用の軌道](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer) を線形置換について具体化し、次の集合とする。

$$
G\cdot p=\{p(g^{-1}u):g\in\mathrm{GL}_N(\mathbb C)\}.
$$

> その Zariski軌道閉包は係数空間 $W_{N,m}$ における Zariski 閉包 $\overline{G\cdot p}^{\,Z}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp23-substitution-orbit -->
**定義の確認**：$N=2,m=1,p(u)=u_1$ とします。$B=g^{-1}$ と置くと、$p(Bu)$ は $Bu$ の第一成分、すなわち第一行 $(a,b)$ による $au_1+bu_2$ です。可逆行列の第一行は零でないので、軌道の元はすべて非零一次式です。逆に非零行 $(a,b)$ は、$a\ne0$ なら第二行 $(0,1)$ を追加すると行列式は $a\ne0$、$a=0$ なら第二行 $(1,0)$ を追加すると行列式は $-b\ne0$ です。この可逆行列を $B$ とし、$g=B^{-1}$ と取れば目的の一次式を得ます。従って軌道は非零一次式全体です。

係数空間は $\mathbb C^2$ であり、軌道上で消える任意の係数多項式 $H(a,b)$ は、$H(t,0)=0$ が全ての非零 $t$ で成立することから $H(0,0)=0$ も満たします。従って [消滅イデアル](../../../代数系/AG/AG1-01/index.md#def-ag1-01-vanishing-ideal) による閉包の零点判定により、原点も閉包に入ります。非零点は既に軌道に含まれるので、閉包は係数空間 $\mathbb C^2$ 全体です。原点は可逆置換では得られない境界点です。
<!-- definition-example-end -->

ここで行列の可逆性を外してよいと、閉包の計算は大きく簡単になります。特異な行列 $B$ に対しても、$B+tI$ の行列式は最高次項が $t^N$ なので、有限個の $t$ を除いて可逆です。

<a id="thm-acomp23-end-orbit"></a>

<!-- formal-statement-start -->
> **定理（全線形置換の像とZariski軌道閉包）**
>
> $p\in W_{N,m}$ に対し、係数空間内の次の二つの集合の Zariski 閉包は一致する。

$$
\overline{G\cdot p}^{\,Z}
=\overline{\{p(Bu):B\in\mathbb C^{N\times N}\}}^{\,Z}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

可逆変換は全線形変換に含まれます。逆の包含を閉包で示すには、特異変換にも可逆変換上の全ての方程式が成立することを示します。

<!-- proof-start -->
### 証明

$X=\overline{G\cdot p}^{\,Z}$、$S=\{p(Bu):B\in\mathbb C^{N\times N}\}$ とします。$G\cdot p\subset S$ なので $X\subset\overline S^{\,Z}$ です。

任意の $B$ と、軌道上で消える係数多項式 $H$ を取ります。ここで $H$ は $u$ の多項式ではなく、$p$ の単項式係数を変数とする多項式です。$I$ は $N$ 次単位行列、$t$ は新しい複素変数です。$p((B+tI)u)$ の各係数は $t$ の多項式なので

$$
q(t)=H(p((B+tI)u))
$$

も一変数多項式です。$\det(B+tI)$ は $t^N$ の係数が1であるため非零多項式です。従って有限個の例外を除いて $B+tI$ は可逆であり、$q(t)=0$ です。無限個の根を持つので $q$ は零多項式です。$t=0$ を代入すると $H(p(Bu))=0$ を得ます。

$H$ は任意でした。[Zariski 位相](../../../代数系/AG/AG1-01/index.md#def-ag1-01-zariski-topology) の定義によって $p(Bu)\in X$ です。これが全ての $B$ に対して成り立つので $S\subset X$ であり、$X$ は閉集合なので $\overline S^{\,Z}\subset X$ です。
<!-- proof-end -->

この定理は像そのものの等しさを述べていません。第1節のような厳密な計算は全線形置換の像に対応し、退化を許す計算はさらにその閉包に対応します。

## 3. 行列式のZariski軌道閉包に問題を移す

$m$ 次の変数行列 $U=(u_{ij})$ の行列式を $D_m=\det U$ とします。$N=m^2$ 個の独立変数の斉次次数 $m$ の多項式です。ここからは行優先で $\kappa(i,j)=(i-1)m+j$ と番号を付け、前節の列ベクトル $u$ の第 $\kappa(i,j)$ 成分を $u_{ij}$ と同一視します。$D_m(Bu)$ は列 $Bu$ をこの順に正方行列へ戻して行列式を取る記法です。以下、$f$ は $r$ 変数で次数が高々 $m$、かつ $r+1\le m^2$ とします。

変数 $z$ を新しく用意し、$x$ と $z$ を $u$ の相異なる座標として埋め込みます。[指定次数への多項式の斉次化](../ACOMP5/index.md#def-acomp5-homogenization) の操作を使い、各単項式 $c_\alpha x^\alpha$ に $z^{m-|\alpha|}$ を掛けます。ここで $\alpha=(\alpha_1,\ldots,\alpha_r)$ は非負整数の指数の組、$x^\alpha=\prod_{i=1}^r x_i^{\alpha_i}$、$|\alpha|=\sum_{i=1}^r\alpha_i$ です。この和を $f^{[m]}(x,z)$ と書きます。$z=1$ とすると元の $f$ に戻ります。例えば $xy+1$ の指定次数3への斉次化は $zxy+z^3$ です。

<a id="thm-acomp23-dc-substitution"></a>

<!-- formal-statement-start -->
> **定理（行列式表示と斉次線形置換）**
>
> $m,r\ge1$、$r+1\le m^2$、$f\in\mathbb C[x_1,\ldots,x_r]$、$\deg f\le m$（零も可）とする。$f^{[m]}$ を上記の座標に埋め込んだ斉次化とする。このとき

$$
\mathrm{dc}(f)\le m
\quad\Longleftrightarrow\quad
f^{[m]}\in\{D_m(Bu):B\in\mathbb C^{m^2\times m^2}\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

アフィン一次式の定数部分を $z$ 倍することで斉次一次式へ変えます。逆方向では $z=1$ として不要な変数を零にします。

<!-- proof-start -->
### 証明

$\mathrm{dc}(f)\le m$ なら単位行列の対角ブロックを必要に応じて足し、$f=\det(A_0+\sum_i x_iA_i)$ をサイズ $m$ で実現します。行列式の各成分を斉次化した

$$
L(x,z)=zA_0+\sum_{i=1}^r x_iA_i
$$

を考えます。$\det L$ は斉次次数 $m$ であり、$z=1$ で $f$ になります。斉次次数 $m$ の単項式の $x^\alpha$ 部分を固定すると $z$ の指数は $m-|\alpha|$ に一意に決まるので、$\det L=f^{[m]}$ です。

$L_{ij}=\sum_{k=1}^{m^2}b_{\kappa(i,j),k}u_k$ と係数を並べれば $m^2$ 行 $m^2$ 列の行列 $B=(b_{ak})$ ができます。使用しない座標の係数は0です。つまり $(Bu)_{\kappa(i,j)}=L_{ij}$ が全成分で成立します。従って $D_m(Bu)=\det L=f^{[m]}$ です。

逆にそのような $B$ が存在するとします。各成分 $(Bu)_{\kappa(i,j)}$ は $u$ の斉次一次式です。$x$ に対応する座標を残して $z=1$、他の座標を0とすれば、各成分は $x$ のアフィン一次式になります。代入は有限の和と積を保つため行列式にも適用でき、代入した $m$ 次行列の行列式は $f^{[m]}(x,1)=f(x)$ です。従って $\mathrm{dc}(f)\le m$ です。
<!-- proof-end -->

例えば $xy+1$ をサイズ2で斉次化すると

$$
xy+z^2=\det\begin{pmatrix}x&-z\\z&y\end{pmatrix}.
$$

四変数を $(x,y,z,w)$ の順に取ると、変換の行はそれぞれ $x,-z,z,y$ の係数です。具体的に

$$
B=\begin{pmatrix}
1&0&0&0\\
0&0&-1&0\\
0&0&1&0\\
0&1&0&0
\end{pmatrix},
\qquad Bu=(x,-z,z,y)^{\mathsf T}.
$$

$w$ の列が零なので特異変換ですが、[全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) により行列式のZariski軌道閉包の点です。

次に、厳密な行列式表示の集合を係数空間で閉じます。$S_{r,m}$ を $r$ 変数のアフィン一次式を成分とする $m$ 次行列の行列式全体とし、次数が高々 $m$ の係数空間で閉包を取ります。

<a id="thm-acomp23-border-dc"></a>

<!-- formal-statement-start -->
> **定理（行列式表示の閉包と行列式のZariski軌道閉包）**
>
> $m,r\ge1$、$r+1\le m^2$、$f\in\mathbb C[x_1,\ldots,x_r]$ を次数高々 $m$ の多項式（零も可）とする。$S_{r,m}$ は $m$ 次アフィン一次式行列の行列式の集合、$f^{[m]}$ は独立な追加変数 $z$ を用いた次数 $m$ への斉次化とする。閉包をそれぞれ次数高々 $m$ の係数空間と $W_{m^2,m}$ で取ると、次が成り立つ。

$$
f\in\overline{S_{r,m}}^{\,Z}
\quad\Longleftrightarrow\quad
f^{[m]}\in\overline{G\cdot D_m}^{\,Z},
\qquad G=\mathrm{GL}_{m^2}(\mathbb C).
$$
<!-- formal-statement-end -->

### 証明の見取り図

斉次化と $z=1$ の代入はどちらも係数の線形写像です。[正則写像のZariski連続性](../../../代数系/AG/AG1-03/index.md#prop-ag1-03-continuity) を係数の線形写像に適用できるので、両方向に閉包の包含を運べます。

<!-- proof-start -->
### 証明

係数の線形写像 $T$ に対し、閉集合を定める係数多項式 $H$ と $T$ の合成も多項式です。従って $T$ は Zariski 連続です。任意の集合 $E$ について $T^{-1}(\overline{T(E)}^{\,Z})$ は $E$ を含む閉集合なので

$$
T(\overline E^{\,Z})\subset\overline{T(E)}^{\,Z}
$$

となります。

斉次化の線形写像を $J$、$z=1$、余分な変数を0とする代入の線形写像を $R$ とします。$R(J(f))=f$ です。$S=\{D_m(Bu):B\in\mathbb C^{m^2\times m^2}\}$ と置きます。[行列式表示と斉次線形置換](#thm-acomp23-dc-substitution) の順方向から $J(S_{r,m})\subset S$ です。また任意の $B$ に $R$ を適用すれば $m$ 次のアフィン一次式行列の行列式になるので $R(S)\subset S_{r,m}$ です。

$f\in\overline{S_{r,m}}^{\,Z}$ なら、連続性より $J(f)\in\overline S^{\,Z}$ です。逆に $J(f)\in\overline S^{\,Z}$ なら $R(J(f))\in\overline{S_{r,m}}^{\,Z}$ です。[全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) により $\overline S^{\,Z}=\overline{G\cdot D_m}^{\,Z}$ となるので結論を得ます。
<!-- proof-end -->

この結果と [前講の形式的退化から閉包への含意](../ACOMP22/index.md#thm-acomp22-degeneration-closure) を合わせれば、アフィン一次式行列の係数を Laurent 級数に拡張しても、出力の全係数が正則で特殊化が $f$ なら $f^{[m]}$ は行列式のZariski軌道閉包に入ります。逆方向も、[前講の代数閉体上の border complexity と閉包](../ACOMP22/index.md#thm-acomp22-border-closure) の直前で引用した多項式写像の近似解定理を、アフィン一次式行列の全係数をパラメータとする行列式の係数写像に適用すれば成立します。パラメータ数は $(r+1)m^2$ で、各出力係数は行列式展開による多項式です。

## 4. パーマネントを分離するという目標

$n$ 次の [パーマネント](../../GCT/GCT3/index.md#def-gct3-permanent) を $P_n$ とします。行列式と違い、各置換項の符号が全て正です。$m>n\ge1$ とすれば $n^2+1\le m^2$ なので、追加変数 $z$ を確保できます。$P_n$ の指定次数 $m$ への斉次化は $z^{m-n}P_n$ です。これを次数合わせ（padding）したパーマネントと呼びます。

$$
X_m=\overline{G\cdot D_m}^{\,Z},\qquad
Y_{m,n}=\overline{G\cdot(z^{m-n}P_n)}^{\,Z}.
$$

どちらも同じ係数空間 $W_{m^2,m}$ の閉集合です。可逆な線形置換は係数の線形同型なので、閉集合を閉集合へ移します。各軌道は置換で不変であり、その閉包も不変です。従って $z^{m-n}P_n\in X_m$ なら、その全軌道と閉包も $X_m$ に含まれます。逆向きは元の点が $Y_{m,n}$ に入ることから従います。

よって [行列式表示と斉次線形置換](#thm-acomp23-dc-substitution) と [全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) により

$$
\mathrm{dc}(P_n)\le m
\ \Longrightarrow\ 
Y_{m,n}\subseteq X_m.
$$

逆向きは厳密表示ではなく、[行列式表示の閉包と行列式のZariski軌道閉包](#thm-acomp23-border-dc) に対応します。従って包含を否定できれば、厳密な表示だけでなく退化によるサイズ $m$ の表示も排除できます。

任意の正整数 $c$ に対して無限個の $n$ で $m=n^{c+1}$ における包含を否定できれば、$\mathrm{dc}(P_n)$ に多項式上界はありません。仮に $\mathrm{dc}(P_n)\le Cn^d$ が全ての $n$ で成り立つとすると、$c+1>d$ を選び、十分大きな $n$ で $Cn^d\le n^{c+1}$ とでき、矛盾するからです。

ここで変数数と全次数が多項式有界な多項式族を考え、[行列式族の VBP 完全性](../ACOMP13/index.md#thm-acomp13-det-complete) を思い出します。VBP の族なら定数または変数への代入で多項式サイズの行列式表示が得られ、逆にアフィン一次式への代入も、[行列式族の VBP 所属](../ACOMP13/index.md#thm-acomp13-det-vbp) の ABP の変数標識をアフィン一次式へ代入できます。[ABP の定義](../ACOMP3/index.md#def-acomp3-abp) ではこの標識も許され、定数・変数だけの標識が必要な場合にも次の置換で多項式サイズを保てます。具体的には $a_0+\sum_i a_i x_i$ の辺を、定数辺と変数辺を直列につないだ $r$ 本の枝と定数項の枝に置き換えます。各枝の積は $a_ix_i$ または $a_0$、枝の和が元の標識です。辺数は高々 $2r+2$ 倍です。従って多項式有界な行列式複雑性は VBP に対応します。

複素数体では [Valiant のパーマネント VNP 完全性](../ACOMP11/index.md#thm-acomp11-permanent-complete) が成立するので、上記の下界は VBP と VNP の分離を導きます。ただし VBP と VP が同じとは仮定していません。行列式の下界を一般算術回路の下界へ無条件に読み替えることはできません。

## 5. 対称性を方程式の探索に使う

閉集合 $X$ を考えたとき、係数を引数とする多項式関数を $X$ に制限して得られる環を考えます。係数座標を $c_1,\ldots,c_M$ とすると、二つの多項式が $X$ の全点で同じ値を持つ条件は、その差が [消滅イデアル](../../../代数系/AG/AG1-01/index.md#def-ag1-01-vanishing-ideal) $I(X)$ に入ることです。そこで

$$
\mathbb C[X]=\mathbb C[c_1,\ldots,c_M]/I(X)
$$

を [座標環](../../../代数系/AG/AG1-03/index.md#def-ag1-03-coordinate-ring) と呼びます。[座標環と多項式関数](../../../代数系/AG/AG1-03/index.md#prop-ag1-03-evaluation) により、商の元 $[H]$ は $X$ 上の関数 $H|_X$ と同一視できます。例えば $X=\{(a,b):b=0\}$ なら、$a+b$ と $a$ は同じ関数を表します。

[複素線形表現](../../../代数系/LREP/LREP1/index.md#def-lrep1-linear-representation) では群の各元に可逆な線形写像を対応させ、群の積を写像の合成に対応させました。ここでは座標環全体の線形作用を考えます。座標環は一般に無限次元なので、既習の有限次元表現の定義をそのまま適用するのではなく、群が可逆線形写像として作用することを先に示します。後で有限次元の次数別部分に制限します。集合の不変性とは、すべての $g\in G$ について $g\cdot X=X$ となることです。係数多項式にも、元の点への作用を逆向きに代入することで表現を作れます。$X$ が群の作用で不変なら $H$ の値を $g^{-1}\cdot p$ で評価しても $X$ の外へ出ません。

<a id="thm-acomp23-equivariant-restriction"></a>

<!-- formal-statement-start -->
> **定理（不変閉集合の座標環の制限）**
>
> $G=\mathrm{GL}_N(\mathbb C)$ が線形置換で作用する $W_{N,m}$ の $G$ 不変な Zariski 閉集合 $Y\subseteq X$ を取る。座標環への作用を

$$
(g\cdot[H])(p)=H(g^{-1}\cdot p)
$$

> と定めると、各座標環上の複素線形な群作用（一般に無限次元）が得られ、制限写像

$$
\rho:\mathbb C[X]\longrightarrow\mathbb C[Y],
\qquad [H]_X\longmapsto[H]_Y
$$

> は全射で群作用と可換な線形写像かつ環準同型である。
<!-- formal-statement-end -->

### 証明の見取り図

包含とイデアルの向きは逆です。大きな集合で消える式は小さな集合でも消えるため、制限が定義できます。

<!-- proof-start -->
### 証明

$H-K$ が $X$ 上で零なら、$p\in X$ に対して $g^{-1}\cdot p\in X$ なので $(H-K)(g^{-1}\cdot p)=0$ です。従って作用は代表元の取り方によらず定まります。点への作用は係数の線形変換なので、合成した関数も係数多項式の制限です。代入は和とスカラー倍を保ち、単位元の作用は恒等写像、逆元 $g^{-1}$ の作用が逆写像です。

$$
(g\cdot(h\cdot H))(p)
=H(h^{-1}\cdot(g^{-1}\cdot p))
=H((gh)^{-1}\cdot p).
$$

よって群の積と合成が対応します。$Y\subseteq X$ なので $I(X)\subseteq I(Y)$ であり、$\rho$ は代表元によらず定まります。$[H]_Y$ に対して $[H]_X$ が原像なので全射です。和・積の保存は同じ代表多項式の制限から従います。

任意の $p\in Y$ について

$$
(\rho(g\cdot[H]_X))(p)
=H(g^{-1}\cdot p)
=(g\cdot\rho([H]_X))(p)
$$

であり、作用と可換です。
<!-- proof-end -->

この結果が表現論を使う理由です。Zariski軌道閉包の包含があるなら、座標環に対して特定の方向の全射が存在しなければなりません。

さらに、非零の有限次元表現で非零の真の不変部分空間を持たないものが [既約表現](../../../代数系/LREP/LREP1/index.md#def-lrep1-irreducible) でした。

ここからは $X,Y$ を第4節のような斉次次数 $m\ge1$ のZariski軌道閉包に限ります。任意の非零スカラー $t\in\mathbb C$ について $\lambda^{-m}=t$ を満たす $\lambda\ne0$ が存在し、$g=\lambda I_N$ と取ると

$$
(g\cdot p)(u)=p(\lambda^{-1}u)=\lambda^{-m}p(u)=tp(u).
$$

零は [全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) で $B=0$ として得られます。従ってこれらの閉包は全スカラー倍について閉じています。従ってその消滅イデアルは係数次数ごとの成分に分けられます。実際 $H=\sum_d H_d$ が閉包上で消えるなら、任意の点 $p$ について $\sum_d t^d H_d(p)=H(tp)=0$ が全ての $t$ で成り立ち、各 $H_d(p)=0$ です。

係数次数 $d$ の部分は有限次元で、群作用は次数を保ちます。複素一般線形群の有限次元有理表現の完全可約性という表現論の結果（ここでは引用。下記の Bürgisser–Ikenmeyer–Panova 論文 §1(a) でも用いられる）によって、この部分は既約表現の直和に分かれます。有理表現とは、行列で表した作用の各成分が群の行列成分と行列式の逆数の多項式で表せるものです。本節の作用は逆行列の余因子公式と有限の多項式代入で得られるので、この条件を満たします。

係数次数 $d$ の斉次多項式の剰余類が作る空間を $\mathbb C[X]_d,\mathbb C[Y]_d$ と書きます。消滅イデアルが次数別に分かれるので、これらの空間の直和が各座標環になります。任意の $[H]_Y\in\mathbb C[Y]_d$ には同じ次数 $d$ の代表元 $H$ があり、$[H]_X$ が原像です。従って制限 $\rho_d$ は全射です。[絡作用素の核と像の不変性](../../../代数系/LREP/LREP1/index.md#prop-lrep1-intertwiner-kernel-image) により核は不変です。完全可約性によって不変補空間 $U$ が存在し、

$$
\mathbb C[X]_d=\ker\rho_d\oplus U,\qquad
\rho_d|_U:U\longrightarrow\mathbb C[Y]_d
$$

は全射かつ単射で群作用を保ちます。従って $Y$ に現れる既約表現の種類と各種類の個数（重複度）は $X$ 側のものを超えることができません。

この必要条件を破る既約表現が出現障害（occurrence obstruction、$Y$ にあるが $X$ にない種類）です。種類はあるが重複度が足りない場合も重複度障害（multiplicity obstruction）になります。これらは包含を否定するための十分条件であって、存在しないことが包含を保証するわけではありません。

### 二次式で障害を手計算する

$W_{2,2}$ の点を $p=ax^2+2bxy+cy^2$ とします。係数行列を

$$
Q=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

とします。$u=(x,y)^{\mathsf T}$ と置くと、対称行列の二つの非対角成分から同じ $bxy$ が一回ずつ現れ、

$$
u^{\mathsf T}Qu=ax^2+bxy+byx+cy^2=p(u).
$$

従って $Q$ は二次式の係数を表す複素対称行列であり、複素共役を取る Hermitian 行列ではありません。逆行列を代入すれば

$$
p(g^{-1}u)=u^{\mathsf T}(g^{-1})^{\mathsf T}Qg^{-1}u.
$$

左右の可逆行列による乗法は像の次元を保つので、係数行列の階数は変わりません。

$x^2$ の軌道は非零の一次式の二乗です。例えば $(sx+ty)^2$ は $a=s^2,b=st,c=t^2$ となるので $ac-b^2=0$ です。閉包 $X=\overline{G\cdot x^2}^{\,Z}$ でも係数多項式 $H=ac-b^2$ は零です。一方 $q=x^2+y^2$ では $H(q)=1\cdot1-0^2=1$ なので、$Y=\overline{G\cdot q}^{\,Z}$ は $X$ に含まれません。

この方程式の対称性も見ます。関数への作用には逆向きの点変換を使うので

$$
(g\cdot H)(p)=\det(g^{\mathsf T}Qg)
=(\det g)^2H(p).
$$

従って $H|_Y$ が張る一次元空間は群作用で保たれる既約表現です。その作用はスカラー $(\det g)^2$ です。これは [1次元指標](../../../代数系/LREP/LREP1/index.md#def-lrep1-character) の例で、行列式の積の保存により群の積を保ちます。この型の非零関数は $X$ には存在しません。実際、同じ変換則を持つ関数 $F$ が $X$ にあったとすると、$g=\operatorname{diag}(1,2)$ は点 $x^2$ を固定しますから、

$$
F(x^2)=(g\cdot F)(x^2)=4F(x^2).
$$

従って $F(x^2)=0$ です。任意の軌道点 $h\cdot x^2$ でも $F(h\cdot x^2)=(h^{-1}\cdot F)(x^2)=(\det h)^{-2}F(x^2)=0$ です。多項式関数の零点集合は閉じているので $F$ はZariski軌道閉包全体で零です。この例では方程式一つと、その表現の出現の有無が同じ分離を与えています。

### 実際の行列式とパーマネントの障壁

Bürgisser–Ikenmeyer–Panova, [No occurrence obstructions in geometric complexity theory](https://arxiv.org/abs/1604.06431), Theorem 1.5（JAMS 2019）は、同論文で採用する $x_{11}^{m-n}P_n$（既存の変数を用いる padding）の比較で、行列式サイズ $m$ がパーマネントサイズ $n$ の25乗以上なら、出現障害が存在しないことを証明しました。本講の独立変数による padding とは記法を区別し、ここでは同論文の定式化に対する結果として述べます。これにより、既約表現の種類の有無だけを使って超多項式下界を得る当初の方針には障壁があります。この結果は重複度による障害一般を排除せず、またZariski軌道閉包の包含を証明する結果でもありません。本講で証明したのは分離の論理と低次元の具体例であり、論文の組合せ表現論的な証明は引用に留めます。

## 6. 演習

### A1. 小さな行列式複雑性
- Level: A
- ID: ACOMP23-A1

$f=x^2-y^2$ の行列式複雑性を求めよ。

<!-- solution-start -->
**詳細解答**：対角行列の行列式は対角成分の積なので、

$$
\det\begin{pmatrix}x-y&0\\0&x+y\end{pmatrix}
=(x-y)(x+y)=x^2-y^2.
$$

各成分はアフィン一次式なので [行列式複雑性](#def-acomp23-dc) の上界は2です。サイズ1の行列式は次数高々1ですが $f$ は次数2なので、下界も2です。従って $\mathrm{dc}(f)=2$ です。
<!-- solution-end -->

### A2. 指定次数への斉次化
- Level: A
- ID: ACOMP23-A2

$f=x^2+3xy+2$ を次数3へ斉次化し、復元せよ。

<!-- solution-start -->
**詳細解答**：[指定次数への多項式の斉次化](../ACOMP5/index.md#def-acomp5-homogenization) に従い、次数2の単項式二つには $z^{3-2}=z$ を、次数0の項には $z^{3}=z^3$ を掛けます。

$$
f^{[3]}=zx^2+3zxy+2z^3.
$$

各項の全次数は3であり、$z=1$ で $x^2+3xy+2=f$ に戻ります。
<!-- solution-end -->

### A3. 置換の順序
- Level: A
- ID: ACOMP23-A3

$p=x+y$、$g=\operatorname{diag}(2,1)$、$h=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ に対し $g\cdot(h\cdot p)$ と $(gh)\cdot p$ を求めよ。

<!-- solution-start -->
**詳細解答**：[斉次多項式の線形置換軌道](#def-acomp23-substitution-orbit) で逆行列を代入します。$h^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ は列 $(x,y)^{\mathsf T}$ を $(x-y,y)^{\mathsf T}$ へ送るので、$(h\cdot p)(x,y)=(x-y)+y=x$ です。さらに $g^{-1}=\operatorname{diag}(1/2,1)$ の代入で $x/2$ を得ます。一方、

$$
gh=\begin{pmatrix}2&2\\0&1\end{pmatrix},\qquad
(gh)^{-1}=\begin{pmatrix}1/2&-1\\0&1\end{pmatrix}.
$$

従って $(gh)\cdot p=(x/2-y)+y=x/2$ で一致します。
<!-- solution-end -->

### A4. padding と行列式
- Level: A
- ID: ACOMP23-A4

$P_2=ad+bc$ の次数3への padding を求め、サイズ3の斉次一次式行列で表示せよ。

<!-- solution-start -->
**詳細解答**：$P_2$ の二項とも次数2なので $z$ を掛けます。

$$
zP_2=\det\begin{pmatrix}a&-b&0\\c&d&0\\0&0&z\end{pmatrix}
=z(ad+bc).
$$

最後の行で展開すると $z$ の余因子は符号が正で二次行列式は $ad-(-b)c=ad+bc$ です。五変数は九座標に埋め込めるため [行列式表示と斉次線形置換](#thm-acomp23-dc-substitution) の条件を満たします。
<!-- solution-end -->

### B1. 軌道と特異置換
- Level: B
- ID: ACOMP23-B1

$p=xy$ の二変数二次式の軌道に $x^2$ は属するか。Zariski軌道閉包についても判定せよ。

<!-- solution-start -->
**詳細解答**：可逆置換なら二つの一次因子 $\ell_1=ax+by,\ell_2=cx+dy$ の係数行は独立です。積が $x^2$ なら $bd=0$、$ac=1$、$ad+bc=0$ が必要です。$a,c$ は非零です。$b=0$ なら $ad=0$ から $d=0$、$d=0$ なら $bc=0$ から $b=0$ です。いずれも二行が従属なので可逆性に反します。

しかし $B(t)=\begin{pmatrix}1&0\\1&t\end{pmatrix}$ は $t\ne0$ で可逆であり、

$$
p(B(t)u)=x(x+ty)=x^2+txy.
$$

係数は正則で定数項は $x^2$ です。また $B(0)$ による特異置換で $x^2$ が得られます。[全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) により $x^2$ はZariski軌道閉包に属します。
<!-- solution-end -->

### B2. 二次係数の階数下界
- Level: B
- ID: ACOMP23-B2

$f=\sum_{i=1}^5 x_i^2$ はサイズ2のアフィン一次式行列の行列式の閉包に属さないことを示せ。ここでは五変数の次数高々2の係数空間で考える。

<!-- solution-start -->
**詳細解答**：行列の四成分の斉次一次部分を $\ell_j=v_j^{\mathsf T}x$（$1\le j\le4$、$v_j\in\mathbb C^5$）と書きます。定数部分を含めて積を展開しても、次数2の部分は $\ell_1\ell_4-\ell_2\ell_3$ だけです。第5節の係数表示を五変数へ拡張します。二次式の対角係数を $Q_{ii}$、$x_ix_j$（$i<j$）の係数の半分を $Q_{ij}=Q_{ji}$ に入れれば $x^{\mathsf T}Qx$ が元の二次式になります。積について

$$
\ell_i\ell_j=x^{\mathsf T}v_iv_j^{\mathsf T}x
=\tfrac12 x^{\mathsf T}(v_iv_j^{\mathsf T}+v_jv_i^{\mathsf T})x
$$

となるため、対称係数行列は

$$
Q=\tfrac12(v_1v_4^{\mathsf T}+v_4v_1^{\mathsf T}
-v_2v_3^{\mathsf T}-v_3v_2^{\mathsf T}).
$$

任意の列ベクトル $w\in\mathbb C^5$ について

$$
Qw=\tfrac12\bigl(v_1(v_4^{\mathsf T}w)+v_4(v_1^{\mathsf T}w)
-v_2(v_3^{\mathsf T}w)-v_3(v_2^{\mathsf T}w)\bigr).
$$

従って像は四つの $v_j$ の張る空間に含まれ、階数は高々4です。五次正方行列なので可逆ではなく、$\det Q=0$ です。$Q$ の成分は二次係数の線形関数なので、$\det Q$ は係数多項式であり、閉包上でも零です。一方 $f$ の対称係数行列は $I_5$ で $\det I_5=1$ です。従って閉包に属さず、厳密な表示もできません。特に $\mathrm{dc}(f)>2$ です。この演習は $r+1\le m^2$ を満たさないので、斉次化を行列式の軌道空間に埋め込む定理は使っていません。
<!-- solution-end -->

### B3. 座標環の制限と核
- Level: B
- ID: ACOMP23-B3

二次式の係数空間全体 $W=\mathbb C^3$ と、$X=\overline{G\cdot x^2}^{\,Z}$ を考える。$\mathbb C[W]\to\mathbb C[X]$ の核に非零元を一つ見つけ、その群作用を求めよ。

<!-- solution-start -->
**詳細解答**：係数を $(a,b,c)$ としたとき $H=ac-b^2$ は一次式の二乗 $(sx+ty)^2$ に対して $s^2t^2-(st)^2=0$ です。閉包 $X$ でも消えます。一方 $W$ の点 $(1,0,1)$ では値が1なので $H$ は $\mathbb C[W]$ では非零です。[不変閉集合の座標環の制限](#thm-acomp23-equivariant-restriction) により $H$ は制限の核に属します。$p=ax^2+2bxy+cy^2$ の係数行列を $Q$ とすれば、

$$
(g\cdot H)(p)=\det(g^{\mathsf T}Qg)
=(\det g)^2\det Q.
$$

従って核の中の一次元部分空間 $\mathbb C H$ は $(\det g)^2$ というスカラー作用を持ちます。全射の向きは $W$ 側から $X$ 側であり、逆ではありません。
<!-- solution-end -->

### B4. サイズとクラスの量化
- Level: B
- ID: ACOMP23-B4

仮にすべての整数 $k\ge2$ に対して無限個の $n$ で $\mathrm{dc}(P_n)>n^k$ が示されたとする。多項式サイズの ABP が存在しないことを示し、この結論だけから一般の算術回路に何が言えるか説明せよ。

<!-- solution-start -->
**詳細解答**：もし多項式サイズの ABP があれば [ABPの行列式表示](../ACOMP13/index.md#thm-acomp13-abp-det) により行列式サイズにも多項式上界が存在します。すなわち正定数 $C$ と整数 $d\ge0$ があり $\mathrm{dc}(P_n)\le Cn^d$ です。$k=\max(2,d+1)$ を選ぶと、$n$ が十分大きいとき $n^{k-d}\ge C$ なので $\mathrm{dc}(P_n)\le n^k$ です。仮定の無限個の $n$ の中にはこの閾値を超えるものがあり矛盾します。

従ってパーマネント族は VBP に属さず、[パーマネントの VNP 所属](../ACOMP11/index.md#thm-acomp11-permanent-vnp) と合わせて VBP と VNP が異なることが分かります。[代数的計算クラスの包含](../ACOMP13/index.md#thm-acomp13-inclusions) は VBP が VP に含まれることを述べるだけなので、VP と VNP が異なるとはここから導けません。
<!-- solution-end -->

### C1. 退化を含む行列式下界の論理
- Level: C
- ID: ACOMP23-C1

$n=2,m=3$ とし、係数空間を九変数の斉次三次式とする。$X_3$ を行列式のZariski軌道閉包、$Y_{3,2}$ を $zP_2$ のZariski軌道閉包とする。

(1) 包含 $Y_{3,2}\subseteq X_3$ を示せ。

(2) 一般の $m>n$ に対し、$X_m$ 上で零だが padded permanent 上で非零となる係数多項式が存在したと仮定すると、どの計算モデルが排除されるか。

(3) 出現障害が存在しないという結果だけから包含を結論できるか。

<!-- solution-start -->
**詳細解答**：

(1) A4 の表示を改めて展開すると

$$
\det\begin{pmatrix}a&-b&0\\c&d&0\\0&0&z\end{pmatrix}
=z(ad+bc)=zP_2.
$$

各成分は五変数の斉次一次式です。九変数のうち五つを $a,b,c,d,z$ に割り当て、残り四つの係数を0とすれば、各成分の係数を行に持つ九次の行列 $B$ ができ、$D_3(Bu)=zP_2$ です。[全線形置換の像とZariski軌道閉包](#thm-acomp23-end-orbit) で $zP_2\in X_3$ を得ます。$X_3$ は可逆な線形置換で不変かつ閉じているので、$zP_2$ の軌道全体とその閉包を含みます。

(2) $m>n$ なら $n^2+1\le m^2$ です。仮定した多項式を $H$ とすると、

$$
H|_{X_m}=0,\qquad H(z^{m-n}P_n)\ne0
$$

なので padded permanent は $X_m$ の外にあります。[行列式表示の閉包と行列式のZariski軌道閉包](#thm-acomp23-border-dc) を $r=n^2$ として適用すると、$P_n$ はサイズ $m$ のアフィン一次式行列の行列式の集合の閉包の外にあります。その集合そのものにも属さないので $\mathrm{dc}(P_n)>m$ です。また [前講の形式的退化から閉包への含意](../ACOMP22/index.md#thm-acomp22-degeneration-closure) を行列係数写像に適用すると、サイズ $m$ の行列の Laurent 級数係数による正則出力の特殊化でも実現できません。

(3) 包含があれば [不変閉集合の座標環の制限](#thm-acomp23-equivariant-restriction) による全射が存在し、既約表現の種類の包含が必要です。しかし種類の包含は全射の存在の十分条件ではありません。例えば同じ一次元自明表現の一コピーから二コピーへの写像は、種類が同じでも次元が足りず全射になれません。さらに座標環の制限は群作用だけでなく環の積も保存する必要があります。従って出現障害がないことから幾何学的包含を結論することはできません。
<!-- solution-end -->

## 7. まとめ

行列式表示の最小サイズという計算量を、同じ斉次係数空間に置かれた二つのZariski軌道閉包の包含へ変換しました。消滅方程式を探す際には群の作用を利用でき、座標環の制限の向きから表現論的な必要条件が得られます。次講では、こうした代数的計算量の主張を Boolean 計算量の主張へ結び付ける際の追加条件を整理します。
