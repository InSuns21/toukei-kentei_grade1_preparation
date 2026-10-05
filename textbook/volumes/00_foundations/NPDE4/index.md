# NPDE4 尺度変換・熱核平滑化・自己相似

PDE3 では熱方程式

$$
u_t=\Delta u
$$

を、Fourier 変換と熱核

$$
G_t(x)
=
\frac{1}{(4\pi t)^{d/2}}
\exp\left(
-\frac{|x|^2}{4t}
\right)
$$

によって解く考え方を学びました。

しかし非線形 PDE へ進むと、「解が存在するか」だけでは足りません。

- 小さい空間尺度を拡大すると、方程式はどう見えるのか。
- どのノルムが小スケール集中を検出できるのか。
- 拡散は時間とともにどの程度ノルムを小さくするのか。
- 長時間後の解の形を、止まった profile として見るにはどう変数を取り直せばよいのか。

本章では、この四つを一つの流れにします。

~~~text
方程式を拡大・縮小する
  ↓
各項が同じ倍率になる scaling を求める
  ↓
ノルムがその scaling でどう変わるか計算する
  ↓
critical / subcritical / supercritical を判定する
  ↓
熱核の幅と高さを scaling から読む
  ↓
畳み込み評価で Lp-Lq smoothing を得る
  ↓
Sobolev + 補間から減衰に使う不等式を作る
  ↓
energy estimate と組み合わせて decay を導く
  ↓
x/sqrt(t) と log t へ変数を取り直す
  ↓
self-similar profile を rescaled dynamics の定常解として読む
~~~

前提は [PDE3 の熱方程式と熱核](../PDE3/index.md#def-pde3-heat-kernel) と、[GPDE5 の $\mathbb R^d$ 上の Sobolev 不等式](../GPDE5/index.md#thm-gpde5-sobolev-rd)です。

本章では特に断らない限り $d\ge1$、$t>0$、$x\in\mathbb R^d$ とします。

---

## 1. 放物型 scaling はなぜ $t$ と $x$ を別の速さで変えるのか

熱方程式では時間微分は一階、空間微分は二階です。

そこで

$$
t\mapsto \lambda^a t,
\qquad
x\mapsto \lambda x
$$

と変えたとき、時間微分と Laplacian が同じ倍率で変わるように $a$ を決めます。

$u$ から

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^a t,\lambda x)
$$

を作ると、[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
\partial_tu_\lambda(t,x)
=
\lambda^{\alpha+a}
(\partial_tu)(\lambda^a t,\lambda x),
$$

一方で一階空間微分は $\lambda$ を一つ拾うので

$$
\Delta u_\lambda(t,x)
=
\lambda^{\alpha+2}
(\Delta u)(\lambda^a t,\lambda x).
$$

熱方程式の二項が同じ倍率を持つには

$$
\alpha+a=\alpha+2,
$$

従って

$$
a=2
$$

でなければなりません。

この $t\mapsto\lambda^2t$ と $x\mapsto\lambda x$ の組が、放物型方程式で何度も現れる基本の尺度です。

<a id="def-npde4-parabolic-scaling"></a>
<!-- formal-statement-start -->
> **定義（放物型尺度変換）**  
> $\alpha\in\mathbb R$ と $\lambda>0$ に対し、関数 $u(t,x)$ から

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

> を作る変換を、本章では **放物型尺度変換** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde4-parabolic-scaling -->
**定義の確認**：熱方程式

$u_t=\Delta u$ を満たす $u$ に対して

$$
\partial_tu_\lambda
=
\lambda^{\alpha+2}
u_t(\lambda^2t,\lambda x),
$$

$$
\Delta u_\lambda
=
\lambda^{\alpha+2}
\Delta u(\lambda^2t,\lambda x).
$$

従って $u_\lambda$ も熱方程式を満たします。線形斉次方程式なので、熱方程式だけを見れば $\alpha$ は任意です。
<!-- definition-example-end -->

ここで重要なのは、空間と時間の倍率 $\lambda$ と $\lambda^2$ は方程式が固定しますが、熱方程式単独では振幅指数 $\alpha$ までは固定しないことです。

非線形項が入ると、この自由度は消えることがあります。例えば

$$
u_t=\Delta u+|u|^{m-1}u,
\qquad
m>1
$$

を同じ変換で不変にしたいとします。

非線形項は

$$
|u_\lambda|^{m-1}u_\lambda
=
\lambda^{\alpha m}
|u|^{m-1}u
$$

と変わります。時間微分と Laplacian の倍率は $\lambda^{\alpha+2}$ なので

$$
\alpha m=\alpha+2.
$$

従って

$$
\alpha
=
\frac{2}{m-1}
$$

に固定されます。

この「方程式自身が振幅指数まで決める」現象が、後で臨界性を読むときの基準になります。

---

## 2. ノルムの scaling を一行ずつ計算する

固定時刻で

$$
f_\lambda(x)
=
\lambda^\alpha f(\lambda x)
$$

とします。

$1\le p<\infty$ なら

$$
\|f_\lambda\|_{L^p}^p
=
\int_{\mathbb R^d}
\lambda^{\alpha p}
|f(\lambda x)|^p\,dx.
$$

変数変換

$$
y=\lambda x,
\qquad
dx=\lambda^{-d}dy
$$

を使うと

$$
\|f_\lambda\|_{L^p}^p
=
\lambda^{\alpha p-d}
\|f\|_{L^p}^p.
$$

従って

$$
\boxed{
\|f_\lambda\|_{L^p}
=
\lambda^{\alpha-d/p}
\|f\|_{L^p}
}
$$

です。

$p=\infty$ なら

$$
\|f_\lambda\|_{L^\infty}
=
\lambda^\alpha
\|f\|_{L^\infty}.
$$

同じ式を $d/\infty=0$ と読めば統一できます。

方程式の scaling が決まったあと、どのノルムが拡大で増えるか、変わらないか、減るかを見るために次の区別を使います。

<a id="def-npde4-scaling-criticality"></a>
<!-- formal-statement-start -->
> **定義（尺度指数による三分類）**  
> 方程式の尺度変換 $u\mapsto u_\lambda$ に対し、あるノルム $X$ が

$$
\|u_\lambda(0)\|_X
=
\lambda^\sigma
\|u(0)\|_X
$$

> と変わるとする。このとき
>
> - $\sigma>0$ なら $X$ を **劣臨界**
> - $\sigma=0$ なら $X$ を **臨界**
> - $\sigma<0$ なら $X$ を **超臨界**
>
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde4-scaling-criticality -->
**定義の確認**：質量を保つ熱 scaling

熱方程式では $\alpha$ は任意ですが、質量

$$
\int_{\mathbb R^d}u(t,x)\,dx
$$

を変えない scaling を選ぶなら

$$
\alpha=d
$$

です。

実際

$$
\|f_\lambda\|_{L^1}
=
\lambda^{d-d}\|f\|_{L^1}
=
\|f\|_{L^1}.
$$

従ってこの正規化では $L^1$ が臨界です。

一方 $p>1$ では

$$
d-\frac d p
=
d\left(1-\frac1p\right)>0
$$

なので $L^p$ は劣臨界です。
<!-- definition-example-end -->

なぜ $\sigma<0$ を超臨界と見るのかも確認しておきます。

$\lambda\to\infty$ は、元の解をより小さい空間尺度へ集中させて観察する操作です。もしそのときノルムが

$$
\|u_\lambda\|_X
=
\lambda^\sigma\|u\|_X
\to0
$$

となるなら、そのノルムは強い小スケール集中を小さい量として見てしまいます。

つまり超臨界ノルムだけを制御しても、集中を排除できない可能性があります。Navier--Stokes で scaling が重要だった理由と同じです。

---

## 3. 多次元熱核は scaling だけで形の大半が読める

PDE3 では一次元熱核を学びました。$d$ 次元では各座標の一次元核を掛け合わせれば

$$
G_t(x)
=
\frac{1}{(4\pi t)^{d/2}}
\exp\left(
-\frac{|x|^2}{4t}
\right)
$$

となります。

ここで

$$
\Phi(y)
=
\frac{1}{(4\pi)^{d/2}}
e^{-|y|^2/4}
$$

と置けば

$$
G_t(x)
=
t^{-d/2}
\Phi\left(
\frac{x}{\sqrt t}
\right).
$$

高さは $t^{-d/2}$、幅は $\sqrt t$ です。

この二つは独立ではありません。質量1を保つには

$$
\text{高さ}
\times
\text{幅}^d
\sim
t^{-d/2}
(\sqrt t)^d
=
1
$$

である必要があります。

<a id="prop-npde4-heat-kernel-lr"></a>
<!-- formal-statement-start -->
> **命題（熱核の Lr ノルム）**  
> $1\le r\le\infty$ とする。$d$ 次元熱核

$$
G_t(x)
=
(4\pi t)^{-d/2}
e^{-|x|^2/(4t)}
$$

> は

$$
\|G_t\|_{L^r(\mathbb R^d)}
=
C_{d,r}
t^{-\frac d2(1-\frac1r)}
$$

> を満たす。ここで $C_{d,r}>0$ は $d,r$ のみに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

$G_t(x)=t^{-d/2}\Phi(x/\sqrt t)$ をそのまま $L^r$ ノルムへ入れます。空間変数の変換で $\sqrt t$ が $d$ 個現れます。

<!-- proof-start -->
### 証明

まず $1\le r<\infty$ とします。

$$
\|G_t\|_r^r
=
\int_{\mathbb R^d}
t^{-dr/2}
\left|
\Phi\left(
\frac{x}{\sqrt t}
\right)
\right|^r
dx.
$$

ここで

$$
y=\frac{x}{\sqrt t},
\qquad
dx=t^{d/2}dy
$$

と置くと

$$
\|G_t\|_r^r
=
t^{-dr/2+d/2}
\|\Phi\|_r^r.
$$

従って

$$
\|G_t\|_r
=
\|\Phi\|_r
t^{-d/2+d/(2r)}
=
C_{d,r}
t^{-\frac d2(1-\frac1r)}.
$$

$r=\infty$ では Gaussian の最大値は $x=0$ で取られるので

$$
\|G_t\|_\infty
=
(4\pi t)^{-d/2},
$$

これも同じ指数です。
<!-- proof-end -->

この指数が、そのまま熱方程式の時間減衰指数になります。

---

## 4. 畳み込みでノルムを移す

熱方程式の解は

$$
u(t)=G_t*u_0
$$

と書けます。

従って「$G_t$ のノルムがどれだけ小さくなるか」を「$u(t)$ のノルムがどれだけ小さくなるか」へ移す道具が必要です。

<a id="thm-npde4-young-convolution"></a>
<!-- formal-statement-start -->
> **定理（Young の畳み込み不等式）**  
> $1\le p,r,q\le\infty$ が

$$
1+\frac1q
=
\frac1p+\frac1r
$$

> を満たすとする。$f\in L^p(\mathbb R^d)$、$g\in L^r(\mathbb R^d)$ なら、畳み込み $f*g$ は $L^q$ に属し、

$$
\|f*g\|_{L^q}
\le
\|f\|_{L^p}
\|g\|_{L^r}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$q=1$ は $p=r=1$ なので [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-01) だけで確認できます。$1<q<\infty$ では、畳み込み積分の被積分関数を三つの因子へ分けて [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を使います。そのあと $x$ でも積分し、Tonelli の定理で順序を交換します。$q=\infty$ は通常の Hölder の不等式だけで閉じます。

<!-- proof-start -->
### 証明

まず $q=1$ とします。条件式から $p=r=1$ です。Tonelli の定理と $z=x-y$ の変数変換から

$$
\|f*g\|_1
\le
\int\int
|f(y)|
|g(x-y)|
dy\,dx
=
\|f\|_1
\|g\|_1.
$$

次に $1<q<\infty$ とします。関係式から $p\le q$、$r\le q$ です。

固定した $x$ に対し

$$
|f*g(x)|
\le
\int_{\mathbb R^d}
|f(y)|
|g(x-y)|
dy.
$$

被積分関数を

$$
|f(y)|^{p/q}
|g(x-y)|^{r/q}
\cdot
|f(y)|^{1-p/q}
\cdot
|g(x-y)|^{1-r/q}
$$

と分けます。

三つの積分指数の逆数を

$$
\frac1q,
\qquad
\frac1p-\frac1q,
\qquad
\frac1r-\frac1q
$$

と取ります。第二または第三の値が0なら、対応する指数を $\infty$ と解釈します。その和は

$$
\frac1p+\frac1r-\frac1q
=
1
$$

です。

従って

$$
|f*g(x)|
\le
\left(
\int
|f(y)|^p
|g(x-y)|^rdy
\right)^{1/q}
\|f\|_p^{1-p/q}
\|g\|_r^{1-r/q}.
$$

$q$ 乗して

$$
|f*g(x)|^q
\le
\|f\|_p^{q-p}
\|g\|_r^{q-r}
\int
|f(y)|^p
|g(x-y)|^rdy.
$$

$x$ について積分すると

$$
\|f*g\|_q^q
\le
\|f\|_p^{q-p}
\|g\|_r^{q-r}
\int_{\mathbb R^d}
\int_{\mathbb R^d}
|f(y)|^p
|g(x-y)|^r
dy\,dx.
$$

非負関数なので [Tonelli の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-01)で積分順序を交換できます。

固定した $y$ に対し $z=x-y$ と変数変換すると

$$
\int_{\mathbb R^d}
|g(x-y)|^r\,dx
=
\|g\|_r^r.
$$

従って

$$
\|f*g\|_q^q
\le
\|f\|_p^{q-p}
\|g\|_r^{q-r}
\|f\|_p^p
\|g\|_r^r
=
\|f\|_p^q
\|g\|_r^q.
$$

$q$ 乗根を取れば結論を得ます。

$q=\infty$ では条件は

$$
\frac1p+\frac1r=1
$$

です。固定した $x$ について [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を使うと

$$
|f*g(x)|
\le
\|f\|_p
\|g(x-\cdot)\|_r
=
\|f\|_p
\|g\|_r.
$$

$x$ の上限を取って結論を得ます。
<!-- proof-end -->

---

## 5. 熱核は $L^p$ の情報を $L^q$ へ平滑化する

[Young の畳み込み不等式](#thm-npde4-young-convolution)へ $g=G_t$ を入れます。

条件

$$
1+\frac1q
=
\frac1p+\frac1r
$$

から

$$
1-\frac1r
=
\frac1p-\frac1q.
$$

熱核の $L^r$ ノルムの指数は

$$
-\frac d2
\left(
1-\frac1r
\right)
=
-\frac d2
\left(
\frac1p-\frac1q
\right).
$$

従って次の評価が得られます。

<a id="thm-npde4-heat-lp-lq-smoothing"></a>
<!-- formal-statement-start -->
> **定理（熱核の Lp--Lq 平滑化評価）**  
> $1\le p\le q\le\infty$ とし、$u_0\in L^p(\mathbb R^d)$ とする。熱方程式の熱核解

$$
u(t)
=
G_t*u_0
$$

> は任意の $t>0$ に対して

$$
\boxed{
\|u(t)\|_{L^q}
\le
C_{d,p,q}
t^{-\frac d2(\frac1p-\frac1q)}
\|u_0\|_{L^p}
}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

必要な $r$ を Young の関係式で決め、[熱核の $L^r$ ノルム](#prop-npde4-heat-kernel-lr)を代入するだけです。指数は暗記せず、毎回

$$
1-\frac1r
=
\frac1p-\frac1q
$$

から戻します。

<!-- proof-start -->
### 証明

$1\le p\le q\le\infty$ なので

$$
0\le
\frac1p-\frac1q
\le1.
$$

従って

$$
\frac1r
=
1-\frac1p+\frac1q
$$

で $1\le r\le\infty$ を定められます。

[Young の畳み込み不等式](#thm-npde4-young-convolution)から

$$
\|u(t)\|_q
=
\|G_t*u_0\|_q
\le
\|G_t\|_r
\|u_0\|_p.
$$

熱核の評価を使うと

$$
\|G_t\|_r
=
C_{d,r}
t^{-\frac d2(1-\frac1r)}.
$$

さらに

$$
1-\frac1r
=
\frac1p-\frac1q
$$

なので

$$
\|u(t)\|_q
\le
C_{d,p,q}
t^{-\frac d2(\frac1p-\frac1q)}
\|u_0\|_p.
$$
<!-- proof-end -->

### 5.1 端点を実際に読む

$p=q$ なら指数は0です。

$$
\|u(t)\|_p
\le
C\|u_0\|_p.
$$

特に $p=q=1$ では熱核の質量が1なので定数は1にできます。

$p=1$、$q=\infty$ なら

$$
\|u(t)\|_\infty
\le
C_d
t^{-d/2}
\|u_0\|_1.
$$

これは「質量を幅 $\sqrt t$ の領域へ広げるので、高さが $t^{-d/2}$ まで下がる」と読むことができます。

$p=1$、$q=2$ なら

$$
\|u(t)\|_2
\le
C_d
t^{-d/4}
\|u_0\|_1.
$$

後でこの同じ指数を、熱核を直接使わずエネルギーの時間変化から再現します。

---

## 6. 微分を一つ取ると $t^{-1/2}$ を一つ失う

熱核を微分すると

$$
\nabla G_t(x)
=
-\frac{x}{2t}
G_t(x).
$$

$y=x/\sqrt t$ と置けば

$$
\nabla G_t(x)
=
t^{-(d+1)/2}
(\nabla\Phi)(y).
$$

従って

$$
\|\nabla G_t\|_r
=
C_{d,r}
t^{-1/2-\frac d2(1-\frac1r)}.
$$

[Young の畳み込み不等式](#thm-npde4-young-convolution)をもう一度使うと

<a id="cor-npde4-gradient-smoothing"></a>
<!-- formal-statement-start -->
> **系（熱核の一階微分平滑化）**  
> $1\le p\le q\le\infty$、$u_0\in L^p(\mathbb R^d)$ とする。このとき

$$
\|\nabla(G_t*u_0)\|_{L^q}
\le
C_{d,p,q}
t^{-1/2-\frac d2(\frac1p-\frac1q)}
\|u_0\|_{L^p}.
$$
<!-- formal-statement-end -->

空間微分一回につき $t^{-1/2}$ が追加されます。

これは放物型 scaling

$$
x\sim \sqrt t
$$

そのものです。空間長さを一回微分すると、その逆長さ

$$
(\sqrt t)^{-1}
=
t^{-1/2}
$$

を拾います。

---

## 7. Sobolev 不等式と補間から減衰評価を作る

熱核表示は非常に強力ですが、非線形 PDE では明示核がないことも多くあります。

その場合でも

1. energy estimate
2. Sobolev 型不等式
3. 補間

を組み合わせると、減衰を取り出せることがあります。

ここでは $d\ge3$ とします。

[GPDE5 の Sobolev 不等式](../GPDE5/index.md#thm-gpde5-sobolev-rd)から

$$
\|f\|_{L^{2^*}}
\le
C_d
\|\nabla f\|_{L^2},
\qquad
2^*
=
\frac{2d}{d-2}.
$$

一方、$L^1$ と $L^{2^*}$ の間で $L^2$ を補間します。

$\theta$ を

$$
\frac12
=
\frac{\theta}{1}
+
\frac{1-\theta}{2^*}
$$

で決めます。

$1/2^*=(d-2)/(2d)$ を代入すると

$$
\frac12
=
\theta
+
(1-\theta)
\frac{d-2}{2d}.
$$

両辺に $2d$ を掛けて

$$
d
=
2d\theta
+
(d-2)(1-\theta).
$$

右辺を展開すると

$$
d
=
d-2
+
(d+2)\theta,
$$

従って

$$
\theta
=
\frac{2}{d+2}.
$$

この補間も指数を飛ばさず確認します。一般に

$$
\frac1p
=
\frac{\theta}{p_0}
+
\frac{1-\theta}{p_1}
$$

なら

$$
|f|^p
=
|f|^{\theta p}
|f|^{(1-\theta)p}.
$$

ここへ [Hölder の不等式](../F0_00D2D_Lp_Holder_Minkowski/index.md#thm-f0-00d2d-01)を、指数

$$
\frac{p_0}{\theta p},
\qquad
\frac{p_1}{(1-\theta)p}
$$

で適用すると

$$
\|f\|_p
\le
\|f\|_{p_0}^{\theta}
\|f\|_{p_1}^{1-\theta}
$$

を得ます。

$p=2$、$p_0=1$、$p_1=2^*$、$\theta=2/(d+2)$ を代入して

$$
\|f\|_2
\le
\|f\|_1^{2/(d+2)}
\|f\|_{2^*}^{d/(d+2)}.
$$

Sobolev 不等式を入れると

$$
\|f\|_2
\le
C_d
\|f\|_1^{2/(d+2)}
\|\nabla f\|_2^{d/(d+2)}.
$$

これを $(d+2)/d$ 乗し、さらに二乗すると

$$
\|f\|_2^{2+4/d}
\le
C_d
\|f\|_1^{4/d}
\|\nabla f\|_2^2.
$$

<a id="thm-npde4-nash"></a>
<!-- formal-statement-start -->
> **定理（Nash 型不等式）**  
> $d\ge3$ とし、$f\in H^1(\mathbb R^d)\cap L^1(\mathbb R^d)$ とする。このとき

$$
\boxed{
\|f\|_{L^2}^{2+4/d}
\le
C_d
\|f\|_{L^1}^{4/d}
\|\nabla f\|_{L^2}^2
}
$$

> が成り立つ。
<!-- formal-statement-end -->

ここで大切なのは完成式よりも作り方です。

~~~text
Sobolev で
  gradient L2 → L^{2*}
へ持ち上げる
  ↓
L1 と L^{2*} の間に L2 を置く
  ↓
指数を解く
  ↓
gradient L2 を右辺へ残す
~~~

この設計は、後続の非線形拡散でも繰り返し使います。

---

## 8. energy estimate と Nash 型不等式だけで decay を出す

十分滑らかで十分減衰する熱方程式の解を考えます。

$$
u_t=\Delta u.
$$

$u$ を掛けて積分すると

$$
\int u u_t\,dx
=
\int u\Delta u\,dx.
$$

左辺は

$$
\int u u_t\,dx
=
\frac12
\frac{d}{dt}
\|u(t)\|_2^2.
$$

右辺は部分積分により

$$
\int u\Delta u\,dx
=
-\|\nabla u(t)\|_2^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|u(t)\|_2^2
+
\|\nabla u(t)\|_2^2
=
0.
$$

ここまでは energy estimate です。

次に [Nash 型不等式](#thm-npde4-nash)を使います。

$$
\|\nabla u(t)\|_2^2
\ge
C_d^{-1}
\frac{
\|u(t)\|_2^{2+4/d}
}{
\|u(t)\|_1^{4/d}
}.
$$

[Young の畳み込み不等式](#thm-npde4-young-convolution)を $p=q=r=1$ で使い、$\|G_t\|_1=1$ を代入すると

$$
\|u(t)\|_1
=
\|G_t*u_0\|_1
\le
\|u_0\|_1.
$$

$M=\|u_0\|_1$、$Y(t)=\|u(t)\|_2^2$ と置くと

$$
Y'(t)
\le
-c_d
M^{-4/d}
Y(t)^{1+2/d}.
$$

この微分不等式を解きます。

$Y>0$ の範囲では

$$
\frac{d}{dt}
Y^{-2/d}
=
-\frac2d
Y^{-1-2/d}
Y'.
$$

上の不等式を代入すると

$$
\frac{d}{dt}
Y^{-2/d}
\ge
c'_d
M^{-4/d}.
$$

$0$ から $t$ まで積分して

$$
Y(t)^{-2/d}
\ge
Y(0)^{-2/d}
+
c'_d
M^{-4/d}t.
$$

第一項を捨てれば

$$
Y(t)
\le
C_d
M^2
t^{-d/2}.
$$

従って

$$
\boxed{
\|u(t)\|_2
\le
C_d
t^{-d/4}
\|u_0\|_1
}
$$

を得ます。

<a id="prop-npde4-energy-nash-decay"></a>
<!-- formal-statement-start -->
> **命題（energy と Nash 型不等式による L1--L2 減衰）**  
> $d\ge3$ とし、$u$ を $\mathbb R^d$ 上の熱方程式の十分滑らかで減衰する解とする。$u_0\in L^1\cap L^2$ なら

$$
\|u(t)\|_{L^2}
\le
C_d
t^{-d/4}
\|u_0\|_{L^1}
$$

> が成り立つ。
<!-- formal-statement-end -->

この指数は [熱核の $L^p$--$L^q$ 平滑化評価](#thm-npde4-heat-lp-lq-smoothing)で $p=1$、$q=2$ とした指数と一致します。

つまり

- 明示核から直接出す方法
- energy + functional inequality から出す方法

の二つが、同じ scaling exponent を返しています。

後者は明示核がない方程式へ持ち運びやすいのが利点です。

---

## 9. 自己相似解の指数は保存される質量から決める

熱核は

$$
G_t(x)
=
t^{-d/2}
\Phi\left(
\frac{x}{\sqrt t}
\right)
$$

という形をしています。

この形を完成式として覚えるのではなく、方程式と保存される質量から再構成します。

一般に

$$
u(t,x)
=
t^{-\beta}
F\left(
\frac{x}{\sqrt t}
\right)
$$

という形を考えます。

熱方程式の放物型 scaling では空間変数は $x/\sqrt t$ でまとめるのが自然です。

質量が一定であることも要求すると

$$
\int_{\mathbb R^d}u(t,x)\,dx
=
t^{-\beta}
\int
F\left(
\frac{x}{\sqrt t}
\right)
dx.
$$

$y=x/\sqrt t$ と置けば

$$
dx=t^{d/2}dy
$$

なので

$$
\int u(t,x)\,dx
=
t^{-\beta+d/2}
\int F(y)\,dy.
$$

これが $t$ に依存しないためには

$$
-\beta+\frac d2=0.
$$

従って

$$
\beta=\frac d2.
$$

つまり質量保存型の自己相似形は

$$
u(t,x)
=
t^{-d/2}
F\left(
\frac{x}{\sqrt t}
\right)
$$

に固定されます。

<a id="def-npde4-self-similar"></a>
<!-- formal-statement-start -->
> **定義（放物型自己相似解）**  
> ある $\alpha\in\mathbb R$ と profile $F$ が存在して

$$
u(t,x)
=
t^{-\alpha/2}
F\left(
\frac{x}{\sqrt t}
\right)
$$

> と表される解を、本章では **放物型自己相似解** とする。特に質量保存を要求する場合は $\alpha=d$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde4-self-similar -->
**定義の確認**：熱核

熱核では

$$
F(y)
=
(4\pi)^{-d/2}
e^{-|y|^2/4}
$$

と置けば

$$
G_t(x)
=
t^{-d/2}
F(x/\sqrt t).
$$

従って $\alpha=d$ の自己相似解です。
<!-- definition-example-end -->

---

## 10. 自己相似解を止めて見るために logarithmic time を入れる

自己相似解は元の $(t,x)$ 座標では時間とともに広がり続けます。

しかし広がる幅 $\sqrt t$ を毎回同じ大きさへ戻し、高さも同時に正規化すれば、自己相似解は時間に依存しない profile として見えるはずです。

そこで

$$
\tau=\log t,
\qquad
y=\frac{x}{\sqrt t}
$$

と置きます。

さらに質量保存型の正規化

$$
v(\tau,y)
=
t^{d/2}
u(t,\sqrt t\,y)
$$

を使います。

逆に書けば

$$
u(t,x)
=
t^{-d/2}
v\left(
\log t,\frac{x}{\sqrt t}
\right).
$$

この式を熱方程式へ代入します。

まず

$$
\tau=\log t
$$

なので

$$
\frac{d\tau}{dt}
=
\frac1t.
$$

また

$$
y=\frac{x}{\sqrt t}
$$

なので、$x$ を固定して

$$
\frac{dy}{dt}
=
-\frac{1}{2t}y.
$$

従って [連鎖律](../RA3/index.md#prop-ra3-chain-rule)から

$$
u_t
=
-\frac d2
t^{-d/2-1}
v
+
t^{-d/2}
\left(
v_\tau\frac1t
+
\nabla_yv\cdot
\left(
-\frac{y}{2t}
\right)
\right).
$$

共通因子をまとめると

$$
u_t
=
t^{-d/2-1}
\left(
v_\tau
-\frac12 y\cdot\nabla v
-\frac d2v
\right).
$$

一方

$$
\nabla_x
=
t^{-1/2}\nabla_y
$$

なので

$$
\Delta_xu
=
t^{-d/2-1}
\Delta_yv.
$$

$u_t=\Delta u$ の共通因子 $t^{-d/2-1}$ を消すと

$$
v_\tau
-\frac12y\cdot\nabla v
-\frac d2v
=
\Delta v.
$$

従って

$$
\boxed{
v_\tau
=
\Delta v
+
\frac12y\cdot\nabla v
+
\frac d2v
}
$$

です。

<a id="def-npde4-similarity-variables"></a>
<!-- formal-statement-start -->
> **定義（similarity variables と rescaled solution）**  
> $t>0$ に対して

$$
\tau=\log t,
\qquad
y=\frac{x}{\sqrt t}
$$

> と置き、質量保存型の rescaled solution を

$$
v(\tau,y)
=
t^{d/2}
u(t,\sqrt t\,y)
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-npde4-similarity-variables -->
**定義の確認**：自己相似解は静止する

もし

$$
u(t,x)
=
t^{-d/2}
F(x/\sqrt t)
$$

なら

$$
v(\tau,y)
=
t^{d/2}
t^{-d/2}
F(y)
=
F(y).
$$

従って $v$ は $\tau$ に依存しません。
<!-- definition-example-end -->

<a id="prop-npde4-rescaled-heat"></a>
<!-- formal-statement-start -->
> **命題（rescaled heat equation）**  
> $u_t=\Delta u$ を満たす十分滑らかな解 $u$ に対し、上の similarity variables で定めた $v$ は

$$
v_\tau
=
\Delta v
+
\frac12y\cdot\nabla v
+
\frac d2v
$$

> を満たす。
<!-- formal-statement-end -->

この変換の意味は、単なる式変形ではありません。

元の変数では「解がどんどん広がる」という運動だったものが、rescaled variables では「ある profile に近づくか」という力学系の問題へ変わります。

---

## 11. Gaussian は rescaled dynamics の定常 profile である

自己相似 profile

$$
\Phi(y)
=
(4\pi)^{-d/2}
e^{-|y|^2/4}
$$

が rescaled equation の定常解になっていることを直接確認します。

まず

$$
\nabla\Phi
=
-\frac y2\Phi.
$$

次に各成分について

$$
\partial_{y_j}^2\Phi
=
-\frac12\Phi
+
\frac{y_j^2}{4}\Phi.
$$

従って

$$
\Delta\Phi
=
-\frac d2\Phi
+
\frac{|y|^2}{4}\Phi.
$$

また

$$
\frac12y\cdot\nabla\Phi
=
-\frac{|y|^2}{4}\Phi.
$$

よって

$$
\Delta\Phi
+
\frac12y\cdot\nabla\Phi
+
\frac d2\Phi
=
0.
$$

<a id="prop-npde4-gaussian-stationary"></a>
<!-- formal-statement-start -->
> **命題（Gaussian profile は rescaled heat equation の定常解）**  
> 

$$
\Phi(y)
=
(4\pi)^{-d/2}
e^{-|y|^2/4}
$$

> とする。このとき

$$
\Delta\Phi
+
\frac12y\cdot\nabla\Phi
+
\frac d2\Phi
=
0.
$$

> 従って $v(\tau,y)=\Phi(y)$ は rescaled heat equation の定常解である。
<!-- formal-statement-end -->

ここまでで、熱核を三つの見方で読めるようになりました。

1. **基本解**：初期の点質量が時間発展したもの。
2. **smoothing kernel**：$L^p$ 情報を $L^q$ 情報へ移し、時間減衰を生むもの。
3. **self-similar profile**：rescaled dynamics では動かない定常形。

NPDE5 では、多孔質媒質方程式の Barenblatt profile がこの三つ目の役割を非線形拡散で担います。

---

## 12. scaling が分かると「何を証明すべきか」が先に見える

本章の道具は、公式を増やすためのものではありません。

### 12.1 scaling は候補指数を先に教える

もし方程式の scaling が

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

なら

$$
\|u_\lambda\|_p
=
\lambda^{\alpha-d/p}
\|u\|_p.
$$

従って臨界指数は

$$
p_c
=
\frac d\alpha
$$

です。

この計算は定理を証明しませんが、

- どのノルムを自然に見るべきか
- どの指数が境界になりそうか
- どの評価が scaling と両立するべきか

を先に教えます。

### 12.2 smoothing は存在後の regularity を数値化する

単に「$t>0$ では滑らかになる」だけではなく、

$$
\|u(t)\|_q
\le
Ct^{-\gamma}\|u_0\|_p
$$

という形で、どの程度速く改善するかまで追えます。

### 12.3 self-similarity は長時間問題を定常問題へ変える

元の変数で

$$
t\to\infty
$$

を追う代わりに、

$$
\tau=\log t\to\infty
$$

で rescaled solution $v(\tau)$ が定常 profile へ近づくかを見ることができます。

NPDE7 の長時間漸近は、この発想を主役にします。

---

# 演習

## Level A

<a id="ex-npde4-a01"></a>
### NPDE4-A01 放物型 scaling を各項へ代入する
- Level: A

熱方程式

$$
u_t=\Delta u
$$

に対して

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^a t,\lambda x)
$$

と置く。

1. $\partial_tu_\lambda$ の scaling factor を求めよ。
2. $\Delta u_\lambda$ の scaling factor を求めよ。
3. 方程式を不変にする $a$ を求めよ。
4. $\alpha$ が熱方程式単独では固定されない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

時間微分では $\lambda^\alpha$ に加え、内部変数 $\lambda^a t$ の微分から $\lambda^a$ が出ます。

従って

$$
\partial_tu_\lambda(t,x)
=
\lambda^{\alpha+a}
u_t(\lambda^at,\lambda x).
$$

空間微分一回につき $\lambda$ が一つ出るので、二階の Laplacian では

$$
\Delta u_\lambda(t,x)
=
\lambda^{\alpha+2}
\Delta u(\lambda^at,\lambda x).
$$

方程式の両辺が同じ倍率になるには

$$
\alpha+a
=
\alpha+2.
$$

従って

$$
a=2.
$$

熱方程式は $u$ に対して線形かつ斉次です。振幅を定数倍しても解のままなので、$\alpha$ は方程式だけからは決まりません。
<!-- solution-end -->

<a id="ex-npde4-a02"></a>
### NPDE4-A02 $L^p$ ノルムの scaling
- Level: A

$$
f_\lambda(x)
=
\lambda^\alpha f(\lambda x)
$$

とする。

1. $1\le p<\infty$ について $\|f_\lambda\|_p$ を求めよ。
2. $p=\infty$ の場合を求めよ。
3. $\alpha=d$ のとき臨界となる $p$ を求めよ。
4. $\alpha=2/(m-1)$ のとき臨界となる $p$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$1\le p<\infty$ では

$$
\|f_\lambda\|_p^p
=
\int
\lambda^{\alpha p}
|f(\lambda x)|^pdx.
$$

$y=\lambda x$ と置けば $dx=\lambda^{-d}dy$ なので

$$
\|f_\lambda\|_p^p
=
\lambda^{\alpha p-d}
\|f\|_p^p.
$$

従って

$$
\boxed{
\|f_\lambda\|_p
=
\lambda^{\alpha-d/p}
\|f\|_p
}.
$$

$p=\infty$ では

$$
\|f_\lambda\|_\infty
=
\lambda^\alpha
\|f\|_\infty.
$$

$\alpha=d$ のとき臨界条件は

$$
d-\frac d p=0.
$$

従って

$$
p=1.
$$

$\alpha=2/(m-1)$ のとき

$$
\frac{2}{m-1}
-
\frac d p
=
0.
$$

従って

$$
\boxed{
p_c
=
\frac{d(m-1)}2
}.
$$
<!-- solution-end -->

<a id="ex-npde4-a03"></a>
### NPDE4-A03 熱核の $L^r$ ノルム
- Level: A

$$
G_t(x)
=
t^{-d/2}
\Phi(x/\sqrt t)
$$

とする。

1. $1\le r<\infty$ について $\|G_t\|_r$ の $t$ 依存性を求めよ。
2. $r=1,2,\infty$ の指数をそれぞれ書け。
3. $r=1$ だけ時間に依存しない理由を質量保存と結び付けよ。

<!-- solution-start -->
#### 詳細解答

$$
\|G_t\|_r^r
=
\int
t^{-dr/2}
|\Phi(x/\sqrt t)|^r
dx.
$$

$y=x/\sqrt t$ と置くと $dx=t^{d/2}dy$ なので

$$
\|G_t\|_r^r
=
t^{-dr/2+d/2}
\|\Phi\|_r^r.
$$

従って

$$
\|G_t\|_r
=
C_{d,r}
t^{-\frac d2(1-\frac1r)}.
$$

$r=1$ では指数は0です。

$r=2$ では

$$
-\frac d2
\left(
1-\frac12
\right)
=
-\frac d4.
$$

$r=\infty$ では

$$
-\frac d2.
$$

$r=1$ では $L^1$ ノルムが

$$
\int G_t(x)dx=1
$$

という全質量そのものです。熱核は時間とともに広がりますが、総質量は変わらないため $L^1$ ノルムだけは一定です。
<!-- solution-end -->

<a id="ex-npde4-a04"></a>
### NPDE4-A04 similarity variables の連鎖律
- Level: A

$$
u(t,x)
=
t^{-d/2}
v\left(
\log t,\frac{x}{\sqrt t}
\right)
$$

とする。

1. $\tau=\log t$ の $t$ 微分を求めよ。
2. $y=x/\sqrt t$ の $t$ 微分を $x$ 固定で求めよ。
3. $u_t$ を $v_\tau$ と $\nabla_yv$ で表せ。
4. $\Delta_xu$ を $\Delta_yv$ で表せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\tau=\log t
$$

なので

$$
\frac{d\tau}{dt}
=
\frac1t.
$$

次に

$$
y=x t^{-1/2}
$$

なので $x$ を固定すると

$$
\frac{dy}{dt}
=
-\frac12
xt^{-3/2}.
$$

$x=\sqrt t\,y$ を代入して

$$
\frac{dy}{dt}
=
-\frac{y}{2t}.
$$

積の微分則と [連鎖律](../RA3/index.md#prop-ra3-chain-rule)を使うと

$$
u_t
=
-\frac d2
t^{-d/2-1}v
+
t^{-d/2}
\left(
v_\tau\frac1t
+
\nabla_yv\cdot
\left(
-\frac{y}{2t}
\right)
\right).
$$

従って

$$
\boxed{
u_t
=
t^{-d/2-1}
\left(
v_\tau
-\frac12y\cdot\nabla_yv
-\frac d2v
\right)
}.
$$

また

$$
\nabla_x
=
t^{-1/2}\nabla_y
$$

なので二回微分して

$$
\boxed{
\Delta_xu
=
t^{-d/2-1}
\Delta_yv
}.
$$
<!-- solution-end -->

<a id="ex-npde4-a05"></a>
### NPDE4-A05 Gaussian profile の定常性
- Level: A

$$
\Phi(y)
=
(4\pi)^{-d/2}
e^{-|y|^2/4}
$$

とする。

1. $\nabla\Phi$ を求めよ。
2. $\Delta\Phi$ を求めよ。
3. 

$$
\Delta\Phi
+
\frac12y\cdot\nabla\Phi
+
\frac d2\Phi
$$

を計算せよ。

<!-- solution-start -->
#### 詳細解答

指数部は $-|y|^2/4$ なので

$$
\partial_{y_j}\Phi
=
-\frac{y_j}{2}\Phi.
$$

従って

$$
\nabla\Phi
=
-\frac y2\Phi.
$$

さらに

$$
\partial_{y_j}^2\Phi
=
-\frac12\Phi
-\frac{y_j}{2}
\partial_{y_j}\Phi.
$$

ここへ

$$
\partial_{y_j}\Phi
=
-\frac{y_j}{2}\Phi
$$

を代入して

$$
\partial_{y_j}^2\Phi
=
-\frac12\Phi
+
\frac{y_j^2}{4}\Phi.
$$

$j=1,\ldots,d$ で和を取ると

$$
\Delta\Phi
=
-\frac d2\Phi
+
\frac{|y|^2}{4}\Phi.
$$

また

$$
\frac12y\cdot\nabla\Phi
=
\frac12y\cdot
\left(
-\frac y2\Phi
\right)
=
-\frac{|y|^2}{4}\Phi.
$$

従って

$$
\Delta\Phi
+
\frac12y\cdot\nabla\Phi
+
\frac d2\Phi
=
0.
$$

よって Gaussian profile は rescaled heat equation の定常解です。
<!-- solution-end -->

## Level B

<a id="ex-npde4-b01"></a>
### NPDE4-B01 [Young の畳み込み不等式](#thm-npde4-young-convolution)から平滑化指数を作る
- Level: B

$1\le p\le q\le\infty$ とする。

1. 

$$
1+\frac1q
=
\frac1p+\frac1r
$$

を満たす $r$ を求めよ。
2. $1-1/r=1/p-1/q$ を確認せよ。
3. [Young の畳み込み不等式](#thm-npde4-young-convolution)と熱核の $L^r$ ノルムから $L^p$--$L^q$ 平滑化評価を導け。
4. $(p,q)=(1,\infty)$、$(1,2)$、$(2,\infty)$ の時間指数を求めよ。

<!-- solution-start -->
#### 詳細解答

Young の関係式を $1/r$ について解くと

$$
\frac1r
=
1-\frac1p+\frac1q.
$$

従って

$$
1-\frac1r
=
\frac1p-\frac1q.
$$

熱核解は

$$
u(t)=G_t*u_0
$$

です。

[Young の畳み込み不等式](#thm-npde4-young-convolution)より

$$
\|u(t)\|_q
\le
\|G_t\|_r
\|u_0\|_p.
$$

熱核のノルムは

$$
\|G_t\|_r
=
C_{d,r}
t^{-\frac d2(1-\frac1r)}
$$

なので

$$
\|u(t)\|_q
\le
C_{d,p,q}
t^{-\frac d2(\frac1p-\frac1q)}
\|u_0\|_p.
$$

$(p,q)=(1,\infty)$ では

$$
-\frac d2
\left(
1-0
\right)
=
-\frac d2.
$$

$(p,q)=(1,2)$ では

$$
-\frac d2
\left(
1-\frac12
\right)
=
-\frac d4.
$$

$(p,q)=(2,\infty)$ では

$$
-\frac d2
\left(
\frac12-0
\right)
=
-\frac d4.
$$
<!-- solution-end -->

<a id="ex-npde4-b02"></a>
### NPDE4-B02 Nash 型不等式の指数を自力で解く
- Level: B

$d\ge3$ とし

$$
2^*=\frac{2d}{d-2}.
$$

1. 

$$
\frac12
=
\theta
+
\frac{1-\theta}{2^*}
$$

を解け。
2. 

$$
\|f\|_2
\le
\|f\|_1^\theta
\|f\|_{2^*}^{1-\theta}
$$

と Sobolev 不等式を組み合わせよ。
3. Nash 型不等式

$$
\|f\|_2^{2+4/d}
\le
C_d
\|f\|_1^{4/d}
\|\nabla f\|_2^2
$$

を導け。

<!-- solution-start -->
#### 詳細解答

$$
\frac1{2^*}
=
\frac{d-2}{2d}
$$

なので

$$
\frac12
=
\theta
+
(1-\theta)
\frac{d-2}{2d}.
$$

両辺に $2d$ を掛けると

$$
d
=
2d\theta
+
(d-2)(1-\theta).
$$

右辺を展開して

$$
d
=
d-2
+
(d+2)\theta.
$$

従って

$$
\theta
=
\frac2{d+2}.
$$

従って補間は

$$
\|f\|_2
\le
\|f\|_1^{2/(d+2)}
\|f\|_{2^*}^{d/(d+2)}.
$$

Sobolev 不等式

$$
\|f\|_{2^*}
\le
C_d\|\nabla f\|_2
$$

を代入すると

$$
\|f\|_2
\le
C_d
\|f\|_1^{2/(d+2)}
\|\nabla f\|_2^{d/(d+2)}.
$$

両辺を $2(d+2)/d$ 乗します。

左辺は

$$
\|f\|_2^{2(d+2)/d}
=
\|f\|_2^{2+4/d}.
$$

右辺の $L^1$ 指数は

$$
\frac{2}{d+2}
\cdot
\frac{2(d+2)}d
=
\frac4d.
$$

勾配の指数は

$$
\frac d{d+2}
\cdot
\frac{2(d+2)}d
=
2.
$$

従って

$$
\|f\|_2^{2+4/d}
\le
C_d
\|f\|_1^{4/d}
\|\nabla f\|_2^2.
$$
<!-- solution-end -->

<a id="ex-npde4-b03"></a>
### NPDE4-B03 energy から $t^{-d/4}$ を出す
- Level: B

$d\ge3$ とする。熱方程式の解が

$$
\frac12
\frac d{dt}
\|u(t)\|_2^2
+
\|\nabla u(t)\|_2^2
=
0
$$

を満たし、さらに

$$
\|u(t)\|_1
\le M
$$

とする。

1. $Y(t)=\|u(t)\|_2^2$ に対し

$$
Y'
\le
-cM^{-4/d}
Y^{1+2/d}
$$

を導け。
2. $Y^{-2/d}$ を微分せよ。
3. $Y(t)\le CM^2t^{-d/2}$ を導け。
4. $L^2$ ノルムの減衰率を求めよ。

<!-- solution-start -->
#### 詳細解答

[Nash 型不等式](#thm-npde4-nash)から

$$
Y^{1+2/d}
=
\|u\|_2^{2+4/d}
\le
C_d
\|u\|_1^{4/d}
\|\nabla u\|_2^2.
$$

$\|u\|_1\le M$ なので

$$
\|\nabla u\|_2^2
\ge
c_d
M^{-4/d}
Y^{1+2/d}.
$$

energy identity から

$$
Y'
=
-2\|\nabla u\|_2^2.
$$

従って

$$
Y'
\le
-c
M^{-4/d}
Y^{1+2/d}.
$$

次に

$$
\frac d{dt}
Y^{-2/d}
=
-\frac2d
Y^{-1-2/d}
Y'.
$$

$Y'$ の上の評価を代入すると

$$
\frac d{dt}
Y^{-2/d}
\ge
c'
M^{-4/d}.
$$

積分して

$$
Y(t)^{-2/d}
\ge
Y(0)^{-2/d}
+
c'M^{-4/d}t.
$$

第一項を落とすと

$$
Y(t)^{-2/d}
\ge
c'M^{-4/d}t.
$$

両辺を $-d/2$ 乗して

$$
Y(t)
\le
C
M^2
t^{-d/2}.
$$

従って

$$
\boxed{
\|u(t)\|_2
\le
C
M
t^{-d/4}
}.
$$
<!-- solution-end -->

<a id="ex-npde4-b04"></a>
### NPDE4-B04 半線形熱方程式の臨界 $L^p$
- Level: B

$$
u_t
=
\Delta u
+
|u|^{m-1}u,
\qquad
m>1
$$

を考える。

1. 

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

を各項へ代入し、$\alpha=2/(m-1)$ を導け。
2. $L^p$ ノルムの scaling exponent を求めよ。
3. 臨界指数 $p_c$ を求めよ。
4. $p<p_c$ と $p>p_c$ のどちらが超臨界か判定せよ。

<!-- solution-start -->
#### 詳細解答

時間微分と Laplacian はともに

$$
\lambda^{\alpha+2}
$$

を因子として持ちます。

一方、反応項は

$$
|u_\lambda|^{m-1}u_\lambda
=
\lambda^{\alpha m}
|u|^{m-1}u.
$$

方程式を不変にするには

$$
\alpha+2
=
\alpha m.
$$

従って

$$
\alpha(m-1)=2,
$$

$$
\boxed{
\alpha
=
\frac2{m-1}
}.
$$

$L^p$ ノルムは

$$
\|u_\lambda(0)\|_p
=
\lambda^{\frac2{m-1}-\frac d p}
\|u(0)\|_p.
$$

従って scaling exponent は

$$
\sigma(p)
=
\frac2{m-1}
-
\frac d p.
$$

臨界条件 $\sigma(p_c)=0$ から

$$
\boxed{
p_c
=
\frac{d(m-1)}2
}.
$$

$p<p_c$ では $d/p>d/p_c=2/(m-1)$ なので

$$
\sigma(p)<0.
$$

従って超臨界です。

$p>p_c$ では $\sigma(p)>0$ なので劣臨界です。
<!-- solution-end -->

## Level C

<a id="ex-npde4-c01"></a>
### NPDE4-C01 scaling・smoothing・rescaling を一つにつなぐ
- Level: C

$\mathbb R^d$ 上の熱方程式

$$
u_t=\Delta u,
\qquad
u(0)=u_0
$$

を考える。$u_0\in L^1(\mathbb R^d)$ とし、質量

$$
M
=
\int_{\mathbb R^d}
u_0(x)\,dx
$$

が有限であるとする。

1. 質量を保つ放物型 scaling の振幅指数が $\alpha=d$ であることを示せ。
2. この scaling で $L^p$ ノルムがどう変わるか求め、$L^1$ が臨界であることを確認せよ。
3. 熱核表示から

$$
\|u(t)\|_\infty
\le
C_dt^{-d/2}\|u_0\|_1
$$

を導け。
4. 

$$
v(\tau,y)
=
t^{d/2}
u(t,\sqrt t\,y),
\qquad
\tau=\log t
$$

と置き、$v$ の方程式を導け。
5. Gaussian profile

$$
\Phi(y)
=
(4\pi)^{-d/2}e^{-|y|^2/4}
$$

がその rescaled equation の定常解であることを示せ。
6. 熱核解 $u(t,x)=M G_t(x)$ に対し、rescaled solution が時間に依存せず $M\Phi(y)$ になることを示せ。
7. 3 と 6 が「長時間では高さが下がる」ことと「rescaled variables では profile が止まる」ことを同時に表している理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 質量保存から振幅指数を決める**

$$
u_\lambda(t,x)
=
\lambda^\alpha
u(\lambda^2t,\lambda x)
$$

とします。

固定時刻で積分すると

$$
\int
u_\lambda(t,x)\,dx
=
\int
\lambda^\alpha
u(\lambda^2t,\lambda x)\,dx.
$$

$y=\lambda x$ と置けば

$$
dx=\lambda^{-d}dy
$$

なので

$$
\int
u_\lambda(t,x)\,dx
=
\lambda^{\alpha-d}
\int
u(\lambda^2t,y)\,dy.
$$

質量を変えないためには

$$
\alpha-d=0.
$$

従って

$$
\boxed{
\alpha=d
}.
$$

**2. $L^p$ scaling**

一般公式から

$$
\|u_\lambda(0)\|_p
=
\lambda^{d-d/p}
\|u_0\|_p.
$$

指数は

$$
d-\frac d p
=
d\left(
1-\frac1p
\right).
$$

$p=1$ では0なので $L^1$ は臨界です。

$p>1$ では正なので劣臨界です。

**3. $L^1$--$L^\infty$ smoothing**

熱核表示は

$$
u(t)=G_t*u_0.
$$

[Young の畳み込み不等式](#thm-npde4-young-convolution)で $(p,q,r)=(1,\infty,\infty)$ を使うと

$$
\|u(t)\|_\infty
\le
\|G_t\|_\infty
\|u_0\|_1.
$$

熱核の最大値は $x=0$ で

$$
\|G_t\|_\infty
=
(4\pi t)^{-d/2}.
$$

従って

$$
\boxed{
\|u(t)\|_\infty
\le
(4\pi)^{-d/2}
t^{-d/2}
\|u_0\|_1
}.
$$

**4. rescaled equation**

元の変数へ戻す式は

$$
u(t,x)
=
t^{-d/2}
v\left(
\log t,\frac{x}{\sqrt t}
\right).
$$

$\tau=\log t$、$y=x/\sqrt t$ とします。

本文の [連鎖律](../RA3/index.md#prop-ra3-chain-rule)の計算から

$$
u_t
=
t^{-d/2-1}
\left(
v_\tau
-\frac12y\cdot\nabla v
-\frac d2v
\right),
$$

$$
\Delta_xu
=
t^{-d/2-1}
\Delta_yv.
$$

従って熱方程式 $u_t=\Delta u$ は

$$
\boxed{
v_\tau
=
\Delta v
+
\frac12y\cdot\nabla v
+
\frac d2v
}
$$

へ変わります。

**5. Gaussian profile**

$$
\nabla\Phi
=
-\frac y2\Phi
$$

であり、

$$
\Delta\Phi
=
-\frac d2\Phi
+
\frac{|y|^2}{4}\Phi.
$$

また

$$
\frac12y\cdot\nabla\Phi
=
-\frac{|y|^2}{4}\Phi.
$$

従って

$$
\Delta\Phi
+
\frac12y\cdot\nabla\Phi
+
\frac d2\Phi
=
0.
$$

よって $\Phi$ は定常解です。

**6. 熱核解の rescaling**

$$
u(t,x)
=
M G_t(x)
=
M
t^{-d/2}
\Phi(x/\sqrt t).
$$

従って

$$
v(\tau,y)
=
t^{d/2}
u(t,\sqrt t\,y).
$$

$x=\sqrt t\,y$ を代入して

$$
v(\tau,y)
=
t^{d/2}
M
t^{-d/2}
\Phi(y)
=
M\Phi(y).
$$

$\tau$ は消えます。

従って

$$
\boxed{
v(\tau,y)
=
M\Phi(y)
}.
$$

**7. 二つの見方の整合性**

元の座標では、熱核の幅は $\sqrt t$ に比例して広がります。質量は一定なので、そのぶん高さは

$$
t^{-d/2}
$$

で下がります。これが $L^\infty$ decay です。

一方 rescaled variables では、空間を

$$
y=\frac{x}{\sqrt t}
$$

で縮め直し、高さを

$$
t^{d/2}
$$

で持ち上げ直します。

したがって「広がる幅」と「下がる高さ」をちょうど相殺し、自己相似な Gaussian profile は静止します。

つまり

- 元の変数：拡散して減衰する
- rescaled variables：形を保つ定常 profile として見える

という二つの表現は、同じ scaling を別の座標で見ているだけです。
<!-- solution-end -->

---

## まとめ

本章で得た中心原理は次の通りです。

1. 放物型方程式では

$$
x\mapsto\lambda x,
\qquad
t\mapsto\lambda^2t
$$

が基本尺度になる。

2. 振幅 scaling が $\lambda^\alpha$ なら

$$
\|u_\lambda\|_p
=
\lambda^{\alpha-d/p}
\|u\|_p
$$

なので、臨界ノルムは指数0から決まる。

3. 熱核は

$$
G_t(x)
=
t^{-d/2}\Phi(x/\sqrt t)
$$

と自己相似で、

$$
\|G_t\|_r
\sim
t^{-\frac d2(1-\frac1r)}.
$$

4. [Young の畳み込み不等式](#thm-npde4-young-convolution)により

$$
\|G_t*u_0\|_q
\lesssim
t^{-\frac d2(\frac1p-\frac1q)}
\|u_0\|_p.
$$

5. 明示核を使わなくても、Sobolev + 補間で Nash 型不等式を作り、energy estimate と組み合わせれば同じ $L^1$--$L^2$ decay を得られる。

6. 

$$
\tau=\log t,
\qquad
y=x/\sqrt t
$$

へ移ると自己相似解は定常 profile になり、長時間漸近を rescaled dynamics の問題として読める。

次の NPDE5 では、この設計を

$$
u_t=\Delta(u^m),
\qquad
m>1
$$

へ移し、線形熱方程式では起こらなかった有限伝播速度と Barenblatt 型自己相似 profile を導きます。
