# EC6 降下法・弱Mordell–Weil定理・Mordell–Weil定理

[EC5の正規高さ](../EC5/index.md#thm-ec5-canonical-height)は、点を倍にすると4倍になり、高さを一定値以下に制限すれば点は有限個しかないことを教えてくれました。しかし有理点群 $E(\mathbb Q)$ は無限集合であり得ます。「高さが高い点を半分に戻す」だけでは、そもそも有理点として半分が取れる保証がありません。

そこで問題を二段階に分けます。第一は「半分に戻せない点にも、有限個の余りを足せば半分に戻せる」と証明すること。第二は「有限個の余りと高さ評価によって、実際に有限個の生成元へ降りていく」と証明することです。第一の道具が **降下法（descent）**、第二の結論が **有理点群の有限生成性**です。これを一般の曲線へ拡張した定理は第7節で述べます。

本章では有理2位数点を持つ曲線について、2-isogeny の座標式から降下法を完全に計算します。一般の曲線に拡張するときに必要になる数体上の有限性も、どの主張が新たな算術的入力なのかを切り分けます。主として非特異な整数係数短 Weierstrass 曲線を考えますが、2位数点を $(0,0)$ に移す節では二次項を持つ形も使います。

## 1. 「2で割った余り」が有限とは何か

加法をもつ群 $G=E(\mathbb Q)$ で $2G=\{[2]Q:Q\in G\}$ は部分群です。[EC2の群則](../EC2/index.md#thm-ec2-associativity)により、$P$ と $R$ が同じ剰余類に入る条件は $P-R=[2]Q$ となる有理点 $Q$ が存在することです。$P$ 自体が2倍点である必要はありません。

<a id="def-ec6-weak-mw"></a>

<!-- formal-statement-start -->
> **定義（2倍商と弱Mordell–Weilの性質）**  
> 非特異楕円曲線 $E/\mathbb Q$ に対して
>
$$
2E(\mathbb Q)=\{[2]Q:Q\in E(\mathbb Q)\},\qquad
E(\mathbb Q)/2E(\mathbb Q)
$$
>
> を考える。後者が有限集合となる性質を、この章では **2に関する弱Mordell–Weilの性質**という。一般に整数 $m\ge2$ について $E(\mathbb Q)/mE(\mathbb Q)$ が有限であることを、$m$ に関する性質という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec6-weak-mw -->
**定義の確認**。$E:y^2=x^3-x$ の $T=(0,0)$ は $T=-T$ なので $2T=O$ です。ただし $T\in2E(\mathbb Q)$ かどうかは別問題です。商の元 $[T]$ は「$T$ に2倍点を足して得られる点すべて」を表します。有限位数点の個数と商の個数を同じものとして数えてはいけません。
<!-- definition-example-end -->

有理点群が有限生成なら、この商は有限です。逆向きの証明には、高さという楕円曲線固有の道具が必要になります。

## 2. 有理2位数点から2-isogenyを作る

$T=(0,0)$ が非零の2位数点となる曲線は、$x$ を平行移動したうえで
$$
E_{a,b}:\quad y^2=x(x^2+ax+b),\qquad
a,b\in\mathbb Z,\quad b(a^2-4b)\ne0
$$
と書けます。最後の条件は $x=0$ が単根であり、残りの二根も異なるという非特異性の条件です。

[EC4の次数2同種写像](../EC4/index.md#prop-ec4-two-isogeny)を、これから使う座標で再掲します。$b'=a^2-4b$、$a'=-2a$ とし、
$$
E':\quad Y^2=X(X^2+a'X+b')
$$
を置きます。$x\ne0$ では
$$
\phi(x,y)=\left(x+a+\frac b x,\quad
y\left(1-\frac b{x^2}\right)\right)
$$
であり、$O$ と $T$ は $O'$ に移ります。同種写像は群準同型で、核は $\{O,T\}$ です。

もう一度同じ作り方を $E'$ に適用すると、係数は
$$
-2a'=4a,\qquad (a')^2-4b'=16b
$$
となります。$(U,V)\mapsto(U/4,V/8)$ で $E$ に戻すと、次の写像が生まれます。

<a id="prop-ec6-dual-two-isogeny"></a>

<!-- formal-statement-start -->
> **命題（明示的な双対2-isogeny）**  
> 上の $E,E'$ について $X\ne0$ では
>
$$
\widehat\phi(X,Y)=
\left(\frac{X+a'+b'/X}{4},
\frac{Y(1-b'/X^2)}8\right)
$$
>
> と定める。この写像は $E'\to E$ の次数2同種写像に延長され、$\widehat\phi(O')=\widehat\phi(0,0)=O$、かつ
>
$$
\widehat\phi\circ\phi=[2]_E,\qquad
\phi\circ\widehat\phi=[2]_{E'}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二度の商写像を作ると係数は $(16b,4a)$ の形になり、座標を $(4,8)$ で縮めれば元の曲線です。合成の $x$ 座標が[EC2の倍加公式](../EC2/index.md#def-ec2-chord-tangent-addition)と一致することに加え、$y$ 座標の符号も確かめます。

<!-- proof-start -->
### 証明

$\phi$ の $x$ 座標を $U=x+a+b/x=y^2/x^2$、$y$ 座標を $V=y(1-b/x^2)$ とします。二回目の写像の $x$ 座標は $U-2a+b'/U$ だから
$$
x(\widehat\phi\phi(P))
=\frac14\left(U-2a+\frac{a^2-4b}{U}\right).
$$
$U=(x^2+ax+b)/x$ を代入し分子を通分すると
$$
\frac{(x^2+b)^2-4bx^2}{4x(x^2+ax+b)}
=\frac{(x^2-b)^2}{4y^2}.
$$
これは $y^2=x^3+ax^2+bx$ に対する
$$
x(2P)=\left(\frac{3x^2+2ax+b}{2y}\right)^2-2x-a
$$
を展開した結果と一致します。$y$ 座標についても $V= y(1-b/x^2)$ を
$$
y(\widehat\phi\phi(P))=\frac{V}{8}\left(1-\frac{b'}{U^2}\right)
$$
に代入し、$y^2=x(x^2+ax+b)$ で約分すると、倍加公式の
$$
y(2P)=-y+\frac{3x^2+2ax+b}{2y}\bigl(x-x(2P)\bigr)
$$
に一致します。従って分母が非零となる点で合成は $[2]$ です。両辺は曲線上の射なので一致は $O$ や有限個の例外点へも延長します。$E'$ 側も同じ構成を施して係数を置換すれば成立します。$\square$
<!-- proof-end -->

*計算例*。$E:y^2=x^3-x$ では $a=0,b=-1$ ですから
$$
E':Y^2=X^3+4X,\qquad
\phi(x,y)=(x-1/x,\ y(1+1/x^2)).
$$
一方 $\widehat\phi(X,Y)=((X+4/X)/4,\ Y(1-4/X^2)/8)$ であり、例えば $(2,4)\in E'(\mathbb Q)$ は
$$
\widehat\phi(2,4)=(1,0)
$$
へ移ります。$(1,0)$ が $\phi$ の像に入るかどうかと、$\widehat\phi$ の像に入るかどうかは別の問いです。

## 3. 平方類を使う降下写像

$x$ が平方かどうかを、符号と素因数の指数の偶奇だけで記録したいと考えます。そこで零でない有理数について、二つの数の比が有理数の平方なら同じものとみなします。できる商群を $\mathbb Q^\times/(\mathbb Q^\times)^2$ と書き、$z$ の類を $[z]$ とします。

例えば $[18]=[2]$、$[-8]=[-2]$、$[1/9]=[1]$ です。符号と有限個の奇数指数の素数を指定すれば平方類は決まります。

<a id="def-ec6-descent-map"></a>

<!-- formal-statement-start -->
> **定義（2-isogenyの降下写像）**  
> $E:y^2=x(x^2+ax+b)$、$b(a^2-4b)\ne0$ とする。次の写像を定める。
>
$$
\alpha_E:E(\mathbb Q)\longrightarrow
\mathbb Q^\times/(\mathbb Q^\times)^2,\qquad
\alpha_E(P)=
\begin{cases}
[1]&P=O,\\
[b]&P=T=(0,0),\\
[x(P)]&P\ne O,T.
\end{cases}
$$
>
> $E'$ に対しても係数 $(a',b')$ で同じ定義を用い、$\alpha_{E'}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec6-descent-map -->
**定義の確認**。$E:y^2=x^3-x$ の $(1,0),(-1,0),T$ はいずれも曲線上にあり、$\alpha_E(1,0)=[1]$、$\alpha_E(-1,0)=[-1]$、$\alpha_E(T)=[b]=[-1]$ となります。$x(T)=0$ を $[0]$ として代入しないのは、平方類の群に零が含まれないからです。
<!-- definition-example-end -->

<a id="lem-ec6-descent-hom"></a>

<!-- formal-statement-start -->
> **補題（降下写像の準同型性）**  
> $\alpha_E$ は楕円曲線の加法から平方類の乗法への群準同型である。$E'$ にも同じ主張が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

直線が曲線と交わる三点の $x$ 座標の積が平方になることを使います。直線が $T$ を通る場合は切り分け、$x$ が零でも破綻しないようにします。

<!-- proof-start -->
### 証明

直線 $y=mx+n$ と曲線との交点の $x$ 座標を重複度込みで $x_1,x_2,x_3$ とします。代入すると
$$
0=x^3+(a-m^2)x^2+(b-2mn)x-n^2.
$$
根と係数の関係より $x_1x_2x_3=n^2$ です。$n\ne0$ なら三つの $x$ 座標はいずれも非零で、第三交点の逆元が最初の二点の和になること、および $x(-P)=x(P)$ から
$$
\alpha_E(P+Q)=[x(P+Q)]=[x(P)x(Q)]
$$
を得ます。接線の場合も根を重複して数えた同じ等式です。

$n=0$ の直線は $T$ を通ります。$P=(x,y)$、$x\ne0$ から $T$ を足すと、直線 $y=(y/x)X$ の残る交点の $x$ 座標は、$x^2+(a-(y/x)^2)x+b=0$ の根の積が $b$ であることから $b/x$ です。従って
$$
\alpha_E(P+T)=[b/x]=[b]\,[x]=\alpha_E(T)\alpha_E(P).
$$
$T+T=O$ は $[b]^2=[1]$ と一致します。鉛直線上では $P+(-P)=O$、平方類では $[x]^2=[1]$ です。$O$ を足す場合は定義から直ちに一致します。これで全ての例外を含みます。$\square$
<!-- proof-end -->

「準同型である」だけでなく、**核を2-isogenyの像として決める**と有限性へ進めます。

<a id="thm-ec6-descent-kernel"></a>

<!-- formal-statement-start -->
> **定理（降下写像の核）**  
> 第2節の二つの次数2同種写像に対し、次の等式が成立する。
>
$$
\ker\alpha_E=\widehat\phi(E'(\mathbb Q)),\qquad
\ker\alpha_{E'}=\phi(E(\mathbb Q)).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\widehat\phi$ の $x$ 座標は、$E'$ の式を用いると $(Y/(2X))^2$ です。逆方向は $x=t^2$ という条件から、$E'$ 上の前像を二次方程式で具体的に作ります。

<!-- proof-start -->
### 証明

$X\ne0$ の $Q'=(X,Y)\in E'(\mathbb Q)$ では
$$
x(\widehat\phi(Q'))=\frac{X+a'+b'/X}{4}
=\frac{Y^2}{4X^2},
$$
従って像の有限点で $x\ne0$ なら平方類は $[1]$ です。$O'$ と $(0,0)$ は $O$ に移ります。$Y=0$ の別の有理2位数点があれば、その像は $T$ で、この存在から $b$ は平方になります。ゆえに $\widehat\phi(E'(\mathbb Q))\subseteq\ker\alpha_E$。

逆に $\alpha_E(P)=[1]$ とします。$P=(t^2,y)$、$t\in\mathbb Q^\times$ の場合、$\widehat\phi$ の前像の $X$ 座標に必要なのは
$$
X^2-(4t^2+2a)X+(a^2-4b)=0
$$
です。その判別式は
$$
(4t^2+2a)^2-4(a^2-4b)
=16(t^4+at^2+b)=16y^2/t^2
$$
なので、二つの有理根
$$
X=2t^2+a\pm2y/t
$$
を持ちます。積は $b'=a^2-4b\ne0$ だからどちらも非零です。$Y=2tX$ と置くと
$$
Y^2=4t^2X^2=X(X^2-2aX+b')
$$
が二次方程式から従い、$Q'=(X,Y)\in E'(\mathbb Q)$ です。$\widehat\phi(Q')$ は $x$ 座標が $t^2$ の点なので $P$ または $-P$ であり、必要なら $Q'$ の符号を変えて $P$ を得ます。

$P=O$ なら $O'$ が前像です。$P=T$ で $[b]=[1]$ なら $b=s^2$（$s\in\mathbb Q^\times$）と書けます。このとき $X=a+2s$ または $a-2s$ の少なくとも一方は零でなく、$Q'=(X,0)\in E'(\mathbb Q)$ です。実際 $X^2-2aX+b'=(X-a)^2-4s^2=0$ であり、この点は $\widehat\phi(Q')=T$ を満たします。

$\ker\alpha_{E'}=\phi(E(\mathbb Q))$ は $(a,b)$ を $(a',b')$ に置き換え、二回目の同種写像を $4,8$ で縮める同じ計算です。$\square$
<!-- proof-end -->

## 4. なぜ平方類の候補が有限になるか

$\mathbb Q^\times/(\mathbb Q^\times)^2$ 自体は無限ですが、降下写像の値は曲線係数 $b$ の素因数に制限されます。ここが降下法の最初の有限性です。

<a id="lem-ec6-finite-squareclasses"></a>

<!-- formal-statement-start -->
> **補題（降下像を支える素数）**  
> $a,b\in\mathbb Z$、$b(a^2-4b)\ne0$ とする。任意の $P\in E(\mathbb Q)$ に対し、$\alpha_E(P)$ は $-1$ と $b$ を割る素数だけで生成される平方類に属する。従って $\alpha_E(E(\mathbb Q))$ は有限である。同様の結論が $E'$ では $b'=a^2-4b$ について成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$b$ を割らない素数 $p$ で $v_p(x)$ の奇偶を検査します。$v_p(x)<0$ なら三次項が支配し、$v_p(x)>0$ なら $bx$ が支配します。

<!-- proof-start -->
### 証明

$P=O,T$ の類はそれぞれ $[1],[b]$ なので主張を満たします。他の点では $x\ne0$。$p\nmid b$ とし、
$$
y^2=x(x^2+ax+b)
$$
の両辺の $p$-指数を比べます。

$v_p(x)<0$ なら、$x^3$ の指数 $3v_p(x)$ が $ax^2$ の指数 $v_p(a)+2v_p(x)$ と $bx$ の指数 $v_p(b)+v_p(x)$ より厳密に小さいので
$$
2v_p(y)=3v_p(x).
$$
左辺は偶数であり、$v_p(x)$ も偶数です。

$v_p(x)>0$ なら、$x^2+ax$ は $p$ で割れ、$p\nmid b$ より $v_p(x^2+ax+b)=0$。従って
$$
2v_p(y)=v_p(x)
$$
で、やはり偶数です。$v_p(x)=0$ の場合も偶数です。

このように $p\nmid b$ では $v_p(x)$ が偶数です。平方で約分すれば、類を代表する数は
$$
\pm\prod_{p\mid b}p^{\varepsilon_p},
\qquad \varepsilon_p\in\{0,1\}
$$
に限られます。したがって候補は高々 $2^{1+\omega(|b|)}$ 個です。$E'$ に同じ証明を適用すれば完了です。$\square$
<!-- proof-end -->

<a id="thm-ec6-special-weak-mw"></a>

<!-- formal-statement-start -->
> **定理（有理2位数点を持つ曲線の弱Mordell–Weil）**  
> $E/\mathbb Q$ が非特異で非零の有理2位数点を持つなら、
>
$$
\#\bigl(E(\mathbb Q)/2E(\mathbb Q)\bigr)<\infty.
$$
>
> 特に上記の $E_{a,b}$ について
>
$$
\#\bigl(E(\mathbb Q)/2E(\mathbb Q)\bigr)
\le \#\operatorname{im}\alpha_E\,
\#\operatorname{im}\alpha_{E'}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$[2]=\widehat\phi\phi$ です。$E/\widehat\phi E'$ の類の有限性と、$\widehat\phi E'/2E$ の類の有限性を別々に確認します。

<!-- proof-start -->
### 証明

[核の定理](#thm-ec6-descent-kernel)と群準同型の第一同型定理から
$$
E(\mathbb Q)/\widehat\phi(E'(\mathbb Q))
\simeq\operatorname{im}\alpha_E
$$
です。同じく $E'(\mathbb Q)/\phi(E(\mathbb Q))\simeq\operatorname{im}\alpha_{E'}$。また合成公式から
$$
2E(\mathbb Q)=\widehat\phi(\phi(E(\mathbb Q))).
$$
従って $\widehat\phi(E'(\mathbb Q))/2E(\mathbb Q)$ は $E'(\mathbb Q)/\phi(E(\mathbb Q))$ の準同型像であり、その位数は後者を超えません。中間の部分群を挟む有限商の個数を掛ければ主張の不等式が得られます。[平方類の有限性](#lem-ec6-finite-squareclasses)により両因子は有限です。

元の曲線が有理2位数点を持つなら、その点の $x$ 座標を原点へ平行移動し、係数の分母を有理スケーリングで払って上の整数係数形にできます。曲線の $\mathbb Q$ 上の同型は点群と倍数写像を保つので結論が移ります。$\square$
<!-- proof-end -->

**具体的なrank判定の入口**。$E:y^2=x^3-x$、$E':Y^2=X^3+4X$ を再び考えます。$E$ では $b=-1$ より $\operatorname{im}\alpha_E\subseteq\{[1],[-1]\}$、しかも $\alpha_E(T)=[-1]$ なので像はちょうど2元です。$E'$ は $Y^2=X(X^2+4)$ なので有限実点の $X$ は正であり、$b'=4$ による候補は $[1],[2]$ だけです。$(2,4)\in E'(\mathbb Q)$ が $[2]$ を与えるので、像はちょうど2元です。従って $E(\mathbb Q)/2E(\mathbb Q)$ は高々4元です。

ここまでの「高々4元」から直ちに $E(\mathbb Q)$ が4元群だとは言えません。次節で有限生成を証明した後、torsion群と合わせてrankを決めます。

## 5. 有限商から有限生成へ：高さ降下

[EC5の倍加高さ評価](../EC5/index.md#lem-ec5-height-doubling)だけでは、$P=2Q+R$ の余り $R$ を引くと高さが大きくなりそうで心配です。そこで **固定された $R$ を足す操作は、高さを高々3倍と定数分だけしか増やさない** ことを、座標の分子・分母から直接確かめます。

<a id="lem-ec6-translation-height"></a>

<!-- formal-statement-start -->
> **補題（固定点の平行移動に関する高さ上界）**  
> 整数係数の非特異短 Weierstrass 曲線 $E:y^2=x^3+Ax+B$ と $R\in E(\mathbb Q)$ を固定する。このとき $R$ に依存する定数 $D_R\ge0$ が存在し、任意の $P\in E(\mathbb Q)$ で
>
$$
h_x(P+R)\le3h_x(P)+D_R
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x(P)=a/d^2,\ y(P)=c/d^3$ と書きます。分子 $a$ と $d^2$ の最大値を $H$ とすると、曲線式から $|c|$ は $H^{3/2}$ の定数倍以下です。加法公式の分子・分母はいずれも $H^3$ の定数倍以下となります。

<!-- proof-start -->
### 証明

[EC5の分母の平方・立方形](../EC5/index.md#lem-ec5-denominator-shape)から、有限点 $P=(a/d^2,c/d^3)$ は $a,c\in\mathbb Z,d\ge1$ と書けます。$H=\max(|a|,d^2)$ とすると
$$
c^2=a^3+Aad^4+Bd^6
$$
だから $|c|\le C_E H^{3/2}$ となります。ここで $C_E=\sqrt{1+|A|+|B|}$ と選べます。

$R=(u,v)$ を有限点として固定し、$x(P)\ne u$ とします。[EC2の加法公式](../EC2/index.md#def-ec2-chord-tangent-addition)を代入して通分すると
$$
x(P+R)=\frac{N}{D},\qquad
N=(c-vd^3)^2-(a+ud^2)(a-ud^2)^2,\qquad
D=d^2(a-ud^2)^2.
$$
$u,v$ は固定した有理数なので、その分母を払う固定整数 $M_R>0$ を取れば $M_RN,M_RD$ は整数です。また
$$
|c-vd^3|\le(C_E+|v|)H^{3/2},
\quad |a\pm ud^2|\le(1+|u|)H
$$
より $\max(|M_RN|,|M_RD|)\le K_RH^3$ を満たす定数 $K_R$ が存在します。既約化は高さを増やさないので
$$
h_x(P+R)\le\log(K_RH^3)=3h_x(P)+\log K_R.
$$
$x(P)=u$ となるのは $P=R,-R$ の二点だけです。これらでは $P+R=2R,O$ なので、定数 $D_R$ を必要な分だけ大きくして処理できます。$R=O$ なら $P+R=P$ だから $D_O=0$ とできます。$\square$
<!-- proof-end -->

<a id="thm-ec6-height-descent"></a>

<!-- formal-statement-start -->
> **定理（有限な2倍商と高さ降下）**  
> 非特異楕円曲線 $E/\mathbb Q$ に対して $E(\mathbb Q)/2E(\mathbb Q)$ が有限ならば、$E(\mathbb Q)$ は有限生成アーベル群である。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の剰余類代表元 $R_1,\ldots,R_s$ を固定します。$P=2Q+R_i$ と戻すとき、高さは
$$
h_x(Q)\le\frac34 h_x(P)+C
$$
と縮みます。ある閾値より高い点については毎回厳密に小さくなるので、有限回で高さが閾値以下の点に至ります。

<!-- proof-start -->
### 証明

$E(\mathbb Q)/2E(\mathbb Q)$ の有限個の代表を $R_1,\dots,R_s$ とします。任意の点 $P$ はある $i$ と $Q\in E(\mathbb Q)$ で $P=2Q+R_i$ と書けます。[固定点加法の補題](#lem-ec6-translation-height)を $-R_i$ に適用して
$$
h_x(2Q)=h_x(P-R_i)\le3h_x(P)+D_{-R_i}.
$$
一方[EC5の倍加高さ評価](../EC5/index.md#lem-ec5-height-doubling)から
$$
4h_x(Q)-C_E\le h_x(2Q).
$$
$D=\max_i D_{-R_i}$ とすれば
$$
h_x(Q)\le\frac34h_x(P)+\frac{D+C_E}{4}.
$$
$C=(D+C_E)/4$ と置き、閾値 $M>4C$ を固定します。$h_x(P)>M$ なら $h_x(Q)<h_x(P)$ です。

これを反復して $P=R_{i_0}+2Q_1$、$Q_1=R_{i_1}+2Q_2$ と進めます。もし高さが $M$ 以下にならないなら、高さが厳密に減少する点列が続きます。しかし各 $P_n$ は初項の高さ以下であり、[EC5の有界高さの有限性](../EC5/index.md#lem-ec5-bounded-height)からその範囲にある有理点は有限個です。有限集合の中で厳密減少は無限には続けられないため、ある $N$ で $h_x(Q_N)\le M$ です。

反復式を展開すると
$$
P=R_{i_0}+2R_{i_1}+\cdots+2^{N-1}R_{i_{N-1}}+2^NQ_N.
$$
高さ $M$ 以下の有理点は有限個なので、この有限集合と $R_1,\ldots,R_s$ が $E(\mathbb Q)$ 全体を生成します。$\square$
<!-- proof-end -->

この定理を[第4節の2倍商有限性の結果](#thm-ec6-special-weak-mw)と組み合わせれば、**有理2位数点を持つ非特異曲線の有理点群は有限生成**と結論できます。ここでは数体の単数定理を使っていません。

<a id="cor-ec6-rational-two-torsion-mw"></a>

<!-- formal-statement-start -->
> **系（有理2位数点を持つ曲線の有限生成性）**  
> $E/\mathbb Q$ が非特異で非零の有理2位数点を持つなら、有限個の有理点 $P_1,\dots,P_r$ と有限位数点から $E(\mathbb Q)$ の全点を生成できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[第4節の2倍商有限性の結果](#thm-ec6-special-weak-mw)により2倍商が有限であり、[高さ降下定理](#thm-ec6-height-descent)を適用すれば有限生成となります。[MOD2の有限生成Abel群の構造定理](../../MOD/MOD2/index.md#thm-mod2-fg-abelian)によって自由部分と有限torsion部分へ分解できます。$\square$
<!-- proof-end -->

## 6. 具体例のrankとtorsionを決める

$E:y^2=x^3-x$ は非特異で、$y=0$ の解 $x=-1,0,1$ が三つの非零2位数点を与えます。従って $E[2](\mathbb Q)$ は4元です。[EC5のNagell–Lutz定理](../EC5/index.md#thm-ec5-nagell-lutz)では $4A^3+27B^2=-4$ なので、有限位数点の整数座標 $(x,y)$ は $y=0$ または $y^2\mid4$ を満たします。$y=\pm1,\pm2$ なら
$$
x^3-x=1\quad\text{または}\quad x^3-x=4
$$
が必要ですが、三連続整数の積 $x(x-1)(x+1)$ は6の倍数であり、どちらも不可能です。従ってtorsion群は
$$
E(\mathbb Q)_{\mathrm{tors}}
=\{O,(-1,0),(0,0),(1,0)\}
\simeq(\mathbb Z/2\mathbb Z)^2.
$$
第4節から $\#E(\mathbb Q)/2E(\mathbb Q)\le4$ です。さらに[MOD2の有限生成Abel群の構造定理](../../MOD/MOD2/index.md#thm-mod2-fg-abelian)より、$E(\mathbb Q)\simeq\mathbb Z^r\oplus T$ と書けて
$$
\#(E(\mathbb Q)/2E(\mathbb Q))
=2^r\#(T/2T)=2^{r+2}
$$
となります。実際、$T\simeq(\mathbb Z/2)^2$ だから $T/2T$ は4元です。従って $2^{r+2}\le4$ より $r=0$、最後に
$$
E(\mathbb Q)=\{O,(-1,0),(0,0),(1,0)\}
$$
が確定しました。

**落とし穴**。降下写像の像が小さいことは商の上界を与えますが、常に等号になるとは限りません。ここで等号を使わずにrankが決まったのは、torsionの4元と商の上界4元が挟み撃ちになったからです。

## 7. 一般の弱Mordell–Weil定理で必要な数体算術

一般の楕円曲線は有理2位数点を持つとは限りません。例えば $y^2=x^3-2$ は有理根を持たないので、前節までの特別な2-isogenyをそのまま適用できません。一般の形へ拡張するには、三次式の根を含む有限次拡大体上で2倍の可否を検査します。

整数係数短 Weierstrass 曲線
$$
E:y^2=f(x),\qquad f(X)=X^3+AX+B
$$
で $f$ は重根を持たないとします。分解体 $L/\mathbb Q$ を取り、互いに異なる根を $e_1,e_2,e_3\in L$ とします。$L$ は有限次Galois拡大です。

数体とは $\mathbb Q$ の有限次拡大をいいます。[TRN1の代数的整数の定義](../../TRN/TRN1/index.md#def-trn1-algebraic-integer)に従い、$L$ に属する代数的整数全体の環を $\mathcal O_L$ と書きます。

$\mathcal O_L$ の非零素イデアル $\mathfrak p$ に関する指数 $v_{\mathfrak p}$ は、分数イデアルの素因数分解から定まります。有理素数の指数 $v_p$ を数体へ拡張する理由は、根 $e_i$ が有理整数とは限らないからです。

<a id="def-ec6-s-squareclasses"></a>

<!-- formal-statement-start -->
> **定義（有限集合の外で偶数指数を持つ平方類）**  
> 数体 $L$ と有限個の非零素イデアルの集合 $S$ に対し
>
$$
L(S,2)=
\{[u]\in L^\times/(L^\times)^2:
v_{\mathfrak p}(u)\equiv0\pmod2\ \text{for all }\mathfrak p\notin S\}
$$
>
> と定める。平方を掛けても各指数の偶奇は変わらないので、条件は代表元に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec6-s-squareclasses -->
**定義の確認**。$L=\mathbb Q$、$S=\{(2),(3)\}$ なら、$L(S,2)$ の元は $[\pm1],[\pm2],[\pm3],[\pm6]$ の8個です。$[12]=[3]$ なのは $12/3=4$ が平方だからです。
<!-- definition-example-end -->

<a id="lem-ec6-s-squareclasses-finite"></a>

<!-- formal-statement-start -->
> **補題（数体の有限S平方類）**  
> 任意の数体 $L$ と有限の $S$ に対して、$L(S,2)$ は有限集合である。この結論には、$\mathcal O_L$ のイデアル類群が有限であることと、単数群 $\mathcal O_L^\times$ が有限生成であることを算術的入力として使う。
<!-- formal-statement-end -->

### 証明の依存関係

分数イデアルの一意分解を用いると、$u$ の各素イデアル指数を2で割り、余りの部分を $S$ 内に集めることができます。
$$
(u)=\mathfrak a^2\prod_{\mathfrak p\in S}\mathfrak p^{\varepsilon_{\mathfrak p}},
\qquad \varepsilon_{\mathfrak p}\in\{0,1\}.
$$
右端の積は有限通りです。イデアル類群の有限性から、可能な $\mathfrak a$ の類も有限通りです。類と余りの積を固定した二つの $u$ の比は、ある単数と数体元の平方との積になります。単数群が有限生成なら、その平方類の個数は有限です。

**ここで使った算術的入力の位置付け**。イデアル類群の有限性はMinkowskiの幾何学的数論、単数群の有限生成はDirichletの単数定理という別個の深い定理です。本章の前提EC5まででは両定理を証明していません。この段落は両者を仮定した有限性の導出であり、両定理そのものの証明ではありません。

有理2位数点を持たない曲線では、三つの値 $x(P)-e_i$ の平方類を使います。$x(P)=e_i$ の2位数点には、零でない他の二因子を用いる特別な定義が必要です。$L$ 上に全ての2位数点があるとき、直線との三交点で $x(P)-e_i$ の積が平方になることから群準同型が得られ、その核が $2E(L)$ となります。後者を具体的に見るには、$x(P)-e_i=r_i^2$ となる三つの平方根を選び、$r_1r_2r_3=-y(P)$ と符号調整します。そして
$$
s_1=r_1+r_2+r_3,\qquad
s_2=r_1r_2+r_2r_3+r_3r_1
$$
とすれば
$$
Q=(x(P)+s_2,\ -y(P)-s_1s_2)
$$
が $2Q=P$ を満たします。曲線式と倍加公式への代入が、この半分点の検査になります。

さらに、判別式の素因数の上にない素イデアルでは $v_{\mathfrak p}(x(P)-e_i)$ は偶数です。$v_{\mathfrak p}(x(P))<0$ なら三次項が支配して指数が偶数になり、$v_{\mathfrak p}(x(P))\ge0$ で $x(P)-e_i$ が $\mathfrak p$ で割れるなら、判別式が単元であることから他の二因子は単元となり、$y(P)^2=\prod_i(x(P)-e_i)$ の指数が偶数であることを使います。従って平方類は有限集合 $S$ の外で偶数指数を持ち、上の算術補題が適用されます。

ただし $E(L)/2E(L)$ の有限性を $E(\mathbb Q)/2E(\mathbb Q)$ へ戻すときも一手必要です。$P\in E(\mathbb Q)$ が $L$ 上では $P=2Q$ と書けたなら、$\sigma\in\operatorname{Gal}(L/\mathbb Q)$ に対して
$
c_P(\sigma)=\sigma Q-Q\in E[2](L)
$
となります。これは $2c_P(\sigma)=\sigma P-P=O$ から従います。

$Q$ の選び方を $Q+T$（$T\in E[2](L)$）へ変えると、データは $c_P(\sigma)+\sigma T-T$ へ変わります。同じデータをこの変化まで同一視したものが、有限Galois群と有限群 $E[2](L)$ による1次コホモロジー類です。有限集合間の写像は有限通りなので、こうした類も有限個です。

さらに $P_1,P_2$ の差のデータが同一の類なら、半分点の差を適切な2位数点で補正するとGalois群で固定されます。固定された点は $E(\mathbb Q)$ に属するため、$P_1-P_2$ は有理点の2倍です。この対応により、$L$ 上で零になる剰余類の個数も有限と分かります。

<a id="thm-ec6-general-weak-mw"></a>

<!-- formal-statement-start -->
> **定理（一般の弱Mordell–Weil定理）**  
> 任意の非特異楕円曲線 $E/\mathbb Q$ と整数 $m\ge2$ に対して
>
$$
\#\bigl(E(\mathbb Q)/mE(\mathbb Q)\bigr)<\infty.
$$
>
> 特に $m=2$ が成立する。
<!-- formal-statement-end -->

**証明範囲の区別**。本節の $m=2$ の道筋は、分解体・平方類・有限$S$平方類・有理数体への降下を明示しました。ただし一般の数体の類群有限性と単数定理を本章で証明しておらず、半分点の2位数例外とGalois差の同定も詳細な全ケース証明を置いていません。従って、この章だけと前提EC5までから一般形の完全証明が閉じたとは主張しません。$m\ge2$ の一般形も、ここでは確立された定理として掲げるにとどめます。

<a id="thm-ec6-general-mw"></a>

<!-- formal-statement-start -->
> **定理（Mordell–Weil定理）**  
> 任意の非特異楕円曲線 $E/\mathbb Q$ に対し、非負整数 $r$ と有限アーベル群 $T$ が存在して
>
$$
E(\mathbb Q)\simeq\mathbb Z^r\oplus T
$$
>
> が成り立つ。$r$ を $E$ の（代数的）rank、$T$ を有理torsion群という。
<!-- formal-statement-end -->

一般形について、[弱Mordell–Weil定理](#thm-ec6-general-weak-mw)を算術的入力として受け入れれば、$m=2$ と[有限商からの高さ降下](#thm-ec6-height-descent)により有限生成性が得られ、[MOD2の有限生成Abel群の構造定理](../../MOD/MOD2/index.md#thm-mod2-fg-abelian)で表示が従います。これがMordell–Weil定理の最後の段階です。特別な2位数点付きの曲線については、どの算術的入力も省略せずに前節までで証明できました。

「有限生成の存在証明」と「具体的曲線のrankを必ず計算し終える方法」は違います。2-descentで得られる平方類候補の中には、局所的には可能でも有理点を持たないものがあり、群のrankの上界を出すだけでは生成元を全て得られません。

## 8. 演習：降下写像・高さ・rank

### A1. 平方類の偶奇
$[72],[{-18}],[1/50]$ を、符号と平方因子を除いた代表元で表せ。

- Level: A
- ID: EC6-A1

<!-- solution-start -->
### 詳細解答

$72=2^3 3^2=6^2\cdot2$ より $[72]=[2]$。$-18=-2\cdot3^2$ より $[-18]=[-2]$。$1/50=2/100$ より $[1/50]=[2]$ です。分母の素因数の指数も、平方を掛ければ偶奇だけで表せます。
<!-- solution-end -->

### A2. 2-isogenyの行先
$E:y^2=x^3-x$ と $E':Y^2=X^3+4X$ で $P=(1,0)$、$Q'=(2,4)$ とする。$\phi(P)$、$\widehat\phi(Q')$ を求めよ。

- Level: A
- ID: EC6-A2

<!-- solution-start -->
### 詳細解答

$a=0,b=-1,a'=0,b'=4$ を代入します。
$$
\phi(1,0)=\left(1-\frac11,\ 0(1+1)\right)=(0,0)\in E'.
$$
また
$$
\widehat\phi(2,4)=
\left(\frac{2+4/2}{4},\frac{4(1-4/4)}8\right)
=(1,0)\in E.
$$
$E'$ の $(0,0)$ は $O'$ ではないので、$\phi(P)$ を勝手に原点へ置き換えないことに注意します。
<!-- solution-end -->

### A3. 降下像の候補
$E:y^2=x(x^2+3x+10)$ について、$\alpha_E(E(\mathbb Q))$ の取り得る平方類を列挙せよ。全候補が実現するとは述べないこと。

- Level: A
- ID: EC6-A3

<!-- solution-start -->
### 詳細解答

$b=10$、$a^2-4b=9-40=-31$ で非特異です。$b$ の素因数は2と5なので[有限平方類補題](#lem-ec6-finite-squareclasses)から、候補は
$$
[1],[-1],[2],[-2],[5],[-5],[10],[-10]
$$
の8個です。これは像の上界であり、各類に対応する曲線上の有理点の存在は追加の問題です。$T=(0,0)$ は $[10]$ を実現します。
<!-- solution-end -->

### 演習A4：高さを下げる数値計算
$h_x(2Q)\ge4h_x(Q)-7$ と、ある固定点 $R$ に対する $h_x(P-R)\le3h_x(P)+5$ があるとする。$P=2Q+R$ なら $h_x(Q)$ を評価せよ。

- Level: A
- ID: EC6-A4

<!-- solution-start -->
### 詳細解答

$2Q=P-R$ だから
$$
4h_x(Q)-7\le h_x(2Q)=h_x(P-R)\le3h_x(P)+5.
$$
従って
$$
h_x(Q)\le\frac34h_x(P)+3.
$$
$h_x(P)>12$ なら右辺は $h_x(P)$ より小さいので、高さが厳密に下がります。
<!-- solution-end -->

### B1. 降下写像の準同型
$E:y^2=x(x^2+ax+b)$ 上で $x(P)\ne0$ の点 $P$ に $T=(0,0)$ を加えると $x(P+T)=b/x(P)$ となることを示し、平方類の準同型性を確認せよ。

- Level: B
- ID: EC6-B1

<!-- solution-start -->
### 詳細解答

$P=(x,y)$ と $T=(0,0)$ を結ぶ直線は $y=(y/x)X$ です。これを曲線式へ入れ、$X$ を括ると
$$
X\{X^2+(a-y^2/x^2)X+b\}=0.
$$
非零の二根は $x$ と第三交点の $x$ 座標 $z$ で、積は $xz=b$。$P+T$ は第三交点の逆元なので $x(P+T)=z=b/x$ です。この結果から
$$
\alpha_E(P+T)=[b/x]=[b][x]=\alpha_E(T)\alpha_E(P).
$$
$P=T$ なら $2T=O$、$[b]^2=[1]$、$P=O$ なら明らかに成立するので例外も閉じます。
<!-- solution-end -->

### B2. 2倍商の有限性
第3・4節の二つの核の等式と、$\widehat\phi\phi=[2]$ を使い、$\#E(\mathbb Q)/2E(\mathbb Q)$ が二つの降下像の個数の積以下であることを示せ。

- Level: B
- ID: EC6-B2

<!-- solution-start -->
### 詳細解答

第一同型定理より
$$
\#\bigl(E/\widehat\phi E'\bigr)=\#\operatorname{im}\alpha_E,\qquad
\#\bigl(E'/\phi E\bigr)=\#\operatorname{im}\alpha_{E'}.
$$
$2E=\widehat\phi\phi E\subseteq\widehat\phi E'$ なので、間の商 $\widehat\phi E'/2E$ は $E'/\phi E$ の準同型像です。従って
$$
\#(E/2E)=\#(E/\widehat\phi E')\cdot
\#(\widehat\phi E'/2E)
\le\#\operatorname{im}\alpha_E\cdot\#\operatorname{im}\alpha_{E'}.
$$
いずれも有理点群を表し、数え上げは有限平方類補題によって正当化されています。
<!-- solution-end -->

### B3. 高さ降下の停止
有限個の余り $R_i$ を用いて $P_n=2P_{n+1}+R_i$ とし、$h_x(P_{n+1})\le\frac34h_x(P_n)+C$ が成り立つとする。有界高さの有限性から、有限生成の式を導け。

- Level: B
- ID: EC6-B3

<!-- solution-start -->
### 詳細解答

$M>4C$ とすれば $h_x(P_n)>M$ の間は
$$
h_x(P_{n+1})-h_x(P_n)\le C-\frac14h_x(P_n)<0.
$$
高さは厳密減少します。一方 $h_x(P_n)\le h_x(P_0)$ の範囲には[EC5の有限性](../EC5/index.md#lem-ec5-bounded-height)により有限個の点しかありません。従ってある $N$ で $h_x(P_N)\le M$ になります。反復した等式を代入すると
$$
P_0=R_{i_0}+2R_{i_1}+\cdots+2^{N-1}R_{i_{N-1}}+2^NP_N.
$$
余りの有限集合と高さ $M$ 以下の有限集合を合わせれば生成系を得られます。
<!-- solution-end -->

### C1. 降下とrank判定の総合
$E:y^2=x^3-x$ と $E':Y^2=X^3+4X$ に対し、(i) 二つの降下写像の像の個数、(ii) $E/2E$ の上界、(iii) $E(\mathbb Q)$ のtorsionとrankを順に決めよ。有限生成性の使用根拠も述べよ。

- Level: C
- ID: EC6-C1

<!-- solution-start -->
### 詳細解答

(i) $E$ は $b=-1$ だから素因数の候補はなく、符号 $\pm1$ の2類だけです。$T=(0,0)$ により $[-1]$ が実現し、$O$ により $[1]$ が実現するので像の個数は2です。$E'$ は $b'=4$ なので2の偶奇による $[1],[2]$ に、符号を組み合わせた4候補があります。しかし $Y^2=X(X^2+4)$ で非零実点の $X$ は正です。$O'$ と $(2,4)$ によって $[1],[2]$ が実現し、像は2元です。

(ii) [2-isogenyの商評価](#thm-ec6-special-weak-mw)から
$$
\#(E(\mathbb Q)/2E(\mathbb Q))\le2\cdot2=4.
$$

(iii) $A=-1,B=0$ の Nagell–Lutz 必要条件では $y=0,\pm1,\pm2$ だけが可能です。$y=\pm1,\pm2$ なら $x^3-x$ は1または4ですが、整数 $x$ では $x(x-1)(x+1)$ が6の倍数なので矛盾します。

よってtorsionは $O,(-1,0),(0,0),(1,0)$ の4元です。二つの降下像が有限であることから2倍商も有限であり、[高さ降下定理](#thm-ec6-height-descent)から有限生成です。

[MOD2の有限生成Abel群の構造定理](../../MOD/MOD2/index.md#thm-mod2-fg-abelian)を適用して
$
E(\mathbb Q)\simeq\mathbb Z^r\oplus(\mathbb Z/2)^2
$
となります。2倍商は $2^{r+2}$ 元ですが、上界は4でした。従って $2^{r+2}\le4$ から $r=0$、torsion以外の有理点はありません。
<!-- solution-end -->

## 9. 次章への接続

ここでは有理2位数点を持つ曲線で、平方類の有限性を素数指数から証明し、高さ降下を組み合わせて有限生成性まで到達しました。一般の弱Mordell–Weil定理へは、数体の類群と単数群に関する有限性が追加で要ると分かりました。

次のEC7では有理点を無限に探す問題から離れ、有限体の上で $E(\mathbb F_q)$ の点を実際に数えます。Frobenius が固定する点と群構造を照合して、後続のHasse評価に必要な材料を作ります。