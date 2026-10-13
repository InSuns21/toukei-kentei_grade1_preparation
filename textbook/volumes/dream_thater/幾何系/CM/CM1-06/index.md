# CM1-06 Nijenhuisテンソルと局所座標での必要条件

<!-- definition-example-audit: strict -->

## 1. 点ごとの複素構造を座標として積分するには

[概複素構造](../CM1-03/index.md#def-cm1-03-almost-complex)は、実多様体 $M$ の接束上の滑らかな写像 $J$ で $J^2=-I$ を満たすものである。[型分解](../CM1-04/index.md#thm-cm1-04-splitting)によって、各点の複素化接空間は $(1,0)$ と $(0,1)$ に分かれる。しかし点ごとの固有空間を持つことは、それらを正則座標の $\partial_{z^j}$、$\partial_{\bar z^j}$ として同時に表せることとは違う。

[前章](../CM1-05/index.md#thm-cm1-05-frame-change)では、**既に正則アトラスがある場合**の正則接枠と遷移行列を得た。ここでは逆に、最初に滑らかな $J$ しか与えられていないとする。もし $J$ が正則座標から来るなら、座標偏微分方向同士の交換子には特別な制約がある。その制約を座標によらず表す道具を、後で四つの交換子から構成する。

この章では、正則座標が存在するなら必ず $N_J=0$ となることを証明する。$N_J=0$ から正則座標の存在へ進む一般的な十分性は、次章で扱う Newlander–Nirenberg 定理の核心であり、この章の初等的な計算だけからは結論しない。

## 2. 二つの方向微分の交換子が測るもの

$M$ を実次元 $2n$ の $C^\infty$ 多様体とする。局所実座標 $x^1,\ldots,x^{2n}$ で[GEO5の滑らかなベクトル場](../../GEO/GEO5/index.md#def-geo5-vector-field) $X,Y$ を

$$
X=\sum_i X^i\partial_i,\qquad
Y=\sum_i Y^i\partial_i,\qquad
\partial_i=\frac{\partial}{\partial x^i}
$$

と表す。ベクトル場は滑らかな関数に微分作用素として働く。一般には「$X$ に沿って微分してから $Y$ に沿って微分」と逆順とが一致しない。差を測ろう。

まず[GEO5のLie 括弧](../../GEO/GEO5/index.md#def-geo5-lie-bracket)を使う。続いて[Lie 括弧の座標公式](../../GEO/GEO5/index.md#thm-geo5-bracket-coordinate)により、成分を計算する。滑らかな関数 $f$ への作用と局所成分の表示は次のとおりである。

$$
[X,Y]f=X(Yf)-Y(Xf).
$$

$$
[X,Y]=\sum_k\left(
\sum_iX^i\partial_iY^k-\sum_iY^i\partial_iX^k
\right)\partial_k.
$$

複素化したベクトル場には括弧を $\mathbb C$ 双線形に拡張する。


**定義の確認**。$\mathbb R^2$ で $X=\partial_x$、$Y=x\partial_y$ とする。成分公式から $\partial_x(x)=1$、$\partial_y(1)=0$ なので $[X,Y]=\partial_y$ である。実際、任意の $C^\infty$ 関数 $f$ に対して

$$
\begin{aligned}
X(Yf)-Y(Xf)
&=\partial_x(x\partial_y f)-x\partial_y\partial_x f\\
&=\partial_y f+x\partial_x\partial_y f-x\partial_y\partial_x f\\
&=\partial_y f.
\end{aligned}
$$

最後は混合偏微分の交換を使った。一方、座標ベクトル場同士は $[\partial_i,\partial_j]=0$ である。


滑らかな関数 $f$ に対して、作用素の積の展開から重要な式が得られる。

$$
[X,fY]=(Xf)Y+f[X,Y],\qquad
[fX,Y]=f[X,Y]-(Yf)X.
$$

たとえば最初の式は $[X,fY]g=X(fYg)-fY(Xg)$ に積の微分則を適用して得られる。この二式が、次のテンソル性を調べる鍵になる。

## 3. Nijenhuisテンソルの定義と、点だけで計算できる理由

$J^2=-I$ を満たす滑らかな概複素構造を固定する。$X,Y$ を代入して四つの交換子を組み合わせると、単なる交換子では残っていた $Xf,Yf$ のような微分項が相殺される。

<a id="def-cm1-06-nijenhuis"></a>
<!-- formal-statement-start -->
> **定義（Nijenhuisテンソル）**  
> $M$ を滑らかな実 $2n$ 次元多様体、$J\in\Gamma(\operatorname{End}(TM))$ を $J^2=-I$ を満たす滑らかな概複素構造とする。滑らかな実ベクトル場 $X,Y$ に対して

$$
N_J(X,Y)
=[JX,JY]-J[JX,Y]-J[X,JY]-[X,Y]
$$

> と定める。これを本章の符号規約による **Nijenhuisテンソル** と呼ぶ。文献によって全体の符号や定数倍が異なるため、後の公式はこの定義を基準に読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-06-nijenhuis -->
**定義の確認**。$\mathbb R^2$ 上の標準構造 $J\partial_x=\partial_y$、$J\partial_y=-\partial_x$ に $X=\partial_x$、$Y=\partial_y$ を代入する。四つの項は順に

$$
[\partial_y,-\partial_x]=0,\quad
-J[\partial_y,\partial_y]=0,\quad
-J[\partial_x,-\partial_x]=0,\quad
-[\partial_x,\partial_y]=0.
$$

従って $N_J(\partial_x,\partial_y)=0$。これは定数成分の標準複素構造についての直接確認であり、任意の滑らかな $J$ について消えると主張したわけではない。
<!-- definition-example-end -->

<a id="thm-cm1-06-tensoriality"></a>
<!-- formal-statement-start -->
> **定理（Nijenhuisテンソルのテンソル性と反対称性）**  
> $M,J$ を上の定義のとおりとする。任意の滑らかな実関数 $f,g$ と滑らかな実ベクトル場 $X,Y$ に対して

$$
N_J(fX,gY)=fg\,N_J(X,Y),\qquad
N_J(X,Y)=-N_J(Y,X)
$$

> が成立する。従って $N_J$ の点 $p$ での値は $X_p,Y_p$ のみで決まり、実接束上の反対称な $(1,2)$ 型テンソルである。また

$$
N_J(JX,Y)=-J\,N_J(X,Y)
=N_J(X,JY)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Lie括弧自体は関数倍に対して線形でない。しかし、$J(fX)=fJX$ と $J^2=-I$ を四項に使うと、関数の導関数を含む余分な項は二組ずつ消える。これが「ベクトル場の延長を選んで計算しても点での結果が変わらない」根拠である。

<!-- proof-start -->
### 証明

まず第一引数の関数倍を調べる。[GEO5のLie括弧の定義](../../GEO/GEO5/index.md#def-geo5-lie-bracket)の積の微分則を四項へ適用する。

$$
\begin{aligned}
[J(fX),JY]&=f[JX,JY]-(JYf)JX,\\
-J[J(fX),Y]&=-fJ[JX,Y]+(Yf)J^2X,\\
-J[fX,JY]&=-fJ[X,JY]+(JYf)JX,\\
-[fX,Y]&=-f[X,Y]+(Yf)X.
\end{aligned}
$$

二行目に $J^2X=-X$ を代入すると、$(Yf)X$ の二項は相殺される。一行目と三行目の $(JYf)JX$ も相殺される。残るのは $f$ 倍の定義式だけなので

$$
N_J(fX,Y)=fN_J(X,Y).
$$

交換子は $[X,Y]=-[Y,X]$ だから、定義の四項を $X,Y$ の順序を交換して比べると $N_J(Y,X)=-N_J(X,Y)$。この反対称性を使えば、第二引数でも $N_J(X,gY)=gN_J(X,Y)$ が従い、二つを合わせて $fg$ 倍の式を得る。

最後に $J^2=-I$ を用いて直接計算する。

$$
\begin{aligned}
N_J(JX,Y)
&=[-X,JY]-J[-X,Y]-J[JX,JY]-[JX,Y]\\
&=-[X,JY]+J[X,Y]-J[JX,JY]-[JX,Y].
\end{aligned}
$$

一方、

$$
\begin{aligned}
-JN_J(X,Y)
&=-J[JX,JY]+J^2[JX,Y]+J^2[X,JY]+J[X,Y]\\
&=-J[JX,JY]-[JX,Y]-[X,JY]+J[X,Y].
\end{aligned}
$$

両者は一致する。反対称性を使って $N_J(X,JY)=-N_J(JY,X)=JN_J(Y,X)=-JN_J(X,Y)$ も得る。

点 $p$ での値が延長によらないことも確認する。$p$ 近傍の座標枠に $X=\sum_iX^i\partial_i$、$Y=\sum_jY^j\partial_j$ と書けば、いま証明した関数線形性から

$$
N_J(X,Y)|_p
=\sum_{i,j}X^i(p)Y^j(p)\,
N_J(\partial_i,\partial_j)|_p.
$$

よって各点の接ベクトルだけから値が定まり、座標表示で計算しても幾何学的な対象は同じである。$\square$
<!-- proof-end -->

最後の恒等式は **関数線形** だからこそ成り立つ。Lie括弧 $[X,Y]$ 自体を $X_p,Y_p$ だけから求められる、と取り違えてはいけない。

## 4. 局所実座標で全成分を計算する

抽象定義だけでは実際の概複素構造 $J(x)$ を判定しにくい。そこで局所実座標で $J$ の成分とその一階偏微分を並べる。

<a id="thm-cm1-06-components"></a>
<!-- formal-statement-start -->
> **定理（Nijenhuisテンソルの局所成分公式）**  
> $M$ の実座標 $x^1,\ldots,x^{2n}$ において、$J\partial_i=\sum_kJ^k{}_i\partial_k$ と記す。$N_J(\partial_i,\partial_j)=\sum_kN^k{}_{ij}\partial_k$ と置くと

$$
\boxed{
N^k{}_{ij}
=\sum_p\left(
J^p{}_i\,\partial_pJ^k{}_j
-J^p{}_j\,\partial_pJ^k{}_i
-J^k{}_p(\partial_iJ^p{}_j-\partial_jJ^p{}_i)
\right).
}
$$

> 各添字 $i,j,k,p$ は $1,\ldots,2n$ の範囲を動く。この公式に必要なのは $J$ の値と一階導関数だけである。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO5のLie括弧の座標公式](../../GEO/GEO5/index.md#thm-geo5-bracket-coordinate)を四項それぞれに適用する。座標基底自体の交換子が零なので、微分されるのは $J$ の成分だけである。

<!-- proof-start -->
### 証明

$E_i=\partial_i$ と置く。第一項を成分公式で展開すると

$$
[JE_i,JE_j]
=\sum_{k,p}\left(
J^p{}_i\partial_pJ^k{}_j
-J^p{}_j\partial_pJ^k{}_i
\right)E_k.
$$

次に $[E_i,E_j]=0$ と積の微分則を使えば

$$
[JE_i,E_j]=-\sum_p(\partial_jJ^p{}_i)E_p,
\qquad
[E_i,JE_j]=\sum_p(\partial_iJ^p{}_j)E_p.
$$

これらへ $J E_p=\sum_kJ^k{}_p E_k$ を作用させると

$$
\begin{aligned}
-J[JE_i,E_j]
&=\sum_{k,p}J^k{}_p(\partial_jJ^p{}_i)E_k,\\
-J[E_i,JE_j]
&=-\sum_{k,p}J^k{}_p(\partial_iJ^p{}_j)E_k.
\end{aligned}
$$

四番目の項は零である。三つの式の $E_k$ 係数を集めれば提示した公式になる。反対称性も $i,j$ の交換によって各項の符号が反転することから確かめられる。$\square$
<!-- proof-end -->

**簡単な使い方**。$J$ が座標上で定数行列なら $\partial_pJ^k{}_j=0$ なので全成分が零になる。逆に $J$ の成分が点によって変化しても、式の三群の項が相殺されて $N_J=0$ となる場合がある。**$J$ が非定数であることと、$N_J$ が非零であることは同値でない**。

特に成分の数を減らすときは、[反対称性](#thm-cm1-06-tensoriality)により $N^k{}_{ii}=0$ と $N^k{}_{ji}=-N^k{}_{ij}$ を先に利用するとよい。

## 5. 型別の交換子とNijenhuisテンソル

実座標の成分公式には多くの項がある。その意味を明確にするため、$T_{\mathbb C}M=T^{1,0}M\oplus T^{0,1}M$ という[型分解](../CM1-04/index.md#thm-cm1-04-splitting)に戻る。滑らかな型別ベクトル場の交換子が同じ型にとどまるかを調べれば、$J$ が正則座標に由来するための条件を表せる。

<a id="def-cm1-06-involutive"></a>
<!-- formal-statement-start -->
> **定義（型別分布の交換子閉性）**  
> 概複素構造 $(M,J)$ の複素化接束の部分束 $T^{0,1}M$ が **交換子で閉じている** とは、任意の開集合 $U\subset M$ と任意の滑らかな局所切断 $Z,W\in\Gamma(U,T^{0,1}M)$ に対して $[Z,W]\in\Gamma(U,T^{0,1}M)$ が成立することをいう。同様に $T^{1,0}M$ の閉性も定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-06-involutive -->
**定義の確認**。$\mathbb C^2$ の標準構造では、$(0,1)$ 型の場は $Z=a^1\partial_{\bar z^1}+a^2\partial_{\bar z^2}$ と書ける。もう一つの場 $W=b^1\partial_{\bar z^1}+b^2\partial_{\bar z^2}$ との括弧は

$$
[Z,W]=
\sum_{k=1}^2\left(
\sum_{j=1}^2a^j\partial_{\bar z^j}b^k
-\sum_{j=1}^2b^j\partial_{\bar z^j}a^k
\right)\partial_{\bar z^k}.
$$

右辺に $\partial_{z^k}$ 成分はない。係数関数 $a^j,b^j$ は滑らかなら十分であり、正則である必要はない。この例では $(0,1)$ 型の交換子閉性が実際に成立する。
<!-- definition-example-end -->

<a id="thm-cm1-06-bracket-characterization"></a>
<!-- formal-statement-start -->
> **定理（Nijenhuis消滅と型別交換子閉性）**  
> $M$ を滑らかな実 $2n$ 次元多様体、$J^2=-I$ を満たす滑らかな概複素構造とする。実ベクトル場上で定義した $N_J$ を複素双線形に拡張する。このとき $(0,1)$ 型の局所場 $Z,W$ と $(1,0)$ 型の局所場 $V,H$ に対し

$$
N_J(Z,W)=-4P^{1,0}[Z,W],
\qquad
N_J(V,H)=-4P^{0,1}[V,H].
$$

> さらに、次の三条件は同値である。
>
> 1. $N_J$ が恒等的に零である。
> 2. $T^{0,1}M$ が交換子で閉じている。
> 3. $T^{1,0}M$ が交換子で閉じている。

> ここで $P^{1,0},P^{0,1}$ は[型射影](../CM1-04/index.md#thm-cm1-04-splitting)である。
<!-- formal-statement-end -->

### 証明の見取り図

固有値 $\pm i$ を Nijenhuis の四項へ代入する。異なる型の組では四項が完全に消え、同じ型の組では交換子の「逆の型」の部分だけが残る。複素共役が二つの型を交換するので、片方の閉性だけを調べれば十分である。

<!-- proof-start -->
### 証明

$(0,1)$ 型の場には $JZ=-iZ$、$JW=-iW$ が成り立つ。[Nijenhuisの定義](#def-cm1-06-nijenhuis)へ代入し、複素定数は括弧から外せることを使うと

$$
\begin{aligned}
N_J(Z,W)
&=[-iZ,-iW]-J[-iZ,W]-J[Z,-iW]-[Z,W]\\
&=-[Z,W]+iJ[Z,W]+iJ[Z,W]-[Z,W]\\
&=-2(I-iJ)[Z,W]
=-4P^{1,0}[Z,W].
\end{aligned}
$$

最後に[型射影公式](../CM1-04/index.md#thm-cm1-04-splitting)の $P^{1,0}=(I-iJ)/2$ を代入した。$(1,0)$ 型では $JV=iV$、$JH=iH$ だから、同じ計算で

$$
\begin{aligned}
N_J(V,H)
&=[iV,iH]-J[iV,H]-J[V,iH]-[V,H]\\
&=-2(I+iJ)[V,H]
=-4P^{0,1}[V,H].
\end{aligned}
$$

混合した型では $JZ=-iZ$、$JV=iV$ として計算すると

$$
\begin{aligned}
N_J(Z,V)
&=[-iZ,iV]-J[-iZ,V]-J[Z,iV]-[Z,V]\\
&=[Z,V]+iJ[Z,V]-iJ[Z,V]-[Z,V]=0.
\end{aligned}
$$

任意の複素化ベクトル場は[型分解](../CM1-04/index.md#thm-cm1-04-splitting)によって二型の和になる。よって $N_J=0$ は両方の同型組の値が消えることと同値であり、上の公式からそれぞれ $P^{1,0}[Z,W]=0$、$P^{0,1}[V,H]=0$ に同値である。射影の核は反対の型なので、これらは交換子閉性そのものである。

最後に $T^{1,0}M=\overline{T^{0,1}M}$、また実係数で定義した括弧は共役と可換だから

$$
[\overline Z,\overline W]=\overline{[Z,W]}.
$$

従って一方の型の閉性があれば他方の型の閉性もある。これで三条件が同値となる。$\square$
<!-- proof-end -->

「$(0,1)$ 型の局所場はすべて互いに可換」とは言っていない。交換子が零でなくても、同じ型に**とどまる**なら条件を満たす。

## 6. 正則座標の存在から導かれる必要条件

いよいよ最初の問いへ戻る。複素多様体から得られた $J$ なら、正則座標 $z^1,\ldots,z^n$ の $\partial_{\bar z^j}$ が $(0,1)$ 型を張る。これらは座標偏微分だから互いに可換である。

<a id="thm-cm1-06-necessity"></a>
<!-- formal-statement-start -->
> **定理（正則アトラスによる概複素構造の必要条件）**  
> $X$ を複素次元 $n$ の複素多様体とし、その基礎実多様体に[正則アトラスから誘導した概複素構造](../CM1-03/index.md#thm-cm1-03-induced-j)を $J$ とする。このとき $N_J=0$ である。より局所的には、滑らかな概複素構造 $(M,J)$ が点 $p$ の近傍である正則座標アトラスから誘導されるなら、その近傍で $N_J=0$ となり、とくに $N_J(p)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

座標偏微分場 $E_j=\partial_{\bar z^j}$ は $J E_j=-iE_j$ を満たし、$[E_j,E_k]=0$ である。滑らかな係数を掛けた二つの $(0,1)$ 型ベクトル場を括弧に入れても、出てくるのは $E_j$ の線形結合だけ。[Nijenhuis消滅と型別交換子閉性](#thm-cm1-06-bracket-characterization)を適用する。

<!-- proof-start -->
### 証明

任意の正則座標近傍 $U$ を取り、$E_j=\partial_{\bar z^j}$ とする。[複素偏微分基底](../CM1-04/index.md#def-cm1-04-tangent-subbundles)と[誘導概複素構造](../CM1-03/index.md#thm-cm1-03-induced-j)から $JE_j=-iE_j$ が成り立つ。また実座標偏微分 $\partial_{x^j}$、$\partial_{y^j}$ は互いに可換なので、それらの定数複素線形結合である $E_j$ についても $[E_j,E_k]=0$ である。

$Z=\sum_j a^j E_j$、$W=\sum_k b^kE_k$ を任意の滑らかな $(0,1)$ 型の場とする。積の微分則を各組に適用すれば

$$
\begin{aligned}
[Z,W]
&=\sum_{j,k}[a^jE_j,b^kE_k]\\
&=\sum_{j,k}\left(
a^j(E_jb^k)E_k-b^k(E_ka^j)E_j
+a^jb^k[E_j,E_k]\right)\\
&=\sum_{j,k}\left(
a^j(E_jb^k)E_k-b^k(E_ka^j)E_j\right).
\end{aligned}
$$

右辺は $E_1,\ldots,E_n$ の滑らかな係数による和だから $(0,1)$ 型である。従って $T^{0,1}X$ は交換子で閉じ、[Nijenhuis消滅と型別交換子閉性](#thm-cm1-06-bracket-characterization)から $N_J=0$ を得る。座標近傍は任意であり、テンソル性によりこの等式は座標によらず成立する。$\square$
<!-- proof-end -->

この必要条件の**反対方向は証明していない**。$N_J(p)=0$ は一点の必要条件にすぎず、一点だけの消滅から近傍全体の座標存在は得られない。また、近傍全体の $N_J=0$ から局所正則座標を構成するには、局所正則座標を構成する解析的議論が必要である。

### 実二次元での特別な事情

実二次元（複素次元1）では、任意の滑らかな概複素構造について $N_J$ は自動的に零になる。実際、局所的に非零の場 $X$ を取れば $X,JX$ は実接空間の基底となる。[テンソル性と反対称性](#thm-cm1-06-tensoriality)より

$$
N_J(X,X)=0,\qquad
N_J(X,JX)=-J N_J(X,X)=0,\qquad
N_J(JX,JX)=0.
$$

従って全ての基底対で零となり、$N_J=0$ である。**非自明な障害を具体的に見つけるには、一般には実四次元以上を見る**。ただし、二次元で正則座標が存在することそのものは、ここで証明したテンソルの消滅だけからは導いていない。

## 7. 演習

各問題では、括弧の定義・積の微分則・$J^2=-I$ のどれを使ったか明記すること。特に全体符号と係数 $4$ は[Nijenhuisテンソルの定義](#def-cm1-06-nijenhuis)に照らして検算する。

### Level A

<a id="ex-cm1-06-a01"></a>
#### CM1-06-A01 交換子を成分で求める
- Level: A

$\mathbb R^2$ で $X=x\partial_y$、$Y=y\partial_x$ とするとき、$[X,Y]$ を成分公式から求めよ。

<!-- solution-start -->
**詳細解答**。[GEO5のLie括弧の座標公式](../../GEO/GEO5/index.md#thm-geo5-bracket-coordinate)を使う。$X^x=0,X^y=x,Y^x=y,Y^y=0$ だから

$$
X(Y^x)=x\partial_y y=x,\quad Y(X^x)=0,
\quad X(Y^y)=0,\quad Y(X^y)=y\partial_x x=y.
$$

従って $[X,Y]=x\partial_x-y\partial_y$。項の順を逆にすると符号が変わる。
<!-- solution-end -->

<a id="ex-cm1-06-a02"></a>
#### CM1-06-A02 関数倍の積の微分則
- Level: A

$X=\partial_x$、$Y=\partial_y$、$f=x^2y$ に対して $[X,fY]$ を直接計算し、一般公式と比較せよ。

<!-- solution-start -->
**詳細解答**。$Xf=2xy$、$[X,Y]=0$。任意の滑らかな試験関数 $g$ に対して

$$
\begin{aligned}
[X,fY]g
&=\partial_x(x^2y\,\partial_y g)
-x^2y\,\partial_y\partial_xg\\
&=2xy\,\partial_yg+x^2y(\partial_x\partial_yg-\partial_y\partial_xg)\\
&=2xy\,\partial_y g.
\end{aligned}
$$

よって $[X,fY]=2xy\,Y=(Xf)Y+f[X,Y]$。括弧は単純な関数線形写像ではない。
<!-- solution-end -->

<a id="ex-cm1-06-a03"></a>
#### CM1-06-A03 定数複素構造
- Level: A

$\mathbb R^4$ に $J\partial_{x^1}=\partial_{y^1}$、$J\partial_{y^1}=-\partial_{x^1}$、$J\partial_{x^2}=\partial_{y^2}$、$J\partial_{y^2}=-\partial_{x^2}$ を与える。$N_J$ が零であることを示せ。

<!-- solution-start -->
**詳細解答**。実座標 $(x^1,y^1,x^2,y^2)$ での $J$ は各 $2\times2$ ブロックが $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ の定数行列である。従って $\partial_p J^k{}_j=0$ が全添字で成立する。[局所成分公式](#thm-cm1-06-components)の三群の項はすべて零なので $N^k{}_{ij}=0$。最後に[テンソル性](#thm-cm1-06-tensoriality)から任意のベクトル場の組に対して $N_J=0$ が従う。
<!-- solution-end -->

<a id="ex-cm1-06-a04"></a>
#### CM1-06-A04 型射影で障害を読む
- Level: A

$(0,1)$ 型の局所場 $Z,W$ に対して、$[Z,W]=U+V$、$U\in T^{0,1}M$、$V\in T^{1,0}M$ と分解できたとする。$N_J(Z,W)$ を求め、零となる条件を述べよ。

<!-- solution-start -->
**詳細解答**。[射影公式](../CM1-04/index.md#thm-cm1-04-splitting)から $P^{1,0}(U+V)=0+V$。[Nijenhuis消滅と型別交換子閉性](#thm-cm1-06-bracket-characterization)へ代入して

$$
N_J(Z,W)=-4P^{1,0}[Z,W]=-4V.
$$

従って零となる必要十分条件は $V=0$、つまり交換子に逆型の成分がないことである。$[Z,W]$ 全体が零である必要はない。
<!-- solution-end -->

<a id="ex-cm1-06-a05"></a>
#### CM1-06-A05 実二次元での消滅
- Level: A

実二次元の概複素構造で、局所的な非零ベクトル場 $X$ を使い $N_J(X,JX)=0$ を証明せよ。これだけで任意の組の消滅が従う理由も述べよ。

<!-- solution-start -->
**詳細解答**。[Nijenhuisテンソルのテンソル性と反対称性](#thm-cm1-06-tensoriality)を使う。反対称性から

$$
N_J(X,X)=-N_J(X,X)
$$

となる。実数体上であるから $N_J(X,X)=0$。さらに $J$ との恒等式へ代入すると

$$
N_J(X,JX)=-JN_J(X,X)=0.
$$

残るのは $X,JX$ が実基底であることの確認である。もし点ごとに従属なら、零でない $X$ に対して $JX=aX$（$a\in\mathbb R$）と書ける。両辺へ $J$ を掛けると

$$
-X=J^2X=aJX=a^2X.
$$

これは $a^2=-1$ を要求するので実数では不可能である。従って $X,JX$ は局所実基底であり、反対称性から $N_J(JX,JX)=0$ でもある。全基底対で零なので、[関数双線形性](#thm-cm1-06-tensoriality)により任意の場の組について零となる。
<!-- solution-end -->

### Level B

<a id="ex-cm1-06-b01"></a>
#### CM1-06-B01 局所成分公式を初めから復元
- Level: B

実座標 $x^i$ で $J\partial_i=\sum_kJ^k{}_i\partial_k$ と書く。総和添字 $k,p$ は $1,\ldots,2n$ を動く。この表示から Lie 括弧を展開して $N^k{}_{ij}$ の成分公式を導け。添字 $i,j$ を交換したときの反対称性も確認せよ。

<!-- solution-start -->
**詳細解答**。[GEO5のLie括弧の座標公式](../../GEO/GEO5/index.md#thm-geo5-bracket-coordinate)に $J\partial_i=\sum_pJ^p{}_i\partial_p$ と $J\partial_j=\sum_pJ^p{}_j\partial_p$ を代入する。座標偏微分場同士の括弧が零であることから

$$
[J\partial_i,J\partial_j]
=\sum_{k,p}\left(
J^p{}_i\partial_pJ^k{}_j
-J^p{}_j\partial_pJ^k{}_i
\right)\partial_k
$$

となる。次に一方が座標偏微分場のときは

$$
[J\partial_i,\partial_j]=-\sum_p(\partial_jJ^p{}_i)\partial_p,
\qquad
[\partial_i,J\partial_j]=\sum_p(\partial_iJ^p{}_j)\partial_p.
$$

[Nijenhuisの定義](#def-cm1-06-nijenhuis)の第二・第三項へ $J\partial_p=\sum_kJ^k{}_p\partial_k$ を代入すると

$$
\begin{aligned}
&-J[J\partial_i,\partial_j]-J[\partial_i,J\partial_j]\\
&=\sum_{k,p}J^k{}_p(\partial_jJ^p{}_i-\partial_iJ^p{}_j)\partial_k.
\end{aligned}
$$

第四項は $[\partial_i,\partial_j]=0$ なので零である。第一項と第二・第三項で $\partial_k$ の係数を集めれば

$$
N^k{}_{ij}
=\sum_p\left(
J^p{}_i\partial_pJ^k{}_j-J^p{}_j\partial_pJ^k{}_i
-J^k{}_p(\partial_iJ^p{}_j-\partial_jJ^p{}_i)
\right).
$$

添字 $i,j$ を交換すると各括弧の符号が反転するから $N^k{}_{ji}=-N^k{}_{ij}$ である。これは[局所成分公式](#thm-cm1-06-components)と一致する。
<!-- solution-end -->

<a id="ex-cm1-06-b02"></a>
#### CM1-06-B02 変化するJでも障害がない
- Level: B

$\mathbb R^2$ 上で

$$
J(x,y)=\begin{pmatrix}0&-e^x\\e^{-x}&0\end{pmatrix}
$$

とする。$J^2=-I$ を確かめ、$N_J(\partial_x,\partial_y)$ を定義から求めよ。非定数であることを根拠に非零と結論してよいか。

<!-- solution-start -->
**詳細解答**。行列の積は対角に $-e^xe^{-x}=-1$ が並び、$J^2=-I$。$X=\partial_x$、$Y=\partial_y$ と置けば $JX=e^{-x}\partial_y$、$JY=-e^x\partial_x$。積の微分則から

$$
\begin{aligned}
[JX,JY]
&=[e^{-x}\partial_y,-e^x\partial_x]
=-(-e^x)\partial_x(e^{-x})\,\partial_y
=-\partial_y,\\
[JX,Y]&=0,\\
[X,JY]&=-e^x\partial_x.
\end{aligned}
$$

ここで第一行の係数は $-b\partial_xa$、$a=e^{-x}$、$b=-e^x$ から $-\left(-e^x\right)(-e^{-x})=-1$ である。[Nijenhuisの定義](#def-cm1-06-nijenhuis)に代入すると

$$
N_J(X,Y)=-\partial_y-0-J(-e^x\partial_x)-0
=-\partial_y+\partial_y=0.
$$

実二次元では他の成分も[テンソル性](#thm-cm1-06-tensoriality)と反対称性から消える。$J$ が点により変化すること自体は障害を意味しない。
<!-- solution-end -->

<a id="ex-cm1-06-b03"></a>
#### CM1-06-B03 混合型が必ず消える理由
- Level: B

$(0,1)$ 型の $Z$ と $(1,0)$ 型の $V$ に対して $N_J(Z,V)=0$ を、任意の交換子 $[Z,V]$ の値を仮定せずに証明せよ。

<!-- solution-start -->
**詳細解答**。$JZ=-iZ$、$JV=iV$ を使い、[Nijenhuisの定義](#def-cm1-06-nijenhuis)を展開する。

$$
\begin{aligned}
N_J(Z,V)
&=[-iZ,iV]-J[-iZ,V]-J[Z,iV]-[Z,V]\\
&=(-i)(i)[Z,V]+iJ[Z,V]-iJ[Z,V]-[Z,V]\\
&=[Z,V]-[Z,V]=0.
\end{aligned}
$$

ここで $[Z,V]$ 自体は零と置いていない。混合型の消滅は $J$ の固有値の代数から出る。
<!-- solution-end -->

<a id="ex-cm1-06-b04"></a>
#### CM1-06-B04 正則座標での交換子
- Level: B

$\mathbb C^2$ で $Z=\bar z^1\partial_{\bar z^1}$、$W=z^1\partial_{\bar z^2}+\bar z^2\partial_{\bar z^1}$ とする。$[Z,W]$ を求め、$(0,1)$ 型の閉性を直接確認せよ。

<!-- solution-start -->
**詳細解答**。$E_j=\partial_{\bar z^j}$ とする。$[E_1,E_2]=0$ なので積の微分則から

$$
[Z,W]
=Z(z^1)E_2+Z(\bar z^2)E_1-W(\bar z^1)E_1.
$$

各係数は $Z(z^1)=0$、$Z(\bar z^2)=0$、$W(\bar z^1)=\bar z^2$。よって

$$
[Z,W]=-\bar z^2\partial_{\bar z^1},
$$

これは零とは限らないが $(0,1)$ 型である。[閉性の定義](#def-cm1-06-involutive)を満たす例であり、[Nijenhuis消滅と型別交換子閉性](#thm-cm1-06-bracket-characterization)から $N_J(Z,W)=0$ も従う。
<!-- solution-end -->

### Level C

<a id="ex-cm1-06-c01"></a>
#### CM1-06-C01 非零のNijenhuisテンソルを型別枠から構成
- Level: C

$\mathbb C^2$ の標準複素座標を $z^1,z^2$ とし、複素化接束上の滑らかな場

$$
W_1=\partial_{\bar z^1}+\bar z^2\,\partial_{z^2},
\qquad W_2=\partial_{\bar z^2}
$$

を考える。$\overline W_1,\overline W_2$ も用いる。

1. これら四つが各点で複素化接空間の基底であることを示せ。
2. $T^{0,1}$ を $W_1,W_2$ の張る空間、$T^{1,0}$ をその共役が張る空間と定め、$J$ をそれぞれの固有値が $-i,+i$ となるように定めよ。これが実接束上の滑らかな概複素構造を与える理由を述べよ。
3. $[W_1,W_2]$ を直接計算せよ。
4. $N_J(W_1,W_2)$ を求め、この $J$ が正則座標から誘導されたものではありえない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

**1. 枠の独立性**。定義から

$$
\begin{aligned}
W_1&=\partial_{\bar z^1}+\bar z^2\partial_{z^2},
&W_2&=\partial_{\bar z^2},\\
\overline W_1&=\partial_{z^1}+z^2\partial_{\bar z^2},
&\overline W_2&=\partial_{z^2}.
\end{aligned}
$$

$W_1,W_2,\overline W_1,\overline W_2$ の複素線形結合が零とする。$\partial_{\bar z^1}$ 成分から $W_1$ の係数が零、$\partial_{z^1}$ 成分から $\overline W_1$ の係数が零。残りは $W_2,\overline W_2$ なので、$\partial_{\bar z^2},\partial_{z^2}$ 成分から両係数も零になる。従って四つは全点で基底である。

**2. 実の $J$ の復元**。$J W_a=-iW_a$、$J\overline W_a=i\overline W_a$ と複素線形に定める。四つが滑らかな枠をなすから $J$ は滑らかで、各固有値を二乗すると $-1$ なので $J^2=-I$。また

$$
\overline{JW_a}=\overline{-iW_a}=i\overline W_a
=J\overline W_a.
$$

この共役との可換性は全枠で成り立つため、$J$ は複素化空間の実部分空間 $TM$ を保存する。よって実接束上の概複素構造である。

**3. 交換子**。[GEO5のLie括弧の基本恒等式](../../GEO/GEO5/index.md#thm-geo5-bracket-identities)を使うと

$$
\begin{aligned}
[W_1,W_2]
&=[\partial_{\bar z^1},\partial_{\bar z^2}]
+[\bar z^2\partial_{z^2},\partial_{\bar z^2}]\\
&=0-\bigl(\partial_{\bar z^2}\bar z^2\bigr)\partial_{z^2}\\
&=-\partial_{z^2}=-\overline W_2.
\end{aligned}
$$

ここで $\partial_{\bar z^2}\bar z^2=1$、複素座標偏微分基底同士の括弧は零である。

**4. 障害と必要条件**。$[W_1,W_2]=-\overline W_2$ は $(1,0)$ 型なので、[Nijenhuis消滅と型別交換子閉性](#thm-cm1-06-bracket-characterization)により

$$
N_J(W_1,W_2)
=-4P^{1,0}(-\overline W_2)
=4\overline W_2=4\partial_{z^2}\ne0.
$$

したがって $T^{0,1}$ は交換子で閉じていない。[正則アトラスの必要条件](#thm-cm1-06-necessity)の対偶から、この $J$ はどの点の近傍でも正則座標アトラスによって誘導される構造ではない。これは実四次元での非可積分な概複素構造の具体例である。
<!-- solution-end -->

---

## 8. 次章への橋渡し

本章で確立した論理は次の一方向である。

$$
\text{正則座標アトラスが存在}
\quad\Longrightarrow\quad
T^{0,1}\text{ が交換子で閉じる}
\quad\Longleftrightarrow\quad
N_J=0.
$$

最初の含意は正則座標での局所計算から、後半の同値は型射影の代数から証明した。逆向きの含意は別の問題である。次章では、$N_J=0$ という微分方程式的制約がどのように局所正則座標の存在へ結びつくのかを整理し、一般次元の Newlander–Nirenberg 定理と証明に必要な解析的準備の境界を明らかにする。
