# PML2-07 自動微分で必要な導関数を本当に計算できるか

## 1. 残差を計算するには「何を」微分するのか

前講で[強形式残差](../PML2-06/index.md#def-pml2-06-strong-residual)を導入した。零Dirichlet条件のPoisson問題

$$
-u''(x)=2\quad(0<x<1),\qquad u(0)=u(1)=0
$$

の候補 $v_\theta(x)$ に対しては $r_\theta(x)=-\partial_x^2v_\theta(x)-2$ である。[collocation点と経験物理損失](../PML2-06/index.md#def-pml2-06-collocation)により

$$
L_{\mathrm{phys}}(\theta)
=\frac1N\sum_{i=1}^N r_\theta(x_i)^2
$$

を計算するには **入力 $x$ に関する二階微分**が要る。一方でパラメータ $\theta$ を更新するには **$\theta$ に関する損失の勾配**が要る。前者と後者は微分する変数も順序も違う。

ネットワークを複数の滑らかな関数の合成として書き、各操作に連鎖律を繰り返すのが**自動微分（automatic differentiation; AD）**の基本である。ここでは[計算グラフ](../../ML/ML2-14/index.md#def-ml2-14-computational-graph)と[自動微分の前向き・逆モード](../../ML/ML2-14/index.md#def-ml2-14-ad-modes)を踏まえて、二階入力微分へ拡張する。ADは刻み幅を決めて近傍の関数値を引き算する数値微分ではなく、実行する計算手順を微分する方法である。ただし実際の値は浮動小数点演算で計算され、数値誤差がなくなるという主張ではない。

この講では、二階微分を実際に作る規則、滑らかさを失う活性化関数で起こる問題、さらに損失のパラメータ勾配を順に確認する。

## 2. 値・一階・二階を一緒に運ぶ

まずスカラー入力 $x$ を固定した点 $x_0$ で追跡する。中間変数 $z=z(x)$ について値、第一導関数、第二導関数を三つ組として持つと、複合関数の二階微分まで局所的な演算で伝播できる。

<a id="def-pml2-07-second-jet"></a>

<!-- formal-statement-start -->
> **定義（二階の微分三つ組）**  
> 開区間 $I\subset\mathbb R$、点 $x_0\in I$、関数 $z\in C^2(I)$ を与える。$x$ を微分変数として、点 $x_0$ における二階の微分三つ組を

$$
J_2z(x_0)=\bigl(z(x_0),z'(x_0),z''(x_0)\bigr)
$$

> とする。初期入力 $z(x)=x$ は $(x_0,1,0)$、定数 $z(x)=c$ は $(c,0,0)$ を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-07-second-jet -->
**定義の確認**。 $x_0=1/4$、$z(x)=2x-1$ とすると、$z(1/4)=-1/2$、$z'=2$、$z''=0$ なので

$$
J_2z(1/4)=(-1/2,2,0).
$$

入力を $(1/4,1,0)$、定数 $-1$ を $(-1,0,0)$ として計算した結果と一致する。入力の種別・微分変数・評価点を決めてはじめて三つ組が定まる。
<!-- definition-example-end -->

掛け算や一変数関数の合成を、微分三つ組に対して実行する規則を定めよう。$u,v\in C^2(I)$ に対して和は成分ごとの和、積は以下の規則で作る。

$$
J_2(uv)=
\bigl(uv,\ u'v+uv',\ u''v+2u'v'+uv''\bigr).
$$

また $\phi\in C^2(U)$、$z(I)\subset U$ なら合成について

$$
J_2(\phi\circ z)=
\bigl(\phi(z),\ \phi'(z)z',\
\phi''(z)(z')^2+\phi'(z)z''\bigr).
$$

いずれも右辺の値・導関数は $x_0$ で評価する。例えば $z(x)=2x-1$、$\phi(z)=z^2$、$x_0=1/4$ のとき、合成の最後の成分は

$$
2(2)^2+2(-1/2)\cdot0=8,
$$

実際に $(2x-1)^2$ を二回微分した値 $8$ と一致する。

## 3. なぜこの規則で正しい二階微分が出るか

<a id="thm-pml2-07-jet-correctness"></a>

<!-- formal-statement-start -->
> **定理（滑らかな計算グラフの二階ADの正しさ）**  
> 開区間 $I$ の入力 $x$ と定数から、有限回の加算・乗算・一変数の合成でスカラー出力 $v(x)$ を作る非循環の計算グラフを考える。各一変数関数 $\phi$ は、実際に入力される値を含む開区間で $C^2$ であり、各中間変数は $I$ 上に定義されるとする。このとき入力を $(x_0,1,0)$、定数を $(c,0,0)$ で初期化し、前節の規則をすべての節点へ順に適用すると、出力は $J_2v(x_0)$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

計算グラフの入口から各節点を調べる。入口では定義どおりである。和・積・合成の節点に入る前の三つ組が正しければ、積の微分法則・連鎖律によって、その節点の三つ組も正しい。この繰り返しで出力まで到達する。

<!-- proof-start -->
### 証明

非循環かつ有限個の節点なので、各節点の入力が先に現れる順番に並べられる。入力節点は $z(x)=x$ であり $z'=1,z''=0$。定数節点は $z(x)=c$ であり $z'=z''=0$。従って初期三つ組は正しい。

順番の前までの節点で正しいと仮定する。和の節点 $w=u+v$ について、微分の線形性から $w'=u'+v'$、$w''=u''+v''$ である。積の節点 $w=uv$ では、一階の積の法則をもう一度微分して

$$
w'=u'v+uv',
$$

$$
w''=(u''v+u'v')+(u'v'+uv'')
=u''v+2u'v'+uv''.
$$

合成節点 $w=\phi(z)$ では、$z(I)$ が $\phi$ の $C^2$ 定義域に入るので連鎖律を使える。まず $w'=\phi'(z)z'$。これを積として微分すると

$$
w''=\bigl(\phi''(z)z'\bigr)z'+\phi'(z)z''
=\phi''(z)(z')^2+\phi'(z)z''.
$$

したがって、正しい三つ組から次の正しい三つ組が得られる。有限個の節点について帰納し、出力で主張が成り立つ。
<!-- proof-end -->

これは「各演算を正しく微分する」という意味での保証である。非滑らかな演算が途中にあれば、この定理の仮定を満たさない。

## 4. 滑らかな活性化関数ならどうなるか

活性化関数は、線形結合の後に適用する非線形関数である。例えば $z=bx+c$ を作り、$\tanh z$ を適用して $a$ 倍し、$d$ を足す一ユニットの模型を考える。$\tanh$ は実数全体で何回でも微分でき、二階微分を含むPoisson残差を計算できる。

<a id="prop-pml2-07-tanh-derivatives"></a>

<!-- formal-statement-start -->
> **命題（tanhユニットの入力微分）**  
> $a,b,c,d\in\mathbb R$、$x\in\mathbb R$、$z=bx+c$ として $v(x)=a\tanh(z)+d$ と置くと、$v\in C^2(\mathbb R)$ であり

$$
v'(x)=ab\bigl(1-\tanh^2 z\bigr),
$$

$$
v''(x)=-2ab^2\tanh z\bigl(1-\tanh^2 z\bigr).
$$

> 特に $v''$ は入力 $x$ の二階導関数である。
<!-- formal-statement-end -->

### 証明の見取り図

$\tanh$ の微分 $1-\tanh^2$ を使い、$z'=b$ を一階と二階でそれぞれ連鎖律に代入する。

<!-- proof-start -->
### 証明

$t=\tanh z$ と書くと、$dt/dz=1-t^2$ である。また $z'=b$、$z''=0$。一階微分は

$$
v'(x)=a\frac{dt}{dz}\frac{dz}{dx}
=ab(1-t^2).
$$

さらに $t'=(1-t^2)b$ なので、$v'$ を微分して

$$
v''(x)=ab(-2t)t'
=ab(-2t)(1-t^2)b
=-2ab^2t(1-t^2).
$$

$\tanh$ と一次関数の合成は $C^2$ であるため、全実数で正当である。
<!-- proof-end -->

<!-- definition-example-start: prop-pml2-07-tanh-derivatives -->
**具体例**。 $a=1,b=2,c=-1,d=0$ なら $z=2x-1$ であり、$x=1/2$ では $\tanh z=0$ だから $v''(1/2)=0$。一方 $x=1/4$ では $z=-1/2$ で

$$
v''(1/4)=8\tanh(1/2)\bigl(1-\tanh^2(1/2)\bigr)>0.
$$

同じネットワークでも評価位置で二階導関数は変化する。点ごとの強形式残差を計算するのは、この値をPDE演算子へ代入する操作である。
<!-- definition-example-end -->

滑らかな別の選択肢は **softplus** $\phi(z)=\log(1+e^z)$ である。$\sigma(z)=1/(1+e^{-z})$ と置くと

$$
\phi'(z)=\sigma(z),\qquad
\phi''(z)=\sigma(z)(1-\sigma(z)).
$$

$\sigma(z)\in(0,1)$ だから $\phi''(z)>0$。実装では大きな $z$ に対して指数が桁あふれしない式を使うことも重要だが、これは微分可能性とは別の数値上の問題である。

## 5. ReLUは二階残差にそのまま使えるか

ReLU関数は $\rho(z)=\max(0,z)$ である。$z<0$ では定数、$z>0$ では一次関数であるため、二階導関数はその両領域で零となる。しかし $z=0$ では一階導関数が存在しない。

<a id="prop-pml2-07-relu-obstruction"></a>

<!-- formal-statement-start -->
> **命題（ReLUによる強形式二階残差の障害）**  
> $c\in(0,1)$、$v(x)=\max(0,x-c)$ とする。折れ点以外の二階導関数は零である。

$
v''(x)=0\qquad (x\in(0,1),\ x\ne c).
$

> ところが $x=c$ では一階微分が存在しない。特に

$
v\notin C^2([0,1]).
$

> 従ってPoisson方程式 $-u''=2$ の[強形式残差](../PML2-06/index.md#def-pml2-06-strong-residual)を全内部点で定義する候補にはならない。
<!-- formal-statement-end -->

### 証明の見取り図

折れ点の左右で傾きが異なることを確かめる。折れ点の外でADが返す二階値が零でも、折れ点で必要な微分の存在は回復しない。

<!-- proof-start -->
### 証明

$x<c$ なら $v(x)=0$、$x>c$ なら $v(x)=x-c$。各開区間で二階導関数は零である。しかし $v(c)=0$ に対する左右から計算した微分係数は

$$
\lim_{h\uparrow0}\frac{v(c+h)-v(c)}h=0,
\qquad
\lim_{h\downarrow0}\frac{v(c+h)-v(c)}h=1.
$$

よって $v'(c)$ は存在しない。したがって $C^2$ には属さない。
<!-- proof-end -->

さらに、真解 $q(x)=x(1-x)$ に摂動を足して

$$
w_\varepsilon(x)=q(x)+\varepsilon\max(0,x-c),
\qquad \varepsilon\ne0
$$

とすると、$c$ を含まない任意の有限個のcollocation点では $w_\varepsilon''=q''=-2$ だから残差は零になる。それでも $c$ の折れ点で古典解の条件は破れる。**有限点でADの二階値が得られること**と**全域の強形式残差が定義できること**を分けなければならない。一般のReLUネットワークは区分的アフィンで、折れ点以外では入力の二階導関数が零になる。二階微分を必要とする強形式PINNではこの構造に注意する。弱形式や別の表現の可能性は、ここでの反例と別の問題である。

## 6. 自動微分と有限差分の違いを数式で比べる

[有限差分残差](../PML2-04/index.md#def-pml2-04-residual)は、近傍の関数値を組み合わせて微分を近似する。一方ADは、計算グラフの関数自体を規則に従って微分する。両者を $v(x)=\sin(\pi x)$ で比較しよう。

<a id="prop-pml2-07-difference-sine"></a>

<!-- formal-statement-start -->
> **命題（正弦関数の中心差分二階微分）**  
> $0<h<1/2$、$h\le x\le1-h$、$v(x)=\sin(\pi x)$ とする。中心差分二階微分を

$$
D_h^2v(x)=\frac{v(x+h)-2v(x)+v(x-h)}{h^2}
$$

> とすると

$$
D_h^2v(x)=-\frac{4\sin^2(\pi h/2)}{h^2}\sin(\pi x).
$$

> 真の二階導関数は $v''(x)=-\pi^2\sin(\pi x)$ であり、$h\to0$ で両者の差は $O(h^2)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

正弦の加法定理で $v(x+h)+v(x-h)$ を一つにまとめ、$1-\cos t=2\sin^2(t/2)$ を使う。最後に $\sin y=y+O(y^3)$ を代入する。

<!-- proof-start -->
### 証明

加法定理から

$$
v(x+h)+v(x-h)=2\sin(\pi x)\cos(\pi h).
$$

したがって

$$
D_h^2v(x)=\frac{2(\cos(\pi h)-1)}{h^2}\sin(\pi x)
=-\frac{4\sin^2(\pi h/2)}{h^2}\sin(\pi x).
$$

$y=\pi h/2$ と置くと $\sin y/y=1-y^2/6+O(y^4)$ であるから

$$
\frac{4\sin^2(\pi h/2)}{h^2}
=\pi^2\left(\frac{\sin y}{y}\right)^2
=\pi^2\bigl(1-\pi^2h^2/12+O(h^4)\bigr).
$$

よって

$$
D_h^2v(x)-v''(x)
=\frac{\pi^4h^2}{12}\sin(\pi x)+O(h^4)
$$

である（$x\in[0,1]$ 上で一様）。
<!-- proof-end -->

差分では $h$ を小さくすると打切り誤差は下がるが、浮動小数点では三つの近い値の減算と $h^2$ による除算で丸め誤差が目立つ場合がある。ADはここでの $h$ に相当するステップ幅を選ばないが、計算途中の浮動小数点誤差や実装した演算の滑らかさの問題は残る。 中心差分には $x-h,x+h$ が定義域内に入る条件も必要であり、上の命題で $h\le x\le1-h$ としたのはそのためである。

## 7. 入力微分と学習勾配を混同しない

二階残差が評価できても、学習のためにはパラメータ勾配が必要である。$x$ に関する二階微分を計算したグラフを、今度は $\theta$ に関して微分する。このとき $\partial_{\theta_j}\partial_x^2v_\theta$ の順序を入れ替えるには十分な滑らかさが要る。

<a id="thm-pml2-07-loss-gradient"></a>

<!-- formal-statement-start -->
> **定理（滑らかなPINN物理損失のパラメータ勾配）**  
> $\Theta\subset\mathbb R^p$ を開集合とし、$v:(0,1)\times\Theta\to\mathbb R$ はすべての変数に関して $C^3$、$f:(0,1)\to\mathbb R$ は固定された関数とする。固定した内部点 $x_1,\ldots,x_N$（$N\ge1$）について

$$
r_\theta(x)=-\partial_x^2v(x,\theta)-f(x),\qquad
L(\theta)=\frac1N\sum_{i=1}^N r_\theta(x_i)^2
$$

> とすれば、$L$ は $\Theta$ 上微分可能で、各 $j=1,\ldots,p$ に対して

$$
\partial_{\theta_j}L(\theta)
=\frac2N\sum_{i=1}^N
r_\theta(x_i)\bigl[-\partial_{\theta_j}\partial_x^2v(x_i,\theta)\bigr].
$$

> $C^3$ の仮定の下では混合微分を交換して $\partial_{\theta_j}\partial_x^2v=\partial_x^2\partial_{\theta_j}v$ と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

点 $x_i$ は固定しておき、各残差の二乗を有限個足す。二乗の連鎖律と、三階まで連続な混合偏導関数の交換を使う。

<!-- proof-start -->
### 証明

$v$ の $C^3$ 性から $r_\theta(x_i)$ は $\theta$ について $C^1$ である。$f$ は $\theta$ に依存しないので

$$
\partial_{\theta_j}r_\theta(x_i)
=-\partial_{\theta_j}\partial_x^2v(x_i,\theta).
$$

有限和を項別に微分し、$s\mapsto s^2$ の微分 $2s$ を適用すると

$$
\partial_{\theta_j}L
=\frac1N\sum_i 2r_\theta(x_i)
\partial_{\theta_j}r_\theta(x_i)
=\frac2N\sum_i r_\theta(x_i)
\bigl[-\partial_{\theta_j}\partial_x^2v(x_i,\theta)\bigr].
$$

混合偏導関数の交換は $C^3$ 性によって正当化される。以上が主張である。
<!-- proof-end -->

**計算できるからといって学習が成功するわけではない。** 例えば滑らかな二パラメータ模型

$$
v_{\alpha,\beta}(x)=\alpha\beta x(1-x)
$$

を取ると、$x(1-x)$ の二階微分は $-2$ なので、任意の選点で

$$
r_{\alpha,\beta}=2(\alpha\beta-1),\qquad
L=4(\alpha\beta-1)^2.
$$

[上の勾配公式](#thm-pml2-07-loss-gradient)を使うには $\partial_\alpha r=2\beta$、$\partial_\beta r=2\alpha$ を求める。よって

$$
\nabla L=8(\alpha\beta-1)(\beta,\alpha).
$$

$(\alpha,\beta)=(0,0)$ では $L=4$ なのに $\nabla L=(0,0)$。一方 $(1,1)$ なら $L=0$。ADが正しい勾配を返していても、パラメータ化のために停留点で学習が止まる例である。

## 8. PDEの微分・離散化・学習の三つを整理する

| 対象 | 微分する変数 | 出力と前提 |
|---|---|---|
| 強形式Poisson残差 $-\partial_x^2v_\theta-f$ | 入力 $x$ を二回 | $v_\theta$ の $x$ に関する二階微分が内部点で存在 |
| ADによるパラメータ勾配 $\nabla_\theta L$ | パラメータ $\theta$ | 損失の計算グラフが $\theta$ で微分可能 |
| 中心差分 $D_h^2v_\theta$ | 近傍の関数値を差分 | 刻み幅 $h$ に依存する近似 |
| 格子ソルバを通じた勾配 | 離散ソルバのパラメータ | 離散化した写像の微分であり、連続PDEの感度と直ちに同一ではない |

本講の核心は、**滑らかな計算グラフなら二階ADを連鎖律で作れるが、必要な導関数の存在・演算子の定義・残差の意味は別途確認する**ことである。次講では、この残差に初期・境界条件を強く組み込む方法と、損失の罰則項にする方法を比較する。

## 9. 演習と詳細解答

<a id="ex-pml2-07-a01"></a>

### PML2-07-A01：二階三つ組の初期値
- Level: A

$x_0=1/3$ とし $z(x)=3x-2$、$w(x)=z(x)^2$ の二階三つ組をそれぞれ計算せよ。合成の二階規則を用いること。

<!-- solution-start -->
**詳細解答。** $z(1/3)=-1$、$z'=3$、$z''=0$ なので $J_2z=(-1,3,0)$。[二階の合成規則](#thm-pml2-07-jet-correctness)に $\phi(s)=s^2$、$\phi'(s)=2s$、$\phi''(s)=2$ を代入する。

$$
J_2w=\bigl((-1)^2,\ 2(-1)\cdot3,\ 2\cdot3^2+2(-1)\cdot0\bigr)
=(1,-6,18).
$$

実際に $w=(3x-2)^2$ を二回微分しても $w''=18$。
<!-- solution-end -->

<a id="ex-pml2-07-a02"></a>

### PML2-07-A02：積の二階項
- Level: A

$u(x)=x^2$、$v(x)=1-x$ とする。積の三つ組の規則から $(uv)''(1/2)$ を計算し、$2u'v'$ の項を省けないことを確かめよ。

<!-- solution-start -->
**詳細解答。** $x=1/2$ で $u=1/4,u'=1,u''=2$、$v=1/2,v'=-1,v''=0$。従って

$$
(uv)''=u''v+2u'v'+uv''
=2(1/2)+2(1)(-1)+(1/4)0=-1.
$$

中項を省略すれば誤って $1$ となる。多項式を展開して $uv=x^2-x^3$ とすれば $(uv)''=2-6x$ で、$x=1/2$ において $-1$。
<!-- solution-end -->

<a id="ex-pml2-07-a03"></a>

### PML2-07-A03：tanhの二階微分の符号
- Level: A

$v(x)=\tanh(2x-1)$ の $v''(1/2)$ と $v''(1/4)$ を求め、符号の違いを説明せよ。

<!-- solution-start -->
**詳細解答。** [tanhユニットの命題](#prop-pml2-07-tanh-derivatives)に $a=1,b=2,c=-1,d=0$ を入れる。

$$
v''(x)=-8\tanh(2x-1)\bigl(1-\tanh^2(2x-1)\bigr).
$$

$x=1/2$ では $\tanh(0)=0$ だから $v''=0$。$x=1/4$ では $\tanh(-1/2)=-\tanh(1/2)$ であるから

$$
v''(1/4)=8\tanh(1/2)(1-\tanh^2(1/2))>0.
$$

$t=\tanh(1/2)\in(0,1)$ なので両因子は正である。
<!-- solution-end -->

<a id="ex-pml2-07-a04"></a>

### PML2-07-A04：ReLUの微分が壊れる点
- Level: A

$v(x)=\max(0,x-1/3)$ とする。$x=1/4,1/2$ で $v''$ を求め、$x=1/3$ で古典的な二階微分が存在するか判定せよ。

<!-- solution-start -->
**詳細解答。** $x<1/3$ では $v=0$、$x>1/3$ では $v=x-1/3$。どちらもその近傍でアフィンなので $v''(1/4)=v''(1/2)=0$。折れ点での左微分係数は $0$、右微分係数は $1$。一階微分が存在しないので、二階微分も存在しない。選点で値が出ても $v\notin C^2$ である。
<!-- solution-end -->

<a id="ex-pml2-07-a05"></a>

### PML2-07-A05：softplusの二階値
- Level: A

$\phi(z)=\log(1+e^z)$ に対し $\phi'(0)$ と $\phi''(0)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\phi'(z)=e^z/(1+e^z)=\sigma(z)$。分数の微分を実行して

$$
\phi''(z)=\frac{e^z(1+e^z)-e^{2z}}{(1+e^z)^2}
=\frac{e^z}{(1+e^z)^2}.
$$

$e^0=1$ なので $\phi'(0)=1/2$、$\phi''(0)=1/4$。従って二階導関数は零でない。
<!-- solution-end -->

<a id="ex-pml2-07-b01"></a>

### PML2-07-B01：二つの選点で多項式残差を識別する
- Level: B

$q(x)=x(1-x)$、$v_{a,b}(x)=a q(x)+bq(x)^2$ を $-u''=2$、零Dirichlet条件の候補とする。$x_1=1/4,x_2=1/2$ の二点での強形式残差を手で求め、両方零なら $(a,b)=(1,0)$ であることを示せ。

<!-- solution-start -->
**詳細解答。** $q'=1-2x$、$q''=-2$。積の二階微分から

$$
(q^2)''=2(q')^2+2qq''
=2(1-2x)^2-4x(1-x)
=2-12x+12x^2.
$$

従って $r_{a,b}(x)=-v''-2=2(a-1)-b(2-12x+12x^2)$。$x_1=1/4$ では括弧内が $-1/4$、$x_2=1/2$ では $-1$ なので

$$
r_{a,b}(1/4)=2(a-1)+b/4,\qquad
r_{a,b}(1/2)=2(a-1)+b.
$$

両式の差をとると $3b/4=0$、従って $b=0$。第1式から $a=1$。また $q(0)=q(1)=0$ だから、全候補が零境界を満たす。
<!-- solution-end -->

<a id="ex-pml2-07-b02"></a>

### PML2-07-B02：差分には刻み幅のずれがある
- Level: B

$v(x)=\sin(\pi x)$、$x=1/2$ とし、$h=1/4$ の中心差分二階微分と、ADが計算する真の二階微分を比較せよ。差の符号を求めよ。

<!-- solution-start -->
**詳細解答。** $v(1/2)=1$、$v(1/4)=v(3/4)=\sqrt2/2$。従って

$$
D_{1/4}^2v(1/2)
=\frac{\sqrt2/2-2+\sqrt2/2}{(1/4)^2}
=16(\sqrt2-2).
$$

直接二回微分した値は $v''(1/2)=-\pi^2$。差は $16(\sqrt2-2)+\pi^2$ であり正である。[正弦の差分公式](#prop-pml2-07-difference-sine)では $4\sin^2(\pi h/2)/h^2<\pi^2$ が $0<h<1/2$ で成り立つ。これは $\sin y<y$（$y>0$）によるので、差分値の負の絶対値は真の値より小さい。
<!-- solution-end -->

<a id="ex-pml2-07-b03"></a>

### PML2-07-B03：正しい勾配でも学習は止まる
- Level: B

$v_{\alpha,\beta}(x)=\alpha\beta x(1-x)$ について強形式物理損失 $L$ と $\nabla L$ を求めよ。$(0,0)$ が大域的最小点でない停留点であることを、二つのパラメータ経路で確認せよ。

<!-- solution-start -->
**詳細解答。** $r=2(\alpha\beta-1)$ なので $L=4(\alpha\beta-1)^2$。パラメータで微分すると

$$
\partial_\alpha L=8\beta(\alpha\beta-1),\qquad
\partial_\beta L=8\alpha(\alpha\beta-1).
$$

原点では勾配は零だが $L(0,0)=4$ である。$\alpha=\beta=t$ の経路では

$$
L(t,t)=4(t^2-1)^2=4-8t^2+4t^4<4
$$

が $0<|t|<1$ で成り立つ。一方 $\alpha=t,\beta=-t$ では $L(t,-t)=4(t^2+1)^2>4$（$t\ne0$）。原点は最小点でなく、勾配が零というだけで目的値が最小とはいえない。
<!-- solution-end -->

<a id="ex-pml2-07-b04"></a>

### PML2-07-B04：熱方程式とパラメータ微分
- Level: B

$\kappa>0$、$v_\lambda(t,x)=e^{-\lambda t}\sin(\pi x)$、$\lambda>0$ とする。熱方程式の残差 $r_\lambda=\partial_tv_\lambda-\kappa\partial_{xx}v_\lambda$ と $\partial_\lambda r_\lambda$ を導出し、$t=0,x=1/2$ で残差二乗の $\lambda$ 微分を計算せよ。

<!-- solution-start -->
**詳細解答。** 時間と空間の微分を別々に行う。

$$
\partial_tv_\lambda=-\lambda e^{-\lambda t}\sin(\pi x),\quad
\partial_{xx}v_\lambda=-\pi^2e^{-\lambda t}\sin(\pi x).
$$

よって

$$
r_\lambda(t,x)=(\kappa\pi^2-\lambda)e^{-\lambda t}\sin(\pi x).
$$

$\lambda$ で積の法則を使うと

$$
\partial_\lambda r_\lambda
=\bigl[-1-t(\kappa\pi^2-\lambda)\bigr]e^{-\lambda t}\sin(\pi x).
$$

$(t,x)=(0,1/2)$ では $r_\lambda=\kappa\pi^2-\lambda$、$\partial_\lambda r_\lambda=-1$。従って

$$
\frac{d}{d\lambda}r_\lambda(0,1/2)^2
=2r_\lambda\partial_\lambda r_\lambda
=2(\lambda-\kappa\pi^2).
$$

これは入力の二階微分を先に計算し、続けてパラメータで微分した結果である。
<!-- solution-end -->

<a id="ex-pml2-07-c01"></a>

### PML2-07-C01：二階AD・差分・損失勾配を統合する
- Level: C

$-u''=2$、$u(0)=u(1)=0$ の問題に、$q(x)=x(1-x)$、$v_{a,b}=a q+bq^2$ を用いる。選点は $x_1=1/4,x_2=1/2$ とし、$L=(r(x_1)^2+r(x_2)^2)/2$ とする。

1. 二階の積の法則により各残差を求め、$L$ の唯一の零点を示せ。
2. $\nabla_{a,b}L$ を導き、$(a,b)=(1,1)$ での $L$ と勾配を求めよ。
3. $0<h<1/4$ の中心差分 $D_h^2v$ を用いたとき、真の二階微分との誤差を求めよ。全候補は境界条件を満たすが、残差には何が変わるか説明せよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $q'=1-2x$、$q''=-2$ として、積の法則を二回適用する。

$$
(q^2)''=2(q')^2+2qq''
=2-12x+12x^2.
$$

従って $r(x)=2(a-1)-b(2-12x+12x^2)$ であり、

$$
r_1=2(a-1)+b/4,\qquad
r_2=2(a-1)+b.
$$

$L$ は非負の平方和であり $(a,b)=(1,0)$ で零となる。逆に零なら $r_1=r_2=0$。差を取ると $3b/4=0$、続いて $a=1$。零損失の係数は一意である。

**（2）** $r_1,r_2$ の導関数をそれぞれ

$$
\partial_a r_1=\partial_a r_2=2,\quad
\partial_b r_1=1/4,\quad
\partial_b r_2=1
$$

と求める。[物理損失勾配の定理](#thm-pml2-07-loss-gradient)を有限和に適用して

$$
\partial_a L=2(r_1+r_2),\qquad
\partial_b L=\frac14r_1+r_2.
$$

$a=b=1$ では $r_1=1/4,r_2=1$ なので

$$
L(1,1)=\frac{1/16+1}{2}=\frac{17}{32},
\qquad
\nabla L(1,1)=\left(\frac52,\frac{17}{16}\right).
$$

**（3）** $q=x-x^2$ は二次式なので $D_h^2q=q''=-2$ が厳密に成立する。一方

$$
q^2=x^2-2x^3+x^4.
$$

中心差分では $D_h^2x^2=2$、$D_h^2x^3=6x$、$D_h^2x^4=12x^2+2h^2$ である。例えば最後は $(x+h)^4+(x-h)^4-2x^4=12x^2h^2+2h^4$ を $h^2$ で割って得られる。よって

$$
D_h^2v_{a,b}(x)
=v_{a,b}''(x)+2bh^2.
$$

したがって差分で計算する残差は

$$
r^{\mathrm{FD}}_{a,b}(x)=-D_h^2v_{a,b}(x)-2
=r_{a,b}(x)-2bh^2.
$$

これは $b\ne0$ なら刻み幅依存の差である。すべての候補で $q(0)=q(1)=0$ だから境界条件自体は成立するが、強形式PDEの残差を差分残差へ置き換えると別の量を評価する。$h\to0$ で誤差 $2bh^2$ は零に近づく。
<!-- solution-end -->
