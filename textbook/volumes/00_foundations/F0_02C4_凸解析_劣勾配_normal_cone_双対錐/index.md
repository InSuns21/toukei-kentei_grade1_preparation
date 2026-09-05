# F0-02C4 凸解析：劣勾配・劣微分・normal cone

<!-- definition-example-audit: strict -->

[F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md) で凸集合・凸関数・微分可能な凸関数の一次支持不等式を、[F0-00G1](../F0_00G1_epigraph_閉凸関数_支持超平面/index.md) で epigraph と支持超平面を準備しました。

この講義ではそれらを再定義せず、**微分できない凸関数でも残る一次情報**として劣勾配を導入します。

```text
支持超平面
  ↓
劣勾配・劣微分
  ↓
方向微分
  ↓
和則・max公式
  ↓
indicator関数
  ↓
normal cone
  ↓
制約付き最適性
```

---

## 1. 劣勾配と劣微分

微分可能な凸関数なら

$$
f(y)
\ge
f(x)+\nabla f(x)^{\mathsf T}(y-x)
$$

でした。微分できない点では「接平面」を1枚に決められません。そこで、グラフを下から支える affine 関数の傾きを全部集めます。

<a id="def-f0-02c4-subgradient-subdifferential"></a>

<!-- formal-statement-start -->
> **定義（劣勾配・劣微分）**  
> proper convex function $f:\mathbb R^n\to(-\infty,+\infty]$ と、$f(x)<\infty$ を満たす点 $x$ を考えます。ベクトル $p\in\mathbb R^n$ が次の支持不等式を全ての $y$ で満たすとき、$p$ を $x$ における **劣勾配** といいます。劣勾配全体を $\partial f(x)$ と書き、$x$ における **劣微分** といいます。

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x)
\qquad(\forall y\in\mathbb R^n).
$$
<!-- formal-statement-end -->

### 1.1 例：$f(x)=|x|$ の原点

$p\in\partial f(0)$ の条件は

$$
|y|\ge py
\qquad(\forall y\in\mathbb R)
$$

です。$y>0$ から $p\le1$、$y<0$ から $p\ge-1$。逆に $-1\le p\le1$ ならこの不等式は全ての $y$ で成立します。従って

$$
\boxed{\partial |\cdot|(0)=[-1,1]}.
$$

G1 で見たように、これは epigraph の頂点を下から支える直線の傾き全体です。

---

## 2. Fermat 条件

<a id="thm-f0-02c4-fermat"></a>

<!-- formal-statement-start -->
> **定理（凸関数の Fermat 条件）**  
> proper convex function $f$ と $x^*\in\operatorname{dom}f$ に対して、$x^*$ が大域的最小点であることと、0 が劣微分に含まれることは同値です。

$$
\boxed{
x^*\text{ が大域的最小点}
\iff
0\in\partial f(x^*)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0\in\partial f(x^*)$ なら、劣勾配の定義から

$$
f(y)
\ge
f(x^*)+0^{\mathsf T}(y-x^*)
=f(x^*)
$$

が全ての $y$ で成り立つので $x^*$ は大域的最小点です。

逆に $x^*$ が大域的最小点なら

$$
f(y)
\ge
f(x^*)
=f(x^*)+0^{\mathsf T}(y-x^*)
$$

なので $0\in\partial f(x^*)$ です。$\square$
<!-- proof-end -->

微分可能なら $\partial f(x)=\{\nabla f(x)\}$ なので、これは $\nabla f(x^*)=0$ の一般化です。

---

## 3. 方向微分は劣勾配を全部まとめて持つ

有限値凸関数 $f:\mathbb R^n\to\mathbb R$ に対して

$$
f'(x;d)
:=
\lim_{t\downarrow0}
\frac{f(x+td)-f(x)}{t}
$$

を考えます。凸性により、各固定方向 $d$ についてこの右極限は存在します。

<a id="lem-f0-02c4-directional-support"></a>
<a id="thm-f0-02c4-directional-support"></a>

<!-- formal-statement-start -->
> **定理（方向微分の支持関数表示）**  
> 有限値凸関数 $f:\mathbb R^n\to\mathbb R$ について、方向微分は劣微分集合の support function になります。

$$
\boxed{
f'(x;d)
=
\max_{p\in\partial f(x)}p^{\mathsf T}d
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d\mapsto f'(x;d)$ は sublinear functional です。方向 $d_0$ で値を一致させる一次元の線形汎関数を Hahn–Banach で全方向へ延長すると、その延長が劣勾配になります。

<!-- proof-start -->
### 証明

$$
\phi(d):=f'(x;d)
$$

と置きます。正の斉次性は定義から従います。また凸性から

$$
f(x+t(d_1+d_2))
\le
\frac12 f(x+2td_1)
+
\frac12 f(x+2td_2)
$$

なので、$f(x)$ を引いて $t$ で割り $t\downarrow0$ とすると

$$
\phi(d_1+d_2)
\le
\phi(d_1)+\phi(d_2).
$$

従って $\phi$ は sublinear です。

$p\in\partial f(x)$ なら

$$
f(x+td)-f(x)
\ge
 t p^{\mathsf T}d,
$$

したがって

$$
p^{\mathsf T}d
\le
\phi(d).
$$

よって

$$
\sup_{p\in\partial f(x)}p^{\mathsf T}d
\le
\phi(d).
$$

逆向きを示します。方向 $d_0$ を固定し、一次元空間

$$
M=\operatorname{span}\{d_0\}
$$

上で

$$
\ell(td_0)=t\phi(d_0)
$$

と置きます。sublinear 性から $\ell\le\phi$ が $M$ 上で成り立ちます。Hahn–Banach により、$\ell$ は全空間上の線形汎関数 $p^{\mathsf T}d$ へ

$$
p^{\mathsf T}d
\le
\phi(d)
\qquad(\forall d)
$$

を保って延長できます。

凸関数の割線の傾きは右微分以上なので

$$
\phi(d)
\le
f(x+d)-f(x).
$$

従って

$$
p^{\mathsf T}d
\le
f(x+d)-f(x).
$$

$y=x+d$ と置けば

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x),
$$

すなわち $p\in\partial f(x)$ です。しかも $d_0$ 上では

$$
p^{\mathsf T}d_0
=
\phi(d_0).
$$

よって上限は達成され、主張を得ます。$\square$
<!-- proof-end -->

---

## 4. 劣微分の和則

<a id="thm-f0-02c4-sum-rule"></a>

<!-- formal-statement-start -->
> **定理（有限値凸関数の劣微分和則）**  
> $f,g:\mathbb R^n\to\mathbb R$ を有限値凸関数とすると、任意の $x$ で次が成り立ちます。

$$
\boxed{
\partial(f+g)(x)
=
\partial f(x)+\partial g(x)
}.
$$
<!-- formal-statement-end -->

一方向の包含は劣勾配不等式を足すだけです。非自明なのは逆向きです。

> **注意**  
> 拡張実数値凸関数の和則では、定義域の境界で退化を防ぐ条件が必要です。代表例は

$$
\operatorname{ri}(\operatorname{dom}f)
\cap
\operatorname{ri}(\operatorname{dom}g)
\neq\varnothing
$$

です。後の Fenchel 双対・constraint qualification と同じ系統の条件です。

<!-- proof-start -->
### 証明

平行移動して $x=0$、定数を引いて $f(0)=g(0)=0$ としてよいとします。

$p_1\in\partial f(0)$、$p_2\in\partial g(0)$ なら、劣勾配不等式を足すことで

$$
p_1+p_2\in\partial(f+g)(0)
$$

を得ます。

逆に $p\in\partial(f+g)(0)$ とします。$\mathbb R^{2n+2}$ で

$$
A
=
\{(u,v,r,s):r>f(u),\ s>g(v)\},
$$

$$
B
=
\{(w,w,r,s):r+s\le p^{\mathsf T}w\}
$$

と置きます。有限値凸関数は有限次元で連続なので $A$ は開凸集合、$B$ は凸集合であり、劣勾配条件から $A\cap B=\varnothing$ です。

分離定理により非零の $(a,b,\alpha,\beta)$ が両集合を分離します。$B$ で $r,s$ を負方向へ任意に動かせることから $\alpha,\beta\ge0$、さらに $(r,s)=(t,-t)$ を動かせるので

$$
\alpha=\beta=:\gamma.
$$

$(w,w,p^{\mathsf T}w,0)\in B$ を任意の $w$ に対して使うと

$$
a+b+\gamma p=0.
$$

$\gamma=0$ なら $a+b=0$ ですが、$A$ では $u,v$ を独立に動かせるため $a=b=0$ となり矛盾します。従って $\gamma>0$。全体を割って $\gamma=1$ とします。

$A$ 側で $r\downarrow f(u)$、$s\downarrow g(v)$ とすると

$$
a^{\mathsf T}u+b^{\mathsf T}v+f(u)+g(v)\ge0.
$$

$v=0$ とすれば $-a\in\partial f(0)$、$u=0$ とすれば $-b\in\partial g(0)$。さらに $a+b+p=0$ より

$$
p=(-a)+(-b).
$$

従って逆包含も成立します。$\square$
<!-- proof-end -->

---

## 5. max 関数の劣微分

有限個の有限値凸関数 $f_1,\ldots,f_m$ に対し

$$
h(x)=\max_{1\le i\le m}f_i(x)
$$

と置き、active index を

$$
I(x)=\{i:f_i(x)=h(x)\}
$$

とします。

<a id="thm-f0-02c4-max-subgradient"></a>

<!-- formal-statement-start -->
> **定理（max 関数の劣微分公式）**  
> $h$ の劣微分は active な各 $f_i$ の劣微分の凸包になります。

$$
\boxed{
\partial h(x)
=
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
}.
$$

> 特に各 $f_i$ が $x$ で微分可能なら次になります。

$$
\partial h(x)
=
\operatorname{conv}
\{\nabla f_i(x):i\in I(x)\}.
$$
<!-- formal-statement-end -->

### 5.1 なぜ active なものだけを見るのか

$x$ で値が最大に届いていない $f_j$ には正の隙間があります。有限値凸関数は有限次元で連続なので、十分小さい近傍ではその隙間が残り、方向微分を決めるのは $I(x)$ に属する active な関数だけです。

<!-- proof-start -->
### 証明

$p_i\in\partial f_i(x)$ $(i\in I(x))$ とし、$\alpha_i\ge0$、$\sum\alpha_i=1$ とします。任意の $y$ に対して

$$
\begin{aligned}
h(y)
&\ge
\sum_{i\in I(x)}\alpha_i f_i(y)\\
&\ge
h(x)
+
\left(
\sum_{i\in I(x)}\alpha_i p_i
\right)^{\mathsf T}(y-x).
\end{aligned}
$$

従って右辺の凸包は $\partial h(x)$ に含まれます。

逆向きは方向微分の支持関数表示を使います。active な関数だけが方向微分へ寄与するので

$$
h'(x;d)
=
\max_{i\in I(x)} f_i'(x;d).
$$

[方向微分の支持関数表示](#thm-f0-02c4-directional-support)から、右辺は

$$
C
:=
\operatorname{conv}
\bigcup_{i\in I(x)}\partial f_i(x)
$$

の support function、すなわち

$$
h'(x;d)
=
\sup_{q\in C}q^{\mathsf T}d
$$

です。$p\in\partial h(x)$ なら全方向で

$$
p^{\mathsf T}d
\le
h'(x;d)
=
\sup_{q\in C}q^{\mathsf T}d.
$$

もし $p\notin C$ なら有限次元の分離定理により、ある $d$ について

$$
p^{\mathsf T}d
>
\sup_{q\in C}q^{\mathsf T}d
$$

となり矛盾します。従って $p\in C$ です。$\square$
<!-- proof-end -->

---

## 6. indicator 関数と normal cone

G1 で導入した indicator 関数を再び使います。

<a id="def-f0-02c4-convex-indicator"></a>

<!-- formal-statement-start -->
> **定義（集合の indicator 関数）**  
> 集合 $C\subset\mathbb R^n$ に対して、次の拡張実数値関数を $C$ の **indicator 関数** といいます。

$$
\delta_C(x)
=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C.
\end{cases}
$$
<!-- formal-statement-end -->

<a id="def-f0-02c4-normal-cone"></a>

<!-- formal-statement-start -->
> **定義（normal cone）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対して、$C$ から外向きに支えるベクトル全体を $C$ の $x$ における **normal cone** といいます。$x\notin C$ では $N_C(x)=\varnothing$ とします。

$$
N_C(x)
=
\{v:v^{\mathsf T}(y-x)\le0\ \forall y\in C\}.
$$
<!-- formal-statement-end -->

### 6.1 例：$C=[0,\infty)$

内点 $x>0$ では左右に動けるので

$$
N_C(x)=\{0\}.
$$

境界 $x=0$ では $vy\le0$ が全ての $y\ge0$ で必要なので

$$
\boxed{N_C(0)=(-\infty,0]}.
$$

<a id="thm-f0-02c4-indicator-normal"></a>

<!-- formal-statement-start -->
> **定理（indicator 関数の劣微分は normal cone）**  
> 凸集合 $C$ と $x\in C$ に対して次が成り立ちます。

$$
\boxed{
\partial\delta_C(x)=N_C(x)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in C$ なので $\delta_C(x)=0$ です。$v\in\partial\delta_C(x)$ の条件は

$$
\delta_C(y)
\ge
v^{\mathsf T}(y-x)
\qquad(\forall y).
$$

$y\notin C$ では左辺が $+\infty$ なので自動的です。$y\in C$ では

$$
v^{\mathsf T}(y-x)\le0,
$$

となり、これは $v\in N_C(x)$ の定義そのものです。$\square$
<!-- proof-end -->

---

## 7. 制約付き凸最適化の一次条件

<a id="thm-f0-02c4-smooth-constrained-fermat"></a>

<!-- formal-statement-start -->
> **定理（凸集合上の微分可能凸最適化）**  
> $C\subset\mathbb R^n$ を非空凸集合、$f:\mathbb R^n\to\mathbb R$ を微分可能な凸関数とします。$x^*\in C$ に対して、$x^*$ が $C$ 上の大域最小点であることと、負の勾配が normal cone に入ることは同値です。

$$
\boxed{
x^*\in\arg\min_{x\in C}f(x)
\iff
-\nabla f(x^*)\in N_C(x^*)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^*$ が $C$ 上の最小点とします。任意の $y\in C$ に対して

$$
x^*+t(y-x^*)\in C
\qquad(0\le t\le1).
$$

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

従って

$$
-\nabla f(x^*)\in N_C(x^*).
$$

逆にこの normal cone 条件を仮定します。[F0-00G の一次支持不等式](../F0_00G_凸集合_凸関数_凸最適化/index.md#thm-f0-00g-first-order-convexity)から

$$
f(y)
\ge
f(x^*)+\nabla f(x^*)^{\mathsf T}(y-x^*),
$$

かつ normal cone 条件から第2項は非負です。従って $f(y)\ge f(x^*)$ が全ての $y\in C$ で成立します。$\square$
<!-- proof-end -->

より一般に非微分可能な proper convex function なら

$$
0\in\partial f(x^*)+N_C(x^*)
$$

が制約付き Fermat 条件の基本形になります。和則に必要な qualification は、後の G2 と C5/C5A で明示します。

---

## 8. 定義を具体例で検算する

<!-- definition-example-start: def-f0-02c4-subgradient-subdifferential -->
### 8.1 $|x|$ の原点で劣微分を確認

**定義の確認**

$f(x)=|x|$、$x=0$ とします。劣勾配の定義は

$$
|y|\ge py
\qquad(\forall y)
$$

です。$y>0$ から $p\le1$、$y<0$ から $p\ge-1$ を得ます。逆に $p\in[-1,1]$ なら両符号の $y$ で不等式が成立するため

$$
\partial |\cdot|(0)=[-1,1].
$$

これで「全ての $y$ に対してグラフを下から支える傾き」という定義を直接確認できます。
<!-- definition-example-end -->

<!-- definition-example-start: def-f0-02c4-convex-indicator, def-f0-02c4-normal-cone -->
### 8.2 半直線で indicator と normal cone を確認

**定義の確認**

$C=[0,\infty)$ とします。indicator の定義から

$$
\delta_C(1)=0,
\qquad
\delta_C(-1)=+\infty.
$$

また境界点 $x=0$ で normal cone の定義は

$$
vy\le0
\qquad(\forall y\ge0)
$$

なので

$$
N_C(0)=(-\infty,0].
$$

内点 $x>0$ では $y-x$ を正負両方向に取れるため $v=0$ しか許されず、$N_C(x)=\{0\}$ です。これで二つの定義を同じ集合で検算できます。
<!-- definition-example-end -->

---

## 9. 演習 Level A

### F0-02C4-A01 絶対値の劣微分

- Level: A
- 目安時間: 8分

$f(x)=|x|$ について $\partial f(0)$ を定義から求めよ。

<!-- solution-start -->
#### 詳細解答
$p\in\partial f(0)$ なら $|y|\ge py$ が全ての $y$ で必要。$y>0$ から $p\le1$、$y<0$ から $p\ge-1$。逆も成立するので

$$
\boxed{\partial f(0)=[-1,1]}.
$$

#### 本番答案
$|y|\ge py$ を $y>0,y<0$ に分け、$\boxed{[-1,1]}$。

#### 採点基準（20点）
- 劣勾配条件: 6点
- 必要条件: 8点
- 逆向き: 4点
- 結論: 2点
<!-- solution-end -->

### F0-02C4-A02 区間の normal cone

- Level: A
- 目安時間: 8分

$C=[0,1]$ について $N_C(0)$、$N_C(1/2)$、$N_C(1)$ を求めよ。

<!-- solution-start -->
#### 詳細解答
定義の符号から

$$
\boxed{
N_C(0)=(-\infty,0],\quad
N_C(1/2)=\{0\},\quad
N_C(1)=[0,\infty)
}.
$$

#### 本番答案
$\boxed{(-\infty,0],\ \{0\},\ [0,\infty)}$。

#### 採点基準（20点）
- 左端: 6点
- 内点: 5点
- 右端: 6点
- 結論: 3点
<!-- solution-end -->

### F0-02C4-A03 max 関数

- Level: A
- 目安時間: 10分

$$
h(x)=\max\{x,-x\}
$$

について $\partial h(0)$ を max 関数の公式から求めよ。

<!-- solution-start -->
#### 詳細解答
0では両方 active、勾配は $1,-1$ なので

$$
\boxed{
\partial h(0)
=
\operatorname{conv}\{-1,1\}
=[-1,1]
}.
$$

#### 本番答案
active gradient の凸包より $\boxed{[-1,1]}$。

#### 採点基準（20点）
- active index: 6点
- 勾配: 6点
- 凸包: 6点
- 結論: 2点
<!-- solution-end -->

---

## 10. 演習 Level B

### F0-02C4-B01 和則を使う

- Level: B
- 目安時間: 12分

$$
f(x)=|x|+\frac12(x-2)^2
$$

について $\partial f(0)$ を求め、0が最小点か判定せよ。

<!-- solution-start -->
#### 詳細解答
和則より

$$
\partial f(0)
=[-1,1]-2
=[-3,-1].
$$

0を含まないので Fermat 条件から0は最小点ではない。

#### 本番答案
$\partial f(0)=[-3,-1]\not\ni0$ より最小点でない。

#### 採点基準（20点）
- 和則: 6点
- 各劣微分: 6点
- 集合和: 4点
- Fermat判定: 4点
<!-- solution-end -->

### F0-02C4-B02 normal cone で制約付き最適性

- Level: B
- 目安時間: 12分

$$
f(x)=\frac12(x+1)^2,
\qquad
C=[0,\infty)
$$

とする。$x^*=0$ が制約付き最小点であることを normal cone 条件で確認せよ。

<!-- solution-start -->
#### 詳細解答
$f'(0)=1$、$N_C(0)=(-\infty,0]$ なので

$$
-f'(0)=-1\in N_C(0).
$$

従って $x^*=0$ は $C$ 上の大域的最小点。

#### 本番答案
$-f'(0)=-1\in N_C(0)$ より最小。

#### 採点基準（20点）
- 微分: 4点
- normal cone: 6点
- 包含確認: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C4-B03 max 関数の最小点

- Level: B
- 目安時間: 15分

$$
h(x)=\max\{(x-1)^2,(x+1)^2\}
$$

について $\partial h(0)$ を求め、0が大域的最小点であることを示せ。

<!-- solution-start -->
#### 詳細解答
0では両項が active、勾配は $-2,2$。従って

$$
\partial h(0)
=[-2,2]\ni0.
$$

Fermat 条件より0は大域的最小点。

#### 本番答案
$\partial h(0)=\operatorname{conv}\{-2,2\}=[-2,2]\ni0$。

#### 採点基準（20点）
- active判定: 4点
- 勾配計算: 6点
- max公式: 6点
- Fermat条件: 4点
<!-- solution-end -->

---

## 11. 次に進む

次の [F0-02C4A tangent cone・polar cone・dual cone](../F0_02C4A_tangent_polar_dual_cone/index.md) では、実行可能な一次方向と法線を錐の双対関係として整理します。その後 C4B で

$$
N_C(x)=T_C(x)^\circ
$$

を証明し、G2 で Fenchel 共役・Fenchel–Young・Fenchel 双対へ進みます。
