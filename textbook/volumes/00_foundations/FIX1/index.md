# FIX1 Sperner の補題・Brouwer 不動点定理

<!-- definition-example-audit: strict -->

連続写像

$$
f:C\to C
$$

に対して、

$$
f(x)=x
$$

を満たす点が存在するか、という問いを考えます。

一次元の閉区間なら、中間値の定理でかなり直接に示せます。しかし二次元以上では、座標ごとに中間値の定理を適用しても、同じ点で全座標が同時に一致するとは限りません。

この章では、連続写像の不動点方程式をいきなり式変形だけで解くのではなく、

$$
\boxed{
\text{単体を細かく分割する}
\Longrightarrow
\text{頂点へ有限個のラベルを付ける}
\Longrightarrow
\text{完全ラベル単体を見つける}
\Longrightarrow
\text{極限で不動点を得る}
}
$$

という有限組合せ論から連続写像の存在定理へ進みます。

中心になるのは **Sperner の補題**です。Sperner の補題自体は有限個の単体と有限個のラベルだけを扱います。それにもかかわらず、細分のメッシュを 0 へ近づけると、[Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)と連続性が働き、Brouwer の不動点定理が現れます。

後続では、この「一点を返す写像」の不動点を、最適反応や需要のような「点の集合を返す対応」へ拡張していきます。そのため、この章では有限次元の不動点論の土台を、証明まで含めて閉じます。

---

## 1. 標準単体は有限次元の凸領域の基本形

$n\ge0$ とします。標準基底を

$$
e_0,\dots,e_n\in\mathbb R^{n+1}
$$

と書きます。

<a id="def-fix1-standard-simplex"></a>

<!-- formal-statement-start -->
> **定義（単体・標準単体）**  
> 点
>
$$
a_0,\dots,a_n\in\mathbb R^d
$$
>
> が
>
$$
a_1-a_0,\dots,a_n-a_0
$$
>
> の線形独立性を満たすとき、
>
$$
\operatorname{conv}\{a_0,\dots,a_n\}
$$
>
> を $n$ 次元 **単体**という。
>
> 特に標準基底
>
$$
e_0,\dots,e_n\in\mathbb R^{n+1}
$$
>
> の凸包である $n$ 次元 **標準単体**を
>
$$
\Delta^n
=
\left\{
x=(x_0,\dots,x_n)\in\mathbb R^{n+1}
:
x_i\ge0,\ 
\sum_{i=0}^n x_i=1
\right\}
=
\operatorname{conv}\{e_0,\dots,e_n\}
$$
>
> と定める。
>
> 非空集合
>
$$
I\subset\{0,\dots,n\}
$$
>
> に対し、
>
$$
\Delta_I
=
\left\{
x\in\Delta^n:
x_j=0\ \text{for }j\notin I
\right\}
$$
>
> を $I$ に対応する面という。また
>
$$
\operatorname{supp}(x)
=
\{i:x_i>0\}
$$
>
> を $x$ の支持集合という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix1-standard-simplex -->
**定義の確認**：$\Delta^2$ の辺と内部

$$
x=
\left(
\frac12,\frac12,0
\right)
$$

なら

$$
x_0,x_1>0,
\qquad
x_2=0
$$

なので

$$
\operatorname{supp}(x)=\{0,1\}.
$$

従って $x$ は頂点 $e_0,e_1$ を結ぶ辺

$$
\Delta_{\{0,1\}}
$$

の上にあり、両端点とは異なります。

一方、

$$
y=
\left(
\frac13,\frac13,\frac13
\right)
$$

では全座標が正なので

$$
\operatorname{supp}(y)=\{0,1,2\}.
$$

従って $y$ は三角形全体の内部にあります。
<!-- definition-example-end -->

座標

$$
x_i
$$

は頂点 $e_i$ に対する重みです。実際、

$$
x
=
\sum_{i=0}^n x_i e_i,
\qquad
x_i\ge0,
\qquad
\sum_i x_i=1.
$$

したがって標準単体は、[凸結合](../OPT1/index.md#def-opt1-convex-combination)を座標そのものとして持つ凸集合です。

### 1.1 コンパクト性

$\Delta^n$ は

$$
x_i\ge0,
\qquad
\sum_i x_i=1
$$

で定まる閉集合であり、さらに

$$
0\le x_i\le1
$$

なので有界です。

従って [Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)により

$$
\Delta^n
$$

はコンパクトです。

このコンパクト性は後で、細分ごとに得られる点列から収束部分列を取り出すために使います。

---

## 2. 三角形分割とメッシュ

Brouwer の定理を有限問題へ近似するため、単体を小さい単体に分けます。

<a id="def-fix1-triangulation-mesh"></a>

<!-- formal-statement-start -->
> **定義（三角形分割とメッシュ）**  
> $\Delta^n$ の **三角形分割**とは、有限個の $n$ 次元単体からなる族
>
$$
\mathcal T
$$
>
> であって、
>
> 1. それらの和集合が $\Delta^n$ であり、
> 2. 任意の二つの単体の共通部分が空集合または双方の共通の面
>
> となるものをいう。
>
> 単体 $\sigma$ の直径を
>
$$
\operatorname{diam}(\sigma)
=
\sup_{x,y\in\sigma}\|x-y\|_2
$$
>
> とし、
>
$$
\operatorname{mesh}(\mathcal T)
=
\max_{\sigma\in\mathcal T}
\operatorname{diam}(\sigma)
$$
>
> を三角形分割 $\mathcal T$ の **メッシュ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix1-triangulation-mesh -->
**定義の確認**：三角形を重心から3分割する

$\Delta^2$ の重心を

$$
c=
\frac13(e_0+e_1+e_2)
$$

とします。

$$
\operatorname{conv}\{e_0,e_1,c\},
\qquad
\operatorname{conv}\{e_1,e_2,c\},
\qquad
\operatorname{conv}\{e_2,e_0,c\}
$$

の3個の三角形は $\Delta^2$ 全体を覆います。

二つの小三角形が重なるとき、その共通部分は

$$
\operatorname{conv}\{e_i,c\}
$$

のような共通辺です。従ってこれは三角形分割です。

メッシュも直接確認しておきます。例えば $\Delta^1$ を中点 $m$ で2分割すると、元の辺の長さを $D$ として各小辺の直径は

$$
\frac D2.
$$

従ってこの分割のメッシュは

$$
\operatorname{mesh}(\mathcal T)=\frac D2
$$

です。メッシュは「小単体が何個あるか」ではなく、最も大きい小単体の直径を測っています。
<!-- definition-example-end -->

有限個の単体しかないので、メッシュの最大値は実際に達成されます。

Brouwer の証明では

$$
\operatorname{mesh}(\mathcal T_k)\to0
$$

となる分割列が必要です。そのための標準装置が重心細分です。

---

## 3. 重心細分はメッシュを確実に縮める

単体

$$
\sigma=\operatorname{conv}\{v_0,\dots,v_m\}
$$

の非空な面

$$
F=\operatorname{conv}\{v_{i_0},\dots,v_{i_r}\}
$$

に対し、その重心を

$$
b_F
=
\frac{1}{r+1}
\sum_{j=0}^r v_{i_j}
$$

とします。

<a id="def-fix1-barycentric-subdivision"></a>

<!-- formal-statement-start -->
> **定義（重心細分）**  
> 単体 $\sigma$ の非空な面の厳密な包含鎖
>
$$
F_0\subsetneq F_1\subsetneq\cdots\subsetneq F_m=\sigma
$$
>
> ごとに
>
$$
\operatorname{conv}
\{b_{F_0},b_{F_1},\dots,b_{F_m}\}
$$
>
> を作る。このように得られる小単体全体による分割を $\sigma$ の **重心細分**という。
>
> 三角形分割 $\mathcal T$ の各単体を重心細分して得る分割を
>
$$
\operatorname{sd}\mathcal T
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix1-barycentric-subdivision -->
**定義の確認**：辺では中点分割になる

辺

$$
\sigma=\operatorname{conv}\{v_0,v_1\}
$$

の非空な面は

$$
\{v_0\},\quad
\{v_1\},\quad
\sigma
$$

です。

$\sigma$ の重心は中点

$$
m=\frac{v_0+v_1}{2}.
$$

包含鎖は

$$
\{v_0\}\subsetneq\sigma,
\qquad
\{v_1\}\subsetneq\sigma
$$

なので、重心細分は

$$
\operatorname{conv}\{v_0,m\},
\qquad
\operatorname{conv}\{m,v_1\}
$$

の2本に分ける操作です。
<!-- definition-example-end -->

<a id="prop-fix1-barycentric-mesh"></a>

<!-- formal-statement-start -->
> **命題（重心細分によるメッシュ縮小）**  
> $n\ge1$ とし、$\mathcal T$ を $n$ 次元単体の三角形分割とする。このとき
>
$$
\operatorname{mesh}(\operatorname{sd}\mathcal T)
\le
\frac{n}{n+1}
\operatorname{mesh}(\mathcal T).
$$
>
> 従って反復重心細分
>
$$
\mathcal T_k=\operatorname{sd}^k\mathcal T
$$
>
> について
>
$$
\operatorname{mesh}(\mathcal T_k)
\le
\left(\frac{n}{n+1}\right)^k
\operatorname{mesh}(\mathcal T)
\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

細分後の一つの小単体の頂点は、入れ子になった面の重心です。

そこで

$$
F\subsetneq G
$$

という二つの面の重心の距離を、元の単体の直径で評価します。

<!-- proof-start -->
### 証明

元の一つの $n$ 次元単体

$$
\sigma
$$

を固定します。

非空な二面

$$
F\subsetneq G\subset\sigma
$$

を取り、

$$
F
$$

の頂点数を $p+1$、

$$
G
$$

の頂点数を $q+1$ とします。

従って

$$
0\le p<q\le n.
$$

$G$ の頂点を、$F$ に属するものと $G\setminus F$ に属するものへ分けると、

$$
b_G
=
\frac{p+1}{q+1}b_F
+
\frac{q-p}{q+1}b_{G\setminus F}
$$

と書けます。ここで $b_{G\setminus F}$ は $G$ のうち $F$ にない頂点の平均です。

従って

$$
b_F-b_G
=
\frac{q-p}{q+1}
\left(
b_F-b_{G\setminus F}
\right).
$$

$b_F$ も $b_{G\setminus F}$ も $\sigma$ の凸包内にあるので、

$$
\|b_F-b_{G\setminus F}\|_2
\le
\operatorname{diam}(\sigma).
$$

よって

$$
\|b_F-b_G\|_2
\le
\frac{q-p}{q+1}
\operatorname{diam}(\sigma).
$$

$p\ge0$ だから

$$
q-p\le q,
$$

また $q\le n$ なので

$$
\frac{q-p}{q+1}
\le
\frac{q}{q+1}
\le
\frac{n}{n+1}.
$$

従って

$$
\|b_F-b_G\|_2
\le
\frac{n}{n+1}
\operatorname{diam}(\sigma).
$$

重心細分後の一つの小単体では、任意の二頂点が包含関係を持つ二面の重心になっています。単体の直径は頂点間距離の最大値に等しいので、

$$
\operatorname{diam}(\tau)
\le
\frac{n}{n+1}
\operatorname{diam}(\sigma)
$$

が細分後の各小単体 $\tau$ について成立します。

$\mathcal T$ の全単体で最大を取れば

$$
\operatorname{mesh}(\operatorname{sd}\mathcal T)
\le
\frac{n}{n+1}
\operatorname{mesh}(\mathcal T).
$$

これを $k$ 回反復すると

$$
\operatorname{mesh}(\mathcal T_k)
\le
\left(\frac{n}{n+1}\right)^k
\operatorname{mesh}(\mathcal T).
$$

$n/(n+1)<1$ だから右辺は 0 へ収束します。
<!-- proof-end -->

この命題により、「十分細かい三角形分割」を存在だけで済ませず、具体的な反復操作で作れます。

---

## 4. Sperner ラベル付け

三角形分割の各頂点に

$$
0,1,\dots,n
$$

のどれかを付けます。ただし境界上では、存在しない座標の番号を付けてはいけません。

<a id="def-fix1-sperner-labeling"></a>

<!-- formal-statement-start -->
> **定義（Sperner ラベル付け）**  
> $\mathcal T$ を $\Delta^n$ の三角形分割とする。$\mathcal T$ の各頂点 $v$ に
>
$$
\lambda(v)\in\{0,\dots,n\}
$$
>
> を対応させる写像 $\lambda$ が
>
$$
\boxed{
\lambda(v)\in\operatorname{supp}(v)
}
$$
>
> をすべての分割頂点 $v$ で満たすとき、$\lambda$ を **Sperner ラベル付け**という。
>
> 小 $n$ 次元単体 $\sigma$ の頂点ラベルが
>
$$
\{0,1,\dots,n\}
$$
>
> をすべて含むとき、$\sigma$ を **完全ラベル単体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix1-sperner-labeling -->
**定義の確認**：三角形の重心にラベル0を付ける

先ほどの

$$
c=\frac13(e_0+e_1+e_2)
$$

から3頂点へ線を引いた分割を考えます。

元の頂点では

$$
\operatorname{supp}(e_i)=\{i\}
$$

なので、Sperner 条件により

$$
\lambda(e_i)=i
$$

しか選べません。

重心 $c$ では

$$
\operatorname{supp}(c)=\{0,1,2\}
$$

なので、0,1,2 のどれでも許されます。

例えば

$$
\lambda(c)=0
$$

とすると、

$$
\operatorname{conv}\{e_1,e_2,c\}
$$

の頂点ラベルは

$$
1,2,0
$$

であり、完全ラベル単体です。

他の二つの小三角形はラベル0を二つ含むので完全ラベルではありません。
<!-- definition-example-end -->

Sperner 条件を座標で言い換えると、

$$
v_i=0
\Longrightarrow
\lambda(v)\ne i
$$

です。

つまり、$i$ 番目の元の頂点を含まない面の上ではラベル $i$ を使えません。

---

## 5. Sperner の補題：完全ラベル単体は奇数個ある

存在だけでなく、奇数個あるという強い形を証明します。

<a id="lem-fix1-sperner"></a>

<!-- formal-statement-start -->
> **補題（Sperner の補題）**  
> $\mathcal T$ を $\Delta^n$ の任意の有限三角形分割とし、その頂点に Sperner ラベル付けを与える。
>
> このとき、ラベル
>
$$
0,1,\dots,n
$$
>
> をすべて持つ $n$ 次元小単体の個数は奇数である。特に完全ラベル単体は少なくとも一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$n$ に関する帰納法を使います。

境界面

$$
x_n=0
$$

ではラベル $n$ が禁止されるため、そこには $(n-1)$ 次元の Sperner 問題がそのまま現れます。

次に、ラベル集合が

$$
\{0,\dots,n-1\}
$$

である $(n-1)$ 次元面だけを追い、小単体を頂点とする有限グラフを作ります。

- 完全ラベル単体には、そのラベル集合を持つ面が1枚
- $0,\dots,n-1$ だけをすべて使う単体には2枚
- その他には0枚

となるため、グラフの奇次数頂点の偶奇から完全ラベル単体の個数が決まります。

<!-- proof-start -->
### 証明

$n$ に関する帰納法で示します。

#### 基底 $n=1$

$\Delta^1$ は頂点 $e_0,e_1$ を結ぶ線分です。

三角形分割の頂点を線分上の順番に

$$
v_0=e_0,\ v_1,\dots,v_m=e_1
$$

と並べます。

Sperner 条件から

$$
\lambda(v_0)=0,
\qquad
\lambda(v_m)=1.
$$

隣接頂点のラベルが異なる小辺を通過するたび、現在のラベルは0と1の間で切り替わります。

最初が0で最後が1なので、切り替わる回数は奇数です。

1次元の完全ラベル単体は、まさに端点ラベルが0と1で異なる小辺です。従って完全ラベル辺は奇数個あります。

#### 帰納法の仮定

$n-1$ 次元まで定理が成り立つと仮定し、$\Delta^n$ を考えます。

ここからは、ラベル集合がちょうど

$$
\{0,1,\dots,n-1\}
$$

である $(n-1)$ 次元小面だけに注目します。

まず、この種の小面が $\Delta^n$ の境界のどこに現れるかを調べます。

境界の元の面

$$
x_j=0
$$

上では、Sperner 条件によりラベル $j$ は使えません。

もし

$$
j<n
$$

なら、注目している小面にはラベル $j$ が必要なので、その面上には存在できません。

従って境界上でこのラベル集合を持つ $(n-1)$ 次元小面が存在できるのは

$$
x_n=0
$$

という元の面だけです。

この面は

$$
\Delta_{\{0,\dots,n-1\}}
$$

であり、$\Delta^{n-1}$ と自然に同一視できます。元の三角形分割をこの面へ制限すると $(n-1)$ 次元三角形分割になり、Sperner ラベル条件もそのまま満たされます。

帰納法の仮定により、この境界面上でラベル $0,\dots,n-1$ をすべて持つ $(n-1)$ 次元小単体の個数は奇数です。

#### 有限グラフを作る

次の有限グラフを作ります。

- 各 $n$ 次元小単体に一つ頂点を置く。
- さらに外部を表す頂点 $\ast$ を一つ置く。
- ラベル集合が $\{0,\dots,n-1\}$ である内部 $(n-1)$ 次元面を共有する二つの $n$ 次元小単体の頂点を辺で結ぶ。
- ラベル集合が $\{0,\dots,n-1\}$ である境界 $(n-1)$ 次元面を持つ小単体の頂点を $\ast$ と結ぶ。

三角形分割の定義から、内部の $(n-1)$ 次元面はちょうど二つの $n$ 次元小単体に接し、境界面は一つだけに接するので、このグラフは正しく定まります。

外部頂点 $\ast$ の次数は、境界上でラベル $0,\dots,n-1$ をすべて持つ $(n-1)$ 次元小単体の個数に等しいので奇数です。

次に一つの $n$ 次元小単体 $\sigma$ の次数を数えます。

$\sigma$ は $n+1$ 個の頂点を持ちます。

**場合1：$\sigma$ が完全ラベルである。**

頂点ラベルは

$$
0,1,\dots,n
$$

を一度ずつ含みます。

ラベル集合が $\{0,\dots,n-1\}$ となる面を作るには、ラベル $n$ の頂点を一つ除けばよく、その方法は一通りだけです。

従って

$$
\deg(\sigma)=1.
$$

**場合2：$\sigma$ の頂点ラベルが $0,\dots,n-1$ をすべて含むが、ラベル $n$ を含まない。**

$n+1$ 個の頂点に $n$ 種類のラベル $0,\dots,n-1$ がすべて現れるので、ちょうど一つのラベルが2回現れ、他は1回ずつ現れます。

重複したラベルを持つ二頂点のうち、どちらか一方を除けば、残る $n$ 頂点のラベル集合は $\{0,\dots,n-1\}$ です。そのような除き方は2通りあります。

従って

$$
\deg(\sigma)=2.
$$

**場合3：それ以外。**

ラベル $0,\dots,n-1$ のどれかが欠けているので、どの $(n-1)$ 次元面もラベル集合 $\{0,\dots,n-1\}$ を持ちません。

従って

$$
\deg(\sigma)=0.
$$

以上から、内部グラフ頂点のうち奇次数なのは完全ラベル単体に対応する頂点だけです。

有限グラフでは、次数の総和が辺数の2倍なので偶数です。従って奇次数頂点の個数は偶数です。

外部頂点 $\ast$ は奇次数で1個あるため、内部の奇次数頂点、すなわち完全ラベル $n$ 次元単体の個数は奇数でなければなりません。

これで帰納法が閉じました。
<!-- proof-end -->

Sperner の補題は連続性を一切使っていません。有限個の単体、有限個のラベル、有限グラフの偶奇だけで終わっています。

連続性が必要になるのは、この有限組合せ論を細分極限へ送る次の段階です。

---

## 6. 不動点

<a id="def-fix1-fixed-point"></a>

<!-- formal-statement-start -->
> **定義（不動点）**  
> 集合 $X$ と写像
>
$$
f:X\to X
$$
>
> に対し、
>
$$
f(x)=x
$$
>
> を満たす $x\in X$ を $f$ の **不動点**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix1-fixed-point -->
**定義の確認**：座標交換

$\Delta^1$ 上で

$$
f(x_0,x_1)=(x_1,x_0)
$$

とします。

不動点条件は

$$
x_0=x_1.
$$

さらに

$$
x_0+x_1=1
$$

なので

$$
x_0=x_1=\frac12.
$$

従って

$$
\left(\frac12,\frac12\right)
$$

が不動点です。
<!-- definition-example-end -->

存在定理では、不動点を式変形で直接解けるとは限りません。

Brouwer の定理は、連続性・コンパクト性・凸性だけから「少なくとも一つ存在する」と保証します。

---

## 7. 連続写像から Sperner ラベルを作る

連続写像

$$
f:\Delta^n\to\Delta^n
$$

を取ります。

三角形分割の頂点 $v$ が既に不動点なら証明は終わりです。

そこで

$$
f(v)\ne v
$$

とします。

座標差を

$$
d_i(v)=v_i-f_i(v)
$$

と置くと、

$$
\sum_{i=0}^n d_i(v)
=
\sum_i v_i-\sum_i f_i(v)
=
1-1
=
0.
$$

しかも差ベクトルは0ではありません。

従って、正の成分が少なくとも一つ存在します。つまりある $i$ について

$$
v_i>f_i(v).
$$

そこで、そのような $i$ を一つ選んで

$$
\lambda(v)=i
$$

とします。

### 7.1 なぜこれは Sperner ラベルになるか

もし

$$
v_i=0
$$

なら、

$$
f_i(v)\ge0
$$

なので

$$
v_i>f_i(v)
$$

は不可能です。

従って選ばれたラベル $i$ では必ず

$$
v_i>0.
$$

つまり

$$
i\in\operatorname{supp}(v).
$$

よってこのラベル付けは Sperner 条件を満たします。

ここが、単体の非負座標と「座標和が1」という構造が同時に働く箇所です。

---

## 8. Brouwer 不動点定理：標準単体

<a id="thm-fix1-brouwer-simplex"></a>

<!-- formal-statement-start -->
> **定理（Brouwer 不動点定理：標準単体）**  
> $n\ge0$ とし、
>
$$
f:\Delta^n\to\Delta^n
$$
>
> を連続写像とする。
>
> このとき、ある
>
$$
x^*\in\Delta^n
$$
>
> が存在して
>
$$
\boxed{
f(x^*)=x^*
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$n=0$ は一点集合なので自明です。

$n\ge1$ では、$\Delta^n$ を重心細分で繰り返し細かくします。

各分割で、前節の座標差から Sperner ラベルを付けます。[Sperner の補題](#lem-fix1-sperner)により、毎回完全ラベル小単体が一つ取れます。

その小単体の直径は 0 へ近づきます。各ラベル $i$ の頂点では

$$
v_i>f_i(v)
$$

が成立しているので、完全ラベル単体が一点へ潰れる極限では

$$
x_i^*\ge f_i(x^*)
$$

が全 $i$ で成立します。

両辺の座標和はどちらも1なので、全座標で等号にならざるを得ません。

<!-- proof-start -->
### 証明

$n=0$ では

$$
\Delta^0=\{e_0\}
$$

は一点集合です。自己写像はその一点を自身へ送るので定理は成立します。

以下

$$
n\ge1
$$

とします。

$\Delta^n$ 自身を一つの単体とみなす初期分割を

$$
\mathcal T_0
$$

とし、

$$
\mathcal T_k
=
\operatorname{sd}^k\mathcal T_0
$$

とします。

[重心細分によるメッシュ縮小](#prop-fix1-barycentric-mesh)から

$$
\operatorname{mesh}(\mathcal T_k)\to0.
$$

もし、ある $k$ の分割頂点 $v$ で

$$
f(v)=v
$$

なら、その $v$ が不動点なので証明は終わりです。

従って以下では、すべての分割頂点で

$$
f(v)\ne v
$$

と仮定します。

各分割頂点 $v$ について

$$
\sum_{i=0}^n
\left(
v_i-f_i(v)
\right)
=
0
$$

で、差ベクトルは0ではありません。

従って少なくとも一つの座標で

$$
v_i-f_i(v)>0
$$

です。

そのような $i$ を一つ選び、

$$
\lambda(v)=i
$$

とします。

$v_i=0$ なら $f_i(v)\ge0$ なので

$$
v_i-f_i(v)>0
$$

は起こりません。

従って

$$
\lambda(v)\in\operatorname{supp}(v).
$$

よって $\lambda$ は各 $\mathcal T_k$ 上の Sperner ラベル付けです。

[Sperner の補題](#lem-fix1-sperner)により、各 $k$ について完全ラベル小単体

$$
\sigma_k\in\mathcal T_k
$$

を一つ選べます。

$\sigma_k$ のうちラベル $i$ を持つ頂点を

$$
v_k^{(i)}
$$

と書きます。

完全ラベルなので

$$
i=0,\dots,n
$$

のすべてについてこの頂点が存在し、ラベルの定義から

$$
\left(v_k^{(i)}\right)_i
>
f_i\left(v_k^{(i)}\right)
$$

です。

代表点として

$$
x_k=v_k^{(0)}
$$

を取ります。

すべての $x_k$ はコンパクト集合 $\Delta^n$ に属します。

Heine--Borel の定理と距離空間での点列コンパクト性から、部分列

$$
x_{k_r}
$$

と点

$$
x^*\in\Delta^n
$$

が存在して

$$
x_{k_r}\to x^*
$$

となります。

各 $i$ について

$$
x_{k_r},
\ v_{k_r}^{(i)}
\in\sigma_{k_r}
$$

なので

$$
\left\|
v_{k_r}^{(i)}-x_{k_r}
\right\|_2
\le
\operatorname{diam}(\sigma_{k_r})
\le
\operatorname{mesh}(\mathcal T_{k_r})
\longrightarrow0.
$$

従って

$$
v_{k_r}^{(i)}\to x^*
$$

です。

各 $r$ で

$$
\left(v_{k_r}^{(i)}\right)_i
>
f_i\left(v_{k_r}^{(i)}\right)
$$

が成立しています。

座標射影は連続で、$f$ も連続なので、$r\to\infty$ とすると

$$
x_i^*
\ge
f_i(x^*)
$$

を得ます。

これは全ての

$$
i=0,\dots,n
$$

について成立します。

一方、

$$
x^*\in\Delta^n,
\qquad
f(x^*)\in\Delta^n
$$

なので

$$
\sum_i x_i^*=1,
\qquad
\sum_i f_i(x^*)=1.
$$

従って

$$
\sum_i
\left(
x_i^*-f_i(x^*)
\right)
=
0.
$$

各項は非負で、その総和が0です。

よって全ての $i$ で

$$
x_i^*-f_i(x^*)=0.
$$

すなわち

$$
f(x^*)=x^*.
$$

これで証明が完了しました。
<!-- proof-end -->

### 8.1 どの仮定がどこで働いたか

証明を分解すると、役割ははっきりしています。

**単体の座標構造**は、

$$
\sum_i(v_i-f_i(v))=0
$$

から正の座標差を選び、境界で禁止ラベルが自動的に避けられることを保証しました。

**Sperner の補題**は、各有限分割で全ラベルを同時に持つ小単体を保証しました。

**細分**は、その小単体の直径を0へ送りました。

**コンパクト性**は、代表点列から収束部分列を取り出しました。

**連続性**は、分割頂点上の不等式を極限点へ渡しました。

したがって Brouwer の定理は「連続だから何となく交わる」という主張ではなく、有限組合せ論・細分・コンパクト性・連続性が順番に働く定理です。

---

## 9. 任意の有限次元単体へ移す

一般の $m$ 次元単体

$$
S=\operatorname{conv}\{a_0,\dots,a_m\}\subset\mathbb R^d
$$

で頂点 $a_0,\dots,a_m$ がアフィン独立なら、

$$
A:
\Delta^m\to S,
\qquad
A(t_0,\dots,t_m)=\sum_{i=0}^m t_i a_i
$$

は連続な全単射で、逆写像も重心座標を与える連続写像です。

従って連続自己写像

$$
g:S\to S
$$

に対して

$$
A^{-1}\circ g\circ A:
\Delta^m\to\Delta^m
$$

へ標準単体版を適用できます。

不動点 $t^*$ が得られれば

$$
x^*=A(t^*)
$$

は

$$
g(x^*)=x^*
$$

を満たします。

したがって Brouwer の定理は標準単体だけの現象ではなく、任意の有限次元単体で成立します。

---

## 10. 非空コンパクト凸集合へ拡張する

単体以外の凸集合でも不動点は存在します。

ここでは [有限次元の閉凸集合への射影定理](../OPT2/index.md#thm-opt2-projection)を使います。

<a id="cor-fix1-brouwer-convex"></a>

<!-- formal-statement-start -->
> **系（Brouwer 不動点定理：非空コンパクト凸集合）**  
> $C\subset\mathbb R^m$ を非空コンパクト凸集合とし、
>
$$
f:C\to C
$$
>
> を連続写像とする。
>
> このとき、ある
>
$$
x^*\in C
$$
>
> が存在して
>
$$
\boxed{
f(x^*)=x^*
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$C$ は有界なので、大きな $m$ 次元単体 $S$ の中へ入れられます。

$S$ の点を最近点射影

$$
P_C
$$

で $C$ へ戻し、その後 $f$ を適用して

$$
F=f\circ P_C:S\to C\subset S
$$

を作ります。

$F$ は単体の連続自己写像なので不動点を持ちます。その不動点は $F$ の像に等しいため自動的に $C$ に入り、$C$ 上では射影が恒等写像になります。

<!-- proof-start -->
### 証明

$C$ はコンパクトなので有界です。

従ってある

$$
R>0
$$

が存在して

$$
C\subset[-R,R]^m.
$$

点

$$
a_0=(-R,\dots,-R)
$$

と、

$$
a_i=a_0+2mR\,e_i
\qquad(i=1,\dots,m)
$$

を取り、

$$
S=\operatorname{conv}\{a_0,a_1,\dots,a_m\}
$$

とします。

$S$ が箱

$$
[-R,R]^m
$$

を含むことを確認します。

任意の

$$
x\in[-R,R]^m
$$

について

$$
y=x-a_0
$$

と置くと

$$
0\le y_i\le2R.
$$

従って

$$
\sum_{i=1}^m y_i\le2mR.
$$

そこで

$$
t_i=\frac{y_i}{2mR}
\qquad(i=1,\dots,m)
$$

と置けば

$$
t_i\ge0,
\qquad
\sum_{i=1}^m t_i\le1.
$$

さらに

$$
t_0=1-\sum_{i=1}^m t_i\ge0.
$$

すると

$$
\begin{aligned}
t_0a_0+\sum_{i=1}^m t_i a_i
&=
a_0+\sum_{i=1}^m t_i(2mR e_i)\\
&=
a_0+y\\
&=
x.
\end{aligned}
$$

従って

$$
[-R,R]^m\subset S
$$

であり、

$$
C\subset S.
$$

$C$ はコンパクトなので閉集合です。また仮定により凸です。

従って OPT2 の射影定理により、任意の

$$
x\in\mathbb R^m
$$

に対して最近点

$$
P_C(x)\in C
$$

が一意に存在します。

さらに [射影の変分不等式](../OPT2/index.md#thm-opt2-projection-variational-inequality)から、最近点射影が非拡大であることを確認できます。

$$
p=P_C(x),
\qquad
q=P_C(y)
$$

とします。変分不等式をそれぞれ $q\in C$、$p\in C$ に適用すると

$$
(x-p)^{\mathsf T}(q-p)\le0,
$$

$$
(y-q)^{\mathsf T}(p-q)\le0.
$$

従って

$$
(x-p)^{\mathsf T}(p-q)\ge0,
$$

$$
(q-y)^{\mathsf T}(p-q)\ge0.
$$

恒等式

$$
x-y=(x-p)+(p-q)+(q-y)
$$

の両辺と $p-q$ の内積を取ると

$$
(x-y)^{\mathsf T}(p-q)
\ge
\|p-q\|_2^2.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\|p-q\|_2^2
\le
\|x-y\|_2\,\|p-q\|_2.
$$

$p=q$ なら結論は自明で、$p\ne q$ なら $\|p-q\|_2$ で割って

$$
\boxed{
\|P_C(x)-P_C(y)\|_2
\le
\|x-y\|_2
}
$$

を得ます。従って $P_C$ は 1-Lipschitz、特に連続です。

そこで

$$
F:S\to S
$$

を

$$
F(x)=f(P_C(x))
$$

で定めます。

$P_C(x)\in C$ であり、

$$
f(C)\subset C\subset S
$$

なので $F$ は確かに $S$ の自己写像です。

$f$ と $P_C$ は連続なので $F$ も連続です。

前節の座標変換

$$
A:\Delta^m\to S
$$

とその連続な逆写像を使えば、$F$ を $\Delta^m$ の連続自己写像へ移せます。従って標準単体版の Brouwer 不動点定理を適用できます。

従ってある

$$
x^*\in S
$$

が存在して

$$
F(x^*)=x^*.
$$

ところが

$$
F(x^*)=f(P_C(x^*))\in C.
$$

従って

$$
x^*=F(x^*)\in C.
$$

$C$ 上では最近点射影は恒等写像なので

$$
P_C(x^*)=x^*.
$$

よって

$$
x^*
=
F(x^*)
=
f(P_C(x^*))
=
f(x^*).
$$

従って $x^*$ は $f$ の不動点です。
<!-- proof-end -->

この系が、有限次元のゲーム理論や一般均衡で頻繁に使われる Brouwer 不動点定理の形です。

---

## 11. 仮定を外すと何が壊れるか

Brouwer の定理の仮定は飾りではありません。

### 11.1 コンパクト性を外す

$$
C=\mathbb R
$$

とし、

$$
f(x)=x+1
$$

とします。

$f$ は連続で、$\mathbb R$ は凸ですが、

$$
f(x)=x
$$

なら

$$
x+1=x
$$

となり不可能です。

不動点はありません。

標準単体上の証明で対応する破綻は、近似点列から収束部分列を取り出すコンパクト性がないことです。

### 11.2 凸性を外す

単位円周

$$
C=S^1
=
\{x\in\mathbb R^2:\|x\|_2=1\}
$$

で

$$
f(x)=-x
$$

とします。

$C$ はコンパクトで $f$ は連続ですが、

$$
-x=x
$$

なら

$$
x=0
$$

でなければならず、$0\notin S^1$ です。

従って不動点はありません。

凸性を失うと、外部の単体から $C$ へ一意で連続な最近点射影を作る構成が一般には使えません。実際、円周では原点からの最近点は円周上の全点であり、一意ではありません。

### 11.3 連続性を外す

$$
C=[0,1]
$$

で

$$
f(x)
=
\begin{cases}
1, & 0\le x<1,\\
0, & x=1
\end{cases}
$$

とします。

$x<1$ なら

$$
f(x)=1\ne x,
$$

$x=1$ なら

$$
f(1)=0\ne1.
$$

従って不動点はありません。

Sperner から Brouwer への証明では、細分頂点で得た不等式

$$
v_i>f_i(v)
$$

を極限点へ渡すところで連続性を使いました。連続性がなければ、この極限移行が壊れます。

---

## 12. Sperner 証明は近似的不動点も与える

存在証明は「どこにあるか何も分からない」だけではありません。

細分を有限段階で止めても、完全ラベル単体の直径が小さければ、そこから近似的不動点を得られます。

例えば $f:\Delta^n\to\Delta^n$ が $L$-Lipschitz、

$$
\|f(x)-f(y)\|_2
\le
L\|x-y\|_2
$$

だとします。

直径が $\delta$ 以下の完全ラベル単体を一つ取り、ラベル $i$ の頂点を

$$
v^{(i)}
$$

とします。

一つの代表点を

$$
x=v^{(0)}
$$

とすると、

$$
\|x-v^{(i)}\|_2\le\delta.
$$

ラベル条件から

$$
v_i^{(i)}-f_i(v^{(i)})>0.
$$

一方、座標射影は1-Lipschitzなので

$$
|x_i-v_i^{(i)}|
\le
\delta,
$$

また

$$
|f_i(x)-f_i(v^{(i)})|
\le
\|f(x)-f(v^{(i)})\|_2
\le
L\delta.
$$

従って

$$
x_i-f_i(x)
>
-(1+L)\delta.
$$

この評価を全座標に使い、さらに座標差の総和が0であることを組み合わせると、全座標の誤差を制御できます。

つまり Sperner の補題は、単なる存在証明だけでなく

$$
\boxed{
\text{細分を細かくする}
\Longrightarrow
\text{近似的不動点を精密化する}
}
$$

という構成的な見方も与えます。

---

## 13. この章でつながったもの

流れを一本に戻すと、

$$
\boxed{
\begin{array}{c}
\text{標準単体}\\
\Downarrow\\
\text{三角形分割・重心細分}\\
\Downarrow\\
\text{Sperner ラベル付け}\\
\Downarrow\\
\text{完全ラベル単体の奇数性}\\
\Downarrow\\
\text{細分メッシュ}\to0\\
\Downarrow\\
\text{コンパクト性で極限点}\\
\Downarrow\\
\text{連続性で座標不等式を極限へ}\\
\Downarrow\\
\text{Brouwer 不動点定理}
\end{array}
}
$$

です。

Sperner の補題は有限組合せ論、Brouwer の定理は連続写像の定理です。

両者の間をつないでいるのが、

- メッシュを0へ送る細分
- コンパクト性による部分列
- 連続性による極限移行

です。

次に集合値写像を扱うときも、存在定理は「条件を並べた呪文」ではなく、どの条件がどの閉性・コンパクト性・凸性を担っているかを追います。

---

# 演習

## Level A

<a id="ex-fix1-a01"></a>

### FIX1-A01 標準単体の支持集合と面

- Level: A
- 目安時間: 10分

$\Delta^2$ の次の点について、支持集合を求め、その点を含む最小の面を答えよ。

$$
x=
\left(
\frac12,\frac12,0
\right),
$$

$$
y=(0,1,0),
$$

$$
z=
\left(
\frac15,\frac25,\frac25
\right).
$$

さらに、各点が三角形分割の頂点だったとき、Sperner ラベルとして許される番号をすべて答えよ。

<!-- solution-start -->
#### 詳細解答

Sperner ラベルとして許される番号は、その点の支持集合そのものです。

まず

$$
x=
\left(
\frac12,\frac12,0
\right)
$$

では正の座標は0番と1番なので

$$
\operatorname{supp}(x)=\{0,1\}.
$$

従って $x$ を含む最小の面は

$$
\Delta_{\{0,1\}}
=
\operatorname{conv}\{e_0,e_1\}
$$

です。

許されるラベルは

$$
0,\ 1
$$

です。

次に

$$
y=(0,1,0)=e_1.
$$

従って

$$
\operatorname{supp}(y)=\{1\}.
$$

最小の面は頂点

$$
\Delta_{\{1\}}=\{e_1\}
$$

だけで、許されるラベルも

$$
1
$$

だけです。

最後に

$$
z=
\left(
\frac15,\frac25,\frac25
\right)
$$

は全座標が正なので

$$
\operatorname{supp}(z)=\{0,1,2\}.
$$

最小の面は $\Delta^2$ 全体で、許されるラベルは

$$
0,\ 1,\ 2
$$

のすべてです。
<!-- solution-end -->

<a id="ex-fix1-a02"></a>

### FIX1-A02 重心で3分割した三角形のラベル

- Level: A
- 目安時間: 12分

$\Delta^2$ の重心

$$
c=\frac13(e_0+e_1+e_2)
$$

から各頂点へ線を引き、3個の小三角形へ分割する。

元の頂点には Sperner 条件に従って

$$
\lambda(e_i)=i
$$

を付ける。

1. $\lambda(c)=0$ のとき完全ラベル小三角形をすべて求めよ。
2. $\lambda(c)=1$ のときも同様に求めよ。
3. $\lambda(c)=2$ のときも同様に求めよ。

<!-- solution-start -->
#### 詳細解答

小三角形は

$$
\sigma_0=\operatorname{conv}\{e_0,e_1,c\},
$$

$$
\sigma_1=\operatorname{conv}\{e_1,e_2,c\},
$$

$$
\sigma_2=\operatorname{conv}\{e_2,e_0,c\}
$$

です。

まず

$$
\lambda(c)=0
$$

なら各小三角形のラベル集合は

$$
\sigma_0:\{0,1,0\},
$$

$$
\sigma_1:\{1,2,0\},
$$

$$
\sigma_2:\{2,0,0\}.
$$

従って完全ラベルなのは

$$
\sigma_1
=
\operatorname{conv}\{e_1,e_2,c\}
$$

だけです。

次に

$$
\lambda(c)=1
$$

なら

$$
\sigma_0:\{0,1,1\},
$$

$$
\sigma_1:\{1,2,1\},
$$

$$
\sigma_2:\{2,0,1\}.
$$

従って完全ラベルなのは

$$
\sigma_2
=
\operatorname{conv}\{e_2,e_0,c\}
$$

だけです。

最後に

$$
\lambda(c)=2
$$

なら

$$
\sigma_0:\{0,1,2\},
$$

$$
\sigma_1:\{1,2,2\},
$$

$$
\sigma_2:\{2,0,2\}.
$$

従って完全ラベルなのは

$$
\sigma_0
=
\operatorname{conv}\{e_0,e_1,c\}
$$

だけです。

どの場合も完全ラベル小三角形は1個で、Sperner の補題の「個数は奇数」と一致します。
<!-- solution-end -->

<a id="ex-fix1-a03"></a>

### FIX1-A03 2次元での重心細分の縮小率

- Level: A
- 目安時間: 15分

三角形

$$
\sigma=\operatorname{conv}\{v_0,v_1,v_2\}
$$

を重心細分する。

重心細分後の一つの小三角形の頂点は、頂点、辺の中点、三角形の重心という包含鎖に対応する。

任意の二つのそのような頂点間距離が

$$
\frac23\operatorname{diam}(\sigma)
$$

以下であることを示し、

$$
\operatorname{mesh}(\operatorname{sd}\mathcal T)
\le
\frac23\operatorname{mesh}(\mathcal T)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

一般の証明で使った二面

$$
F\subsetneq G
$$

の重心を考えます。

$F$ の次元を $p$、$G$ の次元を $q$ とすれば、

$$
\|b_F-b_G\|_2
\le
\frac{q-p}{q+1}
\operatorname{diam}(\sigma).
$$

二次元では

$$
0\le p<q\le2.
$$

可能性を調べると、

頂点から辺の重心では

$$
(p,q)=(0,1)
$$

なので係数は

$$
\frac{1}{2}.
$$

辺の重心から三角形の重心では

$$
(p,q)=(1,2)
$$

なので係数は

$$
\frac13.
$$

頂点から三角形の重心では

$$
(p,q)=(0,2)
$$

なので係数は

$$
\frac23.
$$

最大は

$$
\frac23.
$$

重心細分後の小三角形の任意の二頂点は、包含関係を持つ二面の重心です。

従って各小三角形 $\tau$ について

$$
\operatorname{diam}(\tau)
\le
\frac23\operatorname{diam}(\sigma).
$$

元の分割の全三角形で最大を取れば

$$
\operatorname{mesh}(\operatorname{sd}\mathcal T)
\le
\frac23
\operatorname{mesh}(\mathcal T).
$$
<!-- solution-end -->

<a id="ex-fix1-a04"></a>

### FIX1-A04 連続写像からラベルを作る

- Level: A
- 目安時間: 15分

写像

$$
f:\Delta^n\to\Delta^n
$$

と分割頂点

$$
v\in\Delta^n
$$

を考え、

$$
f(v)\ne v
$$

とする。

1. ある $i$ が存在して
   $$
   v_i>f_i(v)
   $$
   となることを示せ。
2. そのような $i$ をラベルに選ぶと
   $$
   i\in\operatorname{supp}(v)
   $$
   となることを示せ。
3. この二段階のどこで
   $$
   \sum_i v_i=\sum_i f_i(v)=1
   $$
   と非負性を使ったか説明せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
d_i=v_i-f_i(v)
$$

と置きます。

$v$ と $f(v)$ はどちらも $\Delta^n$ に属するので

$$
\sum_i v_i=1,
\qquad
\sum_i f_i(v)=1.
$$

従って

$$
\sum_i d_i=0.
$$

また

$$
f(v)\ne v
$$

なので、少なくとも一つの $d_i$ は0ではありません。

もし全ての $d_i$ が非正なら、

$$
d_i\le0
$$

で一つ以上が真に負なので

$$
\sum_i d_i<0
$$

となり、総和0に矛盾します。

従って少なくとも一つ

$$
d_i>0
$$

があり、

$$
v_i>f_i(v)
$$

となります。

次に、そのような $i$ についてもし

$$
v_i=0
$$

なら、$f(v)\in\Delta^n$ から

$$
f_i(v)\ge0
$$

なので

$$
v_i=0>f_i(v)\ge0
$$

という矛盾になります。

従って

$$
v_i>0,
$$

すなわち

$$
i\in\operatorname{supp}(v).
$$

第1段階では座標和がともに1であることを使い、座標差の総和を0にしました。

第2段階では単体の座標の非負性

$$
f_i(v)\ge0
$$

を使い、境界で禁止されるラベルが選ばれないことを示しました。
<!-- solution-end -->

---

## Level B

<a id="ex-fix1-b01"></a>

### FIX1-B01 二次元 Sperner の偶奇証明を再構成する

- Level: B
- 目安時間: 25分

$\Delta^2$ の Sperner ラベル付き三角形分割を考える。

ラベル集合がちょうど

$$
\{0,1\}
$$

である小辺だけを追う。

1. 境界上でこのラベル集合を持つ小辺は、元の辺 $\operatorname{conv}\{e_0,e_1\}$ 上にしか存在しないことを示せ。
2. その元の辺上でラベル集合 $\{0,1\}$ を持つ小辺の個数が奇数であることを一次元の場合から示せ。
3. 各小三角形について、ラベル集合 $\{0,1\}$ を持つ辺の枚数が
   - 完全ラベルなら1
   - ラベル0,1のみを両方含むなら2
   - その他なら0
   となることを示せ。
4. この種の小辺を介して隣接する小三角形を結び、境界側に外部頂点を加えたグラフを作る。次数の偶奇から、完全ラベル小三角形の個数が奇数であることを示せ。

<!-- solution-start -->
#### 詳細解答

境界の元の辺を考えます。

辺

$$
\operatorname{conv}\{e_1,e_2\}
$$

では0番座標が0なので、Sperner 条件によりラベル0は使えません。

従ってこの辺上にラベル集合 $\{0,1\}$ を持つ小辺は存在しません。

同様に

$$
\operatorname{conv}\{e_2,e_0\}
$$

ではラベル1を使えないので、ラベル集合 $\{0,1\}$ を持つ小辺は存在しません。

従って境界上でラベル集合 $\{0,1\}$ を持つ小辺は

$$
\operatorname{conv}\{e_0,e_1\}
$$

上にしかありません。

この辺を一次元単体とみなすと、左端 $e_0$ のラベルは0、右端 $e_1$ のラベルは1です。

細分頂点を順番にたどると、ラベルが0から1、または1から0へ切り替わる小辺が、ちょうどラベル集合 $\{0,1\}$ を持つ小辺です。

始点が0で終点が1なので切り替え回数は奇数です。

従って境界上でラベル集合 $\{0,1\}$ を持つ小辺の個数は奇数です。

次に小三角形を一つ見ます。

完全ラベルなら頂点ラベルは

$$
0,1,2
$$

です。

ラベル2の頂点を除いた辺だけがラベル集合

$$
\{0,1\}
$$

を持つので、そのような辺は1枚です。

ラベルが0と1だけで、両方が現れるなら、3頂点に2種類のラベルを付けるので一方が2回、一方が1回現れます。

重複しているラベルの二頂点のうち一方ずつを除く二つの辺が、ともにラベル集合 $\{0,1\}$ を持ちます。

従ってそのような辺は2枚です。

0または1のどちらかが欠ける場合や、ラベル2を含むが三種類すべては揃わない場合には、ラベル集合 $\{0,1\}$ を持つ辺はありません。

最後に各小三角形をグラフ頂点とし、ラベル集合 $\{0,1\}$ を持つ共通の内部小辺を介する二つを辺で結びます。

境界上でラベル集合 $\{0,1\}$ を持つ小辺に接する三角形は、外部頂点 $\ast$ と結びます。

$\ast$ の次数は、そのような境界小辺の個数なので奇数です。

内部のグラフ頂点で奇次数なのは、上の分類から完全ラベル三角形だけです。

有限グラフの奇次数頂点数は偶数です。

外部頂点 $\ast$ が奇次数頂点を1個占めるので、残る内部の奇次数頂点数は奇数です。

従って完全ラベル小三角形の個数は奇数です。
<!-- solution-end -->

<a id="ex-fix1-b02"></a>

### FIX1-B02 コンパクト凸集合版 Brouwer を射影から導く

- Level: B
- 目安時間: 25分

$C\subset\mathbb R^m$ を非空コンパクト凸集合とし、

$$
f:C\to C
$$

を連続とする。

次の順に Brouwer 不動点定理を導け。

1. ある $R>0$ について
   $$
   C\subset[-R,R]^m
   $$
   となることを示せ。
2. 
   $$
   a_0=(-R,\dots,-R),
   \qquad
   a_i=a_0+2mR\,e_i
   $$
   とした単体
   $$
   S=\operatorname{conv}\{a_0,\dots,a_m\}
   $$
   が $[-R,R]^m$ を含むことを示せ。
3. 最近点射影
   $$
   P_C:\mathbb R^m\to C
   $$
   を使って
   $$
   F=f\circ P_C:S\to S
   $$
   を作り、$F$ が連続であることを示せ。
4. 単体版 Brouwer を $F$ へ適用して得る不動点が、実は $C$ に属し、$f$ の不動点になることを示せ。

<!-- solution-start -->
#### 詳細解答

$C$ はコンパクトなので有界です。

従ってある $M>0$ が存在して

$$
\|x\|_2\le M
$$

が全 $x\in C$ で成立します。

各座標について

$$
|x_i|\le\|x\|_2\le M
$$

なので、例えば

$$
R=M+1
$$

と取れば

$$
C\subset[-R,R]^m.
$$

次に

$$
x\in[-R,R]^m
$$

を任意に取ります。

$$
y=x-a_0
$$

と置くと

$$
0\le y_i\le2R.
$$

従って

$$
\sum_i y_i\le2mR.
$$

$$
t_i=\frac{y_i}{2mR}
\quad(i=1,\dots,m)
$$

と置けば

$$
t_i\ge0,
\qquad
\sum_{i=1}^m t_i\le1.
$$

さらに

$$
t_0=1-\sum_{i=1}^m t_i
$$

と置けば

$$
t_0\ge0,
\qquad
\sum_{i=0}^m t_i=1.
$$

また

$$
\begin{aligned}
\sum_{i=0}^m t_i a_i
&=
a_0+\sum_{i=1}^m t_i(a_i-a_0)\\
&=
a_0+\sum_{i=1}^m
\frac{y_i}{2mR}(2mR e_i)\\
&=
a_0+y\\
&=
x.
\end{aligned}
$$

従って $x\in S$ で、

$$
[-R,R]^m\subset S.
$$

よって

$$
C\subset S.
$$

$C$ はコンパクトなので閉、仮定により凸です。

従って有限次元閉凸集合への射影定理から、各 $x\in\mathbb R^m$ に一意な最近点

$$
P_C(x)\in C
$$

が存在します。

さらに [射影の変分不等式](../OPT2/index.md#thm-opt2-projection-variational-inequality)を $p=P_C(x)$、$q=P_C(y)$ に対して二方向に適用すると

$$
\|p-q\|_2^2
\le
(x-y)^{\mathsf T}(p-q)
\le
\|x-y\|_2\,\|p-q\|_2.
$$

従って

$$
\|P_C(x)-P_C(y)\|_2
\le
\|x-y\|_2,
$$

すなわち $P_C$ は 1-Lipschitz なので連続です。

$f$ も連続なので

$$
F=f\circ P_C
$$

は連続です。

また

$$
F(S)\subset f(C)\subset C\subset S
$$

なので

$$
F:S\to S
$$

は連続自己写像です。

単体版 Brouwer からある

$$
x^*\in S
$$

が存在して

$$
F(x^*)=x^*
$$

となります。

しかし

$$
F(x^*)\in C
$$

なので

$$
x^*=F(x^*)\in C.
$$

$C$ 上では

$$
P_C(x^*)=x^*
$$

です。

従って

$$
x^*
=
F(x^*)
=
f(P_C(x^*))
=
f(x^*).
$$

よって $x^*$ は $f$ の不動点です。
<!-- solution-end -->

<a id="ex-fix1-b03"></a>

### FIX1-B03 三つの仮定を一つずつ外す

- Level: B
- 目安時間: 20分

Brouwer 不動点定理の

1. コンパクト性
2. 凸性
3. 連続性

を一つずつ外したとき、不動点を持たない自己写像の例を一つずつ構成せよ。

さらに各例について、この章の証明のどの機構が使えなくなるか説明せよ。

<!-- solution-start -->
#### 詳細解答

**コンパクト性を外す例**

$$
C=\mathbb R,
\qquad
f(x)=x+1
$$

とします。

$\mathbb R$ は凸で、$f$ は連続自己写像です。

しかし

$$
f(x)=x
$$

なら

$$
x+1=x
$$

となり不可能です。

従って不動点はありません。

この章の証明では、細分から得た代表点列から収束部分列を取り出すためにコンパクト性を使いました。非コンパクト集合では、その極限抽出を一般には保証できません。

**凸性を外す例**

$$
C=S^1
$$

を単位円周とし、

$$
f(x)=-x
$$

とします。

$C$ はコンパクトで $f$ は連続自己写像です。

不動点があれば

$$
-x=x
$$

なので

$$
x=0
$$

ですが、

$$
0\notin S^1.
$$

従って不動点はありません。

コンパクト凸集合版の証明では、閉凸集合への一意な最近点射影を使って大きな単体から $C$ へ連続に戻しました。

円周は凸でないため、例えば原点からの最近点が円周上の全点となり、最近点射影は一意に定まりません。

**連続性を外す例**

$$
C=[0,1]
$$

で

$$
f(x)
=
\begin{cases}
1, & 0\le x<1,\\
0, & x=1
\end{cases}
$$

とします。

$x<1$ では

$$
f(x)=1\ne x,
$$

$x=1$ では

$$
f(1)=0\ne1.
$$

従って不動点はありません。

Sperner 証明では、完全ラベル小単体の頂点列が $x^*$ に収束したとき、

$$
f(v_k)\to f(x^*)
$$

を使って頂点上の不等式を極限点へ渡しました。

不連続だとこの極限移行ができません。
<!-- solution-end -->

---

## Level C

<a id="ex-fix1-c01"></a>

### FIX1-C01 完全ラベル単体から近似的不動点を評価する

- Level: C
- 目安時間: 35分

$n\ge1$ とし、

$$
f:\Delta^n\to\Delta^n
$$

が $L$-Lipschitz、

$$
\|f(x)-f(y)\|_2
\le
L\|x-y\|_2
$$

を満たすとする。

三角形分割に、この章と同じ規則

$$
\lambda(v)=i
\Longrightarrow
v_i>f_i(v)
$$

で Sperner ラベルを付ける。

直径が $\delta$ 以下の完全ラベル小単体 $\sigma$ を一つ取り、ラベル $i$ の頂点を

$$
v^{(i)}
$$

とする。

代表点として

$$
x=v^{(0)}
$$

を取る。

1. 各 $i$ について
   $$
   x_i-f_i(x)>-(1+L)\delta
   $$
   を示せ。
2. 
   $$
   \sum_{i=0}^n(x_i-f_i(x))=0
   $$
   を使い、各 $i$ について
   $$
   x_i-f_i(x)<n(1+L)\delta
   $$
   を示せ。
3. 
   $$
   \|x-f(x)\|_\infty
   \le
   n(1+L)\delta
   $$
   を導け。
4. 初期分割のメッシュを $D$ とし、$k$ 回重心細分したとき
   $$
   \delta_k
   \le
   \left(\frac{n}{n+1}\right)^kD
   $$
   であることを使って、近似不動点誤差が幾何級数的に0へ行くことを示せ。

<!-- solution-start -->
#### 詳細解答

完全ラベルなので、各 $i$ に対してラベル $i$ の頂点

$$
v^{(i)}
$$

が存在します。

ラベル規則から

$$
v_i^{(i)}-f_i(v^{(i)})>0.
$$

また $x$ と $v^{(i)}$ は同じ小単体 $\sigma$ に属し、

$$
\operatorname{diam}(\sigma)\le\delta
$$

なので

$$
\|x-v^{(i)}\|_2\le\delta.
$$

第 $i$ 座標だけを見れば

$$
|x_i-v_i^{(i)}|
\le
\|x-v^{(i)}\|_2
\le
\delta.
$$

従って

$$
x_i-v_i^{(i)}
\ge
-\delta.
$$

さらに $f$ は $L$-Lipschitz なので

$$
\|f(x)-f(v^{(i)})\|_2
\le
L\delta.
$$

よって第 $i$ 座標について

$$
|f_i(x)-f_i(v^{(i)})|
\le
L\delta,
$$

従って

$$
f_i(v^{(i)})-f_i(x)
\ge
-L\delta.
$$

三つの差に分解すると

$$
\begin{aligned}
x_i-f_i(x)
&=
\left(x_i-v_i^{(i)}\right)
+
\left(v_i^{(i)}-f_i(v^{(i)})\right)
+
\left(f_i(v^{(i)})-f_i(x)\right)\\
&>
-\delta+0-L\delta\\
&=
-(1+L)\delta.
\end{aligned}
$$

これで第1問が示せました。

次に

$$
d_i=x_i-f_i(x)
$$

と置きます。

$x,f(x)\in\Delta^n$ なので

$$
\sum_{i=0}^n d_i
=
\sum_i x_i-\sum_i f_i(x)
=
1-1
=
0.
$$

従って固定した $i$ について

$$
d_i
=
-\sum_{j\ne i}d_j.
$$

第1問から、各 $j\ne i$ について

$$
d_j>-(1+L)\delta.
$$

$i$ 以外の添字は $n$ 個あるので

$$
\sum_{j\ne i}d_j
>
-n(1+L)\delta.
$$

両辺にマイナスを掛けると

$$
d_i
<
n(1+L)\delta.
$$

従って全 $i$ で

$$
-(1+L)\delta
<
d_i
<
n(1+L)\delta.
$$

$n\ge1$ なので

$$
|d_i|
\le
n(1+L)\delta.
$$

従って

$$
\boxed{
\|x-f(x)\|_\infty
\le
n(1+L)\delta
}
$$

を得ます。

最後に、$k$ 回重心細分した分割では

$$
\delta_k
\le
\operatorname{mesh}(\mathcal T_k)
\le
\left(\frac{n}{n+1}\right)^kD.
$$

従って各段階で [Sperner の補題](#lem-fix1-sperner)から取った完全ラベル単体の代表点 $x_k$ について

$$
\|x_k-f(x_k)\|_\infty
\le
n(1+L)
\left(\frac{n}{n+1}\right)^kD.
$$

ここで

$$
0<\frac{n}{n+1}<1
$$

なので右辺は幾何級数的に0へ収束します。

つまり有限段階の Sperner 構成だけでも、Lipschitz 定数が分かっていれば不動点残差を明示的に小さくできます。
<!-- solution-end -->
