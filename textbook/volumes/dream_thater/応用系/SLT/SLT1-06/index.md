# SLT1-06 Sauer–Shelah補題

<!-- definition-example-audit: strict -->

## 1. VC次元が有限なら、ラベル列はいくつ残るか

前章では、二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ の[トレース](../SLT1-05/index.md#def-slt1-05-trace)、[shattering](../SLT1-05/index.md#def-slt1-05-shattering)、[成長関数](../SLT1-05/index.md#def-slt1-05-growth)、[VC次元](../SLT1-05/index.md#def-slt1-05-vc)を導入した。ここでも入力集合 $\mathcal X$ とクラス $\mathcal H$ はともに非空で、予測は0か1である。

VC次元が $d$ なら、$d+1$ 点では全 $2^{d+1}$ 通りを作れない。しかし「少なくとも一通り欠ける」という事実だけを $m$ 点へ繰り返しても、ラベル列の総数がどれほど減るかは分からない。目標は、任意の $m$ 点で

$$
\Pi_{\mathcal H}(m)\le
\sum_{j=0}^{\min(d,m)}\binom mj
$$

という**多項式型の上界**を証明することである。例えば $d=2,m=5$ なら右辺は $1+5+10=16$ となり、全 $2^5=32$ 通りの半分以下になる。

ここで $\binom mj$ は $m$ 個から $j$ 個を選ぶ[二項係数](../../../計算系/COMB/COMB2/index.md#def-comb2-binomial)であり、$0\le j\le m$ では $m!/(j!(m-j)!)$、範囲外では0とする。$d=0$ も含めて扱う。分布・独立同分布性・可測性は、今回の組合せ的な不等式には必要ない。確率的な汎化保証は次章で別途導く。

## 2. 一点を削除したとき、何を失うか

有限集合 $A$ 上の二値ラベル列族 $\mathcal F\subseteq\{0,1\}^A$ を考える。まず、$A$ の一点 $x$ を消して、残り $A'=A\setminus\{x\}$ 上の列を見る。消した点では0だった列と1だった列が、同じ残りの列に重なることがある。

この重なりを数えるため、残りのラベル列 $g:A'\to\{0,1\}$ に対して、$x$ に0を付けた延長を $g^{(0)}$、1を付けた延長を $g^{(1)}$ と記す。

<a id="def-slt1-06-deletion-contraction"></a>

<!-- formal-statement-start -->
> **定義（削除族と縮約族）**
> 有限集合 $A$、点 $x\in A$、非空の族 $\mathcal F\subseteq\{0,1\}^A$ に対し、$A'=A\setminus\{x\}$ 上の**削除族** $D_x\mathcal F$ と**縮約族** $C_x\mathcal F$ を

$$
D_x\mathcal F
=\{g\in\{0,1\}^{A'}:g^{(0)}\in\mathcal F
\text{ または }g^{(1)}\in\mathcal F\},
$$

$$
C_x\mathcal F
=\{g\in\{0,1\}^{A'}:g^{(0)}\in\mathcal F
\text{ かつ }g^{(1)}\in\mathcal F\}
$$

> と定める。削除族は少なくとも片方の延長がある列、縮約族は**両方**の延長がある列である。縮約族は空でもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-06-deletion-contraction -->
**定義の確認**。$A=\{a,b\}$ とし、$ab$ の順に

$$
\mathcal F=\{00,01,11\},\qquad x=b
$$

を取る。$a$ 上の列0は $00,01$ の両方に延長できるが、列1は $11$ にだけ延長できる。したがって

$$
D_b\mathcal F=\{0,1\},\qquad
C_b\mathcal F=\{0\}.
$$

いずれも $\{0,1\}^{\{a\}}$ の部分集合で、削除族は非空である。縮約族に列1が入らない理由は、$10$ が元の $\mathcal F$ にないからである。これは「$b=1$ に制限する」操作とは異なる。
<!-- definition-example-end -->

<a id="lem-slt1-06-split"></a>

<!-- formal-statement-start -->
> **補題（削除・縮約の分割恒等式）**
> 有限集合 $A$、$x\in A$、非空の二値ラベル列族 $\mathcal F\subseteq\{0,1\}^A$ に対して

$$
|\mathcal F|=|D_x\mathcal F|+|C_x\mathcal F|
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$x=0$ で現れる残りの列の集合を $F_0$、$x=1$ で現れる集合を $F_1$ とする。元の列数は $|F_0|+|F_1|$、削除は和集合、縮約は共通部分である。

<!-- proof-start -->
### 証明

$F_b=\{g:g^{(b)}\in\mathcal F\}$（$b=0,1$）と置く。各 $f\in\mathcal F$ は $x$ の値 $b$ と残りの制限 $g$ に一意に対応するため、$|\mathcal F|=|F_0|+|F_1|$。定義から

$$
D_x\mathcal F=F_0\cup F_1,\qquad
C_x\mathcal F=F_0\cap F_1.
$$

有限集合の加法公式

$$
|F_0|+|F_1|=|F_0\cup F_1|+|F_0\cap F_1|
$$

を代入すれば結論を得る。縮約族が空でも共通部分の項が0になるだけで成立する。
<!-- proof-end -->

先ほどの三列の例では $3=2+1$ である。ただし、この恒等式だけなら $2^m$ より強い界は出ない。決定的なのは、**両方に延長できる列が作る族では、shatterできる点数が減る**ことである。

## 3. 縮約でVC次元が一つ下がる

<a id="lem-slt1-06-vc-drop"></a>

<!-- formal-statement-start -->
> **補題（削除・縮約とshattering）**
> 有限集合 $A$ と非空の族 $\mathcal F\subseteq\{0,1\}^A$ に対し、$x\in A$ と $B\subseteq A\setminus\{x\}$ を取る。
>
> 1. $D_x\mathcal F$ が $B$ を shatter すれば、$\mathcal F$ も $B$ を shatter する。
> 2. $C_x\mathcal F$ が $B$ を shatter すれば、$\mathcal F$ は $B\cup\{x\}$ を shatter する。
>
> 特に $\operatorname{VCdim}(\mathcal F)\le d$（整数 $d\ge0$）なら、次の評価が成り立つ。

$$
\operatorname{VCdim}(D_x\mathcal F)\le d,\qquad
\operatorname{VCdim}(C_x\mathcal F)\le d-1
$$

> 後者は縮約族が非空の場合に限る。$d=0$ のとき縮約族は空である。
<!-- formal-statement-end -->

### 証明の見取り図

削除族の列には少なくとも一つの延長がある。縮約族の列には0と1の**両方**の延長がある。後者で $B$ の全ラベル付けが作れれば、追加点 $x$ のラベルまで自由に選べる。

<!-- proof-start -->
### 証明

**（1）** 任意のラベル付け $u:B\to\{0,1\}$ を取る。$D_x\mathcal F$ が $B$ を shatter するので、$g\in D_x\mathcal F$ が $g|_B=u$ を満たす。削除族の定義により $g^{(0)}$ または $g^{(1)}$ が $\mathcal F$ にあり、これを $B$ に制限すると $u$ になる。よって $\mathcal F$ が $B$ を shatter する。

**（2）** $B\cup\{x\}$ 上の任意のラベル付け $v$ を取る。$u=v|_B$ と書くと、$C_x\mathcal F$ のshatteringから $g\in C_x\mathcal F$ で $g|_B=u$ となるものがある。$g^{(0)},g^{(1)}$ は両方 $\mathcal F$ に属するので、$v(x)$ に等しい方を選べば $B\cup\{x\}$ 上で $v$ を実現する。従って全 $2^{|B|+1}$ 通りを実現する。

前章の[VC次元の定義](../SLT1-05/index.md#def-slt1-05-vc)に戻る。（1）から削除族がshatterする集合は元の族もshatterする。（2）から、非空の縮約族が大きさ $d$ の集合をshatterすれば元は $d+1$ 点をshatterして矛盾する。ゆえに縮約族のVC次元は $d-1$ 以下。$d=0$ で縮約族に一列でもあればその空集合上の制限は実現でき、元の族は $\{x\}$ をshatterして矛盾するので、縮約族は空である。
<!-- proof-end -->

ここで $B$ は「どれか特定の配置」ではなく、削除後の集合の**任意の部分集合**である。これにより、個数の再帰へ進める。

## 4. Sauer–Shelah補題を帰納法で証明する

先に二項和を

$$
S(m,d)=\sum_{j=0}^{\min(d,m)}\binom mj
\quad(m\ge0,\ d\ge0),\qquad
S(m,-1)=0
$$

と略記する。$d>m$ では $S(m,d)=2^m$ である。また[Pascalの恒等式](../../../計算系/COMB/COMB2/index.md#thm-comb2-pascal) $\binom mj=\binom{m-1}j+\binom{m-1}{j-1}$ を項別に足すと、$m\ge1,d\ge0$ で

$$
S(m,d)=S(m-1,d)+S(m-1,d-1).
$$

これは $d=0$ でも $1=1+0$ として成立する。これから示す定理の証明では、この再帰が先ほどの分割恒等式と正確に一致する。

<a id="thm-slt1-06-sauer-shelah"></a>

<!-- formal-statement-start -->
> **定理（Sauer–Shelah補題：有限集合版）**
> $A$ を $m\ge0$ 点の有限集合、$\mathcal F\subseteq\{0,1\}^A$ を非空の族とする。$\mathcal F$ が $d+1$ 点からなる集合を一つも shatter しない（整数 $d\ge0$）なら

$$
|\mathcal F|\le\sum_{j=0}^{\min(d,m)}\binom mj.
$$

> 特に $d=0$ なら $|\mathcal F|=1$ である。$m\le d$ では右辺は $2^m$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

一点 $x$ を選び、[分割恒等式](#lem-slt1-06-split)で列数を削除族と縮約族へ分ける。[削除・縮約とshatteringの補題](#lem-slt1-06-vc-drop)から、前者の許されるVC次元は高々 $d$、後者は高々 $d-1$。$m-1$ 点での帰納法を両方に適用し、最後に二項係数の再帰で合わせる。

<!-- proof-start -->
### 証明

点数 $m$ に関する帰納法で、全ての整数 $d\ge0$ に対して同時に示す。

**基底 $m=0$。** $A=\varnothing$ 上の二値関数は空関数一つしかない。$\mathcal F$ は非空なので $|\mathcal F|=1=S(0,d)$。

**帰納段階。** $m\ge1$ とし、$m-1$ 点以下の任意の有限集合と任意の非空二値ラベル列族について主張を仮定する。$x\in A$ を一つ固定する。削除族 $D_x\mathcal F$ は非空で、[削除・縮約とshatteringの補題](#lem-slt1-06-vc-drop)により $d+1$ 点をshatterしない。従って帰納法から

$$
|D_x\mathcal F|\le S(m-1,d).
$$

縮約族が空なら $|C_x\mathcal F|=0\le S(m-1,d-1)$ である。非空なら同じ補題より $d$ 点をshatterせず、特に $d\ge1$ なので帰納法を $d-1$ に適用して

$$
|C_x\mathcal F|\le S(m-1,d-1).
$$

両方の場合を合わせ、[分割恒等式](#lem-slt1-06-split)を使うと

$$
\begin{aligned}
|\mathcal F|
&=|D_x\mathcal F|+|C_x\mathcal F|\\
&\le S(m-1,d)+S(m-1,d-1)\\
&=S(m,d).
\end{aligned}
$$

これで全ての $m,d$ の主張が示された。$d=0$ の場合は上界が1で、非空性から下界も1である。
<!-- proof-end -->

**具体的な計算**。$m=4,d=2$ なら、4点上のトレースは

$$
|\mathcal F|\le \binom40+\binom41+\binom42
=1+4+6=11
$$

通り。5点へ増やしたときには $S(4,2)=11$ と $S(4,1)=5$ が足され、$S(5,2)=16$ となる。すべてのラベル列 $2^5=32$ を仮定しているわけではない。

## 5. 成長関数へ移す：重複入力にも注意

<a id="cor-slt1-06-growth"></a>

<!-- formal-statement-start -->
> **系（VC次元による成長関数上界）**
> 非空集合 $\mathcal X$ 上の非空二値関数クラス $\mathcal H\subseteq\{0,1\}^{\mathcal X}$ のVC次元が有限整数 $d$ なら、任意の整数 $m\ge0$ について

$$
\Pi_{\mathcal H}(m)
\le \sum_{j=0}^{\min(d,m)}\binom mj.
$$

> $d=0$ では $\Pi_{\mathcal H}(m)=1$、$m\le d$ では右辺は $2^m$ となる。$d=+\infty$ の場合、この有限 $d$ の上界を適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

同じ入力を複数回含む長さ $m$ の列は、相異なる $r\le m$ 点上のラベルだけで決まる。そこで $r$ 点のトレースに[有限集合版](#thm-slt1-06-sauer-shelah)を適用し、$r$ から $m$ へ上界を広げる。

<!-- proof-start -->
### 証明

任意の入力列 $(x_1,\ldots,x_m)$ を固定し、異なる入力の集合を $A$、その大きさを $r\le m$ とする。元の列上の各ラベル列は、[トレース](../SLT1-05/index.md#def-slt1-05-trace) $\mathcal H|_A$ と一対一に対応する。同じ点の複数の位置では同じ値が現れ、異なるトレースは少なくとも一つの座標で異なるからである。

$\operatorname{VCdim}(\mathcal H)=d$ なので $A$ 上のトレースが $d+1$ 点をshatterすることはない。よって[有限集合版](#thm-slt1-06-sauer-shelah)より

$$
\left|\mathcal H|_A\right|
\le S(r,d)\le S(m,d).
$$

最後の不等式は $S(k+1,d)=S(k,d)+S(k,d-1)\ge S(k,d)$ を $k=r,\ldots,m-1$ で繰り返せば従う。$m=0$ では $\Pi_{\mathcal H}(0)=1$ である。任意の入力列についての上界なので、[成長関数の定義](../SLT1-05/index.md#def-slt1-05-growth)の最大を取って結論となる。
<!-- proof-end -->

この系が言っているのは「**無限個の仮説でも、有限標本上では多項式個の異なる予測列しか作れない**」ということだ。非可算個の仮説が文字どおり有限個に減るのではない。

## 6. 二項和を見やすい多項式界へ

<a id="cor-slt1-06-polynomial"></a>

<!-- formal-statement-start -->
> **系（二項和の簡易上界）**
> 整数 $m\ge d\ge1$ について

$$
\sum_{j=0}^{d}\binom mj\le
\left(\frac{em}{d}\right)^d
$$

> が成り立つ。従ってVC次元が $d$ の二値関数クラスでは、$m\ge d$ のとき $\Pi_{\mathcal H}(m)\le(em/d)^d$ である。$d=0$ は別に $\Pi_{\mathcal H}(m)=1$ と扱う。
<!-- formal-statement-end -->

### 証明の見取り図

$p=d/m\le1$ として二項展開 $(1+p)^m$ を使う。$j\le d$ の項を下から $p^d$ 倍で押さえ、最後に $1+u\le e^u$ を用いる。

<!-- proof-start -->
### 証明

$p=d/m\in(0,1]$ なら $0\le j\le d$ で $p^j\ge p^d$。二項係数は非負なので

$$
\begin{aligned}
p^d\sum_{j=0}^{d}\binom mj
&\le\sum_{j=0}^{d}\binom mj p^j\\
&\le\sum_{j=0}^{m}\binom mj p^j
=(1+p)^m.
\end{aligned}
$$

$p^d>0$ で割り、$1+p\le e^p$ と $mp=d$ を順に使うと

$$
\sum_{j=0}^{d}\binom mj
\le p^{-d}(1+p)^m
\le\left(\frac{m}{d}\right)^d e^{mp}
=\left(\frac{em}{d}\right)^d.
$$

最後に[成長関数上界](#cor-slt1-06-growth)を適用する。
<!-- proof-end -->

固定した $d$ に対して右辺は $m^d$ の定数倍であり、指数関数 $2^m$ とは増え方が異なる。対数を取ると

$$
\log\Pi_{\mathcal H}(m)
\le d\log\left(\frac{em}{d}\right)
\quad(m\ge d\ge1).
$$

ただしこれは標本上のラベル列数の評価であって、リスク差の確率や標本複雑度をこの式だけで結論できるわけではない。

## 7. 上界が鋭い例と、鋭くない例

「有限VC次元のクラスは必ず二項和と等しくなる」と読み違えないため、二種類の例を計算する。

<a id="prop-slt1-06-sharp"></a>

<!-- formal-statement-start -->
> **命題（Sauer–Shelah上界の達成）**
> 無限集合 $\mathcal X$ と整数 $d\ge0$ に対し、$\mathcal H_{\le d}$ を

$$
\mathcal H_{\le d}
=\{\boldsymbol{1}_B:B\subseteq\mathcal X,\ |B|\le d\}
$$

> とする。このとき $\operatorname{VCdim}(\mathcal H_{\le d})=d$ であり、すべての整数 $m\ge0$ について

$$
\Pi_{\mathcal H_{\le d}}(m)
=\sum_{j=0}^{\min(d,m)}\binom mj.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d$ 点ならどの1集合も高々 $d$ 点なので実現できるが、$d+1$ 点で全て1にはできない。$m$ 個の相異なる入力では、1にする位置を $0,\ldots,\min(d,m)$ 個選ぶ全ての方法が実現できる。

<!-- proof-start -->
### 証明

$d=0$ なら $\mathcal H_{\le0}$ は定数0関数だけを含み、空集合のみをshatterするのでVC次元0である。

$d\ge1$ なら、$\mathcal X$ が無限なので相異なる $d$ 点集合 $A$ を取れる。任意のラベル付け $u:A\to\{0,1\}$ に対し、$B=\{x\in A:u(x)=1\}$ は $|B|\le d$ なので $\boldsymbol{1}_B\in\mathcal H_{\le d}$ が $u$ を実現する。従って $A$ はshatterされる。一方任意の $d+1$ 点集合では全点を1とするラベル付けを実現するには $|B|\ge d+1$ が必要であり、定義に反する。VC次元はちょうど $d$ である。

次に任意の相異なる $m$ 点を選ぶ。その上のラベル付けのうち1の個数が $j\le d$ であるものは、1にする添字を選ぶ $\binom mj$ 通りで、各々をその添字集合 $B$ の指示関数が実現する。1が $d+1$ 個以上なら実現できない。従って相異なる $m$ 点で二項和の個数を達成する。逆方向は[成長関数上界](#cor-slt1-06-growth)が保証するので等号となる。
<!-- proof-end -->

一方、$\mathcal X=\mathbb N$ 上で定数0関数と一点 $a$ だけを1にする関数の**二つ**からなるクラスはVC次元1だが、$\Pi(m)=2$（$m\ge1$）である。前章の[閾値クラスの成長関数](../SLT1-05/index.md#thm-slt1-05-threshold)はVC次元が同じ1でも $\Pi(m)=m+1$ だった。つまりVC次元は最悪の場合の上界を与えるが、成長関数を一意には定めない。

## 8. どこまでが証明されたか

本章の論理は

1. トレースを削除族・縮約族に分けると個数が加法的になる。
2. 縮約族が $d$ 点をshatterすれば、元の族は $d+1$ 点をshatterする。
3. よって $S(m,d)=S(m-1,d)+S(m-1,d-1)$ で個数を抑えられる。
4. 重複点を含む列にも上界を移せる。

という順序で閉じている。二値性が重要で、実数値関数クラスにそのまま $2^m$ と二項和を当てはめてはいけない。さらに統計学へ進むには、訓練データの確率分布と、観測上の多数の仮説の偏差を**同時に**抑える証明が必要になる。次章でその橋を架ける。

## 演習

### SLT1-06-A01 削除と縮約を手で数える
- Level: A
- 目安時間: 12分

$A=\{a,b,c\}$ 上の族 $\mathcal F=\{000,001,011,111\}$（順序は $a,b,c$）を取り、$x=c$ とする。$D_c\mathcal F,C_c\mathcal F$ を列挙し、分割恒等式を検算せよ。

<!-- solution-start -->
#### 詳細解答

$c=0$ を持つ元は $000$ のみで残り $ab$ は $00$。$c=1$ の元は $001,011,111$ で、残りは $00,01,11$。ゆえに

$$
F_0=\{00\},\quad F_1=\{00,01,11\},
$$

$$
D_c\mathcal F=\{00,01,11\},\quad C_c\mathcal F=\{00\}.
$$

数は $|\mathcal F|=4=3+1$。$00$ は両方の延長 $000,001$ があるから縮約族に入り、$01$ は $010$ が欠けるので入らない。
<!-- solution-end -->

### SLT1-06-A02 二項和の再帰
- Level: A
- 目安時間: 10分

$S(4,2)$、$S(4,1)$、$S(5,2)$ を直接計算し、Pascalの再帰が成立することを確かめよ。

<!-- solution-start -->
#### 詳細解答

$S(4,2)=\binom40+\binom41+\binom42=1+4+6=11$、$S(4,1)=1+4=5$。一方 $S(5,2)=1+5+10=16$ で、$11+5=16$ と一致する。各項の由来は $\binom5j=\binom4j+\binom4{j-1}$ であり、単なる数値の偶然ではない。
<!-- solution-end -->

### SLT1-06-A03 VC次元0の意味
- Level: A
- 目安時間: 12分

非空の二値関数クラス $\mathcal H$ について、$\operatorname{VCdim}(\mathcal H)=0$ と「$\mathcal H$ に属する関数はすべて同じ関数である」が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答

VC次元0ならどの一点集合 $\{x\}$ もshatterできない。もし $h,g\in\mathcal H$ で $h(x)\ne g(x)$ となる $x$ があれば、二値なので一方が0、他方が1を実現し、$\{x\}$ はshatterされる。矛盾である。従って任意の $h,g,x$ で $h(x)=g(x)$、関数として一致する。逆に全関数が一致すれば各一点では高々一ラベルしか現れず、一点をshatterできない。空集合は非空クラスでshatterされるのでVC次元は0である。
<!-- solution-end -->

### SLT1-06-A04 二点以下だけ1にできるクラス
- Level: A
- 目安時間: 12分

$\mathcal X=\mathbb N$ 上の $|B|\le2$ を満たす $B$ の指示関数全体を $\mathcal H$ とする。三点と四点での実現パターン数を求め、VC次元を確認せよ。

<!-- solution-start -->
#### 詳細解答

相異なる三点では、1が0個、1個、2個の列をすべて実現し、その数は $1+3+3=7$。四点では $1+4+6=11$。任意の二点のラベル付けでは1集合の大きさが2以下なのでshatterするが、三点すべて1は $|B|=3$ を要するため実現できない。よってVC次元2であり、両数とも[等号達成の命題](#prop-slt1-06-sharp)に一致する。
<!-- solution-end -->

### SLT1-06-A05 同じVC次元でも成長関数は違う
- Level: A
- 目安時間: 12分

$\mathcal X=\mathbb N$、$h_0(x)=0$、$h_1(x)=\boldsymbol{1}_{\{x=1\}}$ として $\mathcal H=\{h_0,h_1\}$ を取る。$\operatorname{VCdim}(\mathcal H)$ と $\Pi_{\mathcal H}(m)$（$m\ge1$）を求め、Sauer–Shelah上界との等号条件を述べよ。

<!-- solution-start -->
#### 詳細解答

点1上で $h_0(1)=0,h_1(1)=1$ なので一点をshatterする。二関数しかないので[有限クラスのVC次元上界](../SLT1-05/index.md#cor-slt1-05-finite-vc)からVC次元は1以下、従って1。任意の列上のパターン数は二関数から高々2通りで、列が点1を含めば二つの値列は異なる。ゆえに $\Pi_{\mathcal H}(m)=2$。Sauer–Shelah上界 $S(m,1)=m+1$ と等しくなるのは $m=1$ のときだけで、$m\ge2$ では真に小さい。
<!-- solution-end -->

### SLT1-06-B01 縮約族の次元が下がる理由
- Level: B
- 目安時間: 20分

有限集合 $A$ 上の非空二値族 $\mathcal F$ のVC次元が高々2とする。任意の $x\in A$ について、$C_x\mathcal F$ が二点をshatterできないことを、任意の二点の全ラベル付けの延長を明示して証明せよ。また縮約族が空なら何が変わるか述べよ。

<!-- solution-start -->
#### 詳細解答

もし縮約族が異なる二点 $u,v\in A\setminus\{x\}$ をshatterしたら、任意の $(\alpha,\beta)\in\{0,1\}^2$ に対して $g\in C_x\mathcal F$ で $(g(u),g(v))=(\alpha,\beta)$ となる。縮約族の定義から、この同じ $g$ の $x=0$ と $x=1$ の延長が両方 $\mathcal F$ にある。従って任意の $(\alpha,\beta,\gamma)\in\{0,1\}^3$ について、$\gamma$ の方の延長を選ぶことで $(u,v,x)$ 上の値列を実現できる。これは三点をshatterするのでVC次元高々2と矛盾。縮約族が空ならそもそも実現する列がなく、VC次元を定義せず $|C_x\mathcal F|=0$ と数えれば十分である。
<!-- solution-end -->

### SLT1-06-B02 多項式上界を導出する
- Level: B
- 目安時間: 20分

VC次元 $d=2$ の非空二値関数クラスについて、$m=20$ の成長関数の二項和上界を計算せよ。さらに $m\ge d\ge1$ の一般形 $\Pi_{\mathcal H}(m)\le(em/d)^d$ を、$p=d/m$ の二項展開から導出せよ。

<!-- solution-start -->
#### 詳細解答

$S(20,2)=\binom{20}0+\binom{20}1+\binom{20}2=1+20+20\cdot19/2=211$。全二値列は $2^{20}=1048576$ 通りなので、上界は大幅に小さい。

一般に $p=d/m\in(0,1]$ と取ると $j\le d$ で $p^j\ge p^d$。従って

$$
p^d S(m,d)\le \sum_{j=0}^{m}\binom mj p^j
=(1+p)^m\le e^{mp}=e^d.
$$

$p^d$ で割ると $S(m,d)\le e^d(m/d)^d=(em/d)^d$。[成長関数上界](#cor-slt1-06-growth)から $\Pi_{\mathcal H}(m)$ についても同じ界を得る。これは二項和より通常粗いが、多項式次数が明確になる。
<!-- solution-end -->

### SLT1-06-B03 二項和以下ならVC次元も小さいか
- Level: B
- 目安時間: 20分

$\mathcal X=\mathbb N$ 上で、$\{1,2,3\}$ だけに任意の0–1値を与え、その外は常に0とする8個の関数からなるクラスを考える。VC次元と $\Pi_{\mathcal H}(4)$ を求め、$\Pi_{\mathcal H}(4)\le S(4,2)$ だからVC次元が2以下だと推論できるか判定せよ。

<!-- solution-start -->
#### 詳細解答

$\{1,2,3\}$ 上で全8通りを実現するのでVC次元は3以上。一方その外は全関数が0で、四点をshatterするには特殊三点の外も必要になるため不可能である。よってVC次元3。

任意の四点列上で値列は元の8関数から高々8通り。$1,2,3$ をすべて含む四点列を取れば三点上の8通りが区別されるので $\Pi_{\mathcal H}(4)=8$。他方 $S(4,2)=1+4+6=11$。ゆえに $8\le11$ は真だがVC次元は3である。Sauer–Shelahは「VC次元 $\le d$ なら全 $m$ に上界」を示す片方向であり、特定の $m$ 一個での大小を逆向きに使うことはできない。
<!-- solution-end -->

### SLT1-06-B04 閾値クラスを削除・縮約で追う
- Level: B
- 目安時間: 20分

$x_1<\cdots<x_m$ 上の片側閾値クラスのトレースを $\mathcal F_m$ とし、最後の点 $x_m$ を削除する。$m\ge2$ で $|D_{x_m}\mathcal F_m|$ と $|C_{x_m}\mathcal F_m|$ を求め、$|\mathcal F_m|=m+1$ をこの分割から再導出せよ。

<!-- solution-start -->
#### 詳細解答

閾値による列は先頭から0が並び、その後1が並ぶものに限る。最後を削除すると先頭 $m-1$ 点で可能な全ての $0\cdots01\cdots1$ 列が残り、[閾値の計数](../SLT1-05/index.md#thm-slt1-05-threshold)から $|D_{x_m}\mathcal F_m|=m$。

同じ先頭 $m-1$ 点のラベル列について、最後 $x_m$ に0と1の両方を付けても閾値列であるためには、先頭の値が全て0でなければならない。先頭に1が一つでもあれば最後を0にした列は単調性に反する。全0の先頭列なら全0の延長（閾値 $t>x_m$）と末尾だけ1の延長（$x_{m-1}<t\le x_m$）が存在する。ゆえに縮約族は一列のみで、分割恒等式より $|\mathcal F_m|=m+1$。これは $S(m,1)$ と一致する。
<!-- solution-end -->

### SLT1-06-C01 有限入力集合での等号と飽和
- Level: C
- 目安時間: 35分

入力集合 $\mathcal X$ がちょうど $N\ge1$ 点からなり、整数 $0\le d\le N$ とする。$\mathcal H_{\le d}=\{\boldsymbol{1}_B:B\subseteq\mathcal X,\ |B|\le d\}$ を考える。

（1）VC次元が $d$ であることを証明せよ。（2）$m\le N$ と $m>N$ のそれぞれについて $\Pi_{\mathcal H_{\le d}}(m)$ を正確に求め、重複入力の効果を説明せよ。（3）$N=3,d=1,m=5$ の値を求め、無限入力集合での等号達成の式と比較せよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $d\ge1$ のとき相異なる $d$ 点集合 $A$ を選べる。$A$ の任意の1集合 $B$ は $|B|\le d$ だからその指示関数でラベルを実現し、$A$ をshatterする。$d<N$ なら任意の $d+1$ 点を全て1とするラベルは $|B|\ge d+1$ を要し不可能。$d=N$ ならそれより大きい部分集合はそもそも存在しない。従ってVC次元は $d$。$d=0$ の場合は定数0関数だけなので、[VC次元の定義](../SLT1-05/index.md#def-slt1-05-vc)からVC次元0となる。

**（2）** 長さ $m$ の入力列に相異なる $r\le\min(m,N)$ 点が含まれるとする。ラベル列はその $r$ 点のどれを1にするかで決まり、1点集合の大きさが $d$ 以下という条件から正確に

$$
\sum_{j=0}^{\min(d,r)}\binom rj=S(r,d)
$$

通りである。$r$ を1増やしたとき $S(r+1,d)-S(r,d)=S(r,d-1)\ge0$ なので、最大は $r=\min(m,N)$ で達成される。従って

$$
\Pi_{\mathcal H_{\le d}}(m)=
\begin{cases}
\displaystyle\sum_{j=0}^{\min(d,m)}\binom mj,&0\le m\le N,\\
\displaystyle\sum_{j=0}^{d}\binom Nj,&m>N.
\end{cases}
$$

$m>N$ では必ず重複が起こり、異なる点を $N$ 個以上に増やせないため成長が止まる。$d=0$ の場合も両式は1となる。

**（3）** $N=3,d=1,m=5$ では $\Pi(5)=\binom30+\binom31=1+3=4$。一方、無限入力集合で同じVC次元1なら[等号達成命題](#prop-slt1-06-sharp)から $S(5,1)=1+5=6$ 通りを実現できる。有限入力集合では五つの相異なる点が用意できないので、Sauer–Shelahの上界6は正しいが鋭くない。
<!-- solution-end -->
