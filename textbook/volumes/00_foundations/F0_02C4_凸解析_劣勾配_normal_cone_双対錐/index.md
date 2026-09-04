# F0-02C4 関数解析IV：凸解析・劣勾配・normal cone

微分可能性を失っても、凸性があれば「接線が下から支える」という一次情報は残ります。この講義では、劣勾配・normal cone を定義して具体例で条件を検算し、さらに劣微分の和則と max 関数の劣微分公式まで証明します。

```text
凸性
  ↓
劣勾配
  ↓
方向微分
  ↓
和則・max公式
  ↓
normal cone
  ↓
制約付き最適性
```

---

## 1. 凸集合と凸関数

<a id="def-f0-02c4-convex-set"></a>

<!-- formal-statement-start -->
> **定義（凸集合）**  
> $C\subset\mathbb R^n$ が凸集合であるとは、任意の $x,y\in C$ と $t\in[0,1]$ に対して
>
> $$
> (1-t)x+ty\in C
> $$
>
> が成り立つことをいいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4-convex-set -->
### 1.1 例：区間 $[0,1]$ は凸集合

**定義の確認**

$x,y\in[0,1]$、$t\in[0,1]$ とすると

$$
0
\le
(1-t)x+ty
\le
(1-t)\cdot1+t\cdot1
=1.
$$

したがって $(1-t)x+ty\in[0,1]$ であり、定義を満たします。
<!-- definition-example-end -->

<a id="def-f0-02c4-convex-function"></a>

<!-- formal-statement-start -->
> **定義（凸関数）**  
> 凸集合 $C\subset\mathbb R^n$ 上の関数 $f:C\to\mathbb R$ が凸関数であるとは、任意の $x,y\in C$ と $t\in[0,1]$ に対して
>
> $$
> f((1-t)x+ty)
> \le
> (1-t)f(x)+tf(y)
> $$
>
> が成り立つことをいいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4-convex-function -->
### 1.2 例：$f(x)=|x|$ は凸関数

**定義の確認**

三角不等式と正の斉次性から

$$
\begin{aligned}
|(1-t)x+ty|
&\le |(1-t)x|+|ty|\\
&=(1-t)|x|+t|y|.
\end{aligned}
$$

したがって凸関数の定義を満たします。
<!-- definition-example-end -->

---

## 2. 微分可能な凸関数の一次条件

<a id="thm-f0-02c4-first-order-convex"></a>

<!-- formal-statement-start -->
> **定理（微分可能な凸関数の一次条件）**  
> $f:\mathbb R^n\to\mathbb R$ が凸かつ微分可能なら、任意の $x,y\in\mathbb R^n$ に対して
>
> $$
> f(y)
> \ge
> f(x)+\nabla f(x)^{\mathsf T}(y-x)
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 2.1 証明の見取り図

$x$ から $y$ へ向かう線分だけを見ます。凸性で得た割線の傾きの不等式を $t\downarrow0$ とすると、割線が接線へ移ります。

<!-- proof-start -->
### 証明

$0<t\le1$ とします。凸性から

$$
f(x+t(y-x))
\le
(1-t)f(x)+tf(y).
$$

従って

$$
\frac{f(x+t(y-x))-f(x)}{t}
\le
f(y)-f(x).
$$

$t\downarrow0$ とすると左辺は方向微分

$$
\nabla f(x)^{\mathsf T}(y-x)
$$

へ収束します。よって

$$
f(y)-f(x)
\ge
\nabla f(x)^{\mathsf T}(y-x).
$$

これが求める不等式です。$\square$
<!-- proof-end -->

---

## 3. 劣勾配と劣微分

<a id="def-f0-02c4-subgradient-subdifferential"></a>

<!-- formal-statement-start -->
> **定義（劣勾配・劣微分）**  
> 凸関数 $f:\mathbb R^n\to(-\infty,+\infty]$ と $f(x)<\infty$ を満たす点 $x$ を考えます。$p\in\mathbb R^n$ が
>
> $$
> f(y)
> \ge
> f(x)+p^{\mathsf T}(y-x)
> \qquad(\forall y\in\mathbb R^n)
> $$
>
> を満たすとき、$p$ を $x$ における劣勾配といいます。劣勾配全体を
>
> $$
> \partial f(x)
> $$
>
> と書き、$x$ における劣微分といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4-subgradient-subdifferential -->
### 3.1 例：$f(x)=|x|$ の原点での劣微分

**定義の確認**

$p\in\partial f(0)$ である条件は

$$
|y|\ge py
\qquad(\forall y\in\mathbb R)
$$

です。

$y>0$ を入れると $p\le1$、$y<0$ を入れると $p\ge-1$ が必要です。逆に $-1\le p\le1$ なら

- $y\ge0$ では $py\le y=|y|$、
- $y<0$ では $py\le -y=|y|$

です。従って

$$
\boxed{\partial |\cdot|(0)=[-1,1]}.
$$

定義の「全ての $y$ に対する支持不等式」を両符号で実際に確認しています。
<!-- definition-example-end -->

<a id="thm-f0-02c4-fermat"></a>

<!-- formal-statement-start -->
> **定理（凸関数のFermat条件）**  
> 凸関数 $f:\mathbb R^n\to(-\infty,+\infty]$ と $f(x^*)<\infty$ に対して
>
> $$
> x^*\text{ が大域的最小点}
> \iff
> 0\in\partial f(x^*)
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 3.2 証明の見取り図

これは劣勾配の定義へ $p=0$ を入れただけです。必要条件と十分条件が同じ一行になります。

<!-- proof-start -->
### 証明

$0\in\partial f(x^*)$ なら定義から

$$
f(y)\ge f(x^*)
\qquad(\forall y),
$$

よって $x^*$ は大域的最小点です。

逆に $x^*$ が大域的最小点なら

$$
f(y)\ge f(x^*)=f(x^*)+0^{\mathsf T}(y-x^*)
$$

が全ての $y$ で成り立つので $0\in\partial f(x^*)$ です。$\square$
<!-- proof-end -->

---

## 4. 方向微分は劣勾配を全部まとめて持っている

有限値凸関数 $f:\mathbb R^n\to\mathbb R$ に対して

$$
f'(x;d)
:=
\lim_{t\downarrow0}
\frac{f(x+td)-f(x)}{t}
$$

を考えます。凸性により、この右極限は存在します。

<a id="lem-f0-02c4-directional-support"></a>

<!-- formal-statement-start -->
> **補題（方向微分の支持関数表示）**  
> 有限値凸関数 $f:\mathbb R^n\to\mathbb R$ について
>
> $$
> \boxed{
> f'(x;d)
> =
> \max_{p\in\partial f(x)}p^{\mathsf T}d
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 4.1 証明の見取り図

$d\mapsto f'(x;d)$ は sublinear functional です。方向 $d_0$ を一つ固定し、その方向で値を一致させる線形汎関数を [Hahn--Banachの定理](../F0_02C6_Hahn_Banach_分離定理/index.md#thm-f0-02c6-hahn-banach-real) で全方向へ延長します。その線形汎関数が劣勾配になります。

<!-- proof-start -->
### 証明

まず

$$
\phi(d):=f'(x;d)
$$

と置きます。正の斉次性は定義から従います。また凸性により

$$
f(x+t(d_1+d_2))
\le
\frac12f(x+2td_1)+\frac12f(x+2td_2).
$$

従って $f(x)$ を引いて $t$ で割り、$t\downarrow0$ とすると

$$
\phi(d_1+d_2)
\le
\phi(d_1)+\phi(d_2).
$$

よって $\phi$ は sublinear です。

任意の $p\in\partial f(x)$ に対し

$$
f(x+td)-f(x)
\ge
tp^{\mathsf T}d
$$

なので $t\downarrow0$ として

$$
p^{\mathsf T}d\le\phi(d).
$$

従って

$$
\sup_{p\in\partial f(x)}p^{\mathsf T}d
\le\phi(d).
$$

逆向きを示します。方向 $d_0$ を固定します。一次元空間 $M=\operatorname{span}\{d_0\}$ 上で

$$
\ell(td_0)=t\phi(d_0)
$$

と置きます。$t<0$ の場合も

$$
-\phi(d_0)\le\phi(-d_0)
$$

が sublinear 性から成り立つので $\ell\le\phi$ です。

Hahn--Banach により、$\ell$ は $\mathbb R^n$ 全体の線形汎関数 $p^{\mathsf T}d$ へ、

$$
p^{\mathsf T}d\le\phi(d)
\qquad(\forall d)
$$

を保って延長できます。

一方、凸関数の割線の傾きは右微分以上なので

$$
\phi(d)
\le
f(x+d)-f(x).
$$

従って

$$
p^{\mathsf T}d
\le
f(x+d)-f(x)
\qquad(\forall d).
$$

$y=x+d$ と置けば

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x),
$$

よって $p\in\partial f(x)$ です。しかも延長は $d_0$ 上で元の $\ell$ と一致するので

$$
p^{\mathsf T}d_0=\phi(d_0)=f'(x;d_0).
$$

従って上限は実際に達成され、主張が従います。$\square$
<!-- proof-end -->

---

## 5. 劣微分の和則

<a id="thm-f0-02c4-sum-rule"></a>

<!-- formal-statement-start -->
> **定理（有限値凸関数の劣微分和則）**  
> $f,g:\mathbb R^n\to\mathbb R$ を有限値凸関数とすると、任意の $x\in\mathbb R^n$ で
>
> $$
> \boxed{
> \partial(f+g)(x)
> =
> \partial f(x)+\partial g(x)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 5.1 証明の見取り図

`⊇` は定義を足すだけです。難しい `⊆` では、$p\in\partial(f+g)(x)$ を二つの劣勾配へ分解したいので、$f$ と $g$ の変数をいったん二コピーに分けます。「二コピーを同じ点へ戻す集合」と「二つのepigraphの上側」を分離すると、分離超平面の係数がそのまま二つの劣勾配になります。

<!-- proof-start -->
### 証明

平行移動と定数の減算により $x=0$、$f(0)=g(0)=0$ としてよいものとします。

まず $p_1\in\partial f(0)$、$p_2\in\partial g(0)$ なら

$$
f(u)\ge p_1^{\mathsf T}u,
\qquad
g(u)\ge p_2^{\mathsf T}u
$$

なので

$$
(f+g)(u)
\ge
(p_1+p_2)^{\mathsf T}u.
$$

従って

$$
\partial f(0)+\partial g(0)
\subset
\partial(f+g)(0).
$$

逆に $p\in\partial(f+g)(0)$ とします。このとき

$$
f(w)+g(w)\ge p^{\mathsf T}w
\qquad(\forall w).
$$

$\mathbb R^{2n+2}$ で

$$
A=\{(u,v,r,s):r>f(u),\ s>g(v)\},
$$

$$
B=\{(w,w,r,s):r+s\le p^{\mathsf T}w\}
$$

と置きます。有限値凸関数は有限次元で連続なので $A$ は開凸集合、$B$ は凸集合です。また両者が交われば

$$
r+s>f(w)+g(w)\ge p^{\mathsf T}w
$$

と $r+s\le p^{\mathsf T}w$ が同時に成り立ってしまうので、$A\cap B=\varnothing$ です。

有限次元の凸集合分離により、非零の係数

$$
(a,b,\alpha,\beta)
$$

で $A$ を下側から、$B$ を上側から分離できます。

$B$ では $r$ または $s$ をいくらでも負へ動かせるので $\alpha,\beta\ge0$ が必要です。また $(r,s)=(t,-t)$ を全ての $t$ について入れられるので

$$
\alpha=\beta=:\gamma.
$$

さらに $(w,w,p^{\mathsf T}w,0)\in B$ を全ての $w$ について考えると、上側が有限であるため

$$
a+b+\gamma p=0.
$$

もし $\gamma=0$ なら $a+b=0$ です。しかし $A$ では $u,v$ を独立に任意方向へ動かせるため、分離を保つには $a=b=0$ となり、分離汎関数が零になって矛盾します。従って $\gamma>0$ です。全体を $\gamma$ で割り、$\gamma=1$ とします。

このとき $B$ 上の分離汎関数の上限は0です。$A$ 側で $r\downarrow f(u)$、$s\downarrow g(v)$ とすると

$$
a^{\mathsf T}u+b^{\mathsf T}v+f(u)+g(v)
\ge0
$$

が全ての $u,v$ で成り立ちます。

$v=0$ とすれば

$$
f(u)\ge(-a)^{\mathsf T}u,
$$

よって $p_1=-a\in\partial f(0)$ です。同様に $u=0$ とすれば

$$
p_2=-b\in\partial g(0).
$$

そして $a+b+p=0$ なので

$$
p=p_1+p_2.
$$

従って逆包含も成り立ち、和則が証明されました。$\square$
<!-- proof-end -->

> **補足**  
> 拡張実数値凸関数では、定義域の境界で分離が退化しないための条件が必要です。標準的には `ri(dom f)∩ri(dom g)≠∅`、または一方が共通定義域上の一点で連続、という条件の下で同じ和則が成立します。indicator関数を使う制約付き最適化ではこの条件確認を省略しません。

---

## 6. max 関数の劣微分

有限個の有限値凸関数 $f_1,\ldots,f_m$ に対し

$$
h(x)=\max_{1\le i\le m}f_i(x),
$$

active index を

$$
I(x)=\{i:f_i(x)=h(x)\}
$$

と置きます。

<a id="thm-f0-02c4-max-subdifferential"></a>

<!-- formal-statement-start -->
> **定理（max関数の劣微分公式）**  
> 上の設定で
>
> $$
> \boxed{
> \partial h(x)
> =
> \operatorname{conv}
> \bigcup_{i\in I(x)}\partial f_i(x)
> }
> $$
>
> が成り立ちます。特に各 $f_i$ が $x$ で微分可能なら
>
> $$
> \partial h(x)
> =
> \operatorname{conv}
> \{\nabla f_i(x):i\in I(x)\}.
> $$
<!-- formal-statement-end -->

### 6.1 証明の見取り図

active な各 $f_i$ の劣勾配を凸結合すれば、max を下から支えられるので一方向の包含は直接出ます。逆向きは、方向微分の支持関数表示を使います。もし $h$ の劣勾配が active 劣勾配の凸包の外にあれば、分離方向 $d$ でその劣勾配だけが大きすぎることになり、$p^{\mathsf T}d\le h'(x;d)$ に反します。

<!-- proof-start -->
### 証明

まず $p_i\in\partial f_i(x)$ $(i\in I(x))$ とし、$\alpha_i\ge0$、$\sum_{i\in I(x)}\alpha_i=1$ とします。任意の $y$ に対して

$$
\begin{aligned}
h(y)
&\ge
\sum_{i\in I(x)}\alpha_i f_i(y)\\
&\ge
\sum_{i\in I(x)}\alpha_i
\{f_i(x)+p_i^{\mathsf T}(y-x)\}\\
&=
h(x)+
\left(\sum_{i\in I(x)}\alpha_i p_i\right)^{\mathsf T}(y-x).
\end{aligned}
$$

従って

$$
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
\subset
\partial h(x).
$$

逆に $p\in\partial h(x)$ とします。有限個の関数なので、inactive index には正の値の差があります。各 $f_i$ の連続性から、十分小さい $t>0$ では方向 $d$ に沿った max は active index だけで決まります。従って

$$
h'(x;d)
=
\max_{i\in I(x)}f_i'(x;d).
$$

方向微分の支持関数表示から

$$
\begin{aligned}
h'(x;d)
&=
\max_{i\in I(x)}
\max_{q\in\partial f_i(x)}q^{\mathsf T}d\\
&=
\max_{q\in C}q^{\mathsf T}d,
\end{aligned}
$$

ただし

$$
C=\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
$$

です。

一方 $p\in\partial h(x)$ なので、方向微分の定義から全ての $d$ について

$$
p^{\mathsf T}d\le h'(x;d).
$$

もし $p\notin C$ なら、有限次元の凸集合分離によりある $d$ が存在して

$$
p^{\mathsf T}d
>
\sup_{q\in C}q^{\mathsf T}d
=h'(x;d),
$$

となり矛盾します。従って $p\in C$ です。$\square$
<!-- proof-end -->

---

## 7. indicator関数とnormal cone

<a id="def-f0-02c4-convex-indicator"></a>

<!-- formal-statement-start -->
> **定義（集合のindicator関数）**  
> 集合 $C\subset\mathbb R^n$ に対して
>
> $$
> \delta_C(x)=
> \begin{cases}
> 0,&x\in C,\\
> +\infty,&x\notin C
> \end{cases}
> $$
>
> と定める拡張実数値関数を $C$ の indicator 関数といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4-convex-indicator -->
### 7.1 例：$C=[0,\infty)$ のindicator関数

**定義の確認**

定義へそのまま代入すると

$$
\delta_C(2)=0,
\qquad
\delta_C(0)=0,
\qquad
\delta_C(-1)=+\infty.
$$

従って $f+\delta_C$ を全空間で最小化すると、$x<0$ は自動的に候補から除外され、$x\ge0$ 上だけの最小化と一致します。
<!-- definition-example-end -->

<a id="def-f0-02c4-normal-cone"></a>

<!-- formal-statement-start -->
> **定義（normal cone）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対して
>
> $$
> N_C(x)
> =
> \{v\in\mathbb R^n:
> v^{\mathsf T}(y-x)\le0\ \forall y\in C\}
> $$
>
> を $C$ の $x$ における normal cone といいます。$x\notin C$ では $N_C(x)=\varnothing$ とします。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4-normal-cone -->
### 7.2 例：$C=[0,\infty)$ のnormal cone

**定義の確認**

$x>0$ では $x$ の左右に $C$ の点を取れます。$v(y-x)\le0$ が左右どちらにも成り立つには $v=0$ が必要なので

$$
N_C(x)=\{0\}
\qquad(x>0).
$$

境界 $x=0$ では条件は

$$
vy\le0
\qquad(\forall y\ge0),
$$

なのでちょうど $v\le0$ です。従って

$$
\boxed{N_C(0)=(-\infty,0]}.
$$
<!-- definition-example-end -->

<a id="thm-f0-02c4-indicator-normal"></a>

<!-- formal-statement-start -->
> **定理（indicator関数の劣微分はnormal cone）**  
> 凸集合 $C$ と $x\in C$ に対して
>
> $$
> \boxed{
> \partial\delta_C(x)=N_C(x)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 7.3 証明の見取り図

$y\notin C$ では indicator の左辺が $+\infty$ なので劣勾配条件は自動的です。残る $y\in C$ だけを見ると、劣勾配条件が normal cone の不等式そのものになります。

<!-- proof-start -->
### 証明

$x\in C$ なので $\delta_C(x)=0$ です。$v\in\partial\delta_C(x)$ の条件は

$$
\delta_C(y)
\ge
v^{\mathsf T}(y-x)
\qquad(\forall y).
$$

$y\notin C$ では左辺が $+\infty$ なので自動的に成立します。$y\in C$ では左辺が0なので

$$
v^{\mathsf T}(y-x)\le0
\qquad(\forall y\in C).
$$

これは $v\in N_C(x)$ の定義そのものです。従って両集合は一致します。$\square$
<!-- proof-end -->

---

## 8. 制約付き最適化の一次条件

<a id="thm-f0-02c4-smooth-constrained-fermat"></a>

<!-- formal-statement-start -->
> **定理（凸集合上の微分可能凸最適化）**  
> $C\subset\mathbb R^n$ を非空凸集合、$f:\mathbb R^n\to\mathbb R$ を微分可能な凸関数とします。$x^*\in C$ に対して
>
> $$
> x^*\in\arg\min_{x\in C}f(x)
> \iff
> -\nabla f(x^*)\in N_C(x^*)
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 8.1 証明の見取り図

必要性は $x^*$ から任意の $y\in C$ へ線分上で少し動かして右微分を見るだけです。十分性は凸関数の一次条件と normal cone の符号を足し合わせます。

<!-- proof-start -->
### 証明

$x^*$ が $C$ 上の最小点とします。任意の $y\in C$ に対して凸性より

$$
x^*+t(y-x^*)\in C
\qquad(0\le t\le1).
$$

従って一変数関数

$$
\psi(t)=f(x^*+t(y-x^*))
$$

は $t=0$ で右側最小値を取るので

$$
\psi'(0+)
=
\nabla f(x^*)^{\mathsf T}(y-x^*)
\ge0.
$$

すなわち

$$
(-\nabla f(x^*))^{\mathsf T}(y-x^*)\le0
$$

が全ての $y\in C$ で成り立ち、$-\nabla f(x^*)\in N_C(x^*)$ です。

逆に $-\nabla f(x^*)\in N_C(x^*)$ とします。凸関数の一次条件から

$$
f(y)
\ge
f(x^*)+\nabla f(x^*)^{\mathsf T}(y-x^*)
$$

であり、normal cone 条件から第2項は非負です。従って $f(y)\ge f(x^*)$ が全ての $y\in C$ で成り立ちます。$\square$
<!-- proof-end -->

---

## 9. 演習 Level A

### F0-02C4-A01 絶対値の劣微分

- Level: A
- 目安時間: 8分
- 主題: 劣勾配の定義
- 使用技術: 全ての $y$ に対する支持不等式

$f(x)=|x|$ について $\partial f(0)$ を定義から求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$p\in\partial f(0)$ なら $|y|\ge py$ が全ての $y$ で必要です。$y>0$ から $p\le1$、$y<0$ から $p\ge-1$。逆に $-1\le p\le1$ なら両符号で $|y|\ge py$ が成り立つので

$$
\partial f(0)=[-1,1].
$$
##### 本番答案
$|y|\ge py$ を $y>0,y<0$ に分けると $p\le1,p\ge-1$。逆も成立するため

$$
\boxed{\partial|\cdot|(0)=[-1,1]}.
$$
##### 採点基準（20点）
- 劣勾配条件を書く: 6点
- $y>0,y<0$ の必要条件: 8点
- 逆向き確認: 4点
- 結論: 2点
<!-- solution-end -->

### F0-02C4-A02 区間のnormal cone

- Level: A
- 目安時間: 8分
- 主題: normal cone
- 使用技術: 定義の符号判定

$C=[0,1]$ について $N_C(0)$、$N_C(1/2)$、$N_C(1)$ を求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$x=0$ では $v(y-0)\le0$ が全ての $y\in[0,1]$ で必要なので $v\le0$。内点 $1/2$ では左右へ動けるので $v=0$。$x=1$ では $v(y-1)\le0$、$y-1\le0$ より $v\ge0$ です。

$$
N_C(0)=(-\infty,0],\quad
N_C(1/2)=\{0\},\quad
N_C(1)=[0,\infty).
$$
##### 本番答案
normal cone の定義を各点で使えば

$$
\boxed{N_C(0)=(-\infty,0],\ N_C(1/2)=\{0\},\ N_C(1)=[0,\infty)}.
$$
##### 採点基準（20点）
- $x=0$: 6点
- 内点: 5点
- $x=1$: 6点
- 結論: 3点
<!-- solution-end -->

### F0-02C4-A03 max関数の劣微分

- Level: A
- 目安時間: 10分
- 主題: max関数
- 使用技術: active index

$$
h(x)=\max\{x,-x\}
$$

について $\partial h(0)$ を max 関数の劣微分公式から求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$f_1(x)=x$、$f_2(x)=-x$ とすると $0$ では両方 active です。勾配は1と-1なので

$$
\partial h(0)=\operatorname{conv}\{-1,1\}=[-1,1].
$$
##### 本番答案
$I(0)=\{1,2\}$、勾配は $1,-1$ より

$$
\boxed{\partial h(0)=[-1,1]}.
$$
##### 採点基準（20点）
- active index: 6点
- 勾配: 6点
- 凸包: 6点
- 結論: 2点
<!-- solution-end -->

---

## 10. 演習 Level B

### F0-02C4-B01 和則を実際に使う

- Level: B
- 目安時間: 12分
- 主題: 劣微分和則
- 使用技術: 平滑項と絶対値

$$
f(x)=|x|+\frac12(x-2)^2
$$

について $\partial f(0)$ を求め、0が最小点か判定せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
和則より

$$
\partial f(0)
=
\partial|\cdot|(0)+(0-2)
=[-1,1]-2
=[-3,-1].
$$

0はこの集合に含まれないのでFermat条件から0は最小点ではありません。
##### 本番答案

$$
\partial f(0)=[-1,1]-2=[-3,-1]
$$

で $0\notin\partial f(0)$。従って0は最小点でない。
##### 採点基準（20点）
- 和則: 6点
- 各劣微分: 6点
- 集合和: 4点
- Fermat判定: 4点
<!-- solution-end -->

### F0-02C4-B02 normal coneで制約付き最適性を確認

- Level: B
- 目安時間: 12分
- 主題: 制約付きFermat条件
- 使用技術: normal cone

$$
f(x)=\frac12(x+1)^2,
\qquad
C=[0,\infty)
$$

とする。$x^*=0$ が制約付き最小点であることを normal cone 条件で確認せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答

$$
f'(0)=1,
\qquad
N_C(0)=(-\infty,0].
$$

従って

$$
-f'(0)=-1\in N_C(0).
$$

定理より $x^*=0$ は $C$ 上の大域的最小点です。
##### 本番答案
$f'(0)=1$、$N_C(0)=(-\infty,0]$ なので $-f'(0)=-1\in N_C(0)$。よって $x^*=0$ は制約付き最小点。
##### 採点基準（20点）
- 微分: 4点
- normal cone: 6点
- 包含確認: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C4-B03 二つの二次関数のmax

- Level: B
- 目安時間: 15分
- 主題: max関数の劣微分
- 使用技術: active gradientの凸包

$$
h(x)=\max\{(x-1)^2,(x+1)^2\}
$$

について $\partial h(0)$ を求め、0が大域的最小点であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$x=0$ では両関数の値が1なので両方 active です。勾配は

$$
2(x-1)|_{x=0}=-2,
\qquad
2(x+1)|_{x=0}=2.
$$

従って max 公式から

$$
\partial h(0)=\operatorname{conv}\{-2,2\}=[-2,2].
$$

$0\in\partial h(0)$ なので凸関数のFermat条件より0は大域的最小点です。
##### 本番答案
両項がactive、勾配は $-2,2$。従って

$$
\partial h(0)=[-2,2]\ni0.
$$

Fermat条件より $x=0$ は大域的最小点。
##### 採点基準（20点）
- active判定: 4点
- 勾配計算: 6点
- max公式: 6点
- Fermat条件: 4点
<!-- solution-end -->

---

## 11. 次に進む

次の [F0-02C4A tangent cone・polar cone・dual cone](../F0_02C4A_tangent_polar_dual_cone/index.md) では、実行可能な一次方向と法線を錐の双対関係として整理します。その後 C5/C5A で制約勾配から normal cone を生成し、KKT乗数へ接続します。
