# GMT6 平面Marstrand射影定理：正測度

<!-- definition-example-audit: strict -->

[GMT5の射影次元定理](../GMT5/index.md#thm-gmt5-marstrand-dimension)は、平面のコンパクト集合の次元が $1$ より大きければ、ほとんど全方向の影の次元は $1$ になると保証しました。しかし、**次元が $1$ であることと、長さが正であることは違います**。次元 $1$ なのに長さ $0$ の集合もあります。

今回は、元の次元が **厳密に $1$ より大きい** とき、ほとんど全方向で影が正の長さを持つことを証明します。前回の $t<1$ の方向平均核は $t=1$ で発散するので、別の道具が要ります。その道具は、[GMT4の測度Fourier変換](../GMT4/index.md#def-gmt4-fourier-measure)と一次元の $L^2$ 密度です。

道筋は次の通りです。

1. 元の集合に、$1<s<2$ の有限Riesz energyを持つ測度を置く。
2. そのFourier変換を方向の直線上で積分し、ほとんど全方向で二乗可積分と示す。
3. 射影測度が $L^2$ 関数で表されることを証明する。
4. 全質量が正だから、その密度を載せる影の長さも正だと結論する。

## 1. 「次元1」と「正の長さ」の間にあるもの

前回の[直交射影と射影測度](../GMT5/index.md#def-gmt5-orthogonal-projection)を使います。$e_\theta=(\cos\theta,\sin\theta)$、$\pi_\theta(x)=x\cdot e_\theta$、$\nu_\theta=(\pi_\theta)_\#\mu$ です。方向は $[0,\pi)$、方向の平均は $d\theta/\pi$ とします。$\mathcal L^1$ は実直線のLebesgue測度、$M=\mu(\mathbb R^2)$ は元の測度の全質量です。

まず区間 $[0,1]$ に一様確率測度を置けば、密度は $f=\boldsymbol{1}_{[0,1]}$ で、質量は $\int f\,du=1$、二乗積分は $\int|f|^2du=1$ です。一方、点に全質量を集めた $\delta_0$ は、Lebesgue測度 $0$ の集合 $\{0\}$ に質量 $1$ を持つため、Lebesgue密度では表せません。

ここでいう **$L^2$ 密度** とは、測度が長さによる積分として表され、その密度の二乗積分も有限であることです。これを明示的に定義します。

<a id="def-gmt6-l2-density"></a>

<!-- formal-statement-start -->
> **定義（射影測度のL2密度）**  
> $\nu$ を $\mathbb R$ 上の有限非負Borel測度とする。非負可測関数 $f\in L^2(\mathbb R)$ が存在し、任意のBorel集合 $A\subset\mathbb R$ について

$$
\nu(A)=\int_A f(u)\,du
$$

> が成り立つとき、$\nu$ は $L^2$ 密度 $f$ を持つという。$f$ はLebesgueほとんど至る所で一意であり、$\nu=f\,du$ と書く。このとき $\int_{\mathbb R}f\,du=\nu(\mathbb R)<\infty$ も成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt6-l2-density -->
**定義の確認**

一様区間と点質量を比較します。

$\nu(A)=\mathcal L^1(A\cap[0,1])$ とすると $f=\boldsymbol{1}_{[0,1]}$ は非負・可測で、任意のBorel集合 $A$ について $\nu(A)=\int_Af\,du$。さらに

$$
\|f\|_{L^2}^2=\int_0^1 1\,du=1<\infty.
$$

よって $L^2$ 密度の全条件を満たします。対照的に $\delta_0$ を $f\,du$ と書けるなら $1=\delta_0(\{0\})=\int_{\{0\}}f\,du=0$ となり矛盾します。後者では、どんなに密度を高くしようとしても「一点に正の質量を置く」条件を満たせません。
<!-- definition-example-end -->

この定義が長さの正値性につながる理由を先に確認しましょう。$K\subset\mathbb R^2$ がコンパクトで、$\mu$ が $K$ に支えられた質量 $M>0$ の有限測度なら、$\nu_\theta$ はコンパクト集合 $\pi_\theta K$ の外側に質量を持ちません。もし $\nu_\theta=f_\theta\,du$ かつ $f_\theta\in L^2$ なら、$\pi_\theta K$ のコンパクト性から $\boldsymbol{1}_{\pi_\theta K}\in L^2(\mathbb R)$ であり、$\|\boldsymbol{1}_{\pi_\theta K}\|_2^2=\mathcal L^1(\pi_\theta K)$ です。そこで $f_\theta$ とこの指示関数に[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用すると

$$
M=\int_{\pi_\theta K}f_\theta(u)\,du
\le \bigl(\mathcal L^1(\pi_\theta K)\bigr)^{1/2}
\|f_\theta\|_{L^2}.
$$

$M>0$ なので $\|f_\theta\|_{L^2}>0$。従って

$$
\mathcal L^1(\pi_\theta K)
\ge \frac{M^2}{\|f_\theta\|_{L^2}^2}>0.
$$

**正の長さを示すには、射影測度の $L^2$ 密度を構成すれば十分**なのです。

## 2. Fourier変換が二乗可積分なら密度がある

ここからのFourier変換は、GMT4と同じ角周波数規約

$$
\widehat\nu(r)=\int_{\mathbb R}e^{-iru}\,d\nu(u),
\qquad
\widehat g(r)=\int_{\mathbb R}e^{-iru}g(u)\,du
$$

を使います。有限測度 $\nu$ の変換は有界連続ですが、それだけでは密度は得られません。点質量は $\widehat{\delta_0}(r)=1$ だからです。必要なのは $\int|\widehat\nu|^2<\infty$ という追加条件です。

<a id="lem-gmt6-fourier-l2-density"></a>

<!-- formal-statement-start -->
> **補題（有限測度のFourier L2判定）**  
> $\nu$ を $\mathbb R$ 上の有限非負Borel測度とし、$\widehat\nu(r)=\int e^{-iru}\,d\nu(u)$ とする。次の二条件は同値である。
>
> **（i）** $\nu=f\,du$ となる非負関数 $f\in L^1(\mathbb R)\cap L^2(\mathbb R)$ が存在する。  
> **（ii）** $\widehat\nu\in L^2(\mathbb R)$ である。
>
> 成立するとき、角周波数規約のPlancherel恒等式は

$$
\|f\|_{L^2}^2=\frac1{2\pi}
\int_{\mathbb R}|\widehat\nu(r)|^2\,dr
$$

> を与える。
<!-- formal-statement-end -->

### 証明の見取り図

（i）から（ii）は、[L1 Fourier変換との整合性](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)と[Plancherelの等長性](../../FOU/FOU4/index.md#thm-fou4-l2-extension)から従います。逆向きは測度をGaussianで滑らかにします。こうして得た関数のFourier変換は元の $\widehat\nu$ にGaussian因子を掛けたものなので、$L^2$ 内でCauchy列となります。その極限が元の測度を表すことを、コンパクト台付き連続関数に対する積分で確かめます。

<!-- proof-start -->
### 証明

（i）が成立すれば $\widehat\nu=\widehat f$ です。$f\in L^1\cap L^2$ なので、[古典的Fourier変換とL2変換の整合性](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)から $\widehat f=\mathcal F_2f$ がほとんど至る所で成立します。[Plancherelの等長性](../../FOU/FOU4/index.md#thm-fou4-l2-extension)をこの $f$ に適用すれば（ii）と等式を得ます。

逆向きに（ii）を仮定します。$\varepsilon>0$ に対して

$$
h_\varepsilon(u)=\frac{1}{\sqrt{2\pi}\varepsilon}
e^{-u^2/(2\varepsilon^2)},\qquad
g_\varepsilon(u)=\int h_\varepsilon(u-v)\,d\nu(v)
$$

とします。これは[GMT4のGaussian正則化](../GMT4/index.md#def-gmt4-gaussian-regularization)の $d=1$、時間パラメータ $t=\varepsilon^2/2$ の場合です。実際 $\rho_t(u)=(4\pi t)^{-1/2}e^{-u^2/(4t)}=h_\varepsilon(u)$ であり、ここでは $\varepsilon$ をGaussianの標準偏差として動かしています。$g_\varepsilon\ge0$、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で $\|g_\varepsilon\|_1=\nu(\mathbb R)$、また

$$
0\le g_\varepsilon(u)\le
\frac{\nu(\mathbb R)}{\sqrt{2\pi}\varepsilon}
$$

なので $g_\varepsilon\in L^1\cap L^2$ です。[GMT4のGaussian正則化のFourier変換](../GMT4/index.md#lem-gmt4-heat-fourier)を上記の $t=\varepsilon^2/2$ で使い、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)から

$$
\widehat {g_\varepsilon}(r)
=e^{-\varepsilon^2r^2/2}\widehat\nu(r).
$$

よって[Plancherelの等長性](../../FOU/FOU4/index.md#thm-fou4-l2-extension)より

$
\|g_\varepsilon-g_\delta\|_2^2
=\frac1{2\pi}\int_{\mathbb R}
\left|e^{-\varepsilon^2r^2/2}-e^{-\delta^2r^2/2}\right|^2
|\widehat\nu(r)|^2\,dr.
$$

$\varepsilon,\delta\downarrow0$ で括弧内は点ごとに0へ収束し、二乗は $4|\widehat\nu(r)|^2$ 以下です。仮定（ii）と[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から右辺は0へ行きます。$L^2$ の完備性により、ある $f\in L^2$ に対して $g_\varepsilon\to f$ が $L^2$ で成立します。

任意の連続なコンパクト台付き関数 $\varphi$ を取ります。$\varphi\in L^2$ なので

$$
\int\varphi(u)g_\varepsilon(u)\,du
\longrightarrow\int\varphi(u)f(u)\,du.
$$

一方、$\int\!\int|\varphi(u)|h_\varepsilon(u-v)\,du\,d\nu(v)\le\|\varphi\|_\infty\nu(\mathbb R)<\infty$ なので、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で左辺を交換すると

$$
\int\varphi(u)g_\varepsilon(u)\,du
=\int\left(\int\varphi(u)h_\varepsilon(u-v)\,du\right)d\nu(v).
$$

内側は $\varphi$ のGaussian平均です。$\varphi$ の連続性とコンパクト台から一様連続性・有界性が従います。任意の $\eta>0$ について、一様連続性の係数 $\omega_\varphi(\eta)=\sup_{|x-y|<\eta}|\varphi(x)-\varphi(y)|$ を置くと、変数 $w=u-v$ への置換によって

$
\left|\int\varphi(u)h_\varepsilon(u-v)\,du-\varphi(v)\right|
\le\omega_\varphi(\eta)+2\|\varphi\|_\infty
\int_{|w|\ge\eta}h_\varepsilon(w)\,dw.
$

右辺は $v$ に依存しません。先に $\varepsilon\downarrow0$ としてGaussianの尾確率を0へ送り、次に $\eta\downarrow0$ とすると $\omega_\varphi(\eta)\to0$ です。従って平均は $\varphi(v)$ へ一様収束します。$\nu$ は有限なので、外側の積分は $\int\varphi\,d\nu$ へ収束します。従って

$$
\int\varphi\,d\nu=\int\varphi(u)f(u)\,du
\qquad(\varphi\in C_c(\mathbb R)).
$$

非負のコンパクト台付き連続関数で右辺が非負になるため、$f\ge0$ がほとんど至る所で成立します。実際、負になる部分が正の測度を持てば、その部分に重みを置く非負連続関数を近似して右辺を負にでき、矛盾します。

任意の開集合 $U$ の指示関数を非負のコンパクト台付き連続関数で下から近似します。両辺に単調収束を使えば

$$
\nu(U)=\int_U f(u)\,du.
$$

開集合で一致する二つのBorel測度は、開集合が生成するBorel $\sigma$-代数上でも一致します。したがって $\nu=f\,du$ であり、$\int f\,du=\nu(\mathbb R)<\infty$ です。

最後に $g_\varepsilon\to f$ の $L^2$ 収束と[Plancherelの等長性](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を用い、[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から

$$
\|f\|_2^2=\lim_{\varepsilon\downarrow0}\|g_\varepsilon\|_2^2
=\frac1{2\pi}\int|\widehat\nu(r)|^2\,dr.
$$

これで（ii）から（i）も示されました。$\square$
<!-- proof-end -->

この補題は、射影方向ごとの測度の**密度の存在**をFourier変換だけから判定できる形にしたものです。Gaussianで近似した密度を、そのまま原測度の密度と決めつけず、コンパクト台付き連続関数で積分して極限を同定したところが証明の核心です。

## 3. 方向平均に現れる $|\xi|^{-1}$

次に平面上の非負有限Borel測度 $\mu$ を取り、射影測度 $\nu_\theta$ を考えます。[GMT5の「Fourier切片からの方向平均」](../GMT5/index.md#prop-gmt5-fourier-slicing)の証明で確かめたように

$$
\widehat{\nu_\theta}(r)=\widehat\mu(re_\theta).
$$

二乗を $r$ と $\theta$ で平均すると、$(r,\theta)\mapsto\xi=re_\theta$ という極座標への変換が使えます。$r$ を負にまで動かし $\theta\in[0,\pi)$ に制限すると、原点を除く平面をほとんど至る所で一回だけ覆います。通常の極座標の面積要素は $d\xi=|r|\,dr\,d\theta$ なので、$dr\,d\theta=d\xi/|\xi|$ という重みが現れます。

<a id="lem-gmt6-directional-fourier"></a>

<!-- formal-statement-start -->
> **補題（射影Fourier変換の方向平均）**  
> $\mu$ を $\mathbb R^2$ 上の有限非負Borel測度、$\nu_\theta=(\pi_\theta)_\#\mu$ とする。このとき積分はLebesgue可測で、無限大を許す恒等式

$$
\frac1\pi\int_0^\pi\int_{\mathbb R}
|\widehat{\nu_\theta}(r)|^2\,dr\,d\theta
=\frac1\pi\int_{\mathbb R^2}
\frac{|\widehat\mu(\xi)|^2}{|\xi|}\,d\xi
$$

> が成り立つ。原点での被積分関数の値は積分に影響しない。
<!-- formal-statement-end -->

### 証明の見取り図

非負関数なので、積分が初めから有限かどうかを気にせずTonelliで交換できます。正の半径と負の半径が異なる半平面を覆うことを確かめ、Jacobian $|r|$ を割るだけです。

<!-- proof-start -->
### 証明

[GMT5の「Fourier切片からの方向平均」](../GMT5/index.md#prop-gmt5-fourier-slicing)の証明にある切片等式から、左辺の内側は $|\widehat\mu(re_\theta)|^2$ です。有限測度のFourier変換は連続なので、$(r,\theta)$ に関して可測です。非負性から[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)が適用できます。

写像 $F(r,\theta)=(r\cos\theta,r\sin\theta)$ について、$r$ を動かし $\theta$ を固定した偏微分が $\partial_rF=e_\theta$、$\theta$ を動かし $r$ を固定した偏微分が $\partial_\theta F=r(-\sin\theta,\cos\theta)$ です。この二つの列ベクトルを並べた微分行列 $DF$ の行列式（面積倍率の符号付き値）は

$
\det DF(r,\theta)=
\det\begin{pmatrix}\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta\end{pmatrix}=r.
$$

$r>0$ は第二座標が正の領域、$r<0$ は第二座標が負の領域を覆います（境界上の半直線と原点は平面Lebesgue測度0）。したがって $|\det DF|=|r|=|\xi|$ を用いた変数変換により

$$
\int_0^\pi\int_{\mathbb R}|\widehat\mu(re_\theta)|^2\,dr\,d\theta
=\int_{\mathbb R^2}|\widehat\mu(\xi)|^2|\xi|^{-1}\,d\xi.
$$

両辺を $\pi$ で割ります。$\square$
<!-- proof-end -->

ここで初めて前回との閾値の違いが見えます。角度平均された $|x-y|^{-1}$ は発散しましたが、**周波数側の $|\xi|^{-1}$ は二次元の原点近くでは局所可積分**です。残る問題は高周波部分をどう抑えるか、です。

<a id="prop-gmt6-energy-to-l2"></a>

<!-- formal-statement-start -->
> **命題（高指数energyによる射影密度評価）**  
> $1<s<2$、$\mu$ を $\mathbb R^2$ 上の有限非負Borel測度とし、$M=\mu(\mathbb R^2)$、$I_s(\mu)<\infty$ と仮定する。GMT4の角周波数規約の正定数

$$
c_{2,s}=\frac{\Gamma((2-s)/2)}{2^s\pi\Gamma(s/2)}
$$

> を使うと、ほとんど全ての $\theta\in[0,\pi)$ で $\nu_\theta=f_\theta\,du$ となる非負 $f_\theta\in L^1\cap L^2$ が存在し、平均二乗ノルムは

$$
\frac1\pi\int_0^\pi\|f_\theta\|_2^2\,d\theta
\le\frac{M^2}{\pi}+\frac{I_s(\mu)}{2\pi^2c_{2,s}}<\infty
$$

> を満たす。例外方向では $\|f_\theta\|_2^2=+\infty$ と約束して積分を読む。
<!-- formal-statement-end -->

### 証明の見取り図

低周波 $|\xi|\le1$ は $|\widehat\mu|\le M$ だけで積分できます。高周波 $|\xi|>1$ では $s>1$ を使い、$|\xi|^{-1}\le|\xi|^{s-2}$ とします。後者の重みは[GMT4のRiesz energyのFourier表示](../GMT4/index.md#thm-gmt4-fourier-energy)そのものです。

<!-- proof-start -->
### 証明

[有限測度のFourier変換の有界性](../GMT4/index.md#lem-gmt4-measure-fourier-bounds)から、全ての $\xi$ で $|\widehat\mu(\xi)|\le M$ です。極座標 $d\xi=r\,dr\,d\varphi$ によって

$$
\int_{|\xi|\le1}\frac{|\widehat\mu(\xi)|^2}{|\xi|}\,d\xi
\le M^2\int_0^{2\pi}\int_0^1\frac{r}{r}\,dr\,d\varphi
=2\pi M^2.
$$

$|\xi|>1$ なら $s>1$ から

$$
|\xi|^{-1}\le|\xi|^{s-2}.
$$

よって[GMT4の「Riesz energyのFourier表示」](../GMT4/index.md#thm-gmt4-fourier-energy)を $d=2$、指数 $s$、測度 $\mu$ に適用すると

$$
\begin{aligned}
\int_{|\xi|>1}\frac{|\widehat\mu(\xi)|^2}{|\xi|}\,d\xi
&\le\int_{|\xi|>1}|\widehat\mu(\xi)|^2|\xi|^{s-2}\,d\xi\\
&\le\int_{\mathbb R^2}|\widehat\mu(\xi)|^2|\xi|^{s-2}\,d\xi
=\frac{I_s(\mu)}{c_{2,s}}.
\end{aligned}
$$

二つを合わせ、[方向平均補題](#lem-gmt6-directional-fourier)へ代入すると

$$
\frac1\pi\int_0^\pi\int_{\mathbb R}
|\widehat{\nu_\theta}(r)|^2\,dr\,d\theta
\le\frac{2\pi M^2+I_s(\mu)/c_{2,s}}{\pi}<\infty.
$$

従ってほとんど全ての $\theta$ で内側の二乗積分が有限です。その各方向に[Fourier $L^2$ 判定](#lem-gmt6-fourier-l2-density)を適用すると、求める $f_\theta$ が存在します。Plancherelの係数 $1/(2\pi)$ を掛けてさらに $d\theta/\pi$ で平均するため、最終係数は $1/(2\pi^2)$ です。すなわち

$$
\frac1\pi\int_0^\pi\|f_\theta\|_2^2\,d\theta
=\frac1{2\pi^2}\int_{\mathbb R^2}
\frac{|\widehat\mu(\xi)|^2}{|\xi|}\,d\xi
\le\frac{M^2}{\pi}+\frac{I_s(\mu)}{2\pi^2c_{2,s}}.
$$

ノルムの二乗はFourier積分で表した可測関数として解釈できるので、方向ごとの密度を同時に可測選択する必要はありません。$\square$
<!-- proof-end -->

この命題では **$s>1$ が高周波の重み比較に使われた**ことが決定的です。$s=1$ なら $|\xi|^{-1}=|\xi|^{s-2}$ 自体は同じですが、次元がちょうど1の集合から有限 $I_1$ の測度を構成できるとは限りません。閾値での存在を勝手に主張しないことが大切です。

## 4. Marstrand射影定理の正測度側

ここまでの二つの橋をつなぎましょう。元の集合の次元が1より大きければ、[Frostman補題](../GMT2/index.md#thm-gmt2-frostman)で $1$ より大きい指数の球成長を持つ確率測度を作れます。その測度は少し小さい指数でenergyが有限になります。直前の命題と第1節のCauchy--Schwarzを使えば証明は閉じます。

<a id="thm-gmt6-marstrand-positive-measure"></a>

<!-- formal-statement-start -->
> **定理（平面Marstrand射影定理：コンパクト集合の正測度）**  
> $K\subset\mathbb R^2$ を非空コンパクト集合とし、$\dim_HK>1$ と仮定する。このとき、正規化Lebesgue測度 $d\theta/\pi$ に関するほとんど全ての $\theta\in[0,\pi)$ で

$$
\mathcal L^1(\pi_\theta K)>0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$1<s<t<\dim_HK$ を選び、$t$-Frostman測度から有限 $s$-energyを得ます。射影密度評価はほとんど全方向で $L^2$ 密度を与えます。影はコンパクトなのでLebesgue可測であり、全質量が $1$ だから影の長さが0のままではいられません。

<!-- proof-start -->
### 証明

$D=\dim_HK>1$ です。$1<s<t<D$ となる実数を選びます。$D\le2$ なので $s<t<2$ とできます。

[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)を非空コンパクト集合 $K$ と指数 $t$ に適用し、$K$ に支えられる確率測度 $\mu$ と定数 $A>0$ を得ます。その球成長は全ての $x\in\mathbb R^2$ と $r>0$ について

$$
\mu(B(x,r))\le Ar^t
$$

です。[GMT3の球成長から有限energyへの定理](../GMT3/index.md#thm-gmt3-frostman-energy)を指数 $s<t$ で適用すると $I_s(\mu)<\infty$ です。$\mu$ は確率測度なので $M=1$。従って[energyによる射影密度評価](#prop-gmt6-energy-to-l2)により、零集合 $N\subset[0,\pi)$ を除く全ての方向で

$$
\nu_\theta=(\pi_\theta)_\#\mu=f_\theta\,du,
\qquad f_\theta\ge0,\qquad
0<\|f_\theta\|_2^2<\infty
$$

となります。$\mu$ は $K$ に支えられるので、$\nu_\theta$ は $\pi_\theta K$ に支えられます。$\pi_\theta K$ はコンパクトでLebesgue可測です。$\theta\notin N$ なら、$\boldsymbol{1}_{\pi_\theta K}$ と $f_\theta$ に[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用して

$$
1=\nu_\theta(\pi_\theta K)
=\int_{\pi_\theta K}f_\theta(u)\,du
\le\mathcal L^1(\pi_\theta K)^{1/2}\|f_\theta\|_2.
$$

よって

$$
\mathcal L^1(\pi_\theta K)
\ge \|f_\theta\|_2^{-2}>0.
$$

これがほとんど全ての方向で成り立ちます。$\square$
<!-- proof-end -->

定理の仮定は $\dim_HK>1$ であり、$\dim_HK=1$ ではありません。後者はGMT5の結論 $\dim_H\pi_\theta K=1$ と両立しながら、影の長さが0となることがあります。

<a id="cor-gmt6-sigma-compact"></a>

<!-- formal-statement-start -->
> **系（可算コンパクト和の正測度射影）**  
> $E=\bigcup_{n\ge1}K_n\subset\mathbb R^2$ をコンパクト集合 $K_n$ の可算和とする。$\dim_HE>1$ なら、$d\theta/\pi$ に関するほとんど全ての方向で $\mathcal L^1(\pi_\theta E)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

可算和のHausdorff次元は各集合の次元の上限です。上限が1より大きければ、少なくとも一つのコンパクト集合の次元が1より大きくなります。そこへ定理を使います。

<!-- proof-start -->
### 証明

[GMT5の可算コンパクト和の次元公式](../GMT5/index.md#cor-gmt5-sigma-compact)の証明で使ったHausdorff次元の可算安定性から

$$
\dim_HE=\sup_{n\ge1}\dim_HK_n>1.
$$

従ってある $n_0$ について $\dim_HK_{n_0}>1$ です。[コンパクト集合の正測度射影定理](#thm-gmt6-marstrand-positive-measure)を $K_{n_0}$ へ適用すれば、ほとんど全ての $\theta$ で

$$
\mathcal L^1(\pi_\theta K_{n_0})>0.
$$

包含 $\pi_\theta K_{n_0}\subset\pi_\theta E$ と[測度の単調性](../../F0/F0-00D2/index.md#prop-f0-00d2-02)より、$\pi_\theta E$ の外測度も正です。

$E$ は可算コンパクト和なので、$\pi_\theta E$ も可算コンパクト和であり、Borel可測です。よってそのLebesgue測度は正です。$\square$
<!-- proof-end -->

一般のBorel集合 $E\subset\mathbb R^2$ に対しても、古典的なMarstrand定理は $\dim_HE>1$ ならほとんど全方向の射影のLebesgue測度が正と主張します。ここで完全証明したのはコンパクト集合と可算コンパクト和です。Borel集合への一般化には、次元が1を超えるBorel集合の中から次元が1を超えるコンパクト部分集合を取り出すという **Hausdorff次元の内部近似（capacitability）** が別途必要です。この集合論的結果を使えば同じ証明が適用できますが、本章の証明内でその結果まで証明したとはしません。

## 5. 例と境界事例：どこまで正の長さが残るか

### 例1：線分には長さがあるが、energy仮定は強すぎる

$K=[0,1]\times\{0\}$ とします。$\pi_\theta K$ は長さ $|\cos\theta|$ の区間なので、$\theta\ne\pi/2$ なら正の長さです。しかし $\dim_HK=1$ のため、[有限energyによる次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)から $s>1$ の有限energyを持つ $K$ 上の非零測度はあり得ません。従って定理の仮定は十分条件であり、正の長さに必要な条件ではありません。

### 例2：次元1でも全方向で長さ0

[GMT5の演習B4](../GMT5/index.md#ex-gmt5-b4)で構成したコンパクト集合 $D\subset\mathbb R$ は $\dim_HD=1$ かつ $\mathcal L^1(D)=0$ です。$K=D\times\{0\}$ とすると

$$
\pi_\theta K=(\cos\theta)D.
$$

$\cos\theta\ne0$ では相似変換で次元1を保ちますが、長さは0のままです。$\cos\theta=0$ では一点になり、やはり長さ0です。従って**ほとんど全方向で射影次元1、しかも全方向で射影長さ0**が両立します。失われているのは $\dim_HK>1$ という余裕であり、Frostman指数 $t>s>1$ を選ぶ第4節の操作ができません。

### 例3：Cantor積は座標方向だけ特別になり得る

中三分Cantor集合 $C$ と $\alpha=\log2/\log3$ を考えます。[GMT5のCantor積の例](../GMT5/index.md#ex-gmt5-b3)から $K=C\times C$ は $\dim_HK=2\alpha>1$ です。水平・垂直射影は $C$ なので両方向の長さは0。一方、[正測度射影定理](#thm-gmt6-marstrand-positive-measure)はほとんど全ての方向で射影長さが正と保証します。**零測度の例外方向が実際に存在する**例です。

### 例4：正の長さを定量的に下から抑える

確率測度 $\mu$ に対して第3節の平均二乗密度上界を $Q$ と書くと、$\|f_\theta\|_2^2$ が小さい方向では、影の長さは少なくともその逆数です。逆に影が極端に短い方向は、$L^2$ ノルムが極端に大きい方向に限られます。この観察は次の簡単な評価になります。

<a id="cor-gmt6-small-projections"></a>

<!-- formal-statement-start -->
> **系（短い射影を持つ方向の割合）**  
> $K\subset\mathbb R^2$ を非空コンパクト集合、$\mu$ を $K$ に支えられた質量 $M>0$ の有限非負Borel測度とする。ある $1<s<2$ について $I_s(\mu)<\infty$ なら、$a>0$ に対して

$$
\frac1\pi\mathcal L^1\bigl(\{\theta\in[0,\pi):
\mathcal L^1(\pi_\theta K)\le a\}\bigr)
\le\frac{a}{M^2}
\left(\frac{M^2}{\pi}+\frac{I_s(\mu)}{2\pi^2c_{2,s}}\right).
$$

> ここで左辺の外側の $\mathcal L^1$ は角度区間上のLebesgue測度である。
<!-- formal-statement-end -->

### 証明の見取り図

短い影があるならCauchy--Schwarzで密度の二乗ノルムが $M^2/a$ 以上になります。正の関数の平均から、そのような方向集合の割合を抑えます。

<!-- proof-start -->
### 証明

$K$ のコンパクト性から、射影された集合の各点は角度を少し変えてもわずかしか動きません。実際 $R=\max_{x\in K}|x|$ とすると、任意の $x\in K$ について $|\pi_\theta(x)-\pi_\varphi(x)|\le R|e_\theta-e_\varphi|$ です。つまり $\pi_\theta K$ は $\pi_\varphi K$ の十分小さい近傍に含まれます。コンパクト集合の $\varepsilon$-近傍の長さが $\varepsilon\downarrow0$ で元の長さへ減少するため、$\theta\mapsto\mathcal L^1(\pi_\theta K)$ は上半連続、従って可測です。

ほとんど全方向で[第3節の命題](#prop-gmt6-energy-to-l2)による密度 $f_\theta$ が存在し、[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から第1節で導いた長さ下界は

$$
M^2\le\mathcal L^1(\pi_\theta K)\|f_\theta\|_2^2
$$

を与えます。$A_a=\{\theta:\mathcal L^1(\pi_\theta K)\le a\}$ とすれば、例外零集合を除く $\theta\in A_a$ で $\|f_\theta\|_2^2\ge M^2/a$。従って

$$
\begin{aligned}
\frac{M^2}{a}\frac{\mathcal L^1(A_a)}{\pi}
&\le\frac1\pi\int_{A_a}\|f_\theta\|_2^2\,d\theta\\
&\le\frac1\pi\int_0^\pi\|f_\theta\|_2^2\,d\theta\\
&\le\frac{M^2}{\pi}+\frac{I_s(\mu)}{2\pi^2c_{2,s}}.
\end{aligned}
$$

これを整理して主張を得ます。$\square$
<!-- proof-end -->

この系は $a\downarrow0$ とすると長さ0の例外方向が零測度であることも再び示します。ただし、例外方向集合のHausdorff次元そのものを求める評価ではありません。その課題はGMT8で扱います。

## 6. 演習：密度の存在と正測度を自力でつなぐ

### Level A：一つずつ計算する

<a id="ex-gmt6-a1"></a>

**A1. 一様区間のFourier変換とPlancherel**

- Level: A
- 問題: $\nu$ を区間 $[0,1]$ 上の一様確率測度とする。$\widehat\nu(r)$ を $r=0$ と $r\ne0$ で計算し、密度 $f=\boldsymbol{1}_{[0,1]}$ の二乗積分を求め、[Fourier $L^2$ 判定](#lem-gmt6-fourier-l2-density)の係数を検算せよ。

<!-- solution-start -->
**詳細解答**

定義より

$$
\widehat\nu(r)=\int_0^1e^{-iru}\,du
=\begin{cases}
1,&r=0,\\
(1-e^{-ir})/(ir),&r\ne0.
\end{cases}
$$

$r\ne0$ では $|\widehat\nu(r)|^2=4\sin^2(r/2)/r^2$ となり、原点では連続に1と定めます。一方、$f=\boldsymbol{1}_{[0,1]}$ は $L^1\cap L^2$ で

$$
\|f\|_2^2=\int_0^1du=1.
$$

[L1/L2変換の整合性](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)で $\widehat f=\mathcal F_2f$ を確認し、[Plancherelの等長性](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を適用すれば

$$
\int_{\mathbb R}\frac{4\sin^2(r/2)}{r^2}\,dr
=2\pi\|f\|_2^2=2\pi.
$$

従って補題の係数 $1/(2\pi)$ が一致します。積分は $r=0$ 近くで有界、$|r|\ge1$ では $4/r^2$ 以下なので有限です。
<!-- solution-end -->

<a id="ex-gmt6-a2"></a>

**A2. 点質量には密度がない**

- Level: A
- 問題: $a\in\mathbb R$、$\nu=\delta_a$ とする。$\widehat\nu$ が $L^2$ に入らないことを計算し、Lebesgue密度が存在しないことと対応させよ。

<!-- solution-start -->
**詳細解答**

点質量の積分から $\widehat\nu(r)=e^{-ira}$ なので、任意の $r$ で $|\widehat\nu(r)|=1$ です。従って

$$
\int_{\mathbb R}|\widehat\nu(r)|^2\,dr
=\int_{\mathbb R}1\,dr=\infty.
$$

もし $\nu=f\,du$ なら $\nu(\{a\})=\int_{\{a\}}f\,du=0$ ですが、$\delta_a(\{a\})=1$ です。ゆえにそもそもLebesgue密度がありません。[Fourier $L^2$ 判定](#lem-gmt6-fourier-l2-density)の両方向と整合します。
<!-- solution-end -->

<a id="ex-gmt6-a3"></a>

**A3. Gaussianで点質量を近似すると何が発散するか**

- Level: A
- 問題: $\nu=\delta_0$ とし、$g_\varepsilon=h_\varepsilon*\nu$ を第2節の幅 $\varepsilon>0$ のGaussian密度とする。$\|g_\varepsilon\|_2^2$ を計算し、$\varepsilon\downarrow0$ の極限を求めよ。

<!-- solution-start -->
**詳細解答**

畳み込みは $g_\varepsilon(u)=h_\varepsilon(u)$ です。密度の二乗を積分すると

$$
\begin{aligned}
\|g_\varepsilon\|_2^2
&=\int_{\mathbb R}\frac1{2\pi\varepsilon^2}
e^{-u^2/\varepsilon^2}\,du\\
&=\frac1{2\pi\varepsilon^2}\cdot
\varepsilon\int_{\mathbb R}e^{-v^2}\,dv
=\frac1{2\sqrt\pi\varepsilon}.
\end{aligned}
$$

ここでは $v=u/\varepsilon$ と置き $du=\varepsilon\,dv$ を使いました。よって $\varepsilon\downarrow0$ で二乗ノルムは無限大になります。各 $g_\varepsilon$ は $L^2$ でも、その極限 $\delta_0$ が $L^2$ 密度を持つとは限らないことが見えます。
<!-- solution-end -->

<a id="ex-gmt6-a4"></a>

**A4. 低周波・高周波を分ける**

- Level: A
- 問題: $1<s<2$、$\mu$ を $\mathbb R^2$ 上の有限非負Borel測度、全質量を $M$ とする。$I_s(\mu)<\infty$ と仮定して、$\int_{\mathbb R^2}|\widehat\mu(\xi)|^2|\xi|^{-1}d\xi$ の上界 $2\pi M^2+I_s(\mu)/c_{2,s}$ を導け。

<!-- solution-start -->
**詳細解答**

[有限測度のFourier変換の有界性](../GMT4/index.md#lem-gmt4-measure-fourier-bounds)で $|\widehat\mu|\le M$。原点近くは二次元の極座標により

$$
\int_{|\xi|\le1}|\widehat\mu(\xi)|^2|\xi|^{-1}d\xi
\le M^2\int_0^{2\pi}\int_0^1dr\,d\varphi=2\pi M^2.
$$

遠方では $|\xi|>1$ かつ $s>1$ なので $|\xi|^{-1}\le|\xi|^{s-2}$。従って[GMT4の「Riesz energyのFourier表示」](../GMT4/index.md#thm-gmt4-fourier-energy)により

$$
\int_{|\xi|>1}|\widehat\mu(\xi)|^2|\xi|^{-1}d\xi
\le\int_{\mathbb R^2}|\widehat\mu(\xi)|^2|\xi|^{s-2}d\xi
=I_s(\mu)/c_{2,s}.
$$

二領域は（原点と境界を除いて）平面を覆うので、足し合わせて結論します。
<!-- solution-end -->

<a id="ex-gmt6-a5"></a>

**A5. 区間を拡大したときの密度と長さ**

- Level: A
- 問題: $\lambda>0$、$\nu=f\,du$ を $\mathbb R$ 上の確率測度とし、$f\in L^1\cap L^2$ とする。写像 $T_\lambda(u)=\lambda u$ の押し出し測度 $\eta=(T_\lambda)_\#\nu$ の密度を求め、$L^2$ ノルムの二乗と全質量の変化を示せ。

<!-- solution-start -->
**詳細解答**

任意のBorel集合 $A$ に対し

$$
\eta(A)=\nu(A/\lambda)=\int_{A/\lambda}f(u)\,du
=\int_A\lambda^{-1}f(v/\lambda)\,dv,
$$

ここで $v=\lambda u$、$du=dv/\lambda$ と置きました。よって密度は $f_\lambda(v)=\lambda^{-1}f(v/\lambda)$ です。その二乗ノルムは

$$
\begin{aligned}
\|f_\lambda\|_2^2
&=\int_{\mathbb R}\lambda^{-2}|f(v/\lambda)|^2\,dv\\
&=\lambda^{-1}\int_{\mathbb R}|f(u)|^2\,du
=\lambda^{-1}\|f\|_2^2.
\end{aligned}
$$

また $\int f_\lambda\,dv=\int f\,du=1$ です。像の長さは $\lambda$ 倍、密度の二乗ノルムは $\lambda^{-1}$ 倍となり、第1節の長さ下界とも一致します。
<!-- solution-end -->

### Level B：複数の論点を接続する

<a id="ex-gmt6-b1"></a>

**B1. 単位正方形の斜め射影の密度**

- Level: B
- 問題: $\mu$ を $[0,1]^2$ 上の正規化された面積測度、$\theta=\pi/4$ とする。射影変数 $U=(X+Y)/\sqrt2$ の密度 $f_{\pi/4}$ と $\|f_{\pi/4}\|_2^2$ を求め、Cauchy--Schwarzの長さ下界を実際の影の長さと比較せよ。ただし $X,Y$ は独立な $[0,1]$ の一様確率変数とする。

<!-- solution-start -->
**詳細解答**

$T=X+Y$ の密度は畳み込みにより、$0\le t\le1$ では積分区間 $0\le x\le t$ の長さが $t$、$1\le t\le2$ では $t-1\le x\le1$ の長さが $2-t$ なので

$$
p_T(t)=\begin{cases}
t,&0\le t\le1,\\
2-t,&1<t\le2,\\
0,&\text{それ以外}.
\end{cases}
$$

$U=T/\sqrt2$ だから変数変換 $t=\sqrt2u$、$dt=\sqrt2\,du$ より

$$
f_{\pi/4}(u)=\begin{cases}
2u,&0\le u\le1/\sqrt2,\\
2(\sqrt2-u),&1/\sqrt2<u\le\sqrt2,\\
0,&\text{それ以外}.
\end{cases}
$$

対称性から

$$
\begin{aligned}
\|f_{\pi/4}\|_2^2
&=2\int_0^{1/\sqrt2}(2u)^2du
=8\left[\frac{u^3}{3}\right]_0^{1/\sqrt2}
=\frac{2\sqrt2}{3}.
\end{aligned}
$$

影は $[0,\sqrt2]$ で長さ $\sqrt2$。密度評価からの下界は

$$
\mathcal L^1(\pi_{\pi/4}[0,1]^2)
\ge\|f_{\pi/4}\|_2^{-2}=\frac{3}{2\sqrt2},
$$

で、$3/(2\sqrt2)<\sqrt2$ です。$f$ が一定ではないためCauchy--Schwarzの等号になりません。
<!-- solution-end -->

<a id="ex-gmt6-b2"></a>

**B2. 臨界次元の反例を完全に確認する**

- Level: B
- 問題: $D\subset[0,1]$ をコンパクト、$\dim_HD=1$、$\mathcal L^1(D)=0$ とする（その存在は[GMT5の演習B4](../GMT5/index.md#ex-gmt5-b4)による）。$K=D\times\{0\}$ について、全方向の射影長さと、$\cos\theta\ne0$ の方向の射影次元を求める。第4節の証明で何が使えなくなるかを特定せよ。

<!-- solution-start -->
**詳細解答**

$\pi_\theta(x,0)=x\cos\theta$ より $\pi_\theta K=(\cos\theta)D$。$\cos\theta=0$ なら一点 $\{0\}$ です。$\cos\theta\ne0$ なら非零相似写像なので、[MT8のLipschitz次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)を写像と逆写像へ使い $\dim_H\pi_\theta K=\dim_HD=1$ です。$D$ は任意に小さい合計長さの開区間族で覆えます。それらを $\cos\theta$ 倍すれば合計長さも $|\cos\theta|$ 倍になるので、影も長さ0です。数式では

$$
\mathcal L^1(\pi_\theta K)
=|\cos\theta|\mathcal L^1(D)=0.
$$

従って全方向で長さ0、垂直方向以外では次元1です。第4節では $1<s<t<\dim_HK$ を選びますが、$\dim_HK=1$ ではこの選択が不可能です。射影次元定理の結論を正測度と取り違えたわけではなく、証明の高周波制御に必要な余裕が失われています。
<!-- solution-end -->

<a id="ex-gmt6-b3"></a>

**B3. Cantor積で例外方向と一般方向を分ける**

- Level: B
- 問題: 中三分Cantor集合 $C$、$\alpha=\log2/\log3$、$K=C\times C$ とする。[GMT5の演習B3](../GMT5/index.md#ex-gmt5-b3)で示した $\dim_HK=2\alpha>1$ を用いて、水平・垂直方向の射影長さを求め、ほとんど全方向で長さが正になる理由を有限energyを経由して示せ。

<!-- solution-start -->
**詳細解答**

$\pi_0K=C$、$\pi_{\pi/2}K=C$ です。$C$ の段階 $n$ の被覆長の合計は $2^n3^{-n}=(2/3)^n\to0$ なので $\mathcal L^1(C)=0$。従って水平・垂直方向の長さは0です。

一方、$2\alpha>1$ だから $1<s<t<2\alpha$ を選べます。[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)によって、$K$ 上の確率測度 $\mu$ と定数 $A>0$ が存在して球成長評価を満たします。

$$
\mu(B(x,r))\le Ar^t.
$$

ここで $x\in\mathbb R^2$、$r>0$ は任意です。[GMT3のenergy有限性](../GMT3/index.md#thm-gmt3-frostman-energy)から $I_s(\mu)<\infty$ が従います。よって[射影密度評価](#prop-gmt6-energy-to-l2)により、ほとんど全方向の $\nu_\theta$ は $L^2$ 密度 $f_\theta$ を持ちます。

その質量は1で $\pi_\theta K$ に支えられるため

$$
1\le\mathcal L^1(\pi_\theta K)^{1/2}\|f_\theta\|_2,
\qquad \mathcal L^1(\pi_\theta K)>0.
$$

例外となった二方向は、方向測度では零集合なので矛盾しません。
<!-- solution-end -->

<a id="ex-gmt6-b4"></a>

**B4. 単位円板の射影密度**

- Level: B
- 問題: 単位円板 $K=\{(x,y):x^2+y^2\le1\}$ に面積密度 $1/\pi$ の確率測度 $\mu$ を置く。水平方向の射影測度の密度 $f_0$ と $\|f_0\|_2^2$ を計算し、射影長さ $2$ に対するCauchy--Schwarz下界を検算せよ。

<!-- solution-start -->
**詳細解答**

水平座標 $u=x$ を固定すると円板内の縦断面は $-\sqrt{1-u^2}\le y\le\sqrt{1-u^2}$ です。従って[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で

$
f_0(u)=\begin{cases}
\dfrac2\pi\sqrt{1-u^2},&|u|\le1,\\
0,&|u|>1.
\end{cases}
$$

これは非負で、$\int f_0du=(2/\pi)\int_{-1}^1\sqrt{1-u^2}du=1$（半円面積は $\pi/2$）。二乗積分は

$$
\begin{aligned}
\|f_0\|_2^2
&=\frac4{\pi^2}\int_{-1}^1(1-u^2)du\\
&=\frac4{\pi^2}\left[u-\frac{u^3}{3}\right]_{-1}^1
=\frac{16}{3\pi^2}.
\end{aligned}
$$

よって第1節の下界は $\mathcal L^1(\pi_0K)\ge3\pi^2/16$ です。実際には $\pi_0K=[-1,1]$ で長さ2。$3\pi^2/16<2$ なので一致します。
<!-- solution-end -->

### Level C：方向の割合まで推定する

<a id="ex-gmt6-c1"></a>

**C1. 小さい影を持つ方向の定量評価を再構成する**

- Level: C
- 問題: 非空コンパクト集合 $K\subset\mathbb R^2$ 上の確率測度 $\mu$ が、ある $1<s<2$ で $I_s(\mu)=E_s<\infty$ を満たすとする。次を順に示せ。

  1. $Q=1/\pi+E_s/(2\pi^2c_{2,s})$ と置くと、ほとんど全方向に存在する射影密度について $\pi^{-1}\int_0^\pi\|f_\theta\|_2^2d\theta\le Q$ である。
  2. $a>0$ に対して、影の長さが $a$ 以下の方向の割合は $aQ$ 以下である。
  3. 正規化された方向測度で、$\mathcal L^1(\pi_\theta K)\ge1/(2Q)$ となる方向の割合が少なくとも $1/2$ であることを導け。

<!-- solution-start -->
**詳細解答**

まず元の質量は $M=1$ です。[方向平均Fourier恒等式](#lem-gmt6-directional-fourier)の右辺を $|\xi|\le1$ と $|\xi|>1$ に分け、前者を $2\pi$、後者を[GMT4のFourier energy表示](../GMT4/index.md#thm-gmt4-fourier-energy)による $E_s/c_{2,s}$ で抑えます。さらに[Fourier $L^2$ 判定](#lem-gmt6-fourier-l2-density)の $1/(2\pi)$ を掛けると

$$
\frac1\pi\int_0^\pi\|f_\theta\|_2^2d\theta
\le\frac{2\pi+E_s/c_{2,s}}{2\pi^2}
=Q.
$$

次に影が長さ $\ell_\theta\le a$ なら、質量1と[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
1=\int_{\pi_\theta K}f_\theta du
\le\ell_\theta^{1/2}\|f_\theta\|_2
\le a^{1/2}\|f_\theta\|_2.
$$

従ってそのような方向では $\|f_\theta\|_2^2\ge1/a$ です。$A_a=\{\theta:\ell_\theta\le a\}$ と置き、例外零集合を除いて積分すれば

$$
\frac{\mathcal L^1(A_a)}\pi\cdot\frac1a
\le\frac1\pi\int_{A_a}\|f_\theta\|_2^2d\theta
\le Q,
$$

つまり $\mathcal L^1(A_a)/\pi\le aQ$ です。最後に $a=1/(2Q)$ と取ります。$Q>0$ なので適法であり、長さ $\ell_\theta\le1/(2Q)$ の方向は高々半分です。その補集合の割合は少なくとも半分で、そこで $\ell_\theta>1/(2Q)$、従って要求された弱い不等号も満たします。

これは単に「ほとんど全方向で正」という定理よりも、**ある正の閾値以上の長さを持つ方向が少なくとも半分ある**ことまで引き出しています。
<!-- solution-end -->

## 7. まとめと次の講義

- 次元 $1$ は長さの正値性を保証しません。正の長さへ進むため、有限測度のFourier変換が $L^2$ に入ると密度が得られることをGaussian近似で証明しました。
- $1<s<2$ の有限Riesz energyは、周波数領域の高周波側に必要な制御を与えます。低周波側では $|\xi|^{-1}$ が二次元で局所可積分です。
- コンパクト集合 $K$ で $\dim_HK>1$ なら、ほとんど全方向で射影測度は $L^2$ 密度を持ち、$\mathcal L^1(\pi_\theta K)>0$。可算コンパクト和にも拡張できました。
- 短い影を持つ方向の割合も、元の測度のenergyから抑えられます。ただし一般Borel集合への完全拡張には別途の内部近似定理が必要です。

次は **GMT7「高次元・Grassmann射影」** です。直線方向を平面内で動かした平均を、$\mathbb R^d$ の $m$ 次元部分空間全体の平均へ拡張します。
