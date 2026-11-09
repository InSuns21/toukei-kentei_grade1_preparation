# CAT1-07 自然変換と自然同型

## 1. 関手どうしをどう比較するか

前講では、[共変関手](../CAT1-06/index.md#def-cat1-06-functor)が対象と射を対応させ、恒等射と合成を保つことを学んだ。関手 $F,G:\mathcal C\to\mathcal D$ が二つあるとき、さらに「$F$ で運ぶ方法を $G$ で運ぶ方法へ一斉に変える」ことを考えたい。

例えば集合 $X$ を二つ組の集合 $X\times X$ へ送る操作を考える。各 $x\in X$ を $(x,x)$ へ送る写像は作れる。しかし集合 $X$ ごとの写像をばらばらに作るだけでは、集合間の写像 $f:X\to Y$ と整合するとは限らない。まず $x$ を $f(x)$ にしてから対角線に送っても、対角線に送ってから両成分へ $f$ を作用させても、同じ結果になってほしい。

この「**対象ごとの射を、元の圏のすべての射と両立させる**」条件が自然性である。本講では、この条件を定義から確認し、可逆な対応と具体的な分類まで進む。

## 2. 自然変換と自然性の四角形

圏 $\mathcal C,\mathcal D$ と共変関手 $F,G:\mathcal C\to\mathcal D$ を固定する。各対象 $A$ に、$\mathcal D$ の射 $\alpha_A:F(A)\to G(A)$ を割り当てる。射 $f:A\to B$ を動かすと、$F(A)$ から $G(B)$ へは二通りの道がある。

1. $F(f):F(A)\to F(B)$ の後に $\alpha_B:F(B)\to G(B)$ を合成する。
2. $\alpha_A:F(A)\to G(A)$ の後に $G(f):G(A)\to G(B)$ を合成する。

この二通りを等しくすることが条件になる。

<a id="def-cat1-07-natural-transformation"></a>

<!-- formal-statement-start -->
> **定義（自然変換）**  
> 圏 $\mathcal C,\mathcal D$ と共変関手 $F,G:\mathcal C\to\mathcal D$ に対し、$F$ から $G$ への**自然変換** $\alpha:F\Rightarrow G$ とは、各 $A\in\operatorname{Ob}(\mathcal C)$ に $\mathcal D$ の射 $\alpha_A:F(A)\to G(A)$ を割り当て、任意の射 $f:A\to B$ について次を満たすものをいう。

$$
G(f)\circ\alpha_A=\alpha_B\circ F(f).
$$

> この等式を **自然性** といい、$\alpha_A$ を自然変換の **成分** という。定義の両辺は、いずれも $F(A)\to G(B)$ の射である。
<!-- formal-statement-end -->

ここでは $\mathcal C$ が[小さい圏](../CAT1-02/index.md#def-cat1-02-size)であるとは仮定しない。大きい圏では対象全体が集合とは限らず、成分全体を集合として集められるとも限らない。自然変換を定義することと、自然変換すべての集合や圏を構成できることは区別する。

四角形の上辺・下辺が関手による射の像、左辺・右辺が自然変換の成分である。四角形の二経路が一致することを「可換」という。

$$
\begin{array}{ccc}
F(A)&\xrightarrow{F(f)}&F(B)\\
{\scriptstyle\alpha_A}\downarrow&&\downarrow{\scriptstyle\alpha_B}\\
G(A)&\xrightarrow{G(f)}&G(B)
\end{array}
$$

**定義の確認**として、集合と写像の圏 $\mathbf{Set}$ で対角写像を考える。恒等関手 $I(X)=X$, $I(f)=f$ と、$D(X)=X\times X$, $D(f)(x_1,x_2)=(f(x_1),f(x_2))$ を使う。$D$ は恒等射を成分ごとに保ち、$g\circ f$ を二成分に作用させる順序も合成と一致するので、[関手の二公理](../CAT1-06/index.md#def-cat1-06-functor)を満たす。

<!-- definition-example-start: def-cat1-07-natural-transformation -->
**定義の確認**（対角写像）。$\delta_X:X\to X\times X$ を $\delta_X(x)=(x,x)$ と置く。各 $X$ に成分があり、その始域・終域は $I(X)$ と $D(X)$ に一致する。任意の写像 $f:X\to Y$ と $x\in X$ について

$$
\begin{aligned}
(D(f)\circ\delta_X)(x)
&=D(f)(x,x)=(f(x),f(x)),\\
(\delta_Y\circ I(f))(x)
&=\delta_Y(f(x))=(f(x),f(x)).
\end{aligned}
$$

すべての $x$ で二写像の値が一致するため、$\delta:I\Rightarrow D$ は自然変換である。$X=\varnothing$ でも二経路は空集合からの唯一の写像になり、同じ結論が成り立つ。
<!-- definition-example-end -->

対して、各対象で射を選ぶだけでは自然とはいえない。二対象 $0,1$ と非恒等射 $u:0\to1$ だけを持つ圏 $\mathcal A$ を考える。関手 $F=G:\mathcal A\to\mathbf{Set}$ は両対象を $\{a,b\}$、$u$ を恒等写像に送るとする。成分候補を $\alpha_0=1_{\{a,b\}}$, $\alpha_1(a)=b$, $\alpha_1(b)=a$ と選ぶと

$$
(G(u)\circ\alpha_0)(a)=a,
\qquad
(\alpha_1\circ F(u))(a)=b.
$$

二経路が一致しないので、成分はどちらも全単射なのに自然変換ではない。「各成分がよい写像である」だけでは不十分なのである。

## 3. 自然性を有限個の射で調べる

自然性は定義上すべての射で要求するが、射を少数の基本射の合成として書ける圏では、基本射だけを調べればよい。この節では、ある射の集まり $E$ の射と恒等射を有限回合成することで、$\mathcal C$ の全射を表せるとき、$E$ を **合成による生成射の集まり** と呼ぶ。

<a id="prop-cat1-07-generators"></a>

<!-- formal-statement-start -->
> **命題（生成射による自然性判定）**  
> 圏 $\mathcal C$ のすべての射が、射の集まり $E$ に属する射と恒等射の有限回の合成で表せるとする。圏 $\mathcal D$ への共変関手 $F,G:\mathcal C\to\mathcal D$ と、各対象の射 $\alpha_A:F(A)\to G(A)$ を与える。このとき $\alpha$ が自然変換である必要十分条件は、$E$ のすべての射 $e:A\to B$ について

$$
G(e)\circ\alpha_A=\alpha_B\circ F(e)
$$

> が成り立つことである。
<!-- formal-statement-end -->

### 証明の見取り図

恒等射の四角形は関手の単位律で自動的に可換である。$f$ と $g$ の四角形が可換なら、二つの等式をつないで合成射 $g\circ f$ の四角形も可換になる。

<!-- proof-start -->
### 証明

自然変換なら定義より全射、特に $E$ の射に対して等式が成り立つ。

逆に $E$ で成り立つと仮定する。まず任意の対象 $A$ について、[関手の恒等射保存](../CAT1-06/index.md#def-cat1-06-functor)から

$$
G(1_A)\circ\alpha_A=1_{G(A)}\circ\alpha_A
=\alpha_A
=\alpha_A\circ1_{F(A)}
=\alpha_A\circ F(1_A).
$$

次に $f:A\to B$, $g:B\to C$ の各四角形が可換と仮定する。[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)と結合則を使うと

$$
\begin{aligned}
G(g\circ f)\circ\alpha_A
&=G(g)\circ G(f)\circ\alpha_A\\
&=G(g)\circ\alpha_B\circ F(f)\\
&=\alpha_C\circ F(g)\circ F(f)\\
&=\alpha_C\circ F(g\circ f).
\end{aligned}
$$

二行目は $f$ の自然性、三行目は $g$ の自然性である。よって生成射の合成の長さに関する帰納法で、すべての有限合成について自然性が成り立つ。仮定よりそれらは $\mathcal C$ の全射を尽くす。$\square$
<!-- proof-end -->

例えば $0\xrightarrow{u}1\xrightarrow{v}2$ の経路とその合成 $v\circ u$、恒等射だけがある圏なら、$u,v$ の四角形を確かめるだけで、$v\circ u$ の四角形は上の四行の計算から従う。

## 4. 自然同型と逆成分の自然性

今度は自然変換が「関手どうしの可逆な対応」を表す場合を考える。各対象での射 $\alpha_A$ が[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)だとしても、逆射を成分として並べたときに自然性が成立することを示さなければ、関手全体の可逆性はまだ言えない。

自然変換 $\alpha:F\Rightarrow G$ と $\beta:G\Rightarrow F$ を用意し、各対象 $A$ で $\beta_A\circ\alpha_A=1_{F(A)}$ および $\alpha_A\circ\beta_A=1_{G(A)}$ と要求する。これが成分ごとに往復して戻るという意味である。

<a id="def-cat1-07-natural-isomorphism"></a>

<!-- formal-statement-start -->
> **定義（自然同型）**  
> 圏 $\mathcal C,\mathcal D$ の共変関手 $F,G:\mathcal C\to\mathcal D$ と自然変換 $\alpha:F\Rightarrow G$ を考える。自然変換 $\beta:G\Rightarrow F$ が存在し、すべての対象 $A\in\mathcal C$ で

$$
\beta_A\circ\alpha_A=1_{F(A)},\qquad
\alpha_A\circ\beta_A=1_{G(A)}
$$

> を満たすとき、$\alpha$ を **自然同型**、$F,G$ を **自然同型な関手** という。$\beta$ を $\alpha$ の逆自然変換と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat1-07-natural-isomorphism -->
**定義の確認**（二つの座標の交換）。$D:\mathbf{Set}\to\mathbf{Set}$ を前節の直積二乗関手とする。各集合 $X$ に $\tau_X:X\times X\to X\times X$, $\tau_X(x,y)=(y,x)$ を与える。任意の $f:X\to Y$ について

$$
\begin{aligned}
(D(f)\circ\tau_X)(x,y)&=(f(y),f(x)),\\
(\tau_Y\circ D(f))(x,y)&=(f(y),f(x)).
\end{aligned}
$$

従って $\tau:D\Rightarrow D$ は自然変換である。また $\tau_X\circ\tau_X(x,y)=(x,y)$ なので、同じ自然変換 $\tau$ を $\beta$ に選べば両側の恒等式も満たす。よって $\tau$ は自然同型である。
<!-- definition-example-end -->

<a id="prop-cat1-07-componentwise-iso"></a>

<!-- formal-statement-start -->
> **命題（自然同型の成分判定と逆の自然性）**  
> 圏 $\mathcal C,\mathcal D$ と共変関手 $F,G:\mathcal C\to\mathcal D$ の自然変換 $\alpha:F\Rightarrow G$ に対し、次は同値である。
>
> 1. $\alpha$ は自然同型である。
> 2. すべての対象 $A\in\mathcal C$ で $\alpha_A:F(A)\to G(A)$ は $\mathcal D$ の同型射である。
>
> このとき逆自然変換は一意であり、その成分は $\beta_A=\alpha_A^{-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

自然同型なら定義の往復式がそのまま成分の逆射を与える。逆向きでは、自然性の等式を両側から逆成分で挟み、逆成分の四角形を作る。

<!-- proof-start -->
### 証明

1 を仮定する。[自然同型の定義](#def-cat1-07-natural-isomorphism)にある $\beta_A$ が $\alpha_A$ の左右両方の逆射だから、各 $\alpha_A$ は同型射である。

逆に 2 を仮定し、$\beta_A=\alpha_A^{-1}:G(A)\to F(A)$ を各対象に与える。任意の $f:A\to B$ で $\alpha$ の自然性から

$$
G(f)\circ\alpha_A=\alpha_B\circ F(f).
$$

この等式の左に $\alpha_B^{-1}$、右に $\alpha_A^{-1}$ を合成すると

$$
\begin{aligned}
\alpha_B^{-1}\circ G(f)\circ\alpha_A\circ\alpha_A^{-1}
&=\alpha_B^{-1}\circ\alpha_B\circ F(f)\circ\alpha_A^{-1},\\
\alpha_B^{-1}\circ G(f)\circ1_{G(A)}
&=1_{F(B)}\circ F(f)\circ\alpha_A^{-1},\\
\beta_B\circ G(f)&=F(f)\circ\beta_A.
\end{aligned}
$$

最後の式は $\beta:G\Rightarrow F$ の自然性である。[同型射の定義](../CAT1-03/index.md#def-cat1-03-isomorphism)から、各成分では次の両側逆の式も成り立つ。

$$
\beta_A\circ\alpha_A=1_{F(A)},\qquad
\alpha_A\circ\beta_A=1_{G(A)}.
$$

従って $\alpha$ は自然同型となる。

別の逆自然変換 $\gamma$ があれば、$\gamma_A$ も $\alpha_A$ の両側逆である。[逆射の一意性](../CAT1-03/index.md#prop-cat1-03-inverse-unique)より $\gamma_A=\beta_A$ が各対象で成立するから、$\gamma=\beta$ である。$\square$
<!-- proof-end -->

対角自然変換 $\delta:I\Rightarrow D$ は、例えば二元集合 $X=\{0,1\}$ で $\delta_X$ の像が $(0,0),(1,1)$ に限られ、$(0,1)$ が像に入らない。その成分は全単射でないため、[成分判定](#prop-cat1-07-componentwise-iso)から自然同型ではない。

## 5. 直積関手では自然変換をすべて分類できる

固定した集合 $S$ に対して $P_S(X)=X\times S$, $P_S(f)(x,s)=(f(x),s)$ と置く。恒等射と合成を成分別に計算すると

$$
P_S(1_X)(x,s)=(x,s),\qquad
P_S(g\circ f)(x,s)=(g(f(x)),s)
=\bigl(P_S(g)\circ P_S(f)\bigr)(x,s).
$$

従って $P_S:\mathbf{Set}\to\mathbf{Set}$ は関手である。写像 $h:S\to T$ があれば、$\eta_X(x,s)=(x,h(s))$ として自然変換 $P_S\Rightarrow P_T$ が作れそうだ。実はすべての自然変換がこの形に限られる。「任意の集合 $X$ で自然」という条件を、一元集合 $1=\{*\}$ で調べるのが鍵になる。

<a id="prop-cat1-07-product-classification"></a>

<!-- formal-statement-start -->
> **命題（直積関手の自然変換の分類）**  
> 集合 $S,T$ に対し、$\mathbf{Set}$ 上の共変関手を $P_S(X)=X\times S$, $P_T(X)=X\times T$、射への作用を $P_S(f)=f\times1_S$, $P_T(f)=f\times1_T$ と定める。このとき自然変換 $\eta:P_S\Rightarrow P_T$ は写像 $h:S\to T$ と一対一に対応し、その成分は

$$
\eta_X(x,s)=(x,h(s))
$$

> である。さらに $\eta$ が自然同型となる必要十分条件は $h$ が全単射であることである。
<!-- formal-statement-end -->

### 証明の見取り図

写像 $h$ から作る成分の自然性は二通りの順序で $f$ と $h$ を適用して確認する。逆に、一元集合 $1$ 上の $\eta_1$ が $h$ を決める。任意の $x\in X$ へ向かう $i_x:1\to X$ を自然性の四角形へ代入すると、$\eta_X(x,s)$ も強制される。

<!-- proof-start -->
### 証明

まず写像 $h:S\to T$ を一つ与える。各 $X$ の $\eta_X:X\times S\to X\times T$ を $\eta_X(x,s)=(x,h(s))$ とすると、任意の $f:X\to Y$ について

$$
\begin{aligned}
(P_T(f)\circ\eta_X)(x,s)
&=P_T(f)(x,h(s))=(f(x),h(s)),\\
(\eta_Y\circ P_S(f))(x,s)
&=\eta_Y(f(x),s)=(f(x),h(s)).
\end{aligned}
$$

よって $\eta$ は自然変換である。

逆に自然変換 $\eta:P_S\Rightarrow P_T$ を任意に取る。一元集合 $1=\{*\}$ に対し、$\eta_1:1\times S\to1\times T$ は第一成分を必ず $*$ に写すから、唯一の写像 $h:S\to T$ が存在して

$$
\eta_1(*,s)=(*,h(s))
$$

と書ける。集合 $X$ と $x\in X$ を任意に固定し、$i_x:1\to X$, $i_x(*)=x$ を用意する。[自然性](#def-cat1-07-natural-transformation)をこの $i_x$ に適用すると

$$
\eta_X\circ P_S(i_x)=P_T(i_x)\circ\eta_1.
$$

両辺を $(*,s)$ で評価して

$$
\begin{aligned}
\eta_X(x,s)
&=\eta_X\bigl(P_S(i_x)(*,s)\bigr)\\
&=P_T(i_x)\bigl(\eta_1(*,s)\bigr)
=P_T(i_x)(*,h(s))=(x,h(s)).
\end{aligned}
$$

すべての $(x,s)$ について形が確定した。$X=\varnothing$ では $X\times S=X\times T=\varnothing$ で、唯一の空写像が同じ形を与える。従って $h$ と $\eta$ は互いに一意に決め合う。

最後に $h$ が全単射なら逆写像 $h^{-1}:T\to S$ が存在する。その写像から作った自然変換の各成分は $\eta_X$ の両側逆であり、[成分判定](#prop-cat1-07-componentwise-iso)によって自然同型となる。

逆に $\eta$ が自然同型なら、成分 $\eta_1:1\times S\to1\times T$ は同型射である。[集合の圏における同型射の特徴づけ](../CAT1-03/index.md#prop-cat1-03-set-characterization)によって全単射となる。$\eta_1$ の表示

$$
(*,s)\longmapsto(*,h(s))
$$

から $h$ も全単射である。$\square$
<!-- proof-end -->

例えば $S=\{0,1\}$, $T=\{a,b\}$, $h(0)=a$, $h(1)=b$ なら各成分は対の第二成分だけを名前替えする全単射で、自然同型となる。一方 $h(0)=h(1)=a$ とすると自然変換ではあるが、$X=1$ で異なる二点 $(*,0),(*,1)$ が同一点へ移るため自然同型ではない。

### 5.1 恒等関手では勝手な変換を選べない

直積関手の分類の証明と同じ「一元集合から各点へ」という手法で、恒等関手の自然自己変換を決定できる。

<a id="prop-cat1-07-identity-only"></a>

<!-- formal-statement-start -->
> **命題（集合の恒等関手の自然自己変換）**  
> $\mathbf{Set}$ 上の恒等関手 $I:\mathbf{Set}\to\mathbf{Set}$ に対する自然変換 $\alpha:I\Rightarrow I$ は、各集合 $X$ の成分が恒等写像 $\alpha_X=1_X$ であるものに限る。
<!-- formal-statement-end -->

### 証明の見取り図

一元集合上の自己写像は恒等写像しかない。$1\to X$ が任意の点 $x$ を指定できるので、自然性が $\alpha_X(x)=x$ を要求する。

<!-- proof-start -->
### 証明

$1=\{*\}$ では唯一の写像 $1\to1$ は $1_1$ であるから $\alpha_1=1_1$。任意の集合 $X$ と $x\in X$ に対し $i_x:1\to X$ を $i_x(*)=x$ と定義する。$i_x$ の自然性より

$$
\alpha_X\circ i_x=i_x\circ\alpha_1=i_x.
$$

これを $*$ に適用すれば $\alpha_X(x)=x$。任意の $x$ で成立するので $\alpha_X=1_X$。$X=\varnothing$ にも唯一の自己写像が恒等射である。逆に成分をすべて恒等射に取れば、任意の $f:X\to Y$ に対して $f\circ1_X=1_Y\circ f$ なので自然変換になる。$\square$
<!-- proof-end -->

## 6. 一対象圏では「作用と可換」になる

[モノイドから作る一対象圏](../CAT1-02/index.md#prop-cat1-02-one-object)を $\mathcal M$ とし、その唯一の対象を $*$ とする。関手 $F:\mathcal M\to\mathbf{Set}$ の値 $X=F(*)$ に、モノイドの各元 $m$ は自己写像 $F(m):X\to X$ として作用する。別の関手 $G$ の値を $Y=G(*)$ とすると、自然変換には一つの成分 $T:X\to Y$ しかない。ただし自然性は全 $m$ について

$$
G(m)\circ T=T\circ F(m)
$$

を要求する。すなわち、先に作用してから $T$ で写しても、先に $T$ で写してから作用しても一致する。

特に加法モノイド $(\mathbb N,+,0)$ では $1$ が生成元であり、$u=F(1)$, $v=G(1)$ を指定すると、関手の合成保存より $F(n)=u^n$, $G(n)=v^n$ となる（$u^0=1_X$）。[生成射の判定](#prop-cat1-07-generators)から、自然性は

$$
v\circ T=T\circ u
$$

の一式で判定できる。この式を満たす写像を探すことは、無数の $n$ について四角形を描くことよりずっと簡単である。

## 7. 演習：自然性と成分の逆を実際に確かめる

### CAT1-07-A01 四角形の二経路

- Level: A

非恒等射 $u:0\to1$ だけを持つ二対象圏 $\mathcal A$ を考える。関手 $F,G:\mathcal A\to\mathbf{Set}$ を

$$
\begin{aligned}
F(0)&=\{0,1\},&F(1)&=\{a,b\},&
F(u)(0)&=a,&F(u)(1)&=a,\\
G(0)&=\{p,q\},&G(1)&=\{r,s\},&
G(u)(p)&=r,&G(u)(q)&=s
\end{aligned}
$$

とし、成分候補を $\alpha_0(0)=p$, $\alpha_0(1)=q$, $\alpha_1(a)=r$, $\alpha_1(b)=s$ とする。$\alpha$ は自然変換か。

<!-- solution-start -->
**詳細解答**。[自然性の定義](#def-cat1-07-natural-transformation)で、$G(u)\circ\alpha_0$ と $\alpha_1\circ F(u)$ はともに $F(0)\to G(1)$ である。$0$ に対しては

$$
G(u)(\alpha_0(0))=G(u)(p)=r
=\alpha_1(a)=\alpha_1(F(u)(0)).
$$

しかし $1$ に対して

$$
G(u)(\alpha_0(1))=G(u)(q)=s,\qquad
\alpha_1(F(u)(1))=\alpha_1(a)=r.
$$

$r\ne s$ なので四角形は可換でない。したがって自然変換ではない。
<!-- solution-end -->

### CAT1-07-A02 対角写像の二通りの経路

- Level: A

$X=\{0,1\}$, $Y=\{a\}$ とし、$f:X\to Y$ は定値写像とする。$I(X)=X$, $D(X)=X\times X$, $\delta_X(x)=(x,x)$ に対して、$x=0,1$ のそれぞれで $D(f)\delta_X(x)$ と $\delta_Y f(x)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$f(0)=f(1)=a$ だから、$x=0$ では

$$
D(f)(\delta_X(0))=D(f)(0,0)=(a,a),\qquad
\delta_Y(f(0))=\delta_Y(a)=(a,a).
$$

$x=1$ でも

$$
D(f)(\delta_X(1))=D(f)(1,1)=(a,a),\qquad
\delta_Y(f(1))=\delta_Y(a)=(a,a).
$$

両方の点で二経路が一致する。この有限例は[対角自然変換の検証](#def-cat1-07-natural-transformation)の具体的な代入である。
<!-- solution-end -->

### CAT1-07-A03 定値関手の自然性

- Level: A

$\mathcal A$ を $u:0\to1$ を持つ二対象圏とし、$F,G:\mathcal A\to\mathbf{Set}$ がそれぞれ両対象を集合 $S,T$ に、$u$ を恒等写像 $1_S,1_T$ に送るとする。写像 $\alpha_0,\alpha_1:S\to T$ が自然変換の成分となる条件を求めよ。

<!-- solution-start -->
**詳細解答**。$u$ の自然性を計算すると

$$
G(u)\circ\alpha_0=1_T\circ\alpha_0=\alpha_0,\qquad
\alpha_1\circ F(u)=\alpha_1\circ1_S=\alpha_1.
$$

従って必要条件は $\alpha_0=\alpha_1$。逆にこの等式があれば $u$ の自然性は成立し、恒等射の自然性は関手の単位律から成立するので、これで十分である。
<!-- solution-end -->

### CAT1-07-A04 全単射でない自然変換

- Level: A

$S=\{0,1\}$, $T=\{a,b\}$ とし、$h(0)=h(1)=a$ とする。直積関手 $P_S,P_T$ の間の $\eta_X(x,s)=(x,h(s))$ について、$X=\{x,y\}$ での値を列挙し、自然変換であるが自然同型でない理由を示せ。

<!-- solution-start -->
**詳細解答**。定義域の四点は $(x,0),(x,1),(y,0),(y,1)$ で、その像は順に

$$
(x,a),\quad(x,a),\quad(y,a),\quad(y,a).
$$

任意の $f:X\to Y$ について、先に $\eta$ を作用させると $(f(x),h(s))$、先に $P_S(f)$ を作用させても $(f(x),h(s))$ になるので、[自然変換の分類命題](#prop-cat1-07-product-classification)の構成により自然変換である。一方 $(x,0)\ne(x,1)$ なのに像は同じであり、$\eta_X$ は単射でない。[成分ごとの同型判定](#prop-cat1-07-componentwise-iso)に反し、自然同型ではない。
<!-- solution-end -->

### CAT1-07-A05 順序圏の自然変換

- Level: A

三点鎖 $P=\{0<1<2\}$ と三点鎖 $Q=\{a<b<c\}$ を順序圏とする。関手 $F,G:P\to Q$ は対象上で

$$
F(0)=a,\quad F(1)=a,\quad F(2)=b,\qquad
G(0)=b,\quad G(1)=c,\quad G(2)=c
$$

と定める。$F\Rightarrow G$ の自然変換は存在するか。また自然同型は存在するか。

<!-- solution-start -->
**詳細解答**。[順序圏における関手の判定](../CAT1-06/index.md#prop-cat1-06-order-monoid)を使う。$a\le a\le b$ と $b\le c\le c$ なので $F,G$ は関手である。

各対象 $i=0,1,2$ で $F(i)\le G(i)$ が成り立ち、成分には順に次の唯一の射を選べる。

$$
\alpha_0:a\to b,\qquad
\alpha_1:a\to c,\qquad
\alpha_2:b\to c.
$$

任意の $i\le j$ について、四角形の二経路はいずれも $F(i)\to G(j)$ の射である。順序圏の各Homは高々一元だから二経路は等しい。よって自然変換は存在する。

自然同型なら各成分が同型射でなければならない。しかし半順序圏で同型になるのは対象が等しい場合だけであり、例えば $F(0)=a\ne b=G(0)$ である。[自然同型の成分判定](#prop-cat1-07-componentwise-iso)から自然同型は存在しない。
<!-- solution-end -->

### CAT1-07-B01 逆成分の四角形

- Level: B

$F,G:\mathcal C\to\mathcal D$ と自然変換 $\alpha:F\Rightarrow G$ が与えられ、各 $\alpha_A$ は同型射であるとする。任意の $f:A\to B$ について、$\beta_A=\alpha_A^{-1}$ が自然性を満たすことを、合成の順序と射の型を明記して証明せよ。

<!-- solution-start -->
**詳細解答**。$\beta_A:G(A)\to F(A)$、$\beta_B:G(B)\to F(B)$ だから、示す二辺はともに $G(A)\to F(B)$ の射である。$\alpha$ の自然性は

$$
G(f)\circ\alpha_A=\alpha_B\circ F(f)
$$

という $F(A)\to G(B)$ の等式である。両辺に左から $\alpha_B^{-1}:G(B)\to F(B)$、右から $\alpha_A^{-1}:G(A)\to F(A)$ を合成すると

$$
\begin{aligned}
\alpha_B^{-1}G(f)\alpha_A\alpha_A^{-1}
&=\alpha_B^{-1}\alpha_B F(f)\alpha_A^{-1},\\
\alpha_B^{-1}G(f)&=F(f)\alpha_A^{-1}.
\end{aligned}
$$

左右の逆射の合成は恒等射である。従って $\beta_B\circ G(f)=F(f)\circ\beta_A$ が任意の $f$ で成り立ち、$\beta$ は自然変換となる。
<!-- solution-end -->

### CAT1-07-B02 一元集合が恒等自然変換を決める

- Level: B

$I:\mathbf{Set}\to\mathbf{Set}$ を恒等関手とする。自然変換 $\alpha:I\Rightarrow I$ に対し、$X=\{a,b,c\}$ の成分 $\alpha_X$ を自然性だけから決定せよ。さらに空集合と任意の集合へ一般化せよ。

<!-- solution-start -->
**詳細解答**。一元集合 $1=\{*\}$ では自己写像が一つなので $\alpha_1=1_1$。各 $x=a,b,c$ に対して $i_x:1\to X$, $i_x(*)=x$ を取る。自然性より

$$
\alpha_X\circ i_x=i_x\circ\alpha_1=i_x.
$$

$*$ に代入すると $\alpha_X(a)=a$, $\alpha_X(b)=b$, $\alpha_X(c)=c$ となり、$\alpha_X=1_X$。

一般の非空集合 $X$ でも各 $x\in X$ に $i_x$ を取ると同じ計算で $\alpha_X(x)=x$ となる。空集合には唯一の自己写像しかないので、やはり $\alpha_{\varnothing}=1_{\varnothing}$ である。これ以外の自然自己変換はない。
<!-- solution-end -->

### CAT1-07-B03 二本の射から合成射へ

- Level: B

圏 $\mathcal C$ は対象 $0,1,2$、射 $u:0\to1$, $v:1\to2$, $w=v\circ u:0\to2$ と恒等射だけを持つ。共変関手 $F,G:\mathcal C\to\mathcal D$ と成分族 $\alpha_i:F(i)\to G(i)$ が $u,v$ の自然性を満たすとき、$w$ と恒等射の自然性をすべて導け。

<!-- solution-start -->
**詳細解答**。仮定は $G(u)\alpha_0=\alpha_1F(u)$ および $G(v)\alpha_1=\alpha_2F(v)$ である。[関手の合成保存](../CAT1-06/index.md#def-cat1-06-functor)と結合則を使い

$$
\begin{aligned}
G(w)\alpha_0
&=G(v)G(u)\alpha_0\\
&=G(v)\alpha_1F(u)\\
&=\alpha_2F(v)F(u)\\
&=\alpha_2F(w).
\end{aligned}
$$

二、三行目は順に $u,v$ への仮定を用いた。各 $i$ の恒等射では

$$
G(1_i)\alpha_i=1_{G(i)}\alpha_i
=\alpha_i1_{F(i)}=\alpha_iF(1_i)
$$

だから、すべての射で自然性が成立する。
<!-- solution-end -->

### CAT1-07-B04 射影が唯一の自然な忘却方法

- Level: B

空でない集合 $S$ を固定する。$P_S(X)=X\times S$, $P_S(f)=f\times1_S$ と恒等関手 $I(X)=X$, $I(f)=f$ の間の自然変換 $\eta:P_S\Rightarrow I$ をすべて求めよ。また、$S$ が二元以上なら自然同型にならないことを示せ。

<!-- solution-start -->
**詳細解答**。一元集合 $1=\{*\}$ への成分は $\eta_1:1\times S\to1$ だから、$s\in S$ に関係なく $\eta_1(*,s)=*$ である。任意の集合 $X$ と $x\in X$ に対し、$i_x:1\to X$ を $i_x(*)=x$ とする。自然性

$$
\eta_X\circ P_S(i_x)=I(i_x)\circ\eta_1
$$

を $(*,s)$ に適用すると

$$
\eta_X(x,s)=i_x(\eta_1(*,s))=i_x(*)=x.
$$

従って非空集合 $X$ で自然変換の候補は第一射影 $\pi_X(x,s)=x$ しかない。$X=\varnothing$ でも始域 $\varnothing\times S$ と終域 $\varnothing$ の間には唯一の写像しかないので同じ結論になる。逆に任意の $f:X\to Y$ で

$$
\pi_Y(P_S(f)(x,s))=\pi_Y(f(x),s)=f(x)
=f(\pi_X(x,s))
$$

なので $\pi$ は自然変換である。$S$ に相異なる $s,t$ があれば $X=1$ で $(*,s)$ と $(*,t)$ の像がともに $*$ になる。成分 $\pi_1$ が単射でないため[成分判定](#prop-cat1-07-componentwise-iso)で自然同型ではない。
<!-- solution-end -->

### CAT1-07-C01 一対象圏の自然変換を分類する

- Level: C

加法モノイド $(\mathbb N,+,0)$ を一対象圏 $\mathcal M$ とする。関手 $F,G:\mathcal M\to\mathbf{Set}$ は唯一の対象をそれぞれ $X=\{0,1\}$ と $Y=\{a,b,c\}$ に送り、生成射 $1\in\mathbb N$ を

$$
u:X\to X,\quad u(0)=1,\ u(1)=0,
\qquad
v:Y\to Y,\quad v(a)=b,\ v(b)=a,\ v(c)=c
$$

に送る。残りの射 $n$ には $F(n)=u^n$, $G(n)=v^n$ を割り当てる。

1. これらが関手であることを証明せよ。
2. 自然変換 $\alpha:F\Rightarrow G$ をすべて列挙し、自然同型の有無を決定せよ。
3. $Y'=\{a,b\}$ とし、$v'$ を $a,b$ の交換写像とした関手 $G'$ への自然同型 $F\Rightarrow G'$ をすべて求めよ。

<!-- solution-start -->
**詳細解答**。

1. $u^0=1_X$, $v^0=1_Y$ だから恒等射 $0$ の保存が成立する。加法モノイドの射 $m,n$ の合成は $m+n$ であり、冪の法則から

   $$
   F(m+n)=u^{m+n}=u^m\circ u^n=F(m)\circ F(n),
   $$

   同じく $G(m+n)=v^m\circ v^n$。従って[関手の二公理](../CAT1-06/index.md#def-cat1-06-functor)が成立する。

2. 自然変換の成分は一つの写像 $T:X\to Y$。自然性は生成射 $1$ について $vT=Tu$ を満たせば、[生成射の判定](#prop-cat1-07-generators)により全 $n$ へ広がる。$T(0)=y$ と置くと、$0$ への等式から

   $$
   T(1)=T(u(0))=v(T(0))=v(y).
   $$

   さらに $1$ への等式は $T(0)=v(T(1))=v^2(y)$ であり、$v^2=1_Y$ なので必ず成り立つ。従って $y=a,b,c$ の三通りがすべてであり、成分は

   $$
   \begin{array}{c|cc}
   &T(0)&T(1)\\ \hline
   T_a&a&b\\
   T_b&b&a\\
   T_c&c&c
   \end{array}
   $$

   である。$X$ は二元、$Y$ は三元なので、どの $T$ も全単射ではない。[自然同型の成分判定](#prop-cat1-07-componentwise-iso)より自然同型は存在しない。

3. $G'$ に対しても自然性は $v'T=Tu$ である。$T(0)=a$ なら $T(1)=b$、$T(0)=b$ なら $T(1)=a$ であり、これ以外はない。二つの $T$ はともに全単射で、上の計算により自然変換だから[成分判定](#prop-cat1-07-componentwise-iso)で自然同型である。逆成分も各全単射の逆写像であり、自然性が保証される。
<!-- solution-end -->

## 8. 次の講義へ

自然変換は関手の間にも射のような合成を考える入口になる。次の **CAT1-08「関手圏と水平・垂直合成」** では、自然変換を実際に合成し、関手圏の公理と二種類の合成の交換法則を検証する。
