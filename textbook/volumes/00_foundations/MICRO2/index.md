# MICRO2 消費者最適化・需要

<!-- definition-example-audit: strict -->

MICRO1 では、消費者の選好を順序として定義し、凸選好と準凹な効用表現の関係まで整理しました。

本章では、価格と所得によって「買える集合」を作り、その上で選好を最大化します。

中心となる問題は

$$
\max_{x\in\mathbb R_+^L}u(x)
\quad\text{制約}\quad
p\cdot x\le m
$$

です。

ここで重要なのは、微分して公式を覚えることではありません。

$$
\boxed{
\text{予算集合}
\longrightarrow
\text{最適消費}
\longrightarrow
\text{KKT 条件}
\longrightarrow
\text{限界代替率と価格比}
}
$$

という構造を理解することです。

Cobb--Douglas 型や CES 型の需要は、この構造を具体的に解いた結果として導きます。

---

## 1. 価格と所得から買える集合を作る

本章では価格ベクトルを

$$
p=(p_1,\dots,p_L)\in\mathbb R_{++}^L
$$

とし、所得を

$$
m\ge0
$$

とします。

価格を正に限定するのは、無料の財があると予算だけでは消費量を有界にできないからです。

<a id="def-micro2-budget-set"></a>

<!-- formal-statement-start -->
> **定義（予算集合）**  
> 価格 $p\in\mathbb R_{++}^L$、所得 $m\ge0$ に対して
>
$$
B(p,m)
=
\{x\in\mathbb R_+^L:p\cdot x\le m\}
$$
>
> を **予算集合** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro2-budget-set -->
**定義の確認**：二財の予算集合

$$
p=(2,1),
\qquad
m=6
$$

なら

$$
B(p,m)
=
\{(x_1,x_2)\in\mathbb R_+^2:2x_1+x_2\le6\}.
$$

例えば

$$
(2,1)
$$

は

$$
2\cdot2+1=5\le6
$$

なので予算集合に入ります。

一方

$$
(3,1)
$$

は

$$
2\cdot3+1=7>6
$$

なので入りません。
<!-- definition-example-end -->

---

## 2. 正の価格は予算集合をコンパクトにする

<a id="prop-micro2-budget-compact"></a>

<!-- formal-statement-start -->
> **命題（予算集合の非空性・凸性・コンパクト性）**  
> $p\in\mathbb R_{++}^L$、$m\ge0$ とする。
>
> このとき $B(p,m)$ は非空・凸・コンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
0\in B(p,m)
$$

なので非空です。

次に

$$
x,y\in B(p,m),
\qquad
0\le\lambda\le1
$$

とします。

非負直交象限は凸なので

$$
\lambda x+(1-\lambda)y\in\mathbb R_+^L.
$$

また

$$
p\cdot\{\lambda x+(1-\lambda)y\}
=
\lambda p\cdot x+(1-\lambda)p\cdot y
\le
\lambda m+(1-\lambda)m
=
m.
$$

従って

$$
\lambda x+(1-\lambda)y\in B(p,m).
$$

よって予算集合は凸です。

さらに $x\in B(p,m)$ なら各 $i$ について

$$
p_i x_i\le p\cdot x\le m.
$$

$p_i>0$ なので

$$
0\le x_i\le\frac{m}{p_i}.
$$

従って $B(p,m)$ は有界です。

また写像

$$
x\mapsto p\cdot x
$$

は連続なので

$$
\{x:p\cdot x\le m\}
$$

は閉集合です。$\mathbb R_+^L$ も閉集合だから、その共通部分 $B(p,m)$ も閉です。

有限次元 Euclid 空間では閉かつ有界な集合はコンパクトなので、$B(p,m)$ はコンパクトです。
<!-- proof-end -->

価格の正値性が効いた場所は

$$
x_i\le\frac{m}{p_i}
$$

です。

もし $p_i=0$ なら、この上界は作れません。

---

## 3. 最適消費を Marshall 需要としてまとめる

<a id="def-micro2-marshall-demand"></a>

<!-- formal-statement-start -->
> **定義（Marshall 需要）**  
> 効用関数 $u:\mathbb R_+^L\to\mathbb R$、価格 $p\in\mathbb R_{++}^L$、所得 $m\ge0$ に対して
>
$$
D(p,m)
=
\left\{
x\in B(p,m):
u(x)\ge u(y)
\quad(\forall y\in B(p,m))
\right\}
$$
>
> を **Marshall 需要（Marshallian demand）** とよぶ。
>
> $D(p,m)$ が1点集合なら、その唯一の元も同じ記号 $x(p,m)$ で表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro2-marshall-demand -->
**定義の確認**：一財なら需要はすぐ分かる

$$
L=1,
\qquad
u(x)=x,
\qquad
p>0,
\qquad
m>0
$$

とします。

予算集合は

$$
B(p,m)=\left[0,\frac{m}{p}\right].
$$

効用は $x$ とともに増えるので、最大化点は右端だけです。

従って

$$
D(p,m)
=
\left\{\frac{m}{p}\right\}.
$$
<!-- definition-example-end -->

需要を最初から関数と決めつけないことが重要です。

例えば二財で

$$
u(x)=x_1+x_2,
\qquad
p=(1,1)
$$

なら、予算線

$$
x_1+x_2=m
$$

上のすべての点が同じ効用 $m$ を持ちます。

このとき需要は一つの点ではなく集合です。

---

## 4. 連続な効用なら最適消費は存在する

<a id="thm-micro2-demand-existence"></a>

<!-- formal-statement-start -->
> **定理（Marshall 需要の存在）**  
> $p\in\mathbb R_{++}^L$、$m\ge0$ とし、効用関数
>
$$
u:\mathbb R_+^L\to\mathbb R
$$
>
> が連続であるとする。
>
> このとき $D(p,m)$ は空でなく、さらにコンパクトである。
<!-- formal-statement-end -->

### 証明で使うもの

前節で $B(p,m)$ が非空コンパクトであることを示しました。

したがって [Weierstrass の最大最小定理](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md#thm-f0-00c2-01)をそのまま適用できます。

<!-- proof-start -->
### 証明

$B(p,m)$ は非空コンパクトで、$u$ は連続です。

従って Weierstrass の最大最小定理により、ある

$$
x^*\in B(p,m)
$$

が存在して

$$
u(x^*)
=
\max_{x\in B(p,m)}u(x).
$$

したがって

$$
D(p,m)\ne\varnothing.
$$

最大値を

$$
v=
\max_{x\in B(p,m)}u(x)
$$

と置けば

$$
D(p,m)
=
B(p,m)\cap u^{-1}(\{v\}).
$$

$\{v\}$ は閉集合で $u$ は連続だから

$$
u^{-1}(\{v\})
$$

は閉集合です。

従って $D(p,m)$ はコンパクト集合 $B(p,m)$ の閉部分集合なのでコンパクトです。
<!-- proof-end -->

ここで存在を作ったのは「微分可能性」ではありません。

$$
\boxed{
\text{正の価格}
\Rightarrow
\text{予算集合がコンパクト}
}
$$

と

$$
\boxed{
\text{効用の連続性}
\Rightarrow
\text{最大値を極限へ運べる}
}
$$

の組です。

---

## 5. 単調な選好では予算を使い切る

MICRO1 で導入した単調性を、ここで初めて最適化へ使います。

<a id="prop-micro2-budget-exhaustion"></a>

<!-- formal-statement-start -->
> **命題（狭義単調な選好では予算制約が等号になる）**  
> $p\in\mathbb R_{++}^L$、$m>0$ とする。
>
> 選好が狭義単調で、$x^*\in D(p,m)$ なら
>
$$
p\cdot x^*=m
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

反対に

$$
p\cdot x^*<m
$$

と仮定します。

余っている金額を

$$
\delta
=
m-p\cdot x^*
>0
$$

と置きます。

第1財を

$$
\varepsilon
=
\frac{\delta}{2p_1}
>0
$$

だけ増やした

$$
y=x^*+\varepsilon e_1
$$

を考えます。

このとき

$$
p\cdot y
=
p\cdot x^*
+
p_1\varepsilon
=
p\cdot x^*+\frac{\delta}{2}
<
m.
$$

従って $y$ も予算集合に入ります。

しかも

$$
y\ge x^*,
\qquad
y\ne x^*.
$$

狭義単調性から

$$
y\succ x^*.
$$

これは $x^*$ が最適であることに反します。

従って

$$
p\cdot x^*=m.
$$
<!-- proof-end -->

---

## 6. 価格と所得を同じ倍率で変えても買える集合は変わらない

<a id="prop-micro2-demand-homogeneity"></a>

<!-- formal-statement-start -->
> **命題（Marshall 需要の0次同次性）**  
> 任意の $t>0$ に対して
>
$$
B(tp,tm)=B(p,m)
$$
>
> が成り立つ。
>
> 従って任意の効用関数 $u$ について
>
$$
D(tp,tm)=D(p,m)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in\mathbb R_+^L$ に対して

$$
x\in B(tp,tm)
$$

であることは

$$
(tp)\cdot x\le tm
$$

と同値です。

$t>0$ で両辺を割れば

$$
p\cdot x\le m.
$$

従って

$$
B(tp,tm)=B(p,m).
$$

最大化する集合が同じで効用関数も同じなので、最大化点集合も同じです。

したがって

$$
D(tp,tm)=D(p,m).
$$
<!-- proof-end -->

これは「価格だけを2倍」にする話ではありません。

価格と所得を同じ通貨単位で同時に2倍しても、実質的な購買可能集合は変わらないという主張です。

---

## 7. 内点解と端点解を区別する

<a id="def-micro2-interior-corner"></a>

<!-- formal-statement-start -->
> **定義（内点解・端点解）**  
> 消費者問題の最適解 $x^*\in\mathbb R_+^L$ が
>
$$
x_i^*>0
\qquad(i=1,\dots,L)
$$
>
> を満たすとき **内点解** という。
>
> 少なくとも一つの財について
>
$$
x_i^*=0
$$
>
> となるとき **端点解** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro2-interior-corner -->
**定義の確認**：同じ予算線でも最適点の位置は変わる

$$
p=(1,1),
\qquad
m=4
$$

とします。

効用

$$
u(x)=x_1x_2
$$

なら最適点は

$$
(2,2)
$$

で、両成分が正なので内点解です。

一方

$$
v(x)=2x_1+x_2
$$

なら第1財の効用増加が価格当たりで大きいため、最適点は

$$
(4,0)
$$

となり端点解です。
<!-- definition-example-end -->

内点解だけを想定して

$$
\frac{\partial u/\partial x_1}{p_1}
=
\frac{\partial u/\partial x_2}{p_2}
$$

と機械的に置くと、線形効用のような端点解を落とします。

この区別を正しく扱うのが KKT 条件です。

---

## 8. 消費者問題を OPT5 の KKT 条件へ翻訳する

ここでは

- $p\in\mathbb R_{++}^L$
- $m>0$
- $u$ は予算集合を含む開集合上で微分可能
- $u$ は凹関数

とします。

最大化問題を

$$
\min_x -u(x)
$$

へ変えれば、目的関数 $-u$ は凸です。

制約は

$$
p\cdot x-m\le0
$$

と

$$
-x_i\le0
\qquad(i=1,\dots,L)
$$

です。

<a id="thm-micro2-consumer-kkt"></a>

<!-- formal-statement-start -->
> **定理（消費者問題の KKT 条件）**  
> $p\in\mathbb R_{++}^L$、$m>0$ とし、$u$ が予算集合を含む開集合上の微分可能な凹関数であるとする。
>
> このとき $x^*\in B(p,m)$ が効用最大化点であることと、ある
>
$$
\lambda\ge0,
\qquad
\mu_i\ge0
\quad(i=1,\dots,L)
$$
>
> が存在して
>
$$
\nabla u(x^*)
=
\lambda p-\mu,
$$
>
$$
\lambda\{p\cdot x^*-m\}=0,
$$
>
$$
\mu_i x_i^*=0
\qquad(i=1,\dots,L)
$$
>
> を満たすことは同値である。
<!-- formal-statement-end -->

### なぜ OPT5 を使えるか

$-u$ は凸です。

また制約関数

$$
p\cdot x-m,
\qquad
-x_i
$$

はすべてアフィンなので凸です。

さらに

$$
0<\varepsilon<\frac{m}{\sum_i p_i}
$$

を取り

$$
\bar x=\varepsilon(1,\dots,1)
$$

と置けば

$$
p\cdot\bar x<m,
\qquad
-\bar x_i<0.
$$

従って Slater 条件を満たします。

よって [OPT5 の凸問題の KKT 条件](../OPT5/index.md#thm-opt5-kkt)を適用できます。

<!-- proof-start -->
### 証明

最小化問題

$$
\min_x -u(x)
$$

に対し、予算制約の乗数を $\lambda\ge0$、非負制約 $-x_i\le0$ の乗数を $\mu_i\ge0$ とします。

OPT5 の停留条件は

$$
-\nabla u(x^*)
+
\lambda p
-
\mu
=
0.
$$

従って

$$
\nabla u(x^*)
=
\lambda p-\mu.
$$

相補性は

$$
\lambda\{p\cdot x^*-m\}=0
$$

および

$$
\mu_i(-x_i^*)=0.
$$

後者は

$$
\mu_i x_i^*=0
$$

と同値です。

主実行可能性・双対実行可能性も含め、これが消費者問題の KKT 条件です。

Slater 条件を確認済みなので、OPT5 の定理から最適性との同値性が従います。
<!-- proof-end -->

---

## 9. KKT は「価格当たり限界効用」をそろえる

KKT の停留条件を成分ごとに書くと

$$
\frac{\partial u}{\partial x_i}(x^*)
=
\lambda p_i-\mu_i.
$$

もし

$$
x_i^*>0
$$

なら相補性より

$$
\mu_i=0.
$$

従って

$$
\frac{1}{p_i}
\frac{\partial u}{\partial x_i}(x^*)
=
\lambda.
$$

一方

$$
x_i^*=0
$$

なら $\mu_i\ge0$ なので

$$
\frac{\partial u}{\partial x_i}(x^*)
\le
\lambda p_i.
$$

すなわち

$$
\frac{1}{p_i}
\frac{\partial u}{\partial x_i}(x^*)
\le
\lambda.
$$

まとめると

$$
\boxed{
x_i^*>0
\Rightarrow
\frac{\partial_i u(x^*)}{p_i}=\lambda
}
$$

であり、買わない財では

$$
\boxed{
x_i^*=0
\Rightarrow
\frac{\partial_i u(x^*)}{p_i}\le\lambda
}
$$

です。

「買っている財は価格当たり限界効用が等しい」という有名な条件は、端点制約まで含めた KKT 条件の内点部分です。

---

## 10. 限界代替率は無差別曲線の傾きを表す

<a id="def-micro2-mrs"></a>

<!-- formal-statement-start -->
> **定義（限界代替率）**  
> 二財効用関数 $u(x_1,x_2)$ が微分可能で
>
$$
\frac{\partial u}{\partial x_2}(x)>0
$$
>
> を満たす点 $x$ で、
>
$$
\operatorname{MRS}_{12}(x)
=
\frac{\partial u/\partial x_1}{\partial u/\partial x_2}(x)
$$
>
> を、第1財を第2財で測った **限界代替率** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro2-mrs -->
**定義の確認**：Cobb--Douglas 型効用

$$
u(x)=x_1^{1/2}x_2^{1/2}
$$

では正の領域で

$$
\frac{\partial u}{\partial x_1}
=
\frac12x_1^{-1/2}x_2^{1/2},
$$

$$
\frac{\partial u}{\partial x_2}
=
\frac12x_1^{1/2}x_2^{-1/2}.
$$

従って

$$
\operatorname{MRS}_{12}(x)
=
\frac{x_2}{x_1}.
$$
<!-- definition-example-end -->

無差別曲線

$$
u(x_1,x_2)=c
$$

に沿って微分すると

$$
\frac{\partial u}{\partial x_1}dx_1
+
\frac{\partial u}{\partial x_2}dx_2
=
0.
$$

従って

$$
\frac{dx_2}{dx_1}
=
-
\frac{\partial u/\partial x_1}
{\partial u/\partial x_2}
=
-\operatorname{MRS}_{12}.
$$

限界代替率は無差別曲線の傾きの絶対値です。

---

## 11. 内点最適解では限界代替率が価格比に一致する

<a id="cor-micro2-mrs-price"></a>

<!-- formal-statement-start -->
> **系（内点解における限界代替率と価格比）**  
> [消費者問題の KKT 条件](#thm-micro2-consumer-kkt)の仮定のもとで、二財の最適解 $x^*$ が内点解であり、
>
$$
\frac{\partial u}{\partial x_1}(x^*)>0,
\qquad
\frac{\partial u}{\partial x_2}(x^*)>0
$$
>
> とする。
>
> このとき
>
$$
\boxed{
\operatorname{MRS}_{12}(x^*)
=
\frac{p_1}{p_2}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

内点解なので

$$
x_1^*>0,
\qquad
x_2^*>0.
$$

相補性から

$$
\mu_1=\mu_2=0.
$$

KKT の停留条件より

$$
\frac{\partial u}{\partial x_1}(x^*)
=
\lambda p_1,
$$

$$
\frac{\partial u}{\partial x_2}(x^*)
=
\lambda p_2.
$$

両偏微分が正なので $\lambda>0$ です。

二式を割ると

$$
\frac{
\partial u/\partial x_1
}{
\partial u/\partial x_2
}(x^*)
=
\frac{p_1}{p_2}.
$$

左辺は限界代替率なので結論を得ます。
<!-- proof-end -->

幾何学的には、

- 無差別曲線の傾きが $-\operatorname{MRS}_{12}$
- 予算線の傾きが $-p_1/p_2$

なので、内点接点では二つの傾きが一致します。

ただしこれは **内点解の結果** です。

端点解では接点条件ではなく KKT の不等式を見る必要があります。

---

## 12. 端点解：線形効用では全部を一方の財へ使う

$$
u(x)=a x_1+b x_2,
\qquad
a,b>0
$$

を考えます。

狭義単調なので予算を使い切り、

$$
p_1x_1+p_2x_2=m.
$$

第1財を1円分買うと効用は

$$
\frac{a}{p_1}
$$

だけ増え、第2財を1円分買うと

$$
\frac{b}{p_2}
$$

だけ増えます。

従って

$$
\frac{a}{p_1}
>
\frac{b}{p_2}
$$

なら

$$
\boxed{
x^*
=
\left(\frac{m}{p_1},0\right)
}
$$

です。

逆に

$$
\frac{a}{p_1}
<
\frac{b}{p_2}
$$

なら

$$
\boxed{
x^*
=
\left(0,\frac{m}{p_2}\right)
}
$$

です。

そして

$$
\frac{a}{p_1}
=
\frac{b}{p_2}
$$

なら、予算線上のすべての点が最適です。

この例では「限界代替率＝価格比」を先に等式として置くと、価格当たり効用が一致しない場合の端点解を見落とします。

---

## 13. Cobb--Douglas 型需要を KKT から導く

$$
0<\alpha<1,
$$

$$
u(x)
=
x_1^\alpha x_2^{1-\alpha},
\qquad
x\in\mathbb R_+^2
$$

を考えます。

$p_1,p_2,m>0$ とします。

境界では

$$
u(x_1,0)=u(0,x_2)=0.
$$

一方、十分小さい正の $x_1,x_2$ を取れば予算内で

$$
u(x_1,x_2)>0.
$$

従って最適解は内点です。

正の領域では狭義単調変換

$$
\log u(x)
=
\alpha\log x_1+(1-\alpha)\log x_2
$$

を最大化しても同じ最適点が得られます。

予算は使い切るので

$$
p_1x_1+p_2x_2=m.
$$

内点条件から

$$
\frac{\alpha/x_1}{(1-\alpha)/x_2}
=
\frac{p_1}{p_2}.
$$

従って

$$
\frac{\alpha x_2}{(1-\alpha)x_1}
=
\frac{p_1}{p_2}.
$$

整理すると

$$
p_1x_1
=
\frac{\alpha}{1-\alpha}p_2x_2.
$$

予算式と合わせれば

$$
\boxed{
x_1^*(p,m)
=
\frac{\alpha m}{p_1}
}
$$

および

$$
\boxed{
x_2^*(p,m)
=
\frac{(1-\alpha)m}{p_2}
}
$$

を得ます。

したがって支出額は

$$
p_1x_1^*=\alpha m,
$$

$$
p_2x_2^*=(1-\alpha)m.
$$

Cobb--Douglas 型では、所得の一定割合を各財へ配分する形になります。

---

## 14. CES 型需要では価格比が消費比を連続的に動かす

本章では

$$
0<\rho<1,
\qquad
0<\alpha<1
$$

に限定して

$$
u_\rho(x)
=
\left[
\alpha x_1^\rho
+
(1-\alpha)x_2^\rho
\right]^{1/\rho}
$$

を考えます。

外側の写像

$$
t\mapsto t^{1/\rho}
$$

は狭義単調増加なので、同じ最適点は

$$
\alpha x_1^\rho+(1-\alpha)x_2^\rho
$$

を最大化して求められます。

この関数は正の領域で狭義凹です。

内点の一階条件は

$$
\alpha\rho x_1^{\rho-1}
=
\lambda p_1,
$$

$$
(1-\alpha)\rho x_2^{\rho-1}
=
\lambda p_2.
$$

二式を割ると

$$
\frac{\alpha}{1-\alpha}
\left(\frac{x_1}{x_2}\right)^{\rho-1}
=
\frac{p_1}{p_2}.
$$

従って

$$
\left(\frac{x_1}{x_2}\right)^{1-\rho}
=
\frac{\alpha p_2}{(1-\alpha)p_1}.
$$

ここで

$$
\sigma
=
\frac{1}{1-\rho}
$$

と置くと

$$
\boxed{
\frac{x_1}{x_2}
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^\sigma
}
$$

です。

さらに

$$
r
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^\sigma
$$

と置けば

$$
x_1=rx_2.
$$

予算式

$$
p_1x_1+p_2x_2=m
$$

へ代入して

$$
x_2^*
=
\frac{m}{p_1r+p_2},
$$

$$
x_1^*
=
\frac{rm}{p_1r+p_2}.
$$

よって

$$
\boxed{
x_1^*
=
\frac{rm}{p_1r+p_2},
\qquad
x_2^*
=
\frac{m}{p_1r+p_2}
}
$$

です。

CES 型では価格比の変化が

$$
r
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^\sigma
$$

を通じて消費比へ入ります。

---

## 15. KKT が十分条件になるには凹性が重要

KKT 条件は「微分すれば必ず最適」と言っているわけではありません。

例えば一財で

$$
u(x)
=
\left(x-\frac12\right)^2,
$$

$$
0\le x\le1
$$

を考えます。

点

$$
x^*=\frac12
$$

は内点なので端点乗数は0にできます。

さらに

$$
u'(x^*)=0.
$$

従って停留条件だけなら満たします。

しかし

$$
u\left(\frac12\right)=0,
$$

$$
u(0)=u(1)=\frac14.
$$

したがって $x^*=1/2$ は最大点ではなく最小点です。

壊れた仮定は効用の凹性です。

消費者問題を凸最適化として扱うときは、

$$
-u
$$

が凸、すなわち $u$ が凹であることが KKT 十分性を支えています。

MICRO1 の凸選好は「準凹な効用表現を持つ」という性質であり、効用関数そのものが必ず凹であることとは別です。

---

## 16. 無料の財があると存在証明の機構が壊れる

価格正値性も単なる慣習ではありません。

一財で

$$
p=0,
\qquad
m=1,
\qquad
u(x)=x
$$

とします。

すると

$$
px=0\le1
$$

なので、任意の

$$
x\ge0
$$

が予算内です。

予算集合は

$$
[0,\infty)
$$

となり有界ではありません。

しかも

$$
u(x)=x
$$

はいくらでも大きくなるので最大点は存在しません。

つまり

$$
\boxed{
p_i>0
\Rightarrow
x_i\le m/p_i
}
$$

という有界化が失われると、Weierstrass による存在証明も使えなくなります。

---

## 17. 次章への接続：消費者問題にも双対問題がある

本章では

$$
(p,m)
\longmapsto
D(p,m)
$$

という「価格と所得から最適消費を求める」方向を扱いました。

次章では、この問題から

- 間接効用
- 支出関数
- Hicks 需要
- 支出最小化
- Slutsky 分解

へ進みます。

そこで同じ選好を

$$
\text{効用最大化}
$$

と

$$
\text{所定効用を達成する支出最小化}
$$

の二方向から読みます。

---

# 演習

## Level A

<a id="ex-micro2-a01"></a>

### MICRO2-A01 予算集合を計算する

- Level: A
- 目安時間: 12分

$$
p=(2,3),
\qquad
m=12
$$

とする。

1. 予算集合を不等式で書け。
2. 各財の最大購入量を求めよ。
3. $(3,2)$ と $(2,3)$ が予算内か判定せよ。
4. $p,m$ を同時に5倍しても予算集合が変わらないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

1.

$$
B(p,m)
=
\{(x_1,x_2)\in\mathbb R_+^2:
2x_1+3x_2\le12\}.
$$

2. 第1財だけ買うなら

$$
2x_1\le12
$$

なので

$$
x_1\le6.
$$

第2財だけなら

$$
3x_2\le12
$$

なので

$$
x_2\le4.
$$

3. $(3,2)$ では

$$
2\cdot3+3\cdot2=12,
$$

なので予算内です。

$(2,3)$ では

$$
2\cdot2+3\cdot3=13>12,
$$

なので予算外です。

4. 5倍後は

$$
10x_1+15x_2\le60.
$$

両辺を5で割れば

$$
2x_1+3x_2\le12
$$

へ戻ります。

従って予算集合は同じです。
<!-- solution-end -->

<a id="ex-micro2-a02"></a>

### MICRO2-A02 線形効用の端点需要

- Level: A
- 目安時間: 15分

$$
u(x)=3x_1+2x_2,
\qquad
m=12
$$

とする。

1. $p=(2,2)$ のとき最適消費を求めよ。
2. $p=(3,1)$ のとき最適消費を求めよ。
3. 価格当たり限界効用を使って理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $p=(2,2)$ では

$$
\frac{3}{2}
>
\frac{2}{2}
=
1.
$$

第1財の価格当たり効用の方が大きいので、所得をすべて第1財へ使います。

$$
x_1=\frac{12}{2}=6,
\qquad
x_2=0.
$$

従って

$$
\boxed{x^*=(6,0)}.
$$

2. $p=(3,1)$ では

$$
\frac{3}{3}=1,
$$

$$
\frac{2}{1}=2.
$$

今度は第2財の方が大きいので

$$
x_1=0,
\qquad
x_2=\frac{12}{1}=12.
$$

従って

$$
\boxed{x^*=(0,12)}.
$$

3. 線形効用では限界効用が一定です。

1円をどちらへ使うと効用が大きく増えるかは

$$
\frac{3}{p_1},
\qquad
\frac{2}{p_2}
$$

を比較すれば分かります。

等しくなければ、低い方の財を正に買う理由がありません。
<!-- solution-end -->

<a id="ex-micro2-a03"></a>

### MICRO2-A03 Cobb--Douglas 型需要を求める

- Level: A
- 目安時間: 18分

$$
u(x)=x_1^{1/3}x_2^{2/3},
$$

$$
p=(2,4),
\qquad
m=24
$$

とする。

需要を求め、支出額も確認せよ。

<!-- solution-start -->
#### 詳細解答

Cobb--Douglas 型需要

$$
x_1^*
=
\frac{\alpha m}{p_1},
\qquad
x_2^*
=
\frac{(1-\alpha)m}{p_2}
$$

に

$$
\alpha=\frac13
$$

を入れます。

従って

$$
x_1^*
=
\frac{(1/3)\cdot24}{2}
=
4,
$$

$$
x_2^*
=
\frac{(2/3)\cdot24}{4}
=
4.
$$

よって

$$
\boxed{x^*=(4,4)}.
$$

支出額は

$$
p_1x_1^*
=
2\cdot4
=
8
=
\frac13\cdot24,
$$

$$
p_2x_2^*
=
4\cdot4
=
16
=
\frac23\cdot24.
$$

合計は

$$
8+16=24
$$

で所得を使い切っています。
<!-- solution-end -->

<a id="ex-micro2-a04"></a>

### MICRO2-A04 限界代替率と価格比を確認する

- Level: A
- 目安時間: 15分

$$
u(x)=x_1^{1/2}x_2^{1/2},
$$

$$
p=(1,4),
\qquad
m=8
$$

とする。

1. 最適消費を求めよ。
2. 最適点で限界代替率を計算せよ。
3. 価格比と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

1. $\alpha=1/2$ の Cobb--Douglas 型なので

$$
x_1^*
=
\frac{(1/2)\cdot8}{1}
=
4,
$$

$$
x_2^*
=
\frac{(1/2)\cdot8}{4}
=
1.
$$

従って

$$
\boxed{x^*=(4,1)}.
$$

2. この効用では

$$
\operatorname{MRS}_{12}(x)
=
\frac{x_2}{x_1}.
$$

したがって

$$
\operatorname{MRS}_{12}(4,1)
=
\frac14.
$$

3. 価格比は

$$
\frac{p_1}{p_2}
=
\frac14.
$$

よって

$$
\boxed{
\operatorname{MRS}_{12}(x^*)
=
\frac{p_1}{p_2}
}
$$

を確認できました。
<!-- solution-end -->

---

## Level B

<a id="ex-micro2-b01"></a>

### MICRO2-B01 需要の存在と0次同次性を証明する

- Level: B
- 目安時間: 25分

$p\in\mathbb R_{++}^L$、$m\ge0$ とし、$u:\mathbb R_+^L\to\mathbb R$ は連続とする。

1. $B(p,m)$ がコンパクトであることを示せ。
2. $D(p,m)$ が空でないことを示せ。
3. 任意の $t>0$ に対し
   $$
   D(tp,tm)=D(p,m)
   $$
   を示せ。

<!-- solution-start -->
#### 詳細解答

1. $x\in B(p,m)$ なら

$$
0\le x_i\le\frac{m}{p_i}
$$

です。

従って予算集合は有界です。

また

$$
B(p,m)
=
\mathbb R_+^L
\cap
\{x:p\cdot x\le m\}
$$

は閉集合どうしの共通部分なので閉です。

有限次元 Euclid 空間では閉かつ有界なのでコンパクトです。

2. $B(p,m)$ は非空コンパクトで、$u$ は連続です。

Weierstrass の最大最小定理により $u$ は $B(p,m)$ 上で最大値を取ります。

従って

$$
D(p,m)\ne\varnothing.
$$

3.

$$
(tp)\cdot x\le tm
$$

は $t>0$ で割ると

$$
p\cdot x\le m
$$

と同値です。

従って

$$
B(tp,tm)=B(p,m).
$$

最大化する集合が同じなので

$$
\boxed{
D(tp,tm)=D(p,m).
}
$$
<!-- solution-end -->

<a id="ex-micro2-b02"></a>

### MICRO2-B02 KKT から端点条件を読む

- Level: B
- 目安時間: 25分

二財の凹で微分可能な効用 $u$ を考え、$x^*$ が最適解であるとする。

KKT 条件を用いて次を示せ。

1. $x_1^*>0$ なら
   $$
   \frac{\partial_1u(x^*)}{p_1}=\lambda.
   $$
2. $x_2^*=0$ なら
   $$
   \frac{\partial_2u(x^*)}{p_2}\le\lambda.
   $$
3. これらが端点解の判定にどう使われるか説明せよ。

<!-- solution-start -->
#### 詳細解答

消費者問題の KKT 停留条件は

$$
\nabla u(x^*)
=
\lambda p-\mu
$$

です。

従って成分ごとに

$$
\partial_i u(x^*)
=
\lambda p_i-\mu_i.
$$

1. $x_1^*>0$ なら相補性

$$
\mu_1x_1^*=0
$$

から

$$
\mu_1=0.
$$

よって

$$
\partial_1u(x^*)=\lambda p_1.
$$

$p_1>0$ で割れば

$$
\boxed{
\frac{\partial_1u(x^*)}{p_1}=\lambda.
}
$$

2. $x_2^*=0$ のときは $\mu_2$ が正でも構いません。

$\mu_2\ge0$ なので

$$
\partial_2u(x^*)
=
\lambda p_2-\mu_2
\le
\lambda p_2.
$$

従って

$$
\boxed{
\frac{\partial_2u(x^*)}{p_2}\le\lambda.
}
$$

3. 正に買っている財では価格当たり限界効用が共通値 $\lambda$ に一致します。

一方、買っていない財では、その点から少量買い始めたときの価格当たり限界効用が $\lambda$ 以下です。

したがって、その財へ支出を移しても一次的には改善しないことを表しています。
<!-- solution-end -->

<a id="ex-micro2-b03"></a>

### MICRO2-B03 CES 型需要を導く

- Level: B
- 目安時間: 30分

$$
u(x)
=
\left[
\alpha x_1^\rho
+
(1-\alpha)x_2^\rho
\right]^{1/\rho},
$$

$$
0<\alpha<1,
\qquad
0<\rho<1
$$

とする。

$p_1,p_2,m>0$ のもとで、内点の最適消費について

$$
\frac{x_1}{x_2}
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^{1/(1-\rho)}
$$

を導き、需要を求めよ。

<!-- solution-start -->
#### 詳細解答

外側の $1/\rho$ 乗は狭義単調増加なので

$$
F(x)
=
\alpha x_1^\rho
+
(1-\alpha)x_2^\rho
$$

を最大化すれば十分です。

内点一階条件は

$$
\alpha\rho x_1^{\rho-1}
=
\lambda p_1,
$$

$$
(1-\alpha)\rho x_2^{\rho-1}
=
\lambda p_2.
$$

二式を割ると

$$
\frac{\alpha}{1-\alpha}
\left(\frac{x_1}{x_2}\right)^{\rho-1}
=
\frac{p_1}{p_2}.
$$

従って

$$
\left(\frac{x_1}{x_2}\right)^{1-\rho}
=
\frac{\alpha p_2}{(1-\alpha)p_1}.
$$

よって

$$
\boxed{
\frac{x_1}{x_2}
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^{1/(1-\rho)}.
}
$$

ここで

$$
r
=
\left[
\frac{\alpha p_2}{(1-\alpha)p_1}
\right]^{1/(1-\rho)}
$$

と置きます。

すると

$$
x_1=rx_2.
$$

狭義単調性から予算を使い切るので

$$
p_1rx_2+p_2x_2=m.
$$

従って

$$
x_2^*
=
\frac{m}{p_1r+p_2},
$$

$$
x_1^*
=
r x_2^*
=
\frac{rm}{p_1r+p_2}.
$$

したがって

$$
\boxed{
x_1^*
=
\frac{rm}{p_1r+p_2},
\qquad
x_2^*
=
\frac{m}{p_1r+p_2}.
}
$$
<!-- solution-end -->

---

## Level C

<a id="ex-micro2-c01"></a>

### MICRO2-C01 所得が増えると端点解から内点解へ移る

- Level: C
- 目安時間: 35分

$$
u(x)
=
\log(1+x_1)+\log(1+x_2),
$$

$$
p=(1,2),
\qquad
m>0
$$

とする。

1. 効用が凹であることを確認せよ。
2. 最適解では予算を使い切ることを示せ。
3. 内点解を仮定して KKT 条件から候補を求めよ。
4. その候補が内点になる所得条件を求めよ。
5. 残る所得範囲では端点解を KKT 不等式から求めよ。
6. 最終的な Marshall 需要を $m$ の関数としてまとめよ。

<!-- solution-start -->
#### 詳細解答

1. 各成分について

$$
\frac{d^2}{dx_i^2}\log(1+x_i)
=
-\frac{1}{(1+x_i)^2}
<0.
$$

Hessian は

$$
\nabla^2u(x)
=
\begin{pmatrix}
-\dfrac{1}{(1+x_1)^2}&0\\
0&-\dfrac{1}{(1+x_2)^2}
\end{pmatrix}
$$

で負定値です。

従って $u$ は狭義凹です。

2. 各偏微分は

$$
\frac{\partial u}{\partial x_i}
=
\frac{1}{1+x_i}
>0.
$$

従って選好は狭義単調であり、

$$
x_1+2x_2=m
$$

が最適点で成り立ちます。

3. 内点なら非負制約の乗数は0です。

KKT 停留条件は

$$
\frac{1}{1+x_1}
=
\lambda,
$$

$$
\frac{1}{1+x_2}
=
2\lambda.
$$

従って

$$
1+x_1
=
2(1+x_2).
$$

すなわち

$$
x_1
=
1+2x_2.
$$

予算式

$$
x_1+2x_2=m
$$

へ代入すると

$$
1+4x_2=m.
$$

よって

$$
x_2
=
\frac{m-1}{4},
$$

$$
x_1
=
1+2\frac{m-1}{4}
=
\frac{m+1}{2}.
$$

内点候補は

$$
\left(
\frac{m+1}{2},
\frac{m-1}{4}
\right)
$$

です。

4. 第1成分は $m>0$ なら正です。

第2成分が正である条件は

$$
m>1.
$$

従って

$$
m>1
$$

では内点解です。

5. $0<m\le1$ では第2財を0とする端点を調べます。

予算を使い切るので

$$
x_1=m,
\qquad
x_2=0.
$$

第1財は正なので

$$
\lambda
=
\frac{1}{1+m}.
$$

第2財を買わないための KKT 条件は

$$
\frac{\partial_2u}{p_2}
\le
\lambda.
$$

左辺は

$$
\frac{1}{2}.
$$

従って

$$
\frac12
\le
\frac{1}{1+m}.
$$

これは

$$
m\le1
$$

と同値です。

まさに現在の所得範囲と一致します。

よって

$$
0<m\le1
$$

では

$$
\boxed{
x^*=(m,0).
}
$$

6. 以上より Marshall 需要は

$$
\boxed{
x^*(m)
=
\begin{cases}
(m,0),
&0<m\le1,\\[4pt]
\left(
\dfrac{m+1}{2},
\dfrac{m-1}{4}
\right),
&m>1.
\end{cases}
}
$$

です。

$m=1$ では二つの式がともに

$$
(1,0)
$$

を与えるので連続につながります。

この例では所得が低い間は第2財を買わない端点解で、所得が閾値を超えると内点解へ移ります。

KKT の非負制約乗数が、この切り替え条件を正確に表しています。
<!-- solution-end -->

---

## まとめ

本章では、選好から実際の需要を導く最初の段階を閉じました。

- 正の価格 $p\in\mathbb R_{++}^L$ のもとで
  $$
  B(p,m)=\{x\ge0:p\cdot x\le m\}
  $$
  は非空・凸・コンパクトになる。
- 連続効用なら Marshall 需要は必ず存在する。
- 狭義単調な選好では予算を使い切る。
- 価格と所得を同率で変えても予算集合は変わらず、需要は0次同次である。
- 凹で微分可能な効用では、消費者問題を OPT5 の KKT 条件へ落とせる。
- 正に買う財では
  $$
  \frac{\partial_i u}{p_i}=\lambda
  $$
  となり、買わない財では
  $$
  \frac{\partial_i u}{p_i}\le\lambda
  $$
  となる。
- 二財の内点解では
  $$
  \operatorname{MRS}_{12}=\frac{p_1}{p_2}
  $$
  が KKT の結果として得られる。
- Cobb--Douglas 型では所得の一定割合を各財へ配分する需要が得られる。
- CES 型では価格比が消費比を連続的に動かす。
- 凹性を失うと KKT の停留条件だけでは最大化を保証できない。
- 価格正値性を失うと予算集合の有界性が壊れ、需要が存在しないことがある。

次章では、同じ選好を支出最小化側から見直し、間接効用・支出関数・Hicks 需要・Slutsky 分解へ進みます。
