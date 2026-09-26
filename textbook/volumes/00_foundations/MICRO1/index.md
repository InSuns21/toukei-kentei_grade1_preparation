# MICRO1 選好・効用・凸性

<!-- definition-example-audit: strict -->

ミクロ経済学では、最初から「効用を最大化する」とは考えません。

出発点は、二つの選択肢 $x,y$ を比べたときに

$$
x\succeq y
$$

と判断する比較規則です。

効用関数は、この順序を実数で表すための道具です。したがって重要なのは数値そのものではなく、

$$
u(x)\ge u(y)
\iff
x\succeq y
$$

という順序です。

本章では、後続の消費者理論・厚生経済学・一般均衡で何度も使う次の骨格を作ります。

$$
\boxed{
\text{選好}
\longrightarrow
\text{上位集合}
\longrightarrow
\text{凸選好}
\longleftrightarrow
\text{準凹な効用表現}
}
$$

特に、[OPT1 の凸関数・準凹関数](../OPT1/index.md)と混同しやすい点を整理します。

---

## 1. 「どちらを少なくとも同じくらい望むか」を規則にする

選択集合を $X$ とします。消費者理論では典型的に

$$
X=\mathbb R_+^L
$$

を考えます。

<a id="def-micro1-preference"></a>

<!-- formal-statement-start -->
> **定義（選好関係・狭義選好・無差別）**  
> $X$ の任意の二つの選択肢 $x,y$ に対し、「$x$ を $y$ 以上に望む」かどうかを定める規則 $\succeq$ を **選好関係** とよぶ。
>
> $x\succeq y$ は「$x$ を $y$ 以上に望む」と読む。
>
> 選好関係から
>
> $$
> x\succ y
> \iff
> x\succeq y
> \text{ かつ }
> y\not\succeq x
> $$
>
> により **狭義選好** $\succ$ を、
>
> $$
> x\sim y
> \iff
> x\succeq y
> \text{ かつ }
> y\succeq x
> $$
>
> により **無差別** $\sim$ を定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro1-preference -->
**定義の確認**：二財の合計だけを評価する選好

$$
X=\mathbb R_+^2
$$

で

$$
x\succeq y
\iff
x_1+x_2\ge y_1+y_2
$$

とします。

例えば

$$
(2,1)\sim(1,2)
$$

であり、

$$
(3,1)\succ(1,2)
$$

です。

ここで比較しているのは二つの点そのものではなく、点の組 $(x,y)$ に対して真偽を返す関係です。
<!-- definition-example-end -->

---

## 2. 完備性と推移性は比較を一貫させる

<a id="def-micro1-complete-transitive"></a>

<!-- formal-statement-start -->
> **定義（完備性・推移性）**  
> 選好関係 $\succeq$ が **完備** であるとは、任意の $x,y\in X$ に対し
>
> $$
> x\succeq y
> \quad\text{または}\quad
> y\succeq x
> $$
>
> が成り立つことをいう。
>
> $\succeq$ が **推移的** であるとは、任意の $x,y,z\in X$ に対し
>
> $$
> x\succeq y,\qquad y\succeq z
> $$
>
> ならば
>
> $$
> x\succeq z
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

完備性は「どちらとも比較できない」を排除します。

推移性は

$$
x\succeq y,\quad y\succeq z,\quad z\succ x
$$

のような順序の循環を排除します。

前節の

$$
x\succeq y
\iff
x_1+x_2\ge y_1+y_2
$$

は、実数の大小関係からそのまま完備性と推移性を受け継ぎます。

---

## 3. 単調性は「財が増えて悪くならない」を表す

ベクトルの成分ごとの大小を

$$
x\ge y
\iff
x_i\ge y_i
\quad(i=1,\dots,L)
$$

で表します。

<a id="def-micro1-monotonicity"></a>

<!-- formal-statement-start -->
> **定義（単調な選好・狭義単調な選好）**  
> $X\subset\mathbb R_+^L$ 上の選好 $\succeq$ が **単調** であるとは、
>
> $$
> x\ge y
> \Longrightarrow
> x\succeq y
> $$
>
> が成り立つことをいう。
>
> さらに
>
> $$
> x\ge y,\qquad x\ne y
> \Longrightarrow
> x\succ y
> $$
>
> が成り立つとき、**狭義単調** であるという。
<!-- formal-statement-end -->

例えば

$$
u(x)=x_1+x_2
$$

で表される選好は狭義単調です。

一方、

$$
u(x)=\min\{x_1,x_2\}
$$

で表される選好は単調ですが狭義単調ではありません。

実際、

$$
(2,1)\ge(1,1)
$$

でも

$$
\min\{2,1\}
=
\min\{1,1\}
=
1
$$

なので

$$
(2,1)\sim(1,1).
$$

補完的な財では、一方だけ増えても評価が上がらないことがあります。

---

## 4. 上位集合は選好を集合として見る道具である

<a id="def-micro1-upper-contour"></a>

<!-- formal-statement-start -->
> **定義（上位集合・下位集合）**  
> $y\in X$ に対し
>
> $$
> U(y)
> =
> \{x\in X:x\succeq y\}
> $$
>
> を $y$ の **上位集合** といい、
>
> $$
> L(y)
> =
> \{x\in X:y\succeq x\}
> $$
>
> を $y$ の **下位集合** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro1-upper-contour -->
**直接例**：完全補完

$$
u(x)=\min\{x_1,x_2\}
$$

で表される選好を考えます。

基準点

$$
y=(2,3)
$$

では

$$
u(y)=2.
$$

従って

$$
U(y)
=
\{x:\min(x_1,x_2)\ge2\}
=
[2,\infty)\times[2,\infty).
$$

これは凸集合です。

点

$$
(2,10),\qquad(10,2)
$$

はいずれも $U(y)$ に属し、その中点

$$
(6,6)
$$

も $U(y)$ に属します。
<!-- definition-example-end -->

---

## 5. 凸選好は「二つの良い選択肢を混ぜても悪くならない」

<a id="def-micro1-convex-preference"></a>

<!-- formal-statement-start -->
> **定義（凸選好）**  
> $X\subset\mathbb R^L$ を凸集合とする。
>
> 選好関係 $\succeq$ が **凸選好** であるとは、任意の $y\in X$ に対して上位集合
>
> $$
> U(y)=\{x\in X:x\succeq y\}
> $$
>
> が凸集合であることをいう。
<!-- formal-statement-end -->

この定義を点の比較へ書き直すと、

$$
x\succeq y,\qquad z\succeq y
$$

なら任意の $\lambda\in[0,1]$ に対し

$$
\lambda x+(1-\lambda)z
\succeq y
$$

という意味です。

「平均を好む」と言われることがありますが、正確には

> 同じ基準 $y$ 以上に好まれる二点を混ぜても、その基準より悪くならない

という性質です。

<a id="prop-micro1-convex-upper"></a>

<!-- formal-statement-start -->
> **命題（凸選好と上位集合）**  
> 凸な選択集合 $X$ 上の選好 $\succeq$ について、次は同値である。
>
> 1. $\succeq$ は凸選好である。
> 2. 任意の $x,z,y\in X$ と $\lambda\in[0,1]$ に対し
>
> $$
> x\succeq y,\quad z\succeq y
> \Longrightarrow
> \lambda x+(1-\lambda)z\succeq y.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 から 2 を示します。

$x\succeq y$ と $z\succeq y$ なら

$$
x,z\in U(y).
$$

$U(y)$ は凸集合なので

$$
\lambda x+(1-\lambda)z\in U(y).
$$

従って

$$
\lambda x+(1-\lambda)z\succeq y.
$$

逆に 2 を仮定します。

任意の $y\in X$ と

$$
x,z\in U(y)
$$

を取ります。

これは

$$
x\succeq y,\qquad z\succeq y
$$

を意味するので、2 より

$$
\lambda x+(1-\lambda)z\succeq y.
$$

従って

$$
\lambda x+(1-\lambda)z\in U(y).
$$

よって $U(y)$ は凸集合です。
<!-- proof-end -->

---

## 6. 効用関数は選好の順序を数値で表現する

<a id="def-micro1-utility-representation"></a>

<!-- formal-statement-start -->
> **定義（効用表現）**  
> 選好関係 $\succeq$ に対し、関数
>
> $$
> u:X\to\mathbb R
> $$
>
> が
>
> $$
> x\succeq y
> \iff
> u(x)\ge u(y)
> $$
>
> を満たすとき、$u$ は $\succeq$ の **効用表現** であるという。
<!-- formal-statement-end -->

効用表現があれば、

$$
x\succ y
\iff
u(x)>u(y),
$$

$$
x\sim y
\iff
u(x)=u(y)
$$

となります。

ただし、効用値そのものに距離や比率の意味を読み込んではいけません。

<a id="prop-micro1-monotone-transform"></a>

<!-- formal-statement-start -->
> **命題（狭義単調変換は同じ選好を表す）**  
> $u:X\to\mathbb R$ が選好 $\succeq$ を表し、
>
> $$
> \phi:u(X)\to\mathbb R
> $$
>
> が狭義単調増加なら、
>
> $$
> v=\phi\circ u
> $$
>
> も同じ選好 $\succeq$ を表す。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\phi$ が狭義単調増加なので

$$
u(x)\ge u(y)
\iff
\phi(u(x))\ge\phi(u(y)).
$$

また $u$ が選好を表すので

$$
x\succeq y
\iff
u(x)\ge u(y).
$$

二つを合わせれば

$$
x\succeq y
\iff
v(x)\ge v(y).
$$
<!-- proof-end -->

例えば

$$
u(x)=x_1+x_2
$$

と

$$
v(x)=\exp(x_1+x_2)
$$

は同じ選好を表します。

ところが $u$ は affine であり、$v$ は凸関数です。

したがって、**効用関数が凸か凹かは選好そのものの性質ではありません**。

---

## 7. 完備性と推移性だけでは効用表現は自動ではない

有限個の選択肢しかないなら、完備で推移的な選好は実数で順位付けできます。

<a id="prop-micro1-finite-representation"></a>

<!-- formal-statement-start -->
> **命題（有限集合上の効用表現）**  
> $X$ が有限集合で、$\succeq$ が完備かつ推移的なら、$\succeq$ は実数値効用表現を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各 $x\in X$ に対し、

$$
D(x)=\{z\in X:x\succeq z\}
$$

と置き、

$$
u(x)=|D(x)|
$$

と定めます。$X$ は有限なので $u(x)$ は有限の実数です。

まず

$$
x\succeq y
$$

とします。

$z\in D(y)$ なら

$$
y\succeq z
$$

です。推移性から

$$
x\succeq z
$$

なので

$$
z\in D(x).
$$

従って

$$
D(y)\subset D(x),
$$

したがって

$$
u(x)\ge u(y).
$$

逆に

$$
x\not\succeq y
$$

とします。

完備性から

$$
y\succeq x
$$

であり、さらに $x\not\succeq y$ なので

$$
y\succ x.
$$

任意の $z\in D(x)$ について

$$
x\succeq z
$$

だから、推移性より

$$
y\succeq z.
$$

従って

$$
D(x)\subset D(y).
$$

しかも

$$
y\in D(y)
$$

である一方、

$$
y\notin D(x)
$$

です。よって包含は厳密で、

$$
u(y)>u(x).
$$

したがって

$$
u(x)\ge u(y)
$$

なら必ず

$$
x\succeq y.
$$

以上より

$$
x\succeq y
\iff
u(x)\ge u(y).
$$

よって $u$ は効用表現です。
<!-- proof-end -->

しかし無限集合では事情が違います。

### 辞書式選好

$$
X=[0,1]^2
$$

で

$$
x\succ_{\mathrm{lex}} y
$$

を

- $x_1>y_1$、または
- $x_1=y_1$ かつ $x_2>y_2$

で定めます。

これは辞書で第一キーを比較し、同点のときだけ第二キーを見る順序です。

完備で推移的ですが、実数値効用表現を持ちません。

<a id="prop-micro1-lex-no-utility"></a>

<!-- formal-statement-start -->
> **命題（辞書式選好は実数値効用表現を持たない）**  
> $[0,1]^2$ 上の辞書式選好は完備かつ推移的であるが、実数値効用表現を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

完備性と推移性は辞書順の定義から直接確認できます。

実数値効用表現 $u$ が存在すると仮定します。

各 $a\in[0,1]$ について

$$
(a,1)\succ_{\mathrm{lex}}(a,0)
$$

なので

$$
u(a,1)>u(a,0).
$$

従って開区間

$$
I_a=(u(a,0),u(a,1))
$$

は空でありません。

$a<b$ なら第一座標だけで

$$
(b,0)\succ_{\mathrm{lex}}(a,1)
$$

なので

$$
u(b,0)>u(a,1).
$$

したがって $I_a$ と $I_b$ は互いに交わりません。

有理数全体をあらかじめ

$$
\mathbb Q=\{r_1,r_2,\dots\}
$$

と列挙しておきます。

各非空開区間 $I_a$ は有理数を含むので、$I_a$ に入る最初の $r_n$ を $q_a$ と定めます。

区間が互いに素なので

$$
a\ne b
\Longrightarrow
q_a\ne q_b.
$$

これは非可算集合 $[0,1]$ から可算集合 $\mathbb Q$ への単射を与えてしまい、矛盾です。

従って実数値効用表現は存在しません。
<!-- proof-end -->

この反例は、連続な財空間で効用表現を得るには、完備性・推移性だけでなく追加の正則性が必要であることを示します。

---

## 8. 凸選好と結びつくのは凸性ではなく準凹性である

[OPT1](../OPT1/index.md#def-opt1-quasiconvex) で、関数 $u$ が準凹であることを

$$
u(\lambda x+(1-\lambda)z)
\ge
\min\{u(x),u(z)\}
$$

で定義しました。

これは上位集合が凸であることと同値です。

<a id="thm-micro1-convex-quasiconcave"></a>

<!-- formal-statement-start -->
> **定理（凸選好と準凹な効用表現）**  
> $X\subset\mathbb R^L$ を凸集合とし、$u:X\to\mathbb R$ が選好 $\succeq$ を表すとする。
>
> このとき次は同値である。
>
> 1. $\succeq$ は凸選好である。
> 2. $u$ は準凹関数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 を仮定します。

任意の $x,z\in X$ と $\lambda\in[0,1]$ を取ります。

一般性を失わず

$$
u(x)\ge u(z)
$$

とします。

$u$ は選好を表すので

$$
x\succeq z.
$$

また当然

$$
z\succeq z.
$$

凸選好より

$$
\lambda x+(1-\lambda)z\succeq z.
$$

従って

$$
u(\lambda x+(1-\lambda)z)
\ge
u(z)
=
\min\{u(x),u(z)\}.
$$

よって $u$ は準凹です。

逆に $u$ が準凹であるとします。

$x\succeq y$ と $z\succeq y$ を取ると

$$
u(x)\ge u(y),
\qquad
u(z)\ge u(y).
$$

準凹性から

$$
u(\lambda x+(1-\lambda)z)
\ge
\min\{u(x),u(z)\}
\ge
u(y).
$$

したがって

$$
\lambda x+(1-\lambda)z\succeq y.
$$

[凸選好と上位集合の命題](#prop-micro1-convex-upper)より、$\succeq$ は凸選好です。
<!-- proof-end -->

ここが本章の最重要点です。

$$
\boxed{
\text{凸選好}
\Longleftrightarrow
\text{効用表現の準凹性}
}
$$

であって、

$$
\text{凸選好}
\Longleftrightarrow
\text{効用関数の凸性}
$$

ではありません。

---

## 9. 凸関数の効用でも凸選好とは限らない

$$
u(x)=x_1^2+x_2^2
$$

を $\mathbb R_+^2$ 上で考えます。

$u$ は凸関数です。

しかし

$$
u(1,0)=u(0,1)=1
$$

なのに、中点では

$$
u\left(\frac12,\frac12\right)
=
\frac12
<
1.
$$

したがって

$$
(1,0)\succeq(1,0),
\qquad
(0,1)\succeq(1,0)
$$

である一方、

$$
\left(\frac12,\frac12\right)
\prec(1,0).
$$

上位集合は凸ではなく、この効用が表す選好は凸選好ではありません。

他方、

$$
v(x)=e^{x_1+x_2}
$$

も凸関数ですが、これは $x_1+x_2$ の狭義単調変換なので、半空間型の凸な上位集合を持ちます。

つまり、

> 効用関数が凸である

という事実だけから選好の凸性は判定できません。

見るべきものは **上位集合**、あるいは同値な **準凹性** です。

---

## 10. 次章への接続：選好から最大化問題へ

ここまでで、消費者の「好み」を数学に翻訳する準備ができました。

次章では価格 $p$ と所得 $m$ から予算集合

$$
B(p,m)
=
\{x\in\mathbb R_+^L:p\cdot x\le m\}
$$

を作り、

$$
\max_{x\in B(p,m)}u(x)
$$

を解きます。

そこで重要になるのは、

- 予算集合が凸であること
- 効用表現が存在する凸選好では、その効用が準凹になること
- 最適化問題を KKT 条件へ落とせる場合があること

です。

MICRO1 は「選好を順序として定義する章」、MICRO2 は「その順序のもとで予算制約付き最適化を解く章」です。

---

# 演習

## Level A

<a id="ex-micro1-a01"></a>

### MICRO1-A01 完備性と推移性を確認する

- Level: A
- 目安時間: 12分

$X=\mathbb R_+^2$ 上で

$$
x\succeq y
\iff
2x_1+x_2\ge2y_1+y_2
$$

とする。

1. 完備性を示せ。
2. 推移性を示せ。
3. $(1,2)$ と $(0,4)$ の関係を判定せよ。

<!-- solution-start -->
#### 詳細解答

1. 任意の $x,y$ について実数

$$
2x_1+x_2,
\qquad
2y_1+y_2
$$

は大小比較できます。

従って

$$
2x_1+x_2\ge2y_1+y_2
$$

または

$$
2y_1+y_2\ge2x_1+x_2
$$

が成り立ちます。

よって選好は完備です。

2. $x\succeq y$ と $y\succeq z$ なら

$$
2x_1+x_2\ge2y_1+y_2
$$

かつ

$$
2y_1+y_2\ge2z_1+z_2.
$$

実数の大小関係の推移性から

$$
2x_1+x_2\ge2z_1+z_2.
$$

従って $x\succeq z$ です。

3.

$$
2\cdot1+2=4,
$$

$$
2\cdot0+4=4.
$$

よって

$$
\boxed{(1,2)\sim(0,4)}.
$$
<!-- solution-end -->

<a id="ex-micro1-a02"></a>

### MICRO1-A02 単調性と狭義単調性を区別する

- Level: A
- 目安時間: 12分

次の効用で表される選好が単調か、狭義単調かを判定せよ。

1.
   $$
   u(x)=x_1+x_2
   $$
2.
   $$
   v(x)=\min\{x_1,x_2\}.
   $$

<!-- solution-start -->
#### 詳細解答

1. $x\ge y$ なら

$$
x_1+x_2\ge y_1+y_2.
$$

従って単調です。

さらに $x\ge y$ かつ $x\ne y$ なら、少なくとも一つの成分で不等号が厳密なので

$$
x_1+x_2>y_1+y_2.
$$

よって狭義単調です。

2. $x\ge y$ なら

$$
\min\{x_1,x_2\}
\ge
\min\{y_1,y_2\}.
$$

従って単調です。

しかし

$$
x=(2,1),
\qquad
y=(1,1)
$$

では

$$
x\ge y,\qquad x\ne y
$$

なのに

$$
v(x)=v(y)=1.
$$

従って狭義単調ではありません。

よって

$$
\boxed{
u:\text{狭義単調},
\qquad
v:\text{単調だが狭義単調ではない}.
}
$$
<!-- solution-end -->

<a id="ex-micro1-a03"></a>

### MICRO1-A03 上位集合を直接求める

- Level: A
- 目安時間: 15分

$$
u(x)=\min\{x_1,x_2\}
$$

で表される選好について、基準点 $y=(3,2)$ の上位集合 $U(y)$ を求め、凸集合であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
u(y)=\min\{3,2\}=2.
$$

従って

$$
U(y)
=
\{x:u(x)\ge2\}.
$$

すなわち

$$
\min\{x_1,x_2\}\ge2
$$

なので

$$
x_1\ge2,\qquad x_2\ge2.
$$

よって

$$
\boxed{
U(y)=[2,\infty)\times[2,\infty).
}
$$

$x,z\in U(y)$ と $\lambda\in[0,1]$ を取ると、

$$
x_1,z_1\ge2,
\qquad
x_2,z_2\ge2.
$$

したがって

$$
\lambda x_1+(1-\lambda)z_1\ge2,
$$

$$
\lambda x_2+(1-\lambda)z_2\ge2.
$$

よって

$$
\lambda x+(1-\lambda)z\in U(y).
$$

従って $U(y)$ は凸集合です。
<!-- solution-end -->

<a id="ex-micro1-a04"></a>

### MICRO1-A04 「凸効用」と「凸選好」を分離する

- Level: A
- 目安時間: 15分

次の二つの効用関数はいずれも凸関数である。

$$
u(x)=x_1^2+x_2^2,
$$

$$
v(x)=e^{x_1+x_2}.
$$

1. $u$ が表す選好が凸選好でないことを、$(1,0),(0,1)$ を使って示せ。
2. $v$ が表す選好が凸選好であることを示せ。

<!-- solution-start -->
#### 詳細解答

1.

$$
u(1,0)=1,
\qquad
u(0,1)=1.
$$

しかし中点では

$$
u\left(\frac12,\frac12\right)
=
\frac14+\frac14
=
\frac12.
$$

従って基準点 $y=(1,0)$ に対して

$$
(1,0)\in U(y),
\qquad
(0,1)\in U(y)
$$

ですが、

$$
\left(\frac12,\frac12\right)\notin U(y).
$$

したがって上位集合は凸ではなく、選好は凸選好ではありません。

2. 指数関数は狭義単調増加なので

$$
v(x)\ge v(y)
\iff
x_1+x_2\ge y_1+y_2.
$$

したがって $v$ は線形効用

$$
w(x)=x_1+x_2
$$

と同じ選好を表します。

基準点 $y$ の上位集合は

$$
U(y)
=
\{x:x_1+x_2\ge y_1+y_2\},
$$

これは半空間なので凸です。

従って $v$ が表す選好は凸選好です。

同じ「凸関数」という分類でも、表される選好の凸性は一致しません。
<!-- solution-end -->

---

## Level B

<a id="ex-micro1-b01"></a>

### MICRO1-B01 凸選好の混合による特徴付けを再証明する

- Level: B
- 目安時間: 20分

任意の $y\in X$ について上位集合 $U(y)$ が凸であることと、

$$
x\succeq y,\quad z\succeq y
\Longrightarrow
\lambda x+(1-\lambda)z\succeq y
$$

がすべての $\lambda\in[0,1]$ で成り立つことが同値であると証明せよ。

<!-- solution-start -->
#### 詳細解答

まず上位集合がすべて凸であるとします。

$x\succeq y$ と $z\succeq y$ なら

$$
x,z\in U(y).
$$

$U(y)$ の凸性より

$$
\lambda x+(1-\lambda)z\in U(y).
$$

上位集合の定義から

$$
\lambda x+(1-\lambda)z\succeq y.
$$

逆に混合による特徴付けを仮定します。

任意の $y$ と $x,z\in U(y)$ を取ると

$$
x\succeq y,
\qquad
z\succeq y.
$$

仮定より

$$
\lambda x+(1-\lambda)z\succeq y.
$$

従って

$$
\lambda x+(1-\lambda)z\in U(y).
$$

よって $U(y)$ は凸集合です。

以上から二条件は同値です。
<!-- solution-end -->

<a id="ex-micro1-b02"></a>

### MICRO1-B02 凸選好と準凹性の同値を効用値から示す

- Level: B
- 目安時間: 25分

効用 $u$ が選好 $\succeq$ を表しているとする。

1. $\succeq$ が凸選好なら
   $$
   u(\lambda x+(1-\lambda)z)
   \ge
   \min\{u(x),u(z)\}
   $$
   を示せ。
2. 上の不等式が常に成り立つなら $\succeq$ が凸選好であることを示せ。

<!-- solution-start -->
#### 詳細解答

1. 一般性を失わず

$$
u(x)\ge u(z)
$$

とします。

効用表現より

$$
x\succeq z.
$$

また

$$
z\succeq z.
$$

凸選好の定義から

$$
\lambda x+(1-\lambda)z\succeq z.
$$

再び効用表現を使うと

$$
u(\lambda x+(1-\lambda)z)
\ge
u(z).
$$

ここで

$$
u(z)=\min\{u(x),u(z)\}
$$

なので準凹性が得られます。

2. $x\succeq y$ と $z\succeq y$ を取ります。

効用表現より

$$
u(x)\ge u(y),
\qquad
u(z)\ge u(y).
$$

準凹性から

$$
u(\lambda x+(1-\lambda)z)
\ge
\min\{u(x),u(z)\}
\ge
u(y).
$$

従って

$$
\lambda x+(1-\lambda)z\succeq y.
$$

よって選好は凸です。
<!-- solution-end -->

<a id="ex-micro1-b03"></a>

### MICRO1-B03 辞書式選好に実数値効用が存在しない理由

- Level: B
- 目安時間: 30分

$[0,1]^2$ 上の辞書式選好について、実数値効用表現が存在しないことを次の手順で示せ。

1. 各 $a\in[0,1]$ について
   $$
   u(a,1)>u(a,0)
   $$
   となることを示せ。
2. $a<b$ なら
   $$
   u(a,1)<u(b,0)
   $$
   となることを示せ。
3. 開区間
   $$
   I_a=(u(a,0),u(a,1))
   $$
   が互いに素であることから矛盾を導け。

<!-- solution-start -->
#### 詳細解答

実数値効用表現 $u$ が存在すると仮定します。

1. 同じ第一座標 $a$ なら第二座標を比較するので

$$
(a,1)\succ_{\mathrm{lex}}(a,0).
$$

効用表現から

$$
u(a,1)>u(a,0).
$$

従って $I_a$ は非空開区間です。

2. $a<b$ なら第一座標だけで

$$
(b,0)\succ_{\mathrm{lex}}(a,1).
$$

したがって

$$
u(b,0)>u(a,1).
$$

3. $a<b$ なら

$$
u(a,0)<u(a,1)<u(b,0)<u(b,1).
$$

よって

$$
I_a\cap I_b=\varnothing.
$$

各 $I_a$ は非空開区間なので有理数を少なくとも一つ含みます。

各 $a$ に対し $q_a\in I_a\cap\mathbb Q$ を一つ選ぶと、区間が互いに素なので

$$
a\ne b
\Longrightarrow
q_a\ne q_b.
$$

したがって $[0,1]$ から $\mathbb Q$ への単射が得られます。

しかし $[0,1]$ は非可算、$\mathbb Q$ は可算なので不可能です。

従って辞書式選好には実数値効用表現が存在しません。
<!-- solution-end -->

---

## Level C

<a id="ex-micro1-c01"></a>

### MICRO1-C01 Cobb--Douglas 型選好を上位集合から読む

- Level: C
- 目安時間: 35分

$$
X=\mathbb R_{++}^2
$$

上で

$$
u(x)=x_1x_2
$$

が表す選好を考える。

1. 選好が完備・推移的・狭義単調であることを示せ。
2. 基準点 $y=(a,b)$ の上位集合を
   $$
   U(y)
   =
   \left\{
   x\in\mathbb R_{++}^2:
   x_2\ge\frac{ab}{x_1}
   \right\}
   $$
   と表せ。
3. $t\mapsto ab/t$ の凸性を用いて $U(y)$ が凸であることを示せ。
4. 従って $u$ が準凹であることを説明せよ。
5.
   $$
   v(x)=(x_1x_2)^3
   $$
   も同じ選好を表すことを示し、$v$ の Hessian を $(1,1)$ で計算して、効用関数の凹性が選好の凸性に必要でないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

1. $u(x)$ は実数値関数なので、

$$
x\succeq y
\iff
u(x)\ge u(y)
$$

と定めた選好は実数の大小関係から完備かつ推移的です。

また $x\ge y$ かつ $x\ne y$ とします。

$X=\mathbb R_{++}^2$ なので全成分が正であり、少なくとも一方の成分が厳密に増えています。

従って

$$
x_1x_2>y_1y_2.
$$

よって

$$
x\succ y.
$$

したがって選好は狭義単調です。

2. $y=(a,b)$ なら

$$
u(y)=ab.
$$

したがって

$$
x\in U(y)
\iff
x_1x_2\ge ab.
$$

$x_1>0$ なので両辺を $x_1$ で割って

$$
x_2\ge\frac{ab}{x_1}.
$$

従って

$$
\boxed{
U(y)
=
\left\{
x\in\mathbb R_{++}^2:
x_2\ge\frac{ab}{x_1}
\right\}.
}
$$

3. 関数

$$
f(t)=\frac{ab}{t}
$$

について

$$
f''(t)=\frac{2ab}{t^3}>0
\qquad(t>0).
$$

従って $f$ は凸関数です。

$U(y)$ の二点

$$
r=(r_1,r_2),
\qquad
s=(s_1,s_2)
$$

を取り、$\lambda\in[0,1]$ とします。

$r,s\in U(y)$ なので

$$
r_2\ge f(r_1),
\qquad
s_2\ge f(s_1).
$$

したがって

$$
\lambda r_2+(1-\lambda)s_2
\ge
\lambda f(r_1)+(1-\lambda)f(s_1).
$$

$f$ の凸性から

$$
\lambda f(r_1)+(1-\lambda)f(s_1)
\ge
f\bigl(\lambda r_1+(1-\lambda)s_1\bigr).
$$

よって

$$
\lambda r_2+(1-\lambda)s_2
\ge
f\bigl(\lambda r_1+(1-\lambda)s_1\bigr),
$$

すなわち

$$
\lambda r+(1-\lambda)s\in U(y).
$$

従って $U(y)$ は凸集合です。

よってすべての $y$ について上位集合が凸であり、選好は凸選好です。

4. [凸選好と準凹な効用表現](#thm-micro1-convex-quasiconcave)より、選好を表す $u$ は準凹です。

5. 関数

$$
\phi(t)=t^3
\qquad(t>0)
$$

は狭義単調増加です。

したがって

$$
v=\phi\circ u
$$

は $u$ と同じ選好を表します。

一方

$$
v(x)=x_1^3x_2^3.
$$

Hessian は

$$
\nabla^2v(x)
=
\begin{pmatrix}
6x_1x_2^3 & 9x_1^2x_2^2\\
9x_1^2x_2^2 & 6x_1^3x_2
\end{pmatrix}.
$$

$(1,1)$ では

$$
\nabla^2v(1,1)
=
\begin{pmatrix}
6&9\\
9&6
\end{pmatrix}.
$$

固有値は

$$
15,\qquad -3
$$

なので Hessian は不定です。

従って $v$ は $(1,1)$ の近傍で凹関数ではありません。

それでも $v$ は $u$ と同じ凸選好を表します。

したがって重要なのは効用関数の凹性そのものではなく、狭義単調変換で保存される準凹性、すなわち上位集合の凸性です。
<!-- solution-end -->

---

## まとめ

本章では、効用最大化より一段手前の構造を整理しました。

- 選好は二つの選択肢を比較する規則であり、完備性と推移性が比較の一貫性を与える。
- 単調性は財の成分増加と選好順序を結ぶ。
- 上位集合
  $$
  U(y)=\{x:x\succeq y\}
  $$
  は選好を幾何学的に読む道具である。
- 凸選好とは、すべての上位集合が凸であることをいう。
- 効用関数は順序の数値表現であり、狭義単調増加変換をしても同じ選好を表す。
- 完備性・推移性だけでは、無限集合上で実数値効用表現が存在するとは限らない。
- 効用表現があるとき
  $$
  \boxed{
  \text{凸選好}
  \Longleftrightarrow
  \text{準凹な効用表現}
  }
  $$
  が成り立つ。
- 「凸選好」と「凸関数」は別概念である。

次章では、この選好を価格と所得が作る予算集合の上で最大化し、需要を導きます。
