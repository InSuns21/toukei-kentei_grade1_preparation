# F0-00B1 補講：位相空間・近傍・部分空間・収束

<!-- definition-example-audit: strict -->

[F0-00A1C](../F0_00A1C_集合族_添字集合_べき集合/index.md) で、べき集合・集合族・添字付き集合族・任意和を定義しました。[F0-00B](../F0_00B_距離空間_開集合_閉集合_収束/index.md) では、距離 $d$ から

$$
\text{開球}\to\text{開集合}\to\text{収束}
$$

を定義しました。

ここでは距離の数値を忘れ、**どの部分集合を開とみなすか**だけを構造として残します。次のコンパクト性で使う「位相空間 $X$」を、この章で正式に導入します。

---

## 1. 位相と位相空間

<a id="def-f0-00b1-topology"></a>

<!-- formal-statement-start -->
> **定義（位相・位相空間）**  
> 集合 $X$ の部分集合族 $\tau\subseteq\mathcal P(X)$ が次の三条件を満たすとき、$\tau$ を $X$ 上の **位相** という。
> 1. $\varnothing,X\in\tau$。
> 2. $\{U_i\}_{i\in I}\subseteq\tau$ なら

$$
\bigcup_{i\in I}U_i\in\tau.
$$

> 3. $U_1,\ldots,U_m\in\tau$ なら

$$
U_1\cap\cdots\cap U_m\in\tau.
$$

> 組 $(X,\tau)$ を **位相空間** といい、$\tau$ の要素を開集合という。
<!-- formal-statement-end -->

距離空間では開球から開集合を作りました。位相空間では逆に、開集合族 $\tau$ を最初に指定します。

<!-- definition-example-start: def-f0-00b1-topology -->
### 1.1 定義の確認：二つの極端な例

**定義の確認**

任意の集合 $X$ に対して

$$
\tau_{\mathrm{disc}}=\mathcal P(X)
$$

は位相です。全ての部分集合を開にするこの例は離散位相と呼ばれます。

また

$$
\tau_{\mathrm{ind}}=\{\varnothing,X\}
$$

も位相です。開集合を $\varnothing$ と $X$ だけにしたこの例は密着位相と呼ばれます。

同じ集合 $X$ でも、位相が違えば開集合・収束・連続性の意味が変わります。
<!-- definition-example-end -->

---

## 2. 位相空間の閉集合

<a id="def-f0-00b1-closed"></a>

<!-- formal-statement-start -->
> **定義（位相空間の閉集合）**  
> 位相空間 $(X,\tau)$ の部分集合 $F\subseteq X$ について、補集合 $X\setminus F$ が開集合であるとき、$F$ は **閉集合** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00b1-closed -->
### 2.1 定義の確認

**定義の確認**

$\tau=\mathcal P(X)$ なら任意の $F\subseteq X$ について $X\setminus F\in\tau$ です。したがって全ての部分集合が閉集合でもあります。
<!-- definition-example-end -->

---

## 3. 近傍

<a id="def-f0-00b1-neighborhood"></a>

<!-- formal-statement-start -->
> **定義（近傍）**  
> 位相空間 $(X,\tau)$、点 $x\in X$、集合 $N\subseteq X$ に対して、ある開集合 $U\in\tau$ が存在して

$$
x\in U\subseteq N
$$

> となるとき、$N$ を $x$ の **近傍** という。
<!-- formal-statement-end -->

近傍そのものが開集合である必要はありません。

<!-- definition-example-start: def-f0-00b1-neighborhood -->
### 3.1 定義の確認

**定義の確認**

通常の実数直線で

$$
0\in(-1/2,1/2)\subseteq[-1,1]
$$

なので $[-1,1]$ は0の近傍です。一方 $[0,1]$ の中には0を含む通常の開区間を入れられないので、0の近傍ではありません。
<!-- definition-example-end -->

---

## 4. 距離が位相を作る

<a id="def-f0-00b1-metric-topology"></a>

<!-- formal-statement-start -->
> **定義（距離から誘導される位相）**  
> 距離空間 $(X,d)$ に対して、$d$ の意味で開である部分集合全体を $\tau_d$ と書く。この $\tau_d$ を $d$ が **誘導する位相** または **距離位相** という。
<!-- formal-statement-end -->

すなわち

$$
\tau_d
=
\left\{
U\subseteq X:
\forall x\in U\ \exists r>0\ \ B(x,r)\subseteq U
\right\}.
$$

<a id="prop-f0-00b1-metric-topology"></a>

<!-- formal-statement-start -->
> **命題（距離位相は位相である）**  
> 任意の距離空間 $(X,d)$ について $\tau_d$ は $X$ 上の位相である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varnothing$ は条件を空虚に満たし、$X$ は任意の $x\in X$ に対して $B(x,1)\subseteq X$ なので、$\varnothing,X\in\tau_d$ です。

各 $U_i\in\tau_d$ とし、$x\in\bigcup_{i\in I}U_i$ とします。ある $i_0$ で $x\in U_{i_0}$ なので、ある $r>0$ が存在して

$$
B(x,r)\subseteq U_{i_0}\subseteq\bigcup_{i\in I}U_i.
$$

よって任意和は開です。

最後に $x\in U_1\cap\cdots\cap U_m$ とします。各 $j$ について $B(x,r_j)\subseteq U_j$ となる $r_j>0$ を取り

$$
r=\min\{r_1,\ldots,r_m\}>0
$$

とすれば

$$
B(x,r)\subseteq U_1\cap\cdots\cap U_m.
$$

よって有限交差も開です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-metric-topology -->
### 4.1 定義の確認

**定義の確認**

$\mathbb R$ に通常距離 $d(x,y)=|x-y|$ を入れると、開球は

$$
B(x,r)=(x-r,x+r)
$$

です。離散距離では $B(x,1/2)=\{x\}$ なので全ての部分集合が開になります。
<!-- definition-example-end -->

---

## 5. 部分空間位相

<a id="def-f0-00b1-subspace"></a>

<!-- formal-statement-start -->
> **定義（部分空間位相）**  
> 位相空間 $(X,\tau)$ と部分集合 $A\subseteq X$ に対し

$$
\tau_A=\{A\cap U:U\in\tau\}
$$

> を $A$ 上の **部分空間位相** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00b1-subspace -->
### 5.1 定義の確認

**定義の確認**

$A=[0,1]\subseteq\mathbb R$ とすると

$$
[0,1/2)=[0,1]\cap(-1,1/2).
$$

$(-1,1/2)$ は $\mathbb R$ で開なので、$[0,1/2)$ は $A$ の部分空間位相では開です。
<!-- definition-example-end -->

---

## 6. 位相空間における点列の収束

<a id="def-f0-00b1-topological-convergence"></a>

<!-- formal-statement-start -->
> **定義（位相空間における点列収束）**  
> 位相空間 $X$ の点列 $(x_n)$ と点 $x\in X$ に対して、$x$ の任意の近傍 $N$ について十分大きい $n$ で $x_n\in N$ となるとき、$(x_n)$ は $x$ に **収束する** といい $x_n\to x$ と書く。
<!-- formal-statement-end -->

[F0-00B0の eventually](../F0_00B0_点列_部分列_十分大きい添字/index.md#def-f0-00b0-eventually)を展開すれば

$$
\forall N\text{（$x$ の近傍）}\ \exists n_0\ \forall n\ge n_0:\ x_n\in N
$$

です。

<a id="thm-f0-00b1-metric-convergence"></a>

<!-- formal-statement-start -->
> **定理（距離収束と位相収束の一致）**  
> 距離空間 $(X,d)$ に距離位相 $\tau_d$ を入れる。このとき、距離による点列収束と近傍による位相的収束は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

距離の意味で $x_n\to x$ とします。$N$ を $x$ の近傍とすると、ある開集合 $U$ が存在して

$$
x\in U\subseteq N.
$$

$U$ は距離位相で開なので、ある $r>0$ について $B(x,r)\subseteq U$ です。距離収束より十分大きい $n$ で $x_n\in B(x,r)\subseteq N$ となり、位相的に収束します。

逆に位相的に $x_n\to x$ とします。任意の $\varepsilon>0$ に対し $B(x,\varepsilon)$ は $x$ の近傍です。したがって十分大きい $n$ で

$$
x_n\in B(x,\varepsilon),
$$

すなわち $d(x_n,x)<\varepsilon$ です。よって距離の意味でも収束します。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-topological-convergence -->
### 6.1 定義の確認

**定義の確認**

通常の $\mathbb R$ では、位相的な $x_n\to x$ は

$$
\forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0:\ |x_n-x|<\varepsilon
$$

という通常の $\varepsilon$ 定義と一致します。
<!-- definition-example-end -->

---

## 7. 位相空間における連続写像

<a id="def-f0-00b1-continuous"></a>

<!-- formal-statement-start -->
> **定義（位相空間の連続写像）**  
> 位相空間 $X,Y$ の間の写像 $f:X\to Y$ について、$Y$ の任意の開集合 $V$ の逆像 $f^{-1}(V)$ が $X$ の開集合になるとき、$f$ は **連続** であるという。
<!-- formal-statement-end -->

<a id="prop-f0-00b1-continuity-sequences"></a>

<!-- formal-statement-start -->
> **命題（連続写像は収束列を収束列へ送る）**  
> 位相空間 $X,Y$ と連続写像 $f:X\to Y$ に対して、$x_n\to x$ なら $f(x_n)\to f(x)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V$ を $f(x)$ の任意の近傍とします。ある開集合 $W$ が存在して

$$
f(x)\in W\subseteq V.
$$

連続性より $f^{-1}(W)$ は $x$ を含む開集合です。$x_n\to x$ より十分大きい $n$ で $x_n\in f^{-1}(W)$、したがって $f(x_n)\in W\subseteq V$ です。よって $f(x_n)\to f(x)$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-continuous -->
### 7.1 定義の確認

**定義の確認**

恒等写像 $\operatorname{id}_X:X\to X$ では

$$
\operatorname{id}_X^{-1}(V)=V
$$

なので連続です。定数写像 $f(x)=y_0$ では開集合 $V\subseteq Y$ の逆像は $X$ または $\varnothing$ なので、やはり連続です。
<!-- definition-example-end -->

---

## 8. Hausdorff性と極限の一意性

一般の位相空間では点列の極限は一意とは限りません。例えば開集合が $\varnothing$ と $X$ だけの位相では、任意の点列が任意の点へ収束します。

<a id="def-f0-00b1-hausdorff"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff空間）**  
> 位相空間 $X$ について、任意の異なる二点 $x\ne y$ に対して、互いに交わらない開集合 $U,V$ が存在し

$$
x\in U,
\qquad
y\in V,
\qquad
U\cap V=\varnothing
$$

> とできるとき、$X$ を **Hausdorff空間** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00b1-hausdorff -->
### 8.1 定義の確認

**定義の確認**

通常の $\mathbb R$ で $x<y$ とし

$$
r=\frac{y-x}{3}
$$

と置けば、$(x-r,x+r)$ と $(y-r,y+r)$ は互いに交わらない開集合です。したがって通常の実数直線は Hausdorff です。
<!-- definition-example-end -->

<a id="thm-f0-00b1-hausdorff-limit"></a>

<!-- formal-statement-start -->
> **定理（Hausdorff空間では点列の極限は一意）**  
> Hausdorff空間 $X$ で点列 $(x_n)$ が $x$ と $y$ の両方へ収束するなら $x=y$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\ne y$ と仮定します。Hausdorff性により互いに素な開集合 $U,V$ を取れて

$$
x\in U,
\qquad y\in V,
\qquad U\cap V=\varnothing.
$$

$x_n\to x$ と $x_n\to y$ から、十分大きい $n$ では $x_n\in U$ と $x_n\in V$ が同時に必要になります。これは $U\cap V=\varnothing$ に矛盾します。$\square$
<!-- proof-end -->

<a id="prop-f0-00b1-metric-hausdorff"></a>

<!-- formal-statement-start -->
> **命題（距離空間はHausdorff）**  
> 任意の距離空間は、その距離位相に関して Hausdorff 空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\ne y$ とし

$$
r=\frac13d(x,y)>0
$$

と置きます。もし $z\in B(x,r)\cap B(y,r)$ なら、[距離・距離空間](../F0_00B_距離空間_開集合_閉集合_収束/index.md#def-f0-00b-01)の定義の第3条件から

$$
d(x,y)
\le d(x,z)+d(z,y)
<2r
=\frac23d(x,y),
$$

となり矛盾します。したがって $B(x,r)$ と $B(y,r)$ は互いに素な開集合です。$\square$
<!-- proof-end -->

---

## 9. 点列だけで一般位相を判定しない

距離空間では

- 閉集合を点列で特徴付けられる。
- 連続性を点列で特徴付けられる。
- コンパクト性と点列コンパクト性が同値になる。

という便利な事実があります。

しかし一般の位相空間では、点列だけでは位相の全情報を捉えられない場合があります。後続では主語を区別します。

| 主語 | 基本言語 |
|---|---|
| 位相空間 | 開集合・近傍・開被覆 |
| 距離空間 | 上に加えて点列による特徴付けを使える |
| $\mathbb R^p$ | さらに Heine--Borel で「閉かつ有界」へ落とせる |

---

<!-- exercise-density-supplement-20260912 -->

## 10. 演習

### F0-00B1-A01 有限集合上の位相を判定する

- Level: A
- 目安時間: 8分

$X=\{a,b\}$ とする。次の集合族が $X$ 上の位相か判定せよ。

1. $\tau_1=\{\varnothing,X\}$
2. $\tau_2=\{\varnothing,\{a\},X\}$
3. $\tau_3=\{\varnothing,\{a\},\{b\}\}$

<!-- solution-start -->
#### 詳細解答
$\tau_1$ は密着位相であり位相である。$\tau_2$ も $\varnothing,X$ を含み、任意和・有限交差を取っても三つの集合のどれかに戻るので位相である。

$\tau_3$ は $X$ 自身を含まないため、位相の第1公理を満たさない。従って位相ではない。

#### 本番答案
$$
\boxed{\tau_1,\tau_2\text{ は位相},\qquad \tau_3\text{ は位相でない}}.
$$
$\tau_3$ は $X\notin\tau_3$ が理由。
<!-- solution-end -->

### F0-00B1-A02 部分空間で開になる集合

- Level: A
- 目安時間: 8分

$A=[0,2]\subset\mathbb R$ に通常位相から部分空間位相を入れる。次の集合が $A$ で開か判定し、開なら $A\cap U$ の形に書け。

1. $[0,1)$
2. $(0,1)$
3. $[0,1]$

<!-- solution-start -->
#### 詳細解答
1は
$$
[0,1)=A\cap(-1,1)
$$
なので $A$ で開。2は $\mathbb R$ でも開なので
$$
(0,1)=A\cap(0,1)
$$
で開。3は0を含むが、0の $A$ におけるどの十分小さな近傍も1以下に収まるとしても、点1の周囲では1より大きい点が $A$ 内に現れるため $[0,1]$ は $A$ で開ではない。

#### 本番答案
1,2は開、3は開でない。
<!-- solution-end -->

### F0-00B1-A03 離散位相と密着位相の収束

- Level: A
- 目安時間: 10分

集合 $X$ 上の点列 $(x_n)$ を考える。

1. 離散位相では、$x_n\to x$ なら十分大きい $n$ で $x_n=x$ となることを示せ。
2. 密着位相 $\{\varnothing,X\}$ では、任意の点列が任意の点 $x\in X$ に収束することを示せ。

<!-- solution-start -->
#### 詳細解答
離散位相では $\{x\}$ 自身が $x$ の開近傍である。収束の定義をこの近傍に適用すると、ある $N$ 以降で $x_n\in\{x\}$、すなわち $x_n=x$ となる。

密着位相では任意の点 $x$ の近傍は $X$ しかない。全ての $n$ で $x_n\in X$ なので、収束条件は自動的に満たされる。

#### 本番答案
離散位相では収束列は最終的に定数。密着位相では全ての点列が全ての点へ収束する。
<!-- solution-end -->

### F0-00B1-A04 Hausdorff性が極限を一意にする

- Level: A
- 目安時間: 9分

Hausdorff空間 $X$ で点列 $(x_n)$ が $x$ と $y$ の両方へ収束するとする。$x\ne y$ と仮定して矛盾を導け。

<!-- solution-start -->
#### 詳細解答
$x\ne y$ ならHausdorff性から互いに素な開集合 $U,V$ を
$$
x\in U,\qquad y\in V,\qquad U\cap V=\varnothing
$$
となるように取れる。$x_n\to x$ より十分大きい $n$ で $x_n\in U$、$x_n\to y$ より十分大きい $n$ で $x_n\in V$。両方の「十分大きい」を同時に満たす $n$ では $x_n\in U\cap V$ となり矛盾する。

#### 本番答案
互いに素な近傍 $U,V$ を取り、十分後の $x_n$ が両方に入る矛盾を得る。従って $x=y$。
<!-- solution-end -->

### F0-00B1-B01 二つの位相と収束のしやすさ

- Level: B
- 目安時間: 12分

同じ集合 $X$ 上の二つの位相 $\tau_1\subseteq\tau_2$ を考える。$\tau_2$ で $x_n\to x$ なら $\tau_1$ でも $x_n\to x$ であることを示せ。逆が一般に成り立たない例も挙げよ。

<!-- solution-start -->
#### 詳細解答
$\tau_1$ の任意の $x$ の近傍 $N$ を取る。ある $U\in\tau_1$ が $x\in U\subseteq N$ を満たす。$\tau_1\subseteq\tau_2$ なので $U$ は $\tau_2$ でも開である。$\tau_2$ での収束から十分大きい $n$ で $x_n\in U\subseteq N$。従って $\tau_1$ でも収束する。

逆の反例は、$X$ に密着位相 $\tau_1$ と離散位相 $\tau_2$ を入れればよい。密着位相では任意の点列が任意点へ収束するが、離散位相では最終的にその点と一致しなければ収束しない。

#### 本番答案
細かい位相での収束は粗い位相での収束を含意する。逆は密着位相と離散位相で失敗する。
<!-- solution-end -->

### F0-00B1-B02 連続性を開集合の逆像から確認する

- Level: B
- 目安時間: 12分

$X$ を任意の位相空間、$Y$ を離散位相空間とする。写像 $f:X\to Y$ が連続であるための必要十分条件が、各 $y\in Y$ についてファイバー $f^{-1}(\{y\})$ が $X$ で開であることだと示せ。

<!-- solution-start -->
#### 詳細解答
$Y$ は離散位相なので一点集合 $\{y\}$ は全て開である。$f$ が連続なら、その逆像 $f^{-1}(\{y\})$ は開になる。

逆に全てのファイバーが開だとする。任意の開集合 $V\subseteq Y$ は離散位相では単なる部分集合であり
$$
V=\bigcup_{y\in V}\{y\}.
$$
従って
$$
f^{-1}(V)
=\bigcup_{y\in V}f^{-1}(\{y\}),
$$
右辺は開集合の任意和なので開。よって $f$ は連続である。

#### 本番答案
離散位相では任意の開集合が一点集合の和。したがって一点ファイバーが全て開であることと、全ての開集合の逆像が開であることが同値。
<!-- solution-end -->

---

## 11. 章末チェック

- 位相を部分集合族の三条件で定義できる。
- $\mathcal P(X)$ と添字付き任意和の意味を説明できる。
- 距離空間が距離位相を通じて位相空間になることを証明できる。
- 近傍と部分空間位相を定義できる。
- 位相的収束を近傍で定義できる。
- 距離収束と距離位相での収束の一致を証明できる。
- 位相空間の連続写像を逆像で定義できる。
- Hausdorff性が極限一意性を保証することを説明できる。
- 一般位相空間では点列特徴付けを無条件に使えないと分かる。

---

## 12. 次に進む

次は距離空間に戻り、位相的連続性が $\varepsilon$--$\delta$ と点列の言葉にどう翻訳されるかを証明します。

**次：[F0-00C 連続写像・連続性の同値条件](../F0_00C_連続写像_コンパクト性_最大最小/index.md)**
