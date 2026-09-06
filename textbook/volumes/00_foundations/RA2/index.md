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

<a id="thm-ra2-sequential"></a>
<!-- formal-statement-start -->
> **定理（関数極限の点列判定）**  
> $\lim_{x\to a}f(x)=L$ であることと、$x_n\ne a$, $x_n\to a$ を満たすすべての点列に対して $f(x_n)\to L$ となることは同値である。
<!-- formal-statement-end -->

極限が存在しないことを示すときは、異なる像の極限を持つ二つの点列を作れば十分です。

---

## 2. 中間値定理

<a id="thm-ra2-ivt"></a>
<!-- formal-statement-start -->
> **定理（中間値定理）**  
> $f:[a,b]\to\mathbb R$ が連続で、$f(a)<c<f(b)$ とする。このとき、ある $x\in(a,b)$ が存在して $f(x)=c$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=\{x\in[a,b]:f(x)\le c\}$ とし、$s=\sup A$ とします。$f(s)<c$ なら連続性により $s$ の少し右でも $f<c$ となり、$s$ が上限であることに反します。$f(s)>c$ なら $s$ の少し左でも $f>c$ となり、$s$ に任意に近い $A$ の点が存在することに反します。したがって $f(s)=c$。$\square$
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

$K>0$ なら $\delta=\varepsilon/K$ と取れるため、Lipschitz連続なら一様連続です。

---

## 4. コンパクト集合上では連続性が一様になる

<a id="thm-ra2-heine-cantor"></a>
<!-- formal-statement-start -->
> **定理（Heine–Cantorの定理）**  
> コンパクト集合 $K\subset\mathbb R$ 上の連続関数 $f:K\to\mathbb R$ は一様連続である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一様連続でないとすると、ある $\varepsilon_0>0$ と $x_n,y_n\in K$ が存在して
$$
|x_n-y_n|<1/n,\qquad |f(x_n)-f(y_n)|\ge\varepsilon_0
$$
となります。[コンパクト性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md) より $(x_n)$ は収束部分列 $x_{n_k}\to x\in K$ を持ちます。すると $|x_{n_k}-y_{n_k}|\to0$ なので $y_{n_k}\to x$。連続性により両方の像は $f(x)$ に収束し、像の差が $\varepsilon_0$ 以上という条件に反します。$\square$
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
**解答**：$|f(x)-f(a)|=3|x-a|$。$\delta=\varepsilon/3$ と取ればよい。
<!-- solution-end -->

<a id="ex-ra2-a02"></a>
#### RA2-A02 Lipschitz
- Level: A

$f(x)=x^2$ が $[0,2]$ 上でLipschitz連続であることを示せ。

<!-- solution-start -->
**解答**：$|x^2-y^2|=|x-y||x+y|\le4|x-y|$ なので $K=4$ でよい。
<!-- solution-end -->

<a id="ex-ra2-a03"></a>
#### RA2-A03 零点の存在
- Level: A

$x^3+x-1=0$ が $(0,1)$ に少なくとも一つ解を持つことを示せ。

<!-- solution-start -->
**解答**：$f(x)=x^3+x-1$ と置けば $f(0)=-1<0<f(1)=1$。$f$ は連続なので [中間値定理](#thm-ra2-ivt) より零点が存在する。
<!-- solution-end -->

<a id="ex-ra2-a04"></a>
#### RA2-A04 非一様連続
- Level: A

$f(x)=1/x$ が $(0,1)$ 上で一様連続でないことを示せ。

<!-- solution-start -->
**解答**：$x_n=1/n$, $y_n=1/(n+1)$ とすると $|x_n-y_n|\to0$ だが $|f(x_n)-f(y_n)|=1$。入力差を一様に小さくしたとき像差も小さくなるという条件に反する。
<!-- solution-end -->

### Level B

<a id="ex-ra2-b01"></a>
#### RA2-B01 Cauchy列を保つ
- Level: B

$f:E\to\mathbb R$ が一様連続なら、$E$ 内のCauchy列 $(x_n)$ に対して $(f(x_n))$ もCauchy列であることを示せ。

<!-- solution-start -->
**解答**：$\varepsilon>0$ に対し一様連続性から共通の $\delta$ を取る。$x_n$ がCauchyなので十分大きい $m,n$ では $|x_m-x_n|<\delta$、したがって $|f(x_m)-f(x_n)|<\varepsilon$。
<!-- solution-end -->

<a id="ex-ra2-b02"></a>
#### RA2-B02 $x^2$ は実数全体で一様連続か
- Level: B

$f(x)=x^2$ が $\mathbb R$ 上では一様連続でないことを示せ。

<!-- solution-start -->
**解答**：$x_n=n$, $y_n=n+1/n$ とすると $|x_n-y_n|=1/n\to0$ だが
$$
|y_n^2-x_n^2|=2+1/n^2\to2.
$$
よって一様連続ではない。
<!-- solution-end -->

<a id="ex-ra2-b03"></a>
#### RA2-B03 零点の一意性
- Level: B

$f(x)=x^3+x-1$ の零点が一意であることを示せ。

<!-- solution-start -->
**解答**：$x<y$ なら
$$
f(y)-f(x)=(y-x)(x^2+xy+y^2+1)>0.
$$
したがって $f$ は狭義単調増加で、零点は高々一つ。A03で存在も示したので一意。
<!-- solution-end -->

### Level C

<a id="ex-ra2-c01"></a>
#### RA2-C01 Heine–Cantorを有限被覆で証明する
- Level: C

各点の連続性から得られる近傍を有限部分被覆に落とすことで、コンパクト集合上の連続関数が一様連続になることを示せ。

<!-- solution-start -->
**解答**：各 $x\in K$ に対し、$|u-x|<r_x$ なら $|f(u)-f(x)|<\varepsilon/2$ となる $r_x>0$ を取る。$B(x,r_x/2)$ は $K$ を覆うので有限部分被覆 $B(x_i,r_i/2)$ を取れる。有限個の $r_i/2$ の最小値を $\delta>0$ とする。$|u-v|<\delta$ で $u\in B(x_i,r_i/2)$ なら $u,v$ はともに $x_i$ から距離 $<r_i$ に入り、三角不等式から $|f(u)-f(v)|<\varepsilon$。
<!-- solution-end -->

---

## 6. 次に進む

**次：[RA3 微分法の理論](../RA3/index.md)**
