# F0-00B1 補講：位相空間・近傍・部分空間・収束

<!-- definition-example-audit: strict -->

[F0-00B](../F0_00B_距離空間_開集合_閉集合_収束/index.md) では、距離 $d$ から

$$
\text{開球}\to\text{開集合}\to\text{収束}
$$

を定義しました。

しかし次のコンパクト性では、より一般に **位相空間 $X$** という言葉を使います。位相空間では距離の数値そのものを忘れ、

> **どの部分集合を「開」とみなすか**

だけを構造として残します。

この章では

$$
\boxed{
\text{位相}
\to
\text{近傍}
\to
\text{部分空間位相}
\to
\text{点列収束}
\to
\text{連続写像}
}
$$

を整備し、距離空間で学んだ内容と接続します。

---

## 1. 位相と位相空間

<a id="def-f0-00b1-topology"></a>

<!-- formal-statement-start -->
> **定義（位相・位相空間）**  
> 集合 $X$ の部分集合族 $\tau$ が次の三条件を満たすとき、$\tau$ を $X$ 上の **位相** という。
> 1. $\varnothing,X\in\tau$。
> 2. $\tau$ の要素を任意個集めた和集合も $\tau$ に属する。
> 3. $\tau$ の要素を有限個集めた共通部分も $\tau$ に属する。
> 組 $(X,\tau)$ を **位相空間** といい、$\tau$ の要素を **開集合** という。
<!-- formal-statement-end -->

距離空間では「各点のまわりに小さな開球を入れられる集合」を開集合と呼びました。位相空間では逆に、**開集合族そのものを最初に指定**します。

<!-- definition-example-start: def-f0-00b1-topology -->
### 1.1 定義の確認：二つの極端な位相

任意の集合 $X$ に対して、全ての部分集合を集めた

$$
\tau_{\mathrm{disc}}=\mathcal P(X)
$$

を考えます。

- $\varnothing,X\subset X$ なので $\varnothing,X\in\tau_{\mathrm{disc}}$。
- $X$ の部分集合の任意和も $X$ の部分集合。
- $X$ の部分集合の有限交差も $X$ の部分集合。

したがって $\tau_{\mathrm{disc}}$ は位相です。これを **離散位相** といいます。

一方

$$
\tau_{\mathrm{ind}}=\{\varnothing,X\}
$$

も三条件を直接確認できるので位相です。これを **密着位相** といいます。

同じ集合 $X$ でも、どの位相を入れるかで「開集合」「収束」「連続」の意味が変わります。
<!-- definition-example-end -->

---

## 2. 位相空間の閉集合

<a id="def-f0-00b1-closed"></a>

<!-- formal-statement-start -->
> **定義（位相空間の閉集合）**  
> 位相空間 $(X,\tau)$ の部分集合 $F\subset X$ が **閉集合** であるとは、補集合 $X\setminus F$ が開集合であることをいう。
<!-- formal-statement-end -->

これは距離空間での定義と同じ形です。違うのは「開」が距離ではなく位相 $\tau$ で決まることです。

<!-- definition-example-start: def-f0-00b1-closed -->
### 2.1 定義の確認

離散位相では全ての部分集合が開です。任意の $F\subset X$ に対して補集合 $X\setminus F$ も部分集合なので開です。したがって離散位相では全ての部分集合が閉でもあります。
<!-- definition-example-end -->

---

## 3. 近傍

<a id="def-f0-00b1-neighborhood"></a>

<!-- formal-statement-start -->
> **定義（近傍）**  
> 位相空間 $(X,\tau)$、点 $x\in X$、集合 $N\subset X$ に対して、ある開集合 $U\in\tau$ が存在して $x\in U\subset N$ となるとき、$N$ を $x$ の **近傍** という。
<!-- formal-statement-end -->

近傍そのものが開集合である必要はありません。「$x$ を含む開集合を一つ内側に持つ」ことが条件です。

<!-- definition-example-start: def-f0-00b1-neighborhood -->
### 3.1 定義の確認

通常の実数直線で $N=[-1,1]$ を考えます。

$$
0\in(-1/2,1/2)\subset[-1,1]
$$

なので $N$ は0の近傍です。$N$ 自身は開集合でなくても構いません。

一方 $[0,1]$ は0の近傍ではありません。0を含む通常の開区間は必ず負の数も含むため、$[0,1]$ の中に収められないからです。
<!-- definition-example-end -->

---

## 4. 距離が位相を作る

距離空間 $(X,d)$ では、F0-00Bで

$$
U\subset X\text{ が開}
\iff
\forall x\in U\ \exists r>0:\ B(x,r)\subset U
$$

と定義しました。この開集合全体は位相になります。

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
U\subset X:
\forall x\in U\ \exists r>0\ \ B(x,r)\subset U
\right\}.
$$

<a id="prop-f0-00b1-metric-topology"></a>

<!-- formal-statement-start -->
> **命題（距離位相は位相である）**  
> 任意の距離空間 $(X,d)$ について $\tau_d$ は $X$ 上の位相である。
<!-- formal-statement-end -->

### 証明の見取り図

任意和では、点 $x$ が属している一つの開集合から開球をもらいます。有限交差では各開集合から得た半径の最小値を使います。

<!-- proof-start -->
### 証明

$\varnothing$ は条件を空虚に満たし、$X$ は任意の点 $x\in X$ に対して例えば $B(x,1)\subset X$ とできるので

$$
\varnothing,X\in\tau_d.
$$

次に各 $U_\lambda\in\tau_d$ とし

$$
U=\bigcup_{\lambda\in\Lambda}U_\lambda
$$

とします。$x\in U$ なら、ある $\lambda_0$ について $x\in U_{\lambda_0}$ です。$U_{\lambda_0}$ は開なので、ある $r>0$ が存在して

$$
B(x,r)\subset U_{\lambda_0}\subset U.
$$

したがって任意和 $U$ も開です。

最後に

$$
U=U_1\cap\cdots\cap U_m
$$

とします。$x\in U$ なら各 $j$ について $r_j>0$ を取れて

$$
B(x,r_j)\subset U_j.
$$

そこで

$$
r=\min\{r_1,\ldots,r_m\}>0
$$

と置けば

$$
B(x,r)\subset U_1\cap\cdots\cap U_m=U.
$$

よって有限交差も開です。以上から $\tau_d$ は位相です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-metric-topology -->
### 4.1 定義の確認

$\mathbb R$ に通常距離 $d(x,y)=|x-y|$ を入れると、開球は

$$
B(x,r)=(x-r,x+r)
$$

なので、距離位相は通常の実数直線の位相になります。

離散距離では

$$
B(x,1/2)=\{x\}
$$

です。任意の集合 $A\subset X$ と $x\in A$ に対して $B(x,1/2)=\{x\}\subset A$ なので、全ての $A$ が開になります。したがって距離位相は離散位相です。
<!-- definition-example-end -->

これで、F0-00Bで学んだ全ての距離空間を位相空間として見られます。

---

## 5. 部分空間位相

コンパクト性では「位相空間 $X$ の部分集合 $K$」を頻繁に扱います。そのとき $K$ 自身にも自然な位相を入れます。

<a id="def-f0-00b1-subspace"></a>

<!-- formal-statement-start -->
> **定義（部分空間位相）**  
> 位相空間 $(X,\tau)$ と部分集合 $A\subset X$ に対し、$A\cap U$（$U\in\tau$）の形の集合を全て集めた族を $A$ 上の **部分空間位相** という。
<!-- formal-statement-end -->

記号では

$$
\tau_A=\{A\cap U:U\in\tau\}.
$$

「$A$ の中で開」とは、もとの空間の開集合を $A$ で切った形になっていることです。

<!-- definition-example-start: def-f0-00b1-subspace -->
### 5.1 定義の確認：端点を含んでも部分空間では開になれる

$A=[0,1]\subset\mathbb R$ とします。

$$
[0,1/2)
=
[0,1]\cap(-1,1/2).
$$

$(-1,1/2)$ は $\mathbb R$ の開集合なので、定義どおり $[0,1/2)$ は $A=[0,1]$ の部分空間位相では開集合です。

「$\mathbb R$ では開でない」ことと「$A$ の中では開である」ことは両立します。
<!-- definition-example-end -->

---

## 6. 位相空間における点列の収束

<a id="def-f0-00b1-topological-convergence"></a>

<!-- formal-statement-start -->
> **定義（位相空間における点列収束）**  
> 位相空間 $X$ の点列 $(x_n)$ と点 $x\in X$ に対して、$x$ の任意の近傍 $N$ について十分大きい $n$ で $x_n\in N$ となるとき、$(x_n)$ は $x$ に **収束する** といい $x_n\to x$ と書く。
<!-- formal-statement-end -->

[F0-00B0の「十分大きい添字」](../F0_00B0_点列_部分列_十分大きい添字/index.md#def-f0-00b0-eventually)を展開すると、これは

$$
\forall N\text{（$x$ の近傍）}\ \exists n_0\ \forall n\ge n_0:\ x_n\in N
$$

という意味です。

<a id="thm-f0-00b1-metric-convergence"></a>

<!-- formal-statement-start -->
> **定理（距離収束と位相収束の一致）**  
> 距離空間 $(X,d)$ に距離位相 $\tau_d$ を入れる。このとき、F0-00Bで定義した距離による収束と、近傍による位相的収束は同値である。
<!-- formal-statement-end -->

つまり

$$
d(x_n,x)\to0
\iff
x_n\to x\quad\text{（位相的収束）}.
$$

### 証明の見取り図

距離収束から位相収束へは、近傍の内側に開球を一つ取ります。逆向きは $B(x,\varepsilon)$ 自身を近傍として使います。

<!-- proof-start -->
### 証明

まず距離の意味で $x_n\to x$ とします。$N$ を $x$ の近傍とすると、ある開集合 $U$ が存在して

$$
x\in U\subset N.
$$

$U$ は距離位相で開なので、ある $r>0$ が存在して

$$
B(x,r)\subset U.
$$

距離収束より十分大きい $n$ で $d(x_n,x)<r$、すなわち

$$
x_n\in B(x,r)\subset N.
$$

よって位相的に収束します。

逆に位相的に $x_n\to x$ とします。任意の $\varepsilon>0$ に対し $B(x,\varepsilon)$ は $x$ の近傍です。したがって十分大きい $n$ で

$$
x_n\in B(x,\varepsilon),
$$

つまり

$$
d(x_n,x)<\varepsilon.
$$

よって距離の意味でも $x_n\to x$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-topological-convergence -->
### 6.1 定義の確認

通常の $\mathbb R$ では、$x$ の任意の近傍はある開区間 $(x-\varepsilon,x+\varepsilon)$ を含みます。したがって位相的な $x_n\to x$ は

$$
|x_n-x|<\varepsilon
$$

が十分大きい $n$ で成り立つという通常の $\varepsilon$ 定義と一致します。
<!-- definition-example-end -->

---

## 7. 位相空間における連続写像

<a id="def-f0-00b1-continuous"></a>

<!-- formal-statement-start -->
> **定義（位相空間の連続写像）**  
> 位相空間 $X,Y$ の間の写像 $f:X\to Y$ が **連続** であるとは、$Y$ の任意の開集合 $V$ に対して逆像 $f^{-1}(V)$ が $X$ の開集合になることをいう。
<!-- formal-statement-end -->

これは距離を使わない定義です。次のF0-00Cでは、距離空間に限定するとこの定義が $\varepsilon$--$\delta$ と点列の条件に一致することを示します。

<a id="prop-f0-00b1-continuity-sequences"></a>

<!-- formal-statement-start -->
> **命題（連続写像は収束列を収束列へ送る）**  
> 位相空間 $X,Y$ と連続写像 $f:X\to Y$ に対して、$x_n\to x$ なら $f(x_n)\to f(x)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$f(x)$ の近傍の内側に開集合 $W$ を取り、その逆像 $f^{-1}(W)$ を $x$ の近傍として使います。

<!-- proof-start -->
### 証明

$V$ を $f(x)$ の任意の近傍とします。ある開集合 $W$ が存在して

$$
f(x)\in W\subset V.
$$

$f$ は連続なので $f^{-1}(W)$ は $X$ の開集合で、しかも $x\in f^{-1}(W)$ です。したがって $f^{-1}(W)$ は $x$ の近傍です。

$x_n\to x$ より十分大きい $n$ で

$$
x_n\in f^{-1}(W).
$$

よって

$$
f(x_n)\in W\subset V.
$$

$V$ は任意だったので $f(x_n)\to f(x)$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-f0-00b1-continuous -->
### 7.1 定義の確認：恒等写像と定数写像

恒等写像 $\operatorname{id}_X:X\to X$ では、任意の開集合 $V\subset X$ に対し

$$
\operatorname{id}_X^{-1}(V)=V
$$

が開なので連続です。

定数写像 $f(x)=y_0$ では、開集合 $V\subset Y$ の逆像は

$$
f^{-1}(V)=
\begin{cases}
X,&y_0\in V,\\
\varnothing,&y_0\notin V.
\end{cases}
$$

$X$ と $\varnothing$ はどちらも開なので、定数写像も連続です。
<!-- definition-example-end -->

---

## 8. 極限の一意性は一般の位相空間では自動ではない

距離空間では極限は一意でした。しかし位相空間まで一般化すると、これは自動ではありません。

例えば密着位相 $\{\varnothing,X\}$ では、任意の点 $x$ の近傍は $X$ しかありません。したがって任意の点列が任意の点へ収束します。

極限を一意にする代表的な条件が Hausdorff 性です。

<a id="def-f0-00b1-hausdorff"></a>

<!-- formal-statement-start -->
> **定義（Hausdorff空間）**  
> 位相空間 $X$ が **Hausdorff** であるとは、任意の異なる二点 $x\ne y$ に対して、互いに交わらない開集合 $U,V$ が存在し、$x\in U$、$y\in V$ とできることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00b1-hausdorff -->
### 8.1 定義の確認

通常の $\mathbb R$ で $x<y$ とします。

$$
r=\frac{y-x}{3}>0
$$

と置けば、開区間

$$
U=(x-r,x+r),
\qquad
V=(y-r,y+r)
$$

はそれぞれ $x,y$ を含みます。また

$$
x+r=x+\frac{y-x}{3}
<y-\frac{y-x}{3}=y-r
$$

なので $U\cap V=\varnothing$ です。したがって通常の実数直線はHausdorffです。
<!-- definition-example-end -->

<a id="thm-f0-00b1-hausdorff-limit"></a>

<!-- formal-statement-start -->
> **定理（Hausdorff空間では点列の極限は一意）**  
> Hausdorff空間 $X$ で点列 $(x_n)$ が $x$ と $y$ の両方へ収束するなら $x=y$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$x\ne y$ なら互いに素な開近傍 $U,V$ を取れます。しかし十分後ろの $x_n$ は $U$ と $V$ の両方に入る必要があり、矛盾します。

<!-- proof-start -->
### 証明

$x\ne y$ と仮定します。Hausdorff性により互いに素な開集合 $U,V$ を取れて

$$
x\in U,
\qquad
y\in V,
\qquad
U\cap V=\varnothing.
$$

$x_n\to x$ なので十分大きい $n$ で $x_n\in U$、また $x_n\to y$ なので十分大きい $n$ で $x_n\in V$ です。したがって十分後ろでは

$$
x_n\in U\cap V
$$

となりますが、$U\cap V=\varnothing$ に矛盾します。よって $x=y$ です。$\square$
<!-- proof-end -->

<a id="prop-f0-00b1-metric-hausdorff"></a>

<!-- formal-statement-start -->
> **命題（距離空間はHausdorff）**  
> 任意の距離空間は、その距離位相に関してHausdorff空間である。
<!-- formal-statement-end -->

### 証明の見取り図

異なる二点の距離の $1/3$ を半径にした二つの開球を取ります。

<!-- proof-start -->
### 証明

$x\ne y$ とし

$$
r=\frac13d(x,y)>0
$$

と置きます。もし $z\in B(x,r)\cap B(y,r)$ なら三角不等式より

$$
d(x,y)
\le d(x,z)+d(z,y)
<2r
=\frac23d(x,y),
$$

となり矛盾します。したがって

$$
B(x,r)\cap B(y,r)=\varnothing.
$$

二つの開球はそれぞれ $x,y$ を含む開集合なので、距離空間はHausdorffです。$\square$
<!-- proof-end -->

---

## 9. 「点列だけ見ればよい」は一般の位相空間では危険

距離空間では

- 閉集合を点列で特徴付けられる。
- 連続性を点列で特徴付けられる。
- コンパクト性と点列コンパクト性が同値になる。

という便利な事実があります。

しかし一般の位相空間では、点列だけで位相の全情報を捉えられない場合があります。したがって後続では主語を意識して読み分けます。

| 主語 | 基本言語 |
|---|---|
| 位相空間 | 開集合・近傍・開被覆 |
| 距離空間 | 上に加えて点列による特徴付けを使える |
| $\mathbb R^p$ | さらにHeine--Borelで「閉かつ有界」へ落とせる |

この三段階を混ぜないことが、この補講を入れる最大の目的です。

---

## 10. 章末チェック

- 位相を開集合族の三条件で定義できる。
- 距離空間が距離位相を通じて位相空間になることを説明できる。
- 近傍は開集合そのものとは限らないことを説明できる。
- 部分空間位相で、もとの空間では開でない集合が開になり得ることを説明できる。
- 位相的収束を近傍で定義できる。
- 距離収束と距離位相での収束が同値であることを証明できる。
- 位相空間の連続写像を「開集合の逆像が開」で定義できる。
- 一般の位相空間では極限一意性や点列特徴付けを無条件に使えないと分かる。

---

## 11. 次に進む

次は距離空間に戻り、位相的連続性が $\varepsilon$--$\delta$ と点列の言葉にどう翻訳されるかを証明します。

**次：[F0-00C 連続写像・連続性の同値条件](../F0_00C_連続写像_コンパクト性_最大最小/index.md)**
