# MICRO3 消費者双対性

<!-- definition-example-audit: strict -->

MICRO2 では、価格と所得が与えられたときに

> **その予算で買えるものの中から、いちばん好ましい消費を選ぶ**

という問題を考えました。

例えば、昼食に使える金額が1000円なら、その1000円の範囲で「どの組合せを選べば一番満足できるか」を考える問題です。

本章では、同じ選好を反対側から見ます。

> **この満足度だけは確保したい。そのために最低いくら必要か。**

旅行の予算を決めるときや、物価上昇後に「以前と同じ生活水準を保つにはいくら必要か」を考えるときは、こちらの問いの方が自然です。

この二つは別々の理論ではありません。同じ消費者を、

- 使えるお金を固定して見る
- 達成したい満足度を固定して見る

という二つの方向から見ています。

本章の中心は

$$
\boxed{
\text{効用最大化}
\longleftrightarrow
\text{支出最小化}
}
$$

という往復です。

この往復を作ると、

- 価格と所得のもとで達成できる最大の満足度
- 目標の満足度を確保するための最低金額
- 同じ満足度を最安で維持する消費
- 最適値の価格・所得に対する変化から需要を読み戻す関係
- 価格変化の効果を、相対価格の変化と購買力の変化へ分ける式

が、ばらばらの公式ではなく一つの構造として見えるようになります。

---

## 1. 「この所得でどこまで満足できるか」を一つの数にまとめる

MICRO2 の [Marshall 需要](../MICRO2/index.md#def-micro2-marshall-demand) は、価格 $p$ と所得 $m$ を与えると、最適な消費束を返しました。

しかし、最適な消費束そのものではなく

> その価格と所得のもとで、最大でどの程度の効用を達成できるか

だけを知りたいこともあります。

そこで、消費者問題の最大値を一つの関数として記録します。

<a id="def-micro3-indirect-utility"></a>

<!-- formal-statement-start -->
> **定義（間接効用関数）**  
> 効用関数 $u:\mathbb R_+^L\to\mathbb R$、価格 $p\in\mathbb R_{++}^L$、所得 $m\ge0$ に対して
>
$$
v(p,m)
=
\max_{x\in B(p,m)}u(x)
$$
>
> を **間接効用関数（indirect utility function）** という。ここで
>
$$
B(p,m)=\{x\in\mathbb R_+^L:p\cdot x\le m\}
$$
>
> は予算集合である。
<!-- formal-statement-end -->

「間接」という名前は、効用 $u(x)$ が消費束 $x$ を直接入力するのに対し、$v(p,m)$ は価格と所得を入力し、その下で最適化した後の効用を返すことによります。

<!-- definition-example-start: def-micro3-indirect-utility -->
**定義の確認**：一財なら何を表しているかがすぐ見える

一財で

$$
u(x)=\sqrt{x},
\qquad
p>0,
\qquad
m\ge0
$$

とします。

予算制約は

$$
px\le m
$$

なので

$$
0\le x\le\frac{m}{p}.
$$

効用は増加関数だから最適消費は

$$
x^*(p,m)=\frac{m}{p}.
$$

従って間接効用は

$$
v(p,m)
=
u\!\left(\frac{m}{p}\right)
=
\sqrt{\frac{m}{p}}.
$$

ここでは

- 所得 $m$ が増えると達成可能な効用が上がる
- 価格 $p$ が上がると同じ所得で買える量が減り、効用が下がる

ことが式にそのまま現れています。
<!-- definition-example-end -->

MICRO2 で示した価格と所得の同率拡大に対する0次同次性から、間接効用にも

$$
v(tp,tm)=v(p,m)
\qquad(t>0)
$$

が成り立ちます。

通貨単位を円から「100円単位」へ変えても、実際に買える集合は変わらないからです。

---

## 2. 今度は「この満足度を最安で達成する」と考える

効用最大化では、先に所得 $m$ を固定しました。

支出最小化では順序を逆にします。

まず達成したい効用水準を

$$
\bar u
$$

と決めます。

この $\bar u$ は「効用の上限」ではなく、**少なくともここまでは満足したいという目標値**です。

その目標を達成する消費束全体を

$$
C(\bar u)
=
\{x\in\mathbb R_+^L:u(x)\ge\bar u\}
$$

と書きます。

価格が $p$ のとき、消費束 $x$ の購入費用は MICRO2 と同じく

$$
p\cdot x
$$

です。

したがって今度の問題は

$$
\min_{x\in\mathbb R_+^L}p\cdot x
\quad\text{制約}\quad
u(x)\ge\bar u
$$

です。

<a id="def-micro3-expenditure-function"></a>

<!-- formal-statement-start -->
> **定義（支出関数）**  
> 効用関数 $u:\mathbb R_+^L\to\mathbb R$、価格 $p\in\mathbb R_{++}^L$、達成可能な目標効用 $\bar u$ に対して
>
$$
e(p,\bar u)
=
\inf\left\{
p\cdot x:
x\in\mathbb R_+^L,\ 
u(x)\ge\bar u
\right\}
$$
>
> を **支出関数（expenditure function）** という。
<!-- formal-statement-end -->

ここで「達成可能」とは

$$
C(\bar u)\ne\varnothing
$$

という意味です。

支出関数は

> 価格 $p$ のもとで、効用 $\bar u$ を確保するために必要な最小支出

を表します。

<!-- definition-example-start: def-micro3-expenditure-function -->
**定義の確認**：一財の支出関数

先ほどと同じ

$$
u(x)=\sqrt{x}
$$

を考えます。

目標効用を $\bar u\ge0$ とすると

$$
\sqrt{x}\ge\bar u
$$

は

$$
x\ge\bar u^2
$$

と同値です。

価格が $p>0$ なら支出 $px$ は $x$ とともに増えるので、最安の選択は

$$
x=\bar u^2.
$$

従って

$$
e(p,\bar u)=p\bar u^2.
$$

間接効用

$$
v(p,m)=\sqrt{\frac{m}{p}}
$$

を $\bar u$ について逆向きに解くと

$$
m=p\bar u^2
$$

となり、ちょうど支出関数が出てきます。

この「最大効用と最小支出が互いを復元する」関係が本章の中心です。
<!-- definition-example-end -->

---

## 3. 最安で目標効用を達成する消費束を Hicks 需要という

支出関数は最小支出額だけを返します。

では、その最小支出を実現する消費束そのものは何でしょうか。

<a id="def-micro3-hicks-demand"></a>

<!-- formal-statement-start -->
> **定義（Hicks 需要）**  
> 価格 $p\in\mathbb R_{++}^L$ と達成可能な目標効用 $\bar u$ に対して
>
$$
H(p,\bar u)
=
\operatorname*{arg\,min}_{x\in\mathbb R_+^L}
\left\{
p\cdot x:
u(x)\ge\bar u
\right\}
$$
>
> を **Hicks 需要（Hicksian demand、補償需要）** という。
>
> 最小化点が一意なら、その唯一の元を
>
$$
h(p,\bar u)
$$
>
> と書く。
<!-- formal-statement-end -->

「補償需要」と呼ばれる理由は、価格が変わったときに所得も調整して、同じ効用水準を保つ需要を考えるからです。

<!-- definition-example-start: def-micro3-hicks-demand -->
**定義の確認**：一財では Hicks 需要は目標量そのもの

$$
u(x)=\sqrt{x}
$$

なら、目標効用 $\bar u$ を達成するには

$$
x\ge\bar u^2
$$

が必要でした。

最小支出を作るのは

$$
x=\bar u^2
$$

なので

$$
h(p,\bar u)=\bar u^2.
$$

一財では価格 $p$ が変わっても、同じ効用を保つために必要な物理量は変わりません。

変わるのは、その量を買うために必要な支出

$$
e(p,\bar u)=p\bar u^2
$$

です。
<!-- definition-example-end -->

Marshall 需要と Hicks 需要は入力が違います。

$$
\boxed{
x(p,m):
\text{価格と所得}
\longmapsto
\text{効用最大化}
}
$$

に対し

$$
\boxed{
h(p,\bar u):
\text{価格と目標効用}
\longmapsto
\text{支出最小化}
}
$$

です。

---

## 4. 支出最小化問題にも最適解が存在する

支出最小化では feasible set

$$
C(\bar u)=\{x:u(x)\ge\bar u\}
$$

は一般に上方向へ無限に広がります。

したがって「feasible set がコンパクトだから最小値を取る」とは言えません。

それでも、価格がすべて正なら、ある実行可能な消費束より高い支出をする候補を最初から捨てることで、探索範囲をコンパクトに切り詰められます。

<a id="thm-micro3-expenditure-existence"></a>

<!-- formal-statement-start -->
> **定理（支出最小化点の存在）**  
> $u:\mathbb R_+^L\to\mathbb R$ が連続、$p\in\mathbb R_{++}^L$ とする。
>
> 目標効用 $\bar u$ が達成可能、すなわち
>
$$
C(\bar u)
=
\{x\in\mathbb R_+^L:u(x)\ge\bar u\}
\ne\varnothing
$$
>
> なら、支出最小化問題は最小値を取り、
>
$$
H(p,\bar u)\ne\varnothing
$$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

実行可能な点 $x^0$ を一つ取ります。

最適解候補として調べる必要があるのは

$$
p\cdot x\le p\cdot x^0
$$

を満たす点だけです。

価格が正なので、この不等式から各成分に上界が付きます。

つまり、もともと非有界だった目標効用集合を、最小化に必要な範囲だけコンパクトな箱へ切り取れます。

<!-- proof-start -->
### 証明

$C(\bar u)\ne\varnothing$ なので

$$
x^0\in C(\bar u)
$$

を一つ取ります。

この点の支出を

$$
M=p\cdot x^0
$$

と置きます。

集合

$$
K
=
C(\bar u)
\cap
\{x\in\mathbb R_+^L:p\cdot x\le M\}
$$

を考えます。

まず $x^0\in K$ なので $K$ は非空です。

$u$ は連続だから

$$
C(\bar u)
=
u^{-1}([\bar u,\infty))
$$

は閉集合です。

また

$$
\{x:p\cdot x\le M\}
$$

も閉集合なので、$K$ は閉です。

さらに $x\in K$ なら各 $i$ について

$$
0\le p_i x_i\le p\cdot x\le M.
$$

$p_i>0$ より

$$
0\le x_i\le\frac{M}{p_i}.
$$

従って $K$ は有界です。

有限次元 Euclid 空間では閉かつ有界な集合はコンパクトなので、$K$ はコンパクトです。

目的関数

$$
x\longmapsto p\cdot x
$$

は連続だから、$K$ 上で最小値を取ります。

その最小化点を $x^*$ とします。

$K$ の外にある実行可能点 $y\in C(\bar u)\setminus K$ は

$$
p\cdot y>M=p\cdot x^0
$$

を満たします。

一方 $x^0\in K$ なので

$$
p\cdot x^*
\le
p\cdot x^0
=
M.
$$

従って $K$ の外の実行可能点が $x^*$ より安くなることはありません。

よって $x^*$ は $C(\bar u)$ 全体での支出最小化点です。

したがって

$$
H(p,\bar u)\ne\varnothing.
$$
<!-- proof-end -->

この証明で価格の正値性が使われた場所は

$$
x_i\le\frac{M}{p_i}
$$

です。

無料の財があると、この切り取りだけではその財の量に上界を付けられません。

---

## 5. 非自明な目標では、最小支出点は目標効用をちょうど達成する

支出を最小にしたいのに、必要以上の効用を買っているなら、どこかを少し削れるはずです。

その直観を連続性と単調性で定式化します。

<a id="prop-micro3-target-binding"></a>

<!-- formal-statement-start -->
> **命題（支出最小化では目標効用が等号になる）**  
> $u:\mathbb R_+^L\to\mathbb R$ が連続かつ狭義単調、$p\in\mathbb R_{++}^L$ とする。
>
> $\bar u>u(0)$ が達成可能で、$x^*\in H(p,\bar u)$ なら
>
$$
u(x^*)=\bar u
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^*$ は目標効用を達成するので

$$
u(x^*)\ge\bar u.
$$

反対に

$$
u(x^*)>\bar u
$$

と仮定します。

$\bar u>u(0)$ なので $x^*\ne0$ です。

したがって、ある成分 $i$ について

$$
x_i^*>0
$$

です。

$0<t<1$ に対して

$$
x(t)
=
x^*-t x_i^* e_i
$$

と置きます。

$t\downarrow0$ なら

$$
x(t)\to x^*.
$$

$u$ は連続で

$$
u(x^*)>\bar u
$$

だから、十分小さい $t>0$ では

$$
u(x(t))>\bar u.
$$

従って $x(t)$ も目標効用を達成します。

しかし支出は

$$
p\cdot x(t)
=
p\cdot x^*
-
t p_i x_i^*
<
p\cdot x^*
$$

です。

これは $x^*$ の支出最小性に反します。

従って

$$
u(x^*)=\bar u.
$$
<!-- proof-end -->

---

## 6. 効用最大化と支出最小化は互いを復元する

ここまでで二つの問題がそろいました。

効用最大化：

$$
v(p,m)
=
\max_{p\cdot x\le m}u(x)
$$

支出最小化：

$$
e(p,\bar u)
=
\min_{u(x)\ge\bar u}p\cdot x.
$$

狭義単調な選好では、この二つは互いに逆向きの情報を持ちます。

<a id="thm-micro3-consumer-duality"></a>

<!-- formal-statement-start -->
> **定理（消費者問題の双対性）**  
> $u:\mathbb R_+^L\to\mathbb R$ が連続かつ狭義単調、$p\in\mathbb R_{++}^L$、$m>0$ とする。
>
> このとき
>
$$
e\!\left(p,v(p,m)\right)=m
$$
>
> が成り立ち、需要集合について
>
$$
H\!\left(p,v(p,m)\right)=D(p,m)
$$
>
> が成り立つ。
>
> さらに、$\bar u>u(0)$ が達成可能なら
>
$$
v\!\left(p,e(p,\bar u)\right)=\bar u.
$$
<!-- formal-statement-end -->

### 何を言っているか

第1式

$$
e(p,v(p,m))=m
$$

は、

> 所得 $m$ で最大限達成できる効用を、今度は最安で買い直しても、必要額はちょうど $m$

という意味です。

第3式

$$
v(p,e(p,\bar u))=\bar u
$$

は、

> 効用 $\bar u$ を達成するための最小支出だけ所得を渡せば、最大効用はちょうど $\bar u$

という意味です。

### 証明の見取り図

鍵は二つです。

1. 狭義単調性により、Marshall 需要は予算を使い切る。
2. 支出最小点は目標効用をちょうど達成する。

どちらかで余りが生じると、もう一方の最適性に反する改善が作れます。

<!-- proof-start -->
### 証明

まず

$$
\bar u_0=v(p,m)
$$

と置きます。

MICRO2 で示した [狭義単調な選好での予算使い切り](../MICRO2/index.md#prop-micro2-budget-exhaustion)より、任意の

$$
x^*\in D(p,m)
$$

について

$$
p\cdot x^*=m.
$$

しかも

$$
u(x^*)=\bar u_0.
$$

従って $x^*$ は支出最小化問題の実行可能点なので

$$
e(p,\bar u_0)\le m.
$$

反対に

$$
e(p,\bar u_0)<m
$$

と仮定します。

[支出最小化点の存在](#thm-micro3-expenditure-existence)より、ある

$$
h^*\in H(p,\bar u_0)
$$

が存在します。

すると

$$
p\cdot h^*
=
e(p,\bar u_0)
<
m.
$$

また目標効用を満たすので

$$
u(h^*)\ge\bar u_0.
$$

余った所得

$$
m-p\cdot h^*>0
$$

を使って、第1財を十分小さい量 $\varepsilon>0$ だけ増やせます。

すなわち

$$
p\cdot(h^*+\varepsilon e_1)\le m
$$

となるように $\varepsilon$ を取れます。

狭義単調性から

$$
u(h^*+\varepsilon e_1)>u(h^*)\ge\bar u_0.
$$

これは

$$
\bar u_0=v(p,m)
$$

が予算 $m$ で達成できる最大効用であることに反します。

従って

$$
e(p,v(p,m))=m.
$$

次に需要集合の一致を示します。

$x^*\in D(p,m)$ とします。

先ほど見たように

$$
u(x^*)=v(p,m),
\qquad
p\cdot x^*=m=e(p,v(p,m)).
$$

従って $x^*$ は支出最小点でもあり

$$
x^*\in H(p,v(p,m)).
$$

逆に

$$
h^*\in H(p,v(p,m))
$$

とします。

支出は

$$
p\cdot h^*
=
e(p,v(p,m))
=
m.
$$

また

$$
u(h^*)\ge v(p,m).
$$

一方 $h^*$ は予算集合 $B(p,m)$ に入るので、間接効用の定義から

$$
u(h^*)\le v(p,m).
$$

従って

$$
u(h^*)=v(p,m)
$$

であり

$$
h^*\in D(p,m).
$$

よって

$$
H(p,v(p,m))=D(p,m).
$$

最後に、達成可能な

$$
\bar u>u(0)
$$

を取ります。

$$
m_0=e(p,\bar u)
$$

と置き、支出最小点

$$
h^*\in H(p,\bar u)
$$

を取ります。

[支出最小化では目標効用が等号になる命題](#prop-micro3-target-binding)より

$$
u(h^*)=\bar u.
$$

また

$$
p\cdot h^*=m_0
$$

なので

$$
v(p,m_0)\ge\bar u.
$$

もし

$$
v(p,m_0)>\bar u
$$

なら、Marshall 最適点 $x^*\in D(p,m_0)$ を取り

$$
u(x^*)>\bar u.
$$

狭義単調性による予算使い切りから

$$
p\cdot x^*=m_0.
$$

$u$ の連続性より、$t<1$ を1に十分近く取れば

$$
u(tx^*)>\bar u.
$$

一方

$$
p\cdot(tx^*)
=
t m_0
<
m_0
=
e(p,\bar u).
$$

これは $e(p,\bar u)$ の最小性に反します。

従って

$$
v(p,e(p,\bar u))=\bar u.
$$
<!-- proof-end -->

---

## 7. Cobb--Douglas 型効用で二つの問題を往復する

抽象式だけでは双対性の感覚をつかみにくいので、MICRO2 で扱った Cobb--Douglas 型効用を最後まで計算します。

$$
u(x)
=
x_1^\alpha x_2^{1-\alpha},
\qquad
0<\alpha<1.
$$

MICRO2 で Marshall 需要は

$$
x_1(p,m)
=
\frac{\alpha m}{p_1},
$$

$$
x_2(p,m)
=
\frac{(1-\alpha)m}{p_2}
$$

でした。

したがって間接効用は

$$
v(p,m)
=
\left(\frac{\alpha m}{p_1}\right)^\alpha
\left(\frac{(1-\alpha)m}{p_2}\right)^{1-\alpha}.
$$

$m$ の指数は

$$
\alpha+(1-\alpha)=1
$$

なので

$$
\boxed{
v(p,m)
=
\alpha^\alpha(1-\alpha)^{1-\alpha}
\frac{m}{p_1^\alpha p_2^{1-\alpha}}
}
$$

となります。

ここで

$$
A_\alpha
=
\alpha^\alpha(1-\alpha)^{1-\alpha}
$$

と置けば

$$
v(p,m)
=
A_\alpha
\frac{m}{p_1^\alpha p_2^{1-\alpha}}.
$$

これを $m$ について解くと

$$
m
=
\frac{\bar u}{A_\alpha}
p_1^\alpha p_2^{1-\alpha}.
$$

従って支出関数は

$$
\boxed{
e(p,\bar u)
=
\frac{\bar u}{A_\alpha}
p_1^\alpha p_2^{1-\alpha}
}
$$

です。

Hicks 需要は、支出額 $e(p,\bar u)$ を Cobb--Douglas 型の支出比率で分ければ

$$
\boxed{
h_1(p,\bar u)
=
\frac{\alpha e(p,\bar u)}{p_1}
}
$$

$$
\boxed{
h_2(p,\bar u)
=
\frac{(1-\alpha)e(p,\bar u)}{p_2}
}
$$

となります。

実際に

$$
\bar u=v(p,m)
$$

を代入すると

$$
e(p,v(p,m))=m
$$

なので

$$
h_1(p,v(p,m))
=
\frac{\alpha m}{p_1}
=
x_1(p,m),
$$

$$
h_2(p,v(p,m))
=
\frac{(1-\alpha)m}{p_2}
=
x_2(p,m).
$$

抽象的な双対性が、式の上でもそのまま確認できました。

---

## 8. 支出関数は価格について1次同次で、しかも凹である

価格をすべて2倍にすれば、同じ消費束を買う費用も2倍になります。

したがって目標効用を保つための最小費用も2倍になるはずです。

また、支出関数は価格について凸ではなく **凹** になります。

最小化する消費束を価格に応じて切り替えられるため、「各消費束の線形な支出」の下側を取った形になるからです。

<a id="prop-micro3-expenditure-properties"></a>

<!-- formal-statement-start -->
> **命題（支出関数の価格に関する性質）**  
> 達成可能な目標効用 $\bar u$ を固定する。
>
> 支出関数 $e(p,\bar u)$ は $p\in\mathbb R_{++}^L$ について次を満たす。
>
> 1. **1次同次性**
> $$
> e(tp,\bar u)=t\,e(p,\bar u)
> \qquad(t>0).
> $$
> 2. **単調性**  
> $q\ge p$ なら
> $$
> e(q,\bar u)\ge e(p,\bar u).
> $$
> 3. **凹性**  
> $0\le\theta\le1$ に対して
> $$
> e(\theta p+(1-\theta)q,\bar u)
> \ge
> \theta e(p,\bar u)
> +(1-\theta)e(q,\bar u).
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

目標効用集合を

$$
C(\bar u)
=
\{x\ge0:u(x)\ge\bar u\}
$$

と書きます。

1. $t>0$ に対して

$$
e(tp,\bar u)
=
\inf_{x\in C(\bar u)}(tp)\cdot x.
$$

$t$ は正の定数なので

$$
e(tp,\bar u)
=
t
\inf_{x\in C(\bar u)}p\cdot x
=
t e(p,\bar u).
$$

2. $q\ge p$ なら、任意の $x\ge0$ について

$$
q\cdot x\ge p\cdot x.
$$

従って

$$
\inf_{x\in C(\bar u)}q\cdot x
\ge
\inf_{x\in C(\bar u)}p\cdot x.
$$

よって

$$
e(q,\bar u)\ge e(p,\bar u).
$$

3. 任意の $x\in C(\bar u)$ に対して

$$
(\theta p+(1-\theta)q)\cdot x
=
\theta p\cdot x
+
(1-\theta)q\cdot x.
$$

また

$$
p\cdot x\ge e(p,\bar u),
$$

$$
q\cdot x\ge e(q,\bar u).
$$

従って

$$
(\theta p+(1-\theta)q)\cdot x
\ge
\theta e(p,\bar u)
+
(1-\theta)e(q,\bar u).
$$

これはすべての $x\in C(\bar u)$ で成り立つので、左辺の下限を取れば

$$
e(\theta p+(1-\theta)q,\bar u)
\ge
\theta e(p,\bar u)
+
(1-\theta)e(q,\bar u).
$$

よって $e$ は価格について凹です。
<!-- proof-end -->

ここで「最小化だから凸」と反射的に覚えないことが重要です。

価格 $p$ は最適化変数ではなく **パラメータ** です。

$p$ を固定したときは $x$ について線形最小化ですが、$p$ の関数として見ると、線形関数族の下限なので凹になります。

---

## 9. 支出関数を価格で微分すると Hicks 需要が出る

ここからが双対性の強みです。

支出関数は「必要な最小金額」という一つの数しか返さないように見えます。

しかし価格に対する傾きを調べると、最適な消費量そのものが戻ってきます。

<a id="thm-micro3-shephard"></a>

<!-- formal-statement-start -->
> **定理（Shephard 型関係）**  
> 目標効用 $\bar u$ を固定し、$p\in\mathbb R_{++}^L$ で $H(p,\bar u)\ne\varnothing$ とする。
>
> 支出関数 $e(\,\cdot\,,\bar u)$ が $p$ で微分可能なら、Hicks 需要は一意で、
>
$$
\boxed{
h_i(p,\bar u)
=
\frac{\partial e}{\partial p_i}(p,\bar u)
}
\qquad(i=1,\dots,L)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### なぜ価格微分が数量になるのか

$p_i$ をほんの少しだけ上げたとき、いまの最適消費束をそのまま買うなら追加費用は

$$
h_i\,dp_i
$$

です。

最適消費束自体も少し動きますが、最適点ではその動きによる一次効果が最小化条件に吸収されます。

この「最適値をパラメータで微分すると、直接効果が残る」という構造が包絡定理の考え方です。

### 証明の核心

完全な包絡定理を別に持ち込まなくても、支出関数の凹性を使えば短く証明できます。

<!-- proof-start -->
### 証明

任意の

$$
h\in H(p,\bar u)
$$

を取ります。

$h$ は目標効用を達成するので、別の価格 $q\in\mathbb R_{++}^L$ に対する支出最小化問題でも実行可能です。

従って

$$
e(q,\bar u)
\le
q\cdot h.
$$

また $h$ は価格 $p$ で最適だから

$$
p\cdot h
=
e(p,\bar u).
$$

よって

$$
e(q,\bar u)
\le
e(p,\bar u)
+
(q-p)\cdot h.
$$

ここで任意の方向 $d\in\mathbb R^L$ を取ります。$p\in\mathbb R_{++}^L$ なので、$|t|$ を十分小さくすれば

$$
p+td\in\mathbb R_{++}^L
$$

です。

$q=p+td$ と置くと

$$
e(p+td,\bar u)-e(p,\bar u)
\le
t\,d\cdot h.
$$

まず $t>0$ で割って $t\downarrow0$ とすると、微分可能性から

$$
\nabla_p e(p,\bar u)\cdot d
\le
h\cdot d.
$$

次に $t<0$ で割ると不等号が反転するので、$t\uparrow0$ として

$$
\nabla_p e(p,\bar u)\cdot d
\ge
h\cdot d.
$$

従って任意の方向 $d$ について

$$
\nabla_p e(p,\bar u)\cdot d
=
h\cdot d.
$$

よって

$$
h=\nabla_p e(p,\bar u).
$$

これは任意の $h\in H(p,\bar u)$ について成り立つため Hicks 需要は一意で、成分ごとに

$$
h_i(p,\bar u)
=
\frac{\partial e}{\partial p_i}(p,\bar u)
$$

が成り立ちます。
<!-- proof-end -->

Cobb--Douglas 型で確かめます。

$$
e(p,\bar u)
=
\frac{\bar u}{A_\alpha}
p_1^\alpha p_2^{1-\alpha}
$$

なので

$$
\frac{\partial e}{\partial p_1}
=
\frac{\alpha}{p_1}e(p,\bar u)
=
h_1(p,\bar u),
$$

$$
\frac{\partial e}{\partial p_2}
=
\frac{1-\alpha}{p_2}e(p,\bar u)
=
h_2(p,\bar u).
$$

きれいに数量が戻ってきます。

---

## 10. 間接効用を微分すると Marshall 需要が戻る

支出関数から Hicks 需要が戻るのと同様に、間接効用からは Marshall 需要が戻ります。

ただし、こちらは価格と所得の両方を微分します。

<a id="thm-micro3-roy"></a>

<!-- formal-statement-start -->
> **定理（Roy 型関係）**  
> 効用関数 $u:\mathbb R_+^L\to\mathbb R$ が凹かつ狭義単調で、$\mathbb R_{++}^L$ の近傍で連続微分可能であるとする。
>
> 点 $(p,m)\in\mathbb R_{++}^L\times(0,\infty)$ の近傍で Marshall 需要 $x(p,m)$ が一意な内点解として微分可能に選べ、間接効用 $v$ も微分可能であるとする。
>
> このとき
>
$$
\frac{\partial v}{\partial m}(p,m)>0
$$
>
> であり、
>
$$
\boxed{
x_i(p,m)
=
-
\frac{
\partial v/\partial p_i
}{
\partial v/\partial m
}(p,m)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 何を言っているか

価格 $p_i$ が上がると間接効用は下がります。

一方、所得 $m$ が増えると間接効用は上がります。

Roy 型関係は、

> 価格上昇で失う効用を、所得増加で測り直すと、その財を何単位買っていたかが分かる

という式です。

### 証明の見取り図

MICRO2 の [消費者問題の KKT 条件](../MICRO2/index.md#thm-micro2-consumer-kkt)を使います。

内点解では非負制約の乗数が消え、

$$
\nabla u(x)=\lambda p
$$

です。

間接効用

$$
v(p,m)=u(x(p,m))
$$

を価格と所得で微分し、予算等式

$$
p\cdot x(p,m)=m
$$

の微分を組み合わせます。

<!-- proof-start -->
### 証明

狭義単調性と内点性から、最適点では予算を使い切るので

$$
p\cdot x(p,m)=m.
$$

また [KKT 条件](../OPT5/index.md#thm-opt5-kkt)より、ある $\lambda>0$ が存在して

$$
\nabla u(x(p,m))
=
\lambda p.
$$

まず所得 $m$ で微分します。

間接効用は

$$
v(p,m)=u(x(p,m))
$$

だから連鎖律より

$$
\frac{\partial v}{\partial m}
=
\nabla u(x)\cdot
\frac{\partial x}{\partial m}.
$$

KKT 条件を代入すると

$$
\frac{\partial v}{\partial m}
=
\lambda
p\cdot
\frac{\partial x}{\partial m}.
$$

予算等式

$$
p\cdot x(p,m)=m
$$

を $m$ で微分すると

$$
p\cdot
\frac{\partial x}{\partial m}
=
1.
$$

従って

$$
\frac{\partial v}{\partial m}
=
\lambda>0.
$$

次に価格成分 $p_i$ で微分します。

連鎖律より

$$
\frac{\partial v}{\partial p_i}
=
\nabla u(x)\cdot
\frac{\partial x}{\partial p_i}
=
\lambda
p\cdot
\frac{\partial x}{\partial p_i}.
$$

一方、予算等式を $p_i$ で微分すると

$$
x_i
+
p\cdot
\frac{\partial x}{\partial p_i}
=
0.
$$

従って

$$
p\cdot
\frac{\partial x}{\partial p_i}
=
-x_i.
$$

これを代入して

$$
\frac{\partial v}{\partial p_i}
=
-\lambda x_i.
$$

さらに

$$
\frac{\partial v}{\partial m}
=
\lambda
$$

だったので

$$
x_i
=
-
\frac{
\partial v/\partial p_i
}{
\partial v/\partial m
}.
$$
<!-- proof-end -->

この証明でも包絡定理と同じ構造が見えます。

最適解 $x(p,m)$ 自体が動く効果を KKT 条件と予算等式で整理すると、最終的に直接的な価格効果と所得効果だけが残ります。

---

## 11. 価格変化には「代替効果」と「購買力効果」が混ざっている

第1財の価格が上がったとします。

Marshall 需要が変わる理由は二つあります。

1. **相対価格が変わった**  
   第1財が第2財に比べて割高になり、別の財へ置き換えたくなる。
2. **同じ所得で買える量が減った**  
   実質的な購買力が下がる。

普通の Marshall 需要では、この二つが同時に起こります。

Hicks 需要は、所得を補償して元の効用水準を保つため、1の純粋な相対価格効果を取り出す道具になります。

元の価格と所得を $(p,m)$ とし、

$$
\bar u=v(p,m)
$$

を元の効用水準とします。

価格が変わったときに

$$
e(q,\bar u)
$$

だけ所得を与えれば、消費者は元の効用 $\bar u$ をちょうど維持できます。

これが「補償」の意味です。

---

## 12. 総価格効果を二つに分ける

双対性により

$$
h(p,\bar u)
=
x(p,e(p,\bar u))
$$

と書けます。

左辺は効用を固定した Hicks 需要、右辺はその効用を維持するだけの支出を所得として与えた Marshall 需要です。

この恒等式を価格で微分すると、総価格効果を二つに分ける関係が出ます。

<a id="thm-micro3-slutsky"></a>

<!-- formal-statement-start -->
> **定理（Slutsky 分解）**  
> 効用関数 $u:\mathbb R_+^L\to\mathbb R$ が連続かつ狭義単調、$p\in\mathbb R_{++}^L$、$m>0$ とする。
>
> $\bar u=v(p,m)$ と置き、$(p,m)$ と $(p,\bar u)$ の近傍で Marshall 需要 $x$、Hicks 需要 $h$、支出関数 $e$ が一意かつ微分可能で、[Shephard 型関係](#thm-micro3-shephard)が成り立つとする。
>
> このとき任意の財 $i,j$ について
>
$$
\boxed{
\frac{\partial x_i}{\partial p_j}
=
\frac{\partial h_i}{\partial p_j}
-
x_j
\frac{\partial x_i}{\partial m}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

右辺の二項には明確な意味があります。

$$
\frac{\partial h_i}{\partial p_j}
$$

は効用を固定した **補償価格効果**、すなわち代替効果です。

一方

$$
-
x_j
\frac{\partial x_i}{\partial m}
$$

は、価格 $p_j$ 上昇による購買力低下を所得変化へ換算した **所得効果**です。

<!-- proof-start -->
### 証明

目標効用 $\bar u$ を固定します。

消費者双対性から

$$
h(p,\bar u)
=
x(p,e(p,\bar u))
$$

です。

第 $i$ 成分について

$$
h_i(p,\bar u)
=
x_i(p,e(p,\bar u)).
$$

これを $p_j$ で微分します。

右辺は価格が直接変わる効果と、必要支出 $e$ が変わる効果を持つので、連鎖律より

$$
\frac{\partial h_i}{\partial p_j}
=
\frac{\partial x_i}{\partial p_j}
+
\frac{\partial x_i}{\partial m}
\frac{\partial e}{\partial p_j}.
$$

[Shephard 型関係](#thm-micro3-shephard)から

$$
\frac{\partial e}{\partial p_j}
=
h_j(p,\bar u).
$$

従って

$$
\frac{\partial h_i}{\partial p_j}
=
\frac{\partial x_i}{\partial p_j}
+
h_j(p,\bar u)
\frac{\partial x_i}{\partial m}.
$$

ここで

$$
\bar u=v(p,m)
$$

と置けば、消費者双対性により

$$
h_j(p,\bar u)
=
x_j(p,m).
$$

したがって

$$
\frac{\partial h_i}{\partial p_j}
=
\frac{\partial x_i}{\partial p_j}
+
x_j
\frac{\partial x_i}{\partial m}.
$$

整理して

$$
\frac{\partial x_i}{\partial p_j}
=
\frac{\partial h_i}{\partial p_j}
-
x_j
\frac{\partial x_i}{\partial m}.
$$
<!-- proof-end -->

「価格が上がれば需要が減る」と単純に言い切れない理由も、この式にあります。

代替効果には一定の符号構造がありますが、所得効果はその財が所得増加にどう反応するかで変わります。

---

## 13. 二財 Cobb--Douglas 型で Slutsky 分解を数字で見る

具体的に

$$
u(x)=\sqrt{x_1x_2},
$$

$$
p=(1,1),
\qquad
m=8
$$

とします。

Marshall 需要は

$$
x_1=\frac{m}{2p_1},
\qquad
x_2=\frac{m}{2p_2}
$$

なので、基準点では

$$
x=(4,4).
$$

まず第1財の価格 $p_1$ に対する第1財需要の総効果は

$$
\frac{\partial x_1}{\partial p_1}
=
-\frac{m}{2p_1^2}.
$$

基準点では

$$
\frac{\partial x_1}{\partial p_1}
=
-4.
$$

所得への反応は

$$
\frac{\partial x_1}{\partial m}
=
\frac{1}{2p_1}
=
\frac12.
$$

[Slutsky 分解](#thm-micro3-slutsky)より

$$
\frac{\partial h_1}{\partial p_1}
=
\frac{\partial x_1}{\partial p_1}
+
x_1\frac{\partial x_1}{\partial m}.
$$

従って

$$
\frac{\partial h_1}{\partial p_1}
=
-4
+
4\cdot\frac12
=
-2.
$$

つまり総価格効果 $-4$ は

$$
\boxed{
-4
=
-2
-
2
}
$$

と分かれます。

- $-2$：効用を保っても第1財から離れる代替効果
- $-2$：第1財価格上昇で実質所得が落ちる所得効果

です。

今度は第2財を見ます。

Marshall 需要

$$
x_2=\frac{m}{2p_2}
$$

は $p_1$ を直接含まないので

$$
\frac{\partial x_2}{\partial p_1}=0.
$$

一方

$$
\frac{\partial x_2}{\partial m}
=
\frac12.
$$

従って

$$
\frac{\partial h_2}{\partial p_1}
=
0
+
x_1\frac12
=
2.
$$

効用を保つよう所得を補償すれば、第1財が割高になった分、第2財へ2単位分だけ代替する方向が現れます。

しかし実際には購買力低下がその増加を打ち消し、Marshall 需要の第2財は一次近似では変わりません。

---

## 14. Slutsky 行列は支出関数の曲率を見ている

[Shephard 型関係](#thm-micro3-shephard)から

$$
h_i(p,\bar u)
=
\frac{\partial e}{\partial p_i}(p,\bar u)
$$

です。

さらに $e$ が価格について2回微分可能なら

$$
\frac{\partial h_i}{\partial p_j}
=
\frac{\partial^2 e}{\partial p_j\partial p_i}.
$$

したがって、補償価格効果を並べた行列

$$
S(p,\bar u)
=
\left[
\frac{\partial h_i}{\partial p_j}
\right]_{i,j}
$$

は支出関数の Hessian です。

<a id="cor-micro3-slutsky-matrix"></a>

<!-- formal-statement-start -->
> **系（補償価格効果行列の対称性・半負定値性）**  
> 支出関数 $e(\,\cdot\,,\bar u)$ が価格 $p$ の近傍で2回連続微分可能なら、
>
$$
S_{ij}
=
\frac{\partial h_i}{\partial p_j}
=
\frac{\partial^2 e}{\partial p_j\partial p_i}
$$
>
> であり、
>
$$
S_{ij}=S_{ji}
$$
>
> が成り立つ。
>
> また $e(\,\cdot\,,\bar u)$ は価格について凹なので、
>
$$
z^{\mathsf T}S z\le0
\qquad(\forall z\in\mathbb R^L)
$$
>
> である。
<!-- formal-statement-end -->

これは「代替効果が好き勝手な行列ではない」ことを示します。

需要データが理論の課す条件を満たすか調べるときにも、この対称性や半負定値性が重要になります。

---

## 15. Fenchel 双対と「消費者双対性」は同じものではない

ここまで「双対」という言葉を使ってきました。

OPT4 では [Fenchel 双対問題](../OPT4/index.md#def-opt4-fenchel-dual)を学びました。

どちらも最適化を別の側から眺めるので共通する雰囲気はあります。

しかし、同じ概念として扱ってはいけません。

本章の消費者双対性は

$$
\max_{p\cdot x\le m}u(x)
$$

と

$$
\min_{u(x)\ge\bar u}p\cdot x
$$

という **同じ選好を二つの制約の置き方から見る関係**です。

一方、Fenchel 双対は凸関数の共役

$$
f^*(y)
=
\sup_x\{\langle y,x\rangle-f(x)\}
$$

を使って、主問題と双対問題を構成する一般的な凸解析の仕組みです。

共通しているのは、

- 最適値関数を見る
- 価格や乗数が感度を表す
- 支持超平面や凸性が現れる
- 包絡型の微分関係が現れる

という構造です。

しかし

$$
\text{支出関数}
=
\text{Fenchel 共役}
$$

と機械的に同一視してはいけません。

本章で必要なのは、まず消費者問題そのものの二つの最適化を正確に往復できることです。

---

## 16. 仮定を失うと何が壊れるか

### 16.1 単調性を失うと、所得を使い切る必要がない

一財で

$$
u(x)=-(x-1)^2,
$$

$$
p=1,
\qquad
m=2
$$

とします。

効用は $x=1$ で最大になります。

従って Marshall 需要は

$$
x^*=1
$$

で

$$
v(1,2)=0.
$$

しかし目標効用 $0$ を達成する最小支出は

$$
e(1,0)=1.
$$

したがって

$$
e(1,v(1,2))
=
1
\ne
2.
$$

なぜ双対性の証明が壊れたのでしょうか。

狭義単調性がないので、所得を1余らせても

$$
x=1
$$

から多く買えば効用が上がるとは限りません。

つまり

$$
\text{余った予算}
\Rightarrow
\text{より高い効用へ改善できる}
$$

という証明の核心が失われています。

### 16.2 Hicks 需要が複数あると、支出関数は微分できないことがある

二財で

$$
u(x)=x_1+x_2
$$

とし、目標効用を

$$
\bar u=1
$$

とします。

支出最小化は

$$
\min p_1x_1+p_2x_2
\quad\text{制約}\quad
x_1+x_2\ge1.
$$

従って

$$
e(p,\bar u)
=
\min\{p_1,p_2\}.
$$

$p_1=p_2$ では

$$
x_1+x_2=1
$$

上のすべての点が支出最小です。

Hicks 需要は一意ではありません。

同時に

$$
\min\{p_1,p_2\}
$$

は $p_1=p_2$ で微分不可能です。

ここで Shephard 型関係が壊れたのではありません。

微分可能性がなくなったため、単一の勾配だけで Hicks 需要集合を表すことができず、価格方向ごとの片側変化を扱う必要が出てきたのです。

### 16.3 Roy 型関係や Slutsky 分解にも滑らかさが必要

端点解が切り替わる点や、需要が複数ある点では、需要関数そのものが微分可能とは限りません。

その場合

$$
\frac{\partial x_i}{\partial p_j}
$$

を使う古典的な Slutsky 分解は、その点では直接書けません。

これは経済理論が壊れたのではなく、

> 滑らかな一価関数として需要を微分する

という表現が使えないということです。

集合値の需要や方向微分を使えば、より一般の形へ拡張できますが、本章では有限次元の滑らかな標準形を確実に使えるところまでを扱います。

---

# 演習

## Level A

<a id="ex-micro3-a01"></a>

### MICRO3-A01 一財で間接効用と支出関数を往復する

- Level: A
- 目安時間: 15分

一財の効用

$$
u(x)=\log(1+x),
\qquad
x\ge0
$$

を考える。

価格 $p>0$、所得 $m\ge0$ とする。

1. Marshall 需要を求めよ。
2. 間接効用 $v(p,m)$ を求めよ。
3. 目標効用 $\bar u\ge0$ に対する支出関数 $e(p,\bar u)$ を求めよ。
4. $e(p,v(p,m))=m$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

1. $\log(1+x)$ は $x$ について狭義単調増加です。

予算制約は

$$
px\le m
$$

なので、最大の購入量

$$
x=\frac{m}{p}
$$

を選びます。

従って

$$
\boxed{
x(p,m)=\frac{m}{p}.
}
$$

2. 最適消費を効用へ代入します。

$$
v(p,m)
=
\log\left(1+\frac{m}{p}\right).
$$

従って

$$
\boxed{
v(p,m)
=
\log\left(1+\frac{m}{p}\right).
}
$$

3. 目標効用を達成する条件は

$$
\log(1+x)\ge\bar u.
$$

指数関数を取ると

$$
1+x\ge e^{\bar u}.
$$

従って

$$
x\ge e^{\bar u}-1.
$$

支出 $px$ を最小にするには最小の実行可能量を選べばよいので

$$
x=e^{\bar u}-1.
$$

したがって

$$
\boxed{
e(p,\bar u)
=
p(e^{\bar u}-1).
}
$$

4. $\bar u=v(p,m)$ を代入します。

$$
e(p,v(p,m))
=
p
\left[
\exp\left\{
\log\left(1+\frac{m}{p}\right)
\right\}
-1
\right].
$$

指数関数と対数関数が打ち消し合うので

$$
e(p,v(p,m))
=
p\left(1+\frac{m}{p}-1\right)
=
m.
$$

従って

$$
\boxed{
e(p,v(p,m))=m.
}
$$
<!-- solution-end -->

<a id="ex-micro3-a02"></a>

### MICRO3-A02 Cobb--Douglas 型の支出関数を求める

- Level: A
- 目安時間: 18分

$$
u(x)=\sqrt{x_1x_2}
$$

とする。

価格

$$
p=(4,1)
$$

のもとで目標効用

$$
\bar u=6
$$

を達成したい。

1. 支出関数を求めよ。
2. 必要な最小支出を数値で求めよ。
3. Hicks 需要を求めよ。
4. その消費束が本当に効用6を達成することを確認せよ。

<!-- solution-start -->
#### 詳細解答

この効用は Cobb--Douglas 型で

$$
\alpha=\frac12.
$$

したがって

$$
A_\alpha
=
\left(\frac12\right)^{1/2}
\left(\frac12\right)^{1/2}
=
\frac12.
$$

1. 支出関数は

$$
e(p,\bar u)
=
\frac{\bar u}{A_\alpha}
p_1^{1/2}p_2^{1/2}.
$$

よって

$$
\boxed{
e(p,\bar u)
=
2\bar u\sqrt{p_1p_2}.
}
$$

2. 数値を代入すると

$$
e((4,1),6)
=
2\cdot6\cdot\sqrt{4\cdot1}
=
12\cdot2
=
24.
$$

従って必要最小支出は

$$
\boxed{24}.
$$

3. 各財への支出比率は半分ずつです。

したがって

$$
h_1
=
\frac{(1/2)\cdot24}{4}
=
3,
$$

$$
h_2
=
\frac{(1/2)\cdot24}{1}
=
12.
$$

よって

$$
\boxed{
h((4,1),6)=(3,12).
}
$$

4. 効用を計算すると

$$
u(3,12)
=
\sqrt{3\cdot12}
=
\sqrt{36}
=
6.
$$

確かに目標効用をちょうど達成しています。
<!-- solution-end -->

<a id="ex-micro3-a03"></a>

### MICRO3-A03 支出関数の1次同次性を意味から確認する

- Level: A
- 目安時間: 12分

ある効用関数の支出関数が

$$
e(p,\bar u)
$$

で与えられているとする。

1. 価格をすべて3倍したとき、同じ消費束 $x$ の支出が何倍になるか示せ。
2. そこから
   $$
   e(3p,\bar u)=3e(p,\bar u)
   $$
   を証明せよ。
3. 価格だけでなく目標効用まで3倍する必要がない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 同じ消費束 $x$ の支出は

$$
(3p)\cdot x
=
3(p\cdot x).
$$

従ってどの消費束についても支出はちょうど3倍になります。

2. 目標効用を達成する集合

$$
C(\bar u)
=
\{x:u(x)\ge\bar u\}
$$

は価格を変えても同じです。

従って

$$
e(3p,\bar u)
=
\inf_{x\in C(\bar u)}(3p)\cdot x.
$$

前問より

$$
(3p)\cdot x
=
3p\cdot x
$$

なので

$$
e(3p,\bar u)
=
3
\inf_{x\in C(\bar u)}
p\cdot x.
$$

よって

$$
\boxed{
e(3p,\bar u)
=
3e(p,\bar u).
}
$$

3. ここで3倍しているのは貨幣単位で測った価格です。

目標効用 $\bar u$ は「維持したい満足度」であり、価格単位ではありません。

価格が3倍になっても、同じ生活水準を維持するという目標そのものは変えません。

そのため $\bar u$ は固定したままです。
<!-- solution-end -->

<a id="ex-micro3-a04"></a>

### MICRO3-A04 価格上昇を所得補償する

- Level: A
- 目安時間: 20分

$$
u(x)=\sqrt{x_1x_2}
$$

とする。

最初は

$$
p=(1,1),
\qquad
m=8
$$

である。

その後、第1財の価格だけが上がって

$$
q=(4,1)
$$

になった。

1. 最初の Marshall 需要と効用水準を求めよ。
2. 新価格 $q$ のもとで、最初と同じ効用を維持するために必要な最小所得を求めよ。
3. そのときの Hicks 需要を求めよ。
4. 所得を8のまま据え置いた場合と比較し、「補償」の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. Cobb--Douglas 型で指数は $1/2,1/2$ なので

$$
x_1=\frac{8}{2\cdot1}=4,
$$

$$
x_2=\frac{8}{2\cdot1}=4.
$$

従って

$$
x=(4,4).
$$

効用は

$$
\bar u
=
\sqrt{4\cdot4}
=
4.
$$

2. 支出関数は

$$
e(p,\bar u)
=
2\bar u\sqrt{p_1p_2}.
$$

新価格 $q=(4,1)$ を代入すると

$$
e(q,4)
=
2\cdot4\cdot\sqrt{4\cdot1}
=
8\cdot2
=
16.
$$

従って、元と同じ効用4を維持するには

$$
\boxed{16}
$$

の所得が必要です。

3. Hicks 需要では支出の半分ずつを各財へ使います。

第1財には8を使うので

$$
h_1=\frac{8}{4}=2.
$$

第2財にも8を使うので

$$
h_2=\frac{8}{1}=8.
$$

従って

$$
\boxed{
h(q,4)=(2,8).
}
$$

確認すると

$$
u(2,8)
=
\sqrt{16}
=
4.
$$

4. 所得を8のままにすると、新価格での Marshall 需要は

$$
x_1=\frac{8}{2\cdot4}=1,
$$

$$
x_2=\frac{8}{2\cdot1}=4.
$$

効用は

$$
\sqrt{1\cdot4}=2
$$

まで下がります。

一方、所得を16へ補償すると効用4を維持できます。

つまり「補償」とは、価格変化による購買力の変化を所得調整で打ち消し、同じ効用水準で比較できるようにすることです。
<!-- solution-end -->

---

## Level B

<a id="ex-micro3-b01"></a>

### MICRO3-B01 消費者双対性を証明する

- Level: B
- 目安時間: 30分

$u:\mathbb R_+^L\to\mathbb R$ は連続かつ狭義単調、$p\in\mathbb R_{++}^L$、$m>0$ とする。

1. Marshall 最適点が予算を使い切る理由を述べよ。
2. $e(p,v(p,m))\le m$ を示せ。
3. $e(p,v(p,m))<m$ と仮定すると矛盾が生じることを示せ。
4. 以上から
   $$
   e(p,v(p,m))=m
   $$
   を結論せよ。
5. さらに
   $$
   H(p,v(p,m))=D(p,m)
   $$
   を示せ。

<!-- solution-start -->
#### 詳細解答

1. 狭義単調性のもとで、Marshall 最適点 $x^*$ が

$$
p\cdot x^*<m
$$

を満たしたとします。

余った所得で任意の財を少量増やせば、予算内にとどまりながら消費束を成分ごとに増やせます。

狭義単調性から効用が上がるので、$x^*$ の最適性に反します。

従って

$$
p\cdot x^*=m.
$$

2. $x^*\in D(p,m)$ を取ります。

間接効用の定義から

$$
u(x^*)=v(p,m).
$$

したがって $x^*$ は「効用 $v(p,m)$ 以上を達成せよ」という支出最小化問題の実行可能点です。

その支出は

$$
p\cdot x^*=m.
$$

最小支出はこの値以下なので

$$
e(p,v(p,m))\le m.
$$

3. 反対に

$$
e(p,v(p,m))<m
$$

と仮定します。

支出最小化点 $h^*$ を取れば

$$
p\cdot h^*
=
e(p,v(p,m))
<
m
$$

で、

$$
u(h^*)\ge v(p,m)
$$

です。

所得が余っているので、ある $\varepsilon>0$ を十分小さく取れば

$$
p\cdot(h^*+\varepsilon e_1)\le m.
$$

狭義単調性より

$$
u(h^*+\varepsilon e_1)
>
u(h^*)
\ge
v(p,m).
$$

しかし左の消費束は予算 $m$ で購入できます。

これは $v(p,m)$ が予算 $m$ で達成可能な最大効用であることに反します。

4. 2と3から

$$
\boxed{
e(p,v(p,m))=m.
}
$$

5. $x^*\in D(p,m)$ なら

$$
u(x^*)=v(p,m),
$$

$$
p\cdot x^*=m=e(p,v(p,m)).
$$

したがって $x^*$ は支出最小点でもあるので

$$
x^*\in H(p,v(p,m)).
$$

逆に

$$
h^*\in H(p,v(p,m))
$$

なら

$$
p\cdot h^*=e(p,v(p,m))=m.
$$

よって $h^*$ は予算集合に入ります。

また

$$
u(h^*)\ge v(p,m).
$$

しかし予算集合上では $v(p,m)$ が最大値だから

$$
u(h^*)\le v(p,m).
$$

従って

$$
u(h^*)=v(p,m).
$$

したがって $h^*$ は Marshall 最適点でもあります。

以上より

$$
\boxed{
H(p,v(p,m))=D(p,m).
}
$$
<!-- solution-end -->

<a id="ex-micro3-b02"></a>

### MICRO3-B02 支出関数の価格微分から需要量を復元する

- Level: B
- 目安時間: 25分

目標効用 $\bar u$ を固定し、価格 $p$ で Hicks 需要集合が非空とする。

1. 任意の $h\in H(p,\bar u)$ と任意の価格 $q$ について
   $$
   e(q,\bar u)
   \le
   e(p,\bar u)
   +(q-p)\cdot h
   $$
   を示せ。
2. 任意の方向 $d\in\mathbb R^L$ と十分小さい $t>0$、$t<0$ に対して $q=p+td$ を代入し、差商の上下から
$$
   \nabla_p e(p,\bar u)\cdot d=h\cdot d
$$
   を導け。
3. $e$ が $p$ で微分可能なら
$$
   h=\nabla_p e(p,\bar u)
$$
   を結論せよ。

<!-- solution-start -->
#### 詳細解答

1. $h\in H(p,\bar u)$ なので

$$
u(h)\ge\bar u.
$$

従って $h$ は価格を $q$ に変えても、目標効用制約に関しては実行可能です。

よって価格 $q$ における最小支出は、$h$ をそのまま買った支出以下です。

$$
e(q,\bar u)\le q\cdot h.
$$

一方、$h$ は価格 $p$ で支出最小だから

$$
p\cdot h=e(p,\bar u).
$$

そこで

$$
q\cdot h
=
p\cdot h
+
(q-p)\cdot h
$$

と分解すると

$$
q\cdot h
=
e(p,\bar u)
+
(q-p)\cdot h.
$$

従って

$$
\boxed{
e(q,\bar u)
\le
e(p,\bar u)
+
(q-p)\cdot h.
}
$$

2. 任意の方向 $d\in\mathbb R^L$ を取ります。

$p$ の全成分は正なので、$|t|$ を十分小さくすれば

$$
p+td\in\mathbb R_{++}^L
$$

です。

1の不等式へ $q=p+td$ を代入すると

$$
e(p+td,\bar u)-e(p,\bar u)
\le
t\,d\cdot h.
$$

$t>0$ で割れば

$$
\frac{
e(p+td,\bar u)-e(p,\bar u)
}{t}
\le
d\cdot h.
$$

$t\downarrow0$ とし、$e$ の微分可能性を使うと

$$
\nabla_p e(p,\bar u)\cdot d
\le
d\cdot h.
$$

一方 $t<0$ で割ると不等号が反転して

$$
\frac{
e(p+td,\bar u)-e(p,\bar u)
}{t}
\ge
d\cdot h.
$$

$t\uparrow0$ とすると

$$
\nabla_p e(p,\bar u)\cdot d
\ge
d\cdot h.
$$

従って

$$
\boxed{
\nabla_p e(p,\bar u)\cdot d
=
h\cdot d
}
$$

が任意の $d$ で成り立ちます。

3. 任意の方向との内積が等しいので

$$
h=\nabla_p e(p,\bar u).
$$

従って成分ごとに

$$
\boxed{
h_i(p,\bar u)
=
\frac{\partial e}{\partial p_i}(p,\bar u).
}
$$

これが Shephard 型関係です。
<!-- solution-end -->

<a id="ex-micro3-b03"></a>

### MICRO3-B03 Roy 型関係を Cobb--Douglas 型で検算する

- Level: B
- 目安時間: 30分

$$
u(x)
=
x_1^\alpha x_2^{1-\alpha},
\qquad
0<\alpha<1
$$

とする。

1. 間接効用
   $$
   v(p,m)
   =
   \alpha^\alpha(1-\alpha)^{1-\alpha}
   \frac{m}{p_1^\alpha p_2^{1-\alpha}}
   $$
   から
   $$
   \frac{\partial v}{\partial m},
   \qquad
   \frac{\partial v}{\partial p_1},
   \qquad
   \frac{\partial v}{\partial p_2}
   $$
   を求めよ。
2. [Roy 型関係](#thm-micro3-roy)から $x_1,x_2$ を復元せよ。
3. MICRO2 の Marshall 需要と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

定数

$$
A
=
\alpha^\alpha(1-\alpha)^{1-\alpha}
$$

と置くと

$$
v(p,m)
=
A m p_1^{-\alpha}p_2^{-(1-\alpha)}.
$$

1. 所得で微分すると

$$
\frac{\partial v}{\partial m}
=
A p_1^{-\alpha}p_2^{-(1-\alpha)}.
$$

また $p_1$ で微分すると

$$
\frac{\partial v}{\partial p_1}
=
-\alpha
A m
p_1^{-\alpha-1}
p_2^{-(1-\alpha)}.
$$

$p_2$ で微分すると

$$
\frac{\partial v}{\partial p_2}
=
-(1-\alpha)
A m
p_1^{-\alpha}
p_2^{-(2-\alpha)}.
$$

2. [Roy 型関係](#thm-micro3-roy)より

$$
x_1
=
-
\frac{v_{p_1}}{v_m}.
$$

代入すると

$$
x_1
=
-
\frac{
-\alpha A m p_1^{-\alpha-1}p_2^{-(1-\alpha)}
}{
A p_1^{-\alpha}p_2^{-(1-\alpha)}
}.
$$

共通因子を消すと

$$
x_1
=
\frac{\alpha m}{p_1}.
$$

同様に

$$
x_2
=
-
\frac{v_{p_2}}{v_m}
$$

だから

$$
x_2
=
\frac{(1-\alpha)m}{p_2}.
$$

3. 従って

$$
\boxed{
x_1
=
\frac{\alpha m}{p_1},
\qquad
x_2
=
\frac{(1-\alpha)m}{p_2}.
}
$$

これは MICRO2 で直接効用最大化から求めた Marshall 需要と一致します。

同じ需要を

- 元の効用最大化問題から解く
- 最適値関数 $v$ の微分から戻す

という二通りで得られたことになります。
<!-- solution-end -->

---

## Level C

<a id="ex-micro3-c01"></a>

### MICRO3-C01 Cobb--Douglas 型で Slutsky 分解を完全に再構成する

- Level: C
- 目安時間: 45分

$$
u(x)=x_1^{1/2}x_2^{1/2}
$$

とする。

一般の

$$
p_1,p_2,m>0
$$

について次を行え。

1. Marshall 需要 $x(p,m)$ を求めよ。
2. 間接効用 $v(p,m)$ を求めよ。
3. 支出関数 $e(p,\bar u)$ と Hicks 需要 $h(p,\bar u)$ を求めよ。
4. $e(p,v(p,m))=m$ と $h(p,v(p,m))=x(p,m)$ を確認せよ。
5. 第1財価格 $p_1$ に対する
   $$
   \frac{\partial x_1}{\partial p_1},
   \qquad
   \frac{\partial x_1}{\partial m},
   \qquad
   \frac{\partial h_1}{\partial p_1}
   $$
   を求めよ。
6. Slutsky 分解
   $$
   \frac{\partial x_1}{\partial p_1}
   =
   \frac{\partial h_1}{\partial p_1}
   -
   x_1
   \frac{\partial x_1}{\partial m}
   $$
   を式の上で確認せよ。
7. 第1財価格が上がったとき、代替効果と所得効果がそれぞれどちら向きに働くか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. Cobb--Douglas 型で指数が半分ずつなので、所得の半分を各財へ使います。

従って

$$
\boxed{
x_1(p,m)
=
\frac{m}{2p_1},
\qquad
x_2(p,m)
=
\frac{m}{2p_2}.
}
$$

2. 最適消費を効用へ代入します。

$$
v(p,m)
=
\sqrt{
\frac{m}{2p_1}
\frac{m}{2p_2}
}.
$$

従って

$$
v(p,m)
=
\frac{m}{2\sqrt{p_1p_2}}.
$$

よって

$$
\boxed{
v(p,m)
=
\frac{m}{2\sqrt{p_1p_2}}.
}
$$

3. この式を $m$ について解きます。

$$
\bar u
=
\frac{m}{2\sqrt{p_1p_2}}
$$

なら

$$
m
=
2\bar u\sqrt{p_1p_2}.
$$

従って支出関数は

$$
\boxed{
e(p,\bar u)
=
2\bar u\sqrt{p_1p_2}.
}
$$

Hicks 需要は各財へ支出を半分ずつ配分するので

$$
h_1
=
\frac{e(p,\bar u)}{2p_1}.
$$

支出関数を代入して

$$
h_1
=
\frac{
2\bar u\sqrt{p_1p_2}
}{
2p_1
}
=
\bar u
\sqrt{\frac{p_2}{p_1}}.
$$

同様に

$$
h_2
=
\bar u
\sqrt{\frac{p_1}{p_2}}.
$$

従って

$$
\boxed{
h_1(p,\bar u)
=
\bar u\sqrt{\frac{p_2}{p_1}},
\qquad
h_2(p,\bar u)
=
\bar u\sqrt{\frac{p_1}{p_2}}.
}
$$

4. まず

$$
e(p,v(p,m))
=
2
\left(
\frac{m}{2\sqrt{p_1p_2}}
\right)
\sqrt{p_1p_2}
=
m.
$$

従って

$$
\boxed{
e(p,v(p,m))=m.
}
$$

次に

$$
h_1(p,v(p,m))
=
\frac{m}{2\sqrt{p_1p_2}}
\sqrt{\frac{p_2}{p_1}}.
$$

平方根をまとめると

$$
\frac{1}{\sqrt{p_1p_2}}
\sqrt{\frac{p_2}{p_1}}
=
\frac{1}{p_1}.
$$

従って

$$
h_1(p,v(p,m))
=
\frac{m}{2p_1}
=
x_1(p,m).
$$

同様に

$$
h_2(p,v(p,m))
=
\frac{m}{2p_2}
=
x_2(p,m).
$$

5. Marshall 需要

$$
x_1=\frac{m}{2p_1}
$$

を $p_1$ で微分すると

$$
\boxed{
\frac{\partial x_1}{\partial p_1}
=
-\frac{m}{2p_1^2}.
}
$$

所得で微分すると

$$
\boxed{
\frac{\partial x_1}{\partial m}
=
\frac{1}{2p_1}.
}
$$

Hicks 需要

$$
h_1
=
\bar u
p_2^{1/2}p_1^{-1/2}
$$

を、$\bar u$ を固定して $p_1$ で微分すると

$$
\frac{\partial h_1}{\partial p_1}
=
-\frac12
\bar u
p_2^{1/2}p_1^{-3/2}.
$$

Slutsky 分解で比較するため

$$
\bar u=v(p,m)
=
\frac{m}{2\sqrt{p_1p_2}}
$$

を代入します。

すると

$$
\frac{\partial h_1}{\partial p_1}
=
-\frac12
\frac{m}{2\sqrt{p_1p_2}}
p_2^{1/2}p_1^{-3/2}.
$$

$p_2^{1/2}$ が消え、

$$
\sqrt{p_1}\,p_1^{3/2}
=
p_1^2
$$

なので

$$
\boxed{
\frac{\partial h_1}{\partial p_1}
=
-\frac{m}{4p_1^2}.
}
$$

6. Slutsky 分解の右辺を計算します。

$$
\frac{\partial h_1}{\partial p_1}
-
x_1
\frac{\partial x_1}{\partial m}
$$

に各式を代入すると

$$
=
-\frac{m}{4p_1^2}
-
\frac{m}{2p_1}
\frac{1}{2p_1}.
$$

第2項は

$$
\frac{m}{4p_1^2}
$$

なので

$$
=
-\frac{m}{4p_1^2}
-
\frac{m}{4p_1^2}
=
-\frac{m}{2p_1^2}.
$$

これは

$$
\frac{\partial x_1}{\partial p_1}
=
-\frac{m}{2p_1^2}
$$

と一致します。

従って

$$
\boxed{
\frac{\partial x_1}{\partial p_1}
=
\frac{\partial h_1}{\partial p_1}
-
x_1
\frac{\partial x_1}{\partial m}.
}
$$

7. 代替効果は

$$
\frac{\partial h_1}{\partial p_1}
=
-\frac{m}{4p_1^2}
<0
$$

なので、第1財の相対価格が上がると、効用を補償しても第1財から離れる方向に働きます。

また

$$
\frac{\partial x_1}{\partial m}>0
$$

なので第1財は所得増加で需要が増える財です。

第1財価格が上がると実質的な購買力は低下するため、所得効果も

$$
-
x_1
\frac{\partial x_1}{\partial m}
<0
$$

となり、第1財需要を減らす方向に働きます。

この例では代替効果と所得効果が同じ向きなので、Marshall 需要の減少は両者の合計になります。
<!-- solution-end -->

---

## まとめ

本章では、MICRO2 の効用最大化問題を反対側から見直しました。

- 間接効用関数
  $$
  v(p,m)=\max_{p\cdot x\le m}u(x)
  $$
  は、価格と所得のもとで達成できる最大効用を返す。
- 支出関数
  $$
  e(p,\bar u)
  =
  \min_{u(x)\ge\bar u}p\cdot x
  $$
  は、目標効用を達成する最小支出を返す。
- Hicks 需要は、その最小支出を実現する消費束である。
- 連続効用と正の価格のもとでは、達成可能な目標に対する支出最小点が存在する。
- 狭義単調性のもとで
  $$
  e(p,v(p,m))=m,
  \qquad
  v(p,e(p,\bar u))=\bar u
  $$
  となり、
  $$
  H(p,v(p,m))=D(p,m)
  $$
  で二つの需要が一致する。
- 支出関数は価格について1次同次・単調・凹である。
- 微分可能なら Shephard 型関係
  $$
  h_i=\frac{\partial e}{\partial p_i}
  $$
  により、支出関数の価格微分から Hicks 需要が戻る。
- 滑らかな内点解では Roy 型関係
  $$
  x_i
  =
  -
  \frac{v_{p_i}}{v_m}
  $$
  により、間接効用から Marshall 需要が戻る。
- Slutsky 分解
  $$
  \frac{\partial x_i}{\partial p_j}
  =
  \frac{\partial h_i}{\partial p_j}
  -
  x_j\frac{\partial x_i}{\partial m}
  $$
  は、価格効果を代替効果と所得効果に分ける。
- 補償価格効果行列は、滑らかな場合には支出関数の Hessian であり、対称・半負定値になる。
- 消費者双対性と Fenchel 双対は、共通する凸最適化の構造を持つが同一の概念ではない。
- 単調性を失うと予算使い切りが壊れ、微分可能性や一意性を失うと Shephard・Roy・Slutsky の古典的な微分表示をそのまま使えなくなる。

次章では、消費者側で見た「価格に対する最適反応」を生産者側へ移し、生産集合・利潤最大化・費用最小化・支持価格を扱います。
