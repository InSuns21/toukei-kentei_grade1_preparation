# HOD1-12 原始コホモロジーとLefschetz分解

<!-- definition-example-audit: strict -->

## 1. Hard Lefschetzは「同型」を与えた。類の中身も分解できるか

前章の[Hard Lefschetz定理](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)によれば、複素次元 $n$ のコンパクトKähler多様体では、低次数 $k\le n$ から高次数 $2n-k$ へ基本形式を $n-k$ 回掛ける写像が同型になる。しかし同型があるだけでは、例えば中央次数 $H^n$ のうち、**低次数から基本形式を掛けて生まれた部分**と、**それとは独立に新しく現れる部分**は区別できない。

複素二次元の模型として、$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ の二つの因子から来る規格化二次類を $u,v$ とする。[前章の具体例](../HOD1-11/index.md)で

$$
u^2=v^2=0,\qquad uv=vu\ne0,\qquad
[\omega]_d=2\pi(u+v)
$$

を得た。$u+v$ は $H^0$ の単位類に $[\omega]_d$ を掛けたものだが、$u-v$ はどうだろうか。

$$
[\omega]_d\smile(u-v)
=2\pi(u+v)(u-v)
=2\pi(u^2-v^2)=0.
$$

つまり $u-v$ は、基本形式をさらに掛けると零になる独自の成分である。この「列の始まり」に、これから名前と定義を与える。

以下では特に断らなければ $X$ は複素次元 $n\ge1$ の滑らか・コンパクト・境界なしのKähler多様体、$\omega$ は実基本 $(1,1)$ 形式とする。連結性は要求しない。形式とコホモロジーは複素係数とし、

$$
H^k=H_{\mathrm{dR}}^k(X;\mathbb C),\qquad
\mathcal H^k=\ker\Delta_d|_{\Omega^k(X;\mathbb C)}
$$

と略記する。次数範囲外の群・形式空間は零とする。[de Rham類の積](../HOD1-10/index.md#def-hod1-10-de-rham-product)と[調和代表に作用するLefschetz写像](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)に従い、

$$
L_Ha=[\omega]_d\smile a,\qquad
Lh=\omega\wedge h,\qquad
\Lambda=L^*
$$

を区別する。$L_H^0=L^0=I$ とし、$L_H^r$ は $[\omega]_d$ の $r$ 回の積である。$\Lambda$ は[点ごとの随伴の定義](../HOD1-02/index.md#def-hod1-02-lambda)に従う $L$ の随伴であり、任意の閉代表をそのまま $\Lambda$ に通して類を作る操作は定義しない。以下では[Hodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)

$$
\Phi_k:\mathcal H^k\xrightarrow{\;\cong\;}H^k,
\qquad h\longmapsto[h]_d
$$

を通じてのみ $\Lambda$ を類の議論に用いる。

## 2. 高冪の核として原始類を定義する

低次数 $k$ の元を $L_H$ で引き上げると、$n-k$ 回までは[Hard Lefschetz同型](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)によって情報が失われない。そこで、さらに**一回多く**掛けたとき消える部分を選ぶ。この指数の「$+1$」が重要である。

<a id="def-hod1-12-primitive-cohomology"></a>

<!-- formal-statement-start -->
> **定義（原始コホモロジー）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体、$\omega$ を基本形式とする。$0\le k\le n$ に対し、$L_Ha=[\omega]_d\smile a$ とおき、**原始 $k$ 次コホモロジー**を

$$
P_H^k
:=\ker\!\left(
L_H^{n-k+1}:H^k\longrightarrow H^{2n-k+2}
\right)
$$

> と定める。$P_H^k$ の元を原始コホモロジー類という。$k>n$ にはこの記号を定義せず、必要な高次数の成分は低次数の原始類を $L_H$ で移して表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-12-primitive-cohomology -->
**定義の確認：射影直線の積。** 上の $Q$ は $n=2$ であり、$k=2$ では指数 $n-k+1=1$ となる。任意の $a,b\in\mathbb C$ に対して

$$
L_H(au+bv)=2\pi(a+b)uv.
$$

$uv\ne0$ なので $L_H(au+bv)=0$ の必要十分条件は $a+b=0$。従って

$$
P_H^2(Q)=\mathbb C(u-v),\qquad
L_HH^0(Q)=\mathbb C(u+v).
$$

二つは $H^2(Q)=\mathbb Cu\oplus\mathbb Cv$ の異なる一次元部分空間で、交わりは零である（$a(u-v)=b(u+v)$ なら係数比較で $a=b=0$）。定義の核条件だけでなく、どの類が原始でどの類が低次数から来たかまで確認できた。また $k=0$ では $L_H^3:H^0\to H^6=0$ だから $P_H^0=H^0$ である。これは奇妙な例外ではなく、原始列の出発点が次数0にもあることを意味する。
<!-- definition-example-end -->

点ごとの[原始形式の定義](../HOD1-03/index.md#def-hod1-03-primitive)では、$k\le n$ の形式 $h$ が $\Lambda h=0$ であることを用いた。コホモロジー上の核と、この点ごとの条件が一致するのは自明ではない。間をつなぐのが調和代表である。

<a id="thm-hod1-12-harmonic-primitive"></a>

<!-- formal-statement-start -->
> **定理（原始類の調和代表による判定）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とし、$0\le k\le n$ とする。任意の $a\in H^k_{\mathrm{dR}}(X;\mathbb C)$ の一意な調和代表を $h=\Phi_k^{-1}(a)$ とすると、

$$
a\in P_H^k
\quad\Longleftrightarrow\quad
\Lambda h=0
\quad\Longleftrightarrow\quad
L^{n-k+1}h=0.
$$

> 従って $P_H^k$ は調和原始形式の空間

$$
\mathcal P^k:=\mathcal H^k\cap\ker\Lambda
$$

> と $\Phi_k$ によって同型である。
<!-- formal-statement-end -->

### 証明の見取り図

[点ごとの原始判定](../HOD1-03/index.md#prop-hod1-03-primitive-power)は $\Lambda h=0$ と $L^{n-k+1}h=0$ を結ぶ。他方、[調和代表への作用](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)によって後者は原始類の高冪の核へ移る。最後の「類が零なら調和形式も零」はコンパクトHodge理論の一意性である。

<!-- proof-start -->
### 証明

$m=n-k+1\ge1$ と置く。[点ごとの高冪判定](../HOD1-03/index.md#prop-hod1-03-primitive-power)を、任意の点 $x\in X$ の $k$ 形式 $h_x$ に適用すると

$$
\Lambda_xh_x=0\quad\Longleftrightarrow\quad L_x^mh_x=0.
$$

全点で同値だから、滑らかな形式として $\Lambda h=0$ と $L^mh=0$ が同値になる。ここまではコホモロジーを使っていない。

次に、[LaplacianとLの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を次数 $k$ の調和形式 $h$ に $m$ 回適用すれば

$$
\Delta_d(L^mh)=L^m(\Delta_dh)=0.
$$

従って $L^mh$ は次数 $k+2m=2n-k+2$ の調和形式である。さらに[調和形式と類の作用の一致](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)から

$$
\Phi_{2n-k+2}(L^mh)
=L_H^m\Phi_k(h)=L_H^ma.
$$

各次数で $\Phi$ は[Hodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)なので、右辺が零類であることと左側の調和形式 $L^mh$ が零であることは同値。次数が $2n$ を超えるときも、双方を零空間と約束して同じ議論が成立する。定義の核条件へ代入すれば主張を得る。$\square$
<!-- proof-end -->

この定理は「$\Lambda$ が閉形式を閉形式に写す」と主張していない。$\Lambda$ が保存するのは[Kähler上の調和形式](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)であり、調和代表を選んだ後で初めて $\Lambda h$ を扱える。

## 3. 調和空間を原始列へ分ける

次に、単に原始部分を見つけるだけでなく、全ての類を原始部分から一意に組み立てたい。重要なのは、点ごとの[直交Lefschetz分解](../HOD1-03/index.md#thm-hod1-03-decomposition)を滑らかな形式に当てはめただけでは、各成分が**調和**かどうか分からないことである。調和性を保存する $L,\Lambda$ と、その随伴関係を使って分解を調和空間内で行う。

$q\ge0$ とし、調和形式の次数 $q$ を固定する。$L:\mathcal H^{q-2}\to\mathcal H^q$ の $L^2$ 随伴は $\Lambda:\mathcal H^q\to\mathcal H^{q-2}$ である。両者が調和性を保つのは[可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)による。有限次元の内積空間では

$$
(\operatorname{im}L|_{\mathcal H^{q-2}})^\perp
=\ker(\Lambda|_{\mathcal H^q}).
$$

$q\le n$ なら右辺は $\mathcal P^q$ であるから、

$$
\mathcal H^q=\mathcal P^q\oplus^\perp L\mathcal H^{q-2}
\qquad(0\le q\le n).
$$

$q=0,1$ では $L\mathcal H^{q-2}=0$ とする。一方 $q>n$ なら、[点ごとの交換子から得た高次数の $\Lambda$ の単射性](../HOD1-03/index.md#thm-hod1-03-decomposition)により、$\Lambda h=0$ である調和 $q$ 形式は $h=0$。従って

$$
\mathcal H^q=L\mathcal H^{q-2}
\qquad(n<q\le2n).
$$

すなわち、下半分では新しい原始成分を直交補として取り出し、上半分では既にある列を伸ばせる。これを繰り返すと各次数の成分がすべて得られる。

<a id="thm-hod1-12-lefschetz-decomposition"></a>

<!-- formal-statement-start -->
> **定理（全次数のLefschetz直和分解）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体、$\omega$ をその基本形式とする。$0\le q\le2n$ に対し、原始コホモロジー $P_H^j$ を $0\le j\le n$ で上の定義により定める。このとき

$$
H^q_{\mathrm{dR}}(X;\mathbb C)
=\bigoplus_{r=\max(0,q-n)}^{\lfloor q/2\rfloor}
L_H^rP_H^{q-2r}.
$$

> 各項 $L_H^rP_H^{q-2r}$ は $L_H^r$ の像としての部分空間であり、対応する $L_H^r:P_H^{q-2r}\to H^q$ は単射である。和は直和で、すべての類の表示は一意となる。調和代表上では対応する各部分空間は $L^2$ 内積について互いに直交する。
<!-- formal-statement-end -->

### 証明の見取り図

低次数は $\ker\Lambda$ と $\operatorname{im}L$ の直交分解、高次数は $L$ の全射性で張る。原始列の末端を越えた項が零になること、異なる列が直交すること、列内部の $L^r$ が単射であることは[点ごとの原始列公式](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)と[点ごとのLefschetz分解](../HOD1-03/index.md#thm-hod1-03-decomposition)を使用する。最後に調和代表から類へ移す。

<!-- proof-start -->
### 証明

まず調和形式上で示す。[随伴性と調和性](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)より、有限次元内積空間における像の直交補の公式を適用できる。$0\le q\le n$ なら

$$
\mathcal H^q
=\ker(\Lambda|_{\mathcal H^q})\oplus^\perp L\mathcal H^{q-2}
=\mathcal P^q\oplus^\perp L\mathcal H^{q-2}.
$$

右辺の低次数空間に同じ分解を適用する帰納法で

$$
\mathcal H^q=\sum_{r=0}^{\lfloor q/2\rfloor}L^r\mathcal P^{q-2r}
$$

を得る。この段階では異なる $r$ の高冪像の直交性を前提にしていない。

次に $n<q\le2n$ とする。[点ごとのLefschetz分解](../HOD1-03/index.md#thm-hod1-03-decomposition)の高次数側では $\Lambda_x:\mathcal A_x^q\to\mathcal A_x^{q-2}$ は単射である。よって $\Lambda h=0$ を満たす $h\in\mathcal H^q$ は零形式。上の直交補の公式で

$$
(\operatorname{im}L|_{\mathcal H^{q-2}})^\perp=0.
$$

$\mathcal H^q$ は有限次元だから $L:\mathcal H^{q-2}\to\mathcal H^q$ は全射である。既に得た低次数の原始列を $L$ で伸ばし、高次数でも帰納的に全ての形式を表す。

原始次数を $j$、作用回数を $r$ とすると到着次数は $q=j+2r$。[原始列公式](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)より $L^{n-j+1}v=0$（$v\in\mathcal P^j$）であり、非零の列で許される範囲は

$$
0\le j=q-2r\le n,\qquad 0\le r\le n-j.
$$

これを $r$ だけの不等式へ直す。$j\ge0$ は $r\le\lfloor q/2\rfloor$、$r\ge0$ はそのまま、$r\le n-q+2r$ は $r\ge q-n$ となる。従って

$$
\max(0,q-n)\le r\le\lfloor q/2\rfloor.
$$

この範囲では、[原始列のノルム公式](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)を点ごとに適用すると、$v\in\mathcal P^j$ に対して

$$
\|L^rv\|_x^2
=\frac{r!(n-j)!}{(n-j-r)!}\|v\|_x^2
$$

となる。係数は正なので $L^rv=0$ なら $v=0$、従って $L^r$ は各原始調和空間上で単射である。

異なる原始次数 $j\ne j'$ から生じた $L^rv$ と $L^sv'$ が同じ次数 $q$ にあれば、各点で[点ごとの直交分解](../HOD1-03/index.md#thm-hod1-03-decomposition)の異なる項に属する。従って点ごとの内積が零、積分した $L^2$ 内積も零になる。全ての項は互いに直交するから、得られた和は直和である。

最後に、[調和代表とLefschetz作用の対応](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)を各項へ適用すると

$$
\Phi_q(L^rv)=L_H^r\Phi_{q-2r}(v).
$$

また[原始類との対応](#thm-hod1-12-harmonic-primitive)で $\Phi_j(\mathcal P^j)=P_H^j$。各 $\Phi_j$ は同型であるから、直和性・全体を張ること・単射性がそのままコホモロジーへ移る。$\square$
<!-- proof-end -->

**添字の読み方。** $q\le n$ では $r=0$ の新しい原始項がある。$q>n$ では $r\ge q-n\ge1$ であり、**新しい原始項は現れない**。例えば $n=3$ では

$$
\begin{aligned}
H^0&=P_H^0,&H^1&=P_H^1,\\
H^2&=P_H^2\oplus L_HP_H^0,&
H^3&=P_H^3\oplus L_HP_H^1,\\
H^4&=L_HP_H^2\oplus L_H^2P_H^0,&
H^5&=L_H^2P_H^1,\qquad
H^6=L_H^3P_H^0.
\end{aligned}
$$

原始次数が $j$ である列は、$j,j+2,\ldots,2n-j$ の各次数に一度ずつ現れる。特に原始類 $v\ne0$ について、$0\le r\le n-j$ なら $L_H^rv\ne0$、次の $L_H^{n-j+1}v$ は零になる。

## 4. 原始コホモロジーの次元は増分を測る

原始部分は、低次数で以前の列からは作れない新しい自由度を数える。$b_q=\dim_{\mathbb C}H^q$ とおき、負次数のBetti数は $b_{-2}=b_{-1}=0$ と約束する。

<a id="cor-hod1-12-primitive-dimensions"></a>

<!-- formal-statement-start -->
> **系（原始部分の次元）**
> $X$ が滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体で、$0\le k\le n$ なら

$$
\dim_{\mathbb C}P_H^k=b_k-b_{k-2}.
$$

> 特に $b_k\ge b_{k-2}$ が下半分の次数について成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[分解定理](#thm-hod1-12-lefschetz-decomposition)の低次数の場合に $H^k=P_H^k\oplus L_HH^{k-2}$ を使う。$L_H$ の単射性には[Hard Lefschetzの低次数への帰結](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)を用いる。

<!-- proof-start -->
### 証明

$k=0,1$ では $H^{k-2}=0$ なので $P_H^k=H^k$、式は $b_{k-2}=0$ と整合する。$2\le k\le n$ では[低次数の直和](#thm-hod1-12-lefschetz-decomposition)から

$$
H^k=P_H^k\oplus L_HH^{k-2}
$$

である。[Hard Lefschetz同型](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)は $k-2<n$ に対して $L_H^{n-(k-2)}:H^{k-2}\to H^{2n-k+2}$ を単射にする。その冪の最初の一回が $L_H$ だから、$L_Ha=0$ なら高冪も零、よって $a=0$。従って $\dim L_HH^{k-2}=b_{k-2}$。直和の次元を取ると結論を得る。$\square$
<!-- proof-end -->

この公式を次数 $k>n$ にそのまま当てはめてはいけない。上半分は「新たな原始自由度」ではなく、低次数の列を伸ばした部分からなる。

## 5. 複素型ごとに原始成分を取り出す

[Kähler多様体のHodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)によって、調和 $k$ 形式とde Rham類は $p+q=k$ の複素型に直和分解する。また[随伴作用素の型](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)では $\Lambda$ は型を $(p,q)$ から $(p-1,q-1)$ へ移し、$L$ は[型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)により $(p+1,q+1)$ へ移す。

原始類そのものも型別に整理できる。ここで $H^{p,q}(X)$ は[de Rham群のHodge型部分空間](../HOD1-06/index.md#def-hod1-06-hodge-summand)を表す。複素係数Dolbeault群をHodge分解で同定したものである。

<a id="def-hod1-12-primitive-hodge"></a>

<!-- formal-statement-start -->
> **定義（原始Hodge型部分空間）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。$p,q\ge0$、$k=p+q\le n$ に対して、**原始 $(p,q)$ 型部分空間**を

$$
P_H^{p,q}:=P_H^k\cap H^{p,q}(X)
$$

> と定義する。$p<0$、$q<0$ または $p+q>n$ のとき、分解式に現れる $P_H^{p,q}$ は零空間と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-12-primitive-hodge -->
**定義の確認：複素二次元平坦トーラス。** $T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ で、実座標を $z_j=x_j+iy_j$、$\omega=e_1+e_2$、$e_j=dx_j\wedge dy_j$ とする。平坦トーラスの[定数係数調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)を使う。$(2,0)$ 型の $dz_1\wedge dz_2$ は $\Lambda$ の行き先が $(1,-1)$ 型の零空間だから原始である。同じ理由で $d\bar z_1\wedge d\bar z_2$ は原始 $(0,2)$ 型である。

$(1,1)$ 型では $e_1-e_2$ と $dz_1\wedge d\bar z_2$、$dz_2\wedge d\bar z_1$ を取る。それぞれに $\omega$ を外積すると、前者は

$$
(e_1+e_2)\wedge(e_1-e_2)=e_1^2-e_2^2=0
$$

であり、後二者は各項で $dz_j$ または $d\bar z_j$ が重複して零になる。$n=k=2$ なので、[原始類の判定](#thm-hod1-12-harmonic-primitive)によってこれらは $P_H^{1,1}$ に属する。一方 $\omega=e_1+e_2$ 自身は

$$
\omega\wedge\omega=2e_1\wedge e_2\ne0
$$

だから原始でない。このように $(1,1)$ 型4次元のうち3次元が原始で、残り1次元は $L_HP_H^{0,0}$ となる。型別の全次元は $1+4+1=6$、原始部分は $1+3+1=5$ である。
<!-- definition-example-end -->

<a id="prop-hod1-12-type-decomposition"></a>

<!-- formal-statement-start -->
> **命題（原始Hodge型と型別分解）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。$0\le p,q\le n$、$k=p+q$ に対し、$k\le n$ なら

$$
P_H^k=\bigoplus_{p+q=k}P_H^{p,q}.
$$

> また任意の $0\le a,b\le n$ に対し

$$
H^{a,b}(X)
=\bigoplus_{r=\max(0,a+b-n)}^{\min(a,b)}
L_H^rP_H^{a-r,b-r}.
$$

> 各項の $L_H^r$ は単射であり、原始成分の型 $(p,q)$ は $(p+r,q+r)$ へ移る。
<!-- formal-statement-end -->

### 証明の見取り図

調和代表を $(p,q)$ に分け、$\Lambda$ が各型を異なる型へ移すことから原始条件が成分ごとに成り立つと示す。その後、[全次数のLefschetz分解](#thm-hod1-12-lefschetz-decomposition)の各原始列を型別に分け、到着型を固定して添字を解く。

<!-- proof-start -->
### 証明

$k\le n$ の原始類 $a$ の調和代表を $h=\sum_{p+q=k}h^{p,q}$ とする。[調和形式の型分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により各 $h^{p,q}$ は調和形式である。[原始類の調和判定](#thm-hod1-12-harmonic-primitive)から $\Lambda h=0$。$\Lambda h^{p,q}$ は $(p-1,q-1)$ 型であり、異なる $(p,q)$ の像は異なる型部分空間に入る。よって

$$
0=\Lambda h=\sum_{p+q=k}\Lambda h^{p,q}
\quad\Longrightarrow\quad
\Lambda h^{p,q}=0\quad\text{（全ての $(p,q)$）}.
$$

各 $[h^{p,q}]_d$ は原始だから、原始部分自身も表示した型別直和になる。逆に原始型部分空間の各元は定義から $P_H^k$ に属する。

次に $H^{a,b}$ の類を取り、[全次数の直和分解](#thm-hod1-12-lefschetz-decomposition)で原始列へ分ける。上で示した原始部分の型分解と、[Lefschetzの型移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)から、ある原始 $(p,q)$ 型成分の $r$ 回像は $(p+r,q+r)$ 型である。目標が $(a,b)$ 型なら必ず

$$
p=a-r,\qquad q=b-r.
$$

原始型に必要な $p,q\ge0$ は $r\le\min(a,b)$、原始次数 $p+q=a+b-2r\le n$ は $r\ge(a+b-n)/2$ を与える。ただしこれだけでは十分でない。原始列の非零範囲 $r\le n-(p+q)$ も必要で、代入すると

$$
r\le n-a-b+2r
\quad\Longleftrightarrow\quad r\ge a+b-n.
$$

これは $p+q\le n$ をも保証する（$a+b\le n$ なら $r\ge0$、$a+b>n$ なら $a+b-2r\le2n-a-b<n$）。従って許される範囲はちょうど

$$
\max(0,a+b-n)\le r\le\min(a,b).
$$

異なる原始列は[全次数のLefschetz直和分解](#thm-hod1-12-lefschetz-decomposition)で交わらず、異なる型もHodge分解で交わらないから、表示は直和となる。また同じ[分解定理の単射性](#thm-hod1-12-lefschetz-decomposition)から、各原始部分上の $L_H^r$ は単射である。$\square$
<!-- proof-end -->

**型別の次元。** $h^{p,q}=\dim_{\mathbb C}H^{p,q}(X)$、$h^{p,q}=0$（$p<0$ または $q<0$）と置く。$p+q\le n$ なら

$$
\dim P_H^{p,q}=h^{p,q}-h^{p-1,q-1}.
$$

実際、上の型別分解を低次数 $(p,q)$ に適用すると $H^{p,q}=P_H^{p,q}\oplus L_HH^{p-1,q-1}$ である。[Hard Lefschetzの単射性](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)を出発次数 $p+q-2<n$ に適用すれば $L_H$ は $H^{p-1,q-1}$ から単射となり、像の次元は $h^{p-1,q-1}$ である。

## 6. 具体例で原始列を最後まで確かめる

### 射影直線の積の全次数

再び $Q=\mathbb{CP}^1\times\mathbb{CP}^1$ とする。既出の[前章の具体計算](../HOD1-11/index.md)から $H^0=\mathbb C1$、$H^2=\mathbb Cu\oplus\mathbb Cv$、$H^4=\mathbb Cuv$、奇数次数は零であり、$[\omega]_d=2\pi(u+v)$、$\omega^2$ の類は $2(2\pi)^2uv$ である。従って

$$
\begin{aligned}
P_H^0&=\mathbb C1,\\
P_H^2&=\mathbb C(u-v),\\
H^2&=P_H^2\oplus L_HP_H^0
=\mathbb C(u-v)\oplus\mathbb C\bigl(2\pi(u+v)\bigr),\\
H^4&=L_H^2P_H^0=\mathbb C\bigl(2(2\pi)^2uv\bigr).
\end{aligned}
$$

$L_H(u-v)=0$ と $L_H^2(1)\ne0$ は、同じ $H^2$ の元でも列の出発点か途中かで振舞いが違うことを表す。ここで $u-v$ の二乗は $-2uv$ だが、その符号にどの意味があるかは次章のHodge–Riemann関係で考える。

### 複素二次元トーラスの二次コホモロジー

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とし、実1形式の基底を $dx_1,dy_1,dx_2,dy_2$ とする。先ほどの $e_j=dx_j\wedge dy_j$ と $\omega=e_1+e_2$ を用いる。$H^2$ の定数係数基底は

$$
e_1,\ e_2,\
dx_1\wedge dx_2,\ dx_1\wedge dy_2,\
dy_1\wedge dx_2,\ dy_1\wedge dy_2
$$

である。混合項の各々は $e_1$ とも $e_2$ とも1形式を共有するため、$\omega$ を外積すると零になる。$e_1-e_2$ も零、$e_1+e_2$ の像だけが

$$
L(e_1+e_2)=(e_1+e_2)^2=2e_1\wedge e_2\ne0
$$

となる。よって原始二次部分は、上の基底のうち $e_1,e_2$ を $e_1-e_2$ 一つへ置き換えた五次元空間であり、残りは $L_HH^0=\mathbb C[\omega]_d$。これで $b_2-b_0=6-1=5$ という[次元公式](#cor-hod1-12-primitive-dimensions)も実際の五つの基底で検算できた。一次部分は全て原始であり、$H^3=L_HP_H^1$、$H^4=L_H^2P_H^0$ となる。

## 7. 演習：原始条件・高冪・型の三つを結ぶ

### Level A：定義と次数を正確に読む

<a id="ex-hod1-12-a01"></a>
#### HOD1-12-A01 三次元で全次数の原始列
- Level: A

複素次元 $n=3$ のコンパクトKähler多様体について、$H^q$（$q=0,\ldots,6$）のLefschetz分解を $P_H^j$ と $L_H$ で全て書け。各 $q$ に許される $r$ の範囲も求めよ。

<!-- solution-start -->
### 詳細解答

[全次数の分解](#thm-hod1-12-lefschetz-decomposition)では

$$
\max(0,q-3)\le r\le\lfloor q/2\rfloor,\quad j=q-2r.
$$

$q=0$ では $r=0,j=0$、$q=1$ では $r=0,j=1$。$q=2$ では $r=0,1$ で $j=2,0$、$q=3$ では $r=0,1$ で $j=3,1$。$q=4$ では $r=1,2$ で $j=2,0$、$q=5$ では $r=2,j=1$、$q=6$ では $r=3,j=0$。従って

$$
\begin{aligned}
H^0&=P_H^0,&H^1&=P_H^1,\\
H^2&=P_H^2\oplus L_HP_H^0,&
H^3&=P_H^3\oplus L_HP_H^1,\\
H^4&=L_HP_H^2\oplus L_H^2P_H^0,&
H^5&=L_H^2P_H^1,&
H^6&=L_H^3P_H^0.
\end{aligned}
$$

例えば $H^4$ に $P_H^4$ を置いてはいけない。原始部分は $j\le n$ の次数にのみ定義される。
<!-- solution-end -->

<a id="ex-hod1-12-a02"></a>
#### HOD1-12-A02 射影直線の積の核
- Level: A

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ とし、$H^2=\mathbb Cu\oplus\mathbb Cv$、$u^2=v^2=0$、$uv\ne0$、$[\omega]_d=2\pi(u+v)$ を既知とする。$P_H^2$ と $L_HP_H^0$ の基底を求め、二つが直和になることを係数比較で確認せよ。

<!-- solution-start -->
### 詳細解答

$n=k=2$ なので[原始類の定義](#def-hod1-12-primitive-cohomology)は $P_H^2=\ker(L_H:H^2\to H^4)$。$L_H(au+bv)=2\pi(a+b)uv$ だから $a+b=0$、従って $P_H^2=\mathbb C(u-v)$。一方 $P_H^0=H^0=\mathbb C1$ であり、$L_H1=2\pi(u+v)$ より $L_HP_H^0=\mathbb C(u+v)$。

$a(u-v)=b(u+v)$ とおくと $u$ の係数は $a=b$、$v$ の係数は $-a=b$。従って $2a=0$ で、複素係数だから $a=b=0$。よって共通部分は零。両空間は一次元ずつで $H^2$ は二次元なので直和は全体となる。
<!-- solution-end -->

<a id="ex-hod1-12-a03"></a>
#### HOD1-12-A03 複素二次元トーラスの原始二次類
- Level: A

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ に $\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ を入れる。$[dx_1\wedge dy_1-dx_2\wedge dy_2]_d$ と $[dx_1\wedge dx_2]_d$ が原始であること、$[\omega]_d$ が原始でないことを判定せよ。

<!-- solution-start -->
### 詳細解答

$n=k=2$ だから[調和代表による原始判定](#thm-hod1-12-harmonic-primitive)は $Lh=0$ と同値であり、これらは[平坦トーラスの定数係数調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)である。$e_j=dx_j\wedge dy_j$ とすると $e_j^2=0$、$e_1e_2=e_2e_1$ で

$$
\omega\wedge(e_1-e_2)
=(e_1+e_2)(e_1-e_2)=0.
$$

また

$$
\omega\wedge dx_1\wedge dx_2
=e_1\wedge dx_1\wedge dx_2+e_2\wedge dx_1\wedge dx_2=0
$$

であり、前項は $dx_1$、後項は $dx_2$ の重複で零。一方 $\omega^2=2e_1e_2$ は非零の定数係数4形式だから $[\omega]_d$ は原始でない。
<!-- solution-end -->

<a id="ex-hod1-12-a04"></a>
#### HOD1-12-A04 原始型と次数の移動
- Level: A

$n=3$ のコンパクトKähler多様体で、原始 $(1,1)$ 類、原始 $(2,0)$ 類をそれぞれ $L_H$ で一回移すと何型になるか。さらに原始 $(1,1)$ 類に対し何回目の $L_H$ で必ず零になるかを示せ。

<!-- solution-start -->
### 詳細解答

[型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)により $(1,1)\to(2,2)$、$(2,0)\to(3,1)$ である。いずれも出発次数 $k=2$、複素次元 $n=3$ なので、原始類の[高冪核の定義](#def-hod1-12-primitive-cohomology)では

$$
n-k+1=3-2+1=2.
$$

従って原始 $(1,1)$ 類 $a$ に対し $L_H^2a=0$。一回目の像は非零の $a$ に対して[原始列の単射性](#thm-hod1-12-lefschetz-decomposition)により非零である。$L_H^2:H^{1,1}\to H^{3,3}$ という次数・型も一致する。
<!-- solution-end -->

### Level B：分解と次元をつなぐ

<a id="ex-hod1-12-b01"></a>
#### HOD1-12-B01 類が零であることと形式が零であること
- Level: B

$0\le k\le n$ とし、$a\in H^k$ の調和代表を $h$ とする。$L_H^{n-k+1}a=0$ から $\Lambda h=0$ を導け。なぜ一般の閉代表 $\alpha$ を使って「$\Lambda\alpha=0$」と置いてはいけないかも説明せよ。

<!-- solution-start -->
### 詳細解答

$m=n-k+1$ と置く。[調和性と作用の対応](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)から $L^mh$ は調和形式であり、そのde Rham類は

$$
[L^mh]_d=L_H^m[h]_d=L_H^ma=0.
$$

[Hodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)では零類の調和代表は零形式だけなので $L^mh=0$。各点の $h_x$ へ[原始形式の高冪判定](../HOD1-03/index.md#prop-hod1-03-primitive-power)を適用すると、$L_x^mh_x=0$ より $\Lambda_xh_x=0$。全点で成立して $\Lambda h=0$。

一般の閉代表 $\alpha$ には、$\Lambda\alpha$ の閉性が保証されない。既習の[閉2形式に随伴を作用させる反例](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)の通り、$\Lambda$ は任意の閉形式を閉形式へ送る作用ではない。原始条件は類の**調和代表**に対して適用する。
<!-- solution-end -->

<a id="ex-hod1-12-b02"></a>
#### HOD1-12-B02 原始次元とBetti数の単調性
- Level: B

複素次元 $n=3$ のコンパクトKähler多様体で $(b_0,b_1,b_2,b_3)=(1,4,7,10)$ と仮定する。原始コホモロジー $P_H^0,\ldots,P_H^3$ の次元を求め、$H^4,H^5,H^6$ の分解から高次数のBetti数を求めよ。

<!-- solution-start -->
### 詳細解答

[原始部分の次元公式](#cor-hod1-12-primitive-dimensions)に $b_{-2}=b_{-1}=0$ を代入すると

$$
\begin{aligned}
\dim P_H^0&=b_0=1,&\dim P_H^1&=b_1=4,\\
\dim P_H^2&=b_2-b_0=7-1=6,&
\dim P_H^3&=b_3-b_1=10-4=6.
\end{aligned}
$$

上半分の[分解](#thm-hod1-12-lefschetz-decomposition)は

$$
H^4=L_HP_H^2\oplus L_H^2P_H^0,\quad
H^5=L_H^2P_H^1,\quad
H^6=L_H^3P_H^0.
$$

各冪は原始空間上で単射なので像の次元はそれぞれ原始空間の次元と等しい。従って $b_4=6+1=7$、$b_5=4$、$b_6=1$。これらは[Hard Lefschetzの次数対称性](../HOD1-11/index.md#cor-hod1-11-betti-symmetry)とも一致する。
<!-- solution-end -->

<a id="ex-hod1-12-b03"></a>
#### HOD1-12-B03 高次数の型別分解に零項を混ぜない
- Level: B

複素次元 $n=3$ のコンパクトKähler多様体で $H^{2,2}(X)$ の型別Lefschetz分解を書け。原始 $(2,2)$ 型そのものを定義しない理由と、各原始出発型の次数を答えよ。

<!-- solution-start -->
### 詳細解答

[型別分解](#prop-hod1-12-type-decomposition)で $(a,b)=(2,2)$ とすると

$$
\max(0,2+2-3)=1\le r\le\min(2,2)=2.
$$

$r=1$ の原始出発型は $(a-r,b-r)=(1,1)$、$r=2$ では $(0,0)$。従って

$$
H^{2,2}=L_HP_H^{1,1}\oplus L_H^2P_H^{0,0}.
$$

前者の原始出発次数は2、後者は0で、像はどちらも $(2,2)$ 型・全次数4となる。$2+2=4>n=3$ なので $P_H^{2,2}$ は定義対象外であり、上半分に新しい原始列は始まらない。$r=0$ を入れるとこの条件を破る。
<!-- solution-end -->

### Level C：具体模型と一般論を往復する

<a id="ex-hod1-12-c01"></a>
#### HOD1-12-C01 複素二次元トーラスの原始分解と型別次元
- Level: C

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$、$\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ とする。各次数のde Rham群は定数係数形式の類で張られるとしてよい。

1. $P_H^2$ の五つの基底を実座標で書き、$L_HP_H^0$ との直和を確かめよ。
2. $(h^{2,0},h^{1,1},h^{0,2})=(1,4,1)$ を使って原始型の各次元を計算し、前問の五次元と照合せよ。
3. $H^3$ と $H^4$ を原始列で書き、$L_H^2[1]_d$ の係数を計算せよ。

<!-- solution-start -->
### 詳細解答

**1.** $e_1=dx_1\wedge dy_1$、$e_2=dx_2\wedge dy_2$ と置く。以下の五つの類を取る。

$$
[e_1-e_2]_d,\quad
[dx_1\wedge dx_2]_d,\quad
[dx_1\wedge dy_2]_d,\quad
[dy_1\wedge dx_2]_d,\quad
[dy_1\wedge dy_2]_d.
$$

$e_j^2=0$、$e_1e_2=e_2e_1$ より $(e_1+e_2)(e_1-e_2)=0$ である。

残る四つの混合項は、$e_1$ と外積すると $dx_1$ または $dy_1$ が重複し、$e_2$ と外積すると $dx_2$ または $dy_2$ が重複する。従って $\omega$ との外積はどれも零になる。定数係数形式は調和であり、$n=k=2$ の[原始判定](#thm-hod1-12-harmonic-primitive)により五つとも原始である。

定数係数2形式の六つの基底のうち、$e_1,e_2$ の組を $e_1-e_2,e_1+e_2$ に置き換える変換行列の行列式は2（符号を除く）なので可逆である。従って五つの原始類は独立で、残り $[e_1+e_2]_d=L_H[1]_d$ と合わせて $H^2$ 全体を張る。

**2.** 型別の[原始次元公式](#prop-hod1-12-type-decomposition)を次数2に用いる。$h^{1,-1}=h^{-1,1}=0$、$h^{0,0}=1$ だから

$$
\dim P_H^{2,0}=1,\quad
\dim P_H^{1,1}=4-1=3,\quad
\dim P_H^{0,2}=1.
$$

和は $1+3+1=5$ で、第一問の実座標による五次元の複素化と一致する。

**3.** $H^1=P_H^1$ なので[全次数の分解](#thm-hod1-12-lefschetz-decomposition)から $H^3=L_HP_H^1$、$H^4=L_H^2P_H^0$。二つの偶次数2形式は交換するので

$$
\begin{aligned}
L_H^2[1]_d&=[(e_1+e_2)^2]_d\\
&=[e_1^2+2e_1e_2+e_2^2]_d=2[e_1e_2]_d.
\end{aligned}
$$

基本体積類は非零だから $L_H^2:H^0\to H^4$ はこの基底で係数2の同型である。これで原始2次の核と、非原始0次から到達する4次の両方を検算した。
<!-- solution-end -->

<a id="ex-hod1-12-c02"></a>
#### HOD1-12-C02 一般分解を随伴性から再構成する
- Level: C

$X$ を複素次元 $n$ のコンパクトKähler多様体とする。[調和代表の存在・一意性](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)、[LとLambdaの調和性保存](../HOD1-10/index.md#prop-hod1-10-harmonic-sl2)、[点ごとの原始列と直交分解](../HOD1-03/index.md#thm-hod1-03-decomposition)だけを入力としてよい。

1. $q\le n$ で $\mathcal H^q=\mathcal P^q\oplus^\perp L\mathcal H^{q-2}$ を示せ。
2. $q>n$ で $L:\mathcal H^{q-2}\to\mathcal H^q$ が全射であることを示せ。
3. $q$ の原始列に現れる $r$ の正確な範囲を導き、調和空間での直交性と類上の直和性を区別して説明せよ。

<!-- solution-start -->
### 詳細解答

**1.** $L$ と $\Lambda$ が各調和空間を保存するので、$L:\mathcal H^{q-2}\to\mathcal H^q$ の随伴を $\Lambda|_{\mathcal H^q}$ としてよい。有限次元の内積空間で

$$
(\operatorname{im}L)^\perp=\ker\Lambda|_{\mathcal H^q}.
$$

$q\le n$ では右辺は $\mathcal P^q$ の定義そのものだから、像と直交補を合わせて所望の直和を得る。$q=0,1$ では負次数空間を零とする。

**2.** $q>n$ の点ごとの[原始分解](../HOD1-03/index.md#thm-hod1-03-decomposition)では $\Lambda_x$ の核は零である。従って調和 $q$ 形式 $h$ について $\Lambda h=0$ なら $h_x=0$（全ての $x$）、すなわち $h=0$。上の随伴公式から $(\operatorname{im}L)^\perp=0$。$\mathcal H^q$ が有限次元なので $\operatorname{im}L=\mathcal H^q$ となる。

**3.** 第一問を低次数で反復し、第二問で高次数の列を伸ばす。原始出発次数を $j=q-2r$ と書くと、[原始形式のLefschetz列公式](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)から

$$
j\ge0,\quad r\ge0,\quad r\le n-j
$$

が必要。最初は $r\le q/2$、最後は $r\le n-q+2r$、すなわち $r\ge q-n$ と同値である。従って

$$
\max(0,q-n)\le r\le\lfloor q/2\rfloor.
$$

異なる原始出発次数から伸びる $L^r\mathcal P^j$ は、[点ごとのLefschetz直交分解](../HOD1-03/index.md#thm-hod1-03-decomposition)により各点で直交するので、積分した調和空間の内積でも直交する。各原始列上の $L^r$ の単射性は[原始列の正のノルム係数](../HOD1-03/index.md#lem-hod1-03-primitive-ladder)による。これで調和空間に直交直和を得る。最後に調和代表の同型 $\Phi_q$ で各部分空間をコホモロジーに送れば直和性は保たれる。ただしコホモロジー群に、代表を指定しないまま「調和形式の $L^2$ 内積で直交する」と述べるのでなく、**調和代表の上で直交**と明記する。
<!-- solution-end -->

## 8. 次へ：原始成分の交叉形式にはどんな符号があるか

- [原始コホモロジー](#def-hod1-12-primitive-cohomology)は $L_H^{n-k+1}$ の核であり、[調和原始形式](#thm-hod1-12-harmonic-primitive)の $\Lambda h=0$ と厳密に一致する。
- [Lefschetz直和分解](#thm-hod1-12-lefschetz-decomposition)は、全ての次数で、原始列の始点とその冪像を一意に取り出す。高次数の原始成分を勝手に追加しない。
- [原始次元公式](#cor-hod1-12-primitive-dimensions)と[型別分解](#prop-hod1-12-type-decomposition)は、それぞれBetti数・Hodge数の増分を測る。

次に調べるのは、これらの原始成分上で積分による交叉形式がどの符号を持つかである。特に複素曲面の原始実 $(1,1)$ 類で現れた負符号を、Hodge–Riemann双線形関係へ一般化する。
