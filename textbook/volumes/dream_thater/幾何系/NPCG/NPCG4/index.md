# NPCG4 Bruhat–Tits CN不等式と中点一意性

<!-- definition-example-audit: strict -->

前講の [CAT(0)空間](../NPCG3/index.md#def-npcg3-cat-zero) では三角形の辺上の任意の二点を比較しました。しかし、すべての比率について調べる代わりに、まず辺の真ん中だけを調べることはできないでしょうか。

Euclid 平面で二点 $x=(-2,0),y=(2,0)$ の真ん中を $m=(0,0)$ とします。第三点 $z=(0,3)$ から両端までの二乗距離はともに13ですが、真ん中までの二乗距離は9です。差の4は底辺の長さ4の平方の4分の1です。この差を一般の距離空間でも保証すると、最短経路の真ん中が一つに決まり、さらには三角形全体の比較に戻れることを示します。

## 1. 距離で真ん中を定める

座標の平均が使えない空間では、[距離空間](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01) $(X,d)$ の距離関数 $d$ を使い、真ん中を両端からの距離だけで指定します。[測地線分](../NPCG2/index.md#def-npcg2-geodesic-segment) の長さを $D=d(x,y)$ とし、移動距離を時刻とする $\sigma:[0,D]\to X$ を、移動比率を時刻とする $\gamma(t)=\sigma(Dt)$（$t\in[0,1]$）に取り直します。この講ではこの比率の記法を用います。

$$
d(\gamma(s),\gamma(t))=D|s-t|,\qquad
\gamma(0)=x,\quad\gamma(1)=y.
$$

$s=0,1$、$t=1/2$ とすれば、$\gamma(1/2)$ は両端から距離 $D/2$ です。$D=0$ では定数曲線となります。

<a id="def-npcg4-midpoint"></a>

<!-- formal-statement-start -->
> **定義（距離空間の中点）**
>
> 距離空間 $(X,d)$ の二点 $x,y$ に対し、点 $m\in X$ が

$$
d(x,m)=d(y,m)=\frac12d(x,y)
$$

> を満たすとき、$m$ を $x,y$ の中点という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npcg4-midpoint -->
### 例：中点が二つある場合

**定義の確認**

[格子型距離の平面](../NPCG3/index.md#prop-npcg3-l1-counterexample) では、座標差の絶対値の和が距離です。二点 $u=(u_1,u_2),v=(v_1,v_2)$ に対して

$$
d_1(u,v)=|u_1-v_1|+|u_2-v_2|
$$

を用います。候補点から両端までこの距離を計算し、どちらも端点間距離の半分に等しいかを調べれば、中点の定義を直接判定できます。$x=(0,0),y=(2,2)$ とすると $d_1(x,y)=2+2=4$ です。$m=(0,2)$ と $n=(2,0)$ について、

$$
\begin{aligned}
d_1(x,m)&=0+2=2,& d_1(y,m)&=2+0=2,\\
d_1(x,n)&=2+0=2,& d_1(y,n)&=0+2=2.
\end{aligned}
$$

いずれも全長の半分です。従って両方とも中点ですが、$d_1(m,n)=4$ なので異なる点です。中点の条件には座標平均も一意性も含まれていません。
<!-- definition-example-end -->

一般の距離空間では中点の存在自体が保証されません。例えば通常距離を制限した集合 $\{0,2\}$ には、0と2の両方から距離1の点がありません。一方、[測地空間](../NPCG2/index.md#def-npcg2-geodesic-space) なら測地線分の時刻 $1/2$ を取れば必ず存在します。

## 2. Bruhat–Tits CN不等式

中点までの二乗距離について、両端までの二乗距離の平均から底辺長の平方の4分の1を引いた値を上界にします。この評価を [Euclid 比較三角形](../NPCG2/index.md#def-npcg2-comparison-triangle) から導きます。元の空間の点に対応する平面上の点は上に横線を付け、平面の通常距離を $d_2$ と書きます。辺の比率 $t$ に対応する比較点は、両端の比較点を同じ比率で内分した点です。

<a id="thm-npcg4-cn"></a>

<!-- formal-statement-start -->
> **定理（Bruhat–Tits CN不等式）**
>
> CAT(0)空間 $(X,d)$ の任意の三点 $x,y,z$ と、$x,y$ の任意の中点 $m$ に対し、

$$
d(z,m)^2\le
\frac{d(z,x)^2+d(z,y)^2}{2}-\frac{d(x,y)^2}{4}
$$

> が成立する。
<!-- formal-statement-end -->

鍵は、[CAT(0)条件](../NPCG3/index.md#def-npcg3-cat-zero) で中点と第三頂点を比較し、[比較点への二乗距離公式](../NPCG2/index.md#thm-npcg2-comparison-point-distance) の比率を $1/2$ にすることです。任意の中点について主張するため、選んだ測地線分上の中点と一致することも確認します。

<!-- proof-start -->
### 証明

$D=d(x,y)$ とし、[CAT(0)空間の定義](../NPCG3/index.md#def-npcg3-cat-zero) に含まれる [測地空間の条件](../NPCG2/index.md#def-npcg2-geodesic-space) から一本の測地線分 $\gamma:[0,1]\to X$ を選びます。$\gamma(0)=x,\gamma(1)=y$ であり、距離は

$$
d(\gamma(s),\gamma(t))=D|s-t|
$$

です。$p=\gamma(1/2)$ とします。$D=0$ なら中点の定義から $m=x=y=p$ です。

$D>0$ の場合、三頂点 $x,y,m$ の比較三角形は、[中点の定義](#def-npcg4-midpoint) から辺長が $D,D/2,D/2$ です。平面に $\bar x=(0,0),\bar y=(D,0),\bar m=(D/2,0)$ と置けば三辺長が一致します。残りの二辺 $xm,my$ についても測地空間の条件から測地線分を選べます。[比較点の定義](../NPCG2/index.md#def-npcg2-comparison-triangle) により、

$$
\bar p=\tfrac12\bar x+\tfrac12\bar y=(D/2,0)=\bar m.
$$

[CAT(0)条件](../NPCG3/index.md#def-npcg3-cat-zero) をこの三角形の頂点 $m$ と辺上の $p$ に適用すると

$$
0\le d(m,p)\le d_2(\bar m,\bar p)=0.
$$

[距離の分離条件](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01) により $m=p$ です。

次に三頂点 $x,y,z$ の [比較三角形の存在と合同性](../NPCG2/index.md#thm-npcg2-comparison-existence) により比較三角形を取ります。辺 $xy$ には先ほどの $\gamma$ を選びます。[CAT(0)条件](../NPCG3/index.md#def-npcg3-cat-zero) により、両辺が非負であることに注意して平方すると

$$
d(z,m)^2\le d_2(\bar z,\bar p)^2.
$$

[比較点への二乗距離公式](../NPCG2/index.md#thm-npcg2-comparison-point-distance) に $t=1/2$ を代入すると

$$
\begin{aligned}
d_2(\bar z,\bar p)^2
&=(1-1/2)d(z,x)^2+(1/2)d(z,y)^2\\
&\quad-(1/2)(1-1/2)D^2\\
&=\frac{d(z,x)^2+d(z,y)^2}{2}-\frac{D^2}{4}.
\end{aligned}
$$

これを上の不等式に代入して結論を得ます。$D=0$ の場合も式は等号で成立します。
<!-- proof-end -->

### 2.1 平面と木で中点距離を比べる

Euclid 空間では [Euclid空間のCAT(0)性](../NPCG3/index.md#thm-npcg3-euclidean) により比較が等号となります。冒頭の例では $13-16/4=9$ です。

一方、長さ1の三本の枝が一点 $o$ で交わる [有限距離木](../NPCG3/index.md#def-npcg3-finite-metric-tree) の三先端を $x,y,z$ とします。[有限距離木の三枝構造](../NPCG3/index.md#thm-npcg3-tree-tripod) により中点は $o$ で、先端同士の距離は2です。[有限距離木のCAT(0)性](../NPCG3/index.md#thm-npcg3-tree-cat-zero) によって CN 不等式を適用でき、

$$
d(z,o)^2=1<\frac{4+4}{2}-\frac44=3.
$$

平面よりも真ん中に近づく場合があります。

## 3. 中点と測地線分が一つに決まる仕組み

ここからは CAT(0) 性を先に仮定せず、すべての端点の組・すべての中点・すべての第三点について [CN不等式](#thm-npcg4-cn) が成り立つことだけを仮定します。中点が存在しない組については、この全称条件だけでは存在を保証しません。この仮定だけで中点を比較できます。二つ目の中点を第三点に指定すると、上界の二項がちょうど打ち消し合います。

<a id="thm-npcg4-unique-midpoint"></a>

<!-- formal-statement-start -->
> **定理（CN条件による中点一意性）**
>
> 距離空間 $(X,d)$ で、任意の二点 $x,y$ の任意の中点 $m$ と任意の $z\in X$ について

$$
d(z,m)^2\le
\frac{d(z,x)^2+d(z,y)^2}{2}-\frac{d(x,y)^2}{4}
$$

> が成立すると仮定する。このとき任意の二点の中点は高々一つである。さらに $X$ が測地空間なら中点は必ず一つ存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二点 $x,y$ の中点を $m,n$ とします。$D=d(x,y)$ と書くと、[中点の定義](#def-npcg4-midpoint) から $d(n,x)=d(n,y)=D/2$ です。仮定の $z$ に $n$ を代入すると、

$$
\begin{aligned}
0\le d(n,m)^2
&\le \frac{(D/2)^2+(D/2)^2}{2}-\frac{D^2}{4}\\
&=\frac{D^2}{4}-\frac{D^2}{4}=0.
\end{aligned}
$$

従って $d(n,m)=0$ なので $n=m$ です。測地空間では時刻 $1/2$ の点が中点なので存在も従います。
<!-- proof-end -->

最短経路が二本あっても真ん中は一致し、次に左右半分の真ん中が一致します。この操作を繰り返すと全時刻で一致します。以下では二進分割点、すなわち $k/2^j$（$j$ は非負整数、$k$ は0から $2^j$ までの整数）を用います。

<a id="thm-npcg4-unique-geodesic"></a>

<!-- formal-statement-start -->
> **定理（中点一意性から測地線分一意性）**
>
> 測地空間 $(X,d)$ の任意の二点の中点が一意なら、任意の二点を結ぶ定速の測地線分は一意である。特に CAT(0)空間では測地線分が一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

同じ端点 $x,y$ を結ぶ二本の測地線分 $\gamma,\eta:[0,1]\to X$ を取ります。$D=d(x,y)$ とします。$j=0$ の二進分割点は0と1だけなので一致します。

ある $j$ で全分割点において一致すると仮定します。次の分割の偶数番号の点は既に一致しています。奇数番号 $2k+1$（$0\le k<2^j$）の時刻は

$$
u=\frac{k}{2^j},\qquad v=\frac{k+1}{2^j},\qquad
w=\frac{u+v}{2}=\frac{2k+1}{2^{j+1}}
$$

の $w$ です。[測地線分の定義](../NPCG2/index.md#def-npcg2-geodesic-segment) から

$$
d(\gamma(u),\gamma(w))=d(\gamma(v),\gamma(w))
=\frac{D(v-u)}{2}.
$$

端点間距離は $D(v-u)$ なので $\gamma(w)$ はその中点です。もう一方についても

$$
d(\eta(u),\eta(w))=d(\eta(v),\eta(w))
=\frac{D(v-u)}2,\qquad d(\eta(u),\eta(v))=D(v-u).
$$

従って $\eta(w)$ も中点であり、帰納法の仮定から両端点は共通です。中点の一意性で $\gamma(w)=\eta(w)$ となります。

従ってすべての二進分割点で一致します。任意の $t\in[0,1]$ について、$k_j=\lfloor 2^jt\rfloor$（床関数は $2^jt$ 以下の最大整数）とし、$t_j=k_j/2^j$ とします。$0\le t-t_j<2^{-j}$ です。三角不等式から

$$
\begin{aligned}
d(\gamma(t),\eta(t))
&\le d(\gamma(t),\gamma(t_j))+d(\gamma(t_j),\eta(t_j))\\
&\quad+d(\eta(t_j),\eta(t))\\
&=2D|t-t_j|\le 2D\,2^{-j}.
\end{aligned}
$$

$j\to\infty$ で右辺は0なので二点は一致します。すべての $t$ で一致するため、写像として同じ測地線分です。$D=0$ でもこの計算は成立します。CAT(0)空間については [CN不等式](#thm-npcg4-cn) と [中点一意性](#thm-npcg4-unique-midpoint) を順に適用します。
<!-- proof-end -->

完備性を仮定していないことに注意してください。近似しているのは既に存在する測地線分上の点であり、空間の外から新しい極限点を付け加える操作ではありません。

## 4. 中点の条件から三角形全体へ戻る

今度は測地空間で CN 不等式がすべての中点・第三点に成立することを仮定します。この仮定から CAT(0)条件を導きます。まず頂点から辺の任意の点までの評価を作り、次に二辺上の点の比較へ進みます。

<a id="thm-npcg4-cn-interpolation"></a>

<!-- formal-statement-start -->
> **定理（CN条件から任意比の二乗距離評価）**
>
> 測地空間 $(X,d)$ で、任意の $x,y,z$ と $x,y$ の任意の中点 $m$ に対して Bruhat–Tits CN不等式が成立すると仮定する。任意の測地線分 $\gamma:[0,1]\to X$ の端点を $x=\gamma(0),y=\gamma(1)$ とする。このとき任意の $z\in X$ と $t\in[0,1]$ に対して

$$
d(z,\gamma(t))^2\le
(1-t)d(z,x)^2+td(z,y)^2-t(1-t)d(x,y)^2
$$

> が成立する。
<!-- formal-statement-end -->

中点の評価を繰り返すと二進分割点での評価になります。二乗距離から底辺長に応じた二次式を引くと、中点での補正項が消え、端点を結ぶ一次式で上から抑えられます。

<!-- proof-start -->
### 証明

$D=d(x,y)$、$f(t)=d(z,\gamma(t))^2$ と置きます。$0\le u\le v\le1$ に対して $w=(u+v)/2$ とすると、[測地線分の定義](../NPCG2/index.md#def-npcg2-geodesic-segment) により

$$
\begin{aligned}
d(\gamma(u),\gamma(v))&=D(v-u),\\
d(\gamma(u),\gamma(w))&=d(\gamma(v),\gamma(w))
=\tfrac12D(v-u).
\end{aligned}
$$

従って [中点の定義](#def-npcg4-midpoint) を満たします。CN の仮定をこれらの点と第三点 $z$ に適用すると

$$
f(w)\le\frac{f(u)+f(v)}2-\frac{D^2(v-u)^2}{4}.
$$

ここで $g(t)=f(t)-D^2t^2$ と置きます。次の平方展開によって補正項をまとめられます。

$$
w^2+\frac{(v-u)^2}{4}
=\frac{(u+v)^2+(v-u)^2}{4}
=\frac{u^2+v^2}{2}.
$$

従って、

$$
\begin{aligned}
g(w)
&\le \frac{f(u)+f(v)}2-D^2\left(w^2+\frac{(v-u)^2}{4}\right)\\
&=\frac{f(u)-D^2u^2+f(v)-D^2v^2}{2}\\
&=\frac{g(u)+g(v)}2.
\end{aligned}
$$

一次式 $L(t)=(1-t)g(0)+tg(1)$ を置きます。端点で $g=L$ です。第 $j$ 段階の全分割点 $k/2^j$ で $g\le L$ が成立していると仮定します。隣接点 $u=k/2^j$、$v=(k+1)/2^j$ の真ん中 $w=(2k+1)/2^{j+1}$ では

$$
g(w)\le\frac{g(u)+g(v)}2
\le\frac{L(u)+L(v)}2=L(w).
$$

前段階の点も残るので数学的帰納法により、すべての二進分割点で $g\le L$ です。

任意の $t$ に対し前節と同じ $t_j=\lfloor 2^jt\rfloor/2^j$ を取ります。$|t_j-t|<2^{-j}$ です。[距離の三角不等式](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01) を、$z,\gamma(t),\gamma(t_j)$ の二通りの順序で適用すると

$$
|d(z,\gamma(t_j))-d(z,\gamma(t))|
\le d(\gamma(t_j),\gamma(t))=D|t_j-t|.
$$

右辺は0に近づきます。従って距離の値が収束し、その平方も収束します。$t_j^2\to t^2$ だから $g(t_j)\to g(t)$ です。一次式も $L(t_j)\to L(t)$ なので不等式を極限に移して $g(t)\le L(t)$ となります。

定義を戻すと

$$
\begin{aligned}
f(t)-D^2t^2
&\le (1-t)f(0)+t(f(1)-D^2),\\
f(t)&\le(1-t)f(0)+tf(1)-D^2t(1-t).
\end{aligned}
$$

これが目的の式です。距離による連続性のみを用い、完備性は用いていません。
<!-- proof-end -->

例えば端点間距離6、第三点から両端までの距離が5と7であれば、比率 $1/3$ の点までの二乗距離は

$$
\frac23\cdot25+\frac13\cdot49-\frac29\cdot36=25
$$

以下です。比較三角形を描かずに上界を計算できます。

<a id="thm-npcg4-cn-equivalence"></a>

<!-- formal-statement-start -->
> **定理（CAT(0)条件とCN条件の同値性）**
>
> 空でない測地空間 $(X,d)$ が CAT(0)空間であるための必要十分条件は、任意の三点 $x,y,z$ と $x,y$ の任意の中点 $m$ に対して

$$
d(z,m)^2\le
\frac{d(z,x)^2+d(z,y)^2}{2}-\frac{d(x,y)^2}{4}
$$

> が成立することである。
<!-- formal-statement-end -->

一つの頂点から反対側の辺への評価を二回用いると、二つの辺上の任意の点までの距離を評価できます。これにより中点の条件が全三角形の比較条件に十分であることが分かります。

<!-- proof-start -->
### 証明

必要性は [Bruhat–Tits CN不等式](#thm-npcg4-cn) です。十分性を示します。仮定から [任意比の二乗距離評価](#thm-npcg4-cn-interpolation) が利用できます。

任意の測地三角形と辺上の二点を取ります。同じ辺に指定されていれば、[測地線分の距離条件](../NPCG2/index.md#def-npcg2-geodesic-segment) から、辺長を $D$、二点の比率を $s,t$ として元の距離は $D|s-t|$ です。比較側も長さ $D$ の直線分上で同じ比率を取るため一致します。

異なる辺に指定された点では、共通頂点を $x$ として辺 $xy,xz$ 上の点をそれぞれ $p,q$ と書きます。$x$ からの比率を $s,t\in[0,1]$、三辺長を $B=d(x,y),C=d(x,z),E=d(y,z)$ とします。辺 $xy$ に第三点 $q$ を指定して任意比の評価を適用すると

$$
d(p,q)^2\le (1-s)d(x,q)^2+s d(y,q)^2-s(1-s)B^2.
$$

測地線分上なので $d(x,q)=tC$ です。今度は辺 $xz$ に第三点 $y$ を指定して [任意比の二乗距離評価](#thm-npcg4-cn-interpolation) を適用すると

$$
d(y,q)^2\le(1-t)B^2+tE^2-t(1-t)C^2.
$$

$s\ge0$ なので代入しても不等号の向きは変わりません。

$$
\begin{aligned}
d(p,q)^2
&\le (1-s)t^2C^2+s(1-t)B^2+stE^2\\
&\quad-st(1-t)C^2-s(1-s)B^2\\
&=(s^2-st)B^2+(t^2-st)C^2+stE^2\\
&=s^2B^2+t^2C^2-st(B^2+C^2-E^2).
\end{aligned}
$$

$B^2$ の係数は $s(1-t)-s(1-s)=s^2-st$、$C^2$ の係数は $(1-s)t^2-st(1-t)=t^2-st$ です。

[Euclid空間のCAT(0)性の証明で得た二辺上の距離式](../NPCG3/index.md#thm-npcg3-euclidean) を平面の比較三角形に適用すると、最後の式は $d_2(\bar p,\bar q)^2$ です。双方の距離が非負なので平方根を取れば

$$
d(p,q)\le d_2(\bar p,\bar q).
$$

辺長で割っていないため頂点の重複・退化も含みます。任意の測地三角形と任意の点の選択で示したので、[CAT(0)空間の定義](../NPCG3/index.md#def-npcg3-cat-zero) が成立します。
<!-- proof-end -->

CN 条件を使って空間を判定する場合、第三点と中点の全称量化を忘れてはいけません。格子型距離の例で $z=n$ とすれば、左辺は16ですが、右辺は $4-4=0$ です。また測地空間であるという仮定がないと、中点の存在が保証されず、不等式を調べる対象そのものがなくなる場合があります。

## 5. 演習

<a id="ex-npcg4-a01"></a>

### NPCG4-A01 平面の中点評価

- Level: A
- 目安時間: 8分
- 主題: CN不等式の等号

通常距離の平面で $x=(0,0),y=(8,0),z=(3,4)$ とする。中点の両距離条件を確認し、CN不等式の両辺を計算せよ。

<!-- solution-start -->
#### 詳細解答

通常距離では座標差の平方和の平方根を取ります。$m=(4,0)$ とすると

$$
d(x,y)=8,\qquad d(x,m)=\sqrt{4^2+0^2}=4,\qquad
d(y,m)=\sqrt{(-4)^2+0^2}=4.
$$

従って [中点の定義](#def-npcg4-midpoint) を満たします。各平方は

$$
d(z,x)^2=3^2+4^2=25,\quad d(z,y)^2=5^2+4^2=41.
$$

[CN不等式](#thm-npcg4-cn) の右辺は $(25+41)/2-64/4=17$ です。左辺は $(3-4)^2+4^2=17$ で等号となります。
<!-- solution-end -->

<a id="ex-npcg4-a02"></a>

### NPCG4-A02 中点の上界

- Level: A
- 目安時間: 8分
- 主題: 距離の平方と上界

CAT(0)空間で $d(x,y)=10,d(z,x)=6,d(z,y)=8$ とする。中点 $m$ までの距離の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

[CN不等式](#thm-npcg4-cn) に三辺長を代入すると

$$
d(z,m)^2\le\frac{36+64}{2}-\frac{100}{4}=50-25=25.
$$

距離は非負なので $d(z,m)\le5$ です。上界25は距離の平方に対する値であり、距離そのものではありません。
<!-- solution-end -->

<a id="ex-npcg4-a03"></a>

### NPCG4-A03 CN条件の反例

- Level: A
- 目安時間: 10分
- 主題: 全称量化

格子型距離 $d_1$ の平面で $x=(0,0),y=(3,1),m=(2,0),z=(1,1)$ とする。$m,z$ が中点であることを確かめ、CN条件の成否を判定せよ。

<!-- solution-start -->
#### 詳細解答

$d_1(x,y)=3+1=4$ です。$m$ は $x$ から2、$y$ から $1+1=2$ です。$z$ は $x$ から $1+1=2$、$y$ から2です。よって両方とも [中点](#def-npcg4-midpoint) です。

$$
d_1(z,m)^2=(1+1)^2=4,\qquad
\frac{2^2+2^2}{2}-\frac{4^2}{4}=0.
$$

左辺が右辺より大きいため、CN条件は成立しません。
<!-- solution-end -->

<a id="ex-npcg4-a04"></a>

### NPCG4-A04 比率4分の1の評価

- Level: A
- 目安時間: 10分
- 主題: 任意比への代入

CAT(0)空間で $d(x,y)=8,d(z,x)=5,d(z,y)=7$ とする。辺 $xy$ の比率 $1/4$ の点 $p$ までの二乗距離の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

[CN不等式](#thm-npcg4-cn) により [任意比の二乗距離評価](#thm-npcg4-cn-interpolation) の仮定が成立します。$t=1/4$、$D=8$ を代入すると

$$
\begin{aligned}
d(z,p)^2&\le \frac34\cdot25+\frac14\cdot49-\frac3{16}\cdot64\\
&=\frac{75+49}{4}-12=31-12=19.
\end{aligned}
$$

距離の上界は $\sqrt{19}$ です。
<!-- solution-end -->

<a id="ex-npcg4-b01"></a>

### NPCG4-B01 二回の中点操作で評価する

- Level: B
- 目安時間: 15分
- 主題: 二進分割の係数

CAT(0)空間で $A=d(z,x)^2,B=d(z,y)^2,D=d(x,y)$ とする。辺 $xy$ の中点 $m$ と辺の前半の中点 $p$ について、任意比の定理を使わず CN不等式を二回適用して $d(z,p)^2$ の上界を導け。

<!-- solution-start -->
#### 詳細解答

一回目は端点 $x,y$、第三点 $z$ で [CN不等式](#thm-npcg4-cn) を適用します。

$$
d(z,m)^2\le(A+B)/2-D^2/4.
$$

次に端点 $x,m$ を取ると、$d(x,m)=D/2$ です。$p$ はその中点なので二回目の [CN不等式](#thm-npcg4-cn) を適用すると

$$
\begin{aligned}
d(z,p)^2
&\le\frac{A+d(z,m)^2}{2}-\frac{(D/2)^2}{4}\\
&\le\frac A2+\frac{A+B}{4}-\frac{D^2}{8}-\frac{D^2}{16}\\
&=\frac34 A+\frac14 B-\frac3{16}D^2.
\end{aligned}
$$

この係数は $t=1/4$ の [任意比の評価](#thm-npcg4-cn-interpolation) と一致します。
<!-- solution-end -->

<a id="ex-npcg4-b02"></a>

### NPCG4-B02 近い中点の安定性

- Level: B
- 目安時間: 15分
- 主題: 中点からのずれ

CAT(0)空間の $x,y$ の中点を $m$、$D=d(x,y)$ とする。$\varepsilon\ge0$ とし、$n$ が $d(n,x)\le D/2+\varepsilon$ および $d(n,y)\le D/2+\varepsilon$ を満たすとする。$d(m,n)$ の上界を $D,\varepsilon$ で求めよ。

<!-- solution-start -->
#### 詳細解答

[CN不等式](#thm-npcg4-cn) の第三点に $n$ を入れます。各距離と上界は非負なので平方して代入できます。

$$
\begin{aligned}
d(n,m)^2
&\le\frac{d(n,x)^2+d(n,y)^2}{2}-D^2/4\\
&\le(D/2+\varepsilon)^2-D^2/4\\
&=D\varepsilon+\varepsilon^2.
\end{aligned}
$$

従って $d(m,n)\le\sqrt{D\varepsilon+\varepsilon^2}$ です。$\varepsilon=0$ なら $d(m,n)=0$ となり、中点一意性の計算を含んでいます。
<!-- solution-end -->

<a id="ex-npcg4-b03"></a>

### NPCG4-B03 測地空間の仮定は必要か

- Level: B
- 目安時間: 15分
- 主題: 存在と一意性の区別

通常距離を制限した $X=\{0,2\}$ について、存在する中点すべてに CN不等式が成立することを示し、それでも CAT(0)空間でない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

異なる二点0,2の中点は両端から距離1でなければならず、$X$ には存在しません。同一点 $x=y$ の場合、[中点の定義](#def-npcg4-midpoint) から $m=x$ だけが中点です。任意の $z\in X$ に対して右辺は

$$
\frac{d(z,x)^2+d(z,x)^2}{2}-0=d(z,x)^2=d(z,m)^2.
$$

従って存在するすべての中点について等号が成立します。しかし0,2を結ぶ測地線分があれば時刻 $1/2$ に中点が存在するはずです。矛盾するので [測地空間の定義](../NPCG2/index.md#def-npcg2-geodesic-space) を満たさず、[CAT(0)条件](../NPCG3/index.md#def-npcg3-cat-zero) の前提を欠きます。
<!-- solution-end -->

<a id="ex-npcg4-b04"></a>

### NPCG4-B04 二辺上の点を評価する

- Level: B
- 目安時間: 15分
- 主題: 任意比の評価の二重適用

CAT(0)空間で $d(x,y)=6,d(x,z)=8,d(y,z)=10$ とする。$p$ は辺 $xy$ の比率 $1/3$、$q$ は辺 $xz$ の比率 $1/2$ の点とする。任意比の評価を二回適用し、$d(p,q)^2$ の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

[CN不等式](#thm-npcg4-cn) により [任意比の二乗距離評価](#thm-npcg4-cn-interpolation) を使えます。まず辺 $xz$ と第三点 $y$ について

$$
d(y,q)^2\le\frac12\cdot36+\frac12\cdot100-\frac14\cdot64=52.
$$

$d(x,q)=8/2=4$ です。次に辺 $xy$ と第三点 $q$ について

$$
\begin{aligned}
d(p,q)^2
&\le\frac23\cdot16+\frac13d(y,q)^2-\frac29\cdot36\\
&\le\frac{32+52}{3}-8=28-8=20.
\end{aligned}
$$

従って $d(p,q)\le\sqrt{20}$ です。比較三角形を $(0,0),(6,0),(0,8)$ と置くと比較点は $(2,0),(0,4)$ で距離の平方は20、同じ上界となります。
<!-- solution-end -->

<a id="ex-npcg4-c01"></a>

### NPCG4-C01 一つの良い中点からCAT(0)性へ

- Level: C
- 目安時間: 30分
- 主題: CN条件の量化を弱める

空でない測地空間で、任意の二点 $x,y$ に対して少なくとも一つの中点 $m$ が存在し、その同じ $m$ について任意の第三点 $z$ で CN不等式が成立すると仮定する。他の中点については何も仮定しない。この空間が CAT(0)空間であることを示せ。さらに、中点を選ぶ順序を「第三点 $z$ ごとに中点を選んでよい」に変えた場合、格子型距離の平面で $x=(0,0),y=(1,1)$ について中点全体を求め、$z=(0,1)$ だけで元の仮定の否定を示せるか説明せよ。

<!-- solution-start -->
#### 詳細解答

任意の二点 $x,y$ を固定し、仮定で保証された一つの中点 $m$ を選びます。別の任意の中点を $n$ とします。$D=d(x,y)$ なら [中点の定義](#def-npcg4-midpoint) から $d(n,x)=d(n,y)=D/2$ です。

選んだ $m$ はすべての第三点に対して評価を満たすので、第三点に $n$ を指定すると

$$
0\le d(n,m)^2\le\frac{D^2/4+D^2/4}{2}-D^2/4=0.
$$

従って $n=m$ であり、全中点は選んだ中点に一致します。二点の選択も任意だったので、任意の二点の任意の中点と任意の第三点に対して CN不等式が成立します。測地空間と空でないことは初めから仮定しているので、[CAT(0)条件とCN条件の同値性](#thm-npcg4-cn-equivalence) を適用でき、CAT(0)空間です。

後半では $n=(a,b)$ とすると、中点条件は

$$
|a|+|b|=1,\qquad |1-a|+|1-b|=1.
$$

二式を足すと $|a|+|1-a|+|b|+|1-b|=2$ です。実数 $c$ について

$$
|c|+|1-c|=
\begin{cases}
1-2c&c<0,\\
1&0\le c\le1,\\
2c-1&c>1
\end{cases}
$$

です。従って $c=a,b$ のそれぞれで1以上となり、1になるのは座標が $[0,1]$ 内にある場合だけです。二つの和が2なので、どちらも1でなければなりません。従って $a,b\in[0,1]$ で $a+b=1$ です。逆にこれを満たせば二つの距離はともに1です。中点全体は $n=(a,1-a)$（$0\le a\le1$）です。

第三点 $z=(0,1)$ では CN の右辺は $(1^2+1^2)/2-2^2/4=0$ です。ここで $m=z$ を選べば左辺も0となるため、この一つの第三点については評価を満たす中点が存在します。従って一つの $z$ だけでは「各 $z$ に対し中点が存在する」という弱い条件の否定にはなりません。また元の仮定でもこの一つの $z$ だけなら候補 $m=z$ が残ります。

しかし第三点を $z'=(1,0)$ に変えると右辺は再び0であり、評価を満たすには $m=z'$ でなければなりません。同じ中点が両方に一致することは不可能なので、元の仮定は破れます。この計算は弱い条件の全体の成否までは主張していません。
<!-- solution-end -->

## 6. まとめ

- CAT(0)条件から [CN不等式](#thm-npcg4-cn) が得られ、二つ目の中点を第三点に指定することで [中点一意性](#thm-npcg4-unique-midpoint) を得ます。
- 中点の一意性を二進分割で繰り返せば [測地線分の一意性](#thm-npcg4-unique-geodesic) が得られます。
- [任意比の二乗距離評価](#thm-npcg4-cn-interpolation) を二辺に適用すると [CAT(0)条件とCN条件の同値性](#thm-npcg4-cn-equivalence) が示せます。

次講では、二乗距離の評価から距離そのものの凸性へ進み、二つの測地線分の途中の点が互いにどれだけ離れるかを調べます。
