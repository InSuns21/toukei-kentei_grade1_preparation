# HOD1-03 sl2と原始形式の線形代数

<!-- definition-example-audit: strict -->

## 1. 次数を数える交換子から三つの作用素の関係へ

前章で、基本2形式を外積する[Lefschetz作用素](../HOD1-02/index.md#def-hod1-02-lefschetz) $L$ と、その点ごとの[Hermite随伴](../HOD1-02/index.md#def-hod1-02-lambda) $\Lambda$ を作った。そして[交換子の次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)は、複素次元 $n$ のHermite多様体上の $k$ 形式に対して

$$
(\Lambda L-L\Lambda)\alpha=(n-k)\alpha
$$

を与えた。この公式は次数ごとの数を教えるが、$L$ を何回作用させると零になるか、どの形式が $L$ で作られるかはまだ説明しない。**各次数の形式空間を、$L$ でつながる有限の列へ分ける**ことが本章の目標である。

以下では点 $x$ を一つ固定する。$V=T_x^*X\otimes_{\mathbb R}\mathbb C$ の外積代数を

$$
\mathcal A=\bigoplus_{k=0}^{2n}\mathcal A^k,\qquad
\mathcal A^k=\bigwedge^kV
$$

と書き、$\mathcal A^k=0$（$k<0$ または $k>2n$）と約束する。すべては有限次元の正定値Hermite内積空間である。$X$ は **Hermite多様体であればよく**、基本形式の閉性 $d\omega=0$ もコンパクト性も仮定しない。$L:\mathcal A^k\to\mathcal A^{k+2}$、$\Lambda:\mathcal A^k\to\mathcal A^{k-2}$ は点ごとの線形写像である。

交換子は $[A,B]=AB-BA$ とする。次数作用素 $H=[\Lambda,L]$ を $\mathcal A$ 全体に定める。[Lefschetz交換子の次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)により

$$
H|_{\mathcal A^k}=(n-k)\operatorname{id}_{\mathcal A^k}.
$$

したがって $H$ を $L$ や $\Lambda$ の前後に置くと、次数が2変わる分だけ数値がずれる。

比較先となる $\mathfrak{sl}_2(\mathbb C)$ は、跡が零の $2\times2$ 複素行列全体に交換子 $[A,B]=AB-BA$ を入れた空間である。例えば三つの行列

$$
e=\begin{pmatrix}0&1\\0&0\end{pmatrix},\quad
f=\begin{pmatrix}0&0\\1&0\end{pmatrix},\quad
h=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

は $[e,f]=h$、$[h,e]=2e$、$[h,f]=-2f$ を満たす。実際に $ef=\operatorname{diag}(1,0)$、$fe=\operatorname{diag}(0,1)$ だから $ef-fe=h$ である。次に $L,\Lambda,H$ がこれと同じ三関係を満たすことを示す。

<a id="thm-hod1-03-sl2"></a>

<!-- formal-statement-start -->
> **定理（Lefschetz作用素のsl2交換関係）**
> 複素次元 $n$ のHermiteベクトル空間の外積代数 $\mathcal A$ 上で、基本形式の外積作用素 $L$、そのHermite随伴 $\Lambda$、$H=[\Lambda,L]$ をとる。全次数で次の作用素等式が成立する。

$$
[\Lambda,L]=H,\qquad [H,\Lambda]=2\Lambda,\qquad [H,L]=-2L.
$$

> ここでの交換関係は点ごとのものであり、Kähler条件を必要としない。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ は次数を2上げるので、$H$ が掛ける数 $n-k$ は2減る。$\Lambda$ は次数を2下げるので、その数は2増える。この二つの差を、同じ次数 $k$ の任意の形式に作用させて確かめる。

<!-- proof-start -->
### 証明

$\alpha\in\mathcal A^k$ とする。[次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)から $H\alpha=(n-k)\alpha$ である。$L\alpha$ は次数 $k+2$ だから

$$
\begin{aligned}
[H,L]\alpha
&=H(L\alpha)-L(H\alpha)\\
&=(n-k-2)L\alpha-(n-k)L\alpha\\
&=-2L\alpha.
\end{aligned}
$$

同様に $\Lambda\alpha$ は次数 $k-2$ なので

$$
\begin{aligned}
[H,\Lambda]\alpha
&=(n-k+2)\Lambda\alpha-(n-k)\Lambda\alpha\\
&=2\Lambda\alpha.
\end{aligned}
$$

範囲外の次数は零空間としたため、端の次数でも両式は成立する。最初の等式は $H$ の定義であり、$\alpha$ と $k$ が任意だから三つの作用素等式を得る。$\square$
<!-- proof-end -->

三つの行列の対応 $e\mapsto\Lambda$、$f\mapsto L$、$h\mapsto H$ は交換関係を保つ。このような作用を $\mathfrak{sl}_2$ の表現と呼ぶ。ここでは一般の表現論を黒箱として使わず、今証明した関係から列の構造を計算する。

**複素次元1での確認。** 前章の[一組の作用表](../HOD1-02/index.md#thm-hod1-02-commutator)では、$1,\theta,\bar\theta,\xi=\theta\wedge\bar\theta$ の $H$ 固有値は $1,0,0,-1$。$L1=i\xi$ なので

$$
[H,L]1=H(i\xi)-L(1)=-i\xi-i\xi=-2L1.
$$

この符号が逆になると、後の階乗係数もすべて狂う。

## 2. $\Lambda$ でこれ以上下げられない形式

$L$ で上へ伸ばす列の出発点として、$\Lambda$ で下へ戻せない形式を探す。$L$ ではなく $\Lambda$ の核を使う理由は、両者が随伴なので、その核が $L$ の像と直交するためである。次の定義は、この直交する出発点を取り出す。

<a id="def-hod1-03-primitive"></a>

<!-- formal-statement-start -->
> **定義（原始形式）**
> 複素次元 $n$ のHermiteベクトル空間の $k$ 形式空間 $\mathcal A^k$ について、$0\le k\le n$ の原始 $k$ 形式空間を

$$
P^k=\{\alpha\in\mathcal A^k:\Lambda\alpha=0\}
=\ker(\Lambda:\mathcal A^k\to\mathcal A^{k-2})
$$

> と定める。$k<0$ または $k>n$ に対しては記号上 $P^k=0$ と置く。
<!-- formal-statement-end -->

$k=0,1$ なら $\Lambda$ の行き先が零空間なので $\mathcal A^0=P^0$、$\mathcal A^1=P^1$。$k\ge2$ では $\Lambda\alpha=0$ を実際に計算する必要がある。$k>n$ で本当に $\ker\Lambda=0$ となることは第4節で証明する。

<!-- definition-example-start: def-hod1-03-primitive -->
**定義の確認**（複素次元2）。[随伴のunitary余標構表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)を使う。点ごとの正規直交複素余標構 $\theta^1,\theta^2$ とその共役を固定し、次のように置く。

$$
\xi_j=\theta^j\wedge\bar\theta^j\quad(j=1,2),\qquad
\omega=i(\xi_1+\xi_2).
$$

原始条件 $\Lambda\alpha=0$ を判定するため、まず

$$
\Lambda=-i\sum_{j=1}^2\bar I_jI_j
$$

で各外積基底を調べる。ここで $I_j$ は $\theta^j$ を、$\bar I_j$ は $\bar\theta^j$ を取り除く収縮である。

同じ添字の組では $I_j\xi_j=\bar\theta^j$、$\bar I_j\bar\theta^j=1$ となる。一方、異なる添字の交差項では、二つの収縮を連続して非零にする組がない。従って

$$
\Lambda\xi_1=\Lambda\xi_2=-i,\qquad
\Lambda(\theta^1\wedge\bar\theta^2)
=\Lambda(\theta^2\wedge\bar\theta^1)=0.
$$

また、[複素型と随伴の作用次数](../HOD1-02/index.md#prop-hod1-02-bidegree)から、$(2,0)$、$(0,2)$ 形式の $\Lambda$ による行き先はそれぞれ $(1,-1)$、$(-1,1)$ 型の零空間である。したがってこれらも原始条件を満たす。以上を合わせて

$$
\begin{aligned}
P^2=\operatorname{span}_{\mathbb C}\{&
\xi_1-\xi_2,\ \theta^1\wedge\bar\theta^2,\
\theta^2\wedge\bar\theta^1,\\
&\theta^1\wedge\theta^2,\
\bar\theta^1\wedge\bar\theta^2\}.
\end{aligned}
$$

五つは外積単項式の独立な組合せである。さらに $\mathcal A^2$ の外積基底は6個で、$\Lambda\xi_1=-i\ne0$ だから $\Lambda:\mathcal A^2\to\mathcal A^0$ の像は1次元、核は5次元である。従って列挙した五つが核 $P^2$ を尽くす。一方 $\Lambda\omega=2$ だから $\omega\notin P^2$ であり、残りはちょうど $\mathbb C\omega$ 方向である。
<!-- definition-example-end -->

原始形式を「$L$ で零になる形式」と定義しない点に注意したい。上の $n=2,k=2$ ではたまたま二つの条件が一致するが、一般には $L^{n-k+1}$ という **次数に応じた冪** が対応する。後で証明する。

## 3. 原始形式から伸びるLefschetz列とノルム

$v\in P^k$、$m=n-k$ とする。$v,Lv,L^2v,\ldots$ を **Lefschetz列** と呼んで並べる。何番目まで非零かは、単なる次数上限だけでなく $L$ と $\Lambda$ の随伴性で決まる。

<a id="lem-hod1-03-primitive-ladder"></a>

<!-- formal-statement-start -->
> **補題（原始形式のLefschetz列公式）**
> 複素次元 $n$ のHermiteベクトル空間で、$0\le k\le n$、$v\in P^k$、$m=n-k$ とする。整数 $r\ge1$ について

$$
\Lambda L^rv=r(m-r+1)L^{r-1}v
$$

> が成立する。$v\ne0$ なら $0\le r\le m$ で $L^rv\ne0$、$L^{m+1}v=0$ である。さらに $0\le r\le m$ で

$$
\|L^rv\|^2=\frac{r!\,m!}{(m-r)!}\,\|v\|^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\Lambda L=L\Lambda+H$ を繰り返すと、$\Lambda$ を $r$ 個の $L$ の右へ通せる。最後に $\Lambda v=0$ が効く。得た係数を内積へ移せば、列の長さも正値性だけで決まる。

<!-- proof-start -->
### 証明

まず $r=1$。$v$ が原始なので $\Lambda v=0$ であり、[交換子公式](../HOD1-02/index.md#thm-hod1-02-commutator)を次数 $k$ の $v$ へ適用すると

$$
\Lambda Lv=L\Lambda v+Hv=0+(n-k)v=mv.
$$

一般に作用素の積について $[A,BC]=[A,B]C+B[A,C]$ だから、帰納的に

$$
[\Lambda,L^r]
=\sum_{s=0}^{r-1}L^sHL^{r-1-s}.
$$

$L^{r-1-s}v$ は次数 $k+2(r-1-s)$ なので、$H$ の固有値は $m-2(r-1-s)$ である。$\Lambda v=0$ より

$$
\begin{aligned}
\Lambda L^rv
&=[\Lambda,L^r]v+L^r\Lambda v\\
&=\sum_{s=0}^{r-1}\{m-2(r-1-s)\}L^{r-1}v\\
&=\{rm-2(0+1+\cdots+(r-1))\}L^{r-1}v\\
&=r(m-r+1)L^{r-1}v.
\end{aligned}
$$

次に $L^*=\Lambda$ という[点ごとの随伴の定義](../HOD1-02/index.md#def-hod1-02-lambda)を内積に用いる。$1\le r\le m$ の場合、

$$
\begin{aligned}
\|L^rv\|^2
&=\langle L(L^{r-1}v),L^rv\rangle\\
&=\langle L^{r-1}v,\Lambda L^rv\rangle\\
&=r(m-r+1)\|L^{r-1}v\|^2.
\end{aligned}
$$

ここで係数は正の整数である。$r=1$ から掛け合わせると

$$
\prod_{j=1}^{r}j(m-j+1)
=r!\,m(m-1)\cdots(m-r+1)
=\frac{r!\,m!}{(m-r)!}.
$$

$v\ne0$ なら正定値性により各 $\|L^rv\|^2>0$。最後に $r=m+1$ を最初の公式へ代入すると $\Lambda L^{m+1}v=0$。したがって同じ随伴計算で

$$
\|L^{m+1}v\|^2
=\langle L^mv,\Lambda L^{m+1}v\rangle=0,
$$

ゆえに $L^{m+1}v=0$ である。$m=0$ の場合も $\Lambda Lv=0$ と $\|Lv\|^2=0$ を同様に用いればよい。$\square$
<!-- proof-end -->

**例（係数の検算）。** $n=3$ の原始1形式 $v\ne0$ に対して $m=2$ である。上の公式に $r=1,2,3$ を順に代入すると

$$
\Lambda Lv=2v,\qquad
\Lambda L^2v=2Lv,\qquad
\Lambda L^3v=0,
$$

さらに $\|Lv\|^2=2\|v\|^2$、$\|L^2v\|^2=4\|v\|^2$、$L^3v=0$。**$r=2$ の係数は $2(2-2+1)=2$** で、$4$ ではない。$4$ は二段のノルム比を掛け合わせた結果である。

## 4. 全形式を原始形式の列へ分ける

Lefschetz列が途中で零になることは分かった。次は、任意の形式をこれらの列だけで作れることと、分け方が一意であることを示す。そのために、まず内積と交換子を使って $L$ の単射・全射を区別する。

任意の $u\in\mathcal A^q$ をとる。[点ごとの随伴の定義](../HOD1-02/index.md#def-hod1-02-lambda)と[Lefschetz交換子の次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)を内積に適用すると

$$
\begin{aligned}
(n-q)\|u\|^2
&=\langle[\Lambda,L]u,u\rangle\\
&=\langle\Lambda Lu,u\rangle-\langle L\Lambda u,u\rangle\\
&=\|Lu\|^2-\|\Lambda u\|^2.
\end{aligned}
$$

すなわち

$$
\|Lu\|^2=\|\Lambda u\|^2+(n-q)\|u\|^2.
$$

$q<n$ なら $Lu=0$ は $u=0$ を強制し、**$L:\mathcal A^q\to\mathcal A^{q+2}$ は単射**である。逆に $q>n$ なら

$$
\|\Lambda u\|^2=\|Lu\|^2+(q-n)\|u\|^2
$$

なので **$\Lambda:\mathcal A^q\to\mathcal A^{q-2}$ は単射**。有限次元で $\Lambda=L^*$ だから $(\operatorname{im}L)^\perp=\ker\Lambda=0$、よって **$L:\mathcal A^{q-2}\to\mathcal A^q$ は全射**となる。ここで $\ker\Lambda=0$ は先ほど保留した $q>n$ の原始形式が存在しないことも示す。

<a id="thm-hod1-03-decomposition"></a>

<!-- formal-statement-start -->
> **定理（点ごとのLefschetz直交分解）**
> 複素次元 $n$ のHermiteベクトル空間の各次数 $0\le q\le2n$ において、$P^j=\ker\Lambda|_{\mathcal A^j}$（$0\le j\le n$）とすると、次の直交直和が成り立つ。

$$
\mathcal A^q
=\bigoplus_{\substack{0\le j\le n,\ r\ge0\\
j+2r=q,\ 0\le r\le n-j}} L^rP^j.
$$

> $L^rP^j$ の元は $L^rv$（$v\in P^j$）であり、現れる $L^r:P^j\to\mathcal A^{j+2r}$ は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

低次数では「$\Lambda$ の核」と「その直交補空間 $L$ の像」を繰り返して分ける。高次数では $L$ が全射なので列を上へ延ばせる。最後に、異なる出発次数の列は $\Lambda$ を十分繰り返すと片方が零になることから直交性を証明する。

<!-- proof-start -->
### 証明

**低次数 $0\le q\le n$。** 有限次元Hermite内積空間で随伴関係から

$$
(\operatorname{im}L|_{\mathcal A^{q-2}})^\perp
=\ker(\Lambda|_{\mathcal A^q})=P^q.
$$

したがって $\mathcal A^q=P^q\oplus^\perp L\mathcal A^{q-2}$ である。$q=0,1$ は $\mathcal A^q=P^q$、それ以降は $q-2$ の分解を $L$ で移す帰納法により

$$
\mathcal A^q=\sum_{r=0}^{\lfloor q/2\rfloor}L^rP^{q-2r}
$$

を得る。この段階では各成分の直交性はまだ主張していない（$L$ が任意の直交対を直交対へ移すとは限らない）。ただし各 $L^rP^{q-2r}$ は[列公式](#lem-hod1-03-primitive-ladder)の $r\le n-(q-2r)$ を満たすので、対応する $L^r$ は原始空間上で単射である。

**高次数 $n<q\le2n$。** 上で示した通り $\Lambda|_{\mathcal A^q}$ は単射で、その随伴 $L:\mathcal A^{q-2}\to\mathcal A^q$ は全射である。したがって $\mathcal A^q=L\mathcal A^{q-2}$ と書ける。低次数で得た列を $L$ で繰り返し上げると、$L^{n-j+1}P^j=0$ を除いた、定理の指数範囲の項がすべてを張る。

**直交性と一意性。** 同じ次数 $q$ に属する二つの元をとる。

$$
L^rv\quad(v\in P^j),\qquad L^sw\quad(w\in P^\ell),
\qquad j+2r=\ell+2s=q.
$$

出発次数 $j\ne\ell$ なら $r\ne s$。仮に $r>s$ とする。[列公式](#lem-hod1-03-primitive-ladder)を $s$ 回使うと $L^sw$ は $w$ の定数倍まで下がり、さらに原始条件 $\Lambda w=0$ から

$$
\Lambda^{s+1}L^sw=0,\qquad
\Lambda^rL^sw=\Lambda^{r-s-1}(\Lambda^{s+1}L^sw)=0.
$$

ここで指数 $r-s-1$ は非負整数である。随伴性を $r$ 回使えば

$$
\langle L^rv,L^sw\rangle
=\langle v,\Lambda^rL^sw\rangle=0.
$$

逆の場合も共役対称性で零となる。同じ $j$ については $r=s$ であり、[ノルム公式](#lem-hod1-03-primitive-ladder)が $L^r:P^j\to L^rP^j$ の単射を保証する。したがって上の和は互いに直交する部分空間の直和で、表し方は一意である。$\square$
<!-- proof-end -->

**原始形式は出発点、$L$ は列を進める操作**と読めば、上の和は単なる抽象記号ではない。$n=2$ ではたとえば

$$
\begin{aligned}
\mathcal A^2&=P^2\oplus^\perp LP^0,\\
\mathcal A^3&=LP^1,\qquad
\mathcal A^4=L^2P^0.
\end{aligned}
$$

先の $P^2$ の五つの基底と $LP^0=\mathbb C\omega$ の直交性は、$\langle Lv, u\rangle=\langle v,\Lambda u\rangle$（$u\in P^2$）から直接確認できる。

## 5. 点ごとの同型と原始形式の別の判定法

同じ原始形式 $v\in P^j$ の列は、下側の次数 $q$ と上側の次数 $2n-q$ を一対一に結ぶ。ここには微分・閉形式・コホモロジーが一切登場しない。

<a id="thm-hod1-03-pointwise-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（点ごとのLefschetz同型）**
> 複素次元 $n$ のHermiteベクトル空間において、整数 $0\le k\le n$ に対し

$$
L^{n-k}:\mathcal A^k\xrightarrow{\;\cong\;}\mathcal A^{2n-k}
$$

> は複素線形同型である。これは各点の外積代数についての主張であり、de Rhamコホモロジーの同型を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

[直交分解](#thm-hod1-03-decomposition)で $\mathcal A^k$ の一つの列を取り出し、同じ列の上側へ $L^{n-k}$ で送る。列の長さは[ノルム公式](#lem-hod1-03-primitive-ladder)で既に分かっている。

<!-- proof-start -->
### 証明

$\mathcal A^k$ の任意の直和成分を $L^rP^j$ とすると $j+2r=k$、$m=n-j=n-k+2r$ である。$L^{n-k}$ を作用させると

$$
L^{n-k}(L^rv)=L^{r+n-k}v=L^{m-r}v
\quad(v\in P^j).
$$

$k\le n$ だから $m-r\ge r\ge0$ であり、$m-r\le m$。従って[列の非消滅](#lem-hod1-03-primitive-ladder)からこの写像は成分上で単射で、その像は $L^{m-r}P^j$ 全体である。像の次数は

$$
j+2(m-r)=j+2(n-j-r)=2n-(j+2r)=2n-k.
$$

逆に[目標次数の直交分解](#thm-hod1-03-decomposition)に現れる各 $L^sP^j$ は $j+2s=2n-k$、$s\le n-j=m$ を満たす。$r=m-s$ と置くと

$$
j+2r=j+2(m-s)=2n-j-2s=k,\qquad
s=r+n-k.
$$

よって目標の各成分は、元の次数の対応する成分からちょうど写る。異なる成分の像は直交しているため、全体で単射かつ全射である。$\square$
<!-- proof-end -->

<a id="prop-hod1-03-primitive-power"></a>

<!-- formal-statement-start -->
> **命題（原始形式の高冪による特徴付け）**
> 複素次元 $n$ のHermiteベクトル空間で $0\le k\le n$ なら、次の二つの部分空間は等しい。

$$
P^k=\ker(\Lambda:\mathcal A^k\to\mathcal A^{k-2})
=\ker(L^{n-k+1}:\mathcal A^k\to\mathcal A^{2n-k+2}).
$$
<!-- formal-statement-end -->

### 証明の見取り図

原始成分は列の最下端なので、$n-k+1$ 回上げるとちょうど列を越えて零になる。一方、$L$ を1回以上掛けて得た非原始成分は、この回数ではまだ列の内側に残る。

<!-- proof-start -->
### 証明

[直交分解](#thm-hod1-03-decomposition)を次数 $k$ に適用し、任意の $\alpha\in\mathcal A^k$ を一意に

$$
\alpha=v_0+\sum_{r\ge1}L^rv_r,\qquad
v_0\in P^k,\quad v_r\in P^{k-2r}
$$

と表す（範囲外の項はないものとする）。[列公式](#lem-hod1-03-primitive-ladder)により $L^{n-k+1}v_0=0$。

$r\ge1$ の項では $v_r$ の列の長さを $m_r=n-(k-2r)=n-k+2r$ と書く。作用後の指数は

$$
s_r=r+n-k+1,\qquad
m_r-s_r=r-1\ge0.
$$

従って $L^{s_r}:P^{k-2r}\to L^{s_r}P^{k-2r}$ は[ノルム公式](#lem-hod1-03-primitive-ladder)で単射である。また異なる $r$ の像は同じ次数 $2n-k+2$ に属する異なる原始次数の列であり、[直交分解](#thm-hod1-03-decomposition)で直交する。ゆえに $L^{n-k+1}\alpha=0$ なら各 $v_r=0$（$r\ge1$）。したがって $\alpha=v_0\in P^k$ である。逆向きは既に示したので、二つの核は一致する。$\square$
<!-- proof-end -->

<a id="cor-hod1-03-dimension"></a>

<!-- formal-statement-start -->
> **系（原始形式の次元）**
> 複素次元 $n$ のHermiteベクトル空間で $0\le k\le n$ なら

$$
\dim_{\mathbb C}P^k
=\binom{2n}{k}-\binom{2n}{k-2},
$$

> ただし $\binom{2n}{j}=0$（$j<0$）と約束する。
<!-- formal-statement-end -->

### 証明の見取り図

下半分の次数では $L$ が単射であり、$\mathcal A^k$ は $P^k$ と $L\mathcal A^{k-2}$ の直交直和である。したがって次元の差をとればよい。

<!-- proof-start -->
### 証明

[直交分解の証明](#thm-hod1-03-decomposition)で示した $\mathcal A^k=P^k\oplus^\perp L\mathcal A^{k-2}$ を使う。$k\le n$ では $k-2<n$ なので $L:\mathcal A^{k-2}\to\mathcal A^k$ は単射であり、$\dim L\mathcal A^{k-2}=\dim\mathcal A^{k-2}$。複素次元 $2n$ の一次形式空間の外積単項式から $\dim\mathcal A^j=\binom{2n}{j}$ なので、次元を引けば表示式を得る。$\square$
<!-- proof-end -->

**上の二つの定理を混同しない。** [点ごとのLefschetz同型](#thm-hod1-03-pointwise-isomorphism)が成り立っても、基本形式 $\omega$ が閉じていなければ $L$ は $d$ と可換とは限らず、閉形式のコホモロジー類を保つ作用にはならない。コンパクトKähler多様体のコホモロジーでのHard Lefschetz定理には、後続講義で証明するKähler恒等式と調和形式の型保存・$L$ との可換性がさらに必要である。

## 6. 低次元の全体像を読み直す

**複素次元1。** $P^0=\mathbb C1$、$P^1=\operatorname{span}\{\theta,\bar\theta\}$。$1$ の列は $1,\omega$（$L1=\omega$、$L\omega=0$）で、1形式の列はそれぞれ一項だけ。従って

$$
\mathcal A^0=P^0,\quad
\mathcal A^1=P^1,\quad
\mathcal A^2=LP^0=\mathbb C\omega.
$$

**複素次元2。** 第2節の五次元空間 $P^2$ が $\mathcal A^2$ の基本形式方向 $\mathbb C\omega$ と直交する。$L^2:P^0\to\mathcal A^4$ は、[前章の冪の計算](../HOD1-02/index.md#thm-hod1-02-commutator)で $\omega^2=-2\xi_1\wedge\xi_2\ne0$ だから同型である。$L:P^1\to\mathcal A^3$ は、[点ごとの同型](#thm-hod1-03-pointwise-isomorphism)の $k=1$ の場合である。

**複素次元3。** [原始形式の次元公式](#cor-hod1-03-dimension)から

$$
(\dim P^0,\dim P^1,\dim P^2,\dim P^3)
=(1,6,14,14).
$$

たとえば $\dim\mathcal A^4=\binom64=15$ であり、[直交分解](#thm-hod1-03-decomposition)は $\mathcal A^4=LP^2\oplus^\perp L^2P^0$ として $14+1=15$ に分ける。次の演習では、この抽象分解を実際の係数へ戻す。

## 7. 演習：交換子・原始条件・分解・同型を自分で使う

### Level A：基本操作と次数を確かめる

<a id="ex-hod1-03-a01"></a>
#### HOD1-03-A01 交換子を具体的な次数で検算
- Level: A

複素次元 $n=2$ の点で $H=[\Lambda,L]$ とする。$1\in\mathcal A^0$、任意の $\eta\in\mathcal A^1$、基本形式 $\omega=L1\in\mathcal A^2$ に対する $H$ の作用を求め、$[H,L]1=-2L1$ と $[H,\Lambda]\omega=2\Lambda\omega$ を直接計算せよ。

<!-- solution-start -->
### 詳細解答

[次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)に $n=2$ と次数 $0,1,2$ を順に入れると

$$
H1=2,\qquad H\eta=\eta,\qquad H\omega=0.
$$

よって $L1=\omega$ と $L(2)=2\omega$ を使い

$$
[H,L]1=H\omega-L(H1)=0-2\omega=-2L1.
$$

また[前章の随伴計算](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)では $\Lambda\omega=2$ である。$H$ は零形式に $2$ を掛け、$H\omega=0$ だから

$$
[H,\Lambda]\omega=H(2)-\Lambda(0)=4
=2\Lambda\omega.
$$

両辺とも零形式であり、次数を取り違えていない。
<!-- solution-end -->

<a id="ex-hod1-03-a02"></a>
#### HOD1-03-A02 原始条件を係数で判定
- Level: A

複素次元2の正規直交余標構で $\xi_j=\theta^j\wedge\bar\theta^j$ とする。

$$
\alpha=a\xi_1+b\xi_2+c\,\theta^1\wedge\bar\theta^2
$$

（$a,b,c\in\mathbb C$）が原始2形式である必要十分条件を求め、その条件と $L\alpha=0$ が一致することを外積で確かめよ。

<!-- solution-start -->
### 詳細解答

[随伴のunitary表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)では、$\Lambda\xi_j=-i$、$\Lambda(\theta^1\wedge\bar\theta^2)=0$。従って

$$
\Lambda\alpha=-ia-ib=-i(a+b),
$$

よって[原始形式の定義](#def-hod1-03-primitive)から必要十分条件は $a+b=0$。

一方 $\omega=i(\xi_1+\xi_2)$ であり、$\xi_1^2=\xi_2^2=0$、$\xi_1\xi_2=\xi_2\xi_1$ である。交差型の項は $\xi_1$ と外積すれば $\theta^1$ が、$\xi_2$ と外積すれば $\bar\theta^2$ が重なるので零。従って

$$
L\alpha
=i(\xi_1+\xi_2)\wedge(a\xi_1+b\xi_2)
=i(a+b)\xi_1\wedge\xi_2.
$$

$\xi_1\wedge\xi_2$ は非零の4形式だから、$L\alpha=0$ と $a+b=0$ は同値である。これは $n-k+1=1$ の[高冪による判定](#prop-hod1-03-primitive-power)の直接検算である。
<!-- solution-end -->

<a id="ex-hod1-03-a03"></a>
#### HOD1-03-A03 列の係数とノルム
- Level: A

複素次元3の正規直交1形式 $v=\theta^1$ をとる。$v$ が原始であることを示し、$\Lambda Lv$、$\Lambda L^2v$、$\|Lv\|^2$、$\|L^2v\|^2$、$L^3v$ を求めよ。$\|v\|=1$ とする。

<!-- solution-start -->
### 詳細解答

$v$ は次数1なので $\Lambda v\in\mathcal A^{-1}=0$、従って原始である。$n=3,k=1$ より $m=n-k=2$。[列公式](#lem-hod1-03-primitive-ladder)へ $r=1$ と $r=2$ を代入すると

$$
\Lambda Lv=1(2-1+1)v=2v,\quad
\Lambda L^2v=2(2-2+1)Lv=2Lv.
$$

[点ごとの随伴性](../HOD1-02/index.md#def-hod1-02-lambda)と $\|v\|=1$ から

$$
\|Lv\|^2=\langle v,\Lambda Lv\rangle=2,\qquad
\|L^2v\|^2=\langle Lv,\Lambda L^2v\rangle=2\cdot2=4.
$$

$r=3$ では $\Lambda L^3v=3(2-3+1)L^2v=0$。さらに

$$
\|L^3v\|^2=\langle L^2v,\Lambda L^3v\rangle=0
$$

なので $L^3v=0$。単に次数7が範囲外だと説明するのではなく、列公式と随伴でも終端が確認できた。
<!-- solution-end -->

<a id="ex-hod1-03-a04"></a>
#### HOD1-03-A04 原始形式の次元
- Level: A

複素次元3の点で $\dim\mathcal A^k$ と $\dim P^k$ を $k=0,1,2,3$ について計算せよ。さらに $\mathcal A^4$ の分解の各成分の次元を確かめよ。

<!-- solution-start -->
### 詳細解答

複素化した余接空間の次元は $2n=6$ であり、昇順添字を $k$ 個選ぶので $\dim\mathcal A^k=\binom6k$。[原始次元の系](#cor-hod1-03-dimension)を適用すると

| $k$ | $\dim\mathcal A^k$ | $\dim P^k$ |
|---|---:|---:|
| $0$ | $1$ | $1-0=1$ |
| $1$ | $6$ | $6-0=6$ |
| $2$ | $15$ | $15-1=14$ |
| $3$ | $20$ | $20-6=14$ |

$q=4$ に[点ごとのLefschetz分解](#thm-hod1-03-decomposition)を適用すると $\mathcal A^4=LP^2\oplus^\perp L^2P^0$。両写像は原始列の範囲内で単射だから、次元は順に $14,1$。和 $15$ は $\binom64=15$ に一致する。
<!-- solution-end -->

### Level B：複数の結果を組み合わせる

<a id="ex-hod1-03-b01"></a>
#### HOD1-03-B01 原始成分への直交射影
- Level: B

複素次元3のunitary余標構で $\xi_j=\theta^j\wedge\bar\theta^j$、$\omega=i(\xi_1+\xi_2+\xi_3)$ とする。$\alpha=a_1\xi_1+a_2\xi_2+a_3\xi_3$（$a_j\in\mathbb C$）を $\alpha=t\omega+\alpha_0$、$\Lambda\alpha_0=0$ と分けよ。$t$ の一意性、両成分の直交性を示し、それぞれのノルムを求めよ。

<!-- solution-start -->
### 詳細解答

[前章の随伴表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)から $\Lambda\xi_j=-i$、$\Lambda\omega=3$。$S=a_1+a_2+a_3$ と書くと

$$
\Lambda(\alpha-t\omega)=-iS-3t.
$$

これが零となる唯一の値は $t=-iS/3$。従って $t\omega=(S/3)(\xi_1+\xi_2+\xi_3)$ であり、

$$
\alpha_0=\sum_{j=1}^3\left(a_j-\frac S3\right)\xi_j.
$$

$\Lambda\omega=3\ne0$ だから $t$ は一意である。[点ごとの随伴性](../HOD1-02/index.md#def-hod1-02-lambda)を $1$ と $\alpha_0$ に使えば

$$
\langle\omega,\alpha_0\rangle
=\langle L1,\alpha_0\rangle
=\langle1,\Lambda\alpha_0\rangle=0.
$$

三つの $\xi_j$ は正規直交だから

$$
\|t\omega\|^2=3|t|^2=\frac{|S|^2}{3},\qquad
\|\alpha_0\|^2=\sum_{j=1}^3\left|a_j-\frac S3\right|^2.
$$

最後の式を展開すると $\sum|a_j|^2-|S|^2/3$ である。二つを足すと $\|\alpha\|^2=\sum|a_j|^2$ に戻り、直交分解を数値でも検証できる。
<!-- solution-end -->

<a id="ex-hod1-03-b02"></a>
#### HOD1-03-B02 階乗係数の再導出
- Level: B

複素次元 $n$ のHermiteベクトル空間で、非零原始形式 $v\in P^k$ と $m=n-k$ をとる。[原始列の交換子公式](#lem-hod1-03-primitive-ladder)

$$
\Lambda L^rv=r(m-r+1)L^{r-1}v
$$

を使い、$0\le r\le m$ のノルム公式を帰納法で再導出せよ。その上で $n=4,k=1$、$\|v\|=1$ のとき、$\|L^2v\|^2$、$\|L^3v\|^2$、$L^4v$ を求めよ。

<!-- solution-start -->
### 詳細解答

$r=0$ では $0!m!/(m-0)!=1$ なので成り立つ。$r-1$ までの式を仮定し、[点ごとの随伴関係](../HOD1-02/index.md#def-hod1-02-lambda)に[原始列公式](#lem-hod1-03-primitive-ladder)を代入する。

$$
\begin{aligned}
\|L^rv\|^2
&=\langle L^{r-1}v,\Lambda L^rv\rangle\\
&=r(m-r+1)\|L^{r-1}v\|^2\\
&=r(m-r+1)\frac{(r-1)!\,m!}{(m-r+1)!}\|v\|^2\\
&=\frac{r!\,m!}{(m-r)!}\|v\|^2.
\end{aligned}
$$

$n=4,k=1$ なら $m=3$ で、$r=2,3$ の順に

$$
\|L^2v\|^2=\frac{2!\,3!}{1!}=12,\qquad
\|L^3v\|^2=\frac{3!\,3!}{0!}=36.
$$

$r=m+1=4$ のときは $\Lambda L^4v=4(3-4+1)L^3v=0$。ゆえに $\|L^4v\|^2=\langle L^3v,\Lambda L^4v\rangle=0$ で $L^4v=0$。正定値性が最後の結論に必要である。
<!-- solution-end -->

<a id="ex-hod1-03-b03"></a>
#### HOD1-03-B03 真ん中を越える1回の同型
- Level: B

複素次元 $n\ge1$ のHermiteベクトル空間で、$L:\mathcal A^{n-1}\to\mathcal A^{n+1}$ が同型であることを、一般のLefschetz分解を使わずに示せ。さらにこの証明が一般Hermite多様体でも点ごとに成立する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$\alpha\in\mathcal A^{n-1}$ をとる。[Lefschetz交換子の次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)で次数 $k=n-1$ として内積を取ると

$$
\|L\alpha\|^2-\|\Lambda\alpha\|^2
=(n-(n-1))\|\alpha\|^2=\|\alpha\|^2.
$$

$L\alpha=0$ と仮定すれば左辺は $-\|\Lambda\alpha\|^2\le0$、右辺は $\|\alpha\|^2\ge0$。両者が等しいため $\|\alpha\|^2=0$、正定値性から $\alpha=0$。従って $L$ は単射。

一方 $\dim\mathcal A^{n-1}=\binom{2n}{n-1}$、$\dim\mathcal A^{n+1}=\binom{2n}{n+1}$ である。二項係数の対称性

$$
\binom{2n}{n+1}=\binom{2n}{2n-(n+1)}
=\binom{2n}{n-1}
$$

から次元は等しい。有限次元の同次元空間間の単射は全射でもあるので同型。使ったのは各点の正定値内積、$L^*=\Lambda$、交換子公式だけで、$d\omega=0$ や大域積分を一度も使っていない。
<!-- solution-end -->

<a id="ex-hod1-03-b04"></a>
#### HOD1-03-B04 高冪の核から原始条件へ
- Level: B

$0\le k\le n$ の形式 $\alpha$ が $L^{n-k+1}\alpha=0$ を満たすとする。[点ごとの直交分解](#thm-hod1-03-decomposition)と[原始列の非消滅](#lem-hod1-03-primitive-ladder)から、$\Lambda\alpha=0$ を証明せよ。特に $n=2,k=2$ のとき、この判定が $L\alpha=0$ になることを説明せよ。

<!-- solution-start -->
### 詳細解答

[直交分解](#thm-hod1-03-decomposition)を次数 $k$ に使うと、$\alpha=\sum_{r\ge0}L^rv_r$、$v_r\in P^{k-2r}$ と一意に書ける。$v_r$ の列の最大指数は $m_r=n-(k-2r)=n-k+2r$ である。

$r=0$ では $L^{n-k+1}v_0=L^{m_0+1}v_0=0$。$r\ge1$ なら作用後の指数 $s_r=r+n-k+1$ と最大指数の差は

$$
m_r-s_r=(n-k+2r)-(r+n-k+1)=r-1\ge0.
$$

従って $v_r\ne0$ なら[ノルム公式](#lem-hod1-03-primitive-ladder)により $L^{s_r}v_r\ne0$。さらに $r$ の異なる像は、同じ目標次数における原始出発次数 $k-2r$ の異なる直交成分に入る。ゆえにこれらが相殺して零になることはなく、仮定 $L^{n-k+1}\alpha=0$ は $v_r=0$（全 $r\ge1$）を強制する。

残った $\alpha=v_0\in P^k$ は定義から $\Lambda\alpha=0$。$n=k=2$ の場合は指数 $n-k+1=1$ なので、単純に $L\alpha=0$ が原始2形式の判定になる。この一致は全次数へ無条件には拡張できない。
<!-- solution-end -->

### Level C：三複素次元で分解・核・同型を同時に使う

<a id="ex-hod1-03-c01"></a>
#### HOD1-03-C01 跡成分・原始成分とLefschetz同型
- Level: C

複素次元3のHermiteベクトル空間に正規直交余標構 $\theta^1,\theta^2,\theta^3$ を取り、$\xi_j=\theta^j\wedge\bar\theta^j$、$\omega=i(\xi_1+\xi_2+\xi_3)$ とする。任意の複素係数 $a,b,c,d$ に対し

$$
\alpha=a\xi_1+b\xi_2+c\xi_3+d\,\theta^1\wedge\bar\theta^2
\in\mathcal A^2
$$

と置く。以下を示せ。

1. $\alpha=t\omega+\alpha_0$、$\alpha_0\in P^2$ の一意な分解を具体的に求め、直交性とノルムの加法を確認する。
2. $L^2\alpha=-2(a+b+c)\xi_1\wedge\xi_2\wedge\xi_3$ を外積から直接計算し、$\alpha\in P^2$ と $L^2\alpha=0$ が同値であることを確かめる。
3. $L:\mathcal A^2\to\mathcal A^4$ が同型になる仕組みを、$P^2$ と $P^0$ の列の長さおよび分解の対応を示して説明する。

<!-- solution-start -->
### 詳細解答

**1. 原始分解とノルム。** [随伴表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)で $\Lambda\xi_j=-i$、異なる添字の $\theta^1\wedge\bar\theta^2$ は $\Lambda$ で零となる。$S=a+b+c$ と置けば

$$
\Lambda\alpha=-iS,\qquad \Lambda\omega=3.
$$

従って $\Lambda(\alpha-t\omega)=0$ の解は $t=-iS/3$ に限る。これを代入して

$$
\begin{aligned}
t\omega&=\frac S3(\xi_1+\xi_2+\xi_3),\\
\alpha_0&=\left(a-\frac S3\right)\xi_1
+\left(b-\frac S3\right)\xi_2
+\left(c-\frac S3\right)\xi_3
+d\,\theta^1\wedge\bar\theta^2.
\end{aligned}
$$

四つの外積単項式は正規直交で、$\omega$ は対角の三つの和である。$\alpha_0$ の対角係数の和は $S-S=0$、交差項は $\omega$ と直交するので $\langle\omega,\alpha_0\rangle=0$。また

$$
\begin{aligned}
\|t\omega\|^2&=\frac{|S|^2}{3},\\
\|\alpha_0\|^2
&=\left|a-\frac S3\right|^2+
\left|b-\frac S3\right|^2+
\left|c-\frac S3\right|^2+|d|^2\\
&=|a|^2+|b|^2+|c|^2+|d|^2-\frac{|S|^2}{3}.
\end{aligned}
$$

従って $\|\alpha\|^2=\|t\omega\|^2+\|\alpha_0\|^2$ が成り立つ。[直交分解](#thm-hod1-03-decomposition)の $\mathcal A^2=P^2\oplus^\perp LP^0$ を係数で実現したことになる。

**2. 高冪の核。** 偶次数の $\xi_j$ は可換で、同じ $\xi_j$ を2回掛けると零になる。従って

$$
\omega^2
=-(\xi_1+\xi_2+\xi_3)^2
=-2(\xi_1\xi_2+\xi_1\xi_3+\xi_2\xi_3).
$$

$\xi_j$ を掛けると、上の三項のうち添字 $j$ を含まない一項だけが残る。よって対角部分の積は $-2S\,\xi_1\xi_2\xi_3$ である。交差項 $\theta^1\wedge\bar\theta^2$ は、どの $\xi_i\xi_j$ と掛けても $\theta^1$ または $\bar\theta^2$ が重複するから零。結局

$$
L^2\alpha=\omega^2\wedge\alpha=-2S\,\xi_1\wedge\xi_2\wedge\xi_3.
$$

最右辺の6形式は非零であるから $L^2\alpha=0$ と $S=0$ は同値。最初に求めた $\Lambda\alpha=-iS$ も同時に零となるので、原始判定が両方向に確かめられた。

**3. 同型の列ごとの確認。** $n=3$ で $v\in P^2$ とすると $m=3-2=1$ であり、[ノルム公式](#lem-hod1-03-primitive-ladder)から

$$
v\xrightarrow{L}Lv,\qquad \|Lv\|^2=\|v\|^2.
$$

従って $L:P^2\to LP^2$ は単射かつ像への同型である。一方 $P^0$ の元 $1$ は $m=3$ の列を作る。

$$
1\xrightarrow{L}\omega\xrightarrow{L}\omega^2
\xrightarrow{L}\omega^3.
$$

$L:LP^0\to L^2P^0$ は $c\omega\mapsto c\omega^2$ で、$\omega^2\ne0$（上の式の三項が独立）だから同型である。

[点ごとのLefschetz分解](#thm-hod1-03-decomposition)により

$$
\begin{aligned}
\mathcal A^2&=P^2\oplus^\perp LP^0,\\
\mathcal A^4&=LP^2\oplus^\perp L^2P^0.
\end{aligned}
$$

それぞれの対応で $L$ が同型となり、二つの像は異なる直交成分に入る。従って和全体でも $L:\mathcal A^2\to\mathcal A^4$ は同型である。これは[点ごとのLefschetz同型](#thm-hod1-03-pointwise-isomorphism)で $n-k=1$ とした場合であり、コホモロジー上の議論は使っていない。
<!-- solution-end -->

## 8. 次へ：線形代数だけではKähler恒等式にならない

ここまでに、原始形式から伸びる列の長さを随伴の正値性で決め、全形式の直交分解と点ごとのLefschetz同型を証明した。**これらはHermite計量のある各点で成立する。**

次章では初めてKähler条件を本質的に使い、$L,\Lambda$ と $\partial,\bar\partial$ の交換子を局所座標で計算する。その先に進んで、$L$ が調和形式を保つと示して初めて、点ごとの同型をde Rhamコホモロジーの同型へ移せる。
