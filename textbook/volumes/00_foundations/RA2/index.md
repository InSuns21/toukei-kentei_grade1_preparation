# RA2 標準実解析 II：極限・連続・一様連続

既存の位相・連続写像の章を土台に、実数上の $\varepsilon$–$\delta$ 論法、中間値、一様連続を一本につなぎます。

---

## 1. 関数の極限

<a id="def-ra2-limit"></a>
<!-- formal-statement-start -->
> **定義（関数の極限）**  
> $\lim_{x\to a}f(x)=L$ とは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、
$$
0<|x-a|<\delta\quad\Longrightarrow\quad |f(x)-L|<\varepsilon
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

極限の定義には $f(a)$ 自体は入りません。$f(a)=L$ まで要求したものが点 $a$ での連続性です。

<!-- definition-example-start: def-ra2-limit -->
**定義の確認**：$f(x)=3x+2$ では $L=3a+2$ とすると
$$
|f(x)-L|=3|x-a|.
$$
任意の $\varepsilon>0$ に対して $\delta=\varepsilon/3$ と取れば、$0<|x-a|<\delta$ から
$$
|f(x)-L|=3|x-a|<3\delta=\varepsilon
$$
が従います。したがって定義から $\lim_{x\to a}f(x)=3a+2$ です。
<!-- definition-example-end -->

<a id="thm-ra2-sequential"></a>
<!-- formal-statement-start -->
> **定理（関数極限の点列判定）**  
> $\lim_{x\to a}f(x)=L$ であることと、$x_n\ne a$, $x_n\to a$ を満たすすべての点列に対して $f(x_n)\to L$ となることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\lim_{x\to a}f(x)=L$ とします。$x_n\ne a$, $x_n\to a$ を満たす任意の点列を取ります。任意の $\varepsilon>0$ を固定します。仮定を定義どおり読み替えると、ある $\delta>0$ が存在し、
$$
0<|x-a|<\delta\Longrightarrow |f(x)-L|<\varepsilon
$$
です。$x_n\to a$ なので、ある $N$ が存在して $n\ge N$ なら $|x_n-a|<\delta$。さらに $x_n\ne a$ だから
$$
0<|x_n-a|<\delta,
$$
したがって $|f(x_n)-L|<\varepsilon$ です。よって $f(x_n)\to L$。

逆を示します。$\lim_{x\to a}f(x)=L$ でないと仮定します。極限の定義の否定を丁寧に書くと、ある $\varepsilon_0>0$ が存在して、どんな $\delta>0$ を選んでも
$$
0<|x-a|<\delta,
\qquad |f(x)-L|\ge\varepsilon_0
$$
を満たす点 $x$ が存在します。そこで $\delta=1/n$ としてそのような点を一つずつ $x_n$ と取れば
$$
0<|x_n-a|<\frac1n,
$$
なので $x_n\ne a$ かつ $x_n\to a$ です。しかし $|f(x_n)-L|\ge\varepsilon_0$ がすべての $n$ で成り立つので $f(x_n)$ は $L$ に収束しません。これは仮定に反します。$\square$
<!-- proof-end -->

極限が存在しないことを示すときは、異なる像の極限を持つ二つの点列を作れば十分です。もし極限が存在するなら、点列判定によりどちらの像も同じ極限へ行かなければならないからです。

---

## 2. 中間値定理

<a id="thm-ra2-ivt"></a>
<!-- formal-statement-start -->
> **定理（中間値定理）**  
> $f:[a,b]\to\mathbb R$ が連続で、$f(a)<c<f(b)$ とする。このとき、ある $x\in(a,b)$ が存在して $f(x)=c$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
A=\{x\in[a,b]:f(x)\le c\}
$$
と置きます。$f(a)<c$ なので $a\in A$、したがって $A$ は空ではありません。また $A\subset[a,b]$ なので上に有界です。[実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub)から
$$
s=\sup A
$$
が存在します。

まず $s\in(a,b)$ であることを確認します。$f(a)<c$ と $f$ の $a$ での連続性から、$a$ の少し右でも $f<c$ となるので $A$ には $a$ より大きい点があり、したがって $s>a$ です。一方 $f(b)>c$ と $b$ での連続性から、$b$ の少し左でも $f>c$ となるので、その近傍には $A$ の点がなく、したがって $s<b$ です。

あとは $f(s)=c$ を示します。

もし $f(s)<c$ なら、$f$ の $s$ での連続性からある $\eta>0$ が存在して、$|x-s|<\eta$ なら $f(x)<c$ となります。$s<b$ なので $0<h<\min(\eta,b-s)$ を取れば $s+h\in A$ です。しかし $s+h>s$ なので、$s$ が $A$ の上界であることに反します。

逆に $f(s)>c$ なら、連続性からある $\eta>0$ が存在して、$|x-s|<\eta$ なら $f(x)>c$ となります。ところが $s=\sup A$ なので、任意の $\eta>0$ に対して $s-\eta<x\le s$ を満たす $x\in A$ が存在しなければなりません。実際、そのような点がなければ $s-\eta$ が $A$ の上界になり、$s$ の最小性に反します。そこで $\eta$ を十分小さくして得られる $x\in A$ は $|x-s|<\eta$ なので $f(x)>c$ ですが、$x\in A$ だから $f(x)\le c$。矛盾です。

したがって $f(s)<c$ でも $f(s)>c$ でもなく、$f(s)=c$ です。$\square$
<!-- proof-end -->

ここでも実数の上限性質が存在証明の地下にあります。

---

## 3. 一様連続

<a id="def-ra2-uniform"></a>
<!-- formal-statement-start -->
> **定義（一様連続）**  
> $f:E\to\mathbb R$ が一様連続であるとは、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、任意の $x,y\in E$ について
$$
|x-y|<\delta\quad\Longrightarrow\quad |f(x)-f(y)|<\varepsilon
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

通常の連続では $\delta$ を点ごとに変えてよいのに対し、一様連続では領域全体で同じ $\delta$ を使います。

<a id="def-ra2-lipschitz"></a>
<!-- formal-statement-start -->
> **定義（Lipschitz連続）**  
> ある $K\ge0$ が存在して、すべての $x,y\in E$ に対して
$$
|f(x)-f(y)|\le K|x-y|
$$
> が成り立つとき、$f$ はLipschitz連続であるという。
<!-- formal-statement-end -->

$K>0$ なら任意の $\varepsilon>0$ に対して $\delta=\varepsilon/K$ と取れば
$$
|x-y|<\delta
\Longrightarrow
|f(x)-f(y)|\le K|x-y|<K\delta=\varepsilon.
$$
$K=0$ なら $f$ は定数関数なので任意の $\delta>0$ でよいです。したがってLipschitz連続なら一様連続です。

<!-- definition-example-start: def-ra2-uniform, def-ra2-lipschitz -->
**定義の確認**：$f(x)=2x$ を $\mathbb R$ 上で考えると
$$
|f(x)-f(y)|=2|x-y|.
$$
したがって $K=2$ でLipschitz連続です。また任意の $\varepsilon>0$ に対して $\delta=\varepsilon/2$ と取れば、点 $x,y$ の位置に依存せず $|x-y|<\delta$ から
$$
|f(x)-f(y)|=2|x-y|<\varepsilon
$$
が従うので、一様連続の定義も満たします。
<!-- definition-example-end -->

---

## 4. コンパクト集合上では連続性が一様になる

<a id="thm-ra2-heine-cantor"></a>
<!-- formal-statement-start -->
> **定理（Heine–Cantorの定理）**  
> コンパクト集合 $K\subset\mathbb R$ 上の連続関数 $f:K\to\mathbb R$ は一様連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一様連続でないと仮定します。一様連続性の否定から、ある $\varepsilon_0>0$ が存在して、任意の $n$ に対し $x_n,y_n\in K$ を
$$
|x_n-y_n|<\frac1n,
\qquad
|f(x_n)-f(y_n)|\ge\varepsilon_0
$$
となるように取れます。

[コンパクト性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md) より $(x_n)$ は収束部分列 $x_{n_k}\to x\in K$ を持ちます。さらに
$$
|y_{n_k}-x|
\le |y_{n_k}-x_{n_k}|+|x_{n_k}-x|
\to0,
$$
なので $y_{n_k}\to x$ です。

$f$ は $x$ で連続だから
$$
f(x_{n_k})\to f(x),
\qquad
f(y_{n_k})\to f(x).
$$
よって
$$
|f(x_{n_k})-f(y_{n_k})|\to0,
$$
ですが、構成上これは常に $\varepsilon_0$ 以上です。矛盾。したがって $f$ は一様連続です。$\square$
<!-- proof-end -->

$1/x$ は $(0,1)$ 上で連続ですが一様連続ではありません。定義域のコンパクト性は飾りではありません。

---

## 5. 演習

### Level A

<a id="ex-ra2-a01"></a>
#### RA2-A01 epsilon-delta
- Level: A

$f(x)=3x+2$ が任意の $a\in\mathbb R$ で連続であることを示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を取ります。
$$
|f(x)-f(a)|=|3x+2-(3a+2)|=3|x-a|.
$$
そこで $\delta=\varepsilon/3$ と取れば、$|x-a|<\delta$ から
$$
|f(x)-f(a)|<3\delta=\varepsilon
$$
が従います。よって $f$ は $a$ で連続です。$a$ は任意だったので実数全体で連続です。
<!-- solution-end -->

<a id="ex-ra2-a02"></a>
#### RA2-A02 Lipschitz
- Level: A

$f(x)=x^2$ が $[0,2]$ 上でLipschitz連続であることを示せ。

<!-- solution-start -->
**解答**：$x,y\in[0,2]$ なら
$$
|x^2-y^2|=|x-y||x+y|.
$$
ここで $0\le x+y\le4$ なので
$$
|x^2-y^2|\le4|x-y|.
$$
したがってLipschitz定数 $K=4$ を取れます。
<!-- solution-end -->

<a id="ex-ra2-a03"></a>
#### RA2-A03 零点の存在
- Level: A

$x^3+x-1=0$ が $(0,1)$ に少なくとも一つ解を持つことを示せ。

<!-- solution-start -->
**解答**：$f(x)=x^3+x-1$ と置きます。多項式なので $[0,1]$ で連続であり、
$$
f(0)=-1<0<1=f(1).
$$
したがって [中間値定理](#thm-ra2-ivt) を $c=0$ に対して適用すると、ある $x\in(0,1)$ が存在して $f(x)=0$ となります。
<!-- solution-end -->

<a id="ex-ra2-a04"></a>
#### RA2-A04 非一様連続
- Level: A

$f(x)=1/x$ が $(0,1)$ 上で一様連続でないことを示せ。

<!-- solution-start -->
**解答**：
$$
x_n=\frac1n,
\qquad y_n=\frac1{n+1}
$$
と置きます。すると
$$
|x_n-y_n|=\frac1{n(n+1)}\to0
$$
ですが
$$
|f(x_n)-f(y_n)|=|n-(n+1)|=1.
$$
もし $f$ が一様連続なら、$\varepsilon=1/2$ に対してある $\delta>0$ が存在するはずです。十分大きい $n$ では $|x_n-y_n|<\delta$ なので一様連続性から像の差は $1/2$ 未満でなければなりません。しかし実際には常に1です。矛盾。よって一様連続ではありません。
<!-- solution-end -->

### Level B

<a id="ex-ra2-b01"></a>
#### RA2-B01 Cauchy列を保つ
- Level: B

$f:E\to\mathbb R$ が一様連続なら、$E$ 内のCauchy列 $(x_n)$ に対して $(f(x_n))$ もCauchy列であることを示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を取ります。一様連続性から、すべての $x,y\in E$ に共通して使える $\delta>0$ が存在し、
$$
|x-y|<\delta\Longrightarrow |f(x)-f(y)|<\varepsilon
$$
です。$(x_n)$ はCauchy列なので、ある $N$ が存在して $m,n\ge N$ なら $|x_m-x_n|<\delta$。したがって
$$
|f(x_m)-f(x_n)|<\varepsilon.
$$
よって $(f(x_n))$ もCauchy列です。
<!-- solution-end -->

<a id="ex-ra2-b02"></a>
#### RA2-B02 $x^2$ は実数全体で一様連続か
- Level: B

$f(x)=x^2$ が $\mathbb R$ 上では一様連続でないことを示せ。

<!-- solution-start -->
**解答**：
$$
x_n=n,
\qquad y_n=n+\frac1n
$$
と置くと
$$
|x_n-y_n|=\frac1n\to0
$$
ですが
$$
|y_n^2-x_n^2|
=\left(n+\frac1n\right)^2-n^2
=2+\frac1{n^2}\to2.
$$
特に十分大きい $n$ でも像の差は1以上です。A04と同様に $\varepsilon=1$ を固定すれば、一様連続性に反します。
<!-- solution-end -->

<a id="ex-ra2-b03"></a>
#### RA2-B03 零点の一意性
- Level: B

$f(x)=x^3+x-1$ の零点が一意であることを示せ。

<!-- solution-start -->
**解答**：$x<y$ とします。すると
$$
f(y)-f(x)
=(y^3-x^3)+(y-x)
=(y-x)(x^2+xy+y^2+1).
$$
第1因子は正です。また
$$
x^2+xy+y^2
=\left(x+\frac y2\right)^2+\frac34y^2\ge0
$$
なので第2因子も正です。したがって $f(y)>f(x)$、つまり $f$ は狭義単調増加です。ゆえに零点は高々一つです。A03で零点の存在を示しているので、零点はちょうど一つです。
<!-- solution-end -->

### Level C

<a id="ex-ra2-c01"></a>
#### RA2-C01 Heine–Cantorを有限被覆で証明する
- Level: C

各点の連続性から得られる近傍を有限部分被覆に落とすことで、コンパクト集合上の連続関数が一様連続になることを示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ を固定します。各 $x\in K$ について $f$ は $x$ で連続だから、ある $r_x>0$ が存在して
$$
|u-x|<r_x
\Longrightarrow
|f(u)-f(x)|<\frac\varepsilon2
$$
となります。

開集合族
$$
\{B(x,r_x/2):x\in K\}
$$
は $K$ を覆います。$K$ はコンパクトなので有限個
$$
B(x_1,r_1/2),\dots,B(x_m,r_m/2)
$$
で $K$ を覆えます。ここで
$$
\delta=\min_{1\le i\le m}\frac{r_i}{2}>0
$$
と置きます。

$u,v\in K$ が $|u-v|<\delta$ を満たすとします。有限被覆から、ある $i$ が存在して $u\in B(x_i,r_i/2)$ です。すると
$$
|u-x_i|<\frac{r_i}{2}<r_i,
$$
また
$$
|v-x_i|
\le |v-u|+|u-x_i|
<\delta+\frac{r_i}{2}
\le r_i.
$$
よって連続性から
$$
|f(u)-f(x_i)|<\frac\varepsilon2,
\qquad
|f(v)-f(x_i)|<\frac\varepsilon2.
$$
三角不等式により
$$
|f(u)-f(v)|<\varepsilon.
$$
この $\delta$ は $u,v$ に依存しないので、$f$ は一様連続です。
<!-- solution-end -->

---

## 6. 次に進む

**次：[RA3 微分法の理論](../RA3/index.md)**