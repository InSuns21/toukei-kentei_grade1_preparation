# RA4A 標準実解析 IV-A：広義積分・収束判定

[RA4](../RA4/index.md) では、有限閉区間上の有界関数に対するRiemann/Darboux積分を構成し、微積分学の基本定理まで閉じました。本章では、**区間が無限に伸びる場合**と、**被積分関数が端点や内部で非有界になる場合**を扱います。

重要なのは、広義積分を「無限大までそのまま積分する新しい演算」と考えないことです。まず通常の有限区間Riemann積分を作り、その値に対してもう一度極限を取ります。したがって本章の主題は積分計算よりも、**その極限が本当に存在するかをどう判定するか**です。

---

## 1. 広義積分は有限区間積分の極限である

<a id="def-ra4a-improper"></a>
<!-- formal-statement-start -->
> **定義（広義Riemann積分）**  
> $f$ がすべての $R>a$ について $[a,R]$ 上Riemann可積分であるとする。このとき
> $$
> \int_a^\infty f(x)\,dx
> :=\lim_{R\to\infty}\int_a^R f(x)\,dx
> $$
> と定め、右辺が有限値として存在するとき **収束**、存在しないとき **発散** という。
>
> 同様に、$f$ が各 $r<b$ について $[a,r]$ 上Riemann可積分で、$b$ で非有界になり得るとき
> $$
> \int_a^b f(x)\,dx
> :=\lim_{r\uparrow b}\int_a^r f(x)\,dx
> $$
> と定める。左端 $a$ が不良端点なら右側極限で定める。
>
> 内部点 $c\in(a,b)$ が特異点なら
> $$
> \int_a^b f
> :=\int_a^c f+\int_c^b f
> $$
> と書くが、これは **左右二つの広義積分がそれぞれ有限値へ収束するときに限って** 定義する。
>
> また
> $$
> \int_{-\infty}^{\infty}f
> :=\int_{-\infty}^{c}f+\int_c^{\infty}f
> $$
> も、左右がそれぞれ収束するときに限って定義する。
<!-- formal-statement-end -->

無限区間で分割点 $c$ をどこに取るかは結果に影響しません。例えば $d>c$ とすると、有限区間の加法性より
$$
\int_c^R f
=\int_c^d f+\int_d^R f.
$$
$R\to\infty$ とすれば、$\int_c^\infty f$ が収束することと $\int_d^\infty f$ が収束することは同値で、値の差は有限積分 $\int_c^d f$ です。左側も同じなので、両側を足した全体の値は分割点に依存しません。

<!-- definition-example-start: def-ra4a-improper -->
**定義の確認**：

1. 無限区間では
   $$
   \int_1^\infty \frac{dx}{x^2}
   =\lim_{R\to\infty}\left[-\frac1x\right]_1^R
   =1.
   $$
2. 端点特異型では
   $$
   \int_0^1\frac{dx}{\sqrt{x}}
   =\lim_{\varepsilon\downarrow0}
   \int_\varepsilon^1 x^{-1/2}\,dx
   =2.
   $$
3. 一方
   $$
   \int_{-1}^{1}\frac{dx}{x}
   $$
   は左右を別々に調べる必要があります。左側は $-\infty$、右側は $+\infty$ へ発散するため、通常の広義積分としては存在しません。左右を同時に打ち消してはいけません。
<!-- definition-example-end -->

### 複数の特異点がある場合

有限個の特異点
$$
a<c_1<c_2<\cdots<c_m<b
$$
があるなら、それぞれで区間を分け、各片側積分を別々に判定します。どこか一つでも発散すれば全体は発散です。

ここには重要な原則があります。

> **広義積分では、不良端点ごとに独立に極限を取る。**

「$+\infty$ と $-\infty$ が同時に現れるから相殺する」という操作は、通常の広義積分の定義には含まれません。

---

## 2. Cauchy判定：値を知らなくてもtailだけで判定できる

広義積分の極限値そのものを先に求められなくても、遠方のtailが小さくなるかどうかで収束を判定できます。

<a id="thm-ra4a-cauchy"></a>
<!-- formal-statement-start -->
> **定理（広義積分のCauchy判定）**  
> $f$ が各有限区間 $[a,R]$ 上Riemann可積分であるとする。このとき
> $$
> \int_a^\infty f(x)\,dx
> $$
> が収束することと、任意の $\varepsilon>0$ に対してある $A>a$ が存在し、
> $$
> v>u>A
> \Longrightarrow
> \left|\int_u^v f(x)\,dx\right|<\varepsilon
> $$
> となることは同値である。
>
> 端点 $b$ が特異点の場合も、任意の $\varepsilon>0$ に対してある $\delta>0$ が存在し、
> $$
> b-\delta<u<v<b
> \Longrightarrow
> \left|\int_u^v f(x)\,dx\right|<\varepsilon
> $$
> となることと $\int_a^b f$ の収束は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず無限区間を考えます。
$$
F(R)=\int_a^R f(x)\,dx
$$
と置きます。$\int_a^\infty f$ が $L$ に収束するなら、十分大きい $u,v$ に対して
$$
|F(u)-L|<\frac\varepsilon2,
\qquad
|F(v)-L|<\frac\varepsilon2.
$$
したがって有限区間の加法性から
$$
\left|\int_u^v f\right|
=|F(v)-F(u)|
\le |F(v)-L|+|F(u)-L|
<\varepsilon.
$$

逆にtail条件を仮定します。整数列 $(F(n))$ は、十分大きい $m>n$ に対して
$$
|F(m)-F(n)|
=\left|\int_n^m f\right|<\varepsilon
$$
となるためCauchy列です。実数の完備性により、ある $L\in\mathbb R$ が存在して $F(n)\to L$ です。

ここで整数点だけでなく任意の実数 $R\to\infty$ を処理します。tail条件を $\varepsilon/2$ に対して満たす $A$ を取り、さらに $n>A$ で $|F(n)-L|<\varepsilon/2$ となるようにします。$R>A$ に対し $n>R$ となる十分大きい整数を取れば
$$
|F(R)-L|
\le |F(R)-F(n)|+|F(n)-L|
<\varepsilon.
$$
したがって $F(R)\to L$、つまり広義積分は収束します。

端点特異型では
$$
G(r)=\int_a^r f(x)\,dx\qquad (r<b)
$$
と置きます。収束からtail条件が従う向きは
$$
\int_u^v f=G(v)-G(u)
$$
に同じ三角不等式を使えばよいです。逆向きでは $r_n=b-1/n$ を十分大きい $n$ について取り、$(G(r_n))$ がCauchy列であることから極限 $L$ を得ます。任意の $r$ が $b$ に十分近いとき、さらに $r_n>r$ となる $n$ を取り
$$
|G(r)-L|
\le |G(r)-G(r_n)|+|G(r_n)-L|
$$
とすれば $G(r)\to L$ が従います。$\square$
<!-- proof-end -->

この定理は、広義積分を「極限値を当てる問題」から「遠く離れたtailを抑える問題」へ変えます。後の振動積分で特に重要です。

---

## 3. 非負関数では「部分積分が上に有界か」だけを見る

<a id="thm-ra4a-nonnegative"></a>
<!-- formal-statement-start -->
> **定理（非負広義積分の有界性判定）**  
> $f(x)\ge0$ とする。このとき
> $$
> \int_a^\infty f(x)\,dx
> $$
> が収束することと、集合
> $$
> \left\{\int_a^R f(x)\,dx:R>a\right\}
> $$
> が上に有界であることは同値である。
>
> 上に有界でなければ、部分積分は $+\infty$ へ発散する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
F(R)=\int_a^R f(x)\,dx
$$
と置きます。$S>R$ なら、[Riemann積分の基本性質（線形性・単調性・区間加法性）](../RA4/index.md#thm-ra4-integral-properties) より
$$
F(S)-F(R)=\int_R^S f(x)\,dx\ge0.
$$
したがって $F$ は $R$ に関して単調増加です。

$F(R)$ が上に有界なら
$$
L=\sup_{R>a}F(R)
$$
が存在します。任意の $\varepsilon>0$ に対し、$L-\varepsilon$ は上界ではないので、ある $R_0$ が存在して
$$
L-\varepsilon<F(R_0)\le L.
$$
単調性から $R\ge R_0$ なら
$$
L-\varepsilon<F(R_0)\le F(R)\le L,
$$
よって $F(R)\to L$ です。

逆に $F(R)$ が有限値へ収束するなら当然tailは有界です。上に有界でない単調増加関数は、任意の $M>0$ に対してある $R_0$ で $F(R_0)>M$ となり、その後も $F(R)\ge F(R_0)>M$ なので $+\infty$ へ発散します。$\square$
<!-- proof-end -->

端点特異型でも、積分上端を特異点へ近づけたときの部分積分が単調増加するので同じ結論が成り立ちます。

---

## 4. 有限部分は収束性を変えない・線形性は極限へ持ち上がる

<a id="thm-ra4a-linearity-tail"></a>
<!-- formal-statement-start -->
> **定理（広義積分の線形性・有限区間切り捨て）**  
> $A>a$ とする。$\int_a^\infty f$ が収束することと $\int_A^\infty f$ が収束することは同値で、収束するとき
> $$
> \int_a^\infty f
> =\int_a^A f+\int_A^\infty f.
> $$
> また $\int_a^\infty f$, $\int_a^\infty g$ が収束し、$\alpha,\beta\in\mathbb R$ なら
> $$
> \int_a^\infty(\alpha f+\beta g)
> =\alpha\int_a^\infty f
> +\beta\int_a^\infty g.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$R>A$ について有限区間の加法性から
$$
\int_a^R f
=\int_a^A f+\int_A^R f.
$$
第1項は $R$ に依存しない有限値なので、$R\to\infty$ で左辺が収束することと第2項が収束することは同値です。極限を取れば値の公式も従います。

また有限区間では線形性が成り立つので
$$
\int_a^R(\alpha f+\beta g)
=\alpha\int_a^R f+\beta\int_a^R g.
$$
両辺で $R\to\infty$ とすれば、実数の極限の線形性から主張が従います。$\square$
<!-- proof-end -->

したがって比較判定では「十分大きい $x$ でだけ大小関係が成り立つ」で十分です。最初の有限区間は収束・発散を左右しません。

---

## 5. 比較判定と極限比較判定

<a id="thm-ra4a-comparison"></a>
<!-- formal-statement-start -->
> **定理（広義積分の比較判定）**  
> ある $A$ 以降で
> $$
> 0\le f(x)\le g(x)
> $$
> とする。
>
> 1. $\int_A^\infty g(x)\,dx$ が収束するなら、$\int_A^\infty f(x)\,dx$ も収束する。
> 2. $\int_A^\infty f(x)\,dx$ が $+\infty$ へ発散するなら、$\int_A^\infty g(x)\,dx$ も $+\infty$ へ発散する。
>
> 端点特異型でも同じ比較が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$R>A$ とすると単調性から
$$
0\le\int_A^R f\le\int_A^R g.
$$
$\int_A^\infty g$ が収束するなら右辺は $R$ によらず上に有界です。したがって左辺も上に有界であり、[非負広義積分の有界性判定](#thm-ra4a-nonnegative) により $\int_A^\infty f$ は収束します。

逆に $\int_A^\infty f=+\infty$ なら、任意の $M>0$ に対し十分大きい $R$ で
$$
\int_A^R f>M.
$$
よって
$$
\int_A^R g\ge\int_A^R f>M
$$
となり、$\int_A^\infty g$ も $+\infty$ へ発散します。端点特異型も、$R\to\infty$ を端点へ近づく有限上端に置き換えれば同じ不等式で証明できます。$\square$
<!-- proof-end -->

<a id="thm-ra4a-limit-comparison"></a>
<!-- formal-statement-start -->
> **定理（広義積分の極限比較判定）**  
> 十分大きい $x$ で $f(x)>0$, $g(x)>0$ とし、
> $$
> \lim_{x\to\infty}\frac{f(x)}{g(x)}=L,
> \qquad 0<L<\infty
> $$
> とする。このとき
> $$
> \int_A^\infty f(x)\,dx
> $$
> と
> $$
> \int_A^\infty g(x)\,dx
> $$
> は同時に収束するか、同時に発散する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

極限が正の有限値 $L$ なので、十分大きい $x$ では
$$
\frac L2<\frac{f(x)}{g(x)}<\frac{3L}{2}.
$$
したがって
$$
\frac L2 g(x)<f(x)<\frac{3L}{2}g(x).
$$
両側に [広義積分の比較判定](#thm-ra4a-comparison) を適用すれば、一方が収束すると他方も収束し、一方が発散すると他方も発散します。$\square$
<!-- proof-end -->

特に
$$
f(x)\sim g(x)
\qquad(x\to\infty)
$$
すなわち $f(x)/g(x)\to1$ なら、収束性は同じです。

### 基本モデル1：無限遠の $p$ 積分

$p\ne1$ なら
$$
\int_1^R x^{-p}\,dx
=\frac{R^{1-p}-1}{1-p},
$$
$p=1$ なら
$$
\int_1^R\frac{dx}{x}=\log R.
$$
したがって
$$
\boxed{
\int_1^\infty\frac{dx}{x^p}
\text{ は }p>1\text{ のとき、かつそのときに限り収束する。}
}
$$
$p>1$ なら値は $1/(p-1)$ です。

### 基本モデル2：0近傍の $p$ 積分

$p\ne1$ なら
$$
\int_\varepsilon^1x^{-p}\,dx
=\frac{1-\varepsilon^{1-p}}{1-p},
$$
$p=1$ なら $-\log\varepsilon$ です。よって
$$
\boxed{
\int_0^1\frac{dx}{x^p}
\text{ は }p<1\text{ のとき、かつそのときに限り収束する。}
}
$$

無限遠と0近傍で閾値の向きが逆になることに注意してください。

### 基本モデル3：対数補正

$q\ne1$ について
$$
\frac{d}{dx}\frac{(\log x)^{1-q}}{1-q}
=\frac1{x(\log x)^q},
$$
$q=1$ では原始関数が $\log\log x$ です。したがって
$$
\boxed{
\int_e^\infty\frac{dx}{x(\log x)^q}
\text{ は }q>1\text{ のとき、かつそのときに限り収束する。}
}
$$

$p$ 積分だけでは判定できない「境界 $1/x$ に対数が付いた場合」の標準モデルです。

---

## 6. 絶対収束と条件収束

まず、有限区間で $f$ がRiemann可積分なら $|f|$ もRiemann可積分であることを確認します。小区間 $I$ 上で任意の $x,y\in I$ に対し
$$
\bigl||f(x)|-|f(y)|\bigr|
\le |f(x)-f(y)|.
$$
したがって $|f|$ の振幅は $f$ の振幅以下です。よって任意の分割 $P$ で
$$
U(|f|,P)-L(|f|,P)
\le U(f,P)-L(f,P).
$$
[Darboux可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) から $|f|$ も可積分です。

<a id="def-ra4a-absolute"></a>
<!-- formal-statement-start -->
> **定義（広義積分の絶対収束・条件収束）**  
> $\int_a^\infty f(x)\,dx$ について
> $$
> \int_a^\infty |f(x)|\,dx<\infty
> $$
> となるとき **絶対収束** という。
>
> $\int_a^\infty f$ は収束するが $\int_a^\infty|f|$ は発散するとき **条件収束** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra4a-absolute -->
**定義の確認**：$e^{-x}$ は
$$
\int_0^\infty |e^{-x}|\,dx=1
$$
なので絶対収束します。一方、後で示す $\sin x/x$ は積分自体は収束しますが絶対値積分は発散するため条件収束です。
<!-- definition-example-end -->

<a id="thm-ra4a-absolute"></a>
<!-- formal-statement-start -->
> **定理（広義積分の絶対収束判定）**  
> $\int_a^\infty |f(x)|\,dx$ が収束するなら、$\int_a^\infty f(x)\,dx$ も収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限区間 $[u,v]$ 上では
$$
-|f(x)|\le f(x)\le |f(x)|
$$
なので積分の単調性から
$$
-\int_u^v|f(x)|\,dx
\le\int_u^v f(x)\,dx
\le\int_u^v|f(x)|\,dx.
$$
したがって
$$
\left|\int_u^v f(x)\,dx\right|
\le\int_u^v|f(x)|\,dx.
$$

$\int_a^\infty|f|$ が収束するので、[広義積分のCauchy判定](#thm-ra4a-cauchy) により任意の $\varepsilon>0$ に対して十分大きい $v>u$ では
$$
\int_u^v|f(x)|\,dx<\varepsilon.
$$
よって
$$
\left|\int_u^v f(x)\,dx\right|<\varepsilon.
$$
再び [広義積分のCauchy判定](#thm-ra4a-cauchy) を使えば $\int_a^\infty f$ は収束します。$\square$
<!-- proof-end -->

逆は成り立ちません。振動による相殺があると、絶対値を外した積分だけが収束することがあります。

---

## 7. 級数との橋：積分判定

<a id="thm-ra4a-integral-test"></a>
<!-- formal-statement-start -->
> **定理（級数と広義積分の積分判定）**  
> $f:[1,\infty)\to[0,\infty)$ が単調減少で、各有限区間上Riemann可積分であるとする。このとき
> $$
> \sum_{n=1}^\infty f(n)
> $$
> と
> $$
> \int_1^\infty f(x)\,dx
> $$
> は同時に収束するか、同時に発散する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ は単調減少なので $x\in[n,n+1]$ なら
$$
f(n+1)\le f(x)\le f(n).
$$
積分すると
$$
f(n+1)
\le\int_n^{n+1}f(x)\,dx
\le f(n).
$$
$n=1,\dots,N$ について足せば
$$
\sum_{n=2}^{N+1}f(n)
\le\int_1^{N+1}f(x)\,dx
\le\sum_{n=1}^{N}f(n).
$$
同じ内容を少し並べ替えると
$$
\int_1^{N+1}f(x)\,dx
\le\sum_{n=1}^{N}f(n)
\le f(1)+\int_1^{N}f(x)\,dx.
$$

両者は非負項の単調増加部分和・部分積分です。一方が上に有界ならこの不等式から他方も上に有界になります。したがって [非負広義積分の有界性判定](#thm-ra4a-nonnegative) と [有界単調数列の収束定理](../RA1/index.md#thm-ra1-monotone) により、級数と広義積分は同時に収束します。上に有界でなければ同時に $+\infty$ へ発散します。$\square$
<!-- proof-end -->

$f(x)=x^{-p}$ に適用すると
$$
\sum_{n=1}^\infty\frac1{n^p}
$$
が $p>1$ のとき、かつそのときに限り収束することが、無限遠の $p$ 積分から再び得られます。

---

## 8. 振動積分：Dirichlet判定

非負関数では比較判定が強力でしたが、符号が振動する積分では「相殺」を定量化する必要があります。

<a id="thm-ra4a-dirichlet"></a>
<!-- formal-statement-start -->
> **定理（広義積分のDirichlet判定）**  
> $f:[a,\infty)\to\mathbb R$ を連続関数とし
> $$
> F(x)=\int_a^x f(t)\,dt
> $$
> が有界であるとする。$g:[a,\infty)\to[0,\infty)$ は $C^1$ 級、単調減少で
> $$
> g(x)\to0
> $$
> とする。このとき
> $$
> \int_a^\infty f(x)g(x)\,dx
> $$
> は収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|F(x)|\le M$ となる $M$ を取ります。[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) により $F'(x)=f(x)$ です。

$u<v$ とし、積の微分公式
$$
(Fg)'=F'g+Fg'
$$
を $[u,v]$ で積分して [微積分学の基本定理II](../RA4/index.md#thm-ra4-ftc2) を使うと
$$
\int_u^v f(x)g(x)\,dx
=F(v)g(v)-F(u)g(u)-\int_u^vF(x)g'(x)\,dx.
$$
$g$ は単調減少なので $g'(x)\le0$ です。したがって
$$
\begin{aligned}
\left|\int_u^v fg\right|
&\le M g(v)+M g(u)+M\int_u^v(-g'(x))\,dx\\
&=M g(v)+M g(u)+M(g(u)-g(v))\\
&=2M g(u).
\end{aligned}
$$
$u\to\infty$ で $g(u)\to0$ なので、任意の $\varepsilon>0$ に対し十分大きい $u$ では右辺が $\varepsilon$ 未満になります。よって [広義積分のCauchy判定](#thm-ra4a-cauchy) により収束します。$\square$
<!-- proof-end -->

### 標準例：$\int_1^\infty \sin x/x\,dx$

$$
F(x)=\int_1^x\sin t\,dt
=\cos1-\cos x
$$
は有界で、$g(x)=1/x$ は0へ単調減少します。したがって [広義積分のDirichlet判定](#thm-ra4a-dirichlet) により
$$
\int_1^\infty\frac{\sin x}{x}\,dx
$$
は収束します。

しかし絶対収束はしません。$k\ge1$ に対して
$$
I_k=\left[k\pi+\frac\pi6,\ k\pi+\frac{5\pi}6\right]
$$
と置くと、$I_k$ 上で $|\sin x|\ge1/2$ かつ $x<(k+1)\pi$ なので
$$
\int_{I_k}\frac{|\sin x|}{x}\,dx
\ge
\frac12\cdot\frac{2\pi/3}{(k+1)\pi}
=\frac1{3(k+1)}.
$$
右辺を $k$ について足すと調和級数型に発散します。したがって
$$
\int_1^\infty\frac{|\sin x|}{x}\,dx=\infty.
$$
これは広義積分の**条件収束**の標準例です。

---

## 9. Abel判定：収束積分に有界単調因子を掛ける

<a id="thm-ra4a-abel"></a>
<!-- formal-statement-start -->
> **定理（広義積分のAbel判定）**  
> $f:[a,\infty)\to\mathbb R$ を連続関数とし
> $$
> \int_a^\infty f(x)\,dx
> $$
> が収束するとする。$g:[a,\infty)\to\mathbb R$ が $C^1$ 級で有界かつ単調なら
> $$
> \int_a^\infty f(x)g(x)\,dx
> $$
> も収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g$ は有界単調なので有限極限
$$
L=\lim_{x\to\infty}g(x)
$$
を持ちます。そこで
$$
g(x)=L+(g(x)-L)
$$
と分けます。

第1項について
$$
\int_a^\infty Lf(x)\,dx
=L\int_a^\infty f(x)\,dx
$$
は [広義積分の線形性・有限区間切り捨て](#thm-ra4a-linearity-tail) により収束します。

$g$ が単調減少なら $g(x)-L\ge0$ で0へ単調減少します。単調増加なら $L-g(x)\ge0$ が0へ単調減少するので、符号を一つ外せば同じ形です。

また $\int_a^\infty f$ が収束するため、
$$
F(x)=\int_a^x f(t)\,dt
$$
は有限極限を持ち、したがって有界です。よって [広義積分のDirichlet判定](#thm-ra4a-dirichlet) を $f$ と $|g-L|$ に適用でき、
$$
\int_a^\infty f(x)(g(x)-L)\,dx
$$
も収束します。二つを足せば主張が従います。$\square$
<!-- proof-end -->

Dirichlet判定では「振動側の原始積分が有界」で十分でした。Abel判定ではさらに強く「振動側そのものの広義積分が収束」と仮定し、その代わり掛ける因子は0へ行かなくても有限極限を持てばよい、という関係です。

---

## 10. Cauchy主値は通常の広義積分ではない

<a id="def-ra4a-pv"></a>
<!-- formal-statement-start -->
> **定義（広義積分に対するCauchy主値）**  
> 内部特異点 $c\in(a,b)$ に対し
> $$
> \operatorname{PV}\int_a^b f(x)\,dx
> :=\lim_{\varepsilon\downarrow0}
> \left(
> \int_a^{c-\varepsilon}f(x)\,dx
> +\int_{c+\varepsilon}^{b}f(x)\,dx
> \right)
> $$
> が存在するとき、この値をCauchy主値という。
>
> 無限区間では典型的に
> $$
> \operatorname{PV}\int_{-\infty}^{\infty}f(x)\,dx
> :=\lim_{R\to\infty}\int_{-R}^{R}f(x)\,dx
> $$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra4a-pv -->
**定義の確認**：
$$
\operatorname{PV}\int_{-1}^{1}\frac{dx}{x}
=\lim_{\varepsilon\downarrow0}
\left(
\int_{-1}^{-\varepsilon}\frac{dx}{x}
+\int_{\varepsilon}^{1}\frac{dx}{x}
\right)=0.
$$
しかし
$$
\int_{-1}^{0}\frac{dx}{x}=-\infty,
\qquad
\int_0^1\frac{dx}{x}=+\infty,
$$
なので通常の広義積分は存在しません。
<!-- definition-example-end -->

さらに「対称に切ったからたまたま0」ということは、切り方を変えると見えます。例えば
$$
f(x)=\frac{x}{1+x^2}
$$
では
$$
\int_{-A}^{B}\frac{x}{1+x^2}\,dx
=\frac12\log\frac{1+B^2}{1+A^2}.
$$
$A=B=R$ とすれば常に0なので対称主値は0です。一方 $B=cA$ として $A\to\infty$ とすると
$$
\frac12\log\frac{1+c^2A^2}{1+A^2}
\longrightarrow \log c.
$$
$c$ により極限値が変わります。したがって主値は、独立な左右極限を要求する通常の広義積分ではなく、**特定の相殺規則を指定した別の極限操作**です。

---

## 11. 有限区間の公式を広義積分へ使うときの原則

広義積分で置換積分・部分積分などを使うとき、$\infty$ や特異点を通常の端点のように式へ直接代入してはいけません。

例えば
$$
\int_a^\infty f(x)\,dx
$$
で部分積分を使いたいなら、まず有限な $R$ に対して $[a,R]$ 上で通常の公式を適用し、**最後に $R\to\infty$ を取ります**。境界項にも極限が必要です。

同様に端点 $b$ が特異なら、まず $[a,b-\varepsilon]$ で計算し、その後 $\varepsilon\downarrow0$ とします。

この順番を守ると、「発散する二項を形式的に引き算して有限値を得る」といった誤操作を避けられます。

---

## 12. どこまでが本章で、どこからが後続理論か

本章の広義積分は、有限区間のRiemann積分に極限を一つ追加した理論です。ここまでで、単独の広義積分の標準的な収束論は一通り扱いました。

一方、次の問題は別の道具を必要とします。

- 関数列 $f_n$ の積分と $n\to\infty$ を交換してよいか
- パラメータを含む広義積分を微分してよいか
- 絶対収束しない積分を、より一般の積分論でどう扱うか

前二つは [RA5 関数列・関数級数・一様収束](../RA5/index.md)、より一般の積分論は後続の測度・Lebesgue積分で扱います。広義積分の記号だけを見て、極限交換を自動的に許してはいけません。

---

## 13. 演習

### Level A

<a id="ex-ra4a-a01"></a>
#### RA4A-A01 無限遠の $p$ 積分
- Level: A

実数 $p$ に対して
$$
\int_1^\infty x^{-p}\,dx
$$
の収束・発散を分類し、収束する場合は値を求めよ。

<!-- solution-start -->
**解答**：$p\ne1$ なら
$$
\int_1^R x^{-p}\,dx
=\frac{R^{1-p}-1}{1-p}.
$$
$p>1$ では $1-p<0$ なので $R^{1-p}\to0$。したがって
$$
\int_1^\infty x^{-p}\,dx
=\frac1{p-1}.
$$
$p<1$ では $R^{1-p}\to\infty$ なので発散します。

$p=1$ では
$$
\int_1^R\frac{dx}{x}=\log R\to\infty.
$$
よって収束するのは $p>1$ の場合だけです。
<!-- solution-end -->

<a id="ex-ra4a-a02"></a>
#### RA4A-A02 0近傍の $p$ 積分
- Level: A

$$
\int_0^1x^{-p}\,dx
$$
の収束・発散を分類せよ。

<!-- solution-start -->
**解答**：$p\ne1$ なら
$$
\int_\varepsilon^1x^{-p}\,dx
=\frac{1-\varepsilon^{1-p}}{1-p}.
$$
$p<1$ なら $1-p>0$ なので $\varepsilon^{1-p}\to0$ となり、極限は $1/(1-p)$ です。

$p>1$ なら $1-p<0$ なので $\varepsilon^{1-p}\to\infty$ となり、積分は $+\infty$ へ発散します。$p=1$ でも
$$
\int_\varepsilon^1\frac{dx}{x}=-\log\varepsilon\to\infty.
$$
したがって収束するのは $p<1$ の場合だけです。
<!-- solution-end -->

<a id="ex-ra4a-a03"></a>
#### RA4A-A03 対数補正
- Level: A

実数 $q$ に対して
$$
\int_e^\infty\frac{dx}{x(\log x)^q}
$$
の収束・発散を分類せよ。

<!-- solution-start -->
**解答**：$q\ne1$ なら
$$
\frac{d}{dx}\frac{(\log x)^{1-q}}{1-q}
=\frac1{x(\log x)^q}.
$$
したがって
$$
\int_e^R\frac{dx}{x(\log x)^q}
=\frac{(\log R)^{1-q}-1}{1-q}.
$$
$q>1$ なら $(\log R)^{1-q}\to0$ なので収束します。$q<1$ なら $(\log R)^{1-q}\to\infty$ なので発散します。

$q=1$ では
$$
\int_e^R\frac{dx}{x\log x}
=\log\log R\to\infty.
$$
よって $q>1$ のとき、かつそのときに限り収束します。
<!-- solution-end -->

<a id="ex-ra4a-a04"></a>
#### RA4A-A04 極限比較
- Level: A

次の二つの広義積分の収束・発散を判定せよ。
$$
\int_1^\infty\frac{x+1}{x^3+1}\,dx,
\qquad
\int_1^\infty\frac{x}{x^2+1}\,dx.
$$

<!-- solution-start -->
**解答**：第1の被積分関数を $f(x)$ とすると
$$
\frac{f(x)}{x^{-2}}
=\frac{x^2(x+1)}{x^3+1}
=\frac{1+1/x}{1+1/x^3}	o1.
$$
$\int_1^\infty x^{-2}dx$ は収束するので、[広義積分の極限比較判定](#thm-ra4a-limit-comparison) から第1の積分は収束します。

第2の被積分関数を $g(x)$ とすると
$$
\frac{g(x)}{x^{-1}}
=\frac{x^2}{x^2+1}\to1.
$$
$\int_1^\infty x^{-1}dx$ は発散するので、第2の積分も発散します。
<!-- solution-end -->

<a id="ex-ra4a-a05"></a>
#### RA4A-A05 内部特異点
- Level: A

実数 $p$ に対し
$$
\int_0^2\frac{dx}{|x-1|^p}
$$
が収束する条件を求めよ。

<!-- solution-start -->
**解答**：$x=1$ が内部特異点なので、左右を別々に判定します。
$$
\int_0^2\frac{dx}{|x-1|^p}
=
\int_0^1(1-x)^{-p}dx
+
\int_1^2(x-1)^{-p}dx.
$$
左側で $u=1-x$、右側で $u=x-1$ と見ると、どちらも収束性は
$$
\int_0^1u^{-p}du
$$
と同じです。A02よりこれは $p<1$ のとき、かつそのときに限り収束します。左右のどちらかだけを相殺してはいけません。
<!-- solution-end -->

<a id="ex-ra4a-a06"></a>
#### RA4A-A06 指数減衰
- Level: A

$\lambda>0$ とする。
$$
\int_0^\infty e^{-\lambda x}\,dx
$$
を計算し、tail
$$
\int_A^\infty e^{-\lambda x}\,dx
$$
が $A\to\infty$ で0へ行くことを直接確認せよ。

<!-- solution-start -->
**解答**：有限な $R$ に対して
$$
\int_0^R e^{-\lambda x}dx
=\left[-\frac1\lambda e^{-\lambda x}\right]_0^R
=\frac{1-e^{-\lambda R}}\lambda.
$$
$R\to\infty$ で $e^{-\lambda R}\to0$ だから
$$
\int_0^\infty e^{-\lambda x}dx=\frac1\lambda.
$$
同様に
$$
\int_A^\infty e^{-\lambda x}dx
=\frac{e^{-\lambda A}}\lambda\to0.
$$
[広義積分のCauchy判定](#thm-ra4a-cauchy) で現れる「遠方のtailが小さくなる」ことが具体的に見えています。
<!-- solution-end -->

### Level B

<a id="ex-ra4a-b01"></a>
#### RA4A-B01 $\sin x/x$ の条件収束
- Level: B

$$
\int_1^\infty\frac{\sin x}{x}\,dx
$$
が収束するが絶対収束しないことを示せ。

<!-- solution-start -->
**解答**：
$$
F(x)=\int_1^x\sin t\,dt=\cos1-\cos x
$$
は有界です。また $g(x)=1/x$ は非負、$C^1$ 級、単調減少で0へ収束します。したがって [広義積分のDirichlet判定](#thm-ra4a-dirichlet) により積分は収束します。

絶対収束しないことを示します。$k\ge1$ に対して
$$
I_k=\left[k\pi+\frac\pi6,\ k\pi+\frac{5\pi}6\right]
$$
では $|\sin x|\ge1/2$ です。また $x<(k+1)\pi$ なので
$$
\int_{I_k}\frac{|\sin x|}{x}dx
\ge\frac12\frac{2\pi/3}{(k+1)\pi}
=\frac1{3(k+1)}.
$$
よって
$$
\int_1^\infty\frac{|\sin x|}{x}dx
$$
は調和級数との比較で発散します。したがって元の積分は条件収束です。
<!-- solution-end -->

<a id="ex-ra4a-b02"></a>
#### RA4A-B02 $\cos x/x^\alpha$ の分類
- Level: B

$\alpha>0$ とする。
$$
\int_1^\infty\frac{\cos x}{x^\alpha}\,dx
$$
が常に収束することを示し、絶対収束するのはどの $\alpha$ か求めよ。

<!-- solution-start -->
**解答**：
$$
F(x)=\int_1^x\cos t\,dt=\sin x-\sin1
$$
は有界です。$x^{-\alpha}$ は $\alpha>0$ なら0へ単調減少するので、[広義積分のDirichlet判定](#thm-ra4a-dirichlet) により元の積分はすべての $\alpha>0$ で収束します。

$\alpha>1$ なら
$$
\frac{|\cos x|}{x^\alpha}\le\frac1{x^\alpha}
$$
であり、右辺の $p$ 積分が収束するので絶対収束します。

$0<\alpha\le1$ では、各周期のうち $|\cos x|\ge1/2$ となる固定長の区間を一つずつ取れます。例えば十分大きい整数 $k$ に対して
$$
J_k=[2k\pi-\pi/3,\ 2k\pi+\pi/3]
$$
では $|\cos x|\ge1/2$ です。$J_k$ 上で $x\le(2k+1)\pi$ だから
$$
\int_{J_k}\frac{|\cos x|}{x^\alpha}dx
\ge C\frac1{k^\alpha}
$$
となる定数 $C>0$ が存在します。$\sum k^{-\alpha}$ は $\alpha\le1$ で発散するため、絶対値積分も発散します。

したがって絶対収束するのは $\alpha>1$、$0<\alpha\le1$ では条件収束です。
<!-- solution-end -->

<a id="ex-ra4a-b03"></a>
#### RA4A-B03 積分判定と $p$ 級数
- Level: B

[級数と広義積分の積分判定](#thm-ra4a-integral-test) を用いて
$$
\sum_{n=1}^\infty\frac1{n^p}
$$
の収束・発散を分類せよ。また $p=1$ の調和級数が発散することを積分との比較不等式から明示せよ。

<!-- solution-start -->
**解答**：$f(x)=x^{-p}$ を考えます。$p>0$ では $f$ は正で単調減少です。積分判定により
$$
\sum_{n=1}^\infty n^{-p}
$$
と
$$
\int_1^\infty x^{-p}dx
$$
は同時に収束します。A01から $p>1$ のとき、かつそのときに限り収束します。

$p\le0$ では一般項 $n^{-p}$ が0へ行かないので級数は発散します。よって全実数 $p$ について収束条件は $p>1$ です。

$p=1$ では積分判定の不等式から
$$
\sum_{n=1}^N\frac1n
\ge\int_1^{N+1}\frac{dx}{x}
=\log(N+1)\to\infty.
$$
したがって調和級数は発散します。
<!-- solution-end -->

<a id="ex-ra4a-b04"></a>
#### RA4A-B04 主値と通常の広義積分
- Level: B

$$
\int_{-1}^{1}\frac{dx}{x}
$$
について、通常の広義積分は存在しないがCauchy主値は0であることを定義から示せ。

<!-- solution-start -->
**解答**：通常の広義積分では左右を独立に調べます。右側は
$$
\int_\varepsilon^1\frac{dx}{x}
=-\log\varepsilon\to+\infty.
$$
左側は
$$
\int_{-1}^{-\varepsilon}\frac{dx}{x}
=\log\varepsilon\to-\infty.
$$
したがって左右のどちらも有限値へ収束せず、通常の広義積分は存在しません。

一方Cauchy主値では同じ $\varepsilon$ で左右を切るので
$$
\int_{-1}^{-\varepsilon}\frac{dx}{x}
+\int_\varepsilon^1\frac{dx}{x}
=\log\varepsilon-\log\varepsilon=0.
$$
よって
$$
\operatorname{PV}\int_{-1}^{1}\frac{dx}{x}=0.
$$
これは $-\infty+\infty$ を通常の積分として足したのではなく、対称切断という別の極限規則で得た値です。
<!-- solution-end -->

<a id="ex-ra4a-b05"></a>
#### RA4A-B05 両端に特異点をもつ積分
- Level: B

実数 $\alpha,\beta$ に対し
$$
\int_0^1\frac{dx}{x^\alpha(1-x)^\beta}
$$
が収束するための必要十分条件を求めよ。

<!-- solution-start -->
**解答**：$1/2$ で分けます。
$$
\int_0^1\frac{dx}{x^\alpha(1-x)^\beta}
=
\int_0^{1/2}\frac{dx}{x^\alpha(1-x)^\beta}
+
\int_{1/2}^{1}\frac{dx}{x^\alpha(1-x)^\beta}.
$$

$0<x\le1/2$ では $1/2\le1-x<1$ なので $(1-x)^{-\beta}$ は正の二定数の間に挟まれます。したがって左側の収束性は
$$
\int_0^{1/2}x^{-\alpha}dx
$$
と同じで、$\alpha<1$ が必要十分です。

同様に $1/2\le x<1$ では $x^{-\alpha}$ が正の二定数の間に挟まれるため、右側の収束性は
$$
\int_{1/2}^{1}(1-x)^{-\beta}dx
$$
と同じで、$\beta<1$ が必要十分です。

左右がともに収束する必要があるので、全体の必要十分条件は
$$
\boxed{\alpha<1\ \text{かつ}\ \beta<1}
$$
です。
<!-- solution-end -->

### Level C

<a id="ex-ra4a-c01"></a>
#### RA4A-C01 Fresnel型tail
- Level: C

$$
\int_1^\infty\sin(x^2)\,dx
$$
が収束することを示せ。

<!-- solution-start -->
**解答**：有限な $R>1$ で $u=x^2$ と置換します。$du=2x\,dx$ なので
$$
\int_1^R\sin(x^2)dx
=\frac12\int_1^{R^2}\frac{\sin u}{\sqrt{u}}du.
$$
ここで
$$
F(U)=\int_1^U\sin u\,du=\cos1-\cos U
$$
は有界で、$g(u)=u^{-1/2}$ は0へ単調減少します。したがって [広義積分のDirichlet判定](#thm-ra4a-dirichlet) により
$$
\int_1^\infty\frac{\sin u}{\sqrt{u}}du
$$
は収束します。

有限区間での置換等式が各 $R$ で成立しており、$R\to\infty$ で右辺が有限極限を持つため、左辺も有限極限を持ちます。よって
$$
\int_1^\infty\sin(x^2)dx
$$
は収束します。
<!-- solution-end -->

<a id="ex-ra4a-c02"></a>
#### RA4A-C02 切り方で値が変わる主値
- Level: C

$$
f(x)=\frac{x}{1+x^2}
$$
について次を示せ。

1. $\operatorname{PV}\int_{-\infty}^{\infty}f(x)dx=0$。
2. $c>0$ を固定し、$B=cA$ として
   $$
   \lim_{A\to\infty}\int_{-A}^{B}f(x)dx
   $$
   を求めよ。
3. 以上から、通常の広義積分が存在しない理由を説明せよ。

<!-- solution-start -->
**解答**：原始関数は
$$
\frac12\log(1+x^2)
$$
です。したがって
$$
\int_{-A}^{B}\frac{x}{1+x^2}dx
=\frac12\log\frac{1+B^2}{1+A^2}.
$$

1. $A=B=R$ とすれば比は1なので、各 $R$ で積分値は0です。よって対称主値は0です。
2. $B=cA$ とすると
   $$
   \frac12\log\frac{1+c^2A^2}{1+A^2}
   \to\frac12\log c^2=\log c.
   $$
3. $c$ によって極限値が変わるため、左右を独立に無限遠へ送った極限は存在しません。実際、右半直線では原始関数が $+\infty$ へ発散し、左半直線では $-\infty$ へ発散します。主値0は対称切断という特定の規則による正則化です。
<!-- solution-end -->

<a id="ex-ra4a-c03"></a>
#### RA4A-C03 $x^{-p}(\log x)^{-q}$ の完全分類
- Level: C

実数 $p,q$ に対して
$$
\int_e^\infty\frac{dx}{x^p(\log x)^q}
$$
の収束・発散をすべて分類せよ。

<!-- solution-start -->
**解答**：三つの場合に分けます。

**(i) $p=1$**：A03そのもので、$q>1$ のとき、かつそのときに限り収束します。

**(ii) $p>1$**：$\eta=(p-1)/2>0$ と置きます。対数は任意の正のべきより遅く増えるので、任意の実数 $q$ に対して十分大きい $x$ では
$$
(\log x)^{|q|}\le x^\eta.
$$
$q\ge0$ なら $(\log x)^{-q}\le1$ だから
$$
0\le\frac1{x^p(\log x)^q}\le\frac1{x^p}
$$
で収束します。

$q<0$ なら $(\log x)^{-q}=(\log x)^{|q|}\le x^\eta$ より
$$
0\le\frac1{x^p(\log x)^q}
\le\frac1{x^{p-\eta}}.
$$
ここで
$$
p-\eta=\frac{p+1}{2}>1
$$
なので右辺の $p$ 積分は収束します。よって $p>1$ ではすべての $q$ で収束します。

**(iii) $p<1$**：$\eta=(1-p)/2>0$ と置きます。十分大きい $x$ で
$$
(\log x)^{|q|}\le x^\eta
$$
です。

$q\le0$ なら $(\log x)^{-q}\ge1$ なので
$$
\frac1{x^p(\log x)^q}\ge\frac1{x^p},
$$
右辺が発散するため発散します。

$q>0$ なら $(\log x)^q\le x^\eta$ より
$$
\frac1{x^p(\log x)^q}
\ge\frac1{x^{p+\eta}}.
$$
しかも
$$
p+\eta=\frac{p+1}{2}<1.
$$
したがって右辺の $p$ 積分が発散し、比較により元も発散します。

以上より
$$
\boxed{
\begin{cases}
 p>1 &\Rightarrow \text{すべての }q\text{ で収束},\\
 p<1 &\Rightarrow \text{すべての }q\text{ で発散},\\
 p=1 &\Rightarrow q>1\text{ のとき、かつそのときに限り収束}.
\end{cases}}
$$

なお $\log x=o(x^\eta)$ は、例えば $\log x/x^{\eta/|q|}\to0$ をL'Hopitalの定理で確認すれば導けます。
<!-- solution-end -->

---

## 14. 次に進む

**次：[RA5 関数列・関数級数・一様収束](../RA5/index.md)**
