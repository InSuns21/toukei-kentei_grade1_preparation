# F0-00C 補講：連続写像・連続性の同値条件

F0-00Bで距離・開集合・点列収束を準備しました。この講義では、それら三つの言葉が「連続性」で一致することを示します。

中心線は

$$
\boxed{
\varepsilon\text{--}\delta
\Longleftrightarrow
\text{点列を極限へ送る}
\Longleftrightarrow
\text{開集合の逆像が開}
}
$$

です。コンパクト性は次講F0-00C1へ分離します。

## 0. まず一つの関数を三つの方法で見る

連続性には三つの表現がありますが、別々の概念ではありません。$f(x)=x^2$ を $x=1$ の近くで考えます。

- **$\varepsilon$--$\delta$**：$x$ を1に十分近づければ $x^2$ を1に好きなだけ近づけられる。
- **点列**：$x_n\to1$ なら $x_n^2\to1$。
- **開集合の逆像**：出力側の開集合を入力側へ引き戻しても開集合になる。

逆に段差関数

$$
f(x)=
\begin{cases}
0,&x<0,\\
1,&x\ge0
\end{cases}
$$

は0で不連続です。たとえば $x_n=-1/n\to0$ なのに

$$
f(x_n)=0\not\to1=f(0).
$$

点列版なら不連続性を一発で検出できます。

この章の目的は定義を三つ暗記することではなく、

> **同じ連続性を、問題に応じて一番使いやすい言語へ翻訳する**

ことです。

---

## 1. 連続写像

<a id="def-f0-00c-01"></a>
 
<!-- formal-statement-start -->
> **定義（点における連続性）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$、写像 $f:X\to Y$、点 $x\in X$ に対して、$f$ が $x$ で **連続** であるとは、任意の $\varepsilon>0$ に対し、ある $\delta>0$ が存在して
$$
d_X(x,y)<\delta
\Longrightarrow
d_Y(f(x),f(y))<\varepsilon
$$
> が全ての $y\in X$ について成り立つことをいう。
<!-- formal-statement-end -->

<a id="def-f0-00c-02"></a>
 
<!-- formal-statement-start -->
> **定義（連続写像）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$ の間の写像 $f:X\to Y$ が **連続写像** であるとは、$f$ が全ての $x\in X$ で連続であることをいう。
<!-- formal-statement-end -->

「入力を十分近づければ、出力も好きなだけ近づけられる」という意味です。

---

## 2. 連続性の三つの顔

距離空間では、$\varepsilon$–$\delta$、点列、開集合の逆像という三つの見方が一致します。

### 2.1 どの表現をいつ使うか

| 表現 | 得意な場面 |
|---|---|
| $\varepsilon$--$\delta$ | 直接評価、連続性の定義そのもの |
| 点列 | 反例、極限計算、閉集合との組合せ |
| 開集合の逆像 | 位相的議論、閉集合の逆像、一般化 |

たとえば $x^2$ の連続性は点列で計算しやすく、$f^{-1}(F)$ が閉になることは逆像の言葉が最短です。

<a id="thm-f0-00c-01"></a>
 
<!-- formal-statement-start -->
> **定理（距離空間における連続性の同値条件）**  
> 距離空間 $(X,d_X)$、$(Y,d_Y)$ と写像 $f:X\to Y$ に対して、次の三条件は同値である。
> 1. $f$ は $X$ 上で連続である。
> 2. 任意の点列 $(x_n)$ と点 $x\in X$ について
   $$
   x_n\to x
   \Longrightarrow
   f(x_n)\to f(x)
   $$
>    が成り立つ。
> 3. 任意の開集合 $U\subset Y$ に対して、逆像
   $$
   f^{-1}(U)=\{x\in X:f(x)\in U\}
   $$
>    は $X$ の開集合である。
<!-- formal-statement-end -->

### 2.2 証明の見取り図

三つを一周させます。

```text
ε-δ
 ↓  収束列は最後にはδ球へ入る
点列
 ↓  逆像が開でないなら1/n球から反例列を作る
開集合の逆像
 ↓  出力側のε球を逆像して入力側のδ球を取る
ε-δ
```

特に中央の `点列 → 開集合` だけが少し技巧的で、F0-00Bと同じく「半径 $1/n$ の球から反例列を作る」が核心です。完全証明を閉じる場合でも、この一周だけは本文として残します。

<!-- proof-start -->
### 証明

#### 1 ⇒ 2

$f$ が連続で、$x_n\to x$ とします。任意の $\varepsilon>0$ に対し、$f$ の $x$ での連続性から、ある $\delta>0$ が存在して

$$
d_X(x,y)<\delta
\Longrightarrow
d_Y(f(x),f(y))<\varepsilon.
$$

$x_n\to x$ なので、十分大きい $n$ では

$$
d_X(x_n,x)<\delta.
$$

したがって

$$
d_Y(f(x_n),f(x))<\varepsilon.
$$

よって $f(x_n)\to f(x)$ です。

#### 2 ⇒ 3

点列による条件2を仮定します。$U\subset Y$ を開集合とし、$x\in f^{-1}(U)$ を取ります。

$f^{-1}(U)$ が $x$ の近傍を含まないと仮定すると、各 $n\ge1$ について

$$
B_X(x,1/n)\not\subset f^{-1}(U)
$$

です。そこで

$$
x_n\in B_X(x,1/n)\setminus f^{-1}(U)
$$

を選べます。すると $x_n\to x$ ですが

$$
f(x_n)\notin U
$$

です。

一方、条件2より $f(x_n)\to f(x)$ であり、$f(x)\in U$ です。$U$ は開集合なので、ある $\varepsilon>0$ が存在して

$$
B_Y(f(x),\varepsilon)\subset U.
$$

十分大きい $n$ では $f(x_n)\in B_Y(f(x),\varepsilon)\subset U$ となり矛盾します。

したがって $f^{-1}(U)$ は各点の周囲に開球を含み、開集合です。

#### 3 ⇒ 1

条件3を仮定します。$x\in X$ と $\varepsilon>0$ を任意に取ります。

$$
U=B_Y(f(x),\varepsilon)
$$

は $Y$ の開集合なので、条件3より $f^{-1}(U)$ は $X$ の開集合です。また $x\in f^{-1}(U)$ ですから、ある $\delta>0$ が存在して

$$
B_X(x,\delta)\subset f^{-1}(U).
$$

したがって

$$
d_X(x,y)<\delta
\Longrightarrow
f(y)\in U
\Longrightarrow
d_Y(f(x),f(y))<\varepsilon.
$$

よって $f$ は $x$ で連続です。$x$ は任意だったので $f$ は連続です。$\square$
<!-- proof-end -->

### 2.3 何が分かったか：連続写像は「極限操作と両立する」

点列版

$$
x_n\to x
\Longrightarrow
f(x_n)\to f(x)
$$

は、連続関数なら

$$
\lim f(x_n)=f(\lim x_n)
$$

と極限を関数の内外で交換できることを意味します。

これが次のコンパクト性で「連続像もコンパクト」、さらに最大最小定理へ進むための橋になります。

### 2.4 例：距離関数は連続

固定した $z\in X$ に対し

$$
f(x)=d(z,x)
$$

と置きます。三角不等式から

$$
|d(z,x)-d(z,y)|\le d(x,y)
$$

なので、$x_n\to x$ なら

$$
|f(x_n)-f(x)|\le d(x_n,x)\to0.
$$

したがって距離関数は連続です。

---

---

## 3. 演習

### F0-00C-A01 点列で連続性を確認する

- Level: A
- 目安時間: 8分
- 主題: 点列による連続性
- 使用技術: 三角不等式

$\mathbb R$ に通常の距離を入れ、$f(x)=x^2$ とする。任意の $x_n\to x$ に対して $f(x_n)\to f(x)$ を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$x_n\to x$ なら、収束列は有界なので、ある $M>0$ が存在して十分大きい $n$ について

$$
|x_n|\le M,
\qquad
|x|\le M
$$

とできます。

すると

$$
|x_n^2-x^2|
=|x_n-x||x_n+x|
\le2M|x_n-x|.
$$

右辺は $x_n\to x$ より0へ収束するので

$$
x_n^2\to x^2.
$$

よって点列特徴付けから $f(x)=x^2$ は連続です。

##### 本番答案

$x_n\to x$ より $(x_n)$ は有界。十分大きい $n$ で $|x_n|,|x|\le M$ とすれば

$$
|x_n^2-x^2|
\le2M|x_n-x|\to0.
$$

したがって $x_n^2\to x^2$ であり、$f$ は連続。

##### 採点基準

- 因数分解: 6点
- 収束列の有界性: 5点
- 評価式: 6点
- 結論: 3点

<!-- solution-end -->

### F0-00C-B01 連続性を開集合の逆像で使う

- Level: B
- 目安時間: 12分
- 主題: 連続写像と閉集合
- 使用技術: 開集合の逆像、補集合

距離空間 $X,Y$、連続写像 $f:X\to Y$、閉集合 $F\subset Y$ に対して、$f^{-1}(F)$ が $X$ の閉集合であることを示せ。

<!-- solution-start -->
#### 詳細解答

$F$ が閉なので $Y\setminus F$ は開集合です。$f$ は連続だから

$$
f^{-1}(Y\setminus F)
$$

は $X$ の開集合です。逆像は補集合と可換なので

$$
f^{-1}(Y\setminus F)
=
X\setminus f^{-1}(F).
$$

したがって $X\setminus f^{-1}(F)$ は開集合であり、$f^{-1}(F)$ は閉集合です。

#### 本番答案

$F$ が閉なので $Y\setminus F$ は開。連続性より $f^{-1}(Y\setminus F)$ は開であり、

$$
f^{-1}(Y\setminus F)=X\setminus f^{-1}(F)
$$

だから $f^{-1}(F)$ は閉。

#### 採点基準（20点）

- 閉集合の補集合を見る: 5点
- 連続性を逆像へ適用: 7点
- 逆像と補集合の関係: 5点
- 結論: 3点
<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00C-A02 $\varepsilon$--$\delta$ で一次関数の連続性を示す

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=3x+1$ が任意の $x_0\in\mathbb R$ で連続であることを $\varepsilon$--$\delta$ 定義から示せ。

<!-- solution-start -->
#### 詳細解答
任意の $\varepsilon>0$ に対し $\delta=\varepsilon/3$ と取る。$|x-x_0|<\delta$ なら
$$
|f(x)-f(x_0)|
=|3x+1-(3x_0+1)|
=3|x-x_0|
<3\delta
=\varepsilon.
$$
従って $f$ は $x_0$ で連続である。$x_0$ は任意なので全域で連続。

#### 本番答案
$\delta=\varepsilon/3$ と取れば
$$
|f(x)-f(x_0)|=3|x-x_0|<\varepsilon.
$$
<!-- solution-end -->

### F0-00C-A03 点列で不連続性を検出する

- Level: A
- 目安時間: 8分

$$
f(x)=\begin{cases}
0,&x<0,\\
1,&x\ge0
\end{cases}
$$
が $x=0$ で連続でないことを、適切な点列を一つ作って示せ。

<!-- solution-start -->
#### 詳細解答
$x_n=-1/n$ と置けば $x_n\to0$ である。しかし全ての $n$ で $x_n<0$ なので
$$
f(x_n)=0,
$$
一方 $f(0)=1$。従って $f(x_n)$ は $f(0)$ に収束しない。距離空間における連続性の点列特徴付けから $f$ は0で不連続である。

#### 本番答案
$x_n=-1/n\to0$ だが $f(x_n)=0\not\to1=f(0)$。よって不連続。
<!-- solution-end -->

### F0-00C-B02 連続写像の合成

- Level: B
- 目安時間: 12分

位相空間 $X,Y,Z$ と連続写像 $f:X\to Y$, $g:Y\to Z$ に対し、$g\circ f:X\to Z$ が連続であることを開集合の逆像から示せ。

<!-- solution-start -->
#### 詳細解答
$U\subseteq Z$ を任意の開集合とする。$g$ の連続性から $g^{-1}(U)$ は $Y$ で開。さらに $f$ の連続性から
$$
f^{-1}(g^{-1}(U))
$$
は $X$ で開である。一方
$$
(g\circ f)^{-1}(U)=f^{-1}(g^{-1}(U)).
$$
従って任意の開集合の逆像が開であり、$g\circ f$ は連続。

#### 本番答案
$$
(g\circ f)^{-1}(U)=f^{-1}(g^{-1}(U))
$$
で、右辺は連続性を二回使えば開。従って合成も連続。
<!-- solution-end -->

---

<!-- exercise-density-standard-supplement-20260912 -->

### F0-00C-A04 絶対値関数の連続性

- Level: A
- 目安時間: 8分

$f(x)=|x|$ が $\mathbb R$ 上で連続であることを
$$
\bigl||x|-|y|\bigr|\le|x-y|
$$
を使って示せ。

<!-- solution-start -->
#### 詳細解答
$x_0\in\mathbb R$ と $\varepsilon>0$ を任意に取る。$\delta=\varepsilon$ とすれば、$|x-x_0|<\delta$ から
$$
\bigl|f(x)-f(x_0)\bigr|
=\bigl||x|-|x_0|\bigr|
\le|x-x_0|
<\varepsilon.
$$
従って $f$ は任意の $x_0$ で連続。

#### 本番答案
$\delta=\varepsilon$ と取り、問題文で与えた不等式を使えば直ちに従う。
<!-- solution-end -->

### F0-00C-B03 閉包と連続像

- Level: B
- 目安時間: 14分

距離空間 $X,Y$、連続写像 $f:X\to Y$、集合 $A\subseteq X$ に対して
$$
f(\overline A)\subseteq\overline{f(A)}
$$
を示せ。

<!-- solution-start -->
#### 詳細解答
$x\in\overline A$ を取る。各 $n$ について閉包の定義から $A\cap B(x,1/n)\ne\varnothing$ なので、$a_n\in A\cap B(x,1/n)$ を一つ取る。すると $a_n\to x$。連続性から
$$
f(a_n)\to f(x).
$$
各 $f(a_n)\in f(A)$ で $f(a_n)\to f(x)$ だから、$f(x)$ の任意の近傍は十分大きい $n$ の $f(a_n)$ を含み、$f(A)$ と交わる。従って閉包の定義から $f(x)\in\overline{f(A)}$。よって包含が成り立つ。

#### 本番答案
$x\in\overline A$ なら各 $n$ で $a_n\in A\cap B(x,1/n)$ を取り、$a_n\to x$ とできる。連続性で $f(a_n)\to f(x)$ なので、$f(x)$ の任意の近傍が $f(A)$ と交わる。
<!-- solution-end -->

### F0-00C-C01 不連続なら反例列を作れる

- Level: C
- 目安時間: 18分

距離空間 $X,Y$ の写像 $f:X\to Y$ が点 $x\in X$ で連続でないとする。ある点列 $x_n\to x$ が存在して $f(x_n)\not\to f(x)$ となることを定義から構成せよ。

<!-- solution-start -->
#### 詳細解答
$f$ が $x$ で連続でないので、ある $\varepsilon_0>0$ が存在し、どの $\delta>0$ に対しても
$$
d_X(x,y)<\delta,\qquad d_Y(f(x),f(y))\ge\varepsilon_0
$$
を満たす $y$ が存在する。

各 $n$ で $\delta=1/n$ として、そのような点を $x_n$ と選ぶ。すると
$$
d_X(x_n,x)<1/n
$$
なので $x_n\to x$。しかし全ての $n$ で
$$
d_Y(f(x_n),f(x))\ge\varepsilon_0,
$$
従って $f(x_n)$ は $f(x)$ に収束しない。

#### 本番答案
不連続性の否定定義から固定 $\varepsilon_0>0$ を取り、$\delta=1/n$ ごとに反例 $x_n$ を選ぶ。すると $x_n\to x$ だが像は $\varepsilon_0$ 以上離れ続ける。
<!-- solution-end -->

---

## 4. 次に進む

連続性を三つの形で扱えるようになったので、次は「無限の局所情報を有限に圧縮できる」コンパクト性へ進みます。

**次：[F0-00C1 コンパクト性・点列コンパクト性・Heine--Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md)**
