# FIX2 集合値写像・対応

<!-- definition-example-audit: strict -->

FIX1 では、連続写像

$$
f:C\to C
$$

に対する不動点

$$
f(x)=x
$$

を扱いました。

ところが、最適化・ゲーム理論・一般均衡では、一つの入力に対して答えが一つに決まらない場面が普通に現れます。例えば、二つの行動が同点なら「最適反応」は一点ではなく複数点です。価格がちょうど無差別になる値なら「需要」も一点ではなく集合になります。

そこで本章では、各点に一点ではなく集合を返す

$$
\Gamma:X\rightrightarrows Y
$$

を扱います。日本語では **対応**、英語では correspondence または set-valued map と呼ばれる対象です。

中心になる見取り図は

$$
\boxed{
\text{一点を返す連続写像}
\quad\longrightarrow\quad
\text{集合を返す対応}
}
$$

$$
\boxed{
\text{連続性}
\quad\longrightarrow\quad
\text{集合値版の二方向の連続性}
}
$$

です。

一方は「近くへ動いても、遠い新しい値が突然現れない」ことを、もう一方は「いま存在する値が、近くへ動いた瞬間に突然消えない」ことを表します。対応を定義したあと、この二つを順に定式化します。

この区別が見えると、後続の最適反応対応や需要対応で「同点のところでは値集合が広がってよいが、その広がり方には規則がある」ことを正確に記述できます。FIX3 ではこの言葉を使って Berge の最大値定理と Kakutani 不動点定理へ進みます。

---

## 1. 一点ではなく集合を返す

集合 $X,Y$ を取ります。

<a id="def-fix2-correspondence-graph"></a>

<!-- formal-statement-start -->
> **定義（対応とグラフ）**  
> 各 $x\in X$ に $Y$ の部分集合
>
$$
\Gamma(x)\subset Y
$$
>
> を割り当てる規則を **対応** といい、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> と書く。
>
> 対応 $\Gamma$ の **グラフ**を
>
$$
\operatorname{Gr}(\Gamma)
=
\{(x,y)\in X\times Y:y\in\Gamma(x)\}
$$
>
> と定める。
>
> $X,Y$ が位相空間であり、$\operatorname{Gr}(\Gamma)$ が $X\times Y$ の閉集合であるとき、$\Gamma$ は **閉グラフを持つ**という。
<!-- formal-statement-end -->

通常の写像

$$
f:X\to Y
$$

は、

$$
\Gamma_f(x)=\{f(x)\}
$$

と置けば、各値が1点だけからなる対応として見られます。

対応では

$$
\Gamma(x)=\varnothing
$$

も一般には許せます。ただし、最適反応・需要・Kakutani 不動点定理では「候補が少なくとも一つ存在する」ことが重要なので、必要な箇所では非空値を明示的に仮定します。

<!-- definition-example-start: def-fix2-correspondence-graph -->
**定義の確認**：区間を返す対応

$$
X=Y=[0,1]
$$

とし、

$$
\Gamma(x)=[0,x]
$$

とします。

例えば

$$
\Gamma(0)=\{0\},
\qquad
\Gamma\left(\frac12\right)
=
\left[0,\frac12\right],
\qquad
\Gamma(1)=[0,1].
$$

従って、一つの入力に複数の値を返すので通常の一点値写像ではありません。

グラフは

$$
\operatorname{Gr}(\Gamma)
=
\{(x,y)\in[0,1]^2:0\le y\le x\}
$$

です。正方形の下三角形がそのままグラフになります。

また、点列

$$
(x_n,y_n)\in\operatorname{Gr}(\Gamma),
\qquad
(x_n,y_n)\to(x,y)
$$

を取ると

$$
0\le y_n\le x_n
$$

なので、極限を取って

$$
0\le y\le x.
$$

従って

$$
(x,y)\in\operatorname{Gr}(\Gamma)
$$

であり、このグラフは閉集合です。
<!-- definition-example-end -->

「各値 $\Gamma(x)$ の性質」と「グラフ全体 $\operatorname{Gr}(\Gamma)$ の性質」は別物です。次節ではまず、各値集合を調べます。

---

## 2. 値集合の性質：非空・閉・コンパクト・凸

<a id="def-fix2-value-properties"></a>

<!-- formal-statement-start -->
> **定義（対応の値集合の性質）**  
> 対応
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> について、すべての $x\in X$ で
>
$$
\Gamma(x)\ne\varnothing
$$
>
> なら **非空値**であるという。
>
> $Y$ が位相空間のとき、すべての $x$ で $\Gamma(x)$ が閉集合なら **閉値**、コンパクト集合なら **コンパクト値**であるという。
>
> $Y$ が実ベクトル空間の部分集合で、すべての $x$ で $\Gamma(x)$ が凸集合なら **凸値**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fix2-value-properties -->
**定義の確認**：再び $\Gamma(x)=[0,x]$

$x\in[0,1]$ なら

$$
0\in[0,x]
$$

なので非空です。

また $[0,x]$ は $\mathbb R$ の閉区間なので閉かつコンパクトです。

さらに

$$
u,v\in[0,x],
\qquad
0\le t\le1
$$

なら

$$
0
\le
tu+(1-t)v
\le
tx+(1-t)x
=
x.
$$

従って

$$
tu+(1-t)v\in[0,x].
$$

よって各値は凸集合です。

したがってこの対応は、非空値・閉値・コンパクト値・凸値をすべて満たします。
<!-- definition-example-end -->

### 2.1 値が凸でも、グラフが凸とは限らない

一点値対応

$$
\Gamma(x)=\{x^2\},
\qquad
x\in[-1,1]
$$

を考えます。

各値は1点集合なので凸です。

しかしグラフは放物線

$$
\{(x,x^2):-1\le x\le1\}
$$

です。

$$
(-1,1),
\qquad
(1,1)
$$

はグラフに属しますが、その中点

$$
(0,1)
$$

はグラフに属しません。したがってグラフは凸ではありません。

### 2.2 値がコンパクトでも、グラフがコンパクトとは限らない

$$
\Gamma(x)=\{x\},
\qquad
x\in\mathbb R
$$

では、各値は1点集合なのでコンパクトです。

しかし

$$
\operatorname{Gr}(\Gamma)
=
\{(x,x):x\in\mathbb R\}
$$

は有界でないのでコンパクトではありません。

ここは後で非常に重要です。

> **コンパクト値**は各縦切片 $\Gamma(x)$ の性質であり、グラフ全体のコンパクト性ではない。

---

## 3. 上半連続性：遠い値が突然現れない

対応の「連続性」は、一点値写像の連続性をそのまま書けません。値が集合だからです。

まず、値集合が外側へ急に膨らまない性質を定義します。

<a id="def-fix2-upper-hemicontinuity"></a>

<!-- formal-statement-start -->
> **定義（対応の上半連続性）**  
> $(X,d_X),(Y,d_Y)$ を距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を対応とする。
>
> $x\in X$ において $\Gamma$ が **上半連続**であるとは、$\Gamma(x)$ を含む任意の開集合 $V\subset Y$ に対し、ある $\delta>0$ が存在して
>
$$
d_X(x',x)<\delta
\quad\Longrightarrow\quad
\Gamma(x')\subset V
$$
>
> となることをいう。
>
> すべての $x\in X$ で上半連続なら、$\Gamma$ は上半連続であるという。
<!-- formal-statement-end -->

この定義は

> $\Gamma(x)$ のまわりに少し余裕を持った開集合 $V$ を置けば、$x'$ を十分 $x$ に近づけたとき $\Gamma(x')$ 全体をその中へ閉じ込められる。

と言っています。

したがって、上半連続性が防ぐのは **遠い新しい値の突然出現**です。

<!-- definition-example-start: def-fix2-upper-hemicontinuity -->
**定義の確認**：同点で最適反応が増える

$$
B(q)
=
\begin{cases}
\{0\}, & q<\frac12,\\[3pt]
[0,1], & q=\frac12,\\[3pt]
\{1\}, & q>\frac12
\end{cases},
\qquad
q\in[0,1]
$$

を考えます。終域も $[0,1]$ とします。

$q\ne1/2$ では、十分小さい近傍の中で $B(q)$ は同じ1点集合なので上半連続です。

$q=1/2$ では

$$
B\left(\frac12\right)=[0,1]
$$

です。終域 $Y=[0,1]$ の中でこの全体を含む開集合は $Y$ 自身です。したがって、任意の $q'$ について

$$
B(q')\subset[0,1]
$$

であり、上半連続性は成り立ちます。

つまり値集合が同点で **広がる**こと自体は、上半連続性に反しません。問題なのは、基準点では存在しない遠い値が、近くの点で突然現れることです。
<!-- definition-example-end -->

この $B$ は後で、実際の最適化問題から最適反応対応として導きます。

---

## 4. 既存の値が突然消えない条件

次は反対向きです。

<a id="def-fix2-lower-hemicontinuity"></a>

<!-- formal-statement-start -->
> **定義（対応の下半連続性）**  
> $(X,d_X),(Y,d_Y)$ を距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を対応とする。
>
> $x\in X$ において $\Gamma$ が **対応の下半連続性を満たす**とは、$\Gamma(x)$ と交わる任意の開集合 $V\subset Y$ に対し、ある $\delta>0$ が存在して
>
$$
d_X(x',x)<\delta
\quad\Longrightarrow\quad
\Gamma(x')\cap V\ne\varnothing
$$
>
> となることをいう。
>
> すべての $x\in X$ でこの条件を満たすなら、$\Gamma$ は対応の下半連続性を持つという。
<!-- formal-statement-end -->

対応の下半連続性は

> $y\in\Gamma(x)$ の近くを観測していたなら、入力を少し動かしても $\Gamma(x')$ の中に $y$ の近くの点が残る。

という性質です。

したがって、対応の下半連続性が防ぐのは **既存の値の突然消失**です。

<!-- definition-example-start: def-fix2-lower-hemicontinuity -->
**定義の確認**：先ほどの $B$ は同点で対応の下半連続性を満たさない

$$
x=\frac12
$$

では

$$
B(x)=[0,1].
$$

相対位相での開集合

$$
V=(0.4,0.6)
$$

を取ると

$$
B\left(\frac12\right)\cap V\ne\varnothing.
$$

しかし $q<1/2$ なら

$$
B(q)=\{0\},
$$

$q>1/2$ なら

$$
B(q)=\{1\}.
$$

どちらも $V$ と交わりません。

従って、どれほど $q$ を $1/2$ に近づけても

$$
B(q)\cap V\ne\varnothing
$$

を一様には保証できません。

したがって $B$ は $q=1/2$ で対応の下半連続性を満たしません。
<!-- definition-example-end -->

対応の上半連続性と対応の下半連続性は名前が似ていますが、別の性質です。

| 性質 | 防ぐもの | 集合を使った条件 |
|---|---|---|
| 上半連続 | 遠い新しい値の突然出現 | $\Gamma(x)\subset V$ なら近くでも $\Gamma(x')\subset V$ |
| 対応の下半連続性 | 既存の値の突然消失 | $\Gamma(x)\cap V\ne\varnothing$ なら近くでも $\Gamma(x')\cap V\ne\varnothing$ |

---

## 5. 一点値対応では通常の連続性へ戻る

二種類に分けた連続性が、通常の写像では本当に元へ戻ることを確認します。

<a id="prop-fix2-singleton-continuity"></a>

<!-- formal-statement-start -->
> **命題（1点値対応と通常の連続性）**  
> $(X,d_X),(Y,d_Y)$ を距離空間とし、
>
$$
f:X\to Y
$$
>
> を写像とする。1点値対応
>
$$
\Gamma_f(x)=\{f(x)\}
$$
>
> を定める。
>
> このとき任意の $x\in X$ について、次は同値である。
>
> 1. $f$ は $x$ で連続である。
> 2. $\Gamma_f$ は $x$ で上半連続である。
> 3. $\Gamma_f$ は $x$ で対応の下半連続性を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1点集合については

$$
\{f(x')\}\subset V
$$

と

$$
\{f(x')\}\cap V\ne\varnothing
$$

はいずれも

$$
f(x')\in V
$$

と同じです。

従って、二種類の半連続性はどちらも「$f(x)$ の任意の開近傍へ、近くの $f(x')$ が入る」という通常の連続性になります。

<!-- proof-start -->
### 証明

$f$ が $x$ で連続とします。

$\Gamma_f(x)$ を含む開集合 $V$ を取ると

$$
f(x)\in V.
$$

連続性より、ある $\delta>0$ が存在して

$$
d_X(x',x)<\delta
\quad\Longrightarrow\quad
f(x')\in V.
$$

よって

$$
\Gamma_f(x')=\{f(x')\}\subset V
$$

なので上半連続です。

また、開集合 $V$ が

$$
\Gamma_f(x)\cap V\ne\varnothing
$$

を満たすことは

$$
f(x)\in V
$$

と同値です。同じ連続性から、近くの $x'$ で

$$
f(x')\in V,
$$

すなわち

$$
\Gamma_f(x')\cap V\ne\varnothing
$$

となります。従って対応の下半連続性を満たします。

逆に $\Gamma_f$ が上半連続とします。$f(x)$ の任意の開近傍 $V$ を取ると

$$
\Gamma_f(x)=\{f(x)\}\subset V.
$$

上半連続性より、近くの $x'$ で

$$
\{f(x')\}\subset V,
$$

従って

$$
f(x')\in V.
$$

これは $f$ の $x$ における連続性です。

対応の下半連続性から連続性を示す場合も、$f(x)\in V$ なら

$$
\Gamma_f(x)\cap V\ne\varnothing.
$$

従って近くの $x'$ で

$$
\Gamma_f(x')\cap V\ne\varnothing,
$$

つまり

$$
f(x')\in V.
$$

よって $f$ は $x$ で連続です。
<!-- proof-end -->

この命題から、半連続性は通常の連続性と無関係な新概念ではなく、集合値化したときに一つの連続性が二方向へ分かれたものだと分かります。

---

## 6. 上半連続性から閉グラフが出る

応用では、開集合を直接追うより

$$
x_n\to x,
\qquad
y_n\to y,
\qquad
y_n\in\Gamma(x_n)
$$

から

$$
y\in\Gamma(x)
$$

を示す方が簡単なことがあります。

これが閉グラフです。

<a id="prop-fix2-uhc-closed-graph"></a>

<!-- formal-statement-start -->
> **命題（コンパクト値な上半連続対応は閉グラフを持つ）**  
> $(X,d_X),(Y,d_Y)$ を距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を非空コンパクト値な上半連続対応とする。
>
> このとき
>
$$
\operatorname{Gr}(\Gamma)
$$
>
> は $X\times Y$ の閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

グラフ上の列

$$
(x_n,y_n)\to(x,y)
$$

を取ります。

もし

$$
y\notin\Gamma(x)
$$

なら、コンパクト集合 $\Gamma(x)$ と点 $y$ の距離は正です。

その正の隙間を使って $\Gamma(x)$ を含む細い開近傍 $V$ を作ると、上半連続性により $\Gamma(x_n)$ は最終的に $V$ の中へ入ります。

一方 $y_n\to y$ なので、$y_n$ は最終的に $V$ の外へ出ます。これは

$$
y_n\in\Gamma(x_n)
$$

と矛盾します。

<!-- proof-start -->
### 証明

$$
(x_n,y_n)\in\operatorname{Gr}(\Gamma),
\qquad
(x_n,y_n)\to(x,y)
$$

とします。

従って

$$
x_n\to x,
\qquad
y_n\to y,
\qquad
y_n\in\Gamma(x_n).
$$

示すべきことは

$$
y\in\Gamma(x)
$$

です。

反対に

$$
y\notin\Gamma(x)
$$

と仮定します。

$\Gamma(x)$ は非空コンパクトです。点 $y$ との距離

$$
\eta
=
\inf_{z\in\Gamma(x)}d_Y(y,z)
$$

を考えます。

ここで

$$
\eta>0
$$

です。実際、もし $\eta=0$ なら、各 $m$ について

$$
z_m\in\Gamma(x),
\qquad
d_Y(y,z_m)<\frac1m
$$

を取れます。$\Gamma(x)$ はコンパクトなので、[距離空間におけるコンパクト性と点列コンパクト性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-01)から収束部分列

$$
z_{m_k}\to z\in\Gamma(x)
$$

を取れます。

一方

$$
d_Y(y,z_{m_k})\to0
$$

なので $z=y$ です。これは $y\notin\Gamma(x)$ に矛盾します。

従って $\eta>0$ です。

$\Gamma(x)$ の開 $\eta/3$-近傍

$$
V
=
\left\{
w\in Y:
d_Y(w,\Gamma(x))<\frac{\eta}{3}
\right\}
$$

を取ります。

明らかに

$$
\Gamma(x)\subset V.
$$

上半連続性より、十分大きい $n$ では

$$
\Gamma(x_n)\subset V.
$$

従って

$$
y_n\in V
$$

であり、

$$
d_Y(y_n,\Gamma(x))<\frac{\eta}{3}.
$$

他方、

$$
y_n\to y
$$

なので十分大きい $n$ では

$$
d_Y(y_n,y)<\frac{\eta}{3}.
$$

任意の $z\in\Gamma(x)$ に対し三角不等式より

$$
d_Y(y_n,z)
\ge
d_Y(y,z)-d_Y(y_n,y)
>
\eta-\frac{\eta}{3}
=
\frac{2\eta}{3}.
$$

従って

$$
d_Y(y_n,\Gamma(x))
\ge
\frac{2\eta}{3},
$$

となり先ほどの

$$
d_Y(y_n,\Gamma(x))<\frac{\eta}{3}
$$

に矛盾します。

よって

$$
y\in\Gamma(x).
$$

したがってグラフは閉集合です。
<!-- proof-end -->

ここでコンパクト値性は、$y$ と $\Gamma(x)$ の間に正の距離を確保するために使いました。

---

## 7. 終域がコンパクトなら閉グラフから上半連続性へ戻れる

逆向きは、終域全体のコンパクト性があれば成立します。

<a id="prop-fix2-closed-graph-uhc"></a>

<!-- formal-statement-start -->
> **命題（コンパクト終域で閉グラフなら上半連続）**  
> $(X,d_X)$ を距離空間、$(Y,d_Y)$ をコンパクト距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を対応とする。
>
> $\operatorname{Gr}(\Gamma)$ が $X\times Y$ の閉集合なら、$\Gamma$ は上半連続である。
<!-- formal-statement-end -->

### 証明の見取り図

上半連続でないとすると、ある $x$ と

$$
\Gamma(x)\subset V
$$

を満たす開集合 $V$ があり、$x_n\to x$ なのに

$$
y_n\in\Gamma(x_n)\setminus V
$$

となる列を作れます。

終域 $Y$ がコンパクトなので $y_n$ から収束部分列を取れます。

その極限は $Y\setminus V$ に残りますが、閉グラフ性から同時に $\Gamma(x)\subset V$ に入らなければなりません。矛盾です。

<!-- proof-start -->
### 証明

上半連続でないと仮定します。

すると、ある $x\in X$ と開集合 $V\subset Y$ が存在して

$$
\Gamma(x)\subset V
$$

であるにもかかわらず、任意の $\delta>0$ に対して

$$
d_X(x',x)<\delta
$$

かつ

$$
\Gamma(x')\not\subset V
$$

となる $x'$ が存在します。

各 $n$ について $\delta=1/n$ とし、

$$
d_X(x_n,x)<\frac1n
$$

かつ

$$
\Gamma(x_n)\not\subset V
$$

となる $x_n$ を取ります。

さらに

$$
y_n\in\Gamma(x_n)\setminus V
$$

を一つ選びます。

すると

$$
x_n\to x.
$$

$Y$ はコンパクト距離空間なので、[距離空間におけるコンパクト性と点列コンパクト性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-01)から部分列

$$
y_{n_k}\to y\in Y
$$

を取れます。

各 $y_{n_k}$ は閉集合

$$
Y\setminus V
$$

に属するので

$$
y\in Y\setminus V.
$$

一方、

$$
(x_{n_k},y_{n_k})\in\operatorname{Gr}(\Gamma)
$$

であり、

$$
(x_{n_k},y_{n_k})\to(x,y).
$$

グラフは閉なので

$$
(x,y)\in\operatorname{Gr}(\Gamma).
$$

従って

$$
y\in\Gamma(x)\subset V.
$$

これは

$$
y\in Y\setminus V
$$

と矛盾します。

よって $\Gamma$ は上半連続です。
<!-- proof-end -->

この証明で終域のコンパクト性が働いた場所は明確です。

> **逃げていく $y_n$ から収束部分列を取るところ**

です。

<a id="cor-fix2-uhc-closed-graph"></a>

<!-- formal-statement-start -->
> **系（コンパクト終域における上半連続性と閉グラフ）**  
> $(X,d_X)$ を距離空間、$(Y,d_Y)$ をコンパクト距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を非空コンパクト値対応とする。
>
> このとき
>
$$
\boxed{
\Gamma\text{ が上半連続}
\iff
\operatorname{Gr}(\Gamma)\text{ が閉}
}
$$
<!-- formal-statement-end -->

実際、順方向は前節、逆方向はこの節の命題です。

この系は、ゲーム理論や需要理論で非常に便利です。

開集合の定義から上半連続性を直接示す代わりに、

1. 値がコンパクトである。
2. 終域をコンパクトな集合に制限できる。
3. 極限を取ってグラフが閉じている。

を確認すればよくなります。

### 7.1 終域のコンパクト性を外すと逆向きは壊れる

$$
X=Y=\mathbb R
$$

とし、

$$
\Gamma(0)=\{0\},
\qquad
\Gamma(x)=\left\{\frac1x\right\}
\quad(x\ne0)
$$

とします。

各値は1点なのでコンパクトです。

グラフも閉です。実際、

$$
(x_n,y_n)\in\operatorname{Gr}(\Gamma),
\qquad
(x_n,y_n)\to(x,y)
$$

とします。

$x\ne0$ なら最終的に $x_n\ne0$ で

$$
y_n=\frac1{x_n}\to\frac1x,
$$

したがって $y=1/x$ です。

$x=0$ の場合、もし $x_n\ne0$ が無限回現れ、その部分列でも $y_n\to y\in\mathbb R$ なら

$$
x_ny_n=1
$$

の極限から

$$
0\cdot y=1
$$

となって矛盾します。従って収束するグラフ上の列は最終的に $(0,0)$ 側に来るしかなく、

$$
y=0.
$$

よってグラフは閉です。

しかし $x=0$ で上半連続ではありません。

$$
V=(-1,1)
$$

は

$$
\Gamma(0)=\{0\}
$$

を含む開集合です。

どんな $\delta>0$ に対しても

$$
0<|x|<\min\{\delta,1\}
$$

となる $x$ を取れば

$$
\left|\frac1x\right|>1.
$$

従って

$$
\Gamma(x)\not\subset V.
$$

ここでは $x\to0$ のとき値 $1/x$ が無限遠へ逃げます。終域がコンパクトなら、この逃げ方はできません。

---

## 8. 対応の下半連続性は「値をたどれる」と言い換えられる

対応の下半連続性には、距離空間で使いやすい点列判定があります。

<a id="prop-fix2-lhc-sequential"></a>

<!-- formal-statement-start -->
> **命題（対応の下半連続性の点列判定）**  
> $(X,d_X),(Y,d_Y)$ を距離空間とし、
>
$$
\Gamma:X\rightrightarrows Y
$$
>
> を非空値対応とする。$x\in X$ を固定する。
>
> 次の二条件は同値である。
>
> 1. $\Gamma$ は $x$ で対応の下半連続性を満たす。
> 2. 任意の点列 $x_n\to x$ と任意の $y\in\Gamma(x)$ に対し、各 $n$ で
>
$$
y_n\in\Gamma(x_n)
$$
>
> となる点列 $(y_n)$ を選んで
>
$$
y_n\to y
$$
>
> とできる。
<!-- formal-statement-end -->

### 証明の見取り図

対応の下半連続性を満たすなら、$y$ の半径 $1/m$ の球は近くの値集合と必ず交わります。

入力列 $x_n\to x$ が十分近づいた段階で、半径を

$$
1,\frac12,\frac13,\dots
$$

と小さくしながら交点を選べば $y_n\to y$ を作れます。

逆に対応の下半連続性を満たさなければ、ある開集合 $V$ に対し $x_n\to x$ なのに

$$
\Gamma(x_n)\cap V=\varnothing
$$

となる列を作れます。ところが $y\in\Gamma(x)\cap V$ をたどるできるなら $y_n\to y$ なので、最終的に $y_n\in V$ となって矛盾します。

<!-- proof-start -->
### 証明

まず $\Gamma$ が $x$ で対応の下半連続性を満たすとします。

任意の

$$
x_n\to x
$$

と

$$
y\in\Gamma(x)
$$

を取ります。

各 $m\ge1$ に対し開球

$$
B_Y\left(y,\frac1m\right)
$$

は $\Gamma(x)$ と交わります。

対応の下半連続性より、ある $\delta_m>0$ が存在して

$$
d_X(x',x)<\delta_m
$$

なら

$$
\Gamma(x')
\cap
B_Y\left(y,\frac1m\right)
\ne\varnothing.
$$

必要なら

$$
\delta_m
$$

を

$$
\min\left\{
\delta_1,\dots,\delta_m,\frac1m
\right\}
$$

で置き換えることで、

$$
\delta_1\ge\delta_2\ge\cdots>0,
\qquad
\delta_m\le\frac1m
$$

としてよいです。

$x_n\to x$ なので、各 $m$ について、十分大きい $n$ では

$$
d_X(x_n,x)<\delta_m.
$$

$n$ が十分大きいとき、

$$
m(n)
=
\max
\left\{
1\le m\le n:
d_X(x_n,x)<\delta_m
\right\}
$$

と置きます。

固定した $m$ に対して、十分大きい $n$ では条件

$$
d_X(x_n,x)<\delta_m
$$

が成り立つので

$$
m(n)\to\infty.
$$

各十分大きい $n$ について

$$
y_n
\in
\Gamma(x_n)
\cap
B_Y\left(y,\frac1{m(n)}\right)
$$

を一つ選びます。

初めの有限個の $n$ については、非空値性から任意に

$$
y_n\in\Gamma(x_n)
$$

を選びます。

すると十分大きい $n$ で

$$
d_Y(y_n,y)
<
\frac1{m(n)}
\to0.
$$

従って

$$
y_n\to y.
$$

これで 1 から 2 を示しました。

逆に 2 を仮定し、$\Gamma$ が $x$ で対応の下半連続性を満たさないとします。

すると、ある開集合 $V\subset Y$ が存在して

$$
\Gamma(x)\cap V\ne\varnothing
$$

ですが、どんな $\delta>0$ を取っても

$$
d_X(x',x)<\delta,
\qquad
\Gamma(x')\cap V=\varnothing
$$

となる $x'$ が存在します。

$$
y\in\Gamma(x)\cap V
$$

を一つ固定します。

各 $n$ について

$$
d_X(x_n,x)<\frac1n,
\qquad
\Gamma(x_n)\cap V=\varnothing
$$

となる $x_n$ を取ります。

すると

$$
x_n\to x.
$$

条件 2 より

$$
y_n\in\Gamma(x_n),
\qquad
y_n\to y
$$

となる列を取れます。

$V$ は開で $y\in V$ なので、十分大きい $n$ で

$$
y_n\in V.
$$

すると

$$
y_n\in\Gamma(x_n)\cap V
$$

となり、

$$
\Gamma(x_n)\cap V=\varnothing
$$

に矛盾します。

従って $\Gamma$ は $x$ で対応の下半連続性を満たします。
<!-- proof-end -->

この命題は「対応の下半連続性」を非常に具体的にします。

> 基準点のどの値 $y$ も、近くの入力に対して選び直した値 $y_n$ でたどるできる。

---

## 9. 対応の上半連続性と対応の下半連続性は互いに代用できない

### 9.1 対応の上半連続性を満たすが対応の下半連続性を満たさない

すでに見た

$$
B(q)
=
\begin{cases}
\{0\}, & q<1/2,\\
[0,1], & q=1/2,\\
\{1\}, & q>1/2
\end{cases}
$$

が例です。

同点 $q=1/2$ では値集合が広がります。近くへ動いても値はその大きな集合 $[0,1]$ から外へ出ないので上半連続ですが、内部の値 $1/2$ は少し動くと消えるので対応の下半連続性を満たしません。

### 9.2 対応の下半連続性を満たすが上半連続性を満たさない

$$
L(x)
=
\begin{cases}
\{0\}, & x\le0,\\
\{0,1\}, & x>0
\end{cases},
\qquad
x\in[-1,1]
$$

を考えます。

$x=0$ で

$$
L(0)=\{0\}.
$$

$0$ を含む任意の開集合 $V$ に対し、すべての近くの $x'$ で

$$
0\in L(x')
$$

なので

$$
L(x')\cap V\ne\varnothing.
$$

従って対応の下半連続性を満たします。

しかし相対位相で

$$
V=[0,1/2)
$$

は $Y=[0,1]$ の開集合で

$$
L(0)\subset V.
$$

どれほど $0$ に近い正の $x'$ を取っても

$$
1\in L(x')
$$

なので

$$
L(x')\not\subset V.
$$

従って上半連続ではありません。

この二例を並べると、

$$
\boxed{
\text{対応の上半連続性}
\not\Rightarrow
\text{対応の下半連続性},
\qquad
\text{対応の下半連続性}
\not\Rightarrow
\text{対応の上半連続性}
}
$$

が分かります。

---

## 10. 対応の不動点

FIX1 の不動点を集合値へ拡張します。

<a id="def-fix2-correspondence-fixed-point"></a>

<!-- formal-statement-start -->
> **定義（対応の不動点）**  
> 集合 $C$ 上の自己対応
>
$$
\Gamma:C\rightrightarrows C
$$
>
> に対し、
>
$$
x^*\in\Gamma(x^*)
$$
>
> を満たす $x^*\in C$ を $\Gamma$ の **不動点**という。
<!-- formal-statement-end -->

1点値対応

$$
\Gamma_f(x)=\{f(x)\}
$$

では

$$
x\in\Gamma_f(x)
\iff
x=f(x).
$$

したがって、これは [FIX1 の通常の不動点](../FIX1/index.md#def-fix1-fixed-point)の正確な拡張です。

<!-- definition-example-start: def-fix2-correspondence-fixed-point -->
**定義の確認**：不動点が区間全体になる例

$$
C=[0,1],
\qquad
\Gamma(x)
=
\left[0,\frac{x+1}{3}\right]
$$

とします。

不動点条件は

$$
x\in
\left[0,\frac{x+1}{3}\right].
$$

$x\in[0,1]$ なので左側の条件 $x\ge0$ は自動的に満たされ、残る条件は

$$
x\le\frac{x+1}{3}.
$$

従って

$$
3x\le x+1,
$$

すなわち

$$
x\le\frac12.
$$

よって不動点全体は

$$
\left[0,\frac12\right]
$$

です。

一点値写像と違い、不動点が一つとは限らず、集合として現れることもあります。
<!-- definition-example-end -->

後続の Kakutani 不動点定理は、有限次元の非空コンパクト凸集合 $C$ 上で、おおまかに

- 非空値
- コンパクト値
- 凸値
- 上半連続

を持つ自己対応に不動点が存在することを保証します。

本章ではその各仮定を「読める・検算できる」状態にしました。定理そのものと証明は FIX3 で扱います。

---

## 11. 最適反応対応：同点で値集合が広がる

対応が必要になる最小のゲーム理論例を見ます。

プレイヤーが

$$
p\in[0,1]
$$

を選び、相手側の状態を

$$
q\in[0,1]
$$

とします。利得を

$$
u(p,q)=p(2q-1)
$$

とします。

$q$ を固定したとき、

$$
B(q)
=
\operatorname*{arg\,max}_{0\le p\le1}
u(p,q)
$$

を最適反応対応とします。

$q<1/2$ なら

$$
2q-1<0
$$

なので $u(p,q)$ は $p$ の減少関数で、最大化点は

$$
p=0.
$$

$q>1/2$ なら

$$
2q-1>0
$$

なので最大化点は

$$
p=1.
$$

$q=1/2$ なら

$$
u(p,1/2)=0
$$

がすべての $p\in[0,1]$ で同じなので、全点が最適です。

従って

$$
B(q)
=
\begin{cases}
\{0\}, & q<1/2,\\
[0,1], & q=1/2,\\
\{1\}, & q>1/2.
\end{cases}
$$

となります。

ここで各値は

- 非空
- コンパクト
- 凸

です。

またグラフは

$$
\{(q,0):q<1/2\}
\cup
\left(\left\{\frac12\right\}\times[0,1]\right)
\cup
\{(q,1):q>1/2\}
$$

です。

グラフ上の収束列を取ると、$q\to1/2$ の極限で現れ得る値は $[0,1]$ の中にすべて含まれているので、グラフは閉です。

終域 $[0,1]$ はコンパクトですから、[コンパクト終域における上半連続性と閉グラフ](#cor-fix2-uhc-closed-graph)より $B$ は上半連続です。

一方、すでに確認した通り $q=1/2$ では対応の下半連続性を満たしません。

これがゲーム理論でよく起こる形です。

> **最適化問題の解が一意でない点では、最適反応は一点値写像ではなく対応になる。**

---

## 12. 需要対応：価格の同点でも同じ現象が起こる

二財の消費束

$$
x=(x_1,x_2)\in\mathbb R_+^2
$$

を考えます。

効用を

$$
u(x_1,x_2)=x_1+x_2,
$$

所得を $1$、第2財の価格を $1$、第1財の価格を

$$
p\in\left[\frac12,2\right]
$$

とします。

予算制約は

$$
px_1+x_2\le1.
$$

需要対応を

$$
D(p)
=
\operatorname*{arg\,max}
\left\{
x_1+x_2:
x_1,x_2\ge0,\ 
px_1+x_2\le1
\right\}
$$

とします。

### 12.1 $p<1$

第1財は1単位の効用を得る費用が $p<1$、第2財は $1$ です。

したがって予算をすべて第1財へ使い、

$$
D(p)=\left\{\left(\frac1p,0\right)\right\}.
$$

### 12.2 $p>1$

今度は第2財の方が安いので、

$$
D(p)=\{(0,1)\}.
$$

### 12.3 $p=1$

予算境界は

$$
x_1+x_2=1
$$

であり、その上では効用もすべて $1$ です。

従って

$$
D(1)
=
\{(t,1-t):0\le t\le1\}.
$$

まとめると

$$
D(p)
=
\begin{cases}
\{(1/p,0)\}, & p<1,\\[3pt]
\{(t,1-t):0\le t\le1\}, & p=1,\\[3pt]
\{(0,1)\}, & p>1.
\end{cases}
$$

です。

各値は非空・コンパクト・凸です。

また

$$
p\in[1/2,2]
$$

なら

$$
0\le x_1\le2,
\qquad
0\le x_2\le1,
$$

なので終域をコンパクト集合

$$
Y=[0,2]\times[0,1]
$$

に制限できます。

グラフが閉であることも直接確認できます。

$$
p_n\to p,
\qquad
x^{(n)}\in D(p_n),
\qquad
x^{(n)}\to x
$$

とします。

$p<1$ なら十分大きい $n$ で $p_n<1$ なので

$$
x^{(n)}
=
\left(\frac1{p_n},0\right)
\to
\left(\frac1p,0\right)\in D(p).
$$

$p>1$ も同様です。

$p=1$ では、

- $p_n<1$ の部分列から来る極限は $(1,0)$、
- $p_n>1$ の部分列から来る極限は $(0,1)$、
- $p_n=1$ の部分列から来る極限は線分
  $$
  \{(t,1-t):0\le t\le1\}
  $$
  上

です。

いずれも $D(1)$ に入ります。

従ってグラフは閉であり、[閉グラフと上半連続性の同値](#cor-fix2-uhc-closed-graph)から $D$ は上半連続です。

一方 $p=1$ の内部需要、例えば

$$
\left(\frac12,\frac12\right)
$$

は $p\ne1$ へ少し動かすと消えます。従って $p=1$ では対応の下半連続性を満たしません。

最適反応と需要で同じ構造が現れました。

$$
\boxed{
\text{最大化問題}
\Longrightarrow
\operatorname*{arg\,max}\text{ は対応}
\Longrightarrow
\text{同点で値集合が広がる}
}
$$

FIX3 の Berge の最大値定理は、この現象を一般のパラメータ付き最大化問題で扱います。

---

## 13. 何を区別すればよいか

本章で混同しやすいものをまとめます。

### 13.1 値集合とグラフ

- コンパクト値：各 $\Gamma(x)$ がコンパクト。
- グラフがコンパクト：$\operatorname{Gr}(\Gamma)$ 全体がコンパクト。

前者から後者は一般には出ません。

### 13.2 凸値と凸グラフ

- 凸値：各縦切片 $\Gamma(x)$ が凸。
- 凸グラフ：$X\times Y$ 内でグラフ全体が凸。

一点値の放物線で見たように、凸値でもグラフが凸とは限りません。

### 13.3 対応の上半連続性と対応の下半連続性

- 上半連続：遠い値の突然出現を防ぐ。
- 対応の下半連続性：既存の値の突然消失を防ぐ。

一方から他方は一般には出ません。

### 13.4 閉グラフと上半連続

コンパクト終域では、コンパクト値対応について

$$
\text{上半連続}
\iff
\text{閉グラフ}
$$

とできます。

しかし非コンパクト終域では

$$
\Gamma(x)=\{1/x\}
$$

型の「値が無限遠へ逃げる」反例があるため、閉グラフだけでは足りません。

---

# 演習

## Level A

<a id="ex-fix2-a01"></a>

### FIX2-A01 グラフと値集合を読む

- Level: A
- 目安時間: 12分

$$
\Gamma:[0,1]\rightrightarrows[-1,1],
\qquad
\Gamma(x)=[-x,x]
$$

とする。

1. $\operatorname{Gr}(\Gamma)$ を不等式で表せ。
2. $\Gamma$ が非空値・コンパクト値・凸値であることを定義から確認せよ。
3. $\operatorname{Gr}(\Gamma)$ が閉集合であることを点列で示せ。

<!-- solution-start -->
#### 詳細解答

1. $y\in\Gamma(x)$ は

$$
-x\le y\le x
$$

と同値です。

従って

$$
\boxed{
\operatorname{Gr}(\Gamma)
=
\{(x,y):0\le x\le1,\ -x\le y\le x\}.
}
$$

2. 任意の $x\in[0,1]$ について

$$
0\in[-x,x]
$$

なので非空です。

$[-x,x]$ は実数の閉区間なので閉かつ有界です。[Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)よりコンパクトです。

さらに

$$
u,v\in[-x,x],
\qquad
0\le t\le1
$$

なら

$$
-x
=
t(-x)+(1-t)(-x)
\le
tu+(1-t)v
\le
tx+(1-t)x
=
x.
$$

従って

$$
tu+(1-t)v\in[-x,x].
$$

よって凸値です。

3. グラフ上の収束列

$$
(x_n,y_n)\to(x,y)
$$

を取ります。

各 $n$ で

$$
0\le x_n\le1,
\qquad
-x_n\le y_n\le x_n.
$$

極限を取ると

$$
0\le x\le1,
\qquad
-x\le y\le x.
$$

従って

$$
(x,y)\in\operatorname{Gr}(\Gamma).
$$

よってグラフは閉集合です。
<!-- solution-end -->

<a id="ex-fix2-a02"></a>

### FIX2-A02 二つの半連続性を区別する

- Level: A
- 目安時間: 15分

終域を $Y=[0,1]$ とする。

$$
\Gamma_1(x)
=
\begin{cases}
\{0\}, & x<0,\\
\{0,1\}, & x=0,\\
\{1\}, & x>0
\end{cases}
$$

と

$$
\Gamma_2(x)
=
\begin{cases}
\{0\}, & x\le0,\\
\{0,1\}, & x>0
\end{cases}
$$

を $[-1,1]$ 上で考える。

$x=0$ において、それぞれが対応の上半連続性と対応の下半連続性の有無を判定せよ。

<!-- solution-start -->
#### 詳細解答

まず $\Gamma_1$ を考えます。

$$
\Gamma_1(0)=\{0,1\}.
$$

$\Gamma_1(0)$ 全体を含む $Y$ の開集合は $Y$ 自身です。従って近くの全ての $x'$ で

$$
\Gamma_1(x')\subset Y
$$

なので上半連続です。

一方、

$$
V=[0,1/2)
$$

は $Y$ の相対位相で開で、

$$
\Gamma_1(0)\cap V\ne\varnothing.
$$

しかし $x'>0$ なら

$$
\Gamma_1(x')=\{1\}
$$

なので

$$
\Gamma_1(x')\cap V=\varnothing.
$$

どれほど $x'>0$ を0へ近づけてもこの状況は変わりません。従って $\Gamma_1$ は0で対応の下半連続性を満たしません。

次に $\Gamma_2$ を考えます。

$$
\Gamma_2(0)=\{0\}.
$$

$0$ と交わる任意の開集合 $V$ に対し、近くの全ての $x'$ で

$$
0\in\Gamma_2(x')
$$

なので

$$
\Gamma_2(x')\cap V\ne\varnothing.
$$

従って対応の下半連続性を満たします。

しかし

$$
V=[0,1/2)
$$

は

$$
\Gamma_2(0)=\{0\}
$$

を含みます。

任意の $\delta>0$ に対し

$$
0<x'<\delta
$$

を取ると

$$
1\in\Gamma_2(x'),
$$

従って

$$
\Gamma_2(x')\not\subset V.
$$

よって上半連続ではありません。

結論は

$$
\boxed{
\Gamma_1:\ \text{対応の上半連続性を満たすが対応の下半連続性を満たさない},
}
$$

$$
\boxed{
\Gamma_2:\ \text{対応の下半連続性を満たすが上半連続性を満たさない}.
}
$$
<!-- solution-end -->

<a id="ex-fix2-a03"></a>

### FIX2-A03 閉グラフから上半連続性を判定する

- Level: A
- 目安時間: 12分

$$
\Gamma:[0,1]\rightrightarrows[0,1],
\qquad
\Gamma(x)=[0,x]
$$

とする。

1. グラフが閉であることを点列で示せ。
2. 本章の系を使って $\Gamma$ が上半連続であることを示せ。

<!-- solution-start -->
#### 詳細解答

1. グラフ上の列

$$
(x_n,y_n)\to(x,y)
$$

を取ります。

各 $n$ で

$$
0\le y_n\le x_n\le1.
$$

実数の不等式は極限で保存されるので

$$
0\le y\le x\le1.
$$

従って

$$
y\in[0,x]=\Gamma(x).
$$

よって

$$
(x,y)\in\operatorname{Gr}(\Gamma)
$$

であり、グラフは閉です。

2. 終域

$$
Y=[0,1]
$$

はコンパクトです。

また各値 $[0,x]$ は非空コンパクトです。

従って [コンパクト終域における上半連続性と閉グラフ](#cor-fix2-uhc-closed-graph)を適用でき、

$$
\boxed{
\Gamma\text{ は上半連続}
}
$$

と分かります。
<!-- solution-end -->

<a id="ex-fix2-a04"></a>

### FIX2-A04 対応の不動点を全部求める

- Level: A
- 目安時間: 10分

$$
C=[0,1],
\qquad
\Gamma(x)
=
\left[\frac{x}{4},\frac{x+2}{4}\right]
$$

とする。

$$
x\in\Gamma(x)
$$

を満たすすべての $x$ を求めよ。

<!-- solution-start -->
#### 詳細解答

不動点条件は

$$
\frac{x}{4}
\le
x
\le
\frac{x+2}{4}
$$

です。

左側は

$$
x\ge0
$$

なら

$$
\frac{x}{4}\le x
$$

なので、$C=[0,1]$ 上では自動的に成り立ちます。

右側は

$$
x\le\frac{x+2}{4}
$$

なので

$$
4x\le x+2.
$$

従って

$$
3x\le2,
$$

すなわち

$$
x\le\frac23.
$$

よって不動点全体は

$$
\boxed{
\left[0,\frac23\right]
}
$$

です。
<!-- solution-end -->

---

## Level B

<a id="ex-fix2-b01"></a>

### FIX2-B01 1点値対応の連続性を定義から再構成する

- Level: B
- 目安時間: 20分

距離空間間の写像

$$
f:X\to Y
$$

に対し

$$
\Gamma_f(x)=\{f(x)\}
$$

とする。

$x\in X$ を固定し、次を定義から示せ。

1. $\Gamma_f$ が $x$ で上半連続なら $f$ は $x$ で連続である。
2. $\Gamma_f$ が $x$ で対応の下半連続性を満たすなら $f$ は $x$ で連続である。

<!-- solution-start -->
#### 詳細解答

1. $f(x)$ の任意の開近傍 $V\subset Y$ を取ります。

$$
f(x)\in V
$$

なので

$$
\Gamma_f(x)=\{f(x)\}\subset V.
$$

$\Gamma_f$ は $x$ で上半連続だから、ある $\delta>0$ が存在して

$$
d_X(x',x)<\delta
$$

なら

$$
\Gamma_f(x')\subset V.
$$

ところが

$$
\Gamma_f(x')=\{f(x')\}
$$

なので

$$
f(x')\in V.
$$

従って、$f(x)$ の任意の開近傍 $V$ に対し、$x'$ を十分 $x$ に近づければ $f(x')\in V$ となります。これは $f$ の $x$ における連続性です。

2. 再び $f(x)$ の任意の開近傍 $V$ を取ります。

$$
f(x)\in V
$$

なので

$$
\Gamma_f(x)\cap V
=
\{f(x)\}\ne\varnothing.
$$

対応の下半連続性より、ある $\delta>0$ が存在して

$$
d_X(x',x)<\delta
$$

なら

$$
\Gamma_f(x')\cap V\ne\varnothing.
$$

$\Gamma_f(x')$ は1点集合なので、これは

$$
f(x')\in V
$$

と同値です。

従って $f$ は $x$ で連続です。
<!-- solution-end -->

<a id="ex-fix2-b02"></a>

### FIX2-B02 閉グラフだけでは足りない

- Level: B
- 目安時間: 25分

$$
\Gamma:\mathbb R\rightrightarrows\mathbb R
$$

を

$$
\Gamma(0)=\{0\},
\qquad
\Gamma(x)=\left\{\frac1x\right\}
\quad(x\ne0)
$$

で定める。

1. 各値がコンパクトであることを示せ。
2. $\operatorname{Gr}(\Gamma)$ が閉であることを示せ。
3. $\Gamma$ が0で上半連続でないことを示せ。
4. 「閉グラフなら上半連続」の証明のどこが使えなくなっているか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 各値は1点集合です。距離空間の有限集合はコンパクトなので、$\Gamma$ はコンパクト値です。

2. グラフ上の収束列

$$
(x_n,y_n)\to(x,y)
$$

を取ります。

$x\ne0$ なら十分大きい $n$ で $x_n\ne0$ なので

$$
y_n=\frac1{x_n}\to\frac1x.
$$

従って

$$
y=\frac1x\in\Gamma(x).
$$

$x=0$ とします。

もし $x_n\ne0$ となる項が無限個あり、その部分列を取ると、そこで

$$
x_ny_n=1.
$$

しかし

$$
x_n\to0,
\qquad
y_n\to y\in\mathbb R
$$

なので積の極限は

$$
x_ny_n\to0\cdot y=0.
$$

これは $x_ny_n=1$ に矛盾します。

従って、収束するグラフ上の列で $x_n\to0$ なら、最終的には $x_n=0$ でなければならず、

$$
y_n=0.
$$

従って

$$
y=0\in\Gamma(0).
$$

よってグラフは閉です。

3.

$$
V=(-1,1)
$$

を取ると

$$
\Gamma(0)=\{0\}\subset V.
$$

しかし任意の $\delta>0$ に対して

$$
0<|x|<\min\{\delta,1\}
$$

となる $x$ を選べば

$$
\left|\frac1x\right|>1.
$$

従って

$$
\Gamma(x)\not\subset V.
$$

よって0で上半連続ではありません。

4. 閉グラフから上半連続性を証明するときは、反例列

$$
y_n\in\Gamma(x_n)\setminus V
$$

から収束部分列を取るために終域 $Y$ のコンパクト性を使いました。

ここでは

$$
y_n=\frac1{x_n}
$$

が無限遠へ逃げ、$\mathbb R$ 内に収束部分列を持たない場合があります。

したがって、閉グラフ性を使える極限点そのものが得られません。

壊れている機構は

$$
\boxed{
\text{終域のコンパクト性による極限抽出}
}
$$

です。
<!-- solution-end -->

<a id="ex-fix2-b03"></a>

### FIX2-B03 最適反応対応を導いて半連続性を調べる

- Level: B
- 目安時間: 25分

$$
u(p,q)=p(2q-1),
\qquad
p,q\in[0,1]
$$

とする。

$$
B(q)
=
\operatorname*{arg\,max}_{0\le p\le1}
u(p,q)
$$

を定める。

1. $B(q)$ を $q<1/2$, $q=1/2$, $q>1/2$ に分けて求めよ。
2. $B$ が非空コンパクト値・凸値であることを示せ。
3. グラフが閉であることを示し、$B$ が上半連続であることを導け。
4. $q=1/2$ で対応の下半連続性を満たさないことを示せ。

<!-- solution-start -->
#### 詳細解答

1. $q$ を固定すると

$$
u(p,q)=(2q-1)p
$$

は $p$ の一次関数です。

$q<1/2$ なら係数が負なので

$$
p=0
$$

で最大です。

$q>1/2$ なら係数が正なので

$$
p=1
$$

で最大です。

$q=1/2$ なら

$$
u(p,1/2)=0
$$

がすべての $p$ で同じなので

$$
[0,1]
$$

全体が最大化点です。

従って

$$
\boxed{
B(q)
=
\begin{cases}
\{0\}, & q<1/2,\\
[0,1], & q=1/2,\\
\{1\}, & q>1/2.
\end{cases}
}
$$

2. $\{0\}$、$\{1\}$、$[0,1]$ はすべて非空コンパクト凸集合です。よって $B$ は非空コンパクト値・凸値です。

3. グラフ上の収束列

$$
(q_n,p_n)\to(q,p)
$$

を取ります。

$q<1/2$ なら十分大きい $n$ で $q_n<1/2$ なので $p_n=0$、従って $p=0\in B(q)$ です。

$q>1/2$ も同様に $p=1\in B(q)$ です。

$q=1/2$ なら、全ての $p_n$ は $[0,1]$ に属し、その極限 $p$ も $[0,1]$ に属します。従って

$$
p\in B(1/2).
$$

よってグラフは閉です。

終域 $[0,1]$ はコンパクトで、$B$ はコンパクト値なので、[コンパクト終域における上半連続性と閉グラフ](#cor-fix2-uhc-closed-graph)から $B$ は上半連続です。

4.

$$
V=(0.4,0.6)
$$

を取ります。

$$
B(1/2)=[0,1]
$$

なので

$$
B(1/2)\cap V\ne\varnothing.
$$

しかし $q<1/2$ なら $B(q)=\{0\}$、$q>1/2$ なら $B(q)=\{1\}$ なので、$q\ne1/2$ では十分近くても

$$
B(q)\cap V=\varnothing.
$$

従って $q=1/2$ で対応の下半連続性を満たしません。
<!-- solution-end -->

---

## Level C

<a id="ex-fix2-c01"></a>

### FIX2-C01 連続な端点から作る区間対応

- Level: C
- 目安時間: 40分

連続関数

$$
a,b:[0,1]\to\mathbb R
$$

が

$$
a(x)\le b(x)
\qquad
(0\le x\le1)
$$

を満たすとする。

$$
\Gamma(x)=[a(x),b(x)]
$$

と定める。

1. $\Gamma$ が非空コンパクト値・凸値であることを示せ。
2. ある $M>0$ が存在して、すべての $x$ で
   $$
   \Gamma(x)\subset[-M,M]
   $$
   とできることを示せ。
3. $\operatorname{Gr}(\Gamma)$ が閉であることを示せ。
4. $\Gamma$ が上半連続であることを示せ。
5. 任意の $x_n\to x$ と任意の $y\in\Gamma(x)$ に対して
   $$
   y_n
   =
   \min\{\max\{y,a(x_n)\},\,b(x_n)\}
   $$
   と置く。この $y_n$ が
   $$
   y_n\in\Gamma(x_n),
   \qquad
   y_n\to y
   $$
   を満たすことを示せ。
6. 対応の下半連続性の点列判定を使って、$\Gamma$ が対応の下半連続性を満たすことを示せ。

<!-- solution-start -->
#### 詳細解答

1. 仮定

$$
a(x)\le b(x)
$$

より区間

$$
[a(x),b(x)]
$$

は非空です。

閉区間なので閉かつ有界であり、$\mathbb R$ の [Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)によりコンパクトです。

さらに

$$
u,v\in[a(x),b(x)],
\qquad
0\le t\le1
$$

なら

$$
a(x)
\le
tu+(1-t)v
\le
b(x).
$$

従って各値は凸です。

よって $\Gamma$ は非空コンパクト値・凸値です。

2. $a,b$ はコンパクト集合 $[0,1]$ 上の連続関数です。

[コンパクト集合の連続像](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-03)より

$$
a([0,1]),
\qquad
b([0,1])
$$

は $\mathbb R$ のコンパクト集合です。

[Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)により、これらは有界です。従ってある $M>0$ が存在して、すべての $x\in[0,1]$ について

$$
|a(x)|<M,
\qquad
|b(x)|<M
$$

とできます。

$y\in[a(x),b(x)]$ なら $y$ は二端点の間にあるので

$$
|y|\le\max\{|a(x)|,|b(x)|\}<M.
$$

従って

$$
\Gamma(x)\subset[-M,M].
$$

3. グラフ上の収束列

$$
(x_n,y_n)\to(x,y)
$$

を取ります。

$$
y_n\in\Gamma(x_n)
$$

なので

$$
a(x_n)\le y_n\le b(x_n).
$$

$a,b$ は連続だから

$$
a(x_n)\to a(x),
\qquad
b(x_n)\to b(x).
$$

また $y_n\to y$ です。

不等式の極限を取ると

$$
a(x)\le y\le b(x).
$$

従って

$$
y\in\Gamma(x).
$$

よってグラフは閉です。

4. 第2問から終域をコンパクト距離空間

$$
Y=[-M,M]
$$

に制限できます。

第1問から $\Gamma$ は非空コンパクト値で、第3問からグラフは閉です。

従って [コンパクト終域における上半連続性と閉グラフ](#cor-fix2-uhc-closed-graph)を適用して

$$
\boxed{
\Gamma\text{ は上半連続}
}
$$

を得ます。

5. 定義から

$$
\max\{y,a(x_n)\}\ge a(x_n).
$$

さらに

$$
y_n
=
\min\{\max\{y,a(x_n)\},b(x_n)\}
\le b(x_n).
$$

下側について場合分けします。

もし

$$
\max\{y,a(x_n)\}\le b(x_n)
$$

なら

$$
y_n=\max\{y,a(x_n)\}\ge a(x_n).
$$

もし

$$
\max\{y,a(x_n)\}>b(x_n)
$$

なら

$$
y_n=b(x_n)\ge a(x_n),
$$

最後の不等式は $a(x_n)\le b(x_n)$ から従います。

従って常に

$$
a(x_n)\le y_n\le b(x_n),
$$

つまり

$$
y_n\in\Gamma(x_n).
$$

次に収束を示します。

$$
y\in\Gamma(x)
$$

なので

$$
a(x)\le y\le b(x).
$$

連続性から

$$
a(x_n)\to a(x),
\qquad
b(x_n)\to b(x).
$$

関数

$$
(r,s)\mapsto\max\{r,s\},
\qquad
(r,s)\mapsto\min\{r,s\}
$$

は連続です。

したがって

$$
\max\{y,a(x_n)\}
\to
\max\{y,a(x)\}
=
y,
$$

ここで $a(x)\le y$ を使いました。

さらに

$$
y_n
=
\min\{\max\{y,a(x_n)\},b(x_n)\}
\to
\min\{y,b(x)\}
=
y,
$$

ここで $y\le b(x)$ を使いました。

よって

$$
\boxed{
y_n\to y.
}
$$

6. 任意の

$$
x_n\to x
$$

と任意の

$$
y\in\Gamma(x)
$$

に対し、第5問で

$$
y_n\in\Gamma(x_n),
\qquad
y_n\to y
$$

となる列を具体的に構成できました。

従って [対応の下半連続性の点列判定](#prop-fix2-lhc-sequential)の条件を満たし、

$$
\boxed{
\Gamma\text{ は対応の下半連続性を満たす}
}
$$

です。

したがって、連続な二つの端点に挟まれた区間対応は、対応の上半連続性と対応の下半連続性の両方を満たします。
<!-- solution-end -->

---

## 14. 次へ：最大化対応と不動点

本章で得た道具を並べると、

$$
\boxed{
\text{対応}
\to
\text{非空値・コンパクト値・凸値}
\to
\text{対応の上半連続性・対応の下半連続性}
\to
\text{閉グラフ}
}
$$

という言葉が揃いました。

次の FIX3 では、パラメータ付き最大化問題

$$
M(x)
=
\operatorname*{arg\,max}_{y\in F(x)}u(x,y)
$$

に対して、

- 最大値が存在するか。
- 最大値はパラメータとともにどう変化するか。
- 最大化点集合 $M(x)$ はどの半連続性を持つか。

を Berge の最大値定理で整理します。

そのうえで、コンパクト凸集合上の自己対応

$$
\Gamma:C\rightrightarrows C
$$

に対し

$$
x\in\Gamma(x)
$$

を保証する Kakutani 不動点定理へ進みます。

FIX1 の [Brouwer 不動点定理](../FIX1/index.md#cor-fix1-brouwer-convex)が一点値の存在定理だったのに対し、FIX3 ではそれを集合値へ拡張する準備が整いました。
