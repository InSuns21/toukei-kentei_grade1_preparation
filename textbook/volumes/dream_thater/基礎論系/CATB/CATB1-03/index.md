# CATB1-03 加法圏と双積

## 1. 射を足すと何が変わるか

整数を整数に送る写像 $f(x)=2x$ と $g(x)=-3x$ は、同じ始域・終域を持つ。入力を固定して値を足せば $(f+g)(x)=-x$ となり、再び整数の加法を保つ写像になる。さらに $h(x)=5x$ を後ろから合成すると、$h(f+g)(x)=-5x$ は $hf(x)+hg(x)=10x-15x$ と一致する。

[圏](../../CAT/CAT1-01/index.md#def-cat1-01-category)では射の合成はできたが、平行な射の和は一般には与えられていなかった。本講では射の和と合成が両立する圏を考える。とくに、既習の[圏論の二項積](../../CAT/CAT2-02/index.md#def-cat2-02-binary-product)と[余積](../../CAT/CAT2-05/index.md#def-cat2-05-coproduct)が、なぜ加法のある場面では同じ対象で実現できるかを調べる。

本講は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)を扱う。$\mathcal C(X,Y)$ は $X$ から $Y$ への射の集合、$gf$ は $g\circ f$、$1_X$ は恒等射とする。対象全体の集合性は仮定しない。

## 2. 平行な射に和を入れる

平行な射 $f,g:X\to Y$ に対し、和 $f+g:X\to Y$ を作りたい。和の単位元と逆元も同じ射の集合の中で選べるようにし、合成の前後どちらからでも和を展開できることを要求する。

<a id="def-catb1-03-preadditive"></a>

<!-- formal-statement-start -->
> **定義（前加法圏）**
>
> 局所小圏 $\mathcal C$ において、各集合 $\mathcal C(X,Y)$ に可換群の構造 $(+,0_{X,Y},-)$ が指定されているとする。すなわち和は結合的・可換で、零元と各射の加法逆元がある。
>
> 任意の $f,f':X\to Y$ と $g,g':Y\to Z$ について、次の双加法性が成り立つとき、$\mathcal C$ を前加法圏という。

$$
g(f+f')=gf+gf',\qquad
(g+g')f=gf+g'f.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-03-preadditive -->
**定義の確認。** 整数の加法を保つ写像 $\mathbb Z\to\mathbb Z$ は $x\mapsto ax$ ($a\in\mathbb Z$) と表せる。実際、$f(0)=f(0)+f(0)$ から $f(0)=0$、正整数について $f(n+1)=f(n)+f(1)$、負整数について $f(-n)=-f(n)$ なので $a=f(1)$ が全てを決める。

一つの対象 $\mathbb Z$ とこれらの写像からなる圏を取る。合成は整数係数の積、恒等射の係数は $1$ である。写像として合成は結合的で恒等射が単位となる。射の和は整数係数の和、零元は係数 $0$、逆元は係数 $-a$ なので整数加法の結合律・交換律・単位元・逆元の条件を満たす。整数の分配律により $c(a+b)=ca+cb$ と $(c+d)a=ca+da$ が成立し、合成の双加法性も満たす。
<!-- definition-example-end -->

各射の集合の零元 $0_{X,Y}$ は $X$ から $Y$ への零射である。零射は、どの射とも合成したときに零射になる。これは追加公理ではなく、和の逆元があることから従う。

<a id="prop-catb1-03-zero-composition"></a>

<!-- formal-statement-start -->
> **命題（零射との合成）**
>
> 前加法圏で $f:X\to Y$、$g:Y\to Z$ とすると、

$$
g0_{X,Y}=0_{X,Z},\qquad 0_{Y,Z}f=0_{X,Z}.
$$
<!-- formal-statement-end -->

双加法性で同じ射を二度足す等式を作り、可換群内でその射を引く。

<!-- proof-start -->
### 証明

[前加法圏の双加法性](#def-catb1-03-preadditive)から

$$
g0_{X,Y}=g(0_{X,Y}+0_{X,Y})
=g0_{X,Y}+g0_{X,Y}.
$$

これは $\mathcal C(X,Z)$ の中の等式である。両辺に $-g0_{X,Y}$ を足して $0_{X,Z}=g0_{X,Y}$ を得る。反対側も

$$
0_{Y,Z}f=(0_{Y,Z}+0_{Y,Z})f
=0_{Y,Z}f+0_{Y,Z}f
$$

なので $\mathcal C(X,Z)$ で逆元を足して結論を得る。
<!-- proof-end -->

例えば $g(x)=5x$ と零写像の合成は入力を常に $0$ に送る。一般の圏でも零射という記号を使うなら、その存在根拠が要る。

## 3. 零対象を加える

ここからは対象を一つに限定せず、整数の有限個の組を対象にした圏を使う。全ての $\mathbb Z^n$ ($n\geq0$) と加法を保つ写像の圏を取る。任意の二対象間の射は写像の集合の部分集合である。射の和を $(f+g)(x)=f(x)+g(x)$ とすれば

$$
(f+g)(x+y)=f(x)+f(y)+g(x)+g(y)
=(f+g)(x)+(f+g)(y).
$$

従って和は再び射であり、負の写像についても $(-f)(x+y)=-f(x)-f(y)$ だから閉じている。零写像は加法を保ち、可換群の各公理は値ごとの整数の加法から従う。$h$ が加法を保つことから $h(f+g)(x)=h(f(x))+h(g(x))$、また $(h+k)f(x)=h(f(x))+k(f(x))$ なので双加法性も成立する。 これで後の座標の例に必要な前加法性が確認できた。

[終対象](../../CAT/CAT2-02/index.md#prop-cat2-02-empty-product)へは任意の対象からちょうど一つの射があり、[始対象](../../CAT/CAT2-05/index.md#prop-cat2-05-discrete-empty)からは任意の対象へちょうど一つの射がある。両方の役割を果たす対象があれば、空の積と空の余積を一緒に扱える。

<a id="def-catb1-03-zero-object"></a>

<!-- formal-statement-start -->
> **定義（零対象）**
>
> 圏 $\mathcal C$ の対象 $O$ が零対象であるとは、任意の対象 $X$ に対して $O\to X$ と $X\to O$ がそれぞれちょうど一つ存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-03-zero-object -->
**定義の確認。** 上で構成した整数座標の圏を考える。$\mathbb Z^0$ は空の組一つからなる対象である。任意の $n$ について $\mathbb Z^n\to\mathbb Z^0$ は値の選択肢が一つしかないのでただ一つ存在し、加法を保つ。逆向きの写像も加法を保つなら空の組を $\mathbb Z^n$ の零ベクトルへ送る必要がある。実際、入力が加法の零元であるため、その像 $y$ は $y=y+y$ を満たし、$y=0$ となる。この写像は加法を保つのでただ一つ存在する。
<!-- definition-example-end -->

<a id="prop-catb1-03-zero-object-criterion"></a>

<!-- formal-statement-start -->
> **命題（零対象の判定と零射）**
>
> 前加法圏の対象 $O$ が零対象であることと $1_O=0_{O,O}$ は同値である。零対象を経由する任意の合成 $X\to O\to Y$ は $0_{X,Y}$ に等しい。
<!-- formal-statement-end -->

見取り図：恒等射が零射なら、どの射も恒等射との合成によって零射になる。

<!-- proof-start -->
### 証明

零対象なら $\mathcal C(O,O)$ は一元集合であるから $1_O=0_{O,O}$。逆にこの等式を仮定する。任意の $a:O\to X$、$b:X\to O$ について [零射との合成](#prop-catb1-03-zero-composition) より

$$
a=a1_O=a0_{O,O}=0_{O,X},
$$

$$
b=1_Ob=0_{O,O}b=0_{X,O}.
$$

各射の集合には既に零元があるので、存在と一意性の双方が確認できた。従って [零対象](#def-catb1-03-zero-object) である。さらに $X\to O\to Y$ の二射はそれぞれ零射だから、同じ命題でその合成も零射となる。
<!-- proof-end -->

第2節の整数の一対象圏では $1_{\mathbb Z}$ と $0_{\mathbb Z,\mathbb Z}$ は入力 $1$ に対して異なる値を取る。従ってその圏には零対象がない。前加法性だけから零対象の存在を結論してはいけない。

## 4. 積と余積を同じ対象に載せる

前加法圏で二対象 $X_1,X_2$ の積 $P$ が存在するとする。射影 $p_j:P\to X_j$ があれば、$X_i$ から各成分へ向かう射を、$i$ 番目だけ恒等射、他は零射と指定できる。[圏論の二項積](../../CAT/CAT2-02/index.md#def-cat2-02-binary-product)によって、この指定を満たす射 $i_i:X_i\to P$ が一意に作れる。

この四本の射から、入力を一度成分ごとに分解し、再び足し合わせる操作が恒等射になるかを調べたい。有限個の対象についてこの仕組みを定式化する。

<a id="def-catb1-03-biproduct"></a>

<!-- formal-statement-start -->
> **定義（有限双積）**
>
> 前加法圏の有限対象族 $(X_j)_{j=1}^n$ ($n\geq0$) に対し、対象 $B$ と射 $i_j:X_j\to B$、$p_j:B\to X_j$ が次の条件を満たすとき、このデータを有限双積という。

$$
p_ji_k=
\begin{cases}
1_{X_j}&(j=k),\\
0_{X_k,X_j}&(j\ne k),
\end{cases}
\qquad
\sum_{j=1}^n i_jp_j=1_B.
$$

> 双積の対象を $\bigoplus_{j=1}^n X_j$ と書く。空和は $\mathcal C(B,B)$ の零元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-03-biproduct -->
**定義の確認。** $\mathbb Z^2$ を二つの $\mathbb Z$ の双積として検査する。射は

$$
i_1(x)=(x,0),\quad i_2(x)=(0,x),
$$

$$
p_1(x,y)=x,\quad p_2(x,y)=y
$$

である。これらは加法を保つ。射の和は値ごとの加法であるため、任意の整数 $x$ について $p_1i_1(x)=x$、$p_2i_2(x)=x$、$p_1i_2(x)=p_2i_1(x)=0$。また任意の $(x,y)$ について

$$
(i_1p_1+i_2p_2)(x,y)
=(x,0)+(0,y)=(x,y).
$$

従って全条件が成立する。
<!-- definition-example-end -->

条件の第一式は成分を混ぜないこと、第二式は成分を全て足すと元に戻ることを表す。有限であることが重要で、無限個の射の和は前加法性からは定義されない。

<a id="thm-catb1-03-biproduct-universality"></a>

<!-- formal-statement-start -->
> **定理（双積の普遍性と有限積・有限余積）**
>
> 前加法圏の有限対象族 $(X_j)_{j=1}^n$ に対して、次の存在条件は同値である。
>
> 1. 有限積が存在する。
> 2. 有限余積が存在する。
> 3. 有限双積が存在する。
>
> 双積の射影は積の普遍性を満たし、その挿入射は余積の普遍性を満たす。積または余積から双積を構成するとき、残りの射は一意に定まる。
<!-- formal-statement-end -->

積からは恒等射と零射を成分にした挿入射を作る。余積からはその逆向きの操作をする。逆に双積の二つの等式は、媒介射の存在と一意性を直接与える。

<!-- proof-start -->
### 証明

まず $n\geq1$ とする。[有限積の普遍性](../../CAT/CAT2-02/index.md#def-cat2-02-finite-product)を満たす $(P,p_j)$ を取る。各 $k$ について $p_ji_k$ が $j=k$ なら $1_{X_k}$、そうでなければ $0_{X_k,X_j}$ となるように、$i_k:X_k\to P$ を普遍性から一意に作る。

$e=\sum_k i_kp_k:P\to P$ と置く。[双加法性](#def-catb1-03-preadditive)を有限回使い、[零射との合成](#prop-catb1-03-zero-composition)を適用すると、

$$
p_je=\sum_k(p_ji_k)p_k
=1_{X_j}p_j+\sum_{k\ne j}0_{P,X_j}
=p_j.
$$

$p_j1_P=p_j$ でもある。積の媒介射の一意性により $e=1_P$ であり、[有限双積の条件](#def-catb1-03-biproduct)を満たす。

次に [余積の普遍性](../../CAT/CAT2-05/index.md#def-cat2-05-coproduct)を満たす $(Q,i_k)$ を取る。各 $j$ について $p_ji_k$ が上と同じ値になるように $p_j:Q\to X_j$ を余積の普遍性で作る。$d=\sum_j i_jp_j$ とすると

$$
di_k=\sum_j i_j(p_ji_k)
=i_k1_{X_k}+\sum_{j\ne k}0_{X_k,Q}=i_k.
$$

$1_Qi_k=i_k$ と余積の一意性から $d=1_Q$。よって双積になる。

最後に双積 $(B,i_j,p_j)$ を取る。任意の射族 $f_j:T\to X_j$ に対し

$$
u=\sum_j i_jf_j:T\to B
$$

と置くと、$p_ku=\sum_j(p_ki_j)f_j=f_k$ である。別の候補 $u'$ も $p_ju'=f_j$ を満たすなら

$$
u'=1_Bu'=\sum_j i_jp_ju'=\sum_j i_jf_j=u.
$$

従って $B$ は積である。

任意の射族 $g_j:X_j\to T$ に対しては $v=\sum_j g_jp_j:B\to T$ と置く。$vi_k=\sum_j g_j(p_ji_k)=g_k$。別の候補 $v'$ も $v'i_j=g_j$ を満たすなら

$$
v'=v'1_B=\sum_j v'i_jp_j=\sum_j g_jp_j=v.
$$

従って余積でもある。

$n=0$ のとき、空の積は終対象、空の余積は始対象である。いずれも自己射の集合は一元集合なので恒等射が零元に等しい。[零対象の判定](#prop-catb1-03-zero-object-criterion)から零対象となり、逆に零対象なら両普遍性を満たす。双積の条件も $1_B=0_{B,B}$ となるので同値である。
<!-- proof-end -->

例えば $\mathbb Z^2$ へ二本の射 $x\mapsto2x$、$x\mapsto-3x$ を束ねると $x\mapsto(2x,-3x)$、$\mathbb Z^2$ から二本の射 $x\mapsto4x$、$y\mapsto5y$ をまとめると $(x,y)\mapsto4x+5y$ になる。いずれも同じ対象を使う。

### 積と余積が一般には違う理由

集合の圏では一元集合二つの積は一元集合、余積は二元集合であり、同型ではない。さらに空集合から一元集合への写像は存在するが、その逆向きの写像は存在しない。従って後者の射の集合に加法の零元を指定できず、集合の圏は前加法圏ではない。上の定理の仮定が失われている。

## 5. 加法圏

射の加法だけでなく、対象を有限個まとめる操作も常に行えることを要求する。

<a id="def-catb1-03-additive-category"></a>

<!-- formal-statement-start -->
> **定義（加法圏）**
>
> 前加法圏 $\mathcal C$ が加法圏であるとは、空の対象族を含む任意の有限対象族に対して有限双積が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb1-03-additive-category -->
**定義の確認。** 第3節で前加法性を確認した整数座標の圏を用いる。

有限個の $\mathbb Z^{n_j}$ に対して $\mathbb Z^{N}$ を取る。ただし $N=\sum_j n_j$ である。座標を長さ $n_j$ のブロックに分け、射影は対応するブロックを抜き出し、挿入射は他のブロックを零にする。

第4節の二成分の計算と同じく、$p_ji_k$ は $j=k$ のとき入力をそのまま返し、$j\ne k$ のとき零を返す。

任意の入力 $(x_1,\dots,x_n)$ に対して $\sum_j i_jp_j$ の第 $k$ ブロックは $x_k$ なので恒等射となる。

空の場合は第3節の $\mathbb Z^0$ を用い、その恒等射と零射が一致する。よって全ての有限双積が存在する。
<!-- definition-example-end -->

<a id="thm-catb1-03-additive-criterion"></a>

<!-- formal-statement-start -->
> **定理（加法圏の存在条件）**
>
> 前加法圏 $\mathcal C$ について、次は同値である。
>
> 1. $\mathcal C$ は加法圏である。
> 2. 零対象と任意の二対象の積が存在する。
> 3. 零対象と任意の二対象の余積が存在する。
<!-- formal-statement-end -->

見取り図：空の双積は零対象であり、二項積を反復すると任意の有限積を作れる。

<!-- proof-start -->
### 証明

1 なら空の双積は [零対象の判定](#prop-catb1-03-zero-object-criterion) によって零対象であり、二項双積は [双積の普遍性](#thm-catb1-03-biproduct-universality) により積でも余積でもある。

2 なら零対象は終対象であるから、[有限積の存在判定](../../CAT/CAT2-02/index.md#thm-cat2-02-finite-products)を適用できる。従って全有限積が存在し、[双積の普遍性と有限積・有限余積](#thm-catb1-03-biproduct-universality)により全有限双積が存在する。

3 なら零対象は始対象である。[双積の普遍性と有限積・有限余積](#thm-catb1-03-biproduct-universality)を二対象に適用すれば全二項余積から全二項積を作れるため、2 が成立する。
<!-- proof-end -->

上の例では対象を有限個の整数座標に限定した。座標の代わりに任意の可換群を使っても、有限直積に成分ごとの加法を与え、他の成分には各群の零元を入れることで、同じ双積の二条件が成立する。射は加法を保つ写像で、前加法性の検査は第3節と同じ等式に従う。対象内部に元を持たない抽象的な圏でも、以下の計算では双積の射とその等式だけを使う。

## 6. 射を行列に分解する

双積 $B=\bigoplus_{i=1}^n X_i$ と $D=\bigoplus_{j=1}^m Y_j$ を取る。$F:B\to D$ の第 $i$ 入力から第 $j$ 出力への作用だけを見るため、先に $X_i$ を挿入し、$F$ を適用し、最後に $Y_j$ へ射影する。これが行列の第 $j$ 行第 $i$ 列に対応する。

<a id="thm-catb1-03-matrix"></a>

<!-- formal-statement-start -->
> **定理（双積の射の行列表示）**
>
> 前加法圏で有限双積 $B=\bigoplus_i X_i$ と $D=\bigoplus_j Y_j$ が存在するとする。$B$ の挿入射と射影を $i_i,p_i$、$D$ のそれらを $k_j,q_j$ とする。
>
> 射 $F:B\to D$ と射族 $f_{ji}:X_i\to Y_j$ の間に次の互いに逆な対応がある。

$$
f_{ji}=q_jFi_i,\qquad
F=\sum_{j,i}k_j f_{ji}p_i.
$$

> この対応は射の加法を成分ごとの加法に移す。
>
> さらに $E=\bigoplus_{\ell=1}^r Z_\ell$、$G:D\to E$ の成分を $g_{\ell j}:Y_j\to Z_\ell$ とすると、合成の成分は

$$
(GF)_{\ell i}=\sum_{j=1}^m g_{\ell j}f_{ji}.
$$
<!-- formal-statement-end -->

見取り図：恒等射 $1_B$ と $1_D$ を挿入射・射影の和に置き換えると $F$ が成分から復元できる。合成の途中に $1_D$ を挟むと、途中の成分 $j$ を足し上げる公式になる。

<!-- proof-start -->
### 証明

[有限双積の条件](#def-catb1-03-biproduct)と[双加法性](#def-catb1-03-preadditive)より、

$$
\begin{aligned}
F&=1_DF1_B\\
&=\left(\sum_j k_jq_j\right)F
  \left(\sum_i i_ip_i\right)\\
&=\sum_{j,i}k_j(q_jFi_i)p_i.
\end{aligned}
$$

従って成分が全て分かれば元の射が一意に決まる。

逆に任意の型の合う射族 $f_{ji}:X_i\to Y_j$ から $\widehat F=\sum_{j,i}k_j f_{ji}p_i$ と作る。第 $a$ 行第 $b$ 列を抜き出すと

$$
q_a\widehat F i_b
=\sum_{j,i}(q_ak_j) f_{ji}(p_i i_b).
$$

$q_ak_j$ と $p_i i_b$ は添字が一致すると恒等射、一致しなければ零射である。[零射との合成](#prop-catb1-03-zero-composition)から $j=a,i=b$ 以外の項は全て零となり、残る項は $1_{Y_a} f_{ab}1_{X_b}=f_{ab}$。従って任意の射族が実現できる。

射の加法についても

$$
q_j(F+F')i_i=q_jFi_i+q_jF'i_i
$$

であるため成分ごとの加法に一致する。

$E$ の射影を $s_\ell:E\to Z_\ell$ とする。$g_{\ell j}=s_\ell Gk_j$ であるから

$$
\begin{aligned}
(GF)_{\ell i}
&=s_\ell GF i_i\\
&=s_\ell G1_DF i_i\\
&=\sum_j(s_\ell Gk_j)(q_jFi_i)\\
&=\sum_j g_{\ell j}f_{ji}.
\end{aligned}
$$

各項は $X_i\to Y_j\to Z_\ell$ の合成であり、全項は同じ $\mathcal C(X_i,Z_\ell)$ に属する。空の双積を通る場合も恒等射が零元に等しく、空和は零射になる。始域または終域が空の双積なら射の集合は一元集合なので空の行列も一意な射を表す。
<!-- proof-end -->

### 数値例

二つの整数座標を持つ対象から同じ対象への加法を保つ写像

$$
F(x,y)=(2x-y,3x+4y)
$$

の成分を求める。$F i_1(x)=(2x,3x)$、$F i_2(y)=(-y,4y)$ なので、射影を合成すると係数の表は

$$
F\ \longleftrightarrow\
\begin{pmatrix}2&-1\\3&4\end{pmatrix}.
$$

$G(u,v)=u-2v$ の係数は $(1,-2)$ である。[双積の射の行列表示](#thm-catb1-03-matrix)により

$$
GF\ \longleftrightarrow\
\begin{pmatrix}
1\cdot2-2\cdot3&1\cdot(-1)-2\cdot4
\end{pmatrix}
=\begin{pmatrix}-4&-9\end{pmatrix}.
$$

実際 $G(F(x,y))=(2x-y)-2(3x+4y)=-4x-9y$。行列積は座標に依存した偶然ではなく、双積の射の等式から生じている。

## 7. 対角射と余対角射から和を復元する

加法は前加法圏の構造として与えた。しかし双積があれば、射の和を積と余積の普遍性だけから復元できる。

<a id="prop-catb1-03-sum-reconstruction"></a>

<!-- formal-statement-start -->
> **命題（双積による射の和の復元）**
>
> 加法圏で $f,g:X\to Y$ とする。$\Delta_X:X\to X\oplus X$ は両射影との合成が $1_X$ となる射、$\nabla_Y:Y\oplus Y\to Y$ は両挿入射との合成が $1_Y$ となる射とする。
>
> $f\oplus g:X\oplus X\to Y\oplus Y$ は対角の二成分が $f,g$、他の二成分が零射となる射とする。このとき

$$
f+g=\nabla_Y(f\oplus g)\Delta_X.
$$
<!-- formal-statement-end -->

見取り図：入力を二成分に複製し、各成分に別の射を作用させ、出力を足し合わせる。

<!-- proof-start -->
### 証明

$X\oplus X$ の挿入射・射影を $i_1,i_2$ と $p_1,p_2$、$Y\oplus Y$ のそれらを $k_1,k_2$ と $q_1,q_2$ とする。[対角射](../../CAT/CAT2-02/index.md#def-cat2-02-diagonal)と[双積の普遍性](#thm-catb1-03-biproduct-universality)から $\Delta_X=i_1+i_2$、$\nabla_Y=q_1+q_2$ である。例えば $p_j(i_1+i_2)=1_X$、$(q_1+q_2)k_j=1_Y$ なので、それぞれの普遍性による一意性を使った。

[双積の射の行列表示](#thm-catb1-03-matrix)から $f\oplus g=k_1fp_1+k_2gp_2$ となる。従って

$$
(f\oplus g)\Delta_X=k_1f+k_2g
$$

である。最後に $\nabla_Y k_j=1_Y$ を使い

$$
\nabla_Y(k_1f+k_2g)=1_Y f+1_Y g=f+g
$$

を得る。全ての合成は [前加法圏の双加法性](#def-catb1-03-preadditive) に従う。
<!-- proof-end -->

例えば整数上で $f(x)=2x$、$g(x)=-3x$ とすると、$x\mapsto(x,x)\mapsto(2x,-3x)\mapsto-x$ である。和の演算そのものを射の合成として図式に組み込めるようになった。

## 8. 演習

### CATB1-03-A01 双加法性と零射

- Level: A

整数の一対象圏で $f(x)=3x$、$g(x)=-5x$、$h(x)=2x$ とする。$h(f+g)$、$hf+hg$、$h(f-f)$ をそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答。** $f+g$ は $x\mapsto-2x$ なので $h(f+g)(x)=2(-2x)=-4x$。一方 $hf(x)=6x$、$hg(x)=-10x$ より $(hf+hg)(x)=-4x$。また $(f-f)(x)=0$ だから $h(f-f)(x)=2\cdot0=0$。これは [双加法性](#def-catb1-03-preadditive) と [零射との合成](#prop-catb1-03-zero-composition) の具体例である。
<!-- solution-end -->

### CATB1-03-A02 零対象の判定

- Level: A

$\mathbb Z^0$ と $\mathbb Z$ の恒等射をそれぞれの零写像と比較し、どちらが零対象かを判定せよ（射は加法を保つ写像）。

<!-- solution-start -->
**詳細解答。** $\mathbb Z^0$ は空の組一つしか持たないので恒等射と零写像はその唯一の元をその元へ送る同じ写像である。$\mathbb Z$ では恒等射が $1$ を $1$ へ、零写像が $1$ を $0$ へ送るので異なる。[零対象の判定](#prop-catb1-03-zero-object-criterion)により前者だけが零対象である。
<!-- solution-end -->

### CATB1-03-A03 双積の射影と挿入

- Level: A

$\mathbb Z^3$ を $\mathbb Z$ の三項双積として、挿入射 $i_2$ と射影 $p_1,p_2$ を書け。また $i_1p_1+i_2p_2+i_3p_3$ の任意の入力に対する値を計算せよ。

<!-- solution-start -->
**詳細解答。** $i_2(t)=(0,t,0)$、$p_1(x,y,z)=x$、$p_2(x,y,z)=y$。従って $p_1i_2(t)=0$、$p_2i_2(t)=t$ である。三つの合成の値は $(x,0,0),(0,y,0),(0,0,z)$ であるから、その和は $(x,y,z)$。これは [有限双積の第二条件](#def-catb1-03-biproduct) を直接確かめている。
<!-- solution-end -->

### CATB1-03-A04 行列の成分を取り出す

- Level: A

$F:\mathbb Z^2\to\mathbb Z^2$ を $F(x,y)=(3x+2y,-x+5y)$ とする。四つの成分と係数の行列を書け。

<!-- solution-start -->
**詳細解答。** [双積の射の行列表示](#thm-catb1-03-matrix)の定義に従う。$Fi_1(t)=(3t,-t)$ なので $p_1Fi_1(t)=3t$、$p_2Fi_1(t)=-t$。$Fi_2(t)=(2t,5t)$ なので $p_1Fi_2(t)=2t$、$p_2Fi_2(t)=5t$。従って第1列は $(3,-1)$、第2列は $(2,5)$ であり、

$$
\begin{pmatrix}3&2\\-1&5\end{pmatrix}
$$

となる。
<!-- solution-end -->

### CATB1-03-B01 媒介射の一意性

- Level: B

前加法圏の双積 $B=X_1\oplus X_2$ に対し $u,v:T\to B$ が $p_1u=p_1v$、$p_2u=p_2v$ を満たすとする。差 $u-v$ に恒等射の分解を適用し、$u=v$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [双加法性](#def-catb1-03-preadditive)により $p_j(u-v)=p_ju-p_jv=0_{T,X_j}$。ここで $p_j(-v)=-p_jv$ は $p_jv+p_j(-v)=p_j0=0$ から従う。[有限双積の条件](#def-catb1-03-biproduct)と[零射との合成](#prop-catb1-03-zero-composition)より

$$
\begin{aligned}
u-v&=1_B(u-v)\\
&=(i_1p_1+i_2p_2)(u-v)\\
&=i_1 0_{T,X_1}+i_2 0_{T,X_2}\\
&=0_{T,B}.
\end{aligned}
$$

$\mathcal C(T,B)$ で $v$ を足せば $u=v$ となる。
<!-- solution-end -->

### CATB1-03-B02 積から挿入射を作る

- Level: B

前加法圏で二項積 $(P,p_1,p_2)$ が存在するとする。$i_1:X_1\to P$、$i_2:X_2\to P$ を作り、任意の $a:X_1\to T$、$b:X_2\to T$ に対して $a p_1+b p_2$ が余積の媒介射となることを証明せよ。

<!-- solution-start -->
**詳細解答。** [圏論の二項積](../../CAT/CAT2-02/index.md#def-cat2-02-binary-product)で $(1_{X_1},0_{X_1,X_2})$ と $(0_{X_2,X_1},1_{X_2})$ をそれぞれ束ねて $i_1,i_2$ を作る。$p_1(i_1p_1+i_2p_2)=p_1$、$p_2(i_1p_1+i_2p_2)=p_2$ なので、積の一意性より $i_1p_1+i_2p_2=1_P$。

$w=a p_1+b p_2:P\to T$ と置く。[双加法性](#def-catb1-03-preadditive)と[零射との合成](#prop-catb1-03-zero-composition)により $wi_1=a1_{X_1}+b0_{X_1,X_2}=a$、$wi_2=a0_{X_2,X_1}+b1_{X_2}=b$。別の候補 $w'$ についても $w'i_1=a,w'i_2=b$ なら

$$
w'=w'1_P=w'i_1p_1+w'i_2p_2=a p_1+b p_2=w.
$$

従って余積の存在一意性が確認できた。
<!-- solution-end -->

### CATB1-03-B03 前加法性だけでは足りない

- Level: B

第2節の整数の一対象圏が前加法圏であっても加法圏ではないことを示せ。さらにその唯一の対象が自分自身との二項積にもならないことを証明せよ。

<!-- solution-start -->
**詳細解答。** [零対象の判定](#prop-catb1-03-zero-object-criterion)より $1\ne0$ なので唯一の対象は零対象ではない。[加法圏の定義](#def-catb1-03-additive-category)は空の双積も要求するため、加法圏ではない。

二項積が存在すると仮定すると、射影の整数係数を $a,b$ と書ける。[圏論の二項積](../../CAT/CAT2-02/index.md#def-cat2-02-binary-product)の普遍性に $(1,0)$ を指定すると整数 $u$ が存在して

$$
au=1,\qquad bu=0
$$

となる。$au=1$ から $u$ は $1$ または $-1$ だから $b=0$。

今度は $(0,1)$ を指定すると整数 $v$ が存在して

$$
av=0,\qquad bv=1
$$

となるはずだが、$b=0$ と矛盾する。従って二項積も存在しない。
<!-- solution-end -->

### CATB1-03-B04 行列積の型と計算

- Level: B

$F:\mathbb Z^2\to\mathbb Z^3$、$G:\mathbb Z^3\to\mathbb Z^2$ の係数の行列を

$$
F=\begin{pmatrix}1&2\\0&-1\\3&1\end{pmatrix},
\qquad
G=\begin{pmatrix}2&1&0\\-1&0&4\end{pmatrix}
$$

とする。$GF$ の係数の行列を計算し、入力 $(1,-1)$ で検算せよ。

<!-- solution-start -->
**詳細解答。** [双積の射の行列表示](#thm-catb1-03-matrix)では中間対象の三成分にわたって足す。

$$
GF=
\begin{pmatrix}
2\cdot1+1\cdot0+0\cdot3&
2\cdot2+1\cdot(-1)+0\cdot1\\
-1\cdot1+0\cdot0+4\cdot3&
-1\cdot2+0\cdot(-1)+4\cdot1
\end{pmatrix}
=\begin{pmatrix}2&3\\11&2\end{pmatrix}.
$$

これは二入力・二出力の射を表す。$F(1,-1)=(-1,1,2)$、$G(-1,1,2)=(-2+1,1+8)=(-1,9)$。積の行列からも $(2-3,11-2)=(-1,9)$ となり一致する。
<!-- solution-end -->

### CATB1-03-C01 合成から加法を取り戻す

- Level: C

加法圏で $f,g,h:X\to Y$ とする。三項双積の射を用いて、入力を三成分へ複製する射 $\Delta:X\to X^{\oplus3}$、各成分に $f,g,h$ を作用させる射 $D:X^{\oplus3}\to Y^{\oplus3}$、出力三成分をまとめる射 $\nabla:Y^{\oplus3}\to Y$ をそれぞれ構成せよ。$\nabla D\Delta=f+g+h$ を証明し、入力成分を入れ替えたときの和が変わらない理由も示せ。

<!-- solution-start -->
**詳細解答。** $X^{\oplus3}$ の挿入射・射影を $i_j,p_j$、$Y^{\oplus3}$ のものを $k_j,q_j$ とする。$a_1=f,a_2=g,a_3=h$ と置く。[双積の普遍性](#thm-catb1-03-biproduct-universality)により全射影との合成が $1_X$ となる射は $\Delta=\sum_j i_j$。実際 $p_r\Delta=p_ri_r=1_X$。全挿入射との合成が $1_Y$ となる射は $\nabla=\sum_j q_j$ で、$\nabla k_r=q_rk_r=1_Y$。

[双積の射の行列表示](#thm-catb1-03-matrix)で、対角に $a_j$ を、他に零射を持つ射を

$$
D=\sum_{j=1}^3 k_j a_j p_j
$$

と構成する。$q_rDi_s$ は $r=s$ のとき $a_r$、そうでなければ零射になる。[双加法性](#def-catb1-03-preadditive)によって

$$
D\Delta=\sum_j k_j a_j(p_j\Delta)=\sum_j k_j a_j,
$$

$$
\nabla D\Delta=\sum_j(\nabla k_j)a_j
=\sum_j a_j=f+g+h.
$$

次に添字 $1,2$ を入れ替え、$3$ を固定する置換を $\sigma$ とする。$S_X=\sum_j i_{\sigma(j)}p_j$、$S_Y=\sum_j k_{\sigma(j)}q_j$ と置く。有限双積の条件から $p_rS_X\Delta=1_X$ となるので $S_X\Delta=\Delta$。また $\nabla S_Yk_j=1_Y$ なので $\nabla S_Y=\nabla$。両置換は二回適用すると恒等射になる（例えば $S_X^2i_j=i_{\sigma(\sigma(j))}=i_j$、余積の一意性を使う）。

対角成分を入れ替えた射は $D'=S_YDS_X$ であり、$q_rD'i_s$ は $r=s$ のとき $a_{\sigma(s)}$、それ以外は零射となる。従って

$$
\nabla D'\Delta
=\nabla S_YDS_X\Delta
=\nabla D\Delta.
$$

これで $g+f+h=f+g+h$ を成分の入れ替えからも確認できた。
<!-- solution-end -->

## 9. 次の講義へ

有限双積によって対象を成分に分け、射を成分の行列として表せるようになった。次講では、射と零射の等化子・余等化子を調べることで、射の核と余核を圏の内部で定義する。加法圏にどのような追加条件を課せば、加群で使い慣れた核と商の計算が一般化できるかを考える。
