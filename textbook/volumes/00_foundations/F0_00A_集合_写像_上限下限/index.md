# F0-00A 補講：集合・写像・量化記号

この補講は、後続の位相・測度・関数解析で使う「集合と写像の言葉」を一度だけ丁寧に整理します。

中心線は

$$
\boxed{\text{集合操作}\to\text{写像・像・逆像}\to\text{単射・全射・全単射}\to\text{量化記号}}
$$

です。上限・下限と最適化の話は次講F0-00A1へ分離します。

---

## 1. 集合・所属・部分集合

集合 $A$ に $x$ が属することを

$$
x\in A
$$

と書き、属さないことを $x\notin A$ と書きます。

例えば

$$
A=\{x\in\mathbb R:x^2<4\}=(-2,2)
$$

です。波括弧の右側は「実数 $x$ のうち $x^2<4$ を満たすもの全部」と読みます。

<a id="def-f0-00a-subset"></a>

<!-- formal-statement-start -->
> **定義（部分集合）**  
> 集合 $A,B$ に対して、$A$ のすべての要素が $B$ にも属するとき、$A$ は $B$ の **部分集合** であるといい

$$
A\subseteq B
$$

> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-subset -->
### 1.1 定義の確認

**定義の確認**

$$
A=\{1,2\},\qquad B=\{1,2,3\}
$$

では、$A$ の要素1,2はいずれも $B$ に属するので $A\subseteq B$ です。一方 $3\in B$ ですが $3\notin A$ なので $B\subseteq A$ ではありません。
<!-- definition-example-end -->

したがって集合の等号は

$$
A=B
\iff
A\subseteq B\ \text{かつ}\ B\subseteq A
$$

で確認できます。

---

## 2. 和集合・共通部分・補集合

<a id="def-f0-00a-set-operations"></a>

<!-- formal-statement-start -->
> **定義（和集合・共通部分・補集合）**  
> 集合 $A,B$ に対して

$$
A\cup B=\{x:x\in A\ \text{または}\ x\in B\},
$$

$$
A\cap B=\{x:x\in A\ \text{かつ}\ x\in B\}
$$

> と定める。全体集合を $X$ とするとき

$$
A^c=X\setminus A=\{x\in X:x\notin A\}
$$

> を $A$ の **補集合** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-set-operations -->
### 2.1 定義の確認

**定義の確認**

$$
X=\{1,2,3,4\},\quad A=\{1,2\},\quad B=\{2,3\}
$$

とすると

$$
A\cup B=\{1,2,3\},\qquad
A\cap B=\{2\},\qquad
A^c=\{3,4\}.
$$

それぞれ「少なくとも一方に属する」「両方に属する」「$X$ に属して $A$ には属さない」という定義をそのまま確認しています。
<!-- definition-example-end -->

De Morgan則

$$
(A\cup B)^c=A^c\cap B^c,
\qquad
(A\cap B)^c=A^c\cup B^c
$$

は、確率論の事象でも位相の開集合・閉集合でも繰り返し現れます。

---

## 3. 直積集合

<a id="def-f0-00a-cartesian-product"></a>

<!-- formal-statement-start -->
> **定義（直積集合）**  
> 集合 $X,Y$ に対して

$$
X\times Y
=\{(x,y):x\in X,\ y\in Y\}
$$

> を $X$ と $Y$ の **直積集合** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-cartesian-product -->
### 3.1 定義の確認

**定義の確認**

$$
X=\{1,2\},\qquad Y=\{a,b\}
$$

なら

$$
X\times Y
=\{(1,a),(1,b),(2,a),(2,b)\}.
$$

第1成分を $X$ から、第2成分を $Y$ から選んだ順序対がすべて入っています。
<!-- definition-example-end -->

例えば

$$
\mathbb R^2=\mathbb R\times\mathbb R.
$$

最適化で $x$ と乗数 $\lambda$ を同時に扱うときや、二つの集合の点の組 $(p,q)$ を扱うときに自然に出てきます。

---

## 4. 写像・定義域・終域

<a id="def-f0-00a-map"></a>

<!-- formal-statement-start -->
> **定義（写像・定義域・終域）**  
> 集合 $X$ の各元 $x$ に対して、集合 $Y$ の元 $f(x)$ をただ一つ対応させる規則を **写像** といい

$$
f:X\to Y
$$

> と書く。このとき $X$ を **定義域**、$Y$ を **終域** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-map -->
### 4.1 定義の確認

**定義の確認**

$$
X=\{1,2,3\},\qquad Y=\{a,b\}
$$

として

$$
f(1)=a,\qquad f(2)=b,\qquad f(3)=a
$$

とすれば、各 $x\in X$ に $Y$ の元がただ一つ対応しているので $f:X\to Y$ は写像です。$1$ に $a$ と $b$ の両方を対応させる規則なら写像ではありません。
<!-- definition-example-end -->

「同じ $x$ に二つの値を割り当てない」が写像の条件です。異なる $x$ が同じ値へ写ることは許されます。

---

## 5. 像と逆像

<a id="def-f0-00a-image-preimage"></a>

<!-- formal-statement-start -->
> **定義（像・逆像）**  
> 写像 $f:X\to Y$ と部分集合 $A\subseteq X$、$B\subseteq Y$ に対して

$$
f(A)=\{f(x):x\in A\}
$$

> を $A$ の **像**、

$$
f^{-1}(B)=\{x\in X:f(x)\in B\}
$$

> を $B$ の **逆像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-image-preimage -->
### 5.1 定義の確認

**定義の確認**

$f:\mathbb R\to\mathbb R$, $f(x)=x^2$ とします。$A=[-2,-1]$ なら

$$
f(A)=[1,4].
$$

また $B=(1,4)$ なら

$$
f^{-1}(B)=(-2,-1)\cup(1,2).
$$

像では定義域側の集合を前へ写し、逆像では終域側の条件を満たす入力を集めています。
<!-- definition-example-end -->

ここで $f^{-1}(B)$ は逆関数を仮定していません。例えば

$$
f(x)=x^2,
\qquad B=(1,4)
$$

なら

$$
f^{-1}(B)=(-2,-1)\cup(1,2).
$$

$f$ は $\mathbb R$ 上で一対一ではありませんが、集合の逆像は問題なく定義できます。この逆像が後の位相で

$$
\text{連続}\Longleftrightarrow\text{開集合の逆像が開集合}
$$

という形で現れます。

---

## 6. 単射・全射・全単射

<a id="def-f0-00a-injective-surjective-bijective"></a>

<!-- formal-statement-start -->
> **定義（単射・全射・全単射）**  
> 写像 $f:X\to Y$ が **単射** であるとは

$$
f(x_1)=f(x_2)\Longrightarrow x_1=x_2
$$

> が成り立つことをいう。$f$ が **全射** であるとは

$$
\forall y\in Y,\ \exists x\in X:\ f(x)=y
$$

> が成り立つことをいう。単射かつ全射である写像を **全単射** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-injective-surjective-bijective -->
### 6.1 定義の確認

**定義の確認**

$$
f:\{1,2,3\}\to\{a,b,c\},
\qquad
f(1)=a,\ f(2)=b,\ f(3)=c
$$

は、異なる入力が異なる出力へ写り、終域の $a,b,c$ がすべて像に現れるので全単射です。

一方

$$
g:\{1,2,3\}\to\{a,b\},
\qquad
g(1)=a,\ g(2)=b,\ g(3)=a
$$

は全射ですが、$g(1)=g(3)$ なので単射ではありません。
<!-- definition-example-end -->

言い換えると、

- 単射：異なる入力を同じ出力へ潰さない。
- 全射：終域に取りこぼしがない。
- 全単射：一対一対応になっている。

です。

全単射 $f:X\to Y$ には逆写像 $f^{-1}:Y\to X$ が定まります。一方、前節の集合の逆像 $f^{-1}(B)$ は全単射でなくても使えます。

関数解析では線形作用素 $T:X\to Y$ の全射性が制約想定に関係し、有限次元の「行フルランク」はその具体例です。

---

## 7. 合成写像

<a id="def-f0-00a-composition"></a>

<!-- formal-statement-start -->
> **定義（合成写像）**  
> 写像

$$
f:X\to Y,
\qquad g:Y\to Z
$$

> に対し

$$
(g\circ f)(x)=g(f(x))
$$

> で定まる写像 $g\circ f:X\to Z$ を **合成写像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00a-composition -->
### 7.1 定義の確認

**定義の確認**

$$
f:\mathbb R\to\mathbb R,\quad f(x)=x+1,
\qquad
g:\mathbb R\to\mathbb R,\quad g(y)=y^2
$$

なら

$$
(g\circ f)(x)=g(x+1)=(x+1)^2,
$$

一方

$$
(f\circ g)(x)=f(x^2)=x^2+1.
$$

したがって合成では写像を適用する順序が重要です。
<!-- definition-example-end -->

逆像には

$$
(g\circ f)^{-1}(C)
=f^{-1}(g^{-1}(C))
$$

が成り立ちます。「外側から条件を戻していく」と考えると自然です。

---

## 8. 量化記号を日本語へ戻す

関数解析では $\forall,\exists$ が頻繁に現れます。

- $\forall x\in X$：すべての $x\in X$ について。
- $\exists x\in X$：ある $x\in X$ が存在して。

例えば

$$
\forall\varepsilon>0,
\ \exists N,
\ \forall n\ge N,
\quad
|x_n-x|<\varepsilon
$$

は

> どんな正の誤差幅 $\varepsilon$ を指定しても、その誤差幅の中へ、ある番号以降ずっと入る。

と読みます。

記号を左から日本語へ戻すだけで、定義の負荷はかなり下がります。

---

## 9. 演習

### F0-00A-A01 集合記号を読む

- Level: A
- 目安時間: 8分

$A=\{1,2\}$、$B=\{1,2,3\}$ とする。$A\subseteq B$、$A\in B$ の真偽を判定し、違いを説明せよ。

<!-- solution-start -->
#### 詳細解答
$A$ の全要素1,2は $B$ に入るので $A\subseteq B$ は真。一方、$B$ の要素は1,2,3であり、集合 $A$ 自身は要素ではないので $A\in B$ は偽。$\subseteq$ は集合間の包含、$\in$ は要素と集合の所属関係である。

#### 本番答案
$A\subseteq B$ は真、$A\in B$ は偽。前者は包含、後者は所属を表す。

#### 採点基準（20点）
- 包含判定: 6点
- 所属判定: 6点
- 記号の意味の区別: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00A-B01 逆像は逆関数ではない

- Level: B
- 目安時間: 12分

$f:\mathbb R\to\mathbb R$, $f(x)=x^2$ と $B=[1,4)$ に対して $f^{-1}(B)$ を求めよ。また、$f$ が全単射でないことがこの逆像の定義を妨げない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
$1\le x^2<4$ より $1\le |x|<2$。したがって

$$
f^{-1}(B)=(-2,-1]\cup[1,2).
$$

逆像は「値が $B$ に入る定義域の点全体」という集合操作であり、逆写像 $f^{-1}:Y\to X$ の存在を仮定しない。

#### 本番答案

$$
\boxed{f^{-1}([1,4))=(-2,-1]\cup[1,2)}.
$$

逆像は集合の条件 $f(x)\in B$ で定義されるため、$f$ の全単射性は不要。

#### 採点基準（20点）
- 不等式変形: 6点
- 逆像: 8点
- 逆関数との区別: 4点
- 結論: 2点
<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00A-A02 像と逆像の違いを計算する

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=x^2$、$A=[-2,1]$、$B=[1,4]$ とする。$f(A)$ と $f^{-1}(B)$ を求め、像と逆像で出発する集合がどちら側にあるか説明せよ。

<!-- solution-start -->
#### 詳細解答
$A$ は定義域側の集合なので、その各点を $f$ で送ると
$$
f(A)=[0,4].
$$
一方 $B$ は終域側の集合であり、逆像は $1\le x^2\le4$ を満たす入力全体だから
$$
f^{-1}(B)=[-2,-1]\cup[1,2].
$$
像は「入力側の集合を前へ送る」、逆像は「出力側の条件を満たす入力を集める」操作である。

#### 本番答案
$$
\boxed{f(A)=[0,4]},\qquad
\boxed{f^{-1}(B)=[-2,-1]\cup[1,2]}.
$$
像は定義域側から、逆像は終域側から出発する。
<!-- solution-end -->

### F0-00A-A03 量化記号の否定

- Level: A
- 目安時間: 8分

次の主張
$$
\forall x\in\mathbb R\ \exists y\in\mathbb R:\ y>x
$$
を日本語で読み、その否定を量化記号で書け。

<!-- solution-start -->
#### 詳細解答
元の主張は「任意の実数 $x$ に対して、それより大きい実数 $y$ が存在する」である。否定では $\forall$ と $\exists$ が入れ替わり、最後の条件も否定されるので
$$
\exists x\in\mathbb R\ \forall y\in\mathbb R:\ y\le x.
$$
これは「最大の実数が存在する」という主張であり、元の主張の否定になっている。

#### 本番答案
$$
\boxed{\exists x\in\mathbb R\ \forall y\in\mathbb R:\ y\le x}.
$$
<!-- solution-end -->

### F0-00A-B02 逆像は集合演算を保つ

- Level: B
- 目安時間: 12分

写像 $f:X\to Y$ と $B,C\subseteq Y$ に対して
$$
f^{-1}(B\cap C)=f^{-1}(B)\cap f^{-1}(C)
$$
を、両包含を示して証明せよ。

<!-- solution-start -->
#### 詳細解答
$x\in f^{-1}(B\cap C)$ とする。逆像の定義から $f(x)\in B\cap C$、すなわち $f(x)\in B$ かつ $f(x)\in C$ である。よって $x\in f^{-1}(B)$ かつ $x\in f^{-1}(C)$ なので
$$
f^{-1}(B\cap C)\subseteq f^{-1}(B)\cap f^{-1}(C).
$$
逆に $x\in f^{-1}(B)\cap f^{-1}(C)$ なら $f(x)\in B$ かつ $f(x)\in C$ だから $f(x)\in B\cap C$。従って $x\in f^{-1}(B\cap C)$ である。

#### 本番答案
任意の $x\in X$ について
$$
x\in f^{-1}(B\cap C)
\iff f(x)\in B\cap C
\iff x\in f^{-1}(B)\cap f^{-1}(C).
$$
よって両集合は等しい。
<!-- solution-end -->

---

<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A-A04 単射を定義から判定する

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=2x-3$ が単射であることを定義から示せ。

<!-- solution-start -->
#### 詳細解答
$f(x_1)=f(x_2)$ と仮定すると
$$
2x_1-3=2x_2-3
$$
なので $2x_1=2x_2$、従って $x_1=x_2$。これは単射の定義そのものである。

#### 本番答案
$f(x_1)=f(x_2)$ なら $2x_1-3=2x_2-3$ より $x_1=x_2$。従って単射。
<!-- solution-end -->

### F0-00A-B03 像は共通部分をどこまで保つか

- Level: B
- 目安時間: 12分

任意の写像 $f:X\to Y$ と $A,B\subseteq X$ に対して
$$
f(A\cap B)\subseteq f(A)\cap f(B)
$$
を示せ。また、等号が一般には成り立たない例を一つ作れ。

<!-- solution-start -->
#### 詳細解答
$y\in f(A\cap B)$ とすると、ある $x\in A\cap B$ が存在して $y=f(x)$。すると $x\in A$ かつ $x\in B$ だから $y\in f(A)$ かつ $y\in f(B)$。よって包含が成り立つ。

等号が壊れる例として $f:\mathbb R\to\mathbb R$, $f(x)=x^2$、$A=\{-1\}$、$B=\{1\}$ を取ると
$$
A\cap B=\varnothing,\qquad f(A)\cap f(B)=\{1\}.
$$
従って左辺は空集合、右辺は非空である。

#### 本番答案
包含は像の定義から従う。反例は $f(x)=x^2$, $A=\{-1\}$, $B=\{1\}$。
<!-- solution-end -->

### F0-00A-C01 単射を集合の逆像で特徴付ける

- Level: C
- 目安時間: 18分

写像 $f:X\to Y$ について、次が同値であることを示せ。

1. $f$ は単射である。
2. 任意の $A\subseteq X$ に対して $f^{-1}(f(A))=A$。

<!-- solution-start -->
#### 詳細解答
1を仮定する。常に $A\subseteq f^{-1}(f(A))$ である。逆に $x\in f^{-1}(f(A))$ なら $f(x)\in f(A)$ なので、ある $a\in A$ が存在して $f(x)=f(a)$。単射性から $x=a\in A$。従って等号。

2を仮定し、$f(x)=f(x')$ とする。$A=\{x\}$ と置けば $f(x')\in f(A)$ なので $x'\in f^{-1}(f(A))=A=\{x\}$。従って $x'=x$ であり、$f$ は単射。

#### 本番答案
単射なら $f(x)=f(a)$ から $x=a$ を使って逆包含が出る。逆に $A=\{x\}$ を用いれば $f(x')=f(x)$ から $x'\in f^{-1}(f(A))=A$、よって $x'=x$。
<!-- solution-end -->

---

## 10. 次に進む

集合と写像の読み方が固まったら、実数集合の「境界値」を表す supremum / infimum へ進みます。

**次：[F0-00A1 上界・下界・supremum・infimum](../F0_00A1_上界_下界_supremum_infimum/index.md)**
