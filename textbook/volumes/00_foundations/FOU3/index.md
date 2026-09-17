# FOU3 連続周波数解析：変換・積・反転

FOU1–FOU2 では、$2\pi$ 周期関数を整数周波数 $n\in\mathbb Z$ に分解しました。実数全体上の非周期関数では、周波数は離散列ではなく連続変数 $\xi\in\mathbb R$ になります。本章ではその対応を

```text
Fourier変換
  ↓
平行移動・尺度変換・変調
  ↓
Riemann--Lebesgue
  ↓
畳み込み ↔ 積
  ↓
微分 ↔ 周波数の乗算
  ↓
Gaussian
  ↓
approximate identity
  ↓
Fourier反転
```

の順に構成します。

直接の Fourier 理論の前提は [FOU2](../FOU2/index.md) です。ただし実数全体上の $L^1$ 関数を扱うため、積分論については [優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)、[Fubini の定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02)、[$C_c$ の $L^1$ 稠密性](../MT7/index.md#thm-mt7-cc-dense)を既知とします。$L^2$ の完備性、完備内積空間の構造、Plancherel は本章では使わず FOU4 へ送ります。

本章の規約は

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx,
\qquad
f(x)=\frac1{2\pi}\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}\,d\xi
$$

です。$2\pi$ の置き場所は流儀により異なるので、計算ではこの規約を固定します。

---

## 1. 周期を外すと周波数が連続になる

<a id="def-fou3-fourier-transform"></a>
<!-- formal-statement-start -->
> **定義（L1 Fourier変換）**  
> $f\in L^1(\mathbb R)$ に対し

$$
\widehat f(\xi):=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx,
\qquad \xi\in\mathbb R
$$

> を $f$ の Fourier 変換という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou3-fourier-transform -->
**定義の確認：区間指示関数。** $a>0$ として $f=1_{[-a,a]}$ とすると、$\xi\ne0$ で

$$
\widehat f(\xi)
=\int_{-a}^{a}e^{-i\xi x}\,dx
=\frac{2\sin(a\xi)}{\xi}.
$$

また $\widehat f(0)=2a$ で、右辺も $\xi\to0$ で $2a$ へ近づきます。空間側で幅 $2a$ の区間は、周波数側では零点間隔がおよそ $1/a$ の波形になります。「空間を広げると周波数側は狭くなる」という逆関係がすでに見えています。
<!-- definition-example-end -->

<a id="thm-fou3-bounded-continuous"></a>
<!-- formal-statement-start -->
> **定理（Fourier変換の有界性と連続性）**  
> $f\in L^1(\mathbb R)$ なら

$$
|\widehat f(\xi)|\le\|f\|_1
$$

> が全ての $\xi$ で成り立ち、$\widehat f$ は $\mathbb R$ 上連続である。
<!-- formal-statement-end -->

### 証明の見取り図

有界性は $|e^{-i\xi x}|=1$ だけです。連続性では $\xi_n\to\xi$ とし、被積分関数の各点収束を $|f|$ で支配して[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)を使います。

<!-- proof-start -->
### 証明

まず三角不等式から

$$
|\widehat f(\xi)|
\le\int_{\mathbb R}|f(x)|\,dx
=\|f\|_1.
$$

次に $\xi_n\to\xi$ とします。各 $x$ で

$$
f(x)e^{-i\xi_nx}\to f(x)e^{-i\xi x}
$$

であり、全ての $n$ について

$$
|f(x)e^{-i\xi_nx}|=|f(x)|\in L^1.
$$

したがって[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
\widehat f(\xi_n)\to\widehat f(\xi).
$$

よって $\widehat f$ は連続です。
<!-- proof-end -->

ここでは「積分可能だから変換を定義できる」だけでなく、その同じ $L^1$ 仮定が一様な上界を与えています。一方、高周波で $0$ へ行くことはまだ出ていません。それには平行移動を使います。

---

## 2. 空間側の操作は周波数側でどう見えるか

<a id="thm-fou3-transform-rules"></a>
<!-- formal-statement-start -->
> **定理（Fourier変換の平行移動・尺度変換・変調則）**  
> $f\in L^1(\mathbb R)$ とする。
>
> 1. $g(x)=f(x-a)$ なら

$$
\widehat g(\xi)=e^{-ia\xi}\widehat f(\xi).
$$

> 2. $g(x)=e^{iax}f(x)$ なら

$$
\widehat g(\xi)=\widehat f(\xi-a).
$$

> 3. $a\ne0$、$g(x)=f(ax)$ なら

$$
\widehat g(\xi)=\frac1{|a|}\widehat f\!\left(\frac\xi a\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

三式とも新しい解析定理は不要で、積分の変数変換だけです。絶対値 $|a|$ が出るのは、$a<0$ のとき積分方向が反転するためです。

<!-- proof-start -->
### 証明

平行移動では $y=x-a$ と置けば

$$
\widehat g(\xi)
=\int f(x-a)e^{-i\xi x}dx
=e^{-ia\xi}\int f(y)e^{-i\xi y}dy.
$$

変調では

$$
\widehat g(\xi)
=\int f(x)e^{-i(\xi-a)x}dx
=\widehat f(\xi-a).
$$

尺度変換では $y=ax$ と置く。$a>0$ と $a<0$ を積分方向まで含めてまとめると $dx=dy/|a|$ の効果が現れ、

$$
\widehat g(\xi)
=\frac1{|a|}\int f(y)e^{-i(\xi/a)y}dy
=\frac1{|a|}\widehat f(\xi/a).
$$
<!-- proof-end -->

区間指示関数を $f(ax)$ にすると空間側の幅は $1/|a|$ 倍ですが、周波数引数は $\xi/a$ となり周波数側は $|a|$ 倍に広がります。Fourier 解析で頻出する「局在と周波数幅の逆関係」の最初の形です。

---

## 3. $L^1$ 平行移動連続性と Riemann--Lebesgue

<a id="lem-fou3-l1-translation"></a>
<!-- formal-statement-start -->
> **補題（L1の平行移動連続性）**  
> $f\in L^1(\mathbb R)$ に対し $(\tau_hf)(x)=f(x-h)$ と置くと

$$
\|\tau_hf-f\|_1\to0\qquad(h\to0)
$$

> が成り立つ。
<!-- formal-statement-end -->

### なぜ $C_c$ へ落とすのか

一般の $L^1$ 関数には点ごとの連続性がありません。しかし [$C_c(\mathbb R)$ の $L^1$ 稠密性](../MT7/index.md#thm-mt7-cc-dense)により、まず連続かつコンパクト台の関数で証明し、その誤差を $L^1$ ノルムで一般関数へ戻せます。

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ を取ります。$C_c$ の $L^1$ 稠密性から $g\in C_c(\mathbb R)$ を

$$
\|f-g\|_1<\varepsilon
$$

となるように選びます。平行移動は $L^1$ ノルムを保つため

$$
\|\tau_hf-f\|_1
\le2\|f-g\|_1+\|\tau_hg-g\|_1.
$$

$g$ の台を $[-R,R]$ に含めます。$|h|\le1$ なら $\tau_hg-g$ の台は $[-R-1,R+1]$ に含まれます。$g$ は一様連続なので

$$
\sup_x|g(x-h)-g(x)|\to0.
$$

従って

$$
\|\tau_hg-g\|_1
\le(2R+2)\sup_x|g(x-h)-g(x)|\to0.
$$

十分小さい $h$ では右辺は $3\varepsilon$ 未満です。$\varepsilon$ は任意なので結論が従います。
<!-- proof-end -->

<a id="thm-fou3-riemann-lebesgue"></a>
<!-- formal-statement-start -->
> **定理（Riemann--Lebesgueの補題）**  
> $f\in L^1(\mathbb R)$ なら

$$
\widehat f(\xi)\to0\qquad(|\xi|\to\infty)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の核心：半周期ずらして符号を反転させる

高周波の指数関数は短い距離だけずらすと符号が反転します。その距離が $|\xi|\to\infty$ で $0$ へ縮むため、直前の平行移動連続性と噛み合います。

<!-- proof-start -->
### 証明

$\xi\ne0$ とし

$$
h=\frac{\pi}{\xi}
$$

と置きます。すると $e^{i\xi h}=-1$ です。変数変換により

$$
\int f(x+h)e^{-i\xi x}dx
=e^{i\xi h}\widehat f(\xi)
=-\widehat f(\xi).
$$

したがって

$$
2\widehat f(\xi)
=\int\{f(x)-f(x+h)\}e^{-i\xi x}dx,
$$

ゆえに

$$
2|\widehat f(\xi)|
\le\|f-\tau_{-h}f\|_1.
$$

$|\xi|\to\infty$ なら $h\to0$ なので、$L^1$ 平行移動連続性から右辺は $0$ へ収束します。
<!-- proof-end -->

つまり $L^1$ Fourier 変換は「有界・連続・無限遠で0」です。ただし、その逆に任意の連続で無限遠で0となる関数が Fourier 変換になるわけではありません。

---

## 4. 畳み込み：空間側の混合が周波数側の積になる

<a id="def-fou3-convolution"></a>
<!-- formal-statement-start -->
> **定義（畳み込み）**  
> $f,g\in L^1(\mathbb R)$ に対し

$$
(f*g)(x):=\int_{\mathbb R}f(x-y)g(y)\,dy
$$

> と置く。右辺は ほとんど至る所（almost everywhere; a.e.） $x$ で有限であり、得られる関数を $f$ と $g$ の **畳み込み** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou3-convolution -->
**定義の確認：区間の重なり。** $f=g=1_{[-1/2,1/2]}$ とします。このとき $(f*g)(x)$ は

$$
[-1/2,1/2]\cap[x-1/2,x+1/2]
$$

の長さなので

$$
(f*g)(x)=
\begin{cases}
1-|x|,&|x|\le1,\\
0,&|x|>1.
\end{cases}
$$

積分が抽象記号ではなく「ずらした二つの区間の重なり」を測っていることが見えます。
<!-- definition-example-end -->

<a id="thm-fou3-convolution"></a>
<!-- formal-statement-start -->
> **定理（L1畳み込みと畳み込み定理）**  
> $f,g\in L^1(\mathbb R)$ なら $f*g\in L^1(\mathbb R)$ で

$$
\|f*g\|_1\le\|f\|_1\|g\|_1.
$$

> さらに全ての $\xi\in\mathbb R$ について

$$
\widehat{f*g}(\xi)=\widehat f(\xi)\widehat g(\xi).
$$
<!-- formal-statement-end -->

### 証明の見取り図

積分順序を交換する前に、二重積分の絶対値が有限であることを確認します。同じ評価が $f*g\in L^1$ と Fubini の適用条件を同時に与えます。

<!-- proof-start -->
### 証明

Tonelli の定理と $z=x-y$ により

$$
\begin{aligned}
\int\int|f(x-y)g(y)|\,dy\,dx
&=\int |g(y)|\left(\int|f(x-y)|dx\right)dy\\
&=\|f\|_1\|g\|_1<\infty.
\end{aligned}
$$

従って内側の積分は a.e. $x$ で有限で、さらに

$$
\|f*g\|_1
\le\|f\|_1\|g\|_1.
$$

固定した $\xi$ についても

$$
|f(x-y)g(y)e^{-i\xi x}|=|f(x-y)g(y)|
$$

なので Fubini が使えます。$z=x-y$ と置けば

$$
\begin{aligned}
\widehat{f*g}(\xi)
&=\iint f(x-y)g(y)e^{-i\xi x}\,dy\,dx\\
&=\iint f(z)g(y)e^{-i\xi(z+y)}\,dz\,dy\\
&=\widehat f(\xi)\widehat g(\xi).
\end{aligned}
$$
<!-- proof-end -->

独立な確率変数の和で特性関数が積になる構造も、この畳み込み定理と同じです。確率論としての整理は FOU5 に回します。

---

## 5. 微分は周波数側で掛け算になる

<a id="thm-fou3-derivative-rule"></a>
<!-- formal-statement-start -->
> **定理（Fourier変換と微分）**  
> $f\in C_c^1(\mathbb R)$ なら

$$
\widehat{f'}(\xi)=i\xi\widehat f(\xi).
$$

> さらに $f\in C_c^2(\mathbb R)$ なら

$$
\widehat{f''}(\xi)=-\xi^2\widehat f(\xi).
$$
<!-- formal-statement-end -->

### 証明の見取り図

部分積分で境界項が消えることが全てです。「十分滑らかだから」と省略せず、ここではコンパクト台という明確な仮定で境界項を消します。

<!-- proof-start -->
### 証明

$f\in C_c^1$ なら

$$
\begin{aligned}
\widehat{f'}(\xi)
&=\int f'(x)e^{-i\xi x}dx\\
&=[f(x)e^{-i\xi x}]_{-\infty}^{\infty}
+i\xi\int f(x)e^{-i\xi x}dx\\
&=i\xi\widehat f(\xi).
\end{aligned}
$$

$f\in C_c^2$ なら $f'\in C_c^1$ に同じ式をもう一度適用し、

$$
\widehat{f''}(\xi)=i\xi\widehat{f'}(\xi)=-\xi^2\widehat f(\xi)
$$

を得ます。
<!-- proof-end -->

この対応が、後の PDE で空間微分を周波数ごとの代数式へ変える仕組みです。

---

## 6. Gaussian は空間側でも周波数側でも Gaussian

<a id="lem-fou3-gaussian-transform"></a>
<!-- formal-statement-start -->
> **補題（GaussianのFourier変換）**  
> $a>0$ とし $g_a(x)=e^{-ax^2}$ とする。このとき

$$
\widehat g_a(\xi)
=\sqrt{\frac\pi a}\exp\!\left(-\frac{\xi^2}{4a}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\xi$ を変数とする積分 $I(\xi)$ を微分すると、$x e^{-x^2}$ が現れます。これは $(e^{-x^2})'=-2xe^{-x^2}$ なので部分積分でき、$I$ 自身の一階 ODE が出ます。

<!-- proof-start -->
### 証明

まず $a=1$ とし

$$
I(\xi)=\int_{\mathbb R}e^{-x^2}e^{-i\xi x}\,dx
$$

と置きます。$|x|e^{-x^2}\in L^1$ なので[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により積分記号下で微分でき、

$$
I'(\xi)=-i\int xe^{-x^2}e^{-i\xi x}\,dx.
$$

$(e^{-x^2})'=-2xe^{-x^2}$ を代入して部分積分すると、境界項は Gaussian の減衰で消え、

$$
I'(\xi)=-\frac\xi2 I(\xi).
$$

また Gaussian 積分から $I(0)=\sqrt\pi$ です。従って

$$
I(\xi)=\sqrt\pi e^{-\xi^2/4}.
$$

一般の $a>0$ は $e^{-ax^2}=g_1(\sqrt a\,x)$ と尺度変換則から

$$
\widehat g_a(\xi)
=\frac1{\sqrt a}\sqrt\pi
\exp\!\left(-\frac{(\xi/\sqrt a)^2}{4}\right)
$$

となります。
<!-- proof-end -->

Gaussian が特別なのは、変換後も同じ型に留まることです。次節ではこれを「周波数側の滑らかなカットオフ」と「空間側の原点集中」の両方に使います。

---

## 7. 原点へ集中する核で関数を平均する

<a id="def-fou3-approximate-identity"></a>
<!-- formal-statement-start -->
> **定義（approximate identity）**  
> $\varepsilon>0$ で添字付けられた $L^1(\mathbb R)$ 関数族 $(k_\varepsilon)$ が
>
> 1. $k_\varepsilon\ge0$ a.e.,
> 2. $\int_{\mathbb R}k_\varepsilon(x)dx=1$,
> 3. 任意の $\delta>0$ に対し

$$
\int_{|x|\ge\delta}k_\varepsilon(x)dx\to0
\qquad(\varepsilon\downarrow0)
$$

> を満たすとき、$(k_\varepsilon)$ を approximate identity という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou3-approximate-identity -->
**定義の確認：Gaussian 核。**

$$
k_\varepsilon(x)
:=\frac1{2\sqrt{\pi\varepsilon}}
\exp\!\left(-\frac{x^2}{4\varepsilon}\right)
$$

とします。非負性は明らかです。$x=2\sqrt\varepsilon\,u$ と置けば

$$
\int k_\varepsilon(x)dx
=\frac1{\sqrt\pi}\int_{\mathbb R}e^{-u^2}du=1.
$$

さらに固定した $\delta>0$ に対し

$$
\int_{|x|\ge\delta}k_\varepsilon(x)dx
=\frac1{\sqrt\pi}
\int_{|u|\ge\delta/(2\sqrt\varepsilon)}e^{-u^2}du\to0.
$$

したがって三条件を全て満たします。また Gaussian の変換公式から

$$
\widehat{k_\varepsilon}(\xi)=e^{-\varepsilon\xi^2}.
$$
<!-- definition-example-end -->

<a id="thm-fou3-gaussian-approximation"></a>
<!-- formal-statement-start -->
> **定理（Gaussian approximate identity）**  
> 上の Gaussian 核 $k_\varepsilon$ に対し、$f\in L^1(\mathbb R)$ なら

$$
\|f*k_\varepsilon-f\|_1\to0.
$$

> さらに $f$ が点 $x$ で連続なら

$$
(f*k_\varepsilon)(x)\to f(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$L^1$ 収束では

$$
f*k_\varepsilon-f
=\int k_\varepsilon(y)(\tau_yf-f)dy
$$

と見て、$|y|<\delta$ では平行移動連続性、遠方では Gaussian の質量集中を使います。点ごとの収束では連続点近傍と遠方を分けます。

<!-- proof-start -->
### 証明

まず Minkowski 型の積分評価と平行移動不変性から

$$
\|f*k_\varepsilon-f\|_1
\le\int k_\varepsilon(y)\|\tau_yf-f\|_1dy.
$$

任意の $\eta>0$ に対し、平行移動連続性から $|y|<\delta$ なら $\|\tau_yf-f\|_1<\eta$ となる $\delta>0$ を取れます。一方常に

$$
\|\tau_yf-f\|_1\le2\|f\|_1.
$$

従って

$$
\|f*k_\varepsilon-f\|_1
\le\eta+2\|f\|_1
\int_{|y|\ge\delta}k_\varepsilon(y)dy.
$$

$\varepsilon\downarrow0$ の後に $\eta\downarrow0$ とすれば $L^1$ 収束を得ます。

次に $f$ が $x$ で連続とします。

$$
(f*k_\varepsilon)(x)-f(x)
=\int k_\varepsilon(z)\{f(x-z)-f(x)\}dz.
$$

任意の $\eta>0$ に対し、$|z|<\delta$ で $|f(x-z)-f(x)|<\eta$ とできます。近傍部分は $\eta$ 以下です。遠方部分では

$$
\int_{|z|\ge\delta}k_\varepsilon(z)|f(x-z)|dz
\le
\left(\sup_{|z|\ge\delta}k_\varepsilon(z)\right)\|f\|_1\to0,
$$

かつ

$$
|f(x)|\int_{|z|\ge\delta}k_\varepsilon(z)dz\to0.
$$

Gaussian では固定した $\delta>0$ に対する遠方の上限も $0$ へ行くため、点ごとの収束が従います。
<!-- proof-end -->

「積分平均で元へ戻る」というこの結果が Fourier 反転の最後の一歩になります。

---

## 8. Fourier反転：周波数から元の関数へ戻る

<a id="thm-fou3-inversion"></a>
<!-- formal-statement-start -->
> **定理（Fourier反転定理）**  
> $f\in L^1(\mathbb R)$ が連続で、さらに $\widehat f\in L^1(\mathbb R)$ とする。このとき全ての $x\in\mathbb R$ について

$$
f(x)=\frac1{2\pi}
\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}\,d\xi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

いきなり逆積分を $f$ と同一視しません。まず周波数側へ Gaussian $e^{-\varepsilon\xi^2}$ を掛けて絶対可積分な二重積分を作ります。Fubini で空間側へ戻すと、それは $f*k_\varepsilon$ です。最後に $\varepsilon\downarrow0$ とします。

<!-- proof-start -->
### 証明

$\varepsilon>0$ に対し

$$
I_\varepsilon(x)
:=\frac1{2\pi}
\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}e^{-\varepsilon\xi^2}d\xi
$$

と置きます。$\widehat f\in L^1$ なので[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)により

$$
I_\varepsilon(x)
\to\frac1{2\pi}\int\widehat f(\xi)e^{i\xi x}d\xi.
$$

一方、Fourier 変換の定義を代入すると

$$
I_\varepsilon(x)
=\frac1{2\pi}\iint
f(y)e^{-i\xi y}e^{i\xi x}e^{-\varepsilon\xi^2}
\,dy\,d\xi.
$$

二重積分の絶対値は

$$
\iint |f(y)|e^{-\varepsilon\xi^2}dy\,d\xi
=\|f\|_1\int e^{-\varepsilon\xi^2}d\xi<\infty
$$

ですから Fubini を使えます。Gaussian の変換公式を $a=\varepsilon$ に適用すると

$$
\frac1{2\pi}\int e^{-\varepsilon\xi^2}e^{i\xi(x-y)}d\xi
=k_\varepsilon(x-y).
$$

従って

$$
I_\varepsilon(x)
=\int f(y)k_\varepsilon(x-y)dy
=(f*k_\varepsilon)(x).
$$

$f$ は $x$ で連続なので [Gaussian approximate identity](#thm-fou3-gaussian-approximation) から

$$
I_\varepsilon(x)\to f(x).
$$

二つの極限を比較すれば反転公式が従います。
<!-- proof-end -->

ここで三つの仮定の役割を分離できます。

- $f\in L^1$：$\widehat f$ の定義と Fubini の絶対可積分性に使う。
- $\widehat f\in L^1$：周波数側で Gaussian を外す優収束定理に使う。
- $f$ の連続性：$f*k_\varepsilon$ がその点の $f(x)$ へ戻ることに使う。

「Fourier変換は可逆」と一言で言う背後に、これだけの機構があります。

---

## 9. 代表的な変換対：$e^{-|x|}$

$f(x)=e^{-|x|}$ は偶関数なので

$$
\begin{aligned}
\widehat f(\xi)
&=2\int_0^\infty e^{-x}\cos(\xi x)dx\\
&=2\operatorname{Re}\frac1{1-i\xi}\\
&=\boxed{\frac{2}{1+\xi^2}}.
\end{aligned}
$$

空間側も周波数側も $L^1$ なので反転定理をそのまま使えます。例えば $x=0$ では

$$
1=\frac1{2\pi}\int_{\mathbb R}\frac{2}{1+\xi^2}d\xi,
$$

となり、よく知られた $\int_{\mathbb R}(1+\xi^2)^{-1}d\xi=\pi$ と整合します。

---

## 10. FOU2・PDE・FOU4 への接続

周期関数では周波数は $n\in\mathbb Z$ に離散化され、FOU2 の Fourier 級数になります。実数全体では $\xi\in\mathbb R$ が連続に動きます。

```text
周期領域                 実数全体
Fourier級数              Fourier変換
離散周波数 n             連続周波数 ξ
係数の和                 周波数積分
```

さらに

$$
\frac d{dx}\longleftrightarrow i\xi,
\qquad
-\frac{d^2}{dx^2}\longleftrightarrow \xi^2
$$

なので、熱方程式や波動方程式を各周波数ごとの ODE へ分解できます。この応用は PDE 系列で扱います。

本章では $L^1$ だけで反転まで進みましたが、$L^2$ 関数には $L^1$ でないものも多くあります。Fourier変換を $L^2$ 全体へ延長し、ノルムを保つユニタリ作用素として理解するのが FOU4 の役割です。

---

# 演習

## FOU3-A01 区間指示関数と尺度

- Level: A
- 目安時間: 10分

$a>0$、$f_a=1_{[-a,a]}$ とする。$\widehat f_a$ を求め、$a$ を2倍にしたとき空間側と周波数側の幅がどう変わるか説明せよ。

<!-- solution-start -->
### 詳細解答

$\xi\ne0$ では

$$
\widehat f_a(\xi)
=\int_{-a}^{a}e^{-i\xi x}dx
=\frac{2\sin(a\xi)}{\xi},
$$

$\xi=0$ では $\widehat f_a(0)=2a$ です。零点は

$$
a\xi=k\pi\quad(k\in\mathbb Z\setminus\{0\})
$$

すなわち $\xi=k\pi/a$ にあります。$a$ を2倍にすると空間側の区間幅は2倍、周波数側の零点間隔は1/2倍になります。空間側で広がるほど周波数側では狭まります。
<!-- solution-end -->

## FOU3-A02 $e^{-|x|}$ の Fourier変換

- Level: A
- 目安時間: 10分

$f(x)=e^{-|x|}$ の Fourier 変換を求めよ。

<!-- solution-start -->
### 詳細解答

$f$ は偶関数なので虚部は奇関数として消え、

$$
\widehat f(\xi)
=2\int_0^\infty e^{-x}\cos(\xi x)dx.
$$

複素積分

$$
\int_0^\infty e^{-(1-i\xi)x}dx=\frac1{1-i\xi}
$$

の実部を取れば

$$
\int_0^\infty e^{-x}\cos(\xi x)dx
=\frac1{1+\xi^2}.
$$

従って

$$
\boxed{\widehat f(\xi)=\frac2{1+\xi^2}}.
$$
<!-- solution-end -->

## FOU3-A03 区間指示関数の畳み込み

- Level: A
- 目安時間: 10分

$f=1_{[-1/2,1/2]}$ とする。$f*f$ を定義から求めよ。

<!-- solution-start -->
### 詳細解答

$$
(f*f)(x)=\int1_{[-1/2,1/2]}(x-y)1_{[-1/2,1/2]}(y)dy
$$

は、$y$ が同時に

$$
y\in[-1/2,1/2],
\qquad y\in[x-1/2,x+1/2]
$$

を満たす部分の長さです。二区間の重なりは $|x|\le1$ で長さ $1-|x|$、$|x|>1$ では空です。従って

$$
\boxed{(f*f)(x)=(1-|x|)_+}.
$$
<!-- solution-end -->

## FOU3-A04 平行移動と変調

- Level: A
- 目安時間: 12分

$f\in L^1(\mathbb R)$ とし

$$
g(x)=e^{ibx}f(x-a)
$$

とする。$\widehat g(\xi)$ を $\widehat f$ で表せ。

<!-- solution-start -->
### 詳細解答

まず $h(x)=f(x-a)$ とすると

$$
\widehat h(\eta)=e^{-ia\eta}\widehat f(\eta).
$$

次に $g(x)=e^{ibx}h(x)$ なので変調則から

$$
\widehat g(\xi)=\widehat h(\xi-b).
$$

従って

$$
\boxed{
\widehat g(\xi)
=e^{-ia(\xi-b)}\widehat f(\xi-b)
}.
$$

平行移動による位相因子の周波数には、変調後の $\xi-b$ が入る点に注意します。
<!-- solution-end -->

## FOU3-B01 $L^1$ 平行移動連続性を再構成する

- Level: B
- 目安時間: 18分

$C_c(\mathbb R)$ が $L^1(\mathbb R)$ に稠密であることを使い、任意の $f\in L^1$ に対して $\|\tau_hf-f\|_1\to0$ を証明せよ。$g\in C_c$ の場合に積分区間を有限にできる理由も書け。

<!-- solution-start -->
### 詳細解答

任意の $\varepsilon>0$ に対し $g\in C_c$ を $\|f-g\|_1<\varepsilon$ となるよう取ります。平行移動はノルムを保つので

$$
\|\tau_hf-f\|_1
\le2\varepsilon+\|\tau_hg-g\|_1.
$$

$\operatorname{supp}g\subset[-R,R]$ とします。$|h|\le1$ なら $g(x-h)$ の台は $[-R-1,R+1]$ に含まれ、$g(x)$ との差もこの有限区間外では0です。したがって

$$
\|\tau_hg-g\|_1
\le(2R+2)\sup_x|g(x-h)-g(x)|.
$$

連続かつコンパクト台の $g$ は一様連続なので右辺は $h\to0$ で0へ行きます。よって

$$
\limsup_{h\to0}\|\tau_hf-f\|_1\le2\varepsilon.
$$

$\varepsilon$ は任意なので極限は0です。
<!-- solution-end -->

## FOU3-B02 半周期シフトから高周波消去を示す

- Level: B
- 目安時間: 15分

$f\in L^1(\mathbb R)$ とする。$h=\pi/\xi$ を用いて Riemann--Lebesgue の補題を証明せよ。なぜ $|\xi|\to\infty$ が $L^1$ 平行移動連続性へ接続するのか明示せよ。

<!-- solution-start -->
### 詳細解答

$\xi\ne0$ とし $h=\pi/\xi$ とすると $e^{i\xi h}=-1$ です。変数変換により

$$
\int f(x+h)e^{-i\xi x}dx=-\widehat f(\xi).
$$

元の式と引き算すれば

$$
2\widehat f(\xi)
=\int(f(x)-f(x+h))e^{-i\xi x}dx.
$$

従って

$$
2|\widehat f(\xi)|
\le\|f-\tau_{-h}f\|_1.
$$

$|\xi|\to\infty$ なら $|h|=\pi/|\xi|\to0$ です。したがって $L^1$ 平行移動連続性により右辺は0へ行き、$\widehat f(\xi)\to0$ を得ます。
<!-- solution-end -->

## FOU3-B03 Gaussian正則化を空間側へ戻す

- Level: B
- 目安時間: 20分

$f\in L^1(\mathbb R)$ とし

$$
I_\varepsilon(x)
=\frac1{2\pi}\int\widehat f(\xi)e^{i\xi x}e^{-\varepsilon\xi^2}d\xi
$$

とする。$I_\varepsilon(x)=(f*k_\varepsilon)(x)$ を、Fubini の適用条件と定数 $2\pi$ を省略せず示せ。

<!-- solution-start -->
### 詳細解答

$\widehat f$ の定義を代入すると

$$
I_\varepsilon(x)
=\frac1{2\pi}\iint
f(y)e^{i\xi(x-y)}e^{-\varepsilon\xi^2}dy\,d\xi.
$$

絶対値の二重積分は

$$
\iint|f(y)|e^{-\varepsilon\xi^2}dy\,d\xi
=\|f\|_1\sqrt{\frac\pi\varepsilon}<\infty
$$

なので Fubini が使えます。積分順序を交換し、Gaussian 変換公式から

$$
\int e^{-\varepsilon\xi^2}e^{i\xi(x-y)}d\xi
=\sqrt{\frac\pi\varepsilon}
\exp\!\left(-\frac{(x-y)^2}{4\varepsilon}\right)
=2\pi k_\varepsilon(x-y).
$$

従って外側の $1/(2\pi)$ と相殺して

$$
I_\varepsilon(x)
=\int f(y)k_\varepsilon(x-y)dy
=(f*k_\varepsilon)(x).
$$
<!-- solution-end -->

## FOU3-C01 三角形関数から $\int(\sin u/u)^2du$ を求める

- Level: C
- 目安時間: 30分

$f=1_{[-1/2,1/2]}$、$T=f*f=(1-|x|)_+$ とする。

1. 畳み込み定理から $\widehat T(\xi)$ を求めよ。
2. $T$ が Fourier 反転定理の仮定を満たすことを確認せよ。
3. $x=0$ で反転公式を使い

$$
\int_{-\infty}^{\infty}\left(\frac{\sin u}{u}\right)^2du
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\widehat f(\xi)
=\int_{-1/2}^{1/2}e^{-i\xi x}dx
=\frac{2\sin(\xi/2)}{\xi}
$$

です。畳み込み定理により

$$
\boxed{
\widehat T(\xi)
=\left(\frac{2\sin(\xi/2)}{\xi}\right)^2
}.
$$

$T$ は $[-1,1]$ に台を持つ連続関数なので $T\in L^1$ です。また $\widehat T$ は $\xi=0$ 近傍では連続で有限、$|\xi|\ge1$ では

$$
0\le\widehat T(\xi)\le\frac4{\xi^2}
$$

なので $\widehat T\in L^1$ です。従って Fourier 反転定理を適用できます。

$x=0$ では $T(0)=1$ だから

$$
1
=\frac1{2\pi}\int_{\mathbb R}
\left(\frac{2\sin(\xi/2)}{\xi}\right)^2d\xi.
$$

$u=\xi/2$、$d\xi=2du$ と置くと

$$
1
=\frac1{2\pi}\,2
\int_{\mathbb R}\left(\frac{\sin u}{u}\right)^2du.
$$

従って

$$
\boxed{
\int_{-\infty}^{\infty}
\left(\frac{\sin u}{u}\right)^2du=\pi
}.
$$

ここでは「区間指示関数の変換 → 畳み込み → 周波数側の二乗 → 反転」という本章全体の流れを一度に使っています。
<!-- solution-end -->

---

# 章末チェック

- Fourier級数の離散周波数と Fourier変換の連続周波数の違いを説明できるか。
- $L^1$ 仮定から $\widehat f$ の有界性・連続性を証明できるか。
- 平行移動・変調・尺度変換の三公式を変数変換から導けるか。
- $C_c$ 稠密性から $L^1$ 平行移動連続性を再構成できるか。
- 半周期シフトが Riemann--Lebesgue の補題を生む理由を説明できるか。
- 畳み込み定理で [Fubini](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使う前に絶対可積分性を確認できるか。
- 微分公式で境界項が消える仮定を言えるか。
- Gaussian の変換を一階 ODE へ落として計算できるか。
- approximate identity の三条件を Gaussian 核で確認できるか。
- Fourier反転で $f\in L^1$、$\widehat f\in L^1$、連続性をそれぞれどこで使うか説明できるか。

次章 FOU4 では、この $L^1$ 理論を足場に Fourier変換を $L^2$ 全体へ延長し、Plancherel 等式とユニタリ性を扱います。
