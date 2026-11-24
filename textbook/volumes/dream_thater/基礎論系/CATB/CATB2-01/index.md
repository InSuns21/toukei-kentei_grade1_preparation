# CATB2-01 モノイダル圏でHomを値付けする

## 1. 射の集合に構造を持たせる

[圏の定義](../../CAT/CAT1-01/index.md#def-cat1-01-category)では、対象 $x,y$ の間の射を集めた集合を $\mathcal C(x,y)$ と書き、二つの射を合成する。例えば線形写像の合成では、写像を足したり定数倍したりできる。合成を単なる集合の写像として扱うだけでは、その線形性が圏の公理に現れない。

そこで、射の集合を別の圏 $\mathcal V$ の対象に置き換える。例えば線形写像全体をベクトル空間とし、合成を線形写像として表したい。ただし二入力の合成は各入力について線形であっても、二入力を一緒に足したときの線形写像とは限らない。このため入力の組を直積ではなくテンソル積でまとめる。

このように、Homそのものに構造を持たせ、その構造を尊重する合成と単位を指定したものを $\mathcal V$-豊穣圏という。$\mathcal V$ はHomの値を取る先であり、**豊穣化の基底**と呼ぶ。ここでいう基底はベクトル空間の基底とは異なる。

## 2. 豊穣圏の公理

基底には[モノイダル圏](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal) $(\mathcal V,\otimes,I,\alpha,\lambda,\rho)$ を用いる。$\otimes$ はテンソル双関手、$I$ は単位対象、$\alpha$ は括弧を右へ移す結合子、$\lambda,\rho$ は左・右単位子である。本講では $\mathcal V$ は局所小、すなわち二対象間の射が集合をなすと仮定する。豊穣圏の対象の集まりは集合とする（大きな対象の集まりを許す版もある）。

$\mathcal A(x,y)$ は $\mathcal V$ の対象であって、一般には集合ではない。合成の入力は後から作用するHomを左に置く。恒等射に相当するデータは、単位対象からHom対象への $\mathcal V$ の射として表す。

<a id="def-catb2-01-enriched-category"></a>

<!-- formal-statement-start -->
> **定義（豊穣圏）**
>
> 局所小な[モノイダル圏](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal) $\mathcal V$ 上の $\mathcal V$-豊穣圏 $\mathcal A$ は、対象の集合と、各対象対 $x,y$ に対するHom対象 $\mathcal A(x,y)\in\mathcal V$、次の合成射と単位射を持つ。

$$
m_{xyz}:\mathcal A(y,z)\otimes\mathcal A(x,y)
\longrightarrow\mathcal A(x,z),
$$

$$
j_x:I\longrightarrow\mathcal A(x,x).
$$

> 任意の四対象 $w,x,y,z$ について、結合律

$$
\begin{aligned}
m_{wxz}(m_{xyz}\otimes1_{\mathcal A(w,x)})
&=m_{wyz}(1_{\mathcal A(y,z)}\otimes m_{wxy})\\
&\quad\cdot\alpha_{\mathcal A(y,z),\mathcal A(x,y),\mathcal A(w,x)}
\end{aligned}
$$

> と、任意の二対象 $x,y$ について左右の単位律

$$
m_{xyy}(j_y\otimes1_{\mathcal A(x,y)})
=\lambda_{\mathcal A(x,y)},
$$

$$
m_{xxy}(1_{\mathcal A(x,y)}\otimes j_x)
=\rho_{\mathcal A(x,y)}
$$

> が成立する。射の並置は右側から先に作用する合成を表す。
<!-- formal-statement-end -->

三本の射を順に $P=\mathcal A(y,z)$、$Q=\mathcal A(x,y)$、$R=\mathcal A(w,x)$ と置く。結合律の共通の始域は $(P\otimes Q)\otimes R$、終域は $\mathcal A(w,z)$ である。左辺は

$$
(P\otimes Q)\otimes R
\xrightarrow{m_{xyz}\otimes1_R}
\mathcal A(x,z)\otimes R
\xrightarrow{m_{wxz}}\mathcal A(w,z)
$$

と進む。右辺はまず $\alpha_{P,Q,R}$ で $P\otimes(Q\otimes R)$ に移り、

$$
P\otimes(Q\otimes R)
\xrightarrow{1_P\otimes m_{wxy}}
P\otimes\mathcal A(w,y)
\xrightarrow{m_{wyz}}\mathcal A(w,z)
$$

と進む。二経路とも同じ始域・終域なので比較できる。左右単位律の始域は、それぞれ $I\otimes\mathcal A(x,y)$ と $\mathcal A(x,y)\otimes I$ である。単位子を省いて恒等射と直接比較してはいけない。

対称性（テンソル因子を交換する構造）も、内部Homを作れるという閉性も、この定義には要求していない。後の構成で必要な追加条件はその都度指定する。

### 2.1 集合を値とする例

<!-- definition-example-start: def-catb2-01-enriched-category -->
**定義の確認。** 基底を $\mathbf{Set}$ とし、[集合の直積によるモノイダル構造](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)を使う。単位対象は一元集合 $I=\{*\}$ である。対象を $S=\{0\}$ と $T=\{0,1\}$ の二つに取り、各Hom対象を全ての写像の集合とする。

合成射は $m_{xyz}(g,f)=g\circ f$、単位射は $j_x(*)=1_x$ と定める。いずれも集合の写像であり、合成の結果の始域と終域は $x,z$ となる。三つの写像 $f:w\to x$、$g:x\to y$、$h:y\to z$ を取ると、左経路は $((h,g),f)$ を $(h\circ g)\circ f$ へ送り、右経路は結合子によって $(h,(g,f))$ へ移して $h\circ(g\circ f)$ へ送る。任意の $a\in w$ で両方の値は $h(g(f(a)))$ である。左単位の入力 $(*,f)$ は $1_y\circ f=f$、右単位の入力 $(f,*)$ は $f\circ1_x=f$ へ送られ、単位子の作用と一致する。したがって全ての対象の組で公理が成立する。

例えば $f:S\to T$ を $f(0)=1$、$g:T\to T$ を $g(0)=1,g(1)=0$、$h:T\to S$ を定数写像とすれば、$g(f(0))=0$、$h(g(f(0)))=0$ になる。写像を選ぶことと合成射にその写像の組を入力することを区別しよう。
<!-- definition-example-end -->

## 3. 集合の場合と線形の場合

集合値の豊穣化では通常の圏の情報を失わない。これは単位対象からの射が集合の元そのものに対応するためである。

<a id="prop-catb2-01-set-enrichment"></a>

<!-- formal-statement-start -->
> **命題（集合値の豊穣圏と通常の圏）**
>
> $\mathbf{Set}$ を直積と一元集合を備えたモノイダル圏とする。対象の集合を固定したとき、$\mathbf{Set}$-豊穣圏の構造を与えることと、その対象集合を持つ通常の局所小な圏の構造を与えることは互いに逆の操作である。
<!-- formal-statement-end -->

### 証明の見取り図

集合の直積上の写像は二入力の合成規則、一元集合からの写像は一つの恒等射の指定である。豊穣公理の射の等式を全ての入力で評価すれば通常の圏の公理になる。

<!-- proof-start -->
### 証明

豊穣圏の各Hom対象をそのまま射の集合とし、合成を $g\circ f=m_{xyz}(g,f)$、恒等射を $1_x=j_x(*)$ と定める。[豊穣圏の公理](#def-catb2-01-enriched-category)の結合律を $((h,g),f)$ に作用させる。左辺は $m(m(h,g),f)$、右辺は $m(h,m(g,f))$ なので通常の結合律を得る。左単位律を $(*,f)$ で評価すると $m(j_y(*),f)=f$、右単位律を $(f,*)$ で評価すると $m(f,j_x(*))=f$ となる。よって[圏の定義](../../CAT/CAT1-01/index.md#def-cat1-01-category)を満たす。

逆に局所小な圏からHom集合を取り、合成写像 $m(g,f)=g\circ f$ と $j_x(*)=1_x$ を作る。結合子は $((h,g),f)\mapsto(h,(g,f))$ なので通常の結合律から豊穣結合律の両辺が全入力で一致する。単位子は $(*,f)\mapsto f$ と $(f,*)\mapsto f$ なので通常の単位律から豊穣単位律の両辺も全入力で一致する。写像は全入力での値で決まるから三条件は射の等式として成立する。

両方向でHom集合と対象は変えず、合成の値と単位元も同一である。構成を往復すると全データが元に戻る。
<!-- proof-end -->

### 3.1 線形写像を値とする例

体 $k$ 上の有限次元ベクトル空間と線形写像の圏を $\mathbf{Vect}^{\rm fd}_k$ とする。[ベクトル空間のテンソル積モノイダル構造](../../CAT/CAT4-04/index.md#prop-cat4-04-algebra)は有限次元の場合にも制限できる。テンソル積の次元は有限で、単位対象 $k$ も有限次元だからである。

対象を $k^n$（$n=1,2,\ldots$）とし、$\mathcal A(k^n,k^p)$ を線形写像全体のベクトル空間とする。写像の加法と定数倍は各入力で行う。標準基底の像を列に並べると、これは $p\times n$ 行列の空間と同一視できる。行列 $F$ に対し入力の座標列 $v$ の像は $Fv$ なので、合成は行列積で表される。

行列積は各変数について線形である。例えば、サイズが合う任意の $G_1,G_2,F$ とスカラー $a,b$ について

$$
(aG_1+bG_2)F=aG_1F+bG_2F,
$$

$$
G(aF_1+bF_2)=aGF_1+bGF_2.
$$

したがって[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)で、一意な線形写像

$$
m_{xyz}: \mathcal A(y,z)\otimes_k\mathcal A(x,y)
\longrightarrow \mathcal A(x,z)
$$

が定まり、純テンソル $G\otimes F$ の像は $GF$ となる。単位射は $j_x(t)=t1_x$（$1_x$ は恒等写像）である。

結合律を $((H\otimes G)\otimes F)$ に作用させると、左経路は $(HG)F$、右経路は $H(GF)$ になる。行列積の結合律は、各成分を有限和に展開すれば両者とも

$$
\sum_{i,j} H_{ai}G_{ij}F_{jb}
$$

になることから従う。ここで $a,b$ は結果の行・列番号、$i,j$ は合成経路の二つの中間空間の座標番号である。純テンソルは始域を線形結合で生成するから、二つの線形写像は等しい。左単位律は $m(t1_y\otimes F)=tF$、右単位律は $m(F\otimes t1_x)=tF$ であり、左右単位子の作用とそれぞれ一致する。こちらも純テンソルから全域で成立する。これで線形写像の全ての豊穣公理を確認した。

具体的に $x=k$、$y=k^2$、$z=k$ とし、$F=(1,2)^{\mathsf T}$、$G=(3,4)$ とすると、$m(G\otimes F)=11$ である。二つの行列の役割を交換すると $FG$ は $2\times2$ 行列になり、同じHom対象に戻るとは限らない。

## 4. 単位対象から通常の射を取り出す

集合の元を選ぶ操作は、一元集合からの写像として表せた。一般の基底でも $I\to\mathcal A(x,y)$ という $\mathcal V$ の射を選べる。これを通常の圏の一つの射とみなす。問題は二本を合成すると始域が $I\otimes I$ になることである。ここでは単位子の逆を使って $I$ から二入力を供給する。

<a id="thm-catb2-01-underlying-category"></a>

<!-- formal-statement-start -->
> **定理（豊穣圏の台となる圏）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal A$ に対し、対象をそのままにして

$$
\mathcal A_0(x,y)=\mathcal V(I,\mathcal A(x,y))
$$

> を射の集合とする。単位射 $j_x$ を恒等射とし、$\delta=\lambda_I^{-1}:I\to I\otimes I$ と置く。合成を

$$
g\circ_0 f=m_{xyz}(g\otimes f)\delta
$$

> と定めると通常の局所小な圏 $\mathcal A_0$ が得られる。
<!-- formal-statement-end -->

合成の型は

$$
I\xrightarrow{\delta} I\otimes I
\xrightarrow{g\otimes f}\mathcal A(y,z)\otimes\mathcal A(x,y)
\xrightarrow{m_{xyz}}\mathcal A(x,z)
$$

である。$\delta$ は単位対象についてだけ定めた射であり、任意の対象を二つに複製できるという主張ではない。

### 証明の見取り図

結合律では $I$ を三つに展開する二経路を比較する。これらは構造射だけからできるため整合性定理で一致する。単位律では単位子の自然性を用いて、単位射との合成を元の射へ戻す。

<!-- proof-start -->
### 証明

局所小性から各 $\mathcal V(I,\mathcal A(x,y))$ は集合である。合成の型は上で確認した。

**結合律。** $f:I\to\mathcal A(w,x)$、$g:I\to\mathcal A(x,y)$、$h:I\to\mathcal A(y,z)$ とし、$P,Q,R$ を第2節と同じ三つのHom対象とする。テンソル双関手の合成保存で

$$
\begin{aligned}
(h\circ_0 g)\circ_0 f
&=m_{wxz}((m_{xyz}(h\otimes g)\delta)\otimes f)\delta\\
&=m_{wxz}(m_{xyz}\otimes1_R)
 ((h\otimes g)\otimes f)(\delta\otimes1_I)\delta.
\end{aligned}
$$

第二行ではまず $I\otimes I$ の左因子を $\delta$ で展開し、右因子には恒等射を作用させた。次に[豊穣圏の結合律](#def-catb2-01-enriched-category)を代入すると、上式は

$$
m_{wyz}(1_P\otimes m_{wxy})\alpha_{P,Q,R}
 ((h\otimes g)\otimes f)(\delta\otimes1_I)\delta
$$

になる。結合子の自然性（[モノイダル圏](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)）を $h,g,f$ に適用すると

$$
\alpha_{P,Q,R}((h\otimes g)\otimes f)
=(h\otimes(g\otimes f))\alpha_{I,I,I}.
$$

さらに [Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)を単位記号だけの式 $I$ と $I\otimes(I\otimes I)$ に適用する。二つの式から単位記号を除いた語はともに空であり、$\delta$ は単位子の逆だから

$$
\alpha_{I,I,I}(\delta\otimes1_I)\delta
=(1_I\otimes\delta)\delta.
$$

以上の二式を代入すると

$$
\begin{aligned}
(h\circ_0 g)\circ_0 f
&=m_{wyz}(1_P\otimes m_{wxy})
 (h\otimes(g\otimes f))(1_I\otimes\delta)\delta\\
&=m_{wyz}(h\otimes(m_{wxy}(g\otimes f)\delta))\delta\\
&=h\circ_0(g\circ_0 f).
\end{aligned}
$$

最後から二行目はテンソル双関手の合成保存であり、結合律が従う。

**単位律。** $A=\mathcal A(x,y)$、$f:I\to A$ とする。左単位律は豊穣公理と左単位子の自然性から

$$
\begin{aligned}
j_y\circ_0 f
&=m_{xyy}(j_y\otimes f)\delta\\
&=m_{xyy}(j_y\otimes1_A)(1_I\otimes f)\delta\\
&=\lambda_A(1_I\otimes f)\delta\\
&=f\lambda_I\delta=f.
\end{aligned}
$$

右単位律もその経路を書けば

$$
\begin{aligned}
f\circ_0 j_x
&=m_{xxy}(f\otimes j_x)\delta\\
&=m_{xxy}(1_A\otimes j_x)(f\otimes1_I)\delta\\
&=\rho_A(f\otimes1_I)\delta\\
&=f\rho_I\delta.
\end{aligned}
$$

[整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)を $I\otimes I$ から $I$ への構造射に適用すると $\rho_I=\lambda_I$ なので、最後の式も $f$ となる。これで[圏の公理](../../CAT/CAT1-01/index.md#def-cat1-01-category)を全て満たした。
<!-- proof-end -->

集合値の場合、$I=\{*\}$ からの写像は選んだ元で決まり、$\delta(*)=(*,*)$ だから $\mathcal A_0$ は第3節の通常の圏に戻る。線形の場合は $I=k$ から線形写像 $s:k\to\mathcal A(x,y)$ を取ると $s(t)=ts(1)$ である。評価 $s\mapsto s(1)$ の逆は $F\mapsto(t\mapsto tF)$ である。$\delta(1)=1\otimes1$ を用いると合成の評価は $m(G\otimes F)=GF$ となり、元の線形写像の合成が復元される。

ただし一般の基底で $I$ からの射だけがHom対象の構造を全て記述するとは限らない。次講では、この点が特に見えやすい順序と距離の例を扱う。

## 5. 一対象だけの豊穣圏

対象を $x$ 一つにするとHom対象も $M=\mathcal A(x,x)$ 一つになる。合成と単位は $m:M\otimes M\to M$ と $e:I\to M$ である。[モノイド対象の定義](../../CAT/CAT4-04/index.md#def-cat4-04-monoid)に戻ると、必要な三公理がちょうど一致する。

<a id="prop-catb2-01-one-object"></a>

<!-- formal-statement-start -->
> **命題（一対象の豊穣圏とモノイド対象）**
>
> 局所小なモノイダル圏 $\mathcal V$ において、対象集合が固定した一元集合である $\mathcal V$-豊穣圏の構造を与えることと、$\mathcal V$ のモノイド対象を与えることは互いに逆の操作である。
<!-- formal-statement-end -->

### 証明の見取り図

豊穣圏の全ての対象添字を同じ対象に置き換えれば、三公理はモノイド対象の三公理に一致する。

<!-- proof-start -->
### 証明

唯一の対象を $x$ とし $M=\mathcal A(x,x)$、$m=m_{xxx}$、$e=j_x$ と置く。[豊穣圏の結合律と単位律](#def-catb2-01-enriched-category)で全対象を $x$ にすると

$$
m(m\otimes1_M)=m(1_M\otimes m)\alpha_{M,M,M},
$$

$$
m(e\otimes1_M)=\lambda_M,\qquad
m(1_M\otimes e)=\rho_M.
$$

これは[モノイド対象の三公理](../../CAT/CAT4-04/index.md#def-cat4-04-monoid)そのものである。逆にモノイド対象 $(M,m,e)$ から対象 $x$ 一つを選び、Hom対象を $M$、合成射を $m$、単位射を $e$ とすれば、上の三式は全ての対象の組についての豊穣公理を尽くしている。往復しても $M,m,e$ は変更されないので、二つの構成は互いに逆である。
<!-- proof-end -->

たとえば非負整数の加法モノイドを集合値の一対象豊穣圏として見れば、射 $2$ の後に射 $3$ を合成すると $5$ になる。単位は $0$ で、対象は整数ごとに存在するのではなく一つだけである。

## 6. 演習

### CATB2-01-A01 合成の型

- Level: A

対象 $w,x,y,z$ を持つ豊穣圏で $P=\mathcal A(y,z)$、$Q=\mathcal A(x,y)$、$R=\mathcal A(w,x)$ とする。$(P\otimes Q)\otimes R$ から $\mathcal A(w,z)$ への結合律の二経路を書け。

<!-- solution-start -->
**詳細解答。** [豊穣圏の定義](#def-catb2-01-enriched-category)で左経路は $m_{xyz}\otimes1_R$ により $\mathcal A(x,z)\otimes R$ に移り、$m_{wxz}$ で $\mathcal A(w,z)$ に至る。右経路は $\alpha_{P,Q,R}$ で $P\otimes(Q\otimes R)$ へ移り、$1_P\otimes m_{wxy}$ で $P\otimes\mathcal A(w,y)$ に移り、$m_{wyz}$ で $\mathcal A(w,z)$ に至る。結合子を抜くと右経路の最初の射の始域が一致しない。
<!-- solution-end -->

### CATB2-01-A02 集合値の合成

- Level: A

$S=\{0\}$、$T=\{0,1\}$ とする。$f:S\to T$ は $f(0)=1$、$g:T\to T$ は $g(0)=1,g(1)=0$ とする。集合値の豊穣圏で $m_{STT}(g,f)$、$m_{STT}(j_T(*),f)$、$m_{SST}(f,j_S(*))$ を求めよ。

<!-- solution-start -->
**詳細解答。** [集合値の豊穣圏と通常の圏](#prop-catb2-01-set-enrichment)の合成は写像の合成である。第一の写像は $0\mapsto g(f(0))=g(1)=0$。第二は $0\mapsto1_T(f(0))=1$、第三は $0\mapsto f(1_S(0))=1$。後二つはともに $f$ であり、左右の単位律の具体例である。
<!-- solution-end -->

### CATB2-01-A03 行列の合成

- Level: A

実数体上で $F:\mathbb R\to\mathbb R^2$ の行列を $(2,-1)^{\mathsf T}$、$G:\mathbb R^2\to\mathbb R$ の行列を $(3,5)$ とする。合成射に $G\otimes F$、$F\otimes G$ をそれぞれ入力した像を求め、結果の型を述べよ。

<!-- solution-start -->
**詳細解答。** 第3節の合成射は純テンソルを行列積へ送る。$GF=3\cdot2+5\cdot(-1)=1$ で $\mathbb R\to\mathbb R$ の恒等写像である。一方、

$$
FG=\begin{pmatrix}2\\-1\end{pmatrix}(3,5)
=\begin{pmatrix}6&10\\-3&-5\end{pmatrix}
$$

は $\mathbb R^2\to\mathbb R^2$ の写像である。サイズが違うため二つを同じHom対象の元として比較できない。
<!-- solution-end -->

### CATB2-01-A04 一対象の合成と単位

- Level: A

$\mathbf{Set}$ 上の一対象豊穣圏でHom対象を $\mathbb N_0$、合成を加法とする。単位射を求め、結合律と左右単位律を確認せよ。

<!-- solution-start -->
**詳細解答。** [一対象の豊穣圏とモノイド対象](#prop-catb2-01-one-object)により、加法の単位元 $0$ から $j(*)=0$ と定める。任意の $a,b,c\in\mathbb N_0$ で結合子は $((a,b),c)$ を $(a,(b,c))$ に移す。二経路の像は $(a+b)+c$ と $a+(b+c)$ で整数加法の結合律から一致する。左単位は $0+a=a$、右単位は $a+0=a$ なので、単位子の二つの作用とも一致する。
<!-- solution-end -->

### CATB2-01-B01 なぜ直積ではいけないか

- Level: B

実数の積 $(a,b)\mapsto ab$ は $\mathbb R\times\mathbb R$ のベクトル空間から $\mathbb R$ への線形写像ではないことを示せ。一方、各変数について線形であることを確認し、テンソル積からの合成射を書け。

<!-- solution-start -->
**詳細解答。** $u=(1,0),v=(0,1)$ を取ると積の値はそれぞれ $0$ だが、$u+v=(1,1)$ の値は $1$ になる。したがって加法を保たず線形ではない。一方、実数 $s,t,a,a',b,b'$ について $(sa+ta')b=sab+ta'b$ および $a(sb+tb')=sab+tab'$ が成り立つ。ゆえに双線形である。[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)から一意な線形写像 $m:\mathbb R\otimes_{\mathbb R}\mathbb R\to\mathbb R$ が存在し、$m(a\otimes b)=ab$ となる。直積の加法とテンソル積の双線形関係は違う役割を持つ。
<!-- solution-end -->

### CATB2-01-B02 単位対象の展開

- Level: B

モノイダル圏の $\delta=\lambda_I^{-1}$ に対し、二つの射 $\alpha_{I,I,I}(\delta\otimes1_I)\delta$ と $(1_I\otimes\delta)\delta$ が等しい理由を、始域・終域と整合性定理の仮定を明示して説明せよ。

<!-- solution-start -->
**詳細解答。** 第一の経路は

$$
I\xrightarrow{\delta}I\otimes I
\xrightarrow{\delta\otimes1_I}(I\otimes I)\otimes I
\xrightarrow{\alpha_{I,I,I}}I\otimes(I\otimes I)
$$

である。第二は最初の $\delta$ の後、$1_I\otimes\delta$ で直接 $I\otimes(I\otimes I)$ に移る。両式から単位記号を除いた語は空であり、使用した射は単位子の逆、結合子、恒等射、テンソル、合成だけで作られる。[Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)の仮定に一致するため等しい。一般の射を任意に挿入したときまで一致すると主張してはいない。
<!-- solution-end -->

### CATB2-01-B03 台となる圏での射と合成

- Level: B

$\mathcal V=\mathbf{Vect}^{\rm fd}_{\mathbb R}$、$\mathcal A$ を第3節の豊穣圏とする。$x=y=z=\mathbb R$ で、$f:\mathbb R\to\mathcal A(x,y)$ は $f(t)$ が $u\mapsto2tu$ の写像、$g:\mathbb R\to\mathcal A(y,z)$ は $g(t)$ が $u\mapsto3tu$ の写像とする。$g\circ_0 f$ と $f\circ_0 j_x$ を $t$ の関数として求めよ。

<!-- solution-start -->
**詳細解答。** [豊穣圏の台となる圏](#thm-catb2-01-underlying-category)で $\lambda_I(a\otimes b)=ab$、従って $\delta(t)=t\otimes1$ である。これは $\lambda_I(t\otimes1)=t$ かつ $\lambda_I$ が同型なので従う。$(g\otimes f)\delta(t)=g(t)\otimes f(1)$。合成射は二つの線形写像の合成に送るため、任意の $u$ で $g(t)(f(1)(u))=3t(2u)=6tu$。よって $(g\circ_0 f)(t)$ は $u\mapsto6tu$ である。単位射 $j_x(t)$ は $u\mapsto tu$ なので、$(f\otimes j_x)\delta(t)=f(t)\otimes j_x(1)$。合成後は $f(t)(j_x(1)(u))=2tu$、すなわち $(f\circ_0 j_x)(t)=f(t)$ である。
<!-- solution-end -->

### CATB2-01-C01 行列の一対象豊穣圏と合成の順序

- Level: C

実数体上の $2\times2$ 行列空間 $M$ をHom対象とする一対象豊穣圏を考える。合成射は $m(B\otimes A)=BA$、単位射は $j(t)=tE$（$E$ は単位行列）とする。全公理を証明し、台となる圏の射を行列と同一視せよ。さらに

$$
A=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
B=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$

について $B\circ_0 A$ と $A\circ_0 B$ に相当する行列を計算し、因子の交換が一般にはできないことを説明せよ。

<!-- solution-start -->
**詳細解答。** 行列積は各入力について線形なので[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)によって $m$ が定まり、$j$ は線形である。[一対象の豊穣圏とモノイド対象](#prop-catb2-01-one-object)の三式を確かめる。純テンソル $((C\otimes B)\otimes A)$ に結合律の両辺を作用させると $(CB)A$ と $C(BA)$ になる。成分 $(i,l)$ はそれぞれ

$$
\sum_{j=1}^2\left(\sum_{k=1}^2 C_{ik}B_{kj}\right)A_{jl},
$$

$$
\sum_{k=1}^2 C_{ik}\left(\sum_{j=1}^2 B_{kj}A_{jl}\right)
$$

であり、有限和の交換と実数の分配律で一致する。左単位律は $m(tE\otimes A)=tA$、右単位律は $m(A\otimes tE)=tA$ で、左右単位子に等しい。各始域は純テンソルの線形結合で生成され、全て線形写像だから三式は全域で成立する。

[台となる圏](#thm-catb2-01-underlying-category)の射 $f:\mathbb R\to M$ は線形性から $f(t)=tf(1)$ であり、任意の $A\in M$ に対して $f_A(t)=tA$ が逆対応を与える。$f_B\circ_0 f_A$ の $1$ での値は $m(B\otimes A)=BA$ だから、行列で表すと通常の積である。具体的に

$$
BA=\begin{pmatrix}0&0\\0&1\end{pmatrix},\qquad
AB=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

これらは第一対角成分も第二対角成分も異なる。結合律は括弧の変更についての条件であり、因子を交換できるという条件ではない。基底に対称性があってもこの合成の可換性は従わない。
<!-- solution-end -->

## 7. 次に向けて

豊穣圏では、射の合成の規則を保ったままHomの値を集合からモノイダル圏の対象に拡張できた。基底が集合なら通常の圏、線形空間なら双線形な合成、対象一つならモノイド対象となる。次はHomの値に順序や距離を選ぶことで、合成の公理がどのような具体的な条件になるかを考える。

参考文献：G. M. Kelly, [Basic Concepts of Enriched Category Theory](https://www.tac.mta.ca/tac/reprints/articles/10/tr10abs.html), 第1章。
