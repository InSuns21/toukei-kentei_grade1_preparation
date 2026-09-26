# MICRO4 生産者理論

<!-- definition-example-audit: strict -->

MICRO1--MICRO3 では、家計が「限られた予算で何を買うか」を考えました。今度は市場の反対側にいる企業を見ます。

企業は、何もないところから商品を作るわけではありません。小麦粉、電力、労働時間、機械の稼働時間などを使い、パンや部品、サービスなどの産出物へ変えます。

例えば、ある小さな工房が

- 原材料を 5 単位使い
- 製品を 2 単位作る

とします。

原材料も製品も同じ「財の一覧」の中に並べ、**企業が市場へ出す量を正、企業が市場から受け取る量を負**と約束すると、この生産活動は

$$
y=(-5,2)
$$

と一つのベクトルで表せます。

原材料価格が 100、製品価格が 500 なら、

$$
(100,500)\cdot(-5,2)
=
-500+1000
=
500
$$

です。負の成分は投入費用、正の成分は売上として働き、内積がそのまま利潤になります。

本章では、この見方から

$$
\boxed{
\text{技術として可能な生産}
\longrightarrow
\text{価格のもとでの利潤最大化}
\longrightarrow
\text{所定産出量の費用最小化}
}
$$

を組み立てます。

最後には、凸な生産技術の境界を支える超平面の法線が、企業の選択を支える **非負の価格ベクトル**として読めることを示します。これは次の MICRO5 で、パレート 効率な配分から価格を取り出す議論の原型になります。

---

## 1. 生産を「投入は負、産出は正」のベクトルで表す

財が $L$ 種類あるとします。

企業の生産活動を

$$
y=(y_1,\dots,y_L)\in\mathbb R^L
$$

で表し、

- $y_\ell>0$：財 $\ell$ を市場へ純供給する
- $y_\ell<0$：財 $\ell$ を市場から純投入する
- $y_\ell=0$：その財を純粋には出し入れしない

と読みます。

このようにすると、原材料と製品を別々の記号へ分けなくても、複数投入・複数産出を一つの幾何学的対象として扱えます。

<a id="def-micro4-production-set"></a>

<!-- formal-statement-start -->
> **定義（生産集合）**  
> 財が $L$ 種類あるとき、技術的に実行可能な純産出ベクトル全体
>
$$
Y\subset\mathbb R^L
$$
>
> を **生産集合（production set）** という。$y\in Y$ を生産可能な純産出ベクトルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro4-production-set -->
**定義の確認**：一投入・一産出の技術を純産出ベクトルへ直す

投入量を $z\ge0$、産出量を $q\ge0$ とし、

$$
q\le f(z)
$$

を満たすとき生産可能だとします。

財1を投入財、財2を産出財とすれば、

$$
y=(-z,q)
$$

です。

したがって、この技術は例えば

$$
Y
=
\{
(-z,q)\in\mathbb R^2:
z\ge0,\ 0\le q\le f(z)
\}
$$

と表せます。

点 $(-4,3)$ は「投入財を4単位使い、産出財を3単位作る」という意味で、単なる抽象的な二次元座標ではありません。
<!-- definition-example-end -->

生産集合には、モデルに応じていくつかの性質を仮定します。

例えば

$$
0\in Y
$$

は「何も投入せず何も産出しない」という休業が可能であることを表します。

また、既に可能な生産から財を捨てても技術的には可能だと考えるなら、次の性質を置きます。

<a id="def-micro4-free-disposal"></a>

<!-- formal-statement-start -->
> **定義（自由処分性）**  
> 生産集合 $Y\subset\mathbb R^L$ が
>
$$
Y-\mathbb R_+^L
\subset Y
$$
>
> を満たすとき、$Y$ は **自由処分性（free disposal）**を持つという。
<!-- formal-statement-end -->

ここで $y-r$、$r\in\mathbb R_+^L$ は、もとの生産計画 $y$ から各財をさらに捨てる、または余分に投入する方向への移動です。

<!-- definition-example-start: def-micro4-free-disposal -->
**定義の確認**：可能な計画から製品を捨てても可能

$y=(-4,3)$ が可能で、完成品を1単位廃棄してもよいなら

$$
(-4,2)
=
(-4,3)-(0,1)
$$

も可能です。

さらに原材料を1単位余計に使って同じ2単位しか作らない計画

$$
(-5,2)
=
(-4,3)-(1,1)
$$

も技術的には可能です。

自由処分性は「企業が実際にそうするのが合理的」という意味ではありません。**技術的に可能な集合が下方向へ閉じている**という仮定です。
<!-- definition-example-end -->

---

## 2. 価格ベクトルとの内積が売上から投入費用を引いた利潤になる

各財の市場価格を

$$
p=(p_1,\dots,p_L)\in\mathbb R_+^L
$$

とします。

$p_\ell$ は財 $\ell$ の1単位あたり価格です。

純産出 $y$ に対して

$$
p\cdot y
=
\sum_{\ell=1}^L p_\ell y_\ell
$$

を計算すると、

- 産出財の正の成分は売上を足す
- 投入財の負の成分は費用を引く

ので、これが企業の利潤になります。

先ほどの

$$
y=(-5,2),
\qquad
p=(100,500)
$$

なら

$$
p\cdot y=500
$$

でした。

企業が価格を所与として受け入れるとき、選ぶのは $Y$ の中で $p\cdot y$ が最大になる生産計画です。

<a id="def-micro4-profit-function"></a>

<!-- formal-statement-start -->
> **定義（利潤関数・供給集合）**  
> 生産集合 $Y\subset\mathbb R^L$ と価格 $p\in\mathbb R_+^L$ に対して
>
$$
\pi(p)
=
\sup_{y\in Y}p\cdot y
$$
>
> を **利潤関数（profit function）**という。また
>
$$
S(p)
=
\operatorname*{arg\,max}_{y\in Y}p\cdot y
$$
>
> を **利潤最大化供給集合**という。最大化点が一意なら、その唯一の点を $y(p)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro4-profit-function -->
**定義の確認**：三つの生産計画から選ぶ

$$
Y_0=\{(0,0),\,(-2,1),\,(-5,3)\}
$$

だけを候補とし、価格を

$$
p=(100,300)
$$

とします。

それぞれの利潤は

$$
0,
\qquad
-200+300=100,
\qquad
-500+900=400
$$

です。

したがって

$$
\pi(p)=400,
\qquad
S(p)=\{(-5,3)\}.
$$

価格が変われば、同じ技術 $Y_0$ でも最適な生産計画は変わり得ます。利潤関数は「技術そのもの」ではなく、**技術を価格方向から見た最適値**です。
<!-- definition-example-end -->

---

## 3. 利潤最大化点はいつ存在するか

利潤関数は supremum で定義したので、一般には最大値を取るとは限りません。

まず、有限次元で最も分かりやすい十分条件を確認します。

<a id="thm-micro4-profit-existence"></a>

<!-- formal-statement-start -->
> **定理（コンパクトな生産集合での利潤最大化点の存在）**  
> $Y\subset\mathbb R^L$ が非空コンパクト集合なら、任意の価格 $p\in\mathbb R^L$ に対して
>
$$
S(p)\ne\varnothing
$$
>
> であり、
>
$$
\pi(p)=\max_{y\in Y}p\cdot y
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

写像

$$
y\longmapsto p\cdot y
$$

は $y$ の連続関数です。

$Y$ は非空コンパクトなので、[Weierstrassの最大最小定理](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md#thm-f0-00c2-01)により、ある $y^*\in Y$ が存在して

$$
p\cdot y^*
=
\max_{y\in Y}p\cdot y
$$

となります。

従って $y^*\in S(p)$ です。$\square$
<!-- proof-end -->

ただし、自由処分性を持つ生産集合は通常、下方向へ無限に広がるためコンパクトではありません。

したがってこの定理は「企業理論では常に生産集合がコンパクト」という主張ではありません。一般のモデルでは、

- 技術的な上限
- 利潤を上げる方向への無限逃走がないこと
- 価格のもとで上位等高集合をコンパクトに切り取れること

などを使って存在を保証します。

本章では、存在そのものの一般論よりも、**最適解が存在するとき何が価格と技術を結び付けるか**を中心に見ます。

---

## 4. 利潤関数は価格について凸で1次同次になる

消費者の支出関数は価格について凹でした。

企業の利潤関数は逆に、価格について凸になります。

理由は

$$
\pi(p)=\sup_{y\in Y}p\cdot y
$$

が、$y$ ごとの線形関数 $p\mapsto p\cdot y$ の上限だからです。

<a id="prop-micro4-profit-properties"></a>

<!-- formal-statement-start -->
> **命題（利潤関数の価格に関する性質）**  
> 任意の生産集合 $Y\subset\mathbb R^L$ に対して、利潤関数
>
$$
\pi(p)=\sup_{y\in Y}p\cdot y
$$
>
> が有限値を取る価格上では、次が成り立つ。
>
> 1. $t>0$ に対して $\pi(tp)=t\pi(p)$。
> 2. $0\le\lambda\le1$ に対して
>
$$
\pi(\lambda p+(1-\lambda)q)
\le
\lambda\pi(p)+(1-\lambda)\pi(q).
$$
>
> 従って $\pi$ は価格について1次同次かつ凸である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $t>0$ に対して

$$
\pi(tp)
=
\sup_{y\in Y}(tp)\cdot y
=
t\sup_{y\in Y}p\cdot y
=
t\pi(p).
$$

次に $0\le\lambda\le1$ とすると、任意の $y\in Y$ について

$$
(\lambda p+(1-\lambda)q)\cdot y
=
\lambda p\cdot y+(1-\lambda)q\cdot y.
$$

各項は

$$
p\cdot y\le\pi(p),
\qquad
q\cdot y\le\pi(q)
$$

なので

$$
(\lambda p+(1-\lambda)q)\cdot y
\le
\lambda\pi(p)+(1-\lambda)\pi(q).
$$

左辺について $y\in Y$ の上限を取れば

$$
\pi(\lambda p+(1-\lambda)q)
\le
\lambda\pi(p)+(1-\lambda)\pi(q).
$$

よって凸性が従います。$\square$
<!-- proof-end -->

ここで重要なのは、**利潤関数は価格の各成分について単調増加とは限らない**ことです。

純産出ベクトルでは投入財の成分が負です。投入財価格だけが上がれば

$$
p\cdot y
$$

の負の項が大きくなり、利潤は下がり得ます。

この点は、すべての財価格上昇を同じ向きに扱えた消費者の支出関数との違いです。

---

## 5. 利潤関数を価格で微分すると最適な純産出が現れる

価格を少し動かしたとき、最適利潤がどれだけ動くかを考えます。

もし価格 $p$ のもとで最適生産 $y(p)$ が一意なら、価格方向の傾きからその生産量を読み戻せます。

<a id="thm-micro4-hotelling"></a>

<!-- formal-statement-start -->
> **定理（Hotelling 型関係）**  
> $p\in\mathbb R_{++}^L$ とし、利潤関数 $\pi$ が $p$ の開近傍で有限値を取り、$p$ で微分可能とする。
>
> さらに $p$ で利潤最大化点が存在し、$y^*\in S(p)$ とする。このとき
>
$$
\nabla\pi(p)=y^*.
$$
>
> 特に微分可能な点では、利潤最大化純産出は一意である。
<!-- formal-statement-end -->

### 証明の核心

任意の価格摂動 $h$ に対して、$y^*$ は新価格 $p+h$ でも選択可能です。

したがって

$$
\pi(p+h)
\ge
(p+h)\cdot y^*
=
\pi(p)+h\cdot y^*.
$$

つまり $y^*$ は凸関数 $\pi$ の支持傾きです。

微分可能なら支持傾きは勾配一つしかないので

$$
y^*=\nabla\pi(p)
$$

となります。

<!-- proof-start -->
### 証明

$y^*\in S(p)$ なので

$$
\pi(p)=p\cdot y^*.
$$

任意の十分小さい $h\in\mathbb R^L$ について

$$
\pi(p+h)
=
\sup_{y\in Y}(p+h)\cdot y
\ge
(p+h)\cdot y^*.
$$

従って

$$
\pi(p+h)-\pi(p)
\ge
h\cdot y^*.
$$

一方、$\pi$ は $p$ で微分可能だから

$$
\pi(p+h)-\pi(p)
=
\nabla\pi(p)\cdot h+o(\lVert h\rVert).
$$

よって

$$
(\nabla\pi(p)-y^*)\cdot h
\ge
-o(\lVert h\rVert).
$$

$h=t d$ と $h=-t d$ をそれぞれ代入して $t\downarrow0$ とすると、任意の方向 $d$ に対して

$$
(\nabla\pi(p)-y^*)\cdot d=0.
$$

したがって

$$
\nabla\pi(p)=y^*.
$$

もし二つの最大化点 $y^1,y^2$ があれば、同じ議論から両方が $\nabla\pi(p)$ に等しいので $y^1=y^2$ です。$\square$
<!-- proof-end -->

純産出ベクトルの成分が負なら、価格微分も負になります。

一投入・一産出で

$$
y=(-z,q),
\qquad
p=(w,r)
$$

なら

$$
\frac{\partial\pi}{\partial r}=q^*,
\qquad
\frac{\partial\pi}{\partial w}=-z^*.
$$

産出物価格が上がる効果は正の供給量、投入財価格が上がる効果は負の投入量として現れます。

---

## 6. 一投入・一産出へ戻すと、限界生産物の価値と投入価格が釣り合う

純産出ベクトルは一般理論に便利ですが、企業の現場感をつかむには

- 投入量 $z$
- 産出量 $q$
- 生産関数 $q=f(z)$

に戻すと分かりやすくなります。

投入が $n$ 種類なら

$$
z=(z_1,\dots,z_n)\in\mathbb R_+^n
$$

とし、$z_i$ は投入財 $i$ の使用量です。

産出物の単位価格を $r>0$、投入価格を

$$
w=(w_1,\dots,w_n)\in\mathbb R_{++}^n
$$

とします。

産出をすべて売るなら利潤は

$$
r f(z)-w\cdot z.
$$

純産出表示では

$$
y=(-z,f(z)),
\qquad
p=(w,r)
$$

として

$$
p\cdot y
=
-w\cdot z+r f(z)
$$

と同じ式になります。

<a id="thm-micro4-producer-kkt"></a>

<!-- formal-statement-start -->
> **定理（凹生産関数の利潤最大化条件）**  
> $f:\mathbb R_+^n\to\mathbb R$ を微分可能な凹関数、$r>0$、$w\in\mathbb R_{++}^n$ とする。
>
> 利潤最大化
>
$$
\max_{z\ge0}
\left\{
r f(z)-w\cdot z
\right\}
$$
>
> に最適解 $z^*$ が存在するとする。この問題は凸最小化問題
>
$$
\min_{z\ge0}
\left\{
w\cdot z-rf(z)
\right\}
$$
>
> と同値であり、[KKT 条件](../OPT5/index.md#thm-opt5-kkt)から、ある $\mu^*\in\mathbb R_+^n$ が存在して
>
$$
w-r\nabla f(z^*)-\mu^*=0,
$$
>
$$
\mu_i^*z_i^*=0
\qquad(i=1,\dots,n)
$$
>
> を満たす。
>
> 従って $z_i^*>0$ なら
>
$$
r\frac{\partial f}{\partial z_i}(z^*)=w_i,
$$
>
> $z_i^*=0$ なら
>
$$
r\frac{\partial f}{\partial z_i}(z^*)\le w_i.
$$
<!-- formal-statement-end -->

### 何を言っているか

投入 $i$ をほんの少し増やしたときの産出増分

$$
\frac{\partial f}{\partial z_i}
$$

を、その産出物の価格 $r$ で評価した

$$
r\frac{\partial f}{\partial z_i}
$$

は、投入1単位を追加することで得られる限界的な売上です。

投入を正に使っているなら、それが投入価格 $w_i$ と一致するところまで使います。

もし

$$
r\frac{\partial f}{\partial z_i}<w_i
$$

なら、追加投入に払う金額の方が大きいので、その投入を増やす理由がありません。端点 $z_i=0$ では等号でなく不等号になり得ます。

<!-- proof-start -->
### 証明

$f$ は凹なので

$$
g(z)=w\cdot z-rf(z)
$$

は凸です。

制約 $z_i\ge0$ は

$$
-z_i\le0
$$

と書けます。例えば $z=(1,\dots,1)$ はすべての不等式を厳密に満たすので Slater 条件が成立します。

したがって [KKT 条件](../OPT5/index.md#thm-opt5-kkt) は最適性の必要十分条件です。

Lagrangian を

$$
L(z,\mu)
=
w\cdot z-rf(z)-\mu\cdot z
$$

とすると停留条件は

$$
w-r\nabla f(z^*)-\mu^*=0.
$$

相補性は

$$
\mu_i^*z_i^*=0.
$$

もし $z_i^*>0$ なら $\mu_i^*=0$ なので

$$
r\frac{\partial f}{\partial z_i}(z^*)=w_i.
$$

一方 $z_i^*=0$ なら $\mu_i^*\ge0$ だから

$$
w_i-r\frac{\partial f}{\partial z_i}(z^*)
=
\mu_i^*
\ge0.
$$

よって

$$
r\frac{\partial f}{\partial z_i}(z^*)\le w_i.
$$

$\square$
<!-- proof-end -->

### 具体例：平方根技術

一投入で

$$
f(z)=2\sqrt z,
\qquad
z\ge0
$$

とします。

産出物価格を $r>0$、投入価格を $w>0$ とすると

$$
\max_{z\ge0}
\left\{
2r\sqrt z-wz
\right\}.
$$

内点では

$$
\frac{r}{\sqrt z}=w
$$

だから

$$
z^*
=
\left(\frac rw\right)^2.
$$

産出量は

$$
q^*
=
2\sqrt{z^*}
=
\frac{2r}{w}.
$$

利潤は

$$
\pi(r,w)
=
rq^*-wz^*
=
\frac{r^2}{w}.
$$

後で、この一例だけで費用最小化、利潤と費用の接続、Hotelling 型関係まで一周します。

---

## 7. 「この量だけ作れ」と言われたときの最安投入を考える

利潤最大化では企業が産出量まで自由に選びました。

しかし、受注量や契約量が先に決まっているなら問いは変わります。

> 目標産出量 $\bar q$ を達成するために、投入費用を最小にするにはどうすればよいか。

生産関数

$$
f:\mathbb R_+^n\to\mathbb R_+
$$

を使い、投入価格を $w\in\mathbb R_{++}^n$ とします。

目標 $\bar q$ を達成できる投入集合は

$$
V(\bar q)
=
\{
z\in\mathbb R_+^n:
f(z)\ge\bar q
\}
$$

です。

<a id="def-micro4-cost-function"></a>

<!-- formal-statement-start -->
> **定義（費用関数）**  
> 達成可能な目標産出量 $\bar q$ と投入価格 $w\in\mathbb R_{++}^n$ に対して
>
$$
c(w,\bar q)
=
\inf
\{
w\cdot z:
z\in\mathbb R_+^n,\ 
f(z)\ge\bar q
\}
$$
>
> を **費用関数（cost function）**という。
<!-- formal-statement-end -->

<a id="def-micro4-conditional-factor-demand"></a>

<!-- formal-statement-start -->
> **定義（条件付き要素需要）**  
> 目標産出量 $\bar q$ を達成する費用最小投入の集合
>
$$
Z(w,\bar q)
=
\operatorname*{arg\,min}_{z\in\mathbb R_+^n}
\{
w\cdot z:
f(z)\ge\bar q
\}
$$
>
> を **条件付き要素需要（conditional factor demand）**という。
<!-- formal-statement-end -->

「条件付き」というのは、産出量 $\bar q$ を所与として、その条件の下で必要な投入量を選ぶからです。

<!-- definition-example-start: def-micro4-cost-function -->
**定義の確認**：平方根技術の費用関数

$$
f(z)=2\sqrt z
$$

で $\bar q\ge0$ を作るには

$$
2\sqrt z\ge\bar q
$$

すなわち

$$
z\ge\frac{\bar q^2}{4}
$$

が必要です。

投入価格が $w>0$ なら最安なのは最小の投入量なので

$$
z^c(w,\bar q)
=
\frac{\bar q^2}{4},
$$

$$
c(w,\bar q)
=
\frac{w\bar q^2}{4}.
$$

費用関数は「産出量そのもの」ではなく、**その産出量を達成するために最小でいくら掛かるか**を返します。
<!-- definition-example-end -->

<!-- definition-example-start: def-micro4-conditional-factor-demand -->
同じ例では

$$
Z(w,\bar q)
=
\left\{
\frac{\bar q^2}{4}
\right\}.
$$

一投入なので価格 $w$ が変わっても必要な物理投入量は変わりません。複数投入なら、相対的に安くなった投入へ置き換えるため、条件付き要素需要は $w$ に依存します。
<!-- definition-example-end -->

---

## 8. 正の投入価格なら、費用最小化点をコンパクトな範囲へ切り取れる

費用最小化の実行可能集合 $V(\bar q)$ は、一般には大きな投入量の方向へ無限に広がります。

それでも MICRO3 の支出最小化と同じ機構で、最適化に必要な部分だけをコンパクトにできます。

<a id="thm-micro4-cost-existence"></a>

<!-- formal-statement-start -->
> **定理（費用最小化点の存在）**  
> $f:\mathbb R_+^n\to\mathbb R$ が連続、$w\in\mathbb R_{++}^n$ とする。
>
> 目標産出量 $\bar q$ が達成可能、すなわち
>
$$
V(\bar q)
=
\{z\in\mathbb R_+^n:f(z)\ge\bar q\}
\ne\varnothing
$$
>
> なら
>
$$
Z(w,\bar q)\ne\varnothing
$$
>
> であり、費用関数の infimum は minimum になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$V(\bar q)$ から一つ

$$
z^0\in V(\bar q)
$$

を取ります。

その費用を

$$
M=w\cdot z^0
$$

とします。

最適解候補として調べればよいのは

$$
K
=
V(\bar q)
\cap
\{z\in\mathbb R_+^n:w\cdot z\le M\}
$$

です。

$f$ は連続なので $V(\bar q)$ は閉です。

また $w_i>0$ だから、$z\in K$ なら各成分について

$$
0\le z_i\le\frac{M}{w_i}.
$$

従って $K$ は有界です。閉かつ有界な有限次元集合なので $K$ はコンパクトです。

$w\cdot z$ は連続なので $K$ 上で最小値を取ります。その最小化点は $V(\bar q)$ 全体でも最小化点です。$\square$
<!-- proof-end -->

ここで **投入価格が正**であることが、費用上限から各投入量の上限を引き出す役割を担っています。

ある投入財が無料なら、その方向へ無限に動けてしまい、このコンパクト化はそのままでは使えません。

---

## 9. 費用関数は投入価格について1次同次・凹になる

<a id="prop-micro4-cost-properties"></a>

<!-- formal-statement-start -->
> **命題（費用関数の投入価格に関する性質）**  
> 目標産出量 $\bar q$ を固定し、費用関数が有限値を取るとする。
>
> 1. $t>0$ に対して
>
$$
c(tw,\bar q)=t\,c(w,\bar q).
$$
>
> 2. $0\le\lambda\le1$ に対して
>
$$
c(\lambda w+(1-\lambda)v,\bar q)
\ge
\lambda c(w,\bar q)+(1-\lambda)c(v,\bar q).
$$
>
> 従って $c(\cdot,\bar q)$ は1次同次かつ凹である。
>
> 3. $w'\ge w$ を成分ごとに満たすなら
>
$$
c(w',\bar q)\ge c(w,\bar q).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

実行可能集合

$$
V(\bar q)
=
\{z:f(z)\ge\bar q\}
$$

は投入価格によらないことに注意します。

$t>0$ に対して

$$
c(tw,\bar q)
=
\inf_{z\in V(\bar q)}tw\cdot z
=
t\,c(w,\bar q).
$$

次に任意の $z\in V(\bar q)$ に対して

$$
(\lambda w+(1-\lambda)v)\cdot z
=
\lambda w\cdot z+(1-\lambda)v\cdot z
$$

であり、

$$
w\cdot z\ge c(w,\bar q),
\qquad
v\cdot z\ge c(v,\bar q)
$$

なので

$$
(\lambda w+(1-\lambda)v)\cdot z
\ge
\lambda c(w,\bar q)+(1-\lambda)c(v,\bar q).
$$

左辺の $z$ に関する infimum を取れば凹性が得られます。

最後に $w'\ge w$ かつ $z\ge0$ なら

$$
w'\cdot z\ge w\cdot z.
$$

両辺を $V(\bar q)$ 上で最小化して単調性を得ます。$\square$
<!-- proof-end -->

MICRO3 の支出関数と同じく、費用関数は「固定された実行可能集合上で線形価格式を最小化した値」なので、価格について凹になります。

---

## 10. 利潤最大化は「産出量を選ぶ問題」と「その産出量を最安で作る問題」に分けられる

一産出物の企業を考えます。

産出物価格を $r>0$、投入価格を $w\in\mathbb R_{++}^n$ とします。

達成可能な産出量全体を

$$
Q
=
\{q\ge0:\exists z\in\mathbb R_+^n,\ f(z)\ge q\}
$$

と書きます。

企業が投入 $z$ を直接選ぶ利潤最大化は

$$
\sup_{z\ge0}
\{
r f(z)-w\cdot z
\}.
$$

一方、産出量 $q$ を先に固定すると、それを作る最小費用は $c(w,q)$ です。

したがって企業は

> 産出量 $q$ を決める  
> → その $q$ を最安で作る  
> → 売上 $rq$ から最小費用を引く

と分解して考えられます。

<a id="thm-micro4-profit-cost"></a>

<!-- formal-statement-start -->
> **定理（利潤最大化と費用最小化の接続）**  
> $f:\mathbb R_+^n\to\mathbb R_+$ とし、達成可能な各産出量 $q$ について費用最小化点が存在するとする。
>
> このとき
>
$$
\sup_{z\ge0}
\{
rf(z)-w\cdot z
\}
=
\sup_{q\in Q}
\{
rq-c(w,q)
\}.
$$
>
> さらに左辺の最大化点 $z^*$ が存在し $q^*=f(z^*)$ とすると、$z^*$ は $q^*$ を作る費用最小投入である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず任意の投入 $z\ge0$ を取って

$$
q=f(z)
$$

と置きます。

$z$ は $q$ を達成する一つの実行可能投入なので

$$
c(w,q)\le w\cdot z.
$$

従って

$$
rq-w\cdot z
\le
rq-c(w,q).
$$

$q=f(z)$ だから

$$
rf(z)-w\cdot z
\le
\sup_{q\in Q}\{rq-c(w,q)\}.
$$

左辺について $z$ の supremum を取ると

$$
\sup_{z\ge0}\{rf(z)-w\cdot z\}
\le
\sup_{q\in Q}\{rq-c(w,q)\}.
$$

逆に、達成可能な $q$ を一つ取ります。

仮定により費用最小投入 $z^q$ が存在して

$$
f(z^q)\ge q,
\qquad
w\cdot z^q=c(w,q).
$$

産出物価格 $r>0$ なので

$$
rf(z^q)-w\cdot z^q
\ge
rq-c(w,q).
$$

左辺は投入を自由に選ぶ利潤の supremum 以下だから

$$
\sup_{z\ge0}\{rf(z)-w\cdot z\}
\ge
rq-c(w,q).
$$

$q\in Q$ の supremum を取れば逆向きの不等式が得られます。

最後に $z^*$ が利潤最大化点で、$q^*=f(z^*)$ を作るもっと安い投入 $\tilde z$ が存在したと仮定します。

すると

$$
f(\tilde z)\ge q^*,
\qquad
w\cdot\tilde z<w\cdot z^*
$$

なので

$$
rf(\tilde z)-w\cdot\tilde z
\ge
rq^*-w\cdot\tilde z
>
rq^*-w\cdot z^*
=
rf(z^*)-w\cdot z^*,
$$

となり $z^*$ の利潤最大性に矛盾します。

従って $z^*$ は $q^*$ に対する費用最小投入です。$\square$
<!-- proof-end -->

### 平方根技術で完全に検算する

$$
f(z)=2\sqrt z
$$

では、既に

$$
c(w,q)=\frac{wq^2}{4}
$$

を得ました。

したがって産出量だけを選ぶ問題は

$$
\max_{q\ge0}
\left\{
rq-\frac{wq^2}{4}
\right\}.
$$

一階条件は

$$
r-\frac{wq}{2}=0
$$

なので

$$
q^*=\frac{2r}{w}.
$$

このとき

$$
z^*
=
\frac{(q^*)^2}{4}
=
\left(\frac rw\right)^2,
$$

$$
\pi(r,w)
=
rq^*-c(w,q^*)
=
\frac{r^2}{w}.
$$

投入を直接選んだ第6節の答えと一致しました。

さらに

$$
\frac{\partial\pi}{\partial r}
=
\frac{2r}{w}
=
q^*,
$$

$$
\frac{\partial\pi}{\partial w}
=
-\frac{r^2}{w^2}
=
-z^*.
$$

Hotelling 型関係も数字の上で確認できます。

---

## 11. 凸な生産集合の境界は価格で支えられる

ここまでの価格は、外から与えられていました。

今度は逆に

> 生産集合のある境界点 $y^*$ を、どんな価格なら利潤最大化点として支えられるか

を考えます。

これは [支持超平面](../OPT2/index.md#def-opt2-supporting-hyperplane)そのものです。

<a id="def-micro4-supporting-price"></a>

<!-- formal-statement-start -->
> **定義（支持価格）**  
> 生産集合 $Y\subset\mathbb R^L$ と $y^*\in Y$ に対し、非零ベクトル
>
$$
p\in\mathbb R_+^L\setminus\{0\}
$$
>
> が
>
$$
p\cdot y
\le
p\cdot y^*
\qquad
(\forall y\in Y)
$$
>
> を満たすとき、$p$ を $y^*$ を支える **支持価格（supporting price）**という。
<!-- formal-statement-end -->

この不等式は、そのまま

$$
y^*\in S(p)
$$

という利潤最大化条件です。

つまり「価格が生産集合を支える」と「その価格の下で企業が $y^*$ を選ぶ」は同じ内容です。

<!-- definition-example-start: def-micro4-supporting-price -->
**定義の確認**：線形技術の境界を支える

$$
Y
=
\{
(y_1,y_2)\in\mathbb R^2:
y_2\le -2y_1
\}
$$

の境界点 $y^*=(-1,2)$ を考えます。

$$
p=(2,1)
$$

なら任意の $y\in Y$ について

$$
2y_1+y_2\le0
$$

であり、

$$
p\cdot y^*
=
2(-1)+2
=
0.
$$

従って

$$
p\cdot y\le p\cdot y^*
$$

で、$p$ は $y^*$ の支持価格です。
<!-- definition-example-end -->

---

## 12. 自由処分性があると、支持超平面の法線は非負価格になる

OPT2 の [有限次元の支持超平面定理](../OPT2/index.md#thm-opt2-supporting-hyperplane) は、閉凸集合の境界点に非零法線があることを保証します。

しかし経済学で価格として読むには、その法線が

$$
p\ge0
$$

であってほしいところです。

ここで自由処分性が効きます。

<a id="thm-micro4-supporting-price"></a>

<!-- formal-statement-start -->
> **定理（閉凸かつ自由処分可能な生産集合の支持価格）**  
> $Y\subset\mathbb R^L$ を非空閉凸集合とし、
>
$$
Y-\mathbb R_+^L\subset Y
$$
>
> を満たすとする。
>
> 任意の境界点 $y^*\in\partial Y$ に対して、ある
>
$$
p\in\mathbb R_+^L\setminus\{0\}
$$
>
> が存在し、
>
$$
p\cdot y
\le
p\cdot y^*
\qquad
(\forall y\in Y)
$$
>
> を満たす。
>
> 従って $y^*$ は価格 $p$ のもとで利潤最大化点である。
<!-- formal-statement-end -->

### 証明の見取り図

1. 閉凸性と境界点であることから、OPT2 の支持超平面定理を使う。
2. そこで得た法線を $a$ とする。
3. 自由処分性により $y^*-te_i$ も $Y$ に入る。
4. 支持不等式へ代入すると $a_i\ge0$ が強制される。
5. したがって法線を非負価格として読める。

<!-- proof-start -->
### 証明

$Y$ は非空閉凸集合で $y^*\in\partial Y$ なので、[有限次元の支持超平面定理](../OPT2/index.md#thm-opt2-supporting-hyperplane)により、ある非零ベクトル $a\in\mathbb R^L$ が存在して

$$
a\cdot y
\le
a\cdot y^*
\qquad
(\forall y\in Y)
$$

を満たします。

あとは $a\ge0$ を示せばよいです。

各座標 $i$ と任意の $t>0$ を取ります。

自由処分性から

$$
y^*-te_i\in Y
$$

です。

これを支持不等式へ入れると

$$
a\cdot(y^*-te_i)
\le
a\cdot y^*.
$$

左辺を展開すると

$$
a\cdot y^*-t a_i
\le
a\cdot y^*,
$$

従って

$$
-ta_i\le0.
$$

$t>0$ なので

$$
a_i\ge0.
$$

$i$ は任意だったから

$$
a\in\mathbb R_+^L.
$$

$a\ne0$ なので $p=a$ と置けば支持価格になります。$\square$
<!-- proof-end -->

この証明で、仮定の役割は明確です。

- **閉凸性**：支持超平面そのものを存在させる。
- **境界点**：集合全体を一方側に置く非零支持法線を得る位置である。
- **自由処分性**：支持法線の各成分を非負にする。

「支持超平面があるから価格がある」と一行で済ませると、最後の非負性が抜け落ちます。

---

## 13. 非凸な技術では、効率的な境界点でも価格で支えられないことがある

凸性は見た目をきれいにするだけの仮定ではありません。

一投入・一産出で

$$
q\le z^2,
\qquad
0\le z\le1
$$

という技術を考えます。

生産関数

$$
f(z)=z^2
$$

は凸であり、上側境界 $q=z^2$ の下にある生産集合は非凸です。

境界点

$$
z^*=\frac12,
\qquad
q^*=\frac14
$$

を考えます。

もし正の投入価格 $w>0$、産出物価格 $r>0$ がこの点を支持するなら、$z^*$ は

$$
rz^2-wz
$$

を $0\le z\le1$ で最大にしなければなりません。

しかし

$$
g(z)=rz^2-wz
$$

と置くと

$$
g''(z)=2r>0
$$

なので、$g$ は **狭義凸関数**です。

任意の内部点 $0<z<1$ は

$$
z=(1-z)\cdot0+z\cdot1
$$

と端点の狭義凸結合に書けます。狭義凸性から

$$
g(z)
<
(1-z)g(0)+zg(1)
\le
\max\{g(0),g(1)\}.
$$

従って内部点 $z=1/2$ が最大化点になることはありません。

したがって、この境界点を利潤最大化点にする正価格は存在しません。

壊れたのは、前節で使った

> 閉凸集合の境界点なら支持超平面を持つ

という機構です。

これは MICRO5 の第二厚生定理で、非凸な生産技術が支持価格による分権化を壊し得る理由そのものです。

---

## 14. 利潤最大化と費用最小化を混同しない

二つの問題は近いですが、固定しているものが違います。

利潤最大化では

$$
\max_z
\{
rf(z)-w\cdot z
\}
$$

とし、**産出量も企業が選びます**。

費用最小化では

$$
\min_z
\{
w\cdot z:
f(z)\ge\bar q
\}
$$

とし、**目標産出量 $\bar q$ は外から固定されています**。

したがって

- 費用最小化だけでは「何単位作るべきか」は決まらない
- 利潤最大化点は、その最適産出量について費用最小化もしている
- 先に費用関数を作れば、利潤最大化を産出量だけの一変数問題へ落とせる

という関係です。

消費者理論で

$$
\text{効用最大化}
\longleftrightarrow
\text{支出最小化}
$$

を見たのとよく似ていますが、経済的な対象と固定する量は異なります。

---

# 演習

## Level A

<a id="ex-micro4-a01"></a>

### MICRO4-A01 純産出ベクトルから利潤を読む

- Level: A
- 目安時間: 12分

ある企業が三財を扱い、

$$
y=(-4,-2,5)
$$

という生産を行う。価格が

$$
p=(3,7,10)
$$

であるとき、

1. 各成分が投入か産出かを説明せよ。
2. 利潤 $p\cdot y$ を求めよ。
3. 第二財価格だけが 7 から 9 へ上がると、同じ生産計画の利潤がどう変わるか求めよ。

<!-- solution-start -->
#### 詳細解答

$y_1=-4$、$y_2=-2$ は負なので、第一財を4単位、第二財を2単位投入しています。

$y_3=5$ は正なので、第三財を5単位純供給しています。

利潤は

$$
p\cdot y
=
3(-4)+7(-2)+10(5)
=
-12-14+50
=
24.
$$

第二財価格が 9 になると

$$
p'\cdot y
=
3(-4)+9(-2)+10(5)
=
-12-18+50
=
20.
$$

したがって利潤は 24 から 20 へ 4 だけ減ります。

投入財は純産出ベクトルで負の成分なので、その価格上昇は利潤を下げます。

---

<!-- solution-end -->

<a id="ex-micro4-a02"></a>

### MICRO4-A02 利潤関数の1次同次性を確認する

- Level: A
- 目安時間: 12分

ある生産集合 $Y$ に対して価格 $p$ の利潤最大値が

$$
\pi(p)=120
$$

だったとする。

1. すべての価格を3倍したときの利潤最大値を求めよ。
2. なぜ最適生産集合 $S(p)$ 自体は変わらないか説明せよ。

<!-- solution-start -->
#### 詳細解答

利潤関数の1次同次性から

$$
\pi(3p)
=
3\pi(p)
=
360.
$$

また任意の $y\in Y$ に対して

$$
(3p)\cdot y
=
3(p\cdot y).
$$

すべての候補の利潤を同じ正の定数3倍しているだけなので、大小関係は変わりません。

従って

$$
S(3p)=S(p).
$$

通貨単位を同率に変えても実物の最適生産は変わらず、名目利潤だけが同率に変わります。

---

<!-- solution-end -->

<a id="ex-micro4-a03"></a>

### MICRO4-A03 平方根技術の費用関数を求める

- Level: A
- 目安時間: 15分

$$
f(z)=3\sqrt z
$$

という一投入技術を考える。投入価格を $w>0$、目標産出量を $\bar q\ge0$ とする。

1. 目標を達成するために必要な最小投入量を求めよ。
2. 費用関数 $c(w,\bar q)$ を求めよ。
3. $c(2w,\bar q)$ と $c(w,\bar q)$ の関係を確認せよ。

<!-- solution-start -->
#### 詳細解答

制約

$$
3\sqrt z\ge\bar q
$$

は

$$
z\ge\frac{\bar q^2}{9}
$$

と同値です。

$w>0$ なので費用 $wz$ は $z$ とともに増えます。従って最小投入量は

$$
z^c
=
\frac{\bar q^2}{9}.
$$

よって

$$
c(w,\bar q)
=
wz^c
=
\frac{w\bar q^2}{9}.
$$

価格を2倍すると

$$
c(2w,\bar q)
=
\frac{2w\bar q^2}{9}
=
2c(w,\bar q).
$$

費用関数の投入価格に関する1次同次性が具体的に確認できました。

---

<!-- solution-end -->

<a id="ex-micro4-a04"></a>

### MICRO4-A04 使わない投入の限界条件を読む

- Level: A
- 目安時間: 15分

二投入の凹生産関数 $f(z_1,z_2)$ について、ある利潤最大解が

$$
z_1^*>0,
\qquad
z_2^*=0
$$

だったとする。

産出物価格を $r>0$、投入価格を $w_1,w_2>0$ としたとき、[KKT 条件](../OPT5/index.md#thm-opt5-kkt)から限界生産物について何が言えるか。

<!-- solution-start -->
#### 詳細解答

[凹生産関数の利潤最大化条件](#thm-micro4-producer-kkt)より、正に使われる投入については

$$
r\frac{\partial f}{\partial z_i}(z^*)=w_i
$$

です。

したがって $z_1^*>0$ から

$$
r\frac{\partial f}{\partial z_1}(z^*)=w_1.
$$

一方 $z_2^*=0$ は端点なので

$$
r\frac{\partial f}{\partial z_2}(z^*)\le w_2.
$$

第二投入をゼロから少し増やしたときの限界売上が、その投入価格を上回っていないため、使わないことと整合します。

---

## Level B

<!-- solution-end -->

<a id="ex-micro4-b01"></a>

### MICRO4-B01 自由処分性から支持法線の非負性を導く

- Level: B
- 目安時間: 20分

$Y\subset\mathbb R^L$ が自由処分性

$$
Y-\mathbb R_+^L\subset Y
$$

を持ち、$y^*\in Y$ で非零ベクトル $a$ が

$$
a\cdot y\le a\cdot y^*
\qquad
(\forall y\in Y)
$$

を満たすとする。

各成分について $a_i\ge0$ を直接証明せよ。

<!-- solution-start -->
#### 詳細解答

任意の座標 $i$ と任意の $t>0$ を取ります。

自由処分性から

$$
y^*-te_i\in Y
$$

です。

したがって支持不等式へ代入して

$$
a\cdot(y^*-te_i)
\le
a\cdot y^*.
$$

展開すると

$$
a\cdot y^*-t a_i
\le
a\cdot y^*.
$$

両辺から $a\cdot y^*$ を引けば

$$
-t a_i\le0.
$$

$t>0$ なので

$$
a_i\ge0.
$$

$i$ は任意だから

$$
a\ge0.
$$

ここで自由処分性は、支持点から各負方向へ動いた点を実際に $Y$ の中へ入れるために使われています。

---

<!-- solution-end -->

<a id="ex-micro4-b02"></a>

### MICRO4-B02 利潤最大化点が費用最小化もしていることを証明する

- Level: B
- 目安時間: 20分

一産出物の企業で、$z^*$ が

$$
\max_{z\ge0}\{rf(z)-w\cdot z\}
$$

の最大化点であるとする。

$q^*=f(z^*)$ と置く。

$z^*$ が $q^*$ を達成する投入の中で費用最小であることを、背理法で証明せよ。

<!-- solution-start -->
#### 詳細解答

$z^*$ が費用最小でないと仮定します。

すると、ある投入 $\tilde z$ が存在して

$$
f(\tilde z)\ge q^*=f(z^*)
$$

かつ

$$
w\cdot\tilde z<w\cdot z^*
$$

を満たします。

$r>0$ なので

$$
rf(\tilde z)
\ge
rq^*
=
rf(z^*).
$$

一方、投入費用は厳密に小さいので

$$
-w\cdot\tilde z
>
-w\cdot z^*.
$$

二つを足すと

$$
rf(\tilde z)-w\cdot\tilde z
>
rf(z^*)-w\cdot z^*.
$$

これは $z^*$ が利潤最大化点であることに矛盾します。

従って $z^*$ は $q^*$ を達成する費用最小投入です。

---

<!-- solution-end -->

<a id="ex-micro4-b03"></a>

### MICRO4-B03 利潤関数の価格微分から純産出を復元する

- Level: B
- 目安時間: 25分

価格 $p$ で利潤最大化点 $y^*$ が存在し、利潤関数 $\pi$ が $p$ で微分可能だとする。

1. 任意の小さな $h$ に対して
   $$
   \pi(p+h)-\pi(p)\ge h\cdot y^*
   $$
   を示せ。
2. $h=td$ と $h=-td$ を用いて
   $$
   \nabla\pi(p)=y^*
   $$
   を導け。

<!-- solution-start -->
#### 詳細解答

$y^*$ は価格 $p+h$ のもとでも技術的に選択可能なので

$$
\pi(p+h)
=
\sup_{y\in Y}(p+h)\cdot y
\ge
(p+h)\cdot y^*.
$$

また $y^*$ は価格 $p$ の最大化点だから

$$
\pi(p)=p\cdot y^*.
$$

従って

$$
\pi(p+h)-\pi(p)
\ge
h\cdot y^*.
$$

$\pi$ は $p$ で微分可能なので

$$
\pi(p+h)-\pi(p)
=
\nabla\pi(p)\cdot h+o(\lVert h\rVert).
$$

$h=td$、$t>0$ とすると

$$
\nabla\pi(p)\cdot d+o(1)
\ge
y^*\cdot d.
$$

$t\downarrow0$ から

$$
\nabla\pi(p)\cdot d
\ge
y^*\cdot d.
$$

次に $h=-td$ を使うと

$$
-\nabla\pi(p)\cdot d+o(1)
\ge
-y^*\cdot d.
$$

従って

$$
\nabla\pi(p)\cdot d
\le
y^*\cdot d.
$$

両方を合わせて

$$
\nabla\pi(p)\cdot d
=
y^*\cdot d
$$

が任意の $d$ について成り立ちます。

したがって

$$
\nabla\pi(p)=y^*.
$$

---

## Level C

<!-- solution-end -->

<a id="ex-micro4-c01"></a>

### MICRO4-C01 平方根技術で企業理論を一周する

- Level: C
- 目安時間: 40分

一投入・一産出の企業が

$$
q=2\sqrt z,
\qquad
z\ge0
$$

という技術を持つ。

投入価格を $w>0$、産出物価格を $r>0$ とする。

1. 投入 $z$ を直接選ぶ利潤最大化問題を解き、$z^*$、$q^*$、$\pi(r,w)$ を求めよ。
2. 目標産出量 $q$ に対する費用関数 $c(w,q)$ を求めよ。
3. 
   $$
   \max_{q\ge0}\{rq-c(w,q)\}
   $$
   を解き、1 と一致することを確認せよ。
4. $\partial\pi/\partial r$ と $\partial\pi/\partial w$ を計算し、Hotelling 型関係を確認せよ。
5. 純産出ベクトル
   $$
   y^*=(-z^*,q^*)
   $$
   と価格
   $$
   p=(w,r)
   $$
   を用いて、$p$ が $y^*$ で技術を支持することを説明せよ。

<!-- solution-start -->
#### 詳細解答

利潤は

$$
\varphi(z)
=
2r\sqrt z-wz.
$$

$z>0$ で微分すると

$$
\varphi'(z)
=
\frac{r}{\sqrt z}-w.
$$

一階条件

$$
\frac{r}{\sqrt z}=w
$$

から

$$
z^*
=
\left(\frac rw\right)^2.
$$

また

$$
\varphi''(z)
=
-\frac{r}{2z^{3/2}}<0
$$

なので $\varphi$ は狭義凹で、この停留点が一意な大域最大点です。

産出量は

$$
q^*
=
2\sqrt{z^*}
=
\frac{2r}{w}.
$$

利潤は

$$
\pi(r,w)
=
rq^*-wz^*
=
r\frac{2r}{w}
-
w\frac{r^2}{w^2}
=
\frac{r^2}{w}.
$$

次に目標産出量 $q$ を作るには

$$
2\sqrt z\ge q
$$

すなわち

$$
z\ge\frac{q^2}{4}
$$

が必要です。

$w>0$ だから最小費用投入は

$$
z^c(q)=\frac{q^2}{4}
$$

で、

$$
c(w,q)
=
\frac{wq^2}{4}.
$$

従って産出量だけを選ぶ問題は

$$
\max_{q\ge0}
\left\{
rq-\frac{wq^2}{4}
\right\}.
$$

目的関数の微分は

$$
r-\frac{wq}{2}.
$$

一階条件から

$$
q^*=\frac{2r}{w}.
$$

このとき

$$
z^c(q^*)
=
\frac14\left(\frac{2r}{w}\right)^2
=
\left(\frac rw\right)^2
=
z^*.
$$

最大値は

$$
r\frac{2r}{w}
-
\frac{w}{4}\frac{4r^2}{w^2}
=
\frac{r^2}{w}
=
\pi(r,w).
$$

したがって直接の利潤最大化と「費用最小化してから産出量を選ぶ」方法が一致します。

次に

$$
\frac{\partial\pi}{\partial r}
=
\frac{2r}{w}
=
q^*
$$

であり、

$$
\frac{\partial\pi}{\partial w}
=
-\frac{r^2}{w^2}
=
-z^*.
$$

純産出ベクトルは

$$
y^*
=
\left(
-\frac{r^2}{w^2},
\frac{2r}{w}
\right)
$$

なので

$$
\nabla_{(w,r)}\pi
=
(-z^*,q^*)
=
y^*.
$$

Hotelling 型関係が成分ごとに確認できました。

最後に任意の生産可能な $y=(-z,q)$ について、利潤最大性から

$$
w(-z)+rq
\le
w(-z^*)+rq^*.
$$

すなわち

$$
p\cdot y\le p\cdot y^*.
$$

従って価格 $p=(w,r)$ は生産集合を $y^*$ で支持しています。

この一例で

$$
\text{生産技術}
\to
\text{利潤最大化}
\to
\text{費用最小化}
\to
\text{利潤関数の価格微分}
\to
\text{支持価格}
$$

までが一つにつながりました。
<!-- solution-end -->


---

## まとめ

本章では、企業の技術を純産出ベクトルの集合として表し、価格との内積を利潤として読みました。

中心となる関係は

$$
\boxed{
\pi(p)=\sup_{y\in Y}p\cdot y
}
$$

と

$$
\boxed{
c(w,q)
=
\inf\{w\cdot z:f(z)\ge q\}
}
$$

です。

利潤関数は価格について1次同次・凸で、微分可能な点では勾配が利潤最大化純産出を返します。

一産出物モデルでは、利潤最大化点はその最適産出量を費用最小で作っており、

$$
\sup_z\{rf(z)-w\cdot z\}
=
\sup_q\{rq-c(w,q)\}
$$

と分解できます。

さらに閉凸な生産集合が自由処分性を持つなら、境界点の支持超平面の法線は非負になり、支持価格として解釈できます。

次の MICRO5 では、この「凸集合の境界を価格で支える」という仕組みを、企業一社の生産集合から社会全体の実行可能配分へ広げます。パレート 効率、社会計画問題、第一・第二厚生定理を通じて、価格が分権化の道具になる理由を見ます。
