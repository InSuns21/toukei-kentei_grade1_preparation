# NPDE7 長時間漸近・普遍 profile・rescaled convergence

## 1. 解が存在した後に、何を知りたいのか

ここまでの非線形 PDE では、解を作ること、一意性を得ること、有限時間で壊れるかを判定することを扱ってきました。しかし大域解が存在しても、それだけでは長い時間の後に何が見えるかは分かりません。

[NPDE4](../NPDE4/index.md) では熱方程式を similarity variables で見直すと Gaussian profile が止まって見えることを確認しました。[NPDE5](../NPDE5/index.md) では多孔質媒質方程式の Barenblatt profile も、対応する rescaling の下で定常解になることを確認しました。

本章の中心問題は

$$
\boxed{
\text{時間と空間の尺度を合わせ直したとき、一般の解は自己相似 profile へ近づくのか}
}
$$

です。

長時間漸近では、少なくとも次の三つを区別します。

1. 元の変数で解がどの速さで小さくなるか。
2. 主項としてどの profile が残るか。
3. 主項を引いた後に、どの moment が次の補正を決めるか。

線形熱方程式では、この三つを熱核の平行移動だけからかなり完全に証明できます。非線形拡散では、同じ「自己相似 profile へ吸い寄せられる」という絵が残りますが、重ね合わせが使えないため、rescaled dynamics と Lyapunov 型の自由エネルギーが必要になります。

---

## 2. 熱方程式の質量は長時間で残る最初の情報

$d\ge1$ とし、

$$
u_t=\Delta u,
\qquad
u(0,x)=u_0(x),
\qquad
u_0\in L^1(\mathbb R^d)
$$

を考えます。

$d$ 次元熱核を

$$
G_t(x)
=
(4\pi t)^{-d/2}
\exp\left(-\frac{|x|^2}{4t}\right)
$$

とすると、

$$
u(t,x)
=
(G_t*u_0)(x)
$$

です。

初期質量を

$$
M
=
\int_{\mathbb R^d}u_0(x)\,dx
$$

と置きます。熱核の全質量が1なので、

$$
\int_{\mathbb R^d}u(t,x)\,dx
=
M
$$

が全時刻で保たれます。

一方、熱核そのものは高さが $t^{-d/2}$、幅が $\sqrt t$ です。したがって長時間で形を比較するには、高さと幅を同時に戻す必要があります。

$t=e^\tau$、$y=x/\sqrt t$ とし、

$$
v(\tau,y)
=
t^{d/2}u(t,\sqrt t\,y)
$$

と置きます。また

$$
\Phi(y)
=
G_1(y)
=
(4\pi)^{-d/2}
e^{-|y|^2/4}
$$

と書きます。

このとき変数変換 $x=\sqrt t\,y$ から

$$
\int_{\mathbb R^d}v(\tau,y)\,dy
=
M
$$

です。つまり rescaling は質量を保ったまま、広がる解を固定スケールへ戻しています。

### rescaling の意味を先に具体例で見る

初期値が時刻 $a>0$ の熱核そのもの、

$$
u_0(x)=M G_a(x)
$$

なら半群性から

$$
u(t,x)=M G_{t+a}(x).
$$

したがって

$$
v(\tau,y)
=
M
\left(
\frac{t}{t+a}
\right)^{d/2}
\Phi\left(
\sqrt{\frac{t}{t+a}}\,y
\right).
$$

$t\to\infty$ では係数も引数の倍率も1へ近づくので、

$$
v(\tau,\cdot)\to M\Phi
$$

となります。一般の $L^1$ 初期値でも同じ極限が起きることを、これから証明します。

<a id="def-npde7-rescaled-convergence"></a>
<!-- formal-statement-start -->
> **定義（再正規化収束と長時間漸近 profile）**  
> $1\le q\le\infty$ とする。熱方程式の解 $u$ に対し
>
> $$
> v(\tau,y)=t^{d/2}u(t,\sqrt t\,y),
> \qquad
> t=e^\tau
> $$
>
> と置く。ある関数 $F\in L^q(\mathbb R^d)$ に対して
>
> $$
> \|v(\tau)-F\|_{L^q}\to0
> \qquad
> (\tau\to\infty)
> $$
>
> が成り立つとき、$u$ はこの rescaling の下で $F$ へ **再正規化収束**するといい、$F$ を長時間漸近 profile と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde7-rescaled-convergence -->
**定義の確認**：$u(t,x)=M G_t(x)$ なら

$$
t^{d/2}u(t,\sqrt t\,y)
=
M\Phi(y)
$$

なので、再正規化後は全時刻で既に定常です。
<!-- definition-example-end -->

---

## 3. Gaussian profile は全ての $L^1$ 初期値の主項になる

解公式へ $x=\sqrt t\,y$ を代入すると

$$
\begin{aligned}
v(\tau,y)
&=
t^{d/2}
\int_{\mathbb R^d}
G_t(\sqrt t\,y-z)u_0(z)\,dz\\
&=
\int_{\mathbb R^d}
\Phi\left(
y-\frac{z}{\sqrt t}
\right)
u_0(z)\,dz.
\end{aligned}
$$

ここで $t\to\infty$ なら固定した $z$ に対して $z/\sqrt t\to0$ です。したがって、初期値の各点 $z$ は再正規化座標では原点へ潰れて見えます。残るのは各点が持つ質量の総和 $M$ です。

<a id="thm-npde7-heat-gaussian-asymptotics"></a>
<!-- formal-statement-start -->
> **定理（熱方程式の Gaussian 長時間漸近）**  
> $d\ge1$、$u_0\in L^1(\mathbb R^d)$ とし、
>
> $$
> u(t)=G_t*u_0,
> \qquad
> M=\int_{\mathbb R^d}u_0(x)\,dx
> $$
>
> とする。任意の $1\le q\le\infty$ に対して
>
> $$
> \boxed{
> t^{\frac d2(1-\frac1q)}
> \|u(t)-M G_t\|_{L^q}
> \to0
> }
> $$
>
> が $t\to\infty$ で成り立つ。ただし $q=\infty$ では $1/q=0$ とする。従って
>
> $$
> t^{d/2}u(t,\sqrt t\,\cdot)
> \to
> M\Phi
> $$
>
> が $L^q(\mathbb R^d)$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

重ね合わせを Fourier 変換へ送る必要はありません。再正規化解は

$$
v(\tau,\cdot)
=
\int
u_0(z)
\Phi\left(
\cdot-\frac z{\sqrt t}
\right)
dz
$$

です。

したがって $M\Phi$ との差は、Gaussian の小さな平行移動

$$
\Phi(\cdot-h)-\Phi
$$

を $u_0(z)$ で平均したものです。$u_0$ の大きい $|z|$ の部分は $L^1$ tail で小さくし、残った有界領域では $h=z/\sqrt t$ が一様に0へ近づきます。

<!-- proof-start -->
### 証明

簡単のため

$$
v_t(y)
=
t^{d/2}u(t,\sqrt t\,y)
$$

と書きます。上の計算から

$$
v_t(y)-M\Phi(y)
=
\int_{\mathbb R^d}
u_0(z)
\left[
\Phi\left(y-\frac z{\sqrt t}\right)-\Phi(y)
\right]
dz.
$$

まず $q=1$ と $q=\infty$ を直接示します。

$$
a_z(y)
=
\Phi\left(y-\frac z{\sqrt t}\right)-\Phi(y)
$$

と置きます。各点で三角不等式を使い、非負な量の積分順序を交換すると

$$
\begin{aligned}
\|v_t-M\Phi\|_{L^1}
&\le
\int_{\mathbb R^d}
|u_0(z)|\|a_z\|_{L^1}\,dz,\\
\|v_t-M\Phi\|_{L^\infty}
&\le
\int_{\mathbb R^d}
|u_0(z)|\|a_z\|_{L^\infty}\,dz.
\end{aligned}
$$

$\varepsilon>0$ を固定します。$u_0\in L^1$ なので、ある $R>0$ を選んで

$$
\int_{|z|>R}|u_0(z)|\,dz
<
\varepsilon
$$

とできます。

$q=1,\infty$ のどちらでも、$|z|>R$ では平行移動で $L^q$ ノルムが変わらないため、

$$
\|a_z\|_{L^q}
\le
2\|\Phi\|_{L^q}.
$$

したがって tail の寄与は

$$
2\|\Phi\|_{L^q}\varepsilon
$$

以下です。

一方 $|z|\le R$ では

$$
\left|\frac z{\sqrt t}\right|
\le
\frac R{\sqrt t}
\to0.
$$

$\Phi$ は $L^1$ 平行移動に関して連続であり、また一様連続なので、

$$
\sup_{|h|\le R/\sqrt t}
\|\Phi(\cdot-h)-\Phi\|_{L^q}
\to0
\qquad
(q=1,\infty).
$$

従って内側の寄与は

$$
\|u_0\|_{L^1}
\sup_{|h|\le R/\sqrt t}
\|\Phi(\cdot-h)-\Phi\|_{L^q}
\to0.
$$

よって $q=1,\infty$ では

$$
\|v_t-M\Phi\|_{L^q}\to0.
$$

最後に $1<q<\infty$ とし、

$$
f_t=v_t-M\Phi
$$

と置きます。直接

$$
\begin{aligned}
\|f_t\|_{L^q}^q
&=
\int |f_t|^{q-1}|f_t|\\
&\le
\|f_t\|_{L^\infty}^{q-1}
\|f_t\|_{L^1}
\end{aligned}
$$

なので、既に示した $L^1$ と $L^\infty$ の収束から

$$
\|f_t\|_{L^q}\to0
$$

も従います。

以上で、任意の $1\le q\le\infty$ に対して

$
\|v_t-M\Phi\|_{L^q}\to0
$

を得ました。

最後に $x=\sqrt t\,y$ と変数変換すると

$$
\|v_t-M\Phi\|_{L^q}
=
t^{\frac d2(1-\frac1q)}
\|u(t)-M G_t\|_{L^q}.
$$

$q=\infty$ でも同じ scaling が成り立つので、定理を得ます。
<!-- proof-end -->

この証明の重要点は、初期値の細かな形を使っていないことです。長時間・拡散スケールで見ると、$L^1$ 初期値の形状情報の大部分は消え、最初に残る量は全時刻で保たれる質量 $M$ であり、それが Gaussian の係数だけを決めます。これが「普遍 profile」という言葉の具体的な意味です。

---

## 4. decay rate は profile の scaling から読める

前定理から、$M\ne0$ なら

$$
u(t)
=
M G_t
+
o_{L^q}
\left(
t^{-\frac d2(1-\frac1q)}
\right).
$$

一方、熱核の scaling から

$$
\|G_t\|_{L^q}
=
t^{-\frac d2(1-\frac1q)}
\|\Phi\|_{L^q}.
$$

従って主項のノルムは

$$
\|M G_t\|_{L^q}
=
|M|
\|\Phi\|_{L^q}
t^{-\frac d2(1-\frac1q)}
$$

です。

<a id="cor-npde7-heat-decay-leading-order"></a>
<!-- formal-statement-start -->
> **系（熱方程式の leading decay rate）**  
> 上の定理の仮定の下で $M\ne0$ とする。任意の $1\le q\le\infty$ に対して
>
> $$
> \boxed{
> t^{\frac d2(1-\frac1q)}
> \|u(t)\|_{L^q}
> \to
> |M|\|\Phi\|_{L^q}
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逆三角不等式から

$$
\left|
\|u(t)\|_{L^q}
-
|M|\|G_t\|_{L^q}
\right|
\le
\|u(t)-M G_t\|_{L^q}.
$$

両辺へ

$$
t^{\frac d2(1-\frac1q)}
$$

を掛けます。右辺は前定理により0へ収束し、

$$
t^{\frac d2(1-\frac1q)}
|M|\|G_t\|_{L^q}
=
|M|\|\Phi\|_{L^q}
$$

なので結論を得ます。
<!-- proof-end -->

ただし $M=0$ なら Gaussian 主項そのものが消えます。このとき decay は一段速くなり、次に一次 moment が見えてきます。

---

## 5. 一次 moment が次の形を決める

初期値について

$$
\int_{\mathbb R^d}
|x|\,|u_0(x)|\,dx
<
\infty
$$

も仮定します。

一次 moment ベクトルを

$$
b
=
\int_{\mathbb R^d}
x\,u_0(x)\,dx
\in\mathbb R^d
$$

と置きます。

熱方程式ではこの量も保存されます。実際、

$$
u(t,x)
=
\int G_t(x-z)u_0(z)\,dz
$$

なので、積分順序を交換して $w=x-z$ と置けば

$$
\begin{aligned}
\int x\,u(t,x)\,dx
&=
\int u_0(z)
\int xG_t(x-z)\,dx\,dz\\
&=
\int u_0(z)
\int (w+z)G_t(w)\,dw\,dz.
\end{aligned}
$$

Gaussian は偶関数なので

$$
\int wG_t(w)\,dw=0,
$$

かつ $\int G_t=1$ です。従って

$$
\int x\,u(t,x)\,dx
=
b.
$$

再正規化解ではこの一次 moment は

$$
\int y\,v(\tau,y)\,dy
=
t^{-1/2}b
=
e^{-\tau/2}b
$$

と見えます。つまり一次 moment は rescaled dynamics の中で $e^{-\tau/2}$ の速さで消えるモードです。

<a id="thm-npde7-heat-moment-correction"></a>
<!-- formal-statement-start -->
> **定理（熱方程式の一次 moment 補正）**  
> $u_0\in L^1(\mathbb R^d)$ が
>
> $$
> \int_{\mathbb R^d}|x|\,|u_0(x)|\,dx<\infty
> $$
>
> を満たすとする。
>
> $$
> M=\int u_0,
> \qquad
> b=\int x\,u_0(x)\,dx
> $$
>
> と置けば
>
> $$
> \boxed{
> t^{1/2}
> \left\|
> u(t)-M G_t+b\cdot\nabla G_t
> \right\|_{L^1}
> \to0
> }
> $$
>
> が $t\to\infty$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Gaussian を小さく平行移動すると

$$
\Phi(y-h)
=
\Phi(y)-h\cdot\nabla\Phi(y)
+
\text{小さい剰余}
$$

です。

ここで

$$
h=\frac z{\sqrt t}
$$

とし、$u_0(z)$ で平均すると、一次項から

$$
-\frac1{\sqrt t}
b\cdot\nabla\Phi
$$

が出ます。剰余が $o(t^{-1/2})$ であることを、$\nabla\Phi$ の平行移動連続性と有限一次 moment で示します。

<!-- proof-start -->
### 証明

再正規化解は

$$
v_t(y)
=
\int
u_0(z)
\Phi\left(
y-\frac z{\sqrt t}
\right)
dz
$$

です。

$h\in\mathbb R^d$ に対し

$$
R_h(y)
=
\Phi(y-h)-\Phi(y)+h\cdot\nabla\Phi(y)
$$

と置きます。

線分 $s\mapsto y-sh$ に沿って微分すると

$$
\Phi(y-h)-\Phi(y)
=
-\int_0^1
h\cdot\nabla\Phi(y-sh)\,ds.
$$

従って

$$
R_h(y)
=
\int_0^1
h\cdot
\left[
\nabla\Phi(y)-\nabla\Phi(y-sh)
\right]
ds.
$$

よって

$$
\|R_h\|_{L^1}
\le
|h|
\int_0^1
\|\nabla\Phi-\nabla\Phi(\cdot-sh)\|_{L^1}
ds.
$$

$\nabla\Phi\in L^1$ であり、$L^1$ 平行移動は連続なので

$$
\frac{\|R_h\|_{L^1}}{|h|}
\to0
\qquad
(h\to0).
$$

また常に

$$
\|R_h\|_{L^1}
\le
2|h|\|\nabla\Phi\|_{L^1}
$$

です。

この展開を $h=z/\sqrt t$ に適用すると

$$
\begin{aligned}
v_t
&=
\int u_0(z)
\left[
\Phi
-
\frac z{\sqrt t}\cdot\nabla\Phi
+
R_{z/\sqrt t}
\right]
dz\\
&=
M\Phi
-
\frac1{\sqrt t}
b\cdot\nabla\Phi
+
\int u_0(z)R_{z/\sqrt t}\,dz.
\end{aligned}
$$

従って

$$
\sqrt t
\left\|
v_t-M\Phi+\frac1{\sqrt t}b\cdot\nabla\Phi
\right\|_{L^1}
\le
\int
|u_0(z)|
\sqrt t\,
\|R_{z/\sqrt t}\|_{L^1}
dz.
$$

固定した $z$ に対して $h=z/\sqrt t\to0$ なので、

$$
\sqrt t\,
\|R_{z/\sqrt t}\|_{L^1}
=
|z|
\frac{\|R_h\|_{L^1}}{|h|}
\to0.
$$

一方、上の一様評価から

$$
\sqrt t\,
\|R_{z/\sqrt t}\|_{L^1}
\le
2|z|\|\nabla\Phi\|_{L^1}.
$$

右辺へ $|u_0(z)|$ を掛けたものは有限一次 moment の仮定により可積分です。したがって、$z$ を有界部分と tail に分ければ積分全体が0へ収束します。

最後に

$$
t^{d/2}
\nabla G_t(\sqrt t\,y)
=
t^{-1/2}\nabla\Phi(y)
$$

なので、再正規化変数から元の変数へ戻して

$$
t^{1/2}
\left\|
u(t)-M G_t+b\cdot\nabla G_t
\right\|_{L^1}
\to0
$$

を得ます。
<!-- proof-end -->

### 質量が0なら一次 moment が主役になる

$M=0$ なら前定理は

$$
u(t)
=
-b\cdot\nabla G_t
+
o_{L^1}(t^{-1/2})
$$

を意味します。

ここで

$$
\|\nabla G_t\|_{L^1}
=
t^{-1/2}\|\nabla\Phi\|_{L^1}
$$

なので、$b\ne0$ なら逆三角不等式も使って

$$
t^{1/2}\|u(t)\|_{L^1}
\to
\|b\cdot\nabla\Phi\|_{L^1}
>0.
$$

質量が消えると $L^1$ decay は一段速くなるわけです。

反対に $M\ne0$ なら、重心

$$
\mu=\frac bM
$$

を用いて

$$
M G_t(x-\mu)
=
M G_t(x)-b\cdot\nabla G_t(x)
+
O_{L^1}(t^{-1})
$$

と展開できます。つまり一次 moment 補正は、「Gaussian の中心を原点から重心へずらす」こととしても読めます。

---

## 6. rescaled dynamics では何が起きているのか

[NPDE4 の rescaled heat equation](../NPDE4/index.md#prop-npde4-rescaled-heat)は

$$
v_\tau
=
\Delta v
+
\frac12\nabla\cdot(yv)
$$

でした。

Gaussian profile $\Phi$ はこの方程式の定常解です。

本章の定理は、それより強いことを言っています。単に「定常解を一つ書ける」のではなく、任意の $L^1$ 初期値から出た軌道が、質量だけで決まる定常状態 $M\Phi$ へ近づきます。

さらに、

$$
\int yv(\tau,y)\,dy
=
e^{-\tau/2}b
$$

なので、一次 moment の情報は定常状態への最初の減衰モードとして見えます。

この見方を一般化すると、長時間漸近の問題は

$$
\boxed{
\text{自己相似解を探す}
\quad\longrightarrow\quad
\text{rescaled dynamics の定常状態を探す}
\quad\longrightarrow\quad
\text{一般軌道がそこへ近づくことを示す}
}
$$

という三段階になります。

線形熱方程式では畳み込み公式が最後の矢印まで直接証明してくれました。多孔質媒質方程式では重ね合わせがないため、別の構造が必要です。

---

## 7. 多孔質媒質方程式では自由エネルギーが形を選ぶ

[NPDE5](../NPDE5/index.md) の多孔質媒質方程式

$$
u_t=\Delta(u^m),
\qquad
m>1
$$

を考えます。

質量保存型自己相似指数は

$$
\beta
=
\frac1{d(m-1)+2},
\qquad
\alpha=d\beta
$$

でした。

$t=e^\tau$、

$$
y=xt^{-\beta},
\qquad
v(\tau,y)=t^\alpha u(t,t^\beta y)
$$

と置くと、[再正規化多孔質媒質方程式](../NPDE5/index.md#prop-npde5-rescaled-pme)は

$$
v_\tau
=
\Delta(v^m)
+
\beta\nabla\cdot(yv)
$$

です。

右辺を一つの flux にまとめます。$v>0$ の場所で

$$
\nabla(v^m)
=
v\nabla\left(
\frac m{m-1}v^{m-1}
\right)
$$

なので、

$$
v_\tau
=
\nabla\cdot
\left[
v\nabla
\left(
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
\right)
\right].
$$

括弧内は、拡散による広がりと再正規化による閉じ込めの競合を一つにまとめた量です。

<a id="def-npde7-pme-free-energy"></a>
<!-- formal-statement-start -->
> **定義（再正規化多孔質媒質方程式の自由エネルギー）**  
> $m>1$、$\beta=1/[d(m-1)+2]$ とする。非負関数 $v$ が
>
> $$
> v\in L^m(\mathbb R^d),
> \qquad
> \int_{\mathbb R^d}|y|^2v(y)\,dy<\infty
> $$
>
> を満たすとき、
>
> $$
> \boxed{
> \mathcal E[v]
> =
> \frac1{m-1}
> \int_{\mathbb R^d}v^m\,dy
> +
> \frac\beta2
> \int_{\mathbb R^d}|y|^2v\,dy
> }
> $$
>
> を再正規化多孔質媒質方程式の自由エネルギーとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde7-pme-free-energy -->
**定義の確認**：$v$ の質量を固定して空間的に極端に広げると第二項が増え、極端に集中させると第一項が増えます。したがって $\mathcal E$ は「広がり過ぎ」と「集中し過ぎ」の両方に費用を課します。
<!-- definition-example-end -->

この汎関数の第一変分に対応する量を

$$
\xi
=
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
$$

と置けば、

$$
v_\tau=\nabla\cdot(v\nabla\xi)
$$

です。

<a id="prop-npde7-pme-energy-dissipation"></a>
<!-- formal-statement-start -->
> **命題（自由エネルギー散逸恒等式）**  
> $v$ を再正規化多孔質媒質方程式の十分滑らかな非負解とし、積分 by parts の境界項が消えるだけの減衰または compact support を仮定する。すると
>
> $$
> \boxed{
> \frac d{d\tau}\mathcal E[v(\tau)]
> =
> -
> \int_{\mathbb R^d}
> v
> \left|
> \nabla\left(
> \frac m{m-1}v^{m-1}
> +
> \frac\beta2|y|^2
> \right)
> \right|^2
> dy
> \le0
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal E$ を時間微分すると、二つの項はまとめて

$$
\int \xi v_\tau
$$

になります。そこへ

$$
v_\tau=\nabla\cdot(v\nabla\xi)
$$

を代入し、一回だけ積分 by parts すると負の平方になります。

<!-- proof-start -->
### 証明

第一項を微分すると

$$
\frac d{d\tau}
\left(
\frac1{m-1}\int v^m
\right)
=
\int
\frac m{m-1}v^{m-1}v_\tau.
$$

第二項は

$$
\frac d{d\tau}
\left(
\frac\beta2\int |y|^2v
\right)
=
\int
\frac\beta2|y|^2v_\tau.
$$

従って

$$
\frac d{d\tau}\mathcal E[v(\tau)]
=
\int
\xi v_\tau.
$$

方程式

$$
v_\tau=\nabla\cdot(v\nabla\xi)
$$

を代入すると

$$
\frac d{d\tau}\mathcal E[v(\tau)]
=
\int
\xi
\nabla\cdot(v\nabla\xi).
$$

境界項が消えるという仮定の下で積分 by parts し、

$$
\int
\xi
\nabla\cdot(v\nabla\xi)
=
-
\int
\nabla\xi\cdot(v\nabla\xi)
=
-
\int
v|\nabla\xi|^2.
$$

よって

$$
\frac d{d\tau}\mathcal E[v(\tau)]
=
-
\int v|\nabla\xi|^2
\le0.
$$
<!-- proof-end -->

この式は、自由エネルギーが時間とともに一方向にしか動かないことを示します。長時間で軌道が止まるなら、止まった先では散逸量が0でなければなりません。

---

## 8. 散逸が0なら Barenblatt profile しか残らない

散逸量が0なら

$$
v|\nabla\xi|^2=0
$$

です。従って $v>0$ の各連結成分では

$$
\nabla\xi=0,
$$

すなわち $\xi$ は定数です。

<a id="prop-npde7-pme-stationary-barenblatt"></a>
<!-- formal-statement-start -->
> **命題（零散逸定常状態は Barenblatt profile）**  
> $m>1$ とし、$v\ge0$ が有限正質量
>
> $$
> M=\int_{\mathbb R^d}v(y)\,dy>0
> $$
>
> を持つ再正規化多孔質媒質方程式の定常状態であるとする。さらに $v$ は連続で、正値集合 $\{v>0\}$ の内部で十分滑らかであり、自由エネルギー散逸量が0とする。このとき
>
> $$
> \boxed{
> v(y)
> =
> (C-k|y|^2)_+^{1/(m-1)},
> \qquad
> k=\frac{(m-1)\beta}{2m}
> }
> $$
>
> であり、$C>0$ は質量 $M$ によって一意に決まる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v>0$ の領域では零散逸から

$$
\nabla\xi=0
$$

です。従って正値集合 $\{v>0\}$ の各連結成分 $D$ 上である定数 $A$ が存在し、

$$
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
=
A.
$$

これを $v^{m-1}$ について解くと

$$
v^{m-1}
=
\frac{m-1}{m}A
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

そこで

$$
C=\frac{m-1}{m}A,
\qquad
k=\frac{(m-1)\beta}{2m}
$$

と置けば、その連結成分上では

$$
v(y)
=
(C-k|y|^2)^{1/(m-1)}
$$

です。右辺が正になる領域は原点を中心とする球です。$v$ の連続性から、$D$ の境界で $v$ は0でなければなりません。したがって $D$ の境界は $C-k|y|^2=0$ の球面上にあり、$D$ はその球の内部全体です。異なる定数 $C$ を持つ二つの非空な正値成分があれば、どちらも原点を含む球になって互いに重なるので不可能です。従って全空間では

$$
v(y)
=
(C-k|y|^2)_+^{1/(m-1)}.
$$

これは [NPDE5 の Barenblatt profile](../NPDE5/index.md#thm-npde5-barenblatt) と同じ形です。

さらに NPDE5 で計算したように、その質量は

$$
M
=
A_{d,m}
C^{\frac1{m-1}+\frac d2}
$$

であり、右辺は $C>0$ に関して狭義単調増加です。従って所与の $M>0$ に対し $C$ は一意です。
<!-- proof-end -->

ここで重要なのは、Barenblatt profile を「うまく見つかった明示解」として終わらせていないことです。rescaled dynamics の散逸が止まる状態を分類すると、質量を固定した Barenblatt profile が選び出されます。

---

## 9. compactness と定常状態の一意性が揃えば収束が出る

非線形方程式では、熱方程式のような畳み込み表示がありません。そのため一般解の長時間漸近は、通常次の二段階に分けます。

1. 再正規化後の軌道が無限に形を逃がさないこと、すなわち compactness を示す。
2. どの極限点も定常状態であることを示し、定常状態を分類する。

二つ目の分類は前節で Barenblatt profile まで閉じました。そこで、compactness と極限点の定常性を仮定したときに収束がどう従うかを、論理として完全に切り出します。

<a id="thm-npde7-pme-compactness-identification"></a>
<!-- formal-statement-start -->
> **定理（compactness と identification による Barenblatt 収束）**  
> $v(\tau)$ を質量 $M>0$ を保つ再正規化多孔質媒質方程式の非負解とする。次を仮定する。
>
> 1. 集合 $\{v(\tau):\tau\ge0\}$ は $L^1(\mathbb R^d)$ で相対 compact である。
> 2. 任意の列 $\tau_n\to\infty$ と、その部分列に沿う $L^1$ 極限 $w$ は、自由エネルギー散逸量0の定常状態である。
>
> このとき、質量 $M$ を持つ Barenblatt profile を $B_M$ と書けば
>
> $$
> \boxed{
> \|v(\tau)-B_M\|_{L^1}
> \to0
> }
> $$
>
> が $\tau\to\infty$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

もし収束しないなら、Barenblatt profile から一定距離以上離れた時刻列を取れます。相対 compactness からその列はさらに収束部分列を持ちます。しかし仮定2と前節の分類により、その極限は必ず $B_M$ です。すると「一定距離以上離れている」と矛盾します。

<!-- proof-start -->
### 証明

収束しないと仮定します。するとある $\varepsilon_0>0$ と時刻列 $\tau_n\to\infty$ が存在して

$$
\|v(\tau_n)-B_M\|_{L^1}
\ge
\varepsilon_0
$$

となります。

仮定1の相対 compactness により、部分列を取り直して

$$
v(\tau_{n_k})
\to
w
\qquad
\text{in }L^1
$$

とできます。

仮定2から $w$ は散逸量0の定常状態です。質量は各 $v(\tau)$ で $M$ に保たれ、$L^1$ 収束から

$$
\int w=M
$$

です。

前節の零散逸定常状態の分類から、質量 $M$ を持つ定常状態は一意な Barenblatt profile $B_M$ なので

$$
w=B_M.
$$

従って

$$
\|v(\tau_{n_k})-B_M\|_{L^1}
\to0.
$$

これは全ての $k$ で

$$
\|v(\tau_{n_k})-B_M\|_{L^1}
\ge\varepsilon_0
$$

だったことに矛盾します。

よって

$$
\|v(\tau)-B_M\|_{L^1}\to0
$$

です。
<!-- proof-end -->

### 一般データの完全な PME 漸近定理へ進むには

多孔質媒質方程式の一般的な $L^1$ 初期値から相対 compactness や極限点の定常性を導くには、平滑化、moment 制御、質量が空間無限遠へ逃げないための一様評価、自由エネルギーを極限へ渡すための追加評価などを組み合わせる必要があります。

それらを数行の「標準的 compactness」へ押し込むと、実際に必要な解析を隠してしまいます。そこで本章では、

- rescaling が何を固定するか、
- どの Lyapunov 量が減るか、
- 散逸0がなぜ Barenblatt を選ぶか、
- compactness と identification がどう収束へ結びつくか、

を紙上で追える形で閉じます。

元の変数へ戻せば、再正規化収束

$$
v(\tau,y)\to B_M(y)
$$

は

$$
u(t,x)
\sim
t^{-\alpha}
B_M(xt^{-\beta})
$$

という意味です。線形熱方程式では $B_M$ の代わりに $M\Phi$、$\alpha=d/2$、$\beta=1/2$ が現れていました。

---

## 10. 「attractor」という言葉を使う前に何を確認するか

rescaled dynamics の図だけを見ると、Gaussian や Barenblatt を「attractor」と呼びたくなります。しかし数学的には、何の空間で、どの距離で、どの初期値クラスを吸引するのかを固定しないと意味が曖昧です。

本章で確定した内容は次です。

### 熱方程式

任意の $u_0\in L^1$ に対し、質量 $M$ を保つ rescaling の下で

$$
v(\tau)\to M\Phi
$$

が $L^q$、$1\le q\le\infty$ で成り立ちます。

したがって、質量 $M$ を固定した $L^1$ データのクラスでは、$M\Phi$ が明確な長時間吸引先です。

### 多孔質媒質方程式

質量 $M$ を固定すると、自由エネルギーの散逸0定常状態は一意な $B_M$ です。

さらに再正規化軌道の相対 compactness と、全ての極限点が散逸0定常状態になることが確認できれば、

$$
v(\tau)\to B_M
$$

が $L^1$ で従います。

つまり「attractor」という一語の裏側には、

$$
\text{compactness}
+
\text{Lyapunov monotonicity}
+
\text{stationary-state classification}
$$

があります。

---

## 11. 線形熱・多孔質媒質・半線形熱を並べて見る

三つの方程式を同じ表で見ると、ここまでの役割が整理できます。

| 方程式 | 保存・臨界情報 | 自己相似尺度 | rescaled dynamics で重要な状態 |
|---|---|---|---|
| $u_t=\Delta u$ | 質量 $M$ | $x\sim t^{1/2}$、$u\sim t^{-d/2}$ | Gaussian $M\Phi$ |
| $u_t=\Delta(u^m)$ | 質量 $M$ | $x\sim t^\beta$、$u\sim t^{-\alpha}$ | Barenblatt $B_M$ |
| $u_t=\Delta u+u^p$ | $L^q$ criticality | blow-up では $x\sim(T-t)^{1/2}$ | backward self-similar profile |

線形熱方程式と多孔質媒質方程式では、質量保存型 rescaling を使って $t\to\infty$ を固定スケールへ戻しました。

[NPDE6](../NPDE6/index.md) で扱った $u_t=\Delta u+u^p$ では、同じ放物型空間尺度でも時間の向きが逆で、$t\uparrow T$ の有限時間 blow-up を固定する backward rescaling を使いました。

したがって self-similarity は一つの公式ではありません。

$$
\boxed{
\text{どの極限を見たいか}
\;\Longrightarrow\;
\text{その極限を固定する rescaling を選ぶ}
}
$$

という方法です。

---

## 12. この章で分かったこと

- 熱方程式では質量 $M$ が長時間の第一主項を決める。
- 任意の $L^1$ 初期値に対し、拡散スケールへ戻した解は $M\Phi$ へ $L^q$ 収束する。
- 元の変数では $M G_t$ が leading profile で、decay rate も熱核の scaling から決まる。
- 有限一次 moment があれば、次の補正は $-b\cdot\nabla G_t$ である。
- rescaled heat equation では一次 moment は $e^{-\tau/2}$ で消えるモードとして見える。
- 多孔質媒質方程式の rescaled dynamics には減少する自由エネルギーがある。
- 自由エネルギー散逸が0の定常状態を分類すると Barenblatt profile が現れる。
- nonlinear diffusion の長時間収束は、compactness と定常状態の identification に分解して考えられる。
- 自己相似解を一つ書くことと、一般解がその profile へ近づくことは別問題である。

これで、弱解の選択から非線形存在論、scaling、非線形拡散、blow-up、長時間漸近まで一通りつながりました。

---

# 演習

## Level A

<a id="ex-npde7-a01"></a>
### NPDE7-A01 rescaled heat solution の質量
- Level: A

$$
v(\tau,y)
=
t^{d/2}u(t,\sqrt t\,y),
\qquad
t=e^\tau
$$

とする。

1. $x=\sqrt t\,y$ と変数変換して $\int v\,dy=\int u\,dx$ を示せ。
2. 熱方程式で $\int u(t,x)\,dx=M$ なら、再正規化解の質量も $M$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

$x=\sqrt t\,y$ なので

$$
dx=t^{d/2}dy,
\qquad
dy=t^{-d/2}dx.
$$

従って

$$
\begin{aligned}
\int_{\mathbb R^d}v(\tau,y)\,dy
&=
\int
t^{d/2}u(t,\sqrt t\,y)\,dy\\
&=
\int
t^{d/2}u(t,x)t^{-d/2}\,dx\\
&=
\int_{\mathbb R^d}u(t,x)\,dx.
\end{aligned}
$$

熱方程式の質量が

$$
\int u(t,x)\,dx=M
$$

に保たれるなら

$$
\boxed{
\int v(\tau,y)\,dy=M
}
$$

です。
<!-- solution-end -->

<a id="ex-npde7-a02"></a>
### NPDE7-A02 $L^q$ norm の rescaling
- Level: A

$1\le q<\infty$ とする。

$$
v(y)=t^{d/2}f(\sqrt t\,y)
$$

に対して

$$
\|v\|_{L^q}
=
t^{\frac d2(1-\frac1q)}
\|f\|_{L^q}
$$

を示せ。また $q=\infty$ の場合も確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\|v\|_{L^q}^q
=
\int
t^{dq/2}
|f(\sqrt t\,y)|^q
dy.
$$

$x=\sqrt t\,y$ と置くと

$$
dy=t^{-d/2}dx
$$

なので

$$
\|v\|_{L^q}^q
=
t^{dq/2-d/2}
\int|f(x)|^qdx.
$$

従って

$$
\|v\|_{L^q}
=
t^{d/2-d/(2q)}
\|f\|_{L^q}
=
\boxed{
t^{\frac d2(1-\frac1q)}
\|f\|_{L^q}
}.
$$

$q=\infty$ では

$$
\|v\|_\infty
=
t^{d/2}
\|f\|_\infty,
$$

これは $1/q=0$ とした同じ式です。
<!-- solution-end -->

<a id="ex-npde7-a03"></a>
### NPDE7-A03 一次 moment は rescaled 変数でどう見えるか
- Level: A

熱方程式の解が

$$
\int_{\mathbb R^d}x\,u(t,x)\,dx=b
$$

を保つとする。

$$
v(\tau,y)=t^{d/2}u(t,\sqrt t\,y)
$$

に対して

$$
\int yv(\tau,y)\,dy=t^{-1/2}b
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$x=\sqrt t\,y$ なので

$$
y=\frac x{\sqrt t},
\qquad
dy=t^{-d/2}dx.
$$

従って

$$
\begin{aligned}
\int yv(\tau,y)\,dy
&=
\int
y
t^{d/2}u(t,\sqrt t\,y)
dy\\
&=
\int
\frac x{\sqrt t}
t^{d/2}u(t,x)
t^{-d/2}dx\\
&=
t^{-1/2}
\int xu(t,x)\,dx\\
&=
\boxed{
t^{-1/2}b
}.
\end{aligned}
$$

$t=e^\tau$ なので、これは $e^{-\tau/2}b$ です。
<!-- solution-end -->

<a id="ex-npde7-a04"></a>
### NPDE7-A04 自由エネルギーの第一変分
- Level: A

$$
\mathcal E[v]
=
\frac1{m-1}\int v^m
+
\frac\beta2\int |y|^2v
$$

とする。滑らかな摂動 $v+\varepsilon\varphi$ を考え、

$$
\left.
\frac d{d\varepsilon}
\mathcal E[v+\varepsilon\varphi]
\right|_{\varepsilon=0}
=
\int
\left(
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
\right)
\varphi
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

第一項について

$$
\left.
\frac d{d\varepsilon}
\frac1{m-1}
\int
(v+\varepsilon\varphi)^m
\right|_{\varepsilon=0}
=
\frac m{m-1}
\int
v^{m-1}\varphi.
$$

第二項は $\varepsilon$ に関して線形なので

$$
\left.
\frac d{d\varepsilon}
\frac\beta2
\int
|y|^2(v+\varepsilon\varphi)
\right|_{\varepsilon=0}
=
\frac\beta2
\int
|y|^2\varphi.
$$

足し合わせて

$$
\boxed{
\left.
\frac d{d\varepsilon}
\mathcal E[v+\varepsilon\varphi]
\right|_{\varepsilon=0}
=
\int
\left(
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
\right)
\varphi
}.
$$

従って本文の $\xi$ は自由エネルギーの第一変分に対応します。
<!-- solution-end -->

<a id="ex-npde7-a05"></a>
### NPDE7-A05 零散逸から Barenblatt の係数を出す
- Level: A

$v>0$ の領域で

$$
\nabla
\left(
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
\right)
=
0
$$

とする。

$$
v(y)
=
(C-k|y|^2)_+^{1/(m-1)}
$$

の形を導き、

$$
k=\frac{(m-1)\beta}{2m}
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

勾配が0なので、$v>0$ の各連結成分上である定数 $A$ が存在して

$$
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
=
A.
$$

従って

$$
v^{m-1}
=
\frac{m-1}{m}A
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

ここで

$$
C=\frac{m-1}{m}A
$$

と置けば

$$
v^{m-1}
=
C
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

非負部分を取って

$$
\boxed{
v(y)
=
(C-k|y|^2)_+^{1/(m-1)}
}
$$

ただし

$$
\boxed{
k
=
\frac{(m-1)\beta}{2m}
}
$$

です。
<!-- solution-end -->

## Level B

<a id="ex-npde7-b01"></a>
### NPDE7-B01 Gaussian 長時間漸近を tail 分割で再構成する
- Level: B

$u_0\in L^1(\mathbb R^d)$ とし、

$$
v_t(y)
=
\int
u_0(z)
\Phi\left(y-\frac z{\sqrt t}\right)
dz,
\qquad
M=\int u_0
$$

とする。

1. $v_t-M\Phi$ を Gaussian の平行移動差の積分として書け。
2. $|z|>R$ の tail を $2\|\Phi\|_q\int_{|z|>R}|u_0|$ で評価せよ。
3. $|z|\le R$ の部分が $t\to\infty$ で0へ行くことを示せ。
4. $\|v_t-M\Phi\|_q\to0$ を結論せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
M\Phi(y)
=
\int
u_0(z)\Phi(y)\,dz
$$

なので

$$
v_t(y)-M\Phi(y)
=
\int
u_0(z)
\left[
\Phi\left(y-\frac z{\sqrt t}\right)-\Phi(y)
\right]
dz.
$$

まず $q=1$ では各点の三角不等式から

$$
\|v_t-M\Phi\|_1
\le
\int
|u_0(z)|
\left\|
\Phi\left(\cdot-\frac z{\sqrt t}\right)-\Phi
\right\|_1
dz.
$$

$q=\infty$ でも各点で絶対値を評価して supremum を取れば同じ形の評価が得られます。

$|z|>R$ では

$$
\left\|
\Phi\left(\cdot-\frac z{\sqrt t}\right)-\Phi
\right\|_q
\le
2\|\Phi\|_q
$$

なので

$$
\text{tail}
\le
2\|\Phi\|_q
\int_{|z|>R}|u_0(z)|\,dz.
$$

一方 $|z|\le R$ では

$$
\left|\frac z{\sqrt t}\right|
\le
\frac R{\sqrt t}
\to0.
$$

平行移動の $L^q$ 連続性から

$$
\sup_{|h|\le R/\sqrt t}
\|\Phi(\cdot-h)-\Phi\|_q
\to0.
$$

従って内側の寄与は

$$
\le
\|u_0\|_1
\sup_{|h|\le R/\sqrt t}
\|\Phi(\cdot-h)-\Phi\|_q
\to0.
$$

最後に $\varepsilon>0$ に対して $R$ を十分大きく取り

$$
\int_{|z|>R}|u_0|<\varepsilon
$$

とし、その後 $t$ を大きくすれば

$$
\limsup_{t\to\infty}
\|v_t-M\Phi\|_q
\le
2\|\Phi\|_q\varepsilon.
$$

$\varepsilon$ は任意なので $q=1,\infty$ で

$$
\|v_t-M\Phi\|_q\to0.
$$

$1<q<\infty$ では

$$
\|f\|_q^q
=
\int |f|^{q-1}|f|
\le
\|f\|_\infty^{q-1}\|f\|_1
$$

を $f=v_t-M\Phi$ に適用すれば、

$$
\boxed{
\|v_t-M\Phi\|_q\to0
}.
$$
<!-- solution-end -->

<a id="ex-npde7-b02"></a>
### NPDE7-B02 一次 moment 補正の符号を確認する
- Level: B

$\Phi$ を Gaussian とし、$h$ が小さいとする。

1. 線分積分から
   $$
   \Phi(y-h)-\Phi(y)
   =
   -\int_0^1h\cdot\nabla\Phi(y-sh)\,ds
   $$
   を導け。
2. 一次近似が
   $$
   \Phi(y-h)
   =
   \Phi(y)-h\cdot\nabla\Phi(y)+R_h(y)
   $$
   となることを確認せよ。
3. $h=z/\sqrt t$ とし $u_0(z)$ で積分して、補正項が
   $$
   -t^{-1/2}b\cdot\nabla\Phi
   $$
   になることを示せ。

<!-- solution-start -->
#### 詳細解答

関数

$$
F(s)=\Phi(y-sh)
$$

を考えます。連鎖律から

$$
F'(s)
=
-h\cdot\nabla\Phi(y-sh).
$$

従って

$$
\Phi(y-h)-\Phi(y)
=
F(1)-F(0)
=
-\int_0^1
h\cdot\nabla\Phi(y-sh)\,ds.
$$

ここで

$$
R_h(y)
=
\int_0^1
h\cdot
\left[
\nabla\Phi(y)-\nabla\Phi(y-sh)
\right]
ds
$$

と置けば

$$
\Phi(y-h)
=
\Phi(y)
-
h\cdot\nabla\Phi(y)
+
R_h(y).
$$

$h=z/\sqrt t$ を代入し $u_0(z)$ で積分すると一次項は

$$
-\int
u_0(z)
\frac z{\sqrt t}\cdot\nabla\Phi(y)
dz.
$$

$\nabla\Phi(y)$ は $z$ に依存しないので外へ出せて、

$$
=
-\frac1{\sqrt t}
\left(
\int z u_0(z)\,dz
\right)
\cdot\nabla\Phi(y).
$$

$b=\int z u_0(z)\,dz$ だから

$$
\boxed{
-\frac1{\sqrt t}
b\cdot\nabla\Phi(y)
}
$$

です。
<!-- solution-end -->

<a id="ex-npde7-b03"></a>
### NPDE7-B03 質量0のデータはなぜ一段速く減衰するか
- Level: B

$u_0\in L^1$ が有限一次 moment を持ち、

$$
M=\int u_0=0,
\qquad
b=\int xu_0(x)\,dx\ne0
$$

とする。

1. 一次 moment 補正定理から $u(t)$ の leading term を書け。
2. $\|\nabla G_t\|_1$ の scaling を求めよ。
3. $\|u(t)\|_1$ の leading order を求めよ。

<!-- solution-start -->
#### 詳細解答

$M=0$ なので一次 moment 補正定理は

$$
t^{1/2}
\|u(t)+b\cdot\nabla G_t\|_1
\to0
$$

です。

従って

$$
u(t)
=
-b\cdot\nabla G_t
+
o_{L^1}(t^{-1/2}).
$$

熱核は

$$
G_t(x)
=
t^{-d/2}\Phi(x/\sqrt t)
$$

なので一回微分すると

$$
\nabla G_t(x)
=
t^{-(d+1)/2}
\nabla\Phi(x/\sqrt t).
$$

$x=\sqrt t\,y$ と変数変換すれば

$$
\|\nabla G_t\|_1
=
t^{-1/2}\|\nabla\Phi\|_1.
$$

さらに

$$
\|b\cdot\nabla G_t\|_1
=
t^{-1/2}\|b\cdot\nabla\Phi\|_1.
$$

逆三角不等式から

$$
\left|
\|u(t)\|_1
-
\|b\cdot\nabla G_t\|_1
\right|
\le
\|u(t)+b\cdot\nabla G_t\|_1.
$$

両辺へ $t^{1/2}$ を掛けると右辺は0へ収束するので、

$$
\boxed{
t^{1/2}\|u(t)\|_1
\to
\|b\cdot\nabla\Phi\|_1
}.
$$

$b\ne0$ なら右辺は正です。質量が非零なら $L^1$ 主項 $MG_t$ は大きさ $O(1)$ でしたが、その係数が0になるため一次 moment 項まで主項が下がります。
<!-- solution-end -->

<a id="ex-npde7-b04"></a>
### NPDE7-B04 自由エネルギー散逸から定常 profile を特定する
- Level: B

再正規化多孔質媒質方程式の滑らかな非負解について

$$
\frac d{d\tau}\mathcal E[v]
=
-\int v|\nabla\xi|^2
$$

が成り立つとする。

1. 定常状態で散逸量が0なら、$v>0$ の領域で $\xi$ が定数であることを示せ。
2. その定数を $A$ として $v$ を解け。
3. 質量固定で定数 $C$ が一意になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

定常状態では自由エネルギーも時間変化しないので

$$
0
=
-\int v|\nabla\xi|^2.
$$

被積分関数は非負です。従って

$$
v|\nabla\xi|^2=0
$$

がほとんど至る所で成り立ちます。

$v>0$ の領域では

$$
|\nabla\xi|^2=0,
$$

すなわち

$$
\nabla\xi=0.
$$

したがって各連結成分で

$$
\xi=A
$$

です。

本文で置いた式

$$
\xi
=
\frac m{m-1}v^{m-1}
+
\frac\beta2|y|^2
$$

を代入すると

$$
\frac m{m-1}v^{m-1}
=
A-\frac\beta2|y|^2.
$$

従って

$$
v^{m-1}
=
\frac{m-1}{m}A
-
\frac{(m-1)\beta}{2m}|y|^2.
$$

$$
C=\frac{m-1}{m}A,
\qquad
k=\frac{(m-1)\beta}{2m}
$$

と置いて

$$
\boxed{
v(y)=(C-k|y|^2)_+^{1/(m-1)}
}.
$$

NPDE5 でこの profile の質量は

$$
M
=
A_{d,m}
C^{\frac1{m-1}+\frac d2}
$$

と計算しました。指数は正なので右辺は $C>0$ に関して狭義単調増加です。従って質量 $M$ を固定すると $C$ は一意です。
<!-- solution-end -->

## Level C

<a id="ex-npde7-c01"></a>
### NPDE7-C01 長時間漸近を「compactness + identification」に分解する
- Level: C

$m>1$ の多孔質媒質方程式を質量保存型 similarity variables へ移し、再正規化解を $v(\tau)$ とする。質量は $M>0$ とする。

次を仮定する。

- $\{v(\tau):\tau\ge0\}$ は $L^1$ で相対 compact。
- 任意の $\tau_n\to\infty$ から取った $L^1$ 極限は自由エネルギー散逸量0の定常状態。

1. 質量 $M$ の散逸量0定常状態が一意な Barenblatt profile $B_M$ であることを本文の結果から説明せよ。
2. $v(\tau)$ が $B_M$ へ収束しないと仮定し、$\varepsilon_0>0$ と時刻列 $\tau_n$ を取れ。
3. 相対 compactness から部分列極限 $w$ を取り、$w=B_M$ を示せ。
4. 矛盾を完成し、
   $$
   \|v(\tau)-B_M\|_1\to0
   $$
   を示せ。
5. 元の変数へ戻して、$u(t,x)$ の長時間 profile を書け。

<!-- solution-start -->
#### 詳細解答

本文の零散逸定常状態の分類から、散逸量0の非負定常状態は

$$
(C-k|y|^2)_+^{1/(m-1)}
$$

という Barenblatt 型です。

さらに質量は $C$ の狭義単調増加関数なので、所与の質量 $M>0$ に対して $C$ は一意です。従って質量 $M$ の散逸量0定常状態は一意な $B_M$ です。

次に $v(\tau)$ が $B_M$ へ $L^1$ 収束しないと仮定します。するとある $\varepsilon_0>0$ と $\tau_n\to\infty$ が存在して

$$
\|v(\tau_n)-B_M\|_1
\ge
\varepsilon_0
$$

となります。

相対 compactness から部分列 $\tau_{n_k}$ と $w\in L^1$ が存在して

$$
v(\tau_{n_k})\to w
\qquad
\text{in }L^1.
$$

$L^1$ 収束は積分を保つので

$$
\int w
=
\lim_{k\to\infty}\int v(\tau_{n_k})
=
M.
$$

第二の仮定から $w$ は散逸量0の定常状態です。したがって一意性により

$$
w=B_M.
$$

よって

$$
\|v(\tau_{n_k})-B_M\|_1
\to0.
$$

しかし元の列は全て

$$
\|v(\tau_{n_k})-B_M\|_1
\ge
\varepsilon_0
$$

を満たしていたので矛盾です。

従って

$$
\boxed{
\|v(\tau)-B_M\|_1\to0
}.
$$

最後に

$$
v(\tau,y)
=
t^\alpha u(t,t^\beta y),
\qquad
\alpha=d\beta,
\qquad
\beta=\frac1{d(m-1)+2}
$$

でした。

したがって

$$
u(t,x)
=
t^{-\alpha}
v(\log t,xt^{-\beta})
$$

であり、長時間では

$$
\boxed{
u(t,x)
\sim
t^{-\alpha}
B_M(xt^{-\beta})
}
$$

となります。

この問題で重要なのは、自己相似解の式を知っているだけでは一般解の収束は出ず、

$$
\text{相対 compactness}
+
\text{極限点の定常性}
+
\text{定常状態の一意性}
$$

をつなぐ必要があることです。
<!-- solution-end -->
