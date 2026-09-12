# F0-00A1D 補講：順序・全順序・最小最大・整列

<!-- definition-example-audit: strict -->

選択公理や Zorn の補題では、

- 全順序
- 最小元・最大元
- 整列
- 整列可能

という語が一気に現れます。これらを「大小関係っぽいもの」と曖昧に読まず、ここで順序構造として固定します。

---

## 1. 二項関係

<a id="def-f0-00a1d-binary-relation"></a>

<!-- formal-statement-start -->
> **定義（二項関係）**  
> 集合 $X$ に対して、直積 $X\times X$ の部分集合 $R\subseteq X\times X$ を $X$ 上の **二項関係** という。$(x,y)\in R$ の代わりに

$$
xRy
$$

> と書くことが多い。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-binary-relation -->
### 1.1 定義の確認

**定義の確認**

実数上の $\le$ は二項関係です。

$$
x\le y
$$

である実数の組 $(x,y)$ 全体を集めれば、$\mathbb R\times\mathbb R$ の部分集合になります。
<!-- definition-example-end -->

---

## 2. 順序関係（半順序）

<a id="def-f0-00a1d-partial-order"></a>

<!-- formal-statement-start -->
> **定義（順序関係・半順序）**  
> 集合 $X$ 上の二項関係 $\preceq$ が任意の $x,y,z\in X$ に対して
> 1. 反射律：$x\preceq x$、
> 2. 反対称律：$x\preceq y$ かつ $y\preceq x$ なら $x=y$、
> 3. 推移律：$x\preceq y$ かつ $y\preceq z$ なら $x\preceq z$
> 
> を満たすとき、$\preceq$ を $X$ 上の **順序関係（半順序）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-partial-order -->
### 2.1 定義の確認：包含関係

**定義の確認**

$\mathcal P(X)$ 上の包含関係 $\subseteq$ は順序関係です。

- $A\subseteq A$。
- $A\subseteq B$ かつ $B\subseteq A$ なら $A=B$。
- $A\subseteq B$ かつ $B\subseteq C$ なら $A\subseteq C$。

ただし二つの集合が常に比較できるとは限りません。
<!-- definition-example-end -->

---

## 3. 全順序

<a id="def-f0-00a1d-total-order"></a>

<!-- formal-statement-start -->
> **定義（全順序）**  
> 順序関係 $\preceq$ がさらに任意の $x,y\in X$ に対して

$$
x\preceq y
\quad\text{または}\quad
y\preceq x
$$

> を満たすとき、$\preceq$ を **全順序** または **線形順序** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-total-order -->
### 3.1 定義の確認

**定義の確認**

$\mathbb R$ の通常の $\le$ は全順序です。任意の二実数 $x,y$ は必ず比較できます。

一方、$\mathcal P(\{1,2\})$ の包含関係では $\{1\}$ と $\{2\}$ が比較できないので、順序関係ではありますが全順序ではありません。
<!-- definition-example-end -->

---

## 4. 最小元と最大元

<a id="def-f0-00a1d-minimum-maximum"></a>

<!-- formal-statement-start -->
> **定義（最小元・最大元）**  
> 順序集合 $(X,\preceq)$ の元 $m\in X$ が

$$
m\preceq x
\qquad(\forall x\in X)
$$

> を満たすとき $m$ を $X$ の **最小元** という。また $M\in X$ が

$$
x\preceq M
\qquad(\forall x\in X)
$$

> を満たすとき $M$ を $X$ の **最大元** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-minimum-maximum -->
### 4.1 定義の確認

**定義の確認**

通常の順序を入れた集合

$$
X=\{2,5,9\}
$$

では、2が最小元、9が最大元です。

一方、$\mathbb Z$ 全体には通常の順序で最小元も最大元もありません。
<!-- definition-example-end -->

ここでの最大元は「全要素以上」である元です。後の Zorn の補題で出る **極大元** は別概念なので、F0-00A3で区別します。

---

## 5. 整列

<a id="def-f0-00a1d-well-order"></a>

<!-- formal-statement-start -->
> **定義（整列）**  
> 集合 $X$ 上の全順序 $\preceq$ が、$X$ の任意の非空部分集合 $A\subseteq X$ に最小元を持たせるとき、$\preceq$ を $X$ の **整列** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-well-order -->
### 5.1 定義の確認

**定義の確認**

$\mathbb N$ の通常の順序は整列です。自然数の任意の非空部分集合には最小元があります。

一方、$\mathbb Z$ の通常の順序は全順序ですが整列ではありません。非空部分集合 $\mathbb Z$ 自身に最小元がないからです。
<!-- definition-example-end -->

したがって

$$
\text{整列}\Longrightarrow\text{全順序}
$$

ですが、逆は一般には成り立ちません。

---

## 6. 整列可能

<a id="def-f0-00a1d-well-orderable"></a>

<!-- formal-statement-start -->
> **定義（整列可能）**  
> 集合 $X$ 上に少なくとも一つ整列を入れることができるとき、$X$ は **整列可能** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a1d-well-orderable -->
### 6.1 定義の確認

**定義の確認**

$\mathbb Z$ は通常の順序では整列されていませんが、例えば

$$
0,1,-1,2,-2,3,-3,\ldots
$$

の順に並べることで整列を入れられます。したがって $\mathbb Z$ は整列可能です。
<!-- definition-example-end -->

重要なのは、

> 「今与えられている順序が整列である」

と

> 「何らかの整列を入れられる」

が別の主張だということです。

---

## 7. 次の選択公理への接続

次章では、ZF の上で

$$
\boxed{
\text{選択公理}
\iff
\text{Zornの補題}
\iff
\text{任意の集合が整列可能}
}
$$

という同値性を位置付けます。最後の命題が **整列可能定理** です。

この章で「整列可能」の意味を先に固定したので、次章では定理の中身を未定義語なしで読めます。

---

## 8. 演習

### F0-00A1D-A01 全順序と整列を区別する

- Level: A
- 目安時間: 7分

通常の順序を入れた $\mathbb Z$ について、全順序か、整列かをそれぞれ判定せよ。

<!-- solution-start -->
#### 詳細解答
任意の二整数は通常の大小で比較できるので全順序である。一方、非空部分集合 $\mathbb Z$ 自身に最小元が存在しないため整列ではない。

#### 本番答案
通常の $\le$ は $\mathbb Z$ 上の全順序だが、$\mathbb Z$ 自身に最小元がないため整列ではない。

#### 採点基準（20点）
- 全順序の判定: 8点
- 整列でない判定: 8点
- 最小元不存在の理由: 4点
<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00A1D-A02 包含関係は全順序か

- Level: A
- 目安時間: 7分

$X=\{1,2\}$ とし $\mathcal P(X)$ を包含関係 $\subseteq$ で順序付ける。これは半順序か、全順序かを判定せよ。

<!-- solution-start -->
#### 詳細解答
包含関係は反射律・反対称律・推移律を満たすので半順序である。しかし $\{1\}$ と $\{2\}$ は
$$
\{1\}\nsubseteq\{2\},\qquad \{2\}\nsubseteq\{1\}
$$
で比較不能なので全順序ではない。

#### 本番答案
半順序だが全順序ではない。反例は $\{1\},\{2\}$。
<!-- solution-end -->

### F0-00A1D-A03 整列の部分集合

- Level: A
- 目安時間: 7分

$\mathbb N$ の通常順序を考える。$A=\{2,4,6,\ldots\}$ と $B=\{n\in\mathbb N:n\ge100\}$ の最小元を求めよ。また、この例が整列の定義とどう対応するか述べよ。

<!-- solution-start -->
#### 詳細解答
$A$ の最小元は2、$B$ の最小元は100である。整列とは、特定の部分集合だけでなく **任意の非空部分集合** が最小元を持つことを要求する。これらはその具体例である。

#### 本番答案
$$
\min A=2,\qquad \min B=100.
$$
整列では任意の非空部分集合について同様の最小元の存在を要求する。
<!-- solution-end -->

### F0-00A1D-B01 整列を部分集合へ制限する

- Level: B
- 目安時間: 10分

$(X,\preceq)$ が整列集合で、$A\subseteq X$ とする。$\preceq$ を $A$ に制限した順序も $A$ の整列になることを示せ。

<!-- solution-start -->
#### 詳細解答
整列順序の制限は反射律・反対称律・推移律・比較可能性をそのまま保つので $A$ 上の全順序である。次に任意の非空部分集合 $B\subseteq A$ を取る。$B$ は同時に $X$ の非空部分集合でもあるから、$X$ の整列性により $B$ は最小元 $b_0$ を持つ。$b_0\in B\subseteq A$ であり、制限順序でも全ての $b\in B$ に $b_0\preceq b$。従って $A$ は整列される。

#### 本番答案
任意の非空 $B\subseteq A$ は $X$ の非空部分集合でもあるので、$X$ の整列性から最小元を持つ。よって制限順序は $A$ の整列である。
<!-- solution-end -->

### F0-00A1D-B02 $\mathbb Z$ を具体的に整列する

- Level: B
- 目安時間: 12分

$\mathbb Z$ を
$$
0\prec1\prec-1\prec2\prec-2\prec3\prec-3\prec\cdots
$$
の順に並べる。この順序が整列になる理由を、$\mathbb N$ への順位写像を使って説明せよ。

<!-- solution-start -->
#### 詳細解答
各整数に順位
$$
r(0)=0,\qquad r(n)=2n-1\ (n>0),\qquad r(-n)=2n\ (n>0)
$$
を割り当てる。これは $\mathbb Z$ から $\mathbb N\cup\{0\}$ への全単射であり、$a\prec b$ を $r(a)<r(b)$ で定めたものが上の順序である。

任意の非空 $A\subseteq\mathbb Z$ に対し $r(A)$ は自然数の非空部分集合なので最小元 $m$ を持つ。$r(a_0)=m$ となる $a_0\in A$ が $A$ の最小元である。従ってこの順序は整列である。

#### 本番答案
上の順位写像 $r$ で通常の自然数順序を $\mathbb Z$ へ移す。非空部分集合の順位集合 $r(A)$ は最小元を持つので、対応する整数が $A$ の最小元となる。
<!-- solution-end -->

---

<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1D-A04 最小元と「小さい元」を区別する

- Level: A
- 目安時間: 7分

通常順序を入れた $A=(0,1]$ について最小元が存在するか判定せよ。また、$\inf A$ との違いを述べよ。

<!-- solution-start -->
#### 詳細解答
$A$ の最小元は存在しない。実際、任意の $x\in(0,1]$ に対して $x/2\in(0,1]$ かつ $x/2<x$ だからである。一方 $0$ は $A$ の最大の下界なので $\inf A=0$。最小元は集合の要素でなければならないが、下限は集合外でもよい。

#### 本番答案
最小元なし。$\inf A=0$ だが $0\notin A$。
<!-- solution-end -->

### F0-00A1D-B03 半順序で最小元は一意

- Level: B
- 目安時間: 10分

半順序集合 $(P,\preceq)$ に最小元が存在するとき、それが一意であることを示せ。

<!-- solution-start -->
#### 詳細解答
$m,m'$ がともに最小元だとする。$m$ は最小元なので $m\preceq m'$。同様に $m'$ は最小元なので $m'\preceq m$。半順序の反対称律から $m=m'$。従って最小元は高々一つ。

#### 本番答案
二つの最小元 $m,m'$ があれば $m\preceq m'$ かつ $m'\preceq m$。反対称律より $m=m'$。
<!-- solution-end -->

### F0-00A1D-C01 辞書式順序で $\mathbb N^2$ を整列する

- Level: C
- 目安時間: 18分

$\mathbb N^2$ に辞書式順序
$$
(m,n)\prec(m',n')
\iff
m<m'\ \text{または}\ (m=m'\text{ かつ }n<n')
$$
を入れる。この順序が整列であることを示せ。

<!-- solution-start -->
#### 詳細解答
非空集合 $A\subseteq\mathbb N^2$ を任意に取る。第1座標の集合
$$
M=\{m\in\mathbb N:\exists n,(m,n)\in A\}
$$
は非空な自然数集合なので最小元 $m_0$ を持つ。次に
$$
N=\{n\in\mathbb N:(m_0,n)\in A\}
$$
も非空なので最小元 $n_0$ を持つ。

任意の $(m,n)\in A$ について、$m_0<m$ なら辞書式順序で $(m_0,n_0)\prec(m,n)$。$m=m_0$ なら $n_0\le n$。従って $(m_0,n_0)$ が $A$ の最小元である。

#### 本番答案
まず第1座標の最小値 $m_0$、次にその第1座標を持つ点の第2座標の最小値 $n_0$ を取る。$(m_0,n_0)$ が任意の非空部分集合の最小元になる。
<!-- solution-end -->

---

## 9. 次に進む

**次：[F0-00A2 選択関数・選択公理・可算選択](../F0_00A2_選択公理_Zorn_極大原理/index.md)**
