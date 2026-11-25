# NPCG5 測地線凸性と距離の凸性：中点から任意比へ

<!-- definition-example-audit: strict -->

前講では [CN不等式](../NPCG4/index.md#thm-npcg4-cn) によって測地線分の中点を調べ、[測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) と任意の比率での二乗距離評価を得ました。今回は二人が別々の最短経路を同じ割合だけ進んだとき、二人の距離がどのように変わるかを調べます。

例えば平面で一人が $(0,0)$ から $(4,0)$ へ、もう一人が $(0,2)$ から $(4,4)$ へ進むなら、比率 $t$ における距離は $2+2t$ です。出発時の距離2と到着時の距離4を一次式で結んだ値になっています。一般の CAT(0) 空間ではこの一次式が距離の上界になります。

## 1. 座標の平均を測地線分で置き換える

[測地空間](../NPCG2/index.md#def-npcg2-geodesic-space) では任意の二点を結ぶ最短経路を定速で進めます。以下、[測地線分](../NPCG2/index.md#def-npcg2-geodesic-segment) を比率 $t\in[0,1]$ で表示します。端点 $x,y$ を結ぶ写像 $\gamma$ について

$$
\gamma(0)=x,\quad \gamma(1)=y,\quad
d(\gamma(u),\gamma(v))=|u-v|d(x,y).
$$

特に [CAT(0)空間](../NPCG3/index.md#def-npcg3-cat-zero) では [測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により、時刻 $t$ の点を $(1-t)x\oplus ty$ と書けます。これはベクトルの和ではなく、測地線分上の位置を表す記号です。

平面の円板のように、集合内の二点を結ぶ最短経路の途中も集合に残る性質を抽象化します。測地線分が複数ある空間では、そのすべてが残るという強い意味で定義します。

<a id="def-npcg5-geodesically-convex-set"></a>

<!-- formal-statement-start -->
> **定義（測地線凸集合）**
>
> 測地空間 $(X,d)$ の部分集合 $C\subset X$ が測地線凸集合であるとは、任意の $x,y\in C$ とそれらを結ぶ任意の測地線分 $\gamma:[0,1]\to X$ について

$$
\gamma(t)\in C\qquad (0\le t\le1)
$$

> が成立することをいう。
<!-- formal-statement-end -->


<!-- definition-example-start: def-npcg5-geodesically-convex-set -->
### 例：平面の半平面

通常距離の Euclid 平面で $C=\{(a,b):b\ge0\}$ を考えます。[Euclid空間のCAT(0)性](../NPCG3/index.md#thm-npcg3-euclidean) と [測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) から、二点 $x=(a,b),y=(c,e)$ を結ぶ直線分だけを確認すれば十分です。実際に

$$
\gamma(t)=((1-t)a+tc,(1-t)b+te).
$$

$b,e\ge0$ かつ $1-t,t\ge0$ なので第二座標は非負です。任意の二点、任意の比率について集合に残るため、測地線凸集合です。
<!-- definition-example-end -->

対照的に通常距離の実直線の集合 $\{-1,1\}$ は中点0を含まないため測地線凸ではありません。

集合に残ることに加え、その途中で実数値の関数がどのように変わるかを調べます。端点を結ぶ一次式より関数値が上に出ない性質を考えます。

<a id="def-npcg5-geodesically-convex-function"></a>

<!-- formal-statement-start -->
> **定義（測地線凸関数）**
>
> 測地空間 $(X,d)$ の測地線凸集合 $C$ 上の実数値関数 $f:C\to\mathbb R$ が測地線凸関数であるとは、任意の $x,y\in C$ とそれらを結ぶ任意の測地線分 $\gamma$ について

$$
f(\gamma(t))\le (1-t)f(x)+tf(y)\qquad(0\le t\le1)
$$

> が成立することをいう。
<!-- formal-statement-end -->


<!-- definition-example-start: def-npcg5-geodesically-convex-function -->
### 例：実直線の平方

通常距離の実直線全体を $C$ とします。直線分は全時刻で $C$ に含まれます。[Euclid空間のCAT(0)性](../NPCG3/index.md#thm-npcg3-euclidean) と [測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により直線分以外の経路を調べる必要はありません。$f(a)=a^2$ とすると、任意の実数 $a,b$ と $t\in[0,1]$ について

$$
\begin{aligned}
(1-t)a^2+tb^2-f((1-t)a+tb)
&=(1-t)a^2+tb^2\\
&\quad-((1-t)^2a^2+2t(1-t)ab+t^2b^2)\\
&=t(1-t)(a-b)^2\ge0.
\end{aligned}
$$

従って [測地線凸関数の定義](#def-npcg5-geodesically-convex-function) を満たします。
<!-- definition-example-end -->

## 2. 中点での評価を任意比へ移す

前講の二進分割は二乗距離だけの技法ではありません。連続な実数値関数なら、中点の値が両端値の平均以下になる性質（中点凸性）を繰り返して任意比へ拡張できます。ここで連続とは、時刻列がある時刻に近づけば関数値もその時刻の値に近づくことです。

<a id="thm-npcg5-midpoint-to-convex"></a>

<!-- formal-statement-start -->
> **定理（連続な中点凸関数の凸性）**
>
> 連続関数 $h:[0,1]\to\mathbb R$ が任意の $u,v\in[0,1]$ について

$$
h((u+v)/2)\le\frac{h(u)+h(v)}2
$$

> を満たすなら、任意の $a,b\in[0,1]$ と $t\in[0,1]$ について

$$
h((1-t)a+tb)\le(1-t)h(a)+th(b)
$$

> が成立する。
<!-- formal-statement-end -->


端点を結ぶ一次式を上界として固定し、区間の半分、四分の一、八分の一と評価点を増やします。最後に連続性で分割点の間を埋めます。

<!-- proof-start -->
### 証明

任意の $a,b\in[0,1]$ を固定し、$g(t)=h((1-t)a+tb)$ と置きます。引数は $[0,1]$ に入り、$g$ は連続です。引数の一次性から

$$
g((u+v)/2)\le (g(u)+g(v))/2.
$$

$L(t)=(1-t)g(0)+tg(1)$ とします。$g(0)=L(0)$、$g(1)=L(1)$ です。整数 $j\ge0$ に対し、すべての $k=0,\ldots,2^j$ で $g(k/2^j)\le L(k/2^j)$ が成立すると仮定します。次の段階で新しく現れる時刻は、隣接する $u=k/2^j,v=(k+1)/2^j$ の中点です。従って

$$
g((u+v)/2)\le\frac{g(u)+g(v)}2
\le\frac{L(u)+L(v)}2=L((u+v)/2).
$$

古い時刻も残るので、帰納法で全二進分割点について成立します。任意の $t$ に対し $t_j=\lfloor2^jt\rfloor/2^j$ とすれば $0\le t-t_j<2^{-j}$ です。連続性から $g(t_j)\to g(t), L(t_j)\to L(t)$ であり、不等式を極限に移して $g(t)\le L(t)$ です。定義を戻すと目的の評価になります。
<!-- proof-end -->


例えば $h(t)=|2t-1|$ は絶対値の三角不等式により中点評価を満たし、端点を結ぶ一次式 $L(t)=1$ 以下です。途中で等号になる必要はありません。

## 3. 二本の測地線分間の距離

一点を固定した距離だけでなく、二点とも動く場合を扱います。まず共通の出発点から進む二本の経路では、比較三角形の二辺上の点の距離は比率倍になります。その評価を使って一般の中点間距離を求めます。

<a id="thm-npcg5-common-endpoint"></a>

<!-- formal-statement-start -->
> **定理（共通始点からの距離評価）**
>
> CAT(0)空間 $(X,d)$ で、点 $a$ からそれぞれ $x,y$ へ向かう測地線分を $\gamma,\eta:[0,1]\to X$ とする。任意の $t\in[0,1]$ で

$$
d(\gamma(t),\eta(t))\le t d(x,y)
$$

> が成立する。
<!-- formal-statement-end -->


同じ点から進む二人の距離は、到着地点の距離の比率倍以下です。

<!-- proof-start -->
### 証明

三頂点 $a,x,y$ の測地三角形を取り、その [Euclid比較三角形](../NPCG2/index.md#def-npcg2-comparison-triangle) の頂点を $\bar a,\bar x,\bar y$ とします。対応点は $\bar p=(1-t)\bar a+t\bar x$、$\bar q=(1-t)\bar a+t\bar y$ です。差は $\bar p-\bar q=t(\bar x-\bar y)$ なので、通常距離を $d_2$ と書けば

$$
d_2(\bar p,\bar q)=t d_2(\bar x,\bar y)=t d(x,y).
$$

[CAT(0)条件](../NPCG3/index.md#def-npcg3-cat-zero) により元の二点間距離はこの比較距離以下です。辺長で割っていないので、端点の重複や退化三角形にも成立します。
<!-- proof-end -->


例えば終点間距離が6なら、比率 $1/3$ での距離は2以下です。始点が異なる場合は、片方の始点と他方の終点を結ぶ補助経路を挟みます。

<a id="thm-npcg5-distance-convexity"></a>

<!-- formal-statement-start -->
> **定理（CAT(0)空間の距離の凸性）**
>
> CAT(0)空間 $(X,d)$ の任意の測地線分 $\gamma,\eta:[0,1]\to X$ に対し、任意の $t\in[0,1]$ で

$$
d(\gamma(t),\eta(t))\le
(1-t)d(\gamma(0),\eta(0))+t d(\gamma(1),\eta(1))
$$

> が成立する。
<!-- formal-statement-end -->


中点同士の距離を、補助経路の中点を介して二つの距離に分けます。その操作は任意の部分区間でもできるので、距離を時刻の関数と見て二進分割の定理に接続できます。

<!-- proof-start -->
### 証明

$\gamma(0)=a,\gamma(1)=b,\eta(0)=c,\eta(1)=e$ とします。$a,e$ を結ぶ測地線分 $\xi$ を選び、$m=\gamma(1/2),n=\eta(1/2),p=\xi(1/2)$ とします。

$\gamma,\xi$ は始点 $a$ が共通なので [共通始点からの距離評価](#thm-npcg5-common-endpoint) により $d(m,p)\le d(b,e)/2$ です。$\xi,\eta$ は終点 $e$ が共通なので時刻を $1-t$ に反転して同じ定理を適用すると $d(p,n)\le d(a,c)/2$ です。三角不等式により

$$
d(m,n)\le\frac{d(a,c)+d(b,e)}2.
$$

$H(t)=d(\gamma(t),\eta(t))$ と置きます。任意の $u\le v$ に対し、$s\mapsto\gamma((1-s)u+sv)$ と $s\mapsto\eta((1-s)u+sv)$ は [測地線分の距離条件](../NPCG2/index.md#def-npcg2-geodesic-segment) を満たします。例えば前者の二時刻 $s,r$ の距離は

$$
d(\gamma((1-s)u+sv),\gamma((1-r)u+rv))
=|s-r|(v-u)d(a,b).
$$

その端点間距離は $(v-u)d(a,b)$ です。したがってこれらの部分経路へ中点評価を適用して

$$
H((u+v)/2)\le(H(u)+H(v))/2.
$$

逆向きの $u,v$ も交換すれば成立します。さらに三角不等式を二方向に使うと

$$
\begin{aligned}
|H(u)-H(v)|
&\le d(\gamma(u),\gamma(v))+d(\eta(u),\eta(v))\\
&=|u-v|(d(a,b)+d(c,e)).
\end{aligned}
$$

従って $H$ は連続です。[連続な中点凸関数の凸性](#thm-npcg5-midpoint-to-convex) を $h=H,a=0,b=1$ に適用すれば結論を得ます。空間の完備性を使わず、既に存在する経路上で極限を取っています。
<!-- proof-end -->


例えば出発地点間距離が8、到着地点間距離が2なら、両者が $3/4$ 進んだ時点での距離は $8/4+3\cdot2/4=7/2$ 以下です。途中の距離は一次式より小さくなることもあります。

## 4. 距離関数、球、最小化への応用

もう一方の経路を固定点に留めれば、一点からの距離が測地線に沿って凸であることが分かります。中心からの距離が半径以下の点全体を閉球といいます。距離の凸性を用いると、この領域を最短経路がはみ出さないことが分かります。

<a id="thm-npcg5-distance-ball"></a>

<!-- formal-statement-start -->
> **定理（距離関数と閉球の測地線凸性）**
>
> CAT(0)空間 $(X,d)$ と任意の $z\in X$ に対して、関数 $x\mapsto d(z,x)$ は $X$ 上で測地線凸である。任意の実数 $R\ge0$ に対し、閉球

$$
\overline B(z,R)=\{x\in X:d(z,x)\le R\}
$$

> は測地線凸集合である。
<!-- formal-statement-end -->


距離を一次式で抑え、その一次式も半径を超えないことを示します。

<!-- proof-start -->
### 証明

任意の測地線分 $\gamma$ と定値経路 $\eta(t)=z$ を取ります。後者は端点間距離0の [測地線分](../NPCG2/index.md#def-npcg2-geodesic-segment) です。[距離の凸性](#thm-npcg5-distance-convexity) に代入すると

$$
d(z,\gamma(t))\le(1-t)d(z,\gamma(0))+td(z,\gamma(1)).
$$

全空間はすべての測地線分を含むので [測地線凸関数の定義](#def-npcg5-geodesically-convex-function) を満たします。両端が閉球内にあれば各端点距離が $R$ 以下なので

$$
d(z,\gamma(t))\le(1-t)R+tR=R.
$$

任意の時刻と任意の経路について成立するので [測地線凸集合の定義](#def-npcg5-geodesically-convex-set) を満たします。
<!-- proof-end -->


閉球の共通部分も測地線凸です。なぜなら共通部分の二点を結ぶ経路が各閉球に残るからです。これは複数の距離制約を同時に満たす領域の構成に役立ちます。

### 4.1 二乗距離ではさらに小さくなる

[CN不等式](../NPCG4/index.md#thm-npcg4-cn) と [CN条件から任意比の二乗距離評価](../NPCG4/index.md#thm-npcg4-cn-interpolation) を組み合わせると、$x,y$ を結ぶ経路 $\gamma$ に対し

$$
d(z,\gamma(t))^2\le
(1-t)d(z,x)^2+td(z,y)^2-t(1-t)d(x,y)^2.
$$

最後の項は非負量を引く補正です。$x\ne y$ かつ $0<t<1$ では補正が正になるため、単なる凸性より強い評価です。この章ではこの二乗距離の強凸性を、係数を含む上式の意味で用います。

例えば $d(z,x)=d(z,y)=5,d(x,y)=6$ なら中点での距離は通常の凸性では5以下ですが、二乗距離評価では

$$
d(z,\gamma(1/2))^2\le25-36/4=16
$$

なので4以下です。二乗距離を最小にする点が二つあると仮定した場合にも、中点で値が厳密に下がるという矛盾を作れます。最小値の存在については、閉性や完備性を別に調べる必要があります。

## 5. 距離の凸性はCAT(0)性より弱い

距離の凸性だけで二乗距離の補正も得られるでしょうか。次の平面は最短経路が一意で、二本の経路間の距離も凸ですが CN 不等式を満たしません。通常距離に第一座標の差の絶対値を加えることで、比較の仕組みを変えます。

<a id="prop-npcg5-convex-not-cat"></a>

<!-- formal-statement-start -->
> **命題（距離の凸性だけではCAT(0)性は従わない）**
>
> 平面 $\mathbb R^2$ に、ベクトル $v=(v_1,v_2)$ の長さ

$$
N(v)=\sqrt{v_1^2+v_2^2}+|v_1|
$$

> から距離 $d(x,y)=N(x-y)$ を定める。この測地空間は任意の二本の測地線分について [距離の凸性](#thm-npcg5-distance-convexity) の不等式を満たすが、CAT(0)空間ではない。
<!-- formal-statement-end -->


Euclid 距離と絶対値の三角不等式を足せば距離の三角不等式が得られます。さらに等号なら Euclid 側でも等号になるので、最短経路の形が直線に限られます。ところが対角線の中点に CN 不等式を適用すると、補正項が大きすぎることが分かります。

<!-- proof-start -->
### 証明

$N(v)$ は非負で、0になるのは $v=0$ のときだけです。また $N(-v)=N(v)$、任意の実数 $\lambda$ について $N(\lambda v)=|\lambda|N(v)$ です。Euclid の三角不等式と実数の絶対値の三角不等式を足すと $N(v+w)\le N(v)+N(w)$ です。従って $d$ は距離です。

直線分 $\gamma(t)=(1-t)x+ty$ の二時刻の距離は

$$
d(\gamma(u),\gamma(v))=N((u-v)(y-x))
=|u-v|N(y-x).
$$

従って [測地線分の定義](../NPCG2/index.md#def-npcg2-geodesic-segment) を満たします。逆に任意の測地線分上の時刻 $t$ の点を $p$ とすれば $N(p-x)+N(y-p)=N(y-x)$ です。左辺から右辺を引いた差は Euclid 側の三角不等式の差と第一座標の絶対値の三角不等式の差の和です。各差は非負なので Euclid 側の差も0です。

$U=p-x,V=y-p$ と置くと、Euclid 長さで $|U+V|=|U|+|V|$ です。両辺を平方して $U\cdot V=|U||V|$ を得ます。両ベクトルが非零なら

$$
\left|\frac U{|U|}-\frac V{|V|}\right|^2
=2-2\frac{U\cdot V}{|U||V|}=0.
$$

従って同じ向きです。$U=0$ または $V=0$ なら $p$ は端点です。$x=y$ なら全経路は定値です。$x\ne y$ の場合はいずれも $p=x+s(y-x)$ と $s\in[0,1]$ を使って書けます。測地線分の距離条件から $sN(y-x)=tN(y-x)$ であり、$N(y-x)>0$ なので $s=t$ です。これで全測地線分が直線分であると分かりました。

任意の二本の測地線分 $\gamma$（端点 $a,b$）と $\eta$（端点 $c,e$）について、斉次性と三角不等式から

$$
\begin{aligned}
d(\gamma(t),\eta(t))
&=N((1-t)(a-c)+t(b-e))\\
&\le(1-t)N(a-c)+tN(b-e).
\end{aligned}
$$

よって距離の凸性が成立します。

一方、$x=(1,1),y=(-1,-1),z=(1,-1)$ とし、中点を $m=(0,0)$ とします。$K=\sqrt2+1$ と書けば

$$
d(x,m)=d(y,m)=K,\qquad d(x,y)=2K.
$$

[中点の定義](../NPCG4/index.md#def-npcg4-midpoint) を満たします。さらに $d(z,m)=K,d(z,x)=2,d(z,y)=4$ です。CN不等式の右辺は

$$
\frac{2^2+4^2}2-\frac{(2K)^2}4=10-K^2.
$$

左辺との差は $2K^2-10=4(\sqrt2-1)>0$ です。従って [Bruhat–Tits CN不等式](../NPCG4/index.md#thm-npcg4-cn) に反するため CAT(0)空間ではありません。
<!-- proof-end -->


この反例では経路の一意性を失っていません。失われたのは距離の平方に対する補正項の保証です。距離の凸性と CN 不等式を区別して使いましょう。

## 6. 演習

<a id="ex-npcg5-a01"></a>

### NPCG5-A01 半平面と円周

- Level: A
- 目安時間: 10分
- 主題: 測地線凸集合の判定

通常距離の平面で集合 $C=\{(u,v):u+v\le2\}$ と単位円周 $S=\{(u,v):u^2+v^2=1\}$ が測地線凸か判定せよ。

<!-- solution-start -->
#### 詳細解答

[Euclid空間のCAT(0)性](../NPCG3/index.md#thm-npcg3-euclidean) と [測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により直線分のみを調べます。$x=(a,b),y=(c,e)\in C$ の途中の点の座標和は $(1-t)(a+b)+t(c+e)\le2$ です。任意の二点と時刻について成立し、[測地線凸集合の定義](#def-npcg5-geodesically-convex-set) を満たします。一方、$(1,0),(-1,0)\in S$ の中点は $(0,0)$ で円周外です。従って $S$ は測地線凸ではありません。
<!-- solution-end -->


<a id="ex-npcg5-a02"></a>

### NPCG5-A02 二本の経路の距離

- Level: A
- 目安時間: 10分
- 主題: 距離の凸性の代入

CAT(0)空間で二本の測地線分の始点間距離が3、終点間距離が9とする。比率 $2/3$ での距離の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

[距離の凸性](#thm-npcg5-distance-convexity) に $t=2/3$ と両端の距離を代入します。

$$
d(\gamma(2/3),\eta(2/3))\le(1/3)3+(2/3)9=7.
$$

距離の平方ではなく距離そのものの上界です。
<!-- solution-end -->


<a id="ex-npcg5-a03"></a>

### NPCG5-A03 距離の評価と二乗距離の評価

- Level: A
- 目安時間: 10分
- 主題: 補正項の意味

CAT(0)空間で $d(z,x)=d(z,y)=5,d(x,y)=8$ とする。中点までの距離を距離の凸性とCN不等式のそれぞれで評価せよ。

<!-- solution-start -->
#### 詳細解答

[距離関数の凸性](#thm-npcg5-distance-ball) から $d(z,m)\le(5+5)/2=5$ です。一方 [CN不等式](../NPCG4/index.md#thm-npcg4-cn) から

$$
d(z,m)^2\le(25+25)/2-64/4=9.
$$

距離は非負なので $d(z,m)\le3$ です。後者の方が小さい上界を与えます。
<!-- solution-end -->


<a id="ex-npcg5-a04"></a>

### NPCG5-A04 凸関数の判定

- Level: A
- 目安時間: 10分
- 主題: 関数値の定義条件

通常距離の実直線で $f(x)=|x-2|$ が測地線凸関数であることを示せ。$g(x)=-x^2$ について反例を与えよ。

<!-- solution-start -->
#### 詳細解答

[Euclid空間のCAT(0)性](../NPCG3/index.md#thm-npcg3-euclidean) と [測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により直線分で確認します。

$$
\begin{aligned}
f((1-t)x+ty)
&=|(1-t)(x-2)+t(y-2)|\\
&\le(1-t)|x-2|+t|y-2|.
\end{aligned}
$$

任意の $x,y,t$ で成り立つので [測地線凸関数](#def-npcg5-geodesically-convex-function) です。$g$ では $x=-1,y=1,t=1/2$ とすると左辺0、右辺 $(-1-1)/2=-1$ となり、凸性に反します。
<!-- solution-end -->


<a id="ex-npcg5-b01"></a>

### NPCG5-B01 二進分割の三段目

- Level: B
- 目安時間: 18分
- 主題: 中点評価の再帰

連続な $h:[0,1]\to\mathbb R$ が任意の二時刻で中点評価を満たし、$h(0)=2,h(1)=10$ とする。任意比の定理を使わず $h(3/8)$ の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

まず $u=0,v=1$ の中点を取ると $h(1/2)\le(2+10)/2=6$ です。次に $u=0,v=1/2$ とすると $h(1/4)\le(2+6)/2=4$ です。$3/8$ は $1/4,1/2$ の中点なので

$$
h(3/8)\le(h(1/4)+h(1/2))/2\le(4+6)/2=5.
$$

これは [連続な中点凸関数の凸性](#thm-npcg5-midpoint-to-convex) の上界 $(5/8)2+(3/8)10=5$ と一致します。ここでは有限回の評価だけなので連続性はまだ使用していません。
<!-- solution-end -->


<a id="ex-npcg5-b02"></a>

### NPCG5-B02 測地線凸な制約の共通部分

- Level: B
- 目安時間: 18分
- 主題: 集合と関数の凸性

CAT(0)空間で二点 $z_1,z_2$ と実数 $R_1,R_2\ge0$ を固定する。$C=\{x:d(x,z_1)\le R_1,\ d(x,z_2)\le R_2\}$ が測地線凸であることを示せ。さらに $f:X\to\mathbb R$ が測地線凸なら任意の実数 $M$ に対する集合 $\{x:f(x)\le M\}$ も測地線凸であることを示せ。

<!-- solution-start -->
#### 詳細解答

任意の $x,y\in C$ と測地線分 $\gamma$ を取ります。$i=1,2$ ごとに [距離関数の凸性](#thm-npcg5-distance-ball) を適用すると

$$
d(z_i,\gamma(t))\le(1-t)R_i+tR_i=R_i.
$$

両制約を同時に満たすので $\gamma(t)\in C$ です。後半では $f(x),f(y)\le M$ なら [測地線凸関数の定義](#def-npcg5-geodesically-convex-function) より

$$
f(\gamma(t))\le(1-t)f(x)+tf(y)\le M.
$$

任意の二点と時刻で集合に残ります。いずれも空集合の場合は条件を破る二点が存在せず、測地線凸です。
<!-- solution-end -->


<a id="ex-npcg5-b03"></a>

### NPCG5-B03 内分点の安定性

- Level: B
- 目安時間: 18分
- 主題: 二本の経路の評価

CAT(0)空間で $x,y,x',y'$ を取り、$d(x,x')\le\varepsilon,d(y,y')\le\delta$（$\varepsilon,\delta\ge0$）とする。比率 $t$ の内分点間距離を評価せよ。さらに $s,t\in[0,1]$ が異なる場合の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

[測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により二本を $\gamma,\eta$ と一意に選べます。[距離の凸性](#thm-npcg5-distance-convexity) より

$$
d(\gamma(t),\eta(t))\le(1-t)\varepsilon+t\delta.
$$

時刻が異なるなら三角不等式と [測地線分の距離条件](../NPCG2/index.md#def-npcg2-geodesic-segment) により

$$
\begin{aligned}
d(\gamma(t),\eta(s))
&\le d(\gamma(t),\eta(t))+d(\eta(t),\eta(s))\\
&\le(1-t)\varepsilon+t\delta+|t-s|d(x',y').
\end{aligned}
$$

始点・終点のずれと時刻のずれを別々に評価できました。
<!-- solution-end -->


<a id="ex-npcg5-b04"></a>

### NPCG5-B04 凸性だけでは足りない例を再計算

- Level: B
- 目安時間: 18分
- 主題: CN補正と反例

第5節の距離 $d(x,y)=N(x-y)$ で $x=(2,2),y=(-2,-2),z=(2,-2)$ を取る。中点までの距離に対する通常の凸性とCN不等式の成否を計算せよ。

<!-- solution-start -->
#### 詳細解答

[距離の凸性だけではCAT(0)性は従わないという命題](#prop-npcg5-convex-not-cat) の証明から、この距離で測地線分は直線分です。従って中点は $m=(0,0)$ です。$K=\sqrt2+1$ と置くと

$$
d(z,m)=2K,\quad d(x,y)=4K,\quad
d(z,x)=4,\quad d(z,y)=8.
$$

通常の凸性では $2K\le(4+8)/2=6$ です。実際 $\sqrt2\le2$ なので成立します。CN不等式の右辺は

$$
(16+64)/2-(4K)^2/4=40-4K^2.
$$

左辺は $4K^2$ で、差は $8K^2-40=16(\sqrt2-1)>0$ です。CN不等式は破れます。
<!-- solution-end -->


<a id="ex-npcg5-c01"></a>

### NPCG5-C01 距離制約付きの二乗距離最小化

- Level: C
- 目安時間: 35分
- 主題: 凸集合と強い評価の統合

CAT(0)空間で空でない測地線凸集合 $C$ と点 $z_1,\ldots,z_n\in X$（整数 $n\ge1$）、実数 $w_i\ge0$（$\sum_{i=1}^n w_i=1$）を取る。$F(x)=\sum_{i=1}^n w_i d(x,z_i)^2$ とする。(1) $x,y\in C$ を結ぶ測地線分 $\gamma$ に対して $F(\gamma(t))$ を両端の値と距離で評価せよ。(2) $F$ の最小点が存在すれば一意であることを示せ。(3) 二点 $x,y\in C$ が最小値の下限 $I=\inf_{q\in C}F(q)$ からそれぞれ $\varepsilon,\delta\ge0$ 以内にあるなら、$d(x,y)$ の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

(1) [測地線凸集合の定義](#def-npcg5-geodesically-convex-set) から $\gamma(t)\in C$ です。各 $z_i$ に [CN不等式](../NPCG4/index.md#thm-npcg4-cn) と [任意比の二乗距離評価](../NPCG4/index.md#thm-npcg4-cn-interpolation) を適用します。

$$
d(z_i,\gamma(t))^2\le
(1-t)d(z_i,x)^2+td(z_i,y)^2-t(1-t)d(x,y)^2.
$$

$w_i$ は非負なので乗じても不等号は変わりません。総和を取ると

$$
\begin{aligned}
F(\gamma(t))
&\le(1-t)F(x)+tF(y)\\
&\quad-t(1-t)d(x,y)^2\sum_{i=1}^n w_i\\
&=(1-t)F(x)+tF(y)-t(1-t)d(x,y)^2.
\end{aligned}
$$

(2) 二つの最小点 $x,y$ があれば $F(x)=F(y)=I$ です。$F$ は非負で有限値を取り、$C$ は空でないので $I$ は有限です。中点 $m=\gamma(1/2)$ は $C$ に残り、

$$
I\le F(m)\le I-d(x,y)^2/4.
$$

従って $d(x,y)^2\le0$ であり $x=y$ です。存在自体は仮定していることに注意します。

(3) $F(x)\le I+\varepsilon,F(y)\le I+\delta$ から

$$
I\le F(m)\le I+(\varepsilon+\delta)/2-d(x,y)^2/4.
$$

$I$ を引き、移項すると $d(x,y)^2\le2(\varepsilon+\delta)$ です。距離は非負なので

$$
d(x,y)\le\sqrt{2(\varepsilon+\delta)}.
$$

最小点が未発見でも、目的関数が下限に近い二点は互いに近いことが分かります。この評価は最小値の存在を調べる次の段階にも役立ちます。
<!-- solution-end -->


## 7. まとめ

- [測地線凸集合](#def-npcg5-geodesically-convex-set) は経路全体を含み、[測地線凸関数](#def-npcg5-geodesically-convex-function) は経路上で端点値の一次補間以下になります。
- [連続な中点凸関数の凸性](#thm-npcg5-midpoint-to-convex) と共通始点からの比較により、[CAT(0)空間の距離の凸性](#thm-npcg5-distance-convexity) が得られます。
- [距離関数と閉球の測地線凸性](#thm-npcg5-distance-ball) は制約集合の構成に使えます。二乗距離では [任意比の二乗距離評価](../NPCG4/index.md#thm-npcg4-cn-interpolation) の補正項を使うことで最小点の一意性まで導けます。

次講では四点間の距離を組み合わせ、四辺形不等式と等号の意味を調べます。

参考文献：Bridson–Haefliger, [Metric Spaces of Non-Positive Curvature](https://link.springer.com/book/10.1007/978-3-662-12494-9), Part II。
