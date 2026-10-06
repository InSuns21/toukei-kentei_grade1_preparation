# HJC2 粘性解・比較原理・一意性

<!-- definition-example-audit: strict -->

HJC1 では、動的計画原理から

$$
V_t+\mathcal H(x,\nabla V)=0
$$

という HJB equation を導きました。

しかし同じ章の bang-bang 例では、

$$
V(t,x)=\max\{|x|-(T-t),0\}
$$

が自然に現れ、切替境界

$$
|x|=T-t
$$

で $V$ は微分できませんでした。

ここで困っているのは HJB 自体ではありません。動的計画原理は切替境界でも壊れていません。壊れたのは

$$
\text{「解そのものを点ごとに微分して PDE を読む」}
$$

という古典解の読み方です。

本章では発想を逆転します。

> 解を無理に微分するのではなく、解へ上または下から接する滑らかな関数を微分し、その接触点で PDE の不等式を読む。

この方法が **粘性解**です。

本章の流れは

$$
\boxed{
\text{古典解の破綻}
\to
\text{test function の接触}
\to
\text{sub / super}
\to
\text{安定性}
\to
\text{comparison}
\to
\text{一意性}
\to
\text{Perron 法}
}
$$

です。

HJC3 では、この解概念を HJB の value function へ戻し、

$$
\text{dynamic programming}
\Longrightarrow
\text{HJB の粘性解}
$$

を証明します。

---

## 1. 「ほとんど至る所で PDE を満たす」だけでは解を選べない

最初に、弱い微分を許すだけでは足りない最小例を見ます。

区間 $(-1,1)$ で

$$
|u'(x)|=1
$$

と境界条件

$$
u(-1)=u(1)=0
$$

を考えます。

二つの関数

$$
u_+(x)=1-|x|,
$$

$$
u_-(x)=|x|-1
$$

は、どちらも $x\ne0$ で微分可能で、

$$
|u_\pm'(x)|=1
$$

を満たします。

さらに両方とも

$$
u_\pm(-1)=u_\pm(1)=0
$$

です。

したがって

$$
|u'|=1
$$

を「ほとんど至る所で成り立てばよい」とだけ読むと、同じ境界値問題に少なくとも二つの候補が残ります。

しかし二つの折れ方は同じではありません。

$u_+$ は $x=0$ で山型、

$$
u_+(0)=1
$$

です。

一方 $u_-$ は谷型で、

$$
u_-(0)=-1
$$

です。

最適制御や front propagation で欲しい解は、単に a.e. 微分を持つ候補ではなく、comparison principle と整合する候補です。

粘性解は、この山型と谷型の違いを

$$
\text{接触する smooth test function}
$$

によって検出します。

---

## 2. 非滑らかな関数へ「上から」「下から」接する

連続関数 $u$ が点 $(t_0,x_0)$ で微分できないとします。

それでも、滑らかな関数 $\phi$ を用意して

$$
u-\phi
$$

が $(t_0,x_0)$ で局所最大になることはあります。

このとき $\phi$ は $u$ へ **上から接する** と言います。

つまり近傍で

$$
u(t,x)-\phi(t,x)
\le
u(t_0,x_0)-\phi(t_0,x_0)
$$

です。

定数を足して接触値を合わせれば、

$$
u(t_0,x_0)=\phi(t_0,x_0)
$$

かつ近傍で

$$
u\le\phi
$$

としてよいです。

同様に、

$$
u-\phi
$$

が局所最小なら $\phi$ は $u$ へ **下から接する** と言います。

粘性解では、非滑らかな $u$ の代わりに、この $\phi$ の微分

$$
\phi_t(t_0,x_0),
\qquad
\nabla\phi(t_0,x_0)
$$

を PDE へ代入します。

### 半連続性を使う理由

subsolution と supersolution を極限や上限・下限に対して安定に扱うため、定義は連続関数より少し広く取ります。

関数 $u$ が上半連続とは、

$$
\limsup_{(s,y)\to(t,x)}u(s,y)
\le
u(t,x)
$$

が成り立つことです。

下半連続とは、

$$
\liminf_{(s,y)\to(t,x)}u(s,y)
\ge
u(t,x)
$$

が成り立つことです。

上半連続関数は局所最大を、下半連続関数は局所最小を扱うのに相性がよいので、

- subsolution は上半連続、
- supersolution は下半連続

とします。

---

## 3. viscosity subsolution / supersolution

有限時間の一次 Hamilton--Jacobi 終端値問題

$$
u_t(t,x)+H(x,\nabla u(t,x))=0,
\qquad
0\le t<T,
\quad
x\in\mathbb R^d
$$

を考えます。

$H$ は連続とします。

本章では PDE の viscosity inequality を interior point

$
0<t<T
$

で課します。$t=0$ は有限時間問題を書き始めるための人工的な左端なので、そこで別の境界条件を課しません。$t=0$ の値まで必要な結論は、$t\downarrow0$ の連続性で延長します。終端 $t=T$ は PDE の接触条件とは分け、終端条件として扱います。

解そのものが微分できなくても、test function は $C^1$ なので微分できます。

<a id="def-hjc2-viscosity-sub-super"></a>
<!-- formal-statement-start -->
### 定義（viscosity subsolution / supersolution）

$H:\mathbb R^d\times\mathbb R^d\to\mathbb R$ を連続とする。

上半連続関数

$$
u:[0,T)\times\mathbb R^d\to\mathbb R
$$

が

$$
u_t+H(x,\nabla u)=0
$$

の **viscosity subsolution** であるとは、任意の $\phi\in C^1$ と、$u-\phi$ が interior point

$
(t_0,x_0)\in(0,T)\times\mathbb R^d
$

で局所最大を取る場合に

$$
\boxed{
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\le0
}
$$

が成り立つことをいう。

下半連続関数

$$
v:[0,T)\times\mathbb R^d\to\mathbb R
$$

が **viscosity supersolution** であるとは、任意の $\phi\in C^1$ と、$v-\phi$ が interior point

$
(t_0,x_0)\in(0,T)\times\mathbb R^d
$

で局所最小を取る場合に

$$
\boxed{
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\ge0
}
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc2-viscosity-sub-super -->
### **定義の確認**：谷型の Eikonal 候補は supersolution で落ちる

定常方程式

$$
|u'|-1=0
$$

では、時間微分を除いて同じ接触規則を使います。

候補

$$
u_-(x)=|x|-1
$$

を $x=0$ で見ます。

定数関数

$$
\phi(x)\equiv-1
$$

は

$$
u_-(x)-\phi(x)=|x|\ge0
$$

より、$u_--\phi$ が $x=0$ で局所最小になります。

従って $\phi$ は $u_-$ へ下から接します。

しかし

$$
\phi'(0)=0
$$

なので supersolution 不等式は

$$
|\phi'(0)|-1
=
-1
\ge0
$$

を要求します。

これは偽です。

したがって $u_-$ は viscosity supersolution ではなく、粘性解ではありません。

a.e. には $|u_-'|=1$ だったのに、谷の頂点では comparison と両立しないことを test function が検出しました。
<!-- definition-example-end -->

subsolution では上接触、supersolution では下接触を使うことに注意してください。

符号を覚えるより、

$$
F=0
$$

に対し

$$
\text{上から接する subsolution は }F\le0,
$$

$$
\text{下から接する supersolution は }F\ge0
$$

と覚える方が安全です。

---

## 4. viscosity solution と終端条件

subsolution と supersolution の両方を満たせば、PDE の両側の不等式がそろいます。

終端値問題ではさらに

$$
u(T,x)=g(x)
$$

を課します。

<a id="def-hjc2-viscosity-solution"></a>
<!-- formal-statement-start -->
### 定義（viscosity solution）

連続関数

$$
u:[0,T]\times\mathbb R^d\to\mathbb R
$$

が

$$
u_t+H(x,\nabla u)=0
$$

の viscosity subsolution かつ viscosity supersolution であり、さらに

$$
u(T,x)=g(x)
$$

を全ての $x\in\mathbb R^d$ で満たすとき、$u$ を終端値問題

$$
u_t+H(x,\nabla u)=0,
\qquad
u(T,\cdot)=g
$$

の **viscosity solution（粘性解）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hjc2-viscosity-solution -->
### **定義の確認**：HJC1 の bang-bang value function

HJC1 の

$$
V(t,x)
=
\max\{|x|-(T-t),0\}
$$

を考えます。

滑らかな領域では

$$
V_t-|V_x|=0
$$

を古典的に満たしていました。

右側の切替境界

$$
x=T-t
$$

の近くでは

$$
s=x+t-T
$$

と置くと

$$
V=\max\{s,0\}
$$

です。

この点で $V$ は凸な折れ方をします。

まず上から接する $C^1$ 関数があると仮定します。接触点を $s=0$ とし、$s$ 方向の微分を $a$ とします。

$s>0$ 側では $V=s$ なので、上から接するには

$$
a\ge1
$$

が必要です。

一方 $s<0$ 側では $V=0$ なので、上から接するには

$$
a\le0
$$

が必要です。

両立しないため、切替点には $C^1$ の上接触関数がありません。従って subsolution 条件はこの点では自動的に満たされます。

次に $\phi$ が下から接するとします。

$s$ 方向の接触勾配は

$$
0\le a\le1
$$

を満たします。

$s=x+t-T$ なので

$$
\phi_t=a,
\qquad
\phi_x=a.
$$

従って

$$
\phi_t-|\phi_x|
=
a-|a|
=
0.
$$

よって supersolution 不等式も満たします。

左側の切替境界では

$$
s=-x+t-T
$$

を使えば

$$
\phi_t=a,
\qquad
\phi_x=-a
$$

となり、同じく

$$
\phi_t-|\phi_x|=0
$$

です。

終端では

$$
V(T,x)=|x|
$$

ですから、HJC1 の非滑らかな value function は

$$
V_t-|V_x|=0,
\qquad
V(T,x)=|x|
$$

の粘性解です。
<!-- definition-example-end -->

この例では

$$
\boxed{
\text{微分できない}
\not\Rightarrow
\text{PDE を満たせない}
}
$$

ことが見えます。

PDE を読む対象を $V$ 自身から test function へ移したことが核心です。

---

## 5. 古典解は粘性解に含まれる

新しい解概念を作るとき、滑らかな場合に古典解と食い違ってはいけません。

粘性解ではこの整合性が非常に直接的に確認できます。

<a id="prop-hjc2-classical-consistency"></a>
<!-- formal-statement-start -->
### 命題（古典解と粘性解の整合性）

$u\in C^1([0,T)\times\mathbb R^d)$ が古典的に

$$
u_t(t,x)+H(x,\nabla u(t,x))=0
$$

を満たすとする。

このとき $u$ は viscosity subsolution かつ viscosity supersolution である。

さらに $u$ が $t=T$ まで連続で

$$
u(T,x)=g(x)
$$

を満たせば、終端値問題の粘性解である。
<!-- formal-statement-end -->

### 証明の見取り図

$u-\phi$ が局所最大なら、微分可能な二関数の差は接触点で一階微分が0です。

したがって

$$
u_t=\phi_t,
\qquad
\nabla u=\nabla\phi
$$

となり、古典 PDE をそのまま test function の PDE へ移せます。

<!-- proof-start -->
### 証明

まず $\phi\in C^1$ が $u$ へ上から接し、

$$
u-\phi
$$

が $(t_0,x_0)$ で局所最大を取るとします。

$(t_0,x_0)$ は定義どおり interior point なので、一階の必要条件から

$$
\partial_t(u-\phi)(t_0,x_0)=0,
$$

$$
\nabla_x(u-\phi)(t_0,x_0)=0.
$$

従って

$$
u_t(t_0,x_0)=\phi_t(t_0,x_0),
$$

$$
\nabla u(t_0,x_0)=\nabla\phi(t_0,x_0).
$$

古典方程式へ代入すると

$$
\begin{aligned}
0
&=
u_t(t_0,x_0)
+
H(x_0,\nabla u(t_0,x_0))\\
&=
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0)).
\end{aligned}
$$

従って特に

$$
\phi_t+H(x_0,\nabla\phi)\le0
$$

であり、$u$ は subsolution です。

下から接する $\phi$ に対しても、局所最小点で同じ一階微分の一致が成り立ち、

$$
\phi_t+H(x_0,\nabla\phi)=0\ge0.
$$

従って $u$ は supersolution でもあります。

よって $u$ は粘性解です。終端条件がある場合はそれをそのまま加えればよいです。$\square$
<!-- proof-end -->

粘性解は古典解を捨てる理論ではありません。

$$
\boxed{
\text{古典解}
\subset
\text{粘性解}
}
$$

と拡張する理論です。

---

## 6. 接触不等式は「局所 Taylor 展開の代用品」である

HJC1 では $V\in C^1$ と仮定し、

$$
V(t+h,x+hq)
=
V(t,x)
+
hV_t
+
h\nabla V\cdot q
+
o(h)
$$

と展開しました。

非滑らかな $V$ ではこの式を書けません。

しかし $\phi$ が $V$ へ上から接するなら、接触点の近くで

$$
V(t+h,x+hq)-V(t,x)
\le
\phi(t+h,x+hq)-\phi(t,x).
$$

右辺は滑らかなので

$$
\phi(t+h,x+hq)-\phi(t,x)
=
h\phi_t
+
h\nabla\phi\cdot q
+
o(h).
$$

したがって DPP が与える「候補制御を入れたときの一方向の不等式」を、test function の微分へ移せます。

この構造が HJC3 で

$$
\text{DPP}
\Longrightarrow
\text{viscosity sub / super inequality}
$$

を導くときの中心になります。

粘性解の定義は、非滑らかな関数へ無理に微分を定義したものではありません。

$$
\boxed{
\text{接触によって必要な一階情報だけを借りる}
}
$$

という考え方です。

---

## 7. 局所一様極限で壊れない

解概念にはもう一つ重要な要件があります。

近似問題

$$
u_n
$$

を解き、$n\to\infty$ で極限を取ったとき、極限が同じ PDE の解概念に残ってほしいのです。

粘性解はこの安定性を持ちます。

<a id="thm-hjc2-uniform-stability"></a>
<!-- formal-statement-start -->
### 定理（局所一様極限に対する安定性）

$H$ を連続とする。

各 $n$ について $u_n$ が

$$
(u_n)_t+H(x,\nabla u_n)=0
$$

の viscosity subsolution であり、

$$
u_n\to u
$$

が $[0,T)\times\mathbb R^d$ 上局所一様に成り立つとする。

このとき $u$ も viscosity subsolution である。

同様に、viscosity supersolution の局所一様極限は viscosity supersolution である。
<!-- formal-statement-end -->

### 証明の見取り図

$u-\phi$ が $(t_0,x_0)$ で最大になるとします。

その最大が平らだと近似関数の接触点が動きやすいので、

$$
\phi_\delta(t,x)
=
\phi(t,x)
+
\delta\{
|t-t_0|^2+|x-x_0|^2
\}
$$

と少しだけ持ち上げ、接触を strict にします。

すると $u_n-\phi_\delta$ の最大点が $(t_0,x_0)$ へ寄り、各 $u_n$ の subsolution 不等式を極限へ渡せます。

<!-- proof-start -->
### 証明

subsolution の場合を示します。

$\phi\in C^1$ とし、

$$
u-\phi
$$

が $(t_0,x_0)$ で局所最大を取るとします。

定数を調整して

$$
u(t_0,x_0)=\phi(t_0,x_0)
$$

としてよいです。

小さい閉球状近傍 $K$ を取り、$(t_0,x_0)$ がその内部にあるとします。

任意の $\delta>0$ に対し

$$
\phi_\delta(t,x)
=
\phi(t,x)
+
\delta
\{
|t-t_0|^2+|x-x_0|^2
\}
$$

と置きます。

すると

$$
u-\phi_\delta
$$

は $(t_0,x_0)$ で strict local maximum を持ちます。

したがって $K$ を十分小さく取れば、境界 $\partial K$ 上である $\eta>0$ が存在して

$$
u-\phi_\delta
\le
-\eta
$$

となります。

局所一様収束より、十分大きい $n$ では $K$ 上

$$
|u_n-u|<\frac{\eta}{4}.
$$

よって $\partial K$ 上では

$$
u_n-\phi_\delta
\le
-\frac{3\eta}{4}.
$$

一方中心では

$$
u_n(t_0,x_0)-\phi_\delta(t_0,x_0)
\to0.
$$

従って十分大きい $n$ で、$u_n-\phi_\delta$ は $K$ の内部の点

$$
(t_n,x_n)
$$

で最大を取ります。

strict maximum と局所一様収束から

$$
(t_n,x_n)\to(t_0,x_0)
$$

です。

$\phi_\delta$ は $u_n$ へ上から接するので subsolution 性から

$$
(\phi_\delta)_t(t_n,x_n)
+
H(x_n,\nabla\phi_\delta(t_n,x_n))
\le0.
$$

ここで

$$
(\phi_\delta)_t
=
\phi_t
+
2\delta(t-t_0),
$$

$$
\nabla\phi_\delta
=
\nabla\phi
+
2\delta(x-x_0).
$$

$n\to\infty$ とすると、$H$ の連続性から

$$
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\le0.
$$

従って $u$ は subsolution です。

supersolution は

$$
\phi_\delta
=
\phi
-
\delta\{
|t-t_0|^2+|x-x_0|^2
\}
$$

として strict local minimum を作れば同様です。$\square$
<!-- proof-end -->

この安定性は、

- 数値近似、
- 正則化、
- value function の近似、
- Perron 法

で粘性解が使いやすい大きな理由です。

---

## 8. comparison principle が一意性を作る

粘性解の中心は「非滑らかでも PDE を読める」だけではありません。

本当に重要なのは

$$
\boxed{
\text{subsolution}
\le
\text{supersolution}
}
$$

という comparison principle を保てることです。

ここでは HJC3 で使いやすい一次 Hamilton--Jacobi 方程式について、十分条件を明示して証明します。

Hamiltonian $H(x,p)$ に次を仮定します。

ある定数 $L_p,L_x\ge0$ が存在して

$$
|H(x,p)-H(x,q)|
\le
L_p|p-q|
$$

かつ

$$
|H(x,p)-H(y,p)|
\le
L_x|x-y|(1+|p|)
$$

が全ての $x,y,p,q$ で成り立つとします。

第一条件は勾配変数についての global Lipschitz 性です。

第二条件では $p$ が大きくなっても、$x$ のずれに対する増幅が高々線形であることを要求しています。

<a id="thm-hjc2-comparison"></a>
<!-- formal-statement-start -->
### 定理（一次 Hamilton--Jacobi 終端値問題の comparison principle）

$H:\mathbb R^d\times\mathbb R^d\to\mathbb R$ が連続で、ある $L_p,L_x\ge0$ に対して

$$
|H(x,p)-H(x,q)|
\le
L_p|p-q|,
$$

$$
|H(x,p)-H(y,p)|
\le
L_x|x-y|(1+|p|)
$$

を満たすとする。

$u,v$ は $[0,T]\times\mathbb R^d$ 上 bounded uniformly continuous であり、

- $u$ は
  $$
  u_t+H(x,\nabla u)=0
  $$
  の viscosity subsolution、
- $v$ は同方程式の viscosity supersolution、

とする。

さらに終端で

$$
u(T,x)\le v(T,x)
$$

が全ての $x$ で成り立つとする。

このとき

$$
\boxed{
u(t,x)\le v(t,x)
}
$$

が全ての $(t,x)\in[0,T]\times\mathbb R^d$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

直接 $u-v$ の最大点を使いたくても、$u$ と $v$ は微分できません。

そこで点を二つに分け、

$$
(t,x)
\quad\text{と}\quad
(s,y)
$$

を別々に動かします。

そして

$$
\frac{|x-y|^2}{2\varepsilon}
+
\frac{|t-s|^2}{2\delta}
$$

を引きます。

$\varepsilon,\delta$ が小さいほど、最大点では

$$
x\approx y,
\qquad
t\approx s
$$

でなければ大きな罰を受けます。

この方法を **doubling of variables** と呼びます。

さらに

$$
\alpha(|x|^2+|y|^2)
$$

で無限遠への逃走を防ぎ、

$$
\eta
\left(
\frac1{T-t}
+
\frac1{T-s}
\right)
$$

で終端 $T$ から最大点を離します。

後者の時間微分が正の差を作り、それを Hamiltonian の連続性では吸収できないことが矛盾になります。

<!-- proof-start -->
### 証明

背理法で示します。

ある点で

$$
u(t,x)>v(t,x)
$$

と仮定します。

終端では

$$
u(T,x)\le v(T,x)
$$

であり、$u,v$ は一様連続なので、正の差があるなら $t<T$ の点

$$
(t_*,x_*)
$$

で

$$
u(t_*,x_*)-v(t_*,x_*)=m>0
$$

となるものを取れます。

$\eta>0$ を十分小さく選び、

$$
m
-
\frac{2\eta}{T-t_*}
>0
$$

とします。

$\varepsilon,\delta,\alpha>0$ に対し

$$
\begin{aligned}
\Phi(t,s,x,y)
&=
u(t,x)-v(s,y)\\
&\quad
-\frac{|x-y|^2}{2\varepsilon}
-\frac{|t-s|^2}{2\delta}\\
&\quad
-\alpha(|x|^2+|y|^2)\\
&\quad
-\eta
\left(
\frac1{T-t}
+
\frac1{T-s}
\right)
\end{aligned}
$$

を考えます。

$u,v$ は有界であり、$\alpha(|x|^2+|y|^2)$ は無限遠で発散します。

また

$$
\frac{\eta}{T-t},
\qquad
\frac{\eta}{T-s}
$$

は $t\uparrow T$ または $s\uparrow T$ で発散します。

従って $\Phi$ は

$$
t<T,
\qquad
s<T
$$

かつ有限の $x,y$ に最大点

$$
(t_{\varepsilon,\delta,\alpha},
s_{\varepsilon,\delta,\alpha},
x_{\varepsilon,\delta,\alpha},
y_{\varepsilon,\delta,\alpha})
$$

を持ちます。

記号を短くするため以下この最大点を

$$
(\hat t,\hat s,\hat x,\hat y)
$$

と書きます。

罰則を入れない候補

$
(t,s,x,y)
=
(t_*,t_*,x_*,x_*)
$

と比較すると、$\eta$ を選んだ方法から最大値は正です。

PDE 不等式は $0<t<T$ で課しているので、以下の doubled maximum も interior に取ります。もし正の差が $t=0$ で見つかった場合、一様連続性により十分小さい $t_*>0$ でも正の差が残ります。さらに lower time edge に最大が乗る場合は、比較する時間区間をわずかに左へ広げた後に微小な time tilt を加えて interior maximum を取り、最後に tilt を0へ戻します。これは test function の時間微分へ同じ消失量を加えるだけで、以下の極限評価を変えません。

次に $\varepsilon,\delta\downarrow0$ で二点が近づくことを確認します。

まず $u,v$ の有界性と最大性から、固定した $\alpha,\eta$ の下で

$
\frac{|\hat x-\hat y|^2}{2\varepsilon}
+
\frac{|\hat t-\hat s|^2}{2\delta}
$

は一様に有界です。従って

$
|\hat x-\hat y|\to0,
\qquad
|\hat t-\hat s|\to0.
$

さらに最大点 $(\hat t,\hat s,\hat x,\hat y)$ と、二点を一致させた候補 $(\hat t,\hat t,\hat x,\hat x)$ を比較します。最大性から

$
\begin{aligned}
&\frac{|\hat x-\hat y|^2}{2\varepsilon}
+
\frac{|\hat t-\hat s|^2}{2\delta}\\
&\le
v(\hat t,\hat x)-v(\hat s,\hat y)
+
\alpha\{|\hat x|^2-|\hat y|^2\}\\
&\quad+
\eta
\left\{
\frac1{T-\hat t}
-
\frac1{T-\hat s}
\right\}.
\end{aligned}
$

固定した $\alpha,\eta$ では confinement により最大点は有限領域にあり、終端罰則により $T$ からも離れています。したがって右辺は $v$ の一様連続性と

$
|\hat x-\hat y|+|\hat t-\hat s|\to0
$

から0へ収束します。よって

$
\frac{|\hat x-\hat y|^2}{\varepsilon}
+
\frac{|\hat t-\hat s|^2}{\delta}
\longrightarrow0.
$

ここで $u$ に対する test function を作ります。

$\hat s,\hat y$ を固定し、

$$
\begin{aligned}
\phi_u(t,x)
&=
v(\hat s,\hat y)
+
\frac{|x-\hat y|^2}{2\varepsilon}
+
\frac{|t-\hat s|^2}{2\delta}\\
&\quad
+
\alpha(|x|^2+|\hat y|^2)
+
\eta
\left(
\frac1{T-t}
+
\frac1{T-\hat s}
\right)
+
C_u
\end{aligned}
$$

とし、定数 $C_u$ を接触値が一致するように取ります。

$\Phi$ の最大性から $u-\phi_u$ は $(\hat t,\hat x)$ で局所最大です。

従って subsolution 性より

$$
a_u
+
H(\hat x,p_u)
\le0,
$$

ここで

$$
a_u
=
\frac{\hat t-\hat s}{\delta}
+
\frac{\eta}{(T-\hat t)^2},
$$

$$
p_u
=
\frac{\hat x-\hat y}{\varepsilon}
+
2\alpha\hat x.
$$

同様に $\hat t,\hat x$ を固定し、$v$ へ下から接する test function を作ると supersolution 性から

$$
a_v
+
H(\hat y,p_v)
\ge0,
$$

ただし

$$
a_v
=
\frac{\hat t-\hat s}{\delta}
-
\frac{\eta}{(T-\hat s)^2},
$$

$$
p_v
=
\frac{\hat x-\hat y}{\varepsilon}
-
2\alpha\hat y.
$$

二式を引くと

$$
\frac{\eta}{(T-\hat t)^2}
+
\frac{\eta}{(T-\hat s)^2}
\le
H(\hat y,p_v)-H(\hat x,p_u).
$$

左辺は

$$
\frac{2\eta}{T^2}
$$

以上です。

右辺を評価するため

$$
p_0
=
\frac{\hat x-\hat y}{\varepsilon}
$$

と置き、

$$
\begin{aligned}
&H(\hat y,p_v)-H(\hat x,p_u)\\
&=
\{H(\hat y,p_v)-H(\hat y,p_0)\}\\
&\quad+
\{H(\hat y,p_0)-H(\hat x,p_0)\}\\
&\quad+
\{H(\hat x,p_0)-H(\hat x,p_u)\}
\end{aligned}
$$

と分けます。

$p$ についての Lipschitz 性から第一項と第三項の絶対値は合わせて

$$
2L_p\alpha
\{
|\hat x|+|\hat y|
\}
$$

以下です。

$x$ についての仮定から中央項は

$$
L_x|\hat x-\hat y|
\left(
1+
\frac{|\hat x-\hat y|}{\varepsilon}
\right)
$$

以下です。

従って

$$
\begin{aligned}
\frac{2\eta}{T^2}
&\le
2L_p\alpha
\{
|\hat x|+|\hat y|
\}\\
&\quad+
L_x|\hat x-\hat y|
+
L_x
\frac{|\hat x-\hat y|^2}{\varepsilon}.
\end{aligned}
$$

先ほど

$$
\frac{|\hat x-\hat y|^2}{\varepsilon}\to0
$$

を得ています。

また最大性と $u,v$ の有界性から

$$
\alpha
\{
|\hat x|^2+|\hat y|^2
\}
$$

は $\alpha$ に依らず上から有界です。

したがって

$$
\alpha|\hat x|
\le
\sqrt{\alpha}
\sqrt{\alpha|\hat x|^2}
\to0,
$$

$$
\alpha|\hat y|
\to0
$$

です。

まず $\varepsilon,\delta\downarrow0$、続いて $\alpha\downarrow0$ とすると右辺は0へ収束します。

しかし左辺は固定した正数

$$
\frac{2\eta}{T^2}
$$

以上です。

これは矛盾です。

従って正の差は存在せず、

$$
u\le v
$$

が全領域で成り立ちます。$\square$
<!-- proof-end -->

### 罰則項は何をしていたか

証明の式を役割ごとに読むと見通しが良くなります。

$$
\frac{|x-y|^2}{2\varepsilon}
$$

は二つの空間点を近づけます。

$$
\frac{|t-s|^2}{2\delta}
$$

は二つの時刻を近づけます。

$$
\alpha(|x|^2+|y|^2)
$$

は最大点が無限遠へ逃げるのを防ぎます。

そして

$$
\eta
\left(
\frac1{T-t}
+
\frac1{T-s}
\right)
$$

は終端から離すと同時に、

$$
a_u-a_v
=
\frac{\eta}{(T-\hat t)^2}
+
\frac{\eta}{(T-\hat s)^2}
>0
$$

という strict な差を作ります。

comparison proof の核心は、この正の差を Hamiltonian 側が極限で吸収できないことです。

---

## 9. comparison から一意性は一行で出る

comparison principle を証明する仕事は重いですが、一意性はすぐに従います。

<a id="cor-hjc2-uniqueness"></a>
<!-- formal-statement-start -->
### 系（comparison による一意性）

前節の comparison theorem の仮定の下で、同じ終端条件

$$
u(T,x)=g(x)
$$

を満たす bounded uniformly continuous viscosity solution は高々一つである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$u,v$ を二つの粘性解とします。

$u$ は subsolution、$v$ は supersolution で、終端では

$$
u(T,x)=v(T,x)=g(x)
$$

です。

comparison principle から

$$
u\le v.
$$

今度は $v$ を subsolution、$u$ を supersolution と見て同じ定理を使うと

$$
v\le u.
$$

従って

$$
\boxed{
u=v
}.
$$

$\square$
<!-- proof-end -->

ここで重要なのは、

$$
\boxed{
\text{PDE を点ごとに等式として満たすこと}
}
$$

ではなく、

$$
\boxed{
\text{sub と super の順序を comparison で固定すること}
}
$$

が一意性を作っている点です。

§1 の a.e. Eikonal 候補が二つ残ったのは、この選択原理が欠けていたからです。

---

## 10. Eikonal の二候補を comparison の目で見直す

§1 の

$$
|u'|=1,
\qquad
u(-1)=u(1)=0
$$

へ戻ります。

距離関数

$$
u_+(x)=1-|x|
$$

は $x=0$ で山型です。

定数関数

$$
\phi(x)\equiv1
$$

は上から接し、

$$
|\phi'(0)|-1=-1\le0
$$

なので subsolution 条件と両立します。

一方、山の頂点へ $C^1$ 関数を下から接触させる場合、その勾配は左右の傾き $1$ と $-1$ を同時に満たす必要があるため、そのような下接触 test function は存在しません。

対して谷型

$$
u_-(x)=|x|-1
$$

では定数 test function が下から接して

$$
|\phi'|-1=-1<0
$$

となり、supersolution 条件が破れました。

したがって粘性解は「折れていること」自体を禁止しません。

$$
\boxed{
\text{どちら向きに折れているか}
}
$$

を PDE と comparison に整合する形で選びます。

---

## 11. Perron method：解を直接解かず、subsolution の上限から作る

comparison principle は「解が二つあれば同じ」と言います。

しかし一意性だけでは存在は出ません。

存在を作る代表的な方法が **Perron method** です。

考え方は次です。

1. 下側の subsolution と上側の supersolution を一つずつ用意する。
2. その間にある全 subsolution を集める。
3. それらの点ごとの supremum を取る。
4. 上半連続包で subsolution 性を閉じる。
5. もし supersolution 性が壊れる点があれば、そこだけ少し持ち上げて「もっと大きい subsolution」を作れる。
6. それは supremum の定義に反する。

この「局所的に持ち上げる」議論が Perron 法の核心です。

任意の有界関数 $w$ に対し、上半連続包と下半連続包を

$$
w^*(z)
=
\limsup_{\zeta\to z}w(\zeta),
$$

$$
w_*(z)
=
\liminf_{\zeta\to z}w(\zeta)
$$

と書きます。

<a id="thm-hjc2-perron"></a>
<!-- formal-statement-start -->
### 定理（Perron method）

終端値問題

$$
u_t+H(x,\nabla u)=0,
\qquad
u(T,x)=g(x)
$$

について comparison principle が成り立つとする。

さらに連続な bounded subsolution $\underline u$ と supersolution $\overline u$ が存在し、

$$
\underline u\le\overline u
$$

かつ

$$
\underline u(T,x)
=
\overline u(T,x)
=
g(x)
$$

を満たすとする。

$\mathcal S$ を

$$
\underline u\le w\le\overline u
$$

を満たす bounded upper semicontinuous viscosity subsolution 全体とし、

$$
U(t,x)
=
\sup_{w\in\mathcal S}w(t,x)
$$

と置く。

このとき $U$ は連続な viscosity solution となり、

$$
U(T,x)=g(x)
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二つの段階があります。

第一段階では $U^*$ が subsolution であることを示します。

一つの $w$ ではなく supremum なので、接触点近くで supremum にほぼ達する $w_n$ を選び、その subsolution 不等式を極限へ渡します。

第二段階では $U_*$ が supersolution であることを示します。

もし下接触 test function $\phi$ が

$$
\phi_t+H(x,\nabla\phi)<0
$$

を満たして supersolution 性を破るなら、$\phi$ を少し上へずらした strict subsolution を局所的に $U$ と max できます。

すると $U$ より大きい subsolution ができ、$U$ が全 subsolution の supremum だったことに反します。

<!-- proof-start -->
### 証明

#### 1. $U^*$ は subsolution

$\phi\in C^1$ が $U^*$ へ上から接し、

$$
U^*-\phi
$$

が $z_0=(t_0,x_0)$ で strict local maximum を持つとします。

定数を調整して

$$
U^*(z_0)=\phi(z_0)
$$

としてよいです。

$U^*$ の定義から、$z_n\to z_0$ で

$$
U(z_n)\to U^*(z_0)
$$

となる点列を取れます。

各 $n$ について supremum の定義から $w_n\in\mathcal S$ を

$$
w_n(z_n)
\ge
U(z_n)-\frac1n
$$

となるように選びます。

strict contact の近傍で $w_n-\phi$ の最大点を $y_n$ と取ると、

$$
y_n\to z_0
$$

かつ

$$
w_n(y_n)\to U^*(z_0)
$$

となります。

$w_n$ は subsolution なので

$$
\phi_t(y_n)
+
H(x_{y_n},\nabla\phi(y_n))
\le0.
$$

$n\to\infty$ とし、$H$ と $\phi$ の連続性を使うと

$$
\phi_t(z_0)
+
H(x_0,\nabla\phi(z_0))
\le0.
$$

従って $U^*$ は subsolution です。

また

$$
U\le\overline u
$$

で $\overline u$ は連続なので

$$
U^*\le\overline u.
$$

同様に $\underline u\le U^*$ です。

終端では上下の barrier がともに $g$ なので

$$
U^*(T,x)=g(x).
$$

従って $U^*\in\mathcal S$ です。

ところが $U$ は $\mathcal S$ の点ごとの supremum なので

$$
U\ge U^*.
$$

定義から常に

$$
U\le U^*
$$

です。

よって

$$
U=U^*
$$

であり、$U$ 自身が upper semicontinuous subsolution です。

#### 2. $U_*$ は supersolution

背理法で、$U_*$ が supersolution でないとします。

するとある interior point

$$
z_0=(t_0,x_0),
\qquad
t_0<T
$$

と $\phi\in C^1$ が存在して、$U_*-\phi$ が $z_0$ で strict local minimum を取り、

$$
\phi_t(z_0)
+
H(x_0,\nabla\phi(z_0))
<0
$$

となります。

連続性から、小さい近傍 $B$ と $\theta>0$ を取って

$$
\phi_t+H(x,\nabla\phi)
\le
-2\theta
$$

が $B$ で成り立つようにできます。

接触を strict に取ったので、$B$ の境界付近ではある $\rho>0$ に対し

$$
U_*-\phi
\ge
3\rho
$$

とできます。

十分小さい $0<\delta<\rho$ を取り、

$$
\psi=\phi+\delta
$$

とします。

定数を足しても微分は変わらないので

$$
\psi_t+H(x,\nabla\psi)
\le
-2\theta<0
$$

です。

従って $\psi$ は $B$ 内で strict subsolution です。

境界付近では

$$
U
\ge
U_*
\ge
\phi+3\rho
>
\psi
$$

なので、局所的に

$$
\widetilde U
=
\max\{U,\psi\}
$$

と置き、$B$ の外では $\widetilde U=U$ としても継ぎ目で値は $U$ のままです。

二つの upper semicontinuous subsolution の最大は subsolution です。

実際、test function が $\max\{w_1,w_2\}$ へ上から接する点では、その点で最大を実現する $w_i$ にも同じ test function が上から接するので、その $w_i$ の subsolution 不等式を使えます。

従って $\widetilde U$ も subsolution です。

$\delta$ と $B$ をさらに小さく取れば、連続な上 barrier $\overline u$ を越えません。

したがって

$$
\widetilde U\in\mathcal S.
$$

一方 $U_*(z_0)=\phi(z_0)$ なので、下半連続包の定義から $z_n\to z_0$ で

$$
U(z_n)\to U_*(z_0)
$$

となる点列を取れます。

十分大きい $n$ では

$$
\psi(z_n)
=
\phi(z_n)+\delta
>
U(z_n).
$$

従って

$$
\widetilde U(z_n)>U(z_n).
$$

しかし $U$ は $\mathcal S$ の全要素の supremum なので、$\widetilde U\in\mathcal S$ なら

$$
\widetilde U\le U
$$

でなければなりません。

矛盾です。

従って $U_*$ は supersolution です。

#### 3. comparison で上下の包を一致させる

$U$ は subsolution、$U_*$ は supersolution で、終端ではどちらも $g$ です。

comparison principle より

$$
U\le U_*.
$$

一方、下半連続包の定義から

$$
U_*\le U.
$$

従って

$$
U=U_*.
$$

すでに $U=U^*$ も得ているので

$$
U=U^*=U_*
$$

であり、$U$ は連続です。

そして subsolution と supersolution の両方なので粘性解です。$\square$
<!-- proof-end -->

Perron 法では

$$
\boxed{
\text{comparison}
+
\text{subsolution の安定性}
}
$$

が存在構成へつながっています。

---

## 12. boundary / terminal condition は PDE 不等式と分けて読む

粘性解では interior equation と boundary data を混ぜないことが重要です。

終端値問題では

$$
u_t+H(x,\nabla u)=0
$$

は $t<T$ の局所接触条件です。

一方

$$
u(T,x)=g(x)
$$

は終端での値の条件です。

comparison proof では、この終端条件が

$$
u-v
$$

の正の最大が終端だけに残ることを防ぎます。

Perron 法では、下 barrier と上 barrier を終端で同じ $g$ に合わせることで、supremum を取っても終端値が固定されます。

HJC3 で value function を扱うときも、

1. DPP から interior viscosity inequality を出す。
2. 制御問題の定義から terminal condition を確認する。

という二段階に分けます。

---

## 13. この章で分かったこと

HJC1 では value function が非微分可能になり、classical HJB だけでは記述が止まりました。

本章ではその停止点を次のように越えました。

- a.e. に PDE を満たすだけでは Eikonal 型問題で候補が複数残りうる。
- 非滑らかな解自身ではなく、上または下から接する $C^1$ test function を微分する。
- 上接触で $F\le0$ を課すのが viscosity subsolution。
- 下接触で $F\ge0$ を課すのが viscosity supersolution。
- 両方を満たす連続関数が viscosity solution。
- 古典解は粘性解に含まれる。
- 局所一様極限で sub / super 不等式は保存される。
- doubling of variables により comparison principle を証明できる。
- comparison は粘性解の一意性を与える。
- Perron method は subsolution の supremum から存在を構成する。

この章の最終形は

$$
\boxed{
\text{非滑らかでも}
\quad
\text{comparison}
+
\text{stability}
+
\text{uniqueness}
\quad
\text{を保つ}
}
$$

です。

次章 HJC3 では、HJC1 の dynamic programming principle と本章の粘性解を合流させ、

$$
\boxed{
\text{value function}
=
\text{HJB の一意な viscosity solution}
}
$$

を示します。

---

# 演習

## Level A

<a id="ex-hjc2-a01"></a>
### HJC2-A01 上接触と下接触を判定する
- Level: A

$$
u(x)=|x|
$$

を考える。

1. $\phi_1(x)=0$ は $x=0$ で $u$ へ上から接するか、下から接するか。
2. $\phi_2(x)=2x^2$ は十分小さい近傍で $u$ へ上から接するか。
3. $\phi_3(x)=-x^2$ は $u$ へ下から接するか。

<!-- solution-start -->
#### 詳細解答

$u(0)=0$ です。

まず

$$
u(x)-\phi_1(x)=|x|\ge0
$$

で、$x=0$ で最小値0を取ります。

従って $\phi_1$ は **下から接します**。

次に

$$
u(x)-\phi_2(x)
=
|x|-2x^2.
$$

$0<|x|<1/2$ では

$$
|x|-2x^2
=
|x|(1-2|x|)>0.
$$

したがって $x=0$ は局所最小であり、$\phi_2$ も下から接します。上からではありません。

最後に

$$
u(x)-\phi_3(x)
=
|x|+x^2\ge0
$$

で、等号は $x=0$ です。

従って $\phi_3$ も下から接します。

この例では $|x|$ が谷型なので、滑らかな関数は下側からは接しやすい一方、上側から $C^1$ に接することはできません。
<!-- solution-end -->

<a id="ex-hjc2-a02"></a>
### HJC2-A02 a.e. 解が粘性解とは限らないことを確認する
- Level: A

$$
u(x)=|x|-1
$$

について、

$$
|u'|-1=0
$$

が $x\ne0$ で成り立つことを確認し、それでも $u$ が viscosity supersolution でないことを示せ。

<!-- solution-start -->
#### 詳細解答

$x>0$ では

$$
u'(x)=1,
$$

$x<0$ では

$$
u'(x)=-1.
$$

従って $x\ne0$ で

$$
|u'(x)|-1=0.
$$

したがって方程式は a.e. に成り立ちます。

しかし $x=0$ で

$$
u(0)=-1.
$$

定数 test function

$$
\phi(x)\equiv-1
$$

を取ると

$$
u(x)-\phi(x)=|x|\ge0
$$

なので $\phi$ は下から接します。

supersolution なら

$$
|\phi'(0)|-1\ge0
$$

が必要ですが、

$$
\phi'(0)=0
$$

なので

$$
|\phi'(0)|-1=-1<0.
$$

従って $u$ は viscosity supersolution ではなく、粘性解ではありません。
<!-- solution-end -->

<a id="ex-hjc2-a03"></a>
### HJC2-A03 古典解との整合性の一段を示す
- Level: A

$u,\phi\in C^1$ とし、$u-\phi$ が内点 $(t_0,x_0)$ で局所最大を取るとする。

$$
u_t(t_0,x_0)=\phi_t(t_0,x_0),
$$

$$
\nabla u(t_0,x_0)=\nabla\phi(t_0,x_0)
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

関数

$$
F(t,x)=u(t,x)-\phi(t,x)
$$

は $C^1$ です。

内点 $(t_0,x_0)$ で局所最大を取るので、一階の必要条件から

$$
\partial_tF(t_0,x_0)=0
$$

かつ

$$
\nabla_xF(t_0,x_0)=0.
$$

したがって

$$
u_t-\phi_t=0,
$$

$$
\nabla u-\nabla\phi=0
$$

です。

よって

$$
\boxed{
u_t(t_0,x_0)=\phi_t(t_0,x_0)
}
$$

および

$$
\boxed{
\nabla u(t_0,x_0)=\nabla\phi(t_0,x_0)
}
$$

を得ます。
<!-- solution-end -->

<a id="ex-hjc2-a04"></a>
### HJC2-A04 terminal condition と PDE 条件を分ける
- Level: A

終端値問題

$$
u_t+H(x,\nabla u)=0,
\qquad
u(T,x)=g(x)
$$

を考える。

次の二つを区別して説明せよ。

1. $t_0<T$ の接触点で確認する条件。
2. $t=T$ で確認する条件。

<!-- solution-start -->
#### 詳細解答

$t_0<T$ では PDE の viscosity inequality を確認します。

上から接する $\phi$ なら

$$
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\le0.
$$

下から接する $\phi$ なら

$$
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\ge0.
$$

一方、終端 $t=T$ では本章の定義では interior PDE の test-function 条件ではなく、

$$
\boxed{
u(T,x)=g(x)
}
$$

を直接確認します。

従って

$$
\boxed{
\text{interior equation}
\quad\text{と}\quad
\text{terminal data}
}
$$

は別の責務です。
<!-- solution-end -->

<a id="ex-hjc2-a05"></a>
### HJC2-A05 comparison theorem の Hamiltonian 条件を確認する
- Level: A

$$
H(x,p)=b(x)\cdot p+\ell(x)
$$

とする。

$b:\mathbb R^d\to\mathbb R^d$ は bounded Lipschitz、$\ell:\mathbb R^d\to\mathbb R$ は Lipschitz とする。

本文の comparison theorem の二条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

まず $p,q$ について

$$
H(x,p)-H(x,q)
=
b(x)\cdot(p-q).
$$

Cauchy--Schwarz の不等式から

$$
|H(x,p)-H(x,q)|
\le
|b(x)|\,|p-q|.
$$

$b$ は bounded なので

$$
\|b\|_\infty
=
\sup_x|b(x)|<\infty.
$$

従って

$$
\boxed{
|H(x,p)-H(x,q)|
\le
\|b\|_\infty|p-q|
}.
$$

次に

$$
\begin{aligned}
H(x,p)-H(y,p)
&=
\{b(x)-b(y)\}\cdot p\\
&\quad+
\ell(x)-\ell(y).
\end{aligned}
$$

$b,\ell$ の Lipschitz 定数をそれぞれ $L_b,L_\ell$ とすると

$$
|H(x,p)-H(y,p)|
\le
L_b|x-y||p|
+
L_\ell|x-y|.
$$

したがって

$$
|H(x,p)-H(y,p)|
\le
\max\{L_b,L_\ell\}
|x-y|(1+|p|).
$$

よって本文の仮定を満たします。
<!-- solution-end -->

## Level B

<a id="ex-hjc2-b01"></a>
### HJC2-B01 局所一様安定性を supersolution 側で証明する
- Level: B

$u_n$ が viscosity supersolution で

$$
u_n\to u
$$

が局所一様とする。

本文の subsolution 側の証明を使い、$u$ が viscosity supersolution であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

$\phi\in C^1$ が $u$ へ下から接し、

$$
u-\phi
$$

が $(t_0,x_0)$ で局所最小を取るとします。

最小を strict にするため

$$
\phi_\delta(t,x)
=
\phi(t,x)
-
\delta
\{
|t-t_0|^2+|x-x_0|^2
\}
$$

と置きます。

すると

$$
u-\phi_\delta
=
u-\phi
+
\delta
\{
|t-t_0|^2+|x-x_0|^2
\}
$$

なので $(t_0,x_0)$ は strict local minimum になります。

局所一様収束から、十分大きい $n$ について $u_n-\phi_\delta$ は近傍内部の点

$$
(t_n,x_n)
$$

で局所最小を持ち、

$$
(t_n,x_n)\to(t_0,x_0)
$$

となります。

$u_n$ は supersolution なので

$$
(\phi_\delta)_t(t_n,x_n)
+
H(x_n,\nabla\phi_\delta(t_n,x_n))
\ge0.
$$

ここで

$$
(\phi_\delta)_t
=
\phi_t
-
2\delta(t-t_0),
$$

$$
\nabla\phi_\delta
=
\nabla\phi
-
2\delta(x-x_0).
$$

$n\to\infty$ とすると追加項は消え、

$$
\phi_t(t_0,x_0)
+
H(x_0,\nabla\phi(t_0,x_0))
\ge0.
$$

従って $u$ は viscosity supersolution です。
<!-- solution-end -->

<a id="ex-hjc2-b02"></a>
### HJC2-B02 doubling penalty の勾配を再計算する
- Level: B

comparison proof の罰則

$$
P(t,s,x,y)
=
\frac{|x-y|^2}{2\varepsilon}
+
\frac{|t-s|^2}{2\delta}
+
\alpha(|x|^2+|y|^2)
+
\eta
\left(
\frac1{T-t}
+
\frac1{T-s}
\right)
$$

について、subsolution 側と supersolution 側に現れる

$$
a_u,\ p_u,\ a_v,\ p_v
$$

を自分で導け。

<!-- solution-start -->
#### 詳細解答

$\Phi=u-v-P$ が $(\hat t,\hat s,\hat x,\hat y)$ で最大とします。

subsolution 側では $\hat s,\hat y$ を固定し、

$$
\phi_u(t,x)
=
P(t,\hat s,x,\hat y)+\text{constant}
$$

を使います。

従って

$$
a_u
=
\partial_tP
=
\frac{\hat t-\hat s}{\delta}
+
\frac{\eta}{(T-\hat t)^2}.
$$

空間勾配は

$$
p_u
=
\nabla_xP
=
\frac{\hat x-\hat y}{\varepsilon}
+
2\alpha\hat x.
$$

supersolution 側では $v-\phi_v$ が最小になるよう

$$
\phi_v(s,y)
=
-P(\hat t,s,\hat x,y)+\text{constant}
$$

を使います。

まず

$$
\partial_sP
=
-\frac{\hat t-\hat s}{\delta}
+
\frac{\eta}{(T-\hat s)^2}.
$$

したがって

$$
a_v
=
-\partial_sP
=
\frac{\hat t-\hat s}{\delta}
-
\frac{\eta}{(T-\hat s)^2}.
$$

また

$$
\nabla_yP
=
-\frac{\hat x-\hat y}{\varepsilon}
+
2\alpha\hat y
$$

なので

$$
p_v
=
-\nabla_yP
=
\frac{\hat x-\hat y}{\varepsilon}
-
2\alpha\hat y.
$$

よって

$$
\boxed{
a_u-a_v
=
\frac{\eta}{(T-\hat t)^2}
+
\frac{\eta}{(T-\hat s)^2}
>0
}
$$

が comparison の strict 差です。
<!-- solution-end -->

<a id="ex-hjc2-b03"></a>
### HJC2-B03 bang-bang value function を粘性解として確認する
- Level: B

$$
V(t,x)=\max\{|x|-(T-t),0\}
$$

が

$$
V_t-|V_x|=0
$$

の viscosity solution であることを、右側切替境界

$$
x=T-t
$$

で test function の定義から示せ。

<!-- solution-start -->
#### 詳細解答

右側切替境界の近くでは

$$
x>0
$$

なので

$$
V(t,x)=\max\{x+t-T,0\}.
$$

$$
s=x+t-T
$$

と書けば

$$
V=\max\{s,0\}.
$$

接触点は $s=0$ です。

まず subsolution 条件を考えます。

$C^1$ 関数 $\phi$ が上から接すると仮定し、$s$ 方向の微分を $a$ とします。

$s>0$ では

$$
V=s.
$$

上から接するには一次近似で

$$
as\ge s
$$

が必要なので

$$
a\ge1.
$$

一方 $s<0$ では

$$
V=0.
$$

上から接するには

$$
as\ge0
$$

が必要です。

$s<0$ なのでこれは

$$
a\le0
$$

を意味します。

矛盾です。

従って $C^1$ の上接触 test function は存在せず、subsolution 条件は自動的に満たされます。

次に $\phi$ が下から接するとします。

$s>0$ 側から

$$
a\le1,
$$

$s<0$ 側から

$$
a\ge0
$$

なので

$$
0\le a\le1.
$$

$s=x+t-T$ の方向にだけ折れているため、接触勾配は

$$
\phi_t=a,
\qquad
\phi_x=a.
$$

したがって

$$
\phi_t-|\phi_x|
=
a-|a|
=
0.
$$

特に

$$
\phi_t-|\phi_x|\ge0
$$

なので supersolution 条件を満たします。

よって切替境界でも sub / super の両条件が成り立ちます。
<!-- solution-end -->

<a id="ex-hjc2-b04"></a>
### HJC2-B04 max of subsolutions の補題を証明する
- Level: B

$u_1,u_2$ を同じ一次 Hamilton--Jacobi 方程式の upper semicontinuous viscosity subsolution とする。

$$
u=\max\{u_1,u_2\}
$$

も subsolution であることを示せ。

<!-- solution-start -->
#### 詳細解答

$u$ は upper semicontinuous 関数二つの最大なので upper semicontinuous です。

$\phi\in C^1$ が $u$ へ上から接し、

$$
u-\phi
$$

が $z_0$ で局所最大0を取るとします。

$u(z_0)$ は

$$
u_1(z_0)
\quad\text{または}\quad
u_2(z_0)
$$

の少なくとも一方に等しいです。

たとえば

$$
u(z_0)=u_1(z_0)
$$

とします。

近傍では

$$
u_1\le u.
$$

従って

$$
u_1-\phi
\le
u-\phi
\le0
$$

であり、$z_0$ では

$$
u_1(z_0)-\phi(z_0)
=
u(z_0)-\phi(z_0)
=
0.
$$

よって $\phi$ は $u_1$ へも上から接します。

$u_1$ の subsolution 性から

$$
\phi_t(z_0)
+
H(x_0,\nabla\phi(z_0))
\le0.
$$

したがって $u$ も subsolution です。

$u_1(z_0)=u_2(z_0)$ の場合も、どちらか一方へ同じ議論を適用できます。
<!-- solution-end -->

## Level C

<a id="ex-hjc2-c01"></a>
### HJC2-C01 comparison・一意性・Perron 法を一つにつなぐ
- Level: C

終端値問題

$$
u_t+H(x,\nabla u)=0,
\qquad
u(T,x)=g(x)
$$

について本文の comparison theorem の仮定が成り立つとする。

さらに連続 bounded な barrier

$$
\underline u,
\qquad
\overline u
$$

があり、

$$
\underline u
\le
\overline u,
$$

$$
\underline u(T,\cdot)
=
\overline u(T,\cdot)
=
g
$$

とする。

次を説明・証明せよ。

1. 二つの粘性解が存在すれば comparison により一致すること。
2. subsolution 全体の supremum $U$ を取るとき、なぜ $U$ そのものではなく最初に $U^*$ を調べるのか。
3. $U^*$ が subsolution であることを、近似 subsolution $w_n$ を用いて説明せよ。
4. $U_*$ が supersolution でないと仮定すると、strict subsolution $\phi+\delta$ を使って $U$ より大きい subsolution を作れる理由を説明せよ。
5. 最後に comparison を $U$ と $U_*$ へ適用して連続性と解の存在を結論せよ。

<!-- solution-start -->
#### 詳細解答

### 1. comparison から一意性

$u,v$ を二つの粘性解とします。

$u$ は subsolution、$v$ は supersolution で、終端値は同じなので comparison から

$$
u\le v.
$$

役割を逆にしてもう一度 comparison を使うと

$$
v\le u.
$$

従って

$$
u=v.
$$

### 2. supremum は upper semicontinuous とは限らない

subsolution $w$ を全て集め、

$$
U(z)=\sup_w w(z)
$$

と置いても、点ごとの supremum が自動的に upper semicontinuous になるとは限りません。

viscosity subsolution の定義は upper semicontinuity と上接触 test function を使うので、そのままでは定義へ入れません。

そこで

$$
U^*(z)=\limsup_{\zeta\to z}U(\zeta)
$$

を取り、upper semicontinuous な包を作ります。

### 3. $U^*$ の subsolution 性

$\phi$ が $U^*$ へ strict に上から接する点を $z_0$ とします。

$U^*$ の定義から

$$
z_n\to z_0,
\qquad
U(z_n)\to U^*(z_0)
$$

となる点列を取れます。

さらに supremum の定義から、各 $n$ に対して subsolution $w_n$ を

$$
w_n(z_n)
\ge
U(z_n)-\frac1n
$$

となるように選べます。

$w_n-\phi$ の近傍最大点を $y_n$ と取ると strict contact により

$$
y_n\to z_0.
$$

$w_n$ は subsolution なので

$$
\phi_t(y_n)
+
H(x_{y_n},\nabla\phi(y_n))
\le0.
$$

極限を取れば

$$
\phi_t(z_0)
+
H(x_0,\nabla\phi(z_0))
\le0.
$$

よって $U^*$ は subsolution です。

### 4. supersolution 性が壊れると supremum を越えられる

$U_*$ が supersolution でないとします。

すると下接触する $\phi$ があり、

$$
\phi_t+H(x,\nabla\phi)<0
$$

が接触点で成り立ちます。

連続性により小近傍では

$$
\phi_t+H(x,\nabla\phi)\le-2\theta
$$

とできます。

定数 $\delta>0$ を足して

$$
\psi=\phi+\delta
$$

としても微分は変わらないので、$\psi$ も strict subsolution です。

strict contact のため近傍境界では $U>\psi$、接触点近くでは $\psi>U$ となるよう $\delta$ を選べます。

そこで

$$
\widetilde U
=
\max\{U,\psi\}
$$

と局所的に持ち上げます。

max of subsolutions の補題により $\widetilde U$ は subsolution です。

しかも barrier の範囲内に収めれば Perron family に属します。

しかしある点で

$$
\widetilde U>U
$$

です。

これは $U$ が Perron family 全体の pointwise supremum だったことに反します。

したがって $U_*$ は supersolution です。

### 5. comparison で包が一致する

前段から $U$ は subsolution、$U_*$ は supersolution で、終端値はいずれも $g$ です。

comparison より

$$
U\le U_*.
$$

一方、定義から常に

$$
U_*\le U.
$$

よって

$$
U=U_*.
$$

また subsolution 側では

$$
U=U^*
$$

を得ています。

したがって

$$
U=U^*=U_*
$$

で、$U$ は連続です。

そして subsolution と supersolution の両方なので

$$
\boxed{
U\text{ は終端値問題の viscosity solution}
}
$$

です。

さらに最初の一意性より、この Perron 解が唯一の bounded uniformly continuous viscosity solution です。
<!-- solution-end -->
