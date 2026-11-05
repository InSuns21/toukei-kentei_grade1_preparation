# SLT1-05 shatteringとVC次元

<!-- definition-example-audit: strict -->

## 1. 無限個の候補でも、標本上の振る舞いは有限個

前章の[一様リスク偏差](../SLT1-04/index.md#def-slt1-04-uniform-deviation)を有限クラスで評価すると、候補数 $|\mathcal H|$ の対数が現れた。しかし、実数上の閾値 $h_t(x)=\boldsymbol{1}_{\{x\ge t\}}$ は $t\in\mathbb R$ だけ存在する。候補数が無限であることだけを理由に「学習できない」とは言えない。例えば入力を昇順に三点並べると、閾値の予測列は $000,001,011,111$ の四種類しかない。

そこで、**標本上にどれだけ多様な二値ラベル列を作れるか**を測る。ここでは入力集合 $\mathcal X$ は非空、仮説クラス $\mathcal H$ は標本を見る前に固定した非空集合

$$
\mathcal H\subseteq\{h:\mathcal X\to\{0,1\}\}
$$

とする。各 $h$ は二値分類の予測関数である。以後の量はまず組合せ的に定義するため、分布 $P$、標本の独立性、損失関数、確率的な可測性を仮定しない。[0–1損失](../../ML/ML1-01/index.md#def-ml1-01-loss)を使う分類の汎化界につながるのは後続章である。

## 2. 一つの有限集合で実現できるラベル付け

有限個の異なる入力 $A=\{x_1,\ldots,x_m\}$ を固定し、関数を $A$ に制限したときの値の組を考える。「制限」は、元の関数 $h$ から $A$ 上の値だけを抜き出す操作である。この値の組全体が、クラスの**トレース**になる。

<a id="def-slt1-05-trace"></a>

<!-- formal-statement-start -->
> **定義（有限集合上のトレース）**
> 非空の二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ と、相異なる $m\ge0$ 点からなる有限集合 $A=\{x_1,\ldots,x_m\}\subseteq\mathcal X$ に対し、トレースを

$$
\mathcal H|_A
=\{h|_A:h\in\mathcal H\}
\subseteq\{0,1\}^A
$$

> と定める。点の順序を固定して表示する場合は $\{(h(x_1),\ldots,h(x_m)):h\in\mathcal H\}$ と同じ情報を表す。空集合への制限は唯一の空関数であり、$\left|\mathcal H|_\varnothing\right|=1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-05-trace -->
**定義の確認**。$\mathcal X=\mathbb R$、$\mathcal H=\{h_t:t\in\mathbb R\}$、$h_t(x)=\boldsymbol{1}_{\{x\ge t\}}$ とし、$A=\{1,3\}$ をこの順に読む。$t>3$ で $00$、$1<t\le3$ で $01$、$t\le1$ で $11$ が得られる。$10$ は、$h_t(1)=1$ なら $t\le1<3$ なので $h_t(3)=1$ となり不可能である。したがって $\left|\mathcal H|_A\right|=3$。集合 $A$ の要素は相異なり、各 $h_t$ は二値関数なので定義の全条件を満たす。
<!-- definition-example-end -->

二点には $00,01,10,11$ の四通りのラベル付けがあり得る。これらを**全部**作れるかが次の問いである。

<a id="def-slt1-05-shattering"></a>

<!-- formal-statement-start -->
> **定義（shattering：完全分割）**
> 非空の二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ と有限集合 $A\subseteq\mathcal X$ に対し、$\mathcal H$ が $A$ を shatter するとは

$$
\mathcal H|_A=\{0,1\}^A,
\qquad\text{すなわち}\qquad
\left|\mathcal H|_A\right|=2^{|A|}
$$

> が成立することをいう。右辺は $A$ の任意の $0/1$ ラベル付けごとに、それを $A$ 上で実現する仮説が少なくとも一つ存在するという意味である。$\mathcal H$ が非空なら空集合も shatter する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-05-shattering -->
**定義の確認**。前の閾値クラスは $\{1\}$ を shatter する。$t=2$ なら $h_t(1)=0$、$t=1$ なら $h_t(1)=1$ なので $2^1$ 通り全てを実現する。一方 $\{1,3\}$ では $10$ が欠けるため $3<2^2$、shatter しない。単に三通り実現できることと、全てを実現できることは違う。
<!-- definition-example-end -->

shatter できた点の一部だけを残せば、元の各ラベル付けを制限して全パターンをなお作れる。この性質は次の簡単な命題として使う。

<a id="prop-slt1-05-hereditary"></a>

<!-- formal-statement-start -->
> **命題（shatteringの部分集合への遺伝）**
> 二値関数クラス $\mathcal H$ が有限集合 $A$ を shatter し、$B\subseteq A$ なら、$\mathcal H$ は $B$ も shatter する。
<!-- formal-statement-end -->

### 証明の見取り図

$B$ 上の好きなラベル付けを、$A\setminus B$ 上では例えば全部0として $A$ 全体へ延長する。その延長を実現する仮説を $B$ に制限すればよい。

<!-- proof-start -->
### 証明

任意の $g:B\to\{0,1\}$ に対し、$A$ 上の関数 $\widetilde g$ を $B$ では $g$、$A\setminus B$ では0と定める。$\mathcal H|_A=\{0,1\}^A$ なので、ある $h\in\mathcal H$ が $h|_A=\widetilde g$ を満たす。すると $h|_B=\widetilde g|_B=g$。$g$ は任意だから $\mathcal H|_B=\{0,1\}^B$ である。
<!-- proof-end -->

## 3. 点数ごとの成長関数とVC次元

同じ点数でも、どの点を選ぶかでトレースの大きさは変わり得る。最大のパターン数を、点数 $m$ の関数として記録したい。重複入力も許す列で定義すれば、$m$ が入力集合の大きさを超えても定義できる。重複点には常に同じ予測値しか付けられないことに注意する。

<a id="def-slt1-05-growth"></a>

<!-- formal-statement-start -->
> **定義（成長関数：shatter coefficient）**
> 非空の入力集合 $\mathcal X$ と非空の二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ に対し、整数 $m\ge0$ の成長関数を

$$
\Pi_{\mathcal H}(m)
=\max_{(x_1,\ldots,x_m)\in\mathcal X^m}
\left|\{(h(x_1),\ldots,h(x_m)):h\in\mathcal H\}\right|
$$

> と定義する。$m=0$ では $\Pi_{\mathcal H}(0)=1$ とする。実現パターン数は $1,\ldots,2^m$ のいずれかなので、上の最大値は実際に達成される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-05-growth -->
**定義の確認**。前の閾値クラスで $m=2$ とする。異なる二点 $1,3$ は三パターンを与える。一方、同じ点を二回選ぶと $00,11$ の二パターンしかない。任意の二点を昇順にすれば $10$ が作れないので、全ての列について三以下であり、$\Pi_{\mathcal H}(2)=3$。定義は列の最大を取るので、重複列の値2だけを採用しない。
<!-- definition-example-end -->

成長関数は各 $m$ のパターン数を記録する。それを「**何点まで全パターンを実現できるか**」という一つの数に要約すると、無限クラス同士も比較しやすくなる。

<a id="def-slt1-05-vc"></a>

<!-- formal-statement-start -->
> **定義（Vapnik–Chervonenkis次元：VC次元）**
> 非空の二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ に対し、そのVC次元を

$$
\operatorname{VCdim}(\mathcal H)
=\sup\bigl\{|A|:A\subseteq\mathcal X\text{ は有限で、}\mathcal H\text{ が }A\text{ を shatter する}\bigr\}
$$

> と定める。値は $0,1,2,\ldots$ または $+\infty$ とする。空集合は常に shatter されるため、非空クラスのVC次元は0以上である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-05-vc -->
**定義の確認**。仮説クラスが定数0関数一つだけなら、空集合は shatter するが、任意の一つの入力点でラベル1を作れない。ゆえに $\operatorname{VCdim}(\mathcal H)=0$。閾値クラスでは一点を shatter できる一方、異なる二点では左から右へ $10$ を作れない。上の[遺伝命題](#prop-slt1-05-hereditary)により三点以上を shatter できれば二点もできるはずだから、VC次元はちょうど1である。
<!-- definition-example-end -->

成長関数とVC次元の関係を整理しておこう。

<a id="prop-slt1-05-growth-basic"></a>

<!-- formal-statement-start -->
> **命題（成長関数の基本性質）**
> 非空の二値関数クラス $\mathcal H$ について、全ての整数 $m\ge0$ で

$$
1\le\Pi_{\mathcal H}(m)\le2^m,\qquad
\Pi_{\mathcal H}(m)\le\Pi_{\mathcal H}(m+1)
$$

> が成立する。$\mathcal H$ が有限なら $\Pi_{\mathcal H}(m)\le|\mathcal H|$ も成立する。また $\operatorname{VCdim}(\mathcal H)\ge m$ と $\Pi_{\mathcal H}(m)=2^m$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

一列のラベルの候補は $2^m$ 通り以下で、関数の個数も超えられない。列を一点伸ばすと、元のパターンは先頭 $m$ 成分への射影で戻る。最後の同値性では、最大値の達成とshatteringの部分集合への遺伝を組み合わせる。

<!-- proof-start -->
### 証明

非空クラスの値列集合は非空で、$\{0,1\}^m$ の部分集合だから大きさは1以上 $2^m$ 以下である。有限 $\mathcal H$ のとき、$h\mapsto(h(x_1),\ldots,h(x_m))$ の像の大きさは $|\mathcal H|$ 以下である。最大を取っても各上界は保たれる。

任意の列 $(x_1,\ldots,x_m)$ に一つ入力 $x_{m+1}\in\mathcal X$ を付け足す。長さ $m+1$ の値列集合を先頭 $m$ 成分へ射影すると、元の長さ $m$ の値列集合に一致する。射影は元のパターンを消さないので、値列の個数は減らず、最大を取れば $\Pi_{\mathcal H}(m)\le\Pi_{\mathcal H}(m+1)$。

$m\ge1$ で $\Pi_{\mathcal H}(m)=2^m$ なら、最大を達成する列の全ての0–1値列が存在する。同じ入力が二度現れれば、その二座標へ異なるラベルを付けられず、全パターンを実現できない。したがって点は相異なり、その集合が shatter される。

逆に大きさ $m$ の shatter される集合があれば、順序を付けた列で全 $2^m$ 通りを得る。VC次元が $m$ 以上なら、定義の上限は整数値集合の上限だから大きさ $m$ 以上の shatter 集合が存在する。[遺伝命題](#prop-slt1-05-hereditary)によりその $m$ 点部分集合も shatter される。$m=0$ では両辺が常に真である。
<!-- proof-end -->

<a id="cor-slt1-05-finite-vc"></a>

<!-- formal-statement-start -->
> **系（有限クラスのVC次元上界）**
> 非空有限二値関数クラス $\mathcal H$ に $M=|\mathcal H|$ 個の仮説があるとき

$$
\operatorname{VCdim}(\mathcal H)\le\lfloor\log_2M\rfloor.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d$ 点を shatter するには、その点上の $2^d$ 通りを実現するだけの異なる仮説が必要である。

<!-- proof-start -->
### 証明

$d$ 点集合 $A$ を shatter すると $\left|\mathcal H|_A\right|=2^d$。[基本性質](#prop-slt1-05-growth-basic)の有限クラス上界より $2^d\le M$ なので $d\le\log_2M$。$d$ は整数だから $d\le\lfloor\log_2M\rfloor$。これが全 shatter 集合について成立するので上限を取ればよい。
<!-- proof-end -->

逆向きは成り立たない。たとえ仮説が無限個あっても、VC次元が小さい場合がある。それを具体的に数えよう。

## 4. 実数上の閾値：VC次元1

<a id="thm-slt1-05-threshold"></a>

<!-- formal-statement-start -->
> **定理（片側閾値クラスの成長関数）**
> $\mathcal X=\mathbb R$、$\mathcal H_{\rm th}=\{x\mapsto\boldsymbol{1}_{\{x\ge t\}}:t\in\mathbb R\}$ とする。全ての整数 $m\ge0$ について

$$
\Pi_{\mathcal H_{\rm th}}(m)=m+1,
\qquad \operatorname{VCdim}(\mathcal H_{\rm th})=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

入力を小さい順に並べると、閾値を超える場所を動かしても $0$ の列の後ろに $1$ の列が続く形しか作れない。切れ目は $m+1$ 箇所ある。

<!-- proof-start -->
### 証明

まず相異なる $m\ge1$ 点 $x_1<\cdots<x_m$ を選ぶ。$t>x_m$ なら全0、$t\le x_1$ なら全1、$x_j<t\le x_{j+1}$（$1\le j<m$）なら先頭 $j$ 個が0、残りが1である。これらは互いに異なる $m+1$ 通りで、上記以外のラベル列は $h_t$ の単調性から不可能である。

重複のある列で相異なる点が $r\le m$ 個なら、値列はその $r$ 点上の値で一意に決まり、高々 $r+1\le m+1$ 通り。相異なる $m$ 点の構成が上界を達成するので成長関数は $m+1$。$m=0$ では両辺が1になる。

$m=1$ では $\Pi(1)=2=2^1$、$m=2$ では $\Pi(2)=3<2^2$。[成長関数の基本性質](#prop-slt1-05-growth-basic)と[shatteringの部分集合への遺伝](#prop-slt1-05-hereditary)からVC次元は1である。
<!-- proof-end -->

無限個の実数閾値であっても、標本 $m$ 個の上では候補のラベル列が一次式 $m+1$ 個に圧縮される。

## 5. 区間：VC次元2

閾値を二つ使って「連続した範囲だけを1とする」区間分類器を考える。先ほどの $0\cdots01\cdots1$ より自由度は増えるが、離れた二つの1の間だけを0にすることはできない。

<a id="thm-slt1-05-interval"></a>

<!-- formal-statement-start -->
> **定理（閉区間クラスの成長関数）**
> $\mathcal X=\mathbb R$、$\mathcal H_{\rm int}=\{x\mapsto\boldsymbol{1}_{\{a\le x\le b\}}:a,b\in\mathbb R,\ a\le b\}$ とする。任意の整数 $m\ge0$ について

$$
\Pi_{\mathcal H_{\rm int}}(m)
=1+\frac{m(m+1)}2,
\qquad \operatorname{VCdim}(\mathcal H_{\rm int})=2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ソートした点上では、1になる点は空か、連続する添字 $i,\ldots,j$ の一塊である。一塊の端点の選び方は $\sum_{i=1}^m(m-i+1)$ 通り。

<!-- proof-start -->
### 証明

相異なる点 $x_1<\cdots<x_m$ を固定する。閉区間 $[a,b]$ に含まれる標本点の添字は、空集合か $\{i,i+1,\ldots,j\}$（$1\le i\le j\le m$）でなければならない。実際、$x_i,x_j\in[a,b]$ かつ $i<k<j$ なら $a\le x_i<x_k<x_j\le b$ なので $x_k$ も区間に含まれる。

逆に連続塊 $\{i,\ldots,j\}$ は区間 $[x_i,x_j]$ で実現し、空集合は例えば $[x_m+1,x_m+2]$ で実現する。従って相異なる $m$ 点の全パターン数は

$$
1+\sum_{i=1}^m(m-i+1)
=1+\sum_{k=1}^m k
=1+\frac{m(m+1)}2.
$$

重複点を含む列は相異なる $r\le m$ 点上のパターンで決まり、その数は $1+r(r+1)/2$ 以下である。右辺は $r$ に関して非減少なので、相異なる $m$ 点が全列の最大を達成する。$m=0$ も1である。

$m=2$ の成長関数は $1+2\cdot3/2=4=2^2$。$m=3$ では $1+3\cdot4/2=7<8$ で、欠ける列は $101$ である。[基本性質](#prop-slt1-05-growth-basic)からVC次元は2である。
<!-- proof-end -->

これは、無限個の閉区間を使う分類器が有限個の仮説と同じだという意味ではない。有限な**標本上の実現パターン数**だけが二次式で抑えられるという意味である。

## 6. 平面の軸平行矩形：VC次元4

次は二次元の入力 $(x,y)\in\mathbb R^2$ を、座標ごとの区間条件

$$
a\le x\le b,\qquad c\le y\le d
$$

で判定する。軸平行矩形 $[a,b]\times[c,d]$ の内側だけを1とする分類器である。各座標の端点は自由に選ぶが、矩形は回転させない。

<a id="thm-slt1-05-rectangle"></a>

<!-- formal-statement-start -->
> **定理（平面の軸平行矩形のVC次元）**
> $\mathcal X=\mathbb R^2$ とし、$a\le b,\ c\le d$ の全ての閉矩形 $[a,b]\times[c,d]$ の指示関数からなるクラスを $\mathcal H_{\rm rect}$ とする。このとき

$$
\operatorname{VCdim}(\mathcal H_{\rm rect})=4.
$$
<!-- formal-statement-end -->

### 証明の見取り図

下界は四つの十字配置の点 $(1,0),(-1,0),(0,1),(0,-1)$ を使う。上界は、任意の五点から $x$ の最小・最大、$y$ の最小・最大を達成する証人を選ぶ。高々四つの証人を全て含む矩形は、残りの点も含まざるを得ない。

<!-- proof-start -->
### 証明

**下界 $4$。** 四点集合

$$
A=\{(1,0),(-1,0),(0,1),(0,-1)\}
$$

を取る。空のラベル1集合は $[2,3]\times[2,3]$ で実現できる。空でない任意の部分集合 $B\subseteq A$ をラベル1の点集合とする。$B$ の各座標の最小値と最大値を端点とする最小の閉矩形 $Q_B$ を作ると、$B\subseteq Q_B$ である。

一方、$A\setminus B$ の各点 $p$ は、$x=1$、$x=-1$、$y=1$、$y=-1$ のいずれかの方向で **その座標の唯一の極値点** である。$p\notin B$ なら、$B$ のその座標の最大値または最小値は $p$ の座標に届かない。従って $p\notin Q_B$。よって $Q_B\cap A=B$ であり、$A$ の全 $2^4=16$ 通りを実現する。

**上界 $4$。** 任意の相異なる五点集合 $A$ を取る。$x$ 座標の最小点と最大点、$y$ 座標の最小点と最大点をそれぞれ一つずつ選び、その集合を $B$ とする。同じ点が複数役を兼ねてもよいから $|B|\le4$。従って $A\setminus B$ には少なくとも一点 $p$ がある。

$B$ を全て含む軸平行矩形 $Q=[a,b]\times[c,d]$ があれば、証人の極値により

$$
a\le \min_{q\in A}q_x\le p_x\le\max_{q\in A}q_x\le b,
$$

$$
c\le \min_{q\in A}q_y\le p_y\le\max_{q\in A}q_y\le d.
$$

従って $p\in Q$。すなわち「$B$ を全て1、$A\setminus B$ を全て0」というラベル付けは実現できない。任意の五点が shatter されないので、[遺伝命題](#prop-slt1-05-hereditary)により五点より多い集合も shatter できない。上下界を合わせてVC次元は4。
<!-- proof-end -->

証明の二つの方向を混同しないことが大切だ。VC次元が4**以上**を示すには成功する四点配置を一つ示せばよいが、4**以下**を示すには全ての五点配置で欠けるラベル付けがあることを示す必要がある。

## 7. 無限VC次元の例と、次章で証明すること

<a id="prop-slt1-05-infinite-vc"></a>

<!-- formal-statement-start -->
> **命題（有限部分集合の指示関数は無限VC次元）**
> $\mathcal X=\mathbb N$、$\mathcal H_{\rm fin}=\{\boldsymbol{1}_B:B\subseteq\mathbb N\text{ は有限}\}$ とする。このとき任意の整数 $m\ge0$ で

$$
\Pi_{\mathcal H_{\rm fin}}(m)=2^m,
\qquad \operatorname{VCdim}(\mathcal H_{\rm fin})=+\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

どの有限集合 $A$ も、その任意の部分集合 $B$ を予測値1の集合として直接指定できる。

<!-- proof-start -->
### 証明

任意の $m$ 点集合 $A=\{x_1,\ldots,x_m\}\subseteq\mathbb N$ と任意のラベル列 $(y_1,\ldots,y_m)\in\{0,1\}^m$ を取る。$B=\{x_i:y_i=1\}$ は有限集合なので $\boldsymbol{1}_B\in\mathcal H_{\rm fin}$ であり、各 $i$ で $\boldsymbol{1}_B(x_i)=y_i$。従って全ての $A$ を shatter し、任意の $m$ で[基本性質](#prop-slt1-05-growth-basic)から $\Pi_{\mathcal H_{\rm fin}}(m)=2^m$。shatter できる点数に上限がないのでVC次元は無限大。
<!-- proof-end -->

このクラスは、前章の「未観測の点でだけ間違う仮説」の例でも登場した。標本を見てから都合のよい有限部分集合を選ぶと、訓練リスクと真のリスクが大きく離れ得る。ただしここでは、**無限VC次元から全ての学習算法の不可能性を主張していない**。その量化を含む必要性はSLT1-08で扱う。

本章の結果を並べると次のようになる。

| クラス | 仮説の個数 | 成長関数 | VC次元 |
|---|---:|---:|---:|
| 実数の片側閾値 | 無限 | $m+1$ | 1 |
| 実数の閉区間 | 無限 | $1+m(m+1)/2$ | 2 |
| 平面の軸平行矩形 | 無限 | 本章では未計算 | 4 |
| $\mathbb N$ の有限部分集合の指示関数 | 無限 | $2^m$ | $+\infty$ |

VC次元が有限なら、ある点数から先は $2^m$ 通りの全ラベル付けができない。しかし、**それだけでは**成長関数がどの速度で増えるかは分からない。次章のSauer–Shelah補題が、有限VC次元から具体的な多項式上界を導く。さらにその後で確率的な一様汎化界へ進む。

## 演習

### SLT1-05-A01 二点のトレース
- Level: A
- 目安時間: 10分

$\mathcal X=\{a,b,c\}$、$\mathcal H=\{h_0,h_1,h_2\}$ とし、$(h(a),h(b),h(c))$ は順に $000,011,111$ とする。$A=\{a,b\}$、$B=\{b,c\}$ それぞれのトレースと大きさを求め、shatter されるか判定せよ。

<!-- solution-start -->
#### 詳細解答

$A$ 上の値列は $00,01,11$ で、$\left|\mathcal H|_A\right|=3<4=2^{|A|}$。$B$ 上では $00,11,11$ となるため重複を除いて $\{00,11\}$、$\left|\mathcal H|_B\right|=2<4$。従ってどちらも shatter されない。異なる関数が同じ制限を持つ場合に二回数えないことが、[トレースの定義](#def-slt1-05-trace)の要点である。
<!-- solution-end -->

### SLT1-05-A02 一点への制限
- Level: A
- 目安時間: 10分

$\mathcal H$ が三点集合 $\{a,b,c\}$ を shatter するとする。$\{a,c\}$ に対して任意のラベル付けが可能なことを、$\{a,b,c\}$ 上のラベル列の具体的な延長で説明せよ。

<!-- solution-start -->
#### 詳細解答

$\{a,c\}$ 上のラベル $(u,v)\in\{0,1\}^2$ を任意に選ぶ。三点上の列 $(u,0,v)$ に延長すると、shatteringの仮定からこれを実現する $h\in\mathcal H$ がある。その $h$ は $a,c$ 上で $(u,v)$ を実現する。例えば $10$ は三点列 $100$、$01$ は $001$ から得られる。$u,v$ が任意なので[遺伝命題](#prop-slt1-05-hereditary)の具体例になっている。
<!-- solution-end -->

### SLT1-05-A03 閾値三点のパターン
- Level: A
- 目安時間: 10分

$\mathbb R$ 上の $h_t(x)=\boldsymbol{1}_{\{x\ge t\}}$ に対し、入力 $(0,2,5)$ で現れる全ラベル列を列挙し、それぞれを実現する閾値 $t$ を一つずつ示せ。

<!-- solution-start -->
#### 詳細解答

$t=6$ で $000$、$t=3$ で $001$、$t=1$ で $011$、$t=0$ で $111$。それ以外の列にはどこかで1の後に0が現れるが、$x_i<x_j$ で $h_t(x_i)=1$ なら $x_j\ge x_i\ge t$ なので $h_t(x_j)=1$ である。[閾値クラスの定理](#thm-slt1-05-threshold)どおり四通りである。
<!-- solution-end -->

### SLT1-05-A04 一点だけを1とする分類器
- Level: A
- 目安時間: 12分

$\mathcal X=\mathbb R$ とし、$\mathcal H=\{h_a:a\in\mathbb R\}$、$h_a(x)=\boldsymbol{1}_{\{x=a\}}$ とする。$\Pi_{\mathcal H}(m)$（$m\ge1$）とVC次元を求めよ。

<!-- solution-start -->
#### 詳細解答

相異なる $m$ 点上では、$a$ をその点以外に取ると全0、$a=x_j$ と取ると第 $j$ 成分だけ1となる。従って $m+1$ 通り。

重複列でも相異なる入力が $r\le m$ 個なら、全0と $r$ 個の一群だけを1とする列の高々 $r+1$ 通りである。ゆえに

$$
\Pi_{\mathcal H}(m)=m+1.
$$

一点は0と1の両方を実現できるが、二点では $11$ が実現できない。[基本性質](#prop-slt1-05-growth-basic)からVC次元は1。閾値とは形が違っても同じ成長関数になり得る。
<!-- solution-end -->

### SLT1-05-A05 有限クラスの上界
- Level: A
- 目安時間: 10分

八個の二値仮説からなるクラスのVC次元の上界を求めよ。また $\mathcal X=\{1,2,3\}$ 上の全二値関数からなる八個のクラスで、その上界が達成されることを確かめよ。

<!-- solution-start -->
#### 詳細解答

[有限クラスのVC次元上界](#cor-slt1-05-finite-vc)から $\operatorname{VCdim}\le\lfloor\log_2 8\rfloor=3$。全二値関数クラスは三点集合上の $2^3=8$ 通りの値列をちょうど全て含むので $\{1,2,3\}$ を shatter する。入力集合自体が三点だから四点の部分集合はなく、VC次元は3である。
<!-- solution-end -->

### SLT1-05-B01 区間の成長関数を数え直す
- Level: B
- 目安時間: 18分

実数上の閉区間指示関数について、相異なる四点を昇順に並べたときの実現パターン数を、1が連続する塊の長さごとに数えよ。また重複点を選んでもこの最大値を超えないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

四点の上で1が0個の列は $0000$ の一通り。連続する1が $k$ 個なら開始位置は $1,\ldots,5-k$ の $5-k$ 通りなので、$k=1,2,3,4$ について $4,3,2,1$ 通りである。合計は

$$
1+4+3+2+1=11
=1+\frac{4\cdot5}{2}.
$$

どの連続塊も、その両端の標本点を端点とする閉区間で実現できる。重複のある四列が相異なる $r<4$ 点からなるなら、異なる入力ごとに同じ予測値が強制されるので、異なる $r$ 点の区間パターン $1+r(r+1)/2\le11$ に一対一に対応する。よって最大は11。
<!-- solution-end -->

### SLT1-05-B02 二つの区間の和集合
- Level: B
- 目安時間: 22分

$\mathcal H_2$ を、$\mathbb R$ 上で二つ以下の閉区間の和集合の指示関数全体とする（空集合も許す）。VC次元が4であることを示せ。五点で実現不可能な列を一つ明示すること。

<!-- solution-start -->
#### 詳細解答

相異なる四点 $x_1<\cdots<x_4$ を固定する。どの0–1列も、1が連続する塊を高々二つしか持たない。三つの塊には少なくとも $10101$ の五点が必要だからである。一つの塊 $\{x_i,\ldots,x_j\}$ は $[x_i,x_j]$ で実現でき、二つならその二閉区間の和集合で実現できる。全0は空集合で実現できるため、四点を shatter する。

一方、任意の異なる五点を昇順に並べたときの $10101$ は、1の三つの塊が間に0を挟んでいる。一つの区間で離れた二つの1を含めると間の0も必ず含むから、各塊に異なる区間が必要であり二つでは足りない。従ってどの五点も shatter しない。[遺伝命題](#prop-slt1-05-hereditary)よりVC次元は4である。
<!-- solution-end -->

### SLT1-05-B03 矩形の五点上界を検算する
- Level: B
- 目安時間: 20分

平面の五点 $A=\{(0,0),(4,0),(0,3),(4,3),(2,1)\}$ を考える。外側四点を1、内側 $(2,1)$ を0とするラベル付けが軸平行矩形で実現できないことを、不等式で示せ。さらに、この配置を四点下界の証明に使えない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

外側四点を含む矩形 $[a,b]\times[c,d]$ は $(0,0),(4,3)$ を含むため

$$
a\le0,\quad b\ge4,\quad c\le0,\quad d\ge3
$$

を満たす。すると $a\le2\le b$、$c\le1\le d$ だから $(2,1)$ も含む。指定したラベル付けは不可能である。この例は**ある五点配置**の失敗を示すだけで、全ての五点配置を扱う[矩形VC次元定理](#thm-slt1-05-rectangle)の上界証明の代用にはならない。また外側四点だけでも、対角の $(0,0),(4,3)$ を1、残りの二隅を0にすることは不可能だから、この四隅は shatter されない。四点下界には十字配置を使う。
<!-- solution-end -->

### SLT1-05-B04 成長関数とVC次元の関係
- Level: B
- 目安時間: 18分

非空有限クラス $\mathcal H$ が12個の二値仮説を含むとする。$\Pi_{\mathcal H}(3)=8$ が分かっているとき、VC次元の取り得る範囲を求めよ。また $\Pi_{\mathcal H}(4)=16$ ではあり得ない理由を示せ。

<!-- solution-start -->
#### 詳細解答

$\Pi_{\mathcal H}(3)=2^3$ なので[基本性質](#prop-slt1-05-growth-basic)から三点を shatter し、VC次元は3以上。一方[有限クラス上界](#cor-slt1-05-finite-vc)より

$$
\operatorname{VCdim}(\mathcal H)
\le\lfloor\log_2 12\rfloor=3.
$$

従ってVC次元は正確に3である。四点上の値列は各仮説から一つしか得られず、最大でも12通りなので $\Pi_{\mathcal H}(4)\le12<16$。これは単にVC次元が3だからではなく、仮説数の上界から直接確認できる。
<!-- solution-end -->

### SLT1-05-C01 $d$ 次元の軸平行箱
- Level: C
- 目安時間: 35分

整数 $d\ge1$ とし、$\mathbb R^d$ 上の全ての閉じた軸平行箱 $\prod_{j=1}^d[a_j,b_j]$（$a_j\le b_j$）の指示関数からなるクラス $\mathcal H_d$ を考える。

1. 標準基底を $e_1,\ldots,e_d$ として、$A=\{\pm e_1,\ldots,\pm e_d\}$ が shatter されることを証明せよ。
2. 任意の $2d+1$ 点集合を使って、VC次元の上界 $2d$ を示せ。
3. 任意の $m\ge0$ で、成長関数が次の上界を満たす理由を示せ。

$$
\Pi_{\mathcal H_d}(m)\le\left(1+\frac{m(m+1)}2\right)^d.
$$

<!-- solution-start -->
#### 詳細解答

**（1）** $A$ は $2d$ 個の相異なる点からなる。空の1集合は全点から離れた箱で実現する。空でない任意の $B\subseteq A$ について、各座標で最小・最大値を端点とする箱 $Q_B$ を作れば、端点の定義から $B\subseteq Q_B$。

除外した $+e_j$ は第 $j$ 座標で値1を取る唯一の点なので、$B$ のその座標最大値は0以下となる。よって $+e_j\notin Q_B$。除外した $-e_j$ も同じ理由でその座標最小値が0以上となり、箱に入らない。従って

$$
Q_B\cap A=B.
$$

全ラベル付けを実現するからVC次元は少なくとも $2d$。

**（2）** 任意の $2d+1$ 点集合 $A$ を取る。各座標 $j$ について、最小値と最大値を達成する点を一つずつ選ぶ。証人集合 $B$ は高々 $2d$ 点だから、$A\setminus B$ に点 $p$ がある。$B$ を全て含む箱 $Q=\prod_j[a_j,b_j]$ は全ての座標 $j$ で

$$
a_j\le\min_{q\in A}q_j
\le p_j\le\max_{q\in A}q_j\le b_j
$$

を満たす。ゆえに $p\in Q$ となり、$B$ を1、それ以外を0とするラベル付けを実現できない。任意の $2d+1$ 点集合が shatter されないので、[遺伝命題](#prop-slt1-05-hereditary)からVC次元は高々 $2d$。（1）と合わせて $\operatorname{VCdim}(\mathcal H_d)=2d$。

**（3）** $m$ 個の入力を固定する。座標 $j$ が区間 $[a_j,b_j]$ に入る入力の添字集合を $I_j$ と書く。箱のラベル1集合は、各座標条件を全て満たす添字の共通部分

$$
\bigcap_{j=1}^d I_j
$$

である。[区間クラスの成長関数](#thm-slt1-05-interval)より、座標 $j$ の入力列が重複していても、その選択肢は高々 $1+m(m+1)/2$ 通りとなる。

従って組 $(I_1,\ldots,I_d)$ の選択肢は高々その $d$ 乗で、異なる組が同じ共通部分を作る場合はさらに減る。任意の入力列に共通な上界だから、最大を取っても表示式が成立する。これは多項式上界の一例だが、一般の有限VC次元クラスにまでこの区間分解を適用できるわけではない。
<!-- solution-end -->

## まとめ

- **トレース**は有限入力集合上に現れる二値関数の制限全体、**shattering**は全ての二値ラベル付けを実現できる性質である。
- **成長関数**は $m$ 標本上の最大ラベル列数、**VC次元**は shatter できる最大点数を測る。重複入力は余計な自由度を増やさない。
- 閾値はVC次元1、区間は2、平面の軸平行矩形は4。有限仮説数とVC次元は同じ量ではない。
- 有限VC次元から一般の成長関数上界を導くのが次章のSauer–Shelah補題であり、それを汎化確率へ変換するのはさらに後の議論である。
