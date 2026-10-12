# AG1-08 代数集合と根基イデアルの対応

多項式の方程式からは点の集合を作れますが、逆に点の集合だけを見て元の方程式を復元しようとすると、$x^2=0$ と $x=0$ の違いが消えてしまいます。前章では[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)によって、失われる情報はちょうどイデアルを根基に取り替えた分だと分かりました。

本章ではこの結論を「二つの集合の間の対応」として組み立てます。どちらの向きに包含が反転するのか、和と積が図形の交わり・和集合のどちらになるのか、既約成分がどのイデアルに対応するのかを、具体的な方程式に戻しながら説明します。

以下、特に断らない限り $k$ は代数閉体（$k=\mathbb C$ でよい）、$n\ge1$、$R=k[x_1,\ldots,x_n]$ です。$V(J)$ は[アフィン代数的集合](../AG1-01/index.md#def-ag1-01-affine-zero-set)、$I(X)$ は[消滅イデアル](../AG1-01/index.md#def-ag1-01-vanishing-ideal)を表します。$V(J)$ は $J$ の**すべて**の元が同時に零になる点の集合で、$I(X)$ は $X$ の**すべて**の点で零になる多項式の集合です。$V(R)=\varnothing$、$I(\varnothing)=R$ という端の場合も含めます。

## 1. 方程式と点集合を往復する

例えば $J=(x^2,xy)\subseteq k[x,y]$ なら $V(J)=\{(0,b):b\in k\}$ です。この直線で消える多項式はちょうど $x$ の倍数なので、$I(V(J))=(x)$ となります。一方、直線 $X=V(x)$ を点集合として出発点に選べば、$V(I(X))=X$ です。片方ではイデアルが大きくなり、もう片方では点集合がそのまま戻る理由を調べます。

<a id="prop-ag1-08-order-reversing"></a>

<!-- formal-statement-start -->
> **命題（零点・消滅操作の包含反転と往復）**  
> 任意の体 $k$、$R=k[x_1,\ldots,x_n]$、イデアル $J,K\subseteq R$、集合 $X,Y\subseteq k^n$ に対して次が成り立つ。
>
> (1) $J\subseteq K$ なら $V(K)\subseteq V(J)$、$X\subseteq Y$ なら $I(Y)\subseteq I(X)$。
>
> (2) $J\subseteq I(V(J))$、$X\subseteq V(I(X))$。
>
> (3) 二重の往復では次の等式が成り立つ。

$$
V(I(V(J)))=V(J),\qquad I(V(I(X)))=I(X).
$$
<!-- formal-statement-end -->

### 証明の見取り図

イデアルの式が増えれば、それらを同時に満たす点は減ります。点が増えれば、すべての点で消える式は減ります。(2) の両側を同じ操作に通し、(1) を使うと (3) では逆向きの包含も得られます。ここまでは**代数閉性は不要**です。

<!-- proof-start -->
### 証明

(1) $a\in V(K)$ ならすべての $g\in K$ が $g(a)=0$ を満たし、特に $g\in J$ に対しても成立するので $a\in V(J)$ です。また $f\in I(Y)$ ならすべての $a\in Y$ で $f(a)=0$ であり、特に $X\subseteq Y$ の各点で零だから $f\in I(X)$ です。

(2) 任意の $g\in J$ は定義により $V(J)$ の全点で消えます。従って $g\in I(V(J))$ です。任意の $a\in X$ に対して $I(X)$ の全元は $a$ で消えるので、$a\in V(I(X))$ です。

(3) (2) の $J\subseteq I(V(J))$ に $V$ の包含反転を使えば $V(I(V(J)))\subseteq V(J)$ です。逆向きは (2) の $X=V(J)$ への適用で $V(J)\subseteq V(I(V(J)))$ です。よって第一の等式を得ます。第二の等式は、(2) の $X\subseteq V(I(X))$ に $I$ の包含反転を使って $I(V(I(X)))\subseteq I(X)$ を得、(2) の $J=I(X)$ への適用から $I(X)\subseteq I(V(I(X)))$ を得ることで従います。
<!-- proof-end -->

(3) の等式は、一度 $V$ や $I$ を取ったあとには、同じ往復をさらに繰り返しても情報が変わらないことを示します。これだけではまだ $I(V(J))=J$ とは言えません。まさにそのずれを[イデアルの根基](../AG1-07/index.md#def-ag1-07-ideal-radical)が埋めます。

## 2. 根基イデアルと閉集合は一対一

[根基的イデアル](../AG1-01/index.md#def-ag1-01-radical-ideal)とは、$f^m\in J$（$m\ge1$）なら $f\in J$ となるイデアルです。例えば $(x)$ は $k[x,y]/(x)\simeq k[y]$ が整域なので根基的ですが、$(x^2)$ は根基的ではありません。後者では $x^2\in(x^2)$ でも $x\notin(x^2)$ です。

<a id="thm-ag1-08-closed-radical-bijection"></a>

<!-- formal-statement-start -->
> **定理（アフィン代数的集合と根基イデアルの包含反転全単射）**  
> $k$ を代数閉体、$R=k[x_1,\ldots,x_n]$ とする。$k^n$ の Zariski 閉集合全体と $R$ の根基的イデアル全体との間で、次の二つの写像は互いに逆であり、包含を反転する。

$$
X\longmapsto I(X),\qquad J\longmapsto V(J).
$$

> 特に任意のイデアル $J$ について、対応が忘れる情報はちょうどその根基である。

$$
I(V(J))=\sqrt J.
$$

> 空集合には $R$ が、全空間 $k^n$ には $(0)$ が対応する。
<!-- formal-statement-end -->

### 証明の見取り図

閉集合はもともとあるイデアルの零点集合ですから、前節の往復等式で必ず元に戻ります。逆に根基的イデアル $J$ なら、[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)で $I(V(J))=\sqrt J=J$ です。必要な仮定 **$k$ が代数閉体** はこの最後の等式で使います。

<!-- proof-start -->
### 証明

Zariski 閉集合 $X$ を取ります。[Zariski 位相の定義](../AG1-01/index.md#def-ag1-01-zariski-topology)により、あるイデアル $J$ が存在し $X=V(J)$ と書けます。[零点・消滅操作の往復](#prop-ag1-08-order-reversing)をこの $J$ に適用すると

$$
V(I(X))=V(I(V(J)))=V(J)=X
$$

です。[消滅イデアルの根基性](../AG1-01/index.md#prop-ag1-01-vanishing-ideal-radical)により $I(X)$ は根基的なので、第一の写像の値域も正しいです。

次に根基的イデアル $J$ を取ります。[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)は、代数閉体上の多項式環で任意のイデアルに対して $I(V(J))=\sqrt J$ と主張します。根基性から $\sqrt J=J$ です。従ってどちらの合成写像も恒等写像であり、二写像は逆写像です。包含反転は[前節の命題](#prop-ag1-08-order-reversing) (1) によります。

$V(R)=\varnothing$ と $I(\varnothing)=R$ は定義から成立します。また $V((0))=k^n$ で、零点定理に $J=(0)$ を入れると $I(k^n)=\sqrt{(0)}=(0)$ です。最後に多項式環は整域なので $(0)$ は根基的です。
<!-- proof-end -->

**なぜ一般のイデアルとの全単射ではないのか。** $(x)$ と $(x^m)$（$m\ge2$）は異なるイデアルですが、体には非零の冪零元がないため $V(x)=V(x^m)$ です。根基へ移れば $\sqrt{(x^m)}=(x)$ となり、この重複が解消します。座標環に冪零元を残す幾何は後のスキーム論で改めて扱います。

<a id="prop-ag1-08-closure"></a>

<!-- formal-statement-start -->
> **命題（任意の集合の Zariski 閉包）**  
> 代数閉体 $k$ 上で、任意の $S\subseteq k^n$ に対し $V(I(S))$ は $S$ を含む最小の Zariski 閉集合である。また $I(S)=I(V(I(S)))$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$V(I(S))$ が $S$ を含むことは先ほど示しました。ほかの閉集合 $Y=V(J)$ が $S$ を含めば、包含反転によって $I(Y)\subseteq I(S)$ となるので $V(I(S))$ は $Y$ に入ります。

<!-- proof-start -->
### 証明

[零点・消滅操作の包含反転と往復](#prop-ag1-08-order-reversing)により $S\subseteq V(I(S))$、かつ $I(S)=I(V(I(S)))$ です。$Y$ を $S\subseteq Y$ を満たす任意の閉集合とします。$Y=V(J)$ と書け、$I(Y)\subseteq I(S)$ です。$V$ の包含反転と $Y=V(I(Y))$（前節の定理）を順に用いると

$$
V(I(S))\subseteq V(I(Y))=Y
$$

です。よって $V(I(S))$ が最小の閉集合です。
<!-- proof-end -->

この命題を無限集合にも適用できます。例えば $S=\{(a,0):a\in k\}$ はすでに直線という閉集合ですが、$S=\{(m,0):m=1,2,\ldots\}\subset\mathbb C^2$ でも $I(S)=(y)$ です。実際 $f(x,0)$ が無限個の異なる $m$ で零なら、一変数多項式の根の個数の上限から $f(x,0)=0$ であり、$f$ は $y$ で割り切れます。そのため $S$ の Zariski 閉包は直線 $V(y)$ になります。

## 3. 図形の和・交わりはイデアルのどの演算か

連立方程式の組を合わせれば共通零点は減り、どちらか一方の方程式系を満たす点を集めれば零点は増えます。しかし「和集合」に対応するのはイデアルの**和ではない**ことに注意します。

<a id="prop-ag1-08-set-ideal-operations"></a>

<!-- formal-statement-start -->
> **命題（消滅イデアルの演算法則）**  
> 任意の体 $k$、任意の集合 $X,Y\subseteq k^n$ について、次が成り立つ。

$$
I(X\cup Y)=I(X)\cap I(Y).
$$

> さらに $k$ が代数閉体で、$X,Y$ が Zariski 閉集合なら、次の公式が成り立つ。

$$
I(X\cap Y)=\sqrt{I(X)+I(Y)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[零点集合の包含・共通部分・和集合](../AG1-01/index.md#prop-ag1-01-zero-set-operations)から、和イデアルは図形の交わりへ、積イデアルは和集合へ対応することが既に分かっています。今回新しく求めるのは**消滅イデアルへ戻す向き**です。和集合の式は定義だけで確かめられますが、交わりの式では根基が必要になります。

<!-- proof-start -->
### 証明

$f\in I(X\cup Y)$ とは、$f$ が $X$ と $Y$ の両方のすべての点で零となることです。これは $f\in I(X)$ かつ $f\in I(Y)$ と同値なので、最初の等式が成立します。この部分は代数閉性を使いません。

次に $X,Y$ を Zariski 閉集合とします。[閉集合と根基イデアルの対応](#thm-ag1-08-closed-radical-bijection)から $X=V(I(X))$ と $Y=V(I(Y))$ です。この二つの閉集合に、[零点集合の包含・共通部分・和集合](../AG1-01/index.md#prop-ag1-01-zero-set-operations)を適用すると

$$
X\cap Y=V(I(X))\cap V(I(Y))=V(I(X)+I(Y))
$$

となります。[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を右端のイデアル $I(X)+I(Y)$ に適用して

$$
I(X\cap Y)=I(V(I(X)+I(Y)))=\sqrt{I(X)+I(Y)}
$$

を得ます。右辺に根基が現れるのは、この最後の定理適用のためです。
<!-- proof-end -->

<a id="cor-ag1-08-radical-operations"></a>

<!-- formal-statement-start -->
> **系（根基を取った和・積・共通部分）**  
> 代数閉体 $k$ 上の任意のイデアル $J,K\subseteq R=k[x_1,\ldots,x_n]$ について次が成り立つ。

$$
\begin{aligned}
\sqrt{J+K}&=I\bigl(V(J)\cap V(K)\bigr),\\
\sqrt{JK}&=\sqrt{J\cap K}=\sqrt J\cap\sqrt K.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

零点集合を挟んで強零点定理で戻します。根基を取れば和集合は共通部分、交わりは和（の根基）へと対応します。

<!-- proof-start -->
### 証明

[消滅イデアルの演算法則](#prop-ag1-08-set-ideal-operations)を適用してから、[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を使います。これらの等式により

$$
\sqrt{J+K}=I(V(J+K))=I(V(J)\cap V(K))
$$

です。同じく

$$
\begin{aligned}
\sqrt{JK}
 &=I(V(JK))
 =I(V(J)\cup V(K))\\
 &=I(V(J))\cap I(V(K))
 =\sqrt J\cap\sqrt K
\end{aligned}
$$

です。ここで $JK\subseteq J\cap K$ なので、包含反転により $V(J\cap K)\subseteq V(JK)$ です。一方 $J\cap K\subseteq J,K$ なので $V(J)\cup V(K)\subseteq V(J\cap K)$ です。[零点集合の包含・共通部分・和集合](../AG1-01/index.md#prop-ag1-01-zero-set-operations)から $V(JK)=V(J)\cup V(K)$ であり、両側から挟んで $V(J\cap K)=V(JK)$ を得ます。従って同じ零点定理を適用して $\sqrt{J\cap K}=I(V(J\cap K))=I(V(JK))=\sqrt{JK}$ です。
<!-- proof-end -->

**具体例：接している二曲線。** $X=V(y)$（$x$ 軸）と $Y=V(y-x^2)$（放物線）を考えます。共通点では $y=0$ かつ $x^2=0$ だから $X\cap Y=\{(0,0)\}$ です。一方、方程式を合わせたイデアルは $(y,y-x^2)=(y,x^2)$ で、$(x,y)$ とは異なります。対応は

$$
I(X\cap Y)=\sqrt{(y,x^2)}=(x,y)
$$

となります。**交点の集合だけ**では $x^2$ という冪の情報は区別されません。

## 4. 既約成分は素イデアルに対応する

一本の直線は二つの真の閉部分集合の和集合としては表せません。このような集合を[既約閉集合](../AG1-02/index.md#def-ag1-02-irreducible)と呼びました。[既約集合と消滅イデアルの素性](../AG1-02/index.md#thm-ag1-02-irreducible-prime)を、今回の全単射と組み合わせると「任意の素イデアルから出発しても既約な図形を作れる」という逆向きも得られます。

<a id="thm-ag1-08-prime-irreducible"></a>

<!-- formal-statement-start -->
> **定理（既約閉集合と素イデアル）**  
> $k$ を代数閉体、$R=k[x_1,\ldots,x_n]$ とする。空でない Zariski 閉集合 $X$ が既約であることと、$I(X)$ が素イデアルであることは同値である。
>
> また任意の素イデアル $\mathfrak p\subsetneq R$ に対して $V(\mathfrak p)$ は空でない既約閉集合となり、次の等式を満たす。

$$
I(V(\mathfrak p))=\mathfrak p.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初の同値は既習の定理です。逆写像で素イデアルから既約閉集合が得られるには、素イデアルが根基的であることと、真のイデアルに零点が存在することを確認します。

<!-- proof-start -->
### 証明

[既約集合と消滅イデアルの素性](../AG1-02/index.md#thm-ag1-02-irreducible-prime)を閉集合 $X$ に適用すれば、空でない既約性と $I(X)$ の素性は同値です。

任意の素イデアル $\mathfrak p$ は根基的です。実際、$f^m\in\mathfrak p$ なら、$m=1$ は明白で、$m\ge2$ では $f\cdot f^{m-1}\in\mathfrak p$ です。[真のイデアル・素イデアル・極大イデアルの定義](../../RNG/RNG2/index.md#def-rng2-prime-maximal)をこの積に適用すると $f\in\mathfrak p$ または $f^{m-1}\in\mathfrak p$ です。後者なら冪指数を一つ減らして同じ議論を続け、有限回で $f\in\mathfrak p$ を得ます。従って[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)より $I(V(\mathfrak p))=\sqrt{\mathfrak p}=\mathfrak p$ です。

$\mathfrak p$ は真なので、[弱Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)の対偶から $V(\mathfrak p)\ne\varnothing$ です。最初の同値に $X=V(\mathfrak p)$ を適用すれば、$I(X)=\mathfrak p$ の素性から $X$ は既約です。
<!-- proof-end -->

<a id="prop-ag1-08-components-minimal-primes"></a>

<!-- formal-statement-start -->
> **命題（既約成分と極小素イデアル）**  
> $k$ を代数閉体、$J\subsetneq R=k[x_1,\ldots,x_n]$ をイデアルとする。$V(J)$ の既約成分は、$J$ を含む素イデアルのうち包含関係で極小なもの $\mathfrak p$ に対する $V(\mathfrak p)$ とちょうど一致する。特に $V(J)$ が有限個の既約成分 $V(\mathfrak p_1),\ldots,V(\mathfrak p_r)$ を持つなら

$$
\sqrt J=\mathfrak p_1\cap\cdots\cap\mathfrak p_r
$$

> であり、$\mathfrak p_i$ のどれも別の $\mathfrak p_j$ を真に含まない。
<!-- formal-statement-end -->

### 証明の見取り図

[既約成分](../AG1-02/index.md#def-ag1-02-component)は既約閉部分集合の包含最大のものです。今回の全単射は包含を反転するので、これが素イデアルの包含極小性へ移ります。交わりの式は閉集合の有限和集合を消滅イデアルで戻して得ます。

<!-- proof-start -->
### 証明

$Y\subseteq V(J)$ が空でない既約閉部分集合なら、[既約性と素イデアル](#thm-ag1-08-prime-irreducible)から $I(Y)=\mathfrak p$ は素イデアルで、包含反転により $J\subseteq I(V(J))=\sqrt J\subseteq\mathfrak p$ です。逆に $J\subseteq\mathfrak p$ を満たす素イデアルには、空でない既約閉集合 $V(\mathfrak p)\subseteq V(J)$ が対応します。

この対応で $Y_1\subseteq Y_2$ は $I(Y_2)\subseteq I(Y_1)$ に対応し、どちらの合成も恒等なので、包含の真偽も正確に逆転します。従って既約閉部分集合の包含最大性は、$J$ を含む素イデアルの包含極小性に一致します。

最後に $V(J)=\bigcup_{i=1}^rV(\mathfrak p_i)$ と書けるとき、[和集合の消滅イデアル](#prop-ag1-08-set-ideal-operations)を繰り返し、[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を使えば

$$
\sqrt J=I(V(J))
 =I\left(\bigcup_{i=1}^rV(\mathfrak p_i)\right)
 =\bigcap_{i=1}^r I(V(\mathfrak p_i))
 =\bigcap_{i=1}^r\mathfrak p_i
$$

です。互いに真に包含されないことは各成分が包含最大であることから従います。
<!-- proof-end -->

例えば $J=(xy)\subset k[x,y]$ では、$V(J)$ は $V(x)$ と $V(y)$ の二本の軸の和集合です。$(x)$ と $(y)$ は、商環がそれぞれ $k[y]$、$k[x]$ となるため素イデアルです。互いに包含されない二本の軸がちょうど既約成分なので、極小素イデアルは $(x)$、$(y)$ です。また $f\in(x)\cap(y)$ なら $f=xg$ と書け、$0=f(x,0)=xg(x,0)$ なので $g(x,0)=0$、つまり $g=yh$ です。よって

$$
(x)\cap(y)=(xy)=\sqrt{(xy)}.
$$

この計算は、図形の分解をイデアルの共通部分へ翻訳したものです。[Noether空間の有限既約成分分解](../AG1-02/index.md#thm-ag1-02-noether-components)と[アフィン空間のNoether性](../AG1-05/index.md#thm-ag1-05-zariski-noether)により、一般のアフィン代数的集合でも既約成分は有限個であることが分かります。

## 5. 体を変えると何が壊れるか

代数閉性を外しても[包含反転と往復](#prop-ag1-08-order-reversing)の各式と、[消滅イデアルの和集合公式](#prop-ag1-08-set-ideal-operations) $I(X\cup Y)=I(X)\cap I(Y)$ は任意の体で成り立ちます。しかし、同じ命題の **交わりの公式** $I(X\cap Y)=\sqrt{I(X)+I(Y)}$ や根基的イデアルとの全単射は、代数閉性なしには一般に成り立ちません。

実数上で $J=(x^2+1)\subset\mathbb R[x]$ は真の根基的イデアル（商は体 $\mathbb C$ と同型）なのに $V_{\mathbb R}(J)=\varnothing$ です。そのため $I_{\mathbb R}(V_{\mathbb R}(J))=\mathbb R[x]\ne J$ となります。有限体 $\mathbb F_2$ でも、$x^2-x$ は $0,1$ の両方で零となる非零多項式なので、$\sqrt{(0)}=(0)$ と $I_{\mathbb F_2}(\mathbb F_2)$ は一致しません。

交わりの公式が破れる例も計算します。$k=\mathbb R$ とし、$X=V_{\mathbb R}(y)$、$Y=V_{\mathbb R}(y-x^2(x^2+1))$ を取ります。前者は $x$ 軸、後者は多項式のグラフです。実数では $x^2+1>0$ なので、共通点は原点だけです。従って

$$
I_{\mathbb R}(X\cap Y)=(x,y).
$$

一方、任意の多項式 $f(x,y)$ を $y$（または $y-x^2(x^2+1)$）で割った余りは $x$ だけの多項式です。各グラフのすべての実数点で零なら、その余りは無限個の根を持つため零多項式となります。よって

$$
I_{\mathbb R}(X)=(y),\qquad
I_{\mathbb R}(Y)=(y-x^2(x^2+1)),
$$

であり、和は $(y,x^2(x^2+1))$ です。もし $x$ がこの和の根基に属すれば、ある $m\ge1$ で $x^m$ が和に入り、$y=0$ を代入すると $x^m$ は $\mathbb R[x]$ で $x^2(x^2+1)$ の倍数になります。しかし複素数 $x=i$ を代入すると右辺は零、左辺は $i^m\ne0$ で矛盾します。つまり

$$
x\in I_{\mathbb R}(X\cap Y),\qquad
x\notin\sqrt{I_{\mathbb R}(X)+I_{\mathbb R}(Y)}.
$$

この差は、複素数上にはある零点を実数の点集合からは検出できないために生じます。

壊れる機構は、[弱Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-weak-nullstellensatz)を支える**基礎体の代数閉性**が失われ、真のイデアルが必ず基礎体上の零点を持つとは言えなくなることです。特に「素イデアルは必ず $k$ の点を含む既約集合を定める」という本章の逆向きは、代数閉性なしには主張できません。

## 6. 演習：対応を逆向きにも使う

以下、断らない限り $k=\mathbb C$、$R=k[x,y]$ とします。いずれも集合とイデアルのどちらを計算しているか区別してください。

**Level A：定義から往復する**

### A1. 冪を消した直線

$J=(x^3,xy)$ とする。$V(J)$、$I(V(J))$、$\sqrt J$ を求めよ。

- Level: A
- ID: AG1-08-A1

<!-- solution-start -->
**詳細解答**　$x^3=0$ から $x=0$ となり、$xy=0$ は自動的に成立するので $V(J)=\{(0,b):b\in k\}$ です。任意の $f\in k[x,y]$ を $f(x,y)=f(0,y)+xg(x,y)$ と分けます。$f$ が直線上で零なら $f(0,b)=0$ がすべての $b\in k$ に対し成立します。$k$ は無限体なので $f(0,y)$ は零多項式です。従って $I(V(J))=(x)$ です。[強零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)から $\sqrt J=(x)$ です。直接にも $x^3\in J$ だから $x\in\sqrt J$、一方 $J\subseteq(x)$ で $(x)$ は根基的なので両包含が成立します。
<!-- solution-end -->

### A2. 二軸の和集合と交点

$X=V(x)$、$Y=V(y)$ について、$I(X\cup Y)$ と $I(X\cap Y)$ を求めよ。

- Level: A
- ID: AG1-08-A2

<!-- solution-start -->
**詳細解答**　$X$ と $Y$ はそれぞれ $y$ 軸と $x$ 軸であり、$I(X)=(x)$、$I(Y)=(y)$ です。[和集合の公式](#prop-ag1-08-set-ideal-operations)より $I(X\cup Y)=(x)\cap(y)$ です。$f\in(x)\cap(y)$ なら $f=xg$ と書け、$y=0$ とすると $0=f(x,0)=xg(x,0)$ なので $g(x,0)=0$、すなわち $g=yh$ です。従って $(x)\cap(y)=(xy)$ です。一方 $X\cap Y=\{(0,0)\}$ で、任意の多項式 $f$ は原点で零となることと定数項が零であることが同値です。定数項が零ならすべての単項式は $x$ または $y$ の倍数なので $I(X\cap Y)=(x,y)$ です。
<!-- solution-end -->

### A3. 包含が反転するのに零点は等しい

$J=(x^2)$、$K=(x)$ とする。$J\subsetneq K$、$V(J)=V(K)$、$\sqrt J=\sqrt K$ をそれぞれ示せ。

- Level: A
- ID: AG1-08-A3

<!-- solution-start -->
**詳細解答**　$x^2=x\cdot x$ から $(x^2)\subseteq(x)$ です。一方 $x=x^2q(x,y)$ が成り立てば $x$ の次数を比較するか $y=0$ として $k[x]$ で考えることで矛盾するので真の包含です。体の任意の $a$ に対して $a^2=0$ と $a=0$ は同値だから、両零点集合は $V(x)$ です。さらに $x^2\in J$ から $x\in\sqrt J$、$J\subseteq(x)$ と $(x)$ の根基性から $\sqrt J=(x)$ です。$K=(x)$ 自体は根基的なので $\sqrt K=(x)$ です。零点操作が一般イデアルを区別しない具体例です。
<!-- solution-end -->

### A4. 空集合と全空間

$R=k[x,y]$ において $I(\varnothing)$ と $I(k^2)$ を求め、後者を零点定理を使わずに証明せよ。

- Level: A
- ID: AG1-08-A4

<!-- solution-start -->
**詳細解答**　空集合の全点で消えるという条件は反例となる点がないため、すべての多項式が条件を満たし $I(\varnothing)=R$ です。$f\in I(k^2)$ とし、$f(x,y)=\sum_{j=0}^d a_j(y)x^j$ と書きます。任意の $b\in k$ を固定すると $f(x,b)\in k[x]$ はすべての $a\in k$ で零です。無限体上の一変数非零多項式は次数を超える数の根を持たないので $f(x,b)=0$、すなわち各 $j$ で $a_j(b)=0$ です。これがすべての $b\in k$ で成立するため同じ理由から $a_j(y)=0$ です。従って $f=0$、逆に零多項式は全点で消えるので $I(k^2)=(0)$ です。
<!-- solution-end -->

**Level B：演算・既約性・仮定を接続する**

### B1. 和イデアルと根基の指数

$J=(x^2)$、$K=(y^3)$ とする。$I(V(J)\cap V(K))$ を求め、任意の $h\in(x,y)$ について $h^4\in(x^2,y^3)$ を示せ。

- Level: B
- ID: AG1-08-B1

<!-- solution-start -->
**詳細解答**　$V(J)=V(x)$、$V(K)=V(y)$ なので交わりは原点のみです。よって $I(V(J)\cap V(K))=(x,y)$ です。$h=xp+yq$ と書くと、二項展開により $h^4$ の各項は $(xp)^i(yq)^{4-i}$（$0\le i\le4$）の定数倍です。$i\ge2$ の項は $x^2$ で割り切れます。$i\le1$ の項では $4-i\ge3$ なので $y^3$ で割り切れます。従ってすべての項が $(x^2,y^3)$ に属し $h^4\in(x^2,y^3)$ です。逆に $f^m\in(x^2,y^3)$ なら原点で $f(0,0)^m=0$ だから $f\in(x,y)$ であり、$\sqrt{(x^2,y^3)}=(x,y)$ が直接にも確かめられます。
<!-- solution-end -->

### B2. 積と交わりはいつ異なるか

$J=(x)$、$K=(x,y)$ とする。$JK$、$J\cap K$ と、それぞれの根基を求めよ。

- Level: B
- ID: AG1-08-B2

<!-- solution-start -->
**詳細解答**　積イデアルの生成元を掛け合わせて $JK=(x^2,xy)$ です。一方 $J\subset K$ なので $J\cap K=J=(x)$ です。両者が違うのは $x\notin(x^2,xy)$ のためです。実際 $y=0$ とすると $(x^2,xy)$ の像は $(x^2)\subset k[x]$ ですが $x\notin(x^2)$ です。$V(JK)$ は $x^2=0$ により $V(x)$、$V(J\cap K)=V(x)$ です。[強零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)で戻すと $\sqrt{JK}=\sqrt{J\cap K}=I(V(x))=(x)$ です。積と共通部分は一般には一致せず、根基を取って初めて一致することを示しています。
<!-- solution-end -->

### B3. 三本の直線の極小素イデアル

$J=(xy(y-x))$ とする。$V(J)$ の既約成分と $J$ を含む極小素イデアルを求め、$\sqrt J=J$ を示せ。

- Level: B
- ID: AG1-08-B3

<!-- solution-start -->
**詳細解答**　体には零因子がないので $xy(y-x)=0$ は $x=0$、$y=0$、$y=x$ のいずれかです。従って $V(J)=V(x)\cup V(y)\cup V(y-x)$ です。各直線の消滅イデアルはそれぞれ $(x)$、$(y)$、$(y-x)$ で、商環はいずれも $k[t]$ に同型ですから素イデアルです。[既約性と素イデアル](#thm-ag1-08-prime-irreducible)により各直線は既約です。各直線はほかの二本の和集合に含まれないので三本が既約成分です。[既約成分と極小素イデアル](#prop-ag1-08-components-minimal-primes)から極小素イデアルはこの三つです。

$\sqrt J=(x)\cap(y)\cap(y-x)$ です。$f$ がこの共通部分に入れば、まず $f=xg$、$(y)$ への所属を $y=0$ で調べると $0=xg(x,0)$ なので $g\in(y)$、すなわち $f=xyh$ です。さらに $f\in(y-x)$ なので $y=x$ を代入し、$0=x^2h(x,x)$ を得ます。$k[x]$ は整域だから $h(x,x)=0$ で、$h$ は $y-x$ で割り切れます。従って $f\in(xy(y-x))=J$ であり、逆包含は生成元から明らかなので $\sqrt J=J$ です。
<!-- solution-end -->

### B4. 代数閉性を失ったとき

$\mathbb R[x]$ の $J=(x^2+1)$ が根基的で、$I_{\mathbb R}(V_{\mathbb R}(J))\ne J$ であることを示し、どの証明段階が使えないか述べよ。

- Level: B
- ID: AG1-08-B4

<!-- solution-start -->
**詳細解答**　商環 $\mathbb R[x]/(x^2+1)$ では $\overline{x}^2=-1$ であり、$\overline{a+bx}$（$a,b\in\mathbb R$）が非零なら $a^2+b^2>0$ です。その逆元は $\overline{(a-bx)/(a^2+b^2)}$ であり、積は $\overline{(a^2+b^2)/(a^2+b^2)}=1$ です。従って商は体で、$J$ は極大、特に素・根基的です。一方 $a^2+1>0$ がすべての実数 $a$ で成立するため $V_{\mathbb R}(J)=\varnothing$、よって $I_{\mathbb R}(V_{\mathbb R}(J))=\mathbb R[x]\ne J$ です。本章の全単射の証明では $I(V(J))=\sqrt J$ とする強零点定理の適用が失敗します。その前提である基礎体の代数閉性がありません。
<!-- solution-end -->

**Level C：複数の対応を一度に再構成する**

### C1. 冪を持つ直線と放物線

$J=(x^2,xy)$、$K=(y-x^2)$ とする。(1) $V(J)$ と $\sqrt J$、(2) $V(J)\cap V(K)$ とその消滅イデアル、(3) $V(J)\cup V(K)$ の消滅イデアルを求めよ。

- Level: C
- ID: AG1-08-C1

<!-- solution-start -->
**詳細解答**　(1) $x^2=0$ は $x=0$ を意味し、$xy=0$ はそこで自動的に成立します。従って $V(J)=V(x)$ です。直線上で消える多項式は $(x)$ にちょうど属するので $I(V(J))=(x)$、[強零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)により $\sqrt J=(x)$ です。

(2) 二集合の交わりでは $x=0$ かつ $y-x^2=0$ ですから $y=0$、すなわち唯一の点 $(0,0)$ を得ます。従って $I(V(J)\cap V(K))=(x,y)$ です。和イデアルでも $J+K=(x^2,xy,y-x^2)=(x^2,y)$ となり、$\sqrt{J+K}=(x,y)$ なので[交わりの公式](#prop-ag1-08-set-ideal-operations)と一致します。最初の等号は $y=(y-x^2)+x^2$ と $xy\in(y)$ によります。

(3) $I(V(J))=(x)$、$I(V(K))=(y-x^2)$ です。[消滅イデアルの演算法則](#prop-ag1-08-set-ideal-operations)を適用すると、求めるイデアルは $(x)\cap(y-x^2)$ です。$f=xg$ が $(y-x^2)$ にも属すれば、商 $R/(y-x^2)\simeq k[x]$ で $0=\overline{x}\,\overline g$ となります。$k[x]$ は整域で $\overline x\ne0$ なので $\overline g=0$ です。よって $g\in(y-x^2)$ であり、

$$
I(V(J)\cup V(K))=(x(y-x^2))
$$

となります。元の $J$ が冪を持っていても、和集合の消滅イデアルはそれを区別しません。
<!-- solution-end -->

### C2. 根基の演算法則を一から証明する

代数閉体 $k$ 上で任意のイデアル $J,K\subseteq k[x_1,\ldots,x_n]$ に対して $\sqrt{JK}=\sqrt J\cap\sqrt K$ を証明せよ。さらに $J=(x^2)$、$K=(xy)$ に適用して両辺を計算せよ。

- Level: C
- ID: AG1-08-C2

<!-- solution-start -->
**詳細解答**　まず $f\in\sqrt{JK}$ ならある $m\ge1$ で $f^m\in JK$ です。$JK\subseteq J$ と $JK\subseteq K$ より $f^m$ はそれぞれに属し、$f\in\sqrt J\cap\sqrt K$ となります。逆に $f\in\sqrt J\cap\sqrt K$ なら、ある $a,b\ge1$ で $f^a\in J$、$f^b\in K$ です。積を取れば

$$
f^{a+b}=f^af^b\in JK
$$

なので $f\in\sqrt{JK}$ です。従って一般の可換環でも等式は成立します。

具体例では $\sqrt{(x^2)}=(x)$ です。また $K=(xy)$ は $(x)\cap(y)$ と等しく根基的なので $\sqrt K=(xy)$ です。従って右辺は $(x)\cap(xy)=(xy)$ です。左辺でも $JK=(x^3y)$ となり、$V(x^3y)=V(xy)$ です。そこで[強Hilbertの零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)を適用すると $\sqrt{(x^3y)}=I(V(xy))=(xy)$ です。抽象的な指数計算と具体的な零点計算が一致します。
<!-- solution-end -->

以上により、**図形の包含・交わり・和集合・既約成分**が、それぞれ**イデアルの逆向きの包含・和の根基・共通部分・極小素イデアル**に翻訳されます。次章ではこの翻訳を使い、素イデアルの鎖と超越次数から次元を測ります。
