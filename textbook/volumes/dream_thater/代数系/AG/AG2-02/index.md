# AG2-02 斉次イデアルと射影代数的集合

[前章の射影零点集合](../AG2-01/index.md#def-ag2-01-projective-zero-set)は、複数の斉次方程式を同時に満たす点として定義しました。しかし同じ点集合を与える式の族は無数にあります。アフィン幾何では[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)によって、零点集合の情報を根基イデアルで整理できました。射影幾何でも同じ整理をしたいのですが、斉次座標の **全成分が零のベクトルは射影点ではない** という違いがあります。

たとえば $k[X,Y]$ の $(X,Y)$ は真のイデアルです。それでも射影直線では $X=Y=0$ に対応する点が存在せず、射影零点集合は空です。アフィン版の対応を無条件に移すと、ここで破綻します。本章では斉次成分、原点を除外するためのイデアル、飽和という順に必要な道具を作り、この差を証明で説明します。

以後 $k=\mathbb C$、$n\ge1$、$S=k[X_0,\ldots,X_n]$、$\mathfrak m=(X_0,\ldots,X_n)$ とし、$S_d$ を総次数 $d$ の斉次式（零式を含む）の $k$ ベクトル空間とします。各多項式は有限和 $f=f_0+\cdots+f_D$（$f_d\in S_d$）に一意に分かれます。

## 1. 斉次式から斉次イデアルへ

一つの[斉次式](../AG2-01/index.md#def-ag2-01-homogeneous-polynomial)の零点条件は代表元に依存しません。複数の斉次式からイデアルを作ると、異なる次数の和も入ります。たとえば $(X^2,XY)$ は $X^2+X^3$ を含みますが、これは斉次式ではありません。「イデアルの全要素が斉次」という条件ではなく、**各斉次成分を切り離しても所属する** ことを要求します。

<a id="def-ag2-02-homogeneous-ideal"></a>

<!-- formal-statement-start -->
> **定義（斉次イデアル）**  
> $S$ のイデアル $I$ を取り、任意の $f\in I$ の斉次分解を次のように書く。
>

$$
f=\sum_{d=0}^D f_d,\qquad f_d\in S_d.
$$

> すべての $f$ と各 $d$ について $f_d\in I$ となるとき、$I$ を **斉次イデアル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-02-homogeneous-ideal -->
**定義の確認**：$I=(X^2,XY)\subset k[X,Y]$ では $X^2$ と $XY$ はともに次数二の斉次式です。$X^2+X^3$ の二次・三次成分はそれぞれ $X^2,X^3=X\cdot X^2$ で、両方とも $I$ に属します。一般の $f=X^2a+XYb$ でも、$a,b$ を斉次成分に分ければ各次数ごとに $I$ の元が得られるので、$I$ は斉次です。他方 $(X+1)\subset k[X,Y]$ は斉次ではありません。もし $X+1\in(X+1)$ の次数零成分 $1$ も属したら $(X+1)=S$ となりますが、$X=-1,Y=0$ での評価から $1$ は属しません。
<!-- definition-example-end -->

<a id="prop-ag2-02-homogeneous-generators"></a>

<!-- formal-statement-start -->
> **命題（斉次生成と斉次成分判定）**  
> $S=k[X_0,\ldots,X_n]$ のイデアル $I$ が斉次であることと、$I$ が斉次多項式からなる集合によって生成されることは同値である。さらに、斉次イデアルの和・積・共通部分も斉次イデアルである。
<!-- formal-statement-end -->

### 証明の見取り図

斉次生成元へ掛ける任意の多項式を次数ごとに分けます。逆向きには $I$ の全元を斉次成分へ分解して生成元とみなします。演算については、積の次数が足されることが鍵です。

<!-- proof-start -->
### 証明

$I=(g_\alpha)$ で各 $g_\alpha$ の次数を $e_\alpha$ とします。任意の $f\in I$ は有限和 $f=\sum_\alpha h_\alpha g_\alpha$ と書けます。$h_\alpha=\sum_j h_{\alpha,j}$ を斉次分解すると、積 $h_{\alpha,j}g_\alpha$ は次数 $j+e_\alpha$ の $I$ の元です。よって $f$ の次数 $d$ 成分は

$$
f_d=\sum_{\alpha,\ j+e_\alpha=d}h_{\alpha,j}g_\alpha\in I.
$$

逆に $I$ が定義の条件を満たすなら、$I$ の任意の元は $I$ に属する斉次成分の和なので、それら斉次元全体で $I$ が生成されます。

$I,J$ が斉次なら和 $I+J$ は双方の斉次生成元で生成されます。積 $IJ$ は斉次生成元の積で生成されるので斉次です。$f\in I\cap J$ の各成分は $I$ と $J$ の双方に属するので、共通部分も斉次です。
<!-- proof-end -->

ここで $S_0=k$ です。したがって真の斉次イデアル $I\ne S$ は非零定数を含まず、必ず $I\subseteq\mathfrak m$ です。これは後で原点がアフィン錐に残る理由になります。

## 2. 点集合から戻すイデアル

[アフィン消滅イデアル](../AG1-01/index.md#def-ag1-01-vanishing-ideal)は、各点で零になる多項式をすべて集めます。射影点では一般の非斉次多項式の値は定義できません。そこで **斉次成分ごとに零点条件を課す** 形にします。これなら次数が違う式を加えてもイデアルの演算ができます。

<a id="def-ag2-02-projective-vanishing-ideal"></a>

<!-- formal-statement-start -->
> **定義（射影消滅イデアル）**  
> $W\subseteq\mathbb P^n_k$ に対し、射影消滅イデアル $I_+(W)$ を、すべての斉次成分が $W$ の各点で零になる多項式の集合と定める。
>

$$
I_+(W)=\left\{\sum_{d=0}^D f_d\in S:
 f_d\in S_d,\ f_d(P)=0\ (\forall P\in W,\ \forall d)\right\}.
$$

> $W=\varnothing$ のときは全称条件が空なので $I_+(\varnothing)=S$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-02-projective-vanishing-ideal -->
**定義の確認**：$\mathbb P^1$ の $P=[1:0]$ を取ると、斉次式 $F$ が $P$ で零になるのは $F(1,0)=0$ のときです。次数 $d$ の式で $Y$ を含まない単項式は $X^d$ だけなので、その係数が零であれば各項は $Y$ の倍数です。従って $I_+(\{P\})=(Y)$ です。$Y+XY$ は非斉次ですが、一次成分と二次成分の双方が $P$ で消えるのでこのイデアルに属します。
<!-- definition-example-end -->

<a id="prop-ag2-02-vanishing-radical"></a>

<!-- formal-statement-start -->
> **命題（射影消滅イデアルの斉次性と根基性）**  
> 任意の $W\subseteq\mathbb P^n_k$ に対して $I_+(W)$ は斉次かつ根基的なイデアルである。斉次イデアル $I$ については

$$
I\subseteq I_+(V_+(I))
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

斉次成分の和と積に対して点ごとの零が保たれるかを確認します。根基性は、$f^r$ が点で零のとき $f$ も零という体の性質を使いますが、$f$ が非斉次のときは次数成分へ戻す必要があります。

<!-- proof-start -->
### 証明

$I_+(W)$ の元 $f,g$ の各斉次成分は $W$ 上で消えます。$f+g$ の次数 $d$ 成分は $f_d+g_d$ なので、これも $W$ 上で消えます。任意の $h=\sum h_j\in S$ について $hf$ の次数 $d$ 成分は

$$
(hf)_d=\sum_{j+\ell=d}h_jf_\ell
$$

であり、各項は $W$ 上で零です。従ってイデアルであり、定義から斉次です。

根基性を確認します。$W=\varnothing$ なら $I_+(W)=S$ なので成立します。$W\ne\varnothing$ とし、$f^r\in I_+(W)$ を仮定します。任意の $P=[p]\in W$ を選ぶと、$f^r$ の各斉次成分が $p$ で零であるため、任意の $\lambda\in k^\times$ について

$$
0=f^r(\lambda p)=\bigl(f(\lambda p)\bigr)^r
$$

です。体に零因子はないので $f(\lambda p)=0$ が従います。一方 $f=\sum_d f_d$ の斉次分解を使うと

$$
0=f(\lambda p)=\sum_d \lambda^d f_d(p)
\qquad(\lambda\in k^\times).
$$

右辺は $\lambda$ の一変数多項式です。無限体 $k$ のすべての非零元が根なので、この多項式の各係数 $f_d(p)$ は零です。$P$ は任意だから、すべての $f_d$ が $W$ で消え、$f\in I_+(W)$ となります。

最後に斉次イデアル $I$ の $f\in I$ を成分分解すると各 $f_d\in I$ です。[射影零点集合の定義](../AG2-01/index.md#def-ag2-01-projective-zero-set)から各 $f_d$ は $V_+(I)$ 上で零なので $f\in I_+(V_+(I))$ です。
<!-- proof-end -->

<a id="def-ag2-02-irrelevant-ideal"></a>

<!-- formal-statement-start -->
> **定義（無関係イデアル）**  
> 射影空間 $\mathbb P^n_k$ の斉次座標環 $S=k[X_0,\ldots,X_n]$ における
>

$$
\mathfrak m=(X_0,\ldots,X_n)
$$

> を **無関係イデアル** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-02-irrelevant-ideal -->
**定義の確認**：$\mathbb P^1$ では $\mathfrak m=(X,Y)$ です。$V_+(\mathfrak m)$ を満たす点は $X=Y=0$ となり、[射影空間の定義](../AG2-01/index.md#def-ag2-01-projective-space)の非零代表元条件に反するので $V_+(\mathfrak m)=\varnothing$ です。一方 $\mathfrak m\ne S$ であり、$I_+(\varnothing)=S$ です。
<!-- definition-example-end -->

$\mathbb P^1$ の $I=(X^2,Y^2)$ も真の斉次イデアルなのに零点は空です。実際 $X^2=Y^2=0$ は $X=Y=0$ を強制します。したがって「真の斉次イデアルなら射影点を持つ」は誤りです。次に、この見かけの差を取り去る操作を導入します。

## 3. 無関係イデアルの冪で消える情報

たとえば $I=(X^2,XY)\subset k[X,Y]$ は、射影空間では $X=0$ という一点 $[0:1]$ を表します。しかし $X\notin I$ です。$X$ に $X$ または $Y$ を掛ければ $X^2,XY\in I$ になるので、射影点では $I$ と $(X)$ に同じ条件が現れます。この現象を形式化します。

<a id="def-ag2-02-saturation"></a>

<!-- formal-statement-start -->
> **定義（飽和イデアル）**  
> $S=k[X_0,\ldots,X_n]$ のイデアル $I$ に対し、無関係イデアル $\mathfrak m$ に関する **飽和** を

$$
I^{\mathrm{sat}}=(I:\mathfrak m^\infty)
=\{f\in S:\exists q\ge0,\ \mathfrak m^qf\subseteq I\}
$$

> と定義する。$I=I^{\mathrm{sat}}$ のとき $I$ は **飽和イデアル** である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-02-saturation -->
**定義の確認**：$I=(X^2,XY)$ では $\mathfrak m X=(X^2,XY)\subseteq I$ なので $X\in I^{\mathrm{sat}}$ です。一方 $I\subseteq(X)$ で、$f\notin(X)$ なら $f(0,Y)\ne0$ です。$\mathfrak m^q f\subseteq I$ なら特に $Y^q f\in(X)$ ですが $Y^q f(0,Y)\ne0$ となって矛盾します。よって $I^{\mathrm{sat}}=(X)$ です。
<!-- definition-example-end -->

飽和がイデアルになることを確認します。$\mathfrak m^p f\subseteq I$ と $\mathfrak m^q g\subseteq I$ に対し、$r=\max(p,q)$ とすれば $\mathfrak m^r\subseteq\mathfrak m^p\cap\mathfrak m^q$ なので

$$
\mathfrak m^r(f+g)\subseteq
\mathfrak m^p f+\mathfrak m^q g\subseteq I.
$$

任意の $h\in S$ に対しても $\mathfrak m^p(hf)=h\mathfrak m^p f\subseteq I$ です。したがって $I^{\mathrm{sat}}$ はイデアルです。指数 $p,q$ は各元によって異なってかまいません。

次に、飽和を二度行っても変わらないことを証明します。$f\in(I^{\mathrm{sat}}:\mathfrak m^\infty)$ なら、ある $a\ge0$ について $\mathfrak m^a f\subseteq I^{\mathrm{sat}}$ です。次数 $a$ の単項式を $M_1,\ldots,M_N$ と列挙すると、各 $M_jf\in I^{\mathrm{sat}}$ に対し整数 $q_j\ge0$ が存在して

$$
\mathfrak m^{q_j}M_j f\subseteq I
\qquad(1\le j\le N)
$$

となります。$q=\max_j q_j$ とすれば $\mathfrak m^q M_j f\subseteq I$ が全 $j$ に成立します。$M_j$ が $\mathfrak m^a$ を生成するため

$$
\mathfrak m^{a+q}f
=\mathfrak m^q(\mathfrak m^a f)
\subseteq I.
$$

よって $f\in I^{\mathrm{sat}}$ です。逆の包含は $a=0$ を選べば成立するので、$(I^{\mathrm{sat}})^{\mathrm{sat}}=I^{\mathrm{sat}}$ が従います。

<a id="prop-ag2-02-saturation-locus"></a>

<!-- formal-statement-start -->
> **命題（飽和による零点集合の不変性）**  
> $I\subseteq S$ が斉次イデアルなら $I^{\mathrm{sat}}$ も斉次であり、次が成立する。

$$
V_+(I)=V_+(I^{\mathrm{sat}}).
$$
<!-- formal-statement-end -->

### 証明の見取り図

射影点では少なくとも一つの $X_i$ が非零です。飽和の条件にある $\mathfrak m^q f\subseteq I$ から $X_i^q f\in I$ を使い、非零の $X_i^q$ を取り除きます。

<!-- proof-start -->
### 証明

まず斉次性を示します。$f=\sum_d f_d\in I^{\mathrm{sat}}$ とし、ある $q$ について $\mathfrak m^q f\subseteq I$ とします。任意の次数 $q$ の単項式 $M$ に対し $Mf\in I$ です。$I$ は斉次なのでその次数 $q+d$ 成分 $Mf_d$ も $I$ に属します。次数 $q$ の単項式が $\mathfrak m^q$ を生成するため $\mathfrak m^q f_d\subseteq I$ となり、各 $f_d\in I^{\mathrm{sat}}$ です。

$I\subseteq I^{\mathrm{sat}}$ より $V_+(I^{\mathrm{sat}})\subseteq V_+(I)$ です。逆向きに $P=[p]\in V_+(I)$、斉次 $f\in I^{\mathrm{sat}}$ を取り、$\mathfrak m^q f\subseteq I$ とします。ある添字 $i$ について $p_i\ne0$ なので

$$
0=(X_i^q f)(p)=p_i^q f(p).
$$

$p_i^q\ne0$ より $f(p)=0$ です。飽和イデアルは斉次であるため、すべての斉次成分でこの議論を適用でき、$P\in V_+(I^{\mathrm{sat}})$ を得ます。
<!-- proof-end -->

**逆の主張には注意。** 同じ零点集合を持つイデアルが同じ飽和を持つとは限りません。例えば $(X^2)$ と $(X)$ は $\mathbb P^1$ 上で同じ零点集合を持ちますが、ともに飽和であり、前者は後者と等しくありません。零点だけから戻せるのは、次節で説明する **根基** の情報です。

## 4. 射影版Hilbertの零点定理

アフィン側で $I$ の方程式が切り出す集合 $V_{\mathbb A}(I)\subseteq k^{n+1}$ を考えます。$I$ が斉次なら、$p$ が共通零点であるとき $\lambda p$ も共通零点です。原点を頂点に持つこの集合を、ここでは **アフィン錐** として使います。$p\ne0$ の各比例類が射影零点に対応し、原点だけが射影空間から取り除かれます。

[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)はアフィン錐から $\sqrt I$ を復元します。錐の原点にしか残らない成分を射影側で無視することが、飽和の意味です。

<a id="thm-ag2-02-projective-nullstellensatz"></a>

<!-- formal-statement-start -->
> **定理（射影版Hilbertの零点定理）**  
> $k=\mathbb C$、$n\ge1$ とし、$S=k[X_0,\ldots,X_n]$ の任意の斉次イデアル $I$ に対して次が成立する。

$$
I_+(V_+(I))=(\sqrt I:\mathfrak m^\infty).
$$

> 特に $V_+(I)\ne\varnothing$ なら $I_+(V_+(I))=\sqrt I$ であり、$V_+(I)=\varnothing$ なら $I_+(V_+(I))=S$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$I=S$ は別扱いします。$I\ne S$ なら原点はアフィン錐にあります。射影零点がある場合、非零錐点で消える斉次式は原点でも消えるため、[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を適用できます。射影零点がない場合、アフィン錐は原点だけであり、その消滅イデアルは $\mathfrak m$ です。どちらも飽和を確認すれば一つの式へ合流します。

<!-- proof-start -->
### 証明

$I=S$ なら $V_+(I)=\varnothing$、$\sqrt I=S$ で、両辺は $S$ です。以下は真の斉次イデアル $I\subseteq\mathfrak m$ を考えます。

**準備：$\sqrt I$ も斉次である。** $f=0$ なら主張は直ちに成立します。$f\ne0$ とし、最高次の非零成分を $f_D$ として $f=\sum_{d=0}^D f_d$ と書きます。$f\in\sqrt I$ だから $f^r\in I$ となる整数 $r\ge1$ が存在します。次数 $rD$ の成分は

$$
(f^r)_{rD}=f_D^r\in I
$$

です。ここで右辺の所属には $I$ の斉次性を使いました。よって $f_D\in\sqrt I$ です。[根基がイデアルであること](../AG1-07/index.md#def-ag1-07-ideal-radical)から $f-f_D\in\sqrt I$ となります。$f-f_D$ の最高次数は $D$ より小さいので、同じ手順を有限回繰り返すとすべての $f_d\in\sqrt I$ が得られます。

**場合1：$V_+(I)\ne\varnothing$。** $W=V_+(I)$、$C=V_{\mathbb A}(I)$ と書きます。$C\setminus\{0\}$ は $W$ の代表元全体です。

$F\in I_+(W)$ の各斉次成分 $F_d$ は $C\setminus\{0\}$ 上で零です。$d>0$ なら $F_d(0)=0$ でもあります。$d=0$ なら $W$ は空でないので定数 $F_0$ は零です。従って $F$ は $C$ の全点で消えます。

[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を $k^{n+1}$ とイデアル $I$ に適用して $F\in\sqrt I$ を得ます。

逆に $F\in\sqrt I$ とすると、準備から各斉次成分 $F_d\in\sqrt I$ です。従って次数 $d$ ごとに整数 $r_d\ge1$ を選んで $F_d^{r_d}\in I$ とできます。任意の $P\in W=V_+(I)$ で

$$
0=F_d^{r_d}(P)=\bigl(F_d(P)\bigr)^{r_d}
$$

が成立します。体には零因子がないので $F_d(P)=0$ です。すべての $d,P$ で成立するため $F\in I_+(W)$ となり、この二方向から

$$
I_+(W)=\sqrt I
$$

が従います。

さらに $\sqrt I$ が飽和であることを確かめます。$\mathfrak m^qF\subseteq\sqrt I$ とすると、任意の $p\in C\setminus\{0\}$ に対し非零の座標 $p_i$ を選べます。このとき

$$
0=(X_i^qF)(p)=p_i^qF(p)
$$

で、$p_i\ne0$ より $F(p)=0$ です。

$W$ が空でないので $p\ne0$ を一つ固定でき、$\lambda p\in C$ がすべての $\lambda\in k$ で成立します。$\lambda\ne0$ では $F(\lambda p)=0$ です。無限体 $k$ 上の $\lambda$ の多項式が無数の根を持つので、$\lambda=0$ でも $F(0)=0$ です。

従って $F$ は $C$ 全体で零です。[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)から $F\in\sqrt I$ となり、次が成立します。

$$
(\sqrt I:\mathfrak m^\infty)=\sqrt I.
$$

**場合2：$V_+(I)=\varnothing$。** $C$ の非零点が存在しないので $C=\{0\}$ です。原点は $I\subseteq\mathfrak m$ により確かに含まれます。原点で零になる多項式はちょうど定数項が零の元であり、[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)から

$$
\sqrt I=I_{\mathbb A}(\{0\})=\mathfrak m.
$$

したがって $\mathfrak m\cdot1\subseteq\sqrt I$ なので $1\in(\sqrt I:\mathfrak m^\infty)$ です。右辺は $S$、左辺も定義から $I_+(\varnothing)=S$ です。二つの場合を合わせて結論を得ます。
<!-- proof-end -->

この定理の「空集合の場合」が射影特有の注意点です。$I=\mathfrak m$ とすると $\sqrt I=\mathfrak m$ なのに $I_+(V_+(I))=S$ です。したがって **射影零点定理を単に $I_+(V_+(I))=\sqrt I$ と書いてはいけません**。なお、$\sqrt{I^{\mathrm{sat}}}$ を使う書き方も同じ結果になります。ここで必要なのは根基と飽和を区別して適切な順番で適用することです。

<a id="cor-ag2-02-radical-bijection"></a>

<!-- formal-statement-start -->
> **系（射影閉集合と根基的飽和斉次イデアルの対応）**  
> $k=\mathbb C$、$n\ge1$ とする。$\mathbb P^n_k$ の射影閉集合 $W$ と、$S=k[X_0,\ldots,X_n]$ の根基的かつ $\mathfrak m$ に関して飽和な斉次イデアル $J$ は、

$$
W\longmapsto I_+(W),\qquad J\longmapsto V_+(J)
$$

> により、包含関係を逆にする一対一対応をなす。空集合に対応するのは単位イデアル $S$ である。
<!-- formal-statement-end -->

### 証明の見取り図

閉集合は斉次方程式で定義できるので、零点へ戻せば元に戻ります。逆向きは前の定理で、根基性と飽和性が余分な代数的情報を落とす条件です。

<!-- proof-start -->
### 証明

射影閉集合 $W$ はある斉次イデアル $I$ によって $W=V_+(I)$ と表せます。定義から $I\subseteq I_+(W)$ なので $V_+(I_+(W))\subseteq W$ です。他方 $I_+(W)$ の各斉次式は $W$ の各点で零だから $W\subseteq V_+(I_+(W))$ です。従って等号です。

[射影消滅イデアルの斉次性と根基性](#prop-ag2-02-vanishing-radical)から $I_+(W)$ は根基的・斉次です。さらに $I_+(W)$ は飽和です。実際、$\mathfrak m^qf\subseteq I_+(W)$ なら、各点 $P=[p]\in W$ の非零座標 $p_i$ に対し、$X_i^qf$ の各斉次成分が零です。$X_i^qf_d$ がその成分なので $p_i^qf_d(p)=0$、よって $f_d(P)=0$、すなわち $f\in I_+(W)$ です。$W=\varnothing$ のときは $I_+(W)=S$ で明白です。

逆に根基的で飽和な斉次イデアル $J$ なら、[射影版Hilbertの零点定理](#thm-ag2-02-projective-nullstellensatz)から

$$
I_+(V_+(J))=(\sqrt J:\mathfrak m^\infty)
=(J:\mathfrak m^\infty)=J.
$$

$I\subseteq J$ なら $V_+(J)\subseteq V_+(I)$、$W_1\subseteq W_2$ なら $I_+(W_2)\subseteq I_+(W_1)$ なので包含が反転します。
<!-- proof-end -->

アフィン版の[根基イデアルと閉集合の対応](../AG1-08/index.md#thm-ag1-08-closed-radical-bijection)から、一歩進んだ形です。射影の対応では飽和も必要ですが、これを忘れると $(X,Y)\subset k[X,Y]$ のような「空集合を表すのに単位でない」イデアルを誤って数えてしまいます。

## 5. チャートでの計算と具体的な図形

射影零点集合を定義できても、手計算では標準チャートのアフィン式へ戻る方が便利です。[前章の標準チャート](../AG2-01/index.md#prop-ag2-01-chart-bijection)では $X_i=1$ に正規化します。この操作は各斉次生成元へそのまま使えます。

<a id="prop-ag2-02-chart-equations"></a>

<!-- formal-statement-start -->
> **命題（射影チャートの方程式）**  
> $I=(F_\alpha)$ を $S=k[X_0,\ldots,X_n]$ の斉次イデアルとし、各 $F_\alpha$ を斉次とする。$U_i=\{X_i\ne0\}$ の座標 $x_j=X_j/X_i$（$j\ne i$）で、$F_\alpha$ の $X_i$ を $1$、他の $X_j$ を $x_j$ へ置いた多項式を $f_{\alpha,i}$ と書く。このとき

$$
V_+(I)\cap U_i\ \cong\
V_{\mathbb A^n}\bigl((f_{\alpha,i})_\alpha\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

左の点から $X_i=1$ の代表元を選びます。斉次生成元の零点判定は代表元に依存しないので、右の多項式へ代入しても同じ条件です。

<!-- proof-start -->
### 証明

$P=[X]\in U_i$ を $X_i$ で正規化した代表元は第 $i$ 成分が $1$、他が $x_j=X_j/X_i$ です。各 $F_\alpha$ の次数を $d_\alpha$ とすると、[斉次式の零点条件の代表元不変性](../AG2-01/index.md#prop-ag2-01-homogeneous-scaling)から

$$
F_\alpha(X)=X_i^{d_\alpha} f_{\alpha,i}(x).
$$

$X_i\ne0$ だから $F_\alpha(X)=0$ と $f_{\alpha,i}(x)=0$ は同値です。任意の $I$ の元は生成元の多項式係数線形結合であり、全生成元が零である条件と $I$ のすべての斉次式が零である条件は同値です。[チャートの全単射](../AG2-01/index.md#prop-ag2-01-chart-bijection)により左の点と右の共通零点が一対一に対応します。
<!-- proof-end -->

**二次曲線の例。** $\mathbb P^2$ の $I=(XZ-Y^2)$ では $U_Z$ 上で $x=X/Z,\ y=Y/Z$ と置くと $x-y^2=0$ です。$Z=0$ では $-Y^2=0$ なので $Y=0$、非零代表元条件より $X\ne0$ で、無限遠点は $[1:0:0]$ だけです。一方 $U_X$ では $u=Y/X,\ v=Z/X$ とすると $v-u^2=0$ です。重複領域 $x\ne0$ 上では $u=y/x,\ v=1/x$ であり、

$$
v-u^2=\frac1x-\frac{y^2}{x^2}=\frac{x-y^2}{x^2}.
$$

したがって両チャートの零点条件は一致します。チャートの外にある無限遠点を捨てないことが射影計算では重要です。

**二点の例。** $\mathbb P^1$ の $W=\{[1:0],[0:1]\}$ では、斉次式の $X^d,Y^d$ の係数はともに零でなければなりません。よってすべての残りの単項式は $XY$ の倍数です。従って $I_+(W)=(XY)$ です。一方 $V_+(XY)=V_+(X)\cup V_+(Y)$ であることも、各点で積が零であることから分かります。アフィン側の[零点集合の演算](../AG1-08/index.md#prop-ag1-08-set-ideal-operations)に対応しますが、射影では飽和を忘れないようにします。

## 6. 演習：射影点に残る情報を取り出す

以下は特記しなければ $k=\mathbb C$ とし、$S=k[X,Y]$ または問題に指定された斉次座標環を用います。各問題で、どの空間の零点を計算しているかを確認してください。

**Level A：定義と小さな計算**

### A1. 成分判定と非斉次元

$I=(X^2,XY)\subset k[X,Y]$ とする。(1) $f=X^2+XY+X^3$ が $I$ に属すること、(2) $f$ が斉次でないこと、(3) 各斉次成分も $I$ に属することを示せ。

- Level: A
- ID: AG2-02-A1

<!-- solution-start -->
**詳細解答。**

(1) $f=1\cdot X^2+1\cdot XY+X\cdot X^2$ なので $I$ の元です。

(2) $X^2,XY$ の総次数は二、$X^3$ の総次数は三であるため $f$ は斉次ではありません。

(3) 分解は $f_2=X^2+XY$、$f_3=X^3$ で、前者は生成元の和、後者は $X^2$ の $X$ 倍です。ともに $I$ に属します。非斉次元が存在することと斉次イデアルでないことは別です。
<!-- solution-end -->

### A2. 空の射影零点集合

$\mathbb P^1$ 上で $I=(X,Y)$、$J=(X^2,Y^2)$ の射影零点集合を求め、$I$ と $J$ がともに真のイデアルであることを確認せよ。

- Level: A
- ID: AG2-02-A2

<!-- solution-start -->
**詳細解答。** $V_+(I)$ では $X=Y=0$ なので、非零代表元がなく空集合です。$V_+(J)$ でも $X^2=Y^2=0$ から体の零因子不在により $X=Y=0$、従って空です。$I,J\subseteq(X,Y)$ で、定数項 $1$ は $(X,Y)$ に属さないため $1\notin I,J$、どちらも真です。[射影消滅イデアル](#def-ag2-02-projective-vanishing-ideal)では空集合の消滅イデアルは $S$ で、$I,J$ とは一致しません。
<!-- solution-end -->

### A3. 射影点の消滅イデアル

$P=[1:0]\in\mathbb P^1$ に対して $I_+(\{P\})=(Y)$ を、任意の次数 $d\ge0$ の斉次式から直接証明せよ。

- Level: A
- ID: AG2-02-A3

<!-- solution-start -->
**詳細解答。** 次数 $d$ の斉次式を

$$
F(X,Y)=\sum_{j=0}^d a_j X^{d-j}Y^j
$$

と書くと、$F(1,0)=a_0$ です。零点条件は $a_0=0$ なので $F=\sum_{j=1}^d a_jX^{d-j}Y^j$ は $Y$ で割り切れます。$d=0$ のときは定数 $a_0=0$ です。非斉次式が消滅イデアルに入るには各斉次成分に同じ条件が必要なので $I_+(\{P\})\subseteq(Y)$ です。逆に $Y$ の倍数の各斉次成分は $P$ で零になり、逆包含も成立します。
<!-- solution-end -->

### A4. チャートと無限遠点

$\mathbb P^2$ の $D=V_+(XZ-Y^2)$ の $U_Z$ 上での方程式と $D\cap\{Z=0\}$ を求めよ。

- Level: A
- ID: AG2-02-A4

<!-- solution-start -->
**詳細解答。** $Z\ne0$ では $x=X/Z,\ y=Y/Z$ と置き、斉次次数二の式を $Z^2$ で割ると $x-y^2=0$ です。一方 $Z=0$ では $-Y^2=0$ より $Y=0$ です。斉次座標 $(X,Y,Z)$ は非零なので $X\ne0$、従って $[X:0:0]=[1:0:0]$ だけです。この点は $U_Z$ には入らないため、アフィン式だけでは列挙できません。
<!-- solution-end -->

**Level B：飽和と根基を分ける**

### B1. 具体的な飽和計算

$I=(X^2,XY)\subset k[X,Y]$ とする。$I^{\mathrm{sat}}=(X)$ を両包含から示し、$V_+(I)$ を求めよ。

- Level: B
- ID: AG2-02-B1

<!-- solution-start -->
**詳細解答。** $\mathfrak m X=(X^2,XY)\subseteq I$ より $X\in I^{\mathrm{sat}}$ です。飽和がイデアルなので $(X)\subseteq I^{\mathrm{sat}}$ です。逆に $f\in I^{\mathrm{sat}}$ なら、ある $q\ge0$ で $Y^q f\in I\subseteq(X)$ です。$X=0$ を代入すると $Y^q f(0,Y)=0$ が $k[Y]$ で成立し、整域性より $f(0,Y)=0$ です。$f$ の $X$ に関する定数項が零だから $f\in(X)$ です。よって飽和は $(X)$ です。零点は $X^2=0$ から $X=0$、$Y\ne0$ なので $[0:1]$ 一点です。
<!-- solution-end -->

### B2. 原点しかないアフィン錐

$I=(X^2,Y^2)\subset k[X,Y]$ とする。アフィン零点集合、$\sqrt I$、$(\sqrt I:\mathfrak m^\infty)$、射影零点集合を計算せよ。

- Level: B
- ID: AG2-02-B2

<!-- solution-start -->
**詳細解答。** $X^2=Y^2=0$ は $X=Y=0$ と同値なので、アフィン零点集合は $\{(0,0)\}$、射影零点集合は空です。[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)から $\sqrt I=I_{\mathbb A}(\{0\})=(X,Y)=\mathfrak m$ です。$\mathfrak m\cdot 1\subseteq\mathfrak m$ なので $1\in(\sqrt I:\mathfrak m^\infty)$、従って飽和は $S$ です。実際 $\mathfrak m^3$ の各次数三の単項式 $X^3,X^2Y,XY^2,Y^3$ は $X^2$ または $Y^2$ の倍数なので $\mathfrak m^3\subseteq I$ であり、$I^{\mathrm{sat}}$ 自体も $S$ になります。
<!-- solution-end -->

### B3. 二点のイデアルを求める

$\mathbb P^1$ の $P=[1:0],Q=[0:1]$ について、$I_+(\{P,Q\})=(XY)$ を示し、$V_+(XY)$ がこの二点に等しいことも確認せよ。

- Level: B
- ID: AG2-02-B3

<!-- solution-start -->
**詳細解答。** 次数 $d$ の斉次式を

$$
F=\sum_{j=0}^d a_j X^{d-j}Y^j
$$

と書きます。$P$ で零になるには $a_0=0$、$Q$ で零になるには $a_d=0$ が必要十分です。$d=0$ では定数が零、$d=1$ では $a_0=a_1=0$ なので零式です。

$d\ge2$ の場合、残る項は $1\le j\le d-1$ であり $X$ と $Y$ をともに因子に持つので $XY\mid F$ です。各斉次成分について同じことが成り立つため消滅イデアルは $(XY)$ です。

また $XY=0$ は $X=0$ または $Y=0$ と同値です。非零代表元を正規化すると前者が $Q$、後者が $P$ です。
<!-- solution-end -->

### B4. 飽和しても冪は消えない

$\mathbb P^1$ の $I=(X^2)$ と $J=(X)$ について、$I^{\mathrm{sat}}=I$、$J^{\mathrm{sat}}=J$、$V_+(I)=V_+(J)$ を示せ。この例が何を注意しているか説明せよ。

- Level: B
- ID: AG2-02-B4

<!-- solution-start -->
**詳細解答。** $f\in I^{\mathrm{sat}}$ ならある $q$ について $Y^qf\in(X^2)$ です。$f$ を $X$ のべきで整理したときの定数項・一次項を $a_0(Y),a_1(Y)$ とすると、$Y^q a_0(Y)=Y^q a_1(Y)=0$ です。$k[Y]$ が整域なので両係数が零、従って $X^2\mid f$ です。$I\subseteq I^{\mathrm{sat}}$ と合わせて等号です。$J$ についても $Y^qf\in(X)$ から $f(0,Y)=0$ となるので $J^{\mathrm{sat}}=J$ です。射影零点は双方とも $X=0$、すなわち $[0:1]$ です。ただし $\sqrt{(X^2)}=(X)$ なので、零点を復元するときには飽和に加えて根基が必要です。
<!-- solution-end -->

**Level C：複数の議論を接続する**

### C1. 原点の成分を取り去る

$\mathbb P^1$ で $I=(X^2Y,XY^2)\subseteq k[X,Y]$ とする。(1) $V_+(I)$ を求めよ。(2) $I^{\mathrm{sat}}=(XY)$ を直接証明せよ。(3) $\sqrt I$ と射影消滅イデアルを求め、射影版零点定理と比較せよ。

- Level: C
- ID: AG2-02-C1

<!-- solution-start -->
**詳細解答。**

(1) 両方の方程式が零で、$X,Y$ がともに非零なら、$X^2Y$ が非零となって矛盾します。従って $X=0$ または $Y=0$ です。逆にいずれかが零なら両生成元は消えます。射影点は $[0:1]$ と $[1:0]$ です。

(2) $\mathfrak m\cdot XY=(X^2Y,XY^2)=I$ なので $(XY)\subseteq I^{\mathrm{sat}}$ です。逆に $f\in I^{\mathrm{sat}}$ ならある $q$ で $X^qf\in I\subseteq(Y)$、$Y^qf\in I\subseteq(X)$ です。$X^q f(X,0)=0$ が $k[X]$ で成立し整域性から $f(X,0)=0$、よって $f\in(Y)$ です。同様に $Y^qf(0,Y)=0$ から $f\in(X)$ です。$X,Y$ は異なる不定元であるため、両方で割り切れる多項式は $XY$ で割り切れます。従って $I^{\mathrm{sat}}\subseteq(XY)$ で、等号です。

(3) $I\subseteq(XY)$ かつ $(XY)$ は根基的です。これは $XY\mid f^r$ なら $X\mid f$ と $Y\mid f$ なので $XY\mid f$ となることから分かります。

また $(XY)^2=X^2Y^2=X\cdot(XY^2)\in I$ なので $XY\in\sqrt I$ です。よって $\sqrt I=(XY)$ です。

(1) の二点に対する[射影消滅イデアルの定義](#def-ag2-02-projective-vanishing-ideal)から直接計算した $(XY)$ は、[射影版Hilbertの零点定理](#thm-ag2-02-projective-nullstellensatz)の値

$$
(\sqrt I:\mathfrak m^\infty)=(XY)
$$

と一致します。
<!-- solution-end -->

### C2. 直線と離れた一点

$\mathbb P^2$ で $I=(XZ,YZ)\subset k[X,Y,Z]$、$W=V_+(I)$ とする。

- (1) $W$ を幾何的に記述せよ。
- (2) 標準チャート $U_Z$ と $U_X$ における方程式を求めよ。
- (3) $I_+(W)=I$ を、任意次数の斉次式を使って直接証明せよ。

- Level: C
- ID: AG2-02-C2

<!-- solution-start -->
**詳細解答。**

(1) 共通零点条件は $XZ=0,\ YZ=0$ です。$Z=0$ なら任意の $[X:Y:0]$（$(X,Y)\ne(0,0)$）が入ります。$Z\ne0$ なら $X=Y=0$ が必要で、正規化した点は $P=[0:0:1]$ です。従って $W$ は直線 $Z=0$ と、その外の一点 $P$ の和集合です。

(2) $U_Z$ では $x=X/Z,\ y=Y/Z$ として、方程式 $XZ=YZ=0$ を $Z^2$ で割ると $x=y=0$ です。よって $W\cap U_Z$ は原点一つです。$U_X$ では $u=Y/X,\ v=Z/X$ とし、$XZ/X^2=v$、$YZ/X^2=uv$ を得ます。第一式 $v=0$ が第二式を含意するので $W\cap U_X$ は直線 $v=0$ です。$P$ は $X=0$ なので後者のチャートには含まれません。

(3) 任意の斉次式 $F\in S_d$ が $W$ の全点で零とします。

まず $Z=0$ のすべての $[X:Y:0]$ で零なので、二変数斉次式 $F(X,Y,0)$ はすべての非零 $(X,Y)$ で零です。$k$ は無限体です。$Y=1$ 上の一変数多項式 $F(t,1,0)$ は無数の根を持つため零多項式であり、さらに $[1:0:0]$ でも零なので、$F(X,Y,0)$ の各係数は零です。

従って $F=ZG$ と書けます。$d\ge1$ なら $G$ は次数 $d-1$ の斉次式です。さらに $P=[0:0:1]$ で零になる条件は

$$
0=F(P)=G(0,0,1).
$$

従って $G$ の $Z^{d-1}$ 項の係数は零であり、$G$ の各単項式は $X$ または $Y$ を因子に持ちます。このため $G\in(X,Y)$ であり、$F\in(XZ,YZ)=I$ です。

$d=0$ なら $F$ は $W$ 上で消える定数なので零です。非斉次式も成分ごとに同じ議論をすれば $I_+(W)\subseteq I$ です。

逆に $I$ の斉次生成元 $XZ,YZ$ はすべての $W$ の点で消えるので、[斉次生成と斉次成分判定](#prop-ag2-02-homogeneous-generators)により $I\subseteq I_+(W)$ です。よって等号です。
<!-- solution-end -->

## 7. 根基と飽和を区別して次へ進む

斉次イデアルは、次数ごとの方程式の情報を保存しながら演算できます。射影零点集合はアフィン錐の非零点の比例類です。そのため原点だけに支えられる情報は射影側から見えず、**飽和**で除去します。さらに、零点で区別できない冪の情報は **根基** で取り除きます。この二つを合わせた[射影版Hilbertの零点定理](#thm-ag2-02-projective-nullstellensatz)が、射影閉集合の正しい代数的な対応を与えます。

次章では斉次多項式を座標関数として使い、射影空間間の写像を構成します。その際、すべての斉次座標関数が同時に零になる点では写像が定義できない、という本章の非零代表元条件が再び重要になります。
