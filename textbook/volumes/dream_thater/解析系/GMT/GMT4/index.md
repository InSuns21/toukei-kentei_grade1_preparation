# GMT4 Fourier表示によるenergy法

<!-- definition-example-audit: strict -->

[GMT3のRiesz energy](../GMT3/index.md#def-gmt3-riesz-energy)は、測度から独立に取った二点の距離を $|x-y|^{-s}$ で重み付けします。球の質量を積分する方法は幾何的ですが、次のMarstrand射影の議論で方向ごとに積分するときは、二点の差よりも周波数で表す方が便利です。

ただし $|x|^{-s}$ は無限遠で積分できず、測度そのものにも密度があるとは限りません。**核をそのまま $L^1$ Fourier変換したり、測度へ無条件にPlancherelを使ったりはできません**。本講ではGaussianを介してこの二つの障害を処理します。

本章では $d\ge1$、$0<s<d$ とし、$\mu$ は $\mathbb R^d$ 上の非負有限Borel測度とします。$\mu$ の全質量を $M=\mu(\mathbb R^d)$ と書きます。零測度も許し、$I_s(0)=0$ とします。

計算にはGauss積分、[FOU3のGaussian変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)、[FOU4のPlancherel等式](../../FOU/FOU4/index.md#thm-fou4-plancherel-core)を使います。必要な多変数化と極限交換は本文で確認します。

## 1. 関数ではなく測度を周波数へ移す

[FOU5の有限測度のFourier変換](../../FOU/FOU5/index.md#def-fou5-measure-transform)は、$\mathbb R$ 上で密度のない測度にも定義できました。GMTでは空間が $\mathbb R^d$ なので、同じ角周波数規約を各座標の積 $e^{-ix\cdot\xi}$ へ拡張します。新しく学ぶのはFourier変換そのものの別定義ではなく、その多変数化とenergyへの適用です。

<a id="def-gmt4-fourier-measure"></a>

<!-- formal-statement-start -->
> **定義（多変数有限測度のFourier変換）**  
> $d\ge1$ とし、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。任意の $\xi\in\mathbb R^d$ に対し

$$
\widehat\mu(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}\,d\mu(x)
$$

> を $\mu$ のFourier変換と定める。内積は $x\cdot\xi=\sum_{j=1}^d x_j\xi_j$、逆変換の規格化は $(2\pi)^{-d}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt4-fourier-measure -->
**定義の確認**

点質量と区間を比べます。

$\mu=\delta_a$ なら積分の定義から $\widehat{\delta_a}(\xi)=e^{-ia\cdot\xi}$ であり、絶対値は全周波数で1です。一方、$d=1$ で $[0,1]$ のLebesgue確率測度 $\lambda$ は

$$
\widehat\lambda(\xi)=\int_0^1e^{-ix\xi}dx
=\begin{cases}(1-e^{-i\xi})/(i\xi)&(\xi\ne0),\\1&(\xi=0),\end{cases}
$$

となります。$\xi=0$ の値は積分から1であり、右側の極限とも一致します。前者は原子、後者は密度を持つ測度ですが、どちらにも同じ定義が使えました。
<!-- definition-example-end -->

<a id="lem-gmt4-measure-fourier-bounds"></a>

<!-- formal-statement-start -->
> **補題（有限測度のFourier変換の有界性・連続性）**  
> $d\ge1$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度、$M=\mu(\mathbb R^d)$ とする。このとき $\widehat\mu$ は全 $\mathbb R^d$ で連続であり、$|\widehat\mu(\xi)|\le M$、$\widehat\mu(0)=M$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

絶対値は $|e^{-ix\cdot\xi}|=1$ から制御できます。周波数の収束については被積分関数が点ごとに収束し、定数1で優越されることを使います。

<!-- proof-start -->
### 証明

三角不等式から

$$
|\widehat\mu(\xi)|\le\int|e^{-ix\cdot\xi}|\,d\mu(x)=M.
$$

$\xi_n\to\xi$ なら全ての $x$ で $e^{-ix\cdot\xi_n}\to e^{-ix\cdot\xi}$ です。実部・虚部に[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用します。優越関数1は有限測度 $\mu$ に関して積分可能なので、$\widehat\mu(\xi_n)\to\widehat\mu(\xi)$ です。$\xi=0$ では指数関数が1となり、$\widehat\mu(0)=M$ です。$\square$
<!-- proof-end -->

## 2. Gaussianが核と測度の両方をつなぐ

Riesz核は $k_s(z)=|z|^{-s}$（$z=0$ で $+\infty$）です。まず $r^{-s}$ をGaussianの積分として書くと、扱いにくい特異核を可積分な関数の積分に分解できます。Gamma関数 $\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}du$（$a>0$）は[HA7の定義](../../HA/HA7/index.md#def-ha7-riesz-potential)で使う正規化とも整合します。

<a id="lem-gmt4-gaussian-mixture"></a>

<!-- formal-statement-start -->
> **補題（Riesz核のGaussian積分表示）**  
> $d\ge1$、$0<s<d$ とし、$z\in\mathbb R^d$ とする。$z=0$ では両辺を $+\infty$ と読む約束の下で

$$
|z|^{-s}=\frac1{\Gamma(s/2)}\int_0^\infty
t^{s/2-1}e^{-t|z|^2}\,dt.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$z\ne0$ では $u=t|z|^2$ の置換でGamma積分になります。$z=0$ では大きな $t$ で発散することを確認します。

<!-- proof-start -->
### 証明

$z\ne0$ とし $u=t|z|^2$、$dt=|z|^{-2}du$ と置くと

$$
\begin{aligned}
\int_0^\infty t^{s/2-1}e^{-t|z|^2}dt
&=|z|^{-s}\int_0^\infty u^{s/2-1}e^{-u}du\\
&=|z|^{-s}\Gamma(s/2).
\end{aligned}
$$

$z=0$ では $\int_1^\infty t^{s/2-1}dt=\infty$（$s>0$）です。従って全点で拡張実数値の等式が成立します。$\square$
<!-- proof-end -->

次に測度を滑らかな関数へ移します。$\varepsilon>0$ に対して

$$
\rho_\varepsilon(x)=(4\pi\varepsilon)^{-d/2}
\exp\!\left(-\frac{|x|^2}{4\varepsilon}\right)
$$

は積分1の非負Gaussianです。$f_\varepsilon=\rho_\varepsilon*\mu$ は $f_\varepsilon(x)=\int\rho_\varepsilon(x-y)d\mu(y)$ という具体的な関数で、$\mu$ 自身に密度を仮定する必要はありません。

<a id="def-gmt4-gaussian-regularization"></a>

<!-- formal-statement-start -->
> **定義（測度のGaussian正則化）**  
> $d\ge1$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とし、$\varepsilon>0$ とする。上の $\rho_\varepsilon$ によって

$$
f_\varepsilon(x)=\int_{\mathbb R^d}\rho_\varepsilon(x-y)\,d\mu(y)
$$

> と定める。$f_\varepsilon\,dx$ が正則化後の測度であり、$f_\varepsilon$ はそのLebesgue密度である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt4-gaussian-regularization -->
**定義の確認**

点質量を正則化します。

$\mu=\delta_a$ なら積分は $f_\varepsilon(x)=\rho_\varepsilon(x-a)$ です。この関数は各点で有限・非負で、$\int f_\varepsilon dx=1$ となり、質量1を保ちます。$\varepsilon\downarrow0$ で $a$ から離れた点では0へ近づきますが、$f_\varepsilon(a)=(4\pi\varepsilon)^{-d/2}\to\infty$ です。**密度の点ごとの収束**を $\delta_a$ の密度と誤解してはいけません。
<!-- definition-example-end -->

<a id="lem-gmt4-heat-fourier"></a>

<!-- formal-statement-start -->
> **補題（Gaussian正則化のFourier変換）**  
> $d\ge1$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度、$\varepsilon>0$ とする。$f_\varepsilon=\rho_\varepsilon*\mu$ は $L^1(\mathbb R^d)\cap L^2(\mathbb R^d)$ に属し、$\int f_\varepsilon dx=M$ で、

$$
\widehat{f_\varepsilon}(\xi)=e^{-\varepsilon|\xi|^2}\widehat\mu(\xi).
$$
<!-- formal-statement-end -->

### 証明の見取り図

正則化は測度とGaussianの畳み込みです。非負性で[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)、絶対可積分性で[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を使って順序を交換し、Gaussianの変換を掛けます。$L^2$ は $L^1$ と有界性を掛け合わせて示します。

<!-- proof-start -->
### 証明

[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)から

$$
\int f_\varepsilon(x)dx
=\int\left(\int\rho_\varepsilon(x-y)dx\right)d\mu(y)=M.
$$

また $0\le f_\varepsilon(x)\le M(4\pi\varepsilon)^{-d/2}$ なので

$$
\int f_\varepsilon(x)^2dx\le
M(4\pi\varepsilon)^{-d/2}\int f_\varepsilon(x)dx<\infty.
$$

$\int\int\rho_\varepsilon(x-y)d\mu(y)dx=M<\infty$ ですから、複素値でも[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を使用できます。$u=x-y$ と置き、一次元の[GaussianのFourier変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を各座標に積として適用すると

$$
\begin{aligned}
\widehat f_\varepsilon(\xi)
&=\int\!\int e^{-i(u+y)\cdot\xi}\rho_\varepsilon(u)\,du\,d\mu(y)\\
&=\left(\prod_{j=1}^d e^{-\varepsilon\xi_j^2}\right)
\int e^{-iy\cdot\xi}d\mu(y)\\
&=e^{-\varepsilon|\xi|^2}\widehat\mu(\xi).
\end{aligned}
$$

座標ごとの積分分離もGaussianの絶対可積分性によって正当です。$\square$
<!-- proof-end -->

## 3. Gaussian二点平均を周波数へ書き換える

核をすぐ変換する代わりに、$t>0$ を固定し

$$
A_\mu(t)=\iint e^{-t|x-y|^2}\,d\mu(x)d\mu(y)
$$

を考えます。$0\le A_\mu(t)\le M^2$ で、Gaussianは $L^1$ なのでFourier反転が正当化できます。

<a id="lem-gmt4-gaussian-pair"></a>

<!-- formal-statement-start -->
> **補題（Gaussian二点平均のFourier表示）**  
> $d\ge1$、$t>0$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。このとき

$$
A_\mu(t)=\frac1{(2\pi)^d}\left(\frac\pi t\right)^{d/2}
\int_{\mathbb R^d}e^{-|\xi|^2/(4t)}
|\widehat\mu(\xi)|^2\,d\xi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$e^{-t|z|^2}$ の逆Fourier表示を $z=x-y$ に代入し、測度と周波数の三重積分を交換します。正当化に使うのは $\widehat\mu$ の有界性とGaussianの可積分性であり、測度へのPlancherelではありません。

<!-- proof-start -->
### 証明

一次元の[Gaussian変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を座標ごとに掛け、[Fourier反転](../../FOU/FOU3/index.md#thm-fou3-inversion)も積に適用すると

$$
e^{-t|z|^2}=\frac1{(2\pi)^d}\left(\frac\pi t\right)^{d/2}
\int e^{-|\xi|^2/(4t)}e^{iz\cdot\xi}d\xi.
$$

積分の絶対値を取った三重積分は

$$
M^2\int e^{-|\xi|^2/(4t)}d\xi
=M^2(4\pi t)^{d/2}<\infty
$$

なのでFubiniが適用できます。$z=x-y$ を代入すると

$$
\begin{aligned}
A_\mu(t)
&=\frac1{(2\pi)^d}\left(\frac\pi t\right)^{d/2}
\int e^{-|\xi|^2/(4t)}
\left(\int e^{ix\cdot\xi}d\mu(x)\right)
\left(\int e^{-iy\cdot\xi}d\mu(y)\right)d\xi\\
&=\frac1{(2\pi)^d}\left(\frac\pi t\right)^{d/2}
\int e^{-|\xi|^2/(4t)}|\widehat\mu(\xi)|^2d\xi.
\end{aligned}
$$

最後は $\mu$ が実の非負測度であることから一方が他方の複素共役になるためです。$\square$
<!-- proof-end -->

## 4. Riesz energyのFourier恒等式

最も重要なのは、$\widehat\mu$ の二乗を $|\xi|^{s-d}$ で重み付けすると、元の $I_s(\mu)$ を**無限大を含めて**再現できることです。以下の $c_{d,s}$ は本章の角周波数規約 $e^{-ix\cdot\xi}$ に固有の係数です。

<a id="thm-gmt4-fourier-energy"></a>

<!-- formal-statement-start -->
> **定理（Riesz energyのFourier表示）**  
> $d\ge1$、$0<s<d$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。$\widehat\mu(\xi)=\int e^{-ix\cdot\xi}d\mu(x)$ とし、

$$
c_{d,s}=\frac{\Gamma((d-s)/2)}{2^s\pi^{d/2}\Gamma(s/2)}>0
$$

> と置くと、両辺が $+\infty$ の場合も含めて

$$
I_s(\mu)=c_{d,s}\int_{\mathbb R^d}
|\widehat\mu(\xi)|^2|\xi|^{s-d}\,d\xi.
$$

> $\xi=0$ における重みの値は積分に影響しない（零集合上の値）とする。
<!-- formal-statement-end -->

### 証明の見取り図

[Gaussian核の積分表示](#lem-gmt4-gaussian-mixture)を二点平均へ入れ、非負性によってTonelliで $t$ を外側に出します。次に[Gaussian二点平均のFourier表示](#lem-gmt4-gaussian-pair)を代入し、もう一度Tonelliで $t$ と $\xi$ を交換します。残る $t$ 積分は $u=|\xi|^2/(4t)$ の置換でGamma関数になります。

<!-- proof-start -->
### 証明

$|x-y|^{-s}$ を[Gaussian積分表示](#lem-gmt4-gaussian-mixture)に置き換えます。被積分関数は全て非負なので、$I_s(\mu)$ の有限性を事前に仮定せず[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使えます。

$$
\begin{aligned}
I_s(\mu)
&=\frac1{\Gamma(s/2)}\int_0^\infty
t^{s/2-1}A_\mu(t)dt\\
&=\frac{\pi^{d/2}}{(2\pi)^d\Gamma(s/2)}
\int_{\mathbb R^d}|\widehat\mu(\xi)|^2
\left(\int_0^\infty
t^{(s-d)/2-1}e^{-|\xi|^2/(4t)}dt\right)d\xi.
\end{aligned}
$$

$\xi\ne0$ に対して $u=|\xi|^2/(4t)$ と置くと、$t=|\xi|^2/(4u)$、$dt=-|\xi|^2(4u^2)^{-1}du$ であるため

$$
\begin{aligned}
\int_0^\infty t^{(s-d)/2-1}e^{-|\xi|^2/(4t)}dt
&=\left(\frac{|\xi|^2}{4}\right)^{(s-d)/2}
\int_0^\infty u^{(d-s)/2-1}e^{-u}du\\
&=2^{d-s}\Gamma((d-s)/2)|\xi|^{s-d}.
\end{aligned}
$$

$0<s<d$ はGamma積分と原点近くの重みの積分可能性を保証します。$\xi=0$ はLebesgue零集合で、非負積分の値を変えません。係数を集めると

$$
\frac{\pi^{d/2}}{(2\pi)^d\Gamma(s/2)}
2^{d-s}\Gamma((d-s)/2)
=\frac{\Gamma((d-s)/2)}{2^s\pi^{d/2}\Gamma(s/2)}.
$$

従って主張が成り立ちます。二度のTonelliはいずれも非負性に基づくので、無限energyの原子測度も含まれます。$\square$
<!-- proof-end -->

**正規化を切り替える場合**　もし $\mathcal F_{2\pi}\mu(\eta)=\int e^{-2\pi ix\cdot\eta}d\mu(x)$ を採用するなら、$\xi=2\pi\eta$ という変数変換によって

$$
I_s(\mu)=\frac{\pi^{s-d/2}\Gamma((d-s)/2)}{\Gamma(s/2)}
\int|\mathcal F_{2\pi}\mu(\eta)|^2|\eta|^{s-d}d\eta.
$$

つまり二つの表示で係数が異なるのは、核やenergyの定義ではなくFourier変換に置いた $2\pi$ の位置が違うためです。$d=3,s=1$ では角周波数規約で $c_{3,1}=1/(2\pi^2)$、従ってNewton核の表示と整合します。

### どこで発散するのか

[有界性補題](#lem-gmt4-measure-fourier-bounds)と極座標積分から、$\omega_{d-1}$ を単位球面の面積として

$$
\int_{|\xi|\le1}|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi
\le M^2\omega_{d-1}\int_0^1r^{s-1}dr
=\frac{M^2\omega_{d-1}}s<\infty.
$$

したがって有限測度については、Fourier表示の発散は**高周波数 $|\xi|\to\infty$ 側でのみ**起こります。$\widehat{\delta_a}$ の絶対値が1という先の例では、高周波積分 $\int_1^\infty r^{s-1}dr$ が発散して[GMT3の原子energy](../GMT3/index.md#def-gmt3-riesz-energy)と一致します。

## 5. Gaussian正則化 → Plancherel → 極限交換を明示する

前節の証明は測度へPlancherelを直接適用せずに済みました。しかし実際の解析で $f_\varepsilon$ を使うとき、正則化で何が収束するかも確かめておきます。

<a id="thm-gmt4-regularized-energy"></a>

<!-- formal-statement-start -->
> **定理（Gaussian正則化energyと単調極限）**  
> $d\ge1$、$0<s<d$、$\mu$ を $\mathbb R^d$ 上の非負有限Borel測度とする。$f_\varepsilon=\rho_\varepsilon*\mu$ と置くと、各 $\varepsilon>0$ について

$$
I_s(f_\varepsilon dx)=c_{d,s}\int
e^{-2\varepsilon|\xi|^2}|\widehat\mu(\xi)|^2
|\xi|^{s-d}d\xi<\infty.
$$

> さらに $\varepsilon\downarrow0$ のとき $I_s(f_\varepsilon dx)$ は単調増加し、極限は $I_s(\mu)$（無限大を許す）に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

まず[Gaussian正則化の変換式](#lem-gmt4-heat-fourier)を[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)へ代入します。これは $f_\varepsilon\in L^1\cap L^2$ なので、Gaussianを掛けた畳み込みに[Plancherel](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)を適用する通常の計算とも一致します。単調性は**空間側の核の点ごとの大小**ではなく、周波数側の $e^{-2\varepsilon|\xi|^2}$ の大小から示します。

<!-- proof-start -->
### 証明

[正則化の補題](#lem-gmt4-heat-fourier)で $f_\varepsilon dx$ は非負有限測度、Fourier変換は $e^{-\varepsilon|\xi|^2}\widehat\mu$ です。従って[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)から等式を得ます。$|\widehat\mu|\le M$ より、右辺は原点近くで $r^{s-1}$、無限遠で $e^{-2\varepsilon r^2}r^{s-1}$ で抑えられ、有限です。

Plancherelから直接辿る場合にも、各 $t>0$ の $g_t(x)=e^{-t|x|^2}$ は $L^1$ で、$g_t*f_\varepsilon$ と $f_\varepsilon$ は $L^2$ です。[FOU4の畳み込み公式](../../FOU/FOU4/index.md#thm-fou4-l1-l2-convolution)と[Parseval等式](../../FOU/FOU4/index.md#thm-fou4-parseval)を各座標に拡張して

$$
\begin{aligned}
\int(g_t*f_\varepsilon)(x)f_\varepsilon(x)dx
&=(2\pi)^{-d}\int\widehat g_t(\xi)
|\widehat f_\varepsilon(\xi)|^2d\xi\\
&=(2\pi)^{-d}(\pi/t)^{d/2}\int
e^{-|\xi|^2/(4t)}e^{-2\varepsilon|\xi|^2}
|\widehat\mu(\xi)|^2d\xi.
\end{aligned}
$$

左辺は $A_{f_\varepsilon dx}(t)$ です。右辺で $\varepsilon\downarrow0$ とすれば、各 $t$ について[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)により[Gaussian二点平均](#lem-gmt4-gaussian-pair)の $A_\mu(t)$ に増加収束します。次に $t^{s/2-1}/\Gamma(s/2)>0$ を掛け、再び単調収束を適用すると

$$
\lim_{\varepsilon\downarrow0}I_s(f_\varepsilon dx)
=\frac1{\Gamma(s/2)}\int_0^\infty t^{s/2-1}A_\mu(t)dt
=I_s(\mu).
$$

最初の等式は[Gaussian積分表示](#lem-gmt4-gaussian-mixture)とTonelliに由来します。これで極限値も、単調性も、有限性も確認できました。$\square$
<!-- proof-end -->

**注意**　一般の非負な正則化用関数族に対し、$I_s(\rho_\varepsilon*\mu)$ が $\varepsilon\downarrow0$ で単調になるとは主張していません。ここではFourier乗数 $e^{-\varepsilon|\xi|^2}$ が正で単調なGaussian族を選んだことが効いています。

## 6. 実例：Gaussian、区間、質量の集中

### 6.1 Gaussian確率測度で定数を独立に検算する

$a>0$ とし $d\gamma_a(x)=(a/\pi)^{d/2}e^{-a|x|^2}dx$ と置きます。[Gaussian変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を座標ごとに使うと $\widehat\gamma_a(\xi)=e^{-|\xi|^2/(4a)}$ です。[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)の右辺を極座標で積分します。球面積 $\omega_{d-1}=2\pi^{d/2}/\Gamma(d/2)$ と $u=r^2/(2a)$ を使うと

$$
\begin{aligned}
\int|\widehat\gamma_a(\xi)|^2|\xi|^{s-d}d\xi
&=\omega_{d-1}\int_0^\infty e^{-r^2/(2a)}r^{s-1}dr\\
&=\frac{\omega_{d-1}}2(2a)^{s/2}\Gamma(s/2).
\end{aligned}
$$

従って

$$
I_s(\gamma_a)=\left(\frac a2\right)^{s/2}
\frac{\Gamma((d-s)/2)}{\Gamma(d/2)}.
$$

空間側でも $X,Y$ を独立に $\gamma_a$ に従わせると $X-Y$ の密度は $(a/(2\pi))^{d/2}e^{-a|z|^2/2}$ です。この密度と $|z|^{-s}$ を極座標で積分すると同じ式になり、係数を別経路で検算できます。

### 6.2 区間のenergyと高周波減衰

$d=1$、$0<s<1$ の $[0,1]$ 上の一様確率測度 $\lambda$ では、[GMT3の直接積分](../GMT3/index.md#def-gmt3-riesz-energy)から $I_s(\lambda)=2/((1-s)(2-s))$ です。他方

$$
|\widehat\lambda(\xi)|^2
=\frac{4\sin^2(\xi/2)}{\xi^2}\quad(\xi\ne0)
$$

なので、Fourier恒等式は

$$
c_{1,s}\int_{\mathbb R}
\frac{4\sin^2(\xi/2)}{\xi^2}|\xi|^{s-1}d\xi
=\frac2{(1-s)(2-s)}
$$

を与えます。原点では $\sin(\xi/2)\sim\xi/2$ なので $|\xi|^{s-1}$、無限遠では $|\xi|^{s-3}$ で抑えられ、どちらも収束します。これは定理の適用条件を実例で確認したもので、収束の理由を「Gaussianだから」と取り違えません。

### 6.3 原子へ収束するGaussianのenergy

$\rho_\varepsilon dx$ は $\delta_0$ の正則化です。上のGaussianの式で $a=1/(4\varepsilon)$ と置くと

$$
I_s(\rho_\varepsilon dx)=
(8\varepsilon)^{-s/2}\frac{\Gamma((d-s)/2)}{\Gamma(d/2)}
\longrightarrow\infty.
$$

したがって弱い意味で $\delta_0$ に近づいても、energyは有限値へ収束しません。原子の[無限energy](../GMT3/index.md#def-gmt3-riesz-energy)を正しく再現しています。

### 6.4 HA7との区別

[HA7のRieszポテンシャル](../../HA/HA7/index.md#def-ha7-riesz-potential)は $I_\alpha f(x)=c_{d,\alpha}\int|x-y|^{\alpha-d}f(y)dy$ という**関数に作用する演算子**で、入力と出力の $L^p$ 指数を問います。本章の $I_s(\mu)$ は $|x-y|^{-s}$ を**二重に測度積分した非負数**です。$\alpha=d-s$ と書けば核の形は対応しますが、係数・対象・目的を同一視しません。

## 7. 演習：周波数の側からenergyを使う

### Level A：定義・正規化・収束の判定

<a id="ex-gmt4-a1"></a>

**A1. 原子のFourier変換とenergy**

- Level: A
- 問題: $d\ge1$、$0<s<d$、$a\in\mathbb R^d$ とする。$\delta_a$ のFourier変換を計算し、Fourier側の積分から $I_s(\delta_a)=\infty$ を示せ。

<!-- solution-start -->
**詳細解答**

[測度のFourier変換の定義](#def-gmt4-fourier-measure)から $\widehat{\delta_a}(\xi)=e^{-ia\cdot\xi}$、従って絶対値の二乗は1です。[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)の周波数積分を極座標で $|\xi|>1$ に制限すると

$$
\int_{|\xi|>1}|\xi|^{s-d}d\xi
=\omega_{d-1}\int_1^\infty r^{s-1}dr=\infty
$$

です（$s>0$）。係数 $c_{d,s}>0$ よりenergyは無限大です。原点側の発散を原因にしたのではありません。
<!-- solution-end -->

<a id="ex-gmt4-a2"></a>

**A2. 二つのFourier規約の係数**

- Level: A
- 問題: $\widehat\mu(\xi)=\int e^{-ix\cdot\xi}d\mu(x)$ から $\mathcal F_{2\pi}\mu(\eta)=\int e^{-2\pi ix\cdot\eta}d\mu(x)$ へ移すとき、energy表示の係数が $c_{d,s}(2\pi)^s$ となることを示せ。

<!-- solution-start -->
**詳細解答**

$\xi=2\pi\eta$ と置けば $d\xi=(2\pi)^d d\eta$、$|\xi|^{s-d}=(2\pi)^{s-d}|\eta|^{s-d}$、$\widehat\mu(2\pi\eta)=\mathcal F_{2\pi}\mu(\eta)$ です。よって

$$
c_{d,s}\int|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi
=c_{d,s}(2\pi)^s\int|\mathcal F_{2\pi}\mu(\eta)|^2|\eta|^{s-d}d\eta.
$$

定数は $c_{d,s}(2\pi)^s=\pi^{s-d/2}\Gamma((d-s)/2)/\Gamma(s/2)$ です。
<!-- solution-end -->

<a id="ex-gmt4-a3"></a>

**A3. 低周波数の一様評価**

- Level: A
- 問題: 全質量 $M$ の有限非負測度 $\mu$ について $\int_{|\xi|<R}|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi\le M^2\omega_{d-1}R^s/s$（$R>0$）を示せ。

<!-- solution-start -->
**詳細解答**

[有界性補題](#lem-gmt4-measure-fourier-bounds)から $|\widehat\mu(\xi)|^2\le M^2$。極座標で $d\xi=r^{d-1}dr\,d\sigma$、重みは $r^{s-d}$ なので積は $r^{s-1}$ です。従って

$$
\int_{|\xi|<R}|\widehat\mu|^2|\xi|^{s-d}d\xi
\le M^2\omega_{d-1}\int_0^Rr^{s-1}dr
=\frac{M^2\omega_{d-1}}sR^s.
$$

$s>0$ で積分可能です。
<!-- solution-end -->

<a id="ex-gmt4-a4"></a>

**A4. Gaussian正則化の質量と二乗可積分性**

- Level: A
- 問題: $f_\varepsilon=\rho_\varepsilon*\mu$ に対し $\|f_\varepsilon\|_1=M$、$\|f_\varepsilon\|_2^2\le M^2(4\pi\varepsilon)^{-d/2}$ を、Plancherelに頼らず証明せよ。

<!-- solution-start -->
**詳細解答**

$\rho_\varepsilon\ge0$ なので[Tonelli](../../F0/F0-00D2C/index.md#thm-tonelli)から

$$
\|f_\varepsilon\|_1=\int\int\rho_\varepsilon(x-y)d\mu(y)dx
=\int 1\,d\mu(y)=M.
$$

また $\rho_\varepsilon\le(4\pi\varepsilon)^{-d/2}$ より $f_\varepsilon(x)\le M(4\pi\varepsilon)^{-d/2}$。したがって $f_\varepsilon^2\le M(4\pi\varepsilon)^{-d/2}f_\varepsilon$ を積分し

$$
\|f_\varepsilon\|_2^2\le M^2(4\pi\varepsilon)^{-d/2}.
$$
<!-- solution-end -->

<a id="ex-gmt4-a5"></a>

**A5. 区間のFourier減衰**

- Level: A
- 問題: $d=1$、$0<s<1$ で $\lambda=\boldsymbol 1_{[0,1]}dx$ のFourier energy積分が原点・無限遠の両方で収束することを、値を求めずに確かめよ。

<!-- solution-start -->
**詳細解答**

$\widehat\lambda(\xi)=(1-e^{-i\xi})/(i\xi)$（$\xi\ne0$）です。$|1-e^{-i\xi}|\le|\xi|$ から $|\widehat\lambda|\le1$、$|1-e^{-i\xi}|\le2$ から $|\widehat\lambda|\le2/|\xi|$ です。よって

$$
\int_{|\xi|\le1}|\widehat\lambda|^2|\xi|^{s-1}d\xi
\le2\int_0^1r^{s-1}dr=2/s<\infty,
$$

$$
\int_{|\xi|>1}|\widehat\lambda|^2|\xi|^{s-1}d\xi
\le8\int_1^\infty r^{s-3}dr=8/(2-s)<\infty.
$$

前者は $s>0$、後者は $s<2$ を使います。$0<s<1$ は双方を満たします。
<!-- solution-end -->

### Level B：定理の機構と仮定を使う

<a id="ex-gmt4-b1"></a>

**B1. 相似変換をFourier表示から再証明する**

- Level: B
- 問題: $a>0$、$b\in\mathbb R^d$、$T(x)=ax+b$、$\nu=T_\#\mu$ とする。$I_s(\nu)=a^{-s}I_s(\mu)$ をFourier側の変数変換で示し、[GMT3の相似変換則](../GMT3/index.md#prop-gmt3-capacity-rules)との対応を説明せよ。

<!-- solution-start -->
**詳細解答**

$\nu=T_\#\mu$ の定義から

$$
\widehat\nu(\xi)=\int e^{-i(ax+b)\cdot\xi}d\mu(x)
=e^{-ib\cdot\xi}\widehat\mu(a\xi).
$$

$|e^{-ib\cdot\xi}|=1$ なので $|\widehat\nu(\xi)|^2=|\widehat\mu(a\xi)|^2$ です。[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)の積分で $\eta=a\xi$ と置くと $d\xi=a^{-d}d\eta$、$|\xi|^{s-d}=a^{d-s}|\eta|^{s-d}$ で

$$
I_s(\nu)=c_{d,s}a^{-s}\int|\widehat\mu(\eta)|^2|\eta|^{s-d}d\eta
=a^{-s}I_s(\mu).
$$

無限大の場合も非負積分の変数変換として成立します。確率測度の全体で下限を取って逆数にすると[GMT3のcapacity相似変換則](../GMT3/index.md#prop-gmt3-capacity-rules)の $a^s$ が出ます。
<!-- solution-end -->

<a id="ex-gmt4-b2"></a>

**B2. 正則化の単調性はどこにあるか**

- Level: B
- 問題: $0<\varepsilon'<\varepsilon$ とする。$I_s(\rho_{\varepsilon'}*\mu\,dx)\ge I_s(\rho_\varepsilon*\mu\,dx)$ を証明せよ。またこの結論を空間側の $\rho_{\varepsilon'}(x)\ge\rho_\varepsilon(x)$ からは証明できない理由を述べよ。

<!-- solution-start -->
**詳細解答**

[Gaussian正則化energyと単調極限](#thm-gmt4-regularized-energy)から差は

$$
c_{d,s}\int\left(e^{-2\varepsilon'|\xi|^2}
-e^{-2\varepsilon|\xi|^2}\right)
|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi.
$$

$\varepsilon'<\varepsilon$ なので括弧内は全周波数で非負、他の因子も非負です。従って差は非負です。一方 $\rho_{\varepsilon'}(0)>\rho_\varepsilon(0)$ ですが、十分遠い $x$ では指数減衰の速い $\rho_{\varepsilon'}(x)<\rho_\varepsilon(x)$ となります。密度の点ごとの順序はないため、Fourier乗数による比較が必要です。
<!-- solution-end -->

<a id="ex-gmt4-b3"></a>

**B3. Gaussian energyを空間側から再計算する**

- Level: B
- 問題: $d\gamma_a(x)=(a/\pi)^{d/2}e^{-a|x|^2}dx$、$a>0$ とする。独立な $X,Y\sim\gamma_a$ の差 $Z=X-Y$ の密度を畳み込みで求め、それを用いて $I_s(\gamma_a)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$\gamma_a$ は原点対称なので差の密度は密度同士の畳み込みです。$|x|^2+|z-x|^2=2|x-z/2|^2+|z|^2/2$ という平方完成を $d$ 次元で用いて

$$
\begin{aligned}
p_Z(z)&=(a/\pi)^d\int e^{-a(|x|^2+|z-x|^2)}dx\\
&=(a/\pi)^de^{-a|z|^2/2}
\int e^{-2a|x-z/2|^2}dx\\
&=(a/(2\pi))^{d/2}e^{-a|z|^2/2}.
\end{aligned}
$$

従って極座標と $u=ar^2/2$ の置換から

$$
\begin{aligned}
I_s(\gamma_a)
&=(a/(2\pi))^{d/2}\omega_{d-1}
\int_0^\infty r^{d-s-1}e^{-ar^2/2}dr\\
&=(a/(2\pi))^{d/2}\frac{2\pi^{d/2}}{\Gamma(d/2)}
\frac12(2/a)^{(d-s)/2}\Gamma((d-s)/2)\\
&=(a/2)^{s/2}\frac{\Gamma((d-s)/2)}{\Gamma(d/2)}.
\end{aligned}
$$

$s<d$ は原点での積分収束、$a>0$ は無限遠での収束を保証します。[Fourier側の計算](#thm-gmt4-fourier-energy)と一致します。
<!-- solution-end -->

<a id="ex-gmt4-b4"></a>

**B4. energyの有限性は高周波数だけで判定できる**

- Level: B
- 問題: $d\ge1$、$0<s<d$、$\mu$ を非負有限Borel測度とする。$I_s(\mu)<\infty$ と $\int_{|\xi|>R}|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi<\infty$（ある $R>0$）が同値であると証明せよ。$R$ の選択に依らないことも説明せよ。

<!-- solution-start -->
**詳細解答**

一方向は[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)で全積分が有限なら部分積分も有限なことによります。逆方向は[低周波評価](#lem-gmt4-measure-fourier-bounds)の $|\widehat\mu|\le M$ により

$$
\int_{|\xi|\le R}|\widehat\mu|^2|\xi|^{s-d}d\xi
\le M^2\omega_{d-1}R^s/s<\infty
$$

なので、仮定した外側の積分と合わせて全積分が有限です。正の定数 $c_{d,s}$ を掛けて $I_s(\mu)<\infty$ を得ます。どの正の $R$ でも内側積分は有限だから、ある $R$ での条件は全ての $R$ での条件と同値です。
<!-- solution-end -->

### Level C：幾何と周波数を接続する

<a id="ex-gmt4-c1"></a>

**C1. Hausdorff次元をFourierの可積分指数で読む**

- Level: C
- 問題: 空でないコンパクト集合 $K\subset\mathbb R^d$ に対し

$$
h_F(K)=\sup\left\{s\in(0,d):\exists\mu\in\mathcal P(K),\quad
\int|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi<\infty\right\}
$$

と定め、集合が空なら $h_F(K)=0$ と約束する。$h_F(K)=\dim_HK$ を証明せよ。ただし $s=\dim_HK$ の積分が有限とは一般には言えない理由を、Cantor集合を使って説明せよ。

<!-- solution-start -->
**詳細解答**

まず固定した $s\in(0,d)$ について、[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)と $c_{d,s}>0$ により、積分が有限であることは $I_s(\mu)<\infty$ と同値です。この測度が $K$ に支えられるなら[有限energyによる次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)から $\dim_HK\ge s$ です。従って $h_F(K)\le\dim_HK$。

逆に $0<t<\dim_HK$ を固定し、$t<u<\dim_HK\le d$ を選びます。

[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)により、$u$ 次の球成長評価を満たす確率測度 $\mu\in\mathcal P(K)$ が得られます。[GMT3の球成長から有限energyへの定理](../GMT3/index.md#thm-gmt3-frostman-energy)で $I_t(\mu)<\infty$ が従います。

再び[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)から、この $\mu$ の $t$ に対する周波数積分は有限です。任意の $0<t<\dim_HK$ で成立するため $h_F(K)\ge\dim_HK$。$\dim_HK=0$ の場合は前半の上界と非負性から等号が成立します。

最後に中三分Cantor集合 $C$ の次元は $\alpha=\log2/\log3$ ですが、[GMT3の臨界容量の演習](../GMT3/index.md#ex-gmt3-c1)で $C$ 上の**全ての**確率測度について $I_\alpha(\mu)=\infty$ と証明しました。[Riesz energyのFourier表示](#thm-gmt4-fourier-energy)により $s=\alpha$ の積分も全測度で発散します。ゆえに上限が $\alpha$ であっても、その端点が実現するとは限りません。
<!-- solution-end -->

## 8. まとめと次の講義

- 有限測度のFourier変換は密度なしでも定義でき、有界・連続です。
- Gaussian積分表示によりRiesz核を非負の可積分核へ分解し、Tonelliを二度使って $I_s(\mu)$ のFourier表示を無限大も含めて証明しました。
- $e^{-ix\cdot\xi}$ の規約では $c_{d,s}=2^{-s}\pi^{-d/2}\Gamma((d-s)/2)/\Gamma(s/2)$。$2\pi$ 規約へ移すと定数が変わります。
- Gaussian正則化ではPlancherelを正当に使え、周波数乗数の単調収束により原測度のenergyへ戻れます。
- $s>0$ なら低周波数は常に積分可能であり、有限energyは高周波側の減衰条件です。

次の**GMT5「平面Marstrand射影定理：次元」**では、方向を平均した射影測度のenergyを比較し、ほとんど全ての方向でHausdorff次元が保たれる機構を証明します。
