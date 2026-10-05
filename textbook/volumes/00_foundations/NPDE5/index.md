# NPDE5 多孔質媒質方程式・有限伝播速度

NPDE4 では、熱方程式の scaling、自己相似解、rescaled dynamics を学びました。線形熱方程式では、非零の非負初期値を熱核で畳み込むと、任意の正時刻に空間全体へ正の値が広がります。

では拡散係数そのものが解の大きさに依存し、$u=0$ の近くで拡散が弱くなると何が変わるでしょうか。

本章では

$$
u_t=\Delta(u^m),
\qquad
m>1,
\qquad
u\ge0
$$

を代表例にします。これは **多孔質媒質方程式** と呼ばれる非線形拡散方程式です。

中心となる問いは次です。

~~~text
線形熱方程式では瞬時に全空間へ広がる
  ↓
u=0 の近くで拡散が退化すると何が変わるか
  ↓
質量保存と scaling から自己相似指数を決める
  ↓
profile 方程式を解いて Barenblatt profile を得る
  ↓
profile が compact support を持つことを確認する
  ↓
比較原理を使うと一般の compact-support 初期値も有限時間で有界 support を保つ
  ↓
similarity variables で Barenblatt profile を定常解として読む
~~~

前提は [NPDE4 の scaling・自己相似](../NPDE4/index.md#def-npde4-parabolic-scaling)です。特に断らない限り、空間次元を $d\ge1$、指数を $m>1$ とします。

---

## 1. なぜ $m>1$ で「拡散の速さ」が変わるのか

多孔質媒質方程式は

$$
u_t=\Delta(u^m)
$$

です。

$u>0$ の領域で連鎖律を使うと

$$
\nabla(u^m)
=
m u^{m-1}\nabla u.
$$

従って

$$
u_t
=
\nabla\cdot
\left(
m u^{m-1}\nabla u
\right).
$$

線形熱方程式では拡散係数は定数 $1$ でした。ここでは実効的な拡散係数が

$$
m u^{m-1}
$$

です。

$m>1$ なら $u\downarrow0$ のとき

$$
m u^{m-1}\downarrow0.
$$

つまり解がほとんど無い場所では拡散そのものが弱くなります。この **退化** が、線形熱方程式には無かった自由境界と有限伝播を生みます。

<a id="def-npde5-porous-medium"></a>
<!-- formal-statement-start -->
> **定義（多孔質媒質方程式）**  
> $d\ge1$、$m>1$ とする。非負関数 $u=u(t,x)$ に対する方程式

$$
u_t=\Delta(u^m)
$$

> を本章では **多孔質媒質方程式** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde5-porous-medium -->
**定義の確認**：$m=2$ なら

$$
u_t=\Delta(u^2)
=
\nabla\cdot(2u\nabla u).
$$

$u$ が小さい場所では係数 $2u$ も小さくなります。$u=0$ の領域では、線形熱方程式のような一定強度の拡散は残りません。
<!-- definition-example-end -->

---

## 2. 弱形式と質量保存

自由境界では $u$ 自身が十分滑らかでないことがあります。そのため、方程式は分布の意味で読む必要があります。

本章では局所可積分な $u,u^m$ に対し、任意の

$$
\varphi\in C_c^\infty((0,\infty)\times\mathbb R^d)
$$

について

$$
\int_0^\infty
\int_{\mathbb R^d}
\left(
u\,\partial_t\varphi
+
u^m\Delta\varphi
\right)
dx\,dt
=
0
$$

を満たすものを弱解として扱います。

多孔質媒質方程式では、まず全質量が時間に依らず保たれることを確認します。

<a id="prop-npde5-mass-conservation"></a>
<!-- formal-statement-start -->
> **命題（質量保存）**  
> $u$ を多孔質媒質方程式の非負解とし、各時刻で $u(t,\cdot)\in L^1(\mathbb R^d)$ とする。さらに無限遠での flux が消え、以下の積分操作が正当化できるとする。このとき

$$
M
=
\int_{\mathbb R^d}
u(t,x)\,dx
$$

> は時間に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

方程式を全空間で積分します。右辺は Laplacian なので、境界 flux が無限遠で消えれば積分値は0です。

<!-- proof-start -->
### 証明

十分滑らかで十分減衰する場合をまず計算します。

$$
\frac{d}{dt}
\int_{\mathbb R^d}
u(t,x)\,dx
=
\int_{\mathbb R^d}
\Delta(u^m)(t,x)\,dx.
$$

半径 $R$ の球 $B_R$ で積分し、発散定理を使うと

$$
\int_{B_R}
\Delta(u^m)\,dx
=
\int_{\partial B_R}
\nabla(u^m)\cdot n\,dS.
$$

仮定した減衰により $R\to\infty$ で右辺は0へ収束します。従って

$$
\frac{d}{dt}
\int_{\mathbb R^d}
u(t,x)\,dx
=
0.
$$

弱解では定数関数 $1$ そのものは compact support を持たないため、$1$ に近づく cutoff をテスト関数へ入れます。cutoff の Laplacian が遠方へ逃げ、その寄与が0へ収束する条件の下で同じ結論を得ます。
<!-- proof-end -->

この質量保存が、自己相似指数を一つ固定します。

---

## 3. scaling 指数を完成式からではなく方程式から決める

まず

$$
u_\lambda(t,x)
=
\lambda^a
u(\lambda^b t,\lambda x)
$$

と置きます。

時間微分は

$$
\partial_tu_\lambda
=
\lambda^{a+b}
u_t(\lambda^bt,\lambda x).
$$

一方

$$
u_\lambda^m
=
\lambda^{am}
u(\lambda^bt,\lambda x)^m
$$

なので

$$
\Delta(u_\lambda^m)
=
\lambda^{am+2}
\Delta(u^m)(\lambda^bt,\lambda x).
$$

方程式を不変にするには

$$
a+b
=
am+2.
$$

従って

$$
b
=
a(m-1)+2.
$$

ここまでは一つ自由度が残っています。

質量も保存する scaling を選ぶと

$$
\int u_\lambda(t,x)\,dx
=
\lambda^{a-d}
\int u(\lambda^bt,y)\,dy.
$$

よって

$$
a=d.
$$

したがって

$$
\boxed{
u_\lambda(t,x)
=
\lambda^d
u\left(
\lambda^{d(m-1)+2}t,
\lambda x
\right)
}
$$

が質量保存型 scaling です。

時間の自己相似形

$$
u(t,x)
=
t^{-\alpha}
F(xt^{-\beta})
$$

へ移ります。

空間変数を

$$
y=xt^{-\beta}
$$

と置くと、質量保存から

$$
-\alpha+d\beta=0,
$$

すなわち

$$
\alpha=d\beta.
$$

また方程式の時間指数を合わせると

$$
\alpha+1
=
m\alpha+2\beta.
$$

ここへ $\alpha=d\beta$ を代入して

$$
1
=
[d(m-1)+2]\beta.
$$

従って

<a id="prop-npde5-similarity-exponents"></a>
<!-- formal-statement-start -->
> **命題（多孔質媒質方程式の質量保存型自己相似指数）**  
> $m>1$ とする。多孔質媒質方程式で質量を保存する自己相似形

$$
u(t,x)
=
t^{-\alpha}
F(xt^{-\beta})
$$

> の指数は

$$
\boxed{
\beta
=
\frac{1}{d(m-1)+2},
\qquad
\alpha
=
\frac{d}{d(m-1)+2}
}
$$

> に固定される。
<!-- formal-statement-end -->

線形極限 $m\downarrow1$ では

$$
\beta\to\frac12,
\qquad
\alpha\to\frac d2,
$$

となり、NPDE4 の熱核 scaling に戻ります。

---

## 4. profile 方程式から Barenblatt 形を導く

自己相似形

$$
u(t,x)
=
t^{-\alpha}F(y),
\qquad
y=xt^{-\beta}
$$

を方程式へ代入します。

時間微分は

$$
u_t
=
t^{-\alpha-1}
\left(
-\alpha F
-
\beta y\cdot\nabla F
\right).
$$

右辺は

$$
\Delta_x(u^m)
=
t^{-m\alpha-2\beta}
\Delta_y(F^m).
$$

指数関係

$$
\alpha+1
=
m\alpha+2\beta
$$

を使うと共通因子を消せて

$$
-\alpha F
-
\beta y\cdot\nabla F
=
\Delta(F^m).
$$

さらに $\alpha=d\beta$ なので

$$
-\beta
\left(
dF+y\cdot\nabla F
\right)
=
\Delta(F^m).
$$

左辺の括弧は

$$
\nabla\cdot(yF)
=
dF+y\cdot\nabla F
$$

です。従って

$$
\nabla\cdot
\left(
\nabla(F^m)+\beta yF
\right)
=
0.
$$

放射対称で中心に flux を持たない profile を探すと、自然な一段強い条件

$$
\nabla(F^m)
+
\beta yF
=
0
$$

を課せます。

$F>0$ の領域では

$$
\nabla(F^m)
=
mF^{m-1}\nabla F.
$$

従って

$$
mF^{m-2}\nabla F
=
-\beta y.
$$

ここで

$$
\nabla(F^{m-1})
=
(m-1)F^{m-2}\nabla F
$$

なので

$$
\nabla(F^{m-1})
=
-\frac{(m-1)\beta}{m}y.
$$

積分すると

$$
F^{m-1}
=
C
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

正の部分だけを残して

$$
F(y)
=
\left(
C-k|y|^2
\right)_+^{1/(m-1)},
\qquad
k
=
\frac{(m-1)\beta}{2m}.
$$

これが Barenblatt 型 profile です。

<a id="thm-npde5-barenblatt"></a>
<!-- formal-statement-start -->
> **定理（Barenblatt 型自己相似解）**  
> $m>1$ とし、

$$
\beta
=
\frac{1}{d(m-1)+2},
\qquad
\alpha=d\beta,
\qquad
k=\frac{(m-1)\beta}{2m}.
$$

> 任意の $C>0$ に対し

$$
\mathcal B_C(t,x)
=
t^{-\alpha}
\left(
C
-
k|x|^2t^{-2\beta}
\right)_+^{1/(m-1)}
$$

> と置く。このとき $\mathcal B_C$ は $t>0$ で多孔質媒質方程式の非負弱解であり、各時刻で compact support を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

正の集合の内部では上で導いた profile 方程式を満たします。界面では $F$ 自身の微分より $F^m$ の微分を見るのが重要です。$F^m$ は境界で0へ行き、その勾配も0へ行くため、Laplacian に余分な境界 delta が生じません。

<!-- proof-start -->
### 証明

正の集合

$$
C-k|y|^2>0
$$

では導出済みの等式

$$
\nabla(F^m)+\beta yF=0
$$

が成り立ちます。発散を取れば

$$
\Delta(F^m)
+
\beta\nabla\cdot(yF)
=
0.
$$

$\alpha=d\beta$ より

$$
\Delta(F^m)
+
\alpha F
+
\beta y\cdot\nabla F
=
0,
$$

これは自己相似形を PDE へ代入した profile 方程式そのものです。

次に界面を確認します。

$$
F^m
=
\left(
C-k|y|^2
\right)_+^{m/(m-1)}.
$$

指数

$$
\frac{m}{m-1}>1
$$

なので、正の側から界面へ近づくと

$$
F^m\to0
$$

だけでなく

$$
\nabla(F^m)
=
-\beta yF
\to0.
$$

したがって $F^m$ とその一階微分は界面を越えて0へ連続につながり、分布微分で界面上の追加 delta 項を生じません。よって全空間で弱形式を満たします。
<!-- proof-end -->

---

## 5. $m=2$, $d=1$ を手で見る

$m=2$、$d=1$ なら

$$
\beta
=
\frac{1}{1(2-1)+2}
=
\frac13,
\qquad
\alpha
=
\frac13.
$$

さらに

$$
k
=
\frac{(2-1)(1/3)}{2\cdot2}
=
\frac1{12}.
$$

従って

$$
\boxed{
\mathcal B_C(t,x)
=
t^{-1/3}
\left(
C
-
\frac{x^2}{12t^{2/3}}
\right)_+
}
$$

です。

正である条件は

$$
C-\frac{x^2}{12t^{2/3}}>0,
$$

つまり

$$
|x|
<
\sqrt{12C}\,t^{1/3}.
$$

解は時間とともに広がりますが、各有限時刻では有限区間の外で厳密に0です。

この「尾が小さい」のではなく「本当に0である」という点が Gaussian との決定的な違いです。

---

## 6. 有限伝播速度とは何を意味するのか

「有限伝播速度」は、support 境界の瞬間速度がすべての時刻で一様有界という意味ではありません。Barenblatt 解では

$$
R(t)
=
R_*t^\beta
$$

なので

$$
R'(t)
=
\beta R_*t^{\beta-1}
$$

であり、$t\downarrow0$ では発散することさえあります。

重要なのは、compact support の情報が正時刻に瞬時に全空間へ広がらないことです。

<a id="def-npde5-finite-propagation"></a>
<!-- formal-statement-start -->
> **定義（有限伝播）**  
> compact support を持つ非負初期値から出る解 $u$ が、任意の有限時刻 $T>0$ に対してある有限な半径 $R_T$ を持ち、

$$
\operatorname{supp}u(t,\cdot)
\subset B_{R_T}
\qquad
(0\le t\le T)
$$

> を満たすとき、本章ではその解が **有限伝播** を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde5-finite-propagation -->
**定義の確認**：Barenblatt 解では

$$
\operatorname{supp}\mathcal B_C(t,\cdot)
=
\overline{
B_{
\sqrt{C/k}\,t^\beta
}
}.
$$

したがって $0<t\le T$ なら

$$
\operatorname{supp}\mathcal B_C(t,\cdot)
\subset
\overline{
B_{
\sqrt{C/k}\,T^\beta
}
},
$$

なので有限伝播です。
<!-- definition-example-end -->

<a id="prop-npde5-barenblatt-support"></a>
<!-- formal-statement-start -->
> **命題（Barenblatt 解の support 半径）**  
> Barenblatt 解 $\mathcal B_C$ の support 半径は

$$
R_C(t)
=
\sqrt{\frac Ck}\,t^\beta
$$

> であり、$\beta=1/[d(m-1)+2]$ である。
<!-- formal-statement-end -->

---

## 7. 一般の compact-support 初期値へどう広げるか

明示解が compact support を持つだけでは、一般の初期値について有限伝播を証明したことにはなりません。

ここで一つ、非線形拡散の標準的な解理論から **比較原理** を入力として使います。

> **この章で使う比較原理**  
> 同じ $m>1$ に対する二つの非負弱解 $u,v$ が初期時刻に $u_0\le v_0$ を満たすなら、その後も $u(t,\cdot)\le v(t,\cdot)$ が保たれる。

この比較原理の一般弱解に対する完全証明は、近似解・収縮性・極限通過を含むため本章では黒箱とします。ここでは **何に使うか** を完全に追います。

<a id="prop-npde5-compact-support-propagation"></a>
<!-- formal-statement-start -->
> **命題（比較原理から従う compact support の有限伝播）**  
> $u$ を多孔質媒質方程式の非負弱解とし、比較原理が成り立つ解のクラスに属するとする。初期値が

$$
0\le u_0(x)
\le
L\,\mathbf 1_{B_{R_0}}(x)
$$

> を満たすなら、適切な $\tau>0$ と $C>0$ が存在し、

$$
u(t,x)
\le
\mathcal B_C(t+\tau,x)
$$

> となる。従って任意の有限時刻で $u(t,\cdot)$ は compact support を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

時刻を少し前へずらした Barenblatt 解を大きな傘として初期値の上に置きます。比較原理が、その順序を未来へ運びます。

<!-- proof-start -->
### 証明

$\tau>0$ を固定し、Barenblatt 解の時刻 $\tau$ での support 半径が $2R_0$ になるよう

$$
\sqrt{\frac Ck}\,\tau^\beta
=
2R_0
$$

と選びます。これは

$$
C
=
4kR_0^2\tau^{-2\beta}
$$

を意味します。

$|x|\le R_0$ なら

$$
C-k|x|^2\tau^{-2\beta}
\ge
4kR_0^2\tau^{-2\beta}
-
kR_0^2\tau^{-2\beta}
=
3kR_0^2\tau^{-2\beta}.
$$

したがって

$$
\mathcal B_C(\tau,x)
\ge
\tau^{-\alpha}
\left(
3kR_0^2\tau^{-2\beta}
\right)^{1/(m-1)}.
$$

右辺は $\tau\downarrow0$ で無限大へ発散します。よって $\tau$ を十分小さく選べば

$$
\mathcal B_C(\tau,x)
\ge L
\qquad
(|x|\le R_0)
$$

とできます。

$|x|>R_0$ では $u_0(x)=0$ なので、結局全空間で

$$
u_0(x)
\le
\mathcal B_C(\tau,x)
$$

です。

時間平行移動した

$$
v(t,x)
=
\mathcal B_C(t+\tau,x)
$$

も多孔質媒質方程式の解です。比較原理から

$$
u(t,x)
\le
v(t,x)
$$

を得ます。

$v(t,\cdot)$ の support は

$$
B_{
\sqrt{C/k}(t+\tau)^\beta
}
$$

に含まれるので、非負性から $u(t,x)=0$ もその球の外で従います。
<!-- proof-end -->

ここで使った比較原理こそが、明示解の情報を一般解へ運ぶ橋です。明示 profile の support を計算しただけで一般論が自動的に出るわけではありません。

---

## 8. 線形熱方程式はなぜ瞬時に全空間へ広がるのか

線形熱方程式

$$
u_t=\Delta u
$$

の非負初期値 $u_0\not\equiv0$ に対する解は

$$
u(t,x)
=
\int_{\mathbb R^d}
G_t(x-y)u_0(y)\,dy
$$

です。

$t>0$ なら Gaussian 熱核は

$$
G_t(z)>0
$$

をすべての $z\in\mathbb R^d$ で満たします。

したがって $u_0\ge0$ かつ非零なら、$u_0>0$ の集合上で被積分関数が正なので

$$
u(t,x)>0
$$

がすべての $x$ で成り立ちます。

つまり線形熱方程式には **無限伝播速度** があります。

対して多孔質媒質方程式では、$u=0$ の近くで係数 $m u^{m-1}$ が0へ落ちるため、ゼロ領域を一瞬で埋める機構が失われます。

---

## 9. pressure variable で自由境界を見る

自由境界の運動を見やすくするため、

$$
p
=
\frac{m}{m-1}
u^{m-1}
$$

と置きます。

$u>0$ の領域では

$$
\nabla p
=
m u^{m-2}\nabla u.
$$

したがって

$$
u\nabla p
=
m u^{m-1}\nabla u
=
\nabla(u^m).
$$

よって PDE は

$$
u_t
=
\nabla\cdot(u\nabla p)
$$

とも書けます。

<a id="def-npde5-pressure"></a>
<!-- formal-statement-start -->
> **定義（多孔質媒質方程式の pressure variable）**  
> $u\ge0$ に対し

$$
p
=
\frac{m}{m-1}
u^{m-1}
$$

> を多孔質媒質方程式の **pressure variable** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde5-pressure -->
**定義の確認**：$m=2$ なら

$$
p=2u.
$$

この場合、$u$ の support と $p$ の support は一致し、自由境界を pressure のゼロ集合として見ることができます。
<!-- definition-example-end -->

<a id="prop-npde5-pressure-equation"></a>
<!-- formal-statement-start -->
> **命題（pressure equation）**  
> $u>0$ の領域で十分滑らかな多孔質媒質方程式の解に対し、pressure variable は

$$
\boxed{
p_t
=
(m-1)p\Delta p
+
|\nabla p|^2
}
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義から

$$
p_t
=
m u^{m-2}u_t.
$$

また

$$
u_t
=
\nabla\cdot(u\nabla p)
=
\nabla u\cdot\nabla p
+
u\Delta p.
$$

さらに

$$
\nabla p
=
m u^{m-2}\nabla u
$$

なので

$$
\nabla u
=
\frac1m
u^{2-m}\nabla p.
$$

従って第一項は

$$
m u^{m-2}
\nabla u\cdot\nabla p
=
m u^{m-2}
\left(
\frac1m
u^{2-m}\nabla p
\right)
\cdot\nabla p
=
|\nabla p|^2.
$$

第二項は

$$
m u^{m-2}
u\Delta p
=
m u^{m-1}\Delta p.
$$

pressure の定義式

$
p
=
\frac{m}{m-1}
u^{m-1}
$$

から

$$
m u^{m-1}
=
(m-1)p.
$$

よって

$$
p_t
=
|\nabla p|^2
+
(m-1)p\Delta p.
$$
<!-- proof-end -->

Barenblatt 解では positivity set の内部で pressure は $|x|^2$ の一次式になります。自由境界の位置が明示的に読める理由の一つです。

---

## 10. mass と parameter $C$ の関係

Barenblatt profile の $C$ は単なる飾りではなく、質量を決めます。

時刻によらず

$$
M
=
\int_{\mathbb R^d}
\mathcal B_C(t,x)\,dx
=
\int_{\mathbb R^d}
F_C(y)\,dy.
$$

放射座標で

$$
F_C(y)
=
(C-k|y|^2)_+^{1/(m-1)}
$$

を積分すると

$$
M
=
\omega_d
\int_0^{\sqrt{C/k}}
(C-kr^2)^{1/(m-1)}
r^{d-1}\,dr.
$$

$$
r
=
\sqrt{\frac Ck}s
$$

と置けば

$$
M
=
A_{d,m}
C^{
\frac1{m-1}+\frac d2
},
$$

ここで $A_{d,m}>0$ は $d,m$ のみで決まります。

指数をまとめると

$$
\frac1{m-1}+\frac d2
=
\frac{d(m-1)+2}{2(m-1)}.
$$

従って

$$
C
\asymp
M^{
\frac{2(m-1)}{d(m-1)+2}
}.
$$

support 半径の係数は $\sqrt C$ に比例するため、

$$
R_C(t)
\asymp
M^{
\frac{m-1}{d(m-1)+2}
}
t^\beta.
$$

質量が大きいほど広い profile になります。

---

## 11. similarity variables では Barenblatt profile が止まる

$t=e^\tau$ とし、

$$
y
=
xt^{-\beta},
\qquad
v(\tau,y)
=
t^\alpha u(t,t^\beta y)
$$

と置きます。

これは

$$
u(t,x)
=
t^{-\alpha}v(\tau,y)
$$

と同じです。

時間微分は

$$
u_t
=
t^{-\alpha-1}
\left(
v_\tau
-
\alpha v
-
\beta y\cdot\nabla v
\right).
$$

一方

$$
\Delta_x(u^m)
=
t^{-m\alpha-2\beta}
\Delta_y(v^m).
$$

指数関係

$$
\alpha+1
=
m\alpha+2\beta
$$

を使うと

$$
v_\tau
-
\alpha v
-
\beta y\cdot\nabla v
=
\Delta(v^m).
$$

$\alpha=d\beta$ を使えば

$$
\alpha v+\beta y\cdot\nabla v
=
\beta\nabla\cdot(yv).
$$

従って

<a id="prop-npde5-rescaled-pme"></a>
<!-- formal-statement-start -->
> **命題（rescaled porous medium equation）**  
> 上の similarity variables で定めた $v$ は

$$
\boxed{
v_\tau
=
\Delta(v^m)
+
\beta\nabla\cdot(yv)
}
$$

> を満たす。
<!-- formal-statement-end -->

Barenblatt 解

$$
u(t,x)
=
t^{-\alpha}F(xt^{-\beta})
$$

に対しては

$$
v(\tau,y)=F(y)
$$

なので、Barenblatt profile は rescaled dynamics の定常解です。

NPDE7 では、この「定常解である」という事実からさらに進み、一般解が適切な rescaling の下で Barenblatt profile へ近づくという長時間漸近を扱います。本章では convergence 自体は先取りしません。

---

## 12. この章で分かったこと

線形熱方程式と多孔質媒質方程式の差は、単に非線形項が増えたというだけではありません。

- $m>1$ では $u=0$ 近傍で拡散係数が退化する。
- 質量保存と PDE scaling から $\alpha,\beta$ が決まる。
- profile 方程式を積分すると Barenblatt profile が現れる。
- Barenblatt profile は compact support を持ち、support 半径は $t^\beta$ で広がる。
- 比較原理を使うと、一般の bounded compact-support 初期値にも有限伝播を移せる。
- 線形熱方程式では Gaussian kernel が全点で正なので、正時刻に瞬時に全空間へ広がる。
- pressure variable は退化拡散と自由境界を見やすくする。
- similarity variables では Barenblatt profile が定常解になる。

存在論だけでなく、「解がどこまで広がるか」という幾何学的な情報が PDE の非線形性によって変わることが、この方程式の主役です。

---

# 演習

## Level A

<a id="ex-npde5-a01"></a>
### NPDE5-A01 質量保存型 scaling
- Level: A

$$
u_\lambda(t,x)
=
\lambda^a
u(\lambda^bt,\lambda x)
$$

とする。

1. $\partial_tu_\lambda$ の倍率を求めよ。
2. $\Delta(u_\lambda^m)$ の倍率を求めよ。
3. 方程式不変条件を求めよ。
4. 質量保存条件を加えて $a,b$ を求めよ。

<!-- solution-start -->
#### 詳細解答

時間微分では

$$
\partial_tu_\lambda
=
\lambda^{a+b}
u_t(\lambda^bt,\lambda x).
$$

一方

$$
u_\lambda^m
=
\lambda^{am}
u(\lambda^bt,\lambda x)^m
$$

なので、Laplacian からさらに $\lambda^2$ が出て

$$
\Delta(u_\lambda^m)
=
\lambda^{am+2}
\Delta(u^m)(\lambda^bt,\lambda x).
$$

従って

$$
a+b=am+2.
$$

また

$$
\int u_\lambda(t,x)\,dx
=
\lambda^{a-d}
\int u(\lambda^bt,y)\,dy
$$

なので質量保存には $a=d$ が必要です。

これを代入して

$$
b=d(m-1)+2.
$$
<!-- solution-end -->

<a id="ex-npde5-a02"></a>
### NPDE5-A02 自己相似指数
- Level: A

$d=2$、$m=3$ とする。質量保存型自己相似指数 $\alpha,\beta$ を求めよ。

<!-- solution-start -->
#### 詳細解答

一般式は

$$
\beta
=
\frac1{d(m-1)+2},
\qquad
\alpha=d\beta.
$$

$d=2$、$m=3$ なので

$$
d(m-1)+2
=
2\cdot2+2
=
6.
$$

従って

$$
\beta=\frac16,
\qquad
\alpha=\frac13.
$$

確認すると

$$
\alpha+1
=
\frac43,
$$

一方

$$
m\alpha+2\beta
=
3\cdot\frac13
+
2\cdot\frac16
=
\frac43.
$$
<!-- solution-end -->

<a id="ex-npde5-a03"></a>
### NPDE5-A03 $m=2,d=1$ の support
- Level: A

$$
u(t,x)
=
t^{-1/3}
\left(
C-\frac{x^2}{12t^{2/3}}
\right)_+
$$

とする。

1. support を求めよ。
2. support 半径 $R(t)$ を求めよ。
3. 時刻を8倍すると半径は何倍になるか。

<!-- solution-start -->
#### 詳細解答

正である条件は

$$
C-\frac{x^2}{12t^{2/3}}>0.
$$

従って

$$
x^2<12Ct^{2/3},
$$

すなわち

$$
|x|<\sqrt{12C}\,t^{1/3}.
$$

よって

$$
R(t)
=
\sqrt{12C}\,t^{1/3}.
$$

時刻を $8t$ にすると

$$
R(8t)
=
\sqrt{12C}(8t)^{1/3}
=
2R(t).
$$
<!-- solution-end -->

<a id="ex-npde5-a04"></a>
### NPDE5-A04 線形熱方程式の無限伝播
- Level: A

$u_0\ge0$、$u_0\not\equiv0$ とし、$u_0$ は compact support を持つとする。熱方程式の解

$$
u(t,x)=G_t*u_0(x)
$$

が $t>0$ で全ての $x$ に対して正であることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$t>0$ では Gaussian 熱核は全空間で

$$
G_t(z)>0
$$

です。

固定した $x$ に対し

$$
u(t,x)
=
\int
G_t(x-y)u_0(y)\,dy.
$$

$u_0$ は非負で非零なので、正測度の集合上で $u_0(y)>0$ です。その集合では $G_t(x-y)>0$ でもあるため、被積分関数は正です。

従って

$$
u(t,x)>0.
$$

$x$ は任意だったので、正時刻には support は全空間へ広がります。
<!-- solution-end -->

<a id="ex-npde5-a05"></a>
### NPDE5-A05 pressure equation の係数
- Level: A

$$
p=\frac{m}{m-1}u^{m-1}
$$

とする。

1. $\nabla p$ を求めよ。
2. $\nabla(u^m)=u\nabla p$ を示せ。
3. $m=2$ のとき pressure equation を書け。

<!-- solution-start -->
#### 詳細解答

連鎖律から

$$
\nabla p
=
\frac{m}{m-1}
(m-1)u^{m-2}\nabla u
=
m u^{m-2}\nabla u.
$$

従って

$$
u\nabla p
=
m u^{m-1}\nabla u
=
\nabla(u^m).
$$

$m=2$ では

$$
p_t
=
(m-1)p\Delta p+|\nabla p|^2
$$

へ代入して

$$
\boxed{
p_t
=
p\Delta p+|\nabla p|^2
}.
$$
<!-- solution-end -->

## Level B

<a id="ex-npde5-b01"></a>
### NPDE5-B01 Barenblatt profile の係数を導く
- Level: B

質量保存型 profile $F$ が

$$
\nabla(F^m)+\beta yF=0
$$

を満たすとする。$F>0$ の領域で

$$
F(y)
=
(C-k|y|^2)^{1/(m-1)}
$$

を導き、$k$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\nabla(F^m)
=
mF^{m-1}\nabla F.
$$

方程式を $F>0$ で $F$ により割ると

$$
mF^{m-2}\nabla F
=
-\beta y.
$$

一方

$$
\nabla(F^{m-1})
=
(m-1)F^{m-2}\nabla F.
$$

従って

$$
\nabla(F^{m-1})
=
-\frac{(m-1)\beta}{m}y.
$$

$|y|^2$ の勾配は $2y$ なので積分すると

$$
F^{m-1}
=
C
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

よって

$$
F(y)
=
\left(
C-k|y|^2
\right)^{1/(m-1)}
$$

で

$$
\boxed{
k
=
\frac{(m-1)\beta}{2m}
}.
$$
<!-- solution-end -->

<a id="ex-npde5-b02"></a>
### NPDE5-B02 質量から $C$ の scaling を求める
- Level: B

Barenblatt profile

$$
F_C(y)
=
(C-k|y|^2)_+^{1/(m-1)}
$$

の質量を $M$ とする。

1. $r=\sqrt{C/k}\,s$ と変数変換せよ。
2. $M$ の $C$ 依存性を求めよ。
3. support 半径の係数が $M$ の何乗に比例するか求めよ。

<!-- solution-start -->
#### 詳細解答

放射座標により

$$
M
=
\omega_d
\int_0^{\sqrt{C/k}}
(C-kr^2)^{1/(m-1)}
r^{d-1}\,dr.
$$

$$
r=\sqrt{\frac Ck}s
$$

と置くと

$$
dr=\sqrt{\frac Ck}\,ds,
$$

また

$$
r^{d-1}dr
=
\left(
\frac Ck
\right)^{d/2}
s^{d-1}ds.
$$

さらに

$$
C-kr^2
=
C(1-s^2).
$$

従って

$$
M
=
A_{d,m}
C^{1/(m-1)+d/2}.
$$

指数は

$$
\frac1{m-1}+\frac d2
=
\frac{d(m-1)+2}{2(m-1)}.
$$

よって

$$
C
\asymp
M^{\frac{2(m-1)}{d(m-1)+2}}.
$$

support 半径係数は $\sqrt{C/k}$ であり、$k$ は $M$ に依存しないので

$$
\boxed{
R_*
\asymp
M^{\frac{m-1}{d(m-1)+2}}
}.
$$
<!-- solution-end -->

<a id="ex-npde5-b03"></a>
### NPDE5-B03 Barenblatt pressure を計算する
- Level: B

Barenblatt 解の positivity set 内で pressure

$$
p
=
\frac{m}{m-1}u^{m-1}
$$

を計算し、$|x|^2$ に関して一次式になることを示せ。

<!-- solution-start -->
#### 詳細解答

Barenblatt 解は

$$
u
=
t^{-\alpha}
\left(
C-k|x|^2t^{-2\beta}
\right)^{1/(m-1)}
$$

です。

従って

$$
u^{m-1}
=
t^{-\alpha(m-1)}
\left(
C-k|x|^2t^{-2\beta}
\right).
$$

よって

$$
\boxed{
p(t,x)
=
\frac{m}{m-1}
t^{-\alpha(m-1)}
\left(
C-k|x|^2t^{-2\beta}
\right)
}
$$

です。

固定時刻では定数項から $|x|^2$ に比例する項を引いた形であり、自由境界はこの一次式が0になる位置として読めます。
<!-- solution-end -->

<a id="ex-npde5-b04"></a>
### NPDE5-B04 rescaled porous medium equation
- Level: B

$$
u(t,x)
=
t^{-\alpha}
v(\log t,xt^{-\beta})
$$

とする。

1. $u_t$ を計算せよ。
2. $\Delta(u^m)$ を計算せよ。
3. $\alpha+1=m\alpha+2\beta$ と $\alpha=d\beta$ を使い、rescaled equation を導け。

<!-- solution-start -->
#### 詳細解答

$\tau=\log t$、$y=xt^{-\beta}$ と置きます。

$$
\frac{d\tau}{dt}
=
\frac1t,
\qquad
\frac{dy}{dt}
=
-\frac{\beta}{t}y.
$$

従って

$$
u_t
=
t^{-\alpha-1}
\left(
v_\tau
-\alpha v
-\beta y\cdot\nabla v
\right).
$$

また

$$
u^m
=
t^{-m\alpha}v^m,
$$

空間微分一回につき $t^{-\beta}$ が出るので

$$
\Delta_x(u^m)
=
t^{-m\alpha-2\beta}
\Delta_y(v^m).
$$

指数関係から両辺の $t$ の冪は一致し、

$$
v_\tau
-\alpha v
-\beta y\cdot\nabla v
=
\Delta(v^m).
$$

$\alpha=d\beta$ より

$$
\alpha v+\beta y\cdot\nabla v
=
\beta
\left(
dv+y\cdot\nabla v
\right)
=
\beta\nabla\cdot(yv).
$$

従って

$$
\boxed{
v_\tau
=
\Delta(v^m)
+
\beta\nabla\cdot(yv)
}.
$$
<!-- solution-end -->

## Level C

<a id="ex-npde5-c01"></a>
### NPDE5-C01 Barenblatt barrier から有限伝播を再構成する
- Level: C

比較原理が成り立つ非負弱解 $u$ を考える。初期値は

$$
0\le u_0(x)
\le
L\mathbf 1_{B_{R_0}}(x)
$$

を満たすとする。

1. $\mathcal B_C(\tau,\cdot)$ の support 半径を $2R_0$ にする $C$ を求めよ。
2. $|x|\le R_0$ で $\mathcal B_C(\tau,x)$ の下界を求めよ。
3. $\tau$ を十分小さくすると $u_0\le\mathcal B_C(\tau,\cdot)$ とできることを示せ。
4. 比較原理から $u(t,\cdot)$ の support 上界を求めよ。
5. 同じ議論が線形熱方程式では成立しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

Barenblatt support 半径は

$$
R_C(\tau)
=
\sqrt{\frac Ck}\tau^\beta.
$$

これを $2R_0$ にするには

$$
\sqrt{\frac Ck}\tau^\beta
=
2R_0,
$$

従って

$$
\boxed{
C
=
4kR_0^2\tau^{-2\beta}
}
$$

とすればよいです。

$|x|\le R_0$ なら

$$
C-k|x|^2\tau^{-2\beta}
\ge
3kR_0^2\tau^{-2\beta}.
$$

したがって

$$
\mathcal B_C(\tau,x)
\ge
\tau^{-\alpha}
\left(
3kR_0^2\tau^{-2\beta}
\right)^{1/(m-1)}.
$$

右辺の $\tau$ の指数は負なので、$\tau\downarrow0$ で無限大へ発散します。よって $\tau$ を十分小さく取れば、この下界を $L$ 以上にできます。

すると $|x|\le R_0$ では

$$
u_0(x)\le L\le\mathcal B_C(\tau,x),
$$

$|x|>R_0$ では $u_0(x)=0$ なので、全空間で

$$
u_0\le\mathcal B_C(\tau,\cdot)
$$

です。

時間平行移動した

$$
v(t,x)=\mathcal B_C(t+\tau,x)
$$

も解なので、比較原理から

$$
u(t,x)\le v(t,x).
$$

したがって

$$
\operatorname{supp}u(t,\cdot)
\subset
\overline{
B_{
\sqrt{C/k}(t+\tau)^\beta
}
}.
$$

これが任意の有限 $t$ で有限半径なので、有限伝播が従います。

線形熱方程式では、基本解 Gaussian が任意の $t>0$ で全空間に正の尾を持ちます。したがって compact support を持つ Barenblatt 型の上側 barrier そのものが存在せず、非零の非負初期値は正時刻に全空間へ広がります。
<!-- solution-end -->
