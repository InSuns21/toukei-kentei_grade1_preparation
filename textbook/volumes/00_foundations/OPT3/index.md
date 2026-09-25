# OPT3 閉真凸関数・劣微分・法錐

<!-- definition-example-audit: strict -->

OPT1 では凸集合・凸関数を、OPT2 では射影・支持超平面・分離を整えました。本章ではその二つをつなぎ、**微分できない凸最適化でも使える一次情報**を作ります。

中心となる流れは

$$
\boxed{
\text{拡張実数値関数}
\longrightarrow
\text{エピグラフと閉性}
\longrightarrow
\text{劣微分}
\longrightarrow
\text{法錐・接錐}
\longrightarrow
\text{制約付き最適性}
}
$$

です。最後には、有限値凸関数 $f$ を凸集合 $C$ 上で最小化する条件を

$$
\boxed{
0\in\partial f(x^\ast)+N_C(x^\ast)
}
$$

という一行へまとめます。ただし、この式を最初から公式として使うのではなく、各項がどこから来るかを順に構成します。

> **この章の停止線**
>
> Fenchel 共役・Fenchel--Young の不等式・双対問題・KKT 乗数はまだ使いません。OPT4 以降では、本章で構成する非滑らかな一次情報と実行可能集合の一次幾何を既知として双対性へ進みます。

---

## 1. 制約を $+\infty$ へ埋め込む

通常の実数値関数だけを考えると、

$$
\min_{x\in C} f(x)
$$

の「関数」と「実行可能集合」は別々の対象です。凸解析では $+\infty$ を許して、この二つを一つの関数へまとめます。

<a id="def-opt3-effective-domain-proper"></a>
<!-- formal-statement-start -->
> **定義（実効定義域・真関数）**  
> 拡張実数値関数
>
$$
f:\mathbb R^n\to(-\infty,+\infty]
$$
>
> に対し、
>
$$
\operatorname{dom}f
:=
\{x\in\mathbb R^n:f(x)<+\infty\}
$$
>
> を $f$ の **実効定義域（effective domain）** という。さらに
>
$$
\operatorname{dom}f\ne\varnothing
$$
>
> のとき、本章では $f$ を **真関数（proper function）** という。
<!-- formal-statement-end -->

ここでは値域から $-\infty$ を最初から除いているため、真性で排除すべき退化は「どこでも $+\infty$」の場合です。

<a id="def-opt3-indicator"></a>
<!-- formal-statement-start -->
> **定義（標示関数）**  
> 集合 $C\subset\mathbb R^n$ に対し
>
$$
\delta_C(x)
:=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C
\end{cases}
$$
>
> と定める。この拡張実数値関数を $C$ の **標示関数（indicator function）** という。
<!-- formal-statement-end -->

すると

$$
\operatorname{dom}\delta_C=C
$$

であり、

$$
\min_{x\in C}f(x)
=
\min_{x\in\mathbb R^n}\{f(x)+\delta_C(x)\}
$$

と書けます。制約違反点へ $+\infty$ の罰を与えた、と読めばよいわけです。

<!-- definition-example-start: def-opt3-effective-domain-proper, def-opt3-indicator -->
### 1.1 定義の確認：半直線制約

**定義の確認**

$C=[0,\infty)$ とします。標示関数は

$$
\delta_C(2)=0,
\qquad
\delta_C(-2)=+\infty
$$

なので

$$
\operatorname{dom}\delta_C=[0,\infty)\ne\varnothing.
$$

したがって $\delta_C$ は真関数です。また $f(x)=x^2$ なら

$$
f(x)+\delta_C(x)
=
\begin{cases}
x^2,&x\ge0,\\
+\infty,&x<0,
\end{cases}
$$

となり、全空間上の最小化が半直線上の最小化と同じ問題になります。
<!-- definition-example-end -->

---

## 2. 拡張実数値の凸性はエピグラフで見る

<a id="def-opt3-extended-convex"></a>
<!-- formal-statement-start -->
> **定義（拡張実数値凸関数）**  
> 真関数 $f:\mathbb R^n\to(-\infty,+\infty]$ が **凸** であるとは、任意の $x,y\in\mathbb R^n$ と $0<t<1$ に対して
>
$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y)
$$
>
> が成り立つことをいう。右辺のどちらかが $+\infty$ なら不等式は自動的に成り立つ。
<!-- formal-statement-end -->

<a id="def-opt3-epigraph"></a>
<!-- formal-statement-start -->
> **定義（エピグラフ）**  
> 拡張実数値関数 $f$ に対し
>
$$
\operatorname{epi}f
:=
\{(x,r)\in\mathbb R^n\times\mathbb R:f(x)\le r\}
$$
>
> を $f$ の **エピグラフ（epigraph）** という。
<!-- formal-statement-end -->

グラフそのものではなく、グラフの上側を全部取る点が重要です。関数の不等式を、一つ上の次元の集合の幾何へ変換できます。

<a id="thm-opt3-epigraph-convexity"></a>
<!-- formal-statement-start -->
> **定理（エピグラフによる凸性判定）**  
> 真関数 $f:\mathbb R^n\to(-\infty,+\infty]$ について、
>
$$
f\text{ が凸}
\iff
\operatorname{epi}f\text{ が凸集合}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

エピグラフ上の二点 $(x,r),(y,s)$ を混ぜると、その高さは $(1-t)r+ts$ です。関数の凸不等式が「混ぜた点もエピグラフに残る」という集合の凸性へそのまま翻訳されます。

<!-- proof-start -->
### 証明

$f$ が凸とします。$(x,r),(y,s)\in\operatorname{epi}f$ なら

$$
f(x)\le r,\qquad f(y)\le s.
$$

$0<t<1$ に対して

$$
\begin{aligned}
f((1-t)x+ty)
&\le
(1-t)f(x)+tf(y)\\
&\le
(1-t)r+ts.
\end{aligned}
$$

したがって

$$
((1-t)x+ty,(1-t)r+ts)
\in\operatorname{epi}f
$$

であり、エピグラフは凸です。

逆に $\operatorname{epi}f$ が凸とします。$x,y\in\operatorname{dom}f$ なら

$$
(x,f(x)),(y,f(y))\in\operatorname{epi}f.
$$

よって

$$
((1-t)x+ty,(1-t)f(x)+tf(y))
\in\operatorname{epi}f,
$$

すなわち

$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y).
$$

$x$ または $y$ が実効定義域の外なら右辺は $+\infty$ なので不等式は自動的です。したがって $f$ は凸です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-opt3-extended-convex, def-opt3-epigraph -->
### 2.1 定義の確認：$x^2$ のエピグラフ

**定義の確認**

$f(x)=x^2$ なら

$$
\operatorname{epi}f
=
\{(x,r):r\ge x^2\}.
$$

二点 $(x,r),(y,s)$ がこの集合に属するとき

$$
((1-t)x+ty)^2
\le
(1-t)x^2+ty^2
\le
(1-t)r+ts,
$$

なので凸結合もエピグラフに残ります。これで関数の凸性とエピグラフの凸性を同じ計算で確認できます。
<!-- definition-example-end -->

---

## 3. 下半連続性は「エピグラフが閉じる」こと

最小化列の極限で関数値が突然下へ抜けると、極限点へ最小値を渡せません。その落下を防ぐ条件を次に定義します。

<a id="def-opt3-lsc"></a>
<!-- formal-statement-start -->
> **定義（下半連続）**  
> 拡張実数値関数 $f$ が点 $x$ で **下半連続** であるとは、任意の点列 $x_k\to x$ に対して
>
$$
f(x)
\le
\liminf_{k\to\infty}f(x_k)
$$
>
> が成り立つことをいう。すべての $x$ で下半連続なとき、単に $f$ は下半連続であるという。
<!-- formal-statement-end -->

<a id="thm-opt3-lsc-closed-epi"></a>
<!-- formal-statement-start -->
> **定理（下半連続性と閉エピグラフ）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ について、
>
$$
f\text{ が下半連続}
\iff
\operatorname{epi}f\text{ が閉集合}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

「下半連続 $\Rightarrow$ 閉」はエピグラフ内の収束列へ $\liminf$ を適用します。逆向きでは $\liminf$ を実現する部分列をエピグラフの点列へ持ち上げます。

<!-- proof-start -->
### 証明

まず $f$ が下半連続とします。$(x_k,r_k)\in\operatorname{epi}f$ かつ

$$
(x_k,r_k)\to(x,r)
$$

とします。$f(x_k)\le r_k$ なので

$$
f(x)
\le
\liminf_{k\to\infty}f(x_k)
\le
\lim_{k\to\infty}r_k
=
r.
$$

したがって $(x,r)\in\operatorname{epi}f$ であり、エピグラフは閉です。

逆にエピグラフが閉とします。$x_k\to x$ とし

$$
\alpha=\liminf_{k\to\infty}f(x_k)
$$

と置きます。$\alpha\in\mathbb R$ なら部分列 $x_{k_j}$ を

$$
f(x_{k_j})\to\alpha
$$

となるように選べます。このとき

$$
(x_{k_j},f(x_{k_j}))
\to
(x,\alpha).
$$

各点はエピグラフに属し、[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、エピグラフは閉なので $(x,\alpha)\in\operatorname{epi}f$。したがって

$$
f(x)\le\alpha.
$$

$\alpha=+\infty$ なら主張は自動的です。

$\alpha=-\infty$ は起こりません。もし起これば任意の $M\in\mathbb R$ に対して部分列を取り

$$
f(x_{k_j})\le M
$$

とできます。よって $(x_{k_j},M)\in\operatorname{epi}f$ であり、閉性から $(x,M)\in\operatorname{epi}f$。すると $f(x)\le M$ がすべての実数 $M$ で成り立ち、値域が $(-\infty,+\infty]$ であることに矛盾します。

以上より常に

$$
f(x)\le\liminf_{k\to\infty}f(x_k)
$$

が成り立ちます。$\square$
<!-- proof-end -->

<a id="def-opt3-closed-convex"></a>
<!-- formal-statement-start -->
> **定義（閉真凸関数）**  
> 真・凸・下半連続の三条件を満たす拡張実数値関数を **閉真凸関数（closed proper convex function）** という。
<!-- formal-statement-end -->

<a id="def-opt3-sublevel"></a>
<!-- formal-statement-start -->
> **定義（劣位集合）**  
> $\alpha\in\mathbb R$ に対し
>
$$
L_\alpha(f)
:=
\{x\in\mathbb R^n:f(x)\le\alpha\}
$$
>
> を $f$ の $\alpha$-**劣位集合（sublevel set）** という。
<!-- formal-statement-end -->

凸関数の劣位集合は凸です。また下半連続関数の劣位集合は閉です。後者は

$$
L_\alpha(f)
=
\{x:(x,\alpha)\in\operatorname{epi}f\}
$$

と見ても分かります。

<a id="def-opt3-coercivity"></a>
<!-- formal-statement-start -->
> **定義（強圧性）**  
> 関数 $f:\mathbb R^n\to(-\infty,+\infty]$ が
>
$$
\|x\|\to\infty
\quad\Longrightarrow\quad
f(x)\to+\infty
$$
>
> を満たすとき、$f$ は **強圧的** である、または **強圧性** を持つという。
<!-- formal-statement-end -->

<a id="thm-opt3-direct-method"></a>
<!-- formal-statement-start -->
> **定理（有限次元の直接法）**  
> 真な下半連続関数 $f:\mathbb R^n\to(-\infty,+\infty]$ が強圧的であるとする。このとき $f$ は $\mathbb R^n$ 上で最小値を達成する。
<!-- formal-statement-end -->

凸性はこの存在定理には不要です。下半連続性が極限で値を失わないことを、強圧性が最小化列の無限遠への逃走を防ぐことを担当します。

### 証明の見取り図

真性から有限値点 $x_0$ を一つ選び、その高さ以下の劣位集合へ最小化列を閉じ込めます。下半連続性が閉性を、強圧性が有界性を与え、有限次元の Heine--Borel 定理がコンパクト性へ変換します。

<!-- proof-start -->
### 証明

$x_0\in\operatorname{dom}f$ を取り

$$
L=\{x:f(x)\le f(x_0)\}
$$

と置きます。強圧性により $L$ は有界です。実際、有界でなければ $\|x_k\|\to\infty$ かつ $x_k\in L$ となる点列を取れますが、

$$
f(x_k)\le f(x_0)
$$

は $f(x_k)\to+\infty$ に矛盾します。

下半連続性から $L$ は閉です。したがって [Heine--Borel 定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02) により $L$ はコンパクトです。

$$m=\inf_x f(x)$ と置きます。まず $m> -\infty$ を確認します。真性から $f(x_0)<+\infty$ なので $m<+\infty$ です。もし $m=-\infty$ なら、各 $k$ について

$$
f(x_k)\le \min\{f(x_0),-k\}
$$

となる $x_k$ を選べます。この点列は $L$ に入り、$L$ のコンパクト性から部分列 $x_{k_j}\to x^\ast\in L$ を持ちます。ところが下半連続性により

$$
f(x^\ast)
\le
\liminf_{j\to\infty}f(x_{k_j})
=
-\infty,
$$

となり、$f$ の値域が $(-\infty,+\infty]$ で $-\infty$ を取らないことに矛盾します。したがって

$$
m\in\mathbb R.
$$

そこで $f(x_k)\to m$ となる最小化列を取ります。十分大きい $k$ では $f(x_k)\le f(x_0)$ なので $x_k\in L$ です。コンパクト性から部分列 $x_{k_j}\to x^\ast\in L$ が存在します。下半連続性より

$$
f(x^\ast)
\le
\liminf_{j\to\infty}f(x_{k_j})
=
m.
$$

一方 $m$ は下限なので $m\le f(x^\ast)$。よって $f(x^\ast)=m$ です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-opt3-lsc, def-opt3-closed-convex, def-opt3-sublevel, def-opt3-coercivity -->
### 3.1 定義の確認：$x^2$ と閉真凸性

**定義の確認**

$f(x)=x^2$ は連続なので下半連続です。また真かつ凸ですから閉真凸関数です。さらに $|x|\to\infty$ なら $x^2\to+\infty$ なので強圧的です。

$\alpha\ge0$ なら

$$
L_\alpha(f)
=
[-\sqrt{\alpha},\sqrt{\alpha}],
$$

$\alpha<0$ なら $L_\alpha(f)=\varnothing$ です。各劣位集合は閉かつ凸です。

一方

$$
g(x)
=
\begin{cases}
1,&x=0,\\
0,&x>0,\\
+\infty,&x<0
\end{cases}
$$

は凸ですが、$x_k=1/k\to0$ に対して

$$
g(0)=1
>
0
=
\liminf g(x_k).
$$

したがって下半連続ではありません。実際 $(1/k,0)\in\operatorname{epi}g$ は $(0,0)$ へ収束しますが、$(0,0)\notin\operatorname{epi}g$ です。失った下半連続性が、エピグラフを極限で閉じる機構そのものを壊しています。
<!-- definition-example-end -->

---

## 4. 相対内部と劣勾配

実効定義域が $\mathbb R^n$ より低い次元に載ることがあります。そのとき通常の内部は空でも、定義域自身の次元で「内側」を表す概念が必要です。

<a id="def-opt3-affine-ri"></a>
<!-- formal-statement-start -->
> **定義（アフィン包・相対内部）**  
> 集合 $C\subset\mathbb R^n$ を含む最小のアフィン集合を **アフィン包** といい $\operatorname{aff}C$ と書く。$\operatorname{aff}C$ の相対位相で見た $C$ の内部を **相対内部** といい
>
$$
\operatorname{ri}C
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt3-affine-ri -->
### 4.1 定義の確認：平面内の線分

**定義の確認**

$$
C=\{(t,0):0\le t\le1\}\subset\mathbb R^2
$$

なら、$\mathbb R^2$ での内部は空です。一方

$$
\operatorname{aff}C
=
\{(t,0):t\in\mathbb R\}
$$

は $x$ 軸であり、その中では

$$
\operatorname{ri}C
=
\{(t,0):0<t<1\}.
$$

低次元の凸集合でも端点以外を「内部」として扱えることを直接確認できます。
<!-- definition-example-end -->

<a id="def-opt3-subgradient"></a>
<!-- formal-statement-start -->
> **定義（劣勾配・劣微分）**  
> 真な拡張実数値凸関数 $f$ と $x\in\operatorname{dom}f$ を考える。ベクトル $p\in\mathbb R^n$ が
>
$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x)
\qquad(\forall y\in\mathbb R^n)
$$
>
> を満たすとき、$p$ を $x$ における **劣勾配** という。劣勾配全体を
>
$$
\partial f(x)
$$
>
> と書き、$x$ における **劣微分** という。$x\notin\operatorname{dom}f$ では $\partial f(x)=\varnothing$ とする。
<!-- formal-statement-end -->

これは「グラフを下から支えるアフィン関数の傾き」です。微分可能性を要求していないので、角のある関数でも一次情報を失いません。

<!-- definition-example-start: def-opt3-subgradient -->
### 4.2 定義の確認：$f(x)=|x|$ の原点

**定義の確認**

$p\in\partial f(0)$ である条件は

$$
|y|\ge py
\qquad(\forall y\in\mathbb R)
$$

です。$y>0$ から $p\le1$、$y<0$ から $p\ge-1$。逆に $-1\le p\le1$ なら両符号の $y$ で不等式が成り立つので

$$
\boxed{
\partial |\cdot|(0)=[-1,1].
}
$$

一点の勾配の代わりに、原点を支えられる傾きが区間として残ります。
<!-- definition-example-end -->

<a id="thm-opt3-subgradient-existence-ri"></a>
<!-- formal-statement-start -->
> **定理（相対内部における劣勾配の存在）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸関数とする。すると
>
$$
x\in\operatorname{ri}(\operatorname{dom}f)
\quad\Longrightarrow\quad
\partial f(x)\ne\varnothing.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$A=\operatorname{aff}(\operatorname{dom}f)$ の中だけで考えます。閉真凸性によりエピグラフは閉凸集合です。境界点 $(x,f(x))$ を支持する超平面を取り、相対内部性を使ってその超平面が「鉛直だけを向く」退化を排除します。

<!-- proof-start -->
### 証明

$A=\operatorname{aff}(\operatorname{dom}f)$ とし、$A$ を有限次元 Euclid 空間と同一視します。閉真凸性から

$$
E=\operatorname{epi}f\cap(A\times\mathbb R)
$$

は非空閉凸集合です。

$(x,f(x))$ は $E$ の境界点です。[有限次元の支持超平面定理](../OPT2/index.md#thm-opt2-supporting-hyperplane) を $A\times\mathbb R$ に適用すると、$(p,\beta)\ne0$ が存在して

$$
p^{\mathsf T}(y-x)
+
\beta(r-f(x))
\le0
\qquad
((y,r)\in E)
$$

となります。

$E$ は上向きに無限に伸びるので $\beta\le0$ です。もし $\beta=0$ なら

$$
p^{\mathsf T}(y-x)\le0
\qquad
(y\in\operatorname{dom}f).
$$

$x\in\operatorname{ri}(\operatorname{dom}f)$ なので、$A$ の方向 $h$ を十分小さく取れば $x+h$ と $x-h$ の両方が実効定義域に入ります。両方を代入すると

$$
p^{\mathsf T}h=0
$$

が $A$ の全方向で成り立つので $p=0$。これは $(p,\beta)\ne0$ に矛盾します。したがって $\beta<0$ です。

$-\beta$ で割って鉛直係数を $-1$ に正規化すると

$$
p^{\mathsf T}(y-x)
-
(r-f(x))
\le0.
$$

$r=f(y)$ を代入して

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x)
\qquad
(y\in\operatorname{dom}f).
$$

実効定義域外では左辺が $+\infty$ なので同じ不等式は自動的です。よって $p\in\partial f(x)$ です。$\square$
<!-- proof-end -->

---

## 5. Fermat 条件：最小点では 0 が支える

<a id="thm-opt3-fermat"></a>
<!-- formal-statement-start -->
> **定理（凸関数の Fermat 条件）**  
> 真な凸関数 $f$ と $x^\ast\in\operatorname{dom}f$ に対して
>
$$
x^\ast\text{ が }f\text{ の大域最小点}
\iff
0\in\partial f(x^\ast)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

劣勾配の定義へ $p=0$ を入れるだけです。微分可能な場合の $\nabla f(x^\ast)=0$ が、微分不能点までそのまま拡張されています。

<!-- proof-start -->
### 証明

$0\in\partial f(x^\ast)$ なら、すべての $y$ に対して

$$
f(y)
\ge
f(x^\ast)+0^{\mathsf T}(y-x^\ast)
=
f(x^\ast),
$$

したがって $x^\ast$ は大域最小点です。

逆に $x^\ast$ が大域最小点なら

$$
f(y)\ge f(x^\ast)
=
f(x^\ast)+0^{\mathsf T}(y-x^\ast)
$$

がすべての $y$ で成り立つので $0\in\partial f(x^\ast)$ です。$\square$
<!-- proof-end -->

例えば $f(x)=|x|$ では

$$
0\in[-1,1]=\partial f(0)
$$

なので、微分不能な原点が最小点であることを一次条件だけで判定できます。

---

## 6. 有限値凸関数は局所的に扱いやすい

この先の方向微分・和則・最大値公式では、まず

$$
f:\mathbb R^n\to\mathbb R
$$

という有限値凸関数を扱います。有限次元では、この仮定だけで連続性が得られます。

<a id="lem-opt3-finite-convex-lipschitz"></a>
<!-- formal-statement-start -->
> **補題（有限値凸関数の局所 Lipschitz 連続性）**  
> 有限値凸関数 $f:\mathbb R^n\to\mathbb R$ は各点の近傍で Lipschitz 連続である。
<!-- formal-statement-end -->

### 証明の見取り図

一点の周囲に小さい立方体を取り、その有限個の頂点での関数値から立方体全体の上界を作ります。反対側の点との中点不等式で下界も作れます。上下に有界な凸関数は、さらに小さい立方体では傾きが一様に抑えられます。

<!-- proof-start -->
### 証明

$x_0\in\mathbb R^n$ を固定し、$r>0$ を取ります。立方体

$$
Q=x_0+[-2r,2r]^n
$$

の $2^n$ 個の頂点を $v_1,\dots,v_{2^n}$ とし

$$
M=\max_j f(v_j)
$$

と置きます。$Q$ の任意の点は頂点の凸結合なので凸性から

$$
f(x)\le M
\qquad(x\in Q).
$$

内側の立方体 $Q_1=x_0+[-r,r]^n$ で $x\in Q_1$ とし、$y=2x_0-x$ と置くと $y\in Q_1\subset Q$ かつ $x_0=(x+y)/2$ です。したがって

$$
f(x_0)
\le
\frac{f(x)+f(y)}2
\le
\frac{f(x)+M}{2},
$$

ゆえに

$$
f(x)\ge 2f(x_0)-M.
$$

よって $Q_1$ 上で $|f|$ はある定数 $B$ 以下です。

さらに $x,y\in Q_2=x_0+[-r/4,r/4]^n$ とします。$x\ne y$ のとき $u=(y-x)/\|y-x\|$ とし、$x$ から $u$ 方向へ $Q_1$ の境界まで進んだ点を $z$ とします。$x$ は $Q_1$ の境界から一様に正の距離を持つため、ある定数 $\rho>0$ が $x,y$ に依らず存在して

$$
y=(1-\lambda)x+\lambda z,
\qquad
0\le\lambda\le\frac{\|y-x\|}{\rho}.
$$

凸性から

$$
f(y)-f(x)
\le
\lambda(f(z)-f(x))
\le
\frac{2B}{\rho}\|y-x\|.
$$

$x,y$ を入れ替えると逆向きも得られ、

$$
|f(y)-f(x)|
\le
\frac{2B}{\rho}\|y-x\|.
$$

したがって $f$ は $x_0$ の近傍で Lipschitz 連続です。$\square$
<!-- proof-end -->

<a id="def-opt3-directional-derivative"></a>
<!-- formal-statement-start -->
> **定義（凸関数の方向微分）**  
> 有限値凸関数 $f:\mathbb R^n\to\mathbb R$、点 $x$、方向 $d$ に対し
>
$$
f'(x;d)
:=
\lim_{t\downarrow0}
\frac{f(x+td)-f(x)}{t}
$$
>
> を $x$ における $d$ 方向の **方向微分** という。
<!-- formal-statement-end -->

凸性により、この極限は常に有限値として存在します。実際、1変数凸関数

$$
g(t)=f(x+td)
$$

の割線の傾き

$$
\frac{g(t)-g(0)}t
$$

は $t>0$ について単調非減少です。また $-1<0<t\le1$ の割線の傾きと比較すれば

$$
f(x)-f(x-d)
\le
\frac{f(x+td)-f(x)}t
\le
f(x+d)-f(x),
$$

なので極限は有限です。

<!-- definition-example-start: def-opt3-directional-derivative -->
### 6.1 定義の確認：絶対値の方向微分

**定義の確認**

$f(x)=|x|$、$x=0$ なら

$$
\frac{|td|-0}{t}=|d|
\qquad(t>0),
$$

したがって

$$
f'(0;d)=|d|.
$$

原点では通常の微分はありませんが、各方向の片側微分は完全に定まります。
<!-- definition-example-end -->

<a id="thm-opt3-directional-support"></a>
<!-- formal-statement-start -->
> **定理（方向微分の支持関数表示）**  
> 有限値凸関数 $f:\mathbb R^n\to\mathbb R$ に対し、任意の $x,d$ で
>
$$
\boxed{
f'(x;d)
=
\max_{p\in\partial f(x)}p^{\mathsf T}d
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\phi(d)=f'(x;d)$ は有限値の劣線形関数です。そのエピグラフを点 $(d_0,\phi(d_0))$ で支持すると、支持超平面の傾き $p$ が $\phi$ を全方向で下から支え、しかも $d_0$ で等号になります。最後に凸関数の割線と右微分を比較して $p\in\partial f(x)$ を得ます。

<!-- proof-start -->
### 証明

$$
\phi(d)=f'(x;d)
$$

と置きます。$\lambda\ge0$ に対する正の斉次性

$$
\phi(\lambda d)=\lambda\phi(d)
$$

は定義から従います。また

$$
x+t(d_1+d_2)
=
\frac12(x+2td_1)+\frac12(x+2td_2)
$$

なので凸性から

$$
f(x+t(d_1+d_2))
\le
\frac12 f(x+2td_1)+\frac12 f(x+2td_2).
$$

$f(x)$ を引き $t$ で割って $t\downarrow0$ とすると

$$
\phi(d_1+d_2)
\le
\phi(d_1)+\phi(d_2).
$$

したがって $\phi$ は有限値劣線形関数です。

劣線形性から

$$
\phi(u)-\phi(v)\le\phi(u-v),
\qquad
\phi(v)-\phi(u)\le\phi(v-u).
$$

有限個の基底方向 $\pm e_i$ での値を使えば $\phi(w)$ と $\phi(-w)$ は $\|w\|_1$ の定数倍で抑えられるので、$\phi$ は連続です。よって

$$
E=\operatorname{epi}\phi
$$

は閉凸集合です。

方向 $d_0$ を固定します。$(d_0,\phi(d_0))$ は $E$ の境界点なので、[有限次元の支持超平面定理](../OPT2/index.md#thm-opt2-supporting-hyperplane) により $(a,\beta)\ne0$ が存在して

$$
a^{\mathsf T}d+\beta r
\le
a^{\mathsf T}d_0+\beta\phi(d_0)
\qquad((d,r)\in E).
$$

$E$ は上向きに無限に伸びるので $\beta\le0$ です。もし $\beta=0$ なら $a^{\mathsf T}(d-d_0)\le0$ が全ての $d$ で成り立ち $a=0$ となるので矛盾です。したがって $\beta<0$。$-\beta$ で割って $\beta=-1$ とします。

さらに $E$ は錐で $(0,0)\in E$ です。右辺を

$$
c=a^{\mathsf T}d_0-\phi(d_0)
$$

と置くと、$(0,0)$ の代入から $0\le c$。一方 $(\lambda d_0,\lambda\phi(d_0))\in E$ を $\lambda>1$ で代入すると $\lambda c\le c$ なので $c\le0$。よって $c=0$ です。

したがって全ての $d$ に対して

$$
a^{\mathsf T}d\le\phi(d),
$$

かつ

$$
a^{\mathsf T}d_0=\phi(d_0).
$$

凸関数の割線の傾きは右微分以上なので

$$
\phi(d)
\le
f(x+d)-f(x).
$$

したがって

$$
f(x+d)
\ge
f(x)+a^{\mathsf T}d.
$$

$y=x+d$ と置けば $a\in\partial f(x)$ です。よって

$$
\max_{p\in\partial f(x)}p^{\mathsf T}d_0
\ge
a^{\mathsf T}d_0
=
\phi(d_0).
$$

逆に $p\in\partial f(x)$ なら $t>0$ に対し

$$
f(x+td)-f(x)\ge t\,p^{\mathsf T}d,
$$

したがって $t\downarrow0$ で

$$
p^{\mathsf T}d\le\phi(d).
$$

両向きを合わせて主張を得ます。$\square$
<!-- proof-end -->

---

## 7. 劣微分の計算法

[方向微分の支持関数表示](#thm-opt3-directional-support)があると、劣微分の集合を「全方向で同じ支持値を持つ凸集合」として比較できます。

<a id="thm-opt3-sum-rule"></a>
<!-- formal-statement-start -->
> **定理（有限値凸関数の劣微分和則）**  
> 有限値凸関数 $f,g:\mathbb R^n\to\mathbb R$ に対し、任意の $x$ で
>
$$
\boxed{
\partial(f+g)(x)
=
\partial f(x)+\partial g(x)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

一方向は二つの劣勾配不等式を足すだけです。逆向きは、もし $\partial(f+g)(x)$ に Minkowski 和の外の点があれば、OPT2 の厳密分離で一つの方向 $d$ を作り、方向微分の支持値と矛盾させます。

<!-- proof-start -->
### 証明

$p_f\in\partial f(x)$、$p_g\in\partial g(x)$ なら、任意の $y$ に対し

$$
f(y)\ge f(x)+p_f^{\mathsf T}(y-x),
$$

$$
g(y)\ge g(x)+p_g^{\mathsf T}(y-x).
$$

足せば

$$
(f+g)(y)
\ge
(f+g)(x)+(p_f+p_g)^{\mathsf T}(y-x),
$$

したがって

$$
\partial f(x)+\partial g(x)
\subset
\partial(f+g)(x).
$$

逆向きを示します。[方向微分の支持関数表示](#thm-opt3-directional-support)により $\partial f(x)$ と $\partial g(x)$ は非空です。また劣勾配の定義から閉凸集合であり、局所 Lipschitz 連続性を使うと有界です。実際 $x$ の小球上で $|f(y)-f(x)|\le L\|y-x\|$ なら、$p\in\partial f(x)$ と単位ベクトル $u$ に対し $y=x+\varepsilon u$ を代入して

$$
\varepsilon p^{\mathsf T}u
\le
f(x+\varepsilon u)-f(x)
\le
L\varepsilon.
$$

$u=p/\|p\|$ とすれば $\|p\|\le L$ です。よって両劣微分はコンパクトで、その和

$$
A=\partial f(x)+\partial g(x)
$$

も非空コンパクト凸集合です。

$p\in\partial(f+g)(x)$ だが $p\notin A$ と仮定します。[点と閉凸集合の厳密分離](../OPT2/index.md#thm-opt2-point-separation) により、ある方向 $d$ が存在して

$$
p^{\mathsf T}d
>
\sup_{q\in A}q^{\mathsf T}d.
$$

右辺は

$$
\begin{aligned}
\sup_{q\in A}q^{\mathsf T}d
&=
\max_{p_f\in\partial f(x)}p_f^{\mathsf T}d
+
\max_{p_g\in\partial g(x)}p_g^{\mathsf T}d\\
&=
f'(x;d)+g'(x;d)\\
&=
(f+g)'(x;d).
\end{aligned}
$$

一方 $p\in\partial(f+g)(x)$ なら方向微分の定義から

$$
p^{\mathsf T}d
\le
(f+g)'(x;d),
$$

矛盾です。よって逆包含も成立します。$\square$
<!-- proof-end -->

拡張実数値関数同士では、実効定義域の位置関係によってこの等式が壊れることがあります。相対内部条件などの **制約想定** が必要になる一般形は後続章で扱います。

<a id="thm-opt3-max-rule"></a>
<!-- formal-statement-start -->
> **定理（max 関数の劣微分公式）**  
> 有限個の有限値凸関数 $f_1,\dots,f_m$ に対し
>
$$
h(x)=\max_{1\le i\le m}f_i(x),
\qquad
I(x)=\{i:f_i(x)=h(x)\}
$$
>
> と置く。このとき
>
$$
\boxed{
\partial h(x)
=
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$x$ で最大値に達していない関数には正の隙間があります。有限値凸関数は連続なので、十分小さい近傍ではその隙間が残り、方向微分には active な関数だけが寄与します。あとは和則と同じく支持関数と分離で集合を同定します。

<!-- proof-start -->
### 証明

まず $p_i\in\partial f_i(x)$ $(i\in I(x))$、$\alpha_i\ge0$、$\sum_{i\in I(x)}\alpha_i=1$ とします。任意の $y$ に対して

$$
\begin{aligned}
h(y)
&\ge
\sum_{i\in I(x)}\alpha_i f_i(y)\\
&\ge
\sum_{i\in I(x)}\alpha_i
\left(
f_i(x)+p_i^{\mathsf T}(y-x)
\right)\\
&=
h(x)
+
\left(
\sum_{i\in I(x)}\alpha_i p_i
\right)^{\mathsf T}(y-x).
\end{aligned}
$$

したがって

$$
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
\subset
\partial h(x).
$$

逆向きです。$j\notin I(x)$ なら

$$
h(x)-f_j(x)>0.
$$

関数が有限個で各 $f_i$ は連続なので、十分小さい $t>0$ では $j\notin I(x)$ の関数は最大値を取りません。したがって

$$
h'(x;d)
=
\max_{i\in I(x)}f_i'(x;d).
$$

$$
A=
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
$$

と置きます。各劣微分は非空コンパクトなので $A$ も非空コンパクト凸です。[方向微分の支持関数表示](#thm-opt3-directional-support)から

$$
\begin{aligned}
\sup_{q\in A}q^{\mathsf T}d
&=
\max_{i\in I(x)}
\max_{p_i\in\partial f_i(x)}p_i^{\mathsf T}d\\
&=
\max_{i\in I(x)}f_i'(x;d)\\
&=
h'(x;d).
\end{aligned}
$$

$p\in\partial h(x)$ だが $p\notin A$ なら、OPT2 の厳密分離からある $d$ について

$$
p^{\mathsf T}d
>
\sup_{q\in A}q^{\mathsf T}d
=
h'(x;d)
$$

となります。一方 $p\in\partial h(x)$ なら、$t>0$ に対して

$$
h(x+td)-h(x)\ge t\,p^{\mathsf T}d
$$

なので、$t\downarrow0$ とすれば $p^{\mathsf T}d\le h'(x;d)$ です。これは上の厳密不等式に矛盾します。よって $p\in A$ です。$\square$
<!-- proof-end -->

### 7.1 例：$h(x)=\max\{x,-x\}=|x|$

$x=0$ では二つとも active で、

$$
\partial(x)(0)=\{1\},
\qquad
\partial(-x)(0)=\{-1\}.
$$

したがって

$$
\partial h(0)
=
\operatorname{conv}\{-1,1\}
=
[-1,1],
$$

先ほど直接求めた絶対値の劣微分と一致します。

---

## 8. 標示関数の劣微分が法錐になる

<a id="def-opt3-normal-cone"></a>
<!-- formal-statement-start -->
> **定義（法錐）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対し
>
$$
N_C(x)
:=
\{v\in\mathbb R^n:
v^{\mathsf T}(y-x)\le0
\ \forall y\in C\}
$$
>
> を $C$ の $x$ における **法錐（normal cone）** という。$x\notin C$ では $N_C(x)=\varnothing$ とする。
<!-- formal-statement-end -->

<a id="thm-opt3-indicator-normal"></a>
<!-- formal-statement-start -->
> **定理（標示関数の劣微分は法錐）**  
> 凸集合 $C$ と $x\in C$ に対して
>
$$
\boxed{
\partial\delta_C(x)=N_C(x)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$y\notin C$ では標示関数の左辺が $+\infty$ なので劣勾配不等式は自動的です。実質的な条件は $y\in C$ だけに残り、それが法錐の定義と一致します。

<!-- proof-start -->
### 証明

$x\in C$ なので $\delta_C(x)=0$ です。$v\in\partial\delta_C(x)$ の条件は

$$
\delta_C(y)
\ge
v^{\mathsf T}(y-x)
\qquad(\forall y\in\mathbb R^n).
$$

$y\notin C$ では左辺が $+\infty$ なので自動的です。$y\in C$ では左辺が0なので

$$
v^{\mathsf T}(y-x)\le0
\qquad(\forall y\in C).
$$

これは $v\in N_C(x)$ の定義そのものです。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-opt3-normal-cone -->
### 8.1 定義の確認：半直線の法錐

**定義の確認**

$C=[0,\infty)$ とします。境界点 $x=0$ では

$$
vy\le0
\qquad(\forall y\ge0)
$$

なので

$$
N_C(0)=(-\infty,0].
$$

内点 $x>0$ では $y-x$ を正負両方向に取れるので $v=0$ しか許されず

$$
N_C(x)=\{0\}.
$$

境界では外向き方向が残り、内部では法錐が $\{0\}$ へ潰れることが分かります。
<!-- definition-example-end -->

---

## 9. 接錐・極錐・双対錐

法錐は「集合から外向きの一次情報」です。これと対になる「集合内へ動ける一次方向」を定義します。

<a id="def-opt3-tangent-cone"></a>
<!-- formal-statement-start -->
> **定義（Bouligand 接錐）**  
> 集合 $C\subset\mathbb R^n$ と $x\in C$ に対し
>
$$
T_C(x)
:=
\left\{
d:
\exists\,t_k\downarrow0,\ 
\exists\,x_k\in C,\ 
\frac{x_k-x}{t_k}\to d
\right\}
$$
>
> を $C$ の $x$ における **Bouligand 接錐（Bouligand tangent cone）** という。
<!-- formal-statement-end -->

<a id="def-opt3-polar-dual"></a>
<!-- formal-statement-start -->
> **定義（極錐・双対錐）**  
> 錐 $K\subset\mathbb R^n$ に対し
>
$$
K^\circ
:=
\{v:v^{\mathsf T}k\le0\ \forall k\in K\}
$$
>
> を **極錐（polar cone）**、
>
$$
K^\ast
:=
\{v:v^{\mathsf T}k\ge0\ \forall k\in K\}
$$
>
> を **双対錐（dual cone）** という。本章の符号規約では
>
$$
K^\circ=-K^\ast.
$$
<!-- formal-statement-end -->

文献によって極錐の符号規約は異なります。「polar」という名前だけで判断せず、不等号が $\le0$ か $\ge0$ かを確認してください。

<!-- definition-example-start: def-opt3-tangent-cone, def-opt3-polar-dual -->
### 9.1 定義の確認：半直線

**定義の確認**

$C=[0,\infty)$、$x=0$ とします。$d\ge0$ なら $x_k=t_kd\in C$ と取れるので $d\in T_C(0)$。逆に $x_k/t_k\to d$ で $x_k,t_k\ge0$ なら $d\ge0$ です。したがって

$$
T_C(0)=[0,\infty).
$$

この錐を $K$ とすると

$$
K^\circ=(-\infty,0],
\qquad
K^\ast=[0,\infty).
$$

よって

$$
K^\circ=-K^\ast.
$$

同時に前節の計算から

$$
N_C(0)=(-\infty,0]=T_C(0)^\circ
$$

も見えています。次節でこれを一般の凸集合について証明します。
<!-- definition-example-end -->

### 9.2 非負直交錐は自己双対

$K=\mathbb R_+^m$ とします。$\lambda\in K^\ast$ なら各標準基底 $e_i\in K$ を代入して

$$
\lambda_i
=
\lambda^{\mathsf T}e_i
\ge0.
$$

したがって $\lambda\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^{\mathsf T}k\ge0$ なので

$$
\boxed{
(\mathbb R_+^m)^\ast=\mathbb R_+^m.
}
$$

後の KKT 条件に現れる「乗数が非負」は、一般の錐制約では「乗数が双対錐に属する」へ置き換わります。

---

## 10. 凸集合では接錐と法錐が極双対になる

<a id="thm-opt3-tangent-conic-hull"></a>
<!-- formal-statement-start -->
> **定理（凸集合の接錐表示）**  
> $C\subset\mathbb R^n$ を凸集合、$x\in C$ とする。このとき
>
$$
\boxed{
T_C(x)
=
\overline{\operatorname{cone}(C-x)}
}
$$
>
> が成り立つ。ただし
>
$$
\operatorname{cone}(C-x)
=
\{\alpha(y-x):\alpha\ge0,\ y\in C\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一方の包含では、$d=\alpha(y-x)$ へ向かって十分小さく動けば、凸性により線分が $C$ 内に残ることを使います。逆向きは接錐の定義列そのものです。閉性は二重列から対角的に一点ずつ選んで示します。

<!-- proof-start -->
### 証明

まず

$$
d=\alpha(y-x),
\qquad
\alpha\ge0,\ y\in C
$$

とします。$\alpha=0$ なら $d=0$ であり、$x_k=x$ と取れば $d\in T_C(x)$ です。

$\alpha>0$ なら $t_k\downarrow0$ を $t_k\alpha\le1$ となるように取り

$$
x_k=x+t_kd
=
(1-t_k\alpha)x+t_k\alpha y
$$

と置きます。凸性から $x_k\in C$ で

$$
\frac{x_k-x}{t_k}=d.
$$

したがって

$$
\operatorname{cone}(C-x)\subset T_C(x).
$$

次に $T_C(x)$ が閉であることを示します。$d_m\in T_C(x)$、$d_m\to d$ とします。各 $m$ の定義列から、帰納的に

$$
0<t_m<\min\left\{\frac1m,\frac{t_{m-1}}2\right\}
$$

かつ

$$
\left\|
\frac{x_m-x}{t_m}-d_m
\right\|
<
\frac1m
$$

を満たす $x_m\in C$ を一つ選べます。これで $t_m\downarrow0$ です。また

$$
\left\|
\frac{x_m-x}{t_m}-d
\right\|
\le
\left\|
\frac{x_m-x}{t_m}-d_m
\right\|
+
\|d_m-d\|
\to0.
$$

したがって $d\in T_C(x)$。よって $T_C(x)$ は閉であり

$$
\overline{\operatorname{cone}(C-x)}
\subset T_C(x).
$$

逆に $d\in T_C(x)$ なら、ある $x_k\in C$ と $t_k\downarrow0$ が存在して

$$
\frac{x_k-x}{t_k}\to d.
$$

各項は

$$
\frac1{t_k}(x_k-x)
\in
\operatorname{cone}(C-x)
$$

なので

$$
d\in\overline{\operatorname{cone}(C-x)}.
$$

両包含から結論を得ます。$\square$
<!-- proof-end -->

さらに $C$ が凸なので $\operatorname{cone}(C-x)$ は凸錐です。したがって上の表示から

$$
T_C(x)=\overline{\operatorname{cone}(C-x)}
$$

は **閉凸錐** です。後で $T_C(x)$ に極双極定理を適用するとき、必要な「閉・凸・錐」という三条件はここで確保されています。

<a id="thm-opt3-polar-bipolar"></a>
<!-- formal-statement-start -->
> **定理（閉凸錐の極双極定理）**  
> 閉凸錐 $K\subset\mathbb R^n$ に対して
>
$$
\boxed{
K^{\circ\circ}=K
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$K\subset K^{\circ\circ}$ は定義から直ちに分かります。逆包含は、$K$ の外の点を OPT2 の閉凸錐分離で分け、その分離ベクトルが「極錐の元なのに、その外点には正に作用する」ことを使います。

<!-- proof-start -->
### 証明

$x\in K$、$v\in K^\circ$ なら定義から

$$
v^{\mathsf T}x\le0.
$$

したがって $x\in K^{\circ\circ}$ であり

$$
K\subset K^{\circ\circ}.
$$

逆に $x\notin K$ とします。[閉凸錐の分離](../OPT2/index.md#thm-opt2-cone-separation) により、ある $v$ が存在して

$$
v^{\mathsf T}k\le0
\qquad(\forall k\in K),
$$

$$
v^{\mathsf T}x>0.
$$

最初の不等式は $v\in K^\circ$ を意味します。しかし二つ目により $x$ は $K^\circ$ のすべての元に非正に作用するわけではないので

$$
x\notin K^{\circ\circ}.
$$

したがって $K^{\circ\circ}\subset K$ です。$\square$
<!-- proof-end -->

<a id="thm-opt3-normal-tangent-polar"></a>
<!-- formal-statement-start -->
> **定理（法錐と接錐の極双対）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対して
>
$$
\boxed{
N_C(x)=T_C(x)^\circ
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

法錐の元は $y-x$ に非正に作用するので、その非負倍と極限にも非正に作用します。逆向きでは $y-x$ 自身が接錐に入ることを使います。

<!-- proof-start -->
### 証明

$v\in N_C(x)$ とします。任意の $y\in C$ と $\alpha\ge0$ に対して

$$
v^{\mathsf T}\alpha(y-x)\le0.
$$

したがって $v$ は $\operatorname{cone}(C-x)$ のすべての元に非正に作用します。内積は連続なので、その閉包でも同じ不等式が成り立ちます。接錐表示から

$$
T_C(x)
=
\overline{\operatorname{cone}(C-x)}
$$

なので

$$
v\in T_C(x)^\circ.
$$

よって

$$
N_C(x)\subset T_C(x)^\circ.
$$

逆に $v\in T_C(x)^\circ$ とします。任意の $y\in C$ について

$$
y-x\in\operatorname{cone}(C-x)\subset T_C(x).
$$

したがって

$$
v^{\mathsf T}(y-x)\le0.
$$

これは $v\in N_C(x)$ の定義です。よって逆包含も成立します。$\square$
<!-- proof-end -->

### 10.1 半空間で検算する

$$
C=\{z:a^{\mathsf T}z\le b\}
$$

の境界点 $x$、すなわち $a^{\mathsf T}x=b$ では

$$
T_C(x)
=
\{d:a^{\mathsf T}d\le0\},
$$

$$
N_C(x)
=
\{\lambda a:\lambda\ge0\}.
$$

実際、前者の極錐は後者です。接方向の半空間と外向き法線の一本の半直線が極双対になっています。

---

## 11. 制約付き最適性を一行へまとめる

ここで本章冒頭の式へ戻ります。

<a id="thm-opt3-constrained-fermat"></a>
<!-- formal-statement-start -->
> **定理（凸制約付き Fermat 条件）**  
> $f:\mathbb R^n\to\mathbb R$ を有限値凸関数、$C\subset\mathbb R^n$ を非空凸集合、$x^\ast\in C$ とする。このとき
>
$$
x^\ast\in\operatorname*{arg\,min}_{x\in C}f(x)
\iff
\boxed{
0\in\partial f(x^\ast)+N_C(x^\ast)
}.
$$
<!-- formal-statement-end -->

閉性を仮定していない点にも注意してください。接錐表示に使うのは $\overline{\operatorname{cone}(C-x^\ast)}$ であり、有限値凸関数の連続性が極限を制御します。

### 証明の見取り図

十分性は、劣勾配 $p$ と法線 $n$ が $p+n=0$ を満たすなら、劣勾配不等式の一次項が $C$ 上で非負になることから直ちに従います。

必要性では、まず最小性からすべての接方向 $d$ について $f'(x^\ast;d)\ge0$ を得ます。もし $\partial f(x^\ast)$ と $-N_C(x^\ast)$ が交わらなければ、この二つを厳密分離する方向を作れます。その方向が接錐に属し、方向微分を負にしてしまうため矛盾します。

<!-- proof-start -->
### 証明

まず

$$
0\in\partial f(x^\ast)+N_C(x^\ast)
$$

とします。すると $p\in\partial f(x^\ast)$ と $n\in N_C(x^\ast)$ が存在して

$$
p+n=0.
$$

$n\in N_C(x^\ast)$ なので、任意の $y\in C$ に対して

$$
n^{\mathsf T}(y-x^\ast)\le0,
$$

したがって

$$
p^{\mathsf T}(y-x^\ast)
=
-n^{\mathsf T}(y-x^\ast)
\ge0.
$$

劣勾配不等式より

$$
f(y)
\ge
f(x^\ast)+p^{\mathsf T}(y-x^\ast)
\ge
f(x^\ast).
$$

よって $x^\ast$ は $C$ 上の大域最小点です。

逆に $x^\ast$ が $C$ 上の大域最小点とします。まず全ての $d\in T_C(x^\ast)$ について

$$
f'(x^\ast;d)\ge0
$$

を示します。

$d\in\operatorname{cone}(C-x^\ast)$ なら

$$
d=\alpha(y-x^\ast)
$$

と書けます。$\alpha=0$ なら明らかです。$\alpha>0$ なら十分小さい $t>0$ について

$$
x^\ast+td
=
(1-t\alpha)x^\ast+t\alpha y
\in C.
$$

最小性から

$$
f(x^\ast+td)-f(x^\ast)\ge0,
$$

したがって $t\downarrow0$ で

$$
f'(x^\ast;d)\ge0.
$$

方向微分 $d\mapsto f'(x^\ast;d)$ は有限値劣線形関数なので連続です。接錐表示

$$
T_C(x^\ast)
=
\overline{\operatorname{cone}(C-x^\ast)}
$$

により、この不等式は全ての $d\in T_C(x^\ast)$ へ延びます。

ここで

$$
A=\partial f(x^\ast),
\qquad
B=-N_C(x^\ast)
$$

と置きます。$A$ は非空コンパクト凸集合、$B$ は閉凸錐です。示したいのは $A\cap B\ne\varnothing$ です。

反対に $A\cap B=\varnothing$ と仮定します。差集合

$$
D=B-A
=
\{b-p:b\in B,\ p\in A\}
$$

は凸です。また $A$ がコンパクト、$B$ が閉なので $D$ も閉です。実際 $b_k-p_k\to z$ なら、$A$ のコンパクト性から部分列で $p_k\to p\in A$ とでき、その部分列では

$$
b_k=(b_k-p_k)+p_k\to z+p.
$$

$B$ の閉性から $z+p\in B$、従って $z\in D$ です。

$A\cap B=\varnothing$ なので $0\notin D$。[点と閉凸集合の厳密分離](../OPT2/index.md#thm-opt2-point-separation) を $D$ と原点へ適用すると、ある $q\ne0$ と $\beta<0$ が存在して

$$
q^{\mathsf T}(b-p)
\le
\beta
<0
\qquad
(\forall b\in B,\ \forall p\in A)
$$

となります。

$B$ は錐です。もしある $b\in B$ で $q^{\mathsf T}b>0$ なら、$tb\in B$ を $t\to\infty$ としたとき左辺は上へ発散し、上の一様上界に矛盾します。したがって

$$
q^{\mathsf T}b\le0
\qquad(\forall b\in B),
$$

すなわち

$$
q\in B^\circ=(-N_C(x^\ast))^\circ.
$$

[法錐と接錐の極双対](#thm-opt3-normal-tangent-polar)から

$$
N_C(x^\ast)=T_C(x^\ast)^\circ.
$$

また[凸集合の接錐表示](#thm-opt3-tangent-conic-hull)で確認したとおり $T_C(x^\ast)$ は閉凸錐です。したがって[閉凸錐の極双極定理](#thm-opt3-polar-bipolar)を **この接錐に適用でき**、

$$
N_C(x^\ast)^\circ
=
T_C(x^\ast)^{\circ\circ}
=
T_C(x^\ast).
$$

よって

$$
(-N_C(x^\ast))^\circ
=
-T_C(x^\ast),
$$

したがって $q=-d$ となる $d\in T_C(x^\ast)$ が存在します。

分離不等式へ $b=0$ を入れると

$$
-q^{\mathsf T}p
\le
\beta<0,
$$

すなわち

$$
p^{\mathsf T}d<0
\qquad(\forall p\in A).
$$

従って[方向微分の支持関数表示](#thm-opt3-directional-support)から

$$
f'(x^\ast;d)
=
\max_{p\in A}p^{\mathsf T}d
<0.
$$

これは $d\in T_C(x^\ast)$ に対して既に示した $f'(x^\ast;d)\ge0$ と矛盾します。

よって $A\cap B\ne\varnothing$ であり、ある $p\in\partial f(x^\ast)$ が

$$
p\in-N_C(x^\ast)
$$

を満たします。すなわち

$$
0\in\partial f(x^\ast)+N_C(x^\ast).
$$

$\square$
<!-- proof-end -->

<a id="cor-opt3-smooth-constrained"></a>
<!-- formal-statement-start -->
> **系（微分可能な場合の制約付き最適性条件）**  
> 上の定理で $f$ が $x^\ast$ で微分可能なら
>
$$
\partial f(x^\ast)=\{\nabla f(x^\ast)\}
$$
>
> なので
>
$$
x^\ast\in\operatorname*{arg\,min}_{x\in C}f(x)
\iff
-\nabla f(x^\ast)\in N_C(x^\ast).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず [OPT1 の微分可能な凸関数の一次支持不等式](../OPT1/index.md#thm-opt1-first-order-convexity)から

$$
f(y)
\ge
f(x^\ast)
+
\nabla f(x^\ast)^{\mathsf T}(y-x^\ast)
$$

なので

$$
\nabla f(x^\ast)\in\partial f(x^\ast).
$$

逆に $p\in\partial f(x^\ast)$ とします。任意の方向 $d$ と $t>0$ に対し、$y=x^\ast+td$ を劣勾配不等式へ入れると

$$
\frac{f(x^\ast+td)-f(x^\ast)}{t}
\ge
p^{\mathsf T}d.
$$

$t\downarrow0$ とすると微分可能性から

$$
\nabla f(x^\ast)^{\mathsf T}d
\ge
p^{\mathsf T}d.
$$

同じ議論を $-d$ に適用すると逆向きの不等式も得られるため

$$
p^{\mathsf T}d
=
\nabla f(x^\ast)^{\mathsf T}d
\qquad(\forall d).
$$

従って $p=\nabla f(x^\ast)$ であり、

$$
\partial f(x^\ast)
=
\{\nabla f(x^\ast)\}.
$$

これを[凸制約付き Fermat 条件](#thm-opt3-constrained-fermat)へ代入すれば

$$
0\in \nabla f(x^\ast)+N_C(x^\ast)
\iff
-\nabla f(x^\ast)\in N_C(x^\ast)
$$

を得ます。$\square$
<!-- proof-end -->

### 11.1 例：区間端点で一次条件を検算する

$$
f(x)=|x-2|,
\qquad
C=[0,1].
$$

$C$ 上では $f(x)=2-x$ なので最小点は $x^\ast=1$ です。この点では

$$
\partial f(1)=\{-1\}.
$$

また $C$ の右端なので

$$
N_C(1)=[0,\infty).
$$

したがって

$$
0=(-1)+1
\in
\partial f(1)+N_C(1).
$$

「目的関数は右へ進みたい」という傾き $-1$ と、「これ以上右へ進めない」という外向き法線 $+1$ が打ち消し合っています。

---

## 12. 何が壊れると何が失われるか

### 12.1 下半連続性を失うと極限点へ値を渡せない

§3.1 の $g$ では $(1/k,0)$ がエピグラフ内から $(0,0)$ へ近づくのに、極限点がエピグラフから落ちました。直接法で壊れるのは

$$
f(x^\ast)
\le
\liminf f(x_{k_j})
$$

という最後の一手です。

### 12.2 強圧性を失うと最小化列が逃げる

$$
f(x)=e^x
$$

は連続・凸ですが

$$
\inf_{x\in\mathbb R}e^x=0
$$

を達成しません。最小化列 $x_k=-k$ は無限遠へ逃げ、コンパクトな劣位集合へ閉じ込められません。

### 12.3 凸性を失うと接方向だけでは大域最適性を保証しない

凸制約付き Fermat 条件の十分性では、劣勾配不等式が **全ての $y$** を一度に支えることを使いました。非凸関数では局所的な一次条件を満たしても、遠くにより小さい値が存在し得ます。OPT3 の式は「凸性が局所情報を大域情報へ変える」ことの集約です。

---

## 13. 演習

### OPT3-A01 実効定義域・エピグラフ・劣位集合

- Level: A
- 目安時間: 15分

$$
f(x)=x^2+\delta_{[0,\infty)}(x)
$$

について、$\operatorname{dom}f$、$\operatorname{epi}f$、$L_\alpha(f)$ を求めよ。さらに $f$ が閉真凸関数かつ強圧的であることを確認し、[有限次元の直接法](#thm-opt3-direct-method)から最小値の達成を説明したうえで最小点を求めよ。

<!-- solution-start -->
#### 詳細解答

標示関数の定義から

$$
f(x)
=
\begin{cases}
x^2,&x\ge0,\\
+\infty,&x<0.
\end{cases}
$$

したがって

$$
\operatorname{dom}f=[0,\infty).
$$

エピグラフは有限値部分の上側なので

$$
\operatorname{epi}f
=
\{(x,r):x\ge0,\ r\ge x^2\}.
$$

これは半空間 $x\ge0$ と $r\ge x^2$ の共通部分であり凸です。また $x\ge0$ と $r\ge x^2$ はどちらも閉条件なのでエピグラフは閉です。

劣位集合は $\alpha<0$ なら空集合です。$\alpha\ge0$ なら

$$
x\ge0,\qquad x^2\le\alpha
$$

より

$$
L_\alpha(f)=[0,\sqrt\alpha].
$$

実効定義域は空でないので真、エピグラフは凸なので凸、エピグラフは閉なので下半連続です。従って $f$ は閉真凸関数です。

さらに $|x|\to\infty$ を考えると、$x\to+\infty$ では $f(x)=x^2\to+\infty$、$x\to-\infty$ では十分大きな $|x|$ で $x<0$ となり $f(x)=+\infty$ です。従って $f$ は強圧的です。

以上から[有限次元の直接法](#thm-opt3-direct-method)の仮定

- 真性
- 下半連続性
- 強圧性

が全て成立するので、$f$ は最小値を達成します。実際、実効定義域 $[0,\infty)$ 上では $f(x)=x^2$ ですから

$$
\boxed{\operatorname*{arg\,min} f=\{0\},\qquad \min f=0}.
$$
<!-- solution-end -->

### OPT3-A02 絶対値の劣微分と Fermat 条件

- Level: A
- 目安時間: 10分

$f(x)=|x|$ について $\partial f(0)$ を定義から求め、Fermat 条件で $x=0$ が大域最小点であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$p\in\partial f(0)$ の条件は

$$
|y|\ge py
\qquad(\forall y).
$$

$y>0$ では $1\ge p$、$y<0$ では $-1\le p$ が必要です。逆に $p\in[-1,1]$ なら $y\ge0$ では $py\le y=|y|$、$y<0$ では $py\le -y=|y|$ です。

したがって

$$
\partial f(0)=[-1,1].
$$

特に

$$
0\in\partial f(0).
$$

[凸関数の Fermat 条件](#thm-opt3-fermat)から $0$ は $f$ の大域最小点です。
<!-- solution-end -->

### OPT3-A03 区間の法錐

- Level: A
- 目安時間: 12分

$C=[a,b]\subset\mathbb R$ とする。$x=a$、$a<x<b$、$x=b$ の三場合について $N_C(x)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

法錐の条件は

$$
v(y-x)\le0
\qquad(\forall y\in[a,b])
$$

です。

$x=a$ では $y-a\ge0$ なので、この不等式が全ての $y$ で成り立つ条件は $v\le0$。従って

$$
N_C(a)=(-\infty,0].
$$

$a<x<b$ では $y-x$ を正負の両方に取れるため、$v=0$ しか許されません。よって

$$
N_C(x)=\{0\}.
$$

$x=b$ では $y-b\le0$ なので $v\ge0$ が必要十分です。従って

$$
N_C(b)=[0,\infty).
$$
<!-- solution-end -->

### OPT3-A04 接錐・極錐・双対錐

- Level: A
- 目安時間: 12分

$C=[0,\infty)$、$x=0$ とする。$T_C(0)$ を Bouligand の定義から求め、その極錐と双対錐を計算せよ。

<!-- solution-start -->
#### 詳細解答

$d\ge0$ なら任意の $t_k\downarrow0$ に対して

$$
x_k=t_kd\ge0
$$

と取れば

$$
\frac{x_k-0}{t_k}=d.
$$

従って $d\in T_C(0)$ です。

逆に $d\in T_C(0)$ なら $x_k\ge0$、$t_k>0$ かつ $x_k/t_k\to d$ なので $d\ge0$。したがって

$$
T_C(0)=[0,\infty).
$$

極錐は

$$
T_C(0)^\circ
=
\{v:vd\le0\ \forall d\ge0\}
=
(-\infty,0],
$$

双対錐は

$$
T_C(0)^\ast
=
\{v:vd\ge0\ \forall d\ge0\}
=
[0,\infty).
$$

従って $T_C(0)^\circ=-T_C(0)^\ast$ です。
<!-- solution-end -->

### OPT3-B01 方向微分から劣微分を復元する

- Level: B
- 目安時間: 18分

$$
f(x_1,x_2)=\max\{x_1,x_2\}
$$

について、原点での方向微分 $f'(0;d)$ を求め、[max 関数の劣微分公式](#thm-opt3-max-rule)を使って $\partial f(0)$ を求めよ。最後に

$$
f'(0;d)
=
\max_{p\in\partial f(0)}p^{\mathsf T}d
$$

を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

$d=(d_1,d_2)$ とすると $t>0$ で

$$
f(td)=t\max\{d_1,d_2\}.
$$

したがって

$$
f'(0;d)=\max\{d_1,d_2\}.
$$

二つの関数 $f_1(x)=x_1$、$f_2(x)=x_2$ は原点でともに active です。それぞれ

$$
\partial f_1(0)=\{e_1\},
\qquad
\partial f_2(0)=\{e_2\}.
$$

[max 関数の劣微分公式](#thm-opt3-max-rule)より

$$
\partial f(0)
=
\operatorname{conv}\{e_1,e_2\}
=
\{(\lambda,1-\lambda):0\le\lambda\le1\}.
$$

$p=(\lambda,1-\lambda)$ とすると

$$
p^{\mathsf T}d
=
\lambda d_1+(1-\lambda)d_2.
$$

$0\le\lambda\le1$ で最大化すれば、大きい方の成分へ全ての重みを置けばよいので

$$
\max_{p\in\partial f(0)}p^{\mathsf T}d
=
\max\{d_1,d_2\}
=
f'(0;d).
$$
<!-- solution-end -->

### OPT3-B02 和則で区分線形関数を解く

- Level: B
- 目安時間: 18分

$$
f(x)=|x|+|x-1|
$$

について $\partial f(x)$ を $x<0$、$x=0$、$0<x<1$、$x=1$、$x>1$ の各場合で求め、最小点全体を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\partial|x|
=
\begin{cases}
\{-1\},&x<0,\\
[-1,1],&x=0,\\
\{1\},&x>0,
\end{cases}
$$

また平行移動した絶対値について

$$
\partial|x-1|
=
\begin{cases}
\{-1\},&x<1,\\
[-1,1],&x=1,\\
\{1\},&x>1.
\end{cases}
$$

です。

両関数は有限値凸関数なので[有限値凸関数の劣微分和則](#thm-opt3-sum-rule)を使えます。従って

$$
\partial f(x)
=
\begin{cases}
\{-2\},&x<0,\\
[-2,0],&x=0,\\
\{0\},&0<x<1,\\
[0,2],&x=1,\\
\{2\},&x>1.
\end{cases}
$$

Fermat 条件より最小点は $0\in\partial f(x)$ を満たす点です。したがって

$$
\operatorname*{arg\,min}f=[0,1].
$$

実際この区間では $f(x)=x+(1-x)=1$ です。
<!-- solution-end -->

### OPT3-B03 半空間で接錐と法錐を結ぶ

- Level: B
- 目安時間: 20分

$$
C=\{z\in\mathbb R^n:a^{\mathsf T}z\le b\},
\qquad
a\ne0
$$

とし、境界点 $x$ で $a^{\mathsf T}x=b$ とする。

1. $T_C(x)=\{d:a^{\mathsf T}d\le0\}$ を示せ。
2. その極錐を計算し、$N_C(x)=T_C(x)^\circ$ を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

まず $d\in T_C(x)$ とします。定義より $x_k\in C$、$t_k\downarrow0$ が存在して

$$
\frac{x_k-x}{t_k}\to d.
$$

$x_k\in C$ と $a^{\mathsf T}x=b$ から

$$
a^{\mathsf T}(x_k-x)\le0.
$$

$t_k>0$ で割り極限を取ると

$$
a^{\mathsf T}d\le0.
$$

逆に $a^{\mathsf T}d\le0$ なら、任意の $t_k\downarrow0$ に対して

$$
x_k=x+t_kd
$$

と置けば

$$
a^{\mathsf T}x_k
=
b+t_k a^{\mathsf T}d
\le b.
$$

よって $x_k\in C$ で $(x_k-x)/t_k=d$。従って

$$
T_C(x)=\{d:a^{\mathsf T}d\le0\}.
$$

次に $v\in T_C(x)^\circ$ とします。$a^{\mathsf T}d=0$ を満たす $d$ なら $d$ と $-d$ の両方が接錐に入るので

$$
v^{\mathsf T}d=0.
$$

したがって $v$ は $\{d:a^{\mathsf T}d=0\}$ に直交し、ある $\lambda$ について $v=\lambda a$ と書けます。

さらに $d=-a$ は $a^{\mathsf T}d=-\|a\|^2\le0$ を満たすので

$$
v^{\mathsf T}(-a)
=
-\lambda\|a\|^2
\le0.
$$

よって $\lambda\ge0$ です。従って

$$
T_C(x)^\circ
=
\{\lambda a:\lambda\ge0\}.
$$

一方法錐の定義からも、境界点で

$$
N_C(x)=\{\lambda a:\lambda\ge0\}
$$

なので

$$
N_C(x)=T_C(x)^\circ.
$$
<!-- solution-end -->

### OPT3-C01 劣微分・法錐・接錐を一つの最適化へ統合する

- Level: C
- 目安時間: 35分

$$
f(x)=|x-2|,
\qquad
C=[0,1]
$$

を考える。

1. $C$ 上の最小点 $x^\ast$ を求めよ。
2. $\partial f(x^\ast)$、$N_C(x^\ast)$、$T_C(x^\ast)$ を求めよ。
3. $N_C(x^\ast)=T_C(x^\ast)^\circ$ を直接確認せよ。
4. $0\in\partial f(x^\ast)+N_C(x^\ast)$ を確認し、その二つの項がどの方向の力を表しているか説明せよ。
5. 標示関数を使って、この問題を全空間上の一つの拡張実数値関数の最小化として書け。

<!-- solution-start -->
#### 詳細解答

$0\le x\le1$ では $x-2<0$ なので

$$
f(x)=2-x.
$$

従って $C$ 上では $x$ が大きいほど値が小さく、唯一の最小点は

$$
x^\ast=1.
$$

この点では $x^\ast-2=-1\ne0$ なので絶対値は微分可能で

$$
\partial f(1)=\{-1\}.
$$

法錐は

$$
N_C(1)
=
\{v:v(y-1)\le0\ \forall y\in[0,1]\}.
$$

$y-1\le0$ なので条件は $v\ge0$、従って

$$
N_C(1)=[0,\infty).
$$

接錐について、$x=1$ から集合内へ一次的に動ける方向は左向きと停止だけなので

$$
T_C(1)=(-\infty,0].
$$

その極錐は

$$
T_C(1)^\circ
=
\{v:vd\le0\ \forall d\le0\}
=
[0,\infty)
=
N_C(1).
$$

また

$$
-1\in\partial f(1),
\qquad
1\in N_C(1)
$$

なので

$$
0=(-1)+1
\in
\partial f(1)+N_C(1).
$$

劣勾配 $-1$ は目的関数が右へ進むほど減少することを表します。一方、法錐の $+1$ は右向きが実行可能集合の外側であることを表します。最適点ではこの二つが打ち消し合います。

最後に標示関数を使えば

$$
\min_{x\in[0,1]}|x-2|
=
\min_{x\in\mathbb R}
\left\{
|x-2|+\delta_{[0,1]}(x)
\right\}.
$$

制約は $+\infty$ を取る標示関数へ吸収されています。
<!-- solution-end -->

---

## 14. 次に進む

本章で

$$
\boxed{
\text{閉真凸関数}
\to
\text{劣微分}
\to
\text{法錐・接錐}
\to
0\in\partial f+N_C
}
$$

までを閉じました。

次の **OPT4** では、ここで作った支持構造を関数の双対側へ移し、Fenchel 共役・Fenchel--Young の不等式・共役の双対性へ進みます。
