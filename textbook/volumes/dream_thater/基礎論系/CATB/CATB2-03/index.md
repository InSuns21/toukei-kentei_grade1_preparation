# CATB2-03 豊穣関手と豊穣自然変換

## 1. Homの構造を保って移す

前講では、移動費用をHom対象として記録することで、通常の圏の射の有無より多くの情報を保存できた。二つの費用空間を比較するとき、ゼロ費用の経路だけでなく、正の費用も増やさない写像が欲しい。線形写像の世界なら、合成だけでなくHomの線形構造を保存する写像が欲しい。

通常の[共変関手](../../CAT/CAT1-06/index.md#def-cat1-06-functor)では対象を移し、各Hom集合の写像で合成と恒等射を保存する。ここではHom集合の写像を基底の圏の射に置き換える。

基底を[モノイダル圏](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal) $(\mathcal V,\otimes,I,\alpha,\lambda,\rho)$ とする。ここで $I$ は単位対象、$\alpha$ は結合子、$\lambda,\rho$ は左・右単位子である。

基底は[局所小圏](../../CAT/CAT1-02/index.md#def-cat1-02-size)、すなわち任意の二対象間の射が集合をなす圏と仮定する。本講の豊穣圏はすべてこの同じ基底上にあり、対象の集まりは集合とする。

[豊穣圏の定義](../CATB2-01/index.md#def-catb2-01-enriched-category)に従い、合成と単位を $m^{\mathcal A}_{xyz},j^{\mathcal A}_x$ と書く。上添字はどの豊穣圏の構造射かを区別し、$xyz$ は出発点・中間点・到着点、$x$ は単位射の対象を表す。

$\mathcal A(x,y)$ は基底の対象、$1_{\mathcal A(x,y)}$ はその基底での恒等射であり、$j_x^{\mathcal A}$ とは異なる。

射の並置は右から先に作用する合成を表し、通常の写像の合成では $\circ$ とも書く。対象の像 $F(x)$ は $Fx$ と略記する。

<a id="def-catb2-03-enriched-functor"></a>

<!-- formal-statement-start -->
> **定義（豊穣関手）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の豊穣圏 $\mathcal A,\mathcal B$ の間の豊穣関手 $F:\mathcal A\to\mathcal B$ は、対象の写像 $x\mapsto Fx$ と、各対象対に対する $\mathcal V$ の射

$$
F_{xy}:\mathcal A(x,y)\longrightarrow\mathcal B(Fx,Fy)
$$

> を持ち、任意の三対象および任意の対象について次を満たす。

$$
F_{xz}m^{\mathcal A}_{xyz}
=m^{\mathcal B}_{Fx,Fy,Fz}(F_{yz}\otimes F_{xy}),
$$

$$
F_{xx}j^{\mathcal A}_x=j^{\mathcal B}_{Fx}.
$$

> 基底と豊穣圏の構造は固定する。
<!-- formal-statement-end -->

第一式の二経路の始域は $\mathcal A(y,z)\otimes\mathcal A(x,y)$、終域は $\mathcal B(Fx,Fz)$ である。先に合成してから移す経路と、各Hom対象を移してから合成する経路を比較している。第二式は $I$ から $\mathcal B(Fx,Fx)$ への二経路を比較する。

<!-- definition-example-start: def-catb2-03-enriched-functor -->
**定義の確認**。 基底を[集合の直積によるモノイダル圏](../../CAT/CAT4-01/index.md#thm-cat4-01-cartesian-monoidal)とし、通常の圏を[集合値の豊穣圏](../CATB2-01/index.md#prop-catb2-01-set-enrichment)として読む。対象は $S=\{0,1\}$ 一つだけとし、Hom集合を $S$ から $S$ への全写像の集合とする。合成は写像の合成である。$s:S\to S$ を $s(0)=1,s(1)=0$ と置く。対象は一つなので対象写像は一意であり、構造射 $F_{SS}$ は自己写像の集合から自身への写像になる。以下ではその作用を $F(f)=F_{SS}(f)$ と略記する。対象を変えず、Homの写像を

$$
F(f)=s\circ f\circ s
$$

とする。$s\circ s=1_S$ なので、任意の自己写像 $f,g$ に対し

$$
\begin{aligned}
F(g)\circ F(f)
&=s\circ g\circ s\circ s\circ f\circ s\\
&=s\circ(g\circ f)\circ s\\
&=F(g\circ f).
\end{aligned}
$$

また $F(1_S)=s\circ1_S\circ s=1_S$。合成保存式は直積の各入力 $(g,f)$ で成り立ち、単位保存式は一元集合の唯一の元で成り立つ。したがって両方とも集合の写像として等しく、定義を満たす。例えば $f$ を定数 $0$ の写像とすると $F(f)$ は定数 $1$ の写像である。対象が同じでもHom上の作用は変えられる。
<!-- definition-example-end -->

## 2. 台となる圏への移行

[豊穣圏の台となる圏](../CATB2-01/index.md#thm-catb2-01-underlying-category)では、通常の射は基底の単位対象からの射であった。豊穣関手のHom上の射にこれを続ければ、通常の射の像が得られる。

<a id="thm-catb2-03-underlying-functor"></a>

<!-- formal-statement-start -->
> **定理（豊穣関手から台の関手へ）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の[豊穣関手](#def-catb2-03-enriched-functor) $F:\mathcal A\to\mathcal B$ は、台となる圏の間の通常の関手 $F_0:\mathcal A_0\to\mathcal B_0$ を定める。対象の作用は $x\mapsto Fx$、射の作用は

$$
F_0(f)=F_{xy}f
\quad(f:I\to\mathcal A(x,y))
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

単位保存は定義の第二式そのものである。合成保存は、Hom上の合成保存式を単位対象から来る二入力で評価して得る。

<!-- proof-start -->
### 証明

$F_{xy}f$ は $I\to\mathcal B(Fx,Fy)$ なので通常の射の像として正しい型を持つ。[台となる圏の合成](../CATB2-01/index.md#thm-catb2-01-underlying-category)の記法に従い、台の圏での合成を $\circ_0$、単位対象を二入力に分ける射を $\delta=\lambda_I^{-1}:I\to I\otimes I$ と書く。射 $f:I\to\mathcal A(x,y)$ と $g:I\to\mathcal A(y,z)$ を取る。

[豊穣関手の合成保存](#def-catb2-03-enriched-functor)と[テンソル双関手の合成保存](../../CAT/CAT4-01/index.md#def-cat4-01-tensor-bifunctor)を順に使うと

$$
\begin{aligned}
F_0(g\circ_0 f)
&=F_{xz}m^{\mathcal A}_{xyz}(g\otimes f)\delta\\
&=m^{\mathcal B}_{Fx,Fy,Fz}(F_{yz}\otimes F_{xy})
(g\otimes f)\delta\\
&=m^{\mathcal B}_{Fx,Fy,Fz}
((F_{yz}g)\otimes(F_{xy}f))\delta\\
&=F_0(g)\circ_0 F_0(f).
\end{aligned}
$$

恒等射については $F_0(j_x^{\mathcal A})=F_{xx}j_x^{\mathcal A}=j_{Fx}^{\mathcal B}$。これで[通常の関手の公理](../../CAT/CAT1-06/index.md#def-cat1-06-functor)を満たす。
<!-- proof-end -->

集合を基底とすると、一元集合からの射は元の指定なので通常の関手から逆に豊穣関手が作れる。通常の関手の射の作用を $F_{xy}$ とすれば、合成・恒等射の保存は全入力での豊穣関手の二条件となる。

豊穣関手も合成できる。$G:\mathcal B\to\mathcal D$ に対し対象を $GFx$ に移し、Hom上の射を $H_{xy}=G_{Fx,Fy}F_{xy}$ と置く。実際、添字を省いて各圏の合成を $m^\mathcal A,m^\mathcal B,m^\mathcal D$ と書くと

$$
\begin{aligned}
H_{xz}m^\mathcal A
&=G_{Fx,Fz}m^\mathcal B(F_{yz}\otimes F_{xy})\\
&=m^\mathcal D(G_{Fy,Fz}\otimes G_{Fx,Fy})
(F_{yz}\otimes F_{xy})\\
&=m^\mathcal D(H_{yz}\otimes H_{xy}).
\end{aligned}
$$

単位も $H_{xx}j_x^\mathcal A=G_{Fx,Fx}j_{Fx}^\mathcal B=j_{GFx}^\mathcal D$。恒等関手は対象を変えず各Hom上で恒等射を取るので二条件を満たす。結合律と単位律は対象写像の合成および基底の射の合成から従う。

## 3. 二値と費用の場合の判定

前講の[二値豊穣圏と前順序](../CATB2-02/index.md#prop-catb2-02-preorder-enrichment)を用いる。前順序集合 $X$ のHom対象を $h_X(x,y)$ と書く。

$$
h_X(x,y)=
\begin{cases}
1 & (x\preceq_X y),\\
0 & (\text{それ以外}).
\end{cases}
$$

基底は $0\le1$ に対応する二値の圏で、単位対象は $1$ である。

費用の場合は [Lawvere型拡張距離](../CATB2-02/index.md#def-catb2-02-lawvere-metric) $d_X$ を [豊穣圏のHom対象](../CATB2-02/index.md#thm-catb2-02-lawvere-enrichment)として用いる。

いずれの基底でも同じ始域・終域を持つ射は高々一本なので、構造射の存在条件から関手を判定できる。

<a id="prop-catb2-03-thin-functors"></a>

<!-- formal-statement-start -->
> **命題（順序・費用による豊穣関手の判定）**
>
> 二値豊穣圏として表した前順序の間の豊穣関手は、順序を保存する写像と一対一に対応する。
>
> [Lawvere距離の基底](../CATB2-02/index.md#def-catb2-02-lawvere-base)上の豊穣圏として表した拡張距離空間 $(X,d_X),(Y,d_Y)$ の間の豊穣関手は、次の不等式を全ての点対について満たす写像 $F:X\to Y$ と一対一に対応する。

$$
d_Y(Fx,Fy)\le d_X(x,y).
$$

> 大小は通常の数の順序であり、無限大を許す。
<!-- formal-statement-end -->

### 証明の見取り図

どちらの基底でも同じ始域と終域を持つ射は高々一本である。したがってHom上の構造射さえ存在すれば、保存式の二経路は等しい。

<!-- proof-start -->
### 証明

二値基底のHom上の射は $h_X(x,y)\to h_Y(Fx,Fy)$ であり、その存在は通常の順序で $h_X(x,y)\le h_Y(Fx,Fy)$ と同値である。左辺が $0$ の場合は常に成立する。左辺が $1$ の場合は右辺も $1$ でなければならない。これは $x\preceq_X y$ なら $Fx\preceq_Y Fy$ という条件に一致する。

距離の基底では[基底の順序反転](../CATB2-02/index.md#def-catb2-02-lawvere-base)により

$$
d_X(x,y)\longrightarrow d_Y(Fx,Fy)
$$

が存在することと、命題の不等式が同値である。

いずれの場合も、全点対で構造射が存在すれば一意に決まる。保存式の左辺は元の圏の合成を先に行い、右辺は二本の構造射のテンソルを先に行う。豊穣圏の合成とテンソル双関手が存在するので両経路は存在し、同じ始域と終域を持つ。よって射の一意性により一致する。単位保存式も $I$ から $\mathcal B(Fx,Fx)$ への二本の射であり一致する。[豊穣関手の定義](#def-catb2-03-enriched-functor)を満たす。逆方向は構造射の存在から既に得た。対象写像以外のデータは一意なので一対一対応である。
<!-- proof-end -->

例えば二点の通常の距離をそれぞれ $2$ と $5$ にした空間 $X,Y$ を考える。対角はゼロで、三角不等式は中間点が端点なら等号、始点と終点が一致するときは左辺ゼロなので成立する。どちらも台となる圏は恒等射しか持たない。点を対応させる全単射は通常の関手になるが、$X\to Y$ の対応は $5\le2$ が偽なので豊穣関手にならない。反対方向の対応は $2\le5$ なので豊穣関手である。台の圏だけに移すと正の距離が消えたことが、逆構成に失敗する原因である。

## 4. 関手の間の変換もHom対象で比較する

通常の[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)は各対象の像を結ぶ成分の集まりであり、任意の射について二経路が一致する。豊穣圏では、任意の通常の射について比較するだけでなく、Hom対象全体を入力とする二本の基底の射を比較したい。

$F,G:\mathcal A\to\mathcal B$ に対し、成分は台の圏での射 $Fx\to Gx$、すなわち $a_x:I\to\mathcal B(Fx,Gx)$ とする。$x,y$ を固定し $P=\mathcal A(x,y)$ と置く。成分を合成の左入力に入れるときには $\lambda_P^{-1}:P\to I\otimes P$ を、右入力に入れるときには $\rho_P^{-1}:P\to P\otimes I$ を使う。

<a id="def-catb2-03-enriched-natural"></a>

<!-- formal-statement-start -->
> **定義（豊穣自然変換）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の二つの[豊穣関手](#def-catb2-03-enriched-functor) $F,G:\mathcal A\to\mathcal B$ の間の豊穣自然変換 $a:F\Rightarrow G$ は各対象 $x$ に対して射

$$
a_x:I\longrightarrow\mathcal B(Fx,Gx)
$$

> を指定し、任意の対象対に対して $P=\mathcal A(x,y)$ と置くとき、次の $\mathcal V$ の射の等式を満たす。

$$
\begin{aligned}
&m^\mathcal B_{Fx,Fy,Gy}(a_y\otimes F_{xy})\lambda_P^{-1}\\
&=m^\mathcal B_{Fx,Gx,Gy}(G_{xy}\otimes a_x)\rho_P^{-1}.
\end{aligned}
$$

> これを豊穣自然性の条件とする。
<!-- formal-statement-end -->

左辺の経路は

$$
\begin{aligned}
P&\xrightarrow{\lambda_P^{-1}}I\otimes P\\
&\xrightarrow{a_y\otimes F_{xy}}
\mathcal B(Fy,Gy)\otimes\mathcal B(Fx,Fy)\\
&\xrightarrow{m^\mathcal B_{Fx,Fy,Gy}}\mathcal B(Fx,Gy).
\end{aligned}
$$

右辺の経路は

$$
\begin{aligned}
P&\xrightarrow{\rho_P^{-1}}P\otimes I\\
&\xrightarrow{G_{xy}\otimes a_x}
\mathcal B(Gx,Gy)\otimes\mathcal B(Fx,Gx)\\
&\xrightarrow{m^\mathcal B_{Fx,Gx,Gy}}\mathcal B(Fx,Gy).
\end{aligned}
$$

どちらも $P\to\mathcal B(Fx,Gy)$ という同じ型である。因子を交換する必要はなく、基底の対称性も要求しない。

<!-- definition-example-start: def-catb2-03-enriched-natural -->
**定義の確認**。 第1節の一対象の例で $E$ を恒等関手、$F$ を $F(f)=sfs$ とする関手とする。集合の基底では成分を指定することは一元集合からの写像を指定することなので、単位対象を一元集合 $I=\{*\}$ とし、唯一の対象 $S$ での成分を $a_S(*)=s$ と指定する。左単位子の逆は $f\mapsto(*,f)$、右単位子の逆は $f\mapsto(f,*)$ である。左経路は $s\circ f$、右経路は $F(f)\circ s$ であり、

$$
F(f)\circ s=s\circ f\circ s\circ s=s\circ f.
$$

任意の自己写像 $f$ について一致したのでHom集合上の二本の写像は等しい。成分の型と自然性をともに確認でき、$E\Rightarrow F$ が得られる。
<!-- definition-example-end -->

## 5. 通常の自然性との関係

<a id="thm-catb2-03-underlying-natural"></a>

<!-- formal-statement-start -->
> **定理（豊穣自然変換から台の自然変換へ）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の[豊穣自然変換](#def-catb2-03-enriched-natural) $a:F\Rightarrow G$ は、台となる関手の間の通常の自然変換 $a_0:F_0\Rightarrow G_0$ を定める。その成分は台となる圏の射として読んだ $a_x$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Hom対象上の等式を、単位対象から来る通常の射で前合成する。左右の単位子の自然性によって、二経路が台の圏における成分との合成に変わる。

<!-- proof-start -->
### 証明

$P=\mathcal A(x,y)$ とし、任意の $f:I\to P$ を取る。[単位子の自然性](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)とその可逆性から

$$
\lambda_P^{-1}f=(1_I\otimes f)\lambda_I^{-1},
$$

$$
\rho_P^{-1}f=(f\otimes1_I)\rho_I^{-1}
$$

である。[Mac Laneの整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)から $\rho_I=\lambda_I$。その逆を $\delta$ とする。

[豊穣自然性の等式](#def-catb2-03-enriched-natural)の左辺に $f$ を前合成すると、[テンソルの合成保存](../../CAT/CAT4-01/index.md#def-cat4-01-tensor-bifunctor)を使って

$$
\begin{aligned}
&m^\mathcal B_{Fx,Fy,Gy}(a_y\otimes F_{xy})
\lambda_P^{-1}f\\
&=m^\mathcal B_{Fx,Fy,Gy}
(a_y\otimes F_{xy})(1_I\otimes f)\delta\\
&=m^\mathcal B_{Fx,Fy,Gy}
(a_y\otimes(F_{xy}f))\delta\\
&=a_y\circ_0 F_0(f).
\end{aligned}
$$

右辺に $f$ を前合成すると

$$
\begin{aligned}
&m^\mathcal B_{Fx,Gx,Gy}(G_{xy}\otimes a_x)
\rho_P^{-1}f\\
&=m^\mathcal B_{Fx,Gx,Gy}
(G_{xy}\otimes a_x)(f\otimes1_I)\delta\\
&=m^\mathcal B_{Fx,Gx,Gy}
((G_{xy}f)\otimes a_x)\delta\\
&=G_0(f)\circ_0 a_x.
\end{aligned}
$$

両者は等しい。これは[通常の自然性](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)の条件であり、任意の $f$ について成り立つので結論を得る。
<!-- proof-end -->

逆に、通常の自然性から豊穣自然性を得るには、二本の基底の射が $I$ からの全ての射で前合成して一致するという情報から、元の二本の射の一致を結論できる必要がある。集合なら全ての元での値が写像を決めるので成立する。一般の基底ではこの性質を仮定していない。

### 5.1 順序・距離の場合の自然性

[順序による関手判定](#prop-catb2-03-thin-functors)を満たす前順序間の写像 $F,G$ について、[二値豊穣圏](../CATB2-02/index.md#prop-catb2-02-preorder-enrichment)での単位対象は $I=1$ なので、成分 $1\to h_Y(Fx,Gx)$ の存在は $h_Y(Fx,Gx)=1$、すなわち $Fx\preceq_Y Gx$ と同値である。[Lawvere距離の基底](../CATB2-02/index.md#def-catb2-02-lawvere-base)の場合、成分 $0\to d_Y(Fx,Gx)$ が存在するのは $d_Y(Fx,Gx)=0$ のときに限る。いずれも成分が存在すれば自然性の二経路は同じ始域と終域を持つので、基底の射の一意性から等しい。したがって自然変換の存在は、それぞれ全点での順序またはゼロ費用だけで判定できる。

前講で扱った非対称な費用 $d(x,y)=\max(y-x,0)$ を区間 $[0,1]$ に制限する。$F(x)=x$、$G(x)=0$ とすると、$F$ は費用を保ち、$G$ は費用をゼロにするので[費用による関手判定](#prop-catb2-03-thin-functors)を満たす。

$$
d(Fx,Gx)=\max(0-x,0)=0
$$

だから $F\Rightarrow G$ は存在する。しかし $d(G1,F1)=1$ であり逆向きの成分は存在しない。向きのある自然変換を費用ゼロという条件で観察できた。

## 6. 変換を順番につなぐ

通常の[垂直合成](../../CAT/CAT1-08/index.md#def-cat1-08-vertical)と同じように、豊穣自然変換も対象ごとにつなぎたい。ただし自然性はHom対象全体についての等式なので、成分をつないだ後にもその等式が成立することを確かめる。

<a id="prop-catb2-03-vertical"></a>

<!-- formal-statement-start -->
> **命題（豊穣自然変換の成分ごとの合成）**
>
> 局所小なモノイダル圏 $\mathcal V$ 上の[豊穣関手](#def-catb2-03-enriched-functor) $F,G,H:\mathcal A\to\mathcal B$ と[豊穣自然変換](#def-catb2-03-enriched-natural) $a:F\Rightarrow G$、$b:G\Rightarrow H$ に対し、

$$
c_x=m^\mathcal B_{Fx,Gx,Hx}(b_x\otimes a_x)\lambda_I^{-1}
$$

> は豊穣自然変換 $c:F\Rightarrow H$ の成分を与える。各関手には成分を $j^\mathcal B_{Fx}$ とする恒等変換がある。これらの合成は結合律と左右単位律を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

任意のHom対象を変数としたまま、左から成分を二回合成する。まず $a$ の自然性で中間の関手へ移し、次に $b$ の自然性で最後の関手へ移す。

<!-- proof-start -->
### 証明

以下では $p,v,w$ を $\mathcal B$ の対象とする。固定した成分 $u:I\to\mathcal B(v,w)$ と、基底の任意の対象 $P$ からの射 $t:P\to\mathcal B(p,v)$ に対し、左からの合成を

$$
u*t=m^\mathcal B_{p,v,w}(u\otimes t)\lambda_P^{-1}
$$

と書く。逆の位置に固定成分 $u:I\to\mathcal B(p,v)$ と射 $t:P\to\mathcal B(v,w)$ があるときは

$$
t*u=m^\mathcal B_{p,v,w}(t\otimes u)\rho_P^{-1}
$$

と書く。どちらも始域は $P$。両方が $I$ からの射なら $\lambda_I=\rho_I$ なので[台となる圏の合成](../CATB2-01/index.md#thm-catb2-01-underlying-category)に一致する。

この記法で三入力を合成する。$\mathcal B$ の四対象 $z_0,z_1,z_2,z_3$ を取り、$i=1,2,3$ について $R_i=\mathcal B(z_{i-1},z_i)$、$t_i:Q_i\to R_i$ と書く。始域 $Q_1,Q_2,Q_3$ のうち二つは $I$、残りは $P$ とする。このとき

$$
(t_3*t_2)*t_1=t_3*(t_2*t_1)
$$

が成立する。ここではどの入力が固定成分かを限定しない。根拠を確認しよう。

左の括弧付けでは単位子の逆で $P$ から $(Q_3\otimes Q_2)\otimes Q_1$ へ移す構造射 $s_L$ を作り、右では $Q_3\otimes(Q_2\otimes Q_1)$ へ移す $s_R$ を作る。例えば $Q_3=Q_2=I,Q_1=P$ なら

$$
s_L=(\lambda_I^{-1}\otimes1_P)\lambda_P^{-1},
$$

$$
s_R=(1_I\otimes\lambda_P^{-1})\lambda_P^{-1}.
$$

中央が $P$ の場合は、左の括弧付けでは右に $I$ を加えてから左因子の左に $I$ を加え、右の括弧付けでは左に $I$ を加えてから右因子の右に $I$ を加える。

$$
s_L=(\lambda_P^{-1}\otimes1_I)\rho_P^{-1},
$$

$$
s_R=(1_I\otimes\rho_P^{-1})\lambda_P^{-1}.
$$

左端が $P$ の場合は

$$
s_L=(\rho_P^{-1}\otimes1_I)\rho_P^{-1},
$$

$$
s_R=(1_P\otimes\lambda_I^{-1})\rho_P^{-1}.
$$

三場合とも、外側の合成に対応する単位子の逆を先に作用させ、次に内側の合成に対応する単位子の逆を該当因子へ作用させた。[整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)を単位記号を除けば同じ語 $P$ となる二経路に適用すると、全ての位置について

$$
\alpha_{Q_3,Q_2,Q_1}s_L=s_R.
$$

[テンソル双関手の合成保存](../../CAT/CAT4-01/index.md#def-cat4-01-tensor-bifunctor)により、左の括弧付けの合成は

$$
m(m\otimes1_{R_1})((t_3\otimes t_2)\otimes t_1)s_L
$$

と書ける。ここでは添字を省いた。左辺の外側の $m$ は $m^\mathcal B_{z_0,z_1,z_3}$、内側は $m^\mathcal B_{z_1,z_2,z_3}$ である。右の括弧付けではそれぞれ $m^\mathcal B_{z_0,z_2,z_3}$ と $m^\mathcal B_{z_0,z_1,z_2}$ になる。両経路の終域は $\mathcal B(z_0,z_3)$ である。[豊穣圏の結合律](../CATB2-01/index.md#def-catb2-01-enriched-category)を代入し、結合子の自然性を使うと

$$
\begin{aligned}
&m(1_{R_3}\otimes m)\alpha_{R_3,R_2,R_1}
((t_3\otimes t_2)\otimes t_1)s_L\\
&=m(1_{R_3}\otimes m)
(t_3\otimes(t_2\otimes t_1))\alpha_{Q_3,Q_2,Q_1}s_L\\
&=m(1_{R_3}\otimes m)
(t_3\otimes(t_2\otimes t_1))s_R.
\end{aligned}
$$

最後は右の括弧付けの合成である。これで三入力のどの位置が $P$ でも使える結合性が得られた。

任意の $x,y$ について $P=\mathcal A(x,y)$ と置く。[豊穣自然性](#def-catb2-03-enriched-natural)はこの記法では $a_y*F_{xy}=G_{xy}*a_x$ と $b_y*G_{xy}=H_{xy}*b_x$ である。成分の合成は $c_x=b_x*a_x$ なので

$$
\begin{aligned}
c_y*F_{xy}
&=(b_y*a_y)*F_{xy}\\
&=b_y*(a_y*F_{xy})\\
&=b_y*(G_{xy}*a_x)\\
&=(b_y*G_{xy})*a_x\\
&=(H_{xy}*b_x)*a_x\\
&=H_{xy}*(b_x*a_x)\\
&=H_{xy}*c_x.
\end{aligned}
$$

第二、第四、第六行への変形は上で得た結合性、第三、第五行への変形はそれぞれ $a,b$ の自然性である。全て $P\to\mathcal B(Fx,Hy)$ の射なので、$c$ の自然性が成立する。

恒等変換の自然性は[豊穣圏の左右単位律](../CATB2-01/index.md#def-catb2-01-enriched-category)と[単位子の自然性](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)から確認できる。

例えば $t=F_{xy}$、$R=\mathcal B(Fx,Fy)$ とし、以下の $1$ は $1_R$、$j$ は $\mathcal B$ の単位射とする。

左の合成では $m=m^\mathcal B_{Fx,Fy,Fy}$、右の合成では $m=m^\mathcal B_{Fx,Fx,Fy}$ である。すると

$$
j_{Fy}*t
=m(j_{Fy}\otimes1)(1_I\otimes t)\lambda_P^{-1}
=\lambda_{\mathcal B(Fx,Fy)}(1_I\otimes t)\lambda_P^{-1}
=t.
$$

右側も

$$
t*j_{Fx}
=m(1\otimes j_{Fx})(t\otimes1_I)\rho_P^{-1}
=\rho_{\mathcal B(Fx,Fy)}(t\otimes1_I)\rho_P^{-1}
=t.
$$

したがって恒等変換は自然である。最後に成分ごとの合成は台の圏の合成なので、三変換の各成分の結合律と左右単位律は[台となる圏の公理](../CATB2-01/index.md#thm-catb2-01-underlying-category)で成立する。変換は成分の族そのものだから、全成分で等しければ変換も等しい。
<!-- proof-end -->

これで豊穣関手を対象、豊穣自然変換を射とする通常の圏を作れる。[局所小性](../../CAT/CAT1-02/index.md#def-cat1-02-size)がここで効く。$\mathcal A,\mathcal B$ の対象集合をそれぞれ $X,Y$ とする。対象写像 $F:X\to Y$ を一つ固定すると、関手の構造射の族は

$$
\prod_{(x,y)\in X\times X}
\mathcal V(\mathcal A(x,y),\mathcal B(Fx,Fy))
$$

の元であり、そのうち二つの保存条件を満たすものだけを取る。各因子は局所小性により集合であり、添字も集合である。対象写像全体も集合なので、これらの候補を対象写像について集めても集合になる。同様に、固定した二関手 $F,G$ の間の自然変換は

$$
\prod_{x\in X}\mathcal V(I,\mathcal B(Fx,Gx))
$$

のうち自然性を満たす元の集合である。したがって関手を対象、変換を射とする圏は小さい圏になる。次講では基底自身を豊穣圏として扱うための追加条件を導入する。

## 7. 演習

### CATB2-03-A01 Hom上の射の型

- Level: A

豊穣関手 $F:\mathcal A\to\mathcal B$ の合成保存の二経路を、三対象 $p,q,r$ に対して始域・終域を付けて書け。

<!-- solution-start -->
**詳細解答。** [豊穣関手の定義](#def-catb2-03-enriched-functor)において $x=p,y=q,z=r$ とする。第一経路は

$$
\mathcal A(q,r)\otimes\mathcal A(p,q)
\xrightarrow{m^\mathcal A_{pqr}}
\mathcal A(p,r)
\xrightarrow{F_{pr}}\mathcal B(Fp,Fr).
$$

第二経路は

$$
\begin{aligned}
\mathcal A(q,r)\otimes\mathcal A(p,q)
&\xrightarrow{F_{qr}\otimes F_{pq}}
\mathcal B(Fq,Fr)\otimes\mathcal B(Fp,Fq)\\
&\xrightarrow{m^\mathcal B_{Fp,Fq,Fr}}
\mathcal B(Fp,Fr).
\end{aligned}
$$

同じ始域と終域を持つので比較できる。$F_{pq}$ と $F_{qr}$ を交換すると一般にテンソルの始域が異なり、このままでは合成できない。
<!-- solution-end -->

### CATB2-03-A02 順序保存の判定

- Level: A

通常の順序を備えた集合 $\{0,1,2\}$ の二値豊穣圏で、写像 $F(0)=0,F(1)=2,F(2)=2$ と $G(0)=2,G(1)=1,G(2)=0$ を判定せよ。

<!-- solution-start -->
**詳細解答。** [順序による判定](#prop-catb2-03-thin-functors)を使う。対角の組は常に保存される。残る順序関係は $0\le1,1\le2,0\le2$。$F$ の像ではそれぞれ $0\le2,2\le2,0\le2$ となり、全て成立するので豊穣関手である。$G$ は $0\le1$ を $2\le1$ に移すため豊穣関手ではない。
<!-- solution-end -->

### CATB2-03-A03 距離の伸縮

- Level: A

実直線に通常の距離 $d(x,y)=|y-x|$ を入れ、Lawvere距離の基底で豊穣圏として扱う。$F(x)=ax+b$ とする。実数 $a,b$ に対して豊穣関手となる条件を求めよ。

<!-- solution-start -->
**詳細解答。** [費用による判定](#prop-catb2-03-thin-functors)により全ての実数 $x,y$ で

$$
\begin{aligned}
|F(y)-F(x)|
&=|(ay+b)-(ax+b)|\\
&=|a|\,|y-x|\\
&\le|y-x|.
\end{aligned}
$$

が必要である。$x=0,y=1$ を代入すると $|a|\le1$ が必要となる。逆にこの条件なら $|y-x|\ge0$ を掛けて全点対の不等式を得る。従って $-1\le a\le1$ が必要十分であり、平行移動の量 $b$ は任意である。
<!-- solution-end -->

### CATB2-03-A04 自然変換の向き

- Level: A

前順序 $\{0,1,2\}$ を通常の順序で二値豊穣圏とする。恒等写像 $F$ と定数写像 $G(x)=2$ の間で、どちら向きの豊穣自然変換が存在するか。

<!-- solution-start -->
**詳細解答。** 両写像は順序を保存するので[関手判定](#prop-catb2-03-thin-functors)により豊穣関手である。[豊穣自然変換の定義](#def-catb2-03-enriched-natural)では各成分の存在は像の順序関係と同値である。$F(0)=0\le2,F(1)=1\le2,F(2)=2\le2$ だから全成分が存在する。自然性の二本の射は同じ始域と終域を持つので一意性から等しい。よって $F\Rightarrow G$ が存在する。逆方向では $G(0)=2\le0=F(0)$ が偽なので成分がなく、変換は存在しない。
<!-- solution-end -->

### CATB2-03-B01 一対象での単位保存

- Level: B

集合値の一対象豊穣圏で、Hom集合を非負整数、合成を加法、恒等射を $0$ とする。この圏から自身への豊穣関手は全て $F(n)=kn$（$k$ は非負整数）の形になることを証明せよ。

<!-- solution-start -->
**詳細解答。** [一対象の豊穣圏とモノイド対象](../CATB2-01/index.md#prop-catb2-01-one-object)により加法の結合律と単位元 $0$ から豊穣圏を得る。対象の作用は一意である。[豊穣関手の二条件](#def-catb2-03-enriched-functor)は

$$
F(m+n)=F(m)+F(n),\qquad F(0)=0
$$

となる。$k=F(1)$ と置く。$n=0$ では $F(0)=k\cdot0$。$F(n)=kn$ を仮定すれば

$$
F(n+1)=F(n)+F(1)=kn+k=k(n+1).
$$

帰納法で全ての非負整数に対し $F(n)=kn$ を得る。逆に任意の非負整数 $k$ について $F(m+n)=km+kn=F(m)+F(n)$ かつ $F(0)=0$ なので二条件が成立する。$k$ は $F(1)$ で一意に定まる。
<!-- solution-end -->

### CATB2-03-B02 通常の自然性を取り出す

- Level: B

豊穣自然変換 $a:F\Rightarrow G$ に対し $f:I\to\mathcal A(x,y)$ を取る。豊穣自然性の右経路を $f$ と合成し、台となる圏での $G_0(f)\circ_0 a_x$ に一致することを示せ。どの箇所で単位子が必要かも説明せよ。

<!-- solution-start -->
**詳細解答。** $P=\mathcal A(x,y)$ とする。[豊穣自然性](#def-catb2-03-enriched-natural)の右経路の前合成は

$$
m^\mathcal B_{Fx,Gx,Gy}(G_{xy}\otimes a_x)\rho_P^{-1}f
$$

である。[単位子の自然性](../../CAT/CAT4-01/index.md#def-cat4-01-monoidal)を $f:I\to P$ に適用して $\rho_P^{-1}f=(f\otimes1_I)\rho_I^{-1}$ を得る。さらに[整合性定理](../../CAT/CAT4-02/index.md#thm-cat4-02-coherence)で $\rho_I^{-1}=\lambda_I^{-1}=\delta$。よって[テンソルの合成保存](../../CAT/CAT4-01/index.md#def-cat4-01-tensor-bifunctor)により

$$
\begin{aligned}
&m^\mathcal B_{Fx,Gx,Gy}(G_{xy}\otimes a_x)
(f\otimes1_I)\delta\\
&=m^\mathcal B_{Fx,Gx,Gy}((G_{xy}f)\otimes a_x)\delta\\
&=G_0(f)\circ_0 a_x.
\end{aligned}
$$

最後は[台となる圏の合成公式](../CATB2-01/index.md#thm-catb2-01-underlying-category)と[台の関手の作用](#thm-catb2-03-underlying-functor)を適用した。$\rho_P^{-1}$ がなければ $G_{xy}\otimes a_x$ の始域は $P\otimes I$ なので $f$ と直接合成できない。
<!-- solution-end -->

### CATB2-03-B03 自然性が関手を比較する条件

- Level: B

B01 の一対象の圏で、Hom集合上の作用を $F(n)=kn$ と $G(n)=\ell n$ と略記する二つの豊穣関手を考える。豊穣自然変換の存在条件と、その全成分の候補を求めよ。$k,\ell$ は非負整数とする。

<!-- solution-start -->
**詳細解答。** 基底は集合で、単位対象からの射は非負整数の指定に等しい。唯一の成分を $c\ge0$ とする。[豊穣自然性](#def-catb2-03-enriched-natural)をHom集合の各元 $n$ に適用すると

$$
c+kn=\ell n+c
$$

が全ての非負整数 $n$ で必要となる。$n=1$ とすると

$$
c+k=\ell+c
\quad\Longrightarrow\quad k=\ell
$$

である。ここでは有限の整数の加法の消去律を使った。

逆に $k=\ell$ なら加法の可換性で任意の $c,n$ について等式が成立する。基底は集合なので、全入力 $n$ における等式は二本のHom集合上の写像そのものの等式を意味し、豊穣自然性も成立する。

したがって $k\ne\ell$ なら変換は存在せず、$k=\ell$ なら全ての非負整数 $c$ が成分の候補となる。

二変換の合成は成分の和であり、恒等変換は成分 $0$ であることも[成分ごとの合成](#prop-catb2-03-vertical)から従う。
<!-- solution-end -->

### CATB2-03-C01 方向付き費用と台の圏

- Level: C

実直線上の費用を $d(x,y)=\max(y-x,0)$ とする。実数 $a,b,c,e$ に対して $F(x)=ax+b$ と $G(x)=cx+e$ とする。費用をHom対象とするLawvere距離の豊穣圏について、次を示せ。

1. $F$ が豊穣関手になるための必要十分条件を求めよ。
2. $F,G$ がともに豊穣関手のとき、豊穣自然変換 $F\Rightarrow G$ が存在する必要十分条件を求めよ。
3. $F(x)=2x$ が台となる圏の通常の関手でありながら豊穣関手にならないことを示せ。

<!-- solution-start -->
**詳細解答。** 費用が[Lawvere型拡張距離](../CATB2-02/index.md#def-catb2-02-lawvere-metric)であることをまず確かめる。対角費用はゼロ。任意の実数 $u,v$ で $\max(u,0)+\max(v,0)$ は $u+v$ 以上かつゼロ以上だから

$$
\max(u+v,0)\le\max(u,0)+\max(v,0).
$$

$u=y-x,v=z-y$ と置くと $u+v=z-x$ だから

$$
d(x,z)=\max(u+v,0)
\le d(x,y)+d(y,z).
$$

従って [Lawvere距離による豊穣化](../CATB2-02/index.md#thm-catb2-02-lawvere-enrichment) を適用できる。

**（1）関手の条件。** [費用の関手判定](#prop-catb2-03-thin-functors)により

$$
\max(a(y-x),0)\le\max(y-x,0)
$$

が全点対で成立することが必要十分である。$y-x=-1$ なら $\max(-a,0)\le0$ なので $a\ge0$。$y-x=1$ なら $\max(a,0)\le1$ なので $a\le1$。逆に $0\le a\le1$ とすると、$y-x\le0$ の場合は両辺ゼロ、$y-x>0$ の場合は左辺 $a(y-x)$ が右辺 $y-x$ 以下である。従って $0\le a\le1$ が必要十分で、$b$ は任意。

**（2）変換の条件。** 同じ判定により $0\le c\le1$ も成立している。[豊穣自然変換の定義](#def-catb2-03-enriched-natural)で各成分の型は $0\to d(Fx,Gx)$ である。[Lawvere距離の基底](../CATB2-02/index.md#def-catb2-02-lawvere-base)ではこれは $0\ge d(Fx,Gx)$ のときだけ存在し、費用は非負なので

$$
d(Fx,Gx)=\max((c-a)x+e-b,0)=0
$$

と同値である。自然性の二経路は存在すれば一意性から一致するので、必要十分条件は全ての実数 $x$ について $(c-a)x+e-b\le0$ である。$c-a>0$ なら $x=(b-e+1)/(c-a)$ で左辺 $1$ となり矛盾する。$c-a<0$ でも同じ代入は実数として可能であり、左辺 $1$ となる。従って $c=a$。このとき不等式は $e-b\le0$ に還元される。逆に $c=a,e\le b$ なら全成分が存在し自然性も成立する。

**（3）台の関手との違い。** [台の圏の構成](../CATB2-01/index.md#thm-catb2-01-underlying-category)と[ゼロ費用の前順序](../CATB2-02/index.md#prop-catb2-02-zero-order)により、$x\to y$ が存在するのは $y\le x$ のときだけである。$y\le x$ なら $2y\le2x$ なので $F$ はこの順序を保存する。射の像は一意に決まり、合成と恒等射は同じ始域・終域の射の一意性により保存される。一方 $d(0,1)=1$ に対して $d(F0,F1)=2$ となり、費用保存の不等式を満たさない。通常の関手から豊穣関手を復元できない具体例である。
<!-- solution-end -->

## 8. 次に向けて

豊穣関手はHom対象に載った構造を保存し、豊穣自然変換はHom対象全体を入力とする自然性を課す。台の圏へ移すと通常の関手と自然変換が得られるが、一般には失われる情報がある。次講ではHom対象を値として返す関手と、その関手への自然変換を使って豊穣Yonedaの補題を構成する。

参考文献：G. M. Kelly, [Basic Concepts of Enriched Category Theory](https://www.tac.mta.ca/tac/reprints/articles/10/tr10abs.html), 第1章。
