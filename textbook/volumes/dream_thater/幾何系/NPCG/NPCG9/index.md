# NPCG9 等長群作用・有限群固定点・不変凸集合

<!-- definition-example-audit: strict -->

前講の[有限加重重心](../NPCG8/index.md#def-npcg8-weighted-barycenter)は、足し算がない空間でも点の集まりから一つの代表点を選びました。今度は空間の対称性を利用します。例えば正三角形を回転させると頂点は移動しますが、中心は動きません。距離木のように座標を持たない空間でも、すべての対称操作で動かない点を得られるでしょうか。

## 1. 距離を保つ操作を群にする

[群](../../../代数系/GRP/GRP1/index.md#def-grp1-group)の元を、点を移す操作として使います。[群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)では、単位元 $e$ が何も変えず、積 $gh$ の作用が $h$、次いで $g$ の作用と一致します。点 $x$ を $g$ で移した点を $g\cdot x$ と書きます。

距離空間で距離まで保つ作用を考えます。ここで等長とは、移す前後の二点間距離が等しいことです。

<a id="def-npcg9-isometric-action"></a>

<!-- formal-statement-start -->
> **定義（等長群作用）**
>
> 群 $G$ が距離空間 $(X,d)$ に作用しているとする。任意の $g\in G$ と任意の $x,y\in X$ について

$$
d(g\cdot x,g\cdot y)=d(x,y)
$$

> が成立するとき、この作用を等長群作用という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npcg9-isometric-action -->
### 例：実直線の鏡映

**定義の確認**

通常距離の実直線 $X=\mathbb R$ と二元群 $G=\{e,s\}$（$s^2=e$）を取り、$e\cdot x=x$、$s\cdot x=2-x$ とします。単位元条件は定義どおりです。積に $e$ を含む場合は恒等写像との合成なので成立し、残りの場合も

$$
s\cdot(s\cdot x)=2-(2-x)=x=e\cdot x
$$

です。従って群作用です。$g=e$ では距離は変わらず、$g=s$ でも

$$
|s\cdot x-s\cdot y|
=|(2-x)-(2-y)|=|y-x|=|x-y|.
$$

よって等長群作用です。
<!-- definition-example-end -->

任意の群作用で、写像 $x\mapsto g\cdot x$ の逆写像は $x\mapsto g^{-1}\cdot x$ です。実際、群作用の積の条件から

$$
g^{-1}\cdot(g\cdot x)=(g^{-1}g)\cdot x=x,
$$

$$
g\cdot(g^{-1}\cdot x)=(gg^{-1})\cdot x=x.
$$

従って等長群作用の各操作は距離を保つ全単射です。像の集合が元の空間全体になることは、この逆元によって保証されます。

## 2. 動かない点と動かしても変わらない集合

一点がすべての操作で動かないことと、集合が全体として変わらないことは別です。集合の中の点を互いに交換しても、集合自体は変化しません。

<a id="def-npcg9-common-fixed-set"></a>

<!-- formal-statement-start -->
> **定義（共通固定点集合と不変集合）**
>
> 群 $G$ が集合 $X$ に作用するとする。すべての $g\in G$ について $g\cdot x=x$ を満たす $x\in X$ を共通固定点と呼び、その全体を

$$
\operatorname{Fix}(G)=\{x\in X:\forall g\in G,\ g\cdot x=x\}
$$

> と書く。部分集合 $C\subseteq X$ に対して像 $gC=\{g\cdot x:x\in C\}$ とする。すべての $g\in G$ に対して $gC=C$ なら $C$ を $G$ の作用に関する不変集合という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npcg9-common-fixed-set -->
### 例：鏡映で点と区間を区別する

**定義の確認**

第1節の鏡映で $s\cdot x=x$ は $2-x=x$、すなわち $x=1$ と同値です。$e$ はすべての点を固定するので、共通固定点集合は $\{1\}$ です。

一方 $C=[0,2]$ とすると、$x\in C$ なら $0\le 2-x\le 2$ なので $sC\subseteq C$ です。任意の $y\in C$ に対し $x=2-y\in C$ を取れば $s\cdot x=y$ となるので $C\subseteq sC$ も成立します。$eC=C$ でもあるため $C$ は不変です。しかし $s\cdot0=2$ であり、$C$ の各点が固定されるわけではありません。
<!-- definition-example-end -->

一般にすべての $g$ について $gC\subseteq C$ が示せれば、不変性まで従います。$g^{-1}C\subseteq C$ に $g$ を作用させると、$C\subseteq gC$ が得られるからです。

一点 $x$ から群の元をすべて作用させて得る集合を[群作用の軌道](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer)といい、

$$
Gx=\{g\cdot x:g\in G\}
$$

と書きます。鏡映で $x=4$ なら軌道は $\{4,-2\}$ です。軌道は不変です。任意の $h\in G$ について $hGx=\{(hg)\cdot x:g\in G\}$ であり、$g\mapsto hg$ は逆写像 $k\mapsto h^{-1}k$ を持つので、$hg$ はちょうど $G$ 全体を動きます。

## 3. 対称性のある点の集まりを平均する

ここからは [CAT(0)空間](../NPCG3/index.md#def-npcg3-cat-zero) を扱います。完備とはすべてのCauchy列が空間内に収束することです（[完備距離空間](../../../基礎科目/F0/F0-00D/index.md#def-f0-00d-02)）。

重心を求めてから操作する場合と、すべての観測点を操作してから重心を求める場合を比較します。両者が一致する性質を重心の等変性と呼びます。

<a id="thm-npcg9-barycenter-equivariance"></a>

<!-- formal-statement-start -->
> **定理（重心の等変性）**
>
> 空でない完備CAT(0)空間 $(X,d)$ に群 $G$ が等長に作用するとする。整数 $n\ge1$、点 $x_1,\ldots,x_n\in X$、非負で総和1の重み $w_1,\ldots,w_n$ に対し、その有限加重重心を $b$ とする。任意の $h\in G$ について、点 $h\cdot x_i$ と同じ重み $w_i$ の有限加重重心は $h\cdot b$ である。
<!-- formal-statement-end -->

距離を保つので二乗距離の加重和も保たれます。[重心の存在と一意性](../NPCG8/index.md#thm-npcg8-barycenter-existence)によって、移動後の最小点が一つに決まることが鍵です。

<!-- proof-start -->
### 証明

移動前と移動後の目的関数をそれぞれ

$$
F(z)=\sum_{i=1}^n w_i d(z,x_i)^2,
\qquad
F_h(z)=\sum_{i=1}^n w_i d(z,h\cdot x_i)^2
$$

とします。任意の $z\in X$ に対して、等長性を操作 $h^{-1}$ に適用すると

$$
\begin{aligned}
F_h(z)
&=\sum_i w_i d(h^{-1}\cdot z,x_i)^2\\
&=F(h^{-1}\cdot z).
\end{aligned}
$$

$b$ の最小性より $F(h^{-1}\cdot z)\ge F(b)$ です。一方

$$
F_h(h\cdot b)=F(h^{-1}\cdot(h\cdot b))=F(b).
$$

よって $h\cdot b$ は移動後の目的関数の最小点です。重みは変わらず非負で総和1であり、空間は完備CAT(0)なので [有限加重重心の存在と一意性](../NPCG8/index.md#thm-npcg8-barycenter-existence) が適用でき、これが唯一の重心です。
<!-- proof-end -->

例えば実直線上の観測点 $0,4$ に重み $1/4,3/4$ を与えると、[重心の計算例](../NPCG8/index.md#def-npcg8-weighted-barycenter)から $b=3$ です。鏡映 $s\cdot x=2-x$ の後では点は $2,-2$ となり、目的関数は

$$
\tfrac14(z-2)^2+\tfrac34(z+2)^2=(z+1)^2+3.
$$

重心は $-1=2-3=s\cdot b$ です。

## 4. 有限群なら共通固定点が存在する

群が有限なら、一点から各操作で得られる点をすべて並べて等重みを与えられます。操作を一つ追加しても並べ方が変わるだけなので、重心は動きません。

<a id="thm-npcg9-finite-group-fixed-point"></a>

<!-- formal-statement-start -->
> **定理（有限群の共通固定点定理）**
>
> 空でない完備CAT(0)空間 $(X,d)$ に有限群 $G$ が等長に作用するとする。このとき $\operatorname{Fix}(G)\ne\varnothing$ である。任意の $x\in X$ に対し、各 $g\in G$ に対応する点 $g\cdot x$ を重み $1/|G|$ で並べた有限加重重心は共通固定点である。
<!-- formal-statement-end -->

ここで $|G|$ は群の元の個数です。同じ点を与える異なる群要素があっても、群要素ごとに一回ずつ和へ入れます。和を並べ替えても目的関数が同じになることと、[重心の等変性](#thm-npcg9-barycenter-equivariance)を組み合わせます。

<!-- proof-start -->
### 証明

$x\in X$ を一つ選び、$N=|G|\ge1$ とします。目的関数は

$$
F_x(z)=\frac1N\sum_{g\in G}d(z,g\cdot x)^2.
$$

重みは正で総和1です。[有限加重重心の存在と一意性](../NPCG8/index.md#thm-npcg8-barycenter-existence) により唯一の重心 $b$ が存在します。

任意の $h\in G$ を固定します。すべての観測点を $h$ で移した目的関数は

$$
\begin{aligned}
(F_x)_h(z)
&=\frac1N\sum_{g\in G}d(z,h\cdot(g\cdot x))^2\\
&=\frac1N\sum_{g\in G}d(z,(hg)\cdot x)^2.
\end{aligned}
$$

$k=hg$ と置くと、$g=h^{-1}k$ で戻せるので $k$ は各群要素をちょうど一回ずつ動きます。従って

$$
(F_x)_h(z)=\frac1N\sum_{k\in G}d(z,k\cdot x)^2=F_x(z).
$$

[重心の等変性](#thm-npcg9-barycenter-equivariance) により左辺の重心は $h\cdot b$ ですが、右辺の唯一の重心は $b$ です。よって $h\cdot b=b$ です。$h$ は任意だったので $b\in\operatorname{Fix}(G)$ となります。
<!-- proof-end -->

### 例：三枝の距離木を回す

中心 $o$ から長さ1の三本の枝が伸びる木を考えます。枝を順に巡回させる操作 $r$ は、中心からの距離を保ちます。二点が同じ枝にあるなら距離は中心からの距離の差の絶対値、異なる枝にあるならその和なので、枝の置換は等長です。$r^3=e$ であるため三元群の作用になります。

この木は[有限距離木のCAT(0)性](../NPCG3/index.md#thm-npcg3-tree-cat-zero)を満たします。Cauchy列の無限部分列を一つの枝に取ると閉区間内で収束し、列全体も同じ点に収束するので完備です。

先端の一つから得た三点の重心について、中心から距離 $t\in[0,1]$ の候補 $z$ では

$$
F_x(z)=\frac{(1-t)^2+2(1+t)^2}{3}
=1+\frac23t+t^2.
$$

$t=0$ だけで最小となるので重心は $o$ です。中心は固定され、中心以外は別の枝に移るため、固定点は中心一つです。

### 仮定を外すとどうなるか

- 無限群 $\mathbb Z$ が実直線に $k\cdot x=x+k$ と作用する場合、距離は保たれ、群作用の条件も満たします。しかし $1\cdot x=x+1\ne x$ なので固定点はありません。軌道全体に一定の正の重みを与えて総和を1にする有限平均の手順は使えません。
- 距離1の異なる二点だけからなる空間は完備です。二元群が二点を交換する等長作用には共通固定点がありません。この空間には二点を結ぶ測地線分が存在せず、CAT(0)空間ではありません。等重み目的関数は両点で $1/2$ となり、重心の一意性が壊れます。

## 5. 共通固定点集合の形と不変凸集合

固定点が一つ存在するだけでなく、固定点同士をつなぐ道も固定されるでしょうか。[測地線凸集合](../NPCG5/index.md#def-npcg5-geodesically-convex-set)は、集合内の任意の二点を結ぶ測地線分がすべて集合内にある集合です。

<a id="thm-npcg9-fixed-set-closed-convex"></a>

<!-- formal-statement-start -->
> **定理（共通固定点集合の閉性と測地線凸性）**
>
> CAT(0)空間 $(X,d)$ に群 $G$ が等長に作用するとする。$\operatorname{Fix}(G)$ は閉集合であり、測地線凸集合である。群の有限性および空間の完備性は仮定しない。共通固定点集合は空でもよい。
<!-- formal-statement-end -->

閉性は等長性による距離評価で、凸性は[測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic)で示します。端点が固定されていれば、移動後の道も同じ端点を結ぶためです。

<!-- proof-start -->
### 証明

まず固定点列 $x_j\in\operatorname{Fix}(G)$ が $x\in X$ に収束するとします。任意の $g\in G$ に対して

$$
\begin{aligned}
d(g\cdot x,x)
&\le d(g\cdot x,g\cdot x_j)+d(x_j,x)\\
&=2d(x,x_j).
\end{aligned}
$$

ここでは $g\cdot x_j=x_j$ と等長性を使いました。右辺は0に収束するため $d(g\cdot x,x)=0$、従って $g\cdot x=x$ です。すべての $g$ で成立するので $x$ も固定点です。距離空間の閉集合の列による特徴付けから閉性を得ます。

次に固定点 $u,v$ を取り、端点 $u,v$ を結ぶ測地線分を $\gamma:[0,1]\to X$ とします。任意の $g\in G$ と $s,t\in[0,1]$ で

$$
\begin{aligned}
d(g\cdot\gamma(s),g\cdot\gamma(t))
&=d(\gamma(s),\gamma(t))\\
&=|s-t|d(u,v).
\end{aligned}
$$

さらに $g\cdot\gamma(0)=u$、$g\cdot\gamma(1)=v$ です。従って $t\mapsto g\cdot\gamma(t)$ も同じ端点の測地線分です。[測地線分の一意性](../NPCG4/index.md#thm-npcg4-unique-geodesic) により全ての $t$ で $g\cdot\gamma(t)=\gamma(t)$ となります。$g$ は任意なので $\gamma(t)$ は共通固定点です。
<!-- proof-end -->

通常距離の平面に $s\cdot(u,v)=(u,-v)$ と作用させると共通固定点集合は水平軸 $\{(u,0):u\in\mathbb R\}$ です。固定点は一般には一意でありません。有限群固定点定理の証明で使う一意性は、選んだ観測点に対する重心の一意性です。

### 不変凸集合へ射影する

[距離射影](../NPCG7/index.md#def-npcg7-metric-projection) $P_C(x)$ は集合 $C$ への唯一の最近点です。集合自体が操作で変わらなければ、最近点を選んでから操作しても結果は同じになります。

<a id="thm-npcg9-projection-equivariance"></a>

<!-- formal-statement-start -->
> **定理（不変閉凸集合への射影の等変性）**
>
> 空でない完備CAT(0)空間 $(X,d)$ に群 $G$ が等長に作用する。$C\subseteq X$ は空でない閉測地線凸集合で、$gC=C$ が任意の $g\in G$ で成立するとする。このとき任意の $x\in X$ と $g\in G$ について

$$
P_C(g\cdot x)=g\cdot P_C(x).
$$

> 特に $G$ が有限なら、$C$ に共通固定点が存在する。
<!-- formal-statement-end -->

[距離射影の存在と一意性](../NPCG7/index.md#thm-npcg7-projection-existence)を用います。不変性は移動後の最近点候補が $C$ に入ること、およびすべての比較対象を逆向きに戻せることを保証します。

<!-- proof-start -->
### 証明

$C$ は空でない閉凸集合で $X$ は完備CAT(0)だから、[距離射影の存在と一意性](../NPCG7/index.md#thm-npcg7-projection-existence) により $p=P_C(x)$ が定まります。任意の $g\in G$ について $g\cdot p\in C$ です。

任意の $y\in C$ に対して $g^{-1}\cdot y\in C$ なので、最近点の条件から

$$
d(x,p)\le d(x,g^{-1}\cdot y).
$$

等長性により

$$
d(g\cdot x,g\cdot p)\le d(g\cdot x,y).
$$

これはすべての $y\in C$ について成立するため、$g\cdot p$ は $g\cdot x$ の最近点です。一意性により $P_C(g\cdot x)=g\cdot P_C(x)$ を得ます。

$G$ が有限なら [有限群の共通固定点定理](#thm-npcg9-finite-group-fixed-point) により $b\in\operatorname{Fix}(G)$ が存在します。$q=P_C(b)$ と置くと $q\in C$ であり、任意の $g$ について

$$
g\cdot q=P_C(g\cdot b)=P_C(b)=q.
$$

従って $q\in C\cap\operatorname{Fix}(G)$ です。
<!-- proof-end -->

例えば鏡映 $s\cdot(u,v)=(u,-v)$ に対して縦の帯 $C=[0,2]\times\mathbb R$ は不変な閉凸集合です。$x=(3,4)$ なら、候補 $(u,v)\in C$ との平方距離は $(3-u)^2+(4-v)^2$ であり、$u=2,v=4$ で一意に最小となります。反転後には $x'=(3,-4)$ の射影が $(2,-4)$ となり、射影と反転が交換します。

## 6. 演習

<a id="ex-npcg9-a01"></a>

### NPCG9-A01 鏡映が等長群作用になる条件

- Level: A
- 目安時間: 8分
- 主題: 作用と距離保存

通常距離の実直線に二元群 $\{e,s\}$（$s^2=e$）を $e\cdot x=x$、$s\cdot x=6-x$ と作用させる。群作用と等長性を確認し、共通固定点を求めよ。

<!-- solution-start -->
#### 詳細解答

[群作用の定義](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)の単位元条件は満たされます。積に $e$ がある場合は恒等写像との合成で成立し、$s,s$ の場合は $6-(6-x)=x=e\cdot x$ です。

距離保存は $e$ で成立し、$s$ でも

$$
|(6-x)-(6-y)|=|y-x|=|x-y|
$$

です。従って[等長群作用](#def-npcg9-isometric-action)です。[共通固定点集合の定義](#def-npcg9-common-fixed-set)から $6-x=x$ を解き、唯一の共通固定点 $x=3$ を得ます。
<!-- solution-end -->

<a id="ex-npcg9-a02"></a>

### NPCG9-A02 不変集合と固定点の違い

- Level: A
- 目安時間: 8分
- 主題: 像の集合

通常距離の実直線に $s\cdot x=-x$、$e\cdot x=x$ で二元群が作用する。集合 $[-2,2]$、$[0,2]$、$\{0\}$ の不変性を判定せよ。

<!-- solution-start -->
#### 詳細解答

[不変集合の定義](#def-npcg9-common-fixed-set)では全群要素で像が一致することが必要です。$e$ の像は全て元の集合です。$s$ については符号を反転するので

$$
s[-2,2]=[-2,2],\qquad
s[0,2]=[-2,0],\qquad s\{0\}=\{0\}.
$$

各区間の像は端点の符号を変え、大小を逆転させた区間です。実際、任意の像の候補 $y$ は $x=-y$ で元へ戻せます。従って第1、第3の集合が不変です。第1の集合では $2$ は $-2$ に移るため、全点が固定されるわけではありません。
<!-- solution-end -->

<a id="ex-npcg9-a03"></a>

### NPCG9-A03 鏡映後の加重重心

- Level: A
- 目安時間: 8分
- 主題: 等変性の数値確認

通常距離の実直線上で観測点 $2,8$ の重みを $2/3,1/3$ とする。二元群の鏡映 $s\cdot x=10-x$ の前後で重心を平方完成により求め、等変性を確認せよ。

<!-- solution-start -->
#### 詳細解答

重みの総和は1です。[有限加重重心の定義](../NPCG8/index.md#def-npcg8-weighted-barycenter) に従って

$$
\begin{aligned}
F(z)&=\tfrac23(z-2)^2+\tfrac13(z-8)^2\\
&=z^2-8z+24=(z-4)^2+8.
\end{aligned}
$$

従って唯一の重心は $4$ です。移動後の点は $8,2$ なので

$$
\begin{aligned}
F_s(z)&=\tfrac23(z-8)^2+\tfrac13(z-2)^2\\
&=z^2-12z+44=(z-6)^2+8.
\end{aligned}
$$

唯一の重心は $6=s\cdot4$ です。[重心の等変性](#thm-npcg9-barycenter-equivariance) の予測と一致しました。
<!-- solution-end -->

<a id="ex-npcg9-a04"></a>

### NPCG9-A04 固定点が一意でない例

- Level: A
- 目安時間: 8分
- 主題: 固定集合と軌道

通常距離の平面で二元群が $s\cdot(u,v)=(-u,v)$、$e\cdot(u,v)=(u,v)$ と作用する。点 $(3,4)$ の軌道とその等重み重心、共通固定点集合を求めよ。

<!-- solution-start -->
#### 詳細解答

$s$ は二回作用させると恒等写像となり、差の第1成分の符号のみを反転するため平方距離を保ちます。[群作用の軌道](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer) は $\{(3,4),(-3,4)\}$ です。候補 $(a,b)$ について

$$
\begin{aligned}
F(a,b)&=\tfrac12((a-3)^2+(b-4)^2)\\
&\quad+\tfrac12((a+3)^2+(b-4)^2)\\
&=a^2+(b-4)^2+9.
\end{aligned}
$$

唯一の最小点は $(0,4)$ です。固定点の条件 $(-u,v)=(u,v)$ は $u=0$ と同値なので、共通固定点集合は $\{(0,v):v\in\mathbb R\}$ です。重心はこの集合の一点ですが、固定点自体は無数にあります。
<!-- solution-end -->

<a id="ex-npcg9-b01"></a>

### NPCG9-B01 有限軌道しか仮定しない場合

- Level: B
- 目安時間: 15分
- 主題: 有限平均と不変性

空でない完備CAT(0)空間に群 $G$ が等長に作用し、ある点 $x$ の軌道 $Gx$ が有限であるとする。群自体が無限でも共通固定点が存在することを示せ。

<!-- solution-start -->
#### 詳細解答

軌道の異なる点を $a_1,\ldots,a_m$ と列挙します。$x=e\cdot x$ が含まれるため $m\ge1$ です。

任意の $h\in G$ に対して $h\cdot(g\cdot x)=(hg)\cdot x\in Gx$ です。逆操作 $h^{-1}$ についても成立するので、$h$ は有限集合 $Gx$ の全単射になります。従って移動後の点の列は元の列の並べ替えです。

重みを $1/m$ とすると

$$
\frac1m\sum_{i=1}^m d(z,h\cdot a_i)^2
=\frac1m\sum_{i=1}^m d(z,a_i)^2.
$$

空間は完備CAT(0)で重みは非負、総和1なので、[重心の存在と一意性](../NPCG8/index.md#thm-npcg8-barycenter-existence) により重心 $b$ が存在します。[重心の等変性](#thm-npcg9-barycenter-equivariance) と上の等式から $h\cdot b=b$ です。任意の $h$ で成立するため $b\in\operatorname{Fix}(G)$ です。群の有限性の代わりに軌道の有限性を使えました。
<!-- solution-end -->

<a id="ex-npcg9-b02"></a>

### NPCG9-B02 不変性がないと射影は交換しない

- Level: B
- 目安時間: 12分
- 主題: 仮定の必要性

通常距離の実直線に二元群が $s\cdot x=-x$ と作用する。閉凸集合 $C=[1,3]$ に対して $x=2$ を取り、$P_C(s\cdot x)$ と $s\cdot P_C(x)$ を計算せよ。$C$ に固定点があるかも判定せよ。

<!-- solution-start -->
#### 詳細解答

通常距離の実直線は完備CAT(0)であり、閉区間は閉凸です。しかし $sC=[-3,-1]\ne C$ なので不変ではありません。

$x=2$ は $C$ に入り、距離0の唯一の点が自分自身なので $P_C(2)=2$ です。従って $s\cdot P_C(2)=-2$ です。

一方 $s\cdot2=-2$ です。任意の $y\in[1,3]$ への距離は $|-2-y|=2+y$ となるので、$y=1$ で一意に最小となります。

$$
P_C(s\cdot2)=P_C(-2)=1\ne-2.
$$

[不変閉凸集合への射影の等変性](#thm-npcg9-projection-equivariance) の不変性の仮定が欠け、右辺の候補は集合の外に出てしまいます。共通固定点は0のみで $C$ に属さないため、$C$ 内に固定点はありません。
<!-- solution-end -->

<a id="ex-npcg9-b03"></a>

### NPCG9-B03 不変凸集合への固定点の移動

- Level: B
- 目安時間: 15分
- 主題: 射影による構成

通常距離の平面で $s\cdot(u,v)=(u,-v)$ とする。二元群の不変集合 $C=\{(u,v):u\ge2\}$ が閉凸であることを確かめ、固定点 $(0,0)$ を $C$ に射影して固定点を作れ。$C$ 内の共通固定点全体も求めよ。

<!-- solution-start -->
#### 詳細解答

$C$ の点列が $(u,v)$ へ収束すれば第1成分も収束し、各第1成分が2以上なので $u\ge2$ です。従って閉集合です。

通常距離の平面の測地線分は直線分で、二点の第1成分が $u_1,u_2\ge2$ なら比率 $t\in[0,1]$ の第1成分は

$$
(1-t)u_1+tu_2\ge 2(1-t)+2t=2.
$$

従って測地線凸です。$s$ は第1成分を保つため $sC\subseteq C$、逆操作も $s$ 自身なので $sC=C$ です。

候補 $(u,v)\in C$ までの原点からの平方距離は $u^2+v^2\ge4$ であり、等号は $(u,v)=(2,0)$ に限ります。従って $P_C(0,0)=(2,0)$ です。[不変閉凸集合への射影の等変性](#thm-npcg9-projection-equivariance) のとおり、$s\cdot(2,0)=(2,0)$ です。

一般の共通固定点の条件は $(u,-v)=(u,v)$、すなわち $v=0$ です。$C$ と交わらせると $\{(u,0):u\ge2\}$ となります。
<!-- solution-end -->

<a id="ex-npcg9-b04"></a>

### NPCG9-B04 固定点集合への最近点

- Level: B
- 目安時間: 15分
- 主題: 固定点集合と距離射影

空でない完備CAT(0)空間に有限群 $G$ が等長に作用する。$K=\operatorname{Fix}(G)$ とする。任意の $x\in X$ と $g\in G$ について $P_K(g\cdot x)=P_K(x)$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

[有限群の共通固定点定理](#thm-npcg9-finite-group-fixed-point) により $K$ は空でなく、[共通固定点集合の閉性と測地線凸性](#thm-npcg9-fixed-set-closed-convex) により閉凸です。完備CAT(0)なので[距離射影の存在と一意性](../NPCG7/index.md#thm-npcg7-projection-existence) が適用できます。

任意の $k\in K$ は全群要素によって固定されるため、$gK=K$ です。[不変閉凸集合への射影の等変性](#thm-npcg9-projection-equivariance) を $C=K$ に適用すると

$$
P_K(g\cdot x)=g\cdot P_K(x).
$$

$P_K(x)\in K$ なので $g\cdot P_K(x)=P_K(x)$ です。よって結論が成り立ちます。軌道上のどの点を出発点としても同じ最近固定点が選ばれます。
<!-- solution-end -->

<a id="ex-npcg9-c01"></a>

### NPCG9-C01 操作による移動量から固定点までの距離を評価する

- Level: C
- 目安時間: 25分
- 主題: 重心、分散不等式、共通固定点の接続

空でない完備CAT(0)空間に有限群 $G$ が等長に作用する。$N=|G|$、$K=\operatorname{Fix}(G)$ とし、任意の $x\in X$ について $b$ を各 $g\cdot x$ の等重み重心とする。

(1) $F_x(b)=d(b,x)^2$ を示せ。ただし $F_x(z)=N^{-1}\sum_{g\in G}d(z,g\cdot x)^2$ とする。

(2) 次の評価を示せ。

$$
d(x,K)^2\le d(x,b)^2
\le \frac{1}{2N}\sum_{g\in G} d(x,g\cdot x)^2.
$$

(3) 実直線上の鏡映 $s\cdot x=-x$ の場合に等号が成立することを確かめよ。

<!-- solution-start -->
#### 詳細解答

(1) [有限群の共通固定点定理](#thm-npcg9-finite-group-fixed-point) により $b\in K$ です。従って任意の $g$ について $g^{-1}\cdot b=b$ です。等長性を $g^{-1}$ に適用すると

$$
d(b,g\cdot x)=d(g^{-1}\cdot b,x)=d(b,x).
$$

$N$ 個の項はすべて同じ値なので

$$
F_x(b)=\frac1N\sum_{g\in G} d(b,x)^2=d(b,x)^2.
$$

(2) [集合への距離の定義](../NPCG7/index.md#def-npcg7-metric-projection) に従い $d(x,K)=\inf_{k\in K}d(x,k)$ です。$b\in K$ から $d(x,K)\le d(x,b)$ であり、両辺が非負なので二乗して第1不等式を得ます。

点 $g\cdot x$ の重みは $1/N>0$ で総和1です。完備CAT(0)空間での [分散不等式](../NPCG8/index.md#thm-npcg8-variance-inequality) をこの重心 $b$ と候補点 $x$ に適用すると

$$
F_x(x)\ge F_x(b)+d(x,b)^2.
$$

(1) を代入すると $F_x(x)\ge2d(x,b)^2$ です。従って

$$
d(x,b)^2\le \frac{F_x(x)}2
=\frac{1}{2N}\sum_{g\in G}d(x,g\cdot x)^2.
$$

(3) 群は $e,s$ の二元で、$N=2$ です。固定点集合は $\{0\}$、目的関数は

$$
F_x(z)=\frac{(z-x)^2+(z+x)^2}{2}=z^2+x^2.
$$

唯一の重心は0です。左辺2つの量はともに $x^2$ です。右辺は

$$
\frac14\bigl(|x-x|^2+|x-(-x)|^2\bigr)=x^2.
$$

全て等号となるので、一般の係数 $1/(2N)$ はこれ以上一律に小さくできません。
<!-- solution-end -->

## 7. まとめ

等長群作用では、距離を保存する操作が群の積と整合します。有限群の作用で得た点を平均すると、操作による並べ替えと重心の一意性から共通固定点が得られます。固定点集合は閉凸であり、不変な閉凸集合へ射影しても固定点は固定点のままです。次講では、一つの集合だけでなく複数の閉凸集合への射影を組み合わせ、反復による点の移動を調べます。
