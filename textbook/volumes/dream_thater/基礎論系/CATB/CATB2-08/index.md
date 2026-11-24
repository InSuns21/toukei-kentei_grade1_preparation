# CATB2-08 双圏と弱い結合律

## 1. 合成の括弧を比較する

前講の[分配子のcoend合成](../CATB2-07/index.md#thm-catb2-07-composition)は二つの対応から一つの対応を作った。しかし三つの対応の合成では、先にどちらの二つを合成するかによって異なる商集合が得られることがある。等しい集合であることを要求するより、二つの結果を結ぶ自然な同型を指定したい。

もっと簡単な例として、集合 $X,Y,Z$ の直積を取ると、$((x,y),z)$ と $(x,(y,z))$ は異なる形の元だが、座標を保つ全単射がある。四つの集合については、括弧を付け替える順番が違っても最終的な全単射が一致する。既習の[モノイダル圏](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)ではこの条件を学んだ。今回は対象間にそれぞれ異なる合成を置き、括弧の比較も対象間の射として扱う。

## 2. 二つの次元の射

普通の圏で対象 $A,B$ を固定すると射 $f:A\to B$ の集まりを考えられる。ここではその集まり自身を圏 $\mathcal K(A,B)$ にする。この圏を Hom圏と呼ぶ。この圏の対象 $f$ が元の対象間の射（1-射）、その圏の射 $\alpha:f\Rightarrow f'$ が同じ始域・終域を持つ二つの1-射の間の比較（2-射）となる。対象 $A$ の恒等1-射は $1_A$、1-射 $f$ の恒等2-射は $1_f$ と書く。

例えば[小さい圏](../../CAT/CAT1-02/index.md#def-cat1-02-size) $A,B$ の間では関手が1-射、[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)が2-射になる。$f,f':A\to B$ と $g,g':B\to C$ を取る。2-射 $\alpha:f\Rightarrow f'$ と $\beta:g\Rightarrow g'$ をつなぎ、$g\circ f$ と $g'\circ f'$ の比較を作りたい。このために、二つのHom圏の[積圏](../../CAT/CAT1-05/index.md#def-cat1-05-product)から別のHom圏への[関手](../../CAT/CAT1-06/index.md#def-cat1-06-functor)として合成を与える。積圏の対象は1-射の組 $(g,f)$、射は2-射の組 $(\beta,\alpha)$ である。合成関手は前者を $g\circ f$、後者を $\beta*\alpha:g\circ f\Rightarrow g'\circ f'$ に送る。

以下では関手を反復する際の積圏を入力の順序を保った三つ組・四つ組の圏として読み、積圏自身の括弧は省く。括弧の比較と恒等1-射を取り除く比較は、各入力の2-射との合成順序を入れ替えても結果が一致する[自然同型](../../CAT/CAT1-07/index.md#def-cat1-07-natural-isomorphism)として指定する。これらの比較をそれぞれ結合子・単位子と呼び、既習の[モノイダル圏の整合条件](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)を対象の異なる場合へ拡張する。

<a id="def-catb2-08-bicategory"></a>

<!-- formal-statement-start -->
> **定義（双圏）**
>
> 双圏 $\mathcal K$ は対象の集まり、各対象対の圏 $\mathcal K(A,B)$、各対象 $A$ の指定された1-射 $1_A$（Hom圏 $\mathcal K(A,A)$ の対象であり、恒等1-射と呼ぶ）、各対象三つに対する合成関手

$$
\circ:\mathcal K(B,C)\times\mathcal K(A,B)\to\mathcal K(A,C)
$$

> を持つ。Hom圏の対象を1-射、射を2-射とする。2-射のHom圏内の合成を $\beta\cdot\alpha$（右から左）、合成関手による作用を $\beta*\alpha$ と書く。
>
> 任意の対象列 $A,B,C,D$ と1-射 $f:A\to B$、$g:B\to C$、$h:C\to D$ について、合成関手の二つの反復の間、および恒等1-射による合成関手と恒等関手の間に、次の成分を持つ自然同型（結合子、左単位子、右単位子）を備える。

$$
\begin{aligned}
a_{h,g,f}&:(h\circ g)\circ f\Rightarrow h\circ(g\circ f),\\
l_f&:1_B\circ f\Rightarrow f,\\
r_f&:f\circ1_A\Rightarrow f.
\end{aligned}
$$

> 任意の合成可能な四つの1-射 $f,g,h,k$ について五角形条件

$$
\begin{aligned}
&a_{k,h,g\circ f}\cdot a_{k\circ h,g,f}\\
&=(1_k*a_{h,g,f})\cdot
 a_{k,h\circ g,f}\cdot(a_{k,h,g}*1_f)
\end{aligned}
$$

> が成り立つ。任意の $f:A\to B$ と $g:B\to C$ について三角形条件

$$
(1_g*l_f)\cdot a_{g,1_B,f}=r_g*1_f
$$

> が成り立つ。式中の $1_f$ は1-射 $f$ の恒等2-射であり、対象の恒等1-射 $1_A$ と区別する。
<!-- formal-statement-end -->

2-射の合成には二通りの向きがある。$\alpha:f\Rightarrow f'$、$\alpha':f'\Rightarrow f''$ と $\beta:g\Rightarrow g'$、$\beta':g'\Rightarrow g''$ に対して、Hom圏内の合成は既習の[垂直合成](../../CAT/CAT1-08/index.md#def-cat1-08-vertical)に相当する。一方、合成関手が与えるのは[水平合成](../../CAT/CAT1-08/index.md#def-cat1-08-horizontal)に相当する。[積圏の合成](../../CAT/CAT1-05/index.md#def-cat1-05-product)は成分ごとだから、合成関手が射の合成を保つ条件を展開すると

$$
(\beta'\cdot\beta)*(\alpha'\cdot\alpha)
=(\beta'*\alpha')\cdot(\beta*\alpha)
$$

となる。両辺の始域は $g\circ f$、終域は $g''\circ f''$ である。また恒等射の保存は $1_g*1_f=1_{g\circ f}$ となる。これらは2-射の交換法則と恒等射の保存である。弱くしているのは1-射の結合・単位ではあっても、Hom圏の圏公理や合成関手の関手性ではない。

[自然変換の自然性](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)を合成関手の二つの反復に適用する。結合子の自然性は、三つの2-射 $\alpha:f\Rightarrow f'$、$\beta:g\Rightarrow g'$、$\gamma:h\Rightarrow h'$ に対して

$$
a_{h',g',f'}\cdot((\gamma*\beta)*\alpha)
=(\gamma*(\beta*\alpha))\cdot a_{h,g,f}
$$

である。左辺は先に2-射を合成してから括弧を変え、右辺は先に括弧を変えてから2-射を合成する。単位子の自然性も、任意の $\alpha:f\Rightarrow f'$ について

$$
\begin{aligned}
l_{f'}\cdot(1_{1_B}*\alpha)&=\alpha\cdot l_f,\\
r_{f'}\cdot(\alpha*1_{1_A})&=\alpha\cdot r_f
\end{aligned}
$$

である。ここで $1_{1_B}$ は恒等1-射 $1_B$ 自身の恒等2-射である。

<!-- definition-example-start: def-catb2-08-bicategory -->
**定義の確認**。一つの対象 $O$ を用意し、$\mathcal K(O,O)$ を非負整数を対象とする離散圏（各対象に恒等射だけがある圏）とする。双圏の条件を満たすか順に調べよう。1-射は整数 $n\geq0$、2-射は $1_n$ のみ。$m\circ n=m+n$、$1_O=0$ とする。恒等2-射の組は $1_{m+n}$ に写り、合成可能な2-射は恒等射だけなので、$1_m\cdot1_m=1_m$ と $1_n\cdot1_n=1_n$ の組を合成関手で送ると $1_{m+n}$ になる。先に送ってから合成しても $1_{m+n}\cdot1_{m+n}=1_{m+n}$ であり、関手性が成立する。

加法の結合律と零の単位律により結合子・単位子の両端は同じ整数で、恒等2-射を選べる。結合子と単位子は恒等射なので逆もそれ自身である。自然性の各経路も恒等射である。

五角形では四整数 $k,h,g,f$ のどの括弧付けも加法の結合律により $k+h+g+f$ に等しく、両経路はその恒等2-射となる。三角形では $(g+0)+f=g+f=g+(0+f)$ だから両経路は $1_{g+f}$ となる。従って双圏の全条件が成立する。
<!-- definition-example-end -->

## 3. 整合条件の読み方と厳密な場合

五角形の出発点は $((k\circ h)\circ g)\circ f$、到着点は $k\circ(h\circ(g\circ f))$ である。途中で括弧を変える二経路を順に列挙すると、二段の経路は

$$
((kh)g)f\to(kh)(gf)\to k(h(gf))
$$

であり、三段の経路は

$$
((kh)g)f\to(k(hg))f\to k((hg)f)\to k(h(gf))
$$

である。ここだけは合成記号を省き、矢印は1-射間の2-射を表す。短い経路の矢印は順に $a_{k\circ h,g,f}$ と $a_{k,h,g\circ f}$、長い経路では順に $a_{k,h,g}*1_f$、$a_{k,h\circ g,f}$、$1_k*a_{h,g,f}$ である。第2節の五角形条件は、この二経路を垂直合成した結果の等式である。三角形の出発点は $(g\circ1_B)\circ f$、到着点は $g\circ f$。右単位子で直接中央の恒等射を消す経路と、結合子で括弧を変えてから左単位子で消す経路が一致する。

結合子・単位子が恒等2-射なら、合成の両端は実際に同じ1-射でなければならない。この特殊な場合には従来の等式として結合律を扱える。

<a id="def-catb2-08-strict-two-category"></a>

<!-- formal-statement-start -->
> **定義（厳密2-圏）**
>
> [双圏](#def-catb2-08-bicategory)のうち、合成関手の結合律・単位律が関手の等式として成立し、結合子と二つの単位子が恒等自然変換であるものを厳密2-圏とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-08-strict-two-category -->
**定義の確認**。第2節の[双圏](#def-catb2-08-bicategory)の非負整数の例は、三つの入力について $(k+m)+n=k+(m+n)$、零について $0+n=n=n+0$ が成立する。2-射はすべて恒等射なので関手の射への作用も両辺で一致する。従ってその結合子・単位子は恒等自然変換であり、厳密2-圏である。
<!-- definition-example-end -->

次に[小さい圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)を対象とする構造を調べよう。以下では小ささを固定した集合論的宇宙（対象・射の集合を取る範囲）について考え、圏全体の集まりはより大きな宇宙で扱う。[関手圏](../../CAT/CAT1-08/index.md#def-cat1-08-functor-category)は関手を対象、自然変換を射とする圏である。

<a id="thm-catb2-08-cat"></a>

<!-- formal-statement-start -->
> **定理（小圏の厳密2-圏 Cat）**
>
> 小圏を対象、関手を1-射、自然変換を2-射とし、Hom圏を関手圏とする。恒等関手と通常の関手合成、自然変換の水平合成によって厳密2-圏 $\mathbf{Cat}$ が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

関手を合成したときには括弧の差はない。2-射についても合成が関手として等しいことを確認するため、三つの自然変換の水平合成を各成分で展開する。

<!-- proof-start -->
### 証明

小圏 $A,B,C,D$ を取る。小圏 $A,B$ に対し[関手圏](../../CAT/CAT1-08/index.md#def-cat1-08-functor-category) $[A,B]$ は圏をなす。関手 $F,F':A\to B$ と $G,G':B\to C$ を取り、$\alpha:F\Rightarrow F'$ と $\beta:G\Rightarrow G'$ の水平合成を考える。関手合成 $G\circ F$ を $GF$、関手の対象への作用 $F(x)$ を $Fx$ と略記する。[水平合成の定義](../../CAT/CAT1-08/index.md#def-cat1-08-horizontal)によれば各対象 $x$ での成分は

$$
(\beta*\alpha)_x=\beta_{F'x}\circ G(\alpha_x)
=G'(\alpha_x)\circ\beta_{Fx}
$$

である。二経路の等式は $\beta$ の自然性を射 $\alpha_x:Fx\to F'x$ に適用したものである。[水平合成の自然性](../../CAT/CAT1-08/index.md#prop-cat1-08-horizontal-laws)から自然変換となる。二つとも恒等自然変換なら成分は恒等射となり、[交換法則](../../CAT/CAT1-08/index.md#prop-cat1-08-interchange)から垂直合成も保つので、合成は関手である。

関手 $H,H':C\to D$ の間の自然変換 $\gamma:H\Rightarrow H'$ も取る。左括弧と右括弧の成分を展開すると

$$
\begin{aligned}
((\gamma*\beta)*\alpha)_x
&=\gamma_{G'F'x}\circ H(\beta_{F'x})\circ HG(\alpha_x),\\
(\gamma*(\beta*\alpha))_x
&=\gamma_{G'F'x}\circ H(\beta_{F'x}\circ G(\alpha_x))\\
&=\gamma_{G'F'x}\circ H(\beta_{F'x})\circ HG(\alpha_x).
\end{aligned}
$$

最後の等号は $H$ の関手性による。1-射の合成についても[関手合成の定義](../../CAT/CAT1-06/index.md#def-cat1-06-composition)から、任意の対象 $x$ と射 $u$ のそれぞれで

$$
\begin{aligned}
((H\circ G)\circ F)(x)&=H(G(F(x)))=(H\circ(G\circ F))(x),\\
((H\circ G)\circ F)(u)&=H(G(F(u)))=(H\circ(G\circ F))(u).
\end{aligned}
$$

よって関手としても等しい。恒等関手との合成は関手の対象・射への作用を変えない。左から合成する恒等関手を $I_B=1_B$、右から合成する恒等関手を $I_A=1_A$ とする。恒等自然変換との水平合成の成分も

$$
\begin{aligned}
(1_{I_B}*\alpha)_x&=1_{F'x}\circ I_B(\alpha_x)=\alpha_x,\\
(\alpha*1_{I_A})_x&=\alpha_x\circ F(1_x)=\alpha_x.
\end{aligned}
$$

従って合成関手の結合・単位の等式が成立する。結合子・単位子に恒等自然変換を選ぶと自然性は関手の等式により成立し、五角形・三角形のすべての経路は同じ恒等2-射である。[厳密2-圏](#def-catb2-08-strict-two-category)の条件を満たす。
<!-- proof-end -->

## 4. 二つの端点を持つ対応

集合 $A$ から集合 $B$ への関係は、単なる真偽だけでなく、同じ端点を結ぶ複数の証拠を記録できる。証拠の集合を $S$ とし、一つの証拠から左右の端点を写像で取り出す。この構成は既習の[スパン](../../CAT/CAT2-06/index.md#def-cat2-06-span)を集合の圏に適用したものである。今回は固定した両端を持つスパン同士を比較するため、頂点集合の写像が両方の端点を保つ条件を導入する。

<a id="def-catb2-08-span"></a>

<!-- formal-statement-start -->
> **定義（スパンの射）**
>
> 集合 $A,B$ を固定する。[スパン](../../CAT/CAT2-06/index.md#def-cat2-06-span) $(S,p,q)$ の二写像を $p:S\to A,\ q:S\to B$ とし、$S$ を頂点集合と呼ぶ。同じ両端を持つ別のスパン $(S',p',q')$ への射は、次の等式を満たす写像 $u:S\to S'$ である。

$$
p'u=p,\qquad q'u=q.
$$

> 恒等射および射の合成は頂点集合の写像の恒等射および合成とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb2-08-span -->
**定義の確認**。$A=\{0,1\}$、$B=\{x\}$、$S=\{s,t\}$ とし、$p(s)=0,p(t)=1$、$q(s)=q(t)=x$ とする。$S'=\{s',t',v'\}$ で $p'(s')=p'(v')=0,p'(t')=1$、$q'$ は定値 $x$ とする。$u(s)=v',u(t)=t'$ は両端を保つ。実際 $p'u(s)=0,p'u(t)=1$ で、両元の $q'u$ の値は $x$ である。一方 $s\mapsto t'$ は左端を保たず射にならない。恒等写像は両端を保ち、$v:S'\to S''$ も両端を保つなら $p''vu=p'u=p$ および $q''vu=q'u=q$ となる。写像の結合律・単位律を引き継ぐのでスパンの射は圏をなす。
<!-- definition-example-end -->

スパン $(S,p,q):A\to B$ と $(T,r,s):B\to C$ のつなぎ方は、中間端点 $q(x)$ と $r(y)$ が一致する組 $(y,x)$ を取ることである。これは既習の[集合の引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)である。中間端点の等しい二つの写像からは、その値を組にする写像が一意に定まる。左右の順番は合成の表記に合わせ、後から通るスパンの座標を左に置く。以下、スパン全体とその頂点集合を同じ大文字で略記し、合成を $T\circ S$ と書くとき、集合の元を扱う式ではその頂点集合を指す。

<a id="thm-catb2-08-span"></a>

<!-- formal-statement-start -->
> **定理（集合のスパンの双圏 Span）**
>
> 固定した集合論的宇宙の小さい集合を対象、[スパン](../../CAT/CAT2-06/index.md#def-cat2-06-span)を1-射、[スパンの射](#def-catb2-08-span)を2-射とする。頂点集合も小さいとし、$(S,p,q):A\to B$ と $(T,r,s):B\to C$ の合成を次の頂点集合と両端の写像で与える。

$$
\begin{aligned}
T\circ S&=\{(y,x)\in T\times S:r(y)=q(x)\},\\
(y,x)&\mapsto p(x),\qquad (y,x)\mapsto s(y).
\end{aligned}
$$

> 恒等1-射は $(A,\operatorname{id}_A,\operatorname{id}_A)$ とする。合成の括弧を付け替える全単射と、恒等スパンの座標を取り除く全単射によって双圏 $\mathbf{Span}$ が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

合成されたスパンの元は通過する証拠の列を括弧付きで記録している。中間端点の一致を保ったまま括弧だけを変える。四つの証拠を結ぶ場合にも元の順序が変わらないので、五角形を直接計算できる。

<!-- proof-start -->
### 証明

[スパンの射の条件](#def-catb2-08-span)から、恒等写像は両端を保ち、二射の合成も両端を保つ。結合律と単位律は写像のそれを引き継ぐのでHom圏が存在する。合成の頂点集合は $T\times S$ の部分集合であり、両端は定義域の全元で定まる。$u:S\to S'$ と $v:T\to T'$ がスパンの射なら、合成関手の射への作用を

$$
(v*u)(y,x)=(v(y),u(x))
$$

と定める。新しい中間端点は $r'(v(y))=r(y)=q(x)=q'(u(x))$ なので値は合成の頂点集合に属す。新しい両端も $p'(u(x))=p(x)$、$s'(v(y))=s(y)$ で保たれる。恒等写像の組の像は恒等写像であり、二段の射 $u',v'$ を追加すると

$$
(v'*u')((v*u)(y,x))=(v'v(y),u'u(x)).
$$

これは $(v'v)*(u'u)$ の作用だから関手性が成立する。

三つ目のスパン $U:C\to D$ の左右の写像を $t,w$ とする。$(U\circ T)\circ S$ の元 $((z,y),x)$ の条件は

$$
t(z)=s(y),\qquad r(y)=q(x).
$$

$U\circ(T\circ S)$ の元 $(z,(y,x))$ の条件も同じ二式である。従って

$$
a_{U,T,S}((z,y),x)=(z,(y,x))
$$

は全単射であり、逆は括弧を元に戻す。左端は双方とも $p(x)$、右端は双方とも $w(z)$ だから逆も含めてスパンの射である。三つのスパンの射 $u,v,j$ について自然性の二経路を評価すると

$$
\begin{aligned}
((z,y),x)&\mapsto((j(z),v(y)),u(x))
 \mapsto(j(z),(v(y),u(x))),\\
((z,y),x)&\mapsto(z,(y,x))
 \mapsto(j(z),(v(y),u(x))).
\end{aligned}
$$

一致するので結合子は自然同型である。

恒等スパン $1_B$ と $S$ の合成の元は $(b,x)$ で $b=q(x)$、$S$ と $1_A$ の合成の元は $(x,a)$ で $a=p(x)$。単位子を

$$
l_S(b,x)=x,\qquad r_S(x,a)=x
$$

と定める。逆は $x\mapsto(q(x),x)$ と $x\mapsto(x,p(x))$。左単位子の定義域 $(b,x)$ の左端は $p(x)$、右端は $b=q(x)$ である。右単位子の定義域 $(x,a)$ の左端は $a=p(x)$、右端は $q(x)$ である。どちらも像 $x$ の両端と一致する。逆写像も同じ等式で両端を保つ。

$u:S\to S'$ に関する左単位子の自然性の二経路は

$$
\begin{aligned}
(b,x)&\mapsto(b,u(x))\mapsto u(x),\\
(b,x)&\mapsto x\mapsto u(x)
\end{aligned}
$$

である。右単位子の二経路も

$$
\begin{aligned}
(x,a)&\mapsto(u(x),a)\mapsto u(x),\\
(x,a)&\mapsto x\mapsto u(x)
\end{aligned}
$$

となり、いずれも一致する。中間の組が合成の頂点集合に属するのは $q'(u(x))=b$、$p'(u(x))=a$ による。

四つ目のスパン $V:D\to E$ を取り、その左脚を $m:V\to D$、右脚を $n:V\to E$ とする。四つの証拠を $d\in V,z\in U,y\in T,x\in S$ とする。五角形の二経路を[双圏の五角形条件](#def-catb2-08-bicategory)の順に計算する。

$$
\begin{aligned}
(((d,z),y),x)&\mapsto((d,z),(y,x))\\
&\mapsto(d,(z,(y,x))),\\
(((d,z),y),x)&\mapsto((d,(z,y)),x)\\
&\mapsto(d,((z,y),x))\\
&\mapsto(d,(z,(y,x))).
\end{aligned}
$$

各途中の元は同じ三つの中間端点一致条件 $m(d)=w(z)$、$t(z)=s(y)$、$r(y)=q(x)$ を満たす。両外端も $p(x)$ と $n(d)$ のままである。写像の定義域・終域が共通で全元の像が一致するから五角形条件を満たす。

[三角形条件](#def-catb2-08-bicategory)では $(T\circ1_B)\circ S$ の元 $((y,b),x)$ に $r(y)=b=q(x)$ が成立する。二経路は

$$
\begin{aligned}
((y,b),x)&\mapsto(y,x),\\
((y,b),x)&\mapsto(y,(b,x))\mapsto(y,x).
\end{aligned}
$$

これも同じ写像である。以上で全条件を確認した。
<!-- proof-end -->

例えば $A=B=C=D=\{*\}$ で $S=\{0,1\}$、$T=\{2\}$、$U=\{3,4\}$ とすると左括弧の元 $((3,2),0)$ と右括弧の元 $(3,(2,0))$ は別の形の組である。どちらも4元であり結合子はその4元を一対一に対応させる。両端の写像は定値である。従ってこの選択の合成は一般に厳密ではないが、指定された比較によって正しく結合する。

## 5. 一対象への制限

双圏に一つの対象 $A$ だけを残すと、そのHom圏の合成関手は同じ圏の二変数関手になる。これは第1節で思い出した構造そのものである。

<a id="prop-catb2-08-one-object"></a>

<!-- formal-statement-start -->
> **命題（一対象双圏とモノイダル圏）**
>
> 一対象双圏のHom圏に、1-射の合成をテンソル積、恒等1-射を単位対象とするモノイダル構造が入る。逆に任意のモノイダル圏は一対象双圏を与える。
<!-- formal-statement-end -->

### 証明の見取り図

対象・射の階層を一つ下げて読み替えれば、二つの整合条件が同じ式になる。

<!-- proof-start -->
### 証明

唯一の対象を $A$ とする。$\mathcal M=\mathcal K(A,A)$ と置けば、$\circ:\mathcal M\times\mathcal M\to\mathcal M$ は関手、$1_A$ は $\mathcal M$ の対象である。$X\otimes Y=X\circ Y$、$I=1_A$ と置く。結合子は $(X\otimes Y)\otimes Z\to X\otimes(Y\otimes Z)$、単位子は $I\otimes X\to X$ と $X\otimes I\to X$ の自然同型となる。[モノイダル圏の定義](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)と照合する。双圏の1-射（Hom圏の対象）がモノイダル圏の対象、双圏の2-射（Hom圏の射）がその射であり、水平合成 $*$ が射のテンソル積、垂直合成 $\cdot$ が通常の射の合成に対応する。結合子 $a$、単位子 $l,r$ は既習の $\alpha,\lambda,\rho$ に対応する。五角形の式で $(k,h,g,f)=(W,X,Y,Z)$ と置けば

$$
\begin{aligned}
&a_{W,X,Y\otimes Z}\cdot a_{W\otimes X,Y,Z}\\
&=(1_W\otimes a_{X,Y,Z})\cdot a_{W,X\otimes Y,Z}\cdot(a_{W,X,Y}\otimes1_Z).
\end{aligned}
$$

これは既習の五角形と同じ二経路である。三角形も $(g,f)=(X,Y)$ と置けば

$$
(1_X\otimes l_Y)\cdot a_{X,I,Y}=r_X\otimes1_Y.
$$

となる。自然性も三変数の射に対する結合子の自然性と、一変数の射に対する単位子の自然性にそのまま対応する。

逆にモノイダル圏 $\mathcal M$ から対象一つ $A$、Hom圏 $\mathcal M$ を取る。合成関手を $\otimes$ とし、恒等1-射を $I$ に選ぶ。結合子・単位子は与えられた自然同型をそのまま使える。上の式の読み替えを逆向きに行えば二つの整合条件も成立する。二構成はHom圏、合成関手、単位対象、三つの自然同型を変えない。
<!-- proof-end -->

五角形を単に結合子が自然同型であるという条件に弱めると不十分である。例えば一対象の構造でHom圏も対象一つ、射が二元加法群 $\mathbb Z/2\mathbb Z$ の圏とし、垂直合成と水平合成を加法とする。恒等2-射は群の零元 $0$ である。水平合成は $0+0=0$ と加法の可換性による交換法則を満たすので関手となる。結合子を群の元 $1$、左右単位子を $0$ にすればすべて可逆である。自然性も任意の群の元 $x,y,z$ に対して $1+(x+y+z)=(x+y+z)+1$、$0+x=x+0$ なので成立する。しかし、五角形の二段の経路は $1+1=0$、三段の経路は $1+1+1=1$ となり一致しない（計算はすべて $2$ を法とする）。三角形も左辺が $0+1=1$、右辺が $0$ になる。自然同型を選ぶことと、選び方が整合することは別の要求である。

## 6. 演習

### CATB2-08-A01 射の型

- Level: A

$f,f':A\to B$、$g,g':B\to C$、$\alpha:f\Rightarrow f'$、$\beta:g\Rightarrow g'$ とする。$\beta*\alpha$ の型と、$\beta\cdot\alpha$ が一般には定義できない理由を示せ。

<!-- solution-start -->
**詳細解答。** [双圏の合成関手](#def-catb2-08-bicategory)はHom圏の積から $\mathcal K(A,C)$ への関手である。積圏の射 $(\beta,\alpha):(g,f)\to(g',f')$ を送るので

$$
\beta*\alpha:g\circ f\Rightarrow g'\circ f'
$$

である。垂直合成は同じHom圏の中で、先の2-射の終域が次の2-射の始域に一致するときだけ定義できる。ここでは $\alpha$ は $\mathcal K(A,B)$、$\beta$ は $\mathcal K(B,C)$ の射であり、一般に同じ圏の射でさえない。
<!-- solution-end -->

### CATB2-08-A02 結合子の型

- Level: A

$f:A\to B$、$g:B\to C$、$h:C\to D$ とする。結合子とその逆の始域・終域を示し、どのHom圏の射か答えよ。

<!-- solution-start -->
**詳細解答。** $h\circ g$ は $B\to D$、それと $f$ の合成は $A\to D$。また $g\circ f:A\to C$ なので $h\circ(g\circ f):A\to D$ となる。[双圏の定義](#def-catb2-08-bicategory)により

$$
a_{h,g,f}:(h\circ g)\circ f\Rightarrow h\circ(g\circ f).
$$

逆はこの両端を交換した2-射で、両者とも $\mathcal K(A,D)$ に属す。
<!-- solution-end -->

### CATB2-08-A03 中間端点での選別

- Level: A

$A=C=\{*\}$、$B=\{0,1\}$ とする。スパン $S:A\to B$ の頂点が $x_0,x_1,x'_1$ で右端が順に $0,1,1$、$T:B\to C$ の頂点が $y_0,y_1$ で左端が順に $0,1$ である。合成の頂点を列挙せよ。

<!-- solution-start -->
**詳細解答。** [Spanの合成](#thm-catb2-08-span)の条件は両方の中間端点が等しいことである。$y_0$ と組める元は $x_0$ だけ、$y_1$ と組める元は $x_1,x'_1$ だけ。よって頂点は

$$
(y_0,x_0),\ (y_1,x_1),\ (y_1,x'_1)
$$

の3元である。どの元も両外側の端点は $*$ であるが、証拠の組は区別される。
<!-- solution-end -->

### CATB2-08-A04 単位子と逆

- Level: A

$A=\{0,1\}$、$B=\{b\}$、$S=\{s,t\}$、$p(s)=0,p(t)=1$、$q(s)=q(t)=b$ とする。$l_S,r_S$ とその逆を全元について求めよ。

<!-- solution-start -->
**詳細解答。** $1_B\circ S$ は中間端点が $b$ の組 $(b,s),(b,t)$ である。[Spanの単位子](#thm-catb2-08-span)はこれらを順に $s,t$ へ送る。逆は $s\mapsto(b,s),t\mapsto(b,t)$。$S\circ1_A$ では中間端点が $p$ の値に等しいので元は $(s,0),(t,1)$。これらを順に $s,t$ へ送るのが右単位子で、逆は $s\mapsto(s,0),t\mapsto(t,1)$。どちらの往復でも各元に戻り、左端と右端の値も変わらない。
<!-- solution-end -->

### CATB2-08-B01 Catの水平合成

- Level: B

一対象で恒等射しか持たない圏 $A$ と、二対象 $0,1$ に射 $v:0\to1$ を持つ矢印圏 $B$ を取る。$F,F':A\to B$ はそれぞれ $0,1$ を選ぶ。$\alpha:F\Rightarrow F'$ の成分は $v$。$G=G'=1_B$（$B$ の恒等関手）、$\beta=1_G$（その恒等自然変換）とする。水平合成の二つの表示を計算し、自然性を確認せよ。

<!-- solution-start -->
**詳細解答。** [水平合成](../../CAT/CAT1-08/index.md#def-cat1-08-horizontal)により $A$ の唯一の対象 $*$ では

$$
\begin{aligned}
\beta_{F'(*)}\circ G(\alpha_*)&=1_1\circ v=v,\\
G'(\alpha_*)\circ\beta_{F(*)}&=v\circ1_0=v.
\end{aligned}
$$

どちらの表示も $0\to1$ の射 $v$ を与える。$A$ の射は $1_*$ だけであり、自然性の二経路は $1_1v=v=v1_0$ となる。従ってこの水平合成は自然変換であり、$\alpha$ と一致する。
<!-- solution-end -->

### CATB2-08-B02 スパンの射と交換法則

- Level: B

スパン $S,S',S'':A\to B$ の右脚を $q,q',q''$、$T,T',T'':B\to C$ の左脚を $r,r',r''$ とする。これらのスパンの射 $u:S\to S',u':S'\to S'',v:T\to T',v':T'\to T''$ を取る。合成の頂点上で交換法則を証明せよ。

<!-- solution-start -->
**詳細解答。** $r(y)=q(x)$ を満たす $(y,x)$ を取る。[スパンの射の条件](#def-catb2-08-span)から $r'(v(y))=r(y)=q(x)=q'(u(x))$ なので $(v(y),u(x))$ は次の合成の元である。二段目のスパンの射も両端を保つから

$$
\begin{aligned}
r''(v'v(y))&=r'(v(y))=q'(u(x))\\
&=q''(u'u(x)).
\end{aligned}
$$

よって二段目の合成も定義できる。[Spanの合成](#thm-catb2-08-span)を使えば

$$
\begin{aligned}
((v'*u')\cdot(v*u))(y,x)&=(v'v(y),u'u(x)),\\
((v'\cdot v)*(u'\cdot u))(y,x)&=(v'v(y),u'u(x)).
\end{aligned}
$$

両写像は同じ始域と終域を持ち、すべての元の像が等しいので一致する。
<!-- solution-end -->

### CATB2-08-B03 可逆性だけでは不十分

- Level: B

一対象一1-射の構造で2-射を加法群 $\mathbb Z/3\mathbb Z$ とし、垂直・水平合成を加法とする。結合子を $c$、左単位子を $l$、右単位子を $r$ とする。自然同型であることを確認し、五角形と三角形が成立する条件を求めよ。

<!-- solution-start -->
**詳細解答。** 合成関手の交換法則は $(a'+a)+(b'+b)=(a'+b')+(a+b)$ であり、可換加法なので成立する。恒等2-射は $0$ であり、水平合成は $0+0=0$ により恒等射も保つ。結合子・単位子は加法逆元を持ち可逆である。自然性は結合子では任意の $x,y,z$ に対する $c+(x+y+z)=(x+y+z)+c$、単位子では $l+x=x+l$、$r+x=x+r$ なので成立する。

[五角形条件](#def-catb2-08-bicategory)の二段経路は $2c$、三段経路は $3c$ となる。よって $2c=3c$ と同値な $c=0$ が必要十分。三角形は $l+c=r$ である。$c=0$ を代入すると $l=r$。従って全条件を満たす選択は $c=0,l=r$ の三通りである。
<!-- solution-end -->

### CATB2-08-C01 四つのスパンの整合性と自然性

- Level: C

五つの集合 $A_0,\ldots,A_4$ とスパン $S_i:A_{i-1}\to A_i$（$i=1,\ldots,4$）を取る。左右の脚を $p_i,q_i$ とする。各 $S_i$ から同じ端点を持つ $S_i'$（脚は $p_i',q_i'$）へのスパンの射 $u_i:S_i\to S_i'$ がある。左端の括弧から右端の括弧への五角形の二経路、およびその比較が $u_i$ に関して自然であることを示せ。

<!-- solution-start -->
**詳細解答。** [Spanの合成](#thm-catb2-08-span)を反復する。元 $(((x_4,x_3),x_2),x_1)$ は

$$
q_1(x_1)=p_2(x_2),\quad
q_2(x_2)=p_3(x_3),\quad
q_3(x_3)=p_4(x_4)
$$

を満たす。実際、最初の内側の合成で $q_3(x_3)=p_4(x_4)$ を課し、その左脚 $p_3(x_3)$ と $q_2(x_2)$ を一致させ、さらに左脚 $p_2(x_2)$ と $q_1(x_1)$ を一致させる。別の括弧付けでも同じ隣接する脚の一致を一度ずつ課す。外側の脚は $p_1(x_1),q_4(x_4)$ である。

[五角形条件](#def-catb2-08-bicategory)の短い経路では

$$
\begin{aligned}
(((x_4,x_3),x_2),x_1)
&\mapsto((x_4,x_3),(x_2,x_1))\\
&\mapsto(x_4,(x_3,(x_2,x_1))).
\end{aligned}
$$

長い経路では

$$
\begin{aligned}
(((x_4,x_3),x_2),x_1)
&\mapsto((x_4,(x_3,x_2)),x_1)\\
&\mapsto(x_4,((x_3,x_2),x_1))\\
&\mapsto(x_4,(x_3,(x_2,x_1))).
\end{aligned}
$$

どの途中の組も三式を満たすから、二経路は定義でき、最終の像が一致する。さらに [スパンの射の条件](#def-catb2-08-span) $q_i'u_i=q_i$、$p_i'u_i=p_i$ によって

$$
q_i'(u_i(x_i))=p_{i+1}'(u_{i+1}(x_{i+1}))
$$

が $i=1,2,3$ で成立する。先に各射を適用する経路は左括弧の各座標を $u_i(x_i)$ に換えてから括弧を右へ付け替える。後から適用する経路は括弧を先に付け替え、各座標に射を適用する。どちらも

$$
(u_4(x_4),(u_3(x_3),(u_2(x_2),u_1(x_1))))
$$

を与える。両外端も保たれるため、同じスパンの射として一致する。従って五角形の比較は四変数の射について自然である。
<!-- solution-end -->

## 7. 次の講義へ

Catでは比較が恒等2-射だったのに対し、Spanでは括弧の変更を実際に行う全単射が必要だった。次講では前講の分配子を1-射とし、coendの普遍性で結合子と単位子を構成する。今回の五角形・三角形が、そこで何を検証すべきかを示している。
