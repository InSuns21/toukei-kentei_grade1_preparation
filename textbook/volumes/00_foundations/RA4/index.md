# RA4 標準実解析 IV：Riemann/Darboux積分・FTC

Lebesgue積分へ進む前に、古典的なRiemann積分を一度きちんと閉じます。核心は「面積らしい極限」ではなく、**上からの近似と下からの近似が一致すること**です。

---

## 1. Darboux上和・下和

$[a,b]$ の分割を
$$
P:a=x_0<x_1<\cdots<x_n=b
$$
とし、$I_i=[x_{i-1},x_i]$ で
$$
M_i=\sup_{x\in I_i}f(x),\qquad m_i=\inf_{x\in I_i}f(x)
$$
と置きます。

<a id="def-ra4-darboux"></a>
<!-- formal-statement-start -->
> **定義（Darboux上和・下和）**  
> $$
> U(f,P)=\sum_iM_i(x_i-x_{i-1}),\qquad
> L(f,P)=\sum_im_i(x_i-x_{i-1}).
> $$
<!-- formal-statement-end -->

<a id="def-ra4-integrable"></a>
<!-- formal-statement-start -->
> **定義（Riemann可積分）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分であるとは
> $$
> \inf_PU(f,P)=\sup_PL(f,P)
> $$
> が成り立つことをいう。この共通値を $\int_a^bf(x)\,dx$ と書く。
<!-- formal-statement-end -->

<a id="thm-ra4-darboux-criterion"></a>
<!-- formal-statement-start -->
> **定理（Darboux可積分性判定）**  
> 有界関数 $f$ がRiemann可積分であることと、任意の $\varepsilon>0$ に対してある分割 $P$ が存在し
> $$
> U(f,P)-L(f,P)<\varepsilon
> $$
> となることは同値である。
<!-- formal-statement-end -->

---

## 2. 連続関数はなぜ可積分か

<a id="thm-ra4-continuous"></a>
<!-- formal-statement-start -->
> **定理（連続関数のRiemann可積分性）**  
> $[a,b]$ 上の連続関数はRiemann可積分である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Heine–Cantorの定理](../RA2/index.md#thm-ra2-heine-cantor) より $f$ は一様連続です。任意の $\varepsilon>0$ に対し、$|x-y|<\delta$ なら
$$
|f(x)-f(y)|<\frac{\varepsilon}{b-a}
$$
となる $\delta$ を取ります。各小区間の幅が $\delta$ 未満の分割なら
$$
U(f,P)-L(f,P)
<\frac{\varepsilon}{b-a}\sum_i(x_i-x_{i-1})
=\varepsilon.
$$
[Darboux可積分性判定](#thm-ra4-darboux-criterion) から可積分です。$\square$
<!-- proof-end -->

---

## 3. 微積分学の基本定理

<a id="thm-ra4-ftc1"></a>
<!-- formal-statement-start -->
> **定理（微積分学の基本定理I）**  
> $f$ が $[a,b]$ で連続なら
> $$
> F(x)=\int_a^xf(t)\,dt
> $$
> は $(a,b)$ で微分可能で $F'(x)=f(x)$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明の核

$h\ne0$ に対し
$$
\frac{F(x+h)-F(x)}h=\frac1h\int_x^{x+h}f(t)\,dt.
$$
$f(x)$ を引いて絶対値を取ると
$$
\left|\frac1h\int_x^{x+h}(f(t)-f(x))\,dt\right|
\le\sup_{|t-x|\le|h|}|f(t)-f(x)|,
$$
右辺は $h\to0$ で0へ行きます。$\square$
<!-- proof-end -->

<a id="thm-ra4-ftc2"></a>
<!-- formal-statement-start -->
> **定理（微積分学の基本定理II）**  
> $F'=f$ で $f$ が連続なら
> $$
> \int_a^bf(x)\,dx=F(b)-F(a).
> $$
<!-- formal-statement-end -->

FTC I は「積分から原始関数を作る」、FTC II は「原始関数から積分値を計算する」と役割を分けると混乱しません。

---

## 4. 置換積分

<a id="thm-ra4-substitution"></a>
<!-- formal-statement-start -->
> **定理（置換積分）**  
> $\phi:[\alpha,\beta]\to\mathbb R$ が連続微分可能で、$f$ が $\phi([\alpha,\beta])$ 上連続なら
> $$
> \int_{\alpha}^{\beta}f(\phi(t))\phi'(t)\,dt
> =\int_{\phi(\alpha)}^{\phi(\beta)}f(x)\,dx.
> $$
<!-- formal-statement-end -->

部分積分は積の微分公式を [微積分学の基本定理II](#thm-ra4-ftc2) で積分したものとして理解できます。

---

## 5. 通常積分と広義積分を分ける

$\int_1^\infty x^{-2}dx$ は無限区間上のRiemann積分を直接意味するのではなく
$$
\lim_{R\to\infty}\int_1^R\frac{dx}{x^2}
$$
という別の極限操作です。特異点を持つ積分も同様です。この区別が後のRiemann–Lebesgue接続で重要になります。

---

## 6. 演習

### Level A

<a id="ex-ra4-a01"></a>
#### RA4-A01 上和・下和
- Level: A

$f(x)=x$ を $[0,1]$ で $n$ 等分したときの上和と下和を求めよ。

<!-- solution-start -->
**解答**：幅は $1/n$。下和は
$$
\frac1{n^2}\sum_{i=1}^n(i-1)=\frac{n-1}{2n},
$$
上和は $(n+1)/(2n)$。
<!-- solution-end -->

<a id="ex-ra4-a02"></a>
#### RA4-A02 可積分性
- Level: A

A01の結果から $f(x)=x$ がRiemann可積分であることを示せ。

<!-- solution-start -->
**解答**：$U-L=1/n\to0$ なので、任意の $\varepsilon>0$ に対して十分大きい $n$ を取れば [Darboux可積分性判定](#thm-ra4-darboux-criterion) を満たす。
<!-- solution-end -->

<a id="ex-ra4-a03"></a>
#### RA4-A03 FTC
- Level: A

$F(x)=\int_0^x(1+t^2)dt$ の $F'(x)$ を求めよ。

<!-- solution-start -->
**解答**：[微積分学の基本定理I](#thm-ra4-ftc1) より $F'(x)=1+x^2$。
<!-- solution-end -->

<a id="ex-ra4-a04"></a>
#### RA4-A04 広義積分
- Level: A

$\int_1^\infty x^{-2}dx$ を計算せよ。

<!-- solution-start -->
**解答**：$\int_1^R x^{-2}dx=1-1/R$ なので、$R\to\infty$ で $1$。
<!-- solution-end -->

### Level B

<a id="ex-ra4-b01"></a>
#### RA4-B01 Dirichlet関数
- Level: B

$f=1_{\mathbb Q}$ を $[0,1]$ に制限するとRiemann可積分でないことを示せ。

<!-- solution-start -->
**解答**：任意の非退化小区間に有理数と無理数があるため、各区間で上限1・下限0。したがって任意の分割で $U=1$, $L=0$ となり一致しない。
<!-- solution-end -->

<a id="ex-ra4-b02"></a>
#### RA4-B02 部分積分
- Level: B

$\int_0^1xe^x dx$ を計算せよ。

<!-- solution-start -->
**解答**：$u=x$, $dv=e^xdx$ として
$$
[xe^x]_0^1-\int_0^1e^xdx=e-(e-1)=1.
$$
<!-- solution-end -->

<a id="ex-ra4-b03"></a>
#### RA4-B03 置換積分
- Level: B

$\int_0^12x\cos(x^2)dx$ を計算せよ。

<!-- solution-start -->
**解答**：$u=x^2$ と置けば $du=2x\,dx$ なので $\int_0^1\cos u\,du=\sin1$。
<!-- solution-end -->

### Level C

<a id="ex-ra4-c01"></a>
#### RA4-C01 単調関数の可積分性
- Level: C

$f:[a,b]\to\mathbb R$ が単調増加ならRiemann可積分であることを等分割から示せ。

<!-- solution-start -->
**解答**：$n$ 等分し $\Delta=(b-a)/n$ とすると
$$
U-L=\Delta\sum_{i=1}^n(f(x_i)-f(x_{i-1}))
=\Delta(f(b)-f(a))\to0.
$$
よって [Darboux可積分性判定](#thm-ra4-darboux-criterion) から可積分。
<!-- solution-end -->

---

## 7. 次に進む

**次：[RA5 関数列・関数級数・一様収束](../RA5/index.md)**
