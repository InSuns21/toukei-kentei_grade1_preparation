# CAT4-02 Mac Laneの整合性定理

## 1. 五角形と三角形から、なぜすべての経路の一致が出るのか

前講では[モノイダル圏](../CAT4-01/index.md#def-cat4-01-monoidal)を、テンソル双関手、結合子 $\alpha$、左右単位子 $\lambda,\rho$ と五角形・三角形条件によって定義した。四つの対象について五角形を確かめただけで、五個、六個、さらに任意個の対象を並べ替えずに括弧だけ付け直したとき、すべての経路が一致するだろうか。

たとえば $(((A\otimes B)\otimes C)\otimes D)$ から $A\otimes(B\otimes(C\otimes D))$ へは五角形の二経路がある。対象数を増やすと経路は爆発的に増える。毎回すべての経路を計算するのではなく、「**右に括弧を寄せ、単位 $I$ を除く**」という共通の到着点を作り、そこへ至る射が一意であることを証明したい。

本講では、まず有限の記号式を正規化する規則を定め、次に規則が必ず停止すること、さらに途中で異なる規則を選んでも射の値が一致することを示す。最後に、この結論が任意の結合子・単位子の逆を含む経路にも及ぶことを証明する。

圏 $\mathcal C$ には[モノイダル圏](../CAT4-01/index.md#def-cat4-01-monoidal)の構造 $(\otimes,I,\alpha,\lambda,\rho)$ を固定する。射の合成は右から左へ読み、$gf$ は $f$ の後に $g$ を行う。小ささは仮定しない。以下の証明では有限の形式的な式しか使わない。

## 2. 括弧と単位を「式」として管理する

### 2.1 対象が偶然等しくても式を区別する

対象 $A,B,C$ を記号として区別しておき、$((A\otimes I)\otimes B)$ などの式を作る。この段階では $A$ が実際の圏で $I$ と等しい可能性があっても、その「文字 $A$」を勝手に消さない。単位を消す操作は、明示的な記号 $I$ にだけ適用する。

<a id="def-cat4-02-formal-expression"></a>

<!-- formal-statement-start -->
> **定義（形式的テンソル式と語）**  
> 順序付きの文字列 $A_1,\ldots,A_n$（各文字は $\mathcal C$ の対象を表す）から、文字、単位記号 $I$、二項記号 $\otimes$ を有限回用い、すべての二項演算に括弧を付けたものを**形式的テンソル式**という。式 $T$ の**語** $w(T)$ は、明示的な単位記号だけを削り、残る文字を左から右へ読んだ列とする。式の**評価** $\lVert T\rVert$ は、各記号を $\mathcal C$ の実際の対象とモノイダル積として解釈した対象である。
> また、**構造射**は、結合子 $\alpha$、単位子 $\lambda,\rho$ とその逆、恒等射をテンソルおよび合成で有限回組み合わせた射だけを指す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-02-formal-expression -->
**定義の確認**。 $T=((A\otimes I)\otimes(B\otimes I))$ と $U=A\otimes B$ なら $w(T)=w(U)=(A,B)$ だが、$\lVert T\rVert$ と $\lVert U\rVert$ が同一対象であるとは仮定しない。$V=I\otimes I$ の語は空列である。$A,B$ の順序を交換した $B\otimes A$ の語は $(B,A)$ なので、別の語となる。
<!-- definition-example-end -->

構造射は圏の任意の射とは違う。特に $A\otimes B\to B\otimes A$ という交換射を新しく許してはいない。

### 2.2 右向きの書換えと正規形

括弧を右に移すときは[結合子](../CAT4-01/index.md#def-cat4-01-monoidal)そのものを用い、単位を取り除くときは左右単位子を用いる。式の一部分に規則を適用するとき、外側には恒等射をテンソルする。

<a id="def-cat4-02-reduction"></a>

<!-- formal-statement-start -->
> **定義（書換え、正規形、正規化射）**  
> 形式的テンソル式の任意の部分式に、次のいずれかの**右向き書換え**を適用できる。
>
> 1. $((X\otimes Y)\otimes Z)\longrightarrow X\otimes(Y\otimes Z)$：射は $\alpha_{X,Y,Z}$。
> 2. $I\otimes X\longrightarrow X$：射は $\lambda_X$。
> 3. $X\otimes I\longrightarrow X$：射は $\rho_X$。
>
> どの規則も適用できない式を**正規形**という。式 $T$ から正規形へ右向き書換えだけで進む合成射を**正規化射**という。ここでは正規化射の存在と一意性はまだ仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-02-reduction -->
**定義の確認**。 $((A\otimes I)\otimes B)$ には、まず $\rho_A\otimes1_B$ で $A\otimes B$ に進む道と、まず $\alpha_{A,I,B}$ で $A\otimes(I\otimes B)$ に進み、次に $1_A\otimes\lambda_B$ を使う道がある。いずれも語は $(A,B)$ のままで、到着点 $A\otimes B$ には三規則をもう適用できない。二道の射が等しいのは、前講の[三角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)
$$
(1_A\otimes\lambda_B)\alpha_{A,I,B}=\rho_A\otimes1_B
$$
から従う。この小さな衝突の解決を任意の式へ広げる。
<!-- definition-example-end -->

文字列 $(A_1,\ldots,A_n)$ に対し、目指す形を $N(A_1,\ldots,A_n)$ と書く。$n=0$ なら $I$、$n=1$ なら $A_1$、$n\ge2$ なら $A_1\otimes(A_2\otimes(\cdots\otimes A_n))$ と、**右結合**にする。この書き方は形式的であり、元の圏で対象の等号を宣言しているわけではない。

## 3. 書換えが無限に続かないことを証明する

<a id="prop-cat4-02-termination"></a>

<!-- formal-statement-start -->
> **命題（正規化の停止と正規形の対象）**  
> 任意の有限の形式的テンソル式 $T$ からの右向き書換え列は有限回で停止する。到着する正規形は、元の式の語 $w(T)=(A_1,\ldots,A_n)$ によって一意に決まる $N(A_1,\ldots,A_n)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

単位を消す規則では葉の個数が減る。結合子の規則は葉の個数を変えないが、括弧が左へ偏った量を減らす。この二つを辞書式に比較すれば停止が示せる。停止と**射の一意性**は別の問題であることに注意しよう。

<!-- proof-start -->
### 証明

式の葉（文字および単位記号）の個数を $\ell(T)$、左側に残った複合の量を $h(T)$ として、再帰的に
$$
\ell(A)=\ell(I)=1,\qquad h(A)=h(I)=0,
$$
$$
\ell(X\otimes Y)=\ell(X)+\ell(Y),\qquad
h(X\otimes Y)=h(X)+h(Y)+\ell(X)
$$
と置く。組 $(\ell(T),h(T))$ を、まず $\ell$、等しければ $h$ で比較する。

結合子の書換えを行うと、$((X\otimes Y)\otimes Z)$ の $h$ は
$$
h(X)+h(Y)+h(Z)+2\ell(X)+\ell(Y)
$$
であり、$X\otimes(Y\otimes Z)$ では
$$
h(X)+h(Y)+h(Z)+\ell(X)+\ell(Y)
$$
となる。差は $\ell(X)\ge1$ で、葉の数は不変である。単位子の書換えでは、少なくとも明示した $I$ 一個が除かれ、$\ell$ が $1$ 減る。

任意の外側の式の中でこれらを行っても、結合子は部分式の葉数を保存するので同じ $h$ の減少が成立する。単位子は全体の葉数を減らす。従って、非負整数対 $(\ell,h)$ は書換えのたびに辞書式に真に減る。同じ初期対から無限に真に降下することはない。

停止した式に $I$ が他の因子と一緒に残っていれば、どこかで $I\otimes X$ か $X\otimes I$ の規則を使える。したがって、語が空なら式は $I$ 一個であり、語が空でなければ明示的な単位記号はない。さらに、内部の左因子が複合式なら結合子の規則が使える。ゆえに内部の左因子は文字一個であり、括弧はすべて右結合である。これは $N(w(T))$ に一致する。$\square$
<!-- proof-end -->

**具体例。** $((A\otimes B)\otimes(C\otimes D))$ は一回の結合子で $A\otimes(B\otimes(C\otimes D))$ となる。これに対して $(((A\otimes B)\otimes C)\otimes D)$ は二通りの途中経路を持つ。どちらの終点も同じであることは今示したが、**合成射が等しいこと**は次節で証明する。

## 4. 分岐した二つの書換えが合流する理由

### 4.1 五角形と三角形のほかにも必要な等式

前講で仮定した五角形と三角形から、単位に関する次の三つの式も導ける。これらを外から新しい公理として追加しない。

<a id="lem-cat4-02-kelly-units"></a>

<!-- formal-statement-start -->
> **補題（単位子の導出恒等式）**  
> モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ の任意の対象 $A,B$ に対し、次が成り立つ。
$$
\lambda_{A\otimes B}\alpha_{I,A,B}=\lambda_A\otimes1_B,
$$
$$
\rho_{A\otimes B}=(1_A\otimes\rho_B)\alpha_{A,B,I},
$$
$$
\lambda_I=\rho_I:I\otimes I\longrightarrow I.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初の等式は $I\otimes-$ をかけてから四対象の[五角形](../CAT4-01/index.md#def-cat4-01-monoidal)と[三角形](../CAT4-01/index.md#def-cat4-01-monoidal)を使う。$I\otimes-$ は $\lambda$ により恒等関手と自然同型なので、後でこの関手を消しても等式を保てる。第二式はテンソルの左右を逆にした圏で第一式を使う。第三式は自然性と三角形から得る。

<!-- proof-start -->
### 証明

**(1) 左単位の式。** 比較する二射を
$$
p=\lambda_A\otimes1_B,\qquad
q=\lambda_{A\otimes B}\alpha_{I,A,B}
$$
とする。いずれも $((I\otimes A)\otimes B)\to A\otimes B$ の型を持つ。次の同型を準備する。
$$
s=\alpha_{I,I\otimes A,B}(\alpha_{I,I,A}\otimes1_B):
(((I\otimes I)\otimes A)\otimes B)
\longrightarrow I\otimes((I\otimes A)\otimes B).
$$

[結合子の自然性](../CAT4-01/index.md#def-cat4-01-monoidal)を射 $\lambda_A:I\otimes A\to A$ に適用し、続いて三角形条件を $(I,I,A)$ に適用すると、
$$
\begin{aligned}
(1_I\otimes p)s
&=\alpha_{I,A,B}
 ((1_I\otimes\lambda_A)\otimes1_B)
 (\alpha_{I,I,A}\otimes1_B)\\
&=\alpha_{I,A,B}((\rho_I\otimes1_A)\otimes1_B).
\end{aligned}
$$

一方、五角形を四対象 $(I,I,A,B)$ に適用すると
$$
(1_I\otimes\alpha_{I,A,B})s
=\alpha_{I,I,A\otimes B}\alpha_{I\otimes I,A,B}
$$
となる。ここへ $1_I\otimes\lambda_{A\otimes B}$ を続け、三角形を $(I,I,A\otimes B)$ に適用すると
$$
\begin{aligned}
(1_I\otimes q)s
&=(1_I\otimes\lambda_{A\otimes B})
 \alpha_{I,I,A\otimes B}\alpha_{I\otimes I,A,B}\\
&=(\rho_I\otimes1_{A\otimes B})
 \alpha_{I\otimes I,A,B}\\
&=\alpha_{I,A,B}((\rho_I\otimes1_A)\otimes1_B).
\end{aligned}
$$
最後の等号は結合子の自然性を第一変数の射 $\rho_I:I\otimes I\to I$ に適用したものである。よって $(1_I\otimes p)s=(1_I\otimes q)s$。$s$ は同型なので $1_I\otimes p=1_I\otimes q$。さらに、任意の射 $f:X\to Y$ に対する左単位子の自然性は
$$
\lambda_Y(1_I\otimes f)=f\lambda_X
$$
であり、$\lambda_X,\lambda_Y$ は同型だから $I\otimes-$ は忠実である。ゆえに $p=q$。

**(2) 右単位の式。** 同じ圏で新しいテンソル $A\odot B:=B\otimes A$ を考える。結合子と単位子は
$$
\alpha^{\mathrm{rev}}_{A,B,C}=\alpha^{-1}_{C,B,A},\quad
\lambda^{\mathrm{rev}}_A=\rho_A,\quad
\rho^{\mathrm{rev}}_A=\lambda_A
$$
である。始域・終域を代入すると、五角形は元の五角形を逆順にたどった等式に、三角形は元の三角形に帰着するので、これもモノイダル圏である。(1) をこの $\odot$ に適用すれば
$$
\rho_{B\otimes A}\alpha^{-1}_{B,A,I}=1_B\otimes\rho_A.
$$
右から $\alpha_{B,A,I}$ を合成し、$A,B$ の文字を付け替えると第二式を得る。

**(3) 単位上の二つの射。** 左単位子の自然性を $f=\lambda_I:I\otimes I\to I$ に適用すると、
$$
\lambda_I(1_I\otimes\lambda_I)=\lambda_I\lambda_{I\otimes I}.
$$
$\lambda_I$ は同型なので左から消去して
$$
1_I\otimes\lambda_I=\lambda_{I\otimes I}
$$
を得る。(1) を $A=B=I$ に適用し、三角形条件を $(I,I,I)$ に適用すると
$$
\lambda_I\otimes1_I
=\lambda_{I\otimes I}\alpha_{I,I,I}
=(1_I\otimes\lambda_I)\alpha_{I,I,I}
=\rho_I\otimes1_I.
$$
右テンソル関手 $-\otimes I$ は自然同型 $\rho$ により恒等関手と同型で、忠実である。よって $\lambda_I=\rho_I$。$\square$
<!-- proof-end -->

この補題は「単位の左端・右端の消し方は任意」という主張ではない。**同じ始域・終域を持つ、定義された二経路**が一致する、という型付きの等式である。

### 4.2 局所的な分岐は必ず同じ射へ合流する

<a id="prop-cat4-02-local-confluence"></a>

<!-- formal-statement-start -->
> **命題（書換えの局所的合流と射の一致）**  
> 同じ形式的テンソル式 $T$ から異なる一回の右向き書換え $r:T\to T_1$、$s:T\to T_2$ を選んだとする。このとき、ある式 $V$ と右向き書換え列 $u:T_1\to V$、$v:T_2\to V$ があり、$\mathcal C$ の射として $ur=vs$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

規則を適用する位置が離れていれば双関手の交換則で足りる。規則を適用する領域が入れ子なら自然性を使う。真正面から競合する箇所は、結合子二回の五角形、結合子と単位子の三種類の重なり、および $I\otimes I$ の両単位子で尽きる。

<!-- proof-start -->
### 証明

左右の規則の適用位置を式木の節点で比較する。

**(a) 互いに離れた節点。** ある部分式 $X\otimes Y$ の $X$ 側の書換え $f:X\to X'$ と $Y$ 側の書換え $g:Y\to Y'$ なら、二経路は
$$
(f\otimes1_{Y'})(1_X\otimes g)
\quad\text{と}\quad
(1_{X'}\otimes g)(f\otimes1_Y)
$$
で、[テンソルの交換則](../CAT4-01/index.md#prop-cat4-01-interchange)によりともに $f\otimes g$ である。

**(b) ある規則の変数部分 $X,Y,Z$ の内側。** 例えば $f:X\to X'$ の書換えを先にしてから結合子を使う経路と、その逆順の経路は
$$
\alpha_{X',Y,Z}((f\otimes1_Y)\otimes1_Z)
=(f\otimes(1_Y\otimes1_Z))\alpha_{X,Y,Z}
$$
で一致する。[結合子の自然性](../CAT4-01/index.md#def-cat4-01-monoidal)をその三変数のうち第一変数へ適用した。同じ議論を第二・第三変数、また単位子の自然性に適用できる。

**(c) 結合子二回の真の重なり。** $(((A\otimes B)\otimes C)\otimes D)$ で外側を先に動かす経路と、内側を先に動かす経路は、最終的に $A\otimes(B\otimes(C\otimes D))$ で合流し、合成射の一致は
$$
\alpha_{A,B,C\otimes D}\alpha_{A\otimes B,C,D}
=(1_A\otimes\alpha_{B,C,D})\alpha_{A,B\otimes C,D}
(\alpha_{A,B,C}\otimes1_D)
$$
という[五角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)そのものである。

**(d) 結合子と単位子の真の重なり。** 左から右へ、書換え前の式と合流の等式を示す。
$$
\begin{array}{c|c}
((I\otimes A)\otimes B)&
\lambda_{A\otimes B}\alpha_{I,A,B}=\lambda_A\otimes1_B\\
((A\otimes I)\otimes B)&
(1_A\otimes\lambda_B)\alpha_{A,I,B}=\rho_A\otimes1_B\\
((A\otimes B)\otimes I)&
(1_A\otimes\rho_B)\alpha_{A,B,I}=\rho_{A\otimes B}
\end{array}
$$
第一・第三行は[単位子の導出恒等式](#lem-cat4-02-kelly-units)、第二行は[三角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)である。どれも書換え後の二対象は、表示した等式の終域で合流する。

**(e) 単位子どうしの真の重なり。** $I\otimes I$ では $\lambda_I$ を選ぶ道と $\rho_I$ を選ぶ道がある。[単位子の導出恒等式](#lem-cat4-02-kelly-units)から同じ射である。

規則の左辺は、二項木の根で $(X\otimes Y)\otimes Z$、$I\otimes X$、$X\otimes I$ の三種類だけである。任意の二つの節点は離れているか包含関係にあり、包含関係が変数内部なら (b)、根の形が実際に重なる場合は (c)–(e) のいずれかに帰着する。外側にさらにテンソルする場合も双関手性で等式が保たれる。これで全ての分岐が尽くされた。$\square$
<!-- proof-end -->

ここでは合流する**対象**だけでなく、合流までの**射の合成**が等しいことを確認した。後者がなければ Mac Lane の定理の証明にはならない。

## 5. 任意の構造射が一意になる

<a id="thm-cat4-02-coherence"></a>

<!-- formal-statement-start -->
> **定理（Mac Lane の整合性定理）**  
> 任意のモノイダル圏 $\mathcal C$ と、明示的な単位記号 $I$ を含んでもよい二つの有限な形式的テンソル式 $S,T$ を取る。両式から単位記号を除いた文字の順序付き列が等しいとする。$\alpha,\lambda,\rho$ とそれらの逆、恒等射、テンソルおよび合成だけで作った $\lVert S\rVert\to\lVert T\rVert$ の任意の二つの構造射は等しい。さらに、そのような構造射は少なくとも一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

[停止命題](#prop-cat4-02-termination)で全ての書換えが共通の正規形へ到達し、[局所的合流命題](#prop-cat4-02-local-confluence)で第一手の選び方を揃えられる。残る部分は、書換えの量が小さくなることを用いた帰納法で**正規化射自体が一意**だと示す。逆向きの射を含む任意の経路も、正規化射を使った一つの式に戻る。

<!-- proof-start -->
### 証明

**(1) 正規化射の一意性。** [停止命題](#prop-cat4-02-termination)により、式 $T$ から少なくとも一つの正規化列が存在する。辞書式の量 $(\ell(T),h(T))$ について整礎帰納法を行う。

$T$ が正規形なら、非自明な右向き書換えは始められず、正規化射は $1_{\lVert T\rVert}$ のみである。そうでなければ、二つの正規化列の最初の一手を
$$
r:T\to T_1,\qquad s:T\to T_2
$$
とする。同一の一手ならその後だけを比較すればよい。異なるとき、[局所的合流命題](#prop-cat4-02-local-confluence)で
$$
u:T_1\to V,\qquad v:T_2\to V,\qquad ur=vs
$$
となる。どちらも最初の書換えで量が真に減るので、帰納法の仮定により、$T_1$ からの任意の正規化射は $u$ の後に $V$ の正規化射 $\nu_V$ を付けたものと等しい。$T_2$ 側も同じである。従って二つの正規化列全体は
$$
\nu_Vur=\nu_Vvs
$$
に等しい。よって任意の式 $T$ について、正規形 $N(w(T))$ への正規化射 $\nu_T$ は一意に定まる。

**(2) 一回の構造射と正規化の交換。** $r:S\to T$ が右向き書換えの一手なら、$\nu_T r$ は $S$ の正規化射である。その一意性から
$$
\nu_T r=\nu_S.
$$
$r$ は同型だから、逆向きの射 $r^{-1}:T\to S$ についても
$$
\nu_S r^{-1}=\nu_T
$$
が従う。任意の二項演算 $\otimes$ の部分式の中で適用した構造射も、規則の一手として数えている。

**(3) 任意の構造射。** 任意の構造射 $f:S\to T$ は、結合子・単位子（またはその逆）を一度に一か所適用する射の有限合成として表せる。二つの構造射のテンソルを含む場合も、[テンソルの交換則](../CAT4-01/index.md#prop-cat4-01-interchange)によって、それぞれの側へ順に作用する射の合成に分解できる。従って (2) を一手ずつ繰り返すと
$$
\nu_T f=\nu_S,\qquad
f=\nu_T^{-1}\nu_S
$$
となる。ここで $w(S)=w(T)$ により正規形の評価対象は同じで、$\nu_T^{-1}\nu_S$ は型が合う。この表示は $f$ の経路に依存しない。

**(4) 存在。** $S,T$ から同じ正規形へ正規化射 $\nu_S,\nu_T$ があるため、$\nu_T^{-1}\nu_S:\lVert S\rVert\to\lVert T\rVert$ が構造射を与える。これで存在と一意性が示された。$\square$
<!-- proof-end -->

### 5.1 実際に何が一意になったか

次の二つの射はともに
$((A\otimes I)\otimes(B\otimes I))\to A\otimes B$
の型を持つ。
$$
f=\rho_A\otimes\rho_B,
$$
$$
g=(1_A\otimes\rho_B)(1_A\otimes\lambda_{B\otimes I})
\alpha_{A,I,B\otimes I}.
$$
$f$ は左右の単位を同時に消し、$g$ は先に括弧を移してから消す。定理により $f=g$ である。ここでは二つの式の語がどちらも $(A,B)$ であることが必要であり、$B\otimes A$ へ同じ結論を言うことはできない。

<a id="cor-cat4-02-canonical"></a>

<!-- formal-statement-start -->
> **系（正準的な結び直しとその合成）**  
> 同じ語を持つ形式的テンソル式 $S,T,U$ の間には、一意の構造射 $c_{S,T}:\lVert S\rVert\to\lVert T\rVert$ があり、
$$
c_{T,U}c_{S,T}=c_{S,U},\qquad
c_{T,S}=c_{S,T}^{-1},\qquad
c_{S,S}=1_{\lVert S\rVert}
$$
> が成り立つ。
<!-- formal-statement-end -->

**理由。** いずれも両辺が同じ始域・終域の構造射なので、[整合性定理](#thm-cat4-02-coherence)によって一致する。これは対象の「等号」ではなく、射による**正準同型**である。

### 5.2 言えないことを区別する

- **順序交換はできない。** $A\otimes B$ と $B\otimes A$ の比較には追加の組紐が必要であり、これは次講の主題となる。
- **任意の射の一意性ではない。** $A\to A$ に非自明な自己射があっても構わない。定理は結合子・単位子から組み立てた構造射に限る。
- **元の圏が厳密になったわけではない。** [厳密モノイダル圏](../CAT4-01/index.md#def-cat4-01-strict)では $\alpha,\lambda,\rho$ 自身が恒等射だが、通常の $\mathbf{Set}$ の直積ではそうならない。
- **自然性と整合性の両方が必要である。** 局所的合流の (b) で自然性を、(c)–(e) で五角形・三角形とその帰結を使った。いずれかを失えば、分岐の合成射を一致させる証明が止まる。

## 6. 演習：正規化を自力で再現する

### 問題1：語と評価対象

- Level: A
- 問題ID: CAT4-02-WORDS

$T=(I\otimes(A\otimes I))\otimes B$ と $U=B\otimes A$ の語を書け。$T$ の正規形を求め、なぜ $U$ と比較する整合性定理が使えないか述べよ。

<!-- solution-start -->
**詳細解答。** $T$ で単位記号を二つ消すと、文字を左から読む順序は $A,B$ である。従って $w(T)=(A,B)$、正規形は $A\otimes B$。$w(U)=(B,A)$ であり、形式的には文字の順序が逆である。[整合性定理](#thm-cat4-02-coherence)の仮定「同じ語」が満たされない。元の圏で $A$ と $B$ が偶然同じ対象であっても、形式的な語の順番を勝手に変える理由にはならない。
<!-- solution-end -->

### 問題2：停止量の計算

- Level: A
- 問題ID: CAT4-02-HEIGHT

$T=((A\otimes B)\otimes C)$ と $U=A\otimes(B\otimes C)$ について $\ell,h$ を計算し、右向き結合子で辞書式の量が減ることを数値で確認せよ。

<!-- solution-start -->
**詳細解答。** 文字一個の $\ell$ は $1$、$h$ は $0$。$A\otimes B$ の $\ell=2,h=1$ なので、$T$ は
$$
\ell(T)=3,\qquad h(T)=h(A\otimes B)+h(C)+\ell(A\otimes B)=1+0+2=3.
$$
$B\otimes C$ は $\ell=2,h=1$。従って
$$
\ell(U)=3,\qquad h(U)=h(A)+h(B\otimes C)+\ell(A)=0+1+1=2.
$$
組 $(3,3)$ が $(3,2)$ に減るので、停止命題の具体例となる。
<!-- solution-end -->

### 問題3：単位と結合子の二経路

- Level: A
- 問題ID: CAT4-02-TRIANGLE-PATHS

$((A\otimes I)\otimes B)$ を $A\otimes B$ に正規化する二つの経路を書き、その射を比較せよ。

<!-- solution-start -->
**詳細解答。** 第一経路は
$$
((A\otimes I)\otimes B)\xrightarrow{\rho_A\otimes1_B}A\otimes B.
$$
第二経路は
$$
((A\otimes I)\otimes B)\xrightarrow{\alpha_{A,I,B}}
 A\otimes(I\otimes B)\xrightarrow{1_A\otimes\lambda_B}A\otimes B.
$$
二つの合成はそれぞれ $\rho_A\otimes1_B$ と $(1_A\otimes\lambda_B)\alpha_{A,I,B}$ である。前講の[三角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)が両者の等しさを保証する。各射の始域・終域も表示どおり一致している。
<!-- solution-end -->

### 問題4：単位だけの式

- Level: A
- 問題ID: CAT4-02-UNIT-UNIT

$I\otimes I$ から右向き書換えを行う二つの道を書け。どの等式によって合流するか説明せよ。

<!-- solution-start -->
**詳細解答。** 左単位を消す道は $\lambda_I:I\otimes I\to I$、右単位を消す道は $\rho_I:I\otimes I\to I$ である。語は空列で、正規形は $I$。[単位子の導出恒等式](#lem-cat4-02-kelly-units)の第三式 $\lambda_I=\rho_I$ で両道の射は一致する。この一致は五角形・三角形・自然性から導かれたもので、別の公理を追加したわけではない。
<!-- solution-end -->

### 問題5：括弧が増えても語は保存される

- Level: A
- 問題ID: CAT4-02-ALPHA-WORD

$T=((A\otimes(B\otimes C))\otimes D)$ に結合子の右向き規則を一回適用できる場所をすべて挙げ、それぞれの結果と共通の正規形を書け。

<!-- solution-start -->
**詳細解答。** 根では $X=A$, $Y=B\otimes C$, $Z=D$ と見なせるので
$$
T\xrightarrow{\alpha_{A,B\otimes C,D}}
A\otimes((B\otimes C)\otimes D).
$$
続いて内部の結合子 $1_A\otimes\alpha_{B,C,D}$ により $A\otimes(B\otimes(C\otimes D))$ に進む。$A\otimes(B\otimes C)$ の左因子 $A$ は複合式ではなく、内部の $B\otimes C$ も左因子が $B$ 一個なので、開始時の別位置に結合子規則はない。したがって最初に適用できる場所は根のみで、正規形は $A\otimes(B\otimes(C\otimes D))$。どの段階でも語は $(A,B,C,D)$ のままである。
<!-- solution-end -->

### 問題6：四文字の五角形を展開する

- Level: B
- 問題ID: CAT4-02-PENTAGON-NORMAL

$(((A\otimes B)\otimes C)\otimes D)$ を右結合の正規形へ進める、長さ2と長さ3の経路を型付きで示せ。両射が一致する根拠を述べよ。

<!-- solution-start -->
**詳細解答。** 長さ2の経路は
$$
\begin{aligned}
&(((A\otimes B)\otimes C)\otimes D)\\
&\xrightarrow{\alpha_{A\otimes B,C,D}}
 (A\otimes B)\otimes(C\otimes D)\\
&\xrightarrow{\alpha_{A,B,C\otimes D}}
 A\otimes(B\otimes(C\otimes D)).
\end{aligned}
$$
長さ3の経路は
$$
\begin{aligned}
&(((A\otimes B)\otimes C)\otimes D)\\
&\xrightarrow{\alpha_{A,B,C}\otimes1_D}
 (A\otimes(B\otimes C))\otimes D\\
&\xrightarrow{\alpha_{A,B\otimes C,D}}
 A\otimes((B\otimes C)\otimes D)\\
&\xrightarrow{1_A\otimes\alpha_{B,C,D}}
 A\otimes(B\otimes(C\otimes D)).
\end{aligned}
$$
両経路の合成を右から左へ読むと、それぞれ
$$
\alpha_{A,B,C\otimes D}\alpha_{A\otimes B,C,D}
$$
と
$$
(1_A\otimes\alpha_{B,C,D})\alpha_{A,B\otimes C,D}
(\alpha_{A,B,C}\otimes1_D)
$$
である。前講の[五角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)により一致する。
<!-- solution-end -->

### 問題7：左単位をどの順で消すか

- Level: B
- 問題ID: CAT4-02-LEFT-UNIT-PEAK

$((I\otimes A)\otimes B)$ から正規形へ進む二経路の射を書け。$A,B$ が集合のときに元で等式を確認し、一般の圏で必要な補題を述べよ。

<!-- solution-start -->
**詳細解答。** 第一経路は $\lambda_A\otimes1_B:((I\otimes A)\otimes B)\to A\otimes B$。第二経路は
$$
((I\otimes A)\otimes B)\xrightarrow{\alpha_{I,A,B}}
 I\otimes(A\otimes B)\xrightarrow{\lambda_{A\otimes B}}A\otimes B,
$$
つまり $\lambda_{A\otimes B}\alpha_{I,A,B}$ である。$\mathbf{Set}$ の $I=\{*\}$ と直積では、元 $((*,a),b)$ を第一経路は $(a,b)$ に、第二経路も $(*,(a,b))$ を経由して $(a,b)$ に送る。一般の圏では元を使えないため、[単位子の導出恒等式](#lem-cat4-02-kelly-units)の第一式を用いる。その証明では $I\otimes-$ の忠実性、五角形、三角形、自然性を使った。
<!-- solution-end -->

### 問題8：任意の経路を正規化射で表す

- Level: B
- 問題ID: CAT4-02-CANONICAL-COMPOSE

同じ語を持つ $S,T,U$ の構造射 $f:S\to T$、$g:T\to U$ を取る。正規化射 $\nu_S,\nu_T,\nu_U$ を使って $gf$ を表示し、$S$ から $U$ への他の経路に依存しないことを証明せよ。

<!-- solution-start -->
**詳細解答。** [Mac Laneの整合性定理](#thm-cat4-02-coherence)の証明で得た関係から
$$
f=\nu_T^{-1}\nu_S,\qquad g=\nu_U^{-1}\nu_T.
$$
従って、正規形の同じ評価対象で $\nu_T\nu_T^{-1}=1$ を使って
$$
gf=(\nu_U^{-1}\nu_T)(\nu_T^{-1}\nu_S)
=\nu_U^{-1}(\nu_T\nu_T^{-1})\nu_S
=\nu_U^{-1}\nu_S.
$$
右辺は始域 $S$ と終域 $U$ だけから決まる。$T$ の選び方も途中経路も消える。元の圏の任意の射ではなく構造射に限定している点が重要である。
<!-- solution-end -->

### 問題9：単位条件を失うと何が壊れるか

- Level: B
- 問題ID: CAT4-02-FAILED-TRIANGLE

一対象圏で自己射を $\mathbb Z/2\mathbb Z$ の加法とし、テンソルも加法、結合子 $\alpha=1$、単位子 $\lambda=\rho=0$ とする。$((I\otimes I)\otimes I)$ から $I\otimes I$ に向かう二つの射 $(1_I\otimes\lambda_I)\alpha_{I,I,I}$ と $\rho_I\otimes1_I$ を計算し、何が整合しないか説明せよ。

<!-- solution-start -->
**詳細解答。** 唯一の対象を $I$ と書く。この圏で射の合成とテンソルは共に加法で、恒等射は $0$。したがって
$$
(1_I\otimes\lambda_I)\alpha_{I,I,I}
=(0+0)+1=1,\qquad
\rho_I\otimes1_I=0+0=0.
$$
両射は $I$ から $I$ への射だが異なる。この選択では[三角形条件](../CAT4-01/index.md#def-cat4-01-monoidal)が成立しない。そのため[局所的合流命題](#prop-cat4-02-local-confluence)の結合子と単位子の重なりを解決できず、正規化射の一意性の証明が破綻する。$\alpha=1$ は可逆で自然だが、その二条件だけでは十分ではない。
<!-- solution-end -->

### 問題10：単位を含む四文字の正準射

- Level: C
- 問題ID: CAT4-02-FULL-NORMALIZATION

$S=(((A\otimes I)\otimes B)\otimes(C\otimes I))$ の語と正規形を求め、次の二経路が同じ正準射になることを、使う等式を指定して説明せよ。

1. まず $\rho_A$ と $\rho_C$ で二つの単位を消し、その後に結合子を使う。
2. まず外側の結合子を使い、途中の $I$ を $\lambda$ または $\rho$ で消して右結合にする。

さらに、式の右端の文字 $C$ を $B$ の左側へ移す操作が許されない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 単位記号を削ると $w(S)=(A,B,C)$ であり、正規形は $N=A\otimes(B\otimes C)$。

第一経路は、部分式 $((A\otimes I)\otimes B)$ に $\rho_A\otimes1_B$、右側 $C\otimes I$ に $\rho_C$ を用いて
$$
S\xrightarrow{(\rho_A\otimes1_B)\otimes\rho_C}
 (A\otimes B)\otimes C
\xrightarrow{\alpha_{A,B,C}}N
$$
となる。合成射は
$$
f=\alpha_{A,B,C}((\rho_A\otimes1_B)\otimes\rho_C).
$$

第二経路では、最初に
$$
S\xrightarrow{\alpha_{A\otimes I,B,C\otimes I}}
 (A\otimes I)\otimes(B\otimes(C\otimes I))
$$
とする。次に $\rho_A\otimes1_{B\otimes(C\otimes I)}$ を用い、
$$
A\otimes(B\otimes(C\otimes I))
\xrightarrow{1_A\otimes(1_B\otimes\rho_C)}
 A\otimes(B\otimes C)=N
$$
へ進む。合成射は
$$
g=(1_A\otimes(1_B\otimes\rho_C))
(\rho_A\otimes1_{B\otimes(C\otimes I)})
\alpha_{A\otimes I,B,C\otimes I}.
$$
これは、設問の第二経路で単位を $\rho$ だけで取り除く具体的な選択である。$\lambda$ を使う別の選択が必要なら、いったん結合子で $I$ を左因子にしてから $\lambda$ を適用してもよい。いずれの選択でも[局所的合流命題](#prop-cat4-02-local-confluence)によって正規化射は一意であり、[整合性定理](#thm-cat4-02-coherence)の表示
$$
f=\nu_N^{-1}\nu_S=\nu_S=g
$$
が従う。ここでは $N$ が正規形なので $\nu_N=1_N$。二経路は同じ語を持つ式の間で、結合子・単位子から作った射であることを仮定と照合した。

一方、$B$ と $C$ の順序を入れ替えると語は $(A,C,B)$ になり、もとの語とは異なる。$\alpha,\lambda,\rho$ は文字の順序を変えないので、その操作を整合性定理から作ることはできない。
<!-- solution-end -->

## 7. この先の読み方

書換えの停止は「必ず正規形まで行ける」ことを、局所的合流と帰納法は「どの順序で進んでも**同じ射**になる」ことを示した。Mac Lane の定理のおかげで、括弧と単位を省略した記法を使っても、その背後の正準同型が矛盾しないことが保証される。

ただし、テンソルの因子を左右に交換する話は別である。次講では、括弧の整合性に加えて交換を可能にする**組紐**と、さらに二回交換すると恒等射に戻る**対称性**を導入する。

参考：Saunders Mac Lane, *Categories for the Working Mathematician*, 第2版、第VII章；[Etingofほか『Tensor Categories』講義ノート](https://ocw.mit.edu/courses/18-769-topics-in-lie-theory-tensor-categories-spring-2009/pages/lecture-notes/)。
