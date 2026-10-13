# CM2-01 (p,q)形式と型分解

<!-- definition-example-audit: strict -->

## 1. 接ベクトルの型から、微分形式の型へ

[CM1-04の接空間の型分解](../CM1-04/index.md#thm-cm1-04-splitting)により、複素多様体 $X$ の各点で、複素化した接空間は $(1,0)$ 方向と $(0,1)$ 方向に分かれる。では、二つの方向を入力に取る微分2形式はどう分類できるだろうか。

複素座標 $z=x+iy$ のもとで、実1形式 $dx,dy$ を複素係数で組み合わせると

$$
dz=dx+i\,dy,\qquad d\bar z=dx-i\,dy
$$

となる。$dz$ は $\partial/\partial\bar z$ を消し、$d\bar z$ は $\partial/\partial z$ を消す。したがって、ベクトルの型と双対な「余ベクトルの型」を作れる。二次元以上では $dz^1\wedge d\bar z^2$ のような外積にも型を付けられる。

これは単なる記号の整理ではない。実微分形式を複素多様体の正則な座標変換と整合する成分へ分けることが、次章で外微分を $\partial$ と $\bar\partial$ に分解するための準備になる。この章では**微分形式の型そのもの**を構成し、その不変性と計算法を証明する。

## 2. 複素余接空間と二種類の1形式

$X$ を複素次元 $n\ge1$ の複素多様体とする。基礎となる実多様体の余接空間を $\mathbb C$ で複素化したものを $T_x^*X\otimes_{\mathbb R}\mathbb C$ と書く。ここで $T_x^*X$ は実線形汎関数の空間であり、複素化した余接空間は実接空間の複素化の**複素線形双対**として作用する。

[複素化した接空間の直和分解](../CM1-04/index.md#thm-cm1-04-splitting)を双対化して、片方の型の接ベクトルを消す余ベクトルを取る。

<a id="def-cm2-01-cotangent-types"></a>

<!-- formal-statement-start -->
> **定義（型別複素余接空間）**  
> 複素多様体 $X$ の点 $x$ で、$\mathbb C$ 線形な余ベクトル $\lambda\in T_x^*X\otimes_{\mathbb R}\mathbb C$ のうち、$T_x^{0,1}X$ の全ベクトルを消すものの空間を $T_x^{*1,0}X$、$T_x^{1,0}X$ の全ベクトルを消すものの空間を $T_x^{*0,1}X$ とする。
>
> これらをそれぞれ $(1,0)$ 型、$(0,1)$ 型の余接空間という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-01-cotangent-types -->
**定義の確認**。$\mathbb C$ の $z=x+iy$ 座標で

$$
\frac{\partial}{\partial z}
=\frac12\left(\frac{\partial}{\partial x}-i\frac{\partial}{\partial y}\right),
\quad
\frac{\partial}{\partial\bar z}
=\frac12\left(\frac{\partial}{\partial x}+i\frac{\partial}{\partial y}\right)
$$

である。$dx(\partial_x)=1,\;dy(\partial_y)=1$ と交差項の消滅を使うと

$$
\begin{aligned}
dz(\partial_z)&=\tfrac12(1+i(-i))=1,\\
dz(\partial_{\bar z})&=\tfrac12(1+i i)=0,\\
d\bar z(\partial_z)&=\tfrac12(1- i(-i))=0,\\
d\bar z(\partial_{\bar z})&=\tfrac12(1-i i)=1.
\end{aligned}
$$

したがって $dz$ は $(1,0)$ 型、$d\bar z$ は $(0,1)$ 型である。消すべき部分空間を実際に評価したので、単なる名称による分類ではない。
<!-- definition-example-end -->

<a id="prop-cm2-01-cotangent-splitting"></a>

<!-- formal-statement-start -->
> **命題（余接空間の直和と局所基底）**  
> 複素次元 $n$ の複素多様体 $X$ と任意の $x\in X$ に対し、

$$
T_x^*X\otimes_{\mathbb R}\mathbb C
=T_x^{*1,0}X\oplus T_x^{*0,1}X
$$

> が成り立つ。両成分の複素次元は $n$ である。正則局所座標 $z^1,\ldots,z^n$ において、第一成分は $dz^1,\ldots,dz^n$、第二成分は $d\bar z^1,\ldots,d\bar z^n$ を基底とする。
<!-- formal-statement-end -->

### 証明の見取り図

接空間の二つの直和因子に対する制限写像を考えれば、余ベクトルは二つの制限値で一意に決まる。座標基底では $dz^j$ と $\partial_{z^k}$ の評価が Kronecker のデルタになる。

<!-- proof-start -->
### 証明

$V=T_xX\otimes_{\mathbb R}\mathbb C$、$V^+=T_x^{1,0}X$、$V^-=T_x^{0,1}X$ とおく。[接空間の型分解](../CM1-04/index.md#thm-cm1-04-splitting)により $V=V^+\oplus V^-$ である。任意の $\lambda\in V^*$ に対し

$$
\lambda^+(v^++v^-)=\lambda(v^+),
\qquad
\lambda^-(v^++v^-)=\lambda(v^-)
$$

と定める。分解は一意だから両者は well-defined な複素線形形式となり、$\lambda=\lambda^++\lambda^-$ である。$\lambda^+$ は $V^-$ を消し、$\lambda^-$ は $V^+$ を消す。両者が同時に両方を消すなら $V$ 全体を消すので、共通部分は零である。従って直和。

制限 $\lambda^+\mapsto\lambda^+|_{V^+}$ は $(V^+)^*$ への同型で、$\dim_{\mathbb C} V^+=n$ から第一因子の次元は $n$。第二因子も同様である。

正則座標で、$dz^j(\partial_{z^k})=\delta_{jk}$、$dz^j(\partial_{\bar z^k})=0$ を前の一変数計算の各座標への適用で得る。したがって $dz^1,\ldots,dz^n$ は第一成分の双対基底である。共役を取って第二成分も得られる。$\square$
<!-- proof-end -->

局所基底が具体的なので、一般の複素1形式は

$$
\eta=\sum_{j=1}^n a_j\,dz^j+\sum_{j=1}^n b_j\,d\bar z^j
$$

と一意に書ける。係数 $a_j,b_j$ は局所的な滑らかな複素数値関数であり、**正則関数である必要はない**。形式の型と係数の正則性は異なる条件である。

## 3. 外積を使った (p,q) 型の構成

[GEO7で扱った微分形式と外積](../../GEO/GEO7/index.md#def-geo7-form-wedge)は、交代的な多重線形形式を組み立てる操作だった。複素化後も外積を $\mathbb C$ 双線形に延長できる。二つの型別余接空間からそれぞれ $p$ 個と $q$ 個を選び、外積で合わせたものが次の主役である。

<a id="def-cm2-01-pq-form"></a>

<!-- formal-statement-start -->
> **定義（型別微分形式）**  
> $X$ を複素次元 $n$ の複素多様体、$p,q$ を $0\le p,q\le n$ の整数とする。各点で

$$
\Lambda^{p,q}T_x^*X
=\Lambda^p T_x^{*1,0}X\wedge
\Lambda^q T_x^{*0,1}X
$$

> とおく。この部分空間を滑らかに動く部分束 $\Lambda^{p,q}T^*X$ の滑らかな切断を **$(p,q)$ 形式**という。全体を $\Omega^{p,q}(X)$ と書く。$p=0$ または $q=0$ では対応する0次外冪を $\mathbb C$ とする。零形式の空間は $\Omega^{0,0}(X)=C^\infty(X;\mathbb C)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-01-pq-form -->
**定義の確認**。$\mathbb C^2$ 上の

$$
\alpha=(z^1+\bar z^2)\,dz^1\wedge d\bar z^2
$$

は $(1,1)$ 形式である。入力を $\partial_{\bar z^1},\partial_{z^2}$ とすると、$dz^1$ は第一入力で零、$d\bar z^2$ は第二入力で零なので、外積の二項はともに零。一方、$\partial_{z^1},\partial_{\bar z^2}$ に代入すると、外積の定義から $\alpha(\partial_{z^1},\partial_{\bar z^2})=z^1+\bar z^2$。型を決めるのは一つ目と二つ目の方向の組合せであり、係数が $\bar z^2$ を含んでいても型は変わらない。
<!-- definition-example-end -->

昇順添字列 $I=(i_1<\cdots<i_p)$ と $J=(j_1<\cdots<j_q)$ について、$dz^I=dz^{i_1}\wedge\cdots\wedge dz^{i_p}$、$d\bar z^J=d\bar z^{j_1}\wedge\cdots\wedge d\bar z^{j_q}$ と記す。添字集合が空なら対応する積は $1$ とする。両者で同じ添字が現れても、$dz^j$ と $d\bar z^j$ は**別の余ベクトル**なので外積が必ず零になるわけではない。

<a id="thm-cm2-01-type-decomposition"></a>

<!-- formal-statement-start -->
> **定理（複素微分形式の型分解）**  
> $X$ を複素次元 $n$ の複素多様体とする。任意の整数 $0\le k\le2n$ で、複素数値の滑らかな $k$ 次形式全体は次の直和に一意に分解する。

$$
\Omega^k(X;\mathbb C)
=\bigoplus_{\substack{p+q=k\\0\le p,q\le n}}\Omega^{p,q}(X).
$$

> 正則座標 $z^1,\ldots,z^n$ で各 $(p,q)$ 成分は一意に

$$
\alpha^{p,q}
=\sum_{\lvert I\rvert=p,\lvert J\rvert=q}
a_{I\bar J}\,dz^I\wedge d\bar z^J
$$

> と表される。ただし係数は滑らかな複素数値関数であり、各点の $(p,q)$ 成分の複素次元は $\binom np\binom nq$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基底が $dz^1,\ldots,dz^n,d\bar z^1,\ldots,d\bar z^n$ と二群に分かれているので、$k$ 個の基底の外積は第一群から何個取ったかで分類できる。異なる分類は同じ基底外積を共有しない。これで存在、一意性、次元が同時に決まる。

<!-- proof-start -->
### 証明

[余接分解](#prop-cm2-01-cotangent-splitting)から、各点の複素余接空間の基底は上記の $2n$ 個である。交代 $k$ 次形式の空間の基底は、この $2n$ 個から重複なしで $k$ 個選んだ外積である。外積の符号規則を使えば、各基底積を「まず $dz$ を添字昇順、次に $d\bar z$ を添字昇順」に一意に並べ替えられる。

$p$ 個の $dz$ と $q=k-p$ 個の $d\bar z$ を選ぶ基底は

$$
\{dz^I\wedge d\bar z^J:|I|=p,\ |J|=q\}
$$

であり、その個数は $\binom np\binom nq$。$p+q=k$ にわたる集合の合併は全 $k$ 次基底で、異なる型の基底は重ならない。よって各点で所望の直和分解が成り立つ。

滑らかな $k$ 次形式はこの局所基底で滑らかな係数を持つ。$p,q$ ごとの成分を係数に従って取り出すと滑らかな形式となる。座標を替えた場合にも型が保たれることは次節で証明するので、これらの局所成分は大域的な切断として貼り合わさる。$\square$
<!-- proof-end -->

例えば複素次元 $2$ の2形式は $(2,0),(1,1),(0,2)$ に分かれ、各複素次元はそれぞれ $1,4,1$ である。合計 $1+4+1=6=\binom42$ と、複素化した実4次元空間の2次外冪の次元に一致する。

## 4. 正則座標変換でも型が変わらない

型が特定のチャートの記号に過ぎないなら、多様体上で使う価値はない。[複素アトラスの遷移写像の正則性](../CM1-01/index.md#def-cm1-01-atlas)により、座標 $w^a=w^a(z^1,\ldots,z^n)$ は $\bar z$ 方向へ変化しない。この事実を1形式の変換へ書き直す。

<a id="thm-cm2-01-coordinate-invariance"></a>

<!-- formal-statement-start -->
> **定理（型別形式の座標不変性）**  
> 複素多様体 $X$ の重なり合う正則座標 $z,w$ に対し、各 $p,q$ の部分束 $\Lambda^{p,q}T^*X$ と成分への射影は座標選択によらない。局所基底の変換は

$$
dw^a=\sum_j\frac{\partial w^a}{\partial z^j}dz^j,\qquad
d\bar w^a=\sum_j\overline{\frac{\partial w^a}{\partial z^j}}d\bar z^j
$$

> であり、$(1,0)$ 形式と $(0,1)$ 形式が混ざらない。
<!-- formal-statement-end -->

### 証明の見取り図

実の連鎖律を複素偏微分で書くと一般には $dz$ 項と $d\bar z$ 項が現れる。正則遷移では $\partial w^a/\partial\bar z^j=0$ なので、交差する項が消える。外積はこの二種類の基底の個数を保存する。

<!-- proof-start -->
### 証明

滑らかな複素数値関数 $f$ に対して、実微分の連鎖律と $dx^j=(dz^j+d\bar z^j)/2$、$dy^j=(dz^j-d\bar z^j)/(2i)$ を使うと

$$
df=\sum_j \left(
\frac{\partial f}{\partial z^j}dz^j+
\frac{\partial f}{\partial\bar z^j}d\bar z^j
\right)
$$

となる。この等式を $f=w^a$ へ適用する。[正則座標変換の複素微分条件](../CM1-01/index.md#def-cm1-01-atlas)で $\partial w^a/\partial\bar z^j=0$ なので第一式を得る。$\bar w^a$ では $\partial\bar w^a/\partial z^j=0$、$\partial\bar w^a/\partial\bar z^j=\overline{\partial w^a/\partial z^j}$ となり第二式を得る。

各チャート間の複素 Jacobi 行列は、遷移写像の双正則性から可逆である。従って $(dw^a)_a$ と $(dz^j)_j$ は同じ $n$ 次元部分空間の二つの基底、共役側も同様である。外積を取ると、$p$ 個の $dw$ と $q$ 個の $d\bar w$ はすべて $p$ 個の $dz$ と $q$ 個の $d\bar z$ の線形結合となる。逆座標変換でも同じ議論ができるので、両座標の $(p,q)$ 部分空間は一致する。

[型分解定理](#thm-cm2-01-type-decomposition)の直和一意性により各型への射影も一致する。$\square$
<!-- proof-end -->

**局所計算**。$\mathbb C^2$ で $w^1=z^1+z^2,\ w^2=z^2$ と置けば

$$
dw^1\wedge d\bar w^2
=(dz^1+dz^2)\wedge d\bar z^2
$$

となる。右辺は二つとも $(1,1)$ 型である。もし $w^1=z^1+\bar z^2$ に替えると $dw^1=dz^1+d\bar z^2$ となり、一般の実滑らかな座標変更では型が保存されない。ここで正則性の仮定が効いている。

## 5. 外積・共役と実形式

<a id="prop-cm2-01-wedge-conjugation"></a>

<!-- formal-statement-start -->
> **命題（外積の型と複素共役）**  
> 複素多様体 $X$ 上の $\alpha\in\Omega^{p,q}(X)$、$\beta\in\Omega^{r,s}(X)$ に対し、

$$
\alpha\wedge\beta\in\Omega^{p+r,q+s}(X),
\qquad
\overline{\alpha}\in\Omega^{q,p}(X)
$$

> である。右辺の指数が $n$ を超える場合、対応する外積は零とする。局所展開の共役は

$$
\overline{a_{I\bar J}dz^I\wedge d\bar z^J}
=(-1)^{pq}\overline{a_{I\bar J}}\,
dz^J\wedge d\bar z^I
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

積を作ると $dz$ の本数どうし、$d\bar z$ の本数どうしが加算される。共役では $dz$ と $d\bar z$ が入れ替わり、標準順に並べ直すと $pq$ 回の入れ替えが必要になる。

<!-- proof-start -->
### 証明

[型分解定理](#thm-cm2-01-type-decomposition)の局所基底に沿って $\alpha,\beta$ を展開する。単項式ごとの積は

$$
(dz^I\wedge d\bar z^J)\wedge(dz^K\wedge d\bar z^L)
=(-1)^{qr}\,dz^I\wedge dz^K\wedge d\bar z^J\wedge d\bar z^L
$$

である。$d\bar z$ の $q$ 個を $dz$ の $r$ 個の右へ移すため、$qr$ 回符号が変わる。同じ添字が同じ種類の1形式内で重複すれば交代性から零、そうでなければ $(p+r,q+s)$ 型となる。

複素共役は複素係数と各 $dz^i$ を共役に移し、外積を保存するので

$$
\overline{dz^I\wedge d\bar z^J}
=d\bar z^I\wedge dz^J
=(-1)^{pq}dz^J\wedge d\bar z^I.
$$

従って共役は $(q,p)$ 型である。$\square$
<!-- proof-end -->

実係数の微分形式は複素化した形式のうち $\overline\alpha=\alpha$ のものとして判定できる。このとき [型分解の一意性](#thm-cm2-01-type-decomposition)から

$$
\overline{\alpha^{p,q}}=\alpha^{q,p}
$$

が必要十分である。特に $p\ne q$ の**非零の単一 $(p,q)$ 型形式**は実形式にならない。例えば $dz$ 単独は実ではないが、$dz+d\bar z=2dx$ は実である。

<a id="prop-cm2-01-real-eleven"></a>

<!-- formal-statement-start -->
> **命題（実混合型2形式の係数判定）**  
> 正則座標上の $(1,1)$ 形式

$$
\omega=i\sum_{j,k=1}^n h_{j\bar k}\,dz^j\wedge d\bar z^k
$$

> （$h_{j\bar k}$ は滑らかな複素数値関数）が実形式であることと、行列 $H=(h_{j\bar k})$ が各点で Hermite 行列、すなわち $h_{j\bar k}=\overline{h_{k\bar j}}$ を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$i$ の共役による負号と、1形式二つの交換による負号が打ち消し合う。その後、添字 $j,k$ を交換して係数比較する。

<!-- proof-start -->
### 証明

共役を取ると $i$ は $-i$ へ移り、外積の順序も逆になる。よって

$$
\begin{aligned}
\overline\omega
&=-i\sum_{j,k}\overline{h_{j\bar k}}\,
d\bar z^j\wedge dz^k\\
&=i\sum_{j,k}\overline{h_{j\bar k}}\,
dz^k\wedge d\bar z^j\\
&=i\sum_{j,k}\overline{h_{k\bar j}}\,
dz^j\wedge d\bar z^k.
\end{aligned}
$$

[型分解の局所基底](#thm-cm2-01-type-decomposition)は線形独立だから $\overline\omega=\omega$ と全係数の一致は同値であり、指定の Hermite 条件を得る。$\square$
<!-- proof-end -->

標準例 $i\,dz\wedge d\bar z$ は実形式である。実際

$$
i(dx+i\,dy)\wedge(dx-i\,dy)
=i(-2i\,dx\wedge dy)=2\,dx\wedge dy.
$$

$i$ を落とした $dz\wedge d\bar z=-2i\,dx\wedge dy$ は純虚数係数なので実ではない。「$(1,1)$ 型」と「実」の二条件は別である。

## 6. 正則写像による引き戻し

[一般の微分形式の引き戻し](../../GEO/GEO7/index.md#def-geo7-pullback-form)は、写像の微分へ入力ベクトルを送ってから形式で評価する。一般の滑らかな写像では型が混ざるが、正則写像では複素 Jacobi 行列が型を保存する。

<a id="prop-cm2-01-holomorphic-pullback"></a>

<!-- formal-statement-start -->
> **命題（正則引き戻しの型保存）**  
> $X,Y$ を複素多様体、$f:X\to Y$ を正則写像とする。任意の $\alpha\in\Omega^{p,q}(Y)$ に対して、実滑らかな写像として定めた引き戻しは

$$
f^*\alpha\in\Omega^{p,q}(X)
$$

> を満たす。$p$ または $q$ が $X$ の複素次元を超えるとき、引き戻しは零である。$f$ が双正則であることは必要としない。
<!-- formal-statement-end -->

### 証明の見取り図

正則写像の座標成分 $f^a$ は $\bar z$ 微分が零なので、$f^*(dw^a)=d(f^a)$ に $dz$ 成分しかない。共役側も同様で、外積の各因子の個数がそのまま残る。

<!-- proof-start -->
### 証明

$x\in X$ と $f(x)\in Y$ の正則座標をそれぞれ $z^j,w^a$ とする。$f$ の座標成分 $f^a=w^a\circ f\circ z^{-1}$ は正則である。[引き戻しの定義](../../GEO/GEO7/index.md#def-geo7-pullback-form)より

$$
f^*(dw^a)=d(f^a)
=\sum_j\frac{\partial f^a}{\partial z^j}dz^j,
\qquad
f^*(d\bar w^a)
=\sum_j\overline{\frac{\partial f^a}{\partial z^j}}d\bar z^j.
$$

$\alpha$ を [型分解定理](#thm-cm2-01-type-decomposition)の局所基底で展開すると、次のように書ける。

$
\alpha=\sum_{|I|=p,\ |J|=q}a_{I\bar J}\,
dw^I\wedge d\bar w^J.
$

[引き戻しと外積の可換性](../../GEO/GEO7/index.md#prop-geo7-pullback-wedge)を各項に適用する。係数は合成で引き戻し、外積は個々の1形式へ引き戻しを配るので、

$
f^*\alpha
=\sum_{|I|=p,\ |J|=q}
(a_{I\bar J}\circ f)\,
f^*(dw^I)\wedge f^*(d\bar w^J)
$

となる。先ほど求めた1形式の式によって、右辺は必ず $p$ 個の $dz$ と $q$ 個の $d\bar z$ の外積の和である。従って $(p,q)$ 型を保つ。始域側に同じ種類の独立な1形式が足りなければ、各項が交代性により零となる。$\square$
<!-- proof-end -->

**具体例**。$f:\mathbb C\to\mathbb C^2$、$f(z)=(z,z^2)$、$\alpha=dw^1\wedge d\bar w^2$ とする。すると

$$
f^*\alpha=dz\wedge d(\bar z^2)
=dz\wedge(2\bar z\,d\bar z)
=2\bar z\,dz\wedge d\bar z.
$$

$f$ は複素次元の異なる空間を結ぶので双正則ではないが、型は $(1,1)$ のまま保たれる。これと異なり $f(z)=\bar z$ は正則でなく、$f^*(dw)=d\bar z$ と $(1,0)$ 型を $(0,1)$ 型へ移す。

## 7. 演習：型を「判定する」から「組み立てる」へ

### Level A

<a id="ex-cm2-01-a01"></a>
#### CM2-01-A01 複素1形式の成分
- Level: A

$\mathbb C$ で $\eta=(2+i)\,dx+(1-2i)\,dy$ を $a\,dz+b\,d\bar z$ と書き、$a,b$ を求めよ。

<!-- solution-start -->
**詳細解答**。$dx=(dz+d\bar z)/2$、$dy=(dz-d\bar z)/(2i)$ を代入する。

$$
\eta=\left(\frac{2+i}{2}+\frac{1-2i}{2i}\right)dz
+\left(\frac{2+i}{2}-\frac{1-2i}{2i}\right)d\bar z.
$$

$1/i=-i$ なので $(1-2i)/(2i)=-1-i/2$。従って

$$
a=(1+i/2)+(-1-i/2)=0,\qquad
b=(1+i/2)-(-1-i/2)=2+i.
$$

結論は $\eta=(2+i)d\bar z$ で、$(0,1)$ 型である。元の式でも $(2+i)(dx-i\,dy)=(2+i)dx+(1-2i)dy$ と検算できる。
<!-- solution-end -->

<a id="ex-cm2-01-a02"></a>
#### CM2-01-A02 型の次元
- Level: A

複素次元 $3$ で $(2,1)$ 型、$(1,1)$ 型の点ごとの次元を求め、複素3次形式全体の次元を型ごとの和から確認せよ。

<!-- solution-start -->
**詳細解答**。[型分解定理](#thm-cm2-01-type-decomposition)に $n=3$ を入れる。$(2,1)$ 型は $\binom32\binom31=3\cdot3=9$ 次元、$(1,1)$ 型は $\binom31^2=9$ 次元である。

3次形式の型は $(3,0),(2,1),(1,2),(0,3)$ なので、次元の和は

$$
\binom33\binom30+\binom32\binom31+
\binom31\binom32+\binom30\binom33
=1+9+9+1=20.
$$

これは $2n=6$ から3本選ぶ $\binom63=20$ と一致する。
<!-- solution-end -->

<a id="ex-cm2-01-a03"></a>
#### CM2-01-A03 外積の消滅と非消滅
- Level: A

$\mathbb C^2$ 上の $\alpha=dz^1\wedge d\bar z^1$ について、$\alpha\wedge dz^1$ と $\alpha\wedge dz^2$ を求め、それぞれの型と零かどうかを判定せよ。

<!-- solution-start -->
**詳細解答**。一つ目は $dz^1$ を二回含む。外積の交代性から

$$
\alpha\wedge dz^1
=dz^1\wedge d\bar z^1\wedge dz^1
=-dz^1\wedge dz^1\wedge d\bar z^1=0.
$$

二つ目は異なる三本なので

$$
\alpha\wedge dz^2
=dz^1\wedge d\bar z^1\wedge dz^2
=-dz^1\wedge dz^2\wedge d\bar z^1.
$$

非零の $(2,1)$ 型である。非零性は入力 $(\partial_{z^1},\partial_{z^2},\partial_{\bar z^1})$ での値が $-1$ であることから分かる。
<!-- solution-end -->

<a id="ex-cm2-01-a04"></a>
#### CM2-01-A04 実 $(1,1)$ 形式
- Level: A

$\mathbb C$ 上の $dz\wedge d\bar z$ と $i\,dz\wedge d\bar z$ を $dx\wedge dy$ で表し、どちらが実形式か判定せよ。

<!-- solution-start -->
**詳細解答**。$dz=dx+i\,dy$、$d\bar z=dx-i\,dy$ を代入すると、同じ形式の外積は零なので

$$
\begin{aligned}
dz\wedge d\bar z
&=-i\,dx\wedge dy+i\,dy\wedge dx\\
&=-2i\,dx\wedge dy.
\end{aligned}
$$

従って $i\,dz\wedge d\bar z=2\,dx\wedge dy$ である。前者の係数は純虚数、後者は実数だから、後者だけが実形式である。
<!-- solution-end -->

<a id="ex-cm2-01-a05"></a>
#### CM2-01-A05 滑らかな係数と型
- Level: A

$\mathbb C^2$ で $\beta=\bar z^1 z^2\,dz^1\wedge d\bar z^2$ の型を判定し、係数が正則でなくても型が定まることを入力ベクトルへの評価で確かめよ。

<!-- solution-start -->
**詳細解答**。$dz^1$ は $T^{0,1}$ を消し、$d\bar z^2$ は $T^{1,0}$ を消すので、[定義](#def-cm2-01-pq-form)から $(1,1)$ 型である。係数 $\bar z^1 z^2$ は滑らかで、$z^2\ne0$ の開集合では $\partial_{\bar z^1}(\bar z^1 z^2)=z^2\ne0$ なので正則ではない。

それでも

$$
\beta(\partial_{z^1},\partial_{\bar z^2})
=\bar z^1z^2(1\cdot1-0\cdot0)=\bar z^1z^2
$$

であり、入力二本をともに $(1,0)$ 方向にすると $d\bar z^2$ が零になり、二本とも $(0,1)$ 方向にすると $dz^1$ が零になる。従って定義通り $(1,1)$ 型である。
<!-- solution-end -->

### Level B

<a id="ex-cm2-01-b01"></a>
#### CM2-01-B01 非正則な座標変更は型を混ぜる
- Level: B

$\mathbb C^2$ に滑らかな実座標変更 $w^1=z^1+\bar z^2,\ w^2=z^2$ を置く。$dw^1\wedge d\bar w^1$ を $z$ 座標で展開して各型を分類し、この変更が正則アトラスの遷移として使えない理由を述べよ。

<!-- solution-start -->
**詳細解答**。実線形変換としては逆 $z^1=w^1-\bar w^2,\ z^2=w^2$ があるので滑らかな座標変更だが、$\partial w^1/\partial\bar z^2=1$ で正則ではない。微分を計算すると

$$
dw^1=dz^1+d\bar z^2,\qquad
d\bar w^1=d\bar z^1+dz^2.
$$

外積を分配して標準順に並べると

$$
\begin{aligned}
dw^1\wedge d\bar w^1
&=dz^1\wedge d\bar z^1
+dz^1\wedge dz^2\\
&\quad+d\bar z^2\wedge d\bar z^1
+d\bar z^2\wedge dz^2\\
&=dz^1\wedge dz^2
+\left(dz^1\wedge d\bar z^1-dz^2\wedge d\bar z^2\right)
-d\bar z^1\wedge d\bar z^2.
\end{aligned}
$$

第一項は $(2,0)$、括弧内は $(1,1)$、最後は $(0,2)$ 型である。正則な遷移なら $dw^1$ に $d\bar z$ 成分は現れないという [座標不変性定理](#thm-cm2-01-coordinate-invariance)の仮定が失われており、型が混ざることはその機構を具体的に示す。
<!-- solution-end -->

<a id="ex-cm2-01-b02"></a>
#### CM2-01-B02 共役の符号
- Level: B

$\mathbb C^3$ の $\gamma=(2+i)\,dz^1\wedge dz^3\wedge d\bar z^2$ について、$\overline\gamma$ を $dz$ を先に置く標準順に直し、その型を答えよ。続いて $\gamma+\overline\gamma$ が実であることを示せ。

<!-- solution-start -->
**詳細解答**。$(p,q)=(2,1)$ で $pq=2$ は偶数なので、[共役公式](#prop-cm2-01-wedge-conjugation)により

$$
\begin{aligned}
\overline\gamma
&=(2-i)\,d\bar z^1\wedge d\bar z^3\wedge dz^2\\
&=(2-i)\,dz^2\wedge d\bar z^1\wedge d\bar z^3.
\end{aligned}
$$

最後の移動で $dz^2$ を二つの $d\bar z$ と交換したため符号は正のままで、型は $(1,2)$。また複素共役は二回作用させると元へ戻るので、

$$
\overline{\gamma+\overline\gamma}
=\overline\gamma+\gamma.
$$

従って $\gamma+\overline\gamma$ は実3形式である。
<!-- solution-end -->

<a id="ex-cm2-01-b03"></a>
#### CM2-01-B03 Hermite条件を具体的に確認する
- Level: B

$\mathbb C^2$ で

$$
\omega=i\left(2\,dz^1\wedge d\bar z^1
+c\,dz^1\wedge d\bar z^2+
(1-i)\,dz^2\wedge d\bar z^1+
3\,dz^2\wedge d\bar z^2\right)
$$

が実形式となる定数 $c\in\mathbb C$ を求めよ。

<!-- solution-start -->
**詳細解答**。係数行列は

$$
H=\begin{pmatrix}2&c\\1-i&3\end{pmatrix}.
$$

[実 $(1,1)$ 形式の判定](#prop-cm2-01-real-eleven)により、対角成分が実数で非対角成分が互いの共役であることが必要十分。対角成分 $2,3$ は既に実数だから、

$$
c=\overline{1-i}=1+i
$$

を得る。実際この値なら $h_{1\bar2}=1+i=\overline{h_{2\bar1}}$、逆も成立し、$\overline\omega=\omega$ である。
<!-- solution-end -->

<a id="ex-cm2-01-b04"></a>
#### CM2-01-B04 正則写像の引き戻しと次元
- Level: B

$f:\mathbb C\to\mathbb C^2,\ f(z)=(z,z^2)$、$\alpha=dw^1\wedge d\bar w^2$、$\beta=dw^1\wedge dw^2$ とする。$f^*\alpha,f^*\beta$ を求めて、型保存と次元超過による消滅を説明せよ。

<!-- solution-start -->
**詳細解答**。$f$ は多項式成分からなる正則写像なので [型保存命題](#prop-cm2-01-holomorphic-pullback)が適用できる。成分の微分は

$$
f^*dw^1=dz,\quad f^*dw^2=2z\,dz,\quad
f^*d\bar w^2=2\bar z\,d\bar z.
$$

[引き戻しと外積の可換性](../../GEO/GEO7/index.md#prop-geo7-pullback-wedge)を使うと

$$
f^*\alpha=dz\wedge(2\bar z\,d\bar z)
=2\bar z\,dz\wedge d\bar z
$$

で $(1,1)$ 型のまま。一方

$$
f^*\beta=dz\wedge(2z\,dz)=2z\,dz\wedge dz=0.
$$

$\beta$ は $(2,0)$ 型だが、始域の複素次元は $1$ であり、二本の独立な $(1,0)$ 余ベクトルを取れないため消滅する。
<!-- solution-end -->

### Level C

<a id="ex-cm2-01-c01"></a>
#### CM2-01-C01 型分解・実性・引き戻しの総合
- Level: C

$\mathbb C^2$ 上の実座標 $z^j=x^j+iy^j$ に対して、

$$
\theta=dx^1\wedge dx^2+dy^1\wedge dy^2
$$

を考える。

1. $\theta$ を $dz^j,d\bar z^j$ で展開し、$(2,0),(1,1),(0,2)$ 成分を全て求めよ。
2. $\theta$ が実であることを型成分の共役関係から示せ。
3. 正則写像 $g:\mathbb C\to\mathbb C^2,\ g(t)=(t,it)$ に対し $g^*\theta$ を計算せよ。消える項を型からも説明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $dx^j=(dz^j+d\bar z^j)/2$、$dy^j=(dz^j-d\bar z^j)/(2i)$ を代入する。後者の積の係数は $1/(2i)^2=-1/4$ なので

$$
\begin{aligned}
dx^1\wedge dx^2
&=\tfrac14(dz^1\wedge dz^2+dz^1\wedge d\bar z^2
+d\bar z^1\wedge dz^2+d\bar z^1\wedge d\bar z^2),\\
dy^1\wedge dy^2
&=-\tfrac14(dz^1\wedge dz^2-dz^1\wedge d\bar z^2
-d\bar z^1\wedge dz^2+d\bar z^1\wedge d\bar z^2).
\end{aligned}
$$

足すと $(2,0)$ と $(0,2)$ は互いに消え、

$$
\theta=\tfrac12\left(
dz^1\wedge d\bar z^2+d\bar z^1\wedge dz^2\right)
=\tfrac12\left(dz^1\wedge d\bar z^2-dz^2\wedge d\bar z^1\right).
$$

従って $\theta^{2,0}=0,\ \theta^{0,2}=0,\ \theta^{1,1}=\theta$。

**(2)** 共役を取ると

$$
\overline\theta
=\tfrac12(d\bar z^1\wedge dz^2-d\bar z^2\wedge dz^1)
=\tfrac12(-dz^2\wedge d\bar z^1+dz^1\wedge d\bar z^2)
=\theta.
$$

$(1,1)$ 成分が共役により自身へ戻るので、実形式の条件を満たす。

**(3)** $g^*dz^1=dt,\ g^*dz^2=i\,dt,\ g^*d\bar z^1=d\bar t,\ g^*d\bar z^2=-i\,d\bar t$ である。従って

$$
\begin{aligned}
g^*\theta
&=\tfrac12\left(dt\wedge(-i\,d\bar t)-(i\,dt)\wedge d\bar t\right)\\
&=-i\,dt\wedge d\bar t\\
&=-i(-2i\,d(\operatorname{Re}t)\wedge d(\operatorname{Im}t))\\
&=-2\,d(\operatorname{Re}t)\wedge d(\operatorname{Im}t).
\end{aligned}
$$

この引き戻しは実形式で、$(1,1)$ 型を保つ。$(2,0)$、$(0,2)$ 成分はもともと零である。また仮にそのような成分があっても、複素次元1の始域ではそれらの引き戻しは零になる。
<!-- solution-end -->

## 8. まとめと次章への接続

$(p,q)$ という二つの指数は、複素化した余接空間の「$dz$ 側から何本、$d\bar z$ 側から何本」を表す。外積は型を足し、共役は型を交換し、正則座標変換と正則写像の引き戻しは型を保存する。型そのものは係数関数の正則性を要求しない。

[GEO7で定めた外微分](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)は形式の次数を一つ上げるが、一般にはその型は一つに決まらない。次章では、この章の一意な型分解を使い、外微分の出力から $(p+1,q)$ 成分と $(p,q+1)$ 成分を取り出す操作を構成する。
