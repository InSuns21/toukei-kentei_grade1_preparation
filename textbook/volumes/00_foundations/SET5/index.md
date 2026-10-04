# SET5 累積階層と rank：集合はどの段階で現れるか

<!-- definition-example-audit: strict -->

SET1 では正則性公理を「所属関係が下向きに循環しない」ための公理として見ました。SET4 では、順序数の全段階にわたって対象を作る超限再帰を得ました。

この二つを組み合わせると、集合宇宙を

$$
V_0,\ V_1,\ V_2,\ldots,V_\omega,\ldots
$$

という段階に分けて眺められます。

直感は単純です。

- 最初は何もない。
- 次の段階では、前段階の部分集合を全部許す。
- 極限段階では、それまでの段階を全部合併する。

この「下から積み上げる」見方により、各集合がどの高さで現れるかを **rank** で測れます。

---

## 1. 累積階層を超限再帰で作る

<a id="def-set5-cumulative-hierarchy"></a>
<!-- formal-statement-start -->
### 定義（累積階層）

順序数 $\alpha$ に対して集合 $V_\alpha$ を超限再帰で

$$
V_0=\varnothing,
$$

$$
V_{\alpha+1}
=
\mathcal P(V_\alpha),
$$

非零極限順序数 $\lambda$ に対して

$$
V_\lambda
=
\bigcup_{\beta<\lambda}V_\beta
$$

と定める。

この族 $(V_\alpha)$ を **累積階層** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set5-cumulative-hierarchy -->
**定義の確認：最初の段階。**

$$
V_0=\varnothing.
$$

したがって

$$
V_1=\mathcal P(\varnothing)=\{\varnothing\}=\{0\}.
$$

さらに

$$
V_2
=
\mathcal P(V_1)
=
\{\varnothing,\{\varnothing\}\}
=
\{0,1\}.
$$

$V_3=\mathcal P(V_2)$ には4個の元があり、

$$
V_3
=
\{\varnothing,\{0\},\{1\},\{0,1\}\}.
$$

有限段階でも「前段階そのもの」ではなく、その **全部分集合** が次段階になることに注意してください。
<!-- definition-example-end -->

---

## 2. 段階は単調に増える

<a id="thm-set5-hierarchy-monotone"></a>
<!-- formal-statement-start -->
### 定理（累積階層の単調性）

順序数 $\alpha\le\beta$ に対して

$$
V_\alpha\subseteq V_\beta.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず任意の $\gamma$ について

$$
V_\gamma\subseteq V_{\gamma+1}
$$

を示します。

$x\in V_\gamma$ とします。累積階層の各段階が推移的であることも同時に超限帰納法で示せます。

$V_0$ は推移的です。$V_\gamma$ が推移的なら、$x\in V_\gamma$ から

$$
x\subseteq V_\gamma,
$$

従って

$$
x\in\mathcal P(V_\gamma)=V_{\gamma+1}.
$$

極限段階では推移的集合の増大列の合併なので推移性が保たれます。

したがって各段階で

$$
V_\gamma\subseteq V_{\gamma+1}.
$$

$\alpha\le\beta$ の場合、$\beta$ に関する超限帰納法を使います。

- $\beta=\alpha$ なら自明。
- 後続段階では包含の推移性を使う。
- 極限段階 $\lambda$ で $\alpha<\lambda$ なら
  $$
  V_\alpha
  \subseteq
  \bigcup_{\gamma<\lambda}V_\gamma
  =
  V_\lambda.
  $$

従って

$$
V_\alpha\subseteq V_\beta.
$$

$\square$
<!-- proof-end -->

この証明で「$V_\alpha$ は推移的」も同時に得ています。

<a id="cor-set5-hierarchy-transitive"></a>
<!-- formal-statement-start -->
### 系（累積階層の各段階は推移的）

任意の順序数 $\alpha$ に対し $V_\alpha$ は推移的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直前の定理では、$V_\gamma\subseteq V_{\gamma+1}$ を示すのと同時に、

- $V_0$ は推移的、
- $V_\gamma$ が推移的なら $V_{\gamma+1}=\mathcal P(V_\gamma)$ も推移的、
- 極限段階では推移的な増大列の合併も推移的

であることを超限帰納法で確認しました。従って全ての $\alpha$ で $V_\alpha$ は推移的です。$\square$
<!-- proof-end -->

---

## 3. rank を定義する前に、所属関係の下を集合として集める

ある集合 $x$ の rank を決めるには、$x$ の元、その元の元、そのまた元、と下へたどる必要があります。

<a id="def-set5-transitive-closure"></a>
<!-- formal-statement-start -->
### 定義（推移閉包）

集合 $x$ に対し、

$$
T_0(x)=x,
\qquad
T_{n+1}(x)=\bigcup T_n(x)
$$

と自然数上の再帰で定め、

$$
\operatorname{TC}(x)
=
\bigcup_{n<\omega}T_n(x)
$$

と置く。

これを $x$ の **推移閉包** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set5-transitive-closure -->
**定義の確認。**

$$
x=\{\{0\}\}
$$

なら

$$
T_0(x)=\{\{0\}\},
$$

$$
T_1(x)=\{0\},
$$

$$
T_2(x)=\varnothing.
$$

従って

$$
\operatorname{TC}(x)
=
\{\{0\},0\}.
$$

$x$ から所属関係を下へたどって到達できる集合が全部入っています。
<!-- definition-example-end -->

置換公理図式で列 $(T_n(x))_{n<\omega}$ の値を集合として集め、和集合公理でその合併を取るため、$\operatorname{TC}(x)$ は集合です。

---

## 4. 正則性は所属関係を well-founded にする

正則性公理は「非空集合の中に、同じ集合の元を自分の元として持たない点がある」と言っていました。rank を再帰的に定めるには、この仕組みを所属関係だけでなく一般の関係について使える形にしたいので、まず「前へ無限に降り続けない」関係を定義します。

<a id="def-set5-well-founded-relation"></a>
<!-- formal-statement-start -->
### 定義（整礎関係）

集合 $A$ 上の関係 $R$ が **整礎的** であるとは、任意の非空部分集合 $B\subseteq A$ が

$$
\text{$R$ に関して $B$ 内に先行元を持たない元}
$$

を少なくとも一つ持つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-set5-well-founded-relation -->
**定義の確認。** 正則性公理を集合 $B$ に適用すると、ある $x\in B$ が

$$
x\cap B=\varnothing
$$

を満たします。

これは

$$
y\in x
\quad\text{かつ}\quad
y\in B
$$

となる $y$ が存在しないことです。従って所属関係 $\in$ は、任意の集合上で整礎的です。
<!-- definition-example-end -->

超限再帰と同じ「近似を貼り合わせる」証明を整礎関係へ移すと、次が得られます。

<a id="thm-set5-well-founded-recursion"></a>
<!-- formal-statement-start -->
### 定理（整礎再帰）

集合 $A$ 上の整礎関係 $R$ を考える。各 $x\in A$ に対し、

$$
\operatorname{Pred}(x)
=
\{y\in A:yRx\}
$$

と置く。

各 $x\in A$ と、定義域が $\operatorname{Pred}(x)$ である任意の関数 $h$ に対して、一意な集合 $G(x,h)$ が定まる規則 $G$ があるとする。

このとき一意な関数 $F:A\to V$ が存在して、全ての $x\in A$ で

$$
\boxed{
F(x)
=
G\!\left(
x,\,
F|_{\operatorname{Pred}(x)}
\right)
}
$$

を満たす。ここで $V$ は「全ての集合」を表すメタ言語上の記号であり、集合として仮定しているわけではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

証明では、ある点 $x$ の値を決めるには $x$ より前の点の値が全部必要なので、$x$ から $R$ を下向きにたどって到達する部分を一つの集合として扱います。

まず

$$
D_0(x)=\{x\}
$$

とし、

$$
D_{n+1}(x)
=
D_n(x)
\cup
\{y\in A:\exists z\in D_n(x),\ yRz\}
$$

と自然数上の再帰で定めます。置換公理図式と和集合公理により

$$
D(x)
=
\bigcup_{n<\omega}D_n(x)
$$

は集合です。

$D(x)$ は $x$ を含み、$R$-前者をすべて含みます。実際 $z\in D(x)$ かつ $yRz$ なら、ある $n$ で $z\in D_n(x)$ なので

$$
y\in D_{n+1}(x)\subseteq D(x).
$$

### 1. $R$-前者包含集合上の解は一意

$D,E\subseteq A$ を $R$-前者をすべて含む集合とし、$f$ が $D$ 上、$g$ が $E$ 上で再帰式を満たすとします。

共通部分で値が違う点の集合

$$
B
=
\{x\in D\cap E:f(x)\ne g(x)\}
$$

が非空だと仮定します。

$R$ は整礎的なので、$B$ に $R$-極小元 $x_0$ が存在します。

$yRx_0$ なら $D,E$ の$R$-前者包含性から $y\in D\cap E$ です。また $x_0$ の極小性から

$$
f(y)=g(y).
$$

従って

$$
f|_{\operatorname{Pred}(x_0)}
=
g|_{\operatorname{Pred}(x_0)}.
$$

両方が再帰式を満たすので、

$$
\begin{aligned}
f(x_0)
&=
G\!\left(x_0,f|_{\operatorname{Pred}(x_0)}\right)\\
&=
G\!\left(x_0,g|_{\operatorname{Pred}(x_0)}\right)\\
&=
g(x_0),
\end{aligned}
$$

となり $x_0\in B$ に矛盾します。

従って二つの部分解は共通定義域で必ず一致します。

### 2. 各点には局所解が存在する

$x\in A$ に対し、$D(x)$ 上で再帰式を満たす関数が存在するとき、$x$ を **良い点** と呼びます。

良くない点の集合

$$
C
=
\{x\in A:x\text{ は良くない}\}
$$

が非空だと仮定し、整礎性から $R$-極小元 $x_0\in C$ を取ります。

$yRx_0$ なら $x_0$ の極小性から $y$ は良い点です。したがって $D(y)$ 上の局所解 $f_y$ が存在します。前段で示した一意性から、この $f_y$ は一意であり、異なる $y,zRx_0$ に対しても

$$
f_y=f_z
$$

が共通定義域上で成り立ちます。

よって置換公理図式で局所解族

$$
\{f_y:yRx_0\}
$$

を集合として集め、その和集合

$$
h
=
\bigcup_{yRx_0}f_y
$$

を取れます。両立性から $h$ は関数です。

その定義域は

$$
D(x_0)\setminus\{x_0\}
$$

です。実際、$x_0$ より下にある点は、最初の一歩である何らかの $yRx_0$ の$R$-前者をたどって得る集合 $D(y)$ に入ります。

そこで

$$
v
=
G\!\left(
x_0,\,
h|_{\operatorname{Pred}(x_0)}
\right)
$$

と置き、

$$
f_{x_0}
=
h\cup\{(x_0,v)\}
$$

とします。

$h$ は $x_0$ より下の各点で再帰式を満たし、$x_0$ では $v$ の定義そのものから再帰式を満たします。従って $f_{x_0}$ は $D(x_0)$ 上の局所解です。

これは $x_0$ が良くないという仮定に反します。

よって全ての $x\in A$ が良い点です。

### 3. 局所解を貼り合わせる

各 $x\in A$ には一意な局所解 $f_x$ が存在します。

置換公理図式で

$$
\{f_x:x\in A\}
$$

を集合として集め、

$$
F
=
\bigcup_{x\in A}f_x
$$

と置きます。

局所解どうしは共通定義域で一致するので、$F$ は関数です。また $x\in D(x)$ だから定義域は $A$ 全体です。

任意の $x\in A$ に対し、$F$ と $f_x$ は $D(x)$ 上で一致します。従って

$$
F(x)
=
G\!\left(
x,\,
F|_{\operatorname{Pred}(x)}
\right).
$$

これで存在が示されました。

最後に $F,F'$ がともに $A$ 上の解なら、第1段の一意性を $D=E=A$ に適用して

$$
F=F'.
$$

よって解は一意です。$\square$
<!-- proof-end -->

この定理は新しい選択原理ではありません。正則性による整礎性と、置換による値集合の形成を使っています。

---

## 5. rank

所属関係 $\in$ は $\operatorname{TC}(\{x\})$ 上で整礎的です。そこで整礎再帰を使って、各集合へ順序数を割り当てます。

<a id="def-set5-rank"></a>
<!-- formal-statement-start -->
### 定義（集合の rank）

集合 $x$ の **rank** を

$$
\operatorname{rank}(x)
=
\sup\{
\operatorname{rank}(y)+1
:
y\in x
\}
$$

という整礎再帰で定める。

空集合では右辺が空なので

$$
\operatorname{rank}(\varnothing)=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-set5-rank -->
**定義の確認。**

$$
\operatorname{rank}(0)=0.
$$

$1=\{0\}$ なので

$$
\operatorname{rank}(1)
=
\operatorname{rank}(0)+1
=
1.
$$

$2=\{0,1\}$ では

$$
\operatorname{rank}(2)
=
\sup\{1,2\}
=
2.
$$

同様に有限 von Neumann 順序数 $n$ では

$$
\operatorname{rank}(n)=n.
$$
<!-- definition-example-end -->

ここで順序数の集合を一つの順序数へまとめるには和集合を使えます。順序数の集合 $A$ に対し

$$
\sup A=\bigcup A
$$

は順序数です。

---

## 6. rank と累積階層は一致する

<a id="thm-set5-rank-stage"></a>
<!-- formal-statement-start -->
### 定理（rank と累積階層）

任意の集合 $x$ に対して

$$
x\subseteq V_{\operatorname{rank}(x)}
$$

であり、従って

$$
x\in V_{\operatorname{rank}(x)+1}.
$$

さらに $\operatorname{rank}(x)$ は

$$
x\subseteq V_\alpha
$$

を満たす最小の順序数 $\alpha$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず補助事実として、任意の順序数 $\alpha$ について

$$
y\in V_\alpha
\Longrightarrow
\operatorname{rank}(y)<\alpha
$$

を $\alpha$ に関する超限帰納法で示します。

$\alpha=0$ では $V_0=\varnothing$ なので主張は空虚です。

$\alpha=\beta+1$ とします。$y\in V_{\beta+1}$ なら

$$
y\subseteq V_\beta.
$$

各 $z\in y$ について、帰納法の仮定から

$$
\operatorname{rank}(z)<\beta
$$

です。従って

$$
\operatorname{rank}(z)+1\le\beta.
$$

これらの順序数をまとめれば

$$
\operatorname{rank}(y)
=
\sup_{z\in y}
(\operatorname{rank}(z)+1)
\le\beta
<
\beta+1.
$$

$\alpha=\lambda$ が極限順序数なら、$y\in V_\lambda$ からある $\beta<\lambda$ が存在して

$$
y\in V_\beta.
$$

帰納法の仮定より

$$
\operatorname{rank}(y)<\beta<\lambda.
$$

これで補助事実が示されました。

次に、$x$ の所属関係に沿う整礎帰納法で

$$
x\subseteq V_{\operatorname{rank}(x)}
$$

を示します。

$y\in x$ とします。帰納法の仮定から

$$
y\subseteq V_{\operatorname{rank}(y)},
$$

従って

$$
y\in V_{\operatorname{rank}(y)+1}.
$$

rank の定義から

$$
\operatorname{rank}(y)+1
\le
\operatorname{rank}(x).
$$

累積階層の単調性より

$$
V_{\operatorname{rank}(y)+1}
\subseteq
V_{\operatorname{rank}(x)}.
$$

したがって

$$
y\in V_{\operatorname{rank}(x)}.
$$

これは全ての $y\in x$ について成り立つので、

$$
x\subseteq V_{\operatorname{rank}(x)}.
$$

冪集合の定義から

$$
x\in
\mathcal P(V_{\operatorname{rank}(x)})
=
V_{\operatorname{rank}(x)+1}.
$$

最後に最小性を示します。$x\subseteq V_\alpha$ と仮定します。

任意の $y\in x$ について $y\in V_\alpha$ なので、最初に示した補助事実から

$$
\operatorname{rank}(y)<\alpha.
$$

従って

$$
\operatorname{rank}(y)+1\le\alpha.
$$

全ての $y\in x$ について上式が成り立つため、

$$
\operatorname{rank}(x)
=
\sup_{y\in x}
(\operatorname{rank}(y)+1)
\le\alpha.
$$

一方、既に

$$
x\subseteq V_{\operatorname{rank}(x)}
$$

を示しています。

従って $\operatorname{rank}(x)$ は条件を満たす最小の順序数です。$\square$
<!-- proof-end -->

<a id="cor-set5-every-set-in-hierarchy"></a>
<!-- formal-statement-start -->
### 系（全ての集合は累積階層のどこかに現れる）

任意の集合 $x$ に対して、ある順序数 $\alpha$ が存在し

$$
x\in V_\alpha.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

直前の定理から

$$
x\in V_{\operatorname{rank}(x)+1}.
$$

従って

$$
\alpha=\operatorname{rank}(x)+1
$$

と取ればよいです。$\square$
<!-- proof-end -->

この主張は「全ての $V_\alpha$ を集めた集合 $V$ が存在する」という意味ではありません。全ての順序数にわたる累積階層全体は真の類として扱います。

---

## 7. 正則性公理との接続

rank の式

$$
\operatorname{rank}(x)
=
\sup_{y\in x}
(\operatorname{rank}(y)+1)
$$

から、$y\in x$ なら

$$
\operatorname{rank}(y)
<
\operatorname{rank}(x)
$$

です。

つまり所属関係を一段下へ進むたびに rank が厳密に小さくなります。

もし

$$
x_0\ni x_1\ni x_2\ni\cdots
$$

という無限下降があれば、

$$
\operatorname{rank}(x_0)
>
\operatorname{rank}(x_1)
>
\operatorname{rank}(x_2)
>
\cdots
$$

という順序数の無限下降が生じます。しかし順序数は整列されているため、そのような下降列は存在しません。

この見方により、正則性公理の「循環を排除する」という役割が数値化されます。

---

## 8. 演習

### Level A

<a id="ex-set5-a01"></a>
#### SET5-A01 $V_0,V_1,V_2,V_3$ を書く
- Level: A

累積階層の最初の4段階を具体的に書け。

<!-- solution-start -->
#### 詳細解答

定義から

$$
V_0=\varnothing.
$$

次に

$$
V_1
=
\mathcal P(V_0)
=
\{\varnothing\}.
$$

さらに

$$
V_2
=
\mathcal P(V_1)
=
\{\varnothing,\{\varnothing\}\}.
$$

$V_2$ には2個の元があるため、その冪集合は4個の元を持ち、

$$
V_3
=
\{
\varnothing,
\{\varnothing\},
\{\{\varnothing\}\},
\{\varnothing,\{\varnothing\}\}
\}.
$$
<!-- solution-end -->

<a id="ex-set5-a02"></a>
#### SET5-A02 有限順序数の rank
- Level: A

$0,1,2,3$ の rank を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
\operatorname{rank}(0)=0.
$$

$1=\{0\}$ なので

$$
\operatorname{rank}(1)=0+1=1.
$$

$2=\{0,1\}$ なので

$$
\operatorname{rank}(2)
=
\sup\{1,2\}
=
2.
$$

$3=\{0,1,2\}$ なので

$$
\operatorname{rank}(3)
=
\sup\{1,2,3\}
=
3.
$$
<!-- solution-end -->

<a id="ex-set5-a03"></a>
#### SET5-A03 元を下ると rank が下がる
- Level: A

$y\in x$ なら

$$
\operatorname{rank}(y)<\operatorname{rank}(x)
$$

を rank の定義から示せ。

<!-- solution-start -->
#### 詳細解答

rank の定義は

$$
\operatorname{rank}(x)
=
\sup_{z\in x}
(\operatorname{rank}(z)+1).
$$

$y\in x$ なので、上限を取る集合の中に

$$
\operatorname{rank}(y)+1
$$

が含まれます。従って

$$
\operatorname{rank}(y)+1
\le
\operatorname{rank}(x).
$$

よって

$$
\operatorname{rank}(y)
<
\operatorname{rank}(x).
$$
<!-- solution-end -->

<a id="ex-set5-a04"></a>
#### SET5-A04 極限段階 $V_\omega$
- Level: A

$$
V_\omega
=
\bigcup_{n<\omega}V_n
$$

が、全ての有限段階を含むことを説明せよ。

<!-- solution-start -->
#### 詳細解答

$\omega$ は極限順序数なので累積階層の定義から

$$
V_\omega
=
\bigcup_{n<\omega}V_n.
$$

従って各有限 $n$ に対して

$$
V_n\subseteq V_\omega.
$$

$V_\omega$ は新しい冪集合を一度取った段階ではなく、それまでの有限段階を全て合併した極限段階です。
<!-- solution-end -->

### Level B

<a id="ex-set5-b01"></a>
#### SET5-B01 累積階層の推移性
- Level: B

任意の順序数 $\alpha$ について $V_\alpha$ が推移的であることを、$0$、後続、極限の三段階に分けて示せ。

<!-- solution-start -->
#### 詳細解答

超限帰納法を使います。

**初期段階。**

$$
V_0=\varnothing
$$

は推移的です。

**後続段階。**

$V_\alpha$ が推移的と仮定します。

$y\in V_{\alpha+1}$ なら

$$
y\in\mathcal P(V_\alpha),
$$

従って

$$
y\subseteq V_\alpha.
$$

また単調性から

$$
V_\alpha\subseteq V_{\alpha+1}.
$$

よって

$$
y\subseteq V_{\alpha+1},
$$

したがって $V_{\alpha+1}$ は推移的です。

**極限段階。**

$\lambda$ を極限順序数とし、各 $\beta<\lambda$ で $V_\beta$ が推移的とします。

$y\in V_\lambda$ なら、ある $\beta<\lambda$ で $y\in V_\beta$。推移性から

$$
y\subseteq V_\beta\subseteq V_\lambda.
$$

従って $V_\lambda$ も推移的です。
<!-- solution-end -->

<a id="ex-set5-b02"></a>
#### SET5-B02 推移閉包が推移的であること
- Level: B

$$
\operatorname{TC}(x)
=
\bigcup_{n<\omega}T_n(x),
\qquad
T_{n+1}(x)=\bigcup T_n(x)
$$

が推移的であることを示せ。

<!-- solution-start -->
#### 詳細解答

$z\in y\in\operatorname{TC}(x)$ とします。

$y\in\operatorname{TC}(x)$ なので、ある $n<\omega$ があって

$$
y\in T_n(x).
$$

$z\in y$ だから、和集合の定義より

$$
z\in\bigcup T_n(x)
=
T_{n+1}(x).
$$

従って

$$
z\in
\bigcup_{m<\omega}T_m(x)
=
\operatorname{TC}(x).
$$

よって推移的です。
<!-- solution-end -->

<a id="ex-set5-b03"></a>
#### SET5-B03 rank から出現段階を決める
- Level: B

$\operatorname{rank}(x)=\alpha$ とする。なぜ

$$
x\in V_{\alpha+1}
$$

であるか説明せよ。

<!-- solution-start -->
#### 詳細解答

rank と累積階層の定理から

$$
x\subseteq V_{\operatorname{rank}(x)}
=
V_\alpha.
$$

冪集合の定義により

$$
x\in\mathcal P(V_\alpha).
$$

累積階層の後続段階は

$$
V_{\alpha+1}
=
\mathcal P(V_\alpha)
$$

なので、

$$
x\in V_{\alpha+1}.
$$
<!-- solution-end -->

### Level C

<a id="ex-set5-c01"></a>
#### SET5-C01 「全ての集合はどこかの $V_\alpha$ に現れる」を再構成する
- Level: C

次の順序で証明を再構成せよ。

1. $\operatorname{TC}(\{x\})$ が集合である。
2. 正則性から $\in$ がその上で整礎的である。
3. 整礎再帰で rank を定義する。
4. $y\in x$ なら rank が下がる。
5. $x\subseteq V_{\operatorname{rank}(x)}$ を示す。
6. $x\in V_{\operatorname{rank}(x)+1}$ を結論する。

<!-- solution-start -->
#### 詳細解答

**1. 推移閉包。**

自然数上の再帰で

$$
T_0(\{x\})=\{x\},
\qquad
T_{n+1}(\{x\})=\bigcup T_n(\{x\})
$$

を作ります。置換公理図式で値の集合を集め、和集合公理で合併することで

$$
\operatorname{TC}(\{x\})
$$

は集合です。

**2. 整礎性。**

任意の非空部分集合 $B$ に正則性公理を適用すると、ある $b\in B$ が

$$
b\cap B=\varnothing
$$

を満たします。従って $\in$ は整礎的です。

**3. rank。**

整礎再帰で

$$
\operatorname{rank}(z)
=
\sup_{y\in z}
(\operatorname{rank}(y)+1)
$$

を $\operatorname{TC}(\{x\})$ 上に定義します。

**4. rank の減少。**

$y\in z$ なら上限の定義から

$$
\operatorname{rank}(y)+1
\le
\operatorname{rank}(z),
$$

従って rank は厳密に下がります。

**5. 累積階層への包含。**

所属関係に沿う整礎帰納法を使います。$y\in z$ について帰納法の仮定から

$$
y\in V_{\operatorname{rank}(y)+1}.
$$

また

$$
\operatorname{rank}(y)+1
\le
\operatorname{rank}(z)
$$

なので単調性から

$$
y\in V_{\operatorname{rank}(z)}.
$$

全ての $y\in z$ で成り立つため

$$
z\subseteq V_{\operatorname{rank}(z)}.
$$

特に $z=x$ とします。

**6. 出現段階。**

$$
x\subseteq V_{\operatorname{rank}(x)}
$$

なので

$$
x\in
\mathcal P(V_{\operatorname{rank}(x)})
=
V_{\operatorname{rank}(x)+1}.
$$

これで任意の集合が累積階層のどこかに現れることが示されました。
<!-- solution-end -->

---

## 9. 次章への接続

累積階層は集合を「いつ現れるか」で整理しました。

次章では別の問いを考えます。

> 集合の大きさを、順序の形ではなく **全単射で変わらない大きさ** としてどう標準化するか。

共通基礎 SET-U3 では全単射・単射による濃度比較を学びました。SET6 では、それを順序数と接続し、**初期順序数としての基数**を導入します。
