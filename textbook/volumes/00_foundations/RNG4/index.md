# RNG4 抽象代数 VIII：多項式環・Gauss の補題・既約多項式

<!-- definition-example-audit: strict -->

[RNG3](../RNG3/index.md) では、整域上の整除を出発点に、Euclid 整域、単項イデアル整域、一意分解整域まで進みました。本章では、その整除論を **多項式環へ持ち上げる** ことが主題です。

整数と多項式には、よく似た構造があります。体 $F$ 上の一変数多項式環 $F[x]$ では、整数の除法に対応する

$$
f=qg+r,
\qquad
\deg r<\deg g
$$

が使えます。従って次数を Euclid 関数として $F[x]$ は Euclid 整域になり、RNG3 の結果から単項イデアル整域・一意分解整域でもあります。

一方、係数環が体ではなく $\mathbb Z$ や一般の一意分解整域 $R$ になると、先頭係数を自由に割れません。ここで必要になるのが **content（係数の最大公約元）** と **原始多項式**、そして後で証明する [Gauss の補題](#thm-rng4-gauss-product)です。

本章の主線は

$$
\boxed{
F[x]\text{ の除法}
\Longrightarrow
F[x]\text{ は Euclid 整域}
}
$$

と

$$
\boxed{
R\text{ が UFD}
\Longrightarrow
\text{Gauss の補題}
\Longrightarrow
R[x]\text{ も UFD}
}
$$

です。最後に、有理根判定と [Eisenstein の既約判定](#thm-rng4-eisenstein)を使って、具体的な多項式の既約性を実際に判定します。

> **この章の停止線**
>
> 本章では一変数多項式環、除法、content、原始多項式、[Gauss の補題](#thm-rng4-gauss-product)、一意分解、既約判定まで扱います。体拡大、代数的元、それらを記述する既約多項式、分解体は FLD1 以降へ送ります。多変数多項式環、一般 Noether 環、局所化、Krull 次元は扱いません。

---

## 1. 多項式環では次数が乗法を測る

本章では、特に断らない限り $R$ を単位元 $1\ne0$ を持つ可換整域とします。

<a id="def-rng4-polynomial-ring-degree"></a>
<!-- formal-statement-start -->
> **定義（多項式環・次数・先頭係数）**
>
> $R$ 上の一変数多項式
>
$$
f(x)=a_0+a_1x+\cdots+a_nx^n
$$
>
> 全体を $R[x]$ と書き、係数ごとの加法と、$x^k$ の係数を $\sum_{i+j=k}a_ib_j$ とする乗法で環とする。
>
> $f\ne0$ に対し、$a_n\ne0$ で $a_k=0\ (k>n)$ なら
>
$$
\deg f=n
$$
>
> といい、$a_n$ を $f$ の **先頭係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rng4-polynomial-ring-degree -->
### 1.1 定義の確認：次数と先頭係数

**定義の確認**

$$
f(x)=2-3x+5x^4
$$

なら

$$
\deg f=4,
\qquad
\operatorname{lc}(f)=5.
$$

また

$$
g(x)=x^2+1
$$

なら $\deg g=2$ です。

積の最高次項は

$$
(5x^4)(x^2)=5x^6
$$

なので

$$
\deg(fg)=6.
$$

この「最高次項が消えない」という事実には、係数環 $R$ が整域であることが使われています。
<!-- definition-example-end -->

<a id="prop-rng4-degree-product-units"></a>
<!-- formal-statement-start -->
> **命題（整域上の次数と単元）**
>
> $R$ を整域とし、$0\ne f,g\in R[x]$ とする。このとき
>
$$
\deg(fg)=\deg f+\deg g.
$$
>
> 特に $R[x]$ の単元は、$R$ の単元を定数多項式とみなしたものに限る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f,g$ の先頭係数をそれぞれ $a_m,b_n$ とします。

積 $fg$ の $x^{m+n}$ の係数は

$$
a_mb_n
$$

です。$R$ は整域で $a_m,b_n\ne0$ なので

$$
a_mb_n\ne0.
$$

従って

$$
\deg(fg)=m+n.
$$

次に $f$ が $R[x]$ の単元なら、ある $g\in R[x]$ が存在して

$$
fg=1.
$$

両辺の次数を比較すると

$$
0=\deg 1=\deg f+\deg g.
$$

次数は非負整数なので

$$
\deg f=\deg g=0.
$$

よって $f,g$ は定数多項式です。$fg=1$ だから、その定数係数は $R$ で互いに逆元です。

逆に $R$ の単元は定数多項式として明らかに $R[x]$ の単元です。$\square$
<!-- proof-end -->

この命題により、体 $F$ 上では $F[x]$ の単元は **非零定数多項式** です。したがって $F[x]$ で「既約多項式」というとき、正次数多項式を非定数多項式二つの積へ分けられないことを意味します。

---

## 2. 体上では先頭係数を割って商と余りを作れる

整数の除法では、先頭の大きさを減らして余りを作りました。多項式では最高次項を消して次数を下げます。

ここで係数が体であることが本質です。最高次項

$$
a_mx^m
$$

を

$$
b_nx^n
$$

で消すには、係数 $a_m/b_n$ を作る必要があります。

<a id="thm-rng4-division-algorithm"></a>
<!-- formal-statement-start -->
> **定理（体上の多項式の除法）**
>
> $F$ を体とし、$f,g\in F[x]$、$g\ne0$ とする。
>
> このとき一意的な $q,r\in F[x]$ が存在して
>
$$
f=qg+r
$$
>
> かつ
>
$$
r=0
\quad\text{または}\quad
\deg r<\deg g
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

存在は、現在の最高次項を $g$ の適切な単項式倍で消す操作を繰り返して作ります。各回で次数が真に下がるので、有限回で停止します。

一意性は、二つの表示を引き算すると

$$
(q-q')g=r'-r
$$

となり、左辺が非零なら次数が $\deg g$ 以上になるのに、右辺は $\deg g$ 未満になることから従います。

<!-- proof-start -->
### 証明

#### 存在

$f=0$ なら $q=r=0$ でよいので、$f\ne0$ とします。

$\deg f<\deg g$ なら

$$
q=0,\qquad r=f
$$

で結論が得られます。

そこで $\deg f\ge\deg g$ とします。

$$
\deg f=m,\qquad \deg g=n
$$

とし、先頭係数をそれぞれ $a_m,b_n$ とします。

$F$ は体なので $b_n^{-1}$ が存在します。そこで

$$
c=a_mb_n^{-1}
$$

と置き、

$$
f_1
=
f-cx^{m-n}g
$$

とします。

$cx^{m-n}g$ の最高次項は

$$
cb_nx^m
=
a_mx^m
$$

なので、$f$ の最高次項と打ち消し合います。従って

$$
f_1=0
\quad\text{または}\quad
\deg f_1<\deg f.
$$

$f_1$ の次数がまだ $\deg g$ 以上なら同じ操作を繰り返します。次数は非負整数で毎回真に減少するため、有限回で

$$
f=qg+r,
\qquad
r=0
\ \text{または}\
\deg r<\deg g
$$

に到達します。

#### 一意性

二つの表示

$$
f=qg+r=q'g+r'
$$

があり、

$$
r=r'=0
$$

または各余りの次数が $\deg g$ 未満だとします。

差を取ると

$$
(q-q')g=r'-r.
$$

もし $q-q'\ne0$ なら、$F[x]$ は整域なので

$$
\deg((q-q')g)
=
\deg(q-q')+\deg g
\ge
\deg g.
$$

一方、$r'-r\ne0$ なら

$$
\deg(r'-r)
<
\deg g.
$$

これは矛盾です。

従って $q=q'$ であり、元の等式から $r=r'$ です。$\square$
<!-- proof-end -->

### 2.1 具体例：$\mathbb Q[x]$ で割る

$$
f=x^3-2x+4,
\qquad
g=x-1
$$

とします。

最高次項を消すため

$$
x^3/(x)=x^2
$$

なので、まず

$$
f-x^2g
=
x^2-2x+4.
$$

次に

$$
x^2/(x)=x
$$

なので

$$
(x^2-2x+4)-xg
=
-x+4.
$$

さらに

$$
(-x)/(x)=-1
$$

なので

$$
(-x+4)-(-1)g
=
3.
$$

従って

$$
x^3-2x+4
=
(x^2+x-1)(x-1)+3.
$$

余りの次数は $0<1=\deg(x-1)$ です。

---

## 3. $F[x]$ は Euclid 整域である

RNG3 の Euclid 整域の定義では、非零元に非負整数値の Euclid 関数を与え、除法の余りでその値を下げられればよいのでした。

多項式では、その関数として次数をそのまま使えます。

<a id="cor-rng4-fx-euclidean"></a>
<!-- formal-statement-start -->
> **系（体上の多項式環は Euclid 整域）**
>
> $F$ を体とする。このとき $F[x]$ は
>
$$
\delta(f)=\deg f
\qquad(f\ne0)
$$
>
> を Euclid 関数とする Euclid 整域である。
>
> 従って $F[x]$ は単項イデアル整域であり、一意分解整域である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F[x]$ は整域です。実際、非零多項式 $f,g$ に対し

$$
\deg(fg)=\deg f+\deg g
$$

なので $fg\ne0$ です。

[体上の多項式の除法](#thm-rng4-division-algorithm)により、任意の $f\in F[x]$ と $0\ne g\in F[x]$ に対して

$$
f=qg+r
$$

かつ

$$
r=0
\quad\text{または}\quad
\deg r<\deg g
$$

とできます。

従って次数は Euclid 関数です。

よって [RNG3 の「Euclid 整域は単項イデアル整域」](../RNG3/index.md#thm-rng3-ed-implies-pid) から $F[x]$ は単項イデアル整域です。さらに [RNG3 の「単項イデアル整域は一意分解整域」](../RNG3/index.md#thm-rng3-pid-implies-ufd) から $F[x]$ は一意分解整域です。$\square$
<!-- proof-end -->

この結果により、$F[x]$ では整数と同様に Euclid の互除法を使って最大公約元を計算できます。

ただし $\mathbb Z[x]$ では同じ除法は一般にできません。例えば

$$
x
$$

を

$$
2x+1
$$

で割って最高次項を消そうとすると、係数 $1/2$ が必要になり、$\mathbb Z[x]$ の中には残れません。

つまり

$$
\boxed{
\text{この除法算法に必要なのは「係数が体」であること}
}
$$

です。

---

## 4. 係数の共通因子を content として分離する

$\mathbb Z[x]$ の多項式

$$
6x^2+9x+3
$$

は

$$
3(2x^2+3x+1)
$$

と書けます。多項式全体の因数分解を考える前に、まず係数全体に共通する因子を取り出す必要があります。

<a id="def-rng4-content-polynomial"></a>
<!-- formal-statement-start -->
> **定義（content・原始多項式）**
>
> $R$ を一意分解整域とし、
>
$$
0\ne f(x)=a_0+a_1x+\cdots+a_nx^n\in R[x]
$$
>
> とする。
>
> 係数 $a_0,\dots,a_n$ の最大公約元を $f$ の **content** といい、$c(f)$ と書く。最大公約元は同伴を除いて一意なので、$c(f)$ も単元倍の違いを除いて定まる。
>
> $c(f)$ が単元であるとき、$f$ を **原始多項式** という。
<!-- formal-statement-end -->

一意分解整域では有限個の係数の最大公約元が存在します。実際、各非零係数を既約元へ分解し、各既約元について係数群に現れる指数の最小値を取れば、その積が最大公約元になります。したがって content の定義は UFD 仮定の下で常に実行できます。

<!-- definition-example-start: def-rng4-content-polynomial -->
### 4.1 定義の確認：係数の最大公約元を取り出す

**定義の確認**

$$
f(x)=6x^2+9x+3
$$

の係数は $6,9,3$ です。$\mathbb Z$ での最大公約元は $3$ と $-3$ の同伴類なので、

$$
c(f)\sim3.
$$

正の代表を選べば

$$
c(f)=3.
$$

従って

$$
f(x)=3f_0(x),
\qquad
f_0(x)=2x^2+3x+1.
$$

$f_0$ の係数 $2,3,1$ の最大公約数は $1$ なので、$f_0$ は原始多項式です。

一方

$$
2x^2+4x+6
$$

は content が $2$ なので原始多項式ではありません。
<!-- definition-example-end -->

任意の非零多項式 $f\in R[x]$ は

$$
f=c(f)f_0
$$

と書け、$f_0$ を原始多項式にできます。

したがって多項式の因数分解は

1. 係数側の因数分解 $c(f)$
2. 原始部分 $f_0$ の因数分解

へ分離できます。

---

## 5. Gauss の補題：原始多項式の積は原始である

これが係数環 $R$ と分数体上の多項式因数分解を結ぶ中心定理です。

<a id="thm-rng4-gauss-product"></a>
<!-- formal-statement-start -->
> **定理（Gauss の補題：原始多項式の積）**
>
> $R$ を一意分解整域とし、$f,g\in R[x]$ を原始多項式とする。
>
> このとき積 $fg$ も原始多項式である。
<!-- formal-statement-end -->

### 証明の見取り図

$fg$ が原始でないと仮定します。すると全係数を割る既約元 $p$ が存在します。

RNG3 で一意分解整域では既約元が素元として働くので、$p$ を法として係数を追えます。

$f$ の係数のうち $p$ で割れないものの最小添字を $i$、$g$ について同様に $j$ と取ります。すると $x^{i+j}$ の係数では、$a_ib_j$ だけが $p$ で割れず、それ以外の項は全て $p$ で割れます。したがって和全体も $p$ で割れるはずだという仮定と矛盾します。

<!-- proof-start -->
### 証明

$$
f=\sum_{k=0}^{m}a_kx^k,
\qquad
g=\sum_{\ell=0}^{n}b_\ell x^\ell
$$

とします。

$fg$ が原始でないと仮定します。すると $fg$ の全係数を割る非単元が存在し、その既約因子を一つ $p$ と取れます。

$R$ は一意分解整域です。一意分解性から既約元 $p$ は素元になります。実際 $p\mid ab$ なら
$$
ab=pc
$$
と書けます。$a,b,c$ を既約元へ分解すると、右辺の既約因子 $p$ は一意性により左辺の既約因子の一つと同伴です。その因子は $a$ または $b$ の分解に現れるので
$$
p\mid a
\quad\text{または}\quad
p\mid b.
$$
従って $p$ は素元として使えます。

$f$ は原始なので、全ての係数が $p$ で割れることはありません。従って

$$
p\nmid a_i
$$

となる添字 $i$ が存在します。そのような最小の $i$ を取ります。同様に

$$
p\nmid b_j
$$

となる最小の $j$ を取ります。

積 $fg$ の $x^{i+j}$ の係数は

$$
c_{i+j}
=
\sum_{k+\ell=i+j}a_kb_\ell
$$

です。

項 $a_kb_\ell$ を考えます。

- $k<i$ なら、$i$ の最小性から $p\mid a_k$。
- $k>i$ なら $\ell=i+j-k<j$ なので、$j$ の最小性から $p\mid b_\ell$。
- $k=i$ のときだけ $\ell=j$ で、$p\nmid a_i$ かつ $p\nmid b_j$。

$p$ は素元なので

$$
p\nmid a_ib_j.
$$

それ以外の全項は $p$ で割れます。

もし $p\mid c_{i+j}$ なら、

$$
a_ib_j
=
c_{i+j}
-
\sum_{\substack{k+\ell=i+j,\, (k,\ell)\ne(i,j)}}a_kb_\ell
$$

の右辺は全て $p$ で割れるので $p\mid a_ib_j$ となり矛盾です。

従って $p\nmid c_{i+j}$ です。

しかし $p$ は $fg$ の全係数を割るように選んだので矛盾です。

よって $fg$ は原始多項式です。$\square$
<!-- proof-end -->

この証明で UFD 仮定が働く場所は、**係数の共通因子から既約因子 $p$ を取り、その $p$ を素元として使うところ**です。

---

## 6. content は積に対して乗法的である

<a id="prop-rng4-content-multiplicative"></a>
<!-- formal-statement-start -->
> **命題（content の乗法性）**
>
> $R$ を一意分解整域とし、$0\ne f,g\in R[x]$ とする。
>
> このとき
>
$$
c(fg)\sim c(f)c(g)
$$
>
> である。ここで $\sim$ は同伴を表す。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
f=c(f)f_0,
\qquad
g=c(g)g_0
$$

と書き、$f_0,g_0$ を原始多項式とします。

すると

$$
fg=c(f)c(g)f_0g_0.
$$

[Gauss の補題](#thm-rng4-gauss-product)から $f_0g_0$ は原始多項式です。

従って $fg$ の係数に共通する因子は、単元倍を除けばちょうど $c(f)c(g)$ です。

よって

$$
c(fg)\sim c(f)c(g).
$$

$\square$
<!-- proof-end -->

整数係数多項式で正の content を選ぶなら、これは文字どおり

$$
c(fg)=c(f)c(g)
$$

となります。

---

## 7. 既約性を分数体へ移して判定する

$R$ を一意分解整域とし、その分数体を $K$ とします。

整数環の場合は

$$
R=\mathbb Z,
\qquad
K=\mathbb Q
$$

です。

$K[x]$ では係数の分母を許すため多項式除法ができます。一方、実際に扱いたい多項式は $R[x]$ にあることが多い。この二つの世界を結ぶのが次の形の Gauss の補題です。

<a id="thm-rng4-gauss-irreducibility"></a>
<!-- formal-statement-start -->
> **定理（Gauss の補題：既約性の移送）**
>
> $R$ を一意分解整域、$K$ をその分数体とし、$f\in R[x]$ を正次数の原始多項式とする。
>
> このとき次は同値である。
>
> 1. $f$ は $R[x]$ で既約である。
> 2. $f$ は $K[x]$ で既約である。
<!-- formal-statement-end -->

### 証明の見取り図

$R[x]$ で分解できれば $K[x]$ でも同じ分解が使えるので、一方向は直ちに従います。

逆向きでは、$K[x]$ の因数分解から各因子の分母を払って $R[x]$ へ戻します。そのとき余分に現れる定数因子を [content の乗法性](#prop-rng4-content-multiplicative)で吸収し、原始部分だけの因数分解を取り出します。

<!-- proof-start -->
### 証明

#### $R[x]$ で可約なら $K[x]$ でも可約

$f$ が $R[x]$ で

$$
f=gh
$$

と分解し、$g,h$ がどちらも単元でないとします。

$f$ は原始なので、$g$ または $h$ が非単元定数だけということはありません。実際、非単元定数 $d$ が $f$ を割れば $d$ は全係数を割り、$f$ の原始性に反します。

従って

$$
\deg g>0,
\qquad
\deg h>0.
$$

よって同じ式は $K[x]$ でも非自明な因数分解であり、$f$ は $K[x]$ でも可約です。

#### $K[x]$ で可約なら $R[x]$ でも可約

$f$ が $K[x]$ で

$$
f=gh
$$

と書け、

$$
\deg g>0,
\qquad
\deg h>0
$$

とします。

$g,h$ の係数の分母をそれぞれ払う非零元 $a,b\in R$ を取り、

$$
G=ag\in R[x],
\qquad
H=bh\in R[x]
$$

とします。

すると

$$
abf=GH.
$$

さらに

$$
G=c(G)G_0,
\qquad
H=c(H)H_0
$$

と書き、$G_0,H_0$ を原始多項式とします。

従って

$$
abf
=
c(G)c(H)G_0H_0.
$$

左辺の content は $f$ が原始なので

$$
c(abf)\sim ab.
$$

右辺では [Gauss の補題](#thm-rng4-gauss-product)により $G_0H_0$ は原始なので

$$
c(c(G)c(H)G_0H_0)
\sim
c(G)c(H).
$$

よって

$$
ab\sim c(G)c(H).
$$

従ってある単元 $u\in R^\times$ が存在して

$$
ab=u\,c(G)c(H).
$$

元の等式へ代入すると

$$
u\,c(G)c(H)f
=
c(G)c(H)G_0H_0.
$$

$R[x]$ は整域なので非零元 $c(G)c(H)$ を消去でき、

$$
uf=G_0H_0.
$$

従って

$$
f=u^{-1}G_0H_0.
$$

$G_0,H_0$ の次数はそれぞれ $g,h$ と同じなので正です。したがって右辺は $R[x]$ における非自明な因数分解です。

よって $f$ は $R[x]$ でも可約です。$\square$
<!-- proof-end -->

特に整数係数の原始多項式では

$$
\boxed{
\mathbb Z[x]\text{ で既約}
\iff
\mathbb Q[x]\text{ で既約}
}
$$

です。

これにより、有理数係数の問題を整数係数へ戻して整除で判定できます。

---

## 8. 一意分解は $R$ から $R[x]$ へ持ち上がる

<a id="thm-rng4-ufd-polynomial"></a>
<!-- formal-statement-start -->
> **定理（一意分解整域上の多項式環）**
>
> $R$ が一意分解整域なら、$R[x]$ も一意分解整域である。
<!-- formal-statement-end -->

### 証明の見取り図

非零多項式を

$$
f=c(f)f_0
$$

と content と原始部分へ分けます。

- $c(f)$ は $R$ の UFD 性で既約分解できる。
- $f_0$ は分数体 $K$ 上で因数分解する。
- $K[x]$ は Euclid 整域なので UFD。
- [Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)により、$K[x]$ の原始既約因子を $R[x]$ の既約因子として戻せる。
- 一意性は、定数因子を content で、正次数因子を $K[x]$ の一意分解でそれぞれ制御する。

<!-- proof-start -->
### 証明

$K$ を $R$ の分数体とします。

### 分解の存在

$0\ne f\in R[x]$ が単元でないとします。

$$
f=c(f)f_0
$$

と書き、$f_0$ を原始多項式とします。

$c(f)$ が単元でなければ、$R$ が UFD なので

$$
c(f)=u p_1\cdots p_s
$$

と既約元の積へ分解できます。

一方 $K[x]$ は Euclid 整域なので UFD です。従って $f_0$ は $K[x]$ で

$$
f_0=\alpha q_1\cdots q_t
$$

と既約多項式の積へ分解できます。ここで $\alpha\in K^\times$ です。

各 $q_i$ の分母を払い、その原始部分を取ることで、$q_i$ と $K[x]$ で同伴な原始多項式

$$
Q_i\in R[x]
$$

を取れます。

Gauss の既約性移送定理から、各 $Q_i$ は $R[x]$ でも既約です。

全体の定数倍は $f_0$ が原始であることから $R$ の単元へ吸収できます。従って $f$ は $R[x]$ の既約元の有限積へ分解できます。

### 分解の一意性

$f$ に二つの既約分解があるとします。

定数既約因子と正次数既約因子を分けます。

正次数因子については $K[x]$ へ移すと、定数因子は全て単元になります。$K[x]$ は UFD なので、二つの正次数既約因子の列は順序と $K[x]$ での同伴を除いて一致します。

ここで、二つの原始多項式 $G,H\in R[x]$ が

$$
G=\lambda H,
\qquad
\lambda\in K^\times
$$

を満たすとします。

$\lambda=a/b$ と既約な形に書けば

$$
bG=aH.
$$

[content の乗法性](#prop-rng4-content-multiplicative)から

$$
b\sim a
$$

でなければ両辺の content が一致しません。$a,b$ は互いに素なので、これは $a,b$ がとも単元であることを意味します。

従って $\lambda$ は $R$ の単元であり、$G,H$ は $R[x]$ でも同伴です。

よって正次数既約因子は $R[x]$ でも順序と同伴を除いて一致します。

残る定数既約因子は content の既約分解を与えます。$R$ 自身が UFD なので、その部分も順序と同伴を除いて一意です。

従って $R[x]$ は UFD です。$\square$
<!-- proof-end -->

この定理は一変数ずつ繰り返せるので、有限変数多項式環についても

$$
R\text{ が UFD}
\Longrightarrow
R[x_1,\dots,x_n]\text{ が UFD}
$$

が得られます。ただし本章では多変数固有の理論へは進みません。

---

## 9. 2次・3次多項式では根の有無だけで既約性が決まる

一般次数では「根がない」だけでは既約とは限りません。例えば四次式は二次式二つへ分解しても一次因子を持たないことがあります。

しかし次数 $2$ または $3$ なら事情が単純です。

<a id="prop-rng4-degree23-root"></a>
<!-- formal-statement-start -->
> **命題（2次・3次多項式の既約性）**
>
> $F$ を体とし、$f\in F[x]$ の次数を $2$ または $3$ とする。
>
> このとき次は同値である。
>
> 1. $f$ は $F[x]$ で可約である。
> 2. $f$ は $F$ に根を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ が $F$ に根 $\alpha$ を持てば、[体上の多項式の除法](#thm-rng4-division-algorithm)から

$$
f=(x-\alpha)q
$$

と書けます。$\deg f\ge2$ なので $q$ も正次数であり、$f$ は可約です。

逆に $f$ が可約なら

$$
f=gh
$$

と正次数多項式 $g,h$ の積へ分解できます。

$\deg f$ は $2$ または $3$ なので

$$
\deg f=\deg g+\deg h
$$

から、少なくとも一方の次数は $1$ です。

一次多項式は $F$ に根を持つので、その根は $f$ の根でもあります。$\square$
<!-- proof-end -->

四次以上ではこの議論は使えません。例えば

$$
(x^2+1)(x^2+2)
$$

は $\mathbb R$ 上で可約ですが、実根を持ちません。

ここで壊れるのは「非自明な因数分解があれば一次因子が現れる」という次数 $2,3$ 特有の機構です。

---

## 10. 有理根判定は候補を有限個へ絞る

<a id="thm-rng4-rational-root"></a>
<!-- formal-statement-start -->
> **定理（有理根定理）**
>
> 整数係数多項式
>
$$
f(x)=a_nx^n+\cdots+a_1x+a_0
\in\mathbb Z[x],
\qquad
a_n\ne0
$$
>
> を考える。
>
> 既約分数 $p/q$（$p,q\in\mathbb Z$, $q>0$, $\gcd(p,q)=1$）が $f$ の根なら
>
$$
p\mid a_0,
\qquad
q\mid a_n.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
f(p/q)=0
$$

なので、両辺に $q^n$ を掛けると

$$
a_np^n
+
a_{n-1}p^{n-1}q
+\cdots+
a_1pq^{n-1}
+
a_0q^n
=
0.
$$

最後の項を移項すると

$$
a_0q^n
=
-p
\left(
a_np^{n-1}
+a_{n-1}p^{n-2}q
+\cdots+
a_1q^{n-1}
\right).
$$

従って

$$
p\mid a_0q^n.
$$

$\gcd(p,q)=1$ なので $\gcd(p,q^n)=1$ です。RNG3 の Bézout 等式により、ある整数 $u,v$ が存在して

$$
up+vq^n=1.
$$

両辺に $a_0$ を掛けると

$$
a_0=u(pa_0)+v(a_0q^n).
$$

右辺の第一項は明らかに $p$ で割れ、第二項も $p\mid a_0q^n$ から $p$ で割れます。従って

$$
p\mid a_0.
$$

同様に最初の項を移項すると

$$
a_np^n
=
-q
\left(
a_{n-1}p^{n-1}
+\cdots+
a_0q^{n-1}
\right),
$$

従って

$$
q\mid a_np^n.
$$

同様に $\gcd(q,p^n)=1$ なので、Bézout 等式と $q\mid a_np^n$ から

$$
q\mid a_n.
$$

$\square$
<!-- proof-end -->

### 10.1 三次式の既約判定

$$
f(x)=2x^3+3x+1
$$

を考えます。

有理根 $p/q$ があれば

$$
p\mid1,
\qquad
q\mid2
$$

なので候補は

$$
\pm1,\qquad \pm\frac12
$$

だけです。

直接代入すると

$$
f(1)=6,\qquad
f(-1)=-4,
$$

$$
f(1/2)=\frac14+\frac32+1=\frac{11}{4},
$$

$$
f(-1/2)=-\frac14-\frac32+1=-\frac34.
$$

従って有理根はありません。

$f$ は三次なので、[2次・3次多項式の既約性](#prop-rng4-degree23-root)から $\mathbb Q[x]$ で既約です。

さらに $f$ は原始多項式なので、[Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)から $\mathbb Z[x]$ でも既約です。

---

## 11. Eisenstein の既約判定

有理根判定は二次・三次では強力ですが、四次以上では根がないだけでは足りません。Eisenstein の判定は、係数の一つの素因子を見るだけで高次数の既約性を保証できます。

<a id="thm-rng4-eisenstein"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein の既約判定）**
>
> $R$ を一意分解整域、$K$ をその分数体とし、
>
$$
f(x)=a_nx^n+\cdots+a_1x+a_0
\in R[x]
$$
>
> を正次数の原始多項式とする。
>
> 素元 $p\in R$ が存在して
>
$$
p\nmid a_n,
$$
>
$$
p\mid a_i
\qquad(0\le i<n),
$$
>
$$
p^2\nmid a_0
$$
>
> を満たすとする。
>
> このとき $f$ は $R[x]$ で既約であり、従って $K[x]$ でも既約である。
<!-- formal-statement-end -->

### 証明の見取り図

可約と仮定し、[Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)により

$$
f=gh
$$

を $R[x]$ の正次数原始多項式の積として取ります。

$p$ を法として見ると、$f$ は先頭項だけを残して

$$
\overline f
=
\overline{a_n}x^n
$$

になります。

積が単項式なら、各因子の $p$ を法とした像も単項式でなければなりません。したがって $g,h$ の定数項はどちらも $p$ で割れ、$a_0$ は $p^2$ で割れてしまいます。

<!-- proof-start -->
### 証明

$f$ が可約だと仮定します。

$f$ は原始多項式なので、Gauss の既約性移送定理により、$R[x]$ で

$$
f=gh
$$

と書ける正次数多項式 $g,h$ が存在します。必要なら単元を吸収して $g,h$ を原始に取れます。

$p$ は素元なので、RNG3 の結果から主イデアル $(p)$ は素イデアルです。従って [RNG2 の商整域の特徴付け](../RNG2/index.md#thm-rng2-prime-quotient-domain) により

$$
R/(p)
$$

は整域です。

係数を $(p)$ で剰余類へ写し、

$$
\overline f,\overline g,\overline h
\in (R/(p))[x]
$$

を考えます。

仮定から

$$
\overline f
=
\overline{a_n}x^n,
\qquad
\overline{a_n}\ne0.
$$

また

$$
\overline f
=
\overline g\,\overline h.
$$

$R/(p)$ は整域なので、多項式の次数は積で加法的です。

多項式 $u$ に対し、最低次数の非零項の次数を $\nu(u)$ と書くと、整域上では

$$
\nu(uv)=\nu(u)+\nu(v)
$$

も成り立ちます。

単項式 $\overline{a_n}x^n$ では

$$
\nu(\overline f)=\deg\overline f=n.
$$

一方

$$
\nu(\overline g)+\nu(\overline h)
=
\nu(\overline f)
=
n
$$

かつ

$$
\deg\overline g+\deg\overline h
=
\deg\overline f
=
n.
$$

常に $\nu(u)\le\deg u$ なので、両方の和が同じ $n$ になるためには

$$
\nu(\overline g)=\deg\overline g,
\qquad
\nu(\overline h)=\deg\overline h
$$

でなければなりません。

従って $\overline g,\overline h$ はとも単項式です。

$g,h$ は正次数なので、その定数項をそれぞれ $b_0,c_0$ とすると

$$
\overline{b_0}=0,
\qquad
\overline{c_0}=0.
$$

従って

$$
p\mid b_0,
\qquad
p\mid c_0.
$$

$f=gh$ の定数項は

$$
a_0=b_0c_0
$$

なので

$$
p^2\mid a_0.
$$

これは仮定に反します。

従って $f$ は $R[x]$ で既約です。[Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)により $K[x]$ でも既約です。$\square$
<!-- proof-end -->

### 11.1 直接例：$x^5+10x+5$

$$
f(x)=x^5+10x+5
$$

を考えます。

$p=5$ とすると

$$
5\nmid1,
$$

中間係数は全て $5$ で割れ、

$$
5\mid10,\qquad 5\mid5,
$$

さらに

$$
25\nmid5.
$$

従って [Eisenstein の既約判定](#thm-rng4-eisenstein)から $f$ は $\mathbb Q[x]$ で既約です。

### 11.2 変数置換 $x\mapsto x+1$ で Eisenstein を使う

$$
\Phi_5(x)=x^4+x^3+x^2+x+1
$$

にはそのまま Eisenstein を適用できません。

しかし $x$ を $x+1$ に置き換えると

$$
\Phi_5(x+1)
=
x^4+5x^3+10x^2+10x+5.
$$

これは $p=5$ で Eisenstein の条件を満たします。

置換

$$
T:\mathbb Q[x]\to\mathbb Q[x],
\qquad
T(f)(x)=f(x+1)
$$

は逆写像 $f(x)\mapsto f(x-1)$ を持つ環同型です。従って可約性・既約性を保ちます。

よって

$$
x^4+x^3+x^2+x+1
$$

も $\mathbb Q[x]$ で既約です。

---

## 12. どの仮定が何をしているか

### 12.1 係数が体であること

体上の除法算法では、割る側の先頭係数の逆元を使います。

$\mathbb Z[x]$ で一般に除法ができないのは、例えば $2$ の逆元 $1/2$ が $\mathbb Z$ にないためです。

従って

$$
F[x]\text{ が Euclid 整域}
$$

の直接の原因は、**係数環 $F$ が体であること**です。

### 12.2 一意分解整域であること

[Gauss の補題](#thm-rng4-gauss-product)では、係数の共通因子を既約元へ分解し、その既約元を素元として使います。

一般の整域では既約元が素元とは限らないことを RNG3 で見ました。この機構が失われると、原始多項式の積に関する素因子を一つずつ調べる議論がそのままでは使えません。

### 12.3 原始性

Gauss の既約性移送で原始性を外すと、

$$
2x+2
=
2(x+1)
$$

のように $R[x]$ では係数の非単元因子だけで可約になり得ます。

しかし分数体 $K[x]$ では非零定数は単元なので、この因子 $2$ は見えなくなります。

従って

$$
R[x]\text{ と }K[x]\text{ の既約性を一致させる}
$$

ためには、まず content を取り除いて原始部分を見る必要があります。

### 12.4 Eisenstein の $p^2\nmid a_0$

$p\mid a_0$ だけでは、二つの因子の定数項がとも $p$ で割れることから矛盾を作れません。

証明の最後で

$$
p\mid b_0,\qquad p\mid c_0
$$

から

$$
p^2\mid a_0=b_0c_0
$$

を導き、それを排除するために $p^2\nmid a_0$ が必要です。

---

## 13. 演習

### Level A

#### RNG4-A01 体係数多項式の商と余り
- Level: A

$\mathbb Q[x]$ で

$$
f(x)=x^4+2x^3-x+1,
\qquad
g(x)=x^2+x+1
$$

とする。

$f=qg+r$、$\deg r<2$ となる $q,r$ を求めよ。

<!-- solution-start -->
##### 詳細解答

最高次項から順に消します。

まず

$$
x^4/(x^2)=x^2
$$

なので

$$
f-x^2g
=
(x^4+2x^3-x+1)
-
(x^4+x^3+x^2)
$$

$$
=
x^3-x^2-x+1.
$$

次に

$$
x^3/(x^2)=x
$$

なので

$$
(x^3-x^2-x+1)-xg
$$

$$
=
(x^3-x^2-x+1)
-
(x^3+x^2+x)
$$

$$
=
-2x^2-2x+1.
$$

さらに

$$
(-2x^2)/(x^2)=-2
$$

なので

$$
(-2x^2-2x+1)-(-2)g
$$

$$
=
(-2x^2-2x+1)
-
(-2x^2-2x-2)
=3.
$$

従って

$$
q(x)=x^2+x-2,
\qquad
r(x)=3.
$$

確認すると

$$
(x^2+x-2)(x^2+x+1)+3
=
x^4+2x^3-x+1.
$$
<!-- solution-end -->

#### RNG4-A02 content と原始部分
- Level: A

$\mathbb Z[x]$ の多項式

$$
f(x)=12x^3-18x^2+30x-6
$$

について、正の content $c(f)$ と原始部分 $f_0$ を求めよ。

<!-- solution-start -->
##### 詳細解答

係数は

$$
12,\ -18,\ 30,\ -6
$$

です。

これらの最大公約数は

$$
\gcd(12,18,30,6)=6.
$$

従って正の content は

$$
c(f)=6.
$$

各係数を $6$ で割ると

$$
f(x)
=
6(2x^3-3x^2+5x-1).
$$

従って

$$
f_0(x)=2x^3-3x^2+5x-1.
$$

$f_0$ の係数 $2,-3,5,-1$ の最大公約数は $1$ なので、$f_0$ は原始多項式です。
<!-- solution-end -->

#### RNG4-A03 有理根定理と三次式
- Level: A

$$
f(x)=3x^3-x+1
$$

が $\mathbb Q[x]$ で既約であることを示せ。

<!-- solution-start -->
##### 詳細解答

三次多項式なので、$\mathbb Q$ に根がないことを示せば既約です。

有理根を既約分数 $p/q$ とすると、[有理根定理](#thm-rng4-rational-root)から

$$
p\mid1,
\qquad
q\mid3.
$$

従って候補は

$$
\pm1,\qquad
\pm\frac13
$$

だけです。

代入すると

$$
f(1)=3,
\qquad
f(-1)=-1,
$$

$$
f(1/3)
=
3\cdot\frac1{27}
-\frac13+1
=
\frac19-\frac13+1
=
\frac79,
$$

$$
f(-1/3)
=
-\frac19+\frac13+1
=
\frac{11}{9}.
$$

いずれも $0$ ではありません。

従って $f$ は $\mathbb Q$ に根を持ちません。

$\deg f=3$ なので、2次・3次多項式の根判定から $f$ は $\mathbb Q[x]$ で既約です。
<!-- solution-end -->

#### RNG4-A04 Eisenstein 判定
- Level: A

$$
f(x)=2x^5+15x^4+30x^2+45
$$

が $\mathbb Q[x]$ で既約であることを示せ。

<!-- solution-start -->
##### 詳細解答

係数の最大公約数は $1$ なので $f$ は原始多項式です。

$p=3$ を使います。

先頭係数について

$$
3\nmid2.
$$

それ以外の係数は

$$
15,\ 0,\ 30,\ 0,\ 45
$$

であり、全て $3$ で割れます。

定数項について

$$
9\mid45
$$

なので、$p=3$ では Eisenstein の最後の条件を満たしません。

そこで $p=5$ を試します。

$$
5\nmid2,
$$

かつ

$$
5\mid15,\quad
5\mid0,\quad
5\mid30,\quad
5\mid0,\quad
5\mid45.
$$

さらに

$$
25\nmid45.
$$

従って $p=5$ で Eisenstein の条件を全て満たします。

よって $f$ は $\mathbb Z[x]$ で既約であり、[Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)から $\mathbb Q[x]$ でも既約です。
<!-- solution-end -->

### Level B

#### RNG4-B01 $\mathbb Q[x]$ の Euclid の互除法
- Level: B

$$
f(x)=x^3-1,
\qquad
g(x)=x^2-1
$$

について、$\mathbb Q[x]$ で Euclid の互除法を実行し、最大公約元を求めよ。さらにその最大公約元を $Af+Bg$ の形で表せ。

<!-- solution-start -->
##### 詳細解答

まず $f$ を $g$ で割ります。

$$
x^3-1
=
x(x^2-1)+(x-1).
$$

従って

$$
r_1=x-1.
$$

次に $g$ を $r_1$ で割ります。

$$
x^2-1
=
(x+1)(x-1)+0.
$$

従って最後の非零余りは

$$
d=x-1.
$$

よって最大公約元は、非零定数倍まで

$$
\gcd(f,g)=x-1.
$$

Bézout 表示は最初の除法式をそのまま変形して

$$
x-1
=
f-xg.
$$

従って

$$
A(x)=1,
\qquad
B(x)=-x
$$

とすれば

$$
x-1
=
A(x)f(x)+B(x)g(x).
$$

実際

$$
(x^3-1)-x(x^2-1)
=
x-1.
$$
<!-- solution-end -->

#### RNG4-B02 原始多項式の $K[x]$-同伴は $R[x]$-同伴
- Level: B

$R$ を UFD、$K$ をその分数体とする。原始多項式 $f,g\in R[x]$ が

$$
f=\lambda g,
\qquad
\lambda\in K^\times
$$

を満たすとき、$\lambda$ は $R$ の単元であることを示せ。

<!-- solution-start -->
##### 詳細解答

$\lambda$ を

$$
\lambda=\frac ab
$$

と書きます。ここで $a,b\in R$ は非零で、共通の非単元因子を持たないように取ります。

すると

$$
bf=ag.
$$

content を取ります。

$f,g$ は原始なので

$$
c(f)\sim1,
\qquad
c(g)\sim1.
$$

従って [content の乗法性](#prop-rng4-content-multiplicative)から

$$
c(bf)\sim b,
\qquad
c(ag)\sim a.
$$

二つの多項式 $bf$ と $ag$ は等しいので、その content も同伴です。従って

$$
a\sim b.
$$

つまり、ある単元 $u$ が存在して

$$
a=ub.
$$

一方、$a,b$ は共通の非単元因子を持たないように選びました。

もし $b$ が非単元なら、$b$ の既約因子は $a=ub$ も割り、$a,b$ の共通非単元因子になります。矛盾です。

従って $b$ は単元です。同様に $a=ub$ も単元です。

したがって

$$
\lambda=ab^{-1}
$$

は $R$ の単元です。

よって $f$ と $g$ は $R[x]$ でも同伴です。
<!-- solution-end -->

#### RNG4-B03 Gauss の補題と四次式
- Level: B

$$
f(x)=x^4+x+1
$$

が $\mathbb Q[x]$ で既約であることを、法 $2$ の多項式を利用して示せ。

ただし $\mathbb F_2[x]$ では四次多項式が可約なら、一次因子を持つか、二次既約多項式 $x^2+x+1$ で割り切れることを使ってよい。

<!-- solution-start -->
##### 詳細解答

$f$ は原始多項式です。従って [Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)により、$\mathbb Q[x]$ での既約性を調べるには $\mathbb Z[x]$ での非自明な因数分解を排除すれば十分です。

係数を法 $2$ で落とすと

$$
\overline f(x)=x^4+x+1
\in\mathbb F_2[x].
$$

まず一次因子の有無を調べます。

$\mathbb F_2$ の元は $0,1$ だけで、

$$
\overline f(0)=1,
$$

$$
\overline f(1)=1+1+1=1
$$

です。従って一次因子を持ちません。

次に $\mathbb F_2[x]$ の唯一のモニック既約二次多項式

$$
h(x)=x^2+x+1
$$

で割れるか調べます。

$h(x)=0$ を法とすると

$$
x^2\equiv x+1
$$

です。従って

$$
x^3
\equiv
x(x+1)
=
x^2+x
\equiv
(x+1)+x
=
1,
$$

さらに

$$
x^4\equiv x.
$$

よって

$$
x^4+x+1
\equiv
x+x+1
=
1
\not\equiv0
\pmod h.
$$

従って $h$ でも割り切れません。

したがって $\overline f$ は $\mathbb F_2[x]$ で既約です。

もし $f$ が $\mathbb Z[x]$ で二つの正次数原始多項式へ分解できれば、先頭係数はとも $\pm1$ なので、法 $2$ へ落としても各因子の次数は保たれ、$\overline f$ も可約になります。これは矛盾です。

従って $f$ は $\mathbb Z[x]$ で既約です。

[Gauss の補題による既約性の移送](#thm-rng4-gauss-irreducibility)から

$$
f(x)=x^4+x+1
$$

は $\mathbb Q[x]$ でも既約です。
<!-- solution-end -->

### Level C

#### RNG4-C01 変数置換と Eisenstein 判定を組み合わせる
- Level: C

$$
f(x)=x^4+x^3+x^2+x+1
$$

が $\mathbb Q[x]$ で既約であることを示せ。

次の順序で論証を構成せよ。

1. 写像 $T(h)(x)=h(x+1)$ が $\mathbb Q[x]$ の環自己同型であることを示す。
2. $T(f)$ を計算する。
3. [Eisenstein の既約判定](#thm-rng4-eisenstein)を適用する。
4. $f$ 自身の既約性へ戻す。

<!-- solution-start -->
##### 詳細解答

### 1. 変数置換写像が環自己同型であること

$$
T:\mathbb Q[x]\to\mathbb Q[x],
\qquad
T(h)(x)=h(x+1)
$$

と定めます。

任意の $h,k\in\mathbb Q[x]$ に対して

$$
T(h+k)(x)
=
(h+k)(x+1)
=
h(x+1)+k(x+1)
=
T(h)(x)+T(k)(x),
$$

また

$$
T(hk)(x)
=
h(x+1)k(x+1)
=
T(h)(x)T(k)(x).
$$

さらに $T(1)=1$ です。

逆写像として

$$
S(h)(x)=h(x-1)
$$

を取ると

$$
S(T(h))(x)
=
T(h)(x-1)
=
h((x-1)+1)
=
h(x),
$$

同様に

$$
T(S(h))(x)=h(x).
$$

従って $T$ は環自己同型です。

### 2. $T(f)$ の計算

$$
f(x)=x^4+x^3+x^2+x+1
$$

なので

$$
T(f)(x)
=
(x+1)^4+(x+1)^3+(x+1)^2+(x+1)+1.
$$

展開すると

$$
(x+1)^4
=
x^4+4x^3+6x^2+4x+1,
$$

$$
(x+1)^3
=
x^3+3x^2+3x+1,
$$

$$
(x+1)^2
=
x^2+2x+1.
$$

従って

$$
T(f)(x)
=
x^4+5x^3+10x^2+10x+5.
$$

### 3. Eisenstein の判定

$p=5$ を取ります。

先頭係数について

$$
5\nmid1.
$$

それ以外の係数について

$$
5\mid5,\qquad
5\mid10,\qquad
5\mid10,\qquad
5\mid5.
$$

定数項は $5$ なので

$$
25\nmid5.
$$

従って Eisenstein の条件を満たし、

$$
T(f)
$$

は $\mathbb Q[x]$ で既約です。

### 4. 元の多項式へ戻す

$T$ は環自己同型なので、$f$ が可約なら

$$
f=gh
$$

という正次数因子分解に $T$ を適用して

$$
T(f)=T(g)T(h)
$$

となります。

自己同型は単元を単元へ写し、次数もこの変数置換では変わらないので、これは $T(f)$ の非自明な因数分解です。

しかし $T(f)$ は既約でした。矛盾です。

従って

$$
\boxed{
x^4+x^3+x^2+x+1
\text{ は }\mathbb Q[x]\text{ で既約}
}
$$

です。
<!-- solution-end -->

---

## 14. 章末まとめ

本章では、RNG3 の整除論を多項式環へ持ち上げました。

- 整域 $R$ 上では
  $$
  \deg(fg)=\deg f+\deg g
  $$
  が成り立ち、$R[x]$ の単元は $R$ の単元そのものです。
- 体 $F$ 上では先頭係数を割れるため、多項式除法
  $$
  f=qg+r,\qquad \deg r<\deg g
  $$
  が成立します。
- 従って次数を Euclid 関数として
  $$
  F[x]\text{ は Euclid 整域}
  $$
  であり、PID かつ UFD です。
- UFD $R$ 上では係数の最大公約元を content として分離し、原始多項式を定義しました。
- [Gauss の補題](#thm-rng4-gauss-product)
  $$
  \text{原始}\times\text{原始}
  =
  \text{原始}
  $$
  が、係数環と分数体の因数分解を結びます。
- 原始多項式については
  $$
  R[x]\text{ で既約}
  \iff
  K[x]\text{ で既約}
  $$
  です。
- その結果
  $$
  R\text{ が UFD}
  \Longrightarrow
  R[x]\text{ が UFD}
  $$
  が得られました。
- 具体的な既約判定として、有理根定理、次数 $2,3$ の根判定、Eisenstein の判定を使いました。

これで環論の主線

$$
\boxed{
\text{環・イデアル}
\to
\text{素・極大イデアル}
\to
\text{ED・PID・UFD}
\to
\text{多項式環・Gauss の補題}
}
$$

が閉じました。

次の抽象代数主線では **MOD1「加群・部分加群・商加群・自由加群」** へ進みます。体論側では RNG4 を prerequisite として FLD1「体拡大・代数的元」へ分岐できます。
