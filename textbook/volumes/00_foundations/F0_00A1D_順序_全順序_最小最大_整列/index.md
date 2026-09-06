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

## 9. 次に進む

**次：[F0-00A2 選択関数・選択公理・可算選択](../F0_00A2_選択公理_Zorn_極大原理/index.md)**
