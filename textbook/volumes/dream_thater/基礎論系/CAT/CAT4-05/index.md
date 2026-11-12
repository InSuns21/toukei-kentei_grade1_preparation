# CAT4-05 閉モノイダル圏と Cartesian closed category

## 1. テンソル積からの射を、通常の射として表せるか

[モノイダル圏](../CAT4-01/index.md#def-cat4-01-monoidal)では二対象を $X\otimes A$ にまとめられる。前講ではこの積と両立する関手やモノイド対象を考えた。しかし、$X\otimes A$ から $B$ への射を、$X$ だけから出る射として一括して扱う道具はまだない。

集合では、二引数の関数 $f:X\times A\to B$ に対して、$x$ を固定した関数 $a\mapsto f(x,a)$ を作る。これを $x$ ごとに集めると、$X$ から「$A$ から $B$ への関数全体」への関数になる。**二引数を一引数へ移す操作**がカリー化である。

この操作を集合の元に頼らずに定義するには、既習の[Hom集合による随伴](../CAT2-08/index.md#def-cat2-08-adjunction)を使える。テンソル積を固定した関手 $(-)\otimes A$ が右随伴を持つ場合を考え、本講では、二引数の射を復元する論証、三変数の自然性、積に対する同様の構造まで確認する。

射の合成 $gf$ は右から左へ読む。圏は特に断らない限り局所小とし、Homは集合である。小さい圏である必要はない。

## 2. 閉構造：テンソルを右辺へ移す

### 2.1 固定した入力に対する右随伴

対象 $A$ を固定すると、[テンソル双関手](../CAT4-01/index.md#def-cat4-01-tensor-bifunctor)から $T_A(X)=X\otimes A$、$T_A(h)=h\otimes1_A$ という関手 $T_A:\mathcal C\to\mathcal C$ が得られる。これに右随伴があれば、$X\otimes A\to B$ の情報を $X$ から出る射の情報へ移せる。

<a id="def-cat4-05-right-closed"></a>

<!-- formal-statement-start -->
> **定義（右閉モノイダル圏と内部Hom）**  
> 局所小モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ が**右閉**であるとは、各対象 $A$ に対して、関手 $T_A=(-)\otimes A$ が右随伴 $R_A$ を持つことをいう。$R_A(B)$ を $[A,B]$ と書き、**内部Hom**と呼ぶ。この随伴は $X,B$ に自然な全単射

$$
\Phi^A_{X,B}:
\operatorname{Hom}_{\mathcal C}(X\otimes A,B)
\xrightarrow{\ \cong\ }
\operatorname{Hom}_{\mathcal C}(X,[A,B])
$$

> によって指定される。$f:X\otimes A\to B$ の像を $f^\sharp:X\to[A,B]$、逆対応を $g^\flat:X\otimes A\to B$ と書く。
<!-- formal-statement-end -->

**「右閉」の向きに注意する。** $A\otimes(-)$ に右随伴があることは別の条件（左閉性）であり、組紐がない一般のモノイダル圏では二つを混同できない。以下で単に「閉モノイダル圏」と書くときは、この章で指定した右閉性を意味する。対称モノイダル圏では[対称性](../CAT4-03/index.md#def-cat4-03-symmetric)によって二方向が移し替えられるが、右閉性の証明自体に対称性は要らない。

[随伴の単位・余単位](../CAT2-09/index.md#def-cat2-09-unit)を $T_A\dashv R_A$ に適用すると、余単位の $B$ 成分は

$$
\operatorname{ev}_{A,B}:[A,B]\otimes A\longrightarrow B
$$

となる。これを**評価射**という。内部Homの元を「関数のように」入力 $A$ へ作用させる射と考えればよい。ただし、一般の圏では文字どおりの関数の集合とは限らない。

<!-- definition-example-start: def-cat4-05-right-closed -->
**定義の直接確認（集合）。** $\mathbf{Set}$ は直積で[モノイダル圏](../CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)になる。$[A,B]=B^A$ を関数 $A\to B$ の集合とし、任意の $f:X\times A\to B$ に

$$
f^\sharp(x)(a)=f(x,a)
$$

を対応させる。逆に $g:X\to B^A$ から $g^\flat(x,a)=g(x)(a)$ を定める。いずれも定義域・値域が合い、$(f^\sharp)^\flat(x,a)=f(x,a)$、$(g^\flat)^\sharp(x)(a)=g(x)(a)$ なので逆写像である。$h:X'\to X$、$k:B\to B'$ に対しては

$$
(f\circ(h\times1_A))^\sharp=f^\sharp\circ h,
\qquad
(k\circ f)^\sharp=k_*\circ f^\sharp,
$$

ただし $k_*:B^A\to(B')^A$ は $k_*(q)=k\circ q$ と定める。各 $x',a$ で両辺を評価すればそれぞれ $f(h(x'),a)$、$k(f(x,a))$ となる。よって二変数の自然性も成立し、右随伴の定義を全て満たす。
<!-- definition-example-end -->

### 2.2 評価射とカリー化の普遍性

<a id="thm-cat4-05-evaluation-curry"></a>

<!-- formal-statement-start -->
> **定理（評価射とカリー化の普遍性）**  
> 局所小モノイダル圏 $\mathcal C$ と対象 $A$ について、関手 $(-)\otimes A$ が右随伴を持つことは、各 $B$ に対象 $[A,B]$ と射 $\operatorname{ev}_{A,B}:[A,B]\otimes A\to B$ が存在し、任意の $X$ と $f:X\otimes A\to B$ に対して、ただ一つの $\widehat f:X\to[A,B]$ が存在して

$$
\operatorname{ev}_{A,B}(\widehat f\otimes1_A)=f
$$

> を満たすことと同値である。このとき $\widehat f=f^\sharp$ であり、逆転置は

$$
g^\flat=\operatorname{ev}_{A,B}(g\otimes1_A)
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

随伴のHom全単射で恒等射 $1_{[A,B]}$ を逆転置すれば評価射が得られる。自然性により任意の $g$ の逆転置は評価射との合成になる。反対向きは唯一の $\widehat f$ を転置とし、合成による自然性を確かめる。

<!-- proof-start -->
### 証明

まず右随伴があるとする。[随伴の転置公式](../CAT2-09/index.md#prop-cat2-09-transpose)に従って

$$
\operatorname{ev}_{A,B}
=\bigl(1_{[A,B]}\bigr)^\flat
$$

とおく。$g:X\to[A,B]$ を選び、$\Phi^{-1}$ の $X$ に関する自然性を $g:X\to[A,B]$ に適用する。右上側で恒等射を前合成すると $g$、左側では $1_{[A,B]}\otimes1_A$ の前に $g\otimes1_A$ を作用させるから

$$
g^\flat
=\bigl(1_{[A,B]}\bigr)^\flat(g\otimes1_A)
=\operatorname{ev}_{A,B}(g\otimes1_A).
$$

$f$ に対して $g=\Phi^A_{X,B}(f)$ と置けば、$g^\flat=f$ なので評価の等式を満たす。別の $\widehat f$ も満たせば $\Phi$ を両辺に適用して $\widehat f=\Phi(f)$、一意である。

逆に $[A,B]$ と評価射の普遍性を仮定する。$f\mapsto\widehat f$ を定め、$g\mapsto\operatorname{ev}(g\otimes1_A)$ をその逆候補とする。前者の逆転置は定義から $f$、後者の転置は $g$ 自身が等式を満たすことと一意性から $g$ になる。よって全単射である。

自然性を確かめるため $h:X'\to X$ と $f:X\otimes A\to B$ を取る。テンソルの関手律より

$$
\begin{aligned}
\operatorname{ev}_{A,B}((f^\sharp h)\otimes1_A)
&=\operatorname{ev}_{A,B}(f^\sharp\otimes1_A)(h\otimes1_A)\\
&=f(h\otimes1_A).
\end{aligned}
$$

したがって一意性から $(f(h\otimes1_A))^\sharp=f^\sharp h$。

次に $v:B\to B'$ から

$
[A,v]=\bigl(v\,\operatorname{ev}_{A,B}\bigr)^\sharp:[A,B]\to[A,B']
$

と定める。評価の普遍性を二度適用すれば

$
\operatorname{ev}_{A,B'}([A,v]\otimes1_A)
=v\operatorname{ev}_{A,B},\qquad
(vf)^\sharp=[A,v]f^\sharp.
$

恒等射の場合は $[A,1_B]=1_{[A,B]}$、$v':B'\to B''$ を続けた場合は、評価へ戻して比較することで $[A,v'v]=[A,v'][A,v]$ を得る。従って $B\mapsto[A,B]$ は関手 $R_A$ をなし、上式は $B$ に関する自然性を示す。これにより $(-)\otimes A\dashv R_A$ の[二変数自然なHom全単射](../CAT2-08/index.md#def-cat2-08-adjunction)を得る。
<!-- proof-end -->

この定理の主張は「任意の射にカリー化という記号を付けられる」だけではない。**元の二引数の射を評価から一意に復元できる**という普遍性が核心である。

## 3. 入力と出力を変えたときの内部Hom

### 3.1 二変数関手としての内部Hom

固定した $A$ に対する右随伴 $[A,-]$ は共変関手である。一方、入力 $A$ を $u:A'\to A$ で変えると、関数の場合の前合成と同じく、内部Homは逆向きに変わる。

<a id="prop-cat4-05-internal-hom-functor"></a>

<!-- formal-statement-start -->
> **命題（内部Homの反変・共変性）**  
> 局所小右閉モノイダル圏 $\mathcal C$ について、内部Homは双関手

$$
[-,-]:\mathcal C^{\mathrm{op}}\times\mathcal C\to\mathcal C
$$

> をなす。射 $u:A'\to A$ と $v:B\to B'$ の組に対応する $[u,v]:[A,B]\to[A',B']$ は、次の射の一意な転置である。

$$
[A,B]\otimes A'
\xrightarrow{\,1\otimes u\,}[A,B]\otimes A
\xrightarrow{\,\operatorname{ev}_{A,B}\,}B
\xrightarrow{\,v\,}B'.
$$

> 特に $f:X\otimes A\to B$ について

$$
\bigl(vf(1_X\otimes u)\bigr)^\sharp
=[u,v]\,f^\sharp
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$[u,v]$ は「評価してから $v$ を作用させる／入力を $u$ で読み替える」射を転置して作る。恒等射・合成の保存と最後の式は、評価射へ戻して一意性を用いる。

<!-- proof-start -->
### 証明

$[u,v]$ の存在・一意性は[評価の普遍性](#thm-cat4-05-evaluation-curry)から従う。$u=1_A$、$v=1_B$ のとき、評価射そのものの転置は $1_{[A,B]}$ だから、恒等射を保つ。

さらに $u':A''\to A'$、$v':B'\to B''$ とする。$[u',v'][u,v]$ を評価射に戻すと

$$
\begin{aligned}
&\operatorname{ev}_{A'',B''}\bigl(([u',v'][u,v])\otimes1_{A''}\bigr)\\
&\quad=v'\operatorname{ev}_{A',B'}([u,v]\otimes u')\\
&\quad=v'v\operatorname{ev}_{A,B}(1_{[A,B]}\otimes (uu')).
\end{aligned}
$$

ここで中段の等式は、$[u',v']$ の定義に対して $[u,v]\otimes1_{A''}$ を前合成したもの、最後の等式は $[u,v]$ の定義とテンソルの関手律である。右辺は $[uu',v'v]$ を定義する評価射そのものなので、転置の一意性から

$$
[u',v'][u,v]=[uu',v'v].
$$

最後に $[u,v]f^\sharp$ を評価へ戻すと

$$
\begin{aligned}
\operatorname{ev}_{A',B'}(([u,v]f^\sharp)\otimes1_{A'})
&=v\,\operatorname{ev}_{A,B}(f^\sharp\otimes u)\\
&=v\,\operatorname{ev}_{A,B}(f^\sharp\otimes1_A)
(1_X\otimes u)\\
&=vf(1_X\otimes u).
\end{aligned}
$$

よって指定した転置と等しい。
<!-- proof-end -->

**定義の直接例（線形写像）。** 体 $k$ のベクトル空間で $[A,B]=\operatorname{Hom}_k(A,B)$ とした場合、$[u,v](q)=vqu$ である。$u'$、$v'$ を続けると $v'(vqu)u'=(v'v)q(uu')$ となり、反変・共変の合成則を元の線形写像で確認できる。

### 3.2 テンソルを続けて移す

<a id="thm-cat4-05-iterated-curry"></a>

<!-- formal-statement-start -->
> **定理（反復カリー化）**  
> 局所小右閉モノイダル圏 $\mathcal C$ と対象 $A,B,C$ に対して、自然同型

$$
[A\otimes B,C]\ \cong\ [A,[B,C]]
$$

> が存在する。同型は $A,B,C$ の射に自然であり、モノイダル圏の結合子を含めて定まる。
<!-- formal-statement-end -->

### 証明の見取り図

$X\otimes(A\otimes B)$ の括弧を結合子の逆で $(X\otimes A)\otimes B$ へ移し、先に $B$、次に $A$ をカリー化する。二つの内部Homはすべての $X$ からの射を自然に同じ集合へ対応させるので、対象として自然同型になる。

<!-- proof-start -->
### 証明

任意の対象 $X$ と射 $f:X\otimes(A\otimes B)\to C$ を取る。結合子 $\alpha_{X,A,B}:(X\otimes A)\otimes B\to X\otimes(A\otimes B)$ によって

$$
f\alpha_{X,A,B}:(X\otimes A)\otimes B\to C
$$

を作る。これをまず $B$ で転置すると $(f\alpha)^\sharp:X\otimes A\to[B,C]$。続いて $A$ で転置すると

$$
\bigl((f\alpha_{X,A,B})^\sharp\bigr)^\sharp:
X\longrightarrow[A,[B,C]].
$$

逆向きは二回の逆転置の後に $\alpha_{X,A,B}^{-1}$ を前合成して構成する。二度の全単射と結合子の同型を合成したので、これらは互いに逆である。結合子の自然性と[転置の自然性](#prop-cat4-05-internal-hom-functor)から $X$ に自然。

$H=[A\otimes B,C]$、$K=[A,[B,C]]$ と置き、先に構成した自然なHom全単射を $\beta_X:\operatorname{Hom}(X,H)\to\operatorname{Hom}(X,K)$ と書く。恒等射を代入して、次の二射を作る。

$
\theta=\beta_H(1_H):H\to K,\qquad
\psi=\beta_K^{-1}(1_K):K\to H.
$

$\beta$ が $X$ に自然だから、任意の $h:X\to H$ と $g:X\to K$ に対して

$
\beta_X(h)=\theta h,\qquad
\beta_X^{-1}(g)=\psi g.
$

従って $X=H$ として $h=1_H$ を転置・逆転置すると $\psi\theta=1_H$。また $X=K$ として $g=1_K$ を逆転置・転置すると $\theta\psi=1_K$ となる。よって $\theta$ は同型である。

さらに $u:A'\to A$、$v:B'\to B$、$w:C\to C'$ を取る。$f:X\otimes(A\otimes B)\to C$ から両経路で得る射は、[内部Homの作用](#prop-cat4-05-internal-hom-functor)と結合子の自然性によって、ともに

$
w\,f\,(1_X\otimes(u\otimes v)):
X\otimes(A'\otimes B')\to C'
$

を二度転置したものである。一意性により $A,B,C$ に関する自然性も成立する。
<!-- proof-end -->

これは「括弧が文字どおり等しい」という主張ではない。[モノイダル圏の結合子](../CAT4-01/index.md#def-cat4-01-monoidal)を用いた**正準的な同型**である。

## 4. 積に特化した閉構造：関数を対象にする

### 4.1 二項積を用いた評価

[圏論の二項積](../CAT2-02/index.md#def-cat2-02-binary-product)が存在すれば、$X\times A$ は「二つの射の組を作る」普遍性を持つ。さらにそこからの射を $X$ からの射として表示できるなら、$A$ を入力とする関数の空間に似た対象を得る。一般の圏ではそれが実在するかを別途確認しなくてはならない。

<a id="def-cat4-05-exponential"></a>

<!-- formal-statement-start -->
> **定義（指数対象）**  
> 局所小圏 $\mathcal C$ が圏論の二項積を持つとする。対象 $A,B$ に対する**指数対象** $B^A$ とは、対象 $E$ と評価射 $\operatorname{ev}:E\times A\to B$ の組で、任意の対象 $X$、射 $f:X\times A\to B$ に対し、ただ一つの射 $\Lambda(f):X\to E$ が存在し、

$$
\operatorname{ev}(\Lambda(f)\times1_A)=f
$$

> を満たすものである。$E$ を $B^A$ と書き、$\Lambda(f)$ を $f$ の**カリー化**という。
<!-- formal-statement-end -->

**型を分ける。** $\Lambda(f)$ の始域は $X$、終域は $B^A$。評価射の始域は $B^A\times A$ なので、$\Lambda(f)\times1_A$ の始域・終域はそれぞれ $X\times A$、$B^A\times A$ となり、合成できる。積の添字の順を入れ替えてはいけない。

<!-- definition-example-start: def-cat4-05-exponential -->
**定義の確認（有限集合）。** $A=\{0,1\}$、$B=\{a,b,c\}$ とすると $B^A$ は $3^2=9$ 個の写像からなる集合。$X=\{p,q\}$ で $f(p,0)=a,\ f(p,1)=b,\ f(q,0)=c,\ f(q,1)=c$ とする。$\Lambda(f)(p)$ は $(a,b)$ を値に持つ写像、$\Lambda(f)(q)$ は $(c,c)$ を値に持つ写像である。任意の $(x,t)\in X\times A$ について

$$
\operatorname{ev}(\Lambda(f)(x),t)=\Lambda(f)(x)(t)=f(x,t).
$$

逆に $g:X\to B^A$ が同じ等式を満たせば、全ての $x,t$ について $g(x)(t)=f(x,t)$。外延性から各 $g(x)=\Lambda(f)(x)$ であり、$g=\Lambda(f)$。よって存在も一意性も確かめた。
<!-- definition-example-end -->

### 4.2 有限積と指数対象の組合せ

<a id="def-cat4-05-ccc"></a>

<!-- formal-statement-start -->
> **定義（Cartesian closed category）**  
> **Cartesian closed category（Cartesian 閉圏）**とは、終対象と全ての二項積を持ち、任意の二対象 $A,B$ に対して指数対象 $B^A$ が存在する局所小圏である。
<!-- formal-statement-end -->

終対象と二項積があれば[有限積の存在判定](../CAT2-02/index.md#thm-cat2-02-finite-products)により有限積があり、[有限積からのモノイダル構造](../CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)を使える。従って積をテンソルとする閉構造を考える資格がある。ただし指数対象の存在は有限積から自動的には出ない。

<!-- definition-example-start: def-cat4-05-ccc -->
**定義の確認（集合）。** $\mathbf{Set}$ の終対象は一元集合、二項積は直積である。任意の集合 $A,B$ に対する $B^A$ は前節の全ての関数の集合として存在する。評価とカリー化の普遍性を任意の $X$ について確認したので、$\mathbf{Set}$ は Cartesian 閉圏である。$\mathbf{FinSet}$ でも直積と関数集合は有限集合に留まり、同じ論証が成立する。
<!-- definition-example-end -->

<a id="thm-cat4-05-cartesian-characterization"></a>

<!-- formal-statement-start -->
> **定理（Cartesian 閉圏と閉モノイダル構造）**  
> 局所小圏 $\mathcal C$ が終対象と二項積を持つとする。このとき次は同値である。
>
> 1. $\mathcal C$ は Cartesian 閉圏である。
> 2. 二項積をテンソルとするモノイダル圏 $(\mathcal C,\times,1)$ が右閉である。
>
> 対応する内部Homは指数対象 $[A,B]=B^A$ であり、Hom全単射は

$$
\operatorname{Hom}(X\times A,B)
\cong\operatorname{Hom}(X,B^A)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

指数対象の定義は[評価射による右随伴の特徴付け](#thm-cat4-05-evaluation-curry)において $\otimes$ を $\times$ へ替えたものである。ただし始めに、有限積がモノイダル構造を与えることを確認する。

<!-- proof-start -->
### 証明

終対象と二項積を仮定しているので、[有限積からのモノイダル構造の定理](../CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)により $\otimes=\times$、$I=1$ は結合子・単位子を含むモノイダル圏をなす。

（1）を仮定すると、任意の $A,B$ に指数対象 $B^A$ と評価射がある。[評価射とカリー化の普遍性](#thm-cat4-05-evaluation-curry)の逆向きに $\mathcal C$、$A$、$B$ を代入する。転置の $X$ に関する自然性は

$$
\operatorname{ev}((\Lambda(f)h)\times1_A)
=f(h\times1_A)
$$

と一意性から得られる。$B$ に関する自然性も、$v:B\to B'$ に対して

$$
B^A(v)=\Lambda(v\operatorname{ev}_{A,B})
$$

と定めれば、同じ一意性によって成立する。従って $(-)\times A$ は右随伴を持ち（2）が成立する。

逆に（2）を仮定すると、各 $(-)\times A$ の右随伴 $[A,-]$ がある。[評価射とカリー化の普遍性](#thm-cat4-05-evaluation-curry)を $(-)\times A$ に適用すれば、各 $A,B$ に評価射と一意の転置が存在する。これは[指数対象の定義](#def-cat4-05-exponential)そのものであり（1）が成立する。
<!-- proof-end -->

### 4.3 単位対象による確認

指数対象が存在すると、$A=1$ に対する転置は $\operatorname{Hom}(X\times1,B)\cong\operatorname{Hom}(X,B)$ を表す。右単位子 $X\times1\cong X$ と組み合わせれば

$$
B^1\cong B.
$$

一般の右閉モノイダル圏でも同様に $[I,B]\cong B$ となる。これは[右随伴の自然同型一意性](../CAT2-08/index.md#thm-cat2-08-right-unique)からも得られる。対象の等号でなく自然同型である点を確認する。

## 5. 具体例・非例：閉性とCartesian性は別物

### 5.1 ベクトル空間：閉だがCartesianではない

体 $k$ のベクトル空間の圏 $\mathbf{Vect}_k$ を考え、$\otimes_k$ と単位 $k$ を使う。ベクトル空間 $A,B$ に対して $[A,B]=\operatorname{Hom}_k(A,B)$ とする。ここで右辺は**線形写像の集合を線形演算でベクトル空間にしたもの**であり、単なる集合のHomではない。

<a id="thm-cat4-05-vector-spaces"></a>

<!-- formal-statement-start -->
> **定理（ベクトル空間の閉構造）**  
> 任意の体 $k$ について、$\mathbf{Vect}_k$ はテンソル積 $\otimes_k$ に関して右閉モノイダル圏である。任意のベクトル空間 $X,A,B$（有限次元の仮定なし）について、自然な線形写像の集合の全単射

$$
\operatorname{Hom}_k(X\otimes_k A,B)
\cong
\operatorname{Hom}_k(X,\operatorname{Hom}_k(A,B))
$$

> が存在し、評価射は $\operatorname{ev}(q\otimes a)=q(a)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

テンソル積の普遍性により $X\times A$ 上の双線形写像と $X\otimes A$ 上の線形写像が対応する。双線形写像で第一変数を固定すると $A\to B$ の線形写像が得られ、第二変数の双線形性が $X\to\operatorname{Hom}(A,B)$ の線形性になる。

<!-- proof-start -->
### 証明

[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)により、$f:X\otimes_k A\to B$ を与えることと、双線形写像 $b_f(x,a)=f(x\otimes a)$ を与えることは同値である。$x$ を固定すると、$a\mapsto b_f(x,a)$ は線形なので $\widehat f(x)\in\operatorname{Hom}_k(A,B)$ を定める。$s,t\in k$ と $x,y\in X$ について

$$
\begin{aligned}
\widehat f(sx+ty)(a)
&=f((sx+ty)\otimes a)\\
&=s f(x\otimes a)+t f(y\otimes a)\\
&=(s\widehat f(x)+t\widehat f(y))(a).
\end{aligned}
$$

全ての $a$ で一致するので $\widehat f:X\to\operatorname{Hom}_k(A,B)$ は線形である。

逆に線形な $g:X\to\operatorname{Hom}_k(A,B)$ に対して $(x,a)\mapsto g(x)(a)$ は、$g$ の線形性と $g(x)$ の線形性から各変数で線形である。従ってテンソル積の普遍性により一意の $g^\flat:X\otimes_k A\to B$ が存在し、

$$
g^\flat(x\otimes a)=g(x)(a)
$$

となる。純テンソルで比較すると $(\widehat f)^\flat=f$ であり、全ての $x,a$ について $(g^\flat)^\sharp(x)(a)=g(x)(a)$ だから $(g^\flat)^\sharp=g$。前合成・後合成の自然性も、純テンソル $x\otimes a$ 上でいずれも $v f(h(x)\otimes a)$ となることから成立する。有限次元性は一度も使っていない。
<!-- proof-end -->

これは閉モノイダル圏だが、Cartesian積に関する主張ではない。例えば $k\otimes_k k\cong k$ なのに、圏論的二項積は $k\times k$ であり、$k$ と $k\times k$ は次元が $1$ と $2$ で同型でない。**内部Homがあってもテンソルが直積とは限らない。**

### 5.2 二元順序圏：指数対象は含意

$P=\{0\le1\}$ を[順序圏](../CAT1-01/index.md#def-cat1-01-category)として扱う。この圏の終対象は $1$、積は $a\wedge b=\min(a,b)$ である。射は $a\to b$ が $a\le b$ のときに限り一本だけある。

<a id="prop-cat4-05-two-poset"></a>

<!-- formal-statement-start -->
> **命題（二元順序圏の指数）**  
> 上の二元順序圏 $P$ は Cartesian 閉圏である。指数 $b^a$ は

$$
b^a=
\begin{cases}
0,&a=1,\ b=0,\\
1,&\text{それ以外}
\end{cases}
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

指数のHom全単射は、Hom集合が空集合または一元集合なので、不等式 $x\wedge a\le b$ と $x\le b^a$ が同値であることに帰着する。

<!-- proof-start -->
### 証明

$a=0$ なら $x\wedge0=0\le b$ は全ての $x,b$ で成立する。従って $x\le b^0$ が全ての $x$ で成り立つ必要があり、$b^0=1$ が唯一の選択である。

$a=1$ なら $x\wedge1=x$ なので、条件は $x\le b$。従って $b^1=b$ とすれば全ての $x$ について同値になる。各場合にHom集合の空／一元が一致するので、一意な全単射が得られる。順序圏では該当する射は一意だから自然性も成立する。
<!-- proof-end -->

この例は、指数対象が必ず「具体的な関数の集合」になるわけではないことを示す。

### 5.3 反例：基点付き集合はCartesian閉ではない

<a id="prop-cat4-05-pointed-not-ccc"></a>

<!-- formal-statement-start -->
> **命題（基点付き集合の反例）**  
> 基点付き集合と基点保存写像の圏 $\mathbf{Set}_*$ は終対象と二項積を持つが、Cartesian 閉圏ではない。
<!-- formal-statement-end -->

### 証明の見取り図

終対象から任意の基点付き集合への基点保存写像は一つしかない。もし指数対象があれば、$X=1$ とした普遍性によって、特定の $A,B$ 間の基点保存写像も一つしかないことになる。二点集合ではこれは偽である。

<!-- proof-start -->
### 証明

終対象 $1=\{*\}$ は一元基点集合。二項積は基点 $(a_0,b_0)$ を備えた直積 $(A\times B,(a_0,b_0))$ である。実際、二つの基点保存射を組にする写像も基点を保ち、積の普遍性を満たす。

$A=B=\{*,a\}$ を基点 $*$ 付き二点集合とする。基点保存写像 $A\to B$ には恒等写像と、全てを $*$ へ送る定値写像の二本があり、両者は $a$ の像が異なる。

もし $B^A$ が存在すれば、指数の普遍性を $X=1$ に適用して

$$
\operatorname{Hom}_{*}(1\times A,B)
\cong\operatorname{Hom}_{*}(1,B^A)
$$

となる。$1\times A\cong A$ なので左辺は少なくとも二元集合。一方、$1$ から任意の基点付き集合 $E$ への基点保存写像は唯一なので、右辺は一元集合。全単射は存在せず、矛盾する。
<!-- proof-end -->

失われたのは積の存在ではなく、**積との間の右随伴**である。集合の直積で通ったカリー化を基点付き集合へ形式的に移植すると、$X=1$ の段階でHom集合の濃度が合わなくなる。

## 6. 演習：普遍性から自力で計算する

### CAT4-05-A01 転置と逆転置の型

- Level: A
- ID: CAT4-05-A01

右閉モノイダル圏で $f:X\otimes A\to B$、$g:X\to[A,B]$ とする。$f^\sharp$、$g^\flat$ の型と、評価射による $g^\flat$ の式を示せ。

<!-- solution-start -->
**詳細解答。** [右閉性の定義](#def-cat4-05-right-closed)によって $f^\sharp:X\to[A,B]$、$g^\flat:X\otimes A\to B$ である。$g\otimes1_A$ は $X\otimes A\to[A,B]\otimes A$ なので、評価射と合成でき、

$$
g^\flat=\operatorname{ev}_{A,B}(g\otimes1_A).
$$

出発点を $X\otimes A$、終点を $B$ として両射の型も一致する。
<!-- solution-end -->

### CAT4-05-A02 有限集合のカリー化

- Level: A
- ID: CAT4-05-A02

$A=\{0,1\}$、$B=\{a,b\}$、$X=\{p,q\}$ とし、$f(p,0)=a$、$f(p,1)=b$、$f(q,0)=b$、$f(q,1)=b$ とする。$B^A$ の要素数と $f^\sharp$ の二つの値を求め、逆転置を検算せよ。

<!-- solution-start -->
**詳細解答。** $A$ の各元について $B$ の二値を独立に選べるため $|B^A|=2^2=4$。$\ f^\sharp(p)$ は $0\mapsto a,\ 1\mapsto b$、$f^\sharp(q)$ は両元を $b$ に送る関数である。$x=p,q$、$t=0,1$ の各組について

$$
(f^\sharp)^\flat(x,t)=\operatorname{ev}(f^\sharp(x),t)=f^\sharp(x)(t)=f(x,t)
$$

となり、四つの入力全てで元の表と一致する。
<!-- solution-end -->

### CAT4-05-A03 内部Homの射の向き

- Level: A
- ID: CAT4-05-A03

$u:A'\to A$ と $v:B\to B'$ に対して $[u,v]$ の始域・終域と、線形空間の例における $[u,v](q)$ を答えよ。

<!-- solution-start -->
**詳細解答。** [内部Homの反変・共変性](#prop-cat4-05-internal-hom-functor)から $[u,v]:[A,B]\to[A',B']$。$\mathbf{Vect}_k$ なら

$$
[u,v](q)=v\circ q\circ u:A'\to B'.
$$

実際、$u$ を先に作用させるので入力は $A'$ へ変わり、$v$ を最後に作用させるので出力は $B'$ へ変わる。$[A',B]\to[A,B']$ という逆向きの記述では合成の型が合わない。
<!-- solution-end -->

### CAT4-05-A04 二元順序圏の四通り

- Level: A
- ID: CAT4-05-A04

$P=\{0\le1\}$ において $b^a$ の四値を全て列挙し、$a=1,b=0$ のとき $x\wedge a\le b\iff x\le b^a$ を確認せよ。

<!-- solution-start -->
**詳細解答。** [二元順序圏の指数](#prop-cat4-05-two-poset)より $0^0=1$、$1^0=1$、$0^1=0$、$1^1=1$。$a=1,b=0$ では左辺は $x\wedge1=x\le0$、右辺は $x\le0^1=0$ なので、$x=0$ のとき真、$x=1$ のとき偽で、二つは一致する。ほかの三場合は $x\wedge a\le b$ が常に真であり $b^a=1$ と整合する。
<!-- solution-end -->

### CAT4-05-A05 評価射の型

- Level: A
- ID: CAT4-05-A05

指数対象 $B^A$ があるとき、射 $h:Y\to X$ に対して $\Lambda(f(h\times1_A))=\Lambda(f)h$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [指数対象の評価の一意性](#def-cat4-05-exponential)で右辺を評価する。直積の関手律から

$$
\begin{aligned}
\operatorname{ev}((\Lambda(f)h)\times1_A)
&=\operatorname{ev}(\Lambda(f)\times1_A)(h\times1_A)\\
&=f(h\times1_A).
\end{aligned}
$$

右辺は $Y\times A\to B$。従って $\Lambda(f)h:Y\to B^A$ は $f(h\times1_A)$ の転置の定義条件を満たし、一意性から主張が従う。
<!-- solution-end -->

### CAT4-05-B01 三変数の自然性を再構成する

- Level: B
- ID: CAT4-05-B01

右閉モノイダル圏で $f:X\otimes A\to B$、$u:A'\to A$、$v:B\to B'$、$h:Y\to X$ に対し、$(vf(h\otimes u))^\sharp$ を $f^\sharp$ で表せ。中間式を示せ。

<!-- solution-start -->
**詳細解答。** $h\otimes u:Y\otimes A'\to X\otimes A$ と型付ける。まずテンソルの関手律から

$$
h\otimes u=(1_X\otimes u)(h\otimes1_{A'}).
$$

[内部Homの自然性](#prop-cat4-05-internal-hom-functor)を $u,v$ に適用すると

$$
(vf(1_X\otimes u))^\sharp=[u,v]f^\sharp.
$$

次に $Y$ からの前合成について[転置の自然性](#thm-cat4-05-evaluation-curry)を使えば

$$
\bigl(vf(h\otimes u)\bigr)^\sharp
=\bigl(vf(1_X\otimes u)(h\otimes1_{A'})\bigr)^\sharp
=[u,v]f^\sharp h.
$$

右辺の型は $Y\to[A',B']$ である。
<!-- solution-end -->

### CAT4-05-B02 有限集合で反復カリー化する

- Level: B
- ID: CAT4-05-B02

$A=B=X=\{0,1\}$、$C=\{0,1\}$ とする。$f:X\times(A\times B)\to C$ を $f(x,(a,b))=x+a+b\pmod2$ で定める。$[A\otimes B,C]\cong[A,[B,C]]$ に対応する二段階のカリー化を書き、$x=1$ の像を $a=0,1$ で明示せよ。

<!-- solution-start -->
**詳細解答。** 集合の直積に対する結合子の逆で $((x,a),b)$ を $(x,(a,b))$ に対応させる。第一段階は

$$
g(x,a)(b)=f(x,(a,b))=x+a+b\pmod2.
$$

第二段階は $h(x)(a)=g(x,a)$、すなわち $h(x)(a)(b)=x+a+b\pmod2$。$x=1$ のとき $h(1)(0)$ は $b\mapsto1+b\pmod2$（$0\mapsto1,\ 1\mapsto0$）、$h(1)(1)$ は $b\mapsto b$（$0\mapsto0,\ 1\mapsto1$）。逆転置を二回行うと $f(x,(a,b))$ に戻り、[反復カリー化](#thm-cat4-05-iterated-curry)を具体的に確認した。
<!-- solution-end -->

### CAT4-05-B03 テンソルの内部Homを計算する

- Level: B
- ID: CAT4-05-B03

$k=\mathbb R$、$X=\mathbb R^2$、$A=\mathbb R^2$、$B=\mathbb R$ とし、双線形写像 $b(x,a)=x_1a_1+2x_2a_2$ から定まる $f:X\otimes_{\mathbb R}A\to B$ を取る。転置 $f^\sharp$ を求め、線形性と評価を示せ。

<!-- solution-start -->
**詳細解答。** [テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)により $f(x\otimes a)=b(x,a)$ となる唯一の線形写像 $f$ がある。[線形空間の閉構造](#thm-cat4-05-vector-spaces)の転置は

$$
f^\sharp(x)(a)=x_1a_1+2x_2a_2.
$$

従って $f^\sharp(x)$ を行ベクトルで表せば $(x_1,2x_2)$。任意の $s,t\in\mathbb R$ と $x,y$ に対し

$$
f^\sharp(sx+ty)=(sx_1+ty_1,\ 2sx_2+2ty_2)
=sf^\sharp(x)+tf^\sharp(y)
$$

なので線形である。さらに

$$
\operatorname{ev}(f^\sharp(x)\otimes a)
=f^\sharp(x)(a)=x_1a_1+2x_2a_2=f(x\otimes a).
$$

純テンソルは始域を生成するから、評価の等式は全てのテンソルに拡張される。
<!-- solution-end -->

### CAT4-05-B04 基点付き集合の失敗機構

- Level: B
- ID: CAT4-05-B04

基点付き二点集合 $A=B=\{*,a\}$ について、終対象と積は存在するのに $B^A$ が存在しないことを、$X=1$ でのHom集合の要素数から独立に証明せよ。

<!-- solution-start -->
**詳細解答。** 基点付き集合の終対象 $1$ は一元集合で、積は座標ごとの基点を指定した直積。従って $1\times A\cong A$。$A\to B$ の基点保存射には $a\mapsto a$ と $a\mapsto *$ の二つがあるので

$$
|\operatorname{Hom}_*(1\times A,B)|=2.
$$

指数 $E=B^A$ があれば[指数対象の普遍性](#def-cat4-05-exponential)から上のHom集合と $\operatorname{Hom}_*(1,E)$ が全単射になる。しかし後者は任意の $E$ で $*\mapsto e_0$ の一つだけで、

$$
|\operatorname{Hom}_*(1,E)|=1.
$$

従って矛盾する。壊れた機構は積の普遍性ではなく、$(-)\times A$ の右随伴を作るHom全単射である。
<!-- solution-end -->

### CAT4-05-C01 閉構造から単位と二重カリー化まで

- Level: C
- ID: CAT4-05-C01

局所小右閉モノイダル圏 $(\mathcal C,\otimes,I)$ について、以下を全て証明せよ。

1. 任意の $B$ について $[I,B]\cong B$ となる自然同型を構成せよ。
2. 任意の $A,B,C$ について $[A\otimes B,C]\cong[A,[B,C]]$ の正準射を評価から構成せよ。
3. $\mathcal C=\mathbf{Vect}_k$ において、（1）の同型が $\operatorname{Hom}_k(k,B)\cong B$ に一致することを示せ。

<!-- solution-start -->
**詳細解答。**

**（1）単位で転置する。** [右単位子](../CAT4-01/index.md#def-cat4-01-monoidal) $\rho_X:X\otimes I\to X$ が自然同型なので

$$
\operatorname{Hom}(X,B)
\xrightarrow{\ f\mapsto f\rho_X\ }
\operatorname{Hom}(X\otimes I,B)
\xrightarrow{\ \Phi^I_{X,B}\ }
\operatorname{Hom}(X,[I,B])
$$

は全ての $X$ に自然な全単射である。$X=B$ と $f=1_B$ を代入して $u_B=(\rho_B)^\sharp:B\to[I,B]$ を得る。逆向きには $X=[I,B]$ と $1_{[I,B]}$ の逆対応を経由して

$$
v_B=\operatorname{ev}_{I,B}\rho_{[I,B]}^{-1}:[I,B]\to B
$$

を得る。$v_Bu_B=1_B$ と $u_Bv_B=1_{[I,B]}$ は、上の自然な全単射とその逆をこれらの恒等射に適用し、転置の一意性で比較すれば成立する。自然性は単位子と転置の自然性による。

**（2）二回転置する。** $H=[A\otimes B,C]$ とし、[評価射](#thm-cat4-05-evaluation-curry) $\operatorname{ev}_{A\otimes B,C}:H\otimes(A\otimes B)\to C$ を取る。結合子を前合成して

$$
(H\otimes A)\otimes B
\xrightarrow{\ \alpha_{H,A,B}\ }H\otimes(A\otimes B)
\xrightarrow{\ \operatorname{ev}_{A\otimes B,C}\ }C
$$

を得る。この射を $B$ について転置して $H\otimes A\to[B,C]$、さらに $A$ について転置すると

$$
\theta:H\longrightarrow[A,[B,C]]
$$

を得る。逆向きは $K=[A,[B,C]]$ として、まず $\operatorname{ev}_{A,[B,C]}:K\otimes A\to[B,C]$ に $1_B$ をテンソルし、その後に $\operatorname{ev}_{B,C}$ を適用し、結合子の逆で $K\otimes(A\otimes B)$ を始域にする。この射を $A\otimes B$ について転置して $\psi:K\to H$ を得る。二方向を評価へ戻すと、いずれも元の評価射に一致するため、転置の一意性から $\psi\theta=1_H$、$\theta\psi=1_K$ となる。従って正準同型である。

**（3）線形空間で同型を具体化する。** 線形写像 $q:k\to B$ は $b=q(1)$ で一意に決まり、線形性より $q(t)=tb$。従って

$$
\operatorname{Hom}_k(k,B)\to B,\quad q\mapsto q(1)
$$

と $b\mapsto(t\mapsto tb)$ は互いに逆な線形写像。$[I,B]=[k,B]=\operatorname{Hom}_k(k,B)$ なので（1）の $v_B$ は $q\mapsto q(1)$ に一致する。自然性は線形写像 $s:B\to B'$ に対する $s(q(1))=(sq)(1)$ で確認できる。
<!-- solution-end -->

## 7. 次講への橋渡し

本講で確認した積と指数対象の普遍性は、関数を一引数ずつ扱う「カリー化」を圏論の射だけで記述する。次の CAT4-06 では、積を持つ環境での変数の組、指数対象による関数型、評価射による適用を、単純型付きラムダ計算の項・置換・βη則と対応させる。特に β則は評価後の復元、η則は転置の一意性として現れる。
