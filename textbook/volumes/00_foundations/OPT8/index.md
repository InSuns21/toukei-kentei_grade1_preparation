# OPT8 非滑らか・近接最適化

<!-- definition-example-audit: strict -->

[OPT7](../OPT7/index.md) では、勾配が Lipschitz 連続な凸関数に対して、降下補題から最急降下法の収束速度を導きました。しかし実務で頻出する正則化項

$$
\|x\|_1=\sum_{i=1}^n |x_i|
$$

は、座標が 0 のところで微分できません。

一方、[OPT3](../OPT3/index.md) では、微分不能な凸関数にも使える劣勾配・劣微分と

$$
0\in\partial F(x^*)
$$

という Fermat 条件を学びました。本章では、この**非滑らかな凸解析を反復アルゴリズムへ変える**ことが主題です。

中心となる問題は

$$
\min_{x\in\mathbb R^n}
F(x)
=
f(x)+g(x),
$$

ただし

- $f$ は凸で微分可能、$\nabla f$ は $L$-Lipschitz 連続、
- $g$ は閉真凸だが微分可能とは限らない、

という合成最適化です。

主線は

$$
\boxed{
\text{劣勾配法}
\to
\text{射影勾配法}
\to
\text{近接作用素}
\to
\text{Moreau 包絡}
\to
\text{ソフト閾値処理}
\to
\text{近接勾配法}
\to
\text{ISTA}
}
$$

です。

> **OPT3 / OPT7 との役割分担**  
> OPT3 は劣微分・標示関数・法錐・Fermat 条件という静的な最適性条件を担当します。OPT7 は滑らかな項 $f$ の降下補題を担当します。本章はこの二つを合流させ、反復法と収束率まで閉じます。

---

## 1. 勾配がなくても進める：劣勾配法

絶対値関数

$$
F(x)=|x|
$$

は $x=0$ で微分できません。しかし [OPT3 の劣勾配](../OPT3/index.md#def-opt3-subgradient)なら

$$
\partial |x|
=
\begin{cases}
\{-1\}, & x<0,\\
[-1,1], & x=0,\\
\{1\}, & x>0
\end{cases}
$$

と書けます。

<a id="def-opt8-subgradient-method"></a>
<!-- formal-statement-start -->
> **定義（劣勾配法）**  
> 凸関数 $F:\mathbb R^n\to\mathbb R$、初期点 $x_0$、正の歩幅列 $(\alpha_k)$ を考える。各 $k$ で
>
> $$
> s_k\in\partial F(x_k)
> $$
>
> を一つ選び、
>
> $$
> \boxed{
> x_{k+1}
> =
> x_k-\alpha_k s_k
> }
> $$
>
> と更新する方法を **劣勾配法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-subgradient-method -->
**定義の確認**：$F(x)=|x|$

$x_k>0$ なら $s_k=1$ を選べるので

$$
x_{k+1}=x_k-\alpha_k.
$$

$x_k<0$ なら $s_k=-1$ を選べるので

$$
x_{k+1}=x_k+\alpha_k.
$$

したがって反復は原点へ向かいます。ただし一定歩幅では原点を飛び越えて振動し得ます。たとえば $\alpha_k\equiv1$、$x_0=1/2$ なら

$$
\frac12
\to
-\frac12
\to
\frac12
\to\cdots
$$

です。これは「凸なら一定歩幅で必ず点として収束する」と思ってはいけない最小反例です。
<!-- definition-example-end -->

滑らかな最急降下法では、勾配そのものが局所の減少方向を与えました。劣勾配法では、その代わりに**最小点までの距離の二乗**を追います。

<a id="thm-opt8-subgradient-distance"></a>
<!-- formal-statement-start -->
> **定理（劣勾配法の基本距離評価）**  
> $F:\mathbb R^n\to\mathbb R$ を凸関数とし、最小点 $x^*$ が存在するとする。劣勾配法
>
> $$
> x_{k+1}=x_k-\alpha_k s_k,
> \qquad
> s_k\in\partial F(x_k),
> $$
>
> に対して
>
> $$
> \boxed{
> \|x_{k+1}-x^*\|^2
> \le
> \|x_k-x^*\|^2
> -2\alpha_k\bigl(F(x_k)-F(x^*)\bigr)
> +\alpha_k^2\|s_k\|^2
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

更新式を二乗展開し、内積

$$
\langle s_k,x_k-x^*\rangle
$$

を劣勾配不等式で $F(x_k)-F(x^*)$ 以上に評価するだけです。滑らかさは使いません。

<!-- proof-start -->
### 証明

更新式から

$$
x_{k+1}-x^*
=
x_k-x^*-\alpha_k s_k.
$$

よって

$$
\begin{aligned}
\|x_{k+1}-x^*\|^2
&=
\|x_k-x^*\|^2
-2\alpha_k
\langle s_k,x_k-x^*\rangle
+\alpha_k^2\|s_k\|^2.
\end{aligned}
$$

$s_k\in\partial F(x_k)$ なので、劣勾配の定義より

$$
F(x^*)
\ge
F(x_k)
+
\langle s_k,x^*-x_k\rangle.
$$

従って

$$
\langle s_k,x_k-x^*\rangle
\ge
F(x_k)-F(x^*).
$$

これを二乗展開へ代入すれば

$$
\|x_{k+1}-x^*\|^2
\le
\|x_k-x^*\|^2
-2\alpha_k(F(x_k)-F(x^*))
+\alpha_k^2\|s_k\|^2.
$$

$\square$
<!-- proof-end -->

> **仮定が働いた場所**  
> 凸性は、劣勾配不等式を大域的な関数値差へ変える一箇所で使っています。$L$-滑らかさは不要です。その代わり、次の収束率では劣勾配ノルムを別途抑える必要があります。

---

## 2. 劣勾配法の $O(1/\sqrt{k})$：なぜ滑らかな場合より遅いか

劣勾配法では一回の更新に

$$
+\alpha_k^2\|s_k\|^2
$$

という誤差項が残ります。この項が OPT7 の $O(1/k)$ より遅い速度を生みます。

<a id="thm-opt8-subgradient-best-rate"></a>
<!-- formal-statement-start -->
> **定理（劣勾配法の最良反復値評価）**  
> $F$ を凸関数、$x^*$ を最小点とする。$k=0,\ldots,K-1$ で
>
> $$
> \|s_k\|\le G,
> \qquad
> \|x_0-x^*\|\le R
> $$
>
> がある定数 $G>0$, $R>0$ について成り立つとする。一定歩幅
>
> $$
> \alpha=\frac{R}{G\sqrt K}
> $$
>
> を $K$ 回用いると
>
> $$
> \boxed{
> \min_{0\le k<K}
> \bigl(F(x_k)-F(x^*)\bigr)
> \le
> \frac{RG}{\sqrt K}.
> }
> $$
<!-- formal-statement-end -->

### 証明の見取り図

基本距離評価を $K$ 回足すと距離項が望遠鏡和になります。残る

$$
\frac{R^2}{2K\alpha}
+
\frac{\alpha G^2}{2}
$$

を、二項が釣り合うよう $\alpha=R/(G\sqrt K)$ と選びます。

<!-- proof-start -->
### 証明

[基本距離評価](#thm-opt8-subgradient-distance)を整理すると

$$
2\alpha
\bigl(F(x_k)-F(x^*)\bigr)
\le
\|x_k-x^*\|^2
-\|x_{k+1}-x^*\|^2
+\alpha^2G^2.
$$

$k=0,\ldots,K-1$ で加えると

$$
2\alpha
\sum_{k=0}^{K-1}
\bigl(F(x_k)-F(x^*)\bigr)
\le
\|x_0-x^*\|^2
-\|x_K-x^*\|^2
+
K\alpha^2G^2.
$$

右辺の第2項を捨て、$\|x_0-x^*\|\le R$ を使えば

$$
2\alpha
\sum_{k=0}^{K-1}
\bigl(F(x_k)-F(x^*)\bigr)
\le
R^2+K\alpha^2G^2.
$$

平均以上の最良反復値が一つは存在するので

$$
\min_{0\le k<K}
\bigl(F(x_k)-F(x^*)\bigr)
\le
\frac{R^2}{2K\alpha}
+
\frac{\alpha G^2}{2}.
$$

ここへ

$$
\alpha=\frac{R}{G\sqrt K}
$$

を代入すると、二項はいずれも $RG/(2\sqrt K)$ です。したがって

$$
\min_{0\le k<K}
\bigl(F(x_k)-F(x^*)\bigr)
\le
\frac{RG}{\sqrt K}.
$$

$\square$
<!-- proof-end -->

この定理は「$K$ 回だけ走らせる」と決めた有限ホライズン版です。実際には $\alpha_k\to0$ としつつ $\sum_k\alpha_k=\infty$ となる歩幅列も使われますが、本章では収束率の機構を見やすくするため上の形を基準にします。

---

## 3. 制約を毎回守る：射影勾配法

閉凸集合 $C\subset\mathbb R^n$ 上で

$$
\min_{x\in C} f(x)
$$

を解きたいとします。勾配ステップ

$$
x_k-\alpha\nabla f(x_k)
$$

は $C$ の外へ出るかもしれません。そこで [OPT2 の最近点射影](../OPT2/index.md#def-opt2-nearest-point-projection)で可行領域へ戻します。

<a id="def-opt8-projected-gradient"></a>
<!-- formal-statement-start -->
> **定義（射影勾配法）**  
> 非空閉凸集合 $C\subset\mathbb R^n$、微分可能な関数 $f$、歩幅 $\alpha>0$ に対し
>
> $$
> \boxed{
> x_{k+1}
> =
> P_C\bigl(x_k-\alpha\nabla f(x_k)\bigr)
> }
> $$
>
> と更新する方法を **射影勾配法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-projected-gradient -->
**定義の確認**：半直線 $C=[0,\infty)$

$$
f(x)=\frac12(x+1)^2
$$

とすると、無制約最小点は $-1$ ですが、制約付き最小点は $0$ です。$\alpha=1$ なら

$$
x-\nabla f(x)
=
x-(x+1)
=
-1
$$

なので

$$
x^+
=
P_{[0,\infty)}(-1)
=
0.
$$

射影が制約付き最小点へ戻しています。
<!-- definition-example-end -->

さらに、$f$ が凸で微分可能なら、制約付き最小点 $x^*\in C$ は任意の $\alpha>0$ に対して

$$
\boxed{
x^*
=
P_C\bigl(x^*-\alpha\nabla f(x^*)\bigr)
}
$$

を満たします。実際、[OPT2 の射影の変分不等式](../OPT2/index.md#thm-opt2-projection-variational-inequality)より右辺は

$$
\langle -\alpha\nabla f(x^*),y-x^*\rangle\le0
\qquad(y\in C)
$$

と同値です。$\alpha>0$ で割れば

$$
\langle \nabla f(x^*),y-x^*\rangle\ge0
\qquad(y\in C),
$$

すなわち [OPT3 の凸制約付き Fermat 条件](../OPT3/index.md#thm-opt3-constrained-fermat)です。したがって射影勾配法の不動点条件は、静的な最適性条件をそのまま反復式へ書き直したものです。

射影勾配法は、後で

$$
g=\delta_C
$$

と置けば近接勾配法の特殊例としてそのまま回収できます。ここで $\delta_C$ は OPT3 の標示関数です。

---

## 4. 二次項で非滑らかさを封じ込める：近接作用素

非滑らかな $g$ に対して、いきなり $-\partial g$ の方向へ進む代わりに

$$
g(x)
+
\frac{1}{2\lambda}\|x-v\|^2
$$

を最小化します。二次項が「$v$ から遠くへ行きすぎない」ことを罰し、同時に強凸性を加えます。

<a id="def-opt8-proximal-mapping"></a>
<!-- formal-statement-start -->
> **定義（近接作用素）**  
> $g:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸関数、$\lambda>0$ とする。各 $v\in\mathbb R^n$ に対して
>
> $$
> \boxed{
> \operatorname{prox}_{\lambda g}(v)
> =
> \operatorname*{arg\,min}_{x\in\mathbb R^n}
> \left\{
> g(x)
> +
> \frac{1}{2\lambda}\|x-v\|^2
> \right\}
> }
> $$
>
> を $g$ の **近接作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-proximal-mapping -->
**定義の確認**：二次関数

$$
g(x)=\frac{\tau}{2}\|x\|^2,
\qquad
\tau>0
$$

なら最小化する関数は

$$
\frac{\tau}{2}\|x\|^2
+
\frac{1}{2\lambda}\|x-v\|^2.
$$

微分して 0 と置くと

$$
\tau x+\frac1\lambda(x-v)=0.
$$

従って

$$
\boxed{
\operatorname{prox}_{\lambda g}(v)
=
\frac{1}{1+\lambda\tau}v.
}
$$

近接作用素は「$v$ を完全に捨てて $g$ の最小点へ飛ぶ」のではなく、二次距離との釣り合いで縮める写像です。
<!-- definition-example-end -->

<a id="thm-opt8-proximal-optimality"></a>
<!-- formal-statement-start -->
> **定理（近接作用素の存在一意性と最適性条件）**  
> $g:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸関数、$\lambda>0$、$v\in\mathbb R^n$ とする。このとき
>
> $$
> \operatorname{prox}_{\lambda g}(v)
> $$
>
> はただ一つ存在する。さらに $p\in\mathbb R^n$ について
>
> $$
> \boxed{
> p=\operatorname{prox}_{\lambda g}(v)
> \iff
> \frac{v-p}{\lambda}
> \in
> \partial g(p)
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二次項は $1/\lambda$-強凸なので、$g$ を足しても強凸性が残り、最小点は高々一つです。存在は閉性と二次項の強圧性から有限次元直接法で得られます。最後に OPT3 の Fermat 条件を使います。

<!-- proof-start -->
### 証明

関数

$$
\Phi_v(x)
=
g(x)
+
\frac{1}{2\lambda}\|x-v\|^2
$$

を考えます。

二次関数

$$
x\mapsto\frac{1}{2\lambda}\|x-v\|^2
$$

は $1/\lambda$-強凸です。$g$ は凸なので、和 $\Phi_v$ も $1/\lambda$-強凸です。従って最小点が存在すれば一意です。

また $g$ は真関数なので $\operatorname{dom}g$ は空でない凸集合です。有限次元ではその相対内部から一点 $y\in\operatorname{ri}(\operatorname{dom}g)$ を取れます。[OPT3 の相対内部における劣勾配の存在](../OPT3/index.md#thm-opt3-subgradient-existence-ri)より、ある $a\in\partial g(y)$ が存在します。劣勾配不等式から

$$
g(x)
\ge
g(y)+\langle a,x-y\rangle
=
\langle a,x\rangle+b,
\qquad
b=g(y)-\langle a,y\rangle.
$$

従って

$$
\Phi_v(x)
\ge
\langle a,x\rangle+b
+
\frac{1}{2\lambda}\|x-v\|^2.
$$

右辺は $\|x\|\to\infty$ で $+\infty$ へ発散するので $\Phi_v$ は強圧的です。さらに $g$ が閉凸だから $\Phi_v$ は下半連続です。[OPT3 の有限次元直接法](../OPT3/index.md#thm-opt3-direct-method)より最小点 $p$ が存在します。

次に最適性条件を直接示します。$p$ が $\Phi_v$ の最小点なら、任意の $x\in\operatorname{dom}g$ と $0<t\le1$ に対して

$$
p_t=p+t(x-p)
$$

と置けます。$g$ の凸性から

$$
g(p_t)\le(1-t)g(p)+tg(x)
$$

です。一方、$\Phi_v(p)\le\Phi_v(p_t)$ なので

$$
0
\le
g(p_t)-g(p)
+
\frac{1}{2\lambda}
\left(
\|p_t-v\|^2-\|p-v\|^2
\right).
$$

上の凸性評価を代入し、$p_t-p=t(x-p)$ を展開すると

$$
0
\le
t\bigl(g(x)-g(p)\bigr)
+
\frac{t}{\lambda}\langle p-v,x-p\rangle
+
\frac{t^2}{2\lambda}\|x-p\|^2.
$$

$t>0$ で割って $t\downarrow0$ とすれば

$$
g(x)
\ge
g(p)
+
\left\langle
\frac{v-p}{\lambda},
x-p
\right\rangle.
$$

従って

$$
\frac{v-p}{\lambda}\in\partial g(p).
$$

逆にこの包含が成り立つなら、任意の $x$ に対して

$$
g(x)-g(p)
\ge
\left\langle
\frac{v-p}{\lambda},
x-p
\right\rangle.
$$

二次項の差

$$
\frac{1}{2\lambda}
\left(
\|x-v\|^2-\|p-v\|^2
\right)
=
\frac1\lambda\langle p-v,x-p\rangle
+
\frac{1}{2\lambda}\|x-p\|^2
$$

を足すと一次項が相殺され、

$$
\Phi_v(x)-\Phi_v(p)
\ge
\frac{1}{2\lambda}\|x-p\|^2
\ge0.
$$

よって $p$ は $\Phi_v$ の最小点です。これは [OPT3 の Fermat 条件](../OPT3/index.md#thm-opt3-fermat)を、この「閉真凸関数 + 滑らかな二次項」の場合に和則をブラックボックス化せず直接確認したものです。

$\square$
<!-- proof-end -->

### 4.1 標示関数の近接作用素は射影

$C$ を非空閉凸集合とし、標示関数

$$
\delta_C(x)
=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C
\end{cases}
$$

を考えます。すると

$$
\operatorname{prox}_{\lambda\delta_C}(v)
=
\operatorname*{arg\,min}_{x\in C}
\frac{1}{2\lambda}\|x-v\|^2.
$$

正の定数 $1/(2\lambda)$ は最小点を変えないので

$$
\boxed{
\operatorname{prox}_{\lambda\delta_C}(v)
=
P_C(v).
}
$$

これで射影は近接作用素の一種だと分かります。

---

## 5. 近接作用素は暴れない：堅非拡大性

近接作用素を反復法に使うには、入力の摂動を増幅しすぎないことが重要です。その核心は劣微分の単調性です。

まず $u\in\partial g(x)$、$w\in\partial g(y)$ なら

$$
g(y)\ge g(x)+\langle u,y-x\rangle,
$$

$$
g(x)\ge g(y)+\langle w,x-y\rangle.
$$

足し合わせると

$$
\boxed{
\langle u-w,x-y\rangle\ge0.
}
$$

これが凸関数の劣微分の単調性です。

<a id="thm-opt8-proximal-firm"></a>
<!-- formal-statement-start -->
> **定理（近接作用素の堅非拡大性）**  
> $g$ を閉真凸関数、$\lambda>0$ とする。任意の $u,v\in\mathbb R^n$ に対し
>
> $$
> p=\operatorname{prox}_{\lambda g}(u),
> \qquad
> q=\operatorname{prox}_{\lambda g}(v)
> $$
>
> と置くと
>
> $$
> \boxed{
> \|p-q\|^2
> \le
> \langle p-q,u-v\rangle
> }
> $$
>
> が成り立つ。従って特に
>
> $$
> \|p-q\|
> \le
> \|u-v\|
> $$
>
> であり、近接作用素は 1-Lipschitz 連続である。
<!-- formal-statement-end -->

### 証明の見取り図

近接最適性条件から

$$
\frac{u-p}{\lambda}\in\partial g(p),
\qquad
\frac{v-q}{\lambda}\in\partial g(q)
$$

を得ます。これを劣微分の単調性へ代入します。

<!-- proof-start -->
### 証明

[近接最適性条件](#thm-opt8-proximal-optimality)より

$$
\frac{u-p}{\lambda}
\in
\partial g(p),
\qquad
\frac{v-q}{\lambda}
\in
\partial g(q).
$$

劣微分の単調性から

$$
\left\langle
\frac{u-p}{\lambda}
-
\frac{v-q}{\lambda},
p-q
\right\rangle
\ge0.
$$

$\lambda>0$ を掛けて整理すると

$$
\langle u-v,p-q\rangle
-
\|p-q\|^2
\ge0.
$$

従って

$$
\|p-q\|^2
\le
\langle p-q,u-v\rangle.
$$

さらに Cauchy--Schwarz の不等式より

$$
\|p-q\|^2
\le
\|p-q\|\,\|u-v\|.
$$

$p=q$ なら結論は自明で、$p\ne q$ なら $\|p-q\|$ で割って

$$
\|p-q\|
\le
\|u-v\|.
$$

$\square$
<!-- proof-end -->

「firm」は単なる非拡大性より強く、後で Moreau 包絡の勾配の Lipschitz 性を導くときに働きます。

---

## 6. Moreau 包絡：非滑らかな関数を滑らかに見る

<a id="def-opt8-moreau-envelope"></a>
<!-- formal-statement-start -->
> **定義（Moreau 包絡）**  
> $g:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸関数、$\lambda>0$ とする。
>
> $$
> \boxed{
> e_\lambda g(v)
> =
> \min_x
> \left\{
> g(x)
> +
> \frac{1}{2\lambda}\|x-v\|^2
> \right\}
> }
> $$
>
> を $g$ の **Moreau 包絡**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-moreau-envelope -->
**定義の確認**：$g(x)=|x|$

後で示すソフト閾値処理から

$$
\operatorname{prox}_{\lambda|\cdot|}(v)
=
\begin{cases}
v-\lambda,&v>\lambda,\\
0,&|v|\le\lambda,\\
v+\lambda,&v<-\lambda.
\end{cases}
$$

です。これを定義へ代入すると

$$
e_\lambda|\cdot|(v)
=
\begin{cases}
\dfrac{v^2}{2\lambda},&|v|\le\lambda,\\[6pt]
|v|-\dfrac{\lambda}{2},&|v|>\lambda.
\end{cases}
$$

原点近くの角が二次関数へ置き換わり、外側では絶対値と同じ傾きを保っています。
<!-- definition-example-end -->

<a id="thm-opt8-moreau-gradient"></a>
<!-- formal-statement-start -->
> **定理（Moreau 包絡の勾配公式）**  
> $g$ を閉真凸関数、$\lambda>0$ とする。このとき $e_\lambda g$ は全空間で微分可能で、
>
> $$
> \boxed{
> \nabla e_\lambda g(v)
> =
> \frac1\lambda
> \left(
> v-\operatorname{prox}_{\lambda g}(v)
> \right).
> }
> $$
>
> さらにこの勾配は $1/\lambda$-Lipschitz 連続である。
<!-- formal-statement-end -->

### 証明の見取り図

$p(v)=\operatorname{prox}_{\lambda g}(v)$ と置きます。$e_\lambda g(v+h)$ の最小化で $p(v)$ を試行点に使う上界と、逆に $p(v+h)$ を $v$ 側へ使う下界を作ると、一次項が

$$
\frac1\lambda\langle v-p(v),h\rangle
$$

に揃います。残差は $O(\|h\|^2)$ で抑えられます。

<!-- proof-start -->
### 証明

$p=\operatorname{prox}_{\lambda g}(v)$、$q=\operatorname{prox}_{\lambda g}(v+h)$ と置きます。

まず $v+h$ に対する最小化問題で $p$ を試行点にすると

$$
e_\lambda g(v+h)
\le
g(p)
+
\frac1{2\lambda}\|p-v-h\|^2.
$$

一方

$$
e_\lambda g(v)
=
g(p)
+
\frac1{2\lambda}\|p-v\|^2.
$$

差を取ると

$$
e_\lambda g(v+h)-e_\lambda g(v)
\le
\frac1\lambda\langle v-p,h\rangle
+
\frac1{2\lambda}\|h\|^2.
$$

逆向きに、$v$ の最小化問題で $q$ を試行点にすると

$$
e_\lambda g(v)
\le
g(q)
+
\frac1{2\lambda}\|q-v\|^2.
$$

また

$$
e_\lambda g(v+h)
=
g(q)
+
\frac1{2\lambda}\|q-v-h\|^2.
$$

従って

$$
e_\lambda g(v+h)-e_\lambda g(v)
\ge
\frac1\lambda\langle v+h-q,h\rangle
-
\frac1{2\lambda}\|h\|^2.
$$

$p(v)=p$ と書き直し、期待する一次項との差を見ます。堅非拡大性から近接作用素は 1-Lipschitz なので

$$
\|q-p\|\le\|h\|.
$$

したがって

$$
\|(v+h-q)-(v-p)\|
=
\|h-(q-p)\|
\le
2\|h\|.
$$

よって下界の一次係数のずれは

$$
\left|
\frac1\lambda
\langle
h-(q-p),h
\rangle
\right|
\le
\frac{2}{\lambda}\|h\|^2.
$$

上下界を合わせると

$$
e_\lambda g(v+h)-e_\lambda g(v)
-
\frac1\lambda\langle v-p,h\rangle
=
O(\|h\|^2).
$$

従って

$$
\nabla e_\lambda g(v)
=
\frac1\lambda(v-p).
$$

最後に $p=\operatorname{prox}_{\lambda g}(u)$、$q=\operatorname{prox}_{\lambda g}(v)$ とすると、堅非拡大性を

$$
\|p-q\|^2
\le
\langle p-q,u-v\rangle
$$

と書けます。これより

$$
\begin{aligned}
\|(u-p)-(v-q)\|^2
&=
\|u-v\|^2+\|p-q\|^2
-2\langle u-v,p-q\rangle\\
&\le
\|u-v\|^2-\|p-q\|^2\\
&\le
\|u-v\|^2.
\end{aligned}
$$

したがって

$$
\|\nabla e_\lambda g(u)-\nabla e_\lambda g(v)\|
\le
\frac1\lambda\|u-v\|.
$$

$\square$
<!-- proof-end -->

> **何が滑らかになったか**  
> 元の $g$ は微分不能でも、Moreau 包絡は微分可能です。ただし $g$ 自体を別の問題へ置き換えたわけではありません。近接点
> $$
> \operatorname{prox}_{\lambda g}(v)
> $$
> が、平滑化された関数の勾配を完全に決めています。

---

## 7. $\ell^1$ 正則化の心臓部：ソフト閾値処理

<a id="def-opt8-soft-threshold"></a>
<!-- formal-statement-start -->
> **定義（ソフト閾値処理）**  
> $\tau\ge0$ に対して、スカラー写像
>
> $$
> \boxed{
> S_\tau(t)
> =
> \operatorname{sign}(t)\max\{|t|-\tau,0\}
> }
> $$
>
> を **ソフト閾値処理（soft thresholding）**という。ベクトルに対しては各成分へ独立に適用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-soft-threshold -->
**定義の確認**

$\tau=1$ なら

$$
S_1(3)=2,
\qquad
S_1(-2)=-1,
\qquad
S_1(0.4)=0.
$$

大きな成分は絶対値を 1 だけ縮め、小さな成分はちょうど 0 に落とします。
<!-- definition-example-end -->

<a id="thm-opt8-l1-prox"></a>
<!-- formal-statement-start -->
> **定理（ℓ¹ノルムの近接作用素とソフト閾値処理）**  
> $g(x)=\tau\|x\|_1$、$\tau\ge0$ とする。このとき任意の $\lambda>0$ に対し
>
> $$
> \boxed{
> \operatorname{prox}_{\lambda g}(v)
> =
> S_{\lambda\tau}(v)
> }
> $$
>
> が成り立つ。右辺は成分ごとのソフト閾値処理である。
<!-- formal-statement-end -->

### 証明の見取り図

目的関数は座標ごとの和に分離します。したがって一変数問題

$$
\min_x
\left\{
\lambda\tau|x|
+
\frac12(x-v)^2
\right\}
$$

だけ解けば十分です。$x>0$、$x<0$、$x=0$ の三場合を劣微分条件で分けます。

<!-- proof-start -->
### 証明

近接作用素の定義から、各成分について

$$
\min_x
\left\{
\tau|x|
+
\frac1{2\lambda}(x-v)^2
\right\}
$$

を解けばよいです。

近接最適性条件は

$$
\frac{v-x}{\lambda}
\in
\tau\partial|x|
$$

です。

$x>0$ なら $\partial|x|=\{1\}$ なので

$$
\frac{v-x}{\lambda}=\tau,
$$

従って

$$
x=v-\lambda\tau.
$$

この解が $x>0$ を満たす条件は $v>\lambda\tau$ です。

$x<0$ なら $\partial|x|=\{-1\}$ なので

$$
\frac{v-x}{\lambda}=-\tau,
$$

従って

$$
x=v+\lambda\tau.
$$

この解が $x<0$ を満たす条件は $v<-\lambda\tau$ です。

$x=0$ なら

$$
\partial|0|=[-1,1]
$$

なので

$$
\frac v\lambda
\in
\tau[-1,1]
$$

すなわち

$$
|v|\le\lambda\tau.
$$

以上から

$$
x=
\begin{cases}
v-\lambda\tau,&v>\lambda\tau,\\
0,&|v|\le\lambda\tau,\\
v+\lambda\tau,&v<-\lambda\tau,
\end{cases}
$$

であり、これは $S_{\lambda\tau}(v)$ です。ベクトルの $\ell^1$ ノルムは座標和なので、各成分へ同じ議論を適用できます。

$\square$
<!-- proof-end -->

---

## 8. 合成最適化：近接勾配法

ここで本章の中心問題

$$
F(x)=f(x)+g(x)
$$

へ戻ります。

$f$ は滑らかなので OPT7 の勾配ステップが使えます。$g$ は非滑らかでも近接作用素が使えます。この二つを一回ずつ組み合わせます。

<a id="def-opt8-proximal-gradient"></a>
<!-- formal-statement-start -->
> **定義（近接勾配法）**  
> $f:\mathbb R^n\to\mathbb R$ を凸で微分可能、$g:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸、$\alpha>0$ とする。
>
> $$
> \boxed{
> x_{k+1}
> =
> \operatorname{prox}_{\alpha g}
> \left(
> x_k-\alpha\nabla f(x_k)
> \right)
> }
> $$
>
> と更新する方法を **近接勾配法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-proximal-gradient -->
**定義の確認**：$g=\delta_C$

標示関数なら

$$
\operatorname{prox}_{\alpha\delta_C}=P_C
$$

なので

$$
x_{k+1}
=
P_C(x_k-\alpha\nabla f(x_k)).
$$

これは [射影勾配法](#def-opt8-projected-gradient)そのものです。

逆に $g\equiv0$ なら近接作用素は恒等写像なので、OPT7 の固定歩幅最急降下法へ戻ります。
<!-- definition-example-end -->

### 8.1 近接勾配は一つの二次上界を最小化している

$\alpha=1/L$ とすると

$$
x^+
=
\operatorname{prox}_{g/L}
\left(
x-\frac1L\nabla f(x)
\right)
$$

です。平方完成すると、これは

$$
\operatorname*{arg\,min}_z
\left\{
g(z)
+
\langle\nabla f(x),z-x\rangle
+
\frac L2\|z-x\|^2
\right\}
$$

と同じです。

OPT7 の降下補題は

$$
f(z)
\le
f(x)
+
\langle\nabla f(x),z-x\rangle
+
\frac L2\|z-x\|^2
$$

を与えるので、近接勾配法は**滑らかな項を二次上界で置き換え、その上界と非滑らかな項の和を毎回正確に最小化する方法**だと読めます。

---

## 9. 近接勾配法の一段評価

<a id="thm-opt8-proximal-gradient-step"></a>
<!-- formal-statement-start -->
> **定理（近接勾配法の一段評価）**  
> $f$ を凸かつ $L$-滑らか、$g$ を閉真凸とし
>
> $$
> F=f+g
> $$
>
> とする。任意の $x$ に対し
>
> $$
> x^+
> =
> \operatorname{prox}_{g/L}
> \left(
> x-\frac1L\nabla f(x)
> \right)
> $$
>
> と置く。このとき任意の $z\in\operatorname{dom}g$ に対して
>
> $$
> \boxed{
> F(x^+)-F(z)
> \le
> \frac L2
> \left(
> \|x-z\|^2-\|x^+-z\|^2
> \right)
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

三つだけ使います。

1. $f$ の降下補題。
2. $f$ の凸性による一次支持不等式。
3. 近接最適性条件から得る $g$ の劣勾配。

最後に内積を距離二乗の差へ変換します。

<!-- proof-start -->
### 証明

近接最適性条件より

$$
x^+
=
\operatorname{prox}_{g/L}
\left(
x-\frac1L\nabla f(x)
\right)
$$

は

$$
L(x-x^+)-\nabla f(x)
\in
\partial g(x^+)
$$

と同値です。

従って劣勾配不等式から、任意の $z\in\operatorname{dom}g$ に対して

$$
g(z)
\ge
g(x^+)
+
\left\langle
L(x-x^+)-\nabla f(x),
z-x^+
\right\rangle.
$$

整理すると

$$
g(x^+)-g(z)
\le
\left\langle
L(x-x^+)-\nabla f(x),
x^+-z
\right\rangle.
$$

一方、降下補題より

$$
f(x^+)
\le
f(x)
+
\langle\nabla f(x),x^+-x\rangle
+
\frac L2\|x^+-x\|^2.
$$

また $f$ の凸性から

$$
f(z)
\ge
f(x)
+
\langle\nabla f(x),z-x\rangle.
$$

二式の差を取れば

$$
f(x^+)-f(z)
\le
\langle\nabla f(x),x^+-z\rangle
+
\frac L2\|x^+-x\|^2.
$$

ここへ $g$ の評価を足すと、$\nabla f(x)$ の項が相殺されて

$$
F(x^+)-F(z)
\le
L\langle x-x^+,x^+-z\rangle
+
\frac L2\|x^+-x\|^2.
$$

恒等式

$$
2\langle a-b,b-c\rangle
=
\|a-c\|^2-\|a-b\|^2-\|b-c\|^2
$$

を $a=x$, $b=x^+$, $c=z$ に適用すると

$$
L\langle x-x^+,x^+-z\rangle
+
\frac L2\|x-x^+\|^2
=
\frac L2
\left(
\|x-z\|^2-\|x^+-z\|^2
\right).
$$

従って結論を得ます。

$\square$
<!-- proof-end -->

特に $z=x$ と置けば

$$
F(x^+)-F(x)
\le
-\frac L2\|x^+-x\|^2
\le0.
$$

従って固定歩幅 $1/L$ の近接勾配法では関数値が単調非増加です。

---

## 10. 近接勾配法の $O(1/k)$

<a id="thm-opt8-proximal-gradient-rate"></a>
<!-- formal-statement-start -->
> **定理（近接勾配法の劣線形収束）**  
> $f$ を凸かつ $L$-滑らか、$g$ を閉真凸とし、$F=f+g$ が最小点 $x^*$ を持つとする。反復
>
> $$
> x_{k+1}
> =
> \operatorname{prox}_{g/L}
> \left(
> x_k-\frac1L\nabla f(x_k)
> \right)
> $$
>
> に対し、任意の $k\ge1$ で
>
> $$
> \boxed{
> F(x_k)-F(x^*)
> \le
> \frac{L\|x_0-x^*\|^2}{2k}.
> }
> $$
<!-- formal-statement-end -->

### 証明の見取り図

OPT7 の滑らかな最急降下法と同じ望遠鏡和が復活します。違いは、勾配ステップそのものではなく、近接最適性条件を挟むことです。

<!-- proof-start -->
### 証明

[一段評価](#thm-opt8-proximal-gradient-step)に $x=x_j$, $x^+=x_{j+1}$, $z=x^*$ を代入すると

$$
F(x_{j+1})-F(x^*)
\le
\frac L2
\left(
\|x_j-x^*\|^2-\|x_{j+1}-x^*\|^2
\right).
$$

$j=0,\ldots,k-1$ で加えると

$$
\sum_{j=0}^{k-1}
\left(
F(x_{j+1})-F(x^*)
\right)
\le
\frac L2\|x_0-x^*\|^2.
$$

また一段評価で $z=x_j$ と置けば

$$
F(x_{j+1})\le F(x_j)
$$

なので関数値は単調非増加です。従って各 $j+1\le k$ について

$$
F(x_{j+1})-F(x^*)
\ge
F(x_k)-F(x^*).
$$

よって

$$
k\bigl(F(x_k)-F(x^*)\bigr)
\le
\frac L2\|x_0-x^*\|^2.
$$

両辺を $k$ で割れば

$$
F(x_k)-F(x^*)
\le
\frac{L\|x_0-x^*\|^2}{2k}.
$$

$\square$
<!-- proof-end -->

ここが劣勾配法との大きな違いです。非滑らかな $g$ を丸ごと劣勾配で処理すると典型的には $O(1/\sqrt{k})$ ですが、**非滑らかな部分の近接作用素を正確に計算できる合成構造**を使えば、滑らかな凸最適化と同じ $O(1/k)$ が戻ります。

---

## 11. 正則化付き最小二乗と ISTA

代表問題は

$$
\min_x
\left\{
\frac12\|Ax-b\|^2
+
\tau\|x\|_1
\right\}.
$$

滑らかな項を

$$
f(x)=\frac12\|Ax-b\|^2
$$

とすると

$$
\nabla f(x)
=
A^{\mathsf T}(Ax-b).
$$

さらに

$$
\|\nabla f(x)-\nabla f(y)\|
=
\|A^{\mathsf T}A(x-y)\|
\le
\|A^{\mathsf T}A\|_2\|x-y\|.
$$

したがって

$$
L=\|A^{\mathsf T}A\|_2=\|A\|_2^2
$$

を Lipschitz 定数として取れます。

<a id="def-opt8-ista"></a>
<!-- formal-statement-start -->
> **定義（ISTA）**  
> 正則化付き最小二乗
>
> $$
> F(x)
> =
> \frac12\|Ax-b\|^2+\tau\|x\|_1
> $$
>
> に対し、$0<\alpha\le1/\|A\|_2^2$ を取り
>
> $$
> \boxed{
> x_{k+1}
> =
> S_{\alpha\tau}
> \left(
> x_k-\alpha A^{\mathsf T}(Ax_k-b)
> \right)
> }
> $$
>
> と更新する方法を **ISTA（iterative shrinkage-thresholding algorithm）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt8-ista -->
**定義の確認**：一変数

$$
A=(2),
\qquad
b=3,
\qquad
\tau=1.
$$

このとき $L=4$ なので $\alpha=1/4$ とできます。$x_0=0$ なら

$$
x_0-\alpha A^{\mathsf T}(Ax_0-b)
=
0-\frac14\cdot2(0-3)
=
\frac32.
$$

閾値は

$$
\alpha\tau=\frac14
$$

なので

$$
x_1
=
S_{1/4}\left(\frac32\right)
=
\frac54.
$$

勾配ステップの後に、$\ell^1$ 正則化が成分を 0 方向へ縮めることが数式のまま見えます。
<!-- definition-example-end -->

ISTA は新しい原理ではありません。**近接勾配法に $\ell^1$ ノルムの明示式近接作用素を代入したもの**です。

---

## 12. 仮定を失うと何が壊れるか

### 12.1 $g$ が凸でないと近接点が一意とは限らない

一変数で

$$
g(x)=-x^2
$$

のような非凸関数を考えると、二次距離項との和が強凸になるとは限りません。$\lambda$ が大きければ

$$
-x^2+\frac1{2\lambda}(x-v)^2
$$

の二次係数すら負になり、最小点が存在しないことがあります。

本章で近接作用素を単一値写像として扱えたのは、**$g$ が閉真凸で、二次項が強凸性と強圧性を与えるから**です。

### 12.2 $f$ の勾配が $L$-Lipschitz でないと固定歩幅 $1/L$ の根拠が消える

近接勾配法の一段評価では

$$
f(x^+)
\le
f(x)
+
\langle\nabla f(x),x^+-x\rangle
+
\frac L2\|x^+-x\|^2
$$

という降下補題を使いました。したがって滑らかさを失うと、同じ二次上界を使った $O(1/k)$ 証明はそのままでは成立しません。

### 12.3 劣勾配法の $O(1/\sqrt{k})$ には劣勾配の有界性が必要

基本距離評価には

$$
\alpha_k^2\|s_k\|^2
$$

が残ります。$\|s_k\|$ を一様に抑えられなければ、先ほどの単純な収束率は出ません。

---

## 13. 本章の見取り図を一枚にまとめる

$$
\boxed{
\begin{array}{c}
\text{微分不能な凸関数}\\
\downarrow\\
\text{劣勾配法：一般だが典型的に }O(1/\sqrt{k})\\
\downarrow\\
\text{明示式の近接作用素が計算できる構造を利用}\\
\downarrow\\
\operatorname{prox}_{\lambda g}\\
\downarrow\\
\text{近接勾配法：}f\text{ の滑らかさ}+g\text{ の近接計算}\\
\downarrow\\
O(1/k)\\
\downarrow\\
g(x)=\tau\|x\|_1
\Rightarrow
\text{ISTA}
\end{array}
}
$$

射影勾配法も

$$
g=\delta_C
$$

と置けばこの図の中に入ります。

---

## 14. 演習 Level A

<a id="ex-opt8-a01"></a>
### OPT8-A01 二次関数の近接作用素

- Level: A
- 目安時間: 10分

$$
g(x)=\frac32\|x\|^2
$$

とする。任意の $\lambda>0$、$v\in\mathbb R^n$ に対して

$$
\operatorname{prox}_{\lambda g}(v)
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

定義より

$$
\operatorname{prox}_{\lambda g}(v)
=
\operatorname*{arg\,min}_x
\left\{
\frac32\|x\|^2
+
\frac1{2\lambda}\|x-v\|^2
\right\}.
$$

目的関数を微分すると

$$
3x+\frac1\lambda(x-v).
$$

最小点では

$$
3x+\frac1\lambda(x-v)=0.
$$

$\lambda$ を掛けて

$$
3\lambda x+x-v=0,
$$

したがって

$$
(1+3\lambda)x=v.
$$

よって

$$
\boxed{
\operatorname{prox}_{\lambda g}(v)
=
\frac{1}{1+3\lambda}v.
}
$$

二次項 $g$ の係数が大きいほど、近接点は原点方向へ強く縮みます。
<!-- solution-end -->

<a id="ex-opt8-a02"></a>
### OPT8-A02 標示関数の近接作用素

- Level: A
- 目安時間: 10分

$$
C=[-1,2]
$$

とし、$\delta_C$ をその標示関数とする。

1. $\operatorname{prox}_{\lambda\delta_C}(3)$ を求めよ。
2. $\operatorname{prox}_{\lambda\delta_C}(-4)$ を求めよ。
3. 答えが $\lambda$ に依存しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

標示関数の近接作用素は最近点射影です。

$$
\operatorname{prox}_{\lambda\delta_C}(v)
=
P_C(v).
$$

したがって

$$
P_{[-1,2]}(3)=2
$$

なので

$$
\boxed{
\operatorname{prox}_{\lambda\delta_C}(3)=2.
}
$$

同様に

$$
P_{[-1,2]}(-4)=-1
$$

だから

$$
\boxed{
\operatorname{prox}_{\lambda\delta_C}(-4)=-1.
}
$$

定義では

$$
\min_{x\in C}
\frac1{2\lambda}|x-v|^2
$$

を解きます。$1/(2\lambda)>0$ は目的関数全体へ掛かる正の定数なので最小点を変えません。従って射影は $\lambda$ に依存しません。
<!-- solution-end -->

<a id="ex-opt8-a03"></a>
### OPT8-A03 ソフト閾値処理を計算する

- Level: A
- 目安時間: 10分

$$
v=(3,-0.5,-2,0.2),
\qquad
\tau=1
$$

とする。$S_\tau(v)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

各成分に

$$
S_1(t)
=
\operatorname{sign}(t)\max\{|t|-1,0\}
$$

を適用します。

$$
S_1(3)=2,
$$

$$
S_1(-0.5)=0,
$$

$$
S_1(-2)=-1,
$$

$$
S_1(0.2)=0.
$$

従って

$$
\boxed{
S_1(v)=(2,0,-1,0).
}
$$

閾値以下の成分が厳密に 0 になる点が、単なる比例縮小との違いです。
<!-- solution-end -->

<a id="ex-opt8-a04"></a>
### OPT8-A04 劣勾配法の一段距離評価

- Level: A
- 目安時間: 12分

$$
F(x)=|x|,
\qquad
x^*=0,
\qquad
x_k>0
$$

とする。$s_k=1$ を選び、歩幅 $\alpha_k=\alpha>0$ としたとき、基本距離評価の両辺を直接計算して確かめよ。

<!-- solution-start -->
#### 詳細解答

$x_k>0$ なので

$$
F(x_k)=x_k,
\qquad
s_k=1.
$$

更新は

$$
x_{k+1}=x_k-\alpha.
$$

左辺は

$$
|x_{k+1}-x^*|^2
=
(x_k-\alpha)^2
=
x_k^2-2\alpha x_k+\alpha^2.
$$

右辺は

$$
|x_k|^2
-2\alpha(F(x_k)-F(0))
+\alpha^2|s_k|^2.
$$

ここで

$$
F(x_k)-F(0)=x_k,
\qquad
|s_k|^2=1
$$

なので

$$
x_k^2-2\alpha x_k+\alpha^2.
$$

従ってこの場合は不等式ではなく

$$
\boxed{
|x_{k+1}|^2
=
|x_k|^2
-2\alpha(F(x_k)-F(0))
+\alpha^2
}
$$

と等号で成立します。
<!-- solution-end -->

---

## 15. 演習 Level B

<a id="ex-opt8-b01"></a>
### OPT8-B01 堅非拡大性を再構成する

- Level: B
- 目安時間: 20分

$g$ を閉真凸関数、$\lambda>0$ とし

$$
p=\operatorname{prox}_{\lambda g}(u),
\qquad
q=\operatorname{prox}_{\lambda g}(v)
$$

とする。

1. 近接最適性条件から二つの劣勾配を取り出せ。
2. 劣微分の単調性を使って
   $$
   \|p-q\|^2\le\langle p-q,u-v\rangle
   $$
   を示せ。
3. そこから近接作用素が 1-Lipschitz であることを示せ。

<!-- solution-start -->
#### 詳細解答

近接最適性条件から

$$
\frac{u-p}{\lambda}
\in
\partial g(p),
$$

$$
\frac{v-q}{\lambda}
\in
\partial g(q).
$$

凸関数の劣微分の単調性より

$$
\left\langle
\frac{u-p}{\lambda}
-
\frac{v-q}{\lambda},
p-q
\right\rangle
\ge0.
$$

$\lambda>0$ を掛けると

$$
\langle u-v-(p-q),p-q\rangle\ge0.
$$

従って

$$
\langle u-v,p-q\rangle
\ge
\|p-q\|^2.
$$

つまり

$$
\boxed{
\|p-q\|^2
\le
\langle p-q,u-v\rangle.
}
$$

Cauchy--Schwarz の不等式より

$$
\|p-q\|^2
\le
\|p-q\|\,\|u-v\|.
$$

$p=q$ なら結論は自明です。$p\ne q$ なら $\|p-q\|$ で割って

$$
\boxed{
\|p-q\|\le\|u-v\|.
}
$$

従って近接作用素は 1-Lipschitz 連続です。
<!-- solution-end -->

<a id="ex-opt8-b02"></a>
### OPT8-B02 絶対値関数の Moreau 包絡

- Level: B
- 目安時間: 22分

$$
g(x)=|x|
$$

とする。

1. $\operatorname{prox}_{\lambda g}(v)$ を求めよ。
2. $e_\lambda g(v)$ を場合分けして求めよ。
3. 得られた関数を微分し、
   $$
   \nabla e_\lambda g(v)
   =
   \frac1\lambda
   \left(
   v-\operatorname{prox}_{\lambda g}(v)
   \right)
   $$
   を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

$\tau=1$ のソフト閾値処理なので

$$
\operatorname{prox}_{\lambda|\cdot|}(v)
=
S_\lambda(v)
=
\begin{cases}
v-\lambda,&v>\lambda,\\
0,&|v|\le\lambda,\\
v+\lambda,&v<-\lambda.
\end{cases}
$$

まず $|v|\le\lambda$ なら近接点は 0 です。従って

$$
e_\lambda g(v)
=
0+\frac1{2\lambda}v^2
=
\frac{v^2}{2\lambda}.
$$

次に $v>\lambda$ なら近接点は $v-\lambda$ です。従って

$$
\begin{aligned}
e_\lambda g(v)
&=
|v-\lambda|
+
\frac1{2\lambda}
|(v-\lambda)-v|^2\\
&=
v-\lambda+\frac{\lambda^2}{2\lambda}\\
&=
v-\frac\lambda2.
\end{aligned}
$$

$v<-\lambda$ でも対称性から

$$
e_\lambda g(v)
=
|v|-\frac\lambda2.
$$

したがって

$$
\boxed{
e_\lambda|\cdot|(v)
=
\begin{cases}
\dfrac{v^2}{2\lambda},&|v|\le\lambda,\\[6pt]
|v|-\dfrac\lambda2,&|v|>\lambda.
\end{cases}
}
$$

微分すると

$$
(e_\lambda|\cdot|)'(v)
=
\begin{cases}
v/\lambda,&|v|<\lambda,\\
1,&v>\lambda,\\
-1,&v<-\lambda.
\end{cases}
$$

境界 $v=\pm\lambda$ でも左右微分は一致します。

一方

$$
\frac1\lambda(v-S_\lambda(v))
$$

を計算すると、$|v|\le\lambda$ では $v/\lambda$、$v>\lambda$ では 1、$v<-\lambda$ では $-1$ です。従って勾配公式が直接確認できました。
<!-- solution-end -->

<a id="ex-opt8-b03"></a>
### OPT8-B03 近接勾配法の一段評価から $O(1/k)$ を再構成する

- Level: B
- 目安時間: 25分

$f$ を凸かつ $L$-滑らか、$g$ を閉真凸とし、$F=f+g$ は最小点 $x^*$ を持つとする。

$$
x_{k+1}
=
\operatorname{prox}_{g/L}
\left(
x_k-\frac1L\nabla f(x_k)
\right)
$$

について次を示せ。

1. 近接最適性条件から
   $$
   L(x_k-x_{k+1})-\nabla f(x_k)
   \in
   \partial g(x_{k+1})
   $$
   を得る。
2. 降下補題と凸性を組み合わせて
   $$
   F(x_{k+1})-F(x^*)
   \le
   \frac L2
   \left(
   \|x_k-x^*\|^2-\|x_{k+1}-x^*\|^2
   \right)
   $$
   を示す。
3. 望遠鏡和から
   $$
   F(x_k)-F(x^*)
   \le
   \frac{L\|x_0-x^*\|^2}{2k}
   $$
   を導け。

<!-- solution-start -->
#### 詳細解答

近接作用素の入力を

$$
v_k
=
x_k-\frac1L\nabla f(x_k)
$$

と置きます。パラメータは $\lambda=1/L$ です。近接最適性条件より

$$
L(v_k-x_{k+1})
\in
\partial g(x_{k+1}).
$$

$v_k$ を戻すと

$$
\boxed{
L(x_k-x_{k+1})-\nabla f(x_k)
\in
\partial g(x_{k+1}).
}
$$

この劣勾配を $w_{k+1}$ と書きます。劣勾配不等式より

$$
g(x_{k+1})-g(x^*)
\le
\langle w_{k+1},x_{k+1}-x^*\rangle.
$$

一方、降下補題と $f$ の凸性から

$$
f(x_{k+1})-f(x^*)
\le
\langle\nabla f(x_k),x_{k+1}-x^*\rangle
+
\frac L2\|x_{k+1}-x_k\|^2.
$$

二式を足すと $\nabla f(x_k)$ が消え、

$$
F(x_{k+1})-F(x^*)
\le
L\langle x_k-x_{k+1},x_{k+1}-x^*\rangle
+
\frac L2\|x_{k+1}-x_k\|^2.
$$

恒等式

$$
2\langle a-b,b-c\rangle
=
\|a-c\|^2-\|a-b\|^2-\|b-c\|^2
$$

を使えば

$$
\boxed{
F(x_{k+1})-F(x^*)
\le
\frac L2
\left(
\|x_k-x^*\|^2-\|x_{k+1}-x^*\|^2
\right).
}
$$

$j=0,\ldots,k-1$ で足すと

$$
\sum_{j=0}^{k-1}
\bigl(F(x_{j+1})-F(x^*)\bigr)
\le
\frac L2\|x_0-x^*\|^2.
$$

近接勾配法では関数値が単調非増加なので

$$
k\bigl(F(x_k)-F(x^*)\bigr)
\le
\frac L2\|x_0-x^*\|^2.
$$

従って

$$
\boxed{
F(x_k)-F(x^*)
\le
\frac{L\|x_0-x^*\|^2}{2k}.
}
$$
<!-- solution-end -->

---

## 16. 演習 Level C

<a id="ex-opt8-c01"></a>
### OPT8-C01 対角最小二乗で ISTA を完全に追う

- Level: C
- 目安時間: 35分

$$
A=
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
3\\
1
\end{pmatrix},
\qquad
\tau=1
$$

として

$$
F(x)
=
\frac12\|Ax-b\|^2+\|x\|_1
$$

を考える。初期点は $x_0=(0,0)^{\mathsf T}$ とする。

1. $\nabla f(x)=A^{\mathsf T}(Ax-b)$ を求め、$L=\|A\|_2^2$ を計算せよ。
2. 歩幅 $\alpha=1/L$ の ISTA で $x_1,x_2$ を求めよ。
3. 問題が座標ごとに分離することを使って厳密な最小点 $x^*$ を求めよ。
4. 第1成分と第2成分で収束の速さが異なる理由を説明せよ。
5. 一般の $O(1/k)$ 評価で使う初期距離 $\|x_0-x^*\|^2$ を求め、関数値誤差の上界を書け。

<!-- solution-start -->
#### 詳細解答

### 1. 勾配と滑らかさ定数

$$
A^{\mathsf T}A
=
\begin{pmatrix}
1&0\\
0&4
\end{pmatrix}.
$$

したがって

$$
\nabla f(x)
=
A^{\mathsf T}Ax-A^{\mathsf T}b
=
\begin{pmatrix}
x_1-3\\
4x_2-2
\end{pmatrix}.
$$

$A$ の最大特異値は 2 なので

$$
\boxed{
L=\|A\|_2^2=4.
}
$$

従って

$$
\alpha=\frac14.
$$

### 2. $x_1,x_2$ の計算

まず $x_0=(0,0)^{\mathsf T}$ で

$$
\nabla f(x_0)
=
\begin{pmatrix}
-3\\
-2
\end{pmatrix}.
$$

勾配ステップは

$$
x_0-\frac14\nabla f(x_0)
=
\begin{pmatrix}
3/4\\
1/2
\end{pmatrix}.
$$

閾値は

$$
\alpha\tau=\frac14.
$$

従って

$$
x_1
=
S_{1/4}
\begin{pmatrix}
3/4\\
1/2
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
1/2\\
1/4
\end{pmatrix}.
}
$$

次に

$$
\nabla f(x_1)
=
\begin{pmatrix}
1/2-3\\
4(1/4)-2
\end{pmatrix}
=
\begin{pmatrix}
-5/2\\
-1
\end{pmatrix}.
$$

勾配ステップは

$$
x_1-\frac14\nabla f(x_1)
=
\begin{pmatrix}
1/2+5/8\\
1/4+1/4
\end{pmatrix}
=
\begin{pmatrix}
9/8\\
1/2
\end{pmatrix}.
$$

ソフト閾値処理すると

$$
x_2
=
\boxed{
\begin{pmatrix}
7/8\\
1/4
\end{pmatrix}.
}
$$

### 3. 厳密な最小点

目的関数は

$$
F(x_1,x_2)
=
\frac12(x_1-3)^2+|x_1|
+
\frac12(2x_2-1)^2+|x_2|.
$$

二座標は独立に最小化できます。

第1成分は

$$
\frac12(x_1-3)^2+|x_1|.
$$

正の解を仮定すると微分条件は

$$
x_1-3+1=0,
$$

したがって

$$
x_1^*=2.
$$

これは正なので仮定と整合します。

第2成分は

$$
\frac12(2x_2-1)^2+|x_2|.
$$

$x_2>0$ なら微分は

$$
2(2x_2-1)+1
=
4x_2-1,
$$

従って候補は

$$
x_2=\frac14.
$$

これは正なので整合します。よって

$$
\boxed{
x^*
=
\begin{pmatrix}
2\\
1/4
\end{pmatrix}.
}
$$

### 4. 座標ごとの速さ

第2成分の曲率は 4 で、全体の Lipschitz 定数 $L=4$ と一致します。したがって歩幅 $1/4$ はこの方向にちょうど合い、最初の1回で $x_2=1/4$ に到達しています。

一方、第1成分の曲率は 1 です。同じ歩幅 $1/4$ はこの方向には保守的なので、

$$
0
\to
\frac12
\to
\frac78
\to\cdots
$$

と段階的に $2$ へ近づきます。

これは OPT7 で見た「最大曲率に合わせた単一歩幅が、緩い方向を遅くする」機構が、非滑らかな正則化を加えても残っている例です。

### 5. 一般の $O(1/k)$ 上界

初期距離は

$$
\|x_0-x^*\|^2
=
2^2+\left(\frac14\right)^2
=
4+\frac1{16}
=
\frac{65}{16}.
$$

したがって近接勾配法の一般定理から

$$
F(x_k)-F(x^*)
\le
\frac{4}{2k}\cdot\frac{65}{16}.
$$

整理すると

$$
\boxed{
F(x_k)-F(x^*)
\le
\frac{65}{8k}.
}
$$

この上界は一般の凸合成問題に通用する保証であり、この対角例の実際の収束よりかなり保守的です。
<!-- solution-end -->

---

## 17. この章の要点

- 劣勾配法は微分不能な凸関数にも使えるが、一段評価には
  $$
  \alpha_k^2\|s_k\|^2
  $$
  が残る。
- 有界劣勾配と適切な歩幅のもとで、最良反復値は典型的に
  $$
  O(1/\sqrt{k})
  $$
  で近づく。
- 射影勾配法は、勾配ステップを閉凸集合へ射影して可行性を保つ。
- 閉真凸関数 $g$ の近接作用素は
  $$
  g(x)+\frac1{2\lambda}\|x-v\|^2
  $$
  の一意な最小点であり、
  $$
  \frac{v-p}{\lambda}\in\partial g(p)
  $$
  が基本最適性条件である。
- 標示関数の近接作用素は最近点射影である。
- 近接作用素は堅非拡大であり、特に 1-Lipschitz 連続である。
- Moreau 包絡は非滑らかな閉真凸関数を滑らかにし、
  $$
  \nabla e_\lambda g(v)
  =
  \frac1\lambda
  \left(
  v-\operatorname{prox}_{\lambda g}(v)
  \right)
  $$
  を満たす。
- $\ell^1$ ノルムの近接作用素はソフト閾値処理である。
- 近接勾配法は
  $$
  x_{k+1}
  =
  \operatorname{prox}_{\alpha g}
  \bigl(x_k-\alpha\nabla f(x_k)\bigr)
  $$
  により、滑らかな項と非滑らかな項を役割分担させる。
- 歩幅 $1/L$ では
  $$
  F(x_k)-F(x^*)
  \le
  \frac{L\|x_0-x^*\|^2}{2k}
  $$
  と $O(1/k)$ 収束する。
- ISTA は $\ell^1$ 正則化付き最小二乗に近接勾配法を適用したもので、閾値は $\alpha\tau$、安全な歩幅は $1/\|A\|_2^2$ から得られる。

次の OPT9 では、射影だけでは簡単に扱えない制約に対し、ペナルティ法・障壁法・主双対法・SQP へ進みます。
