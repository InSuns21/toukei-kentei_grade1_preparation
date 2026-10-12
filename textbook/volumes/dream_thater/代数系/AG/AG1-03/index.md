# AG1-03 座標環とアフィン代数多様体の正則写像

前章の[既約性と消滅イデアルの素性](../AG1-02/index.md#thm-ag1-02-irreducible-prime)によって、図形が分解できないことをイデアルの積の性質に翻訳できました。しかし、例えば放物線 $Y=V_{\mathbb C}(y-x^2)$ 上では、$y$ と $x^2$ は異なる多項式でありながら、どの点でも同じ値を取ります。図形の上で関数として区別できない式を、どう扱えばよいでしょうか。

そこで、図形上で同じ値を取る多項式を同一視した**関数の環**を作ります。さらに図形から図形への「多項式で与えられる写像」を、その関数環の準同型へ翻訳します。幾何の写像は関数を引き戻すので、準同型の矢印は逆向きになります。この反転を計算から証明まで理解するのが本章の目標です。

特に断らない限り $k=\mathbb C$ とし、$R_n=k[x_1,\ldots,x_n]$、$X\subseteq k^n$、$Y\subseteq k^m$ は空でないアフィン代数的集合とします。一般の体について成立する主張にはその旨を付記します。零点定理、局所化、層の理論は使用しません。

## 1. 多項式ではなく「図形上の多項式関数」を集める

多項式 $f\in R_n$ を $X$ の点で評価すれば関数 $f|_X:X\to k$ が得られます。例えば放物線では $y|_Y=(x^2)|_Y$ です。両者の差 $y-x^2$ は $Y$ の全点で零になります。このように図形上の零関数に対応する式をまとめるのが、[消滅イデアル](../AG1-01/index.md#def-ag1-01-vanishing-ideal)でした。

<a id="def-ag1-03-coordinate-ring"></a>

<!-- formal-statement-start -->
> **定義（座標環）**  
> 体 $k$、整数 $n\ge1$、アフィン代数的集合 $X\subseteq k^n$ に対し、消滅イデアル $I_k(X)$ を用いて
>
$$
A_k(X)=k[x_1,\ldots,x_n]/I_k(X)
$$
>
> を $X$ の**座標環**という。$f$ の剰余類を $\overline f$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-03-coordinate-ring -->
**定義の確認**：放物線上で同じ関数となる式。 $Y=V_{\mathbb C}(y-x^2)$ とすると、任意の点 $(t,t^2)\in Y$ で $y-x^2=0$ です。従って $y-x^2\in I(Y)$ であり、座標環では $\overline y=\overline{x^2}$ が成り立ちます。逆に $\overline y=\overline{x^2}$ と書けるのは、差が消滅イデアルに属するからです。加法・乗法は[商環の定義と演算](../../RNG/RNG1/index.md#def-rng1-quotient-ring)に従い、$\overline f+\overline g=\overline{f+g}$、$\overline f\,\overline g=\overline{fg}$ とします。
<!-- definition-example-end -->

この商が**実際の関数の環**と一致することを確かめます。$k^X$ を $X\to k$ の関数全体とし、点ごとの演算で環にします。$k$ を定数関数として含むことも確認できます。

<a id="prop-ag1-03-evaluation"></a>

<!-- formal-statement-start -->
> **命題（座標環と多項式関数）**  
> 任意の体 $k$ とアフィン代数的集合 $X\subseteq k^n$ に対して、多項式の制限からなる関数環を $P_k(X)$ とする。このとき評価によって $k$-代数同型
>
$$
A_k(X)\longrightarrow P_k(X),\qquad
\overline f\longmapsto (a\mapsto f(a))
$$
>
> が定まる。
<!-- formal-statement-end -->

### 証明の見取り図

商での等号と関数としての等号が同じ条件であることが要点です。評価の核を求め、[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)を使います。

<!-- proof-start -->
### 証明

評価写像を $\operatorname{ev}_X:R_n\to k^X$、$\operatorname{ev}_X(f)(a)=f(a)$ と置きます。任意の $f,g\in R_n$ と $a\in X$ について
$$
(f+g)(a)=f(a)+g(a),\qquad
(fg)(a)=f(a)g(a),\qquad 1(a)=1
$$
なので、評価は $k$-代数準同型です。その核は
$$
\begin{aligned}
\ker(\operatorname{ev}_X)
&=\{f\in R_n:f(a)=0\text{ for every }a\in X\}\\
&=I_k(X)
\end{aligned}
$$
です。像は定義により $P_k(X)$ です。そこで[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)へ、入力環 $R_n$、出力環 $k^X$、核 $I_k(X)$ を代入すれば
$$
R_n/I_k(X)\simeq\operatorname{im}(\operatorname{ev}_X)=P_k(X)
$$
が従います。特に $\overline f=\overline g$ と $f(a)=g(a)$ が全 $a\in X$ で成立することは同値です。
<!-- proof-end -->

ここでは $k$ が無限体である必要はありません。有限体でも「同じ関数なら同じ剰余類」となるのは、最初から $I_k(X)$ で割っているからです。反面、任意の与えられたイデアル $J$ を使った $R_n/J$ が $X=V_k(J)$ の関数環と一致するとはまだ言えません。

## 2. 既約な図形では座標環に零因子がない

一本の曲線と、二本の直線の和集合とでは何が代数的に異なるのでしょう。既約集合に限ると、座標環の積の情報が図形の分解不能性を記録します。

<a id="def-ag1-03-affine-variety"></a>

<!-- formal-statement-start -->
> **定義（アフィン代数多様体）**  
> 本講では体 $k$ 上の空でない既約アフィン代数的集合 $X\subseteq k^n$ を**アフィン代数多様体**という。既約とは $X$ が二つの真の閉部分集合の和にならないことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-03-affine-variety -->
**定義の確認**：直線と二軸。 $X=V_{\mathbb C}(x)\subset\mathbb C^2$ は無限体上のアフィン直線と同じ閉集合構造を持ち、[既約集合の定義・確認](../AG1-02/index.md#def-ag1-02-irreducible)により空でない既約集合ですからアフィン代数多様体です。一方 $V_{\mathbb C}(xy)=V(x)\cup V(y)$ は、$(0,1)$ と $(1,0)$ が各直線の外側にあるため二つとも真の閉部分集合であり、アフィン代数多様体ではありません。
<!-- definition-example-end -->

<a id="prop-ag1-03-domain"></a>

<!-- formal-statement-start -->
> **命題（既約性と座標環の整域性）**  
> 体 $k$、アフィン代数的集合 $X\subseteq k^n$ に対し、$X$ が空でない既約集合であることと、$A_k(X)$ が整域であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

イデアルを商で零にしたとき、「積が零ならどちらかが零」の条件は素イデアルの条件そのものです。消滅イデアルについて前章で証明した幾何との同値性を利用します。

<!-- proof-start -->
### 証明

[既約集合と消滅イデアルの素性](../AG1-02/index.md#thm-ag1-02-irreducible-prime)によって、$X$ が空でない既約集合であることと $I_k(X)$ が素イデアルであることは同値です。一方、[素イデアルと商整域の定理](../../RNG/RNG2/index.md#thm-rng2-prime-quotient-domain)を環 $R_n$ とイデアル $I_k(X)$ に適用すると
$$
I_k(X)\text{ が素イデアル}
\iff R_n/I_k(X)\text{ が整域}
$$
です。右辺は $A_k(X)$ が整域であることそのものなので、両同値をつなげれば結論を得ます。
<!-- proof-end -->

例えば $X=V_{\mathbb C}(xy)$ では $\overline x\,\overline y=0$ ですが、$\overline x\ne0$ は $(1,0)\in X$ で $x=1$ となるため、$\overline y\ne0$ は $(0,1)\in X$ で $y=1$ となるため確かめられます。零因子は「二つの部分に分かれる」ことを代数的に知らせます。

## 3. 正則写像は座標ごとに多項式で与える

今までは一つの図形の上の関数を調べました。次は $X$ の点を $Y$ の点へ移したいのですが、単に連続であるだけでは多項式の構造が保たれません。出力の各座標が $X$ 上の多項式関数である写像を考えます。

<a id="def-ag1-03-regular-map"></a>

<!-- formal-statement-start -->
> **定義（アフィン代数的集合の正則写像）**  
> 体 $k$、アフィン代数的集合 $X\subseteq k^n$、$Y\subseteq k^m$ について、写像 $F:X\to Y$ が**正則**であるとは、多項式 $F_1,\ldots,F_m\in k[x_1,\ldots,x_n]$ が存在して、任意の $a\in X$ に対し
>
$$
F(a)=(F_1(a),\ldots,F_m(a))
$$
>
> となることをいう。この章ではアフィン代数的集合に対するこの意味で正則写像を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-03-regular-map -->
**定義の確認**：放物線へのパラメータ表示。 $X=\mathbb C$、$Y=V_{\mathbb C}(y-x^2)$ として $F(t)=(t,t^2)$ と置きます。成分 $t,t^2$ は多項式であり、$t^2-t^2=0$ なので像は確かに $Y$ に入ります。従って $F$ は正則です。逆向きの $G:Y\to\mathbb C$、$G(a,b)=a$ も一つの座標多項式 $x$ の制限なので正則です。
<!-- definition-example-end -->

<a id="prop-ag1-03-continuity"></a>

<!-- formal-statement-start -->
> **命題（正則写像のZariski連続性）**  
> 任意の体 $k$ 上のアフィン代数的集合 $X\subseteq k^n$、$Y\subseteq k^m$ の間の正則写像 $F:X\to Y$ は、各集合の相対Zariski位相について連続である。
<!-- formal-statement-end -->

### 証明の見取り図

位相の定義に戻り、$Y$ 内の閉集合を任意の多項式族の零点集合として書きます。逆像では多項式に成分 $F_i$ を代入するだけです。

<!-- proof-start -->
### 証明

$Y$ で閉じた集合は部分空間の閉集合の定義から $C=Y\cap V_k(S)$ と書けます。ただし $S\subseteq k[y_1,\ldots,y_m]$ は任意の多項式の集合です。$F(X)\subseteq Y$ だから
$$
\begin{aligned}
F^{-1}(C)
&=\{a\in X: H(F_1(a),\ldots,F_m(a))=0\;(\forall H\in S)\}\\
&=X\cap V_k(\{H(F_1,\ldots,F_m):H\in S\}).
\end{aligned}
$$
$H(F_1,\ldots,F_m)$ は $n$ 変数多項式なので、[Zariski位相の定義](../AG1-01/index.md#def-ag1-01-zariski-topology)によって右辺は $X$ の閉集合です。任意の閉集合の逆像が閉じているため、$F$ は連続です。
<!-- proof-end -->

連続性の逆は一般に成り立ちません。$\mathbb C$ 上のZariski位相は余有限位相なので、例えば複素共役 $z\mapsto\overline z$ は全単射であり、有限集合の逆像が有限だから連続です。しかし複素共役は多項式写像ではありません。もし多項式 $p$ と全 $z\in\mathbb C$ で $p(z)=\overline z$ が成立すれば、実数 $t$ では $p(t)=t$ なので $p(z)-z$ は無限個の根を持ち $p(z)=z$ となります。$z=i$ では $i\ne-i$ となり矛盾します。連続性だけでは正則性の代わりにならないのです。

## 4. 写像を環準同型へ引き戻す

$F:X\to Y$ が正則なら、$Y$ 上の多項式関数 $h$ を $F$ と合成して $X$ 上の関数 $h\circ F$ を作れます。これは $Y$ から $X$ へ関数を**引き戻す**操作です。幾何の矢印 $X\to Y$ に対し関数環の矢印が $A(Y)\to A(X)$ になる理由はここにあります。

<a id="thm-ag1-03-morphism-hom"></a>

<!-- formal-statement-start -->
> **定理（正則写像と座標環準同型の反変対応）**  
> 体 $k$、空でないアフィン代数的集合 $X\subseteq k^n$、$Y\subseteq k^m$ に対し、正則写像 $F:X\to Y$ と、$1$ および定数 $k$ を固定する $k$-代数準同型 $\varphi:A_k(Y)\to A_k(X)$ は一対一に対応する。対応は
>
$$
F^*(\overline H)=\overline{H(F_1,\ldots,F_m)}
$$
>
> で与えられる。$X\xrightarrow{F}Y\xrightarrow{G}Z$ が正則なら $(G\circ F)^*=F^*\circ G^*$ であり、恒等写像の引き戻しは恒等準同型となる。
<!-- formal-statement-end -->

### 証明の見取り図

第一方向は合成で関数を引き戻します。逆方向では、準同型が $Y$ の座標関数 $\overline{y_j}$ をどこへ送るかを読むことで、$X$ から $Y$ への写像を組み立てます。最大の注意点は、組み立てた点が**本当に $Y$ の方程式を満たすか**です。

<!-- proof-start -->
### 証明

**(1) 正則写像から準同型へ。** $F=(F_1,\ldots,F_m)$ とし、$\overline H\in A_k(Y)$ を取ります。$H$ を多項式として $F$ の各成分へ代入すると $H(F_1,\ldots,F_m)\in k[x_1,\ldots,x_n]$ になります。もし $\overline H=\overline K$ なら $H-K\in I_k(Y)$ です。任意の $a\in X$ で $F(a)\in Y$ なので
$$
(H-K)(F(a))=0.
$$
従って $H(F_1,\ldots,F_m)-K(F_1,\ldots,F_m)\in I_k(X)$ となり、剰余類は代表元の選択によらず定まります。代入は和・積・定数を保つので $F^*$ は $k$-代数準同型です。

**(2) 準同型から正則写像へ。** $\varphi:A_k(Y)\to A_k(X)$ を取ります。$Y$ の座標関数の剰余類を $\overline{y_j}$ とし、各 $j=1,\ldots,m$ について
$$
a_j=\varphi(\overline{y_j})\in A_k(X)
$$
と置きます。各 $a_j$ に多項式代表元 $F_j\in k[x_1,\ldots,x_n]$ を選び、$F(a)=(F_1(a),\ldots,F_m(a))$ とします。ここで $H\in I_k(Y)$ を任意に取ると、$A_k(Y)$ では $\overline H=0$ です。また $\overline H=H(\overline{y_1},\ldots,\overline{y_m})$ だから、準同型性より
$$
\begin{aligned}
0=\varphi(\overline H)
&=\varphi(H(\overline{y_1},\ldots,\overline{y_m}))\\
&=H(\varphi(\overline{y_1}),\ldots,\varphi(\overline{y_m}))\\
&=\overline{H(F_1,\ldots,F_m)}\in A_k(X).
\end{aligned}
$$
[座標環と多項式関数の命題](#prop-ag1-03-evaluation)から、これは全 $a\in X$ に対して $H(F(a))=0$ を意味します。$H\in I_k(Y)$ は任意です。従って $F(a)\in V_k(I_k(Y))$ です。ここで $Y$ は代数的集合なので、ある多項式族 $S$ を使って $Y=V_k(S)$ と書けます。定義から $S\subseteq I_k(Y)$ だから $V_k(I_k(Y))\subseteq V_k(S)=Y$ であり、逆包含 $Y\subseteq V_k(I_k(Y))$ も[消滅イデアルの定義](../AG1-01/index.md#def-ag1-01-vanishing-ideal)から従います。よって $Y=V_k(I_k(Y))$ であり、$F(a)\in Y$ が得られます。従って $F:X\to Y$ は正則写像です。

**(3) 一対一性。** 以上で構成した $F$ は
$$
F^*(\overline{y_j})=\overline{F_j}
=\varphi(\overline{y_j})
$$
を各 $j$ について満たします。$A_k(Y)$ の任意の元は $\overline{y_1},\ldots,\overline{y_m}$ と定数の多項式なので、二つの $k$-代数準同型は全元で一致します。逆に正則写像が同じ準同型を与えるなら、各座標関数の引き戻しが同じなので、全 $a\in X$ で $F_j(a)$ が一致し、写像そのものが一致します。代表多項式の取り替えでも関数値が変わらないため、この対応は一対一です。

**(4) 合成。** $H\in A_k(Z)$ の代表多項式を $h$ とすると、各 $a\in X$ について
$$
\begin{aligned}
((G\circ F)^*H)(a)
&=h(G(F(a)))\\
&=(G^*H)(F(a))\\
&=(F^*(G^*H))(a).
\end{aligned}
$$
[多項式関数としての同一視](#prop-ag1-03-evaluation)により座標環でも等しく、$(G\circ F)^*=F^*\circ G^*$ です。恒等写像の場合は $h\circ\mathrm{id}=h$ なので恒等準同型になります。
<!-- proof-end -->

「反変」とは、写像の向きが逆になるという意味です。元の図形の向きを変えているわけではありません。

<a id="cor-ag1-03-isomorphism"></a>

<!-- formal-statement-start -->
> **系（アフィン代数的集合の同型判定）**  
> 体 $k$ 上の空でないアフィン代数的集合 $X,Y$ について、双方に正則な逆写像を持つ正則写像 $X\to Y$ が存在することと、$k$-代数同型 $A_k(Y)\simeq A_k(X)$ が存在することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

逆写像があれば引き戻しも逆同型です。逆に環の同型の逆準同型からも正則写像を作り、合成則で両側の恒等写像を確認します。

<!-- proof-start -->
### 証明

$F:X\to Y$、$G:Y\to X$ が互いに逆なら、[反変対応の合成則](#thm-ag1-03-morphism-hom)より
$$
G^*\circ F^*=(F\circ G)^*=\mathrm{id}_{A_k(Y)},\qquad
F^*\circ G^*=(G\circ F)^*=\mathrm{id}_{A_k(X)}.
$$
よって $F^*$ は逆 $G^*$ を持つ同型です。

逆に $\varphi:A_k(Y)\to A_k(X)$ が同型なら、その逆 $\varphi^{-1}:A_k(X)\to A_k(Y)$ も $k$-代数準同型です。[反変対応の定理](#thm-ag1-03-morphism-hom)から対応する正則写像 $F:X\to Y$、$G:Y\to X$ を取り、合成則を適用すれば $(G\circ F)^*=\mathrm{id}_{A_k(X)}$、$(F\circ G)^*=\mathrm{id}_{A_k(Y)}$ となります。一対一性によって $G\circ F=\mathrm{id}_X$、$F\circ G=\mathrm{id}_Y$ です。
<!-- proof-end -->

## 5. 放物線の同型と閉じていない像

$Y=V_{\mathbb C}(y-x^2)$ を考えます。任意の $f(x,y)\in\mathbb C[x,y]$ は、$y-x^2$ を $y$ の一次式として扱えば、$y$ に関する割り算によって
$$
f(x,y)=q(x,y)(y-x^2)+r(x)
$$
と書けます。$Y$ のすべての点 $(t,t^2)$ で零なら $r(t)=0$ が全 $t\in\mathbb C$ で成り立ち、非零の一変数多項式は根が有限個なので $r=0$ です。反対に $(y-x^2)$ の元は必ず $Y$ で零になります。従って
$$
I_{\mathbb C}(Y)=(y-x^2),\qquad
A_{\mathbb C}(Y)\simeq\mathbb C[t].
$$
対応は $\overline x\mapsto t$、$\overline y\mapsto t^2$ です。第3節の $F(t)=(t,t^2)$ と $G(a,b)=a$ は $G(F(t))=t$ および $F(G(a,b))=(a,a^2)=(a,b)$ を満たすので正則な逆同士です。図形として曲がっていても、代数的には直線と同型になれます。

一方、$H=V_{\mathbb C}(uv-1)\subset\mathbb C^2$ の第一座標への射影 $\pi:H\to\mathbb C$、$\pi(a,b)=a$ は正則ですが、像は
$$
\pi(H)=\mathbb C\setminus\{0\}
$$
です。$ab=1$ なら $a\ne0$、逆に $a\ne0$ なら $(a,a^{-1})\in H$ だからです。[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)によると、$\mathbb C$ の閉集合は有限集合か全体なので、この無限真部分集合は閉じていません。正則写像は閉集合の**逆像**を閉集合へ送るのであって、**像**が閉じるわけではありません。この違いは、次章で点の近傍の関数を扱う動機になります。

## 6. 演習：式・関数・写像を往復する

特に断らない限り体は $\mathbb C$ とし、アフィン代数的集合には相対Zariski位相を入れます。各問の解答では準同型の向きと、選んだ代表元が図形上で同じ関数になる理由を明示してください。

**Level A：定義の直接確認**

### A1. 有限個の点の座標環

$X=\{0,1\}\subset\mathbb C$ について $I(X)$ を求め、$A(X)$ の任意の元が $a+bt$（$a,b\in\mathbb C$）で代表できることを示せ。

- Level: A
- ID: AG1-03-A1

<!-- solution-start -->
**詳細解答**　$f(0)=f(1)=0$ なら、因数定理より $f=tg$ であり、$f(1)=g(1)=0$ なのでさらに $g=(t-1)h$ です。逆向きは積を $0,1$ に代入すれば従います。よって $I(X)=(t(t-1))$ です。$t^2-t$ はこのイデアルの元だから、座標環で $\overline{t^2}=\overline t$ です。次数を下げる操作を繰り返すか、多項式をモニックな二次式 $t^2-t$ で割ると
$$
f(t)=q(t)(t^2-t)+a+bt
$$
となります。従って任意の剰余類は $\overline{a+bt}$ と表せます。さらに $a+bt$ が両点で零なら $a=0$、$a+b=0$ より $b=0$ であり、この表示は一意です。
<!-- solution-end -->

### A2. 二軸の零因子

$X=V(xy)\subset\mathbb C^2$ で、$\overline x$ と $\overline y$ が非零なのに積が零になることを確かめよ。

- Level: A
- ID: AG1-03-A2

<!-- solution-start -->
**詳細解答**　任意の $(a,b)\in X$ は $ab=0$ を満たすため $xy$ は $X$ 上で零、従って $\overline x\,\overline y=\overline{xy}=0$ です。しかし $(1,0)\in X$ において $x(1,0)=1\ne0$ だから $x\notin I(X)$、従って $\overline x\ne0$ です。同じく $(0,1)\in X$ において $y(0,1)=1\ne0$ だから $\overline y\ne0$ です。これは $A(X)$ が整域でないことを直接示し、[既約性と整域性](#prop-ag1-03-domain)から $X$ は既約でないと分かります。
<!-- solution-end -->

### A3. 放物線上での式の同一視

$Y=V(y-x^2)$ 上で $\overline{y^2+2xy}=\overline{x^4+2x^3}$ を示せ。

- Level: A
- ID: AG1-03-A3

<!-- solution-start -->
**詳細解答**　任意の $(t,t^2)\in Y$ について
$$
(y^2+2xy)(t,t^2)=t^4+2t^3
=(x^4+2x^3)(t,t^2)
$$
です。従って差は $Y$ のすべての点で零となり、[消滅イデアルの定義](../AG1-01/index.md#def-ag1-01-vanishing-ideal)から $y^2+2xy-x^4-2x^3\in I(Y)$ です。座標環で両剰余類が等しくなります。実際、差は $(y-x^2)(y+x^2+2x)$ と因数分解できます。
<!-- solution-end -->

### A4. 写像の引き戻し

$F:\mathbb C\to\mathbb C^2$、$F(t)=(t,t^2+1)$ による引き戻しを計算し、$F^*(x^2+y)$ を求めよ。

- Level: A
- ID: AG1-03-A4

<!-- solution-start -->
**詳細解答**　$\mathbb C^2$ の座標環を $\mathbb C[x,y]$、$\mathbb C$ の座標環を $\mathbb C[t]$ と見ます。$F$ の成分が $t,t^2+1$ なので
$$
F^*(x)=t,\qquad F^*(y)=t^2+1.
$$
準同型が積と和を保つことから
$$
F^*(x^2+y)=(F^*x)^2+F^*y
=t^2+(t^2+1)=2t^2+1.
$$
矢印は $F:\mathbb C\to\mathbb C^2$ と逆に、$F^*:\mathbb C[x,y]\to\mathbb C[t]$ です。
<!-- solution-end -->

**Level B：同型と非同型を区別する**

### B1. 放物線の座標環を計算する

$Y=V(y-x^2)\subset\mathbb C^2$ について $I(Y)=(y-x^2)$ を多項式除法から証明し、$A(Y)\simeq\mathbb C[t]$ を構成せよ。

- Level: B
- ID: AG1-03-B1

<!-- solution-start -->
**詳細解答**　$\mathbb C[x]$ を係数環とし、$y-x^2$ は $y$ に関する最高次係数が $1$ の一次式なので、任意の $f\in\mathbb C[x,y]$ は
$$
f(x,y)=(y-x^2)q(x,y)+r(x)
$$
と一意に書けます。$f\in I(Y)$ なら全 $t\in\mathbb C$ で $0=f(t,t^2)=r(t)$ です。無限体上の非零一変数多項式が無限個の根を持てないため $r=0$ です。よって $I(Y)\subseteq(y-x^2)$ です。逆に $(y-x^2)$ の元は $Y$ 上で零なので逆包含も得ます。

写像 $\psi:\mathbb C[x,y]\to\mathbb C[t]$ を $\psi(f)=f(t,t^2)$ とすると、上の計算で $\ker\psi=(y-x^2)$ です。任意の $p(t)\in\mathbb C[t]$ は $f(x,y)=p(x)$ の像だから $\psi$ は全射です。[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)より
$$
A(Y)=\mathbb C[x,y]/(y-x^2)\simeq\mathbb C[t].
$$
<!-- solution-end -->

### B2. 正則写像の連続性と逆の失敗

$\mathbb C$ のZariski位相について、$c(z)=\overline z$ は連続だが正則でないことを証明せよ。

- Level: B
- ID: AG1-03-B2

<!-- solution-start -->
**詳細解答**　[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)より、$\mathbb C$ の閉集合は有限集合または全体です。$c$ は単射なので有限集合の逆像は有限集合、全体の逆像は全体です。従って任意の閉集合の逆像は閉集合であり、$c$ は連続です。

正則であると仮定すれば、ある $p\in\mathbb C[z]$ が全 $z$ で $p(z)=\overline z$ を満たすはずです。全実数 $t$ では $p(t)-t=0$ なので、無限個の根を持つ多項式 $p(z)-z$ は零多項式であり $p(z)=z$ です。しかし $z=i$ を代入すると $i=p(i)=\overline i=-i$ となり矛盾します。失敗するのは多項式表示という仮定であり、連続性自体には問題がありません。
<!-- solution-end -->

### B3. 合成すると順序が逆になる

$F:\mathbb C\to\mathbb C^2$、$F(t)=(t,t^2)$ と $G:\mathbb C^2\to\mathbb C$、$G(x,y)=x+y$ とする。$(G\circ F)^*$ と $F^*\circ G^*$ が $\mathbb C[s]$ の生成元 $s$ で一致することを計算せよ。

- Level: B
- ID: AG1-03-B3

<!-- solution-start -->
**詳細解答**　$G\circ F(t)=t+t^2$ なので、$\mathbb C[s]\to\mathbb C[t]$ の引き戻しは $(G\circ F)^*(s)=t+t^2$ です。一方、$G^*:\mathbb C[s]\to\mathbb C[x,y]$ は $s\mapsto x+y$、$F^*:\mathbb C[x,y]\to\mathbb C[t]$ は $x\mapsto t$、$y\mapsto t^2$ です。従って
$$
(F^*\circ G^*)(s)=F^*(x+y)=t+t^2
=(G\circ F)^*(s).
$$
両者は $\mathbb C$ の定数を保つ準同型であり、任意の $h(s)=\sum_{j=0}^d a_js^j$ について値は $\sum_j a_j(t+t^2)^j$ になるので、生成元上の一致から全環で一致します。
<!-- solution-end -->

**Level C：二つの図形と環の往復**

### C1. 放物線の同型と双曲線の射影

$P=V_{\mathbb C}(y-x^2)$、$H=V_{\mathbb C}(uv-1)$ とする。

1. $F:\mathbb C\to P$、$F(t)=(t,t^2)$ と $G:P\to\mathbb C$、$G(a,b)=a$ が互いに逆の正則写像であることを示せ。
2. この同型に対応する座標環準同型と、その逆を生成元に対して書け。
3. 射影 $\pi:H\to\mathbb C$、$\pi(a,b)=a$ の像を求め、閉集合とは限らないことを証明せよ。
4. $\pi$ が全射でないにもかかわらず、$\pi^*:\mathbb C[t]\to A(H)$ が単射となることを示せ。

- Level: C
- ID: AG1-03-C1

<!-- solution-start -->
**詳細解答**

**(1)** $F$ の両座標は多項式で、$(t^2)-(t)^2=0$ より $F(t)\in P$ です。$G$ も第一座標の制限だから正則です。直接計算で $G(F(t))=t$ です。また $(a,b)\in P$ なら $b=a^2$ なので
$$
F(G(a,b))=F(a)=(a,a^2)=(a,b).
$$
従って正則な逆写像同士です。

**(2)** [座標環の同型判定](#cor-ag1-03-isomorphism)で対応する引き戻しは
$$
F^*:A(P)\to\mathbb C[t],\quad
\overline x\mapsto t,\quad\overline y\mapsto t^2,
$$
および
$$
G^*:\mathbb C[t]\to A(P),\quad t\mapsto\overline x
$$
です。$G^*F^*(\overline x)=\overline x$、$G^*F^*(\overline y)=\overline{x^2}=\overline y$ が成り立ち、逆向きも $F^*G^*(t)=t$ です。生成元と定数を保つ準同型なので全元に対して互いに逆です。

**(3)** $(a,b)\in H$ なら $ab=1$ のため $a\ne0$ です。逆に $a\ne0$ なら $(a,1/a)\in H$ なので
$$
\pi(H)=\mathbb C\setminus\{0\}.
$$
これは無限集合で $\mathbb C$ 全体ではありません。[アフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)により閉集合ではありません。

**(4)** $\pi^*(p(t))$ は $p(u)$ の $H$ 上での制限です。これが零なら、(3) の像に含まれる全 $a\ne0$ に対して $p(a)=0$ となります。$\mathbb C\setminus\{0\}$ は無限集合だから多項式 $p$ は零多項式です。従って $\ker\pi^*=\{0\}$ で単射です。単射性は全射性と同値ではありません。この例では像が稠密であることが多項式関数の引き戻しの単射性を支えます。
<!-- solution-end -->

## 7. 次章へ：一点の近くでだけ使える関数

本章の正則写像は座標ごとの多項式で書け、座標環の準同型が正確にその情報を記録しました。一方、$H=V(uv-1)$ 上では $u^{-1}$ は $v$ と等しい関数ですが、アフィン直線 $\mathbb C$ 全体で $1/t$ は多項式関数ではありません。$t\ne0$ の部分だけではどうでしょうか。この「分母が零でない点の近くに限って関数を考える」という問いが、AG1-04の局所化・局所環へつながります。
