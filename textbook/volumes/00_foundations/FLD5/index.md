# FLD5 抽象代数 XV：Galois 理論の応用――作図可能性・根号による可解性

<!-- definition-example-audit: strict -->

[FLD4](../FLD4/index.md) では、有限 Galois 拡大の中間体を Galois 群の部分群へ翻訳し、正規中間拡大を正規部分群へ翻訳しました。[GRP4](../GRP4/index.md) では Cauchy の定理と Sylow 理論まで有限群の道具を整えています。

本章では、その翻訳が古典的な二つの問題へどう効くかを見ます。

- 定規とコンパスで、どの長さ・角度を作れるのか。
- 多項式の根を、四則演算と有限回の根号だけで書けるのか。

見た目は幾何と方程式の問題ですが、どちらも「許された操作を体拡大の列へ直し、その拡大を有限群で読む」という同じ構造を持ちます。

主線は

$$
\text{作図}
\longleftrightarrow
\text{二次拡大列}
\longrightarrow
\text{次数の }2\text{ 冪制約}
$$

と

$$
\text{根号拡大}
\longleftrightarrow
\text{可解な Galois 群}
\longrightarrow
S_5\text{ の非可解性}
\longrightarrow
\text{根号で解けない五次方程式}
$$

です。

> **この章の停止線**
>
> 標数 $0$ の有限 Galois 理論の範囲で、作図可能性と根号による可解性を閉じます。正多角形については円分体との接続と正五角形・正七角形までを扱い、Gauss--Wantzel の完全分類は数論系列へ送ります。無限 Galois 理論、Krull 位相、一般 Kummer 理論、類体論、代数的整数論、有限単純群の分類は使いません。

---

## 1. 定規とコンパスを「座標の体」へ翻訳する

定規とコンパスの作図では、出発点として

$$
O=(0,0),
\qquad
I=(1,0)
$$

を与えます。

有限回の操作として許すのは、すでに得た点を使って

1. 2点を通る直線を引く、
2. 中心と円周上の点が既知の円を描く、
3. それらの直線・円の交点を新しい点として取る

ことです。

<a id="def-fld5-constructible-number"></a>
<!-- formal-statement-start -->
> **定義（作図可能点・作図可能数）**
>
> $O=(0,0)$ と $I=(1,0)$ から出発し、定規とコンパスの有限回の操作で得られる点を **作図可能点**という。
>
> 実数 $\alpha$ について、点
>
> $$
> (\alpha,0)
> $$
>
> が作図可能であるとき、$\alpha$ を **作図可能数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld5-constructible-number -->
**定義の確認**

### 1.1 $\sqrt2$ は作図可能

単位正方形を作れば、その対角線の長さは Pythagoras の定理から

$$
\sqrt{1^2+1^2}
=
\sqrt2
$$

です。

その長さを実軸上へ移せば

$$
(\sqrt2,0)
$$

が得られます。従って $\sqrt2$ は作図可能です。

同様に、作図可能な正の長さ $a$ から $\sqrt a$ を作る標準作図もあります。直径 $1+a$ の半円上で、直径を $1$ と $a$ に分ける点から垂線を立てると、その高さ $h$ は相似または方べきから

$$
h^2=a
$$

を満たすため

$$
h=\sqrt a
$$

です。
<!-- definition-example-end -->

幾何の操作を代数へ移す鍵は、**その時点で既知の座標が作る体**です。

すでに得た点の全座標を含む $\mathbb R$ の部分体を $K$ とします。

### 1.2 直線と円の係数は $K$ に入る

$K$ 座標を持つ2点を通る直線は、行列式表示を使えば

$$
ax+by+c=0,
\qquad
a,b,c\in K
$$

と書けます。

中心 $(u,v)$ と円周上の点 $(r,s)$ が $K^2$ にある円は

$$
(x-u)^2+(y-v)^2
=
(r-u)^2+(s-v)^2
$$

なので、展開後の係数も全て $K$ にあります。

従って、新しい交点を求めるときに起こることは次の三種類だけです。

- 直線と直線：一次方程式を解く。
- 直線と円：一方を代入して二次方程式を解く。
- 円と円：二つの円の式を引いて一次式を作り、直線と円へ帰着する。

つまり一回の交点操作で、新しい座標は高々二次方程式を解くだけで得られます。

---

## 2. 作図可能性は実二次拡大列と同じである

<a id="def-fld5-quadratic-tower"></a>
<!-- formal-statement-start -->
> **定義（実二次拡大列）**
>
> $\mathbb R$ の部分体の有限列
>
> $
> \mathbb Q=K_0
> \subset K_1
> \subset\cdots\subset K_r
> \subset\mathbb R
> $
>
> が各 $i$ で
>
> $
> [K_i:K_{i-1}]\le2
> $
>
> を満たすとき、この列を **実二次拡大列**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld5-quadratic-tower -->
**定義の確認**

例えば

$
\mathbb Q
\subset
\mathbb Q(\sqrt2)
\subset
\mathbb Q(\sqrt2,\sqrt{1+\sqrt2})
$

では

$
[\mathbb Q(\sqrt2):\mathbb Q]=2
$

であり、さらに $\sqrt{1+\sqrt2}$ は直前の体上で

$
x^2-(1+\sqrt2)
$

の根なので二段目の次数は高々2です。従ってこれは実二次拡大列です。

次数 $1$ の段階は何も増やしていないので、省けば全て次数 $2$ の列にできます。
<!-- definition-example-end -->

<a id="thm-fld5-constructible-quadratic-tower"></a>
<!-- formal-statement-start -->
> **定理（作図可能性と実二次拡大列）**
>
> 実数 $\alpha$ について、次は同値である。
>
> 1. $\alpha$ は作図可能数である。
> 2. ある実二次拡大列
>
> $$
> \mathbb Q=K_0
> \subset K_1
> \subset\cdots\subset K_r
> \subset\mathbb R
> $$
>
> が存在して
>
> $$
> \alpha\in K_r
> $$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

作図から体へ向かう向きでは、前節の交点計算をそのまま使います。

一回の新しい作図点の座標は、現在の座標体 $K$ 上の二次方程式

$$
at^2+bt+c=0
$$

の根として得られます。従って必要なら

$$
K
\subset
K(\sqrt{b^2-4ac})
$$

という高々二次の拡大を一段追加すれば十分です。

逆向きでは、実二次拡大

$$
E/K,
\qquad
[E:K]=2
$$

が

$$
E=K(\sqrt d),
\qquad
d\in K,\quad d>0
$$

と書けることを使います。四則演算と正の平方根は定規とコンパスで実現できるので、塔を一段ずつ作図できます。

<!-- proof-start -->
### 証明

#### $(1)\Rightarrow(2)$

$\alpha$ を得る一つの有限作図を固定します。

出発時の座標は $0,1$ だけなので、座標体を

$$
K_0=\mathbb Q
$$

とできます。

ある段階で、すでに得た全ての点の座標が実部分体 $K$ に入っているとします。

新しい点が直線どうしの交点なら、連立一次方程式を解くだけなので、その座標は $K$ に残ります。

直線と円の交点なら、一つの座標を消去した後、

$$
at^2+bt+c=0,
\qquad
a,b,c\in K
$$

という二次方程式になります。

$a\ne0$ とすると根は

$$
t=
\frac{-b\pm\sqrt{b^2-4ac}}{2a}.
$$

実際に交点があるので判別式

$$
d=b^2-4ac
$$

は実数として $d\ge0$ です。

$d$ が $K$ の平方なら座標は $K$ に残り、そうでなければ

$$
K\subset K(\sqrt d)
$$

は次数 $2$ の実拡大です。

円どうしの交点も、二つの円の方程式を引けば二次項が消えて直線が得られるため、直線と円の場合へ帰着します。

作図は有限回で終わるので、必要な二次拡大だけを順に並べれば

$$
\mathbb Q=K_0
\subset K_1
\subset\cdots\subset K_r
$$

が得られ、最終座標 $\alpha$ は $K_r$ に属します。

#### $(2)\Rightarrow(1)$

逆に実二次拡大列を取ります。

$K_{i-1}$ の全ての元が作図可能だと仮定し、

$$
[K_i:K_{i-1}]=2
$$

とします。

$\beta\in K_i\setminus K_{i-1}$ を取り、その $K_{i-1}$ 上の最小多項式を

$$
x^2+bx+c
$$

と書きます。

$\beta$ は実数なので

$$
(2\beta+b)^2
=
b^2-4c
=:d
$$

であり、

$$
d\in K_{i-1},
\qquad
d>0.
$$

$d=0$ なら $\beta=-b/2\in K_{i-1}$ となって矛盾するため、実際 $d>0$ です。

さらに

$$
\beta
=
\frac{-b+\sqrt d}{2}
$$

または共役根に応じて符号を変えた形です。従って

$$
K_i
=
K_{i-1}(\sqrt d).
$$

定規とコンパスでは、既知の実数から和・差・積・非零元による商を相似三角形で作れます。また前節の半円の作図で正の平方根を作れます。

したがって $K_{i-1}$ の元が全て作図可能なら、$\sqrt d$ も作図可能であり、

$$
K_i=K_{i-1}(\sqrt d)
$$

の全ての元も作図可能です。

$K_0=\mathbb Q$ の元は作図可能なので、帰納的に $K_r$ の全ての元が作図可能です。特に

$$
\alpha\in K_r
$$

は作図可能です。$\square$
<!-- proof-end -->

この定理が重要なのは、「コンパスで円を描く」という幾何操作を、完全に

$$
\text{平方根を一つずつ添加する}
$$

という体論へ翻訳した点です。

---

## 3. 次数が $2$ の冪でなければ作図できない

<a id="cor-fld5-constructible-degree"></a>
<!-- formal-statement-start -->
> **系（作図可能な代数的数の次数は $2$ の冪）**
>
> $\alpha\in\mathbb R$ を $\mathbb Q$ 上代数的な作図可能数とする。
>
> このとき
>
> $$
> [\mathbb Q(\alpha):\mathbb Q]
> $$
>
> は $2$ の冪である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前定理から

$$
\mathbb Q=K_0
\subset K_1
\subset\cdots\subset K_r
$$

で

$$
[K_i:K_{i-1}]
\le2,
\qquad
\alpha\in K_r
$$

となる実二次拡大列があります。

次数 $1$ の段階を除けば、[拡大次数の塔の公式](../FLD1/index.md#thm-fld1-tower-law)から

$$
[K_r:\mathbb Q]
=
2^s
$$

と書けます。

また

$$
\mathbb Q
\subset
\mathbb Q(\alpha)
\subset
K_r
$$

なので、再び塔の公式から

$$
[K_r:\mathbb Q]
=
[K_r:\mathbb Q(\alpha)]
[\mathbb Q(\alpha):\mathbb Q].
$$

従って

$$
[\mathbb Q(\alpha):\mathbb Q]
\mid 2^s.
$$

$2^s$ の正の約数は全て $2$ の冪なので結論を得ます。$\square$
<!-- proof-end -->

ここで注意すべきことがあります。

$$
[\mathbb Q(\alpha):\mathbb Q]
\text{ が }2\text{ の冪}
$$

は **必要条件**です。作図可能性そのものの完全な判定は、前定理の「実二次拡大列へ入ること」です。次数だけを見ると、中間体や正規閉包の構造を捨ててしまいます。

### 3.1 立方体倍積はできない

一辺 $1$ の立方体の体積を2倍にする立方体の一辺を $a$ とすると

$$
a^3=2.
$$

従って

$$
a=\sqrt[3]{2}.
$$

多項式

$$
x^3-2
$$

は $2$ による Eisenstein の判定で $\mathbb Q$ 上既約なので、

$$
[\mathbb Q(\sqrt[3]{2}):\mathbb Q]
=
3.
$$

$3$ は $2$ の冪ではありません。

よって

$$
\boxed{\sqrt[3]{2}\text{ は定規とコンパスでは作図できない}}
$$

と分かります。

### 3.2 一般には $60^\circ$ の三等分もできない

$60^\circ$ を三等分できたと仮定すると

$$
20^\circ
$$

を作図できます。

$$
y=2\cos20^\circ
$$

と置きます。三倍角公式

$$
4\cos^3\theta-3\cos\theta=\cos3\theta
$$

へ $\theta=20^\circ$ を代入すると

$$
4\cos^3 20^\circ
-
3\cos20^\circ
=
\frac12.
$$

$y=2\cos20^\circ$ だから

$$
y^3-3y-1=0.
$$

三次多項式

$$
x^3-3x-1
$$

の有理根候補は $\pm1$ だけですが、

$$
1-3-1=-3,
\qquad
-1+3-1=1
$$

で、どちらも根ではありません。

三次多項式が $\mathbb Q$ 上可約なら一次因子を持つため、この多項式は既約です。

従って

$$
[\mathbb Q(y):\mathbb Q]=3.
$$

よって $y$、したがって $\cos20^\circ$ は作図可能ではありません。

これは「どんな角も三等分できない」という意味ではありません。例えば $90^\circ$ の三等分は $30^\circ$ なので可能です。壊れるのは **任意の角に対する一般三等分作図**です。

---

## 4. 正多角形と $1$ の根――円分体への入口

正 $n$ 角形を単位円へ内接させると、頂点は複素数

$$
\zeta_n^k,
\qquad
\zeta_n=e^{2\pi i/n}
$$

で表せます。

従って正 $n$ 角形の作図は

$$
\cos\frac{2\pi}{n},
\qquad
\sin\frac{2\pi}{n}
$$

を作図できるか、という問題になります。

### 4.1 正五角形は平方根だけで閉じる

$\zeta=\zeta_5$ とします。

$$
1+\zeta+\zeta^2+\zeta^3+\zeta^4=0.
$$

両辺を $\zeta^2$ で割ると

$$
\zeta^2+\zeta+1+\zeta^{-1}+\zeta^{-2}=0.
$$

ここで

$$
t=\zeta+\zeta^{-1}
=
2\cos\frac{2\pi}{5}
$$

と置くと

$$
\zeta^2+\zeta^{-2}
=
t^2-2.
$$

従って

$$
t^2+t-1=0.
$$

$2\cos72^\circ>0$ なので

$$
t=
\frac{-1+\sqrt5}{2}.
$$

したがって

$$
\cos72^\circ
=
\frac{\sqrt5-1}{4}.
$$

$\sqrt5$ は作図可能なので $\cos72^\circ$ も作図可能です。さらに

$$
\sin72^\circ
=
\sqrt{1-\cos^2 72^\circ}
$$

も正の平方根で作れます。

よって正五角形は作図可能です。

### 4.2 正七角形は作図できない

素数 $p$ に対し

$$
\Phi_p(x)
=
1+x+\cdots+x^{p-1}
$$

を考えます。

$x$ を $x+1$ へ置き換えると

$$
\Phi_p(x+1)
=
\frac{(x+1)^p-1}{x}.
$$

二項係数

$$
\binom pk
\qquad
(1\le k\le p-1)
$$

は全て $p$ で割れ、定数項は $p$ で $p^2$ では割れません。

従って Eisenstein の判定から $\Phi_p(x+1)$ は既約であり、変数の平行移動を戻せば $\Phi_p(x)$ も $\mathbb Q$ 上既約です。

$p=7$ では

$$
[\mathbb Q(\zeta_7):\mathbb Q]
=
6.
$$

$$
t=\zeta_7+\zeta_7^{-1}
=
2\cos\frac{2\pi}{7}
$$

と置くと、$\zeta_7$ は

$$
x^2-tx+1=0
$$

を満たします。

$\mathbb Q(t)\subset\mathbb R$ ですが $\zeta_7\notin\mathbb R$ なので、

$$
[\mathbb Q(\zeta_7):\mathbb Q(t)]
=
2.
$$

塔の公式から

$$
[\mathbb Q(t):\mathbb Q]
=
3.
$$

従って

$$
\cos\frac{2\pi}{7}
$$

の次数も $3$ であり、作図可能数の次数条件に反します。

よって

$$
\boxed{\text{正七角形は定規とコンパスでは作図できない}}
$$

と分かります。

ここから先、どの $n$ で正 $n$ 角形が作図可能かを完全分類すると Gauss--Wantzel の定理へ進みます。本章では、円分体の次数と二次拡大列が作図問題を支配する、という入口までを正本とします。

---

## 5. 根号を足す前に「群がどれだけ可換から遠いか」を測る

二次方程式の解の公式では平方根を使います。三次・四次方程式にも根号公式があります。

五次で何が変わるのかを見るには、「Galois 群が可換群を何段重ねれば作れるか」を測る必要があります。

<a id="def-fld5-solvable-group"></a>
<!-- formal-statement-start -->
> **定義（交換子・交換子部分群・導来列・可解群）**
>
> 群 $G$ の元 $g,h\in G$ に対し
>
> $$
> [g,h]
> =
> ghg^{-1}h^{-1}
> $$
>
> を **交換子**という。
>
> 全ての交換子で生成される部分群を
>
> $$
> [G,G]
> $$
>
> と書き、**交換子部分群**という。
>
> $G^{(0)}=G$ とし、
>
> $$
> G^{(i+1)}
> =
> [G^{(i)},G^{(i)}]
> $$
>
> と再帰的に定めた列
>
> $$
> G=G^{(0)}
> \supset G^{(1)}
> \supset G^{(2)}
> \supset\cdots
> $$
>
> を **導来列**という。
>
> ある $r$ で
>
> $$
> G^{(r)}=\{e\}
> $$
>
> となるとき、$G$ を **可解群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld5-solvable-group -->
**定義の確認**

### 5.1 $S_3$ は可解群

符号準同型

$$
\operatorname{sgn}:S_3\to\{\pm1\}
$$

の核は $A_3$ です。

商群

$$
S_3/A_3
$$

は位数 $2$ なので可換です。後で証明する交換子部分群の特徴付けから

$$
S_3'
=
[S_3,S_3]
\subset A_3.
$$

一方 $S_3$ は非可換なので $S_3'\ne\{e\}$ です。

$A_3$ は位数 $3$ の巡回群なので、その非自明部分群は $A_3$ 自身しかありません。従って

$$
S_3'=A_3.
$$

$A_3$ は可換なので

$$
A_3'=\{e\}.
$$

よって導来列は

$$
S_3
\supset
A_3
\supset
\{e\}
$$

で止まり、

$$
\boxed{S_3\text{ は可解群}}
$$

です。
<!-- definition-example-end -->

### 5.2 交換子部分群は「可換化のために必ず消す部分」である

<a id="prop-fld5-commutator-abelianization"></a>
<!-- formal-statement-start -->
> **命題（交換子部分群と最大可換商）**
>
> 任意の群 $G$ について、
>
> 1. $[G,G]\trianglelefteq G$ である。
> 2. 商群 $G/[G,G]$ は可換群である。
> 3. $N\trianglelefteq G$ に対して $G/N$ が可換なら
>
> $$
> [G,G]\subset N
> $$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

交換子を共役すると

$$
x[g,h]x^{-1}
=
[xgx^{-1},xhx^{-1}]
$$

です。

従って交換子全体は共役で保たれ、それが生成する部分群 $[G,G]$ も共役で保たれます。よって

$$
[G,G]\trianglelefteq G.
$$

次に商群では

$$
gh(hg)^{-1}
=
ghg^{-1}h^{-1}
=
[g,h]
\in[G,G].
$$

従って

$$
gh[G,G]
=
hg[G,G].
$$

よって $G/[G,G]$ は可換です。

最後に $G/N$ が可換なら、任意の $g,h\in G$ に対し

$$
gN\,hN
=
hN\,gN.
$$

従って

$$
[g,h]N=N,
$$

つまり

$$
[g,h]\in N.
$$

$N$ は全ての交換子を含むので、それらが生成する

$$
[G,G]
$$

も含みます。$\square$
<!-- proof-end -->

この三番目の性質から、交換子部分群は「商を可換にするために最低限つぶす必要がある部分群」だと分かります。

### 5.3 導来列と可換商の列は同じ情報を持つ

<a id="thm-fld5-solvable-series"></a>
<!-- formal-statement-start -->
> **定理（可解群の可解列による特徴付け）**
>
> 群 $G$ が可解であるための必要十分条件は、ある有限列
>
> $$
> G=G_0
> \trianglerighteq
> G_1
> \trianglerighteq
> \cdots
> \trianglerighteq
> G_r=\{e\}
> $$
>
> が存在し、各 $i$ で
>
> $$
> G_{i+1}\trianglelefteq G_i,
> \qquad
> G_i/G_{i+1}\text{ が可換}
> $$
>
> となることである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$G$ が可解なら、ある $r$ で

$$
G^{(r)}=\{e\}.
$$

各段階で

$$
G^{(i+1)}
=
[G^{(i)},G^{(i)}]
$$

は前命題から $G^{(i)}$ の正規部分群であり、

$$
G^{(i)}/G^{(i+1)}
$$

は可換です。

従って導来列そのものが条件を満たします。

逆に

$$
G=G_0
\trianglerighteq
G_1
\trianglerighteq\cdots
\trianglerighteq
G_r=\{e\}
$$

で各商が可換だとします。

$G_i/G_{i+1}$ が可換なので、前命題を群 $G_i$ に適用すると

$$
[G_i,G_i]
\subset
G_{i+1}.
$$

帰納的に

$$
G^{(i)}
\subset
G_i
$$

を示せます。

実際 $i=0$ では等号で、$G^{(i)}\subset G_i$ なら

$$
G^{(i+1)}
=
[G^{(i)},G^{(i)}]
\subset
[G_i,G_i]
\subset
G_{i+1}.
$$

従って

$$
G^{(r)}
\subset
G_r
=
\{e\}.
$$

よって $G$ は可解です。$\square$
<!-- proof-end -->

<a id="prop-fld5-solvable-closure"></a>
<!-- formal-statement-start -->
> **命題（可解群の部分群・商群・拡大に対する閉性）**
>
> 1. 可解群の部分群は可解である。
> 2. 可解群の商群は可解である。
> 3. $N\trianglelefteq G$ とする。$N$ と $G/N$ がともに可解なら $G$ も可解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 部分群

$H\le G$ とします。

交換子の定義から

$$
[H,H]
\subset
[G,G].
$$

従って帰納的に

$$
H^{(i)}
\subset
G^{(i)}.
$$

$G^{(r)}=\{e\}$ なら $H^{(r)}=\{e\}$ なので $H$ も可解です。

#### 2. 商群

標準射影を

$$
\pi:G\to G/N
$$

とします。

準同型は交換子を交換子へ送るので

$$
\pi([g,h])
=
[\pi(g),\pi(h)].
$$

従って

$$
\pi(G^{(i)})
=
(G/N)^{(i)}
$$

が帰納的に成り立ちます。

$G^{(r)}=\{e\}$ なら

$$
(G/N)^{(r)}
=
\{\bar e\}.
$$

よって商群も可解です。

#### 3. 可解群による拡大

$G/N$ が可解なので、ある $r$ で

$$
(G/N)^{(r)}=\{\bar e\}.
$$

上の等式から

$$
\pi(G^{(r)})=\{\bar e\},
$$

従って

$$
G^{(r)}
\subset
N.
$$

一方 $N$ が可解なので、ある $s$ で

$$
N^{(s)}=\{e\}.
$$

$G^{(r)}\subset N$ から

$$
G^{(r+s)}
\subset
N^{(s)}
=
\{e\}.
$$

よって $G$ は可解です。$\square$
<!-- proof-end -->

この閉性が、根号を一段ずつ足したときの「各段階では可換」という情報を、最終的な Galois 群の可解性へ運ぶ役割を持ちます。

---

## 6. 根号拡大を体の塔として定義する

<a id="def-fld5-radical-extension"></a>
<!-- formal-statement-start -->
> **定義（根号拡大・根号による可解性）**
>
> 体 $F$ の有限拡大 $R/F$ が、体の塔
>
> $$
> F=K_0
> \subset K_1
> \subset\cdots\subset K_r=R
> $$
>
> を持ち、各 $i$ についてある
>
> $$
> \alpha_i\in K_i,
> \qquad
> n_i\ge2
> $$
>
> が存在して
>
> $$
> K_i=K_{i-1}(\alpha_i),
> \qquad
> \alpha_i^{n_i}\in K_{i-1}
> $$
>
> となるとき、$R/F$ を **根号拡大**という。
>
> 標数 $0$ の体 $F$ 上の多項式 $f\in F[x]$ の分解体を $L$ とする。
>
> $L$ がある根号拡大 $R/F$ に含まれるとき、$f$ は **根号によって可解**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld5-radical-extension -->
**定義の確認**

### 6.1 $x^3-2$ は根号によって可解

$\alpha=\sqrt[3]{2}$ とし、

$$
\zeta_3=e^{2\pi i/3}
$$

とします。

$x^3-2$ の三つの根は

$$
\alpha,
\qquad
\zeta_3\alpha,
\qquad
\zeta_3^2\alpha.
$$

塔

$$
\mathbb Q
\subset
\mathbb Q(\zeta_3)
\subset
\mathbb Q(\zeta_3,\alpha)
$$

を考えます。

最初の段階では

$$
\zeta_3^3=1\in\mathbb Q,
$$

次の段階では

$$
\alpha^3=2\in\mathbb Q(\zeta_3).
$$

従ってこれは根号拡大です。

しかも最上段は $x^3-2$ の分解体なので、この多項式は根号によって可解です。

FLD4 で見たように、その Galois 群は

$$
S_3
$$

です。§5.1 で $S_3$ が可解群であることを確認したので、ここですでに

$$
\text{根号で解ける}
\quad\leftrightarrow\quad
\text{Galois 群が可解そう}
$$

という対応が見え始めます。
<!-- definition-example-end -->

ただし、一つ注意があります。

$\alpha^n=a$ の根は一般に

$$
\alpha,\zeta_n\alpha,\ldots,\zeta_n^{n-1}\alpha
$$

です。

したがって一段の根号添加を Galois 拡大として扱うには、基礎体に $n$ 乗根の全ての回転因子、すなわち $1$ の $n$ 乗根が入っていることが重要です。

---

## 7. 根号一段の Galois 群は、必要な $1$ の根があれば可換になる

<a id="lem-fld5-one-step-radical"></a>
<!-- formal-statement-start -->
> **補題（$1$ の根を含む一段根号拡大の Galois 群）**
>
> $K$ を標数 $0$ の体とし、$K$ が $1$ の全ての $n$ 乗根を含むとする。
>
> $\alpha$ が
>
> $$
> \alpha^n=a\in K
> $$
>
> を満たし、
>
> $$
> E=K(\alpha)
> $$
>
> とする。
>
> このとき $E/K$ は有限 Galois 拡大であり、
>
> $$
> \operatorname{Gal}(E/K)
> $$
>
> は可換群である。
<!-- formal-statement-end -->

### 証明の見取り図

$x^n-a$ の根は

$$
\zeta\alpha
$$

という形です。

$K$ が全ての $n$ 乗根 $\zeta$ を含むので、$\alpha$ を一つ添加しただけで全ての根が $E$ に入ります。

自己同型 $\sigma$ は $\alpha$ を別の根へ送るため、

$$
\frac{\sigma(\alpha)}{\alpha}
$$

は $1$ の $n$ 乗根です。

これで Galois 群を可換な乗法群へ埋め込みます。

<!-- proof-start -->
### 証明

$\alpha=0$ なら $E=K$ で自明です。以下 $\alpha\ne0$ とします。

多項式

$$
x^n-a
$$

の全ての根は

$$
\zeta\alpha,
\qquad
\zeta^n=1
$$

です。

仮定により全ての $\zeta$ は $K$ に属するので、これらの根は全て

$$
K(\alpha)=E
$$

に入ります。

標数 $0$ なので $x^n-a$ は $\alpha\ne0$ の各根で重根を持ちません。従って $E$ は $x^n-a$ の分解体であり、[有限正規拡大と分解体](../FLD2/index.md#thm-fld2-finite-splitting-equivalence)と分離性から $E/K$ は有限 Galois 拡大です。

任意の

$$
\sigma\in\operatorname{Gal}(E/K)
$$

に対し、

$$
\sigma(\alpha)^n
=
\sigma(\alpha^n)
=
a.
$$

従って

$$
\sigma(\alpha)=\zeta_\sigma\alpha
$$

となる $1$ の $n$ 乗根 $\zeta_\sigma\in K$ が存在します。

写像

$$
\chi:
\operatorname{Gal}(E/K)
\to
\mu_n,
\qquad
\chi(\sigma)
=
\frac{\sigma(\alpha)}{\alpha}
$$

を考えます。ここで $\mu_n$ は $1$ の $n$ 乗根全体です。

$\sigma$ は $K$ を固定し、特に $\zeta_\tau$ を固定するので、

$$
(\sigma\tau)(\alpha)
=
\sigma(\zeta_\tau\alpha)
=
\zeta_\tau\zeta_\sigma\alpha.
$$

従って

$$
\chi(\sigma\tau)
=
\chi(\sigma)\chi(\tau).
$$

また $\chi(\sigma)=1$ なら $\sigma(\alpha)=\alpha$ であり、$E=K(\alpha)$ なので $\sigma$ は恒等写像です。

よって $\chi$ は単射準同型です。

$\mu_n$ は体の乗法の部分群なので可換です。その部分群である

$$
\operatorname{Gal}(E/K)
$$

も可換です。$\square$
<!-- proof-end -->

### 7.1 可換な段階を重ねると、正規閉包の群は可解になる

塔の各段階が Galois でも、最上段が最下段上 Galois になるとは限りません。

ここを雑に

$$
\text{各段が Galois}
\Rightarrow
\text{全体が Galois}
$$

としてはいけません。

必要なのは、最上段の **正規閉包**を取ったとき、その Galois 群が可解になることです。

<a id="lem-fld5-abelian-tower-normal-closure"></a>
<!-- formal-statement-start -->
> **補題（可換 Galois 段階列の正規閉包は可解）**
>
> 標数 $0$ の体 $F$ 上に有限塔
>
> $$
> F=E_0
> \subset E_1
> \subset\cdots\subset E_r
> $$
>
> があり、各 $E_i/E_{i-1}$ が有限 Galois 拡大で、その Galois 群が可換だとする。
>
> $N/F$ を $E_r/F$ の有限正規閉包とする。
>
> このとき
>
> $$
> \operatorname{Gal}(N/F)
> $$
>
> は可解群である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$i$ 段目までの体 $E_i$ の $F$ 上の正規閉包を $N_i$ とします。

$$
N_0=F.
$$

帰納法で

$$
\operatorname{Gal}(N_i/F)
$$

が可解であることを示します。

$i-1$ まで示されたとします。

$E_i/E_{i-1}$ は Galois なので、$E_{i-1}$ の各 $F$-共役を $N_{i-1}$ の中へ移す埋め込みを $E_i$ へ延長すると、その像

$$
\sigma(E_i)/\sigma(E_{i-1})
$$

も可換 Galois 拡大です。

$N_{i-1}$ と合成した

$$
N_{i-1}\sigma(E_i)/N_{i-1}
$$

の Galois 群は、制限写像によって

$$
\operatorname{Gal}(\sigma(E_i)/\sigma(E_{i-1}))
$$

の部分群へ埋め込まれます。従って可換です。

$N_i$ は、このような有限個の共役体を $N_{i-1}$ 上で合成したものです。

各成分への制限を並べると

$$
\operatorname{Gal}(N_i/N_{i-1})
$$

は有限個の可換群の直積へ単射されます。従って

$$
\operatorname{Gal}(N_i/N_{i-1})
$$

も可換です。

一方 $N_{i-1}/F$ は Galois なので、FLD4 の正規中間拡大の対応から制限準同型により

$$
1
\longrightarrow
\operatorname{Gal}(N_i/N_{i-1})
\longrightarrow
\operatorname{Gal}(N_i/F)
\longrightarrow
\operatorname{Gal}(N_{i-1}/F)
\longrightarrow
1
$$

という完全列が得られます。

左の群は可換、右の群は帰納法の仮定で可解です。

[可解群の拡大に対する閉性](#prop-fld5-solvable-closure)から中央の群も可解です。

従って全ての $i$ で成立し、特に

$$
\operatorname{Gal}(N_r/F)
=
\operatorname{Gal}(N/F)
$$

は可解です。$\square$
<!-- proof-end -->

ここで「正規閉包へ広げる」という一手が、根号拡大そのものが Galois とは限らない問題を処理しています。

---

## 8. 逆向き：巡回素数次数拡大は根号一つで作れる

根号から可解群へ進むだけでは半分です。

逆向きでは、可解群の可換商をさらに素数次数の巡回群まで細かく分け、その一段を根号として実現します。

その核心が次の補題です。

<a id="lem-fld5-kummer-prime"></a>
<!-- formal-statement-start -->
> **補題（素数次数巡回拡大の Kummer 表示）**
>
> $K$ を標数 $0$ の体、$p$ を素数とする。
>
> $K$ が $1$ の原始 $p$ 乗根 $\zeta_p$ を含み、
>
> $$
> E/K
> $$
>
> が次数 $p$ の巡回 Galois 拡大だとする。
>
> このとき、ある $\beta\in E$ が存在して
>
> $$
> E=K(\beta),
> \qquad
> \beta^p\in K.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

Galois 群の生成元を $\sigma$ とします。

欲しいのは

$$
\sigma(\beta)=\zeta_p^j\beta
$$

となる非零元です。

そこで任意の $x\in E$ から

$$
\beta_j
=
\sum_{k=0}^{p-1}
\zeta_p^{-jk}\sigma^k(x)
$$

という有限 Fourier 変換を作ります。これが **Lagrange の分解式** です。

$\sigma$ を一回作用させると添字が一つずれ、$\zeta_p^j$ 倍が出てきます。

<!-- proof-start -->
### 証明

$E/K$ の Galois 群は位数 $p$ の巡回群なので、

$$
\operatorname{Gal}(E/K)
=
\langle\sigma\rangle
$$

と書けます。

$x\in E\setminus K$ を取ります。

$j=0,1,\ldots,p-1$ に対して

$$
\beta_j
=
\sum_{k=0}^{p-1}
\zeta_p^{-jk}\sigma^k(x)
$$

と置きます。

まず

$$
\sum_{j=0}^{p-1}\beta_j
=
\sum_{k=0}^{p-1}
\sigma^k(x)
\sum_{j=0}^{p-1}\zeta_p^{-jk}.
$$

内側の和は $k=0$ のとき $p$、$1\le k\le p-1$ のとき $0$ なので、

$$
\sum_{j=0}^{p-1}\beta_j
=
px.
$$

もし $j\ne0$ の全てで $\beta_j=0$ なら

$$
x=\frac{\beta_0}{p}.
$$

しかし

$$
\beta_0
=
\sum_{k=0}^{p-1}\sigma^k(x)
$$

は $\sigma$ で固定されるので $\beta_0\in K$ です。すると $x\in K$ となり矛盾します。

従ってある

$$
j\in\{1,\ldots,p-1\}
$$

で

$$
\beta_j\ne0.
$$

その $j$ を固定し、

$$
\beta=\beta_j
$$

とします。

$\sigma$ を作用させると

$$
\begin{aligned}
\sigma(\beta)
&=
\sum_{k=0}^{p-1}
\zeta_p^{-jk}\sigma^{k+1}(x)\\
&=
\zeta_p^j
\sum_{\ell=0}^{p-1}
\zeta_p^{-j\ell}\sigma^\ell(x)\\
&=
\zeta_p^j\beta.
\end{aligned}
$$

従って

$$
\sigma(\beta^p)
=
(\zeta_p^j\beta)^p
=
\beta^p.
$$

$\sigma$ が Galois 群を生成するので、

$$
\beta^p\in K.
$$

また $j\ne0$ なので

$$
\zeta_p^j\ne1
$$

であり、

$$
\sigma(\beta)\ne\beta.
$$

従って $\beta\notin K$ です。

中間体

$$
K\subset K(\beta)\subset E
$$

について、塔の公式から

$$
[E:K]
=
[E:K(\beta)]
[K(\beta):K].
$$

左辺は素数 $p$ で、$\beta\notin K$ だから $[K(\beta):K]>1$ です。

従って

$$
[K(\beta):K]=p,
\qquad
E=K(\beta).
$$

これで

$$
E=K(\beta),
\qquad
\beta^p\in K
$$

が得られました。$\square$
<!-- proof-end -->

この補題は「巡回素数次数」という群論的な一段を「$p$ 乗根を一つ足す」という体論的な一段へ戻します。

---

## 9. Galois 群が可解であることと根号で解けることは同値

<a id="thm-fld5-radicals-solvable-galois"></a>
<!-- formal-statement-start -->
> **定理（根号可解性と Galois 群の可解性）**
>
> $F$ を標数 $0$ の体とし、
>
> $$
> f\in F[x]
> $$
>
> を非定数多項式とする。
>
> $L/F$ を $f$ の分解体とし、
>
> $$
> G=\operatorname{Gal}(L/F)
> $$
>
> とする。
>
> このとき次は同値である。
>
> 1. $f$ は $F$ 上根号によって可解である。
> 2. $G$ は可解群である。
<!-- formal-statement-end -->

### 証明の見取り図

#### 根号 $\Rightarrow$ 可解群

根号の指数を全部まとめて $N$ とし、最初に原始 $N$ 乗根 $\zeta_N$ を加えます。

すると各根号添加の段階は [§7 の補題](#lem-fld5-one-step-radical) により可換 Galois 拡大になります。

ただし塔の最上段が最初の体上 Galois とは限らないため、正規閉包を取ります。[§7.1 の補題](#lem-fld5-abelian-tower-normal-closure) により、その Galois 群は可解です。

元の分解体の Galois 群はその商群になるため可解です。

#### 可解群 $\Rightarrow$ 根号

まず $G$ の位数を $m$ とし、原始 $m$ 乗根を加えます。

その上の Galois 群は $G$ の部分群なので可解です。

有限可解群は、商が素数位数の巡回群になる列まで細分できます。

Galois 対応でその群列を中間体列へ反転し、各巡回素数次数拡大へ [§8 の Kummer 表示](#lem-fld5-kummer-prime) を適用します。

<!-- proof-start -->
### 証明

#### $(1)\Rightarrow(2)$

$f$ が根号によって可解だとします。

従ってある根号拡大

$$
F=K_0
\subset K_1
\subset\cdots\subset K_r=R
$$

があり、

$$
L\subset R,
$$

かつ

$$
K_i=K_{i-1}(\alpha_i),
\qquad
\alpha_i^{n_i}\in K_{i-1}
$$

です。

$$
N=\operatorname{lcm}(n_1,\ldots,n_r)
$$

とし、原始 $N$ 乗根 $\zeta_N$ を取ります。

まず

$$
F_1=F(\zeta_N)
$$

とします。

$x^N-1$ の全ての根は $\zeta_N$ の冪なので $F_1$ に入り、標数 $0$ なので重根はありません。従って $F_1/F$ は有限 Galois 拡大です。

任意の $F$-自己同型は

$$
\zeta_N\mapsto\zeta_N^a
$$

と送るので、

$$
\operatorname{Gal}(F_1/F)
\hookrightarrow
(\mathbb Z/N\mathbb Z)^\times.
$$

右辺は可換群だから

$$
\operatorname{Gal}(F_1/F)
$$

も可換です。

次に

$$
E_i
=
F_1K_i
=
F_1(\alpha_1,\ldots,\alpha_i)
$$

と置きます。

$n_i\mid N$ なので $F_1$ は $1$ の全ての $n_i$ 乗根を含みます。

しかも

$$
\alpha_i^{n_i}\in K_{i-1}\subset E_{i-1}.
$$

従って [1の根を含む一段根号拡大の補題](#lem-fld5-one-step-radical) から

$$
E_i/E_{i-1}
$$

は可換 Galois 拡大です。

よって

$$
F
\subset F_1
\subset E_1
\subset\cdots\subset E_r
$$

は、各段階の Galois 群が可換である有限塔です。

[可換 Galois 段階列の正規閉包の補題](#lem-fld5-abelian-tower-normal-closure)から、$E_r/F$ の正規閉包 $M/F$ は

$$
\operatorname{Gal}(M/F)
$$

が可解になるように取れます。

$$
L\subset R\subset E_r\subset M.
$$

$L/F$ は分解体なので Galois 拡大です。

FLD4 の正規中間拡大の対応と制限準同型から

$$
\operatorname{Gal}(M/F)
\twoheadrightarrow
\operatorname{Gal}(L/F)
$$

が全射になります。

従って $G=\operatorname{Gal}(L/F)$ は可解群の商群です。

[可解群の商群に対する閉性](#prop-fld5-solvable-closure)から $G$ は可解です。

#### $(2)\Rightarrow(1)$

今度は

$$
G=\operatorname{Gal}(L/F)
$$

が可解だとします。

$$
m=|G|
$$

とし、原始 $m$ 乗根 $\zeta_m$ を取り、

$$
M=L(\zeta_m)
$$

と置きます。

$M/F(\zeta_m)$ は有限 Galois 拡大です。

制限写像

$$
\operatorname{Gal}(M/F(\zeta_m))
\longrightarrow
\operatorname{Gal}(L/F)
$$

は単射です。実際、$L$ 上恒等で、さらに $\zeta_m$ も固定する自己同型は、$L$ と $\zeta_m$ で生成される $M$ 全体で恒等だからです。

従って

$$
H=
\operatorname{Gal}(M/F(\zeta_m))
$$

は可解群 $G$ の部分群であり、[部分群に対する閉性](#prop-fld5-solvable-closure)から可解です。

ここで有限可解群 $H$ は

$$
H=H_0
\trianglerighteq
H_1
\trianglerighteq
\cdots
\trianglerighteq
H_s=\{e\}
$$

で、各商

$$
H_i/H_{i+1}
$$

が素数位数の巡回群になるように取れます。

この細分が可能なことを確認します。

$H\ne\{e\}$ なら、可解性から $H/[H,H]$ は非自明な有限可換群です。その有限可換群の極大真部分群 $B$ を一つ取ると、商は単純な有限可換群です。

単純な有限可換群は、非単位元一つが生成する巡回群であり、その位数が合成数なら真の非自明部分群を持ってしまうため、位数は素数です。

$B$ の逆像を $H_1$ とすれば

$$
H/H_1
$$

は素数位数の巡回群です。

$H_1$ は可解群の部分群であり $|H_1|<|H|$ なので、位数に関する帰納法を続ければ上の列を得ます。

Galois 対応で

$$
K_i=M^{H_i}
$$

と置きます。

すると

$$
F(\zeta_m)=K_0
\subset K_1
\subset\cdots\subset K_s=M.
$$

さらに

$$
H_{i+1}\trianglelefteq H_i
$$

なので FLD4 の正規部分群と正規中間拡大の対応から

$$
K_{i+1}/K_i
$$

は Galois 拡大で、

$$
\operatorname{Gal}(K_{i+1}/K_i)
\cong
H_i/H_{i+1}
$$

はある素数 $p_i$ の位数を持つ巡回群です。

$p_i$ は $|H|$ を割り、$H$ は $G$ の部分群なので

$$
p_i\mid m.
$$

従って $K_i$ は

$$
\zeta_m^{m/p_i}
$$

という原始 $p_i$ 乗根を含みます。

[素数次数巡回拡大の Kummer 表示](#lem-fld5-kummer-prime)を適用すると、ある $\beta_i$ が存在して

$$
K_{i+1}
=
K_i(\beta_i),
\qquad
\beta_i^{p_i}\in K_i.
$$

よって

$$
F(\zeta_m)
\subset K_1
\subset\cdots\subset M
$$

は根号添加の列です。

最初の拡大も

$$
\zeta_m^m=1\in F
$$

なので、

$$
F\subset F(\zeta_m)
$$

は一段の根号添加です。

したがって $M/F$ は根号拡大です。

$$
L\subset M
$$

なので $f$ の全ての根はこの根号拡大に含まれます。

従って $f$ は根号によって可解です。$\square$
<!-- proof-end -->

この定理は、三次・四次には根号公式があり、五次では一般公式が消える理由を「式変形の巧拙」ではなく Galois 群の構造として説明します。

---

## 10. $S_4$ までは可解だが、$S_5$ は可解でない

### 10.1 $S_4$ は可解

$S_4$ の中で

$$
V_4
=
\{
e,
(12)(34),
(13)(24),
(14)(23)
\}
$$

を考えます。

$V_4$ は $A_4$ の正規部分群で、

$$
S_4
\trianglerighteq
A_4
\trianglerighteq
V_4
\trianglerighteq
\{e\}
$$

となります。

商群の位数はそれぞれ

$$
2,\quad3,\quad4
$$

で、

$$
S_4/A_4\cong C_2,
\qquad
A_4/V_4\cong C_3,
\qquad
V_4\text{ は可換}
$$

です。

従って [可解列による特徴付け](#thm-fld5-solvable-series)から

$$
\boxed{S_4\text{ は可解}}
$$

です。

任意の $n\le4$ 次多項式の Galois 群は $S_n$ の部分群として根を置換します。$S_4$ が可解で、その部分群も可解なので、標数 $0$ では4次以下の多項式は全て根号によって可解です。

これは三次・四次の巨大な解の公式を展開しなくても、その **存在**だけを群論から保証しています。

### 10.2 $A_5$ の単純性が境目になる

ここで必要な語を一つだけ定義します。

<a id="def-fld5-simple-group"></a>
<!-- formal-statement-start -->
> **定義（単純群）**
>
> 非自明な群 $G$ が
>
> $$
> \{e\},
> \qquad
> G
> $$
>
> 以外の正規部分群を持たないとき、$G$ を **単純群**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fld5-simple-group -->
**定義の確認**

素数 $p$ に対する巡回群 $C_p$ は単純群です。

Lagrange の定理から部分群の位数は $1$ または $p$ しかないため、部分群自体が

$$
\{e\},
\qquad
C_p
$$

の二つだけだからです。

一方 $C_p$ は可換群なので、非可換単純群とは挙動が大きく異なります。
<!-- definition-example-end -->

<a id="thm-fld5-a5-simple-s5-nonsolvable"></a>
<!-- formal-statement-start -->
> **定理（$A_5$ の単純性と $S_5$ の非可解性）**
>
> 交代群 $A_5$ は非可換単純群である。
>
> 従って $A_5$ は可解でなく、さらに $S_5$ も可解でない。
<!-- formal-statement-end -->

### 証明の見取り図

正規部分群は共役で閉じているので、共役類の合併です。

$A_5$ の共役類の大きさを数えると

$$
1,\quad
20,\quad
15,\quad
12,\quad
12
$$

になります。

単位元を含むこれらの和のうち、$60$ の約数になるものを調べると、$1$ と $60$ しかありません。

従って非自明な真の正規部分群は存在しません。

<!-- proof-start -->
### 証明

$|A_5|=60$ です。

$A_5$ の元は巡回型により

1. 恒等置換、
2. 3-cycle、
3. 二つの互換の積 $(ab)(cd)$、
4. 5-巡回置換

のいずれかです。

#### 3-cycle の共役類

3-cycle の総数は

$$
\binom53\cdot2
=
20.
$$

例えば $(123)$ の $S_5$ における中心化群は、

- $\langle(123)\rangle$ の3元、
- 残りの2点を交換するかどうか

から位数 $6$ です。

残り2点の互換は奇置換なので、$A_5$ に入る中心化群は位数 $3$ です。

従って $A_5$ における共役類の大きさは

$$
\frac{60}{3}
=
20.
$$

したがって20個の 3-cycle は一つの共役類です。

#### 二重互換の共役類

$(ab)(cd)$ 型の元は、固定点を5通り選び、残り4点の組分けを3通り選ぶので

$$
5\cdot3=15
$$

個あります。

$S_5$ での中心化群の位数は $8$ で、その半分の4元が偶置換です。従って $A_5$ での共役類の大きさは

$$
\frac{60}{4}
=
15.
$$

よって15個全体が一つの共役類です。

#### 5-巡回置換 の共役類

5-巡回置換 の総数は

$$
(5-1)!
=
24.
$$

5-巡回置換 $c$ の $S_5$ における中心化群は

$$
\langle c\rangle
$$

で位数 $5$ です。5-巡回置換 は偶置換なので、この中心化群は全て $A_5$ に入ります。

従って $A_5$ での一つの共役類の大きさは

$$
\frac{60}{5}
=
12.
$$

24個の 5-巡回置換 は、二つの共役類に分かれます。

以上から共役類の大きさは

$$
1,\ 20,\ 15,\ 12,\ 12.
$$

$N\trianglelefteq A_5$ なら $N$ は単位元を含む共役類の合併です。

従って $|N|$ は

$$
1
$$

に $20,15,12,12$ のいくつかを加えた数です。

一方 Lagrange の定理から

$$
|N|\mid60.
$$

実際に可能な和を調べると、$60$ の約数になるのは

$$
1
\quad\text{または}\quad
60
$$

だけです。

従って

$$
N=\{e\}
\quad\text{または}\quad
N=A_5.
$$

よって $A_5$ は単純群です。

また例えば

$$
(123)(345)\ne(345)(123)
$$

なので $A_5$ は非可換です。

交換子部分群

$$
[A_5,A_5]
$$

は正規部分群です。

$A_5$ が非可換なので

$$
[A_5,A_5]\ne\{e\}.
$$

単純性から

$$
[A_5,A_5]=A_5.
$$

従って導来列は最初の段階から

$$
A_5^{(1)}=A_5
$$

となり、永遠に自明群へ到達しません。

よって $A_5$ は可解ではありません。

最後に、もし $S_5$ が可解なら、その部分群 $A_5$ も [部分群に対する閉性](#prop-fld5-solvable-closure)から可解になるはずです。これは矛盾です。

従って

$$
\boxed{S_5\text{ は可解でない}}.
$$
$\square$
<!-- proof-end -->

ここで次数 $4$ と $5$ の間に、単なる計算量の増加ではない構造的な境界が現れます。

---

## 11. 実際に根号で解けない五次方程式を一つ作る

「$S_5$ は可解でない」だけでは、五次多項式の Galois 群が本当に $S_5$ になる例が必要です。

その例として

$$
f(x)=x^5-4x+2
$$

を使います。

<a id="thm-fld5-explicit-s5-quintic"></a>
<!-- formal-statement-start -->
> **定理（$x^5-4x+2$ の Galois 群は $S_5$）**
>
> $$
> f(x)=x^5-4x+2\in\mathbb Q[x]
> $$
>
> とし、$L/\mathbb Q$ を $f$ の分解体とする。
>
> このとき
>
> $$
> \operatorname{Gal}(L/\mathbb Q)
> \cong
> S_5.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

必要なのは三段階です。

1. Eisenstein の判定で $f$ が既約と分かる。従って Galois 群は5個の根へ推移的に作用する。
2. 推移的な5点作用から群の位数は5で割れる。Cauchy の定理で 5-巡回置換 が得られる。
3. $f$ が実根をちょうど3個持つことを微分で示す。複素共役は3個の実根を固定し、残る非実根2個を交換するので 互換 になる。

5-巡回置換 と 互換 が同じ部分群に入れば、その部分群は $S_5$ 全体です。

<!-- proof-start -->
### 証明

#### Step 1：既約性と推移性

$f$ の首項以外の係数は全て $2$ で割れ、定数項 $2$ は $4$ では割れません。

従って $2$ による Eisenstein の判定から

$$
f(x)=x^5-4x+2
$$

は $\mathbb Q$ 上既約です。

根を

$$
\alpha_1,\ldots,\alpha_5
$$

とします。

標数 $0$ なので $f$ は分離的です。

任意の二根 $\alpha_i,\alpha_j$ について、単純拡大

$$
\mathbb Q(\alpha_i)
\to
\mathbb Q(\alpha_j),
\qquad
\alpha_i\mapsto\alpha_j
$$

という $\mathbb Q$-埋め込みがあります。

FLD2 の埋め込み延長を使ってこれを分解体 $L$ へ延長すると、$L/\mathbb Q$ の正規性により像は再び $L$ です。

従ってある

$$
\sigma\in\operatorname{Gal}(L/\mathbb Q)
$$

が

$$
\sigma(\alpha_i)=\alpha_j
$$

を満たします。

よって Galois 群

$$
G=\operatorname{Gal}(L/\mathbb Q)
$$

は5個の根へ推移的に作用します。

一つの根 $\alpha_1$ の軌道は5点なので、[軌道・安定化群公式](../GRP3/index.md#thm-grp3-orbit-stabilizer)から

$$
5\mid|G|.
$$

[有限群の Cauchy の定理](../GRP4/index.md#thm-grp4-cauchy)から $G$ は位数5の元を持ちます。

$S_5$ の中で位数5の置換は 5-巡回置換 です。

従って $G$ は一つの 5-巡回置換 を含みます。

#### Step 2：実根はちょうど3個

微分すると

$$
f'(x)=5x^4-4.
$$

$$
a=
\left(\frac45\right)^{1/4}
$$

と置くと、実臨界点は

$$
-a,\qquad a
$$

の二つです。

また

$$
a^4=\frac45
$$

なので

$$
a^5=\frac45a.
$$

従って

$$
f(-a)
=
-a^5+4a+2
=
2+\frac{16}{5}a
>
0.
$$

一方

$$
f(a)
=
a^5-4a+2
=
2-\frac{16}{5}a.
$$

ここで

$$
a>\frac58
$$

です。実際、

$$
a^4=\frac45
>
\left(\frac58\right)^4
$$

だからです。

従って

$$
f(a)
<
2-\frac{16}{5}\cdot\frac58
=
0.
$$

$f'$ の符号は

$$
(-\infty,-a):+,
\qquad
(-a,a):-,
\qquad
(a,\infty):+
$$

です。

さらに

$$
\lim_{x\to-\infty}f(x)=-\infty,
\qquad
\lim_{x\to\infty}f(x)=\infty.
$$

従って単調性と中間値の定理から、

- $(-\infty,-a)$ に1個、
- $(-a,a)$ に1個、
- $(a,\infty)$ に1個

の実根があり、それぞれの区間では単調なので1個ずつしかありません。

よって $f$ はちょうど3個の実根と、1組の非実共役根を持ちます。

#### Step 3：複素共役が 互換 を与える

$f$ の係数は実数なので、複素共役

$$
z\mapsto\overline z
$$

は根集合を保ちます。

従って分解体 $L$ も保ち、その制限は

$$
c\in\operatorname{Gal}(L/\mathbb Q)
$$

です。

$c$ は3個の実根を固定し、残る非実根2個を交換します。

従って根集合上の置換として

$$
c
$$

は 互換 です。

これで $G$ は

- 一つの 5-巡回置換 $r$、
- 一つの 互換 $\tau$

を含みます。

根を $\mathbb Z/5\mathbb Z$ と番号付けし、

$$
r:k\mapsto k+1
$$

とします。

$\tau=(0\,d)$ と書けます。ただし $d\not\equiv0\pmod5$ です。

$r$ で共役すると

$$
r^k\tau r^{-k}
=
(k\,\,k+d).
$$

従って $G$ は、頂点 $\mathbb Z/5\mathbb Z$ の辺

$$
\{k,k+d\}
$$

に対応する5個の 互換 を全て含みます。

$5$ は素数で $d\not\equiv0$ なので、$d$ を繰り返し加えると5頂点全てを巡ります。従ってこの辺グラフは連結です。

連結グラフの辺 互換 は全対称群を生成します。実際、道

$$
v_0-v_1-\cdots-v_m
$$

に沿って隣接 互換 を共役していけば端点 互換 $(v_0\,v_m)$ を作れ、固定した一頂点と全頂点を結ぶ 互換 から任意の置換を生成できます。

従って

$$
\langle r,\tau\rangle
=
S_5.
$$

$\langle r,\tau\rangle\le G\le S_5$ なので

$$
\boxed{G=S_5}.
$$
$\square$
<!-- proof-end -->

<a id="cor-fld5-unsolvable-quintic"></a>
<!-- formal-statement-start -->
> **系（根号で解けない五次方程式の存在）**
>
> 多項式
>
> $$
> x^5-4x+2
> $$
>
> は $\mathbb Q$ 上根号によって可解ではない。
>
> 従って、全ての五次方程式を係数から四則演算と有限回の根号だけで解く普遍的な公式は存在しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前定理から

$$
\operatorname{Gal}(L/\mathbb Q)
\cong
S_5.
$$

[前節の定理](#thm-fld5-a5-simple-s5-nonsolvable)から $S_5$ は可解ではありません。

一方 [根号可解性と Galois 群の可解性](#thm-fld5-radicals-solvable-galois) により、標数 $0$ では多項式が根号によって可解であることと、その Galois 群が可解であることは同値です。

従って

$$
x^5-4x+2
$$

は根号によって可解ではありません。

もし全ての五次方程式を係数から根号だけで解く一つの一般公式が存在するなら、この具体的な五次方程式にもその公式を適用できるはずです。

しかし今それが不可能だと分かりました。

従って、そのような普遍的根号公式は存在しません。$\square$
<!-- proof-end -->

これが Abel--Ruffini の不可能性を Galois 理論で読む核心です。

重要なのは「五次方程式は解けない」ではありません。

- 特定の五次方程式には根号で解けるものが多数あります。
- Galois 群が可解な五次多項式は根号で解けます。
- **全ての五次を覆う根号公式が存在しない**のは、$S_5$ のような非可解 Galois 群が実際に現れるからです。

---

## 12. 演習

### Level A

#### FLD5-A01 二次拡大列から作図可能性を読む
- Level: A

$$
\alpha=\sqrt{2+\sqrt3}
$$

とする。

1. $\alpha$ が
   $$
   \mathbb Q
   \subset
   \mathbb Q(\sqrt3)
   \subset
   \mathbb Q(\sqrt3,\alpha)
   $$
   という実二次拡大列の最上段に入ることを確認せよ。
2. $\alpha$ が作図可能であることを説明せよ。
3. $\alpha$ が満たす $\mathbb Q$ 係数多項式を一つ求めよ。

<!-- solution-start -->
##### 詳細解答

1. 最初の段階では

$$
(\sqrt3)^2=3\in\mathbb Q
$$

なので

$$
[\mathbb Q(\sqrt3):\mathbb Q]=2.
$$

次に

$$
\alpha^2=2+\sqrt3
\in
\mathbb Q(\sqrt3).
$$

従って

$$
\mathbb Q(\sqrt3,\alpha)
=
\mathbb Q(\sqrt3)(\alpha)
$$

は $\mathbb Q(\sqrt3)$ 上高々2次です。

よって

$$
\mathbb Q
\subset
\mathbb Q(\sqrt3)
\subset
\mathbb Q(\sqrt3,\alpha)
$$

は各段階の次数が2以下の実二次拡大列です。

2. [作図可能性と実二次拡大列](#thm-fld5-constructible-quadratic-tower)から、その最上段に属する実数は作図可能です。

従って

$$
\boxed{\alpha\text{ は作図可能}}
$$

です。

3.

$$
\alpha^2=2+\sqrt3
$$

だから

$$
\alpha^2-2=\sqrt3.
$$

両辺を二乗すると

$$
(\alpha^2-2)^2=3.
$$

展開して

$$
\alpha^4-4\alpha^2+4=3,
$$

従って

$$
\boxed{\alpha^4-4\alpha^2+1=0}.
$$
<!-- solution-end -->

#### FLD5-A02 立方体倍積の次数障害
- Level: A

一辺 $1$ の立方体の体積を2倍にする立方体の一辺を $a$ とする。

1. $a=\sqrt[3]2$ を示せ。
2. $x^3-2$ が $\mathbb Q$ 上既約であることを示せ。
3. $a$ が作図可能でないことを示せ。

<!-- solution-start -->
##### 詳細解答

1. 元の立方体の体積は

$$
1^3=1.
$$

新しい立方体の体積を2にするので

$$
a^3=2.
$$

$a>0$ だから

$$
\boxed{a=\sqrt[3]2}.
$$

2. 多項式

$$
x^3-2
$$

では首項以外の係数は全て2で割れ、定数項 $-2$ は4で割れません。

従って $2$ による Eisenstein の判定から既約です。

3. よって $\sqrt[3]2$ の最小多項式は $x^3-2$ で、

$$
[\mathbb Q(\sqrt[3]2):\mathbb Q]=3.
$$

作図可能な代数的数の次数は2の冪でなければなりません。

$3$ は2の冪ではないので

$$
\boxed{\sqrt[3]2\text{ は作図可能でない}}
$$

です。
<!-- solution-end -->

#### FLD5-A03 $S_3$ の導来列
- Level: A

$S_3$ について

$$
S_3'
=
A_3,
\qquad
A_3'=\{e\}
$$

を示し、$S_3$ が可解群であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

符号準同型

$$
\operatorname{sgn}:S_3\to\{\pm1\}
$$

の核は $A_3$ です。

従って

$$
S_3/A_3
\cong
\{\pm1\}
$$

は可換です。

[交換子部分群と最大可換商](#prop-fld5-commutator-abelianization)から

$$
S_3'\subset A_3.
$$

一方 $S_3$ は非可換です。もし $S_3'=\{e\}$ なら $S_3/S_3'=S_3$ 自身が可換になってしまうため矛盾します。

従って $S_3'$ は $A_3$ の非自明部分群です。

$$
|A_3|=3
$$

は素数なので、Lagrange の定理から非自明部分群は $A_3$ 全体しかありません。

よって

$$
\boxed{S_3'=A_3}.
$$

$A_3$ は位数3の巡回群なので可換です。可換群では全ての交換子が単位元だから

$$
\boxed{A_3'=\{e\}}.
$$

従って導来列は

$$
S_3
\supset
A_3
\supset
\{e\}
$$

で有限回で止まり、

$$
\boxed{S_3\text{ は可解群}}
$$

です。
<!-- solution-end -->

#### FLD5-A04 $x^3-2$ を根号拡大で包む
- Level: A

$$
\alpha=\sqrt[3]2,
\qquad
\zeta_3=e^{2\pi i/3}
$$

とする。

1. $x^3-2$ の全ての根を書け。
2.
   $$
   \mathbb Q
   \subset
   \mathbb Q(\zeta_3)
   \subset
   \mathbb Q(\zeta_3,\alpha)
   $$
   が根号拡大の塔であることを定義から確認せよ。
3. $x^3-2$ が根号によって可解であることを結論せよ。

<!-- solution-start -->
##### 詳細解答

1. $\alpha^3=2$ なので、$1$ の3乗根を掛ければ全ての根が得られます。

$$
\boxed{
\alpha,\quad
\zeta_3\alpha,\quad
\zeta_3^2\alpha
}.
$$

2. 最初の段階では

$$
\zeta_3^3=1\in\mathbb Q.
$$

従って $\zeta_3$ は「3乗すると直前の体に入る」元です。

次の段階では

$$
\alpha^3=2\in\mathbb Q
\subset
\mathbb Q(\zeta_3).
$$

したがって各段階が根号添加の定義

$$
K_i=K_{i-1}(\gamma_i),
\qquad
\gamma_i^{n_i}\in K_{i-1}
$$

を満たします。

3. 最上段

$$
\mathbb Q(\zeta_3,\alpha)
$$

は1で求めた三つの根を全て含みます。

従って $x^3-2$ の分解体はこの根号拡大に含まれ、

$$
\boxed{x^3-2\text{ は根号によって可解}}
$$

です。
<!-- solution-end -->

### Level B

#### FLD5-B01 正五角形を二次拡大へ落とす
- Level: B

$\zeta=e^{2\pi i/5}$ とし、

$$
t=\zeta+\zeta^{-1}.
$$

1. $t=2\cos(2\pi/5)$ を示せ。
2. $\zeta^4+\zeta^3+\zeta^2+\zeta+1=0$ から
   $$
   t^2+t-1=0
   $$
   を導け。
3.
   $$
   \cos72^\circ
   =
   \frac{\sqrt5-1}{4}
   $$
   を導き、正五角形が作図可能であることを説明せよ。

<!-- solution-start -->
##### 詳細解答

1. Euler の公式から

$$
\zeta
=
\cos\frac{2\pi}{5}
+
i\sin\frac{2\pi}{5},
$$

$$
\zeta^{-1}
=
\cos\frac{2\pi}{5}
-
i\sin\frac{2\pi}{5}.
$$

加えると

$$
\boxed{
t
=
2\cos\frac{2\pi}{5}
}.
$$

2. $\zeta\ne1$ かつ $\zeta^5=1$ なので

$$
1+\zeta+\zeta^2+\zeta^3+\zeta^4=0.
$$

$\zeta^2$ で割ると

$$
\zeta^{-2}+\zeta^{-1}+1+\zeta+\zeta^2=0.
$$

また

$$
t^2
=
(\zeta+\zeta^{-1})^2
=
\zeta^2+2+\zeta^{-2}.
$$

従って

$$
\zeta^2+\zeta^{-2}
=
t^2-2.
$$

元の式へ代入すると

$$
(t^2-2)+t+1=0,
$$

すなわち

$$
\boxed{t^2+t-1=0}.
$$

3. 二次方程式を解くと

$$
t=
\frac{-1\pm\sqrt5}{2}.
$$

$72^\circ$ の余弦は正なので $t>0$ であり、

$$
t=
\frac{-1+\sqrt5}{2}.
$$

1から

$$
\cos72^\circ
=
\frac{t}{2}
=
\boxed{\frac{\sqrt5-1}{4}}.
$$

$\sqrt5$ は平方根一回で作図可能なので $\cos72^\circ$ も作図可能です。

さらに

$$
\sin72^\circ
=
\sqrt{1-\cos^2 72^\circ}
$$

も作図できます。

従って単位円上の頂点

$$
(\cos72^\circ,\sin72^\circ)
$$

を作れ、その回転を繰り返せば

$$
\boxed{\text{正五角形は作図可能}}
$$

です。
<!-- solution-end -->

#### FLD5-B02 $S_4$ の可解列
- Level: B

$$
V_4
=
\{
e,
(12)(34),
(13)(24),
(14)(23)
\}
\subset A_4
$$

とする。

1. $V_4\trianglelefteq A_4$ を示せ。
2. $A_4/V_4$ が位数3の巡回群であることを示せ。
3.
   $$
   S_4
   \trianglerighteq
   A_4
   \trianglerighteq
   V_4
   \trianglerighteq
   \{e\}
   $$
   が可解列であることを確認せよ。

<!-- solution-start -->
##### 詳細解答

1. $V_4$ の非単位元は、$A_4$ に含まれる二重互換の全体です。

共役は巡回型を保つので、任意の $\sigma\in A_4$ と二重互換 $\tau$ に対し

$$
\sigma\tau\sigma^{-1}
$$

も二重互換です。

従って $V_4$ は $A_4$ の共役で保たれ、

$$
\boxed{V_4\trianglelefteq A_4}.
$$

2.

$$
|A_4|=12,
\qquad
|V_4|=4.
$$

従って

$$
|A_4/V_4|
=
3.
$$

素数位数の群は巡回群なので

$$
\boxed{A_4/V_4\cong C_3}.
$$

3. 符号準同型の核が $A_4$ なので

$$
A_4\trianglelefteq S_4,
\qquad
S_4/A_4\cong C_2.
$$

1から

$$
V_4\trianglelefteq A_4,
$$

2から

$$
A_4/V_4\cong C_3
$$

です。

最後に $V_4$ 自身は可換なので

$$
V_4/\{e\}\cong V_4
$$

は可換です。

従って各段階の商が可換であり、

$$
\boxed{
S_4
\trianglerighteq
A_4
\trianglerighteq
V_4
\trianglerighteq
\{e\}
}
$$

は可解列です。

よって

$$
\boxed{S_4\text{ は可解群}}
$$

です。
<!-- solution-end -->

#### FLD5-B03 $x^4-2$ を二つの視点から読む
- Level: B

$$
f(x)=x^4-2\in\mathbb Q[x],
\qquad
\alpha=\sqrt[4]2
$$

とする。

1. $f$ の分解体が
   $$
   L=\mathbb Q(\alpha,i)
   $$
   であることを示せ。
2.
   $$
   \mathbb Q
   \subset
   \mathbb Q(i)
   \subset
   \mathbb Q(i,\alpha)
   $$
   が根号拡大であることを示せ。
3. $f$ が根号によって可解であること、および
   $$
   \operatorname{Gal}(L/\mathbb Q)
   $$
   が可解群であることを結論せよ。
4. $[\mathbb Q(\alpha):\mathbb Q]=4$ を示し、$\alpha$ 自身は作図可能であることも確認せよ。

<!-- solution-start -->
##### 詳細解答

1. $x^4=2$ の根は

$$
\alpha,\quad
-\alpha,\quad
i\alpha,\quad
-i\alpha.
$$

従って全ての根は

$$
\mathbb Q(\alpha,i)
$$

に入ります。

逆に分解体は $\alpha$ と $i\alpha$ を含むので

$$
i=\frac{i\alpha}{\alpha}
$$

も含みます。

従って分解体はちょうど

$$
\boxed{L=\mathbb Q(\alpha,i)}
$$

です。

2. 最初の段階では

$$
i^2=-1\in\mathbb Q.
$$

次の段階では

$$
\alpha^4=2\in\mathbb Q(i).
$$

よって各段階が根号添加であり、

$$
\boxed{
\mathbb Q
\subset
\mathbb Q(i)
\subset
\mathbb Q(i,\alpha)
}
$$

は根号拡大です。

3. 分解体 $L$ 自身が根号拡大なので、定義から

$$
\boxed{f\text{ は根号によって可解}}
$$

です。

標数 $0$ なので [根号可解性と Galois 群の可解性](#thm-fld5-radicals-solvable-galois) を適用でき、

$$
\boxed{
\operatorname{Gal}(L/\mathbb Q)
\text{ は可解群}
}
$$

と分かります。

4. $x^4-2$ は $2$ による Eisenstein の判定で既約です。

従って

$$
[\mathbb Q(\alpha):\mathbb Q]=4.
$$

一方

$$
\alpha
=
\sqrt{\sqrt2}.
$$

$\sqrt2$ を作り、その正の平方根をもう一度作ればよいので、

$$
\boxed{\alpha\text{ は作図可能}}
$$

です。

この例は「次数が $2$ の冪」という条件と、実際の二次拡大列

$$
\mathbb Q
\subset
\mathbb Q(\sqrt2)
\subset
\mathbb Q(\sqrt2,\sqrt{\sqrt2})
$$

が一致する素直な場合です。
<!-- solution-end -->

### Level C

#### FLD5-C01 根号で解けない具体的五次方程式
- Level: C

$$
f(x)=x^5-4x+2
$$

とし、$L/\mathbb Q$ をその分解体、

$$
G=\operatorname{Gal}(L/\mathbb Q)
$$

とする。

次を順に示せ。

1. $f$ は $\mathbb Q$ 上既約である。
2. $G$ は5個の根へ推移的に作用し、5-巡回置換 を含む。
3.
   $$
   a=(4/5)^{1/4}
   $$
   と置き、$f(-a)>0>f(a)$ を示して、$f$ がちょうど3個の実根を持つことを示せ。
4. 複素共役が $G$ の中の 互換 を与えることを示せ。
5. 5-巡回置換 と 互換 を含む $G$ が $S_5$ 全体であることを示せ。
6. $f$ が根号によって可解でないことを結論せよ。

<!-- solution-start -->
##### 詳細解答

1. 首項以外の係数

$$
0,\ 0,\ 0,\ -4,\ 2
$$

は全て2で割れ、定数項2は4では割れません。

従って $2$ による Eisenstein の判定から

$$
\boxed{f\text{ は }\mathbb Q\text{ 上既約}}
$$

です。

2. $\alpha,\beta$ を $f$ の任意の二根とします。

$f$ は既約なので、最小多項式の根を指定することで

$$
\mathbb Q(\alpha)
\to
\mathbb Q(\beta),
\qquad
\alpha\mapsto\beta
$$

という $\mathbb Q$-埋め込みが得られます。

これを分解体 $L$ まで延長すると、$L/\mathbb Q$ の正規性により $L$ の自己同型になります。

従って任意の根を任意の根へ送れるので、$G$ の根集合への作用は推移的です。

一つの根の軌道の大きさは5なので、軌道・安定化群公式から

$$
5\mid|G|.
$$

Cauchy の定理から $G$ は位数5の元を持ちます。

5点の置換で位数5を持つものは 5-巡回置換 なので、

$$
\boxed{G\text{ は 5-巡回置換 を含む}}
$$

と分かります。

3.

$$
f'(x)=5x^4-4.
$$

実臨界点は

$$
x=\pm a,
\qquad
a=(4/5)^{1/4}.
$$

$a^4=4/5$ なので

$$
a^5=\frac45a.
$$

従って

$$
f(-a)
=
-\frac45a+4a+2
=
2+\frac{16}{5}a
>
0.
$$

また

$$
f(a)
=
\frac45a-4a+2
=
2-\frac{16}{5}a.
$$

$$
\frac45
>
\left(\frac58\right)^4
$$

なので

$$
a>\frac58.
$$

よって

$$
f(a)
<
2-\frac{16}{5}\frac58
=
0.
$$

$f'$ は $|x|>a$ で正、$|x|<a$ で負です。

したがって $f$ は

- $(-\infty,-a)$ で単調増加し、$-\infty$ から正値へ移るので根1個、
- $(-a,a)$ で単調減少し、正値から負値へ移るので根1個、
- $(a,\infty)$ で単調増加し、負値から $\infty$ へ移るので根1個

を持ちます。

従って

$$
\boxed{f\text{ の実根はちょうど3個}}
$$

です。

残る2根は非実複素共役の一組です。

4. $f$ の係数は実数なので、複素共役

$$
z\mapsto\bar z
$$

は根集合と分解体 $L$ を保ちます。

その $L$ への制限は $\mathbb Q$ を固定する自己同型です。

3個の実根は固定し、残る2個の非実根だけを交換するので、根の置換としては 互換 です。

従って

$$
\boxed{G\text{ は 互換 を含む}}.
$$

5. $G$ に含まれる 5-巡回置換 を $r$、互換 を $\tau$ とします。

根を $\mathbb Z/5\mathbb Z$ と番号付けして

$$
r:k\mapsto k+1,
\qquad
\tau=(0\,d),
\quad
d\ne0
$$

とできます。

共役により

$$
r^k\tau r^{-k}
=
(k\,\,k+d)
$$

が全て $G$ に入ります。

$d$ は法5で非零なので、

$$
0,d,2d,3d,4d
$$

は5点を全て通ります。

従って 互換

$$
(k\,\,k+d)
$$

に対応する辺は5点を連結します。

連結グラフの辺 互換 は全対称群を生成します。よって

$$
S_5
\le G.
$$

もともと $G$ は5根の置換群なので

$$
G\le S_5.
$$

従って

$$
\boxed{G=S_5}.
$$

6. $A_5$ は非可換単純群なので可解ではなく、従って $S_5$ も可解ではありません。

[根号可解性と Galois 群の可解性](#thm-fld5-radicals-solvable-galois)から、標数0では

$$
f\text{ が根号で可解}
\iff
G\text{ が可解}
$$

です。

$G=S_5$ は可解でないので

$$
\boxed{x^5-4x+2\text{ は根号によって可解でない}}
$$

と結論できます。
<!-- solution-end -->

---

## 13. まとめ

本章で、有限 Galois 理論を二つの古典問題へ適用しました。

1. 定規とコンパスの一回の交点操作は、座標体に高々平方根一つを加える操作になる。
2. 実数が作図可能であることと、ある実二次拡大列の最上段に入ることは同値である。
3. その結果、作図可能な代数的数の $\mathbb Q$ 上の次数は $2$ の冪でなければならない。
4. この次数障害から、立方体倍積、一般の $60^\circ$ 三等分、正七角形の作図不可能性を判定できる。
5. 正五角形では $2\cos72^\circ$ が二次方程式 $t^2+t-1=0$ を満たし、平方根だけで作図できる。
6. 群の交換子部分群と導来列は、群を何段の可換商へ分解できるかを測る。
7. 可解群は、可換な商を持つ有限の正規列が存在する群と同値であり、部分群・商群・可解群による拡大で閉じる。
8. 必要な $1$ の根を含む体上では、一段の根号拡大の Galois 群は可換になる。
9. 逆に、原始 $p$ 乗根を含む体上の巡回素数次数 Galois 拡大は Lagrange の分解式 により一段の $p$ 乗根添加として書ける。
10. 以上から標数 $0$ では
    $$
    \boxed{
    \text{多項式が根号によって可解}
    \iff
    \text{Galois 群が可解}
    }
    $$
    が成立する。
11. $S_4$ は可解だが、非可換単純群 $A_5$ を含む $S_5$ は可解でない。
12. 具体的な
    $$
    x^5-4x+2
    $$
    の Galois 群は $S_5$ であり、この五次方程式は根号では解けない。従って全五次方程式を覆う普遍的な根号公式は存在しない。

これで GRP1 から始めた群論、RNG1 からの環論、MOD1 からの加群論、FLD1 からの体論は、有限 Galois 理論とその古典的応用まで一本の標準的な学部代数主線として閉じました。
