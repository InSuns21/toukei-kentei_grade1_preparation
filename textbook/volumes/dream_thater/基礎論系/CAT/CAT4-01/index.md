# CAT4-01 モノイダル圏

## 1. 二つの対象を「掛ける」だけで十分か

[圏の積](../CAT1-05/index.md#def-cat1-05-product)では二つの圏を並べ、[圏論の二項積](../CAT2-02/index.md#def-cat2-02-binary-product)では一つの圏の二対象を普遍性で組み合わせた。一方、関手どうしの合成のように、二つの対象から一つの対象を作る演算は他にもある。これらは必ずしも圏論的な積ではない。

たとえば集合の直積では、$((a,b),c)$ と $(a,(b,c))$ は**同じ要素ではない**。両者を自然に移し替える写像はある。一方、三つ以上を掛けるとき、その移し替えを何度も行うことになる。異なる移し替えの順序が食い違えば、式の括弧を省くことも、計算を安心して結び直すこともできない。

本講では、次の順に答える。

1. 二変数の演算が射の合成と両立する条件を決める。
2. 括弧の移し替えと単位を、自然同型として指定する。
3. 四対象と単位を含む二経路が一致する条件を検算する。
4. 集合の直積、一般の有限積、関手の合成で実際に確かめる。

合成は右から左へ行い、$gf$ は $f$ の後に $g$ を行うものとする。圏 $\mathcal C$ は通常の圏であり、小さいと仮定しない。必要な場合にのみサイズの条件を明記する。

## 2. 二変数で射を運ぶテンソル双関手

### 2.1 対象の演算から射の演算へ

二対象 $A,B$ の組を一対象 $A\otimes B$ に送るだけでは、射 $f:A\to A'$ と $g:B\to B'$ の組をどう運ぶかが決まらない。さらに二つの組を続けて作用させるとき、先に各成分を合成した場合と同じになってほしい。

この条件を、既習の[共変関手](../CAT1-06/index.md#def-cat1-06-functor)を[積圏](../CAT1-05/index.md#def-cat1-05-product)に適用して定義する。

<a id="def-cat4-01-tensor-bifunctor"></a>

<!-- formal-statement-start -->
> **定義（テンソル双関手）**  
> 圏 $\mathcal C$ 上の**テンソル双関手**とは、次の共変関手をいう。

$$
\otimes:\mathcal C\times\mathcal C\to\mathcal C.
$$

> 対象 $(A,B)$ の像を $A\otimes B$、射 $(f,g)$ の像を $f\otimes g$ と書く。任意の合成可能な $f:A\to A'$, $f':A'\to A''$, $g:B\to B'$, $g':B'\to B''$ に対して、次を満たす。

$$
1_A\otimes1_B=1_{A\otimes B},
\qquad
(f'f)\otimes(g'g)=(f'\otimes g')(f\otimes g).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-01-tensor-bifunctor -->
**定義の確認**（集合の直積）。 $\mathbf{Set}$ で $A\otimes B=A\times B$ とし、$(f\times g)(a,b)=(f(a),g(b))$ とする。これは $A\times B\to A'\times B'$ なので始域と終域が合っている。恒等射について
$$
(1_A\times1_B)(a,b)=(a,b)=1_{A\times B}(a,b).
$$
合成についても、任意の $(a,b)$ で
$$
\begin{aligned}
((f'f)\times(g'g))(a,b)
&=(f'(f(a)),g'(g(b))),\\
((f'\times g')(f\times g))(a,b)
&=(f'\times g')(f(a),g(b))\\
&=(f'(f(a)),g'(g(b))).
\end{aligned}
$$
各元で一致するので、二つの写像が等しい。したがって直積はテンソル双関手である。
<!-- definition-example-end -->

二変数の関手律を、異なる変数の射の作用が交換できる形にも書ける。

<a id="prop-cat4-01-interchange"></a>

<!-- formal-statement-start -->
> **命題（テンソルの交換則）**  
> 任意のテンソル双関手 $\otimes$ と射 $f:A\to A'$、$g:B\to B'$ に対し
$$
(f\otimes1_{B'})(1_A\otimes g)
=(1_{A'}\otimes g)(f\otimes1_B)
=f\otimes g
$$
> が成り立つ。両辺は $A\otimes B\to A'\otimes B'$ の射である。
<!-- formal-statement-end -->

### 証明の見取り図

積圏で $(f,g)$ を、片方の成分だけが動く二通りの合成へ分解する。

<!-- proof-start -->
### 証明

[積圏](../CAT1-05/index.md#def-cat1-05-product)での射の合成により
$$
(f,g)=(f,1_{B'})(1_A,g)=(1_{A'},g)(f,1_B).
$$
これに双関手を作用させ、[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)を用いると
$$
\otimes(f,g)=\otimes(f,1_{B'})\otimes(1_A,g)
=\otimes(1_{A'},g)\otimes(f,1_B).
$$
記号を $f\otimes g$ に戻せば主張を得る。$\square$
<!-- proof-end -->

ここでいう交換則は $A\otimes B$ と $B\otimes A$ が等しい、という意味ではない。**二変数それぞれの射を作用させる順序**の話である。対象の左右交換（組紐）は次講以降で別の構造として扱う。

## 3. 結合子・単位子と整合条件

### 3.1 「等しい」ではなく「自然に同型」

二対象を三つに増やしたとき
$$
(A\otimes B)\otimes C
\quad\text{と}\quad
A\otimes(B\otimes C)
$$
は必ずしも等しい対象ではない。[自然同型](../CAT1-07/index.md#def-cat1-07-natural-isomorphism)なら、対象ごとに同型射を選ぶだけでなく、三つの射 $f,g,h$ と両立することを要求できる。その同型の族を**結合子** $\alpha_{A,B,C}$ と書く。

さらに演算の単位となる対象を $I$ とし、$I\otimes A$ と $A\otimes I$ を $A$ に移す同型をそれぞれ**左単位子** $\lambda_A$ と**右単位子** $\rho_A$ と書く。「単位」といっても等号 $I\otimes A=A$ を要求するわけではない。

三対象について一つの結合子を選ぶだけでは、四対象に対する二通りの移し替えが同じになる保証がない。そこで、四対象を組み替える二つの経路の一致を追加で要求する。また、括弧の中の単位対象 $I$ を異なる順番で取り除く二つの経路も一致させる。これらの等式を備える構造を次に定義する。

<a id="def-cat4-01-monoidal"></a>

<!-- formal-statement-start -->
> **定義（モノイダル圏）**  
> **モノイダル圏**は次のデータと条件を持つ圏 $\mathcal C$ である。
>
> 1. テンソル双関手 $\otimes:\mathcal C\times\mathcal C\to\mathcal C$。
> 2. 単位対象 $I\in\mathcal C$。
> 3. 三変数で自然な同型射（結合子）$\alpha_{A,B,C}:(A\otimes B)\otimes C\to A\otimes(B\otimes C)$。
> 4. 一変数で自然な同型射（左単位子・右単位子）$\lambda_A:I\otimes A\to A$、$\rho_A:A\otimes I\to A$。
>
> 任意の $A,B,C,D\in\mathcal C$ について次の**五角形条件**が成り立つ。

$$
\begin{aligned}
&\alpha_{A,B,C\otimes D}\,\alpha_{A\otimes B,C,D}\\
&\quad=(1_A\otimes\alpha_{B,C,D})\,
\alpha_{A,B\otimes C,D}\,
(\alpha_{A,B,C}\otimes1_D).
\end{aligned}
$$

> さらに任意の $A,B\in\mathcal C$ について次の**三角形条件**が成り立つ。

$$
(1_A\otimes\lambda_B)\,\alpha_{A,I,B}
=\rho_A\otimes1_B.
$$
<!-- formal-statement-end -->

上の式の型を確認しよう。五角形の両辺は
$$
(((A\otimes B)\otimes C)\otimes D)
\longrightarrow A\otimes(B\otimes(C\otimes D))
$$
という射である。左辺は二つの結合子、右辺は三つの結合子（必要な場所に恒等射をテンソルしたものを含む）を合成する。三角形の両辺は $((A\otimes I)\otimes B)\to A\otimes B$ である。これらの条件は単なる図の見た目でなく、**同じ始域・終域を持つ射の等式**である。

自然性の条件も成分で明記する。任意の $f:A\to A'$、$g:B\to B'$、$h:C\to C'$ に対して
$$
\alpha_{A',B',C'}((f\otimes g)\otimes h)
=(f\otimes(g\otimes h))\alpha_{A,B,C}.
$$
左単位子・右単位子については
$$
f\lambda_A=\lambda_{A'}(1_I\otimes f),
\qquad
f\rho_A=\rho_{A'}(f\otimes1_I).
$$
いずれも[自然変換の自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を、対象と射の組へ書き下したものである。

### 3.2 直接例：集合の直積

一元集合 $I=\{*\}$ を取る。集合の直積による双関手は既に確認した。成分を次の写像で与える。
$$
\begin{aligned}
\alpha_{A,B,C}((a,b),c)&=(a,(b,c)),\\
\lambda_A(*,a)&=a,\qquad
\rho_A(a,*)&=a.
\end{aligned}
$$
各写像の逆は $(a,(b,c))\mapsto((a,b),c)$、$a\mapsto(*,a)$、$a\mapsto(a,*)$ である。従ってどれも同型である。自然性は $f:A\to A'$、$g:B\to B'$、$h:C\to C'$ を取って、結合子の両経路の像を
$$
(f(a),(g(b),h(c)))
$$
と計算することで確認できる。単位子についても、左右の経路がそれぞれ $f(a)$ になる。

<!-- definition-example-start: def-cat4-01-monoidal -->
**定義の確認**（五角形と三角形を最後まで）。 四対象の元を $((((a,b),c),d))$ と書く。五角形の左辺は
$$
((((a,b),c),d))
\xrightarrow{\alpha_{A\times B,C,D}}((a,b),(c,d))
\xrightarrow{\alpha_{A,B,C\times D}}(a,(b,(c,d))).
$$
右辺は
$$
\begin{aligned}
((((a,b),c),d))
&\xrightarrow{\alpha_{A,B,C}\times1_D}((a,(b,c)),d)\\
&\xrightarrow{\alpha_{A,B\times C,D}}(a,((b,c),d))\\
&\xrightarrow{1_A\times\alpha_{B,C,D}}(a,(b,(c,d))).
\end{aligned}
$$
双方が各元を同じ像に送る。三角形では $(((a,*),b))$ を出発点とすると、
$$
\begin{aligned}
(((a,*),b))
&\xrightarrow{\alpha_{A,I,B}}(a,(*,b))
\xrightarrow{1_A\times\lambda_B}(a,b),\\
(((a,*),b))
&\xrightarrow{\rho_A\times1_B}(a,b).
\end{aligned}
$$
これも一致する。双関手、同型、自然性、二つの整合条件が全て確認できたので、$(\mathbf{Set},\times,I,\alpha,\lambda,\rho)$ はモノイダル圏である。
<!-- definition-example-end -->

**非例（単位対象の不一致）。** 双関手を同じ直積にしても、$I=\varnothing$ と選んではいけない。$A=\{a\}$ なら $I\times A=\varnothing$ であり、一元集合 $A$ への同型は存在しない。必要な単位子が作れず、五角形を検査する以前に定義を満たさない。

## 4. 有限積がある圏はモノイダル圏になる

集合の元での証明が特殊だったわけではない。[二項積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)を使うと、元を持たない一般の圏でも同じ構造を構成できる。

対象 $A,B$ ごとに積 $A\times B$ と射影 $p_A:A\times B\to A$、$p_B:A\times B\to B$ を一組ずつ選び、終対象 $I$ も一つ選ぶ。$f:A\to A'$ と $g:B\to B'$ に対して、射影で特徴付けられる唯一の射 $f\times g$ を
$$
p_{A'}(f\times g)=fp_A,\qquad
p_{B'}(f\times g)=gp_B
$$
で定める。これが双関手であること、そして普遍性から結合子と単位子を得ることを示す。

<a id="thm-cat4-01-cartesian-monoidal"></a>

<!-- formal-statement-start -->
> **定理（有限積からのモノイダル構造）**  
> 圏 $\mathcal C$ が終対象と全ての二項積を持つとする。各二項積および終対象を選ぶと、$\otimes=\times$、単位対象 $I$ によりモノイダル圏の構造を与えられる。結合子と単位子は、積への射影と終対象への一意な射を保存する条件によって一意に定まり、五角形・三角形条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

有限積へ向かう二つの射は、**全ての射影と合成して一致すれば等しい**。[積の組の一意性](../CAT2-02/index.md#prop-cat2-02-pairing-laws)を各段階で使えば、四対象の五角形を大きな図を描かずに検査できる。

<!-- proof-start -->
### 証明

**(1) 双関手。** 恒等射 $1_A\times1_B$ は射影との合成がそれぞれ $p_A,p_B$ になる。$1_{A\times B}$ も同じ条件を満たすので、積の一意性から両者は等しい。合成可能な $f,f',g,g'$ に対して
$$
\begin{aligned}
p_{A''}(f'\times g')(f\times g)
&=f'p_{A'}(f\times g)=f'fp_A,\\
p_{B''}(f'\times g')(f\times g)
&=g'p_{B'}(f\times g)=g'gp_B.
\end{aligned}
$$
これらは $(f'f)\times(g'g)$ の射影条件と同じである。ゆえに合成保存も従う。

**(2) 結合子と逆射。** $((A\times B)\times C)$ から $A,B,C$ への三つの射を順に
$$
q_A=p_Ap_{A\times B},\qquad
q_B=p_Bp_{A\times B},\qquad q_C=p_C
$$
と置く。右側の積 $A\times(B\times C)$ への唯一の射
$$
\alpha_{A,B,C}=\langle q_A,\langle q_B,q_C\rangle\rangle
$$
を作る。ここで $\langle u,v\rangle$ は[積への一意な組の射](../CAT2-02/index.md#def-cat2-02-binary-product)であり、いずれの射も出発点は $((A\times B)\times C)$ である。反対向きの射を
$$
\beta_{A,B,C}=\langle\langle p_A,p_Bp_{B\times C}\rangle,p_Cp_{B\times C}\rangle
$$
とする（この式の $p_A,p_B,p_C$ はそれぞれ当該積の射影を示す）。$\beta\alpha$ と恒等射を $A,B,C$ への三射影に続けると、両方とも $q_A,q_B,q_C$ になる。三射影への合成で射が一意なので $\beta\alpha=1$。逆順でも右側の三射影を使えば $\alpha\beta=1$。よって $\alpha$ は同型である。

**(3) 単位子と逆射。** 終対象 $I$ への一意な射を $!_A:A\to I$ とする。左単位子を第二射影 $\lambda_A=p_A:I\times A\to A$、右単位子を第一射影 $\rho_A=p_A:A\times I\to A$ とする。逆射の候補は
$$
\lambda_A^{-1}=\langle !_A,1_A\rangle,\qquad
\rho_A^{-1}=\langle1_A,!_A\rangle.
$$
$\lambda_A\lambda_A^{-1}=1_A$、$\rho_A\rho_A^{-1}=1_A$ は射影の定義から分かる。逆順では各積の二射影と合成すると、それぞれ $!_{I\times A},p_A$ および $p_A,!_{A\times I}$ になる。終対象への射は一意なので、積の一意性から $\lambda_A^{-1}\lambda_A=1$、$\rho_A^{-1}\rho_A=1$。

**(4) 自然性。** 任意の $f,g,h$ に対し、$\alpha_{A',B',C'}((f\times g)\times h)$ と $(f\times(g\times h))\alpha_{A,B,C}$ は、三つの最終射影との合成がそれぞれ
$$
fq_A,\qquad gq_B,\qquad hq_C
$$
になる。例えば第一射影への合成は左経路で $p_{A'}p_{A'\times B'}((f\times g)\times h)=fp_Ap_{A\times B}=fq_A$、右経路でも同じである。第二・第三成分には上の双関手の射影等式を適用する。よって両経路は一意性により等しい。$\lambda,\rho$ の自然性も、第二射影と第一射影の等式 $p_{A'}(1_I\times f)=fp_A$ と $p_{A'}(f\times1_I)=fp_A$ から従う。

**(5) 五角形。** 出発点を $Q=(((A\times B)\times C)\times D)$ とする。$Q$ から $A,B,C,D$ への四つの反復射影を $r_A,r_B,r_C,r_D$ と書く。五角形の二経路はどちらも $A\times(B\times(C\times D))$ へ向かい、構成した $\alpha$ の射影条件を逐次使えば、最終の四つの射影との合成は双方とも
$$
r_A,\quad r_B,\quad r_C,\quad r_D
$$
になる。これは単なる記号の一致ではない。例えば左経路では最初の結合子が $((A\times B)\times(C\times D))$ への二組の射影を $(r_A,r_B)$ と $(r_C,r_D)$ にまとめ、次の結合子が $r_A$ と $(r_B,(r_C,r_D))$ に分ける。右経路では最初に $(r_A,(r_B,r_C))$ と $r_D$、次に $r_A$ と $((r_B,r_C),r_D)$、最後に $r_A$ と $(r_B,(r_C,r_D))$ となる。各段で積の射影条件を満たすので、両経路は等しい。

**(6) 三角形。** $T=((A\times I)\times B)$ とする。$\alpha_{A,I,B}$ の後に $1_A\times\lambda_B$ を作用させた射を $A$ と $B$ の射影に続けると、結果は $T\xrightarrow{p_{A\times I}}A\times I\xrightarrow{p_A}A$ と $T\xrightarrow{p_B}B$ になる。一方、$\rho_A\times1_B$ についても同じ二射になる。$A\times B$ の普遍性で二射は等しい。これで全ての公理を満たした。$\square$
<!-- proof-end -->

この証明では、集合の元を一度も仮定していない。さらに **有限積は存在するが選んだ積が文字どおり結合的とは限らない** ことも分かる。結合子・単位子と二つの条件こそが、選択に依存しない計算を可能にする。

## 5. 括弧が文字どおり消える場合と、消えない場合

結合子・単位子が全て恒等射なら、積に似た演算の記法を実際に括弧抜きで計算できる。この特別な状況を区別する。

<a id="def-cat4-01-strict"></a>

<!-- formal-statement-start -->
> **定義（厳密モノイダル圏）**  
> モノイダル圏 $(\mathcal C,\otimes,I,\alpha,\lambda,\rho)$ が**厳密モノイダル圏**であるとは、全ての対象について $\alpha_{A,B,C}$、$\lambda_A$、$\rho_A$ が恒等射であることをいう。このとき対象と射の双方で結合と単位の等号が成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat4-01-strict -->
**定義の確認**（離散圏上の加法）。 自然数 $0,1,2,\ldots$ を対象とし、恒等射以外を持たない離散圏 $\mathcal N$ を取る。$m\otimes n=m+n$、$I=0$ とし、恒等射の組を恒等射に送る。射は恒等射しかないため、双関手の恒等射・合成保存は成立する。対象の等式
$$
(m+n)+p=m+(n+p),\quad 0+n=n,\quad n+0=n
$$
により結合子と単位子を恒等射として選べる。自然性は恒等射の場合だけで、五角形・三角形も恒等射の合成の等式となる。よって厳密モノイダル圏である。
<!-- definition-example-end -->

重要なのは、**どのモノイダル圏も最初から厳密であるわけではない**ことだ。例えば $\mathbf{Set}$ の直積では $((a,b),c)$ と $(a,(b,c))$ は異なる構造の組であり、結合子は単なる恒等写像ではない。次講で学ぶ Mac Lane の整合性定理は、任意のモノイダル圏を文字どおり厳密だと宣言する定理ではない。

### 5.1 関手の合成という第二の例

小さい圏 $\mathcal A$ を固定する。[関手圏](../CAT1-08/index.md#def-cat1-08-functor-category) $[\mathcal A,\mathcal A]$ の対象は自己関手、射は自然変換である。自己関手 $F,G$ のテンソルを合成 $F\otimes G=F\circ G$ とし、単位を恒等関手 $1_{\mathcal A}$ とする。

自然変換 $\eta:F\Rightarrow F'$ と $\theta:G\Rightarrow G'$ に対する射 $\eta\otimes\theta$ の成分は
$$
(\eta\otimes\theta)_X
=\eta_{G'X}F(\theta_X)
=F'(\theta_X)\eta_{GX}
$$
である。等号は $\eta$ の[自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)を $\theta_X:GX\to G'X$ に適用したものである。この作用は既習の[水平合成](../CAT1-08/index.md#def-cat1-08-horizontal)であり、[水平・垂直合成の交換法則](../CAT1-08/index.md#prop-cat1-08-interchange)が双関手の合成保存を与える。

<a id="prop-cat4-01-endofunctor-strict"></a>

<!-- formal-statement-start -->
> **命題（自己関手の合成は厳密モノイダル構造を与える）**  
> 小さい圏 $\mathcal A$ に対し、関手圏 $[\mathcal A,\mathcal A]$ は、自己関手の合成をテンソル、恒等関手を単位対象とする厳密モノイダル圏である。
<!-- formal-statement-end -->

### 証明の見取り図

対象では関手の合成は文字どおり結合的である。射では水平合成の成分を追うと、同じ合成射に至る。

<!-- proof-start -->
### 証明

自己関手の合成は対象・射の両方において
$$
(FG)H=F(GH),\qquad (1_{\mathcal A})F=F=F(1_{\mathcal A})
$$
が厳密な等号として成立する。自然変換 $\eta:F\Rightarrow F'$、$\theta:G\Rightarrow G'$、$\kappa:H\Rightarrow H'$ を取る。水平合成の成分は
$$
((\eta\otimes\theta)\otimes\kappa)_X
=(\eta\otimes\theta)_{H'X}\,(FG)(\kappa_X)
$$
であり、右辺を展開すると
$$
\eta_{G'H'X}\,F(\theta_{H'X})\,FG(\kappa_X).
$$
一方
$$
(\eta\otimes(\theta\otimes\kappa))_X
=\eta_{G'H'X}\,F((\theta\otimes\kappa)_X)
$$
で、$F$ の合成保存により同じ式になる。恒等自然変換と水平合成についても、各 $X$ で
$$
(1_{1_{\mathcal A}}\otimes\eta)_X
=(1_{\mathcal A}\eta)_X=\eta_X,\qquad
(\eta\otimes1_{1_{\mathcal A}})_X=\eta_X
$$
が成り立つ。従って結合子と単位子は全て恒等自然変換でよい。五角形・三角形はその合成の等式として成立する。$\square$
<!-- proof-end -->

**注意。** この例に左右を交換する自然同型 $FG\simeq GF$ は一般にはない。したがってモノイダル圏の定義から交換可能性を推測してはいけない。

## 6. 整合条件は省略できない

テンソル双関手と可逆な結合子・単位子を個別に与えても、五角形・三角形は自動ではない。有限の例で反証する。

一つの対象 $*$ を持ち、その自己射を二元集合 $\mathbb Z/2\mathbb Z=\{0,1\}$ とする圏 $\mathcal B$ を考える。射の合成は加法（$1+1=0$）、恒等射は $0$ である。結合律・単位律はこの加法から従う。$\otimes$ を対象では $*\otimes*=*$、射では $u\otimes v=u+v$ と定める。合成保存は、加法の可換性により
$$
(u'+u)\otimes(v'+v)
=u'+u+v'+v
=(u'+v')+(u+v)
$$
となる。恒等射の保存も $0+0=0$ で成立する。

結合子の唯一の成分を $\alpha_{*,*,*}=1$、両単位子を $\lambda_*=\rho_*=0$ とする。各成分は可逆であり、自然性も加法が可換だから成立する。ところが三角形の左辺は $0+1=1$、右辺は $0+0=0$ で等しくない。五角形でも左辺は $1+1=0$、右辺は $1+1+1=1$ で異なる。

**何が壊れたか。** 自然同型だけでは、括弧や単位を取り除く二つの順路が一致しない。だから整合条件は独立に検査する必要がある。この例は、可逆性・自然性に違反しないまま整合条件に失敗する反例である。

## 7. 演習：射・括弧・単位のすべてを照合する

### 問題1：集合の直積の双関手

- Level: A
- 問題ID: CAT4-01-PRODUCT-FUNCTOR

集合 $A=\{0,1\}$、$B=\{x\}$、$A'=\{p,q\}$、$B'=\{u,v\}$ とし、$f(0)=p,f(1)=q$、$g(x)=v$ とする。$f\times g$ の始域・終域・全ての値を記し、さらに $1_{A'}\times1_{B'}$ と合成しても変わらないことを示せ。

<!-- solution-start -->
**詳細解答。** 始域は $A\times B=\{(0,x),(1,x)\}$、終域は $A'\times B'=\{(p,u),(p,v),(q,u),(q,v)\}$ である。[テンソル双関手](#def-cat4-01-tensor-bifunctor)の射の作用により
$$
(f\times g)(0,x)=(p,v),\qquad(f\times g)(1,x)=(q,v).
$$
任意の $(a,x)\in A\times B$ に対し
$$
((1_{A'}\times1_{B'})(f\times g))(a,x)
=(1_{A'}\times1_{B'})(f(a),v)=(f(a),v).
$$
これは $f\times g$ と同じ値を全元に返すので等しい。始域・終域が合うため合成も定義できる。
<!-- solution-end -->

### 問題2：五角形の型

- Level: A
- 問題ID: CAT4-01-PENTAGON-TYPES

モノイダル圏の四対象 $A,B,C,D$ に対し、五角形条件の左辺を構成する二つの結合子の始域・終域を書け。右辺の三つの結合子の始域・終域も順に書け。

<!-- solution-start -->
**詳細解答。** 左経路の第一射は
$$
\alpha_{A\otimes B,C,D}:
(((A\otimes B)\otimes C)\otimes D)\to
((A\otimes B)\otimes(C\otimes D)).
$$
第二射は
$$
\alpha_{A,B,C\otimes D}:
((A\otimes B)\otimes(C\otimes D))
\to A\otimes(B\otimes(C\otimes D)).
$$
右経路の第一射 $\alpha_{A,B,C}\otimes1_D$ の終域は $(A\otimes(B\otimes C))\otimes D$、第二射 $\alpha_{A,B\otimes C,D}$ の終域は $A\otimes((B\otimes C)\otimes D)$、第三射 $1_A\otimes\alpha_{B,C,D}$ の終域は $A\otimes(B\otimes(C\otimes D))$ である。第一射の始域は左経路と同じで、各中間域が次の射の始域になるため両方の合成が定義できる。
<!-- solution-end -->

### 問題3：三角形の具体計算

- Level: A
- 問題ID: CAT4-01-TRIANGLE-SET

集合 $A=\{a_1,a_2\}$、$B=\{b\}$、$I=\{*\}$ とする。$\mathbf{Set}$ の直積で三角形の二経路を $(((a_i,*),b))$ に作用させ、$\alpha,\lambda,\rho$ のどの成分を使うか明記せよ。

<!-- solution-start -->
**詳細解答。** $\alpha_{A,I,B}$ は $(((a_i,*),b))$ を $(a_i,(*,b))$ へ送る。次の $1_A\times\lambda_B$ は $(a_i,\lambda_B(*,b))=(a_i,b)$ へ送る。他方 $\rho_A(a_i,*)=a_i$ なので、$\rho_A\times1_B$ も $(((a_i,*),b))$ を $(a_i,b)$ へ送る。$i=1,2$ の全元で一致するから二つの写像は等しい。
<!-- solution-end -->

### 問題4：厳密性の直接判定

- Level: A
- 問題ID: CAT4-01-DISCRETE-ADDITION

整数全体を対象とする離散圏 $\mathcal Z$ を取り、対象上の演算を $m\otimes n=m+n$、単位を $0$ とする。双関手、結合子、単位子と五角形・三角形を定義から検査し、厳密モノイダル圏になることを示せ。

<!-- solution-start -->
**詳細解答。** $\mathcal Z$ では恒等射しかなく、対象の組 $(m,n)$ に対する唯一の射の組は $1_m,1_n$ である。$1_m\otimes1_n=1_{m+n}$ とすれば恒等射を保ち、合成も $1_{m+n}=1_{m+n}1_{m+n}$ で保存する。整数の加法は $(m+n)+p=m+(n+p)$、$0+m=m=m+0$ を満たすため、結合子・両単位子は恒等射として存在する。自然性では全ての射が恒等射なので等式の両辺が恒等射になる。五角形も三角形も恒等射を何度合成しても恒等射で等しい。したがって定義の全条件を満たし、さらに構造射が恒等射だから厳密である。
<!-- solution-end -->

### 問題5：単位の反例

- Level: A
- 問題ID: CAT4-01-EMPTY-UNIT

$\mathbf{Set}$ でテンソルを直積とし、単位候補を $\varnothing$ とする。$A=\{0\}$ の場合に左単位子が同型になれないことを、定義域と終域の要素数から示せ。$A=\varnothing$ だけを調べては不十分な理由も述べよ。

<!-- solution-start -->
**詳細解答。** 左単位子の必要な型は $\lambda_A:\varnothing\times A\to A$ である。$A=\{0\}$ を入れると定義域は空集合、終域は一元集合である。空集合から一元集合への写像は存在するが、終域の $0$ が像に含まれないため全射ではなく、逆写像を持たない。したがって同型にはならない。$A=\varnothing$ の場合には空集合から空集合への恒等写像は同型だが、単位子は**全ての対象 $A$** に必要であるから、その一例だけでは条件を検証できない。
<!-- solution-end -->

### 問題6：結合子の自然性

- Level: B
- 問題ID: CAT4-01-ASSOCIATOR-NATURAL

$\mathbf{Set}$ の結合子 $\alpha_{A,B,C}((a,b),c)=(a,(b,c))$ が、任意の写像 $f:A\to A'$、$g:B\to B'$、$h:C\to C'$ に関して自然であることを、型の一致と両経路の具体値を示して証明せよ。

<!-- solution-start -->
**詳細解答。** 自然性の左辺は $\alpha_{A',B',C'}((f\times g)\times h)$、右辺は $(f\times(g\times h))\alpha_{A,B,C}$ である。いずれも $(A\times B)\times C\to A'\times(B'\times C')$ という型を持つ。任意の $((a,b),c)$ に左辺を作用させると
$$
((a,b),c)\mapsto((f(a),g(b)),h(c))
\mapsto(f(a),(g(b),h(c))).
$$
右辺では
$$
((a,b),c)\mapsto(a,(b,c))
\mapsto(f(a),(g(b),h(c))).
$$
像は全元で一致し、自然性の等式が従う。ここでは個々の $\alpha$ が同型であることとは別に、写像 $f,g,h$ との両立を検査した。
<!-- solution-end -->

### 問題7：一般の積と結合子の逆

- Level: B
- 問題ID: CAT4-01-PRODUCT-ASSOCIATOR

二項積を持つ圏 $\mathcal C$ と三対象 $A,B,C$ を取る。$X=(A\times B)\times C$ から $A,B,C$ への反復射影を $q_A,q_B,q_C$ とする。射 $\alpha:X\to A\times(B\times C)$ を射影条件で構成し、逆射が存在することを普遍性から示せ。

<!-- solution-start -->
**詳細解答。** [積の普遍性](../CAT2-02/index.md#def-cat2-02-binary-product)により $B\times C$ への射 $\langle q_B,q_C\rangle$ が一意に存在する。さらに $A\times(B\times C)$ への射
$$
\alpha=\langle q_A,\langle q_B,q_C\rangle\rangle
$$
が存在する。逆向きには $Y=A\times(B\times C)$ からの射影 $s_A,s_B,s_C$ を取り、
$$
\beta=\langle\langle s_A,s_B\rangle,s_C\rangle:
Y\to X
$$
と作る。$q_A\beta\alpha=q_A$、$q_B\beta\alpha=q_B$、$q_C\beta\alpha=q_C$ は、組の射を射影すると指定成分が残るためである。これら三成分への写像は、まず $A\times B$ と $C$ の積、次に $A$ と $B$ の積の一意性で元の射を決める。ゆえに $\beta\alpha=1_X$。$Y$ 側でも $s_A\alpha\beta=s_A$、$s_B\alpha\beta=s_B$、$s_C\alpha\beta=s_C$ を得て $\alpha\beta=1_Y$。従って $\beta=\alpha^{-1}$ である。
<!-- solution-end -->

### 問題8：テンソルと逆射

- Level: B
- 問題ID: CAT4-01-TENSOR-INVERSES

テンソル双関手 $\otimes$ と同型射 $f:A\to A'$、$g:B\to B'$ を取る。$f\otimes g$ が同型であることを示し、逆射の式を証明せよ。この主張が五角形条件を必要とするか判定せよ。

<!-- solution-start -->
**詳細解答。** 逆射の候補は $f^{-1}\otimes g^{-1}:A'\otimes B'\to A\otimes B$ である。双関手の[合成保存](#def-cat4-01-tensor-bifunctor)から
$$
\begin{aligned}
(f^{-1}\otimes g^{-1})(f\otimes g)
&=(f^{-1}f)\otimes(g^{-1}g)\\
&=1_A\otimes1_B=1_{A\otimes B}.
\end{aligned}
$$
逆順についても
$$
(f\otimes g)(f^{-1}\otimes g^{-1})
=(ff^{-1})\otimes(gg^{-1})
=1_{A'\otimes B'}.
$$
従って指定候補は左右の逆射である。使ったのは双関手の二公理だけで、結合子・単位子・五角形条件は一度も使っていない。
<!-- solution-end -->

### 問題9：二変数の作用の交換

- Level: B
- 問題ID: CAT4-01-INTERCHANGE-SQUARE

モノイダル圏の射 $f:A\to A'$、$g:B\to B'$ に対して、$A\otimes B$ から $A'\otimes B'$ へ、先に第二変数を動かす経路と先に第一変数を動かす経路を書き、両者の一致を証明せよ。$A\otimes B\cong B\otimes A$ は仮定しない。

<!-- solution-start -->
**詳細解答。** 第二変数から動かす経路は
$$
A\otimes B\xrightarrow{1_A\otimes g}A\otimes B'
\xrightarrow{f\otimes1_{B'}}A'\otimes B'.
$$
第一変数から動かす経路は
$$
A\otimes B\xrightarrow{f\otimes1_B}A'\otimes B
\xrightarrow{1_{A'}\otimes g}A'\otimes B'.
$$
積圏で前者は $(f,1_{B'})(1_A,g)$、後者は $(1_{A'},g)(f,1_B)$ に対応する。いずれも $(f,g)$ と等しいので、双関手の合成保存により二つの射は $f\otimes g$ に等しい。左右の対象を交換する射は使っていないため、対称性を仮定する必要はない。
<!-- solution-end -->

### 問題10：可逆な構造射だけでは足りない

- Level: C
- 問題ID: CAT4-01-COHERENCE-COUNTEREXAMPLE

一対象圏 $\mathcal B$ の射集合を $\{0,1\}$、合成を $\bmod 2$ の加法とする。$\otimes$ も射上の加法とし、単位対象は唯一の対象 $*$ とする。結合子の唯一の成分を $t\in\{0,1\}$、左右単位子をともに $0$ と指定する。

1. この $\otimes$ が双関手で、指定された構造射がすべて自然同型であることを確認せよ。
2. 五角形と三角形の左辺・右辺を $t$ を使って求め、両方が成り立つ $t$ を決定せよ。
3. なぜ「結合子が同型である」だけから括弧の省略を正当化できないか説明せよ。

<!-- solution-start -->
**詳細解答。**

**(1) 双関手と自然同型。** 対象上では全てのテンソルが $*$ である。射 $u,v$ のテンソルを $u+v$ とすると $0\otimes0=0$ は恒等射を保つ。合成については
$$
(u'+u)\otimes(v'+v)=u'+u+v'+v
=(u'+v')+(u+v)
$$
であり、加法の可換性を使って双関手律を得る。$0,1$ は加法に関してともに逆元を持ち、$-t=t$ なので、$t$ と両単位子 $0$ は同型射である。自然性の両辺は、それぞれ元の射 $u,v,w$ の和に $t$ または $0$ を加えた値であり、可換性により順序によらず等しい。

**(2) 整合条件。** 五角形の左経路は結合子を二度合成するから $t+t=0$。右経路は三度なので $t+t+t=t$。従って五角形は $0=t$ と同値である。三角形では左経路は $\lambda_*+\alpha_{*,*,*}=0+t=t$、右経路は $\rho_*\otimes1_*=0+0=0$ だから、やはり $t=0$ と同値である。指定された構造射で両条件を満たすのは $t=0$ だけである。

**(3) 失敗機構。** $t=1$ でも結合子は逆射を持ち、全ての射に関して自然である。しかし四対象の括弧を動かす二経路の合成は $0$ と $1$ で食い違う。逆射の存在は「移し替えが戻せる」ことだけを保証し、「どの順序で移し替えても結果が一致する」ことを保証しない。五角形・三角形が追加で必要である。
<!-- solution-end -->

## 8. 何を得たか

モノイダル圏は「二つを掛ける演算がある圏」より厳密な概念である。テンソルは二変数で射を運ぶ関手であり、結合子と単位子は自然同型であり、五角形と三角形が異なる括弧移動の経路を同一の射にする。

集合の直積と一般の有限積では結合子を**普遍性から**構成した。自己関手の合成では結合子を恒等射に選べた。逆に一対象圏の反例では、自然同型を与えただけでは整合条件に足りないことを見た。

次講では、多数の括弧の移し替えが本当に一意になるかという、Mac Lane の整合性定理の核心へ進む。
